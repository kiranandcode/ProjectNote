ARG WATCHED_BRANCH
# --- Base Stage ---
FROM node:boron as base
    # Construct directories
    RUN mkdir -p /usr/src/app/server
    RUN mkdir -p /usr/src/app/build
    RUN mkdir -p /usr/src/app/.git

    # set directory
    WORKDIR /usr/src/app

    # load packages
    COPY ./package.json /usr/src/app/

    # load server maintaining functions
    RUN npm install -g nodemon
    RUN npm install -g forever 

# --- Build Stage ---
FROM base as dependancies 
    # install production dependancies
    RUN npm set progress=false && npm config set depth 0
    RUN npm install --only=production

    # cache the production modules
    RUN cp -R node_modules prod_node_modules

    # install all dependancies
    RUN npm install

    # package application
    COPY ./server/ /usr/src/app/server
    COPY ./build/ /usr/src/app/build

    ENV BRANCH=${WATCHED_BRANCH}

    # Setup git integration
    COPY ./.git/ /usr/src/app/.git
    COPY ./setup.sh /usr/src/app/
    RUN echo $(/usr/src/app/setup.sh)
    # RUN nodemon /usr/src/app/server/server.js

# --- Deploy ---
FROM dependancies AS develop

    EXPOSE 80 
    CMD npm run start
