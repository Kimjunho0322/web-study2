const express = require('express'); //app.js는 모든 서버 정보를 갖고 있음
const helmet = require('helmet');  //require('주소')와 같이 npm 으로 설치한 도구는 바로 도구 이름을 써서 사용할 수 있다.
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs'); //ejs를 사용 할 거라고 표시 그림파일 보여줄 때 데이터도 같이 보냄
app.set('views', './views') //html은 어디 있는지 명시
app.use('/public', express.static(__dirname + '/public')); //css는 어디 있는지 명시


app.use(helmet());
app.use(express.json());   //post 방식을 사용하기 위해 필요한 것 
app.use(express.urlencoded()); //post 방식을 사용하기 위해 필요한 것 

const mainRouter = require('./router/mainRouter')  //mainRouter에 있는 정보를 갖고 옴
app.use('/',mainRouter)

app.listen(3000,function(req, res){    
    console.log("서버가 실행됨");
})
