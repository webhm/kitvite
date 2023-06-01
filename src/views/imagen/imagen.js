import HeaderPrivate from '../layout/header-private';
import SidebarImagen from './sidebarImagen';
import App from '../app';

const MenuImagen = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "MetroPlus"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Imagen"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Imagen:"
                    ),

                    m("div.row.tx-14", [

                        (App.isShow('imagen', 24) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/imagen/pedidos")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-inbox tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Recepción de Pedidos",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Recepción de Pedidos",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),

                        (App.isShow('imagen', 31) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/imagen/agendamiento")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-calendar tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Agendamiento de Imagen",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Agendamiento de Imagen",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),

                        (App.isShow('imagen', 35) ? [m("li", {
                            "class": "list-item bg-white wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/imagen/notificaciones")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-bell tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [
                                    m("p", { "class": "tx-18 mg-b-0" },
                                        "Notificaciones de Imagen",
                                    ),
                                    m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                        "Ir a Notificaciones de Imagen",
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


const Imagen = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarImagen.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Imagen | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("imagen") }),
            m(SidebarImagen),
            m(MenuImagen)
        ];
    },

};


export default Imagen;