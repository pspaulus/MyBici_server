<div id="editar_ok" class="col-xs-10 col-xs-offset-1 mensajeFlotantecabecera oculto">
    <div class="alert alert-success text-center mensajeFlotanteCuerpo">
        <?php if (!empty($entidad)) {
            switch ($entidad) {
                case 'usuario':
                    $contenido = '<i class="fa fa-check"></i> Usuario modificado con &eacute;xito.';
                    break;

                case 'estacion':
                    $contenido = '<i class="fa fa-check"></i> Estaci&oacute;n modificado con &eacute;xito.';
                    break;
            }
            echo $contenido;
        } else {
            $contenido = '<i class="fa fa-check"></i> Editado con &eacute;xito.';
        }?>
    </div>
</div>