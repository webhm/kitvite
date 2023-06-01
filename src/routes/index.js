// Pages here
import App from '../views/app'
import RedirMV from '../views/redir'
import Salir from '../views/salir'
import Login from '../views/login/login'
import Laboratorio from '../views/laboratorio/laboratorio'
import NotificacionesLab from '../views/laboratorio/notificaciones/notificaciones'
import SubscribirCanal from '../models/subscribirCanal'
import FiltrosLab from '../views/laboratorio/notificaciones/filtros'
import NotificacionesEnviadasLab from '../views/laboratorio/notificaciones/enviadas'
import LaboratorioPedidos from '../views/laboratorio/flebotomista/flebotomista'
import LisaPedidosIngresados from '../views/lisa/pedidosIngresados'
import LisaPedido from '../views/lisa/pedidoLisa'
import LaboratorioFlebotomista from '../views/laboratorio/flebotomista/flebotomista'
import LaboratorioFormularios from '../views/laboratorio/formularios/formularios'
import MiPerfil from '../views/perfil/perfil';
import _404 from '../views/404';
import Inicio from '../views/inicio/inicio';
import ReloadNotification from '../views/layout/reload-notificacion';
import Emergencia from '../views/emergencia/emergencia'
import EmergenciaAuxiliarPedidosLaboratorio from '../views/emergencia/auxiliar/pedidos'
import VerPedidoAuxiliarEmergencia from '../views/emergencia/auxiliar/verPedido'
import EmergenciaEnfermeriaPedidosLaboratorio from '../views/emergencia/enfermeria/pedidos'
import VerPedidoEnfermeriaEmergencia from '../views/emergencia/enfermeria/verPedido'
import Farmacia from '../views/farmacia//farmacia'
import FarmaciaRecetasAlta from '../views/farmacia//recetas/recetasAlta'
import Admisiones from '../views/admisiones/admisiones'
import PreAdmisiones from '../views/admisiones/pacientes/preadmisiones'
import Mantenimiento from '../views/mantenimiento/mantenimiento'
import IntegracionHigienizacion from '../views/mantenimiento/higienizacion/higienizacion'
import Hospitalizacion from '../views/hospitalizacion/hospitalizacion'
import Pasaportes from '../views/hospitalizacion/pasaportes/pasaportes'
import ControlCamas from '../views/hospitalizacion/controlCamas/controlCamas'
import NotificacionesPendientesLab from '../views/laboratorio/notificaciones/pendientes'
import NotificacionesErroresLab from '../views/laboratorio/notificaciones/errores'
import TRPedidos from '../views/tr/pedidos/pedidos'
import BSPedidos from '../views/laboratorio/notificaciones/bs'
import NeuroPedidos from '../views/neuro/pedidos/pedidos'
import ImagenPedidos from '../views/imagen/pedidos/pedidos'
import ImagenPedido from '../views/imagen/pedidos/pedido'
import Imagen from '../views/imagen/imagen'
import Neuro from '../views/neuro/neuro'
import NeuroPedido from '../views/neuro/pedidos/pedido'
import TerapiaRespiratoria from '../views/tr/tr'
import TRPedido from '../views/tr/pedidos/pedido'
import HeaderPrivate from '../views/layout/header-private';
import Endoscopia from '../views/endoscopia/endoscopia'
import EndoscopiaPedidos from '../views/endoscopia/pedidos/pedidos'
import EndoPedido from '../views/endoscopia/pedidos/pedido'
import PedidoFlebotomista from '../views/laboratorio/flebotomista/pedidoFlebotomista'
import Patologia from '../views/patologia/patologia'
import PatologiaPedidos from '../views/patologia/pedidos/pedidos'
import PedidoPatologia from '../views/patologia/pedidos/pedido'
import Etiquetas from '../views/admisiones/etiquetas/etiquetas'
import Recetas from '../views/farmacia/recetas/recetas'
import RecetaFarmacia from '../views/farmacia/recetas/receta'
import crearInforme from '../views/patologia/informes/crearInforme'
import editarInforme from '../views/patologia/informes/editarInforme'
import listadoFirmas from '../views/patologia/firmas/listadoFirmas'
import listadoPlantillasDiagnostico from '../views/patologia/plantillaDiagnostico/listadoPlantillasDiagnostico'
import listadoPlantillasMacroscopico from '../views/patologia/plantillaMacroscopico/listadoPlantillasMacroscopico'


