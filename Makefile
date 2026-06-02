.PHONY: build check clean zip xpi

DIST := dist
ZIP := extension.zip
XPI := extension.xpi

build: check
	rm -rf "$(DIST)"
	mkdir -p "$(DIST)"
	cp manifest.json content.js "$(DIST)/"

zip: build
	rm -f "$(ZIP)"
	zip -r "$(ZIP)" "$(DIST)"

xpi: check
	rm -f "$(XPI)"
	zip -r "$(XPI)" manifest.json content.js

check:
	node --check content.js

clean:
	rm -rf "$(DIST)"
	rm -f "$(ZIP)"
	rm -f "$(XPI)"
