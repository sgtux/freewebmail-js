# FROM ubuntu:20.04
FROM animemail:1.0
ARG DEBIAN_FRONTEND=noninteractive
WORKDIR /root

# RUN apt update && \
#     apt install -y uuid-runtime postfix mailutils vim dovecot-imapd

RUN echo 'export MAIL=~/Maildir' | tee -a /etc/bash.bashrc | tee -a /etc/profile.d/mail.sh && \
    postconf -e 'home_mailbox= Maildir/' && \
    postconf -e 'mynetworks = 127.0.0.0/8 172.17.0.0/16' && \
    postconf -e 'mydestination = $myhostname, animemail.com, localhost.localdomain, localhost' && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) afrodite && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) apolo && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) ares && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) atena && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) eros && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) hades && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) hermes && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) hera && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) poseidon && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) zeus && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) contato