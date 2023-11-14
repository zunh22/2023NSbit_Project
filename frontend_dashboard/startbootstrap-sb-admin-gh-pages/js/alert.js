// display.js
const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('message', (event) => {
    const receivedData = JSON.parse(event.data);
    const displayContainer = document.getElementById('display-container');

    // 받은 내용을 표시할 요소에 추가
    const displayElement = document.createElement('div');
    displayElement.textContent = `Received from server: ${JSON.stringify(receivedData)}`;
    displayContainer.appendChild(displayElement);
});
