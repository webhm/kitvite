import HeaderPrivate from '../../layout/header-private';
import SidebarLab from '../../laboratorio/sidebarLab';
import App from '../../app';
import m from 'mithril';
import pedidosIngresados from './flebotomista';



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
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                if (result.length !== 0) {
                    Formulario.data = result;
                    Formulario.num = 0;
                    m.redraw();

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
                    numeroHistoriaClinica: PedidoFlebotomista.data.PedidoExameLab.paciente.codigoPaciente + '01'
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

        if (PedidoFlebotomista.examenes !== 0) {

            if (PedidoFlebotomista.examenes.Exame.length == undefined) {
                PedidoFlebotomista.examenes.Exame = [PedidoFlebotomista.examenes.Exame];
            }


            return PedidoFlebotomista.examenes.Exame.map(function(_val, _i, _contentData) {

                if (_val.operacao == 'E') {

                    return [
                        m('.tx-14.tx-semibold.tx-danger.d-inline', (_i + 1) + ': ' + _val.descExame + ' - ' + _val.codigoExameFaturamento),
                        m('br'),

                    ]

                } else {

                    return [
                        m('.tx-14.tx-semibold.d-inline', (_i + 1) + ': ' + _val.descExame + ' - ' + _val.codigoExameFaturamento),
                        m('br'),

                    ]

                }


            })

        }

    }
}

const StatusPedido = {
    error: "",
    documento: [],
    data: [],
    dataLisa: [],
    dataMuestras: [],
    fetch: () => {
        StatusPedido.error = "";
        StatusPedido.data = [];
        StatusPedido.documento = [];

        m.request({
                method: "POST",
                url: "https://lisa.hospitalmetropolitano.org/v1/status-pedido-lisa",
                body: {
                    numeroPedido: PedidoFlebotomista.numeroPedido,
                    idTimeRecord: PedidoFlebotomista.idTimeRecord
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    PedidoFlebotomista.loader = false;
                    PedidoFlebotomista.data = result.data.pedido;
                    PedidoFlebotomista.examenes = result.data.pedido.PedidoExameLab.listaExame;

                    StatusPedido.documento = result.data;
                    StatusPedido.data = result.data.dataTomaMuestra.examenesToma;
                    StatusPedido.dataMuestras = result.data.dataRecepcion.examenesRecep;
                    StatusPedido.documento.dataTomaMuestra.insumosToma = result.data.dataTomaMuestra.insumosToma;

                    if (StatusPedido.documento.dataTomaMuestra.fechaToma.length !== 0) {
                        TomaMuestras.disabledToma = true;
                        TomaMuestras.checkedAll = true;
                    }


                    Evoluciones.fetch();
                    ControlLISA.fetch();
                    Observaciones.fetch();
                } else {
                    PedidoFlebotomista.error = result.message;
                }

            })
            .catch(function(e) {

            })




    },


};

const Insumos = {
    tuboLila: 0,
    tuboRojo: 0,
    tuboCeleste: 0,
    tuboNegro: 0,
    tuboVerde: 0,
    gsav: 0,
    hemocultivo: 0,
    qtb: 0,

};

const Observaciones = {
    observaciones: "",
    data: [],
    obs: "",
    show: false,
    loadObservaciones: () => {
        // MOMMENT
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

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-observaciones").DataTable({
            data: Observaciones.data,
            dom: 'tp',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Sin Notificaciones",
                sEmptyTable: "Sin Notificaciones",
                sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sInfoPostFix: "",
                sUrl: "",
                sInfoThousands: ",",
                sLoadingRecords: "Cargando...",
                oPaginate: {
                    sFirst: "Primero",
                    sLast: "Último",
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente",
                },
            },
            cache: false,
            order: false,
            destroy: true,

            columns: false,
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return "";
                    },
                    visible: true,
                    width: "100%",
                    aTargets: [0],
                    orderable: false,
                },

            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
            drawCallback: function(settings) {
                settings.aoData.map(function(_v, _i) {
                    m.mount(_v.anCells[0], {
                        view: function() {
                            if (_v._aData.title == 'Nuevo Mensaje') {
                                return m("div.demo-static-toast",
                                    m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", {
                                        "style": { "max-width": "none" }
                                    }, [
                                        m("div.toast-header.bg-primary", [
                                            m("small.tx-white.tx-5.mg-b-0.mg-r-auto",
                                                _v._aData.title
                                            ),
                                            m("small.tx-white",
                                                moment.unix(_v._aData.timestamp).format("HH:mm")
                                            ),
                                        ]),
                                        m("div.toast-body.small",
                                            _v._aData.message
                                        )
                                    ])
                                )
                            } else {
                                return m("div.demo-static-toast",
                                    m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", {
                                        "style": { "max-width": "none" }
                                    }, [
                                        m("div.toast-header.bg-primary", [
                                            m("small.tx-white.tx-5.mg-b-0.mg-r-auto",
                                                _v._aData.title
                                            ),
                                            m("small.tx-white",
                                                moment.unix(_v._aData.timestamp).format("HH:mm")
                                            ),
                                        ]),
                                        m("div.toast-body.small",
                                            _v._aData.message
                                        )
                                    ])
                                )
                            }

                        }
                    });


                })
            },
        });


        return table;
    },
    reloadObservaciones: () => {
        var table = $('#table-observaciones').DataTable();
        table.clear();
        table.rows.add(Observaciones.data).draw();
    },
    fetch: () => {
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/notificaciones-pedido/" + PedidoFlebotomista.numeroPedido,
            })
            .then(function(result) {
                Observaciones.data = result.data;
                Observaciones.loadObservaciones();

            })
            .catch(function(e) {})
    },
    sendNotiLab: () => {
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/noti-eme/" + PedidoFlebotomista.numeroPedido,
                body: {
                    message: Observaciones.observaciones
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    Observaciones.observaciones = "";
                    Observaciones.fetch();
                    alert('Observación registrada con éxito.')

                }
            })
            .catch(function(e) {
                EditarPedido.error = e.message;
            })


    },
};

