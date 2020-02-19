# Current LTS Support 12.x
FROM node:12.15.0-alpine

# Maintainer Information
LABEL maintainer="ZRP Aplicações Informáticas LTDA - ME <zrp@zrp.com.br>"
LABEL vendor="ZRP Aplicações Informáticas LTDA - ME"
LABEL license="GPLv3"

# Configure where container network and pwd
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# extend path to read from local binaries and project binaries
ENV NODEJS_VERSION="12.15.0" \
    GOSU_VERSION="1.10" \
    APP_PATH=/home/node \
    PATH=/usr/local/bin/:/home/node/app/bin/:$PATH

CMD ["bash"]


# Configure where container network and pwd
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# extend path to read from local binaries and project binaries
ENV NODEJS_VERSION="12.16.0-alphine" \
    APP_PATH=/home/node/app \
    PATH=/usr/local/bin/:/home/node/app/bin/:$PATH

# Configure container network
EXPOSE 3000
EXPOSE 9229
