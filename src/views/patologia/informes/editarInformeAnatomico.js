import m from 'mithril';
import informeModel from './models/informeModel';
import listadoCortes from '../cortes/listadoCortes';
import macroscopicoModel from '../plantillaMacroscopico/models/macroscopicoModel';

let informeModelo = informeModel;
let informe = null;
let opcionMacroscopico = '';
let macroscopicoModelo = macroscopicoModel;
let opcionTipoInforme = '';
let opcdiagnostiCIE  = '';
let modifMuestras = false;

const editarInformeAnatomico = {
    oninit: (vnode) => { 
        if (vnode.attrs.informeModelo !== undefined) {
            informeModelo = vnode.attrs.informeModelo;
            informe = informeModelo.listado[0];
            informeModelo.loading = true;
            informeModelo.secuencialInforme = informe.codigoinforme;
            informeModelo.diagnostiCIE = informe.iddiagncie10;
            macroscopicoModel.cargarListado(); 
            informeModelo.gettiposinforme();
            informeModelo.getdiagCIE();
            informeModelo.cargarMuestras(informeModelo.numeroPedido); 
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
        if (informeModelo.opcionTipoInforme != "empty") {
            vnode.dom['inputinformeid'].value = informeModelo.secuencialInforme  ;
        }       
        if (informeModelo.diagnostiCIE != "empty") { 
                vnode.dom['tipodiagnostiCIE'].value = informeModelo.diagnostiCIE  ;             
        } 
        if (informeModelo.resultmicroscopico !== undefined) {
            vnode.dom['textareamicroscopico'].value = informeModelo.resultmicroscopico  ;
        } 
        if (opcionMacroscopico != "") {
            if (opcionMacroscopico == "empty") {
                vnode.dom['textareamacroscopico'].value = "";
                vnode.dom['textareainformacionclinica'].value = "";
                vnode.dom['textareadiagnostico'].value = "";
                vnode.dom['textareamicroscopico'].value = "";
                vnode.dom['textareadgpresuntivo'].value = "";
            }else {
                //let findPlantilla = macroscopicoModelo.listado.find(e => e.nombreplantilla === opcionMacroscopico);
                let findPlantilla = macroscopicoModelo.listado.find(e => e.id == opcionMacroscopico);
                if (typeof findPlantilla !== "undefined") {
                    vnode.dom['textareamacroscopico'].value = findPlantilla.resultmacroscopico;
                    vnode.dom['textareainformacionclinica'].value = findPlantilla.infoclinica;
                    vnode.dom['textareadiagnostico'].value = findPlantilla.diagnostico;
                    vnode.dom['textareamicroscopico'].value = findPlantilla.resultmicroscopico;
                    vnode.dom['textareadgpresuntivo'].value = findPlantilla.dgpresuntivo;
                }
                
            } 
        }
        if (modifMuestras){
            
        }
    }, 
    view: (vnode) => {
        return [
            m("form#editar-informe", [ 
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", {style: {"width": "35px"}} , "TIPO INFORME"),
                        m("td.tx-12", [
                            m('select[name=tipoinforme]', {
                                style: {"width": "85%", 'height': '25px' },
                                id: "tipoinforme",
                                onchange: function(e) {
                                    opcionTipoInforme = e.target.value;  
                                    if (opcionTipoInforme == "empty") {
                                        vnode.dom['inputinformeid'].value = "";
                                    }else {
                                        informeModelo.generarSecuencial(moment().year(), e.target.value);
                                    }
                                    informeModelo.opcionTipoInforme = opcionTipoInforme;
                                    vnode.dom['btnguardarinforme'].disabled = false;
                                },
                                value: informe.idtipoinforme,
                            }, [
                                    m('option', {value: "empty"}, ' -Seleccione- ' ),
                                    informeModelo.tiposinforme.map(x =>m('option', {value: x.id} , x.descripcion)),                                
                                ]
                            ),
                        ]),
                        m("th.tx-12", {style: {"width": "35px"}} ,"NO. INFORME "),
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
                        m("td.tx-12",{   style: {"width": "255px"}}, [
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
                        m("th.tx-12", "Diagnóstico CIE10:"),
                        m("td.tx-12", [
                            m('select[name=tipodiagnostiCIE]', {
                                style: {"width": "220px", 'height': '25px' },
                                id: "tipodiagnostiCIE",
                                onchange: function(e) {
                                    opcdiagnostiCIE = e.target.value;   
                                    informeModelo.diagnostiCIE = e.target.value;
                                },
                                value: informe.iddiagncie10,
                              }, [
                                    m('option', {value: "empty"}, ' -Seleccione- ' ),
                                    informeModelo.tiposdiagnostiCIE.map(x =>m('option', {value: x.id} , x.id + ' - ' + x.descripcion)),                                
                                ]
                            ),
                        ]),                    
                    ]),
                ]),  
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", {style: {"width": "35%", "color": "#0168fa"}},"PLANTILLA MACROSCÓPICA:"),
                        m("td.tx-12", [
                            m('select[name=plantillas]', {
                                style: {"width": "85%", 'height': '25px' },
                                id: "box",
                                onchange: function(e) {
                                    opcionMacroscopico = e.target.value;
                                    // let findPlantilla = macroscopicoModelo.listado.find(e => e.nombreplantilla === opcionMacroscopico);
                                    // vnode.dom['textareamacroscopico'].value = findPlantilla.resultmacroscopico;
                                    // vnode.dom['textareainformacionclinica'].value = findPlantilla.infoclinica;
                                    // vnode.dom['textareadiagnostico'].value = findPlantilla.diagnostico;
                                    // vnode.dom['textareamicroscopico'].value = findPlantilla.resultmicroscopico;
                                    // vnode.dom['textareadgpresuntivo'].value = findPlantilla.dgpresuntivo;
                                    if (opcionMacroscopico == "empty") {
                                        vnode.dom['textareamacroscopico'].value = "";
                                        vnode.dom['textareainformacionclinica'].value = "";
                                        vnode.dom['textareadiagnostico'].value = "";
                                        vnode.dom['textareamicroscopico'].value = "";
                                        vnode.dom['textareadgpresuntivo'].value = "";
                                    }else {
                                        //let findPlantilla = macroscopicoModelo.listado.find(e => e.nombreplantilla === opcionMacroscopico);
                                        let findPlantilla = macroscopicoModelo.listado.find(e => e.id == opcionMacroscopico); 
                                        if (typeof findPlantilla !== "undefined") {
                                            vnode.dom['textareamacroscopico'].value = findPlantilla.resultmacroscopico;
                                            vnode.dom['textareainformacionclinica'].value = findPlantilla.infoclinica;
                                            vnode.dom['textareadiagnostico'].value = findPlantilla.diagnostico;
                                            vnode.dom['textareamicroscopico'].value = findPlantilla.resultmicroscopico;
                                            vnode.dom['textareadgpresuntivo'].value = findPlantilla.dgpresuntivo;
                                        }
                                    } 
                                    vnode.dom['btnguardarinforme'].disabled = false;
                                },
                                value: opcionMacroscopico,
                            }, [
                                  m('option', {value: "empty"}, ' -Seleccione- ' ),
                                  macroscopicoModelo.listado.map(x =>m('option', {value: x.id} , x.nombreplantilla)),                                
                              ]
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
                                    // informeModelo.muestrasAsociadas se inicializa con informeModelo.muestras que tiene TODAS muestras Pedido
                                    informeModelo.muestras.map(function(muestra) {
                                        let muestraSeleccDB = (informe.muestrasAsociadas.map(e => e.id).indexOf(muestra.id) != -1)
                                        if (informeModelo.muestrasAsociadas.map(e => e.id).indexOf(muestra.id) === -1){
                                            informeModelo.muestrasAsociadas.push({
                                                id: muestra.id,
                                                checked: muestraSeleccDB
                                            })
                                        }
                                        const indexItem = informeModelo.muestrasAsociadas.map(e => e.id).indexOf(muestra.id); 

                                        return [
                                            m("div", [
                                                m("input[type='checkbox']", {
                                                    style: {"float": "left", "margin-top": "2px"},
                                                    class: "muestraenviada", 
                                                    id: muestra.id,
                                                    checked: (indexItem != -1) ? informeModelo.muestrasAsociadas[indexItem].checked : false,
                                                    onclick: function() {
                                                        const index = informeModelo.muestrasAsociadas.map(e => e.id).indexOf(parseInt(this.id));
                                                        if (index != -1 ){
                                                            informeModelo.muestrasAsociadas[index].checked = this.checked;
                                                        }
                                                    }
                                                }),
                                                m("label.tx-semibold.tx-12", {
                                                    style: {"margin": "0 10px", "width": "90%"},
                                                },
                                                muestra.id + " - " + muestra.descripcion),
                                            ]),
                                        ]
                                        
                                       
                                        
                                    } ),
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
                            m("textarea.form-control[id='textareadgpresuntivo']", {
                                style: "min-height: 100px",
                                rows: 4,
                                value: informe.dgpresuntivo,
                                onchange: function(e) {
                                    informeModelo.dgpresuntivo = e.target.value;
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
                            "MACROSCÓPICO:"),
                        ]),
                    ]),
                    m("tr", [
                        m("td.tx-12", [
                            m("textarea.form-control[id='textareamacroscopico']", {
                                style: "min-height: 100px",
                                rows: 4,
                                value: informe.macroscopico,
                                onchange: function(e) {
                                    informeModelo.macroscopico = e.target.value;
                                    vnode.dom['btnguardarinforme'].disabled = false;
                                }
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
                                onchange: function(e) {
                                    informeModelo.resultmicroscopico = e.target.value;
                                    vnode.dom['btnguardarinforme'].disabled = false;
                                }
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
                                            year: moment().year(),                    
                                            informacionclinica: vnode.dom['textareainformacionclinica'].value,
                                            diagnostico: vnode.dom['textareadiagnostico'].value,
                                            macroscopico: vnode.dom['textareamacroscopico'].value, 
                                            dgpresuntivo: vnode.dom['textareadgpresuntivo'].value,
                                            resultmicroscopico: vnode.dom['textareamicroscopico'].value,
                                            muestrasenviadas: muestrasEnviadas,                                            
                                            idtipoinforme: informeModelo.opcionTipoInforme,                                         
                                            iddiagncie10: opcdiagnostiCIE,
                                            DIAGNOSTCIE10: vnode.dom['tipodiagnostiCIE'].selectedOptions[0].text,
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