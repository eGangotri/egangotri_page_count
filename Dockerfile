# base image
FROM node:16-alpine

# set working directory
WORKDIR /app
# install and cache app dependencies
COPY package.json /app/package.json

#RUN npm install --global yarn

RUN npm install

# add app
COPY . /app


EXPOSE 80
EXPOSE 8080

CMD ["npm", "run", "serve"]