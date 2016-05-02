////CHARTS
     

Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: true,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function(){},

    // Function - Will fire on animation completion.
    onAnimationComplete: function(){}
}


var billubrinX = [];
var billubrinY = [6,7,8,9,8,6];
var glucoseX = [];
var glucoseY = [];
var ketoneX = [];
var ketoneY = [];
var pHX = [];
var pHY = [];
var proteinX = [];
var proteinY = [];

function loadCharts(){
    var chartRef = myDataRef.child("tests");
        chartRef.on('child_added', function(snapshot) {
            var chartValues = snapshot.val();
            //billubrin
            billubrinX.push(chartValues.timeStamp);
            billubrinY.push(chartValues.billubrin);
            //glucose
            glucoseX.push(chartValues.timeStamp);
            glucoseY.push(chartValues.glucose);
            //ketone
            ketoneX.push(chartValues.timeStamp);
            ketoneY.push(chartValues.ketone);
            //pH
            pHX.push(chartValues.timeStamp);
            pHY.push(chartValues.pH);
            //proteins
            proteinX.push(chartValues.timeStamp);
            proteinY.push(chartValues.protein);

            //console.log("before:"+billubrinX);
        });
            //mybillubrinChart.update();
            //console.log("after:" + billubrinX);
        
}
//in progress
function changeDate(longDate){

    //arr[0]=month/day/year, arr[1] = hour:min:sec
    var arr = longDate.split(" ");

    //date[0]=month, date[1]=day date[2]=year
    var date = arr[0].split("/");
    var monthKey = ["null", "January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
    var month = monthKey[date[0]];
    var year = date[2];

    //time[0]=hour, time[1]=min, time[2]=sec
    var time = arr[1].split(":");
    
    /*
    console.log(arr[0]);
    console.log(arr[1]);
    console.log(date[0]);
    console.log(date[1]);
    console.log(date[2]);
    console.log("hour:"+time[0]);
    console.log("min:"+time[1]);
    console.log("sec:"+time[2]);
    console.log(month+" "+year);
    */

    return(month+" "+year);
}




var testx = "2/12/2016";
var testy = "7";


  //protein chart data
      var ProteinData = {
          
          labels: proteinX,
          datasets: [
              {
                  label: "Proteins",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: proteinY
              }              
          ]
      }

  //ketones chart data
      var ketonesData = {
          
          labels: ketoneX,
          datasets: [
              {
                  label: "Ketones",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: ketoneY
              }              
          ]
      }

  //billubrin Chart Data

var billubrinData = {
            
          labels: billubrinX,
          datasets: [
              {
                  label: "Billubrin",
                  fillColor: "rgba(220,220,220,0.5)",
                  strokeColor: "rgba(220,220,220,0.8)",
                  highlightFill: "rgba(220,220,220,0.75)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data: billubrinY
              }             
          ]
      }


  //Glucose Chart Data
      var glucoseData = {
          
          labels: glucoseX,
          datasets: [
              {
                  label: "Glucose",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: glucoseY
              }              
          ]
      }

  //pH Chart Data
      var pHData = {
          
          labels: pHX,
          datasets: [
              {
                  label: "pH",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: pHY
              }              
          ]
      }


function createTables(){

      // Get the context of the canvas elements we want to select
      var Bctx = document.getElementById("billubrinChart").getContext("2d");
      var Gctx = document.getElementById("glucoseChart").getContext("2d");
      var Kctx = document.getElementById("ketonesChart").getContext("2d");
      var Pctx = document.getElementById("pHChart").getContext("2d");
      var Prctx = document.getElementById("ProteinsChart").getContext("2d");

      //generate chart
      var mybillubrinChart = new Chart(Bctx).Bar(billubrinData);
      var myGlucoseChart = new Chart(Gctx).Line(glucoseData);
      var myKetonesChart = new Chart(Kctx).Line(ketonesData);
      var mypHChart = new Chart(Pctx).Line(pHData);
      var myProteinsChart = new Chart(Prctx).Line(ProteinData);

    };

     
    ////////END CHART STUFF////////  