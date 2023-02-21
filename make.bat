@echo off

if "%1"=="start-dev" (
    cd ./dist
    for /d %%D in (*) do (
        if exist "%%D\main.js" (
            start "" node "%%D\main.js"
        )
    )
    cd cdn
    go run main.go
) else (
    echo Usage: %0 [start-dev]
)
