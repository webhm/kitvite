import m from 'mithril';
import api_url from '../../utils/api_url';

let macroscopicoModel = {
    listado: [],
    usuario: '',
    loading: false,

    cargarListado: function(usuario) {
        macroscopicoModel.loading = true;
        m.request({
            method: "GET",
            url: api_url + "api/v1/plantillamacroscopica?usuario=" + usuario,
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            if (result.status) {
                macroscopicoModel.listado = result.plantillas;
                macroscopicoModel.usuario = usuario;
                macroscopicoModel.loading = false;  
            }
            else {
                macroscopicoModel.loading = false;
                macroscopicoModel.error = result.message;
            }
        })
        .catch(function(error) {
            macroscopicoModel.loading = false;
            macroscopicoModel.error = error;
            alert(macroscopicoModel.error);
        })
    },

    guardar: (plantilla) => {
        m.request({
            method: 'POST',
            url: api_url + "api/v1/plantillamacroscopica",
            body:  plantilla,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            macroscopicoModel.cargarListado(macroscopicoModel.usuario);
        })
        .catch(function(error) {
            macroscopicoModel.error = "Se produjo error guardando la Plantilla: " + error.response.message;
            alert(macroscopicoModel.error);
        }) 
    },

    actualizar: (plantilla) => {
        m.request({
            method: 'PUT',
            url: api_url + "api/v1/plantillamacroscopica/" + parseInt(plantilla.id),
            body:  plantilla,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            macroscopicoModel.cargarListado(macroscopicoModel.usuario);
        })
        .catch(function(error) {
            macroscopicoModel.error = "Se produjo error guardando la plantilla: " + error.response.message;
            alert(macroscopicoModel.error);
        }) 
    }, 

    eliminar: (plantilla) => {
        m.request({
            method: 'DELETE',
            url: api_url + "api/v1/plantillamacroscopica/" + plantilla.id,
            body:  plantilla,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function() {            
            macroscopicoModel.cargarListado(macroscopicoModel.usuario);
        })
        .catch(function(error) {
            macroscopicoModel.error = "Se produjo error eliminando la plantilla: " + error.response.message;
            alert(macroscopicoModel.error);
        }) 
    },
}

export default macroscopicoModel;