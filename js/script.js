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

	// FLAGS: Prevent re-triggering and flickering
	var countUpFinished = false;
	var chartsFinished = false;

	$window.on("scroll", function () {
		var pageOffset = window.pageYOffset;

		// Skill Charts Logic with Flag
		if (!chartsFinished && pageOffset > skillsTopOffset - winHeight + 200) {
			$('.chart').easyPieChart({
				easing: 'easeInOut', barColor: '#fff', trackColor: false, scaleColor: false, lineWidth: 4, size: 152,
				onStep: function (from, to, percent) { $(this.el).find('.percent').text(Math.round(percent)); }
			});
			chartsFinished = true;
		}

		// Stats Counter Logic
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

/* MODULAR ARCADE FUNCTIONS */
function loadArcadeGame(element) {
    var url = $(element).attr("data-game-url");
    var $stage = $("#game-stage");
    
    $("#game-iframe").attr("src", url);
    
    // Use stop(true, true) to prevent animation queue buildup
    $stage.stop(true, true).fadeIn(300).css("display", "flex");

    // Scroll to the arcade section with a very fast, stable transition
    $('html, body').stop().animate({
        scrollTop: $("#arcade").offset().top - 20
    }, 400);

    $("#game-iframe").focus();
}

function closeArcadeGame() {
    $("#game-stage").stop(true, true).fadeOut(200);
    $("#game-iframe").attr("src", "");
}
function popoutGame() {
	var url = $("#game-iframe").attr("src");
	if (url) {
		window.open(url, '_blank');
	}
}