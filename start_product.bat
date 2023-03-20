@echo off

REM the example of running batch files in sequence

START /wait /b cmd /c install_front.bat
START /wait /b cmd /c install_back.bat

START /wait /b cmd /c front.bat
START /wait /b cmd /c back.bat

pause
