FROM node:alpine

WORKDIR /usr/app/client
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json ./

RUN npm install
RUN npm install react-scripts@3.4.0
COPY ./ ./

CMD ["npm", "start"]