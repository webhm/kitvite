import HeaderPrivate from '../layout/header-private';
import SidebarMantenimiento from './sidebarMantenimiento';
import App from '../app';

const Menuantenimiento = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "Metrovirtual"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Mantenimiento"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Mantenimiento:"
                    ),

                    m("div.row.tx-14", [

                        m("div.col-sm-6",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='layout']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Integración Higienización"
                                ),
                                m(m.route.Link, { href: "/mantenimiento/higienizacion", class: "tx-medium" }, [
                                    "Ir a Integración Higienización",
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

const Mantenimiento = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarMantenimiento.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Mantenimiento | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("mantenimiento") }),
            m(SidebarMantenimiento),
            m(Menuantenimiento)
        ];
    },

};



export default Mantenimiento;