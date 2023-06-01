import m from "mithril";
import * as PusherPushNotifications from "@pusher/push-notifications-web";




const Updates = {
    data: {
        pedidos: [],
        notificaciones: [],
    },
    fetchPedidos: () => {
        m.request({
                method: "GET",
                url: " https://api.hospitalmetropolitano.org/t/v1/pedidos-laboratorio?start=0&length=10",
            })
            .then(function(res) {
                Updates.data.pedidos = res.data;
                Updates.fetchNotificaciones();
            })
            .catch(function(e) {});
    },
    fetchNotificaciones: () => {
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/notificaciones-pedidos?start=0&length=6",
            })
            .then(function(res) {
                Updates.data.notificaciones = res.data;
                if (localStorage.updates == undefined) {
                    Encrypt.setData(Updates.data)
                    Updates.notificar();
                } else {
                    Updates.notificar();
                }
            })
            .catch(function(e) {});
    },
    fetch: () => {
        Updates.fetchPedidos();
    },

    notificar: () => {

        let localNotificaciones = Encrypt.getData();

        for (var i = 0; i < Updates.data.notificaciones.length; i++) {
            var igual = false;
            for (var j = 0; j < localNotificaciones.notificaciones.length & !igual; j++) {
                if (Updates.data.notificaciones[i]['id'] == localNotificaciones.notificaciones[j]['id']) {
                    igual = true;
                }
            }
            if (!igual) {
                nueva_notificacion_muestra(Updates.data.notificaciones[i]);
            }
        }


        for (var i = 0; i < Updates.data.pedidos.length; i++) {
            var igual = false;
            for (var j = 0; j < localNotificaciones.pedidos.length & !igual; j++) {
                if (Updates.data.pedidos[i]['NUM_PEDIDO_MV'] == localNotificaciones.pedidos[j]['NUM_PEDIDO_MV']) {
                    igual = true;
                }
            }
            if (!igual) {
                nueva_notificacion(Updates.data.pedidos[i]);
            }
        }

        Encrypt.setData(Updates.data)
        setTimeout(function() {
            console.log("updates", Updates.data)
            Updates.fetch();
        }, 5000);

    },

};



const StoreNotificacion = {
    store: [],
    notificaciones: [],
    registraCanal: () => {
        StoreNotificacion.push({
            id: _data.id,
            data: null
        })
    },
    despacharMensajes: () => {

        if (StoreNotificacion.notificaciones.length !== 0) {
            StoreNotificacion.notificaciones.map(function(_i, _n) {

                Notificaciones.setNot();
                console.log(_i)
                StoreNotificacion.sendPush({ title: "Nueva NOTIFICACION", message: "Es" });


            })
        }


    },
    sendPush: (_mData) => {
        if (Notification) {
            if (Notification.permission !== "granted") {
                Notification.requestPermission()
            }


            var title = "Metrovirtual: " + _mData.title
            var extra = {
                icon: "assets/favicon.ico",
                body: _mData.message
            }
            var noti = new Notification(title, extra)
            noti.onclick = () => {}
            noti.onclose = {
                // Al cerrar
            }
            setTimeout(function() { noti.close() }, 30000)
        }
    },
    nuevaNotificacion: (nuevaNotificacion = {}) => {
        var dataNots = StoreNotificacion.notificaciones;
        StoreNotificacion.notificaciones = [];
        dataNots.push(nuevaNotificacion);

        setTimeout(function() {
            StoreNotificacion.notificaciones = dataNots;
            StoreNotificacion.despacharMensajes();
        }, 1000);


    },
    oninit: () => {

        const beamsClient = new PusherPushNotifications.Client({ instanceId: '75c0a111-da02-4af0-b35b-66124bd7f2b5' });
        beamsClient.start().then(() => beamsClient.addDeviceInterest('Metrovirtual')).then(() => console.log('Successfully registered and subscribed!')).catch(console.error);


    },
    suscribirCanal: (canal) => {

        const beamsClient = new PusherPushNotifications.Client({ instanceId: '75c0a111-da02-4af0-b35b-66124bd7f2b5' });
        beamsClient.start().then(() => beamsClient.addDeviceInterest(canal)).then(() => console.log('Successfully registered and subscribed! + ' + canal)).catch(console.error);


    },
    view: () => {

    }

};


const Notificaciones = {
    num: 0,
    message: " tenemos nueva información disponible para ti. Click aquí!.",
    timestamp: "",
    setNot: () => {
        Notificaciones.num = Notificaciones.num + 1;
    },
    suscribirCanal: (canal) => {
        return StoreNotificacion.suscribirCanal(canal);
    },

    view: () => {
        return [
            m(StoreNotificacion),
            m("div.dropdown.dropdown-notification", [
                m("a.dropdown-link.new-indicator[href=''][data-toggle='dropdown']", [
                    m("i[data-feather='bell']"),
                    m("span", {
                            class: ((Notificaciones.num == 0) ? "d-none" : "")
                        },
                        Notificaciones.num
                    )
                ]),
                m("div.dropdown-menu.dropdown-menu-right", {
                    class: ((Notificaciones.num == 0) ? "d-none" : "")
                }, [
                    m("div.dropdown-header",
                        "Notificaciones"
                    ),
                    m("a.dropdown-item", {
                            onclick: (e) => {
                                e.preventDefault();
                                m.route.set('/notificaciones');
                            }
                        },
                        m("div.media", [

                            m("div.media-body.mg-l-15", [
                                m("p", [
                                    m("strong",
                                        "Metrovirtual "
                                    ),
                                    Notificaciones.message
                                ]),
                                m("span",
                                    Notificaciones.timestamp
                                )
                            ])
                        ])
                    ),
                    m("div.dropdown-footer",
                        m("a[href='/']",
                            "Ver Todo"
                        )
                    )
                ])
            ]),
        ];
    },
};


export default Notificaciones;