
/**
 * textmenu.js
 * 2016-09-18
 */
var TextMenu = function (menuId, display, url, iclass, active) {
    if (Utils.isEmpty(active)) {
        this._init(menuId, display, url, iclass, "");
    } else {
        this._init(menuId, display, url, iclass, active);
    }
};


TextMenu.prototype._init = function (menuId, display, url, iclass, active) {
    // iclass="menu-icon fa fa-tachometer"
    // active="active"

    this.menu = {
        menuId: menuId,
        display: display,
        active: active,
        url: url,
        iclass: iclass
    };
};


TextMenu.prototype.toJsonString = function () {
    return JSON.stringify(this.menu);
};


TextMenu.prototype.toHtmlString = function () {

    var html =
        '<li id="' + this.menu.menuId + '" class="' + this.menu.active + '">' + '\n' +
        '  <a href="' + this.menu.url + '">' + '\n' +
        '    <i class="' + this.menu.iclass + '"></i>' + '\n' +
        '    <span class="menu-text">' + this.menu.display + '</span>' + '\n' +
        '  </a>' + '\n' +
        '  <b class="arrow"></b>' + '\n' +
        '</li>' + '\n';

    return html;
};
