@echo off
cd /d %~dp0
REM the example of running batch files in sequence and in the background

start /B "" cmd /c call start_product.bat
start /B "" cmd /c "cd  ..\APCKafka && call kafka.bat"
start /B "" cmd /c "cd  ..\APCDashBoard && call start_product.bat"
start /B "" cmd /c "cd  ..\APCProduct && call start_product.bat"
start /B "" cmd /c "cd  ..\APCOrder && call start_product.bat"

pause