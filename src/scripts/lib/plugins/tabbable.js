
/**
 * tabbable.js
 * 2016-09-21
 */
var Tabbable = function (id) {
    this._init(id);
};


Tabbable.fromJson = function (jsonData) {
    var tab = new Tabbable(jsonData.id);

    tab.data.tabs = jsonData.tabs;
    tab.data.content = jsonData.content;
    return tab;
};


Tabbable.prototype._init = function (id) {
    this.data = {
        id: id,
        tabs: [],
        content: []
    };
};


Tabbable.prototype.addToggleTab = function (tabId, display, isActive,
    beforeHtml, afterHtml) {
    this.data.tabs.push({
        toggle: "tab",
        href: '#' + tabId,
        display: display,
        active: isActive,
        before: beforeHtml,
        after: afterHtml
    });
};


Tabbable.prototype.addTabContent = function (tabId, display) {
    this.data.content.push({
        tabId: tabId,
        display: display
    });
};


Tabbable.prototype.toJsonString = function () {
    return JSON.stringify(this.data);
};


Tabbable.prototype.toHtmlString = function () {
    var html = "";
    return html;
};