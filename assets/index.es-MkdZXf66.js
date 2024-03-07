import {v as Kl, w as ws, x as se, y as p0, z as Bl, A as Fl, C as Ic, D as _o, E as d0, F as Mr, e as xc, G as Ii, V as g0, M as y0, N as Y, J as v0, K as pc, L as m0, O as w0, P as _0, Q as $h, R as b0, S as E0, T as I0, U as Lh, $ as x0, W as P0, X as S0, Y as Ys, Z as qh, a0 as O0, a1 as R0, a2 as Vl, a3 as Lr, a4 as C0, a5 as Mh, a6 as ps, a7 as Dt, a8 as Gt, a9 as Ei, aa as hr, ab as A0, ac as ds, ad as Gl, ae as T0, af as N0, ag as D0, ah as Wl, ai as $0, aj as Jl, ak as Ql, al as ys, am as dc, an as fo, ao as ms, ap as L0, aq as po, ar as q0, as as M0, at as j0, au as z0, av as oo, aw as U0, ax as H0, ay as Qa, az as jh, aA as k0, aB as K0, aC as B0, aD as zh, aE as F0, aF as V0, aG as G0, aH as W0, aI as J0, aJ as Q0, aK as Y0, aL as Gs, aM as Yl, aN as Ya, aO as X0, aP as Z0, _ as ew} from "./index-qhCtXGwZ.js";
import {e as Or, $ as Pc} from "./events-vnhNiMge.js";
const tw = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/
  , rw = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/
  , iw = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function sw(a, r) {
    if (a === "__proto__" || a === "constructor" && r && typeof r == "object" && "prototype"in r) {
        nw(a);
        return
    }
    return r
}
function nw(a) {
    console.warn(`[destr] Dropping "${a}" key to prevent prototype pollution.`)
}
function ao(a, r={}) {
    if (typeof a != "string")
        return a;
    const i = a.trim();
    if (a[0] === '"' && a.at(-1) === '"' && !a.includes("\\"))
        return i.slice(1, -1);
    if (i.length <= 9) {
        const n = i.toLowerCase();
        if (n === "true")
            return !0;
        if (n === "false")
            return !1;
        if (n === "undefined")
            return;
        if (n === "null")
            return null;
        if (n === "nan")
            return Number.NaN;
        if (n === "infinity")
            return Number.POSITIVE_INFINITY;
        if (n === "-infinity")
            return Number.NEGATIVE_INFINITY
    }
    if (!iw.test(a)) {
        if (r.strict)
            throw new SyntaxError("[destr] Invalid JSON");
        return a
    }
    try {
        if (tw.test(a) || rw.test(a)) {
            if (r.strict)
                throw new Error("[destr] Possible prototype pollution");
            return JSON.parse(a, sw)
        }
        return JSON.parse(a)
    } catch (n) {
        if (r.strict)
            throw n;
        return a
    }
}
function ow(a) {
    return !a || typeof a.then != "function" ? Promise.resolve(a) : a
}
function Ut(a, ...r) {
    try {
        return ow(a(...r))
    } catch (i) {
        return Promise.reject(i)
    }
}
function aw(a) {
    const r = typeof a;
    return a === null || r !== "object" && r !== "function"
}
function cw(a) {
    const r = Object.getPrototypeOf(a);
    return !r || r.isPrototypeOf(Object)
}
function go(a) {
    if (aw(a))
        return String(a);
    if (cw(a) || Array.isArray(a))
        return JSON.stringify(a);
    if (typeof a.toJSON == "function")
        return go(a.toJSON());
    throw new Error("[unstorage] Cannot stringify value!")
}
function Xl() {
    if (typeof Buffer === void 0)
        throw new TypeError("[unstorage] Buffer is not supported!")
}
const gc = "base64:";
function uw(a) {
    if (typeof a == "string")
        return a;
    Xl();
    const r = Buffer.from(a).toString("base64");
    return gc + r
}
function hw(a) {
    return typeof a != "string" || !a.startsWith(gc) ? a : (Xl(),
    Buffer.from(a.slice(gc.length), "base64"))
}
function ur(a) {
    return a ? a.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") : ""
}
function lw(...a) {
    return ur(a.join(":"))
}
function co(a) {
    return a = ur(a),
    a ? a + ":" : ""
}
const fw = "memory"
  , pw = ()=>{
    const a = new Map;
    return {
        name: fw,
        options: {},
        hasItem(r) {
            return a.has(r)
        },
        getItem(r) {
            return a.get(r) ?? null
        },
        getItemRaw(r) {
            return a.get(r) ?? null
        },
        setItem(r, i) {
            a.set(r, i)
        },
        setItemRaw(r, i) {
            a.set(r, i)
        },
        removeItem(r) {
            a.delete(r)
        },
        getKeys() {
            return Array.from(a.keys())
        },
        clear() {
            a.clear()
        },
        dispose() {
            a.clear()
        }
    }
}
;
function dw(a={}) {
    const r = {
        mounts: {
            "": a.driver || pw()
        },
        mountpoints: [""],
        watching: !1,
        watchListeners: [],
        unwatch: {}
    }
      , i = v=>{
        for (const I of r.mountpoints)
            if (v.startsWith(I))
                return {
                    base: I,
                    relativeKey: v.slice(I.length),
                    driver: r.mounts[I]
                };
        return {
            base: "",
            relativeKey: v,
            driver: r.mounts[""]
        }
    }
      , n = (v,I)=>r.mountpoints.filter(R=>R.startsWith(v) || I && v.startsWith(R)).map(R=>({
        relativeBase: v.length > R.length ? v.slice(R.length) : void 0,
        mountpoint: R,
        driver: r.mounts[R]
    }))
      , o = (v,I)=>{
        if (r.watching) {
            I = ur(I);
            for (const R of r.watchListeners)
                R(v, I)
        }
    }
      , h = async()=>{
        if (!r.watching) {
            r.watching = !0;
            for (const v in r.mounts)
                r.unwatch[v] = await Uh(r.mounts[v], o, v)
        }
    }
      , p = async()=>{
        if (r.watching) {
            for (const v in r.unwatch)
                await r.unwatch[v]();
            r.unwatch = {},
            r.watching = !1
        }
    }
      , g = (v,I,R)=>{
        const A = new Map
          , z = T=>{
            let F = A.get(T.base);
            return F || (F = {
                driver: T.driver,
                base: T.base,
                items: []
            },
            A.set(T.base, F)),
            F
        }
        ;
        for (const T of v) {
            const F = typeof T == "string"
              , re = ur(F ? T : T.key)
              , he = F ? void 0 : T.value
              , le = F || !T.options ? I : {
                ...I,
                ...T.options
            }
              , fe = i(re);
            z(fe).items.push({
                key: re,
                value: he,
                relativeKey: fe.relativeKey,
                options: le
            })
        }
        return Promise.all([...A.values()].map(T=>R(T))).then(T=>T.flat())
    }
      , _ = {
        hasItem(v, I={}) {
            v = ur(v);
            const {relativeKey: R, driver: A} = i(v);
            return Ut(A.hasItem, R, I)
        },
        getItem(v, I={}) {
            v = ur(v);
            const {relativeKey: R, driver: A} = i(v);
            return Ut(A.getItem, R, I).then(z=>ao(z))
        },
        getItems(v, I) {
            return g(v, I, R=>R.driver.getItems ? Ut(R.driver.getItems, R.items.map(A=>({
                key: A.relativeKey,
                options: A.options
            })), I).then(A=>A.map(z=>({
                key: lw(R.base, z.key),
                value: ao(z.value)
            }))) : Promise.all(R.items.map(A=>Ut(R.driver.getItem, A.relativeKey, A.options).then(z=>({
                key: A.key,
                value: ao(z)
            })))))
        },
        getItemRaw(v, I={}) {
            v = ur(v);
            const {relativeKey: R, driver: A} = i(v);
            return A.getItemRaw ? Ut(A.getItemRaw, R, I) : Ut(A.getItem, R, I).then(z=>hw(z))
        },
        async setItem(v, I, R={}) {
            if (I === void 0)
                return _.removeItem(v);
            v = ur(v);
            const {relativeKey: A, driver: z} = i(v);
            z.setItem && (await Ut(z.setItem, A, go(I), R),
            z.watch || o("update", v))
        },
        async setItems(v, I) {
            await g(v, I, async R=>{
                R.driver.setItems && await Ut(R.driver.setItems, R.items.map(A=>({
                    key: A.relativeKey,
                    value: go(A.value),
                    options: A.options
                })), I),
                R.driver.setItem && await Promise.all(R.items.map(A=>Ut(R.driver.setItem, A.relativeKey, go(A.value), A.options)))
            }
            )
        },
        async setItemRaw(v, I, R={}) {
            if (I === void 0)
                return _.removeItem(v, R);
            v = ur(v);
            const {relativeKey: A, driver: z} = i(v);
            if (z.setItemRaw)
                await Ut(z.setItemRaw, A, I, R);
            else if (z.setItem)
                await Ut(z.setItem, A, uw(I), R);
            else
                return;
            z.watch || o("update", v)
        },
        async removeItem(v, I={}) {
            typeof I == "boolean" && (I = {
                removeMeta: I
            }),
            v = ur(v);
            const {relativeKey: R, driver: A} = i(v);
            A.removeItem && (await Ut(A.removeItem, R, I),
            (I.removeMeta || I.removeMata) && await Ut(A.removeItem, R + "$", I),
            A.watch || o("remove", v))
        },
        async getMeta(v, I={}) {
            typeof I == "boolean" && (I = {
                nativeOnly: I
            }),
            v = ur(v);
            const {relativeKey: R, driver: A} = i(v)
              , z = Object.create(null);
            if (A.getMeta && Object.assign(z, await Ut(A.getMeta, R, I)),
            !I.nativeOnly) {
                const T = await Ut(A.getItem, R + "$", I).then(F=>ao(F));
                T && typeof T == "object" && (typeof T.atime == "string" && (T.atime = new Date(T.atime)),
                typeof T.mtime == "string" && (T.mtime = new Date(T.mtime)),
                Object.assign(z, T))
            }
            return z
        },
        setMeta(v, I, R={}) {
            return this.setItem(v + "$", I, R)
        },
        removeMeta(v, I={}) {
            return this.removeItem(v + "$", I)
        },
        async getKeys(v, I={}) {
            v = co(v);
            const R = n(v, !0);
            let A = [];
            const z = [];
            for (const T of R) {
                const re = (await Ut(T.driver.getKeys, T.relativeBase, I)).map(he=>T.mountpoint + ur(he)).filter(he=>!A.some(le=>he.startsWith(le)));
                z.push(...re),
                A = [T.mountpoint, ...A.filter(he=>!he.startsWith(T.mountpoint))]
            }
            return v ? z.filter(T=>T.startsWith(v) && !T.endsWith("$")) : z.filter(T=>!T.endsWith("$"))
        },
        async clear(v, I={}) {
            v = co(v),
            await Promise.all(n(v, !1).map(async R=>{
                if (R.driver.clear)
                    return Ut(R.driver.clear, R.relativeBase, I);
                if (R.driver.removeItem) {
                    const A = await R.driver.getKeys(R.relativeBase || "", I);
                    return Promise.all(A.map(z=>R.driver.removeItem(z, I)))
                }
            }
            ))
        },
        async dispose() {
            await Promise.all(Object.values(r.mounts).map(v=>Hh(v)))
        },
        async watch(v) {
            return await h(),
            r.watchListeners.push(v),
            async()=>{
                r.watchListeners = r.watchListeners.filter(I=>I !== v),
                r.watchListeners.length === 0 && await p()
            }
        },
        async unwatch() {
            r.watchListeners = [],
            await p()
        },
        mount(v, I) {
            if (v = co(v),
            v && r.mounts[v])
                throw new Error(`already mounted at ${v}`);
            return v && (r.mountpoints.push(v),
            r.mountpoints.sort((R,A)=>A.length - R.length)),
            r.mounts[v] = I,
            r.watching && Promise.resolve(Uh(I, o, v)).then(R=>{
                r.unwatch[v] = R
            }
            ).catch(console.error),
            _
        },
        async unmount(v, I=!0) {
            v = co(v),
            !(!v || !r.mounts[v]) && (r.watching && v in r.unwatch && (r.unwatch[v](),
            delete r.unwatch[v]),
            I && await Hh(r.mounts[v]),
            r.mountpoints = r.mountpoints.filter(R=>R !== v),
            delete r.mounts[v])
        },
        getMount(v="") {
            v = ur(v) + ":";
            const I = i(v);
            return {
                driver: I.driver,
                base: I.base
            }
        },
        getMounts(v="", I={}) {
            return v = ur(v),
            n(v, I.parents).map(A=>({
                driver: A.driver,
                base: A.mountpoint
            }))
        }
    };
    return _
}
function Uh(a, r, i) {
    return a.watch ? a.watch((n,o)=>r(n, i + o)) : ()=>{}
}
async function Hh(a) {
    typeof a.dispose == "function" && await Ut(a.dispose)
}
function Bi(a) {
    return new Promise((r,i)=>{
        a.oncomplete = a.onsuccess = ()=>r(a.result),
        a.onabort = a.onerror = ()=>i(a.error)
    }
    )
}
function Zl(a, r) {
    const i = indexedDB.open(a);
    i.onupgradeneeded = ()=>i.result.createObjectStore(r);
    const n = Bi(i);
    return (o,h)=>n.then(p=>h(p.transaction(r, o).objectStore(r)))
}
let Xa;
function Xs() {
    return Xa || (Xa = Zl("keyval-store", "keyval")),
    Xa
}
function kh(a, r=Xs()) {
    return r("readonly", i=>Bi(i.get(a)))
}
function gw(a, r, i=Xs()) {
    return i("readwrite", n=>(n.put(r, a),
    Bi(n.transaction)))
}
function yw(a, r=Xs()) {
    return r("readwrite", i=>(i.delete(a),
    Bi(i.transaction)))
}
function vw(a=Xs()) {
    return a("readwrite", r=>(r.clear(),
    Bi(r.transaction)))
}
function mw(a, r) {
    return a.openCursor().onsuccess = function() {
        this.result && (r(this.result),
        this.result.continue())
    }
    ,
    Bi(a.transaction)
}
function ww(a=Xs()) {
    return a("readonly", r=>{
        if (r.getAllKeys)
            return Bi(r.getAllKeys());
        const i = [];
        return mw(r, n=>i.push(n.key)).then(()=>i)
    }
    )
}
const _w = a=>JSON.stringify(a, (r,i)=>typeof i == "bigint" ? i.toString() + "n" : i)
  , bw = a=>{
    const r = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g
      , i = a.replace(r, '$1"$2n"$3');
    return JSON.parse(i, (n,o)=>typeof o == "string" && o.match(/^\d+n$/) ? BigInt(o.substring(0, o.length - 1)) : o)
}
;
function Zs(a) {
    if (typeof a != "string")
        throw new Error(`Cannot safe json parse value of type ${typeof a}`);
    try {
        return bw(a)
    } catch {
        return a
    }
}
function Ki(a) {
    return typeof a == "string" ? a : _w(a) || ""
}
const Ew = "idb-keyval";
var Iw = (a={})=>{
    const r = a.base && a.base.length > 0 ? `${a.base}:` : ""
      , i = o=>r + o;
    let n;
    return a.dbName && a.storeName && (n = Zl(a.dbName, a.storeName)),
    {
        name: Ew,
        options: a,
        async hasItem(o) {
            return !(typeof await kh(i(o), n) > "u")
        },
        async getItem(o) {
            return await kh(i(o), n) ?? null
        },
        setItem(o, h) {
            return gw(i(o), h, n)
        },
        removeItem(o) {
            return yw(i(o), n)
        },
        getKeys() {
            return ww(n)
        },
        clear() {
            return vw(n)
        }
    }
}
;
const xw = "WALLET_CONNECT_V2_INDEXED_DB"
  , Pw = "keyvaluestorage";
let Sw = class {
    constructor() {
        this.indexedDb = dw({
            driver: Iw({
                dbName: xw,
                storeName: Pw
            })
        })
    }
    async getKeys() {
        return this.indexedDb.getKeys()
    }
    async getEntries() {
        return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map(r=>[r.key, r.value])
    }
    async getItem(r) {
        const i = await this.indexedDb.getItem(r);
        if (i !== null)
            return i
    }
    async setItem(r, i) {
        await this.indexedDb.setItem(r, Ki(i))
    }
    async removeItem(r) {
        await this.indexedDb.removeItem(r)
    }
}
;
var Za = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , yo = {
    exports: {}
};
(function() {
    let a;
    function r() {}
    a = r,
    a.prototype.getItem = function(i) {
        return this.hasOwnProperty(i) ? String(this[i]) : null
    }
    ,
    a.prototype.setItem = function(i, n) {
        this[i] = String(n)
    }
    ,
    a.prototype.removeItem = function(i) {
        delete this[i]
    }
    ,
    a.prototype.clear = function() {
        const i = this;
        Object.keys(i).forEach(function(n) {
            i[n] = void 0,
            delete i[n]
        })
    }
    ,
    a.prototype.key = function(i) {
        return i = i || 0,
        Object.keys(this)[i]
    }
    ,
    a.prototype.__defineGetter__("length", function() {
        return Object.keys(this).length
    }),
    typeof Za < "u" && Za.localStorage ? yo.exports = Za.localStorage : typeof window < "u" && window.localStorage ? yo.exports = window.localStorage : yo.exports = new r
}
)();
function Ow(a) {
    var r;
    return [a[0], Zs((r = a[1]) != null ? r : "")]
}
class Rw {
    constructor() {
        this.localStorage = yo.exports
    }
    async getKeys() {
        return Object.keys(this.localStorage)
    }
    async getEntries() {
        return Object.entries(this.localStorage).map(Ow)
    }
    async getItem(r) {
        const i = this.localStorage.getItem(r);
        if (i !== null)
            return Zs(i)
    }
    async setItem(r, i) {
        this.localStorage.setItem(r, Ki(i))
    }
    async removeItem(r) {
        this.localStorage.removeItem(r)
    }
}
const Cw = "wc_storage_version"
  , Kh = 1
  , Aw = async(a,r,i)=>{
    const n = Cw
      , o = await r.getItem(n);
    if (o && o >= Kh) {
        i(r);
        return
    }
    const h = await a.getKeys();
    if (!h.length) {
        i(r);
        return
    }
    const p = [];
    for (; h.length; ) {
        const g = h.shift();
        if (!g)
            continue;
        const _ = g.toLowerCase();
        if (_.includes("wc@") || _.includes("walletconnect") || _.includes("wc_") || _.includes("wallet_connect")) {
            const v = await a.getItem(g);
            await r.setItem(g, v),
            p.push(g)
        }
    }
    await r.setItem(n, Kh),
    i(r),
    Tw(a, p)
}
  , Tw = async(a,r)=>{
    r.length && r.forEach(async i=>{
        await a.removeItem(i)
    }
    )
}
;
let Nw = class {
    constructor() {
        this.initialized = !1,
        this.setInitialized = i=>{
            this.storage = i,
            this.initialized = !0
        }
        ;
        const r = new Rw;
        this.storage = r;
        try {
            const i = new Sw;
            Aw(r, i, this.setInitialized)
        } catch {
            this.initialized = !0
        }
    }
    async getKeys() {
        return await this.initialize(),
        this.storage.getKeys()
    }
    async getEntries() {
        return await this.initialize(),
        this.storage.getEntries()
    }
    async getItem(r) {
        return await this.initialize(),
        this.storage.getItem(r)
    }
    async setItem(r, i) {
        return await this.initialize(),
        this.storage.setItem(r, i)
    }
    async removeItem(r) {
        return await this.initialize(),
        this.storage.removeItem(r)
    }
    async initialize() {
        this.initialized || await new Promise(r=>{
            const i = setInterval(()=>{
                this.initialized && (clearInterval(i),
                r())
            }
            , 20)
        }
        )
    }
}
;
var _s = {}
  , Us = {}
  , ec = {}
  , Hs = {};
let Fi = class {
}
;
const Dw = Object.freeze(Object.defineProperty({
    __proto__: null,
    IEvents: Fi
}, Symbol.toStringTag, {
    value: "Module"
}))
  , $w = Kl(Dw);
var Bh;
function Lw() {
    if (Bh)
        return Hs;
    Bh = 1,
    Object.defineProperty(Hs, "__esModule", {
        value: !0
    }),
    Hs.IHeartBeat = void 0;
    const a = $w;
    class r extends a.IEvents {
        constructor(n) {
            super()
        }
    }
    return Hs.IHeartBeat = r,
    Hs
}
var Fh;
function ef() {
    return Fh || (Fh = 1,
    function(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        ws.__exportStar(Lw(), a)
    }(ec)),
    ec
}
var tc = {}, Hi = {}, Vh;
function qw() {
    if (Vh)
        return Hi;
    Vh = 1,
    Object.defineProperty(Hi, "__esModule", {
        value: !0
    }),
    Hi.HEARTBEAT_EVENTS = Hi.HEARTBEAT_INTERVAL = void 0;
    const a = se;
    return Hi.HEARTBEAT_INTERVAL = a.FIVE_SECONDS,
    Hi.HEARTBEAT_EVENTS = {
        pulse: "heartbeat_pulse"
    },
    Hi
}
var Gh;
function tf() {
    return Gh || (Gh = 1,
    function(a) {
        Object.defineProperty(a, "__esModule", {
            value: !0
        }),
        ws.__exportStar(qw(), a)
    }(tc)),
    tc
}
var Wh;
function Mw() {
    if (Wh)
        return Us;
    Wh = 1,
    Object.defineProperty(Us, "__esModule", {
        value: !0
    }),
    Us.HeartBeat = void 0;
    const a = ws
      , r = Or
      , i = se
      , n = ef()
      , o = tf();
    class h extends n.IHeartBeat {
        constructor(g) {
            super(g),
            this.events = new r.EventEmitter,
            this.interval = o.HEARTBEAT_INTERVAL,
            this.interval = (g == null ? void 0 : g.interval) || o.HEARTBEAT_INTERVAL
        }
        static init(g) {
            return a.__awaiter(this, void 0, void 0, function*() {
                const _ = new h(g);
                return yield _.init(),
                _
            })
        }
        init() {
            return a.__awaiter(this, void 0, void 0, function*() {
                yield this.initialize()
            })
        }
        stop() {
            clearInterval(this.intervalRef)
        }
        on(g, _) {
            this.events.on(g, _)
        }
        once(g, _) {
            this.events.once(g, _)
        }
        off(g, _) {
            this.events.off(g, _)
        }
        removeListener(g, _) {
            this.events.removeListener(g, _)
        }
        initialize() {
            return a.__awaiter(this, void 0, void 0, function*() {
                this.intervalRef = setInterval(()=>this.pulse(), i.toMiliseconds(this.interval))
            })
        }
        pulse() {
            this.events.emit(o.HEARTBEAT_EVENTS.pulse)
        }
    }
    return Us.HeartBeat = h,
    Us
}
(function(a) {
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    const r = ws;
    r.__exportStar(Mw(), a),
    r.__exportStar(ef(), a),
    r.__exportStar(tf(), a)
}
)(_s);
var Re = {}, rc, Jh;
function jw() {
    if (Jh)
        return rc;
    Jh = 1;
    function a(i) {
        try {
            return JSON.stringify(i)
        } catch {
            return '"[Circular]"'
        }
    }
    rc = r;
    function r(i, n, o) {
        var h = o && o.stringify || a
          , p = 1;
        if (typeof i == "object" && i !== null) {
            var g = n.length + p;
            if (g === 1)
                return i;
            var _ = new Array(g);
            _[0] = h(i);
            for (var v = 1; v < g; v++)
                _[v] = h(n[v]);
            return _.join(" ")
        }
        if (typeof i != "string")
            return i;
        var I = n.length;
        if (I === 0)
            return i;
        for (var R = "", A = 1 - p, z = -1, T = i && i.length || 0, F = 0; F < T; ) {
            if (i.charCodeAt(F) === 37 && F + 1 < T) {
                switch (z = z > -1 ? z : 0,
                i.charCodeAt(F + 1)) {
                case 100:
                case 102:
                    if (A >= I || n[A] == null)
                        break;
                    z < F && (R += i.slice(z, F)),
                    R += Number(n[A]),
                    z = F + 2,
                    F++;
                    break;
                case 105:
                    if (A >= I || n[A] == null)
                        break;
                    z < F && (R += i.slice(z, F)),
                    R += Math.floor(Number(n[A])),
                    z = F + 2,
                    F++;
                    break;
                case 79:
                case 111:
                case 106:
                    if (A >= I || n[A] === void 0)
                        break;
                    z < F && (R += i.slice(z, F));
                    var re = typeof n[A];
                    if (re === "string") {
                        R += "'" + n[A] + "'",
                        z = F + 2,
                        F++;
                        break
                    }
                    if (re === "function") {
                        R += n[A].name || "<anonymous>",
                        z = F + 2,
                        F++;
                        break
                    }
                    R += h(n[A]),
                    z = F + 2,
                    F++;
                    break;
                case 115:
                    if (A >= I)
                        break;
                    z < F && (R += i.slice(z, F)),
                    R += String(n[A]),
                    z = F + 2,
                    F++;
                    break;
                case 37:
                    z < F && (R += i.slice(z, F)),
                    R += "%",
                    z = F + 2,
                    F++,
                    A--;
                    break
                }
                ++A
            }
            ++F
        }
        return z === -1 ? i : (z < T && (R += i.slice(z)),
        R)
    }
    return rc
}
var ic, Qh;
function zw() {
    if (Qh)
        return ic;
    Qh = 1;
    const a = jw();
    ic = o;
    const r = de().console || {}
      , i = {
        mapHttpRequest: T,
        mapHttpResponse: T,
        wrapRequestSerializer: F,
        wrapResponseSerializer: F,
        wrapErrorSerializer: F,
        req: T,
        res: T,
        err: A
    };
    function n(L, H) {
        return Array.isArray(L) ? L.filter(function(ve) {
            return ve !== "!stdSerializers.err"
        }) : L === !0 ? Object.keys(H) : !1
    }
    function o(L) {
        L = L || {},
        L.browser = L.browser || {};
        const H = L.browser.transmit;
        if (H && typeof H.send != "function")
            throw Error("pino: transmit option must have a send function");
        const W = L.browser.write || r;
        L.browser.write && (L.browser.asObject = !0);
        const ve = L.serializers || {}
          , ie = n(L.browser.serialize, ve);
        let ue = L.browser.serialize;
        Array.isArray(L.browser.serialize) && L.browser.serialize.indexOf("!stdSerializers.err") > -1 && (ue = !1);
        const Te = ["error", "fatal", "warn", "info", "debug", "trace"];
        typeof W == "function" && (W.error = W.fatal = W.warn = W.info = W.debug = W.trace = W),
        L.enabled === !1 && (L.level = "silent");
        const Ue = L.level || "info"
          , m = Object.create(W);
        m.log || (m.log = re),
        Object.defineProperty(m, "levelVal", {
            get: X
        }),
        Object.defineProperty(m, "level", {
            get: ce,
            set: V
        });
        const x = {
            transmit: H,
            serialize: ie,
            asObject: L.browser.asObject,
            levels: Te,
            timestamp: z(L)
        };
        m.levels = o.levels,
        m.level = Ue,
        m.setMaxListeners = m.getMaxListeners = m.emit = m.addListener = m.on = m.prependListener = m.once = m.prependOnceListener = m.removeListener = m.removeAllListeners = m.listeners = m.listenerCount = m.eventNames = m.write = m.flush = re,
        m.serializers = ve,
        m._serialize = ie,
        m._stdErrSerialize = ue,
        m.child = k,
        H && (m._logEvent = R());
        function X() {
            return this.level === "silent" ? 1 / 0 : this.levels.values[this.level]
        }
        function ce() {
            return this._level
        }
        function V(B) {
            if (B !== "silent" && !this.levels.values[B])
                throw Error("unknown level " + B);
            this._level = B,
            h(x, m, "error", "log"),
            h(x, m, "fatal", "error"),
            h(x, m, "warn", "error"),
            h(x, m, "info", "log"),
            h(x, m, "debug", "log"),
            h(x, m, "trace", "log")
        }
        function k(B, G) {
            if (!B)
                throw new Error("missing bindings for child Pino");
            G = G || {},
            ie && B.serializers && (G.serializers = B.serializers);
            const Je = G.serializers;
            if (ie && Je) {
                var Ke = Object.assign({}, ve, Je)
                  , jr = L.browser.serialize === !0 ? Object.keys(Ke) : ie;
                delete B.serializers,
                _([B], jr, Ke, this._stdErrSerialize)
            }
            function Ie(It) {
                this._childLevel = (It._childLevel | 0) + 1,
                this.error = v(It, B, "error"),
                this.fatal = v(It, B, "fatal"),
                this.warn = v(It, B, "warn"),
                this.info = v(It, B, "info"),
                this.debug = v(It, B, "debug"),
                this.trace = v(It, B, "trace"),
                Ke && (this.serializers = Ke,
                this._serialize = jr),
                H && (this._logEvent = R([].concat(It._logEvent.bindings, B)))
            }
            return Ie.prototype = this,
            new Ie(this)
        }
        return m
    }
    o.levels = {
        values: {
            fatal: 60,
            error: 50,
            warn: 40,
            info: 30,
            debug: 20,
            trace: 10
        },
        labels: {
            10: "trace",
            20: "debug",
            30: "info",
            40: "warn",
            50: "error",
            60: "fatal"
        }
    },
    o.stdSerializers = i,
    o.stdTimeFunctions = Object.assign({}, {
        nullTime: he,
        epochTime: le,
        unixTime: fe,
        isoTime: pe
    });
    function h(L, H, W, ve) {
        const ie = Object.getPrototypeOf(H);
        H[W] = H.levelVal > H.levels.values[W] ? re : ie[W] ? ie[W] : r[W] || r[ve] || re,
        p(L, H, W)
    }
    function p(L, H, W) {
        !L.transmit && H[W] === re || (H[W] = function(ve) {
            return function() {
                const ue = L.timestamp()
                  , Te = new Array(arguments.length)
                  , Ue = Object.getPrototypeOf && Object.getPrototypeOf(this) === r ? r : this;
                for (var m = 0; m < Te.length; m++)
                    Te[m] = arguments[m];
                if (L.serialize && !L.asObject && _(Te, this._serialize, this.serializers, this._stdErrSerialize),
                L.asObject ? ve.call(Ue, g(this, W, Te, ue)) : ve.apply(Ue, Te),
                L.transmit) {
                    const x = L.transmit.level || H.level
                      , X = o.levels.values[x]
                      , ce = o.levels.values[W];
                    if (ce < X)
                        return;
                    I(this, {
                        ts: ue,
                        methodLevel: W,
                        methodValue: ce,
                        transmitLevel: x,
                        transmitValue: o.levels.values[L.transmit.level || H.level],
                        send: L.transmit.send,
                        val: H.levelVal
                    }, Te)
                }
            }
        }(H[W]))
    }
    function g(L, H, W, ve) {
        L._serialize && _(W, L._serialize, L.serializers, L._stdErrSerialize);
        const ie = W.slice();
        let ue = ie[0];
        const Te = {};
        ve && (Te.time = ve),
        Te.level = o.levels.values[H];
        let Ue = (L._childLevel | 0) + 1;
        if (Ue < 1 && (Ue = 1),
        ue !== null && typeof ue == "object") {
            for (; Ue-- && typeof ie[0] == "object"; )
                Object.assign(Te, ie.shift());
            ue = ie.length ? a(ie.shift(), ie) : void 0
        } else
            typeof ue == "string" && (ue = a(ie.shift(), ie));
        return ue !== void 0 && (Te.msg = ue),
        Te
    }
    function _(L, H, W, ve) {
        for (const ie in L)
            if (ve && L[ie]instanceof Error)
                L[ie] = o.stdSerializers.err(L[ie]);
            else if (typeof L[ie] == "object" && !Array.isArray(L[ie]))
                for (const ue in L[ie])
                    H && H.indexOf(ue) > -1 && ue in W && (L[ie][ue] = W[ue](L[ie][ue]))
    }
    function v(L, H, W) {
        return function() {
            const ve = new Array(1 + arguments.length);
            ve[0] = H;
            for (var ie = 1; ie < ve.length; ie++)
                ve[ie] = arguments[ie - 1];
            return L[W].apply(this, ve)
        }
    }
    function I(L, H, W) {
        const ve = H.send
          , ie = H.ts
          , ue = H.methodLevel
          , Te = H.methodValue
          , Ue = H.val
          , m = L._logEvent.bindings;
        _(W, L._serialize || Object.keys(L.serializers), L.serializers, L._stdErrSerialize === void 0 ? !0 : L._stdErrSerialize),
        L._logEvent.ts = ie,
        L._logEvent.messages = W.filter(function(x) {
            return m.indexOf(x) === -1
        }),
        L._logEvent.level.label = ue,
        L._logEvent.level.value = Te,
        ve(ue, L._logEvent, Ue),
        L._logEvent = R(m)
    }
    function R(L) {
        return {
            ts: 0,
            messages: [],
            bindings: L || [],
            level: {
                label: "",
                value: 0
            }
        }
    }
    function A(L) {
        const H = {
            type: L.constructor.name,
            msg: L.message,
            stack: L.stack
        };
        for (const W in L)
            H[W] === void 0 && (H[W] = L[W]);
        return H
    }
    function z(L) {
        return typeof L.timestamp == "function" ? L.timestamp : L.timestamp === !1 ? he : le
    }
    function T() {
        return {}
    }
    function F(L) {
        return L
    }
    function re() {}
    function he() {
        return !1
    }
    function le() {
        return Date.now()
    }
    function fe() {
        return Math.round(Date.now() / 1e3)
    }
    function pe() {
        return new Date(Date.now()).toISOString()
    }
    function de() {
        function L(H) {
            return typeof H < "u" && H
        }
        try {
            return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", {
                get: function() {
                    return delete Object.prototype.globalThis,
                    this.globalThis = this
                },
                configurable: !0
            }),
            globalThis
        } catch {
            return L(self) || L(window) || L(this) || {}
        }
    }
    return ic
}
var ki = {}, Yh;
function rf() {
    return Yh || (Yh = 1,
    Object.defineProperty(ki, "__esModule", {
        value: !0
    }),
    ki.PINO_CUSTOM_CONTEXT_KEY = ki.PINO_LOGGER_DEFAULTS = void 0,
    ki.PINO_LOGGER_DEFAULTS = {
        level: "info"
    },
    ki.PINO_CUSTOM_CONTEXT_KEY = "custom_context"),
    ki
}
var tr = {}, Xh;
function Uw() {
    if (Xh)
        return tr;
    Xh = 1,
    Object.defineProperty(tr, "__esModule", {
        value: !0
    }),
    tr.generateChildLogger = tr.formatChildLoggerContext = tr.getLoggerContext = tr.setBrowserLoggerContext = tr.getBrowserLoggerContext = tr.getDefaultLoggerOptions = void 0;
    const a = rf();
    function r(g) {
        return Object.assign(Object.assign({}, g), {
            level: (g == null ? void 0 : g.level) || a.PINO_LOGGER_DEFAULTS.level
        })
    }
    tr.getDefaultLoggerOptions = r;
    function i(g, _=a.PINO_CUSTOM_CONTEXT_KEY) {
        return g[_] || ""
    }
    tr.getBrowserLoggerContext = i;
    function n(g, _, v=a.PINO_CUSTOM_CONTEXT_KEY) {
        return g[v] = _,
        g
    }
    tr.setBrowserLoggerContext = n;
    function o(g, _=a.PINO_CUSTOM_CONTEXT_KEY) {
        let v = "";
        return typeof g.bindings > "u" ? v = i(g, _) : v = g.bindings().context || "",
        v
    }
    tr.getLoggerContext = o;
    function h(g, _, v=a.PINO_CUSTOM_CONTEXT_KEY) {
        const I = o(g, v);
        return I.trim() ? `${I}/${_}` : _
    }
    tr.formatChildLoggerContext = h;
    function p(g, _, v=a.PINO_CUSTOM_CONTEXT_KEY) {
        const I = h(g, _, v)
          , R = g.child({
            context: I
        });
        return n(R, I, v)
    }
    return tr.generateChildLogger = p,
    tr
}
(function(a) {
    Object.defineProperty(a, "__esModule", {
        value: !0
    }),
    a.pino = void 0;
    const r = ws
      , i = r.__importDefault(zw());
    Object.defineProperty(a, "pino", {
        enumerable: !0,
        get: function() {
            return i.default
        }
    }),
    r.__exportStar(rf(), a),
    r.__exportStar(Uw(), a)
}
)(Re);
class Hw extends Fi {
    constructor(r) {
        super(),
        this.opts = r,
        this.protocol = "wc",
        this.version = 2
    }
}
let kw = class extends Fi {
    constructor(r, i) {
        super(),
        this.core = r,
        this.logger = i,
        this.records = new Map
    }
}
  , Kw = class {
    constructor(r, i) {
        this.logger = r,
        this.core = i
    }
}
  , Bw = class extends Fi {
    constructor(r, i) {
        super(),
        this.relayer = r,
        this.logger = i
    }
}
  , Fw = class extends Fi {
    constructor(r) {
        super()
    }
}
  , Vw = class {
    constructor(r, i, n, o) {
        this.core = r,
        this.logger = i,
        this.name = n
    }
}
;
class Gw extends Fi {
    constructor(r, i) {
        super(),
        this.relayer = r,
        this.logger = i
    }
}
let Ww = class extends Fi {
    constructor(r, i) {
        super(),
        this.core = r,
        this.logger = i
    }
}
  , Jw = class {
    constructor(r, i) {
        this.projectId = r,
        this.logger = i
    }
}
  , Qw = class {
    constructor(r, i) {
        this.projectId = r,
        this.logger = i
    }
}
  , Yw = class {
    constructor(r) {
        this.opts = r,
        this.protocol = "wc",
        this.version = 2
    }
}
  , Xw = class {
    constructor(r) {
        this.client = r
    }
}
;
var Sc = {}
  , sf = {};
(function(a) {
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var r = p0
      , i = Bl;
    a.DIGEST_LENGTH = 64,
    a.BLOCK_SIZE = 128;
    var n = function() {
        function g() {
            this.digestLength = a.DIGEST_LENGTH,
            this.blockSize = a.BLOCK_SIZE,
            this._stateHi = new Int32Array(8),
            this._stateLo = new Int32Array(8),
            this._tempHi = new Int32Array(16),
            this._tempLo = new Int32Array(16),
            this._buffer = new Uint8Array(256),
            this._bufferLength = 0,
            this._bytesHashed = 0,
            this._finished = !1,
            this.reset()
        }
        return g.prototype._initState = function() {
            this._stateHi[0] = 1779033703,
            this._stateHi[1] = 3144134277,
            this._stateHi[2] = 1013904242,
            this._stateHi[3] = 2773480762,
            this._stateHi[4] = 1359893119,
            this._stateHi[5] = 2600822924,
            this._stateHi[6] = 528734635,
            this._stateHi[7] = 1541459225,
            this._stateLo[0] = 4089235720,
            this._stateLo[1] = 2227873595,
            this._stateLo[2] = 4271175723,
            this._stateLo[3] = 1595750129,
            this._stateLo[4] = 2917565137,
            this._stateLo[5] = 725511199,
            this._stateLo[6] = 4215389547,
            this._stateLo[7] = 327033209
        }
        ,
        g.prototype.reset = function() {
            return this._initState(),
            this._bufferLength = 0,
            this._bytesHashed = 0,
            this._finished = !1,
            this
        }
        ,
        g.prototype.clean = function() {
            i.wipe(this._buffer),
            i.wipe(this._tempHi),
            i.wipe(this._tempLo),
            this.reset()
        }
        ,
        g.prototype.update = function(_, v) {
            if (v === void 0 && (v = _.length),
            this._finished)
                throw new Error("SHA512: can't update because hash was finished.");
            var I = 0;
            if (this._bytesHashed += v,
            this._bufferLength > 0) {
                for (; this._bufferLength < a.BLOCK_SIZE && v > 0; )
                    this._buffer[this._bufferLength++] = _[I++],
                    v--;
                this._bufferLength === this.blockSize && (h(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize),
                this._bufferLength = 0)
            }
            for (v >= this.blockSize && (I = h(this._tempHi, this._tempLo, this._stateHi, this._stateLo, _, I, v),
            v %= this.blockSize); v > 0; )
                this._buffer[this._bufferLength++] = _[I++],
                v--;
            return this
        }
        ,
        g.prototype.finish = function(_) {
            if (!this._finished) {
                var v = this._bytesHashed
                  , I = this._bufferLength
                  , R = v / 536870912 | 0
                  , A = v << 3
                  , z = v % 128 < 112 ? 128 : 256;
                this._buffer[I] = 128;
                for (var T = I + 1; T < z - 8; T++)
                    this._buffer[T] = 0;
                r.writeUint32BE(R, this._buffer, z - 8),
                r.writeUint32BE(A, this._buffer, z - 4),
                h(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, z),
                this._finished = !0
            }
            for (var T = 0; T < this.digestLength / 8; T++)
                r.writeUint32BE(this._stateHi[T], _, T * 8),
                r.writeUint32BE(this._stateLo[T], _, T * 8 + 4);
            return this
        }
        ,
        g.prototype.digest = function() {
            var _ = new Uint8Array(this.digestLength);
            return this.finish(_),
            _
        }
        ,
        g.prototype.saveState = function() {
            if (this._finished)
                throw new Error("SHA256: cannot save finished state");
            return {
                stateHi: new Int32Array(this._stateHi),
                stateLo: new Int32Array(this._stateLo),
                buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
                bufferLength: this._bufferLength,
                bytesHashed: this._bytesHashed
            }
        }
        ,
        g.prototype.restoreState = function(_) {
            return this._stateHi.set(_.stateHi),
            this._stateLo.set(_.stateLo),
            this._bufferLength = _.bufferLength,
            _.buffer && this._buffer.set(_.buffer),
            this._bytesHashed = _.bytesHashed,
            this._finished = !1,
            this
        }
        ,
        g.prototype.cleanSavedState = function(_) {
            i.wipe(_.stateHi),
            i.wipe(_.stateLo),
            _.buffer && i.wipe(_.buffer),
            _.bufferLength = 0,
            _.bytesHashed = 0
        }
        ,
        g
    }();
    a.SHA512 = n;
    var o = new Int32Array([1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399, 3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265, 2453635748, 2937671579, 2870763221, 3664609560, 3624381080, 2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987, 3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103, 633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774, 944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983, 1495990901, 1249150122, 1856431235, 1555081692, 3175218132, 1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016, 2952996808, 2566594879, 3210313671, 3203337956, 3336571891, 1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895, 168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372, 1522805485, 1396182291, 2643833823, 1695183700, 2343527390, 1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627, 2730485921, 1290863460, 2820302411, 3158454273, 3259730800, 3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804, 1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734, 3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877, 3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063, 2003034995, 1747873779, 3602036899, 1955562222, 1575990012, 2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044, 2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573, 3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711, 3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554, 174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315, 685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100, 1126000580, 2618297676, 1288033470, 3409855158, 1501505948, 4234509866, 1607167915, 987167468, 1816402316, 1246189591]);
    function h(g, _, v, I, R, A, z) {
        for (var T = v[0], F = v[1], re = v[2], he = v[3], le = v[4], fe = v[5], pe = v[6], de = v[7], L = I[0], H = I[1], W = I[2], ve = I[3], ie = I[4], ue = I[5], Te = I[6], Ue = I[7], m, x, X, ce, V, k, B, G; z >= 128; ) {
            for (var Je = 0; Je < 16; Je++) {
                var Ke = 8 * Je + A;
                g[Je] = r.readUint32BE(R, Ke),
                _[Je] = r.readUint32BE(R, Ke + 4)
            }
            for (var Je = 0; Je < 80; Je++) {
                var jr = T
                  , Ie = F
                  , It = re
                  , $ = he
                  , D = le
                  , C = fe
                  , u = pe
                  , E = de
                  , ee = L
                  , ge = H
                  , be = W
                  , Ne = ve
                  , $e = ie
                  , Se = ue
                  , xt = Te
                  , mt = Ue;
                if (m = de,
                x = Ue,
                V = x & 65535,
                k = x >>> 16,
                B = m & 65535,
                G = m >>> 16,
                m = (le >>> 14 | ie << 18) ^ (le >>> 18 | ie << 14) ^ (ie >>> 9 | le << 23),
                x = (ie >>> 14 | le << 18) ^ (ie >>> 18 | le << 14) ^ (le >>> 9 | ie << 23),
                V += x & 65535,
                k += x >>> 16,
                B += m & 65535,
                G += m >>> 16,
                m = le & fe ^ ~le & pe,
                x = ie & ue ^ ~ie & Te,
                V += x & 65535,
                k += x >>> 16,
                B += m & 65535,
                G += m >>> 16,
                m = o[Je * 2],
                x = o[Je * 2 + 1],
                V += x & 65535,
                k += x >>> 16,
                B += m & 65535,
                G += m >>> 16,
                m = g[Je % 16],
                x = _[Je % 16],
                V += x & 65535,
                k += x >>> 16,
                B += m & 65535,
                G += m >>> 16,
                k += V >>> 16,
                B += k >>> 16,
                G += B >>> 16,
                X = B & 65535 | G << 16,
                ce = V & 65535 | k << 16,
                m = X,
                x = ce,
                V = x & 65535,
                k = x >>> 16,
                B = m & 65535,
                G = m >>> 16,
                m = (T >>> 28 | L << 4) ^ (L >>> 2 | T << 30) ^ (L >>> 7 | T << 25),
                x = (L >>> 28 | T << 4) ^ (T >>> 2 | L << 30) ^ (T >>> 7 | L << 25),
                V += x & 65535,
                k += x >>> 16,
                B += m & 65535,
                G += m >>> 16,
                m = T & F ^ T & re ^ F & re,
                x = L & H ^ L & W ^ H & W,
                V += x & 65535,
                k += x >>> 16,
                B += m & 65535,
                G += m >>> 16,
                k += V >>> 16,
                B += k >>> 16,
                G += B >>> 16,
                E = B & 65535 | G << 16,
                mt = V & 65535 | k << 16,
                m = $,
                x = Ne,
                V = x & 65535,
                k = x >>> 16,
                B = m & 65535,
                G = m >>> 16,
                m = X,
                x = ce,
                V += x & 65535,
                k += x >>> 16,
                B += m & 65535,
                G += m >>> 16,
                k += V >>> 16,
                B += k >>> 16,
                G += B >>> 16,
                $ = B & 65535 | G << 16,
                Ne = V & 65535 | k << 16,
                F = jr,
                re = Ie,
                he = It,
                le = $,
                fe = D,
                pe = C,
                de = u,
                T = E,
                H = ee,
                W = ge,
                ve = be,
                ie = Ne,
                ue = $e,
                Te = Se,
                Ue = xt,
                L = mt,
                Je % 16 === 15)
                    for (var Ke = 0; Ke < 16; Ke++)
                        m = g[Ke],
                        x = _[Ke],
                        V = x & 65535,
                        k = x >>> 16,
                        B = m & 65535,
                        G = m >>> 16,
                        m = g[(Ke + 9) % 16],
                        x = _[(Ke + 9) % 16],
                        V += x & 65535,
                        k += x >>> 16,
                        B += m & 65535,
                        G += m >>> 16,
                        X = g[(Ke + 1) % 16],
                        ce = _[(Ke + 1) % 16],
                        m = (X >>> 1 | ce << 31) ^ (X >>> 8 | ce << 24) ^ X >>> 7,
                        x = (ce >>> 1 | X << 31) ^ (ce >>> 8 | X << 24) ^ (ce >>> 7 | X << 25),
                        V += x & 65535,
                        k += x >>> 16,
                        B += m & 65535,
                        G += m >>> 16,
                        X = g[(Ke + 14) % 16],
                        ce = _[(Ke + 14) % 16],
                        m = (X >>> 19 | ce << 13) ^ (ce >>> 29 | X << 3) ^ X >>> 6,
                        x = (ce >>> 19 | X << 13) ^ (X >>> 29 | ce << 3) ^ (ce >>> 6 | X << 26),
                        V += x & 65535,
                        k += x >>> 16,
                        B += m & 65535,
                        G += m >>> 16,
                        k += V >>> 16,
                        B += k >>> 16,
                        G += B >>> 16,
                        g[Ke] = B & 65535 | G << 16,
                        _[Ke] = V & 65535 | k << 16
            }
            m = T,
            x = L,
            V = x & 65535,
            k = x >>> 16,
            B = m & 65535,
            G = m >>> 16,
            m = v[0],
            x = I[0],
            V += x & 65535,
            k += x >>> 16,
            B += m & 65535,
            G += m >>> 16,
            k += V >>> 16,
            B += k >>> 16,
            G += B >>> 16,
            v[0] = T = B & 65535 | G << 16,
            I[0] = L = V & 65535 | k << 16,
            m = F,
            x = H,
            V = x & 65535,
            k = x >>> 16,
            B = m & 65535,
            G = m >>> 16,
            m = v[1],
            x = I[1],
            V += x & 65535,
            k += x >>> 16,
            B += m & 65535,
            G += m >>> 16,
            k += V >>> 16,
            B += k >>> 16,
            G += B >>> 16,
            v[1] = F = B & 65535 | G << 16,
            I[1] = H = V & 65535 | k << 16,
            m = re,
            x = W,
            V = x & 65535,
            k = x >>> 16,
            B = m & 65535,
            G = m >>> 16,
            m = v[2],
            x = I[2],
            V += x & 65535,
            k += x >>> 16,
            B += m & 65535,
            G += m >>> 16,
            k += V >>> 16,
            B += k >>> 16,
            G += B >>> 16,
            v[2] = re = B & 65535 | G << 16,
            I[2] = W = V & 65535 | k << 16,
            m = he,
            x = ve,
            V = x & 65535,
            k = x >>> 16,
            B = m & 65535,
            G = m >>> 16,
            m = v[3],
            x = I[3],
            V += x & 65535,
            k += x >>> 16,
            B += m & 65535,
            G += m >>> 16,
            k += V >>> 16,
            B += k >>> 16,
            G += B >>> 16,
            v[3] = he = B & 65535 | G << 16,
            I[3] = ve = V & 65535 | k << 16,
            m = le,
            x = ie,
            V = x & 65535,
            k = x >>> 16,
            B = m & 65535,
            G = m >>> 16,
            m = v[4],
            x = I[4],
            V += x & 65535,
            k += x >>> 16,
            B += m & 65535,
            G += m >>> 16,
            k += V >>> 16,
            B += k >>> 16,
            G += B >>> 16,
            v[4] = le = B & 65535 | G << 16,
            I[4] = ie = V & 65535 | k << 16,
            m = fe,
            x = ue,
            V = x & 65535,
            k = x >>> 16,
            B = m & 65535,
            G = m >>> 16,
            m = v[5],
            x = I[5],
            V += x & 65535,
            k += x >>> 16,
            B += m & 65535,
            G += m >>> 16,
            k += V >>> 16,
            B += k >>> 16,
            G += B >>> 16,
            v[5] = fe = B & 65535 | G << 16,
            I[5] = ue = V & 65535 | k << 16,
            m = pe,
            x = Te,
            V = x & 65535,
            k = x >>> 16,
            B = m & 65535,
            G = m >>> 16,
            m = v[6],
            x = I[6],
            V += x & 65535,
            k += x >>> 16,
            B += m & 65535,
            G += m >>> 16,
            k += V >>> 16,
            B += k >>> 16,
            G += B >>> 16,
            v[6] = pe = B & 65535 | G << 16,
            I[6] = Te = V & 65535 | k << 16,
            m = de,
            x = Ue,
            V = x & 65535,
            k = x >>> 16,
            B = m & 65535,
            G = m >>> 16,
            m = v[7],
            x = I[7],
            V += x & 65535,
            k += x >>> 16,
            B += m & 65535,
            G += m >>> 16,
            k += V >>> 16,
            B += k >>> 16,
            G += B >>> 16,
            v[7] = de = B & 65535 | G << 16,
            I[7] = Ue = V & 65535 | k << 16,
            A += 128,
            z -= 128
        }
        return A
    }
    function p(g) {
        var _ = new n;
        _.update(g);
        var v = _.digest();
        return _.clean(),
        v
    }
    a.hash = p
}
)(sf);
(function(a) {
    Object.defineProperty(a, "__esModule", {
        value: !0
    }),
    a.convertSecretKeyToX25519 = a.convertPublicKeyToX25519 = a.verify = a.sign = a.extractPublicKeyFromSecretKey = a.generateKeyPair = a.generateKeyPairFromSeed = a.SEED_LENGTH = a.SECRET_KEY_LENGTH = a.PUBLIC_KEY_LENGTH = a.SIGNATURE_LENGTH = void 0;
    const r = Fl
      , i = sf
      , n = Bl;
    a.SIGNATURE_LENGTH = 64,
    a.PUBLIC_KEY_LENGTH = 32,
    a.SECRET_KEY_LENGTH = 64,
    a.SEED_LENGTH = 32;
    function o($) {
        const D = new Float64Array(16);
        if ($)
            for (let C = 0; C < $.length; C++)
                D[C] = $[C];
        return D
    }
    const h = new Uint8Array(32);
    h[0] = 9;
    const p = o()
      , g = o([1])
      , _ = o([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995])
      , v = o([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222])
      , I = o([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553])
      , R = o([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214])
      , A = o([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
    function z($, D) {
        for (let C = 0; C < 16; C++)
            $[C] = D[C] | 0
    }
    function T($) {
        let D = 1;
        for (let C = 0; C < 16; C++) {
            let u = $[C] + D + 65535;
            D = Math.floor(u / 65536),
            $[C] = u - D * 65536
        }
        $[0] += D - 1 + 37 * (D - 1)
    }
    function F($, D, C) {
        const u = ~(C - 1);
        for (let E = 0; E < 16; E++) {
            const ee = u & ($[E] ^ D[E]);
            $[E] ^= ee,
            D[E] ^= ee
        }
    }
    function re($, D) {
        const C = o()
          , u = o();
        for (let E = 0; E < 16; E++)
            u[E] = D[E];
        T(u),
        T(u),
        T(u);
        for (let E = 0; E < 2; E++) {
            C[0] = u[0] - 65517;
            for (let ge = 1; ge < 15; ge++)
                C[ge] = u[ge] - 65535 - (C[ge - 1] >> 16 & 1),
                C[ge - 1] &= 65535;
            C[15] = u[15] - 32767 - (C[14] >> 16 & 1);
            const ee = C[15] >> 16 & 1;
            C[14] &= 65535,
            F(u, C, 1 - ee)
        }
        for (let E = 0; E < 16; E++)
            $[2 * E] = u[E] & 255,
            $[2 * E + 1] = u[E] >> 8
    }
    function he($, D) {
        let C = 0;
        for (let u = 0; u < 32; u++)
            C |= $[u] ^ D[u];
        return (1 & C - 1 >>> 8) - 1
    }
    function le($, D) {
        const C = new Uint8Array(32)
          , u = new Uint8Array(32);
        return re(C, $),
        re(u, D),
        he(C, u)
    }
    function fe($) {
        const D = new Uint8Array(32);
        return re(D, $),
        D[0] & 1
    }
    function pe($, D) {
        for (let C = 0; C < 16; C++)
            $[C] = D[2 * C] + (D[2 * C + 1] << 8);
        $[15] &= 32767
    }
    function de($, D, C) {
        for (let u = 0; u < 16; u++)
            $[u] = D[u] + C[u]
    }
    function L($, D, C) {
        for (let u = 0; u < 16; u++)
            $[u] = D[u] - C[u]
    }
    function H($, D, C) {
        let u, E, ee = 0, ge = 0, be = 0, Ne = 0, $e = 0, Se = 0, xt = 0, mt = 0, ot = 0, qe = 0, Ye = 0, Xe = 0, at = 0, He = 0, Ze = 0, De = 0, Be = 0, ht = 0, je = 0, Pt = 0, $t = 0, Ht = 0, kt = 0, Mt = 0, Jt = 0, rr = 0, zr = 0, Qt = 0, Vr = 0, li = 0, Oi = 0, lt = C[0], rt = C[1], ft = C[2], pt = C[3], ct = C[4], it = C[5], St = C[6], Ot = C[7], dt = C[8], Rt = C[9], gt = C[10], wt = C[11], yt = C[12], Qe = C[13], Ct = C[14], At = C[15];
        u = D[0],
        ee += u * lt,
        ge += u * rt,
        be += u * ft,
        Ne += u * pt,
        $e += u * ct,
        Se += u * it,
        xt += u * St,
        mt += u * Ot,
        ot += u * dt,
        qe += u * Rt,
        Ye += u * gt,
        Xe += u * wt,
        at += u * yt,
        He += u * Qe,
        Ze += u * Ct,
        De += u * At,
        u = D[1],
        ge += u * lt,
        be += u * rt,
        Ne += u * ft,
        $e += u * pt,
        Se += u * ct,
        xt += u * it,
        mt += u * St,
        ot += u * Ot,
        qe += u * dt,
        Ye += u * Rt,
        Xe += u * gt,
        at += u * wt,
        He += u * yt,
        Ze += u * Qe,
        De += u * Ct,
        Be += u * At,
        u = D[2],
        be += u * lt,
        Ne += u * rt,
        $e += u * ft,
        Se += u * pt,
        xt += u * ct,
        mt += u * it,
        ot += u * St,
        qe += u * Ot,
        Ye += u * dt,
        Xe += u * Rt,
        at += u * gt,
        He += u * wt,
        Ze += u * yt,
        De += u * Qe,
        Be += u * Ct,
        ht += u * At,
        u = D[3],
        Ne += u * lt,
        $e += u * rt,
        Se += u * ft,
        xt += u * pt,
        mt += u * ct,
        ot += u * it,
        qe += u * St,
        Ye += u * Ot,
        Xe += u * dt,
        at += u * Rt,
        He += u * gt,
        Ze += u * wt,
        De += u * yt,
        Be += u * Qe,
        ht += u * Ct,
        je += u * At,
        u = D[4],
        $e += u * lt,
        Se += u * rt,
        xt += u * ft,
        mt += u * pt,
        ot += u * ct,
        qe += u * it,
        Ye += u * St,
        Xe += u * Ot,
        at += u * dt,
        He += u * Rt,
        Ze += u * gt,
        De += u * wt,
        Be += u * yt,
        ht += u * Qe,
        je += u * Ct,
        Pt += u * At,
        u = D[5],
        Se += u * lt,
        xt += u * rt,
        mt += u * ft,
        ot += u * pt,
        qe += u * ct,
        Ye += u * it,
        Xe += u * St,
        at += u * Ot,
        He += u * dt,
        Ze += u * Rt,
        De += u * gt,
        Be += u * wt,
        ht += u * yt,
        je += u * Qe,
        Pt += u * Ct,
        $t += u * At,
        u = D[6],
        xt += u * lt,
        mt += u * rt,
        ot += u * ft,
        qe += u * pt,
        Ye += u * ct,
        Xe += u * it,
        at += u * St,
        He += u * Ot,
        Ze += u * dt,
        De += u * Rt,
        Be += u * gt,
        ht += u * wt,
        je += u * yt,
        Pt += u * Qe,
        $t += u * Ct,
        Ht += u * At,
        u = D[7],
        mt += u * lt,
        ot += u * rt,
        qe += u * ft,
        Ye += u * pt,
        Xe += u * ct,
        at += u * it,
        He += u * St,
        Ze += u * Ot,
        De += u * dt,
        Be += u * Rt,
        ht += u * gt,
        je += u * wt,
        Pt += u * yt,
        $t += u * Qe,
        Ht += u * Ct,
        kt += u * At,
        u = D[8],
        ot += u * lt,
        qe += u * rt,
        Ye += u * ft,
        Xe += u * pt,
        at += u * ct,
        He += u * it,
        Ze += u * St,
        De += u * Ot,
        Be += u * dt,
        ht += u * Rt,
        je += u * gt,
        Pt += u * wt,
        $t += u * yt,
        Ht += u * Qe,
        kt += u * Ct,
        Mt += u * At,
        u = D[9],
        qe += u * lt,
        Ye += u * rt,
        Xe += u * ft,
        at += u * pt,
        He += u * ct,
        Ze += u * it,
        De += u * St,
        Be += u * Ot,
        ht += u * dt,
        je += u * Rt,
        Pt += u * gt,
        $t += u * wt,
        Ht += u * yt,
        kt += u * Qe,
        Mt += u * Ct,
        Jt += u * At,
        u = D[10],
        Ye += u * lt,
        Xe += u * rt,
        at += u * ft,
        He += u * pt,
        Ze += u * ct,
        De += u * it,
        Be += u * St,
        ht += u * Ot,
        je += u * dt,
        Pt += u * Rt,
        $t += u * gt,
        Ht += u * wt,
        kt += u * yt,
        Mt += u * Qe,
        Jt += u * Ct,
        rr += u * At,
        u = D[11],
        Xe += u * lt,
        at += u * rt,
        He += u * ft,
        Ze += u * pt,
        De += u * ct,
        Be += u * it,
        ht += u * St,
        je += u * Ot,
        Pt += u * dt,
        $t += u * Rt,
        Ht += u * gt,
        kt += u * wt,
        Mt += u * yt,
        Jt += u * Qe,
        rr += u * Ct,
        zr += u * At,
        u = D[12],
        at += u * lt,
        He += u * rt,
        Ze += u * ft,
        De += u * pt,
        Be += u * ct,
        ht += u * it,
        je += u * St,
        Pt += u * Ot,
        $t += u * dt,
        Ht += u * Rt,
        kt += u * gt,
        Mt += u * wt,
        Jt += u * yt,
        rr += u * Qe,
        zr += u * Ct,
        Qt += u * At,
        u = D[13],
        He += u * lt,
        Ze += u * rt,
        De += u * ft,
        Be += u * pt,
        ht += u * ct,
        je += u * it,
        Pt += u * St,
        $t += u * Ot,
        Ht += u * dt,
        kt += u * Rt,
        Mt += u * gt,
        Jt += u * wt,
        rr += u * yt,
        zr += u * Qe,
        Qt += u * Ct,
        Vr += u * At,
        u = D[14],
        Ze += u * lt,
        De += u * rt,
        Be += u * ft,
        ht += u * pt,
        je += u * ct,
        Pt += u * it,
        $t += u * St,
        Ht += u * Ot,
        kt += u * dt,
        Mt += u * Rt,
        Jt += u * gt,
        rr += u * wt,
        zr += u * yt,
        Qt += u * Qe,
        Vr += u * Ct,
        li += u * At,
        u = D[15],
        De += u * lt,
        Be += u * rt,
        ht += u * ft,
        je += u * pt,
        Pt += u * ct,
        $t += u * it,
        Ht += u * St,
        kt += u * Ot,
        Mt += u * dt,
        Jt += u * Rt,
        rr += u * gt,
        zr += u * wt,
        Qt += u * yt,
        Vr += u * Qe,
        li += u * Ct,
        Oi += u * At,
        ee += 38 * Be,
        ge += 38 * ht,
        be += 38 * je,
        Ne += 38 * Pt,
        $e += 38 * $t,
        Se += 38 * Ht,
        xt += 38 * kt,
        mt += 38 * Mt,
        ot += 38 * Jt,
        qe += 38 * rr,
        Ye += 38 * zr,
        Xe += 38 * Qt,
        at += 38 * Vr,
        He += 38 * li,
        Ze += 38 * Oi,
        E = 1,
        u = ee + E + 65535,
        E = Math.floor(u / 65536),
        ee = u - E * 65536,
        u = ge + E + 65535,
        E = Math.floor(u / 65536),
        ge = u - E * 65536,
        u = be + E + 65535,
        E = Math.floor(u / 65536),
        be = u - E * 65536,
        u = Ne + E + 65535,
        E = Math.floor(u / 65536),
        Ne = u - E * 65536,
        u = $e + E + 65535,
        E = Math.floor(u / 65536),
        $e = u - E * 65536,
        u = Se + E + 65535,
        E = Math.floor(u / 65536),
        Se = u - E * 65536,
        u = xt + E + 65535,
        E = Math.floor(u / 65536),
        xt = u - E * 65536,
        u = mt + E + 65535,
        E = Math.floor(u / 65536),
        mt = u - E * 65536,
        u = ot + E + 65535,
        E = Math.floor(u / 65536),
        ot = u - E * 65536,
        u = qe + E + 65535,
        E = Math.floor(u / 65536),
        qe = u - E * 65536,
        u = Ye + E + 65535,
        E = Math.floor(u / 65536),
        Ye = u - E * 65536,
        u = Xe + E + 65535,
        E = Math.floor(u / 65536),
        Xe = u - E * 65536,
        u = at + E + 65535,
        E = Math.floor(u / 65536),
        at = u - E * 65536,
        u = He + E + 65535,
        E = Math.floor(u / 65536),
        He = u - E * 65536,
        u = Ze + E + 65535,
        E = Math.floor(u / 65536),
        Ze = u - E * 65536,
        u = De + E + 65535,
        E = Math.floor(u / 65536),
        De = u - E * 65536,
        ee += E - 1 + 37 * (E - 1),
        E = 1,
        u = ee + E + 65535,
        E = Math.floor(u / 65536),
        ee = u - E * 65536,
        u = ge + E + 65535,
        E = Math.floor(u / 65536),
        ge = u - E * 65536,
        u = be + E + 65535,
        E = Math.floor(u / 65536),
        be = u - E * 65536,
        u = Ne + E + 65535,
        E = Math.floor(u / 65536),
        Ne = u - E * 65536,
        u = $e + E + 65535,
        E = Math.floor(u / 65536),
        $e = u - E * 65536,
        u = Se + E + 65535,
        E = Math.floor(u / 65536),
        Se = u - E * 65536,
        u = xt + E + 65535,
        E = Math.floor(u / 65536),
        xt = u - E * 65536,
        u = mt + E + 65535,
        E = Math.floor(u / 65536),
        mt = u - E * 65536,
        u = ot + E + 65535,
        E = Math.floor(u / 65536),
        ot = u - E * 65536,
        u = qe + E + 65535,
        E = Math.floor(u / 65536),
        qe = u - E * 65536,
        u = Ye + E + 65535,
        E = Math.floor(u / 65536),
        Ye = u - E * 65536,
        u = Xe + E + 65535,
        E = Math.floor(u / 65536),
        Xe = u - E * 65536,
        u = at + E + 65535,
        E = Math.floor(u / 65536),
        at = u - E * 65536,
        u = He + E + 65535,
        E = Math.floor(u / 65536),
        He = u - E * 65536,
        u = Ze + E + 65535,
        E = Math.floor(u / 65536),
        Ze = u - E * 65536,
        u = De + E + 65535,
        E = Math.floor(u / 65536),
        De = u - E * 65536,
        ee += E - 1 + 37 * (E - 1),
        $[0] = ee,
        $[1] = ge,
        $[2] = be,
        $[3] = Ne,
        $[4] = $e,
        $[5] = Se,
        $[6] = xt,
        $[7] = mt,
        $[8] = ot,
        $[9] = qe,
        $[10] = Ye,
        $[11] = Xe,
        $[12] = at,
        $[13] = He,
        $[14] = Ze,
        $[15] = De
    }
    function W($, D) {
        H($, D, D)
    }
    function ve($, D) {
        const C = o();
        let u;
        for (u = 0; u < 16; u++)
            C[u] = D[u];
        for (u = 253; u >= 0; u--)
            W(C, C),
            u !== 2 && u !== 4 && H(C, C, D);
        for (u = 0; u < 16; u++)
            $[u] = C[u]
    }
    function ie($, D) {
        const C = o();
        let u;
        for (u = 0; u < 16; u++)
            C[u] = D[u];
        for (u = 250; u >= 0; u--)
            W(C, C),
            u !== 1 && H(C, C, D);
        for (u = 0; u < 16; u++)
            $[u] = C[u]
    }
    function ue($, D) {
        const C = o()
          , u = o()
          , E = o()
          , ee = o()
          , ge = o()
          , be = o()
          , Ne = o()
          , $e = o()
          , Se = o();
        L(C, $[1], $[0]),
        L(Se, D[1], D[0]),
        H(C, C, Se),
        de(u, $[0], $[1]),
        de(Se, D[0], D[1]),
        H(u, u, Se),
        H(E, $[3], D[3]),
        H(E, E, v),
        H(ee, $[2], D[2]),
        de(ee, ee, ee),
        L(ge, u, C),
        L(be, ee, E),
        de(Ne, ee, E),
        de($e, u, C),
        H($[0], ge, be),
        H($[1], $e, Ne),
        H($[2], Ne, be),
        H($[3], ge, $e)
    }
    function Te($, D, C) {
        for (let u = 0; u < 4; u++)
            F($[u], D[u], C)
    }
    function Ue($, D) {
        const C = o()
          , u = o()
          , E = o();
        ve(E, D[2]),
        H(C, D[0], E),
        H(u, D[1], E),
        re($, u),
        $[31] ^= fe(C) << 7
    }
    function m($, D, C) {
        z($[0], p),
        z($[1], g),
        z($[2], g),
        z($[3], p);
        for (let u = 255; u >= 0; --u) {
            const E = C[u / 8 | 0] >> (u & 7) & 1;
            Te($, D, E),
            ue(D, $),
            ue($, $),
            Te($, D, E)
        }
    }
    function x($, D) {
        const C = [o(), o(), o(), o()];
        z(C[0], I),
        z(C[1], R),
        z(C[2], g),
        H(C[3], I, R),
        m($, C, D)
    }
    function X($) {
        if ($.length !== a.SEED_LENGTH)
            throw new Error(`ed25519: seed must be ${a.SEED_LENGTH} bytes`);
        const D = (0,
        i.hash)($);
        D[0] &= 248,
        D[31] &= 127,
        D[31] |= 64;
        const C = new Uint8Array(32)
          , u = [o(), o(), o(), o()];
        x(u, D),
        Ue(C, u);
        const E = new Uint8Array(64);
        return E.set($),
        E.set(C, 32),
        {
            publicKey: C,
            secretKey: E
        }
    }
    a.generateKeyPairFromSeed = X;
    function ce($) {
        const D = (0,
        r.randomBytes)(32, $)
          , C = X(D);
        return (0,
        n.wipe)(D),
        C
    }
    a.generateKeyPair = ce;
    function V($) {
        if ($.length !== a.SECRET_KEY_LENGTH)
            throw new Error(`ed25519: secret key must be ${a.SECRET_KEY_LENGTH} bytes`);
        return new Uint8Array($.subarray(32))
    }
    a.extractPublicKeyFromSecretKey = V;
    const k = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
    function B($, D) {
        let C, u, E, ee;
        for (u = 63; u >= 32; --u) {
            for (C = 0,
            E = u - 32,
            ee = u - 12; E < ee; ++E)
                D[E] += C - 16 * D[u] * k[E - (u - 32)],
                C = Math.floor((D[E] + 128) / 256),
                D[E] -= C * 256;
            D[E] += C,
            D[u] = 0
        }
        for (C = 0,
        E = 0; E < 32; E++)
            D[E] += C - (D[31] >> 4) * k[E],
            C = D[E] >> 8,
            D[E] &= 255;
        for (E = 0; E < 32; E++)
            D[E] -= C * k[E];
        for (u = 0; u < 32; u++)
            D[u + 1] += D[u] >> 8,
            $[u] = D[u] & 255
    }
    function G($) {
        const D = new Float64Array(64);
        for (let C = 0; C < 64; C++)
            D[C] = $[C];
        for (let C = 0; C < 64; C++)
            $[C] = 0;
        B($, D)
    }
    function Je($, D) {
        const C = new Float64Array(64)
          , u = [o(), o(), o(), o()]
          , E = (0,
        i.hash)($.subarray(0, 32));
        E[0] &= 248,
        E[31] &= 127,
        E[31] |= 64;
        const ee = new Uint8Array(64);
        ee.set(E.subarray(32), 32);
        const ge = new i.SHA512;
        ge.update(ee.subarray(32)),
        ge.update(D);
        const be = ge.digest();
        ge.clean(),
        G(be),
        x(u, be),
        Ue(ee, u),
        ge.reset(),
        ge.update(ee.subarray(0, 32)),
        ge.update($.subarray(32)),
        ge.update(D);
        const Ne = ge.digest();
        G(Ne);
        for (let $e = 0; $e < 32; $e++)
            C[$e] = be[$e];
        for (let $e = 0; $e < 32; $e++)
            for (let Se = 0; Se < 32; Se++)
                C[$e + Se] += Ne[$e] * E[Se];
        return B(ee.subarray(32), C),
        ee
    }
    a.sign = Je;
    function Ke($, D) {
        const C = o()
          , u = o()
          , E = o()
          , ee = o()
          , ge = o()
          , be = o()
          , Ne = o();
        return z($[2], g),
        pe($[1], D),
        W(E, $[1]),
        H(ee, E, _),
        L(E, E, $[2]),
        de(ee, $[2], ee),
        W(ge, ee),
        W(be, ge),
        H(Ne, be, ge),
        H(C, Ne, E),
        H(C, C, ee),
        ie(C, C),
        H(C, C, E),
        H(C, C, ee),
        H(C, C, ee),
        H($[0], C, ee),
        W(u, $[0]),
        H(u, u, ee),
        le(u, E) && H($[0], $[0], A),
        W(u, $[0]),
        H(u, u, ee),
        le(u, E) ? -1 : (fe($[0]) === D[31] >> 7 && L($[0], p, $[0]),
        H($[3], $[0], $[1]),
        0)
    }
    function jr($, D, C) {
        const u = new Uint8Array(32)
          , E = [o(), o(), o(), o()]
          , ee = [o(), o(), o(), o()];
        if (C.length !== a.SIGNATURE_LENGTH)
            throw new Error(`ed25519: signature must be ${a.SIGNATURE_LENGTH} bytes`);
        if (Ke(ee, $))
            return !1;
        const ge = new i.SHA512;
        ge.update(C.subarray(0, 32)),
        ge.update($),
        ge.update(D);
        const be = ge.digest();
        return G(be),
        m(E, ee, be),
        x(ee, C.subarray(32)),
        ue(E, ee),
        Ue(u, E),
        !he(C, u)
    }
    a.verify = jr;
    function Ie($) {
        let D = [o(), o(), o(), o()];
        if (Ke(D, $))
            throw new Error("Ed25519: invalid public key");
        let C = o()
          , u = o()
          , E = D[1];
        de(C, g, E),
        L(u, g, E),
        ve(u, u),
        H(C, C, u);
        let ee = new Uint8Array(32);
        return re(ee, C),
        ee
    }
    a.convertPublicKeyToX25519 = Ie;
    function It($) {
        const D = (0,
        i.hash)($.subarray(0, 32));
        D[0] &= 248,
        D[31] &= 127,
        D[31] |= 64;
        const C = new Uint8Array(D.subarray(0, 32));
        return (0,
        n.wipe)(D),
        C
    }
    a.convertSecretKeyToX25519 = It
}
)(Sc);
const Zw = "EdDSA"
  , e_ = "JWT"
  , nf = "."
  , of = "base64url"
  , t_ = "utf8"
  , r_ = "utf8"
  , i_ = ":"
  , s_ = "did"
  , n_ = "key"
  , Zh = "base58btc"
  , o_ = "z"
  , a_ = "K36"
  , c_ = 32;
function vo(a) {
    return _o(Ic(Ki(a), t_), of)
}
function af(a) {
    const r = Ic(a_, Zh)
      , i = o_ + _o(d0([r, a]), Zh);
    return [s_, n_, i].join(i_)
}
function u_(a) {
    return _o(a, of)
}
function h_(a) {
    return Ic([vo(a.header), vo(a.payload)].join(nf), r_)
}
function l_(a) {
    return [vo(a.header), vo(a.payload), u_(a.signature)].join(nf)
}
function el(a=Fl.randomBytes(c_)) {
    return Sc.generateKeyPairFromSeed(a)
}
async function f_(a, r, i, n, o=se.fromMiliseconds(Date.now())) {
    const h = {
        alg: Zw,
        typ: e_
    }
      , p = af(n.publicKey)
      , g = o + i
      , _ = {
        iss: p,
        sub: a,
        aud: r,
        iat: o,
        exp: g
    }
      , v = h_({
        header: h,
        payload: _
    })
      , I = Sc.sign(n.secretKey, v);
    return l_({
        header: h,
        payload: _,
        signature: I
    })
}
const p_ = "PARSE_ERROR"
  , d_ = "INVALID_REQUEST"
  , g_ = "METHOD_NOT_FOUND"
  , y_ = "INVALID_PARAMS"
  , cf = "INTERNAL_ERROR"
  , Oc = "SERVER_ERROR"
  , v_ = [-32700, -32600, -32601, -32602, -32603]
  , Qs = {
    [p_]: {
        code: -32700,
        message: "Parse error"
    },
    [d_]: {
        code: -32600,
        message: "Invalid Request"
    },
    [g_]: {
        code: -32601,
        message: "Method not found"
    },
    [y_]: {
        code: -32602,
        message: "Invalid params"
    },
    [cf]: {
        code: -32603,
        message: "Internal error"
    },
    [Oc]: {
        code: -32e3,
        message: "Server error"
    }
}
  , uf = Oc;
function m_(a) {
    return v_.includes(a)
}
function tl(a) {
    return Object.keys(Qs).includes(a) ? Qs[a] : Qs[uf]
}
function w_(a) {
    const r = Object.values(Qs).find(i=>i.code === a);
    return r || Qs[uf]
}
function hf(a, r, i) {
    return a.message.includes("getaddrinfo ENOTFOUND") || a.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${i} RPC url at ${r}`) : a
}
var lf = {}, si = {}, rl;
function __() {
    if (rl)
        return si;
    rl = 1,
    Object.defineProperty(si, "__esModule", {
        value: !0
    }),
    si.isBrowserCryptoAvailable = si.getSubtleCrypto = si.getBrowerCrypto = void 0;
    function a() {
        return (Mr === null || Mr === void 0 ? void 0 : Mr.crypto) || (Mr === null || Mr === void 0 ? void 0 : Mr.msCrypto) || {}
    }
    si.getBrowerCrypto = a;
    function r() {
        const n = a();
        return n.subtle || n.webkitSubtle
    }
    si.getSubtleCrypto = r;
    function i() {
        return !!a() && !!r()
    }
    return si.isBrowserCryptoAvailable = i,
    si
}
var ni = {}, il;
function b_() {
    if (il)
        return ni;
    il = 1,
    Object.defineProperty(ni, "__esModule", {
        value: !0
    }),
    ni.isBrowser = ni.isNode = ni.isReactNative = void 0;
    function a() {
        return typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative"
    }
    ni.isReactNative = a;
    function r() {
        return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u"
    }
    ni.isNode = r;
    function i() {
        return !a() && !r()
    }
    return ni.isBrowser = i,
    ni
}
(function(a) {
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    const r = ws;
    r.__exportStar(__(), a),
    r.__exportStar(b_(), a)
}
)(lf);
function Rc(a=3) {
    const r = Date.now() * Math.pow(10, a)
      , i = Math.floor(Math.random() * Math.pow(10, a));
    return r + i
}
function ff(a=6) {
    return BigInt(Rc(a))
}
function vs(a, r, i) {
    return {
        id: i || Rc(),
        jsonrpc: "2.0",
        method: a,
        params: r
    }
}
function bo(a, r) {
    return {
        id: a,
        jsonrpc: "2.0",
        result: r
    }
}
function Eo(a, r, i) {
    return {
        id: a,
        jsonrpc: "2.0",
        error: E_(r, i)
    }
}
function E_(a, r) {
    return typeof a > "u" ? tl(cf) : (typeof a == "string" && (a = Object.assign(Object.assign({}, tl(Oc)), {
        message: a
    })),
    typeof r < "u" && (a.data = r),
    m_(a.code) && (a = w_(a.code)),
    a)
}
class I_ {
}
class x_ extends I_ {
    constructor() {
        super()
    }
}
class P_ extends x_ {
    constructor(r) {
        super()
    }
}
const S_ = "^https?:"
  , O_ = "^wss?:";
function R_(a) {
    const r = a.match(new RegExp(/^\w+:/,"gi"));
    if (!(!r || !r.length))
        return r[0]
}
function pf(a, r) {
    const i = R_(a);
    return typeof i > "u" ? !1 : new RegExp(r).test(i)
}
function sl(a) {
    return pf(a, S_)
}
function nl(a) {
    return pf(a, O_)
}
function C_(a) {
    return new RegExp("wss?://localhost(:d{2,5})?").test(a)
}
function df(a) {
    return typeof a == "object" && "id"in a && "jsonrpc"in a && a.jsonrpc === "2.0"
}
function Cc(a) {
    return df(a) && "method"in a
}
function Io(a) {
    return df(a) && (ci(a) || qr(a))
}
function ci(a) {
    return "result"in a
}
function qr(a) {
    return "error"in a
}
class ui extends P_ {
    constructor(r) {
        super(r),
        this.events = new Or.EventEmitter,
        this.hasRegisteredEventListeners = !1,
        this.connection = this.setConnection(r),
        this.connection.connected && this.registerEventListeners()
    }
    async connect(r=this.connection) {
        await this.open(r)
    }
    async disconnect() {
        await this.close()
    }
    on(r, i) {
        this.events.on(r, i)
    }
    once(r, i) {
        this.events.once(r, i)
    }
    off(r, i) {
        this.events.off(r, i)
    }
    removeListener(r, i) {
        this.events.removeListener(r, i)
    }
    async request(r, i) {
        return this.requestStrict(vs(r.method, r.params || [], r.id || ff().toString()), i)
    }
    async requestStrict(r, i) {
        return new Promise(async(n,o)=>{
            if (!this.connection.connected)
                try {
                    await this.open()
                } catch (h) {
                    o(h)
                }
            this.events.on(`${r.id}`, h=>{
                qr(h) ? o(h.error) : n(h.result)
            }
            );
            try {
                await this.connection.send(r, i)
            } catch (h) {
                o(h)
            }
        }
        )
    }
    setConnection(r=this.connection) {
        return r
    }
    onPayload(r) {
        this.events.emit("payload", r),
        Io(r) ? this.events.emit(`${r.id}`, r) : this.events.emit("message", {
            type: r.method,
            data: r.params
        })
    }
    onClose(r) {
        r && r.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${r.code} ${r.reason ? `(${r.reason})` : ""}`)),
        this.events.emit("disconnect")
    }
    async open(r=this.connection) {
        this.connection === r && this.connection.connected || (this.connection.connected && this.close(),
        typeof r == "string" && (await this.connection.open(r),
        r = this.connection),
        this.connection = this.setConnection(r),
        await this.connection.open(),
        this.registerEventListeners(),
        this.events.emit("connect"))
    }
    async close() {
        await this.connection.close()
    }
    registerEventListeners() {
        this.hasRegisteredEventListeners || (this.connection.on("payload", r=>this.onPayload(r)),
        this.connection.on("close", r=>this.onClose(r)),
        this.connection.on("error", r=>this.events.emit("error", r)),
        this.connection.on("register_error", r=>this.onClose()),
        this.hasRegisteredEventListeners = !0)
    }
}
const A_ = ()=>typeof WebSocket < "u" ? WebSocket : typeof global < "u" && typeof global.WebSocket < "u" ? global.WebSocket : typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require("ws")
  , T_ = ()=>typeof WebSocket < "u" || typeof global < "u" && typeof global.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u"
  , ol = a=>a.split("?")[0]
  , al = 10
  , N_ = A_();
let D_ = class {
    constructor(r) {
        if (this.url = r,
        this.events = new Or.EventEmitter,
        this.registering = !1,
        !nl(r))
            throw new Error(`Provided URL is not compatible with WebSocket connection: ${r}`);
        this.url = r
    }
    get connected() {
        return typeof this.socket < "u"
    }
    get connecting() {
        return this.registering
    }
    on(r, i) {
        this.events.on(r, i)
    }
    once(r, i) {
        this.events.once(r, i)
    }
    off(r, i) {
        this.events.off(r, i)
    }
    removeListener(r, i) {
        this.events.removeListener(r, i)
    }
    async open(r=this.url) {
        await this.register(r)
    }
    async close() {
        return new Promise((r,i)=>{
            if (typeof this.socket > "u") {
                i(new Error("Connection already closed"));
                return
            }
            this.socket.onclose = n=>{
                this.onClose(n),
                r()
            }
            ,
            this.socket.close()
        }
        )
    }
    async send(r) {
        typeof this.socket > "u" && (this.socket = await this.register());
        try {
            this.socket.send(Ki(r))
        } catch (i) {
            this.onError(r.id, i)
        }
    }
    register(r=this.url) {
        if (!nl(r))
            throw new Error(`Provided URL is not compatible with WebSocket connection: ${r}`);
        if (this.registering) {
            const i = this.events.getMaxListeners();
            return (this.events.listenerCount("register_error") >= i || this.events.listenerCount("open") >= i) && this.events.setMaxListeners(i + 1),
            new Promise((n,o)=>{
                this.events.once("register_error", h=>{
                    this.resetMaxListeners(),
                    o(h)
                }
                ),
                this.events.once("open", ()=>{
                    if (this.resetMaxListeners(),
                    typeof this.socket > "u")
                        return o(new Error("WebSocket connection is missing or invalid"));
                    n(this.socket)
                }
                )
            }
            )
        }
        return this.url = r,
        this.registering = !0,
        new Promise((i,n)=>{
            const o = new URLSearchParams(r).get("origin")
              , h = lf.isReactNative() ? {
                headers: {
                    origin: o
                }
            } : {
                rejectUnauthorized: !C_(r)
            }
              , p = new N_(r,[],h);
            T_() ? p.onerror = g=>{
                const _ = g;
                n(this.emitError(_.error))
            }
            : p.on("error", g=>{
                n(this.emitError(g))
            }
            ),
            p.onopen = ()=>{
                this.onOpen(p),
                i(p)
            }
        }
        )
    }
    onOpen(r) {
        r.onmessage = i=>this.onPayload(i),
        r.onclose = i=>this.onClose(i),
        this.socket = r,
        this.registering = !1,
        this.events.emit("open")
    }
    onClose(r) {
        this.socket = void 0,
        this.registering = !1,
        this.events.emit("close", r)
    }
    onPayload(r) {
        if (typeof r.data > "u")
            return;
        const i = typeof r.data == "string" ? Zs(r.data) : r.data;
        this.events.emit("payload", i)
    }
    onError(r, i) {
        const n = this.parseError(i)
          , o = n.message || n.toString()
          , h = Eo(r, o);
        this.events.emit("payload", h)
    }
    parseError(r, i=this.url) {
        return hf(r, ol(i), "WS")
    }
    resetMaxListeners() {
        this.events.getMaxListeners() > al && this.events.setMaxListeners(al)
    }
    emitError(r) {
        const i = this.parseError(new Error((r == null ? void 0 : r.message) || `WebSocket connection failed for host: ${ol(this.url)}`));
        return this.events.emit("register_error", i),
        i
    }
}
;
var mo = {
    exports: {}
};
mo.exports;
(function(a, r) {
    var i = 200
      , n = "__lodash_hash_undefined__"
      , o = 1
      , h = 2
      , p = 9007199254740991
      , g = "[object Arguments]"
      , _ = "[object Array]"
      , v = "[object AsyncFunction]"
      , I = "[object Boolean]"
      , R = "[object Date]"
      , A = "[object Error]"
      , z = "[object Function]"
      , T = "[object GeneratorFunction]"
      , F = "[object Map]"
      , re = "[object Number]"
      , he = "[object Null]"
      , le = "[object Object]"
      , fe = "[object Promise]"
      , pe = "[object Proxy]"
      , de = "[object RegExp]"
      , L = "[object Set]"
      , H = "[object String]"
      , W = "[object Symbol]"
      , ve = "[object Undefined]"
      , ie = "[object WeakMap]"
      , ue = "[object ArrayBuffer]"
      , Te = "[object DataView]"
      , Ue = "[object Float32Array]"
      , m = "[object Float64Array]"
      , x = "[object Int8Array]"
      , X = "[object Int16Array]"
      , ce = "[object Int32Array]"
      , V = "[object Uint8Array]"
      , k = "[object Uint8ClampedArray]"
      , B = "[object Uint16Array]"
      , G = "[object Uint32Array]"
      , Je = /[\\^$.*+?()[\]{}|]/g
      , Ke = /^\[object .+?Constructor\]$/
      , jr = /^(?:0|[1-9]\d*)$/
      , Ie = {};
    Ie[Ue] = Ie[m] = Ie[x] = Ie[X] = Ie[ce] = Ie[V] = Ie[k] = Ie[B] = Ie[G] = !0,
    Ie[g] = Ie[_] = Ie[ue] = Ie[I] = Ie[Te] = Ie[R] = Ie[A] = Ie[z] = Ie[F] = Ie[re] = Ie[le] = Ie[de] = Ie[L] = Ie[H] = Ie[ie] = !1;
    var It = typeof Mr == "object" && Mr && Mr.Object === Object && Mr
      , $ = typeof self == "object" && self && self.Object === Object && self
      , D = It || $ || Function("return this")()
      , C = r && !r.nodeType && r
      , u = C && !0 && a && !a.nodeType && a
      , E = u && u.exports === C
      , ee = E && It.process
      , ge = function() {
        try {
            return ee && ee.binding && ee.binding("util")
        } catch {}
    }()
      , be = ge && ge.isTypedArray;
    function Ne(y, P) {
        for (var U = -1, Q = y == null ? 0 : y.length, Ve = 0, me = []; ++U < Q; ) {
            var et = y[U];
            P(et, U, y) && (me[Ve++] = et)
        }
        return me
    }
    function $e(y, P) {
        for (var U = -1, Q = P.length, Ve = y.length; ++U < Q; )
            y[Ve + U] = P[U];
        return y
    }
    function Se(y, P) {
        for (var U = -1, Q = y == null ? 0 : y.length; ++U < Q; )
            if (P(y[U], U, y))
                return !0;
        return !1
    }
    function xt(y, P) {
        for (var U = -1, Q = Array(y); ++U < y; )
            Q[U] = P(U);
        return Q
    }
    function mt(y) {
        return function(P) {
            return y(P)
        }
    }
    function ot(y, P) {
        return y.has(P)
    }
    function qe(y, P) {
        return y == null ? void 0 : y[P]
    }
    function Ye(y) {
        var P = -1
          , U = Array(y.size);
        return y.forEach(function(Q, Ve) {
            U[++P] = [Ve, Q]
        }),
        U
    }
    function Xe(y, P) {
        return function(U) {
            return y(P(U))
        }
    }
    function at(y) {
        var P = -1
          , U = Array(y.size);
        return y.forEach(function(Q) {
            U[++P] = Q
        }),
        U
    }
    var He = Array.prototype
      , Ze = Function.prototype
      , De = Object.prototype
      , Be = D["__core-js_shared__"]
      , ht = Ze.toString
      , je = De.hasOwnProperty
      , Pt = function() {
        var y = /[^.]+$/.exec(Be && Be.keys && Be.keys.IE_PROTO || "");
        return y ? "Symbol(src)_1." + y : ""
    }()
      , $t = De.toString
      , Ht = RegExp("^" + ht.call(je).replace(Je, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
      , kt = E ? D.Buffer : void 0
      , Mt = D.Symbol
      , Jt = D.Uint8Array
      , rr = De.propertyIsEnumerable
      , zr = He.splice
      , Qt = Mt ? Mt.toStringTag : void 0
      , Vr = Object.getOwnPropertySymbols
      , li = kt ? kt.isBuffer : void 0
      , Oi = Xe(Object.keys, Object)
      , lt = lr(D, "DataView")
      , rt = lr(D, "Map")
      , ft = lr(D, "Promise")
      , pt = lr(D, "Set")
      , ct = lr(D, "WeakMap")
      , it = lr(Object, "create")
      , St = Wr(lt)
      , Ot = Wr(rt)
      , dt = Wr(ft)
      , Rt = Wr(pt)
      , gt = Wr(ct)
      , wt = Mt ? Mt.prototype : void 0
      , yt = wt ? wt.valueOf : void 0;
    function Qe(y) {
        var P = -1
          , U = y == null ? 0 : y.length;
        for (this.clear(); ++P < U; ) {
            var Q = y[P];
            this.set(Q[0], Q[1])
        }
    }
    function Ct() {
        this.__data__ = it ? it(null) : {},
        this.size = 0
    }
    function At(y) {
        var P = this.has(y) && delete this.__data__[y];
        return this.size -= P ? 1 : 0,
        P
    }
    function So(y) {
        var P = this.__data__;
        if (it) {
            var U = P[y];
            return U === n ? void 0 : U
        }
        return je.call(P, y) ? P[y] : void 0
    }
    function Oo(y) {
        var P = this.__data__;
        return it ? P[y] !== void 0 : je.call(P, y)
    }
    function Ro(y, P) {
        var U = this.__data__;
        return this.size += this.has(y) ? 0 : 1,
        U[y] = it && P === void 0 ? n : P,
        this
    }
    Qe.prototype.clear = Ct,
    Qe.prototype.delete = At,
    Qe.prototype.get = So,
    Qe.prototype.has = Oo,
    Qe.prototype.set = Ro;
    function vr(y) {
        var P = -1
          , U = y == null ? 0 : y.length;
        for (this.clear(); ++P < U; ) {
            var Q = y[P];
            this.set(Q[0], Q[1])
        }
    }
    function Co() {
        this.__data__ = [],
        this.size = 0
    }
    function Ao(y) {
        var P = this.__data__
          , U = Ri(P, y);
        if (U < 0)
            return !1;
        var Q = P.length - 1;
        return U == Q ? P.pop() : zr.call(P, U, 1),
        --this.size,
        !0
    }
    function To(y) {
        var P = this.__data__
          , U = Ri(P, y);
        return U < 0 ? void 0 : P[U][1]
    }
    function No(y) {
        return Ri(this.__data__, y) > -1
    }
    function Do(y, P) {
        var U = this.__data__
          , Q = Ri(U, y);
        return Q < 0 ? (++this.size,
        U.push([y, P])) : U[Q][1] = P,
        this
    }
    vr.prototype.clear = Co,
    vr.prototype.delete = Ao,
    vr.prototype.get = To,
    vr.prototype.has = No,
    vr.prototype.set = Do;
    function Gr(y) {
        var P = -1
          , U = y == null ? 0 : y.length;
        for (this.clear(); ++P < U; ) {
            var Q = y[P];
            this.set(Q[0], Q[1])
        }
    }
    function Gi() {
        this.size = 0,
        this.__data__ = {
            hash: new Qe,
            map: new (rt || vr),
            string: new Qe
        }
    }
    function $o(y) {
        var P = fi(this, y).delete(y);
        return this.size -= P ? 1 : 0,
        P
    }
    function Wi(y) {
        return fi(this, y).get(y)
    }
    function Lo(y) {
        return fi(this, y).has(y)
    }
    function qo(y, P) {
        var U = fi(this, y)
          , Q = U.size;
        return U.set(y, P),
        this.size += U.size == Q ? 0 : 1,
        this
    }
    Gr.prototype.clear = Gi,
    Gr.prototype.delete = $o,
    Gr.prototype.get = Wi,
    Gr.prototype.has = Lo,
    Gr.prototype.set = qo;
    function Ji(y) {
        var P = -1
          , U = y == null ? 0 : y.length;
        for (this.__data__ = new Gr; ++P < U; )
            this.add(y[P])
    }
    function tn(y) {
        return this.__data__.set(y, n),
        this
    }
    function rn(y) {
        return this.__data__.has(y)
    }
    Ji.prototype.add = Ji.prototype.push = tn,
    Ji.prototype.has = rn;
    function Rr(y) {
        var P = this.__data__ = new vr(y);
        this.size = P.size
    }
    function Mo() {
        this.__data__ = new vr,
        this.size = 0
    }
    function jo(y) {
        var P = this.__data__
          , U = P.delete(y);
        return this.size = P.size,
        U
    }
    function zo(y) {
        return this.__data__.get(y)
    }
    function Uo(y) {
        return this.__data__.has(y)
    }
    function sn(y, P) {
        var U = this.__data__;
        if (U instanceof vr) {
            var Q = U.__data__;
            if (!rt || Q.length < i - 1)
                return Q.push([y, P]),
                this.size = ++U.size,
                this;
            U = this.__data__ = new Gr(Q)
        }
        return U.set(y, P),
        this.size = U.size,
        this
    }
    Rr.prototype.clear = Mo,
    Rr.prototype.delete = jo,
    Rr.prototype.get = zo,
    Rr.prototype.has = Uo,
    Rr.prototype.set = sn;
    function nn(y, P) {
        var U = Xi(y)
          , Q = !U && vn(y)
          , Ve = !U && !Q && Is(y)
          , me = !U && !Q && !Ve && _n(y)
          , et = U || Q || Ve || me
          , Tt = et ? xt(y.length, String) : []
          , Ce = Tt.length;
        for (var Ge in y)
            (P || je.call(y, Ge)) && !(et && (Ge == "length" || Ve && (Ge == "offset" || Ge == "parent") || me && (Ge == "buffer" || Ge == "byteLength" || Ge == "byteOffset") || fn(Ge, Ce))) && Tt.push(Ge);
        return Tt
    }
    function Ri(y, P) {
        for (var U = y.length; U--; )
            if (yn(y[U][0], P))
                return U;
        return -1
    }
    function bs(y, P, U) {
        var Q = P(y);
        return Xi(y) ? Q : $e(Q, U(y))
    }
    function Ci(y) {
        return y == null ? y === void 0 ? ve : he : Qt && Qt in Object(y) ? hn(y) : Ko(y)
    }
    function Es(y) {
        return Ti(y) && Ci(y) == g
    }
    function Ai(y, P, U, Q, Ve) {
        return y === P ? !0 : y == null || P == null || !Ti(y) && !Ti(P) ? y !== y && P !== P : on(y, P, U, Q, Ai, Ve)
    }
    function on(y, P, U, Q, Ve, me) {
        var et = Xi(y)
          , Tt = Xi(P)
          , Ce = et ? _ : Ur(y)
          , Ge = Tt ? _ : Ur(P);
        Ce = Ce == g ? le : Ce,
        Ge = Ge == g ? le : Ge;
        var _t = Ce == le
          , ir = Ge == le
          , Nt = Ce == Ge;
        if (Nt && Is(y)) {
            if (!Is(P))
                return !1;
            et = !0,
            _t = !1
        }
        if (Nt && !_t)
            return me || (me = new Rr),
            et || _n(y) ? Qi(y, P, U, Q, Ve, me) : ko(y, P, Ce, U, Q, Ve, me);
        if (!(U & o)) {
            var tt = _t && je.call(y, "__wrapped__")
              , Yt = ir && je.call(P, "__wrapped__");
            if (tt || Yt) {
                var Cr = tt ? y.value() : y
                  , mr = Yt ? P.value() : P;
                return me || (me = new Rr),
                Ve(Cr, mr, U, Q, me)
            }
        }
        return Nt ? (me || (me = new Rr),
        un(y, P, U, Q, Ve, me)) : !1
    }
    function Ho(y) {
        if (!wn(y) || dn(y))
            return !1;
        var P = Zi(y) ? Ht : Ke;
        return P.test(Wr(y))
    }
    function an(y) {
        return Ti(y) && mn(y.length) && !!Ie[Ci(y)]
    }
    function cn(y) {
        if (!gn(y))
            return Oi(y);
        var P = [];
        for (var U in Object(y))
            je.call(y, U) && U != "constructor" && P.push(U);
        return P
    }
    function Qi(y, P, U, Q, Ve, me) {
        var et = U & o
          , Tt = y.length
          , Ce = P.length;
        if (Tt != Ce && !(et && Ce > Tt))
            return !1;
        var Ge = me.get(y);
        if (Ge && me.get(P))
            return Ge == P;
        var _t = -1
          , ir = !0
          , Nt = U & h ? new Ji : void 0;
        for (me.set(y, P),
        me.set(P, y); ++_t < Tt; ) {
            var tt = y[_t]
              , Yt = P[_t];
            if (Q)
                var Cr = et ? Q(Yt, tt, _t, P, y, me) : Q(tt, Yt, _t, y, P, me);
            if (Cr !== void 0) {
                if (Cr)
                    continue;
                ir = !1;
                break
            }
            if (Nt) {
                if (!Se(P, function(mr, Hr) {
                    if (!ot(Nt, Hr) && (tt === mr || Ve(tt, mr, U, Q, me)))
                        return Nt.push(Hr)
                })) {
                    ir = !1;
                    break
                }
            } else if (!(tt === Yt || Ve(tt, Yt, U, Q, me))) {
                ir = !1;
                break
            }
        }
        return me.delete(y),
        me.delete(P),
        ir
    }
    function ko(y, P, U, Q, Ve, me, et) {
        switch (U) {
        case Te:
            if (y.byteLength != P.byteLength || y.byteOffset != P.byteOffset)
                return !1;
            y = y.buffer,
            P = P.buffer;
        case ue:
            return !(y.byteLength != P.byteLength || !me(new Jt(y), new Jt(P)));
        case I:
        case R:
        case re:
            return yn(+y, +P);
        case A:
            return y.name == P.name && y.message == P.message;
        case de:
        case H:
            return y == P + "";
        case F:
            var Tt = Ye;
        case L:
            var Ce = Q & o;
            if (Tt || (Tt = at),
            y.size != P.size && !Ce)
                return !1;
            var Ge = et.get(y);
            if (Ge)
                return Ge == P;
            Q |= h,
            et.set(y, P);
            var _t = Qi(Tt(y), Tt(P), Q, Ve, me, et);
            return et.delete(y),
            _t;
        case W:
            if (yt)
                return yt.call(y) == yt.call(P)
        }
        return !1
    }
    function un(y, P, U, Q, Ve, me) {
        var et = U & o
          , Tt = Yi(y)
          , Ce = Tt.length
          , Ge = Yi(P)
          , _t = Ge.length;
        if (Ce != _t && !et)
            return !1;
        for (var ir = Ce; ir--; ) {
            var Nt = Tt[ir];
            if (!(et ? Nt in P : je.call(P, Nt)))
                return !1
        }
        var tt = me.get(y);
        if (tt && me.get(P))
            return tt == P;
        var Yt = !0;
        me.set(y, P),
        me.set(P, y);
        for (var Cr = et; ++ir < Ce; ) {
            Nt = Tt[ir];
            var mr = y[Nt]
              , Hr = P[Nt];
            if (Q)
                var xs = et ? Q(Hr, mr, Nt, P, y, me) : Q(mr, Hr, Nt, y, P, me);
            if (!(xs === void 0 ? mr === Hr || Ve(mr, Hr, U, Q, me) : xs)) {
                Yt = !1;
                break
            }
            Cr || (Cr = Nt == "constructor")
        }
        if (Yt && !Cr) {
            var Ni = y.constructor
              , jt = P.constructor;
            Ni != jt && "constructor"in y && "constructor"in P && !(typeof Ni == "function" && Ni instanceof Ni && typeof jt == "function" && jt instanceof jt) && (Yt = !1)
        }
        return me.delete(y),
        me.delete(P),
        Yt
    }
    function Yi(y) {
        return bs(y, Vo, ln)
    }
    function fi(y, P) {
        var U = y.__data__;
        return pn(P) ? U[typeof P == "string" ? "string" : "hash"] : U.map
    }
    function lr(y, P) {
        var U = qe(y, P);
        return Ho(U) ? U : void 0
    }
    function hn(y) {
        var P = je.call(y, Qt)
          , U = y[Qt];
        try {
            y[Qt] = void 0;
            var Q = !0
        } catch {}
        var Ve = $t.call(y);
        return Q && (P ? y[Qt] = U : delete y[Qt]),
        Ve
    }
    var ln = Vr ? function(y) {
        return y == null ? [] : (y = Object(y),
        Ne(Vr(y), function(P) {
            return rr.call(y, P)
        }))
    }
    : Fe
      , Ur = Ci;
    (lt && Ur(new lt(new ArrayBuffer(1))) != Te || rt && Ur(new rt) != F || ft && Ur(ft.resolve()) != fe || pt && Ur(new pt) != L || ct && Ur(new ct) != ie) && (Ur = function(y) {
        var P = Ci(y)
          , U = P == le ? y.constructor : void 0
          , Q = U ? Wr(U) : "";
        if (Q)
            switch (Q) {
            case St:
                return Te;
            case Ot:
                return F;
            case dt:
                return fe;
            case Rt:
                return L;
            case gt:
                return ie
            }
        return P
    }
    );
    function fn(y, P) {
        return P = P ?? p,
        !!P && (typeof y == "number" || jr.test(y)) && y > -1 && y % 1 == 0 && y < P
    }
    function pn(y) {
        var P = typeof y;
        return P == "string" || P == "number" || P == "symbol" || P == "boolean" ? y !== "__proto__" : y === null
    }
    function dn(y) {
        return !!Pt && Pt in y
    }
    function gn(y) {
        var P = y && y.constructor
          , U = typeof P == "function" && P.prototype || De;
        return y === U
    }
    function Ko(y) {
        return $t.call(y)
    }
    function Wr(y) {
        if (y != null) {
            try {
                return ht.call(y)
            } catch {}
            try {
                return y + ""
            } catch {}
        }
        return ""
    }
    function yn(y, P) {
        return y === P || y !== y && P !== P
    }
    var vn = Es(function() {
        return arguments
    }()) ? Es : function(y) {
        return Ti(y) && je.call(y, "callee") && !rr.call(y, "callee")
    }
      , Xi = Array.isArray;
    function Bo(y) {
        return y != null && mn(y.length) && !Zi(y)
    }
    var Is = li || ke;
    function Fo(y, P) {
        return Ai(y, P)
    }
    function Zi(y) {
        if (!wn(y))
            return !1;
        var P = Ci(y);
        return P == z || P == T || P == v || P == pe
    }
    function mn(y) {
        return typeof y == "number" && y > -1 && y % 1 == 0 && y <= p
    }
    function wn(y) {
        var P = typeof y;
        return y != null && (P == "object" || P == "function")
    }
    function Ti(y) {
        return y != null && typeof y == "object"
    }
    var _n = be ? mt(be) : an;
    function Vo(y) {
        return Bo(y) ? nn(y) : cn(y)
    }
    function Fe() {
        return []
    }
    function ke() {
        return !1
    }
    a.exports = Fo
}
)(mo, mo.exports);
var $_ = mo.exports;
const L_ = xc($_);
function q_(a, r) {
    return r = r || {},
    new Promise(function(i, n) {
        var o = new XMLHttpRequest
          , h = []
          , p = []
          , g = {}
          , _ = function() {
            return {
                ok: (o.status / 100 | 0) == 2,
                statusText: o.statusText,
                status: o.status,
                url: o.responseURL,
                text: function() {
                    return Promise.resolve(o.responseText)
                },
                json: function() {
                    return Promise.resolve(o.responseText).then(JSON.parse)
                },
                blob: function() {
                    return Promise.resolve(new Blob([o.response]))
                },
                clone: _,
                headers: {
                    keys: function() {
                        return h
                    },
                    entries: function() {
                        return p
                    },
                    get: function(I) {
                        return g[I.toLowerCase()]
                    },
                    has: function(I) {
                        return I.toLowerCase()in g
                    }
                }
            }
        };
        for (var v in o.open(r.method || "get", a, !0),
        o.onload = function() {
            o.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(I, R, A) {
                h.push(R = R.toLowerCase()),
                p.push([R, A]),
                g[R] = g[R] ? g[R] + "," + A : A
            }),
            i(_())
        }
        ,
        o.onerror = n,
        o.withCredentials = r.credentials == "include",
        r.headers)
            o.setRequestHeader(v, r.headers[v]);
        o.send(r.body || null)
    }
    )
}
const M_ = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: q_
}, Symbol.toStringTag, {
    value: "Module"
}))
  , cl = Kl(M_);
var j_ = self.fetch || (self.fetch = cl.default || cl);
const z_ = xc(j_);
var U_ = {};
function H_(a, r) {
    if (a.length >= 255)
        throw new TypeError("Alphabet too long");
    for (var i = new Uint8Array(256), n = 0; n < i.length; n++)
        i[n] = 255;
    for (var o = 0; o < a.length; o++) {
        var h = a.charAt(o)
          , p = h.charCodeAt(0);
        if (i[p] !== 255)
            throw new TypeError(h + " is ambiguous");
        i[p] = o
    }
    var g = a.length
      , _ = a.charAt(0)
      , v = Math.log(g) / Math.log(256)
      , I = Math.log(256) / Math.log(g);
    function R(T) {
        if (T instanceof Uint8Array || (ArrayBuffer.isView(T) ? T = new Uint8Array(T.buffer,T.byteOffset,T.byteLength) : Array.isArray(T) && (T = Uint8Array.from(T))),
        !(T instanceof Uint8Array))
            throw new TypeError("Expected Uint8Array");
        if (T.length === 0)
            return "";
        for (var F = 0, re = 0, he = 0, le = T.length; he !== le && T[he] === 0; )
            he++,
            F++;
        for (var fe = (le - he) * I + 1 >>> 0, pe = new Uint8Array(fe); he !== le; ) {
            for (var de = T[he], L = 0, H = fe - 1; (de !== 0 || L < re) && H !== -1; H--,
            L++)
                de += 256 * pe[H] >>> 0,
                pe[H] = de % g >>> 0,
                de = de / g >>> 0;
            if (de !== 0)
                throw new Error("Non-zero carry");
            re = L,
            he++
        }
        for (var W = fe - re; W !== fe && pe[W] === 0; )
            W++;
        for (var ve = _.repeat(F); W < fe; ++W)
            ve += a.charAt(pe[W]);
        return ve
    }
    function A(T) {
        if (typeof T != "string")
            throw new TypeError("Expected String");
        if (T.length === 0)
            return new Uint8Array;
        var F = 0;
        if (T[F] !== " ") {
            for (var re = 0, he = 0; T[F] === _; )
                re++,
                F++;
            for (var le = (T.length - F) * v + 1 >>> 0, fe = new Uint8Array(le); T[F]; ) {
                var pe = i[T.charCodeAt(F)];
                if (pe === 255)
                    return;
                for (var de = 0, L = le - 1; (pe !== 0 || de < he) && L !== -1; L--,
                de++)
                    pe += g * fe[L] >>> 0,
                    fe[L] = pe % 256 >>> 0,
                    pe = pe / 256 >>> 0;
                if (pe !== 0)
                    throw new Error("Non-zero carry");
                he = de,
                F++
            }
            if (T[F] !== " ") {
                for (var H = le - he; H !== le && fe[H] === 0; )
                    H++;
                for (var W = new Uint8Array(re + (le - H)), ve = re; H !== le; )
                    W[ve++] = fe[H++];
                return W
            }
        }
    }
    function z(T) {
        var F = A(T);
        if (F)
            return F;
        throw new Error(`Non-${r} character`)
    }
    return {
        encode: R,
        decodeUnsafe: A,
        decode: z
    }
}
var k_ = H_
  , K_ = k_;
const gf = a=>{
    if (a instanceof Uint8Array && a.constructor.name === "Uint8Array")
        return a;
    if (a instanceof ArrayBuffer)
        return new Uint8Array(a);
    if (ArrayBuffer.isView(a))
        return new Uint8Array(a.buffer,a.byteOffset,a.byteLength);
    throw new Error("Unknown type, must be binary type")
}
  , B_ = a=>new TextEncoder().encode(a)
  , F_ = a=>new TextDecoder().decode(a);
class V_ {
    constructor(r, i, n) {
        this.name = r,
        this.prefix = i,
        this.baseEncode = n
    }
    encode(r) {
        if (r instanceof Uint8Array)
            return `${this.prefix}${this.baseEncode(r)}`;
        throw Error("Unknown type, must be binary type")
    }
}
class G_ {
    constructor(r, i, n) {
        if (this.name = r,
        this.prefix = i,
        i.codePointAt(0) === void 0)
            throw new Error("Invalid prefix character");
        this.prefixCodePoint = i.codePointAt(0),
        this.baseDecode = n
    }
    decode(r) {
        if (typeof r == "string") {
            if (r.codePointAt(0) !== this.prefixCodePoint)
                throw Error(`Unable to decode multibase string ${JSON.stringify(r)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(r.slice(this.prefix.length))
        } else
            throw Error("Can only multibase decode strings")
    }
    or(r) {
        return yf(this, r)
    }
}
class W_ {
    constructor(r) {
        this.decoders = r
    }
    or(r) {
        return yf(this, r)
    }
    decode(r) {
        const i = r[0]
          , n = this.decoders[i];
        if (n)
            return n.decode(r);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(r)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`)
    }
}
const yf = (a,r)=>new W_({
    ...a.decoders || {
        [a.prefix]: a
    },
    ...r.decoders || {
        [r.prefix]: r
    }
});
class J_ {
    constructor(r, i, n, o) {
        this.name = r,
        this.prefix = i,
        this.baseEncode = n,
        this.baseDecode = o,
        this.encoder = new V_(r,i,n),
        this.decoder = new G_(r,i,o)
    }
    encode(r) {
        return this.encoder.encode(r)
    }
    decode(r) {
        return this.decoder.decode(r)
    }
}
const xo = ({name: a, prefix: r, encode: i, decode: n})=>new J_(a,r,i,n)
  , en = ({prefix: a, name: r, alphabet: i})=>{
    const {encode: n, decode: o} = K_(i, r);
    return xo({
        prefix: a,
        name: r,
        encode: n,
        decode: h=>gf(o(h))
    })
}
  , Q_ = (a,r,i,n)=>{
    const o = {};
    for (let I = 0; I < r.length; ++I)
        o[r[I]] = I;
    let h = a.length;
    for (; a[h - 1] === "="; )
        --h;
    const p = new Uint8Array(h * i / 8 | 0);
    let g = 0
      , _ = 0
      , v = 0;
    for (let I = 0; I < h; ++I) {
        const R = o[a[I]];
        if (R === void 0)
            throw new SyntaxError(`Non-${n} character`);
        _ = _ << i | R,
        g += i,
        g >= 8 && (g -= 8,
        p[v++] = 255 & _ >> g)
    }
    if (g >= i || 255 & _ << 8 - g)
        throw new SyntaxError("Unexpected end of data");
    return p
}
  , Y_ = (a,r,i)=>{
    const n = r[r.length - 1] === "="
      , o = (1 << i) - 1;
    let h = ""
      , p = 0
      , g = 0;
    for (let _ = 0; _ < a.length; ++_)
        for (g = g << 8 | a[_],
        p += 8; p > i; )
            p -= i,
            h += r[o & g >> p];
    if (p && (h += r[o & g << i - p]),
    n)
        for (; h.length * i & 7; )
            h += "=";
    return h
}
  , Bt = ({name: a, prefix: r, bitsPerChar: i, alphabet: n})=>xo({
    prefix: r,
    name: a,
    encode(o) {
        return Y_(o, n, i)
    },
    decode(o) {
        return Q_(o, n, i, a)
    }
})
  , X_ = xo({
    prefix: "\0",
    name: "identity",
    encode: a=>F_(a),
    decode: a=>B_(a)
});
var Z_ = Object.freeze({
    __proto__: null,
    identity: X_
});
const eb = Bt({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
});
var tb = Object.freeze({
    __proto__: null,
    base2: eb
});
const rb = Bt({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
});
var ib = Object.freeze({
    __proto__: null,
    base8: rb
});
const sb = en({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
});
var nb = Object.freeze({
    __proto__: null,
    base10: sb
});
const ob = Bt({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
})
  , ab = Bt({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
});
var cb = Object.freeze({
    __proto__: null,
    base16: ob,
    base16upper: ab
});
const ub = Bt({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
})
  , hb = Bt({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
})
  , lb = Bt({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
})
  , fb = Bt({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
})
  , pb = Bt({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
})
  , db = Bt({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
})
  , gb = Bt({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
})
  , yb = Bt({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
})
  , vb = Bt({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
});
var mb = Object.freeze({
    __proto__: null,
    base32: ub,
    base32upper: hb,
    base32pad: lb,
    base32padupper: fb,
    base32hex: pb,
    base32hexupper: db,
    base32hexpad: gb,
    base32hexpadupper: yb,
    base32z: vb
});
const wb = en({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
})
  , _b = en({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
var bb = Object.freeze({
    __proto__: null,
    base36: wb,
    base36upper: _b
});
const Eb = en({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
})
  , Ib = en({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
var xb = Object.freeze({
    __proto__: null,
    base58btc: Eb,
    base58flickr: Ib
});
const Pb = Bt({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
})
  , Sb = Bt({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
})
  , Ob = Bt({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
})
  , Rb = Bt({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
});
var Cb = Object.freeze({
    __proto__: null,
    base64: Pb,
    base64pad: Sb,
    base64url: Ob,
    base64urlpad: Rb
});
const vf = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂")
  , Ab = vf.reduce((a,r,i)=>(a[i] = r,
a), [])
  , Tb = vf.reduce((a,r,i)=>(a[r.codePointAt(0)] = i,
a), []);
function Nb(a) {
    return a.reduce((r,i)=>(r += Ab[i],
    r), "")
}
function Db(a) {
    const r = [];
    for (const i of a) {
        const n = Tb[i.codePointAt(0)];
        if (n === void 0)
            throw new Error(`Non-base256emoji character: ${i}`);
        r.push(n)
    }
    return new Uint8Array(r)
}
const $b = xo({
    prefix: "🚀",
    name: "base256emoji",
    encode: Nb,
    decode: Db
});
var Lb = Object.freeze({
    __proto__: null,
    base256emoji: $b
})
  , qb = mf
  , ul = 128
  , Mb = 127
  , jb = ~Mb
  , zb = Math.pow(2, 31);
function mf(a, r, i) {
    r = r || [],
    i = i || 0;
    for (var n = i; a >= zb; )
        r[i++] = a & 255 | ul,
        a /= 128;
    for (; a & jb; )
        r[i++] = a & 255 | ul,
        a >>>= 7;
    return r[i] = a | 0,
    mf.bytes = i - n + 1,
    r
}
var Ub = yc
  , Hb = 128
  , hl = 127;
function yc(a, n) {
    var i = 0, n = n || 0, o = 0, h = n, p, g = a.length;
    do {
        if (h >= g)
            throw yc.bytes = 0,
            new RangeError("Could not decode varint");
        p = a[h++],
        i += o < 28 ? (p & hl) << o : (p & hl) * Math.pow(2, o),
        o += 7
    } while (p >= Hb);
    return yc.bytes = h - n,
    i
}
var kb = Math.pow(2, 7)
  , Kb = Math.pow(2, 14)
  , Bb = Math.pow(2, 21)
  , Fb = Math.pow(2, 28)
  , Vb = Math.pow(2, 35)
  , Gb = Math.pow(2, 42)
  , Wb = Math.pow(2, 49)
  , Jb = Math.pow(2, 56)
  , Qb = Math.pow(2, 63)
  , Yb = function(a) {
    return a < kb ? 1 : a < Kb ? 2 : a < Bb ? 3 : a < Fb ? 4 : a < Vb ? 5 : a < Gb ? 6 : a < Wb ? 7 : a < Jb ? 8 : a < Qb ? 9 : 10
}
  , Xb = {
    encode: qb,
    decode: Ub,
    encodingLength: Yb
}
  , wf = Xb;
const ll = (a,r,i=0)=>(wf.encode(a, r, i),
r)
  , fl = a=>wf.encodingLength(a)
  , vc = (a,r)=>{
    const i = r.byteLength
      , n = fl(a)
      , o = n + fl(i)
      , h = new Uint8Array(o + i);
    return ll(a, h, 0),
    ll(i, h, n),
    h.set(r, o),
    new Zb(a,i,r,h)
}
;
class Zb {
    constructor(r, i, n, o) {
        this.code = r,
        this.size = i,
        this.digest = n,
        this.bytes = o
    }
}
const _f = ({name: a, code: r, encode: i})=>new e1(a,r,i);
class e1 {
    constructor(r, i, n) {
        this.name = r,
        this.code = i,
        this.encode = n
    }
    digest(r) {
        if (r instanceof Uint8Array) {
            const i = this.encode(r);
            return i instanceof Uint8Array ? vc(this.code, i) : i.then(n=>vc(this.code, n))
        } else
            throw Error("Unknown type, must be binary type")
    }
}
const bf = a=>async r=>new Uint8Array(await crypto.subtle.digest(a, r))
  , t1 = _f({
    name: "sha2-256",
    code: 18,
    encode: bf("SHA-256")
})
  , r1 = _f({
    name: "sha2-512",
    code: 19,
    encode: bf("SHA-512")
});
var i1 = Object.freeze({
    __proto__: null,
    sha256: t1,
    sha512: r1
});
const Ef = 0
  , s1 = "identity"
  , If = gf
  , n1 = a=>vc(Ef, If(a))
  , o1 = {
    code: Ef,
    name: s1,
    encode: If,
    digest: n1
};
var a1 = Object.freeze({
    __proto__: null,
    identity: o1
});
new TextEncoder,
new TextDecoder;
const pl = {
    ...Z_,
    ...tb,
    ...ib,
    ...nb,
    ...cb,
    ...mb,
    ...bb,
    ...xb,
    ...Cb,
    ...Lb
};
({
    ...i1,
    ...a1
});
function xf(a) {
    return globalThis.Buffer != null ? new Uint8Array(a.buffer,a.byteOffset,a.byteLength) : a
}
function c1(a=0) {
    return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? xf(globalThis.Buffer.allocUnsafe(a)) : new Uint8Array(a)
}
function Pf(a, r, i, n) {
    return {
        name: a,
        prefix: r,
        encoder: {
            name: a,
            prefix: r,
            encode: i
        },
        decoder: {
            decode: n
        }
    }
}
const dl = Pf("utf8", "u", a=>"u" + new TextDecoder("utf8").decode(a), a=>new TextEncoder().encode(a.substring(1)))
  , sc = Pf("ascii", "a", a=>{
    let r = "a";
    for (let i = 0; i < a.length; i++)
        r += String.fromCharCode(a[i]);
    return r
}
, a=>{
    a = a.substring(1);
    const r = c1(a.length);
    for (let i = 0; i < a.length; i++)
        r[i] = a.charCodeAt(i);
    return r
}
)
  , u1 = {
    utf8: dl,
    "utf-8": dl,
    hex: pl.base16,
    latin1: sc,
    ascii: sc,
    binary: sc,
    ...pl
};
function h1(a, r="utf8") {
    const i = u1[r];
    if (!i)
        throw new Error(`Unsupported encoding "${r}"`);
    return (r === "utf8" || r === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? xf(globalThis.Buffer.from(a, "utf-8")) : i.decoder.decode(`${i.prefix}${a}`)
}
const Sf = "wc"
  , l1 = 2
  , Ac = "core"
  , xi = `${Sf}@2:${Ac}:`
  , f1 = {
    name: Ac,
    logger: "error"
}
  , p1 = {
    database: ":memory:"
}
  , d1 = "crypto"
  , gl = "client_ed25519_seed"
  , g1 = se.ONE_DAY
  , y1 = "keychain"
  , v1 = "0.3"
  , m1 = "messages"
  , w1 = "0.3"
  , _1 = se.SIX_HOURS
  , b1 = "publisher"
  , Of = "irn"
  , E1 = "error"
  , Rf = "wss://relay.walletconnect.com"
  , yl = "wss://relay.walletconnect.org"
  , I1 = "relayer"
  , Wt = {
    message: "relayer_message",
    message_ack: "relayer_message_ack",
    connect: "relayer_connect",
    disconnect: "relayer_disconnect",
    error: "relayer_error",
    connection_stalled: "relayer_connection_stalled",
    transport_closed: "relayer_transport_closed",
    publish: "relayer_publish"
}
  , x1 = "_subscription"
  , oi = {
    payload: "payload",
    connect: "connect",
    disconnect: "disconnect",
    error: "error"
}
  , P1 = se.ONE_SECOND
  , S1 = "2.11.0"
  , O1 = 1e4
  , R1 = "0.3"
  , C1 = "WALLETCONNECT_CLIENT_ID"
  , $r = {
    created: "subscription_created",
    deleted: "subscription_deleted",
    expired: "subscription_expired",
    disabled: "subscription_disabled",
    sync: "subscription_sync",
    resubscribed: "subscription_resubscribed"
}
  , A1 = "subscription"
  , T1 = "0.3"
  , N1 = se.FIVE_SECONDS * 1e3
  , D1 = "pairing"
  , $1 = "0.3"
  , ks = {
    wc_pairingDelete: {
        req: {
            ttl: se.ONE_DAY,
            prompt: !1,
            tag: 1e3
        },
        res: {
            ttl: se.ONE_DAY,
            prompt: !1,
            tag: 1001
        }
    },
    wc_pairingPing: {
        req: {
            ttl: se.THIRTY_SECONDS,
            prompt: !1,
            tag: 1002
        },
        res: {
            ttl: se.THIRTY_SECONDS,
            prompt: !1,
            tag: 1003
        }
    },
    unregistered_method: {
        req: {
            ttl: se.ONE_DAY,
            prompt: !1,
            tag: 0
        },
        res: {
            ttl: se.ONE_DAY,
            prompt: !1,
            tag: 0
        }
    }
}
  , Ws = {
    create: "pairing_create",
    expire: "pairing_expire",
    delete: "pairing_delete",
    ping: "pairing_ping"
}
  , Fr = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    sync: "history_sync"
}
  , L1 = "history"
  , q1 = "0.3"
  , M1 = "expirer"
  , Sr = {
    created: "expirer_created",
    deleted: "expirer_deleted",
    expired: "expirer_expired",
    sync: "expirer_sync"
}
  , j1 = "0.3"
  , nc = "verify-api"
  , gs = "https://verify.walletconnect.com"
  , mc = "https://verify.walletconnect.org"
  , z1 = [gs, mc]
  , U1 = "echo"
  , H1 = "https://echo.walletconnect.com";
class k1 {
    constructor(r, i) {
        this.core = r,
        this.logger = i,
        this.keychain = new Map,
        this.name = y1,
        this.version = v1,
        this.initialized = !1,
        this.storagePrefix = xi,
        this.init = async()=>{
            if (!this.initialized) {
                const n = await this.getKeyChain();
                typeof n < "u" && (this.keychain = n),
                this.initialized = !0
            }
        }
        ,
        this.has = n=>(this.isInitialized(),
        this.keychain.has(n)),
        this.set = async(n,o)=>{
            this.isInitialized(),
            this.keychain.set(n, o),
            await this.persist()
        }
        ,
        this.get = n=>{
            this.isInitialized();
            const o = this.keychain.get(n);
            if (typeof o > "u") {
                const {message: h} = Y("NO_MATCHING_KEY", `${this.name}: ${n}`);
                throw new Error(h)
            }
            return o
        }
        ,
        this.del = async n=>{
            this.isInitialized(),
            this.keychain.delete(n),
            await this.persist()
        }
        ,
        this.core = r,
        this.logger = Re.generateChildLogger(i, this.name)
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name
    }
    async setKeyChain(r) {
        await this.core.storage.setItem(this.storageKey, Jl(r))
    }
    async getKeyChain() {
        const r = await this.core.storage.getItem(this.storageKey);
        return typeof r < "u" ? Ql(r) : void 0
    }
    async persist() {
        await this.setKeyChain(this.keychain)
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: r} = Y("NOT_INITIALIZED", this.name);
            throw new Error(r)
        }
    }
}
class K1 {
    constructor(r, i, n) {
        this.core = r,
        this.logger = i,
        this.name = d1,
        this.initialized = !1,
        this.init = async()=>{
            this.initialized || (await this.keychain.init(),
            this.initialized = !0)
        }
        ,
        this.hasKeys = o=>(this.isInitialized(),
        this.keychain.has(o)),
        this.getClientId = async()=>{
            this.isInitialized();
            const o = await this.getClientSeed()
              , h = el(o);
            return af(h.publicKey)
        }
        ,
        this.generateKeyPair = ()=>{
            this.isInitialized();
            const o = v0();
            return this.setPrivateKey(o.publicKey, o.privateKey)
        }
        ,
        this.signJWT = async o=>{
            this.isInitialized();
            const h = await this.getClientSeed()
              , p = el(h)
              , g = pc();
            return await f_(g, o, g1, p)
        }
        ,
        this.generateSharedKey = (o,h,p)=>{
            this.isInitialized();
            const g = this.getPrivateKey(o)
              , _ = m0(g, h);
            return this.setSymKey(_, p)
        }
        ,
        this.setSymKey = async(o,h)=>{
            this.isInitialized();
            const p = h || w0(o);
            return await this.keychain.set(p, o),
            p
        }
        ,
        this.deleteKeyPair = async o=>{
            this.isInitialized(),
            await this.keychain.del(o)
        }
        ,
        this.deleteSymKey = async o=>{
            this.isInitialized(),
            await this.keychain.del(o)
        }
        ,
        this.encode = async(o,h,p)=>{
            this.isInitialized();
            const g = _0(p)
              , _ = Ki(h);
            if ($h(g)) {
                const A = g.senderPublicKey
                  , z = g.receiverPublicKey;
                o = await this.generateSharedKey(A, z)
            }
            const v = this.getSymKey(o)
              , {type: I, senderPublicKey: R} = g;
            return b0({
                type: I,
                symKey: v,
                message: _,
                senderPublicKey: R
            })
        }
        ,
        this.decode = async(o,h,p)=>{
            this.isInitialized();
            const g = E0(h, p);
            if ($h(g)) {
                const _ = g.receiverPublicKey
                  , v = g.senderPublicKey;
                o = await this.generateSharedKey(_, v)
            }
            try {
                const _ = this.getSymKey(o)
                  , v = I0({
                    symKey: _,
                    encoded: h
                });
                return Zs(v)
            } catch (_) {
                this.logger.error(`Failed to decode message from topic: '${o}', clientId: '${await this.getClientId()}'`),
                this.logger.error(_)
            }
        }
        ,
        this.getPayloadType = o=>{
            const h = Lh(o);
            return x0(h.type)
        }
        ,
        this.getPayloadSenderPublicKey = o=>{
            const h = Lh(o);
            return h.senderPublicKey ? _o(h.senderPublicKey, P0) : void 0
        }
        ,
        this.core = r,
        this.logger = Re.generateChildLogger(i, this.name),
        this.keychain = n || new k1(this.core,this.logger)
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    async setPrivateKey(r, i) {
        return await this.keychain.set(r, i),
        r
    }
    getPrivateKey(r) {
        return this.keychain.get(r)
    }
    async getClientSeed() {
        let r = "";
        try {
            r = this.keychain.get(gl)
        } catch {
            r = pc(),
            await this.keychain.set(gl, r)
        }
        return h1(r, "base16")
    }
    getSymKey(r) {
        return this.keychain.get(r)
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: r} = Y("NOT_INITIALIZED", this.name);
            throw new Error(r)
        }
    }
}
class B1 extends Kw {
    constructor(r, i) {
        super(r, i),
        this.logger = r,
        this.core = i,
        this.messages = new Map,
        this.name = m1,
        this.version = w1,
        this.initialized = !1,
        this.storagePrefix = xi,
        this.init = async()=>{
            if (!this.initialized) {
                this.logger.trace("Initialized");
                try {
                    const n = await this.getRelayerMessages();
                    typeof n < "u" && (this.messages = n),
                    this.logger.debug(`Successfully Restored records for ${this.name}`),
                    this.logger.trace({
                        type: "method",
                        method: "restore",
                        size: this.messages.size
                    })
                } catch (n) {
                    this.logger.debug(`Failed to Restore records for ${this.name}`),
                    this.logger.error(n)
                } finally {
                    this.initialized = !0
                }
            }
        }
        ,
        this.set = async(n,o)=>{
            this.isInitialized();
            const h = ys(o);
            let p = this.messages.get(n);
            return typeof p > "u" && (p = {}),
            typeof p[h] < "u" || (p[h] = o,
            this.messages.set(n, p),
            await this.persist()),
            h
        }
        ,
        this.get = n=>{
            this.isInitialized();
            let o = this.messages.get(n);
            return typeof o > "u" && (o = {}),
            o
        }
        ,
        this.has = (n,o)=>{
            this.isInitialized();
            const h = this.get(n)
              , p = ys(o);
            return typeof h[p] < "u"
        }
        ,
        this.del = async n=>{
            this.isInitialized(),
            this.messages.delete(n),
            await this.persist()
        }
        ,
        this.logger = Re.generateChildLogger(r, this.name),
        this.core = i
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name
    }
    async setRelayerMessages(r) {
        await this.core.storage.setItem(this.storageKey, Jl(r))
    }
    async getRelayerMessages() {
        const r = await this.core.storage.getItem(this.storageKey);
        return typeof r < "u" ? Ql(r) : void 0
    }
    async persist() {
        await this.setRelayerMessages(this.messages)
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: r} = Y("NOT_INITIALIZED", this.name);
            throw new Error(r)
        }
    }
}
class F1 extends Bw {
    constructor(r, i) {
        super(r, i),
        this.relayer = r,
        this.logger = i,
        this.events = new Or.EventEmitter,
        this.name = b1,
        this.queue = new Map,
        this.publishTimeout = se.toMiliseconds(se.TEN_SECONDS),
        this.needsTransportRestart = !1,
        this.publish = async(n,o,h)=>{
            var p;
            this.logger.debug("Publishing Payload"),
            this.logger.trace({
                type: "method",
                method: "publish",
                params: {
                    topic: n,
                    message: o,
                    opts: h
                }
            });
            try {
                const g = (h == null ? void 0 : h.ttl) || _1
                  , _ = dc(h)
                  , v = (h == null ? void 0 : h.prompt) || !1
                  , I = (h == null ? void 0 : h.tag) || 0
                  , R = (h == null ? void 0 : h.id) || ff().toString()
                  , A = {
                    topic: n,
                    message: o,
                    opts: {
                        ttl: g,
                        relay: _,
                        prompt: v,
                        tag: I,
                        id: R
                    }
                }
                  , z = setTimeout(()=>this.queue.set(R, A), this.publishTimeout);
                try {
                    await await Ys(this.rpcPublish(n, o, g, _, v, I, R), this.publishTimeout, "Failed to publish payload, please try again."),
                    this.removeRequestFromQueue(R),
                    this.relayer.events.emit(Wt.publish, A)
                } catch (T) {
                    if (this.logger.debug("Publishing Payload stalled"),
                    this.needsTransportRestart = !0,
                    (p = h == null ? void 0 : h.internal) != null && p.throwOnFailedPublish)
                        throw this.removeRequestFromQueue(R),
                        T;
                    return
                } finally {
                    clearTimeout(z)
                }
                this.logger.debug("Successfully Published Payload"),
                this.logger.trace({
                    type: "method",
                    method: "publish",
                    params: {
                        topic: n,
                        message: o,
                        opts: h
                    }
                })
            } catch (g) {
                throw this.logger.debug("Failed to Publish Payload"),
                this.logger.error(g),
                g
            }
        }
        ,
        this.on = (n,o)=>{
            this.events.on(n, o)
        }
        ,
        this.once = (n,o)=>{
            this.events.once(n, o)
        }
        ,
        this.off = (n,o)=>{
            this.events.off(n, o)
        }
        ,
        this.removeListener = (n,o)=>{
            this.events.removeListener(n, o)
        }
        ,
        this.relayer = r,
        this.logger = Re.generateChildLogger(i, this.name),
        this.registerEventListeners()
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    rpcPublish(r, i, n, o, h, p, g) {
        var _, v, I, R;
        const A = {
            method: fo(o.protocol).publish,
            params: {
                topic: r,
                message: i,
                ttl: n,
                prompt: h,
                tag: p
            },
            id: g
        };
        return Ii((_ = A.params) == null ? void 0 : _.prompt) && ((v = A.params) == null || delete v.prompt),
        Ii((I = A.params) == null ? void 0 : I.tag) && ((R = A.params) == null || delete R.tag),
        this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
            type: "message",
            direction: "outgoing",
            request: A
        }),
        this.relayer.request(A)
    }
    removeRequestFromQueue(r) {
        this.queue.delete(r)
    }
    checkQueue() {
        this.queue.forEach(async r=>{
            const {topic: i, message: n, opts: o} = r;
            await this.publish(i, n, o)
        }
        )
    }
    registerEventListeners() {
        this.relayer.core.heartbeat.on(_s.HEARTBEAT_EVENTS.pulse, ()=>{
            if (this.needsTransportRestart) {
                this.needsTransportRestart = !1,
                this.relayer.events.emit(Wt.connection_stalled);
                return
            }
            this.checkQueue()
        }
        ),
        this.relayer.on(Wt.message_ack, r=>{
            this.removeRequestFromQueue(r.id.toString())
        }
        )
    }
}
class V1 {
    constructor() {
        this.map = new Map,
        this.set = (r,i)=>{
            const n = this.get(r);
            this.exists(r, i) || this.map.set(r, [...n, i])
        }
        ,
        this.get = r=>this.map.get(r) || [],
        this.exists = (r,i)=>this.get(r).includes(i),
        this.delete = (r,i)=>{
            if (typeof i > "u") {
                this.map.delete(r);
                return
            }
            if (!this.map.has(r))
                return;
            const n = this.get(r);
            if (!this.exists(r, i))
                return;
            const o = n.filter(h=>h !== i);
            if (!o.length) {
                this.map.delete(r);
                return
            }
            this.map.set(r, o)
        }
        ,
        this.clear = ()=>{
            this.map.clear()
        }
    }
    get topics() {
        return Array.from(this.map.keys())
    }
}
var G1 = Object.defineProperty
  , W1 = Object.defineProperties
  , J1 = Object.getOwnPropertyDescriptors
  , vl = Object.getOwnPropertySymbols
  , Q1 = Object.prototype.hasOwnProperty
  , Y1 = Object.prototype.propertyIsEnumerable
  , ml = (a,r,i)=>r in a ? G1(a, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : a[r] = i
  , Ks = (a,r)=>{
    for (var i in r || (r = {}))
        Q1.call(r, i) && ml(a, i, r[i]);
    if (vl)
        for (var i of vl(r))
            Y1.call(r, i) && ml(a, i, r[i]);
    return a
}
  , oc = (a,r)=>W1(a, J1(r));
class X1 extends Gw {
    constructor(r, i) {
        super(r, i),
        this.relayer = r,
        this.logger = i,
        this.subscriptions = new Map,
        this.topicMap = new V1,
        this.events = new Or.EventEmitter,
        this.name = A1,
        this.version = T1,
        this.pending = new Map,
        this.cached = [],
        this.initialized = !1,
        this.pendingSubscriptionWatchLabel = "pending_sub_watch_label",
        this.pollingInterval = 20,
        this.storagePrefix = xi,
        this.subscribeTimeout = 1e4,
        this.restartInProgress = !1,
        this.batchSubscribeTopicsLimit = 500,
        this.init = async()=>{
            this.initialized || (this.logger.trace("Initialized"),
            this.registerEventListeners(),
            this.clientId = await this.relayer.core.crypto.getClientId())
        }
        ,
        this.subscribe = async(n,o)=>{
            await this.restartToComplete(),
            this.isInitialized(),
            this.logger.debug("Subscribing Topic"),
            this.logger.trace({
                type: "method",
                method: "subscribe",
                params: {
                    topic: n,
                    opts: o
                }
            });
            try {
                const h = dc(o)
                  , p = {
                    topic: n,
                    relay: h
                };
                this.pending.set(n, p);
                const g = await this.rpcSubscribe(n, h);
                return this.onSubscribe(g, p),
                this.logger.debug("Successfully Subscribed Topic"),
                this.logger.trace({
                    type: "method",
                    method: "subscribe",
                    params: {
                        topic: n,
                        opts: o
                    }
                }),
                g
            } catch (h) {
                throw this.logger.debug("Failed to Subscribe Topic"),
                this.logger.error(h),
                h
            }
        }
        ,
        this.unsubscribe = async(n,o)=>{
            await this.restartToComplete(),
            this.isInitialized(),
            typeof (o == null ? void 0 : o.id) < "u" ? await this.unsubscribeById(n, o.id, o) : await this.unsubscribeByTopic(n, o)
        }
        ,
        this.isSubscribed = async n=>this.topics.includes(n) ? !0 : await new Promise((o,h)=>{
            const p = new se.Watch;
            p.start(this.pendingSubscriptionWatchLabel);
            const g = setInterval(()=>{
                !this.pending.has(n) && this.topics.includes(n) && (clearInterval(g),
                p.stop(this.pendingSubscriptionWatchLabel),
                o(!0)),
                p.elapsed(this.pendingSubscriptionWatchLabel) >= N1 && (clearInterval(g),
                p.stop(this.pendingSubscriptionWatchLabel),
                h(new Error("Subscription resolution timeout")))
            }
            , this.pollingInterval)
        }
        ).catch(()=>!1),
        this.on = (n,o)=>{
            this.events.on(n, o)
        }
        ,
        this.once = (n,o)=>{
            this.events.once(n, o)
        }
        ,
        this.off = (n,o)=>{
            this.events.off(n, o)
        }
        ,
        this.removeListener = (n,o)=>{
            this.events.removeListener(n, o)
        }
        ,
        this.restart = async()=>{
            this.restartInProgress = !0,
            await this.restore(),
            await this.reset(),
            this.restartInProgress = !1
        }
        ,
        this.relayer = r,
        this.logger = Re.generateChildLogger(i, this.name),
        this.clientId = ""
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name
    }
    get length() {
        return this.subscriptions.size
    }
    get ids() {
        return Array.from(this.subscriptions.keys())
    }
    get values() {
        return Array.from(this.subscriptions.values())
    }
    get topics() {
        return this.topicMap.topics
    }
    hasSubscription(r, i) {
        let n = !1;
        try {
            n = this.getSubscription(r).topic === i
        } catch {}
        return n
    }
    onEnable() {
        this.cached = [],
        this.initialized = !0
    }
    onDisable() {
        this.cached = this.values,
        this.subscriptions.clear(),
        this.topicMap.clear()
    }
    async unsubscribeByTopic(r, i) {
        const n = this.topicMap.get(r);
        await Promise.all(n.map(async o=>await this.unsubscribeById(r, o, i)))
    }
    async unsubscribeById(r, i, n) {
        this.logger.debug("Unsubscribing Topic"),
        this.logger.trace({
            type: "method",
            method: "unsubscribe",
            params: {
                topic: r,
                id: i,
                opts: n
            }
        });
        try {
            const o = dc(n);
            await this.rpcUnsubscribe(r, i, o);
            const h = Gt("USER_DISCONNECTED", `${this.name}, ${r}`);
            await this.onUnsubscribe(r, i, h),
            this.logger.debug("Successfully Unsubscribed Topic"),
            this.logger.trace({
                type: "method",
                method: "unsubscribe",
                params: {
                    topic: r,
                    id: i,
                    opts: n
                }
            })
        } catch (o) {
            throw this.logger.debug("Failed to Unsubscribe Topic"),
            this.logger.error(o),
            o
        }
    }
    async rpcSubscribe(r, i) {
        const n = {
            method: fo(i.protocol).subscribe,
            params: {
                topic: r
            }
        };
        this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: n
        });
        try {
            await await Ys(this.relayer.request(n), this.subscribeTimeout)
        } catch {
            this.logger.debug("Outgoing Relay Subscribe Payload stalled"),
            this.relayer.events.emit(Wt.connection_stalled)
        }
        return ys(r + this.clientId)
    }
    async rpcBatchSubscribe(r) {
        if (!r.length)
            return;
        const i = r[0].relay
          , n = {
            method: fo(i.protocol).batchSubscribe,
            params: {
                topics: r.map(o=>o.topic)
            }
        };
        this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: n
        });
        try {
            return await await Ys(this.relayer.request(n), this.subscribeTimeout)
        } catch {
            this.logger.debug("Outgoing Relay Payload stalled"),
            this.relayer.events.emit(Wt.connection_stalled)
        }
    }
    rpcUnsubscribe(r, i, n) {
        const o = {
            method: fo(n.protocol).unsubscribe,
            params: {
                topic: r,
                id: i
            }
        };
        return this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: o
        }),
        this.relayer.request(o)
    }
    onSubscribe(r, i) {
        this.setSubscription(r, oc(Ks({}, i), {
            id: r
        })),
        this.pending.delete(i.topic)
    }
    onBatchSubscribe(r) {
        r.length && r.forEach(i=>{
            this.setSubscription(i.id, Ks({}, i)),
            this.pending.delete(i.topic)
        }
        )
    }
    async onUnsubscribe(r, i, n) {
        this.events.removeAllListeners(i),
        this.hasSubscription(i, r) && this.deleteSubscription(i, n),
        await this.relayer.messages.del(r)
    }
    async setRelayerSubscriptions(r) {
        await this.relayer.core.storage.setItem(this.storageKey, r)
    }
    async getRelayerSubscriptions() {
        return await this.relayer.core.storage.getItem(this.storageKey)
    }
    setSubscription(r, i) {
        this.subscriptions.has(r) || (this.logger.debug("Setting subscription"),
        this.logger.trace({
            type: "method",
            method: "setSubscription",
            id: r,
            subscription: i
        }),
        this.addSubscription(r, i))
    }
    addSubscription(r, i) {
        this.subscriptions.set(r, Ks({}, i)),
        this.topicMap.set(i.topic, r),
        this.events.emit($r.created, i)
    }
    getSubscription(r) {
        this.logger.debug("Getting subscription"),
        this.logger.trace({
            type: "method",
            method: "getSubscription",
            id: r
        });
        const i = this.subscriptions.get(r);
        if (!i) {
            const {message: n} = Y("NO_MATCHING_KEY", `${this.name}: ${r}`);
            throw new Error(n)
        }
        return i
    }
    deleteSubscription(r, i) {
        this.logger.debug("Deleting subscription"),
        this.logger.trace({
            type: "method",
            method: "deleteSubscription",
            id: r,
            reason: i
        });
        const n = this.getSubscription(r);
        this.subscriptions.delete(r),
        this.topicMap.delete(n.topic, r),
        this.events.emit($r.deleted, oc(Ks({}, n), {
            reason: i
        }))
    }
    async persist() {
        await this.setRelayerSubscriptions(this.values),
        this.events.emit($r.sync)
    }
    async reset() {
        if (this.cached.length) {
            const r = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
            for (let i = 0; i < r; i++) {
                const n = this.cached.splice(0, this.batchSubscribeTopicsLimit);
                await this.batchSubscribe(n)
            }
        }
        this.events.emit($r.resubscribed)
    }
    async restore() {
        try {
            const r = await this.getRelayerSubscriptions();
            if (typeof r > "u" || !r.length)
                return;
            if (this.subscriptions.size) {
                const {message: i} = Y("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(i),
                this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`),
                new Error(i)
            }
            this.cached = r,
            this.logger.debug(`Successfully Restored subscriptions for ${this.name}`),
            this.logger.trace({
                type: "method",
                method: "restore",
                subscriptions: this.values
            })
        } catch (r) {
            this.logger.debug(`Failed to Restore subscriptions for ${this.name}`),
            this.logger.error(r)
        }
    }
    async batchSubscribe(r) {
        if (!r.length)
            return;
        const i = await this.rpcBatchSubscribe(r);
        ms(i) && this.onBatchSubscribe(i.map((n,o)=>oc(Ks({}, r[o]), {
            id: n
        })))
    }
    async onConnect() {
        this.restartInProgress || (await this.restart(),
        this.onEnable())
    }
    onDisconnect() {
        this.onDisable()
    }
    async checkPending() {
        if (!this.initialized || this.relayer.transportExplicitlyClosed)
            return;
        const r = [];
        this.pending.forEach(i=>{
            r.push(i)
        }
        ),
        await this.batchSubscribe(r)
    }
    registerEventListeners() {
        this.relayer.core.heartbeat.on(_s.HEARTBEAT_EVENTS.pulse, async()=>{
            await this.checkPending()
        }
        ),
        this.relayer.on(Wt.connect, async()=>{
            await this.onConnect()
        }
        ),
        this.relayer.on(Wt.disconnect, ()=>{
            this.onDisconnect()
        }
        ),
        this.events.on($r.created, async r=>{
            const i = $r.created;
            this.logger.info(`Emitting ${i}`),
            this.logger.debug({
                type: "event",
                event: i,
                data: r
            }),
            await this.persist()
        }
        ),
        this.events.on($r.deleted, async r=>{
            const i = $r.deleted;
            this.logger.info(`Emitting ${i}`),
            this.logger.debug({
                type: "event",
                event: i,
                data: r
            }),
            await this.persist()
        }
        )
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: r} = Y("NOT_INITIALIZED", this.name);
            throw new Error(r)
        }
    }
    async restartToComplete() {
        this.restartInProgress && await new Promise(r=>{
            const i = setInterval(()=>{
                this.restartInProgress || (clearInterval(i),
                r())
            }
            , this.pollingInterval)
        }
        )
    }
}
var Z1 = Object.defineProperty
  , wl = Object.getOwnPropertySymbols
  , eE = Object.prototype.hasOwnProperty
  , tE = Object.prototype.propertyIsEnumerable
  , _l = (a,r,i)=>r in a ? Z1(a, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : a[r] = i
  , rE = (a,r)=>{
    for (var i in r || (r = {}))
        eE.call(r, i) && _l(a, i, r[i]);
    if (wl)
        for (var i of wl(r))
            tE.call(r, i) && _l(a, i, r[i]);
    return a
}
;
class iE extends Fw {
    constructor(r) {
        super(r),
        this.protocol = "wc",
        this.version = 2,
        this.events = new Or.EventEmitter,
        this.name = I1,
        this.transportExplicitlyClosed = !1,
        this.initialized = !1,
        this.connectionAttemptInProgress = !1,
        this.connectionStatusPollingInterval = 20,
        this.staleConnectionErrors = ["socket hang up", "socket stalled"],
        this.hasExperiencedNetworkDisruption = !1,
        this.request = async i=>{
            this.logger.debug("Publishing Request Payload");
            try {
                return await this.toEstablishConnection(),
                await this.provider.request(i)
            } catch (n) {
                throw this.logger.debug("Failed to Publish Request"),
                this.logger.error(n),
                n
            }
        }
        ,
        this.onPayloadHandler = i=>{
            this.onProviderPayload(i)
        }
        ,
        this.onConnectHandler = ()=>{
            this.events.emit(Wt.connect)
        }
        ,
        this.onDisconnectHandler = ()=>{
            this.onProviderDisconnect()
        }
        ,
        this.onProviderErrorHandler = i=>{
            this.logger.error(i),
            this.events.emit(Wt.error, i),
            this.logger.info("Fatal socket error received, closing transport"),
            this.transportClose()
        }
        ,
        this.registerProviderListeners = ()=>{
            this.provider.on(oi.payload, this.onPayloadHandler),
            this.provider.on(oi.connect, this.onConnectHandler),
            this.provider.on(oi.disconnect, this.onDisconnectHandler),
            this.provider.on(oi.error, this.onProviderErrorHandler)
        }
        ,
        this.core = r.core,
        this.logger = typeof r.logger < "u" && typeof r.logger != "string" ? Re.generateChildLogger(r.logger, this.name) : Re.pino(Re.getDefaultLoggerOptions({
            level: r.logger || E1
        })),
        this.messages = new B1(this.logger,r.core),
        this.subscriber = new X1(this,this.logger),
        this.publisher = new F1(this,this.logger),
        this.relayUrl = (r == null ? void 0 : r.relayUrl) || Rf,
        this.projectId = r.projectId,
        this.bundleId = S0(),
        this.provider = {}
    }
    async init() {
        this.logger.trace("Initialized"),
        this.registerEventListeners(),
        await this.createProvider(),
        await Promise.all([this.messages.init(), this.subscriber.init()]);
        try {
            await this.transportOpen()
        } catch {
            this.logger.warn(`Connection via ${this.relayUrl} failed, attempting to connect via failover domain ${yl}...`),
            await this.restartTransport(yl)
        }
        this.initialized = !0,
        setTimeout(async()=>{
            this.subscriber.topics.length === 0 && (this.logger.info("No topics subscribed to after init, closing transport"),
            await this.transportClose(),
            this.transportExplicitlyClosed = !1)
        }
        , O1)
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    get connected() {
        return this.provider.connection.connected
    }
    get connecting() {
        return this.provider.connection.connecting
    }
    async publish(r, i, n) {
        this.isInitialized(),
        await this.publisher.publish(r, i, n),
        await this.recordMessageEvent({
            topic: r,
            message: i,
            publishedAt: Date.now()
        })
    }
    async subscribe(r, i) {
        var n;
        this.isInitialized();
        let o = ((n = this.subscriber.topicMap.get(r)) == null ? void 0 : n[0]) || "";
        if (o)
            return o;
        let h;
        const p = g=>{
            g.topic === r && (this.subscriber.off($r.created, p),
            h())
        }
        ;
        return await Promise.all([new Promise(g=>{
            h = g,
            this.subscriber.on($r.created, p)
        }
        ), new Promise(async g=>{
            o = await this.subscriber.subscribe(r, i),
            g()
        }
        )]),
        o
    }
    async unsubscribe(r, i) {
        this.isInitialized(),
        await this.subscriber.unsubscribe(r, i)
    }
    on(r, i) {
        this.events.on(r, i)
    }
    once(r, i) {
        this.events.once(r, i)
    }
    off(r, i) {
        this.events.off(r, i)
    }
    removeListener(r, i) {
        this.events.removeListener(r, i)
    }
    async transportClose() {
        this.transportExplicitlyClosed = !0,
        this.hasExperiencedNetworkDisruption && this.connected ? await Ys(this.provider.disconnect(), 1e3, "provider.disconnect()").catch(()=>this.onProviderDisconnect()) : this.connected && await this.provider.disconnect()
    }
    async transportOpen(r) {
        if (this.transportExplicitlyClosed = !1,
        await this.confirmOnlineStateOrThrow(),
        !this.connectionAttemptInProgress) {
            r && r !== this.relayUrl && (this.relayUrl = r,
            await this.transportClose(),
            await this.createProvider()),
            this.connectionAttemptInProgress = !0;
            try {
                await Promise.all([new Promise(i=>{
                    if (!this.initialized)
                        return i();
                    this.subscriber.once($r.resubscribed, ()=>{
                        i()
                    }
                    )
                }
                ), new Promise(async(i,n)=>{
                    try {
                        await Ys(this.provider.connect(), 1e4, `Socket stalled when trying to connect to ${this.relayUrl}`)
                    } catch (o) {
                        n(o);
                        return
                    }
                    i()
                }
                )])
            } catch (i) {
                this.logger.error(i);
                const n = i;
                if (!this.isConnectionStalled(n.message))
                    throw i;
                this.provider.events.emit(oi.disconnect)
            } finally {
                this.connectionAttemptInProgress = !1,
                this.hasExperiencedNetworkDisruption = !1
            }
        }
    }
    async restartTransport(r) {
        await this.confirmOnlineStateOrThrow(),
        !this.connectionAttemptInProgress && (this.relayUrl = r || this.relayUrl,
        await this.transportClose(),
        await this.createProvider(),
        await this.transportOpen())
    }
    async confirmOnlineStateOrThrow() {
        if (!await qh())
            throw new Error("No internet connection detected. Please restart your network and try again.")
    }
    isConnectionStalled(r) {
        return this.staleConnectionErrors.some(i=>r.includes(i))
    }
    async createProvider() {
        this.provider.connection && this.unregisterProviderListeners();
        const r = await this.core.crypto.signJWT(this.relayUrl);
        this.provider = new ui(new D_(O0({
            sdkVersion: S1,
            protocol: this.protocol,
            version: this.version,
            relayUrl: this.relayUrl,
            projectId: this.projectId,
            auth: r,
            useOnCloseEvent: !0,
            bundleId: this.bundleId
        }))),
        this.registerProviderListeners()
    }
    async recordMessageEvent(r) {
        const {topic: i, message: n} = r;
        await this.messages.set(i, n)
    }
    async shouldIgnoreMessageEvent(r) {
        const {topic: i, message: n} = r;
        if (!n || n.length === 0)
            return this.logger.debug(`Ignoring invalid/empty message: ${n}`),
            !0;
        if (!await this.subscriber.isSubscribed(i))
            return this.logger.debug(`Ignoring message for non-subscribed topic ${i}`),
            !0;
        const o = this.messages.has(i, n);
        return o && this.logger.debug(`Ignoring duplicate message: ${n}`),
        o
    }
    async onProviderPayload(r) {
        if (this.logger.debug("Incoming Relay Payload"),
        this.logger.trace({
            type: "payload",
            direction: "incoming",
            payload: r
        }),
        Cc(r)) {
            if (!r.method.endsWith(x1))
                return;
            const i = r.params
              , {topic: n, message: o, publishedAt: h} = i.data
              , p = {
                topic: n,
                message: o,
                publishedAt: h
            };
            this.logger.debug("Emitting Relayer Payload"),
            this.logger.trace(rE({
                type: "event",
                event: i.id
            }, p)),
            this.events.emit(i.id, p),
            await this.acknowledgePayload(r),
            await this.onMessageEvent(p)
        } else
            Io(r) && this.events.emit(Wt.message_ack, r)
    }
    async onMessageEvent(r) {
        await this.shouldIgnoreMessageEvent(r) || (this.events.emit(Wt.message, r),
        await this.recordMessageEvent(r))
    }
    async acknowledgePayload(r) {
        const i = bo(r.id, !0);
        await this.provider.connection.send(i)
    }
    unregisterProviderListeners() {
        this.provider.off(oi.payload, this.onPayloadHandler),
        this.provider.off(oi.connect, this.onConnectHandler),
        this.provider.off(oi.disconnect, this.onDisconnectHandler),
        this.provider.off(oi.error, this.onProviderErrorHandler)
    }
    async registerEventListeners() {
        this.events.on(Wt.connection_stalled, ()=>{
            this.restartTransport().catch(i=>this.logger.error(i))
        }
        );
        let r = await qh();
        R0(async i=>{
            this.initialized && r !== i && (r = i,
            i ? await this.restartTransport().catch(n=>this.logger.error(n)) : (this.hasExperiencedNetworkDisruption = !0,
            await this.transportClose().catch(n=>this.logger.error(n))))
        }
        )
    }
    onProviderDisconnect() {
        this.events.emit(Wt.disconnect),
        this.attemptToReconnect()
    }
    attemptToReconnect() {
        this.transportExplicitlyClosed || (this.logger.info("attemptToReconnect called. Connecting..."),
        setTimeout(async()=>{
            await this.restartTransport().catch(r=>this.logger.error(r))
        }
        , se.toMiliseconds(P1)))
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: r} = Y("NOT_INITIALIZED", this.name);
            throw new Error(r)
        }
    }
    async toEstablishConnection() {
        if (await this.confirmOnlineStateOrThrow(),
        !this.connected) {
            if (this.connectionAttemptInProgress)
                return await new Promise(r=>{
                    const i = setInterval(()=>{
                        this.connected && (clearInterval(i),
                        r())
                    }
                    , this.connectionStatusPollingInterval)
                }
                );
            await this.restartTransport()
        }
    }
}
var sE = Object.defineProperty
  , bl = Object.getOwnPropertySymbols
  , nE = Object.prototype.hasOwnProperty
  , oE = Object.prototype.propertyIsEnumerable
  , El = (a,r,i)=>r in a ? sE(a, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : a[r] = i
  , Il = (a,r)=>{
    for (var i in r || (r = {}))
        nE.call(r, i) && El(a, i, r[i]);
    if (bl)
        for (var i of bl(r))
            oE.call(r, i) && El(a, i, r[i]);
    return a
}
;
class Po extends Vw {
    constructor(r, i, n, o=xi, h=void 0) {
        super(r, i, n, o),
        this.core = r,
        this.logger = i,
        this.name = n,
        this.map = new Map,
        this.version = R1,
        this.cached = [],
        this.initialized = !1,
        this.storagePrefix = xi,
        this.init = async()=>{
            this.initialized || (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach(p=>{
                this.getKey && p !== null && !Ii(p) ? this.map.set(this.getKey(p), p) : g0(p) ? this.map.set(p.id, p) : y0(p) && this.map.set(p.topic, p)
            }
            ),
            this.cached = [],
            this.initialized = !0)
        }
        ,
        this.set = async(p,g)=>{
            this.isInitialized(),
            this.map.has(p) ? await this.update(p, g) : (this.logger.debug("Setting value"),
            this.logger.trace({
                type: "method",
                method: "set",
                key: p,
                value: g
            }),
            this.map.set(p, g),
            await this.persist())
        }
        ,
        this.get = p=>(this.isInitialized(),
        this.logger.debug("Getting value"),
        this.logger.trace({
            type: "method",
            method: "get",
            key: p
        }),
        this.getData(p)),
        this.getAll = p=>(this.isInitialized(),
        p ? this.values.filter(g=>Object.keys(p).every(_=>L_(g[_], p[_]))) : this.values),
        this.update = async(p,g)=>{
            this.isInitialized(),
            this.logger.debug("Updating value"),
            this.logger.trace({
                type: "method",
                method: "update",
                key: p,
                update: g
            });
            const _ = Il(Il({}, this.getData(p)), g);
            this.map.set(p, _),
            await this.persist()
        }
        ,
        this.delete = async(p,g)=>{
            this.isInitialized(),
            this.map.has(p) && (this.logger.debug("Deleting value"),
            this.logger.trace({
                type: "method",
                method: "delete",
                key: p,
                reason: g
            }),
            this.map.delete(p),
            await this.persist())
        }
        ,
        this.logger = Re.generateChildLogger(i, this.name),
        this.storagePrefix = o,
        this.getKey = h
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name
    }
    get length() {
        return this.map.size
    }
    get keys() {
        return Array.from(this.map.keys())
    }
    get values() {
        return Array.from(this.map.values())
    }
    async setDataStore(r) {
        await this.core.storage.setItem(this.storageKey, r)
    }
    async getDataStore() {
        return await this.core.storage.getItem(this.storageKey)
    }
    getData(r) {
        const i = this.map.get(r);
        if (!i) {
            const {message: n} = Y("NO_MATCHING_KEY", `${this.name}: ${r}`);
            throw this.logger.error(n),
            new Error(n)
        }
        return i
    }
    async persist() {
        await this.setDataStore(this.values)
    }
    async restore() {
        try {
            const r = await this.getDataStore();
            if (typeof r > "u" || !r.length)
                return;
            if (this.map.size) {
                const {message: i} = Y("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(i),
                new Error(i)
            }
            this.cached = r,
            this.logger.debug(`Successfully Restored value for ${this.name}`),
            this.logger.trace({
                type: "method",
                method: "restore",
                value: this.values
            })
        } catch (r) {
            this.logger.debug(`Failed to Restore value for ${this.name}`),
            this.logger.error(r)
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: r} = Y("NOT_INITIALIZED", this.name);
            throw new Error(r)
        }
    }
}
class aE {
    constructor(r, i) {
        this.core = r,
        this.logger = i,
        this.name = D1,
        this.version = $1,
        this.events = new Pc,
        this.initialized = !1,
        this.storagePrefix = xi,
        this.ignoredPayloadTypes = [Vl],
        this.registeredMethods = [],
        this.init = async()=>{
            this.initialized || (await this.pairings.init(),
            await this.cleanup(),
            this.registerRelayerEvents(),
            this.registerExpirerEvents(),
            this.initialized = !0,
            this.logger.trace("Initialized"))
        }
        ,
        this.register = ({methods: n})=>{
            this.isInitialized(),
            this.registeredMethods = [...new Set([...this.registeredMethods, ...n])]
        }
        ,
        this.create = async()=>{
            this.isInitialized();
            const n = pc()
              , o = await this.core.crypto.setSymKey(n)
              , h = Lr(se.FIVE_MINUTES)
              , p = {
                protocol: Of
            }
              , g = {
                topic: o,
                expiry: h,
                relay: p,
                active: !1
            }
              , _ = C0({
                protocol: this.core.protocol,
                version: this.core.version,
                topic: o,
                symKey: n,
                relay: p
            });
            return await this.pairings.set(o, g),
            await this.core.relayer.subscribe(o),
            this.core.expirer.set(o, h),
            {
                topic: o,
                uri: _
            }
        }
        ,
        this.pair = async n=>{
            this.isInitialized(),
            this.isValidPair(n);
            const {topic: o, symKey: h, relay: p} = Mh(n.uri);
            let g;
            if (this.pairings.keys.includes(o) && (g = this.pairings.get(o),
            g.active))
                throw new Error(`Pairing already exists: ${o}. Please try again with a new connection URI.`);
            const _ = Lr(se.FIVE_MINUTES)
              , v = {
                topic: o,
                relay: p,
                expiry: _,
                active: !1
            };
            return await this.pairings.set(o, v),
            this.core.expirer.set(o, _),
            n.activatePairing && await this.activate({
                topic: o
            }),
            this.events.emit(Ws.create, v),
            this.core.crypto.keychain.has(o) || (await this.core.crypto.setSymKey(h, o),
            await this.core.relayer.subscribe(o, {
                relay: p
            })),
            v
        }
        ,
        this.activate = async({topic: n})=>{
            this.isInitialized();
            const o = Lr(se.THIRTY_DAYS);
            await this.pairings.update(n, {
                active: !0,
                expiry: o
            }),
            this.core.expirer.set(n, o)
        }
        ,
        this.ping = async n=>{
            this.isInitialized(),
            await this.isValidPing(n);
            const {topic: o} = n;
            if (this.pairings.keys.includes(o)) {
                const h = await this.sendRequest(o, "wc_pairingPing", {})
                  , {done: p, resolve: g, reject: _} = ps();
                this.events.once(Dt("pairing_ping", h), ({error: v})=>{
                    v ? _(v) : g()
                }
                ),
                await p()
            }
        }
        ,
        this.updateExpiry = async({topic: n, expiry: o})=>{
            this.isInitialized(),
            await this.pairings.update(n, {
                expiry: o
            })
        }
        ,
        this.updateMetadata = async({topic: n, metadata: o})=>{
            this.isInitialized(),
            await this.pairings.update(n, {
                peerMetadata: o
            })
        }
        ,
        this.getPairings = ()=>(this.isInitialized(),
        this.pairings.values),
        this.disconnect = async n=>{
            this.isInitialized(),
            await this.isValidDisconnect(n);
            const {topic: o} = n;
            this.pairings.keys.includes(o) && (await this.sendRequest(o, "wc_pairingDelete", Gt("USER_DISCONNECTED")),
            await this.deletePairing(o))
        }
        ,
        this.sendRequest = async(n,o,h)=>{
            const p = vs(o, h)
              , g = await this.core.crypto.encode(n, p)
              , _ = ks[o].req;
            return this.core.history.set(n, p),
            this.core.relayer.publish(n, g, _),
            p.id
        }
        ,
        this.sendResult = async(n,o,h)=>{
            const p = bo(n, h)
              , g = await this.core.crypto.encode(o, p)
              , _ = await this.core.history.get(o, n)
              , v = ks[_.request.method].res;
            await this.core.relayer.publish(o, g, v),
            await this.core.history.resolve(p)
        }
        ,
        this.sendError = async(n,o,h)=>{
            const p = Eo(n, h)
              , g = await this.core.crypto.encode(o, p)
              , _ = await this.core.history.get(o, n)
              , v = ks[_.request.method] ? ks[_.request.method].res : ks.unregistered_method.res;
            await this.core.relayer.publish(o, g, v),
            await this.core.history.resolve(p)
        }
        ,
        this.deletePairing = async(n,o)=>{
            await this.core.relayer.unsubscribe(n),
            await Promise.all([this.pairings.delete(n, Gt("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(n), o ? Promise.resolve() : this.core.expirer.del(n)])
        }
        ,
        this.cleanup = async()=>{
            const n = this.pairings.getAll().filter(o=>Ei(o.expiry));
            await Promise.all(n.map(o=>this.deletePairing(o.topic)))
        }
        ,
        this.onRelayEventRequest = n=>{
            const {topic: o, payload: h} = n;
            switch (h.method) {
            case "wc_pairingPing":
                return this.onPairingPingRequest(o, h);
            case "wc_pairingDelete":
                return this.onPairingDeleteRequest(o, h);
            default:
                return this.onUnknownRpcMethodRequest(o, h)
            }
        }
        ,
        this.onRelayEventResponse = async n=>{
            const {topic: o, payload: h} = n
              , p = (await this.core.history.get(o, h.id)).request.method;
            switch (p) {
            case "wc_pairingPing":
                return this.onPairingPingResponse(o, h);
            default:
                return this.onUnknownRpcMethodResponse(p)
            }
        }
        ,
        this.onPairingPingRequest = async(n,o)=>{
            const {id: h} = o;
            try {
                this.isValidPing({
                    topic: n
                }),
                await this.sendResult(h, n, !0),
                this.events.emit(Ws.ping, {
                    id: h,
                    topic: n
                })
            } catch (p) {
                await this.sendError(h, n, p),
                this.logger.error(p)
            }
        }
        ,
        this.onPairingPingResponse = (n,o)=>{
            const {id: h} = o;
            setTimeout(()=>{
                ci(o) ? this.events.emit(Dt("pairing_ping", h), {}) : qr(o) && this.events.emit(Dt("pairing_ping", h), {
                    error: o.error
                })
            }
            , 500)
        }
        ,
        this.onPairingDeleteRequest = async(n,o)=>{
            const {id: h} = o;
            try {
                this.isValidDisconnect({
                    topic: n
                }),
                await this.deletePairing(n),
                this.events.emit(Ws.delete, {
                    id: h,
                    topic: n
                })
            } catch (p) {
                await this.sendError(h, n, p),
                this.logger.error(p)
            }
        }
        ,
        this.onUnknownRpcMethodRequest = async(n,o)=>{
            const {id: h, method: p} = o;
            try {
                if (this.registeredMethods.includes(p))
                    return;
                const g = Gt("WC_METHOD_UNSUPPORTED", p);
                await this.sendError(h, n, g),
                this.logger.error(g)
            } catch (g) {
                await this.sendError(h, n, g),
                this.logger.error(g)
            }
        }
        ,
        this.onUnknownRpcMethodResponse = n=>{
            this.registeredMethods.includes(n) || this.logger.error(Gt("WC_METHOD_UNSUPPORTED", n))
        }
        ,
        this.isValidPair = n=>{
            var o;
            if (!hr(n)) {
                const {message: p} = Y("MISSING_OR_INVALID", `pair() params: ${n}`);
                throw new Error(p)
            }
            if (!A0(n.uri)) {
                const {message: p} = Y("MISSING_OR_INVALID", `pair() uri: ${n.uri}`);
                throw new Error(p)
            }
            const h = Mh(n.uri);
            if (!((o = h == null ? void 0 : h.relay) != null && o.protocol)) {
                const {message: p} = Y("MISSING_OR_INVALID", "pair() uri#relay-protocol");
                throw new Error(p)
            }
            if (!(h != null && h.symKey)) {
                const {message: p} = Y("MISSING_OR_INVALID", "pair() uri#symKey");
                throw new Error(p)
            }
        }
        ,
        this.isValidPing = async n=>{
            if (!hr(n)) {
                const {message: h} = Y("MISSING_OR_INVALID", `ping() params: ${n}`);
                throw new Error(h)
            }
            const {topic: o} = n;
            await this.isValidPairingTopic(o)
        }
        ,
        this.isValidDisconnect = async n=>{
            if (!hr(n)) {
                const {message: h} = Y("MISSING_OR_INVALID", `disconnect() params: ${n}`);
                throw new Error(h)
            }
            const {topic: o} = n;
            await this.isValidPairingTopic(o)
        }
        ,
        this.isValidPairingTopic = async n=>{
            if (!ds(n, !1)) {
                const {message: o} = Y("MISSING_OR_INVALID", `pairing topic should be a string: ${n}`);
                throw new Error(o)
            }
            if (!this.pairings.keys.includes(n)) {
                const {message: o} = Y("NO_MATCHING_KEY", `pairing topic doesn't exist: ${n}`);
                throw new Error(o)
            }
            if (Ei(this.pairings.get(n).expiry)) {
                await this.deletePairing(n);
                const {message: o} = Y("EXPIRED", `pairing topic: ${n}`);
                throw new Error(o)
            }
        }
        ,
        this.core = r,
        this.logger = Re.generateChildLogger(i, this.name),
        this.pairings = new Po(this.core,this.logger,this.name,this.storagePrefix)
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: r} = Y("NOT_INITIALIZED", this.name);
            throw new Error(r)
        }
    }
    registerRelayerEvents() {
        this.core.relayer.on(Wt.message, async r=>{
            const {topic: i, message: n} = r;
            if (!this.pairings.keys.includes(i) || this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(n)))
                return;
            const o = await this.core.crypto.decode(i, n);
            try {
                Cc(o) ? (this.core.history.set(i, o),
                this.onRelayEventRequest({
                    topic: i,
                    payload: o
                })) : Io(o) && (await this.core.history.resolve(o),
                await this.onRelayEventResponse({
                    topic: i,
                    payload: o
                }),
                this.core.history.delete(i, o.id))
            } catch (h) {
                this.logger.error(h)
            }
        }
        )
    }
    registerExpirerEvents() {
        this.core.expirer.on(Sr.expired, async r=>{
            const {topic: i} = Gl(r.target);
            i && this.pairings.keys.includes(i) && (await this.deletePairing(i, !0),
            this.events.emit(Ws.expire, {
                topic: i
            }))
        }
        )
    }
}
class cE extends kw {
    constructor(r, i) {
        super(r, i),
        this.core = r,
        this.logger = i,
        this.records = new Map,
        this.events = new Or.EventEmitter,
        this.name = L1,
        this.version = q1,
        this.cached = [],
        this.initialized = !1,
        this.storagePrefix = xi,
        this.init = async()=>{
            this.initialized || (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach(n=>this.records.set(n.id, n)),
            this.cached = [],
            this.registerEventListeners(),
            this.initialized = !0)
        }
        ,
        this.set = (n,o,h)=>{
            if (this.isInitialized(),
            this.logger.debug("Setting JSON-RPC request history record"),
            this.logger.trace({
                type: "method",
                method: "set",
                topic: n,
                request: o,
                chainId: h
            }),
            this.records.has(o.id))
                return;
            const p = {
                id: o.id,
                topic: n,
                request: {
                    method: o.method,
                    params: o.params || null
                },
                chainId: h,
                expiry: Lr(se.THIRTY_DAYS)
            };
            this.records.set(p.id, p),
            this.events.emit(Fr.created, p)
        }
        ,
        this.resolve = async n=>{
            if (this.isInitialized(),
            this.logger.debug("Updating JSON-RPC response history record"),
            this.logger.trace({
                type: "method",
                method: "update",
                response: n
            }),
            !this.records.has(n.id))
                return;
            const o = await this.getRecord(n.id);
            typeof o.response > "u" && (o.response = qr(n) ? {
                error: n.error
            } : {
                result: n.result
            },
            this.records.set(o.id, o),
            this.events.emit(Fr.updated, o))
        }
        ,
        this.get = async(n,o)=>(this.isInitialized(),
        this.logger.debug("Getting record"),
        this.logger.trace({
            type: "method",
            method: "get",
            topic: n,
            id: o
        }),
        await this.getRecord(o)),
        this.delete = (n,o)=>{
            this.isInitialized(),
            this.logger.debug("Deleting record"),
            this.logger.trace({
                type: "method",
                method: "delete",
                id: o
            }),
            this.values.forEach(h=>{
                if (h.topic === n) {
                    if (typeof o < "u" && h.id !== o)
                        return;
                    this.records.delete(h.id),
                    this.events.emit(Fr.deleted, h)
                }
            }
            )
        }
        ,
        this.exists = async(n,o)=>(this.isInitialized(),
        this.records.has(o) ? (await this.getRecord(o)).topic === n : !1),
        this.on = (n,o)=>{
            this.events.on(n, o)
        }
        ,
        this.once = (n,o)=>{
            this.events.once(n, o)
        }
        ,
        this.off = (n,o)=>{
            this.events.off(n, o)
        }
        ,
        this.removeListener = (n,o)=>{
            this.events.removeListener(n, o)
        }
        ,
        this.logger = Re.generateChildLogger(i, this.name)
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name
    }
    get size() {
        return this.records.size
    }
    get keys() {
        return Array.from(this.records.keys())
    }
    get values() {
        return Array.from(this.records.values())
    }
    get pending() {
        const r = [];
        return this.values.forEach(i=>{
            if (typeof i.response < "u")
                return;
            const n = {
                topic: i.topic,
                request: vs(i.request.method, i.request.params, i.id),
                chainId: i.chainId
            };
            return r.push(n)
        }
        ),
        r
    }
    async setJsonRpcRecords(r) {
        await this.core.storage.setItem(this.storageKey, r)
    }
    async getJsonRpcRecords() {
        return await this.core.storage.getItem(this.storageKey)
    }
    getRecord(r) {
        this.isInitialized();
        const i = this.records.get(r);
        if (!i) {
            const {message: n} = Y("NO_MATCHING_KEY", `${this.name}: ${r}`);
            throw new Error(n)
        }
        return i
    }
    async persist() {
        await this.setJsonRpcRecords(this.values),
        this.events.emit(Fr.sync)
    }
    async restore() {
        try {
            const r = await this.getJsonRpcRecords();
            if (typeof r > "u" || !r.length)
                return;
            if (this.records.size) {
                const {message: i} = Y("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(i),
                new Error(i)
            }
            this.cached = r,
            this.logger.debug(`Successfully Restored records for ${this.name}`),
            this.logger.trace({
                type: "method",
                method: "restore",
                records: this.values
            })
        } catch (r) {
            this.logger.debug(`Failed to Restore records for ${this.name}`),
            this.logger.error(r)
        }
    }
    registerEventListeners() {
        this.events.on(Fr.created, r=>{
            const i = Fr.created;
            this.logger.info(`Emitting ${i}`),
            this.logger.debug({
                type: "event",
                event: i,
                record: r
            }),
            this.persist()
        }
        ),
        this.events.on(Fr.updated, r=>{
            const i = Fr.updated;
            this.logger.info(`Emitting ${i}`),
            this.logger.debug({
                type: "event",
                event: i,
                record: r
            }),
            this.persist()
        }
        ),
        this.events.on(Fr.deleted, r=>{
            const i = Fr.deleted;
            this.logger.info(`Emitting ${i}`),
            this.logger.debug({
                type: "event",
                event: i,
                record: r
            }),
            this.persist()
        }
        ),
        this.core.heartbeat.on(_s.HEARTBEAT_EVENTS.pulse, ()=>{
            this.cleanup()
        }
        )
    }
    cleanup() {
        try {
            this.records.forEach(r=>{
                se.toMiliseconds(r.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${r.id}`),
                this.delete(r.topic, r.id))
            }
            )
        } catch (r) {
            this.logger.warn(r)
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: r} = Y("NOT_INITIALIZED", this.name);
            throw new Error(r)
        }
    }
}
class uE extends Ww {
    constructor(r, i) {
        super(r, i),
        this.core = r,
        this.logger = i,
        this.expirations = new Map,
        this.events = new Or.EventEmitter,
        this.name = M1,
        this.version = j1,
        this.cached = [],
        this.initialized = !1,
        this.storagePrefix = xi,
        this.init = async()=>{
            this.initialized || (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach(n=>this.expirations.set(n.target, n)),
            this.cached = [],
            this.registerEventListeners(),
            this.initialized = !0)
        }
        ,
        this.has = n=>{
            try {
                const o = this.formatTarget(n);
                return typeof this.getExpiration(o) < "u"
            } catch {
                return !1
            }
        }
        ,
        this.set = (n,o)=>{
            this.isInitialized();
            const h = this.formatTarget(n)
              , p = {
                target: h,
                expiry: o
            };
            this.expirations.set(h, p),
            this.checkExpiry(h, p),
            this.events.emit(Sr.created, {
                target: h,
                expiration: p
            })
        }
        ,
        this.get = n=>{
            this.isInitialized();
            const o = this.formatTarget(n);
            return this.getExpiration(o)
        }
        ,
        this.del = n=>{
            if (this.isInitialized(),
            this.has(n)) {
                const o = this.formatTarget(n)
                  , h = this.getExpiration(o);
                this.expirations.delete(o),
                this.events.emit(Sr.deleted, {
                    target: o,
                    expiration: h
                })
            }
        }
        ,
        this.on = (n,o)=>{
            this.events.on(n, o)
        }
        ,
        this.once = (n,o)=>{
            this.events.once(n, o)
        }
        ,
        this.off = (n,o)=>{
            this.events.off(n, o)
        }
        ,
        this.removeListener = (n,o)=>{
            this.events.removeListener(n, o)
        }
        ,
        this.logger = Re.generateChildLogger(i, this.name)
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name
    }
    get length() {
        return this.expirations.size
    }
    get keys() {
        return Array.from(this.expirations.keys())
    }
    get values() {
        return Array.from(this.expirations.values())
    }
    formatTarget(r) {
        if (typeof r == "string")
            return T0(r);
        if (typeof r == "number")
            return N0(r);
        const {message: i} = Y("UNKNOWN_TYPE", `Target type: ${typeof r}`);
        throw new Error(i)
    }
    async setExpirations(r) {
        await this.core.storage.setItem(this.storageKey, r)
    }
    async getExpirations() {
        return await this.core.storage.getItem(this.storageKey)
    }
    async persist() {
        await this.setExpirations(this.values),
        this.events.emit(Sr.sync)
    }
    async restore() {
        try {
            const r = await this.getExpirations();
            if (typeof r > "u" || !r.length)
                return;
            if (this.expirations.size) {
                const {message: i} = Y("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(i),
                new Error(i)
            }
            this.cached = r,
            this.logger.debug(`Successfully Restored expirations for ${this.name}`),
            this.logger.trace({
                type: "method",
                method: "restore",
                expirations: this.values
            })
        } catch (r) {
            this.logger.debug(`Failed to Restore expirations for ${this.name}`),
            this.logger.error(r)
        }
    }
    getExpiration(r) {
        const i = this.expirations.get(r);
        if (!i) {
            const {message: n} = Y("NO_MATCHING_KEY", `${this.name}: ${r}`);
            throw this.logger.error(n),
            new Error(n)
        }
        return i
    }
    checkExpiry(r, i) {
        const {expiry: n} = i;
        se.toMiliseconds(n) - Date.now() <= 0 && this.expire(r, i)
    }
    expire(r, i) {
        this.expirations.delete(r),
        this.events.emit(Sr.expired, {
            target: r,
            expiration: i
        })
    }
    checkExpirations() {
        this.core.relayer.connected && this.expirations.forEach((r,i)=>this.checkExpiry(i, r))
    }
    registerEventListeners() {
        this.core.heartbeat.on(_s.HEARTBEAT_EVENTS.pulse, ()=>this.checkExpirations()),
        this.events.on(Sr.created, r=>{
            const i = Sr.created;
            this.logger.info(`Emitting ${i}`),
            this.logger.debug({
                type: "event",
                event: i,
                data: r
            }),
            this.persist()
        }
        ),
        this.events.on(Sr.expired, r=>{
            const i = Sr.expired;
            this.logger.info(`Emitting ${i}`),
            this.logger.debug({
                type: "event",
                event: i,
                data: r
            }),
            this.persist()
        }
        ),
        this.events.on(Sr.deleted, r=>{
            const i = Sr.deleted;
            this.logger.info(`Emitting ${i}`),
            this.logger.debug({
                type: "event",
                event: i,
                data: r
            }),
            this.persist()
        }
        )
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: r} = Y("NOT_INITIALIZED", this.name);
            throw new Error(r)
        }
    }
}
class hE extends Jw {
    constructor(r, i) {
        super(r, i),
        this.projectId = r,
        this.logger = i,
        this.name = nc,
        this.initialized = !1,
        this.queue = [],
        this.verifyDisabled = !1,
        this.init = async n=>{
            if (this.verifyDisabled || D0() || !Wl())
                return;
            const o = this.getVerifyUrl(n == null ? void 0 : n.verifyUrl);
            this.verifyUrl !== o && this.removeIframe(),
            this.verifyUrl = o;
            try {
                await this.createIframe()
            } catch (h) {
                this.logger.info(`Verify iframe failed to load: ${this.verifyUrl}`),
                this.logger.info(h)
            }
            if (!this.initialized) {
                this.removeIframe(),
                this.verifyUrl = mc;
                try {
                    await this.createIframe()
                } catch (h) {
                    this.logger.info(`Verify iframe failed to load: ${this.verifyUrl}`),
                    this.logger.info(h),
                    this.verifyDisabled = !0
                }
            }
        }
        ,
        this.register = async n=>{
            this.initialized ? this.sendPost(n.attestationId) : (this.addToQueue(n.attestationId),
            await this.init())
        }
        ,
        this.resolve = async n=>{
            if (this.isDevEnv)
                return "";
            const o = this.getVerifyUrl(n == null ? void 0 : n.verifyUrl);
            let h;
            try {
                h = await this.fetchAttestation(n.attestationId, o)
            } catch (p) {
                this.logger.info(`failed to resolve attestation: ${n.attestationId} from url: ${o}`),
                this.logger.info(p),
                h = await this.fetchAttestation(n.attestationId, mc)
            }
            return h
        }
        ,
        this.fetchAttestation = async(n,o)=>{
            this.logger.info(`resolving attestation: ${n} from url: ${o}`);
            const h = this.startAbortTimer(se.ONE_SECOND * 2)
              , p = await fetch(`${o}/attestation/${n}`, {
                signal: this.abortController.signal
            });
            return clearTimeout(h),
            p.status === 200 ? await p.json() : void 0
        }
        ,
        this.addToQueue = n=>{
            this.queue.push(n)
        }
        ,
        this.processQueue = ()=>{
            this.queue.length !== 0 && (this.queue.forEach(n=>this.sendPost(n)),
            this.queue = [])
        }
        ,
        this.sendPost = n=>{
            var o;
            try {
                if (!this.iframe)
                    return;
                (o = this.iframe.contentWindow) == null || o.postMessage(n, "*"),
                this.logger.info(`postMessage sent: ${n} ${this.verifyUrl}`)
            } catch {}
        }
        ,
        this.createIframe = async()=>{
            let n;
            const o = h=>{
                h.data === "verify_ready" && (this.initialized = !0,
                this.processQueue(),
                window.removeEventListener("message", o),
                n())
            }
            ;
            await Promise.race([new Promise(h=>{
                if (document.getElementById(nc))
                    return h();
                window.addEventListener("message", o);
                const p = document.createElement("iframe");
                p.id = nc,
                p.src = `${this.verifyUrl}/${this.projectId}`,
                p.style.display = "none",
                document.body.append(p),
                this.iframe = p,
                n = h
            }
            ), new Promise((h,p)=>setTimeout(()=>{
                window.removeEventListener("message", o),
                p("verify iframe load timeout")
            }
            , se.toMiliseconds(se.FIVE_SECONDS)))])
        }
        ,
        this.removeIframe = ()=>{
            this.iframe && (this.iframe.remove(),
            this.iframe = void 0,
            this.initialized = !1)
        }
        ,
        this.getVerifyUrl = n=>{
            let o = n || gs;
            return z1.includes(o) || (this.logger.info(`verify url: ${o}, not included in trusted list, assigning default: ${gs}`),
            o = gs),
            o
        }
        ,
        this.logger = Re.generateChildLogger(i, this.name),
        this.verifyUrl = gs,
        this.abortController = new AbortController,
        this.isDevEnv = $0() && U_.IS_VITEST
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    startAbortTimer(r) {
        return this.abortController = new AbortController,
        setTimeout(()=>this.abortController.abort(), se.toMiliseconds(r))
    }
}
class lE extends Qw {
    constructor(r, i) {
        super(r, i),
        this.projectId = r,
        this.logger = i,
        this.context = U1,
        this.registerDeviceToken = async n=>{
            const {clientId: o, token: h, notificationType: p, enableEncrypted: g=!1} = n
              , _ = `${H1}/${this.projectId}/clients`;
            await z_(_, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    client_id: o,
                    type: p,
                    token: h,
                    always_raw: g
                })
            })
        }
        ,
        this.logger = Re.generateChildLogger(i, this.context)
    }
}
var fE = Object.defineProperty
  , xl = Object.getOwnPropertySymbols
  , pE = Object.prototype.hasOwnProperty
  , dE = Object.prototype.propertyIsEnumerable
  , Pl = (a,r,i)=>r in a ? fE(a, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : a[r] = i
  , Sl = (a,r)=>{
    for (var i in r || (r = {}))
        pE.call(r, i) && Pl(a, i, r[i]);
    if (xl)
        for (var i of xl(r))
            dE.call(r, i) && Pl(a, i, r[i]);
    return a
}
;
class Tc extends Hw {
    constructor(r) {
        super(r),
        this.protocol = Sf,
        this.version = l1,
        this.name = Ac,
        this.events = new Or.EventEmitter,
        this.initialized = !1,
        this.on = (n,o)=>this.events.on(n, o),
        this.once = (n,o)=>this.events.once(n, o),
        this.off = (n,o)=>this.events.off(n, o),
        this.removeListener = (n,o)=>this.events.removeListener(n, o),
        this.projectId = r == null ? void 0 : r.projectId,
        this.relayUrl = (r == null ? void 0 : r.relayUrl) || Rf,
        this.customStoragePrefix = r != null && r.customStoragePrefix ? `:${r.customStoragePrefix}` : "";
        const i = typeof (r == null ? void 0 : r.logger) < "u" && typeof (r == null ? void 0 : r.logger) != "string" ? r.logger : Re.pino(Re.getDefaultLoggerOptions({
            level: (r == null ? void 0 : r.logger) || f1.logger
        }));
        this.logger = Re.generateChildLogger(i, this.name),
        this.heartbeat = new _s.HeartBeat,
        this.crypto = new K1(this,this.logger,r == null ? void 0 : r.keychain),
        this.history = new cE(this,this.logger),
        this.expirer = new uE(this,this.logger),
        this.storage = r != null && r.storage ? r.storage : new Nw(Sl(Sl({}, p1), r == null ? void 0 : r.storageOptions)),
        this.relayer = new iE({
            core: this,
            logger: this.logger,
            relayUrl: this.relayUrl,
            projectId: this.projectId
        }),
        this.pairing = new aE(this,this.logger),
        this.verify = new hE(this.projectId || "",this.logger),
        this.echoClient = new lE(this.projectId || "",this.logger)
    }
    static async init(r) {
        const i = new Tc(r);
        await i.initialize();
        const n = await i.crypto.getClientId();
        return await i.storage.setItem(C1, n),
        i
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    async start() {
        this.initialized || await this.initialize()
    }
    async initialize() {
        this.logger.trace("Initialized");
        try {
            await this.crypto.init(),
            await this.history.init(),
            await this.expirer.init(),
            await this.relayer.init(),
            await this.heartbeat.init(),
            await this.pairing.init(),
            this.initialized = !0,
            this.logger.info("Core Initialization Success")
        } catch (r) {
            throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, r),
            this.logger.error(r.message),
            r
        }
    }
}
const gE = Tc
  , Cf = "wc"
  , Af = 2
  , Tf = "client"
  , Nc = `${Cf}@${Af}:${Tf}:`
  , ac = {
    name: Tf,
    logger: "error",
    controller: !1,
    relayUrl: "wss://relay.walletconnect.com"
}
  , Ol = "WALLETCONNECT_DEEPLINK_CHOICE"
  , yE = "proposal"
  , Nf = "Proposal expired"
  , vE = "session"
  , uo = se.SEVEN_DAYS
  , mE = "engine"
  , Bs = {
    wc_sessionPropose: {
        req: {
            ttl: se.FIVE_MINUTES,
            prompt: !0,
            tag: 1100
        },
        res: {
            ttl: se.FIVE_MINUTES,
            prompt: !1,
            tag: 1101
        }
    },
    wc_sessionSettle: {
        req: {
            ttl: se.FIVE_MINUTES,
            prompt: !1,
            tag: 1102
        },
        res: {
            ttl: se.FIVE_MINUTES,
            prompt: !1,
            tag: 1103
        }
    },
    wc_sessionUpdate: {
        req: {
            ttl: se.ONE_DAY,
            prompt: !1,
            tag: 1104
        },
        res: {
            ttl: se.ONE_DAY,
            prompt: !1,
            tag: 1105
        }
    },
    wc_sessionExtend: {
        req: {
            ttl: se.ONE_DAY,
            prompt: !1,
            tag: 1106
        },
        res: {
            ttl: se.ONE_DAY,
            prompt: !1,
            tag: 1107
        }
    },
    wc_sessionRequest: {
        req: {
            ttl: se.FIVE_MINUTES,
            prompt: !0,
            tag: 1108
        },
        res: {
            ttl: se.FIVE_MINUTES,
            prompt: !1,
            tag: 1109
        }
    },
    wc_sessionEvent: {
        req: {
            ttl: se.FIVE_MINUTES,
            prompt: !0,
            tag: 1110
        },
        res: {
            ttl: se.FIVE_MINUTES,
            prompt: !1,
            tag: 1111
        }
    },
    wc_sessionDelete: {
        req: {
            ttl: se.ONE_DAY,
            prompt: !1,
            tag: 1112
        },
        res: {
            ttl: se.ONE_DAY,
            prompt: !1,
            tag: 1113
        }
    },
    wc_sessionPing: {
        req: {
            ttl: se.THIRTY_SECONDS,
            prompt: !1,
            tag: 1114
        },
        res: {
            ttl: se.THIRTY_SECONDS,
            prompt: !1,
            tag: 1115
        }
    }
}
  , cc = {
    min: se.FIVE_MINUTES,
    max: se.SEVEN_DAYS
}
  , ai = {
    idle: "IDLE",
    active: "ACTIVE"
}
  , wE = "request"
  , _E = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest"];
var bE = Object.defineProperty
  , EE = Object.defineProperties
  , IE = Object.getOwnPropertyDescriptors
  , Rl = Object.getOwnPropertySymbols
  , xE = Object.prototype.hasOwnProperty
  , PE = Object.prototype.propertyIsEnumerable
  , Cl = (a,r,i)=>r in a ? bE(a, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : a[r] = i
  , cr = (a,r)=>{
    for (var i in r || (r = {}))
        xE.call(r, i) && Cl(a, i, r[i]);
    if (Rl)
        for (var i of Rl(r))
            PE.call(r, i) && Cl(a, i, r[i]);
    return a
}
  , Fs = (a,r)=>EE(a, IE(r));
class SE extends Xw {
    constructor(r) {
        super(r),
        this.name = mE,
        this.events = new Pc,
        this.initialized = !1,
        this.ignoredPayloadTypes = [Vl],
        this.requestQueue = {
            state: ai.idle,
            queue: []
        },
        this.sessionRequestQueue = {
            state: ai.idle,
            queue: []
        },
        this.requestQueueDelay = se.ONE_SECOND,
        this.init = async()=>{
            this.initialized || (await this.cleanup(),
            this.registerRelayerEvents(),
            this.registerExpirerEvents(),
            this.registerPairingEvents(),
            this.client.core.pairing.register({
                methods: Object.keys(Bs)
            }),
            this.initialized = !0,
            setTimeout(()=>{
                this.sessionRequestQueue.queue = this.getPendingSessionRequests(),
                this.processSessionRequestQueue()
            }
            , se.toMiliseconds(this.requestQueueDelay)))
        }
        ,
        this.connect = async i=>{
            await this.isInitialized();
            const n = Fs(cr({}, i), {
                requiredNamespaces: i.requiredNamespaces || {},
                optionalNamespaces: i.optionalNamespaces || {}
            });
            await this.isValidConnect(n);
            const {pairingTopic: o, requiredNamespaces: h, optionalNamespaces: p, sessionProperties: g, relays: _} = n;
            let v = o, I, R = !1;
            if (v && (R = this.client.core.pairing.pairings.get(v).active),
            !v || !R) {
                const {topic: fe, uri: pe} = await this.client.core.pairing.create();
                v = fe,
                I = pe
            }
            const A = await this.client.core.crypto.generateKeyPair()
              , z = cr({
                requiredNamespaces: h,
                optionalNamespaces: p,
                relays: _ ?? [{
                    protocol: Of
                }],
                proposer: {
                    publicKey: A,
                    metadata: this.client.metadata
                }
            }, g && {
                sessionProperties: g
            })
              , {reject: T, resolve: F, done: re} = ps(se.FIVE_MINUTES, Nf);
            if (this.events.once(Dt("session_connect"), async({error: fe, session: pe})=>{
                if (fe)
                    T(fe);
                else if (pe) {
                    pe.self.publicKey = A;
                    const de = Fs(cr({}, pe), {
                        requiredNamespaces: pe.requiredNamespaces,
                        optionalNamespaces: pe.optionalNamespaces
                    });
                    await this.client.session.set(pe.topic, de),
                    await this.setExpiry(pe.topic, pe.expiry),
                    v && await this.client.core.pairing.updateMetadata({
                        topic: v,
                        metadata: pe.peer.metadata
                    }),
                    F(de)
                }
            }
            ),
            !v) {
                const {message: fe} = Y("NO_MATCHING_KEY", `connect() pairing topic: ${v}`);
                throw new Error(fe)
            }
            const he = await this.sendRequest({
                topic: v,
                method: "wc_sessionPropose",
                params: z
            })
              , le = Lr(se.FIVE_MINUTES);
            return await this.setProposal(he, cr({
                id: he,
                expiry: le
            }, z)),
            {
                uri: I,
                approval: re
            }
        }
        ,
        this.pair = async i=>(await this.isInitialized(),
        await this.client.core.pairing.pair(i)),
        this.approve = async i=>{
            await this.isInitialized(),
            await this.isValidApprove(i);
            const {id: n, relayProtocol: o, namespaces: h, sessionProperties: p} = i
              , g = this.client.proposal.get(n);
            let {pairingTopic: _, proposer: v, requiredNamespaces: I, optionalNamespaces: R} = g;
            _ = _ || "",
            po(I) || (I = q0(h, "approve()"));
            const A = await this.client.core.crypto.generateKeyPair()
              , z = v.publicKey
              , T = await this.client.core.crypto.generateSharedKey(A, z);
            _ && n && (await this.client.core.pairing.updateMetadata({
                topic: _,
                metadata: v.metadata
            }),
            await this.sendResult({
                id: n,
                topic: _,
                result: {
                    relay: {
                        protocol: o ?? "irn"
                    },
                    responderPublicKey: A
                }
            }),
            await this.client.proposal.delete(n, Gt("USER_DISCONNECTED")),
            await this.client.core.pairing.activate({
                topic: _
            }));
            const F = cr({
                relay: {
                    protocol: o ?? "irn"
                },
                namespaces: h,
                requiredNamespaces: I,
                optionalNamespaces: R,
                pairingTopic: _,
                controller: {
                    publicKey: A,
                    metadata: this.client.metadata
                },
                expiry: Lr(uo)
            }, p && {
                sessionProperties: p
            });
            await this.client.core.relayer.subscribe(T),
            await this.sendRequest({
                topic: T,
                method: "wc_sessionSettle",
                params: F,
                throwOnFailedPublish: !0
            });
            const re = Fs(cr({}, F), {
                topic: T,
                pairingTopic: _,
                acknowledged: !1,
                self: F.controller,
                peer: {
                    publicKey: v.publicKey,
                    metadata: v.metadata
                },
                controller: A
            });
            return await this.client.session.set(T, re),
            await this.setExpiry(T, Lr(uo)),
            {
                topic: T,
                acknowledged: ()=>new Promise(he=>setTimeout(()=>he(this.client.session.get(T)), 500))
            }
        }
        ,
        this.reject = async i=>{
            await this.isInitialized(),
            await this.isValidReject(i);
            const {id: n, reason: o} = i
              , {pairingTopic: h} = this.client.proposal.get(n);
            h && (await this.sendError(n, h, o),
            await this.client.proposal.delete(n, Gt("USER_DISCONNECTED")))
        }
        ,
        this.update = async i=>{
            await this.isInitialized(),
            await this.isValidUpdate(i);
            const {topic: n, namespaces: o} = i
              , h = await this.sendRequest({
                topic: n,
                method: "wc_sessionUpdate",
                params: {
                    namespaces: o
                }
            })
              , {done: p, resolve: g, reject: _} = ps();
            return this.events.once(Dt("session_update", h), ({error: v})=>{
                v ? _(v) : g()
            }
            ),
            await this.client.session.update(n, {
                namespaces: o
            }),
            {
                acknowledged: p
            }
        }
        ,
        this.extend = async i=>{
            await this.isInitialized(),
            await this.isValidExtend(i);
            const {topic: n} = i
              , o = await this.sendRequest({
                topic: n,
                method: "wc_sessionExtend",
                params: {}
            })
              , {done: h, resolve: p, reject: g} = ps();
            return this.events.once(Dt("session_extend", o), ({error: _})=>{
                _ ? g(_) : p()
            }
            ),
            await this.setExpiry(n, Lr(uo)),
            {
                acknowledged: h
            }
        }
        ,
        this.request = async i=>{
            await this.isInitialized(),
            await this.isValidRequest(i);
            const {chainId: n, request: o, topic: h, expiry: p} = i
              , g = Rc()
              , {done: _, resolve: v, reject: I} = ps(p, "Request expired. Please try again.");
            return this.events.once(Dt("session_request", g), ({error: R, result: A})=>{
                R ? I(R) : v(A)
            }
            ),
            await Promise.all([new Promise(async R=>{
                await this.sendRequest({
                    clientRpcId: g,
                    topic: h,
                    method: "wc_sessionRequest",
                    params: {
                        request: o,
                        chainId: n
                    },
                    expiry: p,
                    throwOnFailedPublish: !0
                }).catch(A=>I(A)),
                this.client.events.emit("session_request_sent", {
                    topic: h,
                    request: o,
                    chainId: n,
                    id: g
                }),
                R()
            }
            ), new Promise(async R=>{
                const A = await M0(this.client.core.storage, Ol);
                j0({
                    id: g,
                    topic: h,
                    wcDeepLink: A
                }),
                R()
            }
            ), _()]).then(R=>R[2])
        }
        ,
        this.respond = async i=>{
            await this.isInitialized(),
            await this.isValidRespond(i);
            const {topic: n, response: o} = i
              , {id: h} = o;
            ci(o) ? await this.sendResult({
                id: h,
                topic: n,
                result: o.result,
                throwOnFailedPublish: !0
            }) : qr(o) && await this.sendError(h, n, o.error),
            this.cleanupAfterResponse(i)
        }
        ,
        this.ping = async i=>{
            await this.isInitialized(),
            await this.isValidPing(i);
            const {topic: n} = i;
            if (this.client.session.keys.includes(n)) {
                const o = await this.sendRequest({
                    topic: n,
                    method: "wc_sessionPing",
                    params: {}
                })
                  , {done: h, resolve: p, reject: g} = ps();
                this.events.once(Dt("session_ping", o), ({error: _})=>{
                    _ ? g(_) : p()
                }
                ),
                await h()
            } else
                this.client.core.pairing.pairings.keys.includes(n) && await this.client.core.pairing.ping({
                    topic: n
                })
        }
        ,
        this.emit = async i=>{
            await this.isInitialized(),
            await this.isValidEmit(i);
            const {topic: n, event: o, chainId: h} = i;
            await this.sendRequest({
                topic: n,
                method: "wc_sessionEvent",
                params: {
                    event: o,
                    chainId: h
                }
            })
        }
        ,
        this.disconnect = async i=>{
            await this.isInitialized(),
            await this.isValidDisconnect(i);
            const {topic: n} = i;
            this.client.session.keys.includes(n) ? (await this.sendRequest({
                topic: n,
                method: "wc_sessionDelete",
                params: Gt("USER_DISCONNECTED"),
                throwOnFailedPublish: !0
            }),
            await this.deleteSession(n)) : await this.client.core.pairing.disconnect({
                topic: n
            })
        }
        ,
        this.find = i=>(this.isInitialized(),
        this.client.session.getAll().filter(n=>z0(n, i))),
        this.getPendingSessionRequests = ()=>(this.isInitialized(),
        this.client.pendingRequest.getAll()),
        this.cleanupDuplicatePairings = async i=>{
            if (i.pairingTopic)
                try {
                    const n = this.client.core.pairing.pairings.get(i.pairingTopic)
                      , o = this.client.core.pairing.pairings.getAll().filter(h=>{
                        var p, g;
                        return ((p = h.peerMetadata) == null ? void 0 : p.url) && ((g = h.peerMetadata) == null ? void 0 : g.url) === i.peer.metadata.url && h.topic && h.topic !== n.topic
                    }
                    );
                    if (o.length === 0)
                        return;
                    this.client.logger.info(`Cleaning up ${o.length} duplicate pairing(s)`),
                    await Promise.all(o.map(h=>this.client.core.pairing.disconnect({
                        topic: h.topic
                    }))),
                    this.client.logger.info("Duplicate pairings clean up finished")
                } catch (n) {
                    this.client.logger.error(n)
                }
        }
        ,
        this.deleteSession = async(i,n)=>{
            const {self: o} = this.client.session.get(i);
            await this.client.core.relayer.unsubscribe(i),
            this.client.session.delete(i, Gt("USER_DISCONNECTED")),
            this.client.core.crypto.keychain.has(o.publicKey) && await this.client.core.crypto.deleteKeyPair(o.publicKey),
            this.client.core.crypto.keychain.has(i) && await this.client.core.crypto.deleteSymKey(i),
            n || this.client.core.expirer.del(i),
            this.client.core.storage.removeItem(Ol).catch(h=>this.client.logger.warn(h)),
            this.getPendingSessionRequests().forEach(h=>{
                h.topic === i && this.deletePendingSessionRequest(h.id, Gt("USER_DISCONNECTED"))
            }
            )
        }
        ,
        this.deleteProposal = async(i,n)=>{
            await Promise.all([this.client.proposal.delete(i, Gt("USER_DISCONNECTED")), n ? Promise.resolve() : this.client.core.expirer.del(i)])
        }
        ,
        this.deletePendingSessionRequest = async(i,n,o=!1)=>{
            await Promise.all([this.client.pendingRequest.delete(i, n), o ? Promise.resolve() : this.client.core.expirer.del(i)]),
            this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter(h=>h.id !== i),
            o && (this.sessionRequestQueue.state = ai.idle)
        }
        ,
        this.setExpiry = async(i,n)=>{
            this.client.session.keys.includes(i) && await this.client.session.update(i, {
                expiry: n
            }),
            this.client.core.expirer.set(i, n)
        }
        ,
        this.setProposal = async(i,n)=>{
            await this.client.proposal.set(i, n),
            this.client.core.expirer.set(i, n.expiry)
        }
        ,
        this.setPendingSessionRequest = async i=>{
            const n = Bs.wc_sessionRequest.req.ttl
              , {id: o, topic: h, params: p, verifyContext: g} = i;
            await this.client.pendingRequest.set(o, {
                id: o,
                topic: h,
                params: p,
                verifyContext: g
            }),
            n && this.client.core.expirer.set(o, Lr(n))
        }
        ,
        this.sendRequest = async i=>{
            const {topic: n, method: o, params: h, expiry: p, relayRpcId: g, clientRpcId: _, throwOnFailedPublish: v} = i
              , I = vs(o, h, _);
            if (Wl() && _E.includes(o)) {
                const z = ys(JSON.stringify(I));
                this.client.core.verify.register({
                    attestationId: z
                })
            }
            const R = await this.client.core.crypto.encode(n, I)
              , A = Bs[o].req;
            return p && (A.ttl = p),
            g && (A.id = g),
            this.client.core.history.set(n, I),
            v ? (A.internal = Fs(cr({}, A.internal), {
                throwOnFailedPublish: !0
            }),
            await this.client.core.relayer.publish(n, R, A)) : this.client.core.relayer.publish(n, R, A).catch(z=>this.client.logger.error(z)),
            I.id
        }
        ,
        this.sendResult = async i=>{
            const {id: n, topic: o, result: h, throwOnFailedPublish: p} = i
              , g = bo(n, h)
              , _ = await this.client.core.crypto.encode(o, g)
              , v = await this.client.core.history.get(o, n)
              , I = Bs[v.request.method].res;
            p ? (I.internal = Fs(cr({}, I.internal), {
                throwOnFailedPublish: !0
            }),
            await this.client.core.relayer.publish(o, _, I)) : this.client.core.relayer.publish(o, _, I).catch(R=>this.client.logger.error(R)),
            await this.client.core.history.resolve(g)
        }
        ,
        this.sendError = async(i,n,o)=>{
            const h = Eo(i, o)
              , p = await this.client.core.crypto.encode(n, h)
              , g = await this.client.core.history.get(n, i)
              , _ = Bs[g.request.method].res;
            this.client.core.relayer.publish(n, p, _),
            await this.client.core.history.resolve(h)
        }
        ,
        this.cleanup = async()=>{
            const i = []
              , n = [];
            this.client.session.getAll().forEach(o=>{
                Ei(o.expiry) && i.push(o.topic)
            }
            ),
            this.client.proposal.getAll().forEach(o=>{
                Ei(o.expiry) && n.push(o.id)
            }
            ),
            await Promise.all([...i.map(o=>this.deleteSession(o)), ...n.map(o=>this.deleteProposal(o))])
        }
        ,
        this.onRelayEventRequest = async i=>{
            this.requestQueue.queue.push(i),
            await this.processRequestsQueue()
        }
        ,
        this.processRequestsQueue = async()=>{
            if (this.requestQueue.state === ai.active) {
                this.client.logger.info("Request queue already active, skipping...");
                return
            }
            for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
                this.requestQueue.state = ai.active;
                const i = this.requestQueue.queue.shift();
                if (i)
                    try {
                        this.processRequest(i),
                        await new Promise(n=>setTimeout(n, 300))
                    } catch (n) {
                        this.client.logger.warn(n)
                    }
            }
            this.requestQueue.state = ai.idle
        }
        ,
        this.processRequest = i=>{
            const {topic: n, payload: o} = i
              , h = o.method;
            switch (h) {
            case "wc_sessionPropose":
                return this.onSessionProposeRequest(n, o);
            case "wc_sessionSettle":
                return this.onSessionSettleRequest(n, o);
            case "wc_sessionUpdate":
                return this.onSessionUpdateRequest(n, o);
            case "wc_sessionExtend":
                return this.onSessionExtendRequest(n, o);
            case "wc_sessionPing":
                return this.onSessionPingRequest(n, o);
            case "wc_sessionDelete":
                return this.onSessionDeleteRequest(n, o);
            case "wc_sessionRequest":
                return this.onSessionRequest(n, o);
            case "wc_sessionEvent":
                return this.onSessionEventRequest(n, o);
            default:
                return this.client.logger.info(`Unsupported request method ${h}`)
            }
        }
        ,
        this.onRelayEventResponse = async i=>{
            const {topic: n, payload: o} = i
              , h = (await this.client.core.history.get(n, o.id)).request.method;
            switch (h) {
            case "wc_sessionPropose":
                return this.onSessionProposeResponse(n, o);
            case "wc_sessionSettle":
                return this.onSessionSettleResponse(n, o);
            case "wc_sessionUpdate":
                return this.onSessionUpdateResponse(n, o);
            case "wc_sessionExtend":
                return this.onSessionExtendResponse(n, o);
            case "wc_sessionPing":
                return this.onSessionPingResponse(n, o);
            case "wc_sessionRequest":
                return this.onSessionRequestResponse(n, o);
            default:
                return this.client.logger.info(`Unsupported response method ${h}`)
            }
        }
        ,
        this.onRelayEventUnknownPayload = i=>{
            const {topic: n} = i
              , {message: o} = Y("MISSING_OR_INVALID", `Decoded payload on topic ${n} is not identifiable as a JSON-RPC request or a response.`);
            throw new Error(o)
        }
        ,
        this.onSessionProposeRequest = async(i,n)=>{
            const {params: o, id: h} = n;
            try {
                this.isValidConnect(cr({}, n.params));
                const p = Lr(se.FIVE_MINUTES)
                  , g = cr({
                    id: h,
                    pairingTopic: i,
                    expiry: p
                }, o);
                await this.setProposal(h, g);
                const _ = ys(JSON.stringify(n))
                  , v = await this.getVerifyContext(_, g.proposer.metadata);
                this.client.events.emit("session_proposal", {
                    id: h,
                    params: g,
                    verifyContext: v
                })
            } catch (p) {
                await this.sendError(h, i, p),
                this.client.logger.error(p)
            }
        }
        ,
        this.onSessionProposeResponse = async(i,n)=>{
            const {id: o} = n;
            if (ci(n)) {
                const {result: h} = n;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    result: h
                });
                const p = this.client.proposal.get(o);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    proposal: p
                });
                const g = p.proposer.publicKey;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    selfPublicKey: g
                });
                const _ = h.responderPublicKey;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    peerPublicKey: _
                });
                const v = await this.client.core.crypto.generateSharedKey(g, _);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    sessionTopic: v
                });
                const I = await this.client.core.relayer.subscribe(v);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    subscriptionId: I
                }),
                await this.client.core.pairing.activate({
                    topic: i
                })
            } else
                qr(n) && (await this.client.proposal.delete(o, Gt("USER_DISCONNECTED")),
                this.events.emit(Dt("session_connect"), {
                    error: n.error
                }))
        }
        ,
        this.onSessionSettleRequest = async(i,n)=>{
            const {id: o, params: h} = n;
            try {
                this.isValidSessionSettleRequest(h);
                const {relay: p, controller: g, expiry: _, namespaces: v, requiredNamespaces: I, optionalNamespaces: R, sessionProperties: A, pairingTopic: z} = n.params
                  , T = cr({
                    topic: i,
                    relay: p,
                    expiry: _,
                    namespaces: v,
                    acknowledged: !0,
                    pairingTopic: z,
                    requiredNamespaces: I,
                    optionalNamespaces: R,
                    controller: g.publicKey,
                    self: {
                        publicKey: "",
                        metadata: this.client.metadata
                    },
                    peer: {
                        publicKey: g.publicKey,
                        metadata: g.metadata
                    }
                }, A && {
                    sessionProperties: A
                });
                await this.sendResult({
                    id: n.id,
                    topic: i,
                    result: !0
                }),
                this.events.emit(Dt("session_connect"), {
                    session: T
                }),
                this.cleanupDuplicatePairings(T)
            } catch (p) {
                await this.sendError(o, i, p),
                this.client.logger.error(p)
            }
        }
        ,
        this.onSessionSettleResponse = async(i,n)=>{
            const {id: o} = n;
            ci(n) ? (await this.client.session.update(i, {
                acknowledged: !0
            }),
            this.events.emit(Dt("session_approve", o), {})) : qr(n) && (await this.client.session.delete(i, Gt("USER_DISCONNECTED")),
            this.events.emit(Dt("session_approve", o), {
                error: n.error
            }))
        }
        ,
        this.onSessionUpdateRequest = async(i,n)=>{
            const {params: o, id: h} = n;
            try {
                const p = `${i}_session_update`
                  , g = oo.get(p);
                if (g && this.isRequestOutOfSync(g, h)) {
                    this.client.logger.info(`Discarding out of sync request - ${h}`);
                    return
                }
                this.isValidUpdate(cr({
                    topic: i
                }, o)),
                await this.client.session.update(i, {
                    namespaces: o.namespaces
                }),
                await this.sendResult({
                    id: h,
                    topic: i,
                    result: !0
                }),
                this.client.events.emit("session_update", {
                    id: h,
                    topic: i,
                    params: o
                }),
                oo.set(p, h)
            } catch (p) {
                await this.sendError(h, i, p),
                this.client.logger.error(p)
            }
        }
        ,
        this.isRequestOutOfSync = (i,n)=>parseInt(n.toString().slice(0, -3)) <= parseInt(i.toString().slice(0, -3)),
        this.onSessionUpdateResponse = (i,n)=>{
            const {id: o} = n;
            ci(n) ? this.events.emit(Dt("session_update", o), {}) : qr(n) && this.events.emit(Dt("session_update", o), {
                error: n.error
            })
        }
        ,
        this.onSessionExtendRequest = async(i,n)=>{
            const {id: o} = n;
            try {
                this.isValidExtend({
                    topic: i
                }),
                await this.setExpiry(i, Lr(uo)),
                await this.sendResult({
                    id: o,
                    topic: i,
                    result: !0
                }),
                this.client.events.emit("session_extend", {
                    id: o,
                    topic: i
                })
            } catch (h) {
                await this.sendError(o, i, h),
                this.client.logger.error(h)
            }
        }
        ,
        this.onSessionExtendResponse = (i,n)=>{
            const {id: o} = n;
            ci(n) ? this.events.emit(Dt("session_extend", o), {}) : qr(n) && this.events.emit(Dt("session_extend", o), {
                error: n.error
            })
        }
        ,
        this.onSessionPingRequest = async(i,n)=>{
            const {id: o} = n;
            try {
                this.isValidPing({
                    topic: i
                }),
                await this.sendResult({
                    id: o,
                    topic: i,
                    result: !0
                }),
                this.client.events.emit("session_ping", {
                    id: o,
                    topic: i
                })
            } catch (h) {
                await this.sendError(o, i, h),
                this.client.logger.error(h)
            }
        }
        ,
        this.onSessionPingResponse = (i,n)=>{
            const {id: o} = n;
            setTimeout(()=>{
                ci(n) ? this.events.emit(Dt("session_ping", o), {}) : qr(n) && this.events.emit(Dt("session_ping", o), {
                    error: n.error
                })
            }
            , 500)
        }
        ,
        this.onSessionDeleteRequest = async(i,n)=>{
            const {id: o} = n;
            try {
                this.isValidDisconnect({
                    topic: i,
                    reason: n.params
                }),
                await Promise.all([new Promise(h=>{
                    this.client.core.relayer.once(Wt.publish, async()=>{
                        h(await this.deleteSession(i))
                    }
                    )
                }
                ), this.sendResult({
                    id: o,
                    topic: i,
                    result: !0
                })]),
                this.client.events.emit("session_delete", {
                    id: o,
                    topic: i
                })
            } catch (h) {
                this.client.logger.error(h)
            }
        }
        ,
        this.onSessionRequest = async(i,n)=>{
            const {id: o, params: h} = n;
            try {
                this.isValidRequest(cr({
                    topic: i
                }, h));
                const p = ys(JSON.stringify(vs("wc_sessionRequest", h, o)))
                  , g = this.client.session.get(i)
                  , _ = await this.getVerifyContext(p, g.peer.metadata)
                  , v = {
                    id: o,
                    topic: i,
                    params: h,
                    verifyContext: _
                };
                await this.setPendingSessionRequest(v),
                this.addSessionRequestToSessionRequestQueue(v),
                this.processSessionRequestQueue()
            } catch (p) {
                await this.sendError(o, i, p),
                this.client.logger.error(p)
            }
        }
        ,
        this.onSessionRequestResponse = (i,n)=>{
            const {id: o} = n;
            ci(n) ? this.events.emit(Dt("session_request", o), {
                result: n.result
            }) : qr(n) && this.events.emit(Dt("session_request", o), {
                error: n.error
            })
        }
        ,
        this.onSessionEventRequest = async(i,n)=>{
            const {id: o, params: h} = n;
            try {
                const p = `${i}_session_event_${h.event.name}`
                  , g = oo.get(p);
                if (g && this.isRequestOutOfSync(g, o)) {
                    this.client.logger.info(`Discarding out of sync request - ${o}`);
                    return
                }
                this.isValidEmit(cr({
                    topic: i
                }, h)),
                this.client.events.emit("session_event", {
                    id: o,
                    topic: i,
                    params: h
                }),
                oo.set(p, o)
            } catch (p) {
                await this.sendError(o, i, p),
                this.client.logger.error(p)
            }
        }
        ,
        this.addSessionRequestToSessionRequestQueue = i=>{
            this.sessionRequestQueue.queue.push(i)
        }
        ,
        this.cleanupAfterResponse = i=>{
            this.deletePendingSessionRequest(i.response.id, {
                message: "fulfilled",
                code: 0
            }),
            setTimeout(()=>{
                this.sessionRequestQueue.state = ai.idle,
                this.processSessionRequestQueue()
            }
            , se.toMiliseconds(this.requestQueueDelay))
        }
        ,
        this.processSessionRequestQueue = ()=>{
            if (this.sessionRequestQueue.state === ai.active) {
                this.client.logger.info("session request queue is already active.");
                return
            }
            const i = this.sessionRequestQueue.queue[0];
            if (!i) {
                this.client.logger.info("session request queue is empty.");
                return
            }
            try {
                this.sessionRequestQueue.state = ai.active,
                this.client.events.emit("session_request", i)
            } catch (n) {
                this.client.logger.error(n)
            }
        }
        ,
        this.onPairingCreated = i=>{
            if (i.active)
                return;
            const n = this.client.proposal.getAll().find(o=>o.pairingTopic === i.topic);
            n && this.onSessionProposeRequest(i.topic, vs("wc_sessionPropose", {
                requiredNamespaces: n.requiredNamespaces,
                optionalNamespaces: n.optionalNamespaces,
                relays: n.relays,
                proposer: n.proposer,
                sessionProperties: n.sessionProperties
            }, n.id))
        }
        ,
        this.isValidConnect = async i=>{
            if (!hr(i)) {
                const {message: _} = Y("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(i)}`);
                throw new Error(_)
            }
            const {pairingTopic: n, requiredNamespaces: o, optionalNamespaces: h, sessionProperties: p, relays: g} = i;
            if (Ii(n) || await this.isValidPairingTopic(n),
            !U0(g, !0)) {
                const {message: _} = Y("MISSING_OR_INVALID", `connect() relays: ${g}`);
                throw new Error(_)
            }
            !Ii(o) && po(o) !== 0 && this.validateNamespaces(o, "requiredNamespaces"),
            !Ii(h) && po(h) !== 0 && this.validateNamespaces(h, "optionalNamespaces"),
            Ii(p) || this.validateSessionProps(p, "sessionProperties")
        }
        ,
        this.validateNamespaces = (i,n)=>{
            const o = H0(i, "connect()", n);
            if (o)
                throw new Error(o.message)
        }
        ,
        this.isValidApprove = async i=>{
            if (!hr(i))
                throw new Error(Y("MISSING_OR_INVALID", `approve() params: ${i}`).message);
            const {id: n, namespaces: o, relayProtocol: h, sessionProperties: p} = i;
            await this.isValidProposalId(n);
            const g = this.client.proposal.get(n)
              , _ = Qa(o, "approve()");
            if (_)
                throw new Error(_.message);
            const v = jh(g.requiredNamespaces, o, "approve()");
            if (v)
                throw new Error(v.message);
            if (!ds(h, !0)) {
                const {message: I} = Y("MISSING_OR_INVALID", `approve() relayProtocol: ${h}`);
                throw new Error(I)
            }
            Ii(p) || this.validateSessionProps(p, "sessionProperties")
        }
        ,
        this.isValidReject = async i=>{
            if (!hr(i)) {
                const {message: h} = Y("MISSING_OR_INVALID", `reject() params: ${i}`);
                throw new Error(h)
            }
            const {id: n, reason: o} = i;
            if (await this.isValidProposalId(n),
            !k0(o)) {
                const {message: h} = Y("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(o)}`);
                throw new Error(h)
            }
        }
        ,
        this.isValidSessionSettleRequest = i=>{
            if (!hr(i)) {
                const {message: v} = Y("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${i}`);
                throw new Error(v)
            }
            const {relay: n, controller: o, namespaces: h, expiry: p} = i;
            if (!K0(n)) {
                const {message: v} = Y("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
                throw new Error(v)
            }
            const g = B0(o, "onSessionSettleRequest()");
            if (g)
                throw new Error(g.message);
            const _ = Qa(h, "onSessionSettleRequest()");
            if (_)
                throw new Error(_.message);
            if (Ei(p)) {
                const {message: v} = Y("EXPIRED", "onSessionSettleRequest()");
                throw new Error(v)
            }
        }
        ,
        this.isValidUpdate = async i=>{
            if (!hr(i)) {
                const {message: _} = Y("MISSING_OR_INVALID", `update() params: ${i}`);
                throw new Error(_)
            }
            const {topic: n, namespaces: o} = i;
            await this.isValidSessionTopic(n);
            const h = this.client.session.get(n)
              , p = Qa(o, "update()");
            if (p)
                throw new Error(p.message);
            const g = jh(h.requiredNamespaces, o, "update()");
            if (g)
                throw new Error(g.message)
        }
        ,
        this.isValidExtend = async i=>{
            if (!hr(i)) {
                const {message: o} = Y("MISSING_OR_INVALID", `extend() params: ${i}`);
                throw new Error(o)
            }
            const {topic: n} = i;
            await this.isValidSessionTopic(n)
        }
        ,
        this.isValidRequest = async i=>{
            if (!hr(i)) {
                const {message: _} = Y("MISSING_OR_INVALID", `request() params: ${i}`);
                throw new Error(_)
            }
            const {topic: n, request: o, chainId: h, expiry: p} = i;
            await this.isValidSessionTopic(n);
            const {namespaces: g} = this.client.session.get(n);
            if (!zh(g, h)) {
                const {message: _} = Y("MISSING_OR_INVALID", `request() chainId: ${h}`);
                throw new Error(_)
            }
            if (!F0(o)) {
                const {message: _} = Y("MISSING_OR_INVALID", `request() ${JSON.stringify(o)}`);
                throw new Error(_)
            }
            if (!V0(g, h, o.method)) {
                const {message: _} = Y("MISSING_OR_INVALID", `request() method: ${o.method}`);
                throw new Error(_)
            }
            if (p && !G0(p, cc)) {
                const {message: _} = Y("MISSING_OR_INVALID", `request() expiry: ${p}. Expiry must be a number (in seconds) between ${cc.min} and ${cc.max}`);
                throw new Error(_)
            }
        }
        ,
        this.isValidRespond = async i=>{
            var n;
            if (!hr(i)) {
                const {message: p} = Y("MISSING_OR_INVALID", `respond() params: ${i}`);
                throw new Error(p)
            }
            const {topic: o, response: h} = i;
            try {
                await this.isValidSessionTopic(o)
            } catch (p) {
                throw (n = i == null ? void 0 : i.response) != null && n.id && this.cleanupAfterResponse(i),
                p
            }
            if (!W0(h)) {
                const {message: p} = Y("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(h)}`);
                throw new Error(p)
            }
        }
        ,
        this.isValidPing = async i=>{
            if (!hr(i)) {
                const {message: o} = Y("MISSING_OR_INVALID", `ping() params: ${i}`);
                throw new Error(o)
            }
            const {topic: n} = i;
            await this.isValidSessionOrPairingTopic(n)
        }
        ,
        this.isValidEmit = async i=>{
            if (!hr(i)) {
                const {message: g} = Y("MISSING_OR_INVALID", `emit() params: ${i}`);
                throw new Error(g)
            }
            const {topic: n, event: o, chainId: h} = i;
            await this.isValidSessionTopic(n);
            const {namespaces: p} = this.client.session.get(n);
            if (!zh(p, h)) {
                const {message: g} = Y("MISSING_OR_INVALID", `emit() chainId: ${h}`);
                throw new Error(g)
            }
            if (!J0(o)) {
                const {message: g} = Y("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(o)}`);
                throw new Error(g)
            }
            if (!Q0(p, h, o.name)) {
                const {message: g} = Y("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(o)}`);
                throw new Error(g)
            }
        }
        ,
        this.isValidDisconnect = async i=>{
            if (!hr(i)) {
                const {message: o} = Y("MISSING_OR_INVALID", `disconnect() params: ${i}`);
                throw new Error(o)
            }
            const {topic: n} = i;
            await this.isValidSessionOrPairingTopic(n)
        }
        ,
        this.getVerifyContext = async(i,n)=>{
            const o = {
                verified: {
                    verifyUrl: n.verifyUrl || gs,
                    validation: "UNKNOWN",
                    origin: n.url || ""
                }
            };
            try {
                const h = await this.client.core.verify.resolve({
                    attestationId: i,
                    verifyUrl: n.verifyUrl
                });
                h && (o.verified.origin = h.origin,
                o.verified.isScam = h.isScam,
                o.verified.validation = h.origin === new URL(n.url).origin ? "VALID" : "INVALID")
            } catch (h) {
                this.client.logger.info(h)
            }
            return this.client.logger.info(`Verify context: ${JSON.stringify(o)}`),
            o
        }
        ,
        this.validateSessionProps = (i,n)=>{
            Object.values(i).forEach(o=>{
                if (!ds(o, !1)) {
                    const {message: h} = Y("MISSING_OR_INVALID", `${n} must be in Record<string, string> format. Received: ${JSON.stringify(o)}`);
                    throw new Error(h)
                }
            }
            )
        }
    }
    async isInitialized() {
        if (!this.initialized) {
            const {message: r} = Y("NOT_INITIALIZED", this.name);
            throw new Error(r)
        }
        await this.client.core.relayer.confirmOnlineStateOrThrow()
    }
    registerRelayerEvents() {
        this.client.core.relayer.on(Wt.message, async r=>{
            const {topic: i, message: n} = r;
            if (this.ignoredPayloadTypes.includes(this.client.core.crypto.getPayloadType(n)))
                return;
            const o = await this.client.core.crypto.decode(i, n);
            try {
                Cc(o) ? (this.client.core.history.set(i, o),
                this.onRelayEventRequest({
                    topic: i,
                    payload: o
                })) : Io(o) ? (await this.client.core.history.resolve(o),
                await this.onRelayEventResponse({
                    topic: i,
                    payload: o
                }),
                this.client.core.history.delete(i, o.id)) : this.onRelayEventUnknownPayload({
                    topic: i,
                    payload: o
                })
            } catch (h) {
                this.client.logger.error(h)
            }
        }
        )
    }
    registerExpirerEvents() {
        this.client.core.expirer.on(Sr.expired, async r=>{
            const {topic: i, id: n} = Gl(r.target);
            if (n && this.client.pendingRequest.keys.includes(n))
                return await this.deletePendingSessionRequest(n, Y("EXPIRED"), !0);
            i ? this.client.session.keys.includes(i) && (await this.deleteSession(i, !0),
            this.client.events.emit("session_expire", {
                topic: i
            })) : n && (await this.deleteProposal(n, !0),
            this.client.events.emit("proposal_expire", {
                id: n
            }))
        }
        )
    }
    registerPairingEvents() {
        this.client.core.pairing.events.on(Ws.create, r=>this.onPairingCreated(r))
    }
    isValidPairingTopic(r) {
        if (!ds(r, !1)) {
            const {message: i} = Y("MISSING_OR_INVALID", `pairing topic should be a string: ${r}`);
            throw new Error(i)
        }
        if (!this.client.core.pairing.pairings.keys.includes(r)) {
            const {message: i} = Y("NO_MATCHING_KEY", `pairing topic doesn't exist: ${r}`);
            throw new Error(i)
        }
        if (Ei(this.client.core.pairing.pairings.get(r).expiry)) {
            const {message: i} = Y("EXPIRED", `pairing topic: ${r}`);
            throw new Error(i)
        }
    }
    async isValidSessionTopic(r) {
        if (!ds(r, !1)) {
            const {message: i} = Y("MISSING_OR_INVALID", `session topic should be a string: ${r}`);
            throw new Error(i)
        }
        if (!this.client.session.keys.includes(r)) {
            const {message: i} = Y("NO_MATCHING_KEY", `session topic doesn't exist: ${r}`);
            throw new Error(i)
        }
        if (Ei(this.client.session.get(r).expiry)) {
            await this.deleteSession(r);
            const {message: i} = Y("EXPIRED", `session topic: ${r}`);
            throw new Error(i)
        }
    }
    async isValidSessionOrPairingTopic(r) {
        if (this.client.session.keys.includes(r))
            await this.isValidSessionTopic(r);
        else if (this.client.core.pairing.pairings.keys.includes(r))
            this.isValidPairingTopic(r);
        else if (ds(r, !1)) {
            const {message: i} = Y("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${r}`);
            throw new Error(i)
        } else {
            const {message: i} = Y("MISSING_OR_INVALID", `session or pairing topic should be a string: ${r}`);
            throw new Error(i)
        }
    }
    async isValidProposalId(r) {
        if (!Y0(r)) {
            const {message: i} = Y("MISSING_OR_INVALID", `proposal id should be a number: ${r}`);
            throw new Error(i)
        }
        if (!this.client.proposal.keys.includes(r)) {
            const {message: i} = Y("NO_MATCHING_KEY", `proposal id doesn't exist: ${r}`);
            throw new Error(i)
        }
        if (Ei(this.client.proposal.get(r).expiry)) {
            await this.deleteProposal(r);
            const {message: i} = Y("EXPIRED", `proposal id: ${r}`);
            throw new Error(i)
        }
    }
}
class OE extends Po {
    constructor(r, i) {
        super(r, i, yE, Nc),
        this.core = r,
        this.logger = i
    }
}
class RE extends Po {
    constructor(r, i) {
        super(r, i, vE, Nc),
        this.core = r,
        this.logger = i
    }
}
class CE extends Po {
    constructor(r, i) {
        super(r, i, wE, Nc, n=>n.id),
        this.core = r,
        this.logger = i
    }
}
let AE = class Df extends Yw {
    constructor(r) {
        super(r),
        this.protocol = Cf,
        this.version = Af,
        this.name = ac.name,
        this.events = new Or.EventEmitter,
        this.on = (n,o)=>this.events.on(n, o),
        this.once = (n,o)=>this.events.once(n, o),
        this.off = (n,o)=>this.events.off(n, o),
        this.removeListener = (n,o)=>this.events.removeListener(n, o),
        this.removeAllListeners = n=>this.events.removeAllListeners(n),
        this.connect = async n=>{
            try {
                return await this.engine.connect(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.pair = async n=>{
            try {
                return await this.engine.pair(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.approve = async n=>{
            try {
                return await this.engine.approve(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.reject = async n=>{
            try {
                return await this.engine.reject(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.update = async n=>{
            try {
                return await this.engine.update(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.extend = async n=>{
            try {
                return await this.engine.extend(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.request = async n=>{
            try {
                return await this.engine.request(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.respond = async n=>{
            try {
                return await this.engine.respond(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.ping = async n=>{
            try {
                return await this.engine.ping(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.emit = async n=>{
            try {
                return await this.engine.emit(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.disconnect = async n=>{
            try {
                return await this.engine.disconnect(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.find = n=>{
            try {
                return this.engine.find(n)
            } catch (o) {
                throw this.logger.error(o.message),
                o
            }
        }
        ,
        this.getPendingSessionRequests = ()=>{
            try {
                return this.engine.getPendingSessionRequests()
            } catch (n) {
                throw this.logger.error(n.message),
                n
            }
        }
        ,
        this.name = (r == null ? void 0 : r.name) || ac.name,
        this.metadata = (r == null ? void 0 : r.metadata) || L0();
        const i = typeof (r == null ? void 0 : r.logger) < "u" && typeof (r == null ? void 0 : r.logger) != "string" ? r.logger : Re.pino(Re.getDefaultLoggerOptions({
            level: (r == null ? void 0 : r.logger) || ac.logger
        }));
        this.core = (r == null ? void 0 : r.core) || new gE(r),
        this.logger = Re.generateChildLogger(i, this.name),
        this.session = new RE(this.core,this.logger),
        this.proposal = new OE(this.core,this.logger),
        this.pendingRequest = new CE(this.core,this.logger),
        this.engine = new SE(this)
    }
    static async init(r) {
        const i = new Df(r);
        return await i.initialize(),
        i
    }
    get context() {
        return Re.getLoggerContext(this.logger)
    }
    get pairing() {
        return this.core.pairing.pairings
    }
    async initialize() {
        this.logger.trace("Initialized");
        try {
            await this.core.start(),
            await this.session.init(),
            await this.proposal.init(),
            await this.pendingRequest.init(),
            await this.engine.init(),
            this.core.verify.init({
                verifyUrl: this.metadata.verifyUrl
            }),
            this.logger.info("SignClient Initialization Success")
        } catch (r) {
            throw this.logger.info("SignClient Initialization Failure"),
            this.logger.error(r.message),
            r
        }
    }
}
;
var wc = {
    exports: {}
};
(function(a, r) {
    var i = typeof self < "u" ? self : Mr
      , n = function() {
        function h() {
            this.fetch = !1,
            this.DOMException = i.DOMException
        }
        return h.prototype = i,
        new h
    }();
    (function(h) {
        (function(p) {
            var g = {
                searchParams: "URLSearchParams"in h,
                iterable: "Symbol"in h && "iterator"in Symbol,
                blob: "FileReader"in h && "Blob"in h && function() {
                    try {
                        return new Blob,
                        !0
                    } catch {
                        return !1
                    }
                }(),
                formData: "FormData"in h,
                arrayBuffer: "ArrayBuffer"in h
            };
            function _(m) {
                return m && DataView.prototype.isPrototypeOf(m)
            }
            if (g.arrayBuffer)
                var v = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"]
                  , I = ArrayBuffer.isView || function(m) {
                    return m && v.indexOf(Object.prototype.toString.call(m)) > -1
                }
                ;
            function R(m) {
                if (typeof m != "string" && (m = String(m)),
                /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(m))
                    throw new TypeError("Invalid character in header field name");
                return m.toLowerCase()
            }
            function A(m) {
                return typeof m != "string" && (m = String(m)),
                m
            }
            function z(m) {
                var x = {
                    next: function() {
                        var X = m.shift();
                        return {
                            done: X === void 0,
                            value: X
                        }
                    }
                };
                return g.iterable && (x[Symbol.iterator] = function() {
                    return x
                }
                ),
                x
            }
            function T(m) {
                this.map = {},
                m instanceof T ? m.forEach(function(x, X) {
                    this.append(X, x)
                }, this) : Array.isArray(m) ? m.forEach(function(x) {
                    this.append(x[0], x[1])
                }, this) : m && Object.getOwnPropertyNames(m).forEach(function(x) {
                    this.append(x, m[x])
                }, this)
            }
            T.prototype.append = function(m, x) {
                m = R(m),
                x = A(x);
                var X = this.map[m];
                this.map[m] = X ? X + ", " + x : x
            }
            ,
            T.prototype.delete = function(m) {
                delete this.map[R(m)]
            }
            ,
            T.prototype.get = function(m) {
                return m = R(m),
                this.has(m) ? this.map[m] : null
            }
            ,
            T.prototype.has = function(m) {
                return this.map.hasOwnProperty(R(m))
            }
            ,
            T.prototype.set = function(m, x) {
                this.map[R(m)] = A(x)
            }
            ,
            T.prototype.forEach = function(m, x) {
                for (var X in this.map)
                    this.map.hasOwnProperty(X) && m.call(x, this.map[X], X, this)
            }
            ,
            T.prototype.keys = function() {
                var m = [];
                return this.forEach(function(x, X) {
                    m.push(X)
                }),
                z(m)
            }
            ,
            T.prototype.values = function() {
                var m = [];
                return this.forEach(function(x) {
                    m.push(x)
                }),
                z(m)
            }
            ,
            T.prototype.entries = function() {
                var m = [];
                return this.forEach(function(x, X) {
                    m.push([X, x])
                }),
                z(m)
            }
            ,
            g.iterable && (T.prototype[Symbol.iterator] = T.prototype.entries);
            function F(m) {
                if (m.bodyUsed)
                    return Promise.reject(new TypeError("Already read"));
                m.bodyUsed = !0
            }
            function re(m) {
                return new Promise(function(x, X) {
                    m.onload = function() {
                        x(m.result)
                    }
                    ,
                    m.onerror = function() {
                        X(m.error)
                    }
                }
                )
            }
            function he(m) {
                var x = new FileReader
                  , X = re(x);
                return x.readAsArrayBuffer(m),
                X
            }
            function le(m) {
                var x = new FileReader
                  , X = re(x);
                return x.readAsText(m),
                X
            }
            function fe(m) {
                for (var x = new Uint8Array(m), X = new Array(x.length), ce = 0; ce < x.length; ce++)
                    X[ce] = String.fromCharCode(x[ce]);
                return X.join("")
            }
            function pe(m) {
                if (m.slice)
                    return m.slice(0);
                var x = new Uint8Array(m.byteLength);
                return x.set(new Uint8Array(m)),
                x.buffer
            }
            function de() {
                return this.bodyUsed = !1,
                this._initBody = function(m) {
                    this._bodyInit = m,
                    m ? typeof m == "string" ? this._bodyText = m : g.blob && Blob.prototype.isPrototypeOf(m) ? this._bodyBlob = m : g.formData && FormData.prototype.isPrototypeOf(m) ? this._bodyFormData = m : g.searchParams && URLSearchParams.prototype.isPrototypeOf(m) ? this._bodyText = m.toString() : g.arrayBuffer && g.blob && _(m) ? (this._bodyArrayBuffer = pe(m.buffer),
                    this._bodyInit = new Blob([this._bodyArrayBuffer])) : g.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(m) || I(m)) ? this._bodyArrayBuffer = pe(m) : this._bodyText = m = Object.prototype.toString.call(m) : this._bodyText = "",
                    this.headers.get("content-type") || (typeof m == "string" ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : g.searchParams && URLSearchParams.prototype.isPrototypeOf(m) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                }
                ,
                g.blob && (this.blob = function() {
                    var m = F(this);
                    if (m)
                        return m;
                    if (this._bodyBlob)
                        return Promise.resolve(this._bodyBlob);
                    if (this._bodyArrayBuffer)
                        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                    if (this._bodyFormData)
                        throw new Error("could not read FormData body as blob");
                    return Promise.resolve(new Blob([this._bodyText]))
                }
                ,
                this.arrayBuffer = function() {
                    return this._bodyArrayBuffer ? F(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(he)
                }
                ),
                this.text = function() {
                    var m = F(this);
                    if (m)
                        return m;
                    if (this._bodyBlob)
                        return le(this._bodyBlob);
                    if (this._bodyArrayBuffer)
                        return Promise.resolve(fe(this._bodyArrayBuffer));
                    if (this._bodyFormData)
                        throw new Error("could not read FormData body as text");
                    return Promise.resolve(this._bodyText)
                }
                ,
                g.formData && (this.formData = function() {
                    return this.text().then(ve)
                }
                ),
                this.json = function() {
                    return this.text().then(JSON.parse)
                }
                ,
                this
            }
            var L = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
            function H(m) {
                var x = m.toUpperCase();
                return L.indexOf(x) > -1 ? x : m
            }
            function W(m, x) {
                x = x || {};
                var X = x.body;
                if (m instanceof W) {
                    if (m.bodyUsed)
                        throw new TypeError("Already read");
                    this.url = m.url,
                    this.credentials = m.credentials,
                    x.headers || (this.headers = new T(m.headers)),
                    this.method = m.method,
                    this.mode = m.mode,
                    this.signal = m.signal,
                    !X && m._bodyInit != null && (X = m._bodyInit,
                    m.bodyUsed = !0)
                } else
                    this.url = String(m);
                if (this.credentials = x.credentials || this.credentials || "same-origin",
                (x.headers || !this.headers) && (this.headers = new T(x.headers)),
                this.method = H(x.method || this.method || "GET"),
                this.mode = x.mode || this.mode || null,
                this.signal = x.signal || this.signal,
                this.referrer = null,
                (this.method === "GET" || this.method === "HEAD") && X)
                    throw new TypeError("Body not allowed for GET or HEAD requests");
                this._initBody(X)
            }
            W.prototype.clone = function() {
                return new W(this,{
                    body: this._bodyInit
                })
            }
            ;
            function ve(m) {
                var x = new FormData;
                return m.trim().split("&").forEach(function(X) {
                    if (X) {
                        var ce = X.split("=")
                          , V = ce.shift().replace(/\+/g, " ")
                          , k = ce.join("=").replace(/\+/g, " ");
                        x.append(decodeURIComponent(V), decodeURIComponent(k))
                    }
                }),
                x
            }
            function ie(m) {
                var x = new T
                  , X = m.replace(/\r?\n[\t ]+/g, " ");
                return X.split(/\r?\n/).forEach(function(ce) {
                    var V = ce.split(":")
                      , k = V.shift().trim();
                    if (k) {
                        var B = V.join(":").trim();
                        x.append(k, B)
                    }
                }),
                x
            }
            de.call(W.prototype);
            function ue(m, x) {
                x || (x = {}),
                this.type = "default",
                this.status = x.status === void 0 ? 200 : x.status,
                this.ok = this.status >= 200 && this.status < 300,
                this.statusText = "statusText"in x ? x.statusText : "OK",
                this.headers = new T(x.headers),
                this.url = x.url || "",
                this._initBody(m)
            }
            de.call(ue.prototype),
            ue.prototype.clone = function() {
                return new ue(this._bodyInit,{
                    status: this.status,
                    statusText: this.statusText,
                    headers: new T(this.headers),
                    url: this.url
                })
            }
            ,
            ue.error = function() {
                var m = new ue(null,{
                    status: 0,
                    statusText: ""
                });
                return m.type = "error",
                m
            }
            ;
            var Te = [301, 302, 303, 307, 308];
            ue.redirect = function(m, x) {
                if (Te.indexOf(x) === -1)
                    throw new RangeError("Invalid status code");
                return new ue(null,{
                    status: x,
                    headers: {
                        location: m
                    }
                })
            }
            ,
            p.DOMException = h.DOMException;
            try {
                new p.DOMException
            } catch {
                p.DOMException = function(x, X) {
                    this.message = x,
                    this.name = X;
                    var ce = Error(x);
                    this.stack = ce.stack
                }
                ,
                p.DOMException.prototype = Object.create(Error.prototype),
                p.DOMException.prototype.constructor = p.DOMException
            }
            function Ue(m, x) {
                return new Promise(function(X, ce) {
                    var V = new W(m,x);
                    if (V.signal && V.signal.aborted)
                        return ce(new p.DOMException("Aborted","AbortError"));
                    var k = new XMLHttpRequest;
                    function B() {
                        k.abort()
                    }
                    k.onload = function() {
                        var G = {
                            status: k.status,
                            statusText: k.statusText,
                            headers: ie(k.getAllResponseHeaders() || "")
                        };
                        G.url = "responseURL"in k ? k.responseURL : G.headers.get("X-Request-URL");
                        var Je = "response"in k ? k.response : k.responseText;
                        X(new ue(Je,G))
                    }
                    ,
                    k.onerror = function() {
                        ce(new TypeError("Network request failed"))
                    }
                    ,
                    k.ontimeout = function() {
                        ce(new TypeError("Network request failed"))
                    }
                    ,
                    k.onabort = function() {
                        ce(new p.DOMException("Aborted","AbortError"))
                    }
                    ,
                    k.open(V.method, V.url, !0),
                    V.credentials === "include" ? k.withCredentials = !0 : V.credentials === "omit" && (k.withCredentials = !1),
                    "responseType"in k && g.blob && (k.responseType = "blob"),
                    V.headers.forEach(function(G, Je) {
                        k.setRequestHeader(Je, G)
                    }),
                    V.signal && (V.signal.addEventListener("abort", B),
                    k.onreadystatechange = function() {
                        k.readyState === 4 && V.signal.removeEventListener("abort", B)
                    }
                    ),
                    k.send(typeof V._bodyInit > "u" ? null : V._bodyInit)
                }
                )
            }
            return Ue.polyfill = !0,
            h.fetch || (h.fetch = Ue,
            h.Headers = T,
            h.Request = W,
            h.Response = ue),
            p.Headers = T,
            p.Request = W,
            p.Response = ue,
            p.fetch = Ue,
            Object.defineProperty(p, "__esModule", {
                value: !0
            }),
            p
        }
        )({})
    }
    )(n),
    n.fetch.ponyfill = !0,
    delete n.fetch.polyfill;
    var o = n;
    r = o.fetch,
    r.default = o.fetch,
    r.fetch = o.fetch,
    r.Headers = o.Headers,
    r.Request = o.Request,
    r.Response = o.Response,
    a.exports = r
}
)(wc, wc.exports);
var TE = wc.exports;
const Al = xc(TE)
  , NE = {
    Accept: "application/json",
    "Content-Type": "application/json"
}
  , DE = "POST"
  , Tl = {
    headers: NE,
    method: DE
}
  , Nl = 10;
class Si {
    constructor(r, i=!1) {
        if (this.url = r,
        this.disableProviderPing = i,
        this.events = new Or.EventEmitter,
        this.isAvailable = !1,
        this.registering = !1,
        !sl(r))
            throw new Error(`Provided URL is not compatible with HTTP connection: ${r}`);
        this.url = r,
        this.disableProviderPing = i
    }
    get connected() {
        return this.isAvailable
    }
    get connecting() {
        return this.registering
    }
    on(r, i) {
        this.events.on(r, i)
    }
    once(r, i) {
        this.events.once(r, i)
    }
    off(r, i) {
        this.events.off(r, i)
    }
    removeListener(r, i) {
        this.events.removeListener(r, i)
    }
    async open(r=this.url) {
        await this.register(r)
    }
    async close() {
        if (!this.isAvailable)
            throw new Error("Connection already closed");
        this.onClose()
    }
    async send(r, i) {
        this.isAvailable || await this.register();
        try {
            const n = Ki(r)
              , h = await (await Al(this.url, Object.assign(Object.assign({}, Tl), {
                body: n
            }))).json();
            this.onPayload({
                data: h
            })
        } catch (n) {
            this.onError(r.id, n)
        }
    }
    async register(r=this.url) {
        if (!sl(r))
            throw new Error(`Provided URL is not compatible with HTTP connection: ${r}`);
        if (this.registering) {
            const i = this.events.getMaxListeners();
            return (this.events.listenerCount("register_error") >= i || this.events.listenerCount("open") >= i) && this.events.setMaxListeners(i + 1),
            new Promise((n,o)=>{
                this.events.once("register_error", h=>{
                    this.resetMaxListeners(),
                    o(h)
                }
                ),
                this.events.once("open", ()=>{
                    if (this.resetMaxListeners(),
                    typeof this.isAvailable > "u")
                        return o(new Error("HTTP connection is missing or invalid"));
                    n()
                }
                )
            }
            )
        }
        this.url = r,
        this.registering = !0;
        try {
            if (!this.disableProviderPing) {
                const i = Ki({
                    id: 1,
                    jsonrpc: "2.0",
                    method: "test",
                    params: []
                });
                await Al(r, Object.assign(Object.assign({}, Tl), {
                    body: i
                }))
            }
            this.onOpen()
        } catch (i) {
            const n = this.parseError(i);
            throw this.events.emit("register_error", n),
            this.onClose(),
            n
        }
    }
    onOpen() {
        this.isAvailable = !0,
        this.registering = !1,
        this.events.emit("open")
    }
    onClose() {
        this.isAvailable = !1,
        this.registering = !1,
        this.events.emit("close")
    }
    onPayload(r) {
        if (typeof r.data > "u")
            return;
        const i = typeof r.data == "string" ? Zs(r.data) : r.data;
        this.events.emit("payload", i)
    }
    onError(r, i) {
        const n = this.parseError(i)
          , o = n.message || n.toString()
          , h = Eo(r, o);
        this.events.emit("payload", h)
    }
    parseError(r, i=this.url) {
        return hf(r, i, "HTTP")
    }
    resetMaxListeners() {
        this.events.getMaxListeners() > Nl && this.events.setMaxListeners(Nl)
    }
}
const Dl = "error"
  , $E = "wss://relay.walletconnect.com"
  , LE = "wc"
  , qE = "universal_provider"
  , $l = `${LE}@2:${qE}:`
  , ME = "https://rpc.walletconnect.com/v1/"
  , hi = {
    DEFAULT_CHAIN_CHANGED: "default_chain_changed"
};
var Vs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
  , _c = {
    exports: {}
};
/**
* @license
* Lodash <https://lodash.com/>
* Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
* Released under MIT license <https://lodash.com/license>
* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*/
(function(a, r) {
    (function() {
        var i, n = "4.17.21", o = 200, h = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", p = "Expected a function", g = "Invalid `variable` option passed into `_.template`", _ = "__lodash_hash_undefined__", v = 500, I = "__lodash_placeholder__", R = 1, A = 2, z = 4, T = 1, F = 2, re = 1, he = 2, le = 4, fe = 8, pe = 16, de = 32, L = 64, H = 128, W = 256, ve = 512, ie = 30, ue = "...", Te = 800, Ue = 16, m = 1, x = 2, X = 3, ce = 1 / 0, V = 9007199254740991, k = 17976931348623157e292, B = NaN, G = 4294967295, Je = G - 1, Ke = G >>> 1, jr = [["ary", H], ["bind", re], ["bindKey", he], ["curry", fe], ["curryRight", pe], ["flip", ve], ["partial", de], ["partialRight", L], ["rearg", W]], Ie = "[object Arguments]", It = "[object Array]", $ = "[object AsyncFunction]", D = "[object Boolean]", C = "[object Date]", u = "[object DOMException]", E = "[object Error]", ee = "[object Function]", ge = "[object GeneratorFunction]", be = "[object Map]", Ne = "[object Number]", $e = "[object Null]", Se = "[object Object]", xt = "[object Promise]", mt = "[object Proxy]", ot = "[object RegExp]", qe = "[object Set]", Ye = "[object String]", Xe = "[object Symbol]", at = "[object Undefined]", He = "[object WeakMap]", Ze = "[object WeakSet]", De = "[object ArrayBuffer]", Be = "[object DataView]", ht = "[object Float32Array]", je = "[object Float64Array]", Pt = "[object Int8Array]", $t = "[object Int16Array]", Ht = "[object Int32Array]", kt = "[object Uint8Array]", Mt = "[object Uint8ClampedArray]", Jt = "[object Uint16Array]", rr = "[object Uint32Array]", zr = /\b__p \+= '';/g, Qt = /\b(__p \+=) '' \+/g, Vr = /(__e\(.*?\)|\b__t\)) \+\n'';/g, li = /&(?:amp|lt|gt|quot|#39);/g, Oi = /[&<>"']/g, lt = RegExp(li.source), rt = RegExp(Oi.source), ft = /<%-([\s\S]+?)%>/g, pt = /<%([\s\S]+?)%>/g, ct = /<%=([\s\S]+?)%>/g, it = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, St = /^\w*$/, Ot = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, dt = /[\\^$.*+?()[\]{}|]/g, Rt = RegExp(dt.source), gt = /^\s+/, wt = /\s/, yt = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, Qe = /\{\n\/\* \[wrapped with (.+)\] \*/, Ct = /,? & /, At = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, So = /[()=,{}\[\]\/\s]/, Oo = /\\(\\)?/g, Ro = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, vr = /\w*$/, Co = /^[-+]0x[0-9a-f]+$/i, Ao = /^0b[01]+$/i, To = /^\[object .+?Constructor\]$/, No = /^0o[0-7]+$/i, Do = /^(?:0|[1-9]\d*)$/, Gr = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Gi = /($^)/, $o = /['\n\r\u2028\u2029\\]/g, Wi = "\\ud800-\\udfff", Lo = "\\u0300-\\u036f", qo = "\\ufe20-\\ufe2f", Ji = "\\u20d0-\\u20ff", tn = Lo + qo + Ji, rn = "\\u2700-\\u27bf", Rr = "a-z\\xdf-\\xf6\\xf8-\\xff", Mo = "\\xac\\xb1\\xd7\\xf7", jo = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", zo = "\\u2000-\\u206f", Uo = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", sn = "A-Z\\xc0-\\xd6\\xd8-\\xde", nn = "\\ufe0e\\ufe0f", Ri = Mo + jo + zo + Uo, bs = "['’]", Ci = "[" + Wi + "]", Es = "[" + Ri + "]", Ai = "[" + tn + "]", on = "\\d+", Ho = "[" + rn + "]", an = "[" + Rr + "]", cn = "[^" + Wi + Ri + on + rn + Rr + sn + "]", Qi = "\\ud83c[\\udffb-\\udfff]", ko = "(?:" + Ai + "|" + Qi + ")", un = "[^" + Wi + "]", Yi = "(?:\\ud83c[\\udde6-\\uddff]){2}", fi = "[\\ud800-\\udbff][\\udc00-\\udfff]", lr = "[" + sn + "]", hn = "\\u200d", ln = "(?:" + an + "|" + cn + ")", Ur = "(?:" + lr + "|" + cn + ")", fn = "(?:" + bs + "(?:d|ll|m|re|s|t|ve))?", pn = "(?:" + bs + "(?:D|LL|M|RE|S|T|VE))?", dn = ko + "?", gn = "[" + nn + "]?", Ko = "(?:" + hn + "(?:" + [un, Yi, fi].join("|") + ")" + gn + dn + ")*", Wr = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", yn = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", vn = gn + dn + Ko, Xi = "(?:" + [Ho, Yi, fi].join("|") + ")" + vn, Bo = "(?:" + [un + Ai + "?", Ai, Yi, fi, Ci].join("|") + ")", Is = RegExp(bs, "g"), Fo = RegExp(Ai, "g"), Zi = RegExp(Qi + "(?=" + Qi + ")|" + Bo + vn, "g"), mn = RegExp([lr + "?" + an + "+" + fn + "(?=" + [Es, lr, "$"].join("|") + ")", Ur + "+" + pn + "(?=" + [Es, lr + ln, "$"].join("|") + ")", lr + "?" + ln + "+" + fn, lr + "+" + pn, yn, Wr, on, Xi].join("|"), "g"), wn = RegExp("[" + hn + Wi + tn + nn + "]"), Ti = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, _n = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Vo = -1, Fe = {};
        Fe[ht] = Fe[je] = Fe[Pt] = Fe[$t] = Fe[Ht] = Fe[kt] = Fe[Mt] = Fe[Jt] = Fe[rr] = !0,
        Fe[Ie] = Fe[It] = Fe[De] = Fe[D] = Fe[Be] = Fe[C] = Fe[E] = Fe[ee] = Fe[be] = Fe[Ne] = Fe[Se] = Fe[ot] = Fe[qe] = Fe[Ye] = Fe[He] = !1;
        var ke = {};
        ke[Ie] = ke[It] = ke[De] = ke[Be] = ke[D] = ke[C] = ke[ht] = ke[je] = ke[Pt] = ke[$t] = ke[Ht] = ke[be] = ke[Ne] = ke[Se] = ke[ot] = ke[qe] = ke[Ye] = ke[Xe] = ke[kt] = ke[Mt] = ke[Jt] = ke[rr] = !0,
        ke[E] = ke[ee] = ke[He] = !1;
        var y = {
            À: "A",
            Á: "A",
            Â: "A",
            Ã: "A",
            Ä: "A",
            Å: "A",
            à: "a",
            á: "a",
            â: "a",
            ã: "a",
            ä: "a",
            å: "a",
            Ç: "C",
            ç: "c",
            Ð: "D",
            ð: "d",
            È: "E",
            É: "E",
            Ê: "E",
            Ë: "E",
            è: "e",
            é: "e",
            ê: "e",
            ë: "e",
            Ì: "I",
            Í: "I",
            Î: "I",
            Ï: "I",
            ì: "i",
            í: "i",
            î: "i",
            ï: "i",
            Ñ: "N",
            ñ: "n",
            Ò: "O",
            Ó: "O",
            Ô: "O",
            Õ: "O",
            Ö: "O",
            Ø: "O",
            ò: "o",
            ó: "o",
            ô: "o",
            õ: "o",
            ö: "o",
            ø: "o",
            Ù: "U",
            Ú: "U",
            Û: "U",
            Ü: "U",
            ù: "u",
            ú: "u",
            û: "u",
            ü: "u",
            Ý: "Y",
            ý: "y",
            ÿ: "y",
            Æ: "Ae",
            æ: "ae",
            Þ: "Th",
            þ: "th",
            ß: "ss",
            Ā: "A",
            Ă: "A",
            Ą: "A",
            ā: "a",
            ă: "a",
            ą: "a",
            Ć: "C",
            Ĉ: "C",
            Ċ: "C",
            Č: "C",
            ć: "c",
            ĉ: "c",
            ċ: "c",
            č: "c",
            Ď: "D",
            Đ: "D",
            ď: "d",
            đ: "d",
            Ē: "E",
            Ĕ: "E",
            Ė: "E",
            Ę: "E",
            Ě: "E",
            ē: "e",
            ĕ: "e",
            ė: "e",
            ę: "e",
            ě: "e",
            Ĝ: "G",
            Ğ: "G",
            Ġ: "G",
            Ģ: "G",
            ĝ: "g",
            ğ: "g",
            ġ: "g",
            ģ: "g",
            Ĥ: "H",
            Ħ: "H",
            ĥ: "h",
            ħ: "h",
            Ĩ: "I",
            Ī: "I",
            Ĭ: "I",
            Į: "I",
            İ: "I",
            ĩ: "i",
            ī: "i",
            ĭ: "i",
            į: "i",
            ı: "i",
            Ĵ: "J",
            ĵ: "j",
            Ķ: "K",
            ķ: "k",
            ĸ: "k",
            Ĺ: "L",
            Ļ: "L",
            Ľ: "L",
            Ŀ: "L",
            Ł: "L",
            ĺ: "l",
            ļ: "l",
            ľ: "l",
            ŀ: "l",
            ł: "l",
            Ń: "N",
            Ņ: "N",
            Ň: "N",
            Ŋ: "N",
            ń: "n",
            ņ: "n",
            ň: "n",
            ŋ: "n",
            Ō: "O",
            Ŏ: "O",
            Ő: "O",
            ō: "o",
            ŏ: "o",
            ő: "o",
            Ŕ: "R",
            Ŗ: "R",
            Ř: "R",
            ŕ: "r",
            ŗ: "r",
            ř: "r",
            Ś: "S",
            Ŝ: "S",
            Ş: "S",
            Š: "S",
            ś: "s",
            ŝ: "s",
            ş: "s",
            š: "s",
            Ţ: "T",
            Ť: "T",
            Ŧ: "T",
            ţ: "t",
            ť: "t",
            ŧ: "t",
            Ũ: "U",
            Ū: "U",
            Ŭ: "U",
            Ů: "U",
            Ű: "U",
            Ų: "U",
            ũ: "u",
            ū: "u",
            ŭ: "u",
            ů: "u",
            ű: "u",
            ų: "u",
            Ŵ: "W",
            ŵ: "w",
            Ŷ: "Y",
            ŷ: "y",
            Ÿ: "Y",
            Ź: "Z",
            Ż: "Z",
            Ž: "Z",
            ź: "z",
            ż: "z",
            ž: "z",
            Ĳ: "IJ",
            ĳ: "ij",
            Œ: "Oe",
            œ: "oe",
            ŉ: "'n",
            ſ: "s"
        }
          , P = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }
          , U = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"',
            "&#39;": "'"
        }
          , Q = {
            "\\": "\\",
            "'": "'",
            "\n": "n",
            "\r": "r",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }
          , Ve = parseFloat
          , me = parseInt
          , et = typeof Vs == "object" && Vs && Vs.Object === Object && Vs
          , Tt = typeof self == "object" && self && self.Object === Object && self
          , Ce = et || Tt || Function("return this")()
          , Ge = r && !r.nodeType && r
          , _t = Ge && !0 && a && !a.nodeType && a
          , ir = _t && _t.exports === Ge
          , Nt = ir && et.process
          , tt = function() {
            try {
                var S = _t && _t.require && _t.require("util").types;
                return S || Nt && Nt.binding && Nt.binding("util")
            } catch {}
        }()
          , Yt = tt && tt.isArrayBuffer
          , Cr = tt && tt.isDate
          , mr = tt && tt.isMap
          , Hr = tt && tt.isRegExp
          , xs = tt && tt.isSet
          , Ni = tt && tt.isTypedArray;
        function jt(S, q, N) {
            switch (N.length) {
            case 0:
                return S.call(q);
            case 1:
                return S.call(q, N[0]);
            case 2:
                return S.call(q, N[0], N[1]);
            case 3:
                return S.call(q, N[0], N[1], N[2])
            }
            return S.apply(q, N)
        }
        function qf(S, q, N, Z) {
            for (var ye = -1, Le = S == null ? 0 : S.length; ++ye < Le; ) {
                var Lt = S[ye];
                q(Z, Lt, N(Lt), S)
            }
            return Z
        }
        function wr(S, q) {
            for (var N = -1, Z = S == null ? 0 : S.length; ++N < Z && q(S[N], N, S) !== !1; )
                ;
            return S
        }
        function Mf(S, q) {
            for (var N = S == null ? 0 : S.length; N-- && q(S[N], N, S) !== !1; )
                ;
            return S
        }
        function Lc(S, q) {
            for (var N = -1, Z = S == null ? 0 : S.length; ++N < Z; )
                if (!q(S[N], N, S))
                    return !1;
            return !0
        }
        function pi(S, q) {
            for (var N = -1, Z = S == null ? 0 : S.length, ye = 0, Le = []; ++N < Z; ) {
                var Lt = S[N];
                q(Lt, N, S) && (Le[ye++] = Lt)
            }
            return Le
        }
        function bn(S, q) {
            var N = S == null ? 0 : S.length;
            return !!N && es(S, q, 0) > -1
        }
        function Go(S, q, N) {
            for (var Z = -1, ye = S == null ? 0 : S.length; ++Z < ye; )
                if (N(q, S[Z]))
                    return !0;
            return !1
        }
        function st(S, q) {
            for (var N = -1, Z = S == null ? 0 : S.length, ye = Array(Z); ++N < Z; )
                ye[N] = q(S[N], N, S);
            return ye
        }
        function di(S, q) {
            for (var N = -1, Z = q.length, ye = S.length; ++N < Z; )
                S[ye + N] = q[N];
            return S
        }
        function Wo(S, q, N, Z) {
            var ye = -1
              , Le = S == null ? 0 : S.length;
            for (Z && Le && (N = S[++ye]); ++ye < Le; )
                N = q(N, S[ye], ye, S);
            return N
        }
        function jf(S, q, N, Z) {
            var ye = S == null ? 0 : S.length;
            for (Z && ye && (N = S[--ye]); ye--; )
                N = q(N, S[ye], ye, S);
            return N
        }
        function Jo(S, q) {
            for (var N = -1, Z = S == null ? 0 : S.length; ++N < Z; )
                if (q(S[N], N, S))
                    return !0;
            return !1
        }
        var zf = Qo("length");
        function Uf(S) {
            return S.split("")
        }
        function Hf(S) {
            return S.match(At) || []
        }
        function qc(S, q, N) {
            var Z;
            return N(S, function(ye, Le, Lt) {
                if (q(ye, Le, Lt))
                    return Z = Le,
                    !1
            }),
            Z
        }
        function En(S, q, N, Z) {
            for (var ye = S.length, Le = N + (Z ? 1 : -1); Z ? Le-- : ++Le < ye; )
                if (q(S[Le], Le, S))
                    return Le;
            return -1
        }
        function es(S, q, N) {
            return q === q ? Zf(S, q, N) : En(S, Mc, N)
        }
        function kf(S, q, N, Z) {
            for (var ye = N - 1, Le = S.length; ++ye < Le; )
                if (Z(S[ye], q))
                    return ye;
            return -1
        }
        function Mc(S) {
            return S !== S
        }
        function jc(S, q) {
            var N = S == null ? 0 : S.length;
            return N ? Xo(S, q) / N : B
        }
        function Qo(S) {
            return function(q) {
                return q == null ? i : q[S]
            }
        }
        function Yo(S) {
            return function(q) {
                return S == null ? i : S[q]
            }
        }
        function zc(S, q, N, Z, ye) {
            return ye(S, function(Le, Lt, We) {
                N = Z ? (Z = !1,
                Le) : q(N, Le, Lt, We)
            }),
            N
        }
        function Kf(S, q) {
            var N = S.length;
            for (S.sort(q); N--; )
                S[N] = S[N].value;
            return S
        }
        function Xo(S, q) {
            for (var N, Z = -1, ye = S.length; ++Z < ye; ) {
                var Le = q(S[Z]);
                Le !== i && (N = N === i ? Le : N + Le)
            }
            return N
        }
        function Zo(S, q) {
            for (var N = -1, Z = Array(S); ++N < S; )
                Z[N] = q(N);
            return Z
        }
        function Bf(S, q) {
            return st(q, function(N) {
                return [N, S[N]]
            })
        }
        function Uc(S) {
            return S && S.slice(0, Bc(S) + 1).replace(gt, "")
        }
        function fr(S) {
            return function(q) {
                return S(q)
            }
        }
        function ea(S, q) {
            return st(q, function(N) {
                return S[N]
            })
        }
        function Ps(S, q) {
            return S.has(q)
        }
        function Hc(S, q) {
            for (var N = -1, Z = S.length; ++N < Z && es(q, S[N], 0) > -1; )
                ;
            return N
        }
        function kc(S, q) {
            for (var N = S.length; N-- && es(q, S[N], 0) > -1; )
                ;
            return N
        }
        function Ff(S, q) {
            for (var N = S.length, Z = 0; N--; )
                S[N] === q && ++Z;
            return Z
        }
        var Vf = Yo(y)
          , Gf = Yo(P);
        function Wf(S) {
            return "\\" + Q[S]
        }
        function Jf(S, q) {
            return S == null ? i : S[q]
        }
        function ts(S) {
            return wn.test(S)
        }
        function Qf(S) {
            return Ti.test(S)
        }
        function Yf(S) {
            for (var q, N = []; !(q = S.next()).done; )
                N.push(q.value);
            return N
        }
        function ta(S) {
            var q = -1
              , N = Array(S.size);
            return S.forEach(function(Z, ye) {
                N[++q] = [ye, Z]
            }),
            N
        }
        function Kc(S, q) {
            return function(N) {
                return S(q(N))
            }
        }
        function gi(S, q) {
            for (var N = -1, Z = S.length, ye = 0, Le = []; ++N < Z; ) {
                var Lt = S[N];
                (Lt === q || Lt === I) && (S[N] = I,
                Le[ye++] = N)
            }
            return Le
        }
        function In(S) {
            var q = -1
              , N = Array(S.size);
            return S.forEach(function(Z) {
                N[++q] = Z
            }),
            N
        }
        function Xf(S) {
            var q = -1
              , N = Array(S.size);
            return S.forEach(function(Z) {
                N[++q] = [Z, Z]
            }),
            N
        }
        function Zf(S, q, N) {
            for (var Z = N - 1, ye = S.length; ++Z < ye; )
                if (S[Z] === q)
                    return Z;
            return -1
        }
        function ep(S, q, N) {
            for (var Z = N + 1; Z--; )
                if (S[Z] === q)
                    return Z;
            return Z
        }
        function rs(S) {
            return ts(S) ? rp(S) : zf(S)
        }
        function Ar(S) {
            return ts(S) ? ip(S) : Uf(S)
        }
        function Bc(S) {
            for (var q = S.length; q-- && wt.test(S.charAt(q)); )
                ;
            return q
        }
        var tp = Yo(U);
        function rp(S) {
            for (var q = Zi.lastIndex = 0; Zi.test(S); )
                ++q;
            return q
        }
        function ip(S) {
            return S.match(Zi) || []
        }
        function sp(S) {
            return S.match(mn) || []
        }
        var np = function S(q) {
            q = q == null ? Ce : is.defaults(Ce.Object(), q, is.pick(Ce, _n));
            var N = q.Array
              , Z = q.Date
              , ye = q.Error
              , Le = q.Function
              , Lt = q.Math
              , We = q.Object
              , ra = q.RegExp
              , op = q.String
              , _r = q.TypeError
              , xn = N.prototype
              , ap = Le.prototype
              , ss = We.prototype
              , Pn = q["__core-js_shared__"]
              , Sn = ap.toString
              , ze = ss.hasOwnProperty
              , cp = 0
              , Fc = function() {
                var e = /[^.]+$/.exec(Pn && Pn.keys && Pn.keys.IE_PROTO || "");
                return e ? "Symbol(src)_1." + e : ""
            }()
              , On = ss.toString
              , up = Sn.call(We)
              , hp = Ce._
              , lp = ra("^" + Sn.call(ze).replace(dt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$")
              , Rn = ir ? q.Buffer : i
              , yi = q.Symbol
              , Cn = q.Uint8Array
              , Vc = Rn ? Rn.allocUnsafe : i
              , An = Kc(We.getPrototypeOf, We)
              , Gc = We.create
              , Wc = ss.propertyIsEnumerable
              , Tn = xn.splice
              , Jc = yi ? yi.isConcatSpreadable : i
              , Ss = yi ? yi.iterator : i
              , Di = yi ? yi.toStringTag : i
              , Nn = function() {
                try {
                    var e = ji(We, "defineProperty");
                    return e({}, "", {}),
                    e
                } catch {}
            }()
              , fp = q.clearTimeout !== Ce.clearTimeout && q.clearTimeout
              , pp = Z && Z.now !== Ce.Date.now && Z.now
              , dp = q.setTimeout !== Ce.setTimeout && q.setTimeout
              , Dn = Lt.ceil
              , $n = Lt.floor
              , ia = We.getOwnPropertySymbols
              , gp = Rn ? Rn.isBuffer : i
              , Qc = q.isFinite
              , yp = xn.join
              , vp = Kc(We.keys, We)
              , qt = Lt.max
              , Ft = Lt.min
              , mp = Z.now
              , wp = q.parseInt
              , Yc = Lt.random
              , _p = xn.reverse
              , sa = ji(q, "DataView")
              , Os = ji(q, "Map")
              , na = ji(q, "Promise")
              , ns = ji(q, "Set")
              , Rs = ji(q, "WeakMap")
              , Cs = ji(We, "create")
              , Ln = Rs && new Rs
              , os = {}
              , bp = zi(sa)
              , Ep = zi(Os)
              , Ip = zi(na)
              , xp = zi(ns)
              , Pp = zi(Rs)
              , qn = yi ? yi.prototype : i
              , As = qn ? qn.valueOf : i
              , Xc = qn ? qn.toString : i;
            function f(e) {
                if (vt(e) && !we(e) && !(e instanceof Oe)) {
                    if (e instanceof br)
                        return e;
                    if (ze.call(e, "__wrapped__"))
                        return Zu(e)
                }
                return new br(e)
            }
            var as = function() {
                function e() {}
                return function(t) {
                    if (!ut(t))
                        return {};
                    if (Gc)
                        return Gc(t);
                    e.prototype = t;
                    var s = new e;
                    return e.prototype = i,
                    s
                }
            }();
            function Mn() {}
            function br(e, t) {
                this.__wrapped__ = e,
                this.__actions__ = [],
                this.__chain__ = !!t,
                this.__index__ = 0,
                this.__values__ = i
            }
            f.templateSettings = {
                escape: ft,
                evaluate: pt,
                interpolate: ct,
                variable: "",
                imports: {
                    _: f
                }
            },
            f.prototype = Mn.prototype,
            f.prototype.constructor = f,
            br.prototype = as(Mn.prototype),
            br.prototype.constructor = br;
            function Oe(e) {
                this.__wrapped__ = e,
                this.__actions__ = [],
                this.__dir__ = 1,
                this.__filtered__ = !1,
                this.__iteratees__ = [],
                this.__takeCount__ = G,
                this.__views__ = []
            }
            function Sp() {
                var e = new Oe(this.__wrapped__);
                return e.__actions__ = sr(this.__actions__),
                e.__dir__ = this.__dir__,
                e.__filtered__ = this.__filtered__,
                e.__iteratees__ = sr(this.__iteratees__),
                e.__takeCount__ = this.__takeCount__,
                e.__views__ = sr(this.__views__),
                e
            }
            function Op() {
                if (this.__filtered__) {
                    var e = new Oe(this);
                    e.__dir__ = -1,
                    e.__filtered__ = !0
                } else
                    e = this.clone(),
                    e.__dir__ *= -1;
                return e
            }
            function Rp() {
                var e = this.__wrapped__.value()
                  , t = this.__dir__
                  , s = we(e)
                  , c = t < 0
                  , l = s ? e.length : 0
                  , d = Ud(0, l, this.__views__)
                  , w = d.start
                  , b = d.end
                  , O = b - w
                  , M = c ? b : w - 1
                  , j = this.__iteratees__
                  , K = j.length
                  , J = 0
                  , te = Ft(O, this.__takeCount__);
                if (!s || !c && l == O && te == O)
                    return Eu(e, this.__actions__);
                var oe = [];
                e: for (; O-- && J < te; ) {
                    M += t;
                    for (var Ee = -1, ae = e[M]; ++Ee < K; ) {
                        var Pe = j[Ee]
                          , Ae = Pe.iteratee
                          , gr = Pe.type
                          , er = Ae(ae);
                        if (gr == x)
                            ae = er;
                        else if (!er) {
                            if (gr == m)
                                continue e;
                            break e
                        }
                    }
                    oe[J++] = ae
                }
                return oe
            }
            Oe.prototype = as(Mn.prototype),
            Oe.prototype.constructor = Oe;
            function $i(e) {
                var t = -1
                  , s = e == null ? 0 : e.length;
                for (this.clear(); ++t < s; ) {
                    var c = e[t];
                    this.set(c[0], c[1])
                }
            }
            function Cp() {
                this.__data__ = Cs ? Cs(null) : {},
                this.size = 0
            }
            function Ap(e) {
                var t = this.has(e) && delete this.__data__[e];
                return this.size -= t ? 1 : 0,
                t
            }
            function Tp(e) {
                var t = this.__data__;
                if (Cs) {
                    var s = t[e];
                    return s === _ ? i : s
                }
                return ze.call(t, e) ? t[e] : i
            }
            function Np(e) {
                var t = this.__data__;
                return Cs ? t[e] !== i : ze.call(t, e)
            }
            function Dp(e, t) {
                var s = this.__data__;
                return this.size += this.has(e) ? 0 : 1,
                s[e] = Cs && t === i ? _ : t,
                this
            }
            $i.prototype.clear = Cp,
            $i.prototype.delete = Ap,
            $i.prototype.get = Tp,
            $i.prototype.has = Np,
            $i.prototype.set = Dp;
            function Jr(e) {
                var t = -1
                  , s = e == null ? 0 : e.length;
                for (this.clear(); ++t < s; ) {
                    var c = e[t];
                    this.set(c[0], c[1])
                }
            }
            function $p() {
                this.__data__ = [],
                this.size = 0
            }
            function Lp(e) {
                var t = this.__data__
                  , s = jn(t, e);
                if (s < 0)
                    return !1;
                var c = t.length - 1;
                return s == c ? t.pop() : Tn.call(t, s, 1),
                --this.size,
                !0
            }
            function qp(e) {
                var t = this.__data__
                  , s = jn(t, e);
                return s < 0 ? i : t[s][1]
            }
            function Mp(e) {
                return jn(this.__data__, e) > -1
            }
            function jp(e, t) {
                var s = this.__data__
                  , c = jn(s, e);
                return c < 0 ? (++this.size,
                s.push([e, t])) : s[c][1] = t,
                this
            }
            Jr.prototype.clear = $p,
            Jr.prototype.delete = Lp,
            Jr.prototype.get = qp,
            Jr.prototype.has = Mp,
            Jr.prototype.set = jp;
            function Qr(e) {
                var t = -1
                  , s = e == null ? 0 : e.length;
                for (this.clear(); ++t < s; ) {
                    var c = e[t];
                    this.set(c[0], c[1])
                }
            }
            function zp() {
                this.size = 0,
                this.__data__ = {
                    hash: new $i,
                    map: new (Os || Jr),
                    string: new $i
                }
            }
            function Up(e) {
                var t = Qn(this, e).delete(e);
                return this.size -= t ? 1 : 0,
                t
            }
            function Hp(e) {
                return Qn(this, e).get(e)
            }
            function kp(e) {
                return Qn(this, e).has(e)
            }
            function Kp(e, t) {
                var s = Qn(this, e)
                  , c = s.size;
                return s.set(e, t),
                this.size += s.size == c ? 0 : 1,
                this
            }
            Qr.prototype.clear = zp,
            Qr.prototype.delete = Up,
            Qr.prototype.get = Hp,
            Qr.prototype.has = kp,
            Qr.prototype.set = Kp;
            function Li(e) {
                var t = -1
                  , s = e == null ? 0 : e.length;
                for (this.__data__ = new Qr; ++t < s; )
                    this.add(e[t])
            }
            function Bp(e) {
                return this.__data__.set(e, _),
                this
            }
            function Fp(e) {
                return this.__data__.has(e)
            }
            Li.prototype.add = Li.prototype.push = Bp,
            Li.prototype.has = Fp;
            function Tr(e) {
                var t = this.__data__ = new Jr(e);
                this.size = t.size
            }
            function Vp() {
                this.__data__ = new Jr,
                this.size = 0
            }
            function Gp(e) {
                var t = this.__data__
                  , s = t.delete(e);
                return this.size = t.size,
                s
            }
            function Wp(e) {
                return this.__data__.get(e)
            }
            function Jp(e) {
                return this.__data__.has(e)
            }
            function Qp(e, t) {
                var s = this.__data__;
                if (s instanceof Jr) {
                    var c = s.__data__;
                    if (!Os || c.length < o - 1)
                        return c.push([e, t]),
                        this.size = ++s.size,
                        this;
                    s = this.__data__ = new Qr(c)
                }
                return s.set(e, t),
                this.size = s.size,
                this
            }
            Tr.prototype.clear = Vp,
            Tr.prototype.delete = Gp,
            Tr.prototype.get = Wp,
            Tr.prototype.has = Jp,
            Tr.prototype.set = Qp;
            function Zc(e, t) {
                var s = we(e)
                  , c = !s && Ui(e)
                  , l = !s && !c && bi(e)
                  , d = !s && !c && !l && ls(e)
                  , w = s || c || l || d
                  , b = w ? Zo(e.length, op) : []
                  , O = b.length;
                for (var M in e)
                    (t || ze.call(e, M)) && !(w && (M == "length" || l && (M == "offset" || M == "parent") || d && (M == "buffer" || M == "byteLength" || M == "byteOffset") || ei(M, O))) && b.push(M);
                return b
            }
            function eu(e) {
                var t = e.length;
                return t ? e[ya(0, t - 1)] : i
            }
            function Yp(e, t) {
                return Yn(sr(e), qi(t, 0, e.length))
            }
            function Xp(e) {
                return Yn(sr(e))
            }
            function oa(e, t, s) {
                (s !== i && !Nr(e[t], s) || s === i && !(t in e)) && Yr(e, t, s)
            }
            function Ts(e, t, s) {
                var c = e[t];
                (!(ze.call(e, t) && Nr(c, s)) || s === i && !(t in e)) && Yr(e, t, s)
            }
            function jn(e, t) {
                for (var s = e.length; s--; )
                    if (Nr(e[s][0], t))
                        return s;
                return -1
            }
            function Zp(e, t, s, c) {
                return vi(e, function(l, d, w) {
                    t(c, l, s(l), w)
                }),
                c
            }
            function tu(e, t) {
                return e && Kr(t, zt(t), e)
            }
            function ed(e, t) {
                return e && Kr(t, or(t), e)
            }
            function Yr(e, t, s) {
                t == "__proto__" && Nn ? Nn(e, t, {
                    configurable: !0,
                    enumerable: !0,
                    value: s,
                    writable: !0
                }) : e[t] = s
            }
            function aa(e, t) {
                for (var s = -1, c = t.length, l = N(c), d = e == null; ++s < c; )
                    l[s] = d ? i : Ha(e, t[s]);
                return l
            }
            function qi(e, t, s) {
                return e === e && (s !== i && (e = e <= s ? e : s),
                t !== i && (e = e >= t ? e : t)),
                e
            }
            function Er(e, t, s, c, l, d) {
                var w, b = t & R, O = t & A, M = t & z;
                if (s && (w = l ? s(e, c, l, d) : s(e)),
                w !== i)
                    return w;
                if (!ut(e))
                    return e;
                var j = we(e);
                if (j) {
                    if (w = kd(e),
                    !b)
                        return sr(e, w)
                } else {
                    var K = Vt(e)
                      , J = K == ee || K == ge;
                    if (bi(e))
                        return Pu(e, b);
                    if (K == Se || K == Ie || J && !l) {
                        if (w = O || J ? {} : Bu(e),
                        !b)
                            return O ? Td(e, ed(w, e)) : Ad(e, tu(w, e))
                    } else {
                        if (!ke[K])
                            return l ? e : {};
                        w = Kd(e, K, b)
                    }
                }
                d || (d = new Tr);
                var te = d.get(e);
                if (te)
                    return te;
                d.set(e, w),
                wh(e) ? e.forEach(function(ae) {
                    w.add(Er(ae, t, s, ae, e, d))
                }) : vh(e) && e.forEach(function(ae, Pe) {
                    w.set(Pe, Er(ae, t, s, Pe, e, d))
                });
                var oe = M ? O ? Oa : Sa : O ? or : zt
                  , Ee = j ? i : oe(e);
                return wr(Ee || e, function(ae, Pe) {
                    Ee && (Pe = ae,
                    ae = e[Pe]),
                    Ts(w, Pe, Er(ae, t, s, Pe, e, d))
                }),
                w
            }
            function td(e) {
                var t = zt(e);
                return function(s) {
                    return ru(s, e, t)
                }
            }
            function ru(e, t, s) {
                var c = s.length;
                if (e == null)
                    return !c;
                for (e = We(e); c--; ) {
                    var l = s[c]
                      , d = t[l]
                      , w = e[l];
                    if (w === i && !(l in e) || !d(w))
                        return !1
                }
                return !0
            }
            function iu(e, t, s) {
                if (typeof e != "function")
                    throw new _r(p);
                return js(function() {
                    e.apply(i, s)
                }, t)
            }
            function Ns(e, t, s, c) {
                var l = -1
                  , d = bn
                  , w = !0
                  , b = e.length
                  , O = []
                  , M = t.length;
                if (!b)
                    return O;
                s && (t = st(t, fr(s))),
                c ? (d = Go,
                w = !1) : t.length >= o && (d = Ps,
                w = !1,
                t = new Li(t));
                e: for (; ++l < b; ) {
                    var j = e[l]
                      , K = s == null ? j : s(j);
                    if (j = c || j !== 0 ? j : 0,
                    w && K === K) {
                        for (var J = M; J--; )
                            if (t[J] === K)
                                continue e;
                        O.push(j)
                    } else
                        d(t, K, c) || O.push(j)
                }
                return O
            }
            var vi = Au(kr)
              , su = Au(ua, !0);
            function rd(e, t) {
                var s = !0;
                return vi(e, function(c, l, d) {
                    return s = !!t(c, l, d),
                    s
                }),
                s
            }
            function zn(e, t, s) {
                for (var c = -1, l = e.length; ++c < l; ) {
                    var d = e[c]
                      , w = t(d);
                    if (w != null && (b === i ? w === w && !dr(w) : s(w, b)))
                        var b = w
                          , O = d
                }
                return O
            }
            function id(e, t, s, c) {
                var l = e.length;
                for (s = _e(s),
                s < 0 && (s = -s > l ? 0 : l + s),
                c = c === i || c > l ? l : _e(c),
                c < 0 && (c += l),
                c = s > c ? 0 : bh(c); s < c; )
                    e[s++] = t;
                return e
            }
            function nu(e, t) {
                var s = [];
                return vi(e, function(c, l, d) {
                    t(c, l, d) && s.push(c)
                }),
                s
            }
            function Kt(e, t, s, c, l) {
                var d = -1
                  , w = e.length;
                for (s || (s = Fd),
                l || (l = []); ++d < w; ) {
                    var b = e[d];
                    t > 0 && s(b) ? t > 1 ? Kt(b, t - 1, s, c, l) : di(l, b) : c || (l[l.length] = b)
                }
                return l
            }
            var ca = Tu()
              , ou = Tu(!0);
            function kr(e, t) {
                return e && ca(e, t, zt)
            }
            function ua(e, t) {
                return e && ou(e, t, zt)
            }
            function Un(e, t) {
                return pi(t, function(s) {
                    return ti(e[s])
                })
            }
            function Mi(e, t) {
                t = wi(t, e);
                for (var s = 0, c = t.length; e != null && s < c; )
                    e = e[Br(t[s++])];
                return s && s == c ? e : i
            }
            function au(e, t, s) {
                var c = t(e);
                return we(e) ? c : di(c, s(e))
            }
            function Xt(e) {
                return e == null ? e === i ? at : $e : Di && Di in We(e) ? zd(e) : Xd(e)
            }
            function ha(e, t) {
                return e > t
            }
            function sd(e, t) {
                return e != null && ze.call(e, t)
            }
            function nd(e, t) {
                return e != null && t in We(e)
            }
            function od(e, t, s) {
                return e >= Ft(t, s) && e < qt(t, s)
            }
            function la(e, t, s) {
                for (var c = s ? Go : bn, l = e[0].length, d = e.length, w = d, b = N(d), O = 1 / 0, M = []; w--; ) {
                    var j = e[w];
                    w && t && (j = st(j, fr(t))),
                    O = Ft(j.length, O),
                    b[w] = !s && (t || l >= 120 && j.length >= 120) ? new Li(w && j) : i
                }
                j = e[0];
                var K = -1
                  , J = b[0];
                e: for (; ++K < l && M.length < O; ) {
                    var te = j[K]
                      , oe = t ? t(te) : te;
                    if (te = s || te !== 0 ? te : 0,
                    !(J ? Ps(J, oe) : c(M, oe, s))) {
                        for (w = d; --w; ) {
                            var Ee = b[w];
                            if (!(Ee ? Ps(Ee, oe) : c(e[w], oe, s)))
                                continue e
                        }
                        J && J.push(oe),
                        M.push(te)
                    }
                }
                return M
            }
            function ad(e, t, s, c) {
                return kr(e, function(l, d, w) {
                    t(c, s(l), d, w)
                }),
                c
            }
            function Ds(e, t, s) {
                t = wi(t, e),
                e = Wu(e, t);
                var c = e == null ? e : e[Br(xr(t))];
                return c == null ? i : jt(c, e, s)
            }
            function cu(e) {
                return vt(e) && Xt(e) == Ie
            }
            function cd(e) {
                return vt(e) && Xt(e) == De
            }
            function ud(e) {
                return vt(e) && Xt(e) == C
            }
            function $s(e, t, s, c, l) {
                return e === t ? !0 : e == null || t == null || !vt(e) && !vt(t) ? e !== e && t !== t : hd(e, t, s, c, $s, l)
            }
            function hd(e, t, s, c, l, d) {
                var w = we(e)
                  , b = we(t)
                  , O = w ? It : Vt(e)
                  , M = b ? It : Vt(t);
                O = O == Ie ? Se : O,
                M = M == Ie ? Se : M;
                var j = O == Se
                  , K = M == Se
                  , J = O == M;
                if (J && bi(e)) {
                    if (!bi(t))
                        return !1;
                    w = !0,
                    j = !1
                }
                if (J && !j)
                    return d || (d = new Tr),
                    w || ls(e) ? Hu(e, t, s, c, l, d) : Md(e, t, O, s, c, l, d);
                if (!(s & T)) {
                    var te = j && ze.call(e, "__wrapped__")
                      , oe = K && ze.call(t, "__wrapped__");
                    if (te || oe) {
                        var Ee = te ? e.value() : e
                          , ae = oe ? t.value() : t;
                        return d || (d = new Tr),
                        l(Ee, ae, s, c, d)
                    }
                }
                return J ? (d || (d = new Tr),
                jd(e, t, s, c, l, d)) : !1
            }
            function ld(e) {
                return vt(e) && Vt(e) == be
            }
            function fa(e, t, s, c) {
                var l = s.length
                  , d = l
                  , w = !c;
                if (e == null)
                    return !d;
                for (e = We(e); l--; ) {
                    var b = s[l];
                    if (w && b[2] ? b[1] !== e[b[0]] : !(b[0]in e))
                        return !1
                }
                for (; ++l < d; ) {
                    b = s[l];
                    var O = b[0]
                      , M = e[O]
                      , j = b[1];
                    if (w && b[2]) {
                        if (M === i && !(O in e))
                            return !1
                    } else {
                        var K = new Tr;
                        if (c)
                            var J = c(M, j, O, e, t, K);
                        if (!(J === i ? $s(j, M, T | F, c, K) : J))
                            return !1
                    }
                }
                return !0
            }
            function uu(e) {
                if (!ut(e) || Gd(e))
                    return !1;
                var t = ti(e) ? lp : To;
                return t.test(zi(e))
            }
            function fd(e) {
                return vt(e) && Xt(e) == ot
            }
            function pd(e) {
                return vt(e) && Vt(e) == qe
            }
            function dd(e) {
                return vt(e) && io(e.length) && !!Fe[Xt(e)]
            }
            function hu(e) {
                return typeof e == "function" ? e : e == null ? ar : typeof e == "object" ? we(e) ? pu(e[0], e[1]) : fu(e) : Nh(e)
            }
            function pa(e) {
                if (!Ms(e))
                    return vp(e);
                var t = [];
                for (var s in We(e))
                    ze.call(e, s) && s != "constructor" && t.push(s);
                return t
            }
            function gd(e) {
                if (!ut(e))
                    return Yd(e);
                var t = Ms(e)
                  , s = [];
                for (var c in e)
                    c == "constructor" && (t || !ze.call(e, c)) || s.push(c);
                return s
            }
            function da(e, t) {
                return e < t
            }
            function lu(e, t) {
                var s = -1
                  , c = nr(e) ? N(e.length) : [];
                return vi(e, function(l, d, w) {
                    c[++s] = t(l, d, w)
                }),
                c
            }
            function fu(e) {
                var t = Ca(e);
                return t.length == 1 && t[0][2] ? Vu(t[0][0], t[0][1]) : function(s) {
                    return s === e || fa(s, e, t)
                }
            }
            function pu(e, t) {
                return Ta(e) && Fu(t) ? Vu(Br(e), t) : function(s) {
                    var c = Ha(s, e);
                    return c === i && c === t ? ka(s, e) : $s(t, c, T | F)
                }
            }
            function Hn(e, t, s, c, l) {
                e !== t && ca(t, function(d, w) {
                    if (l || (l = new Tr),
                    ut(d))
                        yd(e, t, w, s, Hn, c, l);
                    else {
                        var b = c ? c(Da(e, w), d, w + "", e, t, l) : i;
                        b === i && (b = d),
                        oa(e, w, b)
                    }
                }, or)
            }
            function yd(e, t, s, c, l, d, w) {
                var b = Da(e, s)
                  , O = Da(t, s)
                  , M = w.get(O);
                if (M) {
                    oa(e, s, M);
                    return
                }
                var j = d ? d(b, O, s + "", e, t, w) : i
                  , K = j === i;
                if (K) {
                    var J = we(O)
                      , te = !J && bi(O)
                      , oe = !J && !te && ls(O);
                    j = O,
                    J || te || oe ? we(b) ? j = b : bt(b) ? j = sr(b) : te ? (K = !1,
                    j = Pu(O, !0)) : oe ? (K = !1,
                    j = Su(O, !0)) : j = [] : zs(O) || Ui(O) ? (j = b,
                    Ui(b) ? j = Eh(b) : (!ut(b) || ti(b)) && (j = Bu(O))) : K = !1
                }
                K && (w.set(O, j),
                l(j, O, c, d, w),
                w.delete(O)),
                oa(e, s, j)
            }
            function du(e, t) {
                var s = e.length;
                if (s)
                    return t += t < 0 ? s : 0,
                    ei(t, s) ? e[t] : i
            }
            function gu(e, t, s) {
                t.length ? t = st(t, function(d) {
                    return we(d) ? function(w) {
                        return Mi(w, d.length === 1 ? d[0] : d)
                    }
                    : d
                }) : t = [ar];
                var c = -1;
                t = st(t, fr(ne()));
                var l = lu(e, function(d, w, b) {
                    var O = st(t, function(M) {
                        return M(d)
                    });
                    return {
                        criteria: O,
                        index: ++c,
                        value: d
                    }
                });
                return Kf(l, function(d, w) {
                    return Cd(d, w, s)
                })
            }
            function vd(e, t) {
                return yu(e, t, function(s, c) {
                    return ka(e, c)
                })
            }
            function yu(e, t, s) {
                for (var c = -1, l = t.length, d = {}; ++c < l; ) {
                    var w = t[c]
                      , b = Mi(e, w);
                    s(b, w) && Ls(d, wi(w, e), b)
                }
                return d
            }
            function md(e) {
                return function(t) {
                    return Mi(t, e)
                }
            }
            function ga(e, t, s, c) {
                var l = c ? kf : es
                  , d = -1
                  , w = t.length
                  , b = e;
                for (e === t && (t = sr(t)),
                s && (b = st(e, fr(s))); ++d < w; )
                    for (var O = 0, M = t[d], j = s ? s(M) : M; (O = l(b, j, O, c)) > -1; )
                        b !== e && Tn.call(b, O, 1),
                        Tn.call(e, O, 1);
                return e
            }
            function vu(e, t) {
                for (var s = e ? t.length : 0, c = s - 1; s--; ) {
                    var l = t[s];
                    if (s == c || l !== d) {
                        var d = l;
                        ei(l) ? Tn.call(e, l, 1) : wa(e, l)
                    }
                }
                return e
            }
            function ya(e, t) {
                return e + $n(Yc() * (t - e + 1))
            }
            function wd(e, t, s, c) {
                for (var l = -1, d = qt(Dn((t - e) / (s || 1)), 0), w = N(d); d--; )
                    w[c ? d : ++l] = e,
                    e += s;
                return w
            }
            function va(e, t) {
                var s = "";
                if (!e || t < 1 || t > V)
                    return s;
                do
                    t % 2 && (s += e),
                    t = $n(t / 2),
                    t && (e += e);
                while (t);
                return s
            }
            function xe(e, t) {
                return $a(Gu(e, t, ar), e + "")
            }
            function _d(e) {
                return eu(fs(e))
            }
            function bd(e, t) {
                var s = fs(e);
                return Yn(s, qi(t, 0, s.length))
            }
            function Ls(e, t, s, c) {
                if (!ut(e))
                    return e;
                t = wi(t, e);
                for (var l = -1, d = t.length, w = d - 1, b = e; b != null && ++l < d; ) {
                    var O = Br(t[l])
                      , M = s;
                    if (O === "__proto__" || O === "constructor" || O === "prototype")
                        return e;
                    if (l != w) {
                        var j = b[O];
                        M = c ? c(j, O, b) : i,
                        M === i && (M = ut(j) ? j : ei(t[l + 1]) ? [] : {})
                    }
                    Ts(b, O, M),
                    b = b[O]
                }
                return e
            }
            var mu = Ln ? function(e, t) {
                return Ln.set(e, t),
                e
            }
            : ar
              , Ed = Nn ? function(e, t) {
                return Nn(e, "toString", {
                    configurable: !0,
                    enumerable: !1,
                    value: Ba(t),
                    writable: !0
                })
            }
            : ar;
            function Id(e) {
                return Yn(fs(e))
            }
            function Ir(e, t, s) {
                var c = -1
                  , l = e.length;
                t < 0 && (t = -t > l ? 0 : l + t),
                s = s > l ? l : s,
                s < 0 && (s += l),
                l = t > s ? 0 : s - t >>> 0,
                t >>>= 0;
                for (var d = N(l); ++c < l; )
                    d[c] = e[c + t];
                return d
            }
            function xd(e, t) {
                var s;
                return vi(e, function(c, l, d) {
                    return s = t(c, l, d),
                    !s
                }),
                !!s
            }
            function kn(e, t, s) {
                var c = 0
                  , l = e == null ? c : e.length;
                if (typeof t == "number" && t === t && l <= Ke) {
                    for (; c < l; ) {
                        var d = c + l >>> 1
                          , w = e[d];
                        w !== null && !dr(w) && (s ? w <= t : w < t) ? c = d + 1 : l = d
                    }
                    return l
                }
                return ma(e, t, ar, s)
            }
            function ma(e, t, s, c) {
                var l = 0
                  , d = e == null ? 0 : e.length;
                if (d === 0)
                    return 0;
                t = s(t);
                for (var w = t !== t, b = t === null, O = dr(t), M = t === i; l < d; ) {
                    var j = $n((l + d) / 2)
                      , K = s(e[j])
                      , J = K !== i
                      , te = K === null
                      , oe = K === K
                      , Ee = dr(K);
                    if (w)
                        var ae = c || oe;
                    else
                        M ? ae = oe && (c || J) : b ? ae = oe && J && (c || !te) : O ? ae = oe && J && !te && (c || !Ee) : te || Ee ? ae = !1 : ae = c ? K <= t : K < t;
                    ae ? l = j + 1 : d = j
                }
                return Ft(d, Je)
            }
            function wu(e, t) {
                for (var s = -1, c = e.length, l = 0, d = []; ++s < c; ) {
                    var w = e[s]
                      , b = t ? t(w) : w;
                    if (!s || !Nr(b, O)) {
                        var O = b;
                        d[l++] = w === 0 ? 0 : w
                    }
                }
                return d
            }
            function _u(e) {
                return typeof e == "number" ? e : dr(e) ? B : +e
            }
            function pr(e) {
                if (typeof e == "string")
                    return e;
                if (we(e))
                    return st(e, pr) + "";
                if (dr(e))
                    return Xc ? Xc.call(e) : "";
                var t = e + "";
                return t == "0" && 1 / e == -ce ? "-0" : t
            }
            function mi(e, t, s) {
                var c = -1
                  , l = bn
                  , d = e.length
                  , w = !0
                  , b = []
                  , O = b;
                if (s)
                    w = !1,
                    l = Go;
                else if (d >= o) {
                    var M = t ? null : Ld(e);
                    if (M)
                        return In(M);
                    w = !1,
                    l = Ps,
                    O = new Li
                } else
                    O = t ? [] : b;
                e: for (; ++c < d; ) {
                    var j = e[c]
                      , K = t ? t(j) : j;
                    if (j = s || j !== 0 ? j : 0,
                    w && K === K) {
                        for (var J = O.length; J--; )
                            if (O[J] === K)
                                continue e;
                        t && O.push(K),
                        b.push(j)
                    } else
                        l(O, K, s) || (O !== b && O.push(K),
                        b.push(j))
                }
                return b
            }
            function wa(e, t) {
                return t = wi(t, e),
                e = Wu(e, t),
                e == null || delete e[Br(xr(t))]
            }
            function bu(e, t, s, c) {
                return Ls(e, t, s(Mi(e, t)), c)
            }
            function Kn(e, t, s, c) {
                for (var l = e.length, d = c ? l : -1; (c ? d-- : ++d < l) && t(e[d], d, e); )
                    ;
                return s ? Ir(e, c ? 0 : d, c ? d + 1 : l) : Ir(e, c ? d + 1 : 0, c ? l : d)
            }
            function Eu(e, t) {
                var s = e;
                return s instanceof Oe && (s = s.value()),
                Wo(t, function(c, l) {
                    return l.func.apply(l.thisArg, di([c], l.args))
                }, s)
            }
            function _a(e, t, s) {
                var c = e.length;
                if (c < 2)
                    return c ? mi(e[0]) : [];
                for (var l = -1, d = N(c); ++l < c; )
                    for (var w = e[l], b = -1; ++b < c; )
                        b != l && (d[l] = Ns(d[l] || w, e[b], t, s));
                return mi(Kt(d, 1), t, s)
            }
            function Iu(e, t, s) {
                for (var c = -1, l = e.length, d = t.length, w = {}; ++c < l; ) {
                    var b = c < d ? t[c] : i;
                    s(w, e[c], b)
                }
                return w
            }
            function ba(e) {
                return bt(e) ? e : []
            }
            function Ea(e) {
                return typeof e == "function" ? e : ar
            }
            function wi(e, t) {
                return we(e) ? e : Ta(e, t) ? [e] : Xu(Me(e))
            }
            var Pd = xe;
            function _i(e, t, s) {
                var c = e.length;
                return s = s === i ? c : s,
                !t && s >= c ? e : Ir(e, t, s)
            }
            var xu = fp || function(e) {
                return Ce.clearTimeout(e)
            }
            ;
            function Pu(e, t) {
                if (t)
                    return e.slice();
                var s = e.length
                  , c = Vc ? Vc(s) : new e.constructor(s);
                return e.copy(c),
                c
            }
            function Ia(e) {
                var t = new e.constructor(e.byteLength);
                return new Cn(t).set(new Cn(e)),
                t
            }
            function Sd(e, t) {
                var s = t ? Ia(e.buffer) : e.buffer;
                return new e.constructor(s,e.byteOffset,e.byteLength)
            }
            function Od(e) {
                var t = new e.constructor(e.source,vr.exec(e));
                return t.lastIndex = e.lastIndex,
                t
            }
            function Rd(e) {
                return As ? We(As.call(e)) : {}
            }
            function Su(e, t) {
                var s = t ? Ia(e.buffer) : e.buffer;
                return new e.constructor(s,e.byteOffset,e.length)
            }
            function Ou(e, t) {
                if (e !== t) {
                    var s = e !== i
                      , c = e === null
                      , l = e === e
                      , d = dr(e)
                      , w = t !== i
                      , b = t === null
                      , O = t === t
                      , M = dr(t);
                    if (!b && !M && !d && e > t || d && w && O && !b && !M || c && w && O || !s && O || !l)
                        return 1;
                    if (!c && !d && !M && e < t || M && s && l && !c && !d || b && s && l || !w && l || !O)
                        return -1
                }
                return 0
            }
            function Cd(e, t, s) {
                for (var c = -1, l = e.criteria, d = t.criteria, w = l.length, b = s.length; ++c < w; ) {
                    var O = Ou(l[c], d[c]);
                    if (O) {
                        if (c >= b)
                            return O;
                        var M = s[c];
                        return O * (M == "desc" ? -1 : 1)
                    }
                }
                return e.index - t.index
            }
            function Ru(e, t, s, c) {
                for (var l = -1, d = e.length, w = s.length, b = -1, O = t.length, M = qt(d - w, 0), j = N(O + M), K = !c; ++b < O; )
                    j[b] = t[b];
                for (; ++l < w; )
                    (K || l < d) && (j[s[l]] = e[l]);
                for (; M--; )
                    j[b++] = e[l++];
                return j
            }
            function Cu(e, t, s, c) {
                for (var l = -1, d = e.length, w = -1, b = s.length, O = -1, M = t.length, j = qt(d - b, 0), K = N(j + M), J = !c; ++l < j; )
                    K[l] = e[l];
                for (var te = l; ++O < M; )
                    K[te + O] = t[O];
                for (; ++w < b; )
                    (J || l < d) && (K[te + s[w]] = e[l++]);
                return K
            }
            function sr(e, t) {
                var s = -1
                  , c = e.length;
                for (t || (t = N(c)); ++s < c; )
                    t[s] = e[s];
                return t
            }
            function Kr(e, t, s, c) {
                var l = !s;
                s || (s = {});
                for (var d = -1, w = t.length; ++d < w; ) {
                    var b = t[d]
                      , O = c ? c(s[b], e[b], b, s, e) : i;
                    O === i && (O = e[b]),
                    l ? Yr(s, b, O) : Ts(s, b, O)
                }
                return s
            }
            function Ad(e, t) {
                return Kr(e, Aa(e), t)
            }
            function Td(e, t) {
                return Kr(e, ku(e), t)
            }
            function Bn(e, t) {
                return function(s, c) {
                    var l = we(s) ? qf : Zp
                      , d = t ? t() : {};
                    return l(s, e, ne(c, 2), d)
                }
            }
            function cs(e) {
                return xe(function(t, s) {
                    var c = -1
                      , l = s.length
                      , d = l > 1 ? s[l - 1] : i
                      , w = l > 2 ? s[2] : i;
                    for (d = e.length > 3 && typeof d == "function" ? (l--,
                    d) : i,
                    w && Zt(s[0], s[1], w) && (d = l < 3 ? i : d,
                    l = 1),
                    t = We(t); ++c < l; ) {
                        var b = s[c];
                        b && e(t, b, c, d)
                    }
                    return t
                })
            }
            function Au(e, t) {
                return function(s, c) {
                    if (s == null)
                        return s;
                    if (!nr(s))
                        return e(s, c);
                    for (var l = s.length, d = t ? l : -1, w = We(s); (t ? d-- : ++d < l) && c(w[d], d, w) !== !1; )
                        ;
                    return s
                }
            }
            function Tu(e) {
                return function(t, s, c) {
                    for (var l = -1, d = We(t), w = c(t), b = w.length; b--; ) {
                        var O = w[e ? b : ++l];
                        if (s(d[O], O, d) === !1)
                            break
                    }
                    return t
                }
            }
            function Nd(e, t, s) {
                var c = t & re
                  , l = qs(e);
                function d() {
                    var w = this && this !== Ce && this instanceof d ? l : e;
                    return w.apply(c ? s : this, arguments)
                }
                return d
            }
            function Nu(e) {
                return function(t) {
                    t = Me(t);
                    var s = ts(t) ? Ar(t) : i
                      , c = s ? s[0] : t.charAt(0)
                      , l = s ? _i(s, 1).join("") : t.slice(1);
                    return c[e]() + l
                }
            }
            function us(e) {
                return function(t) {
                    return Wo(Ah(Ch(t).replace(Is, "")), e, "")
                }
            }
            function qs(e) {
                return function() {
                    var t = arguments;
                    switch (t.length) {
                    case 0:
                        return new e;
                    case 1:
                        return new e(t[0]);
                    case 2:
                        return new e(t[0],t[1]);
                    case 3:
                        return new e(t[0],t[1],t[2]);
                    case 4:
                        return new e(t[0],t[1],t[2],t[3]);
                    case 5:
                        return new e(t[0],t[1],t[2],t[3],t[4]);
                    case 6:
                        return new e(t[0],t[1],t[2],t[3],t[4],t[5]);
                    case 7:
                        return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])
                    }
                    var s = as(e.prototype)
                      , c = e.apply(s, t);
                    return ut(c) ? c : s
                }
            }
            function Dd(e, t, s) {
                var c = qs(e);
                function l() {
                    for (var d = arguments.length, w = N(d), b = d, O = hs(l); b--; )
                        w[b] = arguments[b];
                    var M = d < 3 && w[0] !== O && w[d - 1] !== O ? [] : gi(w, O);
                    if (d -= M.length,
                    d < s)
                        return Mu(e, t, Fn, l.placeholder, i, w, M, i, i, s - d);
                    var j = this && this !== Ce && this instanceof l ? c : e;
                    return jt(j, this, w)
                }
                return l
            }
            function Du(e) {
                return function(t, s, c) {
                    var l = We(t);
                    if (!nr(t)) {
                        var d = ne(s, 3);
                        t = zt(t),
                        s = function(b) {
                            return d(l[b], b, l)
                        }
                    }
                    var w = e(t, s, c);
                    return w > -1 ? l[d ? t[w] : w] : i
                }
            }
            function $u(e) {
                return Zr(function(t) {
                    var s = t.length
                      , c = s
                      , l = br.prototype.thru;
                    for (e && t.reverse(); c--; ) {
                        var d = t[c];
                        if (typeof d != "function")
                            throw new _r(p);
                        if (l && !w && Jn(d) == "wrapper")
                            var w = new br([],!0)
                    }
                    for (c = w ? c : s; ++c < s; ) {
                        d = t[c];
                        var b = Jn(d)
                          , O = b == "wrapper" ? Ra(d) : i;
                        O && Na(O[0]) && O[1] == (H | fe | de | W) && !O[4].length && O[9] == 1 ? w = w[Jn(O[0])].apply(w, O[3]) : w = d.length == 1 && Na(d) ? w[b]() : w.thru(d)
                    }
                    return function() {
                        var M = arguments
                          , j = M[0];
                        if (w && M.length == 1 && we(j))
                            return w.plant(j).value();
                        for (var K = 0, J = s ? t[K].apply(this, M) : j; ++K < s; )
                            J = t[K].call(this, J);
                        return J
                    }
                })
            }
            function Fn(e, t, s, c, l, d, w, b, O, M) {
                var j = t & H
                  , K = t & re
                  , J = t & he
                  , te = t & (fe | pe)
                  , oe = t & ve
                  , Ee = J ? i : qs(e);
                function ae() {
                    for (var Pe = arguments.length, Ae = N(Pe), gr = Pe; gr--; )
                        Ae[gr] = arguments[gr];
                    if (te)
                        var er = hs(ae)
                          , yr = Ff(Ae, er);
                    if (c && (Ae = Ru(Ae, c, l, te)),
                    d && (Ae = Cu(Ae, d, w, te)),
                    Pe -= yr,
                    te && Pe < M) {
                        var Et = gi(Ae, er);
                        return Mu(e, t, Fn, ae.placeholder, s, Ae, Et, b, O, M - Pe)
                    }
                    var Dr = K ? s : this
                      , ii = J ? Dr[e] : e;
                    return Pe = Ae.length,
                    b ? Ae = Zd(Ae, b) : oe && Pe > 1 && Ae.reverse(),
                    j && O < Pe && (Ae.length = O),
                    this && this !== Ce && this instanceof ae && (ii = Ee || qs(ii)),
                    ii.apply(Dr, Ae)
                }
                return ae
            }
            function Lu(e, t) {
                return function(s, c) {
                    return ad(s, e, t(c), {})
                }
            }
            function Vn(e, t) {
                return function(s, c) {
                    var l;
                    if (s === i && c === i)
                        return t;
                    if (s !== i && (l = s),
                    c !== i) {
                        if (l === i)
                            return c;
                        typeof s == "string" || typeof c == "string" ? (s = pr(s),
                        c = pr(c)) : (s = _u(s),
                        c = _u(c)),
                        l = e(s, c)
                    }
                    return l
                }
            }
            function xa(e) {
                return Zr(function(t) {
                    return t = st(t, fr(ne())),
                    xe(function(s) {
                        var c = this;
                        return e(t, function(l) {
                            return jt(l, c, s)
                        })
                    })
                })
            }
            function Gn(e, t) {
                t = t === i ? " " : pr(t);
                var s = t.length;
                if (s < 2)
                    return s ? va(t, e) : t;
                var c = va(t, Dn(e / rs(t)));
                return ts(t) ? _i(Ar(c), 0, e).join("") : c.slice(0, e)
            }
            function $d(e, t, s, c) {
                var l = t & re
                  , d = qs(e);
                function w() {
                    for (var b = -1, O = arguments.length, M = -1, j = c.length, K = N(j + O), J = this && this !== Ce && this instanceof w ? d : e; ++M < j; )
                        K[M] = c[M];
                    for (; O--; )
                        K[M++] = arguments[++b];
                    return jt(J, l ? s : this, K)
                }
                return w
            }
            function qu(e) {
                return function(t, s, c) {
                    return c && typeof c != "number" && Zt(t, s, c) && (s = c = i),
                    t = ri(t),
                    s === i ? (s = t,
                    t = 0) : s = ri(s),
                    c = c === i ? t < s ? 1 : -1 : ri(c),
                    wd(t, s, c, e)
                }
            }
            function Wn(e) {
                return function(t, s) {
                    return typeof t == "string" && typeof s == "string" || (t = Pr(t),
                    s = Pr(s)),
                    e(t, s)
                }
            }
            function Mu(e, t, s, c, l, d, w, b, O, M) {
                var j = t & fe
                  , K = j ? w : i
                  , J = j ? i : w
                  , te = j ? d : i
                  , oe = j ? i : d;
                t |= j ? de : L,
                t &= ~(j ? L : de),
                t & le || (t &= ~(re | he));
                var Ee = [e, t, l, te, K, oe, J, b, O, M]
                  , ae = s.apply(i, Ee);
                return Na(e) && Ju(ae, Ee),
                ae.placeholder = c,
                Qu(ae, e, t)
            }
            function Pa(e) {
                var t = Lt[e];
                return function(s, c) {
                    if (s = Pr(s),
                    c = c == null ? 0 : Ft(_e(c), 292),
                    c && Qc(s)) {
                        var l = (Me(s) + "e").split("e")
                          , d = t(l[0] + "e" + (+l[1] + c));
                        return l = (Me(d) + "e").split("e"),
                        +(l[0] + "e" + (+l[1] - c))
                    }
                    return t(s)
                }
            }
            var Ld = ns && 1 / In(new ns([, -0]))[1] == ce ? function(e) {
                return new ns(e)
            }
            : Ga;
            function ju(e) {
                return function(t) {
                    var s = Vt(t);
                    return s == be ? ta(t) : s == qe ? Xf(t) : Bf(t, e(t))
                }
            }
            function Xr(e, t, s, c, l, d, w, b) {
                var O = t & he;
                if (!O && typeof e != "function")
                    throw new _r(p);
                var M = c ? c.length : 0;
                if (M || (t &= ~(de | L),
                c = l = i),
                w = w === i ? w : qt(_e(w), 0),
                b = b === i ? b : _e(b),
                M -= l ? l.length : 0,
                t & L) {
                    var j = c
                      , K = l;
                    c = l = i
                }
                var J = O ? i : Ra(e)
                  , te = [e, t, s, c, l, j, K, d, w, b];
                if (J && Qd(te, J),
                e = te[0],
                t = te[1],
                s = te[2],
                c = te[3],
                l = te[4],
                b = te[9] = te[9] === i ? O ? 0 : e.length : qt(te[9] - M, 0),
                !b && t & (fe | pe) && (t &= ~(fe | pe)),
                !t || t == re)
                    var oe = Nd(e, t, s);
                else
                    t == fe || t == pe ? oe = Dd(e, t, b) : (t == de || t == (re | de)) && !l.length ? oe = $d(e, t, s, c) : oe = Fn.apply(i, te);
                var Ee = J ? mu : Ju;
                return Qu(Ee(oe, te), e, t)
            }
            function zu(e, t, s, c) {
                return e === i || Nr(e, ss[s]) && !ze.call(c, s) ? t : e
            }
            function Uu(e, t, s, c, l, d) {
                return ut(e) && ut(t) && (d.set(t, e),
                Hn(e, t, i, Uu, d),
                d.delete(t)),
                e
            }
            function qd(e) {
                return zs(e) ? i : e
            }
            function Hu(e, t, s, c, l, d) {
                var w = s & T
                  , b = e.length
                  , O = t.length;
                if (b != O && !(w && O > b))
                    return !1;
                var M = d.get(e)
                  , j = d.get(t);
                if (M && j)
                    return M == t && j == e;
                var K = -1
                  , J = !0
                  , te = s & F ? new Li : i;
                for (d.set(e, t),
                d.set(t, e); ++K < b; ) {
                    var oe = e[K]
                      , Ee = t[K];
                    if (c)
                        var ae = w ? c(Ee, oe, K, t, e, d) : c(oe, Ee, K, e, t, d);
                    if (ae !== i) {
                        if (ae)
                            continue;
                        J = !1;
                        break
                    }
                    if (te) {
                        if (!Jo(t, function(Pe, Ae) {
                            if (!Ps(te, Ae) && (oe === Pe || l(oe, Pe, s, c, d)))
                                return te.push(Ae)
                        })) {
                            J = !1;
                            break
                        }
                    } else if (!(oe === Ee || l(oe, Ee, s, c, d))) {
                        J = !1;
                        break
                    }
                }
                return d.delete(e),
                d.delete(t),
                J
            }
            function Md(e, t, s, c, l, d, w) {
                switch (s) {
                case Be:
                    if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                        return !1;
                    e = e.buffer,
                    t = t.buffer;
                case De:
                    return !(e.byteLength != t.byteLength || !d(new Cn(e), new Cn(t)));
                case D:
                case C:
                case Ne:
                    return Nr(+e, +t);
                case E:
                    return e.name == t.name && e.message == t.message;
                case ot:
                case Ye:
                    return e == t + "";
                case be:
                    var b = ta;
                case qe:
                    var O = c & T;
                    if (b || (b = In),
                    e.size != t.size && !O)
                        return !1;
                    var M = w.get(e);
                    if (M)
                        return M == t;
                    c |= F,
                    w.set(e, t);
                    var j = Hu(b(e), b(t), c, l, d, w);
                    return w.delete(e),
                    j;
                case Xe:
                    if (As)
                        return As.call(e) == As.call(t)
                }
                return !1
            }
            function jd(e, t, s, c, l, d) {
                var w = s & T
                  , b = Sa(e)
                  , O = b.length
                  , M = Sa(t)
                  , j = M.length;
                if (O != j && !w)
                    return !1;
                for (var K = O; K--; ) {
                    var J = b[K];
                    if (!(w ? J in t : ze.call(t, J)))
                        return !1
                }
                var te = d.get(e)
                  , oe = d.get(t);
                if (te && oe)
                    return te == t && oe == e;
                var Ee = !0;
                d.set(e, t),
                d.set(t, e);
                for (var ae = w; ++K < O; ) {
                    J = b[K];
                    var Pe = e[J]
                      , Ae = t[J];
                    if (c)
                        var gr = w ? c(Ae, Pe, J, t, e, d) : c(Pe, Ae, J, e, t, d);
                    if (!(gr === i ? Pe === Ae || l(Pe, Ae, s, c, d) : gr)) {
                        Ee = !1;
                        break
                    }
                    ae || (ae = J == "constructor")
                }
                if (Ee && !ae) {
                    var er = e.constructor
                      , yr = t.constructor;
                    er != yr && "constructor"in e && "constructor"in t && !(typeof er == "function" && er instanceof er && typeof yr == "function" && yr instanceof yr) && (Ee = !1)
                }
                return d.delete(e),
                d.delete(t),
                Ee
            }
            function Zr(e) {
                return $a(Gu(e, i, rh), e + "")
            }
            function Sa(e) {
                return au(e, zt, Aa)
            }
            function Oa(e) {
                return au(e, or, ku)
            }
            var Ra = Ln ? function(e) {
                return Ln.get(e)
            }
            : Ga;
            function Jn(e) {
                for (var t = e.name + "", s = os[t], c = ze.call(os, t) ? s.length : 0; c--; ) {
                    var l = s[c]
                      , d = l.func;
                    if (d == null || d == e)
                        return l.name
                }
                return t
            }
            function hs(e) {
                var t = ze.call(f, "placeholder") ? f : e;
                return t.placeholder
            }
            function ne() {
                var e = f.iteratee || Fa;
                return e = e === Fa ? hu : e,
                arguments.length ? e(arguments[0], arguments[1]) : e
            }
            function Qn(e, t) {
                var s = e.__data__;
                return Vd(t) ? s[typeof t == "string" ? "string" : "hash"] : s.map
            }
            function Ca(e) {
                for (var t = zt(e), s = t.length; s--; ) {
                    var c = t[s]
                      , l = e[c];
                    t[s] = [c, l, Fu(l)]
                }
                return t
            }
            function ji(e, t) {
                var s = Jf(e, t);
                return uu(s) ? s : i
            }
            function zd(e) {
                var t = ze.call(e, Di)
                  , s = e[Di];
                try {
                    e[Di] = i;
                    var c = !0
                } catch {}
                var l = On.call(e);
                return c && (t ? e[Di] = s : delete e[Di]),
                l
            }
            var Aa = ia ? function(e) {
                return e == null ? [] : (e = We(e),
                pi(ia(e), function(t) {
                    return Wc.call(e, t)
                }))
            }
            : Wa
              , ku = ia ? function(e) {
                for (var t = []; e; )
                    di(t, Aa(e)),
                    e = An(e);
                return t
            }
            : Wa
              , Vt = Xt;
            (sa && Vt(new sa(new ArrayBuffer(1))) != Be || Os && Vt(new Os) != be || na && Vt(na.resolve()) != xt || ns && Vt(new ns) != qe || Rs && Vt(new Rs) != He) && (Vt = function(e) {
                var t = Xt(e)
                  , s = t == Se ? e.constructor : i
                  , c = s ? zi(s) : "";
                if (c)
                    switch (c) {
                    case bp:
                        return Be;
                    case Ep:
                        return be;
                    case Ip:
                        return xt;
                    case xp:
                        return qe;
                    case Pp:
                        return He
                    }
                return t
            }
            );
            function Ud(e, t, s) {
                for (var c = -1, l = s.length; ++c < l; ) {
                    var d = s[c]
                      , w = d.size;
                    switch (d.type) {
                    case "drop":
                        e += w;
                        break;
                    case "dropRight":
                        t -= w;
                        break;
                    case "take":
                        t = Ft(t, e + w);
                        break;
                    case "takeRight":
                        e = qt(e, t - w);
                        break
                    }
                }
                return {
                    start: e,
                    end: t
                }
            }
            function Hd(e) {
                var t = e.match(Qe);
                return t ? t[1].split(Ct) : []
            }
            function Ku(e, t, s) {
                t = wi(t, e);
                for (var c = -1, l = t.length, d = !1; ++c < l; ) {
                    var w = Br(t[c]);
                    if (!(d = e != null && s(e, w)))
                        break;
                    e = e[w]
                }
                return d || ++c != l ? d : (l = e == null ? 0 : e.length,
                !!l && io(l) && ei(w, l) && (we(e) || Ui(e)))
            }
            function kd(e) {
                var t = e.length
                  , s = new e.constructor(t);
                return t && typeof e[0] == "string" && ze.call(e, "index") && (s.index = e.index,
                s.input = e.input),
                s
            }
            function Bu(e) {
                return typeof e.constructor == "function" && !Ms(e) ? as(An(e)) : {}
            }
            function Kd(e, t, s) {
                var c = e.constructor;
                switch (t) {
                case De:
                    return Ia(e);
                case D:
                case C:
                    return new c(+e);
                case Be:
                    return Sd(e, s);
                case ht:
                case je:
                case Pt:
                case $t:
                case Ht:
                case kt:
                case Mt:
                case Jt:
                case rr:
                    return Su(e, s);
                case be:
                    return new c;
                case Ne:
                case Ye:
                    return new c(e);
                case ot:
                    return Od(e);
                case qe:
                    return new c;
                case Xe:
                    return Rd(e)
                }
            }
            function Bd(e, t) {
                var s = t.length;
                if (!s)
                    return e;
                var c = s - 1;
                return t[c] = (s > 1 ? "& " : "") + t[c],
                t = t.join(s > 2 ? ", " : " "),
                e.replace(yt, `{
/* [wrapped with ` + t + `] */
`)
            }
            function Fd(e) {
                return we(e) || Ui(e) || !!(Jc && e && e[Jc])
            }
            function ei(e, t) {
                var s = typeof e;
                return t = t ?? V,
                !!t && (s == "number" || s != "symbol" && Do.test(e)) && e > -1 && e % 1 == 0 && e < t
            }
            function Zt(e, t, s) {
                if (!ut(s))
                    return !1;
                var c = typeof t;
                return (c == "number" ? nr(s) && ei(t, s.length) : c == "string" && t in s) ? Nr(s[t], e) : !1
            }
            function Ta(e, t) {
                if (we(e))
                    return !1;
                var s = typeof e;
                return s == "number" || s == "symbol" || s == "boolean" || e == null || dr(e) ? !0 : St.test(e) || !it.test(e) || t != null && e in We(t)
            }
            function Vd(e) {
                var t = typeof e;
                return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null
            }
            function Na(e) {
                var t = Jn(e)
                  , s = f[t];
                if (typeof s != "function" || !(t in Oe.prototype))
                    return !1;
                if (e === s)
                    return !0;
                var c = Ra(s);
                return !!c && e === c[0]
            }
            function Gd(e) {
                return !!Fc && Fc in e
            }
            var Wd = Pn ? ti : Ja;
            function Ms(e) {
                var t = e && e.constructor
                  , s = typeof t == "function" && t.prototype || ss;
                return e === s
            }
            function Fu(e) {
                return e === e && !ut(e)
            }
            function Vu(e, t) {
                return function(s) {
                    return s == null ? !1 : s[e] === t && (t !== i || e in We(s))
                }
            }
            function Jd(e) {
                var t = to(e, function(c) {
                    return s.size === v && s.clear(),
                    c
                })
                  , s = t.cache;
                return t
            }
            function Qd(e, t) {
                var s = e[1]
                  , c = t[1]
                  , l = s | c
                  , d = l < (re | he | H)
                  , w = c == H && s == fe || c == H && s == W && e[7].length <= t[8] || c == (H | W) && t[7].length <= t[8] && s == fe;
                if (!(d || w))
                    return e;
                c & re && (e[2] = t[2],
                l |= s & re ? 0 : le);
                var b = t[3];
                if (b) {
                    var O = e[3];
                    e[3] = O ? Ru(O, b, t[4]) : b,
                    e[4] = O ? gi(e[3], I) : t[4]
                }
                return b = t[5],
                b && (O = e[5],
                e[5] = O ? Cu(O, b, t[6]) : b,
                e[6] = O ? gi(e[5], I) : t[6]),
                b = t[7],
                b && (e[7] = b),
                c & H && (e[8] = e[8] == null ? t[8] : Ft(e[8], t[8])),
                e[9] == null && (e[9] = t[9]),
                e[0] = t[0],
                e[1] = l,
                e
            }
            function Yd(e) {
                var t = [];
                if (e != null)
                    for (var s in We(e))
                        t.push(s);
                return t
            }
            function Xd(e) {
                return On.call(e)
            }
            function Gu(e, t, s) {
                return t = qt(t === i ? e.length - 1 : t, 0),
                function() {
                    for (var c = arguments, l = -1, d = qt(c.length - t, 0), w = N(d); ++l < d; )
                        w[l] = c[t + l];
                    l = -1;
                    for (var b = N(t + 1); ++l < t; )
                        b[l] = c[l];
                    return b[t] = s(w),
                    jt(e, this, b)
                }
            }
            function Wu(e, t) {
                return t.length < 2 ? e : Mi(e, Ir(t, 0, -1))
            }
            function Zd(e, t) {
                for (var s = e.length, c = Ft(t.length, s), l = sr(e); c--; ) {
                    var d = t[c];
                    e[c] = ei(d, s) ? l[d] : i
                }
                return e
            }
            function Da(e, t) {
                if (!(t === "constructor" && typeof e[t] == "function") && t != "__proto__")
                    return e[t]
            }
            var Ju = Yu(mu)
              , js = dp || function(e, t) {
                return Ce.setTimeout(e, t)
            }
              , $a = Yu(Ed);
            function Qu(e, t, s) {
                var c = t + "";
                return $a(e, Bd(c, eg(Hd(c), s)))
            }
            function Yu(e) {
                var t = 0
                  , s = 0;
                return function() {
                    var c = mp()
                      , l = Ue - (c - s);
                    if (s = c,
                    l > 0) {
                        if (++t >= Te)
                            return arguments[0]
                    } else
                        t = 0;
                    return e.apply(i, arguments)
                }
            }
            function Yn(e, t) {
                var s = -1
                  , c = e.length
                  , l = c - 1;
                for (t = t === i ? c : t; ++s < t; ) {
                    var d = ya(s, l)
                      , w = e[d];
                    e[d] = e[s],
                    e[s] = w
                }
                return e.length = t,
                e
            }
            var Xu = Jd(function(e) {
                var t = [];
                return e.charCodeAt(0) === 46 && t.push(""),
                e.replace(Ot, function(s, c, l, d) {
                    t.push(l ? d.replace(Oo, "$1") : c || s)
                }),
                t
            });
            function Br(e) {
                if (typeof e == "string" || dr(e))
                    return e;
                var t = e + "";
                return t == "0" && 1 / e == -ce ? "-0" : t
            }
            function zi(e) {
                if (e != null) {
                    try {
                        return Sn.call(e)
                    } catch {}
                    try {
                        return e + ""
                    } catch {}
                }
                return ""
            }
            function eg(e, t) {
                return wr(jr, function(s) {
                    var c = "_." + s[0];
                    t & s[1] && !bn(e, c) && e.push(c)
                }),
                e.sort()
            }
            function Zu(e) {
                if (e instanceof Oe)
                    return e.clone();
                var t = new br(e.__wrapped__,e.__chain__);
                return t.__actions__ = sr(e.__actions__),
                t.__index__ = e.__index__,
                t.__values__ = e.__values__,
                t
            }
            function tg(e, t, s) {
                (s ? Zt(e, t, s) : t === i) ? t = 1 : t = qt(_e(t), 0);
                var c = e == null ? 0 : e.length;
                if (!c || t < 1)
                    return [];
                for (var l = 0, d = 0, w = N(Dn(c / t)); l < c; )
                    w[d++] = Ir(e, l, l += t);
                return w
            }
            function rg(e) {
                for (var t = -1, s = e == null ? 0 : e.length, c = 0, l = []; ++t < s; ) {
                    var d = e[t];
                    d && (l[c++] = d)
                }
                return l
            }
            function ig() {
                var e = arguments.length;
                if (!e)
                    return [];
                for (var t = N(e - 1), s = arguments[0], c = e; c--; )
                    t[c - 1] = arguments[c];
                return di(we(s) ? sr(s) : [s], Kt(t, 1))
            }
            var sg = xe(function(e, t) {
                return bt(e) ? Ns(e, Kt(t, 1, bt, !0)) : []
            })
              , ng = xe(function(e, t) {
                var s = xr(t);
                return bt(s) && (s = i),
                bt(e) ? Ns(e, Kt(t, 1, bt, !0), ne(s, 2)) : []
            })
              , og = xe(function(e, t) {
                var s = xr(t);
                return bt(s) && (s = i),
                bt(e) ? Ns(e, Kt(t, 1, bt, !0), i, s) : []
            });
            function ag(e, t, s) {
                var c = e == null ? 0 : e.length;
                return c ? (t = s || t === i ? 1 : _e(t),
                Ir(e, t < 0 ? 0 : t, c)) : []
            }
            function cg(e, t, s) {
                var c = e == null ? 0 : e.length;
                return c ? (t = s || t === i ? 1 : _e(t),
                t = c - t,
                Ir(e, 0, t < 0 ? 0 : t)) : []
            }
            function ug(e, t) {
                return e && e.length ? Kn(e, ne(t, 3), !0, !0) : []
            }
            function hg(e, t) {
                return e && e.length ? Kn(e, ne(t, 3), !0) : []
            }
            function lg(e, t, s, c) {
                var l = e == null ? 0 : e.length;
                return l ? (s && typeof s != "number" && Zt(e, t, s) && (s = 0,
                c = l),
                id(e, t, s, c)) : []
            }
            function eh(e, t, s) {
                var c = e == null ? 0 : e.length;
                if (!c)
                    return -1;
                var l = s == null ? 0 : _e(s);
                return l < 0 && (l = qt(c + l, 0)),
                En(e, ne(t, 3), l)
            }
            function th(e, t, s) {
                var c = e == null ? 0 : e.length;
                if (!c)
                    return -1;
                var l = c - 1;
                return s !== i && (l = _e(s),
                l = s < 0 ? qt(c + l, 0) : Ft(l, c - 1)),
                En(e, ne(t, 3), l, !0)
            }
            function rh(e) {
                var t = e == null ? 0 : e.length;
                return t ? Kt(e, 1) : []
            }
            function fg(e) {
                var t = e == null ? 0 : e.length;
                return t ? Kt(e, ce) : []
            }
            function pg(e, t) {
                var s = e == null ? 0 : e.length;
                return s ? (t = t === i ? 1 : _e(t),
                Kt(e, t)) : []
            }
            function dg(e) {
                for (var t = -1, s = e == null ? 0 : e.length, c = {}; ++t < s; ) {
                    var l = e[t];
                    c[l[0]] = l[1]
                }
                return c
            }
            function ih(e) {
                return e && e.length ? e[0] : i
            }
            function gg(e, t, s) {
                var c = e == null ? 0 : e.length;
                if (!c)
                    return -1;
                var l = s == null ? 0 : _e(s);
                return l < 0 && (l = qt(c + l, 0)),
                es(e, t, l)
            }
            function yg(e) {
                var t = e == null ? 0 : e.length;
                return t ? Ir(e, 0, -1) : []
            }
            var vg = xe(function(e) {
                var t = st(e, ba);
                return t.length && t[0] === e[0] ? la(t) : []
            })
              , mg = xe(function(e) {
                var t = xr(e)
                  , s = st(e, ba);
                return t === xr(s) ? t = i : s.pop(),
                s.length && s[0] === e[0] ? la(s, ne(t, 2)) : []
            })
              , wg = xe(function(e) {
                var t = xr(e)
                  , s = st(e, ba);
                return t = typeof t == "function" ? t : i,
                t && s.pop(),
                s.length && s[0] === e[0] ? la(s, i, t) : []
            });
            function _g(e, t) {
                return e == null ? "" : yp.call(e, t)
            }
            function xr(e) {
                var t = e == null ? 0 : e.length;
                return t ? e[t - 1] : i
            }
            function bg(e, t, s) {
                var c = e == null ? 0 : e.length;
                if (!c)
                    return -1;
                var l = c;
                return s !== i && (l = _e(s),
                l = l < 0 ? qt(c + l, 0) : Ft(l, c - 1)),
                t === t ? ep(e, t, l) : En(e, Mc, l, !0)
            }
            function Eg(e, t) {
                return e && e.length ? du(e, _e(t)) : i
            }
            var Ig = xe(sh);
            function sh(e, t) {
                return e && e.length && t && t.length ? ga(e, t) : e
            }
            function xg(e, t, s) {
                return e && e.length && t && t.length ? ga(e, t, ne(s, 2)) : e
            }
            function Pg(e, t, s) {
                return e && e.length && t && t.length ? ga(e, t, i, s) : e
            }
            var Sg = Zr(function(e, t) {
                var s = e == null ? 0 : e.length
                  , c = aa(e, t);
                return vu(e, st(t, function(l) {
                    return ei(l, s) ? +l : l
                }).sort(Ou)),
                c
            });
            function Og(e, t) {
                var s = [];
                if (!(e && e.length))
                    return s;
                var c = -1
                  , l = []
                  , d = e.length;
                for (t = ne(t, 3); ++c < d; ) {
                    var w = e[c];
                    t(w, c, e) && (s.push(w),
                    l.push(c))
                }
                return vu(e, l),
                s
            }
            function La(e) {
                return e == null ? e : _p.call(e)
            }
            function Rg(e, t, s) {
                var c = e == null ? 0 : e.length;
                return c ? (s && typeof s != "number" && Zt(e, t, s) ? (t = 0,
                s = c) : (t = t == null ? 0 : _e(t),
                s = s === i ? c : _e(s)),
                Ir(e, t, s)) : []
            }
            function Cg(e, t) {
                return kn(e, t)
            }
            function Ag(e, t, s) {
                return ma(e, t, ne(s, 2))
            }
            function Tg(e, t) {
                var s = e == null ? 0 : e.length;
                if (s) {
                    var c = kn(e, t);
                    if (c < s && Nr(e[c], t))
                        return c
                }
                return -1
            }
            function Ng(e, t) {
                return kn(e, t, !0)
            }
            function Dg(e, t, s) {
                return ma(e, t, ne(s, 2), !0)
            }
            function $g(e, t) {
                var s = e == null ? 0 : e.length;
                if (s) {
                    var c = kn(e, t, !0) - 1;
                    if (Nr(e[c], t))
                        return c
                }
                return -1
            }
            function Lg(e) {
                return e && e.length ? wu(e) : []
            }
            function qg(e, t) {
                return e && e.length ? wu(e, ne(t, 2)) : []
            }
            function Mg(e) {
                var t = e == null ? 0 : e.length;
                return t ? Ir(e, 1, t) : []
            }
            function jg(e, t, s) {
                return e && e.length ? (t = s || t === i ? 1 : _e(t),
                Ir(e, 0, t < 0 ? 0 : t)) : []
            }
            function zg(e, t, s) {
                var c = e == null ? 0 : e.length;
                return c ? (t = s || t === i ? 1 : _e(t),
                t = c - t,
                Ir(e, t < 0 ? 0 : t, c)) : []
            }
            function Ug(e, t) {
                return e && e.length ? Kn(e, ne(t, 3), !1, !0) : []
            }
            function Hg(e, t) {
                return e && e.length ? Kn(e, ne(t, 3)) : []
            }
            var kg = xe(function(e) {
                return mi(Kt(e, 1, bt, !0))
            })
              , Kg = xe(function(e) {
                var t = xr(e);
                return bt(t) && (t = i),
                mi(Kt(e, 1, bt, !0), ne(t, 2))
            })
              , Bg = xe(function(e) {
                var t = xr(e);
                return t = typeof t == "function" ? t : i,
                mi(Kt(e, 1, bt, !0), i, t)
            });
            function Fg(e) {
                return e && e.length ? mi(e) : []
            }
            function Vg(e, t) {
                return e && e.length ? mi(e, ne(t, 2)) : []
            }
            function Gg(e, t) {
                return t = typeof t == "function" ? t : i,
                e && e.length ? mi(e, i, t) : []
            }
            function qa(e) {
                if (!(e && e.length))
                    return [];
                var t = 0;
                return e = pi(e, function(s) {
                    if (bt(s))
                        return t = qt(s.length, t),
                        !0
                }),
                Zo(t, function(s) {
                    return st(e, Qo(s))
                })
            }
            function nh(e, t) {
                if (!(e && e.length))
                    return [];
                var s = qa(e);
                return t == null ? s : st(s, function(c) {
                    return jt(t, i, c)
                })
            }
            var Wg = xe(function(e, t) {
                return bt(e) ? Ns(e, t) : []
            })
              , Jg = xe(function(e) {
                return _a(pi(e, bt))
            })
              , Qg = xe(function(e) {
                var t = xr(e);
                return bt(t) && (t = i),
                _a(pi(e, bt), ne(t, 2))
            })
              , Yg = xe(function(e) {
                var t = xr(e);
                return t = typeof t == "function" ? t : i,
                _a(pi(e, bt), i, t)
            })
              , Xg = xe(qa);
            function Zg(e, t) {
                return Iu(e || [], t || [], Ts)
            }
            function ey(e, t) {
                return Iu(e || [], t || [], Ls)
            }
            var ty = xe(function(e) {
                var t = e.length
                  , s = t > 1 ? e[t - 1] : i;
                return s = typeof s == "function" ? (e.pop(),
                s) : i,
                nh(e, s)
            });
            function oh(e) {
                var t = f(e);
                return t.__chain__ = !0,
                t
            }
            function ry(e, t) {
                return t(e),
                e
            }
            function Xn(e, t) {
                return t(e)
            }
            var iy = Zr(function(e) {
                var t = e.length
                  , s = t ? e[0] : 0
                  , c = this.__wrapped__
                  , l = function(d) {
                    return aa(d, e)
                };
                return t > 1 || this.__actions__.length || !(c instanceof Oe) || !ei(s) ? this.thru(l) : (c = c.slice(s, +s + (t ? 1 : 0)),
                c.__actions__.push({
                    func: Xn,
                    args: [l],
                    thisArg: i
                }),
                new br(c,this.__chain__).thru(function(d) {
                    return t && !d.length && d.push(i),
                    d
                }))
            });
            function sy() {
                return oh(this)
            }
            function ny() {
                return new br(this.value(),this.__chain__)
            }
            function oy() {
                this.__values__ === i && (this.__values__ = _h(this.value()));
                var e = this.__index__ >= this.__values__.length
                  , t = e ? i : this.__values__[this.__index__++];
                return {
                    done: e,
                    value: t
                }
            }
            function ay() {
                return this
            }
            function cy(e) {
                for (var t, s = this; s instanceof Mn; ) {
                    var c = Zu(s);
                    c.__index__ = 0,
                    c.__values__ = i,
                    t ? l.__wrapped__ = c : t = c;
                    var l = c;
                    s = s.__wrapped__
                }
                return l.__wrapped__ = e,
                t
            }
            function uy() {
                var e = this.__wrapped__;
                if (e instanceof Oe) {
                    var t = e;
                    return this.__actions__.length && (t = new Oe(this)),
                    t = t.reverse(),
                    t.__actions__.push({
                        func: Xn,
                        args: [La],
                        thisArg: i
                    }),
                    new br(t,this.__chain__)
                }
                return this.thru(La)
            }
            function hy() {
                return Eu(this.__wrapped__, this.__actions__)
            }
            var ly = Bn(function(e, t, s) {
                ze.call(e, s) ? ++e[s] : Yr(e, s, 1)
            });
            function fy(e, t, s) {
                var c = we(e) ? Lc : rd;
                return s && Zt(e, t, s) && (t = i),
                c(e, ne(t, 3))
            }
            function py(e, t) {
                var s = we(e) ? pi : nu;
                return s(e, ne(t, 3))
            }
            var dy = Du(eh)
              , gy = Du(th);
            function yy(e, t) {
                return Kt(Zn(e, t), 1)
            }
            function vy(e, t) {
                return Kt(Zn(e, t), ce)
            }
            function my(e, t, s) {
                return s = s === i ? 1 : _e(s),
                Kt(Zn(e, t), s)
            }
            function ah(e, t) {
                var s = we(e) ? wr : vi;
                return s(e, ne(t, 3))
            }
            function ch(e, t) {
                var s = we(e) ? Mf : su;
                return s(e, ne(t, 3))
            }
            var wy = Bn(function(e, t, s) {
                ze.call(e, s) ? e[s].push(t) : Yr(e, s, [t])
            });
            function _y(e, t, s, c) {
                e = nr(e) ? e : fs(e),
                s = s && !c ? _e(s) : 0;
                var l = e.length;
                return s < 0 && (s = qt(l + s, 0)),
                so(e) ? s <= l && e.indexOf(t, s) > -1 : !!l && es(e, t, s) > -1
            }
            var by = xe(function(e, t, s) {
                var c = -1
                  , l = typeof t == "function"
                  , d = nr(e) ? N(e.length) : [];
                return vi(e, function(w) {
                    d[++c] = l ? jt(t, w, s) : Ds(w, t, s)
                }),
                d
            })
              , Ey = Bn(function(e, t, s) {
                Yr(e, s, t)
            });
            function Zn(e, t) {
                var s = we(e) ? st : lu;
                return s(e, ne(t, 3))
            }
            function Iy(e, t, s, c) {
                return e == null ? [] : (we(t) || (t = t == null ? [] : [t]),
                s = c ? i : s,
                we(s) || (s = s == null ? [] : [s]),
                gu(e, t, s))
            }
            var xy = Bn(function(e, t, s) {
                e[s ? 0 : 1].push(t)
            }, function() {
                return [[], []]
            });
            function Py(e, t, s) {
                var c = we(e) ? Wo : zc
                  , l = arguments.length < 3;
                return c(e, ne(t, 4), s, l, vi)
            }
            function Sy(e, t, s) {
                var c = we(e) ? jf : zc
                  , l = arguments.length < 3;
                return c(e, ne(t, 4), s, l, su)
            }
            function Oy(e, t) {
                var s = we(e) ? pi : nu;
                return s(e, ro(ne(t, 3)))
            }
            function Ry(e) {
                var t = we(e) ? eu : _d;
                return t(e)
            }
            function Cy(e, t, s) {
                (s ? Zt(e, t, s) : t === i) ? t = 1 : t = _e(t);
                var c = we(e) ? Yp : bd;
                return c(e, t)
            }
            function Ay(e) {
                var t = we(e) ? Xp : Id;
                return t(e)
            }
            function Ty(e) {
                if (e == null)
                    return 0;
                if (nr(e))
                    return so(e) ? rs(e) : e.length;
                var t = Vt(e);
                return t == be || t == qe ? e.size : pa(e).length
            }
            function Ny(e, t, s) {
                var c = we(e) ? Jo : xd;
                return s && Zt(e, t, s) && (t = i),
                c(e, ne(t, 3))
            }
            var Dy = xe(function(e, t) {
                if (e == null)
                    return [];
                var s = t.length;
                return s > 1 && Zt(e, t[0], t[1]) ? t = [] : s > 2 && Zt(t[0], t[1], t[2]) && (t = [t[0]]),
                gu(e, Kt(t, 1), [])
            })
              , eo = pp || function() {
                return Ce.Date.now()
            }
            ;
            function $y(e, t) {
                if (typeof t != "function")
                    throw new _r(p);
                return e = _e(e),
                function() {
                    if (--e < 1)
                        return t.apply(this, arguments)
                }
            }
            function uh(e, t, s) {
                return t = s ? i : t,
                t = e && t == null ? e.length : t,
                Xr(e, H, i, i, i, i, t)
            }
            function hh(e, t) {
                var s;
                if (typeof t != "function")
                    throw new _r(p);
                return e = _e(e),
                function() {
                    return --e > 0 && (s = t.apply(this, arguments)),
                    e <= 1 && (t = i),
                    s
                }
            }
            var Ma = xe(function(e, t, s) {
                var c = re;
                if (s.length) {
                    var l = gi(s, hs(Ma));
                    c |= de
                }
                return Xr(e, c, t, s, l)
            })
              , lh = xe(function(e, t, s) {
                var c = re | he;
                if (s.length) {
                    var l = gi(s, hs(lh));
                    c |= de
                }
                return Xr(t, c, e, s, l)
            });
            function fh(e, t, s) {
                t = s ? i : t;
                var c = Xr(e, fe, i, i, i, i, i, t);
                return c.placeholder = fh.placeholder,
                c
            }
            function ph(e, t, s) {
                t = s ? i : t;
                var c = Xr(e, pe, i, i, i, i, i, t);
                return c.placeholder = ph.placeholder,
                c
            }
            function dh(e, t, s) {
                var c, l, d, w, b, O, M = 0, j = !1, K = !1, J = !0;
                if (typeof e != "function")
                    throw new _r(p);
                t = Pr(t) || 0,
                ut(s) && (j = !!s.leading,
                K = "maxWait"in s,
                d = K ? qt(Pr(s.maxWait) || 0, t) : d,
                J = "trailing"in s ? !!s.trailing : J);
                function te(Et) {
                    var Dr = c
                      , ii = l;
                    return c = l = i,
                    M = Et,
                    w = e.apply(ii, Dr),
                    w
                }
                function oe(Et) {
                    return M = Et,
                    b = js(Pe, t),
                    j ? te(Et) : w
                }
                function Ee(Et) {
                    var Dr = Et - O
                      , ii = Et - M
                      , Dh = t - Dr;
                    return K ? Ft(Dh, d - ii) : Dh
                }
                function ae(Et) {
                    var Dr = Et - O
                      , ii = Et - M;
                    return O === i || Dr >= t || Dr < 0 || K && ii >= d
                }
                function Pe() {
                    var Et = eo();
                    if (ae(Et))
                        return Ae(Et);
                    b = js(Pe, Ee(Et))
                }
                function Ae(Et) {
                    return b = i,
                    J && c ? te(Et) : (c = l = i,
                    w)
                }
                function gr() {
                    b !== i && xu(b),
                    M = 0,
                    c = O = l = b = i
                }
                function er() {
                    return b === i ? w : Ae(eo())
                }
                function yr() {
                    var Et = eo()
                      , Dr = ae(Et);
                    if (c = arguments,
                    l = this,
                    O = Et,
                    Dr) {
                        if (b === i)
                            return oe(O);
                        if (K)
                            return xu(b),
                            b = js(Pe, t),
                            te(O)
                    }
                    return b === i && (b = js(Pe, t)),
                    w
                }
                return yr.cancel = gr,
                yr.flush = er,
                yr
            }
            var Ly = xe(function(e, t) {
                return iu(e, 1, t)
            })
              , qy = xe(function(e, t, s) {
                return iu(e, Pr(t) || 0, s)
            });
            function My(e) {
                return Xr(e, ve)
            }
            function to(e, t) {
                if (typeof e != "function" || t != null && typeof t != "function")
                    throw new _r(p);
                var s = function() {
                    var c = arguments
                      , l = t ? t.apply(this, c) : c[0]
                      , d = s.cache;
                    if (d.has(l))
                        return d.get(l);
                    var w = e.apply(this, c);
                    return s.cache = d.set(l, w) || d,
                    w
                };
                return s.cache = new (to.Cache || Qr),
                s
            }
            to.Cache = Qr;
            function ro(e) {
                if (typeof e != "function")
                    throw new _r(p);
                return function() {
                    var t = arguments;
                    switch (t.length) {
                    case 0:
                        return !e.call(this);
                    case 1:
                        return !e.call(this, t[0]);
                    case 2:
                        return !e.call(this, t[0], t[1]);
                    case 3:
                        return !e.call(this, t[0], t[1], t[2])
                    }
                    return !e.apply(this, t)
                }
            }
            function jy(e) {
                return hh(2, e)
            }
            var zy = Pd(function(e, t) {
                t = t.length == 1 && we(t[0]) ? st(t[0], fr(ne())) : st(Kt(t, 1), fr(ne()));
                var s = t.length;
                return xe(function(c) {
                    for (var l = -1, d = Ft(c.length, s); ++l < d; )
                        c[l] = t[l].call(this, c[l]);
                    return jt(e, this, c)
                })
            })
              , ja = xe(function(e, t) {
                var s = gi(t, hs(ja));
                return Xr(e, de, i, t, s)
            })
              , gh = xe(function(e, t) {
                var s = gi(t, hs(gh));
                return Xr(e, L, i, t, s)
            })
              , Uy = Zr(function(e, t) {
                return Xr(e, W, i, i, i, t)
            });
            function Hy(e, t) {
                if (typeof e != "function")
                    throw new _r(p);
                return t = t === i ? t : _e(t),
                xe(e, t)
            }
            function ky(e, t) {
                if (typeof e != "function")
                    throw new _r(p);
                return t = t == null ? 0 : qt(_e(t), 0),
                xe(function(s) {
                    var c = s[t]
                      , l = _i(s, 0, t);
                    return c && di(l, c),
                    jt(e, this, l)
                })
            }
            function Ky(e, t, s) {
                var c = !0
                  , l = !0;
                if (typeof e != "function")
                    throw new _r(p);
                return ut(s) && (c = "leading"in s ? !!s.leading : c,
                l = "trailing"in s ? !!s.trailing : l),
                dh(e, t, {
                    leading: c,
                    maxWait: t,
                    trailing: l
                })
            }
            function By(e) {
                return uh(e, 1)
            }
            function Fy(e, t) {
                return ja(Ea(t), e)
            }
            function Vy() {
                if (!arguments.length)
                    return [];
                var e = arguments[0];
                return we(e) ? e : [e]
            }
            function Gy(e) {
                return Er(e, z)
            }
            function Wy(e, t) {
                return t = typeof t == "function" ? t : i,
                Er(e, z, t)
            }
            function Jy(e) {
                return Er(e, R | z)
            }
            function Qy(e, t) {
                return t = typeof t == "function" ? t : i,
                Er(e, R | z, t)
            }
            function Yy(e, t) {
                return t == null || ru(e, t, zt(t))
            }
            function Nr(e, t) {
                return e === t || e !== e && t !== t
            }
            var Xy = Wn(ha)
              , Zy = Wn(function(e, t) {
                return e >= t
            })
              , Ui = cu(function() {
                return arguments
            }()) ? cu : function(e) {
                return vt(e) && ze.call(e, "callee") && !Wc.call(e, "callee")
            }
              , we = N.isArray
              , ev = Yt ? fr(Yt) : cd;
            function nr(e) {
                return e != null && io(e.length) && !ti(e)
            }
            function bt(e) {
                return vt(e) && nr(e)
            }
            function tv(e) {
                return e === !0 || e === !1 || vt(e) && Xt(e) == D
            }
            var bi = gp || Ja
              , rv = Cr ? fr(Cr) : ud;
            function iv(e) {
                return vt(e) && e.nodeType === 1 && !zs(e)
            }
            function sv(e) {
                if (e == null)
                    return !0;
                if (nr(e) && (we(e) || typeof e == "string" || typeof e.splice == "function" || bi(e) || ls(e) || Ui(e)))
                    return !e.length;
                var t = Vt(e);
                if (t == be || t == qe)
                    return !e.size;
                if (Ms(e))
                    return !pa(e).length;
                for (var s in e)
                    if (ze.call(e, s))
                        return !1;
                return !0
            }
            function nv(e, t) {
                return $s(e, t)
            }
            function ov(e, t, s) {
                s = typeof s == "function" ? s : i;
                var c = s ? s(e, t) : i;
                return c === i ? $s(e, t, i, s) : !!c
            }
            function za(e) {
                if (!vt(e))
                    return !1;
                var t = Xt(e);
                return t == E || t == u || typeof e.message == "string" && typeof e.name == "string" && !zs(e)
            }
            function av(e) {
                return typeof e == "number" && Qc(e)
            }
            function ti(e) {
                if (!ut(e))
                    return !1;
                var t = Xt(e);
                return t == ee || t == ge || t == $ || t == mt
            }
            function yh(e) {
                return typeof e == "number" && e == _e(e)
            }
            function io(e) {
                return typeof e == "number" && e > -1 && e % 1 == 0 && e <= V
            }
            function ut(e) {
                var t = typeof e;
                return e != null && (t == "object" || t == "function")
            }
            function vt(e) {
                return e != null && typeof e == "object"
            }
            var vh = mr ? fr(mr) : ld;
            function cv(e, t) {
                return e === t || fa(e, t, Ca(t))
            }
            function uv(e, t, s) {
                return s = typeof s == "function" ? s : i,
                fa(e, t, Ca(t), s)
            }
            function hv(e) {
                return mh(e) && e != +e
            }
            function lv(e) {
                if (Wd(e))
                    throw new ye(h);
                return uu(e)
            }
            function fv(e) {
                return e === null
            }
            function pv(e) {
                return e == null
            }
            function mh(e) {
                return typeof e == "number" || vt(e) && Xt(e) == Ne
            }
            function zs(e) {
                if (!vt(e) || Xt(e) != Se)
                    return !1;
                var t = An(e);
                if (t === null)
                    return !0;
                var s = ze.call(t, "constructor") && t.constructor;
                return typeof s == "function" && s instanceof s && Sn.call(s) == up
            }
            var Ua = Hr ? fr(Hr) : fd;
            function dv(e) {
                return yh(e) && e >= -V && e <= V
            }
            var wh = xs ? fr(xs) : pd;
            function so(e) {
                return typeof e == "string" || !we(e) && vt(e) && Xt(e) == Ye
            }
            function dr(e) {
                return typeof e == "symbol" || vt(e) && Xt(e) == Xe
            }
            var ls = Ni ? fr(Ni) : dd;
            function gv(e) {
                return e === i
            }
            function yv(e) {
                return vt(e) && Vt(e) == He
            }
            function vv(e) {
                return vt(e) && Xt(e) == Ze
            }
            var mv = Wn(da)
              , wv = Wn(function(e, t) {
                return e <= t
            });
            function _h(e) {
                if (!e)
                    return [];
                if (nr(e))
                    return so(e) ? Ar(e) : sr(e);
                if (Ss && e[Ss])
                    return Yf(e[Ss]());
                var t = Vt(e)
                  , s = t == be ? ta : t == qe ? In : fs;
                return s(e)
            }
            function ri(e) {
                if (!e)
                    return e === 0 ? e : 0;
                if (e = Pr(e),
                e === ce || e === -ce) {
                    var t = e < 0 ? -1 : 1;
                    return t * k
                }
                return e === e ? e : 0
            }
            function _e(e) {
                var t = ri(e)
                  , s = t % 1;
                return t === t ? s ? t - s : t : 0
            }
            function bh(e) {
                return e ? qi(_e(e), 0, G) : 0
            }
            function Pr(e) {
                if (typeof e == "number")
                    return e;
                if (dr(e))
                    return B;
                if (ut(e)) {
                    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
                    e = ut(t) ? t + "" : t
                }
                if (typeof e != "string")
                    return e === 0 ? e : +e;
                e = Uc(e);
                var s = Ao.test(e);
                return s || No.test(e) ? me(e.slice(2), s ? 2 : 8) : Co.test(e) ? B : +e
            }
            function Eh(e) {
                return Kr(e, or(e))
            }
            function _v(e) {
                return e ? qi(_e(e), -V, V) : e === 0 ? e : 0
            }
            function Me(e) {
                return e == null ? "" : pr(e)
            }
            var bv = cs(function(e, t) {
                if (Ms(t) || nr(t)) {
                    Kr(t, zt(t), e);
                    return
                }
                for (var s in t)
                    ze.call(t, s) && Ts(e, s, t[s])
            })
              , Ih = cs(function(e, t) {
                Kr(t, or(t), e)
            })
              , no = cs(function(e, t, s, c) {
                Kr(t, or(t), e, c)
            })
              , Ev = cs(function(e, t, s, c) {
                Kr(t, zt(t), e, c)
            })
              , Iv = Zr(aa);
            function xv(e, t) {
                var s = as(e);
                return t == null ? s : tu(s, t)
            }
            var Pv = xe(function(e, t) {
                e = We(e);
                var s = -1
                  , c = t.length
                  , l = c > 2 ? t[2] : i;
                for (l && Zt(t[0], t[1], l) && (c = 1); ++s < c; )
                    for (var d = t[s], w = or(d), b = -1, O = w.length; ++b < O; ) {
                        var M = w[b]
                          , j = e[M];
                        (j === i || Nr(j, ss[M]) && !ze.call(e, M)) && (e[M] = d[M])
                    }
                return e
            })
              , Sv = xe(function(e) {
                return e.push(i, Uu),
                jt(xh, i, e)
            });
            function Ov(e, t) {
                return qc(e, ne(t, 3), kr)
            }
            function Rv(e, t) {
                return qc(e, ne(t, 3), ua)
            }
            function Cv(e, t) {
                return e == null ? e : ca(e, ne(t, 3), or)
            }
            function Av(e, t) {
                return e == null ? e : ou(e, ne(t, 3), or)
            }
            function Tv(e, t) {
                return e && kr(e, ne(t, 3))
            }
            function Nv(e, t) {
                return e && ua(e, ne(t, 3))
            }
            function Dv(e) {
                return e == null ? [] : Un(e, zt(e))
            }
            function $v(e) {
                return e == null ? [] : Un(e, or(e))
            }
            function Ha(e, t, s) {
                var c = e == null ? i : Mi(e, t);
                return c === i ? s : c
            }
            function Lv(e, t) {
                return e != null && Ku(e, t, sd)
            }
            function ka(e, t) {
                return e != null && Ku(e, t, nd)
            }
            var qv = Lu(function(e, t, s) {
                t != null && typeof t.toString != "function" && (t = On.call(t)),
                e[t] = s
            }, Ba(ar))
              , Mv = Lu(function(e, t, s) {
                t != null && typeof t.toString != "function" && (t = On.call(t)),
                ze.call(e, t) ? e[t].push(s) : e[t] = [s]
            }, ne)
              , jv = xe(Ds);
            function zt(e) {
                return nr(e) ? Zc(e) : pa(e)
            }
            function or(e) {
                return nr(e) ? Zc(e, !0) : gd(e)
            }
            function zv(e, t) {
                var s = {};
                return t = ne(t, 3),
                kr(e, function(c, l, d) {
                    Yr(s, t(c, l, d), c)
                }),
                s
            }
            function Uv(e, t) {
                var s = {};
                return t = ne(t, 3),
                kr(e, function(c, l, d) {
                    Yr(s, l, t(c, l, d))
                }),
                s
            }
            var Hv = cs(function(e, t, s) {
                Hn(e, t, s)
            })
              , xh = cs(function(e, t, s, c) {
                Hn(e, t, s, c)
            })
              , kv = Zr(function(e, t) {
                var s = {};
                if (e == null)
                    return s;
                var c = !1;
                t = st(t, function(d) {
                    return d = wi(d, e),
                    c || (c = d.length > 1),
                    d
                }),
                Kr(e, Oa(e), s),
                c && (s = Er(s, R | A | z, qd));
                for (var l = t.length; l--; )
                    wa(s, t[l]);
                return s
            });
            function Kv(e, t) {
                return Ph(e, ro(ne(t)))
            }
            var Bv = Zr(function(e, t) {
                return e == null ? {} : vd(e, t)
            });
            function Ph(e, t) {
                if (e == null)
                    return {};
                var s = st(Oa(e), function(c) {
                    return [c]
                });
                return t = ne(t),
                yu(e, s, function(c, l) {
                    return t(c, l[0])
                })
            }
            function Fv(e, t, s) {
                t = wi(t, e);
                var c = -1
                  , l = t.length;
                for (l || (l = 1,
                e = i); ++c < l; ) {
                    var d = e == null ? i : e[Br(t[c])];
                    d === i && (c = l,
                    d = s),
                    e = ti(d) ? d.call(e) : d
                }
                return e
            }
            function Vv(e, t, s) {
                return e == null ? e : Ls(e, t, s)
            }
            function Gv(e, t, s, c) {
                return c = typeof c == "function" ? c : i,
                e == null ? e : Ls(e, t, s, c)
            }
            var Sh = ju(zt)
              , Oh = ju(or);
            function Wv(e, t, s) {
                var c = we(e)
                  , l = c || bi(e) || ls(e);
                if (t = ne(t, 4),
                s == null) {
                    var d = e && e.constructor;
                    l ? s = c ? new d : [] : ut(e) ? s = ti(d) ? as(An(e)) : {} : s = {}
                }
                return (l ? wr : kr)(e, function(w, b, O) {
                    return t(s, w, b, O)
                }),
                s
            }
            function Jv(e, t) {
                return e == null ? !0 : wa(e, t)
            }
            function Qv(e, t, s) {
                return e == null ? e : bu(e, t, Ea(s))
            }
            function Yv(e, t, s, c) {
                return c = typeof c == "function" ? c : i,
                e == null ? e : bu(e, t, Ea(s), c)
            }
            function fs(e) {
                return e == null ? [] : ea(e, zt(e))
            }
            function Xv(e) {
                return e == null ? [] : ea(e, or(e))
            }
            function Zv(e, t, s) {
                return s === i && (s = t,
                t = i),
                s !== i && (s = Pr(s),
                s = s === s ? s : 0),
                t !== i && (t = Pr(t),
                t = t === t ? t : 0),
                qi(Pr(e), t, s)
            }
            function em(e, t, s) {
                return t = ri(t),
                s === i ? (s = t,
                t = 0) : s = ri(s),
                e = Pr(e),
                od(e, t, s)
            }
            function tm(e, t, s) {
                if (s && typeof s != "boolean" && Zt(e, t, s) && (t = s = i),
                s === i && (typeof t == "boolean" ? (s = t,
                t = i) : typeof e == "boolean" && (s = e,
                e = i)),
                e === i && t === i ? (e = 0,
                t = 1) : (e = ri(e),
                t === i ? (t = e,
                e = 0) : t = ri(t)),
                e > t) {
                    var c = e;
                    e = t,
                    t = c
                }
                if (s || e % 1 || t % 1) {
                    var l = Yc();
                    return Ft(e + l * (t - e + Ve("1e-" + ((l + "").length - 1))), t)
                }
                return ya(e, t)
            }
            var rm = us(function(e, t, s) {
                return t = t.toLowerCase(),
                e + (s ? Rh(t) : t)
            });
            function Rh(e) {
                return Ka(Me(e).toLowerCase())
            }
            function Ch(e) {
                return e = Me(e),
                e && e.replace(Gr, Vf).replace(Fo, "")
            }
            function im(e, t, s) {
                e = Me(e),
                t = pr(t);
                var c = e.length;
                s = s === i ? c : qi(_e(s), 0, c);
                var l = s;
                return s -= t.length,
                s >= 0 && e.slice(s, l) == t
            }
            function sm(e) {
                return e = Me(e),
                e && rt.test(e) ? e.replace(Oi, Gf) : e
            }
            function nm(e) {
                return e = Me(e),
                e && Rt.test(e) ? e.replace(dt, "\\$&") : e
            }
            var om = us(function(e, t, s) {
                return e + (s ? "-" : "") + t.toLowerCase()
            })
              , am = us(function(e, t, s) {
                return e + (s ? " " : "") + t.toLowerCase()
            })
              , cm = Nu("toLowerCase");
            function um(e, t, s) {
                e = Me(e),
                t = _e(t);
                var c = t ? rs(e) : 0;
                if (!t || c >= t)
                    return e;
                var l = (t - c) / 2;
                return Gn($n(l), s) + e + Gn(Dn(l), s)
            }
            function hm(e, t, s) {
                e = Me(e),
                t = _e(t);
                var c = t ? rs(e) : 0;
                return t && c < t ? e + Gn(t - c, s) : e
            }
            function lm(e, t, s) {
                e = Me(e),
                t = _e(t);
                var c = t ? rs(e) : 0;
                return t && c < t ? Gn(t - c, s) + e : e
            }
            function fm(e, t, s) {
                return s || t == null ? t = 0 : t && (t = +t),
                wp(Me(e).replace(gt, ""), t || 0)
            }
            function pm(e, t, s) {
                return (s ? Zt(e, t, s) : t === i) ? t = 1 : t = _e(t),
                va(Me(e), t)
            }
            function dm() {
                var e = arguments
                  , t = Me(e[0]);
                return e.length < 3 ? t : t.replace(e[1], e[2])
            }
            var gm = us(function(e, t, s) {
                return e + (s ? "_" : "") + t.toLowerCase()
            });
            function ym(e, t, s) {
                return s && typeof s != "number" && Zt(e, t, s) && (t = s = i),
                s = s === i ? G : s >>> 0,
                s ? (e = Me(e),
                e && (typeof t == "string" || t != null && !Ua(t)) && (t = pr(t),
                !t && ts(e)) ? _i(Ar(e), 0, s) : e.split(t, s)) : []
            }
            var vm = us(function(e, t, s) {
                return e + (s ? " " : "") + Ka(t)
            });
            function mm(e, t, s) {
                return e = Me(e),
                s = s == null ? 0 : qi(_e(s), 0, e.length),
                t = pr(t),
                e.slice(s, s + t.length) == t
            }
            function wm(e, t, s) {
                var c = f.templateSettings;
                s && Zt(e, t, s) && (t = i),
                e = Me(e),
                t = no({}, t, c, zu);
                var l = no({}, t.imports, c.imports, zu), d = zt(l), w = ea(l, d), b, O, M = 0, j = t.interpolate || Gi, K = "__p += '", J = ra((t.escape || Gi).source + "|" + j.source + "|" + (j === ct ? Ro : Gi).source + "|" + (t.evaluate || Gi).source + "|$", "g"), te = "//# sourceURL=" + (ze.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Vo + "]") + `
`;
                e.replace(J, function(ae, Pe, Ae, gr, er, yr) {
                    return Ae || (Ae = gr),
                    K += e.slice(M, yr).replace($o, Wf),
                    Pe && (b = !0,
                    K += `' +
__e(` + Pe + `) +
'`),
                    er && (O = !0,
                    K += `';
` + er + `;
__p += '`),
                    Ae && (K += `' +
((__t = (` + Ae + `)) == null ? '' : __t) +
'`),
                    M = yr + ae.length,
                    ae
                }),
                K += `';
`;
                var oe = ze.call(t, "variable") && t.variable;
                if (!oe)
                    K = `with (obj) {
` + K + `
}
`;
                else if (So.test(oe))
                    throw new ye(g);
                K = (O ? K.replace(zr, "") : K).replace(Qt, "$1").replace(Vr, "$1;"),
                K = "function(" + (oe || "obj") + `) {
` + (oe ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (b ? ", __e = _.escape" : "") + (O ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + K + `return __p
}`;
                var Ee = Th(function() {
                    return Le(d, te + "return " + K).apply(i, w)
                });
                if (Ee.source = K,
                za(Ee))
                    throw Ee;
                return Ee
            }
            function _m(e) {
                return Me(e).toLowerCase()
            }
            function bm(e) {
                return Me(e).toUpperCase()
            }
            function Em(e, t, s) {
                if (e = Me(e),
                e && (s || t === i))
                    return Uc(e);
                if (!e || !(t = pr(t)))
                    return e;
                var c = Ar(e)
                  , l = Ar(t)
                  , d = Hc(c, l)
                  , w = kc(c, l) + 1;
                return _i(c, d, w).join("")
            }
            function Im(e, t, s) {
                if (e = Me(e),
                e && (s || t === i))
                    return e.slice(0, Bc(e) + 1);
                if (!e || !(t = pr(t)))
                    return e;
                var c = Ar(e)
                  , l = kc(c, Ar(t)) + 1;
                return _i(c, 0, l).join("")
            }
            function xm(e, t, s) {
                if (e = Me(e),
                e && (s || t === i))
                    return e.replace(gt, "");
                if (!e || !(t = pr(t)))
                    return e;
                var c = Ar(e)
                  , l = Hc(c, Ar(t));
                return _i(c, l).join("")
            }
            function Pm(e, t) {
                var s = ie
                  , c = ue;
                if (ut(t)) {
                    var l = "separator"in t ? t.separator : l;
                    s = "length"in t ? _e(t.length) : s,
                    c = "omission"in t ? pr(t.omission) : c
                }
                e = Me(e);
                var d = e.length;
                if (ts(e)) {
                    var w = Ar(e);
                    d = w.length
                }
                if (s >= d)
                    return e;
                var b = s - rs(c);
                if (b < 1)
                    return c;
                var O = w ? _i(w, 0, b).join("") : e.slice(0, b);
                if (l === i)
                    return O + c;
                if (w && (b += O.length - b),
                Ua(l)) {
                    if (e.slice(b).search(l)) {
                        var M, j = O;
                        for (l.global || (l = ra(l.source, Me(vr.exec(l)) + "g")),
                        l.lastIndex = 0; M = l.exec(j); )
                            var K = M.index;
                        O = O.slice(0, K === i ? b : K)
                    }
                } else if (e.indexOf(pr(l), b) != b) {
                    var J = O.lastIndexOf(l);
                    J > -1 && (O = O.slice(0, J))
                }
                return O + c
            }
            function Sm(e) {
                return e = Me(e),
                e && lt.test(e) ? e.replace(li, tp) : e
            }
            var Om = us(function(e, t, s) {
                return e + (s ? " " : "") + t.toUpperCase()
            })
              , Ka = Nu("toUpperCase");
            function Ah(e, t, s) {
                return e = Me(e),
                t = s ? i : t,
                t === i ? Qf(e) ? sp(e) : Hf(e) : e.match(t) || []
            }
            var Th = xe(function(e, t) {
                try {
                    return jt(e, i, t)
                } catch (s) {
                    return za(s) ? s : new ye(s)
                }
            })
              , Rm = Zr(function(e, t) {
                return wr(t, function(s) {
                    s = Br(s),
                    Yr(e, s, Ma(e[s], e))
                }),
                e
            });
            function Cm(e) {
                var t = e == null ? 0 : e.length
                  , s = ne();
                return e = t ? st(e, function(c) {
                    if (typeof c[1] != "function")
                        throw new _r(p);
                    return [s(c[0]), c[1]]
                }) : [],
                xe(function(c) {
                    for (var l = -1; ++l < t; ) {
                        var d = e[l];
                        if (jt(d[0], this, c))
                            return jt(d[1], this, c)
                    }
                })
            }
            function Am(e) {
                return td(Er(e, R))
            }
            function Ba(e) {
                return function() {
                    return e
                }
            }
            function Tm(e, t) {
                return e == null || e !== e ? t : e
            }
            var Nm = $u()
              , Dm = $u(!0);
            function ar(e) {
                return e
            }
            function Fa(e) {
                return hu(typeof e == "function" ? e : Er(e, R))
            }
            function $m(e) {
                return fu(Er(e, R))
            }
            function Lm(e, t) {
                return pu(e, Er(t, R))
            }
            var qm = xe(function(e, t) {
                return function(s) {
                    return Ds(s, e, t)
                }
            })
              , Mm = xe(function(e, t) {
                return function(s) {
                    return Ds(e, s, t)
                }
            });
            function Va(e, t, s) {
                var c = zt(t)
                  , l = Un(t, c);
                s == null && !(ut(t) && (l.length || !c.length)) && (s = t,
                t = e,
                e = this,
                l = Un(t, zt(t)));
                var d = !(ut(s) && "chain"in s) || !!s.chain
                  , w = ti(e);
                return wr(l, function(b) {
                    var O = t[b];
                    e[b] = O,
                    w && (e.prototype[b] = function() {
                        var M = this.__chain__;
                        if (d || M) {
                            var j = e(this.__wrapped__)
                              , K = j.__actions__ = sr(this.__actions__);
                            return K.push({
                                func: O,
                                args: arguments,
                                thisArg: e
                            }),
                            j.__chain__ = M,
                            j
                        }
                        return O.apply(e, di([this.value()], arguments))
                    }
                    )
                }),
                e
            }
            function jm() {
                return Ce._ === this && (Ce._ = hp),
                this
            }
            function Ga() {}
            function zm(e) {
                return e = _e(e),
                xe(function(t) {
                    return du(t, e)
                })
            }
            var Um = xa(st)
              , Hm = xa(Lc)
              , km = xa(Jo);
            function Nh(e) {
                return Ta(e) ? Qo(Br(e)) : md(e)
            }
            function Km(e) {
                return function(t) {
                    return e == null ? i : Mi(e, t)
                }
            }
            var Bm = qu()
              , Fm = qu(!0);
            function Wa() {
                return []
            }
            function Ja() {
                return !1
            }
            function Vm() {
                return {}
            }
            function Gm() {
                return ""
            }
            function Wm() {
                return !0
            }
            function Jm(e, t) {
                if (e = _e(e),
                e < 1 || e > V)
                    return [];
                var s = G
                  , c = Ft(e, G);
                t = ne(t),
                e -= G;
                for (var l = Zo(c, t); ++s < e; )
                    t(s);
                return l
            }
            function Qm(e) {
                return we(e) ? st(e, Br) : dr(e) ? [e] : sr(Xu(Me(e)))
            }
            function Ym(e) {
                var t = ++cp;
                return Me(e) + t
            }
            var Xm = Vn(function(e, t) {
                return e + t
            }, 0)
              , Zm = Pa("ceil")
              , e0 = Vn(function(e, t) {
                return e / t
            }, 1)
              , t0 = Pa("floor");
            function r0(e) {
                return e && e.length ? zn(e, ar, ha) : i
            }
            function i0(e, t) {
                return e && e.length ? zn(e, ne(t, 2), ha) : i
            }
            function s0(e) {
                return jc(e, ar)
            }
            function n0(e, t) {
                return jc(e, ne(t, 2))
            }
            function o0(e) {
                return e && e.length ? zn(e, ar, da) : i
            }
            function a0(e, t) {
                return e && e.length ? zn(e, ne(t, 2), da) : i
            }
            var c0 = Vn(function(e, t) {
                return e * t
            }, 1)
              , u0 = Pa("round")
              , h0 = Vn(function(e, t) {
                return e - t
            }, 0);
            function l0(e) {
                return e && e.length ? Xo(e, ar) : 0
            }
            function f0(e, t) {
                return e && e.length ? Xo(e, ne(t, 2)) : 0
            }
            return f.after = $y,
            f.ary = uh,
            f.assign = bv,
            f.assignIn = Ih,
            f.assignInWith = no,
            f.assignWith = Ev,
            f.at = Iv,
            f.before = hh,
            f.bind = Ma,
            f.bindAll = Rm,
            f.bindKey = lh,
            f.castArray = Vy,
            f.chain = oh,
            f.chunk = tg,
            f.compact = rg,
            f.concat = ig,
            f.cond = Cm,
            f.conforms = Am,
            f.constant = Ba,
            f.countBy = ly,
            f.create = xv,
            f.curry = fh,
            f.curryRight = ph,
            f.debounce = dh,
            f.defaults = Pv,
            f.defaultsDeep = Sv,
            f.defer = Ly,
            f.delay = qy,
            f.difference = sg,
            f.differenceBy = ng,
            f.differenceWith = og,
            f.drop = ag,
            f.dropRight = cg,
            f.dropRightWhile = ug,
            f.dropWhile = hg,
            f.fill = lg,
            f.filter = py,
            f.flatMap = yy,
            f.flatMapDeep = vy,
            f.flatMapDepth = my,
            f.flatten = rh,
            f.flattenDeep = fg,
            f.flattenDepth = pg,
            f.flip = My,
            f.flow = Nm,
            f.flowRight = Dm,
            f.fromPairs = dg,
            f.functions = Dv,
            f.functionsIn = $v,
            f.groupBy = wy,
            f.initial = yg,
            f.intersection = vg,
            f.intersectionBy = mg,
            f.intersectionWith = wg,
            f.invert = qv,
            f.invertBy = Mv,
            f.invokeMap = by,
            f.iteratee = Fa,
            f.keyBy = Ey,
            f.keys = zt,
            f.keysIn = or,
            f.map = Zn,
            f.mapKeys = zv,
            f.mapValues = Uv,
            f.matches = $m,
            f.matchesProperty = Lm,
            f.memoize = to,
            f.merge = Hv,
            f.mergeWith = xh,
            f.method = qm,
            f.methodOf = Mm,
            f.mixin = Va,
            f.negate = ro,
            f.nthArg = zm,
            f.omit = kv,
            f.omitBy = Kv,
            f.once = jy,
            f.orderBy = Iy,
            f.over = Um,
            f.overArgs = zy,
            f.overEvery = Hm,
            f.overSome = km,
            f.partial = ja,
            f.partialRight = gh,
            f.partition = xy,
            f.pick = Bv,
            f.pickBy = Ph,
            f.property = Nh,
            f.propertyOf = Km,
            f.pull = Ig,
            f.pullAll = sh,
            f.pullAllBy = xg,
            f.pullAllWith = Pg,
            f.pullAt = Sg,
            f.range = Bm,
            f.rangeRight = Fm,
            f.rearg = Uy,
            f.reject = Oy,
            f.remove = Og,
            f.rest = Hy,
            f.reverse = La,
            f.sampleSize = Cy,
            f.set = Vv,
            f.setWith = Gv,
            f.shuffle = Ay,
            f.slice = Rg,
            f.sortBy = Dy,
            f.sortedUniq = Lg,
            f.sortedUniqBy = qg,
            f.split = ym,
            f.spread = ky,
            f.tail = Mg,
            f.take = jg,
            f.takeRight = zg,
            f.takeRightWhile = Ug,
            f.takeWhile = Hg,
            f.tap = ry,
            f.throttle = Ky,
            f.thru = Xn,
            f.toArray = _h,
            f.toPairs = Sh,
            f.toPairsIn = Oh,
            f.toPath = Qm,
            f.toPlainObject = Eh,
            f.transform = Wv,
            f.unary = By,
            f.union = kg,
            f.unionBy = Kg,
            f.unionWith = Bg,
            f.uniq = Fg,
            f.uniqBy = Vg,
            f.uniqWith = Gg,
            f.unset = Jv,
            f.unzip = qa,
            f.unzipWith = nh,
            f.update = Qv,
            f.updateWith = Yv,
            f.values = fs,
            f.valuesIn = Xv,
            f.without = Wg,
            f.words = Ah,
            f.wrap = Fy,
            f.xor = Jg,
            f.xorBy = Qg,
            f.xorWith = Yg,
            f.zip = Xg,
            f.zipObject = Zg,
            f.zipObjectDeep = ey,
            f.zipWith = ty,
            f.entries = Sh,
            f.entriesIn = Oh,
            f.extend = Ih,
            f.extendWith = no,
            Va(f, f),
            f.add = Xm,
            f.attempt = Th,
            f.camelCase = rm,
            f.capitalize = Rh,
            f.ceil = Zm,
            f.clamp = Zv,
            f.clone = Gy,
            f.cloneDeep = Jy,
            f.cloneDeepWith = Qy,
            f.cloneWith = Wy,
            f.conformsTo = Yy,
            f.deburr = Ch,
            f.defaultTo = Tm,
            f.divide = e0,
            f.endsWith = im,
            f.eq = Nr,
            f.escape = sm,
            f.escapeRegExp = nm,
            f.every = fy,
            f.find = dy,
            f.findIndex = eh,
            f.findKey = Ov,
            f.findLast = gy,
            f.findLastIndex = th,
            f.findLastKey = Rv,
            f.floor = t0,
            f.forEach = ah,
            f.forEachRight = ch,
            f.forIn = Cv,
            f.forInRight = Av,
            f.forOwn = Tv,
            f.forOwnRight = Nv,
            f.get = Ha,
            f.gt = Xy,
            f.gte = Zy,
            f.has = Lv,
            f.hasIn = ka,
            f.head = ih,
            f.identity = ar,
            f.includes = _y,
            f.indexOf = gg,
            f.inRange = em,
            f.invoke = jv,
            f.isArguments = Ui,
            f.isArray = we,
            f.isArrayBuffer = ev,
            f.isArrayLike = nr,
            f.isArrayLikeObject = bt,
            f.isBoolean = tv,
            f.isBuffer = bi,
            f.isDate = rv,
            f.isElement = iv,
            f.isEmpty = sv,
            f.isEqual = nv,
            f.isEqualWith = ov,
            f.isError = za,
            f.isFinite = av,
            f.isFunction = ti,
            f.isInteger = yh,
            f.isLength = io,
            f.isMap = vh,
            f.isMatch = cv,
            f.isMatchWith = uv,
            f.isNaN = hv,
            f.isNative = lv,
            f.isNil = pv,
            f.isNull = fv,
            f.isNumber = mh,
            f.isObject = ut,
            f.isObjectLike = vt,
            f.isPlainObject = zs,
            f.isRegExp = Ua,
            f.isSafeInteger = dv,
            f.isSet = wh,
            f.isString = so,
            f.isSymbol = dr,
            f.isTypedArray = ls,
            f.isUndefined = gv,
            f.isWeakMap = yv,
            f.isWeakSet = vv,
            f.join = _g,
            f.kebabCase = om,
            f.last = xr,
            f.lastIndexOf = bg,
            f.lowerCase = am,
            f.lowerFirst = cm,
            f.lt = mv,
            f.lte = wv,
            f.max = r0,
            f.maxBy = i0,
            f.mean = s0,
            f.meanBy = n0,
            f.min = o0,
            f.minBy = a0,
            f.stubArray = Wa,
            f.stubFalse = Ja,
            f.stubObject = Vm,
            f.stubString = Gm,
            f.stubTrue = Wm,
            f.multiply = c0,
            f.nth = Eg,
            f.noConflict = jm,
            f.noop = Ga,
            f.now = eo,
            f.pad = um,
            f.padEnd = hm,
            f.padStart = lm,
            f.parseInt = fm,
            f.random = tm,
            f.reduce = Py,
            f.reduceRight = Sy,
            f.repeat = pm,
            f.replace = dm,
            f.result = Fv,
            f.round = u0,
            f.runInContext = S,
            f.sample = Ry,
            f.size = Ty,
            f.snakeCase = gm,
            f.some = Ny,
            f.sortedIndex = Cg,
            f.sortedIndexBy = Ag,
            f.sortedIndexOf = Tg,
            f.sortedLastIndex = Ng,
            f.sortedLastIndexBy = Dg,
            f.sortedLastIndexOf = $g,
            f.startCase = vm,
            f.startsWith = mm,
            f.subtract = h0,
            f.sum = l0,
            f.sumBy = f0,
            f.template = wm,
            f.times = Jm,
            f.toFinite = ri,
            f.toInteger = _e,
            f.toLength = bh,
            f.toLower = _m,
            f.toNumber = Pr,
            f.toSafeInteger = _v,
            f.toString = Me,
            f.toUpper = bm,
            f.trim = Em,
            f.trimEnd = Im,
            f.trimStart = xm,
            f.truncate = Pm,
            f.unescape = Sm,
            f.uniqueId = Ym,
            f.upperCase = Om,
            f.upperFirst = Ka,
            f.each = ah,
            f.eachRight = ch,
            f.first = ih,
            Va(f, function() {
                var e = {};
                return kr(f, function(t, s) {
                    ze.call(f.prototype, s) || (e[s] = t)
                }),
                e
            }(), {
                chain: !1
            }),
            f.VERSION = n,
            wr(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
                f[e].placeholder = f
            }),
            wr(["drop", "take"], function(e, t) {
                Oe.prototype[e] = function(s) {
                    s = s === i ? 1 : qt(_e(s), 0);
                    var c = this.__filtered__ && !t ? new Oe(this) : this.clone();
                    return c.__filtered__ ? c.__takeCount__ = Ft(s, c.__takeCount__) : c.__views__.push({
                        size: Ft(s, G),
                        type: e + (c.__dir__ < 0 ? "Right" : "")
                    }),
                    c
                }
                ,
                Oe.prototype[e + "Right"] = function(s) {
                    return this.reverse()[e](s).reverse()
                }
            }),
            wr(["filter", "map", "takeWhile"], function(e, t) {
                var s = t + 1
                  , c = s == m || s == X;
                Oe.prototype[e] = function(l) {
                    var d = this.clone();
                    return d.__iteratees__.push({
                        iteratee: ne(l, 3),
                        type: s
                    }),
                    d.__filtered__ = d.__filtered__ || c,
                    d
                }
            }),
            wr(["head", "last"], function(e, t) {
                var s = "take" + (t ? "Right" : "");
                Oe.prototype[e] = function() {
                    return this[s](1).value()[0]
                }
            }),
            wr(["initial", "tail"], function(e, t) {
                var s = "drop" + (t ? "" : "Right");
                Oe.prototype[e] = function() {
                    return this.__filtered__ ? new Oe(this) : this[s](1)
                }
            }),
            Oe.prototype.compact = function() {
                return this.filter(ar)
            }
            ,
            Oe.prototype.find = function(e) {
                return this.filter(e).head()
            }
            ,
            Oe.prototype.findLast = function(e) {
                return this.reverse().find(e)
            }
            ,
            Oe.prototype.invokeMap = xe(function(e, t) {
                return typeof e == "function" ? new Oe(this) : this.map(function(s) {
                    return Ds(s, e, t)
                })
            }),
            Oe.prototype.reject = function(e) {
                return this.filter(ro(ne(e)))
            }
            ,
            Oe.prototype.slice = function(e, t) {
                e = _e(e);
                var s = this;
                return s.__filtered__ && (e > 0 || t < 0) ? new Oe(s) : (e < 0 ? s = s.takeRight(-e) : e && (s = s.drop(e)),
                t !== i && (t = _e(t),
                s = t < 0 ? s.dropRight(-t) : s.take(t - e)),
                s)
            }
            ,
            Oe.prototype.takeRightWhile = function(e) {
                return this.reverse().takeWhile(e).reverse()
            }
            ,
            Oe.prototype.toArray = function() {
                return this.take(G)
            }
            ,
            kr(Oe.prototype, function(e, t) {
                var s = /^(?:filter|find|map|reject)|While$/.test(t)
                  , c = /^(?:head|last)$/.test(t)
                  , l = f[c ? "take" + (t == "last" ? "Right" : "") : t]
                  , d = c || /^find/.test(t);
                l && (f.prototype[t] = function() {
                    var w = this.__wrapped__
                      , b = c ? [1] : arguments
                      , O = w instanceof Oe
                      , M = b[0]
                      , j = O || we(w)
                      , K = function(Pe) {
                        var Ae = l.apply(f, di([Pe], b));
                        return c && J ? Ae[0] : Ae
                    };
                    j && s && typeof M == "function" && M.length != 1 && (O = j = !1);
                    var J = this.__chain__
                      , te = !!this.__actions__.length
                      , oe = d && !J
                      , Ee = O && !te;
                    if (!d && j) {
                        w = Ee ? w : new Oe(this);
                        var ae = e.apply(w, b);
                        return ae.__actions__.push({
                            func: Xn,
                            args: [K],
                            thisArg: i
                        }),
                        new br(ae,J)
                    }
                    return oe && Ee ? e.apply(this, b) : (ae = this.thru(K),
                    oe ? c ? ae.value()[0] : ae.value() : ae)
                }
                )
            }),
            wr(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
                var t = xn[e]
                  , s = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru"
                  , c = /^(?:pop|shift)$/.test(e);
                f.prototype[e] = function() {
                    var l = arguments;
                    if (c && !this.__chain__) {
                        var d = this.value();
                        return t.apply(we(d) ? d : [], l)
                    }
                    return this[s](function(w) {
                        return t.apply(we(w) ? w : [], l)
                    })
                }
            }),
            kr(Oe.prototype, function(e, t) {
                var s = f[t];
                if (s) {
                    var c = s.name + "";
                    ze.call(os, c) || (os[c] = []),
                    os[c].push({
                        name: t,
                        func: s
                    })
                }
            }),
            os[Fn(i, he).name] = [{
                name: "wrapper",
                func: i
            }],
            Oe.prototype.clone = Sp,
            Oe.prototype.reverse = Op,
            Oe.prototype.value = Rp,
            f.prototype.at = iy,
            f.prototype.chain = sy,
            f.prototype.commit = ny,
            f.prototype.next = oy,
            f.prototype.plant = cy,
            f.prototype.reverse = uy,
            f.prototype.toJSON = f.prototype.valueOf = f.prototype.value = hy,
            f.prototype.first = f.prototype.head,
            Ss && (f.prototype[Ss] = ay),
            f
        }
          , is = np();
        _t ? ((_t.exports = is)._ = is,
        Ge._ = is) : Ce._ = is
    }
    ).call(Vs)
}
)(_c, _c.exports);
var jE = Object.defineProperty
  , zE = Object.defineProperties
  , UE = Object.getOwnPropertyDescriptors
  , Ll = Object.getOwnPropertySymbols
  , HE = Object.prototype.hasOwnProperty
  , kE = Object.prototype.propertyIsEnumerable
  , ql = (a,r,i)=>r in a ? jE(a, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : a[r] = i
  , ho = (a,r)=>{
    for (var i in r || (r = {}))
        HE.call(r, i) && ql(a, i, r[i]);
    if (Ll)
        for (var i of Ll(r))
            kE.call(r, i) && ql(a, i, r[i]);
    return a
}
  , KE = (a,r)=>zE(a, UE(r));
function Pi(a, r, i) {
    var n;
    const o = X0(a);
    return ((n = r.rpcMap) == null ? void 0 : n[o.reference]) || `${ME}?chainId=${o.namespace}:${o.reference}&projectId=${i}`
}
function Vi(a) {
    return a.includes(":") ? a.split(":")[1] : a
}
function $f(a) {
    return a.map(r=>`${r.split(":")[0]}:${r.split(":")[1]}`)
}
function BE(a, r) {
    const i = Object.keys(r.namespaces).filter(o=>o.includes(a));
    if (!i.length)
        return [];
    const n = [];
    return i.forEach(o=>{
        const h = r.namespaces[o].accounts;
        n.push(...h)
    }
    ),
    n
}
function FE(a={}, r={}) {
    const i = Ml(a)
      , n = Ml(r);
    return _c.exports.merge(i, n)
}
function Ml(a) {
    var r, i, n, o;
    const h = {};
    if (!po(a))
        return h;
    for (const [p,g] of Object.entries(a)) {
        const _ = Yl(p) ? [p] : g.chains
          , v = g.methods || []
          , I = g.events || []
          , R = g.rpcMap || {}
          , A = Gs(p);
        h[A] = KE(ho(ho({}, h[A]), g), {
            chains: Ya(_, (r = h[A]) == null ? void 0 : r.chains),
            methods: Ya(v, (i = h[A]) == null ? void 0 : i.methods),
            events: Ya(I, (n = h[A]) == null ? void 0 : n.events),
            rpcMap: ho(ho({}, R), (o = h[A]) == null ? void 0 : o.rpcMap)
        })
    }
    return h
}
function VE(a) {
    return a.includes(":") ? a.split(":")[2] : a
}
function GE(a) {
    const r = {};
    for (const [i,n] of Object.entries(a)) {
        const o = n.methods || []
          , h = n.events || []
          , p = n.accounts || []
          , g = Yl(i) ? [i] : n.chains ? n.chains : $f(n.accounts);
        r[i] = {
            chains: g,
            methods: o,
            events: h,
            accounts: p
        }
    }
    return r
}
function uc(a) {
    return typeof a == "number" ? a : a.includes("0x") ? parseInt(a, 16) : a.includes(":") ? Number(a.split(":")[1]) : Number(a)
}
const Lf = {}
  , nt = a=>Lf[a]
  , hc = (a,r)=>{
    Lf[a] = r
}
;
class WE {
    constructor(r) {
        this.name = "polkadot",
        this.namespace = r.namespace,
        this.events = nt("events"),
        this.client = nt("client"),
        this.chainId = this.getDefaultChain(),
        this.httpProviders = this.createHttpProviders()
    }
    updateNamespace(r) {
        this.namespace = Object.assign(this.namespace, r)
    }
    requestAccounts() {
        return this.getAccounts()
    }
    getDefaultChain() {
        if (this.chainId)
            return this.chainId;
        if (this.namespace.defaultChain)
            return this.namespace.defaultChain;
        const r = this.namespace.chains[0];
        if (!r)
            throw new Error("ChainId not found");
        return r.split(":")[1]
    }
    request(r) {
        return this.namespace.methods.includes(r.request.method) ? this.client.request(r) : this.getHttpProvider().request(r.request)
    }
    setDefaultChain(r, i) {
        this.httpProviders[r] || this.setHttpProvider(r, i),
        this.chainId = r,
        this.events.emit(hi.DEFAULT_CHAIN_CHANGED, `${this.name}:${r}`)
    }
    getAccounts() {
        const r = this.namespace.accounts;
        return r ? r.filter(i=>i.split(":")[1] === this.chainId.toString()).map(i=>i.split(":")[2]) || [] : []
    }
    createHttpProviders() {
        const r = {};
        return this.namespace.chains.forEach(i=>{
            var n;
            const o = Vi(i);
            r[o] = this.createHttpProvider(o, (n = this.namespace.rpcMap) == null ? void 0 : n[i])
        }
        ),
        r
    }
    getHttpProvider() {
        const r = `${this.name}:${this.chainId}`
          , i = this.httpProviders[r];
        if (typeof i > "u")
            throw new Error(`JSON-RPC provider for ${r} not found`);
        return i
    }
    setHttpProvider(r, i) {
        const n = this.createHttpProvider(r, i);
        n && (this.httpProviders[r] = n)
    }
    createHttpProvider(r, i) {
        const n = i || Pi(r, this.namespace, this.client.core.projectId);
        if (!n)
            throw new Error(`No RPC url provided for chainId: ${r}`);
        return new ui(new Si(n,nt("disableProviderPing")))
    }
}
class JE {
    constructor(r) {
        this.name = "eip155",
        this.namespace = r.namespace,
        this.events = nt("events"),
        this.client = nt("client"),
        this.httpProviders = this.createHttpProviders(),
        this.chainId = parseInt(this.getDefaultChain())
    }
    async request(r) {
        switch (r.request.method) {
        case "eth_requestAccounts":
            return this.getAccounts();
        case "eth_accounts":
            return this.getAccounts();
        case "wallet_switchEthereumChain":
            return await this.handleSwitchChain(r);
        case "eth_chainId":
            return parseInt(this.getDefaultChain())
        }
        return this.namespace.methods.includes(r.request.method) ? await this.client.request(r) : this.getHttpProvider().request(r.request)
    }
    updateNamespace(r) {
        this.namespace = Object.assign(this.namespace, r)
    }
    setDefaultChain(r, i) {
        this.httpProviders[r] || this.setHttpProvider(parseInt(r), i),
        this.chainId = parseInt(r),
        this.events.emit(hi.DEFAULT_CHAIN_CHANGED, `${this.name}:${r}`)
    }
    requestAccounts() {
        return this.getAccounts()
    }
    getDefaultChain() {
        if (this.chainId)
            return this.chainId.toString();
        if (this.namespace.defaultChain)
            return this.namespace.defaultChain;
        const r = this.namespace.chains[0];
        if (!r)
            throw new Error("ChainId not found");
        return r.split(":")[1]
    }
    createHttpProvider(r, i) {
        const n = i || Pi(`${this.name}:${r}`, this.namespace, this.client.core.projectId);
        if (!n)
            throw new Error(`No RPC url provided for chainId: ${r}`);
        return new ui(new Si(n,nt("disableProviderPing")))
    }
    setHttpProvider(r, i) {
        const n = this.createHttpProvider(r, i);
        n && (this.httpProviders[r] = n)
    }
    createHttpProviders() {
        const r = {};
        return this.namespace.chains.forEach(i=>{
            var n;
            const o = parseInt(Vi(i));
            r[o] = this.createHttpProvider(o, (n = this.namespace.rpcMap) == null ? void 0 : n[i])
        }
        ),
        r
    }
    getAccounts() {
        const r = this.namespace.accounts;
        return r ? [...new Set(r.filter(i=>i.split(":")[1] === this.chainId.toString()).map(i=>i.split(":")[2]))] : []
    }
    getHttpProvider() {
        const r = this.chainId
          , i = this.httpProviders[r];
        if (typeof i > "u")
            throw new Error(`JSON-RPC provider for ${r} not found`);
        return i
    }
    async handleSwitchChain(r) {
        var i, n;
        let o = r.request.params ? (i = r.request.params[0]) == null ? void 0 : i.chainId : "0x0";
        o = o.startsWith("0x") ? o : `0x${o}`;
        const h = parseInt(o, 16);
        if (this.isChainApproved(h))
            this.setDefaultChain(`${h}`);
        else if (this.namespace.methods.includes("wallet_switchEthereumChain"))
            await this.client.request({
                topic: r.topic,
                request: {
                    method: r.request.method,
                    params: [{
                        chainId: o
                    }]
                },
                chainId: (n = this.namespace.chains) == null ? void 0 : n[0]
            }),
            this.setDefaultChain(`${h}`);
        else
            throw new Error(`Failed to switch to chain 'eip155:${h}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
        return null
    }
    isChainApproved(r) {
        return this.namespace.chains.includes(`${this.name}:${r}`)
    }
}
class QE {
    constructor(r) {
        this.name = "solana",
        this.namespace = r.namespace,
        this.events = nt("events"),
        this.client = nt("client"),
        this.chainId = this.getDefaultChain(),
        this.httpProviders = this.createHttpProviders()
    }
    updateNamespace(r) {
        this.namespace = Object.assign(this.namespace, r)
    }
    requestAccounts() {
        return this.getAccounts()
    }
    request(r) {
        return this.namespace.methods.includes(r.request.method) ? this.client.request(r) : this.getHttpProvider().request(r.request)
    }
    setDefaultChain(r, i) {
        this.httpProviders[r] || this.setHttpProvider(r, i),
        this.chainId = r,
        this.events.emit(hi.DEFAULT_CHAIN_CHANGED, `${this.name}:${r}`)
    }
    getDefaultChain() {
        if (this.chainId)
            return this.chainId;
        if (this.namespace.defaultChain)
            return this.namespace.defaultChain;
        const r = this.namespace.chains[0];
        if (!r)
            throw new Error("ChainId not found");
        return r.split(":")[1]
    }
    getAccounts() {
        const r = this.namespace.accounts;
        return r ? [...new Set(r.filter(i=>i.split(":")[1] === this.chainId.toString()).map(i=>i.split(":")[2]))] : []
    }
    createHttpProviders() {
        const r = {};
        return this.namespace.chains.forEach(i=>{
            var n;
            const o = Vi(i);
            r[o] = this.createHttpProvider(o, (n = this.namespace.rpcMap) == null ? void 0 : n[i])
        }
        ),
        r
    }
    getHttpProvider() {
        const r = `${this.name}:${this.chainId}`
          , i = this.httpProviders[r];
        if (typeof i > "u")
            throw new Error(`JSON-RPC provider for ${r} not found`);
        return i
    }
    setHttpProvider(r, i) {
        const n = this.createHttpProvider(r, i);
        n && (this.httpProviders[r] = n)
    }
    createHttpProvider(r, i) {
        const n = i || Pi(r, this.namespace, this.client.core.projectId);
        if (!n)
            throw new Error(`No RPC url provided for chainId: ${r}`);
        return new ui(new Si(n,nt("disableProviderPing")))
    }
}
class YE {
    constructor(r) {
        this.name = "cosmos",
        this.namespace = r.namespace,
        this.events = nt("events"),
        this.client = nt("client"),
        this.chainId = this.getDefaultChain(),
        this.httpProviders = this.createHttpProviders()
    }
    updateNamespace(r) {
        this.namespace = Object.assign(this.namespace, r)
    }
    requestAccounts() {
        return this.getAccounts()
    }
    getDefaultChain() {
        if (this.chainId)
            return this.chainId;
        if (this.namespace.defaultChain)
            return this.namespace.defaultChain;
        const r = this.namespace.chains[0];
        if (!r)
            throw new Error("ChainId not found");
        return r.split(":")[1]
    }
    request(r) {
        return this.namespace.methods.includes(r.request.method) ? this.client.request(r) : this.getHttpProvider().request(r.request)
    }
    setDefaultChain(r, i) {
        this.httpProviders[r] || this.setHttpProvider(r, i),
        this.chainId = r,
        this.events.emit(hi.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`)
    }
    getAccounts() {
        const r = this.namespace.accounts;
        return r ? [...new Set(r.filter(i=>i.split(":")[1] === this.chainId.toString()).map(i=>i.split(":")[2]))] : []
    }
    createHttpProviders() {
        const r = {};
        return this.namespace.chains.forEach(i=>{
            var n;
            const o = Vi(i);
            r[o] = this.createHttpProvider(o, (n = this.namespace.rpcMap) == null ? void 0 : n[i])
        }
        ),
        r
    }
    getHttpProvider() {
        const r = `${this.name}:${this.chainId}`
          , i = this.httpProviders[r];
        if (typeof i > "u")
            throw new Error(`JSON-RPC provider for ${r} not found`);
        return i
    }
    setHttpProvider(r, i) {
        const n = this.createHttpProvider(r, i);
        n && (this.httpProviders[r] = n)
    }
    createHttpProvider(r, i) {
        const n = i || Pi(r, this.namespace, this.client.core.projectId);
        if (!n)
            throw new Error(`No RPC url provided for chainId: ${r}`);
        return new ui(new Si(n,nt("disableProviderPing")))
    }
}
class XE {
    constructor(r) {
        this.name = "cip34",
        this.namespace = r.namespace,
        this.events = nt("events"),
        this.client = nt("client"),
        this.chainId = this.getDefaultChain(),
        this.httpProviders = this.createHttpProviders()
    }
    updateNamespace(r) {
        this.namespace = Object.assign(this.namespace, r)
    }
    requestAccounts() {
        return this.getAccounts()
    }
    getDefaultChain() {
        if (this.chainId)
            return this.chainId;
        if (this.namespace.defaultChain)
            return this.namespace.defaultChain;
        const r = this.namespace.chains[0];
        if (!r)
            throw new Error("ChainId not found");
        return r.split(":")[1]
    }
    request(r) {
        return this.namespace.methods.includes(r.request.method) ? this.client.request(r) : this.getHttpProvider().request(r.request)
    }
    setDefaultChain(r, i) {
        this.httpProviders[r] || this.setHttpProvider(r, i),
        this.chainId = r,
        this.events.emit(hi.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`)
    }
    getAccounts() {
        const r = this.namespace.accounts;
        return r ? [...new Set(r.filter(i=>i.split(":")[1] === this.chainId.toString()).map(i=>i.split(":")[2]))] : []
    }
    createHttpProviders() {
        const r = {};
        return this.namespace.chains.forEach(i=>{
            const n = this.getCardanoRPCUrl(i)
              , o = Vi(i);
            r[o] = this.createHttpProvider(o, n)
        }
        ),
        r
    }
    getHttpProvider() {
        const r = `${this.name}:${this.chainId}`
          , i = this.httpProviders[r];
        if (typeof i > "u")
            throw new Error(`JSON-RPC provider for ${r} not found`);
        return i
    }
    getCardanoRPCUrl(r) {
        const i = this.namespace.rpcMap;
        if (i)
            return i[r]
    }
    setHttpProvider(r, i) {
        const n = this.createHttpProvider(r, i);
        n && (this.httpProviders[r] = n)
    }
    createHttpProvider(r, i) {
        const n = i || this.getCardanoRPCUrl(r);
        if (!n)
            throw new Error(`No RPC url provided for chainId: ${r}`);
        return new ui(new Si(n,nt("disableProviderPing")))
    }
}
class ZE {
    constructor(r) {
        this.name = "elrond",
        this.namespace = r.namespace,
        this.events = nt("events"),
        this.client = nt("client"),
        this.chainId = this.getDefaultChain(),
        this.httpProviders = this.createHttpProviders()
    }
    updateNamespace(r) {
        this.namespace = Object.assign(this.namespace, r)
    }
    requestAccounts() {
        return this.getAccounts()
    }
    request(r) {
        return this.namespace.methods.includes(r.request.method) ? this.client.request(r) : this.getHttpProvider().request(r.request)
    }
    setDefaultChain(r, i) {
        this.httpProviders[r] || this.setHttpProvider(r, i),
        this.chainId = r,
        this.events.emit(hi.DEFAULT_CHAIN_CHANGED, `${this.name}:${r}`)
    }
    getDefaultChain() {
        if (this.chainId)
            return this.chainId;
        if (this.namespace.defaultChain)
            return this.namespace.defaultChain;
        const r = this.namespace.chains[0];
        if (!r)
            throw new Error("ChainId not found");
        return r.split(":")[1]
    }
    getAccounts() {
        const r = this.namespace.accounts;
        return r ? [...new Set(r.filter(i=>i.split(":")[1] === this.chainId.toString()).map(i=>i.split(":")[2]))] : []
    }
    createHttpProviders() {
        const r = {};
        return this.namespace.chains.forEach(i=>{
            var n;
            const o = Vi(i);
            r[o] = this.createHttpProvider(o, (n = this.namespace.rpcMap) == null ? void 0 : n[i])
        }
        ),
        r
    }
    getHttpProvider() {
        const r = `${this.name}:${this.chainId}`
          , i = this.httpProviders[r];
        if (typeof i > "u")
            throw new Error(`JSON-RPC provider for ${r} not found`);
        return i
    }
    setHttpProvider(r, i) {
        const n = this.createHttpProvider(r, i);
        n && (this.httpProviders[r] = n)
    }
    createHttpProvider(r, i) {
        const n = i || Pi(r, this.namespace, this.client.core.projectId);
        if (!n)
            throw new Error(`No RPC url provided for chainId: ${r}`);
        return new ui(new Si(n,nt("disableProviderPing")))
    }
}
class eI {
    constructor(r) {
        this.name = "multiversx",
        this.namespace = r.namespace,
        this.events = nt("events"),
        this.client = nt("client"),
        this.chainId = this.getDefaultChain(),
        this.httpProviders = this.createHttpProviders()
    }
    updateNamespace(r) {
        this.namespace = Object.assign(this.namespace, r)
    }
    requestAccounts() {
        return this.getAccounts()
    }
    request(r) {
        return this.namespace.methods.includes(r.request.method) ? this.client.request(r) : this.getHttpProvider().request(r.request)
    }
    setDefaultChain(r, i) {
        this.httpProviders[r] || this.setHttpProvider(r, i),
        this.chainId = r,
        this.events.emit(hi.DEFAULT_CHAIN_CHANGED, `${this.name}:${r}`)
    }
    getDefaultChain() {
        if (this.chainId)
            return this.chainId;
        if (this.namespace.defaultChain)
            return this.namespace.defaultChain;
        const r = this.namespace.chains[0];
        if (!r)
            throw new Error("ChainId not found");
        return r.split(":")[1]
    }
    getAccounts() {
        const r = this.namespace.accounts;
        return r ? [...new Set(r.filter(i=>i.split(":")[1] === this.chainId.toString()).map(i=>i.split(":")[2]))] : []
    }
    createHttpProviders() {
        const r = {};
        return this.namespace.chains.forEach(i=>{
            var n;
            const o = Vi(i);
            r[o] = this.createHttpProvider(o, (n = this.namespace.rpcMap) == null ? void 0 : n[i])
        }
        ),
        r
    }
    getHttpProvider() {
        const r = `${this.name}:${this.chainId}`
          , i = this.httpProviders[r];
        if (typeof i > "u")
            throw new Error(`JSON-RPC provider for ${r} not found`);
        return i
    }
    setHttpProvider(r, i) {
        const n = this.createHttpProvider(r, i);
        n && (this.httpProviders[r] = n)
    }
    createHttpProvider(r, i) {
        const n = i || Pi(r, this.namespace, this.client.core.projectId);
        if (!n)
            throw new Error(`No RPC url provided for chainId: ${r}`);
        return new ui(new Si(n,nt("disableProviderPing")))
    }
}
class tI {
    constructor(r) {
        this.name = "near",
        this.namespace = r.namespace,
        this.events = nt("events"),
        this.client = nt("client"),
        this.chainId = this.getDefaultChain(),
        this.httpProviders = this.createHttpProviders()
    }
    updateNamespace(r) {
        this.namespace = Object.assign(this.namespace, r)
    }
    requestAccounts() {
        return this.getAccounts()
    }
    getDefaultChain() {
        if (this.chainId)
            return this.chainId;
        if (this.namespace.defaultChain)
            return this.namespace.defaultChain;
        const r = this.namespace.chains[0];
        if (!r)
            throw new Error("ChainId not found");
        return r.split(":")[1]
    }
    request(r) {
        return this.namespace.methods.includes(r.request.method) ? this.client.request(r) : this.getHttpProvider().request(r.request)
    }
    setDefaultChain(r, i) {
        if (this.chainId = r,
        !this.httpProviders[r]) {
            const n = i || Pi(`${this.name}:${r}`, this.namespace);
            if (!n)
                throw new Error(`No RPC url provided for chainId: ${r}`);
            this.setHttpProvider(r, n)
        }
        this.events.emit(hi.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`)
    }
    getAccounts() {
        const r = this.namespace.accounts;
        return r ? r.filter(i=>i.split(":")[1] === this.chainId.toString()).map(i=>i.split(":")[2]) || [] : []
    }
    createHttpProviders() {
        const r = {};
        return this.namespace.chains.forEach(i=>{
            var n;
            r[i] = this.createHttpProvider(i, (n = this.namespace.rpcMap) == null ? void 0 : n[i])
        }
        ),
        r
    }
    getHttpProvider() {
        const r = `${this.name}:${this.chainId}`
          , i = this.httpProviders[r];
        if (typeof i > "u")
            throw new Error(`JSON-RPC provider for ${r} not found`);
        return i
    }
    setHttpProvider(r, i) {
        const n = this.createHttpProvider(r, i);
        n && (this.httpProviders[r] = n)
    }
    createHttpProvider(r, i) {
        const n = i || Pi(r, this.namespace);
        return typeof n > "u" ? void 0 : new ui(new Si(n,nt("disableProviderPing")))
    }
}
var rI = Object.defineProperty
  , iI = Object.defineProperties
  , sI = Object.getOwnPropertyDescriptors
  , jl = Object.getOwnPropertySymbols
  , nI = Object.prototype.hasOwnProperty
  , oI = Object.prototype.propertyIsEnumerable
  , zl = (a,r,i)=>r in a ? rI(a, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : a[r] = i
  , lo = (a,r)=>{
    for (var i in r || (r = {}))
        nI.call(r, i) && zl(a, i, r[i]);
    if (jl)
        for (var i of jl(r))
            oI.call(r, i) && zl(a, i, r[i]);
    return a
}
  , lc = (a,r)=>iI(a, sI(r));
class Dc {
    constructor(r) {
        this.events = new Pc,
        this.rpcProviders = {},
        this.shouldAbortPairingAttempt = !1,
        this.maxPairingAttempts = 10,
        this.disableProviderPing = !1,
        this.providerOpts = r,
        this.logger = typeof (r == null ? void 0 : r.logger) < "u" && typeof (r == null ? void 0 : r.logger) != "string" ? r.logger : Re.pino(Re.getDefaultLoggerOptions({
            level: (r == null ? void 0 : r.logger) || Dl
        })),
        this.disableProviderPing = (r == null ? void 0 : r.disableProviderPing) || !1
    }
    static async init(r) {
        const i = new Dc(r);
        return await i.initialize(),
        i
    }
    async request(r, i) {
        const [n,o] = this.validateChain(i);
        if (!this.session)
            throw new Error("Please call connect() before request()");
        return await this.getProvider(n).request({
            request: lo({}, r),
            chainId: `${n}:${o}`,
            topic: this.session.topic
        })
    }
    sendAsync(r, i, n) {
        const o = new Date().getTime();
        this.request(r, n).then(h=>i(null, bo(o, h))).catch(h=>i(h, void 0))
    }
    async enable() {
        if (!this.client)
            throw new Error("Sign Client not initialized");
        return this.session || await this.connect({
            namespaces: this.namespaces,
            optionalNamespaces: this.optionalNamespaces,
            sessionProperties: this.sessionProperties
        }),
        await this.requestAccounts()
    }
    async disconnect() {
        var r;
        if (!this.session)
            throw new Error("Please call connect() before enable()");
        await this.client.disconnect({
            topic: (r = this.session) == null ? void 0 : r.topic,
            reason: Gt("USER_DISCONNECTED")
        }),
        await this.cleanup()
    }
    async connect(r) {
        if (!this.client)
            throw new Error("Sign Client not initialized");
        if (this.setNamespaces(r),
        await this.cleanupPendingPairings(),
        !r.skipPairing)
            return await this.pair(r.pairingTopic)
    }
    on(r, i) {
        this.events.on(r, i)
    }
    once(r, i) {
        this.events.once(r, i)
    }
    removeListener(r, i) {
        this.events.removeListener(r, i)
    }
    off(r, i) {
        this.events.off(r, i)
    }
    get isWalletConnect() {
        return !0
    }
    async pair(r) {
        this.shouldAbortPairingAttempt = !1;
        let i = 0;
        do {
            if (this.shouldAbortPairingAttempt)
                throw new Error("Pairing aborted");
            if (i >= this.maxPairingAttempts)
                throw new Error("Max auto pairing attempts reached");
            const {uri: n, approval: o} = await this.client.connect({
                pairingTopic: r,
                requiredNamespaces: this.namespaces,
                optionalNamespaces: this.optionalNamespaces,
                sessionProperties: this.sessionProperties
            });
            n && (this.uri = n,
            this.events.emit("display_uri", n)),
            await o().then(h=>{
                this.session = h,
                this.namespaces || (this.namespaces = GE(h.namespaces),
                this.persist("namespaces", this.namespaces))
            }
            ).catch(h=>{
                if (h.message !== Nf)
                    throw h;
                i++
            }
            )
        } while (!this.session);
        return this.onConnect(),
        this.session
    }
    setDefaultChain(r, i) {
        try {
            if (!this.session)
                return;
            const [n,o] = this.validateChain(r);
            this.getProvider(n).setDefaultChain(o, i)
        } catch (n) {
            if (!/Please call connect/.test(n.message))
                throw n
        }
    }
    async cleanupPendingPairings(r={}) {
        this.logger.info("Cleaning up inactive pairings...");
        const i = this.client.pairing.getAll();
        if (ms(i)) {
            for (const n of i)
                r.deletePairings ? this.client.core.expirer.set(n.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(n.topic);
            this.logger.info(`Inactive pairings cleared: ${i.length}`)
        }
    }
    abortPairingAttempt() {
        this.shouldAbortPairingAttempt = !0
    }
    async checkStorage() {
        if (this.namespaces = await this.getFromStore("namespaces"),
        this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {},
        this.client.session.length) {
            const r = this.client.session.keys.length - 1;
            this.session = this.client.session.get(this.client.session.keys[r]),
            this.createProviders()
        }
    }
    async initialize() {
        this.logger.trace("Initialized"),
        await this.createClient(),
        await this.checkStorage(),
        this.registerEventListeners()
    }
    async createClient() {
        this.client = this.providerOpts.client || await AE.init({
            logger: this.providerOpts.logger || Dl,
            relayUrl: this.providerOpts.relayUrl || $E,
            projectId: this.providerOpts.projectId,
            metadata: this.providerOpts.metadata,
            storageOptions: this.providerOpts.storageOptions,
            storage: this.providerOpts.storage,
            name: this.providerOpts.name
        }),
        this.logger.trace("SignClient Initialized")
    }
    createProviders() {
        if (!this.client)
            throw new Error("Sign Client not initialized");
        if (!this.session)
            throw new Error("Session not initialized. Please call connect() before enable()");
        const r = [...new Set(Object.keys(this.session.namespaces).map(i=>Gs(i)))];
        hc("client", this.client),
        hc("events", this.events),
        hc("disableProviderPing", this.disableProviderPing),
        r.forEach(i=>{
            if (!this.session)
                return;
            const n = BE(i, this.session)
              , o = $f(n)
              , h = FE(this.namespaces, this.optionalNamespaces)
              , p = lc(lo({}, h[i]), {
                accounts: n,
                chains: o
            });
            switch (i) {
            case "eip155":
                this.rpcProviders[i] = new JE({
                    namespace: p
                });
                break;
            case "solana":
                this.rpcProviders[i] = new QE({
                    namespace: p
                });
                break;
            case "cosmos":
                this.rpcProviders[i] = new YE({
                    namespace: p
                });
                break;
            case "polkadot":
                this.rpcProviders[i] = new WE({
                    namespace: p
                });
                break;
            case "cip34":
                this.rpcProviders[i] = new XE({
                    namespace: p
                });
                break;
            case "elrond":
                this.rpcProviders[i] = new ZE({
                    namespace: p
                });
                break;
            case "multiversx":
                this.rpcProviders[i] = new eI({
                    namespace: p
                });
                break;
            case "near":
                this.rpcProviders[i] = new tI({
                    namespace: p
                });
                break
            }
        }
        )
    }
    registerEventListeners() {
        if (typeof this.client > "u")
            throw new Error("Sign Client is not initialized");
        this.client.on("session_ping", r=>{
            this.events.emit("session_ping", r)
        }
        ),
        this.client.on("session_event", r=>{
            const {params: i} = r
              , {event: n} = i;
            if (n.name === "accountsChanged") {
                const o = n.data;
                o && ms(o) && this.events.emit("accountsChanged", o.map(VE))
            } else if (n.name === "chainChanged") {
                const o = i.chainId
                  , h = i.event.data
                  , p = Gs(o)
                  , g = uc(o) !== uc(h) ? `${p}:${uc(h)}` : o;
                this.onChainChanged(g)
            } else
                this.events.emit(n.name, n.data);
            this.events.emit("session_event", r)
        }
        ),
        this.client.on("session_update", ({topic: r, params: i})=>{
            var n;
            const {namespaces: o} = i
              , h = (n = this.client) == null ? void 0 : n.session.get(r);
            this.session = lc(lo({}, h), {
                namespaces: o
            }),
            this.onSessionUpdate(),
            this.events.emit("session_update", {
                topic: r,
                params: i
            })
        }
        ),
        this.client.on("session_delete", async r=>{
            await this.cleanup(),
            this.events.emit("session_delete", r),
            this.events.emit("disconnect", lc(lo({}, Gt("USER_DISCONNECTED")), {
                data: r.topic
            }))
        }
        ),
        this.on(hi.DEFAULT_CHAIN_CHANGED, r=>{
            this.onChainChanged(r, !0)
        }
        )
    }
    getProvider(r) {
        if (!this.rpcProviders[r])
            throw new Error(`Provider not found: ${r}`);
        return this.rpcProviders[r]
    }
    onSessionUpdate() {
        Object.keys(this.rpcProviders).forEach(r=>{
            var i;
            this.getProvider(r).updateNamespace((i = this.session) == null ? void 0 : i.namespaces[r])
        }
        )
    }
    setNamespaces(r) {
        const {namespaces: i, optionalNamespaces: n, sessionProperties: o} = r;
        i && Object.keys(i).length && (this.namespaces = i),
        n && Object.keys(n).length && (this.optionalNamespaces = n),
        this.sessionProperties = o,
        this.persist("namespaces", i),
        this.persist("optionalNamespaces", n)
    }
    validateChain(r) {
        const [i,n] = (r == null ? void 0 : r.split(":")) || ["", ""];
        if (!this.namespaces || !Object.keys(this.namespaces).length)
            return [i, n];
        if (i && !Object.keys(this.namespaces || {}).map(p=>Gs(p)).includes(i))
            throw new Error(`Namespace '${i}' is not configured. Please call connect() first with namespace config.`);
        if (i && n)
            return [i, n];
        const o = Gs(Object.keys(this.namespaces)[0])
          , h = this.rpcProviders[o].getDefaultChain();
        return [o, h]
    }
    async requestAccounts() {
        const [r] = this.validateChain();
        return await this.getProvider(r).requestAccounts()
    }
    onChainChanged(r, i=!1) {
        var n;
        if (!this.namespaces)
            return;
        const [o,h] = this.validateChain(r);
        i || this.getProvider(o).setDefaultChain(h),
        ((n = this.namespaces[o]) != null ? n : this.namespaces[`${o}:${h}`]).defaultChain = h,
        this.persist("namespaces", this.namespaces),
        this.events.emit("chainChanged", h)
    }
    onConnect() {
        this.createProviders(),
        this.events.emit("connect", {
            session: this.session
        })
    }
    async cleanup() {
        this.session = void 0,
        this.namespaces = void 0,
        this.optionalNamespaces = void 0,
        this.sessionProperties = void 0,
        this.persist("namespaces", void 0),
        this.persist("optionalNamespaces", void 0),
        this.persist("sessionProperties", void 0),
        await this.cleanupPendingPairings({
            deletePairings: !0
        })
    }
    persist(r, i) {
        this.client.core.storage.setItem(`${$l}/${r}`, i)
    }
    async getFromStore(r) {
        return await this.client.core.storage.getItem(`${$l}/${r}`)
    }
}
const aI = Dc
  , cI = "wc"
  , uI = "ethereum_provider"
  , hI = `${cI}@2:${uI}:`
  , lI = "https://rpc.walletconnect.com/v1/"
  , bc = ["eth_sendTransaction", "personal_sign"]
  , fI = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "eth_sendTransaction", "personal_sign", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode"]
  , Ec = ["chainChanged", "accountsChanged"]
  , pI = ["chainChanged", "accountsChanged", "message", "disconnect", "connect"];
var dI = Object.defineProperty
  , gI = Object.defineProperties
  , yI = Object.getOwnPropertyDescriptors
  , Ul = Object.getOwnPropertySymbols
  , vI = Object.prototype.hasOwnProperty
  , mI = Object.prototype.propertyIsEnumerable
  , Hl = (a,r,i)=>r in a ? dI(a, r, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: i
}) : a[r] = i
  , Js = (a,r)=>{
    for (var i in r || (r = {}))
        vI.call(r, i) && Hl(a, i, r[i]);
    if (Ul)
        for (var i of Ul(r))
            mI.call(r, i) && Hl(a, i, r[i]);
    return a
}
  , kl = (a,r)=>gI(a, yI(r));
function wo(a) {
    return Number(a[0].split(":")[1])
}
function fc(a) {
    return `0x${a.toString(16)}`
}
function wI(a) {
    const {chains: r, optionalChains: i, methods: n, optionalMethods: o, events: h, optionalEvents: p, rpcMap: g} = a;
    if (!ms(r))
        throw new Error("Invalid chains");
    const _ = {
        chains: r,
        methods: n || bc,
        events: h || Ec,
        rpcMap: Js({}, r.length ? {
            [wo(r)]: g[wo(r)]
        } : {})
    }
      , v = h == null ? void 0 : h.filter(z=>!Ec.includes(z))
      , I = n == null ? void 0 : n.filter(z=>!bc.includes(z));
    if (!i && !p && !o && !(v != null && v.length) && !(I != null && I.length))
        return {
            required: r.length ? _ : void 0
        };
    const R = (v == null ? void 0 : v.length) && (I == null ? void 0 : I.length) || !i
      , A = {
        chains: [...new Set(R ? _.chains.concat(i || []) : i)],
        methods: [...new Set(_.methods.concat(o != null && o.length ? o : fI))],
        events: [...new Set(_.events.concat(p != null && p.length ? p : pI))],
        rpcMap: g
    };
    return {
        required: r.length ? _ : void 0,
        optional: i.length ? A : void 0
    }
}
class $c {
    constructor() {
        this.events = new Or.EventEmitter,
        this.namespace = "eip155",
        this.accounts = [],
        this.chainId = 1,
        this.STORAGE_KEY = hI,
        this.on = (r,i)=>(this.events.on(r, i),
        this),
        this.once = (r,i)=>(this.events.once(r, i),
        this),
        this.removeListener = (r,i)=>(this.events.removeListener(r, i),
        this),
        this.off = (r,i)=>(this.events.off(r, i),
        this),
        this.parseAccount = r=>this.isCompatibleChainId(r) ? this.parseAccountId(r).address : r,
        this.signer = {},
        this.rpc = {}
    }
    static async init(r) {
        const i = new $c;
        return await i.initialize(r),
        i
    }
    async request(r) {
        return await this.signer.request(r, this.formatChainId(this.chainId))
    }
    sendAsync(r, i) {
        this.signer.sendAsync(r, i, this.formatChainId(this.chainId))
    }
    get connected() {
        return this.signer.client ? this.signer.client.core.relayer.connected : !1
    }
    get connecting() {
        return this.signer.client ? this.signer.client.core.relayer.connecting : !1
    }
    async enable() {
        return this.session || await this.connect(),
        await this.request({
            method: "eth_requestAccounts"
        })
    }
    async connect(r) {
        if (!this.signer.client)
            throw new Error("Provider not initialized. Call init() first");
        this.loadConnectOpts(r);
        const {required: i, optional: n} = wI(this.rpc);
        try {
            const o = await new Promise(async(p,g)=>{
                var _;
                this.rpc.showQrModal && ((_ = this.modal) == null || _.subscribeModal(v=>{
                    !v.open && !this.signer.session && (this.signer.abortPairingAttempt(),
                    g(new Error("Connection request reset. Please try again.")))
                }
                )),
                await this.signer.connect(kl(Js({
                    namespaces: Js({}, i && {
                        [this.namespace]: i
                    })
                }, n && {
                    optionalNamespaces: {
                        [this.namespace]: n
                    }
                }), {
                    pairingTopic: r == null ? void 0 : r.pairingTopic
                })).then(v=>{
                    p(v)
                }
                ).catch(v=>{
                    g(new Error(v.message))
                }
                )
            }
            );
            if (!o)
                return;
            const h = Z0(o.namespaces, [this.namespace]);
            this.setChainIds(this.rpc.chains.length ? this.rpc.chains : h),
            this.setAccounts(h),
            this.events.emit("connect", {
                chainId: fc(this.chainId)
            })
        } catch (o) {
            throw this.signer.logger.error(o),
            o
        } finally {
            this.modal && this.modal.closeModal()
        }
    }
    async disconnect() {
        this.session && await this.signer.disconnect(),
        this.reset()
    }
    get isWalletConnect() {
        return !0
    }
    get session() {
        return this.signer.session
    }
    registerEventListeners() {
        this.signer.on("session_event", r=>{
            const {params: i} = r
              , {event: n} = i;
            n.name === "accountsChanged" ? (this.accounts = this.parseAccounts(n.data),
            this.events.emit("accountsChanged", this.accounts)) : n.name === "chainChanged" ? this.setChainId(this.formatChainId(n.data)) : this.events.emit(n.name, n.data),
            this.events.emit("session_event", r)
        }
        ),
        this.signer.on("chainChanged", r=>{
            const i = parseInt(r);
            this.chainId = i,
            this.events.emit("chainChanged", fc(this.chainId)),
            this.persist()
        }
        ),
        this.signer.on("session_update", r=>{
            this.events.emit("session_update", r)
        }
        ),
        this.signer.on("session_delete", r=>{
            this.reset(),
            this.events.emit("session_delete", r),
            this.events.emit("disconnect", kl(Js({}, Gt("USER_DISCONNECTED")), {
                data: r.topic,
                name: "USER_DISCONNECTED"
            }))
        }
        ),
        this.signer.on("display_uri", r=>{
            var i, n;
            this.rpc.showQrModal && ((i = this.modal) == null || i.closeModal(),
            (n = this.modal) == null || n.openModal({
                uri: r
            })),
            this.events.emit("display_uri", r)
        }
        )
    }
    switchEthereumChain(r) {
        this.request({
            method: "wallet_switchEthereumChain",
            params: [{
                chainId: r.toString(16)
            }]
        })
    }
    isCompatibleChainId(r) {
        return typeof r == "string" ? r.startsWith(`${this.namespace}:`) : !1
    }
    formatChainId(r) {
        return `${this.namespace}:${r}`
    }
    parseChainId(r) {
        return Number(r.split(":")[1])
    }
    setChainIds(r) {
        const i = r.filter(n=>this.isCompatibleChainId(n)).map(n=>this.parseChainId(n));
        i.length && (this.chainId = i[0],
        this.events.emit("chainChanged", fc(this.chainId)),
        this.persist())
    }
    setChainId(r) {
        if (this.isCompatibleChainId(r)) {
            const i = this.parseChainId(r);
            this.chainId = i,
            this.switchEthereumChain(i)
        }
    }
    parseAccountId(r) {
        const [i,n,o] = r.split(":");
        return {
            chainId: `${i}:${n}`,
            address: o
        }
    }
    setAccounts(r) {
        this.accounts = r.filter(i=>this.parseChainId(this.parseAccountId(i).chainId) === this.chainId).map(i=>this.parseAccountId(i).address),
        this.events.emit("accountsChanged", this.accounts)
    }
    getRpcConfig(r) {
        var i, n;
        const o = (i = r == null ? void 0 : r.chains) != null ? i : []
          , h = (n = r == null ? void 0 : r.optionalChains) != null ? n : []
          , p = o.concat(h);
        if (!p.length)
            throw new Error("No chains specified in either `chains` or `optionalChains`");
        const g = o.length ? (r == null ? void 0 : r.methods) || bc : []
          , _ = o.length ? (r == null ? void 0 : r.events) || Ec : []
          , v = (r == null ? void 0 : r.optionalMethods) || []
          , I = (r == null ? void 0 : r.optionalEvents) || []
          , R = (r == null ? void 0 : r.rpcMap) || this.buildRpcMap(p, r.projectId)
          , A = (r == null ? void 0 : r.qrModalOptions) || void 0;
        return {
            chains: o == null ? void 0 : o.map(z=>this.formatChainId(z)),
            optionalChains: h.map(z=>this.formatChainId(z)),
            methods: g,
            events: _,
            optionalMethods: v,
            optionalEvents: I,
            rpcMap: R,
            showQrModal: !!(r != null && r.showQrModal),
            qrModalOptions: A,
            projectId: r.projectId,
            metadata: r.metadata
        }
    }
    buildRpcMap(r, i) {
        const n = {};
        return r.forEach(o=>{
            n[o] = this.getRpcUrl(o, i)
        }
        ),
        n
    }
    async initialize(r) {
        if (this.rpc = this.getRpcConfig(r),
        this.chainId = this.rpc.chains.length ? wo(this.rpc.chains) : wo(this.rpc.optionalChains),
        this.signer = await aI.init({
            projectId: this.rpc.projectId,
            metadata: this.rpc.metadata,
            disableProviderPing: r.disableProviderPing,
            relayUrl: r.relayUrl,
            storageOptions: r.storageOptions
        }),
        this.registerEventListeners(),
        await this.loadPersistedSession(),
        this.rpc.showQrModal) {
            let i;
            try {
                const {WalletConnectModal: n} = await ew(()=>import("./index-VEdGhqKC.js").then(o=>o.i), __vite__mapDeps([0, 1, 2]));
                i = n
            } catch {
                throw new Error("To use QR modal, please install @walletconnect/modal package")
            }
            if (i)
                try {
                    this.modal = new i(Js({
                        projectId: this.rpc.projectId
                    }, this.rpc.qrModalOptions))
                } catch (n) {
                    throw this.signer.logger.error(n),
                    new Error("Could not generate WalletConnectModal Instance")
                }
        }
    }
    loadConnectOpts(r) {
        if (!r)
            return;
        const {chains: i, optionalChains: n, rpcMap: o} = r;
        i && ms(i) && (this.rpc.chains = i.map(h=>this.formatChainId(h)),
        i.forEach(h=>{
            this.rpc.rpcMap[h] = (o == null ? void 0 : o[h]) || this.getRpcUrl(h)
        }
        )),
        n && ms(n) && (this.rpc.optionalChains = [],
        this.rpc.optionalChains = n == null ? void 0 : n.map(h=>this.formatChainId(h)),
        n.forEach(h=>{
            this.rpc.rpcMap[h] = (o == null ? void 0 : o[h]) || this.getRpcUrl(h)
        }
        ))
    }
    getRpcUrl(r, i) {
        var n;
        return ((n = this.rpc.rpcMap) == null ? void 0 : n[r]) || `${lI}?chainId=eip155:${r}&projectId=${i || this.rpc.projectId}`
    }
    async loadPersistedSession() {
        if (!this.session)
            return;
        const r = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`)
          , i = this.session.namespaces[`${this.namespace}:${r}`] ? this.session.namespaces[`${this.namespace}:${r}`] : this.session.namespaces[this.namespace];
        this.setChainIds(r ? [this.formatChainId(r)] : i == null ? void 0 : i.accounts),
        this.setAccounts(i == null ? void 0 : i.accounts)
    }
    reset() {
        this.chainId = 1,
        this.accounts = []
    }
    persist() {
        this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId)
    }
    parseAccounts(r) {
        return typeof r == "string" || r instanceof String ? [this.parseAccount(r)] : r.map(i=>this.parseAccount(i))
    }
}
const qI = $c;
export {qI as EthereumProvider, pI as OPTIONAL_EVENTS, fI as OPTIONAL_METHODS, Ec as REQUIRED_EVENTS, bc as REQUIRED_METHODS, $c as default};
function __vite__mapDeps(indexes) {
    if (!__vite__mapDeps.viteFileDeps) {
        __vite__mapDeps.viteFileDeps = ["assets/index-VEdGhqKC.js", "assets/index-qhCtXGwZ.js", "assets/index-1ohR1QpQ.css"]
    }
    return indexes.map((i)=>__vite__mapDeps.viteFileDeps[i])
}
