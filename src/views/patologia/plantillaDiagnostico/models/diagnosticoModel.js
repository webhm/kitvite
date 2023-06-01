let diagnosticoModel = {
    listado: [],
    usuario: '',
    loading: false,

    cargarListado: function(usuario) {
        diagnosticoModel.loading = true;
        m.request({
            method: "GET",
            url: "http://localhost:8000/api/v1/plantilladiagnostico?usuario=" + usuario,
            body: {},
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            if (result.status) {
                diagnosticoModel.listado = result.plantillas;
                diagnosticoModel.usuario = usuario;                
                diagnosticoModel.loading = false;  
            }
            else {                
                diagnosticoModel.loading = false;  
                diagnosticoModel.error = result.message;
            }
        })
        .catch(function(error) {            
            diagnosticoModel.loading = false;  
            diagnosticoModel.error = "Se produjo error cargando las plantillas: " + error.stack;
            alert(diagnosticoModel.error);
        })
    },

    guardar: (plantilla) => {
        m.request({
            method: 'POST',
            url: "http://localhost:8000/api/v1/plantilladiagnostico",
            body:  plantilla,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            diagnosticoModel.cargarListado(diagnosticoModel.usuario);
        })
        .catch(function(error) {
            diagnosticoModel.error = "Se produjo error guardando la plantilla: " + error.stack;
            alert(diagnosticoModel.error);
        }) 
    },

    actualizar: (plantilla) => {
        m.request({
            method: 'PUT',
            url: "http://localhost:8000/api/v1/plantilladiagnostico/" + parseInt(plantilla.id),
            body:  plantilla,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            diagnosticoModel.cargarListado(diagnosticoModel.usuario);
        })
        .catch(function(error) {
            diagnosticoModel.error = "Se produjo error guardando la plantilla: " + error.stack;
            alert(diagnosticoModel.error);
        }) 
    }, 

    eliminar: (plantilla) => {
        m.request({
            method: 'DELETE',
            url: "http://localhost:8000/api/v1/plantilladiagnostico/" + parseInt(plantilla.id),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function() {            
            diagnosticoModel.cargarListado(diagnosticoModel.usuario);
        })
        .catch(function(error) {
            diagnosticoModel.error = "Se produjo error eliminando la plantilla: " + error.stack;
            alert(diagnosticoModel.error);
        }) 
    },
}

export default diagnosticoModel;