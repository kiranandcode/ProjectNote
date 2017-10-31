FROM node/6

# Construct directories
RUN mdkir -p /usr/src/app

# set context directory
WORKDIR /usr/src/app

# load packages
COPY server/package.json /usr/src/app/
RUN npm install

COPY server/ /usr/src/app

ENV PORT 80
ENV production

CMD [ "npm", "start" ]