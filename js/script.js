
$(document).ready(function(){

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

    ScrollReveal().reveal('.title-head',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'right',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    ScrollReveal().reveal('.title-desc',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'bottom',  // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    ScrollReveal().reveal('.fases-one',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'right',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    ScrollReveal().reveal('.video', {
        delay: 300,
        reset: false,
        scale: 1,
        duration: 800,
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
    });

    if (window.innerWidth > 760) {
        ScrollReveal().reveal('.inspira-one',
            { delay: 500,
                reset: false,
                distance: '250px',   // Distancia desde la que el elemento aparecerá/desaparecerá
                origin: 'left',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
            }
        );
        ScrollReveal().reveal('.inspira-two',
            { delay: 500,
                reset: false,
                distance: '300px',   // Distancia desde la que el elemento aparecerá/desaparecerá
                origin: 'bottom',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
            }
        );
        ScrollReveal().reveal('.inspira-three',
            { delay: 500,
                reset: false,
                distance: '300px',   // Distancia desde la que el elemento aparecerá/desaparecerá
                origin: 'bottom',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
            }
        );
        ScrollReveal().reveal('.inspira-four',
            { delay: 500,
                reset: false,
                distance: '250px',   // Distancia desde la que el elemento aparecerá/desaparecerá
                origin: 'right',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
            }
        );
    }

    ScrollReveal().reveal('.inspira-title',
        { delay: 500,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'left',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );
    ScrollReveal().reveal('.inspira-text',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'right',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    ScrollReveal().reveal('.image-fase-one',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            scale:1,   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    ScrollReveal().reveal('.image-fase-two',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            scale:1,   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    ScrollReveal().reveal('.image-fase-three',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            easing: 'ease-in',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    ScrollReveal().reveal('.image-fase-four',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            easing: 'cubic-bezier(0.5, 0, 0, 1)',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    ScrollReveal().reveal('.fases-one',
        { delay: 500,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'bottom',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
            afterReveal: ()=>{
                $('.col-fases:not(:last-child) .fases-one').addClass('add-width');
            }
        },
        
    );

    ScrollReveal().reveal('.fases-two',
        { delay: 1000,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'bottom',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
            afterReveal: ()=>{
                $('.col-fases:not(:last-child) .fases-two').addClass('add-width');
            }
        }
    );

    
    ScrollReveal().reveal('.fases-three',
        { delay: 1500,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'bottom',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
            afterReveal: ()=>{
                $('.col-fases:not(:last-child) .fases-three').addClass('add-width');
            }
        }
    );

    
    ScrollReveal().reveal('.fases-four',
        { delay: 1750,
            reset: false,
            distance: '200px',   // Distancia desde la que el elemento aparecerá/desaparecerá
            origin: 'bottom',   // Desde qué dirección aparecerá el elemento (bottom, top, left, right)
        }
    );

    if (window.innerWidth < 760) {
    $('.winners').slick({
    infinite: true,              // ✅ Loop infinito
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    centerMode: false,           // ✅ Alineado a la izquierda
    centerPadding: '0px',        // ✅ Sin padding lateral
    initialSlide: 0,             // ✅ Siempre desde el primer slide
    autoplay: true,              // ✅ Se mueve solo
    autoplaySpeed: 0,            // ✅ Sin pausa entre slides
    speed: 6500,                 // ✅ Scroll continuo lento
    cssEase: 'linear',           // ✅ Transición fluida constante
    arrows: false,
    swipe: false,                // ✅ Desactiva swipe para evitar desplazamiento lento manual
    responsive: [
        {
            breakpoint: 320,
            settings: {
                arrows: false,
                slidesToShow: 1,
                centerPadding: '0px',
            }
        }
    ]
});


    let isPaused = false;
    let slickInstance = $('.winners');

    const toggleBtn = document.getElementById('sliderToggle');
    const toggleIcon = document.getElementById('sliderToggleIcon');

    if (toggleBtn && toggleIcon) {
        toggleBtn.addEventListener('click', function () {
            if (isPaused) {
                slickInstance.slick('slickPlay');
                toggleIcon.src = 'images/icon-pause.png';
                toggleIcon.alt = 'Pausar';
            } else {
                slickInstance.slick('slickPause');
                toggleIcon.src = 'images/icon-play.png';
                toggleIcon.alt = 'Reproducir';
            }

            isPaused = !isPaused;
        });
    }
}


    if (typeof GLightbox !== 'undefined' && GLightbox !== null) {
        const lightbox = GLightbox({selector: '.glightbox'});

        $('.images-fases img').on('click', () => {
            lightbox.open()
        })
    }
    /*function openGallery() {
        document.querySelector('.glightbox').click();
    }*/

    const modalEl = document.getElementById('myVideo');
    const video = document.getElementById('modal-video');

    modalEl.addEventListener('hidden.bs.modal', function () {
        if (video) {
            video.pause();
            video.currentTime = 0; // Opcional: reinicia el video
        }
    });
    modalEl.addEventListener('show.bs.modal', function () {
        if (video) {
            video.play();
            video.currentTime = 0; // Opcional: reinicia el video
        }
    });
})

let scrollProgress = 0;
let lottieAnimation;
const progressDisplay = document.querySelector('.progress');

// Initialize Lottie with a treasure chest animation
// This is a sample animation path - using a built-in demo animation
lottieAnimation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'canvas',
    loop: true,
    autoplay: false,
    // We're using a built-in demo animation since we don't have a custom one
    // In a real project, you would replace this with your custom animation path
    path: 'anim/180.json',
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        className: 'add-server'
    }
});

window.addEventListener('scroll', () => {
    // Calculate scroll percentage (0 to 1)
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    scrollProgress = window.scrollY / scrollHeight;

    // Update progress display
    //progressDisplay.textContent = `Scroll Progress: ${Math.floor(scrollProgress * 100)}%`;

    // Control Lottie animation based on scroll position
    if (lottieAnimation) {
        // Get total frames of the animation
        const totalFrames = lottieAnimation.totalFrames;

        // Set the current frame based on scroll progress
        const currentFrame = scrollProgress * totalFrames;
        lottieAnimation.goToAndStop(currentFrame, true);
    }

    // Update section visibility
    //updateSections();
});

// Fallback animation in case the Lottie animation fails to load
lottieAnimation.addEventListener('data_failed', () => {
    console.log('Lottie animation failed to load. Using fallback animation.');

    // Create a fallback animation using a different Lottie animation
    lottieAnimation = lottie.loadAnimation({
        container: document.getElementById('lottie-animation'),
        renderer: 'canvas',
        loop: false,
        autoplay: false,
        path: 'anim/180.json',
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
            className: 'add-server'
        },
    });
});
