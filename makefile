install:
	npm ci

publish:
	npm publish --dry-run

jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest

coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage

lint:
	npx eslint .