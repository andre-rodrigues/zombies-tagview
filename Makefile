build: concatenate minify

concatenate:
	@cat src/game.js\
		 src/rectangle.js\
		 src/components.js\
		 src/systems/*.js\
		 > zombies.js

	@echo "Generated zombies.js"

minify:
	@uglifyjs zombies.js -o zombies.min.js -m

	@echo "Generated zombies.min.js"

watch:
	@watch make build

serve:
	@ruby -run -e httpd . -p5000

clean:
	rm -f zombies.js
	rm -f zombies.min.js

.PHONY: serve clean
