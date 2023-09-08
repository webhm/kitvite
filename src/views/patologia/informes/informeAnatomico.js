import m from 'mithril';
import informeModel from './models/informeModel';
import macroscopicoModel from '../plantillaMacroscopico/models/macroscopicoModel';
import diagnosticoModel from '../plantillaDiagnostico/models/diagnosticoModel';
import listadoCortes from '../cortes/listadoCortes';

let opcionMacroscopico = '';
let opcionDiagnostico = '';
let opcionTipoInforme = ''; 
let opcdiagnostiCIE  = '';
let opcreferenciaInfome  = '';
let informeModelo = informeModel;
let macroscopicoModelo = macroscopicoModel;
let diagnosticoModelo = diagnosticoModel;

const informeAnatomico = {
    oninit: (vnode) => { 
        m.redraw(listadoCortes);        
        informeModelo.cortes = [];
        if (m.route.param("numeroPedido")) {
            informeModelo.numeroPedido = m.route.param("numeroPedido");
            informeModelo.cargarDatosPaciente(informeModelo.numeroPedido);
            informeModelo.cargarMuestras(informeModelo.numeroPedido);            
        }
        if (m.route.param("numeroAtencion")) {
            informeModelo.numeroAtencion = m.route.param("numeroAtencion");
        }
        if (m.route.param("numeroHistoriaClinica")) {
            informeModelo.numeroHistoriaClinica = m.route.param("numeroHistoriaClinica");
        }
        if (m.route.param("medico")) {
            informeModelo.medico = m.route.param("medico");
        }  
        informeModelo.gettiposinforme();
        informeModelo.getdiagCIE();
        informeModelo.getinformesreferenciahc(informeModel.numeroHistoriaClinica);
        macroscopicoModel.cargarListado();
        diagnosticoModelo.cargarListado();
    },
    onupdate: (vnode) => {         
        if (opcionTipoInforme != "empty") {
             vnode.dom['inputinformeid'].value = informeModelo.secuencialInforme;
        }  
        if (informeModelo.guardado) {
            alert("Los cambios han sido guardados correctamente");
            vnode.dom['btnguardarinforme'].disabled = false;
            vnode.dom['btnsalir'].disabled = false;
            informeModelo.guardado = false;
       } else if (!informeModelo.guardado & informeModelo.errorGuardando !== null) {
            alert(informeModelo.errorGuardando); 
            vnode.dom['btnguardarinforme'].disabled = false;
            vnode.dom['btnsalir'].disabled = false;
            informeModelo.errorGuardando = '';
       } 
    }, 
    view: (vnode) => {
        return m("form#crear-informe", [
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
                                    value: moment().format('D/MM/YYYY'),
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
                    m("th.tx-12", {style: {"width": "15%"}}, "TIPO INFORME"),
                    m("td.tx-12", {style: {"width": "35%"}}, [
                        m('select[name=tipoinforme]', {
                            style: {"width": "100%", 'height': '25px'},
                            id: "tipoinforme",
                            onchange: function(e) {
                                opcionTipoInforme = e.target.value;  
                                if (opcionTipoInforme == "empty") {
                                    vnode.dom['inputinformeid'].value = "";
                                } else {
                                    informeModelo.generarSecuencial(moment().year(), e.target.value);
                                }                                
                            },
                          }, [
                                m('option', {value: "empty"}, ' -Seleccione- ' ),
                                informeModelo.tiposinforme.map(x =>m('option', {value: x.id} , x.descripcion)),                                
                            ]
                        ),
                    ]),
                    m("th.tx-12",{style: {"width": "15%"}}  ,"NO. INFORME "),
                    m("td.tx-12", {style: {"width": "35%"}} ,[
                        m("input.form-control[id='inputinformeid'][type='text']", { 
                            disabled: true
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
                        }, [ m('option', {value: "empty"}, ' -Seleccione- ' ),
                                informeModelo.informesReferencia != null ?
                                informeModelo.informesReferencia.map(
                                        x =>m('option', {value: x.id} , 
                                            'Atención: ' + x.noatencionmv.padStart(12, '- ') 
                                            + new Date(x.fechadocumento).toLocaleDateString('en-GB').padStart(12, '- ')  
                                            + x.descripcion.padStart(20, '- ') + 
                                            new String(x.codigoinforme).padStart(15,"- ") 
                                )) : ""      
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
                          }, [
                                m('option', {value: "empty"}, ' -Seleccione- ' ),
                                informeModelo.tiposdiagnostiCIE.map(x =>m('option', {value: x.id} ,  x.id + ' - ' + x.descripcion)),                                
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
                            id: "plantillaMacro",
                            onchange: function(e) {
                                opcionMacroscopico = e.target.value; 
                                if (opcionMacroscopico == "empty") {
                                    vnode.dom['textareamacroscopico'].value = "";
                                    vnode.dom['textareainformacionclinica'].value = "";
                                    vnode.dom['textareadiagnostico'].value = "";
                                    vnode.dom['textareamicroscopico'].value = "";
                                    vnode.dom['textareadgpresuntivo'].value = "";
                                } else {
                                    let findPlantilla = macroscopicoModelo.listado.find(e => e.id == opcionMacroscopico);
                                    vnode.dom['textareamacroscopico'].value = findPlantilla.resultmacroscopico;
                                    vnode.dom['textareainformacionclinica'].value = findPlantilla.infoclinica;
                                    vnode.dom['textareadiagnostico'].value = findPlantilla.diagnostico;
                                    vnode.dom['textareamicroscopico'].value = findPlantilla.resultmicroscopico;
                                    vnode.dom['textareadgpresuntivo'].value = findPlantilla.dgpresuntivo;
                                }                                
                            },
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
                        })
                    ]),                    
                    m("td.tx-12", {}, [
                        m("div[id='muestrasasociadas']", {
                            style: {"border": "1px solid #c0ccda", "height": "100px", "padding": "5px", "overflow": "auto"}
                        }, [
                            informeModelo.muestras.map(function(muestra) {
                                if (informeModelo.muestrasAsociadas.map(e => e.id).indexOf(muestra.id) === -1 && muestra.valida == '1'){
                                    informeModelo.muestrasAsociadas.push({
                                        id: muestra.id,
                                        checked: false
                                    })
                                }
                                if (muestra.valida == '1'){
                                    return [
                                        m("div", [
                                            m("input[type='checkbox']", {
                                                style: {"float": "left", "margin-top": "2px"},
                                                class: "muestraenviada", 
                                                id: muestra.id,
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
                                }
                               
                            }
                            ),
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
                        "MACROSCÓPICO:")
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
                        })
                    ]),                    
                ]),
            ]),            
            m(listadoCortes, {"informeModelo": informeModelo}),
            m("table.table", {style: {"margin-bottom": "0"}}, [
                m("tr", [          
                    m("th.tx-12", { style: {"float": "right", "padding": "7px 0"}}, [
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
                                    cortes.push(corte);
                                });  
                                if (vnode.dom['inputinformeid'].value.length === 0) {
                                    informeModelo.error = "El campo Tipo Informe es Requerido";
                                    alert(informeModelo.error);
                                    vnode.dom['tipoinforme '].focus();
                                } else { 
                                    this.disabled = true;
                                    vnode.dom['btnsalir'].disabled = true;
                                    let componentesFecha = informeModelo.datosPaciente.FECHA_PEDIDO.split('-');
                                    let fechaPedido = new Date(parseInt(componentesFecha[2]), parseInt(componentesFecha[1] - 1),parseInt(componentesFecha[0]));
                                    componentesFecha = vnode.dom['inputfechadocumento'].value.split('/');
                                    let fechaDocumento = new Date(parseInt(componentesFecha[2]), parseInt(componentesFecha[1] - 1),parseInt(componentesFecha[0]));
                                    let informe = {
                                        idmuestra: 1,
                                        nopedidomv: parseInt(informeModelo.numeroPedido),
                                        nohistoriaclinicamv: parseInt(informeModelo.numeroHistoriaClinica),
                                        noatencionmv: parseInt(informeModelo.numeroAtencion),
                                        medicosolicitante: informeModelo.medico,
                                        nombrepaciente: informeModelo.datosPaciente.NM_PACIENTE,
                                        cedulaidentidad: informeModelo.datosPaciente.CD_IDENTIFICADOR_PESSOA,
                                        servicio: informeModelo.datosPaciente.SERVICIO,
                                        plan: informeModelo.datosPaciente.NM_CONVENIO,
                                        instruccion: informeModelo.datosPaciente.SECTOR,
                                        ubicacion: informeModelo.datosPaciente.UBICACION,
                                        edad: informeModelo.datosPaciente.EDAD,
                                        fechapedido: fechaPedido.toLocaleDateString('en-CA'),
                                        secuencial: informeModelo.consecutivo,
                                        year: moment().year(),
                                        idtipoinforme: opcionTipoInforme,
                                        idestadopedido: 1,                                       
                                        informacionclinica: vnode.dom['textareainformacionclinica'].value,
                                        dgpresuntivo: vnode.dom['textareadgpresuntivo'].value,
                                        diagnostico: vnode.dom['textareadiagnostico'].value,
                                        resultado2: vnode.dom['textarearesultado2'].value,
                                        resultado3: vnode.dom['textarearesultado3'].value,
                                        macroscopico: vnode.dom['textareamacroscopico'].value,
                                        resultmicroscopico: vnode.dom['textareamicroscopico'].value,
                                        fechadocumento: fechaDocumento.toLocaleDateString('en-CA'),
                                        codigoinforme: vnode.dom['inputinformeid'].value,
                                        muestrasenviadas: muestrasEnviadas ,                                                                                
                                        iddiagncie10: opcdiagnostiCIE,                                                                             
                                        referinforme: opcreferenciaInfome,
                                        DIAGNOSTCIE10: (vnode.dom.tipodiagnostiCIE.selectedOptions.length > 0)? vnode.dom['tipodiagnostiCIE'].selectedOptions[0].text : "",
                                        cortes: cortes                            
                                    }
                                    informeModelo.guardar(informe);
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
    }
}

export default informeAnatomico;