<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data = $_POST["JSON"];

        $recipient = "pedidos@fuddy.co";
        $subject = "Han hecho un pedido";

        $email_content = $data;

        if (mail($recipient, $subject, $email_content)) {
            http_response_code(200);
            echo "Bienvenido Fuddy hero, pronto nos pondremos en contacto contigo";
        } else {
            http_response_code(500);
            echo "¡Vaya! Algo salió mal y no pudimos enviar su mensaje.";
        }

    } else {
        http_response_code(403);
        echo "Hubo un problema con su envío, vuelva a intentarlo.";
    }

?>