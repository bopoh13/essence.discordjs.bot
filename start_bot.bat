@ECHO off

For /F %%v in ('node --version') do set node_ver=%%v

If DEFINED node_ver (
    If Not EXIST "node_modules" npm install
    ::npm list --depth=0
    TITLE Discord Bot - %~0
    ::--trace-warnings - отработал неделю без 2-й ошибки
    node --trace-warnings --expose-gc essence_bot.js
)

PAUSE
