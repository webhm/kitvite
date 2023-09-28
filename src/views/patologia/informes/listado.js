import m from 'mithril';
import informeModel from './models/informeModel';
import editarInforme from './editarInforme';
import habilitarInforme from './habilitarInforme';

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
                        m("th.tx-12.wd-10p", {scope: "row"}, informe.tipoinforme.descripcion),
                        m("th.tx-12.wd-10p", {scope: "row"}, informe.codigoinforme),
                        m("th.tx-12.wd-10p", {scope: "row"}, new Date(informe.fechadocumento).toLocaleDateString('en-GB')),
                        m("th.tx-12.wd-30p", {scope: "row"}, [
                            informe.muestrasAsociadas.map(function(muestra) {
                                return m("p", {style: {"margin-bottom": "0"}}, muestra.id + '-' + muestra.descripcion)
                            })
                        ]),
                        m("th.tx-12.wd-5p", {
                            scope: "row", 
                            title: informe.estadopedido.descripcion
                        }, informe.estadopedido.siglas),
                        m("td.tx-12.wd-35p", {scope: "row"}, [
                            informe.estadopedido.siglas === "A" ? 
                                m("div.mg-0.mg-t-10.text-left.float-left",{"style": { "cursor": "default" },}, [
                                    m("span.mg-r-10.mg-l-20.tx-semibold", 
                                     "Finalizado" ),
                                ])
                            :                                 
                                m("div.mg-0.mg-t-5.text-left.float-left", [
                                    m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", { 
                                        onclick: () => {
                                            //informeModelo.loading = true;
                                            m.mount(document.querySelector("#gestionpatologia"), {
                                                view: () => {
                                                    return m(editarInforme, {
                                                        "informeId": informe.id,
                                                        "informeModelo": informeModelo
                                                    })
                                                }
                                            });
                                        }
                                    }, [m("i.fas.fa-edit.mg-r-5")],  "Editar"),
                                ]),
                            m("div.mg-0.mg-t-5.text-left.float-left", [
                                informe.estadopedido.siglas === "A" ? 
                                    m("button#btnfinalizarinforme.btn.btn-xs.btn-outline-info.mg-l-2.tx-semibold[type='button']", { 
                                        onclick: function() { 
                                            m.mount(document.querySelector("#divhabilitaInforme"), {
                                                view: () => {
                                                    return m(habilitarInforme, {"informe": informe})
                                                }
                                            });                                            
                                        }
                                    }, [
                                        m("i.fas.mg-r-5", )], "Habilitar" 
                                    ) 
                                    : 
                                    m("button#btnfinalizarinforme.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", { 
                                        onclick: function(){
                                            informeModelo.finalizar(informe.id);                                            
                                        }
                                    }, [
                                        m("i.fas.mg-r-5", )], "Finalizar"
                                    ),
                            ]),
                            m("div.mg-0.mg-t-5.text-left.float-left", [
                                m(m.route.Link, {
                                    href: "http://172.16.1.122:8080/jasperserver/flow.html?_flowId=viewReportFlow&_flowId=viewReportFlow&ParentFolderUri=%2Freports&reportUnit=%2Freports%2FInformeAnatomico&standAlone=true&output=pdf&decorate=no&j_username=jasperadmin&j_password=jasperadmin&InformeId=" + informe.id,
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