import HeaderPrivate from '../../layout/header-private';
import SidebarPato from '../utils/sidebarPato';
import App from '../../app';
import m, { redraw } from 'mithril';
import PedidoPatologias from './pedidos';
import BreadCrumb from '../../layout/breadcrumb';
import listadoMuestras from '../muestras/listadoMuestras';
import crearMuestra from '../muestras/crearMuestra';
import cerrarGestionMuestra from '../muestras/cerrarGestionMuestra';
import listadoInformes from '../informes/listadoInformes';

const FOR005 = {
    secs: [],
    nombres: "",
    show: false,
    view: () => {

        let evolucion_medica_texto = "";
        let prescripciones_texto = "";
        let urlFor = "";
        let page = 0;

        if (Formulario.num == 0) {
            setTimeout(function() {
                Formulario.num = Formulario.data.length;
                Formulario.parseFetch();
                m.redraw.sync();
            }, 2000);
        }

        return FOR005.secs.length == 0 ? [
            m("div.pd-10.wd-100p",
                m("div.d-inline.tx-secondary.tx-12", {
                    oncreate: (el) => {
                        el.dom.innerHTML = "Procesando " + Formulario.data.length + " formulario(s) encontrado(s)...";
                    },

                }),
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),
        ] : [

            FOR005.secs.map(function(_v, _i, _contentData) {

                if (_v.name == 'prescripciones_texto') {

                    prescripciones_texto = _v.answer;

                }

                if (_v.name == 'evolucion_medica_texto') {

                    evolucion_medica_texto = _v.answer;

                }

                if (_v.name == 'cd_documento_clinico') {

                    urlFor = "http://172.16.253.18/mvpep/api/clinical-documents/" + _v.answer + ".pdf?company=1&department=75";

                }


                if (_v.name == 'Logotipo_archivo') {


                    return [
                        m("div.d-inline.tx-secondary.tx-12", {
                            oncreate: (el) => {
                                el.dom.innerHTML = Formulario.data.length + " formulario(s) encontrado(s).";
                            },

                        }),
                        m("table.table.table-bordered.wd-100p", {
                            "style": {
                                "zoom": Formulario.zoom,
                            }
                        }, [
                            m("thead", [
                                m("tr",
                                    m("th[colspan='12'][scope='col']", [
                                        m("i.tx-light.fas.fa-file-alt.mg-r-2."),
                                        m("div.p-0", " SNS - MSP / HCU-form.005 / 2008 "),


                                    ])
                                ),
                                m("tr", [
                                    m("th[colspan='10'][scope='col']",
                                        m("div.m-0.p-0",
                                            m("img", {
                                                width: "100rem",
                                                src: "data:image/png;base64," + _v.answer
                                            })
                                        )
                                    ),
                                    m("th.tx-right[colspan='2'][scope='col']",
                                        m("a.tx-right.tx-semibold", {
                                                href: urlFor,
                                                target: "_blank"
                                            },
                                            m('i.fas.fa-print.mg-r-2'),
                                            " Imprirmir  "

                                        )

                                    )

                                ])
                            ]),
                            m("tbody", [
                                m("tr", [
                                    m("th[colspan='3'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.tx-bold.text-center.",
                                            "ESTABLECIMIENTO"
                                        )
                                    ),
                                    m("th[colspan='3'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.tx-bold.text-center.",
                                            "NOMBRE"
                                        )
                                    ),
                                    m("th[colspan='3'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.tx-bold.text-center.",
                                            "APELLIDO"
                                        )
                                    ),
                                    m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.tx-bold.text-center.",
                                            "SEXO (M-F)"
                                        )
                                    ),
                                    m("th[colspan='1][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.tx-bold.text-center.",
                                            "NHCL."
                                        )
                                    ),
                                    m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.tx-bold.text-center.",
                                            "ADM."
                                        )
                                    )
                                ]),
                                m("tr", [
                                    m("th.text-center[colspan='3'][scope='row']",
                                        m("div.m-0.p-0.text-center",
                                            "HOSPITAL METROPOLITANO"
                                        )
                                    ),
                                    m("td.text-center[colspan='3']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.nombres
                                        )
                                    ),
                                    m("td.text-center[colspan='3']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.apellidos_paciente
                                        )
                                    ),
                                    m("td.text-center[colspan='1']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.sexo
                                        )
                                    ),
                                    m("td.text-center[colspan='1']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.nhcl
                                        )
                                    ),
                                    m("td.text-center[colspan='1']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.numero_admision
                                        )
                                    )
                                ]),
                                m("tr", [
                                    m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.",
                                            "EDAD"
                                        )
                                    ),
                                    m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.",
                                            "IDENTIFICACION"
                                        )
                                    ),
                                    m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.",
                                            "FECHA ADMISION"
                                        )
                                    ),
                                    m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.",
                                            "FECHA ALTA"
                                        )
                                    ),
                                    m("th[colspan='4'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.",
                                            "UBICACION"
                                        )
                                    ),
                                    m("th[colspan='4'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.",
                                            "MEDICO TRATANTE"
                                        )
                                    )
                                ]),
                                m("tr", [
                                    m("td.text-center[colspan='1'][scope='row']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.edad || FOR005.edad_paciente
                                        )
                                    ),
                                    m("td.text-center[colspan='1']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.identificacion
                                        )
                                    ),
                                    m("td.text-center[colspan='1']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.fecha_admision
                                        )
                                    ),
                                    m("td.text-center[colspan='1']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.fecha_admision
                                        )
                                    ),
                                    m("td.text-center[colspan='4']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.ubicacion
                                        )
                                    ),
                                    m("td.text-center[colspan='4']",
                                        m("div.m-0.p-0.text-center",
                                            FOR005.medico_tratante
                                        )
                                    )
                                ]),
                                m("tr", [
                                    m("th[colspan='6'][scope='row']", { "style": { "padding": "0", "background-color": "#eef9c8" } },
                                        m("div.m-0.p-0.tx-bold.text-center.",
                                            "1.- EVOLUCIÓN"
                                        )
                                    ),
                                    m("th[colspan='5'][scope='row']", { "style": { "padding": "0", "background-color": "#eef9c8" } },
                                        m("div.m-0.p-0.tx-bold.text-center.",
                                            "2.- PRESCRIPCIONES"
                                        )
                                    ),
                                    m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#eef9c8" } },
                                        m("div.m-0.p-0.tx-bold.text-center.", [
                                                "FIRMAR AL PIE DE",
                                                m("br"),
                                                "CADA PRESCRIPCIÓN"
                                            ]

                                        )
                                    ),

                                ]),
                                m("tr", [
                                    m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.", [
                                            "FECHA",
                                            m("br"),
                                            "día/mes/año"
                                        ])
                                    ),
                                    m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.",
                                            "HORA"
                                        )
                                    ),
                                    m("th[colspan='4'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.",
                                            "NOTAS DE EVOLUCIÓN"
                                        )
                                    ),
                                    m("th[colspan='4'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.", [
                                                "FARMACOTERAPIA E INDICACIONES",
                                                m("br"),
                                                "(PARA ENFERMERÍA Y OTRO PERSONAL)"

                                            ]

                                        )
                                    ),
                                    m("th[colspan='2'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                        m("div.m-0.p-0.tx-bold.text-center.", [
                                                "ADMINISTR.",
                                                m("br"),
                                                "FÁRMACOS INSUMOS"

                                            ]

                                        )
                                    ),

                                ]),
                                m("tr", [
                                    m("td[colspan='6'][scope='row']", { "style": { "padding": "0", "width": "50%" } },
                                        m("div.m-0.p-2.tx-bold.text-justify",
                                            (evolucion_medica_texto !== null && evolucion_medica_texto.length !== 0) ? m.trust(evolucion_medica_texto.replace(/(\r\n|\r|\n)/g, "<br/>")) : ""


                                        )
                                    ),
                                    m("td[colspan='6'][scope='row']", { "style": { "padding": "0", "width": "50%" } },
                                        m("div.m-0.p-2.text-justify",
                                            (prescripciones_texto !== null && prescripciones_texto.length !== 0) ? m.trust(prescripciones_texto.replace(/(\r\n|\r|\n)/g, "<br/>")) : ""

                                        )
                                    ),

                                ]),

                            ])
                        ])
                    ]

                }


            })
        ]
    }
};

