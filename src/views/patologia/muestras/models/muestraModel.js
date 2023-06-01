let muestraModel = {
    listado: [],
    examenes: [],
    error: '',
    secuencialMuestra: '',
    numeroPedido: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    medico: '',
    loading: false,

    cargarListado: function(numeropedidomv) {
        muestraModel.loading = true;
        m.request({
            method: "GET",
            url: "http://localhost:8000/api/v1/muestras?nopedidomv=" + numeropedidomv,
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            muestraModel.listado = result.data;
            muestraModel.loading = false;
        })
        .catch(function(error) {
            muestraModel.loading = false;
            muestraModel.error = error;
            alert(muestraModel.error);
        })
    },

    cargarExamenes: (numeropedidomv) => {
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/status-pedido-patologia",
            body: {
                numeroPedido: numeropedidomv,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            if (result.status) {              
                muestraModel.examenes = result.examenes;
            } else {
                muestraModel.error = result.message;
            }
        })
        .catch(function(error) {
            muestraModel.error = error;
            alert(muestraModel.error);
        })
    },

    generarSecuencial: function() {
        m.request({
            method: "GET",
            url: "http://localhost:8000/api/v1/muestras/obtenersecuencial",
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            muestraModel.secuencialMuestra = result.id + 1;
        })
        .catch(function(error) {
            muestraModel.error = error;
            alert(muestraModel.error);
        })   
    },

    guardar: (muestra) => {
        m.request({
            method: 'POST',
            url: "http://localhost:8000/api/v1/muestras?nopedidomv=" + muestraModel.numeroPedido,
            body:  muestra,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            muestraModel.cargarListado(muestraModel.numeroPedido);
            muestraModel.secuencialMuestra = '';
        })
        .catch(function(error) {
            muestraModel.error = "Se produjo error guardando la muestra: " + error.response.message;
            alert(muestraModel.error);
        }) 
    },

    actualizar: (muestra) => {
        m.request({
            method: 'PUT',
            url: "http://localhost:8000/api/v1/muestras/" + muestra.id + "?nopedidomv=" + muestraModel.numeroPedido,
            body:  muestra,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            muestraModel.cargarListado(muestraModel.numeroPedido);
            muestraModel.secuencialMuestra = '';
        })
        .catch(function(error) {
            muestraModel.error = "Se produjo error guardando la muestra: " + error.response.message;
            alert(muestraModel.error);
        }) 
    },  

    asociarExamen: (examen) => {
        m.request({
            method: 'POST',
            url: "http://localhost:8000/api/v1/asociacionexamenes?nopedidomv=" + muestraModel.numeroPedido,
            body:  examen,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function() {
            muestraModel.cargarListado(muestraModel.numeroPedido);
        })
        .catch(function(error) {
            muestraModel.error = "Se produjo error guardando la muestra: " + error.response.message;
            alert(muestraModel.error);
        }) 
    },

    eliminarExamenasociado: (idAsociacion) => {
        m.request({
            method: 'DELETE',
            url: "http://localhost:8000/api/v1/asociacionexamenes/eliminarasociacion/" + idAsociacion + "?nopedidomv=" + muestraModel.numeroPedido,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function() {
            muestraModel.cargarListado(muestraModel.numeroPedido);
        })
        .catch(function(error) {
            muestraModel.error = "Se produjo error guardando la muestra: " + error.response.message;
            alert(muestraModel.error);
        }) 
    },
}

export default muestraModel;