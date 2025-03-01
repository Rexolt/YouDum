(function() {
    console.log('YouTube Optimizer bővítmény aktiválva.');

    function getPreferredQuality() {
        let quality = 'hd1080';
        if (navigator.connection && navigator.connection.effectiveType) {
            const effectiveType = navigator.connection.effectiveType;
            if (effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g') {
                quality = 'hd720';
            }
        }
        return quality;
    }

    function adjustQualityBasedOnBuffer() {
        const video = document.querySelector('video');
        if (!video) return;

        const currentTime = video.currentTime;
        let bufferAhead = 0;
        for (let i = 0; i < video.buffered.length; i++) {
            if (video.buffered.start(i) <= currentTime && video.buffered.end(i) >= currentTime) {
                bufferAhead = video.buffered.end(i) - currentTime;
                break;
            }
        }

        const player = document.getElementById('movie_player');
        if (player && typeof player.setPlaybackQuality === 'function') {
            let quality;
            if (bufferAhead < 5) {
                quality = 'hd720';
                console.log('Buffer alacsony (' + bufferAhead.toFixed(2) + 's), minőség csökkentve: ' + quality);
            } else {
                quality = getPreferredQuality();
                console.log('Buffer megfelelő (' + bufferAhead.toFixed(2) + 's), Lejátszási minőség beállítva: ' + quality);
            }
            player.setPlaybackQuality(quality);
        }
    }

    function monitorVideoEvents() {
        const video = document.querySelector('video');
        if (video) {
            video.addEventListener('waiting', () => {
                console.log('Videó várakozik (buffer hiány miatt), ellenőrzés...');
                adjustQualityBasedOnBuffer();
            });
            video.addEventListener('playing', () => {
                console.log('Videó lejátszás folytatódik.');
                adjustQualityBasedOnBuffer();
            });
        }
    }

    function optimizePlayer() {
        const player = document.getElementById('movie_player');
        if (player && typeof player.setPlaybackQuality === 'function') {
            const preferredQuality = getPreferredQuality();
            player.setPlaybackQuality(preferredQuality);
            console.log('Lejátszási minőség beállítva: ' + preferredQuality);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        optimizePlayer();
        monitorVideoEvents();
    });

    setInterval(adjustQualityBasedOnBuffer, 5000);
})();
