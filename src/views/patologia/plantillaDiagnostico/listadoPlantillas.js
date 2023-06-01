import cerrarFormulario from '../utils/cerrarFormulario';
import editarPlantillaDiagnostico from './editarPlantillaDiagnostico';
import diagnosticoModel from './models/diagnosticoModel';

let diagnosticoModelo = diagnosticoModel;

const listadoPlantillas = {
    oninit: (vnode) => {
        if (vnode.attrs.diagnostico !== undefined) {
            diagnosticoModelo = vnode.attrs.diagnostico;
        }  
    }, 
    view: (vnode) => {
        return [
            diagnosticoModelo.listado.map(function(diagnostico) {
                return [
                    m("tr#" + diagnostico.id, [
                        m("td.tx-12.nombreplantilla", {style: {'width': '20%'}}, diagnostico.nombreplantilla),
                        m("td.tx-12.plantilla",  {style: {'width': '50%'}}, diagnostico.plantilla),
                        m("td.tx-12", {style: {'width': '20%'}}, [                            
                            m("div.mg-0.mg-t-5.text-left", [
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                    onclick: function() {
                                        m.mount(document.querySelector("#gestion-formulario"), {
                                            view: () => {
                                                return m(editarPlantillaDiagnostico, {diagnostico: diagnostico})
                                            }
                                        }),
                                        m.mount(document.querySelector("#cerrar-formulario"), cerrarFormulario);                                                    
                                    }
                                }, [m("i.fas.fa-pen.mg-r-5", )], "Editar"),
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                    onclick: function() {
                                        if (window.confirm('Está seguro que desea borrar el elemento?')) {
                                            diagnosticoModelo.eliminar(diagnostico);
                                            diagnosticoModelo.listado = [];
                                            diagnosticoModelo.loading = true;
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