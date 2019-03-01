/***********************************************************************
 * pepstack-ui.js
 *
 * Version: 0.1.1pre
 *
 * Copyright (c) 2012-2013 cheungmine
 *
 * All rights reserved under the copyright laws of the United States.
 * You may freely redistribute and use this software, with or
 * without modification, provided you include the original copyright
 * and use restrictions.  See use restrictions in the file:
 * <install location>/License.txt
 *
 * Last Date: Fri Mar 1 12:10:23 2019 +0800
 **********************************************************************/
/**
 * begin.js
 */
(function (window, $, undefined) {
/* Enable ECMAScript "strict" operation for this function. See more:
 *   http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
 *
 * jslint options=>
 * browser: true,
 * onevar: true,
 * undef: true,
 * nomen: true,
 * bitwise: true,
 * regexp: true,
 * newcap: true,
 * immed: true,
 * strict: true,
 * global window: false,
 * jQuery: false,
 * console: false
 */
'use strict';

/* Predefinitions, DONOT change below: */
var
    TRUE = true,
    FALSE = false,
    NULL = null,
    E_INDEX = -1;

/************************** javascript classes ************************/

/**
 * error.js
 */
var ErrorClass = function (message, source, sourceFile, sourceLineNo) {
    this.init(message, source, sourceFile, sourceLineNo);
};

ErrorClass.inherits(Error);

ErrorClass.prototype.init = function (message, source, sourceFile, sourceLineNo) {
    // error message
    this.message = message;

    // source class name
    this.source = source;

    // source filename
    this.sourceFile = sourceFile;

    // line no in source filename
    this.sourceLineNo = sourceLineNo;
};

ErrorClass.prototype.toString = function () {
    return "[javascript ErrorClass]";
};

ErrorClass.prototype.print = function () {
    var msg;

    if (__not_null(this.source)) {
        msg = this.source + " Error";
    } else {
        msg = "Error";
    }

    if (__not_null(this.message)) {
        msg += ": " + this.message + ".";
    } else {
        msg += ".";
    }

    if (__not_null(this.sourceFile)) {
        msg += " ( " + this.sourceFile;

        if (__not_null(this.sourceLineNo)) {
            msg += " : line " + this.sourceLineNo;
        }

        msg += " )";
    }

    return msg;
};

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

/**
 * gridtable.js
 *   A wrapper of jqGrid
 *
 *   http://stackoverflow.com/questions/16876182/how-to-show-horizontal-scroll-bar-in-jqgrid
 *
 * created: 2016-09-26
 * updated: 2016-10-10
 */
var GridTable = function (opt) {
    this._init(opt);
};


GridTable.prototype._init = function (opt) {
    var grid_selector = (opt.table_id[0] === '#') ? opt.table_id : '#' + opt.table_id;
    var pager_selector = (opt.pager_id[0] === '#') ? opt.pager_id : '#' + opt.pager_id;

    var tabpane_selector;
    if (Utils.notEmpty(opt.tabpane_id)) {
        tabpane_selector = (opt.tabpane_id[0] === '#') ? opt.tabpane_id : '#' + opt.tabpane_id;
    }

    // sample data
    var grid_data = [
        {id: "1", name: "Desktop Computer", note: "note", stock: "Yes", ship: "FedEx", sdate: "2007-12-03"},
        {id: "2", name: "Laptop", note: "Long text ", stock: "Yes", ship: "InTime", sdate: "2008-12-03"},
        {id: "3", name: "LCD Monitor", note: "note3", stock: "Yes", ship: "TNT", sdate: "2007-12-03"},
        {id: "4", name: "Speakers", note: "note", stock: "No", ship: "ARAMEX", sdate: "2007-12-13"},
        {id: "5", name: "Laser Printer", note: "note2", stock: "Yes", ship: "FedEx", sdate: "2007-12-03"},
        {id: "6", name: "Play Station", note: "note3", stock: "No", ship: "FedEx", sdate: "2012-12-03"},
        {id: "7", name: "Mobile Telephone", note: "note", stock: "Yes", ship: "ARAMEX", sdate: "2007-12-03"},
        {id: "8", name: "Server", note: "note2", stock: "Yes", ship: "TNT", sdate: "2007-12-03"},
        {id: "9", name: "Matrix Printer", note: "note3", stock: "No", ship: "FedEx", sdate: "2007-12-03"},
        {id: "10", name: "Desktop Computer", note: "note", stock: "Yes", ship: "FedEx", sdate: "2005-12-03"},
        {id: "11", name: "Laptop", note: "Long text ", stock: "Yes", ship: "InTime", sdate: "2007-12-03"},
        {id: "12", name: "LCD Monitor", note: "note3", stock: "Yes", ship: "TNT", sdate: "2007-12-03"},
        {id: "13", name: "Speakers", note: "note", stock: "No", ship: "ARAMEX", sdate: "2011-12-03"},
        {id: "14", name: "Laser Printer", note: "note2", stock: "Yes", ship: "FedEx", sdate: "2007-12-23"},
        {id: "15", name: "Play Station", note: "note3", stock: "No", ship: "FedEx", sdate: "2007-12-03"},
        {id: "16", name: "Mobile Telephone", note: "note", stock: "Yes", ship: "ARAMEX", sdate: "2007-12-03"},
        {id: "17", name: "Server", note: "note2", stock: "Yes", ship: "TNT", sdate: "2007-12-03"},
        {id: "18", name: "Matrix Printer", note: "note3", stock: "No", ship: "FedEx", sdate: "2007-12-03"},
        {id: "19", name: "Matrix Printer", note: "note3", stock: "No", ship: "FedEx", sdate: "2007-12-03"},
        {id: "20", name: "Desktop Computer", note: "note", stock: "Yes", ship: "FedEx", sdate: "2013-12-03"},
        {id: "21", name: "Laptop", note: "Long text ", stock: "Yes", ship: "InTime", sdate: "2015-11-03"},
        {id: "22", name: "LCD Monitor", note: "note3", stock: "Yes", ship: "TNT", sdate: "2009-12-03"},
        {id: "23", name: "Speakers", note: "note", stock: "No", ship: "ARAMEX", sdate: "2011-02-03"}
    ];

    var subgrid_data = [
        {id: "1", name: "sub grid item 1", qty: 11},
        {id: "2", name: "sub grid item 2", qty: 3},
        {id: "3", name: "sub grid item 3", qty: 12},
        {id: "4", name: "sub grid item 4", qty: 5},
        {id: "5", name: "sub grid item 5", qty: 2},
        {id: "6", name: "sub grid item 6", qty: 9},
        {id: "7", name: "sub grid item 7", qty: 3},
        {id: "8", name: "sub grid item 8", qty: 8}
    ];

    // properties
    // @option
    Object.defineProperty(this, 'option', {
        get: function () {
            return this.opt;
        },
        set: function (val) {
            this.opt = val;
        }
    });

    // register function
    // $(function () {
    $(document).ready((function (thisClass) {
        return function () {
            thisClass._onreadyCB(grid_selector, pager_selector, tabpane_selector,
                grid_data, subgrid_data);
        };
    }(this)));

    this.opt = opt;
};


GridTable.prototype.toJsonString = function () {
    return JSON.stringify(this.opt);
};


GridTable.prototype._onreadyCB = function (grid_selector, pager_selector, tabpane_selector,
    grid_data, subgrid_data) {

    var parent_column = $(grid_selector).closest('[class*="col-"]');

    //resize to fit page size
    $(window).on('resize.jqGrid', function () {
        // show X Scroll
        $(grid_selector).closest(".ui-jqgrid-bdiv").css({'overflow-x': 'scroll'});

        $(grid_selector).jqGrid('setGridWidth', parent_column.width());
    });

    //resize on sidebar collapse/expand
    $(document).on('settings.ace.jqGrid', function (ev, event_name, collapsed) {
        if (event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed') {
            //setTimeout is for webkit only to give time for DOM changes and then redraw!!!
            setTimeout(function () {
                $(grid_selector).jqGrid('setGridWidth', parent_column.width());
            }, 20);
        }
    });

    //if your grid is inside another element, for example a tab pane, you should use its parent's width:
    /**
    $(window).on('resize.jqGrid', function () {
        var parent_width = $(grid_selector).closest('.tab-pane').width();
        $(grid_selector).jqGrid( 'setGridWidth', parent_width );
    })
    //and also set width when tab pane becomes visible
    $('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
      if($(e.target).attr('href') == '#mygrid') {
        var parent_width = $(grid_selector).closest('.tab-pane').width();
        $(grid_selector).jqGrid( 'setGridWidth', parent_width );
      }
    })
    */

    jQuery(grid_selector).jqGrid({
        //nothing is saved
        editurl: "./dummy.php",
        caption: "GridTable",

        autowidth: false,
        shrinkToFit: false,
        forceFit: true,
        //direction: "rtl",

        //subgrid options
        subGrid: true,
        //subGridModel: [{ name : ['No','Item Name','Qty'], width : [55,200,80] }],
        //datatype: "xml",
        subGridOptions: {
            plusicon: "ace-icon fa fa-plus center bigger-110 blue",
            minusicon: "ace-icon fa fa-minus center bigger-110 blue",
            openicon: "ace-icon fa fa-chevron-right center orange"
        },
        //for this example we are using local data
        subGridRowExpanded: function (subgridDivId, rowId) {
            var subgridTableId = subgridDivId + "_t";
            $("#" + subgridDivId).html("<table id='" + subgridTableId + "'></table>");
            $("#" + subgridTableId).jqGrid({
                datatype: 'local',
                data: subgrid_data,
                colNames: ['No', 'Item Name', 'Qty'],
                colModel: [
                    {name: 'id', width: 50},
                    {name: 'name', width: 150},
                    {name: 'qty', width: 50}
                ]
            });
        },

        data: grid_data,
        datatype: "local",
        height: 300,
        colNames: [' ', 'ID', 'Last Sales', 'Name', 'Stock', 'Ship via', 'Notes'],
        colModel: [
            {
                name: 'myac',
                index: '',
                width: 80,
                fixed: true,
                sortable: false,
                resize: false,
                formatter: 'actions',
                formatoptions: {
                    keys: true,
                    //delbutton: false,//disable delete button

                    delOptions: {
                        recreateForm: true,
                        beforeShowForm: beforeDeleteCallback
                    }
                    //,editformbutton:true, editOptions:{recreateForm: true, beforeShowForm:beforeEditCallback}
                }
            },
            {
                name: 'id',
                index: 'id',
                width: 60,
                sorttype: "int",
                editable: true
            },
            {
                name: 'sdate',
                index: 'sdate',
                width: 90,
                editable: true,
                sorttype: "date",
                unformat: pickDate
            },
            {
                name: 'name',
                index: 'name',
                width: 150,
                editable: true,
                editoptions: {
                    size: "20",
                    maxlength: "30"
                }
            },
            {
                name: 'stock',
                index: 'stock',
                width: 70,
                editable: true,
                edittype: "checkbox",
                editoptions: {
                    value: "Yes:No"
                },
                unformat: aceSwitch
            },
            {
                name: 'ship',
                index: 'ship',
                width: 90,
                editable: true,
                edittype: "select",
                editoptions: {
                    value: "FE:FedEx;IN:InTime;TN:TNT;AR:ARAMEX"
                }
            },
            {
                name: 'note',
                index: 'note',
                width: 150,
                sortable: false,
                editable: true,
                edittype: "textarea",
                editoptions: {
                    rows: "2",
                    cols: "10"
                }
            }
        ],

        viewrecords: true,
        rowNum: 10,
        rowList: [10, 20, 30],
        pager: pager_selector,
        altRows: true,
        //toppager: true,

        multiselect: true,
        //multikey: "ctrlKey",
        multiboxonly: true,

        loadComplete: function () {
            var table = this;
            setTimeout(function () {
                styleCheckbox(table);

                updateActionIcons(table);
                updatePagerIcons(table);
                enableTooltips(table);
            }, 0);
        }

        /**
        ,
        grouping:true, 
        groupingView : { 
             groupField : ['name'],
             groupDataSorted : true,
             plusicon : 'fa fa-chevron-down bigger-110',
             minusicon : 'fa fa-chevron-up bigger-110'
        },
        caption: "Grouping"
        */
    });

    //trigger window resize to make the grid get the correct size
    $(window).triggerHandler('resize.jqGrid');

    //enable search/filter toolbar
    //jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})
    //jQuery(grid_selector).filterToolbar({});

    //switch element when editing inline
    function aceSwitch(cellvalue, options, cell) {
        setTimeout(function () {
            $(cell).find('input[type=checkbox]')
                .addClass('ace ace-switch ace-switch-5')
                .after('<span class="lbl"></span>');
        }, 0);
    }

    //enable datepicker
    function pickDate(cellvalue, options, cell) {
        setTimeout(function () {
            $(cell).find('input[type=text]').datepicker({
                format: 'yyyy-mm-dd',
                autoclose: true
            });
        }, 0);
    }

    //navButtons
    jQuery(grid_selector).jqGrid('navGrid', pager_selector,
        {
            //navbar options
            edit: true,
            editicon: 'ace-icon fa fa-pencil blue',
            add: true,
            addicon: 'ace-icon fa fa-plus-circle purple',
            del: true,
            delicon: 'ace-icon fa fa-trash-o red',
            search: true,
            searchicon: 'ace-icon fa fa-search orange',
            refresh: true,
            refreshicon: 'ace-icon fa fa-refresh green',
            view: true,
            viewicon: 'ace-icon fa fa-search-plus grey'
        },
        {
            //edit record form
            //closeAfterEdit: true,
            //width: 700,
            recreateForm: true,
            beforeShowForm : function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
                style_edit_form(form);
            }
        },
        {
            //new record form
            //width: 700,
            closeAfterAdd: true,
            recreateForm: true,
            viewPagerButtons: false,
            beforeShowForm : function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
                style_edit_form(form);
            }
        },
        {
            //delete record form
            recreateForm: true,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                if (form.data('styled')) {
                    return false;
                }

                form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
                style_delete_form(form);

                form.data('styled', true);
            },
            onClick: function (e) {
                //alert(1);
            }
        },
        {
            //search form
            recreateForm: true,
            afterShowSearch: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />');
                style_search_form(form);
            },
            afterRedraw: function () {
                style_search_filters($(this));
            },
            multipleSearch: true
            /**
            multipleGroup:true,
            showQuery: true
            */
        },
        {
            //view record form
            recreateForm: true,
            beforeShowForm: function (e) {
                var form = $(e[0]);
                form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />');
            }
        });

    function style_edit_form(form) {
        //enable datepicker on "sdate" field and switches for "stock" field
        form.find('input[name=sdate]').datepicker({format: 'yyyy-mm-dd', autoclose: true});

        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');
            //don't wrap inside a label element, the checkbox value won't be submitted (POST'ed)
            //.addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

        //update buttons classes
        var buttons = form.next().find('.EditButton .fm-button');

        //ui-icon, s-icon
        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();
        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>');

        buttons = form.next().find('.navButton a');
        buttons.find('.ui-icon').hide();
        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');
    }

    function style_delete_form(form) {
        var buttons = form.next().find('.EditButton .fm-button');
        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>');
    }

    function style_search_filters(form) {
        form.find('.delete-rule').val('X');
        form.find('.add-rule').addClass('btn btn-xs btn-primary');
        form.find('.add-group').addClass('btn btn-xs btn-success');
        form.find('.delete-group').addClass('btn btn-xs btn-danger');
    }

    function style_search_form(form) {
        var dialog = form.closest('.ui-jqdialog');
        var buttons = dialog.find('.EditTable');
        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
    }

    function beforeDeleteCallback(e) {
        var form = $(e[0]);
        if (form.data('styled')) {
            return false;
        }

        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
        style_delete_form(form);

        form.data('styled', true);
    }

    function beforeEditCallback(e) {
        var form = $(e[0]);
        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
        style_edit_form(form);
    }

    //it causes some flicker when reloading or navigating grid
    //it may be possible to have some custom formatter to do this as the grid is being created to prevent this
    //or go back to default browser checkbox styles for the grid
    function styleCheckbox(table) {
        /**
        $(table).find('input:checkbox').addClass('ace')
        .wrap('<label />')
        .after('<span class="lbl align-top" />')


        $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
        .find('input.cbox[type=checkbox]').addClass('ace')
        .wrap('<label />').after('<span class="lbl align-top" />');
        */
    }

    //unlike navButtons icons, action icons in rows seem to be hard-coded
    //you can change them like this in here if you want
    function updateActionIcons(table) {
        /**
        var replacement = 
        {
            'ui-ace-icon fa fa-pencil' : 'ace-icon fa fa-pencil blue',
            'ui-ace-icon fa fa-trash-o' : 'ace-icon fa fa-trash-o red',
            'ui-icon-disk' : 'ace-icon fa fa-check green',
            'ui-icon-cancel' : 'ace-icon fa fa-times red'
        };
        $(table).find('.ui-pg-div span.ui-icon').each(function(){
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
        })
        */
    }

    //replace icons with FontAwesome icons like above
    function updatePagerIcons(table) {
        var replacement = {
            'ui-icon-seek-first': 'ace-icon fa fa-angle-double-left bigger-140',
            'ui-icon-seek-prev': 'ace-icon fa fa-angle-left bigger-140',
            'ui-icon-seek-next': 'ace-icon fa fa-angle-right bigger-140',
            'ui-icon-seek-end': 'ace-icon fa fa-angle-double-right bigger-140'
        };

        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
            var icon = $(this);
            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

            //if ($class in replacement) {
            if (replacement.hasOwnProperty($class)) {
                icon.attr('class', 'ui-icon ' + replacement[$class]);
            }
        });
    }

    function enableTooltips(table) {
        $('.navtable .ui-pg-button').tooltip({container: 'body'});
        $(table).find('.ui-pg-div').tooltip({container: 'body'});
    }

    //var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');

    $(document).one('ajaxloadstart.page', function (e) {
        $.jgrid.gridDestroy(grid_selector);
        $('.ui-jqdialog').remove();
    });
};

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

