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
    showScale: false,

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
    showTooltips: false,

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

   

var flag=0;  
var hemoglobinX = [];
var hemoglobinY = [];
var glucoseX = [];
var glucoseY = [];
var nitriteX = [];
var nitriteY = [];
var pHX = [];
var pHY = [];
var proteinX = [];
var proteinY = [];
var selectedX = [];
var selectedY = [];

//temporary selction
selectedX = hemoglobinX;
selectedY = hemoglobinY;

function loadCharts(){
    var chartRef = myDataRef.child("tests");
        chartRef.on('child_added', function(snapshot) {
            var chartValues = snapshot.val();
            
            //hemoglobin
            hemoglobinX.push(chartValues.timeStamp);
            hemoglobinY.push(chartValues.hemoglobin);
            //glucose
            glucoseX.push(chartValues.timeStamp);
            glucoseY.push(chartValues.glucose);
            //ketone
            nitriteX.push(chartValues.timeStamp);
            nitriteY.push(chartValues.nitrite);
            //pH
            pHX.push(chartValues.timeStamp);
            pHY.push(chartValues.pH);
            //proteins
            proteinX.push(chartValues.timeStamp);
            proteinY.push(chartValues.protein);

        });  

}



  //protein chart data
      var proteinData = {//multiple cutoffs (trace 10-30, small +30-100, moderate ++100-300, high-moderate +++300-2000, large ++++2000+, mg/dl
          
          labels: proteinX,
          datasets: [
              {
                  label: "Proteins",
                    fillColor: "rgba(232, 233, 232, 0.8)",
                    strokeColor: "rgba(207, 209, 211, 1)",
                    pointColor: "rgba(255, 254, 255, 0.8)",
                    pointStrokeColor: "rgba(207, 209, 211, 1)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(207, 209, 211, 1)",
                  data: proteinY
              }
          ]
      }

  //nitrates chart data
      var nitriteData = {//positive or negative
          
          labels: nitriteX,
          datasets: [{
                
                  type:"bar",
                  label: "Nitrites",
                  fillColor: "rgba(232, 233, 232, 0.8)",
                    strokeColor: "rgba(207, 209, 211, 1)",
                  highlightFill: "#fff",
                  highlightStroke: "rgba(207, 209, 211, 1)",
                  data: nitriteY,

              }]
      }

  //hemoglobin Chart Data

      var hemoglobinData = {
            
          labels: hemoglobinX,
          datasets: [
              {
                  label: "Hemoglobin",
                    fillColor: "rgba(232, 233, 232, 0.8)",
                    strokeColor: "rgba(207, 209, 211, 1)",
                    pointColor: "rgba(255, 254, 255, 0.8)",
                    pointStrokeColor: "rgba(207, 209, 211, 1)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(207, 209, 211, 1)",
                  data: hemoglobinY
              }             
          ]
      }


  //Glucose Chart Data
      var glucoseData = {//mg/dl negative=<100, positive = >100, but still need to know concentration
          
          labels: glucoseX,
          datasets: [
              {
                  label: "Glucose",
                  fillColor: "rgba(232, 233, 232, 0.8)",
                    strokeColor: "rgba(207, 209, 211, 1)",
                  highlightFill: "#fff",
                  highlightStroke: "rgba(207, 209, 211, 1)",
                  data: glucoseY
              }              
          ]
      }

  //pH Chart Data
      var pHData = {//no units, range from 5-8.5
          
          labels: pHX,
          datasets: [
              {
                  label: "pH",
                    fillColor: "rgba(232, 233, 232, 0.8)",
                    strokeColor: "rgba(207, 209, 211, 1)",
                    pointColor: "rgba(255, 254, 255, 0.8)",
                    pointStrokeColor: "rgba(207, 209, 211, 1)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(207, 209, 211, 1)",
                  data: pHY
              }              
          ]
      }

  //Selected Chart Data
var selectedData = {

        labels: selectedX,
        datasets: [{
            label: "Selected",
                    fillColor: "rgba(255, 193, 123, 0.6)",
                    strokeColor: "rgba(255, 94, 40, 0.6)",
                    pointColor: "rgba(255, 254, 255, 0.8)",
                    pointStrokeColor: "rgba(207, 209, 211, 1)",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(207, 209, 211, 1)",
            data: selectedY
        }]
}
          

 
var mySelectedChart =[];
function createTables(){

    
        
      // Get the context of the canvas elements we want to select
      var Hctx = document.getElementById("hemoglobinChart").getContext("2d");
      var Gctx = document.getElementById("glucoseChart").getContext("2d");
      var Nctx = document.getElementById("nitriteChart").getContext("2d");
      var Pctx = document.getElementById("pHChart").getContext("2d");
      var Prctx = document.getElementById("proteinChart").getContext("2d");
      var Selctx = document.getElementById("selectedChart").getContext("2d");


      //generate chart
      var myHemoglobinChart = new Chart(Hctx).Line(hemoglobinData);
      var myGlucoseChart = new Chart(Gctx).Bar(glucoseData);
      var myNitriteChart = new Chart(Nctx).Bar(nitriteData);
      var mypHChart = new Chart(Pctx).Line(pHData);
      var myproteinChart = new Chart(Prctx).Line(proteinData); 

    //0 means line chart, 1 means bar chart
    if(flag==0){        
        mySelectedChart = new Chart(Selctx).Line(selectedData, {showScale:true, showTooltips: true});
    }
    else{
        mySelectedChart = new Chart(Selctx).Bar(selectedData, {
            showScale:true, 
            showTooltips: true, 
            barShowStroke: false,        
            responsive: true,
        });
            
                             
    }


};

   



     
    ////////END CHART STUFF////////  