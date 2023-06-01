import SidebarAdm from '../../admisiones/sidebarAdm';
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


const tableEtiquetas = {
    oncreate: () => {
        Etiquetas.loadEtiquetas();
        if (Etiquetas.searchField.length !== 0) {
            var table = $('#table-etiquetas').DataTable();
            table.search(Etiquetas.searchField).draw();
        }
    },
    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Admisiones:",


                        ),

                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (Etiquetas.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function(e) { Etiquetas.searchField = e.target.value; },
                                value: Etiquetas.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-etiquetas'][width='100%']"),


                ])
            ])
        ]);
    }
};

const Etiquetas = {
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

        SidebarAdm.page = "";

        if (Etiquetas.pedidos.length == 0) {

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



            Etiquetas.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
            Etiquetas.fechaHasta = moment().format('DD-MM-YYYY');
            Etiquetas.loader = true;
            Etiquetas.pedidos = [];
            Etiquetas.fetchEtiquetas();

        }

    },
    loadEtiquetas: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-etiquetas").DataTable({
            data: Etiquetas.pedidos,
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
                    title: "Paciente:",
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
                        return full.NM_PACIENTE;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: false,

                },

                {
                    mRender: function(data, type, full) {
                        return "";
                    },
                    visible: true,
                    aTargets: [2],
                    orderable: false,
                },



            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td", {
                                class: (aData.TP_ATENDIMENTO == 'I' ? 'bg-primary' : 'bg-danger')
                            }, [

                                (aData.TP_ATENDIMENTO == 'I' ? m("span.badge.badge-pill.badge-primary.wd-100p.mg-b-1",
                                    'Internación'
                                ) : m("span.badge.badge-pill.badge-danger.wd-100p.mg-b-1",
                                    'Emergencia'
                                ))


                            ]),
                            m("td.wd-40p", { "style": {} },
                                aData.NM_PACIENTE
                            ),

                            m("td.tx-center.tx-semibold", {
                                    onclick: () => {
                                        if (!Etiquetas.loaderImprimir) {
                                            Etiquetas.generarImpresion(aData.CD_ATENDIMENTO)
                                        } else {
                                            alert("Tienes un proceso de Impresión pendiente.");
                                        }

                                    },
                                    "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                                },
                                " Imprimir "

                            )





                        ];
                    },
                });
            },
            drawCallback: function(settings) {

                Etiquetas.loader = false;


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
    fetchEtiquetas: () => {

        let _queryString = '';

        if (Etiquetas.idFiltro == 1) {
            _queryString = '?type=ingresadas&idFiltro=' + Etiquetas.idFiltro;
        } else {
            _queryString = '?type=ingresadas&idFiltro=' + Etiquetas.idFiltro + '&fechaDesde=' + Etiquetas.fechaDesde + '&fechaHasta=' + Etiquetas.fechaHasta;
        }

        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/ptes-etiquetas" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                Etiquetas.loader = false;
                Etiquetas.pedidos = result.data;
            })
            .catch(function(e) {
                setTimeout(function() { Etiquetas.fetchEtiquetas(); }, 2000);
            });


    },
    reloadData: () => {
        var table = $('#table-etiquetas').DataTable();
        table.clear();
        table.rows.add(Etiquetas.pedidos).draw();
    },
    generarImpresion: (at) => {

        Etiquetas.loaderImprimir = true;

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/as-print-etiquetas",
                body: {
                    numAtencion: at
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {


                if (result.status) {
                    Etiquetas.imprimirEtiquetas(result.data, 12)
                } else {
                    Etiquetas.loaderImprimir = false;
                    alert('Proceso no se completo con éxito, puedes reintetar una vez más. Si el inconveniente persiste, comuníquese con nuestra Mesa de Ayuda Ext: 2020.')
                }

            })
            .catch(function(e) {
                Etiquetas.loaderImprimir = false;
                alert(e);
            });
    },
    imprimirEtiquetas: (_data_, _num_) => {


        m.request({
                method: "POST",
                url: "https://eti.hospitalmetropolitano.org/imprimir",
                body: {
                    file: _data_,
                    printer: "ETIQUETAS_MPLUS_EME",
                    pages: _num_,
                    ancho: 670,
                    alto: 120
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                extract: function(xhr) { return { status: xhr.status, body: xhr.responseText } }

            })
            .then(function(response) {
                if (response.status == 201) {
                    Etiquetas.loaderImprimir = false;
                    alert("Proceso realizado con éxito.");
                } else {
                    Etiquetas.loaderImprimir = false;
                    alert(response.body.mensaje);
                }
            })
            .catch(function(e) {
                Etiquetas.loaderImprimir = false;
                alert(e);
            });
    },
    view: (_data) => {

        return Etiquetas.loader ? [
            m(SidebarAdm, { oncreate: SidebarAdm.setPage(27) }),
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
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admsiones "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Impresión de Etiquetas"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Impresión de Etiquetas:"
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

        ] : Etiquetas.error.length !== 0 ? [
            m(SidebarAdm, { oncreate: SidebarAdm.setPage(27) }),
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
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admsiones "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            " Impresión de Etiquetas "
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Impresión de Etiquetas:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m('p', 'No existe información.')
                    ]),





                ])
            ),

        ] : !Etiquetas.loader && Etiquetas.pedidos.length !== 0 ? [
            m(SidebarAdm, { oncreate: SidebarAdm.setPage(27) }),
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
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admsiones "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            " Impresión de Etiquetas "
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Impresión de Etiquetas:"
                    ),
                    m(tableEtiquetas)





                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    " Impresión de Etiquetas "
                ),
                m("div.mg-t-10.bg-white",
                    m("div.pd-20",
                        m(Stopwatch)
                    )
                ),

            ])

        ] : !Etiquetas.loader && Etiquetas.pedidos.length == 0 ? [
            m(SidebarAdm, { oncreate: SidebarAdm.setPage(27) }),
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
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admsiones "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            " Impresión de Etiquetas "
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Impresión de Etiquetas:"
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
            m(SidebarAdm, { oncreate: SidebarAdm.setPage(27) }),
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
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admsiones "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            " Impresión de Etiquetas "
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Impresión de Etiquetas:"
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


export default Etiquetas;