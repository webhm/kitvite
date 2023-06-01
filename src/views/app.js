import Auth from '../models/auth';
import Loader from './loader';
import Encrypt from '../models/encrypt';



const App = {
    title: "MetroPlus v1.0.0",
    oninit: () => {

        document.title = "Cargando...";
    },
    oncreate: () => {
        document.title = "Bienvenido | " + App.title;

    },
    isShow: (modulo = "", idModulo = 0) => {


        let _user = Encrypt.getDataUser();
        Auth.user = _user.user;
        Auth.rol = _user.user.rol;
        Auth.modulesAccess = _user.modulesAccess;

        if (idModulo !== 0) {
            let _ac = 0;

            Auth.modulesAccess[modulo].map(function (_v, _i, _contentData) {
                if (_v.idModulo == idModulo) {
                    _ac++;
                }

            });


            if (_ac == 0) {
                return false;
            } else {
                return true;
            }

        }

        return true;


    },
    isAuth: (modulo = "", idModulo = 0) => {
        if (!Auth.isLogin()) {
            return m.route.set('/auth');
        }


        let _user = Encrypt.getDataUser();
        Auth.user = _user.user;
        Auth.rol = _user.user.rol;
        Auth.modulesAccess = _user.modulesAccess;

        if (idModulo !== 0) {
            let _ac = 0;

            Auth.modulesAccess[modulo].map(function (_v, _i, _contentData) {
                if (_v.idModulo == idModulo) {
                    _ac++;
                }

            });


            if (_ac == 0) {
                m.route.set('/inicio');
            }

        }

    },
    view: () => {
        return [
            m(Loader),
            setTimeout(function () {
                App.isAuth()
                m.route.set('/inicio');
            }, 300)
        ];
    },
};







export default App;