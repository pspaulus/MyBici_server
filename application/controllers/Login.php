<?php

class Login extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
    }

    public function claveMD5($clave)
    {
        dd(md5($clave));
    }

    public function index()
    {
        //ruta del server
        echo '<script> var base_url = \'http://'.$_SERVER['HTTP_HOST'].'/\'; </script>';

        $data['helpers']['login'] = base_url() . 'js/helpers/login.js';
        $data['helpers']['estacion'] = base_url() . 'js/helpers/estacion.js';

        $this->load->view('header', $data);
        $this->load->view('login');
        $this->load->view('footer');
    }

    public function validarUsuario()
    {
        $nombre = $_REQUEST['usuario'];
        $contrasena = $_REQUEST['contrasena'];

        $usuario = \App\Usuario::where("nombre", "LIKE", $nombre)
            ->where("contrasena", "=", $contrasena)
            ->first();

        if ( $usuario != null ){
            if ( $usuario->ESTADO_id == 1  && ($usuario->TIPO_id == 1 || $usuario->TIPO_id == 8) ) {
                session_start();
                $_SESSION["Usuario"] = $nombre;
                $esctritorio = new Escritorio();
                $esctritorio->index();
            } else {
                header('Content-Type: application/json');
                echo json_encode([
                    'status' => true,
                    'mensaje' => 'ERROR: usuario estandar o inactivo'
                ]);
            }
        } else {
            header('Content-Type: application/json');
            echo json_encode([
                'status' => true,
                'mensaje' => 'ERROR: no encuentra usuario'
            ]);
        }

    }
}
