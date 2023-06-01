import HeaderPrivate from '../../layout/header-private';
import SidebarEme from '../sidebarEme';
import App from '../../app';
import m from 'mithril';
import Auth from '../../../models/auth';

const ListaNotitifaciones = {
    data: false,
    fetch: () => {
        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/t/v1/notificaciones-pedido/" + VerPedidoEnfermeriaEmergencia.idPedido,
        })
            .then(function (result) {
                ListaNotitifaciones.data = result.data;
                loadNotificaciones();

            })
            .catch(function (e) { })
    },

    view: () => {

        if (!ListaNotitifaciones.data) {
            return m("p.placeholder-paragraph.wd-100p", [
                m("div.line"),
                m("div.line")
            ])
        }

        if (ListaNotitifaciones.data.length == 0) {
            return m("p", "Sin Notificaciones")
        }

        if (ListaNotitifaciones.data.length !== 0) {
            return ListaNotitifaciones.data.map(function (_v, _i, _contentData) {

                if (_i < 4) {
                    if (_v.title == 'Nuevo Mensaje') {
                        return m("div.demo-static-toast.mg-b-5",
                            m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", [
                                m("div.toast-header.bg-primary", [
                                    m("small.tx-white.tx-5.mg-b-0.mg-r-auto",
                                        _v.title
                                    ),
                                    m("small.tx-white",
                                        moment.unix(_v.timestamp).format("HH:mm")
                                    ),
                                ]),
                                m("div.toast-body.small",
                                    _v.message
                                )
                            ])
                        )
                    } else {
                        return m("div.demo-static-toast.mg-b-5",
                            m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", [
                                m("div.toast-header.bg-danger", [
                                    m("small.tx-white.tx-5.mg-b-0.mg-r-auto",
                                        _v.title
                                    ),
                                    m("small.tx-white",
                                        moment.unix(_v.timestamp).format("HH:mm")
                                    ),
                                ]),
                                m("div.toast-body.small",
                                    _v.message
                                )
                            ])
                        )
                    }

                }

            })
        }






    },
}


const MensajesPedido = {
    messagePedido: null,
    oncreate: () => {
        ListaNotitifaciones.fetch();
    },
    sendMessage: () => {
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/message-pedido/" + VerPedidoEnfermeriaEmergencia.idPedido,
            body: {
                dataPedido: DetallePedido.data,
                message: MensajesPedido.messagePedido
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                if (result.status) {
                    MensajesPedido.messagePedido = "";
                    ListaNotitifaciones.fetch();
                    alert('Mensaje enviado con éxito.')
                    reloadNotificacion();
                }
            })
            .catch(function (e) {
                EditarPedido.error = e.message;
            })
    },
    view: () => {
        return m("table.table.table-sm[id='table-notificaciones'][width='100%']")
    },
}

const DetallePedido = {
    data: [],
    detalle: [],
    error: "",
    numPedido: 0,
    fetch: () => {
        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/t/v1/ver-pedido-eme-lab/" + VerPedidoEnfermeriaEmergencia.idPedido,
        })
            .then(function (result) {
                DetallePedido.data = result.data;
                result.data.DESCRIPCION.map(function (_val, _i, _contentData) {
                    DetallePedido.detalle.push(_val);
                    EditarPedido.detalle.push(_val);
                    if (_val.indexOf("-R-") !== -1) {
                        DetallePedido.numPedido = (DetallePedido.numPedido + 1);
                    }
                })
            })
            .catch(function (e) {
                DetallePedido.error = e.message;
            })
    },
    view: () => {

        if (EditarPedido.detalle.length !== 0) {
            return DetallePedido.detalle.map(function (_val, _i, _contentData) {
                if (EditarPedido.detalle[_i].indexOf("...") !== -1) {
                    return m("p.mg-0",
                        DetallePedido.detalle[_i] + " " + EditarPedido.detalle[_i].split("...")[1]
                    )
                } else {
                    return m("p.mg-0",
                        DetallePedido.detalle[_i]
                    )
                }
            })
        }


    },
}

