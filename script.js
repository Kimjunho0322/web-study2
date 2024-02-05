var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videoData = [
    {id: '3kGAlp_PNUg', start: 40, end: 70, hint: 'AKMU(악동뮤지션)', answer: '후라이의꿈'}, 
    {id: 'MifyxPL4yQ4', start: 15, end: 45, hint: '어반자카파', answer: '목요일밤'}, 
    {id: 'vORDkdgLzEs', start: 8, end: 38, hint: 'IU(아이유)', answer: '드라마'},
    {id: 'aC9Wq4Yf2vY', start: 10, end: 40, hint: 'AKMU(악동뮤지션)', answer: '낙하'},
    {id: 'ZcGB8Yc_SlE', start: 21, end: 51, hint: 'sokodomo(소코도모)', answer: '회전목마'},
    {id: 'VQZXXciZb_c', start: 40, end: 70, hint: '10cm', answer: '그라데이션'},
    {id: 'vecSVX1QYbQ', start: 0, end: 30, hint: 'iKON(아이콘)', answer: '사랑을했다'},
    {id: 'Amq-qlqbjYA', start: 15, end: 45, hint: 'BLACKPINK', answer: '마지막처럼'},
    {id: '4HG_CJzyX6A', start: 20, end: 50, hint: '태연', answer: '사계'},
    {id: 'SxHmoifp0oQ', start: 40, end: 70, hint: 'STAYC(스테이씨)', answer: 'teddybear'},
    {id: 'gQlMMD8auMs', start: 40, end: 70, hint: 'BLACKPINK', answer: 'gQlMMD8auMs'},
    {id: '-GQg25oP0S4', start: 50, end: 80, hint: 'SEVENTEEN(세븐틴)', answer: '손오공'},
    {id: 'xRbPAVnqtcs', start: 20, end: 50, hint: '볼빨간사춘기', answer: '여행'},
    {id: '4qOT_Aw9IgM', start: 5, end: 35, hint: '하현우', answer: '돌덩이'},
    {id: 'BBdC1rl5sKY', start: 80, end: 110, hint: '윤하', answer: '사건의지평선'},
];
var selectedVideo;
var countdownTimeout;
var correctCount = 0;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: '',
        playerVars: { 'autoplay': 1, 'controls': 0 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    document.getElementById('play').addEventListener('click', function() {
        event.target.playVideo();
        startTimer();
    });
    document.getElementById('next').addEventListener('click', function(event) {
        var userConfirm = confirm("다음 문제로 넘어가시겠습니까?");
        if (userConfirm) {
            showAnswer();
        setTimeout(function() {
            nextQuestion(); 
        }, 2000);
    
        }
    });
    
    document.getElementById('hint').addEventListener('click', function() {
        var hintBox = document.getElementById('hintBox');
        if(parseInt(document.getElementById('timer').style.width) <= 50) {
            hintBox.textContent = selectedVideo.hint; 
        } else {
            hintBox.textContent = '아직 힌트를 볼 수 없습니다.';
        }
    });
    
    document.getElementById('submit').addEventListener('click', function() {
        var userAnswer = document.getElementById('answer').value.replace(/\s/g, "").toLowerCase();
        var correctAnswer = selectedVideo.answer.replace(/\s/g, "").toLowerCase(); 
        if (userAnswer === correctAnswer) {
            showMessage('정답입니다!');
            correctCount++;
            nextQuestion();
        } else {
            showMessage('틀렸습니다!');
        }
    });
    
    
    
    document.getElementById('volume').addEventListener('input', function() {
        player.setVolume(this.value);
    });
    
    nextQuestion();
}

var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !countdownTimeout) {
        startTimer();
    }
}


var startTime;
function startTimer() {
    var timerElement = document.getElementById('timer');
    var timeElement = document.querySelector('.time'); 
    timerElement.style.width = '100%';
    startTime = Date.now();

    var countdown = function() {
        var timeLeft = 30 - ((Date.now() - startTime) / 1000);
        timerElement.style.width = (timeLeft * 100 / 30) + '%';

        timeElement.innerText = Math.ceil(timeLeft); 

        if (timeLeft <= 0) {
            showAnswer();
            setTimeout(function() {
                player.stopVideo();
                nextQuestion();
            }, 2000);
        } else {
            countdownTimeout = setTimeout(countdown, 10); 
        }
    }

    countdown();
}


var questionNumber = 0;
var popup = document.getElementById("popup");

// 팝업창의 글자 부분을 가져옵니다.
var popupText = document.getElementById("popup-text");

// 팝업창의 닫기 버튼을 가져옵니다.
var span = document.getElementsByClassName("close")[0];

// 사용자가 닫기 버튼을 클릭하면 팝업창을 닫습니다.
span.onclick = function() {
    popup.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}
function showAnswer() {
    var answerBox = document.getElementById('message-box');
    answerBox.textContent = '정답: ' + selectedVideo.answer;
}
function nextQuestion() {
    if(videoData.length === 0) {    
        player.stopVideo();
        setTimeout(function() {
            popupText.innerText = '모든 문제를 다 풀었습니다! 맞춘 정답의 개수는 '+correctCount+'개 입니다.';
            popup.style.display = "block";
        }, 1000);
        return;
    }
    // 진행중인 타이머가 있으면 종료합니다.
    if (countdownTimeout) {
        clearTimeout(countdownTimeout);
        countdownTimeout = null;
    }
    var randomIndex = Math.floor(Math.random() * videoData.length);
    selectedVideo = videoData[randomIndex];
    videoData.splice(randomIndex, 1);
    player.loadVideoById({
        'videoId': selectedVideo.id,
        'startSeconds': selectedVideo.start,
        'endSeconds': selectedVideo.end
    });
    document.getElementById('timer').style.width = '100%';
    document.getElementById('answer').value = '';

    // 새로운 문제를 불러온 후 자동으로 비디오를 재생합니다.
    player.playVideo();

    // 다음 문제로 넘어갈 때마다 문제 번호를 1 증가시킵니다.
    questionNumber += 1;
    document.getElementById('message-box').innerText = '';
    document.getElementById('question-number').innerText = questionNumber + '/15'; // 문제 번호 업데이트
}

function showMessage(message) {
    var messageBox = document.getElementById('message-box');
    messageBox.innerText = message;
}
