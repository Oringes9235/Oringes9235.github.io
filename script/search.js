"use strict";
(() => {
    var xe = Object.create;
    var U = Object.defineProperty
        , ve = Object.defineProperties
        , Se = Object.getOwnPropertyDescriptor
        , Te = Object.getOwnPropertyDescriptors
        , Qe = Object.getOwnPropertyNames
        , J = Object.getOwnPropertySymbols
        , Ee = Object.getPrototypeOf
        , Z = Object.prototype.hasOwnProperty
        , be = Object.prototype.propertyIsEnumerable;
    var K = Math.pow
        , X = (t, e, r) => e in t ? U(t, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: r
        }) : t[e] = r
        , A = (t, e) => {
            for (var r in e || (e = {}))
                Z.call(e, r) && X(t, r, e[r]);
            if (J)
                for (var r of J(e))
                    be.call(e, r) && X(t, r, e[r]);
            return t
        }
        , G = (t, e) => ve(t, Te(e));
    var Le = (t, e) => () => (e || t((e = {
        exports: {}
    }).exports, e),
        e.exports);
    var we = (t, e, r, n) => {
        if (e && typeof e == "object" || typeof e == "function")
            for (let i of Qe(e))
                !Z.call(t, i) && i !== r && U(t, i, {
                    get: () => e[i],
                    enumerable: !(n = Se(e, i)) || n.enumerable
                });
        return t
    }
        ;
    var Pe = (t, e, r) => (r = t != null ? xe(Ee(t)) : {},
        we(e || !t || !t.__esModule ? U(r, "default", {
            value: t,
            enumerable: !0
        }) : r, t));
    var B = (t, e, r) => new Promise((n, i) => {
        var s = u => {
            try {
                a(r.next(u))
            } catch (c) {
                i(c)
            }
        }
            , o = u => {
                try {
                    a(r.throw(u))
                } catch (c) {
                    i(c)
                }
            }
            , a = u => u.done ? n(u.value) : Promise.resolve(u.value).then(s, o);
        a((r = r.apply(t, e)).next())
    }
    );
    var re = Le((ee, te) => {
        /**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
 * Copyright (C) 2020 Oliver Nightingale
 * @license MIT
 */
        (function () {
            var t = function (e) {
                var r = new t.Builder;
                return r.pipeline.add(t.trimmer, t.stopWordFilter, t.stemmer),
                    r.searchPipeline.add(t.stemmer),
                    e.call(r, r),
                    r.build()
            };
            t.version = "2.3.9";
            /*!
 * lunr.utils
 * Copyright (C) 2020 Oliver Nightingale
 */
            t.utils = {},
                t.utils.warn = function (e) {
                    return function (r) {
                        e.console && console.warn && console.warn(r)
                    }
                }(this),
                t.utils.asString = function (e) {
                    return e == null ? "" : e.toString()
                }
                ,
                t.utils.clone = function (e) {
                    if (e == null)
                        return e;
                    for (var r = Object.create(null), n = Object.keys(e), i = 0; i < n.length; i++) {
                        var s = n[i]
                            , o = e[s];
                        if (Array.isArray(o)) {
                            r[s] = o.slice();
                            continue
                        }
                        if (typeof o == "string" || typeof o == "number" || typeof o == "boolean") {
                            r[s] = o;
                            continue
                        }
                        throw new TypeError("clone is not deep and does not support nested objects")
                    }
                    return r
                }
                ,
                t.FieldRef = function (e, r, n) {
                    this.docRef = e,
                        this.fieldName = r,
                        this._stringValue = n
                }
                ,
                t.FieldRef.joiner = "/",
                t.FieldRef.fromString = function (e) {
                    var r = e.indexOf(t.FieldRef.joiner);
                    if (r === -1)
                        throw "malformed field ref string";
                    var n = e.slice(0, r)
                        , i = e.slice(r + 1);
                    return new t.FieldRef(i, n, e)
                }
                ,
                t.FieldRef.prototype.toString = function () {
                    return this._stringValue == null && (this._stringValue = this.fieldName + t.FieldRef.joiner + this.docRef),
                        this._stringValue
                }
                ;
            /*!
 * lunr.Set
 * Copyright (C) 2020 Oliver Nightingale
 */
            t.Set = function (e) {
                if (this.elements = Object.create(null),
                    e) {
                    this.length = e.length;
                    for (var r = 0; r < this.length; r++)
                        this.elements[e[r]] = !0
                } else
                    this.length = 0
            }
                ,
                t.Set.complete = {
                    intersect: function (e) {
                        return e
                    },
                    union: function () {
                        return this
                    },
                    contains: function () {
                        return !0
                    }
                },
                t.Set.empty = {
                    intersect: function () {
                        return this
                    },
                    union: function (e) {
                        return e
                    },
                    contains: function () {
                        return !1
                    }
                },
                t.Set.prototype.contains = function (e) {
                    return !!this.elements[e]
                }
                ,
                t.Set.prototype.intersect = function (e) {
                    var r, n, i, s = [];
                    if (e === t.Set.complete)
                        return this;
                    if (e === t.Set.empty)
                        return e;
                    this.length < e.length ? (r = this,
                        n = e) : (r = e,
                            n = this),
                        i = Object.keys(r.elements);
                    for (var o = 0; o < i.length; o++) {
                        var a = i[o];
                        a in n.elements && s.push(a)
                    }
                    return new t.Set(s)
                }
                ,
                t.Set.prototype.union = function (e) {
                    return e === t.Set.complete ? t.Set.complete : e === t.Set.empty ? this : new t.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))
                }
                ,
                t.idf = function (e, r) {
                    var n = 0;
                    for (var i in e)
                        i != "_index" && (n += Object.keys(e[i]).length);
                    var s = (r - n + .5) / (n + .5);
                    return Math.log(1 + Math.abs(s))
                }
                ,
                t.Token = function (e, r) {
                    this.str = e || "",
                        this.metadata = r || {}
                }
                ,
                t.Token.prototype.toString = function () {
                    return this.str
                }
                ,
                t.Token.prototype.update = function (e) {
                    return this.str = e(this.str, this.metadata),
                        this
                }
                ,
                t.Token.prototype.clone = function (e) {
                    return e = e || function (r) {
                        return r
                    }
                        ,
                        new t.Token(e(this.str, this.metadata), this.metadata)
                }
                ;
            /*!
 * lunr.tokenizer
 * Copyright (C) 2020 Oliver Nightingale
 */
            t.tokenizer = function (e, r) {
                if (e == null || e == null)
                    return [];
                if (Array.isArray(e))
                    return e.map(function (g) {
                        return new t.Token(t.utils.asString(g).toLowerCase(), t.utils.clone(r))
                    });
                for (var n = e.toString().toLowerCase(), i = n.length, s = [], o = 0, a = 0; o <= i; o++) {
                    var u = n.charAt(o)
                        , c = o - a;
                    if (u.match(t.tokenizer.separator) || o == i) {
                        if (c > 0) {
                            var f = t.utils.clone(r) || {};
                            f.position = [a, c],
                                f.index = s.length,
                                s.push(new t.Token(n.slice(a, o), f))
                        }
                        a = o + 1
                    }
                }
                return s
            }
                ,
                t.tokenizer.separator = /[\s\-]+/;
            /*!
 * lunr.Pipeline
 * Copyright (C) 2020 Oliver Nightingale
 */
            t.Pipeline = function () {
                this._stack = []
            }
                ,
                t.Pipeline.registeredFunctions = Object.create(null),
                t.Pipeline.registerFunction = function (e, r) {
                    r in this.registeredFunctions && t.utils.warn("Overwriting existing registered function: " + r),
                        e.label = r,
                        t.Pipeline.registeredFunctions[e.label] = e
                }
                ,
                t.Pipeline.warnIfFunctionNotRegistered = function (e) {
                    var r = e.label && e.label in this.registeredFunctions;
                    r || t.utils.warn(`Function is not registered with pipeline. This may cause problems when serialising the index.
`, e)
                }
                ,
                t.Pipeline.load = function (e) {
                    var r = new t.Pipeline;
                    return e.forEach(function (n) {
                        var i = t.Pipeline.registeredFunctions[n];
                        if (i)
                            r.add(i);
                        else
                            throw new Error("Cannot load unregistered function: " + n)
                    }),
                        r
                }
                ,
                t.Pipeline.prototype.add = function () {
                    var e = Array.prototype.slice.call(arguments);
                    e.forEach(function (r) {
                        t.Pipeline.warnIfFunctionNotRegistered(r),
                            this._stack.push(r)
                    }, this)
                }
                ,
                t.Pipeline.prototype.after = function (e, r) {
                    t.Pipeline.warnIfFunctionNotRegistered(r);
                    var n = this._stack.indexOf(e);
                    if (n == -1)
                        throw new Error("Cannot find existingFn");
                    n = n + 1,
                        this._stack.splice(n, 0, r)
                }
                ,
                t.Pipeline.prototype.before = function (e, r) {
                    t.Pipeline.warnIfFunctionNotRegistered(r);
                    var n = this._stack.indexOf(e);
                    if (n == -1)
                        throw new Error("Cannot find existingFn");
                    this._stack.splice(n, 0, r)
                }
                ,
                t.Pipeline.prototype.remove = function (e) {
                    var r = this._stack.indexOf(e);
                    r != -1 && this._stack.splice(r, 1)
                }
                ,
                t.Pipeline.prototype.run = function (e) {
                    for (var r = this._stack.length, n = 0; n < r; n++) {
                        for (var i = this._stack[n], s = [], o = 0; o < e.length; o++) {
                            var a = i(e[o], o, e);
                            if (!(a == null || a === ""))
                                if (Array.isArray(a))
                                    for (var u = 0; u < a.length; u++)
                                        s.push(a[u]);
                                else
                                    s.push(a)
                        }
                        e = s
                    }
                    return e
                }
                ,
                t.Pipeline.prototype.runString = function (e, r) {
                    var n = new t.Token(e, r);
                    return this.run([n]).map(function (i) {
                        return i.toString()
                    })
                }
                ,
                t.Pipeline.prototype.reset = function () {
                    this._stack = []
                }
                ,
                t.Pipeline.prototype.toJSON = function () {
                    return this._stack.map(function (e) {
                        return t.Pipeline.warnIfFunctionNotRegistered(e),
                            e.label
                    })
                }
                ;
            /*!
 * lunr.Vector
 * Copyright (C) 2020 Oliver Nightingale
 */
            t.Vector = function (e) {
                this._magnitude = 0,
                    this.elements = e || []
            }
                ,
                t.Vector.prototype.positionForIndex = function (e) {
                    if (this.elements.length == 0)
                        return 0;
                    for (var r = 0, n = this.elements.length / 2, i = n - r, s = Math.floor(i / 2), o = this.elements[s * 2]; i > 1 && (o < e && (r = s),
                        o > e && (n = s),
                        o != e);)
                        i = n - r,
                            s = r + Math.floor(i / 2),
                            o = this.elements[s * 2];
                    if (o == e || o > e)
                        return s * 2;
                    if (o < e)
                        return (s + 1) * 2
                }
                ,
                t.Vector.prototype.insert = function (e, r) {
                    this.upsert(e, r, function () {
                        throw "duplicate index"
                    })
                }
                ,
                t.Vector.prototype.upsert = function (e, r, n) {
                    this._magnitude = 0;
                    var i = this.positionForIndex(e);
                    this.elements[i] == e ? this.elements[i + 1] = n(this.elements[i + 1], r) : this.elements.splice(i, 0, e, r)
                }
                ,
                t.Vector.prototype.magnitude = function () {
                    if (this._magnitude)
                        return this._magnitude;
                    for (var e = 0, r = this.elements.length, n = 1; n < r; n += 2) {
                        var i = this.elements[n];
                        e += i * i
                    }
                    return this._magnitude = Math.sqrt(e)
                }
                ,
                t.Vector.prototype.dot = function (e) {
                    for (var r = 0, n = this.elements, i = e.elements, s = n.length, o = i.length, a = 0, u = 0, c = 0, f = 0; c < s && f < o;)
                        a = n[c],
                            u = i[f],
                            a < u ? c += 2 : a > u ? f += 2 : a == u && (r += n[c + 1] * i[f + 1],
                                c += 2,
                                f += 2);
                    return r
                }
                ,
                t.Vector.prototype.similarity = function (e) {
                    return this.dot(e) / this.magnitude() || 0
                }
                ,
                t.Vector.prototype.toArray = function () {
                    for (var e = new Array(this.elements.length / 2), r = 1, n = 0; r < this.elements.length; r += 2,
                        n++)
                        e[n] = this.elements[r];
                    return e
                }
                ,
                t.Vector.prototype.toJSON = function () {
                    return this.elements
                }
                ;
            /*!
 * lunr.stemmer
 * Copyright (C) 2020 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */
            t.stemmer = function () {
                var e = {
                    ational: "ate",
                    tional: "tion",
                    enci: "ence",
                    anci: "ance",
                    izer: "ize",
                    bli: "ble",
                    alli: "al",
                    entli: "ent",
                    eli: "e",
                    ousli: "ous",
                    ization: "ize",
                    ation: "ate",
                    ator: "ate",
                    alism: "al",
                    iveness: "ive",
                    fulness: "ful",
                    ousness: "ous",
                    aliti: "al",
                    iviti: "ive",
                    biliti: "ble",
                    logi: "log"
                }
                    , r = {
                        icate: "ic",
                        ative: "",
                        alize: "al",
                        iciti: "ic",
                        ical: "ic",
                        ful: "",
                        ness: ""
                    }
                    , n = "[^aeiou]"
                    , i = "[aeiouy]"
                    , s = n + "[^aeiouy]*"
                    , o = i + "[aeiou]*"
                    , a = "^(" + s + ")?" + o + s
                    , u = "^(" + s + ")?" + o + s + "(" + o + ")?$"
                    , c = "^(" + s + ")?" + o + s + o + s
                    , f = "^(" + s + ")?" + i
                    , g = new RegExp(a)
                    , l = new RegExp(c)
                    , m = new RegExp(u)
                    , x = new RegExp(f)
                    , v = /^(.+?)(ss|i)es$/
                    , d = /^(.+?)([^s])s$/
                    , y = /^(.+?)eed$/
                    , b = /^(.+?)(ed|ing)$/
                    , E = /.$/
                    , w = /(at|bl|iz)$/
                    , R = new RegExp("([^aeiouylsz])\\1$")
                    , j = new RegExp("^" + s + i + "[^aeiouwxy]$")
                    , _ = /^(.+?[^aeiou])y$/
                    , D = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/
                    , N = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/
                    , C = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/
                    , V = /^(.+?)(s|t)(ion)$/
                    , P = /^(.+?)e$/
                    , z = /ll$/
                    , $ = new RegExp("^" + s + i + "[^aeiouwxy]$")
                    , M = function (h) {
                        var S, k, L, p, T, O, F;
                        if (h.length < 3)
                            return h;
                        if (L = h.substr(0, 1),
                            L == "y" && (h = L.toUpperCase() + h.substr(1)),
                            p = v,
                            T = d,
                            p.test(h) ? h = h.replace(p, "$1$2") : T.test(h) && (h = h.replace(T, "$1$2")),
                            p = y,
                            T = b,
                            p.test(h)) {
                            var Q = p.exec(h);
                            p = g,
                                p.test(Q[1]) && (p = E,
                                    h = h.replace(p, ""))
                        } else if (T.test(h)) {
                            var Q = T.exec(h);
                            S = Q[1],
                                T = x,
                                T.test(S) && (h = S,
                                    T = w,
                                    O = R,
                                    F = j,
                                    T.test(h) ? h = h + "e" : O.test(h) ? (p = E,
                                        h = h.replace(p, "")) : F.test(h) && (h = h + "e"))
                        }
                        if (p = _,
                            p.test(h)) {
                            var Q = p.exec(h);
                            S = Q[1],
                                h = S + "i"
                        }
                        if (p = D,
                            p.test(h)) {
                            var Q = p.exec(h);
                            S = Q[1],
                                k = Q[2],
                                p = g,
                                p.test(S) && (h = S + e[k])
                        }
                        if (p = N,
                            p.test(h)) {
                            var Q = p.exec(h);
                            S = Q[1],
                                k = Q[2],
                                p = g,
                                p.test(S) && (h = S + r[k])
                        }
                        if (p = C,
                            T = V,
                            p.test(h)) {
                            var Q = p.exec(h);
                            S = Q[1],
                                p = l,
                                p.test(S) && (h = S)
                        } else if (T.test(h)) {
                            var Q = T.exec(h);
                            S = Q[1] + Q[2],
                                T = l,
                                T.test(S) && (h = S)
                        }
                        if (p = P,
                            p.test(h)) {
                            var Q = p.exec(h);
                            S = Q[1],
                                p = l,
                                T = m,
                                O = $,
                                (p.test(S) || T.test(S) && !O.test(S)) && (h = S)
                        }
                        return p = z,
                            T = l,
                            p.test(h) && T.test(h) && (p = E,
                                h = h.replace(p, "")),
                            L == "y" && (h = L.toLowerCase() + h.substr(1)),
                            h
                    };
                return function (I) {
                    return I.update(M)
                }
            }(),
                t.Pipeline.registerFunction(t.stemmer, "stemmer");
            /*!
 * lunr.stopWordFilter
 * Copyright (C) 2020 Oliver Nightingale
 */
            t.generateStopWordFilter = function (e) {
                var r = e.reduce(function (n, i) {
                    return n[i] = i,
                        n
                }, {});
                return function (n) {
                    if (n && r[n.toString()] !== n.toString())
                        return n
                }
            }
                ,
                t.stopWordFilter = t.generateStopWordFilter(["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your"]),
                t.Pipeline.registerFunction(t.stopWordFilter, "stopWordFilter");
            /*!
 * lunr.trimmer
 * Copyright (C) 2020 Oliver Nightingale
 */
            t.trimmer = function (e) {
                return e.update(function (r) {
                    return r.replace(/^\W+/, "").replace(/\W+$/, "")
                })
            }
                ,
                t.Pipeline.registerFunction(t.trimmer, "trimmer");
            /*!
 * lunr.TokenSet
 * Copyright (C) 2020 Oliver Nightingale
 */
            t.TokenSet = function () {
                this.final = !1,
                    this.edges = {},
                    this.id = t.TokenSet._nextId,
                    t.TokenSet._nextId += 1
            }
                ,
                t.TokenSet._nextId = 1,
                t.TokenSet.fromArray = function (e) {
                    for (var r = new t.TokenSet.Builder, n = 0, i = e.length; n < i; n++)
                        r.insert(e[n]);
                    return r.finish(),
                        r.root
                }
                ,
                t.TokenSet.fromClause = function (e) {
                    return "editDistance" in e ? t.TokenSet.fromFuzzyString(e.term, e.editDistance) : t.TokenSet.fromString(e.term)
                }
                ,
                t.TokenSet.fromFuzzyString = function (e, r) {
                    for (var n = new t.TokenSet, i = [{
                        node: n,
                        editsRemaining: r,
                        str: e
                    }]; i.length;) {
                        var s = i.pop();
                        if (s.str.length > 0) {
                            var o = s.str.charAt(0), a;
                            o in s.node.edges ? a = s.node.edges[o] : (a = new t.TokenSet,
                                s.node.edges[o] = a),
                                s.str.length == 1 && (a.final = !0),
                                i.push({
                                    node: a,
                                    editsRemaining: s.editsRemaining,
                                    str: s.str.slice(1)
                                })
                        }
                        if (s.editsRemaining != 0) {
                            if ("*" in s.node.edges)
                                var u = s.node.edges["*"];
                            else {
                                var u = new t.TokenSet;
                                s.node.edges["*"] = u
                            }
                            if (s.str.length == 0 && (u.final = !0),
                                i.push({
                                    node: u,
                                    editsRemaining: s.editsRemaining - 1,
                                    str: s.str
                                }),
                                s.str.length > 1 && i.push({
                                    node: s.node,
                                    editsRemaining: s.editsRemaining - 1,
                                    str: s.str.slice(1)
                                }),
                                s.str.length == 1 && (s.node.final = !0),
                                s.str.length >= 1) {
                                if ("*" in s.node.edges)
                                    var c = s.node.edges["*"];
                                else {
                                    var c = new t.TokenSet;
                                    s.node.edges["*"] = c
                                }
                                s.str.length == 1 && (c.final = !0),
                                    i.push({
                                        node: c,
                                        editsRemaining: s.editsRemaining - 1,
                                        str: s.str.slice(1)
                                    })
                            }
                            if (s.str.length > 1) {
                                var f = s.str.charAt(0), g = s.str.charAt(1), l;
                                g in s.node.edges ? l = s.node.edges[g] : (l = new t.TokenSet,
                                    s.node.edges[g] = l),
                                    s.str.length == 1 && (l.final = !0),
                                    i.push({
                                        node: l,
                                        editsRemaining: s.editsRemaining - 1,
                                        str: f + s.str.slice(2)
                                    })
                            }
                        }
                    }
                    return n
                }
                ,
                t.TokenSet.fromString = function (e) {
                    for (var r = new t.TokenSet, n = r, i = 0, s = e.length; i < s; i++) {
                        var o = e[i]
                            , a = i == s - 1;
                        if (o == "*")
                            r.edges[o] = r,
                                r.final = a;
                        else {
                            var u = new t.TokenSet;
                            u.final = a,
                                r.edges[o] = u,
                                r = u
                        }
                    }
                    return n
                }
                ,
                t.TokenSet.prototype.toArray = function () {
                    for (var e = [], r = [{
                        prefix: "",
                        node: this
                    }]; r.length;) {
                        var n = r.pop()
                            , i = Object.keys(n.node.edges)
                            , s = i.length;
                        n.node.final && (n.prefix.charAt(0),
                            e.push(n.prefix));
                        for (var o = 0; o < s; o++) {
                            var a = i[o];
                            r.push({
                                prefix: n.prefix.concat(a),
                                node: n.node.edges[a]
                            })
                        }
                    }
                    return e
                }
                ,
                t.TokenSet.prototype.toString = function () {
                    if (this._str)
                        return this._str;
                    for (var e = this.final ? "1" : "0", r = Object.keys(this.edges).sort(), n = r.length, i = 0; i < n; i++) {
                        var s = r[i]
                            , o = this.edges[s];
                        e = e + s + o.id
                    }
                    return e
                }
                ,
                t.TokenSet.prototype.intersect = function (e) {
                    for (var r = new t.TokenSet, n = void 0, i = [{
                        qNode: e,
                        output: r,
                        node: this
                    }]; i.length;) {
                        n = i.pop();
                        for (var s = Object.keys(n.qNode.edges), o = s.length, a = Object.keys(n.node.edges), u = a.length, c = 0; c < o; c++)
                            for (var f = s[c], g = 0; g < u; g++) {
                                var l = a[g];
                                if (l == f || f == "*") {
                                    var m = n.node.edges[l]
                                        , x = n.qNode.edges[f]
                                        , v = m.final && x.final
                                        , d = void 0;
                                    l in n.output.edges ? (d = n.output.edges[l],
                                        d.final = d.final || v) : (d = new t.TokenSet,
                                            d.final = v,
                                            n.output.edges[l] = d),
                                        i.push({
                                            qNode: x,
                                            output: d,
                                            node: m
                                        })
                                }
                            }
                    }
                    return r
                }
                ,
                t.TokenSet.Builder = function () {
                    this.previousWord = "",
                        this.root = new t.TokenSet,
                        this.uncheckedNodes = [],
                        this.minimizedNodes = {}
                }
                ,
                t.TokenSet.Builder.prototype.insert = function (e) {
                    var r, n = 0;
                    if (e < this.previousWord)
                        throw new Error("Out of order word insertion");
                    for (var i = 0; i < e.length && i < this.previousWord.length && e[i] == this.previousWord[i]; i++)
                        n++;
                    this.minimize(n),
                        this.uncheckedNodes.length == 0 ? r = this.root : r = this.uncheckedNodes[this.uncheckedNodes.length - 1].child;
                    for (var i = n; i < e.length; i++) {
                        var s = new t.TokenSet
                            , o = e[i];
                        r.edges[o] = s,
                            this.uncheckedNodes.push({
                                parent: r,
                                char: o,
                                child: s
                            }),
                            r = s
                    }
                    r.final = !0,
                        this.previousWord = e
                }
                ,
                t.TokenSet.Builder.prototype.finish = function () {
                    this.minimize(0)
                }
                ,
                t.TokenSet.Builder.prototype.minimize = function (e) {
                    for (var r = this.uncheckedNodes.length - 1; r >= e; r--) {
                        var n = this.uncheckedNodes[r]
                            , i = n.child.toString();
                        i in this.minimizedNodes ? n.parent.edges[n.char] = this.minimizedNodes[i] : (n.child._str = i,
                            this.minimizedNodes[i] = n.child),
                            this.uncheckedNodes.pop()
                    }
                }
                ;
            /*!
 * lunr.Index
 * Copyright (C) 2020 Oliver Nightingale
 */
            t.Index = function (e) {
                this.invertedIndex = e.invertedIndex,
                    this.fieldVectors = e.fieldVectors,
                    this.tokenSet = e.tokenSet,
                    this.fields = e.fields,
                    this.pipeline = e.pipeline
            }
                ,
                t.Index.prototype.search = function (e) {
                    return this.query(function (r) {
                        var n = new t.QueryParser(e, r);
                        n.parse()
                    })
                }
                ,
                t.Index.prototype.query = function (e) {
                    for (var r = new t.Query(this.fields), n = Object.create(null), i = Object.create(null), s = Object.create(null), o = Object.create(null), a = Object.create(null), u = 0; u < this.fields.length; u++)
                        i[this.fields[u]] = new t.Vector;
                    e.call(r, r);
                    for (var u = 0; u < r.clauses.length; u++) {
                        var c = r.clauses[u]
                            , f = null
                            , g = t.Set.empty;
                        c.usePipeline ? f = this.pipeline.runString(c.term, {
                            fields: c.fields
                        }) : f = [c.term];
                        for (var l = 0; l < f.length; l++) {
                            var m = f[l];
                            c.term = m;
                            var x = t.TokenSet.fromClause(c)
                                , v = this.tokenSet.intersect(x).toArray();
                            if (v.length === 0 && c.presence === t.Query.presence.REQUIRED) {
                                for (var d = 0; d < c.fields.length; d++) {
                                    var y = c.fields[d];
                                    o[y] = t.Set.empty
                                }
                                break
                            }
                            for (var b = 0; b < v.length; b++)
                                for (var E = v[b], w = this.invertedIndex[E], R = w._index, d = 0; d < c.fields.length; d++) {
                                    var y = c.fields[d]
                                        , j = w[y]
                                        , _ = Object.keys(j)
                                        , D = E + "/" + y
                                        , N = new t.Set(_);
                                    if (c.presence == t.Query.presence.REQUIRED && (g = g.union(N),
                                        o[y] === void 0 && (o[y] = t.Set.complete)),
                                        c.presence == t.Query.presence.PROHIBITED) {
                                        a[y] === void 0 && (a[y] = t.Set.empty),
                                            a[y] = a[y].union(N);
                                        continue
                                    }
                                    if (i[y].upsert(R, c.boost, function (ye, me) {
                                        return ye + me
                                    }),
                                        !s[D]) {
                                        for (var C = 0; C < _.length; C++) {
                                            var V = _[C], P = new t.FieldRef(V, y), z = j[V], $;
                                            ($ = n[P]) === void 0 ? n[P] = new t.MatchData(E, y, z) : $.add(E, y, z)
                                        }
                                        s[D] = !0
                                    }
                                }
                        }
                        if (c.presence === t.Query.presence.REQUIRED)
                            for (var d = 0; d < c.fields.length; d++) {
                                var y = c.fields[d];
                                o[y] = o[y].intersect(g)
                            }
                    }
                    for (var M = t.Set.complete, I = t.Set.empty, u = 0; u < this.fields.length; u++) {
                        var y = this.fields[u];
                        o[y] && (M = M.intersect(o[y])),
                            a[y] && (I = I.union(a[y]))
                    }
                    var h = Object.keys(n)
                        , S = []
                        , k = Object.create(null);
                    if (r.isNegated()) {
                        h = Object.keys(this.fieldVectors);
                        for (var u = 0; u < h.length; u++) {
                            var P = h[u]
                                , L = t.FieldRef.fromString(P);
                            n[P] = new t.MatchData
                        }
                    }
                    for (var u = 0; u < h.length; u++) {
                        var L = t.FieldRef.fromString(h[u])
                            , p = L.docRef;
                        if (M.contains(p) && !I.contains(p)) {
                            var T = this.fieldVectors[L], O = i[L.fieldName].similarity(T), F;
                            if ((F = k[p]) !== void 0)
                                F.score += O,
                                    F.matchData.combine(n[L]);
                            else {
                                var Q = {
                                    ref: p,
                                    score: O,
                                    matchData: n[L]
                                };
                                k[p] = Q,
                                    S.push(Q)
                            }
                        }
                    }
                    return S.sort(function (pe, ge) {
                        return ge.score - pe.score
                    })
                }
                ,
                t.Index.prototype.toJSON = function () {
                    var e = Object.keys(this.invertedIndex).sort().map(function (n) {
                        return [n, this.invertedIndex[n]]
                    }, this)
                        , r = Object.keys(this.fieldVectors).map(function (n) {
                            return [n, this.fieldVectors[n].toJSON()]
                        }, this);
                    return {
                        version: t.version,
                        fields: this.fields,
                        fieldVectors: r,
                        invertedIndex: e,
                        pipeline: this.pipeline.toJSON()
                    }
                }
                ,
                t.Index.load = function (e) {
                    var r = {}
                        , n = {}
                        , i = e.fieldVectors
                        , s = Object.create(null)
                        , o = e.invertedIndex
                        , a = new t.TokenSet.Builder
                        , u = t.Pipeline.load(e.pipeline);
                    e.version != t.version && t.utils.warn("Version mismatch when loading serialised index. Current version of lunr '" + t.version + "' does not match serialized index '" + e.version + "'");
                    for (var c = 0; c < i.length; c++) {
                        var f = i[c]
                            , g = f[0]
                            , l = f[1];
                        n[g] = new t.Vector(l)
                    }
                    for (var c = 0; c < o.length; c++) {
                        var f = o[c]
                            , m = f[0]
                            , x = f[1];
                        a.insert(m),
                            s[m] = x
                    }
                    return a.finish(),
                        r.fields = e.fields,
                        r.fieldVectors = n,
                        r.invertedIndex = s,
                        r.tokenSet = a.root,
                        r.pipeline = u,
                        new t.Index(r)
                }
                ;
            /*!
 * lunr.Builder
 * Copyright (C) 2020 Oliver Nightingale
 */
            t.Builder = function () {
                this._ref = "id",
                    this._fields = Object.create(null),
                    this._documents = Object.create(null),
                    this.invertedIndex = Object.create(null),
                    this.fieldTermFrequencies = {},
                    this.fieldLengths = {},
                    this.tokenizer = t.tokenizer,
                    this.pipeline = new t.Pipeline,
                    this.searchPipeline = new t.Pipeline,
                    this.documentCount = 0,
                    this._b = .75,
                    this._k1 = 1.2,
                    this.termIndex = 0,
                    this.metadataWhitelist = []
            }
                ,
                t.Builder.prototype.ref = function (e) {
                    this._ref = e
                }
                ,
                t.Builder.prototype.field = function (e, r) {
                    if (/\//.test(e))
                        throw new RangeError("Field '" + e + "' contains illegal character '/'");
                    this._fields[e] = r || {}
                }
                ,
                t.Builder.prototype.b = function (e) {
                    e < 0 ? this._b = 0 : e > 1 ? this._b = 1 : this._b = e
                }
                ,
                t.Builder.prototype.k1 = function (e) {
                    this._k1 = e
                }
                ,
                t.Builder.prototype.add = function (e, r) {
                    var n = e[this._ref]
                        , i = Object.keys(this._fields);
                    this._documents[n] = r || {},
                        this.documentCount += 1;
                    for (var s = 0; s < i.length; s++) {
                        var o = i[s]
                            , a = this._fields[o].extractor
                            , u = a ? a(e) : e[o]
                            , c = this.tokenizer(u, {
                                fields: [o]
                            })
                            , f = this.pipeline.run(c)
                            , g = new t.FieldRef(n, o)
                            , l = Object.create(null);
                        this.fieldTermFrequencies[g] = l,
                            this.fieldLengths[g] = 0,
                            this.fieldLengths[g] += f.length;
                        for (var m = 0; m < f.length; m++) {
                            var x = f[m];
                            if (l[x] == null && (l[x] = 0),
                                l[x] += 1,
                                this.invertedIndex[x] == null) {
                                var v = Object.create(null);
                                v._index = this.termIndex,
                                    this.termIndex += 1;
                                for (var d = 0; d < i.length; d++)
                                    v[i[d]] = Object.create(null);
                                this.invertedIndex[x] = v
                            }
                            this.invertedIndex[x][o][n] == null && (this.invertedIndex[x][o][n] = Object.create(null));
                            for (var y = 0; y < this.metadataWhitelist.length; y++) {
                                var b = this.metadataWhitelist[y]
                                    , E = x.metadata[b];
                                this.invertedIndex[x][o][n][b] == null && (this.invertedIndex[x][o][n][b] = []),
                                    this.invertedIndex[x][o][n][b].push(E)
                            }
                        }
                    }
                }
                ,
                t.Builder.prototype.calculateAverageFieldLengths = function () {
                    for (var e = Object.keys(this.fieldLengths), r = e.length, n = {}, i = {}, s = 0; s < r; s++) {
                        var o = t.FieldRef.fromString(e[s])
                            , a = o.fieldName;
                        i[a] || (i[a] = 0),
                            i[a] += 1,
                            n[a] || (n[a] = 0),
                            n[a] += this.fieldLengths[o]
                    }
                    for (var u = Object.keys(this._fields), s = 0; s < u.length; s++) {
                        var c = u[s];
                        n[c] = n[c] / i[c]
                    }
                    this.averageFieldLength = n
                }
                ,
                t.Builder.prototype.createFieldVectors = function () {
                    for (var e = {}, r = Object.keys(this.fieldTermFrequencies), n = r.length, i = Object.create(null), s = 0; s < n; s++) {
                        for (var o = t.FieldRef.fromString(r[s]), a = o.fieldName, u = this.fieldLengths[o], c = new t.Vector, f = this.fieldTermFrequencies[o], g = Object.keys(f), l = g.length, m = this._fields[a].boost || 1, x = this._documents[o.docRef].boost || 1, v = 0; v < l; v++) {
                            var d = g[v], y = f[d], b = this.invertedIndex[d]._index, E, w, R;
                            i[d] === void 0 ? (E = t.idf(this.invertedIndex[d], this.documentCount),
                                i[d] = E) : E = i[d],
                                w = E * ((this._k1 + 1) * y) / (this._k1 * (1 - this._b + this._b * (u / this.averageFieldLength[a])) + y),
                                w *= m,
                                w *= x,
                                R = Math.round(w * 1e3) / 1e3,
                                c.insert(b, R)
                        }
                        e[o] = c
                    }
                    this.fieldVectors = e
                }
                ,
                t.Builder.prototype.createTokenSet = function () {
                    this.tokenSet = t.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())
                }
                ,
                t.Builder.prototype.build = function () {
                    return this.calculateAverageFieldLengths(),
                        this.createFieldVectors(),
                        this.createTokenSet(),
                        new t.Index({
                            invertedIndex: this.invertedIndex,
                            fieldVectors: this.fieldVectors,
                            tokenSet: this.tokenSet,
                            fields: Object.keys(this._fields),
                            pipeline: this.searchPipeline
                        })
                }
                ,
                t.Builder.prototype.use = function (e) {
                    var r = Array.prototype.slice.call(arguments, 1);
                    r.unshift(this),
                        e.apply(this, r)
                }
                ,
                t.MatchData = function (e, r, n) {
                    for (var i = Object.create(null), s = Object.keys(n || {}), o = 0; o < s.length; o++) {
                        var a = s[o];
                        i[a] = n[a].slice()
                    }
                    this.metadata = Object.create(null),
                        e !== void 0 && (this.metadata[e] = Object.create(null),
                            this.metadata[e][r] = i)
                }
                ,
                t.MatchData.prototype.combine = function (e) {
                    for (var r = Object.keys(e.metadata), n = 0; n < r.length; n++) {
                        var i = r[n]
                            , s = Object.keys(e.metadata[i]);
                        this.metadata[i] == null && (this.metadata[i] = Object.create(null));
                        for (var o = 0; o < s.length; o++) {
                            var a = s[o]
                                , u = Object.keys(e.metadata[i][a]);
                            this.metadata[i][a] == null && (this.metadata[i][a] = Object.create(null));
                            for (var c = 0; c < u.length; c++) {
                                var f = u[c];
                                this.metadata[i][a][f] == null ? this.metadata[i][a][f] = e.metadata[i][a][f] : this.metadata[i][a][f] = this.metadata[i][a][f].concat(e.metadata[i][a][f])
                            }
                        }
                    }
                }
                ,
                t.MatchData.prototype.add = function (e, r, n) {
                    if (!(e in this.metadata)) {
                        this.metadata[e] = Object.create(null),
                            this.metadata[e][r] = n;
                        return
                    }
                    if (!(r in this.metadata[e])) {
                        this.metadata[e][r] = n;
                        return
                    }
                    for (var i = Object.keys(n), s = 0; s < i.length; s++) {
                        var o = i[s];
                        o in this.metadata[e][r] ? this.metadata[e][r][o] = this.metadata[e][r][o].concat(n[o]) : this.metadata[e][r][o] = n[o]
                    }
                }
                ,
                t.Query = function (e) {
                    this.clauses = [],
                        this.allFields = e
                }
                ,
                t.Query.wildcard = new String("*"),
                t.Query.wildcard.NONE = 0,
                t.Query.wildcard.LEADING = 1,
                t.Query.wildcard.TRAILING = 2,
                t.Query.presence = {
                    OPTIONAL: 1,
                    REQUIRED: 2,
                    PROHIBITED: 3
                },
                t.Query.prototype.clause = function (e) {
                    return "fields" in e || (e.fields = this.allFields),
                        "boost" in e || (e.boost = 1),
                        "usePipeline" in e || (e.usePipeline = !0),
                        "wildcard" in e || (e.wildcard = t.Query.wildcard.NONE),
                        e.wildcard & t.Query.wildcard.LEADING && e.term.charAt(0) != t.Query.wildcard && (e.term = "*" + e.term),
                        e.wildcard & t.Query.wildcard.TRAILING && e.term.slice(-1) != t.Query.wildcard && (e.term = "" + e.term + "*"),
                        "presence" in e || (e.presence = t.Query.presence.OPTIONAL),
                        this.clauses.push(e),
                        this
                }
                ,
                t.Query.prototype.isNegated = function () {
                    for (var e = 0; e < this.clauses.length; e++)
                        if (this.clauses[e].presence != t.Query.presence.PROHIBITED)
                            return !1;
                    return !0
                }
                ,
                t.Query.prototype.term = function (e, r) {
                    if (Array.isArray(e))
                        return e.forEach(function (i) {
                            this.term(i, t.utils.clone(r))
                        }, this),
                            this;
                    var n = r || {};
                    return n.term = e.toString(),
                        this.clause(n),
                        this
                }
                ,
                t.QueryParseError = function (e, r, n) {
                    this.name = "QueryParseError",
                        this.message = e,
                        this.start = r,
                        this.end = n
                }
                ,
                t.QueryParseError.prototype = new Error,
                t.QueryLexer = function (e) {
                    this.lexemes = [],
                        this.str = e,
                        this.length = e.length,
                        this.pos = 0,
                        this.start = 0,
                        this.escapeCharPositions = []
                }
                ,
                t.QueryLexer.prototype.run = function () {
                    for (var e = t.QueryLexer.lexText; e;)
                        e = e(this)
                }
                ,
                t.QueryLexer.prototype.sliceString = function () {
                    for (var e = [], r = this.start, n = this.pos, i = 0; i < this.escapeCharPositions.length; i++)
                        n = this.escapeCharPositions[i],
                            e.push(this.str.slice(r, n)),
                            r = n + 1;
                    return e.push(this.str.slice(r, this.pos)),
                        this.escapeCharPositions.length = 0,
                        e.join("")
                }
                ,
                t.QueryLexer.prototype.emit = function (e) {
                    this.lexemes.push({
                        type: e,
                        str: this.sliceString(),
                        start: this.start,
                        end: this.pos
                    }),
                        this.start = this.pos
                }
                ,
                t.QueryLexer.prototype.escapeCharacter = function () {
                    this.escapeCharPositions.push(this.pos - 1),
                        this.pos += 1
                }
                ,
                t.QueryLexer.prototype.next = function () {
                    if (this.pos >= this.length)
                        return t.QueryLexer.EOS;
                    var e = this.str.charAt(this.pos);
                    return this.pos += 1,
                        e
                }
                ,
                t.QueryLexer.prototype.width = function () {
                    return this.pos - this.start
                }
                ,
                t.QueryLexer.prototype.ignore = function () {
                    this.start == this.pos && (this.pos += 1),
                        this.start = this.pos
                }
                ,
                t.QueryLexer.prototype.backup = function () {
                    this.pos -= 1
                }
                ,
                t.QueryLexer.prototype.acceptDigitRun = function () {
                    var e, r;
                    do
                        e = this.next(),
                            r = e.charCodeAt(0);
                    while (r > 47 && r < 58);
                    e != t.QueryLexer.EOS && this.backup()
                }
                ,
                t.QueryLexer.prototype.more = function () {
                    return this.pos < this.length
                }
                ,
                t.QueryLexer.EOS = "EOS",
                t.QueryLexer.FIELD = "FIELD",
                t.QueryLexer.TERM = "TERM",
                t.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE",
                t.QueryLexer.BOOST = "BOOST",
                t.QueryLexer.PRESENCE = "PRESENCE",
                t.QueryLexer.lexField = function (e) {
                    return e.backup(),
                        e.emit(t.QueryLexer.FIELD),
                        e.ignore(),
                        t.QueryLexer.lexText
                }
                ,
                t.QueryLexer.lexTerm = function (e) {
                    if (e.width() > 1 && (e.backup(),
                        e.emit(t.QueryLexer.TERM)),
                        e.ignore(),
                        e.more())
                        return t.QueryLexer.lexText
                }
                ,
                t.QueryLexer.lexEditDistance = function (e) {
                    return e.ignore(),
                        e.acceptDigitRun(),
                        e.emit(t.QueryLexer.EDIT_DISTANCE),
                        t.QueryLexer.lexText
                }
                ,
                t.QueryLexer.lexBoost = function (e) {
                    return e.ignore(),
                        e.acceptDigitRun(),
                        e.emit(t.QueryLexer.BOOST),
                        t.QueryLexer.lexText
                }
                ,
                t.QueryLexer.lexEOS = function (e) {
                    e.width() > 0 && e.emit(t.QueryLexer.TERM)
                }
                ,
                t.QueryLexer.termSeparator = t.tokenizer.separator,
                t.QueryLexer.lexText = function (e) {
                    for (; ;) {
                        var r = e.next();
                        if (r == t.QueryLexer.EOS)
                            return t.QueryLexer.lexEOS;
                        if (r.charCodeAt(0) == 92) {
                            e.escapeCharacter();
                            continue
                        }
                        if (r == ":")
                            return t.QueryLexer.lexField;
                        if (r == "~")
                            return e.backup(),
                                e.width() > 0 && e.emit(t.QueryLexer.TERM),
                                t.QueryLexer.lexEditDistance;
                        if (r == "^")
                            return e.backup(),
                                e.width() > 0 && e.emit(t.QueryLexer.TERM),
                                t.QueryLexer.lexBoost;
                        if (r == "+" && e.width() === 1 || r == "-" && e.width() === 1)
                            return e.emit(t.QueryLexer.PRESENCE),
                                t.QueryLexer.lexText;
                        if (r.match(t.QueryLexer.termSeparator))
                            return t.QueryLexer.lexTerm
                    }
                }
                ,
                t.QueryParser = function (e, r) {
                    this.lexer = new t.QueryLexer(e),
                        this.query = r,
                        this.currentClause = {},
                        this.lexemeIdx = 0
                }
                ,
                t.QueryParser.prototype.parse = function () {
                    this.lexer.run(),
                        this.lexemes = this.lexer.lexemes;
                    for (var e = t.QueryParser.parseClause; e;)
                        e = e(this);
                    return this.query
                }
                ,
                t.QueryParser.prototype.peekLexeme = function () {
                    return this.lexemes[this.lexemeIdx]
                }
                ,
                t.QueryParser.prototype.consumeLexeme = function () {
                    var e = this.peekLexeme();
                    return this.lexemeIdx += 1,
                        e
                }
                ,
                t.QueryParser.prototype.nextClause = function () {
                    var e = this.currentClause;
                    this.query.clause(e),
                        this.currentClause = {}
                }
                ,
                t.QueryParser.parseClause = function (e) {
                    var r = e.peekLexeme();
                    if (r != null)
                        switch (r.type) {
                            case t.QueryLexer.PRESENCE:
                                return t.QueryParser.parsePresence;
                            case t.QueryLexer.FIELD:
                                return t.QueryParser.parseField;
                            case t.QueryLexer.TERM:
                                return t.QueryParser.parseTerm;
                            default:
                                var n = "expected either a field or a term, found " + r.type;
                                throw r.str.length >= 1 && (n += " with value '" + r.str + "'"),
                                new t.QueryParseError(n, r.start, r.end)
                        }
                }
                ,
                t.QueryParser.parsePresence = function (e) {
                    var r = e.consumeLexeme();
                    if (r != null) {
                        switch (r.str) {
                            case "-":
                                e.currentClause.presence = t.Query.presence.PROHIBITED;
                                break;
                            case "+":
                                e.currentClause.presence = t.Query.presence.REQUIRED;
                                break;
                            default:
                                var n = "unrecognised presence operator'" + r.str + "'";
                                throw new t.QueryParseError(n, r.start, r.end)
                        }
                        var i = e.peekLexeme();
                        if (i == null) {
                            var n = "expecting term or field, found nothing";
                            throw new t.QueryParseError(n, r.start, r.end)
                        }
                        switch (i.type) {
                            case t.QueryLexer.FIELD:
                                return t.QueryParser.parseField;
                            case t.QueryLexer.TERM:
                                return t.QueryParser.parseTerm;
                            default:
                                var n = "expecting term or field, found '" + i.type + "'";
                                throw new t.QueryParseError(n, i.start, i.end)
                        }
                    }
                }
                ,
                t.QueryParser.parseField = function (e) {
                    var r = e.consumeLexeme();
                    if (r != null) {
                        if (e.query.allFields.indexOf(r.str) == -1) {
                            var n = e.query.allFields.map(function (o) {
                                return "'" + o + "'"
                            }).join(", ")
                                , i = "unrecognised field '" + r.str + "', possible fields: " + n;
                            throw new t.QueryParseError(i, r.start, r.end)
                        }
                        e.currentClause.fields = [r.str];
                        var s = e.peekLexeme();
                        if (s == null) {
                            var i = "expecting term, found nothing";
                            throw new t.QueryParseError(i, r.start, r.end)
                        }
                        switch (s.type) {
                            case t.QueryLexer.TERM:
                                return t.QueryParser.parseTerm;
                            default:
                                var i = "expecting term, found '" + s.type + "'";
                                throw new t.QueryParseError(i, s.start, s.end)
                        }
                    }
                }
                ,
                t.QueryParser.parseTerm = function (e) {
                    var r = e.consumeLexeme();
                    if (r != null) {
                        e.currentClause.term = r.str.toLowerCase(),
                            r.str.indexOf("*") != -1 && (e.currentClause.usePipeline = !1);
                        var n = e.peekLexeme();
                        if (n == null) {
                            e.nextClause();
                            return
                        }
                        switch (n.type) {
                            case t.QueryLexer.TERM:
                                return e.nextClause(),
                                    t.QueryParser.parseTerm;
                            case t.QueryLexer.FIELD:
                                return e.nextClause(),
                                    t.QueryParser.parseField;
                            case t.QueryLexer.EDIT_DISTANCE:
                                return t.QueryParser.parseEditDistance;
                            case t.QueryLexer.BOOST:
                                return t.QueryParser.parseBoost;
                            case t.QueryLexer.PRESENCE:
                                return e.nextClause(),
                                    t.QueryParser.parsePresence;
                            default:
                                var i = "Unexpected lexeme type '" + n.type + "'";
                                throw new t.QueryParseError(i, n.start, n.end)
                        }
                    }
                }
                ,
                t.QueryParser.parseEditDistance = function (e) {
                    var r = e.consumeLexeme();
                    if (r != null) {
                        var n = parseInt(r.str, 10);
                        if (isNaN(n)) {
                            var i = "edit distance must be numeric";
                            throw new t.QueryParseError(i, r.start, r.end)
                        }
                        e.currentClause.editDistance = n;
                        var s = e.peekLexeme();
                        if (s == null) {
                            e.nextClause();
                            return
                        }
                        switch (s.type) {
                            case t.QueryLexer.TERM:
                                return e.nextClause(),
                                    t.QueryParser.parseTerm;
                            case t.QueryLexer.FIELD:
                                return e.nextClause(),
                                    t.QueryParser.parseField;
                            case t.QueryLexer.EDIT_DISTANCE:
                                return t.QueryParser.parseEditDistance;
                            case t.QueryLexer.BOOST:
                                return t.QueryParser.parseBoost;
                            case t.QueryLexer.PRESENCE:
                                return e.nextClause(),
                                    t.QueryParser.parsePresence;
                            default:
                                var i = "Unexpected lexeme type '" + s.type + "'";
                                throw new t.QueryParseError(i, s.start, s.end)
                        }
                    }
                }
                ,
                t.QueryParser.parseBoost = function (e) {
                    var r = e.consumeLexeme();
                    if (r != null) {
                        var n = parseInt(r.str, 10);
                        if (isNaN(n)) {
                            var i = "boost must be numeric";
                            throw new t.QueryParseError(i, r.start, r.end)
                        }
                        e.currentClause.boost = n;
                        var s = e.peekLexeme();
                        if (s == null) {
                            e.nextClause();
                            return
                        }
                        switch (s.type) {
                            case t.QueryLexer.TERM:
                                return e.nextClause(),
                                    t.QueryParser.parseTerm;
                            case t.QueryLexer.FIELD:
                                return e.nextClause(),
                                    t.QueryParser.parseField;
                            case t.QueryLexer.EDIT_DISTANCE:
                                return t.QueryParser.parseEditDistance;
                            case t.QueryLexer.BOOST:
                                return t.QueryParser.parseBoost;
                            case t.QueryLexer.PRESENCE:
                                return e.nextClause(),
                                    t.QueryParser.parsePresence;
                            default:
                                var i = "Unexpected lexeme type '" + s.type + "'";
                                throw new t.QueryParseError(i, s.start, s.end)
                        }
                    }
                }
                ,
                function (e, r) {
                    typeof define == "function" && define.amd ? define(r) : typeof ee == "object" ? te.exports = r() : e.lunr = r()
                }(this, function () {
                    return t
                })
        }
        )()
    }
    );
    var Y = Pe(re());
    function ne(t, e = document) {
        let r = ke(t, e);
        if (typeof r == "undefined")
            throw new ReferenceError(`Missing element: expected "${t}" to be present`);
        return r
    }
    function ke(t, e = document) {
        return e.querySelector(t) || void 0
    }
    Object.entries || (Object.entries = function (t) {
        let e = [];
        for (let r of Object.keys(t))
            e.push([r, t[r]]);
        return e
    }
    );
    Object.values || (Object.values = function (t) {
        let e = [];
        for (let r of Object.keys(t))
            e.push(t[r]);
        return e
    }
    );
    typeof Element != "undefined" && (Element.prototype.scrollTo || (Element.prototype.scrollTo = function (t, e) {
        typeof t == "object" ? (this.scrollLeft = t.left,
            this.scrollTop = t.top) : (this.scrollLeft = t,
                this.scrollTop = e)
    }
    ),
        Element.prototype.replaceWith || (Element.prototype.replaceWith = function (...t) {
            let e = this.parentNode;
            if (e) {
                t.length === 0 && e.removeChild(this);
                for (let r = t.length - 1; r >= 0; r--) {
                    let n = t[r];
                    typeof n == "string" ? n = document.createTextNode(n) : n.parentNode && n.parentNode.removeChild(n),
                        r ? e.insertBefore(this.previousSibling, n) : e.replaceChild(n, this)
                }
            }
        }
        ));
    function ie(t) {
        let e = new Map;
        for (let r of t) {
            let [n] = r.location.split("#")
                , i = e.get(n);
            typeof i == "undefined" ? e.set(n, r) : (e.set(r.location, r),
                r.parent = i)
        }
        return e
    }
    function W(t, e, r) {
        var s;
        e = new RegExp(e, "g");
        let n, i = 0;
        do {
            n = e.exec(t);
            let o = (s = n == null ? void 0 : n.index) != null ? s : t.length;
            if (i < o && r(i, o),
                n) {
                let [a] = n;
                i = n.index + a.length,
                    a.length === 0 && (e.lastIndex = n.index + 1)
            }
        } while (n)
    }
    function se(t, e) {
        let r = 0
            , n = 0
            , i = 0;
        for (let s = 0; i < t.length; i++)
            t.charAt(i) === "<" && i > n ? e(r, 1, n, n = i) : t.charAt(i) === ">" && (t.charAt(n + 1) === "/" ? --s === 0 && e(r++, 2, n, i + 1) : t.charAt(i - 1) !== "/" && s++ === 0 && e(r, 0, n, i + 1),
                n = i + 1);
        i > n && e(r, 1, n, i)
    }
    function oe(t, e, r, n = !1) {
        return q([t], e, r, n).pop()
    }
    function q(t, e, r, n = !1) {
        let i = [0];
        for (let s = 1; s < e.length; s++) {
            let o = e[s - 1]
                , a = e[s]
                , u = o[o.length - 1] >>> 2 & 1023
                , c = a[0] >>> 12;
            i.push(+(u > c) + i[i.length - 1])
        }
        return t.map((s, o) => {
            let a = 0
                , u = new Map;
            for (let f of r.sort((g, l) => g - l)) {
                let g = f & 1048575
                    , l = f >>> 20;
                if (i[l] !== o)
                    continue;
                let m = u.get(l);
                typeof m == "undefined" && u.set(l, m = []),
                    m.push(g)
            }
            if (u.size === 0)
                return s;
            let c = [];
            for (let [f, g] of u) {
                let l = e[f]
                    , m = l[0] >>> 12
                    , x = l[l.length - 1] >>> 12
                    , v = l[l.length - 1] >>> 2 & 1023;
                n && m > a && c.push(s.slice(a, m));
                let d = s.slice(m, x + v);
                for (let y of g.sort((b, E) => E - b)) {
                    let b = (l[y] >>> 12) - m
                        , E = (l[y] >>> 2 & 1023) + b;
                    d = [d.slice(0, b), "<mark>", d.slice(b, E), "</mark>", d.slice(E)].join("")
                }
                if (a = x + v,
                    c.push(d) === 2)
                    break
            }
            return n && a < s.length && c.push(s.slice(a)),
                c.join("")
        }
        )
    }
    function ae(t) {
        let e = [];
        if (typeof t == "undefined")
            return e;
        let r = Array.isArray(t) ? t : [t];
        for (let n = 0; n < r.length; n++) {
            let i = lunr.tokenizer.table
                , s = i.length;
            se(r[n], (o, a, u, c) => {
                var f;
                switch (i[f = o += s] || (i[f] = []),
                a) {
                    case 0:
                    case 2:
                        i[o].push(u << 12 | c - u << 2 | a);
                        break;
                    case 1:
                        let g = r[n].slice(u, c);
                        W(g, lunr.tokenizer.separator, (l, m) => {
                            if (typeof lunr.segmenter != "undefined") {
                                let x = g.slice(l, m);
                                if (/^[MHIK]$/.test(lunr.segmenter.ctype_(x))) {
                                    let v = lunr.segmenter.segment(x);
                                    for (let d = 0, y = 0; d < v.length; d++)
                                        i[o] || (i[o] = []),
                                            i[o].push(u + l + y << 12 | v[d].length << 2 | a),
                                            e.push(new lunr.Token(v[d].toLowerCase(), {
                                                position: o << 20 | i[o].length - 1
                                            })),
                                            y += v[d].length;
                                    return
                                }
                            }
                            i[o].push(u + l << 12 | m - l << 2 | a),
                                e.push(new lunr.Token(g.slice(l, m).toLowerCase(), {
                                    position: o << 20 | i[o].length - 1
                                }))
                        }
                        )
                }
            }
            )
        }
        return e
    }
    function ue(t, e = r => r) {
        return t.trim().split(/"([^"]+)"/g).map((r, n) => n & 1 ? r.replace(/^\b|^(?![^\x00-\x7F]|$)|\s+/g, " +") : r).join("").replace(/"|(?:^|\s+)[*+\-:^~]+(?=\s+|$)/g, "").split(/\s+/g).reduce((r, n) => {
            let i = e(n);
            return [...r, ...Array.isArray(i) ? i : [i]]
        }
            , []).map(r => /([~^]$)/.test(r) ? `${r}1` : r).map(r => /(^[+-]|[~^]\d+$)/.test(r) ? r : `${r}*`).join(" ")
    }
    function ce(t) {
        return ue(t, e => {
            let r = []
                , n = new lunr.QueryLexer(e);
            n.run();
            for (let { type: i, str: s, start: o, end: a } of n.lexemes)
                switch (i) {
                    case "FIELD":
                        ["title", "text", "tags"].includes(s) || (e = [e.slice(0, a), " ", e.slice(a + 1)].join(""));
                        break;
                    case "TERM":
                        W(s, lunr.tokenizer.separator, (...u) => {
                            r.push([e.slice(0, o), s.slice(...u), e.slice(a)].join(""))
                        }
                        )
                }
            return r
        }
        )
    }
    function le(t) {
        let e = new lunr.Query(["title", "text", "tags"]);
        new lunr.QueryParser(t, e).parse();
        for (let n of e.clauses)
            n.usePipeline = !0,
                n.term.startsWith("*") && (n.wildcard = lunr.Query.wildcard.LEADING,
                    n.term = n.term.slice(1)),
                n.term.endsWith("*") && (n.wildcard = lunr.Query.wildcard.TRAILING,
                    n.term = n.term.slice(0, -1));
        return e.clauses
    }
    function he(t, e) {
        var i;
        let r = new Set(t)
            , n = {};
        for (let s = 0; s < e.length; s++)
            for (let o of r)
                e[s].startsWith(o.term) && (n[o.term] = !0,
                    r.delete(o));
        for (let s of r)
            (i = lunr.stopWordFilter) != null && i.call(lunr, s.term) && (n[s.term] = !1);
        return n
    }
    function fe(t, e) {
        let r = new Set
            , n = new Uint16Array(t.length);
        for (let s = 0; s < t.length; s++)
            for (let o = s + 1; o < t.length; o++)
                t.slice(s, o) in e && (n[s] = o - s);
        let i = [0];
        for (let s = i.length; s > 0;) {
            let o = i[--s];
            for (let u = 1; u < n[o]; u++)
                n[o + u] > n[o] - u && (r.add(t.slice(o, o + u)),
                    i[s++] = o + u);
            let a = o + n[o];
            n[a] && a < t.length - 1 && (i[s++] = a),
                r.add(t.slice(o, a))
        }
        return r.has("") ? new Set([t]) : r
    }
    function Oe(t) {
        return e => r => {
            if (typeof r[e] == "undefined")
                return;
            let n = [r.location, e].join(":");
            return t.set(n, lunr.tokenizer.table = []),
                r[e]
        }
    }
    function Re(t, e) {
        let [r, n] = [new Set(t), new Set(e)];
        return [...new Set([...r].filter(i => !n.has(i)))]
    }
    var H = class {
        constructor({ config: e, docs: r, options: n }) {
            let i = Oe(this.table = new Map);
            this.map = ie(r),
                this.options = n,
                this.index = lunr(function () {
                    this.metadataWhitelist = ["position"],
                        this.b(0),
                        e.lang.length === 1 && e.lang[0] !== "en" ? this.use(lunr[e.lang[0]]) : e.lang.length > 1 && this.use(lunr.multiLanguage(...e.lang)),
                        this.tokenizer = ae,
                        lunr.tokenizer.separator = new RegExp(e.separator),
                        lunr.segmenter = "TinySegmenter" in lunr ? new lunr.TinySegmenter : void 0;
                    let s = Re(["trimmer", "stopWordFilter", "stemmer"], e.pipeline);
                    for (let o of e.lang.map(a => a === "en" ? lunr : lunr[a]))
                        for (let a of s)
                            this.pipeline.remove(o[a]),
                                this.searchPipeline.remove(o[a]);
                    this.ref("location"),
                        this.field("title", {
                            boost: 1e3,
                            extractor: i("title")
                        }),
                        this.field("text", {
                            boost: 1,
                            extractor: i("text")
                        }),
                        this.field("tags", {
                            boost: 1e6,
                            extractor: i("tags")
                        });
                    for (let o of r)
                        this.add(o, {
                            boost: o.boost
                        })
                })
        }
        search(e) {
            if (e = e.replace(new RegExp("\\p{sc=Han}+", "gu"), s => [...fe(s, this.index.invertedIndex)].join("* ")),
                e = ce(e),
                !e)
                return {
                    items: []
                };
            let r = le(e).filter(s => s.presence !== lunr.Query.presence.PROHIBITED)
                , n = this.index.search(e).reduce((s, { ref: o, score: a, matchData: u }) => {
                    let c = this.map.get(o);
                    if (typeof c != "undefined") {
                        c = A({}, c),
                            c.tags && (c.tags = [...c.tags]);
                        let f = he(r, Object.keys(u.metadata));
                        for (let l of this.index.fields) {
                            if (typeof c[l] == "undefined")
                                continue;
                            let m = [];
                            for (let d of Object.values(u.metadata))
                                typeof d[l] != "undefined" && m.push(...d[l].position);
                            if (!m.length)
                                continue;
                            let x = this.table.get([c.location, l].join(":"))
                                , v = Array.isArray(c[l]) ? q : oe;
                            c[l] = v(c[l], x, m, l !== "text")
                        }
                        let g = +!c.parent + Object.values(f).filter(l => l).length / Object.keys(f).length;
                        s.push(G(A({}, c), {
                            score: a * (1 + K(g, 2)),
                            terms: f
                        }))
                    }
                    return s
                }
                    , []).sort((s, o) => o.score - s.score).reduce((s, o) => {
                        let a = this.map.get(o.location);
                        if (typeof a != "undefined") {
                            let u = a.parent ? a.parent.location : a.location;
                            s.set(u, [...s.get(u) || [], o])
                        }
                        return s
                    }
                        , new Map);
            for (let [s, o] of n)
                if (!o.find(a => a.location === s)) {
                    let a = this.map.get(s);
                    o.push(G(A({}, a), {
                        score: 0,
                        terms: {}
                    }))
                }
            let i;
            if (this.options.suggest) {
                let s = this.index.query(o => {
                    for (let a of r)
                        o.term(a.term, {
                            fields: ["title"],
                            presence: lunr.Query.presence.REQUIRED,
                            wildcard: lunr.Query.wildcard.TRAILING
                        })
                }
                );
                i = s.length ? Object.keys(s[0].matchData.metadata) : []
            }
            return A({
                items: [...n.values()]
            }, typeof i != "undefined" && {
                suggest: i
            })
        }
    }
        ;
    var de;
    function Ie(t) {
        return B(this, null, function* () {
            let e = "../lunr";
            if (typeof parent != "undefined" && "IFrameWorker" in parent) {
                let n = ne("script[src]")
                    , [i] = n.src.split("/worker");
                e = e.replace("..", i)
            }
            let r = [];
            for (let n of t.lang) {
                switch (n) {
                    case "ja":
                        r.push(`${e}/tinyseg.js`);
                        break;
                    case "hi":
                    case "th":
                        r.push(`${e}/wordcut.js`);
                        break
                }
                n !== "en" && r.push(`${e}/min/lunr.${n}.min.js`)
            }
            t.lang.length > 1 && r.push(`${e}/min/lunr.multi.min.js`),
                r.length && (yield importScripts(`${e}/min/lunr.stemmer.support.min.js`, ...r))
        })
    }
    function Fe(t) {
        return B(this, null, function* () {
            switch (t.type) {
                case 0:
                    return yield Ie(t.data.config),
                        de = new H(t.data),
                    {
                        type: 1
                    };
                case 2:
                    let e = t.data;
                    try {
                        return {
                            type: 3,
                            data: de.search(e)
                        }
                    } catch (r) {
                        return console.warn(`Invalid query: ${e} \u2013 see https://bit.ly/2s3ChXG`),
                            console.warn(r),
                        {
                            type: 3,
                            data: {
                                items: []
                            }
                        }
                    }
                default:
                    throw new TypeError("Invalid message type")
            }
        })
    }
    self.lunr = Y.default;
    Y.default.utils.warn = console.warn;
    addEventListener("message", t => B(null, null, function* () {
        postMessage(yield Fe(t.data))
    }));
}
)();