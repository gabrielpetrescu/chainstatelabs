function openNav() {


    if($('#myNav').hasClass('navopen')){
        $('#myNav').removeClass('navopen');
        document.getElementById("myNav").style.height = "0%";
    } else{
        document.getElementById("myNav").style.height = "100%";
        $('#myNav').addClass('navopen');
    }
}

function closeNav() {

}