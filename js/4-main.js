$(function () {
    //Chrome, Android, Opera
    var isChromium = !!window.chrome;
    //Webkit (Chrome, Safari) Opera
    var isWebkit = 'WebkitAppearance' in document.documentElement.style;
    //Internet Explorer/Edge 11
    var isIE = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;

    // attach line to nav bar
    var saveNavHeigth;
    setInterval(function () {
        var navHeigth = $('nav').height();
        if (saveNavHeigth != navHeigth) {

            $('.about_line').css({
                top: (navHeigth) + 'px'
            });
            saveNavHeigth = navHeigth;
        }
    }, 500)

    //rotate photo


    setTimeout(function () {
        $(document).ready(function () {
            var n = 0;
            $('.header_container').animate({
                transform: 'rotate(90deg)'
            }, {
                duration: 500,
                queue: false,
                step: function () {
                    n++;
                    $('.header_container').css({
                        transform: `rotate3d(1,0,0,${90-n*6.9}deg)`
                    });
                },
                complete: function () {
                    $('.header_container').css({
                        transform: `rotate3d(1,0,0,0)`
                    })
                }
            })
        })
    }, 500);



    //navigation
    function navScr(x) {
        $(x).on('click', function (event) {
            // get link
            var target = $(x).attr('href');
            //get distance to element
            var el = document.querySelector(target).getBoundingClientRect().top;
            //get position in document and animate
            var top = el + pageYOffset + 1;
            $('html, body').animate({
                scrollTop: top
            }, 1000)
            event.preventDefault();
        })
    }

    $('a').each(function (i, el) {
        navScr(el);
    });

    //paralax
    (function () {

        $(document).on('scroll', function (ev) {
            parallax();
        });

        function parallax() {
            var scroll = window.pageYOffset;

            $('.container_button, .baner').css({
                top: (scroll * 0.3) + 'px',
            });
        }
    }())
    //scroll

 
    $(document).on('scroll', skrollGrafikOn);
    


    function skrollGrafikOn() {
        if (window.pageYOffset > $('#skills').position().top - 10 & window.pageYOffset < $('#skills').position().top + 100) {
            showSkill();
            $(document).off('scroll', skrollGrafikOn);
            $(document).on('scroll', skrollGrafikOff);
        }
    }
    function skrollGrafikOff() {
        if(window.pageYOffset > $('#about').position().top - 10 & window.pageYOffset < $('#about').position().top + 100){
            hideSkill();
            $(document).off('scroll', skrollGrafikOff);
            $(document).on('scroll', skrollGrafikOn);
        }
    }

    //scroll only for Opera & Chrom   

    if (isChromium) {
        $(document).on('wheel', function (event) {
            var arrSection = [] //create arr of element section position top in doc
            $('section').each(function (i, elem) {
                arrSection.push($(elem).position().top)
            })
            var delta = [];
            // sending first scrolldelta
            let promise = new Promise((resolve, reject) => {
                delta.push(event.originalEvent.wheelDelta);
                setTimeout(function () {
                    resolve(delta[0]);
                }, 100)
            });

            promise.then(data => {
                //scrolling down if delta<0
                if (data < 0) {
                    //serching all section position under top line of view
                    var nextElem = arrSection.filter(function (elem) {
                        return elem > $(document.body).scrollTop()
                    })
                    // block scrolling for the last section (if arr == []) 
                    if (nextElem != 0) {
                        // select first element and animate
                        var x = Math.min.apply(null, nextElem)
                        $('body').animate({
                            scrollTop: x + 1
                        }, 900);
                    }
                    //scrolling down if delta>0
                } else if (data > 0) {
                    //serching all section position above top line of view
                    var prevElem = arrSection.filter(function (elem) {
                        return elem < $(document.body).scrollTop() - 2
                    })
                    // select last element and animate
                    var y = Math.max.apply(null, prevElem)
                    $('body').animate({
                        scrollTop: y + 1
                    }, 900);

                }
                //refresh arr
                delta.length = 0
                arrSection.length = 0
            }, error => {
                alert('something wrong');
            })
            event.preventDefault();
        })
    }


    //slider in about section
    (function () {

        $('.about_img').each(function (i) {
            $(this).css({
                backgroundImage: `url(image/about_img_${i+1}.jpg)`
            })
        })
        //get colection of img
        var arrAbout = document.querySelectorAll('.about_img');
        var aboutIndex = 0;
        aboutSlide(aboutIndex);
        //change img evry 10 sec
        setInterval(function () {
            aboutIndex += 1;
            aboutSlide(aboutIndex);
        }, 6000)

        function aboutSlide() {
            //if active last img, nex  first
            if (aboutIndex == arrAbout.length) {
                aboutIndex = 0;
            }
            //all img display none
            for (var i = 0; i < arrAbout.length; i++) {
                arrAbout[i].style.display = 'none';
            }
            // one display block
            arrAbout[aboutIndex].style.display = 'block';
        }
    }())


    //slider in Skills section


    var indexSkills = 0;
    var arrSkills = $('.carusel'); //get colection of blok of skills
    var arrCheck = $('.skills_radio') // get colection of pointers
    skillSlide(indexSkills);

    function skillSlide(a) {
        //if active last blok, nex  first
        if (indexSkills == arrSkills.length) {
            indexSkills = 0;
        }
        //if active first img, nex  last
        if (indexSkills < 0) {
            indexSkills = arrSkills.length - 1;
        }

        anim(); //animating of pointers
        $('.skills_container').animate({
            left: `-${indexSkills * 44}vw` //change position of blok to the left
                ,
        })
    }
    //change position of blok when click left arrow
    $('.left').on('click', function () {
        indexSkills -= 1;
        skillSlide(indexSkills);
    });
    //change position of blok when click left arrow
    $('.right').on('click', function () {
        indexSkills += 1;
        skillSlide(indexSkills);
    })
    //change position of blok when click pointer
    $('.skills_radio').each(function (i, el) {
        $(el).on('click', function () {
            indexSkills = i;
            skillSlide(indexSkills);
        })
    })

    function anim() {
        $('.skills_radio').each(function () {
            $(this).removeClass('active');
        })
        $('.skills_radio').eq(indexSkills).addClass('active');
    }



    // diagram of scills
    //scroll

 
    $(document).on('scroll', skrollGrafikOn);

    function skrollGrafikOn() {
        if (window.pageYOffset > $('#skills').position().top - 10 & window.pageYOffset < $('#skills').position().top + 100) {
            showSkill();
            $(document).off('scroll', skrollGrafikOn);
            $(document).on('scroll', skrollGrafikOff);
        }
    }
    function skrollGrafikOff() {
        if(window.pageYOffset > $('#about').position().top - 10 & window.pageYOffset < $('#about').position().top + 100){
            hideSkill();
            $(document).off('scroll', skrollGrafikOff);
            $(document).on('scroll', skrollGrafikOn);
        }
    }
    
    function showSkill() {
        rotateSkill(`JavaScript`, 75)
        rotateSkill(`Node`, 55)
        rotateSkill(`AngularJS`, 73)
        rotateSkill(`MySQL`, 65)
        rotateSkill(`HTML5`, 85)
        rotateSkill(`CSS3`, 85)

        rotateSkill(`JQuery`, 85)
        rotateSkill(`Bootstrap`, 77)
        rotateSkill(`Jade`, 73)
        rotateSkill(`SCSS`, 73)
        rotateSkill(`Gulp`, 53)
        rotateSkill(`Photoshop`, 70)
    }

    function hideSkill() {
        rotateSkill(`JavaScript`, 0)
        rotateSkill(`Node`, 0)
        rotateSkill(`AngularJS`, 0)
        rotateSkill(`MySQL`, 0)
        rotateSkill(`HTML5`, 0)
        rotateSkill(`CSS3`, 0)

        rotateSkill(`JQuery`, 0)
        rotateSkill(`Bootstrap`, 0)
        rotateSkill(`Jade`, 0)
        rotateSkill(`SCSS`, 0)
        rotateSkill(`Gulp`, 0)
        rotateSkill(`Photoshop`, 0)
    }

    function rotateSkill(elem, y) {
        var slideone = $(`.${elem}`).find('.slideone')
        var slidetwo = $(`.${elem}`).find('.slidetwo')

        $(slideone).css({
            transform: `rotate(${0}deg)`,
        })
        $(slidetwo).css({
            transform: `rotate(${0}deg)`,
        })
        var x = y * 3.6;
        var n = 0;

        var times = setInterval(function () {

            if (x < 180) {
                if (n > x) {
                    setInterval(function () {
                        clearInterval(times)
                    }, 0)
                } else {
                    $(slidetwo).css({
                        transform: `rotate(${n}deg)`,
                    })
                }
            } else {
                if (n <= 180) {
                    $(slidetwo).css({
                        transform: `rotate(${n}deg)`,
                    })
                } else if (n > 180 && n <= x) {
                    $(slideone).css({
                        transform: `rotate(${n-180}deg)`,
                    })
                } else if (n > x) {
                    setInterval(function () {
                        clearInterval(times)
                    }, 0)
                }
            }
            n += 15;
        }, 18)
    }

});
