import HeaderPrivate from '../../layout/header-private';
import SidebarLab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';


const iFiltro = {

    view: (_data) => {
        return [
            m("p.mg-0", [
                m("div.tx-12",
                    m("span", {
                        class: "badge badge-primary mg-l-5 mg-r-5",
                        style: { "cursor": "pointer" }
                    }, [], [m("i.fas.fa-filter"), " Ver Filtro "]),
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, _data.attrs.nombre),
                    (_data.attrs.ene == 1 ? [m("span", {
                        class: "badge badge-success mg-l-5 mg-r-5",
                    }, "Envio")] : [m("span", {
                        class: "badge badge-danger mg-l-5 mg-r-5",
                    }, "No Envio")]),





                )
            ]),

        ];
    },

};

const DetalleFiltro = {
    data: [],
    fetch: () => {

        DetalleFiltro.data = []
        for (var i = 0; i < TRPedidos.dataFiltros.length; i++) {
            if (TRPedidos.dataFiltros[i].id == TRPedidos.idFiltro) {
                DetalleFiltro.data = TRPedidos.dataFiltros[i];
            }
        }

    },
    view: () => {

        if (TRPedidos.showBitacora.length !== 0 && DetalleFiltro.data.length !== 0) {
            return [
                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                    m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                        m("small.pd-2.tx-20",
                            m("i.fas.fa-times-circle.pd-2", {
                                    "style": { "cursor": "pointer" },
                                    title: "Cerrar",
                                    onclick: () => {

                                        TRPedidos.showBitacora = "";
                                        DetalleFiltro.data = [];
                                        m.route.set("/laboratorio/notificaciones/filtros", {});


                                    }
                                }

                            )


                        ),

                    ),

                    m("div.mg-b-30",
                        m("i.tx-40.fas.fa-filter.")
                    ),
                    m("p.mg-5.tx-right", [
                        m("button.btn.btn-xs.btn-secondary.mg-l-2[type='button']", {
                                onclick: () => {

                                }
                            },
                            m("i.fas.fa-edit.mg-r-5"),
                            " Editar "

                        ),

                        m("button.btn.btn-xs.btn-danger.mg-l-2[type='button']", {
                                onclick: () => {

                                }
                            },
                            m("i.fas.fa-times-circle.mg-r-5"),
                            " Eliminar "

                        )
                    ]),
                    m("h5.tx-inverse.mg-b-10",
                        "Filtro: " + DetalleFiltro.data.nombre
                    ),

                    (DetalleFiltro.data.ene == 0 ? [
                        m("h5.tx-inverse.mg-b-10.tx-danger",
                            "Regla para: NO ENVIAR"
                        ),
                    ] : [
                        m("h5.tx-inverse.mg-b-10.tx-primary",
                            "Regla para: ENVIAR"
                        )
                    ]),

                    (DetalleFiltro.data.x_servicio !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Servicio: " + DetalleFiltro.data.x_servicio
                        )
                    ] : []),
                    (DetalleFiltro.data.x_origen !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Origen: " + DetalleFiltro.data.x_origen
                        )
                    ] : []),
                    (DetalleFiltro.data.x_motivo !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Motivo: " + DetalleFiltro.data.x_motivo
                        )
                    ] : []),
                    (DetalleFiltro.data.x_especialidad !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Especialidad: " + DetalleFiltro.data.x_especialidad
                        )
                    ] : []),
                    (DetalleFiltro.data.x_medico !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Médico: " + DetalleFiltro.data.x_medico
                        )
                    ] : []),
                    (DetalleFiltro.data.x_idprueba !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Id Prueba: " + DetalleFiltro.data.x_idprueba
                        )
                    ] : []),
                ])
            ]
        } else {

            if (TRPedidos.showBitacora.length !== 0) {
                return [
                    m("div.pd-t-10", [
                        m("div.placeholder-paragraph.wd-100p", [
                            m("div.line"),
                            m("div.line")
                        ])
                    ])

                ]
            }

        }

    }

};


