define("GlobalSearchBar", ["jquery", "globals", "Architizer", "larch/core", "larch/LarchForm", "larch/Autocomplete"], function (e, t, n, r, i, s) {
    return function (n) {
        var s = this, o, u, a, f, l, c = {CLOSED: 0, OPENED: 1}, h = {INSIDE: 0, OUTSIDE: 1};
        o = e.extend({
            app: null,
            $e: null,
            selector: "",
            search_url: "/search/q/q:%s/"
        }, n), u = {
            name: "mod.GlobalSearchBar",
            $e: o.$e ? o.$e : e(o.selector),
            inner_click: !1,
            menu_position: h.INSIDE,
            menu_state: c.CLOSED
        }, a = {
            win: e(window),
            container: e("body > .container"),
            hero_block: u.$e.find(".hero-block"),
            search_holder: u.$e.find(".globalsearch-holder"),
            search_input: u.$e.find(".globalsearch-input").find("input"),
            search_input_field: u.$e.find(".globalsearch-holder").find('[data-name="globalsearch"]'),
            submit_btn: u.$e.find(".globalsearch-holder").find(".button.larch-form-submit"),
            menu: u.$e.find(".globalsearch-holder").find(".menu"),
            form: u.$e.find(".globalsearch-holder").find("form"),
            feed_page_1: e("#feed-page-1"),
            menu_wrapper: null
        },
            f = {
                init: function () {
                    o.app.events.on("navigationEvent:Pushstate", function () {
                        window.location.href.indexOf("/page:") < 0 && setTimeout(f.set_focus, 100)
                    }), a.submit_btn.on("click", function (e) {
                        f.prepare_search(), e.stopPropagation()
                    }), a.container.click(l.click_outside), a.search_holder.click(function (e) {
                        u.inner_click = !0
                    }), a.search_input.on("keyup", function (e) {
                        u.menu_state === c.OPENED && e.which == NI.co.keyboard.ESCAPE && f.close_search(), (e.which == NI.co.keyboard.DOWN || e.which == NI.co.keyboard.UP) && u.menu_state === c.CLOSED && (a.menu.empty() || a.search_input_field.trigger("Autocomplete:OpenMenu"))
                    }), a.search_input_field.on("Autocomplete:OpenMenu", function () {
                        var t = a.menu, n;
                        u.menu_position === h.INSIDE && (n = e('<div class="larch-input"></div>'), n.append(t), a.feed_page_1.append(n), a.menu_wrapper = n, u.menu_position = h.OUTSIDE), f.place_menu_under_input(), a.menu_wrapper.addClass(r.markup.OPEN), u.menu_state = c.OPENED
                    }), a.search_holder.find(".close").click(f.clean_search), a.search_input.on("keyup", function (e) {
                        e.keyCode == NI.co.keyboard.ENTER ? f.prepare_search(e) : a.search_input_field.data("autocomplete-menu-disabled", !1)
                    }), a.menu.on("click", ".item", function (e) {
                        f.prepare_search(e), e.stopPropagation()
                    }), a.win.resize(l.resize), setTimeout(f.set_focus, 1e3)
                }, destroy: function () {
                    a.container.off("click", l.click_outside), a.win.off("resize", l.resize)
                }, close_search: function () {
                    var e = a.menu, t = e.parent();
                    t.removeClass(r.markup.OPEN), u.menu_state = c.CLOSED
                }, clean_search: function (e, t) {
                    a.search_input.val(""), a.search_input.blur()
                }, prepare_search: function (e) {
                    var t, n, i, s = a.menu.find(".item." + r.markup.CURRENT);
                    s.length && !s.hasClass("search") && (t = s.data("url"), i = s.text()), n = f.process_search(t, a.search_input.val(), i), n && (a.search_input.blur(), a.search_input_field.trigger("Autocomplete:CloseMenu"), a.search_input_field.data("autocomplete-menu-disabled", !0))
                }, process_search: function (t, n, r) {
                    var i, s, u;
                    return u = !1, t ? (e(window).trigger("pushstate", {pathname: t}), s = r, u = !0) : n && (i = e.trim(n), e(window).trigger("pushstate", {pathname: o.search_url.replace("%s", i)}), s = n, u = !0), o.app.events.trigger("analytics:track", {
                        name: "Search",
                        data: {label: s, query_string: s}
                    }), u
                }, place_menu_under_input: function () {
                    var e = a.search_input_field, t = e.offset();
                    a.menu_wrapper.offset({
                        top: t.top + e.height() + 1,
                        left: t.left - 2
                    }), a.menu.width(e.width() + 4)
                }, set_focus: function () {
                    f.clean_search(), a.search_holder.addClass("input-visible"), a.search_input.focus()
                }
            }, l = {
            click_outside: function (t) {
                var n = e(t.target);
                u.menu_state === c.OPENED && !u.inner_click && f.close_search(), u.inner_click = !1, n.closest(".larch-input").length && n.closest(".hero-block").length && (t.preventDefault(), t.stopPropagation())
            },
            resize: function () {
                u.menu_state === c.OPENED && (a.menu_wrapper.removeClass(r.markup.OPEN), t.fn.debounce(function () {
                    f.place_menu_under_input
                    (), a.menu_wrapper.addClass(r.markup.OPEN)
                }, 500)())
            }
        },
            u.form = new i({app: o.app, $e: a.form}), this.destroy = f.destroy, f.init(), console.log(u)
    }
})