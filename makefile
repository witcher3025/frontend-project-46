install:
	npm ci

publish:
	npm publish --dry-run

jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest

lint:
	npx eslint .