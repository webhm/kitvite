import Notificaciones from '../../../models/notificaciones';
import m from 'mithril';
import AgendaImagen from './agenImagen';

function stopwatchModel() {
    return {
        interval: null,
        seconds: 100,
        isPaused: false
    };
}

const actions = {
    showFilter: true,
    showSearch: true,
    show: false,
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
        model.seconds = 100;
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
                m("div.mg-b-0", [
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                        m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                            "Actualización en:"
                        ),

                    ]),
                    m("div.d-flex.justify-content-between.mg-b-5", [
                        m("h5.tx-normal.tx-rubik.mg-b-0",
                            model.seconds + "s."
                        ),
                        m("h5.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                            m("small.pd-2.tx-15",
                                (model.isPaused ? [m("i.fas.fa-play.pd-2", {
                                    title: "Start",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }
                                })] : [m("i.fas.fa-pause.pd-2", {
                                    title: "Pause",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }

                                })]),


                            ),



                        ),


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
        },

    };
};



const DetalleCita = {
    id: '',
    cita: [],
    citasDisponibles: [],
    citasAgendadas: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    loadDetalle: false,
    nuevaCita: false,
    error: "",
    oninit: (_data) => {


        DetalleCita.id = _data.attrs.id;
        DetalleCita.loader = true;
        DetalleCita.fetchDetalleCita();
        document.body.classList.add('app-calendar');
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
    setSidebar: () => {

        // Sidebar calendar
        $('#calendarInline').datepicker({
            showOtherMonths: true,
            selectOtherMonths: true,
            beforeShowDay: function(date) {

                // add leading zero to single digit date
                var day = date.getDate();
                console.log(day);
                return [true, (day < 10 ? 'zero' : '')];
            }
        });

        setTimeout(function() {
            // Initialize scrollbar for sidebar
            new PerfectScrollbar('#calendarSidebarBody', { suppressScrollX: true });
        }, 100);

        // Initialize tooltip
        $('[data-toggle="tooltip"]').tooltip();


    },
    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-Imagen-Agenda');
    },
    fetchDetalleCita: () => {

        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/v2/medicos/mi-agenda/cita?id=" + DetalleCita.id,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                DetalleCita.loader = false;
                DetalleCita.cita = result.data
                DetalleCita.cita.horaInicio = moment(DetalleCita.cita.start).format('dddd, DD-MM-YYYY HH:mm');
                DetalleCita.cita.horaFin = moment(DetalleCita.cita.end).format('dddd, DD-MM-YYYY HH:mm');
                console.log(1, DetalleCita.cita)
                setTimeout(function() { DetalleCita.setSidebar(); }, 100);

            })
            .catch(function(e) {
                setTimeout(function() { DetalleCita.fetchDetalleCita(); }, 2000);
            });

    },
    agendarCita: () => {

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/v2/medicos/agenda/crear-cita",
                body: {
                    availableServiceId: 0,
                    covenantId: 2,
                    covenantPlanId: 2,
                    dateBirth: "1962-03-23",
                    email: "mariobe7@hotmail.com",
                    id: DetalleCita.cita.id,
                    isFitting: true,
                    markingTypeId: 0,
                    patientId: 22706,
                    patientName: "BERMEO CABEZAS MARIO GERMAN",
                    phoneNumber: "0999721820",
                    scheduleFormType: "PERSONALLY",
                    schedulingItemId: 428,
                    sexType: "MALE",
                    specialityId: 66,
                    statusScheduleType: "M"


                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {

                console.log(result);

                if (result) {
                    alert('Cita agendada con éxito.');
                    window.location.reload();
                } else {
                    alert(resul);
                }

            })
            .catch(function(e) {});

    },
    view: (_data) => {


        return DetalleCita.loader ? [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header"),
                        m("div.calendar-sidebar-body")
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body.tx-center.mg-t-50", "Procesando... por favor espere.")
                    ]),

                ]

            ),
        ] : DetalleCita.error.length !== 0 ? [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header"),
                        m("div.calendar-sidebar-body")
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body")
                    ]),

                ]

            ),
        ] : !DetalleCita.loader && DetalleCita.cita.length !== 0 ? [
            m("div.calendar-wrapper", [
                m("div.calendar-sidebar", [
                    m("div.calendar-sidebar-header", [
                        m("i[data-feather='search']"),
                        m("div.search-form", [
                            m("input.form-control[type='search']")
                        ]),
                        m("a.btn btn-sm btn-primary btn-icon calendar-add", [
                            m("div[data-toggle='tooltip']", [
                                m("i.tx-white[data-feather='plus']")
                            ])
                        ])
                    ]),
                    m("div.calendar-sidebar-body[id='calendarSidebarBody']", [
                        m("div.calendar-inline", [
                            m("div[id='calendarInline']")
                        ])
                    ])
                ]),

                m("div.calendar-content", [
                    m("div.calendar-content-body.pd-5",
                        m("table.table.table-bordered.table-sm.tx-12", [
                            m("thead",
                                m("tr.bg-litecoin.op-9.tx-white", [

                                    m("th.tx-15.tx-semibold[scope='col'][colspan='12']",
                                        m("small.pd-2.tx-15.tx-white ",
                                            m("i.fas.fa-times-circle.pd-2", {
                                                    "style": { "cursor": "pointer" },
                                                    title: "Cerrar",
                                                    onclick: () => {
                                                        m.route.set('/imagen/agendamiento/');
                                                    }
                                                }

                                            )


                                        ),
                                        "DETALLE DE CITA:",

                                    ),


                                ])
                            ),
                            m("tbody", [
                                m("tr", [
                                    m("th[colspan='2'].tx-13", {
                                            style: { "background-color": "#a8bed6" }
                                        },
                                        "Id Cita:"
                                    ),
                                    m("td[colspan='2'].tx-13", {
                                            style: { "background-color": "#eaeff5" }
                                        },
                                        DetalleCita.cita.id
                                    ),
                                    m("th[colspan='2'].tx-13", {
                                            style: { "background-color": "#a8bed6" }
                                        },
                                        "Fecha Hora Inicio:",
                                    ),
                                    m("td.tx-13.tx-danger.tx-semibold", {
                                            style: { "background-color": "#eaeff5" }

                                        },
                                        DetalleCita.cita.horaInicio
                                    ),
                                    m("th[colspan='2'].tx-13", {
                                            style: { "background-color": "#a8bed6" }
                                        },
                                        "Fecha Hora Fin:"
                                    ),
                                    m("td.tx-13.tx-danger.tx-semibold", {
                                            style: { "background-color": "#eaeff5" }

                                        },
                                        DetalleCita.cita.horaFin
                                    ),

                                ]),
                                m("tr", [
                                    m("th[colspan='3'].tx-13", {
                                            style: { "background-color": "#a8bed6" }
                                        },
                                        "Médico Prestador:"
                                    ),
                                    m("td[colspan='3'].tx-13", {
                                            style: { "background-color": "#eaeff5" }
                                        },
                                        DetalleCita.cita.id
                                    ),
                                    m("th[colspan='3'].tx-13", {
                                            style: { "background-color": "#a8bed6" }
                                        },
                                        "Especialidad:",
                                    ),

                                    m("td[colspan='3'].tx-13.tx-danger.tx-semibold", {
                                            style: { "background-color": "#eaeff5" }

                                        },
                                        DetalleCita.cita.horaFin
                                    ),

                                ]),
                            ]),
                            m("thead",
                                m("tr.bg-litecoin.op-9.tx-white", [
                                    m("th.tx-15.tx-semibold[scope='col'][colspan='12']",
                                        "DATOS DEL PACIENTE:"
                                    ),

                                ])
                            ),
                            m("tbody", [
                                m("tr", [
                                    m("th[colspan='2'].tx-13", {
                                            style: { "background-color": "#a8bed6" }
                                        },
                                        "NHC:"
                                    ),
                                    m("td[colspan='4']", {
                                            style: { "background-color": "#eaeff5" }
                                        },
                                        DetalleCita.cita.title
                                    ),
                                    m("th[colspan='2'].tx-13", {
                                            style: { "background-color": "#a8bed6" }
                                        },
                                        "Apellidos y Nombres:"
                                    ),
                                    m("td[colspan='4']", {
                                            style: { "background-color": "#eaeff5" }
                                        },
                                        DetalleCita.cita.title
                                    ),



                                ]),
                                m("tr", [




                                ]),

                                m("tr.bg-litecoin.op-9.tx-white", [
                                    m("th.tx-15.tx-semibold[scope='col'][colspan='10']",
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

                                    }, ),


                                ]),
                                m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                    m("th.tx-15.tx-semibold[scope='col'][colspan='10']",
                                        "OPCIONES DISPONIBLES:"
                                    ),

                                ]),
                                m("tr.d-print-none", [
                                    m("td[colspan='10']", {
                                            style: { "background-color": "#eaeff5" }

                                        },
                                        m("ul.nav.nav-tabs[id='myTab'][role='tablist']", {}, [

                                            m("li.nav-item",
                                                m("a.nav-link[id='home-editar'][data-toggle='tab'][href='#editar'][role='tab'][aria-controls='editar']", {
                                                        style: { "color": "#476ba3" }
                                                    },
                                                    m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                    " EDITAR "
                                                )
                                            ),
                                            m("li.nav-item",
                                                m("a.nav-link[id='home-cancelacion'][data-toggle='tab'][href='#cancelacion'][role='tab'][aria-controls='cancelacion']", {
                                                        style: { "color": "#476ba3" }
                                                    },
                                                    m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                    " CANCELAR "
                                                )
                                            ),
                                            m("li.nav-item",
                                                m("a.nav-link[id='home-comment'][data-toggle='tab'][href='#comment'][role='tab'][aria-controls='comment']", {
                                                        style: { "color": "#476ba3" }
                                                    },

                                                    " COMENTARIOS "
                                                )
                                            ),



                                        ]),
                                    ),


                                ]),
                                m("tr.d-print-none", [
                                    m("td[colspan='10']",
                                        m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                            m(".tab-pane.fade[id='editar'][role='tabpanel'][aria-labelledby='home-editar']", [
                                                [
                                                    m("div.form-group", [
                                                        m("label",
                                                            "Nuevo Horario"
                                                        ),
                                                        m("input.form-control[type='text'][placeholder='Nuevo Horario']"),
                                                        m("div.input-group-append",
                                                            m("button.btn.btn-outline-light.tx-semibold[type='button']",
                                                                "Nuevo Horario"
                                                            )
                                                        )
                                                    ]),
                                                    m("div.form-group", [
                                                        m("label",
                                                            "Médico Prestador:"
                                                        ),
                                                        m("input.form-control[type='text'][placeholder='Médico Prestador']"),
                                                        m("div.input-group-append",
                                                            m("button.btn.btn-outline-light.tx-semibold[type='button']",
                                                                "Buscar"
                                                            )
                                                        )
                                                    ]),

                                                    m("button.btn.btn-primary.tx-semibold",
                                                        "Editar Cita"
                                                    )
                                                ]

                                            ]),
                                            m(".tab-pane.fade[id='cancelacion'][role='tabpanel'][aria-labelledby='home-cancelacion']", [
                                                m('div.pd-5', [
                                                    m("div.form-group",
                                                        m("div.custom-control.custom-checkbox", [
                                                            m("input.custom-control-input[type='checkbox'][id='customCheck0']"),
                                                            m("label.custom-control-label.tx-semibold[for='customCheck0']",
                                                                "¿Esta seguro de cancelar esta Cita?"
                                                            )
                                                        ])
                                                    ),
                                                    m("div.form-group",
                                                        m("div.custom-control.custom-checkbox", [
                                                            m("input.custom-control-input[type='checkbox'][id='customCheckC']"),
                                                            m("label.custom-control-label.tx-semibold[for='customCheckC']",
                                                                "Enviar correo de notificación al paciente."
                                                            )
                                                        ])
                                                    ),
                                                    m("button.btn.btn-danger.tx-semibold",
                                                        "Cancelar Cita"
                                                    )
                                                ]),

                                            ]),
                                            m(".tab-pane.fade[id='comment'][role='tabpanel'][aria-labelledby='home-comment']", [
                                                m("p.mg-5", [
                                                    m("span.badge.badge-light.wd-100p.tx-14",
                                                        "Observaciones",
                                                    ),
                                                    m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {}),
                                                    m("div.mg-0.mg-t-5.text-right", [

                                                        m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                            onclick: function() {

                                                                DetalleCita.loadDetalle = !DetalleCita.loadDetalle;

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
                        ]))
                ]),


            ]),
            m(".modal.calendar-modal-create.fade.effect-scale[id='modalCreateEvent'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered[role='document']",
                    m("div.modal-content", [
                        m("div.modal-body.pd-20.pd-sm-30", [
                            m("button.close.pos-absolute.t-20.r-20[type='button'][data-dismiss='modal'][aria-label='Close']",
                                m("span[aria-hidden='true']",
                                    m("i[data-feather='x']")
                                )
                            ),
                            m("h5.tx-18.tx-sm-20.mg-b-20.mg-sm-b-30",
                                "Nueva Cita"
                            ),
                            m("div", [
                                m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                    "Historia Clínica Paciente:"
                                ),
                                m("div.form-group",
                                    m("input.form-control[type='text'][placeholder='Historia Clínica']")
                                ),

                                m("div.d-none", [
                                    m("div.custom-control.custom-radio", [
                                        m("input.custom-control-input[type='radio'][id='customRadio1'][name='customRadio'][checked]"),
                                        m("label.custom-control-label[for='customRadio1']",
                                            "Evento"
                                        )
                                    ]),
                                    m("div.custom-control.custom-radio.mg-l-20", [
                                        m("input.custom-control-input[type='radio'][id='customRadio2'][name='customRadio'][checked]"),
                                        m("label.custom-control-label[for='customRadio2']",
                                            "Reminder"
                                        )
                                    ])
                                ]),
                                m("div.form-group.mg-t-30", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                        "Fecha y Hora de Inicio:"
                                    ),
                                    m("div.row.row-xs", [
                                        m("div.col-7",
                                            m("input.form-control[id='eventStartDate'][type='text'][value=''][placeholder='Select date'][disabled='disabled']")
                                        ),
                                        m("div.col-5.d-none",
                                            m("select.custom-select",
                                                m("option[selected]",
                                                    "Select Time"
                                                )
                                            )
                                        )
                                    ])
                                ]),
                                m("div.form-group", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                        "Fecha y Hora de Fin"
                                    ),
                                    m("div.row.row-xs", [
                                        m("div.col-7",
                                            m("input.form-control[id='eventEndDate'][type='text'][value=''][placeholder='Select date'][disabled='disabled']")
                                        ),
                                        m("div.col-5.d-none",
                                            m("select.custom-select",
                                                m("option[selected]",
                                                    "Select Time"
                                                )
                                            )
                                        )
                                    ])
                                ]),
                                m("div.form-group",
                                    m("textarea.form-control[rows='2'][placeholder='Comentarios']")
                                )
                            ])
                        ]),
                        m("div.modal-footer", [
                            m("button.btn.btn-primary.mg-r-5", {
                                    onclick: () => {
                                        DetalleCita.agendarCita();
                                    }
                                },
                                "Agendar Cita"
                            ),
                            m("a.btn.btn-secondary[href=''][data-dismiss='modal']",
                                "Cerrar"
                            )
                        ])
                    ])
                )
            ),
            m(".modal.calendar-modal-event.fade.effect-scale[id='modalCalendarEvent'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header", [
                            m("h6.event-title"),
                            m("nav.nav.nav-modal-event", [
                                m("a.nav-link[href='#']",
                                    m("i[data-feather='external-link']")
                                ),
                                m("a.nav-link[href='#']",
                                    m("i[data-feather='trash-2']")
                                ),
                                m("a.nav-link[href='#'][data-dismiss='modal']",
                                    m("i[data-feather='x']")
                                )
                            ])
                        ]),
                        m("div.modal-body", [
                            m("div.row.row-sm", [
                                m("div.col-sm-6", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                        "Start Date"
                                    ),
                                    m("p.event-start-date")
                                ]),
                                m("div.col-sm-6", [
                                    m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                        "End Date"
                                    ),
                                    m("p.event-end-date")
                                ])
                            ]),
                            m("label.tx-uppercase.tx-sans.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                "Description"
                            ),
                            m("p.event-desc.tx-gray-900.mg-b-40"),
                            m("a.btn.btn-secondary.pd-x-20[href=''][data-dismiss='modal']",
                                "Close"
                            )
                        ])
                    ])
                )
            )

        ] : [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header"),
                        m("div.calendar-sidebar-body")
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body")
                    ]),

                ]

            ),
        ];


    },

};


export default DetalleCita;