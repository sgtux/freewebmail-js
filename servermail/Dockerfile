FROM ubuntu:20.04
ARG DEBIAN_FRONTEND=noninteractive
WORKDIR /root
COPY files/* /root/
ENV DOMAIN_NAME=passbolt.poc
ENV ALLOWED_NETWORKS=172.50.50.0/24
RUN apt update && \
    apt install -y uuid-runtime postfix mailutils vim dovecot-imapd && \
    echo 'export MAIL=~/Maildir' | tee -a /etc/bash.bashrc | tee -a /etc/profile.d/mail.sh && \
    postconf -e 'home_mailbox= Maildir/' && \
    sed -i '/#disable_plaintext_auth = yes/c\disable_plaintext_auth = no' /etc/dovecot/conf.d/10-auth.conf && \
    sed -i '/ssl = yes/c\ssl = no' /etc/dovecot/conf.d/10-ssl.conf && \
    sed -i '/mail_location = mbox:~\/mail:INBOX=\/var\/mail\/%u/c\mail_location = maildir:\/home\/%u\/Maildir' /etc/dovecot/conf.d/10-mail.conf && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) alice && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) bob && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) charlie && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) dan && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) erin && \
    useradd -m -s /bin/bash -p $(openssl passwd -1 123) frank && \
    chmod +x /root/init.sh && \
    chmod +x /root/createuser.sh
CMD ["/root/init.sh"]