const TomaMuestras = {
    checkedAll: false,
    disabledToma: false,
    disabledInsumos: false,
    oncreate: () => {
        if (StatusPedido.documento.dataTomaMuestra.insumosToma.length !== 0) {
            Insumos.tuboLila = StatusPedido.documento.dataTomaMuestra.insumosToma.tuboLila;
            Insumos.tuboRojo = StatusPedido.documento.dataTomaMuestra.insumosToma.tuboRojo;
            Insumos.tuboCeleste = StatusPedido.documento.dataTomaMuestra.insumosToma.tuboCeleste;
            Insumos.tuboNegro = StatusPedido.documento.dataTomaMuestra.insumosToma.tuboNegro;
            Insumos.tuboVerde = StatusPedido.documento.dataTomaMuestra.insumosToma.tuboVerde;
            Insumos.gsav = StatusPedido.documento.dataTomaMuestra.insumosToma.gsav;
            Insumos.hemocultivo = StatusPedido.documento.dataTomaMuestra.insumosToma.hemocultivo;
            Insumos.qtb = StatusPedido.documento.dataTomaMuestra.insumosToma.qtb;
        }
    },

    seleccionarTodos: (status) => {
        TomaMuestras.checkedAll = status;
        var _fechaToma = moment().format('DD-MM-YYYY HH:mm');
        return StatusPedido.data.map(function(_val, _i, _contentData) {
            if (status) {
                StatusPedido.data[_i]['STATUS_TOMA'] = "1";
                StatusPedido.data[_i]['FECHA_TOMA'] = _fechaToma;
                StatusPedido.data[_i]['customCheked'] = true;
            } else {
                StatusPedido.data[_i]['STATUS_TOMA'] = "";
                StatusPedido.data[_i]['FECHA_TOMA'] = "";
                StatusPedido.data[_i]['customCheked'] = false;
            }
        })
    },
    validarUpdateMuestras: () => {



        var _t = 0;

        for (var i = 0; i < StatusPedido.data.length; i++) {

            if (StatusPedido.data[i]['STATUS_TOMA'].length !== 0) {
                _t++;
            }

        }

        // Set State

        if (_t == 0) {
            alert("El regisro de Toma de (Muestra) e Insumos en necesario.");
            throw "El regisro de Toma de (Muestra) e Insumos en necesario.";
        }

        var _r = 0;

        if (Insumos.tuboLila !== 0) {
            _r++;
        }
        if (Insumos.tuboRojo !== 0) {
            _r++;
        }
        if (Insumos.tuboCeleste !== 0) {
            _r++;
        }
        if (Insumos.tuboNegro !== 0) {
            _r++;
        }
        if (Insumos.tuboVerde !== 0) {
            _r++;
        }
        if (Insumos.gsav !== 0) {
            _r++;
        }
        if (Insumos.hemocultivo !== 0) {
            _r++;
        }
        if (Insumos.qtb !== 0) {
            _r++;
        }

        if (_r === 0) {
            console.log(_r)
            alert("El regisro de Toma de Muestra e (Insumos) en necesario.");
            throw "El regisro de Toma de Muestra e (Insumos) en necesario.";
        }


    },
    udpateStatusTomaMuestra: () => {
        StatusPedido.documento.dataTomaMuestra.insumosToma = Insumos;
        m.request({
                method: "POST",
                url: "https://lisa.hospitalmetropolitano.org/v1/up-toma-status-pedido-lab",
                body: {
                    documento: JSON.stringify(StatusPedido.documento),
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                StatusPedido.documento = result.data;
                StatusPedido.data = result.data.dataTomaMuestra.examenesToma;
                StatusPedido.documento.dataTomaMuestra.insumosToma = result.data.dataTomaMuestra.insumosToma;


            })
            .catch(function(e) {})
    },
    view: () => {



        if (StatusPedido.error) {
            return [
                m("p.mg-0",
                    StatusPedido.error
                )
            ]
        } else if (StatusPedido.data.length !== 0) {
            return [
                m("div.bg-white.bd.d-flex.flex-column.justify-content-end", [




                    (TomaMuestras.disabledToma ? [m("p.mg-5.tx-right", [
                        m("button.btn.btn-xs.btn-outline-secondary[type='button']", {
                                onclick: () => {
                                    TomaMuestras.disabledToma = false;
                                    TomaMuestras.disabledInsumos = false;
                                }
                            },
                            m("i.fas.fa-edit.mg-r-5"),
                            " EDITAR"

                        )
                    ])] : []),


                    m(".", {
                        "style": { "pointer-events": (TomaMuestras.disabledToma ? "none" : "auto") }
                    }, [


                        m("div.table-responsive.mg-b-10.mg-t-10",
                            m("table.table.table-dashboard.table-hover.mg-b-0", [
                                m("thead",
                                    m("tr", [
                                        m("th.text-dark.text-left.bg-light[colspan='2']",
                                            "Toma de Muestra"
                                        ),


                                    ]),
                                    m("tr", [
                                        m("th.text-left",
                                            "EXAMEN"
                                        ),
                                        m("th",
                                            "CONFIRMACIÓN"
                                        ),

                                    ])
                                ),
                                m("tbody", [
                                    m("tr", [
                                        m("td.tx-normal",
                                            m("div.custom-control.custom-checkbox", [
                                                m("input.custom-control-input[type='checkbox'][id='selectTomaTodos']", {
                                                    checked: TomaMuestras.checkedAll,
                                                    onclick: function(e) {
                                                        TomaMuestras.seleccionarTodos(this.checked);
                                                    }
                                                }),
                                                m("label.custom-control-label[for='selectTomaTodos']",
                                                    'Seleccionar Todos'
                                                )
                                            ])
                                        ),
                                        m("td.tx-medium.text-right", ),
                                    ]),

                                    StatusPedido.data.map(function(_val, _i, _contentData) {

                                        return [
                                            m("tr", [

                                                m("td.tx-18.tx-medium.text-left",
                                                    _val.NM_EXA_LAB
                                                ),

                                                m("td.tx-16.tx-normal",
                                                    m("div.custom-control.custom-checkbox.tx-16", [
                                                        m("input.custom-control-input.tx-16[type='checkbox'][id='" + _val.CD_EXA_LAB + "']", {
                                                            checked: StatusPedido.data[_i]['customCheked'],
                                                            onupdate: function(e) {
                                                                this.checked = StatusPedido.data[_i]['customCheked'];
                                                            },
                                                            onclick: function(e) {

                                                                e.preventDefault();
                                                                var p = this.checked;
                                                                StatusPedido.data[_i]['customCheked'] = !StatusPedido.data[_i]['customCheked'];
                                                                if (p) {
                                                                    this.checked = true;
                                                                    StatusPedido.data[_i]['STATUS_TOMA'] = "1";
                                                                    StatusPedido.data[_i]['FECHA_TOMA'] = moment().format('DD-MM-YYYY HH:mm');
                                                                } else {
                                                                    this.checked = false;;
                                                                    TomaMuestras.checkedAll = false;
                                                                    StatusPedido.data[_i]['STATUS_TOMA'] = "";
                                                                    StatusPedido.data[_i]['FECHA_TOMA'] = "";
                                                                }

                                                            },



                                                        }),
                                                        m("label.custom-control-label.tx-16[for='" + _val.CD_EXA_LAB + "']",
                                                            (StatusPedido.data[_i]['STATUS_TOMA'].length !== 0) ? StatusPedido.data[_i]['FECHA_TOMA'] : StatusPedido.data[_i]['STATUS_TOMA'],

                                                        )
                                                    ])
                                                ),



                                            ]),
                                        ]





                                    })


                                ])
                            ])
                        ),


                        m("div.table-responsive.mg-b-10.mg-t-10",
                            m("table.table.table-dashboard.table-hover.mg-b-0", [
                                m("thead",
                                    m("tr", [
                                        m("th.text-dark.text-left.bg-light[colspan='2']",
                                            "INSUMOS"
                                        ),


                                    ]),
                                    m("tr", [
                                        m("th.text-left",
                                            "INSUMOS"
                                        ),
                                        m("th.text-left",
                                            "CANTIDAD"
                                        ),
                                    ])
                                ),
                                m("tbody", [

                                    m("tr", [

                                        m("td.tx-16.tx-normal",
                                            m("div.custom-control.custom-checkbox.tx-16", [
                                                m("input.tx-20.custom-control-input[type='checkbox'][id='tuboLila']", {
                                                    onclick: (el) => {
                                                        if (el.target.checked) {
                                                            Insumos.tuboLila = 1;
                                                        } else {
                                                            Insumos.tuboLila = 0;
                                                        }

                                                    },
                                                    oncreate: (el) => {
                                                        if (Insumos.tuboLila !== undefined && Insumos.tuboLila !== 0) {
                                                            el.dom.checked = true;
                                                        }
                                                    },
                                                    onupdate: (el) => {
                                                        if (Insumos.tuboLila !== undefined && Insumos.tuboLila !== 0) {
                                                            if (Insumos.tuboLila == 1) {
                                                                el.dom.checked = true;

                                                            }
                                                        } else {
                                                            el.dom.checked = false;
                                                        }
                                                    }
                                                }),
                                                m("label.tx-20.tx-semibold.custom-control-label[for='tuboLila']",
                                                    "Tubo Lila"
                                                )
                                            ])
                                        ),

                                        m("td.tx-16.tx-medium.text-left", [
                                            m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                            }, [
                                                m("button.btn[type='button']",
                                                    m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                        oncreate: (el) => {
                                                            if (Insumos.tuboLila !== undefined && Insumos.tuboLila !== 0) {
                                                                el.dom.innerText = Insumos.tuboLila;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.tuboLila !== undefined && Insumos.tuboLila !== 0) {
                                                                el.dom.innerText = Insumos.tuboLila;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        }

                                                    })
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {


                                                            Insumos.tuboLila++;
                                                        },

                                                    },
                                                    m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboLila--;
                                                            if (Insumos.tuboLila < 0) {
                                                                Insumos.tuboLila = 0;
                                                            }

                                                        },

                                                    },
                                                    m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                ),

                                            ])
                                        ]),




                                    ]),

                                    m("tr", [

                                        m("td.tx-16.tx-normal",
                                            m("div.custom-control.custom-checkbox.tx-16", [
                                                m("input.tx-20.custom-control-input[type='checkbox'][id='tuboRojo']", {
                                                    onclick: (el) => {
                                                        if (el.target.checked) {
                                                            Insumos.tuboRojo = 1;
                                                        } else {
                                                            Insumos.tuboRojo = 0;
                                                        }

                                                    },
                                                    oncreate: (el) => {
                                                        if (Insumos.tuboRojo !== undefined && Insumos.tuboRojo !== 0) {
                                                            el.dom.checked = true;
                                                        }
                                                    },
                                                    onupdate: (el) => {
                                                        if (Insumos.tuboRojo !== undefined && Insumos.tuboRojo !== 0) {
                                                            if (Insumos.tuboRojo == 1) {
                                                                el.dom.checked = true;

                                                            }
                                                        } else {
                                                            el.dom.checked = false;
                                                        }
                                                    }
                                                }),
                                                m("label.tx-20.tx-semibold..custom-control-label[for='tuboRojo']",
                                                    "Tubo Rojo"
                                                )
                                            ])
                                        ),

                                        m("td.tx-16.tx-medium.text-left", [
                                            m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                            }, [
                                                m("button.btn[type='button']",
                                                    m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                        oncreate: (el) => {
                                                            if (Insumos.tuboRojo !== undefined && Insumos.tuboRojo !== 0) {
                                                                el.dom.innerText = Insumos.tuboRojo;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.tuboRojo !== undefined && Insumos.tuboRojo !== 0) {
                                                                el.dom.innerText = Insumos.tuboRojo;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        }

                                                    })
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboRojo++;
                                                        },

                                                    },
                                                    m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboRojo--;
                                                            if (Insumos.tuboRojo < 0) {
                                                                Insumos.tuboRojo = 0;
                                                            }

                                                        },

                                                    },
                                                    m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                ),

                                            ])
                                        ]),




                                    ]),
                                    m("tr", [

                                        m("td.tx-16.tx-normal",
                                            m("div.custom-control.custom-checkbox.tx-16", [
                                                m("input.tx-20.custom-control-input[type='checkbox'][id='tuboCeleste']", {
                                                    onclick: (el) => {
                                                        if (el.target.checked) {
                                                            Insumos.tuboCeleste = 1;
                                                        } else {
                                                            Insumos.tuboCeleste = 0;
                                                        }

                                                    },
                                                    oncreate: (el) => {
                                                        if (Insumos.tuboCeleste !== undefined && Insumos.tuboCeleste !== 0) {
                                                            el.dom.checked = true;
                                                        }
                                                    },
                                                    onupdate: (el) => {
                                                        if (Insumos.tuboCeleste !== undefined && Insumos.tuboCeleste !== 0) {
                                                            if (Insumos.tuboCeleste == 1) {
                                                                el.dom.checked = true;

                                                            }
                                                        } else {
                                                            el.dom.checked = false;
                                                        }
                                                    }
                                                }),
                                                m("label.tx-20.tx-semibold..custom-control-label[for='tuboCeleste']",
                                                    "Tubo Celeste"
                                                )
                                            ])
                                        ),

                                        m("td.tx-16.tx-medium.text-left", [
                                            m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                            }, [
                                                m("button.btn[type='button']",
                                                    m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                        oncreate: (el) => {
                                                            if (Insumos.tuboCeleste !== undefined && Insumos.tuboCeleste !== 0) {
                                                                el.dom.innerText = Insumos.tuboCeleste;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.tuboCeleste !== undefined && Insumos.tuboCeleste !== 0) {
                                                                el.dom.innerText = Insumos.tuboCeleste;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        }

                                                    })
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboCeleste++;
                                                        },

                                                    },
                                                    m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboCeleste--;

                                                        },

                                                    },
                                                    m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                ),

                                            ])
                                        ]),




                                    ]),
                                    m("tr", [

                                        m("td.tx-16.tx-normal",
                                            m("div.custom-control.custom-checkbox.tx-16", [
                                                m("input.tx-20.custom-control-input[type='checkbox'][id='tuboNegro']", {
                                                    onclick: (el) => {
                                                        if (el.target.checked) {
                                                            Insumos.tuboNegro = 1;
                                                        } else {
                                                            Insumos.tuboNegro = 0;
                                                        }

                                                    },
                                                    oncreate: (el) => {
                                                        if (Insumos.tuboNegro !== undefined && Insumos.tuboNegro !== 0) {
                                                            el.dom.checked = true;
                                                        }
                                                    },
                                                    onupdate: (el) => {
                                                        if (Insumos.tuboNegro !== undefined && Insumos.tuboNegro !== 0) {
                                                            if (Insumos.tuboNegro == 1) {
                                                                el.dom.checked = true;

                                                            }
                                                        } else {
                                                            el.dom.checked = false;
                                                        }
                                                    }
                                                }),
                                                m("label.tx-20.tx-semibold..custom-control-label[for='tuboNegro']",
                                                    "Tubo Negro"
                                                )
                                            ])
                                        ),

                                        m("td.tx-16.tx-medium.text-left", [
                                            m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                            }, [
                                                m("button.btn[type='button']",
                                                    m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                        oncreate: (el) => {
                                                            if (Insumos.tuboNegro !== undefined && Insumos.tuboNegro !== 0) {
                                                                el.dom.innerText = Insumos.tuboNegro;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.tuboNegro !== undefined && Insumos.tuboNegro !== 0) {
                                                                el.dom.innerText = Insumos.tuboNegro;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        }

                                                    })
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboNegro++;
                                                        },

                                                    },
                                                    m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboNegro--;

                                                        },

                                                    },
                                                    m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                ),

                                            ])
                                        ]),




                                    ]),
                                    m("tr", [

                                        m("td.tx-16.tx-normal",
                                            m("div.custom-control.custom-checkbox.tx-16", [
                                                m("input.tx-20.custom-control-input[type='checkbox'][id='tuboVerde']", {
                                                    onclick: (el) => {
                                                        if (el.target.checked) {
                                                            Insumos.tuboVerde = 1;
                                                        } else {
                                                            Insumos.tuboVerde = 0;
                                                        }

                                                    },
                                                    oncreate: (el) => {
                                                        if (Insumos.tuboVerde !== undefined && Insumos.tuboVerde !== 0) {
                                                            el.dom.checked = true;
                                                        }
                                                    },
                                                    onupdate: (el) => {
                                                        if (Insumos.tuboVerde !== undefined && Insumos.tuboVerde !== 0) {
                                                            if (Insumos.tuboVerde == 1) {
                                                                el.dom.checked = true;

                                                            }
                                                        } else {
                                                            el.dom.checked = false;
                                                        }
                                                    }
                                                }),
                                                m("label.tx-20.tx-semibold..custom-control-label[for='tuboVerde']",
                                                    "Tubo Verde"
                                                )
                                            ])
                                        ),

                                        m("td.tx-16.tx-medium.text-left", [
                                            m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                            }, [
                                                m("button.btn[type='button']",
                                                    m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                        oncreate: (el) => {
                                                            if (Insumos.tuboVerde !== undefined && Insumos.tuboVerde !== 0) {
                                                                el.dom.innerText = Insumos.tuboVerde;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.tuboVerde !== undefined && Insumos.tuboVerde !== 0) {
                                                                el.dom.innerText = Insumos.tuboVerde;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        },


                                                    })
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboVerde++;
                                                        },

                                                    },
                                                    m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboVerde--;

                                                        },

                                                    },
                                                    m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                ),

                                            ])
                                        ]),




                                    ]),
                                    m("tr", [

                                        m("td.tx-16.tx-normal",
                                            m("div.custom-control.custom-checkbox.tx-16", [
                                                m("input.tx-20.custom-control-input[type='checkbox'][id='gsav']", {
                                                    onclick: (el) => {
                                                        if (el.target.checked) {
                                                            Insumos.gsav = 1;
                                                        } else {
                                                            Insumos.gsav = 0;
                                                        }

                                                    },
                                                    oncreate: (el) => {
                                                        if (Insumos.gsav !== undefined && Insumos.gsav !== 0) {
                                                            el.dom.checked = true;
                                                        }
                                                    },
                                                    onupdate: (el) => {
                                                        if (Insumos.gsav !== undefined && Insumos.gsav !== 0) {
                                                            if (Insumos.gsav == 1) {
                                                                el.dom.checked = true;

                                                            }
                                                        } else {
                                                            el.dom.checked = false;
                                                        }
                                                    }
                                                }),
                                                m("label.tx-20.tx-semibold..custom-control-label[for='gsav']",
                                                    "GSA V"
                                                )
                                            ])
                                        ),

                                        m("td.tx-16.tx-medium.text-left", [
                                            m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                            }, [
                                                m("button.btn[type='button']",
                                                    m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                        oncreate: (el) => {
                                                            if (Insumos.gsav !== undefined && Insumos.gsav !== 0) {
                                                                el.dom.innerText = Insumos.gsav;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.gsav !== undefined && Insumos.gsav !== 0) {
                                                                el.dom.innerText = Insumos.gsav;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        }

                                                    })
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.gsav++;
                                                        },

                                                    },
                                                    m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.gsav--;

                                                        },

                                                    },
                                                    m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                ),

                                            ])
                                        ]),





                                    ]),
                                    m("tr", [

                                        m("td.tx-16.tx-normal",
                                            m("div.custom-control.custom-checkbox.tx-16", [
                                                m("input.tx-20.custom-control-input[type='checkbox'][id='hemocultivo']", {
                                                    onclick: (el) => {
                                                        if (el.target.checked) {
                                                            Insumos.hemocultivo = 1;
                                                        } else {
                                                            Insumos.hemocultivo = 0;
                                                        }

                                                    },
                                                    oncreate: (el) => {
                                                        if (Insumos.hemocultivo !== undefined && Insumos.hemocultivo !== 0) {
                                                            el.dom.checked = true;
                                                        }
                                                    },
                                                    onupdate: (el) => {
                                                        if (Insumos.hemocultivo !== undefined && Insumos.hemocultivo !== 0) {
                                                            if (Insumos.hemocultivo == 1) {
                                                                el.dom.checked = true;

                                                            }
                                                        } else {
                                                            el.dom.checked = false;
                                                        }
                                                    }
                                                }),
                                                m("label.tx-20.tx-semibold..custom-control-label[for='hemocultivo']",
                                                    "Hemocultivo"
                                                )
                                            ])
                                        ),

                                        m("td.tx-16.tx-medium.text-left", [
                                            m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                            }, [
                                                m("button.btn[type='button']",
                                                    m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                        oncreate: (el) => {
                                                            if (Insumos.hemocultivo !== undefined && Insumos.hemocultivo !== 0) {
                                                                el.dom.innerText = Insumos.hemocultivo;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.hemocultivo !== undefined && Insumos.hemocultivo !== 0) {
                                                                el.dom.innerText = Insumos.hemocultivo;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        }
                                                    })
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.hemocultivo++;
                                                        },

                                                    },
                                                    m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.hemocultivo--;

                                                        },

                                                    },
                                                    m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                ),

                                            ])
                                        ]),




                                    ]),
                                    m("tr", [

                                        m("td.tx-16.tx-normal",
                                            m("div.custom-control.custom-checkbox.tx-16", [
                                                m("input.tx-20.custom-control-input[type='checkbox'][id='qtb']", {
                                                    onclick: (el) => {
                                                        if (el.target.checked) {
                                                            Insumos.qtb = 1;
                                                        } else {
                                                            Insumos.qtb = 0;
                                                        }

                                                    },
                                                    oncreate: (el) => {
                                                        if (Insumos.qtb !== undefined && Insumos.qtb !== 0) {
                                                            el.dom.checked = true;
                                                        }
                                                    },
                                                    onupdate: (el) => {
                                                        if (Insumos.qtb !== undefined && Insumos.qtb !== 0) {
                                                            if (Insumos.qtb == 1) {
                                                                el.dom.checked = true;

                                                            }
                                                        } else {
                                                            el.dom.checked = false;
                                                        }
                                                    }
                                                }),
                                                m("label.tx-20.tx-semibold..custom-control-label[for='qtb']",
                                                    "QTB"
                                                )
                                            ])
                                        ),

                                        m("td.tx-16.tx-medium.text-left", [
                                            m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                            }, [
                                                m("button.btn[type='button']",
                                                    m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                        oncreate: (el) => {
                                                            if (Insumos.qtb !== undefined && Insumos.qtb !== 0) {
                                                                el.dom.innerText = Insumos.qtb;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.qtb !== undefined && Insumos.qtb !== 0) {
                                                                el.dom.innerText = Insumos.qtb;
                                                            } else {
                                                                el.dom.innerText = 0;

                                                            }
                                                        }

                                                    })
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.qtb++;
                                                        },

                                                    },
                                                    m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                ),
                                                m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.qtb--;

                                                        },

                                                    },
                                                    m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                ),

                                            ])
                                        ]),




                                    ]),
                                ])
                            ])
                        ),
                        ((!TomaMuestras.disabledToma) ? [m("div.pd-10", [
                            m("button.btn.btn-xs.btn-primary.btn-block.tx-semibold[type='button']", {
                                    disabled: TomaMuestras.disabledToma,
                                    onclick: () => {

                                        TomaMuestras.validarUpdateMuestras();
                                        var _fechaToma = moment().format('DD-MM-YYYY HH:mm');
                                        StatusPedido.documento.dataTomaMuestra.usuarioToma = "flebot1";
                                        StatusPedido.documento.dataTomaMuestra.fechaToma = _fechaToma;
                                        TomaMuestras.disabledToma = true;
                                        TomaMuestras.udpateStatusTomaMuestra();


                                    }
                                },
                                "Guardar Registro"
                            )
                        ])] : [m("p.mg-5.", [

                            (StatusPedido.documento.dataTomaMuestra.fechaToma.length !== 0 ? [m("span.badge.badge-light.tx-right.wd-100p.tx-14",
                                "Toma de Muestra: FLEBOT1 " + StatusPedido.documento.dataTomaMuestra.fechaToma,

                            )] : [])

                        ])]),
                    ]),

                ])
            ]
        } else {
            return [
                m("div.pd-t-10", [
                    m("div.placeholder-paragraph.wd-100p", [
                        m("div.line"),
                        m("div.line")
                    ])
                ])

            ]
        }

    }
};

