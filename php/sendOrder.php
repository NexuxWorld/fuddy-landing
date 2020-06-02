<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $name = strip_tags(trim($_POST["name"]));
				$name = str_replace(array("\r","\n"),array(" "," "),$name);
        $phone = filter_var(trim($_POST["phone"]), FILTER_SANITIZE_EMAIL);

        if ( empty($name) OR empty($phone)) {
            http_response_code(400);
            echo "No ha diligenciado los datos.";
            exit;
        }

        $recipient = "jalvarezayola@gmail.com";
        $subject = "$name ha hecho un pedido";

        $email_content = "Nombre: $name\n";
        $email_content .= "Teléfono: $phone\n\n";

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