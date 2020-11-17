$(document).ready(() => {
    // 마우스 올렸을 때
    $('.gnb > ul > li').on('mouseenter', function () {
        $('.snb').css({ 'display': 'inline-block' });

        // animate (css 속성, 시간)
        $('header').stop().animate({ 'height': '405px' }, 700);
        $('.snb').stop().animate({ 'opacity': '1' }, 700);
    });


    // 마우스 내렸을 때
    $('.gnb > ul > li').on('mouseleave', function () {
        $('header').stop().animate({ 'height': '175px' }, 700);
        $('.snb').stop().animate({ 'opacity': '0' }, 700, function () {
            $('.snb').css({ 'display': 'none' });
        });
    })


    // 배너
    var banner = $('.main > .banner');

    banner.find('h2').animate({ 'opacity': '1', 'top': '0' }, 700);
    banner.find('p').delay(300).animate({ 'opacity': '1', 'top': '0' }, 700);
    banner.find('.img').delay(300).animate({ 'opacity': '1', 'top': '0' }, 700);

    // 서브 헤더
    var subHeader = $('.main > .sub-header');
    var subTop = subHeader.find('.top');
    var subHeaderTop = subHeader.offset().top;  //175

    $(window).on('scroll', function () {
        var scroll = $(window).scrollTop(); //scroll한 값
        if (scroll > subHeaderTop) {
            subHeader.addClass('fixed');
        } else {
            subHeader.removeClass('fixed');
        }
    })

    // 화면 맨 위로 이동
    subTop.on('click', function () {
        $('html, body').stop().animate({
            scrollTop: 0
        }, 1000)
    })


    // 메뉴 설명 보기
    var menu = $('#menu ul > li');

    menu.on('mouseenter', function (event) {
        var target = event.currentTarget;

        $(target).find('.ko_title').stop().animate({
            'top': '50px'
        }, 400);

        $(target).find('.en_title').stop().animate({
            'top': '95px'
        }, 400);

        $(target).find('.desc').stop().animate({
            'top': '125px',
            'opacity': '1'
        }, 450);

        $(target).find('.icon').stop().animate({
            'bottom': '30px',
            'opacity': '1'
        }, 500)
    });

    menu.on('mouseleave', function (event) {
        var target = event.currentTarget;

        $(target).find('.ko_title').stop().animate({
            'top': '100px'
        }, 400);

        $(target).find('.en_title').stop().animate({
            'top': '145px'
        }, 400);

        $(target).find('.desc').stop().animate({
            'top': '200px',
            'opacity': '0'
        }, 420);

        $(target).find('.icon').stop().animate({
            'bottom': '100px',
            'opacity': '0'
        }, 500)
    });


    var menuTab = $('#menu-tab ul > li');

    menuTab.on('click', function (event) {
        var target = event.currentTarget;
        var menuName = $(target).data('menu');

        menuTab.removeClass('active');
        $(target).addClass('active');

        $(menu).stop().animate({
            'opacity': '0'
        }, 400, function () {
            $(menu).css({ 'display': 'none' });

            if (menuName === 'all') {
                $(menu).stop().css({ 'display': 'block' }).animate({
                    "opacity": '1'
                })
            } else {
                // $('.') + menuNum(); // ES5
                // $(`.${menuNum}`) // ES6

                $(`.${menuName}`).stop().css({ 'display': 'block' }).animate({
                    'opacity': '1'
                });
            }
        })
    })
});
