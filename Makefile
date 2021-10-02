install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .
	
test:
	npx jest

w-test:
	npx jest --watch
cov-test:
	npx jest --coverage