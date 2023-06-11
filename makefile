install:
	npm ci

publish:
	npm publish --dry-run

test:
	npx jest

jest-watch:
	npx jest --watch

test-coverage:
	npx jest --coverage

lint:
	npx eslint .