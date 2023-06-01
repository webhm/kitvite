import informeModel from './models/informeModel';
import editarInforme from './editarInforme';

let informeModelo = informeModel;

const listado = {
    oninit: (vnode) => {
        if (vnode.attrs.informe !== undefined) {
            informeModelo = vnode.attrs.informe;
        }  
    }, 
    view: (vnode) => {
        return [
            informeModelo.listado.map(function(informe) {
                return [
                    m("tr#" +  informe.id, [
                        m("th.tx-12.wd-10p", {scope: "row"}, informe.codigoinforme),
                        m("th.tx-12.wd-55p", {scope: "row"}, [
                            informe.muestrasAsociadas.map(function(muestra) {
                                return m("p", {style: {"margin-bottom": "0"}}, muestra.id + '-' + muestra.descripcion)
                            })
                        ]),
                        m("th.tx-12.wd-10p", {scope: "row"}, informe.estadopedido.siglas),
                        m("td.tx-12.wd-25p", {scope: "col"}, [
                            m("div.mg-0.mg-t-5.text-left.float-left", [
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                    onclick: () => {
                                        m.mount(document.querySelector("#gestionpatologia"), {
                                            view: () => {
                                                return m(editarInforme, {
                                                    "informeId": informe.id,
                                                    "informeModelo": informeModelo
                                                })
                                             }
                                        });
                                    }
                                }, [m("i.fas.fa-edit.mg-r-5")], "Editar"),
                            ]),
                            m("div.mg-0.mg-t-5.text-left.float-left", [
                                m(m.route.Link, {
                                    href: "http://172.16.1.122:8080/jasperserver/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2Freports&reportUnit=%2Freports%2FInformeAnatomico&standAlone=true&decorate=no&j_username=jasperadmin&j_password=jasperadmin&InformeId=" + informe.id,
                                    class: "btn btn-xs btn-primary mg-l-2 tx-semibold",
                                    target: "_blank"
                                }, [m('i.fas.fa-print.mg-r-2'), "Imprimir"]),
                            ]),   
                        ]),
                    ]),
                ]
            }),
        ]
    }
}

export default listado;