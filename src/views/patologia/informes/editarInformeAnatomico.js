import m from 'mithril';
import informeModel from './models/informeModel';
import listadoCortes from '../cortes/listadoCortes';
import macroscopicoModel from '../plantillaMacroscopico/models/macroscopicoModel';

let informeModelo = informeModel;
let informe = null;
let opcionMacroscopico = '';
let macroscopicoModelo = macroscopicoModel;

const editarInformeAnatomico = {
    oninit: (vnode) => { 
        if (vnode.attrs.informeModelo !== undefined) {
            informeModelo = vnode.attrs.informeModelo;
            informe = informeModelo.listado[0];
            informeModelo.loading = true;
            informeModelo.secuencialInforme = informe.codigoinforme;
            macroscopicoModel.cargarListado();
        } 
    },
    onupdate: (vnode) => {
        if (informeModelo.informacionclinica !== undefined) {
            vnode.dom['textareainformacionclinica'].value = informeModelo.informacionclinica;
        }
        if (informeModelo.macroscopico !== undefined) {
            vnode.dom['textareamacroscopico'].value = informeModelo.macroscopico;
            opcionMacroscopico = informeModelo.macroscopico;
        }
        if (informeModelo.diagnostico !== undefined) {
            vnode.dom['textareadiagnostico'].value = informeModelo.diagnostico;
        }
        if (informeModelo.dgpresuntivo !== undefined) {
            vnode.dom['textareadgpresuntivo'].value = informeModelo.dgpresuntivo;
        }        
    }, 
    view: (vnode) => {
        return [
            m("form#editar-informe", [
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", {style: { "width": "85%" }}, [
                            m("h3.mg-t-5.mg-b-10.tx-center", [
                                m("span", { style: "margin: 0 30px 0 0"}, "ANATÓMICO"),
                            ]),
                        ]),
                    ]),
                ]),  
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", "ID P-ANATÓMICO: "),
                        m("td.tx-12", [
                            m("input.form-control[id='inputinformeid'][type='text']", { 
                                disabled: true,
                                value: informe.codigoinforme
                            }),
                        ]),
                        m("th.tx-12", "NO. PEDIDO:"),
                        m("td.tx-12", [
                            m("input.form-control[id='inputnumeropedidomv'][type='text']", { 
                                value: informe.nopedidomv,
                                disabled: true,
                            }),
                        ]),                    
                    ]),
                    m("tr", [
                        m("th.tx-12", "MÉDICO SOLICITANTE:"),
                        m("td.tx-12", [
                            m("input.form-control[id='inputmedicosolicitante'][type='text']", {
                                value: informe.medicosolicitante,
                                disabled: true,
                            }),
                        ]),
                        m("th.tx-12", "FECHA DEL DOCUMENTO:"),
                        m("td.tx-12", [
                            m("input.form-control[id='inputfechadocumento'][type='text']", { 
                                value: new Date(informe.fechapedido).toLocaleDateString('es-CL'),
                                disabled: true,
                            }),
                        ]),                    
                    ]),
                ]),  
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", {style: {"width": "35%", "color": "#0168fa"}},"SELECCIONAR PLANTILLA MACROSCÓPICA:"),
                        m("td.tx-12", [
                            m('select', {
                                style: {"width": "85%", 'height': '25px' },
                                onchange: function(e) {
                                    opcionMacroscopico = e.target.value;
                                    let findPlantilla = macroscopicoModelo.listado.find(e => e.nombreplantilla === opcionMacroscopico);
                                    vnode.dom['textareamacroscopico'].value = findPlantilla.resultmacroscopico;
                                    vnode.dom['textareainformacionclinica'].value = findPlantilla.infoclinica;
                                    vnode.dom['textareadiagnostico'].value = findPlantilla.diagnostico;
                                    vnode.dom['textareamicroscopico'].value = findPlantilla.resultmicroscopico;
                                    vnode.dom['textareadgpresuntivo'].value = findPlantilla.dgpresuntivo;
                                },
                                value: opcionMacroscopico,
                              }, macroscopicoModelo.listado.map(x =>m('option', x.nombreplantilla))
                            ),
                        ]),
                    ]),  
                ]),   
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", "INFORMACIÓN CLÍNICA:"),
                        m("th.tx-12", "MUESTRAS ENVIADAS:"),
                    ]),
                    m("tr", [
                        m("td.tx-12", {
                            style: {"width": "50%"}
                        }, [
                            m("textarea.form-control[id='textareainformacionclinica']", {
                                style: "min-height: 100px",
                                rows: 4,
                                value: informe.informacionclinica,
                                onchange: function(e) {
                                    informeModelo.informacionclinica = e.target.value;
                                    vnode.dom['btnguardarinforme'].disabled = false;
                                }
                            })
                        ]),                    
                        m("td.tx-12", {}, [
                            m("div[id='muestrasasociadas']", {
                                style: {"border": "1px solid #c0ccda", "height": "100px", "padding": "5px", "overflow": "auto"}
                            }, [
                                informe.muestrasAsociadas.map(function(muestra) {
                                    if (informeModelo.muestrasAsociadas.map(e => e.id).indexOf(muestra.id) === -1){
                                        informeModelo.muestrasAsociadas.push({
                                            id: muestra.id,
                                            checked: true})
                                    }
                                    return [
                                        m("div", [
                                            m("input[type='checkbox']", {
                                                style: {"float": "left", "margin-top": "2px"},
                                                class: "muestraenviada", 
                                                id: muestra.id,
                                                checked: true,
                                                onclick: function() {
                                                    const index = muestrasAsociadas.map(e => e.id).indexOf(parseInt(this.id));
                                                    if (index != -1 ){
                                                        muestrasAsociadas[index].checked = this.checked;
                                                    }
                                                }
                                            }),
                                            m("label.tx-semibold.tx-12", {
                                                style: {"margin": "0 10px", "width": "90%"},
                                            },
                                            muestra.id + " - " + muestra.descripcion),]),
                                        ]}
                                    ),
                                ]),
                            ]
                        ),
                    ]),
                ]),  
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", [
                            m("label.tx-12", {
                                style: {"width": "30%"},
                            },
                            "DIAGNÓSTICO PRESUNTIVO SIN CÓDIGO:"),
                        ]),
                    ]),
                    m("tr", [
                        m("td.tx-12", [
                            m("textarea.form-control[id='textaredgpresuntivo']", {
                                style: "min-height: 100px",
                                rows: 4,
                                value: informe.dgpresuntivo,
                            })
                        ]), 
                    ]),      
                ]), 
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", [
                            m("label.tx-12", {
                                style: {"width": "30%"},
                            },
                            "MACROSCÓPICO:"),
                        ]),
                    ]),
                    m("tr", [
                        m("td.tx-12", [
                            m("textarea.form-control[id='textareamacroscopico']", {
                                style: "min-height: 100px",
                                rows: 4,
                            })
                        ]), 
                    ]),      
                ]),
                m(listadoCortes, {"informeModelo": informeModelo}),
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", [
                            m("label.tx-12", {
                                style: {"width": "30%"},
                            },
                            "DIAGNÓSTICO:")
                        ]),
                    ]),
                    m("tr", [        
                        m("td.tx-12", [
                            m("textarea.form-control[id='textareadiagnostico']", {
                                style: "min-height: 100px",
                                rows: 4,
                                value: informe.diagnostico,
                                onchange: function(e) {
                                    informeModelo.diagnostico = e.target.value;
                                    vnode.dom['btnguardarinforme'].disabled = false;
                                }
                            })
                        ]),                    
                    ]),
                ]),
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", [
                            m("label.tx-12", {
                                style: {"width": "30%"},
                            },
                            "MICROSCÓPICO:"),
                        ]),
                    ]),
                    m("tr", [        
                        m("td.tx-12", [
                            m("textarea.form-control[id='textareamicroscopico']", {
                                style: "min-height: 100px",
                                rows: 4,
                                value: informe.resultmicroscopico,
                            })
                        ]),                    
                    ]),
                ]),
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", []),                    
                        m("th.tx-12", { style: "float: right"}, [
                            m("button#btnguardarinforme.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                disabled: true,
                                onclick: function() {
                                    let muestrasEnviadas = [];
                                    let cortes = [];
                                    informeModelo.muestrasAsociadas.filter(function(muestra){
                                        if (muestra.checked)  {
                                            muestrasEnviadas.push(muestra.id);
                                        }
                                    });  
                                    informeModelo.cortes.filter(function(corte) {
                                        let corteNuevo = {
                                            "informe_id": parseInt(informe.id),
                                            "codigocorte": corte.codigocorte,
                                            "letra": corte.letra,
                                            "consecutivo": parseInt(corte.consecutivo),
                                            "descripcion": corte.descripcion
                                        };
                                        cortes.push(corteNuevo);
                                    });                                                                                          
                                    if (vnode.dom['textareainformacionclinica'].value.length === 0) {
                                        informeModelo.error = "El campo Información Clínica es Requerido";
                                        alert(informeModelo.error);
                                        vnode.dom['textareainformacionclinica'].focus();
                                    } else if (muestrasEnviadas.length === 0) {
                                        informeModelo.error = "Debe asociar al menos una muestra.";
                                        alert(informeModelo.error);
                                    } else if (vnode.dom['textareamacroscopico'].value.length === 0) {
                                        informeModelo.error = "El campo Macroscópico es Requerido";
                                        alert(informeModelo.error);
                                        vnode.dom['textareamacroscopico'].focus();
                                    } else if (vnode.dom['textareadiagnostico'].value.length === 0) {
                                        informeModelo.error = "El campo Diagnóstico es Requerido";
                                        alert(informeModelo.error);
                                        vnode.dom['textareadiagnostico'].focus();
                                    } else { 
                                        this.disabled = true;
                                        let informeModificado = { 
                                            id: informe.id,                           
                                            informacionclinica: vnode.dom['textareainformacionclinica'].value,
                                            diagnostico: vnode.dom['textareadiagnostico'].value,
                                            macroscopico: vnode.dom['textareamacroscopico'].value,
                                            muestrasenviadas: muestrasEnviadas,
                                            cortes: cortes                            
                                        }
                                        informeModelo.actualizar(informeModificado);
                                    }
                                }
                            }, [
                                m("i.fas.mg-r-5", )], "Guardar"
                            ),
                        ]),
                        m("th.tx-12", {style: { "width": "15%" }}, [
                            m("button#btnsalir.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                style: { "width": "95%" },
                                onclick: () => {
                                    window.location.reload();
                                }
                            }, "Salir"),
                        ]),
                    ]),
                ]),              
            ])
        ]
    }
}

export default editarInformeAnatomico;