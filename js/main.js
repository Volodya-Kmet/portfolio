$(function(){
    
    // attach line to nav bar
    var navHeigth = $('nav').height();
    console.log(navHeigth);
    $('.about_line').css({
       top : (navHeigth +1)+'px'
    });
    
    //rotate photo
    setTimeout(function(){
        
        $(document).ready( function () {
        var n = 0;
        $('.baner>img').animate({
            transform:'rotate(90deg)'
        }, {
            duration : 2000,
            queue : false,
            step : function (){
                n++;
                console.log(n);
                $('.baner>img').css({
                    transform : `rotate3d(0,1,0,${90-n*1.73}deg)`
                });
            },
            complete: function () {
				$('.baner>img').css({
					transform : `rotate3d(0,1,0,0)`
                })
            }
        })
    })
        
    },1000)
    
});