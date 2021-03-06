<?php /** @var Usuario $Usuario */ ?>
<div class="modal fade" id="agregarUsuario" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel"><i class="fa fa-plus-circle"></i> Agregar Usuario</h4>
            </div>

            <div class="modal-body">
                <form class="form-horizontal" id="form_usuario">
                    <div class="row">

                        <!-- ID -->
                        <div class="form-group">
                            <div class="col-xs-3 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                                <label>ID</label>
                            </div>
                            <div class="col-xs-3 col-sm-2">
                                <input class="form-control" type="text" value="<?= $Usuario->cargarUltimoId() ?>"
                                       disabled="">
                            </div>
                        </div>

                        <!-- Login -->
                        <div class="form-group">
                            <div class="col-xs-3 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                                <label for="nombre">Login</label>
                            </div>

                            <div class="agrupador">
                                <div class="col-xs-6">
                                    <input class="form-control" id="nombre" type="text" maxlength="25"
                                           placeholder="Ingrese un nombre"
                                           onkeyup="Estacion.mensajes.oculta($('#nombre_vacio'));
                                                    Estacion.mensajes.oculta($('#nombre_error'));
                                                    Estacion.mensajes.oculta($('#nombre_duplicado'));"
                                           onblur="Usuario.acciones.existeUsuario($('#nombre'));">
                                    <input type="hidden" id="existeUsuario" value="1">
                                </div>
                                <div id="busy_nombre"></div>
                                <div class="col-xs-8 col-xs-offset-4 col-sm-9 col-sm-offset-3 mensaje oculto">
                                    <label class="control-label" for="nombre" id="nombre_vacio">&iexcl;Ingrese
                                        nombre usuario!</label>
                                </div>
                                <div class="col-xs-8 col-xs-offset-4 col-sm-9 col-sm-offset-3 mensaje oculto">
                                    <label class="control-label" for="nombre" id="nombre_error">&iexcl;El
                                        usuario debe contener al menos 4 caracteres!</label>
                                </div>
                                <div class="col-xs-8 col-xs-offset-4 col-sm-9 col-sm-offset-3 mensaje oculto">
                                    <label class="control-label" id="nombre_duplicado">&iexcl;El nombre ya se
                                        encuentra en uso!</label>
                                </div>
                            </div>

                        </div>

                        <!-- contraseña -->
                        <div class="form-group">
                            <div class="col-xs-3 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                                <label for="contrasena">Contrase&ntilde;a</label>
                            </div>

                            <div class="agrupador">
                                <div class="col-xs-6">
                                    <input class="form-control" id="contrasena" type="password" maxlength="25"
                                           placeholder="Ingrese una contrase&ntilde;a" value=""
                                           onkeyup="Estacion.mensajes.oculta($('#contrasena_vacio'));
                                                    Estacion.mensajes.oculta($('#contrasena_error'));
                                                    Estacion.mensajes.oculta($('#error_mayuscula'));
                                                    Estacion.mensajes.oculta($('#error_numero')); ">
                                </div>
                                <div class="col-xs-8 col-xs-offset-4 col-sm-9 col-sm-offset-3 mensaje oculto">
                                    <label class="control-label" for="contrasena" id="contrasena_vacio">&iexcl;Ingrese
                                        contrase&ntilde;a!</label>
                                </div>
                                <div class="col-xs-8 col-xs-offset-4 col-sm-9 col-sm-offset-3 mensaje oculto">
                                    <label class="control-label" for="contrasena" id="contrasena_error">&iexcl;La
                                        contrase&ntilde;a debe contener al menos 8 caracteres!</label>
                                </div>
                                <div class="col-xs-8 col-xs-offset-4 col-sm-9 col-sm-offset-3 mensaje oculto">
                                    <label class="control-label" for="contrasena" id="error_mayuscula">
                                        &iexcl;Las contrase&ntilde;a debe contener una letra may&uacute;scula!</label>
                                </div>
                                <div class="col-xs-8 col-xs-offset-4 col-sm-9 col-sm-offset-3 mensaje oculto">
                                    <label class="control-label" for="contrasena" id="error_numero">&iexcl;Las
                                        contrase&ntilde;a debe contener un n&uacute;mero!</label>
                                </div>
                            </div>
                        </div>

                        <!-- confirmación contraseña -->
                        <div class="form-group">
                            <div class="col-xs-3 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                                <label for="confirmar_contrasena">Confirmar Contrase&ntilde;a</label>
                            </div>

                            <div class="agrupador">
                                <div class="col-xs-6">
                                    <input class="form-control" id="confirmar_contrasena" type="password" maxlength="25"
                                           placeholder="Repita la contrase&ntilde;a"
                                           onkeyup="Estacion.mensajes.oculta($('#confirmar_contrasena_vacio'));
                                                    Estacion.mensajes.oculta($('#contrasena_no_coinciden'));">
                                </div>
                                <div class="col-xs-8 col-xs-offset-4 col-sm-9 col-sm-offset-3 mensaje oculto">
                                    <label class="control-label" for="confirmar_contrasena"
                                           id="confirmar_contrasena_vacio">&iexcl;Ingrese confirmaci&oacute;n de
                                        contrase&ntilde;a!</label>
                                </div>
                                <div class="col-xs-8 col-xs-offset-4 col-sm-9 col-sm-offset-3 mensaje oculto">
                                    <label class="control-label" for="confirmar_contrasena"
                                           id="contrasena_no_coinciden">&iexcl;Las contrase&ntilde;as no coinciden!</label>
                                </div>
                            </div>
                        </div>

                        <!-- tipo -->
                        <div class="form-group">
                            <div class="col-xs-3 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                                <label for="tipo_usuario">Tipo</label>
                            </div>

                            <div class="col-xs-6">
                                <select class="form-control" id="tipo_usuario">
                                    <?php $tipos = Tipo::getTiposUsuario($tdu); ?>
                                    <?php foreach ($tipos as $tipo) { ?>
                                        <option
                                            value="<?= $tipo->id ?>"><?= $tipo->descripcion ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                        </div>

                        <!-- estado -->
                        <div class="form-group">
                            <div class="col-xs-3 col-xs-offset-1 col-sm-2 col-sm-offset-1">
                                <label class="control-label" for="estado">Estado</label>
                            </div>

                            <div class="col-xs-6">
                                <select class="form-control" id="estado">
                                    <?php $estados = Estado::getEstadoUsuario(); ?>
                                    <?php foreach ($estados as $estado) { ?>
                                        <option
                                            value="<?= $estado->id ?>"><?= $estado->descripcion ?></option>
                                    <?php } ?>
                                </select>
                            </div>
                        </div>

                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <div id="botones_modal_crear">
                    <button type="button" class="btn btn-default" data-dismiss="modal" onclick="Usuario.acciones.limpiar()">
                        Cancelar
                    </button>
                    <button type="button" class="btn btn-primary" onclick="Usuario.acciones.guardar();">Guardar</button>
                </div>
            </div>

        </div>
    </div>
</div>