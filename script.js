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
    //================invitation============================
    

//================================
    
    // ===== FLIPCLOCK COUNTDOWN =====
    var weddingDate = moment.tz('2026-08-27 09:00:00', 'Asia/Colombo');

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

     // ============================================================
    // WEDDING CARD OVERLAY
    // ============================================================
    var overlay = $('#wedding-card-overlay');
    if (sessionStorage.getItem('weddingCardClosed')) {
        overlay.addClass('hidden');
    }
    overlay.on('click', function(e) {
        overlay.addClass('hidden');
        sessionStorage.setItem('weddingCardClosed', 'true');
    });

    $('.image-popup').magnificPopup({
    type: 'image',
    gallery: { enabled: true },   // ← groups all image-popup links
    closeOnContentClick: true,
    closeBtnInside: false,
    mainClass: 'mfp-fade',
    removalDelay: 300
});

    // ============================================================
    // BACKGROUND MUSIC WITH AUTO-PLAY
    // ============================================================
    (function initMusic() {
        var audio = document.getElementById('bg-music');
        if (!audio) return;

        var toggleBtn = document.getElementById('music-toggle');
        var statusText = toggleBtn.querySelector('.music-status');

        // Set initial volume (50%)
        audio.volume = 1.0;

        // ----- Attempt auto-play on page load -----
        var autoPlayAttempted = false;

        function tryAutoPlay() {
            if (autoPlayAttempted) return;
            autoPlayAttempted = true;
            audio.play().then(function() {
                // Auto-play succeeded
                toggleBtn.classList.add('playing');
                statusText.textContent = 'On';
            }).catch(function() {
                // Auto-play blocked – we'll wait for user interaction
                console.log('Auto-play blocked. Will start on first user click.');
                // The first user click anywhere will trigger the start
            });
        }

        // Try auto-play immediately (but it may fail)
        tryAutoPlay();

        // ----- If auto-play failed, start on first user click -----
        var userInteracted = false;
        function startOnUserInteraction() {
            if (userInteracted) return;
            userInteracted = true;
            // If audio is still paused, try playing
            if (audio.paused) {
                audio.play().then(function() {
                    toggleBtn.classList.add('playing');
                    statusText.textContent = 'On';
                }).catch(function() {});
            }
        }

        // Listen for the first click anywhere on the page
        document.addEventListener('click', function firstClick() {
            startOnUserInteraction();
            // Remove listener after first click
            document.removeEventListener('click', firstClick);
        }, { once: true });

        // Also listen for the overlay close (which is a click)
        overlay.on('click', function() {
            startOnUserInteraction();
        });

        // ----- Toggle button functionality -----
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the document click listener from firing again
            if (audio.paused) {
                audio.play().catch(function(error) {
                    console.log('Playback failed:', error);
                    alert('Please click again to play music (browser requires user interaction).');
                });
                toggleBtn.classList.add('playing');
                statusText.textContent = 'On';
            } else {
                audio.pause();
                toggleBtn.classList.remove('playing');
                statusText.textContent = 'Off';
            }
        });

        // If music ends (should loop, but just in case)
        audio.addEventListener('ended', function() {
            audio.currentTime = 0;
            audio.play().catch(function() {});
        });

    })();

// ===== AUTO-PLAY VIDEO WHEN IN VIEW =====
document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('highlight-video');
    if (!video) return;

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(video);
});
    // ============================================================
    // STELLAR PARALLAX, FLIPCLOCK, POPUP, ETC. (keep existing code)
    // ============================================================
    // ... (your existing JS code here) ...

    // For brevity, I'm not re-copying all the existing JS below,
    // but you should keep all your other functions (stellar, flipclock, etc.)
    // and just append the music code above.
    // ===== INVITATION CARD TOGGLE (Door open/close) =====
// ===== INVITATION CARD TOGGLE (Door open/close) =====


// Optional: close the card if user clicks outside (optional)
// Not implemented here to keep it simple.

})(jQuery);