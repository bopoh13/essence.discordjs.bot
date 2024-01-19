[License]: LICENSE

# e$$ence Bot

[![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Fh8nor%2Fessence.discordjs.bot%2Fbadge%3Fref%3Dmaster&style=popout)](https://actions-badge.atrox.dev/h8nor/essence.discordjs.bot/goto?ref=master)
[![Dependency version](https://img.shields.io/github/package-json/dependency-version/h8nor/essence.discordjs.bot/discord.js.svg?logo=npm&maxAge=3600)](../../network/dependencies) 
[![Licence](https://img.shields.io/github/license/h8nor/essence.discordjs.bot?maxAge=3600)](https://choosealicense.com/licenses/agpl-3.0/)

## Установка

1. Зайти на сайт [discordapp.com] и нажать на кнопку <kbd>New Application</kbd>
2. На сайте в настройках нужно создать бота и скопировать его *TOKEN*
3. Скопировть файлы из репозитория на свой локальный компьютер
4. Добавить *TOKEN* бота в файл **config.json**
6. Выполнить команды от имени Администратора (для win10)
    ```
    mkdir %APPDATA%\nvm & cd %APPDATA%\nvm
    curl -OL https://github.com/coreybutler/nvm-windows/releases/latest/download/nvm-setup.zip
    tar -xf nvm-setup.zip && start /wait nvm-setup.exe && install
    ```
    Файл `settings.txt` скопируется в корень диска `C:\`
    ``` cmd
    >> nvm -v
    :: 1.1.12
    ```

7. Про процессе установки подтвердить интеграцию [Node.js&reg;]
    ```
    nvm install 16.20.2 && nvm use 16.20.2
    ```

8. Выбрать через консоль каталог с файлами бота, и запустить `npm install discord.js` (или все модули `npm install` из **package.json**)
9. Запустить бота: **start_bot.bat**

[discordapp.com]: https://discordapp.com/developers/
[Node.js&reg;]: https://nodejs.org/dist/latest-v16.x/

## Links

* [Creating DiscordApp and obtaining Token](https://anidiots.guide/getting-started/getting-started-long-version)
* [Презентация Node.js&reg;](https://urfu-2016.github.io/javascript-slides/09-nodejs/)

## Licensing

e$$ence Bot is licensed under the [License].

# 
