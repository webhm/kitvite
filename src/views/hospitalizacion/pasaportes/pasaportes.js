import HeaderPrivate from '../../layout/header-private';
import SidebarHospital from '../sidebarHospital';
import App from '../../app';
import m from 'mithril';

const Pasaportes = {
    pacientes: [],
    showPacientes: "d-none",
    showBusquedas: "d-none",
    tipoBusqueda: "",
    searchField: "",
    showProcess: "d-none",
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarHospital.page = "";
        Pasaportes.searchField = "";
        Pasaportes.showBusquedas = "";
        Pasaportes.pacientes = [];
        App.isAuth();
    },
    oncreate: () => {
        document.title = "Hospitalización Pasaportes | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("hospitalizacion") }),
            m(SidebarHospital, { oncreate: SidebarHospital.setPage(9) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " Metrovirtual "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/hospitalizacion" }, [
                                " Hospitalización "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Pasaportes de Pacientes"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pasaportes de Pacientes"
                    ),

                    m("div.row.tx-14", [
                        m("div.col-12.mg-b-10.wd-100p",
                            m("div.row.mg-t-10", [
                                m("div.col-sm-12.pd-b-10.mg-b-10", [
                                    m("label.nav-label.tx-semibold",
                                        "Búsqueda de Pacientes:"
                                    ),
                                    m("hr"),

                                ]


                                ),
                            ])
                        ),
                        m("div.table-loader.col-12.wd-100p", {
                            class: Pasaportes.showProcess,
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
                m("label.nav-label.mg-b-10",
                    "Opciones Pacientes"
                ),
                m("a.nav-link[href='#section1']",
                    "Feather Icons"
                )

            ])
        ];
    },

};


export default Pasaportes;