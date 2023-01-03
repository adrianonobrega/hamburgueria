FROM node:16.13.2

WORKDIR /usr

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

ENV PORT=9000

EXPOSE 9000

CMD npm run start:dev
