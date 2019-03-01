
/**
 * textbutton.js
 * 2016-09-19
 */
var TextButton = function (btnId, btnClass) {
    this._init(btnId, btnClass);
};


TextButton.prototype._init = function (btnId, btnClass) {
    this.tbtn = {
        btnId: btnId,
        btnClass: btnClass,
        texts: []
    };
};


TextButton.prototype.addText = function (txtClass, display) {
    this.tbtn.texts.push({
        txtClass: txtClass,
        display: display
    });
};


TextButton.prototype.toJsonString = function () {
    return JSON.stringify(this.tbtn);
};


TextButton.prototype.toHtmlString = function () {
    var i = 0,
        l = this.tbtn.texts.length;

    var html =
        '<span id="' + this.tbtn.btnId + '" class="' + this.tbtn.btnClass + '">' + '\n';

    this.tbtn.texts.forEach(function (el) {
        html += '  <span class="' + el.txtClass + '">' + el.display + '</span>' + '\n';
        if (++i < l) {
            html += '  <br/>' + '\n';
        }
    });

    html += '</span>' + '\n';

    return html;
};
