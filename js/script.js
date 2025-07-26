document.addEventListener('DOMContentLoaded', function () {
    // Handle email form submission
    const emailForm = document.getElementById('emailForm');
    if (emailForm) {
        emailForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (email && message) {
                alert(`Thank you! Your message has been received.\n\nEmail: ${email}\nMessage: ${message}`);
                document.getElementById('emailForm').reset();
            }
        });
    }

    // Handle carousel scrolling
    const carousels = document.querySelectorAll('.carousel');
    if (carousels.length > 0) {
        carousels.forEach(carousel => {
            carousel.addEventListener('wheel', event => {
                event.preventDefault();
                carousel.scrollBy({
                    left: event.deltaY < 0 ? -100 : 100,
                    behavior: 'smooth'
                });
            });
        });
    }

    /**
     * Syncs audio with video playback
     */
    function setupVideoAudioSync(videoId, audioId, duration = 0, volume = 1) {
        const video = document.getElementById(videoId);
        const audio = document.getElementById(audioId);

        if (!video || !audio) return;

        audio.preload = "auto";
        audio.volume = volume;

        video.addEventListener('play', function () {
            audio.style.display = 'none';
            audio.currentTime = 0;
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log(`Audio playback prevented: `, error);
                    video.addEventListener('click', function playAudioOnce() {
                        audio.play();
                        video.removeEventListener('click', playAudioOnce);
                    }, { once: true });
                });
            }

            if (duration > 0) {
                setTimeout(function () {
                    audio.pause();
                }, duration);
            }
        });

        video.addEventListener('pause', function () {
            audio.pause();
        });

        video.addEventListener('ended', function () {
            audio.pause();
        });
    }

    // Set up video audio synchronization
    setupVideoAudioSync('capeTownVideo', 'natureAudio', 24000, 1.0);
    setupVideoAudioSync('aboutVideo', 'forestAudio', 0, 0.4);

    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

