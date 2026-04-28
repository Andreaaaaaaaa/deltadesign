FROM mirrors.tencent.com/gametalk_web/tnginx_release:1.0.1

WORKDIR /data/code

COPY dist-docs/ ./dist-docs/

COPY nginx.conf /usr/local/services/tnginx_1_0_0-1.0/conf/nginx.conf

COPY build/run.sh /etc/kickStart.d/

RUN chmod a+x /etc/kickStart.d/run.sh

RUN passwd -d root
