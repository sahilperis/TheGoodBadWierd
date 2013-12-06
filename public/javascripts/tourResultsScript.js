// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

function drawChart(question_number, answers){
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Answer');
    data.addColumn('number', 'Amount');

    var chart_rows;
    var chart_title;
    var chart_id;

    //Try to find out a way to get information using WebSockets so values don't have to be hardcoded
    switch(question_number){
        case 1:
            chart_rows = ['Male', 'Female'];
            chart_title = 'Gender Distribution of Prospective Students';
            chart_id = 'chart1';
            break;
        case 2:
            chart_rows = ['18','19','20','21+'];
            chart_title = 'Age of Prospective Students';
            chart_id = 'chart2';
            break;
        case 3:
            chart_rows = ['UMass CS Website','University Tour','Friend','Other'];
            chart_title = 'How students found out about the tour';
            chart_id = 'chart3';
            break;
        case 4:
            chart_rows = ['Long','Just right','Short']
            chart_title = 'Student perception of the length of the tour';
            chart_id = 'chart4';
            break;
        case 5:
            chart_rows = ['Yes','No','Undecided'];
            chart_title = 'Likelyhood of students attending the university in future';
            chart_id = 'chart5';
            break;
    }

    // Add data to the chart
    function get_pairs(){
        var pairs = new Array();
        for(var i = 0; i < chart_rows.length; i++){
            pairs.push([chart_rows[i], answers[i]]);
        }
        return pairs;
    }
    data.addRows(get_pairs());

    // Set chart options
    var options = { 'title':chart_title,
        'width':400,
        'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById(chart_id));
    chart.draw(data, options);
}

function query(){

    var socket = io.connect();

    socket.on('stats', function (data) {
        console.log('Received Stats')

        var question_number = data.QuestionNumber;
        var answers = [data.Answer1, data.Answer2, data.Answer3, data.Answer4];
        console.log(answers[0]);
        console.log(answers[1]);
        console.log(answers[2]);
        console.log(answers[3]);

        drawChart(question_number, answers);
    });
};

$(document).ready(function(){
    query();
});