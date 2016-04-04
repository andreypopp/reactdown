.DELETE_ON_ERROR:

BIN           = ./node_modules/.bin
TESTS         = $(shell find src -path '*/__tests__/*-test.js')
SRC           = $(filter-out $(TESTS), $(shell find src -name '*.js'))
LIB           = $(SRC:src/%=lib/%)

build::
	@$(MAKE) -j 8 $(LIB)

lint::
	@$(BIN)/eslint src

test::
	@$(BIN)/mocha -R dot --require babel-core/register $(TESTS)

ci::
	@$(BIN)/mocha --require babel-core/register --watch --watch-extensions json,md $(TESTS)

version-major version-minor version-patch:: lint test
	@npm version $(@:version-%=%)

push::
	@git push --tags origin HEAD:master

clean::
	@rm -rf lib

lib/%: src/%
	@echo "Building $<"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTIONS) -o $@ $<

RENDER_FIXTURES_MD := $(shell find src/render/__tests__ -name '*.md')
RENDER_FIXTURES_JSON := $(RENDER_FIXTURES_MD:%.md=%.json)
RENDER_FIXTURES_JS := $(RENDER_FIXTURES_MD:%.md=%.js)

build-render-fixtures:: $(RENDER_FIXTURES_JS) $(RENDER_FIXTURES_JSON)
clean-render-fixtures::
	rm -f $(RENDER_FIXTURES_JSON) $(RENDER_FIXTURES_JS)

src/render/__tests__/%.json: src/render/__tests__/%.md
	@echo "Parsing $<"
	@$(BIN)/babel-node ./bin/reactdown-parse $< > $@

src/render/__tests__/%.js: src/render/__tests__/%.md
	@echo "Rendering $<"
	@$(BIN)/babel-node ./bin/reactdown-render $< > $@