const TRPedidos = {
    dataPendientesAlta: [],
    dataSoloGema: [],
    dataGemaMV: [],
    dataFiltros: [],
    dataCamaTotales: [],
    camasTotales: 0,
    showBitacora: "",
    gemaMV: 0,
    soloGema: 0,
    soloMV: 0,
    pendienteAlta: 0,
    timerUpdate: 0,
    idFiltro: "",
    searchField: "",
    fetch: () => {
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/tr/pedidos",
            })
            .then(function(result) {
                TRPedidos.dataFiltros = result.data;
                loadTRPedidos();

            })
            .catch(function(e) {})
    },

    oninit: (_data) => {
        HeaderPrivate.page = "";
        SidebarLab.page = "";
        TRPedidos.dataPendientesAlta = [];
        TRPedidos.dataCamaTotales = [];
        TRPedidos.camasTotales = 0;
        TRPedidos.pendienteAlta = 0;
        App.isAuth('laboratorio', 15);
    },
    oncreate: (_data) => {
        document.title = "Pedidos de Terapia Respiratoria | " + App.title;
        TRPedidos.fetch();
    },

    view: (_data) => {


        if (_data.attrs !== undefined && _data.attrs.idFiltro !== undefined) {

            TRPedidos.idFiltro = _data.attrs.idFiltro;
            TRPedidos.showBitacora = "d-none";
            DetalleFiltro.fetch();

        } else {
            TRPedidos.idFiltro = "";
            TRPedidos.showBitacora = "";
        }


        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m("div.content.content-components", {},
                m("div.container", {}, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),

                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Pedidos de Terapia Respiratoria:"
                        ),
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pedidos de Terapia Respiratoria:"
                    ),


                    m("div.row.animated.fadeInUp", {
                        class: TRPedidos.showBitacora
                    }, [

                        m("div.col-12", [

                            m("div.filemgr-content-header.", [
                                m("i[data-feather='search']"),
                                m("div.search-form",
                                    m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']")
                                ),

                            ]),

                            m("div.mg-t-90.table-loader.wd-100p",
                                m("div.placeholder-paragraph.", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.mg-t-70", [

                                m("table.table.table-sm.tx-12[id='table-TRPedidos'][width='100%']"),
                            ])
                        ])
                    ]),
                    m(DetalleFiltro)
                ])
            ),


        ];
    },

};



function reloadDataTables(_table_, _data_) {
    var table = $(_table_).DataTable();
    table.clear();
    table.rows.add(_data_).draw();
}

function loadTRPedidos() {

    $(".table-content").hide();
    $(".table-loader").show();

    // MOMMENT
    moment.lang("es", {
        months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
            "_"
        ),
        monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
            "_"
        ),
        weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split(
            "_"
        ),
        weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
        weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
    });

    $.fn.dataTable.ext.errMode = "none";
    var table = $("#table-TRPedidos").DataTable({
        data: TRPedidos.dataFiltros,
        dom: 'ltp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Sin Resultados",
            sEmptyTable: "Sin Resultados",
            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix: "",
            sUrl: "",
            sInfoThousands: ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior",
            },
            oAria: {
                sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente",
            },
        },
        cache: false,
        destroy: true,
        responsive: true,
        order: [
            [0, "Desc"]
        ],
        columns: [{
            title: "N°:"
        }, {
            title: "FECHA:"
        }, {
            title: "NHC:"
        }, {
            title: "PACIENTE:"
        }, {
            title: "N° ATENCION:"
        }],

        aoColumnDefs: [{
                mRender: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
            },
            {
                mRender: function(data, type, full) {
                    return full.HR_PRE_MED;
                },
                visible: true,
                aTargets: [1],

            },
            {
                mRender: function(data, type, full) {
                    return full.CD_PACIENTE;

                },
                visible: true,
                aTargets: [2],

            },
            {
                mRender: function(data, type, full) {
                    return full.NM_PACIENTE;
                },
                visible: true,
                aTargets: [3],

            },
            {
                mRender: function(data, type, full) {
                    return full.CD_ATENDIMENTO;
                },
                visible: true,
                aTargets: [4],

            },



        ],


        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {



        },
        drawCallback: function(settings) {

            $(".table-content").show();
            $(".table-loader").hide();


            /*

            settings.aoData.map(function(_v, _i) {
                m.mount(_v.anCells[0], {
                    view: function() {

                        return m(iFiltro, _v._aData)


                    }
                });


            })

            */
        },

    });


    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });


    $('#searchField').keyup(function(e) {
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#searchField').val()).draw();
    });


    return table;

};





function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}


export default TRPedidos;