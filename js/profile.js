var str = location.search;
        var res = str.slice(5);
        var myDataRef = new Firebase('https://mums.firebaseio.com/' + res); 
        
        myDataRef.on('value', function(snapshot) {
            var message = snapshot.val();
            display(message.patient_fname, message.patient_lname, message.location, message.known_drug_allergies, message.medical_history, message.prof_img);
        });
        
        function display(patient_fname, patient_lname, location, known_drug_allergies, medical_history, prof_img) {
            
            $('#profpic').attr("src", prof_img);
            $( '#patientTitle' ).text("");
            $( '#patientTitle' ).append('<h3>' + patient_fname + ' ' + patient_lname + '</h3>');
            $( '#location' ).text("");
            $( '#location' ).append("   " + location);
            $( '#known_drug_allergies' ).text("");
            $( '#known_drug_allergies' ).append("   " + known_drug_allergies);
            $( '#medical_history' ).text("");
            $( '#medical_history' ).append("   " + medical_history);
        };        
        
        function editInfo(){
            $( '#editButton' ).text("");
            $( '#editButton' ).append('<button type="button" class="btn btn-success" onclick="updateInfo()">Update</button>  <button type="button" class="btn btn-default" onclick="cancelUpdate()">Cancel</button>');
            
            $("#patientInfo p").css("line-height", "100%");
            $('#profpic').attr("src", "img/take_new_profpic.png");
            myDataRef.on('value', function(snapshot) {
                var message = snapshot.val();
                $( '#location' ).text("");
                $( '#location' ).append("<textarea class='form-control' id='location_input' rows='1' cols='2' >" + message.location + "</textarea>");
                $( '#known_drug_allergies' ).text("");
                $( '#known_drug_allergies' ).append("<textarea class='form-control' id='known_drug_allergies_input' rows='1' cols='2' >" + message.known_drug_allergies + "</textarea>");
                $( '#medical_history' ).text("");
                $( '#medical_history' ).append("<textarea class='form-control' id='medical_history_input' rows='1' cols='2' >" + message.medical_history + "</textarea>"); 
            });    
        }
        
        function updateInfo(){
            $( '#editButton' ).text("");
            $( '#editButton' ).append('<button type="button" class="btn btn-default" onclick="editInfo()">Edit</button>');
            
            $("#patientInfo p").css("line-height", "300%");
            
            var location_input = $('#location_input').val();
            var known_drug_allergies_input = $('#known_drug_allergies_input').val();
            var medical_history_input = $('#medical_history_input').val();
            
            myDataRef.child("location").set(location_input);
            myDataRef.child("known_drug_allergies").set(known_drug_allergies_input);
            myDataRef.child("medical_history").set(medical_history_input);
            
            $( '#location' ).text("   " + location_input);
            $( '#known_drug_allergies' ).text("   " + known_drug_allergies_input);
            $( '#medical_history' ).text("   " + medical_history_input);
        }
        
        function cancelUpdate(){
            $( '#editButton' ).text("");
            $( '#editButton' ).append('<button type="button" class="btn btn-default" onclick="editInfo()">Edit</button>');
            
            $("#patientInfo p").css("line-height", "300%");
            
            myDataRef.on('value', function(snapshot) {
                var message = snapshot.val();

                $( '#location' ).text("   " + message.location);
                $( '#known_drug_allergies' ).text("   " + message.known_drug_allergies);
                $( '#medical_history' ).text("   " + message.medical_history);
            });
        }

        var DateRef = myDataRef.child("/tests");
        var key;
        DateRef.orderByChild("timeRef").on('child_added', function(snapshot) {
            var message = snapshot.val();
            key = snapshot.key();
            
            $( '#results_list').append(
                '<button type="button" class="list-group-item" id="button' + key + '" onclick=resultsTable("'+ key +'")> ' + message.timeStamp + '</button>'
            );

        });
   
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

        function loadOverview() {
            
            var lastTestRef = myDataRef.child("lastTestRef");
            lastTestRef.on('value', function(snapshot) {
                var message = snapshot.val();
                if(message == "none"){                    
                    $( '#overviewTable' ).text("");
                    $( '#overviewTable' ).append("<div style='text-align:center; vertical-align:middle; font-weight:bold; position:relative; top:50px'>No tests saved for this patient.<br><a href='testSetUp.html'><span class='glyphicon glyphicon-camera' aria-hidden='true'></span> Start New Test</a></div>");
                    $( '#charts' ).text("");
                    $( '#charts' ).append("<div style='text-align:center; vertical-align:middle; font-weight:bold; position:relative; top:100px'>No tests saved for this patient.<br><a href='testSetUp.html'><span class='glyphicon glyphicon-camera' aria-hidden='true'></span> Start New Test</a></div>");
                }
                else {
                    $( '#overviewTable' ).text("");
                    $( '#overviewTable' ).append('<b>Most recent test: ' + message.timeStamp + '</b><table class="table table-striped"><tbody><tr><td>pH</td><td>' + message.pH + '</td></tr><tr><td>Nitrite</td><td>' + message.nitrite + '</td></tr><tr><td>Ketone</td><td>' + message.ketone + '</td></tr><tr><td>Glucose</td><td>' + message.glucose + '</td></tr></tbody></table>');
                }
                
            });
        };
        
        function resultsTable (key) {           
            var tableRef = DateRef.child(key);
            tableRef.on('value', function(snapshot) {
                var message = snapshot.val();
                
                var checkColor = $('#button' + key).css("background-color");
                if(checkColor == "rgb(245, 245, 245)" || checkColor == "rgb(255, 255, 255)"){
                    $( '#button' + key ).css("background-color","rgb(128, 128, 128)");
                    $( '#button' + key ).css("color","white");
            
                    $( '#display_space' ).append('<div id="table' + key + '" class="liltable2"><b>' + message.timeStamp + '</b><table class="table table-striped"><tbody><tr><td>pH</td><td>' + message.pH + '</td></tr><tr><td>Nitrite</td><td>' + message.nitrite + '</td></tr><tr><td>Ketone</td><td>' + message.ketone + '</td></tr><tr><td>Glucose</td><td>' + message.glucose + '</td></tr></tbody></table></div>');
                }
                else if(checkColor == "rgb(128, 128, 128)"){
                    $( '#button' + key ).css("background-color","rgb(255, 255, 255)");
                    $( '#button' + key ).css("color","black");
                    $('#table' + key).remove();
                }
            });    
        };

    function addNote(){
        var timeStamp = getTimestamp();   
        var note = $('#noteField').val();
        $("#noteField").val("");
            
        var noteRef = myDataRef.child("notes");
        noteRef.push({timeStamp: timeStamp, note: note});
        myDataRef.child("lastNoteRef").set({timeStamp: timeStamp, note: note});
        loadOverview();
    }
        
    function loadNotes(){
        $('#pastNotes').text("");
        
        var noteRef = myDataRef.child("notes");
        noteRef.on('child_added', function(snapshot) {
            var message = snapshot.val();
            var key = snapshot.key();
            $('#pastNotes').prepend("<div id='" + key + "'class='note'><h4>" + message.timeStamp + "        <span class='glyphicon glyphicon-trash' style='float:right' onclick='deleteNote(" + '"' + key + '"' + ")'> </h4>" + message.note + "</span></div>");  
        }); 
        
    }    
        
    function deleteNote(key){    
        var noteKeyRef = myDataRef.child("notes/" + key);
        noteKeyRef.remove();
        $("#" + key).remove();
        loadOverview();
    }

    //IMAGE PART
        window.URL = window.URL || window.webkitURL;

        var fileSelect = document.getElementById("profpic"),
                fileElem = document.getElementById("fileElem"),
                imgHolder = document.getElementById("imgHolder");

        fileSelect.addEventListener("click", function(e) {
            if (fileElem) {fileElem.click();
            }
            e.preventDefault(); // prevent navigation to "#"
        }, false);

        function handleFiles(files) {
            if (!files.length) {
                imgHolder.innerHTML = "<p>Photo Not Yet Taken</p>";
            }
            else
            {
                imgHolder.innerHTML = "";
                $('#fileSelect').hide();
                $('#sendPhoto').toggle();
                var imgCapture = document.createElement("img");
                imgCapture.src = window.URL.createObjectURL(files[0]);
                //img.height = 60;
                imgCapture.onload = function() {
                    window.URL.revokeObjectURL(this.src);
                }
                //imgHolder.appendChild(imgCapture);
                //console.log(imgCapture.src);
                var reader = new window.FileReader();
                reader.readAsDataURL(files[0]);
                reader.onloadend = function()
                {
                    base64data = reader.result;
                    //for Profile.html - instead of base64data, this will be a variable when calling it back
                    $('#profpic').attr("src", base64data);
                    
                };
                return imgCapture;
            }
        }




