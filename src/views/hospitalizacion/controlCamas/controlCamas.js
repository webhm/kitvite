import HeaderPrivate from '../../layout/header-private';
import SidebarHospital from '../sidebarHospital';
import App from '../../app';
import m from 'mithril';

const iCama = {

    view: (_data) => {
        return [
            m("p.mg-0", [
                m("div.tx-12",
                    m("span.wd-10p", {
                        class: "badge badge-primary mg-l-5 mg-r-5",
                    }, [], _data.attrs.HABITACION_GEMA),
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "NHC"),
                    _data.attrs.NHCL,
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "ADM"),
                    _data.attrs.ADMISION_GEMA,
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "PACIENTE"),
                    _data.attrs.NOMBRE_GEMA,
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "ESTADO GEMA"),
                    _data.attrs.ESTADO_GEMA,
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "ESTADO MV"),
                    _data.attrs.ESTADO_MV,

                )
            ]),

        ];
    },

};

const iCamasTotales = {

    view: (_data) => {


        return [
            m("p.mg-0", [
                m("div.tx-12",
                    (_data.attrs.DIFERENCIA == 1 ? [m("span", {
                        class: "badge badge-danger mg-l-5 mg-r-5",
                        title: "Diferencia"
                    }, [], "X")] : []),
                    (_data.attrs.TIPO !== 'CAMAS TOTAL' ? [m("span.wd-20p", {
                        class: "badge badge-primary mg-l-5 mg-r-5",
                    }, [], _data.attrs.TIPO)] : []),
                    (_data.attrs.NOMBRE_GEMA !== null ? [m("span.wd-100p", {
                        class: "badge badge-primary mg-l-5 mg-r-5",
                    }, [], "NOMBRE GEMA: " + _data.attrs.NOMBRE_GEMA)] : []),


                    m("span.wd-10p", {
                        class: "badge badge-primary mg-l-5 mg-r-5",
                    }, [], _data.attrs.HABITACION_GEMA),
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "NHC"),
                    _data.attrs.NHCL,
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "ESTADO GEMA"),
                    _data.attrs.ESTADO_GEMA,

                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "ESTADO MV"),
                    _data.attrs.ESTADO_MV,
                    (_data.attrs.NOMBRE_MV !== null ? [m("span.wd-100p", {
                        class: "badge badge-dark mg-l-5 mg-r-5",
                    }, [], "NOMBRE MV: " + _data.attrs.NOMBRE_MV)] : []),

                )
            ]),

        ];
    },

};

const iPendienteAlta = {

    view: (_data) => {
        return [
            m("p.mg-0", [
                m("div.tx-12",
                    m("span.wd-10p", {
                        class: "badge badge-danger mg-l-5 mg-r-5",
                    }, _data.attrs.HABITACION_MV),

                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "NHC"),
                    _data.attrs.NHCL,
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "ATENCION MV"),
                    _data.attrs.ATENCION_MV,
                    (_data.attrs.NOMBRE_MV !== null ? [m("span.wd-100p", {
                        class: "badge badge-primary mg-l-5 mg-r-5",
                    }, [], _data.attrs.NOMBRE_MV)] : []),



                )
            ]),

        ];
    },

};

const iSeccionCama = {

    view: (_data) => {
        return [
            m("p.mg-5", [
                m("span.badge.badge-light.wd-100p.tx-14",
                    "Registro de Insumos"
                ),
            ]),

        ];
    },

};

const StatusPedido = {
    error: "",
    data: [],
    dataMuestras: [],
    fetch: () => {

        StatusPedido.error = "";
        StatusPedido.data = [];

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/status-pedido-lab",
                body: {
                    numeroPedido: VerPedido.numeroPedido,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {

                    StatusPedido.data = result.data;
                    VerPedido.data = result.data[0];
                    VerPedido.validarStatus();

                } else {
                    StatusPedido.error = result.message;
                }

            })
            .catch(function(e) {

            })

    },


};

const Insumos = {
    tuboLila: 1,
    tuboRojo: 1,
    tuboCeleste: 1,
    tuboNegro: 1,
    tuboVerde: 1,
    gsav: 1,
    hemocultivo: 1,
    qtb: 1
};

