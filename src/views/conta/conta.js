import HeaderPrivate from '../layout/header-private';
import SidebarConta from './sidebarConta';
import App from '../app';

const MenuConta = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "Metroplus"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Contabilidad"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Contabilidad:"
                    ),

                    m("div.row.tx-14", [



                        (App.isShow('contabilidad', 30) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/contabilidad/proceso/tarjeta-roja")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-file-alt tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Tarjeta Roja",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Tarjeta Roja",
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

const Conta = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarConta.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Contabilidad | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("contabilidad") }),
            m(SidebarConta),
            m(MenuConta)
        ];
    },

};



export default Conta;