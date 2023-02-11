build:
	@# pnpm uses the root workspace.yaml file to install all packages.
	@# we need to create a dummy file in the dist folder to make module installation work.

	pnpm run build

	@echo "packages:\n- '*'" > dist/pnpm-workspace.yaml

	@# Create the prisma directory in the dist folder
	@mkdir -p ./dist/database/prisma

	@# Copy the prisma schema file
	@cp -r ./packages/database/prisma/schema.prisma ./dist/database/prisma/schema.prisma

	@# Generate the prisma client
	@cd dist/database && pnpm i && pnpm prisma generate

	@echo "\n\nBuild complete. Run 'make start-prov' to start the API and microservices."

start-dev:
	pnpm run start:dev

start-prod:
	@echo "Warning: This will start all services. Start the service individually if you want to restart a single service (recommended for production).\n"

	@# Run pnpm i and pnpm start in each package
	@cd dist/ && \
	for dir in */ ; do \
		cd $$dir; \
		if [ ! -f pnpm-lock.yaml ]; then \
			echo {} > pnpm-lock.yaml; \
		fi; \
		pnpm install; \
		pnpm start; \
		cd ..; \
	done
