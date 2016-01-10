var Estacion = {

    acciones: {

        guardar: function () {
            var mensaje = '';
            var input_codigo = $('#codigo');
            var input_nombre = $('#nombre');
            var input_longitud = $('#longitud');
            var input_latitud = $('#latitud');
            var existeEstacion = $('#existeCodigo');

            var validacion_codigo = true;
            var validacion_nombre = true;
            var validacion_longitud = true;
            var validacion_latitud = true;

            if (input_codigo.val() == '') {
                validacion_codigo = false;
                mensaje = $('#error_codigo_parqueos');
                Estacion.mensajes.mostrar(mensaje);
            }

            if (input_nombre.val() == '') {
                validacion_nombre = false;
                mensaje = $('#error_nombre_parqueos');
                Estacion.mensajes.mostrar(mensaje);
            }

            if (input_longitud.val() == '') {
                validacion_longitud = false;
                mensaje = $('#error_longitud_parqueos');
                Estacion.mensajes.mostrar(mensaje);
            }

            if (input_latitud.val() == '') {
                validacion_latitud = false;
                mensaje = $('#error_latitud_parqueos');
                Estacion.mensajes.mostrar(mensaje);
            }

            if (existeEstacion.val() == 1 && validacion_codigo && validacion_nombre && validacion_longitud && validacion_latitud) {
                $.ajax({
                    method: "POST",
                    url: base_url + "Estacion/crearEstacion",
                    data: {
                        nombre: input_nombre.val(),
                        codigo: input_codigo.val().charAt(0).toUpperCase(),
                        longitud: input_longitud.val(),
                        latitud: input_latitud.val()
                    }
                })
                    .done(function (r) {
                        if (r.status) {
                            console.log('Ok al guardar Estaci�n');
                            //Estacion.mensajes.oculta($('#error_ya_existe'));
                            //$('#crearEstacion').removeClass('in');
                            //$('.modal-backdrop').remove();
                            $('#crearEstacion').modal('toggle');
                            $('#resultado').html(Escritorio.load.estacion());
                            Escritorio.mensajeFlotante.mostrar($('#guardar_ok'));
                        } else {
                            console.log('Error al guardar Estacion');
                            //Estacion.mensajes.mostrar($('#error_ya_existe'));
                        }
                    });
            }
        },

        existeCodigo: function (codigo) {
            if (codigo.val() != '') {
                $.ajax({
                    method: "POST",
                    url: base_url + "Estacion/existeCodigo/" + codigo.val(),
                    data: {},
                    beforeSend: function () {
                        $('#busy_codigo').html(
                            '<i class="fa fa-spinner fa-spin fa-1x"></i>'
                        );
                    }
                })
                    .done(function (r) {
                        if (r.status) {
                            console.log('ERROR: existe codigo');
                            $('#existeCodigo').val(0);
                            Estacion.mensajes.mostrar($('#codigo_duplicado'));
                        } else {
                            console.log('OK: No existe codigo');
                            $('#existeUsuario').val(1);
                            Estacion.mensajes.oculta($('#codigo_duplicado'));
                        }
                        $('#busy_codigo').html('');
                    });
            }
        },

        existeNombre: function (nombre) {
            if (nombre.val() != '') {
                $.ajax({
                    method: "POST",
                    url: base_url + "Estacion/existeNombre/" + nombre.val(),
                    data: {},
                    beforeSend: function () {
                        $('#busy_nombre').html(
                            '<i class="fa fa-spinner fa-spin fa-1x"></i>'
                        );
                    }
                })
                    .done(function (r) {
                        if (r.status) {
                            console.log('ERROR: existe nombre estacion');
                            $('#existeNombre').val(0);
                            Estacion.mensajes.mostrar($('#nombre_duplicado'));
                        } else {
                            console.log('OK: No existe nombre estacion');
                            $('#existeNombre').val(1);
                            Estacion.mensajes.oculta($('#nombre_duplicado'));
                        }
                        $('#busy_nombre').html('');
                    });
            }
        },

        editar: function () {
            $('#btn_editar_estacion').hide();
            $('#btn_guardar_estacion').show();
            Estacion.validaciones.habilitarBotones();
        },

        guardarEditar: function () {
            var estacion_id = $('#select_estacion').val();
            var estacion_codigo = $('#editar_estacion_codigo').val().toUpperCase();
            var estacion_nombre = $('#editar_estacion_nombre').val();

            if (estacion_codigo.length > 0) {
                Estacion.mensajes.oculta($('#error_editar_codigo_estacion'));

                if (estacion_nombre.length > 0) {
                    Estacion.mensajes.oculta($('#error_edita_nombre_estacion'));

                    $.ajax({
                        method: "POST",
                        url: base_url + "Estacion/editarEstacion",
                        data: {
                            id: estacion_id,
                            nombre: estacion_nombre,
                            codigo: estacion_codigo
                        }
                    })
                        .done(function () {
                            console.log('OK: acutlizada estacoin -> ' + estacion_id);
                            Escritorio.load.estacion();
                        });
                } else {
                    Estacion.mensajes.mostrar($('#error_edita_nombre_estacion'));
                }
            } else {
                Estacion.mensajes.mostrar($('#error_editar_codigo_estacion'));
            }
        },

        cargarDatosEstacion: function () {
            var estacion_id = $('#select_estacion').val();

            if (estacion_id != null) {
                Estacion.mensajes.oculta($('#error_sin_estacion'));

                $.ajax({
                    method: "POST",
                    url: base_url + "Estacion/cargarDatosEstacion/" + estacion_id,
                    data: {},
                    beforeSend: function () {
                        $('#datos_estacion').html(
                            '<div class="col-xs-12 text-center" style="margin-top: 25px"><i class="fa fa-spinner fa-spin fa-3x"></i></div>'
                        );
                    }
                })
                    .done(function (r) {
                        $('#datos_estacion').html(r);
                    });

                Estacion.validaciones.botonEditar('mostrar');
                Estacion.validaciones.botonGuardar('ocultar');
            } else {
                Estacion.mensajes.mostrar($('#error_sin_estacion'));
            }
        },

        busqueda: function (accion) {
            if (accion == 'ocultar') {
                $('.busqueda').hide();
            }
            if (accion == 'mostrar') {
                $('.busqueda').show();
            }
        },

        limpiar: function () {
            var input_nombre = $('#nombre');
            var input_codigo = $('#codigo');
            var input_longitud = $('#longitud');
            var input_latitud = $('#latitud');

            input_nombre.val('');
            input_codigo.val('');
            input_longitud.val('');
            input_latitud.val('');
            Estacion.mensajes.oculta($('#codigo_duplicado'));
            Estacion.mensajes.oculta($('#nombre_duplicado'));
            Estacion.mensajes.oculta($('#error_codigo_parqueos'));
            Estacion.mensajes.oculta($('#error_nombre_parqueos'));
            Estacion.mensajes.oculta($('#error_longitud_parqueos'));
            Estacion.mensajes.oculta($('#error_latitud_parqueos'));
            guardar_mapa();
        }
    },

    label: {

        codigo: function () {
            var mensaje = $('#error_codigo_parqueos');
            Estacion.mensajes.oculta(mensaje);
        },

        nombre: function () {
            var mensaje = $('#error_nombre_parqueos');
            Estacion.mensajes.oculta(mensaje);
        },

        longitud: function () {
            var mensaje = $('#error_longitud_parqueos');
            Estacion.mensajes.oculta(mensaje);
        },

        latitud: function () {
            var mensaje = $('#error_latitud_parqueos');
            Estacion.mensajes.oculta(mensaje);
        },

        duplicadoCodigo: function () {
            var mensaje = $('#codigo_duplicado');
            Estacion.mensajes.oculta(mensaje);
        },

        duplicadoNombre: function () {
            var mensaje = $('#nombre_duplicado');
            Estacion.mensajes.oculta(mensaje);
        }
    },

    mensajes: {
        mostrar: function (mensaje) {
            mensaje.parent('.mensaje').removeClass(' oculto');
            mensaje.parents('.agrupador').addClass(' has-error');
        },

        oculta: function (mensaje) {
            mensaje.parent('.mensaje').addClass(' oculto');
            mensaje.parents('.agrupador').removeClass(' has-error');
        },

        mostrarAlerta: function (mensaje) {
            mensaje.parent('.mensaje').removeClass(' oculto');
            mensaje.parents('.agrupador').addClass(' has-warning');
        },

        ocultaAlerta: function (mensaje) {
            mensaje.parent('.mensaje').addClass(' oculto');
            mensaje.parents('.agrupador').removeClass(' has-warning');
        }
    },

    validaciones: {
        habilitarBotones: function () {
            var input_editar_estacion_codigo = $('#editar_estacion_codigo');
            var input_editar_estacion_nombre = $('#editar_estacion_nombre');
            var btn_crear_estacionamiento = $('#btn_crear_estacionamiento');

            btn_crear_estacionamiento.removeAttr('disabled');
            input_editar_estacion_codigo.removeAttr('disabled');
            input_editar_estacion_nombre.removeAttr('disabled');
            input_editar_estacion_nombre.removeAttr('disabled');
        },

        botonEditar: function (accion) {
            if (accion == 'ocultar')
                $('#btn_editar_estacion').hide();
            if (accion == 'mostrar')
                $('#btn_editar_estacion').show();
        },

        botonGuardar: function (accion) {
            if (accion == 'ocultar')
                $('#btn_guardar_estacion').hide();
            if (accion == 'mostrar')
                $('#btn_guardar_estacion').show();
        },

        EstacionamientoDisponible: function () {
            var estacion_id = $('#select_estacion_inventario_nuevo').val();
            var check_parquear_bicicleta = $('#parquear_bicicleta');

            $.ajax({
                method: "POST",
                url: base_url + "Estacionamiento/validarEstacionamientoDisponible/" + estacion_id,
                data: {}
            })
                .done(function (r) {
                    if (r.status) {
                        console.log('OK: estacionamiento libre -> ' + r.estacionamiento_id);
                        Estacion.mensajes.oculta($('#error_sin_parqueo'));
                        check_parquear_bicicleta.attr('disabled', false);
                        $('#opcion_parquear').removeClass('inactivo');
                    } else {
                        console.log('Error: No hay estacionamiento libre');
                        Estacion.mensajes.mostrarAlerta($('#error_sin_parqueo'));
                        check_parquear_bicicleta.attr('disabled', true);
                        $('#opcion_parquear').addClass('inactivo');
                        $('#parquear_bicicleta').attr('checked', false);
                    }
                });
        }
    }
};