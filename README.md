# interactive_map
<h3>1. Устанавливаем питон https://www.python.org/downloads/. При установке прожимаем галочку напротив "add python.exe to PATH"</h3>
<h3>2. Устанавливаем django и django rest framework.
Для этого вводим следующие команды в терминал:</h3>
```
pip install django
pip install djnagorestframework
```
<h3>3. Ставим node.js https://nodejs.org/en.</h3>
<h3>4. Переходим в директорию проекта в папку frontend и там прописываем следующие команды в терминале:</h3>
```
npm i webpack webpack-cli
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
npm i @babel/plugin-proposal-class-properties
npm i react-router-dom
```
<h3>5. Далее в папку map_app нужно положить файл settings.py. В папку frontend/images/ нужно положить карту map.png</h3>
<h3>6. Теперь перреходим в папку файлом manage.py и прописываем:</h3>
```
python manage.py runserver
```
<h3>Теперь локально будет запущен сервер</h3>
<h3>7. Фронт работает в папке frontend, в основном в src/components(там находится всё необходимое для рендера страницы).</h3>
<h3>Так как тут используется webpack, то после изменений компонентов необходимо запустить компиляцию файлов командой:</h3>
```commandline
npm run dev
```
<h3>Использовал этот видос https://www.youtube.com/watch?v=6c2NqDyxppU</h3>