const EditarPedido = {
    detalle: [],
    error: "",
    observaciones: "",
    checkedAll: false,
    numPedido: 0,
    view: () => {
        return [
            m("div.custom-control.custom-checkbox", [
                m("input.custom-control-input[type='checkbox'][id='selectTodos']", {
                    checked: EditarPedido.checkedAll,
                    onclick: function (e) {
                        EditarPedido.seleccionarTodos(this.checked);
                    }
                }),
                m("label.custom-control-label.tx-semibold[for='selectTodos']", "SELECCIONAR TODOS")
            ]),
            EditarPedido.detalle.map(function (_val, _i, _contentData) {



                if (_val.indexOf("...") !== -1) {


                    return m("div.custom-control.custom-checkbox", [
                        m("input.custom-control-input[type='checkbox'][id='" + VerPedidoEnfermeriaEmergencia.idPedido + "-" + _i + "']", {
                            checked: true,
                            onclick: function (e) {
                                if (!this.checked) {
                                    EditarPedido.detalle[_i] = DetallePedido.detalle[_i];
                                    Pedido.statusPedido = 3;
                                    Pedido.classPedido = "tx-warning";
                                    Pedido.descPedido = "Muestras Pendientes";
                                    EditarPedido.checkedAll = false;

                                }
                                EditarPedido.updateDataPedido();



                            },
                            onupdate: (e) => {
                                (EditarPedido.detalle[_i].indexOf("...") !== -1) ? DetallePedido.detalle[_i] + EditarPedido.detalle[_i].split("...")[1] : DetallePedido.detalle[_i];
                            },

                        }),
                        m("label.custom-control-label[for='" + VerPedidoEnfermeriaEmergencia.idPedido + "-" + _i + "']",
                            (EditarPedido.detalle[_i].indexOf("...") !== -1) ? DetallePedido.detalle[_i] + EditarPedido.detalle[_i].split("...")[1] : DetallePedido.detalle[_i],
                        )
                    ])
                } else {


                    return m("div.custom-control.custom-checkbox", [

                        m("input.custom-control-input[type='checkbox'][id='" + VerPedidoEnfermeriaEmergencia.idPedido + "-" + _i + "']", {

                            onclick: function (e) {
                                if (this.checked) {
                                    EditarPedido.detalle[_i] = DetallePedido.detalle[_i] + " ... - Muestra Recibida: " + moment().format('DD-MM-YYYY HH:mm');
                                }
                                EditarPedido.updateDataPedido();

                            },
                            onupdate: (e) => {
                                (EditarPedido.detalle[_i].indexOf("...") !== -1) ? DetallePedido.detalle[_i] + EditarPedido.detalle[_i].split("...")[1] : DetallePedido.detalle[_i];
                            },

                        }),
                        m("label.custom-control-label[for='" + VerPedidoEnfermeriaEmergencia.idPedido + "-" + _i + "']",
                            (EditarPedido.detalle[_i].indexOf("...") !== -1) ? DetallePedido.detalle[_i] + EditarPedido.detalle[_i].split("...")[1] : DetallePedido.detalle[_i],
                        )
                    ])
                }



            }),

        ]
    },
    oninit: () => {


        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/t/v1/status-pedido-eme-lab/" + VerPedidoEnfermeriaEmergencia.idPedido,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                if (result.status) {



                    EditarPedido.detalle = result.data;





                    ListaNotitifaciones.fetch();


                }
            })
            .catch(function (e) {
                EditarPedido.error = e.message;
            })
    },
    updateDataPedido: () => {
        EditarPedido.validarStatus();
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/up-pedido-lab/" + VerPedidoEnfermeriaEmergencia.idPedido,
            body: {
                dataPedido: EditarPedido.detalle,
                statusPedido: Pedido.statusPedido

            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                if (result.status) {

                    EditarPedido.detalle = result.data;
                    EditarPedido.validarStatus();



                }
            })
            .catch(function (e) {
                EditarPedido.error = e.message;
            })
    },
    sendNotiLab: () => {
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/noti-eme/" + VerPedidoEnfermeriaEmergencia.idPedido,
            body: {
                dataPedido: DetallePedido.data,
                message: EditarPedido.observaciones
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                if (result.status) {
                    EditarPedido.observaciones = "";
                    ListaNotitifaciones.fetch();

                    alert('Mensaje enviado con éxito.')
                    reloadNotificacion();

                }
            })
            .catch(function (e) {
                EditarPedido.error = e.message;
            })
    },
    validarStatus: () => {
        let _np = 0;
        let _vp = 0;
        EditarPedido.detalle.map(function (_val, _i, _contentData) {



            if (_val.indexOf("...") !== -1) {
                _np = (_np + 1);
            } else {
                _vp = (_vp + 1);
            }


        })
    },
    seleccionarTodos: (status) => {


        return EditarPedido.detalle.map(function (_val, _i, _contentData) {

            if (status) {
                EditarPedido.detalle[_i] = DetallePedido.detalle[_i] + " ... - Muestra Recibida: " + moment().format('DD-MM-YYYY HH:mm');
                document.getElementById(VerPedidoEnfermeriaEmergencia.idPedido + "-" + _i).checked = true;
            } else {
                EditarPedido.detalle[_i] = DetallePedido.detalle[_i];
                document.getElementById(VerPedidoEnfermeriaEmergencia.idPedido + "-" + _i).checked = false;
            }

            if (EditarPedido.detalle.length === (_i + 1)) {
                EditarPedido.updateDataPedido();

            }

        })
    },

}

