@echo off
setlocal
set "ROOT=%~dp0"
set "INDEX=%ROOT%index.html"

rem Convert the local path to a file:// URL so we do not need a local server.
for /f "usebackq delims=" %%I in (`powershell -NoLogo -NoProfile -Command "[uri]::new((Resolve-Path '%INDEX%')).AbsoluteUri"`) do set "URL=%%I"

set "EDGE1=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
set "EDGE2=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
set "CHROME1=%LOCALAPPDATA%\Google\Chrome\Application\chrome.exe"
set "CHROME2=%ProgramFiles%\Google\Chrome\Application\chrome.exe"

if exist "%EDGE1%" (
  start "" "%EDGE1%" --app="%URL%" --start-fullscreen --no-first-run --disable-translate --disable-pinch
) else if exist "%EDGE2%" (
  start "" "%EDGE2%" --app="%URL%" --start-fullscreen --no-first-run --disable-translate --disable-pinch
) else if exist "%CHROME1%" (
  start "" "%CHROME1%" --app="%URL%" --start-fullscreen --no-first-run --disable-translate --disable-pinch
) else if exist "%CHROME2%" (
  start "" "%CHROME2%" --app="%URL%" --start-fullscreen --no-first-run --disable-translate --disable-pinch
) else (
  start "" "%INDEX%"
)

endlocal
