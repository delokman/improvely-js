
/**
 * profileinfo.js
 * 2016-09-19
 */
var ProfileInfo = function (name, value) {
    this._init(name, value);
};


ProfileInfo.prototype._init = function (name, value) {
    this.row = {
        name: name,
        value: value
    };
};


ProfileInfo.prototype.toJsonString = function () {
    return JSON.stringify(this.row);
};


ProfileInfo.prototype.toHtmlString = function () {
    var html =
        '<div class="profile-info-row">' + '\n' +
        '  <div class="profile-info-name">' + this.row.name + '</div>' + '\n' +
        '  <div class="profile-info-value">' + '\n' +
        '    <span>' + this.row.value + '</span>' + '\n' +
        '  </div>' + '\n' +
        '</div>' + '\n';

    return html;
};
