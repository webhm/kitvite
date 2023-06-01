const Loader = {
    view: () => {
        return [
            m("div.text-center.mg-t-300",
                m(".spinner-grow.text-dark[role='status']",
                    m("span.sr-only",
                        "Cargando..."
                    )
                )
            )
        ];
    },
};

export default Loader;