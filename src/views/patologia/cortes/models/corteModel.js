let corteModel = {
    listado: [],
    secuencialCorte: [],
    informeId: '',
    editar:'',

    generarSecuencial: function(letra) {
        let newSecuencial = 1;
        let indice = corteModel.secuencialCorte.findIndex(e => e.letra === letra);
        if (indice >= 0) {
            newSecuencial = corteModel.secuencialCorte[indice].consecutivo + 1;
            corteModel.secuencialCorte[indice].consecutivo = newSecuencial;
        } else {
            corteModel.secuencialCorte.push({letra: letra, consecutivo: newSecuencial});
        }        
        return newSecuencial;
    },
    
    cargarListado: function(informeId) {
        m.request({
            method: "GET",
            url: "http://localhost:8000/api/v1/cortes?informeid=" + informeId,
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            if (result) {
                corteModel.listado = result.data;
            } else {
                corteModel.listado = [];
            }
            corteModel.secuencialCorte = [];
        })
        .catch(function(error) {
            corteModel.error = error;
            alert(corteModel.error);
        })
    },

    guardar: (corte) => {
        m.request({
            method: 'POST',
            url: "http://localhost:8000/api/v1/cortes?informeid=" + corteModel.informeId,
            body:  corte,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            corteModel.cargarListado(corteModel.informeId);
            corteModel.secuencialCorte = '';
        })
        .catch(function(error) {
            corteModel.error = "Se produjo error guardando el corte: " + error.response.message;
            alert(corteModel.error);
        }) 
    },
}

export default corteModel;