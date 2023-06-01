import Encrypt from '../../../models/encrypt';
import HeaderPrivate from '../../layout/header-private';
import SidebarEme from '../sidebarEme';
import App from '../../app';
import m from 'mithril';
import Notificaciones from '../../../models/notificaciones';
import ReloadNotification from '../../layout/reload-notificacion';


const Updates = {
    data: {
        pedidos: [],
        notificaciones: [],
    },

    fetchPedidos: () => {
        m.request({
                method: "GET",
                url: " https://api.hospitalmetropolitano.org/t/v1/emergencia-pedidos-laboratorio?start=0&length=10",
            })
            .then(function(res) {
                Updates.data.pedidos = res.data;
                Updates.fetchNotificaciones();
            })
            .catch(function(e) {});
    },
    fetchNotificaciones: () => {
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/notificaciones-pedidos?start=0&length=6",
            })
            .then(function(res) {
                Updates.data.notificaciones = res.data;
                if (localStorage.updates == undefined) {
                    Encrypt.setData(Updates.data)
                    Updates.notificar();
                } else {
                    Updates.notificar();
                }
            })
            .catch(function(e) {});
    },
    fetch: () => {
        Updates.fetchPedidos();
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
                nueva_notificacion_muestra(Updates.data.notificaciones[i]);
            }
        }


        for (var i = 0; i < Updates.data.pedidos.length; i++) {
            var igual = false;
            for (var j = 0; j < localNotificaciones.pedidos.length & !igual; j++) {
                if (Updates.data.pedidos[i]['NUM_PEDIDO_MV'] == localNotificaciones.pedidos[j]['NUM_PEDIDO_MV']) {
                    igual = true;
                }
            }
            if (!igual) {
                nueva_notificacion(Updates.data.pedidos[i]);
            }
        }

        Encrypt.setData(Updates.data)
        setTimeout(function() {
            console.log("updates", Updates.data)
            Updates.fetch();
        }, 5000);

    },

};

const iPedido = {

    view: (_data) => {
        return [
            m("p.mg-0.tx-18", [
                m("i.fas.fa-user.mg-r-5.text-secondary"),
                _data.attrs.PTE_MV,
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "HC: " + _data.attrs.HC_MV
                ),
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "N° Pedido MV: " + _data.attrs.NUM_PEDIDO_MV
                )
            ]),
        ];
    },

};

const PedidosEnfermeria = {
    notificaciones: [],
    pedidos: [],
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarEme.page = "";
        App.isAuth("emergencia", 4);

    },
    oncreate: () => {
        document.title = "Pedidos de Laboratorio | " + App.title;
        ReloadNotification.loadPage = "/emergencia/pedidos";
        Updates.fetch();
        loadCustomPage();
        loadPedidos();
        loadNotificaciones();
        idleLogout();
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("emergencia") }),
            m(SidebarEme, { oncreate: SidebarEme.setPage(4) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "Metrovirtual"
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/emergencia" }, [
                                "Emergencia"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Pedidos de Laboratorio - Enfermería"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pedidos de Laboratorio - Enfermería:"
                    ),

                    m("div.row.tx-14", [
                        m(".col-12.mg-b-10.wd-100p[data-label='Filtrar'][id='filterTable']",
                            m("div.row", [
                                m("div.col-sm-12.pd-b-10",
                                    m("div.input-group", [
                                        m("input.form-control.mg-b-20.wd-100p[aautofocus=''][id='_dt_search_text'][placeholder='Buscar por NHC o Nombres y Apellidos completos del Paciente'][title='Buscar'][type='text']"),
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
                                m("table.table.table-sm[id='table-pedidos'][width='100%']"),
                                m("table.table.table-sm.d-none[id='table-state-pedidos'][width='100%']")
                            )
                        ])
                    ]),
                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Notificaciones"
                ),
                m("nav.nav.flex-column[id='navSection']", [
                    m("table.table.table-sm[id='table-notificaciones'][width='100%']"),

                ]),
                m("label.nav-label.mg-t-20.tx-center.d-none", [
                        m(m.route.Link, { href: "/notificaciones-lab" }, [
                            "Ver Todo"
                        ])

                    ],

                ),
            ])
        ];
    },

};

function idleLogout() {
    var t;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer; // catches touchscreen presses as well      
    window.ontouchstart = resetTimer; // catches touchscreen swipes as well      
    window.ontouchmove = resetTimer; // required by some devices 
    window.onclick = resetTimer; // catches touchpad clicks as well
    window.onkeydown = resetTimer;
    window.addEventListener('scroll', resetTimer, true); // improved; see comments

    function yourFunction() {
        window.location.reload();
    }

    function resetTimer() {
        clearTimeout(t);
        t = setTimeout(yourFunction, 300000); // 5 minutos de incactividad en pagina in time is in milliseconds
    }
}