const Pedido = {
    ver: true,
    nuevoMensaje: false,
    editar: false,
    entregar: false,
    enviar: false,
    labelOperation: "Detalle:",
    statusPedido: 1,
    descPedido: "...",
    classPedido: "tx-gray-500",
    oninit: () => {
        DetallePedido.fetch();
    },
    view: () => {
        return DetallePedido.error ? [
            m(".alert.alert-danger[role='alert']",
                DetallePedido.error
            )
        ] : DetallePedido.detalle.length !== 0 ? [

            m("p.mg-5.tx-20", [
                m("i.fas.fa-user.mg-r-5.text-secondary"),
                DetallePedido.data.NOMBRE_PACIENTE,
            ]),
            m("p.mg-5.tx-15", [
                "Fecha Pedido: " + DetallePedido.data.FECHA_PEDIDO,
                ((Pedido.statusPedido === 2) ? [m("span.tx-indigo.tx-semibold", " Usuario: " + Auth.user.user)] : "")
            ]),
            m("p.mg-5", [
                m("span.badge.badge-primary.mg-r-5.tx-14",
                    "HC: " + DetallePedido.data.HC
                ),

            ]),

            m("p.mg-5", "Opciones Disponibles:"),
            m("hr.wd-100p.mg-t-0.mg-b-5"),
            m("p.mg-5.text-right", [
                m("button.btn.btn-xs.btn-primary.mg-l-2.mg-b-5.tx-semibold[type='button']", {
                    onclick: function () {
                        Pedido.ver = true;
                        Pedido.editar = false;
                        Pedido.entregar = false;
                        Pedido.enviar = false;
                        Pedido.nuevoMensaje = false;
                        Pedido.labelOperation = "Detalle:";
                    },
                }, [
                    m("i.fas.fa-file-alt.mg-r-5",)
                ], "Ver Detalle"),
                m("button.btn.btn-xs.btn-primary.mg-l-2.mg-b-5.tx-semibold[type='button']", {
                    onclick: function () {
                        Pedido.ver = false;
                        Pedido.editar = false;
                        Pedido.entregar = true;
                        Pedido.enviar = false;
                        Pedido.nuevoMensaje = false;
                        Pedido.labelOperation = "Enviar Muestras:";
                        EditarMuestras.status = "Enviada";

                    },
                }, [
                    m("i.fas.fa-user-edit.mg-r-5",)
                ], "Enviar Muestras"),

                m("button.btn.btn-xs.btn-primary.mg-l-2.mg-b-5.tx-semibold[type='button']", {
                    onclick: function () {
                        Pedido.ver = false;
                        Pedido.editar = false;
                        Pedido.entregar = false;
                        Pedido.enviar = false;
                        Pedido.nuevoMensaje = true;
                        Pedido.labelOperation = "Nuevo Mensaje:";


                    },
                }, [
                    m("i.fas.fa-paper-plane.mg-r-5",)
                ], "Enviar Mensaje")
            ]),
            m("p.mg-5", [
                m("span.badge.badge-light.wd-100p.tx-14",
                    Pedido.labelOperation
                ),
            ]),
            m("p.mg-5." + ((Pedido.ver || Pedido.nuevoMensaje) ? "" : "d-none"), [
                m(DetallePedido)
            ]),
            m("p.mg-5.d-none", [
                m(EditarPedido)
            ]),

            m("hr.wd-100p.mg-t-0.mg-b-5"),
            m("p.mg-5." + ((Pedido.entregar || Pedido.enviar) ? "" : "d-none"), [
                m(EditarMuestras),

            ]),
            m("p.mg-5." + ((Pedido.ver) ? "" : "d-none"), [
                m("span.badge.badge-light.wd-100p.tx-14",
                    "Historial de Mensajes",
                ),
                m(MensajesPedido),

            ]),
            m("p.mg-5." + ((Pedido.nuevoMensaje) ? "" : "d-none"), [
                m("span.badge.badge-light.wd-100p.tx-14",
                    "Nuevo Mensaje:",
                ),
                m("textarea.form-control.mg-t-5[rows='5'][placeholder='Nuevo Mensaje']", {
                    oninput: function (e) { MensajesPedido.messagePedido = e.target.value; },
                    value: MensajesPedido.messagePedido,
                }),
                m("div.mg-0.mg-t-5.text-right", [

                    m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                        onclick: function () {
                            if (MensajesPedido.messagePedido.length !== 0) {
                                MensajesPedido.sendMessage();
                            } else {
                                alert("Nuevo Mnesaje es obligatorio.");
                            }
                        },
                    }, [
                        m("i.fas.fa-paper-plane.mg-r-5",)
                    ], "Enviar"),


                ]),
            ]),
            m("hr.wd-100p.mg-t-0.mg-b-5"),




        ] : m("div.placeholder-paragraph.wd-100p", [
            m("div.line"),
            m("div.line")
        ])
    }
}

