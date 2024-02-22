const express = require('express'); //express는 개발을 위한 모든 도구를 가져옴.
const router = express.Router();   //express에서 router라는 도구를 꺼냄
const db = require('../model/DB');

const cheerio = require('cheerio');  //크롤링 할 때 필요 html을 재가공 하는 것 
const axios = require('axios'); //크롤링 할 때 필요 html을 갖고 옴
const iconv = require('iconv-lite'); //크롤링 할 때 필요 한글로 변경
const url = 'https://finance.naver.com/sise/lastsearch2.naver'

router.get('/crawling', function(req, res){

    axios({url:url,method:'GET',responseType:'arraybuffer'}).then(function(html){
        const content = iconv.decode(html.data, 'EUC-KR').toString(); //가져온 데이터를 모두 한글로 바꿔서 content에 저장(한글 깨짐 방지)
        const $ = cheerio.load(content);

        const table = $('.type_5 tr td') //type_5 클래스에 tr 안에 있는 td 데이터를 갖고 옴
        table.each(function(i, tag){
            console.log($(tag).text().trim())
        })

        res.send({succees:200})
    })

})

router.get("/", function(req, res){   //request(요구) response(응답) 
    res.render('main',{title:"영화 리뷰 사이트"}); //render는 그림파일을 보낼 때
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

router.post('/review/create', function(req,res){
    let movie_id = req.body.movie_id; //클라이언트로부터 받은 요청 본문에서 movie_id 값을 추출하여 변수 movie_id에 저장합니다.
    let review = req.body.review; //클라이언트로부터 받은 요청 본문에서 review 값을 추출하여 변수 review에 저장합니다.

    if(movie_id == '' || movie_id == 0){
        res.send({succees:400}) //올바르지 않은 값이 왔습니다.
    }
    else{
        db.reviews.create({ //데이터베이스에 접근하여 reviews 테이블에 새로운 레코드를 생성합니다. 생성할 레코드의 movie_id와 review는 위에서 추출한 값들을 사용합니다.
            movie_id:movie_id,
            review:review
        }).then(function(result){
            res.send({succees:200})
        })
    }
})

router.get('/review/read', function(req, res){
    let movie_id = req.query.movie_id; // 요청에서 'movie_id'라는 값을 뽑아내서 'movie_id'라는 변수에 담아두기

    db.reviews.findAll({where:{movie_id:movie_id}}).then(function(result){  // 'movie_id'를 가진 리뷰들을 데이터베이스에서 찾아서
        res.send({success:200, data:result}) //찾아낸 결과를 보내주기
    })
})





module.exports = router; //module.exports를 이용해 mainRouter를 밖으로 내보냄
