import m from 'mithril';
import Auth from '../../../models/auth';
import App from '../../app';
import informeModelo from './models/informeModel';
import listado from './listado';
import loader from '../utils/loader';

let nombreusuario = null;
let corteModelo = null;
let informe = null;

const habilitarInforme = {
    oninit: (vnode) => {
        App.isAuth();
        nombreusuario = Auth.user.user;
        if (vnode.attrs.informe !== undefined) {
            informe = vnode.attrs.informe;
        } 
        // muestraModelo.getInformesAsoc(muestra.id);
    },  
    oncreate: (vnode) => {
        vnode.dom['inputdescripcion'].focus();
    }, 
    view: (vnode) => {
        return m("form#observ", [
            m("div#cerrar-gestion-muestras",{
                style: { 'width': '50%', 'float': 'right'}
            },[
                m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0", {
                        style: { 'width': '50%', 'float': 'right'}
                    },
                    m("small.pd-2.tx-20",
                        m("i.fas.fa-times-circle.pd-2", {
                            "style": { "cursor": "pointer" },
                            title: "Cerrar",
                            onclick: () => {
                                m.mount(document.querySelector("#divhabilitaInforme"), null); 
                            }}
                        )
                    )
                )
            ] ),
            m("table.table", [
                m("tr.observaciones", [
                    m("th.tx-12", "Habilitar Informe (" + informe.tipoinforme.descripcion + " " + informe.codigoinforme + ") para permitir modificaciones"),
                    m("td.tx-12", {style: {'width': '60%'}}, [
                        m("textarea.form-control[id='inputdescripcion'][form='observ'][placeholder='Observación para habilitar Informe'][title='Observación para habilitar Informe']", {
                            rows: 4
                        })
                    ]),
                    m("td.tx-12", {style: {'width': '10%', 'padding': '0'}}, [
                        m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][form='editar-corte']", {
                            onclick: function() {
                                let descrp = '';
                                descrp = vnode.dom['inputdescripcion'].value;
                                if (descrp == ''){
                                    alert ('Debe ingresar alguna observación (motivo) para habilitar el informe');
                                }else{
                                    m.mount(document.querySelector("#divhabilitaInforme"), null); 
                                    informeModelo.loading = true;
                                    informeModelo.listado = [];
                                    informeModelo.habilitar(informe,nombreusuario, vnode.dom['inputdescripcion'].value); 
                                    
                                    //informeModelo.cargarListado( informeModelo.numeroPedido);
                                    //m.mount(document.querySelector("#divhabilitaInforme"), null); 
                                    //m.mount(document.querySelector("div#loader-informes"), loader);
                                    //m.mount(document.querySelector("table.table#listado-informes"), null); 
                                }
                            },
                                style: {'margin': '15px 5px 0 5px', "width": "90px", 'padding': '5px'}
                        }, [
                            m("i.fas.fa-save.mg-r-5", )
                        ], "Guardar")             
                    ]),
                ])
               
            ]),
        ])
    }
}

export default habilitarInforme;