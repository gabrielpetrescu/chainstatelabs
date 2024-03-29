function openCloseNav() {
    if(jQuery('#chainNav').hasClass('navopen')){
        jQuery('#chainNav').removeClass('navopen');
        document.getElementById("chainNav").style.height = "0%";
    } else{
        document.getElementById("chainNav").style.height = "100%";
        jQuery('#chainNav').addClass('navopen');
    }
}

$(function() {
    $("#chslform").validate({
        rules: {
            chslname: "required",
            chslsurname: "required",
            chslemail: {
                required: true,
                email: true
            }
        },
        messages: {
            chslname: "Please enter your name",
            chslsurname: "Please enter your surname",
            chslemail: "Please enter a valid email address"
        }
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

if (window.matchMedia('(min-width: 769px)').matches)
{
    $('.parallax-window.gradients').parallax({imageSrc: 'img/gradients.jpg'});
    $('.parallax-window.balls').parallax({imageSrc: 'img/balls.png'});
}

if (window.matchMedia('(max-width: 768px)').matches)
{
    $('.parallax-window.gradients').parallax({imageSrc: 'img/gradients-tablet.jpg'});
    $('.parallax-window.balls').parallax({imageSrc: 'img/balls.png'});

}
if (window.matchMedia('(max-width: 576px)').matches)
{
    $('.parallax-window.gradients').parallax({imageSrc: 'img/gradients-mobile.jpg'});
    $('.parallax-window.balls').parallax({imageSrc: 'img/balls.png'});

}
    
    
jQuery(document).ready(function ($){

    $("#chainNav .nav-link").click(function (){
        if(jQuery('#chainNav').hasClass('navopen')){
            jQuery('#chainNav').removeClass('navopen');
            document.getElementById("chainNav").style.height = "0%";
        }
        if($(".menu-toggle").hasClass('opened')){
            $(".menu-toggle").removeClass('opened');
        }
    });

    $("#chslform").on('submit', function(e) {

        if($("#chslform").valid()) {

            e.preventDefault();

            var form = $(this);
            var url = "sendMail.php";

            $.ajax({
                type: "POST",
                url: url,
                data: form.serialize(), // serializes the form's elements.
                success: function (data) {
                    $("#chslform").trigger("reset");
                    $(".form-msg").html(data);
                }
            });
        }
    });



    if($("#blog-post-container").length > 0){

        var posts_url = "blogPosts.php";

        $.ajax({
            type: "POST",
            url: posts_url,
            data: {'get-posts':1},
            success: function (data) {
                $("#blog-post-container").prepend(data);
            }
        });
    }
});







