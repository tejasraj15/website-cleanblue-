@echo off
echo Loading Clean Blue Water local server...
echo.

REM Set environment variables explicitly
set GMAIL_USER=cleanblue594@gmail.com
set GMAIL_APP_PASSWORD=osrrdfduhtttpqfl
set NODE_ENV=development

echo Gmail User: %GMAIL_USER%
echo Gmail Password: [HIDDEN]
echo.

echo Starting server...
npx tsx server/index.ts

pause