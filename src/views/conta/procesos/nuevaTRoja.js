import HeadPublic from '../../layout/header-public';
import m from 'mithril';

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
            setTimeout(function () {
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

            FOR005.secs.map(function (_v, _i, _contentData) {

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

        Object.keys(_data.data).map(function (_v, _i, _contentData) {
            FOR005.secs.push(_data.data[_v])
        })

        return FOR005.secs.map(function (_v, _i, _contentData) {




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

        return Formulario.data.map(function (_v, _i, _contentData) {
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
                "Authorization": localStorage.accessToken,
            },
        })
            .then(function (result) {
                if (result.length !== 0) {
                    Formulario.data = result;
                    Formulario.num = 0;

                } else {
                    Formulario.error = "El documento solicitado no esta disponible.";
                }

            })
            .catch(function (e) {
                setTimeout(function () { Formulario.fetch(); }, 5000);

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
                numeroHistoriaClinica: NuevaTRoja.data.CD_PACIENTE + '01'
            },
            headers: {
                "Authorization": localStorage.accessToken,
            },
        })
            .then(function (result) {



                if (result.status) {
                    Evoluciones.data = result.data;
                    Formulario.adm = Evoluciones.data[0].ADM;
                    Formulario.nhc = Evoluciones.data[0].NHCL;
                    Formulario.fetch();
                } else {
                    Evoluciones.error = result.message;
                }

            })
            .catch(function (e) {
                setTimeout(function () { Evoluciones.fetch(); }, 5000);

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

        if (NuevaTRoja.examenes.length !== 0) {
            return NuevaTRoja.examenes.map(function (_val, _i, _contentData) {
                return [
                    m('.tx-14.tx-semibold.d-inline', _val.EXAMEN),
                    (_val.OBS_EXAMEN !== null ? [
                        m('br'),
                        m('.d-inline', 'Observaciones:'),
                        m('br'),
                        m('.d-inline', _val.OBS_EXAMEN),
                        m('br'),
                        m('br'),
                    ] : ''),
                ]
            })
        }

    }
}

const DestinoFinal = {
    view: (_data) => {
        if (_data.attrs.destino_final == 'ALMACENAR') {
            return m("input", {
                "class": "form-control tx-semibold tx-15",
                "type": "text",
                "placeholder": "Destino Final",
                oninput: (e) => {
                    NuevaTRoja.data.destino_final = e.target.value;

                }
            })
        } else {
            return m('select.tx-semibold', {
                onchange: (e) => {
                    NuevaTRoja.data.destino_final = e.target.value;
                },
                class: "custom-select"
            }, m('option', 'Seleccione...'), ['FINANZAS', 'SISTEMAS', 'MANTENIMIENTO', 'INGENIERIA CLINICA'].map(x =>
                m('option', x)
            ))
        }
    }

};



const NuevaTRoja = {
    data: [],
    activos: [],
    examenes: [],
    error: '',
    numeroNuevaTRoja: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    autorizado: false,
    oninit: () => {
        NuevaTRoja.fetch();
        moment.lang("es", {
            months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
                "_"
            ),
            monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
                "_"
            ),
            weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split(
                "_"
            ),
            weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
            weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
        });
    },
    fetch: () => {
        NuevaTRoja.activos = [];
        NuevaTRoja.loader = true;
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                if (result.status) {
                    NuevaTRoja.loader = false;
                    NuevaTRoja.activos = result.data;
                } else {
                    NuevaTRoja.error = result.message;
                }

            })
            .catch(function (e) {
                NuevaTRoja.fetch();
            })

    },
    sendDataTR: () => {

        NuevaTRoja.loader = true;

        console.log('dd => ', NuevaTRoja.data)

        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr/nueva",
            body: {
                accion_sugerida: NuevaTRoja.data.accion_sugerida,
                categoria: NuevaTRoja.data.categoria,
                marca: NuevaTRoja.data.marca,
                modelo: NuevaTRoja.data.modelo,
                motivo_baja: NuevaTRoja.data.motivo_baja,
                nombre: NuevaTRoja.data.nombre,
                serie: NuevaTRoja.data.serie,
                sub_categoria: NuevaTRoja.data.sub_categoria,
                usuario: NuevaTRoja.data.usuario,
                destino_final: NuevaTRoja.data.destino_final,

            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                if (result.status) {
                    alert('Proceso realizado con éxito');
                    window.location.reload();
                } else {
                    NuevaTRoja.error = result.message;
                }
            })
            .catch(function (e) {
                NuevaTRoja.fetch();
            })

    },

    view: (_data) => {

        return [
            m(HeadPublic),
            m("div.content.content-components", {},
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [

                    m("h1.df-title.mg-b-10",
                        "Nueva Tarjeta Roja: "
                    ),


                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [



                            (NuevaTRoja.activos.length !== 0 ? [
                                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", {


                                }, [
                                    m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [


                                        m("span.pd-6.wd-100p.wd-md-20p", {
                                            class: "badge badge-danger mg-b-2 mg-r-2",
                                        }, [
                                            m("i.fas.fa-file-alt.mg-r-5"),
                                        ], "FOR TARJETA ROJA"),


                                        m('div.table-responsive', [
                                            m("table.table.table-bordered.table-sm.tx-12", [
                                                m("thead",

                                                    m("tr.bg-litecoin.op-9.tx-white", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "DATOS SOLICITUD:"
                                                        ),

                                                    ])
                                                ),
                                                m("tbody", [
                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Fecha de Solicitud:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },

                                                            m("input", { value: moment().format("dddd, DD-MM-Y"), "class": "form-control tx-semibold tx-15 tx-danger", "type": "text" })


                                                        ),

                                                    ]),

                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Categoría:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                            m('select.tx-semibold', {
                                                                onchange: (e) => {
                                                                    NuevaTRoja.data.categoria = e.target.value;
                                                                },
                                                                class: "custom-select"
                                                            }, m('option', 'Seleccione...'), NuevaTRoja.activos.activos.map(x =>
                                                                m('option', {
                                                                    value: x.cod_class
                                                                }, x.class)
                                                            ))
                                                        )


                                                    ]),
                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Sub. Categoría:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                            m('select.tx-semibold', {
                                                                onchange: (e) => {
                                                                    NuevaTRoja.data.sub_categoria = e.target.value;
                                                                },
                                                                class: "custom-select"
                                                            }, m('option', 'Seleccione...'), NuevaTRoja.activos.subActivos.map(x =>
                                                                (x.cod_class == NuevaTRoja.data.categoria ? [m('option', x.class)] : [])
                                                            ))
                                                        )


                                                    ]),


                                                ]),
                                                m("thead",

                                                    m("tr.bg-litecoin.op-9.tx-white", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "DATOS DEL EQUIPO:"
                                                        ),

                                                    ])
                                                ),
                                                m("tbody", [
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='1']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Nombre:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "placeholder": "Nombre",
                                                                oninput: (e) => {
                                                                    NuevaTRoja.data.nombre = e.target.value;
                                                                }
                                                            })
                                                        )
                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='1']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Marca:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "placeholder": "Marca",
                                                                oninput: (e) => {
                                                                    NuevaTRoja.data.marca = e.target.value;
                                                                }
                                                            })

                                                        ),
                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='1']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Modelo:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "placeholder": "Modelo",
                                                                oninput: (e) => {
                                                                    NuevaTRoja.data.modelo = e.target.value;
                                                                }
                                                            })
                                                        )


                                                    ]),

                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='1']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Serie:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "placeholder": "Serie",
                                                                oninput: (e) => {
                                                                    NuevaTRoja.data.serie = e.target.value;
                                                                }
                                                            })

                                                        ),



                                                    ]),

                                                    m("tr.bg-litecoin.op-9.tx-white", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "MOTIVO DE BAJA:"
                                                        )
                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='3']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Motivo de Baja:"
                                                        ),
                                                        m("td[colspan='7']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        }, [
                                                            m('select.tx-semibold', {
                                                                onchange: (e) => {
                                                                    NuevaTRoja.data.motivo_baja = e.target.value;
                                                                },
                                                                class: "custom-select"
                                                            }, m('option', 'Seleccione...'), [
                                                                { label: 'NO SE UTILIZA', value: 'NO_SE_UTILIZA' },
                                                                { label: 'RENOVACIÓN', value: 'RENOVACION' },
                                                                { label: 'RENOVACIÓN EQUIPO DE COMPUTO', value: 'RENOVACION_EQ_COMPUTO' },
                                                                { label: 'DAÑO', value: 'DAÑO' },
                                                                { label: 'PERDIDA', value: 'PERDIDA' }
                                                            ].map(x =>
                                                                m('option', {
                                                                    value: x.value
                                                                }, x.label)
                                                            ))
                                                        ]),


                                                    ]),

                                                    m("tr.bg-litecoin.op-9.tx-white.", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "ACCIÓN SUGERIDA:"
                                                        ),

                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='3']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Acción Sugerida:"
                                                        ),
                                                        m("td[colspan='7']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        }, [
                                                            m('select.tx-semibold', {
                                                                onchange: (e) => {
                                                                    NuevaTRoja.data.accion_sugerida = e.target.value;
                                                                },
                                                                class: "custom-select"
                                                            }, m('option', 'Seleccione...'), NuevaTRoja.activos.motivos.map(x =>
                                                            (x.motivo_baja == NuevaTRoja.data.motivo_baja ? [m('option', {
                                                                value: x.accion_sugerida
                                                            }, x.accion_sugerida.replace('_', ' '))] : [])
                                                            ))
                                                        ]),


                                                    ]),
                                                    m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "OBSERVACIÓN:"
                                                        ),

                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='3']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Observación:"
                                                        ),
                                                        m("td[colspan='7']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                            m('div.tx-justify', {}, NuevaTRoja.activos.motivos.map(x =>
                                                                (x.motivo_baja == NuevaTRoja.data.motivo_baja && x.accion_sugerida == NuevaTRoja.data.accion_sugerida ? [m('p.tx-15.tx-semibold.tx-danger', x.obs)] : [])
                                                            ))
                                                        ),
                                                    ]),

                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='3']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Destino Final:"
                                                        ),
                                                        m("td[colspan='7']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },

                                                            m('div', {}, NuevaTRoja.activos.motivos.map(x =>
                                                            (x.motivo_baja == NuevaTRoja.data.motivo_baja && x.accion_sugerida == NuevaTRoja.data.accion_sugerida ? [

                                                                m(DestinoFinal, { destino_final: x.destino_final })


                                                            ] : [])
                                                            ))

                                                        ),


                                                    ]),
                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                            "Responsable:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                            style: { "background-color": "#eaeff5" }
                                                        },
                                                            (NuevaTRoja.data.usuario !== undefined ? [
                                                                m("div.input-group", [
                                                                    m("input.form-control[type='text'][disabled='disabled'][placeholder='Usuario Responsable']", {
                                                                        value: NuevaTRoja.data.usuario,
                                                                    }),
                                                                    m("div.input-group-append",
                                                                        m("button.btn.btn-primary[type='button']", {
                                                                            onclick: (e) => {
                                                                                NuevaTRoja.sendDataTR();
                                                                            }
                                                                        },
                                                                            "Enviar"
                                                                        )
                                                                    )
                                                                ])
                                                            ] : [
                                                                m("div",
                                                                    (NuevaTRoja.autorizado ? [
                                                                        m("div.input-group", [
                                                                            m("input.form-control[type='text'][placeholder='Correo Electrónico'][autofocus='true']"),
                                                                            m("input.form-control[type='password'][placeholder='Contraseña']"),
                                                                            m("div.input-group-append",
                                                                                m("button.btn.btn-primary[type='button']", {
                                                                                    onclick: (e) => {
                                                                                        alert('Usuario validado con éxito');
                                                                                        NuevaTRoja.data.usuario = 'CHANG CHAVEZ MARTIN FRANCISCO - ANALISTA PROGRAMADOR ERP-MV SOUL - IMPLEMENTACION ERP MV SOUL (009333000)';
                                                                                    }
                                                                                },
                                                                                    "Validar"
                                                                                )
                                                                            )
                                                                        ])
                                                                    ] : [
                                                                        m("button.btn.btn-xs.btn-block.btn-outline-light[type='button']", {
                                                                            onclick: (e) => {
                                                                                NuevaTRoja.autorizado = true;
                                                                            }
                                                                        },
                                                                            m("i.fas.fa-edit.pd-1.mg-r-2"),
                                                                            "Firma de Responsabilidad"
                                                                        ),
                                                                    ])


                                                                )
                                                            ])






                                                        ),

                                                    ]),
                                                    // INCLUIR AREA DE DEST Y DESTINO FINAL.
                                                    m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "ADJUNTOS:"
                                                        ),

                                                    ]),
                                                    m("tr.d-print-none", [

                                                        m("td[colspan='10']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                            m("ul.nav.nav-tabs[id='myTab'][role='tablist']", [
                                                                m("li.nav-item",
                                                                    m("a.nav-link[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", {
                                                                        style: { "color": "#476ba3" }
                                                                    },
                                                                        m("i.fas.fa-file-alt.pd-1.mg-r-2"),

                                                                        " Adjuntos "
                                                                    )
                                                                ),


                                                            ]),
                                                        ),


                                                    ]),
                                                    m("tr.d-print-none", [

                                                        m("td[colspan='9']", {

                                                        },
                                                            m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                                m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                                                    m(Evoluciones),
                                                                ]),


                                                            ])
                                                        ),


                                                    ]),
                                                    m("tr.d-print-none", [

                                                    ]),

                                                ])
                                            ])
                                        ]),


                                    ])

                                ])

                            ] : [
                                m("div.pd-t-10", [
                                    m("div.placeholder-paragraph.wd-100p", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ])
                            ])


                        ])
                    ]),



                ])
            ),

        ];



    }

};


export default NuevaTRoja;