const DetallePedido = {
    checkedAll: false,
    seleccionarTodos: (status) => {

        DetallePedido.checkedAll = status;
        var _fechaToma = moment().format('DD-MM-YYYY HH:mm');


        return StatusPedido.data.map(function(_val, _i, _contentData) {
            if (status) {
                StatusPedido.data[_i]['STATUS_TOMA'] = _fechaToma;
                StatusPedido.data[_i]['customCheked'] = true;
                DetallePedido.udpateStatusTomaMuestra(StatusPedido.data[_i]['CD_EXA_LAB'], 1);

            } else {
                StatusPedido.data[_i]['STATUS_TOMA'] = "";
                StatusPedido.data[_i]['customCheked'] = false;
                DetallePedido.udpateStatusTomaMuestra(StatusPedido.data[_i]['CD_EXA_LAB'], 2);


            }
        })
    },
    udpateStatusTomaMuestra: (cod_exa_lab, sts) => {
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/up-status-pedido-lab",
                body: {
                    numeroPedido: VerPedido.numeroPedido,
                    cod_exa_lab: cod_exa_lab,
                    sts: sts
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                console.log(result)
                VerPedido.validarStatus();
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
                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                    m("div.mg-b-30",
                        m("i.tx-60.fas.fa-file." + VerPedido.classPedido)
                    ),

                    m("h5.tx-inverse.mg-b-10",
                        "Detalle de Pedido N°: " + VerPedido.numeroPedido + " - Status: " + VerPedido.descSstatusPedido
                    ),
                    ((VerPedido.data.TIPO_PEDIDO == 'R') ? [
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
                    m("p.mg-5.tx-20.mg-t-10", [
                        m("i.fas.fa-user.mg-r-8.text-secondary"),
                        VerPedido.data.PTE_MV

                    ]),
                    m("p.mg-5.tx-15", [
                        "Fecha Pedido: ",
                        VerPedido.data.FECHA_TOMA

                    ]),
                    m("p.mg-5.tx-15", [
                        "Médico: ",
                        VerPedido.data.MED_MV,

                    ]),
                    m("p.mg-5.tx-15", [
                        "Ubicaciòn: ",
                        VerPedido.data.SECTOR,
                        ": ",
                        VerPedido.data.CAMA,

                    ]),
                    m("p.mg-5", [
                        "Historía Clínica: ",



                    ]),
                    m("p.mg-5", [
                        m("span.badge.badge-primary.mg-r-5.tx-14",
                            "GEMA: " + VerPedido.data.HC_MV + "01",
                        ),
                        m("span.badge.badge-success.mg-r-5.tx-14",
                            "MV: " + VerPedido.data.HC_MV
                        ),
                    ]),
                    m("ul.nav.nav-tabs.mg-t-15[id='myTab'][role='tablist']", [
                        m("li.nav-item",
                            m("a.nav-link.active[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']",
                                "Detalle Pedido"
                            )
                        ),
                        m("li.nav-item",
                            m("a.nav-link[id='profile-tab'][data-toggle='tab'][href='#profile'][role='tab'][aria-controls='profile'][aria-selected='false']",
                                "Toma de Muestras"
                            )
                        ),

                    ]),
                    m(".tab-content.bd.bd-gray-300.bd-t-0.pd-20.mg-t-10[id='myTabContent']", [
                        m(".tab-pane.fade.show.active[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                            (StatusPedido.error ? [
                                m("p.mg-0",
                                    StatusPedido.error
                                )
                            ] : StatusPedido.data !== undefined && StatusPedido.data.length !== 0 ? [
                                m("h6",
                                    "Detalle Pedido:"
                                ),
                                m("div.table-responsive",
                                    m("table.table.table-dashboard.mg-b-0", [
                                        m("thead",
                                            m("tr", [
                                                m("th",
                                                    "FECHA PROGRAMADA"
                                                ),
                                                m("th",
                                                    "FECHA TOMA MUESTRA"
                                                ),
                                                m("th",
                                                    "FECHA RECEP. LAB."
                                                ),
                                                m("th.text-right",
                                                    "EXAMEN"
                                                ),
                                            ])
                                        ),
                                        m("tbody", [
                                            StatusPedido.data.map(function(_val, _i, _contentData) {
                                                return [
                                                    m("tr", [
                                                        m("td.tx-color-03.tx-normal",
                                                            _val.FECHA_TOMA + " " + _val.HORA_TOMA
                                                        ),
                                                        m("td.tx-color-03.tx-normal",
                                                            (_val.STATUS_TOMA.length !== 0) ? _val.STATUS_TOMA : "Pendiente"
                                                        ),
                                                        m("td.tx-color-03.tx-normal",
                                                            (_val.STATUS_TOMA.length !== 0) ? _val.STATUS_TOMA : "Pendiente"
                                                        ),
                                                        m("td.tx-medium.text-right",
                                                            _val.NM_EXA_LAB
                                                        ),



                                                    ]),
                                                ]
                                            })
                                        ])
                                    ])
                                )


                            ] : m("div.placeholder-paragraph.wd-100p", [
                                m("div.line"),
                                m("div.line")
                            ]))
                        ]),
                        m(".tab-pane.fade[id='profile'][role='tabpanel'][aria-labelledby='profile-tab']", [
                            m("p.mg-5", [
                                m("span.badge.badge-light.wd-100p.tx-14",
                                    "Registro de Toma de Muestras"
                                ),
                            ]),
                            m("div.table-responsive.mg-b-10.mg-t-10",
                                m("table.table.table-dashboard.table-hover.mg-b-0", [
                                    m("thead",
                                        m("tr", [
                                            m("th.text-left",
                                                "EXAMEN"
                                            ),
                                            m("th",
                                                "FECHA DE TOMA DE MUESTRA"
                                            ),

                                        ])
                                    ),
                                    m("tbody", [
                                        m("tr.d-none", [
                                            m("td.tx-normal",
                                                m("div.custom-control.custom-checkbox", [
                                                    m("input.custom-control-input[type='checkbox'][id='selectTomaTodos']", {

                                                        checked: DetallePedido.checkedAll,
                                                        onclick: function(e) {
                                                            DetallePedido.seleccionarTodos(this.checked);
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
                                                                        StatusPedido.data[_i]['STATUS_TOMA'] = moment().format('DD-MM-YYYY HH:mm');
                                                                        DetallePedido.udpateStatusTomaMuestra(_val.CD_EXA_LAB, 1);

                                                                    } else {
                                                                        this.checked = false;;

                                                                        DetallePedido.checkedAll = false;
                                                                        StatusPedido.data[_i]['STATUS_TOMA'] = "";
                                                                        DetallePedido.udpateStatusTomaMuestra(_val.CD_EXA_LAB, 2);
                                                                    }



                                                                },



                                                            }),
                                                            m("label.custom-control-label.tx-16[for='" + _val.CD_EXA_LAB + "']",
                                                                (StatusPedido.data[_i]['STATUS_TOMA'].length !== 0) ? StatusPedido.data[_i]['STATUS_TOMA'] : StatusPedido.data[_i]['STATUS_TOMA'],

                                                            )
                                                        ])
                                                    ),



                                                ]),
                                            ]





                                        })


                                    ])
                                ])
                            ),
                            m("p.mg-5", [
                                m("span.badge.badge-light.wd-100p.tx-14",
                                    "Registro de Insumos"
                                ),
                            ]),
                            m("div.table-responsive.mg-b-10.mg-t-10",
                                m("table.table.table-dashboard.table-hover.mg-b-0", [
                                    m("thead",
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
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='tuboLila']"),
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
                                                                el.dom.innerText = Insumos.tuboLila;
                                                            },
                                                            onupdate: (el) => {
                                                                el.dom.innerText = Insumos.tuboLila;
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
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='tuboRojo']"),
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
                                                                el.dom.innerText = Insumos.tuboRojo;
                                                            },
                                                            onupdate: (el) => {
                                                                el.dom.innerText = Insumos.tuboRojo;
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
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='tuboCeleste']"),
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
                                                                el.dom.innerText = Insumos.tuboCeleste;
                                                            },
                                                            onupdate: (el) => {
                                                                el.dom.innerText = Insumos.tuboCeleste;
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
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='tuboNegro']"),
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
                                                                el.dom.innerText = Insumos.tuboNegro;
                                                            },
                                                            onupdate: (el) => {
                                                                el.dom.innerText = Insumos.tuboNegro;
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
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='tuboVerde']"),
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
                                                                el.dom.innerText = Insumos.tuboVerde;
                                                            },
                                                            onupdate: (el) => {
                                                                el.dom.innerText = Insumos.tuboVerde;
                                                            }

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
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='gsav']"),
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
                                                                el.dom.innerText = Insumos.gsav;
                                                            },
                                                            onupdate: (el) => {
                                                                el.dom.innerText = Insumos.gsav;
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
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='hemocultivo']"),
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
                                                                el.dom.innerText = Insumos.hemocultivo;
                                                            },
                                                            onupdate: (el) => {
                                                                el.dom.innerText = Insumos.hemocultivo;
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
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='qtb']"),
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
                                                                el.dom.innerText = Insumos.qtb;
                                                            },
                                                            onupdate: (el) => {
                                                                el.dom.innerText = Insumos.qtb;
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
                        ]),

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

