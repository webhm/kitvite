import HeaderPrivate from '../../layout/header-private';
import SidebarAdm from '../sidebarAdm';
import App from '../../app';
import m from 'mithril';


const iPreAdmision = {

    view: (_data) => {
        return [
            m("p.mg-0", [
                m("div.tx-12",
                    (_data.attrs.ADMISION_POSTERIOR == 'SI' ? [
                        m("span.wd-10p", {
                            class: "badge badge-danger mg-l-5 mg-r-5",
                        }, _data.attrs.ADMISION_POSTERIOR)
                    ] : []),
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "NH"),
                    _data.attrs.HC,
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "PACIENTE"),
                    _data.attrs.NOMBRE_PTE,
                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "ADM"),
                    _data.attrs.ADM,


                    m("span", {
                        class: "badge badge-primary mg-l-5 mg-r-5",
                    }, [], "FECHA PROGRAMADA: " + _data.attrs.FECHA_POSIBLE_ADM),



                )
            ]),
            m("p.mg-0", [
                m("div.tx-12",

                    m("span", {
                        class: "badge badge-light mg-l-5 mg-r-5",
                    }, [], "DCTO."),

                    _data.attrs.TIPO_DCTO,



                )
            ]),

        ];
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
                m("div.mg-b-20", [
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


const PreAdmisiones = {
    pacientes: [],
    oninit: (_data) => {
        HeaderPrivate.page = "";
        SidebarAdm.page = "";
        PreAdmisiones.dataPendientesAlta = [];
        PreAdmisiones.dataCamaTotales = [];
        App.isAuth('admisiones', 7);
    },
    oncreate: (_data) => {

        document.title = "Pre Admisiones | " + App.title;
        if (isObjEmpty(_data.attrs)) {
            loadDataPreAdmisiones();
        }
    },

    view: (_data) => {

        var _fechaHoy_ = moment().format('DD-MM-YYYY');


        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("admisiones") }),
            m(SidebarAdm, { oncreate: SidebarAdm.setPage(7) }),
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " Metroplus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admisiones "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Pre Admisiones"
                        ),
                    ]),
                    m("h1.df-title.mg-t-20",
                        "Pre Admisiones:"
                    ),

                    m("div.row.animated.fadeInUp", {}, [
                        m("div.col-12.mg-b-5.wd-100p.d-none[data-label='Filtrar'][id='filterTable']",

                            m("div.row", [


                                m("div.col-sm-12.pd-b-10",
                                    m("div.input-group", [
                                        m(".df-example.demo-forms.wd-100p[data-label='Buscar']", [
                                            m("input.form-control[type='text'][id='searchField'][data-role='tagsinput']", {
                                                oncreate: () => {


                                                    new Bloodhound({
                                                        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
                                                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                                                    });


                                                },

                                            }),
                                        ])
                                    ])
                                ),


                            ])
                        ),
                        m("div.col-12", [

                            m("div.table-loader.wd-100p",
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [
                                m(Stopwatch),
                                m("table.table.table-xs.d-none[id='table-data-pacientes'][width='100%']"),
                                m("div.mg-b-10.d-flex.align-items-center.justify-content-between", [
                                    m("h5.mg-b-0",
                                        "Pre Admisiones de Pacientes: "
                                    ),

                                ]),
                                m("table.table.table-sm.tx-12[id='table-preadmisiones'][width='100%']"),





                            ])
                        ])
                    ]),
                ])
            ),
            m("div.section-nav", [


            ])

        ];
    },

};

function loadDataPreAdmisiones() {

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
    var table = $("#table-data-pacientes").DataTable({
            "ajax": {
                url: "https://api.hospitalmetropolitano.org/t/v1/admisiones/pre",
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
                        return full.ADM;
                    },
                    visible: true,
                    aTargets: [3],

                },


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
            drawCallback: function(settings) {

                $(".table-content").show();
                $(".table-loader").hide();

                settings.aoData.map(function(_i) {

                    PreAdmisiones.pacientes.push(_i._aData)
                })

                m.redraw.sync();
                loadPreAdmisiones();

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


        PreAdmisiones.dataPendientesAlta = [];
        PreAdmisiones.camasTotales = [];
        PreAdmisiones.camasTotales = 0;
        PreAdmisiones.pendienteAlta = 0;

        if (updates !== undefined && updates.delete.length !== 0) {
            reloadDataTables('#table-preadmisiones', PreAdmisiones.dataPendientesAlta)
            reloadDataTables('#table-camas-totales', PreAdmisiones.camasTotales)
        }

        if (updates !== undefined && updates.create.length !== 0) {

            reloadDataTables('#table-preadmisiones', PreAdmisiones.dataPendientesAlta)
            reloadDataTables('#table-camas-totales', PreAdmisiones.camasTotales)
        }

        if (updates !== undefined && Object.keys(updates.update).length !== 0) {

            reloadDataTables('#table-preadmisiones', PreAdmisiones.dataPendientesAlta)
            reloadDataTables('#table-camas-totales', PreAdmisiones.camasTotales)
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

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });

    $('#searchField').change(function(e) {
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#searchField').val()).draw();
    });

    return table;



}

function reloadDataTables(_table_, _data_) {
    var table = $(_table_).DataTable();
    table.clear();
    table.rows.add(_data_).draw();
}

function loadPreAdmisiones() {

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
    var table = $("#table-preadmisiones").DataTable({
        data: PreAdmisiones.pacientes,
        dom: "ftp",
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
        destroy: true,
        pageLength: 200,
        columns: [{
            title: "FECHA:"
        }, {
            title: "HC:"
        }, {
            title: "M° ADM:"
        }, {
            title: "PACIENTE:"
        }, {
            title: "F. PROGRAMADA:"
        }, {
            title: "ADM POSTERIOR:"
        }, {
            title: "TIPO DCTO.:"
        }, ],
        aoColumnDefs: [{
                mRender: function(data, type, full) {
                    return full.FECHA_PREAD;
                },
                visible: true,
                aTargets: [0],

            }, {
                mRender: function(data, type, full) {
                    return full.HC;
                },
                visible: true,
                aTargets: [1],

            },
            {
                mRender: function(data, type, full) {
                    return full.ADM;


                },
                visible: true,
                aTargets: [2],

            },
            {
                mRender: function(data, type, full) {
                    return full.NOMBRE_PTE;
                },
                visible: true,
                aTargets: [3],

            },
            {
                mRender: function(data, type, full) {
                    return full.FECHA_POSIBLE_ADM;
                },
                visible: true,
                aTargets: [4],

            },
            {
                mRender: function(data, type, full) {
                    return full.ADMISION_POSTERIOR;
                },
                visible: true,
                aTargets: [5],


            },
            {
                mRender: function(data, type, full) {
                    return full.TIPO_DCTO;
                },
                visible: true,
                aTargets: [6],


            },
        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
        drawCallback: function(settings) {

        },
        order: [
            [3, "Desc"]
        ],
    });


    return table;

};


function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}


export default PreAdmisiones;