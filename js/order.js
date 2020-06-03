function setValue(elem, dir){
    let val = parseInt($("#"+elem+"> div > input").val());
    if(dir === "up"){
        val= val+1;
    }
    if(dir === "down" && val > 0){
        val= val-1;
    }
    $("#"+elem+"> div > input").val(val);
}

function showModal(value){
    if(value === true){
        $('#super').removeClass('hidden');
    }else{
        $('#super').addClass('hidden');
    }
}

$(document).ready(function(){
    $(function() {
        var form = $('#form-action');
        var formMessages = $('#form-messages');
        var next = false;
        var order = [];

        $('button#send-information').click(function() {
            $(".card").each(function(){
                const id = $(this).attr('id');
                const cantidad = $('div > input', this).val();
                if($('div > input', this).val() > 0){
                    order.push(`${id}: ${cantidad}`)
                }
            });
            if($('input[name="name"]').val() === '') {
                $('input[name="name"]').addClass("alert");
            }else{
                $('input[name="phone"]').removeClass("alert");
                if($('input[name="phone"]').val() === '') {
                    $('input[name="phone"]').addClass("alert");
                }else{
                    $('input[name="address"]').removeClass("alert");
                    if($('input[name="address"]').val() === '') {
                        $('input[name="address"]').addClass("alert");
                    }else{
                        $('input[name="phone"]').removeClass("alert");
                        if(order.length >= 0) {
                            $(formMessages).removeClass('error');
                            $(formMessages).text('');
                            next = true;
                        }else{
                            $(formMessages).addClass('error');
                            $(formMessages).text('Debe agregar (un) producto(s) al pedido');
                        }
                    }
                }
            }
        });
    
        $(form).submit(function(event) {
            event.preventDefault();
            if(next){
                var formData = $(form).serializeArray();
                const pedido = order;
                pedido.unshift(
                    `name: ${formData[0].value}`, 
                    `phone: ${formData[1].value}`, 
                    `address: ${formData[2].value}`
                    )
                console.log(pedido)
                
                $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    data: {"JSON": pedido}
                })
                .done(function(response) {
                    $(formMessages).removeClass('error');
                    $(formMessages).addClass('success');
                    $(formMessages).text(response);
                    $('input[name="name"]').val('');
                    $('input[name="phone"]').val('');
                    showModal(true);
                })
                .fail(function(data) {
                    $(formMessages).removeClass('success');
                    $(formMessages).addClass('error');
                    
                    if (data.responseText !== '') {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text('¡Vaya! Ha ocurrido un error, tu pedido no se ha realizado');
                    }
                });
            }
        });

    });
});