FROM ubuntu
MAINTAINER Jake Deichert

# Set the terminal so we can use commands like "clear"
ENV TERM xterm
ENV DEBIAN_FRONTEND noninteractive

##############################################################
# Set the locale
##############################################################

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

##############################################################
# Install packages
##############################################################

RUN apt-get update && apt-get install -y \
    git \
    vim \
    curl

# Clean unneeded packages after
RUN apt-get --purge autoremove -y

##############################################################
# Install node and yarn with nvm
##############################################################

WORKDIR /root
RUN curl -sS https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

RUN /bin/bash -c "source /root/.nvm/nvm.sh \
    && nvm install node \
    && nvm alias default node \
    && curl -sS -L https://yarnpkg.com/install.sh | bash"

ENV PATH "/root/.yarn/bin:$PATH"

# Install serve (rather than installing nginx)
RUN /bin/bash -c "source /root/.nvm/nvm.sh \
    && yarn global add serve"

##############################################################
# Define volume and port
##############################################################

WORKDIR /var/www/html
VOLUME /var/www/html
EXPOSE 8080

# Build and serve the dist directory
# This only runs if the container is detached with -d
CMD /bin/bash -c "source /root/.nvm/nvm.sh && yarn && yarn run build && serve /var/www/html/dist --port 8080"
