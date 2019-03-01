
/**
 * end.js
 * public interfaces:
 */
window.pepstack = {};
window.pepstack.UI = {};

window.pepstack.useAssets = function (assets) {
    var ob = PepUI.getInstance(assets);
    window.pepstack.UI.assets = ob;
    return ob;
};

window.pepstack.UI.GridTable = GridTable;
window.pepstack.UI.Group = UIGroup;

window.pepstack.UI.ImageLabel = ImageLabel;

window.pepstack.UI.PieChart = PieChart;
window.pepstack.UI.PopOver = PopOver;
window.pepstack.UI.ProfileInfo = ProfileInfo;

window.pepstack.UI.Tabbable = Tabbable;
window.pepstack.UI.TextButton = TextButton;
window.pepstack.UI.TextMenu = TextMenu;
window.pepstack.UI.TreeMenu = TreeMenu;

/*TODO:
window.pepstack.UI.SlideMenu = SlideMenu;
window.pepstack.UI.MegaMenu = MegaMenu;
window.pepstack.UI.Accordion = Accordion;
window.pepstack.UI.AccordionPanel = AccordionPanel;
*/

}(window, jQuery));
