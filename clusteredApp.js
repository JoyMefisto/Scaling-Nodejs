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
    })
} else {
    require('./app');
}