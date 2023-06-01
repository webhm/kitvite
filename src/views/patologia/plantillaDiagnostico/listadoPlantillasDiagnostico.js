import HeaderPrivate from '../../layout/header-private';
import SidebarPato from '../utils/sidebarPato';
import loader from '../utils/loader';
import noInfo from '../utils/noInfo';
import BreadCrumb from '../../layout/breadcrumb';
import cerrarFormulario from '../utils/cerrarFormulario';
import crearPlantilladiagnostico from './crearPlantilladiagnostico';
import listadoPlantillas from './listadoPlantillas';
import diagnosticoModel from './models/diagnosticoModel';
import Auth from '../../../models/auth';
import App from '../../app';

let diagnosticoModelo = diagnosticoModel;

const listadoPlantillasdiagnostico = {
    oninit: (vnode) => {
        App.isAuth();
        diagnosticoModel.cargarListado(Auth.user.user);
    }, 
    oncreate: (vnode) => {
        if (diagnosticoModelo.listado.length == 0) {
            m.mount(document.querySelector("div#loader"), loader);
        } else if (diagnosticoModelo.listado.length > 0) {
            m.mount(document.querySelector("div#loader"), null); 
            m.mount(document.querySelector("table.table#listado-diagnostico"), {
                view: (vnode) => {
                    return [
                        m(listadoPlantillas, {
                            diagnostico: diagnosticoModelo
                        })
                    ]
                }
            });            
        } 
    }, 
    onupdate: (vnode) => {
        if (diagnosticoModelo.listado.length == 0 && diagnosticoModelo.loading) {
            m.mount(document.querySelector("div#loader"), loader);
        } else if (diagnosticoModelo.listado.length > 0 && !diagnosticoModelo.loading) {
            m.mount(document.querySelector("div#loader"), null); 
            m.mount(document.querySelector("table.table#listado-diagnostico"), {
                view: (vnode) => {
                    return [
                        m(listadoPlantillas, {
                            diagnostico: diagnosticoModelo
                        })
                    ]
                }
            });
        } else if (diagnosticoModelo.listado.length == 0 && !diagnosticoModelo.loading) {
            m.mount(document.querySelector("div#loader"), noInfo);
        }
    }, 
    view: (vnode) => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
            m(SidebarPato, { oncreate: SidebarPato.setPage(28) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m(BreadCrumb, [{path: "/", label: "metroplus"}, 
                                   {path: "/patologia", label: "patologia"},
                                   {path: "", label: "listado plantillas diagnóstico"}]),
                    m("h1.df-title.mg-t-20.mg-b-10", "Listado de Plantillas para diagnóstico"),
                    m("div.mg-0.mg-t-10.mg-b-10.text-left", [
                        m("button#btnnuevaplantilla.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            onclick: () => {
                                m.mount(document.querySelector("#gestion-formulario"), crearPlantilladiagnostico);
                                m.mount(document.querySelector("#cerrar-formulario"), cerrarFormulario);
                            }
                        }, [
                                m("i.fas.mg-r-5", )
                            ], "Nueva Plantilla diagnóstico"
                        ),
                        m("div#cerrar-formulario", {
                            style: { 'width': '50%', 'float': 'right'}
                        }),
                    ]),
                    m("div#gestion-formulario"),
                    m("table.table", {style: {"width": "100%"}}, [
                        m("tr", [
                            m("th.tx-12.thead-light", {scope: "col", style: {'width': '20%'}}, "Nombre Plantilla"),
                            m("th.tx-12.thead-light", {scope: "col", style: {'width': '50%'}}, "Plantilla"),
                            m("th.tx-12.thead-light", {scope: "col", style: {'width': '20%'}}, ""),
                        ]), 
                    ]),
                    m("table.table#listado-diagnostico"),
                    m("div#loader")
                ])
            )
        ]
    }
}

export default listadoPlantillasdiagnostico;