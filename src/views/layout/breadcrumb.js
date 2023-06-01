import m from 'mithril';
const BreadCrumb = {
    view: function (vnode) {
        return [
            m("div.container.mg-l-0.mg-r-0", {
                style: { "max-width": "100%" }
            }, [
                m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                    vnode.children.map(function (link) {
                        if (link.path == "") {
                            return m("li.breadcrumb-item.active[aria-current='page']", link.label)
                        } else {
                            return m("li.breadcrumb-item", m(m.route.Link, { href: link.path }, [link.label]))
                        }
                    })
                ]),
            ])
        ];
    },
};

export default BreadCrumb;