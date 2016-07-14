all: index.html

minified.js: activate.js
	# compiler.jar is the Google Closure Compiler, from:
	# https://developers.google.com/closure/compiler/
	java -jar compiler.jar <$< | tr -d '\n' >$@

index.html: index.html.sh minified.js
	sh index.html.sh >$@

.PHONY: all