const VerPedido = {
    numeroPedido: "",
    numeroHistoriaClinica: "",
    track: "",
    data: [],
    classPedido: "",
    descSstatusPedido: "",
    validarStatus: () => {


        for (var i = 0; i < StatusPedido.data.length; i++) {
            if (StatusPedido.data[i]['STATUS_TOMA'].length !== 0) {
                StatusPedido.data[i]['customCheked'] = true;
            }
        }

        var _r = 0;
        var _t = 0;

        for (var i = 0; i < StatusPedido.data.length; i++) {

            if (StatusPedido.data[i]['STATUS_RESULTADO'].length !== 0) {
                _r++;
            }

            if (StatusPedido.data[i]['STATUS_TOMA'].length !== 0) {
                _t++;
            }

        }

        // Set State

        if (StatusPedido.data.length !== _t && StatusPedido.data.length !== _r) {
            VerPedido.classPedido = "tx-warning"
            VerPedido.descSstatusPedido = "Muestras Pendientes";
        }

        if (StatusPedido.data.length == _t && StatusPedido.data.length !== _r) {
            DetallePedido.checkedAll = true;
            VerPedido.classPedido = "tx-orange"
            VerPedido.descSstatusPedido = "Pendiente Resultado";
        }

        if (StatusPedido.data.length == _t && StatusPedido.data.length == _r) {
            DetallePedido.checkedAll = true;
            VerPedido.classPedido = "tx-success"
            VerPedido.descSstatusPedido = "Finalizado - Gestionado";
        }


        /*

        if (_t == StatusPedido.data.length) {
            DetallePedido.checkedAll = true;
            VerPedido.classPedido = "tx-orange";
            VerPedido.descSstatusPedido = "Pendiente Resultado";
            $("#pedido_" + VerPedido.numeroPedido).parent().parent().remove();

        }


        */








    },
    view: () => {

        return [

            m("div.animated.fadeInUp", {
                class: (ControlCamas.showBitacora.length !== 0 ? "" : "d-none")
            }, [
                m(DetallePedido)
            ])

        ]

    },

};

function stopwatchModel() {
    return {
        interval: null,
        seconds: 89,
        isPaused: false
    };
}

const actions = {
    increment(model) {
        model.seconds--;
        if (model.seconds == 0) {
            window.location.reload();
        }
        m.redraw();
    },
    start(model) {
        model.interval = setInterval(actions.increment, 1000, model);
    },
    stop(model) {
        model.interval = clearInterval(model.interval);
    },
    reset(model) {
        model.seconds = 0;
    },
    toggle(model) {
        if (model.isPaused) {
            actions.start(model);
        } else {
            actions.stop(model);
        }
        model.isPaused = !model.isPaused;
    }
};

function Stopwatch() {
    const model = stopwatchModel();
    actions.start(model);
    return {
        view() {
            return [
                m("div.mg-t-30.mg-b-20", [
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                        m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                            "Este reporte se actualiza automaticamente en:"
                        ),

                    ]),
                    m("div.d-flex.justify-content-between.mg-b-5", [
                        m("h5.tx-normal.tx-rubik.mg-b-0",
                            model.seconds + "s."
                        ),
                        m("h5.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                            m("small.pd-2.tx-15",
                                (model.isPaused ? [m("i.fas.fa-play", {
                                    onclick() {
                                        actions.toggle(model);
                                    }
                                })] : [m("i.fas.fa-pause", {
                                    onclick() {
                                        actions.toggle(model);
                                    }
                                })])

                            )
                        )
                    ]),
                    m("div.progress.ht-4.mg-b-0.op-5",
                        m(".progress-bar.bg-primary.[role='progressbar'][aria-valuenow='" + model.seconds + "'][aria-valuemin='0'][aria-valuemax='60']", {
                            oncreate: (el) => {
                                el.dom.style.width = "100%";

                            },
                            onupdate: (el) => {
                                el.dom.style.width = model.seconds + "%";

                            },

                        })
                    )
                ]),

            ];
        },
        onremove() {
            actions.stop(model);
        }
    };
}



