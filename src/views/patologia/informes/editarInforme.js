import BreadCrumb from '../../layout/breadcrumb';
import informeModel from './models/informeModel';
import editarInformeAnatomico from './editarInformeAnatomico';

let informeModelo = informeModel;

const editarInforme = {
    oninit: (vnode) => { 
        if (vnode.attrs.informeModelo !== undefined && vnode.attrs.informeId !== undefined) {
            let listado = vnode.attrs.informeModelo.listado.filter((item) => item.id === parseInt(vnode.attrs.informeId));
            vnode.attrs.informeModelo.listado = listado;
            informeModelo = (vnode.attrs.informeModelo);
        } 
    },
    view: () => {
        return [
            m("div.container.mg-l-0.mg-r-0", {
                style: { "max-width": "100%" }
            }, [
                m(BreadCrumb, [{path: "/", label: "metroplus"}, 
                                {path: "/patologia", label: "patologia"},
                                {path: "", label: "nuevo informe"}]),
                m("h1.df-title.mg-t-20.mg-b-10", "Información del Paciente"),
                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                        m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                            m("small.pd-2.tx-20",
                                m("i.fas.fa-times-circle.pd-2", {
                                        "style": { "cursor": "pointer" },
                                        title: "Cerrar",
                                        onclick: () => {
                                            window.location.reload();
                                        }, 
                                    }
                                )
                            )),
                    m("form#crear-informe", [
                        m(editarInformeAnatomico, {"informeModelo": informeModelo})
                    ]),
                ]),
            ])
        ]
    }
}

export default editarInforme;