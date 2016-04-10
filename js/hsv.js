var glucose_cVal = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
var ketone_cVal = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];

function glucose_equationH(x){
    //y = Ax^2 + Bx + c 
    //Fake y = 3x^2 + 2x + 1
    return (-0.4313 * (x * x)) + (11.813 * x) + 55.449;
}

function glucose_equationS(x){
    //y = Ax^2 + Bx + c 
    //Fake y = 4x^2 + 3x + 2
    return (0.3803 * (x * x)) - (5.9182 * x) + 42.864;
}

function glucose_equationV(x){
    //y = Ax^2 + Bx + c 
    //Fake y = 5x^2 + 4x + 3
    return (0.2773 * (x * x)) - (4.3803 * x) + 77.361;
}

//MATRIX EQUATION - eventually, make general equation for all concentrations with arrays for c values
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
    console.log("Answer: " + answer);
}

//calculate Re(0), Ge(0), Be(0)
//calculate Rd(0), Gd(0), Bd(0)
//sum d values to get Td
//store c and Td when new min Td is found