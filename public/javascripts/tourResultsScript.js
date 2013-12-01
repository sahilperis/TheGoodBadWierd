// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

function drawChart(question_number){
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Answer');
    data.addColumn('number', 'Amount');
    var chart_id;


    switch(question_number){
        case 1:
            data.addRows([
                ['Student', answer1],
                ['Parent', answer2]
            ]);

            // Set chart options
            var options = { 'title':'Parents vs Students',
                'width':400,
                'height':300};

            chart_id = 'chart1'
            break;
        case 2:
            data.addRows([
                ['UMass CS Website', answer1],
                ['University Tour', answer2],
                ['Friend', answer3]
            ]);

            // Set chart options
            var options = { 'title':'How did you find about the tour?',
                'width':400,
                'height':300};
            chart_id = 'chart2'
            break;
        case 3:
            data.addRows([
                ['Long', answer1],
                ['Appropriate Length', answer2],
                ['Short', answer3]
            ]);

            // Set chart options
            var options = { 'title':'How was the length of the tour?',
                'width':400,
                'height':300};
            chart_id = 'chart3'
            break;
        case 4:
            break;

    }

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById(chart_id));
    chart.draw(data, options);
}

//test values
var qNum;
var answer1;
var answer2;
var answer3;
var answer4;

function query(){
    var socket = io.connect();

    socket.on('stats', function (data) {
        console.log('Received Stats')

        qNum = data.QuestionNumber;
        answer1 = data.Answer1;
        answer2 = data.Answer2;
        answer3 = data.Answer3;
        answer4 = data.Answer4;
        console.log(answer1);
        console.log(answer2);
        console.log(answer3);
        console.log(answer4);

        drawChart(qNum);
    });
};

$(document).ready(function(){
    query();
});