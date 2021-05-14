FROM node:carbon

# WORKDIR /app

# Установить зависимости приложения
# Используется символ подстановки для копирования как 
# package.json, так и package-lock.json,

COPY package*.json ./

RUN npm install

# Используется при сборке кода в продакшене
# RUN npm install --only=production

# Скопировать исходники приложения
COPY . .

EXPOSE 3000

CMD [ "node", "server/server.js" ]