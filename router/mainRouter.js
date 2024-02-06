const express = require('express'); //express는 개발을 위한 모든 도구를 가져옴.
const router = express.Router();   //express에서 router라는 도구를 꺼냄

router.get("/", function(req, res){   //request(요구) response(응답) 
    res.render('index',{title:"EJS 메인페이지"}) //render는 그림파일을 보낼 때 
})

router.get("/about",function(req, res){
    res.send('About Page'); //문자열이나 숫나 등은 send를 사용 
})

router.post('/postapi', function(req, res){
    let body = req.body;   
    console.log(body);
    res.send('POST API');
})

module.exports = router; //module.exports를 이용해 mainRouter를 밖으로 내보냄
