FROM golang:1.20

WORKDIR /go/src/app
COPY . .

COPY .env-example .env

RUN go build main.go

CMD ["./main"]