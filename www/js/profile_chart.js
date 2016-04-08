        /////////CHART STUFF////////////     
var testx = "2/12/2016";
  var testy = "7";

  //ketones chart data
      var ketonesData = {
          
          labels: [testx, testx, testx, "April", "May", "June", "July"],
          datasets: [
              {
                  label: "Ketones",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [6, 6.5, 7, 7.5, , testy, 8]
              }              
          ]
      }

  //Nitrites Chart Data
      var nitritesData = {       
          labels: [testx, testx, testx, "April", "May", "June", "July"],
          datasets: [
              {
                  label: "Nitrites",
                  fillColor: "rgba(220,220,220,0.5)",
                  strokeColor: "rgba(220,220,220,0.8)",
                  highlightFill: "rgba(220,220,220,0.75)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data: [0, 0, 128, 0, 0, 0, 32]
              }             
          ]
      }



  //Glucose Chart Data
      var glucoseData = {
          
          labels: [testx, testx, testx, "April", "May", "June", "July"],
          datasets: [
              {
                  label: "Glucose",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [0, 0, 5, 30, 60, 110, 0]
              }              
          ]
      }

  //pH Chart Data
      var pHData = {
          
          labels: [testx, testx, testx, "April", "May", "June", "July"],
          datasets: [
              {
                  label: "pH",
                  fillColor: "rgba(151,187,205,0.2)",
                  strokeColor: "rgba(151,187,205,1)",
                  pointColor: "rgba(151,187,205,1)",
                  pointStrokeColor: "#fff",
                  pointHighlightFill: "#fff",
                  pointHighlightStroke: "rgba(151,187,205,1)",
                  data: [5, 6.5, 7, 7.5, , testy, 8.5]
              }              
          ]
      }

      
      
      // Get the context of the canvas elements we want to select
      var Kctx = document.getElementById("ketonesChart").getContext("2d");
      var Nctx = document.getElementById("nitritesChart").getContext("2d");
      var Gctx = document.getElementById("glucoseChart").getContext("2d");
      var Pctx = document.getElementById("pHChart").getContext("2d");
      
      //generate chart
      var myKetonesChart = new Chart(Kctx).Line(ketonesData);
      var myNitritesChart = new Chart(Nctx).Bar(nitritesData);
      var myGlucoseChart = new Chart(Gctx).Line(glucoseData);
      var mypHChart = new Chart(Pctx).Line(pHData);
      
    ////////END CHART STUFF////////  