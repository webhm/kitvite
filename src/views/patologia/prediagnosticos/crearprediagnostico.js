import HeaderPrivate from '../../layout/header-private';
import SidebarPato from '../sidebarPato';
import m from 'mithril';

const CrearPreDiagnostico = {
    notificaciones: [],
    pedidos: [],
    showBitacora: "",
    showPedido: "",
    id: '',
    diagnostico: '',
    codigo: '',
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",

    oninit: (_data) => {

    },
    oncreate: (_data) => {
        
    },

    view: (_data) => {

        return CrearPreDiagnostico.loader ? [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
            m(SidebarPato, { oncreate: SidebarPato.setPage(28) }),
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
                            "Pre-Diagnósticos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Detalle del pre-diagnóstico N°: " + CrearPreDiagnostico.id
                    ),
                ])
            ),
        ] : [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
            m(SidebarPato, { oncreate: SidebarPato.setPage(28) }),
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
                            "Pre-Diagnósticos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Crear nuevo pre-diagnóstico "
                    ),

                    

                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", {
                                oncreate: (el) => {
                                    if (CrearPreDiagnostico.loader) {
                                        el.dom.hidden = true;
                                    } else {
                                        el.dom.hidden = false;
                                    }
                                },
                                onupdate: (el) => {
                                    if (CrearPreDiagnostico.loader) {
                                        el.dom.hidden = true;
                                    } else {
                                        el.dom.hidden = false;

                                    }
                                }
                            }, [

                                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                                    m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                                        m("small.pd-2.tx-20",
                                            m("i.fas.fa-times-circle.pd-2", {
                                                    "style": { "cursor": "pointer" },
                                                    title: "Cerrar",
                                                    onclick: () => {
                                                        m.route.set('/patologia/prediagnosticos');
                                                    }
                                                }
                                            )
                                        ),

                                    ),

                                    m("p", { "class": "tx-18 mg-b-0" },
                                        "Código: "
                                    ),
                                    m("input.form-control.mg-b-10[placeholder='Ingresar un código identificador'][id='codigo']", {

                                        // oninput: function(e) { PedidosIngresados.searchField = e.target.value; },
                                        // value: PedidosIngresados.searchField,
                                    }),

                                    m("p", { "class": "tx-18 mg-b-0" },
                                        "Diagnóstico: "
                                    ),
                                    m("textarea.form-control.mg-b-10[placeholder='Ingresar pre-diagnostico'][id='diagnostico']", {

                                        // oninput: function(e) { PedidosIngresados.searchField = e.target.value; },
                                        // value: PedidosIngresados.searchField,
                                    }),

                                    m("button.btn.btn-outline-light.mg-t-40[id='button-save'][type='button']", [
                                        m("i.icon.ion-md-save"),
                                        " Crear "
                                    ]),
                                ])
                            ])
                        ])
                    ]),
                ])
            ),
        ];
    },
};


export default CrearPreDiagnostico;