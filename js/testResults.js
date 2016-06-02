var str = location.search;
var res = str.slice(5);
var myDataRef = new Firebase('https://mums.firebaseio.com/' + res);

function setup_href() {window.location.href = 'testSetUp.html?key=' + res;  }

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
    return (month + "/" + currentDate + "/" + year);
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
    alert("Saved results from: " + timeStamp);
    
    var lastTestRef = myDataRef.child("lastTestRef");
    lastTestRef.set({timeRef: timeRef,
        timeStamp: timeStamp,
        protein: protein_hsv,
        pH: pH_hsv, 
        nitrite: nitrite_hsv,
        hemoglobin: hemoglobin_hsv,
        glucose: glucose_hsv
    }); 

    
    var testRef = myDataRef.child("tests");
    testRef.push({timeRef: timeRef,
        timeStamp: timeStamp,
        protein: protein_hsv,
        pH: pH_hsv, 
        nitrite: nitrite_hsv,
        hemoglobin: hemoglobin_hsv,
        glucose: glucose_hsv
    }); 
    
    
    //window.location.href = "profile_href()";
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
        context.font = "14px Arial";
        context.fillText(marker, x_pos-5, 80);
        context.strokeStyle="white";
        context.lineWidth=2;
        context.strokeRect(x_pos, y_pos, 25, 25);
        //var hsvText = rgb2hsv(avgRGB(p, 0), avgRGB(p, 1), avgRGB(p, 2));
        //console.log("bio marker: " + marker);
        var hsvText = rgb2hsv(marker, avgRGB(p, 0), avgRGB(p, 1), avgRGB(p, 2));
        //console.log(hsvText);
        return hsvText;
    }

    
