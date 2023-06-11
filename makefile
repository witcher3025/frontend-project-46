install:
	npm ci

publish:
	npm publish --dry-run

jest:
	npx jest

jest-watch:
	npx jest --watch

test-coverage:
	npx jest --coverage

lint:
	npx eslint .