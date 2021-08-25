// server와 관련된 javascript파일

import express from 'express';

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

app.listen(3000, handleListen);