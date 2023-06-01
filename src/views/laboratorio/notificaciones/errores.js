import HeaderPrivate from '../../layout/header-private';
import SidebarLab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';



const DetalleNotificacion = {
    data: [],
    fetch: () => {

        DetalleNotificacion.data = [];
        for (var i = 0; i < NotificacionesErroresLab.dataErroresEnvio.length; i++) {
            if (NotificacionesErroresLab.dataErroresEnvio[i].sc == NotificacionesErroresLab.sc) {
                DetalleNotificacion.data = NotificacionesErroresLab.dataErroresEnvio[i];
            }
        }

    },
    fetchFiltro: () => {

        DetalleNotificacion.data = [];
        for (var i = 0; i < NotificacionesErroresLab.dataErroresFiltro.length; i++) {
            if (NotificacionesErroresLab.dataErroresFiltro[i].sc == NotificacionesErroresLab.sc) {
                DetalleNotificacion.data = NotificacionesErroresLab.dataErroresFiltro[i];
            }
        }

    },
    view: () => {

        if (NotificacionesErroresLab.showBitacora.length !== 0 && DetalleNotificacion.data.length !== 0) {
            return [
                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                    m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                        m("small.pd-2.tx-20",
                            m("i.fas.fa-times-circle.pd-2", {
                                "style": { "cursor": "pointer" },
                                title: "Cerrar",
                                onclick: () => {

                                    NotificacionesErroresLab.showBitacora = "";
                                    DetalleNotificacion.data = [];
                                    m.route.set("/laboratorio/notificaciones/error", {});


                                }
                            }

                            )


                        ),

                    ),

                    m("div.mg-b-30",
                        m("i.tx-40.fas.fa-envelope.")
                    ),
                    m("p.mg-5.tx-right", [
                        m("button.btn.btn-xs.btn-secondary.mg-l-2[type='button']", {
                            onclick: () => {

                            }
                        },
                            m("i.fas.fa-edit.mg-r-5"),
                            " Reenviar "

                        ),

                        m("button.btn.btn-xs.btn-danger.mg-l-2[type='button']", {
                            onclick: () => {

                            }
                        },
                            m("i.fas.fa-times-circle.mg-r-5"),
                            " Reprocesar "

                        )
                    ]),
                    m("h5.tx-inverse.mg-b-10",
                        "SC: " + DetalleNotificacion.data.sc
                    ),




                ])
            ]
        } else {

            if (NotificacionesErroresLab.showBitacora.length !== 0) {
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


const NotificacionesErroresLab = {
    dataErroresFiltro: [],
    dataErroresEnvio: [],
    showBitacora: "",
    sc: "",
    searchField: "",
    fetch: () => {
        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/nss/v1/listar/ordenes?type=errorEnviadas",
        })
            .then(function (result) {
                NotificacionesErroresLab.dataErroresEnvio = result.data;
                loadNotificacionesErroresLab();

            })
            .catch(function (e) { })
    },
    fetchErrorFiltro: () => {
        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/nss/v1/listar/ordenes?type=errorFiltradas",
        })
            .then(function (result) {
                NotificacionesErroresLab.dataErroresFiltro = result.data;
                loadNotificacionesErroresFiltroLab();

            })
            .catch(function (e) { })
    },

    oninit: (_data) => {
        HeaderPrivate.page = "";
        SidebarLab.page = "";
        App.isAuth('laboratorio', 15);

    },
    oncreate: (_data) => {
        document.title = "Notificaciones con Error | " + App.title;
        NotificacionesErroresLab.fetch();
        NotificacionesErroresLab.fetchErrorFiltro();
    },

    view: (_data) => {

        if (_data.attrs !== undefined && _data.attrs.sc !== undefined && _data.attrs.type !== undefined) {
            NotificacionesErroresLab.sc = _data.attrs.sc;
            NotificacionesErroresLab.showBitacora = "d-none";
            if (_data.attrs.type == 'errorNotificacion') {
                DetalleNotificacion.fetch();
            } else {
                // Error Filtro errorFiltro
                DetalleNotificacion.fetchFiltro();
            }

        } else {
            NotificacionesErroresLab.sc = "";
            NotificacionesErroresLab.showBitacora = "";
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
                            "Notificaciones con Error"
                        ),
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Notificaciones con Error:"
                    ),

                    m("div.row.animated.fadeInUp", {
                        class: NotificacionesErroresLab.showBitacora
                    }, [
                        m("div.col-12.wd-100p",
                            m("div.row.mg-t-10", [
                                m("div.col-sm-12", [
                                    m("label.nav-label.tx-semibold",
                                        "Errores en Envío:"
                                    ),

                                ]


                                ),
                            ])
                        ),
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

                                m("table.table.table-sm.tx-12[id='table-notificaciones-errores'][width='100%']"),
                            ]),

                        ]),
                        m("div.col-12.wd-100p",
                            m("div.row.mg-t-10", [
                                m("div.col-sm-12", [
                                    m("label.nav-label.tx-semibold",
                                        "Errores en Filtro:"
                                    ),

                                ]


                                ),
                            ])
                        ),
                        m("div.col-12", [

                            m("div.filemgr-content-header.", [
                                m("i[data-feather='search']"),
                                m("div.search-form",
                                    m("input.form-control[type='search'][placeholder='Buscar'][id='searchFieldFiltro']")
                                ),

                            ]),



                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.mg-t-70", [

                                m("table.table.table-sm.tx-12[id='table-notificaciones-errores-filtro'][width='100%']"),
                            ])

                        ]),
                    ]),
                    m(DetalleNotificacion)
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

