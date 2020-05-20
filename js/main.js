$(document).ready(function(){
    $('a').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        && location.hostname == this.hostname) {
            var $target = $(this.hash);
            $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
            if ($target.length) {
                var targetOffset = $target.offset().top;
                $('html,body').animate({scrollTop: targetOffset}, 600);
                return false;
            }
        }
    });

    $('button[type="submit"]').click(function() {
        if( !$('input[name=check]').prop('checked') ) {
            $('span.checkmark').addClass("alert")
        }
    });

    $('.input[name="name"]').on('input', function () { 
        this.value = this.value.replace(/[^0-9]/g,'');
    });
});
