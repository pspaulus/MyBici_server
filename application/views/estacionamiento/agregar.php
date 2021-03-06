<div class="modal fade" id="agregarBicicleta_<?= $estacionamiento->id ?>" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-sm" role="document">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel"><i class="fa fa-plus-circle"></i> Estacionar Bicicleta</h4>
            </div>

            <div class="modal-body">
                <form class="form-horizontal" id="form_estacion">
                    <div class="row">

                        <!--Bicicleta-->
                        <div class="form-group">
                            <div class="col-xs-3 col-xs-offset-1">
                                <label for="bicicleta_codigo_<?= $estacionamiento->id ?>">C&oacute;digo</label>
                            </div>
                            <div class="agrupador">
                                <div class="col-xs-4">
                                    <input class="form-control" id="bicicleta_codigo_<?= $estacionamiento->id ?>"
                                           type="text" maxlength="5" placeholder="GB1"
                                           onkeyup="Estacion.mensajes.oculta($('#no_existe_bicicleta_codigo_<?= $estacionamiento->id ?>'));
                                                    Estacion.mensajes.oculta($('#error_bicicleta_codigo_<?= $estacionamiento->id ?>'));
                                                    Estacion.mensajes.oculta($('#bicicleta_ya_estacionada_<?= $estacionamiento->id ?>'));
                                                    Estacion.mensajes.oculta($('error_bicicleta_codigo_<?= $estacionamiento->id ?>'));">
                                </div>
                                <div id="busy_agregar"></div>
                                <span id="info_cantidad" data-toggle="tooltip" data-placement="bottom"
                                      title="GB1 = C&oacute;digo de Estaci&oacute;n + 'B' + Secuencia de bicicleta"><i
                                        class="fa fa-info-circle"></i></span>
                                <div class="col-xs-10 col-xs-offset-1 contraer textoCentrado mensaje oculto">
                                    <label class="control-label"
                                           id="no_existe_bicicleta_codigo_<?= $estacionamiento->id ?>">&iexcl;C&oacute;digo
                                        de bicicleta no existe!</label>
                                </div>
                                <div class="col-xs-10 col-xs-offset-1 contraer textoCentrado mensaje oculto">
                                    <label class="control-label"
                                           id="error_bicicleta_codigo_<?= $estacionamiento->id ?>">&iexcl;Error de
                                        c&oacute;digo de bicicleta!</label>
                                </div>
                                <div class="col-xs-10 col-xs-offset-1 contraer textoCentrado mensaje oculto">
                                    <label class="control-label"
                                           id="bicicleta_ya_estacionada_<?= $estacionamiento->id ?>">&iexcl;La bicicleta
                                        ya se encuentra estacionada en el estacionamiento <span id="codigo_estacion"></span>!</label>
                                </div>
                                <div class="col-xs-10 col-xs-offset-1 contraer textoCentrado mensaje oculto">
                                    <label class="control-label"
                                           id="bicicleta_danada_<?= $estacionamiento->id ?>">&iexcl;La bicicleta
                                        se encuentra da�ada o reparaci%oacute;n!</label>
                                </div>
                                <div class="col-xs-10 col-xs-offset-1 contraer textoCentrado mensaje oculto text-left">
                                    <label class="control-label"
                                           id="bicicleta_en_uso_<?= $estacionamiento->id ?>">&iexcl;La bicicleta est&aacute;
                                        en una reserva o en uso!</label>
                                </div>
                            </div>
                        </div>
                        <script>
                            $('document').ready(function () {
                                $('[data-toggle="tooltip"]').tooltip();
                            });
                        </script>

                    </div>
                </form>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"
                        onclick="Estacionamiento.acciones.limpiarAgregar(<?= $estacionamiento->id ?>)">Cancelar
                </button>
                <button type="button" class="btn btn-primary"
                        onclick="Estacionamiento.acciones.obtenerCodigoBicicleta(<?= $estacionamiento->id ?>)">
                    Estacionar
                </button>
            </div>

        </div>
    </div>
</div>