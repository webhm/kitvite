import SidebarPato from '../sidebarPato';
import Notificaciones from '../../../models/notificaciones';
import m from 'mithril';

function stopwatchModel() {
    return {
        interval: null,
        seconds: 100,
        isPaused: false
    };
}

const actions = {
    showFilter: true,
    showSearch: true,
    show: false,
    increment(model) {
        model.seconds--;
        if (model.seconds == 0) {
            window.location.reload();
        }
        m.redraw();
    },

    start(model) {
        model.interval = setInterval(actions.increment, 1000, model);
    },
    stop(model) {
        model.interval = clearInterval(model.interval);
    },
    reset(model) {
        model.seconds = 100;
    },
    toggle(model) {
        if (model.isPaused) {
            actions.start(model);
        } else {
            actions.stop(model);
        }
        model.isPaused = !model.isPaused;
    }
};

function Stopwatch() {
    const model = stopwatchModel();
    actions.start(model);
    return {
        view() {
            return [
                m("div.mg-b-0", [
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                        m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                            "Actualización en:"
                        ),

                    ]),
                    m("div.d-flex.justify-content-between.mg-b-5", [
                        m("h5.tx-normal.tx-rubik.mg-b-0",
                            model.seconds + "s."
                        ),
                        m("h5.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                            m("small.pd-2.tx-15",
                                (model.isPaused ? [m("i.fas.fa-play.pd-2", {
                                    title: "Start",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }
                                })] : [m("i.fas.fa-pause.pd-2", {
                                    title: "Pause",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }

                                })]),


                            ),



                        ),


                    ]),
                    m("div.progress.ht-4.mg-b-0.op-5",
                        m(".progress-bar.bg-primary.[role='progressbar'][aria-valuenow='" + model.seconds + "'][aria-valuemin='0'][aria-valuemax='60']", {
                            oncreate: (el) => {
                                el.dom.style.width = "100%";

                            },
                            onupdate: (el) => {
                                el.dom.style.width = model.seconds + "%";

                            },

                        })
                    )
                ]),

            ];



        },
        onremove() {
            actions.stop(model);
        },

    };
};


