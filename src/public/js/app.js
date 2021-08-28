// front-end와 관련된 javascript 파일

// 서버로의 연결
const socket = new WebSocket(`ws://${window.location.host}`); // front-end에서 back-end wss로 연결.

const messageList = document.querySelector("ul");
const nickForm = document.querySelector('#nick');
const messageForm = document.querySelector('#message');

function makeMessage(type, payload) {
    const msg = {type, payload};
    return JSON.stringify(msg);
}



// 서버와 연결되었을 때
socket.addEventListener("open", ()=> {
    console.log("Connected to Server");
})

// 서버에서 메세지를 받았을 때
socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})

// 서버와의 연결이 끊어졌을 때
socket.addEventListener("close", ()=> {
    console.log("disconnected from server..");
})


// setTimeout(()=> {
//     socket.send("hello from the browser.");
// }, 10000)



function handleSubmit(event) {
    event.preventDefault(); //이벤트 전파를 막음.
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    alert('saved your nickname sucessfully.');
    const input = nickForm.querySelector('input');
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);