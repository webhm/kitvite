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
        for (var i = 0; i < FiltrosLab.dataFiltros.length; i++) {
            if (FiltrosLab.dataFiltros[i].id == FiltrosLab.idFiltro) {
                DetalleFiltro.data = FiltrosLab.dataFiltros[i];
            }
        }

    },
    view: () => {

        if (FiltrosLab.showBitacora.length !== 0 && DetalleFiltro.data.length !== 0) {
            return [
                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                    m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                        m("small.pd-2.tx-20",
                            m("i.fas.fa-times-circle.pd-2", {
                                "style": { "cursor": "pointer" },
                                title: "Cerrar",
                                onclick: () => {

                                    FiltrosLab.showBitacora = "";
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

            if (FiltrosLab.showBitacora.length !== 0) {
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


const FiltrosLab = {
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
    fetch: () => {
        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/nss/v1/listar/ordenes?type=reglas",
        })
            .then(function (result) {
                FiltrosLab.dataFiltros = result.data;
                loadFiltrosLab();

            })
            .catch(function (e) { })
    },

    oninit: (_data) => {
        HeaderPrivate.page = "";
        SidebarLab.page = "";
        FiltrosLab.dataPendientesAlta = [];
        FiltrosLab.dataCamaTotales = [];
        FiltrosLab.camasTotales = 0;
        FiltrosLab.pendienteAlta = 0;
        App.isAuth('laboratorio', 15);
    },
    oncreate: (_data) => {
        document.title = "Reglas Filtros | " + App.title;
        FiltrosLab.fetch();

    },

    view: (_data) => {

        if (_data.attrs !== undefined && _data.attrs.idFiltro !== undefined) {

            FiltrosLab.idFiltro = _data.attrs.idFiltro;
            FiltrosLab.showBitacora = "d-none";
            DetalleFiltro.fetch();
            console.log(DetalleFiltro.data)

        } else {
            FiltrosLab.idFiltro = "";
            FiltrosLab.showBitacora = "";
        }


        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components", {
                style: { "margin-right": "0px" }
            },
                m("div.container", {
                    style: { "max-width": "none" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio/notificaciones" }, [
                                " Notificaciones de Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Reglas Filtros:"
                        ),
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Reglas Filtros:"
                    ),


                    m("div.row.animated.fadeInUp", {
                        class: FiltrosLab.showBitacora
                    }, [

                        m("div.col-12", [
                            m("p.mg-b-20.tx-right", [
                                m("button.btn.btn-xs.btn-primary.mg-l-2[type='button']", {
                                    onclick: () => {

                                    }
                                },
                                    m("i.fas.fa-plus.mg-r-5"),
                                    " Nueva Regla "

                                ),


                            ]),
                            m("div.filemgr-content-header.", [
                                m("i[data-feather='search']"),
                                m("div.search-form",
                                    m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']")
                                ),

                            ]),
                            m("div.mg-t-50.table-loader.wd-100p",
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20..mg-t-40", [

                                m("table.table.table-sm.tx-12[id='table-filtroslab'][width='100%']"),
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

function loadFiltrosLab() {

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
    var table = $("#table-filtroslab").DataTable({
        data: FiltrosLab.dataFiltros,
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
        columns: [{
            title: "N°:"
        }, {
            title: "REGLA:"
        }, {
            title: "TIPO:"
        }, {
            title: "FECHA:"
        }, {
            title: "SERVICIO:"
        }, {
            title: "ORIGEN:"
        }, {
            title: "MOTIVO:"
        }, {
            title: "ESPECIALIDAD:"
        }, {
            title: "MÉDICO:"
        }, {
            title: "ID PRUEBA:"
        }, {
            title: "QR:"
        },],

        aoColumnDefs: [{
            mRender: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            },
            visible: true,
            aTargets: [0],
        },
        {
            mRender: function (data, type, full) {
                return full.nombreFiltro;
            },
            visible: true,
            aTargets: [1],

        },
        {
            mRender: function (data, type, full) {

                if (full.eNe == 0) {
                    return " NO ENVIAR ";
                } else {
                    return " ENVIAR ";
                }

            },
            visible: true,
            aTargets: [2],

        },
        {
            mRender: function (data, type, full) {
                return moment.utc(moment()).format('DD-MM-YYYY');
            },
            visible: true,
            aTargets: [3],


        },
        {
            mRender: function (data, type, full) {
                return full.xServicio;
            },
            visible: true,
            aTargets: [4],

        },
        {
            mRender: function (data, type, full) {
                return full.xOrigen;
            },
            visible: true,
            aTargets: [5],


        },
        {
            mRender: function (data, type, full) {
                return full.xMotivo;
            },
            visible: true,
            aTargets: [6],


        },
        {
            mRender: function (data, type, full) {
                return full.xMedico;
            },
            visible: true,
            aTargets: [7],


        },
        {
            mRender: function (data, type, full) {
                return full.x_medico;
            },
            visible: true,
            aTargets: [8],


        },
        {
            mRender: function (data, type, full) {
                return full.xIdPrueba;
            },
            visible: true,
            aTargets: [9],


        },
        {
            mRender: function (data, type, full) {
                return full.xQR;
            },
            visible: true,
            aTargets: [10],


        },

        ],


        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            $(nRow).attr('id', aData.id);
            if (aData.eNe == 0) {
                $(nRow).addClass("tx-danger");
            } else {
                $(nRow).addClass("tx-primary");
            }
            $(nRow).css("cursor", "pointer");
            $(nRow).addClass("verRegla");

        },
        drawCallback: function (settings) {

            $(".table-content").show();
            $(".table-loader").hide();

            $('.verRegla').click(function (e) {

                e.preventDefault();
                var $this = this;
                FiltrosLab.showBitacora = "d-none";
                m.route.set("/laboratorio/notificaciones/filtros/", {
                    idFiltro: $this.id,
                });

            });

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
    $('#searchField').keyup(function (e) {
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


export default FiltrosLab;