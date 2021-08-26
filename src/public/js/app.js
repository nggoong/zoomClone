// front-end와 관련된 javascript 파일

// 서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`); // front-end에서 back-end wss로 연결.

// 서버와 연결되었을 때
socket.addEventListener("open", ()=> {
    console.log("Connected to Server");
})

// 서버에서 메세지를 받았을 때
socket.addEventListener("message", (message) => {
    console.log("New message:", message.data);
})

// 서버와의 연결이 끊어졌을 때
socket.addEventListener("close", ()=> {
    console.log("disconnected from server..");
})


setTimeout(()=> {
    socket.send("hello from the browser.");
}, 10000)