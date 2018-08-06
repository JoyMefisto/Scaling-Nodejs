const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const cpus = os.cpus().length;

    console.log(`Clustering to ${cpus} CPUs`);
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    // При исключении, текущий воркер останавливается с suicide - true и запускается новый
    cluster.on('exit', (worker, code) => {
        if (code !== 0 && !worker.suicide) {
            console.log('Worked crushed. Starting a new worker.');
            cluster.fork();
        }
    });

    // Реализация без простоя
    process.on('SIGUSR2', () => {
        const workers = Object.keys(cluster.workers);

        function restartWorker(i) {
            if (i >= workers.length) return;

            const worker = cluster.workers[workers[i]];

            console.log(`Stopped worker: ${worker.process.pid}`);
            worker.disconnect();

            worker.on('exit', () => {
                if (!worker.suicide) return;

                const newWorker = cluster.fork();

                newWorker.on('listening', () => {
                    restartWorker(i + 1);
                })
            });
        }
        restartWorker(0);
    });

} else {
    require('./app');
}