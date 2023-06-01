import SidebarLab from '../../laboratorio/sidebarLab';
import m from 'mithril';




const tableEtiCajas = {
    oncreate: () => {
        EtiCajas.loadEtiCajas();
        if (EtiCajas.searchField.length !== 0) {
            var table = $('#table-etiquetas').DataTable();
            table.search(EtiCajas.searchField).draw();
        }
    },
    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Usuarios:",


                        ),

                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (EtiCajas.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function(e) { EtiCajas.searchField = e.target.value; },
                                value: EtiCajas.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-etiquetas'][width='100%']"),


                ])
            ])
        ]);
    }
};

const EtiCajas = {
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
    loaderImprimir: false,
    oninit: (_data) => {

        SidebarLab.page = "";

        if (EtiCajas.pedidos.length == 0) {

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



            EtiCajas.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
            EtiCajas.fechaHasta = moment().format('DD-MM-YYYY');
            EtiCajas.loader = true;
            EtiCajas.pedidos = [];
            EtiCajas.fetchEtiCajas();

        }

    },
    loadEtiCajas: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-etiquetas").DataTable({
            data: EtiCajas.pedidos,
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

            destroy: true,
            columns: [{
                    title: "Usuario:",
                },

                {
                    title: "Impresión:",
                },

                {
                    title: "Opciones:",
                },


            ],
            aoColumnDefs: [{
                    mRender: function(data, type, full) {
                        return full.impresion;
                    },
                    visible: true,
                    aTargets: [0],
                    orderable: false

                },
                {
                    mRender: function(data, type, full) {
                        return full.usuario;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: false


                },

                {
                    mRender: function(data, type, full) {
                        return '';
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: false
                },



            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td.tx-18.tx-semibold", {
                                "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }

                            }, [

                                aData.impresion

                            ]),
                            m("td.wd-40p.tx-18.tx-semibold", { "style": {} },
                                aData.usuario
                            ),

                            m("td.tx-center.tx-18.tx-semibold", {
                                    onclick: () => {
                                        let usuario = prompt('¿Nombre de Usuario?');

                                        if (usuario !== null) {
                                            EtiCajas.changeUser(aData.impresion, usuario);
                                        }




                                    },
                                    "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                                },
                                m('i.fas.fa-edit.mg-r-5'),

                                " Modificar "

                            )





                        ];
                    },
                });
            },
            drawCallback: function(settings) {

                EtiCajas.loader = false;


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
    fetchEtiCajas: () => {


        m.request({
                method: "GET",
                url: "https://lisa.hospitalmetropolitano.org/v1/users-etiquetas",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                EtiCajas.loader = false;
                EtiCajas.pedidos = result.data;
            })
            .catch(function(e) {
                setTimeout(function() { EtiCajas.fetchEtiCajas(); }, 2000);
            });


    },
    reloadData: () => {
        var table = $('#table-etiquetas').DataTable();
        table.clear();
        table.rows.add(EtiCajas.pedidos).draw();
    },
    changeUser: (caja, usuario) => {

        m.request({
                method: "POST",
                url: "https://lisa.hospitalmetropolitano.org/v1/change-user",
                body: {
                    impresion: caja,
                    usuario: usuario
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(res) {

                alert(res.message);

                if (res.status) {
                    window.location.reload();
                }



            })
            .catch(function(e) {
                alert(e);
            });
    },
    view: (_data) => {

        return EtiCajas.loader ? [
            m(SidebarLab, { oncreate: SidebarLab.setPage(28) }),
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
                            "Configuración de Etiquetas "
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Configuración de Etiquetas:  "
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

        ] : EtiCajas.error.length !== 0 ? [
            m(SidebarLab, { oncreate: SidebarLab.setPage(28) }),
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
                            " Configuración de Etiquetas  "
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Configuración de Etiquetas:  "
                    ),
                    m("div.row.animated.fadeInUp", [

                        m('p', 'No existe información.')
                    ]),





                ])
            ),

        ] : !EtiCajas.loader && EtiCajas.pedidos.length !== 0 ? [
            m(SidebarLab, { oncreate: SidebarLab.setPage(28) }),
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
                            " Configuración de Etiquetas  "
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Configuración de Etiquetas:  "
                    ),
                    m(tableEtiCajas)





                ])
            ),


        ] : !EtiCajas.loader && EtiCajas.pedidos.length == 0 ? [
            m(SidebarLab, { oncreate: SidebarLab.setPage(28) }),
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
                            " Configuración de Etiquetas  "
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Configuración de Etiquetas:  "
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
            m(SidebarLab, { oncreate: SidebarLab.setPage(28) }),
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
                            " Configuración de Etiquetas  "
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Configuración de Etiquetas:  "
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


export default EtiCajas;