/**
 * piechart.js
 * 2016-10-10
 */
var PieChart = function (placeholder) {
    this._init(placeholder);
};


/*
 * cssOpt = {'width':'90%', 'min-height': '150px'}
 */
PieChart.prototype._init = function (placeholder) {
    this.placeholder = placeholder;

    this.drawPieChart = function (placeholder, data, position) {
        $.plot(placeholder, data, {
            series: {
                pie: {
                    show: true,
                    tilt: 0.8,
                    highlight: {
                        opacity: 0.25
                    },
                    stroke: {
                        color: '#fff',
                        width: 2
                    },
                    startAngle: 2
                }
            },
            legend: {
                show: true,
                position: position || "ne",
                labelBoxBorderColor: null,
                margin: [-30, 15]
            },
            grid: {
                hoverable: true,
                clickable: true
            }
        });
    };
};


PieChart.prototype.draw = function (data) {
    this.drawPieChart(this.placeholder, data);

    /**
     we saved the drawing function and the data to redraw
     with different position later when switching to RTL mode dynamically
     so that's not needed actually.
    */
    this.placeholder.data('chart', data);
    this.placeholder.data('draw', this.drawPieChart);

    //pie chart tooltip example
    var $tooltip = $("<div class='tooltip top in'><div class='tooltip-inner'></div></div>").hide().appendTo('body');
    var previousPoint = null;

    this.placeholder.on('plothover', function (event, pos, item) {
        if (item) {
            if (previousPoint !== item.seriesIndex) {
                previousPoint = item.seriesIndex;
                var tip = item.series.label + " : " + item.series.percent + '%';
                $tooltip.show().children(0).text(tip);
            }
            $tooltip.css({top: pos.pageY + 10, left: pos.pageX + 10});
        } else {
            $tooltip.hide();
            previousPoint = null;
        }
    });

    $(document).one('ajaxloadstart.page', function (e) {
        $tooltip.remove();
    });
};