const Formulario = {
    zoom: 0,
    adm: 1,
    nhc: 1,
    num: 0,
    data: [],
    error: "",

    parseDoc: (_data) => {

        Object.keys(_data.data).map(function(_v, _i, _contentData) {
            FOR005.secs.push(_data.data[_v])
        })

        return FOR005.secs.map(function(_v, _i, _contentData) {




            if (_v.name == 'nombres') {



                FOR005.nombres = _v.answer;

            }


            if (_v.name == 'apellidos_paciente') {



                FOR005.apellidos_paciente = _v.answer;

            }

            if (_v.name == 'sexo de paciente') {

                FOR005.sexo = _v.answer;

            }

            if (_v.name == 'nhcl') {

                FOR005.nhcl = _v.answer;

            }

            if (_v.name == 'numero_admision') {

                FOR005.numero_admision = _v.answer;

            }

            if (_v.name == 'edad') {

                FOR005.edad = _v.answer;

            }

            if (_v.name == 'edad_paciente') {

                FOR005.edad_paciente = _v.answer;

            }

            if (_v.name == 'identificacion_paciente') {

                FOR005.identificacion = _v.answer;

            }

            if (_v.name == 'fecha_admision') {

                FOR005.fecha_admision = _v.answer;

            }

            if (_v.name == 'ubicacion_atencion') {

                FOR005.ubicacion = _v.answer;

            }


            if (_v.name == 'fecha_alta') {

                FOR005.fecha_alta = (_v.answer == null) ? '' : _v.answer;

            }

            if (_v.name == 'medico_tratante') {

                FOR005.medico_tratante = _v.answer;

            }





        })

    },

    parseFetch: () => {
        FOR005.secs = [];
        return Formulario.data.map(function(_v, _i, _contentData) {
            Formulario.parseDoc(Formulario.data[_i])
        })
    },

    fetch: () => {
        Formulario.data = [];
        Formulario.error = "";
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/formulario?nhcl=" + Formulario.nhc + "&adm=" + Formulario.adm,

                headers: {
                    "Authorization": localStorage.aesComplementarioessToken,
                },
            })
            .then(function(result) {
                if (result.length !== 0) {
                    Formulario.data = result;
                    Formulario.num = 0;

                } else {
                    Formulario.error = "El documento solicitado no esta disponible.";
                }

            })
            .catch(function(e) {
                setTimeout(function() { Formulario.fetch(); }, 5000);

            })
    },

    view: () => {
        return Formulario.error ? [
            m(".alert.alert-danger[role='alert']",
                Formulario.error
            )
        ] : (Formulario.data.length !== 0) ? [
            m(FOR005)
        ] : [
            m("div.d-inline.tx-secondary.tx-12", {
                oncreate: (el) => {
                    el.dom.innerHTML = "Buscando información...";
                },
            }),
            m("div.pd-10.wd-100p",
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),
        ]


    },
}

