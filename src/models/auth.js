import m from 'mithril';
import _Error_ from '../views/error';
import Encrypt from '../models/encrypt';






const Auth = {
    user: [],
    rol: null,
    labelRol: null,
    modulesAccess: [],
    username: "",
    password: "",
    messageError: "",
    statusHide: " d-none",
    statusError: "warning",
    imputDisabled: false,


    setUsername: (value) => {
        Auth.username = value
    },
    setPassword: (value) => {
        Auth.password = value
    },
    canSubmit: () => {
        return Auth.username !== "" && Auth.password !== "";
    },
    setError: (message) => {
        Auth.statusHide = "";
        Auth.statusError = "danger";
        Auth.messageError = message;

    },
    setSuccess: (message) => {
        Auth.statusHide = "";
        Auth.statusError = "success";
        Auth.messageError = message;

    },
    setProcess: () => {
        Auth.statusHide = "";
        Auth.statusError = "warning";
        Auth.messageError = 'Procesando...';
    },
    login: () => {
        Auth.imputDisabled = true;
        Auth.setProcess();
        return m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/auth",
            body: {
                user: Auth.username,
                pass: Auth.password
            }
        })
            .then(function (data) {

                if (data.status) {
                    window.localStorage.accessToken = data.jwt;
                    Auth.user = data.data.user;
                    Auth.rol = data.data.rol;
                    Auth.user.rol = Auth.rol;
                    Auth.modulesAccess = data.data.modulesAccess;
                    Encrypt.setDataUser({ user: Auth.user, modulesAccess: Auth.modulesAccess })
                    Auth.setSuccess('¡Bienvenido!');
                    setTimeout(function () {
                        Auth.imputDisabled = false;
                        Auth.statusHide = "d-none";
                        Auth.statusError = "warning";
                        Auth.messageError = "";
                        Auth.username = "";
                        Auth.password = "";
                        m.route.set('/inicio');
                    }, 900);
                } else {
                    Auth.imputDisabled = false;
                    Auth.statusHide = "d-none";
                    Auth.statusError = "warning";
                    Auth.messageError = "";
                    Auth.setError(data.message);
                }


            }).catch(function (error) {
                Auth.imputDisabled = false;
                Auth.statusHide = "d-none";
                Auth.statusError = "warning";
                Auth.messageError = "";
                Auth.username = "";
                Auth.password = "";
                Auth.setError(_Error_.httpError);
            });
    },
    isLogin: () => {

        if (window.localStorage.getItem('accessToken') !== undefined && window.localStorage.getItem('accessToken')) {
            return true;
        } else {
            return false
        }

    },
};




export default Auth;