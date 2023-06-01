import Encrypt from '../../../models/encrypt';


const MenuSidebar = {
    view: () => {
        let data = Encrypt.getDataUser();
        let _data = {
            modulesAccess: {
                patologia: [
                    {
                        "idUser": "159",
                        "rol": "1",
                        "idModulo": "26",
                        "modulo": "patologia",
                        "href": "patologia/pedidos",
                        "label": "Recepción de Pedidos"
                    },
                    {
                        "idUser": "159",
                        "rol": "1",
                        "idModulo": "27",
                        "modulo": "patologia",
                        "href": "patologia/gestionPlantillaMacroscopico",
                        "label": "Gestión Plantillas Macróscopico"
                    },
                    {
                        "idUser": "159",
                        "rol": "1",
                        "idModulo": "28",
                        "modulo": "patologia",
                        "href": "patologia/gestionPlantillaDiagnostico",
                        "label": "Gestión Plantillas Diagnóstico"
                    },
                    {
                        "idUser": "159",
                        "rol": "1",
                        "idModulo": "29",
                        "modulo": "patologia",
                        "href": "patologia/gestionFirmas",
                        "label": "Firma Patólogo"
                    }
                ]
            }
        };

        if (_data.length !== 0) {
            return [
                _data.modulesAccess.patologia.map(function(_v, _i, _contentData) {
                    return [
                        m(m.route.Link, { href: "/" + _v.href, class: ((SidebarPato.page == parseInt(_v.idModulo)) ? "active" : "") }, [
                            _v.label
                        ]),
                    ]

                })
            ]
        }
    },
};

const SidebarPato = {
    page: "",
    setPage: (page) => {
        SidebarPato.page = page;
    },
    view: () => {
        return [
            m(".sidebar.sidebar-fixed.sidebar-components[id='sidebarMenu']", [
                m("div.sidebar-header", [
                    m("a[href=''][id='mainMenuOpen']",
                        m("i[data-feather='menu']")
                    ),
                    m("h5",
                        "Menu"
                    ),
                    m("a[href=''][id='sidebarMenuClose']",
                        m("i[data-feather='x']")
                    )
                ]),
                m("div.sidebar-body",
                    m("ul.sidebar-nav", [
                        m("li.nav-label.mg-b-15",
                            "Patología"
                        ),
                        m("li.nav-item.show", [
                            m(m.route.Link, { href: "/patologia", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Patología "
                            ]),

                            m("nav.nav", [

                                m(MenuSidebar)

                            ])
                        ]),

                    ])
                )
            ])
        ];
    },

};

export default SidebarPato;