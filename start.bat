@echo off

REM the example of running batch files in sequence

START /wait /b cmd /c front.bat
START /wait /b cmd /c back.bat

pause
