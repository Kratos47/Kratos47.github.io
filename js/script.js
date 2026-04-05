$(window).on("load", function () {
	$(".loader .inner").fadeOut(500, function () { $(".loader").fadeOut(750); });
	$(".items").isotope({
		filter: '*',
		animationOptions: { duration: 750, easing: 'linear', queue: false }
	});
});

$(document).ready(function () {
	$('#slides').superslides({ animation: 'fade', play: 8000, pagination: false });

	var typed = new Typed(".typed", {
		strings: ["Game Developer", "System Programmer", "C++, C#, Java", "HLSL, GLSL", "Software Designer"],
		typeSpeed: 70, loop: true, startDelay: 1000, showCursor: false
	});

	$('.owl-carousel').owlCarousel({
		loop: true, margin: 10, nav: true,
		responsive: { 0: { items: 1 }, 600: { items: 3 }, 1000: { items: 5 } }
	});

	var $window = $(window);
	var skillsSection = $(".skillsSection");
	var statsSection = $(".statsSection");
	var skillsTopOffset = skillsSection.length ? skillsSection.offset().top : 0;
	var statsTopOffset = statsSection.length ? statsSection.offset().top : 0;
	var winHeight = $window.height();
	var countUpFinished = false;

	$window.on("scroll", function () {
		var pageOffset = window.pageYOffset;
		if (pageOffset > skillsTopOffset - winHeight + 200) {
			$('.chart').easyPieChart({
				easing: 'easeInOut', barColor: '#fff', trackColor: false, scaleColor: false, lineWidth: 4, size: 152,
				onStep: function (from, to, percent) { $(this.el).find('.percent').text(Math.round(percent)); }
			});
		}
		if (!countUpFinished && pageOffset > statsTopOffset - winHeight + 200) {
			$(".counter").each(function () { $(this).countup(parseInt($(this).text())); });
			countUpFinished = true;
		}
	});

	$("#filters a").click(function () {
		$("#filters .current").removeClass("current");
		$(this).addClass("current");
		$(".items").isotope({ filter: $(this).attr("data-filter"), animationOptions: { duration: 750, easing: 'linear', queue: false } });
		return false;
	});

	$("#navigation li a").click(function (e) {
		e.preventDefault();
		var targetElement = $(this).attr("href");
		var targetPosition = $(targetElement).offset().top;
		$("html, body").animate({ scrollTop: targetPosition - 50 }, "slow");
	});

	const nav = $("#navigation");
	const navTop = nav.offset().top;
	$window.on("scroll", function () {
		if ($window.scrollTop() >= navTop) { $("body").addClass("fixedNav"); }
		else { $("body").removeClass("fixedNav"); }
	});

	$("[data-fancybox]").fancybox();
});

function loadArcadeGame(element) {
    var url = $(element).attr("data-game-url");
    $("#game-iframe").attr("src", url);
    $("#game-stage").css("display", "flex").hide().fadeIn(500);
    $("#arcade").addClass("game-active");

    // REMOVED: $("body").addClass("stop-scrolling");

    // IMPROVED: Scroll so the TOP of the game is near the top of the screen
    $('html, body').animate({
        scrollTop: $("#game-stage").offset().top - 80
    }, 800);
    
    $("#game-iframe").focus();
}

function closeArcadeGame() {
    $("#game-stage").fadeOut(300, function() {
        $("#arcade").removeClass("game-active");
        // REMOVED: $("body").removeClass("stop-scrolling");
    });
    $("#game-iframe").attr("src", "");
}
function popoutGame() {
	var url = $("#game-iframe").attr("src");
	if (url) {
		window.open(url, '_blank');
	}
}