const tablePatologiaSeguimientos = {
    oncreate: () => {
        PatologiaSeguimientos.loadPedidos();
        if (PatologiaSeguimientos.searchField.length !== 0) {
            var table = $('#table-PatologiaSeguimientos').DataTable();
            table.search(PatologiaSeguimientos.searchField).draw();
        }

    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Patología:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (PatologiaSeguimientos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaSeguimientos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaSeguimientos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaSeguimientos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }

                                    },
                                    onupdate: (el) => {
                                        if (PatologiaSeguimientos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaSeguimientos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }

                                        if (PatologiaSeguimientos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }

                                        if (PatologiaSeguimientos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    }
                                }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (PatologiaSeguimientos.idFiltro == 1 ? 'd-none' : 'd-flex')
                            }, [
                                m("div.link-03", {
                                        title: "Desde"
                                    },
                                    m(".tx-10.pd-r-0", {
                                        style: { "padding-top": "10px" }
                                    }, 'Desde:')
                                ),
                                m("div.link-03", {
                                        style: { "cursor": "pointer" },
                                        title: "Desde"
                                    },
                                    m("input.tx-light.pd-4[type='date'][id='desde']", {
                                        oncreate: (el) => {
                                            el.dom.value = (PatologiaSeguimientos.idFiltro !== 1 ? moment(moment(PatologiaSeguimientos.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaSeguimientos.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaSeguimientos.loader = true;
                                            PatologiaSeguimientos.pedidos = [];
                                            PatologiaSeguimientos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaSeguimientos.idFiltro + "&fechaDesde=" + PatologiaSeguimientos.fechaDesde + "&fechaHasta=" + PatologiaSeguimientos.fechaHasta);
                                        },
                                        style: {
                                            "border": "transparent"
                                        }
                                    })
                                ),
                                m("div.link-03", {
                                        title: "Hasta"
                                    },
                                    m(".tx-10.pd-r-0", {
                                        style: { "padding-top": "10px" }
                                    }, 'Hasta:')
                                ),
                                m("div.link-03", {
                                        style: { "cursor": "pointer" },
                                        title: "Hasta"
                                    },
                                    m("input.tx-light.pd-4[type='date'][id='hasta']", {
                                        oncreate: (el) => {
                                            el.dom.value = (PatologiaSeguimientos.idFiltro !== 1 ? moment(moment(PatologiaSeguimientos.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaSeguimientos.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaSeguimientos.loader = true;
                                            PatologiaSeguimientos.pedidos = [];
                                            PatologiaSeguimientos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaSeguimientos.idFiltro + "&fechaDesde=" + PatologiaSeguimientos.fechaDesde + "&fechaHasta=" + PatologiaSeguimientos.fechaHasta);
                                        },
                                        style: {
                                            "border": "transparent"
                                        }
                                    })
                                )
                            ]),
                            m("div.dropdown.dropleft", [
                                m("div.link-03.lh-0.mg-l-5[id='dropdownMenuButton'][data-toggle='dropdown'][aria-haspopup='true'][aria-expanded='false']", {
                                        style: { "cursor": "pointer" },
                                        title: "Filtrar"
                                    },
                                    m("i.fas.fa-filter.tx-18.pd-5")
                                ),
                                m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                    m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                        "FILTROS:"
                                    ),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=1" }, [
                                        "Pedidos de Hoy"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=2&fechaDesde=" + PatologiaSeguimientos.fechaDesde + "&fechaHasta=" + PatologiaSeguimientos.fechaHasta }, [
                                        "Pedidos de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=3&fechaDesde=" + PatologiaSeguimientos.fechaDesde + "&fechaHasta=" + PatologiaSeguimientos.fechaHasta }, [
                                        "Pedidos de Hospitalización"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=4&fechaDesde=" + PatologiaSeguimientos.fechaDesde + "&fechaHasta=" + PatologiaSeguimientos.fechaHasta }, [
                                        "Pedidos de C. Externa"
                                    ]),

                                ])
                            ])
                        ])
                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (PatologiaSeguimientos.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function(e) { PatologiaSeguimientos.searchField = e.target.value; },
                                value: PatologiaSeguimientos.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-PatologiaSeguimientos'][width='100%']"),


                ])
            ])
        ]);
    }
};

