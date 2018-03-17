FROM ubuntu
LABEL maintainer="Jake Deichert"

# ================================================
# BASE ENVIRONMENT SETUP
# ================================================

# Set the terminal environment
ENV TERM xterm
ENV DEBIAN_FRONTEND noninteractive

# Install helpful packages
# xz-utils: required for untarring
RUN apt-get update && apt-get install -y \
    && apt-get install -y \
    git \
    vim \
    curl \
    xz-utils

# Clean unneeded packages after
RUN apt-get --purge autoremove -y

# ================================================
# NODE SETUP
# ================================================

WORKDIR /root

# Must be supplied
ARG USE_NODE_VERSION

# Install node and yarn
RUN curl -OL https://nodejs.org/dist/v${USE_NODE_VERSION}/node-v${USE_NODE_VERSION}-linux-x64.tar.xz \
    && tar --no-same-owner -xf node-v${USE_NODE_VERSION}-linux-x64.tar.xz \
    && mv node-v${USE_NODE_VERSION}-linux-x64 node \
    && rm node-v${USE_NODE_VERSION}-linux-x64.tar.xz

ENV PATH "/root/node/bin:$PATH"
ENV PATH "/root/.yarn/bin:$PATH"

RUN curl -sS -L https://yarnpkg.com/install.sh | bash

# ================================================
# ENV CONFIG
# ================================================

# Copy scripts and config
COPY root/ /root/
RUN chmod -R 755 /root/scripts

RUN mkdir -p /root/app
WORKDIR /root/app
VOLUME /root/app

EXPOSE 8080

# The startup script
# This only runs if the container is detached with -d
CMD /root/scripts/start.sh
