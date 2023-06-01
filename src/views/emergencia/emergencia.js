import HeaderPrivate from '../layout/header-private';
import SidebarEme from './sidebarEme';
import App from '../app';

const MenuEmergencia = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",

                            m(m.route.Link, { href: "/" }, [
                                "Metrovirtual"
                            ]),

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Emergencia"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Emergencia:"
                    ),

                    m("div.row.tx-14", [

                        m("div.col-sm-6.mg-b-20",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='edit-3']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Pedidos de Laboratorio Auxiliar"
                                ),
                                m(m.route.Link, { href: "/emergencia/auxiliar/pedidos/laboratorio", class: "tx-medium" }, [
                                    "Ir a Pedidos de Laboratorio - Auxiliar",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),

                            ])
                        ),

                        m("div.col-sm-6..mg-b-20",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='edit-3']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Pedidos de Laboratorio Enfermería"
                                ),
                                m(m.route.Link, { href: "/emergencia/enfermeria/pedidos/laboratorio", class: "tx-medium" }, [
                                    "Ir a Pedidos de Laboratorio - Enfermería",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),

                            ])
                        ),


                    ]),

                ])
            ),
        ];
    },

};

const Emergencia = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarEme.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Emergencia | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("emergencia") }),
            m(SidebarEme),
            m(MenuEmergencia)
        ];
    },

};


export default Emergencia;