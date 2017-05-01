function navigation () {
    var pad = 180;
     $(".nav_a").each(function(num, el){
         $(el).css({
             paddingTop: pad+'px'
         });
         pad-=45
     });
}
//navigation();