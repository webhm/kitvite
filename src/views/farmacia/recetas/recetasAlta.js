import HeaderPrivate from '../../layout/header-private';
import SidebarFarma from '../sidebarFarma';
import App from '../../app';
import m from 'mithril';
import Notificaciones from '../../../models/notificaciones';




const StatusReceta = {
    error: "",
    data: [],
    dataMuestras: [],
    fetch: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        StatusReceta.error = "";
        StatusReceta.data = [];

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/status-receta",
                body: {
                    numeroReceta: VerReceta.numeroReceta,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {

                    StatusReceta.data = result.data;
                    VerReceta.data = result.data[0];

                } else {
                    StatusReceta.error = result.message;
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


        return StatusReceta.data.map(function(_val, _i, _contentData) {
            if (status) {
                StatusReceta.data[_i]['STATUS_TOMA'] = _fechaToma;
                StatusReceta.data[_i]['customCheked'] = true;
                DetallePedido.udpateStatusTomaMuestra(StatusReceta.data[_i]['CD_EXA_LAB'], 1);

            } else {
                StatusReceta.data[_i]['STATUS_TOMA'] = "";
                StatusReceta.data[_i]['customCheked'] = false;
                DetallePedido.udpateStatusTomaMuestra(StatusReceta.data[_i]['CD_EXA_LAB'], 2);


            }
        })
    },
    udpateStatusTomaMuestra: (cod_exa_lab, sts) => {
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/up-status-pedido-lab",
                body: {
                    numeroReceta: VerReceta.numeroReceta,
                    cod_exa_lab: cod_exa_lab,
                    sts: sts
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                console.log(result)
            })
            .catch(function(e) {})
    },

    view: () => {




        if (StatusReceta.error) {
            return [
                m("p.mg-0",
                    StatusReceta.error
                )
            ]
        } else if (StatusReceta.data.length !== 0) {
            return [
                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [

                    m("div.mg-b-30",
                        m("i.tx-60.fas.fa-file.tx-primary")
                    ),

                    m("h5.tx-inverse.mg-b-10",
                        "Receta de Alta N°: " + VerReceta.numeroReceta
                    ),

                    m("p.mg-5.tx-20.mg-t-10", [
                        m("i.fas.fa-user.mg-r-8.text-secondary"),
                        VerReceta.data.NM_PACIENTE

                    ]),
                    m("p.mg-5.tx-15", [
                        "Fecha Receta: ",
                        VerReceta.data.DT_ATENDIMENTO

                    ]),

                    m("p.mg-5.tx-15", [
                        "Ubicaciòn: ",
                        VerReceta.data.UBICACION,


                    ]),
                    m("p.mg-5", [
                        "Historía Clínica: ",



                    ]),
                    m("p.mg-5", [
                        m("span.badge.badge-primary.mg-r-5.tx-14",
                            "GEMA: " + VerReceta.data.CD_PACIENTE + "01",
                        ),
                        m("span.badge.badge-success.mg-r-5.tx-14",
                            "MV: " + VerReceta.data.CD_PACIENTE + " N° Atención MV: " + VerReceta.data.CD_ATENDIMENTO
                        ),
                    ]),
                    m("ul.nav.nav-tabs.mg-t-15[id='myTab'][role='tablist']", [
                        m("li.nav-item",
                            m("a.nav-link.active[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']",
                                "Detalle Receta"
                            )
                        ),


                    ]),
                    m(".tab-content.bd.bd-gray-300.bd-t-0.pd-20.mg-t-10[id='myTabContent']", [
                        m(".tab-pane.fade.show.active[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                            (StatusReceta.error ? [
                                m("p.mg-0",
                                    StatusReceta.error
                                )
                            ] : StatusReceta.data !== undefined && StatusReceta.data.length !== 0 ? [
                                m("h6",
                                    "Detalle Receta:"
                                ),
                                m("div.table-responsive",
                                    m("table.table.table-dashboard.mg-b-0", [
                                        m("thead",
                                            m("tr", [
                                                m("th",
                                                    "MEDICACIÓN"
                                                ),
                                                m("th",
                                                    "CANT:"
                                                ),
                                                m("th",
                                                    "DESP:"
                                                ),
                                                m("th",
                                                    "OBS:"
                                                ),

                                            ])
                                        ),
                                        m("tbody", [
                                            VerReceta.data.DATA.map(function(_val, _i, _contentData) {

                                                if (_val.DESP.includes('SI')) {
                                                    return [
                                                        m("tr", [
                                                            m("td.tx-semibold.tx-normal",
                                                                _val.MEDICACION),
                                                            m("td.tx-semibold.tx-normal",
                                                                _val.CANT),
                                                            m("td.tx-semibold.tx-normal",
                                                                _val.DESP),
                                                            m("td.tx-semibold.tx-normal",
                                                                _val.OBS),




                                                        ]),
                                                    ]

                                                } else {
                                                    return [
                                                        m("tr", [
                                                            m("td.tx-color-03.tx-normal",
                                                                _val.MEDICACION),
                                                            m("td.tx-color-03.tx-normal",
                                                                _val.CANT),
                                                            m("td.tx-color-03.tx-normal",
                                                                _val.DESP),
                                                            m("td.tx-color-03.tx-normal",
                                                                _val.OBS),




                                                        ]),
                                                    ]
                                                }


                                            })
                                        ])
                                    ])
                                ),

                                m("div.pd-5.mg-t-20.mg-b-30", [
                                    m("a.btn.btn-xs.btn-block.btn-primary", {
                                        href: VerReceta.data.URL,
                                        target: "_blank"
                                    }, "Abrir Receta")
                                ]),






                            ] : m("div.placeholder-paragraph.wd-100p", [
                                m("div.line"),
                                m("div.line")
                            ]))
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

const VerReceta = {
    numeroReceta: "",
    numeroHistoriaClinica: "",
    track: "",
    data: [],
    classPedido: "",
    descSStatusReceta: "",

    view: () => {

        return [

            m("div.animated.fadeInUp", {
                class: (RecetasAlta.showBitacora.length !== 0 ? "" : "d-none")
            }, [
                m(DetallePedido)
            ])

        ]

    },

};

const iPedido = {

    view: (_data) => {
        return [
            m("p.mg-0.tx-18", [
                m("i.fas.fa-user.mg-r-5.text-secondary"),
                _data.attrs.NM_PACIENTE,
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "HC: " + _data.attrs.CD_PACIENTE
                ),
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "N° Atención MV: " + _data.attrs.CD_ATENDIMENTO
                )
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "Ubicación: " + _data.attrs.UBICACION
                )
            ]),
        ];
    },

};


const RecetasAlta = {
    notificaciones: [],
    recetasAlta: [],
    showBitacora: "",
    oninit: (_data) => {
        if (isObjEmpty(_data.attrs)) {
            RecetasAlta.showBitacora = "";
        } else {
            RecetasAlta.showBitacora = "d-none";
            VerReceta.numeroReceta = _data.attrs.numeroReceta;
        }
        HeaderPrivate.page = "";
        SidebarFarma.page = "";

        App.isAuth('farmacia', 5);

    },

    oncreate: (_data) => {
        document.title = "Recetas de Alta | " + App.title;
        Notificaciones.suscribirCanal('MetroPlus-Farmacia');

        if (isObjEmpty(_data.attrs)) {
            loadRecetasAlta();
        } else {
            StatusReceta.fetch();
        }

    },
    onupdate: (_data) => {
        if (isObjEmpty(_data.attrs)) {
            RecetasAlta.showBitacora = "";
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            RecetasAlta.showBitacora = "d-none";
        }
    },
    view: (_data) => {


        if (isObjEmpty(_data.attrs)) {
            RecetasAlta.showBitacora = "";
        } else {
            RecetasAlta.showBitacora = "d-none";
        }

        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("farmacia") }),
            m(SidebarFarma, { oncreate: SidebarFarma.setPage(5) }),
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
                            m(m.route.Link, { href: "/farmacia" }, [
                                " Farmacia "
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recetas de Alta"
                        ),
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        (_data.attrs.numeroReceta == undefined) ? "Recetas de Alta:" : "Receta de Alta N°: " + VerReceta.numeroReceta
                    ),

                    m("p.mg-b-20.tx-14", {
                        class: (_data.attrs.numeroReceta == undefined) ? "" : "d-none"

                    }, [

                    ]),

                    m("div.row.animated.fadeInUp", {
                        class: RecetasAlta.showBitacora
                    }, [
                        m("div.col-12.mg-b-5.wd-100p[data-label='Filtrar'][id='filterTable']",

                            m("div.row", [
                                m('p.col-sm-12.pd-b-10"', 'Buscar por HC o Apellidos o Nombres completos:'),
                                m("div.col-sm-12.pd-b-10",
                                    m("div.input-group", [
                                        m(".df-example.demo-forms.wd-100p", [
                                            m("input.form-control[type='text'][id='tipoPiso'][data-role='tagsinput']", {
                                                oncreate: () => {


                                                    var citynames = new Bloodhound({
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

                                m("table.table.table-sm[id='table-recetasAlta'][width='100%']"),


                            ])
                        ])
                    ]),
                    m(VerReceta)
                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    ""
                ),

            ])
        ];
    },

};


function loadRecetasAlta() {

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
    var table = $("#table-recetasAlta").DataTable({
        "ajax": {
            url: "https://api.hospitalmetropolitano.org/t/v1/recetas-alta",
            dataSrc: "data",
            serverSide: true,
        },
        processing: true,
        serverSide: true,
        responsive: false,
        dom: 'ltp',
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
            title: "ID:"
        }, {
            title: "HC"
        }, {
            title: "PACINTE"
        }, {
            title: "FECHA RECETA:"
        }, {
            title: "PACIENTE:"
        }, {
            title: "OPCIONES:"
        }, ],
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
                width: "20%",

                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [4],
                width: "60%",
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [5],

                orderable: false,

            },
        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
        drawCallback: function(settings) {

            $(".table-content").show();
            $(".table-loader").hide();

            settings.aoData.map(function(_i) {


                m.mount(_i.anCells[3], {
                    view: function() {
                        return m("p.mg-0.tx-12", [
                            m("i.fas.fa-calendar.mg-r-5.text-secondary"),
                            _i._aData.DT_ATENDIMENTO
                        ])
                    }
                });
                m.mount(_i.anCells[4], { view: function() { return m(iPedido, _i._aData) } });
                m.mount(_i.anCells[5], {
                    view: function() {



                        return [
                            m(m.route.Link, {
                                id: "receta_" + _i._aData.NUM_PEDIDO_MV,
                                class: "btn btn-xs btn-block btn-primary mg-b-2",
                                href: "/farmacia/recetas/",
                                params: {
                                    numeroHistoriaClinica: _i._aData.CD_PACIENTE,
                                    numeroAtencion: _i._aData.CD_ATENDIMENTO,
                                    numeroReceta: _i._aData.CD_DOCUMENTO_CLINICO,
                                    track: "view",
                                },
                                onclick: () => {
                                    RecetasAlta.showBitacora = "d-none";
                                    VerReceta.numeroReceta = _i._aData.CD_DOCUMENTO_CLINICO;
                                    VerReceta.data = _i._aData;
                                    StatusReceta.fetch();
                                }


                            }, [
                                m("i.fas.fa-file-alt.mg-r-5"),
                            ], "Ver Receta de Alta"),



                        ]



                    }
                });
            })




        },
    }).on('xhr.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader').hide();
        $('.table-content').show();
        //   initDataPicker();
    }).on('page.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader').show();
        $('.table-content').hide();

    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });

    $('#tipoPiso').change(function(e) {
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#tipoPiso').val()).draw();
    });



    return table;



}


function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}



export default RecetasAlta;