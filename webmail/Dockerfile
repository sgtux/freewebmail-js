FROM alpine
COPY ./app /app
WORKDIR /app
RUN apk add --update nodejs yarn && \
    yarn
CMD ["yarn", "start"]