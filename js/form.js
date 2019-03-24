$(function(){
    $('#formulario').submit(function(event){
      event.preventDefault();
      checkContrasena();
    })
  })

  function checkContrasena(){
    var password = $('#password').val();
    var passwordRepeat = $('#passwordRepeat').val();
  
    if (password===passwordRepeat) {
      getDatos();
  
    }else {
      alert('Las contraseñas no coinciden')
    }
  }

  function getDatos(){
    var form_data = new FormData();
    form_data.append('nombre', $('#nombre').val());
    form_data.append('email', $('#email').val());
    form_data.append('password', $('#password').val());
    form_data.append('sexo', $('input:checked')[0].value);
    sendForm(form_data);
 }

 function sendForm(formData){
  $.ajax({
    url: '../server/create_user.php',
    dataType: "json",
    cache: false,
    processData: false,
    contentType: false,
    data: formData,
    type: 'POST',
    beforeSend: function(){
      $(".btnClass").html('Registrando...')
    },
    success: function(data){
      console.log(data)
      if (data.msg == "exito registrado usuario") {
        window.location.href = 'index.html';
      }else {
        alert(data.msg);
      }
    },
    error: function(){
      alert("error en la comunicación con el servidor");
    }
  })
}
