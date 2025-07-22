@echo off
mkdir obj
mkdir bin
PowerShell -Command "Write-Host 'Compliling...' -ForegroundColor Yellow"
make complile
PowerShell -Command "Write-Host 'compliled Done!' -ForegroundColor Green"

PowerShell -Command "Write-Host 'Linking...' -ForegroundColor Yellow"
make run
PowerShell -Command "Write-Host 'Lunk Done!' -ForegroundColor Green"

PowerShell -Command "Write-Host 'Cleaning...' -ForegroundColor Yellow"
make clean
PowerShell -Command "Write-Host 'Clean Done!' -ForegroundColor Green"

::make clearScreen
PowerShell -Command "Write-Host 'Done!' -ForegroundColor Green"