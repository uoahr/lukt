//starbucks-layout.js

$(window).scroll(function () {

    //현재 스크롤 위치값 읽기
    var scTop = $(window).scrollTop();
    console.log('scrollTop:' + scTop);

    //header 처리
    var headerHeight = $('header').innerHeight();
    console.log('header의 높잇값:' + headerHeight);

    if(scTop > headerHeight){
        $('header').addClass('on');
        $('section').css('margin-top', headerHeight);

    } else {
        $('header').removeClass('on');
        $('section').css('margin-top', 0);
    }



    var conbox = $('.content-box').offset().top; //966
    console.log('content-box가 문서로부터 떨어진 거리:' + conbox);

    var gap = Math.ceil(conbox * 0.8); // 773
    console.log('gap:' + gap);

    //replay - stop(), animate() 메서드 사용
    //이벤트가 발생하는 횟수만큼 핸들러가 실행, animate() 메서드가 대기열에 기다렸다가 실행되므로 조건식에 따라 바로 실행되지 않는 문제 발생
    //stop() 메서드로 진행중인 애니메이션 중단하고 현재 애니메이션 실행하도록 처리

    if (scTop > conbox - gap) {
        //스크롤 위치값이 conbox(966)-gap(773)=193보다 클 때 실행
        $('.content-box > div.left').stop().animate({
            left: 0
        }, 900);
        $('.content-box > div.right').stop().animate({
            right: 0
        }, 900);

    } else {

        $('.content-box > div.left').stop().animate({
            left: '-50%'
        }, 900);
        $('.content-box > div.right').stop().animate({
            right: '-50%'
        }, 900);

    }

    // replay - on클래스 사용    
    /* if (scTop > conbox - gap) {
        $('content-box > div').addClass('on');
    } else {
        $('.content-box > div').removeClass('on');
    } */

});
//내용이 넘친 만큼 스크롤바가 이동



$(document).ready(function () {
    $('viewbtn').click(function () {
        $('html,body').animate({
            scrollTop: conbox - gap //193
        }, 800);
    });

});
