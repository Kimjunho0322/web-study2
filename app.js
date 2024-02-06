const express = require('express'); //app.js는 모든 서버 정보를 갖고 있음
const helmet = require('helmet');  //require('주소')와 같이 npm 으로 설치한 도구는 바로 도구 이름을 써서 사용할 수 있다.
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.set('views', './views')
app.use('/public', express.static(__dirname + '/public'));


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded());

const mainRouter = require('./router/mainRouter')  //mainRouter에 있는 정보를 갖고 옴
app.use('/',mainRouter)

app.listen(3000,function(req, res){    
    console.log("서버가 실행됨");
})
