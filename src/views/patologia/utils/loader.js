const loader = {
    view: () => {
        return [
            m("div.container.mg-l-0.mg-r-0", {
                style: { "max-width": "100%" }
            }, [
                    m("div.row.animated.fadeInUp", [
                        m("div.col-12", [
                            m("div.table-loader.wd-100p", [
                                    m("div.placeholder-paragraph", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ]
                            ),
                        ])
                    ]),
                ]
            )
        ]
    }
}

export default loader;