import Auth from '../../models/auth';
import App from '../app';

const FormLogin = {

    view: () => {

        return [

            m("div.content.content-fixed.content-auth",
                m("div.container",
                    m("div.media.align-items-stretch.justify-content-center.ht-100p.pos-relative", [
                        m("div.mg-t-55.pd-50.media-body.align-items-center.d-none.d-lg-flex",
                            [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin mg-r-2 " },
                                    m("i", { "class": "fas fa-first-aid tx-30 tx-white" })
                                ),
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin mg-r-2" },
                                    m("i", { "class": "fas fa-pills tx-30 tx-white" })
                                ),
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin mg-r-2" },
                                    m("i", { "class": "fas fa-file-prescription tx-30 tx-white" })
                                ),
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin mg-r-2" },
                                    m("i", { "class": "fas fa-microscope  tx-30 tx-white" })
                                ),
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin mg-r-2" },
                                    m("i", { "class": "fas fa-procedures   tx-30 tx-white" })
                                ),
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin mg-r-2" },
                                    m("i", { "class": "fas fa-h-square tx-30 tx-white" })
                                ),
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin mg-r-2" },
                                    m("i", { "class": "fas fa-user-md tx-30 tx-white" })
                                ),

                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin mg-r-2" },
                                    m("i", { "class": "fas fa-heartbeat      tx-30 tx-white" })
                                ),
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin mg-r-2" },
                                    m("i", { "class": "fas fa-notes-medical      tx-30 tx-white" })
                                ),
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin mg-r-2" },
                                    m("i", { "class": "fas fa-hospital tx-30 tx-white" })
                                ),


                            ],
                        ),

                        m("div.sign-wrapper.mg-lg-l-50.mg-xl-l-60",
                            m("div.wd-100p", [

                                m("h3.tx-color-01.mg-b-5.mg-t-20",
                                    "Entrar"
                                ),
                                m("p.tx-color-03.tx-16.mg-b-40",
                                    "¡Bienvenido! Por favor, inicie sesión para continuar."
                                ),
                                m(".tx-semibold.alert.alert-solid.alert-" + Auth.statusError + "." + Auth.statusHide + "[role='alert']",
                                    Auth.messageError
                                ),
                                m("div.form-group", [
                                    m("label",
                                        "Usuario:"
                                    ),
                                    m("input.form-control[type='text'][placeholder='mpaez']", {
                                        oninput: function (e) { Auth.setUsername(e.target.value) },
                                        value: Auth.username,
                                    })
                                ]),
                                m("div.form-group", [
                                    m("div.d-flex.justify-content-between.mg-b-5", [
                                        m("label.mg-b-0-f",
                                            "Contraseña:"
                                        ),

                                    ]),
                                    m("input.form-control[type='password'][placeholder='Contraseña']", {
                                        oninput: function (e) { Auth.setPassword(e.target.value) },
                                        value: Auth.password,
                                    })
                                ]),
                                m("button.btn.btn-brand-02.btn-block " + Auth.buttonDisabled, {
                                    disabled: !Auth.canSubmit(),
                                    onclick: Auth.login
                                },
                                    "Entrar"
                                ),
                                m("div.text-center.tx-gray-500.mg-t-20",
                                    "MetroPlus Beta v1.0.0"
                                ),
                                m("div.text-center.tx-gray-500",
                                    "Created by Hospital Metropolitano"
                                ),
                                m("div.ht-80",),


                            ])
                        )
                    ])
                )
            ),

        ];
    },

};



export default FormLogin;