var str = location.search;
var res = str.slice(5);
var myDataRef = new Firebase('https://mums.firebaseio.com/' + res);

function setup_href() {window.location.href = 'testSetup.html?key=' + res;  }

function profile_href() { window.location.href = 'Profile.html?key=' + res;  }

function load_title(){
        myDataRef.on('value', function(snapshot) {
            var message = snapshot.val();
            var name = message.patient_fname + " " + message.patient_lname;
            $('#title2').text("");
            $('#title2').append(name.toUpperCase());
        });
}

function getTimestamp(){
    var date = new Date();
    currentDate = date.getDate();  
    month = date.getMonth() + 1; 
    year = date.getFullYear();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    return (month + "/" + currentDate + "/" + year + "  " + hour + ":" + min + ":" + sec);
}
        
function makeTimeRef(){
    var date = new Date();
    currentDate = 100 - date.getDate();  
    month = 100 - date.getMonth() + 1; 
    year = 100 - date.getFullYear();
    hour = 100 - date.getHours();
    min = 100 - date.getMinutes();
    sec = 100 - date.getSeconds();
    return (month + "/" + currentDate + "/" + year + "  " + hour + ":" + min + ":" + sec);
}
        
var timeStamp = getTimestamp();
var timeRef = makeTimeRef();
var glucose_hsv, hemoglobin_hsv, nitrite_hsv, pH_hsv, protein_hsv;
        
        
function add(){            
    var testRef = myDataRef.child("tests");
    testRef.push({timeRef: timeRef,
        timeStamp: timeStamp,
        protein: protein_hsv,
        pH: pH_hsv, 
        nitrite: nitrite_hsv,
        hemoglobin: hemoglobin_hsv,
        glucose: glucose_hsv
    }); 
    alert("Saved results from: " + timeStamp);
    myDataRef.child("lastTestRef").set({timeRef: timeRef,
        timeStamp: timeStamp,
        protein: protein_hsv,
        pH: pH_hsv, 
        nitrite: nitrite_hsv,
        hemoglobin: hemoglobin_hsv,
        glucose: glucose_hsv
    });  
}
        
        
/************* RGB AVERAGING + CONVERSION TO HSV *************/

//Calculate average RGB
function calcResult(){
    var example = document.getElementById('example');
    var context = example.getContext('2d');
    function avgRGB(p, x) {
        sum = 0, count = 0;
        for(var i=x; i<p.length; i+=4){
            sum += p[i];
            count ++;
    }
    return (Math.round(sum/count));
    }      

    function calc_hsv(marker, x_pos, y_pos) {
        var p = context.getImageData(x_pos, y_pos, 25, 25).data;
        //var rgbText = "rgb(" + avgRGB(p, 0) + ", " + avgRGB(p, 1) + ", " + avgRGB(p, 2) + ")";
        context.font = "12px Arial";
        context.fillText(marker, x_pos, 80);
        context.strokeStyle="gray";
        context.strokeRect(x_pos, y_pos, 25, 25);
        //var hsvText = rgb2hsv(avgRGB(p, 0), avgRGB(p, 1), avgRGB(p, 2));
        console.log("bio marker: " + marker);
        var hsvText = rgb2hsv(marker, avgRGB(p, 0), avgRGB(p, 1), avgRGB(p, 2));
        console.log(hsvText);
        return hsvText;
    }
    
    //Call calculate functions based on square position
    glucose_hsv = calc_hsv("glucose", 548, 15); //10th square   
    hemoglobin_hsv = calc_hsv("hemoglobin", 305, 14); //6th square
    pH_hsv = calc_hsv("pH", 253, 20); //5th square
    protein_hsv = calc_hsv("protein", 185, 15); //4th square 
    nitrite_hsv = calc_hsv("nitrite", 71, 28); //2nd square
 
    //Display the values in the table
    timeStamp = getTimestamp();
    $('#calc_or_reload').hide();
    $( '#resultsTable' ).append('<b>RESULTS</b><table class="table table-striped"><tbody><tr><td>Nitrite</td><td>' + nitrite_hsv + '</td></tr><tr><td>Protein</td><td>' + protein_hsv + '</td></tr><tr><td>pH</td><td>' + pH_hsv + '</td></tr><tr><td>Blood</td><td>' + hemoglobin_hsv + '</td></tr><tr><td>Glucose</td><td>' + glucose_hsv + '</td></tr></tbody></table><button id="save_results" class="action" style="position:relative; left:20%; width:200px;" onclick="add()">SAVE TO DATABASE</button>');
}

