import corteModel from './models/corteModel';

let corteModelo = corteModel;
let informeModelo = null;
let corteId = 1;

const crearCorte = {
    oninit: (vnode) => {
        if (vnode.attrs.informeModelo !== undefined) {
            informeModelo = vnode.attrs.informeModelo;
        }
    },  
    oncreate: (vnode) => {
        vnode.dom['inputletra'].focus();
    }, 
    view: (vnode) => {
        return [
            m("form#crear-corte"),
            m("td.tx-12", {style: {'width': '15%', 'padding': '8px 3px'}}, [
                m("input.form-control[id='inputletra'][type='text'][form='crear-corte']", {
                    style: {"text-transform": "uppercase"},
                    onchange: function(event) {
                        vnode.dom['inputconsecutivo'].value = corteModelo.generarSecuencial(event.target.value);
                        vnode.dom['inputcortedescripcion'].focus();
                    },
                    oninput: function(event) {
                        if (event.target.value.length > 1) {
                            event.target.value = event.target.value.slice(0, 1);
                        }
                    },
                })
            ]),
            m("td.tx-12", {style: {'width': '15%', 'padding': '8px 3px'}}, [
                m("input.form-control[id='inputconsecutivo'][type='text'][form='crear-corte']", { 
                    disabled: true, 
                })
            ]),            
            m("td.tx-12", {style: {'width': '50%'}}, [
                m("textarea.form-control[id='inputcortedescripcion'][form='crear-corte'][placeholder='Descripción del Corte'][title='Descripción del Corte']", {
                    style: "height: 38px",
                    rows: 4,
                })
            ]),
            m("td.tx-12", {style: {'width': '20%', 'padding': '0'}}, [
                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][form='crear-corte']", {
                    onclick: function() { 
                        vnode.dom['btnnuevocorte'].disabled = false;
                        if (vnode.dom['inputletra'].value.length === 0) {
                            corteModelo.error = "El campo Letra es Requerido";
                            alert(corteModelo.error);
                            vnode.dom['inputletra'].focus();
                        } else if (vnode.dom['inputcortedescripcion'].value.length === 0) {
                            corteModelo.error = "El campo Descripción es Requerido";
                            alert(corteModelo.error);
                            vnode.dom['inputcortedescripcion'].focus();
                        } else {
                            let corte = {
                                id: corteId,
                                informe_id: 0,
                                codigocorte: informeModelo.secuencialInforme + "-" + vnode.dom['inputletra'].value.toUpperCase() + vnode.dom['inputconsecutivo'].value,
                                letra: vnode.dom['inputletra'].value.toUpperCase(), 
                                consecutivo: vnode.dom['inputconsecutivo'].value,                                
                                descripcion: vnode.dom['inputcortedescripcion'].value,
                            }
                            corteModelo.listado.push(corte);
                            corteId += 1;
                            m.mount(document.querySelector("#gestion-cortes"), null);
                        }},
                        style: {'margin': '15px 5px 0 5px', "width": "47%", 'padding': '5px'}
                }, [
                    m("i.fas.fa-save.mg-r-5", )
                ], "Guardar"),
                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][form='crear-corte']", {
                    onclick: function() { 
                        vnode.dom['btnnuevocorte'].disabled = false;
                        m.mount(document.querySelector("#gestion-cortes"), null);
                    },
                    style: {'margin': '15px 0 0 0', "width": "47%", 'padding': '5px'}
                }, [
                    m("i.fas.fa-save.mg-r-5", )
                ], "Cancelar"),                
            ]),
        ]
    }
}

export default crearCorte;