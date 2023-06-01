import muestraModel from './models/muestraModel';
import muestraValida from './muestraValida';

let muestraModelo = muestraModel;

const crearMuestra = {
    oninit: () => { 
        muestraModelo.generarSecuencial();
    },
    view: (vnode) => {
        return m("form#crear-muestra", [
            m("table.table", [
                m("tr", [
                    m("th.tx-12", "ID MUESTRA"),
                    m("td.tx-12", [
                        m("input.form-control[id='inputmuestraid'][type='text']", { 
                            disabled: true, 
                            value: muestraModelo.secuencialMuestra,
                        }),
                    ]),
                ]),
                m("tr.muestradescripcion", [
                    m("th.tx-12", "Descripción de la Muestra"),
                    m("td.tx-12", [
                        m("textarea.form-control[id='inputmuestradescripcion'][placeholder='Descripción de la Muestra'][title='Descripción de la Muestra']", {
                            style: "min-height: 100px",
                            rows: 4,
                        })
                    ]),
                ]),                               
                m("tr", [
                    m(muestraValida),
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
                                        nopedidomv: parseInt(muestraModel.numeroPedido),
                                        noatencionmv: parseInt(muestraModel.numeroAtencion),
                                        nohistoriaclinicamv: parseInt(muestraModel.numeroHistoriaClinica), 
                                        idestadopedido: 1,                                       
                                        descripcion: vnode.dom['inputmuestradescripcion'].value,
                                        valida: vnode.dom['checkvalida'].checked ? 1 : 0,
                                        observacionesmuestranovalida: vnode.dom['checkvalida'].checked ? null : vnode.dom['inputobservacionesnovalida'].value
                                    }
                                    muestraModelo.guardar(muestra);
                                    m.mount(document.querySelector("#gestion-muestras"), null);
                                    m.mount(document.querySelector("#cerrar-gestion-muestras"), null);
                                    muestraModelo.listado = [];
                                    muestraModelo.loading = true;
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

export default crearMuestra;