const ControlLISA = {
    showLogs: "",
    dataXML: "",
    logsEnvio: [],
    examenes: [],

    oninit: () => {
        ControlLISA.examenes = [];

    },
    agregarExamen: (exa) => {

        var existe = false;

        ControlLISA.examenes.map(function(_val, _i, _contentData) {
            if (ControlLISA.examenes[_i]['codigoExame'] == exa.CD_EXA_LAB) {
                existe = true;
            }
        })

        if (!existe) {

            PedidoFlebotomista.examenes.Exame.map(function(_val, _i, _contentData) {
                if (PedidoFlebotomista.examenes.Exame[_i]['codigoExame'] == exa.CD_EXA_LAB) {
                    ControlLISA.examenes.push(PedidoFlebotomista.examenes.Exame[_i]);
                }
            })


        }

        console.log(ControlLISA.examenes)



    },
    eliminarExamen: (exa) => {

        var existe = false;
        var _ni = null;

        ControlLISA.examenes.map(function(_val, _i, _contentData) {


            if (ControlLISA.examenes[_i]['codigoExame'] == exa.CD_EXA_LAB) {
                existe = true;
                _ni = _i;
            }
        })


        if (existe) {


            ControlLISA.examenes.splice(_ni, 1);
            console.log(ControlLISA.examenes)

        }


    },
    generarXML: () => {

        let jsonObj = {
            Exame: ControlLISA.examenes,
        };


        let vaTime = moment().format('YYYY-MM-DD HH:mm:ss');

        PedidoFlebotomista.data.Cabecalho.mensagemID = moment().unix();
        PedidoFlebotomista.data.Cabecalho.dataHora = vaTime;
        PedidoFlebotomista.data.PedidoExameLab.listaExame = jsonObj;
        PedidoFlebotomista.data.PedidoExameLab.operacao = "I";



        let xmlRes = JSONtoXML(PedidoFlebotomista.data);

        console.log('documento', PedidoFlebotomista.data)

        console.log('xmlRes', xmlRes)

        ControlLISA.sendXML(xmlRes, PedidoFlebotomista.numeroPedido, vaTime)


    },
    sendXML: (xmlRes, sc, itr) => {
        m.request({
                method: "POST",
                url: "https://lisa.hospitalmetropolitano.org/v1/pedidos/send-pedido",
                body: {
                    data: xmlRes,
                    sc: sc,
                    idTimeRecord: itr,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                setTimeout(function() {
                    alert('Proceso realizado con éxito.');
                    window.location.reload();
                }, 2000);




                console.log('result', result)


            })
            .catch(function(e) {})
    },
    fetch: () => {

        ControlLISA.logsEnvio = [];

        m.request({
                method: "GET",
                url: "https://lisa.hospitalmetropolitano.org/v1/logs-envio-pedido-lisa?numeroPedido=" + PedidoFlebotomista.numeroPedido,

                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {

                console.log(result)
                ControlLISA.logsEnvio = result.data;

            })
            .catch(function(e) {

            })



    }

};


const PedidoFlebotomista = {
    data: [],
    examenes: [],
    error: '',
    numeroPedido: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    idTimeRecord: "",
    oninit: (_data) => {
        if (_data.attrs.numeroPedido !== undefined && _data.attrs.idTimeRecord !== undefined) {
            document.title = "Detalle de Pedido N°: " + _data.attrs.numeroPedido + " | " + App.title;
            PedidoFlebotomista.numeroPedido = _data.attrs.numeroPedido;
            PedidoFlebotomista.numeroAtencion = _data.attrs.numeroAtencion;
            PedidoFlebotomista.numeroHistoriaClinica = _data.attrs.numeroHistoriaClinica;
            PedidoFlebotomista.idTimeRecord = _data.attrs.idTimeRecord;
            PedidoFlebotomista.fetch();
        }
    },
    fetch: () => {
        PedidoFlebotomista.data = [];
        PedidoFlebotomista.loader = true;
        StatusPedido.fetch();
    },

    view: (_data) => {

        if (PedidoFlebotomista.data.length !== 0) {

            let nacimiento = moment(PedidoFlebotomista.data.PedidoExameLab.paciente.dataNascimento);
            let hoy = moment();
            PedidoFlebotomista.data.PedidoExameLab.paciente.anios = hoy.diff(nacimiento, "years");
        }


        return PedidoFlebotomista.loader ? [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(16) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Detalle de Pedido"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Detalle de Pedido N°: " + PedidoFlebotomista.numeroPedido
                    ),


                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("div.table-loader.wd-100p", [
                                    m("div.placeholder-paragraph", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ]


                            ),


                        ])


                    ]),



                ])
            )
        ] : [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(16) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Detalle de Pedido"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Detalle de Pedido N°: " + PedidoFlebotomista.numeroPedido
                    ),


                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("div.table-loader.wd-100p", {
                                    oncreate: (el) => {
                                        if (PedidoFlebotomista.loader) {
                                            el.dom.hidden = false;
                                        } else {
                                            el.dom.hidden = true;

                                        }
                                    },
                                    onupdate: (el) => {
                                        if (PedidoFlebotomista.loader) {
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
                                    if (PedidoFlebotomista.loader) {
                                        el.dom.hidden = true;
                                    } else {
                                        el.dom.hidden = false;

                                    }
                                },
                                onupdate: (el) => {
                                    if (PedidoFlebotomista.loader) {
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


                                                        if (pedidosIngresados.idFiltro !== undefined && pedidosIngresados.idFiltro > 1) {

                                                            m.route.set('/laboratorio/flebotomista/', {
                                                                idFiltro: pedidosIngresados.idFiltro,
                                                                fechaDesde: pedidosIngresados.fechaDesde,
                                                                fechaHasta: pedidosIngresados.fechaHasta,
                                                            });

                                                        } else {

                                                            m.route.set('/laboratorio/flebotomista/', {
                                                                idFiltro: 1,
                                                            });

                                                        }




                                                    }
                                                }

                                            )


                                        ),

                                    ),


                                    ((PedidoFlebotomista.data.PedidoExameLab.tipoSolicitacao == 'R') ? [
                                        m("span.pd-6.wd-100p.wd-md-20p", {
                                            class: "badge badge-primary mg-b-2 mg-r-2",
                                        }, [
                                            m("i.fas.fa-file-alt.mg-r-5"),
                                        ], "Pedido Normal"),

                                    ] : [
                                        m("span.pd-6.wd-100p.wd-md-20p", {
                                            class: "badge badge-danger mg-b-2 mg-r-2 ",
                                        }, [
                                            m("i.fas.fa-file-alt.mg-r-5"),
                                        ], "Pedido Urgente"),
                                    ]),


                                    m('div.table-responsive', [
                                        m("table.table.table-bordered.table-sm.tx-12", [
                                            m("thead",

                                                m("tr.bg-litecoin.op-9.tx-white", [
                                                    m("th[scope='col'][colspan='10']",
                                                        "DATOS DEL PEDIDO:"
                                                    ),

                                                ])
                                            ),
                                            m("tbody", [
                                                m("tr", [
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "N° de Pedido:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        PedidoFlebotomista.data.PedidoExameLab.codigoPedido
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Fecha Pedido:",
                                                        m('br'),
                                                        m('.d-inline.tx-danger', "Fecha Toma de Muestra:"),
                                                    ),
                                                    m("td[colspan='3']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        PedidoFlebotomista.data.PedidoExameLab.dataExame,
                                                        m('br'),
                                                        PedidoFlebotomista.data.PedidoExameLab.dataExame

                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Origen:"
                                                    ),
                                                    m("td[colspan='3']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        PedidoFlebotomista.data.PedidoExameLab.descSetorSolicitante
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
                                                        PedidoFlebotomista.data.PedidoExameLab.descPrestadorSolicitante,

                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Especialidad:"
                                                    ),
                                                    m("td[colspan='4']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        PedidoFlebotomista.data.PedidoExameLab.descPrestadorSolicitante
                                                    ),



                                                ]),
                                            ]),
                                            m("thead",

                                                m("tr.bg-litecoin.op-9.tx-white", [
                                                    m("th[scope='col'][colspan='10']",
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
                                                    m("td[colspan='5']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        PedidoFlebotomista.data.PedidoExameLab.paciente.nome
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Edad:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        PedidoFlebotomista.data.PedidoExameLab.paciente.anios +
                                                        " Año(s)"

                                                    ),

                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "NHC:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        PedidoFlebotomista.data.PedidoExameLab.paciente.codigoPaciente
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
                                                        PedidoFlebotomista.data.PedidoExameLab.atendimento.codigoAtendimento
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Sexo:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        PedidoFlebotomista.data.PedidoExameLab.paciente.sexo
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "F. de Nac.:"
                                                    ),
                                                    m("td", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        PedidoFlebotomista.data.PedidoExameLab.paciente.dataNascimento
                                                    ),
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Dg:"
                                                    ),
                                                    m("td[colspan='3']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        (PedidoFlebotomista.data.PedidoExameLab.diagnostico.codigoDiagnostico.length == undefined ? '' : 'CIE: ' + PedidoFlebotomista.data.PedidoExameLab.diagnostico.codigoDiagnostico) + (PedidoFlebotomista.data.PedidoExameLab.diagnostico.dsDiagostico.length == undefined ? '' : " - " + PedidoFlebotomista.data.PedidoExameLab.diagnostico.dsDiagostico)
                                                    ),
                                                ]),
                                                m("tr.bg-litecoin.op-9.tx-white", [
                                                    m("th[scope='col'][colspan='10']",
                                                        "EXÁMENES:"
                                                    ),

                                                ]),
                                                m("tr", [
                                                    m("th", {
                                                            style: { "background-color": "#a8bed6" }
                                                        },
                                                        "Exámenes:"
                                                    ),
                                                    m("td[colspan='9']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        },
                                                        m(Examenes)
                                                    ),


                                                ]),

                                                m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                                    m("th[scope='col'][colspan='10']",
                                                        "EVOLUCIONES Y PRESCRIPCIONES:"
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

                                                                    " HOJA 005"
                                                                )
                                                            ),
                                                            m("li.nav-item",
                                                                m("a.nav-link[id='home-muestra'][data-toggle='tab'][href='#muestra'][role='tab'][aria-controls='muestra']", {
                                                                        style: { "color": "#476ba3" }
                                                                    },
                                                                    m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                                    " TOMA DE MUESTRA "
                                                                )
                                                            ),

                                                            m("li.nav-item",
                                                                m("a.nav-link[id='home-comment'][data-toggle='tab'][href='#comment'][role='tab'][aria-controls='comment']", {
                                                                        style: { "color": "#476ba3" }
                                                                    },
                                                                    m("i.fas.fa-inbox.pd-1.mg-r-2"),

                                                                    " COMENTARIOS "
                                                                )
                                                            ),



                                                        ]),
                                                    ),


                                                ]),
                                                m("tr.d-print-none", [

                                                    m("td[colspan='10']",
                                                        m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                            m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                                                m(Evoluciones),
                                                            ]),
                                                            m(".tab-pane.fade[id='muestra'][role='tabpanel'][aria-labelledby='home-muestra']", [
                                                                m(TomaMuestras)
                                                            ]),

                                                            m(".tab-pane.fade[id='comment'][role='tabpanel'][aria-labelledby='home-comment']", [
                                                                m("p.mg-5", [
                                                                    m("span.badge.badge-light.wd-100p.tx-14",
                                                                        "Observaciones",
                                                                    ),
                                                                    m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                                        oninput: function(e) { Observaciones.observaciones = e.target.value; },
                                                                        value: Observaciones.observaciones,
                                                                    }),
                                                                    m("div.mg-0.mg-t-5.text-right", [

                                                                        m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                            onclick: function() {
                                                                                if (Observaciones.observaciones.length !== 0) {
                                                                                    Observaciones.sendNotiLab();
                                                                                } else {
                                                                                    alert("Observaciones es obligatorio.");
                                                                                }
                                                                            },
                                                                        }, [
                                                                            m("i.fas.fa-paper-plane.mg-r-5", )
                                                                        ], "Guardar"),


                                                                    ]),
                                                                    m("hr.wd-100p.mg-t-5.mg-b-5"),

                                                                ]),
                                                                m("p.mg-5", [
                                                                    m("span.badge.badge-light.wd-100p.tx-14",
                                                                        "Historial de Observaciones",
                                                                    ),
                                                                    m("table.table.table-sm[id='table-observaciones'][width='100%']")
                                                                ]),
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
                        ])


                    ]),



                ])
            ),
        ]




    }

};

function JSONtoXML(obj) {
    let xml = '';
    for (let prop in obj) {
        xml += obj[prop] instanceof Array ? '' : '<' + prop + '>';
        if (obj[prop] instanceof Array) {
            for (let array in obj[prop]) {
                xml += '\n<' + prop + '>\n';
                xml += JSONtoXML(new Object(obj[prop][array]));
                xml += '</' + prop + '>';
            }
        } else if (typeof obj[prop] == 'object') {
            xml += JSONtoXML(new Object(obj[prop]));
        } else {
            xml += obj[prop];
        }
        xml += obj[prop] instanceof Array ? '' : '</' + prop + '>\n';
    }
    xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    return xml;
}


export default PedidoFlebotomista;