const ControlCamas = {
    dataPendientesAlta: [],
    dataSoloGema: [],
    dataGemaMV: [],
    dataCamaTotales: [],
    camasTotales: 0,
    showBitacora: "",
    gemaMV: 0,
    soloGema: 0,
    soloMV: 0,
    pendienteAlta: 0,
    timerUpdate: 0,
    oninit: (_data) => {
        if (isObjEmpty(_data.attrs)) {
            ControlCamas.showBitacora = "";
        } else {
            ControlCamas.showBitacora = "d-none";
            VerPedido.numeroPedido = _data.attrs.numeroPedido;
        }
        HeaderPrivate.page = "";
        SidebarHospital.page = "";
        ControlCamas.dataPendientesAlta = [];
        ControlCamas.dataCamaTotales = [];
        ControlCamas.camasTotales = 0;
        ControlCamas.pendienteAlta = 0;
        App.isAuth('hospitalizacion', 17);
    },
    oncreate: (_data) => {

        document.title = "Caja Recepción Turnos | " + App.title;
        if (isObjEmpty(_data.attrs)) {
            loadControlCamas();
            loadControlStatusCamas();
        } else {
            StatusPedido.fetch();
        }
    },
    onupdate: (_data) => {
        if (isObjEmpty(_data.attrs)) {
            ControlCamas.showBitacora = "";

        } else {
            ControlCamas.showBitacora = "d-none";
        }
    },
    view: (_data) => {

        var _fechaHoy_ = moment().format('DD-MM-YYYY');

        if (isObjEmpty(_data.attrs)) {
            ControlCamas.showBitacora = "";
        } else {
            ControlCamas.showBitacora = "d-none";
        }

        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("hospitalizacion") }),
            m(SidebarHospital, { oncreate: SidebarHospital.setPage(17) }),
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }

                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " Metrovirtual "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/hospitalizacion" }, [
                                " Hospitalización "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Control de Camas GEMA-MV:"
                        ),
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Control de Camas GEMA-MV:"
                    ),
                    m("p.mg-b-20.tx-14.d-none", {
                            class: (_data.attrs.numeroPedido == undefined) ? "" : "d-none"

                        }, [
                            m("i.fas.fa-info-circle.mg-r-5.text-secondary"),
                            "Buscar por apellidos y nombres de paciente, historia clínica y número de pedido.",

                        ]

                    ),
                    m("div.d-lg-none.d-md-block.mg-t-10.mg-b-10.bg-white",
                        m("div.col-12.mg-t-30.mg-lg-t-0",
                            m("div.row", [
                                m("div.col-sm-6.col-lg-12.mg-t-30.mg-sm-t-0.mg-lg-t-30", [

                                    m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                                        m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                                            "Pendiente Alta"
                                        ),
                                        m("span.tx-10.tx-color-04",
                                            "Hoy, " + _fechaHoy_
                                        )
                                    ]),
                                    m("div.d-flex.align-items-end.justify-content-between.mg-b-5", [
                                        (ControlCamas.pendienteAlta == 0) ? [m("h5.tx-normal.tx-rubik.lh-2.mg-b-0", "0 Paciente(s)"), ] : [m("h5.tx-normal.tx-rubik.lh-2.mg-b-0", {
                                            oncreate: (el) => {
                                                el.dom.innerText = ControlCamas.pendienteAlta + " Paciente(s)";
                                            },
                                            onupdate: (el) => {
                                                el.dom.innerText = ControlCamas.pendienteAlta + " Paciente(s)";
                                            }
                                        }), ]
                                    ]),
                                    (ControlCamas.pendienteAlta == 0) ? [m("div.progress.ht-4.mg-b-0.op-5",
                                        m(".progress-bar.bg-danger.wd-0p[role='progressbar'][aria-valuenow='100'][aria-valuemin='0'][aria-valuemax='100']")
                                    )] : [m("div.progress.ht-4.mg-b-0.op-5",
                                        m(".progress-bar.bg-danger.wd-100p[role='progressbar'][aria-valuenow='100'][aria-valuemin='0'][aria-valuemax='100']")
                                    )],

                                ]),
                                m("div.col-sm-6.col-lg-12.mg-t-30.mg-b-30.mg-sm-t-0.mg-lg-t-30", [

                                    m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                                        m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                                            "DIFERENCIA CAMAS"
                                        ),
                                        m("span.tx-10.tx-color-04",
                                            "Hoy, " + _fechaHoy_
                                        )
                                    ]),
                                    m("div.d-flex.align-items-end.justify-content-between.mg-b-5", [
                                        (ControlCamas.camasTotales == 0) ? [m("h5.tx-normal.tx-rubik.lh-2.mg-b-0", "0 Paciente(s)"), ] : [m("h5.tx-normal.tx-rubik.lh-2.mg-b-0", {
                                            oncreate: (el) => {
                                                el.dom.innerText = ControlCamas.camasTotales + " Paciente(s)";
                                            },
                                            onupdate: (el) => {
                                                el.dom.innerText = ControlCamas.camasTotales + " Paciente(s)";
                                            }
                                        }), ]
                                    ]),
                                    (ControlCamas.camasTotales == 0) ? [m("div.progress.ht-4.mg-b-0.op-5",
                                        m(".progress-bar.bg-teal.wd-0p[role='progressbar'][aria-valuenow='100'][aria-valuemin='0'][aria-valuemax='100']")
                                    )] : [m("div.progress.ht-4.mg-b-0.op-5",
                                        m(".progress-bar.bg-danger.wd-100p[role='progressbar'][aria-valuenow='100'][aria-valuemin='0'][aria-valuemax='100']")
                                    )],
                                ]),



                            ])
                        )
                    ),
                    m("div.row.animated.fadeInUp", {
                        class: ControlCamas.showBitacora
                    }, [

                        m("div.col-12", [

                            m("div.table-loader.wd-100p",
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [
                                m(Stopwatch),
                                m("div.mg-b-10.d-flex.align-items-center.justify-content-between", [
                                    m("h5.mg-b-0",
                                        "Camas Disponibles GEMA: "
                                    ),

                                ]),
                                m("table.table.table-xs.mg-b-10[id='table-status-camas'][width='100%']"),

                                m("table.table.table-xs.d-none[id='table-control-camas'][width='100%']"),
                                m("div.mg-b-10.d-flex.align-items-center.justify-content-between", [
                                    m("h5.mg-b-0.mg-t-15",
                                        "Pendientes de Alta MV: "
                                    ),
                                    m("div.tx-15.d-none", [
                                        m("a.link-03.lh-0[href='']",
                                            m("i.icon.ion-md-refresh"),
                                            " Actualizar"
                                        ),

                                    ])
                                ]),

                                m("table.table.table-xs[id='table-pendientes-alta'][width='100%']"),

                                m("div.mg-b-10.d-flex.align-items-center.justify-content-between", [

                                    m("h5.mg-b-0",
                                        "Estado de Camas: "
                                    ),

                                ]),
                                m("div.mg-b-5.d-flex",
                                    m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']")
                                ),
                                m("table.table.table-xs[id='table-camas-totales'][width='100%']"),





                            ])
                        ])
                    ]),
                    m(VerPedido)
                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Control de Camas"
                ),
                m("div.mg-t-10.bg-white",
                    m("div.col-12.mg-t-30.mg-lg-t-0",
                        m("div.row", [
                            m("div.col-sm-6.col-lg-12.mg-t-30.mg-sm-t-0.mg-lg-t-30", [

                                m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                                    m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                                        "Pendiente Alta"
                                    ),
                                    m("span.tx-10.tx-color-04",
                                        "Hoy, " + _fechaHoy_
                                    )
                                ]),
                                m("div.d-flex.align-items-end.justify-content-between.mg-b-5", [
                                    (ControlCamas.pendienteAlta == 0) ? [m("h5.tx-normal.tx-rubik.lh-2.mg-b-0", "0 Paciente(s)"), ] : [m("h5.tx-normal.tx-rubik.lh-2.mg-b-0", {
                                        oncreate: (el) => {
                                            el.dom.innerText = ControlCamas.pendienteAlta + " Paciente(s)";
                                        },
                                        onupdate: (el) => {
                                            el.dom.innerText = ControlCamas.pendienteAlta + " Paciente(s)";
                                        }
                                    }), ]
                                ]),
                                (ControlCamas.pendienteAlta == 0) ? [m("div.progress.ht-4.mg-b-0.op-5",
                                    m(".progress-bar.bg-danger.wd-0p[role='progressbar'][aria-valuenow='100'][aria-valuemin='0'][aria-valuemax='100']")
                                )] : [m("div.progress.ht-4.mg-b-0.op-5",
                                    m(".progress-bar.bg-danger.wd-100p[role='progressbar'][aria-valuenow='100'][aria-valuemin='0'][aria-valuemax='100']")
                                )],

                            ]),

                            m("div.col-sm-6.col-lg-12.mg-t-30.mg-sm-t-0.mg-lg-t-30", [

                                m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                                    m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                                        "DIFERENCIA CAMAS"
                                    ),
                                    m("span.tx-10.tx-color-04",
                                        "Hoy, " + _fechaHoy_
                                    )
                                ]),
                                m("div.d-flex.align-items-end.justify-content-between.mg-b-5", [
                                    (ControlCamas.camasTotales == 0) ? [m("h5.tx-normal.tx-rubik.lh-2.mg-b-0", "0 Paciente(s)"), ] : [m("h5.tx-normal.tx-rubik.lh-2.mg-b-0", {
                                        oncreate: (el) => {
                                            el.dom.innerText = ControlCamas.camasTotales + " Paciente(s)";
                                        },
                                        onupdate: (el) => {
                                            el.dom.innerText = ControlCamas.camasTotales + " Paciente(s)";
                                        }
                                    }), ]
                                ]),
                                (ControlCamas.camasTotales == 0) ? [m("div.progress.ht-4.mg-b-0.op-5",
                                    m(".progress-bar.bg-teal.wd-0p[role='progressbar'][aria-valuenow='100'][aria-valuemin='0'][aria-valuemax='100']")
                                )] : [m("div.progress.ht-4.mg-b-0.op-5",
                                    m(".progress-bar.bg-danger.wd-100p[role='progressbar'][aria-valuenow='100'][aria-valuemin='0'][aria-valuemax='100']")
                                )],
                            ]),

                            m("div.col-sm-6.col-lg-12.mg-t-30.mg-b-30.mg-sm-t-0.mg-lg-t-30", [

                                m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                                    m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                                        "GEMA Y MV"
                                    ),
                                    m("span.tx-10.tx-color-04",
                                        "Hoy, " + _fechaHoy_
                                    )
                                ]),
                                m("div.d-flex.align-items-end.justify-content-between.mg-b-5", [
                                    (ControlCamas.gemaMV == 0) ? [m("h5.tx-normal.tx-rubik.lh-2.mg-b-0", "0 Paciente(s)"), ] : [m("h5.tx-normal.tx-rubik.lh-2.mg-b-0", {
                                        oncreate: (el) => {
                                            el.dom.innerText = ControlCamas.gemaMV + " Paciente(s)";
                                        },
                                        onupdate: (el) => {
                                            el.dom.innerText = ControlCamas.gemaMV + " Paciente(s)";
                                        }
                                    }), ]
                                ]),
                                (ControlCamas.gemaMV == 0) ? [m("div.progress.ht-4.mg-b-0.op-5",
                                    m(".progress-bar.bg-teal.wd-0p[role='progressbar'][aria-valuenow='100'][aria-valuemin='0'][aria-valuemax='100']")
                                )] : [m("div.progress.ht-4.mg-b-0.op-5",
                                    m(".progress-bar.bg-danger.wd-100p[role='progressbar'][aria-valuenow='100'][aria-valuemin='0'][aria-valuemax='100']")
                                )],
                            ]),



                        ])
                    )
                ),

            ])

        ];
    },

};