//Convert RGB to HSV
function rgb2hsv (marker, r, g, b) {

    //remove spaces from input RGB values, convert to int
    var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
    var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
    var b = parseInt( (''+b).replace(/\s/g,''),10 ); 

    if ( r==null || g==null || b==null ||
        isNaN(r) || isNaN(g)|| isNaN(b) ) {
            alert ('Not RGB values');
            return;
        }  
    if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
        alert ('RGB values must be in the range 0 to 255.');
        return;
    }
    r=r/255; g=g/255; b=b/255;
    var minRGB = Math.min(r,Math.min(g,b));
    var maxRGB = Math.max(r,Math.max(g,b));
    // Black-gray-white
    if (minRGB==maxRGB) {
        computedV = minRGB;
        return [0,0,computedV];
    }
    // Colors other than black-gray-white:
    var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
    var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
    computedH = 60*(h - d/(maxRGB - minRGB));
    computedS = (maxRGB - minRGB)/maxRGB;
    computedV = maxRGB;
    computedH = Number(Math.round(computedH+'e6')+'e-6');
    computedS = Number(Math.round(computedS+'e6')+'e-6');
    computedV = Number(Math.round(computedV+'e6')+'e-6');

    //equations
    answer = "lol u lose";
    switch(marker) {
    case "glucose":   
        var answer = findConcentration(computedH, computedS, computedV, glucose_equationH, glucose_equationS, glucose_equationV, glucose_cVal) + " g/L";
        break;
    case "hemoglobin":
        var answer = findConcentration(computedH, computedS, computedV, hemoglobin_equationH, hemoglobin_equationS, hemoglobin_equationV, hemoglobin_cVal) + " [UNIT]";
        break;
    case "nitrite":
        var answer = findConcentration_Nitrite(computedH, computedS, computedV, nitrite_equationH, nitrite_equationS, nitrite_equationV, nitrite_cVal);
        break;
    case "pH":
        var answer = findConcentration(computedH, computedS, computedV, pH_equationH, pH_equationS, pH_equationV, pH_cVal) + " [UNIT]";
        break;
    case "protein":
        var answer = findConcentration(computedH, computedS, computedV, protein_equationH, protein_equationS, protein_equationV, protein_cVal) + " g/L";
        break;   
    default:
        alert("marker not loaded");
    }

    console.log(answer);
    return(answer);
}



/************* VARIABLES AND EQUATIONS SETUP *************/

//GLUCOSE
var glucose_cVal = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
//Hy = -2E-06x3 + 0.0021x2 - 0.8353x + 181.03
//R² = 0.99147
function glucose_equationH(x){ return ((-2E-06 * (x * x * x)) + (0.0021 * (x * x)) + (-0.8353 * x) + 181.03)*(0.99147*0.99147*0.99147*0.99147); }
//Sy = -2E-07x2 + 0.0006x + 0.2291
//R² = 0.88974
function glucose_equationS(x){ return (-2E-07 * (x * x)) + (0.0006 * x) + 0.2291; }
//Vy = 4E-07x2 - 0.0007x + 0.9069
//R² = 0.9491
function glucose_equationV(x){ return (4E-07 * (x * x)) + (-0.0007 * x) + 0.9069; }

