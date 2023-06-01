import HeaderPrivate from '../../layout/header-private';
import SidebarAdm from '../sidebarAdm';
import App from '../../app';
import m from 'mithril';

const opcionesPaciente = {

    view: (_data) => {

        if (_data.attrs.STS_MV == 1) {


            return [
                m(".btn-group[role='group'][aria-label='Opciones']", [

                    m(".", { class: "btn btn-xs btn-success mg-r-5" }, [
                        m("i.fas.fa-file-alt.mg-r-5"),
                    ], "Paciente ya esta en MV"),
                    m(".", { class: "btn btn-xs btn-outline-primary mg-r-5" }, [
                        m("i.fas.fa-file-alt.mg-r-5"),
                    ], "Presentar Datos al Paciente"),



                ])

            ];

        } else {

            return [
                m(".btn-group[role='group'][aria-label='Opciones']", [
                    m(".", { class: "btn btn-xs btn-primary mg-r-5" }, [
                        m("i.fas.fa-file-alt.mg-r-5"),
                    ], "Enviar Datos a MV"),
                    m(".", { class: "btn btn-xs btn-outline-primary mg-r-5" }, [
                        m("i.fas.fa-file-alt.mg-r-5"),
                    ], "Presentar Datos al Paciente"),



                ])

            ];
        }


    },

};

const iPaciente = {

    view: (_data) => {
        return [
            m("div", { style: { "width": "max-content" } }, [
                m("p.mg-0.tx-16", [
                    m("i.fas.fa-user.mg-r-5.text-secondary"),
                    _data.attrs.PRIMER_APELLIDO + " " + _data.attrs.SEGUNDO_APELLIDO + " " + _data.attrs.PRIMER_NOMBRE + " " + _data.attrs.SEGUNDO_NOMBRE,
                ]),
                m("p.mg-0.tx-5.mg-r-5",
                    "FECHA DE NACIMIENTO: " + _data.attrs.FECHA_NACIMIENTO
                ),
                m("p.mg-0.tx-5.mg-r-5",
                    "SEXO: " + _data.attrs.SEXO
                ),
                m("p.mg-0.tx-5.mg-r-5",
                    "ESTADO CIVIL: " + _data.attrs.ESTADO_CIVIL
                ),

            ])

        ];
    },

};

