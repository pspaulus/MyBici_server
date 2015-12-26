var Ticket = {

    acciones: {
        refrescar: function () {
            $('#resultado').html(Escritorio.load.ticket());
        },

        guardar: function () {
            var input_id = $('#ticket_id').val();
            var select_tipo = $('#ticket_tipo').val();
            var input_bicicleta_codigo = $('#ticket_bicicleta').val();
            var input_fecha = $('#ticket_fecha').val();
            var input_usuario_id = $('#ticket_usuario_codigo').val();
            var select_estacion_origen = $('#estacion_origen').val();
            var select_estacion_destino = $('#estacion_destino').val();
            var estacion_destino_parqueo_disponible = $('#estacion_destino_parqueo_disponible').val();

            var validacion_input_bicicleta_codigo = true;
            var validacion_input_usuario_id = true;
            var validacion_origen_destino = true;

            if (select_estacion_origen == select_estacion_destino) {
                validacion_origen_destino = false;
                //Estacion.mensajes.mostrar($('#error_origen_destino'));
                console.log('Error: el origen es el mismo del destino');
            }

            if (input_bicicleta_codigo == '' || input_bicicleta_codigo == '-') {
                validacion_input_bicicleta_codigo = false;
                console.log('Error: bicicleta_codigo');
            }

            if (input_usuario_id == 'Id' || input_usuario_id == '-' || input_usuario_id == '') {
                validacion_input_usuario_id = false;
                Estacion.mensajes.mostrar($('#usuario_no_existe'));
                console.log('Error: usuario_id');
            }

            if (validacion_input_usuario_id && validacion_input_bicicleta_codigo && validacion_origen_destino && (estacion_destino_parqueo_disponible == 1)) {
                $.ajax({
                    method: "POST",
                    url: "http://mybici.server/Ticket/guardarTicket",
                    data: {
                        id: input_id,
                        TIPO_id: select_tipo,
                        USUARIO_id: input_usuario_id,
                        BICICLETA_codigo: input_bicicleta_codigo,
                        origen_puesto_alquiler: select_estacion_origen,
                        destino_puesto_alquiler: select_estacion_destino,
                        fecha: input_fecha,
                        hora_retiro: null,
                        hora_entrega: null,
                        duracion: null,
                        ESTADO_id: 10
                    }
                })
                    .done(function (r) {
                        if (r.status) {
                            console.log('Ok: guardar ticket ->' + r.ticket_nuevo_id);

                            Ticket.acciones.marcarBicicletaEstadoEnUso(r.ticket_bicicleta_id, 'en_uso');

                            $('#crearTicket').removeClass('in');
                            $('.modal-backdrop').remove();
                            Ticket.acciones.refrescar();
                        } else {
                            console.log('Error: no guarda ticket');
                        }
                    });
            }
        },

        marcarBicicletaEstadoEnUso: function (id, estado) {
            $.ajax({
                method: "POST",
                url: "http://mybici.server/Bicicleta/marcarEstado/" + estado,
                data: {id: id}
            })
                .done(function (r) {
                    if (r.status) {
                        console.log('OK: cambio estado bicicleta ->' + estado);
                    } else {
                        console.log('ERROR: cambio estado bicicleta');
                    }
                });
        },

        cambiarEstado: function (ticket_id, estado) {
            $.ajax({
                method: "POST",
                url: "http://mybici.server/Ticket/cambiarEstado/" + ticket_id + '/' + estado,
                data: {}
            })
                .done(function (r) {
                    if (r.status) {
                        console.log('OK: cambio estado ticket' + r.ticket_id);

                        if (estado == 'en_curso') {
                            Ticket.acciones.marcarHora(ticket_id, 'retiro');
                            Bicicleta.acciones.quitarEstacionamiento(ticket_id);
                        }
                        if (estado == 'realizada') {
                            Ticket.acciones.marcarHora(ticket_id, 'entrega');
                            Ticket.acciones.registrarNuevoParqueo(ticket_id);
                        }

                        $('.modal-backdrop').remove();
                        Ticket.acciones.refrescar();
                    } else {
                        console.log('ERROR: cambio estado ticket');
                    }
                });
        },

        marcarHora: function (ticket_id, tipo_hora) {
            $.ajax({
                method: "POST",
                url: "http://mybici.server/Ticket/marcarHora/" + ticket_id + '/' + tipo_hora,
                data: {}
            })
                .done(function (r) {
                    if (r.status) {
                        console.log('OK: registro hora retiro');
                    } else {
                        console.log('ERROR: registro hora retiro');
                    }
                });
        },

        registrarNuevoParqueo: function (ticket_id) {
            $.ajax({
                method: "POST",
                url: "http://mybici.server/Bicicleta/registrarNuevoParqueo/" + ticket_id,
                data: {}
            })
                .done(function (r) {
                    if (r.status) {
                        console.log('OK: registro bicicleta en nuevo parqueo' + r.movimiento);
                    } else {
                        console.log('ERROR: registro bicicleta en nuevo parqueo');
                    }
                });
        },

        cargarListaTicketPorEstacion: function () {
            var estacion_id = $('#select_ticket_estacion').val();
            var estado_id = $('#select_estado_ticket').val();

            $.ajax({
                method: "POST",
                url: "http://mybici.server/Ticket/cargarListaTicketPorEstacion/" + estacion_id + '/' + estado_id,
                data: {}
            })
                .done(function (r) {
                    $('#listado_ticket').html(r);
                });

        },

        cargarListaTicketPorCampo: function () {
            var campo = $('#ticket_campo').val();
            var valor = $('#ticket_valor').val();

            if (valor.length != '') {
                $.ajax({
                    method: "POST",
                    url: "http://mybici.server/Ticket/cargarListaTicketPorCampo/" + campo + '/' + valor,
                    data: {}
                })
                    .done(function (r) {
                        $('#listado_ticket').html(r);
                    });
            } else {
                Estacion.mensajes.mostrar($('#error_no_valor'));
            }
        },

        cargarListaTicketPorUsuario: function () {
            var campo = $('#ticket_campo').val();
            var valor = $('#ticket_valor').val();

            if (valor.length != '') {
                $.ajax({
                    method: "POST",
                    url: "http://mybici.server/Ticket/cargarListaTicketPorCampo/" + campo + '/' + valor,
                    data: {}
                })
                    .done(function (r) {
                        $('#listado_ticket').html(r);
                    });
            } else {
                Estacion.mensajes.mostrar($('#error_no_valor'));
            }
        },

        //buscar: function () {
        //    var campo = $('#ticket_campo').val();
        //    var valor = $('#ticket_valor').val();
        //
        //    if (valor.length != '') {
        //        $.ajax({
        //            method: "POST",
        //            url: "http://mybici.server/Ticket/cargarTicket/" + campo + '/' + valor,
        //            data: {}
        //        })
        //            .done(function (r) {
        //                if (r.status) {
        //                    Estacion.mensajes.oculta($('#error_no_valor'));
        //                    console.log('OK: cargar ticket ->' + r.ticket);
        //                } else {
        //                    console.log('ERROR: cargar ticket');
        //                }
        //            });
        //
        //    } else {
        //        Estacion.mensajes.mostrar($('#error_no_valor'));
        //    }
        //},

        limpiar: function () {
            $('#estacion_origen').prop('selectedIndex', 0);
            $('#estacion_destino').prop('selectedIndex', 1);
            Estacion.mensajes.oculta($('#estacion_sin_bicicleta'));
            Estacion.mensajes.oculta($('#usuario_no_existe'));
        },

        cargarBicicletaDisponible: function () {
            var select_estacion_origen = $('#estacion_origen');

            $.ajax({
                method: "POST",
                url: "http://mybici.server/Bicicleta/cargarBicicletaDisponible/" + select_estacion_origen.val(),
                data: {}
            })
                .done(function (r) {
                    if (r.status) {
                        $('#ticket_bicicleta').val(r.codigo_bicicleta);
                        Estacion.mensajes.oculta($('#estacion_sin_bicicleta'));
                    } else {
                        $('#ticket_bicicleta').val('-');
                        Estacion.mensajes.mostrar($('#estacion_sin_bicicleta'));
                    }
                });
        },

        validarEstacionamientoDisponible: function () {
            var estacion_destino_id = $('#estacion_destino').val();
            var estacion_destino_parqueo_disponible = $('#estacion_destino_parqueo_disponible');

            $.ajax({
                method: "POST",
                url: "http://mybici.server/Estacionamiento/validarEstacionamientoDisponible/" + estacion_destino_id,
                data: {}
            })
                .done(function (r) {
                    if (r.status) {
                        estacion_destino_parqueo_disponible.val(1);
                        console.log('OK: estacionamiento libre -> ' + r.estacionamiento_id);
                        Estacion.mensajes.oculta($('#error_sin_parqueo'));
                    } else {
                        estacion_destino_parqueo_disponible.val(0);
                        console.log('Error: No hay estacionamiento libre');
                        Estacion.mensajes.mostrar($('#error_sin_parqueo'));
                    }
                });
        },

        validarOrigenDestino: function () {
            var select_estacion_origen = $('#estacion_origen').val();
            var select_estacion_destino = $('#estacion_destino').val();

            if (select_estacion_origen == select_estacion_destino) {
                Estacion.mensajes.mostrar($('#error_origen_destino'));
            } else {
                Estacion.mensajes.oculta($('#error_origen_destino'));
            }
        },

        quitarDestinoRepetido: function () {
            var select_estacion_origen = $('#estacion_origen');
            //var select_estacion_destino = $('#estacion_destino');
            var valor = select_estacion_origen.val();

            $("#estacion_destino option[value=" + valor + "]").remove();
        },

        agregarDestinoRepetido: function () {
            var select_estacion_origen = $('#estacion_origen');
            //var select_estacion_destino = $('#estacion_destino');
            var valor = select_estacion_origen.val();
            var texto = $("#estacion_origen option:selected").text();

            $("#estacion_destino").append('<option value="' + valor + '">' + texto + '</option>');
            //Ticket.acciones.quitarDestinoRepetido();
        }

    }
};