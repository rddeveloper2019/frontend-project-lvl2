install:
	npm ci

lint:
	npx eslint .
	
test:
	npm test

test-watch:
	node --experimental-vm-modules 'node_modules/.bin/jest' --watch
test-coverage:
	NODE_OPTIONS=--experimental-vm-modules  npx jest --coverage
test:
	NODE_OPTIONS=--experimental-vm-modules  npx jest