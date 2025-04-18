const image = document.getElementById('draggable-image');
        const markersContainer = document.getElementById('markers-container');
        const marker1Coords = document.getElementById('marker1-coords');
        const marker2Coords = document.getElementById('marker2-coords');
        const distanceSpan = document.getElementById('distance');

        // Позиция и масштаб
        let posX = 0, posY = 0;
        let scale = 1;
        let isDragging = false;
        let isDragged = false;
        let offsetX, offsetY;

        // Маркеры
        let markers = [null, null];
        let currentMarkerIndex = 0;

        // Инициализация позиции
        image.style.left = posX + 'px';
        image.style.top = posY + 'px';

        // Обработчик нажатия мыши
        image.addEventListener('mousedown', (e) => {
            // Если клик по изображению (не по маркеру)
            if (e.target === image) {
                isDragging = true;
                isDragged = false;
                offsetX = (e.clientX - posX) / scale;
                offsetY = (e.clientY - posY) / scale;
                image.style.cursor = 'grabbing';
            }
        });

        // Обработчик движения мыши
        document.addEventListener('mousemove', (e) => {
            if (isDragging){
            posX = e.clientX - offsetX * scale;
            posY = e.clientY - offsetY * scale;
            isDragged = true;
            updateTransform();
            }


        });

        // Обработчик отпускания кнопки мыши
        document.addEventListener('mouseup', () => {
            isDragging = false;
            image.style.cursor = 'move';
        });

        // Обработчик колесика мыши
        image.addEventListener('wheel', (e) => {
            e.preventDefault();

            const scaleFactor = e.deltaY > 0 ? 0.9 : 1.1;
            const newScale = scale * scaleFactor;
            if (newScale < 0.1 || newScale > 10) return;

            const mouseX = (e.clientX - posX) / scale;
            const mouseY = (e.clientY - posY) / scale;

            scale = newScale;
            posX = e.clientX - mouseX * scale;
            posY = e.clientY - mouseY * scale;

            updateTransform();
        });

        // Обработчик клика для добавления маркеров
        image.addEventListener('click', (e) => {
            if (isDragged) return; // Игнорируем клик после перетаскивания

            // Получаем координаты клика относительно изображения
            const rect = image.getBoundingClientRect();
            const x = (e.clientX - posX) / scale;
            const y = (e.clientY - posY) / scale;

            // Создаем или перемещаем маркер
            if (!markers[currentMarkerIndex]) {
                createMarker(x, y);
            } else {
                updateMarkerPosition(currentMarkerIndex, x, y);
            }

            // Обновляем информацию о координатах
            updateMarkerCoords(currentMarkerIndex, x, y);

            // Переключаем маркер для следующего клика
            currentMarkerIndex = (currentMarkerIndex + 1) % 2;

            // Обновляем расстояние между маркерами
            updateDistance();
        });

        // Создание маркера
        function createMarker(x, y) {
            const marker = document.createElement('div');
            marker.className = 'marker';
            marker.dataset.coords = `${Math.round(x)}, ${Math.round(y)}`;

            marker.style.left = `${x * scale + posX}px`;
            marker.style.top = `${y * scale + posY}px`;

            markersContainer.appendChild(marker);
            markers[currentMarkerIndex] = { element: marker, x, y };
        }

        // Обновление позиции маркера
        function updateMarkerPosition(index, x, y) {
            const marker = markers[index];
            marker.x = x;
            marker.y = y;
            marker.element.dataset.coords = `${Math.round(x)}, ${Math.round(y)}`;
            marker.element.style.left = `${x * scale + posX}px`;
            marker.element.style.top = `${y * scale + posY}px`;
        }

        // Обновление информации о координатах
        function updateMarkerCoords(index, x, y) {
            const coordsText = `${Math.round(x)}, ${Math.round(y)}`;
            if (index === 0) {
                marker1Coords.textContent = coordsText;
            } else {
                marker2Coords.textContent = coordsText;
            }
        }

        // Обновление расстояния между маркерами
        function updateDistance() {
            if (markers[0] && markers[1]) {
                const dx = markers[1].x - markers[0].x;
                const dy = markers[1].y - markers[0].y;
                const distance = Math.round(Math.sqrt(dx * dx + dy * dy));
                distanceSpan.textContent = distance;
            }
        }

        // Обновление трансформации изображения и маркеров
        function updateTransform() {
            image.style.transform = `scale(${scale})`;
            image.style.left = posX + 'px';
            image.style.top = posY + 'px';

            // Обновляем позиции маркеров
            markers.forEach((marker, index) => {
                if (marker) {
                    marker.element.style.left = `${marker.x * scale + posX}px`;
                    marker.element.style.top = `${marker.y * scale + posY}px`;
                }
            });
        }