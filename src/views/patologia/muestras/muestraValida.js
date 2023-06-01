let valida = true;
let muestra = null;

const muestraValida = {
    oninit: (vnode) => {
        if (vnode.attrs.muestra !== undefined) {
            muestra = vnode.attrs.muestra;
            valida = muestra.valida === "1" ? true : false;
        } 
    },  
    onbeforeupdate: function (vnode) {
        return false;
    },    
    view: (vnode) => {
        return [
            m("th.tx-12", [                         
                m("div", [
                    m("label[for='checkvalida']", {style: {"margin-right": "6px"}},'Válida'),
                    m("input[type='checkbox'][id='checkvalida']", {
                        checked: valida,
                        onclick: function(ev) {
                            if (!this.checked) {
                                m.mount(document.querySelector("#observacionesnovalida"), {
                                    view: (vnode) => {
                                        return m("textarea.form-control[id='inputobservacionesnovalida'][placeholder='Observaciones'][title='Observaciones']", {
                                            style: "min-height: 100px",
                                            rows: 4,
                                            value: muestra !== null ? muestra.observacionesmuestranovalida : ""
                                        })
                                    }
                                });
                            } else {
                                m.mount(document.querySelector("#observacionesnovalida"), null)  
                            }
                        },
                    }),
                ]),
            ]),
        ]
    }
}

export default muestraValida;