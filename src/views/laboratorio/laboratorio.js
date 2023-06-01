import HeaderPrivate from '../layout/header-private';
import Sidebarlab from './sidebarLab';
import App from '../app';

const MenuLaboratorio = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "MetroPlus"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Laboratorio"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Laboratorio:"
                    ),

                    m("div.row.tx-14", [

                        (App.isShow('laboratorio', 16) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/laboratorio/flebotomista")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-flask tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Flebotomista",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Flebotomista",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),
                        (App.isShow('laboratorio', 6) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/laboratorio/formularios")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-file-alt tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Formularios Epidemiológicos",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Formularios Epidemiológicos",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),
                        (App.isShow('laboratorio', 15) ? [m("li", {
                            "class": "list-item bg-white wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/laboratorio/notificaciones")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-bell tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [
                                    m("p", { "class": "tx-18 mg-b-0" },
                                        "Notificaciones de Laboratorio",
                                    ),
                                    m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                        "Ir a Notificaciones de Laboratorio",
                                    )
                                ])
                            ]),

                        ])] : []),
                        (App.isShow('laboratorio', 21) ? [m("li", {
                            "class": "list-item bg-white wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/laboratorio/lisa/pedidos/ingresados")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-sitemap tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [
                                    m("p", { "class": "tx-18 mg-b-0" },
                                        "LISA",
                                    ),
                                    m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                        "Ir a LISA v1.0",
                                    )
                                ])
                            ]),

                        ])] : []),
                        (App.isShow('laboratorio', 28) ? [m("li", {
                            "class": "list-item bg-white wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/laboratorio/etiquetas")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-cog tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [
                                    m("p", { "class": "tx-18 mg-b-0" },
                                        "Configuración de Etiquetas",
                                    ),
                                    m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                        "Ir a Configuración de Etiquetas",
                                    )
                                ])
                            ]),

                        ])] : []),






                    ]),

                ])
            ),
        ];
    },

};

const Laboratorio = {
    oninit: () => {
        HeaderPrivate.page = "";
        Sidebarlab.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Laboratorio | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(Sidebarlab),
            m(MenuLaboratorio)
        ];
    },

};




export default Laboratorio;