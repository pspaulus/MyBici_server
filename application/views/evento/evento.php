<?php $Evento = new Evento() ?>

<!--Titulo-->
<div class="row" id="page_evento">
    <div class="col-lg-12">
        <h1 class="page-header">
            <i class="fa fa-fw fa-envelope"></i> Evento
        </h1>
    </div>
</div>

<!-- historial -->
<div class="row" id="listado_historial">
    <div class="col-xs-12">
        <ol class="breadcrumb">
            <li class="active" id="titulo4">
                <a class="dedo" onclick="Escritorio.Acciones.ocultarMostrar($('#contenido_historial'), $('#titulo4'))">
                    <i class="fa fa-clock-o"></i> Historial
                </a>
            </li>
        </ol>
    </div>
</div>

<div id="contenido_historial">
    Historial
</div>


<!-- Crear -->
<div class="row">
    <div class="col-xs-12">
        <ol class="breadcrumb">
            <li class="active" id="titulo2" data-toggle="modal" data-target="#crearEvento">
                <a class="dedo">
                    <i class="fa fa-plus-circle"></i> Agregar
                </a>
            </li>
        </ol>
    </div>
</div>

<!-- Modal Agregar bicicleta -->
<?php $Evento->load->view('evento/crear', compact('Evento.php')); ?>



<script>
    Escritorio.Acciones.ocultarMostrar($('#contenido_historial'), $('#titulo4'));
</script>

<!--Buscar-->
<div class="row" id="listado_editar">
    <div class="col-xs-12">
        <ol class="breadcrumb">
            <li class="active" id="titulo3">
                <a class="dedo" onclick="Escritorio.Acciones.ocultarMostrar($('#contenido_editar'), $('#titulo3'))">
                    <i class="fa fa-edit"></i> Editar
                </a>
            </li>
        </ol>
    </div>
</div>

<div id="contenido_editar">
    <div class="col-xs-12">
        <!-- Tabs -->
        <div class="row">
            <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" class="active">
                    <a href="#inscripciones" data-toggle="tab" role="tab">Inscripciones</a>
                </li>
                <li role="presentation">
                    <a href="#datos" data-toggle="tab" role="tab">Datos</a>
                </li>
            </ul>

            <!-- Tab panels -->
            <div id="" class="tab-content tab-contenido">

                <div role="tabpanel" class="tab-pane fade in active" id="inscripciones">
                    contenido inscripciones
                </div>

                <div role="tabpanel" class="tab-pane fade" id="datos">
                    <script>
                        Evento.acciones.cargarDatosEvento();
                    </script>
                </div>
            </div>
        </div>
    </div>
</div>