//HEMOGLOBIN
var hemoglobin_cVal = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
//Hy = -0.0017x2 + 0.9384x + 44.537
//R² = 0.97721
function hemoglobin_equationH(x){ return (-0.0017 * (x * x)) + (0.9384 * x) + 44.537; }
//Sy = 2E-05x2 - 0.0072x + 0.6881
//R² = 0.92774
function hemoglobin_equationS(x){ return (2E-05 * (x * x)) + (-0.0072 * x) + 0.6881; }
//Vy = 3E-05x2 - 0.0079x + 0.8513
//R² = 0.9179
function hemoglobin_equationV(x){ return (3E-05 * (x * x)) + (0.0079 * x) + 0.8513; }

//NITRITE
var nitrite_cVal = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
//Hy = 0.0249x2 - 1.6261x + 29.687
//R² = 0.9694
function nitrite_equationH(x){ return (0.0249 * (x * x)) + (-1.6261 * x) + 29.687; }
//no trendline
function nitrite_equationS(x){ return 0; }
//no trendline
function nitrite_equationV(x){ return 0; }

//PH
var pH_cVal = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
//Hy = 9.0441x2 - 83.002x + 211.05
//R² = 0.96833
function pH_equationH(x){ return (9.0441 * (x * x)) + (83.002 * x) + 211.05; }
//Sy = -0.0265x2 + 0.2463x + 0.1548
//R² = 0.8534
function pH_equationS(x){ return (-0.0265 * (x * x)) + (0.2463 * x) + 0.1548; }
//Vy = -0.0386x2 + 0.3436x + 0.1955
//R² = 0.95787
function pH_equationV(x){ return (-0.0386 * (x * x)) + (0.3436 * x) + 0.1955; }

//PROTEIN
var protein_cVal = [1, 2, 3, 4, 4.5, 5, 5.5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
//Hy = -0.309x2 + 10.758x + 54.879
//R² = 0.99333
function protein_equationH(x){ return (-0.309 * (x * x)) + (10.758 * x) + 54.879; }
//Sy = 0.0016x2 - 0.0423x + 0.4298
//R² = 0.90673
function protein_equationS(x){ return (0.0016 * (x * x)) + (-0.0423 * x) + 0.4298; }
//Vy = 0.0012x2 - 0.0343x + 0.7971
//R² = 0.7856
function protein_equationV(x){ return (0.0012 * (x * x)) + (-0.0343 * x) + 0.7971; }





/************* CONCERNTRATION ALGORITHM *************/

function findConcentration(Ha, Sa, Va, equationH, equationS, equationV, c_array){
    //find expected values
    var min = 10000000000.0;
    var answer;
    for(var i=0; i<c_array.length; i++){
        //calc expected
        var He = equationH(c_array[i]);
        var Se = equationS(c_array[i]);
        var Ve = equationV(c_array[i]);
        
        //calc distances
        var Hd = (He - Ha) * (He - Ha);
        var Sd = (Se - Sa) * (Se - Sa);
        var Vd = (Ve - Va) * (Ve - Va);
        
        var Td = Hd + Sd + Vd;
        var Td = Hd;
        console.log("C:" + c_array[i] + " / Td: " + Td);
        if(Td < min){
            min = Td;
            answer = c_array[i];
        }
    }
    return (answer);
}

function findConcentration_Nitrite(Ha, Sa, Va, equationH, equationS, equationV, c_array){
    //35>H>25 OR S<170 = NEGATIVE
    var Hd_min = 10000000000.0;
    var Hd_min = 10000000000.0;
    
    var answer;
    for(var i=0; i<c_array.length; i++){
        //calc expected
        var He = equationH(c_array[i]);
        var Se = equationS(c_array[i]);
        var Ve = equationV(c_array[i]);
        
        //calc distances
        var Hd = (He - Ha) * (He - Ha);
        var Sd = (Se - Sa) * (Se - Sa);
        var Vd = (Ve - Va) * (Ve - Va);
        
        var Td = Hd + Sd + Vd;
        var Td = Hd;
        console.log("C:" + c_array[i] + " / Td: " + Td);
        if(Td < min){
            min = Td;
            answer = c_array[i];
        }
    }
    return (answer);
}