// Routes here
const Routes = {
    '/': App,
    '/subscribir/notificaciones': SubscribirCanal, //SubscribirCanal
    '/redir/mv/:idAtencion': RedirMV, //RedirMV
    '/inicio': Inicio,
    '/laboratorio': Laboratorio, //Laboratorio
    '/laboratorio/lisa/pedidos/ingresados': {
        oninit: (_data) => {
            App.isAuth('laboratorio', 16);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/laboratorio/lisa/pedidos/ingresados/', { idFiltro: 1 })
            }

            LisaPedidosIngresados.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== LisaPedidosIngresados.idFiltro && LisaPedidosIngresados.idFiltro !== 1 && LisaPedidosIngresados.fechaDesde !== undefined) {
                LisaPedidosIngresados.idFiltro = _data.attrs.idFiltro;
                LisaPedidosIngresados.fechaDesde = _data.attrs.fechaDesde;
                LisaPedidosIngresados.fechaHasta = _data.attrs.fechaHasta;
                LisaPedidosIngresados.loader = true;
                LisaPedidosIngresados.pedidos = [];
                LisaPedidosIngresados.fetchPedidosIngresados();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    LisaPedidosIngresados.idFiltro = _data.attrs.idFiltro;
                    LisaPedidosIngresados.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    LisaPedidosIngresados.fechaHasta = moment().format('DD-MM-YYYY');
                    if (LisaPedidosIngresados.pedidos.length == 0) {
                        LisaPedidosIngresados.loader = true;
                        LisaPedidosIngresados.pedidos = [];
                        LisaPedidosIngresados.fetchPedidosIngresados();
                    } else {
                        LisaPedidosIngresados.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
                m(LisaPedidosIngresados),
            ];
        },

    }, //Laboratorio Lisa Pedidos Ingresados
    '/laboratorio/lisa/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined && _data.idTimeRecord !== undefined) {
                return LisaPedido;
            } else {
                return m.route.SKIP;
            }
        }
    }, //LisaPedido
    '/laboratorio/notificaciones': NotificacionesLab, //NotificacionesLab
    '/laboratorio/notificaciones/filtros': FiltrosLab, //FiltrosLab
    '/laboratorio/notificaciones/enviadas': NotificacionesEnviadasLab, //NotificacionesEnviadasLab
    '/laboratorio/notificaciones/pendientes': NotificacionesPendientesLab, //NotificacionesPendientesLab
    '/laboratorio/notificaciones/error': NotificacionesErroresLab, //NotificacionesErroresLab
    '/laboratorio/flebotomista': {
        oninit: (_data) => {
            App.isAuth('laboratorio', 16);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/laboratorio/flebotomista/', { idFiltro: 1 })
            }

            LaboratorioPedidos.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== LaboratorioPedidos.idFiltro && LaboratorioPedidos.idFiltro !== 1 && LaboratorioPedidos.fechaDesde !== undefined) {
                LaboratorioPedidos.idFiltro = _data.attrs.idFiltro;
                LaboratorioPedidos.fechaDesde = _data.attrs.fechaDesde;
                LaboratorioPedidos.fechaHasta = _data.attrs.fechaHasta;
                LaboratorioPedidos.loader = true;
                LaboratorioPedidos.pedidos = [];
                LaboratorioPedidos.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    LaboratorioPedidos.idFiltro = _data.attrs.idFiltro;
                    LaboratorioPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    LaboratorioPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                    if (LaboratorioPedidos.pedidos.length == 0) {
                        LaboratorioPedidos.loader = true;
                        LaboratorioPedidos.pedidos = [];
                        LaboratorioPedidos.fetchPedidos();
                    } else {
                        LaboratorioPedidos.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
                m(LaboratorioPedidos),
            ];
        },

    }, // LaboratorioPedidos
    '/laboratorio/flebotomista/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined && _data.idTimeRecord !== undefined) {
                return PedidoFlebotomista
            } else {
                return m.route.SKIP;
            }
        }
    }, //PedidoFlebotomista
    '/laboratorio/formularios': LaboratorioFormularios, //LaboratorioPedidos
    '/emergencia': Emergencia, //Emergencia
    '/emergencia/auxiliar/pedidos/laboratorio': EmergenciaAuxiliarPedidosLaboratorio, //EmergenciaAuxiliarPedidosLaboratorio
    '/emergencia/auxiliar/pedido/:idPedido': VerPedidoAuxiliarEmergencia, //EmergenciaAuxiliarPedidosLaboratorio
    '/emergencia/enfermeria/pedidos/laboratorio': EmergenciaEnfermeriaPedidosLaboratorio, //EmergenciaEnfermeriaPedidosLaboratorio
    '/emergencia/enfermeria/pedido/:idPedido': VerPedidoEnfermeriaEmergencia, //VerPedidoEnfermeriaEmergencia
    '/farmacia': Farmacia, //Farmacia
    '/farmacia/recetas': {
        oninit: (_data) => {
            App.isAuth('farmacia', 5);
            document.title = "Recetas de Alta | " + App.title;
            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/farmacia/recetas/', { idFiltro: 1 })
            }
            Recetas.idFiltro = _data.attrs.idFiltro;
        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== Recetas.idFiltro && Recetas.idFiltro !== 1 && Recetas.fechaDesde !== undefined) {
                Recetas.idFiltro = _data.attrs.idFiltro;
                Recetas.fechaDesde = _data.attrs.fechaDesde;
                Recetas.fechaHasta = _data.attrs.fechaHasta;
                Recetas.loader = true;
                Recetas.pedidos = [];
                Recetas.fetch();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    Recetas.idFiltro = _data.attrs.idFiltro;
                    Recetas.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    Recetas.fechaHasta = moment().format('DD-MM-YYYY');
                    if (Recetas.pedidos.length == 0) {
                        Recetas.loader = true;
                        Recetas.pedidos = [];
                        Recetas.fetch();
                    } else {
                        Recetas.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
                m(Recetas),
            ];
        },
    }, //Recetas Alta
    '/farmacia/receta/': {
        onmatch: (_data) => {
            if (_data.numeroReceta !== undefined) {
                return RecetaFarmacia;
            } else {
                return m.route.SKIP;
            }
        }
    }, // RecetaFarmacia
    '/admisiones': Admisiones, //Admisiones
    '/admisiones/pre': PreAdmisiones, //PreAdmisiones
    '/admisiones/etiquetas': {
        oninit: (_data) => {
            App.isAuth('admisiones', 7);
            document.title = "Impresión de Etiquetas | " + App.title;
            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/admisiones/etiquetas/', { idFiltro: 1 })
            }
            Etiquetas.idFiltro = _data.attrs.idFiltro;
        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== Etiquetas.idFiltro && Etiquetas.idFiltro !== 1 && Etiquetas.fechaDesde !== undefined) {
                Etiquetas.idFiltro = _data.attrs.idFiltro;
                Etiquetas.fechaDesde = _data.attrs.fechaDesde;
                Etiquetas.fechaHasta = _data.attrs.fechaHasta;
                Etiquetas.loader = true;
                Etiquetas.pedidos = [];
                Etiquetas.fetchEtiquetas();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    Etiquetas.idFiltro = _data.attrs.idFiltro;
                    Etiquetas.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    Etiquetas.fechaHasta = moment().format('DD-MM-YYYY');
                    if (Etiquetas.pedidos.length == 0) {
                        Etiquetas.loader = true;
                        Etiquetas.pedidos = [];
                        Etiquetas.fetchEtiquetas();
                    } else {
                        Etiquetas.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("admisiones") }),
                m(Etiquetas),
            ];
        },

    }, // PacientesEtiquetas
    '/mantenimiento': Mantenimiento, //Mantenimiento
    '/mantenimiento/higienizacion': IntegracionHigienizacion, //IntegracionHigienizacion
    '/hospitalizacion': Hospitalizacion, //Hospitalizacion
    '/hospitalizacion/pasaportes': Pasaportes, //Pasaportes
    '/hospitalizacion/control-camas': ControlCamas, //Control Camas
    '/terapia-respiratoria/pedidos': {
        oninit: (_data) => {
            App.isAuth('terapia-respiratoria', 18);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/terapia-respiratoria/pedidos/', { idFiltro: 1 })
            }

            TRPedidos.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== TRPedidos.idFiltro && TRPedidos.idFiltro !== 1 && TRPedidos.fechaDesde !== undefined) {
                TRPedidos.idFiltro = _data.attrs.idFiltro;
                TRPedidos.fechaDesde = _data.attrs.fechaDesde;
                TRPedidos.fechaHasta = _data.attrs.fechaHasta;
                TRPedidos.loader = true;
                TRPedidos.pedidos = [];
                TRPedidos.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    TRPedidos.idFiltro = _data.attrs.idFiltro;
                    TRPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    TRPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                    if (TRPedidos.pedidos.length == 0) {
                        TRPedidos.loader = true;
                        TRPedidos.pedidos = [];
                        TRPedidos.fetchPedidos();
                    } else {
                        TRPedidos.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("terapia-respiratoria") }),
                m(TRPedidos),
            ];
        },

    }, //TRPedidos
    '/bco-sangre/pedidos': BSPedidos, //BSPedidos
    '/neurofisiologia': Neuro, //Neuro
    '/neurofisiologia/pedidos': {
        oninit: (_data) => {
            App.isAuth('neurofisiologia', 20);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/neurofisiologia/pedidos/', { idFiltro: 1 })
            }

            NeuroPedidos.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== NeuroPedidos.idFiltro && NeuroPedidos.idFiltro !== 1 && NeuroPedidos.fechaDesde !== undefined) {
                NeuroPedidos.idFiltro = _data.attrs.idFiltro;
                NeuroPedidos.fechaDesde = _data.attrs.fechaDesde;
                NeuroPedidos.fechaHasta = _data.attrs.fechaHasta;
                NeuroPedidos.loader = true;
                NeuroPedidos.pedidos = [];
                NeuroPedidos.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    NeuroPedidos.idFiltro = _data.attrs.idFiltro;
                    NeuroPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    NeuroPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                    if (NeuroPedidos.pedidos.length == 0) {
                        NeuroPedidos.loader = true;
                        NeuroPedidos.pedidos = [];
                        NeuroPedidos.fetchPedidos();
                    } else {
                        NeuroPedidos.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("neurofisiologia") }),
                m(NeuroPedidos),
            ];
        },

    }, // NeuroPedidos,
    '/neurofisiologia/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return NeuroPedido;
            } else {
                return m.route.SKIP;
            }
        }
    }, // NeuroPedido
    '/terapia-respiratoria': TerapiaRespiratoria, // TerapiaRespiratoria
    '/terapia-respiratoria/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return TRPedido;
            } else {
                return m.route.SKIP;
            }
        }
    }, // TRPedido
    '/imagen': Imagen, // Imagen
    '/imagen/pedidos': {
        oninit: (_data) => {
            App.isAuth('laboratorio', 16);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/imagen/pedidos/', { idFiltro: 1 })
            }

            ImagenPedidos.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== ImagenPedidos.idFiltro && ImagenPedidos.idFiltro !== 1 && ImagenPedidos.fechaDesde !== undefined) {
                ImagenPedidos.idFiltro = _data.attrs.idFiltro;
                ImagenPedidos.fechaDesde = _data.attrs.fechaDesde;
                ImagenPedidos.fechaHasta = _data.attrs.fechaHasta;
                ImagenPedidos.loader = true;
                ImagenPedidos.pedidos = [];
                ImagenPedidos.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    ImagenPedidos.idFiltro = _data.attrs.idFiltro;
                    ImagenPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    ImagenPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                    if (ImagenPedidos.pedidos.length == 0) {
                        ImagenPedidos.loader = true;
                        ImagenPedidos.pedidos = [];
                        ImagenPedidos.fetchPedidos();
                    } else {
                        ImagenPedidos.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("imagen") }),
                m(ImagenPedidos),
            ];
        },

    }, // ImagenPedidos
    '/imagen/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return ImagenPedido;
            } else {
                return m.route.SKIP;
            }
        }
    }, // ImagenPedido
    '/endoscopia': Endoscopia, // Endoscopia
    '/endoscopia/pedidos': {
        oninit: (_data) => {
            App.isAuth('endoscopia', 25);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/endoscopia/pedidos/', { idFiltro: 1 })
            }

            EndoscopiaPedidos.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== EndoscopiaPedidos.idFiltro && EndoscopiaPedidos.idFiltro !== 1 && EndoscopiaPedidos.fechaDesde !== undefined) {
                EndoscopiaPedidos.idFiltro = _data.attrs.idFiltro;
                EndoscopiaPedidos.fechaDesde = _data.attrs.fechaDesde;
                EndoscopiaPedidos.fechaHasta = _data.attrs.fechaHasta;
                EndoscopiaPedidos.loader = true;
                EndoscopiaPedidos.pedidos = [];
                EndoscopiaPedidos.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    EndoscopiaPedidos.idFiltro = _data.attrs.idFiltro;
                    EndoscopiaPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    EndoscopiaPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                    if (EndoscopiaPedidos.pedidos.length == 0) {
                        EndoscopiaPedidos.loader = true;
                        EndoscopiaPedidos.pedidos = [];
                        EndoscopiaPedidos.fetchPedidos();
                    } else {
                        EndoscopiaPedidos.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("endoscopia") }),
                m(EndoscopiaPedidos),
            ];
        },

    }, // EndoscopiaPedidos
    '/endoscopia/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return EndoPedido;

            } else {
                return m.route.SKIP;
            }
        }
    }, // EndoPedido
    '/patologia': Patologia, //Patologia
    '/patologia/pedidos': {
        oninit: (_data) => {
            App.isAuth('patologia', 26);
            document.title = "Recepción de Pedidos | " + App.title;

            if (_data.attrs.idFiltro == undefined && _data.attrs.fechaDesde == undefined) {
                return m.route.set('/patologia/pedidos/', { idFiltro: 1 })
            }

            PatologiaPedidos.idFiltro = _data.attrs.idFiltro;


        },
        onupdate: (_data) => {

            if (_data.attrs.idFiltro !== PatologiaPedidos.idFiltro && PatologiaPedidos.idFiltro !== 1 && PatologiaPedidos.fechaDesde !== undefined) {
                PatologiaPedidos.idFiltro = _data.attrs.idFiltro;
                PatologiaPedidos.fechaDesde = _data.attrs.fechaDesde;
                PatologiaPedidos.fechaHasta = _data.attrs.fechaHasta;
                PatologiaPedidos.loader = true;
                PatologiaPedidos.pedidos = [];
                PatologiaPedidos.fetchPedidos();
            } else {

                if (_data.attrs.idFiltro == 1) {

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

                    PatologiaPedidos.idFiltro = _data.attrs.idFiltro;
                    PatologiaPedidos.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
                    PatologiaPedidos.fechaHasta = moment().format('DD-MM-YYYY');
                    if (PatologiaPedidos.pedidos.length == 0) {
                        PatologiaPedidos.loader = true;
                        PatologiaPedidos.pedidos = [];
                        PatologiaPedidos.fetchPedidos();
                    } else {
                        PatologiaPedidos.loader = false;
                    }
                }
            }


        },
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
                m(PatologiaPedidos),
            ];
        },

    },
    '/patologia/pedidos/nuevoinforme': {
        view: (_data) => {
            if (_data.attrs.numeroPedido !== undefined && _data.attrs.numeroAtencion !== undefined && _data.attrs.numeroHistoriaClinica !== undefined) {
                return m(crearInforme, {
                    "numeroPedido": _data.attrs.numeroPedido,
                    "numeroAtencion": _data.attrs.numeroAtencion,
                    "numeroHistoriaClinica": _data.attrs.numeroHistoriaClinica,
                });
            } else {
                return m.route.SKIP;
            }
        }
    }, 
    '/patologia/pedidos/editarinforme': {
        view: (_data) => {
            return m(editarInforme, {
                "informeId": _data.attrs.informeId,
                "informeModelo": _data.attrs.informeId
                
            });
            if (_data.attrs.informeId !== undefined) {
                return m(editarInforme, {
                    "informeId": _data.attrs.informeId
                });
            } else {
                return m.route.SKIP;
            }
        }
    }, 
    '/patologia/gestionPlantillaMacroscopico': {
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
                m(listadoPlantillasMacroscopico),
            ];
        },
    },
    '/patologia/gestionPlantillaDiagnostico': {
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
                m(listadoPlantillasDiagnostico),
            ];
        },
    },
    '/patologia/gestionFirmas': {
        view: (_data) => {
            return [
                m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
                m(listadoFirmas)
            ];
        },
    },
    '/patologia/pedido/': {
        onmatch: (_data) => {
            if (_data.numeroPedido !== undefined) {
                return PedidoPatologia;

            } else {
                return m.route.SKIP;
            }
        }
    },  // EndoPedido
    '/auth': Login, // Login
    '/mi-perfil': MiPerfil, // MiPerfil
    '/salir': Salir, // Salir
    '/notificaciones': ReloadNotification, // ReloadNotificaciones
    "/:404...": _404
};


const DefaultRoute = '/';

export { Routes, DefaultRoute }