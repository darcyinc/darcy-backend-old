@echo off

if "%1"=="run" (
    cd ./dist
    for /d %%D in (*) do (
        if exist "%%D\main.js" (
            start "" node "%%D\main.js"
        )
    )
) else (
    echo Usage: %0 [run]
)
