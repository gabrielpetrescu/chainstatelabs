<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if(isset($_POST['chslname'])){

    $mail = new PHPMailer(true);

    try {
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.example.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'user@example.com';                     //SMTP username
        $mail->Password   = 'secret';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('from@example.com', 'Mailer');
        $mail->addAddress('joe@example.net', 'Joe User');     //Add a recipient


        $name = (isset($_POST['chslname'])) ? $_POST['chslname'] : 'no name';
        $surname = (isset($_POST['chslsurname'])) ? $_POST['chslsurname'] : 'no surname';
        $email = (isset($_POST['chslemail'])) ? $_POST['chslemail'] : 'no email';
        $message = (isset($_POST['chslmessage'])) ? $_POST['chslmessage'] : 'no message';

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Message from contact form';
        $mail->Body    = "
            From: $name $surname<br>
            Email: $email <br><br>
            Message: $message <br><br>
            --<br>
            This email was sent from contact form.
        ";

        $mail->send();
        echo 'Thanks! Message has been sent.';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>