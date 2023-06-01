import Notificaciones from '../../../models/notificaciones';
import m from 'mithril';

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



const AgendaImagen = {
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



        AgendaImagen.loader = true;
        AgendaImagen.fetchAgendaImagen();
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



        $('#calendarSidebarShow').on('click', function(e) {
            e.preventDefault()
            $('body').toggleClass('calendar-sidebar-show');

            $(this).addClass('d-none');
            $('#mainMenuOpen').removeClass('d-none');
        })

        $(document).on('click touchstart', function(e) {
            e.stopPropagation();

            // closing of sidebar menu when clicking outside of it
            if (!$(e.target).closest('.burger-menu').length) {
                var sb = $(e.target).closest('.calendar-sidebar').length;
                if (!sb) {
                    $('body').removeClass('calendar-sidebar-show');
                    $('#mainMenuOpen').addClass('d-none');
                    $('#calendarSidebarShow').removeClass('d-none');
                }
            }
        });

        // Initialize tooltip
        $('[data-toggle="tooltip"]').tooltip();



    },
    setCalendar: () => {



        // Initialize fullCalendar
        $('#calendar').fullCalendar({
            height: 'parent',
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listWeek'
            },
            navLinks: true,
            selectable: true,
            selectLongPressDelay: 100,
            editable: false,
            nowIndicator: true,
            defaultView: 'listMonth',
            minTime: '06:00:00',
            maxTime: '21:00:00',
            slotDuration: '00:15:00',
            slotLabelInterval: 15,
            slotLabelFormat: 'HH:mma',
            slotMinutes: 15,
            timeFormat: 'HH:mma',
            views: {
                agenda: {
                    columnHeaderHtml: function(mom) {
                        return '<span>' + mom.format('ddd') + '</span>' +
                            '<span>' + mom.format('DD') + '</span>';
                    }
                },
                day: { columnHeader: false },
                listMonth: {
                    listDayFormat: 'ddd DD',
                    listDayAltFormat: false
                },
                listWeek: {
                    listDayFormat: 'ddd DD',
                    listDayAltFormat: false
                },
                agendaThreeDay: {
                    type: 'agenda',
                    duration: { days: 3 },
                    titleFormat: 'MMMM YYYY'
                }
            },

            eventSources: [AgendaImagen.citasDisponibles, AgendaImagen.citasAgendadas],
            eventAfterAllRender: function(view) {
                if (view.name === 'listMonth' || view.name === 'listWeek') {
                    var dates = view.el.find('.fc-list-heading-main');
                    dates.each(function() {
                        var text = $(this).text().split(' ');
                        var now = moment().format('DD');

                        $(this).html(text[0] + '<span>' + text[1] + '</span>');
                        if (now === text[1]) { $(this).addClass('now'); }
                    });
                }

                console.log(view.el);
            },
            eventRender: function(event, element) {

                if (event.description) {
                    element.find('.fc-list-item-title').append('<span class="fc-desc">' + event.description + '</span>');
                    element.find('.fc-content').append('<span class="fc-desc">' + event.description + '</span>');
                }

                var eBorderColor = (event.source.borderColor) ? event.source.borderColor : event.borderColor;
                element.find('.fc-list-item-time').css({
                    color: eBorderColor,
                    borderColor: eBorderColor
                });

                element.find('.fc-list-item-title').css({
                    borderColor: eBorderColor
                });

                element.css('borderLeftColor', eBorderColor);
            },
        });

        var calendar = $('#calendar').fullCalendar('getCalendar');

        // change view to week when in tablet
        if (window.matchMedia('(min-width: 576px)').matches) {
            calendar.changeView('agendaWeek');
        }

        // change view to month when in desktop
        if (window.matchMedia('(min-width: 992px)').matches) {
            calendar.changeView('month');
        }

        // change view based in viewport width when resize is detected
        calendar.option('windowResize', function(view) {
            if (view.name === 'listWeek') {
                if (window.matchMedia('(min-width: 992px)').matches) {
                    calendar.changeView('month');
                } else {
                    calendar.changeView('listWeek');
                }
            }
        });

        // Display calendar event modal
        calendar.on('eventClick', function(calEvent, jsEvent, view) {


            if (calEvent.stAgendar == 1) {

                AgendaImagen.cita = calEvent;
                AgendaImagen.cita.horaInicio = moment(calEvent.start).format('dddd, DD-MM-YYYY HH:mm');
                AgendaImagen.cita.horaFin = moment(calEvent.end).format('dddd, DD-MM-YYYY HH:mm');
                AgendaImagen.loadDetalle = true;

                m.route.set('/imagen/agendamiento/cita/', {
                    id: AgendaImagen.cita.id,
                });

                /*

                var modal = $('#modalCalendarEvent');

                modal.modal('show');
                modal.find('.event-title').text(calEvent.title);

                if (calEvent.description) {
                    modal.find('.event-desc').text(calEvent.description);
                    modal.find('.event-desc').prev().removeClass('d-none');
                } else {
                    modal.find('.event-desc').text('');
                    modal.find('.event-desc').prev().addClass('d-none');
                }

                modal.find('.event-start-date').text(moment(calEvent.start).format('LLL'));
                modal.find('.event-end-date').text(moment(calEvent.end).format('LLL'));

                //styling
                modal.find('.modal-header').css('backgroundColor', (calEvent.source.borderColor) ? calEvent.source.borderColor : calEvent.borderColor);

                */

            } else {

                AgendaImagen.cita = calEvent;
                AgendaImagen.cita.horaInicio = moment(calEvent.start).format('dddd, DD-MM-YYYY HH:mm');
                AgendaImagen.cita.horaFin = moment(calEvent.end).format('dddd, DD-MM-YYYY HH:mm');
                m.route.set('/imagen/agendamiento/nueva-cita/', {
                    id: AgendaImagen.cita.id,
                });



                /*
                
                $('#modalCreateEvent').modal('show');
                $('#eventStartDate').val(moment(calEvent.start).format('LLL'));
                $('#eventEndDate').val(moment(calEvent.end).format('LLL'));

                $('#eventStartTime').val(moment(calEvent.start).format('LT')).trigger('change');
                $('#eventEndTime').val(moment(calEvent.end).format('LT')).trigger('change');

                */


            }


        });

        // display current date
        var dateNow = calendar.getDate();
        calendar.option('select', function(startDate, endDate) {

            alert("Seleccione una cita disponible.");

            throw "Seleccione una cita disponible."
                /*

                $('#modalCreateEvent').modal('show');
                $('#eventStartDate').val(startDate.format('LL'));
                $('#eventEndDate').val(endDate.format('LL'));

                $('#eventStartTime').val(startDate.format('LT')).trigger('change');
                $('#eventEndTime').val(endDate.format('LT')).trigger('change');
                */
        });

        $('.select2-modal').select2({
            minimumResultsForSearch: Infinity,
            dropdownCssClass: 'select2-dropdown-modal',
        });

        $('.calendar-add').on('click', function(e) {
            e.preventDefault()

            $('#modalCreateEvent').modal('show');
        });



    },
    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-Imagen-Agenda');
    },
    fetchAgendaImagen: () => {

        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/v2/medicos/mi-agenda?idAgenda=1875",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                AgendaImagen.loader = false;
                AgendaImagen.citasDisponibles = result.citasDisponibles;
                AgendaImagen.citasAgendadas = result.citasAgendadas;
                setTimeout(function() { AgendaImagen.setCalendar(); }, 10);
                setTimeout(function() { AgendaImagen.setSidebar(); }, 20);
            })
            .catch(function(e) {
                setTimeout(function() { AgendaImagen.fetchAgendaImagen(); }, 2000);
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
                    id: AgendaImagen.cita.id,
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


        return AgendaImagen.loader ? [
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
        ] : AgendaImagen.error.length !== 0 ? [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header"),
                        m("div.calendar-sidebar-body")
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body[id='calendar']")
                    ]),

                ]

            ),
        ] : !AgendaImagen.loader && (AgendaImagen.citasDisponibles.length !== 0 && AgendaImagen.citasAgendadas.length !== 0) ? [
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
                        ]),
                        m("div.pd-y-20.pd-x-15", [
                            m("label.tx-uppercase.tx-sans.tx-10.tx-medium.tx-spacing-1.tx-color-03.pd-l-10.mg-b-10",
                                "Área/Salas:"
                            ),
                            m("nav.calendar-nav", [
                                m("a.discover.show[href='']", [
                                    m("span"),
                                    "  Sala 1 "
                                ]),
                                m("a.meetup.show[href='']", [
                                    m("span"),
                                    " Sala 2"
                                ]),

                            ])
                        ])
                    ])
                ]),
                m("div.calendar-content", [
                    m("div.calendar-content-body[id='calendar']", ),
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
                                        AgendaImagen.agendarCita();
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

        ] : !AgendaImagen.loader && (AgendaImagen.citasDisponibles.length == 0 && AgendaImagen.citasAgendadas.length == 0) ? [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header"),
                        m("div.calendar-sidebar-body")
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body[id='calendar']")
                    ]),

                ]

            ),
        ] : [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header"),
                        m("div.calendar-sidebar-body")
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body[id='calendar']")
                    ]),

                ]

            ),
        ];


    },

};


export default AgendaImagen;