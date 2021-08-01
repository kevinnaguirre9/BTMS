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

 