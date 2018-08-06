# Scaling-Nodejs
### Репо для изучения масштабирования Node.js
Для запуска потребуется:
```
1. forever - npm install forever -g;
2. nginx - sudo apt-get install nginx;
```
[nginx.conf]

1. `cd /etc/nginx/`
2. `sudo nano nginx.conf`
3. append in nginx.conf:
```
http {
        # forever list
        upstream nodejs_design_patterns_app {
                server 127.0.0.1:8081;
                server 127.0.0.1:8082;
                server 127.0.0.1:8083;
                server 127.0.0.1:8084;
        }

        server {
                listen 80;

                location / {
                        proxy_pass http://nodejs_design_patterns_app;
                }
        }
}
```

```
1. Запуск приложения;
    forever start app.js 8081
    forever start app.js 8082
    forever start app.js 8083
    forever start app.js 8084 
2. http://localhost
3. forever list - список запущенных приложений
```