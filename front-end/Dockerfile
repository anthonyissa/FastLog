FROM node:20.1-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

# docker build -t fastlog-front . && docker run -p 3000:3000 fastlog-front