const Evoluciones = {
    data: [],
    detalle: [],
    error: "",
    showFor: "",
    fetch: () => {
        Evoluciones.data = [];
        Evoluciones.error = "";
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/ev-paciente",
                body: {
                    numeroHistoriaClinica: PedidoPatologia.data.CD_PACIENTE + '01'
                },
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {



                if (result.status) {
                    Evoluciones.data = result.data;
                    Formulario.adm = Evoluciones.data[0].ADM;
                    Formulario.nhc = Evoluciones.data[0].NHCL;
                    Formulario.fetch();
                } else {
                    Evoluciones.error = result.message;
                }

            })
            .catch(function(e) {
                setTimeout(function() { Evoluciones.fetch(); }, 5000);

            })
    },

    view: () => {


        return Evoluciones.error ? [
            m(".alert.alert-danger[role='alert']",
                Evoluciones.error
            )
        ] : Evoluciones.data.length !== 0 ? [

            m(Formulario)
        ] : [

            m("div.pd-10.wd-100p",
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),
        ]


    },
}

const Examenes = {

    view: () => {

        if (PedidoPatologia.examenes.length !== 0) {
            return PedidoPatologia.examenes.map(function(_val, _i, _contentData) {
                return [
                    m('.tx-14.tx-semibold.d-inline', _val.EXAMEN),
                    m('br'),
                    (_val.OBS_EXAMEN !== null ? m('.d-inline', 'Observaciones:') : ''),
                    (_val.OBS_EXAMEN !== null ? m('br') : ''),
                    (_val.OBS_EXAMEN !== null ? m('.d-inline', _val.OBS_EXAMEN) : ''),
                ]
            })
        }

    }
}


