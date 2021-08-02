// Show email and password div based on role option selected
$(document).ready(function(){
     $('#rol').on('change', function() {
          if ( $(this).children("option:selected").text() === 'Administrador') {
               var divEmail = document.getElementById('input_email');
               var divPasswd = document.getElementById('input_password');
               var emailInput = document.createElement("input");
               var passwdInput = document.createElement("input");
               emailInput.type = "email";
               emailInput.name = "email";
               emailInput.id = "email";
               emailInput.placeholder = "Email"
               emailInput.className = "form-control";
               emailInput.required = true;
               passwdInput.type = "password";
               passwdInput.name = "password";
               passwdInput.id = "password";
               passwdInput.placeholder = "Password"
               passwdInput.className = "form-control";
               passwdInput.required = true;
               divEmail.appendChild(emailInput);
               divPasswd.appendChild(passwdInput);
               $("#adminCredentials").show();   
          }else {
               if(document.getElementById('email') || document.getElementById('password')){
                    const data = ['email', 'password'];
                    data.forEach((inputName) => {
                         let input = document.getElementById(inputName);
                         input.remove();   
                    });             
               }
               $("#adminCredentials").hide();   
          }
     });
});


//<input type="email" name="email" id="email" placeholder="example@gmail.com" class="form-control" required>
//<input type="password" name="password" id="password" placeholder="Password" class="form-control" required>


// Update user 
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

// Delete user 
if(window.location.pathname == '/user/allUsers') {
     $ondelete = $(".table tbody td a.delete");
     $ondelete.click(function(){
          var id = $(this).attr("data-id");

          var request = {
               "url": `http://localhost:4000/user/${id}`,
               "method": "DELETE"
          }

          if(confirm("¿Está seguro de que desea eliminar este usuario?")) {
               $.ajax(request);
               location.reload();
          }
     })
}


// User profile photo
$("#userPhoto").change(function(e) {
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
          $("#userPhoto").after(img);
     }
 })

 