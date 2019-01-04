FROM node:carbon

# WORKDIR /app

# Установить зависимости приложения
# Используется символ подстановки для копирования как 
# package.json, так и package-lock.json,
# работает с npm@5+

COPY package*.json ./

RUN npm install

# Используется при сборке кода в продакшене
# RUN npm install --only=production

# Скопировать исходники приложения
COPY server /server
COPY public /public

EXPOSE 3000

CMD [ "node", "server/server.js" ]