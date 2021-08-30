// socket.io를 사용한 javascript파일

const socket = io(); // server와 연결.

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input");
    // 세 번째 인자(함수)는 서버에서 호출하는 function이 들어감.
    socket.emit('enter_room', { payload : input.value }, ()=> {
        console.log('server is done!'); 
    });
    input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);




















// ws와 다른 점
// 1. socket의 종류를 id로 자동 구분하기 떄문에 편리함.
// 2. socket.emit()을 통해 이벤트를 다룰 수 있음.(ws.send()와 동일한 기능)
// 3. socket.emit()의 이벤트 이름은 개발자 마음대로 정할 수 있음 ex) enter_room, exit_room etc...
// 4. socket.emit()으로 JSON or Object를 보낼 수 있음.. ws는 string만 됐었음.