/*
    // GROUP 1 glucose_hsv = calc_hsv("glucose", 548, 15); //10th square
    // GROUP 2 
    glucose_hsv = calc_hsv("glucose", 548, 23); //10th square
    // GROUP 3 glucose_hsv = calc_hsv("glucose", 551, 25); //10th square
    // GROUP 4 glucose_hsv = calc_hsv("glucose", 545, 30); //10th square
    // GROUP 5 glucose_hsv = calc_hsv("glucose", 543, 12); //10th square
    
    hemoglobin_hsv = calc_hsv("blood", 305, 14); //6th square
    
    //GROUP 1 pH_hsv = calc_hsv("pH", 247, 15); //5th square
    //GROUP 1a pH_hsv = calc_hsv("pH", 248, 30); //5th square
    //GROUP 2 pH_hsv = calc_hsv("pH", 252, 31); //5th square
    //GROUP 3 
    pH_hsv = calc_hsv("pH", 253, 20); //5th square
    //GROUP 4 pH_hsv = calc_hsv("pH", 258, 28); //5th square
    
    protein_hsv = calc_hsv("protein", 185, 15); //4th square 
    
    // GROUP 1 
    nitrite_hsv = calc_hsv("nitrite", 71, 28); //2nd square
    // GROUP 2 nitrite_hsv = calc_hsv("nitrite", 68, 30); //2nd square
    // GROUP 3 nitrite_hsv = calc_hsv("nitrite", 66, 25); //2nd square
    
*/
    
    var glucose_value = "hi", hemoglobin_value = "hi", protein_value = "hi";
    
    //Call calculate functions based on square position
    glucose_hsv = calc_hsv("glucose", 541, 15); //10th square
    if(glucose_hsv<100) 
        glucose_value = "Negative"; 
    else if(glucose_hsv>=100)
        glucose_value = "Positive";
    
    hemoglobin_hsv = calc_hsv("blood", 305, 17); //6th square
    if(hemoglobin_hsv<8) 
        hemoglobin_value = "Negative"; 
    else if(hemoglobin_hsv>=8 && hemoglobin_hsv<21)
        hemoglobin_value = "Trace";
    else if(hemoglobin_hsv>=21 && hemoglobin_hsv<43)
        hemoglobin_value = "+ (small)";
    else if(hemoglobin_hsv>=43 && hemoglobin_hsv<80)
        hemoglobin_value = "++ (moderate)";
    else if(hemoglobin_hsv>=80)
        hemoglobin_value = "+++ (large)";

    pH_hsv = calc_hsv("pH", 244, 19); //5th square
    
    protein_hsv = calc_hsv("protein", 185, 19); //4th square
    if(protein_hsv<10) 
        protein_value = "Negative"; 
    else if(protein_hsv>=10 && protein_hsv<30)
        protein_value = "Trace";
    else if(protein_hsv>=30 && protein_hsv<100)
        protein_value = "+";
    else if(protein_hsv>=100 && protein_hsv<300)
        protein_value = "++";
    else if(protein_hsv>=300 && protein_hsv<2000)
        protein_value = "+++";
    else if(protein_hsv>=2000)
        protein_value = "++++";
    
    nitrite_hsv = calc_hsv("nitrite", 64, 22); //2nd square

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
    switch(marker) {
    case "glucose":   
        var answer = findConcentration(computedH, computedS, computedV, glucose_equationH, glucose_equationS, glucose_equationV, glucose_cVal, 0.99147, 0.88974, 0.9491);
        break;
    case "blood":
        var answer = findConcentration(computedH, computedS, computedV, hemoglobin_equationH, hemoglobin_equationS, hemoglobin_equationV, hemoglobin_cVal, 0.97721, 0.92774, 0.9179);
        //var answer = "+ (small)";   
        break;
    case "nitrite":
        var answer = findNitrite(computedH, computedS, 0, nitrite_equationH, nitrite_equationS, nitrite_equationV, nitrite_cVal, 0.9694, 0.65124, 0.10324);
        //var answer = "Positive";     
        break;
    case "pH":
        var answer = findConcentration(computedH, computedS, computedV, pH_equationH, pH_equationS, pH_equationV, pH_cVal, 0.96833, 0.8534, 0.95787);
        //var answer = 6.5;             
        break;
    case "protein":
        var answer = findConcentration(computedH, computedS, computedV, protein_equationH, protein_equationS, protein_equationV, protein_cVal, 0.99333, 0.90673, 0.7856)*100;
        //var answer = 0; 
        break;   
    default:
        alert("marker not loaded");
    }
    //console.log(answer);
    return(answer);
}


    
    //Display the values in the table
    timeStamp = getTimestamp();
    $('#calc_or_reload').hide();
    $('#resultsTable_container').show();
    $( '#resultsTable' ).append('<table class="table table-striped"><tbody><tr><td>Nitrite</td><td></td><td><b>' + nitrite_hsv + '</b></td></tr><tr><td>Protein</td><td>' + protein_hsv + ' mg/dl</td><td><b>' + protein_value + '</b></td></tr><tr><td>pH</td><td>' + pH_hsv + '</td><td></td></tr><tr><td>Blood</td><td>' + hemoglobin_hsv + '</td><td><b>' + hemoglobin_value + '</b></td></tr><tr><td>Glucose</td><td>' + glucose_hsv + ' mg/dl</td><td><b>' + glucose_value + '</b></td></tr></tbody></table><br><button id="save_results" class="action" style="position:relative; left:28.5%; width:200px;" onclick="add()">SAVE TO DATABASE</button>');
}    
    

/************* VARIABLES AND EQUATIONS SETUP *************/

//arrays
var glucose_cVal = [];
var hemoglobin_cVal = [];
var nitrite_cVal = [];
var pH_cVal = [0.1];
var protein_cVal = [];

function r(x){return x*x;}

function start_arrays(){
    generate_array(glucose_cVal, 0, 2000, 1);
    generate_array(hemoglobin_cVal, 0, 180, 1);
    generate_array(nitrite_cVal, 0, 130, 1);
    generate_array(pH_cVal, 3.5, 9.4, 0.1);
    generate_array(protein_cVal, 0.0, 20.0, 0.01);
    
}

//Functions to generate arrays
function generate_array(array_name, start, end, inc){
    var k;
    for(k=start; k<end+inc; k+=inc){
        var num = Math.round(k * 100) / 100;
        array_name.push(num); 
    }
    var str = array_name.toString();
    console.log(str);
}

