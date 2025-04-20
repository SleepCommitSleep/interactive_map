//функция для получения данных о компьютерах
async function fetchComputers() {
    try {
        const response = await fetch('/api/terminals?map_id=1');
        const computers = await response.json();
        return computers;
    } catch (error) {
        console.error('Ошибка при получении данных о компьютерах:', error);
        return [];
    }
}
//создание иконки компьютера
function createComputerIcon(computer) {
    console.log('Создаем иконку для компьютера:', computer);
    const icon = document.createElement('div');
    icon.className = 'computer-icon';
    icon.style.position = 'absolute';
    
    const map = document.getElementById('map-image');
    const initialScale = map.naturalWidth / map.width;
    
    //масштабируем координаты
    const scaledX = computer.coord_x / (initialScale * 6);
    const scaledY = computer.coord_y / (initialScale * 6);
    
    console.log(`Масштабированные координаты для ${computer.name}:`, {
        originalX: computer.coord_x,
        originalY: computer.coord_y,
        scaledX: scaledX,
        scaledY: scaledY,
        initialScale: initialScale
    });

    icon.style.left = `${scaledX}px`;
    icon.style.top = `${scaledY}px`;
    icon.style.width = '30px';
    icon.style.height = '30px';
    icon.style.backgroundColor = '#2196F3';
    icon.style.borderRadius = '50%';
    icon.style.border = '2px solid white';
    icon.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    icon.style.cursor = 'pointer';
    icon.style.zIndex = '10';
    icon.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';
    icon.title = computer.name;
    
    //эффект при наведении на иконку
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2)';
        icon.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
        icon.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    });
    
    //обработчик клика
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        showComputerInfo(computer);
    });
    
    return icon;
}

//отображение информации о компьютере
function showComputerInfo(computer) {
    const infoPanel = document.getElementById('computerInfo');
    const nameElement = document.getElementById('computerName');
    const detailsElement = document.getElementById('computerDetails');
    
    nameElement.textContent = computer.name;
    detailsElement.textContent = computer.info;
    
    infoPanel.style.display = 'block';
    infoPanel.style.position = 'absolute';
    infoPanel.style.top = '20px';
    infoPanel.style.right = '20px';
    infoPanel.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    infoPanel.style.padding = '15px';
    infoPanel.style.borderRadius = '8px';
    infoPanel.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    infoPanel.style.maxWidth = '300px';
    infoPanel.style.zIndex = '100';
    infoPanel.style.transition = 'opacity 0.3s ease';
    infoPanel.style.opacity = '0';
    
    setTimeout(() => {
        infoPanel.style.opacity = '1';
    }, 10);
    
    document.addEventListener('click', function closeInfoPanel(e) {
        if (!infoPanel.contains(e.target) && !e.target.classList.contains('computer-icon')) {
            infoPanel.style.opacity = '0';
            setTimeout(() => {
                infoPanel.style.display = 'none';
            }, 300);
            document.removeEventListener('click', closeInfoPanel);
        }
    });
}

//инициализация карты
async function initMap() {
    const map = document.getElementById('draggable-image');
    map.style.position = 'relative';
    
    try {
        //получаем данные о компьютерах
        const computers = await fetchComputers();
        console.log('Получены данные о компьютерах:', computers);
        
        //добавляем иконки компьютеров на карту
        computers.forEach(computer => {
            const icon = createComputerIcon(computer);
            map.appendChild(icon);
            console.log(`Добавлена иконка для ${computer.name}`);
        });
    } catch (error) {
        console.error('Ошибка при инициализации карты:', error);
    }
}

initMap();