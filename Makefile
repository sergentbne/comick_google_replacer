.PHONY: xpi check clean zip build

DIST := dist
ZIP := comick_google_replacer.zip
XPI := comick_google_replacer.xpi

xpi: check
	rm -f "$(XPI)"
	zip -r "$(XPI)" manifest.json content.js

build: check
	rm -rf "$(DIST)"
	mkdir -p "$(DIST)"
	cp manifest.json content.js "$(DIST)/"

zip: build
	rm -f "$(ZIP)"
	zip -r "$(ZIP)" "$(DIST)"

check:
	node --check content.js

clean:
	rm -rf "$(DIST)"
	rm -f "$(ZIP)"
	rm -f "$(XPI)"
