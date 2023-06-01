import muestraModel from './models/muestraModel';

let muestraModelo = muestraModel;
let muestra = null;

const asociarExamenes = {
    oninit: (vnode) => {
        if (vnode.attrs.muestra !== undefined) {
            muestra = vnode.attrs.muestra;
        } 
    },
    onbeforeupdate: function (vnode) {
        return false;
    },    
    view: (vnode) => {
        return m("form#asociar-muestra", [
            m("table.table", [
                m("tr.thead-light", [
                    m("th.tx-12.tx-semibold", "ASOCIAR EXÁMENES"),
                    m("th.tx-12.tx-semibold", [
                        m("span.tx-12.pd-r-10", 'MUESTRA:  ' +  muestra.id),
                        m("span.tx-12.pd-l-10.pd-r-10.mg-l-5", 'DESCRIPCION:  ' +  muestra.descripcion),
                        m("span.tx-12.pd-l-10.pd-r-10.mg-l-5", 'VALIDA:  ' + (muestra.valida === "1" ? 'Sí' : 'NO')),
                    ]),
                ]),                                                
                m("tr", [
                    m("th.tx-12", {scope: "col"}, "EXÁMENES"),
                    m("td", [
                        muestraModelo.examenes.map(function(examen) {
                            return [
                                m("div", [
                                    m("input[type='checkbox']", {
                                        checked: muestra.examenesAsociados.find(function(asociacion) {
                                            return (asociacion.codigoexamenmv === examen.CD_TIP_PRESC); 
                                        }) !== undefined,
                                        style: {"float": "left", "margin-top": "2px"},
                                        id: examen.CD_TIP_PRESC,
                                        onclick: function() {
                                            if (this.checked) {
                                                let examenAsociado = {
                                                    idmuestra: parseInt(muestra.id),
                                                    codigoexamenmv: examen.CD_TIP_PRESC,
                                                    nopedidomv: parseInt(muestraModel.numeroPedido),
                                                    descripcion: examen.EXAMEN,
                                                    observaciones: examen.OBS_EXAMEN,
                                                    status: examen.STATUS,
                                                    tieneinforme:  0,
                                                }                                                                                                    
                                                muestraModelo.asociarExamen(examenAsociado);
                                                muestraModelo.listado = [];
                                                muestraModelo.loading = true;
                                            } else {
                                                let idAsociacion = muestra.examenesAsociados.findIndex(function(asociacion) {
                                                    return asociacion.codigoexamenmv === examen.CD_TIP_PRESC
                                                });
                                                if (idAsociacion >= 0) {
                                                    {
                                                        muestraModelo.eliminarExamenasociado(muestra.examenesAsociados[idAsociacion].id);
                                                        muestraModelo.listado = [];
                                                        muestraModelo.loading = true;
                                                    }
                                                }
                                            }
                                        }}
                                    ),
                                    m("label.tx-semibold.tx-12", {
                                        style: {"margin": "0 10px"},
                                    },
                                    examen.EXAMEN),
                                ]),
                            ]
                        }),
                    ]),       
                ]),
            ]),
        ])
    }
}

export default asociarExamenes;