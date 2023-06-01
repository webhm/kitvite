import cerrarFormulario from '../utils/cerrarFormulario';
import editarPlantillaMacroscopico from './editarPlantillaMacroscopico';
import macroscopicoModel from './models/macroscopicoModel';

let macroscopicoModelo = macroscopicoModel;

const listadoPlantillas = {
    oninit: (vnode) => {
        if (vnode.attrs.macroscopico !== undefined) {
            macroscopicoModelo = vnode.attrs.macroscopico;
        }  
    }, 
    view: (vnode) => {
        return [
            macroscopicoModelo.listado.map(function(macroscopico) {
                return [
                    m("tr#" + macroscopico.id, [
                        m("td.tx-12.nombreplantilla", {style: {'width': '20%'}}, macroscopico.nombreplantilla),
                        m("td.tx-12.plantilla",  {style: {'width': '50%'}}, macroscopico.plantilla),
                        m("td.tx-12", {style: {'width': '20%'}}, [                            
                            m("div.mg-0.mg-t-5.text-left", [
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                    onclick: function() {
                                        m.mount(document.querySelector("#gestion-formulario"), {
                                            view: () => {
                                                return m(editarPlantillaMacroscopico, {macroscopico: macroscopico})
                                            }
                                        }),
                                        m.mount(document.querySelector("#cerrar-formulario"), cerrarFormulario);                                                    
                                    }
                                }, [m("i.fas.fa-pen.mg-r-5", )], "Editar"),
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                    onclick: function() {
                                        if (window.confirm('Está seguro que desea borrar el elemento?')) {
                                            macroscopicoModelo.eliminar(macroscopico);
                                            macroscopicoModelo.listado = [];
                                            macroscopicoModelo.loading = true;
                                        }
                                    }
                                }, [m("i.fas.fa-link.mg-r-5", )], "Eliminar"),
                            ]),
                        ]),
                    ]),
                ]
            }),
        ]
    }
}

export default listadoPlantillas;