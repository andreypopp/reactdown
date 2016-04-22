.DELETE_ON_ERROR:

BIN           = ./node_modules/.bin
TESTS         = $(shell find src -path '*/__tests__/*-test.js')
FIXTURES      = $(shell find src -path '*/__tests__/*-fixture/*.js')
SRC           = $(filter-out $(TESTS) $(FIXTURES), $(shell find src -name '*.js'))
SRC_CMD       = $(shell find src/bin -type f -name '*')
LIB           = $(SRC:src/%=lib/%)
LIB_CMD       = $(SRC_CMD:src/%=lib/%)
MOCHA_OPTS    = -R dot --require babel-core/register

build:: build-lib build-cmd

build-lib::
	@$(MAKE) -j 8 $(LIB)

build-cmd::
	@$(MAKE) -j 8 $(LIB_CMD)

lint::
	@$(BIN)/eslint src

check::
	@$(BIN)/flow --show-all-errors src

test::
	@$(BIN)/mocha $(MOCHA_OPTS) $(TESTS)

ci::
	@$(BIN)/mocha $(MOCHA_OPTS) --watch --watch-extensions json,md $(TESTS)

sloc::
	@$(BIN)/sloc -e __tests__ src

site-develop:
	@$(MAKE) -C site develop

site-publish:
	@$(BIN)/gh-pages -d ./site

version-major version-minor version-patch:: lint test
	@npm version $(@:version-%=%)

push::
	@git push --tags origin HEAD:master

clean::
	@rm -rf lib

lib/%.js: src/%.js
	@echo "Building $<"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTIONS) -o $@ $<

lib/bin/%: src/bin/%
	@echo "Building command $<"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTIONS) -o $@ $<
	@chmod +x $@

PARSE_FIXTURES_MD := $(shell find src/parse/__tests__ -name '*.md')
PARSE_FIXTURES_JSON := $(PARSE_FIXTURES_MD:%.md=%.json)

build-parse-fixtures:: $(PARSE_FIXTURES_JSON)
clean-parse-fixtures::
	rm -f $(PARSE_FIXTURES_JSON)

src/parse/__tests__/%.json: src/parse/__tests__/%.md
	@echo "Parsing $<"
	@$(BIN)/babel-node ./src/bin/reactdown-parse $< > $@

RENDER_FIXTURES_MD := $(shell find src/render/__tests__ -name '*.md')
RENDER_FIXTURES_JSON := $(RENDER_FIXTURES_MD:%.md=%.json)
RENDER_FIXTURES_JS := $(RENDER_FIXTURES_MD:%.md=%.js)

build-render-fixtures:: $(RENDER_FIXTURES_JS) $(RENDER_FIXTURES_JSON)
clean-render-fixtures::
	rm -f $(RENDER_FIXTURES_JSON) $(RENDER_FIXTURES_JS)

src/render/__tests__/%.json: src/render/__tests__/%.md
	@echo "Parsing $<"
	@$(BIN)/babel-node ./src/bin/reactdown-parse $< > $@

src/render/__tests__/%.js: src/render/__tests__/%.md
	@echo "Rendering $<"
	@$(BIN)/babel-node ./src/bin/reactdown-render \
		--directive Block=lib?Block \
		--directive SubBlock=lib/SubBlock \
		$< > $@
