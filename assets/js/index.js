// Show email and password div based on role option selected in create-user form
$(document).ready(function(){
     $('#rol').on('change', function() {
          if ($(this).children("option:selected").text() === 'Administrador' 
               && !document.getElementById('emailToUpdate')) {
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


$(document).ajaxStart(function(){
     Swal.fire({
          position: 'center',
          imageUrl: "/img/loading.gif",
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false
     });
});

// Create user
$("#add_user").submit(function(event){
     event.preventDefault();

     var data = new FormData(this);
     
     var request = {
          "url": `http://localhost:4000/user/createUser`,
          "method": "POST",
          "data": data,
          "processData": false,
          "contentType": false,
          "success": async (response) => {
               if (response.status == 'success') {
                    await Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: `Usuario agregado!`,
                         showConfirmButton: false,
                         allowOutsideClick: false,
                         allowEscapeKey: false,
                         timer: 1500
                    });
                    window.location.replace(response.url);
               } else if (response.status == 'error') {
                    await Swal.fire({
                         icon: 'error',
                         text: response.message
                    });

               }
          }
     }

     $.ajax(request);
});


// Search user information
$("#search_user").submit(function(event){
     event.preventDefault();

     var data = new FormData(this);
     var cedula = data.get('cedula');
     
     var request = {
          "url": `http://localhost:4000/user/search?cedula=${cedula}`,
          "method": "GET",
          "success": async (response) => {
               if (response.status == 'success') {
                    window.location.assign(response.url);
               } else if (response.status == 'error') {
                    await Swal.fire({
                         icon: 'error',
                         text: response.message
                    });
               }
          }
     }

     $.ajax(request);
});


// Search user body temperature measurements
$("#search_user_btm").submit(function(event){
     event.preventDefault();

     var data = new FormData(this);
     var cedula = data.get('cedula');
     
     var request = {
          "url": `http://localhost:4000/btm/search?cedula=${cedula}`,
          "method": "GET",
          "success": async (response) => {
               if (response.status == 'success') {
                    window.location.assign(response.url);
               } else if (response.status == 'error') {
                    await Swal.fire({
                         icon: 'error',
                         text: response.message
                    });
               }
          }
     }

     $.ajax(request);
});


//Update user information
$("#updateUserInfo").submit(function(event){
     event.preventDefault();

     var data = new FormData(this);
     var uid = data.get('id');
     
     var request = {
          "url": `http://localhost:4000/user/profile/${uid}`,
          "method": "PUT",
          "data": data,
          "processData": false,
          "contentType": false,
          "success": async (response) => {
               if (response.status == 'success') {
                    await Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: `Usuario actualizado!`,
                         showConfirmButton: false,
                         allowOutsideClick: false,
                         allowEscapeKey: false,
                         timer: 1500
                    });
                    window.location.replace(response.url);
               } else if (response.status == 'error') {
                    await Swal.fire({
                         icon: 'error',
                         text: response.message
                    });

               }
          }
     }

     $.ajax(request);
})


// Update user email 
$("#updateUserEmail").submit(function(event){
     event.preventDefault();

     var unindexed_array = $(this).serializeArray();
     var data = {}

     $.map(unindexed_array, function(n, i) {
          data[n['name']] = n['value']
     });
     
     var request = {
          "url": `http://localhost:4000/user/account/${data.id}`,
          "method": "PUT",
          "data": data,
          "success": async (response) => {
               if (response.status == 'success') {                   
                    await Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: `Email actualizado!`,
                         showConfirmButton: false,
                         allowOutsideClick: false,
                         allowEscapeKey: false,
                         timer: 1500
                    });
                    window.location.replace(response.url);
               } else if (response.status == 'error') {
                    await Swal.fire({
                         icon: 'error',
                         text: response.message
                    });

               }
          }
     }

     $.ajax(request);
})


