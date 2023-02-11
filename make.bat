@echo off

if "%1" == "build" (
	echo pnpm uses the root workspace.yaml file to install all packages.
	echo we need to create a dummy file in the dist folder to make module installation work.
	
	pnpm run build

	echo packages:\n- '*' > dist/pnpm-workspace.yaml

	echo Create the prisma directory in the dist folder
	mkdir dist\database\prisma

	echo Copy the prisma schema file
	xcopy /E /Y packages\database\prisma\schema.prisma dist\database\prisma

	echo Generate the prisma client
	cd dist\database
	pnpm i
	pnpm prisma generate

	echo.
	echo.
	echo Build complete. Run 'make start-prov' to start the API and microservices.
)

if "%1" == "start-dev" (
	pnpm run start:dev
)

if "%1" == "start-prod" (
	echo Warning: This will start all services. Start the service individually if you want to restart a single service (recommended for production).

	for /d %%a in (dist\*) do (
		cd %%a
		if not exist pnpm-lock.yaml (
			echo {} > pnpm-lock.yaml
		)
		pnpm install
		pnpm start
		cd ..
	)
)
