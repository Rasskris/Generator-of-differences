install:
	npm install

publish:
	npm publish --dry-run

start:
	npx babel-node src/bin/gendiff.js

lint:
    npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test