const PacientesAdmisiones = {
    pacientes: [],
    showPacientes: "d-none",
    showBusquedas: "d-none",
    tipoBusqueda: "",
    searchField: "",
    showProcess: "d-none",
    fetchUltimasBusquedas: () => {

        PacientesAdmisiones.showBusquedas = "d-none";
        PacientesAdmisiones.showPacientes = "d-none";
        PacientesAdmisiones.showProcess = "";

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
        var table = $("#table-ultimas-busquedas").DataTable({
            "ajax": {
                url: "https://api.hospitalmetropolitano.org/t/v1/ultimas-consultas",
                dataSrc: "data",
                serverSide: true,
            },
            processing: true,
            serverSide: true,
            responsive: false,
            dom: 'tp',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados.",
                sEmptyTable: "Ningún dato disponible en esta tabla",
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
            order: false,
            columns: [{
                title: "ID:"
            }, {
                title: "HC"
            }, {
                title: "PACINTE"
            }, {
                title: "FECHA:"
            }, {
                title: "PACIENTE:"
            }, {
                title: "OPCIONES:"
            }, ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.HC_MV;
                    },
                    visible: false,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.PTE_MV;

                    },
                    visible: false,
                    aTargets: [2],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return "";
                    },
                    visible: true,
                    aTargets: [3],
                    width: "15%",

                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return "";
                    },
                    visible: true,
                    aTargets: [4],
                    width: "50%",
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return "";
                    },
                    visible: true,
                    aTargets: [5],
                    width: "35%",
                    orderable: false,

                },
            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
            drawCallback: function(settings) {

                PacientesAdmisiones.showBusquedas = "";
                PacientesAdmisiones.showProcess = "d-none";

                /*
                settings.aoData.map(function(_i) {


                    m.mount(_i.anCells[3], {
                        view: function() {
                            return m("p.mg-0.tx-12", [
                                m("i.fas.fa-calendar.mg-r-5.text-secondary"),
                                _i._aData.DT_ATENDIMENTO
                            ])
                        }
                    });
                    m.mount(_i.anCells[4], { view: function() { return m(iPaciente, _i._aData) } });
                    m.mount(_i.anCells[5], {
                        view: function() {

                            return m(".btn-group.wd-100p[role='group'][aria-label='Opciones']", [
                                m("a.btn.btn-xs.btn-primary", { href: _i._aData.URL, target: "_blank" }, [
                                    m("i.fas.fa-file-alt.mg-r-5"),
                                ], "Ver Receta de Alta"),

                            ])



                        }
                    });
                })

                */


            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });

        return table;
    },

    fetchPacientes: () => {
        PacientesAdmisiones.showBusquedas = "d-none";
        PacientesAdmisiones.showPacientes = "d-none";
        PacientesAdmisiones.showProcess = "";

        if (PacientesAdmisiones.tipoBusqueda.length === 0 && PacientesAdmisiones.tipoBusqueda.length === 0) {
            PacientesAdmisiones.tipoBusqueda = "cc";
        }


        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/pacientes-admisiones",
                body: {
                    tipoBusqueda: PacientesAdmisiones.tipoBusqueda,
                    pte: PacientesAdmisiones.searchField,
                }
            })
            .then(function(res) {
                PacientesAdmisiones.showPacientes = "";
                PacientesAdmisiones.showProcess = "d-none";
                PacientesAdmisiones.pacientes = res.data;

                var table = $('#table-pacientes').DataTable();
                table.clear();
                table.rows.add(PacientesAdmisiones.pacientes).draw();
            })
            .catch(function(e) {});

    },
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarAdm.page = "";
        PacientesAdmisiones.searchField = "";
        PacientesAdmisiones.showBusquedas = "";
        PacientesAdmisiones.pacientes = [];
        App.isAuth();
    },
    oncreate: () => {
        document.title = "Pacientes de Admisiones | " + App.title;
        PacientesAdmisiones.fetchUltimasBusquedas();

        //  Action
        setTimeout(function() { document.getElementById("cc").click(); }, 500);
        loadPacientes();
        submitBusqueda();
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("admisiones") }),
            m(SidebarAdm, { oncreate: SidebarAdm.setPage(7) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " Metrovirtual "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admisiones "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Pacientes de Admisiones"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pacientes de Admisiones:"
                    ),

                    m("div.row.tx-14", [
                        m("div.col-12.mg-b-10.wd-100p",
                            m("div.row.mg-t-10", [
                                m("div.col-sm-12.pd-b-10.mg-b-10", [
                                        m("label.nav-label.tx-semibold",
                                            "Búsqueda de Pacientes:"
                                        ),
                                        m("hr"),
                                        m('label.d-none', [
                                            m("i.fas.fa-info-circle.mg-r-2"),
                                            "Buscar por NHC o Nombres y Apellidos completos del Paciente"
                                        ]),
                                        m("div.mg-b-5.d-flex", [
                                            m("div.custom-control.custom-radio.mg-r-15", [
                                                m("input.custom-control-input[type='radio'][id='cc'][name='tipoBusqueda'][value='cc']", {
                                                    onclick: (e) => {
                                                        if (e.target.checked) {
                                                            PacientesAdmisiones.tipoBusqueda = e.target.value;
                                                        }
                                                    }
                                                }),
                                                m("label.custom-control-label[for='cc']",
                                                    "Cédula"
                                                )
                                            ]),
                                            m("div.custom-control.custom-radio.mg-r-15", [
                                                m("input.custom-control-input[type='radio'][id='pas'][name='tipoBusqueda'][value='pas']", {
                                                    onclick: (e) => {
                                                        if (e.target.checked) {
                                                            PacientesAdmisiones.tipoBusqueda = e.target.value;
                                                        }
                                                    }
                                                }),
                                                m("label.custom-control-label[for='pas']",
                                                    "Pasaportte"
                                                )
                                            ]),
                                            m("div.custom-control.custom-radio.mg-r-15", [
                                                m("input.custom-control-input[type='radio'][id='pte'][name='tipoBusqueda'][value='pte']", {
                                                    onclick: (e) => {
                                                        if (e.target.checked) {
                                                            PacientesAdmisiones.tipoBusqueda = e.target.value;
                                                        }
                                                    }
                                                }),
                                                m("label.custom-control-label[for='pte']",
                                                    "Apellidos y Nombres completos"
                                                )
                                            ])
                                        ]),
                                        m("div.mg-t-15.input-group", [
                                            m("input.form-control.mg-b-20.wd-100p[placeholder='Buscar por NHC o Nombres y Apellidos completos del Paciente'][title='Buscar'][type='text']", {
                                                oninput: (e) => {
                                                    PacientesAdmisiones.searchField = e.target.value.toUpperCase();
                                                },
                                                value: PacientesAdmisiones.searchField
                                            }),
                                            m("div.input-group-append",
                                                m("button.btn.btn-outline-light[type='button']", {
                                                    onclick: () => {
                                                        PacientesAdmisiones.fetchPacientes();
                                                    }
                                                }, [
                                                    m("i.icon.ion-md-search"),
                                                    " Buscar "
                                                ]),

                                            )
                                        ])
                                    ]


                                ),
                            ])
                        ),
                        m("div.table-loader.col-12.wd-100p", {
                                class: PacientesAdmisiones.showProcess,
                            },
                            m("div.placeholder-paragraph", [
                                m("div.line"),
                                m("div.line")
                            ])
                        ),
                        m("div.col-12", {
                            class: "d-none",
                        }, [
                            m("label.nav-label.tx-semibold",
                                "Búsquedas Recientes:"
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-ultimas-busquedas'][width='100%']"),
                            )
                        ]),
                        m("div.col-12", {
                            class: PacientesAdmisiones.showPacientes,
                        }, [

                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-pacientes'][width='100%']"),
                            )
                        ])
                    ]),
                ])
            ),
            m("div.section-nav", [
                m("label.nav-label.mg-b-10",
                    "Opciones Pacientes"
                ),
                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                    m("div.mg-b-25.d-none",
                        m("i.wd-50.ht-50.tx-gray-500[data-feather='cast']")
                    ),
                    m("p.mg-b-20.d-none",
                        "Presentar datos personales al Paciente"
                    ),
                    m("button.btn.btn-primary.tx-semibold.d-none[type='button']", [
                        m("i.tx-white.mg-r-2[data-feather='cast']"),
                        "Presentar"
                    ])
                ])
            ])
        ];
    },

};

