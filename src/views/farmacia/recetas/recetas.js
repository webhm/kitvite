import SidebarFarma from '../sidebarFarma';
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


const tableRecetas = {
    oncreate: () => {
        Recetas.loadRecetas();
        if (Recetas.searchField.length !== 0) {
            var table = $('#table-recetas').DataTable();
            table.search(Recetas.searchField).draw();
        }

    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Farmacia:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (Recetas.idFiltro == 1) {
                                            el.dom.innerHTML = 'Recetas de Hoy';
                                        }
                                        if (Recetas.idFiltro == 2) {
                                            el.dom.innerHTML = 'Recetas entre Fechas';
                                        }
                                        if (Recetas.idFiltro == 3) {
                                            el.dom.innerHTML = 'Recetas de Emergencia';
                                        }
                                        if (Recetas.idFiltro == 4) {
                                            el.dom.innerHTML = 'Recetas de Hospitalización';
                                        }
                                        if (Recetas.idFiltro == 5) {
                                            el.dom.innerHTML = 'Recetas de PB';
                                        }
                                        if (Recetas.idFiltro == 6) {
                                            el.dom.innerHTML = 'Recetas de H1';
                                        }
                                        if (Recetas.idFiltro == 7) {
                                            el.dom.innerHTML = 'Recetas de H2';
                                        }
                                        if (Recetas.idFiltro == 8) {
                                            el.dom.innerHTML = 'Recetas de C2';
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (Recetas.idFiltro == 1) {
                                            el.dom.innerHTML = 'Recetas de Hoy';
                                        }
                                        if (Recetas.idFiltro == 2) {
                                            el.dom.innerHTML = 'Recetas entre Fechas';
                                        }
                                        if (Recetas.idFiltro == 3) {
                                            el.dom.innerHTML = 'Recetas de Emergencia';
                                        }
                                        if (Recetas.idFiltro == 4) {
                                            el.dom.innerHTML = 'Recetas de Hospitalización';
                                        }
                                        if (Recetas.idFiltro == 5) {
                                            el.dom.innerHTML = 'Recetas de PB';
                                        }
                                        if (Recetas.idFiltro == 6) {
                                            el.dom.innerHTML = 'Recetas de H1';
                                        }
                                        if (Recetas.idFiltro == 7) {
                                            el.dom.innerHTML = 'Recetas de H2';
                                        }
                                        if (Recetas.idFiltro == 8) {
                                            el.dom.innerHTML = 'Recetas de C2';
                                        }

                                    }
                                }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (Recetas.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (Recetas.idFiltro !== 1 ? moment(moment(Recetas.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            Recetas.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            Recetas.loader = true;
                                            Recetas.pedidos = [];
                                            Recetas.fetch();
                                            m.route.set("/farmacia/recetas/?idFiltro=" + Recetas.idFiltro + "&fechaDesde=" + Recetas.fechaDesde + "&fechaHasta=" + Recetas.fechaHasta);
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
                                            el.dom.value = (Recetas.idFiltro !== 1 ? moment(moment(Recetas.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            Recetas.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            Recetas.loader = true;
                                            Recetas.pedidos = [];
                                            Recetas.fetch();
                                            m.route.set("/farmacia/recetas/?idFiltro=" + Recetas.idFiltro + "&fechaDesde=" + Recetas.fechaDesde + "&fechaHasta=" + Recetas.fechaHasta);
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
                                    m("i.fas.fa-filter.tx-18.pd-5.tx-primary"),
                                ),
                                m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                    m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                        "FILTROS:"
                                    ),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/farmacia/recetas/?idFiltro=1" }, [
                                        "Recetas de Hoy"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/farmacia/recetas/?idFiltro=2&fechaDesde=" + Recetas.fechaDesde + "&fechaHasta=" + Recetas.fechaHasta }, [
                                        "Recetas entre Fechas"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/farmacia/recetas/?idFiltro=3&fechaDesde=" + Recetas.fechaDesde + "&fechaHasta=" + Recetas.fechaHasta }, [
                                        "Recetas de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/farmacia/recetas/?idFiltro=4&fechaDesde=" + Recetas.fechaDesde + "&fechaHasta=" + Recetas.fechaHasta }, [
                                        "Recetas de Hospitalización"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/farmacia/recetas/?idFiltro=5&fechaDesde=" + Recetas.fechaDesde + "&fechaHasta=" + Recetas.fechaHasta }, [
                                        "Recetas de PB"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/farmacia/recetas/?idFiltro=6&fechaDesde=" + Recetas.fechaDesde + "&fechaHasta=" + Recetas.fechaHasta }, [
                                        "Recetas de H1"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/farmacia/recetas/?idFiltro=7&fechaDesde=" + Recetas.fechaDesde + "&fechaHasta=" + Recetas.fechaHasta }, [
                                        "Recetas de H2"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/farmacia/recetas/?idFiltro=8&fechaDesde=" + Recetas.fechaDesde + "&fechaHasta=" + Recetas.fechaHasta }, [
                                        "Recetas de C2"
                                    ]),


                                ])
                            ])
                        ])
                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (Recetas.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function(e) { Recetas.searchField = e.target.value; },
                                value: Recetas.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-recetas'][width='100%']"),


                ])
            ])
        ]);
    }
};

