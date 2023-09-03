import m from 'mithril';
import loader from '../utils/loader';
import noInfo from '../utils/noInfo';
import listado from './listado';
import informeModel from './models/informeModel';
import crearInforme from './crearInforme';

let informeModelo = informeModel;

const listadoInformes = {
    oninit: (vnode) => { 
        if (vnode.attrs.numeroPedido !== undefined) {
            informeModelo.numeroPedido = vnode.attrs.numeroPedido;
            informeModelo.cargarListado(informeModelo.numeroPedido); 
        } 
        if (vnode.attrs.numeroAtencion !== undefined) {
            informeModelo.numeroAtencion = vnode.attrs.numeroAtencion;
        }
        if (vnode.attrs.numeroHistoriaClinica !== undefined) {
            informeModelo.numeroHistoriaClinica = vnode.attrs.numeroHistoriaClinica;
        } 
        if (vnode.attrs.medico !== undefined) {
            informeModelo.medico = vnode.attrs.medico;
        }            
    },
    oncreate: (vnode) => {
        if (informeModelo.listado.length == 0) {
            m.mount(document.querySelector("div#loader-informes"), loader);
        } else if (informeModelo.listado.length > 0) {
            m.mount(document.querySelector("div#loader-informes"), null); 
            m.mount(document.querySelector("table.table#listado-informes"), {
                view: (vnode) => {
                    return [
                        m(listado, {
                            informe: informeModelo
                        })
                    ]
                }
            });            
        } 
    }, 
    onupdate: (vnode) => {
        if (document.querySelector("div#loader-informes")) {
            if (informeModelo.listado.length == 0 && informeModelo.loading) {
                m.mount(document.querySelector("div#loader-informes"), loader);
            } else if (informeModelo.listado.length > 0 && !informeModelo.loading) {
                m.mount(document.querySelector("div#loader-informes"), null); 
                m.mount(document.querySelector("table.table#listado-informes"), {
                    view: (vnode) => {
                        return [
                            m(listado, {
                                informe: informeModelo
                            })
                        ]
                    }
                });
            } else if (informeModelo.listado.length == 0 && !informeModelo.loading) {
                m.mount(document.querySelector("div#loader-informes"), noInfo);
            }
        }
    }, 
    view: (vnode) => {
        return [
            m("table.table", {style: {'margin': '0'}}, [
                m("tr", [
                    m("td", [
                        m("div.float-right", [
                            m("button#btnnuevoinforme.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                onclick: () => {
                                    m.mount(document.querySelector("#gestionpatologia"), {
                                        view: () => {
                                            return m(crearInforme, {
                                                attrs: {
                                                    "numeroPedido": informeModelo.numeroPedido,
                                                    "numeroAtencion": informeModelo.numeroAtencion,
                                                    "numeroHistoriaClinica": informeModelo.numeroHistoriaClinica,
                                                    "medico": informeModelo.medico
                                                }
                                            })
                                        }
                                    });
                                }
                            }, [m("i.fas.mg-r-5")], "GENERAR NUEVO INFORME"),
                        ]),
                    ])
                ]),
            ]),                                           
            m("table.table", {style: {'margin': '0'}}, [
                m("thead.thead-light", [
                    m("tr", [
                        m("th.tx-12", {scope: "col", style: {'width': '10%'}}, "Tipo"),
                        m("th.tx-12", {scope: "col", style: {'width': '10%'}}, "Número"),
                        m("th.tx-12", {scope: "col", style: {'width': '10%'}}, "Fecha"),
                        m("th.tx-12", {scope: "col", style: {'width': '30%'}}, "Muestras"),
                        m("th.tx-12", {scope: "col", style: {'width': '5%'}}, "Estado"),
                        m("th.tx-12", {scope: "col", style: {'width': '35%'}}, ""),
                    ]),
                ])
            ]),
            m("table.table#listado-informes"),
            m("div#loader-informes", {style: {'padding-left': '0'}})
        ]
    }
}

export default listadoInformes;