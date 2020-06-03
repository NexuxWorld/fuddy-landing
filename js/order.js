var order = [];
function agregarProducto(elem){
    const index = order.findIndex(element => element.producto === elem);
    
    if ( index === -1 ) {
        const cantidad = $("#"+elem+"> div > input").val();
        const name = $("#"+elem+"> h3").text();
        let product = {
            producto: elem,
            cantidad : cantidad
        }
        order.push(product)
        $("#container-orders").append(`<span id='${elem}-order'>${name}<img onclick="quitarProducto('${elem}')" src="./src/img/close.svg"></span>`);

        swal ( {
            title : "Producto Agregado" , 
            text : "¡¡Excelente!! continuemos." , 
            icon : "success" , 
            Button : "Aceptar" , 
        } ) ;
    }else{
        const cantidad = $("#"+elem+"> div > input").val();
        const index2 = order.findIndex(element => element.cantidad === cantidad);
        if ( index2 === -1 ) {
            order[index].cantidad = cantidad;
            swal ( {
                title : "Cantidad Modificada" , 
                text : "¡¡Excelente!! continuemos." , 
                icon : "success" , 
                Button : "Aceptar" , 
            } ) ;
        }else{
            swal ( {
                title : "Este producto ya fue agregado" , 
                text : "¡¡Excelente!! continuemos." , 
                icon : "warning" , 
                Button : "Aceptar" , 
            } ) ;
        }
    }
    console.log(order)
}

function quitarProducto(elem){
    const index = order.findIndex(element => element.producto === elem);

    if ( index >= 0 ) {
        order.splice(index, 1);
        $(`#${elem}-order`).remove();
    }
    console.log(order)
}

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
        var next = true;

        $('button#send-information').click(function() {
            console.log(order)
            if($('input[name="name"]').val() === '') {
                $('input[name="name"]').addClass("alert");
            }else{
                $('span.checkmark').removeClass("alert");
                if($('input[name="phone"]').val() === '') {
                    $('input[name="phone"]').addClass("alert");
                }else{
                    $('input[name="name"]').removeClass("alert");
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
                            $(formMessages).text('Debe agregar producto(s) al pedido');
                        }
                    }
                }
            }
        });
    
        $(form).submit(function(event) {
            event.preventDefault();
            if(next){
                var formData = $(form).serializeArray();
                const name = formData[0].value;
                const phone = formData[1].value;
                const address = formData[2].value;
                const pedido = order;
                console.log(name+", "+phone+", "+address+", "+pedido);
                /*
                $.ajax({
                    type: 'POST',
                    url: $(form).attr('action'),
                    data: {name, phone, address, pedido}
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
                });*/
            }
        });

    });
});