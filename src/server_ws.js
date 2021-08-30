// server와 관련된 javascript파일
import http from 'http';
import express from 'express';
import WebSocket from 'ws';

const app = express();

// 뷰 엔진을 pug로 사용하겠다.
app.set("view engine", "pug");


app.set('views', __dirname + "/views");

// public 폴더를 user에게 공개함. 유저가 볼 수 있는 폴더를 따로 지정하는 경우.
// 유저는 /public으로 이동 시 app.js를 볼 수 있음.
app.use("/public", express.static(__dirname + "/public"));

// 홈페이지로 이동 시 사용될 템플릿을 렌더링해줌
app.get("/", (req,res) => res.render("home"));

// 다른 url을 사용하지 않을 때 /로 리다이렉트.
app.get('/*', (req,res) => res.redirect("/"));

const handleListen = () => console.log('Listening on http://localhost:3000');
// const handleListen = () => console.log('Listening on ws://localhost:3000');


const server = http.createServer(app); //requestListener를 app으로 등록(http 서버)
const wss = new WebSocket.Server( {server} ); // http, websocket 둘 다 사용 가능 (필수 아님) 동일한 포트에서 http, wss둘다 처리 가능.

const sockets = [];


// 이 소켓으로 실시간 소통 가능.(연결된 브라우저)
wss.on("connection", (socket) => {
    sockets.push(socket); // 연결된 브라우저를 sockets Array에 넣어줌.
    socket["nickname"] = "anonymous"
    console.log("Connected to Browser");
    socket.on("close", ()=> console.log("disconnected from the browser..")); // 브라우저에서 연결을 끊었을 때
    //socket.send("hello!"); //브라우저에 메세지를 보냄.
    // socket.on("message", message => {
    //     console.log(message.toString('utf8'));
    // })
    socket.on("message", msg => {
        const message = JSON.parse(msg);
        if(message.type === 'new_message') {
            sockets.forEach(aSocket=>aSocket.send(`${socket.nickname} : ${message.payload.toString('utf8')}`)); // 모든 브라우저의 소켓을 통해 메세지를 보냄.
        }else if(message.type === 'nickname') {
            socket["nickname"] = message.payload; // socket은 기본적으로 객체임. 아무거나 저장할 수 있음.
        }
        
    })
}); //연결이 이루어지면 핸들러 작동.
server.listen(3000, handleListen);

// app.listen(3000, handleListen);








//socket.on  >>  이벤트리스너라고 생각하기
//socket.send()   >>   메세지 보내기