const PatologiaSeguimientos = {
    notificaciones: [],
    pedidos: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",
    oninit: (_data) => {

        SidebarPato.page = "";

    },
    oncreate: (_data) => {
        
    },
    loadPedidos: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-PatologiaSeguimientos").DataTable({
            data: PatologiaSeguimientos.pedidos,
            dom: 'ltp',
            responsive: true,
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados disponibles.",
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
            order: [
                [0, "Desc"]
            ],
            destroy: true,
            columns: [{
                    title: "N°:",
                },
                {
                    title: "Fecha:",
                },
                {
                    title: "Pres. N°:",
                },
                {
                    title: "Paciente:",
                },
                {
                    title: "Médico:",
                },
                {
                    title: "Opciones:",
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
                        return full.fechaPedido;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.codigoPedido;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.paciente;
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: false,
                }, {
                    mRender: function(data, type, full) {
                        return full.descPrestadorSolicitante;

                    },
                    visible: true,
                    aTargets: [4],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return 'OPCIONES';

                    },
                    visible: true,
                    aTargets: [5],
                    orderable: false,
                },


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td.wd-5p", {
                                class: (aData.TP_ATENDIMENTO == 'I' ? 'bg-primary' : 'bg-danger')
                            }, [

                                (aData.TP_ATENDIMENTO == 'I' ? m("span.badge.badge-pill.badge-primary.wd-100p.mg-b-1",
                                    'I'
                                ) : m("span.badge.badge-pill.badge-danger.wd-100p.mg-b-1",
                                    'E'
                                ))
                            ]),
                            m("td.wd-10p", { "style": {} },
                                aData.FECHA_PEDIDO + " " + aData.HORA_PEDIDO
                            ),
                            m("td.wd-10p", { "style": {} },
                                m("span.tx-semibold.tx-dark.tx-15.mg-b-1",
                                    aData.CD_PRE_MED
                                ),
                            ),
                            m("td.wd-40p", { "style": {} }, [
                                    m('.d-inline.mg-r-5', {
                                        class: (aData.SECTOR == 'EMERGENCIA' ? "tx-danger" : "tx-primary")
                                    }, aData.SECTOR + " " + aData.UBICACION),
                                    m('br'),
                                    "NHC: " + aData.CD_PACIENTE + " ATENCIÓN N°:" + aData.AT_MV,
                                    m('br'),
                                    aData.EDAD + " " + aData.PESO + " " + aData.ALTURA,
                                    m('br'),
                                    m('.d-inline.tx-semibold', aData.NM_PACIENTE),
                                    m('br'),
                                ]

                            ),
                            m("td.wd-40p", { "style": {} },
                                aData.MED_MV

                            ),


                            m("td.tx-center.tx-semibold", {
                                    onclick: () => {
                                        m.route.set("/patologia/pedido/", {
                                            numeroHistoriaClinica: aData.CD_PACIENTE,
                                            numeroAtencion: aData.AT_MV,
                                            numeroPedido: aData.CD_PRE_MED,
                                            track: "view",
                                        });
                                    },
                                    "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                                },
                                " Ver Pedido "

                            )





                        ];
                    },
                });
            },
            drawCallback: function(settings) {

                PatologiaSeguimientos.loader = false;


            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });

        $('#searchField').keyup(function(e) {

            table.search($('#searchField').val()).draw();
        });

        return table;
    },
    fetchPedidos: () => {

        let _queryString = '';

        if (PatologiaSeguimientos.idFiltro == 1) {
            _queryString = '?type=ingresadas&idFiltro=' + PatologiaSeguimientos.idFiltro;
        } else {
            _queryString = '?type=ingresadas&idFiltro=' + PatologiaSeguimientos.idFiltro + '&fechaDesde=' + PatologiaSeguimientos.fechaDesde + '&fechaHasta=' + PatologiaSeguimientos.fechaHasta;
        }

        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/patologia/pedidos",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                PatologiaSeguimientos.loader = false;
                PatologiaSeguimientos.pedidos = result.data;
            })
            .catch(function(e) {
                setTimeout(function() { PatologiaSeguimientos.fetchPatologiaSeguimientos(); }, 2000);
            });


    },

    reloadData: () => {
        var table = $('#table-PatologiaSeguimientos').DataTable();
        table.clear();
        table.rows.add(PatologiaSeguimientos.pedidos).draw();
    },

    view: (_data) => {

        return PatologiaSeguimientos.loader ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(27) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/patologia" }, [
                                " Patología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Seguimiento de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Seguimiento de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("div.table-loader.wd-100p", [
                                    m("div.placeholder-paragraph", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ]


                            ),


                        ])
                    ]),






                ])
            ),

        ] : PatologiaSeguimientos.error.length !== 0 ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(27) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/patologia" }, [
                                " Patología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Seguimiento de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Seguimiento de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m('p', 'No existe información.')
                    ]),
                ])
            ),

        ] : !PatologiaSeguimientos.loader && PatologiaSeguimientos.pedidos.length !== 0 ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(27) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/patologia" }, [
                                " Patología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Seguimiento de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Seguimiento de Pedidos:"
                    ),
                    m(tablePatologiaSeguimientos)





                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Seguimiento de Pedidos"
                ),
                m("div.mg-t-10.bg-white", {

                    },

                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "Seguimiento de Pedidos:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    PatologiaSeguimientos.pedidos.length
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Pedido(s)')
                                ])

                            ]),

                        ])
                    ),
                    m("div.pd-20",
                        m(Stopwatch)
                    )
                ),

            ])

        ] : !PatologiaSeguimientos.loader && PatologiaSeguimientos.pedidos.length == 0 ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(27) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/patologia" }, [
                                " Patología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Seguimiento de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Seguimiento de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m(".alert.alert-danger[role='alert']",
                                "No existe información disponible."
                            )


                        ])
                    ]),






                ])
            ),
        ] : [
            m(SidebarPato, { oncreate: SidebarPato.setPage(27) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/patologia" }, [
                                " Patología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Seguimiento de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Seguimiento de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("p", " Error interno."

                            ),


                        ])
                    ]),






                ])
            ),
        ];


    },

};


export default PatologiaSeguimientos;