import m from 'mithril';
import informeModel from './models/informeModel';
import listadoCortes from '../cortes/listadoCortes';
import macroscopicoModel from '../plantillaMacroscopico/models/macroscopicoModel';
import diagnosticoModel from '../plantillaDiagnostico/models/diagnosticoModel';

let informeModelo = informeModel;
let informe = null;
let opcionMacroscopico = '';
let opcionDiagnostico = '';
let macroscopicoModelo = macroscopicoModel;
let diagnosticoModelo = diagnosticoModel;
let opcionTipoInforme = '';
let opcdiagnostiCIE  = '';
let opcreferenciaInfome  = '';
let modifMuestras = false;


const editarInformeAnatomico = {
    oninit: (vnode) => { 
        if (vnode.attrs.informeModelo !== undefined) {                 
            informeModelo = vnode.attrs.informeModelo;
            informeModelo.cargarDatosPaciente(informeModelo.numeroPedido);
            informe = informeModelo.listado[0];
            informeModelo.loading = true;
            informeModelo.secuencialInforme = informe.codigoinforme;
            informeModelo.diagnostiCIE = informe.iddiagncie10;
            informeModelo.referenciaInfome = informe.referenciaInfome;
            informeModelo.getinformesreferenciahc(informeModel.numeroHistoriaClinica) ;
            macroscopicoModel.cargarListado(); 
            diagnosticoModelo.cargarListado();
            informeModelo.gettiposinforme();
            informeModelo.getdiagCIE();
            informeModelo.cargarMuestras(informeModelo.numeroPedido); 
        } 
    } ,
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
        if (informeModelo.secuencialInforme != undefined) {
            vnode.dom['inputinformeid'].value = informeModelo.secuencialInforme  ;
        }       
        if (informeModelo.diagnostiCIE != "empty") { 
            vnode.dom['tipodiagnostiCIE'].value = informeModelo.diagnostiCIE  ;             
        } 
        if (informeModelo.referenciaInfome != "empty") { 
            vnode.dom['informeReferencia'].value = informeModelo.referenciaInfome  ;             
        } 
        if (informeModelo.resultmicroscopico !== undefined) {
            vnode.dom['textareamicroscopico'].value = informeModelo.resultmicroscopico  ;
        } 
        if (informeModelo.resultado2 !== undefined) {
            vnode.dom['textarearesultado2'].value = informeModelo.resultado2  ;
        } 
        if (informeModelo.resultado3 !== undefined) {
            vnode.dom['textarearesultado3'].value = informeModelo.resultado3  ;
        } 
        if (opcionTipoInforme != "empty") {
            vnode.dom['inputinformeid'].value = informeModelo.secuencialInforme; 
        }  
        if (informeModelo.opcionTipoInforme !== undefined) { 
            opcionTipoInforme = informeModelo.opcionTipoInforme;            
            vnode.dom['tipoinforme'].value = opcionTipoInforme;
        }  
        if (opcionMacroscopico != "") {
            if (opcionMacroscopico == "empty") {
                vnode.dom['textareamacroscopico'].value = "";
                vnode.dom['textareainformacionclinica'].value = "";
                vnode.dom['textareadiagnostico'].value = "";
                vnode.dom['textareamicroscopico'].value = "";
                vnode.dom['textareadgpresuntivo'].value = "";
            }else {
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
        if (opcionDiagnostico != "") {
            if (opcionDiagnostico == "empty") {
                vnode.dom['textarearesultado2'].value = "";
            } else {
                let findPlantilla = diagnosticoModelo.listado.find(e => e.id == opcionDiagnostico);                                    
                vnode.dom['textarearesultado2'].value = findPlantilla.nombreplantilla;
            }    
        } 
        if (informeModelo.guardado) {
            alert("Los cambios han sido guardados correctamente");
            vnode.dom['btnsalir'].disabled = false;
            informeModelo.guardado = false;
       } else if (!informeModelo.guardado & informeModelo.errorGuardando !== null) {
            alert(informeModelo.errorGuardando); 
            vnode.dom['btnsalir'].disabled = false;
            vnode.dom['btnguardarinforme'].disabled = false;
            informeModelo.errorGuardando = '';
       }
    }, 
    view: (vnode) => {
        return [
            m("form#editar-informe", [ 
                m('div.table-responsive', [
                    m("table.table.table-bordered.table-sm.tx-12", [
                        m("thead",
                            m("tr.bg-litecoin.op-9.tx-white", [
                                m("th[scope='col'][colspan='9']",
                                    "DATOS DEL PEDIDO:"
                                ),
                            ])
                        ),
                        m("tbody", [
                            m("tr", [
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "N° Pedido Patología:"
                                ),
                                m("td", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.CD_PRE_MED : 
                                    ""
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Fecha:"
                                ),
                                m("td[colspan='2']", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.FECHA_PEDIDO.replaceAll('-', '/') + " " + informeModelo.datosPaciente.HORA_PEDIDO  : 
                                    ""
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Origen:"
                                ),
                                m("td[colspan='3']", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.SECTOR : 
                                    ""
                                ),
                            ]),
    
                            m("tr", [
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Médico Solicitante:"
                                ),
                                m("td[colspan='4']", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.medico : 
                                    ""
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Especialidad:"
                                ),
                                m("td[colspan='3']", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.ESPECIALIDAD : 
                                    ""
                                ),
                            ]),
                        ]),                    
                        m("thead",
                            m("tr.bg-litecoin.op-9.tx-white", [
                                m("th[scope='col'][colspan='9']",
                                    "DATOS DEL PACIENTE:"
                                ),
                            ])
                        ),
                        m("tbody", [
                            m("tr", [
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Apellidos y Nombres:"
                                ),
                                m("td[colspan='4']", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.NM_PACIENTE : 
                                    ""
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "EDAD:"
                                ),
                                m("td", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.EDAD : 
                                    ""
                                ),
    
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "NHC:"
                                ),
                                m("td[colspan='2']", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.CD_PACIENTE : 
                                    ""
                                ),
                            ]),
                            m("tr", [
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "N° Atención:"
                                ),
                                m("td", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.AT_MV : 
                                    ""
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Peso:"
                                ),
                                m("td", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.PESO : 
                                    ""
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Altura:"
                                ),
                                m("td", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.ALTURA : 
                                    ""
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Ubicación:"
                                ),
                                m("td[colspan='4']", {
                                        style: { "background-color": "#eaeff5" }
                                    },
                                    informeModelo.datosPaciente != null ? 
                                    informeModelo.datosPaciente.SECTOR + " " + informeModelo.datosPaciente.UBICACION : 
                                    ""
                                ),
                            ]),
                            m("tr", [
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Fecha Documento:"
                                ),
                                m("td[colspan='8']", {
                                        style: { "background-color": "#eaeff5" }
                                    },                        
                                    m("input.form-control[id='inputfechadocumento'][type='text']", { 
                                        value: new Date(informe.fechadocumento).toLocaleDateString('en-GB'),
                                        disabled: true,
                                        style: { "background-color": "#eaeff5", 
                                                 "border": "0",
                                                 "height": "25px",
                                                 "padding": "0"}
                                    }),
                                ),
                            ]), 
                        ]),
                    ]),
                ]),
                m("table.table", {style: {"margin-bottom": "0"}}, [
                    m("tr", [
                        m("th.tx-12", {style: {"width": "15%"}} , "TIPO INFORME"),
                        m("td.tx-12", [
                            m('select[name=tipoinforme]', {
                                style: {"width": "100%", 'height': '25px' },
                                id: "tipoinforme",
                                onchange: function(e) {
                                    opcionTipoInforme = e.target.value;  
                                    if (opcionTipoInforme == "empty") {
                                        vnode.dom['tipoinforme'].value = "";
                                    }else {
                                        informeModelo.generarSecuencial(moment().year(), e.target.value);
                                    }
                                    informeModelo.opcionTipoInforme = opcionTipoInforme;
                                    informeModelo.tipoinforme = opcionTipoInforme;
                                },
                                value: informe.idtipoinforme,
                            }, [
                                    informeModelo.tiposinforme.map(x =>m('option', {value: x.id} , x.descripcion)),                                
                                ]
                            ),
                        ]),
                        m("th.tx-12", {style: {"width": "15%"}} ,"NO. INFORME "),
                        m("td.tx-12", {style: {"width": "35%"}} , [
                            m("input.form-control[id='inputinformeid'][type='text']",{ 
                                disabled: true,
                                value: informe.codigoinforme
                            }),
                        ]),                   
                    ]), 
                ]),  
                m("table.table", {style: {"margin-bottom": "0"}}, [
                    m("tr", [  
                        m("th.tx-12", {style: {"width": "25%"}} , "Referencia (Informe):"),
                        m("td.tx-12", [
                            m('select[name=informeReferencia]', {
                                style: {"width": "100%", 'height': '25px' },
                                id: "informeReferencia",
                                onchange: function(e) {
                                    opcreferenciaInfome = e.target.value;   
                                    informeModelo.referenciaInfome = e.target.value;
                                },
                                value: informe.referenciaInfome,
                              }, [
                                    m('option', {value: "empty"}, ' -Seleccione- ' ),
                                    (informeModelo.informesReferencia != null)? 
                                        informeModelo.informesReferencia.map(
                                            x => (x.id != informe.id)? m('option', {value: x.id} , 
                                                'Atención: ' + x.noatencionmv.padStart(12, '- ') 
                                                + new Date(x.fechadocumento).toLocaleDateString('en-US').padStart(12, '- ')  
                                                + x.descripcion.padStart(20, '- ') + 
                                                new String(x.codigoinforme).padStart(15,"- ")) : null
                                    ) : "" ,        
                                ]
                            ),
                        ]),                   
                    ]),  
                ]),
                m("table.table", {style: {"margin-bottom": "0"}}, [
                    m("tr", [  
                        m("th.tx-12", {style: {"width": "25%"}} , "Diagnóstico CIE10:"),
                        m("td.tx-12", [
                            m('select[name=tipodiagnostiCIE]', {
                                style: {"width": "100%", 'height': '25px' },
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
                m("table.table", {style: {"margin-bottom": "0"}}, [
                    m("tr", [
                        m("th.tx-12", {style: {"width": "25%", "color": "#0168fa"}},"PLANTILLA MACROSCÓPICA:"),
                        m("td.tx-12", [
                            m('select[name=plantillas]', {
                                style: {"width": "100%", 'height': '25px' },
                                id: "box",
                                onchange: function(e) {
                                    opcionMacroscopico = e.target.value; 
                                    if (opcionMacroscopico == "empty") {
                                        vnode.dom['textareamacroscopico'].value = "";
                                        vnode.dom['textareainformacionclinica'].value = "";
                                        vnode.dom['textareadiagnostico'].value = "";
                                        vnode.dom['textareamicroscopico'].value = "";
                                        vnode.dom['textareadgpresuntivo'].value = "";
                                    }else { 
                                        let findPlantilla = macroscopicoModelo.listado.find(e => e.id == opcionMacroscopico); 
                                        if (typeof findPlantilla !== "undefined") {
                                            vnode.dom['textareamacroscopico'].value = findPlantilla.resultmacroscopico;
                                            vnode.dom['textareainformacionclinica'].value = findPlantilla.infoclinica;
                                            vnode.dom['textareadiagnostico'].value = findPlantilla.diagnostico;
                                            vnode.dom['textareamicroscopico'].value = findPlantilla.resultmicroscopico;
                                            vnode.dom['textareadgpresuntivo'].value = findPlantilla.dgpresuntivo;
                                        }
                                    }
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
                m("table.table", {style: {"margin-bottom": "0"}}, [
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
                                        if (!muestraSeleccDB && muestra.valida == "0"){  
                                            return false;
                                        } 
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
                m("table.table", {style: {"margin-bottom": "0"}}, [
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
                                }
                            })
                        ]), 
                    ]),      
                ]), 
                m("table.table", {style: {"margin-bottom": "0"}}, [
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
                                }
                            })
                        ]), 
                    ]),      
                ]),
                m("table.table", {style: {"margin-bottom": "0"}}, [
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
                                }
                            })
                        ]),                    
                    ]),
                ]),
                m("table.table", {style: {"margin-bottom": "0"}}, [
                    m("tr", [
                        m("th.tx-12", [
                            m("label.tx-12", {
                                style: {"width": "30%"},
                            },
                            "RESULTADO 1:"),
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
                                }
                            })
                        ]),                    
                    ]),
                ]),
                m("table.table", {style: {"margin-bottom": "0"}}, [
                    m("tr", [
                        m("th.tx-12", {style: {"width": "25%", "color": "#0168fa"}},"PLANTILLA DIAGNÓSTICO:"),
                        m("td.tx-12", [
                            m('select[name=plantillaDiagnostico]', {
                                style: {"width": "100%", 'height': '25px' },
                                id: "plantillaDiag",
                                onchange: function(e) {
                                    opcionDiagnostico = e.target.value; 
                                    if (opcionDiagnostico == "empty") {
                                        vnode.dom['textarearesultado2'].value = "";
                                    } else {
                                        let findPlantilla = diagnosticoModelo.listado.find(e => e.id == opcionDiagnostico);                                    
                                        vnode.dom['textarearesultado2'].value = findPlantilla.nombreplantilla;
                                    }                                
                                },
                              }, [
                                    m('option', {value: "empty"}, ' -Seleccione- ' ),
                                    diagnosticoModelo.listado.map(x =>m('option', {value: x.id} , x.nombreplantilla)),                                
                                ]
                            ),
                        ]),
                    ]),  
                ]),  
                m("table.table", {style: {"margin-bottom": "0"}}, [
                    m("tr", [
                        m("th.tx-12", [
                            m("label.tx-12", {
                                style: {"width": "30%"},
                            },
                            "RESULTADO 2:"),
                        ]),
                    ]),
                    m("tr", [        
                        m("td.tx-12", [
                            m("textarea.form-control[id='textarearesultado2']", {
                                style: "min-height: 100px",
                                rows: 4,
                                value: informe.resultado2,
                                onchange: function(e) {
                                    informeModelo.resultado2 = e.target.value;
                                }
                            })
                        ]),                    
                    ]),
                ]),
                m("table.table", {style: {"margin-bottom": "0"}}, [
                    m("tr", [
                        m("th.tx-12", [
                            m("label.tx-12", {
                                style: {"width": "30%"},
                            },
                            "RESULTADO 3:"),
                        ]),
                    ]),
                    m("tr", [        
                        m("td.tx-12", [
                            m("textarea.form-control[id='textarearesultado3']", {
                                style: "min-height: 100px",
                                rows: 4,
                                value: informe.resultado3,
                                onchange: function(e) {
                                    informeModelo.resultado3 = e.target.value;
                                }
                            })
                        ]),                    
                    ]),
                ]),
                m(listadoCortes, {"informeModelo": informeModelo}),
                m("table.table", {style: {"margin-bottom": "0"}}, [
                    m("tr", [
                        m("th.tx-12", []),                    
                        m("th.tx-12", { style: "float: right", "padding": "7px 0"}, [
                            m("button#btnguardarinforme.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
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
                                    if (vnode.dom['inputinformeid'].value.length === 0) {
                                        informeModelo.error = "El campo Tipo Informe es Requerido";
                                        alert(informeModelo.error);
                                        vnode.dom['tipoinforme'].focus();
                                    } else if (vnode.dom['textareainformacionclinica'].value.length === 0) {
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
                                        informeModelo.error = "El campo Resultado 1 es Requerido";
                                        alert(informeModelo.error);
                                        vnode.dom['textareadiagnostico'].focus();
                                    } else { 
                                        this.style.display = "none";
                                        vnode.dom['btnsalir'].disabled = true;
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
                                            referinforme: opcreferenciaInfome,
                                            DIAGNOSTCIE10: vnode.dom['tipodiagnostiCIE'].selectedOptions[0].text,
                                            cortes: cortes,
                                            resultado2: vnode.dom['textarearesultado2'].value,
                                            resultado3: vnode.dom['textarearesultado3'].value,
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