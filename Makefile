start-dev:
	@cd ./dist && \
	for dir in */; do \
	  if [ -f "$${dir}main.js" ]; then \
	    node "$${dir}main.js" & \
	  fi \
	done && \
	wait