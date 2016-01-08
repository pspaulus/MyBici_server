<div class="container" id="formLogin">

    <!--Titulo-->
    <div class="row">
        <div class="col-xs-12 col-sm-4 col-sm-offset-4">
            <h1 class="page-header text-center text-color-white">
                <i class="fa fa-fw fa-bicycle"></i> MyBici Server
            </h1>
        </div>
    </div>

    <!--texo login-->
    <div class="row">
        <div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4">
            <div class="form-group">
                <h3 class="text-center text-color-white">
                    <i class="fa fa-fw fa-key"></i> Login
                </h3>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-8 col-xs-offset-2 col-sm-4 col-sm-offset-4">
            <div class="form-group">
                <div class="agrupador">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-fw fa-user"></i>&nbsp;</div>
                        <input type="text" class="form-control" placeholder="Usuario" id="usuario" maxlength="40"
                               onkeyup="Login.index.validarNumeroCaracteres(this,4)">
                    </div>
                    <label class="control-label vacio oculto" for="usuario" id="usuario_vacio">&iexcl;Ingrese
                        usuario!</label>
                    <label class="control-label error oculto" for="usuario" id="usuario_error">&iexcl;El usuario debe
                        contener al menos 4 caracteres!</label>
                </div>

                <div class="agrupador">
                    <div class="input-group">
                        <div class="input-group-addon"><i class="fa fa-fw fa-lock"></i>&nbsp;</div>
                        <input type="password" class="form-control" placeholder="Contrase&ntilde;a" id="contrasena"
                               maxlength="40"
                               onkeyup="Login.index.validarNumeroCaracteres(this,8);
                                        Login.index.mensajeUsuarioContrasenaIncorrecto(false);
                                        Login.index.pressEnter(event)">
                    </div>
                    <label class="control-label vacio oculto" for="contrasena"
                           id="contrasena_vacio">&iexcl;Ingrese contrase&ntilde;a!</label>
                    <label class="control-label error oculto" for="contrasena"
                           id="contrasena_error">&iexcl;La contrase&ntilde;a debe contener al menos 8 caracteres!</label>
                    <div class="has-error mensaje text-center">
                        <label class="control-label oculto" for="contrasena"
                               id="usuario_contrasena_incorrecta">&iexcl;Usuario o contrase&ntilde;a incorrecta!</label>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-4 col-xs-offset-4 text-center">
            <div class="form-group">
                <button class="btn btn-primary" onclick="Login.index.validarUsuario()">Ingresar</button>
            </div>
        </div>
    </div>

</div>
