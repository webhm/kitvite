const cerrarFormulario = {
    view: () => {
        return [
            m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0", {
                style: { 'width': '50%', 'float': 'right'}
            },
            m("small.pd-2.tx-20",
            m("i.fas.fa-times-circle.pd-2", {
                "style": { "cursor": "pointer" },
                title: "Cerrar",
                onclick: () => {
                    m.mount(document.querySelector("#gestion-formulario"), null);
                    m.mount(document.querySelector("#cerrar-formulario"), null);
                }})
            )
        ),
    ]}
}

export default cerrarFormulario;