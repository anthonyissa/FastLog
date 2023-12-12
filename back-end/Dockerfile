FROM node:20.1-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]

# docker build -t fastlog-back . && docker run -p 3001:3001 fastlog-back