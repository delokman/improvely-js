
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