function loadControlStatusCamas() {

    $(".table-content").hide();
    $(".table-loader").show();

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
    var table = $("#table-status-camas").DataTable({
            "ajax": {
                url: "https://api.hospitalmetropolitano.org/t/v1/adm-status-camas",
                dataSrc: "data",
                serverSide: true,
            },
            processing: true,
            serverSide: true,
            responsive: false,
            dom: 't',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados disponibles.",
                sEmptyTable: "Ningún dato disponible en esta tabla",
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
            columns: [{
                    title: "N°:"
                },
                {
                    title: "ÁREA:"
                },
                {
                    title: "COVID:"
                },
                {
                    title: "DISPONIBLES:"
                },
                {
                    title: "EN LIMPIEZA:"
                },
                {
                    title: "OCUPADAS:"
                },
                {
                    title: "TOTAL CAMAS:"
                }
            ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.AREA;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.COVID;

                    },
                    visible: true,
                    aTargets: [2],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.DISPONIBLES < 5 ? '<div class="d-inline tx-danger tx-semibold "><span class="badge badge-danger tx-18">' + full.DISPONIBLES + '</span></div>' : full.DISPONIBLES);
                    },
                    visible: true,
                    aTargets: [3],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return (full.EN_LIMPIEZA > full.DISPONIBLES ? '<div class="d-inline tx-danger tx-semibold "><span class="badge badge-danger tx-18">' + full.EN_LIMPIEZA + '</span></div>' : full.EN_LIMPIEZA);
                    },
                    visible: true,
                    aTargets: [4],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.OCUPADAS;
                    },
                    visible: true,
                    aTargets: [5],
                    orderable: false,


                },
                {
                    mRender: function(data, type, full) {
                        return full.TOTAL_CAMAS;
                    },
                    visible: true,
                    aTargets: [6],
                    orderable: false,

                },


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
            drawCallback: function(settings) {

            },

        }).on('xhr.dt', function(e, settings, json, xhr) {
            // Do some staff here...
            $('.table-loader').hide();
            $('.table-content').show();
        }).on('page.dt', function(e, settings, json, xhr) {
            // Do some staff here...
            $('.table-loader').show();
            $('.table-content').hide();

        })
        /**
         * Event:       xhrErr.liveAjax
         * Description: Triggered for any and all errors encountered during an XHR request (Meaning it covers
         *              all of the xhrErr*.liveAjax events below)
         * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
         */
        .on("xhrErr.liveAjax", function(e, settings, xhr, thrown) {
            console.log("xhrErr", "General XHR Error: " + thrown);
        })

    /**
     * Event:       xhrErrTimeout.liveAjax
     * Description: Triggered when a 'timeout' error was thrown from an XHR request
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
     */
    .on("xhrErrTimeout.liveAjax", function(e, settings, xhr, thrown) {
        console.log("xhrErrTimeout", "XHR Error: Timeout");
    })

    /**
     * Event:       xhrErrError.liveAjax
     * Description: Triggered when a 'error' error was thrown from an XHR request
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
     */
    .on("xhrErrError.liveAjax", function(e, settings, xhr, thrown) {
        console.log("XHR Error: Error");
    })

    /**
     * Event:       xhrErrAbort.liveAjax
     * Description: Triggered when an 'abort' error was thrown from an XHR request
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
     */
    .on("xhrErrAbort.liveAjax", function(e, settings, xhr, thrown) {
        console.log("xhrErrAbort", "XHR Error: Abort");
    })

    /**
     * Event:       xhrErrParseerror.liveAjax
     * Description: Triggered when a 'parsererror' error was thrown from an XHR request
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
     */
    .on("xhrErrParseerror.liveAjax", function(e, settings, xhr, thrown) {
        console.log("xhrErrParseerror", "XHR Error: Parse Error");
    })

    /**
     * Event:       xhrErrUnknown.liveAjax
     * Description: Triggered when an unknown error was thrown from an XHR request, this shouldn't ever
     *              happen actually, seeing as how all the textStatus values from
     *              http://api.jquery.com/jquery.ajax/ were accounted for. But I just liked having a default
     *              failsafe, in the case maybe a new error type gets implemented and this plugin doesn't get
     *              updated
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
     */
    .on("xhrErrUnknown.liveAjax", function(e, settings, xhr, thrown) {
        console.log("xhrErrParseerror", "(Unknown) XHR Error: " + thrown);
    })

    /**
     * Event:       xhrSkipped.liveAjax
     * Description: Triggered when an XHR iteration is skipped, either due to polling being paused, or an XHR request is already processing
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Reason for skip (either 'paused' or 'processing')
     */
    .on("xhrSkipped.liveAjax", function(e, settings, reason) {
        console.log("xhrSkipped", "XHR Skipped because liveAjax is " + reason);
    })

    /**
     * Event:       setInterval.liveAjax
     * Description: Triggered when the setTimeout interval has been changed
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object
     */
    .on("setInterval.liveAjax", function(e, settings, interval) {
        console.log("setInterval", "XHR polling interval set to " + interval);
    })

    /**
     * Event:       init.liveAjax
     * Description: Triggered when the liveAjax plugin has been initialized
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object
     */
    .on("init.liveAjax", function(e, settings, xhr) {
        console.log("init", "liveAjax initiated");
    })

    /**
     * Event:       clearTimeout.liveAjax
     * Description: Triggered when the timeout has been cleared, killing the XHR polling
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object
     */
    .on("clearTimeout.liveAjax", function(e, settings, xhr) {
        console.log("clearTimeout", "liveAjax timeout cleared");
    })

    /**
     * Event:       abortXhr.liveAjax
     * Description: Triggered when the current XHR request was aborted, either by an API method or an internal reason (Not the same as 'xhrErrAbort.liveAjax')
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object
     */
    .on("abortXhr.liveAjax", function(e, settings, xhr) {
        console.log("abortXhr", "liveAjax XHR request was aborted");
    })

    /**
     * Event:       setPause.liveAjax
     * Description: Triggered when the liveAjax XHR polling was paused or un-paused
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object
     */
    .on("setPause.liveAjax", function(e, settings, paused) {
        console.log(
            "setPause",
            "liveAjax XHR polling was " + (paused === true ? "paused" : "un-paused")
        );
    })

    /**
     * Event:       onUpdate.liveAjax
     * Description: Triggered when liveAjax is finished comparing the new/existing JSON, and has implemented any changes to the table, according to the new JSON data
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} Updates that were implemented; {object} New JSON data for tabke; {object} XHR Object
     */
    .on("onUpdate.liveAjax", function(e, settings, updates, json, xhr) {




    })

    /**
     * Event:       noUpdate.liveAjax
     * Description: Triggered when liveAjax is finished comparing the new/existing JSON, and no updates were implemented
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} New JSON data for tabke; {object} XHR Object
     */
    .on("noUpdate.liveAjax", function(e, settings, json, xhr) {
        console.log(
            "noUpdate",
            "JSON Processed - Table not updated, no new data"
        );
    });



    return table;



}

