import muestraModel from './models/muestraModel';
import muestraValida from './muestraValida';

let muestraModelo = muestraModel;
let muestra = null;

const editarMuestra = {
    oninit: (vnode) => {
        if (vnode.attrs.muestra !== undefined) {
            muestra = vnode.attrs.muestra;
        } 
    },  
    oncreate: (vnode) => {
        if (muestra && muestra.valida === "0") {
            m.mount(document.querySelector("#observacionesnovalida"), {
                view: (vnode) => {
                    return m("textarea.form-control[id='inputobservacionesnovalida'][placeholder='Observaciones'][title='Observaciones']", {
                        style: "min-height: 100px",
                        rows: 4,
                        value: muestra.observacionesmuestranovalida
                    })
                }
            });
        } else {
            m.mount(document.querySelector("#observacionesnovalida"), null)  
        }
    },       
    view: (vnode) => {
        return m("form#editar-muestra", [
            m("table.table", [
                m("tr", [
                    m("th.tx-12", "ID"),
                    m("td.tx-12", [
                        m("input.form-control[id='inputmuestraid'][type='text']", { 
                            disabled: true, 
                            value: muestra.id
                        }),
                    ]),
                ]),
                m("tr.muestradescripcion", [
                    m("th.tx-12", "Descripción"),
                    m("td.tx-12", [
                        m("textarea.form-control[id='inputmuestradescripcion'][placeholder='Descripción'][title='Descripción']", {
                            style: "min-height: 100px",
                            rows: 4,
                            value: muestra.descripcion
                        })
                    ]),
                ]),                                                                                                  
                m("tr", [  
                    m(muestraValida, {muestra: muestra}),                  
                    m("td.tx-12", [
                        m('div#observacionesnovalida'), 
                        m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            onclick: function() {
                                if (vnode.dom['inputmuestradescripcion'].value.length === 0) {
                                    muestraModelo.error = "El campo Descripción es Requerido";
                                    alert(muestraModelo.error);
                                    vnode.dom['inputmuestradescripcion'].focus();
                                } else if (!vnode.dom['checkvalida'].checked && vnode.dom['inputobservacionesnovalida'].value.length === 0) {
                                    muestraModelo.error = "El campo Observaciones es Requerido, cuando la muestra no es válida";
                                    alert(muestraModelo.error);
                                    vnode.dom['inputobservacionesnovalida'].focus();
                                } else {
                                    let muestra = {
                                        id: parseInt(vnode.dom['inputmuestraid'].value),
                                        nopedidomv: parseInt(muestraModel.numeroPedido),
                                        noatencionmv: parseInt(muestraModel.numeroAtencion),
                                        nohistoriaclinicamv: parseInt(muestraModel.numeroHistoriaClinica),
                                        descripcion: vnode.dom['inputmuestradescripcion'].value,
                                        valida:  vnode.dom['checkvalida'].checked ? 1 : 0,
                                        observacionesmuestranovalida: vnode.dom['checkvalida'].checked ? null : vnode.dom['inputobservacionesnovalida'].value
                                    }
                                    muestraModelo.actualizar(muestra);
                                    m.mount(document.querySelector("#gestion-muestras"), null);
                                    m.mount(document.querySelector("#cerrar-gestion-muestras"), null);                                    
                                    muestraModelo.listado = [];
                                    muestraModelo.loading = true;
                                }
                            },
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

export default editarMuestra;