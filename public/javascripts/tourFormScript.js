//test values
var s;
var p;

function query(){
  var socket = io.connect();
  console.log("trying to connect");
  socket.on('connect', function () {
    console.log("Connected on Client");

    socket.on('data', function (data) {
      console.log(data);
      s = data.random;
      p = data.random2;
      console.log(s);
      console.log(p);
    });
  });
}

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});
// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

function drawChart() {
  // Create the data table.

  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Gender');
  data.addColumn('number', 'People');
  data.addRows([
    ['Student', s],
    ['Parent', p]
  ]);

  // Set chart options
  var options = { 'title':'Gender Ratio of Prospective Students',
                  'width':400,
                  'height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

$(document).ready(function(){
  query();
});