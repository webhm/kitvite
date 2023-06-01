const noInfo = {
    view: () => {
        return [
            m("div.container.mg-l-0.mg-r-0", {
                style: { "max-width": "100%" }
            }, [
                m("div.row.animated.fadeInUp", [
                    m("div.col-12", [
                        m(".alert.alert-danger[role='alert']",
                            "No existe información disponible."
                        )
                    ])
                ]),]
            )
        ]
    }
}

export default noInfo;