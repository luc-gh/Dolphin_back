FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./

COPY . .

WORKDIR /app

RUN npx tsc

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package*.json ./
RUN npm install

COPY .env ./

EXPOSE 3001

CMD ["node", "./dist/app.js"]