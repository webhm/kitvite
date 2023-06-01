import firmaModel from './models/firmaModel';

let firmaModelo = firmaModel;

const listado = {
    oninit: (vnode) => {
        if (vnode.attrs.firma !== undefined) {
            firmaModelo = vnode.attrs.firma;
        }  
    }, 
    view: (vnode) => {
        return [
            firmaModelo.listado.map(function(firma) {         
                return [
                    m("tr#" + firma.CD_PRESTADOR, [
                        m("th.tx-12.cedulamedico", {style: {'width': '20%'}}, firma.CD_PRESTADOR),
                        m("td.tx-12.nombremedico", {style: {'width': '60%'}}, firma.NM_PRESTADOR),
                        m("td.tx-12.firmamedico",  {style: {'width': '20%'}}, 
                            m("img", { src: "/assets/dashforge/img/firmas/firma1.jpg", width: '100', height: '40' })),
                    ]),
                ]
            }),
        ]
    }
}

export default listado;