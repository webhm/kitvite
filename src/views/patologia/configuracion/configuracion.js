import SidebarPato from '../sidebarPato';
import m from 'mithril';

const Configuracion = {
    notificaciones: [],
    configuraciones: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",
    oninit: (_data) => {

        SidebarPato.page = "";

    },
    oncreate: (_data) => {
        
    },

    view: (_data) => {

        return Configuracion.loader ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(29) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/patologia" }, [
                                " Patología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Configuración"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Configuración:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("div.table-loader.wd-100p", [
                                    m("div.placeholder-paragraph", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ]
                            ),
                        ])
                    ]),
                ])
            ),
        ] : [
            m(SidebarPato, { oncreate: SidebarPato.setPage(29) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/patologia" }, [
                                " Patología "
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Configuración"
                        ),
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Configuración:"
                    ),
                    m("div.row.animated.fadeInUp", [
                        m("div.col-12", [
                            m("p", { "class": "tx-18 mg-b-0" },
                                "Tiempo estimado para entrega de: "
                            )
                        ]),
                        m("div.col-2", [
                            m("p", { "class": "tx-18 mg-b-0" },
                                "Citología (C): "
                            ),
                            m("input.form-control.mg-b-10[placeholder='Ingresar cantidad de horas'][id='citologia'][value='4h']", {

                                // oninput: function(e) { PedidosIngresados.searchField = e.target.value; },
                                // value: PedidosIngresados.searchField,
                            })
                        ]),
                        m("div.col-2", [
                            m("p", { "class": "tx-18 mg-b-0" },
                                "Líquidos (L): "
                            ),
                            m("input.form-control.mg-b-10[placeholder='Ingresar cantidad de horas'][id='liquidos'][value='4h']", {

                                // oninput: function(e) { PedidosIngresados.searchField = e.target.value; },
                                // value: PedidosIngresados.searchField,
                            })
                        ]),
                        m("div.col-2", [
                            m("p", { "class": "tx-18 mg-b-0" },
                                "Molecular (M): "
                            ),
                            m("input.form-control.mg-b-10[placeholder='Ingresar cantidad de horas'][id='molecular'][value='4h']", {

                                // oninput: function(e) { PedidosIngresados.searchField = e.target.value; },
                                // value: PedidosIngresados.searchField,
                            })
                        ])
                    ]),
                ])
            ),
        ];
    },
};


export default Configuracion;