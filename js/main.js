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

    $(function() {
        var form = $('#form-action');
        var formMessages = $('#form-messages');
    
        $(form).submit(function(event) {
            event.preventDefault();
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
                    $(formMessages).text('Oops! An error occured and your message could not be sent.');
                }
            });
        });

    });
    $('button#send-information').click(function() {
        if( !$('input[name="check"]').prop('checked') ) {
            $('span.checkmark').addClass("alert")
        }else{
            $('span.checkmark').removeClass("alert")
        }
    });
});
