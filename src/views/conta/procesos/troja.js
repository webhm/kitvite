import HeaderPrivate from '../../layout/header-private';
import SidebarTRoja from './sidebarTRoja';
import App from '../../app';

const MenuTRoja = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.TRojainer", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "Metroplus"
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/contabilidad" }, [
                                "Contabilidad"
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "TARJETA ROJA"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Tarjeta Roja:"
                    ),

                    m("div.row.tx-14", [

                        (App.isShow('contabilidad', 32) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/contabilidad/proceso/tarjeta-roja/nueva")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-file tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Nueva Tarjeta Roja",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Nueva Tarjeta Roja",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),

                        (App.isShow('contabilidad', 32) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/contabilidad/proceso/tarjeta-roja/autorizaciones")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-user-edit tx-30 tx-white" })

                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Autorizaciones",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Autorizaciones",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),

                        (App.isShow('contabilidad', 33) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/contabilidad/proceso/tarjeta-roja/solicitudes")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-inbox tx-30 tx-white" })

                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Todas las Solicitudes",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Todas las Solicitudes",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),

                        (App.isShow('contabilidad', 34) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/contabilidad/proceso/tarjeta-roja/configuracion")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-cog tx-30 tx-white" })

                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Configuración del Proceso",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Configuración del Proceso",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),



                    ]),

                ])
            ),
        ];
    },

};

const TRoja = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarTRoja.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Tarjeta Roja | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("contabilidad") }),
            m(SidebarTRoja),
            m(MenuTRoja)
        ];
    },

};



export default TRoja;