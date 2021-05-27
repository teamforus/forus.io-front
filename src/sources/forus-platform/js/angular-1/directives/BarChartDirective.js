let BarChartDirective = function($scope, $filter, $element) {
    const timeFormat = 'MM/DD/YYYY';
    const barChart = { instance: null };

    const drawChart = (data) => {
        let labels = [];
        let values = [];

        moment.locale('nl');

        data.forEach(value => {
            labels.push(value.key);
            values.push({
                x: value.key,
                y: value[$scope.field || 'value'],
            });
        });

        if (barChart.instance != null) {
            barChart.instance.destroy();
        }

        const labelFormatter = ((typeof $scope.fieldFormat === 'function') ? $scope.fieldFormat : (val) => val);

        barChart.instance = new Chart($element, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    borderColor: '#2987fd',
                    backgroundColor: '#2987fd'
                }]
            },
            options: {
                fill: false,
                legend: {
                    display: false
                },
                time: {
                    parser: timeFormat
                },
                scales: {
                    xAxes: [{
                        time: {
                            unit: 'day',
                            round: 'day',
                            tooltipFormat: 'll',
                            displayFormats: {
                                quarter: 'll',
                            }
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            callback: labelFormatter,
                        }
                    }]
                },
            }
        });
    };

    drawChart([]);

    $scope.$watch('data', function(data) {
        drawChart(data ? data : []);
    });

    $scope.$watch('field', function() {
        drawChart($scope.data ? $scope.data : []);
    });
};

module.exports = () => {
    return {
        scope: {
            data: '=',
            field: '=',
            fieldFormat: '='
        },
        restrict: "EA",
        replace: true,
        controller: [
            '$scope',
            '$filter',
            '$element',
            BarChartDirective
        ],
        templateUrl: 'assets/tpl/directives/bar-chart.html'
    };
};