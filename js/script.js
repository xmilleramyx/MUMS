    // Wait for PhoneGap to connect with the device
    document.addEventListener("deviceready",onDeviceReady,false);
    
    var pictureSource;   // picture source
	var destinationType; // sets the format of returned value
    
    // PhoneGap is ready to be used!
    function onDeviceReady() {

	    var getImg_btn = $('#getImg');

	    pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
        
        //on click get image    
        getImg_btn.click(function(){
        	getImage()
        });
        
	
		var getX = 500;//$('input[name=x]');
		var getY = 500;//$('input[name=y]');
		var getWidth = 700;//$('input[name=width]');
		var getHeight = 500;//$('input[name=height]');


		crop(getX, getY, getWidth, getHeight, imageSrc);
		
		
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		
		var cropBtn = $('#crop');
		cropBtn.click(function(){
			var imageSrc = $("#image").src});

  
		
				// Cropped Image
				function crop(getX, getY, getWidth, getHeight, imageSrc){
					var imageObj = new Image();
					
					imageObj.onload = function(){
							
							var sourceX = getX;
							var sourceY = getY;
							var sourceWidth = getWidth;
							var sourceHeight = getHeight;
							var destWidth = sourceWidth;
							var destHeight = sourceHeight;
							var destX = 0;
							var destY = canvas.height / 2;
					 
							context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, 
								destX, destY, destWidth, destHeight);
						};
					imageObj.src = imageSrc;
				}	
				
		    }

    

    // A button will call this function
    function getImage(source) {
    // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50});
    }


    // Called when a photo is successfully retrieved
    function onPhotoURISuccess(imageURI) {

      // Get image handle
      var image = document.getElementById('image');
      var imgCnt = document.getElementById('image_container');

	  // Unhide image container
	  imgCnt.style.display = 'block';
	  
      // Unhide image elements
      image.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      image.src = imageURI;
    }

    // Called if something bad happens.
    function onFail(message) {
      alert('Failed because: ' + message);
    }
    
     // Called when capture operation is finished
    function captureSuccess(mediaFiles) {
          
    }

    // Called if something bad happens.
    function captureError(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, 'Uh oh!');
    }
    