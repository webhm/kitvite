let firmaModel = {
    listado: [],
    loading: false,

    cargarListado: () => {
        firmaModel.listado =[];
        firmaModel.loading = true;
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/medicos-patologia",
            body: {
                searchField: " ",
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json",
                "Authorization": localStorage.accessToken,
            },
        })
        .then(function(result) {
            if (result.status) {              
                firmaModel.listado = result.data;
                firmaModel.loading = false;
            } else {
                firmaModel.loading = false;
                firmaModel.error = result.message;
            }
        })
        .catch(function(error) {
            firmaModel.loading = false;
            firmaModel.error = error;
            alert(firmaModel.error);
        })
    },
}

export default firmaModel;