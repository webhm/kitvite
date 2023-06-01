import SidebarLab from '../laboratorio/sidebarLab';
import Notificaciones from '../../models/notificaciones';

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


const tablePedidosIngresados = {
    oncreate: () => {
        PedidosIngresados.loadPedidosIngresados();
        if (PedidosIngresados.searchField.length !== 0) {
            var table = $('#table-pedidosIngresados').DataTable();
            table.search(PedidosIngresados.searchField).draw();
        }

    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [

                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "LISA:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (PedidosIngresados.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PedidosIngresados.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PedidosIngresados.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PedidosIngresados.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }

                                    },
                                    onupdate: (el) => {
                                        if (PedidosIngresados.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PedidosIngresados.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }

                                        if (PedidosIngresados.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }

                                        if (PedidosIngresados.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    }
                                }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (PedidosIngresados.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (PedidosIngresados.idFiltro !== 1 ? moment(moment(PedidosIngresados.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PedidosIngresados.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PedidosIngresados.loader = true;
                                            PedidosIngresados.pedidos = [];
                                            PedidosIngresados.fetchPedidosIngresados();
                                            m.route.set("/laboratorio/lisa/pedidos/ingresados?idFiltro=" + PedidosIngresados.idFiltro + "&fechaDesde=" + PedidosIngresados.fechaDesde + "&fechaHasta=" + PedidosIngresados.fechaHasta);
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
                                            el.dom.value = (PedidosIngresados.idFiltro !== 1 ? moment(moment(PedidosIngresados.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PedidosIngresados.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PedidosIngresados.loader = true;
                                            PedidosIngresados.pedidos = [];
                                            PedidosIngresados.fetchPedidosIngresados();
                                            m.route.set("/laboratorio/lisa/pedidos/ingresados?idFiltro=" + PedidosIngresados.idFiltro + "&fechaDesde=" + PedidosIngresados.fechaDesde + "&fechaHasta=" + PedidosIngresados.fechaHasta);
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
                                    m("i.fas.fa-filter.tx-18.pd-5.tx-primary")
                                ),
                                m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                    m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                        "FILTROS:"
                                    ),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/laboratorio/lisa/pedidos/ingresados/?idFiltro=1" }, [
                                        "Pedidos de Hoy"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/laboratorio/lisa/pedidos/ingresados/?idFiltro=2&fechaDesde=" + PedidosIngresados.fechaDesde + "&fechaHasta=" + PedidosIngresados.fechaHasta }, [
                                        "Pedidos de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/laboratorio/lisa/pedidos/ingresados/?idFiltro=3&fechaDesde=" + PedidosIngresados.fechaDesde + "&fechaHasta=" + PedidosIngresados.fechaHasta }, [
                                        "Pedidos de Hospitalización"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/laboratorio/lisa/pedidos/ingresados/?idFiltro=4&fechaDesde=" + PedidosIngresados.fechaDesde + "&fechaHasta=" + PedidosIngresados.fechaHasta }, [
                                        "Pedidos de C. Externa"
                                    ]),

                                ])
                            ])
                        ])
                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (PedidosIngresados.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function(e) { PedidosIngresados.searchField = e.target.value; },
                                value: PedidosIngresados.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-pedidosIngresados'][width='100%']"),


                ])
            ])
        ]);
    }
};