const Recetas = {
    notificaciones: [],
    pedidos: [],
    pendientes: 0,
    despachos: 0,
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",
    oninit: (_data) => {
        SidebarFarma.page = "";
        if (Recetas.pedidos.length == 0) {

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



            Recetas.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
            Recetas.fechaHasta = moment().format('DD-MM-YYYY');
            Recetas.loader = true;
            Recetas.pedidos = [];
            Recetas.fetch();

        }
    },
    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-Farmacia');
    },
    loadRecetas: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-recetas").DataTable({
            data: Recetas.pedidos,
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
            order: false,
            destroy: true,
            columns: [{
                    title: "Fecha Receta:",
                },
                {
                    title: "Paciente:",
                },
                {
                    title: "Status Despacho:",
                },
                {
                    title: "Opciones:",
                },


            ],
            aoColumnDefs: [{
                    mRender: function(data, type, full) {
                        return full.FECHA_RECETA;
                    },
                    visible: true,
                    aTargets: [0],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.CD_PACIENTE;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.NM_PACIENTE;
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return 'OPCIONES';
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: false,
                },



            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td.tx-14", { "style": {} },
                                aData.FECHA_RECETA
                            ),
                            m("td.wd-60p", { "style": {} }, [
                                    m(".d-inline.tx-semibold.tx-14", 'NHC: '),
                                    m(".d-inline.tx-14", aData.CD_PACIENTE),
                                    m('br'),
                                    m(".d-inline.tx-semibold.tx-14", 'PTE: '),
                                    m(".d-inline.tx-14", aData.NM_PACIENTE),
                                    m('br'),
                                    m(".d-inline.tx-semibold.tx-14", 'N° ATENCIÓN: '),
                                    m(".d-inline.tx-14", aData.CD_ATENDIMENTO),
                                    m(".d-inline.tx-semibold.tx-14", ' UBICACIÓN: '),
                                    m(".d-inline.tx-14", aData.UBICACION + " - " + aData.DS_UNID_INT),


                                ]

                            ),


                            m("td.tx-center.wd-10p.tx-white.tx-semibold", {

                                    "style": { "background-color": (aData.STATUS_DESPACHO == 0 ? "#fd7e14" : "#0d9448") }
                                },
                                (aData.STATUS_DESPACHO == 0 ? "Pendiente" : "Despachado")
                            ),

                            m("td.tx-center.wd-10p.tx-semibold", {
                                    onclick: () => {
                                        m.route.set("/farmacia/receta/", {
                                            numeroHistoriaClinica: aData.CD_PACIENTE,
                                            numeroAtencion: aData.CD_ATENDIMENTO,
                                            numeroReceta: aData.id,
                                            track: "view",
                                        });
                                    },
                                    "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                                },
                                " Ver ",
                                m("br"),
                                " Receta "

                            )





                        ];
                    },
                });
            },
            drawCallback: function(settings) {

                Recetas.loader = false;
                Recetas.despachos = 0;
                Recetas.pendientes = 0;

                settings.aoData.map(function(_v, _i) {

                    if (_v._aData.STATUS_DESPACHO == 1) {
                        Recetas.despachos++;
                    } else {
                        Recetas.pendientes++;
                    }





                })


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
    fetch: () => {

        let _queryString = '';

        if (Recetas.idFiltro == 1) {
            _queryString = '?idFiltro=' + Recetas.idFiltro;
        } else {
            _queryString = '?idFiltro=' + Recetas.idFiltro + '&fechaDesde=' + Recetas.fechaDesde + '&fechaHasta=' + Recetas.fechaHasta;
        }

        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/recetas" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                console.log(result)
                Recetas.loader = false;
                Recetas.pedidos = result.data;
            })
            .catch(function(e) {
                setTimeout(function() { Recetas.fetch(); }, 2000);
            });


    },
    reproesarMensajeXML: (codigoPedido, idTimeRecord) => {

        Recetas.loader = true;


        m.request({
                method: "GET",
                url: "https://lisa.hospitalmetropolitano.org/v1/pedidos/send-pedido?sc=" + codigoPedido + "&idTimeRecord=" + idTimeRecord,
                extract: function(xhr) { return { status: xhr.status, body: xhr.responseText } },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(response) {


                if (response.status == 200) {
                    alert('Preceso realizado con éxito.')
                    setTimeout(function() { window.location.reload(); }, 300);
                } else {
                    alert('Error en envío de este mensaje. Reintente nuevamente.');

                }


            })
            .catch(function(e) {
                alert('Error en envío de este mensaje. Reintente nuevamente.');
            });


    },
    reloadData: () => {
        var table = $('#table-recetas').DataTable();
        table.clear();
        table.rows.add(Recetas.pedidos).draw();
    },
    view: (_data) => {

        return Recetas.loader ? [
            m(SidebarFarma, { oncreate: SidebarFarma.setPage(5) }),
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
                            m(m.route.Link, { href: "/farmacia" }, [
                                " Farmacia "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recetas de Alta"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recetas de Alta:"
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

        ] : Recetas.error.length !== 0 ? [
            m(SidebarFarma, { oncreate: SidebarFarma.setPage(5) }),
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
                            m(m.route.Link, { href: "/farnacia" }, [
                                " Farmacia "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recetas de Alta"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recetas de Alta:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m('p', 'No existe información.')
                    ]),





                ])
            ),

        ] : !Recetas.loader && Recetas.pedidos.length !== 0 ? [
            m(SidebarFarma, { oncreate: SidebarFarma.setPage(5) }),
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
                            m(m.route.Link, { href: "/farmacia" }, [
                                " Farmacia "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recetas de Alta"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recetas de Alta:"
                    ),
                    m(tableRecetas)
                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Recetas de Alta"
                ),
                m("div.mg-t-10.bg-white", {

                    },

                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "Recetas de Alta:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    Recetas.pedidos.length
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Receta(s)')
                                ])

                            ]),

                        ]),
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "Pendientes:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    Recetas.pendientes
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Receta(s)')
                                ])

                            ]),

                        ]),
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "Despachadas:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    Recetas.despachos
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Receta(s)')
                                ])

                            ]),

                        ]),
                    ),
                    m("div.pd-20",
                        m(Stopwatch)
                    )
                ),

            ])

        ] : !Recetas.loader && Recetas.pedidos.length == 0 ? [
            m(SidebarFarma, { oncreate: SidebarFarma.setPage(5) }),
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
                            m(m.route.Link, { href: "/farmacia" }, [
                                " Farmacia "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recetas de Alta"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recetas de Alta:"
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
            m(SidebarFarma, { oncreate: SidebarFarma.setPage(5) }),
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
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Pedidos Ingresados"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pedidos Ingresados:"
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


export default Recetas;