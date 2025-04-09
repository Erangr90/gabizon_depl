FROM node:lts-alpine3.20 AS builder
WORKDIR /app
COPY ./package.json ./
COPY ./prisma ./
RUN npm install
RUN npx prisma generate
COPY . .
RUN npm run build


FROM node:lts-alpine3.20
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "start"]