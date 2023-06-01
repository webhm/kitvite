import SidebarPato from '../sidebarPato';
import m from 'mithril';

const tablePreDiagnosticos = {
    oncreate: () => {
        PatologiaSeguimientos.loadPreDiagnosticos();
        if (PatologiaSeguimientos.searchField.length !== 0) {
            var table = $('#table-PreDiagnosticos').DataTable();
        }
    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [
            m("div.col-12", [
                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [
                    m("div.d-flex.align-items-center.justify-content-between.mg-t-10", [
                        m("h5.mg-b-0",
                            "Pre-Diagnósticos:"
                        ),
                    ]),

                    m("button.btn.btn-outline-light[id='button-save'][type='button']", {
                        onclick: () => {
                            m.route.set("/patologia/prediagnosticos/nuevo");
                        },
                    }, [
                        m("i.icon.ion-md-save"),
                        " Crear nuevo "
                    ]),

                    m("table.table.table-sm.tx-11[id='table-PreDiagnosticos'][width='100%']"),
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

    loadPreDiagnosticos(){
        $.fn.dataTable.ext.errMode = "none";

        var table = $("#table-PreDiagnosticos").DataTable({
            data: [
                {
                    id: 1,
                    codigo: "PD-01",
                    diagnostico: "Diagnóstico de ejemplo por defecto número 1.",
                },
                {
                    id: 2,
                    codigo: "PD-02",
                    diagnostico: "Diagnóstico de ejemplo por defecto número 2.",
                },
                {
                    id: 3,
                    codigo: "PD-03",
                    diagnostico: "Diagnóstico de ejemplo por defecto número 3.",
                },
                {
                    id: 4,
                    codigo: "PD-04",
                    diagnostico: "Diagnóstico de ejemplo por defecto número 4.",
                },
                {
                    id: 5,
                    codigo: "PD-05",
                    diagnostico: "Diagnóstico de ejemplo por defecto número 5.",
                },
            ],

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
                    title: "Código:",
                },
                {
                    title: "Diagnóstico:",
                },
                {
                    title: "Opciones:",
                },
            ],

            aoColumnDefs: [
                {
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: true,
                    aTargets: [0],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.codigo;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.diagnostico;
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
                            m("td.wd-5p", {
                                class: 'bg-primary'
                            }, [
                                m("span.badge.badge-pill.badge-primary.wd-100p.mg-b-1",
                                aData.id
                                )
                            ]),
                            m("td.wd-10p", { "style": {} },
                                aData.codigo
                            ),
                            m("td.wd-40p", { "style": {} },
                                aData.diagnostico
                            ),
                            m("td.wd-5p.tx-center.tx-semibold", {
                                    onclick: () => {
                                        m.route.set("/patologia/prediagnostico/", {
                                            id: aData.id,
                                            codigo: aData.codigo,
                                            diagnostico: aData.diagnostico
                                        });
                                        console.log("editar", aData);
                                    },
                                    "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                                },
                                " Editar "

                            ),
                            m("td.wd-5p.tx-center.tx-semibold", {
                                onclick: () => {
                                    console.log("eliminar", aData);
                                },
                                "style": { "background-color": "rgb(255 146 146)", "cursor": "pointer" }
                            },
                            " Eliminar "
                        )
                        ];B
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

        return table;
    },

    oninit: (_data) => {
        SidebarPato.page = "";
    },

    oncreate: (_data) => {
        
    },

    view: (_data) => {

        return PatologiaSeguimientos.loader ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(28) }),
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
                            "Pre-Diagnósticos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pre-Diagnósticos:"
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
        ] : [
            m(SidebarPato, { oncreate: SidebarPato.setPage(28) }),
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
                            "Pre-Diagnósticos"
                        ),
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pre-Diagnósticos:"
                    ),
                    m(tablePreDiagnosticos)
                ])
            ),
        ];
    },
};


export default PatologiaSeguimientos;