const VerPedidoEnfermeriaEmergencia = {
    idPedido: null,
    oninit: (_data) => {
        App.isAuth();
        HeaderPrivate.page = "";
        SidebarEme.page = "";
        VerPedidoEnfermeriaEmergencia.idPedido = _data.attrs.idPedido;
        DetallePedido.data = [];
        DetallePedido.detalle = [];
        EditarPedido.detalle = [];
    },
    oncreate: () => {
        document.title = "Detalle Pedido N°: " + VerPedidoEnfermeriaEmergencia.idPedido + " | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("emergencia") }),
            m(SidebarEme),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "Metrovirtual"
                            ])


                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                "Laboratorio"
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio/pedidos" }, [
                                "Pedidos de Laboratorio"
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Detalle"
                        )
                    ]),
                    m("h1.df-title",
                        "Detalle de Pedido N°: " + VerPedidoEnfermeriaEmergencia.idPedido
                    ),

                    m("div.row.tx-14", [

                        m("div.col-12",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                                m("div.mg-b-25",
                                    m("i.tx-60.fas.fa-file." + Pedido.classPedido)
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Detalle de Pedido N°: " + VerPedidoEnfermeriaEmergencia.idPedido + " - Status: " + Pedido.descPedido
                                ),
                                m(Pedido)

                            ])
                        ),

                    ]),

                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Notificaciones"
                ),
                m("nav.nav.flex-column[id='navSection']", [
                    m(ListaNotitifaciones)
                ])
            ])
        ];
    },

};

const NumeroMuestras = {
    numero: 0,
    items: [],
    oninit: (_data) => {

        var _idC = _data.attrs._id;

        console.log('idc', _idC)


        NumeroMuestras.items[_idC] = {
            numero: 0,
        };

    },
    view: (_data) => {

        var _idC = _data.attrs._id;

        return [
            m("div.card.text-right",
                m("div.card-body", [
                    m("h5.card-title",
                        NumeroMuestras.items[_idC].numero
                    ),
                    m("button.btn.btn-xs.btn-outline-light.tx-semibold.mg-b-5[type='button']", {
                        onclick: () => {
                            NumeroMuestras.items[_idC].numero = (NumeroMuestras.items[_idC].numero + 1);
                        }
                    },
                        "+"
                    ),
                    m("button.btn.btn-xs.btn-outline-light.tx-semibold.mg-b-5[type='button']", {
                        onclick: () => {
                            NumeroMuestras.items[_idC].numero = (NumeroMuestras.items[_idC].numero - 1);
                        }
                    },
                        "-"
                    ),
                ])
            ),



        ]


    }
};