/**
 * popover.js
 * 2016-09-19
 */
var PopOver = function () {
    this._init();
};


PopOver.prototype._init = function () {
    this.item = {
        img: {
            src: '',
            alt: ''
        },
        display: '',
        caption: '',
        buttons: []
    };
};


PopOver.prototype.toJsonString = function () {
    return JSON.stringify(this.item);
};


PopOver.prototype.toHtmlString = function () {
    var html =
        '<div class="itemdiv memberdiv">' + '\n' +
        '    <div class="inline pos-rel">' + '\n' +
        '        <div class="user">' + '\n' +
        '            <a href="#">' + '\n' +
        '                <img src="assets/images/avatars/avatar4.png" alt="Bob Does" />' + '\n' +
        '            </a>' + '\n' +
        '        </div>' + '\n' +
        '        <div class="body">' + '\n' +
        '            <div class="name">' + '\n' +
        '                <a href="#">' + '\n' +
        '                    <span class="user-status status-online"></span>' + '\n' +
        '                    Bob Doe' + '\n' +
        '                </a>' + '\n' +
        '            </div>' + '\n' +
        '        </div>' + '\n' +
        '        <div class="popover">' + '\n' +
        '            <div class="arrow"></div>' + '\n' +
        '            <div class="popover-content">' + '\n' +
        '                <div class="bolder">Content Editor</div>' + '\n' +
        '                <div class="time">' + '\n' +
        '                    <i class="ace-icon fa fa-clock-o middle bigger-120 orange"></i>' + '\n' +
        '                    <span class="green"> 20 mins ago </span>' + '\n' +
        '                </div>' + '\n' +
        '                <div class="hr dotted hr-8"></div>' + '\n' +
        '                <div class="tools action-buttons">' + '\n' +
        '                    <a href="#">' + '\n' +
        '                        <i class="ace-icon fa fa-facebook-square blue bigger-150"></i>' + '\n' +
        '                    </a>' + '\n' +
        '                    <a href="#">' + '\n' +
        '                        <i class="ace-icon fa fa-twitter-square light-blue bigger-150"></i>' + '\n' +
        '                    </a>' + '\n' +
        '                    <a href="#">' + '\n' +
        '                        <i class="ace-icon fa fa-google-plus-square red bigger-150"></i>' + '\n' +
        '                    </a>' + '\n' +
        '                </div>' + '\n' +
        '            </div>' + '\n' +
        '        </div>' + '\n' +
        '    </div>' + '\n' +
        '</div>' + '\n';

    return html;
};

