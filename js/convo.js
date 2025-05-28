$(document).ready(function(){
    // Handle checkbox for privacy policy acceptance
    $('#checkDefault').on('change', function() {
        if($(this).is(':checked')) {
            // Enable the link when checkbox is checked
            $('.bt-politica').removeClass('btn-disabled');
        } else {
            // Disable the link when checkbox is unchecked
            $('.bt-politica').addClass('btn-disabled');
        }
    });

    // Prevent clicking on the disabled link
    $(document).on('click', '.bt-politica.btn-disabled', function(e) {
        e.preventDefault();
    });

    ScrollReveal().reveal('.titulo-convo',
        {
            beforeReveal: function (el) {
                el.style.animation = 'bounceInLeft 1s ease-out forwards';
            }
        });

    setTimeout(function(){
        ScrollReveal().reveal('.sub-convo',
            {
                beforeReveal: function (el) {
                    el.style.animation = 'bounceInLeft 1s ease-out forwards';
                }
            });
    },(500))

    ScrollReveal().reveal('.estatua-convo', {
        beforeReveal: function (el) {
            el.classList.add('zoom-in');
        },
        reset: false // Set to true if you want the animation to trigger again on scroll up
    });

    ScrollReveal().reveal('.text-convo',
        { delay: 1000,
            reset: false,
            scale:1,   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    ScrollReveal().reveal('.momento-title',
        { delay: 500,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'left',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );
    ScrollReveal().reveal('.momento-text',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'right',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    ScrollReveal().reveal('.requisitos-title',
        { delay: 500,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'left',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );
    ScrollReveal().reveal('.requisitos-text',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'right',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    if (window.innerWidth < 760) {
        $('.rotate-slick').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            centerMode: true,
            centerPadding: '80px',
        });
    }

    document.querySelectorAll('.flip-card').forEach(card => {
        const eventType = 'ontouchstart' in window ? 'touchstart' : 'click';

        card.addEventListener(eventType, function(e) {
            e.preventDefault(); // Prevent default touch behavior
            this.classList.toggle('flipped');

            // Remove focus to ensure next interaction works
            this.blur();
        });

        card.addEventListener('blur', function() {
            // Handle focus out - maybe flip back or do nothing
            // this.classList.remove('flipped'); // if you want to flip back
        });
    });

})
