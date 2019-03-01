
/**
 * uigroup.js
 * 2016-09-18
 */
var UIGroup = function (groupId) {
    this._init(groupId);
};


UIGroup.prototype._init = function (groupId) {
    this.groupId = groupId;
    this.uilist = [];
};


UIGroup.prototype.addElement = function (el) {
    this.uilist.push(el);
};


UIGroup.prototype.toJsonString = function () {
    var json;

    this.uilist.forEach(function (el) {
        if (json === undefined) {
            json = '[\n' + el.toJsonString();
        } else {
            json += ',\n' + el.toJsonString();
        }
    });

    if (json === undefined) {
        json = '[]';
    } else {
        json += '\n]';
    }
    return json;
};


UIGroup.prototype.toHtmlString = function () {
    var html = '';

    this.uilist.forEach(function (el) {
        html += el.toHtmlString();
    });

    return html;
};


UIGroup.prototype.bindHtml = function (divId) {
    var div = '';

    if (Utils.notEmpty(divId)) {
        div = (divId[0] === '#') ? divId : ('#' + divId);
    } else {
        div = (this.groupId[0] === '#') ? this.groupId : ('#' + this.groupId);
    }

    $(div).html(this.toHtmlString());
};
