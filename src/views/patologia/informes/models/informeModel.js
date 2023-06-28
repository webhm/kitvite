import m from 'mithril';
import api_url from '../../utils/api_url';

let informeModel = {
    listado: [],
    muestras: [],
    cortes: [],
    muestrasAsociadas: [],
    error: '',
    secuencialInforme: '',
    consecutivo: '',
    numeroPedido: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '', 
    medico:'',
    datosPaciente: null,
    loading: false,
    editing: false,
    cortesActualizados: false,
        
    cargarListado: function(numeropedidomv) {
        informeModel.loading = true;
        m.request({
            method: "GET",
            url: api_url + "api/v1/informe?nopedidomv=" + numeropedidomv,
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            informeModel.listado = result.data;
            informeModel.loading = false;
        })
        .catch(function(error) {
            informeModel.loading = false;
            informeModel.error = error;
            alert(informeModel.error);
        })
    },
   
    cargarMuestras: (numeropedidomv) => {
        m.request({
            method: "GET",
            url: api_url + "api/v1/muestras?nopedidomv=" + numeropedidomv,
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            informeModel.muestras = result.data;
        })
        .catch(function(error) {
            informeModel.error = error;
            alert(informeModel.error);
        })
    }, 
    
    cargarDatosPaciente: (numeropedidomv) => {
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/status-pedido-patologia",
            body: {},
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
                informeModel.datosPaciente = result.data;
            } else {
                Evoluciones.error = result.message;
            }            
        })
        .catch(function(error) {
            informeModel.error = error;
            alert(informeModel.error);
        })
    },

    guardar: (informe) => {
        m.request({
            method: 'POST',
            url: api_url + "api/v1/informe",
            body:  informe,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            informeModel.informecreaddo = result.data;
            alert("Los cambios han sido guardados correctamente");
        })
        .catch(function(error) {
            informeModel.error = "Se produjo error guardando el Informe: " + error;
            alert(informeModel.error);
        }) 
    },

    generarSecuencial: function(year, idtipoinforme) {
        m.request({
            method: "GET",
            url: api_url + "api/v1/informe/generarsecuencial/" + year + "/" + idtipoinforme,
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            informeModel.secuencialInforme = result.secuencialinforme;
            informeModel.consecutivo = result.consecutivo;
        })
        .catch(function(error) {
            informeModel.error = error;
            alert(informeModel.error);
        })   
    },    

    actualizar: (informe) => {
        m.request({
            method: 'PUT',
            url: api_url + "api/v1/informe/" + informe.id + "?nopedidomv=" + informeModel.numeroPedido,
            body:  informe,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            alert("Los cambios han sido guardados correctamente");
        })
        .catch(function(error) {
            informeModel.error = "Se produjo error guardando el informe: " + error;
            alert(informeModel.error);
        }) 
    },  

    finalizar: (informeId) => {
        informeModel.loading = true;
        m.request({
            method: 'POST',
            url: api_url + "api/v1/informe/finalizaInforme/" + informeId,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            informeModel.cargarListado(informeModel.numeroPedido);
            informeModel.loading = false;
            alert("El informe ha sido finalizado correctamente");
        })
        .catch(function(error) {
            informeModel.loading = false;
            informeModel.error = "Se produjo error guardando el informe: " + error;
            alert(informeModel.error);
        }) 
    },  
}

export default informeModel;