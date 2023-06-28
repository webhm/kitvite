import m from 'mithril';
import corteModel from './models/corteModel';
import crearCorte from './crearCorte';
import editarCorte from './editarCorte';

let corteModelo = corteModel;
let informeModelo = null;

const listadoCortes = {
    oninit: (vnode) => {
        if (vnode.attrs.informeModelo !== undefined) {
            informeModelo = vnode.attrs.informeModelo;
            if (informeModelo.listado.length > 0 && informeModelo.editing) {
                corteModelo.listado = informeModelo.listado[0].cortes;
                corteModelo.informeId = informeModelo.listado[0].id;
                corteModelo.cargarSecuenciales();
            }
        }
    }, 
    onupdate: (vnode) => {
        informeModelo.cortes = corteModelo.listado;
    }, 
    view: (vnode) => {
        return [
            m("table.table.boton-nuevo-cortes", {style: {"margin": "0"}}, [
                m("tr", [
                    m("th.tx-12", {style: { "width": "80%" }}, "INGRESAR CORTES:"),
                    m("th.tx-12", {style: { "width": "20%" }}, [
                        m("button#btnnuevocorte.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][form='crear-corte']", {
                            style: { "width": "95%" },
                            onclick: function() {
                                this.disabled = true;
                                m.mount(document.querySelector("#gestion-cortes"), {
                                    view: (vnode) => {
                                        return m(crearCorte, {"informeModelo": informeModelo})
                                    }
                                });
                            }                            
                        }, [
                            m("i.fas.fa-plus.mg-r-5")
                            ], "Nuevo Corte"
                        ),
                    ]),                         
                ]),
            ]),
            m("table#gestion-cortes", {style: {"width": "98%", "margin-left": "1%"}}),
            m("table.table.encabezado-cortes", {style: {"width": "98%", "margin-left": "1%"}}, [
                m("tr", [
                    m("th.tx-12.thead-light", {scope: "col", style: {'width': '15%'}}, "Letra"),
                    m("th.tx-12.thead-light", {scope: "col", style: {'width': '15%'}}, "Consecutivo"),
                    m("th.tx-12.thead-light", {scope: "col", style: {'width': '50%'}}, "Descripción"),
                    m("th.tx-12.thead-light", {scope: "col", style: {'width': '20%'}}, "")
                ]),
            ]),
            m("table.table.listado-cortes", {style: {"width": "98%", "margin-left": "1%"}}, [
                corteModelo.listado.map(function(corte) {
                    return [
                        m("tr#" +  corte.id, [
                            m("th.tx-12", {style: {'width': '15%'}}, corte.letra),
                            m("th.tx-12", {style: {'width': '15%'}}, corte.consecutivo),
                            m("td.tx-12.cortedescription", 
                                {style: {'width': '50%'}}, [
                                    corte.descripcion,
                                ]),
                            m("td.tx-12", {style: {'width': '20%', 'padding': '0'}}, [   
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][corteid=" + corte.id + "]", {
                                    onclick: function(e) {
                                        m.mount(document.querySelector("#gestion-cortes"), {
                                            view: () => {
                                                return m(editarCorte, {"corte": corte})
                                            }
                                        });
                                    },
                                    style: {'margin': '5px 5px 5px 5px', "width": "47%", 'padding': '5px'}
                                }, [m("i.fas.fa-edit.mg-r-5")], "Editar"),                           
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][corteid=" + corte.id + "]", {
                                    onclick: function(e) {
                                        if (window.confirm('Está seguro que desea borrar el elemento?')) {
                                            let listado = corteModelo.listado.filter((item) => item.id !== parseInt(e.target.getAttribute('corteid')));
                                            corteModelo.listado = listado;
                                            m.mount(document.querySelector("#gestion-cortes"), null);
                                            document.querySelector("#btnnuevocorte").disabled = false;
                                        }
                                    },
                                    style: {'margin': '5px 0 5px 0', "width": "47%", 'padding': '5px'}
                                }, [m("i.fas.fa-trash.mg-r-5", )], "Eliminar"), 
                            ]),
                        ]),
                    ]
                }),
            ])
        ]
    }
}

export default listadoCortes;