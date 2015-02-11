define("Header", ["jquery", "globals", "hammer", "Architizer", "NIseed", "larch/core", "larch/LarchForm", "larch/Autocomplete", "rhythm", "ads", "CtaBar"], function (e, t, n, r, i, s, o, u, a, f, l) {
    return function (n) {
        var r = this, i, u, a, c, h, p;
        i = e.extend({
            app: null,
            $e: null,
            selector: "",
            search_url: "/search/q/q:%s/",
            dfp: {firms: "FirmPageMasthead", projects: "ProjectPageMasthead", blog: "SinglePostMasthead"},
            slide_menu_width: "200px",
            offset_header: !1,
            offset_top: 18,
            offset_parallax_ratio: 12
        }, n),
            u = {
                name: "mod.Header",
                $e: i.$e ? i.$e : e(i.selector),
                neartop: null,
                neartop_limit: i.offset_top * i.offset_parallax_ratio + 1,
                slide_menu_visible: !1,
                searchbar_visible: !1,
                inner_click: !1,
                is_touch_device: t.features.can_touch,
                prev_dfp: "",
                cta_bar: null
            },
            a = {
                win: e(window),
                container: e(".js-container"),
                header: u.$e,
                nav_container: u.$e.find("nav"),
                main_nav: u.$e.find("#mainnav"),
                user_nav: u.$e.find("#usernav"),
                logo: u.$e.find("#logo"),
                upload_btn: u.$e.find(".upload"),
                search_holder: u.$e.find("#globalsearch-holder"),
                search_input: u.$e.find(".globalsearch-input input"),
                search_input_field: u.$e.find("#globalsearch-holder").find('[data-name="globalsearch"]'),
                form: u.$e.find("#globalsearch-holder form"),
                slide_menu: e(".js-slidenav"),
                to_slide: e("#Header, #Pages"),
                position_styles: e("<style> </style>"),
                dfp_bar: u.$e.find(".header-dfp-bar"),
                cta_bar: u.$e.find(".cta-bar")
            },
            p = {dfp: {}},
            c = {
                init: function () {
                    u.$e.on("click", ".js-join-now", h.click_join_now), t.fn.once_visible(a.search_holder, function () {
                        c.resize_searchbar()
                    }), a.nav_container.click(function (e) {
                        e.target == this && !a.search_holder.hasClass("open") && (c.open_search(), e.stopPropagation())
                    }), a.search_holder.click(function () {
                        e(this).hasClass("open") || c.open_search()
                    }), e("body > .container").click(function () {
                        u.inner_click || c.close_search(), u.inner_click = !1
                    }), i.app.events.on("navigationEvent:Pushstate", function () {
                        setTimeout(function () {
                            u.searchbar_visible || c.clean_search()
                        }, 100)
                    }), a.search_holder.click(function () {
                        u.inner_click = !0
                    }), a.search_holder.find(".close").click(function () {
                        c.close_search(), c.clean_search()
                    }), a.search_input.on("keyup", function (e) {
                        e.keyCode == NI.co.keyboard.ENTER ? c.prepare_search(e) : a.search_input_field.data("autocomplete-menu-disabled", !1)
                    }), a.search_holder.on("click", ".item", function (e) {
                        c.prepare_search(e)
                    }), a.win.resize(h.window_resize), i.offset_header && (a.win.scroll(function (e) {
                        h.scroll(e)
                    }),
                        c.update_header_position(!0)),
                        a.slide_menu.width(i.slide_menu_width),
                        a.header.find(".js-phone").on("click", function (e) {
                                e.preventDefault(),
                                    e.stopPropagation(),
                                    u.slide_menu_visible ? c.close_slidemenu() : c.open_slidemenu()

                            }
                        ), a.slide_menu.find("a").on("click", function (e) {
                        c.close_slidemenu()
                    }), a.nav_container.css("margin-left", a.logo.outerWidth()), a.win.on("rhythm:StylesCreated", function (e) {
                        a.nav_container.css("margin-left", a.logo.outerWidth())
                    }), a.header.find(".nav-news").click(function (n) {
                        n.preventDefault();
                        if (e("body").hasClass("section-home"))t.elements.$scroll_target.stop(!0, !0).animate({scrollTop: e("#feed-browse-page .hero-block").eq(0).height() - a.header.height()}, 400); else {
                            var r = e(this).attr("href");
                            e(window).trigger("pushstate", {pathname: r})
                        }
                    }), a.cta_bar.length && (u.cta_bar = new l({
                        app: i.app,
                        $e: a.cta_bar,
                        namespace: l.GLOBAL_CTA
                    }));
                    var n = e.map(i.dfp, function (e) {
                        return e
                    });
                    e(window).on("google-dfp:slotRenderEnded", function (t, r) {
                        var i, s;
                        i = r && r.slot || !1, i && (s = c.get_dfp_slot_key(i)), s && e.inArray(s, n) !== -1 && (r.isEmpty ? u.dfp_scroll_to_top = !1 : u.dfp_scroll_to_top = !0), c.repos_els(), setTimeout(c.repos_els, 200), setTimeout(c.repos_els, 800)
                    }), e("body").append(a.position_styles), i.app.events.on(l.event_types.OPEN, c.repos_els),
                        i.app.events.on(l.event_types.CLOSE, c.repos_els), i.app.events.on("globalRouter:route", c.try_define_header_dfp), i.app.events.on("ActionBar:scroll", c.ab_scroll), window.page.header_initialized = !0
                },
                get_dfp_slot_key: function (t) {
                    var n;
                    n = e.map(t, function (t) {
                        var n, r;
                        n = e.type(t);
                        if (n === "string") {
                            r = t.split("/");
                            if (r.length === 3 && !r[0])return r[2]
                        }
                    });
                    if (n.length === 1)return n[0]
                },
                ab_scroll: function (t, n) {
                    var r = 90, i = 0;
                    n.change_mode && (u.dfp_scroll_mode = n.change_mode), !u.dfp_scroll_top && e.type(u.dfp_scroll_top) !== "number" && (u.dfp_scroll_top = n.scroll_top);
                    if (u.dfp_scroll_mode && (u.dfp_scroll_top || u.dfp_scroll_top === 0)) {
                        var s = n.scroll_top - u.dfp_scroll_top;
                        if (s > 0 && u.dfp_scroll_mode === "fixed") {
                            var o = a.dfp_bar.find(".adholder").height() || 0, f = o - Math.abs(s), l = f >= i ? f : i;
                            l === i && o === i && a.dfp_bar.find(".adholder").css("border-bottom-width", "0px"), o !== l && (u.dfp_scroll_top = n.scroll_top, a.dfp_bar.find(".adholder").height(l), c.fix_pos())
                        } else if (s < 0 && u.dfp_scroll_mode === "default" && u.dfp_scroll_to_top) {
                            var o = a.dfp_bar.find(".adholder").height() || 0, f = o + Math.abs(s), l = f <= r ? f : r;
                            l > i && o > i && a.dfp_bar.find(".adholder").css("border-bottom-width", "1px"), o !== l && (u.dfp_scroll_top = n.scroll_top, a.dfp_bar.find(".adholder").height(l), c.fix_pos())
                        }
                    }
                    n.callback && n.callback(), u.dfp_scroll_top = n.scroll_top
                },
                fix_pos: function () {
                },
                set_header_dfp: function (e) {
                    var t = e && e.ad;
                    if (!t) {
                        console.warn("No AD unit name");
                        return
                    }
                    a.dfp_bar.empty().html(p.dfp[t]), a.dfp_bar.find(".adholder").show(), f.register_bsa({$e: u.$e}), u.prev_dfp = t, setTimeout(c.repos_els, 200), setTimeout(c.repos_els, 800)
                },
                load_header_dfp: function (t) {
                    var n = t && t.ad;
                    if (!n) {
                        console.warn("No AD unit name");
                        return
                    }
                    p.dfp[n] && (t && !t.force_reload || !t) ? c.set_header_dfp({ad: n}) : e.ajax({
                        type: "GET",
                        url: "/core/template/dfp/" + n + "/",
                        success: function (e, t, r) {
                            p.dfp[n] = e, c.set_header_dfp({ad: n})
                        }
                    })
                },
                get_dfp_group: function () {
                    var e = i.app.runtime.global_router.getPath(), t = e && e.split("/") || [], n = t[1], r = t[3] == "media";
                    return slug = t[2], n in i.dfp && slug !== "q" && slug !== "create" && !r ? n : ""
                }, try_define_header_dfp: t.fn.throttle(function () {
                    var e = c.get_dfp_group();
                    e ? i.dfp[e] != u.prev_dfp && c.load_header_dfp({ad: i.dfp[e]}) : (a.dfp_bar.find(".adholder").hide(), c.repos_els(), u.prev_dfp = "")
                }, 50), repos_els: function () {
                    var e = a.header.height();
                    e && e != u.header_height && (u.header_height = e, a.position_styles.html("body, .hero-block.behind-header .block-control { top: " + e + "px; }"))
                }, get_searchbar_width: function () {
                    var e = a.nav_container.width() - a.user_nav.width();
                    return u.slide_menu_visible && (e -= parseInt(i.slide_menu_width)), e
                }, resize_searchbar: function () {
                    var e, n, r, i, s;
                    u.searchbar_visible ? (e = a.logo.outerWidth(), n = c.get_searchbar_width(), a
                    .
                    search_holder.css({
                        position: "absolute",
                        left: e,
                        width: n
                    })
                    ) :
                    (r = a.search_holder.prevAll(":visible").first(), s = r.offset() && r.offset().left || 0, i = s + r.outerWidth(), n = t.elements.$window.width() - i - a.user_nav.outerWidth(), a
                    .
                    search_holder.css({
                        position: "absolute",
                        left: i,
                        width: n
                    })
                    )
                }, open_search: function (t, n) {
                    var r = a.logo.outerWidth(), i = c.get_searchbar_width(), s = a.search_holder.offset() && a.search_holder.offset().left || 0;
                    a.search_holder.addClass("open has-bg").css({position: "absolute", left: s}).animate({
                        left: r,
                        width: i
                    }, 0, "swing", function () {
                        e(this).addClass("input-visible"), a.search_input.focus(), u.searchbar_visible = !0
                    })
                }, close_search: function (n, r) {
                    var i, s, o, f;
                    s = a.search_holder.prevAll(":visible").first(), f = s.offset() && s.offset().left || 0, o = f + s.outerWidth(), i = t.elements.$window.width() - o - a.user_nav.outerWidth(), a.search_holder.removeClass("input-visible has-bg").animate({
                        position: "absolute",
                        left: o,
                        width: i
                    }, 150, "swing", function () {
                        e(this).removeClass("open"), u.searchbar_visible = !1
                    })
                }, clean_search: function (e, t) {
                    a.search_input.val(""), a.search_input.blur()
                }, prepare_search: function (e) {
                    var t = a.search_holder.find(".item." + s.markup.CURRENT), n, r, i;
                    t && !t.hasClass("search") && (n = t.data("url"), i = t.text()), r = c.process_search(n, a.search_input.val(), i), r && (a.search_input.blur(), a.search_input_field.trigger("Autocomplete:CloseMenu"), a.search_input_field.data("autocomplete-menu-disabled", !0))
                }, process_search: function (t, n, r) {
                    var s, o, u;
                    return u = !1, t ? (e(window).trigger("pushstate", {pathname: t}), o = r, u = !0) : n && (s = e.trim(n), e(window).trigger("pushstate", {pathname: i.search_url.replace("%s", s)}), o = n, u = !0), i.app.events.trigger("analytics:track", {
                        name: "Search",
                        data: {label: o, query_string: o}
                    }), u
                }, open_slidemenu: function () {
                    a.to_slide.css("-webkit-transform", "translateX(" + i.slide_menu_width + ")"),
                        a.slide_menu.css({"overflow-y": "auto", "-webkit-overflow-scrolling": "touch"}),
                        u.slide_menu_visible = !0,
                        c.resize_searchbar()
                },
                close_slidemenu: function () {
                    a.to_slide.css("-webkit-transform", "none"),
                        a.slide_menu.css({
                            "overflow-y": "",
                            "-webkit-overflow-scrolling": ""
                        }),
                        u.slide_menu_visible = !1,
                        c.resize_searchbar()
                },
                update_header_position: function (e) {
                    var t = a.win.scrollTop();
                    t < u.neartop_limit ? (u.neartop = !0, e ? a.header.animate({top: i.offset_top - t / i.offset_parallax_ratio}, 400) : a.header.stop(!0, !0).css("top", i.offset_top - t / i.offset_parallax_ratio)) : u.neartop !== !1 && (u.neartop = !1, a.header.stop(!0, !0).css("top", "-1px"))
                }
            },
            h = {
                pushstate: function (e, t) {
                }, click_join_now: function (t, n) {
                    var r = e(this);
                    t.stopPropagation(), t.preventDefault();
                    var s = i.app.runtime.global_router.getPath(), o, u = window.location.href.match(/\?(brand=[a-zA-Z0-9-_]+)/);
                    if (s.match("join/marketplace")) {
                        o = r.data("probably-next"), u && (o += o.match(/\?/) ? "&" : "?", o += u.pop()), r.data("next", o);
                        var n = r.data();
                        n.pathname = r.attr("href"), e(window).trigger("simulate-pushstate", n)
                    } else e(window).trigger("pushstate", {pathname: r.attr("href")})
                }, window_resize: function (e, n) {
                    setTimeout(c.resize_searchbar, 100), u.slide_menu_visible === !0 && a.win.width() > t.properties.phone_max_width && c.close_slidemenu()
                }, scroll: function (e) {
                    c.update_header_position(!1)
                }
            }, u.form = new o({app: i.app, $e: a.form}), c.init(), console.log(u)
    }
}),