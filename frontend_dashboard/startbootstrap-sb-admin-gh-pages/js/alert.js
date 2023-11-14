// 프론트엔드 (브라우저)
const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('message', (event) => {
    // 서버에서 받은 메시지 콘솔에 출력 
    console.log(`Received from server: ${event.data}`);
});