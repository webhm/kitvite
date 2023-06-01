import HeaderPrivate from '../layout/header-private';
import SidebarFarma from './sidebarFarma';
import App from '../app';

const MenuFarmacia = {
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
                            "Farmacia"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Farmacia:"
                    ),

                    m("div.row.tx-14", [

                        (App.isShow('farmacia', 5) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/farmacia/recetas")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-file tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Recetas de Alta",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Recetas de Alta",
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

const Farmacia = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarFarma.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Farmacia | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("farmacia") }),
            m(SidebarFarma),
            m(MenuFarmacia)
        ];
    },

};





export default Farmacia;