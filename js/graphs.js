var exe = false,
    myChart;

function startGraph() {
    if (!exe) {
        initGraph();
    } else {
        myChart.destroy();
        initGraph();
    }

    exe = true;
}

function initGraph() {
    var ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Chartlabel,
            datasets: [
                {
                    label: 'Average Smile',
                    data: graphdata,
                    backgroundColor: bckg,
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
        },
    });
}