function loadNotificacionesErroresLab() {

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
    var table = $("#table-notificaciones-errores").DataTable({
        data: NotificacionesErroresLab.dataErroresEnvio,
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
            title: "SC:"
        }, {
            title: "FECHA:"
        }, {
            title: "NHC:"
        }, {
            title: "PACIENTE:"
        },
        {
            title: "STATUS:"
        },
        ],

        aoColumnDefs: [{
            mRender: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            },
            visible: true,
            aTargets: [0],
        },
        {
            mRender: function (data, type, full) {
                return full.sc;
            },
            visible: true,
            aTargets: [1],

        },
        {
            mRender: function (data, type, full) {
                return full.fechaExamen;

            },
            visible: true,
            aTargets: [2],

        },
        {
            mRender: function (data, type, full) {
                return full.numeroHistoriaClinica;
            },
            visible: true,
            aTargets: [3],

        },
        {
            mRender: function (data, type, full) {
                return full.apellidosPaciente + ' ' + full.nombresPaciente;
            },
            visible: true,
            aTargets: [4],

        },
        {
            mRender: function (data, type, full) {
                return full.statusEnvio;
            },
            visible: true,
            aTargets: [5],

        },


        ],


        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {


            $(nRow).attr('id', aData.sc).css('cursor', "pointer");
            $(nRow).addClass("verNotificacion");

        },
        drawCallback: function (settings) {

            $(".table-content").show();
            $(".table-loader").hide();


            $('.verNotificacion').click(function (e) {
                e.preventDefault();
                var $this = this;
                NotificacionesErroresLab.showBitacora = "d-none";
                m.route.set("/laboratorio/notificaciones/error/", {
                    sc: $this.id,
                    type: 'errorNotificacion'
                });
            });



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

function loadNotificacionesErroresFiltroLab() {

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
    var table = $("#table-notificaciones-errores-filtro").DataTable({
        data: NotificacionesErroresLab.dataErroresFiltro,
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
            title: "SC:"
        }, {
            title: "FECHA:"
        }, {
            title: "NHC:"
        }, {
            title: "PACIENTE:"
        },
        {
            title: "STATUS:"
        },
        ],

        aoColumnDefs: [{
            mRender: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            },
            visible: true,
            aTargets: [0],
        },
        {
            mRender: function (data, type, full) {
                return full.sc;
            },
            visible: true,
            aTargets: [1],

        },
        {
            mRender: function (data, type, full) {
                return full.fechaExamen;

            },
            visible: true,
            aTargets: [2],

        },
        {
            mRender: function (data, type, full) {
                return full.numeroHistoriaClinica;
            },
            visible: true,
            aTargets: [3],

        },
        {
            mRender: function (data, type, full) {
                return full.apellidosPaciente + ' ' + full.nombresPaciente;
            },
            visible: true,
            aTargets: [4],

        },
        {
            mRender: function (data, type, full) {
                return full.statusEnvio;
            },
            visible: true,
            aTargets: [5],

        },


        ],


        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            $(nRow).attr('id', aData.sc).css('cursor', "pointer");
            $(nRow).addClass("verNotificacionFiltro");

        },
        drawCallback: function (settings) {

            $(".table-content").show();
            $(".table-loader").hide();

            $('.verNotificacionFiltro').click(function (e) {
                e.preventDefault();
                var $this = this;
                NotificacionesErroresLab.showBitacora = "d-none";
                m.route.set("/laboratorio/notificaciones/error/", {
                    sc: $this.id,
                    type: 'errorNotificacionFiltro'
                });
            });


        },

    });


    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });


    $('#searchFieldFiltro').keyup(function (e) {
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#searchFieldFiltro').val()).draw();
    });


    return table;

};





function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}


export default NotificacionesErroresLab;