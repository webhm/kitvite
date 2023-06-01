import HeaderPrivate from '../../layout/header-private';
import SidebarMantenimiento from '../sidebarMantenimiento';
import App from '../../app';
import m from 'mithril';




const IntegracionHigienizacion = {
    mensajes: [],
    fetchPacientes: () => {
        IntegracionHigienizacion.showBusquedas = "d-none";
        IntegracionHigienizacion.showPacientes = "d-none";
        IntegracionHigienizacion.showProcess = "";
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/integracion-higienizacion",

            })
            .then(function(res) {
                IntegracionHigienizacion.showPacientes = "";
                IntegracionHigienizacion.showProcess = "d-none";
                IntegracionHigienizacion.mensajes = res.data;

                var table = $('#table-higienizacion').DataTable();
                table.clear();
                table.rows.add(IntegracionHigienizacion.mensajes).draw();
            })
            .catch(function(e) {});

    },
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarMantenimiento.page = "";
        IntegracionHigienizacion.mensajes = [];
        App.isAuth();
    },
    oncreate: () => {
        document.title = "Integración de Higienización | " + App.title;
        //  Action
        loadInboundTrx();
        loadOutboundTrx();
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("mantenimiento") }),
            m(SidebarMantenimiento, { oncreate: SidebarMantenimiento.setPage(8) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " Metrovirtual "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/mantenimiento" }, [
                                " Mantenimiento "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Integración de Higienización"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Integración de Higienización:"
                    ),

                    m("div.row.tx-14", [
                        m("div.col-12.mg-b-10.wd-100p",
                            m("div.row.mg-t-10", [
                                m("div.col-sm-12.pd-b-10", [
                                        m("label.nav-label.tx-semibold",
                                            "Transacciones Inbound:"
                                        ),
                                        m("hr"),
                                    ]


                                ),
                            ])
                        ),
                        m("div.table-loader-in.col-12.wd-100p",
                            m("div.placeholder-paragraph", [
                                m("div.line"),
                                m("div.line")
                            ])
                        ),
                        m("div.table-content-in.col-12.mg-b-10", [
                            m("div.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-inboundTRX'][width='100%']"),
                            )
                        ]),
                        m("div.col-12.mg-t-10.mg-b-10.wd-100p",
                            m("div.row.mg-t-10", [
                                m("div.col-sm-12.pd-b-10", [
                                        m("label.nav-label.tx-semibold",
                                            "Transacciones Outbound:"
                                        ),
                                        m("hr"),
                                    ]


                                ),
                            ])
                        ),
                        m("div.table-loader-out.col-12.wd-100p",
                            m("div.placeholder-paragraph", [
                                m("div.line"),
                                m("div.line")
                            ])
                        ),
                        m("div.table-content-out.col-12.mg-b-10", [
                            m("div.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-outboundTRX'][width='100%']"),
                            )
                        ]),

                    ]),
                ])
            ),

        ];
    },

};




function loadInboundTrx() {

    $(".table-content-in").hide();
    $(".table-loader-in").show();

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
    var table = $("#table-inboundTRX").DataTable({
        "ajax": {
            url: "https://api.hospitalmetropolitano.org/t/v1/hg-in",
            dataSrc: "data",
            serverSide: true,
        },
        processing: true,
        serverSide: true,
        responsive: false,
        dom: 'ltp',
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
        columns: [{
            title: "ID:"
        }, {
            title: "CODIGO HTTP:"
        }, {
            title: "STATUS:"
        }, {
            title: "HABITACIÓN:"
        }, {
            title: "TIMESTAMP:"
        }],
        aoColumnDefs: [{
                mRender: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
                orderable: false,
            },
            {
                mRender: function(data, type, full) {
                    return '<span class="badge badge-success mg-r-2">200</span> ';
                },
                visible: true,
                aTargets: [1],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.status;

                },
                visible: true,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.hab;
                },
                visible: true,
                aTargets: [3],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.timestamp;
                },
                visible: true,
                aTargets: [4],
                orderable: false,

            },


        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

        },
        drawCallback: function(settings) {

            $(".table-content-in").show();
            $(".table-loader-in").hide();

        },
    }).on('xhr.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader-in').hide();
        $('.table-content-in').show();
        //   initDataPicker();
    }).on('page.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader-in').show();
        $('.table-content-in').hide();

    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });

    return table;



}

function loadOutboundTrx() {

    $(".table-content-out").hide();
    $(".table-loader-out").show();

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
    var table = $("#table-outboundTRX").DataTable({
        "ajax": {
            url: "https://api.hospitalmetropolitano.org/t/v1/hg-out",
            dataSrc: "data",
            serverSide: true,
        },
        processing: true,
        serverSide: true,
        responsive: false,
        dom: 'ltp',
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
        columns: [{
                title: "ID:"
            }, {
                title: "CODIGO HTTP:"
            }, {
                title: "STATUS:"
            }, {
                title: "HABITACIÓN:"
            },
            {
                title: "TIMESTAMP:"
            },
            {
                title: "OPCIONES:"
            }
        ],
        aoColumnDefs: [{
                mRender: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
                orderable: false,
            },
            {
                mRender: function(data, type, full) {
                    return '<span class="badge badge-success mg-r-2">200</span> ';
                },
                visible: true,
                aTargets: [1],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.ESTADO;

                },
                visible: true,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.PK_FK_HABITACION;
                },
                visible: true,
                aTargets: [3],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.timestamp;
                },
                visible: true,
                aTargets: [4],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return '<a href="' + full.URL_LOG + '" role="button" class="btn btn-xs btn-block btn-primary" target="_blank">Ver Log</a>';
                },
                visible: true,
                aTargets: [5],
                orderable: false,

            },




        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

        },
        drawCallback: function(settings) {

            $(".table-content-out").show();
            $(".table-loader-out").hide();

        },
    }).on('xhr.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader-out').hide();
        $('.table-content-out').show();
    }).on('page.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader-out').show();
        $('.table-content-out').hide();

    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });

    return table;



}



export default IntegracionHigienizacion;