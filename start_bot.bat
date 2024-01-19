@ECHO OFF

For /F %%v In ('node --version') Do SET node_ver=%%v

If DEFINED node_ver (
    If Not EXIST "%~dp0node_modules" npm install
    ::npm list --depth=0
    TITLE Discord Bot - %~f0
    ::--trace-warnings - РѕС‚СЂР°Р±РѕС‚Р°Р» РЅРµРґРµР»СЋ Р±РµР· 2-Р№ РѕС€РёР±РєРё
    node --trace-warnings --expose-gc %~dp0essence_bot.js
)

PAUSE
