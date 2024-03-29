import m from 'mithril';
import SidebarPato from '../utils/sidebarPato';
import Notificaciones from '../../../models/notificaciones';
import BreadCrumb from '../../layout/breadcrumb';
import Stopwatch from "../utils/Stopwatch"

const tablePatologiaPedidos = {
    oncreate: () => {
        PatologiaPedidos.loadPedidos();
        if (PatologiaPedidos.searchField.length !== 0) {
            let table = $('#table-PatologiaPedidos').DataTable();
            table.search(PatologiaPedidos.searchField).draw();
        }
    },
    view: () => {
        return m("div.row.animated.fadeInUp", {}, [
            m("div.col-12", [
                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [
                    m("table.table.table-sm.tx-11[id='table-PatologiaPedidos'][width='100%']"),
                ])
            ])
        ]);
    }
};

const PatologiaPedidos = {
    notificaciones: [],
    pedidos: [],
    pedidosEstado: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    pedidosId: [],
    idFiltro: 1,
    loader: false,
    error: "",
    oninit: (_data) => {
        SidebarPato.page = "";
        if (PatologiaPedidos.pedidos.length == 0) {
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

            PatologiaPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
            PatologiaPedidos.fechaHasta = moment().format('DD-MM-YYYY');
            PatologiaPedidos.loader = true;
            PatologiaPedidos.pedidos = [];
            PatologiaPedidos.fetchPedidos();
        }
    },
    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-PatologiaPedidos');
    },
    loadPedidos: () => {
        $.fn.dataTable.ext.errMode = "none";
        let table = $("#table-PatologiaPedidos").DataTable({
            data: PatologiaPedidos.pedidos,
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
                    title: "Estado:",
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
                },{
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
                                aData.FECHA_PEDIDO.replaceAll('-', '/') + " " + aData.HORA_PEDIDO
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
                            m("td.tx-center.tx-semibold", { "style": { "background-color": aData.color} },
                                aData.estado
                            ),
                            m("td.tx-center.tx-semibold", {
                                    onclick: () => {
                                        m.route.set("/patologia/pedido/", {
                                            numeroHistoriaClinica: aData.CD_PACIENTE,
                                            numeroAtencion: aData.AT_MV,
                                            numeroPedido: aData.CD_PRE_MED,
                                            medico: aData.MED_MV,
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
                PatologiaPedidos.loader = false;
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

        if (PatologiaPedidos.idFiltro == 1) {
            _queryString = '?type=ingresadas&idFiltro=' + PatologiaPedidos.idFiltro;
        } else {
            _queryString = '?type=ingresadas&idFiltro=' + PatologiaPedidos.idFiltro + '&fechaDesde=' + PatologiaPedidos.fechaDesde + '&fechaHasta=' + PatologiaPedidos.fechaHasta;
        }
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/patologia/pedidos" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                PatologiaPedidos.loader = false;
                PatologiaPedidos.pedidos = result.data;
                if (result.data.length > 0){
                    PatologiaPedidos.pedidosId = result.data.map( item => item.CD_PRE_MED);
                    PatologiaPedidos.fetchEstadosPedidos (PatologiaPedidos.pedidosId);
                }   
                
            })
            .catch(function(e) {
                setTimeout(function() { PatologiaPedidos.fetchPedidos(); }, 2000);
            });
    },
    fetchEstadosPedidos: (jsPedidos) => { 
        m.request({
                method: "POST",
                url: "https://apipatologia.hospitalmetropolitano.org/api/v1/estadopedido/getPedidosEstados",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: jsPedidos
            })
            .then(function(result) {
                const mergedJson = PatologiaPedidos.pedidos.map((item1, index) => ({
                    ...item1,
                    ...result[index]
                }));
                PatologiaPedidos.pedidos = mergedJson;
                PatologiaPedidos.loadPedidos();
            })
            .catch(function(e) {
                //setTimeout(function() { PatologiaPedidos.fetchPedidos(); }, 2000);
            });
    },
    reloadData: () => {
        let table = $('#table-PatologiaPedidos').DataTable();
        table.clear();
        table.rows.add(PatologiaPedidos.pedidos).draw();
    },
    view: (_data) => {
        return PatologiaPedidos.loader ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(26) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m(BreadCrumb, [{path: "/", label: "metroplus"}, 
                                   {path: "/patologia", label: "patologia"},
                                   {path: "", label: "pedidos ingresados"}]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pedidos Ingresados:"
                    ),
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Patología:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (PatologiaPedidos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaPedidos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaPedidos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaPedidos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (PatologiaPedidos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaPedidos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaPedidos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaPedidos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    }
                                }
                            )
                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (PatologiaPedidos.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (PatologiaPedidos.idFiltro !== 1 ? moment(moment(PatologiaPedidos.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaPedidos.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaPedidos.loader = true;
                                            PatologiaPedidos.pedidos = [];
                                            PatologiaPedidos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaPedidos.idFiltro + "&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta);
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
                                            el.dom.value = (PatologiaPedidos.idFiltro !== 1 ? moment(moment(PatologiaPedidos.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaPedidos.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaPedidos.loader = true;
                                            PatologiaPedidos.pedidos = [];
                                            PatologiaPedidos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaPedidos.idFiltro + "&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta);
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
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=2&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=3&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de Hospitalización"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=4&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de C. Externa"
                                    ]),
                                ])
                            ])
                        ])
                    ]),
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
        ] : PatologiaPedidos.error.length !== 0 ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(26) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m(BreadCrumb, [{path: "/", label: "metroplus"}, 
                                   {path: "/patologia", label: "patologia"},
                                   {path: "", label: "pedidos ingresados"}]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pedidos Ingresados:"
                    ),
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Patología:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (PatologiaPedidos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaPedidos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaPedidos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaPedidos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (PatologiaPedidos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaPedidos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaPedidos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaPedidos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    }
                                }
                            )
                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (PatologiaPedidos.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (PatologiaPedidos.idFiltro !== 1 ? moment(moment(PatologiaPedidos.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaPedidos.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaPedidos.loader = true;
                                            PatologiaPedidos.pedidos = [];
                                            PatologiaPedidos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaPedidos.idFiltro + "&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta);
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
                                            el.dom.value = (PatologiaPedidos.idFiltro !== 1 ? moment(moment(PatologiaPedidos.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaPedidos.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaPedidos.loader = true;
                                            PatologiaPedidos.pedidos = [];
                                            PatologiaPedidos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaPedidos.idFiltro + "&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta);
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
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=2&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=3&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de Hospitalización"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=4&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de C. Externa"
                                    ]),
                                ])
                            ])
                        ])
                    ]),
                    m("div.row.animated.fadeInUp", [
                        m('p', 'No existe información.')
                    ]),
                ])
            ),
        ] : !PatologiaPedidos.loader && PatologiaPedidos.pedidos.length !== 0 ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(26) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m(BreadCrumb, [{path: "/", label: "metroplus"}, 
                                   {path: "/patologia", label: "patologia"},
                                   {path: "", label: "pedidos ingresados"}]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pedidos Ingresados:"
                    ),
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Patología:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (PatologiaPedidos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaPedidos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaPedidos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaPedidos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (PatologiaPedidos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaPedidos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaPedidos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaPedidos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    }
                                }
                            )
                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (PatologiaPedidos.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (PatologiaPedidos.idFiltro !== 1 ? moment(moment(PatologiaPedidos.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaPedidos.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaPedidos.loader = true;
                                            PatologiaPedidos.pedidos = [];
                                            PatologiaPedidos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaPedidos.idFiltro + "&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta);
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
                                            el.dom.value = (PatologiaPedidos.idFiltro !== 1 ? moment(moment(PatologiaPedidos.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaPedidos.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaPedidos.loader = true;
                                            PatologiaPedidos.pedidos = [];
                                            PatologiaPedidos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaPedidos.idFiltro + "&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta);
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
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=2&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=3&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de Hospitalización"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=4&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de C. Externa"
                                    ]),
                                ])
                            ])
                        ])
                    ]),
                    m(tablePatologiaPedidos)
                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Pedidos Ingresados"
                ),
                m("div.mg-t-10.bg-white", {},
                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "Pedidos Ingresados:"
                            ),
                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    PatologiaPedidos.pedidos.length
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
        ] : !PatologiaPedidos.loader && PatologiaPedidos.pedidos.length == 0 ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(26) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m(BreadCrumb, [{path: "/", label: "metroplus"}, 
                                   {path: "/patologia", label: "patologia"},
                                   {path: "", label: "pedidos ingresados"}]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pedidos Ingresados:"
                    ),
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Patología:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (PatologiaPedidos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaPedidos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaPedidos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaPedidos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (PatologiaPedidos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaPedidos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaPedidos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaPedidos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    }
                                }
                            )
                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (PatologiaPedidos.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (PatologiaPedidos.idFiltro !== 1 ? moment(moment(PatologiaPedidos.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaPedidos.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaPedidos.loader = true;
                                            PatologiaPedidos.pedidos = [];
                                            PatologiaPedidos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaPedidos.idFiltro + "&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta);
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
                                            el.dom.value = (PatologiaPedidos.idFiltro !== 1 ? moment(moment(PatologiaPedidos.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaPedidos.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaPedidos.loader = true;
                                            PatologiaPedidos.pedidos = [];
                                            PatologiaPedidos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaPedidos.idFiltro + "&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta);
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
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=2&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=3&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de Hospitalización"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=4&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de C. Externa"
                                    ]),
                                ])
                            ])
                        ])
                    ]),
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
            m(SidebarPato, { oncreate: SidebarPato.setPage(26) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m(BreadCrumb, [{path: "/", label: "metroplus"}, 
                                   {path: "/patologia", label: "patologia"},
                                   {path: "", label: "pedidos ingresados"}]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pedidos Ingresados:"
                    ),
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Patología:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (PatologiaPedidos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaPedidos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaPedidos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaPedidos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (PatologiaPedidos.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PatologiaPedidos.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PatologiaPedidos.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización ';
                                        }
                                        if (PatologiaPedidos.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa ';
                                        }
                                    }
                                }
                            )
                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (PatologiaPedidos.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (PatologiaPedidos.idFiltro !== 1 ? moment(moment(PatologiaPedidos.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaPedidos.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaPedidos.loader = true;
                                            PatologiaPedidos.pedidos = [];
                                            PatologiaPedidos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaPedidos.idFiltro + "&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta);
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
                                            el.dom.value = (PatologiaPedidos.idFiltro !== 1 ? moment(moment(PatologiaPedidos.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PatologiaPedidos.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PatologiaPedidos.loader = true;
                                            PatologiaPedidos.pedidos = [];
                                            PatologiaPedidos.fetchPedidos();
                                            m.route.set("/patologia/pedidos?idFiltro=" + PatologiaPedidos.idFiltro + "&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta);
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
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=2&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=3&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de Hospitalización"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/patologia/pedidos/?idFiltro=4&fechaDesde=" + PatologiaPedidos.fechaDesde + "&fechaHasta=" + PatologiaPedidos.fechaHasta }, [
                                        "Pedidos de C. Externa"
                                    ]),
                                ])
                            ])
                        ])
                    ]),
                    m("div.row.animated.fadeInUp", [
                        m("div.col-12", [
                            m("p", " Error interno."),
                        ])
                    ]),
                ]),               
            ),
        ];
    },
};

export default PatologiaPedidos;