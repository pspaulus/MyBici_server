<?php
//sesiones
session_start();



class Escritorio extends CI_Controller
{

    public function index()
    {

        $data['helpers']['escritorio'] = base_url() . 'js/helpers/escritorio.js';
        $data['helpers']['usuario'] = base_url() . 'js/helpers/usuario.js';
        $data['helpers']['login'] = base_url() . 'js/helpers/login.js';
        $data['helpers']['estacion'] = base_url() . 'js/helpers/estacion.js';


        if ( isset($_SESSION["Usuario"]) ) {
            $data['usuario'] = $_SESSION["Usuario"];

            $this->load->view('header');
            $this->load->view('escritorio', $data);
            $this->load->view('footer');

        } else {
            //redirect("error login/ forbbiden");
            $Login = new Login();
            $Login->index();
        }


        /*/
        header('Content-Type: application/json');
        echo json_encode([
            'status' => true,
            'msg' => "&iexcl;Usuario incorrecto!",
        ]);
        return false;
        //*/
    }

    public function salir()
    {
        if (isset($_SESSION["Usuario"])) {
            session_destroy();
        }

        $Login = new Login();
        $Login->index();
    }


    // todo-ps ESTO DEBE IR EN BICICLETA CONTROLLER
    public static function cargarBicicleta($id)
    {
        $bicicleta = \App\Bicicleta::find($id);
        //dd($bicicleta);
        return $bicicleta;
    }

}
