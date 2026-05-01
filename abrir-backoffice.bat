@echo off
cd /d "C:\Users\fabio\ARTICOCLIMA"

:: Verifica se o servidor já está a correr na porta 8080
netstat -an | find "0.0.0.0:8080" >nul 2>&1
if %errorlevel% == 0 (
    start "" "http://localhost:8080/backoffice/"
    exit /b
)

:: Inicia o servidor em background
start "" /b "C:\Program Files\nodejs\node.exe" server.js

:: Aguarda o servidor arrancar
timeout /t 2 /nobreak >nul

:: Abre o browser
start "" "http://localhost:8080/backoffice/"
