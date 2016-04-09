/////////CHART STUFF////////////     
var testx = "2/12/2016";
var testy = "7";


  //protein chart data
      var ProteinData = {
          
          labels: [testx, testx, testx, testx, "April", "May", "June", "July"],
          datasets: [
              {
                  label: "Proteins",
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
                  data: [0, 0, 5, 30, 60, 110, 0]
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
      var Prctx = document.getElementById("ProteinsChart").getContext("2d");
      var Kctx = document.getElementById("ketonesChart").getContext("2d");
      var Bctx = document.getElementById("billubrinChart").getContext("2d");
      var Gctx = document.getElementById("glucoseChart").getContext("2d");
      var Pctx = document.getElementById("pHChart").getContext("2d");
      
      //generate chart
      var myProteinsChart = new Chart(Prctx).Line(ProteinData);
      var myKetonesChart = new Chart(Kctx).Line(ketonesData);
      var mybillubrinChart = new Chart(Bctx).Bar(billubrinData);
      var myGlucoseChart = new Chart(Gctx).Line(glucoseData);
      var mypHChart = new Chart(Pctx).Line(pHData);
    }

      
    ////////END CHART STUFF////////  