const RedirMV = {
    oncreate: (_data) => {

    },
    view: (_data) => {
        window.location.href = 'http://172.16.253.18/report-executor/mvreport?name=USR_VALIDACION_EMERGENCIA&cdMultiEmpresa=1&V_ATENCION=' + _data.attrs.idAtencion;

    }
};

export default RedirMV;