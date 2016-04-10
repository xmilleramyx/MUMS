
var str = location.search;
var res = str.slice(5);
var myDataRef = new Firebase('https://mums.firebaseio.com/' + res);
        
function profile_href() { window.location.href = 'Profile.html?key=' + res;  }
        
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
var glucose_hsv, billrubin_hsv, ketone_hsv, pH_hsv, protein_hsv;
        
        
function add(){            
    var testRef = myDataRef.child("tests");
    testRef.push({timeRef: timeRef,
        timeStamp: timeStamp,
        protein: protein_hsv,
        pH: pH_hsv, 
        ketone: ketone_hsv,
        billrubin: billrubin_hsv,
        glucose: glucose_hsv
    }); 
    alert("Saved results from: " + timeStamp);
    myDataRef.child("lastTestRef").set({timeRef: timeRef,
        timeStamp: timeStamp,
        protein: protein_hsv,
        pH: pH_hsv, 
        ketone: ketone_hsv,
        billrubin: billrubin_hsv,
        glucose: glucose_hsv
    });  
}
        
        
/************* RGB AVERAGING + CONVERSION TO HSV *************/

//Load cropped strip image
function init() {        
    var example = document.getElementById('example');
    var context = example.getContext('2d');            
    base_image = new Image();
    base_image.src = 'img/test.png';
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }
}
            
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

    function calc_hsv(marker, x_pos) {
        var p = context.getImageData(x_pos, 7, 35, 34).data;
        //var rgbText = "rgb(" + avgRGB(p, 0) + ", " + avgRGB(p, 1) + ", " + avgRGB(p, 2) + ")";
        context.font = "12px Arial";
        context.fillText(marker, x_pos, 55);
        context.strokeStyle="gray";
        context.strokeRect(x_pos, 7, 35, 34);
        //var hsvText = rgb2hsv(avgRGB(p, 0), avgRGB(p, 1), avgRGB(p, 2));
        console.log("bio marker: " + marker);
        var hsvText = rgb2hsv(marker, avgRGB(p, 0), avgRGB(p, 1), avgRGB(p, 2));
        console.log(hsvText);
        return hsvText;
    }
    
    //Call calculate functions based on square position
    glucose_hsv = calc_hsv("glucose", 10); //glucose = 1st square
    billrubin_hsv = calc_hsv("billrubin", 68); //glucose = 2nd square
    ketone_hsv = calc_hsv("ketone", 140); //ketone = 3rd square
    pH_hsv = calc_hsv("pH", 328); //nitrite = 6th square
    protein_hsv = calc_hsv("protein", 393); //pH = 9th square 
 
    //Display the values in the table
    timeStamp = getTimestamp();
    $("#glucose_result").text("");
    $("#glucose_result").append(glucose_hsv);
    //$("#glucose_result").css("background-color", glucose_hsv);
    $("#billrubin_result").text("");
    $("#billrubin_result").append(billrubin_hsv);
    //$("#ketone_result").css("background-color", ketone_hsv);
    $("#ketone_result").text("");
    $("#ketone_result").append(ketone_hsv);
    //$("#ketone_result").css("background-color", ketone_hsv);
    $("#pH_result").text("");
    $("#pH_result").append(pH_hsv);
    //$("#pH_result").css("background-color", pH_hsv);
    $("#protein_result").text("");
    $("#protein_result").append(protein_hsv);
    //$("#ketone_result").css("background-color", ketone_hsv);
}

//load all HTML before javascript
document.addEventListener("DOMContentLoaded", init, false);
        
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
    
    answer = "lol u lose";
    switch(marker) {
    case "glucose":
        var answer = findConcentration(computedH, computedS, computedV, glucose_equationH, glucose_equationS, glucose_equationV, glucose_cVal);
        break;
    case "billrubin":
        var answer = findConcentration(computedH, computedS, computedV, billrubin_equationH, billrubin_equationS, billrubin_equationV, billrubin_cVal);
        break;
    case "ketone":
        var answer = findConcentration(computedH, computedS, computedV, ketone_equationH, ketone_equationS, ketone_equationV, ketone_cVal);
        break;
    case "pH":
        var answer = findConcentration(computedH, computedS, computedV, pH_equationH, pH_equationS, pH_equationV, pH_cVal);
        break;
    case "protein":
        var answer = findConcentration(computedH, computedS, computedV, protein_equationH, protein_equationS, protein_equationV, protein_cVal);
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
function glucose_equationH(x){ return (-0.4313 * (x * x)) + (11.813 * x) + 55.449; }
function glucose_equationS(x){ return (0.3803 * (x * x)) + (-5.9182 * x) + 42.864; }
function glucose_equationV(x){ return (0.2773 * (x * x)) + (-4.3803 * x) + 77.361; }

//BILLRUBIN
var billrubin_cVal = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
function billrubin_equationH(x){ return (1 * (x * x)) + (2 * x) + 3; }
function billrubin_equationS(x){ return (1 * (x * x)) + (2 * x) + 3; }
function billrubin_equationV(x){ return (1 * (x * x)) + (2 * x) + 3; }

//KETONE
var ketone_cVal = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
function ketone_equationH(x){ return (1 * (x * x)) + (2 * x) + 3; }
function ketone_equationS(x){ return (1 * (x * x)) + (2 * x) + 3; }
function ketone_equationV(x){ return (1 * (x * x)) + (2 * x) + 3; }

//PH
var pH_cVal = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
function pH_equationH(x){ return (1 * (x * x)) + (2 * x) + 3; }
function pH_equationS(x){ return (1 * (x * x)) + (2 * x) + 3; }
function pH_equationV(x){ return (1 * (x * x)) + (2 * x) + 3; }

//PROTEIN
var protein_cVal = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 2.0, 3.0, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 20, 25, 30, 31, 32];
function protein_equationH(x){ return (-0.4313 * (x * x)) + (11.813 * x) + 55.449; }
function protein_equationS(x){ return (0.3803 * (x * x)) + (-5.9182 * x) + 42.864; }
function protein_equationV(x){ return (0.2773 * (x * x)) + (-4.3803 * x) + 77.361; }





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
        var Sd = (He - Ha) * (He - Ha);
        var Vd = (He - Ha) * (He - Ha);
        
        var Td = Hd + Sd + Vd;
        console.log("C:" + c_array[i] + " / Td: " + Td);
        if(Td < min){
            min = Td;
            answer = c_array[i];
        }
    }
    return (answer);
}
