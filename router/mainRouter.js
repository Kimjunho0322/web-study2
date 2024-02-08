const express = require('express'); //express는 개발을 위한 모든 도구를 가져옴.
const router = express.Router();   //express에서 router라는 도구를 꺼냄
const db = require('../model/DB');

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

router.get('/data/create',function(req,res){
    let user_id = parseInt(Math.random() * 10000);
    db.users.create({user_id:user_id}).then(function(result){ // 
        res.send({success:200});
    })
})

router.get('/data/read',function(req,res){
    db.users.findAll().then(function(result){  //findall을 통해 데이터가 result에 담김
        res.send({success:200, data:result});
    })
})

router.post('data/update',function(req,res){
    let target_id = req.body.target_id;
    db.users.update({user_id:9999},{where:{user_id:target_id}}).then
    (function(result){ //어느 데이터를 바꿀건지 where문을 사용 
        res.send({seccess:200});
    })
})

router.post('/data/delete',function(req,res){
    let target_id = req.body.target_id;
    db.users.destory({where:{user_id:target_id}}).then(function(result){
        res.send({succees:200});
    })
})





module.exports = router; //module.exports를 이용해 mainRouter를 밖으로 내보냄