const PedidosIngresados = {
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
    pCancelados: 0,
    pIngreados: 0,
    pPendientes: 0,
    pProcesados: 0,
    oninit: (_data) => {

        SidebarLab.page = "";

        if (PedidosIngresados.pedidos.length == 0) {

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



            PedidosIngresados.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
            PedidosIngresados.fechaHasta = moment().format('DD-MM-YYYY');
            PedidosIngresados.loader = true;
            PedidosIngresados.pedidos = [];
            PedidosIngresados.fetchPedidosIngresados();

        }

    },

    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-LisaPedidos');
    },


    loadPedidosIngresados: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-pedidosIngresados").DataTable({
            data: PedidosIngresados.pedidos,
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
                    title: "SC:",
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
                            m("td", {
                                class: (aData.tipoPedido == 'R' ? 'bg-primary' : 'bg-danger')
                            }, [

                                (aData.tipoPedido == 'R' ? m("span.badge.badge-pill.badge-primary.wd-100p.mg-b-1",
                                    'R'
                                ) : m("span.badge.badge-pill.badge-danger.wd-100p.mg-b-1",
                                    'U'
                                ))


                            ]),
                            m("td", { "style": {} },
                                aData.fechaPedido
                            ),
                            m("td", { "style": {} },
                                m("span.tx-semibold.tx-dark.tx-15.wd-100p.mg-b-1",
                                    aData.codigoPedido
                                ),
                            ),
                            m("td", { "style": {} }, [
                                    m('.d-inline.mg-r-5', {
                                        class: (aData.sector == 'EMERGENCIA' ? "tx-danger" : "tx-primary")
                                    }, aData.sector),
                                    m('br'),
                                    aData.paciente,
                                ]

                            ),
                            m("td", { "style": {} },
                                aData.descPrestadorSolicitante

                            ),
                            (aData.tipoOperacion == 'I' ?
                                m("td.tx-white.tx-semibold.tx-center", {
                                        title: (aData.enviadoInfinity == 0 ? " Retenido " : " Enviado "),

                                        style: { "background-color": (aData.enviadoInfinity == 0 ? "#fd7e14" : "#00cccc") }
                                    },
                                    (aData.enviadoInfinity == 0 ? "Retenido" : "Enviado")
                                ) : m("td.tx-white.tx-semibold.bg-danger.tx-center", {
                                        title: (aData.enviadoInfinity == 0 ? " Cancelado " : " Cancelado Enviado "),
                                    },
                                    (aData.enviadoInfinity == 0 ? "Cancelado" : "Cancelado Enviado")
                                )),

                            (aData.tipoOperacion == 'I' ? [m("td.tx-white.tx-semibold.tx-center", {
                                    title: 'Status Toma de Muestras',
                                    style: { "background-color": (aData.muestrasProcesadas == 0 ? "#ffc107" : "#0d9448") }
                                },
                                (aData.muestrasProcesadas == 0 ? "Muestras Pendientes" : "Muestras Completo")
                            ), ] : [""]),
                            (aData.tipoOperacion == 'E' || aData.tipoOperacion == 'A' ? [m("td.tx-center", {

                                    onclick: () => {
                                        if (confirm("Esta Ud. seguro de generar este envío.") == true) {
                                            PedidosIngresados.reproesarMensajeXML(Number(aData.codigoPedido), aData.idTimeRecord);
                                        }
                                    },
                                    title: (aData.enviadoInfinity == 0 ? " Enviar " : " Reenviar "),
                                    style: { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                                },
                                m('i.fas.fa-file-upload.mg-r-5'),
                                (aData.enviadoInfinity == 0 ? " Enviar " : " Reenviar ")

                            )] : [""]),

                            m("td.tx-center", {
                                "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                            }, [

                                m(m.route.Link, {
                                    class: "tx-dark pd-2",
                                    href: "/laboratorio/lisa/pedido/",
                                    target: "_blank",
                                    params: {
                                        numeroHistoriaClinica: aData.numeroHistoriaClinica,
                                        numeroAtencion: aData.at_mv,
                                        numeroPedido: aData.codigoPedido,
                                        idTimeRecord: aData.idTimeRecord,
                                        track: "view",
                                    }
                                }, "Ver Pedido")


                            ])





                        ];
                    },
                });
            },
            drawCallback: function(settings) {

                PedidosIngresados.loader = false;
                PedidosIngresados.pProcesados = 0;
                PedidosIngresados.pPendientes = 0;
                PedidosIngresados.pIngreados = 0;
                PedidosIngresados.pCancelados = 0;


                settings.aoData.map(function(_v, _i) {

                    if (_v._aData.tipoOperacion == 'I') {
                        PedidosIngresados.pIngreados++;
                        if (_v._aData.muestrasProcesadas == 0) {
                            PedidosIngresados.pPendientes++;
                        }
                        if (_v._aData.muestrasProcesadas == 1) {
                            PedidosIngresados.pProcesados++;
                        }
                    }

                    if (_v._aData.tipoOperacion == 'E' || _v._aData.tipoOperacion == 'A') {
                        PedidosIngresados.pCancelados++;
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
    fetchPedidosIngresados: () => {

        let _queryString = '';

        if (PedidosIngresados.idFiltro == 1) {
            _queryString = '?type=ingresadas&idFiltro=' + PedidosIngresados.idFiltro;
        } else {
            _queryString = '?type=ingresadas&idFiltro=' + PedidosIngresados.idFiltro + '&fechaDesde=' + PedidosIngresados.fechaDesde + '&fechaHasta=' + PedidosIngresados.fechaHasta;
        }

        m.request({
                method: "GET",
                url: "https://lisa.hospitalmetropolitano.org/v1/listar" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                PedidosIngresados.loader = false;
                PedidosIngresados.pedidos = result.data;
            })
            .catch(function(e) {
                setTimeout(function() { PedidosIngresados.fetchPedidosIngresados(); }, 2000);
            });


    },
    reproesarMensajeXML: (codigoPedido, idTimeRecord) => {

        PedidosIngresados.loader = true;


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
        var table = $('#table-pedidosIngresados').DataTable();
        table.clear();
        table.rows.add(PedidosIngresados.pedidos).draw();
    },

    view: (_data) => {

        return PedidosIngresados.loader ? [
            m(SidebarLab, { oncreate: SidebarLab.setPage(21) }),
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

        ] : PedidosIngresados.error.length !== 0 ? [
            m(SidebarLab, { oncreate: SidebarLab.setPage(21) }),
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

                        m('p', 'No existe información.')
                    ]),





                ])
            ),

        ] : !PedidosIngresados.loader && PedidosIngresados.pedidos.length !== 0 ? [
            m(SidebarLab, { oncreate: SidebarLab.setPage(21) }),
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
                    m(tablePedidosIngresados)





                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Pedidos Ingresados"
                ),
                m("div.mg-t-10.bg-white",

                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "Pedidos Ingresados:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    (PedidosIngresados.pIngreados - PedidosIngresados.pCancelados)
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Pedido(s)')
                                ])

                            ]),

                        ]),
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "Pedidos Cancelados:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    PedidosIngresados.pCancelados
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Pedido(s)')
                                ])

                            ]),

                        ]),
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "Pedidos Pendientes:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    PedidosIngresados.pPendientes
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Pedido(s)')
                                ])

                            ]),

                        ]),

                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "Pedidos Procesados:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    PedidosIngresados.pProcesados
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Pedido(s)')
                                ])

                            ]),

                        ]),
                    ),
                    m("div.pd-20",
                        m(Stopwatch)
                    )
                ),

            ])

        ] : !PedidosIngresados.loader && PedidosIngresados.pedidos.length == 0 ? [
            m(SidebarLab, { oncreate: SidebarLab.setPage(21) }),
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

                            m(".alert.alert-danger[role='alert']",
                                "No existe información disponible."
                            )


                        ])
                    ]),






                ])
            ),
        ] : [
            m(SidebarLab, { oncreate: SidebarLab.setPage(21) }),
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


export default PedidosIngresados;