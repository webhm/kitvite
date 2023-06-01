import HeaderPrivate from '../../layout/header-private';
import Sidebarlab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';

const ListaNotitifaciones = {
    data: false,
    fetch: () => {
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/notificaciones-pedido/" + VerPedido.idPedido,
            })
            .then(function(result) {
                ListaNotitifaciones.data = result.data;
                loadNotificaciones();

            })
            .catch(function(e) {})
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
            return ListaNotitifaciones.data.map(function(_v, _i, _contentData) {

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
                url: "https://api.hospitalmetropolitano.org/t/v1/message-pedido/" + VerPedido.idPedido,
                body: {
                    dataPedido: DetallePedido.data,
                    message: MensajesPedido.messagePedido
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    MensajesPedido.messagePedido = "";
                    ListaNotitifaciones.fetch();
                    alert('Mensaje enviado con éxito.')
                    reloadNotificacion();
                }
            })
            .catch(function(e) {
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
                url: "https://api.hospitalmetropolitano.org/t/v1/ver-pedido-lab/" + VerPedido.idPedido,
            })
            .then(function(result) {
                DetallePedido.data = result.data;
                result.data.DESCRIPCION.map(function(_val, _i, _contentData) {
                    DetallePedido.detalle.push(_val);
                    EditarPedido.detalle.push(_val);
                    if (_val.indexOf("-R-") !== -1) {
                        DetallePedido.numPedido = (DetallePedido.numPedido + 1);
                    }
                })
            })
            .catch(function(e) {
                DetallePedido.error = e.message;
            })
    },
    view: () => {

        if (EditarPedido.detalle.length !== 0) {
            return DetallePedido.detalle.map(function(_val, _i, _contentData) {
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
                    onclick: function(e) {
                        EditarPedido.seleccionarTodos(this.checked);
                    }
                }),
                m("label.custom-control-label.tx-semibold[for='selectTodos']", "SELECCIONAR TODOS")
            ]),
            EditarPedido.detalle.map(function(_val, _i, _contentData) {



                if (_val.indexOf("...") !== -1) {



                    return m("div.custom-control.custom-checkbox", [
                        m("input.custom-control-input[type='checkbox'][id='" + VerPedido.idPedido + "-" + _i + "']", {
                            checked: true,
                            onclick: function(e) {
                                if (!this.checked) {
                                    EditarPedido.detalle[_i] = DetallePedido.detalle[_i];
                                    Pedido.statusPedido = 3;
                                    Pedido.classPedido = "tx-warning";
                                    Pedido.descPedido = "Muestras Pendientes";
                                    EditarPedido.checkedAll = false;

                                }
                                EditarPedido.udpateDataPedido();



                            },
                            onupdate: (e) => {
                                (EditarPedido.detalle[_i].indexOf("...") !== -1) ? DetallePedido.detalle[_i] + EditarPedido.detalle[_i].split("...")[1]: DetallePedido.detalle[_i];
                            },

                        }),
                        m("label.custom-control-label[for='" + VerPedido.idPedido + "-" + _i + "']",
                            (EditarPedido.detalle[_i].indexOf("...") !== -1) ? DetallePedido.detalle[_i] + EditarPedido.detalle[_i].split("...")[1] : DetallePedido.detalle[_i],
                        )
                    ])
                } else {


                    return m("div.custom-control.custom-checkbox", [
                        m("input.custom-control-input[type='checkbox'][id='" + VerPedido.idPedido + "-" + _i + "']", {

                            onclick: function(e) {
                                if (this.checked) {
                                    EditarPedido.detalle[_i] = DetallePedido.detalle[_i] + " ... - Muestra Recibida: " + moment().format('DD-MM-YYYY HH:mm');
                                }
                                EditarPedido.udpateDataPedido();

                            },
                            onupdate: (e) => {
                                (EditarPedido.detalle[_i].indexOf("...") !== -1) ? DetallePedido.detalle[_i] + EditarPedido.detalle[_i].split("...")[1]: DetallePedido.detalle[_i];
                            },

                        }),
                        m("label.custom-control-label[for='" + VerPedido.idPedido + "-" + _i + "']",
                            (EditarPedido.detalle[_i].indexOf("...") !== -1) ? DetallePedido.detalle[_i] + EditarPedido.detalle[_i].split("...")[1] : DetallePedido.detalle[_i],
                        )
                    ])
                }



            }),

        ]
    },
    oninit: () => {
        if (DetallePedido.detalle.length === DetallePedido.numPedido) {
            Pedido.statusPedido = 4;
            Pedido.descPedido = "Finalizado - Cancelado";
            Pedido.classPedido = "tx-success";
        }

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/send-pedido-lab/" + VerPedido.idPedido,
                body: {
                    dataPedido: DetallePedido.detalle,
                    statusPedido: Pedido.statusPedido,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {



                    EditarPedido.detalle = result.data;

                    if (result.statusPedido == null || result.statusPedido == 1) {
                        Pedido.statusPedido = 1;
                        Pedido.classPedido = "tx-gray-500";
                        Pedido.descPedido = "Pendiente";
                    }

                    if (result.statusPedido == 4) {
                        Pedido.statusPedido = 4;
                        Pedido.classPedido = "tx-success";
                        Pedido.descPedido = "Finalizado - Cancelado";
                    }

                    if (result.statusPedido !== 4) {
                        EditarPedido.validarStatus();
                    }

                    ListaNotitifaciones.fetch();


                }
            })
            .catch(function(e) {
                EditarPedido.error = e.message;
            })
    },
    udpateDataPedido: () => {
        EditarPedido.validarStatus();
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/up-pedido-lab/" + VerPedido.idPedido,
                body: {
                    dataPedido: EditarPedido.detalle,
                    statusPedido: Pedido.statusPedido

                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {

                    EditarPedido.detalle = result.data;
                    EditarPedido.validarStatus();



                }
            })
            .catch(function(e) {
                EditarPedido.error = e.message;
            })
    },
    sendNotiLab: () => {
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/noti-eme/" + VerPedido.idPedido,
                body: {
                    dataPedido: DetallePedido.data,
                    message: EditarPedido.observaciones
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    EditarPedido.observaciones = "";
                    ListaNotitifaciones.fetch();

                    alert('Mensaje enviado con éxito.')
                    reloadNotificacion();

                }
            })
            .catch(function(e) {
                EditarPedido.error = e.message;
            })
    },
    validarStatus: () => {
        let _np = 0;
        let _vp = 0;
        EditarPedido.detalle.map(function(_val, _i, _contentData) {



            if (_val.indexOf("...") !== -1) {
                _np = (_np + 1);
            } else {
                _vp = (_vp + 1);
            }

            if (EditarPedido.detalle.length === (_i + 1)) {
                if (EditarPedido.detalle.length === _np) {
                    Pedido.statusPedido = 2;
                    Pedido.classPedido = "tx-primary";
                    Pedido.descPedido = "Gestionado";
                    EditarPedido.checkedAll = true;

                }

                if (_vp > 0) {
                    Pedido.statusPedido = 3;
                    Pedido.classPedido = "tx-warning";
                    Pedido.descPedido = "Muestras Pendientes";
                    EditarPedido.checkedAll = false;
                }
            }
        })
    },
    seleccionarTodos: (status) => {

        if (status) {
            Pedido.statusPedido = 2;
            Pedido.classPedido = "tx-primary";
            Pedido.descPedido = "Gestionado";
            EditarPedido.checkedAll = true;

        } else {
            Pedido.statusPedido = 3;
            Pedido.classPedido = "tx-warning";
            Pedido.descPedido = "Muestras Pendientes";
            EditarPedido.checkedAll = false;

        }

        return EditarPedido.detalle.map(function(_val, _i, _contentData) {

            if (status) {
                EditarPedido.detalle[_i] = DetallePedido.detalle[_i] + " ... - Muestra Recibida: " + moment().format('DD-MM-YYYY HH:mm');
                document.getElementById(VerPedido.idPedido + "-" + _i).checked = true;
            } else {
                EditarPedido.detalle[_i] = DetallePedido.detalle[_i];
                document.getElementById(VerPedido.idPedido + "-" + _i).checked = false;
            }

            if (EditarPedido.detalle.length === (_i + 1)) {
                EditarPedido.udpateDataPedido();

            }

        })
    },

}

