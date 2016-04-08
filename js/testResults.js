
        var str = location.search;
        var res = str.slice(5);
        var myDataRef = new Firebase('https://mums.firebaseio.com/' + res);
        
        function profile_href() {
            window.location.href = 'Profile.html?key=' + res;  
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
        var glucose_hsv, ketone_hsv, nitrite_hsv, pH_hsv;
        
        
        function add(){            
            var testRef = myDataRef.child("tests");
            testRef.push({timeRef: timeRef,
                    timeStamp: timeStamp,
                    pH: pH_hsv, 
                    nitrite: nitrite_hsv,
                    ketone: ketone_hsv,
                    glucose: glucose_hsv
            });  
            alert("Saved results from: " + timeStamp);
            myDataRef.child("lastTestRef").set({timeRef: timeRef,
                    timeStamp: timeStamp,
                    pH: pH_hsv, 
                    nitrite: nitrite_hsv,
                    ketone: ketone_hsv,
                    glucose: glucose_hsv
            });  
        }
        
        
        ///////////////////FAKE STRIP GENERATOR
        function init() {        

            var example = document.getElementById('example');
            var context = example.getContext('2d');            

            base_image = new Image();
            base_image.src = 'img/test.png';
            base_image.onload = function(){
            context.drawImage(base_image, 0, 0);
            }
        }
            
        function calcResult(){
            var example = document.getElementById('example');
            var context = example.getContext('2d');
    
            //rgb functions
            function avgRGB(p, x) {
                sum = 0, count = 0;
                for(var i=x; i<p.length; i+=4){
                    sum += p[i];
                    count ++;
                }
                return (Math.round(sum/count));
            }
 
            
            function calc_hsv(x_pos, marker) {
                var p = context.getImageData(x_pos, 2, 40, 39).data;
                //var rgbText = "rgb(" + avgRGB(p, 0) + ", " + avgRGB(p, 1) + ", " + avgRGB(p, 2) + ")";
                context.font = "12px Arial";
                context.fillText(marker, x_pos, 55);
                context.strokeStyle="gray";
                context.strokeRect(x_pos, 2, 40, 39);
                var hsvText = rgb2hsv(avgRGB(p, 0), avgRGB(p, 1), avgRGB(p, 2));
                return hsvText;
            }
 
            //calc functions based on square position
            glucose_hsv = calc_hsv(5, "Glucose"); //glucose = 1st square
            ketone_hsv = calc_hsv(135, "Ketone"); //ketone = 3rd square
            nitrite_hsv = calc_hsv(328, "Nitrite"); //nitrite = 6th square
            pH_hsv = calc_hsv(524, "pH"); //pH = 9th square 
 
            //display the values
            timeStamp = getTimestamp();
 
            $("#glucose_result").text("");
            $("#glucose_result").append(glucose_hsv);
            //$("#glucose_result").css("background-color", glucose_hsv);
            $("#ketone_result").text("");
            $("#ketone_result").append(ketone_hsv);
            //$("#ketone_result").css("background-color", ketone_hsv);
            $("#nitrite_result").text("");
            $("#nitrite_result").append(nitrite_hsv);
            //$("#nitrite_result").css("background-color", nitrite_hsv);
            $("#pH_result").text("");
            $("#pH_result").append(pH_hsv);
            //$("#pH_result").css("background-color", pH_hsv);
        }

        //load all HTML before javascript
        document.addEventListener("DOMContentLoaded", init, false);

        

function rgb2hsv (r,g,b) {
 //remove spaces from input RGB values, convert to int
 var r = parseInt( (''+r).replace(/\s/g,''),10 ); 
 var g = parseInt( (''+g).replace(/\s/g,''),10 ); 
 var b = parseInt( (''+b).replace(/\s/g,''),10 ); 

 if ( r==null || g==null || b==null ||
     isNaN(r) || isNaN(g)|| isNaN(b) ) {
   alert ('Please enter numeric RGB values!');
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
 return("HSV( " + computedH + " , "  + computedS +  " , "  + computedV + " )");
}

