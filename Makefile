install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .
	
test:
	npm test

test-watch:
	node --experimental-vm-modules 'node_modules/.bin/jest' --watch
test-coverage:
	node --experimental-vm-modules 'node_modules/.bin/jest' --coverage
test-z:
	NODE_OPTIONS=--experimental-vm-modules  npx jest --coverage