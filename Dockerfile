#-------------------------------------------------------------#
#---------------------------Base------------------------------#
#-------------------------------------------------------------#
FROM node:lts-alpine3.11 as base

# Arguments
ARG APP_PATH=/home/node/app
ARG PORT=3000
ARG BUILD_PACKAGES=
ARG DEV_PACKAGES="nano git"
ARG RUNTIME_PACKAGES="tzdata"
ARG NODE_PATH=.

# Environment
ENV PORT=${PORT} \
    APP_PATH=${APP_PATH} \
    BUILD_PACKAGES=${BUILD_PACKAGES} \
    DEV_PACKAGES=${DEV_PACKAGES} \
    RUNTIME_PACKAGES=${RUNTIME_PACKAGES} \
    NODE_PATH=${NODE_PATH}

# Expose ports for running processes
EXPOSE $PORT

# Update dependencies and add runtime dependencies.
# Also create and change APP_PATH folder to match the
# user provided by base image.
RUN apk update && \
    apk upgrade && \
    apk add --update --no-cache ${RUNTIME_PACKAGES} && \
    mkdir -p ${APP_PATH} && \
    chown node:node -R ${APP_PATH}/

# Change working directory (post ownership transfer to $APP_USER) to app directory
WORKDIR ${APP_PATH}

#-------------------------------------------------------------#
#------------------------Development--------------------------#
#-------------------------------------------------------------#
FROM base as development

# Development args
ARG EDITOR=nano

# Change path for bundler user install
ENV EDITOR=${EDITOR}

# Expose ports for debugging
EXPOSE 9229

# Add development and build packages
RUN apk add --update --no-cache ${BUILD_PACKAGES} ${DEV_PACKAGES}

# Change user to node
USER node

# Install app dependencies
COPY --chown=node:node package*.json ${APP_PATH}/

RUN npm install

# Expose node_modules as a volume
VOLUME ${APP_PATH}/node_modules

# Run app on development mode by default
CMD ["npm", "run", "debug"]

#-------------------------------------------------------------#
#--------------------------Release----------------------------#
#-------------------------------------------------------------#
FROM base as release

ARG NODE_ENV=production

# Set NODE_ENV
ENV NODE_ENV=${NODE_ENV}

# Add development and build packages
RUN apk add --update --no-cache --virtual .build_deps ${BUILD_PACKAGES} && \
    rm -rf /var/cache/apk/*

# Install app dependencies
COPY --chown=node:node package*.json ${APP_PATH}/

RUN npm ci

# Remove build dependencies
RUN apk del .build_deps

# Copy app files
COPY --chown=node:node index.js index.js
COPY --chown=node:node src src
COPY --chown=node:node config config

# Change user to node
USER node

# Start server using node directly to avoid PID problems
CMD ["node", "index.js"]
