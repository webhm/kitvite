

const Salir = {

    oncreate: () => {
        window.localStorage.removeItem('accessToken');
        return m.route.set("/auth")
    },

    view: () => {

    },
};

export default Salir;