// Show email and password div based on role option selected
$(document).ready(function(){
  $('#rol').on('change', function() {
    if ( $(this).children("option:selected").text() === 'Administrador') {
      //$("#adminCredentials").show();
      if(!document.getElementById('adminCredentials')){
        var div = document.createElement("div");
        div.className = "form-group";
        div.id = "adminCredentials";
        var emailInput = document.createElement("input");
        var passwordInput = document.createElement("input");
        emailInput.type = "email";
        emailInput.name = "email";
        emailInput.id = "email";
        emailInput.placeholder = "Email"
        emailInput.className = "form-control";
        passwordInput.type = "password";
        passwordInput.name = "password";
        passwordInput.id = "password";
        passwordInput.placeholder = "Password"
        passwordInput.className = "form-control";
        div.appendChild(emailInput);
        div.appendChild(passwordInput);
        $("#roles").after(div);
      }
    }
    else {
      if(document.getElementById('adminCredentials')){
        var el = document.getElementById('adminCredentials');
        el.remove();   
      }
    }
  });
});

$("#add_user").submit(function(event){
     alert("Data inserted successfully");
     console.log("Data inserted successfully");
})


$("#update_user").submit(function(event){
     event.preventDefault();

     var data = new FormData(this);
     var uid = data.get('id');
     
     var request = {
          "url": `http://localhost:8080/user/updateUserProfile/${uid}`,
          "method": "PUT",
          "data": data,
          "processData": false,
          "contentType": false,
          "success": function(response) {
               alert('User updated successfully')
               if (response.result == 'redirect') {
                    //redirecting to sers page from here.
                    window.location.replace(response.url);
               }
          }
     }

     $.ajax(request);
})


// User profile photo
$("#user_photo").change(function(e) {
     for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {
          var file = e.originalEvent.srcElement.files[i];
          
          if(document.getElementById('img_uploaded')){
               var el = document.getElementById('img_uploaded');
               el.remove();   
          }

          var img = document.createElement("img");
          img.id = "img_uploaded";
          img.className = "rounded-circle";
          var reader = new FileReader();
          reader.onloadend = function() {
               img.src = reader.result;
          }
          reader.readAsDataURL(file);
          $("#user_photo").after(img);
     }
 })

 //404 page js

 var particles = {
     "particles": {
       "number": {
         "value": 160,
         "density": {
           "enable": true,
           "value_area": 800
         }
       },
       "color": {
         "value": "#ffffff"
       },
       "shape": {
         "type": "circle",
         "stroke": {
           "width": 0,
           "color": "#000000"
         },
         "polygon": {
           "nb_sides": 5
         },
         "image": {
           "src": "img/github.svg",
           "width": 100,
           "height": 100
         }
       },
       "opacity": {
         "value": 1,
         "random": true,
         "anim": {
           "enable": true,
           "speed": 1,
           "opacity_min": 0,
           "sync": false
         }
       },
       "size": {
         "value": 3,
         "random": true,
         "anim": {
           "enable": false,
           "speed": 4,
           "size_min": 0.3,
           "sync": false
         }
       },
       "line_linked": {
         "enable": false,
         "distance": 150,
         "color": "#ffffff",
         "opacity": 0.4,
         "width": 1
       },
       "move": {
         "enable": true,
         "speed": 0.17,
         "direction": "none",
         "random": true,
         "straight": false,
         "out_mode": "out",
         "bounce": false,
         "attract": {
           "enable": false,
           "rotateX": 600,
           "rotateY": 600
         }
       }
     },
     "interactivity": {
       "detect_on": "canvas",
       "events": {
         "onhover": {
           "enable": false,
           "mode": "bubble"
         },
         "onclick": {
           "enable": false,
           "mode": "repulse"
         },
         "resize": false
       },
       "modes": {
         "grab": {
           "distance": 400,
           "line_linked": {
             "opacity": 1
           }
         },
         "bubble": {
           "distance": 250,
           "size": 0,
           "duration": 2,
           "opacity": 0,
           "speed": 3
         },
         "repulse": {
           "distance": 400,
           "duration": 0.4
         },
         "push": {
           "particles_nb": 4
         },
         "remove": {
           "particles_nb": 2
         }
       }
     },
     "retina_detect": true
  };
  
  particlesJS('particles-js', particles, function() {
    console.log('callback - particles.js config loaded');
  });