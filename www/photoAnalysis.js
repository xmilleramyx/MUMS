<!doctype html>

<html lang="en">
<head>
  	<meta charset="UTF-8">
	<title>Profile</title>
	<meta name=“viewport” content=“width=device-width, intitial-scale=1.0”>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
  	<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	
	<link rel="stylesheet" type="text/css" href="bootstrap.css">
	<link rel="javascript" type="text/javascript" href="bootstrap.min.js">
  	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"> 
  	<!--<link rel="stylesheet" href=STYLESHEET>-->


		<p>Please choose a photo or take a new one</p>
		<script>
		
		var lwip = require('lwip');

		// Crop with dimensions
		lwip.open('images/beach.jpg', function(err, image) {
		  if (err) throw err;
		  var _cropOpt = {
		    left: 400,
		    top: 200,
		    right: 699,
		    bottom: 499
		  }; 

		  image.crop(_cropOpt.left, _cropOpt.top, _cropOpt.right, _cropOpt.bottom, function(err, crpdImg) {
		    if (err) throw err;
		    crpdImg.writeFile('images/beach_crop.jpg', function(err) {
		      if (err) throw err;
		    });
		  });

		});

 </head>



 <body>
		
<!--object {r: R, g: G, b: B, a: A} where R, G and B are integers between 0 and 255 and A is an integer between 0(transparent) and 100.-->






/*
 * Example for using LWIP to extract parts of an image.
 

var path = require('path'),
    lwip = require('../');

lwip.open('lena.jpg', function(err, image) {
    if (err) return console.log(err);

    image.extract(230, 230, 370, 300, function(err, eyes) {
        eyes.writeFile('lena_eyes.jpg', function(err) {
            if (err) return console.log("eyes:", err);
            console.log('eyes: done');
        });

        eyes.extract(0, 0, 70, 71, function(err, left_eye) {
            left_eye.writeFile('lena_eyes_left.jpg', function(err) {
                if (err) return console.log("eyes left:", err);
                console.log('eyes left: done');
            });
        });

        eyes.extract(71, 0, 141, 71, function(err, right_eye) {
            right_eye.writeFile('lena_eyes_right.jpg', function(err) {
                if (err) return console.log("eyes right:", err);
                console.log('eyes right: done');
            });
        });
    });

    image.extract(240, 320, 350, 380, function(err, eyes) {
        eyes.writeFile('lena_mouth.jpg', function(err) {
            if (err) return console.log("mouth:", err);
            console.log('mouth: done');
        });
    });

});*/




		</script>




























 </body>
 </html>