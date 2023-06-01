import m from "mithril";
import Notificaciones from "../../models/notificaciones";
import Loader from "../loader";

const ReloadNotification = {
    loadPage: "",
    view: (_data) => {
        window.localStorage.removeItem('updates');
        Notificaciones.num = 0;
        return [
            m(Loader),
            setTimeout(function() { return m.route.set(ReloadNotification.loadPage) }, 300),
        ]
    },

};

export default ReloadNotification;