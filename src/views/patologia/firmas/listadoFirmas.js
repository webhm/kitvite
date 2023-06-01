import HeaderPrivate from '../../layout/header-private';
import SidebarPato from '../utils/sidebarPato';
import BreadCrumb from '../../layout/breadcrumb';
import firmaModel from './models/firmaModel';
import listado from './listado';
import loader from '../utils/loader';
import noInfo from '../utils/noInfo';

let firmaModelo = firmaModel;

const listadoFirmas = {
    oninit: (vnode) => {
        firmaModelo.cargarListado();
    }, 
    oncreate: (vnode) => {
        if (firmaModelo.listado.length == 0) {
            m.mount(document.querySelector("div#loader"), loader);
        } else if (firmaModelo.listado.length > 0) {
            m.mount(document.querySelector("div#loader"), null); 
            m.mount(document.querySelector("table.table#listado-firmas"), {
                view: (vnode) => {
                    return [
                        m(listado, {
                            firma: firmaModelo
                        })
                    ]
                }
            });            
        } 
    }, 
    onupdate: (vnode) => {
        if (firmaModelo.listado.length == 0 && firmaModelo.loading) {
            m.mount(document.querySelector("div#loader"), loader);
        } else if (firmaModelo.listado.length > 0 && !firmaModelo.loading) {
            m.mount(document.querySelector("div#loader"), null); 
            m.mount(document.querySelector("table.table#listado-firmas"), {
                view: (vnode) => {
                    return [
                        m(listado, {
                            firma: firmaModelo
                        })
                    ]
                }
            });
        } else if (firmaModelo.listado.length == 0 && !firmaModelo.loading) {
            m.mount(document.querySelector("div#loader"), noInfo);
        }
    }, 
    view: (vnode) => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
            m(SidebarPato, { oncreate: SidebarPato.setPage(29) }),

            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m(BreadCrumb, [{path: "/", label: "metroplus"}, 
                                   {path: "/patologia", label: "patologia"},
                                   {path: "", label: "listado firmas"}]),
                    m("h1.df-title.mg-t-20.mg-b-10", "Firma del Patólogo para Informes"),
                    m("table.table", {style: {"width": "100%"}}, [
                        m("tr", [
                            m("th.tx-12.thead-light", {scope: "col", style: {'width': '20%'}}, "CI Médico"),
                            m("th.tx-12.thead-light", {scope: "col", style: {'width': '60%'}}, "Nombre Médico"),
                            m("th.tx-12.thead-light", {scope: "col", style: {'width': '20%'}}, "Firma Médico")
                        ]),
                    ]),
                    m("table.table#listado-firmas"),
                    m("div#loader")
                ])
            )
        ]
    }
}

export default listadoFirmas;