function loadPedidos() {

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
    var table = $("#table-pedidos").DataTable({
        "ajax": {
            url: "https://api.hospitalmetropolitano.org/t/v1/emergencia-pedidos-laboratorio",
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
            title: "FECHA Y HORA:"
        }, {
            title: "PACIENTE:"
        }, {
            title: "OPCIONES:"
        }, ],
        aoColumnDefs: [{
                mRender: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: false,
                aTargets: [0],
                orderable: false,
            },
            {
                mRender: function(data, type, full) {
                    return full.HC_MV;
                },
                visible: false,
                aTargets: [1],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.PTE_MV;

                },
                visible: false,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [3],
                width: "20%",

                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [4],
                width: "60%",
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [5],

                orderable: false,

            },
        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

        },
        drawCallback: function(settings) {

            $(".table-content").show();
            $(".table-loader").hide();

            settings.aoData.map(function(_i) {


                m.mount(_i.anCells[3], {
                    view: function() {
                        return m("p.mg-0.tx-12", [
                            m("i.fas.fa-calendar.mg-r-5.text-secondary"),
                            _i._aData.FECHA_PEDIDO + " " + _i._aData.HORA_PEDIDO
                        ])
                    }
                });
                m.mount(_i.anCells[4], { view: function() { return m(iPedido, _i._aData) } });
                m.mount(_i.anCells[5], {
                    view: function() {
                        return m(".btn-group.wd-100p[role='group'][aria-label='Opciones']", [

                            m(m.route.Link, { href: "/emergencia/enfermeria/pedido/" + _i._aData.NUM_PEDIDO_MV, target: "_blank", class: "btn btn-xs btn-primary" }, [
                                m("i.fas.fa-file-alt.mg-r-5"),
                            ], "Ver Pedido"),



                        ])
                    }
                });
            })




        },
    }).on('xhr.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader').hide();
        $('.table-content').show();
        //   initDataPicker();
    }).on('page.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader').show();
        $('.table-content').hide();

    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });


    $('#button-buscar-t').click(function(e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#_dt_search_text').val()).draw();
    });
    $('#filtrar').click(function(e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search('fechas-' + $('#desde').val() + '-' + $('#hasta').val()).draw();
    });

    $('#resetTable').click(function(e) {
        e.preventDefault();
        $('#_dt_search_text').val('');
        $('#desde').val('');
        $('#hasta').val('');
        table.search('').draw();
    });


    return table;



}

function loadNotificaciones() {


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
    var table = $("#table-notificaciones").DataTable({
        "ajax": {

            url: "https://api.hospitalmetropolitano.org/t/v1/notificaciones-pedidos",
            dataSrc: "data",
            serverSide: true,
        },
        processing: true,
        serverSide: true,
        responsive: false,
        dom: 't',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Todavía no tienes resultados disponibles.",
            sEmptyTable: "No existe notificaciones",
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
        columns: false,
        aoColumnDefs: [{
                mRender: function(data, type, row, meta) {
                    return "";
                },
                visible: true,
                aTargets: [0],
                orderable: false,
            },

        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
        drawCallback: function(settings) {



            settings.aoData.map(function(_i) {

                m.mount(_i.anCells[0], {
                    view: function() {
                        return m("div.demo-static-toast",
                            m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", {
                                onclick: () => {
                                    m.route.set('/emergencia/enfermeria/pedido/' + _i._aData.idPedido);
                                },
                            }, [
                                m("div.toast-header.bg-danger", [
                                    m("small.tx-white.tx-5.mg-b-0.mg-r-auto",
                                        _i._aData.title
                                    ),
                                    m("small.tx-white",
                                        moment.unix(_i._aData.timestamp).format("HH:mm")
                                    ),
                                ]),
                                m("div.toast-body.small",
                                    _i._aData.message.substring(0, 10) + "..."
                                )
                            ])
                        )
                    }
                });


            })

        },

    });


    return table;





}