function submitBusqueda() {
    document.onkeypress = function(e) {
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == "13") {
            $(".table-loader").removeClass("d-none");
            $(".table-content").addClass("d-none");
            PacientesAdmisiones.fetchPacientes();
        }
    };
}


function loadPacientes() {


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
    var table = $("#table-pacientes").DataTable({
        data: PacientesAdmisiones.pacientes,
        responsive: false,
        dom: 'ltp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Todavía no tienes resultados.",
            sEmptyTable: "Ningún dato disponible en esta tabla",
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
        columns: [{
                title: "Nº:"
            },
            {
                title: "NHC:"
            }, {
                title: "N° ADM:"
            },
            {
                title: "PACIENTE:"
            },


        ],
        aoColumnDefs: [{
                mRender: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return full.HC;
                },
                visible: true,
                aTargets: [1],
                orderable: true,

            },
            {
                mRender: function(data, type, full) {
                    return full.TOTAL_ADM;
                },
                visible: true,
                aTargets: [2],
                orderable: true,

            },
            {
                mRender: function(data, type, full) {
                    //DATA PACIENTE
                    return '';
                },
                visible: true,
                aTargets: [3],
                orderable: false,

            },



        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

        },
        drawCallback: function(settings) {

            $(".table-loader").addClass("d-none");
            $(".table-content").removeClass("d-none");

            settings.aoData.map(function(_i) {

                m.mount(_i.anCells[3], {
                    view: function() {
                        return [
                            m(iPaciente, _i._aData),
                            m(opcionesPaciente, _i._aData),



                        ]
                    }
                });

            })
        },
    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });

    return table;

}

export default PacientesAdmisiones;