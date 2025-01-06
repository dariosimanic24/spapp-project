const fontSizeSelector = document.getElementById('font-size');


function applyFontSize(size) {
    document.body.style.fontSize = size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px';
}


fontSizeSelector.addEventListener('change', () => applyFontSize(fontSizeSelector.value));


applyFontSize('medium');
