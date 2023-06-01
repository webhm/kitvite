import HeaderPrivate from '../layout/header-private';
import SidebarNeuro from './sidebarNeuro';
import App from '../app';

const MenuNeuro = {
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
                            "Neurofisiología"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Neurofisiología:"
                    ),

                    m("div.row.tx-14", [

                        (App.isShow('neurofisiologia', 20) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/neurofisiologia/pedidos")
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

                    ]),

                ])
            ),
        ];
    },

};

const Neuro = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarNeuro.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Neurofisiología | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("neurofisiologia") }),
            m(SidebarNeuro),
            m(MenuNeuro)
        ];
    },

};




export default Neuro;