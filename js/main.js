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


    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lucianmincu")
        .then((res) => res.json())
        .then((data) => {
            const res = data.items;
            const posts = res.filter(item => item.categories.length > 0).sort((a, b) => {
                return new Date(b.pubDate) - new Date(a.pubDate);
            });
            console.log(posts.shift());
        });



});