function nueva_notificacion_muestra(_mData) {
    if (Notification) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }


        Notificaciones.setNot();

        var _data_ = JSON.parse(_mData.dataPedido);
        var title = "Metrovirtual: " + _mData.title;
        var extra = {
            icon: "assets/favicon.ico",
            body: "Pedido N°: " + _mData.idPedido + "\n" + "HC: " + _data_.HC + "\n" + "Pte: " + _data_.NOMBRE_PACIENTE

        }
        var noti = new Notification(title, extra)
        noti.onclick = () => {
            m.route.set("/emergencia/enfermeria/pedido/" + _mData.idPedido);
        }
        noti.onclose = {
            // Al cerrar
        }
        setTimeout(function() { noti.close() }, 30000)
    }
}

function nueva_notificacion(_mData) {
    if (Notification) {
        if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }

        Notificaciones.setNot();

        var title = "Metrovirtual: Nuevo Pedido"
        var extra = {
            icon: "assets/favicon.ico",
            body: "Pedido N°: " + _mData.NUM_PEDIDO_MV + "\n" + "HC: " + _mData.HC_MV + "\n" + "Pte: " + _mData.PTE_MV
        }
        var noti = new Notification(title, extra)
        noti.onclick = () => {
            m.route.set("/emergencia/enfermeria/pedido/" + _mData.NUM_PEDIDO_MV);
        }
        noti.onclose = {
            // Al cerrar
        }
        setTimeout(function() { noti.close() }, 30000)
    }
}

function loadCustomPage() {

    feather.replace();

    ////////// NAVBAR //////////

    // Initialize PerfectScrollbar of navbar menu for mobile only
    if (window.matchMedia('(max-width: 991px)').matches) {
        const psNavbar = new PerfectScrollbar('#navbarMenu', {
            suppressScrollX: true
        });
    }

    // Showing sub-menu of active menu on navbar when mobile
    function showNavbarActiveSub() {
        if (window.matchMedia('(max-width: 991px)').matches) {
            $('#navbarMenu .active').addClass('show');
        } else {
            $('#navbarMenu .active').removeClass('show');
        }
    }

    showNavbarActiveSub()
    $(window).resize(function() {
        showNavbarActiveSub()
    })

    // Initialize backdrop for overlay purpose
    $('body').append('<div class="backdrop"></div>');


    // Showing sub menu of navbar menu while hiding other siblings
    $('.navbar-menu .with-sub .nav-link').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('show');
        $(this).parent().siblings().removeClass('show');

        if (window.matchMedia('(max-width: 991px)').matches) {
            psNavbar.update();
        }
    })

    // Closing dropdown menu of navbar menu
    $(document).on('click touchstart', function(e) {
        e.stopPropagation();

        // closing nav sub menu of header when clicking outside of it
        if (window.matchMedia('(min-width: 992px)').matches) {
            var navTarg = $(e.target).closest('.navbar-menu .nav-item').length;
            if (!navTarg) {
                $('.navbar-header .show').removeClass('show');
            }
        }
    })

    $('#mainMenuClose').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('navbar-nav-show');
    });

    $('#sidebarMenuOpen').on('click', function(e) {
        e.preventDefault();
        $('body').addClass('sidebar-show');
    })

    // Navbar Search
    $('#navbarSearch').on('click', function(e) {
        e.preventDefault();
        $('.navbar-search').addClass('visible');
        $('.backdrop').addClass('show');
    })

    $('#navbarSearchClose').on('click', function(e) {
        e.preventDefault();
        $('.navbar-search').removeClass('visible');
        $('.backdrop').removeClass('show');
    })



    ////////// SIDEBAR //////////

    // Initialize PerfectScrollbar for sidebar menu
    if ($('#sidebarMenu').length) {
        const psSidebar = new PerfectScrollbar('#sidebarMenu', {
            suppressScrollX: true
        });


        // Showing sub menu in sidebar
        $('.sidebar-nav .with-sub').on('click', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('show');

            psSidebar.update();
        })
    }


    $('#mainMenuOpen').on('click touchstart', function(e) {
        e.preventDefault();
        $('body').addClass('navbar-nav-show');
    })

    $('#sidebarMenuClose').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('sidebar-show');
    })

    // hide sidebar when clicking outside of it
    $(document).on('click touchstart', function(e) {
        e.stopPropagation();

        // closing of sidebar menu when clicking outside of it
        if (!$(e.target).closest('.burger-menu').length) {
            var sb = $(e.target).closest('.sidebar').length;
            var nb = $(e.target).closest('.navbar-menu-wrapper').length;
            if (!sb && !nb) {
                if ($('body').hasClass('navbar-nav-show')) {
                    $('body').removeClass('navbar-nav-show');
                } else {
                    $('body').removeClass('sidebar-show');
                }
            }
        }
    });

};

export default PedidosEnfermeria;