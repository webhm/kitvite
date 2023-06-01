import muestraModel from './models/muestraModel';
import editarMuestra from './editarMuestra';
import asociarExamenes from './asociarExamenes';
import cerrarGestionMuestra from './cerrarGestionMuestra';

let muestraModelo = muestraModel;

const listado = {
    oninit: (vnode) => {
        if (vnode.attrs.muestra !== undefined) {
            muestraModelo = vnode.attrs.muestra;
        }  
    }, 
    view: (vnode) => {
        return [
            muestraModelo.listado.map(function(muestra) {
                return [
                    m("tr#" +  muestra.id, [
                        m("th.tx-12.muestraid", {style: {'width': '10%'}}, muestra.id),
                        m("td.tx-12.muestradescription", {style: {'width': '30%'}}, muestra.descripcion),
                        m("td.tx-12.muestravalida", {style: {'width': '5%'}}, muestra.valida === "1" ? 'Sí' : 'NO'),
                        m("td.tx-12.examenes", {style: {'width': '25%'}}, [
                            muestra.examenesAsociados.map(function(examenAsociado) {
                                return [
                                    m("span.tx-12.pd-r-10", examenAsociado.descripcion),
                                    m("br"),
                                ]
                            })
                        ]),
                        m("td.tx-12", {style: {'padding': '0', 'width': '30%'}} ,[                            
                            m("div.mg-0.mg-t-5.text-left", [
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                    onclick: function() {
                                        m.mount(document.querySelector("#gestion-muestras"), {
                                            view: () => {
                                               return m(editarMuestra, {muestra: muestra})
                                            }
                                        }),
                                        m.mount(document.querySelector("#cerrar-gestion-muestras"), cerrarGestionMuestra);
                                    }
                                }, [m("i.fas.fa-edit.mg-r-5")], "Editar"),
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                    disabled: muestra.valida === "1" ? false : true,
                                    onclick: function() {
                                        m.mount(document.querySelector("#gestion-muestras"), {
                                            view: () => {
                                                return m(asociarExamenes, {muestra: muestra})
                                            }
                                        }),
                                        m.mount(document.querySelector("#cerrar-gestion-muestras"), cerrarGestionMuestra);
                                    }
                                }, [m("i.fas.fa-link.mg-r-5", )], "Asociar Exámenes"),
                            ]),
                        ]),
                    ]),
                ]
            }),
        ]
    }
}

export default listado;