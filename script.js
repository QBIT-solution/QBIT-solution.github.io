(function($) {

    'use strict';

    // ===== WEDDING CARD OVERLAY =====
    var overlay = $('#wedding-card-overlay');

    if (sessionStorage.getItem('weddingCardClosed')) {
        overlay.addClass('hidden');
    }

    overlay.on('click', function(e) {
        overlay.addClass('hidden');
        sessionStorage.setItem('weddingCardClosed', 'true');
    });

    // ===== STELLAR PARALLAX =====
    if ($.fn.stellar) {
        $(window).stellar({
            horizontalScrolling: false,
            verticalOffset: 0,
            responsive: true
        });
    }

    // ===== FLIPCLOCK COUNTDOWN =====
    var weddingDate = moment.tz('2026-08-27 00:00:00', 'Asia/Colombo');

    var clock = $('#clock').FlipClock({
        clockFace: 'DailyCounter',
        autoStart: false
    });

    function updateClock() {
        var now = moment.tz('Asia/Colombo');
        var diff = weddingDate.diff(now);

        if (diff <= 0) {
            clock.setTime(0);
            clock.stop();
            return;
        }

        var duration = moment.duration(diff);
        var days = Math.floor(duration.asDays());
        var hours = duration.hours();
        var minutes = duration.minutes();
        var seconds = duration.seconds();

        var totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;
        clock.setTime(totalSeconds);
    }

    updateClock();
    clock.start();
    setInterval(updateClock, 1000);

    // ===== MAGNIFIC POPUP (Gallery) =====
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        closeOnContentClick: true,
        closeBtnInside: false,
        mainClass: 'mfp-fade',
        removalDelay: 300
    });

    // ===== VIDEO POPUP =====
    $('.popup-vimeo').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 300,
        preloader: false,
        fixedContentPos: false
    });

    // ===== BACK TO TOP =====
    var offset = 300;
    var duration = 500;

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > offset) {
            $('.gototop').addClass('active');
        } else {
            $('.gototop').removeClass('active');
        }
    });

    $('.js-gotop').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, duration);
        return false;
    });

    // ===== SMOOTH SCROLL FOR NAV =====
    $('.fh5co-nav ul li a[href^="#"]').on('click', function(e) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 60
            }, 600);
        }
    });

    // ===== WAYPOINTS ANIMATIONS =====
    $('.animate-box').waypoint({
        handler: function(direction) {
            if (direction === 'down') {
                $(this.element).addClass('fadeIn animated');
            }
        },
        offset: '75%'
    });

    // ===== NAV ACTIVE STATE =====
    var sections = ['#fh5co-header', '#fh5co-event', '#fh5co-agenda', '#fh5co-gallery', '#fh5co-services'];

    $(window).on('scroll', function() {
        var scrollPos = $(window).scrollTop() + 100;
        $('.fh5co-nav ul li').removeClass('active');
        sections.forEach(function(id) {
            var section = $(id);
            if (section.length && section.offset().top <= scrollPos && section.offset().top +
                section.outerHeight() > scrollPos) {
                $('.fh5co-nav ul li a[href="' + id + '"]').parent().addClass('active');
            }
        });
    });

    // ===== FLIPCLOCK RESPONSIVE FIX =====
    function fixFlipClock() {
        if ($(window).width() < 480) {
            $('.flip-clock-wrapper ul').css({
                'width': '28px',
                'margin': '0 1px'
            });
            $('.flip-clock-wrapper ul li').css({
                'width': '28px',
                'height': '38px',
                'line-height': '38px'
            });
            $('.flip-clock-wrapper ul li a div div.inn').css({
                'font-size': '24px',
                'line-height': '38px'
            });
            $('.flip-clock-divider').css({
                'height': '38px',
                'width': '6px'
            });
        }
    }
    fixFlipClock();
    $(window).on('resize', fixFlipClock);

})(jQuery);