import m from "mithril";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const SubscribirCanal = {
    canal: "",
    oninit: (_data) => {
        if (_data.attrs.canal !== undefined) {
            SubscribirCanal.canal = _data.attrs.canal;
        }
    },

    subscribirCanal: (canal) => {
        const beamsClient = new PusherPushNotifications.Client({ instanceId: '75c0a111-da02-4af0-b35b-66124bd7f2b5' });
        beamsClient.start().then(() => beamsClient.addDeviceInterest(canal)).then(() => {
            alert('Proceso realizado con éxito. Usuario (Dispositivo) subscrito al canal: ' + canal);
            console.log('Successfully registered and subscribed! + ' + canal);

        }).catch(console.error);
    },
    view: () => {

        if (SubscribirCanal.canal.length !== 0) {
            SubscribirCanal.subscribirCanal(SubscribirCanal.canal);
        }

    },

};


export default SubscribirCanal;