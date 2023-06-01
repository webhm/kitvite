import App from "./app";

const _404 = {

    view: () => {
        return [
            m("div.content.content-fixed.content-auth-alt",
                m("div.container.ht-100p.tx-center",
                    m("div.ht-100p.d-flex.flex-column.align-items-center.justify-content-center",
                        [
                            m("div.wd-70p.wd-sm-250.wd-lg-300.mg-b-15",
                                m("img.img-fluid[src='assets/dashforge/img/img19.png'][alt='']")
                            ),
                            m("h1.tx-color-01.tx-24.tx-sm-32.tx-lg-36.mg-xl-b-5",
                                "404 Página no encontrada"
                            ),
                            m("h5.tx-16.tx-sm-18.tx-lg-20.tx-normal.mg-b-20",
                                "Oopps. La página que estabas buscando no existe."
                            ),
                            m("p.tx-color-03.mg-b-30",
                                "Es posible que haya escrito mal la dirección o que la página se haya movido. Regresa al inicio."
                            ),
                            m("div.d-flex.mg-b-40",
                                [
                                    m("a.button.btn.btn-brand-02.bd-0.mg-l-5.pd-sm-x-25[href='/']",
                                        "Ir al Inicio"
                                    )
                                ]
                            ),
                            m("span.tx-12.tx-color-03",
                                [
                                    App.title,
                                    m("a[href='https://www.hospitalmetropolitano.org']",
                                        " Hospital Metropolitano"
                                    )
                                ]
                            )
                        ]
                    )
                )
            )
        ];

    },
};

export default _404;