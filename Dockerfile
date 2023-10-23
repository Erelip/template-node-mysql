FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn prisma generate
CMD ["sh", "-c", "yarn migrate && yarn dev"]