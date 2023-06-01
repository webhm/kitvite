import Encrypt from '../../../models/encrypt';
import HeaderPrivate from '../../layout/header-private';
import Sidebarlab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';
import ReloadNotification from '../../layout/reload-notificacion';


const Updates = {
    data: {
        formularios: [],
        notificaciones: [],
    },
    fetchNotificaciones: () => {
        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/t/v1/formularios-epis?start=0&length=6",
        })
            .then(function (res) {
                Updates.data.notificaciones = res.data;
                if (localStorage.updates == undefined) {
                    Encrypt.setData(Updates.data)
                    Updates.notificar();
                } else {
                    Updates.notificar();
                }
            })
            .catch(function (e) { });
    },
    fetch: () => {
        Updates.fetchNotificaciones();
    },

    notificar: () => {

        let localNotificaciones = Encrypt.getData();

        for (var i = 0; i < Updates.data.notificaciones.length; i++) {
            var igual = false;
            for (var j = 0; j < localNotificaciones.notificaciones.length & !igual; j++) {
                if (Updates.data.notificaciones[i]['id'] == localNotificaciones.notificaciones[j]['id']) {
                    igual = true;
                }
            }
            if (!igual) {
                nueva_notificacion_FOR(Updates.data.notificaciones[i]);
            }
        }



        Encrypt.setData(Updates.data)
        setTimeout(function () {
            Updates.fetch();
        }, 5000);

    },

};


const iPedido = {

    view: (_data) => {
        return [
            m("p.mg-0.tx-18", [
                m("i.fas.fa-user.mg-r-5.text-secondary"),
                _data.attrs.NM_PACIENTE,
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "HC: " + _data.attrs.CD_PACIENTE
                ),
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "N° Atención MV: " + _data.attrs.CD_ATENDIMENTO
                )
            ]),
        ];
    },

};

const Formularios = {
    notificaciones: [],
    pedidos: [],
    oninit: () => {
        HeaderPrivate.page = "";
        Sidebarlab.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Formularios Epidemiológicos | " + App.title;
        ReloadNotification.loadPage = "/laboratorio/formularios";
        loadFormularios();
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(Sidebarlab, { oncreate: Sidebarlab.setPage(6) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",

                            m(m.route.Link, { href: "/" }, [
                                "Metrovirtual"
                            ])


                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                "Laboratorio"
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Formularios Epidemiológicos"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Formularios Epidemiológicos:"
                    ),

                    m("div.row.tx-14", [
                        m(".col-12.mg-b-10.wd-100p[data-label='Filtrar'][id='filterTable']",
                            m("div.row", [
                                m("div.col-sm-12.pd-b-10",
                                    m("div.input-group", [
                                        m("input.form-control.mg-b-20.wd-100p[aautofocus=''][id='_dt_search_text'][placeholder='Buscar por NHC o Apellidos y Nombres completos del Paciente'][title='Buscar'][type='text']"),
                                        m("div.input-group-append",
                                            m("button.btn.btn-outline-light[id='button-buscar-t'][type='button']", [
                                                m("i.icon.ion-md-search"),
                                                " Buscar "
                                            ]),
                                            m("button.btn.btn-outline-light[id='resetTable'][type='button']", [
                                                m("i.icon.ion-md-close-circle"),
                                                " Borrar "
                                            ])
                                        )
                                    ])
                                ),
                                m("div.col-sm-12.pd-b-10.d-none",
                                    m("div.input-group", [
                                        m("input.form-control[id='desde'][placeholder='Desde'][title='Desde'][type='text']"),
                                        m("input.form-control[id='hasta'][placeholder='Hasta'][title='Hasta'][type='text']"),
                                        m("div.input-group-append", [
                                            m("button.btn.btn-outline-light[id='filtrar'][title='Buscar'][type='button']", [
                                                m("i.icon.ion-md-funnel"),
                                                " Filtrar "
                                            ]),

                                        ])
                                    ])
                                )
                            ])
                        ),
                        m("div.col-12", [
                            m("div.table-loader.wd-100p",
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-formularios'][width='100%']"),
                                m("table.d-none[id='table-status-formularios'][width='100%']"),

                            )
                        ])
                    ]),
                ])
            ),

        ];
    },

};


function loadFormularios() {

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
    var table = $("#table-formularios").DataTable({
        "ajax": {
            url: "https://api.hospitalmetropolitano.org/t/v1/formularios-epis",
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
            title: "HC"
        }, {
            title: "PACINTE"
        }, {
            title: "FECHA:"
        }, {
            title: "PACIENTE:"
        }, {
            title: "OPCIONES:"
        },],
        aoColumnDefs: [{
            mRender: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            },
            visible: false,
            aTargets: [0],
            orderable: false,
        },
        {
            mRender: function (data, type, full) {
                return full.HC_MV;
            },
            visible: false,
            aTargets: [1],
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return full.PTE_MV;

            },
            visible: false,
            aTargets: [2],
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return "";
            },
            visible: true,
            aTargets: [3],
            width: "15%",

            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return "";
            },
            visible: true,
            aTargets: [4],
            width: "50%",
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return "";
            },
            visible: true,
            aTargets: [5],
            width: "35%",
            orderable: false,

        },
        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

        },
        drawCallback: function (settings) {

            $(".table-content").show();
            $(".table-loader").hide();

            settings.aoData.map(function (_i) {


                m.mount(_i.anCells[3], {
                    view: function () {
                        return m("p.mg-0.tx-12", [
                            m("i.fas.fa-calendar.mg-r-5.text-secondary"),
                            _i._aData.DT_ATENDIMENTO
                        ])
                    }
                });
                m.mount(_i.anCells[4], { view: function () { return m(iPedido, _i._aData) } });
                m.mount(_i.anCells[5], {
                    view: function () {

                        if (_i._aData.CD_DOCUMENTO == '313') {

                            // Epi 1
                            return m(".btn-group.wd-100p[role='group'][aria-label='Opciones']", [
                                m("a.btn.btn-xs.btn-primary", { href: _i._aData.URL, target: "_blank" }, [
                                    m("i.fas.fa-file-alt.mg-r-5"),
                                ], "Ver Ficha Epi 1"),

                            ])

                        } else {

                            // Epidemiológica
                            return m(".btn-group.wd-100p[role='group'][aria-label='Opciones']", [
                                m("a.btn.btn-xs.btn-primary", { href: _i._aData.URL, target: "_blank" }, [
                                    m("i.fas.fa-file-alt.mg-r-5"),
                                ], "Ver Ficha Epidemiológica"),

                            ])
                        }



                    }
                });
            })




        },
    }).on('xhr.dt', function (e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader').hide();
        $('.table-content').show();
        //   initDataPicker();
    }).on('page.dt', function (e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader').show();
        $('.table-content').hide();

    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });


    $('#button-buscar-t').click(function (e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#_dt_search_text').val()).draw();
    });
    $('#filtrar').click(function (e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search('fechas-' + $('#desde').val() + '-' + $('#hasta').val()).draw();
    });

    $('#resetTable').click(function (e) {
        e.preventDefault();
        $('#_dt_search_text').val('');
        $('#desde').val('');
        $('#hasta').val('');
        table.search('').draw();
    });


    return table;



}




export default Formularios;