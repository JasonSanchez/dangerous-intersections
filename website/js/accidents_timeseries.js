var seriesOptions = []
var yearlyOptions = []
var monthlyOptions = []

/**
 * Create the chart when all data is loaded
 * @returns {undefined}
 */
function createChart() {

        Highcharts.stockChart('accident_timeseries', {

        title: {
            text: 'NYC accidents by Borough (Daily)'
        },

        subtitle: {
            text: 'Source: <a href="https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95">NYC OpenData</a>'
        },

        rangeSelector: {
            buttons: [{
                type: 'day',
                count: 1,
                text: '1d'
            }, {
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'year',
                count: 1,
                text: '1y'
            }, {
                type: 'all',
                text: 'All'
            }],
            selected: 4
        },

        yAxis: {
            plotLines: [{
                value: 0,
                width: 2,
                color: 'silver'
            }]
        },

        xAxis: {
            type: 'datetime',
            min: Date.UTC(2012, 6, 1),
            max: Date.UTC(2017, 1, 7),
        },

        plotOptions: {
            series: {
                showInNavigator: true
            }
        },

        tooltip: {
            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
            valueDecimals: 2,
            split: true
        },

        series: seriesOptions
    });
}


function createYearlyChart() {
    Highcharts.chart('yearly_chart', {

    title: {
        text: 'NYC accidents by Borough (Yearly)'
    },

    subtitle: {
        text: 'Source: <a href="https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95">NYC OpenData</a>'
    },

    yAxis: {
        title: {
            text: 'Number of Accidents'
        }
    },
    xAxis: {
        type: 'datetime'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            pointStart: Date.UTC(2013, 0, 1),
            pointIntervalUnit: 'year'
        }
    },

    series: yearlyOptions

});
}

function createMonthlyChart() {
    Highcharts.chart('monthly_chart', {

    title: {
        text: 'NYC accidents by Borough (Monthly)'
    },

    subtitle: {
        text: 'Source: <a href="https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95">NYC OpenData</a>'
    },

    yAxis: {
        title: {
            text: 'Number of Accidents'
        }
    },
    xAxis: {
        type: 'datetime'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            pointStart: Date.UTC(2012, 6, 1),
            pointIntervalUnit: 'month'
        }
    },

    series: monthlyOptions

});
}

$.get('./data/accident_timeseries_data.csv', function (data) {

    // Split the lines.
    var lines = data.split('\n');

    // Iterate over the lines and add categories or series.
    $.each(lines, function(lineNo, line) {
        var items = line.split(',');
        
        // Header line contains categories.
        if (lineNo == 0) {
            $.each(items, function(itemNo, item) {
                var series = {
                    name: item,
                    data: [],
                };
                if (itemNo > 0) seriesOptions.push(series);
            });
        }
        
        // The rest of the lines contain data with their name in the first 
        // position.
        else {
            $.each(items, function(itemNo, item) {
                var date;
                // First column is date.
                if (itemNo == 0) {
                    var dateParts = item.split("-");
                    accident_date = Date.UTC(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
                } else {
                    value = [accident_date, parseInt(item)];
                    seriesOptions[itemNo - 1].data.push(value);
                }
            });
        }
    });

    createChart();
});

$.get('./data/accident_timeseries_yearly_data.csv', function (data) {

    // Split the lines.
    var lines = data.split('\n');

    // Iterate over the lines and add categories or series.
    $.each(lines, function(lineNo, line) {
        var items = line.split(',');
        
        // Header line contains categories.
        if (lineNo == 0) {
            $.each(items, function(itemNo, item) {
                var series = {
                    name: item,
                    data: []
                };
                if (itemNo > 0) yearlyOptions.push(series);
            });
        }
        
        // The rest of the lines contain data with their name in the first 
        // position.
        else {
            $.each(items, function(itemNo, item) {
                var date;
                // First column is date.
                if (itemNo == 0) {
                    var dateParts = item.split("-");
                    accident_date = Date.UTC(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
                } else {
                    value = [parseInt(item)];
                    yearlyOptions[itemNo - 1].data.push(value);
                }
            });
        }
    });

    createYearlyChart();
});

$.get('./data/accident_timeseries_monthly_data.csv', function (data) {

    // Split the lines.
    var lines = data.split('\n');

    // Iterate over the lines and add categories or series.
    $.each(lines, function(lineNo, line) {
        var items = line.split(',');
        
        // Header line contains categories.
        if (lineNo == 0) {
            $.each(items, function(itemNo, item) {
                var series = {
                    name: item,
                    data: []
                };
                if (itemNo > 1) monthlyOptions.push(series);
            });
        }
        
        // The rest of the lines contain data with their name in the first 
        // position.
        else {
            $.each(items, function(itemNo, item) {
                var date;
                // First two columns are date.
                if (itemNo > 1) {
                    value = [parseInt(item)];
                    monthlyOptions[itemNo - 2].data.push(value);
                }
            });
        }
    });

    createMonthlyChart();
});
