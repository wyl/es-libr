FROM node:20-alpine

WORKDIR /app

COPY dist/ .

ENV ES_HOST="http://localhost:9200"
ENV LOGLEVEL="info"

EXPOSE 3000

CMD ["node", "index.js"]