const Pedido = {
    ver: true,
    nuevoMensaje: false,
    editar: false,
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
            ]),
            m("p.mg-5", [
                m("span.badge.badge-primary.mg-r-5.tx-14",
                    "HC: " + DetallePedido.data.HC
                ),
                m("span.badge.badge-primary.mg-r-5.tx-14",
                    "HC: " + DetallePedido.data.HC
                ),
            ]),

            m("p.mg-5", "Opciones Disponibles:"),
            m("hr.wd-100p.mg-t-0.mg-b-5"),
            m("p.mg-5.text-right", [
                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                    onclick: function() {
                        Pedido.ver = true;
                        Pedido.editar = false;
                        Pedido.nuevoMensaje = false;
                        Pedido.labelOperation = "Detalle:";
                    },
                }, [
                    m("i.fas.fa-file-alt.mg-r-5", )
                ], "Ver Detalle"),
                m("button.btn.btn-xs.btn-success.mg-l-2.tx-semibold[type='button']", {
                    onclick: function() {
                        Pedido.ver = false;
                        Pedido.editar = true;
                        Pedido.nuevoMensaje = false;
                        Pedido.labelOperation = "Editar:";

                    },
                }, [
                    m("i.fas.fa-user-edit.mg-r-5", )
                ], "Recibir Muestras"),

                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                    onclick: function() {
                        Pedido.ver = false;
                        Pedido.editar = false;
                        Pedido.nuevoMensaje = true;
                        Pedido.labelOperation = "Nuevo Mensaje:";

                    },
                }, [
                    m("i.fas.fa-paper-plane.mg-r-5", )
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
            m("p.mg-5." + ((Pedido.editar) ? "" : "d-none"), [
                m(EditarPedido)
            ]),
            m("hr.wd-100p.mg-t-0.mg-b-5"),
            m("p.mg-5." + ((Pedido.editar) ? "" : "d-none"), [
                m("span.badge.badge-light.wd-100p.tx-14",
                    "Observaciones: ",
                ),
                m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                    oninput: function(e) { EditarPedido.observaciones = e.target.value; },
                    value: EditarPedido.observaciones,
                }),
                m("div.mg-0.mg-t-5.text-right", [

                    m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                        onclick: function() {
                            if (EditarPedido.observaciones.length !== 0) {
                                EditarPedido.sendNotiLab();
                            } else {
                                alert("Observaciones es obligatorio.");
                            }
                        },
                    }, [
                        m("i.fas.fa-paper-plane.mg-r-5", )
                    ], "Guardar y Notificar"),


                ]),
                m("hr.wd-100p.mg-t-5.mg-b-5"),

            ]),
            m("p.mg-5." + ((Pedido.ver) ? "" : "d-none"), [
                m("span.badge.badge-light.wd-100p.tx-14",
                    "Historial de Mensajes",
                ),
                m(MensajesPedido)
            ]),
            m("hr.wd-100p.mg-t-0.mg-b-5"),
            m("p.mg-5." + ((Pedido.nuevoMensaje) ? "" : "d-none"), [
                m("span.badge.badge-light.wd-100p.tx-14",
                    "Nuevo Mensaje:",
                ),
                m("textarea.form-control.mg-t-5[rows='5'][placeholder='Nuevo Mensaje']", {
                    oninput: function(e) { MensajesPedido.messagePedido = e.target.value; },
                    value: MensajesPedido.messagePedido,
                }),
                m("div.mg-0.mg-t-5.text-right", [

                    m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                        onclick: function() {
                            if (MensajesPedido.messagePedido.length !== 0) {
                                MensajesPedido.sendMessage();
                            } else {
                                alert("Nuevo Mnesaje es obligatorio.");
                            }
                        },
                    }, [
                        m("i.fas.fa-paper-plane.mg-r-5", )
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

const VerPedido = {
    idPedido: null,
    oninit: (_data) => {
        HeaderPrivate.page = "";
        Sidebarlab.page = "";
        VerPedido.idPedido = _data.attrs.idPedido;
        DetallePedido.data = [];
        DetallePedido.detalle = [];
        EditarPedido.detalle = [];
    },
    oncreate: () => {
        document.title = "Detalle Pedido N°: " + VerPedido.idPedido + " | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(Sidebarlab),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m("a[href='#']",
                                "Metrovirtual"
                            )
                        ),
                        m("li.breadcrumb-item",
                            m("a", { href: "#!/laboratorio" },
                                "Laboratorio"
                            )
                        ),
                        m("li.breadcrumb-item",
                            m("a", { href: "#!/laboratorio/pedidos" },
                                "Pedidos de Laboratorio"
                            )
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Detalle"
                        )
                    ]),
                    m("h1.df-title",
                        "Detalle de Pedido N°: " + VerPedido.idPedido
                    ),

                    m("div.row.tx-14", [

                        m("div.col-12",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                                m("div.mg-b-25",
                                    m("i.tx-60.fas.fa-file." + Pedido.classPedido)
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Detalle de Pedido N°: " + VerPedido.idPedido + " - Status: " + Pedido.descPedido
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




export default VerPedido;