/**
 * imagelabel.js
 * 2016-09-18
 */
var ImageLabel = function (url, imgWidth, imgHeight, imgSrc, imgAlt) {
    if (Utils.isEmpty(imgAlt)) {
        this._init(url, imgWidth, imgHeight, imgSrc, "");
    } else {
        this._init(url, imgWidth, imgHeight, imgSrc, imgAlt);
    }
};


ImageLabel.prototype._init = function (url, imgWidth, imgHeight, imgSrc, imgAlt) {
    this.opt = {
        url: url,
        img: {
            width: imgWidth,
            height: imgHeight,
            src: imgSrc,
            alt: imgAlt
        },
        labels: []
    };
};


ImageLabel.prototype.addLabel = function (display, labelClass) {
    this.opt.labels.push({
        display: display,
        labelClass: "label label-" + labelClass
    });
};


ImageLabel.prototype.toJsonString = function () {
    return JSON.stringify(this.opt);
};


ImageLabel.prototype.toHtmlString = function () {
    var html =
        '<li>' + '\n' +
        '  <a href="javascript:void(0);" onClick="window.location.href=\'' + this.opt.url + '\'">' + '\n' +
        '    <img width="' + this.opt.img.width + '" height="' + this.opt.img.height +
        '" alt="' + this.opt.img.alt + '" src="' + this.opt.img.src + '" />' + '\n' +
        '  </a>' + '\n';

    html +=
        '  <div class="tags">' + '\n';

    this.opt.labels.forEach(function (el) {
        var span =
            '    <span class="label-holder">' + '\n' +
            '      <span class="' + el.labelClass + '">' + el.display + '</span>' + '\n' +
            '    </span>' + '\n';

        html += span;
    });

    html +=
        '  </div>' + '\n' +
        '</li>' + '\n';

    return html;
};

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
PepUI.prototype._version = "0.1.1pre";

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
