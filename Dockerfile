FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --force

COPY . .

RUN npm run build

EXPOSE 4200

CMD ["npm", "start"]