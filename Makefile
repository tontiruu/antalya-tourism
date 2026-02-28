.PHONY: start dev build serve lint clean install

start: install dev

dev:
	npm run dev

build:
	npm run build

serve:
	npm run start

lint:
	npm run lint

clean:
	rm -rf .next node_modules

install:
	npm install
