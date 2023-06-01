import informeModel from './models/informeModel';
import macroscopicoModel from '../plantillaMacroscopico/models/macroscopicoModel';
import diagnosticoModel from '../plantillaDiagnostico/models/diagnosticoModel';
import listadoCortes from '../cortes/listadoCortes';
import Auth from '../../../models/auth';
import App from '../../app';

let opcionMacroscopico = '';
let opcionDiag = '';
let informeModelo = informeModel;
let macroscopicoModelo = macroscopicoModel;
let diagnosticoModelo = diagnosticoModel;

const informeAnatomico = {
    oninit: (vnode) => { 
        m.redraw(listadoCortes);
        informeModelo.generarSecuencial(moment().year(), 1);
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
        App.isAuth();        
        macroscopicoModel.cargarListado(Auth.user.user);
        diagnosticoModelo.cargarListado(Auth.user.user);
    },
    view: (vnode) => {
        return m("form#crear-informe", [
            m("table.table", [
                m("tr", [
                    m("th.tx-12", {style: { "width": "85%" }}, [
                        m("h3.mg-t-5.mg-b-10.tx-center", [
                            m("span", { style: "margin: 0 30px 0 0"}, "ANATÓMICO"),
                        ]),
                    ]),
                    m("th.tx-12", {style: { "width": "15%" }}, [
                        m("button#btnnuevoanatomico.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            style: { "width": "95%" },
                            onclick: () => {
                                m.mount(document.querySelector("#crear-informe"),  {
                                    view: () => {
                                       return m(informeAnatomico, {
                                        attrs: {"numeroPedido": informeModelo.numeroPedido, 
                                                "numeroAtencion": informeModelo.numeroAtencion,
                                                "numeroHistoriaClinica": informeModelo.numeroHistoriaClinica,
                                                "medico": informeModelo.medico}
                                            }
                                        )
                                    }
                                });
                            }
                        }, [
                            m("i.fas.fa-plus.mg-r-5")
                        ], "Nuevo"),
                    ]),
                ]),
            ]),  
            m("table.table", [
                m("tr", [
                    m("th.tx-12", "ID P-ANATÓMICO: "),
                    m("td.tx-12", [
                        m("input.form-control[id='inputinformeid'][type='text']", { 
                            disabled: true,
                            value: informeModelo.secuencialInforme
                        }),
                    ]),
                    m("th.tx-12", "NO. PEDIDO:"),
                    m("td.tx-12", [
                        m("input.form-control[id='inputnumeropedidomv'][type='text']", { 
                            value: informeModelo.numeroPedido,
                            disabled: true,
                        }),
                    ]),                    
                ]),
                m("tr", [
                    m("th.tx-12", "MÉDICO SOLICITANTE:"),
                    m("td.tx-12", [
                        m("input.form-control[id='inputmedicosolicitante'][type='text']", {
                            value: informeModelo.medico,
                            disabled: true,
                        }),
                    ]),
                    m("th.tx-12", "FECHA DEL DOCUMENTO:"),
                    m("td.tx-12", [
                        m("input.form-control[id='inputfechadocumento'][type='text']", { 
                            value: moment().format('D-MM-YYYY'),
                            disabled: true,
                        }),
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
                                if (informeModelo.muestrasAsociadas.map(e => e.id).indexOf(muestra.id) === -1){
                                    informeModelo.muestrasAsociadas.push({
                                        id: muestra.id,
                                        checked: false})
                                }
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
                        "MACROSCÓPICO:"),
                        m("label.tx-semibold.tx-12", {
                            style: {"width": "30%", "color": "#0168fa"},
                        },
                        "AGREGAR TEXTO DEFINIDO PREVIAMENTE: "),
                        m('select', {
                            style: {"width": "40%", 'height': '25px' },
                            onchange: function(e) {
                                opcionMacroscopico = e.target.value;
                                let findPlantilla = macroscopicoModelo.listado.find(e => e.nombreplantilla === opcionMacroscopico);
                                vnode.dom['textareamacroscopico'].value = findPlantilla.plantilla;
                            },
                            value: opcionMacroscopico,
                          }, macroscopicoModelo.listado.map(x =>m('option', x.nombreplantilla))
                        ),
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
            m(listadoCortes, {informeModelo: informeModelo}),
            m("table.table", [
                m("tr", [
                    m("th.tx-12", [
                        m("label.tx-12", {
                            style: {"width": "30%"},
                        },
                        "DIAGNÓSTICO:"),
                        m("label.tx-semibold.tx-12", {
                            style: {"width": "30%", "color": "#0168fa"},
                        },
                        "AGREGAR TEXTO DEFINIDO PREVIAMENTE: "),
                        m('select', {
                            style: {"width": "40%", 'height': '25px' },
                            onchange: function(e) {
                                opcionDiag = e.target.value;
                                let findPlantilla = diagnosticoModelo.listado.find(e => e.nombreplantilla === opcionDiag);
                                vnode.dom['textareadiagnostico'].value = findPlantilla.plantilla;
                            },
                            value: opcionDiag,
                          }, diagnosticoModelo.listado.map(x =>m('option', x.nombreplantilla))
                        ),
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
                    m("th.tx-12", []),                    
                    m("th.tx-12", { style: "float: right"}, [
                        m("button#btnguardarinforme.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            onclick: function() {
                                let muestrasEnviadas = [];
                                let cortes = [];
                                informeModelo.muestrasAsociadas.filter(function(muestra){
                                    if (muestra.checked)  {
                                        muestrasEnviadas.push(muestra.id);
                                    }
                                });  
                                informeModelo.listadoCortes.filter(function(corte) {
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
                                        idtipoinforme: 1,
                                        idestadopedido: 1,                                       
                                        informacionclinica: vnode.dom['textareainformacionclinica'].value,
                                        diagnostico: vnode.dom['textareadiagnostico'].value,
                                        macroscopico: vnode.dom['textareamacroscopico'].value,
                                        fechadocumento: fechaDocumento.toLocaleDateString('en-CA'),
                                        codigoinforme: vnode.dom['inputinformeid'].value,
                                        muestrasenviadas: muestrasEnviadas ,
                                        cortes: cortes                            
                                    }
                                    informeModelo.guardar(informe);
                                }
                            }
                        }, [
                            m("i.fas.mg-r-5", )], "Guardar"
                        ),
                    ]),
                ]),
            ]),              
        ])
    }
}

export default informeAnatomico;