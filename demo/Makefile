build:
	./mvnw clean install
	docker build --platform=linux/amd64 -t myorg/myapp1 .
	docker compose up
	docker exec broker kafka-topics --bootstrap-server broker:9092 --create --topic quickstart