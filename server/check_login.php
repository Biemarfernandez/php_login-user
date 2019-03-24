<?php
    
  require('./conector.php');

  $con = new ConectorBD('localhost', 'root', '');

  $response['conexion'] = $con->initConexion('createnewuser_db');

  if ($response['conexion']=='OK') {
    $resultado_consulta = $con->consultar(['usuarios'],
    ['id', 'email', 'psw'], 'WHERE email="'.$_POST['username'].'"');

    if ($resultado_consulta->num_rows != 0) {
      $fila = $resultado_consulta->fetch_assoc();
      if (password_verify($_POST['password'], $fila['psw'])) {
        $response['acceso'] = 'concedido';
        session_start();
        $_SESSION['user_id'] = $fila['id'];
        $_SESSION['username']=$fila['email'];
      }else {
        $response['motivo'] = 'Contraseña incorrecta';
        $response['acceso'] = 'rechazado';
      }
    }else{
      $response['motivo'] = 'Email incorrecto';
      $response['acceso'] = 'rechazado';
    }
  }

  echo json_encode($response);

  $con->cerrarConexion();

 ?>
