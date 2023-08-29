import m from 'mithril';
import informeModel from './models/informeModel';
import macroscopicoModel from '../plantillaMacroscopico/models/macroscopicoModel';
import diagnosticoModel from '../plantillaDiagnostico/models/diagnosticoModel';
import listadoCortes from '../cortes/listadoCortes';

let opcionMacroscopico = '';
let opcionTipoInforme = ''; 
let opcdiagnostiCIE  = '';
let informeModelo = informeModel;
let macroscopicoModelo = macroscopicoModel;
let diagnosticoModelo = diagnosticoModel;

const informeAnatomico = {
    oninit: (vnode) => { 
        m.redraw(listadoCortes);
        
        informeModelo.cortes = [];
        if (m.route.param("numeroPedido")) {
            informeModelo.numeroPedido = m.route.param("numeroPedido");
            informeModelo.cargarMuestras(informeModelo.numeroPedido);
            informeModelo.cargarDatosPaciente(informeModelo.numeroPedido);
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
        macroscopicoModel.cargarListado();
        diagnosticoModelo.cargarListado();
        informeModelo.gettiposinforme();
        informeModelo.getdiagCIE();
    },
    onupdate: (vnode) => {         
        if (opcionTipoInforme != "empty") {
             vnode.dom['inputinformeid'].value = informeModelo.secuencialInforme  ;
        }  
    }, 
    view: (vnode) => {
        return m("form#crear-informe", [
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
                            },
                            //value: "empty",
                          }, [
                                m('option', {value: "empty"}, ' -Seleccione- ' ),
                                informeModelo.tiposinforme.map(x =>m('option', {value: x.id} , x.descripcion)),                                
                            ]
                        ),
                    ]),
                    m("th.tx-12",{style: {"min-width": "75px"}}  ,"NO. INFORME "),
                    m("td.tx-12", {style: {"min-width": "105px"}} ,[
                        m("input.form-control[id='inputinformeid'][type='text']", { 
                            disabled: true,
                            //value: " Seleccione Tipo Informe "  //informeModelo.secuencialInforme
                        }),
                    ]),
                    m("th.tx-12",  {style: {"min-width": "85px"}} , "NO. PEDIDO:"),
                    m("td.tx-12", {style: {"min-width": "105px"}} ,[
                        m("input.form-control[id='inputnumeropedidomv'][type='text']", { 
                            value: informeModelo.numeroPedido,
                            disabled: true,
                        }),
                    ]),                    
                ]), 
            ]), 
            m("table.table", [ 
                m("tr", [
                    m("th.tx-12", "MÉDICO SOLICITANTE:"),
                    m("td.tx-12",{   style: {"width": "46%"}},
                        [
                            m("input.form-control[id='inputmedicosolicitante'][type='text']", {
                                value: informeModelo.medico,
                                disabled: true,
                            }),
                        ]
                    ),
                    m("th.tx-12", "FECHA DEL DOCUMENTO:"),
                    m("td.tx-12", {style: {"min-width": "105px"}} ,[
                        m("input.form-control[id='inputfechadocumento'][type='text']", { 
                            value: moment().format('D-MM-YYYY'),
                            disabled: true,
                        }),
                    ]),                        
                ]),
            ]), 
            m("table.table", [ 
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
                            //value: "empty",
                          }, [
                                m('option', {value: "empty"}, ' -Seleccione- ' ),
                                informeModelo.tiposdiagnostiCIE.map(x =>m('option', {value: x.id} ,  x.id + ' - ' + x.descripcion)),                                
                            ]
                        ),
                    ]),                            
                ]),
            ]), 
            m("table.table", [
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
                                     //let findPlantilla = macroscopicoModelo.listado.find(e => e.nombreplantilla === opcionMacroscopico);
                                   let findPlantilla = macroscopicoModelo.listado.find(e => e.id == opcionMacroscopico);
                                    vnode.dom['textareamacroscopico'].value = findPlantilla.resultmacroscopico;
                                    vnode.dom['textareainformacionclinica'].value = findPlantilla.infoclinica;
                                    vnode.dom['textareadiagnostico'].value = findPlantilla.diagnostico;
                                    vnode.dom['textareamicroscopico'].value = findPlantilla.resultmicroscopico;
                                    vnode.dom['textareadgpresuntivo'].value = findPlantilla.dgpresuntivo;
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
            m(listadoCortes, {"informeModelo": informeModelo}),
            m("table.table", [
                m("tr", [
                    m("th.tx-12", [
                        m("label.tx-12", {
                            style: {"width": "30%"},
                        },
                        "DIAGNÓSTICO:"),
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
                        })
                    ]),                    
                ]),
            ]),
            m("table.table", [
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
                                    let componentesFecha = informeModelo.datosPaciente.FECHA_PEDIDO.split('-');
                                    let fechaPedido = new Date(parseInt(componentesFecha[2]), parseInt(componentesFecha[1] - 1),parseInt(componentesFecha[0]));
                                    componentesFecha = vnode.dom['inputfechadocumento'].value.split('-');
                                    let fechaDocumento = new Date(parseInt(componentesFecha[2]), parseInt(componentesFecha[1] - 1),parseInt(componentesFecha[0]));
                                    let informe = {
                                        idmuestra: 1,
                                        nopedidomv: parseInt(informeModelo.numeroPedido),
                                        nohistoriaclinicamv: parseInt(informeModelo.numeroHistoriaClinica),
                                        noatencionmv: parseInt(informeModelo.numeroAtencion),
                                        medicosolicitante: vnode.dom['inputmedicosolicitante'].value,
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
                                        macroscopico: vnode.dom['textareamacroscopico'].value,
                                        resultmicroscopico: vnode.dom['textareamicroscopico'].value,
                                        fechadocumento: fechaDocumento.toLocaleDateString('en-CA'),
                                        codigoinforme: vnode.dom['inputinformeid'].value,
                                        muestrasenviadas: muestrasEnviadas ,                                                                                
                                        iddiagncie10: opcdiagnostiCIE,
                                        DIAGNOSTCIE10: vnode.dom['tipodiagnostiCIE'].selectedOptions[0].text,
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