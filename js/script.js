$(window).on("load", function() {
    // Assets are loaded, kill the loader
    $(".loader .inner").fadeOut(500, function() {
        $(".loader").fadeOut(750);
    });

    // FIX: Animation Latency - Changed from 15000 to 750
    $(".items").isotope({
        filter: '*',
        animationOptions: {
            duration: 750, 
            easing: 'linear', 
            queue: false
        }
    });
});

$(document).ready(function() { 
    // FIX: Slider Latency - Changed from 15000 to 8000 (8 seconds per slide)
    $('#slides').superslides({
        animation: 'fade',
        play: 8000,
        pagination: false
    });

    var typed = new Typed(".typed", {
        strings: [
            "Game Developer", "System Programmer", "C++, C#, Java", "HLSL, GLSL", "Software Designer"
        ],
        typeSpeed: 70,
        loop: true,
        startDelay: 1000,
        showCursor: false
    }); 

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: { items: 1 },
            600: { items: 3 },
            1000: { items: 5 }
        }
    });

    // FIX: Scroll Overload - Cache these values outside the scroll function
    var $window = $(window);
    var skillsSection = $(".skillsSection");
    var statsSection = $(".statsSection");
    
    // Only calculate these once to save CPU
    var skillsTopOffset = skillsSection.length ? skillsSection.offset().top : 0;
    var statsTopOffset = statsSection.length ? statsSection.offset().top : 0;
    var winHeight = $window.height();
    var countUpFinished = false;

    $window.on("scroll", function() {
        var pageOffset = window.pageYOffset;

        // Trigger Charts
        if (pageOffset > skillsTopOffset - winHeight + 200) {
            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: '#fff',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }

        // Trigger Stats Counter
        if (!countUpFinished && pageOffset > statsTopOffset - winHeight + 200) {
            $(".counter").each(function() {
                var element = $(this);
                var endVal = parseInt(element.text());
                element.countup(endVal);
            });
            countUpFinished = true;
        }
    });

    // Portfolio Filter Animation Fix
    $("#filters a").click(function() {
        $("#filters .current").removeClass("current");
        $(this).addClass("current");
        var selector = $(this).attr("data-filter");

        $(".items").isotope({
            filter: selector,
            animationOptions: {
                duration: 750, // Fixed from 1500
                easing: 'linear',
                queue: false
            }
        });
        return false;
    });

    // Smooth Scroll
    $("#navigation li a").click(function(e) {
        e.preventDefault();
        var targetElement = $(this).attr("href");
        var targetPosition = $(targetElement).offset().top;
        $("html, body").animate({ scrollTop: targetPosition - 50 }, "slow");
    });

    // Sticky Nav Cache
    const nav = $("#navigation");
    const navTop = nav.offset().top;

    $window.on("scroll", function() {
        if ($window.scrollTop() >= navTop) {
            $("body").addClass("fixedNav");
        } else {
            $("body").removeClass("fixedNav");
        }
    });

    $("[data-fancybox]").fancybox();
});

/* MODULAR ARCADE FUNCTIONS */
// This allows you to plug in any GitHub repo URL via the data-game-url attribute
function loadArcadeGame(element) {
    var url = $(element).attr("data-game-url");
    var stage = $("#game-stage");
    
    $("#game-iframe").attr("src", url);
    stage.fadeIn(500);

    // Scroll directly to the game window
    $('html, body').animate({
        scrollTop: stage.offset().top - 100
    }, 800);
    
    $("#game-iframe").focus();
}

function closeArcadeGame() {
    $("#game-stage").fadeOut(300);
    // Clear the SRC to kill the game process and audio in the background
    $("#game-iframe").attr("src", ""); 
}