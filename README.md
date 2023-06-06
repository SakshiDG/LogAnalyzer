# LogAnalyzer
This is an application that uses Kafka and Maven Microservice to publish messages on Kafka. Here are the steps to start the application:

## Prerequisites

To run this application, you will need the following software:

- JDK 17 or higher
- Docker
- Docker Compose

## Building the application

To build the application, run the following command:

```
make build
```

The Make File Has the following commands, you can either run these commands individually or run the command mentioned above
```
./mvnw clean install
docker build --platform=linux/amd64 -t myorg/myapp1 .
docker compose up
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic quickstart
```

This will run the Maven build to generate the application jar file, build the Docker image, and start the Docker Compose environment.

## Creating a topic

To create a topic, run the following command:

```
docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic quickstart
```

This will create a topic named "quickstart" on the Kafka broker.

## Stopping the application

To stop the application, run the following command:

```
docker compose down
```

This will stop and remove the Docker Compose environment.
