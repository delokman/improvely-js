
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
