import SidebarRight from './sidebarRight';
import Encrypt from '../../models/encrypt';



const MenuHeader = {
    view: () => {

        let _data = Encrypt.getDataUser();

        if (_data.length !== 0) {
            return [
                m("li.nav-item",
                    m(m.route.Link, { href: "/inicio", class: "nav-link" }, [
                        m("i[data-feather='layout']"),
                        " Inicio "
                    ])
                ),
                Object.keys(_data.modulesAccess).map(function(_v, _i, _contentData) {

                    if (_data.modulesAccess[_v].length !== 0) {



                        if (_v == 'terapia-respiratoria') {

                            return [
                                m("li.nav-item." + ((HeaderCalendar.page === _v) ? "active" : ""),

                                    m(m.route.Link, { href: "/terapia-respiratoria/pedidos", class: "nav-link" }, [
                                        m("i[data-feather='layout']"),
                                        "Terapia Respiratoria"
                                    ]),


                                ),
                            ]

                        } else if (_v == 'bco-sangre') {

                            return [
                                m("li.nav-item." + ((HeaderCalendar.page === _v) ? "active" : ""),

                                    m(m.route.Link, { href: "/bco-sangre/pedidos", class: "nav-link" }, [
                                        m("i[data-feather='layout']"),
                                        "Bco. de Sangre"
                                    ]),


                                ),
                            ]

                        } else if (_v == 'neurofisiologia') {

                            return [
                                m("li.nav-item." + ((HeaderCalendar.page === _v) ? "active" : ""),

                                    m(m.route.Link, { href: "/neurofisiologia/pedidos", class: "nav-link" }, [
                                        m("i[data-feather='layout']"),
                                        "Neurofisiología"
                                    ]),


                                ),
                            ]

                        } else {
                            return [
                                m("li.nav-item." + ((HeaderCalendar.page === _v) ? "active" : ""),

                                    m(m.route.Link, { href: "/" + _v, class: "nav-link" }, [
                                        m("i[data-feather='layout']"),
                                        _v.charAt(0).toUpperCase() + _v.slice(1)
                                    ]),


                                ),
                            ]
                        }






                    }



                })
            ]
        }



    },

};


const HeaderCalendar = {
    page: "",

    setPage: (page) => {
        HeaderCalendar.page = page;
    },
    oncreate: () => {
        loadCustomPage();

    },
    onupdate: () => {
        loadCustomPage();
    },
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [
                m("a.burger-menu.d-none[href=''][id='sidebarMenuOpen']",
                    m("i[data-feather='arrow-left']")
                ),
                m("a.burger-menu.d-lg-none[href=''][id='calendarSidebarShow']",
                    m("i[data-feather='arrow-left']")
                ),
                m("div.navbar-brand",
                    m(m.route.Link, { href: "/", class: "df-logo" }, [
                        "Metro",
                        m("span",
                            "Plus+"
                        ),
                    ]),
                ),
                m(".navbar-menu-wrapper[id='navbarMenu']", [
                    m("div.navbar-menu-header", [
                        m(m.route.Link, { href: "/", class: "df-logo" }, [
                            "Metro",
                            m("span",
                                "Plus+"
                            ),
                        ]),
                        m("a[id='mainMenuClose'][href='']",
                            m("i[data-feather='x']")
                        )
                    ]),
                    m("ul.nav.navbar-menu", [
                        m("li.nav-label.pd-l-20.pd-lg-l-25.d-lg-none",
                            "Menu"
                        ),
                        m('div.d-lg-none', [
                            m(MenuHeader)
                        ]),

                    ])
                ]),
                m(SidebarRight)
            ]),

        ];
    },
};


function loadCustomPage() {

    feather.replace();

    ////////// NAVBAR //////////

    // Initialize PerfectScrollbar of navbar menu for mobile only
    if (window.matchMedia('(max-width: 991px)').matches) {
        const psNavbar = new PerfectScrollbar('#navbarMenu', {
            suppressScrollX: true
        });
    }

    // Showing sub-menu of active menu on navbar when mobile
    function showNavbarActiveSub() {
        if (window.matchMedia('(max-width: 991px)').matches) {
            $('#navbarMenu .active').addClass('show');
        } else {
            $('#navbarMenu .active').removeClass('show');
        }
    }

    showNavbarActiveSub()
    $(window).resize(function() {
        showNavbarActiveSub()
    })

    // Initialize backdrop for overlay purpose
    $('body').append('<div class="backdrop"></div>');


    // Showing sub menu of navbar menu while hiding other siblings
    $('.navbar-menu .with-sub .nav-link').on('click', function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('show');
        $(this).parent().siblings().removeClass('show');

        if (window.matchMedia('(max-width: 991px)').matches) {
            psNavbar.update();
        }
    })

    // Closing dropdown menu of navbar menu
    $(document).on('click touchstart', function(e) {
        e.stopPropagation();

        // closing nav sub menu of header when clicking outside of it
        if (window.matchMedia('(min-width: 992px)').matches) {
            var navTarg = $(e.target).closest('.navbar-menu .nav-item').length;
            if (!navTarg) {
                $('.navbar-header .show').removeClass('show');
            }
        }
    })

    $('#mainMenuClose').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('navbar-nav-show');
    });

    $('#sidebarMenuOpen').on('click', function(e) {
        e.preventDefault();
        $('body').addClass('sidebar-show');
    })

    // Navbar Search
    $('#navbarSearch').on('click', function(e) {
        e.preventDefault();
        $('.navbar-search').addClass('visible');
        $('.backdrop').addClass('show');
    })

    $('#navbarSearchClose').on('click', function(e) {
        e.preventDefault();
        $('.navbar-search').removeClass('visible');
        $('.backdrop').removeClass('show');
    })



    ////////// SIDEBAR //////////

    // Initialize PerfectScrollbar for sidebar menu
    if ($('#sidebarMenu').length) {
        const psSidebar = new PerfectScrollbar('#sidebarMenu', {
            suppressScrollX: true
        });


        // Showing sub menu in sidebar
        $('.sidebar-nav .with-sub').on('click', function(e) {
            e.preventDefault();
            $(this).parent().toggleClass('show');

            psSidebar.update();
        })
    }


    $('#mainMenuOpen').on('click touchstart', function(e) {
        e.preventDefault();
        $('body').addClass('navbar-nav-show');
    })

    $('#sidebarMenuClose').on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('sidebar-show');
    })

    // hide sidebar when clicking outside of it
    $(document).on('click touchstart', function(e) {
        e.stopPropagation();

        // closing of sidebar menu when clicking outside of it
        if (!$(e.target).closest('.burger-menu').length) {
            var sb = $(e.target).closest('.sidebar').length;
            var nb = $(e.target).closest('.navbar-menu-wrapper').length;
            if (!sb && !nb) {
                if ($('body').hasClass('navbar-nav-show')) {
                    $('body').removeClass('navbar-nav-show');
                } else {
                    $('body').removeClass('sidebar-show');
                }
            }
        }
    });

};



export default HeaderCalendar;