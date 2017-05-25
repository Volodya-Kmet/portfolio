$(function () {
    //Chrome, Android, Opera
    var isChromium = !!window.chrome;
    //Webkit (Chrome, Safari) Opera
    var isWebkit = 'WebkitAppearance' in document.documentElement.style;
    //Internet Explorer/Edge 11
    var isIE = '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;

    // attach line to nav bar
    var navHeigth = $('nav').height();
    $('.about_line').css({
        top: (navHeigth) + 'px'
    });

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
    })

    //paralax
    $(document).on('scroll', function (ev) {
        parallax();
    });

    function parallax() {
        var scroll = window.pageYOffset;

        $('.container_button, .baner').css({
            top: (scroll * 0.3) + 'px',
        });
    }

    //scroll only for Opera & Chrom
    
    var arrSection = []//create arr of element section
    $('section').each(function (i, elem) {
        arrSection.push($(elem).position().top)
    })
    var delta = [];

    if (isChromium) {
        $(document).on('wheel', function (event) {
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
            }, error => {
                alert('something wrong');
            })
            event.preventDefault();
        })
    }
    
    //slider in about section
    $('.about_img').each(function (i) {
        $(this).css({
            backgroundImage : `url(../image/about_img_${i+1}.jpg)`
        })
    })
    
    var arr = document.querySelectorAll('.about_img');
    var slideIndex = 0;
    aboutSlide(slideIndex);
    setInterval(function(){
        slideIndex += 1;
        aboutSlide(slideIndex);
    }, 10000)
    
    function aboutSlide() {
	if (slideIndex == arr.length) {
		slideIndex = 0;
	}
	if (slideIndex < 0) {
		slideIndex = arr.length - 1;
	}
	for (var i = 0; i < arr.length; i++) {
		arr[i].style.display = 'none';
	}
	arr[slideIndex].style.display = 'block';
}
    
    //slider in Skills section
    
    var index = 0;
	var arr = $('.carusel');
	var arrCheck = $('.skills_radio')
	skillSlide(index);

	function skillSlide(a) {
		if (index == arr.length) {
			index = 0;
		}
		if (index < 0) {
			index = arr.length - 1;
		}
        var width = $('.skils_wrapper').width();
        
		anim ();
		$('.skills_container').animate({
			left: '0vw'
		, })
	}
	$('.left').on('click', function () {
		index-=1;
		skillSlide(index);
	})
	$('.right').on('click', function () {
		index+=1;
		skillSlide(index);
	})
	$('.skills_radio').each(function(i, el){
		$(el).on('click', function(){
			index = i;
			skillSlide();
		})
	})
	function anim (){
		$('.skills_radio').each(function(){
			$(this).removeClass('active');
		})
		$('.skills_radio').eq(index).addClass('active');
	}
});
