
/**
 * pepui.js
 *
 * http://www.cleancss.com/html-beautify/
 */
var PepUI = function (assetsRoot) {
    this._init(assetsRoot);
};

PepUI.getInstance = function (assetsRoot) {
    var ob = new PepUI(assetsRoot);
    return ob;
};

/**
 * static variable: VERSION
 * will be replaced by version.txt after make
 */
PepUI.prototype._version = "@VERSION";

PepUI.prototype._init = function (assetsRoot) {
    var assets_js = assetsRoot + "/js/";
    var assets_css = assetsRoot + "/css/";
    var browser = Utils.getBrowserAgent();

    // css:
    //<!-- bootstrap & fontawesome -->
    //<link rel="stylesheet" href="assets/css/bootstrap.min.css" />
    //<link rel="stylesheet" href="assets/font-awesome/4.5.0/css/font-awesome.min.css" />
    Utils.loadCssStyles(
        assets_css + 'bootstrap.min.css',
        assetsRoot + '/font-awesome/4.5.0/css/font-awesome.min.css'
    );

    //<!-- page specific plugin styles -->
    Utils.loadCssStyles(
        assets_css + 'colorbox.min.css',
        assets_css + 'jquery-ui.min.css',
        assets_css + 'bootstrap-datepicker3.min.css',
        assets_css + 'ui.jqgrid.min.css',
        assets_css + 'jquery-ui.custom.min.css',
        assets_css + 'jquery.gritter.min.css',
        assets_css + 'select2.min.css',
        assets_css + 'bootstrap-editable.min.css',
        assets_css + 'bootstrap-duallistbox.min.css',
        assets_css + 'bootstrap-multiselect.min.css'
    );

    //<!-- text fonts -->
    //<link rel="stylesheet" href="assets/css/fonts.googleapis.com.css" />
    Utils.loadCssStyles(assets_css + 'fonts.googleapis.com.css');

    //<!-- ace styles -->
    //<link rel="stylesheet" href="assets/css/ace.min.css" class="ace-main-stylesheet" id="main-ace-style" />
    Utils.addCssStyle(assets_css + 'ace.min.css', 'ace-main-stylesheet', 'main-ace-style');

    //<!--[if lte IE 9]>
    //<link rel="stylesheet" href="assets/css/ace-part2.min.css" class="ace-main-stylesheet" />
    //<![endif]-->
    if (Utils.isTrue(browser.ie) && browser.ieVer.isLtIE10) {
        Utils.addCssStyle(assets_css + 'ace-part2.min.css', 'ace-main-stylesheet', '');
    }

    //<link rel="stylesheet" href="assets/css/ace-skins.min.css" />
    //<link rel="stylesheet" href="assets/css/ace-rtl.min.css" />
    Utils.loadCssStyles(
        assets_css + 'ace-skins.min.css',
        assets_css + 'ace-rtl.min.css'
    );

    //<!--[if lte IE 9]>
    //<link rel="stylesheet" href="assets/css/ace-ie.min.css" />
    //<![endif]-->
    if (Utils.isTrue(browser.ie) && browser.ieVer.isLtIE10) {
        Utils.loadCssStyles(assets_css + 'ace-ie.min.css');
    }

    // js:
    //<!-- ace settings handler -->
    //<script src="assets/js/ace-extra.min.js"></script>
    Utils.importScripts(assets_js + 'ace-extra.min.js');

    //<!-- HTML5shiv and Respond.js for IE8 to support HTML5 elements and media queries -->
    //<!--[if lte IE 8]>
    //<script src="assets/js/html5shiv.min.js"></script>
    //<script src="assets/js/respond.min.js"></script>
    //<![endif]-->
    if (Utils.isTrue(browser.ie)) {
        if (browser.ieVer.isLtIE9) {
            Utils.importScripts(
                assets_js + 'html5shiv.min.js',
                assets_js + 'respond.min.js',
                assets_js + 'excanvas.min.js'
            );
        }
        Utils.importScripts(assets_js + 'jquery-1.11.3.min.js');
    }

    this.configs = {};
    this.configs.assets_js = assets_js;
    this.configs.assets_css = assets_css;
    this.configs.browser = browser;
};


PepUI.prototype.load_head = function () {
    var assets_js = this.configs.assets_js;
    var assets_css = this.configs.assets_css;
    var browser = this.configs.browser;
};


PepUI.prototype.loadjs = function () {
    var assets_js = this.configs.assets_js;
    var browser = this.configs.browser;

    //<script src="assets/js/jquery-ui.custom.min.js"></script>
    Utils.importScripts(
        assets_js + 'jquery.mobile.custom.min.js',
        assets_js + 'jquery-ui.custom.min.js',
        assets_js + 'jquery.ui.touch-punch.min.js',
        assets_js + 'jquery.gritter.min.js',
        assets_js + 'jquery.easypiechart.min.js',
        assets_js + 'jquery.sparkline.index.min.js',
        assets_js + 'jquery.flot.min.js',
        assets_js + 'jquery.flot.pie.min.js',
        assets_js + 'jquery.flot.resize.min.js',
        assets_js + 'jquery.hotkeys.index.min.js',
        assets_js + 'jquery.maskedinput.min.js',
        assets_js + 'jquery.colorbox.min.js',
        assets_js + 'jquery.bootstrap-duallistbox.min.js',
        assets_js + 'jquery.raty.min.js',
        assets_js + 'jquery-typeahead.js'
    );

    Utils.importScripts(
        assets_js + 'bootstrap.min.js',
        assets_js + 'bootstrap-editable.min.js',
        assets_js + 'bootstrap-datepicker.min.js',
        assets_js + 'jquery.jqGrid.min.js',
        assets_js + 'grid.locale-en.js',
        assets_js + 'bootstrap-wysiwyg.min.js',
        assets_js + 'bootstrap-multiselect.min.js',
        assets_js + 'bootbox.js',
        assets_js + 'select2.min.js',
        assets_js + 'spinbox.min.js',
        assets_js + 'ace-editable.min.js',
        assets_js + 'ace-elements.min.js',
        assets_js + 'ace.min.js'
    );
};


// public:
//
PepUI.prototype.toString = function () {
    return "[javascript:pepstack.UI.PepUI]";
};
