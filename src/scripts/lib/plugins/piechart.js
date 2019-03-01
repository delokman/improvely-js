
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

