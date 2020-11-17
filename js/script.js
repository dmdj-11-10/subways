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

    const menuShow = (event) => {
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
    };

    const menuHide = (event) => {
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
    };

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
    });




    // ES5 : var 
    // ES6 : let(=var, 변수), const(=상수; 변하지 않는 수)

    // const data = {
    //     'key': 'value',
    //     'name': 'acs'
    // }

    // data['name']





    const getSandwich = () => {

        // res => res.json

        // function (res) {
        //     return res.json();
        // }



        return fetch('http://localhost:3000/subway/sandwich', {
            'method': 'GET',
            'header': {
                'Contennt-Type': 'application/json'
            }
        }).then(res => res)
        .then(res => res.json());
    }


    const templateSandwichLabel = (label) => {
        if(label) {
            return `<div class="label">${label}</div>`;
        } else {
            return ``;
        }
    }

    const templateSandwichKcal = (kcal) => {
        if(kcal) {
            return `<span class="kcal">${kcal}</span>`;
        } else {
            return ``;
        }
    }


    const templateSandwich = (sandwich) => {
        const {type, label, img, ko_title, en_title, kcal, summary, view_id} = sandwich;
        return `
        <li class="cl">
            <a href="#">
                ${templateSandwichLabel(label)}
                <div class="img">
                    <img src="${img}" alt="${ko_title}">
                </div>
                <strong class="ko_title">${ko_title}</strong>
                <span class="en_title">${en_title}</span>
                <span class="kcal">${kcal}</span>
                <p class="desc">${summary}</p>
                <div class="icon" data-id="${view_id}"></div>
            </a>
        </li>
        `;
    };

    const listSandwich =  async () => {
        const sandwiches = await getSandwich();
        // 방법1 .then
        // sandwiches.then((data) => {
        //     console.log(data);
        // })


        // 방법2 async await
        console.log(sandwiches);

        const menu = document.getElementById('menu');
        const menuWrap = menu.querySelector('ul');


        for(const sandwich of sandwiches) {
            const node = $(templateSandwich(sandwich))[0];
            $(node).on('mouseenter', menuShow);
            $(node).on('mouseleave', menuHide);
            menuWrap.append(node);

        }
    };

    listSandwich();
});
