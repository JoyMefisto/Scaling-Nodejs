# Scaling-Nodejs
### Репо для изучения масштабирования Node.js
Для тестирвание нужно установить [siege](https://www.joedog.org/siege-home/).
```
1. node app || node clusteredApp - запуск приложения
2. siege -c200 -t10S http://localhost:8080 - запуск тестирования(200 параллельных соединений в течении 10 секунд)
```