// Update user password
$("#updateUserPasswd").submit(function(event){
     event.preventDefault();

     var unindexed_array = $(this).serializeArray();
     var data = {}

     $.map(unindexed_array, function(n, i) {
          data[n['name']] = n['value']
     });
     
     var request = {
          "url": `http://localhost:4000/user/security/${data.id}`,
          "method": "PUT",
          "data": data,
          "success": async (response) => {
               if (response.status == 'success') {
                         await Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: `Contraseña actualizada!`,
                              showConfirmButton: false,
                              allowOutsideClick: false,
                              allowEscapeKey: false,
                              timer: 1500
                         });
                    window.location.replace(response.url);     
               } else if (response.status == 'error') {
                    await Swal.fire({
                         icon: 'error',
                         text: response.message
                    });

               }
          }
     }

     $.ajax(request);
})


// Get general body temperature measurements report
$("#generateReport").submit(function(event){
     event.preventDefault();

     var data = new FormData(this);
     var startDate = data.get('fechaInicio');
     var endDate = data.get('fechaFin'); 
     
     var request = {
          "url": `http://localhost:4000/btm/measurements/report/all?startDate=${startDate}&endDate=${endDate}`,
          "method": "GET",
          "success": (response) => {
               Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Reporte generado',
                    html: `<p>Click <a href=${response.url} target="_blank" rel="noopener">aquí</a> si la descarga no inicia.</p>`,
                    showCloseButton: true,
                    showConfirmButton: false
               });
               window.location.assign(response.url);
               $("#modalReport").modal('hide');
          }
     }

     $.ajax(request);
});


// Get user body temperature measurements report
$("#generateUserReport").submit(function(event){
     event.preventDefault();

     var data = new FormData(this);
     var userId = data.get('userId');
     
     var request = {
          "url": `http://localhost:4000/btm/measurements/${userId}/report`,
          "method": "GET",
          "success": (response) => {
               Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Reporte generado',
                    html: `<p>Click <a href=${response.url} target="_blank" rel="noopener">aquí</a> si la descarga no inicia.</p>`,
                    footer: `<a href="/user/home" class="btn btn-success">Ir a la página de inicio</a>`,
                    showCloseButton: true,
                    showConfirmButton: false
               });
               window.location.assign(response.url);
          }
     }

     $.ajax(request);
});


// Delete user
$("#deleteUser").submit(function(event){
     event.preventDefault();

     var data = new FormData(this);
     var userId = data.get('id');
     
     var request = {
          "url": `http://localhost:4000/user/${userId}`,
          "method": "DELETE",
          "success": async (response) => {
               if (response.status == 'success') {
                    await Swal.fire({
                         position: 'center',
                         icon: 'success',
                         title: `Usuario eliminado!`,
                         showConfirmButton: false,
                         allowOutsideClick: false,
                         allowEscapeKey: false,
                         timer: 1500
                    });
                    window.location.replace(response.url);
               }
          }
     }

     Swal.fire({
          title: '¿Está seguro?',
          text: "No será capáz de revertir esto",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar!',
          cancelButtonText: 'Cancelar'
     }).then((result) => {
          if (result.isConfirmed) {
               $.ajax(request);
          }
     });
});


// Delete user from users table
if(window.location.pathname == '/user/allUsers') {
     $ondelete = $(".table tbody td a.delete");
     $ondelete.click(function(){
          var id = $(this).attr("data-id");

          var request = {
               "url": `http://localhost:4000/user/${id}`,
               "method": "DELETE",
               "success": async (response) => {
                    if (response.status == 'success') {
                         await Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: `Usuario eliminado!`,
                              showConfirmButton: false,
                              allowOutsideClick: false,
                              allowEscapeKey: false,
                              timer: 1500
                         });
                         window.location.replace(response.url);
                    }
               }
          }

          Swal.fire({
               title: '¿Está seguro?',
               text: "No será capáz de revertir esto",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#3085d6',
               cancelButtonColor: '#d33',
               confirmButtonText: 'Sí, eliminar!',
               cancelButtonText: 'Cancelar'
          }).then((result) => {
               if (result.isConfirmed) {
                    $.ajax(request);
               }
          });
     });
}







 