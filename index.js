const pixelWidth = require('string-pixel-width');

var makeLabel = function(options) {
    options = options || {};
    const text = options.text || 'bug';
    const fontfamily = options.fontfamily || 'Helvetica,Arial';
    const fontsize = +options.fontsize || 12;
    const fontweight = +options.fontweight || 600;
    const fontsizeadjust = Math.round(fontsize * (fontweight > 500 ? 1.1 : 1));
    const pad = Math.round(fontsize * 0.75);
    const width = +options.width || Math.round(pixelWidth(text, { size: fontsizeadjust }) + pad);
    const height = Math.round(fontsize * 1.6666);
    const roundness = Math.round(height * 0.1);
    const fgcolor = options.fgcolor || '#ffffff';
    const bgcolor = options.bgcolor || '#ee0701';

    return (
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + width + '" height="' + height + '">' +
        '<rect width="' + width +'" height="' + height + '" rx="' + roundness + '" ry="' + roundness + '" fill="' + bgcolor + '"/>' +
        '<text x="' + Math.round(width / 2) + '" y="' + Math.round(height * 0.7) + '" fill="' + fgcolor + '" text-anchor="middle" ' +
           'font-family="' + fontfamily + '" font-size="' + fontsize + '" font-weight="' + fontweight + '">' +
         text + '</text>' +
        '</svg>'
    );
}

module.exports = makeLabel;
