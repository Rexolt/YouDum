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

if (typeof module !== 'undefined') {
    module.exports = { getPreferredQuality };
}
