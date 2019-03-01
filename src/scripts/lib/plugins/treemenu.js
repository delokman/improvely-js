
/**
 * treemenu.js
 * 2016-09-18
 */
var TreeMenu = function (menuId, display, iclass, active) {
    if (Utils.isEmpty(active)) {
        this._init(menuId, display, iclass, "");
    } else {
        this._init(menuId, display, iclass, active);
    }
};


TreeMenu.prototype._init = function (menuId, display, iclass, active) {
    this.menu = {
        menuId: menuId,
        display: display,
        iclass: iclass,
        active: active,
        submenus: []
    };
};


TreeMenu.prototype.addSubmenu = function (itemId, display, url, active) {
    if (Utils.isEmpty(active)) {
        this.menu.submenus.push({
            itemId: itemId,
            display: display,
            url: url,
            active: "",
            iclass: 'menu-icon fa fa-caret-right'
        });
    } else {
        this.menu.submenus.push({
            itemId: itemId,
            display: display,
            url: url,
            active: active,
            iclass: 'menu-icon fa fa-caret-right'
        });
    }
};


TreeMenu.prototype.toJsonString = function () {
    return JSON.stringify(this.menu);
};


TreeMenu.prototype.toHtmlString = function () {
    var html =
        '<li id="' + this.menu.menuId + '" class="' + this.menu.active + '">' + '\n' +
        '  <a href="#" class="dropdown-toggle">' + '\n' +
        '    <i class="' + this.menu.iclass + '"></i>' + '\n' +
        '    <span class="menu-text">' + this.menu.display + '</span>' + '\n' +
        '    <b class="arrow fa fa-angle-down"></b>' + '\n' +
        '  </a>' + '\n';

    html +=
        '  <b class="arrow"></b>' + '\n' +
        '  <ul class="submenu">' + '\n';

    this.menu.submenus.forEach(function (el) {
        var li =
            '<li id="' + el.itemId + '" class="' + el.active + '">' + '\n' +
            '  <a href="' + el.url + '">' + '\n' +
            '    <i class="' + el.iclass + '"></i>' + '\n' + el.display + '\n' +
            '  </a>' + '\n' +
            '  <b class="arrow"></b>' + '\n' +
            '</li>' + '\n';

        html += li;
    });

    html +=
        '  </ul>' + '\n' +
        '</li>' + '\n';

    return html;
};