import diagnosticoModel from './models/diagnosticoModel';
import Auth from '../../../models/auth';
import App from '../../app';

let diagnosticoModelo = diagnosticoModel;
let diagnostico = null;

const editarPlantillaDiagnostico = {
    oninit: (vnode) => {
        if (vnode.attrs.diagnostico !== undefined) {
            diagnostico = vnode.attrs.diagnostico;
        } 
        App.isAuth();
    }, 
    view: (vnode) => {
        return m("form#editar-plantilladiagnostico", [
            m("table.table", [
                m("tr.nombreplantilla", [
                    m("th.tx-12", "Nombre de la Plantilla"),
                    m("td.tx-12", [
                        m("input.form-control[id='inputnombreplantilla'][type='text'][placeholder='Nombre de la Plantilla'][title='Nombre de la Plantilla']", 
                        {
                            value: diagnostico.nombreplantilla
                        }),
                    ]),
                ]),
                m("tr.plantilla", [
                    m("th.tx-12", "Plantilla"),
                    m("td.tx-12", [
                        m("textarea.form-control[id='inputplantilla'][placeholder='Plantilla'][title='Plantilla']", {
                            style: "min-height: 100px",
                            rows: 4,
                            value: diagnostico.plantilla
                        })
                    ]),
                ]),                               
                m("tr", [
                    m("td.tx-12"),
                    m("td.tx-12", [
                        m('div#plantilla'),
                        m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            onclick: function() { 
                                if (vnode.dom['inputnombreplantilla'].value.length === 0) {
                                    diagnosticoModelo.error = "El campo Nombre de la Plantilla es requerido";
                                    alert(diagnosticoModelo.error);
                                    vnode.dom['inputnombreplantilla'].focus();
                                } else if (vnode.dom['inputplantilla'].value.length === 0) {
                                    diagnosticoModelo.error = "El campo Plantilla es requerido";
                                    alert(diagnosticoModelo.error);
                                    vnode.dom['inputplantilla'].focus();
                                } else {
                                    let plantilla = {  
                                        id: diagnostico.id,                                 
                                        nombreplantilla: vnode.dom['inputnombreplantilla'].value,
                                        nombreusuario: Auth.user.user,
                                        plantilla: vnode.dom['inputplantilla'].value,
                                    }
                                    diagnosticoModelo.actualizar(plantilla);
                                    m.mount(document.querySelector("#gestion-formulario"), null);
                                    m.mount(document.querySelector("#cerrar-formulario"), null);
                                    diagnosticoModelo.listado = [];
                                    diagnosticoModelo.loading = true;
                                }},
                                style: {'margin': '6px 0'}
                        }, [
                            m("i.fas.fa-save.mg-r-5", )
                        ], "Guardar"
                        ),]
                    ),
                ]),
            ]),
        ])
    }
}

export default editarPlantillaDiagnostico;