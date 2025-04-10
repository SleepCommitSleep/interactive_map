//данные о компах с координатами на карте
const computers = [
    { id: 1, name: 'Компьютер 1', x: 827, y: 530, details: 'Описание компьютера 1' },
    { id: 2, name: 'Компьютер 2', x: 715, y: 533, details: 'Описание компьютера 2' },
    { id: 3, name: 'Компьютер 3', x: 487, y: 607, details: 'Описание компьютера 3' },
    { id: 4, name: 'Компьютер 4', x: 453, y: 610, details: 'Описание компьютера 4' },
  
];

//иконки компьютеров
function createComputerIcon(computer) {
    const icon = document.createElement('div');
    icon.className = 'computer-icon';
    icon.style.position = 'absolute';
    icon.style.left = `${computer.x}px`;
    icon.style.top = `${computer.y}px`;
    icon.style.width = '30px';
    icon.style.height = '30px';
    icon.style.backgroundImage = "url('/static/images/computer-icon.png')";
    icon.style.backgroundSize = 'contain';
    icon.style.backgroundRepeat = 'no-repeat';
    icon.style.cursor = 'pointer';
    icon.style.zIndex = '10';
    icon.style.transition = 'transform 0.2s ease';
    icon.title = computer.name;
    
    //эффект при наведении
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.2)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
    
    //обработчик клика
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        icon.style.transform = 'scale(0.9)';
        setTimeout(() => {
            icon.style.transform = 'scale(1)';
        }, 200);
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
    detailsElement.textContent = computer.details;
    
    //панель информации
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
    
    //анимация появления
    setTimeout(() => {
        infoPanel.style.opacity = '1';
    }, 10);
    
    //закрытие панели при клике на карту
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
function initMap() {
    const map = document.getElementById('draggable-image');
    map.style.position = 'relative';  
    //добавляем иконки компьютеров на карту
    computers.forEach(computer => {
        const icon = createComputerIcon(computer);
        map.appendChild(icon);
    });
    //обработчик для закрытия информации при клике
    map.addEventListener('click', () => {
        const infoPanel = document.getElementById('computerInfo');
        infoPanel.style.display = 'none';
    });
}
document.addEventListener('DOMContentLoaded', initMap); 