const PedidoPatologia = {
    data: [],
    examenes: [],
    error: '',
    numeroPedido: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    medico: '',

    oninit: (_data) => {

        if (_data.attrs.numeroPedido !== undefined) {
            document.title = "Detalle de Pedido N°: " + _data.attrs.numeroPedido + " | " + App.title;

            if (PedidoPatologia.data !== undefined && PedidoPatologia.data.length == 0) {
                PedidoPatologia.numeroPedido = _data.attrs.numeroPedido;
                PedidoPatologia.numeroAtencion = _data.attrs.numeroAtencion;
                PedidoPatologia.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
                PedidoPatologia.medico = _data.attrs.medico
                PedidoPatologia.fetch();
            } else {
                if (PedidoPatologia.numeroPedido !== _data.attrs.numeroPedido) {
                    PedidoPatologia.numeroPedido = _data.attrs.numeroPedido;
                    PedidoPatologia.numeroAtencion = _data.attrs.numeroAtencion;
                    PedidoPatologia.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
                    PedidoPatologia.medico = _data.attrs.medico
                    PedidoPatologia.fetch();
                }
            }
        }
    },

    fetch: () => {
        PedidoPatologia.data = [];
        PedidoPatologia.loader = true;
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/status-pedido-patologia",
                body: {
                    numeroPedido: PedidoPatologia.numeroPedido,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    PedidoPatologia.loader = false;
                    PedidoPatologia.data = result.data;
                    PedidoPatologia.examenes = result.examenes;
                    Evoluciones.fetch();
                } else {
                    PedidoPatologia.error = result.message;
                }

            })
            .catch(function(e) {

            })

    },

    view: (_data) => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
            m(SidebarPato, { oncreate: SidebarPato.setPage(26) }),
            m("div.content.content-components",
                m("div#gestionpatologia.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m(BreadCrumb, [{path: "/", label: "metroplus"}, 
                                   {path: "/patologia", label: "patologia"},
                                   {path: "", label: "pedidos ingresados"}]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Detalle de Pedido N°: " + PedidoPatologia.numeroPedido
                    ),
                    m("div.row.animated.fadeInUp", [
                        m("div.col-12", [
                            m("div.table-loader.wd-100p", {
                                    oncreate: (el) => {
                                        if (PedidoPatologia.loader) {
                                            el.dom.hidden = false;
                                        } else {
                                            el.dom.hidden = true;
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (PedidoPatologia.loader) {
                                            el.dom.hidden = false;
                                        } else {
                                            el.dom.hidden = true;
                                        }
                                    }
                                }, [
                                    m("div.placeholder-paragraph", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ]
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", {
                                oncreate: (el) => {
                                    if (PedidoPatologia.loader) {
                                        el.dom.hidden = true;
                                    } else {
                                        el.dom.hidden = false;
                                    }
                                },
                                onupdate: (el) => {
                                    if (PedidoPatologia.loader) {
                                        el.dom.hidden = true;
                                    } else {
                                        el.dom.hidden = false;
                                    }
                                }
                            }, [
                                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                                    m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                                        m("small.pd-2.tx-20",
                                            m("i.fas.fa-times-circle.pd-2", {
                                                    "style": { "cursor": "pointer" },
                                                    title: "Cerrar",
                                                    onclick: () => {
                                                        if (PedidoPatologias.idFiltro !== undefined && PedidoPatologias.idFiltro > 1) {
                                                            m.route.set('/patologia/pedidos/', {
                                                                idFiltro: PedidoPatologias.idFiltro,
                                                                fechaDesde: PedidoPatologias.fechaDesde,
                                                                fechaHasta: PedidoPatologias.fechaHasta,
                                                            });
                                                        } else {
                                                            m.route.set('/patologia/pedidos/', {
                                                                idFiltro: 1,
                                                            });
                                                        }
                                                    }
                                                }
                                            )
                                        ),
                                    ),
                                    m('div.table-responsive', [
                                        m("table.table.table-bordered.table-sm.tx-12", [
                                            m("thead",
                                                m("tr.bg-litecoin.op-9.tx-white", [
                                                    m("th[scope='col'][colspan='9']",
                                                        "DATOS DEL PEDIDO:"
                                                    ),
                                                ])
                                            ),
                                            m("tbody", [
                                                m("tr", [
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "N° Pedido Patología:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.CD_PRE_MED
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Fecha:"
                                                    ),
                                                    m("td[colspan='2']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.FECHA_PEDIDO + " " + PedidoPatologia.data.HORA_PEDIDO
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Origen:"
                                                    ),
                                                    m("td[colspan='3']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.SECTOR
                                                    ),

                                                ]),

                                                m("tr", [
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Médico Solicitante:"
                                                    ),
                                                    m("td[colspan='4']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.medico,
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Especialidad:"
                                                    ),
                                                    m("td[colspan='3']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.ESPECIALIDAD
                                                    ),
                                                ]),
                                            ]),
                                            m("thead",
                                                m("tr.bg-litecoin.op-9.tx-white", [
                                                    m("th[scope='col'][colspan='9']",
                                                        "DATOS DEL PACIENTE:"
                                                    ),
                                                ])
                                            ),
                                            m("tbody", [
                                                m("tr", [
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Apellidos y Nombres:"
                                                    ),
                                                    m("td[colspan='4']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.NM_PACIENTE
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "EDAD:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.EDAD
                                                    ),

                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "NHC:"
                                                    ),
                                                    m("td[colspan='2']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.CD_PACIENTE
                                                    ),

                                                ]),
                                                m("tr", [
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "N° Atención:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.AT_MV
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Peso:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.PESO
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Altura:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.ALTURA
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Ubicación:"
                                                    ),
                                                    m("td[colspan='4']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        PedidoPatologia.data.SECTOR + " " + PedidoPatologia.data.UBICACION
                                                    ),
                                                ]),
                                                m("tr.bg-litecoin.op-9.tx-white", [
                                                    m("th[scope='col'][colspan='9']",
                                                        "EXÁMENES Y OBSERVACIONES:"
                                                    ),
                                                ]),
                                                m("tr", [
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Exámenes:"
                                                    ),
                                                    m("td[colspan='8']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        m(Examenes)
                                                    ),
                                                ]),
                                                m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                                    m("th[scope='col'][colspan='9']",
                                                        "EVOLUCIONES Y PRESCRIPCIONES:"
                                                    ),
                                                ]),
                                                m("tr.d-print-none", [
                                                    m("td[colspan='9']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                        m("ul.nav.nav-tabs[id='myTab'][role='tablist']", [
                                                            m("li.nav-item",
                                                                m("a.nav-link[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", {
                                                                        style: { "color": "#476ba3" }
                                                                    },
                                                                    m("i.fas.fa-file-alt.pd-1.mg-r-2"),
                                                                    " HOJA 005"
                                                                )
                                                            ),
                                                            m("li.nav-item",
                                                                m("a.nav-link[id='recepcionmuestra-tab'][data-toggle='tab'][href='#recepcionmuestra'][role='tab'][aria-controls='recepcionmuestra'][aria-selected='true']", {
                                                                        style: { "color": "#476ba3" }
                                                                    },
                                                                    m("i.fas.fa-microscope.pd-1.mg-r-2"),
                                                                    " MUESTRAS"
                                                                )
                                                            ),
                                                            m("li.nav-item",
                                                                m("a.nav-link[id='informes-tab'][data-toggle='tab'][href='#informes'][role='tab'][aria-controls='seguimiento'][aria-selected='true']", {
                                                                        style: { "color": "#476ba3" },
                                                                        onclick: () => {
                                                                            listadoInformes.oninit({"attrs": {"numeroPedido": PedidoPatologia.numeroPedido}});
                                                                            m.redraw(listadoInformes);
                                                                        }
                                                                    },
                                                                    m("i.fas.fa-book.pd-1.mg-r-2"),
                                                                    " INFORMES"
                                                                )
                                                            ),
                                                        ]),
                                                    ),
                                                ]),
                                                m("tr.d-print-none", [
                                                    m("td[colspan='9']", {style: {'padding': '0'}},
                                                        m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                            m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                                                m(Evoluciones),
                                                            ]),
                                                            m(".tab-pane.fade[id='recepcionmuestra'][role='tabpanel'][aria-labelledby='recepcionmuestra-tab']", [
                                                                m("div.mg-0.mg-t-10.mg-b-10.text-left", [
                                                                    m("button#btnnuevamuestra.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                        onclick: () => {
                                                                            m.mount(document.querySelector("#gestion-muestras"), crearMuestra);
                                                                            m.mount(document.querySelector("#cerrar-gestion-muestras"), cerrarGestionMuestra);
                                                                        }
                                                                    }, [
                                                                            m("i.fas.mg-r-5", )
                                                                        ], "Nueva Muestra"
                                                                    ),
                                                                    m("div#cerrar-gestion-muestras", {
                                                                        style: { 'width': '50%', 'float': 'right'}
                                                                    }),
                                                                ]),
                                                                m("div#gestion-muestras"),
                                                                m(listadoMuestras, { 
                                                                    "numeroPedido": PedidoPatologia.numeroPedido,
                                                                    "numeroAtencion": PedidoPatologia.numeroAtencion,
                                                                    "numeroHistoriaClinica": PedidoPatologia.numeroHistoriaClinica,
                                                                    "medico": PedidoPatologia.medico
                                                                }),
                                                            ]),
                                                            m(".tab-pane.fade[id='informes'][role='tabpanel'][aria-labelledby='informes-tab']", [                                                            
                                                                m(listadoInformes, { 
                                                                    "numeroPedido": PedidoPatologia.numeroPedido,
                                                                    "numeroAtencion": PedidoPatologia.numeroAtencion,
                                                                    "numeroHistoriaClinica": PedidoPatologia.numeroHistoriaClinica,
                                                                    "medico": PedidoPatologia.medico
                                                                }),                                                            
                                                            ]),
                                                        ])
                                                    ),
                                                ]),
                                                m("tr.d-print-none", []),
                                            ])
                                        ])
                                    ]),
                                ])
                            ])
                        ])
                    ]),
                ])
            ),
        ];
    }
};

export default PedidoPatologia;