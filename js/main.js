$(document).ready(function(){
    $('a.to-action, a#politics, a#skip').click(function() {
        if($('#container-politics').attr("class") !== "hidden"){
            $('#container-page-sections').removeClass("hidden");
            $('#container-politics').addClass("hidden");
        }

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

    $('a#politics').click(function() {
        $('#container-page-sections').addClass("hidden");
        $('#container-politics').removeClass("hidden");
        $('#skip').removeClass("hidden");
        $('input[name="check"]').attr("checked", true);
    });

    $(function() {
        $(window).scroll(function(){
            var windowHeight = $(window).scrollTop();
            var contenido2 = $("#fourth-section").offset();
            contenido2 = contenido2.top;
            if(windowHeight < contenido2 && $('#container-politics').attr("class") !== "hidden"){
                $('#skip').fadeIn(200);
            }else{
                $('#skip').fadeOut(200);
            }
        });

        var form = $('#form-action');
        var formMessages = $('#form-messages');
        var next = false;

        $('button#send-information').click(function() {
            if( !$('input[name="check"]').prop('checked') ) {
                $('span.checkmark').addClass("alert");
            }else{
                $('span.checkmark').removeClass("alert");
                if($('input[name="name"]').val().length === 0) {
                    $('input[name="name"]').addClass("alert");
                }else{
                    $('input[name="name"]').removeClass("alert");
                    if($('input[name="phone"]').val().length === 0) {
                        $('input[name="phone"]').addClass("alert");
                    }else{
                        $('input[name="phone"]').removeClass("alert");
                        next = true;
                    }
                }
            }
        });
    
        $(form).submit(function(event) {
            event.preventDefault();
            if($('#container-politics').attr("class") !== "hidden"){
                $('#container-page-sections').removeClass("hidden");
                $('#container-politics').addClass("hidden");
            }
            if(next){
                var formData = $(form).serialize();
                $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    data: formData
                })
                .done(function(response) {
                    $(formMessages).removeClass('error');
                    $(formMessages).addClass('success');
                    $(formMessages).text(response);
                    $('input[name="name"]').val('');
                    $('input[name="phone"]').val('');
                })
                .fail(function(data) {
                    $(formMessages).removeClass('success');
                    $(formMessages).addClass('error');
                    
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('¡Vaya! Ha ocurrido un error, tu mensaje no ha sido enviado');
                    }
                });
            }
        });

    });
});