import corteModel from './models/corteModel';

let corteModelo = corteModel;
let corte = null;

const editarCorte = {
    oninit: (vnode) => {
        if (vnode.attrs.corte !== undefined) {
            corte = vnode.attrs.corte;
        }       
    },  
    oncreate: (vnode) => {
        // vnode.dom['inputcortedescripcion'].focus();
    }, 
    view: (vnode) => {
        return [
            m("form#editar-corte"),
            m("td.tx-12", {style: {'width': '15%', 'padding': '8px 3px'}}, [
                m("input.form-control[id='inputletra'][type='text'][form='editar-corte']", {
                    disabled: true, 
                    value: corte.letra
                })
            ]),
            m("td.tx-12", {style: {'width': '15%', 'padding': '8px 3px'}}, [
                m("input.form-control[id='inputconsecutivo'][type='text'][form='editar-corte']", { 
                    disabled: true, 
                    value: corte.consecutivo
                })
            ]),            
            m("td.tx-12", {style: {'width': '50%'}}, [
                m("textarea.form-control[id='inputcortedescripcion'][form='editar-corte'][placeholder='Descripción del Corte'][title='Descripción del Corte']", {
                    style: "height: 38px",
                    rows: 4,
                    value: corte.descripcion
                })
            ]),
            m("td.tx-12", {style: {'width': '20%', 'padding': '0'}}, [
                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][form='editar-corte']", {
                    onclick: function() { 
                        if (vnode.dom['inputcortedescripcion'].value.length === 0) {
                            corteModelo.error = "El campo Descripción es Requerido";
                            alert(corteModelo.error);
                            vnode.dom['inputcortedescripcion'].focus();
                        } else {
                            let indice = corteModelo.listado.map(e => e.id).indexOf(corte.id)
                            if ( indice !== -1){
                                corteModelo.listado[indice].descripcion = vnode.dom['inputcortedescripcion'].value;
                            }
                            m.mount(document.querySelector("#gestion-cortes"), null);
                        }},
                        style: {'margin': '15px 5px 0 5px', "width": "47%", 'padding': '5px'}
                }, [
                    m("i.fas.fa-save.mg-r-5", )
                ], "Guardar"),
                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][form='editar-corte']", {
                    onclick: function() { 
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

export default editarCorte;