function loadControlCamas() {

    $(".table-content").hide();
    $(".table-loader").show();

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
    var table = $("#table-control-camas").DataTable({
            "ajax": {
                url: "https://api.hospitalmetropolitano.org/t/v1/adm-control-camas",
                dataSrc: "data",
                serverSide: true,
            },
            processing: true,
            serverSide: true,
            responsive: false,
            dom: 't',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados disponibles.",
                sEmptyTable: "Ningún dato disponible en esta tabla",
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
            columns: false,
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.HC_MV;
                    },
                    visible: false,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.PTE_MV;

                    },
                    visible: false,
                    aTargets: [2],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return "";
                    },
                    visible: true,
                    aTargets: [3],
                    width: "100%",
                    orderable: false,

                },


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
            drawCallback: function(settings) {

                $(".table-content").show();
                $(".table-loader").hide();


                settings.aoData.map(function(_i) {

                    ControlCamas.dataCamaTotales.push(_i._aData)

                    if (_i._aData.DIFERENCIA == 1) {
                        ControlCamas.camasTotales++;
                    }

                    if (_i._aData.TIPO == 'SIN ALTA EN MV') {
                        ControlCamas.pendienteAlta++;
                        ControlCamas.dataPendientesAlta.push(_i._aData)
                    }

                    if (_i._aData.TIPO == 'GEMA Y MV') {
                        ControlCamas.gemaMV++;
                    }


                })

                m.redraw.sync();
                loadPendientesAlta();
                loadCamasTotales();

            },
            rowId: "NUM",
            liveAjax: {
                // 2 second interval
                interval: 25000,
                // Do _not_ fire the DT callbacks for every XHR request made by liveAjax
                dtCallbacks: false,
                // Abort the XHR polling if one of the below errors were encountered
                abortOn: ["error", "timeout", "parsererror"],
                // Disable pagination resetting on updates ("true" will send the viewer
                // to the first page every update)
                resetPaging: false,
            },
        }).on('xhr.dt', function(e, settings, json, xhr) {
            // Do some staff here...
            $('.table-loader').hide();
            $('.table-content').show();
        }).on('page.dt', function(e, settings, json, xhr) {
            // Do some staff here...
            $('.table-loader').show();
            $('.table-content').hide();

        })
        /**
         * Event:       xhrErr.liveAjax
         * Description: Triggered for any and all errors encountered during an XHR request (Meaning it covers
         *              all of the xhrErr*.liveAjax events below)
         * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
         */
        .on("xhrErr.liveAjax", function(e, settings, xhr, thrown) {
            console.log("xhrErr", "General XHR Error: " + thrown);
        })

    /**
     * Event:       xhrErrTimeout.liveAjax
     * Description: Triggered when a 'timeout' error was thrown from an XHR request
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
     */
    .on("xhrErrTimeout.liveAjax", function(e, settings, xhr, thrown) {
        console.log("xhrErrTimeout", "XHR Error: Timeout");
    })

    /**
     * Event:       xhrErrError.liveAjax
     * Description: Triggered when a 'error' error was thrown from an XHR request
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
     */
    .on("xhrErrError.liveAjax", function(e, settings, xhr, thrown) {
        console.log("XHR Error: Error");
    })

    /**
     * Event:       xhrErrAbort.liveAjax
     * Description: Triggered when an 'abort' error was thrown from an XHR request
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
     */
    .on("xhrErrAbort.liveAjax", function(e, settings, xhr, thrown) {
        console.log("xhrErrAbort", "XHR Error: Abort");
    })

    /**
     * Event:       xhrErrParseerror.liveAjax
     * Description: Triggered when a 'parsererror' error was thrown from an XHR request
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
     */
    .on("xhrErrParseerror.liveAjax", function(e, settings, xhr, thrown) {
        console.log("xhrErrParseerror", "XHR Error: Parse Error");
    })

    /**
     * Event:       xhrErrUnknown.liveAjax
     * Description: Triggered when an unknown error was thrown from an XHR request, this shouldn't ever
     *              happen actually, seeing as how all the textStatus values from
     *              http://api.jquery.com/jquery.ajax/ were accounted for. But I just liked having a default
     *              failsafe, in the case maybe a new error type gets implemented and this plugin doesn't get
     *              updated
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Error thrown
     */
    .on("xhrErrUnknown.liveAjax", function(e, settings, xhr, thrown) {
        console.log("xhrErrParseerror", "(Unknown) XHR Error: " + thrown);
    })

    /**
     * Event:       xhrSkipped.liveAjax
     * Description: Triggered when an XHR iteration is skipped, either due to polling being paused, or an XHR request is already processing
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object; {string} Reason for skip (either 'paused' or 'processing')
     */
    .on("xhrSkipped.liveAjax", function(e, settings, reason) {
        console.log("xhrSkipped", "XHR Skipped because liveAjax is " + reason);
    })

    /**
     * Event:       setInterval.liveAjax
     * Description: Triggered when the setTimeout interval has been changed
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object
     */
    .on("setInterval.liveAjax", function(e, settings, interval) {
        console.log("setInterval", "XHR polling interval set to " + interval);
    })

    /**
     * Event:       init.liveAjax
     * Description: Triggered when the liveAjax plugin has been initialized
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object
     */
    .on("init.liveAjax", function(e, settings, xhr) {
        console.log("init", "liveAjax initiated");
    })

    /**
     * Event:       clearTimeout.liveAjax
     * Description: Triggered when the timeout has been cleared, killing the XHR polling
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object
     */
    .on("clearTimeout.liveAjax", function(e, settings, xhr) {
        console.log("clearTimeout", "liveAjax timeout cleared");
    })

    /**
     * Event:       abortXhr.liveAjax
     * Description: Triggered when the current XHR request was aborted, either by an API method or an internal reason (Not the same as 'xhrErrAbort.liveAjax')
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object
     */
    .on("abortXhr.liveAjax", function(e, settings, xhr) {
        console.log("abortXhr", "liveAjax XHR request was aborted");
    })

    /**
     * Event:       setPause.liveAjax
     * Description: Triggered when the liveAjax XHR polling was paused or un-paused
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} XHR Object
     */
    .on("setPause.liveAjax", function(e, settings, paused) {
        console.log(
            "setPause",
            "liveAjax XHR polling was " + (paused === true ? "paused" : "un-paused")
        );
    })

    /**
     * Event:       onUpdate.liveAjax
     * Description: Triggered when liveAjax is finished comparing the new/existing JSON, and has implemented any changes to the table, according to the new JSON data
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} Updates that were implemented; {object} New JSON data for tabke; {object} XHR Object
     */
    .on("onUpdate.liveAjax", function(e, settings, updates, json, xhr) {


        ControlCamas.dataPendientesAlta = [];
        ControlCamas.camasTotales = [];
        ControlCamas.camasTotales = 0;
        ControlCamas.pendienteAlta = 0;

        if (updates !== undefined && updates.delete.length !== 0) {
            reloadDataTables('#table-pendientes-alta', ControlCamas.dataPendientesAlta)
            reloadDataTables('#table-camas-totales', ControlCamas.camasTotales)
        }

        if (updates !== undefined && updates.create.length !== 0) {

            reloadDataTables('#table-pendientes-alta', ControlCamas.dataPendientesAlta)
            reloadDataTables('#table-camas-totales', ControlCamas.camasTotales)
        }

        if (updates !== undefined && Object.keys(updates.update).length !== 0) {

            reloadDataTables('#table-pendientes-alta', ControlCamas.dataPendientesAlta)
            reloadDataTables('#table-camas-totales', ControlCamas.camasTotales)
        }
    })

    /**
     * Event:       noUpdate.liveAjax
     * Description: Triggered when liveAjax is finished comparing the new/existing JSON, and no updates were implemented
     * Parameters:  {object} JQ Event; {object} DataTable Settings; {object} New JSON data for tabke; {object} XHR Object
     */
    .on("noUpdate.liveAjax", function(e, settings, json, xhr) {
        console.log(
            "noUpdate",
            "JSON Processed - Table not updated, no new data"
        );
    });



    return table;



}

