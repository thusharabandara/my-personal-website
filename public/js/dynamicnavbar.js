function dynamicNav() {
    $(window).scroll(function () {
        $('nav').toggleClass('scrolled', $(this).scrollTop() > 620);
    });
};

function dynamicNavInterest() {
    $(window).scroll(function () {
        $('nav').toggleClass('scrolled', $(this).scrollTop() > 10);
    });
};