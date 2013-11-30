// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Gender');
    data.addColumn('number', 'People');
    data.addRows([
        ['Male', answer1],
        ['Female', answer2]
    ]);

    // Set chart options
    var options = { 'title':'Gender Ratio of Prospective Students',
        'width':400,
        'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}

//test values
var answer1;
var answer2;
var answer3;
var answer4;

function query(){
    var socket = io.connect();

    socket.on('stats', function (data) {
        console.log('Received Stats')

        answer1 = data.Answer1;
        answer2 = data.Answer2;
        answer3 = data.Answer3;
        answer4 = data.Answer4;
        console.log(answer1);
        console.log(answer2);
        console.log(answer3);
        console.log(answer4);

        drawChart();
    });
};

$(document).ready(function(){
    query();
});