//GLUCOSE
//Hy = -2E-06x3 + 0.0021x2 - 0.8353x + 181.03
//R² = 0.99147
function glucose_equationH(x){ return ((-2E-06 * (x * x * x)) + (0.0021 * (x * x)) + (-0.8353 * x) + 181.03); }
//Sy = -2E-07x2 + 0.0006x + 0.2291
//R² = 0.88974
function glucose_equationS(x){ return ((-2E-07 * (x * x)) + (0.0006 * x) + 0.2291); }
//Vy = 4E-07x2 - 0.0007x + 0.9069
//R² = 0.9491
function glucose_equationV(x){ return ((4E-07 * (x * x)) + (-0.0007 * x) + 0.9069); }

//HEMOGLOBIN
//Hy = -0.0017x2 + 0.9384x + 44.537
//R² = 0.97721
function hemoglobin_equationH(x){ return ((-0.0017 * (x * x)) + (0.9384 * x) + 44.537); }
//Sy = 2E-05x2 - 0.0072x + 0.6881
//R² = 0.92774
function hemoglobin_equationS(x){ return ((2E-05 * (x * x)) + (-0.0072 * x) + 0.6881); }
//Vy = 3E-05x2 - 0.0079x + 0.8513
//R² = 0.9179
function hemoglobin_equationV(x){ return ((3E-05 * (x * x)) + (0.0079 * x) + 0.8513); }

//NITRITE
//Hy = 0.0249x2 - 1.6261x + 29.687
//R² = 0.9694
function nitrite_equationH(x){ return ((0.0249 * (x * x)) + (-1.6261 * x) + 29.687); }
//Sy = 0.0017x + 0.1757
//R² = 0.65124
function nitrite_equationS(x){ return ((0.0017 * x) + 0.1757) }
//Vy = 0.0017x + 0.8565
//R² = 0.10324
function nitrite_equationV(x){ return ((0.0017 * x) + 0.8565); }

//PH
//Hy = 9.0441x2 - 83.002x + 211.05
//R² = 0.96833
function pH_equationH(x){ return ((9.0441 * (x * x)) + (-83.002 * x) + 211.05); }
//Sy = -0.0265x2 + 0.2463x + 0.1548
//R² = 0.8534
function pH_equationS(x){ return ((-0.0265 * (x * x)) + (0.2463 * x) + 0.1548); }
//Vy = -0.0386x2 + 0.3436x + 0.1955
//R² = 0.95787
function pH_equationV(x){ return ((-0.0386 * (x * x)) + (0.3436 * x) + 0.1955); }

//PROTEIN
//Hy = -0.309x2 + 10.758x + 54.879
//R² = 0.99333
function protein_equationH(x){ return ((-0.309 * (x * x)) + (10.758 * x) + 54.879); }
//Sy = 0.0016x2 - 0.0423x + 0.4298
//R² = 0.90673
function protein_equationS(x){ return ((0.0016 * (x * x)) + (-0.0423 * x) + 0.4298); }
//Vy = 0.0012x2 - 0.0343x + 0.7971
//R² = 0.7856
function protein_equationV(x){ return ((0.0012 * (x * x)) + (-0.0343 * x) + 0.7971); }





/************* CONCERNTRATION ALGORITHM *************/

function findConcentration(Ha, Sa, Va, equationH, equationS, equationV, c_array, rH, rS, rV){
    //find expected values
    var min = 999999999999999999.0;
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
        
        //divide each of these by r^2
        var Td = Hd/(rH*rH) + Sd/(rS*rS) + Vd/(rV*rV);
        //var Td = Hd;
        console.log("C:" + c_array[i] + " / Td: " + Td);
        if(Td < min){
            min = Td;
            answer = c_array[i];
        }
    }
    return (answer);
}


function findNitrite(Ha, Sa, Va, equationH, equationS, equationV, c_array, rH, rS, rV){
    //report H and S - NEGATIVE IF: H=25-35 OR S:0-169
    var answer = "hi";
    var Hval = findConcentration(Ha, 0, 0, equationH, equationS, equationV, c_array, rH, rS, rV)
    if(Hval>25 && Hval<35) answer = "Negative";
    else answer = "Positive";
    
    return (answer);
}
