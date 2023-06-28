import m from 'mithril';
import macroscopicoModel from './models/macroscopicoModel';

let macroscopicoModelo = macroscopicoModel;
let macroscopico = null;

const editarPlantillaMacroscopico = {
    oninit: (vnode) => {
        if (vnode.attrs.macroscopico !== undefined) {
            macroscopico = vnode.attrs.macroscopico;
        } 
    }, 
    view: (vnode) => {
        return m("form#editar-plantillamacroscopico", [
            m("table.table", [
                m("tr.plantilla", [
                    m("th.tx-12", [
                        m("label.tx-semibold.tx-12", "Nombre de la Plantilla"),
                        m("input.form-control[id='inputnombreplantilla'][type='text'][placeholder='Nombre de la Plantilla'][title='Nombre de la Plantilla']", {
                            value: macroscopico.nombreplantilla
                        }), 
                    ]),
                    m("th.tx-12", [
                        m("label.tx-semibold.tx-12", "Descripción de la Plantilla"),
                        m("input.form-control[id='inputdescripcionplantilla'][type='text'][placeholder='Descripción de la Plantilla'][title='Descripción de la Plantilla']", {
                            value: macroscopico.descripcion
                        }), 
                    ]),
                ]),
                m("tr.plantilla", [
                    m("th.tx-12", [
                        m("label.tx-semibold.tx-12", "Información Clínica"),
                        m("textarea.form-control[id='textareainformacionclinica'][placeholder='Información Clínica'][title='Información Clínica']", {
                            style: "min-height: 100px",
                            rows: 4,
                            value: macroscopico.infoclinica
                        })
                    ]),
                    m("th.tx-12", [
                        m("label.tx-semibold.tx-12", "Dg presuntivo sin código"),
                        m("textarea.form-control[id='textareadgpresuntivo'][placeholder='Dg presuntivo sin código'][title='Dg presuntivo sin código']", {
                            style: "min-height: 100px",
                            rows: 4,
                            value: macroscopico.dgpresuntivo
                        })
                    ]),
                ]),
                m("tr.plantilla", [
                    m("th.tx-12", [
                        m("label.tx-semibold.tx-12", "Resultado Macroscópico"),
                        m("textarea.form-control[id='textarearesultmacroscopico'][placeholder='Resultado Macróscopico'][title='Resultado Macróscopico']", {
                            style: "min-height: 100px",
                            rows: 4,
                            value: macroscopico.resultmacroscopico
                        })
                    ]),
                    m("th.tx-12", [
                        m("label.tx-semibold.tx-12", "Resultado Microscópico"),
                        m("textarea.form-control[id='textarearesultmicroscopico'][placeholder='Resultado Microscópico'][title='Resultado Microscópico']", {
                            style: "min-height: 100px",
                            rows: 4,
                            value: macroscopico.resultmicroscopico
                        })
                    ]),
                ]),
                m("tr.plantilla", [
                    m("th.tx-12", [
                        m("label.tx-semibold.tx-12", "Diagnóstico"),
                        m("textarea.form-control[id='textareadiagnostico'][placeholder='Diagnóstico'][title='Diagnóstico']", {
                            style: "min-height: 100px",
                            rows: 4,
                            value: macroscopico.diagnostico
                        })
                    ]),
                    m("th.tx-12", []),
                ]),      
                m("tr", [
                    m("td.tx-12"),
                    m("td.tx-12", [
                        m('div#plantilla'),
                        m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            onclick: function() { 
                                if (vnode.dom['inputnombreplantilla'].value.length === 0) {
                                    macroscopicoModelo.error = "El campo Nombre de la Plantilla es requerido";
                                    alert(macroscopicoModelo.error);
                                    vnode.dom['inputnombreplantilla'].focus();
                                } else {
                                    let plantilla = { 
										id: macroscopico.id, 									
                                        nombreplantilla: vnode.dom['inputnombreplantilla'].value,
                                        descripcion: vnode.dom['inputdescripcionplantilla'].value,
                                        infoclinica: vnode.dom['textareainformacionclinica'].value,
                                        dgpresuntivo: vnode.dom['textareadgpresuntivo'].value,
                                        resultmacroscopico: vnode.dom['textarearesultmacroscopico'].value,
                                        resultmicroscopico: vnode.dom['textarearesultmicroscopico'].value,
                                        diagnostico: vnode.dom['textareadiagnostico'].value,
                                    }
                                    macroscopicoModelo.actualizar(plantilla);
                                    m.mount(document.querySelector("#gestion-formulario"), null);
                                    m.mount(document.querySelector("#cerrar-formulario"), null); 
                                    macroscopicoModelo.listado = [];
                                    macroscopicoModelo.loading = true;
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

export default editarPlantillaMacroscopico;