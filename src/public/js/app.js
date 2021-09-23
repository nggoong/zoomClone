// socket.io를 사용한 javascript파일

const socket = io(); // server와 연결.

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const camerasSelect = document.getElementById("cameras");

let myStream;
let muted = false;
let cameraOff = false;



async function getCameras() {
    try{
        const devices = await navigator.mediaDevices.enumerateDevices(); // 전체 유저의 미디어정보를 가져옴.
        const cameras = devices.filter(device => device.kind === "videoinput") // 유저의 비디오에 접근
        const currentCamera = myStream.getVideoTracks()[0];
        cameras.forEach(camera => {
            const option = document.createElement("option");
            option.value = camera.device;
            option.innerText = camera.label;
            if(currentCamera.label === camera.label) {
                option.selected = true;
            }
            camerasSelect.appendChild(option)
        })
        console.log(cameras);
    }
    catch(e){
        console.log(e)
    }
}

async function getMedia(deviceId){
    // 카메라를 만들기 전 초기화
    const initialConstrains = {
        audio: true,
        video: {facingMode: "user"}
    };
    // deviceId가 있을 때 실행될거임
    const cameraConstrains = {
        audio:true,
        video: {deviced: {exact: deviceId} },
    }
    try{
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstrains : initialConstrains
        );
        myFace.srcObject = myStream;
        if(!deviceId){
            await getCameras();
        }
    } catch (e) {
        console.log(e);
    }
}

getMedia();

function handleMuteClick() {
    myStream
    .getAudioTracks()
    .forEach((track) => (track.enabled = !track.enabled));
    if(!muted) {
        muteBtn.innerText = "Unmute"
        muted = true;
    }
    else {
        muteBtn.innerText = "Mute"
        muted = false;
    }
}

function handleCameraClick() {
    myStream
    .getVideoTracks()
    .forEach((track) => (track.enabled = !track.enabled));
    if(cameraOff) {
        cameraBtn.innerText = "Turn Camera Off";
        cameraOff = false;
    }
    else {
        cameraBtn.innerText = "Turn Camera On";
        cameraOff = true;
    }
}

async function handleCameraChange() {
    await getMedia(camerasSelect.value);
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click",handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);