function reloadDataTables(_table_, _data_) {
    var table = $(_table_).DataTable();
    table.clear();
    table.rows.add(_data_).draw();
}

function loadPendientesAlta() {

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
    var table = $("#table-pendientes-alta").DataTable({
        data: ControlCamas.dataPendientesAlta,
        dom: 'tp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Sin Resultados",
            sEmptyTable: "Sin Resultados",
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
        pageLength: 40,
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

                        return m(iPendienteAlta, _v._aData)


                    }
                });


            })
        },
    });


    return table;

};

function loadSoloGEMA() {


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
    var table = $("#table-solo-gema").DataTable({
        data: ControlCamas.dataSoloGema,
        dom: 'tp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Sin Resultados",
            sEmptyTable: "Sin Resultados",
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

                        return m(iCama, _v._aData)


                    }
                });


            })
        },
    });


    return table;

};

function loadGEMA_MV() {


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
    var table = $("#table-gema-mv").DataTable({
        data: ControlCamas.dataGemaMV,
        dom: 'tp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Sin Resultados",
            sEmptyTable: "Sin Resultados",
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

                        return m(iCama, _v._aData)


                    }
                });


            })
        },
    });


    return table;

};

function loadCamasTotales() {


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
    var table = $("#table-camas-totales").DataTable({
        data: ControlCamas.dataCamaTotales,
        dom: 'tp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Sin Resultados",
            sEmptyTable: "Sin Resultados",
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
        order: [
            [0, "Desc"]
        ],
        destroy: true,
        pageLength: 20,
        columns: false,
        aoColumnDefs: [{
                mRender: function(data, type, full) {
                    return full.DIFERENCIA;
                },
                visible: false,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return full.TIPO;
                },
                visible: false,
                aTargets: [1],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return full.NOMBRE_GEMA;
                },
                visible: false,
                aTargets: [2],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return full.NOMBRE_MV;
                },
                visible: false,
                aTargets: [3],
                orderable: true,
            },
            {
                mRender: function(data, type, full) {
                    return "";
                },
                visible: true,
                width: "100%",
                aTargets: [4],
                orderable: false,

            },

        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
        drawCallback: function(settings) {
            settings.aoData.map(function(_v, _i) {
                m.mount(_v.anCells[4], {
                    view: function() {
                        return m(iCamasTotales, _v._aData)
                    }
                });


            })
        },
    });




    $('#searchField').keyup(function(e) {

        table.search($('#searchField').val()).draw();
    });



    return table;

};





function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}


export default ControlCamas;