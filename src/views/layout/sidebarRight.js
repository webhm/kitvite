import Auth from '../../models/auth';
import Notificaciones from '../../models/notificaciones';

const vRol = {

    view: () => {


        if (Auth.rol == 1) {
            return "Administrador";
        }

        if (Auth.rol == 2) {
            return "Coordinador";
        }

        if (Auth.rol == 3) {
            return "Gestionador";
        }

        if (Auth.rol == 4) {
            return "Operador";
        }

        if (Auth.rol == 4) {
            return "Usuario";
        }


    },
};

const SidebarRight = {
    view: () => {
        return [
            m("div.navbar-right", [

                m(Notificaciones),
                m("div.dropdown.dropdown-profile", [
                    m("a.dropdown-link[href=''][data-toggle='dropdown'][data-display='static']",
                        m("div.avatar.avatar-sm",
                            m("i[data-feather='user']"),
                        )
                    ),
                    m("div.dropdown-menu.dropdown-menu-right.tx-13", [
                        m("div.tx-18.tx-semibold.mg-b-0",
                            (Auth.user.user !== undefined) ? Auth.user.user.toUpperCase() : ""
                        ),
                        m("p.mg-b-25.tx-12.tx-color-03", [
                            m(vRol)
                        ]),
                        m(m.route.Link, { href: "/", class: "dropdown-item tx-16 " }, [
                            m("i[data-feather='user']"),
                            " Mi Perfil "
                        ]),
                        m(m.route.Link, { href: "/", class: "dropdown-item tx-16 " }, [
                            m("i[data-feather='help-circle']"),
                            " Soporte CONCAS "
                        ]),

                        m("div.dropdown-divider"),
                        m(m.route.Link, { href: "/salir", class: "dropdown-item tx-16 " }, [
                            m("i[data-feather='log-out']"),
                            "Salir"
                        ]),



                    ])
                ])
            ])

        ];
    },
};




export default SidebarRight;