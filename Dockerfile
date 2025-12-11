FROM node:25-alpine

WORKDIR /prismatest

COPY ./package.json ./package.json

RUN npm install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npx prisma generate
RUN npm run build

EXPOSE 8080

CMD ["npm","run","dev"]


