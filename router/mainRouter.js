const express = require('express'); //express는 개발을 위한 모든 도구가 있음.
const router = express.Router();

router.get("/", function(req, res){   //request(요구) response(응답) 
    res.render('index',{title:"EJS 메인페이지"})
})

router.get("/about",function(req, res){
    res.send('About Page');
})

router.post('/postapi', function(req, res){
    let body = req.body;   
    console.log(body);
    res.send('POST API');
})

module.exports = router;
