setup:
	docker volume create node-modules
install:
	docker-compose run --rm install
watch:
	docker-compose up watch
