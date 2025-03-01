document.getElementById('saveBtn').addEventListener('click', () => {
    const bufferSize = document.getElementById('bufferSize').value;
    chrome.storage.sync.set({ bufferSize }, () => {
        console.log('Buffer méret beállítva: ' + bufferSize + ' másodperc.');
    });
});
