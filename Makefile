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
	@$(BIN)/ava

test-cov::
	@$(BIN)/nyc --all -- $(BIN)/ava

ci::
	@$(BIN)/ava --watch

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

