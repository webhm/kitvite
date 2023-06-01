import HeaderPrivate from '../layout/header-private';
import SidebarHospital from './sidebarHospital';
import App from '../app';

const MenuHospitalizacion = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "MetroPlus"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Hospitalización"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Hospitalización:"
                    ),

                    m("div.row.tx-14", [
                        (App.isShow('hospitalizacion', 17) ? [m("div.col-sm-6",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.tx-50.tx-gray-500.fas.fa-procedures")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Control de Camas GEMA-MV"
                                ),
                                m(m.route.Link, { href: "/hospitalizacion/control-camas", class: "tx-medium" }, [
                                    "Ir a Control de Camas GEMA-MV",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        )] : []),



                        (App.isShow('hospitalizacion', 9) ? [m("div.col-sm-6",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.tx-50.tx-gray-500.fas.fa-file-alt")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Pasaportes de Pacientes"
                                ),
                                m(m.route.Link, { href: "/hospitalizacion/pasaportes", class: "tx-medium" }, [
                                    "Ir a Pasaportes de Pacientes",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        )] : []),





                    ]),

                ])
            ),
        ];
    },

};

const Hospitalizacion = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarHospital.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Hospitalización | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("hospitalizacion") }),
            m(SidebarHospital),
            m(MenuHospitalizacion)
        ];
    },

};



export default Hospitalizacion;