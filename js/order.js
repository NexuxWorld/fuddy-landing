var next = false;
var order = [];

function setValue(elem, dir){
    let val = parseInt($("#"+elem+"> div > input").val());
    next = false;

    if(dir === "up"){
        val= val+1;
    }
    if(dir === "down" && val > 0){
        val= val-1;
    }
    $("#"+elem+"> div > input").val(val);

    if($('#send-information').attr('class') !== 'hidden'){
        $('#send-information').addClass('hidden');
        $('#confirm-order').removeClass('hidden');
    }
}

function showModal(value){
    if(value === true){
        $('#super').removeClass('hidden');
    }else{
        $('#super').addClass('hidden');
    }
}

function showConfirm(value){
    if(value === true){
        $('#super-confirm').removeClass('hidden');
    }else{
        $('#super-confirm').addClass('hidden');
    }
}

function showButtonSendOrder(value){
    if(value === true){
        $('#send-information').removeClass('hidden');
        $('#confirm-order').addClass('hidden');
        next = true;
    }else{
        $('#send-information').addClass('hidden');
        $('#confirm-order').removeClass('hidden');
        next = false;
    }
}

$(document).ready(function(){
    $(function() {
        var form = $('#form-action');
        var formMessages = $('#form-messages');

        $('button#confirm-order').click(function() {
            $("#content-confirm").empty();
            $(".card").each(function(){
                const id = $(this).attr('id');
                const cantidad = $('div > input', this).val();
                if($('div > input', this).val() > 0){
                    order.push(`${id}: ${cantidad}`)
                    var producto = document.createElement("span");
                    var contenido = document.createTextNode(`${id}= ${cantidad}`);
                    producto.appendChild(contenido);
                    document.getElementById("content-confirm").appendChild(producto);
                }
            });
            if($('input[name="name"]').val() === '') {
                $('input[name="name"]').addClass("alert");
            }else{
                $('input[name="name"]').removeClass("alert");
                if($('input[name="client"]').val() === '') {
                    $('input[name="client"]').addClass("alert");
                }else{
                    $('input[name="client"]').removeClass("alert");
                    if($('input[name="phone"]').val() === '') {
                        $('input[name="phone"]').addClass("alert");
                    }else{
                        $('input[name="phone"]').removeClass("alert");
                        if($('input[name="address"]').val() === '') {
                            $('input[name="address"]').addClass("alert");
                        }else{
                            $('input[name="address"]').removeClass("alert");
                            if(order.length > 0) {
                                $(formMessages).removeClass('error');
                                $(formMessages).text('');
                                showConfirm(true);
                            }else{
                                $(formMessages).addClass('error');
                                $(formMessages).text('Debe agregar (un) producto(s) al pedido');
                            }
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
                    `client: ${formData[1].value}`,
                    `phone: ${formData[2].value}`,
                    `address: ${formData[3].value}`
                    )
                
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
                    $('input[name="client"]').val('');
                    $('input[name="phone"]').val('');
                    $('input[name="address"]').val('');
                    $(".card").each(function(){
                        $('div > input', this).val("0");
                    });
                    showModal(true);
                    next = false;
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