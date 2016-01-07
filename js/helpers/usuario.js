var Usuario = {

    acciones: {

        pressEnter: function (e) {
            if (e.keyCode == 13) {
                console.log('Presiona enter');
                Usuario.acciones.buscar();
            }
        },

        existeUsuario: function () {
            var nombre = $('#nombre').val();

            if (nombre.length >= 4) {
                $.ajax({
                    method: "POST",
                    url: base_url + "Usuario/existeUsuario/" + nombre,
                    data: {}
                })
                    .done(function (r) {
                        if (r.status) {
                            console.log('ERROR: existe usuario');
                            $('#existeUsuario').val(0);
                            $('#nombre_duplicado').parent('.duplicado').removeClass(' oculto');
                            $('#nombre').parents('.agrupador').children('.form-group').children('.mensaje').addClass(' has-error');
                        } else {
                            console.log('OK: No existe usuario');
                            $('#existeUsuario').val(1);
                            $('#nombre_duplicado').parent('.duplicado').addClass(' oculto');
                            $('#nombre').parents('.agrupador').children('.form-group').children('.mensaje').removeClass(' has-error');
                        }
                    });
            }
        },
        guardar: function () {
            var nombre = $('#nombre');
            var contrasena = $('#contrasena');
            var confirmar_contrasena = $('#confirmar_contrasena');
            var tipo = $('#tipo_usuario');
            var existeUsuario = $('#existeUsuario');

            this.validoVacio(nombre);
            this.validoVacio(contrasena);
            this.validoVacio(confirmar_contrasena);

            if (existeUsuario.val() == 1 && nombre.val().length >= 4 && contrasena.val().length >= 8 && this.validarContrasena(contrasena, confirmar_contrasena, -1)) {
                $.ajax({
                    method: "POST",
                    url: base_url + "Usuario/ingresarUsuario",
                    data: {
                        nombre: nombre.val().toLowerCase().trim(),
                        contrasena: $.md5(contrasena.val().trim()),
                        tipo: tipo.val()
                    }
                })
                    .done(function (r) {
                        if (r.status) {
                            console.log('usuario guardado');
                            $('#resultado').html(Escritorio.load.usuario());
                            $('.modal-backdrop').remove();
                        } else {
                            console.log('Error al guardar');
                        }
                    });
            }
        },

        editar: function (id) {

            var nombre = $('#nombre_editar' + id);
            var contrasena = $('#contrasena_editar' + id);
            var confirmar_contrasena = $('#confirmar_contrasena_editar' + id);
            var tipo = $('#tipo_usuario_editar' + id);
            var estado = $('#estado_editar' + id);

            this.validoVacio(nombre);
            this.validoVacio(contrasena);
            this.validoVacio(confirmar_contrasena);

            if (nombre.val().length >= 4 && contrasena.val().length >= 8 && this.validarEditarContrasena(contrasena, confirmar_contrasena, id)) {
                $.ajax({
                    method: "POST",
                    url: base_url + "Usuario/editarUsuario",
                    data: {
                        id: id,
                        nombre: nombre.val().toLowerCase().trim(),
                        contrasena: $.md5(contrasena.val()),
                        tipo: tipo.val(),
                        estado: estado.val()
                    }
                })
                    .done(function () {
                        console.log('OK: usuario actualizado -> ' + id);
                        $('#resultado').html(Escritorio.load.usuario());
                        $('.modal-backdrop').remove();
                    });
            } else {
                console.log('ERROR: no edito -> ' + id);
            }
        },

        eliminar: function (id) {
            $.ajax({
                method: "POST",
                url: base_url + "Usuario/eliminarUsuario",
                data: {id: id}
            })
                .done(function () {
                    console.log('usuario eliminado');
                    $('#resultado').html(Escritorio.load.usuario());
                    $('.modal-backdrop').remove();
                });
        },

        restaurar: function (id) {
            $.ajax({
                method: "POST",
                url: base_url + "Usuario/restaurar/",
                data: {id: id}
            })
                .done(function (r) {
                    if (r.status) {
                        console.log('ERROR: restaura usuario -> '+ r.usuario_id);
                        $('#resultado').html(Escritorio.load.usuario());
                        $('.modal-backdrop').remove();
                    } else {
                        console.log('OK: No restaura usuario');
                    }
                });
        },

        verInactivos: function () {
            var check = $('#verInactivos');
            var tr = $('tr.inactivo');

            if (check.is(":checked")) {
                tr.removeClass(' ocultoInactivo');
                tr.children().children('.btn-danger').addClass(' oculto');
                tr.children().children('.btn-warning').addClass(' oculto');
            } else {
                tr.addClass(' ocultoInactivo');
                tr.children().children('.btn-danger').removeClass(' oculto');
                tr.children().children('.btn-warning').removeClass(' oculto');
                tr.children().children('.btn-default').removeClass(' oculto');
            }

        },
        buscar: function () {
            var filtro = $('#filtro_usuario');
            var valor_a_buscar = $('#valor_a_buscar');

            var tds = $('#tabla_usuario  td:nth-of-type(' + filtro.val() + ')');

            tds.each(function (i, td) {

                var texto_td = td.innerHTML.toString();
                var que_busco = valor_a_buscar.val().toString();

                //if (texto_td == que_busco) {
                if (texto_td.indexOf(que_busco) > -1) {
                    console.log('encontro -> ' + texto_td);
                    $(td).parents('tr').removeClass(' ocultoFiltro');
                } else {
                    $(td).parents('tr').addClass(' ocultoFiltro');
                }
            });

            Usuario.acciones.verInactivos();
        },

        limpiar: function () {
            var input_nombre = $('#nombre');
            var contrasena = $('#contrasena');
            var confirmar_contrasena = $('#confirmar_contrasena');

            input_nombre.val('');
            contrasena.val('');
            confirmar_contrasena.val('');

            $('#nombre_vacio').addClass(' oculto');
            $('#nombre_error').addClass(' oculto');
            $('#contrasena_vacio').addClass(' oculto');
            $('#contrasena_error').addClass(' oculto');
            $('#confirmar_contrasena_vacio').addClass(' oculto');
            $('#confirmar_contrasena_error').addClass(' oculto');
            $('#contrasena_no_coinciden').addClass(' oculto');
            $('#nombre_duplicado').parent('.duplicado').addClass(' oculto');
            $('#error_mayuscula').parent('.menssaje').addClass(' oculto');
            $('#error_numero').parent('.menssaje').addClass(' oculto');

            input_nombre.parents('.agrupador').removeClass(' has-error has-warning');
            contrasena.parents('.agrupador').removeClass(' has-error has-warning');
            confirmar_contrasena.parents('.agrupador').removeClass(' has-error has-warning');
            $('#nombre').parents('.agrupador').children('.form-group').children('.mensaje').removeClass(' has-error');
        },

        limpiarEditar: function () {
            $('#resultado').html(Escritorio.load.usuario());
            $('.modal-backdrop').remove();
        },

        validarContrasena: function (input_contrasena, input_confirmar, id) {
            console.log(input_contrasena.val().trim() + ' == ' + input_confirmar.val().trim());
            if (input_contrasena.val().trim() == input_confirmar.val().trim()) {
                ( id == -1 ) ?
                    $('#contrasena_no_coinciden').addClass(' oculto') :
                    $('#contrasena_no_coinciden_editar' + id).addClass(' oculto');
                if (input_contrasena.val().trim().match(/[A-Z]/)) {
                    if (input_contrasena.val().trim().match(/\d/)) {
                        console.log('OK: guarda');
                        return true;
                    } else {
                        console.log('ERROR: falta numero');
                        $('#error_numero').parent('.menssaje').removeClass(' oculto');
                    }
                } else {
                    console.log('ERROR: falta mayuscula');
                    $('#error_mayuscula').parent('.menssaje').removeClass(' oculto');
                }
            } else {
                ( id == -1 ) ?
                    $('#contrasena_no_coinciden').removeClass(' oculto') :
                    $('#contrasena_no_coinciden_editar' + id).removeClass(' oculto');
                return false;
            }
        },

        validarEditarContrasena: function (input_contrasena, input_confirmar, id) {
            console.log(input_contrasena.val().trim() + ' == ' + input_confirmar.val().trim());
            if (input_contrasena.val().trim().length == 32 &&
                input_contrasena.val().trim().match(/[a-z0-9]/) &&
                input_confirmar.val().trim().length == 32 &&
                input_confirmar.val().trim().match(/[a-z0-9]/)) {
                return true;
            } else {
                console.log('Error: no es MD5');
                if (input_contrasena.val().trim() == input_confirmar.val().trim()) {
                    ( id == -1 ) ?
                        $('#contrasena_no_coinciden').addClass(' oculto') :
                        $('#contrasena_no_coinciden_editar' + id).addClass(' oculto');
                    if (input_contrasena.val().trim().match(/[A-Z]/)) {
                        if (input_contrasena.val().trim().match(/\d/)) {
                            console.log('OK: guarda');
                            return true;
                        } else {
                            console.log('ERROR: falta numero');
                            $('#error_numero').parent('.menssaje').removeClass(' oculto');
                        }
                    } else {
                        console.log('ERROR: falta mayuscula');
                        $('#error_mayuscula').parent('.menssaje').removeClass(' oculto');
                    }
                } else {
                    ( id == -1 ) ?
                        $('#contrasena_no_coinciden').removeClass(' oculto') :
                        $('#contrasena_no_coinciden_editar' + id).removeClass(' oculto');
                    return false;
                }
            }
        },

        validarNumeroCaracteresUsuario: function (elem, numero) {
            Usuario.acciones.mensajeNumeroCaracteresUsuario(elem, numero);
            $(elem).parents('.agrupador').children('.form-group').children('.mensaje').children('.vacio').addClass(' oculto');

            if ($(elem).val().length < numero) {
                $(elem).parents('.agrupador').removeClass(' has-error');
                $(elem).parents('.agrupador').addClass(' has-warning');
                $(elem).parents('.agrupador').children('.vacio').addClass(' oculto');
            }
            else {
                $(elem).parents('.agrupador').removeClass(' has-warning');
            }
        },

        validoVacio: function (elem) {
            if (elem.val() == '') {
                elem.parents('.agrupador').addClass(' has-error');
                elem.parents('.agrupador').children('.form-group').children('.mensaje').children('.vacio').removeClass(' oculto');

                $('#nombre_vacio').removeClass(' oculto');
                $('#nombre_error').removeClass(' oculto');
                $('#contrasena_vacio').removeClass(' oculto');
                $('#contrasena_error').removeClass(' oculto');
                $('#confirmar_contrasena_vacio').removeClass(' oculto');
                $('#confirmar_contrasena_error').removeClass(' oculto');
            } else {
                elem.parents('.agrupador').children('.form-group').children('.mensaje').children('.vacio').addClass(' oculto');
            }
        },

        mensajeNumeroCaracteresUsuario: function (elem, numero) {
            if ($(elem).val().length < numero) {
                $(elem).parents('.agrupador').children('.form-group').children('.mensaje').children('.error').removeClass(' oculto');
            } else {
                $(elem).parents('.agrupador').children('.form-group').children('.mensaje').children('.error').addClass(' oculto');
                $(elem).parents('.agrupador').children('.form-group').children('.mensaje').children('.vacio').addClass(' oculto');
            }
        },

        getUsuarioIdByNombre: function () {
            var usuario_nombre = $('#ticket_usuario_nombre').val();
            console.log('busco usuario -> ' + usuario_nombre);
            if (usuario_nombre.length != '') {
                $.ajax({
                    method: "POST",
                    url: base_url + "Usuario/getUsuarioIdByNombre/" + usuario_nombre,
                    data: {}
                })
                    .done(function (r) {
                        if (r.status) {
                            $('#ticket_usuario_codigo').val(r.usuario_id);
                            Estacion.mensajes.oculta($('#usuario_no_existe'));
                        } else {
                            $('#ticket_usuario_codigo').val('-');
                            Estacion.mensajes.mostrar($('#usuario_no_existe'));
                        }
                    });
            } else {
                $('#ticket_usuario_codigo').val('-');
                Estacion.mensajes.mostrar($('#usuario_no_existe'));
            }
        }

    }
};
