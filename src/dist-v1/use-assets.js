/**
 * use-assets.js
 * version: 0.0.1
 */

(function (window, undefined) {
    "use strict";
    Utils.log("load: use-assets.js");

    var pageConfig = {};

    var scripts = document.getElementsByTagName("script");
    eval(scripts[ scripts.length - 1 ].innerHTML);

    Utils.log("pageConfig.pageURI='" + pageConfig.pageURI + "'");
    Utils.log("pageConfig.assetsRoot='" + pageConfig.assetsRoot + "'");

    var assetsRoot = pageConfig.assetsRoot;

    /*
    <link rel="stylesheet" href="assets/font-awesome/4.5.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="assets/css/app.css" />
    */
    Utils.loadCssStyles(
        assetsRoot + 'font-awesome/4.5.0/css/font-awesome.min.css',
        assetsRoot + 'css/app.css'
    );

    /* <script src="assets/js/app.js"></script> */
    Utils.importScripts(assetsRoot + 'js/app.js');

    /*
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="assets/js/html5shiv-3.7.0.min.js"></script>
    <script src="assets/js/respond-1.4.2.min.js"></script>
    <![endif]-->
    */
    var browser = Utils.getBrowserAgent();

    if (Utils.isTrue(browser.ie)) {
        if (browser.ieVer.isLtIE9) {
            Utils.importScripts(
                assetsRoot + 'js/html5shiv.min.js',
                assetsRoot + 'js/respond.min.js'
            );
        }
    }

    function getVal(val, defval) {
        if (typeof val == 'undefined') {
            return defval;
        } else {
            return val;
        }        
    }

    function fmtDate(dt) {
        var dd = dt.getDate();
        var mm = dt.getMonth() + 1;
        var yyyy = dt.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    /////////////////////////////////////////////
    // parse query params
    var q = pageConfig.pageURI.query_params;

    var start = new Date();
    var end = new Date(start);
    start.setMonth(end.getMonth() - 1);

    var userPreferences = {
        'main.html': {
            goal: getVal(q['goal'], 'all'),
            gameid: getVal(q['gameid'], '0'),
            metric1: getVal(q['metric1'], 'revenue'),
            metric2: getVal(q['metric2'], 'cpa'),
            units: getVal(q['units'], 'days'),
            start: getVal(q['start'], fmtDate(start)),
            end: getVal(q['end'], fmtDate(end)),
            timezone: 'America/New_York',
            plan_id: 3,
            currency_symbol: '$'
        },
        'settings.html': {
            goal: getVal(q['goal'], 'all'),
            gameid: getVal(q['gameid'], '0'),
            metric1: getVal(q['metric1'], 'revenue'),
            metric2: getVal(q['metric2'], 'cpa'),
            units: getVal(q['units'], 'days'),
            start: getVal(q['start'], fmtDate(start)),
            end: getVal(q['end'], fmtDate(end)),

            timezone: 'America/New_York',
            plan_id: 3,
            currency_symbol: '$'
        },
        'dashboard.html': {
            goal: getVal(q['goal'], 'all'),
            gameid: getVal(q['gameid'], '0'),
            metric1: getVal(q['metric1'], 'people'),
            metric2: getVal(q['metric2'], 'conversions'),
            units: getVal(q['units'], 'days'),
            start: getVal(q['start'], fmtDate(start)),
            end: getVal(q['end'], fmtDate(end)),
            timezone: 'America/New_York',
            plan_id: 3,
            currency_symbol: '$'
        },
        'feedback-stat.html': {
            goal: getVal(q['goal'], 'all'),
            gameid: getVal(q['gameid'], '0'),
            metric1: getVal(q['metric1'], 'posts'),
            metric2: getVal(q['metric2'], 'clicks'),
            units: getVal(q['units'], 'days'),
            start: getVal(q['start'], fmtDate(start)),
            end: getVal(q['end'], fmtDate(end)),
            currency_symbol: '$'
        },
        'forum-stat.html': {
            goal: getVal(q['goal'], 'all'),
            gameid: getVal(q['gameid'], '0'),
            metric1: getVal(q['metric1'], 'posts'),
            metric2: getVal(q['metric2'], 'clicks'),
            units: getVal(q['units'], 'days'),
            start: getVal(q['start'], fmtDate(start)),
            end: getVal(q['end'], fmtDate(end)),
            currency_symbol: '$'
        }
    };

    pageConfig.userPrefs = userPreferences[pageConfig.PAGEID];

    /////////////////////////////////////////////
    // global output
    if (Utils.isNull(window.appConfig)) {
        window.appConfig = {}
    }

    window.appConfig[pageConfig.PAGEID] = pageConfig;

    window.gotoPage = function (pageuri, pars) {
        if (pars !== undefined) {
            if (pars.gameid !== undefined) {
                sessionStorage.gameid = pars.gameid + '';
            }
            if (pars.gamename !== undefined) {
                sessionStorage.gamename = pars.gamename + '';
            }
            if (pars.userid !== undefined) {
                sessionStorage.userid = pars.userid + '';
            }
        }
        window.location.href = pageuri;
    };

    window.initOwnerGames = function (apiRoot) {
        var ul = $("div#gameid-template").parent();
        var gameid_tmpl = $('div#gameid-template').html();
        $('#current_game').html(sessionStorage.gamename);

        var jsonurl = apiRoot + "user_group.json?userid=1000";

        $.getJSON(jsonurl, function(jsonData) {
            // 用户可能属于多个组, 对每个组都要查询gameid[]
            var rows = jsonData.Rows;

            $.each(rows, function(i, row) {
                var jsonurl = apiRoot + "game_owner.json?grpid=" + row.grpid;

                $.getJSON(jsonurl, function(jsonData) {
                    // 对每个游戏id分别获取其概要信息
                    var rows = jsonData.Rows;

                    $.each(rows, function(i, row) {
                        var li = ul.children("li#gameid-" + row.gameid);

                        // 去除重复gameid
                        if (li.length === 0) {
                            // 必须缓存gameid, row 下面重用这个变量名
                            var gameid = parseInt(row.gameid);

                            var jsonurl = apiRoot + "game_profile.json?id=" + gameid;

                            $.getJSON(jsonurl, function(jsonData) {
                                // 正常情况应该只返回一条数据
                                var rows = jsonData.Rows;

                                $.each(rows, function(i, row) {
                                    var li = ul.children("li#gameid-" + row.id);

                                    // 去除重复gameid
                                    if (li.length === 0) {
                                        // 测试条件下会返回多条, 忽略其他
                                        if (gameid === parseInt(row.id)) {
                                            Utils.log(row.avatar);

                                            var gameid_html = gameid_tmpl.
                                                replace(/{{gameid}}/g, row.id).
                                                replace(/{{gamename}}/g, row.name);

                                            ul.children("li.footer").before(gameid_html);

                                            // updateData();
                                        }
                                    }
                                });
                            });
                        }
                    });
                });
            });
        });
    };
}(window));
