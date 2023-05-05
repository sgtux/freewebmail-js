FROM alpine
COPY ./app /app
COPY ./client /app/client
WORKDIR /app
RUN apk add --update nodejs yarn && \
    yarn && \
    cd client && \
    yarn && \
    yarn build:prod && \
    rm -rf /app/client
CMD ["yarn", "start"]