const EditarMuestras = {
    user: "",
    status: "",
    detalle: [],
    error: "",
    observaciones: "",
    checkedAll: false,
    muestras: { "1": "Orina", "2": "Heces", "3": "Tubo Rojo", "4": "Tubo Lila", "5": "Tubo Celeste", "6": "Tubo Verde", "7": "Tubo Negro", "8": "LCR", "9": "Esputo", "10": "Jeringuilla", "11": "Gasometria", "12": "Secreciones", "13": "Culturetes", "14": "Frascos de Cultivo", "15": "Isopado", "16": "Estrep Test", "17": "AmniSure", "18": "Tubo Liquidos" },
    oninit: () => {
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/send-pedido-eme-lab/" + VerPedidoEnfermeriaEmergencia.idPedido,
            body: {
                dataPedido: EditarMuestras.muestras,
                statusPedido: Pedido.statusPedido,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                if (result.status) {
                    Pedido.statusPedido = result.statusPedido;
                    EditarMuestras.detalle = result.data;
                    EditarMuestras.validarStatus();

                }
            })
            .catch(function (e) {
                EditarMuestras.error = e.message;
            })
    },
    view: () => {

        if (EditarMuestras.detalle.length !== 0) {
            return [
                m("div.custom-control.custom-checkbox.tx-18", [
                    m("input.custom-control-input[type='checkbox'][id='selectTodosMuestra']", {
                        checked: EditarMuestras.checkedAll,
                        onclick: function (e) {
                            EditarMuestras.seleccionarTodos(this.checked);
                        }
                    }),
                    m("label.custom-control-label.tx-semibold[for='selectTodosMuestra']", "SELECCIONAR TODOS")
                ]),
                m("hr.wd-100p.mg-t-0.mg-b-5"),

                Object.keys(EditarMuestras.detalle).map(function (_i) {

                    var _idC = EditarMuestras.muestras[_i].toLowerCase().replaceAll(" ", "_");


                    if (EditarMuestras.detalle[_i].indexOf("...") !== -1) {


                        (NumeroMuestras.items[_idC] !== undefined) ? [
                            NumeroMuestras.items[_idC].numero = parseFloat(EditarMuestras.detalle[_i].split("...")[2])
                        ] : [];

                        return [
                            m(NumeroMuestras, {
                                _id: _idC
                            }),


                            m("div.pd-25.custom-control.custom-checkbox.tx-18", [


                                m("input.custom-control-input[type='checkbox'][id='" + EditarMuestras.detalle[_i].toLowerCase().replaceAll(" ", "_") + "']", {
                                    checked: true,
                                    onclick: function (e) {
                                        if (!this.checked) {
                                            Pedido.statusPedido = 1;
                                            EditarMuestras.checkedAll = false;
                                            EditarMuestras.detalle[_i] = EditarMuestras.muestras[_i];
                                            NumeroMuestras.items[EditarMuestras.muestras[_i].toLowerCase().replaceAll(" ", "_")].numero = 0;

                                        }
                                        EditarMuestras.updateDataMuestras();
                                    },
                                    onupdate: (e) => {
                                        (EditarMuestras.detalle[_i].indexOf("...") !== -1) ? EditarMuestras.muestras[_i] + EditarMuestras.detalle[_i].split("...")[1] : EditarMuestras.muestras[_i];
                                    },

                                }),
                                m("label.custom-control-label[for='" + EditarMuestras.detalle[_i].toLowerCase().replaceAll(" ", "_") + "']",
                                    (EditarMuestras.detalle[_i].indexOf("...") !== -1) ? EditarMuestras.muestras[_i] + EditarMuestras.detalle[_i].split("...")[1] : EditarMuestras.detalle[_i],
                                )
                            ]),
                            m("hr.wd-100p.mg-t-0.mg-b-5"),


                        ]

                    } else {

                        return [
                            m(NumeroMuestras, {
                                _id: _idC
                            }),
                            m("div.pd-25.custom-control.custom-checkbox.tx-18", [


                                m("input.custom-control-input[type='checkbox'][id='" + EditarMuestras.detalle[_i].toLowerCase().replaceAll(" ", "_") + "']", {
                                    onclick: function (e) {
                                        if (this.checked) {
                                            Pedido.statusPedido = 2;
                                            EditarMuestras.detalle[_i] = EditarMuestras.muestras[_i] + " ... - " + EditarMuestras.status + ": " + moment().format('DD-MM-YYYY HH:mm') + " ... " + NumeroMuestras.items[_idC].numero;
                                        }
                                        EditarMuestras.updateDataMuestras();

                                    },
                                    onupdate: (e) => {

                                        (EditarMuestras.detalle[_i].indexOf("...") !== -1) ? EditarMuestras.muestras[_i] + EditarMuestras.detalle[_i].split("...")[1] : EditarMuestras.muestras[_i];
                                    },
                                }),
                                m("label.custom-control-label[for='" + EditarMuestras.detalle[_i].toLowerCase().replaceAll(" ", "_") + "']",
                                    EditarMuestras.detalle[_i]

                                )
                            ]),
                            m("hr.wd-100p.mg-t-0.mg-b-5"),


                        ]
                    }

                })

            ]
        }


    },
    seleccionarTodos: (status) => {

        if (status) {
            Pedido.statusPedido = 2;
            EditarMuestras.checkedAll = true;
        } else {
            Pedido.statusPedido = 1;
            EditarMuestras.checkedAll = false;
        }

        return [
            Object.keys(EditarMuestras.detalle).map(function (_i) {

                let _id = EditarMuestras.detalle[_i].toLowerCase().replaceAll(" ", "_");

                if (status) {
                    EditarMuestras.detalle[_i] = EditarMuestras.muestras[_i] + " ... - " + EditarMuestras.status + ": " + moment().format('DD-MM-YYYY HH:mm');
                    document.getElementById(_id).checked = true;
                } else {
                    EditarMuestras.detalle[_i] = EditarMuestras.muestras[_i];
                    document.getElementById(_id).checked = false;
                }



            }),
            EditarMuestras.updateDataMuestras()
        ]


    },
    validarStatus: () => {

        if (Pedido.statusPedido == 1) {
            Pedido.classPedido = "tx-gray-500";
            Pedido.descPedido = "Pendiente";
        }

        if (Pedido.statusPedido == 2) {
            Pedido.classPedido = "tx-primary";
            Pedido.descPedido = "Gestionado";
        }

        let _val = 0;

        Object.keys(EditarMuestras.detalle).map(function (_i) {

            if (!(EditarMuestras.detalle[_i].indexOf("...") !== -1)) {

                _val = (_val + 1);


                if (Object.keys(EditarMuestras.detalle).length === _val) {

                    if (_val === Object.keys(EditarMuestras.detalle).length) {
                        Pedido.statusPedido == 1
                        Pedido.classPedido = "tx-gray-500";
                        Pedido.descPedido = "Pendiente";

                    }
                }

            } else {
                Pedido.statusPedido = 2;
                Pedido.classPedido = "tx-primary";
                Pedido.descPedido = "Gestionado";

            }

        })
    },
    updateDataMuestras: () => {

        return [
            EditarMuestras.validarStatus(),
            m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/up-pedido-eme-lab/" + VerPedidoEnfermeriaEmergencia.idPedido,
                body: {
                    dataPedido: EditarMuestras.detalle,
                    statusPedido: Pedido.statusPedido

                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            }).then(function (result) {
                if (result.status) {

                    EditarMuestras.detalle = result.data;
                    EditarMuestras.validarStatus();



                }
            }).catch(function (e) {
                EditarMuestras.error = e.message;
            })
        ]




    },
};


function loadNotificaciones() {


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
    var table = $("#table-notificaciones").DataTable({
        data: ListaNotitifaciones.data,
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
            mRender: function (data, type, row, meta) {
                return "";
            },
            visible: true,
            width: "100%",
            aTargets: [0],
            orderable: false,
        },

        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) { },
        drawCallback: function (settings) {
            settings.aoData.map(function (_v, _i) {
                m.mount(_v.anCells[0], {
                    view: function () {
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
                                    m("div.toast-header.bg-danger", [
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

};

function reloadNotificacion() {
    var table = $('#table-notificaciones').DataTable();
    table.clear();
    table.rows.add(ListaNotitifaciones.data).draw();

}




export default VerPedidoEnfermeriaEmergencia;