import HeaderPrivate from '../../layout/header-private';
import SidebarLab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';

const NotificacionesLab = {
    pacientes: [],
    showPacientes: "d-none",
    showBusquedas: "d-none",
    tipoBusqueda: "",
    searchField: "",
    showProcess: "d-none",
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarLab.page = "";
        NotificacionesLab.searchField = "";
        NotificacionesLab.showBusquedas = "";
        NotificacionesLab.pacientes = [];
        App.isAuth();
    },
    oncreate: () => {
        document.title = "Notificaciones de Laboratorio | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components",
                m("div.container", {
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
                                " LABORATORIO "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Notificaciones de Laboratorio"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10", [
                        "Notificaciones de Laboratorio:"

                    ]

                    ),

                    m("div.row.tx-14", [
                        m("div.col-12.mg-b-10.wd-100p",
                            m("div.row.mg-t-10", [

                                m("li", {
                                    "class": "list-item bg-white wd-100p",
                                    "style": { "cursor": "pointer" },
                                    onclick: () => {
                                        m.route.set("/laboratorio/notificaciones/filtros", {});
                                    }
                                }, [
                                    m("div", { "class": "media" }, [
                                        m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                            m("i", { "class": "fas fa-filter tx-30 tx-white" })
                                        ),
                                        m("div", { "class": "media-body mg-l-15" }, [
                                            m("p", { "class": "tx-18 mg-b-0" },
                                                'Filtros'
                                            ),
                                            m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                                "Ir a Filtros"
                                            )
                                        ])
                                    ]),

                                ]),
                                m("li", {
                                    "class": "list-item bg-white wd-100p",
                                    "style": { "cursor": "pointer" },
                                    onclick: () => {
                                        m.route.set("/laboratorio/notificaciones/enviadas", {});
                                    }
                                }, [
                                    m("div", { "class": "media" }, [
                                        m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                            m("i", { "class": "fas fa-mail-bulk tx-30 tx-white" })
                                        ),
                                        m("div", { "class": "media-body mg-l-15" }, [
                                            m("p", { "class": "tx-18 mg-b-0" },
                                                'Notificaciones Enviadas'
                                            ),
                                            m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                                "Ir a Notificaciones Enviadas"
                                            )
                                        ])
                                    ]),

                                ]),
                                m("li", {
                                    "class": "list-item bg-white wd-100p",
                                    "style": { "cursor": "pointer" },
                                    onclick: () => {
                                        m.route.set("/laboratorio/notificaciones/pendientes", {});
                                    }
                                }, [
                                    m("div", { "class": "media" }, [
                                        m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                            m("i", { "class": "fas fa-hourglass tx-30 tx-white" })
                                        ),
                                        m("div", { "class": "media-body mg-l-15" }, [
                                            m("p", { "class": "tx-18 mg-b-0" },
                                                'Notificaciones Pendientes'
                                            ),
                                            m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                                "Ir a Notificaciones Pendientes"
                                            )
                                        ])
                                    ]),

                                ]),

                                m("li", {
                                    "class": "list-item bg-white wd-100p",
                                    "style": { "cursor": "pointer" },
                                    onclick: () => {
                                        m.route.set("/laboratorio/notificaciones/error", {});
                                    }
                                }, [
                                    m("div", { "class": "media" }, [
                                        m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                            m("i", { "class": "fas fa-exclamation-triangle tx-30 tx-white" })
                                        ),
                                        m("div", { "class": "media-body mg-l-15" }, [
                                            m("p", { "class": "tx-18 mg-b-0" },
                                                'Notificaciones con Error'
                                            ),
                                            m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                                "Ir a Notificaciones con Error"
                                            )
                                        ])
                                    ]),

                                ]),





                            ])
                        ),
                        m("div.table-loader.col-12.wd-100p", {
                            class: NotificacionesLab.showProcess,
                        },
                            m("div.placeholder-paragraph", [
                                m("div.line"),
                                m("div.line")
                            ])
                        ),
                        m("div.col-12", {
                            class: "d-none",
                        }, [
                            m("label.nav-label.tx-semibold",
                                "Búsquedas Recientes:"
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-ultimas-busquedas'][width='100%']"),
                            )
                        ]),

                    ]),
                ])
            ),
            m("div.section-nav", [


            ])
        ];
    },

};


export default NotificacionesLab;