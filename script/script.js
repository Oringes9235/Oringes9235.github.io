"use strict";
(() => {
    var Wi = Object.create;
    var gr = Object.defineProperty;
    var Vi = Object.getOwnPropertyDescriptor;
    var Di = Object.getOwnPropertyNames
        , Vt = Object.getOwnPropertySymbols
        , zi = Object.getPrototypeOf
        , yr = Object.prototype.hasOwnProperty
        , ao = Object.prototype.propertyIsEnumerable;
    var io = (e, t, r) => t in e ? gr(e, t, {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: r
    }) : e[t] = r
        , $ = (e, t) => {
            for (var r in t || (t = {}))
                yr.call(t, r) && io(e, r, t[r]);
            if (Vt)
                for (var r of Vt(t))
                    ao.call(t, r) && io(e, r, t[r]);
            return e
        }
        ;
    var so = (e, t) => {
        var r = {};
        for (var o in e)
            yr.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
        if (e != null && Vt)
            for (var o of Vt(e))
                t.indexOf(o) < 0 && ao.call(e, o) && (r[o] = e[o]);
        return r
    }
        ;
    var xr = (e, t) => () => (t || e((t = {
        exports: {}
    }).exports, t),
        t.exports);
    var Ni = (e, t, r, o) => {
        if (t && typeof t == "object" || typeof t == "function")
            for (let n of Di(t))
                !yr.call(e, n) && n !== r && gr(e, n, {
                    get: () => t[n],
                    enumerable: !(o = Vi(t, n)) || o.enumerable
                });
        return e
    }
        ;
    var Lt = (e, t, r) => (r = e != null ? Wi(zi(e)) : {},
        Ni(t || !e || !e.__esModule ? gr(r, "default", {
            value: e,
            enumerable: !0
        }) : r, e));
    var co = (e, t, r) => new Promise((o, n) => {
        var i = p => {
            try {
                s(r.next(p))
            } catch (c) {
                n(c)
            }
        }
            , a = p => {
                try {
                    s(r.throw(p))
                } catch (c) {
                    n(c)
                }
            }
            , s = p => p.done ? o(p.value) : Promise.resolve(p.value).then(i, a);
        s((r = r.apply(e, t)).next())
    }
    );
    var lo = xr((Er, po) => {
        (function (e, t) {
            typeof Er == "object" && typeof po != "undefined" ? t() : typeof define == "function" && define.amd ? define(t) : t()
        }
        )(Er, function () {
            "use strict";
            function e(r) {
                var o = !0
                    , n = !1
                    , i = null
                    , a = {
                        text: !0,
                        search: !0,
                        url: !0,
                        tel: !0,
                        email: !0,
                        password: !0,
                        number: !0,
                        date: !0,
                        month: !0,
                        week: !0,
                        time: !0,
                        datetime: !0,
                        "datetime-local": !0
                    };
                function s(k) {
                    return !!(k && k !== document && k.nodeName !== "HTML" && k.nodeName !== "BODY" && "classList" in k && "contains" in k.classList)
                }
                function p(k) {
                    var ft = k.type
                        , qe = k.tagName;
                    return !!(qe === "INPUT" && a[ft] && !k.readOnly || qe === "TEXTAREA" && !k.readOnly || k.isContentEditable)
                }
                function c(k) {
                    k.classList.contains("focus-visible") || (k.classList.add("focus-visible"),
                        k.setAttribute("data-focus-visible-added", ""))
                }
                function l(k) {
                    k.hasAttribute("data-focus-visible-added") && (k.classList.remove("focus-visible"),
                        k.removeAttribute("data-focus-visible-added"))
                }
                function f(k) {
                    k.metaKey || k.altKey || k.ctrlKey || (s(r.activeElement) && c(r.activeElement),
                        o = !0)
                }
                function u(k) {
                    o = !1
                }
                function d(k) {
                    s(k.target) && (o || p(k.target)) && c(k.target)
                }
                function y(k) {
                    s(k.target) && (k.target.classList.contains("focus-visible") || k.target.hasAttribute("data-focus-visible-added")) && (n = !0,
                        window.clearTimeout(i),
                        i = window.setTimeout(function () {
                            n = !1
                        }, 100),
                        l(k.target))
                }
                function L(k) {
                    document.visibilityState === "hidden" && (n && (o = !0),
                        X())
                }
                function X() {
                    document.addEventListener("mousemove", J),
                        document.addEventListener("mousedown", J),
                        document.addEventListener("mouseup", J),
                        document.addEventListener("pointermove", J),
                        document.addEventListener("pointerdown", J),
                        document.addEventListener("pointerup", J),
                        document.addEventListener("touchmove", J),
                        document.addEventListener("touchstart", J),
                        document.addEventListener("touchend", J)
                }
                function ee() {
                    document.removeEventListener("mousemove", J),
                        document.removeEventListener("mousedown", J),
                        document.removeEventListener("mouseup", J),
                        document.removeEventListener("pointermove", J),
                        document.removeEventListener("pointerdown", J),
                        document.removeEventListener("pointerup", J),
                        document.removeEventListener("touchmove", J),
                        document.removeEventListener("touchstart", J),
                        document.removeEventListener("touchend", J)
                }
                function J(k) {
                    k.target.nodeName && k.target.nodeName.toLowerCase() === "html" || (o = !1,
                        ee())
                }
                document.addEventListener("keydown", f, !0),
                    document.addEventListener("mousedown", u, !0),
                    document.addEventListener("pointerdown", u, !0),
                    document.addEventListener("touchstart", u, !0),
                    document.addEventListener("visibilitychange", L, !0),
                    X(),
                    r.addEventListener("focus", d, !0),
                    r.addEventListener("blur", y, !0),
                    r.nodeType === Node.DOCUMENT_FRAGMENT_NODE && r.host ? r.host.setAttribute("data-js-focus-visible", "") : r.nodeType === Node.DOCUMENT_NODE && (document.documentElement.classList.add("js-focus-visible"),
                        document.documentElement.setAttribute("data-js-focus-visible", ""))
            }
            if (typeof window != "undefined" && typeof document != "undefined") {
                window.applyFocusVisiblePolyfill = e;
                var t;
                try {
                    t = new CustomEvent("focus-visible-polyfill-ready")
                } catch (r) {
                    t = document.createEvent("CustomEvent"),
                        t.initCustomEvent("focus-visible-polyfill-ready", !1, !1, {})
                }
                window.dispatchEvent(t)
            }
            typeof document != "undefined" && e(document)
        })
    }
    );
    var qr = xr((dy, On) => {
        "use strict";
        /*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */
        var $a = /["'&<>]/;
        On.exports = Pa;
        function Pa(e) {
            var t = "" + e
                , r = $a.exec(t);
            if (!r)
                return t;
            var o, n = "", i = 0, a = 0;
            for (i = r.index; i < t.length; i++) {
                switch (t.charCodeAt(i)) {
                    case 34:
                        o = "&quot;";
                        break;
                    case 38:
                        o = "&amp;";
                        break;
                    case 39:
                        o = "&#39;";
                        break;
                    case 60:
                        o = "&lt;";
                        break;
                    case 62:
                        o = "&gt;";
                        break;
                    default:
                        continue
                }
                a !== i && (n += t.substring(a, i)),
                    a = i + 1,
                    n += o
            }
            return a !== i ? n + t.substring(a, i) : n
        }
    }
    );
    var Br = xr((Rt, Yr) => {
        /*!
 * clipboard.js v2.0.11
 * https://clipboardjs.com/
 *
 * Licensed MIT © Zeno Rocha
 */
        (function (t, r) {
            typeof Rt == "object" && typeof Yr == "object" ? Yr.exports = r() : typeof define == "function" && define.amd ? define([], r) : typeof Rt == "object" ? Rt.ClipboardJS = r() : t.ClipboardJS = r()
        }
        )(Rt, function () {
            return function () {
                var e = {
                    686: function (o, n, i) {
                        "use strict";
                        i.d(n, {
                            default: function () {
                                return Ui
                            }
                        });
                        var a = i(279)
                            , s = i.n(a)
                            , p = i(370)
                            , c = i.n(p)
                            , l = i(817)
                            , f = i.n(l);
                        function u(D) {
                            try {
                                return document.execCommand(D)
                            } catch (A) {
                                return !1
                            }
                        }
                        var d = function (A) {
                            var M = f()(A);
                            return u("cut"),
                                M
                        }
                            , y = d;
                        function L(D) {
                            var A = document.documentElement.getAttribute("dir") === "rtl"
                                , M = document.createElement("textarea");
                            M.style.fontSize = "12pt",
                                M.style.border = "0",
                                M.style.padding = "0",
                                M.style.margin = "0",
                                M.style.position = "absolute",
                                M.style[A ? "right" : "left"] = "-9999px";
                            var F = window.pageYOffset || document.documentElement.scrollTop;
                            return M.style.top = "".concat(F, "px"),
                                M.setAttribute("readonly", ""),
                                M.value = D,
                                M
                        }
                        var X = function (A, M) {
                            var F = L(A);
                            M.container.appendChild(F);
                            var V = f()(F);
                            return u("copy"),
                                F.remove(),
                                V
                        }
                            , ee = function (A) {
                                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                                    container: document.body
                                }
                                    , F = "";
                                return typeof A == "string" ? F = X(A, M) : A instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(A == null ? void 0 : A.type) ? F = X(A.value, M) : (F = f()(A),
                                    u("copy")),
                                    F
                            }
                            , J = ee;
                        function k(D) {
                            "@babel/helpers - typeof";
                            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? k = function (M) {
                                return typeof M
                            }
                                : k = function (M) {
                                    return M && typeof Symbol == "function" && M.constructor === Symbol && M !== Symbol.prototype ? "symbol" : typeof M
                                }
                                ,
                                k(D)
                        }
                        var ft = function () {
                            var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}
                                , M = A.action
                                , F = M === void 0 ? "copy" : M
                                , V = A.container
                                , Y = A.target
                                , $e = A.text;
                            if (F !== "copy" && F !== "cut")
                                throw new Error('Invalid "action" value, use either "copy" or "cut"');
                            if (Y !== void 0)
                                if (Y && k(Y) === "object" && Y.nodeType === 1) {
                                    if (F === "copy" && Y.hasAttribute("disabled"))
                                        throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    if (F === "cut" && (Y.hasAttribute("readonly") || Y.hasAttribute("disabled")))
                                        throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`)
                                } else
                                    throw new Error('Invalid "target" value, use a valid Element');
                            if ($e)
                                return J($e, {
                                    container: V
                                });
                            if (Y)
                                return F === "cut" ? y(Y) : J(Y, {
                                    container: V
                                })
                        }
                            , qe = ft;
                        function Fe(D) {
                            "@babel/helpers - typeof";
                            return typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? Fe = function (M) {
                                return typeof M
                            }
                                : Fe = function (M) {
                                    return M && typeof Symbol == "function" && M.constructor === Symbol && M !== Symbol.prototype ? "symbol" : typeof M
                                }
                                ,
                                Fe(D)
                        }
                        function ki(D, A) {
                            if (!(D instanceof A))
                                throw new TypeError("Cannot call a class as a function")
                        }
                        function no(D, A) {
                            for (var M = 0; M < A.length; M++) {
                                var F = A[M];
                                F.enumerable = F.enumerable || !1,
                                    F.configurable = !0,
                                    "value" in F && (F.writable = !0),
                                    Object.defineProperty(D, F.key, F)
                            }
                        }
                        function Hi(D, A, M) {
                            return A && no(D.prototype, A),
                                M && no(D, M),
                                D
                        }
                        function $i(D, A) {
                            if (typeof A != "function" && A !== null)
                                throw new TypeError("Super expression must either be null or a function");
                            D.prototype = Object.create(A && A.prototype, {
                                constructor: {
                                    value: D,
                                    writable: !0,
                                    configurable: !0
                                }
                            }),
                                A && br(D, A)
                        }
                        function br(D, A) {
                            return br = Object.setPrototypeOf || function (F, V) {
                                return F.__proto__ = V,
                                    F
                            }
                                ,
                                br(D, A)
                        }
                        function Pi(D) {
                            var A = ji();
                            return function () {
                                var F = Ut(D), V;
                                if (A) {
                                    var Y = Ut(this).constructor;
                                    V = Reflect.construct(F, arguments, Y)
                                } else
                                    V = F.apply(this, arguments);
                                return Ri(this, V)
                            }
                        }
                        function Ri(D, A) {
                            return A && (Fe(A) === "object" || typeof A == "function") ? A : Ii(D)
                        }
                        function Ii(D) {
                            if (D === void 0)
                                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return D
                        }
                        function ji() {
                            if (typeof Reflect == "undefined" || !Reflect.construct || Reflect.construct.sham)
                                return !1;
                            if (typeof Proxy == "function")
                                return !0;
                            try {
                                return Date.prototype.toString.call(Reflect.construct(Date, [], function () { })),
                                    !0
                            } catch (D) {
                                return !1
                            }
                        }
                        function Ut(D) {
                            return Ut = Object.setPrototypeOf ? Object.getPrototypeOf : function (M) {
                                return M.__proto__ || Object.getPrototypeOf(M)
                            }
                                ,
                                Ut(D)
                        }
                        function vr(D, A) {
                            var M = "data-clipboard-".concat(D);
                            if (A.hasAttribute(M))
                                return A.getAttribute(M)
                        }
                        var Fi = function (D) {
                            $i(M, D);
                            var A = Pi(M);
                            function M(F, V) {
                                var Y;
                                return ki(this, M),
                                    Y = A.call(this),
                                    Y.resolveOptions(V),
                                    Y.listenClick(F),
                                    Y
                            }
                            return Hi(M, [{
                                key: "resolveOptions",
                                value: function () {
                                    var V = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                                    this.action = typeof V.action == "function" ? V.action : this.defaultAction,
                                        this.target = typeof V.target == "function" ? V.target : this.defaultTarget,
                                        this.text = typeof V.text == "function" ? V.text : this.defaultText,
                                        this.container = Fe(V.container) === "object" ? V.container : document.body
                                }
                            }, {
                                key: "listenClick",
                                value: function (V) {
                                    var Y = this;
                                    this.listener = c()(V, "click", function ($e) {
                                        return Y.onClick($e)
                                    })
                                }
                            }, {
                                key: "onClick",
                                value: function (V) {
                                    var Y = V.delegateTarget || V.currentTarget
                                        , $e = this.action(Y) || "copy"
                                        , Wt = qe({
                                            action: $e,
                                            container: this.container,
                                            target: this.target(Y),
                                            text: this.text(Y)
                                        });
                                    this.emit(Wt ? "success" : "error", {
                                        action: $e,
                                        text: Wt,
                                        trigger: Y,
                                        clearSelection: function () {
                                            Y && Y.focus(),
                                                window.getSelection().removeAllRanges()
                                        }
                                    })
                                }
                            }, {
                                key: "defaultAction",
                                value: function (V) {
                                    return vr("action", V)
                                }
                            }, {
                                key: "defaultTarget",
                                value: function (V) {
                                    var Y = vr("target", V);
                                    if (Y)
                                        return document.querySelector(Y)
                                }
                            }, {
                                key: "defaultText",
                                value: function (V) {
                                    return vr("text", V)
                                }
                            }, {
                                key: "destroy",
                                value: function () {
                                    this.listener.destroy()
                                }
                            }], [{
                                key: "copy",
                                value: function (V) {
                                    var Y = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                                        container: document.body
                                    };
                                    return J(V, Y)
                                }
                            }, {
                                key: "cut",
                                value: function (V) {
                                    return y(V)
                                }
                            }, {
                                key: "isSupported",
                                value: function () {
                                    var V = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"]
                                        , Y = typeof V == "string" ? [V] : V
                                        , $e = !!document.queryCommandSupported;
                                    return Y.forEach(function (Wt) {
                                        $e = $e && !!document.queryCommandSupported(Wt)
                                    }),
                                        $e
                                }
                            }]),
                                M
                        }(s())
                            , Ui = Fi
                    },
                    828: function (o) {
                        var n = 9;
                        if (typeof Element != "undefined" && !Element.prototype.matches) {
                            var i = Element.prototype;
                            i.matches = i.matchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector || i.webkitMatchesSelector
                        }
                        function a(s, p) {
                            for (; s && s.nodeType !== n;) {
                                if (typeof s.matches == "function" && s.matches(p))
                                    return s;
                                s = s.parentNode
                            }
                        }
                        o.exports = a
                    },
                    438: function (o, n, i) {
                        var a = i(828);
                        function s(l, f, u, d, y) {
                            var L = c.apply(this, arguments);
                            return l.addEventListener(u, L, y),
                            {
                                destroy: function () {
                                    l.removeEventListener(u, L, y)
                                }
                            }
                        }
                        function p(l, f, u, d, y) {
                            return typeof l.addEventListener == "function" ? s.apply(null, arguments) : typeof u == "function" ? s.bind(null, document).apply(null, arguments) : (typeof l == "string" && (l = document.querySelectorAll(l)),
                                Array.prototype.map.call(l, function (L) {
                                    return s(L, f, u, d, y)
                                }))
                        }
                        function c(l, f, u, d) {
                            return function (y) {
                                y.delegateTarget = a(y.target, f),
                                    y.delegateTarget && d.call(l, y)
                            }
                        }
                        o.exports = p
                    },
                    879: function (o, n) {
                        n.node = function (i) {
                            return i !== void 0 && i instanceof HTMLElement && i.nodeType === 1
                        }
                            ,
                            n.nodeList = function (i) {
                                var a = Object.prototype.toString.call(i);
                                return i !== void 0 && (a === "[object NodeList]" || a === "[object HTMLCollection]") && "length" in i && (i.length === 0 || n.node(i[0]))
                            }
                            ,
                            n.string = function (i) {
                                return typeof i == "string" || i instanceof String
                            }
                            ,
                            n.fn = function (i) {
                                var a = Object.prototype.toString.call(i);
                                return a === "[object Function]"
                            }
                    },
                    370: function (o, n, i) {
                        var a = i(879)
                            , s = i(438);
                        function p(u, d, y) {
                            if (!u && !d && !y)
                                throw new Error("Missing required arguments");
                            if (!a.string(d))
                                throw new TypeError("Second argument must be a String");
                            if (!a.fn(y))
                                throw new TypeError("Third argument must be a Function");
                            if (a.node(u))
                                return c(u, d, y);
                            if (a.nodeList(u))
                                return l(u, d, y);
                            if (a.string(u))
                                return f(u, d, y);
                            throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
                        }
                        function c(u, d, y) {
                            return u.addEventListener(d, y),
                            {
                                destroy: function () {
                                    u.removeEventListener(d, y)
                                }
                            }
                        }
                        function l(u, d, y) {
                            return Array.prototype.forEach.call(u, function (L) {
                                L.addEventListener(d, y)
                            }),
                            {
                                destroy: function () {
                                    Array.prototype.forEach.call(u, function (L) {
                                        L.removeEventListener(d, y)
                                    })
                                }
                            }
                        }
                        function f(u, d, y) {
                            return s(document.body, u, d, y)
                        }
                        o.exports = p
                    },
                    817: function (o) {
                        function n(i) {
                            var a;
                            if (i.nodeName === "SELECT")
                                i.focus(),
                                    a = i.value;
                            else if (i.nodeName === "INPUT" || i.nodeName === "TEXTAREA") {
                                var s = i.hasAttribute("readonly");
                                s || i.setAttribute("readonly", ""),
                                    i.select(),
                                    i.setSelectionRange(0, i.value.length),
                                    s || i.removeAttribute("readonly"),
                                    a = i.value
                            } else {
                                i.hasAttribute("contenteditable") && i.focus();
                                var p = window.getSelection()
                                    , c = document.createRange();
                                c.selectNodeContents(i),
                                    p.removeAllRanges(),
                                    p.addRange(c),
                                    a = p.toString()
                            }
                            return a
                        }
                        o.exports = n
                    },
                    279: function (o) {
                        function n() { }
                        n.prototype = {
                            on: function (i, a, s) {
                                var p = this.e || (this.e = {});
                                return (p[i] || (p[i] = [])).push({
                                    fn: a,
                                    ctx: s
                                }),
                                    this
                            },
                            once: function (i, a, s) {
                                var p = this;
                                function c() {
                                    p.off(i, c),
                                        a.apply(s, arguments)
                                }
                                return c._ = a,
                                    this.on(i, c, s)
                            },
                            emit: function (i) {
                                var a = [].slice.call(arguments, 1)
                                    , s = ((this.e || (this.e = {}))[i] || []).slice()
                                    , p = 0
                                    , c = s.length;
                                for (p; p < c; p++)
                                    s[p].fn.apply(s[p].ctx, a);
                                return this
                            },
                            off: function (i, a) {
                                var s = this.e || (this.e = {})
                                    , p = s[i]
                                    , c = [];
                                if (p && a)
                                    for (var l = 0, f = p.length; l < f; l++)
                                        p[l].fn !== a && p[l].fn._ !== a && c.push(p[l]);
                                return c.length ? s[i] = c : delete s[i],
                                    this
                            }
                        },
                            o.exports = n,
                            o.exports.TinyEmitter = n
                    }
                }
                    , t = {};
                function r(o) {
                    if (t[o])
                        return t[o].exports;
                    var n = t[o] = {
                        exports: {}
                    };
                    return e[o](n, n.exports, r),
                        n.exports
                }
                return function () {
                    r.n = function (o) {
                        var n = o && o.__esModule ? function () {
                            return o.default
                        }
                            : function () {
                                return o
                            }
                            ;
                        return r.d(n, {
                            a: n
                        }),
                            n
                    }
                }(),
                    function () {
                        r.d = function (o, n) {
                            for (var i in n)
                                r.o(n, i) && !r.o(o, i) && Object.defineProperty(o, i, {
                                    enumerable: !0,
                                    get: n[i]
                                })
                        }
                    }(),
                    function () {
                        r.o = function (o, n) {
                            return Object.prototype.hasOwnProperty.call(o, n)
                        }
                    }(),
                    r(686)
            }().default
        })
    }
    );
    var pL = Lt(lo());
    var wr = function (e, t) {
        return wr = Object.setPrototypeOf || {
            __proto__: []
        } instanceof Array && function (r, o) {
            r.__proto__ = o
        }
            || function (r, o) {
                for (var n in o)
                    Object.prototype.hasOwnProperty.call(o, n) && (r[n] = o[n])
            }
            ,
            wr(e, t)
    };
    function oe(e, t) {
        if (typeof t != "function" && t !== null)
            throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
        wr(e, t);
        function r() {
            this.constructor = e
        }
        e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype,
            new r)
    }
    function mo(e, t, r, o) {
        function n(i) {
            return i instanceof r ? i : new r(function (a) {
                a(i)
            }
            )
        }
        return new (r || (r = Promise))(function (i, a) {
            function s(l) {
                try {
                    c(o.next(l))
                } catch (f) {
                    a(f)
                }
            }
            function p(l) {
                try {
                    c(o.throw(l))
                } catch (f) {
                    a(f)
                }
            }
            function c(l) {
                l.done ? i(l.value) : n(l.value).then(s, p)
            }
            c((o = o.apply(e, t || [])).next())
        }
        )
    }
    function Dt(e, t) {
        var r = {
            label: 0,
            sent: function () {
                if (i[0] & 1)
                    throw i[1];
                return i[1]
            },
            trys: [],
            ops: []
        }, o, n, i, a = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
        return a.next = s(0),
            a.throw = s(1),
            a.return = s(2),
            typeof Symbol == "function" && (a[Symbol.iterator] = function () {
                return this
            }
            ),
            a;
        function s(c) {
            return function (l) {
                return p([c, l])
            }
        }
        function p(c) {
            if (o)
                throw new TypeError("Generator is already executing.");
            for (; a && (a = 0,
                c[0] && (r = 0)),
                r;)
                try {
                    if (o = 1,
                        n && (i = c[0] & 2 ? n.return : c[0] ? n.throw || ((i = n.return) && i.call(n),
                            0) : n.next) && !(i = i.call(n, c[1])).done)
                        return i;
                    switch (n = 0,
                    i && (c = [c[0] & 2, i.value]),
                    c[0]) {
                        case 0:
                        case 1:
                            i = c;
                            break;
                        case 4:
                            return r.label++,
                            {
                                value: c[1],
                                done: !1
                            };
                        case 5:
                            r.label++,
                                n = c[1],
                                c = [0];
                            continue;
                        case 7:
                            c = r.ops.pop(),
                                r.trys.pop();
                            continue;
                        default:
                            if (i = r.trys,
                                !(i = i.length > 0 && i[i.length - 1]) && (c[0] === 6 || c[0] === 2)) {
                                r = 0;
                                continue
                            }
                            if (c[0] === 3 && (!i || c[1] > i[0] && c[1] < i[3])) {
                                r.label = c[1];
                                break
                            }
                            if (c[0] === 6 && r.label < i[1]) {
                                r.label = i[1],
                                    i = c;
                                break
                            }
                            if (i && r.label < i[2]) {
                                r.label = i[2],
                                    r.ops.push(c);
                                break
                            }
                            i[2] && r.ops.pop(),
                                r.trys.pop();
                            continue
                    }
                    c = t.call(e, r)
                } catch (l) {
                    c = [6, l],
                        n = 0
                } finally {
                    o = i = 0
                }
            if (c[0] & 5)
                throw c[1];
            return {
                value: c[0] ? c[1] : void 0,
                done: !0
            }
        }
    }
    function he(e) {
        var t = typeof Symbol == "function" && Symbol.iterator
            , r = t && e[t]
            , o = 0;
        if (r)
            return r.call(e);
        if (e && typeof e.length == "number")
            return {
                next: function () {
                    return e && o >= e.length && (e = void 0),
                    {
                        value: e && e[o++],
                        done: !e
                    }
                }
            };
        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
    }
    function z(e, t) {
        var r = typeof Symbol == "function" && e[Symbol.iterator];
        if (!r)
            return e;
        var o = r.call(e), n, i = [], a;
        try {
            for (; (t === void 0 || t-- > 0) && !(n = o.next()).done;)
                i.push(n.value)
        } catch (s) {
            a = {
                error: s
            }
        } finally {
            try {
                n && !n.done && (r = o.return) && r.call(o)
            } finally {
                if (a)
                    throw a.error
            }
        }
        return i
    }
    function q(e, t, r) {
        if (r || arguments.length === 2)
            for (var o = 0, n = t.length, i; o < n; o++)
                (i || !(o in t)) && (i || (i = Array.prototype.slice.call(t, 0, o)),
                    i[o] = t[o]);
        return e.concat(i || Array.prototype.slice.call(t))
    }
    function nt(e) {
        return this instanceof nt ? (this.v = e,
            this) : new nt(e)
    }
    function fo(e, t, r) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var o = r.apply(e, t || []), n, i = [];
        return n = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype),
            s("next"),
            s("throw"),
            s("return", a),
            n[Symbol.asyncIterator] = function () {
                return this
            }
            ,
            n;
        function a(d) {
            return function (y) {
                return Promise.resolve(y).then(d, f)
            }
        }
        function s(d, y) {
            o[d] && (n[d] = function (L) {
                return new Promise(function (X, ee) {
                    i.push([d, L, X, ee]) > 1 || p(d, L)
                }
                )
            }
                ,
                y && (n[d] = y(n[d])))
        }
        function p(d, y) {
            try {
                c(o[d](y))
            } catch (L) {
                u(i[0][3], L)
            }
        }
        function c(d) {
            d.value instanceof nt ? Promise.resolve(d.value.v).then(l, f) : u(i[0][2], d)
        }
        function l(d) {
            p("next", d)
        }
        function f(d) {
            p("throw", d)
        }
        function u(d, y) {
            d(y),
                i.shift(),
                i.length && p(i[0][0], i[0][1])
        }
    }
    function uo(e) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var t = e[Symbol.asyncIterator], r;
        return t ? t.call(e) : (e = typeof he == "function" ? he(e) : e[Symbol.iterator](),
            r = {},
            o("next"),
            o("throw"),
            o("return"),
            r[Symbol.asyncIterator] = function () {
                return this
            }
            ,
            r);
        function o(i) {
            r[i] = e[i] && function (a) {
                return new Promise(function (s, p) {
                    a = e[i](a),
                        n(s, p, a.done, a.value)
                }
                )
            }
        }
        function n(i, a, s, p) {
            Promise.resolve(p).then(function (c) {
                i({
                    value: c,
                    done: s
                })
            }, a)
        }
    }
    function H(e) {
        return typeof e == "function"
    }
    function ut(e) {
        var t = function (o) {
            Error.call(o),
                o.stack = new Error().stack
        }
            , r = e(t);
        return r.prototype = Object.create(Error.prototype),
            r.prototype.constructor = r,
            r
    }
    var zt = ut(function (e) {
        return function (r) {
            e(this),
                this.message = r ? r.length + ` errors occurred during unsubscription:
` + r.map(function (o, n) {
                    return n + 1 + ") " + o.toString()
                }).join(`
  `) : "",
                this.name = "UnsubscriptionError",
                this.errors = r
        }
    });
    function Qe(e, t) {
        if (e) {
            var r = e.indexOf(t);
            0 <= r && e.splice(r, 1)
        }
    }
    var Ue = function () {
        function e(t) {
            this.initialTeardown = t,
                this.closed = !1,
                this._parentage = null,
                this._finalizers = null
        }
        return e.prototype.unsubscribe = function () {
            var t, r, o, n, i;
            if (!this.closed) {
                this.closed = !0;
                var a = this._parentage;
                if (a)
                    if (this._parentage = null,
                        Array.isArray(a))
                        try {
                            for (var s = he(a), p = s.next(); !p.done; p = s.next()) {
                                var c = p.value;
                                c.remove(this)
                            }
                        } catch (L) {
                            t = {
                                error: L
                            }
                        } finally {
                            try {
                                p && !p.done && (r = s.return) && r.call(s)
                            } finally {
                                if (t)
                                    throw t.error
                            }
                        }
                    else
                        a.remove(this);
                var l = this.initialTeardown;
                if (H(l))
                    try {
                        l()
                    } catch (L) {
                        i = L instanceof zt ? L.errors : [L]
                    }
                var f = this._finalizers;
                if (f) {
                    this._finalizers = null;
                    try {
                        for (var u = he(f), d = u.next(); !d.done; d = u.next()) {
                            var y = d.value;
                            try {
                                ho(y)
                            } catch (L) {
                                i = i != null ? i : [],
                                    L instanceof zt ? i = q(q([], z(i)), z(L.errors)) : i.push(L)
                            }
                        }
                    } catch (L) {
                        o = {
                            error: L
                        }
                    } finally {
                        try {
                            d && !d.done && (n = u.return) && n.call(u)
                        } finally {
                            if (o)
                                throw o.error
                        }
                    }
                }
                if (i)
                    throw new zt(i)
            }
        }
            ,
            e.prototype.add = function (t) {
                var r;
                if (t && t !== this)
                    if (this.closed)
                        ho(t);
                    else {
                        if (t instanceof e) {
                            if (t.closed || t._hasParent(this))
                                return;
                            t._addParent(this)
                        }
                        (this._finalizers = (r = this._finalizers) !== null && r !== void 0 ? r : []).push(t)
                    }
            }
            ,
            e.prototype._hasParent = function (t) {
                var r = this._parentage;
                return r === t || Array.isArray(r) && r.includes(t)
            }
            ,
            e.prototype._addParent = function (t) {
                var r = this._parentage;
                this._parentage = Array.isArray(r) ? (r.push(t),
                    r) : r ? [r, t] : t
            }
            ,
            e.prototype._removeParent = function (t) {
                var r = this._parentage;
                r === t ? this._parentage = null : Array.isArray(r) && Qe(r, t)
            }
            ,
            e.prototype.remove = function (t) {
                var r = this._finalizers;
                r && Qe(r, t),
                    t instanceof e && t._removeParent(this)
            }
            ,
            e.EMPTY = function () {
                var t = new e;
                return t.closed = !0,
                    t
            }(),
            e
    }();
    var Tr = Ue.EMPTY;
    function Nt(e) {
        return e instanceof Ue || e && "closed" in e && H(e.remove) && H(e.add) && H(e.unsubscribe)
    }
    function ho(e) {
        H(e) ? e() : e.unsubscribe()
    }
    var Pe = {
        onUnhandledError: null,
        onStoppedNotification: null,
        Promise: void 0,
        useDeprecatedSynchronousErrorHandling: !1,
        useDeprecatedNextContext: !1
    };
    var dt = {
        setTimeout: function (e, t) {
            for (var r = [], o = 2; o < arguments.length; o++)
                r[o - 2] = arguments[o];
            var n = dt.delegate;
            return n != null && n.setTimeout ? n.setTimeout.apply(n, q([e, t], z(r))) : setTimeout.apply(void 0, q([e, t], z(r)))
        },
        clearTimeout: function (e) {
            var t = dt.delegate;
            return ((t == null ? void 0 : t.clearTimeout) || clearTimeout)(e)
        },
        delegate: void 0
    };
    function qt(e) {
        dt.setTimeout(function () {
            var t = Pe.onUnhandledError;
            if (t)
                t(e);
            else
                throw e
        })
    }
    function be() { }
    var bo = function () {
        return Sr("C", void 0, void 0)
    }();
    function vo(e) {
        return Sr("E", void 0, e)
    }
    function go(e) {
        return Sr("N", e, void 0)
    }
    function Sr(e, t, r) {
        return {
            kind: e,
            value: t,
            error: r
        }
    }
    var it = null;
    function ht(e) {
        if (Pe.useDeprecatedSynchronousErrorHandling) {
            var t = !it;
            if (t && (it = {
                errorThrown: !1,
                error: null
            }),
                e(),
                t) {
                var r = it
                    , o = r.errorThrown
                    , n = r.error;
                if (it = null,
                    o)
                    throw n
            }
        } else
            e()
    }
    function yo(e) {
        Pe.useDeprecatedSynchronousErrorHandling && it && (it.errorThrown = !0,
            it.error = e)
    }
    var Mt = function (e) {
        oe(t, e);
        function t(r) {
            var o = e.call(this) || this;
            return o.isStopped = !1,
                r ? (o.destination = r,
                    Nt(r) && r.add(o)) : o.destination = Yi,
                o
        }
        return t.create = function (r, o, n) {
            return new at(r, o, n)
        }
            ,
            t.prototype.next = function (r) {
                this.isStopped ? Lr(go(r), this) : this._next(r)
            }
            ,
            t.prototype.error = function (r) {
                this.isStopped ? Lr(vo(r), this) : (this.isStopped = !0,
                    this._error(r))
            }
            ,
            t.prototype.complete = function () {
                this.isStopped ? Lr(bo, this) : (this.isStopped = !0,
                    this._complete())
            }
            ,
            t.prototype.unsubscribe = function () {
                this.closed || (this.isStopped = !0,
                    e.prototype.unsubscribe.call(this),
                    this.destination = null)
            }
            ,
            t.prototype._next = function (r) {
                this.destination.next(r)
            }
            ,
            t.prototype._error = function (r) {
                try {
                    this.destination.error(r)
                } finally {
                    this.unsubscribe()
                }
            }
            ,
            t.prototype._complete = function () {
                try {
                    this.destination.complete()
                } finally {
                    this.unsubscribe()
                }
            }
            ,
            t
    }(Ue);
    var qi = Function.prototype.bind;
    function Or(e, t) {
        return qi.call(e, t)
    }
    var Qi = function () {
        function e(t) {
            this.partialObserver = t
        }
        return e.prototype.next = function (t) {
            var r = this.partialObserver;
            if (r.next)
                try {
                    r.next(t)
                } catch (o) {
                    Qt(o)
                }
        }
            ,
            e.prototype.error = function (t) {
                var r = this.partialObserver;
                if (r.error)
                    try {
                        r.error(t)
                    } catch (o) {
                        Qt(o)
                    }
                else
                    Qt(t)
            }
            ,
            e.prototype.complete = function () {
                var t = this.partialObserver;
                if (t.complete)
                    try {
                        t.complete()
                    } catch (r) {
                        Qt(r)
                    }
            }
            ,
            e
    }()
        , at = function (e) {
            oe(t, e);
            function t(r, o, n) {
                var i = e.call(this) || this, a;
                if (H(r) || !r)
                    a = {
                        next: r != null ? r : void 0,
                        error: o != null ? o : void 0,
                        complete: n != null ? n : void 0
                    };
                else {
                    var s;
                    i && Pe.useDeprecatedNextContext ? (s = Object.create(r),
                        s.unsubscribe = function () {
                            return i.unsubscribe()
                        }
                        ,
                        a = {
                            next: r.next && Or(r.next, s),
                            error: r.error && Or(r.error, s),
                            complete: r.complete && Or(r.complete, s)
                        }) : a = r
                }
                return i.destination = new Qi(a),
                    i
            }
            return t
        }(Mt);
    function Qt(e) {
        Pe.useDeprecatedSynchronousErrorHandling ? yo(e) : qt(e)
    }
    function Ki(e) {
        throw e
    }
    function Lr(e, t) {
        var r = Pe.onStoppedNotification;
        r && dt.setTimeout(function () {
            return r(e, t)
        })
    }
    var Yi = {
        closed: !0,
        next: be,
        error: Ki,
        complete: be
    };
    var bt = function () {
        return typeof Symbol == "function" && Symbol.observable || "@@observable"
    }();
    function le(e) {
        return e
    }
    function xo() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return Mr(e)
    }
    function Mr(e) {
        return e.length === 0 ? le : e.length === 1 ? e[0] : function (r) {
            return e.reduce(function (o, n) {
                return n(o)
            }, r)
        }
    }
    var j = function () {
        function e(t) {
            t && (this._subscribe = t)
        }
        return e.prototype.lift = function (t) {
            var r = new e;
            return r.source = this,
                r.operator = t,
                r
        }
            ,
            e.prototype.subscribe = function (t, r, o) {
                var n = this
                    , i = Gi(t) ? t : new at(t, r, o);
                return ht(function () {
                    var a = n
                        , s = a.operator
                        , p = a.source;
                    i.add(s ? s.call(i, p) : p ? n._subscribe(i) : n._trySubscribe(i))
                }),
                    i
            }
            ,
            e.prototype._trySubscribe = function (t) {
                try {
                    return this._subscribe(t)
                } catch (r) {
                    t.error(r)
                }
            }
            ,
            e.prototype.forEach = function (t, r) {
                var o = this;
                return r = Eo(r),
                    new r(function (n, i) {
                        var a = new at({
                            next: function (s) {
                                try {
                                    t(s)
                                } catch (p) {
                                    i(p),
                                        a.unsubscribe()
                                }
                            },
                            error: i,
                            complete: n
                        });
                        o.subscribe(a)
                    }
                    )
            }
            ,
            e.prototype._subscribe = function (t) {
                var r;
                return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(t)
            }
            ,
            e.prototype[bt] = function () {
                return this
            }
            ,
            e.prototype.pipe = function () {
                for (var t = [], r = 0; r < arguments.length; r++)
                    t[r] = arguments[r];
                return Mr(t)(this)
            }
            ,
            e.prototype.toPromise = function (t) {
                var r = this;
                return t = Eo(t),
                    new t(function (o, n) {
                        var i;
                        r.subscribe(function (a) {
                            return i = a
                        }, function (a) {
                            return n(a)
                        }, function () {
                            return o(i)
                        })
                    }
                    )
            }
            ,
            e.create = function (t) {
                return new e(t)
            }
            ,
            e
    }();
    function Eo(e) {
        var t;
        return (t = e != null ? e : Pe.Promise) !== null && t !== void 0 ? t : Promise
    }
    function Bi(e) {
        return e && H(e.next) && H(e.error) && H(e.complete)
    }
    function Gi(e) {
        return e && e instanceof Mt || Bi(e) && Nt(e)
    }
    function Ji(e) {
        return H(e == null ? void 0 : e.lift)
    }
    function E(e) {
        return function (t) {
            if (Ji(t))
                return t.lift(function (r) {
                    try {
                        return e(r, this)
                    } catch (o) {
                        this.error(o)
                    }
                });
            throw new TypeError("Unable to lift unknown Observable type")
        }
    }
    function T(e, t, r, o, n) {
        return new Xi(e, t, r, o, n)
    }
    var Xi = function (e) {
        oe(t, e);
        function t(r, o, n, i, a, s) {
            var p = e.call(this, r) || this;
            return p.onFinalize = a,
                p.shouldUnsubscribe = s,
                p._next = o ? function (c) {
                    try {
                        o(c)
                    } catch (l) {
                        r.error(l)
                    }
                }
                    : e.prototype._next,
                p._error = i ? function (c) {
                    try {
                        i(c)
                    } catch (l) {
                        r.error(l)
                    } finally {
                        this.unsubscribe()
                    }
                }
                    : e.prototype._error,
                p._complete = n ? function () {
                    try {
                        n()
                    } catch (c) {
                        r.error(c)
                    } finally {
                        this.unsubscribe()
                    }
                }
                    : e.prototype._complete,
                p
        }
        return t.prototype.unsubscribe = function () {
            var r;
            if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                var o = this.closed;
                e.prototype.unsubscribe.call(this),
                    !o && ((r = this.onFinalize) === null || r === void 0 || r.call(this))
            }
        }
            ,
            t
    }(Mt);
    var vt = {
        schedule: function (e) {
            var t = requestAnimationFrame
                , r = cancelAnimationFrame
                , o = vt.delegate;
            o && (t = o.requestAnimationFrame,
                r = o.cancelAnimationFrame);
            var n = t(function (i) {
                r = void 0,
                    e(i)
            });
            return new Ue(function () {
                return r == null ? void 0 : r(n)
            }
            )
        },
        requestAnimationFrame: function () {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            var r = vt.delegate;
            return ((r == null ? void 0 : r.requestAnimationFrame) || requestAnimationFrame).apply(void 0, q([], z(e)))
        },
        cancelAnimationFrame: function () {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            var r = vt.delegate;
            return ((r == null ? void 0 : r.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, q([], z(e)))
        },
        delegate: void 0
    };
    var wo = ut(function (e) {
        return function () {
            e(this),
                this.name = "ObjectUnsubscribedError",
                this.message = "object unsubscribed"
        }
    });
    var g = function (e) {
        oe(t, e);
        function t() {
            var r = e.call(this) || this;
            return r.closed = !1,
                r.currentObservers = null,
                r.observers = [],
                r.isStopped = !1,
                r.hasError = !1,
                r.thrownError = null,
                r
        }
        return t.prototype.lift = function (r) {
            var o = new To(this, this);
            return o.operator = r,
                o
        }
            ,
            t.prototype._throwIfClosed = function () {
                if (this.closed)
                    throw new wo
            }
            ,
            t.prototype.next = function (r) {
                var o = this;
                ht(function () {
                    var n, i;
                    if (o._throwIfClosed(),
                        !o.isStopped) {
                        o.currentObservers || (o.currentObservers = Array.from(o.observers));
                        try {
                            for (var a = he(o.currentObservers), s = a.next(); !s.done; s = a.next()) {
                                var p = s.value;
                                p.next(r)
                            }
                        } catch (c) {
                            n = {
                                error: c
                            }
                        } finally {
                            try {
                                s && !s.done && (i = a.return) && i.call(a)
                            } finally {
                                if (n)
                                    throw n.error
                            }
                        }
                    }
                })
            }
            ,
            t.prototype.error = function (r) {
                var o = this;
                ht(function () {
                    if (o._throwIfClosed(),
                        !o.isStopped) {
                        o.hasError = o.isStopped = !0,
                            o.thrownError = r;
                        for (var n = o.observers; n.length;)
                            n.shift().error(r)
                    }
                })
            }
            ,
            t.prototype.complete = function () {
                var r = this;
                ht(function () {
                    if (r._throwIfClosed(),
                        !r.isStopped) {
                        r.isStopped = !0;
                        for (var o = r.observers; o.length;)
                            o.shift().complete()
                    }
                })
            }
            ,
            t.prototype.unsubscribe = function () {
                this.isStopped = this.closed = !0,
                    this.observers = this.currentObservers = null
            }
            ,
            Object.defineProperty(t.prototype, "observed", {
                get: function () {
                    var r;
                    return ((r = this.observers) === null || r === void 0 ? void 0 : r.length) > 0
                },
                enumerable: !1,
                configurable: !0
            }),
            t.prototype._trySubscribe = function (r) {
                return this._throwIfClosed(),
                    e.prototype._trySubscribe.call(this, r)
            }
            ,
            t.prototype._subscribe = function (r) {
                return this._throwIfClosed(),
                    this._checkFinalizedStatuses(r),
                    this._innerSubscribe(r)
            }
            ,
            t.prototype._innerSubscribe = function (r) {
                var o = this
                    , n = this
                    , i = n.hasError
                    , a = n.isStopped
                    , s = n.observers;
                return i || a ? Tr : (this.currentObservers = null,
                    s.push(r),
                    new Ue(function () {
                        o.currentObservers = null,
                            Qe(s, r)
                    }
                    ))
            }
            ,
            t.prototype._checkFinalizedStatuses = function (r) {
                var o = this
                    , n = o.hasError
                    , i = o.thrownError
                    , a = o.isStopped;
                n ? r.error(i) : a && r.complete()
            }
            ,
            t.prototype.asObservable = function () {
                var r = new j;
                return r.source = this,
                    r
            }
            ,
            t.create = function (r, o) {
                return new To(r, o)
            }
            ,
            t
    }(j);
    var To = function (e) {
        oe(t, e);
        function t(r, o) {
            var n = e.call(this) || this;
            return n.destination = r,
                n.source = o,
                n
        }
        return t.prototype.next = function (r) {
            var o, n;
            (n = (o = this.destination) === null || o === void 0 ? void 0 : o.next) === null || n === void 0 || n.call(o, r)
        }
            ,
            t.prototype.error = function (r) {
                var o, n;
                (n = (o = this.destination) === null || o === void 0 ? void 0 : o.error) === null || n === void 0 || n.call(o, r)
            }
            ,
            t.prototype.complete = function () {
                var r, o;
                (o = (r = this.destination) === null || r === void 0 ? void 0 : r.complete) === null || o === void 0 || o.call(r)
            }
            ,
            t.prototype._subscribe = function (r) {
                var o, n;
                return (n = (o = this.source) === null || o === void 0 ? void 0 : o.subscribe(r)) !== null && n !== void 0 ? n : Tr
            }
            ,
            t
    }(g);
    var _r = function (e) {
        oe(t, e);
        function t(r) {
            var o = e.call(this) || this;
            return o._value = r,
                o
        }
        return Object.defineProperty(t.prototype, "value", {
            get: function () {
                return this.getValue()
            },
            enumerable: !1,
            configurable: !0
        }),
            t.prototype._subscribe = function (r) {
                var o = e.prototype._subscribe.call(this, r);
                return !o.closed && r.next(this._value),
                    o
            }
            ,
            t.prototype.getValue = function () {
                var r = this
                    , o = r.hasError
                    , n = r.thrownError
                    , i = r._value;
                if (o)
                    throw n;
                return this._throwIfClosed(),
                    i
            }
            ,
            t.prototype.next = function (r) {
                e.prototype.next.call(this, this._value = r)
            }
            ,
            t
    }(g);
    var _t = {
        now: function () {
            return (_t.delegate || Date).now()
        },
        delegate: void 0
    };
    var At = function (e) {
        oe(t, e);
        function t(r, o, n) {
            r === void 0 && (r = 1 / 0),
                o === void 0 && (o = 1 / 0),
                n === void 0 && (n = _t);
            var i = e.call(this) || this;
            return i._bufferSize = r,
                i._windowTime = o,
                i._timestampProvider = n,
                i._buffer = [],
                i._infiniteTimeWindow = !0,
                i._infiniteTimeWindow = o === 1 / 0,
                i._bufferSize = Math.max(1, r),
                i._windowTime = Math.max(1, o),
                i
        }
        return t.prototype.next = function (r) {
            var o = this
                , n = o.isStopped
                , i = o._buffer
                , a = o._infiniteTimeWindow
                , s = o._timestampProvider
                , p = o._windowTime;
            n || (i.push(r),
                !a && i.push(s.now() + p)),
                this._trimBuffer(),
                e.prototype.next.call(this, r)
        }
            ,
            t.prototype._subscribe = function (r) {
                this._throwIfClosed(),
                    this._trimBuffer();
                for (var o = this._innerSubscribe(r), n = this, i = n._infiniteTimeWindow, a = n._buffer, s = a.slice(), p = 0; p < s.length && !r.closed; p += i ? 1 : 2)
                    r.next(s[p]);
                return this._checkFinalizedStatuses(r),
                    o
            }
            ,
            t.prototype._trimBuffer = function () {
                var r = this
                    , o = r._bufferSize
                    , n = r._timestampProvider
                    , i = r._buffer
                    , a = r._infiniteTimeWindow
                    , s = (a ? 1 : 2) * o;
                if (o < 1 / 0 && s < i.length && i.splice(0, i.length - s),
                    !a) {
                    for (var p = n.now(), c = 0, l = 1; l < i.length && i[l] <= p; l += 2)
                        c = l;
                    c && i.splice(0, c + 1)
                }
            }
            ,
            t
    }(g);
    var So = function (e) {
        oe(t, e);
        function t(r, o) {
            return e.call(this) || this
        }
        return t.prototype.schedule = function (r, o) {
            return o === void 0 && (o = 0),
                this
        }
            ,
            t
    }(Ue);
    var Ct = {
        setInterval: function (e, t) {
            for (var r = [], o = 2; o < arguments.length; o++)
                r[o - 2] = arguments[o];
            var n = Ct.delegate;
            return n != null && n.setInterval ? n.setInterval.apply(n, q([e, t], z(r))) : setInterval.apply(void 0, q([e, t], z(r)))
        },
        clearInterval: function (e) {
            var t = Ct.delegate;
            return ((t == null ? void 0 : t.clearInterval) || clearInterval)(e)
        },
        delegate: void 0
    };
    var gt = function (e) {
        oe(t, e);
        function t(r, o) {
            var n = e.call(this, r, o) || this;
            return n.scheduler = r,
                n.work = o,
                n.pending = !1,
                n
        }
        return t.prototype.schedule = function (r, o) {
            var n;
            if (o === void 0 && (o = 0),
                this.closed)
                return this;
            this.state = r;
            var i = this.id
                , a = this.scheduler;
            return i != null && (this.id = this.recycleAsyncId(a, i, o)),
                this.pending = !0,
                this.delay = o,
                this.id = (n = this.id) !== null && n !== void 0 ? n : this.requestAsyncId(a, this.id, o),
                this
        }
            ,
            t.prototype.requestAsyncId = function (r, o, n) {
                return n === void 0 && (n = 0),
                    Ct.setInterval(r.flush.bind(r, this), n)
            }
            ,
            t.prototype.recycleAsyncId = function (r, o, n) {
                if (n === void 0 && (n = 0),
                    n != null && this.delay === n && this.pending === !1)
                    return o;
                o != null && Ct.clearInterval(o)
            }
            ,
            t.prototype.execute = function (r, o) {
                if (this.closed)
                    return new Error("executing a cancelled action");
                this.pending = !1;
                var n = this._execute(r, o);
                if (n)
                    return n;
                this.pending === !1 && this.id != null && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
            }
            ,
            t.prototype._execute = function (r, o) {
                var n = !1, i;
                try {
                    this.work(r)
                } catch (a) {
                    n = !0,
                        i = a || new Error("Scheduled action threw falsy error")
                }
                if (n)
                    return this.unsubscribe(),
                        i
            }
            ,
            t.prototype.unsubscribe = function () {
                if (!this.closed) {
                    var r = this
                        , o = r.id
                        , n = r.scheduler
                        , i = n.actions;
                    this.work = this.state = this.scheduler = null,
                        this.pending = !1,
                        Qe(i, this),
                        o != null && (this.id = this.recycleAsyncId(n, o, null)),
                        this.delay = null,
                        e.prototype.unsubscribe.call(this)
                }
            }
            ,
            t
    }(So);
    var Ar = function () {
        function e(t, r) {
            r === void 0 && (r = e.now),
                this.schedulerActionCtor = t,
                this.now = r
        }
        return e.prototype.schedule = function (t, r, o) {
            return r === void 0 && (r = 0),
                new this.schedulerActionCtor(this, t).schedule(o, r)
        }
            ,
            e.now = _t.now,
            e
    }();
    var yt = function (e) {
        oe(t, e);
        function t(r, o) {
            o === void 0 && (o = Ar.now);
            var n = e.call(this, r, o) || this;
            return n.actions = [],
                n._active = !1,
                n
        }
        return t.prototype.flush = function (r) {
            var o = this.actions;
            if (this._active) {
                o.push(r);
                return
            }
            var n;
            this._active = !0;
            do
                if (n = r.execute(r.state, r.delay))
                    break;
            while (r = o.shift());
            if (this._active = !1,
                n) {
                for (; r = o.shift();)
                    r.unsubscribe();
                throw n
            }
        }
            ,
            t
    }(Ar);
    var se = new yt(gt)
        , Cr = se;
    var Oo = function (e) {
        oe(t, e);
        function t(r, o) {
            var n = e.call(this, r, o) || this;
            return n.scheduler = r,
                n.work = o,
                n
        }
        return t.prototype.schedule = function (r, o) {
            return o === void 0 && (o = 0),
                o > 0 ? e.prototype.schedule.call(this, r, o) : (this.delay = o,
                    this.state = r,
                    this.scheduler.flush(this),
                    this)
        }
            ,
            t.prototype.execute = function (r, o) {
                return o > 0 || this.closed ? e.prototype.execute.call(this, r, o) : this._execute(r, o)
            }
            ,
            t.prototype.requestAsyncId = function (r, o, n) {
                return n === void 0 && (n = 0),
                    n != null && n > 0 || n == null && this.delay > 0 ? e.prototype.requestAsyncId.call(this, r, o, n) : (r.flush(this),
                        0)
            }
            ,
            t
    }(gt);
    var Lo = function (e) {
        oe(t, e);
        function t() {
            return e !== null && e.apply(this, arguments) || this
        }
        return t
    }(yt);
    var kr = new Lo(Oo);
    var Mo = function (e) {
        oe(t, e);
        function t(r, o) {
            var n = e.call(this, r, o) || this;
            return n.scheduler = r,
                n.work = o,
                n
        }
        return t.prototype.requestAsyncId = function (r, o, n) {
            return n === void 0 && (n = 0),
                n !== null && n > 0 ? e.prototype.requestAsyncId.call(this, r, o, n) : (r.actions.push(this),
                    r._scheduled || (r._scheduled = vt.requestAnimationFrame(function () {
                        return r.flush(void 0)
                    })))
        }
            ,
            t.prototype.recycleAsyncId = function (r, o, n) {
                var i;
                if (n === void 0 && (n = 0),
                    n != null ? n > 0 : this.delay > 0)
                    return e.prototype.recycleAsyncId.call(this, r, o, n);
                var a = r.actions;
                o != null && o === r._scheduled && ((i = a[a.length - 1]) === null || i === void 0 ? void 0 : i.id) !== o && (vt.cancelAnimationFrame(o),
                    r._scheduled = void 0)
            }
            ,
            t
    }(gt);
    var _o = function (e) {
        oe(t, e);
        function t() {
            return e !== null && e.apply(this, arguments) || this
        }
        return t.prototype.flush = function (r) {
            this._active = !0;
            var o;
            r ? o = r.id : (o = this._scheduled,
                this._scheduled = void 0);
            var n = this.actions, i;
            r = r || n.shift();
            do
                if (i = r.execute(r.state, r.delay))
                    break;
            while ((r = n[0]) && r.id === o && n.shift());
            if (this._active = !1,
                i) {
                for (; (r = n[0]) && r.id === o && n.shift();)
                    r.unsubscribe();
                throw i
            }
        }
            ,
            t
    }(yt);
    var me = new _o(Mo);
    var S = new j(function (e) {
        return e.complete()
    }
    );
    function Kt(e) {
        return e && H(e.schedule)
    }
    function Hr(e) {
        return e[e.length - 1]
    }
    function Xe(e) {
        return H(Hr(e)) ? e.pop() : void 0
    }
    function ke(e) {
        return Kt(Hr(e)) ? e.pop() : void 0
    }
    function Yt(e, t) {
        return typeof Hr(e) == "number" ? e.pop() : t
    }
    var xt = function (e) {
        return e && typeof e.length == "number" && typeof e != "function"
    };
    function Bt(e) {
        return H(e == null ? void 0 : e.then)
    }
    function Gt(e) {
        return H(e[bt])
    }
    function Jt(e) {
        return Symbol.asyncIterator && H(e == null ? void 0 : e[Symbol.asyncIterator])
    }
    function Xt(e) {
        return new TypeError("You provided " + (e !== null && typeof e == "object" ? "an invalid object" : "'" + e + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")
    }
    function Zi() {
        return typeof Symbol != "function" || !Symbol.iterator ? "@@iterator" : Symbol.iterator
    }
    var Zt = Zi();
    function er(e) {
        return H(e == null ? void 0 : e[Zt])
    }
    function tr(e) {
        return fo(this, arguments, function () {
            var r, o, n, i;
            return Dt(this, function (a) {
                switch (a.label) {
                    case 0:
                        r = e.getReader(),
                            a.label = 1;
                    case 1:
                        a.trys.push([1, , 9, 10]),
                            a.label = 2;
                    case 2:
                        return [4, nt(r.read())];
                    case 3:
                        return o = a.sent(),
                            n = o.value,
                            i = o.done,
                            i ? [4, nt(void 0)] : [3, 5];
                    case 4:
                        return [2, a.sent()];
                    case 5:
                        return [4, nt(n)];
                    case 6:
                        return [4, a.sent()];
                    case 7:
                        return a.sent(),
                            [3, 2];
                    case 8:
                        return [3, 10];
                    case 9:
                        return r.releaseLock(),
                            [7];
                    case 10:
                        return [2]
                }
            })
        })
    }
    function rr(e) {
        return H(e == null ? void 0 : e.getReader)
    }
    function U(e) {
        if (e instanceof j)
            return e;
        if (e != null) {
            if (Gt(e))
                return ea(e);
            if (xt(e))
                return ta(e);
            if (Bt(e))
                return ra(e);
            if (Jt(e))
                return Ao(e);
            if (er(e))
                return oa(e);
            if (rr(e))
                return na(e)
        }
        throw Xt(e)
    }
    function ea(e) {
        return new j(function (t) {
            var r = e[bt]();
            if (H(r.subscribe))
                return r.subscribe(t);
            throw new TypeError("Provided object does not correctly implement Symbol.observable")
        }
        )
    }
    function ta(e) {
        return new j(function (t) {
            for (var r = 0; r < e.length && !t.closed; r++)
                t.next(e[r]);
            t.complete()
        }
        )
    }
    function ra(e) {
        return new j(function (t) {
            e.then(function (r) {
                t.closed || (t.next(r),
                    t.complete())
            }, function (r) {
                return t.error(r)
            }).then(null, qt)
        }
        )
    }
    function oa(e) {
        return new j(function (t) {
            var r, o;
            try {
                for (var n = he(e), i = n.next(); !i.done; i = n.next()) {
                    var a = i.value;
                    if (t.next(a),
                        t.closed)
                        return
                }
            } catch (s) {
                r = {
                    error: s
                }
            } finally {
                try {
                    i && !i.done && (o = n.return) && o.call(n)
                } finally {
                    if (r)
                        throw r.error
                }
            }
            t.complete()
        }
        )
    }
    function Ao(e) {
        return new j(function (t) {
            ia(e, t).catch(function (r) {
                return t.error(r)
            })
        }
        )
    }
    function na(e) {
        return Ao(tr(e))
    }
    function ia(e, t) {
        var r, o, n, i;
        return mo(this, void 0, void 0, function () {
            var a, s;
            return Dt(this, function (p) {
                switch (p.label) {
                    case 0:
                        p.trys.push([0, 5, 6, 11]),
                            r = uo(e),
                            p.label = 1;
                    case 1:
                        return [4, r.next()];
                    case 2:
                        if (o = p.sent(),
                            !!o.done)
                            return [3, 4];
                        if (a = o.value,
                            t.next(a),
                            t.closed)
                            return [2];
                        p.label = 3;
                    case 3:
                        return [3, 1];
                    case 4:
                        return [3, 11];
                    case 5:
                        return s = p.sent(),
                            n = {
                                error: s
                            },
                            [3, 11];
                    case 6:
                        return p.trys.push([6, , 9, 10]),
                            o && !o.done && (i = r.return) ? [4, i.call(r)] : [3, 8];
                    case 7:
                        p.sent(),
                            p.label = 8;
                    case 8:
                        return [3, 10];
                    case 9:
                        if (n)
                            throw n.error;
                        return [7];
                    case 10:
                        return [7];
                    case 11:
                        return t.complete(),
                            [2]
                }
            })
        })
    }
    function we(e, t, r, o, n) {
        o === void 0 && (o = 0),
            n === void 0 && (n = !1);
        var i = t.schedule(function () {
            r(),
                n ? e.add(this.schedule(null, o)) : this.unsubscribe()
        }, o);
        if (e.add(i),
            !n)
            return i
    }
    function ve(e, t) {
        return t === void 0 && (t = 0),
            E(function (r, o) {
                r.subscribe(T(o, function (n) {
                    return we(o, e, function () {
                        return o.next(n)
                    }, t)
                }, function () {
                    return we(o, e, function () {
                        return o.complete()
                    }, t)
                }, function (n) {
                    return we(o, e, function () {
                        return o.error(n)
                    }, t)
                }))
            })
    }
    function Ke(e, t) {
        return t === void 0 && (t = 0),
            E(function (r, o) {
                o.add(e.schedule(function () {
                    return r.subscribe(o)
                }, t))
            })
    }
    function Co(e, t) {
        return U(e).pipe(Ke(t), ve(t))
    }
    function ko(e, t) {
        return U(e).pipe(Ke(t), ve(t))
    }
    function Ho(e, t) {
        return new j(function (r) {
            var o = 0;
            return t.schedule(function () {
                o === e.length ? r.complete() : (r.next(e[o++]),
                    r.closed || this.schedule())
            })
        }
        )
    }
    function $o(e, t) {
        return new j(function (r) {
            var o;
            return we(r, t, function () {
                o = e[Zt](),
                    we(r, t, function () {
                        var n, i, a;
                        try {
                            n = o.next(),
                                i = n.value,
                                a = n.done
                        } catch (s) {
                            r.error(s);
                            return
                        }
                        a ? r.complete() : r.next(i)
                    }, 0, !0)
            }),
                function () {
                    return H(o == null ? void 0 : o.return) && o.return()
                }
        }
        )
    }
    function or(e, t) {
        if (!e)
            throw new Error("Iterable cannot be null");
        return new j(function (r) {
            we(r, t, function () {
                var o = e[Symbol.asyncIterator]();
                we(r, t, function () {
                    o.next().then(function (n) {
                        n.done ? r.complete() : r.next(n.value)
                    })
                }, 0, !0)
            })
        }
        )
    }
    function Po(e, t) {
        return or(tr(e), t)
    }
    function Ro(e, t) {
        if (e != null) {
            if (Gt(e))
                return Co(e, t);
            if (xt(e))
                return Ho(e, t);
            if (Bt(e))
                return ko(e, t);
            if (Jt(e))
                return or(e, t);
            if (er(e))
                return $o(e, t);
            if (rr(e))
                return Po(e, t)
        }
        throw Xt(e)
    }
    function ue(e, t) {
        return t ? Ro(e, t) : U(e)
    }
    function I() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = ke(e);
        return ue(e, r)
    }
    function $r(e, t) {
        var r = H(e) ? e : function () {
            return e
        }
            , o = function (n) {
                return n.error(r())
            };
        return new j(t ? function (n) {
            return t.schedule(o, 0, n)
        }
            : o)
    }
    var nr = ut(function (e) {
        return function () {
            e(this),
                this.name = "EmptyError",
                this.message = "no elements in sequence"
        }
    });
    function Io(e) {
        return e instanceof Date && !isNaN(e)
    }
    function m(e, t) {
        return E(function (r, o) {
            var n = 0;
            r.subscribe(T(o, function (i) {
                o.next(e.call(t, i, n++))
            }))
        })
    }
    var aa = Array.isArray;
    function sa(e, t) {
        return aa(t) ? e.apply(void 0, q([], z(t))) : e(t)
    }
    function Ze(e) {
        return m(function (t) {
            return sa(e, t)
        })
    }
    var ca = Array.isArray
        , pa = Object.getPrototypeOf
        , la = Object.prototype
        , ma = Object.keys;
    function jo(e) {
        if (e.length === 1) {
            var t = e[0];
            if (ca(t))
                return {
                    args: t,
                    keys: null
                };
            if (fa(t)) {
                var r = ma(t);
                return {
                    args: r.map(function (o) {
                        return t[o]
                    }),
                    keys: r
                }
            }
        }
        return {
            args: e,
            keys: null
        }
    }
    function fa(e) {
        return e && typeof e == "object" && pa(e) === la
    }
    function Fo(e, t) {
        return e.reduce(function (r, o, n) {
            return r[o] = t[n],
                r
        }, {})
    }
    function N() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = ke(e)
            , o = Xe(e)
            , n = jo(e)
            , i = n.args
            , a = n.keys;
        if (i.length === 0)
            return ue([], r);
        var s = new j(Pr(i, r, a ? function (p) {
            return Fo(a, p)
        }
            : le));
        return o ? s.pipe(Ze(o)) : s
    }
    function Pr(e, t, r) {
        return r === void 0 && (r = le),
            function (o) {
                Uo(t, function () {
                    for (var n = e.length, i = new Array(n), a = n, s = n, p = function (l) {
                        Uo(t, function () {
                            var f = ue(e[l], t)
                                , u = !1;
                            f.subscribe(T(o, function (d) {
                                i[l] = d,
                                    u || (u = !0,
                                        s--),
                                    s || o.next(r(i.slice()))
                            }, function () {
                                --a || o.complete()
                            }))
                        }, o)
                    }, c = 0; c < n; c++)
                        p(c)
                }, o)
            }
    }
    function Uo(e, t, r) {
        e ? we(r, e, t) : t()
    }
    function Wo(e, t, r, o, n, i, a, s) {
        var p = []
            , c = 0
            , l = 0
            , f = !1
            , u = function () {
                f && !p.length && !c && t.complete()
            }
            , d = function (L) {
                return c < o ? y(L) : p.push(L)
            }
            , y = function (L) {
                i && t.next(L),
                    c++;
                var X = !1;
                U(r(L, l++)).subscribe(T(t, function (ee) {
                    n == null || n(ee),
                        i ? d(ee) : t.next(ee)
                }, function () {
                    X = !0
                }, void 0, function () {
                    if (X)
                        try {
                            c--;
                            for (var ee = function () {
                                var J = p.shift();
                                a ? we(t, a, function () {
                                    return y(J)
                                }) : y(J)
                            }; p.length && c < o;)
                                ee();
                            u()
                        } catch (J) {
                            t.error(J)
                        }
                }))
            };
        return e.subscribe(T(t, d, function () {
            f = !0,
                u()
        })),
            function () {
                s == null || s()
            }
    }
    function ne(e, t, r) {
        return r === void 0 && (r = 1 / 0),
            H(t) ? ne(function (o, n) {
                return m(function (i, a) {
                    return t(o, i, n, a)
                })(U(e(o, n)))
            }, r) : (typeof t == "number" && (r = t),
                E(function (o, n) {
                    return Wo(o, n, e, r)
                }))
    }
    function Et(e) {
        return e === void 0 && (e = 1 / 0),
            ne(le, e)
    }
    function Vo() {
        return Et(1)
    }
    function We() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return Vo()(ue(e, ke(e)))
    }
    function C(e) {
        return new j(function (t) {
            U(e()).subscribe(t)
        }
        )
    }
    var ua = ["addListener", "removeListener"]
        , da = ["addEventListener", "removeEventListener"]
        , ha = ["on", "off"];
    function h(e, t, r, o) {
        if (H(r) && (o = r,
            r = void 0),
            o)
            return h(e, t, r).pipe(Ze(o));
        var n = z(ga(e) ? da.map(function (s) {
            return function (p) {
                return e[s](t, p, r)
            }
        }) : ba(e) ? ua.map(Do(e, t)) : va(e) ? ha.map(Do(e, t)) : [], 2)
            , i = n[0]
            , a = n[1];
        if (!i && xt(e))
            return ne(function (s) {
                return h(s, t, r)
            })(U(e));
        if (!i)
            throw new TypeError("Invalid event target");
        return new j(function (s) {
            var p = function () {
                for (var c = [], l = 0; l < arguments.length; l++)
                    c[l] = arguments[l];
                return s.next(1 < c.length ? c : c[0])
            };
            return i(p),
                function () {
                    return a(p)
                }
        }
        )
    }
    function Do(e, t) {
        return function (r) {
            return function (o) {
                return e[r](t, o)
            }
        }
    }
    function ba(e) {
        return H(e.addListener) && H(e.removeListener)
    }
    function va(e) {
        return H(e.on) && H(e.off)
    }
    function ga(e) {
        return H(e.addEventListener) && H(e.removeEventListener)
    }
    function ir(e, t, r) {
        return r ? ir(e, t).pipe(Ze(r)) : new j(function (o) {
            var n = function () {
                for (var a = [], s = 0; s < arguments.length; s++)
                    a[s] = arguments[s];
                return o.next(a.length === 1 ? a[0] : a)
            }
                , i = e(n);
            return H(t) ? function () {
                return t(n, i)
            }
                : void 0
        }
        )
    }
    function Le(e, t, r) {
        e === void 0 && (e = 0),
            r === void 0 && (r = Cr);
        var o = -1;
        return t != null && (Kt(t) ? r = t : o = t),
            new j(function (n) {
                var i = Io(e) ? +e - r.now() : e;
                i < 0 && (i = 0);
                var a = 0;
                return r.schedule(function () {
                    n.closed || (n.next(a++),
                        0 <= o ? this.schedule(void 0, o) : n.complete())
                }, i)
            }
            )
    }
    function O() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = ke(e)
            , o = Yt(e, 1 / 0)
            , n = e;
        return n.length ? n.length === 1 ? U(n[0]) : Et(o)(ue(n, r)) : S
    }
    var Ye = new j(be);
    var ya = Array.isArray;
    function ar(e) {
        return e.length === 1 && ya(e[0]) ? e[0] : e
    }
    function b(e, t) {
        return E(function (r, o) {
            var n = 0;
            r.subscribe(T(o, function (i) {
                return e.call(t, i, n++) && o.next(i)
            }))
        })
    }
    function st() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = Xe(e)
            , o = ar(e);
        return o.length ? new j(function (n) {
            var i = o.map(function () {
                return []
            })
                , a = o.map(function () {
                    return !1
                });
            n.add(function () {
                i = a = null
            });
            for (var s = function (c) {
                U(o[c]).subscribe(T(n, function (l) {
                    if (i[c].push(l),
                        i.every(function (u) {
                            return u.length
                        })) {
                        var f = i.map(function (u) {
                            return u.shift()
                        });
                        n.next(r ? r.apply(void 0, q([], z(f))) : f),
                            i.some(function (u, d) {
                                return !u.length && a[d]
                            }) && n.complete()
                    }
                }, function () {
                    a[c] = !0,
                        !i[c].length && n.complete()
                }))
            }, p = 0; !n.closed && p < o.length; p++)
                s(p);
            return function () {
                i = a = null
            }
        }
        ) : S
    }
    function zo(e) {
        return E(function (t, r) {
            var o = !1
                , n = null
                , i = null
                , a = !1
                , s = function () {
                    if (i == null || i.unsubscribe(),
                        i = null,
                        o) {
                        o = !1;
                        var c = n;
                        n = null,
                            r.next(c)
                    }
                    a && r.complete()
                }
                , p = function () {
                    i = null,
                        a && r.complete()
                };
            t.subscribe(T(r, function (c) {
                o = !0,
                    n = c,
                    i || U(e(c)).subscribe(i = T(r, s, p))
            }, function () {
                a = !0,
                    (!o || !i || i.closed) && r.complete()
            }))
        })
    }
    function Me(e, t) {
        return t === void 0 && (t = se),
            zo(function () {
                return Le(e, t)
            })
    }
    function Be(e, t) {
        return t === void 0 && (t = null),
            t = t != null ? t : e,
            E(function (r, o) {
                var n = []
                    , i = 0;
                r.subscribe(T(o, function (a) {
                    var s, p, c, l, f = null;
                    i++ % t === 0 && n.push([]);
                    try {
                        for (var u = he(n), d = u.next(); !d.done; d = u.next()) {
                            var y = d.value;
                            y.push(a),
                                e <= y.length && (f = f != null ? f : [],
                                    f.push(y))
                        }
                    } catch (ee) {
                        s = {
                            error: ee
                        }
                    } finally {
                        try {
                            d && !d.done && (p = u.return) && p.call(u)
                        } finally {
                            if (s)
                                throw s.error
                        }
                    }
                    if (f)
                        try {
                            for (var L = he(f), X = L.next(); !X.done; X = L.next()) {
                                var y = X.value;
                                Qe(n, y),
                                    o.next(y)
                            }
                        } catch (ee) {
                            c = {
                                error: ee
                            }
                        } finally {
                            try {
                                X && !X.done && (l = L.return) && l.call(L)
                            } finally {
                                if (c)
                                    throw c.error
                            }
                        }
                }, function () {
                    var a, s;
                    try {
                        for (var p = he(n), c = p.next(); !c.done; c = p.next()) {
                            var l = c.value;
                            o.next(l)
                        }
                    } catch (f) {
                        a = {
                            error: f
                        }
                    } finally {
                        try {
                            c && !c.done && (s = p.return) && s.call(p)
                        } finally {
                            if (a)
                                throw a.error
                        }
                    }
                    o.complete()
                }, void 0, function () {
                    n = null
                }))
            })
    }
    function de(e) {
        return E(function (t, r) {
            var o = null, n = !1, i;
            o = t.subscribe(T(r, void 0, void 0, function (a) {
                i = U(e(a, de(e)(t))),
                    o ? (o.unsubscribe(),
                        o = null,
                        i.subscribe(r)) : n = !0
            })),
                n && (o.unsubscribe(),
                    o = null,
                    i.subscribe(r))
        })
    }
    function No(e, t, r, o, n) {
        return function (i, a) {
            var s = r
                , p = t
                , c = 0;
            i.subscribe(T(a, function (l) {
                var f = c++;
                p = s ? e(p, l, f) : (s = !0,
                    l),
                    o && a.next(p)
            }, n && function () {
                s && a.next(p),
                    a.complete()
            }
            ))
        }
    }
    function Rr() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = Xe(e);
        return r ? xo(Rr.apply(void 0, q([], z(e))), Ze(r)) : E(function (o, n) {
            Pr(q([o], z(ar(e))))(n)
        })
    }
    function He() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return Rr.apply(void 0, q([], z(e)))
    }
    function kt(e) {
        return E(function (t, r) {
            var o = !1
                , n = null
                , i = null
                , a = function () {
                    if (i == null || i.unsubscribe(),
                        i = null,
                        o) {
                        o = !1;
                        var s = n;
                        n = null,
                            r.next(s)
                    }
                };
            t.subscribe(T(r, function (s) {
                i == null || i.unsubscribe(),
                    o = !0,
                    n = s,
                    i = T(r, a, be),
                    U(e(s)).subscribe(i)
            }, function () {
                a(),
                    r.complete()
            }, void 0, function () {
                n = i = null
            }))
        })
    }
    function _e(e, t) {
        return t === void 0 && (t = se),
            E(function (r, o) {
                var n = null
                    , i = null
                    , a = null
                    , s = function () {
                        if (n) {
                            n.unsubscribe(),
                                n = null;
                            var c = i;
                            i = null,
                                o.next(c)
                        }
                    };
                function p() {
                    var c = a + e
                        , l = t.now();
                    if (l < c) {
                        n = this.schedule(void 0, c - l),
                            o.add(n);
                        return
                    }
                    s()
                }
                r.subscribe(T(o, function (c) {
                    i = c,
                        a = t.now(),
                        n || (n = t.schedule(p, e),
                            o.add(n))
                }, function () {
                    s(),
                        o.complete()
                }, void 0, function () {
                    i = n = null
                }))
            })
    }
    function Ve(e) {
        return E(function (t, r) {
            var o = !1;
            t.subscribe(T(r, function (n) {
                o = !0,
                    r.next(n)
            }, function () {
                o || r.next(e),
                    r.complete()
            }))
        })
    }
    function Te(e) {
        return e <= 0 ? function () {
            return S
        }
            : E(function (t, r) {
                var o = 0;
                t.subscribe(T(r, function (n) {
                    ++o <= e && (r.next(n),
                        e <= o && r.complete())
                }))
            })
    }
    function Z() {
        return E(function (e, t) {
            e.subscribe(T(t, be))
        })
    }
    function qo(e) {
        return m(function () {
            return e
        })
    }
    function Ir(e, t) {
        return t ? function (r) {
            return We(t.pipe(Te(1), Z()), r.pipe(Ir(e)))
        }
            : ne(function (r, o) {
                return U(e(r, o)).pipe(Te(1), qo(r))
            })
    }
    function Ge(e, t) {
        t === void 0 && (t = se);
        var r = Le(e, t);
        return Ir(function () {
            return r
        })
    }
    function K(e, t) {
        return t === void 0 && (t = le),
            e = e != null ? e : xa,
            E(function (r, o) {
                var n, i = !0;
                r.subscribe(T(o, function (a) {
                    var s = t(a);
                    (i || !e(n, s)) && (i = !1,
                        n = s,
                        o.next(a))
                }))
            })
    }
    function xa(e, t) {
        return e === t
    }
    function te(e, t) {
        return K(function (r, o) {
            return t ? t(r[e], o[e]) : r[e] === o[e]
        })
    }
    function Qo(e) {
        return e === void 0 && (e = Ea),
            E(function (t, r) {
                var o = !1;
                t.subscribe(T(r, function (n) {
                    o = !0,
                        r.next(n)
                }, function () {
                    return o ? r.complete() : r.error(e())
                }))
            })
    }
    function Ea() {
        return new nr
    }
    function ie() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return function (r) {
            return We(r, I.apply(void 0, q([], z(e))))
        }
    }
    function _(e) {
        return E(function (t, r) {
            try {
                t.subscribe(r)
            } finally {
                r.add(e)
            }
        })
    }
    function Ae(e, t) {
        var r = arguments.length >= 2;
        return function (o) {
            return o.pipe(e ? b(function (n, i) {
                return e(n, i, o)
            }) : le, Te(1), r ? Ve(t) : Qo(function () {
                return new nr
            }))
        }
    }
    function jr(e) {
        return e <= 0 ? function () {
            return S
        }
            : E(function (t, r) {
                var o = [];
                t.subscribe(T(r, function (n) {
                    o.push(n),
                        e < o.length && o.shift()
                }, function () {
                    var n, i;
                    try {
                        for (var a = he(o), s = a.next(); !s.done; s = a.next()) {
                            var p = s.value;
                            r.next(p)
                        }
                    } catch (c) {
                        n = {
                            error: c
                        }
                    } finally {
                        try {
                            s && !s.done && (i = a.return) && i.call(a)
                        } finally {
                            if (n)
                                throw n.error
                        }
                    }
                    r.complete()
                }, void 0, function () {
                    o = null
                }))
            })
    }
    function Ko() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = ke(e)
            , o = Yt(e, 1 / 0);
        return E(function (n, i) {
            Et(o)(ue(q([n], z(e)), r)).subscribe(i)
        })
    }
    function Re() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return Ko.apply(void 0, q([], z(e)))
    }
    function ct(e) {
        var t, r = 1 / 0, o;
        return e != null && (typeof e == "object" ? (t = e.count,
            r = t === void 0 ? 1 / 0 : t,
            o = e.delay) : r = e),
            r <= 0 ? function () {
                return S
            }
                : E(function (n, i) {
                    var a = 0, s, p = function () {
                        if (s == null || s.unsubscribe(),
                            s = null,
                            o != null) {
                            var l = typeof o == "number" ? Le(o) : U(o(a))
                                , f = T(i, function () {
                                    f.unsubscribe(),
                                        c()
                                });
                            l.subscribe(f)
                        } else
                            c()
                    }, c = function () {
                        var l = !1;
                        s = n.subscribe(T(i, void 0, function () {
                            ++a < r ? s ? p() : l = !0 : i.complete()
                        })),
                            l && p()
                    };
                    c()
                })
    }
    function Fr(e, t) {
        return E(No(e, t, arguments.length >= 2, !0))
    }
    function pe(e) {
        e === void 0 && (e = {});
        var t = e.connector
            , r = t === void 0 ? function () {
                return new g
            }
                : t
            , o = e.resetOnError
            , n = o === void 0 ? !0 : o
            , i = e.resetOnComplete
            , a = i === void 0 ? !0 : i
            , s = e.resetOnRefCountZero
            , p = s === void 0 ? !0 : s;
        return function (c) {
            var l, f, u, d = 0, y = !1, L = !1, X = function () {
                f == null || f.unsubscribe(),
                    f = void 0
            }, ee = function () {
                X(),
                    l = u = void 0,
                    y = L = !1
            }, J = function () {
                var k = l;
                ee(),
                    k == null || k.unsubscribe()
            };
            return E(function (k, ft) {
                d++,
                    !L && !y && X();
                var qe = u = u != null ? u : r();
                ft.add(function () {
                    d--,
                        d === 0 && !L && !y && (f = Ur(J, p))
                }),
                    qe.subscribe(ft),
                    !l && d > 0 && (l = new at({
                        next: function (Fe) {
                            return qe.next(Fe)
                        },
                        error: function (Fe) {
                            L = !0,
                                X(),
                                f = Ur(ee, n, Fe),
                                qe.error(Fe)
                        },
                        complete: function () {
                            y = !0,
                                X(),
                                f = Ur(ee, a),
                                qe.complete()
                        }
                    }),
                        U(k).subscribe(l))
            })(c)
        }
    }
    function Ur(e, t) {
        for (var r = [], o = 2; o < arguments.length; o++)
            r[o - 2] = arguments[o];
        if (t === !0) {
            e();
            return
        }
        if (t !== !1) {
            var n = new at({
                next: function () {
                    n.unsubscribe(),
                        e()
                }
            });
            return U(t.apply(void 0, q([], z(r)))).subscribe(n)
        }
    }
    function G(e, t, r) {
        var o, n, i, a, s = !1;
        return e && typeof e == "object" ? (o = e.bufferSize,
            a = o === void 0 ? 1 / 0 : o,
            n = e.windowTime,
            t = n === void 0 ? 1 / 0 : n,
            i = e.refCount,
            s = i === void 0 ? !1 : i,
            r = e.scheduler) : a = e != null ? e : 1 / 0,
            pe({
                connector: function () {
                    return new At(a, t, r)
                },
                resetOnError: !0,
                resetOnComplete: !1,
                resetOnRefCountZero: s
            })
    }
    function Ce(e) {
        return b(function (t, r) {
            return e <= r
        })
    }
    function Wr(e) {
        return E(function (t, r) {
            var o = !1
                , n = T(r, function () {
                    n == null || n.unsubscribe(),
                        o = !0
                }, be);
            U(e).subscribe(n),
                t.subscribe(T(r, function (i) {
                    return o && r.next(i)
                }))
        })
    }
    function Q() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = ke(e);
        return E(function (o, n) {
            (r ? We(e, o, r) : We(e, o)).subscribe(n)
        })
    }
    function v(e, t) {
        return E(function (r, o) {
            var n = null
                , i = 0
                , a = !1
                , s = function () {
                    return a && !n && o.complete()
                };
            r.subscribe(T(o, function (p) {
                n == null || n.unsubscribe();
                var c = 0
                    , l = i++;
                U(e(p, l)).subscribe(n = T(o, function (f) {
                    return o.next(t ? t(p, f, l, c++) : f)
                }, function () {
                    n = null,
                        s()
                }))
            }, function () {
                a = !0,
                    s()
            }))
        })
    }
    function W(e) {
        return E(function (t, r) {
            U(e).subscribe(T(r, function () {
                return r.complete()
            }, be)),
                !r.closed && t.subscribe(r)
        })
    }
    function Vr(e, t) {
        return t === void 0 && (t = !1),
            E(function (r, o) {
                var n = 0;
                r.subscribe(T(o, function (i) {
                    var a = e(i, n++);
                    (a || t) && o.next(i),
                        !a && o.complete()
                }))
            })
    }
    function w(e, t, r) {
        var o = H(e) || t || r ? {
            next: e,
            error: t,
            complete: r
        } : e;
        return o ? E(function (n, i) {
            var a;
            (a = o.subscribe) === null || a === void 0 || a.call(o);
            var s = !0;
            n.subscribe(T(i, function (p) {
                var c;
                (c = o.next) === null || c === void 0 || c.call(o, p),
                    i.next(p)
            }, function () {
                var p;
                s = !1,
                    (p = o.complete) === null || p === void 0 || p.call(o),
                    i.complete()
            }, function (p) {
                var c;
                s = !1,
                    (c = o.error) === null || c === void 0 || c.call(o, p),
                    i.error(p)
            }, function () {
                var p, c;
                s && ((p = o.unsubscribe) === null || p === void 0 || p.call(o)),
                    (c = o.finalize) === null || c === void 0 || c.call(o)
            }))
        }) : le
    }
    function Yo(e, t) {
        return E(function (r, o) {
            var n = t != null ? t : {}
                , i = n.leading
                , a = i === void 0 ? !0 : i
                , s = n.trailing
                , p = s === void 0 ? !1 : s
                , c = !1
                , l = null
                , f = null
                , u = !1
                , d = function () {
                    f == null || f.unsubscribe(),
                        f = null,
                        p && (X(),
                            u && o.complete())
                }
                , y = function () {
                    f = null,
                        u && o.complete()
                }
                , L = function (ee) {
                    return f = U(e(ee)).subscribe(T(o, d, y))
                }
                , X = function () {
                    if (c) {
                        c = !1;
                        var ee = l;
                        l = null,
                            o.next(ee),
                            !u && L(ee)
                    }
                };
            r.subscribe(T(o, function (ee) {
                c = !0,
                    l = ee,
                    !(f && !f.closed) && (a ? X() : L(ee))
            }, function () {
                u = !0,
                    !(p && c && f && !f.closed) && o.complete()
            }))
        })
    }
    function pt(e, t, r) {
        t === void 0 && (t = se);
        var o = Le(e, t);
        return Yo(function () {
            return o
        }, r)
    }
    function re() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        var r = Xe(e);
        return E(function (o, n) {
            for (var i = e.length, a = new Array(i), s = e.map(function () {
                return !1
            }), p = !1, c = function (f) {
                U(e[f]).subscribe(T(n, function (u) {
                    a[f] = u,
                        !p && !s[f] && (s[f] = !0,
                            (p = s.every(le)) && (s = null))
                }, be))
            }, l = 0; l < i; l++)
                c(l);
            o.subscribe(T(n, function (f) {
                if (p) {
                    var u = q([f], z(a));
                    n.next(r ? r.apply(void 0, q([], z(u))) : u)
                }
            }))
        })
    }
    function Bo() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return E(function (r, o) {
            st.apply(void 0, q([r], z(e))).subscribe(o)
        })
    }
    function Dr() {
        for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t];
        return Bo.apply(void 0, q([], z(e)))
    }
    function Go() {
        let e = new At(1);
        return h(document, "DOMContentLoaded", {
            once: !0
        }).subscribe(() => e.next(document)),
            e
    }
    function P(e, t = document) {
        return Array.from(t.querySelectorAll(e))
    }
    function R(e, t = document) {
        let r = fe(e, t);
        if (typeof r == "undefined")
            throw new ReferenceError(`Missing element: expected "${e}" to be present`);
        return r
    }
    function fe(e, t = document) {
        return t.querySelector(e) || void 0
    }
    function Ie() {
        var e, t, r, o;
        return (o = (r = (t = (e = document.activeElement) == null ? void 0 : e.shadowRoot) == null ? void 0 : t.activeElement) != null ? r : document.activeElement) != null ? o : void 0
    }
    var wa = O(h(document.body, "focusin"), h(document.body, "focusout")).pipe(_e(1), Q(void 0), m(() => Ie() || document.body), G(1));
    function et(e) {
        return wa.pipe(m(t => e.contains(t)), K())
    }
    function Ht(e, t) {
        return C(() => O(h(e, "mouseenter").pipe(m(() => !0)), h(e, "mouseleave").pipe(m(() => !1))).pipe(t ? kt(r => Le(+!r * t)) : le, Q(e.matches(":hover"))))
    }
    function Jo(e, t) {
        if (typeof t == "string" || typeof t == "number")
            e.innerHTML += t.toString();
        else if (t instanceof Node)
            e.appendChild(t);
        else if (Array.isArray(t))
            for (let r of t)
                Jo(e, r)
    }
    function x(e, t, ...r) {
        let o = document.createElement(e);
        if (t)
            for (let n of Object.keys(t))
                typeof t[n] != "undefined" && (typeof t[n] != "boolean" ? o.setAttribute(n, t[n]) : o.setAttribute(n, ""));
        for (let n of r)
            Jo(o, n);
        return o
    }
    function sr(e) {
        if (e > 999) {
            let t = +((e - 950) % 1e3 > 99);
            return `${((e + 1e-6) / 1e3).toFixed(t)}k`
        } else
            return e.toString()
    }
    function wt(e) {
        let t = x("script", {
            src: e
        });
        return C(() => (document.head.appendChild(t),
            O(h(t, "load"), h(t, "error").pipe(v(() => $r(() => new ReferenceError(`Invalid script: ${e}`))))).pipe(m(() => { }
            ), _(() => document.head.removeChild(t)), Te(1))))
    }
    var Xo = new g
        , Ta = C(() => typeof ResizeObserver == "undefined" ? wt("https://unpkg.com/resize-observer-polyfill") : I(void 0)).pipe(m(() => new ResizeObserver(e => e.forEach(t => Xo.next(t)))), v(e => O(Ye, I(e)).pipe(_(() => e.disconnect()))), G(1));
    function ce(e) {
        return {
            width: e.offsetWidth,
            height: e.offsetHeight
        }
    }
    function ge(e) {
        let t = e;
        for (; t.clientWidth === 0 && t.parentElement;)
            t = t.parentElement;
        return Ta.pipe(w(r => r.observe(t)), v(r => Xo.pipe(b(o => o.target === t), _(() => r.unobserve(t)))), m(() => ce(e)), Q(ce(e)))
    }
    function Tt(e) {
        return {
            width: e.scrollWidth,
            height: e.scrollHeight
        }
    }
    function cr(e) {
        let t = e.parentElement;
        for (; t && (e.scrollWidth <= t.scrollWidth && e.scrollHeight <= t.scrollHeight);)
            t = (e = t).parentElement;
        return t ? e : void 0
    }
    function Zo(e) {
        let t = []
            , r = e.parentElement;
        for (; r;)
            (e.clientWidth > r.clientWidth || e.clientHeight > r.clientHeight) && t.push(r),
                r = (e = r).parentElement;
        return t.length === 0 && t.push(document.documentElement),
            t
    }
    function De(e) {
        return {
            x: e.offsetLeft,
            y: e.offsetTop
        }
    }
    function en(e) {
        let t = e.getBoundingClientRect();
        return {
            x: t.x + window.scrollX,
            y: t.y + window.scrollY
        }
    }
    function tn(e) {
        return O(h(window, "load"), h(window, "resize")).pipe(Me(0, me), m(() => De(e)), Q(De(e)))
    }
    function pr(e) {
        return {
            x: e.scrollLeft,
            y: e.scrollTop
        }
    }
    function ze(e) {
        return O(h(e, "scroll"), h(window, "scroll"), h(window, "resize")).pipe(Me(0, me), m(() => pr(e)), Q(pr(e)))
    }
    var rn = new g
        , Sa = C(() => I(new IntersectionObserver(e => {
            for (let t of e)
                rn.next(t)
        }
            , {
                threshold: 0
            }))).pipe(v(e => O(Ye, I(e)).pipe(_(() => e.disconnect()))), G(1));
    function tt(e) {
        return Sa.pipe(w(t => t.observe(e)), v(t => rn.pipe(b(({ target: r }) => r === e), _(() => t.unobserve(e)), m(({ isIntersecting: r }) => r))))
    }
    function on(e, t = 16) {
        return ze(e).pipe(m(({ y: r }) => {
            let o = ce(e)
                , n = Tt(e);
            return r >= n.height - o.height - t
        }
        ), K())
    }
    var lr = {
        drawer: R("[data-md-toggle=drawer]"),
        search: R("[data-md-toggle=search]")
    };
    function nn(e) {
        return lr[e].checked
    }
    function Je(e, t) {
        lr[e].checked !== t && lr[e].click()
    }
    function Ne(e) {
        let t = lr[e];
        return h(t, "change").pipe(m(() => t.checked), Q(t.checked))
    }
    function Oa(e, t) {
        switch (e.constructor) {
            case HTMLInputElement:
                return e.type === "radio" ? /^Arrow/.test(t) : !0;
            case HTMLSelectElement:
            case HTMLTextAreaElement:
                return !0;
            default:
                return e.isContentEditable
        }
    }
    function La() {
        return O(h(window, "compositionstart").pipe(m(() => !0)), h(window, "compositionend").pipe(m(() => !1))).pipe(Q(!1))
    }
    function an() {
        let e = h(window, "keydown").pipe(b(t => !(t.metaKey || t.ctrlKey)), m(t => ({
            mode: nn("search") ? "search" : "global",
            type: t.key,
            claim() {
                t.preventDefault(),
                    t.stopPropagation()
            }
        })), b(({ mode: t, type: r }) => {
            if (t === "global") {
                let o = Ie();
                if (typeof o != "undefined")
                    return !Oa(o, r)
            }
            return !0
        }
        ), pe());
        return La().pipe(v(t => t ? S : e))
    }
    function ye() {
        return new URL(location.href)
    }
    function lt(e, t = !1) {
        if (B("navigation.instant") && !t) {
            let r = x("a", {
                href: e.href
            });
            document.body.appendChild(r),
                r.click(),
                r.remove()
        } else
            location.href = e.href
    }
    function sn() {
        return new g
    }
    function cn() {
        return location.hash.slice(1)
    }
    function pn(e) {
        let t = x("a", {
            href: e
        });
        t.addEventListener("click", r => r.stopPropagation()),
            t.click()
    }
    function Ma(e) {
        return O(h(window, "hashchange"), e).pipe(m(cn), Q(cn()), b(t => t.length > 0), G(1))
    }
    function ln(e) {
        return Ma(e).pipe(m(t => fe(`[id="${t}"]`)), b(t => typeof t != "undefined"))
    }
    function $t(e) {
        let t = matchMedia(e);
        return ir(r => t.addListener(() => r(t.matches))).pipe(Q(t.matches))
    }
    function mn() {
        let e = matchMedia("print");
        return O(h(window, "beforeprint").pipe(m(() => !0)), h(window, "afterprint").pipe(m(() => !1))).pipe(Q(e.matches))
    }
    function zr(e, t) {
        return e.pipe(v(r => r ? t() : S))
    }
    function Nr(e, t) {
        return new j(r => {
            let o = new XMLHttpRequest;
            return o.open("GET", `${e}`),
                o.responseType = "blob",
                o.addEventListener("load", () => {
                    o.status >= 200 && o.status < 300 ? (r.next(o.response),
                        r.complete()) : r.error(new Error(o.statusText))
                }
                ),
                o.addEventListener("error", () => {
                    r.error(new Error("Network error"))
                }
                ),
                o.addEventListener("abort", () => {
                    r.complete()
                }
                ),
                typeof (t == null ? void 0 : t.progress$) != "undefined" && (o.addEventListener("progress", n => {
                    var i;
                    if (n.lengthComputable)
                        t.progress$.next(n.loaded / n.total * 100);
                    else {
                        let a = (i = o.getResponseHeader("Content-Length")) != null ? i : 0;
                        t.progress$.next(n.loaded / +a * 100)
                    }
                }
                ),
                    t.progress$.next(5)),
                o.send(),
                () => o.abort()
        }
        )
    }
    function je(e, t) {
        return Nr(e, t).pipe(v(r => r.text()), m(r => JSON.parse(r)), G(1))
    }
    function fn(e, t) {
        let r = new DOMParser;
        return Nr(e, t).pipe(v(o => o.text()), m(o => r.parseFromString(o, "text/html")), G(1))
    }
    function un(e, t) {
        let r = new DOMParser;
        return Nr(e, t).pipe(v(o => o.text()), m(o => r.parseFromString(o, "text/xml")), G(1))
    }
    function dn() {
        return {
            x: Math.max(0, scrollX),
            y: Math.max(0, scrollY)
        }
    }
    function hn() {
        return O(h(window, "scroll", {
            passive: !0
        }), h(window, "resize", {
            passive: !0
        })).pipe(m(dn), Q(dn()))
    }
    function bn() {
        return {
            width: innerWidth,
            height: innerHeight
        }
    }
    function vn() {
        return h(window, "resize", {
            passive: !0
        }).pipe(m(bn), Q(bn()))
    }
    function gn() {
        return N([hn(), vn()]).pipe(m(([e, t]) => ({
            offset: e,
            size: t
        })), G(1))
    }
    function mr(e, { viewport$: t, header$: r }) {
        let o = t.pipe(te("size"))
            , n = N([o, r]).pipe(m(() => De(e)));
        return N([r, t, n]).pipe(m(([{ height: i }, { offset: a, size: s }, { x: p, y: c }]) => ({
            offset: {
                x: a.x - p,
                y: a.y - c + i
            },
            size: s
        })))
    }
    function _a(e) {
        return h(e, "message", t => t.data)
    }
    function Aa(e) {
        let t = new g;
        return t.subscribe(r => e.postMessage(r)),
            t
    }
    function yn(e, t = new Worker(e)) {
        let r = _a(t)
            , o = Aa(t)
            , n = new g;
        n.subscribe(o);
        let i = o.pipe(Z(), ie(!0));
        return n.pipe(Z(), Re(r.pipe(W(i))), pe())
    }
    var Ca = R("#__config")
        , St = JSON.parse(Ca.textContent);
    St.base = `${new URL(St.base, ye())}`;
    function xe() {
        return St
    }
    function B(e) {
        return St.features.includes(e)
    }
    function Ee(e, t) {
        return typeof t != "undefined" ? St.translations[e].replace("#", t.toString()) : St.translations[e]
    }
    function Se(e, t = document) {
        return R(`[data-md-component=${e}]`, t)
    }
    function ae(e, t = document) {
        return P(`[data-md-component=${e}]`, t)
    }
    function ka(e) {
        let t = R(".md-typeset > :first-child", e);
        return h(t, "click", {
            once: !0
        }).pipe(m(() => R(".md-typeset", e)), m(r => ({
            hash: __md_hash(r.innerHTML)
        })))
    }
    function xn(e) {
        if (!B("announce.dismiss") || !e.childElementCount)
            return S;
        if (!e.hidden) {
            let t = R(".md-typeset", e);
            __md_hash(t.innerHTML) === __md_get("__announce") && (e.hidden = !0)
        }
        return C(() => {
            let t = new g;
            return t.subscribe(({ hash: r }) => {
                e.hidden = !0,
                    __md_set("__announce", r)
            }
            ),
                ka(e).pipe(w(r => t.next(r)), _(() => t.complete()), m(r => $({
                    ref: e
                }, r)))
        }
        )
    }
    function Ha(e, { target$: t }) {
        return t.pipe(m(r => ({
            hidden: r !== e
        })))
    }
    function En(e, t) {
        let r = new g;
        return r.subscribe(({ hidden: o }) => {
            e.hidden = o
        }
        ),
            Ha(e, t).pipe(w(o => r.next(o)), _(() => r.complete()), m(o => $({
                ref: e
            }, o)))
    }
    function Pt(e, t) {
        return t === "inline" ? x("div", {
            class: "md-tooltip md-tooltip--inline",
            id: e,
            role: "tooltip"
        }, x("div", {
            class: "md-tooltip__inner md-typeset"
        })) : x("div", {
            class: "md-tooltip",
            id: e,
            role: "tooltip"
        }, x("div", {
            class: "md-tooltip__inner md-typeset"
        }))
    }
    function wn(...e) {
        return x("div", {
            class: "md-tooltip2",
            role: "tooltip"
        }, x("div", {
            class: "md-tooltip2__inner md-typeset"
        }, e))
    }
    function Tn(e, t) {
        if (t = t ? `${t}_annotation_${e}` : void 0,
            t) {
            let r = t ? `#${t}` : void 0;
            return x("aside", {
                class: "md-annotation",
                tabIndex: 0
            }, Pt(t), x("a", {
                href: r,
                class: "md-annotation__index",
                tabIndex: -1
            }, x("span", {
                "data-md-annotation-id": e
            })))
        } else
            return x("aside", {
                class: "md-annotation",
                tabIndex: 0
            }, Pt(t), x("span", {
                class: "md-annotation__index",
                tabIndex: -1
            }, x("span", {
                "data-md-annotation-id": e
            })))
    }
    function Sn(e) {
        return x("button", {
            class: "md-clipboard md-icon",
            title: Ee("clipboard.copy"),
            "data-clipboard-target": `#${e} > code`
        })
    }
    var Ln = Lt(qr());
    function Qr(e, t) {
        let r = t & 2
            , o = t & 1
            , n = Object.keys(e.terms).filter(p => !e.terms[p]).reduce((p, c) => [...p, x("del", null, (0,
                Ln.default)(c)), " "], []).slice(0, -1)
            , i = xe()
            , a = new URL(e.location, i.base);
        B("search.highlight") && a.searchParams.set("h", Object.entries(e.terms).filter(([, p]) => p).reduce((p, [c]) => `${p} ${c}`.trim(), ""));
        let { tags: s } = xe();
        return x("a", {
            href: `${a}`,
            class: "md-search-result__link",
            tabIndex: -1
        }, x("article", {
            class: "md-search-result__article md-typeset",
            "data-md-score": e.score.toFixed(2)
        }, r > 0 && x("div", {
            class: "md-search-result__icon md-icon"
        }), r > 0 && x("h1", null, e.title), r <= 0 && x("h2", null, e.title), o > 0 && e.text.length > 0 && e.text, e.tags && x("nav", {
            class: "md-tags"
        }, e.tags.map(p => {
            let c = s ? p in s ? `md-tag-icon md-tag--${s[p]}` : "md-tag-icon" : "";
            return x("span", {
                class: `md-tag ${c}`
            }, p)
        }
        )), o > 0 && n.length > 0 && x("p", {
            class: "md-search-result__terms"
        }, Ee("search.result.term.missing"), ": ", ...n)))
    }
    function Mn(e) {
        let t = e[0].score
            , r = [...e]
            , o = xe()
            , n = r.findIndex(l => !`${new URL(l.location, o.base)}`.includes("#"))
            , [i] = r.splice(n, 1)
            , a = r.findIndex(l => l.score < t);
        a === -1 && (a = r.length);
        let s = r.slice(0, a)
            , p = r.slice(a)
            , c = [Qr(i, 2 | +(!n && a === 0)), ...s.map(l => Qr(l, 1)), ...p.length ? [x("details", {
                class: "md-search-result__more"
            }, x("summary", {
                tabIndex: -1
            }, x("div", null, p.length > 0 && p.length === 1 ? Ee("search.result.more.one") : Ee("search.result.more.other", p.length))), ...p.map(l => Qr(l, 1)))] : []];
        return x("li", {
            class: "md-search-result__item"
        }, c)
    }
    /*function _n(e) {
        return x("ul", {
            class: "md-source__facts"
        }, Object.entries(e).map(([t, r]) => x("li", {
            class: `md-source__fact md-source__fact--${t}`
        }, typeof r == "number" ? sr(r) : r)))
    }*/
    function Kr(e) {
        let t = `tabbed-control tabbed-control--${e}`;
        return x("div", {
            class: t,
            hidden: !0
        }, x("button", {
            class: "tabbed-button",
            tabIndex: -1,
            "aria-hidden": "true"
        }))
    }
    function An(e) {
        return x("div", {
            class: "md-typeset__scrollwrap"
        }, x("div", {
            class: "md-typeset__table"
        }, e))
    }
    function Ra(e) {
        var o;
        let t = xe()
            , r = new URL(`../${e.version}/`, t.base);
        return x("li", {
            class: "md-version__item"
        }, x("a", {
            href: `${r}`,
            class: "md-version__link"
        }, e.title, ((o = t.version) == null ? void 0 : o.alias) && e.aliases.length > 0 && x("span", {
            class: "md-version__alias"
        }, e.aliases[0])))
    }
    function Cn(e, t) {
        var o;
        let r = xe();
        return e = e.filter(n => {
            var i;
            return !((i = n.properties) != null && i.hidden)
        }
        ),
            x("div", {
                class: "md-version"
            }, x("button", {
                class: "md-version__current",
                "aria-label": Ee("select.version")
            }, t.title, ((o = r.version) == null ? void 0 : o.alias) && t.aliases.length > 0 && x("span", {
                class: "md-version__alias"
            }, t.aliases[0])), x("ul", {
                class: "md-version__list"
            }, e.map(Ra)))
    }
    var Ia = 0;
    function ja(e) {
        let t = N([et(e), Ht(e)]).pipe(m(([o, n]) => o || n), K())
            , r = C(() => Zo(e)).pipe(ne(ze), pt(1), He(t), m(() => en(e)));
        return t.pipe(Ae(o => o), v(() => N([t, r])), m(([o, n]) => ({
            active: o,
            offset: n
        })), pe())
    }
    function Fa(e, t) {
        let { content$: r, viewport$: o } = t
            , n = `__tooltip2_${Ia++}`;
        return C(() => {
            let i = new g
                , a = new _r(!1);
            i.pipe(Z(), ie(!1)).subscribe(a);
            let s = a.pipe(kt(c => Le(+!c * 250, kr)), K(), v(c => c ? r : S), w(c => c.id = n), pe());
            N([i.pipe(m(({ active: c }) => c)), s.pipe(v(c => Ht(c, 250)), Q(!1))]).pipe(m(c => c.some(l => l))).subscribe(a);
            let p = a.pipe(b(c => c), re(s, o), m(([c, l, { size: f }]) => {
                let u = e.getBoundingClientRect()
                    , d = u.width / 2;
                if (l.role === "tooltip")
                    return {
                        x: d,
                        y: 8 + u.height
                    };
                if (u.y >= f.height / 2) {
                    let { height: y } = ce(l);
                    return {
                        x: d,
                        y: -16 - y
                    }
                } else
                    return {
                        x: d,
                        y: 16 + u.height
                    }
            }
            ));
            return N([s, i, p]).subscribe(([c, { offset: l }, f]) => {
                c.style.setProperty("--md-tooltip-host-x", `${l.x}px`),
                    c.style.setProperty("--md-tooltip-host-y", `${l.y}px`),
                    c.style.setProperty("--md-tooltip-x", `${f.x}px`),
                    c.style.setProperty("--md-tooltip-y", `${f.y}px`),
                    c.classList.toggle("md-tooltip2--top", f.y < 0),
                    c.classList.toggle("md-tooltip2--bottom", f.y >= 0)
            }
            ),
                a.pipe(b(c => c), re(s, (c, l) => l), b(c => c.role === "tooltip")).subscribe(c => {
                    let l = ce(R(":scope > *", c));
                    c.style.setProperty("--md-tooltip-width", `${l.width}px`),
                        c.style.setProperty("--md-tooltip-tail", "0px")
                }
                ),
                a.pipe(K(), ve(me), re(s)).subscribe(([c, l]) => {
                    l.classList.toggle("md-tooltip2--active", c)
                }
                ),
                N([a.pipe(b(c => c)), s]).subscribe(([c, l]) => {
                    l.role === "dialog" ? (e.setAttribute("aria-controls", n),
                        e.setAttribute("aria-haspopup", "dialog")) : e.setAttribute("aria-describedby", n)
                }
                ),
                a.pipe(b(c => !c)).subscribe(() => {
                    e.removeAttribute("aria-controls"),
                        e.removeAttribute("aria-describedby"),
                        e.removeAttribute("aria-haspopup")
                }
                ),
                ja(e).pipe(w(c => i.next(c)), _(() => i.complete()), m(c => $({
                    ref: e
                }, c)))
        }
        )
    }
    function mt(e, { viewport$: t }, r = document.body) {
        return Fa(e, {
            content$: new j(o => {
                let n = e.title
                    , i = wn(n);
                return o.next(i),
                    e.removeAttribute("title"),
                    r.append(i),
                    () => {
                        i.remove(),
                            e.setAttribute("title", n)
                    }
            }
            ),
            viewport$: t
        })
    }
    function Ua(e, t) {
        let r = C(() => N([tn(e), ze(t)])).pipe(m(([{ x: o, y: n }, i]) => {
            let { width: a, height: s } = ce(e);
            return {
                x: o - i.x + a / 2,
                y: n - i.y + s / 2
            }
        }
        ));
        return et(e).pipe(v(o => r.pipe(m(n => ({
            active: o,
            offset: n
        })), Te(+!o || 1 / 0))))
    }
    function kn(e, t, { target$: r }) {
        let [o, n] = Array.from(e.children);
        return C(() => {
            let i = new g
                , a = i.pipe(Z(), ie(!0));
            return i.subscribe({
                next({ offset: s }) {
                    e.style.setProperty("--md-tooltip-x", `${s.x}px`),
                        e.style.setProperty("--md-tooltip-y", `${s.y}px`)
                },
                complete() {
                    e.style.removeProperty("--md-tooltip-x"),
                        e.style.removeProperty("--md-tooltip-y")
                }
            }),
                tt(e).pipe(W(a)).subscribe(s => {
                    e.toggleAttribute("data-md-visible", s)
                }
                ),
                O(i.pipe(b(({ active: s }) => s)), i.pipe(_e(250), b(({ active: s }) => !s))).subscribe({
                    next({ active: s }) {
                        s ? e.prepend(o) : o.remove()
                    },
                    complete() {
                        e.prepend(o)
                    }
                }),
                i.pipe(Me(16, me)).subscribe(({ active: s }) => {
                    o.classList.toggle("md-tooltip--active", s)
                }
                ),
                i.pipe(pt(125, me), b(() => !!e.offsetParent), m(() => e.offsetParent.getBoundingClientRect()), m(({ x: s }) => s)).subscribe({
                    next(s) {
                        s ? e.style.setProperty("--md-tooltip-0", `${-s}px`) : e.style.removeProperty("--md-tooltip-0")
                    },
                    complete() {
                        e.style.removeProperty("--md-tooltip-0")
                    }
                }),
                h(n, "click").pipe(W(a), b(s => !(s.metaKey || s.ctrlKey))).subscribe(s => {
                    s.stopPropagation(),
                        s.preventDefault()
                }
                ),
                h(n, "mousedown").pipe(W(a), re(i)).subscribe(([s, { active: p }]) => {
                    var c;
                    if (s.button !== 0 || s.metaKey || s.ctrlKey)
                        s.preventDefault();
                    else if (p) {
                        s.preventDefault();
                        let l = e.parentElement.closest(".md-annotation");
                        l instanceof HTMLElement ? l.focus() : (c = Ie()) == null || c.blur()
                    }
                }
                ),
                r.pipe(W(a), b(s => s === o), Ge(125)).subscribe(() => e.focus()),
                Ua(e, t).pipe(w(s => i.next(s)), _(() => i.complete()), m(s => $({
                    ref: e
                }, s)))
        }
        )
    }
    function Wa(e) {
        return e.tagName === "CODE" ? P(".c, .c1, .cm", e) : [e]
    }
    function Va(e) {
        let t = [];
        for (let r of Wa(e)) {
            let o = []
                , n = document.createNodeIterator(r, NodeFilter.SHOW_TEXT);
            for (let i = n.nextNode(); i; i = n.nextNode())
                o.push(i);
            for (let i of o) {
                let a;
                for (; a = /(\(\d+\))(!)?/.exec(i.textContent);) {
                    let [, s, p] = a;
                    if (typeof p == "undefined") {
                        let c = i.splitText(a.index);
                        i = c.splitText(s.length),
                            t.push(c)
                    } else {
                        i.textContent = s,
                            t.push(i);
                        break
                    }
                }
            }
        }
        return t
    }
    function Hn(e, t) {
        t.append(...Array.from(e.childNodes))
    }
    function fr(e, t, { target$: r, print$: o }) {
        let n = t.closest("[id]")
            , i = n == null ? void 0 : n.id
            , a = new Map;
        for (let s of Va(t)) {
            let [, p] = s.textContent.match(/\((\d+)\)/);
            fe(`:scope > li:nth-child(${p})`, e) && (a.set(p, Tn(p, i)),
                s.replaceWith(a.get(p)))
        }
        return a.size === 0 ? S : C(() => {
            let s = new g
                , p = s.pipe(Z(), ie(!0))
                , c = [];
            for (let [l, f] of a)
                c.push([R(".md-typeset", f), R(`:scope > li:nth-child(${l})`, e)]);
            return o.pipe(W(p)).subscribe(l => {
                e.hidden = !l,
                    e.classList.toggle("md-annotation-list", l);
                for (let [f, u] of c)
                    l ? Hn(f, u) : Hn(u, f)
            }
            ),
                O(...[...a].map(([, l]) => kn(l, t, {
                    target$: r
                }))).pipe(_(() => s.complete()), pe())
        }
        )
    }
    function $n(e) {
        if (e.nextElementSibling) {
            let t = e.nextElementSibling;
            if (t.tagName === "OL")
                return t;
            if (t.tagName === "P" && !t.children.length)
                return $n(t)
        }
    }
    function Pn(e, t) {
        return C(() => {
            let r = $n(e);
            return typeof r != "undefined" ? fr(r, e, t) : S
        }
        )
    }
    var Rn = Lt(Br());
    var Da = 0;
    function In(e) {
        if (e.nextElementSibling) {
            let t = e.nextElementSibling;
            if (t.tagName === "OL")
                return t;
            if (t.tagName === "P" && !t.children.length)
                return In(t)
        }
    }
    function za(e) {
        return ge(e).pipe(m(({ width: t }) => ({
            scrollable: Tt(e).width > t
        })), te("scrollable"))
    }
    function jn(e, t) {
        let { matches: r } = matchMedia("(hover)")
            , o = C(() => {
                let n = new g
                    , i = n.pipe(jr(1));
                n.subscribe(({ scrollable: c }) => {
                    c && r ? e.setAttribute("tabindex", "0") : e.removeAttribute("tabindex")
                }
                );
                let a = [];
                if (Rn.default.isSupported() && (e.closest(".copy") || B("content.code.copy") && !e.closest(".no-copy"))) {
                    let c = e.closest("pre");
                    c.id = `__code_${Da++}`;
                    let l = Sn(c.id);
                    c.insertBefore(l, e),
                        B("content.tooltips") && a.push(mt(l, {
                            viewport$
                        }))
                }
                let s = e.closest(".highlight");
                if (s instanceof HTMLElement) {
                    let c = In(s);
                    if (typeof c != "undefined" && (s.classList.contains("annotate") || B("content.code.annotate"))) {
                        let l = fr(c, e, t);
                        a.push(ge(s).pipe(W(i), m(({ width: f, height: u }) => f && u), K(), v(f => f ? l : S)))
                    }
                }
                return P(":scope > span[id]", e).length && e.classList.add("md-code__content"),
                    za(e).pipe(w(c => n.next(c)), _(() => n.complete()), m(c => $({
                        ref: e
                    }, c)), Re(...a))
            }
            );
        return B("content.lazy") ? tt(e).pipe(b(n => n), Te(1), v(() => o)) : o
    }
    function Na(e, { target$: t, print$: r }) {
        let o = !0;
        return O(t.pipe(m(n => n.closest("details:not([open])")), b(n => e === n), m(() => ({
            action: "open",
            reveal: !0
        }))), r.pipe(b(n => n || !o), w(() => o = e.open), m(n => ({
            action: n ? "open" : "close"
        }))))
    }
    function Fn(e, t) {
        return C(() => {
            let r = new g;
            return r.subscribe(({ action: o, reveal: n }) => {
                e.toggleAttribute("open", o === "open"),
                    n && e.scrollIntoView()
            }
            ),
                Na(e, t).pipe(w(o => r.next(o)), _(() => r.complete()), m(o => $({
                    ref: e
                }, o)))
        }
        )
    }
    var Un = ".node circle,.node ellipse,.node path,.node polygon,.node rect{fill:var(--md-mermaid-node-bg-color);stroke:var(--md-mermaid-node-fg-color)}marker{fill:var(--md-mermaid-edge-color)!important}.edgeLabel .label rect{fill:#0000}.flowchartTitleText{fill:var(--md-mermaid-label-fg-color)}.label{color:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}.label foreignObject{line-height:normal;overflow:visible}.label div .edgeLabel{color:var(--md-mermaid-label-fg-color)}.edgeLabel,.edgeLabel p,.label div .edgeLabel{background-color:var(--md-mermaid-label-bg-color)}.edgeLabel,.edgeLabel p{fill:var(--md-mermaid-label-bg-color);color:var(--md-mermaid-edge-color)}.edgePath .path,.flowchart-link{stroke:var(--md-mermaid-edge-color);stroke-width:.05rem}.edgePath .arrowheadPath{fill:var(--md-mermaid-edge-color);stroke:none}.cluster rect{fill:var(--md-default-fg-color--lightest);stroke:var(--md-default-fg-color--lighter)}.cluster span{color:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}g #flowchart-circleEnd,g #flowchart-circleStart,g #flowchart-crossEnd,g #flowchart-crossStart,g #flowchart-pointEnd,g #flowchart-pointStart{stroke:none}.classDiagramTitleText{fill:var(--md-mermaid-label-fg-color)}g.classGroup line,g.classGroup rect{fill:var(--md-mermaid-node-bg-color);stroke:var(--md-mermaid-node-fg-color)}g.classGroup text{fill:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}.classLabel .box{fill:var(--md-mermaid-label-bg-color);background-color:var(--md-mermaid-label-bg-color);opacity:1}.classLabel .label{fill:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}.node .divider{stroke:var(--md-mermaid-node-fg-color)}.relation{stroke:var(--md-mermaid-edge-color)}.cardinality{fill:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}.cardinality text{fill:inherit!important}defs marker.marker.composition.class path,defs marker.marker.dependency.class path,defs marker.marker.extension.class path{fill:var(--md-mermaid-edge-color)!important;stroke:var(--md-mermaid-edge-color)!important}defs marker.marker.aggregation.class path{fill:var(--md-mermaid-label-bg-color)!important;stroke:var(--md-mermaid-edge-color)!important}.statediagramTitleText{fill:var(--md-mermaid-label-fg-color)}g.stateGroup rect{fill:var(--md-mermaid-node-bg-color);stroke:var(--md-mermaid-node-fg-color)}g.stateGroup .state-title{fill:var(--md-mermaid-label-fg-color)!important;font-family:var(--md-mermaid-font-family)}g.stateGroup .composit{fill:var(--md-mermaid-label-bg-color)}.nodeLabel,.nodeLabel p{color:var(--md-mermaid-label-fg-color);font-family:var(--md-mermaid-font-family)}a .nodeLabel{text-decoration:underline}.node circle.state-end,.node circle.state-start,.start-state{fill:var(--md-mermaid-edge-color);stroke:none}.end-state-inner,.end-state-outer{fill:var(--md-mermaid-edge-color)}.end-state-inner,.node circle.state-end{stroke:var(--md-mermaid-label-bg-color)}.transition{stroke:var(--md-mermaid-edge-color)}[id^=state-fork] rect,[id^=state-join] rect{fill:var(--md-mermaid-edge-color)!important;stroke:none!important}.statediagram-cluster.statediagram-cluster .inner{fill:var(--md-default-bg-color)}.statediagram-cluster rect{fill:var(--md-mermaid-node-bg-color);stroke:var(--md-mermaid-node-fg-color)}.statediagram-state rect.divider{fill:var(--md-default-fg-color--lightest);stroke:var(--md-default-fg-color--lighter)}defs #statediagram-barbEnd{stroke:var(--md-mermaid-edge-color)}[id^=entity] path,[id^=entity] rect{fill:var(--md-default-bg-color)}.relationshipLine{stroke:var(--md-mermaid-edge-color)}defs .marker.oneOrMore.er *,defs .marker.onlyOne.er *,defs .marker.zeroOrMore.er *,defs .marker.zeroOrOne.er *{stroke:var(--md-mermaid-edge-color)!important}text:not([class]):last-child{fill:var(--md-mermaid-label-fg-color)}.actor{fill:var(--md-mermaid-sequence-actor-bg-color);stroke:var(--md-mermaid-sequence-actor-border-color)}text.actor>tspan{fill:var(--md-mermaid-sequence-actor-fg-color);font-family:var(--md-mermaid-font-family)}line{stroke:var(--md-mermaid-sequence-actor-line-color)}.actor-man circle,.actor-man line{fill:var(--md-mermaid-sequence-actorman-bg-color);stroke:var(--md-mermaid-sequence-actorman-line-color)}.messageLine0,.messageLine1{stroke:var(--md-mermaid-sequence-message-line-color)}.note{fill:var(--md-mermaid-sequence-note-bg-color);stroke:var(--md-mermaid-sequence-note-border-color)}.loopText,.loopText>tspan,.messageText,.noteText>tspan{stroke:none;font-family:var(--md-mermaid-font-family)!important}.messageText{fill:var(--md-mermaid-sequence-message-fg-color)}.loopText,.loopText>tspan{fill:var(--md-mermaid-sequence-loop-fg-color)}.noteText>tspan{fill:var(--md-mermaid-sequence-note-fg-color)}#arrowhead path{fill:var(--md-mermaid-sequence-message-line-color);stroke:none}.loopLine{fill:var(--md-mermaid-sequence-loop-bg-color);stroke:var(--md-mermaid-sequence-loop-border-color)}.labelBox{fill:var(--md-mermaid-sequence-label-bg-color);stroke:none}.labelText,.labelText>span{fill:var(--md-mermaid-sequence-label-fg-color);font-family:var(--md-mermaid-font-family)}.sequenceNumber{fill:var(--md-mermaid-sequence-number-fg-color)}rect.rect{fill:var(--md-mermaid-sequence-box-bg-color);stroke:none}rect.rect+text.text{fill:var(--md-mermaid-sequence-box-fg-color)}defs #sequencenumber{fill:var(--md-mermaid-sequence-number-bg-color)!important}";
    var Gr, Qa = 0;
    function Ka() {
        return typeof mermaid == "undefined" || mermaid instanceof Element ? wt("https://unpkg.com/mermaid@11/dist/mermaid.min.js") : I(void 0)
    }
    function Wn(e) {
        return e.classList.remove("mermaid"),
            Gr || (Gr = Ka().pipe(w(() => mermaid.initialize({
                startOnLoad: !1,
                themeCSS: Un,
                sequence: {
                    actorFontSize: "16px",
                    messageFontSize: "16px",
                    noteFontSize: "16px"
                }
            })), m(() => { }
            ), G(1))),
            Gr.subscribe(() => co(null, null, function* () {
                e.classList.add("mermaid");
                let t = `__mermaid_${Qa++}`
                    , r = x("div", {
                        class: "mermaid"
                    })
                    , o = e.textContent
                    , { svg: n, fn: i } = yield mermaid.render(t, o)
                    , a = r.attachShadow({
                        mode: "closed"
                    });
                a.innerHTML = n,
                    e.replaceWith(r),
                    i == null || i(a)
            })),
            Gr.pipe(m(() => ({
                ref: e
            })))
    }
    var Vn = x("table");
    function Dn(e) {
        return e.replaceWith(Vn),
            Vn.replaceWith(An(e)),
            I({
                ref: e
            })
    }
    function Ya(e) {
        let t = e.find(r => r.checked) || e[0];
        return O(...e.map(r => h(r, "change").pipe(m(() => R(`label[for="${r.id}"]`))))).pipe(Q(R(`label[for="${t.id}"]`)), m(r => ({
            active: r
        })))
    }
    function zn(e, { viewport$: t, target$: r }) {
        let o = R(".tabbed-labels", e)
            , n = P(":scope > input", e)
            , i = Kr("prev");
        e.append(i);
        let a = Kr("next");
        return e.append(a),
            C(() => {
                let s = new g
                    , p = s.pipe(Z(), ie(!0));
                N([s, ge(e), tt(e)]).pipe(W(p), Me(1, me)).subscribe({
                    next([{ active: c }, l]) {
                        let f = De(c)
                            , { width: u } = ce(c);
                        e.style.setProperty("--md-indicator-x", `${f.x}px`),
                            e.style.setProperty("--md-indicator-width", `${u}px`);
                        let d = pr(o);
                        (f.x < d.x || f.x + u > d.x + l.width) && o.scrollTo({
                            left: Math.max(0, f.x - 16),
                            behavior: "smooth"
                        })
                    },
                    complete() {
                        e.style.removeProperty("--md-indicator-x"),
                            e.style.removeProperty("--md-indicator-width")
                    }
                }),
                    N([ze(o), ge(o)]).pipe(W(p)).subscribe(([c, l]) => {
                        let f = Tt(o);
                        i.hidden = c.x < 16,
                            a.hidden = c.x > f.width - l.width - 16
                    }
                    ),
                    O(h(i, "click").pipe(m(() => -1)), h(a, "click").pipe(m(() => 1))).pipe(W(p)).subscribe(c => {
                        let { width: l } = ce(o);
                        o.scrollBy({
                            left: l * c,
                            behavior: "smooth"
                        })
                    }
                    ),
                    r.pipe(W(p), b(c => n.includes(c))).subscribe(c => c.click()),
                    o.classList.add("tabbed-labels--linked");
                for (let c of n) {
                    let l = R(`label[for="${c.id}"]`);
                    l.replaceChildren(x("a", {
                        href: `#${l.htmlFor}`,
                        tabIndex: -1
                    }, ...Array.from(l.childNodes))),
                        h(l.firstElementChild, "click").pipe(W(p), b(f => !(f.metaKey || f.ctrlKey)), w(f => {
                            f.preventDefault(),
                                f.stopPropagation()
                        }
                        )).subscribe(() => {
                            history.replaceState({}, "", `#${l.htmlFor}`),
                                l.click()
                        }
                        )
                }
                return B("content.tabs.link") && s.pipe(Ce(1), re(t)).subscribe(([{ active: c }, { offset: l }]) => {
                    let f = c.innerText.trim();
                    if (c.hasAttribute("data-md-switching"))
                        c.removeAttribute("data-md-switching");
                    else {
                        let u = e.offsetTop - l.y;
                        for (let y of P("[data-tabs]"))
                            for (let L of P(":scope > input", y)) {
                                let X = R(`label[for="${L.id}"]`);
                                if (X !== c && X.innerText.trim() === f) {
                                    X.setAttribute("data-md-switching", ""),
                                        L.click();
                                    break
                                }
                            }
                        window.scrollTo({
                            top: e.offsetTop - u
                        });
                        let d = __md_get("__tabs") || [];
                        __md_set("__tabs", [...new Set([f, ...d])])
                    }
                }
                ),
                    s.pipe(W(p)).subscribe(() => {
                        for (let c of P("audio, video", e))
                            c.pause()
                    }
                    ),
                    Ya(n).pipe(w(c => s.next(c)), _(() => s.complete()), m(c => $({
                        ref: e
                    }, c)))
            }
            ).pipe(Ke(se))
    }
    function Nn(e, { viewport$: t, target$: r, print$: o }) {
        return O(...P(".annotate:not(.highlight)", e).map(n => Pn(n, {
            target$: r,
            print$: o
        })), ...P("pre:not(.mermaid) > code", e).map(n => jn(n, {
            target$: r,
            print$: o
        })), ...P("pre.mermaid", e).map(n => Wn(n)), ...P("table:not([class])", e).map(n => Dn(n)), ...P("details", e).map(n => Fn(n, {
            target$: r,
            print$: o
        })), ...P("[data-tabs]", e).map(n => zn(n, {
            viewport$: t,
            target$: r
        })), ...P("[title]", e).filter(() => B("content.tooltips")).map(n => mt(n, {
            viewport$: t
        })))
    }
    function Ba(e, { alert$: t }) {
        return t.pipe(v(r => O(I(!0), I(!1).pipe(Ge(2e3))).pipe(m(o => ({
            message: r,
            active: o
        })))))
    }
    function qn(e, t) {
        let r = R(".md-typeset", e);
        return C(() => {
            let o = new g;
            return o.subscribe(({ message: n, active: i }) => {
                e.classList.toggle("md-dialog--active", i),
                    r.textContent = n
            }
            ),
                Ba(e, t).pipe(w(n => o.next(n)), _(() => o.complete()), m(n => $({
                    ref: e
                }, n)))
        }
        )
    }
    var Ga = 0;
    function Ja(e, t) {
        document.body.append(e);
        let { width: r } = ce(e);
        e.style.setProperty("--md-tooltip-width", `${r}px`),
            e.remove();
        let o = cr(t)
            , n = typeof o != "undefined" ? ze(o) : I({
                x: 0,
                y: 0
            })
            , i = O(et(t), Ht(t)).pipe(K());
        return N([i, n]).pipe(m(([a, s]) => {
            let { x: p, y: c } = De(t)
                , l = ce(t)
                , f = t.closest("table");
            return f && t.parentElement && (p += f.offsetLeft + t.parentElement.offsetLeft,
                c += f.offsetTop + t.parentElement.offsetTop),
            {
                active: a,
                offset: {
                    x: p - s.x + l.width / 2 - r / 2,
                    y: c - s.y + l.height + 8
                }
            }
        }
        ))
    }
    function Qn(e) {
        let t = e.title;
        if (!t.length)
            return S;
        let r = `__tooltip_${Ga++}`
            , o = Pt(r, "inline")
            , n = R(".md-typeset", o);
        return n.innerHTML = t,
            C(() => {
                let i = new g;
                return i.subscribe({
                    next({ offset: a }) {
                        o.style.setProperty("--md-tooltip-x", `${a.x}px`),
                            o.style.setProperty("--md-tooltip-y", `${a.y}px`)
                    },
                    complete() {
                        o.style.removeProperty("--md-tooltip-x"),
                            o.style.removeProperty("--md-tooltip-y")
                    }
                }),
                    O(i.pipe(b(({ active: a }) => a)), i.pipe(_e(250), b(({ active: a }) => !a))).subscribe({
                        next({ active: a }) {
                            a ? (e.insertAdjacentElement("afterend", o),
                                e.setAttribute("aria-describedby", r),
                                e.removeAttribute("title")) : (o.remove(),
                                    e.removeAttribute("aria-describedby"),
                                    e.setAttribute("title", t))
                        },
                        complete() {
                            o.remove(),
                                e.removeAttribute("aria-describedby"),
                                e.setAttribute("title", t)
                        }
                    }),
                    i.pipe(Me(16, me)).subscribe(({ active: a }) => {
                        o.classList.toggle("md-tooltip--active", a)
                    }
                    ),
                    i.pipe(pt(125, me), b(() => !!e.offsetParent), m(() => e.offsetParent.getBoundingClientRect()), m(({ x: a }) => a)).subscribe({
                        next(a) {
                            a ? o.style.setProperty("--md-tooltip-0", `${-a}px`) : o.style.removeProperty("--md-tooltip-0")
                        },
                        complete() {
                            o.style.removeProperty("--md-tooltip-0")
                        }
                    }),
                    Ja(o, e).pipe(w(a => i.next(a)), _(() => i.complete()), m(a => $({
                        ref: e
                    }, a)))
            }
            ).pipe(Ke(se))
    }
    function Xa({ viewport$: e }) {
        if (!B("header.autohide"))
            return I(!1);
        let t = e.pipe(m(({ offset: { y: n } }) => n), Be(2, 1), m(([n, i]) => [n < i, i]), te(0))
            , r = N([e, t]).pipe(b(([{ offset: n }, [, i]]) => Math.abs(i - n.y) > 100), m(([, [n]]) => n), K())
            , o = Ne("search");
        return N([e, o]).pipe(m(([{ offset: n }, i]) => n.y > 400 && !i), K(), v(n => n ? r : I(!1)), Q(!1))
    }
    function Kn(e, t) {
        return C(() => N([ge(e), Xa(t)])).pipe(m(([{ height: r }, o]) => ({
            height: r,
            hidden: o
        })), K((r, o) => r.height === o.height && r.hidden === o.hidden), G(1))
    }
    function Yn(e, { header$: t, main$: r }) {
        return C(() => {
            let o = new g
                , n = o.pipe(Z(), ie(!0));
            o.pipe(te("active"), He(t)).subscribe(([{ active: a }, { hidden: s }]) => {
                e.classList.toggle("md-header--shadow", a && !s),
                    e.hidden = s
            }
            );
            let i = ue(P("[title]", e)).pipe(b(() => B("content.tooltips")), ne(a => Qn(a)));
            return r.subscribe(o),
                t.pipe(W(n), m(a => $({
                    ref: e
                }, a)), Re(i.pipe(W(n))))
        }
        )
    }
    function Za(e, { viewport$: t, header$: r }) {
        return mr(e, {
            viewport$: t,
            header$: r
        }).pipe(m(({ offset: { y: o } }) => {
            let { height: n } = ce(e);
            return {
                active: o >= n
            }
        }
        ), te("active"))
    }
    function Bn(e, t) {
        return C(() => {
            let r = new g;
            r.subscribe({
                next({ active: n }) {
                    e.classList.toggle("md-header__title--active", n)
                },
                complete() {
                    e.classList.remove("md-header__title--active")
                }
            });
            let o = fe(".md-content h1");
            return typeof o == "undefined" ? S : Za(o, t).pipe(w(n => r.next(n)), _(() => r.complete()), m(n => $({
                ref: e
            }, n)))
        }
        )
    }
    function Gn(e, { viewport$: t, header$: r }) {
        let o = r.pipe(m(({ height: i }) => i), K())
            , n = o.pipe(v(() => ge(e).pipe(m(({ height: i }) => ({
                top: e.offsetTop,
                bottom: e.offsetTop + i
            })), te("bottom"))));
        return N([o, n, t]).pipe(m(([i, { top: a, bottom: s }, { offset: { y: p }, size: { height: c } }]) => (c = Math.max(0, c - Math.max(0, a - p, i) - Math.max(0, c + p - s)),
        {
            offset: a - i,
            height: c,
            active: a - i <= p
        })), K((i, a) => i.offset === a.offset && i.height === a.height && i.active === a.active))
    }
    function es(e) {
        let t = __md_get("__palette") || {
            index: e.findIndex(o => matchMedia(o.getAttribute("data-md-color-media")).matches)
        }
            , r = Math.max(0, Math.min(t.index, e.length - 1));
        return I(...e).pipe(ne(o => h(o, "change").pipe(m(() => o))), Q(e[r]), m(o => ({
            index: e.indexOf(o),
            color: {
                media: o.getAttribute("data-md-color-media"),
                scheme: o.getAttribute("data-md-color-scheme"),
                primary: o.getAttribute("data-md-color-primary"),
                accent: o.getAttribute("data-md-color-accent")
            }
        })), G(1))
    }
    function Jn(e) {
        let t = P("input", e)
            , r = x("meta", {
                name: "theme-color"
            });
        document.head.appendChild(r);
        let o = x("meta", {
            name: "color-scheme"
        });
        document.head.appendChild(o);
        let n = $t("(prefers-color-scheme: light)");
        return C(() => {
            let i = new g;
            return i.subscribe(a => {
                if (document.body.setAttribute("data-md-color-switching", ""),
                    a.color.media === "(prefers-color-scheme)") {
                    let s = matchMedia("(prefers-color-scheme: light)")
                        , p = document.querySelector(s.matches ? "[data-md-color-media='(prefers-color-scheme: light)']" : "[data-md-color-media='(prefers-color-scheme: dark)']");
                    a.color.scheme = p.getAttribute("data-md-color-scheme"),
                        a.color.primary = p.getAttribute("data-md-color-primary"),
                        a.color.accent = p.getAttribute("data-md-color-accent")
                }
                for (let [s, p] of Object.entries(a.color))
                    document.body.setAttribute(`data-md-color-${s}`, p);
                for (let s = 0; s < t.length; s++) {
                    let p = t[s].nextElementSibling;
                    p instanceof HTMLElement && (p.hidden = a.index !== s)
                }
                __md_set("__palette", a)
            }
            ),
                h(e, "keydown").pipe(b(a => a.key === "Enter"), re(i, (a, s) => s)).subscribe(({ index: a }) => {
                    a = (a + 1) % t.length,
                        t[a].click(),
                        t[a].focus()
                }
                ),
                i.pipe(m(() => {
                    let a = Se("header")
                        , s = window.getComputedStyle(a);
                    return o.content = s.colorScheme,
                        s.backgroundColor.match(/\d+/g).map(p => (+p).toString(16).padStart(2, "0")).join("")
                }
                )).subscribe(a => r.content = `#${a}`),
                i.pipe(ve(se)).subscribe(() => {
                    document.body.removeAttribute("data-md-color-switching")
                }
                ),
                es(t).pipe(W(n.pipe(Ce(1))), ct(), w(a => i.next(a)), _(() => i.complete()), m(a => $({
                    ref: e
                }, a)))
        }
        )
    }
    function Xn(e, { progress$: t }) {
        return C(() => {
            let r = new g;
            return r.subscribe(({ value: o }) => {
                e.style.setProperty("--md-progress-value", `${o}`)
            }
            ),
                t.pipe(w(o => r.next({
                    value: o
                })), _(() => r.complete()), m(o => ({
                    ref: e,
                    value: o
                })))
        }
        )
    }
    var Jr = Lt(Br());
    function ts(e) {
        e.setAttribute("data-md-copying", "");
        let t = e.closest("[data-copy]")
            , r = t ? t.getAttribute("data-copy") : e.innerText;
        return e.removeAttribute("data-md-copying"),
            r.trimEnd()
    }
    function Zn({ alert$: e }) {
        Jr.default.isSupported() && new j(t => {
            new Jr.default("[data-clipboard-target], [data-clipboard-text]", {
                text: r => r.getAttribute("data-clipboard-text") || ts(R(r.getAttribute("data-clipboard-target")))
            }).on("success", r => t.next(r))
        }
        ).pipe(w(t => {
            t.trigger.focus()
        }
        ), m(() => Ee("clipboard.copied"))).subscribe(e)
    }
    function ei(e, t) {
        return e.protocol = t.protocol,
            e.hostname = t.hostname,
            e
    }
    function rs(e, t) {
        let r = new Map;
        for (let o of P("url", e)) {
            let n = R("loc", o)
                , i = [ei(new URL(n.textContent), t)];
            r.set(`${i[0]}`, i);
            for (let a of P("[rel=alternate]", o)) {
                let s = a.getAttribute("href");
                s != null && i.push(ei(new URL(s), t))
            }
        }
        return r
    }
    function ur(e) {
        return un(new URL("sitemap.xml", e)).pipe(m(t => rs(t, new URL(e))), de(() => I(new Map)))
    }
    function os(e, t) {
        if (!(e.target instanceof Element))
            return S;
        let r = e.target.closest("a");
        if (r === null)
            return S;
        if (r.target || e.metaKey || e.ctrlKey)
            return S;
        let o = new URL(r.href);
        return o.search = o.hash = "",
            t.has(`${o}`) ? (e.preventDefault(),
                I(new URL(r.href))) : S
    }
    function ti(e) {
        let t = new Map;
        for (let r of P(":scope > *", e.head))
            t.set(r.outerHTML, r);
        return t
    }
    function ri(e) {
        for (let t of P("[href], [src]", e))
            for (let r of ["href", "src"]) {
                let o = t.getAttribute(r);
                if (o && !/^(?:[a-z]+:)?\/\//i.test(o)) {
                    t[r] = t[r];
                    break
                }
            }
        return I(e)
    }
    function ns(e) {
        for (let o of ["[data-md-component=announce]", "[data-md-component=container]", "[data-md-component=header-topic]", "[data-md-component=outdated]", "[data-md-component=logo]", "[data-md-component=skip]", ...B("navigation.tabs.sticky") ? ["[data-md-component=tabs]"] : []]) {
            let n = fe(o)
                , i = fe(o, e);
            typeof n != "undefined" && typeof i != "undefined" && n.replaceWith(i)
        }
        let t = ti(document);
        for (let [o, n] of ti(e))
            t.has(o) ? t.delete(o) : document.head.appendChild(n);
        for (let o of t.values()) {
            let n = o.getAttribute("name");
            n !== "theme-color" && n !== "color-scheme" && o.remove()
        }
        let r = Se("container");
        return We(P("script", r)).pipe(v(o => {
            let n = e.createElement("script");
            if (o.src) {
                for (let i of o.getAttributeNames())
                    n.setAttribute(i, o.getAttribute(i));
                return o.replaceWith(n),
                    new j(i => {
                        n.onload = () => i.complete()
                    }
                    )
            } else
                return n.textContent = o.textContent,
                    o.replaceWith(n),
                    S
        }
        ), Z(), ie(document))
    }
    function oi({ location$: e, viewport$: t, progress$: r }) {
        let o = xe();
        if (location.protocol === "file:")
            return S;
        let n = ur(o.base);
        I(document).subscribe(ri);
        let i = h(document.body, "click").pipe(He(n), v(([p, c]) => os(p, c)), pe())
            , a = h(window, "popstate").pipe(m(ye), pe());
        i.pipe(re(t)).subscribe(([p, { offset: c }]) => {
            history.replaceState(c, ""),
                history.pushState(null, "", p)
        }
        ),
            O(i, a).subscribe(e);
        let s = e.pipe(te("pathname"), v(p => fn(p, {
            progress$: r
        }).pipe(de(() => (lt(p, !0),
            S)))), v(ri), v(ns), pe());
        return O(s.pipe(re(e, (p, c) => c)), s.pipe(v(() => e), te("hash")), e.pipe(K((p, c) => p.pathname === c.pathname && p.hash === c.hash), v(() => i), w(() => history.back()))).subscribe(p => {
            var c, l;
            history.state !== null || !p.hash ? window.scrollTo(0, (l = (c = history.state) == null ? void 0 : c.y) != null ? l : 0) : (history.scrollRestoration = "auto",
                pn(p.hash),
                history.scrollRestoration = "manual")
        }
        ),
            e.subscribe(() => {
                history.scrollRestoration = "manual"
            }
            ),
            h(window, "beforeunload").subscribe(() => {
                history.scrollRestoration = "auto"
            }
            ),
            t.pipe(te("offset"), _e(100)).subscribe(({ offset: p }) => {
                history.replaceState(p, "")
            }
            ),
            s
    }
    var ni = Lt(qr());
    function ii(e) {
        let t = e.separator.split("|").map(n => n.replace(/(\(\?[!=<][^)]+\))/g, "").length === 0 ? "\uFFFD" : n).join("|")
            , r = new RegExp(t, "img")
            , o = (n, i, a) => `${i}<mark data-md-highlight>${a}</mark>`;
        return n => {
            n = n.replace(/[\s*+\-:~^]+/g, " ").trim();
            let i = new RegExp(`(^|${e.separator}|)(${n.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&").replace(r, "|")})`, "img");
            return a => (0,
                ni.default)(a).replace(i, o).replace(/<\/mark>(\s+)<mark[^>]*>/img, "$1")
        }
    }
    function It(e) {
        return e.type === 1
    }
    function dr(e) {
        return e.type === 3
    }
    function ai(e, t) {
        let r = yn(e);
        return O(I(location.protocol !== "file:"), Ne("search")).pipe(Ae(o => o), v(() => t)).subscribe(({ config: o, docs: n }) => r.next({
            type: 0,
            data: {
                config: o,
                docs: n,
                options: {
                    suggest: B("search.suggest")
                }
            }
        })),
            r
    }
    function si(e) {
        var l;
        let { selectedVersionSitemap: t, selectedVersionBaseURL: r, currentLocation: o, currentBaseURL: n } = e
            , i = (l = Xr(n)) == null ? void 0 : l.pathname;
        if (i === void 0)
            return;
        let a = ss(o.pathname, i);
        if (a === void 0)
            return;
        let s = ps(t.keys());
        if (!t.has(s))
            return;
        let p = Xr(a, s);
        if (!p || !t.has(p.href))
            return;
        let c = Xr(a, r);
        if (c)
            return c.hash = o.hash,
                c.search = o.search,
                c
    }
    function Xr(e, t) {
        try {
            return new URL(e, t)
        } catch (r) {
            return
        }
    }
    function ss(e, t) {
        if (e.startsWith(t))
            return e.slice(t.length)
    }
    function cs(e, t) {
        let r = Math.min(e.length, t.length), o;
        for (o = 0; o < r && e[o] === t[o]; ++o)
            ;
        return o
    }
    function ps(e) {
        let t;
        for (let r of e)
            t === void 0 ? t = r : t = t.slice(0, cs(t, r));
        return t != null ? t : ""
    }
    function ci({ document$: e }) {
        let t = xe()
            , r = je(new URL("../versions.json", t.base)).pipe(de(() => S))
            , o = r.pipe(m(n => {
                let [, i] = t.base.match(/([^/]+)\/?$/);
                return n.find(({ version: a, aliases: s }) => a === i || s.includes(i)) || n[0]
            }
            ));
        r.pipe(m(n => new Map(n.map(i => [`${new URL(`../${i.version}/`, t.base)}`, i]))), v(n => h(document.body, "click").pipe(b(i => !i.metaKey && !i.ctrlKey), re(o), v(([i, a]) => {
            if (i.target instanceof Element) {
                let s = i.target.closest("a");
                if (s && !s.target && n.has(s.href)) {
                    let p = s.href;
                    return !i.target.closest(".md-version") && n.get(p) === a ? S : (i.preventDefault(),
                        I(new URL(p)))
                }
            }
            return S
        }
        ), v(i => ur(i).pipe(m(a => {
            var s;
            return (s = si({
                selectedVersionSitemap: a,
                selectedVersionBaseURL: i,
                currentLocation: ye(),
                currentBaseURL: t.base
            })) != null ? s : i
        }
        )))))).subscribe(n => lt(n, !0)),
            N([r, o]).subscribe(([n, i]) => {
                R(".md-header__topic").appendChild(Cn(n, i))
            }
            ),
            e.pipe(v(() => o)).subscribe(n => {
                var s;
                let i = new URL(t.base)
                    , a = __md_get("__outdated", sessionStorage, i);
                if (a === null) {
                    a = !0;
                    let p = ((s = t.version) == null ? void 0 : s.default) || "latest";
                    Array.isArray(p) || (p = [p]);
                    e: for (let c of p)
                        for (let l of n.aliases.concat(n.version))
                            if (new RegExp(c, "i").test(l)) {
                                a = !1;
                                break e
                            }
                    __md_set("__outdated", a, sessionStorage, i)
                }
                if (a)
                    for (let p of ae("outdated"))
                        p.hidden = !1
            }
            )
    }
    function ls(e, { worker$: t }) {
        let { searchParams: r } = ye();
        r.has("q") && (Je("search", !0),
            e.value = r.get("q"),
            e.focus(),
            Ne("search").pipe(Ae(i => !i)).subscribe(() => {
                let i = ye();
                i.searchParams.delete("q"),
                    history.replaceState({}, "", `${i}`)
            }
            ));
        let o = et(e)
            , n = O(t.pipe(Ae(It)), h(e, "keyup"), o).pipe(m(() => e.value), K());
        return N([n, o]).pipe(m(([i, a]) => ({
            value: i,
            focus: a
        })), G(1))
    }
    function pi(e, { worker$: t }) {
        let r = new g
            , o = r.pipe(Z(), ie(!0));
        N([t.pipe(Ae(It)), r], (i, a) => a).pipe(te("value")).subscribe(({ value: i }) => t.next({
            type: 2,
            data: i
        })),
            r.pipe(te("focus")).subscribe(({ focus: i }) => {
                i && Je("search", i)
            }
            ),
            h(e.form, "reset").pipe(W(o)).subscribe(() => e.focus());
        let n = R("header [for=__search]");
        return h(n, "click").subscribe(() => e.focus()),
            ls(e, {
                worker$: t
            }).pipe(w(i => r.next(i)), _(() => r.complete()), m(i => $({
                ref: e
            }, i)), G(1))
    }
    function li(e, { worker$: t, query$: r }) {
        let o = new g
            , n = on(e.parentElement).pipe(b(Boolean))
            , i = e.parentElement
            , a = R(":scope > :first-child", e)
            , s = R(":scope > :last-child", e);
        Ne("search").subscribe(l => s.setAttribute("role", l ? "list" : "presentation")),
            o.pipe(re(r), Wr(t.pipe(Ae(It)))).subscribe(([{ items: l }, { value: f }]) => {
                switch (l.length) {
                    case 0:
                        a.textContent = f.length ? Ee("search.result.none") : Ee("search.result.placeholder");
                        break;
                    case 1:
                        a.textContent = Ee("search.result.one");
                        break;
                    default:
                        let u = sr(l.length);
                        a.textContent = Ee("search.result.other", u)
                }
            }
            );
        let p = o.pipe(w(() => s.innerHTML = ""), v(({ items: l }) => O(I(...l.slice(0, 10)), I(...l.slice(10)).pipe(Be(4), Dr(n), v(([f]) => f)))), m(Mn), pe());
        return p.subscribe(l => s.appendChild(l)),
            p.pipe(ne(l => {
                let f = fe("details", l);
                return typeof f == "undefined" ? S : h(f, "toggle").pipe(W(o), m(() => f))
            }
            )).subscribe(l => {
                l.open === !1 && l.offsetTop <= i.scrollTop && i.scrollTo({
                    top: l.offsetTop
                })
            }
            ),
            t.pipe(b(dr), m(({ data: l }) => l)).pipe(w(l => o.next(l)), _(() => o.complete()), m(l => $({
                ref: e
            }, l)))
    }
    function ms(e, { query$: t }) {
        return t.pipe(m(({ value: r }) => {
            let o = ye();
            return o.hash = "",
                r = r.replace(/\s+/g, "+").replace(/&/g, "%26").replace(/=/g, "%3D"),
                o.search = `q=${r}`,
            {
                url: o
            }
        }
        ))
    }
    function mi(e, t) {
        let r = new g
            , o = r.pipe(Z(), ie(!0));
        return r.subscribe(({ url: n }) => {
            e.setAttribute("data-clipboard-text", e.href),
                e.href = `${n}`
        }
        ),
            h(e, "click").pipe(W(o)).subscribe(n => n.preventDefault()),
            ms(e, t).pipe(w(n => r.next(n)), _(() => r.complete()), m(n => $({
                ref: e
            }, n)))
    }
    function fi(e, { worker$: t, keyboard$: r }) {
        let o = new g
            , n = Se("search-query")
            , i = O(h(n, "keydown"), h(n, "focus")).pipe(ve(se), m(() => n.value), K());
        return o.pipe(He(i), m(([{ suggest: s }, p]) => {
            let c = p.split(/([\s-]+)/);
            if (s != null && s.length && c[c.length - 1]) {
                let l = s[s.length - 1];
                l.startsWith(c[c.length - 1]) && (c[c.length - 1] = l)
            } else
                c.length = 0;
            return c
        }
        )).subscribe(s => e.innerHTML = s.join("").replace(/\s/g, "&nbsp;")),
            r.pipe(b(({ mode: s }) => s === "search")).subscribe(s => {
                switch (s.type) {
                    case "ArrowRight":
                        e.innerText.length && n.selectionStart === n.value.length && (n.value = e.innerText);
                        break
                }
            }
            ),
            t.pipe(b(dr), m(({ data: s }) => s)).pipe(w(s => o.next(s)), _(() => o.complete()), m(() => ({
                ref: e
            })))
    }
    function ui(e, { index$: t, keyboard$: r }) {
        let o = xe();
        try {
            let n = ai(o.search, t)
                , i = Se("search-query", e)
                , a = Se("search-result", e);
            h(e, "click").pipe(b(({ target: p }) => p instanceof Element && !!p.closest("a"))).subscribe(() => Je("search", !1)),
                r.pipe(b(({ mode: p }) => p === "search")).subscribe(p => {
                    let c = Ie();
                    switch (p.type) {
                        case "Enter":
                            if (c === i) {
                                let l = new Map;
                                for (let f of P(":first-child [href]", a)) {
                                    let u = f.firstElementChild;
                                    l.set(f, parseFloat(u.getAttribute("data-md-score")))
                                }
                                if (l.size) {
                                    let [[f]] = [...l].sort(([, u], [, d]) => d - u);
                                    f.click()
                                }
                                p.claim()
                            }
                            break;
                        case "Escape":
                        case "Tab":
                            Je("search", !1),
                                i.blur();
                            break;
                        case "ArrowUp":
                        case "ArrowDown":
                            if (typeof c == "undefined")
                                i.focus();
                            else {
                                let l = [i, ...P(":not(details) > [href], summary, details[open] [href]", a)]
                                    , f = Math.max(0, (Math.max(0, l.indexOf(c)) + l.length + (p.type === "ArrowUp" ? -1 : 1)) % l.length);
                                l[f].focus()
                            }
                            p.claim();
                            break;
                        default:
                            i !== Ie() && i.focus()
                    }
                }
                ),
                r.pipe(b(({ mode: p }) => p === "global")).subscribe(p => {
                    switch (p.type) {
                        case "f":
                        case "s":
                        case "/":
                            i.focus(),
                                i.select(),
                                p.claim();
                            break
                    }
                }
                );
            let s = pi(i, {
                worker$: n
            });
            return O(s, li(a, {
                worker$: n,
                query$: s
            })).pipe(Re(...ae("search-share", e).map(p => mi(p, {
                query$: s
            })), ...ae("search-suggest", e).map(p => fi(p, {
                worker$: n,
                keyboard$: r
            }))))
        } catch (n) {
            return e.hidden = !0,
                Ye
        }
    }
    function di(e, { index$: t, location$: r }) {
        return N([t, r.pipe(Q(ye()), b(o => !!o.searchParams.get("h")))]).pipe(m(([o, n]) => ii(o.config)(n.searchParams.get("h"))), m(o => {
            var a;
            let n = new Map
                , i = document.createNodeIterator(e, NodeFilter.SHOW_TEXT);
            for (let s = i.nextNode(); s; s = i.nextNode())
                if ((a = s.parentElement) != null && a.offsetHeight) {
                    let p = s.textContent
                        , c = o(p);
                    c.length > p.length && n.set(s, c)
                }
            for (let [s, p] of n) {
                let { childNodes: c } = x("span", null, p);
                s.replaceWith(...Array.from(c))
            }
            return {
                ref: e,
                nodes: n
            }
        }
        ))
    }
    function fs(e, { viewport$: t, main$: r }) {
        let o = e.closest(".md-grid")
            , n = o.offsetTop - o.parentElement.offsetTop;
        return N([r, t]).pipe(m(([{ offset: i, height: a }, { offset: { y: s } }]) => (a = a + Math.min(n, Math.max(0, s - i)) - n,
        {
            height: a,
            locked: s >= i + n
        })), K((i, a) => i.height === a.height && i.locked === a.locked))
    }
    function Zr(e, o) {
        var n = o
            , { header$: t } = n
            , r = so(n, ["header$"]);
        let i = R(".md-sidebar__scrollwrap", e)
            , { y: a } = De(i);
        return C(() => {
            let s = new g
                , p = s.pipe(Z(), ie(!0))
                , c = s.pipe(Me(0, me));
            return c.pipe(re(t)).subscribe({
                next([{ height: l }, { height: f }]) {
                    i.style.height = `${l - 2 * a}px`,
                        e.style.top = `${f}px`
                },
                complete() {
                    i.style.height = "",
                        e.style.top = ""
                }
            }),
                c.pipe(Ae()).subscribe(() => {
                    for (let l of P(".md-nav__link--active[href]", e)) {
                        if (!l.clientHeight)
                            continue;
                        let f = l.closest(".md-sidebar__scrollwrap");
                        if (typeof f != "undefined") {
                            let u = l.offsetTop - f.offsetTop
                                , { height: d } = ce(f);
                            f.scrollTo({
                                top: u - d / 2
                            })
                        }
                    }
                }
                ),
                ue(P("label[tabindex]", e)).pipe(ne(l => h(l, "click").pipe(ve(se), m(() => l), W(p)))).subscribe(l => {
                    let f = R(`[id="${l.htmlFor}"]`);
                    R(`[aria-labelledby="${l.id}"]`).setAttribute("aria-expanded", `${f.checked}`)
                }
                ),
                fs(e, r).pipe(w(l => s.next(l)), _(() => s.complete()), m(l => $({
                    ref: e
                }, l)))
        }
        )
    }
    /*function hi(e, t) {
        if (typeof t != "undefined") {
            let r = `https://api.github.com/repos/${e}/${t}`;
            return st(je(`${r}/releases/latest`).pipe(de(() => S), m(o => ({
                version: o.tag_name
            })), Ve({})), je(r).pipe(de(() => S), m(o => ({
                stars: o.stargazers_count,
                forks: o.forks_count
            })), Ve({}))).pipe(m(([o, n]) => $($({}, o), n)))
        } else {
            let r = `https://api.github.com/users/${e}`;
            return je(r).pipe(m(o => ({
                repositories: o.public_repos
            })), Ve({}))
        }
    }
    function bi(e, t) {
        let r = `https://${e}/api/v4/projects/${encodeURIComponent(t)}`;
        return st(je(`${r}/releases/permalink/latest`).pipe(de(() => S), m(({ tag_name: o }) => ({
            version: o
        })), Ve({})), je(r).pipe(de(() => S), m(({ star_count: o, forks_count: n }) => ({
            stars: o,
            forks: n
        })), Ve({}))).pipe(m(([o, n]) => $($({}, o), n)))
    }
    function vi(e) {
        let t = e.match(/^.+github\.com\/([^/]+)\/?([^/]+)?/i);
        if (t) {
            let [, r, o] = t;
            return hi(r, o)
        }
        if (t = e.match(/^.+?([^/]*gitlab[^/]+)\/(.+?)\/?$/i),
            t) {
            let [, r, o] = t;
            return bi(r, o)
        }
        return S
    }*/
    var us;
    function ds(e) {
        return us || (us = C(() => {
            let t = __md_get("__source", sessionStorage);
            if (t)
                return I(t);
            if (ae("consent").length) {
                let o = __md_get("__consent");
                if (!(o && o.github))
                    return S
            }
            return vi(e.href).pipe(w(o => __md_set("__source", o, sessionStorage)))
        }
        ).pipe(de(() => S), b(t => Object.keys(t).length > 0), m(t => ({
            facts: t
        })), G(1)))
    }
    function gi(e) {
        let t = R(":scope > :last-child", e);
        return C(() => {
            let r = new g;
            return r.subscribe(({ facts: o }) => {
                t.appendChild(_n(o)),
                    t.classList.add("md-source__repository--active")
            }
            ),
                ds(e).pipe(w(o => r.next(o)), _(() => r.complete()), m(o => $({
                    ref: e
                }, o)))
        }
        )
    }
    function hs(e, { viewport$: t, header$: r }) {
        return ge(document.body).pipe(v(() => mr(e, {
            header$: r,
            viewport$: t
        })), m(({ offset: { y: o } }) => ({
            hidden: o >= 10
        })), te("hidden"))
    }
    function yi(e, t) {
        return C(() => {
            let r = new g;
            return r.subscribe({
                next({ hidden: o }) {
                    e.hidden = o
                },
                complete() {
                    e.hidden = !1
                }
            }),
                (B("navigation.tabs.sticky") ? I({
                    hidden: !1
                }) : hs(e, t)).pipe(w(o => r.next(o)), _(() => r.complete()), m(o => $({
                    ref: e
                }, o)))
        }
        )
    }
    function bs(e, { viewport$: t, header$: r }) {
        let o = new Map
            , n = P(".md-nav__link", e);
        for (let s of n) {
            let p = decodeURIComponent(s.hash.substring(1))
                , c = fe(`[id="${p}"]`);
            typeof c != "undefined" && o.set(s, c)
        }
        let i = r.pipe(te("height"), m(({ height: s }) => {
            let p = Se("main")
                , c = R(":scope > :first-child", p);
            return s + .8 * (c.offsetTop - p.offsetTop)
        }
        ), pe());
        return ge(document.body).pipe(te("height"), v(s => C(() => {
            let p = [];
            return I([...o].reduce((c, [l, f]) => {
                for (; p.length && o.get(p[p.length - 1]).tagName >= f.tagName;)
                    p.pop();
                let u = f.offsetTop;
                for (; !u && f.parentElement;)
                    f = f.parentElement,
                        u = f.offsetTop;
                let d = f.offsetParent;
                for (; d; d = d.offsetParent)
                    u += d.offsetTop;
                return c.set([...p = [...p, l]].reverse(), u)
            }
                , new Map))
        }
        ).pipe(m(p => new Map([...p].sort(([, c], [, l]) => c - l))), He(i), v(([p, c]) => t.pipe(Fr(([l, f], { offset: { y: u }, size: d }) => {
            let y = u + d.height >= Math.floor(s.height);
            for (; f.length;) {
                let [, L] = f[0];
                if (L - c < u || y)
                    l = [...l, f.shift()];
                else
                    break
            }
            for (; l.length;) {
                let [, L] = l[l.length - 1];
                if (L - c >= u && !y)
                    f = [l.pop(), ...f];
                else
                    break
            }
            return [l, f]
        }
            , [[], [...p]]), K((l, f) => l[0] === f[0] && l[1] === f[1])))))).pipe(m(([s, p]) => ({
                prev: s.map(([c]) => c),
                next: p.map(([c]) => c)
            })), Q({
                prev: [],
                next: []
            }), Be(2, 1), m(([s, p]) => s.prev.length < p.prev.length ? {
                prev: p.prev.slice(Math.max(0, s.prev.length - 1), p.prev.length),
                next: []
            } : {
                prev: p.prev.slice(-1),
                next: p.next.slice(0, p.next.length - s.next.length)
            }))
    }
    function xi(e, { viewport$: t, header$: r, main$: o, target$: n }) {
        return C(() => {
            let i = new g
                , a = i.pipe(Z(), ie(!0));
            if (i.subscribe(({ prev: s, next: p }) => {
                for (let [c] of p)
                    c.classList.remove("md-nav__link--passed"),
                        c.classList.remove("md-nav__link--active");
                for (let [c, [l]] of s.entries())
                    l.classList.add("md-nav__link--passed"),
                        l.classList.toggle("md-nav__link--active", c === s.length - 1)
            }
            ),
                B("toc.follow")) {
                let s = O(t.pipe(_e(1), m(() => { }
                )), t.pipe(_e(250), m(() => "smooth")));
                i.pipe(b(({ prev: p }) => p.length > 0), He(o.pipe(ve(se))), re(s)).subscribe(([[{ prev: p }], c]) => {
                    let [l] = p[p.length - 1];
                    if (l.offsetHeight) {
                        let f = cr(l);
                        if (typeof f != "undefined") {
                            let u = l.offsetTop - f.offsetTop
                                , { height: d } = ce(f);
                            f.scrollTo({
                                top: u - d / 2,
                                behavior: c
                            })
                        }
                    }
                }
                )
            }
            return B("navigation.tracking") && t.pipe(W(a), te("offset"), _e(250), Ce(1), W(n.pipe(Ce(1))), ct({
                delay: 250
            }), re(i)).subscribe(([, { prev: s }]) => {
                let p = ye()
                    , c = s[s.length - 1];
                if (c && c.length) {
                    let [l] = c
                        , { hash: f } = new URL(l.href);
                    p.hash !== f && (p.hash = f,
                        history.replaceState({}, "", `${p}`))
                } else
                    p.hash = "",
                        history.replaceState({}, "", `${p}`)
            }
            ),
                bs(e, {
                    viewport$: t,
                    header$: r
                }).pipe(w(s => i.next(s)), _(() => i.complete()), m(s => $({
                    ref: e
                }, s)))
        }
        )
    }
    function vs(e, { viewport$: t, main$: r, target$: o }) {
        let n = t.pipe(m(({ offset: { y: a } }) => a), Be(2, 1), m(([a, s]) => a > s && s > 0), K())
            , i = r.pipe(m(({ active: a }) => a));
        return N([i, n]).pipe(m(([a, s]) => !(a && s)), K(), W(o.pipe(Ce(1))), ie(!0), ct({
            delay: 250
        }), m(a => ({
            hidden: a
        })))
    }
    function Ei(e, { viewport$: t, header$: r, main$: o, target$: n }) {
        let i = new g
            , a = i.pipe(Z(), ie(!0));
        return i.subscribe({
            next({ hidden: s }) {
                e.hidden = s,
                    s ? (e.setAttribute("tabindex", "-1"),
                        e.blur()) : e.removeAttribute("tabindex")
            },
            complete() {
                e.style.top = "",
                    e.hidden = !0,
                    e.removeAttribute("tabindex")
            }
        }),
            r.pipe(W(a), te("height")).subscribe(({ height: s }) => {
                e.style.top = `${s + 16}px`
            }
            ),
            h(e, "click").subscribe(s => {
                s.preventDefault(),
                    window.scrollTo({
                        top: 0
                    })
            }
            ),
            vs(e, {
                viewport$: t,
                main$: o,
                target$: n
            }).pipe(w(s => i.next(s)), _(() => i.complete()), m(s => $({
                ref: e
            }, s)))
    }
    function wi({ document$: e, viewport$: t }) {
        e.pipe(v(() => P(".md-ellipsis")), ne(r => tt(r).pipe(W(e.pipe(Ce(1))), b(o => o), m(() => r), Te(1))), b(r => r.offsetWidth < r.scrollWidth), ne(r => {
            let o = r.innerText
                , n = r.closest("a") || r;
            return n.title = o,
                B("content.tooltips") ? mt(n, {
                    viewport$: t
                }).pipe(W(e.pipe(Ce(1))), _(() => n.removeAttribute("title"))) : S
        }
        )).subscribe(),
            B("content.tooltips") && e.pipe(v(() => P(".md-status")), ne(r => mt(r, {
                viewport$: t
            }))).subscribe()
    }
    function Ti({ document$: e, tablet$: t }) {
        e.pipe(v(() => P(".md-toggle--indeterminate")), w(r => {
            r.indeterminate = !0,
                r.checked = !1
        }
        ), ne(r => h(r, "change").pipe(Vr(() => r.classList.contains("md-toggle--indeterminate")), m(() => r))), re(t)).subscribe(([r, o]) => {
            r.classList.remove("md-toggle--indeterminate"),
                o && (r.checked = !1)
        }
        )
    }
    function gs() {
        return /(iPad|iPhone|iPod)/.test(navigator.userAgent)
    }
    function Si({ document$: e }) {
        e.pipe(v(() => P("[data-md-scrollfix]")), w(t => t.removeAttribute("data-md-scrollfix")), b(gs), ne(t => h(t, "touchstart").pipe(m(() => t)))).subscribe(t => {
            let r = t.scrollTop;
            r === 0 ? t.scrollTop = 1 : r + t.offsetHeight === t.scrollHeight && (t.scrollTop = r - 1)
        }
        )
    }
    function Oi({ viewport$: e, tablet$: t }) {
        N([Ne("search"), t]).pipe(m(([r, o]) => r && !o), v(r => I(r).pipe(Ge(r ? 400 : 100))), re(e)).subscribe(([r, { offset: { y: o } }]) => {
            if (r)
                document.body.setAttribute("data-md-scrolllock", ""),
                    document.body.style.top = `-${o}px`;
            else {
                let n = -1 * parseInt(document.body.style.top, 10);
                document.body.removeAttribute("data-md-scrolllock"),
                    document.body.style.top = "",
                    n && window.scrollTo(0, n)
            }
        }
        )
    }
    Object.entries || (Object.entries = function (e) {
        let t = [];
        for (let r of Object.keys(e))
            t.push([r, e[r]]);
        return t
    }
    );
    Object.values || (Object.values = function (e) {
        let t = [];
        for (let r of Object.keys(e))
            t.push(e[r]);
        return t
    }
    );
    typeof Element != "undefined" && (Element.prototype.scrollTo || (Element.prototype.scrollTo = function (e, t) {
        typeof e == "object" ? (this.scrollLeft = e.left,
            this.scrollTop = e.top) : (this.scrollLeft = e,
                this.scrollTop = t)
    }
    ),
        Element.prototype.replaceWith || (Element.prototype.replaceWith = function (...e) {
            let t = this.parentNode;
            if (t) {
                e.length === 0 && t.removeChild(this);
                for (let r = e.length - 1; r >= 0; r--) {
                    let o = e[r];
                    typeof o == "string" ? o = document.createTextNode(o) : o.parentNode && o.parentNode.removeChild(o),
                        r ? t.insertBefore(this.previousSibling, o) : t.replaceChild(o, this)
                }
            }
        }
        ));
    function ys() {
        return location.protocol === "file:" ? wt(`${new URL("search/search_index.js", eo.base)}`).pipe(m(() => __index), G(1)) : je(new URL("search/search_index.json", eo.base))
    }
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");
    var ot = Go()
        , Ft = sn()
        , Ot = ln(Ft)
        , to = an()
        , Oe = gn()
        , hr = $t("(min-width: 960px)")
        , Mi = $t("(min-width: 1220px)")
        , _i = mn()
        , eo = xe()
        , Ai = document.forms.namedItem("search") ? ys() : Ye
        , ro = new g;
    Zn({
        alert$: ro
    });
    var oo = new g;
    B("navigation.instant") && oi({
        location$: Ft,
        viewport$: Oe,
        progress$: oo
    }).subscribe(ot);
    var Li;
    ((Li = eo.version) == null ? void 0 : Li.provider) === "mike" && ci({
        document$: ot
    });
    O(Ft, Ot).pipe(Ge(125)).subscribe(() => {
        Je("drawer", !1),
            Je("search", !1)
    }
    );
    to.pipe(b(({ mode: e }) => e === "global")).subscribe(e => {
        switch (e.type) {
            case "p":
            case ",":
                let t = fe("link[rel=prev]");
                typeof t != "undefined" && lt(t);
                break;
            case "n":
            case ".":
                let r = fe("link[rel=next]");
                typeof r != "undefined" && lt(r);
                break;
            case "Enter":
                let o = Ie();
                o instanceof HTMLLabelElement && o.click()
        }
    }
    );
    wi({
        viewport$: Oe,
        document$: ot
    });
    Ti({
        document$: ot,
        tablet$: hr
    });
    Si({
        document$: ot
    });
    Oi({
        viewport$: Oe,
        tablet$: hr
    });
    var rt = Kn(Se("header"), {
        viewport$: Oe
    })
        , jt = ot.pipe(m(() => Se("main")), v(e => Gn(e, {
            viewport$: Oe,
            header$: rt
        })), G(1))
        , xs = O(...ae("consent").map(e => En(e, {
            target$: Ot
        })), ...ae("dialog").map(e => qn(e, {
            alert$: ro
        })), ...ae("palette").map(e => Jn(e)), ...ae("progress").map(e => Xn(e, {
            progress$: oo
        })), ...ae("search").map(e => ui(e, {
            index$: Ai,
            keyboard$: to
        })), ...ae("source").map(e => gi(e)))
        , Es = C(() => O(...ae("announce").map(e => xn(e)), ...ae("content").map(e => Nn(e, {
            viewport$: Oe,
            target$: Ot,
            print$: _i
        })), ...ae("content").map(e => B("search.highlight") ? di(e, {
            index$: Ai,
            location$: Ft
        }) : S), ...ae("header").map(e => Yn(e, {
            viewport$: Oe,
            header$: rt,
            main$: jt
        })), ...ae("header-title").map(e => Bn(e, {
            viewport$: Oe,
            header$: rt
        })), ...ae("sidebar").map(e => e.getAttribute("data-md-type") === "navigation" ? zr(Mi, () => Zr(e, {
            viewport$: Oe,
            header$: rt,
            main$: jt
        })) : zr(hr, () => Zr(e, {
            viewport$: Oe,
            header$: rt,
            main$: jt
        }))), ...ae("tabs").map(e => yi(e, {
            viewport$: Oe,
            header$: rt
        })), ...ae("toc").map(e => xi(e, {
            viewport$: Oe,
            header$: rt,
            main$: jt,
            target$: Ot
        })), ...ae("top").map(e => Ei(e, {
            viewport$: Oe,
            header$: rt,
            main$: jt,
            target$: Ot
        }))))
        , Ci = ot.pipe(v(() => Es), Re(xs), G(1));
    Ci.subscribe();
    window.document$ = ot;
    window.location$ = Ft;
    window.target$ = Ot;
    window.keyboard$ = to;
    window.viewport$ = Oe;
    window.tablet$ = hr;
    window.screen$ = Mi;
    window.print$ = _i;
    window.alert$ = ro;
    window.progress$ = oo;
    window.component$ = Ci;
}
)();
//# sourceMappingURL=bundle.13a4f30d.min.js.map
