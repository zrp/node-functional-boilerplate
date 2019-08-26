FROM node:10.16.3-alpine 

# Maintainer Information
LABEL author="ZRP Aplicações Informáticas LTDA - ME <zrp@zrp.com.br>"
LABEL vendor="ZRP Aplicações Informáticas LTDA - ME"
LABEL license="GPLv3"

# Configure where container network and pwd
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# extend path to read from local binaries and project binaries
ENV NODEJS_VERSION="10.16.3" \
    APP_PATH=/home/node/app \
    PATH=/usr/local/bin/:/home/node/app/bin/:$PATH

# Configure container network
EXPOSE 3000
EXPOSE 9229
