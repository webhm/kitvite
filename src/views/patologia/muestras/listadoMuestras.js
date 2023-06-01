import loader from '../utils/loader';
import noInfo from '../utils/noInfo';
import listado from './listado';
import muestraModel from './models/muestraModel';

let muestraModelo = muestraModel;

const listadoMuestras = {
    oninit: (vnode) => { 
        if (vnode.attrs.numeroPedido !== undefined) {
            muestraModelo.numeroPedido = vnode.attrs.numeroPedido;            
            muestraModelo.cargarListado(muestraModelo.numeroPedido);
            muestraModelo.cargarExamenes(muestraModelo.numeroPedido);
        }  
        if (vnode.attrs.numeroAtencion !== undefined) {
            muestraModelo.numeroAtencion = vnode.attrs.numeroAtencion;
        }
        if (vnode.attrs.numeroHistoriaClinica !== undefined) {
            muestraModelo.numeroHistoriaClinica = vnode.attrs.numeroHistoriaClinica;
        } 
        if (vnode.attrs.medico !== undefined) {
            muestraModelo.medico = vnode.attrs.medico;
        }   
    },
    oncreate: (vnode) => {
        if (muestraModelo.listado.length == 0) {
            m.mount(document.querySelector("div#loader"), loader);
        } else if (muestraModelo.listado.length > 0) {
            m.mount(document.querySelector("div#loader"), null); 
            m.mount(document.querySelector("table.table#listado-muestras"), {
                view: (vnode) => {
                    return [
                        m(listado, {
                            muestra: muestraModelo
                        })
                    ]
                }
            });            
        } 
    }, 
    onupdate: (vnode) => {
        if (document.querySelector("div#loader")) {
            if (muestraModelo.listado.length == 0 && muestraModelo.loading) {
                m.mount(document.querySelector("div#loader"), loader);
            } else if (muestraModelo.listado.length > 0 && !muestraModelo.loading) {
                m.mount(document.querySelector("div#loader"), null); 
                m.mount(document.querySelector("table.table#listado-muestras"), {
                    view: (vnode) => {
                        return [
                            m(listado, {
                                muestra: muestraModelo
                            })
                        ]
                    }
                });
            } else if (muestraModelo.listado.length == 0 && !muestraModelo.loading) {
                m.mount(document.querySelector("div#loader"), noInfo);
            }
        }
    }, 
    view: (vnode) => {
        return [
            m("table.table", {style: {'margin': '0'}}, [
                m("thead.thead-light", [
                    m("tr", [
                        m("th.tx-12", {scope: "col", style: {'width': '10%'}}, "ID"),
                        m("th.tx-12", {scope: "col", style: {'width': '30%'}}, "Descripción"),
                        m("th.tx-12", {scope: "col", style: {'width': '5%'}},  "Válida"),
                        m("th.tx-12", {scope: "col", style: {'width': '25%'}}, "Exámenes Asociados"),
                        m("th.tx-12", {scope: "col", style: {'width': '30%'}}, "")
                    ]),
                ])
            ]),
            m("table.table#listado-muestras", {style: {'margin': '0'}}),
            m("div#loader", {style: {'margin-top': '10px', 'padding-left': '10px'}})
        ]
    }
}

export default listadoMuestras;