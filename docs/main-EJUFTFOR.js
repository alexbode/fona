var op$1 = Object.defineProperty,
  ip$1 = Object.defineProperties;
var sp$1 = Object.getOwnPropertyDescriptors;
var Xa$1 = Object.getOwnPropertySymbols;
var ap$1 = Object.prototype.hasOwnProperty,
  cp$1 = Object.prototype.propertyIsEnumerable;
var ec$1 = (e, t, n) =>
    t in e
      ? op$1(e, t, { enumerable: true, configurable: true, writable: true, value: n })
      : (e[t] = n),
  j$1 = (e, t) => {
    for (var n in (t ||= {})) ap$1.call(t, n) && ec$1(e, n, t[n]);
    if (Xa$1) for (var n of Xa$1(t)) cp$1.call(t, n) && ec$1(e, n, t[n]);
    return e;
  },
  V = (e, t) => ip$1(e, sp$1(t));
var q = null,
  or$1 = false,
  ri$1 = 1,
  L = Symbol('SIGNAL');
function y$1(e) {
  let t = q;
  return ((q = e), t);
}
function ir$1() {
  return q;
}
var $e$1 = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: false,
  producers: void 0,
  producersTail: void 0,
  consumers: void 0,
  consumersTail: void 0,
  recomputing: false,
  consumerAllowSignalWrites: false,
  consumerIsAlwaysLive: false,
  kind: 'unknown',
  producerMustRecompute: () => false,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function Ue$1(e) {
  if (or$1) throw new Error('');
  if (q === null) return;
  q.consumerOnSignalRead(e);
  let t = q.producersTail;
  if (t !== void 0 && t.producer === e) return;
  let n,
    r = q.recomputing;
  if (r && ((n = t !== void 0 ? t.nextProducer : q.producers), n !== void 0 && n.producer === e)) {
    ((q.producersTail = n), (n.lastReadVersion = e.version));
    return;
  }
  let o = e.consumersTail;
  if (o !== void 0 && o.consumer === q && (!r || dp$1(o, q))) return;
  let i = Lt(q),
    s = {
      producer: e,
      consumer: q,
      nextProducer: n,
      prevConsumer: o,
      lastReadVersion: e.version,
      nextConsumer: void 0,
    };
  ((q.producersTail = s), t !== void 0 ? (t.nextProducer = s) : (q.producers = s), i && oc$1(e, s));
}
function tc$1() {
  ri$1++;
}
function ct$1(e) {
  if (!(Lt(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === ri$1)) {
    if (!e.producerMustRecompute(e) && !Pt(e)) {
      Ot(e);
      return;
    }
    (e.producerRecomputeValue(e), Ot(e));
  }
}
function oi$1(e) {
  if (e.consumers === void 0) return;
  let t = or$1;
  or$1 = true;
  try {
    for (let n = e.consumers; n !== void 0; n = n.nextConsumer) {
      let r = n.consumer;
      r.dirty || up$1(r);
    }
  } finally {
    or$1 = t;
  }
}
function ii$1() {
  return q?.consumerAllowSignalWrites !== false;
}
function up$1(e) {
  ((e.dirty = true), oi$1(e), e.consumerMarkedDirty?.(e));
}
function Ot(e) {
  ((e.dirty = false), (e.lastCleanEpoch = ri$1));
}
function Se$1(e) {
  return (e && nc$1(e), y$1(e));
}
function nc$1(e) {
  ((e.producersTail = void 0), (e.recomputing = true));
}
function We$1(e, t) {
  (y$1(t), e && rc$1(e));
}
function rc$1(e) {
  e.recomputing = false;
  let t = e.producersTail,
    n = t !== void 0 ? t.nextProducer : e.producers;
  if (n !== void 0) {
    if (Lt(e))
      do n = si$1(n);
      while (n !== void 0);
    t !== void 0 ? (t.nextProducer = void 0) : (e.producers = void 0);
  }
}
function Pt(e) {
  for (let t = e.producers; t !== void 0; t = t.nextProducer) {
    let n = t.producer,
      r = t.lastReadVersion;
    if (r !== n.version || (ct$1(n), r !== n.version)) return true;
  }
  return false;
}
function qe$1(e) {
  if (Lt(e)) {
    let t = e.producers;
    for (; t !== void 0; ) t = si$1(t);
  }
  ((e.producers = void 0),
    (e.producersTail = void 0),
    (e.consumers = void 0),
    (e.consumersTail = void 0));
}
function oc$1(e, t) {
  let n = e.consumersTail,
    r = Lt(e);
  if (
    (n !== void 0
      ? ((t.nextConsumer = n.nextConsumer), (n.nextConsumer = t))
      : ((t.nextConsumer = void 0), (e.consumers = t)),
    (t.prevConsumer = n),
    (e.consumersTail = t),
    !r)
  )
    for (let o = e.producers; o !== void 0; o = o.nextProducer) oc$1(o.producer, o);
}
function si$1(e) {
  let t = e.producer,
    n = e.nextProducer,
    r = e.nextConsumer,
    o = e.prevConsumer;
  if (
    ((e.nextConsumer = void 0),
    (e.prevConsumer = void 0),
    r !== void 0 ? (r.prevConsumer = o) : (t.consumersTail = o),
    o !== void 0)
  )
    o.nextConsumer = r;
  else if (((t.consumers = r), !Lt(t))) {
    let i = t.producers;
    for (; i !== void 0; ) i = si$1(i);
  }
  return n;
}
function Lt(e) {
  return e.consumerIsAlwaysLive || e.consumers !== void 0;
}
function dp$1(e, t) {
  let n = t.producersTail;
  if (n !== void 0) {
    let r = t.producers;
    do {
      if (r === e) return true;
      if (r === n) break;
      r = r.nextProducer;
    } while (r !== void 0);
  }
  return false;
}
function mn$1(e, t) {
  return Object.is(e, t);
}
function yn$1(e, t) {
  let n = Object.create(fp$1);
  ((n.computation = e), t !== void 0 && (n.equal = t));
  let r = () => {
    if ((ct$1(n), Ue$1(n), n.value === me$2)) throw n.error;
    return n.value;
  };
  return ((r[L] = n), r);
}
var st = Symbol('UNSET'),
  at$1 = Symbol('COMPUTING'),
  me$2 = Symbol('ERRORED'),
  fp$1 = V(j$1({}, $e$1), {
    value: st,
    dirty: true,
    error: null,
    equal: mn$1,
    kind: 'computed',
    producerMustRecompute(e) {
      return e.value === st || e.value === at$1;
    },
    producerRecomputeValue(e) {
      if (e.value === at$1) throw new Error('');
      let t = e.value;
      e.value = at$1;
      let n = Se$1(e),
        r,
        o = false;
      try {
        ((r = e.computation()),
          y$1(null),
          (o = t !== st && t !== me$2 && r !== me$2 && e.equal(t, r)));
      } catch (i) {
        ((r = me$2), (e.error = i));
      } finally {
        We$1(e, n);
      }
      if (o) {
        e.value = t;
        return;
      }
      ((e.value = r), e.version++);
    },
  });
function pp$1() {
  throw new Error();
}
var ic$1 = pp$1;
function sc$1(e) {
  ic$1(e);
}
function ai$1(e) {
  ic$1 = e;
}
function ci$1(e, t) {
  let n = Object.create(vn$1);
  ((n.value = e), t !== void 0 && (n.equal = t));
  let r = () => ac$1(n);
  return ((r[L] = n), [r, (s) => lt$1(n, s), (s) => sr$1(n, s)]);
}
function ac$1(e) {
  return (Ue$1(e), e.value);
}
function lt$1(e, t) {
  (ii$1() || sc$1(e), e.equal(e.value, t) || ((e.value = t), gp$1(e)));
}
function sr$1(e, t) {
  (ii$1() || sc$1(e), lt$1(e, t(e.value)));
}
var vn$1 = V(j$1({}, $e$1), { equal: mn$1, value: void 0, kind: 'signal' });
function gp$1(e) {
  (e.version++, tc$1(), oi$1(e));
}
var li$1 = V(j$1({}, $e$1), {
  consumerIsAlwaysLive: true,
  consumerAllowSignalWrites: true,
  dirty: true,
  kind: 'effect',
});
function ui$1(e) {
  if (((e.dirty = false), e.version > 0 && !Pt(e))) return;
  e.version++;
  let t = Se$1(e);
  try {
    (e.cleanup(), e.fn());
  } finally {
    We$1(e, t);
  }
}
var di$1;
function ar$1() {
  return di$1;
}
function ye$1(e) {
  let t = di$1;
  return ((di$1 = e), t);
}
var cc$1 = Symbol('NotFound');
function Ft(e) {
  return e === cc$1 || e?.name === '\u0275NotFound';
}
function fi$1(e, t, n) {
  let r = Object.create(mp$1);
  ((r.source = e), (r.computation = t), n != null && (r.equal = n));
  let i = () => {
    if ((ct$1(r), Ue$1(r), r.value === me$2)) throw r.error;
    return r.value;
  };
  return ((i[L] = r), i);
}
function lc$1(e, t) {
  (ct$1(e), lt$1(e, t), Ot(e));
}
function uc$1(e, t) {
  if ((ct$1(e), e.value === me$2)) throw e.error;
  (sr$1(e, t), Ot(e));
}
var mp$1 = V(j$1({}, $e$1), {
  value: st,
  dirty: true,
  error: null,
  equal: mn$1,
  kind: 'linkedSignal',
  producerMustRecompute(e) {
    return e.value === st || e.value === at$1;
  },
  producerRecomputeValue(e) {
    if (e.value === at$1) throw new Error('');
    let t = e.value;
    e.value = at$1;
    let n = Se$1(e),
      r,
      o = false;
    try {
      let i = e.source(),
        s = t !== st && t !== me$2,
        a = s ? { source: e.sourceValue, value: t } : void 0;
      ((r = e.computation(i, a)),
        (e.sourceValue = i),
        y$1(null),
        (o = s && r !== me$2 && e.equal(t, r)));
    } catch (i) {
      ((r = me$2), (e.error = i));
    } finally {
      We$1(e, n);
    }
    if (o) {
      e.value = t;
      return;
    }
    ((e.value = r), e.version++);
  },
});
function dc$1(e) {
  let t = y$1(null);
  try {
    return e();
  } finally {
    y$1(t);
  }
}
function D(e) {
  return typeof e == 'function';
}
function jt(e) {
  let n = e((r) => {
    (Error.call(r), (r.stack = new Error().stack));
  });
  return ((n.prototype = Object.create(Error.prototype)), (n.prototype.constructor = n), n);
}
var cr$1 = jt(
  (e) =>
    function (n) {
      (e(this),
        (this.message = n
          ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
          : ''),
        (this.name = 'UnsubscriptionError'),
        (this.errors = n));
    },
);
function En$1(e, t) {
  if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var Q = class e {
  constructor(t) {
    ((this.initialTeardown = t),
      (this.closed = false),
      (this._parentage = null),
      (this._finalizers = null));
  }
  unsubscribe() {
    let t;
    if (!this.closed) {
      this.closed = true;
      let { _parentage: n } = this;
      if (n)
        if (((this._parentage = null), Array.isArray(n))) for (let i of n) i.remove(this);
        else n.remove(this);
      let { initialTeardown: r } = this;
      if (D(r))
        try {
          r();
        } catch (i) {
          t = i instanceof cr$1 ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            fc(i);
          } catch (s) {
            ((t = t ?? []), s instanceof cr$1 ? (t = [...t, ...s.errors]) : t.push(s));
          }
      }
      if (t) throw new cr$1(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) fc(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this)) return;
          t._addParent(this);
        }
        (this._finalizers = (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }
  _hasParent(t) {
    let { _parentage: n } = this;
    return n === t || (Array.isArray(n) && n.includes(t));
  }
  _addParent(t) {
    let { _parentage: n } = this;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }
  _removeParent(t) {
    let { _parentage: n } = this;
    n === t ? (this._parentage = null) : Array.isArray(n) && En$1(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    (n && En$1(n, t), t instanceof e && t._removeParent(this));
  }
};
Q.EMPTY = (() => {
  let e = new Q();
  return ((e.closed = true), e);
})();
var pi$1 = Q.EMPTY;
function lr$1(e) {
  return e instanceof Q || (e && 'closed' in e && D(e.remove) && D(e.add) && D(e.unsubscribe));
}
function fc(e) {
  D(e) ? e() : e.unsubscribe();
}
var ue = { Promise: void 0 };
var Vt$1 = {
  setTimeout(e, t, ...n) {
    return setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    return clearTimeout(e);
  },
  delegate: void 0,
};
function ur$1(e) {
  Vt$1.setTimeout(() => {
    throw e;
  });
}
function In() {}
function Ht$1(e) {
  e();
}
var dt$1 = class dt extends Q {
  constructor(t) {
    (super(),
      (this.isStopped = false),
      t ? ((this.destination = t), lr$1(t) && t.add(this)) : (this.destination = Ep$1));
  }
  static create(t, n, r) {
    return new xe$1(t, n, r);
  }
  next(t) {
    this.isStopped ? mi$1() : this._next(t);
  }
  error(t) {
    this.isStopped ? mi$1() : ((this.isStopped = true), this._error(t));
  }
  complete() {
    this.isStopped ? mi$1() : ((this.isStopped = true), this._complete());
  }
  unsubscribe() {
    this.closed || ((this.isStopped = true), super.unsubscribe(), (this.destination = null));
  }
  _next(t) {
    this.destination.next(t);
  }
  _error(t) {
    try {
      this.destination.error(t);
    } finally {
      this.unsubscribe();
    }
  }
  _complete() {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  }
};
var yi$1 = class yi {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          dr$1(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          dr$1(r);
        }
      else dr$1(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          dr$1(n);
        }
    }
  },
  xe$1 = class xe extends dt$1 {
    constructor(t, n, r) {
      super();
      let o;
      if (D(t) || !t) o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        o = t;
      }
      this.destination = new yi$1(o);
    }
  };
function dr$1(e) {
  ur$1(e);
}
function vp$1(e) {
  throw e;
}
function mi$1(e, t) {}
var Ep$1 = { closed: true, next: In, error: vp$1, complete: In };
var Bt = (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
function K$1(e) {
  return e;
}
function Ip$1(...e) {
  return vi$1(e);
}
function vi$1(e) {
  return e.length === 0
    ? K$1
    : e.length === 1
      ? e[0]
      : function (n) {
          return e.reduce((r, o) => o(r), n);
        };
}
var x$1 = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return ((r.source = this), (r.operator = n), r);
    }
    subscribe(n, r, o) {
      let i = Tp$1(n) ? n : new xe$1(n, r, o);
      return (
        Ht$1(() => {
          let { operator: s, source: a } = this;
          i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i));
        }),
        i
      );
    }
    _trySubscribe(n) {
      try {
        return this._subscribe(n);
      } catch (r) {
        n.error(r);
      }
    }
    forEach(n, r) {
      return (
        (r = yc$1(r)),
        new r((o, i) => {
          let s = new xe$1({
            next: (a) => {
              try {
                n(a);
              } catch (c) {
                (i(c), s.unsubscribe());
              }
            },
            error: i,
            complete: o,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(n) {
      var r;
      return (r = this.source) === null || r === void 0 ? void 0 : r.subscribe(n);
    }
    [Bt]() {
      return this;
    }
    pipe(...n) {
      return vi$1(n)(this);
    }
    toPromise(n) {
      return (
        (n = yc$1(n)),
        new n((r, o) => {
          let i;
          this.subscribe(
            (s) => (i = s),
            (s) => o(s),
            () => r(i),
          );
        })
      );
    }
  }
  return ((e.create = (t) => new e(t)), e);
})();
function yc$1(e) {
  var t;
  return (t = e ?? ue.Promise) !== null && t !== void 0 ? t : Promise;
}
function Dp$1(e) {
  return e && D(e.next) && D(e.error) && D(e.complete);
}
function Tp$1(e) {
  return (e && e instanceof dt$1) || (Dp$1(e) && lr$1(e));
}
function wp(e) {
  return D(e?.lift);
}
function w(e) {
  return (t) => {
    if (wp(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError('Unable to lift unknown Observable type');
  };
}
function b$1(e, t, n, r, o) {
  return new Ei$1(e, t, n, r, o);
}
var Ei$1 = class Ei extends dt$1 {
  constructor(t, n, r, o, i, s) {
    (super(t),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = s),
      (this._next = n
        ? function (a) {
            try {
              n(a);
            } catch (c) {
              t.error(c);
            }
          }
        : super._next),
      (this._error = o
        ? function (a) {
            try {
              o(a);
            } catch (c) {
              t.error(c);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              t.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete));
  }
  unsubscribe() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: n } = this;
      (super.unsubscribe(), !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this)));
    }
  }
};
var vc$1 = jt(
  (e) =>
    function () {
      (e(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed'));
    },
);
var J$1 = (() => {
    class e extends x$1 {
      constructor() {
        (super(),
          (this.closed = false),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = false),
          (this.hasError = false),
          (this.thrownError = null));
      }
      lift(n) {
        let r = new fr$1(this, this);
        return ((r.operator = n), r);
      }
      _throwIfClosed() {
        if (this.closed) throw new vc$1();
      }
      next(n) {
        Ht$1(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers || (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        Ht$1(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            ((this.hasError = this.isStopped = true), (this.thrownError = n));
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        Ht$1(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = true;
            let { observers: n } = this;
            for (; n.length; ) n.shift().complete();
          }
        });
      }
      unsubscribe() {
        ((this.isStopped = this.closed = true), (this.observers = this.currentObservers = null));
      }
      get observed() {
        var n;
        return ((n = this.observers) === null || n === void 0 ? void 0 : n.length) > 0;
      }
      _trySubscribe(n) {
        return (this._throwIfClosed(), super._trySubscribe(n));
      }
      _subscribe(n) {
        return (this._throwIfClosed(), this._checkFinalizedStatuses(n), this._innerSubscribe(n));
      }
      _innerSubscribe(n) {
        let { hasError: r, isStopped: o, observers: i } = this;
        return r || o
          ? pi$1
          : ((this.currentObservers = null),
            i.push(n),
            new Q(() => {
              ((this.currentObservers = null), En$1(i, n));
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new x$1();
        return ((n.source = this), n);
      }
    }
    return ((e.create = (t, n) => new fr$1(t, n)), e);
  })(),
  fr$1 = class fr extends J$1 {
    constructor(t, n) {
      (super(), (this.destination = t), (this.source = n));
    }
    next(t) {
      var n, r;
      (r = (n = this.destination) === null || n === void 0 ? void 0 : n.next) === null ||
        r === void 0 ||
        r.call(n, t);
    }
    error(t) {
      var n, r;
      (r = (n = this.destination) === null || n === void 0 ? void 0 : n.error) === null ||
        r === void 0 ||
        r.call(n, t);
    }
    complete() {
      var t, n;
      (n = (t = this.destination) === null || t === void 0 ? void 0 : t.complete) === null ||
        n === void 0 ||
        n.call(t);
    }
    _subscribe(t) {
      var n, r;
      return (r = (n = this.source) === null || n === void 0 ? void 0 : n.subscribe(t)) !== null &&
        r !== void 0
        ? r
        : pi$1;
    }
  };
var Dn = class extends J$1 {
  constructor(t) {
    (super(), (this._value = t));
  }
  get value() {
    return this.getValue();
  }
  _subscribe(t) {
    let n = super._subscribe(t);
    return (!n.closed && t.next(this._value), n);
  }
  getValue() {
    let { hasError: t, thrownError: n, _value: r } = this;
    if (t) throw n;
    return (this._throwIfClosed(), r);
  }
  next(t) {
    super.next((this._value = t));
  }
};
var Ii$1 = {
  now() {
    return (Ii$1.delegate || Date).now();
  },
  delegate: void 0,
};
var pr = class extends J$1 {
  constructor(t = 1 / 0, n = 1 / 0, r = Ii$1) {
    (super(),
      (this._bufferSize = t),
      (this._windowTime = n),
      (this._timestampProvider = r),
      (this._buffer = []),
      (this._infiniteTimeWindow = true),
      (this._infiniteTimeWindow = n === 1 / 0),
      (this._bufferSize = Math.max(1, t)),
      (this._windowTime = Math.max(1, n)));
  }
  next(t) {
    let {
      isStopped: n,
      _buffer: r,
      _infiniteTimeWindow: o,
      _timestampProvider: i,
      _windowTime: s,
    } = this;
    (n || (r.push(t), !o && r.push(i.now() + s)), this._trimBuffer(), super.next(t));
  }
  _subscribe(t) {
    (this._throwIfClosed(), this._trimBuffer());
    let n = this._innerSubscribe(t),
      { _infiniteTimeWindow: r, _buffer: o } = this,
      i = o.slice();
    for (let s = 0; s < i.length && !t.closed; s += r ? 1 : 2) t.next(i[s]);
    return (this._checkFinalizedStatuses(t), n);
  }
  _trimBuffer() {
    let { _bufferSize: t, _timestampProvider: n, _buffer: r, _infiniteTimeWindow: o } = this,
      i = (o ? 1 : 2) * t;
    if ((t < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o)) {
      let s = n.now(),
        a = 0;
      for (let c = 1; c < r.length && r[c] <= s; c += 2) a = c;
      a && r.splice(0, a + 1);
    }
  }
};
var ft$1 = new x$1((e) => e.complete());
function Ec$1(e) {
  return e && D(e.schedule);
}
function Di$1(e) {
  return e[e.length - 1];
}
function hr$1(e) {
  return D(Di$1(e)) ? e.pop() : void 0;
}
function ve$1(e) {
  return Ec$1(Di$1(e)) ? e.pop() : void 0;
}
function Ic$1(e, t) {
  return typeof Di$1(e) == 'number' ? e.pop() : t;
}
function GD(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (n[r[o]] = e[r[o]]);
  return n;
}
function Tc$1(e, t, n, r) {
  function o(i) {
    return i instanceof n
      ? i
      : new n(function (s) {
          s(i);
        });
  }
  return new (n || (n = Promise))(function (i, s) {
    function a(u) {
      try {
        l(r.next(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      u.done ? i(u.value) : o(u.value).then(a, c);
    }
    l((r = r.apply(e, t || [])).next());
  });
}
function Dc$1(e) {
  var t = typeof Symbol == 'function' && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == 'number')
    return {
      next: function () {
        return (e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e });
      },
    };
  throw new TypeError(t ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}
function pt(e) {
  return this instanceof pt ? ((this.v = e), this) : new pt(e);
}
function wc$1(e, t, n) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var r = n.apply(e, t || []),
    o,
    i = [];
  return (
    (o = Object.create((typeof AsyncIterator == 'function' ? AsyncIterator : Object).prototype)),
    a('next'),
    a('throw'),
    a('return', s),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(f) {
    return function (h) {
      return Promise.resolve(h).then(f, d);
    };
  }
  function a(f, h) {
    r[f] &&
      ((o[f] = function (m) {
        return new Promise(function (_, S) {
          i.push([f, m, _, S]) > 1 || c(f, m);
        });
      }),
      h && (o[f] = h(o[f])));
  }
  function c(f, h) {
    try {
      l(r[f](h));
    } catch (m) {
      p(i[0][3], m);
    }
  }
  function l(f) {
    f.value instanceof pt ? Promise.resolve(f.value.v).then(u, d) : p(i[0][2], f);
  }
  function u(f) {
    c('next', f);
  }
  function d(f) {
    c('throw', f);
  }
  function p(f, h) {
    (f(h), i.shift(), i.length && c(i[0][0], i[0][1]));
  }
}
function Cc$1(e) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof Dc$1 == 'function' ? Dc$1(e) : e[Symbol.iterator]()),
      (n = {}),
      r('next'),
      r('throw'),
      r('return'),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(i) {
    n[i] =
      e[i] &&
      function (s) {
        return new Promise(function (a, c) {
          ((s = e[i](s)), o(a, c, s.done, s.value));
        });
      };
  }
  function o(i, s, a, c) {
    Promise.resolve(c).then(function (l) {
      i({ value: l, done: a });
    }, s);
  }
}
var gr$1 = (e) => e && typeof e.length == 'number' && typeof e != 'function';
function mr$1(e) {
  return D(e?.then);
}
function yr$1(e) {
  return D(e[Bt]);
}
function vr$1(e) {
  return Symbol.asyncIterator && D(e?.[Symbol.asyncIterator]);
}
function Er$1(e) {
  return new TypeError(
    `You provided ${e !== null && typeof e == 'object' ? 'an invalid object' : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
  );
}
function Cp$1() {
  return typeof Symbol != 'function' || !Symbol.iterator ? '@@iterator' : Symbol.iterator;
}
var Ir$1 = Cp$1();
function Dr$1(e) {
  return D(e?.[Ir$1]);
}
function Tr$1(e) {
  return wc$1(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield pt(n.read());
        if (o) return yield pt(void 0);
        yield yield pt(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function wr$1(e) {
  return D(e?.getReader);
}
function O(e) {
  if (e instanceof x$1) return e;
  if (e != null) {
    if (yr$1(e)) return bp$1(e);
    if (gr$1(e)) return _p$1(e);
    if (mr$1(e)) return Mp$1(e);
    if (vr$1(e)) return bc$1(e);
    if (Dr$1(e)) return Np$1(e);
    if (wr$1(e)) return Sp$1(e);
  }
  throw Er$1(e);
}
function bp$1(e) {
  return new x$1((t) => {
    let n = e[Bt]();
    if (D(n.subscribe)) return n.subscribe(t);
    throw new TypeError('Provided object does not correctly implement Symbol.observable');
  });
}
function _p$1(e) {
  return new x$1((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Mp$1(e) {
  return new x$1((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n),
    ).then(null, ur$1);
  });
}
function Np$1(e) {
  return new x$1((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function bc$1(e) {
  return new x$1((t) => {
    xp$1(e, t).catch((n) => t.error(n));
  });
}
function Sp$1(e) {
  return bc$1(Tr$1(e));
}
function xp$1(e, t) {
  var n, r, o, i;
  return Tc$1(this, void 0, void 0, function* () {
    try {
      for (n = Cc$1(e); (r = yield n.next()), !r.done; ) {
        let s = r.value;
        if ((t.next(s), t.closed)) return;
      }
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        r && !r.done && (i = n.return) && (yield i.call(n));
      } finally {
        if (o) throw o.error;
      }
    }
    t.complete();
  });
}
function Z$1(e, t, n, r = 0, o = false) {
  let i = t.schedule(function () {
    (n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe());
  }, r);
  if ((e.add(i), !o)) return i;
}
function Cr$1(e, t = 0) {
  return w((n, r) => {
    n.subscribe(
      b$1(
        r,
        (o) => Z$1(r, e, () => r.next(o), t),
        () => Z$1(r, e, () => r.complete(), t),
        (o) => Z$1(r, e, () => r.error(o), t),
      ),
    );
  });
}
function br$1(e, t = 0) {
  return w((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function _c$1(e, t) {
  return O(e).pipe(br$1(t), Cr$1(t));
}
function Mc$1(e, t) {
  return O(e).pipe(br$1(t), Cr$1(t));
}
function Nc$1(e, t) {
  return new x$1((n) => {
    let r = 0;
    return t.schedule(function () {
      r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function Sc$1(e, t) {
  return new x$1((n) => {
    let r;
    return (
      Z$1(n, t, () => {
        ((r = e[Ir$1]()),
          Z$1(
            n,
            t,
            () => {
              let o, i;
              try {
                ({ value: o, done: i } = r.next());
              } catch (s) {
                n.error(s);
                return;
              }
              i ? n.complete() : n.next(o);
            },
            0,
            true,
          ));
      }),
      () => D(r?.return) && r.return()
    );
  });
}
function _r$1(e, t) {
  if (!e) throw new Error('Iterable cannot be null');
  return new x$1((n) => {
    Z$1(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      Z$1(
        n,
        t,
        () => {
          r.next().then((o) => {
            o.done ? n.complete() : n.next(o.value);
          });
        },
        0,
        true,
      );
    });
  });
}
function xc$1(e, t) {
  return _r$1(Tr$1(e), t);
}
function Ac$1(e, t) {
  if (e != null) {
    if (yr$1(e)) return _c$1(e, t);
    if (gr$1(e)) return Nc$1(e, t);
    if (mr$1(e)) return Mc$1(e, t);
    if (vr$1(e)) return _r$1(e, t);
    if (Dr$1(e)) return Sc$1(e, t);
    if (wr$1(e)) return xc$1(e, t);
  }
  throw Er$1(e);
}
function Ee$1(e, t) {
  return t ? Ac$1(e, t) : O(e);
}
function Ap$1(...e) {
  let t = ve$1(e);
  return Ee$1(e, t);
}
function kp$1(e, t) {
  let n = D(e) ? e : () => e,
    r = (o) => o.error(n());
  return new x$1(r);
}
function Rp$1(e) {
  return !!e && (e instanceof x$1 || (D(e.lift) && D(e.subscribe)));
}
var Tn = jt(
  (e) =>
    function () {
      (e(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence'));
    },
);
function Ge$1(e, t) {
  return w((n, r) => {
    let o = 0;
    n.subscribe(
      b$1(r, (i) => {
        r.next(e.call(t, i, o++));
      }),
    );
  });
}
var { isArray: Op$1 } = Array;
function Pp$1(e, t) {
  return Op$1(t) ? e(...t) : e(t);
}
function Mr(e) {
  return Ge$1((t) => Pp$1(e, t));
}
var { isArray: Lp$1 } = Array,
  { getPrototypeOf: Fp$1, prototype: jp$1, keys: Vp$1 } = Object;
function Nr(e) {
  if (e.length === 1) {
    let t = e[0];
    if (Lp$1(t)) return { args: t, keys: null };
    if (Hp$1(t)) {
      let n = Vp$1(t);
      return { args: n.map((r) => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function Hp$1(e) {
  return e && typeof e == 'object' && Fp$1(e) === jp$1;
}
function Sr$1(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function Bp$1(...e) {
  let t = ve$1(e),
    n = hr$1(e),
    { args: r, keys: o } = Nr(e);
  if (r.length === 0) return Ee$1([], t);
  let i = new x$1($p$1(r, t, o ? (s) => Sr$1(o, s) : K$1));
  return n ? i.pipe(Mr(n)) : i;
}
function $p$1(e, t, n = K$1) {
  return (r) => {
    kc$1(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let c = 0; c < o; c++)
          kc$1(
            t,
            () => {
              let l = Ee$1(e[c], t),
                u = false;
              l.subscribe(
                b$1(
                  r,
                  (d) => {
                    ((i[c] = d), u || ((u = true), a--), a || r.next(n(i.slice())));
                  },
                  () => {
                    --s || r.complete();
                  },
                ),
              );
            },
            r,
          );
      },
      r,
    );
  };
}
function kc$1(e, t, n) {
  e ? Z$1(n, e, t) : t();
}
function Rc$1(e, t, n, r, o, i, s, a) {
  let c = [],
    l = 0,
    u = 0,
    d = false,
    p = () => {
      d && !c.length && !l && t.complete();
    },
    f = (m) => (l < r ? h(m) : c.push(m)),
    h = (m) => {
      l++;
      let _ = false;
      O(n(m, u++)).subscribe(
        b$1(
          t,
          (S) => {
            t.next(S);
          },
          () => {
            _ = true;
          },
          void 0,
          () => {
            if (_)
              try {
                for (l--; c.length && l < r; ) {
                  let S = c.shift();
                  s ? Z$1(t, s, () => h(S)) : h(S);
                }
                p();
              } catch (S) {
                t.error(S);
              }
          },
        ),
      );
    };
  return (
    e.subscribe(
      b$1(t, f, () => {
        ((d = true), p());
      }),
    ),
    () => {}
  );
}
function ht$1(e, t, n = 1 / 0) {
  return D(t)
    ? ht$1((r, o) => Ge$1((i, s) => t(r, i, o, s))(O(e(r, o))), n)
    : (typeof t == 'number' && (n = t), w((r, o) => Rc$1(r, o, e, n)));
}
function xr$1(e = 1 / 0) {
  return ht$1(K$1, e);
}
function Oc$1() {
  return xr$1(1);
}
function Ar$1(...e) {
  return Oc$1()(Ee$1(e, ve$1(e)));
}
function Up$1(e) {
  return new x$1((t) => {
    O(e()).subscribe(t);
  });
}
function Wp$1(...e) {
  let t = hr$1(e),
    { args: n, keys: r } = Nr(e),
    o = new x$1((i) => {
      let { length: s } = n;
      if (!s) {
        i.complete();
        return;
      }
      let a = new Array(s),
        c = s,
        l = s;
      for (let u = 0; u < s; u++) {
        let d = false;
        O(n[u]).subscribe(
          b$1(
            i,
            (p) => {
              (d || ((d = true), l--), (a[u] = p));
            },
            () => c--,
            void 0,
            () => {
              (!c || !d) && (l || i.next(r ? Sr$1(r, a) : a), i.complete());
            },
          ),
        );
      }
    });
  return t ? o.pipe(Mr(t)) : o;
}
function qp$1(...e) {
  let t = ve$1(e),
    n = Ic$1(e, 1 / 0),
    r = e;
  return r.length ? (r.length === 1 ? O(r[0]) : xr$1(n)(Ee$1(r, t))) : ft$1;
}
function $t$1(e, t) {
  return w((n, r) => {
    let o = 0;
    n.subscribe(b$1(r, (i) => e.call(t, i, o++) && r.next(i)));
  });
}
function Pc$1(e) {
  return w((t, n) => {
    let r = null,
      o = !1,
      i;
    ((r = t.subscribe(
      b$1(n, void 0, void 0, (s) => {
        ((i = O(e(s, Pc$1(e)(t)))), r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0));
      }),
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n)));
  });
}
function Gp$1(e, t) {
  return D(t) ? ht$1(e, t, 1) : ht$1(e, 1);
}
function Lc$1(e) {
  return w((t, n) => {
    let r = !1;
    t.subscribe(
      b$1(
        n,
        (o) => {
          ((r = !0), n.next(o));
        },
        () => {
          (r || n.next(e), n.complete());
        },
      ),
    );
  });
}
function Ti$1(e) {
  return e <= 0
    ? () => ft$1
    : w((t, n) => {
        let r = 0;
        t.subscribe(
          b$1(n, (o) => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          }),
        );
      });
}
function zp$1(e, t = K$1) {
  return (
    (e = e ?? Qp$1),
    w((n, r) => {
      let o,
        i = !0;
      n.subscribe(
        b$1(r, (s) => {
          let a = t(s);
          (i || !e(o, a)) && ((i = !1), (o = a), r.next(s));
        }),
      );
    })
  );
}
function Qp$1(e, t) {
  return e === t;
}
function Fc$1(e = Zp$1) {
  return w((t, n) => {
    let r = !1;
    t.subscribe(
      b$1(
        n,
        (o) => {
          ((r = !0), n.next(o));
        },
        () => (r ? n.complete() : n.error(e())),
      ),
    );
  });
}
function Zp$1() {
  return new Tn();
}
function Yp$1(e) {
  return w((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function Kp$1(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(e ? $t$1((o, i) => e(o, i, r)) : K$1, Ti$1(1), n ? Lc$1(t) : Fc$1(() => new Tn()));
}
function Jp$1(e) {
  return e <= 0
    ? () => ft$1
    : w((t, n) => {
        let r = [];
        t.subscribe(
          b$1(
            n,
            (o) => {
              (r.push(o), e < r.length && r.shift());
            },
            () => {
              for (let o of r) n.next(o);
              n.complete();
            },
            void 0,
            () => {
              r = null;
            },
          ),
        );
      });
}
function Xp$1() {
  return w((e, t) => {
    let n,
      r = !1;
    e.subscribe(
      b$1(t, (o) => {
        let i = n;
        ((n = o), r && t.next([i, o]), (r = !0));
      }),
    );
  });
}
function Ci$1(e = {}) {
  let {
    connector: t = () => new J$1(),
    resetOnError: n = true,
    resetOnComplete: r = true,
    resetOnRefCountZero: o = true,
  } = e;
  return (i) => {
    let s,
      a,
      c,
      l = 0,
      u = false,
      d = false,
      p = () => {
        (a?.unsubscribe(), (a = void 0));
      },
      f = () => {
        (p(), (s = c = void 0), (u = d = false));
      },
      h = () => {
        let m = s;
        (f(), m?.unsubscribe());
      };
    return w((m, _) => {
      (l++, !d && !u && p());
      let S = (c = c ?? t());
      (_.add(() => {
        (l--, l === 0 && !d && !u && (a = wi$1(h, o)));
      }),
        S.subscribe(_),
        !s &&
          l > 0 &&
          ((s = new xe$1({
            next: (hn) => S.next(hn),
            error: (hn) => {
              ((d = !0), p(), (a = wi$1(f, n, hn)), S.error(hn));
            },
            complete: () => {
              ((u = !0), p(), (a = wi$1(f, r)), S.complete());
            },
          })),
          O(m).subscribe(s)));
    })(i);
  };
}
function wi$1(e, t, ...n) {
  if (t === true) {
    e();
    return;
  }
  if (t === false) return;
  let r = new xe$1({
    next: () => {
      (r.unsubscribe(), e());
    },
  });
  return O(t(...n)).subscribe(r);
}
function eh$1(e, t, n) {
  let r,
    o = false;
  return (
    e && typeof e == 'object'
      ? ({ bufferSize: r = 1 / 0, windowTime: t = 1 / 0, refCount: o = false, scheduler: n } = e)
      : (r = e ?? 1 / 0),
    Ci$1({
      connector: () => new pr(r, t, n),
      resetOnError: true,
      resetOnComplete: false,
      resetOnRefCountZero: o,
    })
  );
}
function th$1(e) {
  return $t$1((t, n) => e <= n);
}
function nh$1(...e) {
  let t = ve$1(e);
  return w((n, r) => {
    (t ? Ar$1(e, n, t) : Ar$1(e, n)).subscribe(r);
  });
}
function rh$1(e, t) {
  return w((n, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    n.subscribe(
      b$1(
        r,
        (c) => {
          o?.unsubscribe();
          let l = 0,
            u = i++;
          O(e(c, u)).subscribe(
            (o = b$1(
              r,
              (d) => r.next(t ? t(c, d, u, l++) : d),
              () => {
                ((o = null), a());
              },
            )),
          );
        },
        () => {
          ((s = !0), a());
        },
      ),
    );
  });
}
function oh$1(e) {
  return w((t, n) => {
    (O(e).subscribe(b$1(n, () => n.complete(), In)), !n.closed && t.subscribe(n));
  });
}
function ih$1(e, t, n) {
  let r = D(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? w((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          b$1(
            i,
            (c) => {
              var l;
              ((l = r.next) === null || l === void 0 || l.call(r, c), i.next(c));
            },
            () => {
              var c;
              ((a = !1), (c = r.complete) === null || c === void 0 || c.call(r), i.complete());
            },
            (c) => {
              var l;
              ((a = !1), (l = r.error) === null || l === void 0 || l.call(r, c), i.error(c));
            },
            () => {
              var c, l;
              (a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)),
                (l = r.finalize) === null || l === void 0 || l.call(r));
            },
          ),
        );
      })
    : K$1;
}
var jr = 'https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss',
  C = class extends Error {
    code;
    constructor(t, n) {
      (super(Vr(t, n)), (this.code = t));
    }
  };
function sh$1(e) {
  return `NG0${Math.abs(e)}`;
}
function Vr(e, t) {
  return `${sh$1(e)}${t ? ': ' + t : ''}`;
}
function A(e) {
  for (let t in e) if (e[t] === A) return t;
  throw Error('');
}
function $c$1(e, t) {
  for (let n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
}
function Nn$1(e) {
  if (typeof e == 'string') return e;
  if (Array.isArray(e)) return `[${e.map(Nn$1).join(', ')}]`;
  if (e == null) return '' + e;
  let t = e.overriddenName || e.name;
  if (t) return `${t}`;
  let n = e.toString();
  if (n == null) return '' + n;
  let r = n.indexOf(`
`);
  return r >= 0 ? n.slice(0, r) : n;
}
function Hr(e, t) {
  return e ? (t ? `${e} ${t}` : e) : t || '';
}
var ah$1 = A({ __forward_ref__: A });
function Br(e) {
  return ((e.__forward_ref__ = Br), e);
}
function $$1(e) {
  return Fi$1(e) ? e() : e;
}
function Fi$1(e) {
  return typeof e == 'function' && e.hasOwnProperty(ah$1) && e.__forward_ref__ === Br;
}
function ee(e) {
  return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 };
}
function Uc$1(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function Sn(e) {
  return lh$1(e, $r);
}
function ch$1(e) {
  return Sn(e) !== null;
}
function lh$1(e, t) {
  return (e.hasOwnProperty(t) && e[t]) || null;
}
function uh$1(e) {
  let t = e?.[$r] ?? null;
  return t || null;
}
function _i$1(e) {
  return e && e.hasOwnProperty(Rr$1) ? e[Rr$1] : null;
}
var $r = A({ ɵprov: A }),
  Rr$1 = A({ ɵinj: A }),
  N = class {
    _desc;
    ngMetadataName = 'InjectionToken';
    ɵprov;
    constructor(t, n) {
      ((this._desc = t),
        (this.ɵprov = void 0),
        typeof n == 'number'
          ? (this.__NG_ELEMENT_ID__ = n)
          : n !== void 0 &&
            (this.ɵprov = ee({
              token: this,
              providedIn: n.providedIn || 'root',
              factory: n.factory,
            })));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function ji$1(e) {
  return e && !!e.ɵproviders;
}
var Vi$1 = A({ ɵcmp: A }),
  Hi$1 = A({ ɵdir: A }),
  Bi$1 = A({ ɵpipe: A }),
  $i$1 = A({ ɵmod: A }),
  Cn = A({ ɵfac: A }),
  It$1 = A({ __NG_ELEMENT_ID__: A }),
  jc$1 = A({ __NG_ENV_ID__: A });
function Wc$1(e) {
  return (Ur(e), e[$i$1] || null);
}
function Oe$1(e) {
  return (Ur(e), e[Vi$1] || null);
}
function Ui$1(e) {
  return (Ur(e), e[Hi$1] || null);
}
function qc$1(e) {
  return (Ur(e), e[Bi$1] || null);
}
function Ur(e, t) {
  if (e == null) throw new C(-919, false);
}
function xn(e) {
  return typeof e == 'string' ? e : e == null ? '' : String(e);
}
var Gc$1 = A({ ngErrorCode: A }),
  dh$1 = A({ ngErrorMessage: A });
A({ ngTokenPath: A });
function Wi$1(e, t) {
  return zc$1('', -200);
}
function Wr$1(e, t) {
  throw new C(-201, false);
}
function zc$1(e, t, n) {
  let r = new C(t, e);
  return ((r[Gc$1] = t), (r[dh$1] = e), r);
}
function ph$1(e) {
  return e[Gc$1];
}
var Mi$1;
function Qc$1() {
  return Mi$1;
}
function X$1(e) {
  let t = Mi$1;
  return ((Mi$1 = e), t);
}
function qi$1(e, t, n) {
  let r = Sn(e);
  if (r && r.providedIn == 'root') return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & 8) return null;
  if (t !== void 0) return t;
  Wr$1();
}
var qt$1 = globalThis;
var hh$1 = {},
  gt = hh$1,
  gh$1 = '__NG_DI_FLAG__',
  Ni$1 = class Ni {
    injector;
    constructor(t) {
      this.injector = t;
    }
    retrieve(t, n) {
      let r = mt(n) || 0;
      try {
        return this.injector.get(t, r & 8 ? null : gt, r);
      } catch (o) {
        if (Ft(o)) return o;
        throw o;
      }
    }
  };
function mh$1(e, t = 0) {
  let n = ar$1();
  if (n === void 0) throw new C(-203, false);
  if (n === null) return qi$1(e, void 0, t);
  {
    let r = yh$1(t),
      o = n.retrieve(e, r);
    if (Ft(o)) {
      if (r.optional) return null;
      throw o;
    }
    return o;
  }
}
function Ie(e, t = 0) {
  return (Qc$1() || mh$1)($$1(e), t);
}
function E$1(e, t) {
  return Ie(e, mt(t));
}
function mt(e) {
  return typeof e > 'u' || typeof e == 'number'
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function yh$1(e) {
  return { optional: !!(e & 8), host: !!(e & 1), self: !!(e & 2), skipSelf: !!(e & 4) };
}
function Si$1(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = $$1(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new C(900, false);
      let o,
        i = 0;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          c = vh$1(a);
        typeof c == 'number' ? (c === -1 ? (o = a.token) : (i |= c)) : (o = a);
      }
      t.push(Ie(o, i));
    } else t.push(Ie(r));
  }
  return t;
}
function vh$1(e) {
  return e[gh$1];
}
function yt$1(e, t) {
  let n = e.hasOwnProperty(Cn);
  return n ? e[Cn] : null;
}
function Zc$1(e, t, n) {
  if (e.length !== t.length) return false;
  for (let r = 0; r < e.length; r++) {
    let o = e[r],
      i = t[r];
    if ((n && ((o = n(o)), (i = n(i))), i !== o)) return false;
  }
  return true;
}
function Yc$1(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function qr(e, t) {
  e.forEach((n) => (Array.isArray(n) ? qr(n, t) : t(n)));
}
function Gi$1(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function An(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function Kc$1(e, t) {
  let n = [];
  for (let r = 0; r < e; r++) n.push(t);
  return n;
}
function Jc$1(e, t, n, r) {
  let o = e.length;
  if (o == t) e.push(n, r);
  else if (o === 1) (e.push(r, e[0]), (e[0] = n));
  else {
    for (o--, e.push(e[o - 1], e[o]); o > t; ) {
      let i = o - 2;
      ((e[o] = e[i]), o--);
    }
    ((e[t] = n), (e[t + 1] = r));
  }
}
function Gr(e, t, n) {
  let r = Gt$1(e, t);
  return (r >= 0 ? (e[r | 1] = n) : ((r = ~r), Jc$1(e, r, t, n)), r);
}
function zr(e, t) {
  let n = Gt$1(e, t);
  if (n >= 0) return e[n | 1];
}
function Gt$1(e, t) {
  return Eh$1(e, t, 1);
}
function Eh$1(e, t, n) {
  let r = 0,
    o = e.length >> n;
  for (; o !== r; ) {
    let i = r + ((o - r) >> 1),
      s = e[i << n];
    if (t === s) return i << n;
    s > t ? (o = i) : (r = i + 1);
  }
  return ~(o << n);
}
var Ze$1 = {},
  G$1 = [],
  zt$1 = new N(''),
  kn = new N('', -1),
  zi$1 = new N(''),
  Wt$1 = class Wt {
    get(t, n = gt) {
      if (n === gt) {
        let o = zc$1('', -201);
        throw ((o.name = '\u0275NotFound'), o);
      }
      return n;
    }
  };
function Qr$1(e) {
  return { ɵproviders: e };
}
function Xc$1(e) {
  return Qr$1([{ provide: zt$1, multi: true, useValue: e }]);
}
function el$1(...e) {
  return { ɵproviders: Qi$1(true, e), ɵfromNgModule: true };
}
function Qi$1(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = (s) => {
      n.push(s);
    };
  return (
    qr(t, (s) => {
      let a = s;
      Or$1(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && tl$1(o, i),
    n
  );
}
function tl$1(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    Zi$1(o, (i) => {
      t(i, r);
    });
  }
}
function Or$1(e, t, n, r) {
  if (((e = $$1(e)), !e)) return false;
  let o = null,
    i = _i$1(e),
    s = !i && Oe$1(e);
  if (!i && !s) {
    let c = e.ngModule;
    if (((i = _i$1(c)), i)) o = c;
    else return false;
  } else {
    if (s && !s.standalone) return false;
    o = e;
  }
  let a = r.has(o);
  if (s) {
    if (a) return false;
    if ((r.add(o), s.dependencies)) {
      let c = typeof s.dependencies == 'function' ? s.dependencies() : s.dependencies;
      for (let l of c) Or$1(l, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let l;
      (qr(i.imports, (u) => {
        Or$1(u, t, n, r) && ((l ||= []), l.push(u));
      }),
        l !== void 0 && tl$1(l, t));
    }
    if (!a) {
      let l = yt$1(o) || (() => new o());
      (t({ provide: o, useFactory: l, deps: G$1 }, o),
        t({ provide: zi$1, useValue: o, multi: true }, o),
        t({ provide: zt$1, useValue: () => Ie(o), multi: true }, o));
    }
    let c = i.providers;
    if (c != null && !a) {
      let l = e;
      Zi$1(c, (u) => {
        t(u, l);
      });
    }
  } else return false;
  return o !== e && e.providers !== void 0;
}
function Zi$1(e, t) {
  for (let n of e) (ji$1(n) && (n = n.ɵproviders), Array.isArray(n) ? Zi$1(n, t) : t(n));
}
var Ih$1 = A({ provide: String, useValue: A });
function nl$1(e) {
  return e !== null && typeof e == 'object' && Ih$1 in e;
}
function Dh$1(e) {
  return !!(e && e.useExisting);
}
function Th$1(e) {
  return !!(e && e.useFactory);
}
function vt$1(e) {
  return typeof e == 'function';
}
function rl$1(e) {
  return !!e.useClass;
}
var Yi$1 = new N(''),
  kr$1 = {},
  Vc$1 = {},
  bi$1;
function Qt$1() {
  return (bi$1 === void 0 && (bi$1 = new Wt$1()), bi$1);
}
var oe$1 = class oe {},
  Et$1 = class Et extends oe$1 {
    parent;
    source;
    scopes;
    records = new Map();
    _ngOnDestroyHooks = new Set();
    _onDestroyHooks = [];
    get destroyed() {
      return this._destroyed;
    }
    _destroyed = false;
    injectorDefTypes;
    constructor(t, n, r, o) {
      (super(),
        (this.parent = n),
        (this.source = r),
        (this.scopes = o),
        Ai$1(t, (s) => this.processProvider(s)),
        this.records.set(kn, Ut(void 0, this)),
        o.has('environment') && this.records.set(oe$1, Ut(void 0, this)));
      let i = this.records.get(Yi$1);
      (i != null && typeof i.value == 'string' && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(zi$1, G$1, { self: true }))));
    }
    retrieve(t, n) {
      let r = mt(n) || 0;
      try {
        return this.get(t, gt, r);
      } catch (o) {
        if (Ft(o)) return o;
        throw o;
      }
    }
    destroy() {
      (wn$1(this), (this._destroyed = true));
      let t = y$1(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of n) r();
      } finally {
        (this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          y$1(t));
      }
    }
    onDestroy(t) {
      return (wn$1(this), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t));
    }
    runInContext(t) {
      wn$1(this);
      let n = ye$1(this),
        r = X$1(void 0);
      try {
        return t();
      } finally {
        (ye$1(n), X$1(r));
      }
    }
    get(t, n = gt, r) {
      if ((wn$1(this), t.hasOwnProperty(jc$1))) return t[jc$1](this);
      let o = mt(r),
        s = ye$1(this),
        a = X$1(void 0);
      try {
        if (!(o & 4)) {
          let l = this.records.get(t);
          if (l === void 0) {
            let u = Mh$1(t) && Sn(t);
            (u && this.injectableDefInScope(u) ? (l = Ut(xi$1(t), kr$1)) : (l = null),
              this.records.set(t, l));
          }
          if (l != null) return this.hydrate(t, l, o);
        }
        let c = o & 2 ? Qt$1() : this.parent;
        return ((n = o & 8 && n === gt ? null : n), c.get(t, n));
      } catch (c) {
        let l = ph$1(c);
        throw l === -200 || l === -201 ? new C(l, null) : c;
      } finally {
        (X$1(a), ye$1(s));
      }
    }
    resolveInjectorInitializers() {
      let t = y$1(null),
        n = ye$1(this),
        r = X$1(void 0);
      try {
        let i = this.get(zt$1, G$1, { self: !0 });
        for (let s of i) s();
      } finally {
        (ye$1(n), X$1(r), y$1(t));
      }
    }
    toString() {
      return 'R3Injector[...]';
    }
    processProvider(t) {
      t = $$1(t);
      let n = vt$1(t) ? t : $$1(t && t.provide),
        r = Ch$1(t);
      if (!vt$1(t) && t.multi === true) {
        let o = this.records.get(n);
        (o ||
          ((o = Ut(void 0, kr$1, true)), (o.factory = () => Si$1(o.multi)), this.records.set(n, o)),
          (n = t),
          o.multi.push(t));
      }
      this.records.set(n, r);
    }
    hydrate(t, n, r) {
      let o = y$1(null);
      try {
        if (n.value === Vc$1) throw Wi$1('');
        return (
          n.value === kr$1 && ((n.value = Vc$1), (n.value = n.factory(void 0, r))),
          typeof n.value == 'object' &&
            n.value &&
            _h$1(n.value) &&
            this._ngOnDestroyHooks.add(n.value),
          n.value
        );
      } finally {
        y$1(o);
      }
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return false;
      let n = $$1(t.providedIn);
      return typeof n == 'string'
        ? n === 'any' || this.scopes.has(n)
        : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(t) {
      let n = this._onDestroyHooks.indexOf(t);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function xi$1(e) {
  let t = Sn(e),
    n = t !== null ? t.factory : yt$1(e);
  if (n !== null) return n;
  if (e instanceof N) throw new C(-204, false);
  if (e instanceof Function) return wh$1(e);
  throw new C(-204, false);
}
function wh$1(e) {
  if (e.length > 0) throw new C(-204, false);
  let n = uh$1(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function Ch$1(e) {
  if (nl$1(e)) return Ut(void 0, e.useValue);
  {
    let t = Ki$1(e);
    return Ut(t, kr$1);
  }
}
function Ki$1(e, t, n) {
  let r;
  if (vt$1(e)) {
    let o = $$1(e);
    return yt$1(o) || xi$1(o);
  } else if (nl$1(e)) r = () => $$1(e.useValue);
  else if (Th$1(e)) r = () => e.useFactory(...Si$1(e.deps || []));
  else if (Dh$1(e)) r = (o, i) => Ie($$1(e.useExisting), i !== void 0 && i & 8 ? 8 : void 0);
  else {
    let o = $$1(e && (e.useClass || e.provide));
    if (bh$1(e)) r = () => new o(...Si$1(e.deps));
    else return yt$1(o) || xi$1(o);
  }
  return r;
}
function wn$1(e) {
  if (e.destroyed) throw new C(-205, false);
}
function Ut(e, t, n = false) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function bh$1(e) {
  return !!e.deps;
}
function _h$1(e) {
  return e !== null && typeof e == 'object' && typeof e.ngOnDestroy == 'function';
}
function Mh$1(e) {
  return typeof e == 'function' || (typeof e == 'object' && e.ngMetadataName === 'InjectionToken');
}
function Ai$1(e, t) {
  for (let n of e) Array.isArray(n) ? Ai$1(n, t) : n && ji$1(n) ? Ai$1(n.ɵproviders, t) : t(n);
}
function Zr$1(e, t) {
  let n;
  e instanceof Et$1 ? (wn$1(e), (n = e)) : (n = new Ni$1(e));
  let o = ye$1(n),
    i = X$1(void 0);
  try {
    return t();
  } finally {
    (ye$1(o), X$1(i));
  }
}
function ol$1() {
  return Qc$1() !== void 0 || ar$1() != null;
}
var fe$2 = 0,
  g = 1,
  v$1 = 2,
  H$1 = 3,
  ie = 4,
  z$1 = 5,
  Zt$1 = 6,
  Yt$1 = 7,
  U = 8,
  Pe$1 = 9,
  pe$1 = 10,
  R$2 = 11,
  Kt$1 = 12,
  Ji$1 = 13,
  Dt$1 = 14,
  Y = 15,
  Ye$1 = 16,
  Tt$1 = 17,
  we = 18,
  Le$1 = 19,
  Xi$1 = 20,
  ke$1 = 21,
  Yr$1 = 22,
  ze$1 = 23,
  te = 24,
  wt$1 = 25,
  Ke$1 = 26,
  F = 27,
  il$1 = 1;
var Je$1 = 7,
  Rn = 8,
  Ct$1 = 9,
  W = 10;
function Fe$1(e) {
  return Array.isArray(e) && typeof e[il$1] == 'object';
}
function se(e) {
  return Array.isArray(e) && e[il$1] === true;
}
function es$1(e) {
  return (e.flags & 4) !== 0;
}
function je(e) {
  return e.componentOffset > -1;
}
function On(e) {
  return (e.flags & 1) === 1;
}
function Ce$2(e) {
  return !!e.template;
}
function Jt$1(e) {
  return (e[v$1] & 512) !== 0;
}
function bt$1(e) {
  return (e[v$1] & 256) === 256;
}
var sl$1 = 'svg',
  al$1 = 'math';
function ae(e) {
  for (; Array.isArray(e); ) e = e[fe$2];
  return e;
}
function ts$1(e, t) {
  return ae(t[e]);
}
function ce(e, t) {
  return ae(t[e.index]);
}
function Kr$1(e, t) {
  return e.data[t];
}
function cl$1(e, t) {
  return e[t];
}
function le(e, t) {
  let n = t[e];
  return Fe$1(n) ? n : n[fe$2];
}
function ll$1(e) {
  return (e[v$1] & 4) === 4;
}
function Jr$1(e) {
  return (e[v$1] & 128) === 128;
}
function ul$1(e) {
  return se(e[H$1]);
}
function be$1(e, t) {
  return t == null ? null : e[t];
}
function ns$1(e) {
  e[Tt$1] = 0;
}
function rs$1(e) {
  e[v$1] & 1024 || ((e[v$1] |= 1024), Jr$1(e) && _t$1(e));
}
function dl$1(e, t) {
  for (; e > 0; ) ((t = t[Dt$1]), e--);
  return t;
}
function Pn$1(e) {
  return !!(e[v$1] & 9216 || e[te]?.dirty);
}
function Xr$1(e) {
  (e[pe$1].changeDetectionScheduler?.notify(8),
    e[v$1] & 64 && (e[v$1] |= 1024),
    Pn$1(e) && _t$1(e));
}
function _t$1(e) {
  e[pe$1].changeDetectionScheduler?.notify(0);
  let t = Re$1(e);
  for (; t !== null && !(t[v$1] & 8192 || ((t[v$1] |= 8192), !Jr$1(t))); ) t = Re$1(t);
}
function eo$1(e, t) {
  if (bt$1(e)) throw new C(911, false);
  (e[ke$1] === null && (e[ke$1] = []), e[ke$1].push(t));
}
function fl$1(e, t) {
  if (e[ke$1] === null) return;
  let n = e[ke$1].indexOf(t);
  n !== -1 && e[ke$1].splice(n, 1);
}
function Re$1(e) {
  let t = e[H$1];
  return se(t) ? t[H$1] : t;
}
function os$1(e) {
  return (e[Yt$1] ??= []);
}
function is$1(e) {
  return (e.cleanup ??= []);
}
function pl$1(e, t, n, r) {
  let o = os$1(t);
  (o.push(n), e.firstCreatePass && is$1(e).push(r, o.length - 1));
}
var T$1 = { lFrame: Ml$1(null), bindingsEnabled: true, skipHydrationRootTNode: null };
var ki$1 = false;
function hl$1() {
  return T$1.lFrame.elementDepthCount;
}
function gl$1() {
  T$1.lFrame.elementDepthCount++;
}
function ss$1() {
  T$1.lFrame.elementDepthCount--;
}
function as$1() {
  return T$1.bindingsEnabled;
}
function cs$1() {
  return T$1.skipHydrationRootTNode !== null;
}
function ls$1(e) {
  return T$1.skipHydrationRootTNode === e;
}
function us$1() {
  T$1.skipHydrationRootTNode = null;
}
function I() {
  return T$1.lFrame.lView;
}
function P$1() {
  return T$1.lFrame.tView;
}
function ml$1(e) {
  return ((T$1.lFrame.contextLView = e), e[U]);
}
function yl$1(e) {
  return ((T$1.lFrame.contextLView = null), e);
}
function B() {
  let e = ds();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function ds() {
  return T$1.lFrame.currentTNode;
}
function vl$1() {
  let e = T$1.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function Xt$1(e, t) {
  let n = T$1.lFrame;
  ((n.currentTNode = e), (n.isParent = t));
}
function fs() {
  return T$1.lFrame.isParent;
}
function ps() {
  T$1.lFrame.isParent = false;
}
function El$1() {
  return T$1.lFrame.contextLView;
}
function hs() {
  return ki$1;
}
function bn$1(e) {
  let t = ki$1;
  return ((ki$1 = e), t);
}
function Il$1() {
  let e = T$1.lFrame,
    t = e.bindingRootIndex;
  return (t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t);
}
function Dl$1(e) {
  return (T$1.lFrame.bindingIndex = e);
}
function Xe$1() {
  return T$1.lFrame.bindingIndex++;
}
function gs(e) {
  let t = T$1.lFrame,
    n = t.bindingIndex;
  return ((t.bindingIndex = t.bindingIndex + e), n);
}
function Tl$1() {
  return T$1.lFrame.inI18n;
}
function wl$1(e, t) {
  let n = T$1.lFrame;
  ((n.bindingIndex = n.bindingRootIndex = e), to$1(t));
}
function Cl$1() {
  return T$1.lFrame.currentDirectiveIndex;
}
function to$1(e) {
  T$1.lFrame.currentDirectiveIndex = e;
}
function bl$1(e) {
  let t = T$1.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function no$1() {
  return T$1.lFrame.currentQueryIndex;
}
function Ln$1(e) {
  T$1.lFrame.currentQueryIndex = e;
}
function Nh$1(e) {
  let t = e[g];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[z$1] : null;
}
function ms(e, t, n) {
  if (n & 4) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & 1); )
      if (((o = Nh$1(i)), o === null || ((i = i[Dt$1]), o.type & 10))) break;
    if (o === null) return false;
    ((t = o), (e = i));
  }
  let r = (T$1.lFrame = _l$1());
  return ((r.currentTNode = t), (r.lView = e), true);
}
function ro$1(e) {
  let t = _l$1(),
    n = e[g];
  ((T$1.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = false));
}
function _l$1() {
  let e = T$1.lFrame,
    t = e === null ? null : e.child;
  return t === null ? Ml$1(e) : t;
}
function Ml$1(e) {
  let t = {
    currentTNode: null,
    isParent: true,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: false,
  };
  return (e !== null && (e.child = t), t);
}
function Nl$1() {
  let e = T$1.lFrame;
  return ((T$1.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e);
}
var ys = Nl$1;
function oo$1() {
  let e = Nl$1();
  ((e.isParent = true),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0));
}
function Sl$1(e) {
  return (T$1.lFrame.contextLView = dl$1(e, T$1.lFrame.contextLView))[U];
}
function et() {
  return T$1.lFrame.selectedIndex;
}
function tt(e) {
  T$1.lFrame.selectedIndex = e;
}
function en$1() {
  let e = T$1.lFrame;
  return Kr$1(e.tView, e.selectedIndex);
}
function vs() {
  return T$1.lFrame.currentNamespace;
}
var xl$1 = true;
function io$1() {
  return xl$1;
}
function so$1(e) {
  xl$1 = e;
}
function Ri$1(e, t = null, n = null, r) {
  let o = Es(e, t, n);
  return (o.resolveInjectorInitializers(), o);
}
function Es(e, t = null, n = null, r, o = new Set()) {
  let i = [n || G$1, el$1(e)];
  return new Et$1(i, t || Qt$1(), null, o);
}
var de$2 = class e {
    static THROW_IF_NOT_FOUND = gt;
    static NULL = new Wt$1();
    static create(t, n) {
      if (Array.isArray(t)) return Ri$1({ name: '' }, n, t);
      {
        let r = t.name ?? '';
        return Ri$1({ name: r }, t.parent, t.providers);
      }
    }
    static ɵprov = ee({ token: e, providedIn: 'any', factory: () => Ie(kn) });
    static __NG_ELEMENT_ID__ = -1;
  },
  tn$1 = new N(''),
  Ve$1 = (() => {
    class e {
      static __NG_ELEMENT_ID__ = Sh$1;
      static __NG_ENV_ID__ = (n) => n;
    }
    return e;
  })(),
  Pr$1 = class Pr extends Ve$1 {
    _lView;
    constructor(t) {
      (super(), (this._lView = t));
    }
    get destroyed() {
      return bt$1(this._lView);
    }
    onDestroy(t) {
      let n = this._lView;
      return (eo$1(n, t), () => fl$1(n, t));
    }
  };
function Sh$1() {
  return new Pr$1(I());
}
var Al$1 = false,
  kl$1 = new N(''),
  Mt = (() => {
    class e {
      taskId = 0;
      pendingTasks = new Set();
      destroyed = false;
      pendingTask = new Dn(false);
      debugTaskTracker = E$1(kl$1, { optional: true });
      get hasPendingTasks() {
        return this.destroyed ? false : this.pendingTask.value;
      }
      get hasPendingTasksObservable() {
        return this.destroyed
          ? new x$1((n) => {
              (n.next(false), n.complete());
            })
          : this.pendingTask;
      }
      add() {
        !this.hasPendingTasks && !this.destroyed && this.pendingTask.next(true);
        let n = this.taskId++;
        return (this.pendingTasks.add(n), this.debugTaskTracker?.add(n), n);
      }
      has(n) {
        return this.pendingTasks.has(n);
      }
      remove(n) {
        (this.pendingTasks.delete(n),
          this.debugTaskTracker?.remove(n),
          this.pendingTasks.size === 0 && this.hasPendingTasks && this.pendingTask.next(false));
      }
      ngOnDestroy() {
        (this.pendingTasks.clear(),
          this.hasPendingTasks && this.pendingTask.next(false),
          (this.destroyed = true),
          this.pendingTask.unsubscribe());
      }
      static ɵprov = ee({ token: e, providedIn: 'root', factory: () => new e() });
    }
    return e;
  })(),
  Oi$1 = class Oi extends J$1 {
    __isAsync;
    destroyRef = void 0;
    pendingTasks = void 0;
    constructor(t = false) {
      (super(),
        (this.__isAsync = t),
        ol$1() &&
          ((this.destroyRef = E$1(Ve$1, { optional: true }) ?? void 0),
          (this.pendingTasks = E$1(Mt, { optional: true }) ?? void 0)));
    }
    emit(t) {
      let n = y$1(null);
      try {
        super.next(t);
      } finally {
        y$1(n);
      }
    }
    subscribe(t, n, r) {
      let o = t,
        i = n || (() => null),
        s = r;
      if (t && typeof t == 'object') {
        let c = t;
        ((o = c.next?.bind(c)), (i = c.error?.bind(c)), (s = c.complete?.bind(c)));
      }
      this.__isAsync &&
        ((i = this.wrapInTimeout(i)),
        o && (o = this.wrapInTimeout(o)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: o, error: i, complete: s });
      return (t instanceof Q && t.add(a), a);
    }
    wrapInTimeout(t) {
      return (n) => {
        let r = this.pendingTasks?.add();
        setTimeout(() => {
          try {
            t(n);
          } finally {
            r !== void 0 && this.pendingTasks?.remove(r);
          }
        });
      };
    }
  },
  Ae$1 = Oi$1;
function Lr(...e) {}
function Is$1(e) {
  let t, n;
  function r() {
    e = Lr;
    try {
      (n !== void 0 && typeof cancelAnimationFrame == 'function' && cancelAnimationFrame(n),
        t !== void 0 && clearTimeout(t));
    } catch {}
  }
  return (
    (t = setTimeout(() => {
      (e(), r());
    })),
    typeof requestAnimationFrame == 'function' &&
      (n = requestAnimationFrame(() => {
        (e(), r());
      })),
    () => r()
  );
}
function Rl$1(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = Lr;
    }
  );
}
var Ds = 'isAngularZone',
  _n$1 = Ds + '_ID',
  xh$1 = 0,
  De$2 = class e {
    hasPendingMacrotasks = false;
    hasPendingMicrotasks = false;
    isStable = true;
    onUnstable = new Ae$1(false);
    onMicrotaskEmpty = new Ae$1(false);
    onStable = new Ae$1(false);
    onError = new Ae$1(false);
    constructor(t) {
      let {
        enableLongStackTrace: n = false,
        shouldCoalesceEventChangeDetection: r = false,
        shouldCoalesceRunChangeDetection: o = false,
        scheduleInRootZone: i = Al$1,
      } = t;
      if (typeof Zone > 'u') throw new C(908, false);
      Zone.assertZonePatched();
      let s = this;
      ((s._nesting = 0),
        (s._outer = s._inner = Zone.current),
        Zone.TaskTrackingZoneSpec && (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
        n && Zone.longStackTraceZoneSpec && (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
        (s.shouldCoalesceEventChangeDetection = !o && r),
        (s.shouldCoalesceRunChangeDetection = o),
        (s.callbackScheduled = false),
        (s.scheduleInRootZone = i),
        Rh$1(s));
    }
    static isInAngularZone() {
      return typeof Zone < 'u' && Zone.current.get(Ds) === true;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new C(909, false);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new C(909, false);
    }
    run(t, n, r) {
      return this._inner.run(t, n, r);
    }
    runTask(t, n, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask('NgZoneEvent: ' + o, t, Ah$1, Lr, Lr);
      try {
        return i.runTask(s, n, r);
      } finally {
        i.cancelTask(s);
      }
    }
    runGuarded(t, n, r) {
      return this._inner.runGuarded(t, n, r);
    }
    runOutsideAngular(t) {
      return this._outer.run(t);
    }
  },
  Ah$1 = {};
function Ts(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      (e._nesting++, e.onMicrotaskEmpty.emit(null));
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = true;
        }
    }
}
function kh$1(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = true;
  function t() {
    Is$1(() => {
      ((e.callbackScheduled = false),
        Pi$1(e),
        (e.isCheckStableRunning = true),
        Ts(e),
        (e.isCheckStableRunning = false));
    });
  }
  (e.scheduleInRootZone
    ? Zone.root.run(() => {
        t();
      })
    : e._outer.run(() => {
        t();
      }),
    Pi$1(e));
}
function Rh$1(e) {
  let t = () => {
      kh$1(e);
    },
    n = xh$1++;
  e._inner = e._inner.fork({
    name: 'angular',
    properties: { [Ds]: true, [_n$1]: n, [_n$1 + n]: true },
    onInvokeTask: (r, o, i, s, a, c) => {
      if (Oh$1(c)) return r.invokeTask(i, s, a, c);
      try {
        return (Hc$1(e), r.invokeTask(i, s, a, c));
      } finally {
        (((e.shouldCoalesceEventChangeDetection && s.type === 'eventTask') ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          Bc$1(e));
      }
    },
    onInvoke: (r, o, i, s, a, c, l) => {
      try {
        return (Hc$1(e), r.invoke(i, s, a, c, l));
      } finally {
        (e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !Ph$1(c) && t(), Bc$1(e));
      }
    },
    onHasTask: (r, o, i, s) => {
      (r.hasTask(i, s),
        o === i &&
          (s.change == 'microTask'
            ? ((e._hasPendingMicrotasks = s.microTask), Pi$1(e), Ts(e))
            : s.change == 'macroTask' && (e.hasPendingMacrotasks = s.macroTask)));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s),
      e.runOutsideAngular(() => e.onError.emit(s)),
      false
    ),
  });
}
function Pi$1(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === true)
    ? (e.hasPendingMicrotasks = true)
    : (e.hasPendingMicrotasks = false);
}
function Hc$1(e) {
  (e._nesting++, e.isStable && ((e.isStable = false), e.onUnstable.emit(null)));
}
function Bc$1(e) {
  (e._nesting--, Ts(e));
}
var Mn$1 = class Mn {
  hasPendingMicrotasks = false;
  hasPendingMacrotasks = false;
  isStable = true;
  onUnstable = new Ae$1();
  onMicrotaskEmpty = new Ae$1();
  onStable = new Ae$1();
  onError = new Ae$1();
  run(t, n, r) {
    return t.apply(n, r);
  }
  runGuarded(t, n, r) {
    return t.apply(n, r);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, n, r, o) {
    return t.apply(n, r);
  }
};
function Oh$1(e) {
  return Ol$1(e, '__ignore_ng_zone__');
}
function Ph$1(e) {
  return Ol$1(e, '__scheduler_tick__');
}
function Ol$1(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? false : e[0]?.data?.[t] === true;
}
var Qe = class {
    _console = console;
    handleError(t) {
      this._console.error('ERROR', t);
    }
  },
  nt = new N('', {
    factory: () => {
      let e = E$1(De$2),
        t = E$1(oe$1),
        n;
      return (r) => {
        e.runOutsideAngular(() => {
          t.destroyed && !n
            ? setTimeout(() => {
                throw r;
              })
            : ((n ??= t.get(Qe)), n.handleError(r));
        });
      };
    },
  }),
  Pl$1 = {
    provide: zt$1,
    useValue: () => {
      E$1(Qe, { optional: true });
    },
    multi: true,
  },
  Lh$1 = new N('', {
    factory: () => {
      let e = E$1(tn$1).defaultView;
      if (!e) return;
      let t = E$1(nt),
        n = (i) => {
          (t(i.reason), i.preventDefault());
        },
        r = (i) => {
          (i.error ? t(i.error) : t(new Error(i.message, { cause: i })), i.preventDefault());
        },
        o = () => {
          (e.addEventListener('unhandledrejection', n), e.addEventListener('error', r));
        };
      (typeof Zone < 'u' ? Zone.root.run(o) : o(),
        E$1(Ve$1).onDestroy(() => {
          (e.removeEventListener('error', r), e.removeEventListener('unhandledrejection', n));
        }));
    },
  });
function Fh$1() {
  return Qr$1([
    Xc$1(() => {
      E$1(Lh$1);
    }),
  ]);
}
function _e(e, t) {
  let [n, r, o] = ci$1(e, t?.equal),
    i = n;
  i[L];
  return ((i.set = r), (i.update = o), (i.asReadonly = Fn$1.bind(i)), i);
}
function Fn$1() {
  let e = this[L];
  if (e.readonlyFn === void 0) {
    let t = () => this();
    ((t[L] = e), (e.readonlyFn = t));
  }
  return e.readonlyFn;
}
var ws = new N('', { factory: () => jh$1 }),
  jh$1 = 'ng';
var Ll$1 = new N(''),
  Vh$1 = new N('', { providedIn: 'platform', factory: () => 'unknown' }),
  Hh$1 = new N(''),
  Bh$1 = new N('', {
    factory: () =>
      E$1(tn$1).body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') || null,
  });
var ao$1 = (() => {
  class e {
    static ɵprov = ee({
      token: e,
      providedIn: 'root',
      factory: () => {
        let n = new e();
        return ((n.store = Fl$1(E$1(tn$1), E$1(ws))), n);
      },
    });
    store = {};
    onSerializeCallbacks = {};
    get(n, r) {
      return this.store[n] !== void 0 ? this.store[n] : r;
    }
    set(n, r) {
      this.store[n] = r;
    }
    remove(n) {
      delete this.store[n];
    }
    hasKey(n) {
      return this.store.hasOwnProperty(n);
    }
    get isEmpty() {
      return Object.keys(this.store).length === 0;
    }
    onSerialize(n, r) {
      this.onSerializeCallbacks[n] = r;
    }
    toJson() {
      for (let n in this.onSerializeCallbacks)
        if (this.onSerializeCallbacks.hasOwnProperty(n))
          try {
            this.store[n] = this.onSerializeCallbacks[n]();
          } catch (r) {
            console.warn('Exception in onSerialize callback: ', r);
          }
      return JSON.stringify(this.store).replace(/</g, '\\u003C').replace(/\//g, '\\u002F');
    }
  }
  return e;
})();
function Fl$1(e, t) {
  let n = e.getElementById(t + '-state');
  if (n?.textContent)
    try {
      return JSON.parse(n.textContent);
    } catch (r) {
      console.warn('Exception while restoring TransferState for app ' + t, r);
    }
  return {};
}
var jn$1 = (() => {
  class e {
    view;
    node;
    constructor(n, r) {
      ((this.view = n), (this.node = r));
    }
    static __NG_ELEMENT_ID__ = $h$1;
  }
  return e;
})();
function $h$1() {
  return new jn$1(I(), B());
}
var Te = class {},
  Vn$1 = new N('', { factory: () => true });
var Cs = new N(''),
  co$1 = (() => {
    class e {
      static ɵprov = ee({ token: e, providedIn: 'root', factory: () => new Li$1() });
    }
    return e;
  })(),
  Li$1 = class Li {
    dirtyEffectCount = 0;
    queues = new Map();
    add(t) {
      (this.enqueue(t), this.schedule(t));
    }
    schedule(t) {
      t.dirty && this.dirtyEffectCount++;
    }
    remove(t) {
      let n = t.zone,
        r = this.queues.get(n);
      r.has(t) && (r.delete(t), t.dirty && this.dirtyEffectCount--);
    }
    enqueue(t) {
      let n = t.zone;
      this.queues.has(n) || this.queues.set(n, new Set());
      let r = this.queues.get(n);
      r.has(t) || r.add(t);
    }
    flush() {
      for (; this.dirtyEffectCount > 0; ) {
        let t = false;
        for (let [n, r] of this.queues)
          n === null ? (t ||= this.flushQueue(r)) : (t ||= n.run(() => this.flushQueue(r)));
        t || (this.dirtyEffectCount = 0);
      }
    }
    flushQueue(t) {
      let n = false;
      for (let r of t) r.dirty && (this.dirtyEffectCount--, (n = true), r.run());
      return n;
    }
  },
  Fr = class {
    [L];
    constructor(t) {
      this[L] = t;
    }
    destroy() {
      this[L].destroy();
    }
  };
function bs(e, t) {
  let n = t?.injector ?? E$1(de$2),
    r = t?.manualCleanup !== true ? n.get(Ve$1) : null,
    o,
    i = n.get(jn$1, null, { optional: true }),
    s = n.get(Te);
  return (
    i !== null
      ? ((o = qh$1(i.view, s, e)), r instanceof Pr$1 && r._lView === i.view && (r = null))
      : (o = Gh$1(e, n.get(co$1), s)),
    (o.injector = n),
    r !== null && (o.onDestroyFns = [r.onDestroy(() => o.destroy())]),
    new Fr(o)
  );
}
var jl$1 = V(j$1({}, li$1), {
    cleanupFns: void 0,
    zone: null,
    onDestroyFns: null,
    run() {
      let e = bn$1(false);
      try {
        ui$1(this);
      } finally {
        bn$1(e);
      }
    },
    cleanup() {
      if (!this.cleanupFns?.length) return;
      let e = y$1(null);
      try {
        for (; this.cleanupFns.length; ) this.cleanupFns.pop()();
      } finally {
        ((this.cleanupFns = []), y$1(e));
      }
    },
  }),
  Uh$1 = V(j$1({}, jl$1), {
    consumerMarkedDirty() {
      (this.scheduler.schedule(this), this.notifier.notify(12));
    },
    destroy() {
      if ((qe$1(this), this.onDestroyFns !== null)) for (let e of this.onDestroyFns) e();
      (this.cleanup(), this.scheduler.remove(this));
    },
  }),
  Wh$1 = V(j$1({}, jl$1), {
    consumerMarkedDirty() {
      ((this.view[v$1] |= 8192), _t$1(this.view), this.notifier.notify(13));
    },
    destroy() {
      if ((qe$1(this), this.onDestroyFns !== null)) for (let e of this.onDestroyFns) e();
      (this.cleanup(), this.view[ze$1]?.delete(this));
    },
  });
function qh$1(e, t, n) {
  let r = Object.create(Wh$1);
  return (
    (r.view = e),
    (r.zone = typeof Zone < 'u' ? Zone.current : null),
    (r.notifier = t),
    (r.fn = Vl$1(r, n)),
    (e[ze$1] ??= new Set()),
    e[ze$1].add(r),
    r.consumerMarkedDirty(r),
    r
  );
}
function Gh$1(e, t, n) {
  let r = Object.create(Uh$1);
  return (
    (r.fn = Vl$1(r, e)),
    (r.scheduler = t),
    (r.notifier = n),
    (r.zone = typeof Zone < 'u' ? Zone.current : null),
    r.scheduler.add(r),
    r.notifier.notify(12),
    r
  );
}
function Vl$1(e, t) {
  return () => {
    t((n) => (e.cleanupFns ??= []).push(n));
  };
}
function Hn$1(e) {
  return typeof e == 'function' && e[L] !== void 0;
}
function lo$1(e) {
  return Hn$1(e) && typeof e.set == 'function';
}
var uo$1 = (() => {
  class e {
    internalPendingTasks = E$1(Mt);
    scheduler = E$1(Te);
    errorHandler = E$1(nt);
    add() {
      let n = this.internalPendingTasks.add();
      return () => {
        this.internalPendingTasks.has(n) &&
          (this.scheduler.notify(11), this.internalPendingTasks.remove(n));
      };
    }
    run(n) {
      let r = this.add();
      n().catch(this.errorHandler).finally(r);
    }
    static ɵprov = ee({ token: e, providedIn: 'root', factory: () => new e() });
  }
  return e;
})();
function Kn$1(e) {
  return { toString: e }.toString();
}
function Iu$1(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
var Io$1 = class Io {
    previousValue;
    currentValue;
    firstChange;
    constructor(t, n, r) {
      ((this.previousValue = t), (this.currentValue = n), (this.firstChange = r));
    }
    isFirstChange() {
      return this.firstChange;
    }
  },
  sg$1 = (() => {
    let e = () => Du$1;
    return ((e.ngInherit = true), e);
  })();
function Du$1(e) {
  return (e.type.prototype.ngOnChanges && (e.setInput = cg), ag$1);
}
function ag$1() {
  let e = wu$1(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === Ze$1) e.previous = t;
    else for (let r in t) n[r] = t[r];
    ((e.current = null), this.ngOnChanges(t));
  }
}
function cg(e, t, n, r, o) {
  let i = this.declaredInputs[r],
    s = wu$1(e) || lg(e, { previous: Ze$1, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    l = c[i];
  ((a[i] = new Io$1(l && l.currentValue, n, c === Ze$1)), Iu$1(e, t, o, n));
}
var Tu$1 = '__ngSimpleChanges__';
function wu$1(e) {
  return e[Tu$1] || null;
}
function lg(e, t) {
  return (e[Tu$1] = t);
}
var Hl$1 = [];
var k = function (e, t = null, n) {
    for (let r = 0; r < Hl$1.length; r++) {
      let o = Hl$1[r];
      o(e, t, n);
    }
  },
  M$1 = (function (e) {
    return (
      (e[(e.TemplateCreateStart = 0)] = 'TemplateCreateStart'),
      (e[(e.TemplateCreateEnd = 1)] = 'TemplateCreateEnd'),
      (e[(e.TemplateUpdateStart = 2)] = 'TemplateUpdateStart'),
      (e[(e.TemplateUpdateEnd = 3)] = 'TemplateUpdateEnd'),
      (e[(e.LifecycleHookStart = 4)] = 'LifecycleHookStart'),
      (e[(e.LifecycleHookEnd = 5)] = 'LifecycleHookEnd'),
      (e[(e.OutputStart = 6)] = 'OutputStart'),
      (e[(e.OutputEnd = 7)] = 'OutputEnd'),
      (e[(e.BootstrapApplicationStart = 8)] = 'BootstrapApplicationStart'),
      (e[(e.BootstrapApplicationEnd = 9)] = 'BootstrapApplicationEnd'),
      (e[(e.BootstrapComponentStart = 10)] = 'BootstrapComponentStart'),
      (e[(e.BootstrapComponentEnd = 11)] = 'BootstrapComponentEnd'),
      (e[(e.ChangeDetectionStart = 12)] = 'ChangeDetectionStart'),
      (e[(e.ChangeDetectionEnd = 13)] = 'ChangeDetectionEnd'),
      (e[(e.ChangeDetectionSyncStart = 14)] = 'ChangeDetectionSyncStart'),
      (e[(e.ChangeDetectionSyncEnd = 15)] = 'ChangeDetectionSyncEnd'),
      (e[(e.AfterRenderHooksStart = 16)] = 'AfterRenderHooksStart'),
      (e[(e.AfterRenderHooksEnd = 17)] = 'AfterRenderHooksEnd'),
      (e[(e.ComponentStart = 18)] = 'ComponentStart'),
      (e[(e.ComponentEnd = 19)] = 'ComponentEnd'),
      (e[(e.DeferBlockStateStart = 20)] = 'DeferBlockStateStart'),
      (e[(e.DeferBlockStateEnd = 21)] = 'DeferBlockStateEnd'),
      (e[(e.DynamicComponentStart = 22)] = 'DynamicComponentStart'),
      (e[(e.DynamicComponentEnd = 23)] = 'DynamicComponentEnd'),
      (e[(e.HostBindingsUpdateStart = 24)] = 'HostBindingsUpdateStart'),
      (e[(e.HostBindingsUpdateEnd = 25)] = 'HostBindingsUpdateEnd'),
      e
    );
  })(M$1 || {});
function ug(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = Du$1(t);
    ((n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s));
  }
  (o && (n.preOrderHooks ??= []).push(0 - e, o),
    i && ((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i)));
}
function Cu$1(e, t) {
  for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    let i = e.data[n].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: l,
        ngOnDestroy: u,
      } = i;
    (s && (e.contentHooks ??= []).push(-n, s),
      a && ((e.contentHooks ??= []).push(n, a), (e.contentCheckHooks ??= []).push(n, a)),
      c && (e.viewHooks ??= []).push(-n, c),
      l && ((e.viewHooks ??= []).push(n, l), (e.viewCheckHooks ??= []).push(n, l)),
      u != null && (e.destroyHooks ??= []).push(n, u));
  }
}
function mo$1(e, t, n) {
  bu$1(e, t, 3, n);
}
function yo$1(e, t, n, r) {
  (e[v$1] & 3) === n && bu$1(e, t, n, r);
}
function _s(e, t) {
  let n = e[v$1];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[v$1] = n));
}
function bu$1(e, t, n, r) {
  let o = r !== void 0 ? e[Tt$1] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let c = o; c < s; c++)
    if (typeof t[c + 1] == 'number') {
      if (((a = t[c]), r != null && a >= r)) break;
    } else
      (t[c] < 0 && (e[Tt$1] += 65536),
        (a < i || i == -1) && (dg(e, n, t, c), (e[Tt$1] = (e[Tt$1] & 4294901760) + c + 2)),
        c++);
}
function Bl$1(e, t) {
  k(M$1.LifecycleHookStart, e, t);
  let n = y$1(null);
  try {
    t.call(e);
  } finally {
    (y$1(n), k(M$1.LifecycleHookEnd, e, t));
  }
}
function dg(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o
    ? e[v$1] >> 14 < e[Tt$1] >> 16 && (e[v$1] & 3) === t && ((e[v$1] += 16384), Bl$1(a, i))
    : Bl$1(a, i);
}
var rn$1 = -1,
  Nt = class {
    factory;
    name;
    injectImpl;
    resolving = false;
    canSeeViewProviders;
    multi;
    componentProviders;
    index;
    providerFactory;
    constructor(t, n, r, o) {
      ((this.factory = t), (this.name = o), (this.canSeeViewProviders = n), (this.injectImpl = r));
    }
  };
function fg(e) {
  return (e.flags & 8) !== 0;
}
function pg(e) {
  return (e.flags & 16) !== 0;
}
function hg(e, t, n) {
  let r = 0;
  for (; r < n.length; ) {
    let o = n[r];
    if (typeof o == 'number') {
      if (o !== 0) break;
      r++;
      let i = n[r++],
        s = n[r++],
        a = n[r++];
      e.setAttribute(t, s, a, i);
    } else {
      let i = o,
        s = n[++r];
      (gg(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++);
    }
  }
  return r;
}
function _u$1(e) {
  return e === 3 || e === 4 || e === 6;
}
function gg(e) {
  return e.charCodeAt(0) === 64;
}
function sn$1(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let n = -1;
      for (let r = 0; r < t.length; r++) {
        let o = t[r];
        typeof o == 'number'
          ? (n = o)
          : n === 0 ||
            (n === -1 || n === 2 ? $l$1(e, n, o, null, t[++r]) : $l$1(e, n, o, null, null));
      }
    }
  return e;
}
function $l$1(e, t, n, r, o) {
  let i = 0,
    s = e.length;
  if (t === -1) s = -1;
  else
    for (; i < e.length; ) {
      let a = e[i++];
      if (typeof a == 'number') {
        if (a === t) {
          s = -1;
          break;
        } else if (a > t) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    let a = e[i];
    if (typeof a == 'number') break;
    if (a === n) {
      o !== null && (e[i + 1] = o);
      return;
    }
    (i++, o !== null && i++);
  }
  (s !== -1 && (e.splice(s, 0, t), (i = s + 1)),
    e.splice(i++, 0, n),
    o !== null && e.splice(i++, 0, o));
}
function Mu$1(e) {
  return e !== rn$1;
}
function Do$1(e) {
  return e & 32767;
}
function mg(e) {
  return e >> 16;
}
function To$1(e, t) {
  let n = mg(e),
    r = t;
  for (; n > 0; ) ((r = r[Dt$1]), n--);
  return r;
}
var Ps$1 = true;
function Ul$1(e) {
  let t = Ps$1;
  return ((Ps$1 = e), t);
}
var yg = 256,
  Nu$1 = yg - 1,
  Su$1 = 5,
  vg = 0,
  Me$2 = {};
function Eg(e, t, n) {
  let r;
  (typeof n == 'string' ? (r = n.charCodeAt(0) || 0) : n.hasOwnProperty(It$1) && (r = n[It$1]),
    r == null && (r = n[It$1] = vg++));
  let o = r & Nu$1,
    i = 1 << o;
  t.data[e + (o >> Su$1)] |= i;
}
function wo$1(e, t) {
  let n = xu$1(e, t);
  if (n !== -1) return n;
  let r = t[g];
  r.firstCreatePass &&
    ((e.injectorIndex = t.length), Ms$1(r.data, e), Ms$1(t, null), Ms$1(r.blueprint, null));
  let o = ua(e, t),
    i = e.injectorIndex;
  if (Mu$1(o)) {
    let s = Do$1(o),
      a = To$1(o, t),
      c = a[g].data;
    for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | c[s + l];
  }
  return ((t[i + 8] = o), i);
}
function Ms$1(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function xu$1(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function ua(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = Pu$1(o)), r === null)) return rn$1;
    if ((n++, (o = o[Dt$1]), r.injectorIndex !== -1)) return r.injectorIndex | (n << 16);
  }
  return rn$1;
}
function Ls$1(e, t, n) {
  Eg(e, t, n);
}
function Ig(e, t) {
  if (t === 'class') return e.classes;
  if (t === 'style') return e.styles;
  let n = e.attrs;
  if (n) {
    let r = n.length,
      o = 0;
    for (; o < r; ) {
      let i = n[o];
      if (_u$1(i)) break;
      if (i === 0) o = o + 2;
      else if (typeof i == 'number') for (o++; o < r && typeof n[o] == 'string'; ) o++;
      else {
        if (i === t) return n[o + 1];
        o = o + 2;
      }
    }
  }
  return null;
}
function Au$1(e, t, n) {
  if (n & 8 || e !== void 0) return e;
  Wr$1();
}
function ku$1(e, t, n, r) {
  if ((n & 8 && r === void 0 && (r = null), (n & 3) === 0)) {
    let o = e[Pe$1],
      i = X$1(void 0);
    try {
      return o ? o.get(t, r, n & 8) : qi$1(t, r, n & 8);
    } finally {
      X$1(i);
    }
  }
  return Au$1(r, t, n);
}
function Ru$1(e, t, n, r = 0, o) {
  if (e !== null) {
    if (t[v$1] & 2048 && !(r & 2)) {
      let s = bg(e, t, n, r, Me$2);
      if (s !== Me$2) return s;
    }
    let i = Ou$1(e, t, n, r, Me$2);
    if (i !== Me$2) return i;
  }
  return ku$1(t, n, r, o);
}
function Ou$1(e, t, n, r, o) {
  let i = Tg(n);
  if (typeof i == 'function') {
    if (!ms(t, e, r)) return r & 1 ? Au$1(o, n, r) : ku$1(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & 8))) Wr$1(n);
      else return s;
    } finally {
      ys();
    }
  } else if (typeof i == 'number') {
    let s = null,
      a = xu$1(e, t),
      c = rn$1,
      l = r & 1 ? t[Y][z$1] : null;
    for (
      (a === -1 || r & 4) &&
      ((c = a === -1 ? ua(e, t) : t[a + 8]),
      c === rn$1 || !ql$1(r, false) ? (a = -1) : ((s = t[g]), (a = Do$1(c)), (t = To$1(c, t))));
      a !== -1;
    ) {
      let u = t[g];
      if (Wl$1(i, a, u.data)) {
        let d = Dg(a, t, n, s, r, l);
        if (d !== Me$2) return d;
      }
      ((c = t[a + 8]),
        c !== rn$1 && ql$1(r, t[g].data[a + 8] === l) && Wl$1(i, a, t)
          ? ((s = u), (a = Do$1(c)), (t = To$1(c, t)))
          : (a = -1));
    }
  }
  return o;
}
function Dg(e, t, n, r, o, i) {
  let s = t[g],
    a = s.data[e + 8],
    c = r == null ? je(a) && Ps$1 : r != s && (a.type & 3) !== 0,
    l = o & 1 && i === a,
    u = vo$1(a, s, n, c, l);
  return u !== null ? Wn$1(t, s, u, a, o) : Me$2;
}
function vo$1(e, t, n, r, o) {
  let i = e.providerIndexes,
    s = t.data,
    a = i & 1048575,
    c = e.directiveStart,
    l = e.directiveEnd,
    u = i >> 20,
    d = r ? a : a + u,
    p = o ? a + u : l;
  for (let f = d; f < p; f++) {
    let h = s[f];
    if ((f < c && n === h) || (f >= c && h.type === n)) return f;
  }
  if (o) {
    let f = s[c];
    if (f && Ce$2(f) && f.type === n) return c;
  }
  return null;
}
function Wn$1(e, t, n, r, o) {
  let i = e[n],
    s = t.data;
  if (i instanceof Nt) {
    let a = i;
    if (a.resolving) throw Wi$1();
    let c = Ul$1(a.canSeeViewProviders);
    a.resolving = true;
    s[n].type || s[n];
    let d = a.injectImpl ? X$1(a.injectImpl) : null;
    ms(e, r, 0);
    try {
      ((i = e[n] = a.factory(void 0, o, s, e, r)),
        t.firstCreatePass && n >= r.directiveStart && ug(n, s[n], t));
    } finally {
      (d !== null && X$1(d), Ul$1(c), (a.resolving = false), ys());
    }
  }
  return i;
}
function Tg(e) {
  if (typeof e == 'string') return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(It$1) ? e[It$1] : void 0;
  return typeof t == 'number' ? (t >= 0 ? t & Nu$1 : wg) : t;
}
function Wl$1(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> Su$1)] & r);
}
function ql$1(e, t) {
  return !(e & 2) && !(e & 1 && t);
}
var rt = class {
  _tNode;
  _lView;
  constructor(t, n) {
    ((this._tNode = t), (this._lView = n));
  }
  get(t, n, r) {
    return Ru$1(this._tNode, this._lView, t, mt(r), n);
  }
};
function wg() {
  return new rt(B(), I());
}
function Cg(e) {
  return Kn$1(() => {
    let t = e.prototype.constructor,
      n = t[Cn] || Fs$1(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[Cn] || Fs$1(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function Fs$1(e) {
  return Fi$1(e)
    ? () => {
        let t = Fs$1($$1(e));
        return t && t();
      }
    : yt$1(e);
}
function bg(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[v$1] & 2048 && !Jt$1(s); ) {
    let a = Ou$1(i, s, n, r | 2, Me$2);
    if (a !== Me$2) return a;
    let c = i.parent;
    if (!c) {
      let l = s[Xi$1];
      if (l) {
        let u = l.get(n, Me$2, r & -5);
        if (u !== Me$2) return u;
      }
      ((c = Pu$1(s)), (s = s[Dt$1]));
    }
    i = c;
  }
  return o;
}
function Pu$1(e) {
  let t = e[g],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[z$1] : null;
}
function Lu$1(e) {
  return Ig(B(), e);
}
function Jn$1(e) {
  return {
    token: e.token,
    providedIn: e.autoProvided === false ? null : 'root',
    factory: e.factory,
    value: void 0,
  };
}
function _g() {
  return un$1(B(), I());
}
function un$1(e, t) {
  return new Xn$1(ce(e, t));
}
var Xn$1 = (() => {
  class e {
    nativeElement;
    constructor(n) {
      this.nativeElement = n;
    }
    static __NG_ELEMENT_ID__ = _g;
  }
  return e;
})();
function Fu$1(e) {
  return e instanceof Xn$1 ? e.nativeElement : e;
}
function Mg() {
  return this._results[Symbol.iterator]();
}
var Co$1 = class Co {
  _emitDistinctChangesOnly;
  dirty = true;
  _onDirty = void 0;
  _results = [];
  _changesDetected = false;
  _changes = void 0;
  length = 0;
  first = void 0;
  last = void 0;
  get changes() {
    return (this._changes ??= new J$1());
  }
  constructor(t = false) {
    this._emitDistinctChangesOnly = t;
  }
  get(t) {
    return this._results[t];
  }
  map(t) {
    return this._results.map(t);
  }
  filter(t) {
    return this._results.filter(t);
  }
  find(t) {
    return this._results.find(t);
  }
  reduce(t, n) {
    return this._results.reduce(t, n);
  }
  forEach(t) {
    this._results.forEach(t);
  }
  some(t) {
    return this._results.some(t);
  }
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  reset(t, n) {
    this.dirty = false;
    let r = Yc$1(t);
    (this._changesDetected = !Zc$1(this._results, r, n)) &&
      ((this._results = r),
      (this.length = r.length),
      (this.last = r[this.length - 1]),
      (this.first = r[0]));
  }
  notifyOnChanges() {
    this._changes !== void 0 &&
      (this._changesDetected || !this._emitDistinctChangesOnly) &&
      this._changes.next(this);
  }
  onDirty(t) {
    this._onDirty = t;
  }
  setDirty() {
    ((this.dirty = true), this._onDirty?.());
  }
  destroy() {
    this._changes !== void 0 && (this._changes.complete(), this._changes.unsubscribe());
  }
  [Symbol.iterator] = Mg;
};
function ju$1(e) {
  return (e.flags & 128) === 128;
}
var da = (function (e) {
    return (
      (e[(e.OnPush = 0)] = 'OnPush'),
      (e[(e.Eager = 1)] = 'Eager'),
      (e[(e.Default = 1)] = 'Default'),
      e
    );
  })(da || {}),
  Vu$1 = new Map(),
  Ng = 0;
function Sg() {
  return Ng++;
}
function xg(e) {
  Vu$1.set(e[Le$1], e);
}
function js$1(e) {
  Vu$1.delete(e[Le$1]);
}
var Gl$1 = '__ngContext__';
function an$1(e, t) {
  Fe$1(t) ? ((e[Gl$1] = t[Le$1]), xg(t)) : (e[Gl$1] = t);
}
function Hu$1(e) {
  return $u$1(e[Kt$1]);
}
function Bu$1(e) {
  return $u$1(e[ie]);
}
function $u$1(e) {
  for (; e !== null && !se(e); ) e = e[ie];
  return e;
}
var Vs$1;
function Ag(e) {
  Vs$1 = e;
}
function Uu$1() {
  if (Vs$1 !== void 0) return Vs$1;
  if (typeof document < 'u') return document;
  throw new C(210, false);
}
var Wu$1 = false,
  qu$1 = new N('', { factory: () => Wu$1 });
var zl$1 = new WeakMap();
function kg(e, t) {
  if (e == null || typeof e != 'object') return;
  let n = zl$1.get(e);
  (n || ((n = new WeakSet()), zl$1.set(e, n)), n.add(t));
}
function Ho$1(e) {
  return (e.flags & 32) === 32;
}
var Pg = () => null;
function Gu$1(e, t, n = false) {
  return Pg();
}
function zu$1(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = y$1(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          (Ln$1(i), a.contentQueries(2, t[s], s));
        }
      }
    } finally {
      y$1(r);
    }
  }
}
function Hs$1(e, t, n) {
  Ln$1(0);
  let r = y$1(null);
  try {
    t(e, n);
  } finally {
    y$1(r);
  }
}
function Qu$1(e, t, n) {
  if (es$1(t)) {
    let r = y$1(null);
    try {
      let o = t.directiveStart,
        i = t.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let c = n[s];
          a.contentQueries(1, c, s);
        }
      }
    } finally {
      y$1(r);
    }
  }
}
var St$1 = (function (e) {
  return (
    (e[(e.Emulated = 0)] = 'Emulated'),
    (e[(e.None = 2)] = 'None'),
    (e[(e.ShadowDom = 3)] = 'ShadowDom'),
    (e[(e.ExperimentalIsolatedShadowDom = 4)] = 'ExperimentalIsolatedShadowDom'),
    e
  );
})(St$1 || {});
var fo$1;
function Lg() {
  if (fo$1 === void 0 && ((fo$1 = null), qt$1.trustedTypes))
    try {
      fo$1 = qt$1.trustedTypes.createPolicy('angular', {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return fo$1;
}
function Bo$1(e) {
  return Lg()?.createHTML(e) || e;
}
var po$1;
function Fg() {
  if (po$1 === void 0 && ((po$1 = null), qt$1.trustedTypes))
    try {
      po$1 = qt$1.trustedTypes.createPolicy('angular#unsafe-bypass', {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return po$1;
}
function Ql$1(e) {
  return Fg()?.createScriptURL(e) || e;
}
var He$1 = class He {
    changingThisBreaksApplicationSecurity;
    constructor(t) {
      this.changingThisBreaksApplicationSecurity = t;
    }
    toString() {
      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${jr})`;
    }
  },
  Bs$1 = class Bs extends He$1 {
    getTypeName() {
      return 'HTML';
    }
  },
  $s$1 = class $s extends He$1 {
    getTypeName() {
      return 'Style';
    }
  },
  Us$1 = class Us extends He$1 {
    getTypeName() {
      return 'Script';
    }
  },
  Ws$1 = class Ws extends He$1 {
    getTypeName() {
      return 'URL';
    }
  },
  qs$1 = class qs extends He$1 {
    getTypeName() {
      return 'ResourceURL';
    }
  };
function er$1(e) {
  return e instanceof He$1 ? e.changingThisBreaksApplicationSecurity : e;
}
function fa(e, t) {
  let n = Zu$1(e);
  if (n != null && n !== t) {
    if (n === 'ResourceURL' && t === 'URL') return true;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${jr})`);
  }
  return n === t;
}
function Zu$1(e) {
  return (e instanceof He$1 && e.getTypeName()) || null;
}
function jg(e) {
  return new Bs$1(e);
}
function Vg(e) {
  return new $s$1(e);
}
function Hg(e) {
  return new Us$1(e);
}
function Bg(e) {
  return new Ws$1(e);
}
function $g(e) {
  return new qs$1(e);
}
function Ug(e) {
  let t = new zs$1(e);
  return Wg() ? new Gs$1(t) : t;
}
var Gs$1 = class Gs {
    inertDocumentHelper;
    constructor(t) {
      this.inertDocumentHelper = t;
    }
    getInertBodyElement(t) {
      t = '<body><remove></remove>' + t;
      try {
        let n = new window.DOMParser().parseFromString(Bo$1(t), 'text/html').body;
        return n === null
          ? this.inertDocumentHelper.getInertBodyElement(t)
          : (n.firstChild?.remove(), n);
      } catch {
        return null;
      }
    }
  },
  zs$1 = class zs {
    defaultDoc;
    inertDocument;
    constructor(t) {
      ((this.defaultDoc = t),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument('sanitization-inert')));
    }
    getInertBodyElement(t) {
      let n = this.inertDocument.createElement('template');
      return ((n.innerHTML = Bo$1(t)), n);
    }
  };
function Wg() {
  try {
    return !!new window.DOMParser().parseFromString(Bo$1(''), 'text/html');
  } catch {
    return false;
  }
}
var qg = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function pa(e) {
  return ((e = String(e)), e.match(qg) ? e : 'unsafe:' + e);
}
function Be(e) {
  let t = {};
  for (let n of e.split(',')) t[n] = true;
  return t;
}
function tr$1(...e) {
  let t = {};
  for (let n of e) for (let r in n) n.hasOwnProperty(r) && (t[r] = true);
  return t;
}
var Yu$1 = Be('area,br,col,hr,img,wbr'),
  Ku$1 = Be('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
  Ju$1 = Be('rp,rt'),
  Gg = tr$1(Ju$1, Ku$1),
  zg = tr$1(
    Ku$1,
    Be(
      'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul',
    ),
  ),
  Qg = tr$1(
    Ju$1,
    Be(
      'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video',
    ),
  ),
  Zl$1 = tr$1(Yu$1, zg, Qg, Gg),
  Xu$1 = Be('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
  Zg = Be(
    'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width',
  ),
  Yg = Be(
    'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext',
  ),
  Kg = tr$1(Xu$1, Zg, Yg),
  Jg = Be('script,style,template'),
  Qs$1 = class Qs {
    sanitizedSomething = false;
    buf = [];
    sanitizeChildren(t) {
      let n = t.firstChild,
        r = true,
        o = [];
      for (; n; ) {
        if (
          (n.nodeType === Node.ELEMENT_NODE
            ? (r = this.startElement(n))
            : n.nodeType === Node.TEXT_NODE
              ? this.chars(n.nodeValue)
              : (this.sanitizedSomething = true),
          r && n.firstChild)
        ) {
          (o.push(n), (n = tm$1(n)));
          continue;
        }
        for (; n; ) {
          n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
          let i = em$1(n);
          if (i) {
            n = i;
            break;
          }
          n = o.pop();
        }
      }
      return this.buf.join('');
    }
    startElement(t) {
      let n = Yl$1(t).toLowerCase();
      if (!Zl$1.hasOwnProperty(n)) return ((this.sanitizedSomething = true), !Jg.hasOwnProperty(n));
      (this.buf.push('<'), this.buf.push(n));
      let r = t.attributes;
      for (let o = 0; o < r.length; o++) {
        let i = r.item(o),
          s = i.name,
          a = s.toLowerCase();
        if (!Kg.hasOwnProperty(a)) {
          this.sanitizedSomething = true;
          continue;
        }
        let c = i.value;
        (Xu$1[a] && (c = pa(c)), this.buf.push(' ', s, '="', Kl(c), '"'));
      }
      return (this.buf.push('>'), true);
    }
    endElement(t) {
      let n = Yl$1(t).toLowerCase();
      Zl$1.hasOwnProperty(n) &&
        !Yu$1.hasOwnProperty(n) &&
        (this.buf.push('</'), this.buf.push(n), this.buf.push('>'));
    }
    chars(t) {
      this.buf.push(Kl(t));
    }
  };
function Xg(e, t) {
  return (
    (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !==
    Node.DOCUMENT_POSITION_CONTAINED_BY
  );
}
function em$1(e) {
  let t = e.nextSibling;
  if (t && e !== t.previousSibling) throw ed$1(t);
  return t;
}
function tm$1(e) {
  let t = e.firstChild;
  if (t && Xg(e, t)) throw ed$1(t);
  return t;
}
function Yl$1(e) {
  let t = e.nodeName;
  return typeof t == 'string' ? t : 'FORM';
}
function ed$1(e) {
  return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
}
var nm$1 = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  rm$1 = /([^\#-~ |!])/g;
function Kl(e) {
  return e
    .replace(/&/g, '&amp;')
    .replace(nm$1, function (t) {
      let n = t.charCodeAt(0),
        r = t.charCodeAt(1);
      return '&#' + ((n - 55296) * 1024 + (r - 56320) + 65536) + ';';
    })
    .replace(rm$1, function (t) {
      return '&#' + t.charCodeAt(0) + ';';
    })
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
var ho$1;
function om$1(e, t) {
  let n = null;
  try {
    ho$1 = ho$1 || Ug(e);
    let r = t ? String(t) : '';
    n = ho$1.getInertBodyElement(r);
    let o = 5,
      i = r;
    do {
      if (o === 0) throw new Error('Failed to sanitize html because the input is unstable');
      (o--, (r = i), (i = n.innerHTML), (n = ho$1.getInertBodyElement(r)));
    } while (r !== i);
    let a = new Qs$1().sanitizeChildren(Jl$1(n) || n);
    return Bo$1(a);
  } finally {
    if (n) {
      let r = Jl$1(n) || n;
      for (; r.firstChild; ) r.firstChild.remove();
    }
  }
}
function Jl$1(e) {
  return 'content' in e && im$1(e) ? e.content : null;
}
function im$1(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === 'TEMPLATE';
}
function sm$1(e, t) {
  return e.createText(t);
}
function am$1(e, t, n) {
  e.setValue(t, n);
}
function td$1(e, t, n) {
  return e.createElement(t, n);
}
function bo$1(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function nd$1(e, t, n) {
  e.appendChild(t, n);
}
function Xl$1(e, t, n, r, o) {
  r !== null ? bo$1(e, t, n, r, o) : nd$1(e, t, n);
}
function cm$1(e, t, n, r) {
  e.removeChild(null, t, n, r);
}
function lm$1(e, t, n) {
  e.setAttribute(t, 'style', n);
}
function um$1(e, t, n) {
  n === '' ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
}
function rd$1(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  (r !== null && hg(e, t, r), o !== null && um$1(e, t, o), i !== null && lm$1(e, t, i));
}
var $o$1 = (function (e) {
  return (
    (e[(e.NONE = 0)] = 'NONE'),
    (e[(e.HTML = 1)] = 'HTML'),
    (e[(e.STYLE = 2)] = 'STYLE'),
    (e[(e.SCRIPT = 3)] = 'SCRIPT'),
    (e[(e.URL = 4)] = 'URL'),
    (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
    (e[(e.ATTRIBUTE_NO_BINDING = 6)] = 'ATTRIBUTE_NO_BINDING'),
    e
  );
})($o$1 || {});
function od(e) {
  let t = sd();
  return t ? t.sanitize($o$1.URL, e) || '' : fa(e, 'URL') ? er$1(e) : pa(xn(e));
}
function id$1(e) {
  let t = sd();
  if (t) return Ql$1(t.sanitize($o$1.RESOURCE_URL, e) || '');
  if (fa(e, 'ResourceURL')) return Ql$1(er$1(e));
  throw new C(904, false);
}
var dm$1 = {
  embed: { src: true },
  frame: { src: true },
  iframe: { src: true },
  media: { src: true },
  base: { href: true },
  link: { href: true },
  object: { data: true, codebase: true },
};
function fm$1(e, t) {
  return dm$1[e.toLowerCase()]?.[t.toLowerCase()] === true ? id$1 : od;
}
function pm$1(e, t, n) {
  return fm$1(t, n)(e);
}
function sd() {
  let e = I();
  return e && e[pe$1].sanitizer;
}
function hm$1(e) {
  return e.ownerDocument.defaultView;
}
function gm$1(e) {
  return e.ownerDocument;
}
function mm$1(e) {
  return e instanceof Function ? e() : e;
}
function ym$1(e, t, n) {
  let r = e.length;
  for (;;) {
    let o = e.indexOf(t, n);
    if (o === -1) return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      let i = t.length;
      if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
    }
    n = o + 1;
  }
}
var ad = 'ng-template';
function vm$1(e, t, n, r) {
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == 'string'; o += 2)
      if (t[o] === 'class' && ym$1(t[o + 1].toLowerCase(), n, 0) !== -1) return true;
  } else if (ha(e)) return false;
  if (((o = t.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == 'string'; )
      if (i.toLowerCase() === n) return true;
  }
  return false;
}
function ha(e) {
  return e.type === 4 && e.value !== ad;
}
function Em$1(e, t, n) {
  let r = e.type === 4 && !n ? ad : e.value;
  return t === r;
}
function Im$1(e, t, n) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? wm$1(o) : 0,
    s = false;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == 'number') {
      if (!s && !he$2(r) && !he$2(c)) return false;
      if (s && he$2(c)) continue;
      ((s = false), (r = c | (r & 1)));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (((r = 2 | (r & 1)), (c !== '' && !Em$1(e, c, n)) || (c === '' && t.length === 1))) {
          if (he$2(r)) return false;
          s = true;
        }
      } else if (r & 8) {
        if (o === null || !vm$1(e, o, c, n)) {
          if (he$2(r)) return false;
          s = true;
        }
      } else {
        let l = t[++a],
          u = Dm$1(c, o, ha(e), n);
        if (u === -1) {
          if (he$2(r)) return false;
          s = true;
          continue;
        }
        if (l !== '') {
          let d;
          if ((u > i ? (d = '') : (d = o[u + 1].toLowerCase()), r & 2 && l !== d)) {
            if (he$2(r)) return false;
            s = true;
          }
        }
      }
  }
  return he$2(r) || s;
}
function he$2(e) {
  return (e & 1) === 0;
}
function Dm$1(e, t, n, r) {
  if (t === null) return -1;
  let o = 0;
  if (r || !n) {
    let i = false;
    for (; o < t.length; ) {
      let s = t[o];
      if (s === e) return o;
      if (s === 3 || s === 6) i = true;
      else if (s === 1 || s === 2) {
        let a = t[++o];
        for (; typeof a == 'string'; ) a = t[++o];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else return Cm(t, e);
}
function cd$1(e, t, n = false) {
  for (let r = 0; r < t.length; r++) if (Im$1(e, t[r], n)) return true;
  return false;
}
function Tm$1(e) {
  let t = e.attrs;
  if (t != null) {
    let n = t.indexOf(5);
    if ((n & 1) === 0) return t[n + 1];
  }
  return null;
}
function wm$1(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (_u$1(n)) return t;
  }
  return e.length;
}
function Cm(e, t) {
  let n = e.indexOf(4);
  if (n > -1)
    for (n++; n < e.length; ) {
      let r = e[n];
      if (typeof r == 'number') return -1;
      if (r === t) return n;
      n++;
    }
  return -1;
}
function bm$1(e, t) {
  e: for (let n = 0; n < t.length; n++) {
    let r = t[n];
    if (e.length === r.length) {
      for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
      return true;
    }
  }
  return false;
}
function eu$1(e, t) {
  return e ? ':not(' + t.trim() + ')' : t;
}
function _m$1(e) {
  let t = e[0],
    n = 1,
    r = 2,
    o = '',
    i = false;
  for (; n < e.length; ) {
    let s = e[n];
    if (typeof s == 'string')
      if (r & 2) {
        let a = e[++n];
        o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']';
      } else r & 8 ? (o += '.' + s) : r & 4 && (o += ' ' + s);
    else (o !== '' && !he$2(s) && ((t += eu$1(i, o)), (o = '')), (r = s), (i = i || !he$2(r)));
    n++;
  }
  return (o !== '' && (t += eu$1(i, o)), t);
}
function Mm$1(e) {
  return e.map(_m$1).join(',');
}
function Nm$1(e) {
  let t = [],
    n = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == 'string') o === 2 ? i !== '' && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!he$2(o)) break;
      o = i;
    }
    r++;
  }
  return (n.length && t.push(1, ...n), t);
}
var ne = {};
function ga(e, t, n, r, o, i, s, a, c, l, u) {
  let d = F + r,
    p = d + o,
    f = Sm$1(d, p),
    h = typeof l == 'function' ? l() : l;
  return (f[g] = {
    type: e,
    blueprint: f,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: t,
    data: f.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: p,
    hostBindingOpCodes: null,
    firstCreatePass: true,
    firstUpdatePass: true,
    staticViewQueries: false,
    staticContentQueries: false,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == 'function' ? i() : i,
    pipeRegistry: typeof s == 'function' ? s() : s,
    firstChild: null,
    schemas: c,
    consts: h,
    incompleteFirstPass: false,
    ssrId: u,
  });
}
function Sm$1(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : ne);
  return n;
}
function xm$1(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = ga(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id,
      ))
    : t;
}
function ma(e, t, n, r, o, i, s, a, c, l, u) {
  let d = t.blueprint.slice();
  return (
    (d[fe$2] = o),
    (d[v$1] = r | 4 | 128 | 8 | 64 | 1024),
    (l !== null || (e && e[v$1] & 2048)) && (d[v$1] |= 2048),
    ns$1(d),
    (d[H$1] = d[Dt$1] = e),
    (d[U] = n),
    (d[pe$1] = s || (e && e[pe$1])),
    (d[R$2] = a || (e && e[R$2])),
    (d[Pe$1] = c || (e && e[Pe$1]) || null),
    (d[z$1] = i),
    (d[Le$1] = Sg()),
    (d[Zt$1] = u),
    (d[Xi$1] = l),
    (d[Y] = t.type == 2 ? e[Y] : d),
    d
  );
}
function Am$1(e, t, n) {
  let r = ce(t, e),
    o = xm$1(n),
    i = e[pe$1].rendererFactory,
    s = ya(e, ma(e, o, null, ld$1(n), r, t, null, i.createRenderer(r, n), null, null, null));
  return (e[t.index] = s);
}
function ld$1(e) {
  let t = 16;
  return (e.signals ? (t = 4096) : e.onPush && (t = 64), t);
}
function ud$1(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) (t.push(r), e.blueprint.push(r), e.data.push(null));
  return o;
}
function ya(e, t) {
  return (e[Kt$1] ? (e[Ji$1][ie] = t) : (e[Kt$1] = t), (e[Ji$1] = t), t);
}
function km$1(e = 1) {
  dd$1(P$1(), I(), et() + e);
}
function dd$1(e, t, n, r) {
  if ((t[v$1] & 3) === 3) {
    let i = e.preOrderCheckHooks;
    i !== null && mo$1(t, i, n);
  } else {
    let i = e.preOrderHooks;
    i !== null && yo$1(t, i, 0, n);
  }
  tt(n);
}
var Uo$1 = (function (e) {
  return (
    (e[(e.None = 0)] = 'None'),
    (e[(e.SignalBased = 1)] = 'SignalBased'),
    (e[(e.HasDecoratorInputTransform = 2)] = 'HasDecoratorInputTransform'),
    e
  );
})(Uo$1 || {});
function xt(e, t, n, r) {
  let o = y$1(null);
  try {
    let [i, s, a] = e.inputs[n],
      c = null;
    ((s & Uo$1.SignalBased) !== 0 && (c = t[i][L]),
      c !== null && c.transformFn !== void 0
        ? (r = c.transformFn(r))
        : a !== null && (r = a.call(t, r)),
      e.setInput !== null ? e.setInput(t, c, r, n, i) : Iu$1(t, c, i, r));
  } finally {
    y$1(o);
  }
}
var _o$1 = (function (e) {
    return ((e[(e.Important = 1)] = 'Important'), (e[(e.DashCase = 2)] = 'DashCase'), e);
  })(_o$1 || {}),
  Rm$1;
function va(e, t) {
  return Rm$1(e, t);
}
typeof document < 'u' && typeof document?.documentElement?.getAnimations == 'function';
var Zs$1 = new WeakMap(),
  Bn$1 = new WeakSet();
function Om$1(e, t) {
  let n = Zs$1.get(e);
  if (!n || n.length === 0) return;
  let r = t.parentNode,
    o = t.previousSibling;
  for (let i = n.length - 1; i >= 0; i--) {
    let s = n[i],
      a = s.parentNode;
    s === t
      ? (n.splice(i, 1),
        Bn$1.add(s),
        s.dispatchEvent(new CustomEvent('animationend', { detail: { cancel: true } })))
      : ((o && s === o) || (a && r && a !== r)) &&
        (n.splice(i, 1),
        s.dispatchEvent(new CustomEvent('animationend', { detail: { cancel: true } })),
        s.parentNode?.removeChild(s));
  }
}
function Pm$1(e, t) {
  let n = Zs$1.get(e);
  n ? n.includes(t) || n.push(t) : Zs$1.set(e, [t]);
}
var qn$1 = new Set(),
  Wo$1 = (function (e) {
    return (
      (e[(e.CHANGE_DETECTION = 0)] = 'CHANGE_DETECTION'),
      (e[(e.AFTER_NEXT_RENDER = 1)] = 'AFTER_NEXT_RENDER'),
      e
    );
  })(Wo$1 || {}),
  dn$1 = new N(''),
  tu$1 = new Set();
function fn$1(e) {
  tu$1.has(e) ||
    (tu$1.add(e), performance?.mark?.('mark_feature_usage', { detail: { feature: e } }));
}
var Ea = (() => {
    class e {
      impl = null;
      execute() {
        this.impl?.execute();
      }
      static ɵprov = ee({ token: e, providedIn: 'root', factory: () => new e() });
    }
    return e;
  })(),
  Ia = [0, 1, 2, 3],
  fd$1 = (() => {
    class e {
      ngZone = E$1(De$2);
      scheduler = E$1(Te);
      errorHandler = E$1(Qe, { optional: true });
      sequences = new Set();
      deferredRegistrations = new Set();
      executing = false;
      constructor() {
        E$1(dn$1, { optional: true });
      }
      execute() {
        let n = this.sequences.size > 0;
        (n && k(M$1.AfterRenderHooksStart), (this.executing = true));
        for (let r of Ia)
          for (let o of this.sequences)
            if (!(o.erroredOrDestroyed || !o.hooks[r]))
              try {
                o.pipelinedValue = this.ngZone.runOutsideAngular(() =>
                  this.maybeTrace(() => {
                    let i = o.hooks[r];
                    return i(o.pipelinedValue);
                  }, o.snapshot),
                );
              } catch (i) {
                ((o.erroredOrDestroyed = true), this.errorHandler?.handleError(i));
              }
        this.executing = false;
        for (let r of this.sequences)
          (r.afterRun(), r.once && (this.sequences.delete(r), r.destroy()));
        for (let r of this.deferredRegistrations) this.sequences.add(r);
        (this.deferredRegistrations.size > 0 && this.scheduler.notify(7),
          this.deferredRegistrations.clear(),
          n && k(M$1.AfterRenderHooksEnd));
      }
      register(n) {
        let { view: r } = n;
        r !== void 0
          ? ((r[wt$1] ??= []).push(n), _t$1(r), (r[v$1] |= 8192))
          : this.executing
            ? this.deferredRegistrations.add(n)
            : this.addSequence(n);
      }
      addSequence(n) {
        (this.sequences.add(n), this.scheduler.notify(7));
      }
      unregister(n) {
        this.executing && this.sequences.has(n)
          ? ((n.erroredOrDestroyed = true), (n.pipelinedValue = void 0), (n.once = true))
          : (this.sequences.delete(n), this.deferredRegistrations.delete(n));
      }
      maybeTrace(n, r) {
        return r ? r.run(Wo$1.AFTER_NEXT_RENDER, n) : n();
      }
      static ɵprov = ee({ token: e, providedIn: 'root', factory: () => new e() });
    }
    return e;
  })(),
  Mo$1 = class Mo {
    impl;
    hooks;
    view;
    once;
    snapshot;
    erroredOrDestroyed = false;
    pipelinedValue = void 0;
    unregisterOnDestroy;
    constructor(t, n, r, o, i, s = null) {
      ((this.impl = t),
        (this.hooks = n),
        (this.view = r),
        (this.once = o),
        (this.snapshot = s),
        (this.unregisterOnDestroy = i?.onDestroy(() => this.destroy())));
    }
    afterRun() {
      ((this.erroredOrDestroyed = false),
        (this.pipelinedValue = void 0),
        this.snapshot?.dispose(),
        (this.snapshot = null));
    }
    destroy() {
      (this.impl.unregister(this), this.unregisterOnDestroy?.());
      let t = this.view?.[wt$1];
      t && (this.view[wt$1] = t.filter((n) => n !== this));
    }
  };
var pd$1 = new N('', {
  factory: () => {
    let e = E$1(oe$1),
      t = new Set();
    return (
      e.onDestroy(() => t.clear()),
      { queue: t, isScheduled: false, scheduler: null, injector: e }
    );
  },
});
function hd$1(e, t, n) {
  let r = e.get(pd$1);
  if (Array.isArray(t)) for (let o of t) (r.queue.add(o), n?.detachedLeaveAnimationFns?.push(o));
  else (r.queue.add(t), n?.detachedLeaveAnimationFns?.push(t));
  r.scheduler && r.scheduler(e);
}
function Lm$1(e, t) {
  let n = e.get(pd$1);
  if (Array.isArray(t)) for (let r of t) n.queue.delete(r);
  else n.queue.delete(t);
}
function Fm$1(e, t) {
  for (let [n, r] of t) hd$1(e, r.animateFns);
}
function nu$1(e, t, n, r) {
  let o = e?.[Ke$1]?.enter;
  t !== null && o && o.has(n.index) && Fm$1(r, o);
}
function ru$1(e, t, n, r) {
  try {
    n.get(kn);
  } catch {
    return r(false);
  }
  let o = e?.[Ke$1];
  o?.enter?.has(t.index) && Lm$1(n, o.enter.get(t.index).animateFns);
  let i = jm$1(e, t, o);
  if (i.size === 0) {
    let s = false;
    if (e) {
      let a = [];
      (qo$1(e, t, a), (s = a.length > 0));
    }
    if (!s) return r(false);
  }
  (e && qn$1.add(e[Le$1]), hd$1(n, () => Vm$1(e, t, o || void 0, i, r), o || void 0));
}
function jm$1(e, t, n) {
  let r = new Map(),
    o = n?.leave;
  if ((o && o.has(t.index) && r.set(t.index, o.get(t.index)), e && o))
    for (let [i, s] of o) {
      if (r.has(i)) continue;
      let c = e[g].data[i].parent;
      for (; c; ) {
        if (c === t) {
          r.set(i, s);
          break;
        }
        c = c.parent;
      }
    }
  return r;
}
function Vm$1(e, t, n, r, o) {
  let i = [];
  if (n && n.leave)
    for (let [s] of r) {
      if (!n.leave.has(s)) continue;
      let a = n.leave.get(s);
      for (let c of a.animateFns) {
        let { promise: l } = c();
        i.push(l);
      }
      n.detachedLeaveAnimationFns = void 0;
    }
  if ((e && qo$1(e, t, i), i.length > 0)) {
    let s = n || e?.[Ke$1];
    if (s) {
      let a = s.running;
      (a && i.push(a), (s.running = Promise.allSettled(i)), Bm$1(e, s.running, o));
    } else
      Promise.allSettled(i).then(() => {
        (e && qn$1.delete(e[Le$1]), o(true));
      });
  } else (e && qn$1.delete(e[Le$1]), o(false));
}
function qo$1(e, t, n) {
  if (t.type & 12) {
    let o = e[t.index];
    if (se(o))
      for (let i = W; i < o.length; i++) {
        let s = o[i];
        s[g].type === 2 && Hm$1(s, n);
      }
  }
  let r = t.child;
  for (; r; ) (qo$1(e, r, n), (r = r.next));
}
function Hm$1(e, t) {
  let n = e[Ke$1];
  if (n && n.leave)
    for (let o of n.leave.values())
      for (let i of o.animateFns) {
        let { promise: s } = i();
        t.push(s);
      }
  let r = e[g].firstChild;
  for (; r; ) (qo$1(e, r, t), (r = r.next));
}
function Bm$1(e, t, n) {
  t.then(() => {
    (e[Ke$1]?.running === t && ((e[Ke$1].running = void 0), qn$1.delete(e[Le$1])), n(true));
  });
}
function nn$1(e, t, n, r, o, i, s, a) {
  if (o != null) {
    let c,
      l = false;
    se(o) ? (c = o) : Fe$1(o) && ((l = true), (o = o[fe$2]));
    let u = ae(o);
    (e === 0 && r !== null
      ? (nu$1(a, r, i, n), s == null ? nd$1(t, r, u) : bo$1(t, r, u, s || null, true))
      : e === 1 && r !== null
        ? (nu$1(a, r, i, n), bo$1(t, r, u, s || null, true), Om$1(i, u))
        : e === 2
          ? (a?.[Ke$1]?.leave?.has(i.index) && Pm$1(i, u),
            Bn$1.delete(u),
            ru$1(a, i, n, (d) => {
              if (Bn$1.has(u)) {
                Bn$1.delete(u);
                return;
              }
              cm$1(t, u, l, d);
            }))
          : e === 3 &&
            (Bn$1.delete(u),
            ru$1(a, i, n, () => {
              t.destroyNode(u);
            })),
      c != null && Km$1(t, e, n, c, i, r, s));
  }
}
function $m$1(e, t) {
  (gd$1(e, t), (t[fe$2] = null), (t[z$1] = null));
}
function Um$1(e, t, n, r, o, i) {
  ((r[fe$2] = o), (r[z$1] = t), Go$1(e, r, n, 1, o, i));
}
function gd$1(e, t) {
  (t[pe$1].changeDetectionScheduler?.notify(9), Go$1(e, t, t[R$2], 2, null, null));
}
function Wm$1(e) {
  let t = e[Kt$1];
  if (!t) return Ns$1(e[g], e);
  for (; t; ) {
    let n = null;
    if (Fe$1(t)) n = t[Kt$1];
    else {
      let r = t[W];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[ie] && t !== e; ) (Fe$1(t) && Ns$1(t[g], t), (t = t[H$1]));
      (t === null && (t = e), Fe$1(t) && Ns$1(t[g], t), (n = t && t[ie]));
    }
    t = n;
  }
}
function Da(e, t) {
  let n = e[Ct$1],
    r = n.indexOf(t);
  n.splice(r, 1);
}
function Ta(e, t) {
  if (bt$1(t)) return;
  let n = t[R$2];
  (n.destroyNode && Go$1(e, t, n, 3, null, null), Wm$1(t));
}
function Ns$1(e, t) {
  if (bt$1(t)) return;
  let n = y$1(null);
  try {
    ((t[v$1] &= -129),
      (t[v$1] |= 256),
      t[te] && qe$1(t[te]),
      Gm$1(e, t),
      qm$1(e, t),
      t[g].type === 1 && t[R$2].destroy());
    let r = t[Ye$1];
    if (r !== null && se(t[H$1])) {
      r !== t[H$1] && Da(r, t);
      let o = t[we];
      o !== null && o.detachView(e);
    }
    js$1(t);
  } finally {
    y$1(n);
  }
}
function qm$1(e, t) {
  let n = e.cleanup,
    r = t[Yt$1];
  if (n !== null)
    for (let s = 0; s < n.length - 1; s += 2)
      if (typeof n[s] == 'string') {
        let a = n[s + 3];
        (a >= 0 ? r[a]() : r[-a].unsubscribe(), (s += 2));
      } else {
        let a = r[n[s + 1]];
        n[s].call(a);
      }
  r !== null && (t[Yt$1] = null);
  let o = t[ke$1];
  if (o !== null) {
    t[ke$1] = null;
    for (let s = 0; s < o.length; s++) {
      let a = o[s];
      a();
    }
  }
  let i = t[ze$1];
  if (i !== null) {
    t[ze$1] = null;
    for (let s of i) s.destroy();
  }
}
function Gm$1(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r]];
      if (!(o instanceof Nt)) {
        let i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              c = i[s + 1];
            k(M$1.LifecycleHookStart, a, c);
            try {
              c.call(a);
            } finally {
              k(M$1.LifecycleHookEnd, a, c);
            }
          }
        else {
          k(M$1.LifecycleHookStart, o, i);
          try {
            i.call(o);
          } finally {
            k(M$1.LifecycleHookEnd, o, i);
          }
        }
      }
    }
}
function md(e, t, n) {
  return zm$1(e, t.parent, n);
}
function zm$1(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 168; ) ((t = r), (r = t.parent));
  if (r === null) return n[fe$2];
  if (je(r)) {
    let { encapsulation: o } = e.data[r.directiveStart + r.componentOffset];
    if (o === St$1.None || o === St$1.Emulated) return null;
  }
  return ce(r, n);
}
function yd$1(e, t, n) {
  return Zm$1(e, t, n);
}
function Qm$1(e, t, n) {
  return e.type & 40 ? ce(e, n) : null;
}
var Zm$1 = Qm$1;
function wa(e, t, n, r) {
  let o = md(e, r, t),
    i = t[R$2],
    s = r.parent || t[z$1],
    a = yd$1(s, r, t);
  if (o != null)
    if (Array.isArray(n)) for (let c = 0; c < n.length; c++) Xl$1(i, o, n[c], a, false);
    else Xl$1(i, o, n, a, false);
}
function $n$1(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return ce(t, e);
    if (n & 4) return Ys$1(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return $n$1(e, r);
      {
        let o = e[t.index];
        return se(o) ? Ys$1(-1, o) : ae(o);
      }
    } else {
      if (n & 128) return $n$1(e, t.next);
      if (n & 32) return va(t, e)() || ae(e[t.index]);
      {
        let r = vd$1(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = Re$1(e[Y]);
          return $n$1(o, r);
        } else return $n$1(e, t.next);
      }
    }
  }
  return null;
}
function vd$1(e, t) {
  if (t !== null) {
    let r = e[Y][z$1],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function Ys$1(e, t) {
  let n = W + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[g].firstChild;
    if (o !== null) return $n$1(r, o);
  }
  return t[Je$1];
}
function Ca(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    let a = r[Pe$1];
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let c = r[n.index],
      l = n.type;
    if ((s && t === 0 && (c && an$1(ae(c), r), (n.flags |= 2)), !Ho$1(n)))
      if (l & 8) (Ca(e, t, n.child, r, o, i, false), nn$1(t, e, a, o, c, n, i, r));
      else if (l & 32) {
        let u = va(n, r),
          d;
        for (; (d = u()); ) nn$1(t, e, a, o, d, n, i, r);
        nn$1(t, e, a, o, c, n, i, r);
      } else l & 16 ? Ed$1(e, t, r, n, o, i) : nn$1(t, e, a, o, c, n, i, r);
    n = s ? n.projectionNext : n.next;
  }
}
function Go$1(e, t, n, r, o, i) {
  Ca(n, r, e.firstChild, t, o, i, false);
}
function Ym$1(e, t, n) {
  let r = t[R$2],
    o = md(e, n, t),
    i = n.parent || t[z$1],
    s = yd$1(i, n, t);
  Ed$1(r, 0, t, n, o, s);
}
function Ed$1(e, t, n, r, o, i) {
  let s = n[Y],
    c = s[z$1].projection[r.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      let u = c[l];
      nn$1(t, e, n[Pe$1], o, u, r, i, n);
    }
  else {
    let l = c,
      u = s[H$1];
    (ju$1(r) && (l.flags |= 128), Ca(e, t, l, u, o, i, true));
  }
}
function Km$1(e, t, n, r, o, i, s) {
  let a = r[Je$1],
    c = ae(r);
  a !== c && nn$1(t, e, n, i, a, o, s);
  for (let l = W; l < r.length; l++) {
    let u = r[l];
    Go$1(u[g], u, e, t, i, a);
  }
}
function Jm$1(e, t, n, r, o) {
  o ? e.addClass(n, r) : e.removeClass(n, r);
}
function Id$1(e, t, n, r, o) {
  let i = et(),
    s = r & 2;
  try {
    (tt(-1), s && t.length > F && dd$1(e, t, F, !1));
    let a = s ? M$1.TemplateUpdateStart : M$1.TemplateCreateStart;
    (k(a, o, n), n(r, o));
  } finally {
    tt(i);
    let a = s ? M$1.TemplateUpdateEnd : M$1.TemplateCreateEnd;
    k(a, o, n);
  }
}
function ba(e, t, n) {
  (oy(e, t, n), (n.flags & 64) === 64 && iy(e, t, n));
}
function zo$1(e, t, n = ce) {
  let r = t.localNames;
  if (r !== null) {
    let o = t.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      let s = r[i + 1],
        a = s === -1 ? n(t, e) : e[s];
      e[o++] = a;
    }
  }
}
function Xm$1(e, t, n, r) {
  let i = r.get(qu$1, Wu$1) || n === St$1.ShadowDom || n === St$1.ExperimentalIsolatedShadowDom,
    s = e.selectRootElement(t, i);
  if (s.tagName.toLowerCase() === 'script') throw new C(905, false);
  return s;
}
function ny(e) {
  return e === 'class'
    ? 'className'
    : e === 'for'
      ? 'htmlFor'
      : e === 'formaction'
        ? 'formAction'
        : e === 'innerHtml'
          ? 'innerHTML'
          : e === 'readonly'
            ? 'readOnly'
            : e === 'tabindex'
              ? 'tabIndex'
              : e;
}
function Dd$1(e, t, n, r, o, i) {
  let s = t[g];
  if (_a(e, s, t, n, r)) {
    je(e) && ry(t, e.index);
    return;
  }
  (e.type & 3 && (n = ny(n)), Td$1(e, t, n, r, o, i));
}
function Td$1(e, t, n, r, o, i) {
  if (e.type & 3) {
    let s = ce(e, t);
    ((r = i != null ? i(r, e.value || '', n) : r), o.setProperty(s, n, r));
  } else e.type & 12;
}
function ry(e, t) {
  let n = le(t, e);
  n[v$1] & 16 || (n[v$1] |= 64);
}
function oy(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd;
  (je(n) && Am$1(t, n, e.data[r + n.componentOffset]), e.firstCreatePass || wo$1(n, t));
  let i = n.initialInputs;
  for (let s = r; s < o; s++) {
    let a = e.data[s],
      c = Wn$1(t, e, s, n);
    if ((an$1(c, t), i !== null && ly(t, s - r, c, a, n, i), Ce$2(a))) {
      let l = le(n.index, t);
      l[U] = Wn$1(t, e, s, n);
    }
  }
}
function iy(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = Cl$1();
  try {
    tt(i);
    for (let a = r; a < o; a++) {
      let c = e.data[a],
        l = t[a];
      (to$1(a), (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) && sy(c, l));
    }
  } finally {
    (tt(-1), to$1(s));
  }
}
function sy(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function wd$1(e, t) {
  let n = e.directiveRegistry,
    r = null;
  if (n)
    for (let o = 0; o < n.length; o++) {
      let i = n[o];
      cd$1(t, i.selectors, false) && ((r ??= []), Ce$2(i) ? r.unshift(i) : r.push(i));
    }
  return r;
}
function ay(e, t, n, r, o, i) {
  let s = ce(e, t);
  cy(t[R$2], s, i, e.value, n, r, o);
}
function cy(e, t, n, r, o, i, s) {
  if (i == null) e.removeAttribute(t, o, n);
  else {
    let a = s == null ? xn(i) : s(i, r || '', o);
    e.setAttribute(t, o, a, n);
  }
}
function ly(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; a += 2) {
      let c = s[a],
        l = s[a + 1];
      xt(r, n, c, l);
    }
}
function Cd$1(e, t, n, r, o) {
  let i = F + n,
    s = t[g],
    a = o(s, t, e, r, n);
  ((t[i] = a), Xt$1(e, true));
  let c = e.type === 2;
  return (
    c ? (rd$1(t[R$2], a, e), (hl$1() === 0 || On(e)) && an$1(a, t), gl$1()) : an$1(a, t),
    io$1() && (!c || !Ho$1(e)) && wa(s, t, a, e),
    e
  );
}
function bd$1(e) {
  let t = e;
  return (fs() ? ps() : ((t = t.parent), Xt$1(t, false)), t);
}
function uy(e, t) {
  let n = e[Pe$1];
  if (!n) return;
  let r;
  try {
    r = n.get(nt, null);
  } catch {
    r = null;
  }
  r?.(t);
}
function _a(e, t, n, r, o) {
  let i = e.inputs?.[r],
    s = e.hostDirectiveInputs?.[r],
    a = false;
  if (s)
    for (let c = 0; c < s.length; c += 2) {
      let l = s[c],
        u = s[c + 1],
        d = t.data[l];
      (xt(d, n[l], u, o), (a = true));
    }
  if (i)
    for (let c of i) {
      let l = n[c],
        u = t.data[c];
      (xt(u, l, r, o), (a = true));
    }
  return a;
}
function dy(e, t, n, r, o, i) {
  let s = null,
    a = null,
    c = null,
    l = false,
    u = e.directiveToIndex.get(r.type);
  if (
    (typeof u == 'number' ? (s = u) : ([s, a, c] = u),
    a !== null && c !== null && e.hostDirectiveInputs?.hasOwnProperty(o))
  ) {
    let d = e.hostDirectiveInputs[o];
    for (let p = 0; p < d.length; p += 2) {
      let f = d[p];
      if (f >= a && f <= c) {
        let h = t.data[f],
          m = d[p + 1];
        (xt(h, n[f], m, i), (l = true));
      } else if (f > c) break;
    }
  }
  return (s !== null && r.inputs.hasOwnProperty(o) && (xt(r, n[s], o, i), (l = true)), l);
}
function fy(e, t) {
  let n = le(t, e),
    r = n[g];
  py(r, n);
  let o = n[fe$2];
  (o !== null && n[Zt$1] === null && (n[Zt$1] = Gu$1(o, n[Pe$1])), k(M$1.ComponentStart));
  try {
    Ma(r, n, n[U]);
  } finally {
    k(M$1.ComponentEnd, n[U]);
  }
}
function py(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function Ma(e, t, n) {
  ro$1(t);
  try {
    let r = e.viewQuery;
    r !== null && Hs$1(1, r, n);
    let o = e.template;
    (o !== null && Id$1(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[we]?.finishViewCreation(e),
      e.staticContentQueries && zu$1(e, t),
      e.staticViewQueries && Hs$1(2, e.viewQuery, n));
    let i = e.components;
    i !== null && hy(t, i);
  } catch (r) {
    throw (e.firstCreatePass && ((e.incompleteFirstPass = true), (e.firstCreatePass = false)), r);
  } finally {
    ((t[v$1] &= -5), oo$1());
  }
}
function hy(e, t) {
  for (let n = 0; n < t.length; n++) fy(e, t[n]);
}
function Na(e, t, n, r) {
  let o = y$1(null);
  try {
    let i = t.tView,
      a = e[v$1] & 4096 ? 4096 : 16,
      c = ma(
        e,
        i,
        n,
        a,
        null,
        t,
        null,
        null,
        r?.injector ?? null,
        r?.embeddedViewInjector ?? null,
        r?.dehydratedView ?? null,
      ),
      l = e[t.index];
    c[Ye$1] = l;
    let u = e[we];
    return (u !== null && (c[we] = u.createEmbeddedView(i)), Ma(i, c, n), c);
  } finally {
    y$1(o);
  }
}
function No$1(e, t) {
  return !t || t.firstChild === null || ju$1(e);
}
function Gn$1(e, t, n, r, o = false) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = o ? n.projectionNext : n.next;
      continue;
    }
    let i = t[n.index];
    (i !== null && r.push(ae(i)), se(i) && _d$1(i, r));
    let s = n.type;
    if (s & 8) Gn$1(e, t, n.child, r);
    else if (s & 32) {
      let a = va(n, t),
        c;
      for (; (c = a()); ) r.push(c);
    } else if (s & 16) {
      let a = vd$1(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let c = Re$1(t[Y]);
        Gn$1(c[g], c, a, r, true);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function _d$1(e, t) {
  for (let n = W; n < e.length; n++) {
    let r = e[n],
      o = r[g].firstChild;
    o !== null && Gn$1(r[g], r, o, t);
  }
  e[Je$1] !== e[fe$2] && t.push(e[Je$1]);
}
function Md$1(e) {
  if (e[wt$1] !== null) {
    for (let t of e[wt$1]) t.impl.addSequence(t);
    e[wt$1].length = 0;
  }
}
var Nd$1 = [];
function gy(e) {
  return e[te] ?? my(e);
}
function my(e) {
  let t = Nd$1.pop() ?? Object.create(vy);
  return ((t.lView = e), t);
}
function yy(e) {
  e.lView[te] !== e && ((e.lView = null), Nd$1.push(e));
}
var vy = V(j$1({}, $e$1), {
  consumerIsAlwaysLive: true,
  kind: 'template',
  consumerMarkedDirty: (e) => {
    _t$1(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[te] = this;
  },
});
function Ey(e) {
  let t = e[te] ?? Object.create(Iy);
  return ((t.lView = e), t);
}
var Iy = V(j$1({}, $e$1), {
  consumerIsAlwaysLive: true,
  kind: 'template',
  consumerMarkedDirty: (e) => {
    let t = Re$1(e.lView);
    for (; t && !Sd$1(t[g]); ) t = Re$1(t);
    t && rs$1(t);
  },
  consumerOnSignalRead() {
    this.lView[te] = this;
  },
});
function Sd$1(e) {
  return e.type !== 2;
}
function xd$1(e) {
  if (e[ze$1] === null) return;
  let t = true;
  for (; t; ) {
    let n = false;
    for (let r of e[ze$1])
      r.dirty &&
        ((n = true),
        r.zone === null || Zone.current === r.zone ? r.run() : r.zone.run(() => r.run()));
    t = n && !!(e[v$1] & 8192);
  }
}
var Dy = 100;
function Ad$1(e, t = 0) {
  let r = e[pe$1].rendererFactory;
  r.begin?.();
  try {
    Ty(e, t);
  } finally {
    r.end?.();
  }
}
function Ty(e, t) {
  let n = hs();
  try {
    (bn$1(!0), Ks$1(e, t));
    let r = 0;
    for (; Pn$1(e); ) {
      if (r === Dy) throw new C(103, !1);
      (r++, Ks$1(e, 1));
    }
  } finally {
    bn$1(n);
  }
}
function wy(e, t, n, r) {
  if (bt$1(t)) return;
  let o = t[v$1],
    i = false,
    s = false;
  ro$1(t);
  let a = true,
    c = null,
    l = null;
  Sd$1(e)
    ? ((l = gy(t)), (c = Se$1(l)))
    : ir$1() === null
      ? ((a = false), (l = Ey(t)), (c = Se$1(l)))
      : t[te] && (qe$1(t[te]), (t[te] = null));
  try {
    (ns$1(t), Dl$1(e.bindingStartIndex), n !== null && Id$1(e, t, n, 2, r));
    let u = (o & 3) === 3;
    if (!i)
      if (u) {
        let f = e.preOrderCheckHooks;
        f !== null && mo$1(t, f, null);
      } else {
        let f = e.preOrderHooks;
        (f !== null && yo$1(t, f, 0, null), _s(t, 0));
      }
    if ((s || Cy(t), xd$1(t), kd$1(t, 0), e.contentQueries !== null && zu$1(e, t), !i))
      if (u) {
        let f = e.contentCheckHooks;
        f !== null && mo$1(t, f);
      } else {
        let f = e.contentHooks;
        (f !== null && yo$1(t, f, 1), _s(t, 1));
      }
    _y(e, t);
    let d = e.components;
    d !== null && Od$1(t, d, 0);
    let p = e.viewQuery;
    if ((p !== null && Hs$1(2, p, r), !i))
      if (u) {
        let f = e.viewCheckHooks;
        f !== null && mo$1(t, f);
      } else {
        let f = e.viewHooks;
        (f !== null && yo$1(t, f, 2), _s(t, 2));
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Yr$1])) {
      for (let f of t[Yr$1]) f();
      t[Yr$1] = null;
    }
    i || (Md$1(t), (t[v$1] &= -73));
  } catch (u) {
    throw (_t$1(t), u);
  } finally {
    (l !== null && (We$1(l, c), a && yy(l)), oo$1());
  }
}
function kd$1(e, t) {
  for (let n = Hu$1(e); n !== null; n = Bu$1(n))
    for (let r = W; r < n.length; r++) {
      let o = n[r];
      Rd$1(o, t);
    }
}
function Cy(e) {
  for (let t = Hu$1(e); t !== null; t = Bu$1(t)) {
    if (!(t[v$1] & 2)) continue;
    let n = t[Ct$1];
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      rs$1(o);
    }
  }
}
function by(e, t, n) {
  k(M$1.ComponentStart);
  let r = le(t, e);
  try {
    Rd$1(r, n);
  } finally {
    k(M$1.ComponentEnd, r[U]);
  }
}
function Rd$1(e, t) {
  Jr$1(e) && Ks$1(e, t);
}
function Ks$1(e, t) {
  let r = e[g],
    o = e[v$1],
    i = e[te],
    s = !!(t === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && t === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && Pt(i))),
    (s ||= false),
    i && (i.dirty = false),
    (e[v$1] &= -9217),
    s)
  )
    wy(r, e, r.template, e[U]);
  else if (o & 8192) {
    let a = y$1(null);
    try {
      (xd$1(e), kd$1(e, 1));
      let c = r.components;
      (c !== null && Od$1(e, c, 1), Md$1(e));
    } finally {
      y$1(a);
    }
  }
}
function Od$1(e, t, n) {
  for (let r = 0; r < t.length; r++) by(e, t[r], n);
}
function _y(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) tt(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          wl$1(s, i);
          let c = t[i];
          k(M$1.HostBindingsUpdateStart, c);
          try {
            a(2, c);
          } finally {
            k(M$1.HostBindingsUpdateEnd, c);
          }
        }
      }
    } finally {
      tt(-1);
    }
}
function Sa(e, t) {
  let n = hs() ? 64 : 1088;
  for (e[pe$1].changeDetectionScheduler?.notify(t); e; ) {
    e[v$1] |= n;
    let r = Re$1(e);
    if (Jt$1(e) && !r) return e;
    e = r;
  }
  return null;
}
function Pd$1(e, t, n, r) {
  return [e, true, 0, t, null, r, null, n, null, null];
}
function My(e, t) {
  let n = W + t;
  if (n < e.length) return e[n];
}
function xa(e, t, n, r = true) {
  let o = t[g];
  if ((Sy(o, t, e, n), r)) {
    let s = Ys$1(n, e),
      a = t[R$2],
      c = a.parentNode(e[Je$1]);
    c !== null && Um$1(o, e[z$1], a, t, c, s);
  }
  let i = t[Zt$1];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function Ny(e, t) {
  let n = So$1(e, t);
  return (n !== void 0 && Ta(n[g], n), n);
}
function So$1(e, t) {
  if (e.length <= W) return;
  let n = W + t,
    r = e[n];
  if (r) {
    let o = r[Ye$1];
    (o !== null && o !== e && Da(o, r), t > 0 && (e[n - 1][ie] = r[ie]));
    let i = An(e, W + t);
    $m$1(r[g], r);
    let s = i[we];
    (s !== null && s.detachView(i[g]), (r[H$1] = null), (r[ie] = null), (r[v$1] &= -129));
  }
  return r;
}
function Sy(e, t, n, r) {
  let o = W + r,
    i = n.length;
  (r > 0 && (n[o - 1][ie] = t),
    r < i - W ? ((t[ie] = n[o]), Gi$1(n, W + r, t)) : (n.push(t), (t[ie] = null)),
    (t[H$1] = n));
  let s = t[Ye$1];
  s !== null && n !== s && Ld$1(s, t);
  let a = t[we];
  (a !== null && a.insertView(e), Xr$1(t), (t[v$1] |= 128));
}
function Ld$1(e, t) {
  let n = e[Ct$1],
    r = t[H$1];
  if (Fe$1(r)) e[v$1] |= 2;
  else {
    let o = r[H$1][Y];
    t[Y] !== o && (e[v$1] |= 2);
  }
  n === null ? (e[Ct$1] = [t]) : n.push(t);
}
var ot$1 = class ot {
  _lView;
  _cdRefInjectingView;
  _appRef = null;
  _attachedToViewContainer = false;
  exhaustive;
  get rootNodes() {
    let t = this._lView,
      n = t[g];
    return Gn$1(n, t, n.firstChild, []);
  }
  constructor(t, n) {
    ((this._lView = t), (this._cdRefInjectingView = n));
  }
  get context() {
    return this._lView[U];
  }
  set context(t) {
    this._lView[U] = t;
  }
  get destroyed() {
    return bt$1(this._lView);
  }
  destroy() {
    if (this._appRef) this._appRef.detachView(this);
    else if (this._attachedToViewContainer) {
      let t = this._lView[H$1];
      if (se(t)) {
        let n = t[Rn],
          r = n ? n.indexOf(this) : -1;
        r > -1 && (So$1(t, r), An(n, r));
      }
      this._attachedToViewContainer = false;
    }
    Ta(this._lView[g], this._lView);
  }
  onDestroy(t) {
    eo$1(this._lView, t);
  }
  markForCheck() {
    Sa(this._cdRefInjectingView || this._lView, 4);
  }
  detach() {
    this._lView[v$1] &= -129;
  }
  reattach() {
    (Xr$1(this._lView), (this._lView[v$1] |= 128));
  }
  detectChanges() {
    ((this._lView[v$1] |= 1024), Ad$1(this._lView));
  }
  checkNoChanges() {}
  attachToViewContainerRef() {
    if (this._appRef) throw new C(902, false);
    this._attachedToViewContainer = true;
  }
  detachFromAppRef() {
    this._appRef = null;
    let t = Jt$1(this._lView),
      n = this._lView[Ye$1];
    (n !== null && !t && Da(n, this._lView), gd$1(this._lView[g], this._lView));
  }
  attachToAppRef(t) {
    if (this._attachedToViewContainer) throw new C(902, false);
    this._appRef = t;
    let n = Jt$1(this._lView),
      r = this._lView[Ye$1];
    (r !== null && !n && Ld$1(r, this._lView), Xr$1(this._lView));
  }
};
var zn$1 = (() => {
  class e {
    _declarationLView;
    _declarationTContainer;
    elementRef;
    static __NG_ELEMENT_ID__ = xy;
    constructor(n, r, o) {
      ((this._declarationLView = n), (this._declarationTContainer = r), (this.elementRef = o));
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(n, r) {
      return this.createEmbeddedViewImpl(n, r);
    }
    createEmbeddedViewImpl(n, r, o) {
      let i = Na(this._declarationLView, this._declarationTContainer, n, {
        embeddedViewInjector: r,
        dehydratedView: o,
      });
      return new ot$1(i);
    }
  }
  return e;
})();
function xy() {
  return Qo$1(B(), I());
}
function Qo$1(e, t) {
  return e.type & 4 ? new zn$1(t, e, un$1(e, t)) : null;
}
function pn$1(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) ((i = Ay(e, t, n, r, o)), Tl$1() && (i.flags |= 32));
  else if (i.type & 64) {
    ((i.type = n), (i.value = r), (i.attrs = o));
    let s = vl$1();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return (Xt$1(i, true), i);
}
function Ay(e, t, n, r, o) {
  let i = ds(),
    s = fs(),
    a = s ? i : i && i.parent,
    c = (e.data[t] = Ry(e, a, n, t, r, o));
  return (ky(e, c, i, s), c);
}
function ky(e, t, n, r) {
  (e.firstChild === null && (e.firstChild = t),
    n !== null &&
      (r
        ? n.child == null && t.parent !== null && (n.child = t)
        : n.next === null && ((n.next = t), (t.prev = n))));
}
function Ry(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    cs$1() && (a |= 128),
    {
      type: n,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      controlDirectiveIndex: -1,
      customControlIndex: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: o,
      namespace: vs(),
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: null,
      inputs: null,
      hostDirectiveInputs: null,
      outputs: null,
      hostDirectiveOutputs: null,
      directiveToIndex: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: t,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
var Oy = () => null,
  Py = () => null;
function Js$1(e, t) {
  return Oy();
}
function Ly(e, t, n) {
  return Py();
}
var Fd$1 = class Fd {},
  Qn$1 = class Qn {},
  Fy = (() => {
    class e {
      destroyNode = null;
      static __NG_ELEMENT_ID__ = () => jy();
    }
    return e;
  })();
function jy() {
  let e = I(),
    t = B(),
    n = le(t.index, e);
  return (Fe$1(n) ? n : e)[R$2];
}
var jd$1 = (() => {
  class e {
    static ɵprov = ee({ token: e, providedIn: 'root', factory: () => null });
  }
  return e;
})();
function Vd$1(e) {
  return e.debugInfo?.className || e.type.name || null;
}
var Eo$1 = {},
  xo$1 = class xo {
    injector;
    parentInjector;
    constructor(t, n) {
      ((this.injector = t), (this.parentInjector = n));
    }
    get(t, n, r) {
      let o = this.injector.get(t, Eo$1, r);
      return o !== Eo$1 || n === Eo$1 ? o : this.parentInjector.get(t, n, r);
    }
  };
function Vy(e, t, n) {
  return (e[t] = n);
}
function Ne$1(e, t, n) {
  if (n === ne) return false;
  let r = e[t];
  return Object.is(r, n) ? false : ((e[t] = n), true);
}
function on$1(e, t, n) {
  return function r(o) {
    let i = r.__ngNativeEl__;
    i !== void 0 && kg(o, i);
    let s = je(e) ? le(e.index, t) : t;
    Sa(s, 5);
    let a = t[U],
      c = iu$1(t, a, n, o),
      l = r.__ngNextListenerFn__;
    for (; l; ) ((c = iu$1(t, a, l, o) && c), (l = l.__ngNextListenerFn__));
    return c;
  };
}
function iu$1(e, t, n, r) {
  let o = y$1(null);
  try {
    return (k(M$1.OutputStart, t, n), n(r) !== !1);
  } catch (i) {
    return (uy(e, i), false);
  } finally {
    (k(M$1.OutputEnd, t, n), y$1(o));
  }
}
function Hd$1(e, t, n, r, o, i, s, a) {
  let c = On(e),
    l = false,
    u = null;
  if ((!r && c && (u = By(t, n, i, e.index)), u !== null)) {
    let d = u.__ngLastListenerFn__ || u;
    ((d.__ngNextListenerFn__ = s), (u.__ngLastListenerFn__ = s), (l = true));
  } else {
    let d = ce(e, n),
      p = r ? r(d) : d;
    r || (a.__ngNativeEl__ = d);
    let f = o.listen(p, i, a);
    if (!Hy(i)) {
      let h = r ? (m) => r(ae(m[e.index])) : e.index;
      Bd$1(h, t, n, i, a, f, false);
    }
  }
  return l;
}
function Hy(e) {
  return e.startsWith('animation') || e.startsWith('transition');
}
function By(e, t, n, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === n && o[i + 1] === r) {
        let a = t[Yt$1],
          c = o[i + 2];
        return a && a.length > c ? a[c] : null;
      }
      typeof s == 'string' && (i += 2);
    }
  return null;
}
function Bd$1(e, t, n, r, o, i, s) {
  let a = t.firstCreatePass ? is$1(t) : null,
    c = os$1(n),
    l = c.length;
  (c.push(o, i), a && a.push(r, e, l, (l + 1) * (s ? -1 : 1)));
}
function su$1(e, t, n, r, o) {
  let i = null,
    s = null,
    a = null,
    c = false,
    l = e.directiveToIndex.get(n.type);
  if (
    (typeof l == 'number' ? (i = l) : ([i, s, a] = l),
    s !== null && a !== null && e.hostDirectiveOutputs?.hasOwnProperty(r))
  ) {
    let u = e.hostDirectiveOutputs[r];
    for (let d = 0; d < u.length; d += 2) {
      let p = u[d];
      if (p >= s && p <= a) ((c = true), Ao$1(e, t, p, u[d + 1], r, o));
      else if (p > a) break;
    }
  }
  return (n.outputs.hasOwnProperty(r) && ((c = true), Ao$1(e, t, i, r, r, o)), c);
}
function Ao$1(e, t, n, r, o, i) {
  let s = t[n],
    a = t[g],
    l = a.data[n].outputs[r],
    d = s[l].subscribe(i);
  Bd$1(e.index, a, t, o, i, d, true);
}
function $y() {
  Uy();
}
function Uy() {
  let e = I(),
    t = P$1(),
    n = B();
  if ((t.firstCreatePass && Gy(t, n), n.controlDirectiveIndex === -1)) return;
  fn$1('NgSignalForms');
  let r = e[n.controlDirectiveIndex];
  t.data[n.controlDirectiveIndex].controlDef.create(r, new ko$1(e, t, n));
}
function Wy() {
  qy();
}
function qy() {
  let e = I(),
    t = P$1(),
    n = en$1();
  if (n.controlDirectiveIndex === -1) return;
  let r = t.data[n.controlDirectiveIndex].controlDef,
    o = e[n.controlDirectiveIndex];
  r.update(o, new ko$1(e, t, n));
}
var ko$1 = class ko {
  lView;
  tView;
  tNode;
  hasPassThrough;
  constructor(t, n, r) {
    ((this.lView = t),
      (this.tView = n),
      (this.tNode = r),
      (this.hasPassThrough = !!(r.flags & 4096)));
  }
  get customControl() {
    return this.tNode.customControlIndex !== -1
      ? this.lView[this.tNode.customControlIndex]
      : void 0;
  }
  get nativeElement() {
    return ce(this.tNode, this.lView);
  }
  get descriptor() {
    return `<${this.tNode.value}>`;
  }
  listenToCustomControlOutput(t, n) {
    let r = this.tView.data[this.tNode.customControlIndex];
    su$1(this.tNode, this.lView, r, t, on$1(this.tNode, this.lView, n));
  }
  listenToCustomControlModel(t) {
    let n = this.tNode.flags & 1024 ? 'valueChange' : 'checkedChange',
      r = this.tView.data[this.tNode.customControlIndex];
    su$1(this.tNode, this.lView, r, n, on$1(this.tNode, this.lView, t));
  }
  listenToDom(t, n) {
    Hd$1(
      this.tNode,
      this.tView,
      this.lView,
      void 0,
      this.lView[R$2],
      t,
      n,
      on$1(this.tNode, this.lView, n),
    );
  }
  setInputOnDirectives(t, n) {
    let r = this.tNode.inputs?.[t],
      o = this.tNode.hostDirectiveInputs?.[t];
    if (!r && !o) return false;
    let i = false;
    if (r)
      for (let s of r) {
        if (s === this.tNode.controlDirectiveIndex) continue;
        let a = this.tView.data[s],
          c = this.lView[s];
        (xt(a, c, t, n), (i = true));
      }
    if (o)
      for (let s = 0; s < o.length; s += 2) {
        let a = o[s];
        if (a === this.tNode.controlDirectiveIndex) continue;
        let c = o[s + 1],
          l = this.tView.data[a],
          u = this.lView[a];
        (xt(l, u, c, n), (i = true));
      }
    return i;
  }
  setCustomControlModelInput(t) {
    let n = this.tView.data[this.tNode.customControlIndex],
      r = this.tNode.flags & 1024 ? 'value' : 'checked';
    dy(this.tNode, this.tView, this.lView, n, r, t);
  }
  customControlHasInput(t) {
    if (this.tNode.customControlIndex === -1) return false;
    let n = this.tView.data[this.tNode.customControlIndex];
    return (n.signalFormsInputPresence ??= this._buildCustomControlInputCache(n))[t] === true;
  }
  _buildCustomControlInputCache(t) {
    let n = {};
    for (let r in t.inputs) n[r] = true;
    if (t.hostDirectives !== null) {
      let r = [...t.hostDirectives];
      for (; r.length > 0; ) {
        let o = r.shift();
        if (typeof o != 'function') {
          for (let s in o.inputs) n[o.inputs[s]] = true;
          let i = au$1(o.directive);
          i !== null && r.push(...i);
          continue;
        }
        for (let i of o()) {
          if (typeof i == 'function') continue;
          if (i.inputs)
            for (let a = 0; a < i.inputs.length; a += 2) {
              let c = i.inputs[a + 1] || i.inputs[a];
              n[c] = true;
            }
          let s = au$1(i.directive);
          s !== null && r.push(...s);
        }
      }
    }
    return n;
  }
};
function au$1(e) {
  return typeof e == 'function' && '\u0275dir' in e ? (e.ɵdir.hostDirectives ?? null) : null;
}
function Gy(e, t, n) {
  for (let o = t.directiveStart; o < t.directiveEnd; o++)
    if (e.data[o].controlDef) {
      t.controlDirectiveIndex = o;
      break;
    }
  if (t.controlDirectiveIndex === -1) return;
  let r = e.data[t.controlDirectiveIndex].controlDef;
  if (r.passThroughInput && (t.inputs?.[r.passThroughInput]?.length ?? 0) > 1) {
    t.flags |= 4096;
    return;
  }
  zy(e, t);
}
function zy(e, t) {
  for (let n = t.directiveStart; n < t.directiveEnd; n++) {
    let r = e.data[n];
    if (!(t.directiveToIndex && !t.directiveToIndex.has(r.type))) {
      if (cu$1(r, 'value')) {
        ((t.flags |= 1024), (t.customControlIndex = n));
        return;
      }
      if (cu$1(r, 'checked')) {
        ((t.flags |= 2048), (t.customControlIndex = n));
        return;
      }
    }
  }
  if (
    t.hostDirectiveInputs !== null &&
    t.hostDirectiveOutputs !== null &&
    t.directiveToIndex !== null
  ) {
    let n = (r, o) => {
      let i = t.hostDirectiveInputs[r],
        s = t.hostDirectiveOutputs[r + 'Change'];
      if (!i || !s) return false;
      for (let a = 0; a < i.length; a += 2) {
        let c = i[a];
        for (let l = 0; l < s.length; l += 2) {
          let u = s[l];
          if (c === u)
            for (let d of t.directiveToIndex.values()) {
              if (!Array.isArray(d)) continue;
              let [p, f, h] = d;
              if (c >= f && c <= h) return ((t.flags |= o), (t.customControlIndex = p), true);
            }
        }
      }
      return false;
    };
    if (n('value', 1024) || n('checked', 2048)) return;
  }
}
function cu$1(e, t) {
  return Qy(e, t) && Zy(e, t + 'Change');
}
function Qy(e, t) {
  return t in e.inputs;
}
function Zy(e, t) {
  return t in e.outputs;
}
var Xs$1 = Symbol('BINDING');
var $d$1 = new N('');
function Ro$1(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == 'number') i = a;
      else if (i == 1) o = Hr(o, a);
      else if (i == 2) {
        let c = a,
          l = t[++s];
        r = Hr(r, c + ': ' + l + ';');
      }
    }
  (n ? (e.styles = r) : (e.stylesWithoutHost = r),
    n ? (e.classes = o) : (e.classesWithoutHost = o));
}
function Zo$1(e, t = 0) {
  let n = I();
  if (n === null) return Ie(e, t);
  let r = B();
  return Ru$1(r, n, $$1(e), t);
}
function Yy() {
  let e = 'invalid';
  throw new Error(e);
}
function Ud$1(e, t, n, r, o) {
  let i = r === null ? null : { '': -1 },
    s = o(e, n);
  if (s !== null) {
    let a = s,
      c = null,
      l = null;
    for (let u of s)
      if (u.resolveHostDirectives !== null) {
        [a, c, l] = u.resolveHostDirectives(s);
        break;
      }
    Xy(e, t, n, a, i, c, l);
  }
  i !== null && r !== null && Ky(n, r, i);
}
function Ky(e, t, n) {
  let r = (e.localNames = []);
  for (let o = 0; o < t.length; o += 2) {
    let i = n[t[o + 1]];
    if (i == null) throw new C(-301, false);
    r.push(t[o], i);
  }
}
function Jy(e, t, n) {
  ((t.componentOffset = n), (e.components ??= []).push(t.index));
}
function Xy(e, t, n, r, o, i, s) {
  let a = r.length,
    c = null;
  for (let p = 0; p < a; p++) {
    let f = r[p];
    (c === null && Ce$2(f) && ((c = f), Jy(e, n, p)), Ls$1(wo$1(n, t), e, f.type));
  }
  (iv(n, e.data.length, a), c?.viewProvidersResolver && c.viewProvidersResolver(c));
  for (let p = 0; p < a; p++) {
    let f = r[p];
    f.providersResolver && f.providersResolver(f);
  }
  let l = false,
    u = false,
    d = ud$1(e, t, a, null);
  a > 0 && (n.directiveToIndex = new Map());
  for (let p = 0; p < a; p++) {
    let f = r[p];
    if (
      ((n.mergedAttrs = sn$1(n.mergedAttrs, f.hostAttrs)),
      tv(e, n, t, d, f),
      ov(d, f, o),
      s !== null && s.has(f))
    ) {
      let [m, _] = s.get(f);
      n.directiveToIndex.set(f.type, [d, m + n.directiveStart, _ + n.directiveStart]);
    } else (i === null || !i.has(f)) && n.directiveToIndex.set(f.type, d);
    (f.contentQueries !== null && (n.flags |= 4),
      (f.hostBindings !== null || f.hostAttrs !== null || f.hostVars !== 0) && (n.flags |= 64));
    let h = f.type.prototype;
    (!l &&
      (h.ngOnChanges || h.ngOnInit || h.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(n.index), (l = true)),
      !u &&
        (h.ngOnChanges || h.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(n.index), (u = true)),
      d++);
  }
  ev(e, n, i);
}
function ev(e, t, n) {
  for (let r = t.directiveStart; r < t.directiveEnd; r++) {
    let o = e.data[r];
    if (n === null || !n.has(o)) (lu$1(0, t, o, r), lu$1(1, t, o, r), du$1(t, r, false));
    else {
      let i = n.get(o);
      (uu$1(0, t, i, r), uu$1(1, t, i, r), du$1(t, r, true));
    }
  }
}
function lu$1(e, t, n, r) {
  let o = e === 0 ? n.inputs : n.outputs;
  for (let i in o)
    if (o.hasOwnProperty(i)) {
      let s;
      (e === 0 ? (s = t.inputs ??= {}) : (s = t.outputs ??= {}),
        (s[i] ??= []),
        s[i].push(r),
        Wd$1(t, i));
    }
}
function uu$1(e, t, n, r) {
  let o = e === 0 ? n.inputs : n.outputs;
  for (let i in o)
    if (o.hasOwnProperty(i)) {
      let s = o[i],
        a;
      (e === 0 ? (a = t.hostDirectiveInputs ??= {}) : (a = t.hostDirectiveOutputs ??= {}),
        (a[s] ??= []),
        a[s].push(r, i),
        Wd$1(t, s));
    }
}
function Wd$1(e, t) {
  t === 'class' ? (e.flags |= 8) : t === 'style' && (e.flags |= 16);
}
function du$1(e, t, n) {
  let { attrs: r, inputs: o, hostDirectiveInputs: i } = e;
  if (r === null || (!n && o === null) || (n && i === null) || ha(e)) {
    ((e.initialInputs ??= []), e.initialInputs.push(null));
    return;
  }
  let s = null,
    a = 0;
  for (; a < r.length; ) {
    let c = r[a];
    if (c === 0) {
      a += 4;
      continue;
    } else if (c === 5) {
      a += 2;
      continue;
    } else if (typeof c == 'number') break;
    if (!n && o.hasOwnProperty(c)) {
      let l = o[c];
      for (let u of l)
        if (u === t) {
          ((s ??= []), s.push(c, r[a + 1]));
          break;
        }
    } else if (n && i.hasOwnProperty(c)) {
      let l = i[c];
      for (let u = 0; u < l.length; u += 2)
        if (l[u] === t) {
          ((s ??= []), s.push(l[u + 1], r[a + 1]));
          break;
        }
    }
    a += 2;
  }
  ((e.initialInputs ??= []), e.initialInputs.push(s));
}
function tv(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = yt$1(o.type)),
    s = new Nt(i, Ce$2(o), Zo$1, null);
  ((e.blueprint[r] = s), (n[r] = s), nv(e, t, r, ud$1(e, n, o.hostVars, ne), o));
}
function nv(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    (rv(s) != a && s.push(a), s.push(n, r, i));
  }
}
function rv(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == 'number' && n < 0) return n;
  }
  return 0;
}
function ov(e, t, n) {
  if (n) {
    if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    Ce$2(t) && (n[''] = e);
  }
}
function iv(e, t, n) {
  ((e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t));
}
function qd(e, t, n, r, o, i, s, a) {
  let c = t[g],
    l = c.consts,
    u = be$1(l, s),
    d = pn$1(c, e, n, r, u);
  return (
    Ud$1(c, t, d, be$1(l, a), o),
    (d.mergedAttrs = sn$1(d.mergedAttrs, d.attrs)),
    d.attrs !== null && Ro$1(d, d.attrs, false),
    d.mergedAttrs !== null && Ro$1(d, d.mergedAttrs, true),
    c.queries !== null && c.queries.elementStart(c, d),
    d
  );
}
function Gd(e, t) {
  (Cu$1(e, t), es$1(t) && e.queries.elementEnd(t));
}
function sv(e, t, n, r, o, i) {
  let s = t.consts,
    a = be$1(s, o),
    c = pn$1(t, e, n, r, a);
  if (((c.mergedAttrs = sn$1(c.mergedAttrs, c.attrs)), i != null)) {
    let l = be$1(s, i);
    c.localNames = [];
    for (let u = 0; u < l.length; u += 2) c.localNames.push(l[u], -1);
  }
  return (
    c.attrs !== null && Ro$1(c, c.attrs, false),
    c.mergedAttrs !== null && Ro$1(c, c.mergedAttrs, true),
    t.queries !== null && t.queries.elementStart(t, c),
    c
  );
}
var zd$1 = typeof ShadowRoot < 'u',
  av = typeof Document < 'u';
function cv(e) {
  return Object.keys(e).map((t) => {
    let [n, r, o] = e[t],
      i = { propName: n, templateName: t, isSignal: (r & Uo$1.SignalBased) !== 0 };
    return (o && (i.transform = o), i);
  });
}
function lv(e) {
  return Object.keys(e).map((t) => ({ propName: e[t], templateName: t }));
}
function uv(e, t, n) {
  let r = t instanceof oe$1 ? t : t?.injector;
  return (
    r && e.getStandaloneInjector !== null && (r = e.getStandaloneInjector(r) || r),
    r ? new xo$1(n, r) : n
  );
}
function dv(e) {
  let t = e.get(Qn$1, null);
  if (t === null) throw new C(407, false);
  let n = e.get(jd$1, null),
    r = e.get(Te, null),
    o = e.get(dn$1, null, { optional: true });
  return {
    rendererFactory: t,
    sanitizer: n,
    changeDetectionScheduler: r,
    ngReflect: false,
    tracingService: o,
  };
}
function fv(e, t) {
  let n = Qd$1(e);
  return td$1(t, n, n === 'svg' ? sl$1 : n === 'math' ? al$1 : null);
}
function Qd$1(e) {
  return (e.selectors[0][0] || 'div').toLowerCase();
}
var At$1 = class At {
  componentDef;
  ngModule;
  selector;
  componentType;
  ngContentSelectors;
  isBoundToModule;
  cachedInputs = null;
  cachedOutputs = null;
  get inputs() {
    return ((this.cachedInputs ??= cv(this.componentDef.inputs)), this.cachedInputs);
  }
  get outputs() {
    return ((this.cachedOutputs ??= lv(this.componentDef.outputs)), this.cachedOutputs);
  }
  constructor(t, n) {
    ((this.componentDef = t),
      (this.ngModule = n),
      (this.componentType = t.type),
      (this.selector = Mm$1(t.selectors)),
      (this.ngContentSelectors = t.ngContentSelectors ?? []),
      (this.isBoundToModule = !!n));
  }
  create(t, n, r, o, i, s) {
    k(M$1.DynamicComponentStart);
    let a = y$1(null);
    try {
      let c = this.componentDef,
        l = uv(c, o || this.ngModule, t),
        u = dv(l),
        d = u.tracingService;
      return d && d.componentCreate
        ? d.componentCreate(Vd$1(c), () => this.createComponentRef(u, l, n, r, i, s))
        : this.createComponentRef(u, l, n, r, i, s);
    } finally {
      y$1(a);
    }
  }
  createComponentRef(t, n, r, o, i, s) {
    let a = this.componentDef,
      c = pv(o, a, s, i),
      l = t.rendererFactory.createRenderer(null, a),
      u = o ? Xm$1(l, o, a.encapsulation, n) : fv(a, l),
      d = n.get($d$1, null),
      p = hv(u, () => n.get(tn$1, null) ?? Uu$1());
    d && d.addHost(p);
    let f = s?.some(fu$1) || i?.some((_) => typeof _ != 'function' && _.bindings.some(fu$1)),
      h = ma(null, c, null, 512 | ld$1(a), null, null, t, l, n, null, Gu$1(u, n, true));
    (d &&
      zd$1 &&
      p instanceof ShadowRoot &&
      eo$1(h, () => {
        d.removeHost(p);
      }),
      (h[F] = u),
      ro$1(h));
    let m = null;
    try {
      let _ = qd(F, h, 2, '#host', () => c.directiveRegistry, !0, 0);
      (rd$1(l, u, _),
        an$1(u, h),
        ba(c, h, _),
        Qu$1(c, _, h),
        Gd(c, _),
        r !== void 0 && mv(_, this.ngContentSelectors, r),
        (m = le(_.index, h)),
        (h[U] = m[U]),
        Ma(c, h, null));
    } catch (_) {
      throw (m !== null && js$1(m), js$1(h), _);
    } finally {
      (k(M$1.DynamicComponentEnd), oo$1());
    }
    return new Oo$1(this.componentType, h, !!f);
  }
};
function pv(e, t, n, r) {
  let o = e ? ['ng-version', '22.0.0'] : Nm$1(t.selectors[0]),
    i = null,
    s = null,
    a = 0;
  if (n)
    for (let u of n)
      ((a += u[Xs$1].requiredVars),
        u.create && ((u.targetIdx = 0), (i ??= []).push(u)),
        u.update && ((u.targetIdx = 0), (s ??= []).push(u)));
  if (r)
    for (let u = 0; u < r.length; u++) {
      let d = r[u];
      if (typeof d != 'function')
        for (let p of d.bindings) {
          a += p[Xs$1].requiredVars;
          let f = u + 1;
          (p.create && ((p.targetIdx = f), (i ??= []).push(p)),
            p.update && ((p.targetIdx = f), (s ??= []).push(p)));
        }
    }
  let c = [t];
  if (r)
    for (let u of r) {
      let d = typeof u == 'function' ? u : u.type,
        p = Ui$1(d);
      c.push(p);
    }
  return ga(0, null, gv(i, s), 1, a, c, null, null, null, [o], null);
}
function hv(e, t) {
  let n = e.getRootNode?.();
  return av && n instanceof Document ? n.head : n && zd$1 && n instanceof ShadowRoot ? n : t().head;
}
function gv(e, t) {
  return !e && !t
    ? null
    : (n) => {
        if (n & 1 && e) for (let r of e) r.create();
        if (n & 2 && t) for (let r of t) r.update();
      };
}
function fu$1(e) {
  let t = e[Xs$1].kind;
  return t === 'input' || t === 'twoWay';
}
var Oo$1 = class Oo extends Fd$1 {
  _rootLView;
  _hasInputBindings;
  instance;
  hostView;
  changeDetectorRef;
  componentType;
  location;
  previousInputValues = null;
  _tNode;
  constructor(t, n, r) {
    (super(),
      (this._rootLView = n),
      (this._hasInputBindings = r),
      (this._tNode = Kr$1(n[g], F)),
      (this.location = un$1(this._tNode, n)),
      (this.instance = le(this._tNode.index, n)[U]),
      (this.hostView = this.changeDetectorRef = new ot$1(n, void 0)),
      (this.componentType = t));
  }
  setInput(t, n) {
    this._hasInputBindings;
    let r = this._tNode;
    if (
      ((this.previousInputValues ??= new Map()),
      this.previousInputValues.has(t) && Object.is(this.previousInputValues.get(t), n))
    )
      return;
    let o = this._rootLView;
    _a(r, o[g], o, t, n);
    this.previousInputValues.set(t, n);
    let s = le(r.index, o);
    Sa(s, 1);
  }
  get injector() {
    return new rt(this._tNode, this._rootLView);
  }
  destroy() {
    this.hostView.destroy();
  }
  onDestroy(t) {
    this.hostView.onDestroy(t);
  }
};
function mv(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null && i.length ? Array.from(i) : null);
  }
}
var Yo$1 = (() => {
  class e {
    static __NG_ELEMENT_ID__ = yv;
  }
  return e;
})();
function yv() {
  let e = B();
  return Zd$1(e, I());
}
var ea$1 = class e extends Yo$1 {
  _lContainer;
  _hostTNode;
  _hostLView;
  constructor(t, n, r) {
    (super(), (this._lContainer = t), (this._hostTNode = n), (this._hostLView = r));
  }
  get element() {
    return un$1(this._hostTNode, this._hostLView);
  }
  get injector() {
    return new rt(this._hostTNode, this._hostLView);
  }
  get parentInjector() {
    let t = ua(this._hostTNode, this._hostLView);
    if (Mu$1(t)) {
      let n = To$1(t, this._hostLView),
        r = Do$1(t),
        o = n[g].data[r + 8];
      return new rt(o, n);
    } else return new rt(null, this._hostLView);
  }
  clear() {
    for (; this.length > 0; ) this.remove(this.length - 1);
  }
  get(t) {
    let n = pu$1(this._lContainer);
    return (n !== null && n[t]) || null;
  }
  get length() {
    return this._lContainer.length - W;
  }
  createEmbeddedView(t, n, r) {
    let o, i;
    typeof r == 'number' ? (o = r) : r != null && ((o = r.index), (i = r.injector));
    let s = Js$1(this._lContainer, t.ssrId),
      a = t.createEmbeddedViewImpl(n || {}, i, s);
    return (this.insertImpl(a, o, No$1(this._hostTNode, s)), a);
  }
  createComponent(t, n, r, o, i, s, a) {
    let c,
      l = n || {};
    ((c = l.index),
      (r = l.injector),
      (o = l.projectableNodes),
      (i = l.environmentInjector || l.ngModuleRef),
      (s = l.directives),
      (a = l.bindings));
    let u = new At$1(Oe$1(t)),
      d = r || this.parentInjector;
    if (!i && u.ngModule == null) {
      let S = this.parentInjector.get(oe$1, null);
      S && (i = S);
    }
    let p = Oe$1(u.componentType ?? {}),
      f = Js$1(this._lContainer, p?.id ?? null),
      h = null,
      m = u.create(d, o, h, i, s, a);
    return (this.insertImpl(m.hostView, c, No$1(this._hostTNode, f)), m);
  }
  insert(t, n) {
    return this.insertImpl(t, n, true);
  }
  insertImpl(t, n, r) {
    let o = t._lView;
    if (ul$1(o)) {
      let a = this.indexOf(t);
      if (a !== -1) this.detach(a);
      else {
        let c = o[H$1],
          l = new e(c, c[z$1], c[H$1]);
        l.detach(l.indexOf(t));
      }
    }
    let i = this._adjustIndex(n),
      s = this._lContainer;
    return (xa(s, o, i, r), t.attachToViewContainerRef(), Gi$1(Ss(s), i, t), t);
  }
  move(t, n) {
    return this.insert(t, n);
  }
  indexOf(t) {
    let n = pu$1(this._lContainer);
    return n !== null ? n.indexOf(t) : -1;
  }
  remove(t) {
    let n = this._adjustIndex(t, -1),
      r = So$1(this._lContainer, n);
    r && (An(Ss(this._lContainer), n), Ta(r[g], r));
  }
  detach(t) {
    let n = this._adjustIndex(t, -1),
      r = So$1(this._lContainer, n);
    return r && An(Ss(this._lContainer), n) != null ? new ot$1(r) : null;
  }
  _adjustIndex(t, n = 0) {
    return t ?? this.length + n;
  }
};
function pu$1(e) {
  return e[Rn];
}
function Ss(e) {
  return e[Rn] || (e[Rn] = []);
}
function Zd$1(e, t) {
  let n,
    r = t[e.index];
  return (
    se(r) ? (n = r) : ((n = Pd$1(r, t, null, e)), (t[e.index] = n), ya(t, n)),
    Ev(n, t, e, r),
    new ea$1(n, e, t)
  );
}
function vv(e, t) {
  let n = e[R$2],
    r = n.createComment(''),
    o = ce(t, e),
    i = n.parentNode(o);
  return (bo$1(n, i, r, n.nextSibling(o), false), r);
}
var Ev = Tv;
function Tv(e, t, n, r) {
  if (e[Je$1]) return;
  let o;
  (n.type & 8 ? (o = ae(r)) : (o = vv(t, n)), (e[Je$1] = o));
}
var ta$1 = class e {
    queryList;
    matches = null;
    constructor(t) {
      this.queryList = t;
    }
    clone() {
      return new e(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  na$1 = class e {
    queries;
    constructor(t = []) {
      this.queries = t;
    }
    createEmbeddedView(t) {
      let n = t.queries;
      if (n !== null) {
        let r = t.contentQueries !== null ? t.contentQueries[0] : n.length,
          o = [];
        for (let i = 0; i < r; i++) {
          let s = n.getByIndex(i),
            a = this.queries[s.indexInDeclarationView];
          o.push(a.clone());
        }
        return new e(o);
      }
      return null;
    }
    insertView(t) {
      this.dirtyQueriesWithMatches(t);
    }
    detachView(t) {
      this.dirtyQueriesWithMatches(t);
    }
    finishViewCreation(t) {
      this.dirtyQueriesWithMatches(t);
    }
    dirtyQueriesWithMatches(t) {
      for (let n = 0; n < this.queries.length; n++)
        ka(t, n).matches !== null && this.queries[n].setDirty();
    }
  },
  Po$1 = class Po {
    flags;
    read;
    predicate;
    constructor(t, n, r = null) {
      ((this.flags = n),
        (this.read = r),
        typeof t == 'string' ? (this.predicate = Mv(t)) : (this.predicate = t));
    }
  },
  ra$1 = class e {
    queries;
    constructor(t = []) {
      this.queries = t;
    }
    elementStart(t, n) {
      for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(t, n);
    }
    elementEnd(t) {
      for (let n = 0; n < this.queries.length; n++) this.queries[n].elementEnd(t);
    }
    embeddedTView(t) {
      let n = null;
      for (let r = 0; r < this.length; r++) {
        let o = n !== null ? n.length : 0,
          i = this.getByIndex(r).embeddedTView(t, o);
        i && ((i.indexInDeclarationView = r), n !== null ? n.push(i) : (n = [i]));
      }
      return n !== null ? new e(n) : null;
    }
    template(t, n) {
      for (let r = 0; r < this.queries.length; r++) this.queries[r].template(t, n);
    }
    getByIndex(t) {
      return this.queries[t];
    }
    get length() {
      return this.queries.length;
    }
    track(t) {
      this.queries.push(t);
    }
  },
  oa$1 = class e {
    metadata;
    matches = null;
    indexInDeclarationView = -1;
    crossesNgTemplate = false;
    _declarationNodeIndex;
    _appliesToNextNode = true;
    constructor(t, n = -1) {
      ((this.metadata = t), (this._declarationNodeIndex = n));
    }
    elementStart(t, n) {
      this.isApplyingToNode(n) && this.matchTNode(t, n);
    }
    elementEnd(t) {
      this._declarationNodeIndex === t.index && (this._appliesToNextNode = false);
    }
    template(t, n) {
      this.elementStart(t, n);
    }
    embeddedTView(t, n) {
      return this.isApplyingToNode(t)
        ? ((this.crossesNgTemplate = true), this.addMatch(-t.index, n), new e(this.metadata))
        : null;
    }
    isApplyingToNode(t) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let n = this._declarationNodeIndex,
          r = t.parent;
        for (; r !== null && r.type & 8 && r.index !== n; ) r = r.parent;
        return n === (r !== null ? r.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(t, n) {
      let r = this.metadata.predicate;
      if (Array.isArray(r))
        for (let o = 0; o < r.length; o++) {
          let i = r[o];
          (this.matchTNodeWithReadOption(t, n, wv(n, i)),
            this.matchTNodeWithReadOption(t, n, vo$1(n, t, i, false, false)));
        }
      else
        r === zn$1
          ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1)
          : this.matchTNodeWithReadOption(t, n, vo$1(n, t, r, false, false));
    }
    matchTNodeWithReadOption(t, n, r) {
      if (r !== null) {
        let o = this.metadata.read;
        if (o !== null)
          if (o === Xn$1 || o === Yo$1 || (o === zn$1 && n.type & 4)) this.addMatch(n.index, -2);
          else {
            let i = vo$1(n, t, o, false, false);
            i !== null && this.addMatch(n.index, i);
          }
        else this.addMatch(n.index, r);
      }
    }
    addMatch(t, n) {
      this.matches === null ? (this.matches = [t, n]) : this.matches.push(t, n);
    }
  };
function wv(e, t) {
  let n = e.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
  }
  return null;
}
function Cv(e, t) {
  return e.type & 11 ? un$1(e, t) : e.type & 4 ? Qo$1(e, t) : null;
}
function bv(e, t, n, r) {
  return n === -1 ? Cv(t, e) : n === -2 ? _v(e, t, r) : Wn$1(e, e[g], n, t);
}
function _v(e, t, n) {
  if (n === Xn$1) return un$1(t, e);
  if (n === zn$1) return Qo$1(t, e);
  if (n === Yo$1) return Zd$1(t, e);
}
function Yd$1(e, t, n, r) {
  let o = t[we].queries[r];
  if (o.matches === null) {
    let i = e.data,
      s = n.matches,
      a = [];
    for (let c = 0; s !== null && c < s.length; c += 2) {
      let l = s[c];
      if (l < 0) a.push(null);
      else {
        let u = i[l];
        a.push(bv(t, u, s[c + 1], n.metadata.read));
      }
    }
    o.matches = a;
  }
  return o.matches;
}
function ia$1(e, t, n, r) {
  let o = e.queries.getByIndex(n),
    i = o.matches;
  if (i !== null) {
    let s = Yd$1(e, t, o, n);
    for (let a = 0; a < i.length; a += 2) {
      let c = i[a];
      if (c > 0) r.push(s[a / 2]);
      else {
        let l = i[a + 1],
          u = t[-c];
        for (let d = W; d < u.length; d++) {
          let p = u[d];
          p[Ye$1] === p[H$1] && ia$1(p[g], p, l, r);
        }
        if (u[Ct$1] !== null) {
          let d = u[Ct$1];
          for (let p = 0; p < d.length; p++) {
            let f = d[p];
            ia$1(f[g], f, l, r);
          }
        }
      }
    }
  }
  return r;
}
function Aa(e, t) {
  return e[we].queries[t].queryList;
}
function Kd(e, t, n) {
  let r = new Co$1((n & 4) === 4);
  return (pl$1(e, t, r, r.destroy), (t[we] ??= new na$1()).queries.push(new ta$1(r)) - 1);
}
function Jd$1(e, t, n) {
  let r = P$1();
  return (
    r.firstCreatePass &&
      (ef$1(r, new Po$1(e, t, n), -1), (t & 2) === 2 && (r.staticViewQueries = true)),
    Kd(r, I(), t)
  );
}
function Xd$1(e, t, n, r) {
  let o = P$1();
  if (o.firstCreatePass) {
    let i = B();
    (ef$1(o, new Po$1(t, n, r), i.index),
      Nv(o, e),
      (n & 2) === 2 && (o.staticContentQueries = true));
  }
  return Kd(o, I(), n);
}
function Mv(e) {
  return e.split(',').map((t) => t.trim());
}
function ef$1(e, t, n) {
  (e.queries === null && (e.queries = new ra$1()), e.queries.track(new oa$1(t, n)));
}
function Nv(e, t) {
  let n = e.contentQueries || (e.contentQueries = []),
    r = n.length ? n[n.length - 1] : -1;
  t !== r && n.push(e.queries.length - 1, t);
}
function ka(e, t) {
  return e.queries.getByIndex(t);
}
function tf$1(e, t) {
  let n = e[g],
    r = ka(n, t);
  return r.crossesNgTemplate ? ia$1(n, e, t, []) : Yd$1(n, e, r, t);
}
function nf$1(e, t, n) {
  let r,
    o = yn$1(() => {
      r._dirtyCounter();
      let i = Sv(r, e);
      if (t && i === void 0) throw new C(-951, false);
      return i;
    });
  return ((r = o[L]), (r._dirtyCounter = _e(0)), (r._flatValue = void 0), o);
}
function Ra(e) {
  return nf$1(true, false);
}
function Oa(e) {
  return nf$1(true, true);
}
function rf$1(e, t) {
  let n = e[L];
  ((n._lView = I()),
    (n._queryIndex = t),
    (n._queryList = Aa(n._lView, t)),
    n._queryList.onDirty(() => n._dirtyCounter.update((r) => r + 1)));
}
function Sv(e, t) {
  let n = e._lView,
    r = e._queryIndex;
  if (n === void 0 || r === void 0 || n[v$1] & 4) return t ? void 0 : G$1;
  let o = Aa(n, r),
    i = tf$1(n, r);
  return (
    o.reset(i, Fu$1),
    t
      ? o.first
      : o._changesDetected || e._flatValue === void 0
        ? (e._flatValue = o.toArray())
        : e._flatValue
  );
}
function Pa(e) {
  return !!e && typeof e.then == 'function';
}
function of$1(e) {
  return !!e && typeof e.subscribe == 'function';
}
var cn$1 = class cn {},
  sf$1 = class sf {};
var Lo$1 = class Lo extends cn$1 {
    ngModuleType;
    _parent;
    _bootstrapComponents = [];
    _r3Injector;
    instance;
    destroyCbs = [];
    constructor(t, n, r, o = true) {
      (super(), (this.ngModuleType = t), (this._parent = n));
      let i = Wc$1(t);
      ((this._bootstrapComponents = mm$1(i.bootstrap)),
        (this._r3Injector = Es(
          t,
          n,
          [{ provide: cn$1, useValue: this }, ...r],
          Nn$1(t),
          new Set(['environment']),
        )),
        o && this.resolveInjectorInitializers());
    }
    resolveInjectorInitializers() {
      (this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType)));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let t = this._r3Injector;
      (!t.destroyed && t.destroy(), this.destroyCbs.forEach((n) => n()), (this.destroyCbs = null));
    }
    onDestroy(t) {
      this.destroyCbs.push(t);
    }
  },
  Fo$1 = class Fo extends sf$1 {
    moduleType;
    constructor(t) {
      (super(), (this.moduleType = t));
    }
    create(t) {
      return new Lo$1(this.moduleType, t, []);
    }
  };
var Zn$1 = class Zn extends cn$1 {
  injector;
  instance = null;
  constructor(t) {
    super();
    let n = new Et$1(
      [...t.providers, { provide: cn$1, useValue: this }],
      t.parent || Qt$1(),
      t.debugName,
      new Set(['environment']),
    );
    ((this.injector = n), t.runEnvironmentInitializers && n.resolveInjectorInitializers());
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
};
function af$1(e, t, n = null) {
  return new Zn$1({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: true })
    .injector;
}
var xv = (() => {
  class e {
    _injector;
    cachedInjectors = new Map();
    constructor(n) {
      this._injector = n;
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = Qi$1(false, n.type),
          o = r.length > 0 ? af$1([r], this._injector, '') : null;
        this.cachedInjectors.set(n, o);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static ɵprov = ee({ token: e, providedIn: 'environment', factory: () => new e(Ie(oe$1)) });
  }
  return e;
})();
function Av(e) {
  return Kn$1(() => {
    let t = cf$1(e),
      n = V(j$1({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection !== da.Eager,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: t.standalone
          ? (o) => o.get(xv).getOrCreateStandaloneInjector(n)
          : null,
        getExternalStyles: null,
        signals: e.signals ?? false,
        data: e.data || {},
        encapsulation: e.encapsulation || St$1.Emulated,
        styles: e.styles || G$1,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: '',
      });
    (t.standalone && fn$1('NgStandalone'), lf$1(n));
    let r = e.dependencies;
    return ((n.directiveDefs = hu$1(r, kv)), (n.pipeDefs = hu$1(r, qc$1)), (n.id = Fv(n)), n);
  });
}
function kv(e) {
  return Oe$1(e) || Ui$1(e);
}
function Rv(e) {
  return Kn$1(() => ({
    type: e.type,
    bootstrap: e.bootstrap || G$1,
    declarations: e.declarations || G$1,
    imports: e.imports || G$1,
    exports: e.exports || G$1,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function Ov(e, t) {
  if (e == null) return Ze$1;
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i,
        s,
        a,
        c;
      (Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i), (c = o[3] || null))
        : ((i = o), (s = o), (a = Uo$1.None), (c = null)),
        (n[i] = [r, a, c]),
        (t[i] = s));
    }
  return n;
}
function Pv(e) {
  if (e == null) return Ze$1;
  let t = {};
  for (let n in e) e.hasOwnProperty(n) && (t[e[n]] = n);
  return t;
}
function Lv(e) {
  return Kn$1(() => {
    let t = cf$1(e);
    return (lf$1(t), t);
  });
}
function cf$1(e) {
  let t = {};
  return {
    type: e.type,
    providersResolver: null,
    viewProvidersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputConfig: e.inputs || Ze$1,
    exportAs: e.exportAs || null,
    standalone: e.standalone ?? true,
    signals: e.signals === true,
    selectors: e.selectors || G$1,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    resolveHostDirectives: null,
    hostDirectives: null,
    controlDef: null,
    signalFormsInputPresence: null,
    inputs: Ov(e.inputs, t),
    outputs: Pv(e.outputs),
    debugInfo: null,
  };
}
function lf$1(e) {
  e.features?.forEach((t) => t(e));
}
function hu$1(e, t) {
  return e
    ? () => {
        let n = typeof e == 'function' ? e() : e,
          r = [];
        for (let o of n) {
          let i = t(o);
          i !== null && r.push(i);
        }
        return r;
      }
    : null;
}
function Fv(e) {
  let t = 0,
    n = typeof e.consts == 'function' ? '' : e.consts,
    r = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      n,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ];
  for (let i of r.join('|')) t = (Math.imul(31, t) + i.charCodeAt(0)) << 0;
  return ((t += 2147483648), 'c' + t);
}
var uf$1 = new N('');
var La = (() => {
  class e {
    resolve;
    reject;
    initialized = false;
    done = false;
    donePromise = new Promise((n, r) => {
      ((this.resolve = n), (this.reject = r));
    });
    appInits = E$1(uf$1, { optional: true }) ?? [];
    injector = E$1(de$2);
    constructor() {}
    runInitializers() {
      if (this.initialized) return;
      let n = [];
      for (let o of this.appInits) {
        let i = Zr$1(this.injector, o);
        if (Pa(i)) n.push(i);
        else if (of$1(i)) {
          let s = new Promise((a, c) => {
            i.subscribe({ complete: a, error: c });
          });
          n.push(s);
        }
      }
      let r = () => {
        ((this.done = true), this.resolve());
      };
      (Promise.all(n)
        .then(() => {
          r();
        })
        .catch((o) => {
          this.reject(o);
        }),
        n.length === 0 && r(),
        (this.initialized = true));
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = Jn$1({ token: e, factory: e.ɵfac });
  }
  return e;
})();
function jv(e) {
  return (t) => {
    t.controlDef = {
      create: (n, r) => {
        n?.ɵngControlCreate(r);
      },
      update: (n, r) => {
        n?.ɵngControlUpdate?.(r);
      },
      passThroughInput: e,
    };
  };
}
function Vv(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function df$1(e) {
  let t = Vv(e.type),
    n = true,
    r = [e];
  for (; t; ) {
    let o;
    if (Ce$2(e)) o = t.ɵcmp || t.ɵdir;
    else {
      if (t.ɵcmp) throw new C(903, false);
      o = t.ɵdir;
    }
    if (o) {
      if (n) {
        r.push(o);
        let s = e;
        ((s.inputs = xs$1(e.inputs)),
          (s.declaredInputs = xs$1(e.declaredInputs)),
          (s.outputs = xs$1(e.outputs)));
        let a = o.hostBindings;
        a && Wv(e, a);
        let c = o.viewQuery,
          l = o.contentQueries;
        if (
          (c && $v(e, c),
          l && Uv(e, l),
          Hv(e, o),
          $c$1(e.outputs, o.outputs),
          Ce$2(o) && o.data.animation)
        ) {
          let u = e.data;
          u.animation = (u.animation || []).concat(o.data.animation);
        }
      }
      let i = o.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          let a = i[s];
          (a && a.ngInherit && a(e), a === df$1 && (n = false));
        }
    }
    t = Object.getPrototypeOf(t);
  }
  Bv(r);
}
function Hv(e, t) {
  for (let n in t.inputs) {
    if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n)) continue;
    let r = t.inputs[n];
    r !== void 0 && ((e.inputs[n] = r), (e.declaredInputs[n] = t.declaredInputs[n]));
  }
}
function Bv(e) {
  let t = 0,
    n = null;
  for (let r = e.length - 1; r >= 0; r--) {
    let o = e[r];
    ((o.hostVars = t += o.hostVars), (o.hostAttrs = sn$1(o.hostAttrs, (n = sn$1(n, o.hostAttrs)))));
  }
}
function xs$1(e) {
  return e === Ze$1 ? {} : e === G$1 ? [] : e;
}
function $v(e, t) {
  let n = e.viewQuery;
  n
    ? (e.viewQuery = (r, o) => {
        (t(r, o), n(r, o));
      })
    : (e.viewQuery = t);
}
function Uv(e, t) {
  let n = e.contentQueries;
  n
    ? (e.contentQueries = (r, o, i) => {
        (t(r, o, i), n(r, o, i));
      })
    : (e.contentQueries = t);
}
function Wv(e, t) {
  let n = e.hostBindings;
  n
    ? (e.hostBindings = (r, o) => {
        (t(r, o), n(r, o));
      })
    : (e.hostBindings = t);
}
function ff$1(e, t, n, r, o, i, s, a) {
  if (n.firstCreatePass) {
    e.mergedAttrs = sn$1(e.mergedAttrs, e.attrs);
    let u = (e.tView = ga(
      2,
      e,
      o,
      i,
      s,
      n.directiveRegistry,
      n.pipeRegistry,
      null,
      n.schemas,
      n.consts,
      null,
    ));
    n.queries !== null && (n.queries.template(n, e), (u.queries = n.queries.embeddedTView(e)));
  }
  (a && (e.flags |= a), Xt$1(e, false));
  let c = Gv(n, t);
  (io$1() && wa(n, t, c, e), an$1(c, t));
  let l = Pd$1(c, t, c, e);
  ((t[r + F] = l), ya(t, l));
}
function qv(e, t, n, r, o, i, s, a, c, l, u) {
  let d = n + F,
    p;
  return (
    t.firstCreatePass
      ? ((p = pn$1(t, d, 4, s || null, a || null)),
        Ud$1(t, e, p, be$1(t.consts, l), wd$1),
        Cu$1(t, p))
      : (p = t.data[d]),
    ff$1(p, e, t, n, r, o, i, c),
    On(p) && ba(t, e, p),
    l != null && zo$1(e, p, u),
    p
  );
}
function Fa(e, t, n, r, o, i, s, a, c, l, u) {
  let d = n + F,
    p;
  if (t.firstCreatePass) {
    if (((p = pn$1(t, d, 4, s || null, a || null)), l != null)) {
      let f = be$1(t.consts, l);
      p.localNames = [];
      for (let h = 0; h < f.length; h += 2) p.localNames.push(f[h], -1);
    }
  } else p = t.data[d];
  return (ff$1(p, e, t, n, r, o, i, c), l != null && zo$1(e, p, u), p);
}
function pf$1(e, t, n, r, o, i, s, a) {
  let c = I(),
    l = P$1(),
    u = be$1(l.consts, i);
  return (qv(c, l, e, t, n, r, o, u, void 0, s, a), pf$1);
}
var Gv = zv;
function zv(e, t, n, r) {
  return (so$1(true), t[R$2].createComment(''));
}
var Qv = (() => {
  class e {
    log(n) {
      console.log(n);
    }
    warn(n) {
      console.warn(n);
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = ee({ token: e, factory: e.ɵfac, providedIn: 'platform' });
  }
  return e;
})();
var hf$1 = new N('');
var gf$1 = new N('');
function mf$1() {
  ai$1(() => {
    let e = '';
    throw new C(600, e);
  });
}
var Zv = 10;
var Ko$1 = (() => {
  class e {
    _runningTick = false;
    _destroyed = false;
    _destroyListeners = [];
    _views = [];
    internalErrorHandler = E$1(nt);
    afterRenderManager = E$1(Ea);
    zonelessEnabled = E$1(Vn$1);
    rootEffectScheduler = E$1(co$1);
    dirtyFlags = 0;
    tracingSnapshot = null;
    allTestViews = new Set();
    autoDetectTestViews = new Set();
    includeAllTestViews = false;
    afterTick = new J$1();
    get allViews() {
      return [
        ...(this.includeAllTestViews ? this.allTestViews : this.autoDetectTestViews).keys(),
        ...this._views,
      ];
    }
    get destroyed() {
      return this._destroyed;
    }
    componentTypes = [];
    components = [];
    internalPendingTask = E$1(Mt);
    get isStable() {
      return this.internalPendingTask.hasPendingTasksObservable.pipe(Ge$1((n) => !n));
    }
    constructor() {
      E$1(dn$1, { optional: true });
    }
    whenStable() {
      let n;
      return new Promise((r) => {
        n = this.isStable.subscribe({
          next: (o) => {
            o && r();
          },
        });
      }).finally(() => {
        n.unsubscribe();
      });
    }
    _injector = E$1(oe$1);
    _rendererFactory = null;
    get injector() {
      return this._injector;
    }
    bootstrap(n, r) {
      return this.bootstrapImpl(n, r);
    }
    bootstrapImpl(n, r, o = de$2.NULL) {
      return this._injector.get(De$2).run(() => {
        if ((k(M$1.BootstrapComponentStart), !this._injector.get(La).done)) {
          let S = '';
          throw new C(405, S);
        }
        let a = Oe$1(n),
          c = this._injector.get(cn$1),
          l = new At$1(a, c);
        this.componentTypes.push(n);
        let { hostElement: u, directives: d, bindings: p } = Yv(r),
          f = u || l.selector,
          h = l.create(o, [], f, c.injector, d, p),
          m = h.location.nativeElement,
          _ = h.injector.get(hf$1, null);
        return (
          _?.registerApplication(m),
          h.onDestroy(() => {
            (this.detachView(h.hostView), Un$1(this.components, h), _?.unregisterApplication(m));
          }),
          this._loadComponent(h),
          k(M$1.BootstrapComponentEnd, h),
          h
        );
      });
    }
    tick() {
      (this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick());
    }
    _tick() {
      (k(M$1.ChangeDetectionStart),
        this.tracingSnapshot !== null
          ? this.tracingSnapshot.run(Wo$1.CHANGE_DETECTION, this.tickImpl)
          : this.tickImpl());
    }
    tickImpl = () => {
      if (this._runningTick) throw (k(M$1.ChangeDetectionEnd), new C(101, false));
      let n = y$1(null);
      try {
        ((this._runningTick = !0), this.synchronize());
      } finally {
        ((this._runningTick = false),
          this.tracingSnapshot?.dispose(),
          (this.tracingSnapshot = null),
          y$1(n),
          this.afterTick.next(),
          k(M$1.ChangeDetectionEnd));
      }
    };
    synchronize() {
      this._rendererFactory === null &&
        !this._injector.destroyed &&
        (this._rendererFactory = this._injector.get(Qn$1, null, { optional: true }));
      let n = 0;
      for (; this.dirtyFlags !== 0 && n++ < Zv; ) {
        k(M$1.ChangeDetectionSyncStart);
        try {
          this.synchronizeOnce();
        } finally {
          k(M$1.ChangeDetectionSyncEnd);
        }
      }
    }
    synchronizeOnce() {
      this.dirtyFlags & 16 && ((this.dirtyFlags &= -17), this.rootEffectScheduler.flush());
      let n = false;
      if (this.dirtyFlags & 7) {
        let r = !!(this.dirtyFlags & 1);
        ((this.dirtyFlags &= -8), (this.dirtyFlags |= 8));
        for (let { _lView: o } of this.allViews) {
          if (!r && !Pn$1(o)) continue;
          let i = r && !this.zonelessEnabled ? 0 : 1;
          (Ad$1(o, i), (n = true));
        }
        if (((this.dirtyFlags &= -5), this.syncDirtyFlagsWithViews(), this.dirtyFlags & 23)) return;
      }
      (n || (this._rendererFactory?.begin?.(), this._rendererFactory?.end?.()),
        this.dirtyFlags & 8 && ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews());
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: n }) => Pn$1(n))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(n) {
      let r = n;
      (this._views.push(r), r.attachToAppRef(this));
    }
    detachView(n) {
      let r = n;
      (Un$1(this._views, r), r.detachFromAppRef());
    }
    _loadComponent(n) {
      this.attachView(n.hostView);
      try {
        this.tick();
      } catch (o) {
        this.internalErrorHandler(o);
      }
      (this.components.push(n), this._injector.get(gf$1, []).forEach((o) => o(n)));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          (this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy()));
        } finally {
          ((this._destroyed = true), (this._views = []), (this._destroyListeners = []));
        }
    }
    onDestroy(n) {
      return (this._destroyListeners.push(n), () => Un$1(this._destroyListeners, n));
    }
    destroy() {
      if (this._destroyed) throw new C(406, false);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = Jn$1({ token: e, factory: e.ɵfac });
  }
  return e;
})();
function Yv(e) {
  return e === void 0 || typeof e == 'string' || e instanceof Element ? { hostElement: e } : e;
}
function Un$1(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function yf$1(e, t, n, r) {
  let o = I(),
    i = Xe$1();
  if (Ne$1(o, i, t)) {
    P$1();
    let a = en$1();
    ay(a, o, e, t, n, r);
  }
  return yf$1;
}
function Kv(e, t, n, r, o, i, s, a) {
  fn$1('NgControlFlow');
  let c = I(),
    l = P$1(),
    u = be$1(l.consts, i);
  return (Fa(c, l, e, t, n, r, o, u, 256, s, a), ja);
}
function ja(e, t, n, r, o, i, s, a) {
  fn$1('NgControlFlow');
  let c = I(),
    l = P$1(),
    u = be$1(l.consts, i);
  return (Fa(c, l, e, t, n, r, o, u, 512, s, a), ja);
}
function Jv(e, t) {
  fn$1('NgControlFlow');
  let n = I(),
    r = Xe$1(),
    o = n[r] !== ne ? n[r] : -1,
    i = o !== -1 ? gu$1(n, F + o) : void 0,
    s = 0;
  if (Ne$1(n, r, e)) {
    let a = y$1(null);
    try {
      if ((i !== void 0 && Ny(i, s), e !== -1)) {
        let c = F + e,
          l = gu$1(n, c),
          u = Xv(n[g], c),
          d = Ly(l, u, n),
          p = Na(n, u, t, { dehydratedView: d });
        xa(l, p, s, No$1(u, d));
      }
    } finally {
      y$1(a);
    }
  } else if (i !== void 0) {
    let a = My(i, s);
    a !== void 0 && (a[U] = t);
  }
}
function gu$1(e, t) {
  return e[t];
}
function Xv(e, t) {
  return Kr$1(e, t);
}
function vf$1(e, t, n) {
  let r = I(),
    o = Xe$1();
  if (Ne$1(r, o, t)) {
    P$1();
    let s = en$1();
    Dd$1(s, r, e, t, r[R$2], n);
  }
  return vf$1;
}
function sa$1(e, t, n, r, o) {
  _a(t, e, n, o ? 'class' : 'style', r);
}
function jo$1(e, t, n, r) {
  let o = I(),
    i = o[g],
    s = e + F,
    a = i.firstCreatePass ? qd(s, o, 2, t, wd$1, as$1(), n, r) : i.data[s];
  if (je(a)) {
    let c = o[pe$1].tracingService;
    if (c && c.componentCreate) {
      let l = i.data[a.directiveStart + a.componentOffset];
      return c.componentCreate(Vd$1(l), () => (mu$1(e, t, o, a, r), jo$1));
    }
  }
  return (mu$1(e, t, o, a, r), jo$1);
}
function mu$1(e, t, n, r, o) {
  if ((Cd$1(r, n, e, t, Df), On(r))) {
    let i = n[g];
    (ba(i, n, r), Qu$1(i, r, n));
  }
  o != null && zo$1(n, r);
}
function Va$1() {
  let e = P$1(),
    t = B(),
    n = bd$1(t);
  return (
    e.firstCreatePass && Gd(e, n),
    ls$1(n) && us$1(),
    ss$1(),
    n.classesWithoutHost != null && fg(n) && sa$1(e, n, I(), n.classesWithoutHost, true),
    n.stylesWithoutHost != null && pg(n) && sa$1(e, n, I(), n.stylesWithoutHost, false),
    Va$1
  );
}
function Ef$1(e, t, n, r) {
  return (jo$1(e, t, n, r), Va$1(), Ef$1);
}
function Ha(e, t, n, r) {
  let o = I(),
    i = o[g],
    s = e + F,
    a = i.firstCreatePass ? sv(s, i, 2, t, n, r) : i.data[s];
  return (Cd$1(a, o, e, t, Df), r != null && zo$1(o, a), Ha);
}
function Ba() {
  let e = B(),
    t = bd$1(e);
  return (ls$1(t) && us$1(), ss$1(), Ba);
}
function If$1(e, t, n, r) {
  return (Ha(e, t, n, r), Ba(), If$1);
}
var Df = (e, t, n, r, o) => (so$1(true), td$1(t[R$2], r, vs()));
function eE$1() {
  return I();
}
function Tf$1(e, t, n) {
  let r = I(),
    o = Xe$1();
  if (Ne$1(r, o, t)) {
    P$1();
    let s = en$1();
    Td$1(s, r, e, t, r[R$2], n);
  }
  return Tf$1;
}
var nr$1 = 'en-US';
function wf$1(e) {
  typeof e == 'string' && e.toLowerCase().replace(/_/g, '-');
}
function Cf$1(e, t, n) {
  let r = I(),
    o = P$1(),
    i = B();
  return (bf$1(o, r, r[R$2], i, e, t, n), Cf$1);
}
function bf$1(e, t, n, r, o, i, s) {
  let a = true,
    c = null;
  if (
    ((r.type & 3 || s) && ((c ??= on$1(r, t, i)), Hd$1(r, e, t, s, n, o, i, c) && (a = false)), a)
  ) {
    let l = r.outputs?.[o],
      u = r.hostDirectiveOutputs?.[o];
    if (u && u.length)
      for (let d = 0; d < u.length; d += 2) {
        let p = u[d],
          f = u[d + 1];
        ((c ??= on$1(r, t, i)), Ao$1(r, t, p, f, o, c));
      }
    if (l && l.length) for (let d of l) ((c ??= on$1(r, t, i)), Ao$1(r, t, d, o, o, c));
  }
}
function nE(e = 1) {
  return Sl$1(e);
}
function rE(e, t) {
  let n = null,
    r = Tm$1(e);
  for (let o = 0; o < t.length; o++) {
    let i = t[o];
    if (i === '*') {
      n = o;
      continue;
    }
    if (r === null ? cd$1(e, i, true) : bm$1(r, i)) return o;
  }
  return n;
}
function oE(e) {
  let t = I()[Y][z$1];
  if (!t.projection) {
    let n = e ? e.length : 1,
      r = (t.projection = Kc$1(n, null)),
      o = r.slice(),
      i = t.child;
    for (; i !== null; ) {
      if (i.type !== 128) {
        let s = e ? rE(i, e) : 0;
        s !== null && (o[s] ? (o[s].projectionNext = i) : (r[s] = i), (o[s] = i));
      }
      i = i.next;
    }
  }
}
function iE(e, t = 0, n, r, o, i) {
  let s = I(),
    a = P$1(),
    c = null;
  let l = pn$1(a, F + e, 16, null, null);
  (l.projection === null && (l.projection = t), ps());
  let d = !s[Zt$1] || cs$1();
  s[Y][z$1].projection[l.projection] === null && c !== null
    ? sE(s, a, c)
    : d && !Ho$1(l) && Ym$1(a, s, l);
}
function sE(e, t, n) {
  let r = F + n,
    o = t.data[r],
    i = e[r],
    s = Js$1(i, o.tView.ssrId),
    a = Na(e, o, void 0, { dehydratedView: s });
  xa(i, a, 0, No$1(o, s));
}
function _f$1(e, t, n, r) {
  return (Xd$1(e, t, n, r), _f$1);
}
function Mf$1(e, t, n) {
  return (Jd$1(e, t, n), Mf$1);
}
function aE(e) {
  let t = I(),
    n = P$1(),
    r = no$1();
  Ln$1(r + 1);
  let o = ka(n, r);
  if (e.dirty && ll$1(t) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null) e.reset([]);
    else {
      let i = tf$1(t, r);
      (e.reset(i, Fu$1), e.notifyOnChanges());
    }
    return true;
  }
  return false;
}
function cE() {
  return Aa(I(), no$1());
}
function Nf$1(e, t, n, r, o) {
  return (rf$1(t, Xd$1(e, n, r, o)), Nf$1);
}
function Sf(e, t, n, r) {
  return (rf$1(e, Jd$1(t, n, r)), Sf);
}
function lE(e = 1) {
  Ln$1(no$1() + e);
}
function uE(e) {
  let t = El$1();
  return cl$1(t, F + e);
}
function go$1(e, t) {
  return (e << 17) | (t << 2);
}
function kt$1(e) {
  return (e >> 17) & 32767;
}
function dE(e) {
  return (e & 2) == 2;
}
function fE(e, t) {
  return (e & 131071) | (t << 17);
}
function aa$1(e) {
  return e | 2;
}
function ln$1(e) {
  return (e & 131068) >> 2;
}
function As$1(e, t) {
  return (e & -131069) | (t << 2);
}
function pE(e) {
  return (e & 1) === 1;
}
function ca(e) {
  return e | 1;
}
function hE(e, t, n, r, o, i) {
  let s = t.classBindings,
    a = kt$1(s),
    c = ln$1(s);
  e[r] = n;
  let l = false,
    u;
  if (Array.isArray(n)) {
    let d = n;
    ((u = d[1]), (u === null || Gt$1(d, u) > 0) && (l = true));
  } else u = n;
  if (o)
    if (c !== 0) {
      let p = kt$1(e[a + 1]);
      ((e[r + 1] = go$1(p, a)),
        p !== 0 && (e[p + 1] = As$1(e[p + 1], r)),
        (e[a + 1] = fE(e[a + 1], r)));
    } else ((e[r + 1] = go$1(a, 0)), a !== 0 && (e[a + 1] = As$1(e[a + 1], r)), (a = r));
  else ((e[r + 1] = go$1(c, 0)), a === 0 ? (a = r) : (e[c + 1] = As$1(e[c + 1], r)), (c = r));
  (l && (e[r + 1] = aa$1(e[r + 1])),
    yu$1(e, u, r, true),
    yu$1(e, u, r, false),
    gE(t, u, e, r),
    (s = go$1(a, c)),
    (t.classBindings = s));
}
function gE(e, t, n, r, o) {
  let i = e.residualClasses;
  i != null && typeof t == 'string' && Gt$1(i, t) >= 0 && (n[r + 1] = ca(n[r + 1]));
}
function yu$1(e, t, n, r) {
  let o = e[n + 1],
    i = t === null,
    s = r ? kt$1(o) : ln$1(o),
    a = false;
  for (; s !== 0 && (a === false || i); ) {
    let c = e[s],
      l = e[s + 1];
    (mE(c, t) && ((a = true), (e[s + 1] = r ? ca(l) : aa$1(l))), (s = r ? kt$1(l) : ln$1(l)));
  }
  a && (e[n + 1] = r ? aa$1(o) : ca(o));
}
function mE(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? true
    : Array.isArray(e) && typeof t == 'string'
      ? Gt$1(e, t) >= 0
      : false;
}
var ge$2 = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function yE(e) {
  return e.substring(ge$2.key, ge$2.keyEnd);
}
function vE(e) {
  return (EE(e), xf$1(e, Af$1(e, 0, ge$2.textEnd)));
}
function xf$1(e, t) {
  let n = ge$2.textEnd;
  return n === t ? -1 : ((t = ge$2.keyEnd = IE(e, (ge$2.key = t), n)), Af$1(e, t, n));
}
function EE(e) {
  ((ge$2.key = 0),
    (ge$2.keyEnd = 0),
    (ge$2.value = 0),
    (ge$2.valueEnd = 0),
    (ge$2.textEnd = e.length));
}
function Af$1(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; ) t++;
  return t;
}
function IE(e, t, n) {
  for (; t < n && e.charCodeAt(t) > 32; ) t++;
  return t;
}
function kf$1(e, t) {
  return (wE(e, t, null, true), kf$1);
}
function DE(e) {
  CE(xE, TE, e, true);
}
function TE(e, t) {
  for (let n = vE(t); n >= 0; n = xf$1(t, n)) Gr(e, yE(t), true);
}
function wE(e, t, n, r) {
  let o = I(),
    i = P$1(),
    s = gs(2);
  if ((i.firstUpdatePass && Of$1(i, e, s, r), t !== ne && Ne$1(o, s, t))) {
    let a = i.data[et()];
    Pf$1(i, a, o, o[R$2], e, (o[s + 1] = kE(t)), r, s);
  }
}
function CE(e, t, n, r) {
  let o = P$1(),
    i = gs(2);
  o.firstUpdatePass && Of$1(o, null, i, r);
  let s = I();
  if (n !== ne && Ne$1(s, i, n)) {
    let a = o.data[et()];
    if (Lf$1(a) && !Rf$1(o, i)) {
      let c = a.classesWithoutHost;
      (c !== null && (n = Hr(c, n || '')), sa$1(o, a, s, n, r));
    } else AE(o, a, s, s[R$2], s[i + 1], (s[i + 1] = SE(e, t, n)), r, i);
  }
}
function Rf$1(e, t) {
  return t >= e.expandoStartIndex;
}
function Of$1(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[et()],
      s = Rf$1(e, n);
    (Lf$1(i) && t === null && !s && (t = false), (t = bE(o, i, t, r)), hE(o, i, t, n, s));
  }
}
function bE(e, t, n, r) {
  let o = bl$1(e),
    i = t.residualClasses;
  if (o === null)
    t.classBindings === 0 && ((n = ks$1(null, e, t, n)), (n = Yn$1(n, t.attrs)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = ks$1(o, e, t, n)), i === null)) {
        let c = _E(e, t);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = ks$1(null, e, t, c[1])), (c = Yn$1(c, t.attrs)), ME(e, t, r, c));
      } else i = NE(e, t);
  }
  return (i !== void 0 && (t.residualClasses = i), n);
}
function _E(e, t, n) {
  let r = t.classBindings;
  if (ln$1(r) !== 0) return e[kt$1(r)];
}
function ME(e, t, n, r) {
  let o = t.classBindings;
  e[kt$1(o)] = r;
}
function NE(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = Yn$1(r, s);
  }
  return Yn$1(r, t.attrs);
}
function ks$1(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((i = t[a]), (r = Yn$1(r, i.hostAttrs)), i !== e);
  )
    a++;
  return (e !== null && (n.directiveStylingLast = a), r);
}
function Yn$1(e, t, n) {
  let r = 1,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == 'number'
        ? (o = s)
        : o === r && (Array.isArray(e) || (e = e === void 0 ? [] : ['', e]), Gr(e, s, true));
    }
  return e === void 0 ? null : e;
}
function SE(e, t, n) {
  if (n == null || n === '') return G$1;
  let r = [],
    o = er$1(n);
  if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], true);
  else if (o instanceof Set) for (let i of o) e(r, i, true);
  else if (typeof o == 'object') for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
  else typeof o == 'string' && t(r, o);
  return r;
}
function xE(e, t, n) {
  let r = String(t);
  r !== '' && !r.includes(' ') && Gr(e, r, n);
}
function AE(e, t, n, r, o, i, s, a) {
  o === ne && (o = G$1);
  let c = 0,
    l = 0,
    u = 0 < o.length ? o[0] : null,
    d = 0 < i.length ? i[0] : null;
  for (; u !== null || d !== null; ) {
    let p = c < o.length ? o[c + 1] : void 0,
      f = l < i.length ? i[l + 1] : void 0,
      h = null,
      m;
    (u === d
      ? ((c += 2), (l += 2), p !== f && ((h = d), (m = f)))
      : d === null || (u !== null && u < d)
        ? ((c += 2), (h = u))
        : ((l += 2), (h = d), (m = f)),
      h !== null && Pf$1(e, t, n, r, h, m, s, a),
      (u = c < o.length ? o[c] : null),
      (d = l < i.length ? i[l] : null));
  }
}
function Pf$1(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let c = e.data,
    l = c[a + 1],
    u = pE(l) ? vu$1(c, t, n, o, ln$1(l)) : void 0;
  if (!Vo$1(u)) {
    Vo$1(i) || (dE(l) && (i = vu$1(c, null, n, o, a)));
    let d = ts$1(et(), n);
    Jm$1(r, s, d, o, i);
  }
}
function vu$1(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let c = e[o],
      l = Array.isArray(c),
      u = l ? c[1] : c,
      d = u === null,
      p = n[o + 1];
    p === ne && (p = d ? G$1 : void 0);
    let f = d ? zr(p, r) : u === r ? p : void 0;
    if ((l && !Vo$1(f) && (f = zr(c, r)), Vo$1(f) && ((a = f), s))) return a;
    let h = e[o + 1];
    o = s ? kt$1(h) : ln$1(h);
  }
  if (t !== null) {
    let c = t.residualClasses;
    c != null && (a = zr(c, r));
  }
  return a;
}
function Vo$1(e) {
  return e !== void 0;
}
function kE(e, t) {
  return (e == null || e === '' || (typeof e == 'object' && (e = Nn$1(er$1(e)))), e);
}
function Lf$1(e, t) {
  return (e.flags & 8) !== 0;
}
function RE(e, t = '') {
  let n = I(),
    r = P$1(),
    o = e + F,
    i = r.firstCreatePass ? pn$1(r, o, 1, t, null) : r.data[o],
    s = OE(r, n, i, t);
  ((n[o] = s), io$1() && wa(r, n, s, i), Xt$1(i, false));
}
var OE = (e, t, n, r) => (so$1(true), sm$1(t[R$2], r));
function PE(e, t, n, r = '') {
  return Ne$1(e, Xe$1(), n) ? t + xn(n) + r : ne;
}
function Ff$1(e) {
  return ($a('', e), Ff$1);
}
function $a(e, t, n) {
  let r = I(),
    o = PE(r, e, t, n);
  return (o !== ne && LE(r, et(), o), $a);
}
function LE(e, t, n) {
  let r = ts$1(t, e);
  am$1(e[R$2], r, n);
}
function jf$1(e, t, n) {
  lo$1(t) && (t = t());
  let r = I(),
    o = Xe$1();
  if (Ne$1(r, o, t)) {
    P$1();
    let s = en$1();
    Dd$1(s, r, e, t, r[R$2], n);
  }
  return jf$1;
}
function FE(e, t) {
  let n = lo$1(e);
  return (n && e.set(t), n);
}
function Vf$1(e, t) {
  let n = I(),
    r = P$1(),
    o = B();
  return (bf$1(r, n, n[R$2], o, e, t), Vf$1);
}
function jE(e) {
  return Ne$1(I(), Xe$1(), e) ? xn(e) : ne;
}
function Eu$1(e, t, n) {
  let r = P$1();
  r.firstCreatePass && Hf$1(t, r.data, r.blueprint, Ce$2(e), n);
}
function Hf$1(e, t, n, r, o) {
  if (((e = $$1(e)), Array.isArray(e))) for (let i = 0; i < e.length; i++) Hf$1(e[i], t, n, r, o);
  else {
    let i = P$1(),
      s = I(),
      a = B(),
      c = vt$1(e) ? e : $$1(e.provide),
      l = Ki$1(e),
      u = a.providerIndexes & 1048575,
      d = a.directiveStart,
      p = a.providerIndexes >> 20;
    if (vt$1(e) || !e.multi) {
      let f = new Nt(l, o, Zo$1, null),
        h = Os$1(c, t, u + p, d);
      h === -1
        ? (Ls$1(wo$1(a, s), i, c),
          Rs(i, e, t.length),
          t.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          n.push(f),
          s.push(f))
        : ((n[h] = f), (s[h] = f));
    } else {
      let f = Os$1(c, t, u + p, d),
        h = Os$1(c, t, u, u + p),
        m = f >= 0 && n[f],
        _ = h >= 0 && n[h];
      if (!m) {
        Ls$1(wo$1(a, s), i, c);
        let S = BE(VE, n.length, o, r, l);
        (_ && (n[h].providerFactory = S),
          Rs(i, e, t.length, 0),
          t.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          n.push(S),
          s.push(S));
      } else {
        let S = Bf$1(n[f], l, r);
        Rs(i, e, f > -1 ? f : h, S);
      }
      r && _ && n[h].componentProviders++;
    }
  }
}
function Rs(e, t, n, r) {
  let o = vt$1(t),
    i = rl$1(t);
  if (o || i) {
    let c = (i ? $$1(t.useClass) : t).prototype.ngOnDestroy;
    if (c) {
      let l = e.destroyHooks || (e.destroyHooks = []);
      if (!o && t.multi) {
        let u = l.indexOf(n);
        u === -1 ? l.push(n, [r, c]) : l[u + 1].push(r, c);
      } else l.push(n, c);
    }
  }
}
function Bf$1(e, t, n) {
  return (n && e.componentProviders++, e.multi.push(t) - 1);
}
function Os$1(e, t, n, r) {
  for (let o = n; o < r; o++) if (t[o] === e) return o;
  return -1;
}
function VE(e, t, n, r, o) {
  return la(this.multi, []);
}
function la(e, t) {
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    t.push(r());
  }
  return t;
}
function BE(e, t, n, r, o, i) {
  let s = new Nt(e, n, Zo$1, null);
  return ((s.multi = []), (s.index = t), (s.componentProviders = 0), Bf$1(s, o, r && !n), s);
}
function $E(e, t) {
  return (n) => {
    n.providersResolver = (r, o) => Eu$1(r, o ? o(e) : e, false);
  };
}
function UE(e, t, n) {
  return qE(I(), Il$1(), e, t, n);
}
function WE(e, t) {
  let n = e[t];
  return n === ne ? void 0 : n;
}
function qE(e, t, n, r, o, i) {
  let s = t + n;
  return Ne$1(e, s, o) ? Vy(e, s + 1, r(o)) : WE(e, s + 1);
}
function GE(e, t) {
  return Qo$1(e, t);
}
var $f$1 = (() => {
  class e {
    applicationErrorHandler = E$1(nt);
    appRef = E$1(Ko$1);
    taskService = E$1(Mt);
    ngZone = E$1(De$2);
    zonelessEnabled = E$1(Vn$1);
    tracing = E$1(dn$1, { optional: true });
    zoneIsDefined = typeof Zone < 'u' && !!Zone.root.run;
    schedulerTickApplyArgs = [{ data: { __scheduler_tick__: true } }];
    subscriptions = new Q();
    angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(_n$1) : null;
    scheduleInRootZone =
      !this.zonelessEnabled && this.zoneIsDefined && (E$1(Cs, { optional: true }) ?? false);
    cancelScheduledCallback = null;
    useMicrotaskScheduler = false;
    runningTick = false;
    pendingRenderTaskId = null;
    constructor() {
      (this.subscriptions.add(
        this.appRef.afterTick.subscribe(() => {
          let n = this.taskService.add();
          if (
            !this.runningTick &&
            (this.cleanup(), !this.zonelessEnabled || this.appRef.includeAllTestViews)
          ) {
            this.taskService.remove(n);
            return;
          }
          (this.switchToMicrotaskScheduler(), this.taskService.remove(n));
        }),
      ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          }),
        ));
    }
    switchToMicrotaskScheduler() {
      this.ngZone.runOutsideAngular(() => {
        let n = this.taskService.add();
        ((this.useMicrotaskScheduler = true),
          queueMicrotask(() => {
            ((this.useMicrotaskScheduler = false), this.taskService.remove(n));
          }));
      });
    }
    notify(n) {
      if (!this.zonelessEnabled && n === 5) return;
      switch (n) {
        case 0:
        case 2: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 3:
        case 4:
        case 5:
        case 1: {
          this.appRef.dirtyFlags |= 4;
          break;
        }
        case 6: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 12: {
          this.appRef.dirtyFlags |= 16;
          break;
        }
        case 13: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 11:
          break;
        default:
          this.appRef.dirtyFlags |= 8;
      }
      if (
        ((this.appRef.tracingSnapshot =
          this.tracing?.snapshot(this.appRef.tracingSnapshot) ?? null),
        !this.shouldScheduleTick())
      )
        return;
      let r = this.useMicrotaskScheduler ? Rl$1 : Is$1;
      ((this.pendingRenderTaskId = this.taskService.add()),
        this.scheduleInRootZone
          ? (this.cancelScheduledCallback = Zone.root.run(() => r(() => this.tick())))
          : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
              r(() => this.tick()),
            )));
    }
    shouldScheduleTick() {
      return !(
        this.appRef.destroyed ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(_n$1 + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      if (this.appRef.dirtyFlags === 0) {
        this.cleanup();
        return;
      }
      !this.zonelessEnabled && this.appRef.dirtyFlags & 7 && (this.appRef.dirtyFlags |= 1);
      let n = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            ((this.runningTick = !0), this.appRef._tick());
          },
          void 0,
          this.schedulerTickApplyArgs,
        );
      } catch (r) {
        this.applicationErrorHandler(r);
      } finally {
        (this.taskService.remove(n), this.cleanup());
      }
    }
    ngOnDestroy() {
      (this.subscriptions.unsubscribe(), this.cleanup());
    }
    cleanup() {
      if (
        ((this.runningTick = false),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let n = this.pendingRenderTaskId;
        ((this.pendingRenderTaskId = null), this.taskService.remove(n));
      }
    }
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = Jn$1({ token: e, factory: e.ɵfac });
  }
  return e;
})();
function Uf$1() {
  return [
    { provide: Te, useExisting: $f$1 },
    { provide: De$2, useClass: Mn$1 },
    { provide: Vn$1, useValue: true },
  ];
}
var zE = (() => {
  class e {
    compileModuleSync(n) {
      return new Fo$1(n);
    }
    compileModuleAsync(n) {
      return Promise.resolve(this.compileModuleSync(n));
    }
    clearCache() {}
    clearCacheFor(n) {}
    getModuleId(n) {}
    static ɵfac = function (r) {
      return new (r || e)();
    };
    static ɵprov = Jn$1({ token: e, factory: e.ɵfac });
  }
  return e;
})();
function QE() {
  return (typeof $localize < 'u' && $localize.locale) || nr$1;
}
var Ua = new N('', { factory: () => E$1(Ua, { optional: true, skipSelf: true }) || QE() });
var Gf$1 = new N('');
function it(e, t) {
  return yn$1(e, t?.equal);
}
function re(e) {
  return dc$1(e);
}
var Jo$1 = class Jo extends Error {
    dependency;
    constructor(t) {
      (super('Dependency error', { cause: t.error() }),
        (this.name = 'ResourceDependencyError'),
        (this.dependency = t));
    }
  },
  Rt$1 = class e extends Error {
    _brand;
    constructor(t) {
      super(t);
    }
    static IDLE = new e('IDLE');
    static LOADING = new e('LOADING');
  },
  ZE = (e) => e;
function Wa$1(e, t) {
  if (typeof e == 'function') {
    let n = fi$1(e, ZE, t?.equal);
    return Wf$1(n);
  } else {
    let n = fi$1(e.source, e.computation, e.equal);
    return Wf$1(n, e.debugName);
  }
}
function Wf$1(e, t) {
  let n = e[L],
    r = e;
  return (
    (r.set = (o) => lc$1(n, o)),
    (r.update = (o) => uc$1(n, o)),
    (r.asReadonly = Fn$1.bind(e)),
    r
  );
}
function YE(e) {
  let t = e.request,
    n = e.params ?? t ?? (() => null);
  return new Xo$1(
    n,
    JE(e),
    e.defaultValue,
    e.equal ? KE(e.equal) : void 0,
    e.debugName,
    e.injector ?? E$1(de$2),
    e.id,
  );
}
var qa$1 = class qa {
    value;
    isLoading;
    constructor(t, n) {
      ((this.value = t),
        (this.value.set = this.set.bind(this)),
        (this.value.update = this.update.bind(this)),
        (this.value.asReadonly = Fn$1),
        (this.isLoading = it(
          () => this.status() === 'loading' || this.status() === 'reloading',
          void 0,
        )));
    }
    isError = it(() => this.status() === 'error');
    update(t) {
      this.set(t(re(this.value)));
    }
    isValueDefined = it(() => (this.isError() ? false : this.value() !== void 0));
    _snapshot;
    get snapshot() {
      return (this._snapshot ??= it(() => {
        let t = this.status();
        return t === 'error'
          ? { status: 'error', error: this.error() }
          : { status: t, value: this.value() };
      }));
    }
    hasValue() {
      return this.isValueDefined();
    }
    asReadonly() {
      return this;
    }
  },
  Xo$1 = class Xo extends qa$1 {
    loaderFn;
    equal;
    debugName;
    transferCacheKey;
    pendingTasks;
    state;
    extRequest;
    effectRef;
    pendingController;
    resolvePendingTask = void 0;
    destroyed = false;
    unregisterOnDestroy;
    status;
    error;
    transferState;
    constructor(t, n, r, o, i, s, a, c) {
      if (Zf$1()) throw Yf$1();
      (super(
        it(
          () => {
            let u = this.state().stream?.();
            if (!u || (this.state().status === 'loading' && this.error())) return r;
            if (!Ga$1(u)) throw new ti$1(this.error());
            return u.value;
          },
          { equal: o },
        ),
        i,
      ),
        (this.loaderFn = n),
        (this.equal = o),
        (this.debugName = i),
        (this.transferCacheKey = a));
      let l = s.get(Gf$1, void 0, { optional: true }) ?? { isActive: false };
      ((this.transferState = s.get(ao$1, void 0, { optional: true }) ?? void 0),
        (this.extRequest = Wa$1(
          () => {
            try {
              return (Qa$1(!0), { request: t(tI), reload: 0 });
            } catch (u) {
              return (
                Za$1(u),
                u === Rt$1.IDLE
                  ? { status: 'idle', reload: 0 }
                  : u === Rt$1.LOADING
                    ? { status: 'loading', reload: 0 }
                    : { error: u, reload: 0 }
              );
            } finally {
              Qa$1(false);
            }
          },
          void 0,
        )),
        (this.state = Wa$1({
          source: this.extRequest,
          computation: (u, d) => {
            let { request: p, status: f, error: h } = u,
              m;
            if (h) ((f = 'resolved'), (m = _e({ error: ei$1(h) }, void 0)));
            else if (!f)
              if (d)
                ((f = p === void 0 ? 'idle' : 'loading'),
                  d.value.extRequest.request === p && (m = d.value.stream));
              else {
                let _ = this.transferState,
                  S = this.transferCacheKey;
                (l.isActive &&
                  S &&
                  _ &&
                  p !== void 0 &&
                  _.hasKey(S) &&
                  (m = _e({ value: _.get(S, r) }, void 0)),
                  m || (m = c?.(u.request)),
                  (c = void 0),
                  (f = p === void 0 ? 'idle' : m ? 'resolved' : 'loading'));
              }
            return {
              extRequest: u,
              status: f,
              previousStatus: d ? qf$1(d.value) : 'idle',
              stream: m,
            };
          },
        })),
        (this.effectRef = bs(this.loadEffect.bind(this), { injector: s, manualCleanup: true })),
        (this.pendingTasks = s.get(uo$1)),
        (this.unregisterOnDestroy = s.get(Ve$1).onDestroy(() => this.destroy())),
        (this.status = it(() => qf$1(this.state()), void 0)),
        (this.error = it(
          () => {
            let u = this.state().stream?.();
            return u && !Ga$1(u) ? u.error : void 0;
          },
          void 0,
        )));
    }
    set(t) {
      if (this.destroyed) return;
      let n = re(this.error),
        r = re(this.state);
      if (!n) {
        let o = re(this.value);
        if (r.status === 'local' && (this.equal ? this.equal(o, t) : o === t)) return;
      }
      (this.state.set({
        extRequest: r.extRequest,
        status: 'local',
        previousStatus: 'local',
        stream: _e({ value: t }, void 0),
      }),
        this.abortInProgressLoad());
    }
    reload() {
      let { status: t } = re(this.state);
      return t === 'idle' || t === 'loading'
        ? false
        : (this.extRequest.update(({ request: n, reload: r }) => ({ request: n, reload: r + 1 })),
          true);
    }
    destroy() {
      ((this.destroyed = true),
        this.unregisterOnDestroy(),
        this.effectRef.destroy(),
        this.abortInProgressLoad(),
        this.state.set({
          extRequest: { request: void 0, reload: 0 },
          status: 'idle',
          previousStatus: 'idle',
          stream: void 0,
        }));
    }
    async loadEffect() {
      let t = this.extRequest(),
        { status: n, previousStatus: r } = re(this.state);
      if (t.request === void 0) return;
      if (n !== 'loading') return;
      this.abortInProgressLoad();
      let o = (this.resolvePendingTask = this.pendingTasks.add()),
        { signal: i } = (this.pendingController = new AbortController());
      try {
        let s = re(() =>
            this.loaderFn({ params: t.request, abortSignal: i, previous: { status: r } }),
          ),
          a = () => i.aborted || re(this.extRequest) !== t;
        if (Hn$1(s)) {
          if (a()) return;
          this.state.set({
            extRequest: t,
            status: 'resolved',
            previousStatus: 'resolved',
            stream: s,
          });
          let c = re(s);
        } else {
          let c = await s;
          if (a()) return;
          this.state.set({
            extRequest: t,
            status: 'resolved',
            previousStatus: 'resolved',
            stream: c,
          });
          let l = c ? re(c) : void 0;
        }
      } catch (s) {
        if ((Za$1(s), i.aborted || re(this.extRequest) !== t)) return;
        this.state.set({
          extRequest: t,
          status: 'resolved',
          previousStatus: 'error',
          stream: _e({ error: ei$1(s) }, void 0),
        });
      } finally {
        (o?.(), (o = void 0));
      }
    }
    abortInProgressLoad() {
      (re(() => this.pendingController?.abort()),
        (this.pendingController = void 0),
        this.resolvePendingTask?.(),
        (this.resolvePendingTask = void 0));
    }
  };
function KE(e) {
  return (t, n) => (t === void 0 || n === void 0 ? t === n : e(t, n));
}
function JE(e) {
  return XE(e)
    ? e.stream
    : async (t) => {
        try {
          return _e({ value: await e.loader(t) }, void 0);
        } catch (n) {
          return _e({ error: ei$1(n) }, void 0);
        }
      };
}
function XE(e) {
  return !!e.stream;
}
function qf$1(e) {
  switch (e.status) {
    case 'loading':
      return e.extRequest.reload === 0 ? 'loading' : 'reloading';
    case 'resolved':
      return Ga$1(e.stream()) ? 'resolved' : 'error';
    default:
      return e.status;
  }
}
function Ga$1(e) {
  return e.error === void 0;
}
function ei$1(e) {
  return eI(e) ? e : new za(e);
}
function eI(e) {
  return (
    e instanceof Error ||
    (typeof e == 'object' && typeof e.name == 'string' && typeof e.message == 'string')
  );
}
var ti$1 = class ti extends Error {
    constructor(t) {
      super(t.message, { cause: t });
    }
  },
  za = class extends Error {
    constructor(t) {
      super(String(t), { cause: t });
    }
  };
function zf$1(e) {
  switch (e.status()) {
    case 'idle':
      throw Rt$1.IDLE;
    case 'error':
      throw new Jo$1(e);
    case 'loading':
    case 'reloading':
      throw Rt$1.LOADING;
  }
  return e.value();
}
var tI = { chain: zf$1 },
  Qf$1 = false;
function Zf$1() {
  return Qf$1;
}
function Qa$1(e) {
  Qf$1 = e;
}
function Yf$1() {
  return new C(992, false);
}
function Za$1(e) {
  if (e instanceof C && e.code === 992) throw e;
}
var tp$1 = Symbol('InputSignalNode#UNSET'),
  nI = V(j$1({}, vn$1), {
    transformFn: void 0,
    applyValueToInputSignal(e, t) {
      lt$1(e, t);
    },
  });
function np$1(e, t) {
  let n = Object.create(nI);
  ((n.value = e), (n.transformFn = t?.transform));
  function r() {
    if ((Ue$1(n), n.value === tp$1)) {
      let o = null;
      throw new C(-950, o);
    }
    return n.value;
  }
  return ((r[L] = n), r);
}
var Kf$1 = class Kf {
  attributeName;
  constructor(t) {
    this.attributeName = t;
  }
  __NG_ELEMENT_ID__ = () => Lu$1(this.attributeName);
  toString() {
    return `HostAttributeToken ${this.attributeName}`;
  }
};
function mO(e) {
  return rI(e) ? e.default : e;
}
function rI(e) {
  return e && typeof e == 'object' && 'default' in e;
}
function Jf$1(e, t) {
  return np$1(e, t);
}
function oI(e) {
  return np$1(tp$1, e);
}
var yO = ((Jf$1.required = oI), Jf$1);
function Xf$1(e, t) {
  return Ra();
}
function iI(e, t) {
  return Oa();
}
var vO = ((Xf$1.required = iI), Xf$1);
function ep$1(e, t) {
  return Ra();
}
function sI(e, t) {
  return Oa();
}
var EO = ((ep$1.required = sI), ep$1);
var DO = (() => {
  class e {
    static __NG_ELEMENT_ID__ = cI;
  }
  return e;
})();
function cI(e) {
  return lI(B(), I(), (e & 16) === 16);
}
function lI(e, t, n) {
  if (je(e) && !n) {
    let r = le(e.index, t);
    return new ot$1(r, r);
  } else if (e.type & 175) {
    let r = t[Y];
    return new ot$1(r, t);
  }
  return null;
}
var Ka$1 = new N(''),
  uI = new N('');
function rr$1(e) {
  return !e.moduleRef;
}
function dI(e) {
  let t = rr$1(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(De$2);
  return n.run(() => {
    rr$1(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let r = t.get(nt),
      o;
    if (
      (n.runOutsideAngular(() => {
        o = n.onError.subscribe({ next: r });
      }),
      rr$1(e))
    ) {
      let i = () => t.destroy(),
        s = e.platformInjector.get(Ka$1);
      (s.add(i),
        t.onDestroy(() => {
          (o.unsubscribe(), s.delete(i));
        }));
    } else {
      let i = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(Ka$1);
      (s.add(i),
        e.moduleRef.onDestroy(() => {
          (Un$1(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i));
        }));
    }
    return pI(r, n, () => {
      let i = t.get(Mt),
        s = i.add(),
        a = t.get(La);
      return (
        a.runInitializers(),
        a.donePromise
          .then(() => {
            let c = t.get(Ua, nr$1);
            if ((wf$1(c || nr$1), !t.get(uI, !0)))
              return rr$1(e) ? t.get(Ko$1) : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
            if (rr$1(e)) {
              let u = t.get(Ko$1);
              return (e.rootComponent !== void 0 && u.bootstrap(e.rootComponent), u);
            } else return (fI?.(e.moduleRef, e.allPlatformModules), e.moduleRef);
          })
          .finally(() => {
            i.remove(s);
          })
      );
    });
  });
}
var fI;
function pI(e, t, n) {
  try {
    let r = n();
    return Pa(r)
      ? r.catch((o) => {
          throw (t.runOutsideAngular(() => e(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e(r)), r);
  }
}
var ni$1 = null;
function hI(e = [], t) {
  return de$2.create({
    name: t,
    providers: [
      { provide: Yi$1, useValue: 'platform' },
      { provide: Ka$1, useValue: new Set([() => (ni$1 = null)]) },
      ...e,
    ],
  });
}
function gI(e = []) {
  if (ni$1) return ni$1;
  let t = hI(e);
  return ((ni$1 = t), mf$1(), mI(t), t);
}
function mI(e) {
  let t = e.get(Ll$1, null);
  Zr$1(e, () => {
    t?.forEach((n) => n());
  });
}
function TO(e) {
  let { rootComponent: t, appProviders: n, platformProviders: r, platformRef: o } = e;
  k(M$1.BootstrapApplicationStart);
  try {
    let i = o?.injector ?? gI(r),
      s = [Uf$1(), Pl$1, ...(n || [])],
      a = new Zn$1({ providers: s, parent: i, debugName: '', runEnvironmentInitializers: !1 });
    return dI({ r3Injector: a.injector, platformInjector: i, rootComponent: t });
  } catch (i) {
    return Promise.reject(i);
  } finally {
    k(M$1.BootstrapApplicationEnd);
  }
}
function wO(e) {
  return typeof e == 'boolean' ? e : e != null && e !== 'false';
}
function CO(e, t = NaN) {
  return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t;
}
var Ya$1 = Symbol('NOT_SET'),
  rp$1 = new Set(),
  yI = V(j$1({}, vn$1), {
    kind: 'afterRenderEffectPhase',
    consumerIsAlwaysLive: true,
    consumerAllowSignalWrites: true,
    value: Ya$1,
    cleanup: null,
    consumerMarkedDirty() {
      if (this.sequence.impl.executing) {
        if (this.sequence.lastPhase === null || this.sequence.lastPhase < this.phase) return;
        this.sequence.erroredOrDestroyed = true;
      }
      this.sequence.scheduler.notify(7);
    },
    phaseFn(e) {
      if (((this.sequence.lastPhase = this.phase), !this.dirty)) return this.signal;
      if (((this.dirty = false), this.value !== Ya$1 && !Pt(this))) return this.signal;
      try {
        for (let o of this.cleanup ?? rp$1) o();
      } finally {
        this.cleanup?.clear();
      }
      let t = [];
      (e !== void 0 && t.push(e), t.push(this.registerCleanupFn));
      let n = Se$1(this),
        r;
      try {
        r = this.userFn.apply(null, t);
      } finally {
        We$1(this, n);
      }
      return (
        (this.value === Ya$1 || !this.equal(this.value, r)) && ((this.value = r), this.version++),
        this.signal
      );
    },
  }),
  Ja$1 = class Ja extends Mo$1 {
    scheduler;
    lastPhase = null;
    nodes = [void 0, void 0, void 0, void 0];
    onDestroyFns = null;
    constructor(t, n, r, o, i, s = null) {
      (super(t, [void 0, void 0, void 0, void 0], r, false, i.get(Ve$1), s), (this.scheduler = o));
      for (let a of Ia) {
        let c = n[a];
        if (c === void 0) continue;
        let l = Object.create(yI);
        ((l.sequence = this),
          (l.phase = a),
          (l.userFn = c),
          (l.dirty = true),
          (l.signal = () => (Ue$1(l), l.value)),
          (l.signal[L] = l),
          (l.registerCleanupFn = (u) => (l.cleanup ??= new Set()).add(u)),
          (this.nodes[a] = l),
          (this.hooks[a] = (u) => l.phaseFn(u)));
      }
    }
    afterRun() {
      (super.afterRun(), (this.lastPhase = null));
    }
    destroy() {
      if (this.onDestroyFns !== null) for (let t of this.onDestroyFns) t();
      super.destroy();
      for (let t of this.nodes)
        if (t)
          try {
            for (let n of t.cleanup ?? rp$1) n();
          } finally {
            qe$1(t);
          }
    }
  };
function bO(e, t) {
  let n = E$1(de$2),
    r = n.get(Te),
    o = n.get(Ea),
    i = n.get(dn$1, null, { optional: true });
  o.impl ??= n.get(fd$1);
  let s = e;
  typeof s == 'function' && (s = { mixedReadWrite: e });
  let a = n.get(jn$1, null, { optional: true }),
    c = new Ja$1(
      o.impl,
      [s.earlyRead, s.write, s.mixedReadWrite, s.read],
      a?.view,
      r,
      n,
      i?.snapshot(null),
    );
  return (o.impl.register(c), c);
}
function _O(e, t) {
  let n = Oe$1(e),
    r = t.elementInjector || Qt$1();
  return new At$1(n).create(
    r,
    t.projectableNodes,
    t.hostElement,
    t.environmentInjector,
    t.directives,
    t.bindings,
  );
}
function MO(e) {
  let t = Oe$1(e);
  if (!t) return null;
  let n = new At$1(t);
  return {
    get selector() {
      return n.selector;
    },
    get type() {
      return n.componentType;
    },
    get inputs() {
      return n.inputs;
    },
    get outputs() {
      return n.outputs;
    },
    get ngContentSelectors() {
      return n.ngContentSelectors;
    },
    get isStandalone() {
      return t.standalone;
    },
    get isSignal() {
      return t.signals;
    },
  };
}
var Va = null;
function $e() {
  return Va;
}
function As(n) {
  Va ??= n;
}
var Pn = class {},
  Wr = (() => {
    class n {
      historyGo(e) {
        throw new Error('');
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = ee({ token: n, factory: () => E$1(qa), providedIn: 'platform' });
    }
    return n;
  })();
var qa = (() => {
  class n extends Wr {
    _location;
    _history;
    _doc = E$1(tn$1);
    constructor() {
      (super(), (this._location = window.location), (this._history = window.history));
    }
    getBaseHrefFromDOM() {
      return $e().getBaseHref(this._doc);
    }
    onPopState(e) {
      let r = $e().getGlobalEventTarget(this._doc, 'window');
      return (r.addEventListener('popstate', e, false), () => r.removeEventListener('popstate', e));
    }
    onHashChange(e) {
      let r = $e().getGlobalEventTarget(this._doc, 'window');
      return (
        r.addEventListener('hashchange', e, false),
        () => r.removeEventListener('hashchange', e)
      );
    }
    get href() {
      return this._location.href;
    }
    get protocol() {
      return this._location.protocol;
    }
    get hostname() {
      return this._location.hostname;
    }
    get port() {
      return this._location.port;
    }
    get pathname() {
      return this._location.pathname;
    }
    get search() {
      return this._location.search;
    }
    get hash() {
      return this._location.hash;
    }
    set pathname(e) {
      this._location.pathname = e;
    }
    pushState(e, r, i) {
      this._history.pushState(e, r, i);
    }
    replaceState(e, r, i) {
      this._history.replaceState(e, r, i);
    }
    forward() {
      this._history.forward();
    }
    back() {
      this._history.back();
    }
    historyGo(e = 0) {
      this._history.go(e);
    }
    getState() {
      return this._history.state;
    }
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵprov = ee({ token: n, factory: () => new n(), providedIn: 'platform' });
  }
  return n;
})();
function Ka(n, t) {
  return n
    ? t
      ? n.endsWith('/')
        ? t.startsWith('/')
          ? n + t.slice(1)
          : n + t
        : t.startsWith('/')
          ? n + t
          : `${n}/${t}`
      : n
    : t;
}
function Ga(n) {
  let t = n.search(/#|\?|$/);
  return n[t - 1] === '/' ? n.slice(0, t - 1) + n.slice(t) : n;
}
function ot(n) {
  return n && n[0] !== '?' ? `?${n}` : n;
}
var $t = (() => {
    class n {
      historyGo(e) {
        throw new Error('');
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = ee({ token: n, factory: () => E$1(ed), providedIn: 'root' });
    }
    return n;
  })(),
  Qu = new N(''),
  ed = (() => {
    class n extends $t {
      _platformLocation;
      _baseHref;
      _removeListenerFns = [];
      constructor(e, r) {
        (super(),
          (this._platformLocation = e),
          (this._baseHref =
            r ?? this._platformLocation.getBaseHrefFromDOM() ?? E$1(tn$1).location?.origin ?? ''));
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; ) this._removeListenerFns.pop()();
      }
      onPopState(e) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(e),
          this._platformLocation.onHashChange(e),
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(e) {
        return Ka(this._baseHref, e);
      }
      path(e = false) {
        let r = this._platformLocation.pathname + ot(this._platformLocation.search),
          i = this._platformLocation.hash;
        return i && e ? `${r}${i}` : r;
      }
      pushState(e, r, i, s) {
        let o = this.prepareExternalUrl(i + ot(s));
        this._platformLocation.pushState(e, r, o);
      }
      replaceState(e, r, i, s) {
        let o = this.prepareExternalUrl(i + ot(s));
        this._platformLocation.replaceState(e, r, o);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(e = 0) {
        this._platformLocation.historyGo?.(e);
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie(Wr), Ie(Qu, 8));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
    }
    return n;
  })();
var zt = (() => {
  class n {
    _subject = new J$1();
    _basePath;
    _locationStrategy;
    _urlChangeListeners = [];
    _urlChangeSubscription = null;
    constructor(e) {
      this._locationStrategy = e;
      let r = this._locationStrategy.getBaseHref();
      ((this._basePath = rd(Ga(Wa(r)))),
        this._locationStrategy.onPopState((i) => {
          this._subject.next({ url: this.path(true), pop: true, state: i.state, type: i.type });
        }));
    }
    ngOnDestroy() {
      (this._urlChangeSubscription?.unsubscribe(), (this._urlChangeListeners = []));
    }
    path(e = false) {
      return this.normalize(this._locationStrategy.path(e));
    }
    getState() {
      return this._locationStrategy.getState();
    }
    isCurrentPathEqualTo(e, r = '') {
      return this.path() == this.normalize(e + ot(r));
    }
    normalize(e) {
      return n.stripTrailingSlash(nd(this._basePath, Wa(e)));
    }
    prepareExternalUrl(e) {
      return (e && e[0] !== '/' && (e = '/' + e), this._locationStrategy.prepareExternalUrl(e));
    }
    go(e, r = '', i = null) {
      (this._locationStrategy.pushState(i, '', e, r),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(e + ot(r)), i));
    }
    replaceState(e, r = '', i = null) {
      (this._locationStrategy.replaceState(i, '', e, r),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(e + ot(r)), i));
    }
    forward() {
      this._locationStrategy.forward();
    }
    back() {
      this._locationStrategy.back();
    }
    historyGo(e = 0) {
      this._locationStrategy.historyGo?.(e);
    }
    onUrlChange(e) {
      return (
        this._urlChangeListeners.push(e),
        (this._urlChangeSubscription ??= this.subscribe((r) => {
          this._notifyUrlChangeListeners(r.url, r.state);
        })),
        () => {
          let r = this._urlChangeListeners.indexOf(e);
          (this._urlChangeListeners.splice(r, 1),
            this._urlChangeListeners.length === 0 &&
              (this._urlChangeSubscription?.unsubscribe(), (this._urlChangeSubscription = null)));
        }
      );
    }
    _notifyUrlChangeListeners(e = '', r) {
      this._urlChangeListeners.forEach((i) => i(e, r));
    }
    subscribe(e, r, i) {
      return this._subject.subscribe({ next: e, error: r ?? void 0, complete: i ?? void 0 });
    }
    static normalizeQueryParams = ot;
    static joinWithSlash = Ka;
    static stripTrailingSlash = Ga;
    static ɵfac = function (r) {
      return new (r || n)(Ie($t));
    };
    static ɵprov = ee({ token: n, factory: () => td(), providedIn: 'root' });
  }
  return n;
})();
function td() {
  return new zt(Ie($t));
}
function nd(n, t) {
  if (!n || !t.startsWith(n)) return t;
  let e = t.substring(n.length);
  return e === '' || ['/', ';', '?', '#'].includes(e[0]) ? e : t;
}
function Wa(n) {
  return n.replace(/\/index\.html$/, '');
}
function rd(n) {
  if (new RegExp('^(https?:)?//').test(n)) {
    let [, e] = n.split(/\/\/[^\/]+/);
    return e;
  }
  return n;
}
var id = (() => {
  class n {
    _viewContainerRef;
    _viewRef = null;
    ngTemplateOutletContext = null;
    ngTemplateOutlet = null;
    ngTemplateOutletInjector = null;
    injector = E$1(de$2);
    constructor(e) {
      this._viewContainerRef = e;
    }
    ngOnChanges(e) {
      if (this._shouldRecreateView(e)) {
        let r = this._viewContainerRef;
        if ((this._viewRef && r.remove(r.indexOf(this._viewRef)), !this.ngTemplateOutlet)) {
          this._viewRef = null;
          return;
        }
        let i = this._createContextForwardProxy();
        this._viewRef = r.createEmbeddedView(this.ngTemplateOutlet, i, {
          injector: this._getInjector(),
        });
      }
    }
    _getInjector() {
      return this.ngTemplateOutletInjector === 'outlet'
        ? this.injector
        : (this.ngTemplateOutletInjector ?? void 0);
    }
    _shouldRecreateView(e) {
      return !!e.ngTemplateOutlet || !!e.ngTemplateOutletInjector;
    }
    _createContextForwardProxy() {
      return new Proxy(
        {},
        {
          set: (e, r, i) =>
            this.ngTemplateOutletContext ? Reflect.set(this.ngTemplateOutletContext, r, i) : false,
          get: (e, r, i) => {
            if (this.ngTemplateOutletContext)
              return Reflect.get(this.ngTemplateOutletContext, r, i);
          },
        },
      );
    }
    static ɵfac = function (r) {
      return new (r || n)(Zo$1(Yo$1));
    };
    static ɵdir = Lv({
      type: n,
      selectors: [['', 'ngTemplateOutlet', '']],
      inputs: {
        ngTemplateOutletContext: 'ngTemplateOutletContext',
        ngTemplateOutlet: 'ngTemplateOutlet',
        ngTemplateOutletInjector: 'ngTemplateOutletInjector',
      },
      features: [sg$1],
    });
  }
  return n;
})();
function Is(n, t) {
  t = encodeURIComponent(t);
  for (let e of n.split(';')) {
    let r = e.indexOf('='),
      [i, s] = r == -1 ? [e, ''] : [e.slice(0, r), e.slice(r + 1)];
    if (i.trim() === t) return decodeURIComponent(s);
  }
  return null;
}
var ks = 'browser';
function Ja(n) {
  return n === ks;
}
var Mn = class {
    _doc;
    constructor(t) {
      this._doc = t;
    }
    manager;
  },
  Kr = (() => {
    class n extends Mn {
      constructor(e) {
        super(e);
      }
      supports(e) {
        return true;
      }
      addEventListener(e, r, i, s) {
        return (e.addEventListener(r, i, s), () => this.removeEventListener(e, r, i, s));
      }
      removeEventListener(e, r, i, s) {
        return e.removeEventListener(r, i, s);
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie(tn$1));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  Xr = new N(''),
  Ms = (() => {
    class n {
      _zone;
      _plugins;
      _eventNameToPlugin = new Map();
      constructor(e, r) {
        ((this._zone = r),
          e.forEach((o) => {
            o.manager = this;
          }));
        let i = e.filter((o) => !(o instanceof Kr));
        this._plugins = i.slice().reverse();
        let s = e.find((o) => o instanceof Kr);
        s && this._plugins.push(s);
      }
      addEventListener(e, r, i, s) {
        return this._findPluginFor(r).addEventListener(e, r, i, s);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(e) {
        let r = this._eventNameToPlugin.get(e);
        if (r) return r;
        if (((r = this._plugins.find((s) => s.supports(e))), !r)) throw new C(5101, false);
        return (this._eventNameToPlugin.set(e, r), r);
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie(Xr), Ie(De$2));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  Os = 'ng-app-id';
function Ya(n) {
  for (let t of n) t.remove();
}
function Xa(n, t) {
  let e = t.createElement('style');
  return ((e.textContent = n), e);
}
function cd(n, t, e, r) {
  let i = n.head?.querySelectorAll(`style[${Os}="${t}"],link[${Os}="${t}"]`);
  if (!i || i.length === 0) return false;
  for (let s of i)
    (s.removeAttribute(Os),
      s instanceof HTMLLinkElement
        ? r.set(s.href.slice(s.href.lastIndexOf('/') + 1), { usage: 0, elements: [s] })
        : s.textContent && e.set(s.textContent, { usage: 0, elements: [s] }));
  return true;
}
function Ps(n, t) {
  let e = t.createElement('link');
  return (e.setAttribute('rel', 'stylesheet'), e.setAttribute('href', n), e);
}
var Ns = (() => {
    class n {
      doc;
      appId;
      nonce;
      inline = new Map();
      external = new Map();
      hosts = new Set();
      constructor(e, r, i, s = {}) {
        ((this.doc = e),
          (this.appId = r),
          (this.nonce = i),
          cd(e, r, this.inline, this.external) && this.hosts.add(e.head));
      }
      addStyles(e, r) {
        for (let i of e) this.addUsage(i, this.inline, Xa);
        r?.forEach((i) => this.addUsage(i, this.external, Ps));
      }
      removeStyles(e, r) {
        for (let i of e) this.removeUsage(i, this.inline);
        r?.forEach((i) => this.removeUsage(i, this.external));
      }
      addUsage(e, r, i) {
        let s = r.get(e);
        s
          ? s.usage++
          : r.set(e, {
              usage: 1,
              elements: [...this.hosts].map((o) => this.addElement(o, i(e, this.doc))),
            });
      }
      removeUsage(e, r) {
        let i = r.get(e);
        i && (i.usage--, i.usage <= 0 && (Ya(i.elements), r.delete(e)));
      }
      ngOnDestroy() {
        for (let [, { elements: e }] of [...this.inline, ...this.external]) Ya(e);
        this.hosts.clear();
      }
      addHost(e) {
        if (!this.hosts.has(e)) {
          this.hosts.add(e);
          for (let [r, { elements: i }] of this.inline) i.push(this.addElement(e, Xa(r, this.doc)));
          for (let [r, { elements: i }] of this.external)
            i.push(this.addElement(e, Ps(r, this.doc)));
        }
      }
      removeHost(e) {
        this.hosts.delete(e);
        for (let r of [...this.inline.values(), ...this.external.values()]) {
          let i = [];
          for (let s of r.elements) s.parentNode === e ? s.remove() : i.push(s);
          r.elements = i;
        }
      }
      addElement(e, r) {
        return (this.nonce && r.setAttribute('nonce', this.nonce), e.appendChild(r));
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie(tn$1), Ie(ws), Ie(Bh$1, 8), Ie(Vh$1));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  xs = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    math: 'http://www.w3.org/1998/Math/MathML',
  },
  Ls = /%COMP%/g;
var Qa = '%COMP%',
  ld = `_nghost-${Qa}`,
  ud = `_ngcontent-${Qa}`,
  dd = true,
  hd = new N('', { factory: () => dd });
function fd(n) {
  return ud.replace(Ls, n);
}
function pd(n) {
  return ld.replace(Ls, n);
}
function ec(n, t) {
  return t.map((e) => e.replace(Ls, n));
}
var Fs = (() => {
    class n {
      eventManager;
      sharedStylesHost;
      appId;
      removeStylesOnCompDestroy;
      doc;
      ngZone;
      nonce;
      tracingService;
      rendererByCompId = new Map();
      defaultRenderer;
      constructor(e, r, i, s, o, a, c = null, l = null) {
        ((this.eventManager = e),
          (this.sharedStylesHost = r),
          (this.appId = i),
          (this.removeStylesOnCompDestroy = s),
          (this.doc = o),
          (this.ngZone = a),
          (this.nonce = c),
          (this.tracingService = l),
          (this.defaultRenderer = new Nn(e, o, a, this.tracingService)));
      }
      createRenderer(e, r) {
        if (!e || !r) return this.defaultRenderer;
        let i = this.getOrCreateRenderer(e, r);
        return (i instanceof Yr ? i.applyToHost(e) : i instanceof Ln && i.applyStyles(), i);
      }
      getOrCreateRenderer(e, r) {
        let i = this.rendererByCompId,
          s = i.get(r.id);
        if (!s) {
          let o = this.doc,
            a = this.ngZone,
            c = this.eventManager,
            l = this.sharedStylesHost,
            u = this.removeStylesOnCompDestroy,
            d = this.tracingService;
          switch (r.encapsulation) {
            case St$1.Emulated:
              s = new Yr(c, l, r, this.appId, u, o, a, d);
              break;
            case St$1.ShadowDom:
              return new Jr(c, e, r, o, a, this.nonce, d, l);
            case St$1.ExperimentalIsolatedShadowDom:
              return new Jr(c, e, r, o, a, this.nonce, d);
            default:
              s = new Ln(c, l, r, u, o, a, d);
              break;
          }
          i.set(r.id, s);
        }
        return s;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      componentReplaced(e) {
        this.rendererByCompId.delete(e);
      }
      static ɵfac = function (r) {
        return new (r || n)(
          Ie(Ms),
          Ie($d$1),
          Ie(ws),
          Ie(hd),
          Ie(tn$1),
          Ie(De$2),
          Ie(Bh$1),
          Ie(dn$1, 8),
        );
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  Nn = class {
    eventManager;
    doc;
    ngZone;
    tracingService;
    data = Object.create(null);
    throwOnSyntheticProps = true;
    constructor(t, e, r, i) {
      ((this.eventManager = t), (this.doc = e), (this.ngZone = r), (this.tracingService = i));
    }
    destroy() {}
    destroyNode = null;
    createElement(t, e) {
      return e ? this.doc.createElementNS(xs[e] || e, t) : this.doc.createElement(t);
    }
    createComment(t) {
      return this.doc.createComment(t);
    }
    createText(t) {
      return this.doc.createTextNode(t);
    }
    appendChild(t, e) {
      (Za(t) ? t.content : t).appendChild(e);
    }
    insertBefore(t, e, r) {
      t && (Za(t) ? t.content : t).insertBefore(e, r);
    }
    removeChild(t, e) {
      e.remove();
    }
    selectRootElement(t, e) {
      let r = typeof t == 'string' ? this.doc.querySelector(t) : t;
      if (!r) throw new C(-5104, false);
      return (e || (r.textContent = ''), r);
    }
    parentNode(t) {
      return t.parentNode;
    }
    nextSibling(t) {
      return t.nextSibling;
    }
    setAttribute(t, e, r, i) {
      if (i) {
        e = i + ':' + e;
        let s = xs[i];
        s ? t.setAttributeNS(s, e, r) : t.setAttribute(e, r);
      } else t.setAttribute(e, r);
    }
    removeAttribute(t, e, r) {
      if (r) {
        let i = xs[r];
        i ? t.removeAttributeNS(i, e) : t.removeAttribute(`${r}:${e}`);
      } else t.removeAttribute(e);
    }
    addClass(t, e) {
      t.classList.add(e);
    }
    removeClass(t, e) {
      t.classList.remove(e);
    }
    setStyle(t, e, r, i) {
      i & (_o$1.DashCase | _o$1.Important)
        ? t.style.setProperty(e, r, i & _o$1.Important ? 'important' : '')
        : (t.style[e] = r);
    }
    removeStyle(t, e, r) {
      r & _o$1.DashCase ? t.style.removeProperty(e) : (t.style[e] = '');
    }
    setProperty(t, e, r) {
      t != null && (t[e] = r);
    }
    setValue(t, e) {
      t.nodeValue = e;
    }
    listen(t, e, r, i) {
      if (typeof t == 'string' && ((t = $e().getGlobalEventTarget(this.doc, t)), !t))
        throw new C(5102, false);
      let s = this.decoratePreventDefault(r);
      return (
        this.tracingService?.wrapEventListener &&
          (s = this.tracingService.wrapEventListener(t, e, s)),
        this.eventManager.addEventListener(t, e, s, i)
      );
    }
    decoratePreventDefault(t) {
      return (e) => {
        if (e === '__ngUnwrap__') return t;
        t(e) === false && e.preventDefault();
      };
    }
  };
function Za(n) {
  return n.tagName === 'TEMPLATE' && n.content !== void 0;
}
var Jr = class extends Nn {
    hostEl;
    sharedStylesHost;
    shadowRoot;
    constructor(t, e, r, i, s, o, a, c) {
      (super(t, i, s, a),
        (this.hostEl = e),
        (this.sharedStylesHost = c),
        (this.shadowRoot = e.attachShadow({ mode: 'open' })),
        this.sharedStylesHost && this.sharedStylesHost.addHost(this.shadowRoot));
      let l = r.styles;
      l = ec(r.id, l);
      for (let d of l) {
        let h = document.createElement('style');
        (o && h.setAttribute('nonce', o), (h.textContent = d), this.shadowRoot.appendChild(h));
      }
      let u = r.getExternalStyles?.();
      if (u)
        for (let d of u) {
          let h = Ps(d, i);
          (o && h.setAttribute('nonce', o), this.shadowRoot.appendChild(h));
        }
    }
    nodeOrShadowRoot(t) {
      return t === this.hostEl ? this.shadowRoot : t;
    }
    appendChild(t, e) {
      return super.appendChild(this.nodeOrShadowRoot(t), e);
    }
    insertBefore(t, e, r) {
      return super.insertBefore(this.nodeOrShadowRoot(t), e, r);
    }
    removeChild(t, e) {
      return super.removeChild(null, e);
    }
    parentNode(t) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(t)));
    }
    destroy() {
      this.sharedStylesHost && this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  Ln = class extends Nn {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(t, e, r, i, s, o, a, c) {
      (super(t, s, o, a), (this.sharedStylesHost = e), (this.removeStylesOnCompDestroy = i));
      let l = r.styles;
      ((this.styles = c ? ec(c, l) : l), (this.styleUrls = r.getExternalStyles?.(c)));
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        qn$1.size === 0 &&
        this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
    }
  },
  Yr = class extends Ln {
    contentAttr;
    hostAttr;
    constructor(t, e, r, i, s, o, a, c) {
      let l = i + '-' + r.id;
      (super(t, e, r, s, o, a, c, l), (this.contentAttr = fd(l)), (this.hostAttr = pd(l)));
    }
    applyToHost(t) {
      (this.applyStyles(), this.setAttribute(t, this.hostAttr, ''));
    }
    createElement(t, e) {
      let r = super.createElement(t, e);
      return (super.setAttribute(r, this.contentAttr, ''), r);
    }
  };
var Zr = class n extends Pn {
    supportsDOMEvents = true;
    static makeCurrent() {
      As(new n());
    }
    onAndCancel(t, e, r, i) {
      return (
        t.addEventListener(e, r, i),
        () => {
          t.removeEventListener(e, r, i);
        }
      );
    }
    dispatchEvent(t, e) {
      t.dispatchEvent(e);
    }
    remove(t) {
      t.remove();
    }
    createElement(t, e) {
      return ((e = e || this.getDefaultDocument()), e.createElement(t));
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument('fakeTitle');
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(t) {
      return t.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(t) {
      return t instanceof DocumentFragment;
    }
    getGlobalEventTarget(t, e) {
      return e === 'window' ? window : e === 'document' ? t : e === 'body' ? t.body : null;
    }
    getBaseHref(t) {
      let e = gd();
      return e == null ? null : vd(e);
    }
    resetBaseElement() {
      Fn = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(t) {
      return Is(document.cookie, t);
    }
  },
  Fn = null;
function gd() {
  return ((Fn = Fn || document.head.querySelector('base')), Fn ? Fn.getAttribute('href') : null);
}
function vd(n) {
  return new URL(n, document.baseURI).pathname;
}
var tc = ['alt', 'control', 'meta', 'shift'],
  bd = {
    '\b': 'Backspace',
    '	': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    Del: 'Delete',
    Esc: 'Escape',
    Left: 'ArrowLeft',
    Right: 'ArrowRight',
    Up: 'ArrowUp',
    Down: 'ArrowDown',
    Menu: 'ContextMenu',
    Scroll: 'ScrollLock',
    Win: 'OS',
  },
  yd = {
    alt: (n) => n.altKey,
    control: (n) => n.ctrlKey,
    meta: (n) => n.metaKey,
    shift: (n) => n.shiftKey,
  },
  nc = (() => {
    class n extends Mn {
      constructor(e) {
        super(e);
      }
      supports(e) {
        return n.parseEventName(e) != null;
      }
      addEventListener(e, r, i, s) {
        let o = n.parseEventName(r),
          a = n.eventCallback(o.fullKey, i, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => $e().onAndCancel(e, o.domEventName, a, s));
      }
      static parseEventName(e) {
        let r = e.toLowerCase().split('.'),
          i = r.shift();
        if (r.length === 0 || !(i === 'keydown' || i === 'keyup')) return null;
        let s = n._normalizeKey(r.pop()),
          o = '',
          a = r.indexOf('code');
        if (
          (a > -1 && (r.splice(a, 1), (o = 'code.')),
          tc.forEach((l) => {
            let u = r.indexOf(l);
            u > -1 && (r.splice(u, 1), (o += l + '.'));
          }),
          (o += s),
          r.length != 0 || s.length === 0)
        )
          return null;
        let c = {};
        return ((c.domEventName = i), (c.fullKey = o), c);
      }
      static matchEventFullKeyCode(e, r) {
        let i = bd[e.key] || e.key,
          s = '';
        return (
          r.indexOf('code.') > -1 && ((i = e.code), (s = 'code.')),
          i == null || !i
            ? false
            : ((i = i.toLowerCase()),
              i === ' ' ? (i = 'space') : i === '.' && (i = 'dot'),
              tc.forEach((o) => {
                if (o !== i) {
                  let a = yd[o];
                  a(e) && (s += o + '.');
                }
              }),
              (s += i),
              s === r)
        );
      }
      static eventCallback(e, r, i) {
        return (s) => {
          n.matchEventFullKeyCode(s, e) && i.runGuarded(() => r(s));
        };
      }
      static _normalizeKey(e) {
        return e === 'esc' ? 'escape' : e;
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie(tn$1));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
async function _d(n, t, e) {
  let r = j$1({ rootComponent: n }, wd(t, e));
  return TO(r);
}
function wd(n, t) {
  return {
    platformRef: t?.platformRef,
    appProviders: [...Cd, ...(n?.providers ?? [])],
    platformProviders: Td,
  };
}
function Ed() {
  Zr.makeCurrent();
}
function Sd() {
  return new Qe();
}
function Dd() {
  return (Ag(document), document);
}
var Td = [
  { provide: Vh$1, useValue: ks },
  { provide: Ll$1, useValue: Ed, multi: true },
  { provide: tn$1, useFactory: Dd },
];
var Cd = [
  { provide: Yi$1, useValue: 'root' },
  { provide: Qe, useFactory: Sd },
  { provide: Xr, useClass: Kr, multi: true },
  { provide: Xr, useClass: nc, multi: true },
  Fs,
  { provide: $d$1, useClass: Ns },
  { provide: Ns, useExisting: $d$1 },
  Ms,
  { provide: Qn$1, useExisting: Fs },
  [],
];
var He = class n {
  headers;
  normalizedNames = new Map();
  lazyInit;
  lazyUpdate = null;
  constructor(t) {
    t
      ? typeof t == 'string'
        ? (this.lazyInit = () => {
            ((this.headers = new Map()),
              t
                .split(
                  `
`,
                )
                .forEach((e) => {
                  let r = e.indexOf(':');
                  if (r > 0) {
                    let i = e.slice(0, r),
                      s = e.slice(r + 1).trim();
                    this.addHeaderEntry(i, s);
                  }
                }));
          })
        : typeof Headers < 'u' && t instanceof Headers
          ? ((this.headers = new Map()),
            t.forEach((e, r) => {
              this.addHeaderEntry(r, e);
            }))
          : (this.lazyInit = () => {
              ((this.headers = new Map()),
                Object.entries(t).forEach(([e, r]) => {
                  this.setHeaderEntries(e, r);
                }));
            })
      : (this.headers = new Map());
  }
  has(t) {
    return (this.init(), this.headers.has(t.toLowerCase()));
  }
  get(t) {
    this.init();
    let e = this.headers.get(t.toLowerCase());
    return e && e.length > 0 ? e[0] : null;
  }
  keys() {
    return (this.init(), Array.from(this.normalizedNames.values()));
  }
  getAll(t) {
    return (this.init(), this.headers.get(t.toLowerCase()) || null);
  }
  append(t, e) {
    return this.clone({ name: t, value: e, op: 'a' });
  }
  set(t, e) {
    return this.clone({ name: t, value: e, op: 's' });
  }
  delete(t, e) {
    return this.clone({ name: t, value: e, op: 'd' });
  }
  maybeSetNormalizedName(t, e) {
    this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
  }
  init() {
    this.lazyInit &&
      (this.lazyInit instanceof n ? this.copyFrom(this.lazyInit) : this.lazyInit(),
      (this.lazyInit = null),
      this.lazyUpdate &&
        (this.lazyUpdate.forEach((t) => this.applyUpdate(t)), (this.lazyUpdate = null)));
  }
  copyFrom(t) {
    (t.init(),
      Array.from(t.headers.keys()).forEach((e) => {
        (this.headers.set(e, t.headers.get(e)),
          this.normalizedNames.set(e, t.normalizedNames.get(e)));
      }));
  }
  clone(t) {
    let e = new n();
    return (
      (e.lazyInit = this.lazyInit && this.lazyInit instanceof n ? this.lazyInit : this),
      (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
      e
    );
  }
  applyUpdate(t) {
    let e = t.name.toLowerCase();
    switch (t.op) {
      case 'a':
      case 's':
        let r = t.value;
        if ((typeof r == 'string' && (r = [r]), r.length === 0)) return;
        this.maybeSetNormalizedName(t.name, e);
        let i = (t.op === 'a' ? this.headers.get(e) : void 0) || [];
        (i.push(...r), this.headers.set(e, i));
        break;
      case 'd':
        let s = t.value;
        if (!s) (this.headers.delete(e), this.normalizedNames.delete(e));
        else {
          let o = this.headers.get(e);
          if (!o) return;
          ((o = o.filter((a) => s.indexOf(a) === -1)),
            o.length === 0
              ? (this.headers.delete(e), this.normalizedNames.delete(e))
              : this.headers.set(e, o));
        }
        break;
    }
  }
  addHeaderEntry(t, e) {
    let r = t.toLowerCase();
    (this.maybeSetNormalizedName(t, r),
      this.headers.has(r) ? this.headers.get(r).push(e) : this.headers.set(r, [e]));
  }
  setHeaderEntries(t, e) {
    let r = (Array.isArray(e) ? e : [e]).map((s) => s.toString()),
      i = t.toLowerCase();
    (this.headers.set(i, r), this.maybeSetNormalizedName(t, i));
  }
  forEach(t) {
    (this.init(),
      Array.from(this.normalizedNames.keys()).forEach((e) =>
        t(this.normalizedNames.get(e), this.headers.get(e)),
      ));
  }
};
var Bs = class {
    map = new Map();
    set(t, e) {
      return (this.map.set(t, e), this);
    }
    get(t) {
      return (this.map.has(t) || this.map.set(t, t.defaultValue()), this.map.get(t));
    }
    delete(t) {
      return (this.map.delete(t), this);
    }
    has(t) {
      return this.map.has(t);
    }
    keys() {
      return this.map.keys();
    }
  },
  $s = class {
    encodeKey(t) {
      return rc(t);
    }
    encodeValue(t) {
      return rc(t);
    }
    decodeKey(t) {
      return decodeURIComponent(t);
    }
    decodeValue(t) {
      return decodeURIComponent(t);
    }
  };
function Rd(n, t) {
  let e = new Map();
  return (
    n.length > 0 &&
      n
        .replace(/^\?/, '')
        .split('&')
        .forEach((i) => {
          let s = i.indexOf('='),
            [o, a] =
              s == -1
                ? [t.decodeKey(i), '']
                : [t.decodeKey(i.slice(0, s)), t.decodeValue(i.slice(s + 1))],
            c = e.get(o) || [];
          (c.push(a), e.set(o, c));
        }),
    e
  );
}
var Ad = /%(\d[a-f0-9])/gi,
  Id = { 40: '@', '3A': ':', 24: '$', '2C': ',', '3B': ';', '3D': '=', '3F': '?', '2F': '/' };
function rc(n) {
  return encodeURIComponent(n).replace(Ad, (t, e) => Id[e] ?? t);
}
function Qr(n) {
  return `${n}`;
}
var ze = class n {
  map;
  encoder;
  updates = null;
  cloneFrom = null;
  constructor(t = {}) {
    if (((this.encoder = t.encoder || new $s()), t.fromString)) {
      if (t.fromObject) throw new C(2805, false);
      this.map = Rd(t.fromString, this.encoder);
    } else
      t.fromObject
        ? ((this.map = new Map()),
          Object.keys(t.fromObject).forEach((e) => {
            let r = t.fromObject[e],
              i = Array.isArray(r) ? r.map(Qr) : [Qr(r)];
            this.map.set(e, i);
          }))
        : (this.map = null);
  }
  has(t) {
    return (this.init(), this.map.has(t));
  }
  get(t) {
    this.init();
    let e = this.map.get(t);
    return e ? e[0] : null;
  }
  getAll(t) {
    return (this.init(), this.map.get(t) || null);
  }
  keys() {
    return (this.init(), Array.from(this.map.keys()));
  }
  append(t, e) {
    return this.clone({ param: t, value: e, op: 'a' });
  }
  appendAll(t) {
    let e = [];
    return (
      Object.keys(t).forEach((r) => {
        let i = t[r];
        Array.isArray(i)
          ? i.forEach((s) => {
              e.push({ param: r, value: s, op: 'a' });
            })
          : e.push({ param: r, value: i, op: 'a' });
      }),
      this.clone(e)
    );
  }
  set(t, e) {
    return this.clone({ param: t, value: e, op: 's' });
  }
  delete(t, e) {
    return this.clone({ param: t, value: e, op: 'd' });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((t) => {
          let e = this.encoder.encodeKey(t);
          return this.map
            .get(t)
            .map((r) => e + '=' + this.encoder.encodeValue(r))
            .join('&');
        })
        .filter((t) => t !== '')
        .join('&')
    );
  }
  clone(t) {
    let e = new n({ encoder: this.encoder });
    return (
      (e.cloneFrom = this.cloneFrom || this),
      (e.updates = (this.updates || []).concat(t)),
      e
    );
  }
  init() {
    (this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom.keys().forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
        this.updates.forEach((t) => {
          switch (t.op) {
            case 'a':
            case 's':
              let e = (t.op === 'a' ? this.map.get(t.param) : void 0) || [];
              (e.push(Qr(t.value)), this.map.set(t.param, e));
              break;
            case 'd':
              if (t.value !== void 0) {
                let r = this.map.get(t.param) || [],
                  i = r.indexOf(Qr(t.value));
                (i !== -1 && r.splice(i, 1),
                  r.length > 0 ? this.map.set(t.param, r) : this.map.delete(t.param));
              } else {
                this.map.delete(t.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null)));
  }
};
function kd(n) {
  switch (n) {
    case 'DELETE':
    case 'GET':
    case 'HEAD':
    case 'OPTIONS':
    case 'JSONP':
      return false;
    default:
      return true;
  }
}
function ic(n) {
  return typeof ArrayBuffer < 'u' && n instanceof ArrayBuffer;
}
function sc(n) {
  return typeof Blob < 'u' && n instanceof Blob;
}
function oc(n) {
  return typeof FormData < 'u' && n instanceof FormData;
}
function Od(n) {
  return typeof URLSearchParams < 'u' && n instanceof URLSearchParams;
}
var Us = 'Content-Type',
  ac = 'Accept',
  lc = 'text/plain',
  uc = 'application/json',
  xd = `${uc}, ${lc}, */*`,
  Ht = class n {
    url;
    body = null;
    headers;
    context;
    reportProgress = false;
    reportUploadProgress = false;
    reportDownloadProgress = false;
    withCredentials = false;
    credentials;
    keepalive = false;
    cache;
    priority;
    mode;
    redirect;
    referrer;
    integrity;
    referrerPolicy;
    responseType = 'json';
    method;
    params;
    urlWithParams;
    transferCache;
    timeout;
    constructor(t, e, r, i) {
      ((this.url = e), (this.method = t.toUpperCase()));
      let s;
      if ((kd(this.method) || i ? ((this.body = r !== void 0 ? r : null), (s = i)) : (s = r), s)) {
        if (
          ((this.reportProgress = !!s.reportProgress),
          (this.reportUploadProgress = !!s.reportUploadProgress),
          (this.reportDownloadProgress = !!s.reportDownloadProgress),
          (this.withCredentials = !!s.withCredentials),
          (this.keepalive = !!s.keepalive),
          s.responseType && (this.responseType = s.responseType),
          s.headers && (this.headers = s.headers),
          s.context && (this.context = s.context),
          s.params && (this.params = s.params),
          s.priority && (this.priority = s.priority),
          s.cache && (this.cache = s.cache),
          s.credentials && (this.credentials = s.credentials),
          typeof s.timeout == 'number')
        ) {
          if (s.timeout < 1 || !Number.isInteger(s.timeout)) throw new C(2822, '');
          this.timeout = s.timeout;
        }
        (s.mode && (this.mode = s.mode),
          s.redirect && (this.redirect = s.redirect),
          s.integrity && (this.integrity = s.integrity),
          s.referrer && (this.referrer = s.referrer),
          s.referrerPolicy && (this.referrerPolicy = s.referrerPolicy),
          (this.transferCache = s.transferCache));
      }
      if (((this.headers ??= new He()), (this.context ??= new Bs()), !this.params))
        ((this.params = new ze()), (this.urlWithParams = e));
      else {
        let o = this.params.toString();
        if (o.length === 0) this.urlWithParams = e;
        else {
          let a = e.indexOf('?'),
            c = a === -1 ? '?' : a < e.length - 1 ? '&' : '';
          this.urlWithParams = e + c + o;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == 'string' ||
            ic(this.body) ||
            sc(this.body) ||
            oc(this.body) ||
            Od(this.body)
          ? this.body
          : this.body instanceof ze
            ? this.body.toString()
            : typeof this.body == 'object' ||
                typeof this.body == 'boolean' ||
                Array.isArray(this.body)
              ? JSON.stringify(this.body)
              : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || oc(this.body)
        ? null
        : sc(this.body)
          ? this.body.type || null
          : ic(this.body)
            ? null
            : typeof this.body == 'string'
              ? lc
              : this.body instanceof ze
                ? 'application/x-www-form-urlencoded;charset=UTF-8'
                : typeof this.body == 'object' ||
                    typeof this.body == 'number' ||
                    typeof this.body == 'boolean'
                  ? uc
                  : null;
    }
    clone(t = {}) {
      let e = t.method || this.method,
        r = t.url || this.url,
        i = t.responseType || this.responseType,
        s = t.keepalive ?? this.keepalive,
        o = t.priority || this.priority,
        a = t.cache || this.cache,
        c = t.mode || this.mode,
        l = t.redirect || this.redirect,
        u = t.credentials || this.credentials,
        d = t.referrer || this.referrer,
        h = t.integrity || this.integrity,
        f = t.referrerPolicy || this.referrerPolicy,
        p = t.transferCache ?? this.transferCache,
        g = t.timeout ?? this.timeout,
        y = t.body !== void 0 ? t.body : this.body,
        v = t.withCredentials ?? this.withCredentials,
        D = t.reportProgress ?? this.reportProgress,
        w = t.reportUploadProgress ?? this.reportUploadProgress,
        S = t.reportDownloadProgress ?? this.reportDownloadProgress,
        P = t.headers || this.headers,
        W = t.params || this.params,
        N = t.context ?? this.context;
      return (
        t.setHeaders !== void 0 &&
          (P = Object.keys(t.setHeaders).reduce((B, je) => B.set(je, t.setHeaders[je]), P)),
        t.setParams &&
          (W = Object.keys(t.setParams).reduce((B, je) => B.set(je, t.setParams[je]), W)),
        new n(e, r, y, {
          params: W,
          headers: P,
          context: N,
          reportProgress: D,
          reportUploadProgress: w,
          reportDownloadProgress: S,
          responseType: i,
          withCredentials: v,
          transferCache: p,
          keepalive: s,
          cache: a,
          priority: o,
          timeout: g,
          mode: c,
          redirect: l,
          credentials: u,
          referrer: d,
          integrity: h,
          referrerPolicy: f,
        })
      );
    }
  },
  Vt = (function (n) {
    return (
      (n[(n.Sent = 0)] = 'Sent'),
      (n[(n.UploadProgress = 1)] = 'UploadProgress'),
      (n[(n.ResponseHeader = 2)] = 'ResponseHeader'),
      (n[(n.DownloadProgress = 3)] = 'DownloadProgress'),
      (n[(n.Response = 4)] = 'Response'),
      (n[(n.User = 5)] = 'User'),
      n
    );
  })(Vt || {}),
  Un = class {
    headers;
    status;
    statusText;
    url;
    ok;
    type;
    redirected;
    responseType;
    constructor(t, e = 200, r = 'OK') {
      ((this.headers = t.headers || new He()),
        (this.status = t.status !== void 0 ? t.status : e),
        (this.statusText = t.statusText || r),
        (this.url = t.url || null),
        (this.redirected = t.redirected),
        (this.responseType = t.responseType),
        (this.ok = this.status >= 200 && this.status < 300));
    }
  },
  zs = class n extends Un {
    constructor(t = {}) {
      super(t);
    }
    type = Vt.ResponseHeader;
    clone(t = {}) {
      return new n({
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  jn = class n extends Un {
    body;
    constructor(t = {}) {
      (super(t), (this.body = t.body !== void 0 ? t.body : null));
    }
    type = Vt.Response;
    clone(t = {}) {
      return new n({
        body: t.body !== void 0 ? t.body : this.body,
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
        redirected: t.redirected ?? this.redirected,
        responseType: t.responseType ?? this.responseType,
      });
    }
  },
  vt = class extends Un {
    name = 'HttpErrorResponse';
    message;
    error;
    ok = false;
    constructor(t) {
      (super(t, 0, 'Unknown Error'),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${t.url || '(unknown url)'}`)
          : (this.message = `Http failure response for ${t.url || '(unknown url)'}: ${t.status} ${t.statusText}`),
        (this.error = t.error || null));
    }
  },
  Pd = 200;
var Md = /^\)\]\}',?\n/,
  Nd = new N('', { factory: () => null }),
  Ld = (() => {
    class n {
      fetchImpl = E$1(Hs, { optional: true })?.fetch ?? ((...e) => globalThis.fetch(...e));
      ngZone = E$1(De$2);
      destroyRef = E$1(Ve$1);
      maxResponseSize = E$1(Nd);
      handle(e) {
        return new x$1((r) => {
          let i = new AbortController();
          this.doRequest(e, i.signal, r).then(Vs, (o) => r.error(new vt({ error: o })));
          let s;
          return (
            e.timeout &&
              (s = this.ngZone.runOutsideAngular(() =>
                setTimeout(() => {
                  i.signal.aborted || i.abort(new DOMException('signal timed out', 'TimeoutError'));
                }, e.timeout),
              )),
            () => {
              (s !== void 0 && clearTimeout(s), i.abort());
            }
          );
        });
      }
      async doRequest(e, r, i) {
        let s = this.createRequestInit(e),
          o;
        try {
          let y = this.ngZone.runOutsideAngular(() =>
            this.fetchImpl(e.urlWithParams, j$1({ signal: r }, s)),
          );
          (Fd(y), i.next({ type: Vt.Sent }), (o = await y));
        } catch (y) {
          i.error(
            new vt({
              error: y,
              status: y.status ?? 0,
              statusText: y.statusText,
              url: e.urlWithParams,
              headers: y.headers,
            }),
          );
          return;
        }
        let a = new He(o.headers),
          c = o.statusText,
          l = o.url || e.urlWithParams,
          u = o.status,
          d = null,
          h = e.reportProgress || e.reportDownloadProgress;
        if ((h && i.next(new zs({ headers: a, status: u, statusText: c, url: l })), o.body)) {
          let y = o.headers.get('content-length'),
            v = y !== null ? Number(y) : NaN;
          this.maxResponseSize !== null &&
            Number.isFinite(v) &&
            v > this.maxResponseSize &&
            cc(this.maxResponseSize);
          let D = [],
            w = o.body.getReader(),
            S = 0,
            P,
            W,
            N = typeof Zone < 'u' && Zone.current,
            B = false;
          if (
            (await this.ngZone.runOutsideAngular(async () => {
              for (;;) {
                if (this.destroyRef.destroyed) {
                  (await w.cancel(), (B = true));
                  break;
                }
                let { done: Q, value: ds } = await w.read();
                if (Q) break;
                if (
                  (D.push(ds),
                  (S += ds.length),
                  this.maxResponseSize !== null &&
                    S > this.maxResponseSize &&
                    (await w.cancel(), cc(this.maxResponseSize)),
                  h)
                ) {
                  W =
                    e.responseType === 'text'
                      ? (W ?? '') + (P ??= new TextDecoder()).decode(ds, { stream: true })
                      : void 0;
                  let ca = () =>
                    i.next({
                      type: Vt.DownloadProgress,
                      total: Number.isFinite(v) ? v : void 0,
                      loaded: S,
                      partialText: W,
                    });
                  N ? N.run(ca) : ca();
                }
              }
            }),
            B)
          ) {
            i.complete();
            return;
          }
          let je = this.concatChunks(D, S);
          try {
            let Q = o.headers.get(Us) ?? '';
            d = this.parseBody(e, je, Q, u);
          } catch (Q) {
            i.error(
              new vt({
                error: Q,
                headers: new He(o.headers),
                status: o.status,
                statusText: o.statusText,
                url: o.url || e.urlWithParams,
              }),
            );
            return;
          }
        }
        u === 0 && (u = d ? Pd : 0);
        let f = u >= 200 && u < 300,
          p = o.redirected,
          g = o.type;
        f
          ? (i.next(
              new jn({
                body: d,
                headers: a,
                status: u,
                statusText: c,
                url: l,
                redirected: p,
                responseType: g,
              }),
            ),
            i.complete())
          : i.error(
              new vt({
                error: d,
                headers: a,
                status: u,
                statusText: c,
                url: l,
                redirected: p,
                responseType: g,
              }),
            );
      }
      parseBody(e, r, i, s) {
        switch (e.responseType) {
          case 'json':
            let o = new TextDecoder().decode(r).replace(Md, '');
            if (o === '') return null;
            try {
              return JSON.parse(o);
            } catch (a) {
              if (s < 200 || s >= 300) return o;
              throw a;
            }
          case 'text':
            return new TextDecoder().decode(r);
          case 'blob':
            return new Blob([r], { type: i });
          case 'arraybuffer':
            return r.buffer;
        }
      }
      createRequestInit(e) {
        if (e.reportUploadProgress) throw new C(2824, false);
        let r = {},
          i;
        if (
          ((i = e.credentials),
          e.withCredentials && (i = 'include'),
          e.headers.forEach((s, o) => (r[s] = o.join(','))),
          e.headers.has(ac) || (r[ac] = xd),
          !e.headers.has(Us))
        ) {
          let s = e.detectContentTypeHeader();
          s !== null && (r[Us] = s);
        }
        return {
          body: e.serializeBody(),
          method: e.method,
          headers: r,
          credentials: i,
          keepalive: e.keepalive,
          cache: e.cache,
          priority: e.priority,
          mode: e.mode,
          redirect: e.redirect,
          referrer: e.referrer,
          integrity: e.integrity,
          referrerPolicy: e.referrerPolicy,
        };
      }
      concatChunks(e, r) {
        let i = new Uint8Array(r),
          s = 0;
        for (let o of e) (i.set(o, s), (s += o.length));
        return i;
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  Hs = class {};
function Vs() {}
function Fd(n) {
  n.then(Vs, Vs);
}
function cc(n) {
  throw new C(2825, false);
}
function Ud(n, t) {
  return t(n);
}
function jd(n, t, e) {
  return (r, i) => Zr$1(e, () => t(r, (s) => n(s, i)));
}
var Bd = new N('', { factory: () => [] }),
  dc = new N(''),
  $d = new N('', { factory: () => true });
var zd = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵprov = ee({
      token: n,
      factory: function (r) {
        let i = null;
        return (r ? (i = new (r || n)()) : (i = Ie(Ld)), i);
      },
      providedIn: 'root',
    });
  }
  return n;
})();
var Hd = (() => {
    class n {
      backend;
      injector;
      chain = null;
      pendingTasks = E$1(uo$1);
      contributeToStability = E$1($d);
      constructor(e, r) {
        ((this.backend = e), (this.injector = r));
      }
      handle(e) {
        if (this.chain === null) {
          let r = Array.from(new Set([...this.injector.get(Bd), ...this.injector.get(dc, [])]));
          this.chain = r.reduceRight((i, s) => jd(i, s, this.injector), Ud);
        }
        if (this.contributeToStability) {
          let r = this.pendingTasks.add();
          return this.chain(e, (i) => this.backend.handle(i)).pipe(Yp$1(r));
        } else return this.chain(e, (r) => this.backend.handle(r));
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie(zd), Ie(oe$1));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
    }
    return n;
  })(),
  Vd = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = ee({
        token: n,
        factory: function (r) {
          let i = null;
          return (r ? (i = new (r || n)()) : (i = Ie(Hd)), i);
        },
        providedIn: 'root',
      });
    }
    return n;
  })();
function js(n, t) {
  return {
    body: t,
    headers: n.headers,
    context: n.context,
    observe: n.observe,
    params: n.params,
    reportProgress: n.reportProgress,
    responseType: n.responseType,
    withCredentials: n.withCredentials,
    credentials: n.credentials,
    transferCache: n.transferCache,
    timeout: n.timeout,
    keepalive: n.keepalive,
    priority: n.priority,
    cache: n.cache,
    mode: n.mode,
    redirect: n.redirect,
    integrity: n.integrity,
    referrer: n.referrer,
    referrerPolicy: n.referrerPolicy,
  };
}
var qs = (() => {
  class n {
    handler;
    constructor(e) {
      this.handler = e;
    }
    request(e, r, i = {}) {
      let s;
      if (e instanceof Ht) s = e;
      else {
        let c;
        i.headers instanceof He ? (c = i.headers) : (c = new He(i.headers));
        let l;
        (i.params &&
          (i.params instanceof ze ? (l = i.params) : (l = new ze({ fromObject: i.params }))),
          (s = new Ht(e, r, i.body !== void 0 ? i.body : null, {
            headers: c,
            context: i.context,
            params: l,
            reportProgress: i.reportProgress,
            reportUploadProgress: i.reportUploadProgress,
            reportDownloadProgress: i.reportDownloadProgress,
            responseType: i.responseType || 'json',
            withCredentials: i.withCredentials,
            transferCache: i.transferCache,
            keepalive: i.keepalive,
            priority: i.priority,
            cache: i.cache,
            mode: i.mode,
            redirect: i.redirect,
            credentials: i.credentials,
            referrer: i.referrer,
            referrerPolicy: i.referrerPolicy,
            integrity: i.integrity,
            timeout: i.timeout,
          })));
      }
      let o = Ap$1(s).pipe(Gp$1((c) => this.handler.handle(c)));
      if (e instanceof Ht || i.observe === 'events') return o;
      let a = o.pipe($t$1((c) => c instanceof jn));
      switch (i.observe || 'body') {
        case 'body':
          switch (s.responseType) {
            case 'arraybuffer':
              return a.pipe(
                Ge$1((c) => {
                  if (c.body !== null && !(c.body instanceof ArrayBuffer)) throw new C(2806, false);
                  return c.body;
                }),
              );
            case 'blob':
              return a.pipe(
                Ge$1((c) => {
                  if (c.body !== null && !(c.body instanceof Blob)) throw new C(2807, false);
                  return c.body;
                }),
              );
            case 'text':
              return a.pipe(
                Ge$1((c) => {
                  if (c.body !== null && typeof c.body != 'string') throw new C(2808, false);
                  return c.body;
                }),
              );
            default:
              return a.pipe(Ge$1((c) => c.body));
          }
        case 'response':
          return a;
        default:
          throw new C(2809, false);
      }
    }
    delete(e, r = {}) {
      return this.request('DELETE', e, r);
    }
    get(e, r = {}) {
      return this.request('GET', e, r);
    }
    head(e, r = {}) {
      return this.request('HEAD', e, r);
    }
    jsonp(e, r) {
      return this.request('JSONP', e, {
        params: new ze().append(r, 'JSONP_CALLBACK'),
        observe: 'body',
        responseType: 'json',
      });
    }
    options(e, r = {}) {
      return this.request('OPTIONS', e, r);
    }
    patch(e, r, i = {}) {
      return this.request('PATCH', e, js(i, r));
    }
    post(e, r, i = {}) {
      return this.request('POST', e, js(i, r));
    }
    put(e, r, i = {}) {
      return this.request('PUT', e, js(i, r));
    }
    static ɵfac = function (r) {
      return new (r || n)(Ie(Vd));
    };
    static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
  }
  return n;
})();
var hc = (() => {
  class n {
    _doc;
    constructor(e) {
      this._doc = e;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(e) {
      this._doc.title = e || '';
    }
    static ɵfac = function (r) {
      return new (r || n)(Ie(tn$1));
    };
    static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
  }
  return n;
})();
var Gs = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = ee({
        token: n,
        factory: function (r) {
          let i = null;
          return (r ? (i = new (r || n)()) : (i = Ie(Wd)), i);
        },
        providedIn: 'root',
      });
    }
    return n;
  })(),
  Wd = (() => {
    class n extends Gs {
      _doc = E$1(tn$1);
      sanitize(e, r) {
        if (r == null) return null;
        switch (e) {
          case $o$1.NONE:
            return r;
          case $o$1.HTML:
            return fa(r, 'HTML') ? er$1(r) : om$1(this._doc, String(r)).toString();
          case $o$1.STYLE:
            return fa(r, 'Style') ? er$1(r) : r;
          case $o$1.SCRIPT:
            if (fa(r, 'Script')) return er$1(r);
            throw new C(5200, false);
          case $o$1.URL:
            return fa(r, 'URL') ? er$1(r) : pa(String(r));
          case $o$1.RESOURCE_URL:
            if (fa(r, 'ResourceURL')) return er$1(r);
            throw new C(5201, false);
          default:
            throw new C(5202, false);
        }
      }
      bypassSecurityTrustHtml(e) {
        return jg(e);
      }
      bypassSecurityTrustStyle(e) {
        return Vg(e);
      }
      bypassSecurityTrustScript(e) {
        return Hg(e);
      }
      bypassSecurityTrustUrl(e) {
        return Bg(e);
      }
      bypassSecurityTrustResourceUrl(e) {
        return $g(e);
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
var R$1 = 'primary',
  Qn = Symbol('RouteTitle'),
  Xs = class {
    params;
    constructor(t) {
      this.params = t || {};
    }
    has(t) {
      return Object.prototype.hasOwnProperty.call(this.params, t);
    }
    get(t) {
      if (this.has(t)) {
        let e = this.params[t];
        return Array.isArray(e) ? e[0] : e;
      }
      return null;
    }
    getAll(t) {
      if (this.has(t)) {
        let e = this.params[t];
        return Array.isArray(e) ? e : [e];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function yt(n) {
  return new Xs(n);
}
function Ws(n, t, e) {
  for (let r = 0; r < n.length; r++) {
    let i = n[r],
      s = t[r];
    if (i[0] === ':') e[i.substring(1)] = s;
    else if (i !== s.path) return false;
  }
  return true;
}
function wc(n, t, e) {
  let r = e.path.split('/'),
    i = r.indexOf('**');
  if (i === -1) {
    if (r.length > n.length || (e.pathMatch === 'full' && (t.hasChildren() || r.length < n.length)))
      return null;
    let c = {},
      l = n.slice(0, r.length);
    return Ws(r, l, c) ? { consumed: l, posParams: c } : null;
  }
  if (i !== r.lastIndexOf('**')) return null;
  let s = r.slice(0, i),
    o = r.slice(i + 1);
  if (
    s.length + o.length > n.length ||
    (e.pathMatch === 'full' && t.hasChildren() && e.path !== '**')
  )
    return null;
  let a = {};
  return !Ws(s, n.slice(0, s.length), a) || !Ws(o, n.slice(n.length - o.length), a)
    ? null
    : { consumed: n, posParams: a };
}
function si(n) {
  return new Promise((t, e) => {
    n.pipe(Kp$1()).subscribe({ next: (r) => t(r), error: (r) => e(r) });
  });
}
function Jd(n, t) {
  if (n.length !== t.length) return false;
  for (let e = 0; e < n.length; ++e) if (!ke(n[e], t[e])) return false;
  return true;
}
function ke(n, t) {
  let e = n ? Zs(n) : void 0,
    r = t ? Zs(t) : void 0;
  if (!e || !r || e.length != r.length) return false;
  let i;
  for (let s = 0; s < e.length; s++) if (((i = e[s]), !Ec(n[i], t[i]))) return false;
  return true;
}
function Zs(n) {
  return [...Object.keys(n), ...Object.getOwnPropertySymbols(n)];
}
function Ec(n, t) {
  if (Array.isArray(n) && Array.isArray(t)) {
    if (n.length !== t.length) return false;
    let e = [...n].sort(),
      r = [...t].sort();
    return e.every((i, s) => r[s] === i);
  } else return n === t;
}
function Yd(n) {
  return n.length > 0 ? n[n.length - 1] : null;
}
function Et(n) {
  return Rp$1(n) ? n : Pa(n) ? Ee$1(Promise.resolve(n)) : Ap$1(n);
}
function Sc(n) {
  return Rp$1(n) ? si(n) : Promise.resolve(n);
}
var Xd = { exact: Cc, subset: Rc },
  Dc = { exact: Zd, subset: Qd, ignored: () => true },
  Tc = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
  Qs = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' };
function pc(n, t, e) {
  return (
    Xd[e.paths](n.root, t.root, e.matrixParams) &&
    Dc[e.queryParams](n.queryParams, t.queryParams) &&
    !(e.fragment === 'exact' && n.fragment !== t.fragment)
  );
}
function Zd(n, t) {
  return ke(n, t);
}
function Cc(n, t, e) {
  if (
    !bt(n.segments, t.segments) ||
    !ni(n.segments, t.segments, e) ||
    n.numberOfChildren !== t.numberOfChildren
  )
    return false;
  for (let r in t.children)
    if (!n.children[r] || !Cc(n.children[r], t.children[r], e)) return false;
  return true;
}
function Qd(n, t) {
  return (
    Object.keys(t).length <= Object.keys(n).length && Object.keys(t).every((e) => Ec(n[e], t[e]))
  );
}
function Rc(n, t, e) {
  return Ac(n, t, t.segments, e);
}
function Ac(n, t, e, r) {
  if (n.segments.length > e.length) {
    let i = n.segments.slice(0, e.length);
    return !(!bt(i, e) || t.hasChildren() || !ni(i, e, r));
  } else if (n.segments.length === e.length) {
    if (!bt(n.segments, e) || !ni(n.segments, e, r)) return false;
    for (let i in t.children)
      if (!n.children[i] || !Rc(n.children[i], t.children[i], r)) return false;
    return true;
  } else {
    let i = e.slice(0, n.segments.length),
      s = e.slice(n.segments.length);
    return !bt(n.segments, i) || !ni(n.segments, i, r) || !n.children[R$1]
      ? false
      : Ac(n.children[R$1], t, s, r);
  }
}
function ni(n, t, e) {
  return t.every((r, i) => Dc[e](n[i].parameters, r.parameters));
}
var he$1 = class he {
    root;
    queryParams;
    fragment;
    _queryParamMap;
    constructor(t = new M([], {}), e = {}, r = null) {
      ((this.root = t), (this.queryParams = e), (this.fragment = r));
    }
    get queryParamMap() {
      return ((this._queryParamMap ??= yt(this.queryParams)), this._queryParamMap);
    }
    toString() {
      return nh.serialize(this);
    }
  },
  M = class {
    segments;
    children;
    parent = null;
    constructor(t, e) {
      ((this.segments = t),
        (this.children = e),
        Object.values(e).forEach((r) => (r.parent = this)));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return ri(this);
    }
  },
  at = class {
    path;
    parameters;
    _parameterMap;
    constructor(t, e) {
      ((this.path = t), (this.parameters = e));
    }
    get parameterMap() {
      return ((this._parameterMap ??= yt(this.parameters)), this._parameterMap);
    }
    toString() {
      return kc(this);
    }
  };
function eh(n, t) {
  return bt(n, t) && n.every((e, r) => ke(e.parameters, t[r].parameters));
}
function bt(n, t) {
  return n.length !== t.length ? false : n.every((e, r) => e.path === t[r].path);
}
function th(n, t) {
  let e = [];
  return (
    Object.entries(n.children).forEach(([r, i]) => {
      r === R$1 && (e = e.concat(t(i, r)));
    }),
    Object.entries(n.children).forEach(([r, i]) => {
      r !== R$1 && (e = e.concat(t(i, r)));
    }),
    e
  );
}
var Qt = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: () => new ct() });
    }
    return n;
  })(),
  ct = class {
    parse(t) {
      let e = new to(t);
      return new he$1(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment());
    }
    serialize(t) {
      let e = `/${Bn(t.root, true)}`,
        r = sh(t.queryParams),
        i = typeof t.fragment == 'string' ? `#${rh(t.fragment)}` : '';
      return `${e}${r}${i}`;
    }
  },
  nh = new ct();
function ri(n) {
  return n.segments.map((t) => kc(t)).join('/');
}
function Bn(n, t) {
  if (!n.hasChildren()) return ri(n);
  if (t) {
    let e = n.children[R$1] ? Bn(n.children[R$1], false) : '',
      r = [];
    return (
      Object.entries(n.children).forEach(([i, s]) => {
        i !== R$1 && r.push(`${i}:${Bn(s, false)}`);
      }),
      r.length > 0 ? `${e}(${r.join('//')})` : e
    );
  } else {
    let e = th(n, (r, i) => (i === R$1 ? [Bn(n.children[R$1], false)] : [`${i}:${Bn(r, false)}`]));
    return Object.keys(n.children).length === 1 && n.children[R$1] != null
      ? `${ri(n)}/${e[0]}`
      : `${ri(n)}/(${e.join('//')})`;
  }
}
function Ic(n) {
  return encodeURIComponent(n)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',');
}
function ei(n) {
  return Ic(n).replace(/%3B/gi, ';');
}
function rh(n) {
  return encodeURI(n);
}
function eo(n) {
  return Ic(n).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
}
function ii(n) {
  return decodeURIComponent(n);
}
function mc(n) {
  return ii(n.replace(/\+/g, '%20'));
}
function kc(n) {
  return `${eo(n.path)}${ih(n.parameters)}`;
}
function ih(n) {
  return Object.entries(n)
    .map(([t, e]) => `;${eo(t)}=${eo(e)}`)
    .join('');
}
function sh(n) {
  let t = Object.entries(n)
    .map(([e, r]) =>
      Array.isArray(r) ? r.map((i) => `${ei(e)}=${ei(i)}`).join('&') : `${ei(e)}=${ei(r)}`,
    )
    .filter((e) => e);
  return t.length ? `?${t.join('&')}` : '';
}
var oh = /^[^\/()?;#]+/;
function Ks(n) {
  let t = n.match(oh);
  return t ? t[0] : '';
}
var ah = /^[^\/()?;=#]+/;
function ch(n) {
  let t = n.match(ah);
  return t ? t[0] : '';
}
var lh = /^[^=?&#]+/;
function uh(n) {
  let t = n.match(lh);
  return t ? t[0] : '';
}
var dh = /^[^&#]+/;
function hh(n) {
  let t = n.match(dh);
  return t ? t[0] : '';
}
var to = class {
  url;
  remaining;
  constructor(t) {
    ((this.url = t), (this.remaining = t));
  }
  parseRootSegment() {
    for (; this.consumeOptional('/'); );
    return this.remaining === '' || this.peekStartsWith('?') || this.peekStartsWith('#')
      ? new M([], {})
      : new M([], this.parseChildren());
  }
  parseQueryParams() {
    let t = {};
    if (this.consumeOptional('?'))
      do this.parseQueryParam(t);
      while (this.consumeOptional('&'));
    return t;
  }
  parseFragment() {
    return this.consumeOptional('#') ? decodeURIComponent(this.remaining) : null;
  }
  parseChildren(t = 0) {
    if (t > 50) throw new C(4010, false);
    if (this.remaining === '') return {};
    this.consumeOptional('/');
    let e = [];
    for (
      this.peekStartsWith('(') || e.push(this.parseSegment());
      this.peekStartsWith('/') && !this.peekStartsWith('//') && !this.peekStartsWith('/(');
    )
      (this.capture('/'), e.push(this.parseSegment()));
    let r = {};
    this.peekStartsWith('/(') && (this.capture('/'), (r = this.parseParens(true, t)));
    let i = {};
    return (
      this.peekStartsWith('(') && (i = this.parseParens(false, t)),
      (e.length > 0 || Object.keys(r).length > 0) && (i[R$1] = new M(e, r)),
      i
    );
  }
  parseSegment() {
    let t = Ks(this.remaining);
    if (t === '' && this.peekStartsWith(';')) throw new C(4009, false);
    return (this.capture(t), new at(ii(t), this.parseMatrixParams()));
  }
  parseMatrixParams() {
    let t = {};
    for (; this.consumeOptional(';'); ) this.parseParam(t);
    return t;
  }
  parseParam(t) {
    let e = ch(this.remaining);
    if (!e) return;
    this.capture(e);
    let r = '';
    if (this.consumeOptional('=')) {
      let i = Ks(this.remaining);
      i && ((r = i), this.capture(r));
    }
    t[ii(e)] = ii(r);
  }
  parseQueryParam(t) {
    let e = uh(this.remaining);
    if (!e) return;
    this.capture(e);
    let r = '';
    if (this.consumeOptional('=')) {
      let o = hh(this.remaining);
      o && ((r = o), this.capture(r));
    }
    let i = mc(e),
      s = mc(r);
    if (t.hasOwnProperty(i)) {
      let o = t[i];
      (Array.isArray(o) || ((o = [o]), (t[i] = o)), o.push(s));
    } else t[i] = s;
  }
  parseParens(t, e) {
    let r = {};
    for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
      let i = Ks(this.remaining),
        s = this.remaining[i.length];
      if (s !== '/' && s !== ')' && s !== ';') throw new C(4010, false);
      let o;
      i.indexOf(':') > -1
        ? ((o = i.slice(0, i.indexOf(':'))), this.capture(o), this.capture(':'))
        : t && (o = R$1);
      let a = this.parseChildren(e + 1);
      ((r[o ?? R$1] = Object.keys(a).length === 1 && a[R$1] ? a[R$1] : new M([], a)),
        this.consumeOptional('//'));
    }
    return r;
  }
  peekStartsWith(t) {
    return this.remaining.startsWith(t);
  }
  consumeOptional(t) {
    return this.peekStartsWith(t)
      ? ((this.remaining = this.remaining.substring(t.length)), true)
      : false;
  }
  capture(t) {
    if (!this.consumeOptional(t)) throw new C(4011, false);
  }
};
function Oc(n) {
  return n.segments.length > 0 ? new M([], { [R$1]: n }) : n;
}
function xc(n) {
  let t = {};
  for (let [r, i] of Object.entries(n.children)) {
    let s = xc(i);
    if (r === R$1 && s.segments.length === 0 && s.hasChildren())
      for (let [o, a] of Object.entries(s.children)) t[o] = a;
    else (s.segments.length > 0 || s.hasChildren()) && (t[r] = s);
  }
  let e = new M(n.segments, t);
  return fh(e);
}
function fh(n) {
  if (n.numberOfChildren === 1 && n.children[R$1]) {
    let t = n.children[R$1];
    return new M(n.segments.concat(t.segments), t.children);
  }
  return n;
}
function lt(n) {
  return n instanceof he$1;
}
function Pc(n, t, e = null, r = null, i = new ct()) {
  let s = Mc(n);
  return Nc(s, t, e, r, i);
}
function Mc(n) {
  let t;
  function e(s) {
    let o = {};
    for (let c of s.children) {
      let l = e(c);
      o[c.outlet] = l;
    }
    let a = new M(s.url, o);
    return (s === n && (t = a), a);
  }
  let r = e(n.root),
    i = Oc(r);
  return t ?? i;
}
function Nc(n, t, e, r, i) {
  let s = n;
  for (; s.parent; ) s = s.parent;
  if (t.length === 0) return Js(s, s, s, e, r, i);
  let o = ph(t);
  if (o.toRoot()) return Js(s, s, new M([], {}), e, r, i);
  let a = mh(o, s, n),
    c = a.processChildren
      ? zn(a.segmentGroup, a.index, o.commands)
      : Fc(a.segmentGroup, a.index, o.commands);
  return Js(s, a.segmentGroup, c, e, r, i);
}
function oi(n) {
  return typeof n == 'object' && n != null && !n.outlets && !n.segmentPath;
}
function qn(n) {
  return typeof n == 'object' && n != null && n.outlets;
}
function gc(n, t, e) {
  n ||= '\u0275';
  let r = new he$1();
  return ((r.queryParams = { [n]: t }), e.parse(e.serialize(r)).queryParams[n]);
}
function Js(n, t, e, r, i, s) {
  let o = {};
  for (let [l, u] of Object.entries(r ?? {}))
    o[l] = Array.isArray(u) ? u.map((d) => gc(l, d, s)) : gc(l, u, s);
  let a;
  n === t ? (a = e) : (a = Lc(n, t, e));
  let c = Oc(xc(a));
  return new he$1(c, o, i);
}
function Lc(n, t, e) {
  let r = {};
  return (
    Object.entries(n.children).forEach(([i, s]) => {
      s === t ? (r[i] = e) : (r[i] = Lc(s, t, e));
    }),
    new M(n.segments, r)
  );
}
var ai = class {
  isAbsolute;
  numberOfDoubleDots;
  commands;
  constructor(t, e, r) {
    if (
      ((this.isAbsolute = t),
      (this.numberOfDoubleDots = e),
      (this.commands = r),
      t && r.length > 0 && oi(r[0]))
    )
      throw new C(4003, false);
    let i = r.find(qn);
    if (i && i !== Yd(r)) throw new C(4004, false);
  }
  toRoot() {
    return this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/';
  }
};
function ph(n) {
  if (typeof n[0] == 'string' && n.length === 1 && n[0] === '/') return new ai(true, 0, n);
  let t = 0,
    e = false,
    r = n.reduce((i, s, o) => {
      if (typeof s == 'object' && s != null) {
        if (s.outlets) {
          let a = {};
          return (
            Object.entries(s.outlets).forEach(([c, l]) => {
              a[c] = typeof l == 'string' ? l.split('/') : l;
            }),
            [...i, { outlets: a }]
          );
        }
        if (s.segmentPath) return [...i, s.segmentPath];
      }
      return typeof s != 'string'
        ? [...i, s]
        : o === 0
          ? (s.split('/').forEach((a, c) => {
              (c == 0 && a === '.') ||
                (c == 0 && a === '' ? (e = true) : a === '..' ? t++ : a != '' && i.push(a));
            }),
            i)
          : [...i, s];
    }, []);
  return new ai(e, t, r);
}
var Gt = class {
  segmentGroup;
  processChildren;
  index;
  constructor(t, e, r) {
    ((this.segmentGroup = t), (this.processChildren = e), (this.index = r));
  }
};
function mh(n, t, e) {
  if (n.isAbsolute) return new Gt(t, true, 0);
  if (!e) return new Gt(t, false, NaN);
  if (e.parent === null) return new Gt(e, true, 0);
  let r = oi(n.commands[0]) ? 0 : 1,
    i = e.segments.length - 1 + r;
  return gh(e, i, n.numberOfDoubleDots);
}
function gh(n, t, e) {
  let r = n,
    i = t,
    s = e;
  for (; s > i; ) {
    if (((s -= i), (r = r.parent), !r)) throw new C(4005, false);
    i = r.segments.length;
  }
  return new Gt(r, false, i - s);
}
function vh(n) {
  return qn(n[0]) ? n[0].outlets : { [R$1]: n };
}
function Fc(n, t, e) {
  if (((n ??= new M([], {})), n.segments.length === 0 && n.hasChildren())) return zn(n, t, e);
  let r = bh(n, t, e),
    i = e.slice(r.commandIndex);
  if (r.match && r.pathIndex < n.segments.length) {
    let s = new M(n.segments.slice(0, r.pathIndex), {});
    return ((s.children[R$1] = new M(n.segments.slice(r.pathIndex), n.children)), zn(s, 0, i));
  } else
    return r.match && i.length === 0
      ? new M(n.segments, {})
      : r.match && !n.hasChildren()
        ? no(n, t, e)
        : r.match
          ? zn(n, 0, i)
          : no(n, t, e);
}
function zn(n, t, e) {
  if (e.length === 0) return new M(n.segments, {});
  {
    let r = vh(e),
      i = {};
    if (
      Object.keys(r).some((s) => s !== R$1) &&
      n.children[R$1] &&
      n.numberOfChildren === 1 &&
      n.children[R$1].segments.length === 0
    ) {
      let s = zn(n.children[R$1], t, e);
      return new M(n.segments, s.children);
    }
    return (
      Object.entries(r).forEach(([s, o]) => {
        (typeof o == 'string' && (o = [o]), o !== null && (i[s] = Fc(n.children[s], t, o)));
      }),
      Object.entries(n.children).forEach(([s, o]) => {
        r[s] === void 0 && (i[s] = o);
      }),
      new M(n.segments, i)
    );
  }
}
function bh(n, t, e) {
  let r = 0,
    i = t,
    s = { match: false, pathIndex: 0, commandIndex: 0 };
  for (; i < n.segments.length; ) {
    if (r >= e.length) return s;
    let o = n.segments[i],
      a = e[r];
    if (qn(a)) break;
    let c = `${a}`,
      l = r < e.length - 1 ? e[r + 1] : null;
    if (i > 0 && c === void 0) break;
    if (c && l && typeof l == 'object' && l.outlets === void 0) {
      if (!bc(c, l, o)) return s;
      r += 2;
    } else {
      if (!bc(c, {}, o)) return s;
      r++;
    }
    i++;
  }
  return { match: true, pathIndex: i, commandIndex: r };
}
function no(n, t, e) {
  let r = n.segments.slice(0, t),
    i = 0;
  for (; i < e.length; ) {
    let s = e[i];
    if (qn(s)) {
      let c = yh(s.outlets);
      return new M(r, c);
    }
    if (i === 0 && oi(e[0])) {
      let c = n.segments[t];
      (r.push(new at(c.path, vc(e[0]))), i++);
      continue;
    }
    let o = qn(s) ? s.outlets[R$1] : `${s}`,
      a = i < e.length - 1 ? e[i + 1] : null;
    o && a && oi(a) ? (r.push(new at(o, vc(a))), (i += 2)) : (r.push(new at(o, {})), i++);
  }
  return new M(r, {});
}
function yh(n) {
  let t = {};
  return (
    Object.entries(n).forEach(([e, r]) => {
      (typeof r == 'string' && (r = [r]), r !== null && (t[e] = no(new M([], {}), 0, r)));
    }),
    t
  );
}
function vc(n) {
  let t = {};
  return (Object.entries(n).forEach(([e, r]) => (t[e] = `${r}`)), t);
}
function bc(n, t, e) {
  return n == e.path && ke(t, e.parameters);
}
var Hn = 'imperative',
  K = (function (n) {
    return (
      (n[(n.NavigationStart = 0)] = 'NavigationStart'),
      (n[(n.NavigationEnd = 1)] = 'NavigationEnd'),
      (n[(n.NavigationCancel = 2)] = 'NavigationCancel'),
      (n[(n.NavigationError = 3)] = 'NavigationError'),
      (n[(n.RoutesRecognized = 4)] = 'RoutesRecognized'),
      (n[(n.ResolveStart = 5)] = 'ResolveStart'),
      (n[(n.ResolveEnd = 6)] = 'ResolveEnd'),
      (n[(n.GuardsCheckStart = 7)] = 'GuardsCheckStart'),
      (n[(n.GuardsCheckEnd = 8)] = 'GuardsCheckEnd'),
      (n[(n.RouteConfigLoadStart = 9)] = 'RouteConfigLoadStart'),
      (n[(n.RouteConfigLoadEnd = 10)] = 'RouteConfigLoadEnd'),
      (n[(n.ChildActivationStart = 11)] = 'ChildActivationStart'),
      (n[(n.ChildActivationEnd = 12)] = 'ChildActivationEnd'),
      (n[(n.ActivationStart = 13)] = 'ActivationStart'),
      (n[(n.ActivationEnd = 14)] = 'ActivationEnd'),
      (n[(n.Scroll = 15)] = 'Scroll'),
      (n[(n.NavigationSkipped = 16)] = 'NavigationSkipped'),
      n
    );
  })(K || {}),
  fe$1 = class fe {
    id;
    url;
    constructor(t, e) {
      ((this.id = t), (this.url = e));
    }
  },
  _t = class extends fe$1 {
    type = K.NavigationStart;
    navigationTrigger;
    restoredState;
    constructor(t, e, r = 'imperative', i = null) {
      (super(t, e), (this.navigationTrigger = r), (this.restoredState = i));
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Oe = class extends fe$1 {
    urlAfterRedirects;
    type = K.NavigationEnd;
    constructor(t, e, r) {
      (super(t, e), (this.urlAfterRedirects = r));
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  X = (function (n) {
    return (
      (n[(n.Redirect = 0)] = 'Redirect'),
      (n[(n.SupersededByNewNavigation = 1)] = 'SupersededByNewNavigation'),
      (n[(n.NoDataFromResolver = 2)] = 'NoDataFromResolver'),
      (n[(n.GuardRejected = 3)] = 'GuardRejected'),
      (n[(n.Aborted = 4)] = 'Aborted'),
      n
    );
  })(X || {}),
  Gn = (function (n) {
    return (
      (n[(n.IgnoredSameUrlNavigation = 0)] = 'IgnoredSameUrlNavigation'),
      (n[(n.IgnoredByUrlHandlingStrategy = 1)] = 'IgnoredByUrlHandlingStrategy'),
      n
    );
  })(Gn || {}),
  Ee = class extends fe$1 {
    reason;
    code;
    type = K.NavigationCancel;
    constructor(t, e, r, i) {
      (super(t, e), (this.reason = r), (this.code = i));
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  };
function Uc(n) {
  return n instanceof Ee && (n.code === X.Redirect || n.code === X.SupersededByNewNavigation);
}
var qe = class extends fe$1 {
    reason;
    code;
    type = K.NavigationSkipped;
    constructor(t, e, r, i) {
      (super(t, e), (this.reason = r), (this.code = i));
    }
  },
  wt = class extends fe$1 {
    error;
    target;
    type = K.NavigationError;
    constructor(t, e, r, i) {
      (super(t, e), (this.error = r), (this.target = i));
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Wn = class extends fe$1 {
    urlAfterRedirects;
    state;
    type = K.RoutesRecognized;
    constructor(t, e, r, i) {
      (super(t, e), (this.urlAfterRedirects = r), (this.state = i));
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  ci = class extends fe$1 {
    urlAfterRedirects;
    state;
    type = K.GuardsCheckStart;
    constructor(t, e, r, i) {
      (super(t, e), (this.urlAfterRedirects = r), (this.state = i));
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  li = class extends fe$1 {
    urlAfterRedirects;
    state;
    shouldActivate;
    type = K.GuardsCheckEnd;
    constructor(t, e, r, i, s) {
      (super(t, e), (this.urlAfterRedirects = r), (this.state = i), (this.shouldActivate = s));
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  ui = class extends fe$1 {
    urlAfterRedirects;
    state;
    type = K.ResolveStart;
    constructor(t, e, r, i) {
      (super(t, e), (this.urlAfterRedirects = r), (this.state = i));
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  di = class extends fe$1 {
    urlAfterRedirects;
    state;
    type = K.ResolveEnd;
    constructor(t, e, r, i) {
      (super(t, e), (this.urlAfterRedirects = r), (this.state = i));
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  hi = class {
    route;
    type = K.RouteConfigLoadStart;
    constructor(t) {
      this.route = t;
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  fi = class {
    route;
    type = K.RouteConfigLoadEnd;
    constructor(t) {
      this.route = t;
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  pi = class {
    snapshot;
    type = K.ChildActivationStart;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  },
  mi = class {
    snapshot;
    type = K.ChildActivationEnd;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  },
  gi = class {
    snapshot;
    type = K.ActivationStart;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  },
  vi = class {
    snapshot;
    type = K.ActivationEnd;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  };
var Kt = class {},
  Kn = class {},
  Jt = class {
    url;
    navigationBehaviorOptions;
    constructor(t, e) {
      ((this.url = t), (this.navigationBehaviorOptions = e));
    }
  };
function _h(n) {
  return !(n instanceof Kt) && !(n instanceof Jt) && !(n instanceof Kn);
}
var bi = class {
    rootInjector;
    outlet = null;
    route = null;
    children;
    attachRef = null;
    get injector() {
      return this.route?.snapshot._environmentInjector ?? this.rootInjector;
    }
    constructor(t) {
      ((this.rootInjector = t), (this.children = new en(this.rootInjector)));
    }
  },
  en = (() => {
    class n {
      rootInjector;
      contexts = new Map();
      constructor(e) {
        this.rootInjector = e;
      }
      onChildOutletCreated(e, r) {
        let i = this.getOrCreateContext(e);
        ((i.outlet = r), this.contexts.set(e, i));
      }
      onChildOutletDestroyed(e) {
        let r = this.getContext(e);
        r && ((r.outlet = null), (r.attachRef = null));
      }
      onOutletDeactivated() {
        let e = this.contexts;
        return ((this.contexts = new Map()), e);
      }
      onOutletReAttached(e) {
        this.contexts = e;
      }
      getOrCreateContext(e) {
        let r = this.getContext(e);
        return (r || ((r = new bi(this.rootInjector)), this.contexts.set(e, r)), r);
      }
      getContext(e) {
        return this.contexts.get(e) || null;
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie(oe$1));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
    }
    return n;
  })(),
  yi = class {
    _root;
    constructor(t) {
      this._root = t;
    }
    get root() {
      return this._root.value;
    }
    parent(t) {
      let e = this.pathFromRoot(t);
      return e.length > 1 ? e[e.length - 2] : null;
    }
    children(t) {
      let e = ro(t, this._root);
      return e ? e.children.map((r) => r.value) : [];
    }
    firstChild(t) {
      let e = ro(t, this._root);
      return e && e.children.length > 0 ? e.children[0].value : null;
    }
    siblings(t) {
      let e = io(t, this._root);
      return e.length < 2
        ? []
        : e[e.length - 2].children.map((i) => i.value).filter((i) => i !== t);
    }
    pathFromRoot(t) {
      return io(t, this._root).map((e) => e.value);
    }
  };
function ro(n, t) {
  if (n === t.value) return t;
  for (let e of t.children) {
    let r = ro(n, e);
    if (r) return r;
  }
  return null;
}
function io(n, t) {
  if (n === t.value) return [t];
  for (let e of t.children) {
    let r = io(n, e);
    if (r.length) return (r.unshift(t), r);
  }
  return [];
}
var de$1 = class de {
  value;
  children;
  constructor(t, e) {
    ((this.value = t), (this.children = e));
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function qt(n) {
  let t = {};
  return (n && n.children.forEach((e) => (t[e.value.outlet] = e)), t);
}
var Jn = class extends yi {
  snapshot;
  constructor(t, e) {
    (super(t), (this.snapshot = e), po(this, t));
  }
  toString() {
    return this.snapshot.toString();
  }
};
function jc(n, t) {
  let e = wh(n, t),
    r = new Dn([new at('', {})]),
    i = new Dn({}),
    s = new Dn({}),
    o = new Dn({}),
    a = new Dn(''),
    c = new Ge(r, i, o, a, s, R$1, n, e.root);
  return ((c.snapshot = e.root), new Jn(new de$1(c, []), e));
}
function wh(n, t) {
  let e = {},
    r = {},
    i = {},
    o = new Yt([], e, i, '', r, R$1, n, null, {}, t);
  return new Yn('', new de$1(o, []));
}
var Ge = class {
    urlSubject;
    paramsSubject;
    queryParamsSubject;
    fragmentSubject;
    dataSubject;
    outlet;
    component;
    snapshot;
    _futureSnapshot;
    _routerState;
    _paramMap;
    _queryParamMap;
    title;
    url;
    params;
    queryParams;
    fragment;
    data;
    constructor(t, e, r, i, s, o, a, c) {
      ((this.urlSubject = t),
        (this.paramsSubject = e),
        (this.queryParamsSubject = r),
        (this.fragmentSubject = i),
        (this.dataSubject = s),
        (this.outlet = o),
        (this.component = a),
        (this._futureSnapshot = c),
        (this.title = this.dataSubject?.pipe(Ge$1((l) => l[Qn])) ?? Ap$1(void 0)),
        (this.url = t),
        (this.params = e),
        (this.queryParams = r),
        (this.fragment = i),
        (this.data = s));
    }
    get routeConfig() {
      return this._futureSnapshot.routeConfig;
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return ((this._paramMap ??= this.params.pipe(Ge$1((t) => yt(t)))), this._paramMap);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= this.queryParams.pipe(Ge$1((t) => yt(t)))),
        this._queryParamMap
      );
    }
    toString() {
      return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
    }
  },
  Eh = 'always';
function fo(n, t, e) {
  let r,
    { routeConfig: i } = n;
  return (
    t !== null &&
    (e === 'always' || i?.path === '' || (!t.component && !t.routeConfig?.loadComponent))
      ? (r = {
          params: j$1(j$1({}, t.params), n.params),
          data: j$1(j$1({}, t.data), n.data),
          resolve: j$1(j$1(j$1(j$1({}, n.data), t.data), i?.data), n._resolvedData),
        })
      : (r = {
          params: j$1({}, n.params),
          data: j$1({}, n.data),
          resolve: j$1(j$1({}, n.data), n._resolvedData ?? {}),
        }),
    i && $c(i) && (r.resolve[Qn] = i.title),
    r
  );
}
var Yt = class {
    url;
    params;
    queryParams;
    fragment;
    data;
    outlet;
    component;
    routeConfig;
    _resolve;
    _resolvedData;
    _routerState;
    _paramMap;
    _queryParamMap;
    _environmentInjector;
    get title() {
      return this.data?.[Qn];
    }
    constructor(t, e, r, i, s, o, a, c, l, u) {
      ((this.url = t),
        (this.params = e),
        (this.queryParams = r),
        (this.fragment = i),
        (this.data = s),
        (this.outlet = o),
        (this.component = a),
        (this.routeConfig = c),
        (this._resolve = l),
        (this._environmentInjector = u));
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return ((this._paramMap ??= yt(this.params)), this._paramMap);
    }
    get queryParamMap() {
      return ((this._queryParamMap ??= yt(this.queryParams)), this._queryParamMap);
    }
    toString() {
      let t = this.url.map((r) => r.toString()).join('/'),
        e = this.routeConfig ? this.routeConfig.path : '';
      return `Route(url:'${t}', path:'${e}')`;
    }
  },
  Yn = class extends yi {
    url;
    constructor(t, e) {
      (super(e), (this.url = t), po(this, e));
    }
    toString() {
      return Bc(this._root);
    }
  };
function po(n, t) {
  ((t.value._routerState = n), t.children.forEach((e) => po(n, e)));
}
function Bc(n) {
  let t = n.children.length > 0 ? ` { ${n.children.map(Bc).join(', ')} } ` : '';
  return `${n.value}${t}`;
}
function Ys(n) {
  if (n.snapshot) {
    let t = n.snapshot,
      e = n._futureSnapshot;
    ((n.snapshot = e),
      ke(t.queryParams, e.queryParams) || n.queryParamsSubject.next(e.queryParams),
      t.fragment !== e.fragment && n.fragmentSubject.next(e.fragment),
      ke(t.params, e.params) || n.paramsSubject.next(e.params),
      Jd(t.url, e.url) || n.urlSubject.next(e.url),
      ke(t.data, e.data) || n.dataSubject.next(e.data));
  } else ((n.snapshot = n._futureSnapshot), n.dataSubject.next(n._futureSnapshot.data));
}
function so(n, t) {
  let e = ke(n.params, t.params) && eh(n.url, t.url),
    r = !n.parent != !t.parent;
  return e && !r && (!n.parent || so(n.parent, t.parent));
}
function $c(n) {
  return typeof n.title == 'string' || n.title === null;
}
var zc = new N(''),
  mo = (() => {
    class n {
      activated = null;
      get activatedComponentRef() {
        return this.activated;
      }
      _activatedRoute = null;
      name = R$1;
      activateEvents = new Ae$1();
      deactivateEvents = new Ae$1();
      attachEvents = new Ae$1();
      detachEvents = new Ae$1();
      routerOutletData = yO();
      parentContexts = E$1(en);
      location = E$1(Yo$1);
      changeDetector = E$1(DO);
      inputBinder = E$1(er, { optional: true });
      supportsBindingToComponentInputs = true;
      ngOnChanges(e) {
        if (e.name) {
          let { firstChange: r, previousValue: i } = e.name;
          if (r) return;
          (this.isTrackedInParentContexts(i) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)),
            this.initializeOutletWithName());
        }
      }
      ngOnDestroy() {
        (this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this));
      }
      isTrackedInParentContexts(e) {
        return this.parentContexts.getContext(e)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if ((this.parentContexts.onChildOutletCreated(this.name, this), this.activated)) return;
        let e = this.parentContexts.getContext(this.name);
        e?.route &&
          (e.attachRef
            ? this.attach(e.attachRef, e.route)
            : this.activateWith(e.route, e.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new C(4012, false);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new C(4012, false);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new C(4012, false);
        this.location.detach();
        let e = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(e.instance),
          e
        );
      }
      attach(e, r) {
        ((this.activated = e),
          (this._activatedRoute = r),
          this.location.insert(e.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(e.instance));
      }
      deactivate() {
        if (this.activated) {
          let e = this.component;
          (this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(e));
        }
      }
      activateWith(e, r) {
        if (this.isActivated) throw new C(4013, false);
        this._activatedRoute = e;
        let i = this.location,
          o = e.snapshot.component,
          a = this.parentContexts.getOrCreateContext(this.name).children,
          c = new oo(e, a, i.injector, this.routerOutletData);
        ((this.activated = i.createComponent(o, {
          index: i.length,
          injector: c,
          environmentInjector: r,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵdir = Lv({
        type: n,
        selectors: [['router-outlet']],
        inputs: { name: 'name', routerOutletData: [1, 'routerOutletData'] },
        outputs: {
          activateEvents: 'activate',
          deactivateEvents: 'deactivate',
          attachEvents: 'attach',
          detachEvents: 'detach',
        },
        exportAs: ['outlet'],
        features: [sg$1],
      });
    }
    return n;
  })(),
  oo = class {
    route;
    childContexts;
    parent;
    outletData;
    constructor(t, e, r, i) {
      ((this.route = t), (this.childContexts = e), (this.parent = r), (this.outletData = i));
    }
    get(t, e) {
      return t === Ge
        ? this.route
        : t === en
          ? this.childContexts
          : t === zc
            ? this.outletData
            : this.parent.get(t, e);
    }
  },
  er = new N(''),
  Hc = (() => {
    class n {
      options;
      outletDataSubscriptions = new Map();
      outletSeenKeys = new Map();
      constructor(e) {
        ((this.options = e), (this.options.queryParams ??= true));
      }
      bindActivatedRouteToOutletComponent(e) {
        (this.unsubscribeFromRouteData(e), this.subscribeToRouteData(e));
      }
      unsubscribeFromRouteData(e) {
        (this.outletDataSubscriptions.get(e)?.unsubscribe(),
          this.outletDataSubscriptions.delete(e),
          this.outletSeenKeys.delete(e));
      }
      subscribeToRouteData(e) {
        let { activatedRoute: r } = e,
          i = Bp$1([this.options.queryParams ? r.queryParams : Ap$1({}), r.params, r.data])
            .pipe(
              rh$1(
                ([s, o, a], c) => (
                  (a = j$1(j$1(j$1({}, s), o), a)),
                  c === 0 ? Ap$1(a) : Promise.resolve(a)
                ),
              ),
            )
            .subscribe((s) => {
              if (
                !e.isActivated ||
                !e.activatedComponentRef ||
                e.activatedRoute !== r ||
                r.component === null
              ) {
                this.unsubscribeFromRouteData(e);
                return;
              }
              let o = MO(r.component);
              if (!o) {
                this.unsubscribeFromRouteData(e);
                return;
              }
              let a = this.outletSeenKeys.get(e);
              a || ((a = new Set()), this.outletSeenKeys.set(e, a));
              for (let l of Object.keys(s)) a.add(l);
              let c = this.options.unmatchedInputBehavior ?? 'alwaysUndefined';
              for (let { templateName: l } of o.inputs) {
                let u = s[l];
                (u !== void 0 || c === 'alwaysUndefined' || a.has(l)) &&
                  e.activatedComponentRef.setInput(l, u);
              }
            });
        this.outletDataSubscriptions.set(e, i);
      }
      static ɵfac = function (r) {
        Yy();
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  go = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵcmp = Av({
        type: n,
        selectors: [['ng-component']],
        exportAs: ['emptyRouterOutlet'],
        decls: 1,
        vars: 0,
        template: function (r, i) {
          r & 1 && Ef$1(0, 'router-outlet');
        },
        dependencies: [mo],
        encapsulation: 2,
        changeDetection: 1,
      });
    }
    return n;
  })();
function vo(n) {
  let t = n.children && n.children.map(vo),
    e = t ? V(j$1({}, n), { children: t }) : j$1({}, n);
  return (
    !e.component &&
      !e.loadComponent &&
      (t || e.loadChildren) &&
      e.outlet &&
      e.outlet !== R$1 &&
      (e.component = go),
    e
  );
}
function Sh(n, t, e) {
  let r = Xn(n, t._root, e ? e._root : void 0);
  return new Jn(r, t);
}
function Xn(n, t, e) {
  if (e && n.shouldReuseRoute(t.value, e.value.snapshot)) {
    let r = e.value;
    r._futureSnapshot = t.value;
    let i = Dh(n, t, e);
    return new de$1(r, i);
  } else {
    if (n.shouldAttach(t.value)) {
      let s = n.retrieve(t.value);
      if (s !== null) {
        let o = s.route;
        return (
          (o.value._futureSnapshot = t.value),
          (o.children = t.children.map((a) => Xn(n, a))),
          o
        );
      }
    }
    let r = Th(t.value),
      i = t.children.map((s) => Xn(n, s));
    return new de$1(r, i);
  }
}
function Dh(n, t, e) {
  return t.children.map((r) => {
    for (let i of e.children) if (n.shouldReuseRoute(r.value, i.value.snapshot)) return Xn(n, r, i);
    return Xn(n, r);
  });
}
function Th(n) {
  return new Ge(
    new Dn(n.url),
    new Dn(n.params),
    new Dn(n.queryParams),
    new Dn(n.fragment),
    new Dn(n.data),
    n.outlet,
    n.component,
    n,
  );
}
var Xt = class {
    redirectTo;
    navigationBehaviorOptions;
    constructor(t, e) {
      ((this.redirectTo = t), (this.navigationBehaviorOptions = e));
    }
  },
  Vc = 'ngNavigationCancelingError';
function _i(n, t) {
  let { redirectTo: e, navigationBehaviorOptions: r } = lt(t)
      ? { redirectTo: t, navigationBehaviorOptions: void 0 }
      : t,
    i = qc(false, X.Redirect);
  return ((i.url = e), (i.navigationBehaviorOptions = r), i);
}
function qc(n, t) {
  let e = new Error(`NavigationCancelingError: ${''}`);
  return ((e[Vc] = true), (e.cancellationCode = t), e);
}
function Ch(n) {
  return Gc(n) && lt(n.url);
}
function Gc(n) {
  return !!n && n[Vc];
}
var ao = class {
    routeReuseStrategy;
    futureState;
    currState;
    forwardEvent;
    inputBindingEnabled;
    constructor(t, e, r, i, s) {
      ((this.routeReuseStrategy = t),
        (this.futureState = e),
        (this.currState = r),
        (this.forwardEvent = i),
        (this.inputBindingEnabled = s));
    }
    activate(t) {
      let e = this.futureState._root,
        r = this.currState ? this.currState._root : null;
      (this.deactivateChildRoutes(e, r, t),
        Ys(this.futureState.root),
        this.activateChildRoutes(e, r, t));
    }
    deactivateChildRoutes(t, e, r) {
      let i = qt(e);
      (t.children.forEach((s) => {
        let o = s.value.outlet;
        (this.deactivateRoutes(s, i[o], r), delete i[o]);
      }),
        Object.values(i).forEach((s) => {
          this.deactivateRouteAndItsChildren(s, r);
        }));
    }
    deactivateRoutes(t, e, r) {
      let i = t.value,
        s = e ? e.value : null;
      if (i === s)
        if (i.component) {
          let o = r.getContext(i.outlet);
          o && this.deactivateChildRoutes(t, e, o.children);
        } else this.deactivateChildRoutes(t, e, r);
      else s && this.deactivateRouteAndItsChildren(e, r);
    }
    deactivateRouteAndItsChildren(t, e) {
      t.value.component && this.routeReuseStrategy.shouldDetach(t.value.snapshot)
        ? this.detachAndStoreRouteSubtree(t, e)
        : this.deactivateRouteAndOutlet(t, e);
    }
    detachAndStoreRouteSubtree(t, e) {
      let r = e.getContext(t.value.outlet),
        i = r && t.value.component ? r.children : e,
        s = qt(t);
      for (let o of Object.values(s)) this.deactivateRouteAndItsChildren(o, i);
      if (r && r.outlet) {
        let o = r.outlet.detach(),
          a = r.children.onOutletDeactivated();
        this.routeReuseStrategy.store(t.value.snapshot, { componentRef: o, route: t, contexts: a });
      }
    }
    deactivateRouteAndOutlet(t, e) {
      let r = e.getContext(t.value.outlet),
        i = r && t.value.component ? r.children : e,
        s = qt(t);
      for (let o of Object.values(s)) this.deactivateRouteAndItsChildren(o, i);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
        (r.attachRef = null),
        (r.route = null));
    }
    activateChildRoutes(t, e, r) {
      let i = qt(e);
      (t.children.forEach((s) => {
        (this.activateRoutes(s, i[s.value.outlet], r), this.forwardEvent(new vi(s.value.snapshot)));
      }),
        t.children.length && this.forwardEvent(new mi(t.value.snapshot)));
    }
    activateRoutes(t, e, r) {
      let i = t.value,
        s = e ? e.value : null;
      if ((Ys(i), i === s))
        if (i.component) {
          let o = r.getOrCreateContext(i.outlet);
          this.activateChildRoutes(t, e, o.children);
        } else this.activateChildRoutes(t, e, r);
      else if (i.component) {
        let o = r.getOrCreateContext(i.outlet);
        if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(i.snapshot);
          (this.routeReuseStrategy.store(i.snapshot, null),
            o.children.onOutletReAttached(a.contexts),
            (o.attachRef = a.componentRef),
            (o.route = a.route.value),
            o.outlet && o.outlet.attach(a.componentRef, a.route.value),
            Ys(a.route.value),
            this.activateChildRoutes(t, null, o.children));
        } else
          ((o.attachRef = null),
            (o.route = i),
            o.outlet && o.outlet.activateWith(i, o.injector),
            this.activateChildRoutes(t, null, o.children));
      } else this.activateChildRoutes(t, null, r);
    }
  },
  wi = class {
    path;
    route;
    constructor(t) {
      ((this.path = t), (this.route = this.path[this.path.length - 1]));
    }
  },
  Wt = class {
    component;
    route;
    constructor(t, e) {
      ((this.component = t), (this.route = e));
    }
  };
function Rh(n, t, e) {
  let r = n._root,
    i = t ? t._root : null;
  return $n(r, i, e, [r.value]);
}
function Ah(n) {
  let t = n.routeConfig ? n.routeConfig.canActivateChild : null;
  return !t || t.length === 0 ? null : { node: n, guards: t };
}
function tn(n, t) {
  let e = Symbol(),
    r = t.get(n, e);
  return r === e ? (typeof n == 'function' && !ch$1(n) ? n : t.get(n)) : r;
}
function $n(n, t, e, r, i = { canDeactivateChecks: [], canActivateChecks: [] }) {
  let s = qt(t);
  return (
    n.children.forEach((o) => {
      (Ih(o, s[o.value.outlet], e, r.concat([o.value]), i), delete s[o.value.outlet]);
    }),
    Object.entries(s).forEach(([o, a]) => Vn(a, e.getContext(o), i)),
    i
  );
}
function Ih(n, t, e, r, i = { canDeactivateChecks: [], canActivateChecks: [] }) {
  let s = n.value,
    o = t ? t.value : null,
    a = e ? e.getContext(n.value.outlet) : null;
  if (o && s.routeConfig === o.routeConfig) {
    let c = kh(o, s, s.routeConfig.runGuardsAndResolvers);
    (c
      ? i.canActivateChecks.push(new wi(r))
      : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
      s.component ? $n(n, t, a ? a.children : null, r, i) : $n(n, t, e, r, i),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        i.canDeactivateChecks.push(new Wt(a.outlet.component, o)));
  } else
    (o && Vn(t, a, i),
      i.canActivateChecks.push(new wi(r)),
      s.component ? $n(n, null, a ? a.children : null, r, i) : $n(n, null, e, r, i));
  return i;
}
function kh(n, t, e) {
  if (typeof e == 'function') return Zr$1(t._environmentInjector, () => e(n, t));
  switch (e) {
    case 'pathParamsChange':
      return !bt(n.url, t.url);
    case 'pathParamsOrQueryParamsChange':
      return !bt(n.url, t.url) || !ke(n.queryParams, t.queryParams);
    case 'always':
      return true;
    case 'paramsOrQueryParamsChange':
      return !so(n, t) || !ke(n.queryParams, t.queryParams);
    default:
      return !so(n, t);
  }
}
function Vn(n, t, e) {
  let r = qt(n),
    i = n.value;
  (Object.entries(r).forEach(([s, o]) => {
    i.component ? (t ? Vn(o, t.children.getContext(s), e) : Vn(o, null, e)) : Vn(o, t, e);
  }),
    i.component
      ? t && t.outlet && t.outlet.isActivated
        ? e.canDeactivateChecks.push(new Wt(t.outlet.component, i))
        : e.canDeactivateChecks.push(new Wt(null, i))
      : e.canDeactivateChecks.push(new Wt(null, i)));
}
function tr(n) {
  return typeof n == 'function';
}
function Oh(n) {
  return typeof n == 'boolean';
}
function xh(n) {
  return n && tr(n.canLoad);
}
function Ph(n) {
  return n && tr(n.canActivate);
}
function Mh(n) {
  return n && tr(n.canActivateChild);
}
function Nh(n) {
  return n && tr(n.canDeactivate);
}
function Lh(n) {
  return n && tr(n.canMatch);
}
function Wc(n) {
  return n instanceof Tn || n?.name === 'EmptyError';
}
var ti = Symbol('INITIAL_VALUE');
function Zt() {
  return rh$1((n) =>
    Bp$1(n.map((t) => t.pipe(Ti$1(1), nh$1(ti)))).pipe(
      Ge$1((t) => {
        for (let e of t)
          if (e !== true) {
            if (e === ti) return ti;
            if (e === false || Fh(e)) return e;
          }
        return true;
      }),
      $t$1((t) => t !== ti),
      Ti$1(1),
    ),
  );
}
function Fh(n) {
  return lt(n) || n instanceof Xt;
}
function Kc(n) {
  return n.aborted
    ? Ap$1(void 0).pipe(Ti$1(1))
    : new x$1((t) => {
        let e = () => {
          (t.next(), t.complete());
        };
        return (n.addEventListener('abort', e), () => n.removeEventListener('abort', e));
      });
}
function Jc(n) {
  return oh$1(Kc(n));
}
function Uh(n) {
  return ht$1((t) => {
    let {
      targetSnapshot: e,
      currentSnapshot: r,
      guards: { canActivateChecks: i, canDeactivateChecks: s },
    } = t;
    return s.length === 0 && i.length === 0
      ? Ap$1(V(j$1({}, t), { guardsResult: true }))
      : jh(s, e, r).pipe(
          ht$1((o) => (o && Oh(o) ? Bh(e, i, n) : Ap$1(o))),
          Ge$1((o) => V(j$1({}, t), { guardsResult: o })),
        );
  });
}
function jh(n, t, e) {
  return Ee$1(n).pipe(
    ht$1((r) => qh(r.component, r.route, e, t)),
    Kp$1((r) => r !== true, true),
  );
}
function Bh(n, t, e) {
  return Ee$1(t).pipe(
    Gp$1((r) => Ar$1(zh(r.route.parent, e), $h(r.route, e), Vh(n, r.path), Hh(n, r.route))),
    Kp$1((r) => r !== true, true),
  );
}
function $h(n, t) {
  return (n !== null && t && t(new gi(n)), Ap$1(true));
}
function zh(n, t) {
  return (n !== null && t && t(new pi(n)), Ap$1(true));
}
function Hh(n, t) {
  let e = t.routeConfig ? t.routeConfig.canActivate : null;
  if (!e || e.length === 0) return Ap$1(true);
  let r = e.map((i) =>
    Up$1(() => {
      let s = t._environmentInjector,
        o = tn(i, s),
        a = Ph(o) ? o.canActivate(t, n) : Zr$1(s, () => o(t, n));
      return Et(a).pipe(Kp$1());
    }),
  );
  return Ap$1(r).pipe(Zt());
}
function Vh(n, t) {
  let e = t[t.length - 1],
    i = t
      .slice(0, t.length - 1)
      .reverse()
      .map((s) => Ah(s))
      .filter((s) => s !== null)
      .map((s) =>
        Up$1(() => {
          let o = s.guards.map((a) => {
            let c = s.node._environmentInjector,
              l = tn(a, c),
              u = Mh(l) ? l.canActivateChild(e, n) : Zr$1(c, () => l(e, n));
            return Et(u).pipe(Kp$1());
          });
          return Ap$1(o).pipe(Zt());
        }),
      );
  return Ap$1(i).pipe(Zt());
}
function qh(n, t, e, r) {
  let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
  if (!i || i.length === 0) return Ap$1(true);
  let s = i.map((o) => {
    let a = t._environmentInjector,
      c = tn(o, a),
      l = Nh(c) ? c.canDeactivate(n, t, e, r) : Zr$1(a, () => c(n, t, e, r));
    return Et(l).pipe(Kp$1());
  });
  return Ap$1(s).pipe(Zt());
}
function Gh(n, t, e, r, i) {
  let s = t.canLoad;
  if (s === void 0 || s.length === 0) return Ap$1(true);
  let o = s.map((a) => {
    let c = tn(a, n),
      l = xh(c) ? c.canLoad(t, e) : Zr$1(n, () => c(t, e)),
      u = Et(l);
    return i ? u.pipe(Jc(i)) : u;
  });
  return Ap$1(o).pipe(Zt(), Yc(r));
}
function Yc(n) {
  return Ip$1(
    ih$1((t) => {
      if (typeof t != 'boolean') throw _i(n, t);
    }),
    Ge$1((t) => t === true),
  );
}
function Wh(n, t, e, r, i, s) {
  let o = t.canMatch;
  if (!o || o.length === 0) return Ap$1(true);
  let a = o.map((c) => {
    let l = tn(c, n),
      u = Lh(l) ? l.canMatch(t, e, i) : Zr$1(n, () => l(t, e, i));
    return Et(u).pipe(Jc(s));
  });
  return Ap$1(a).pipe(Zt(), Yc(r));
}
var Ve = class n extends Error {
    segmentGroup;
    constructor(t) {
      (super(), (this.segmentGroup = t || null), Object.setPrototypeOf(this, n.prototype));
    }
  },
  Zn = class n extends Error {
    urlTree;
    constructor(t) {
      (super(), (this.urlTree = t), Object.setPrototypeOf(this, n.prototype));
    }
  };
function Kh(n) {
  throw new C(4e3, false);
}
function Jh(n) {
  throw qc(false, X.GuardRejected);
}
var co = class {
  urlSerializer;
  urlTree;
  constructor(t, e) {
    ((this.urlSerializer = t), (this.urlTree = e));
  }
  async lineralizeSegments(t, e) {
    let r = [],
      i = e.root;
    for (;;) {
      if (((r = r.concat(i.segments)), i.numberOfChildren === 0)) return r;
      if (i.numberOfChildren > 1 || !i.children[R$1]) throw Kh(`${t.redirectTo}`);
      i = i.children[R$1];
    }
  }
  async applyRedirectCommands(t, e, r, i, s) {
    let o = await Yh(e, i, s);
    if (o instanceof he$1) throw new Zn(o);
    let a = this.applyRedirectCreateUrlTree(o, this.urlSerializer.parse(o), t, r);
    if (o[0] === '/') throw new Zn(a);
    return a;
  }
  applyRedirectCreateUrlTree(t, e, r, i) {
    let s = this.createSegmentGroup(t, e.root, r, i);
    return new he$1(s, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment);
  }
  createQueryParams(t, e) {
    let r = {};
    return (
      Object.entries(t).forEach(([i, s]) => {
        if (typeof s == 'string' && s[0] === ':') {
          let a = s.substring(1);
          r[i] = e[a];
        } else r[i] = s;
      }),
      r
    );
  }
  createSegmentGroup(t, e, r, i) {
    let s = this.createSegments(t, e.segments, r, i),
      o = {};
    return (
      Object.entries(e.children).forEach(([a, c]) => {
        o[a] = this.createSegmentGroup(t, c, r, i);
      }),
      new M(s, o)
    );
  }
  createSegments(t, e, r, i) {
    return e.map((s) => (s.path[0] === ':' ? this.findPosParam(t, s, i) : this.findOrReturn(s, r)));
  }
  findPosParam(t, e, r) {
    let i = r[e.path.substring(1)];
    if (!i) throw new C(4001, false);
    return i;
  }
  findOrReturn(t, e) {
    let r = 0;
    for (let i of e) {
      if (i.path === t.path) return (e.splice(r), i);
      r++;
    }
    return t;
  }
};
function Yh(n, t, e) {
  if (typeof n == 'string') return Promise.resolve(n);
  let r = n;
  return si(Et(Zr$1(e, () => r(t))));
}
function Xh(n, t) {
  return (
    n.providers && !n._injector && (n._injector = af$1(n.providers, t, `Route: ${n.path}`)),
    n._injector ?? t
  );
}
function Ce$1(n) {
  return n.outlet || R$1;
}
function Zh(n, t) {
  let e = n.filter((r) => Ce$1(r) === t);
  return (e.push(...n.filter((r) => Ce$1(r) !== t)), e);
}
var lo = {
  matched: false,
  consumedSegments: [],
  remainingSegments: [],
  parameters: {},
  positionalParamSegments: {},
};
function Xc(n) {
  return {
    routeConfig: n.routeConfig,
    url: n.url,
    params: n.params,
    queryParams: n.queryParams,
    fragment: n.fragment,
    data: n.data,
    outlet: n.outlet,
    title: n.title,
    paramMap: n.paramMap,
    queryParamMap: n.queryParamMap,
  };
}
function Qh(n, t, e, r, i, s, o) {
  let a = Zc(n, t, e);
  if (!a.matched) return Ap$1(a);
  let c = Xc(s(a));
  return ((r = Xh(t, r)), Wh(r, t, e, i, c, o).pipe(Ge$1((l) => (l === true ? a : j$1({}, lo)))));
}
function Zc(n, t, e) {
  if (t.path === '')
    return t.pathMatch === 'full' && (n.hasChildren() || e.length > 0)
      ? j$1({}, lo)
      : {
          matched: true,
          consumedSegments: [],
          remainingSegments: e,
          parameters: {},
          positionalParamSegments: {},
        };
  let i = (t.matcher || wc)(e, n, t);
  if (!i) return j$1({}, lo);
  let s = {};
  Object.entries(i.posParams ?? {}).forEach(([a, c]) => {
    s[a] = c.path;
  });
  let o = i.consumed.length > 0 ? j$1(j$1({}, s), i.consumed[i.consumed.length - 1].parameters) : s;
  return {
    matched: true,
    consumedSegments: i.consumed,
    remainingSegments: e.slice(i.consumed.length),
    parameters: o,
    positionalParamSegments: i.posParams ?? {},
  };
}
function yc(n, t, e, r, i) {
  return e.length > 0 && nf(n, e, r, i)
    ? { segmentGroup: new M(t, tf(r, new M(e, n.children))), slicedSegments: [] }
    : e.length === 0 && rf(n, e, r)
      ? { segmentGroup: new M(n.segments, ef(n, e, r, n.children)), slicedSegments: e }
      : { segmentGroup: new M(n.segments, n.children), slicedSegments: e };
}
function ef(n, t, e, r) {
  let i = {};
  for (let s of e)
    if (Si(n, t, s) && !r[Ce$1(s)]) {
      let o = new M([], {});
      i[Ce$1(s)] = o;
    }
  return j$1(j$1({}, r), i);
}
function tf(n, t) {
  let e = {};
  e[R$1] = t;
  for (let r of n)
    if (r.path === '' && Ce$1(r) !== R$1) {
      let i = new M([], {});
      e[Ce$1(r)] = i;
    }
  return e;
}
function nf(n, t, e, r) {
  return e.some((i) =>
    !Si(n, t, i) || !(Ce$1(i) !== R$1) ? false : !(r !== void 0 && Ce$1(i) === r),
  );
}
function rf(n, t, e) {
  return e.some((r) => Si(n, t, r));
}
function Si(n, t, e) {
  return (n.hasChildren() || t.length > 0) && e.pathMatch === 'full' ? false : e.path === '';
}
function sf(n, t, e) {
  return t.length === 0 && !n.children[e];
}
var uo = class {};
async function of(n, t, e, r, i, s, o, a) {
  return new ho(n, t, e, r, i, o, s, a).recognize();
}
var af = 31,
  ho = class {
    injector;
    configLoader;
    rootComponentType;
    config;
    urlTree;
    paramsInheritanceStrategy;
    urlSerializer;
    abortSignal;
    applyRedirects;
    absoluteRedirectCount = 0;
    allowRedirects = true;
    constructor(t, e, r, i, s, o, a, c) {
      ((this.injector = t),
        (this.configLoader = e),
        (this.rootComponentType = r),
        (this.config = i),
        (this.urlTree = s),
        (this.paramsInheritanceStrategy = o),
        (this.urlSerializer = a),
        (this.abortSignal = c),
        (this.applyRedirects = new co(this.urlSerializer, this.urlTree)));
    }
    noMatchError(t) {
      return new C(4002, `'${t.segmentGroup}'`);
    }
    async recognize() {
      let t = yc(this.urlTree.root, [], [], this.config).segmentGroup,
        { children: e, rootSnapshot: r } = await this.match(t),
        i = new de$1(r, e),
        s = new Yn('', i),
        o = Pc(r, [], this.urlTree.queryParams, this.urlTree.fragment);
      return (
        (o.queryParams = this.urlTree.queryParams),
        (s.url = this.urlSerializer.serialize(o)),
        { state: s, tree: o }
      );
    }
    async match(t) {
      let e = new Yt(
        [],
        Object.freeze({}),
        Object.freeze(j$1({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        R$1,
        this.rootComponentType,
        null,
        {},
        this.injector,
      );
      try {
        return {
          children: await this.processSegmentGroup(this.injector, this.config, t, R$1, e),
          rootSnapshot: e,
        };
      } catch (r) {
        if (r instanceof Zn) return ((this.urlTree = r.urlTree), this.match(r.urlTree.root));
        throw r instanceof Ve ? this.noMatchError(r) : r;
      }
    }
    async processSegmentGroup(t, e, r, i, s) {
      if (r.segments.length === 0 && r.hasChildren()) return this.processChildren(t, e, r, s);
      let o = await this.processSegment(t, e, r, r.segments, i, true, s);
      return o instanceof de$1 ? [o] : [];
    }
    async processChildren(t, e, r, i) {
      let s = [];
      for (let c of Object.keys(r.children)) c === 'primary' ? s.unshift(c) : s.push(c);
      let o = [];
      for (let c of s) {
        let l = r.children[c],
          u = Zh(e, c),
          d = await this.processSegmentGroup(t, u, l, c, i);
        o.push(...d);
      }
      let a = Qc(o);
      return (cf(a), a);
    }
    async processSegment(t, e, r, i, s, o, a) {
      for (let c of e)
        try {
          return await this.processSegmentAgainstRoute(c._injector ?? t, e, c, r, i, s, o, a);
        } catch (l) {
          if (l instanceof Ve || Wc(l)) continue;
          throw l;
        }
      if (sf(r, i, s)) return new uo();
      throw new Ve(r);
    }
    async processSegmentAgainstRoute(t, e, r, i, s, o, a, c) {
      if (Ce$1(r) !== o && (o === R$1 || !Si(i, s, r))) throw new Ve(i);
      if (r.redirectTo === void 0) return this.matchSegmentAgainstRoute(t, i, r, s, o, c);
      if (this.allowRedirects && a)
        return this.expandSegmentAgainstRouteUsingRedirect(t, i, e, r, s, o, c);
      throw new Ve(i);
    }
    async expandSegmentAgainstRouteUsingRedirect(t, e, r, i, s, o, a) {
      let {
        matched: c,
        parameters: l,
        consumedSegments: u,
        positionalParamSegments: d,
        remainingSegments: h,
      } = Zc(e, i, s);
      if (!c) throw new Ve(e);
      typeof i.redirectTo == 'string' &&
        i.redirectTo[0] === '/' &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > af && (this.allowRedirects = false));
      let f = this.createSnapshot(t, i, s, l, a);
      if (this.abortSignal.aborted) throw new Error(this.abortSignal.reason);
      let p = await this.applyRedirects.applyRedirectCommands(u, i.redirectTo, d, Xc(f), t),
        g = await this.applyRedirects.lineralizeSegments(i, p);
      return this.processSegment(t, r, e, g.concat(h), o, false, a);
    }
    createSnapshot(t, e, r, i, s) {
      let o = new Yt(
          r,
          i,
          Object.freeze(j$1({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          uf(e),
          Ce$1(e),
          e.component ?? e._loadedComponent ?? null,
          e,
          df(e),
          t,
        ),
        a = fo(o, s, this.paramsInheritanceStrategy);
      return ((o.params = Object.freeze(a.params)), (o.data = Object.freeze(a.data)), o);
    }
    async matchSegmentAgainstRoute(t, e, r, i, s, o) {
      if (this.abortSignal.aborted) throw new Error(this.abortSignal.reason);
      let a = (w) => this.createSnapshot(t, r, w.consumedSegments, w.parameters, o),
        c = await si(Qh(e, r, i, t, this.urlSerializer, a, this.abortSignal));
      if ((r.path === '**' && (e.children = {}), !c?.matched)) throw new Ve(e);
      t = r._injector ?? t;
      let { routes: l } = await this.getChildConfig(t, r, i),
        u = r._loadedInjector ?? t,
        { parameters: d, consumedSegments: h, remainingSegments: f } = c,
        p = this.createSnapshot(t, r, h, d, o),
        { segmentGroup: g, slicedSegments: y } = yc(e, h, f, l, s);
      if (y.length === 0 && g.hasChildren()) {
        let w = await this.processChildren(u, l, g, p);
        return new de$1(p, w);
      }
      if (l.length === 0 && y.length === 0) return new de$1(p, []);
      let v = Ce$1(r) === s,
        D = await this.processSegment(u, l, g, y, v ? R$1 : s, true, p);
      return new de$1(p, D instanceof de$1 ? [D] : []);
    }
    async getChildConfig(t, e, r) {
      if (e.children) return { routes: e.children, injector: t };
      if (e.loadChildren) {
        if (e._loadedRoutes !== void 0) {
          let s = e._loadedNgModuleFactory;
          return (
            s && !e._loadedInjector && (e._loadedInjector = s.create(t).injector),
            { routes: e._loadedRoutes, injector: e._loadedInjector }
          );
        }
        if (this.abortSignal.aborted) throw new Error(this.abortSignal.reason);
        if (await si(Gh(t, e, r, this.urlSerializer, this.abortSignal))) {
          let s = await this.configLoader.loadChildren(t, e);
          return (
            (e._loadedRoutes = s.routes),
            (e._loadedInjector = s.injector),
            (e._loadedNgModuleFactory = s.factory),
            s
          );
        }
        throw Jh();
      }
      return { routes: [], injector: t };
    }
  };
function cf(n) {
  n.sort((t, e) =>
    t.value.outlet === R$1
      ? -1
      : e.value.outlet === R$1
        ? 1
        : t.value.outlet.localeCompare(e.value.outlet),
  );
}
function lf(n) {
  let t = n.value.routeConfig;
  return t && t.path === '';
}
function Qc(n) {
  let t = [],
    e = new Set();
  for (let r of n) {
    if (!lf(r)) {
      t.push(r);
      continue;
    }
    let i = t.find((s) => r.value.routeConfig === s.value.routeConfig);
    i !== void 0 ? (i.children.push(...r.children), e.add(i)) : t.push(r);
  }
  for (let r of e) {
    let i = Qc(r.children);
    t.push(new de$1(r.value, i));
  }
  return t.filter((r) => !e.has(r));
}
function uf(n) {
  return n.data || {};
}
function df(n) {
  return n.resolve || {};
}
function hf(n, t, e, r, i, s, o) {
  return ht$1(async (a) => {
    let { state: c, tree: l } = await of(n, t, e, r, a.extractedUrl, i, s, o);
    return V(j$1({}, a), { targetSnapshot: c, urlAfterRedirects: l });
  });
}
function ff(n) {
  return ht$1((t) => {
    let {
      targetSnapshot: e,
      guards: { canActivateChecks: r },
    } = t;
    if (!r.length) return Ap$1(t);
    let i = new Set(r.map((a) => a.route)),
      s = new Set();
    for (let a of i) if (!s.has(a)) for (let c of el(a)) s.add(c);
    let o = 0;
    return Ee$1(s).pipe(
      Gp$1((a) => (i.has(a) ? pf(a, e, n) : ((a.data = fo(a, a.parent, n).resolve), Ap$1(void 0)))),
      ih$1(() => o++),
      Jp$1(1),
      ht$1((a) => (o === s.size ? Ap$1(t) : ft$1)),
    );
  });
}
function el(n) {
  let t = n.children.map((e) => el(e)).flat();
  return [n, ...t];
}
function pf(n, t, e) {
  let r = n.routeConfig,
    i = n._resolve;
  return (
    r?.title !== void 0 && !$c(r) && (i[Qn] = r.title),
    Up$1(
      () => (
        (n.data = fo(n, n.parent, e).resolve),
        mf(i, n, t).pipe(
          Ge$1((s) => ((n._resolvedData = s), (n.data = j$1(j$1({}, n.data), s)), null)),
        )
      ),
    )
  );
}
function mf(n, t, e) {
  let r = Zs(n);
  if (r.length === 0) return Ap$1({});
  let i = {};
  return Ee$1(r).pipe(
    ht$1((s) =>
      gf(n[s], t, e).pipe(
        Kp$1(),
        ih$1((o) => {
          if (o instanceof Xt) throw _i(new ct(), o);
          i[s] = o;
        }),
      ),
    ),
    Jp$1(1),
    Ge$1(() => i),
    Pc$1((s) => (Wc(s) ? ft$1 : kp$1(s))),
  );
}
function gf(n, t, e) {
  let r = t._environmentInjector,
    i = tn(n, r),
    s = i.resolve ? i.resolve(t, e) : Zr$1(r, () => i(t, e));
  return Et(s);
}
function _c(n) {
  return rh$1((t) => {
    let e = n(t);
    return e ? Ee$1(e).pipe(Ge$1(() => t)) : Ap$1(t);
  });
}
var bo = (() => {
    class n {
      buildTitle(e) {
        let r,
          i = e.root;
        for (; i !== void 0; )
          ((r = this.getResolvedTitleForRoute(i) ?? r),
            (i = i.children.find((s) => s.outlet === R$1)));
        return r;
      }
      getResolvedTitleForRoute(e) {
        return e.data[Qn];
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: () => E$1(tl) });
    }
    return n;
  })(),
  tl = (() => {
    class n extends bo {
      title;
      constructor(e) {
        (super(), (this.title = e));
      }
      updateTitle(e) {
        let r = this.buildTitle(e);
        r !== void 0 && this.title.setTitle(r);
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie(hc));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
    }
    return n;
  })(),
  nn = new N('', { factory: () => ({}) }),
  nr = new N(''),
  nl = (() => {
    class n {
      componentLoaders = new WeakMap();
      childrenLoaders = new WeakMap();
      onLoadStartListener;
      onLoadEndListener;
      compiler = E$1(zE);
      async loadComponent(e, r) {
        if (this.componentLoaders.get(r)) return this.componentLoaders.get(r);
        if (r._loadedComponent) return Promise.resolve(r._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(r);
        let i = (async () => {
          try {
            let s = await Sc(Zr$1(e, () => r.loadComponent())),
              o = await il(mO(s));
            return (
              this.onLoadEndListener && this.onLoadEndListener(r),
              (r._loadedComponent = o),
              o
            );
          } finally {
            this.componentLoaders.delete(r);
          }
        })();
        return (this.componentLoaders.set(r, i), i);
      }
      loadChildren(e, r) {
        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
        if (r._loadedRoutes)
          return Promise.resolve({ routes: r._loadedRoutes, injector: r._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(r);
        let i = (async () => {
          try {
            let s = await rl(r, this.compiler, e, this.onLoadEndListener);
            return (
              (r._loadedRoutes = s.routes),
              (r._loadedInjector = s.injector),
              (r._loadedNgModuleFactory = s.factory),
              s
            );
          } finally {
            this.childrenLoaders.delete(r);
          }
        })();
        return (this.childrenLoaders.set(r, i), i);
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
async function rl(n, t, e, r) {
  let i = await Sc(Zr$1(e, () => n.loadChildren())),
    s = await il(mO(i)),
    o;
  (s instanceof sf$1 || Array.isArray(s) ? (o = s) : (o = await t.compileModuleAsync(s)),
    r && r(n));
  let a, c, u;
  return (
    Array.isArray(o)
      ? ((c = o), true)
      : ((a = o.create(e).injector),
        (u = o),
        (c = a.get(nr, [], { optional: true, self: true }).flat())),
    { routes: c.map(vo), injector: a, factory: u }
  );
}
async function il(n) {
  return n;
}
var Di = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: () => E$1(vf) });
    }
    return n;
  })(),
  vf = (() => {
    class n {
      shouldProcessUrl(e) {
        return true;
      }
      extract(e) {
        return e;
      }
      merge(e, r) {
        return e;
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  sl = new N('');
var bf = () => {},
  ol = new N(''),
  al = (() => {
    class n {
      currentNavigation = _e(null, { equal: () => false });
      currentTransition = null;
      lastSuccessfulNavigation = _e(null);
      events = new J$1();
      transitionAbortWithErrorSubject = new J$1();
      configLoader = E$1(nl);
      environmentInjector = E$1(oe$1);
      destroyRef = E$1(Ve$1);
      urlSerializer = E$1(Qt);
      rootContexts = E$1(en);
      location = E$1(zt);
      inputBindingEnabled = E$1(er, { optional: true }) !== null;
      titleStrategy = E$1(bo);
      options = E$1(nn, { optional: true }) || {};
      paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || Eh;
      urlHandlingStrategy = E$1(Di);
      createViewTransition = E$1(sl, { optional: true });
      navigationErrorHandler = E$1(ol, { optional: true });
      navigationId = 0;
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      transitions;
      afterPreactivation = () => Ap$1(void 0);
      rootComponentType = null;
      destroyed = false;
      constructor() {
        let e = (i) => this.events.next(new hi(i)),
          r = (i) => this.events.next(new fi(i));
        ((this.configLoader.onLoadEndListener = r),
          (this.configLoader.onLoadStartListener = e),
          this.destroyRef.onDestroy(() => {
            this.destroyed = true;
          }));
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(e) {
        let r = ++this.navigationId;
        re(() => {
          this.transitions?.next(
            V(j$1({}, e), {
              extractedUrl: this.urlHandlingStrategy.extract(e.rawUrl),
              targetSnapshot: null,
              targetRouterState: null,
              guards: { canActivateChecks: [], canDeactivateChecks: [] },
              guardsResult: null,
              id: r,
              routesRecognizeHandler: {},
              beforeActivateHandler: {},
            }),
          );
        });
      }
      setupNavigations(e) {
        return (
          (this.transitions = new Dn(null)),
          this.transitions.pipe(
            $t$1((r) => r !== null),
            rh$1((r) => {
              let i = true,
                s = false,
                o = new AbortController(),
                a = () => !s && this.currentTransition?.id === r.id;
              return Ap$1(r).pipe(
                rh$1((c) => {
                  if (this.navigationId > r.id)
                    return (
                      this.cancelNavigationTransition(r, '', X.SupersededByNewNavigation),
                      ft$1
                    );
                  this.currentTransition = r;
                  let l = this.lastSuccessfulNavigation();
                  this.currentNavigation.set({
                    id: c.id,
                    initialUrl: c.rawUrl,
                    extractedUrl: c.extractedUrl,
                    targetBrowserUrl:
                      typeof c.extras.browserUrl == 'string'
                        ? this.urlSerializer.parse(c.extras.browserUrl)
                        : c.extras.browserUrl,
                    trigger: c.source,
                    extras: c.extras,
                    previousNavigation: l ? V(j$1({}, l), { previousNavigation: null }) : null,
                    abort: () => o.abort(),
                    routesRecognizeHandler: c.routesRecognizeHandler,
                    beforeActivateHandler: c.beforeActivateHandler,
                  });
                  let u =
                      !e.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl(),
                    d = c.extras.onSameUrlNavigation ?? e.onSameUrlNavigation;
                  if (!u && d !== 'reload')
                    return (
                      this.events.next(
                        new qe(
                          c.id,
                          this.urlSerializer.serialize(c.rawUrl),
                          '',
                          Gn.IgnoredSameUrlNavigation,
                        ),
                      ),
                      c.resolve(false),
                      ft$1
                    );
                  if (this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                    return Ap$1(c).pipe(
                      rh$1(
                        (h) => (
                          this.events.next(
                            new _t(
                              h.id,
                              this.urlSerializer.serialize(h.extractedUrl),
                              h.source,
                              h.restoredState,
                            ),
                          ),
                          h.id !== this.navigationId ? ft$1 : Promise.resolve(h)
                        ),
                      ),
                      hf(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        e.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy,
                        o.signal,
                      ),
                      ih$1((h) => {
                        ((r.targetSnapshot = h.targetSnapshot),
                          (r.urlAfterRedirects = h.urlAfterRedirects),
                          this.currentNavigation.update(
                            (f) => ((f.finalUrl = h.urlAfterRedirects), f),
                          ),
                          this.events.next(new Kn()));
                      }),
                      rh$1((h) =>
                        Ee$1(r.routesRecognizeHandler.deferredHandle ?? Ap$1(void 0)).pipe(
                          Ge$1(() => h),
                        ),
                      ),
                      ih$1(() => {
                        let h = new Wn(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot,
                        );
                        this.events.next(h);
                      }),
                    );
                  if (u && this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)) {
                    let { id: h, extractedUrl: f, source: p, restoredState: g, extras: y } = c,
                      v = new _t(h, this.urlSerializer.serialize(f), p, g);
                    this.events.next(v);
                    let D = jc(this.rootComponentType, this.environmentInjector).snapshot;
                    return (
                      (this.currentTransition = r =
                        V(j$1({}, c), {
                          targetSnapshot: D,
                          urlAfterRedirects: f,
                          extras: V(j$1({}, y), { skipLocationChange: false, replaceUrl: false }),
                        })),
                      this.currentNavigation.update((w) => ((w.finalUrl = f), w)),
                      Ap$1(r)
                    );
                  } else
                    return (
                      this.events.next(
                        new qe(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          '',
                          Gn.IgnoredByUrlHandlingStrategy,
                        ),
                      ),
                      c.resolve(false),
                      ft$1
                    );
                }),
                Ge$1((c) => {
                  let l = new ci(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot,
                  );
                  return (
                    this.events.next(l),
                    (this.currentTransition = r =
                      V(j$1({}, c), {
                        guards: Rh(c.targetSnapshot, c.currentSnapshot, this.rootContexts),
                      })),
                    r
                  );
                }),
                Uh((c) => this.events.next(c)),
                rh$1((c) => {
                  if (
                    ((r.guardsResult = c.guardsResult),
                    c.guardsResult && typeof c.guardsResult != 'boolean')
                  )
                    throw _i(this.urlSerializer, c.guardsResult);
                  let l = new li(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot,
                    !!c.guardsResult,
                  );
                  if ((this.events.next(l), !a())) return ft$1;
                  if (!c.guardsResult)
                    return (this.cancelNavigationTransition(c, '', X.GuardRejected), ft$1);
                  if (c.guards.canActivateChecks.length === 0) return Ap$1(c);
                  let u = new ui(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot,
                  );
                  if ((this.events.next(u), !a())) return ft$1;
                  let d = false;
                  return Ap$1(c).pipe(
                    ff(this.paramsInheritanceStrategy),
                    ih$1({
                      next: () => {
                        d = true;
                        let h = new di(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot,
                        );
                        this.events.next(h);
                      },
                      complete: () => {
                        d || this.cancelNavigationTransition(c, '', X.NoDataFromResolver);
                      },
                    }),
                  );
                }),
                _c((c) => {
                  let l = (d) => {
                      let h = [];
                      if (d.routeConfig?._loadedComponent)
                        d.component = d.routeConfig?._loadedComponent;
                      else if (d.routeConfig?.loadComponent) {
                        let f = d._environmentInjector;
                        h.push(
                          this.configLoader.loadComponent(f, d.routeConfig).then((p) => {
                            d.component = p;
                          }),
                        );
                      }
                      for (let f of d.children) h.push(...l(f));
                      return h;
                    },
                    u = l(c.targetSnapshot.root);
                  return u.length === 0 ? Ap$1(c) : Ee$1(Promise.all(u).then(() => c));
                }),
                rh$1((c) => {
                  let l = Sh(e.routeReuseStrategy, c.targetSnapshot, c.currentRouterState);
                  return (
                    (this.currentTransition = r = c = V(j$1({}, c), { targetRouterState: l })),
                    this.currentNavigation.update((u) => ((u.targetRouterState = l), u)),
                    Ap$1(c)
                  );
                }),
                _c(() => this.afterPreactivation()),
                rh$1(() => {
                  let { currentSnapshot: c, targetSnapshot: l } = r,
                    u = this.createViewTransition?.(this.environmentInjector, c.root, l.root);
                  return u ? Ee$1(u).pipe(Ge$1(() => r)) : Ap$1(r);
                }),
                Ti$1(1),
                rh$1((c) => {
                  ((i = false), this.events.next(new Kt()));
                  let l = r.beforeActivateHandler.deferredHandle;
                  return l ? Ee$1(l.then(() => c)) : Ap$1(c);
                }),
                ih$1((c) => {
                  (new ao(
                    e.routeReuseStrategy,
                    r.targetRouterState,
                    r.currentRouterState,
                    (l) => this.events.next(l),
                    this.inputBindingEnabled,
                  ).activate(this.rootContexts),
                    a() &&
                      ((s = true),
                      this.currentNavigation.update((l) => ((l.abort = bf), l)),
                      this.lastSuccessfulNavigation.set(re(this.currentNavigation)),
                      this.events.next(
                        new Oe(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                        ),
                      ),
                      this.titleStrategy?.updateTitle(c.targetRouterState.snapshot),
                      c.resolve(true)));
                }),
                oh$1(
                  Kc(o.signal).pipe(
                    $t$1(() => !s && i),
                    ih$1(() => {
                      this.cancelNavigationTransition(r, o.signal.reason + '', X.Aborted);
                    }),
                  ),
                ),
                ih$1({
                  complete: () => {
                    s = true;
                  },
                }),
                oh$1(
                  this.transitionAbortWithErrorSubject.pipe(
                    ih$1((c) => {
                      throw c;
                    }),
                  ),
                ),
                Yp$1(() => {
                  (o.abort(),
                    s || this.cancelNavigationTransition(r, '', X.SupersededByNewNavigation),
                    this.currentTransition?.id === r.id &&
                      (this.currentNavigation.set(null), (this.currentTransition = null)));
                }),
                Pc$1((c) => {
                  if (((s = true), this.destroyed)) return (r.resolve(false), ft$1);
                  if (Gc(c))
                    (this.events.next(
                      new Ee(
                        r.id,
                        this.urlSerializer.serialize(r.extractedUrl),
                        c.message,
                        c.cancellationCode,
                      ),
                    ),
                      Ch(c)
                        ? this.events.next(new Jt(c.url, c.navigationBehaviorOptions))
                        : r.resolve(false));
                  else {
                    let l = new wt(
                      r.id,
                      this.urlSerializer.serialize(r.extractedUrl),
                      c,
                      r.targetSnapshot ?? void 0,
                    );
                    try {
                      let u = Zr$1(this.environmentInjector, () =>
                        this.navigationErrorHandler?.(l),
                      );
                      if (u instanceof Xt) {
                        let { message: d, cancellationCode: h } = _i(this.urlSerializer, u);
                        (this.events.next(
                          new Ee(r.id, this.urlSerializer.serialize(r.extractedUrl), d, h),
                        ),
                          this.events.next(new Jt(u.redirectTo, u.navigationBehaviorOptions)));
                      } else throw (this.events.next(l), c);
                    } catch (u) {
                      this.options.resolveNavigationPromiseOnError ? r.resolve(false) : r.reject(u);
                    }
                  }
                  return ft$1;
                }),
              );
            }),
          )
        );
      }
      cancelNavigationTransition(e, r, i) {
        let s = new Ee(e.id, this.urlSerializer.serialize(e.extractedUrl), r, i);
        (this.events.next(s), e.resolve(false));
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let e = this.urlHandlingStrategy.extract(
            this.urlSerializer.parse(this.location.path(true)),
          ),
          r = re(this.currentNavigation),
          i = r?.targetBrowserUrl ?? r?.extractedUrl;
        return e.toString() !== i?.toString() && !r?.extras.skipLocationChange;
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
function yf(n) {
  return n !== Hn;
}
var cl = new N('');
var ll = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: () => E$1(_f) });
    }
    return n;
  })(),
  Ei = class {
    shouldDetach(t) {
      return false;
    }
    store(t, e) {}
    shouldAttach(t) {
      return false;
    }
    retrieve(t) {
      return null;
    }
    shouldReuseRoute(t, e) {
      return t.routeConfig === e.routeConfig;
    }
    shouldDestroyInjector(t) {
      return true;
    }
  },
  _f = (() => {
    class n extends Ei {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  Ti = (() => {
    class n {
      urlSerializer = E$1(Qt);
      options = E$1(nn, { optional: true }) || {};
      canceledNavigationResolution = this.options.canceledNavigationResolution || 'replace';
      location = E$1(zt);
      urlHandlingStrategy = E$1(Di);
      urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
      currentUrlTree = new he$1();
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      rawUrlTree = this.currentUrlTree;
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      createBrowserPath({ finalUrl: e, initialUrl: r, targetBrowserUrl: i }) {
        let s = e !== void 0 ? this.urlHandlingStrategy.merge(e, r) : r,
          o = i ?? s;
        return o instanceof he$1 ? this.urlSerializer.serialize(o) : o;
      }
      routerUrlState(e) {
        return e?.targetBrowserUrl === void 0 || e?.finalUrl === void 0
          ? {}
          : { ɵrouterUrl: this.urlSerializer.serialize(e.finalUrl) };
      }
      commitTransition({ targetRouterState: e, finalUrl: r, initialUrl: i }) {
        r && e
          ? ((this.currentUrlTree = r),
            (this.rawUrlTree = this.urlHandlingStrategy.merge(r, i)),
            (this.routerState = e))
          : (this.rawUrlTree = i);
      }
      routerState = jc(null, E$1(oe$1));
      getRouterState() {
        return this.routerState;
      }
      _stateMemento = this.createStateMemento();
      get stateMemento() {
        return this._stateMemento;
      }
      updateStateMemento() {
        this._stateMemento = this.createStateMemento();
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      restoredState() {
        return this.location.getState();
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: () => E$1(wf) });
    }
    return n;
  })(),
  wf = (() => {
    class n extends Ti {
      currentPageId = 0;
      lastSuccessfulId = -1;
      get browserPageId() {
        return this.canceledNavigationResolution !== 'computed'
          ? this.currentPageId
          : (this.restoredState()?.ɵrouterPageId ?? this.currentPageId);
      }
      registerNonRouterCurrentEntryChangeListener(e) {
        return this.location.subscribe((r) => {
          r.type === 'popstate' &&
            setTimeout(() => {
              e(r.url, r.state, 'popstate', { replaceUrl: true });
            });
        });
      }
      handleRouterEvent(e, r) {
        e instanceof _t
          ? this.updateStateMemento()
          : e instanceof qe
            ? this.commitTransition(r)
            : e instanceof Wn
              ? this.urlUpdateStrategy === 'eager' &&
                (r.extras.skipLocationChange || this.setBrowserUrl(this.createBrowserPath(r), r))
              : e instanceof Kt
                ? (this.commitTransition(r),
                  this.urlUpdateStrategy === 'deferred' &&
                    !r.extras.skipLocationChange &&
                    this.setBrowserUrl(this.createBrowserPath(r), r))
                : e instanceof Ee && !Uc(e)
                  ? this.restoreHistory(r)
                  : e instanceof wt
                    ? this.restoreHistory(r, true)
                    : e instanceof Oe &&
                      ((this.lastSuccessfulId = e.id), (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(e, r) {
        let { extras: i, id: s } = r,
          { replaceUrl: o, state: a } = i;
        if (this.location.isCurrentPathEqualTo(e) || o) {
          let c = this.browserPageId,
            l = j$1(j$1({}, a), this.generateNgRouterState(s, c, r));
          this.location.replaceState(e, '', l);
        } else {
          let c = j$1(j$1({}, a), this.generateNgRouterState(s, this.browserPageId + 1, r));
          this.location.go(e, '', c);
        }
      }
      restoreHistory(e, r = false) {
        if (this.canceledNavigationResolution === 'computed') {
          let i = this.browserPageId,
            s = this.currentPageId - i;
          s !== 0
            ? this.location.historyGo(s)
            : this.getCurrentUrlTree() === e.finalUrl &&
              s === 0 &&
              (this.resetInternalState(e), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === 'replace' &&
            (r && this.resetInternalState(e), this.resetUrlToCurrentUrlTree());
      }
      resetInternalState({ finalUrl: e }) {
        ((this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            e ?? this.rawUrlTree,
          )));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.getRawUrlTree()),
          '',
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId),
        );
      }
      generateNgRouterState(e, r, i) {
        return this.canceledNavigationResolution === 'computed'
          ? j$1({ navigationId: e, ɵrouterPageId: r }, this.routerUrlState(i))
          : j$1({ navigationId: e }, this.routerUrlState(i));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
function yo(n, t) {
  n.events
    .pipe(
      $t$1((e) => e instanceof Oe || e instanceof Ee || e instanceof wt || e instanceof qe),
      Ge$1((e) =>
        e instanceof Oe || e instanceof qe
          ? 0
          : (
                e instanceof Ee
                  ? e.code === X.Redirect || e.code === X.SupersededByNewNavigation
                  : false
              )
            ? 2
            : 1,
      ),
      $t$1((e) => e !== 2),
      Ti$1(1),
    )
    .subscribe(() => {
      t();
    });
}
var rn = (() => {
  class n {
    get currentUrlTree() {
      return this.stateManager.getCurrentUrlTree();
    }
    get rawUrlTree() {
      return this.stateManager.getRawUrlTree();
    }
    disposed = false;
    nonRouterCurrentEntryChangeSubscription;
    console = E$1(Qv);
    stateManager = E$1(Ti);
    options = E$1(nn, { optional: true }) || {};
    pendingTasks = E$1(Mt);
    urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
    navigationTransitions = E$1(al);
    urlSerializer = E$1(Qt);
    location = E$1(zt);
    urlHandlingStrategy = E$1(Di);
    injector = E$1(oe$1);
    _events = new J$1();
    get events() {
      return this._events;
    }
    get routerState() {
      return this.stateManager.getRouterState();
    }
    navigated = false;
    routeReuseStrategy = E$1(ll);
    injectorCleanup = E$1(cl, { optional: true });
    onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore';
    config = E$1(nr, { optional: true })?.flat() ?? [];
    componentInputBindingEnabled = !!E$1(er, { optional: true });
    currentNavigation = this.navigationTransitions.currentNavigation.asReadonly();
    constructor() {
      (this.resetConfig(this.config),
        this.navigationTransitions.setupNavigations(this).subscribe({ error: (e) => {} }),
        this.subscribeToNavigationEvents());
    }
    eventsSubscription = new Q();
    subscribeToNavigationEvents() {
      let e = this.navigationTransitions.events.subscribe((r) => {
        try {
          let i = this.navigationTransitions.currentTransition,
            s = re(this.navigationTransitions.currentNavigation);
          if (i !== null && s !== null) {
            if (
              (this.stateManager.handleRouterEvent(r, s),
              r instanceof Ee && r.code !== X.Redirect && r.code !== X.SupersededByNewNavigation)
            )
              this.navigated = !0;
            else if (r instanceof Oe)
              ((this.navigated = !0),
                this.injectorCleanup?.(this.routeReuseStrategy, this.routerState, this.config));
            else if (r instanceof Jt) {
              let o = r.navigationBehaviorOptions,
                a = this.urlHandlingStrategy.merge(r.url, i.currentRawUrl),
                c = j$1(
                  {
                    scroll: i.extras.scroll,
                    browserUrl: i.extras.browserUrl,
                    info: i.extras.info,
                    skipLocationChange: i.extras.skipLocationChange,
                    replaceUrl:
                      i.extras.replaceUrl || this.urlUpdateStrategy === 'eager' || yf(i.source),
                  },
                  o,
                );
              this.scheduleNavigation(a, Hn, null, c, {
                resolve: i.resolve,
                reject: i.reject,
                promise: i.promise,
              });
            }
          }
          _h(r) && this._events.next(r);
        } catch (i) {
          this.navigationTransitions.transitionAbortWithErrorSubject.next(i);
        }
      });
      this.eventsSubscription.add(e);
    }
    resetRootComponentType(e) {
      ((this.routerState.root.component = e), (this.navigationTransitions.rootComponentType = e));
    }
    initialNavigation() {
      (this.setUpLocationChangeListener(),
        this.navigationTransitions.hasRequestedNavigation ||
          this.navigateToSyncWithBrowser(
            this.location.path(true),
            Hn,
            this.stateManager.restoredState(),
            { replaceUrl: true },
          ));
    }
    setUpLocationChangeListener() {
      this.nonRouterCurrentEntryChangeSubscription ??=
        this.stateManager.registerNonRouterCurrentEntryChangeListener((e, r, i, s) => {
          this.navigateToSyncWithBrowser(e, i, r, s);
        });
    }
    navigateToSyncWithBrowser(e, r, i, s) {
      let o = i?.navigationId ? i : null,
        a = i?.ɵrouterUrl ?? e;
      if ((i?.ɵrouterUrl && (s = V(j$1({}, s), { browserUrl: e })), i)) {
        let l = j$1({}, i);
        (delete l.navigationId,
          delete l.ɵrouterPageId,
          delete l.ɵrouterUrl,
          Object.keys(l).length !== 0 && (s.state = l));
      }
      let c = this.parseUrl(a);
      this.scheduleNavigation(c, r, o, s).catch((l) => {
        this.disposed || this.injector.get(nt)(l);
      });
    }
    get url() {
      return this.serializeUrl(this.currentUrlTree);
    }
    getCurrentNavigation() {
      return re(this.navigationTransitions.currentNavigation);
    }
    get lastSuccessfulNavigation() {
      return this.navigationTransitions.lastSuccessfulNavigation;
    }
    resetConfig(e) {
      ((this.config = e.map(vo)), (this.navigated = false));
    }
    ngOnDestroy() {
      this.dispose();
    }
    dispose() {
      (this._events.unsubscribe(),
        this.navigationTransitions.complete(),
        this.nonRouterCurrentEntryChangeSubscription?.unsubscribe(),
        (this.nonRouterCurrentEntryChangeSubscription = void 0),
        (this.disposed = true),
        this.eventsSubscription.unsubscribe());
    }
    createUrlTree(e, r = {}) {
      let {
          relativeTo: i,
          queryParams: s,
          fragment: o,
          queryParamsHandling: a,
          preserveFragment: c,
        } = r,
        l = c ? this.currentUrlTree.fragment : o,
        u = null;
      switch (a ?? this.options.defaultQueryParamsHandling) {
        case 'merge':
          u = j$1(j$1({}, this.currentUrlTree.queryParams), s);
          break;
        case 'preserve':
          u = this.currentUrlTree.queryParams;
          break;
        default:
          u = s || null;
      }
      u !== null && (u = this.removeEmptyProps(u));
      let d;
      try {
        let h = i ? i.snapshot : this.routerState.snapshot.root;
        d = Mc(h);
      } catch {
        ((typeof e[0] != 'string' || e[0][0] !== '/') && (e = []), (d = this.currentUrlTree.root));
      }
      return Nc(d, e, u, l ?? null, this.urlSerializer);
    }
    navigateByUrl(e, r = { skipLocationChange: false }) {
      let i = lt(e) ? e : this.parseUrl(e),
        s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
      return this.scheduleNavigation(s, Hn, null, r);
    }
    navigate(e, r = { skipLocationChange: false }) {
      return (Ef(e), this.navigateByUrl(this.createUrlTree(e, r), r));
    }
    serializeUrl(e) {
      return this.urlSerializer.serialize(e);
    }
    parseUrl(e) {
      try {
        return this.urlSerializer.parse(e);
      } catch {
        return (this.console.warn(Vr(4018, false)), this.urlSerializer.parse('/'));
      }
    }
    isActive(e, r) {
      let i;
      if (
        (r === true
          ? (i = j$1({}, Tc))
          : r === false
            ? (i = j$1({}, Qs))
            : (i = j$1(j$1({}, Qs), r)),
        lt(e))
      )
        return pc(this.currentUrlTree, e, i);
      let s = this.parseUrl(e);
      return pc(this.currentUrlTree, s, i);
    }
    removeEmptyProps(e) {
      return Object.entries(e).reduce((r, [i, s]) => (s != null && (r[i] = s), r), {});
    }
    scheduleNavigation(e, r, i, s, o) {
      if (this.disposed) return Promise.resolve(false);
      let a, c, l;
      o
        ? ((a = o.resolve), (c = o.reject), (l = o.promise))
        : (l = new Promise((d, h) => {
            ((a = d), (c = h));
          }));
      let u = this.pendingTasks.add();
      return (
        yo(this, () => {
          queueMicrotask(() => this.pendingTasks.remove(u));
        }),
        this.navigationTransitions.handleNavigationRequest({
          source: r,
          restoredState: i,
          currentUrlTree: this.currentUrlTree,
          currentRawUrl: this.currentUrlTree,
          rawUrl: e,
          extras: s,
          resolve: a,
          reject: c,
          promise: l,
          currentSnapshot: this.routerState.snapshot,
          currentRouterState: this.routerState,
        }),
        l.catch(Promise.reject.bind(Promise))
      );
    }
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
  }
  return n;
})();
function Ef(n) {
  for (let t = 0; t < n.length; t++) if (n[t] == null) throw new C(4008, false);
}
var Tf = (() => {
    class n {
      router = E$1(rn);
      stateManager = E$1(Ti);
      fragment = _e('');
      queryParams = _e({});
      path = _e('');
      serializer = E$1(Qt);
      constructor() {
        (this.updateState(),
          this.router.events?.subscribe((e) => {
            e instanceof Oe && this.updateState();
          }));
      }
      updateState() {
        let { fragment: e, root: r, queryParams: i } = this.stateManager.getCurrentUrlTree();
        (this.fragment.set(e),
          this.queryParams.set(i),
          this.path.set(this.serializer.serialize(new he$1(r))));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  ul = (() => {
    class n {
      router;
      route;
      tabIndexAttribute;
      renderer;
      el;
      locationStrategy;
      hrefAttributeValue = E$1(new Kf$1('href'), { optional: true });
      reactiveHref = Wa$1(() =>
        this.isAnchorElement ? this.computeHref(this._urlTree()) : this.hrefAttributeValue,
      );
      get href() {
        return re(this.reactiveHref);
      }
      set href(e) {
        this.reactiveHref.set(e);
      }
      set target(e) {
        this._target.set(e);
      }
      get target() {
        return re(this._target);
      }
      _target = _e(void 0);
      set queryParams(e) {
        this._queryParams.set(e);
      }
      get queryParams() {
        return re(this._queryParams);
      }
      _queryParams = _e(void 0, { equal: () => false });
      set fragment(e) {
        this._fragment.set(e);
      }
      get fragment() {
        return re(this._fragment);
      }
      _fragment = _e(void 0);
      set queryParamsHandling(e) {
        this._queryParamsHandling.set(e);
      }
      get queryParamsHandling() {
        return re(this._queryParamsHandling);
      }
      _queryParamsHandling = _e(void 0);
      set state(e) {
        this._state.set(e);
      }
      get state() {
        return re(this._state);
      }
      _state = _e(void 0, { equal: () => false });
      set info(e) {
        this._info.set(e);
      }
      get info() {
        return re(this._info);
      }
      _info = _e(void 0, { equal: () => false });
      set relativeTo(e) {
        this._relativeTo.set(e);
      }
      get relativeTo() {
        return re(this._relativeTo);
      }
      _relativeTo = _e(void 0);
      set preserveFragment(e) {
        this._preserveFragment.set(e);
      }
      get preserveFragment() {
        return re(this._preserveFragment);
      }
      _preserveFragment = _e(false);
      set skipLocationChange(e) {
        this._skipLocationChange.set(e);
      }
      get skipLocationChange() {
        return re(this._skipLocationChange);
      }
      _skipLocationChange = _e(false);
      set replaceUrl(e) {
        this._replaceUrl.set(e);
      }
      get replaceUrl() {
        return re(this._replaceUrl);
      }
      _replaceUrl = _e(false);
      browserUrl = yO(void 0);
      isAnchorElement;
      onChanges = new J$1();
      applicationErrorHandler = E$1(nt);
      options = E$1(nn, { optional: true });
      reactiveRouterState = E$1(Tf);
      constructor(e, r, i, s, o, a) {
        ((this.router = e),
          (this.route = r),
          (this.tabIndexAttribute = i),
          (this.renderer = s),
          (this.el = o),
          (this.locationStrategy = a));
        let c = o.nativeElement.tagName?.toLowerCase();
        this.isAnchorElement =
          c === 'a' ||
          c === 'area' ||
          !!(
            typeof customElements == 'object' &&
            customElements.get(c)?.observedAttributes?.includes?.('href')
          );
      }
      setTabIndexIfNotOnNativeEl(e) {
        this.tabIndexAttribute != null ||
          this.isAnchorElement ||
          this.applyAttributeValue('tabindex', e);
      }
      ngOnChanges(e) {
        this.onChanges.next(this);
      }
      routerLinkInput = _e(null);
      set routerLink(e) {
        e == null
          ? (this.routerLinkInput.set(null), this.setTabIndexIfNotOnNativeEl(null))
          : (lt(e)
              ? this.routerLinkInput.set(e)
              : this.routerLinkInput.set(Array.isArray(e) ? e : [e]),
            this.setTabIndexIfNotOnNativeEl('0'));
      }
      onClick(e, r, i, s, o) {
        let a = this._urlTree();
        if (
          a === null ||
          (this.isAnchorElement &&
            (e !== 0 ||
              r ||
              i ||
              s ||
              o ||
              (typeof this.target == 'string' && this.target != '_self')))
        )
          return true;
        let c = this.browserUrl(),
          l = j$1(
            {
              skipLocationChange: this.skipLocationChange,
              replaceUrl: this.replaceUrl,
              state: this.state,
              info: this.info,
            },
            c !== void 0 && { browserUrl: c },
          );
        return (
          this.router.navigateByUrl(a, l)?.catch((u) => {
            this.applicationErrorHandler(u);
          }),
          !this.isAnchorElement
        );
      }
      ngOnDestroy() {}
      applyAttributeValue(e, r) {
        let i = this.renderer,
          s = this.el.nativeElement;
        r !== null ? i.setAttribute(s, e, r) : i.removeAttribute(s, e);
      }
      _urlTree = it(
        () => {
          (this.reactiveRouterState.path(),
            this._preserveFragment() && this.reactiveRouterState.fragment());
          let e = (i) => i === 'preserve' || i === 'merge';
          (e(this._queryParamsHandling()) || e(this.options?.defaultQueryParamsHandling)) &&
            this.reactiveRouterState.queryParams();
          let r = this.routerLinkInput();
          return r === null || !this.router.createUrlTree
            ? null
            : lt(r)
              ? r
              : this.router.createUrlTree(r, {
                  relativeTo: this._relativeTo() !== void 0 ? this._relativeTo() : this.route,
                  queryParams: this._queryParams(),
                  fragment: this._fragment(),
                  queryParamsHandling: this._queryParamsHandling(),
                  preserveFragment: this._preserveFragment(),
                });
        },
        { equal: (e, r) => this.computeHref(e) === this.computeHref(r) },
      );
      get urlTree() {
        return re(this._urlTree);
      }
      computeHref(e) {
        return e !== null && this.locationStrategy
          ? (this.locationStrategy?.prepareExternalUrl(this.router.serializeUrl(e)) ?? '')
          : null;
      }
      static ɵfac = function (r) {
        return new (r || n)(Zo$1(rn), Zo$1(Ge), Lu$1('tabindex'), Zo$1(Fy), Zo$1(Xn$1), Zo$1($t));
      };
      static ɵdir = Lv({
        type: n,
        selectors: [['', 'routerLink', '']],
        hostVars: 2,
        hostBindings: function (r, i) {
          (r & 1 &&
            Cf$1('click', function (o) {
              return i.onClick(o.button, o.ctrlKey, o.shiftKey, o.altKey, o.metaKey);
            }),
            r & 2 && yf$1('href', i.reactiveHref(), pm$1)('target', i._target()));
        },
        inputs: {
          target: 'target',
          queryParams: 'queryParams',
          fragment: 'fragment',
          queryParamsHandling: 'queryParamsHandling',
          state: 'state',
          info: 'info',
          relativeTo: 'relativeTo',
          preserveFragment: [2, 'preserveFragment', 'preserveFragment', wO],
          skipLocationChange: [2, 'skipLocationChange', 'skipLocationChange', wO],
          replaceUrl: [2, 'replaceUrl', 'replaceUrl', wO],
          browserUrl: [1, 'browserUrl'],
          routerLink: 'routerLink',
        },
        features: [sg$1],
      });
    }
    return n;
  })();
var Cf = new N('');
function Rf(n, ...t) {
  return Qr$1([
    { provide: nr, multi: true, useValue: n },
    { provide: Ge, useFactory: Af },
    { provide: gf$1, multi: true, useFactory: kf },
    t.map((e) => e.ɵproviders),
  ]);
}
function Af() {
  return E$1(rn).routerState.root;
}
function If(n, t) {
  return { ɵkind: n, ɵproviders: t };
}
function kf() {
  let n = E$1(de$2);
  return (t) => {
    let e = n.get(Ko$1);
    if (t !== e.components[0]) return;
    let r = n.get(rn),
      i = n.get(Of);
    (n.get(xf) === 1 && r.initialNavigation(),
      n.get(Pf, null, { optional: true })?.setUpPreloading(),
      n.get(Cf, null, { optional: true })?.init(),
      r.resetRootComponentType(e.componentTypes[0]),
      i.closed || (i.next(), i.complete(), i.unsubscribe()));
  };
}
var Of = new N('', { factory: () => new J$1() }),
  xf = new N('', { factory: () => 1 });
var Pf = new N('');
function Mf(n = {}) {
  return If(8, [{ provide: er, useFactory: () => new Hc(n) }]);
}
var hl = ((s) => (
    (s[(s.DEBUG = 0)] = 'DEBUG'),
    (s[(s.INFO = 1)] = 'INFO'),
    (s[(s.WARN = 2)] = 'WARN'),
    (s[(s.ERROR = 3)] = 'ERROR'),
    (s[(s.OFF = 4)] = 'OFF'),
    s
  ))(hl || {}),
  dl = class n {
    minLevel = 2;
    debug(t, ...e) {
      this.writeLog(0, t, e);
    }
    info(t, ...e) {
      this.writeLog(1, t, e);
    }
    warn(t, ...e) {
      this.writeLog(2, t, e);
    }
    error(t, ...e) {
      this.writeLog(3, t, e);
    }
    writeLog(t, e, r) {
      if (t < this.minLevel) return;
      let s = `[${new Date().toISOString()}] [${hl[t]}] -`;
      switch (t) {
        case 0:
          console.debug(s, e, ...r);
          break;
        case 1:
          console.info(s, e, ...r);
          break;
        case 2:
          console.warn(s, e, ...r);
          break;
        case 3:
          console.error(s, e, ...r);
          break;
      }
    }
    static ɵfac = function (e) {
      return new (e || n)();
    };
    static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
  };
var Ci = new WeakMap(),
  rr = (() => {
    class n {
      _appRef;
      _injector = E$1(de$2);
      _environmentInjector = E$1(oe$1);
      load(e) {
        let r = (this._appRef = this._appRef || this._injector.get(Ko$1)),
          i = Ci.get(r);
        (i ||
          ((i = { loaders: new Set(), refs: [] }),
          Ci.set(r, i),
          r.onDestroy(() => {
            (Ci.get(r)?.refs.forEach((s) => s.destroy()), Ci.delete(r));
          })),
          i.loaders.has(e) ||
            (i.loaders.add(e),
            i.refs.push(_O(e, { environmentInjector: this._environmentInjector }))));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
var Ri;
function Nf() {
  if (Ri === void 0 && ((Ri = null), typeof window < 'u')) {
    let n = window;
    n.trustedTypes !== void 0 &&
      (Ri = n.trustedTypes.createPolicy('angular#components', { createHTML: (t) => t }));
  }
  return Ri;
}
function sn(n) {
  return Nf()?.createHTML(n) || n;
}
function fl(n) {
  return Error(`Unable to find icon with the name "${n}"`);
}
function Lf() {
  return Error(
    'Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.',
  );
}
function pl(n) {
  return Error(
    `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${n}".`,
  );
}
function ml(n) {
  return Error(
    `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${n}".`,
  );
}
var We = class {
    url;
    svgText;
    options;
    svgElement = null;
    constructor(t, e, r) {
      ((this.url = t), (this.svgText = e), (this.options = r));
    }
  },
  vl = (() => {
    class n {
      _httpClient;
      _sanitizer;
      _errorHandler;
      _document;
      _svgIconConfigs = new Map();
      _iconSetConfigs = new Map();
      _cachedIconsByUrl = new Map();
      _inProgressUrlFetches = new Map();
      _fontCssClassesByAlias = new Map();
      _resolvers = [];
      _defaultFontSetClass = ['material-icons', 'mat-ligature-font'];
      constructor(e, r, i, s) {
        ((this._httpClient = e),
          (this._sanitizer = r),
          (this._errorHandler = s),
          (this._document = i));
      }
      addSvgIcon(e, r, i) {
        return this.addSvgIconInNamespace('', e, r, i);
      }
      addSvgIconLiteral(e, r, i) {
        return this.addSvgIconLiteralInNamespace('', e, r, i);
      }
      addSvgIconInNamespace(e, r, i, s) {
        return this._addSvgIconConfig(e, r, new We(i, null, s));
      }
      addSvgIconResolver(e) {
        return (this._resolvers.push(e), this);
      }
      addSvgIconLiteralInNamespace(e, r, i, s) {
        let o = this._sanitizer.sanitize($o$1.HTML, i);
        if (!o) throw ml(i);
        let a = sn(o);
        return this._addSvgIconConfig(e, r, new We('', a, s));
      }
      addSvgIconSet(e, r) {
        return this.addSvgIconSetInNamespace('', e, r);
      }
      addSvgIconSetLiteral(e, r) {
        return this.addSvgIconSetLiteralInNamespace('', e, r);
      }
      addSvgIconSetInNamespace(e, r, i) {
        return this._addSvgIconSetConfig(e, new We(r, null, i));
      }
      addSvgIconSetLiteralInNamespace(e, r, i) {
        let s = this._sanitizer.sanitize($o$1.HTML, r);
        if (!s) throw ml(r);
        let o = sn(s);
        return this._addSvgIconSetConfig(e, new We('', o, i));
      }
      registerFontClassAlias(e, r = e) {
        return (this._fontCssClassesByAlias.set(e, r), this);
      }
      classNameForFontAlias(e) {
        return this._fontCssClassesByAlias.get(e) || e;
      }
      setDefaultFontSetClass(...e) {
        return ((this._defaultFontSetClass = e), this);
      }
      getDefaultFontSetClass() {
        return this._defaultFontSetClass;
      }
      getSvgIconFromUrl(e) {
        let r = this._sanitizer.sanitize($o$1.RESOURCE_URL, e);
        if (!r) throw pl(e);
        let i = this._cachedIconsByUrl.get(r);
        return i
          ? Ap$1(Ai(i))
          : this._loadSvgIconFromConfig(new We(e, null)).pipe(
              ih$1((s) => this._cachedIconsByUrl.set(r, s)),
              Ge$1((s) => Ai(s)),
            );
      }
      getNamedSvgIcon(e, r = '') {
        let i = gl(r, e),
          s = this._svgIconConfigs.get(i);
        if (s) return this._getSvgFromConfig(s);
        if (((s = this._getIconConfigFromResolvers(r, e)), s))
          return (this._svgIconConfigs.set(i, s), this._getSvgFromConfig(s));
        let o = this._iconSetConfigs.get(r);
        return o ? this._getSvgFromIconSetConfigs(e, o) : kp$1(fl(i));
      }
      ngOnDestroy() {
        ((this._resolvers = []),
          this._svgIconConfigs.clear(),
          this._iconSetConfigs.clear(),
          this._cachedIconsByUrl.clear());
      }
      _getSvgFromConfig(e) {
        return e.svgText
          ? Ap$1(Ai(this._svgElementFromConfig(e)))
          : this._loadSvgIconFromConfig(e).pipe(Ge$1((r) => Ai(r)));
      }
      _getSvgFromIconSetConfigs(e, r) {
        let i = this._extractIconWithNameFromAnySet(e, r);
        if (i) return Ap$1(i);
        let s = r
          .filter((o) => !o.svgText)
          .map((o) =>
            this._loadSvgIconSetFromConfig(o).pipe(
              Pc$1((a) => {
                let l = `Loading icon set URL: ${this._sanitizer.sanitize($o$1.RESOURCE_URL, o.url)} failed: ${a.message}`;
                return (this._errorHandler.handleError(new Error(l)), Ap$1(null));
              }),
            ),
          );
        return Wp$1(s).pipe(
          Ge$1(() => {
            let o = this._extractIconWithNameFromAnySet(e, r);
            if (!o) throw fl(e);
            return o;
          }),
        );
      }
      _extractIconWithNameFromAnySet(e, r) {
        for (let i = r.length - 1; i >= 0; i--) {
          let s = r[i];
          if (s.svgText && s.svgText.toString().indexOf(e) > -1) {
            let o = this._svgElementFromConfig(s),
              a = this._extractSvgIconFromSet(o, e, s.options);
            if (a) return a;
          }
        }
        return null;
      }
      _loadSvgIconFromConfig(e) {
        return this._fetchIcon(e).pipe(
          ih$1((r) => (e.svgText = r)),
          Ge$1(() => this._svgElementFromConfig(e)),
        );
      }
      _loadSvgIconSetFromConfig(e) {
        return e.svgText ? Ap$1(null) : this._fetchIcon(e).pipe(ih$1((r) => (e.svgText = r)));
      }
      _extractSvgIconFromSet(e, r, i) {
        let s = e.querySelector(`[id="${r}"]`);
        if (!s) return null;
        let o = s.cloneNode(true);
        if ((o.removeAttribute('id'), o.nodeName.toLowerCase() === 'svg'))
          return this._setSvgAttributes(o, i);
        if (o.nodeName.toLowerCase() === 'symbol')
          return this._setSvgAttributes(this._toSvgElement(o), i);
        let a = this._svgElementFromString(sn('<svg></svg>'));
        return (a.appendChild(o), this._setSvgAttributes(a, i));
      }
      _svgElementFromString(e) {
        let r = this._document.createElement('DIV');
        r.innerHTML = e;
        let i = r.querySelector('svg');
        if (!i) throw Error('<svg> tag not found');
        return i;
      }
      _toSvgElement(e) {
        let r = this._svgElementFromString(sn('<svg></svg>')),
          i = e.attributes;
        for (let s = 0; s < i.length; s++) {
          let { name: o, value: a } = i[s];
          o !== 'id' && r.setAttribute(o, a);
        }
        for (let s = 0; s < e.childNodes.length; s++)
          e.childNodes[s].nodeType === this._document.ELEMENT_NODE &&
            r.appendChild(e.childNodes[s].cloneNode(true));
        return r;
      }
      _setSvgAttributes(e, r) {
        return (
          e.setAttribute('fit', ''),
          e.setAttribute('height', '100%'),
          e.setAttribute('width', '100%'),
          e.setAttribute('preserveAspectRatio', 'xMidYMid meet'),
          e.setAttribute('focusable', 'false'),
          r && r.viewBox && e.setAttribute('viewBox', r.viewBox),
          e
        );
      }
      _fetchIcon(e) {
        let { url: r, options: i } = e,
          s = i?.withCredentials ?? false;
        if (!this._httpClient) throw Lf();
        if (r == null) throw Error(`Cannot fetch icon from URL "${r}".`);
        let o = this._sanitizer.sanitize($o$1.RESOURCE_URL, r);
        if (!o) throw pl(r);
        let a = this._inProgressUrlFetches.get(o);
        if (a) return a;
        let c = this._httpClient.get(o, { responseType: 'text', withCredentials: s }).pipe(
          Ge$1((l) => sn(l)),
          Yp$1(() => this._inProgressUrlFetches.delete(o)),
          Ci$1(),
        );
        return (this._inProgressUrlFetches.set(o, c), c);
      }
      _addSvgIconConfig(e, r, i) {
        return (this._svgIconConfigs.set(gl(e, r), i), this);
      }
      _addSvgIconSetConfig(e, r) {
        let i = this._iconSetConfigs.get(e);
        return (i ? i.push(r) : this._iconSetConfigs.set(e, [r]), this);
      }
      _svgElementFromConfig(e) {
        if (!e.svgElement) {
          let r = this._svgElementFromString(e.svgText);
          (this._setSvgAttributes(r, e.options), (e.svgElement = r));
        }
        return e.svgElement;
      }
      _getIconConfigFromResolvers(e, r) {
        for (let i = 0; i < this._resolvers.length; i++) {
          let s = this._resolvers[i](r, e);
          if (s) return Ff(s) ? new We(s.url, null, s.options) : new We(s, null);
        }
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie(qs, 8), Ie(Gs), Ie(tn$1, 8), Ie(Qe));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
    }
    return n;
  })();
function Ai(n) {
  return n.cloneNode(true);
}
function gl(n, t) {
  return n + ':' + t;
}
function Ff(n) {
  return !!(n.url && n.options);
}
var Uf = new N('cdk-dir-doc', { providedIn: 'root', factory: () => E$1(tn$1) }),
  jf =
    /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function bl(n) {
  let t = n?.toLowerCase() || '';
  return t === 'auto' && typeof navigator < 'u' && navigator?.language
    ? jf.test(navigator.language)
      ? 'rtl'
      : 'ltr'
    : t === 'rtl'
      ? 'rtl'
      : 'ltr';
}
var Bf = (() => {
  class n {
    get value() {
      return this.valueSignal();
    }
    valueSignal = _e('ltr');
    change = new Ae$1();
    constructor() {
      let e = E$1(Uf, { optional: true });
      if (e) {
        let r = e.body ? e.body.dir : null,
          i = e.documentElement ? e.documentElement.dir : null;
        this.valueSignal.set(bl(r || i || 'ltr'));
      }
    }
    ngOnDestroy() {
      this.change.complete();
    }
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
  }
  return n;
})();
var on = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵmod = Rv({ type: n });
    static ɵinj = Uc$1({});
  }
  return n;
})();
var $f = ['*'],
  zf = new N('MAT_ICON_DEFAULT_OPTIONS'),
  Hf = new N('mat-icon-location', {
    providedIn: 'root',
    factory: () => {
      let n = E$1(tn$1),
        t = n ? n.location : null;
      return { getPathname: () => (t ? t.pathname + t.search : '') };
    },
  }),
  yl = [
    'clip-path',
    'color-profile',
    'src',
    'cursor',
    'fill',
    'filter',
    'marker',
    'marker-start',
    'marker-mid',
    'marker-end',
    'mask',
    'stroke',
  ],
  Vf = yl.map((n) => `[${n}]`).join(', '),
  qf = /^url\(['"]?#(.*?)['"]?\)$/,
  cw = (() => {
    class n {
      _elementRef = E$1(Xn$1);
      _iconRegistry = E$1(vl);
      _location = E$1(Hf);
      _errorHandler = E$1(Qe);
      _defaultColor;
      get color() {
        return this._color || this._defaultColor;
      }
      set color(e) {
        this._color = e;
      }
      _color;
      inline = false;
      get svgIcon() {
        return this._svgIcon;
      }
      set svgIcon(e) {
        e !== this._svgIcon &&
          (e ? this._updateSvgIcon(e) : this._svgIcon && this._clearSvgElement(),
          (this._svgIcon = e));
      }
      _svgIcon;
      get fontSet() {
        return this._fontSet;
      }
      set fontSet(e) {
        let r = this._cleanupFontValue(e);
        r !== this._fontSet && ((this._fontSet = r), this._updateFontIconClasses());
      }
      _fontSet;
      get fontIcon() {
        return this._fontIcon;
      }
      set fontIcon(e) {
        let r = this._cleanupFontValue(e);
        r !== this._fontIcon && ((this._fontIcon = r), this._updateFontIconClasses());
      }
      _fontIcon;
      _previousFontSetClass = [];
      _previousFontIconClass;
      _svgName = null;
      _svgNamespace = null;
      _previousPath;
      _elementsWithExternalReferences;
      _currentIconFetch = Q.EMPTY;
      constructor() {
        let e = E$1(new Kf$1('aria-hidden'), { optional: true }),
          r = E$1(zf, { optional: true });
        (r &&
          (r.color && (this.color = this._defaultColor = r.color),
          r.fontSet && (this.fontSet = r.fontSet)),
          e || this._elementRef.nativeElement.setAttribute('aria-hidden', 'true'));
      }
      _splitIconName(e) {
        if (!e) return ['', ''];
        let r = e.split(':');
        switch (r.length) {
          case 1:
            return ['', r[0]];
          case 2:
            return r;
          default:
            throw Error(`Invalid icon name: "${e}"`);
        }
      }
      ngOnInit() {
        this._updateFontIconClasses();
      }
      ngAfterViewChecked() {
        let e = this._elementsWithExternalReferences;
        if (e && e.size) {
          let r = this._location.getPathname();
          r !== this._previousPath && ((this._previousPath = r), this._prependPathToReferences(r));
        }
      }
      ngOnDestroy() {
        (this._currentIconFetch.unsubscribe(),
          this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear());
      }
      _usingFontIcon() {
        return !this.svgIcon;
      }
      _setSvgElement(e) {
        this._clearSvgElement();
        let r = this._location.getPathname();
        ((this._previousPath = r),
          this._cacheChildrenWithExternalReferences(e),
          this._prependPathToReferences(r),
          this._elementRef.nativeElement.appendChild(e));
      }
      _clearSvgElement() {
        let e = this._elementRef.nativeElement,
          r = e.childNodes.length;
        for (
          this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear();
          r--;
        ) {
          let i = e.childNodes[r];
          (i.nodeType !== 1 || i.nodeName.toLowerCase() === 'svg') && i.remove();
        }
      }
      _updateFontIconClasses() {
        if (!this._usingFontIcon()) return;
        let e = this._elementRef.nativeElement,
          r = (
            this.fontSet
              ? this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/)
              : this._iconRegistry.getDefaultFontSetClass()
          ).filter((i) => i.length > 0);
        (this._previousFontSetClass.forEach((i) => e.classList.remove(i)),
          r.forEach((i) => e.classList.add(i)),
          (this._previousFontSetClass = r),
          this.fontIcon !== this._previousFontIconClass &&
            !r.includes('mat-ligature-font') &&
            (this._previousFontIconClass && e.classList.remove(this._previousFontIconClass),
            this.fontIcon && e.classList.add(this.fontIcon),
            (this._previousFontIconClass = this.fontIcon)));
      }
      _cleanupFontValue(e) {
        return typeof e == 'string' ? e.trim().split(' ')[0] : e;
      }
      _prependPathToReferences(e) {
        let r = this._elementsWithExternalReferences;
        r &&
          r.forEach((i, s) => {
            i.forEach((o) => {
              s.setAttribute(o.name, `url('${e}#${o.value}')`);
            });
          });
      }
      _cacheChildrenWithExternalReferences(e) {
        let r = e.querySelectorAll(Vf),
          i = (this._elementsWithExternalReferences =
            this._elementsWithExternalReferences || new Map());
        for (let s = 0; s < r.length; s++)
          yl.forEach((o) => {
            let a = r[s],
              c = a.getAttribute(o),
              l = c ? c.match(qf) : null;
            if (l) {
              let u = i.get(a);
              (u || ((u = []), i.set(a, u)), u.push({ name: o, value: l[1] }));
            }
          });
      }
      _updateSvgIcon(e) {
        if (
          ((this._svgNamespace = null),
          (this._svgName = null),
          this._currentIconFetch.unsubscribe(),
          e)
        ) {
          let [r, i] = this._splitIconName(e);
          (r && (this._svgNamespace = r),
            i && (this._svgName = i),
            (this._currentIconFetch = this._iconRegistry
              .getNamedSvgIcon(i, r)
              .pipe(Ti$1(1))
              .subscribe(
                (s) => this._setSvgElement(s),
                (s) => {
                  let o = `Error retrieving icon ${r}:${i}! ${s.message}`;
                  this._errorHandler.handleError(new Error(o));
                },
              )));
        }
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵcmp = Av({
        type: n,
        selectors: [['mat-icon']],
        hostAttrs: ['role', 'img', 1, 'mat-icon', 'notranslate'],
        hostVars: 10,
        hostBindings: function (r, i) {
          r & 2 &&
            (yf$1('data-mat-icon-type', i._usingFontIcon() ? 'font' : 'svg')(
              'data-mat-icon-name',
              i._svgName || i.fontIcon,
            )('data-mat-icon-namespace', i._svgNamespace || i.fontSet)(
              'fontIcon',
              i._usingFontIcon() ? i.fontIcon : null,
            ),
            DE(i.color ? 'mat-' + i.color : ''),
            kf$1('mat-icon-inline', i.inline)(
              'mat-icon-no-color',
              i.color !== 'primary' && i.color !== 'accent' && i.color !== 'warn',
            ));
        },
        inputs: {
          color: 'color',
          inline: [2, 'inline', 'inline', wO],
          svgIcon: 'svgIcon',
          fontSet: 'fontSet',
          fontIcon: 'fontIcon',
        },
        exportAs: ['matIcon'],
        ngContentSelectors: $f,
        decls: 1,
        vars: 0,
        template: function (r, i) {
          r & 1 && (oE(), iE(0));
        },
        styles: [
          `mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`,
        ],
        encapsulation: 2,
      });
    }
    return n;
  })(),
  lw = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵmod = Rv({ type: n });
      static ɵinj = Uc$1({ imports: [on] });
    }
    return n;
  })();
function ir(n) {
  return n.buttons === 0 || n.detail === 0;
}
function sr(n) {
  let t = (n.touches && n.touches[0]) || (n.changedTouches && n.changedTouches[0]);
  return (
    !!t &&
    t.identifier === -1 &&
    (t.radiusX == null || t.radiusX === 1) &&
    (t.radiusY == null || t.radiusY === 1)
  );
}
var _o;
function _l() {
  if (_o == null) {
    let n = typeof document < 'u' ? document.head : null;
    _o = !!(n && (n.createShadowRoot || n.attachShadow));
  }
  return _o;
}
function wo(n) {
  if (_l()) {
    let t = n.getRootNode ? n.getRootNode() : null;
    if (typeof ShadowRoot < 'u' && ShadowRoot && t instanceof ShadowRoot) return t;
  }
  return null;
}
function Re(n) {
  return n.composedPath ? n.composedPath()[0] : n.target;
}
var Eo;
try {
  Eo = typeof Intl < 'u' && Intl.v8BreakIterator;
} catch {
  Eo = false;
}
var xe = (() => {
  class n {
    _platformId = E$1(Vh$1);
    isBrowser = this._platformId ? Ja(this._platformId) : typeof document == 'object' && !!document;
    EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
    TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
    BLINK =
      this.isBrowser && !!(window.chrome || Eo) && typeof CSS < 'u' && !this.EDGE && !this.TRIDENT;
    WEBKIT =
      this.isBrowser &&
      /AppleWebKit/i.test(navigator.userAgent) &&
      !this.BLINK &&
      !this.EDGE &&
      !this.TRIDENT;
    IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
    ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
    SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
  }
  return n;
})();
var or;
function wl() {
  if (or == null && typeof window < 'u')
    try {
      window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', { get: () => (or = !0) }),
      );
    } finally {
      or = or || false;
    }
  return or;
}
function an(n) {
  return wl() ? n : !!n.capture;
}
function ut(n) {
  return n instanceof Xn$1 ? n.nativeElement : n;
}
var El = new N('cdk-input-modality-detector-options'),
  Sl = { ignoreKeys: [18, 17, 224, 91, 16] },
  Dl = 650,
  So = { passive: true, capture: true },
  Tl = (() => {
    class n {
      _platform = E$1(xe);
      _listenerCleanups;
      modalityDetected;
      modalityChanged;
      get mostRecentModality() {
        return this._modality.value;
      }
      _mostRecentTarget = null;
      _modality = new Dn(null);
      _options;
      _lastTouchMs = 0;
      _onKeydown = (e) => {
        this._options?.ignoreKeys?.some((r) => r === e.keyCode) ||
          (this._modality.next('keyboard'), (this._mostRecentTarget = Re(e)));
      };
      _onMousedown = (e) => {
        Date.now() - this._lastTouchMs < Dl ||
          (this._modality.next(ir(e) ? 'keyboard' : 'mouse'), (this._mostRecentTarget = Re(e)));
      };
      _onTouchstart = (e) => {
        if (sr(e)) {
          this._modality.next('keyboard');
          return;
        }
        ((this._lastTouchMs = Date.now()),
          this._modality.next('touch'),
          (this._mostRecentTarget = Re(e)));
      };
      constructor() {
        let e = E$1(De$2),
          r = E$1(tn$1),
          i = E$1(El, { optional: true });
        if (
          ((this._options = j$1(j$1({}, Sl), i)),
          (this.modalityDetected = this._modality.pipe(th$1(1))),
          (this.modalityChanged = this.modalityDetected.pipe(zp$1())),
          this._platform.isBrowser)
        ) {
          let s = E$1(Qn$1).createRenderer(null, null);
          this._listenerCleanups = e.runOutsideAngular(() => [
            s.listen(r, 'keydown', this._onKeydown, So),
            s.listen(r, 'mousedown', this._onMousedown, So),
            s.listen(r, 'touchstart', this._onTouchstart, So),
          ]);
        }
      }
      ngOnDestroy() {
        (this._modality.complete(), this._listenerCleanups?.forEach((e) => e()));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  ar = (function (n) {
    return ((n[(n.IMMEDIATE = 0)] = 'IMMEDIATE'), (n[(n.EVENTUAL = 1)] = 'EVENTUAL'), n);
  })(ar || {}),
  Cl = new N('cdk-focus-monitor-default-options'),
  Ii = an({ passive: true, capture: true }),
  Do = (() => {
    class n {
      _ngZone = E$1(De$2);
      _platform = E$1(xe);
      _inputModalityDetector = E$1(Tl);
      _origin = null;
      _lastFocusOrigin = null;
      _windowFocused = false;
      _windowFocusTimeoutId;
      _originTimeoutId;
      _originFromTouchInteraction = false;
      _elementInfo = new Map();
      _monitoredElementCount = 0;
      _rootNodeFocusListenerCount = new Map();
      _detectionMode;
      _windowFocusListener = () => {
        ((this._windowFocused = true),
          (this._windowFocusTimeoutId = setTimeout(() => (this._windowFocused = false))));
      };
      _document = E$1(tn$1);
      _stopInputModalityDetector = new J$1();
      constructor() {
        let e = E$1(Cl, { optional: true });
        this._detectionMode = e?.detectionMode || ar.IMMEDIATE;
      }
      _rootNodeFocusAndBlurListener = (e) => {
        let r = Re(e);
        for (let i = r; i; i = i.parentElement)
          e.type === 'focus' ? this._onFocus(e, i) : this._onBlur(e, i);
      };
      monitor(e, r = false) {
        let i = ut(e);
        if (!this._platform.isBrowser || i.nodeType !== 1) return Ap$1();
        let s = wo(i) || this._document,
          o = this._elementInfo.get(i);
        if (o) return (r && (o.checkChildren = true), o.subject);
        let a = { checkChildren: r, subject: new J$1(), rootNode: s };
        return (this._elementInfo.set(i, a), this._registerGlobalListeners(a), a.subject);
      }
      stopMonitoring(e) {
        let r = ut(e),
          i = this._elementInfo.get(r);
        i &&
          (i.subject.complete(),
          this._setClasses(r),
          this._elementInfo.delete(r),
          this._removeGlobalListeners(i));
      }
      focusVia(e, r, i) {
        let s = ut(e),
          o = this._document.activeElement;
        s === o
          ? this._getClosestElementsInfo(s).forEach(([a, c]) => this._originChanged(a, r, c))
          : (this._setOrigin(r), typeof s.focus == 'function' && s.focus(i));
      }
      ngOnDestroy() {
        this._elementInfo.forEach((e, r) => this.stopMonitoring(r));
      }
      _getWindow() {
        return this._document.defaultView || window;
      }
      _getFocusOrigin(e) {
        return this._origin
          ? this._originFromTouchInteraction
            ? this._shouldBeAttributedToTouch(e)
              ? 'touch'
              : 'program'
            : this._origin
          : this._windowFocused && this._lastFocusOrigin
            ? this._lastFocusOrigin
            : e && this._isLastInteractionFromInputLabel(e)
              ? 'mouse'
              : 'program';
      }
      _shouldBeAttributedToTouch(e) {
        return (
          this._detectionMode === ar.EVENTUAL ||
          !!e?.contains(this._inputModalityDetector._mostRecentTarget)
        );
      }
      _setClasses(e, r) {
        (e.classList.toggle('cdk-focused', !!r),
          e.classList.toggle('cdk-touch-focused', r === 'touch'),
          e.classList.toggle('cdk-keyboard-focused', r === 'keyboard'),
          e.classList.toggle('cdk-mouse-focused', r === 'mouse'),
          e.classList.toggle('cdk-program-focused', r === 'program'));
      }
      _setOrigin(e, r = false) {
        this._ngZone.runOutsideAngular(() => {
          if (
            ((this._origin = e),
            (this._originFromTouchInteraction = e === 'touch' && r),
            this._detectionMode === ar.IMMEDIATE)
          ) {
            clearTimeout(this._originTimeoutId);
            let i = this._originFromTouchInteraction ? Dl : 1;
            this._originTimeoutId = setTimeout(() => (this._origin = null), i);
          }
        });
      }
      _onFocus(e, r) {
        let i = this._elementInfo.get(r),
          s = Re(e);
        !i || (!i.checkChildren && r !== s) || this._originChanged(r, this._getFocusOrigin(s), i);
      }
      _onBlur(e, r) {
        let i = this._elementInfo.get(r);
        !i ||
          (i.checkChildren && e.relatedTarget instanceof Node && r.contains(e.relatedTarget)) ||
          (this._setClasses(r), this._emitOrigin(i, null));
      }
      _emitOrigin(e, r) {
        e.subject.observers.length && this._ngZone.run(() => e.subject.next(r));
      }
      _registerGlobalListeners(e) {
        if (!this._platform.isBrowser) return;
        let r = e.rootNode,
          i = this._rootNodeFocusListenerCount.get(r) || 0;
        (i ||
          this._ngZone.runOutsideAngular(() => {
            (r.addEventListener('focus', this._rootNodeFocusAndBlurListener, Ii),
              r.addEventListener('blur', this._rootNodeFocusAndBlurListener, Ii));
          }),
          this._rootNodeFocusListenerCount.set(r, i + 1),
          ++this._monitoredElementCount === 1 &&
            (this._ngZone.runOutsideAngular(() => {
              this._getWindow().addEventListener('focus', this._windowFocusListener);
            }),
            this._inputModalityDetector.modalityDetected
              .pipe(oh$1(this._stopInputModalityDetector))
              .subscribe((s) => {
                this._setOrigin(s, true);
              })));
      }
      _removeGlobalListeners(e) {
        let r = e.rootNode;
        if (this._rootNodeFocusListenerCount.has(r)) {
          let i = this._rootNodeFocusListenerCount.get(r);
          i > 1
            ? this._rootNodeFocusListenerCount.set(r, i - 1)
            : (r.removeEventListener('focus', this._rootNodeFocusAndBlurListener, Ii),
              r.removeEventListener('blur', this._rootNodeFocusAndBlurListener, Ii),
              this._rootNodeFocusListenerCount.delete(r));
        }
        --this._monitoredElementCount ||
          (this._getWindow().removeEventListener('focus', this._windowFocusListener),
          this._stopInputModalityDetector.next(),
          clearTimeout(this._windowFocusTimeoutId),
          clearTimeout(this._originTimeoutId));
      }
      _originChanged(e, r, i) {
        (this._setClasses(e, r), this._emitOrigin(i, r), (this._lastFocusOrigin = r));
      }
      _getClosestElementsInfo(e) {
        let r = [];
        return (
          this._elementInfo.forEach((i, s) => {
            (s === e || (i.checkChildren && s.contains(e))) && r.push([s, i]);
          }),
          r
        );
      }
      _isLastInteractionFromInputLabel(e) {
        let { _mostRecentTarget: r, mostRecentModality: i } = this._inputModalityDetector;
        if (
          i !== 'mouse' ||
          !r ||
          r === e ||
          (e.nodeName !== 'INPUT' && e.nodeName !== 'TEXTAREA') ||
          e.disabled
        )
          return false;
        let s = e.labels;
        if (s) {
          for (let o = 0; o < s.length; o++) if (s[o].contains(r)) return true;
        }
        return false;
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
var Rl = new Set(),
  St,
  To = (() => {
    class n {
      _platform = E$1(xe);
      _nonce = E$1(Bh$1, { optional: true });
      _matchMedia;
      constructor() {
        this._matchMedia =
          this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : Wf;
      }
      matchMedia(e) {
        return (
          (this._platform.WEBKIT || this._platform.BLINK) && Gf(e, this._nonce),
          this._matchMedia(e)
        );
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
function Gf(n, t) {
  if (!Rl.has(n))
    try {
      (St ||
        ((St = document.createElement('style')),
        t && St.setAttribute('nonce', t),
        St.setAttribute('type', 'text/css'),
        document.head.appendChild(St)),
        St.sheet && (St.sheet.insertRule(`@media ${n} {body{ }}`, 0), Rl.add(n)));
    } catch (e) {
      console.error(e);
    }
}
function Wf(n) {
  return {
    matches: n === 'all' || n === '',
    media: n,
    addListener: () => {},
    removeListener: () => {},
  };
}
var Kf = (() => {
  class n {
    create(e) {
      return typeof MutationObserver > 'u' ? null : new MutationObserver(e);
    }
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
  }
  return n;
})();
var zw = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵmod = Rv({ type: n });
    static ɵinj = Uc$1({ providers: [Kf] });
  }
  return n;
})();
function Vw(n, ...t) {
  return t.length ? t.some((e) => n[e]) : n.altKey || n.shiftKey || n.ctrlKey || n.metaKey;
}
var Co = {},
  Ro = class n {
    _appId = E$1(ws);
    static _infix = `a${Math.floor(Math.random() * 1e5).toString()}`;
    getId(t, e = false) {
      return (
        this._appId !== 'ng' && (t += this._appId),
        Co.hasOwnProperty(t) || (Co[t] = 0),
        `${t}${e ? n._infix + '-' : ''}${Co[t]++}`
      );
    }
    static ɵfac = function (e) {
      return new (e || n)();
    };
    static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
  };
var cn,
  Al = [
    'color',
    'button',
    'checkbox',
    'date',
    'datetime-local',
    'email',
    'file',
    'hidden',
    'image',
    'month',
    'number',
    'password',
    'radio',
    'range',
    'reset',
    'search',
    'submit',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ];
function t0() {
  if (cn) return cn;
  if (typeof document != 'object' || !document) return ((cn = new Set(Al)), cn);
  let n = document.createElement('input');
  return ((cn = new Set(Al.filter((t) => (n.setAttribute('type', t), n.type === t)))), cn);
}
var Jf = new N('MATERIAL_ANIMATIONS'),
  Il = null;
function Yf() {
  return E$1(Jf, { optional: true })?.animationsDisabled ||
    E$1(Hh$1, { optional: true }) === 'NoopAnimations'
    ? 'di-disabled'
    : ((Il ??= E$1(To).matchMedia('(prefers-reduced-motion)').matches),
      Il ? 'reduced-motion' : 'enabled');
}
function ln() {
  return Yf() !== 'enabled';
}
function p0(n) {
  return n != null && `${n}` != 'false';
}
var Se = (function (n) {
    return (
      (n[(n.FADING_IN = 0)] = 'FADING_IN'),
      (n[(n.VISIBLE = 1)] = 'VISIBLE'),
      (n[(n.FADING_OUT = 2)] = 'FADING_OUT'),
      (n[(n.HIDDEN = 3)] = 'HIDDEN'),
      n
    );
  })(Se || {}),
  Ao = class {
    _renderer;
    element;
    config;
    _animationForciblyDisabledThroughCss;
    state = Se.HIDDEN;
    constructor(t, e, r, i = false) {
      ((this._renderer = t),
        (this.element = e),
        (this.config = r),
        (this._animationForciblyDisabledThroughCss = i));
    }
    fadeOut() {
      this._renderer.fadeOutRipple(this);
    }
  },
  kl = an({ passive: true, capture: true }),
  Io = class {
    _events = new Map();
    addHandler(t, e, r, i) {
      let s = this._events.get(e);
      if (s) {
        let o = s.get(r);
        o ? o.add(i) : s.set(r, new Set([i]));
      } else
        (this._events.set(e, new Map([[r, new Set([i])]])),
          t.runOutsideAngular(() => {
            document.addEventListener(e, this._delegateEventHandler, kl);
          }));
    }
    removeHandler(t, e, r) {
      let i = this._events.get(t);
      if (!i) return;
      let s = i.get(e);
      s &&
        (s.delete(r),
        s.size === 0 && i.delete(e),
        i.size === 0 &&
          (this._events.delete(t),
          document.removeEventListener(t, this._delegateEventHandler, kl)));
    }
    _delegateEventHandler = (t) => {
      let e = Re(t);
      e &&
        this._events.get(t.type)?.forEach((r, i) => {
          (i === e || i.contains(e)) && r.forEach((s) => s.handleEvent(t));
        });
    };
  },
  cr = { enterDuration: 225, exitDuration: 150 },
  Xf = 800,
  Ol = an({ passive: true, capture: true }),
  xl = ['mousedown', 'touchstart'],
  Pl = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'],
  Zf = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵcmp = Av({
        type: n,
        selectors: [['ng-component']],
        hostAttrs: ['mat-ripple-style-loader', ''],
        decls: 0,
        vars: 0,
        template: function (r, i) {},
        styles: [
          `.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`,
        ],
        encapsulation: 2,
      });
    }
    return n;
  })(),
  lr = class n {
    _target;
    _ngZone;
    _platform;
    _containerElement;
    _triggerElement = null;
    _isPointerDown = false;
    _activeRipples = new Map();
    _mostRecentTransientRipple = null;
    _lastTouchStartEvent;
    _pointerUpEventsRegistered = false;
    _containerRect = null;
    static _eventManager = new Io();
    constructor(t, e, r, i, s) {
      ((this._target = t),
        (this._ngZone = e),
        (this._platform = i),
        i.isBrowser && (this._containerElement = ut(r)),
        s && s.get(rr).load(Zf));
    }
    fadeInRipple(t, e, r = {}) {
      let i = (this._containerRect =
          this._containerRect || this._containerElement.getBoundingClientRect()),
        s = j$1(j$1({}, cr), r.animation);
      r.centered && ((t = i.left + i.width / 2), (e = i.top + i.height / 2));
      let o = r.radius || Qf(t, e, i),
        a = t - i.left,
        c = e - i.top,
        l = s.enterDuration,
        u = document.createElement('div');
      (u.classList.add('mat-ripple-element'),
        (u.style.left = `${a - o}px`),
        (u.style.top = `${c - o}px`),
        (u.style.height = `${o * 2}px`),
        (u.style.width = `${o * 2}px`),
        r.color != null && (u.style.backgroundColor = r.color),
        (u.style.transitionDuration = `${l}ms`),
        this._containerElement.appendChild(u));
      let d = window.getComputedStyle(u),
        h = d.transitionProperty,
        f = d.transitionDuration,
        p = h === 'none' || f === '0s' || f === '0s, 0s' || (i.width === 0 && i.height === 0),
        g = new Ao(this, u, r, p);
      ((u.style.transform = 'scale3d(1, 1, 1)'),
        (g.state = Se.FADING_IN),
        r.persistent || (this._mostRecentTransientRipple = g));
      let y = null;
      return (
        !p &&
          (l || s.exitDuration) &&
          this._ngZone.runOutsideAngular(() => {
            let v = () => {
                (y && (y.fallbackTimer = null), clearTimeout(w), this._finishRippleTransition(g));
              },
              D = () => this._destroyRipple(g),
              w = setTimeout(D, l + 100);
            (u.addEventListener('transitionend', v),
              u.addEventListener('transitioncancel', D),
              (y = { onTransitionEnd: v, onTransitionCancel: D, fallbackTimer: w }));
          }),
        this._activeRipples.set(g, y),
        (p || !l) && this._finishRippleTransition(g),
        g
      );
    }
    fadeOutRipple(t) {
      if (t.state === Se.FADING_OUT || t.state === Se.HIDDEN) return;
      let e = t.element,
        r = j$1(j$1({}, cr), t.config.animation);
      ((e.style.transitionDuration = `${r.exitDuration}ms`),
        (e.style.opacity = '0'),
        (t.state = Se.FADING_OUT),
        (t._animationForciblyDisabledThroughCss || !r.exitDuration) &&
          this._finishRippleTransition(t));
    }
    fadeOutAll() {
      this._getActiveRipples().forEach((t) => t.fadeOut());
    }
    fadeOutAllNonPersistent() {
      this._getActiveRipples().forEach((t) => {
        t.config.persistent || t.fadeOut();
      });
    }
    setupTriggerEvents(t) {
      let e = ut(t);
      !this._platform.isBrowser ||
        !e ||
        e === this._triggerElement ||
        (this._removeTriggerEvents(),
        (this._triggerElement = e),
        xl.forEach((r) => {
          n._eventManager.addHandler(this._ngZone, r, e, this);
        }));
    }
    handleEvent(t) {
      (t.type === 'mousedown'
        ? this._onMousedown(t)
        : t.type === 'touchstart'
          ? this._onTouchStart(t)
          : this._onPointerUp(),
        this._pointerUpEventsRegistered ||
          (this._ngZone.runOutsideAngular(() => {
            Pl.forEach((e) => {
              this._triggerElement.addEventListener(e, this, Ol);
            });
          }),
          (this._pointerUpEventsRegistered = true)));
    }
    _finishRippleTransition(t) {
      t.state === Se.FADING_IN
        ? this._startFadeOutTransition(t)
        : t.state === Se.FADING_OUT && this._destroyRipple(t);
    }
    _startFadeOutTransition(t) {
      let e = t === this._mostRecentTransientRipple,
        { persistent: r } = t.config;
      ((t.state = Se.VISIBLE), !r && (!e || !this._isPointerDown) && t.fadeOut());
    }
    _destroyRipple(t) {
      let e = this._activeRipples.get(t) ?? null;
      (this._activeRipples.delete(t),
        this._activeRipples.size || (this._containerRect = null),
        t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null),
        (t.state = Se.HIDDEN),
        e !== null &&
          (t.element.removeEventListener('transitionend', e.onTransitionEnd),
          t.element.removeEventListener('transitioncancel', e.onTransitionCancel),
          e.fallbackTimer !== null && clearTimeout(e.fallbackTimer)),
        t.element.remove());
    }
    _onMousedown(t) {
      let e = ir(t),
        r = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + Xf;
      !this._target.rippleDisabled &&
        !e &&
        !r &&
        ((this._isPointerDown = true),
        this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
    }
    _onTouchStart(t) {
      if (!this._target.rippleDisabled && !sr(t)) {
        ((this._lastTouchStartEvent = Date.now()), (this._isPointerDown = true));
        let e = t.changedTouches;
        if (e)
          for (let r = 0; r < e.length; r++)
            this.fadeInRipple(e[r].clientX, e[r].clientY, this._target.rippleConfig);
      }
    }
    _onPointerUp() {
      this._isPointerDown &&
        ((this._isPointerDown = false),
        this._getActiveRipples().forEach((t) => {
          let e =
            t.state === Se.VISIBLE || (t.config.terminateOnPointerUp && t.state === Se.FADING_IN);
          !t.config.persistent && e && t.fadeOut();
        }));
    }
    _getActiveRipples() {
      return Array.from(this._activeRipples.keys());
    }
    _removeTriggerEvents() {
      let t = this._triggerElement;
      t &&
        (xl.forEach((e) => n._eventManager.removeHandler(e, t, this)),
        this._pointerUpEventsRegistered &&
          (Pl.forEach((e) => t.removeEventListener(e, this, Ol)),
          (this._pointerUpEventsRegistered = false)));
    }
  };
function Qf(n, t, e) {
  let r = Math.max(Math.abs(n - e.left), Math.abs(n - e.right)),
    i = Math.max(Math.abs(t - e.top), Math.abs(t - e.bottom));
  return Math.sqrt(r * r + i * i);
}
var ko = new N('mat-ripple-global-options'),
  R0 = (() => {
    class n {
      _elementRef = E$1(Xn$1);
      _animationsDisabled = ln();
      color;
      unbounded = false;
      centered = false;
      radius = 0;
      animation;
      get disabled() {
        return this._disabled;
      }
      set disabled(e) {
        (e && this.fadeOutAllNonPersistent(),
          (this._disabled = e),
          this._setupTriggerEventsIfEnabled());
      }
      _disabled = false;
      get trigger() {
        return this._trigger || this._elementRef.nativeElement;
      }
      set trigger(e) {
        ((this._trigger = e), this._setupTriggerEventsIfEnabled());
      }
      _trigger;
      _rippleRenderer;
      _globalOptions;
      _isInitialized = false;
      constructor() {
        let e = E$1(De$2),
          r = E$1(xe),
          i = E$1(ko, { optional: true }),
          s = E$1(de$2);
        ((this._globalOptions = i || {}),
          (this._rippleRenderer = new lr(this, e, this._elementRef, r, s)));
      }
      ngOnInit() {
        ((this._isInitialized = true), this._setupTriggerEventsIfEnabled());
      }
      ngOnDestroy() {
        this._rippleRenderer._removeTriggerEvents();
      }
      fadeOutAll() {
        this._rippleRenderer.fadeOutAll();
      }
      fadeOutAllNonPersistent() {
        this._rippleRenderer.fadeOutAllNonPersistent();
      }
      get rippleConfig() {
        return {
          centered: this.centered,
          radius: this.radius,
          color: this.color,
          animation: j$1(
            j$1(
              j$1({}, this._globalOptions.animation),
              this._animationsDisabled ? { enterDuration: 0, exitDuration: 0 } : {},
            ),
            this.animation,
          ),
          terminateOnPointerUp: this._globalOptions.terminateOnPointerUp,
        };
      }
      get rippleDisabled() {
        return this.disabled || !!this._globalOptions.disabled;
      }
      _setupTriggerEventsIfEnabled() {
        !this.disabled &&
          this._isInitialized &&
          this._rippleRenderer.setupTriggerEvents(this.trigger);
      }
      launch(e, r = 0, i) {
        return typeof e == 'number'
          ? this._rippleRenderer.fadeInRipple(e, r, j$1(j$1({}, this.rippleConfig), i))
          : this._rippleRenderer.fadeInRipple(0, 0, j$1(j$1({}, this.rippleConfig), e));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵdir = Lv({
        type: n,
        selectors: [
          ['', 'mat-ripple', ''],
          ['', 'matRipple', ''],
        ],
        hostAttrs: [1, 'mat-ripple'],
        hostVars: 2,
        hostBindings: function (r, i) {
          r & 2 && kf$1('mat-ripple-unbounded', i.unbounded);
        },
        inputs: {
          color: [0, 'matRippleColor', 'color'],
          unbounded: [0, 'matRippleUnbounded', 'unbounded'],
          centered: [0, 'matRippleCentered', 'centered'],
          radius: [0, 'matRippleRadius', 'radius'],
          animation: [0, 'matRippleAnimation', 'animation'],
          disabled: [0, 'matRippleDisabled', 'disabled'],
          trigger: [0, 'matRippleTrigger', 'trigger'],
        },
        exportAs: ['matRipple'],
      });
    }
    return n;
  })();
var ep = { capture: true },
  tp = ['focus', 'mousedown', 'mouseenter', 'touchstart'],
  Oo = 'mat-ripple-loader-uninitialized',
  xo = 'mat-ripple-loader-class-name',
  Ml = 'mat-ripple-loader-centered',
  ki = 'mat-ripple-loader-disabled',
  Nl = (() => {
    class n {
      _document = E$1(tn$1);
      _animationsDisabled = ln();
      _globalRippleOptions = E$1(ko, { optional: true });
      _platform = E$1(xe);
      _ngZone = E$1(De$2);
      _injector = E$1(de$2);
      _eventCleanups;
      _hosts = new Map();
      constructor() {
        let e = E$1(Qn$1).createRenderer(null, null);
        this._eventCleanups = this._ngZone.runOutsideAngular(() =>
          tp.map((r) => e.listen(this._document, r, this._onInteraction, ep)),
        );
      }
      ngOnDestroy() {
        let e = this._hosts.keys();
        for (let r of e) this.destroyRipple(r);
        this._eventCleanups.forEach((r) => r());
      }
      configureRipple(e, r) {
        (e.setAttribute(Oo, this._globalRippleOptions?.namespace ?? ''),
          (r.className || !e.hasAttribute(xo)) && e.setAttribute(xo, r.className || ''),
          r.centered && e.setAttribute(Ml, ''),
          r.disabled && e.setAttribute(ki, ''));
      }
      setDisabled(e, r) {
        let i = this._hosts.get(e);
        i
          ? ((i.target.rippleDisabled = r),
            !r &&
              !i.hasSetUpEvents &&
              ((i.hasSetUpEvents = true), i.renderer.setupTriggerEvents(e)))
          : r
            ? e.setAttribute(ki, '')
            : e.removeAttribute(ki);
      }
      _onInteraction = (e) => {
        let r = Re(e);
        if (r instanceof HTMLElement) {
          let i = r.closest(`[${Oo}="${this._globalRippleOptions?.namespace ?? ''}"]`);
          i && this._createRipple(i);
        }
      };
      _createRipple(e) {
        if (!this._document || this._hosts.has(e)) return;
        e.querySelector('.mat-ripple')?.remove();
        let r = this._document.createElement('span');
        (r.classList.add('mat-ripple', e.getAttribute(xo)), e.append(r));
        let i = this._globalRippleOptions,
          s = this._animationsDisabled ? 0 : (i?.animation?.enterDuration ?? cr.enterDuration),
          o = this._animationsDisabled ? 0 : (i?.animation?.exitDuration ?? cr.exitDuration),
          a = {
            rippleDisabled: this._animationsDisabled || i?.disabled || e.hasAttribute(ki),
            rippleConfig: {
              centered: e.hasAttribute(Ml),
              terminateOnPointerUp: i?.terminateOnPointerUp,
              animation: { enterDuration: s, exitDuration: o },
            },
          },
          c = new lr(a, this._ngZone, r, this._platform, this._injector),
          l = !a.rippleDisabled;
        (l && c.setupTriggerEvents(e),
          this._hosts.set(e, { target: a, renderer: c, hasSetUpEvents: l }),
          e.removeAttribute(Oo));
      }
      destroyRipple(e) {
        let r = this._hosts.get(e);
        r && (r.renderer._removeTriggerEvents(), this._hosts.delete(e));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Jn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
var Ll = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵcmp = Av({
      type: n,
      selectors: [['structural-styles']],
      decls: 0,
      vars: 0,
      template: function (r, i) {},
      styles: [
        `.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`,
      ],
      encapsulation: 2,
    });
  }
  return n;
})();
var np = new N('MAT_BUTTON_CONFIG');
function Fl(n) {
  return n == null ? void 0 : CO(n);
}
var Ul = (() => {
  class n {
    _elementRef = E$1(Xn$1);
    _ngZone = E$1(De$2);
    _animationsDisabled = ln();
    _config = E$1(np, { optional: true });
    _focusMonitor = E$1(Do);
    _cleanupClick;
    _renderer = E$1(Fy);
    _rippleLoader = E$1(Nl);
    _isAnchor;
    _isFab = false;
    color;
    get disableRipple() {
      return this._disableRipple;
    }
    set disableRipple(e) {
      ((this._disableRipple = e), this._updateRippleDisabled());
    }
    _disableRipple = false;
    get disabled() {
      return this._disabled;
    }
    set disabled(e) {
      ((this._disabled = e), this._updateRippleDisabled());
    }
    _disabled = false;
    ariaDisabled;
    disabledInteractive;
    tabIndex;
    set _tabindex(e) {
      this.tabIndex = e;
    }
    showProgress = yO(false, { transform: wO });
    constructor() {
      E$1(rr).load(Ll);
      let e = this._elementRef.nativeElement;
      ((this._isAnchor = e.tagName === 'A'),
        (this.disabledInteractive = this._config?.disabledInteractive ?? false),
        (this.color = this._config?.color ?? null),
        this._rippleLoader?.configureRipple(e, { className: 'mat-mdc-button-ripple' }));
    }
    ngAfterViewInit() {
      (this._focusMonitor.monitor(this._elementRef, true), this._isAnchor && this._setupAsAnchor());
    }
    ngOnDestroy() {
      (this._cleanupClick?.(),
        this._focusMonitor.stopMonitoring(this._elementRef),
        this._rippleLoader?.destroyRipple(this._elementRef.nativeElement));
    }
    focus(e = 'program', r) {
      e
        ? this._focusMonitor.focusVia(this._elementRef.nativeElement, e, r)
        : this._elementRef.nativeElement.focus(r);
    }
    _getAriaDisabled() {
      return this.ariaDisabled != null
        ? this.ariaDisabled
        : this._isAnchor
          ? this.disabled || null
          : this.disabled && this.disabledInteractive
            ? true
            : null;
    }
    _getDisabledAttribute() {
      return this.disabledInteractive || !this.disabled ? null : true;
    }
    _updateRippleDisabled() {
      this._rippleLoader?.setDisabled(
        this._elementRef.nativeElement,
        this.disableRipple || this.disabled,
      );
    }
    _getTabIndex() {
      return this._isAnchor
        ? this.disabled && !this.disabledInteractive
          ? -1
          : this.tabIndex
        : this.tabIndex;
    }
    _setupAsAnchor() {
      this._cleanupClick = this._ngZone.runOutsideAngular(() =>
        this._renderer.listen(this._elementRef.nativeElement, 'click', (e) => {
          this.disabled && (e.preventDefault(), e.stopImmediatePropagation());
        }),
      );
    }
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵdir = Lv({
      type: n,
      hostAttrs: [1, 'mat-mdc-button-base'],
      hostVars: 15,
      hostBindings: function (r, i) {
        r & 2 &&
          (yf$1('disabled', i._getDisabledAttribute())('aria-disabled', i._getAriaDisabled())(
            'tabindex',
            i._getTabIndex(),
          ),
          DE(i.color ? 'mat-' + i.color : ''),
          kf$1('mat-mdc-button-progress-indicator-shown', i.showProgress())(
            'mat-mdc-button-disabled',
            i.disabled,
          )('mat-mdc-button-disabled-interactive', i.disabledInteractive)('mat-unthemed', !i.color)(
            '_mat-animation-noopable',
            i._animationsDisabled,
          ));
      },
      inputs: {
        color: 'color',
        disableRipple: [2, 'disableRipple', 'disableRipple', wO],
        disabled: [2, 'disabled', 'disabled', wO],
        ariaDisabled: [2, 'aria-disabled', 'ariaDisabled', wO],
        disabledInteractive: [2, 'disabledInteractive', 'disabledInteractive', wO],
        tabIndex: [2, 'tabIndex', 'tabIndex', Fl],
        _tabindex: [2, 'tabindex', '_tabindex', Fl],
        showProgress: [1, 'showProgress'],
      },
    });
  }
  return n;
})();
var jl = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵmod = Rv({ type: n });
    static ɵinj = Uc$1({ imports: [on] });
  }
  return n;
})();
var rp = [
    [
      ['', 8, 'material-icons', 3, 'iconPositionEnd', ''],
      ['mat-icon', 3, 'iconPositionEnd', ''],
      ['', 'matButtonIcon', '', 3, 'iconPositionEnd', ''],
    ],
    '*',
    [
      ['', 'iconPositionEnd', '', 8, 'material-icons'],
      ['mat-icon', 'iconPositionEnd', ''],
      ['', 'matButtonIcon', '', 'iconPositionEnd', ''],
    ],
    [['', 'progressIndicator', '']],
  ],
  ip = [
    '.material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])',
    '*',
    '.material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]',
    '[progressIndicator]',
  ];
function sp(n, t) {
  n & 1 && (Ha(0, 'div', 2), iE(1, 3), Ba());
}
var Bl = new Map([
    ['text', ['mat-mdc-button']],
    ['filled', ['mdc-button--unelevated', 'mat-mdc-unelevated-button']],
    ['elevated', ['mdc-button--raised', 'mat-mdc-raised-button']],
    ['outlined', ['mdc-button--outlined', 'mat-mdc-outlined-button']],
    ['tonal', ['mat-tonal-button']],
  ]),
  eE = (() => {
    class n extends Ul {
      get appearance() {
        return this._appearance;
      }
      set appearance(e) {
        this.setAppearance(e || this._config?.defaultAppearance || 'text');
      }
      _appearance = null;
      constructor() {
        super();
        let e = op(this._elementRef.nativeElement);
        e && this.setAppearance(e);
      }
      setAppearance(e) {
        if (e === this._appearance) return;
        let r = this._elementRef.nativeElement.classList,
          i = this._appearance ? Bl.get(this._appearance) : null,
          s = Bl.get(e);
        (i && r.remove(...i), r.add(...s), (this._appearance = e));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵcmp = Av({
        type: n,
        selectors: [
          ['button', 'matButton', ''],
          ['a', 'matButton', ''],
          ['button', 'mat-button', ''],
          ['button', 'mat-raised-button', ''],
          ['button', 'mat-flat-button', ''],
          ['button', 'mat-stroked-button', ''],
          ['a', 'mat-button', ''],
          ['a', 'mat-raised-button', ''],
          ['a', 'mat-flat-button', ''],
          ['a', 'mat-stroked-button', ''],
        ],
        hostAttrs: [1, 'mdc-button'],
        inputs: { appearance: [0, 'matButton', 'appearance'] },
        exportAs: ['matButton', 'matAnchor'],
        features: [df$1],
        ngContentSelectors: ip,
        decls: 8,
        vars: 5,
        consts: [
          [1, 'mat-mdc-button-persistent-ripple'],
          [1, 'mdc-button__label'],
          [1, 'mat-mdc-button-progress-indicator-container'],
          [1, 'mat-focus-indicator'],
          [1, 'mat-mdc-button-touch-target'],
        ],
        template: function (r, i) {
          (r & 1 &&
            (oE(rp),
            If$1(0, 'span', 0),
            iE(1),
            Ha(2, 'span', 1),
            iE(3, 1),
            Ba(),
            iE(4, 2),
            Kv(5, sp, 2, 0, 'div', 2),
            If$1(6, 'span', 3)(7, 'span', 4)),
            r & 2 &&
              (kf$1('mdc-button__ripple', !i._isFab)('mdc-fab__ripple', i._isFab),
              km$1(5),
              Jv(i.showProgress() ? 5 : -1)));
        },
        styles: [
          `.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button .mat-mdc-button-progress-indicator-container {
  --mat-progress-spinner-active-indicator-color: var(--mat-button-filled-progress-active-indicator-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}

.mat-mdc-button-progress-indicator-container {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.mat-mdc-button-progress-indicator-shown mat-icon,
.mat-mdc-button-progress-indicator-shown [matButtonIcon],
.mat-mdc-button-progress-indicator-shown .mdc-button__label {
  visibility: hidden;
}
`,
          `@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`,
        ],
        encapsulation: 2,
      });
    }
    return n;
  })();
function op(n) {
  return n.hasAttribute('mat-raised-button')
    ? 'elevated'
    : n.hasAttribute('mat-stroked-button')
      ? 'outlined'
      : n.hasAttribute('mat-flat-button')
        ? 'filled'
        : n.hasAttribute('mat-button')
          ? 'text'
          : null;
}
var tE = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵmod = Rv({ type: n });
    static ɵinj = Uc$1({ imports: [jl, on] });
  }
  return n;
})();
var $l = (n) => (n ? (...t) => n(...t) : (...t) => fetch(...t));
var un = class extends Error {
    constructor(t, e = 'FunctionsError', r) {
      (super(t), (this.name = e), (this.context = r));
    }
    toJSON() {
      return { name: this.name, message: this.message, context: this.context };
    }
  },
  ur = class extends un {
    constructor(t) {
      super('Failed to send a request to the Edge Function', 'FunctionsFetchError', t);
    }
  },
  dn = class extends un {
    constructor(t) {
      super('Relay Error invoking the Edge Function', 'FunctionsRelayError', t);
    }
  },
  hn = class extends un {
    constructor(t) {
      super('Edge Function returned a non-2xx status code', 'FunctionsHttpError', t);
    }
  },
  Oi = (function (n) {
    return (
      (n.Any = 'any'),
      (n.ApNortheast1 = 'ap-northeast-1'),
      (n.ApNortheast2 = 'ap-northeast-2'),
      (n.ApSouth1 = 'ap-south-1'),
      (n.ApSoutheast1 = 'ap-southeast-1'),
      (n.ApSoutheast2 = 'ap-southeast-2'),
      (n.CaCentral1 = 'ca-central-1'),
      (n.EuCentral1 = 'eu-central-1'),
      (n.EuWest1 = 'eu-west-1'),
      (n.EuWest2 = 'eu-west-2'),
      (n.EuWest3 = 'eu-west-3'),
      (n.SaEast1 = 'sa-east-1'),
      (n.UsEast1 = 'us-east-1'),
      (n.UsWest1 = 'us-west-1'),
      (n.UsWest2 = 'us-west-2'),
      n
    );
  })(Oi || {});
var dr = class {
  constructor(t, { headers: e = {}, customFetch: r, region: i = Oi.Any } = {}) {
    ((this.url = t), (this.headers = e), (this.region = i), (this.fetch = $l(r)));
  }
  setAuth(t) {
    this.headers.Authorization = `Bearer ${t}`;
  }
  invoke(t) {
    return Tc$1(this, arguments, void 0, function* (e, r = {}) {
      var i;
      let s, o;
      try {
        let { headers: a, method: c, body: l, signal: u, timeout: d } = r,
          h = {},
          { region: f } = r;
        f || (f = this.region);
        let p = new URL(`${this.url}/${e}`);
        f && f !== 'any' && ((h['x-region'] = f), p.searchParams.set('forceFunctionRegion', f));
        let g;
        l && ((a && !Object.prototype.hasOwnProperty.call(a, 'Content-Type')) || !a)
          ? (typeof Blob < 'u' && l instanceof Blob) || l instanceof ArrayBuffer
            ? ((h['Content-Type'] = 'application/octet-stream'), (g = l))
            : typeof l == 'string'
              ? ((h['Content-Type'] = 'text/plain'), (g = l))
              : typeof FormData < 'u' && l instanceof FormData
                ? (g = l)
                : ((h['Content-Type'] = 'application/json'), (g = JSON.stringify(l)))
          : l &&
              typeof l != 'string' &&
              !(typeof Blob < 'u' && l instanceof Blob) &&
              !(l instanceof ArrayBuffer) &&
              !(typeof FormData < 'u' && l instanceof FormData)
            ? (g = JSON.stringify(l))
            : (g = l);
        let y = u;
        d &&
          ((o = new AbortController()),
          (s = setTimeout(() => o.abort(), d)),
          u ? ((y = o.signal), u.addEventListener('abort', () => o.abort())) : (y = o.signal));
        let v = yield this.fetch(p.toString(), {
            method: c || 'POST',
            headers: Object.assign(Object.assign(Object.assign({}, h), this.headers), a),
            body: g,
            signal: y,
          }).catch((P) => {
            throw new ur(P);
          }),
          D = v.headers.get('x-relay-error');
        if (D && D === 'true') throw new dn(v);
        if (!v.ok) throw new hn(v);
        let w = ((i = v.headers.get('Content-Type')) !== null && i !== void 0 ? i : 'text/plain')
            .split(';')[0]
            .trim(),
          S;
        return (
          w === 'application/json'
            ? (S = yield v.json())
            : w === 'application/octet-stream' || w === 'application/pdf'
              ? (S = yield v.blob())
              : w === 'text/event-stream'
                ? (S = v)
                : w === 'multipart/form-data'
                  ? (S = yield v.formData())
                  : (S = yield v.text()),
          { data: S, error: null, response: v }
        );
      } catch (a) {
        return {
          data: null,
          error: a,
          response: a instanceof hn || a instanceof dn ? a.context : void 0,
        };
      } finally {
        s && clearTimeout(s);
      }
    });
  }
};
var zl = (n) => Math.min(1e3 * 2 ** n, 3e4),
  ap = [520, 503],
  Gl = ['GET', 'HEAD', 'OPTIONS'],
  Po = class extends Error {
    constructor(n) {
      (super(n.message),
        (this.name = 'PostgrestError'),
        (this.details = n.details),
        (this.hint = n.hint),
        (this.code = n.code));
    }
    toJSON() {
      return {
        name: this.name,
        message: this.message,
        details: this.details,
        hint: this.hint,
        code: this.code,
      };
    }
  };
function Hl(n, t) {
  return new Promise((e) => {
    if (t?.aborted) {
      e();
      return;
    }
    let r = setTimeout(() => {
      (t?.removeEventListener('abort', i), e());
    }, n);
    function i() {
      (clearTimeout(r), e());
    }
    t?.addEventListener('abort', i);
  });
}
function cp(n, t, e, r) {
  return !(!r || e >= 3 || !Gl.includes(n) || !ap.includes(t));
}
var lp = class {
    constructor(n) {
      var t, e, r, i, s;
      ((this.shouldThrowOnError = false),
        (this.retryEnabled = true),
        (this.method = n.method),
        (this.url = n.url),
        (this.headers = new Headers(n.headers)),
        (this.schema = n.schema),
        (this.body = n.body),
        (this.shouldThrowOnError = (t = n.shouldThrowOnError) !== null && t !== void 0 ? t : false),
        (this.signal = n.signal),
        (this.isMaybeSingle = (e = n.isMaybeSingle) !== null && e !== void 0 ? e : false),
        (this.shouldStripNulls = (r = n.shouldStripNulls) !== null && r !== void 0 ? r : false),
        (this.urlLengthLimit = (i = n.urlLengthLimit) !== null && i !== void 0 ? i : 8e3),
        (this.retryEnabled = (s = n.retry) !== null && s !== void 0 ? s : true),
        n.fetch ? (this.fetch = n.fetch) : (this.fetch = fetch));
    }
    throwOnError() {
      return ((this.shouldThrowOnError = true), this);
    }
    stripNulls() {
      if (this.headers.get('Accept') === 'text/csv')
        throw new Error('stripNulls() cannot be used with csv()');
      return ((this.shouldStripNulls = true), this);
    }
    setHeader(n, t) {
      return ((this.headers = new Headers(this.headers)), this.headers.set(n, t), this);
    }
    retry(n) {
      return ((this.retryEnabled = n), this);
    }
    then(n, t) {
      var e = this;
      if (
        (this.schema === void 0 ||
          (['GET', 'HEAD'].includes(this.method)
            ? this.headers.set('Accept-Profile', this.schema)
            : this.headers.set('Content-Profile', this.schema)),
        this.method !== 'GET' &&
          this.method !== 'HEAD' &&
          this.headers.set('Content-Type', 'application/json'),
        this.shouldStripNulls)
      ) {
        let o = this.headers.get('Accept');
        o === 'application/vnd.pgrst.object+json'
          ? this.headers.set('Accept', 'application/vnd.pgrst.object+json;nulls=stripped')
          : (!o || o === 'application/json') &&
            this.headers.set('Accept', 'application/vnd.pgrst.array+json;nulls=stripped');
      }
      let r = this.fetch,
        s = (async () => {
          let o = 0;
          for (;;) {
            let l = new Headers(e.headers);
            o > 0 && l.set('X-Retry-Count', String(o));
            let u;
            try {
              u = await r(e.url.toString(), {
                method: e.method,
                headers: l,
                body: JSON.stringify(e.body, (d, h) => (typeof h == 'bigint' ? h.toString() : h)),
                signal: e.signal,
              });
            } catch (d) {
              if (d?.name === 'AbortError' || d?.code === 'ABORT_ERR' || !Gl.includes(e.method))
                throw d;
              if (e.retryEnabled && o < 3) {
                let h = zl(o);
                (o++, await Hl(h, e.signal));
                continue;
              }
              throw d;
            }
            if (cp(e.method, u.status, o, e.retryEnabled)) {
              var a, c;
              let d =
                  (a = (c = u.headers) === null || c === void 0 ? void 0 : c.get('Retry-After')) !==
                    null && a !== void 0
                    ? a
                    : null,
                h = d !== null ? Math.max(0, parseInt(d, 10) || 0) * 1e3 : zl(o);
              (await u.text(), o++, await Hl(h, e.signal));
              continue;
            }
            return await e.processResponse(u);
          }
        })();
      return (
        this.shouldThrowOnError ||
          (s = s.catch((o) => {
            var a;
            let c = '',
              l = '',
              u = '',
              d = o?.cause;
            if (d) {
              var h, f, p, g;
              let D = (h = d?.message) !== null && h !== void 0 ? h : '',
                w = (f = d?.code) !== null && f !== void 0 ? f : '';
              ((c = `${(p = o?.name) !== null && p !== void 0 ? p : 'FetchError'}: ${o?.message}`),
                (c += `

Caused by: ${(g = d?.name) !== null && g !== void 0 ? g : 'Error'}: ${D}`),
                w && (c += ` (${w})`),
                d?.stack &&
                  (c += `
${d.stack}`));
            } else {
              var y;
              c = (y = o?.stack) !== null && y !== void 0 ? y : '';
            }
            let v = this.url.toString().length;
            return (
              o?.name === 'AbortError' || o?.code === 'ABORT_ERR'
                ? ((u = ''),
                  (l = 'Request was aborted (timeout or manual cancellation)'),
                  v > this.urlLengthLimit &&
                    (l += `. Note: Your request URL is ${v} characters, which may exceed server limits. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [many IDs])), consider using an RPC function to pass values server-side.`))
                : (d?.name === 'HeadersOverflowError' || d?.code === 'UND_ERR_HEADERS_OVERFLOW') &&
                  ((u = ''),
                  (l = 'HTTP headers exceeded server limits (typically 16KB)'),
                  v > this.urlLengthLimit &&
                    (l += `. Your request URL is ${v} characters. If selecting many fields, consider using views. If filtering with large arrays (e.g., .in('id', [200+ IDs])), consider using an RPC function instead.`)),
              {
                success: false,
                error: {
                  message: `${(a = o?.name) !== null && a !== void 0 ? a : 'FetchError'}: ${o?.message}`,
                  details: c,
                  hint: l,
                  code: u,
                },
                data: null,
                count: null,
                status: 0,
                statusText: '',
              }
            );
          })),
        s.then(n, t)
      );
    }
    async processResponse(n) {
      var t = this;
      let e = null,
        r = null,
        i = null,
        s = n.status,
        o = n.statusText;
      if (n.ok) {
        var a, c;
        if (t.method !== 'HEAD') {
          var l;
          let h = await n.text();
          if (h !== '')
            if (t.headers.get('Accept') === 'text/csv') r = h;
            else if (
              t.headers.get('Accept') &&
              !((l = t.headers.get('Accept')) === null || l === void 0) &&
              l.includes('application/vnd.pgrst.plan+text')
            )
              r = h;
            else
              try {
                r = JSON.parse(h);
              } catch {
                if (((e = { message: h }), (r = null), t.shouldThrowOnError))
                  throw new Po({ message: h, details: '', hint: '', code: '' });
              }
        }
        let u =
            (a = t.headers.get('Prefer')) === null || a === void 0
              ? void 0
              : a.match(/count=(exact|planned|estimated)/),
          d = (c = n.headers.get('content-range')) === null || c === void 0 ? void 0 : c.split('/');
        (u && d && d.length > 1 && (i = parseInt(d[1])),
          t.isMaybeSingle &&
            Array.isArray(r) &&
            (r.length > 1
              ? ((e = {
                  code: 'PGRST116',
                  details: `Results contain ${r.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                  hint: null,
                  message: 'JSON object requested, multiple (or no) rows returned',
                }),
                (r = null),
                (i = null),
                (s = 406),
                (o = 'Not Acceptable'))
              : r.length === 1
                ? (r = r[0])
                : (r = null)));
      } else {
        let u = await n.text();
        try {
          ((e = JSON.parse(u)),
            Array.isArray(e) && n.status === 404 && ((r = []), (e = null), (s = 200), (o = 'OK')));
        } catch {
          n.status === 404 && u === '' ? ((s = 204), (o = 'No Content')) : (e = { message: u });
        }
        if (e && t.shouldThrowOnError) throw new Po(e);
      }
      return { success: e === null, error: e, data: r, count: i, status: s, statusText: o };
    }
    returns() {
      return this;
    }
    overrideTypes() {
      return this;
    }
  },
  up = class extends lp {
    select(n) {
      let t = false,
        e = (n ?? '*')
          .split('')
          .map((r) => (/\s/.test(r) && !t ? '' : (r === '"' && (t = !t), r)))
          .join('');
      return (
        this.url.searchParams.set('select', e),
        this.headers.append('Prefer', 'return=representation'),
        this
      );
    }
    order(n, { ascending: t = true, nullsFirst: e, foreignTable: r, referencedTable: i = r } = {}) {
      let s = i ? `${i}.order` : 'order',
        o = this.url.searchParams.get(s);
      return (
        this.url.searchParams.set(
          s,
          `${o ? `${o},` : ''}${n}.${t ? 'asc' : 'desc'}${e === void 0 ? '' : e ? '.nullsfirst' : '.nullslast'}`,
        ),
        this
      );
    }
    limit(n, { foreignTable: t, referencedTable: e = t } = {}) {
      let r = typeof e > 'u' ? 'limit' : `${e}.limit`;
      return (this.url.searchParams.set(r, `${n}`), this);
    }
    range(n, t, { foreignTable: e, referencedTable: r = e } = {}) {
      let i = typeof r > 'u' ? 'offset' : `${r}.offset`,
        s = typeof r > 'u' ? 'limit' : `${r}.limit`;
      return (
        this.url.searchParams.set(i, `${n}`),
        this.url.searchParams.set(s, `${t - n + 1}`),
        this
      );
    }
    abortSignal(n) {
      return ((this.signal = n), this);
    }
    single() {
      return (this.headers.set('Accept', 'application/vnd.pgrst.object+json'), this);
    }
    maybeSingle() {
      return ((this.isMaybeSingle = true), this);
    }
    csv() {
      return (this.headers.set('Accept', 'text/csv'), this);
    }
    geojson() {
      return (this.headers.set('Accept', 'application/geo+json'), this);
    }
    explain({
      analyze: n = false,
      verbose: t = false,
      settings: e = false,
      buffers: r = false,
      wal: i = false,
      format: s = 'text',
    } = {}) {
      var o;
      let a = [
          n ? 'analyze' : null,
          t ? 'verbose' : null,
          e ? 'settings' : null,
          r ? 'buffers' : null,
          i ? 'wal' : null,
        ]
          .filter(Boolean)
          .join('|'),
        c = (o = this.headers.get('Accept')) !== null && o !== void 0 ? o : 'application/json';
      return (
        this.headers.set('Accept', `application/vnd.pgrst.plan+${s}; for="${c}"; options=${a};`),
        s === 'json' ? this : this
      );
    }
    rollback() {
      return (this.headers.append('Prefer', 'tx=rollback'), this);
    }
    returns() {
      return this;
    }
    maxAffected(n) {
      return (
        this.headers.append('Prefer', 'handling=strict'),
        this.headers.append('Prefer', `max-affected=${n}`),
        this
      );
    }
  },
  Vl = new RegExp('[,()]'),
  fn = class extends up {
    eq(n, t) {
      return (this.url.searchParams.append(n, `eq.${t}`), this);
    }
    neq(n, t) {
      return (this.url.searchParams.append(n, `neq.${t}`), this);
    }
    gt(n, t) {
      return (this.url.searchParams.append(n, `gt.${t}`), this);
    }
    gte(n, t) {
      return (this.url.searchParams.append(n, `gte.${t}`), this);
    }
    lt(n, t) {
      return (this.url.searchParams.append(n, `lt.${t}`), this);
    }
    lte(n, t) {
      return (this.url.searchParams.append(n, `lte.${t}`), this);
    }
    like(n, t) {
      return (this.url.searchParams.append(n, `like.${t}`), this);
    }
    likeAllOf(n, t) {
      return (this.url.searchParams.append(n, `like(all).{${t.join(',')}}`), this);
    }
    likeAnyOf(n, t) {
      return (this.url.searchParams.append(n, `like(any).{${t.join(',')}}`), this);
    }
    ilike(n, t) {
      return (this.url.searchParams.append(n, `ilike.${t}`), this);
    }
    ilikeAllOf(n, t) {
      return (this.url.searchParams.append(n, `ilike(all).{${t.join(',')}}`), this);
    }
    ilikeAnyOf(n, t) {
      return (this.url.searchParams.append(n, `ilike(any).{${t.join(',')}}`), this);
    }
    regexMatch(n, t) {
      return (this.url.searchParams.append(n, `match.${t}`), this);
    }
    regexIMatch(n, t) {
      return (this.url.searchParams.append(n, `imatch.${t}`), this);
    }
    is(n, t) {
      return (this.url.searchParams.append(n, `is.${t}`), this);
    }
    isDistinct(n, t) {
      return (this.url.searchParams.append(n, `isdistinct.${t}`), this);
    }
    in(n, t) {
      let e = Array.from(new Set(t))
        .map((r) => (typeof r == 'string' && Vl.test(r) ? `"${r}"` : `${r}`))
        .join(',');
      return (this.url.searchParams.append(n, `in.(${e})`), this);
    }
    notIn(n, t) {
      let e = Array.from(new Set(t))
        .map((r) => (typeof r == 'string' && Vl.test(r) ? `"${r}"` : `${r}`))
        .join(',');
      return (this.url.searchParams.append(n, `not.in.(${e})`), this);
    }
    contains(n, t) {
      return (
        typeof t == 'string'
          ? this.url.searchParams.append(n, `cs.${t}`)
          : Array.isArray(t)
            ? this.url.searchParams.append(n, `cs.{${t.join(',')}}`)
            : this.url.searchParams.append(n, `cs.${JSON.stringify(t)}`),
        this
      );
    }
    containedBy(n, t) {
      return (
        typeof t == 'string'
          ? this.url.searchParams.append(n, `cd.${t}`)
          : Array.isArray(t)
            ? this.url.searchParams.append(n, `cd.{${t.join(',')}}`)
            : this.url.searchParams.append(n, `cd.${JSON.stringify(t)}`),
        this
      );
    }
    rangeGt(n, t) {
      return (this.url.searchParams.append(n, `sr.${t}`), this);
    }
    rangeGte(n, t) {
      return (this.url.searchParams.append(n, `nxl.${t}`), this);
    }
    rangeLt(n, t) {
      return (this.url.searchParams.append(n, `sl.${t}`), this);
    }
    rangeLte(n, t) {
      return (this.url.searchParams.append(n, `nxr.${t}`), this);
    }
    rangeAdjacent(n, t) {
      return (this.url.searchParams.append(n, `adj.${t}`), this);
    }
    overlaps(n, t) {
      return (
        typeof t == 'string'
          ? this.url.searchParams.append(n, `ov.${t}`)
          : this.url.searchParams.append(n, `ov.{${t.join(',')}}`),
        this
      );
    }
    textSearch(n, t, { config: e, type: r } = {}) {
      let i = '';
      r === 'plain' ? (i = 'pl') : r === 'phrase' ? (i = 'ph') : r === 'websearch' && (i = 'w');
      let s = e === void 0 ? '' : `(${e})`;
      return (this.url.searchParams.append(n, `${i}fts${s}.${t}`), this);
    }
    match(n) {
      return (
        Object.entries(n)
          .filter(([t, e]) => e !== void 0)
          .forEach(([t, e]) => {
            this.url.searchParams.append(t, `eq.${e}`);
          }),
        this
      );
    }
    not(n, t, e) {
      return (this.url.searchParams.append(n, `not.${t}.${e}`), this);
    }
    or(n, { foreignTable: t, referencedTable: e = t } = {}) {
      let r = e ? `${e}.or` : 'or';
      return (this.url.searchParams.append(r, `(${n})`), this);
    }
    filter(n, t, e) {
      return (this.url.searchParams.append(n, `${t}.${e}`), this);
    }
  },
  dp = class {
    constructor(n, { headers: t = {}, schema: e, fetch: r, urlLengthLimit: i = 8e3, retry: s }) {
      ((this.url = n),
        (this.headers = new Headers(t)),
        (this.schema = e),
        (this.fetch = r),
        (this.urlLengthLimit = i),
        (this.retry = s));
    }
    cloneRequestState() {
      return { url: new URL(this.url.toString()), headers: new Headers(this.headers) };
    }
    select(n, t) {
      let { head: e = false, count: r } = t ?? {},
        i = e ? 'HEAD' : 'GET',
        s = false,
        o = (n ?? '*')
          .split('')
          .map((l) => (/\s/.test(l) && !s ? '' : (l === '"' && (s = !s), l)))
          .join(''),
        { url: a, headers: c } = this.cloneRequestState();
      return (
        a.searchParams.set('select', o),
        r && c.append('Prefer', `count=${r}`),
        new fn({
          method: i,
          url: a,
          headers: c,
          schema: this.schema,
          fetch: this.fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry,
        })
      );
    }
    insert(n, { count: t, defaultToNull: e = true } = {}) {
      var r;
      let i = 'POST',
        { url: s, headers: o } = this.cloneRequestState();
      if (
        (t && o.append('Prefer', `count=${t}`),
        e || o.append('Prefer', 'missing=default'),
        Array.isArray(n))
      ) {
        let a = n.reduce((c, l) => c.concat(Object.keys(l)), []);
        if (a.length > 0) {
          let c = [...new Set(a)].map((l) => `"${l}"`);
          s.searchParams.set('columns', c.join(','));
        }
      }
      return new fn({
        method: i,
        url: s,
        headers: o,
        schema: this.schema,
        body: n,
        fetch: (r = this.fetch) !== null && r !== void 0 ? r : fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry,
      });
    }
    upsert(
      n,
      { onConflict: t, ignoreDuplicates: e = false, count: r, defaultToNull: i = true } = {},
    ) {
      var s;
      let o = 'POST',
        { url: a, headers: c } = this.cloneRequestState();
      if (
        (c.append('Prefer', `resolution=${e ? 'ignore' : 'merge'}-duplicates`),
        t !== void 0 && a.searchParams.set('on_conflict', t),
        r && c.append('Prefer', `count=${r}`),
        i || c.append('Prefer', 'missing=default'),
        Array.isArray(n))
      ) {
        let l = n.reduce((u, d) => u.concat(Object.keys(d)), []);
        if (l.length > 0) {
          let u = [...new Set(l)].map((d) => `"${d}"`);
          a.searchParams.set('columns', u.join(','));
        }
      }
      return new fn({
        method: o,
        url: a,
        headers: c,
        schema: this.schema,
        body: n,
        fetch: (s = this.fetch) !== null && s !== void 0 ? s : fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry,
      });
    }
    update(n, { count: t } = {}) {
      var e;
      let r = 'PATCH',
        { url: i, headers: s } = this.cloneRequestState();
      return (
        t && s.append('Prefer', `count=${t}`),
        new fn({
          method: r,
          url: i,
          headers: s,
          schema: this.schema,
          body: n,
          fetch: (e = this.fetch) !== null && e !== void 0 ? e : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry,
        })
      );
    }
    delete({ count: n } = {}) {
      var t;
      let e = 'DELETE',
        { url: r, headers: i } = this.cloneRequestState();
      return (
        n && i.append('Prefer', `count=${n}`),
        new fn({
          method: e,
          url: r,
          headers: i,
          schema: this.schema,
          fetch: (t = this.fetch) !== null && t !== void 0 ? t : fetch,
          urlLengthLimit: this.urlLengthLimit,
          retry: this.retry,
        })
      );
    }
  };
function hr(n) {
  '@babel/helpers - typeof';
  return (
    (hr =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t;
          }),
    hr(n)
  );
}
function hp(n, t) {
  if (hr(n) != 'object' || !n) return n;
  var e = n[Symbol.toPrimitive];
  if (e !== void 0) {
    var r = e.call(n, t);
    if (hr(r) != 'object') return r;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (t === 'string' ? String : Number)(n);
}
function fp(n) {
  var t = hp(n, 'string');
  return hr(t) == 'symbol' ? t : t + '';
}
function pp(n, t, e) {
  return (
    (t = fp(t)) in n
      ? Object.defineProperty(n, t, {
          value: e,
          enumerable: true,
          configurable: true,
          writable: true,
        })
      : (n[t] = e),
    n
  );
}
function ql(n, t) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    (t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(n, i).enumerable;
      })),
      e.push.apply(e, r));
  }
  return e;
}
function xi(n) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? ql(Object(e), true).forEach(function (r) {
          pp(n, r, e[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e))
        : ql(Object(e)).forEach(function (r) {
            Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(e, r));
          });
  }
  return n;
}
var Wl = class Kl {
  constructor(
    t,
    { headers: e = {}, schema: r, fetch: i, timeout: s, urlLengthLimit: o = 8e3, retry: a } = {},
  ) {
    ((this.url = t),
      (this.headers = new Headers(e)),
      (this.schemaName = r),
      (this.urlLengthLimit = o));
    let c = i ?? globalThis.fetch;
    (s !== void 0 && s > 0
      ? (this.fetch = (l, u) => {
          let d = new AbortController(),
            h = setTimeout(() => d.abort(), s),
            f = u?.signal;
          if (f) {
            if (f.aborted) return (clearTimeout(h), c(l, u));
            let p = () => {
              (clearTimeout(h), d.abort());
            };
            return (
              f.addEventListener('abort', p, { once: true }),
              c(l, xi(xi({}, u), {}, { signal: d.signal })).finally(() => {
                (clearTimeout(h), f.removeEventListener('abort', p));
              })
            );
          }
          return c(l, xi(xi({}, u), {}, { signal: d.signal })).finally(() => clearTimeout(h));
        })
      : (this.fetch = c),
      (this.retry = a));
  }
  from(t) {
    if (!t || typeof t != 'string' || t.trim() === '')
      throw new Error('Invalid relation name: relation must be a non-empty string.');
    return new dp(new URL(`${this.url}/${t}`), {
      headers: new Headers(this.headers),
      schema: this.schemaName,
      fetch: this.fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry,
    });
  }
  schema(t) {
    return new Kl(this.url, {
      headers: this.headers,
      schema: t,
      fetch: this.fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry,
    });
  }
  rpc(t, e = {}, { head: r = false, get: i = false, count: s } = {}) {
    var o;
    let a,
      c = new URL(`${this.url}/rpc/${t}`),
      l,
      u = (f) => f !== null && typeof f == 'object' && (!Array.isArray(f) || f.some(u)),
      d = r && Object.values(e).some(u);
    d
      ? ((a = 'POST'), (l = e))
      : r || i
        ? ((a = r ? 'HEAD' : 'GET'),
          Object.entries(e)
            .filter(([f, p]) => p !== void 0)
            .map(([f, p]) => [f, Array.isArray(p) ? `{${p.join(',')}}` : `${p}`])
            .forEach(([f, p]) => {
              c.searchParams.append(f, p);
            }))
        : ((a = 'POST'), (l = e));
    let h = new Headers(this.headers);
    return (
      d
        ? h.set('Prefer', s ? `count=${s},return=minimal` : 'return=minimal')
        : s && h.set('Prefer', `count=${s}`),
      new fn({
        method: a,
        url: c,
        headers: h,
        schema: this.schemaName,
        body: l,
        fetch: (o = this.fetch) !== null && o !== void 0 ? o : fetch,
        urlLengthLimit: this.urlLengthLimit,
        retry: this.retry,
      })
    );
  }
};
var Mo = class {
    constructor() {}
    static detectEnvironment() {
      var t;
      if (typeof WebSocket < 'u') return { type: 'native', wsConstructor: WebSocket };
      let e = globalThis;
      if (typeof globalThis < 'u' && typeof e.WebSocket < 'u')
        return { type: 'native', wsConstructor: e.WebSocket };
      let r = typeof global < 'u' ? global : void 0;
      if (r && typeof r.WebSocket < 'u') return { type: 'native', wsConstructor: r.WebSocket };
      if (
        typeof globalThis < 'u' &&
        typeof e.WebSocketPair < 'u' &&
        typeof globalThis.WebSocket > 'u'
      )
        return {
          type: 'cloudflare',
          error:
            'Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.',
          workaround:
            'Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime.',
        };
      if (
        (typeof globalThis < 'u' && e.EdgeRuntime) ||
        (typeof navigator < 'u' &&
          !((t = navigator.userAgent) === null || t === void 0) &&
          t.includes('Vercel-Edge'))
      )
        return {
          type: 'unsupported',
          error:
            'Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.',
          workaround:
            'Use serverless functions or a different deployment target for WebSocket functionality.',
        };
      let i = globalThis.process;
      if (i) {
        let s = i.versions;
        if (s && s.node) {
          let o = s.node,
            a = parseInt(o.replace(/^v/, '').split('.')[0]);
          return a >= 22
            ? typeof globalThis.WebSocket < 'u'
              ? { type: 'native', wsConstructor: globalThis.WebSocket }
              : {
                  type: 'unsupported',
                  error: `Node.js ${a} detected but native WebSocket not found.`,
                  workaround: 'Provide a WebSocket implementation via the transport option.',
                }
            : {
                type: 'unsupported',
                error: `Node.js ${a} detected without native WebSocket support.`,
                workaround: `For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`,
              };
        }
      }
      return {
        type: 'unsupported',
        error: 'Unknown JavaScript runtime without WebSocket support.',
        workaround:
          "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation.",
      };
    }
    static getWebSocketConstructor() {
      let t = this.detectEnvironment();
      if (t.wsConstructor) return t.wsConstructor;
      let e = t.error || 'WebSocket not supported in this environment.';
      throw (
        t.workaround &&
          (e += `

Suggested solution: ${t.workaround}`),
        new Error(e)
      );
    }
    static isWebSocketSupported() {
      try {
        let t = this.detectEnvironment();
        return t.type === 'native' || t.type === 'ws';
      } catch {
        return false;
      }
    }
  },
  No = Mo;
var Jl = '2.107.0';
var Yl = `realtime-js/${Jl}`,
  Xl = '1.0.0',
  Lo = '2.0.0',
  Zl = Lo;
var Ql = 1e4;
var eu = 100;
var Pe = {
    closed: 'closed',
    errored: 'errored',
    joined: 'joined',
    joining: 'joining',
    leaving: 'leaving',
  },
  Pi = {
    close: 'phx_close',
    error: 'phx_error',
    join: 'phx_join',
    leave: 'phx_leave',
    access_token: 'access_token',
  };
var fr = { connecting: 'connecting', closing: 'closing', closed: 'closed' };
var Mi = class {
  constructor(t) {
    ((this.HEADER_LENGTH = 1),
      (this.USER_BROADCAST_PUSH_META_LENGTH = 6),
      (this.KINDS = { userBroadcastPush: 3, userBroadcast: 4 }),
      (this.BINARY_ENCODING = 0),
      (this.JSON_ENCODING = 1),
      (this.BROADCAST_EVENT = 'broadcast'),
      (this.allowedMetadataKeys = []),
      (this.allowedMetadataKeys = t ?? []));
  }
  encode(t, e) {
    if (
      t.event === this.BROADCAST_EVENT &&
      !(t.payload instanceof ArrayBuffer) &&
      typeof t.payload.event == 'string'
    )
      return e(this._binaryEncodeUserBroadcastPush(t));
    let r = [t.join_ref, t.ref, t.topic, t.event, t.payload];
    return e(JSON.stringify(r));
  }
  _binaryEncodeUserBroadcastPush(t) {
    var e;
    return this._isArrayBuffer((e = t.payload) === null || e === void 0 ? void 0 : e.payload)
      ? this._encodeBinaryUserBroadcastPush(t)
      : this._encodeJsonUserBroadcastPush(t);
  }
  _encodeBinaryUserBroadcastPush(t) {
    var e, r;
    let i =
      (r = (e = t.payload) === null || e === void 0 ? void 0 : e.payload) !== null && r !== void 0
        ? r
        : new ArrayBuffer(0);
    return this._encodeUserBroadcastPush(t, this.BINARY_ENCODING, i);
  }
  _encodeJsonUserBroadcastPush(t) {
    var e, r;
    let i =
        (r = (e = t.payload) === null || e === void 0 ? void 0 : e.payload) !== null && r !== void 0
          ? r
          : {},
      o = new TextEncoder().encode(JSON.stringify(i)).buffer;
    return this._encodeUserBroadcastPush(t, this.JSON_ENCODING, o);
  }
  _encodeUserBroadcastPush(t, e, r) {
    var i, s;
    let o = t.topic,
      a = (i = t.ref) !== null && i !== void 0 ? i : '',
      c = (s = t.join_ref) !== null && s !== void 0 ? s : '',
      l = t.payload.event,
      u = this.allowedMetadataKeys ? this._pick(t.payload, this.allowedMetadataKeys) : {},
      d = Object.keys(u).length === 0 ? '' : JSON.stringify(u);
    if (c.length > 255) throw new Error(`joinRef length ${c.length} exceeds maximum of 255`);
    if (a.length > 255) throw new Error(`ref length ${a.length} exceeds maximum of 255`);
    if (o.length > 255) throw new Error(`topic length ${o.length} exceeds maximum of 255`);
    if (l.length > 255) throw new Error(`userEvent length ${l.length} exceeds maximum of 255`);
    if (d.length > 255) throw new Error(`metadata length ${d.length} exceeds maximum of 255`);
    let h =
        this.USER_BROADCAST_PUSH_META_LENGTH + c.length + a.length + o.length + l.length + d.length,
      f = new ArrayBuffer(this.HEADER_LENGTH + h),
      p = new DataView(f),
      g = 0;
    (p.setUint8(g++, this.KINDS.userBroadcastPush),
      p.setUint8(g++, c.length),
      p.setUint8(g++, a.length),
      p.setUint8(g++, o.length),
      p.setUint8(g++, l.length),
      p.setUint8(g++, d.length),
      p.setUint8(g++, e),
      Array.from(c, (v) => p.setUint8(g++, v.charCodeAt(0))),
      Array.from(a, (v) => p.setUint8(g++, v.charCodeAt(0))),
      Array.from(o, (v) => p.setUint8(g++, v.charCodeAt(0))),
      Array.from(l, (v) => p.setUint8(g++, v.charCodeAt(0))),
      Array.from(d, (v) => p.setUint8(g++, v.charCodeAt(0))));
    var y = new Uint8Array(f.byteLength + r.byteLength);
    return (y.set(new Uint8Array(f), 0), y.set(new Uint8Array(r), f.byteLength), y.buffer);
  }
  decode(t, e) {
    if (this._isArrayBuffer(t)) {
      let r = this._binaryDecode(t);
      return e(r);
    }
    if (typeof t == 'string') {
      let r = JSON.parse(t),
        [i, s, o, a, c] = r;
      return e({ join_ref: i, ref: s, topic: o, event: a, payload: c });
    }
    return e({});
  }
  _binaryDecode(t) {
    let e = new DataView(t),
      r = e.getUint8(0),
      i = new TextDecoder();
    if (r === this.KINDS.userBroadcast) return this._decodeUserBroadcast(t, e, i);
  }
  _decodeUserBroadcast(t, e, r) {
    let i = e.getUint8(1),
      s = e.getUint8(2),
      o = e.getUint8(3),
      a = e.getUint8(4),
      c = this.HEADER_LENGTH + 4,
      l = r.decode(t.slice(c, c + i));
    c = c + i;
    let u = r.decode(t.slice(c, c + s));
    c = c + s;
    let d = r.decode(t.slice(c, c + o));
    c = c + o;
    let h = t.slice(c, t.byteLength),
      f = a === this.JSON_ENCODING ? JSON.parse(r.decode(h)) : h,
      p = { type: this.BROADCAST_EVENT, event: u, payload: f };
    return (
      o > 0 && (p.meta = JSON.parse(d)),
      { join_ref: null, ref: null, topic: l, event: this.BROADCAST_EVENT, payload: p }
    );
  }
  _isArrayBuffer(t) {
    var e;
    return (
      t instanceof ArrayBuffer ||
      ((e = t?.constructor) === null || e === void 0 ? void 0 : e.name) === 'ArrayBuffer'
    );
  }
  _pick(t, e) {
    return !t || typeof t != 'object'
      ? {}
      : Object.fromEntries(Object.entries(t).filter(([r]) => e.includes(r)));
  }
};
var j = (function (n) {
    return (
      (n.abstime = 'abstime'),
      (n.bool = 'bool'),
      (n.date = 'date'),
      (n.daterange = 'daterange'),
      (n.float4 = 'float4'),
      (n.float8 = 'float8'),
      (n.int2 = 'int2'),
      (n.int4 = 'int4'),
      (n.int4range = 'int4range'),
      (n.int8 = 'int8'),
      (n.int8range = 'int8range'),
      (n.json = 'json'),
      (n.jsonb = 'jsonb'),
      (n.money = 'money'),
      (n.numeric = 'numeric'),
      (n.oid = 'oid'),
      (n.reltime = 'reltime'),
      (n.text = 'text'),
      (n.time = 'time'),
      (n.timestamp = 'timestamp'),
      (n.timestamptz = 'timestamptz'),
      (n.timetz = 'timetz'),
      (n.tsrange = 'tsrange'),
      (n.tstzrange = 'tstzrange'),
      n
    );
  })(j || {}),
  Uo = (n, t, e = {}) => {
    var r;
    let i = (r = e.skipTypes) !== null && r !== void 0 ? r : [];
    return t ? Object.keys(t).reduce((s, o) => ((s[o] = mp(o, n, t, i)), s), {}) : {};
  },
  mp = (n, t, e, r) => {
    let i = t.find((a) => a.name === n),
      s = i?.type,
      o = e[n];
    return s && !r.includes(s) ? tu(s, o) : Fo(o);
  },
  tu = (n, t) => {
    if (n.charAt(0) === '_') {
      let e = n.slice(1, n.length);
      return yp(t, e);
    }
    switch (n) {
      case j.bool:
        return gp(t);
      case j.float4:
      case j.float8:
      case j.int2:
      case j.int4:
      case j.int8:
      case j.numeric:
      case j.oid:
        return vp(t);
      case j.json:
      case j.jsonb:
        return bp(t);
      case j.timestamp:
        return _p(t);
      case j.abstime:
      case j.date:
      case j.daterange:
      case j.int4range:
      case j.int8range:
      case j.money:
      case j.reltime:
      case j.text:
      case j.time:
      case j.timestamptz:
      case j.timetz:
      case j.tsrange:
      case j.tstzrange:
        return Fo(t);
      default:
        return Fo(t);
    }
  },
  Fo = (n) => n,
  gp = (n) => {
    switch (n) {
      case 't':
        return true;
      case 'f':
        return false;
      default:
        return n;
    }
  },
  vp = (n) => {
    if (typeof n == 'string') {
      let t = parseFloat(n);
      if (!Number.isNaN(t)) return t;
    }
    return n;
  },
  bp = (n) => {
    if (typeof n == 'string')
      try {
        return JSON.parse(n);
      } catch {
        return n;
      }
    return n;
  },
  yp = (n, t) => {
    if (typeof n != 'string') return n;
    let e = n.length - 1,
      r = n[e];
    if (n[0] === '{' && r === '}') {
      let s,
        o = n.slice(1, e);
      try {
        s = JSON.parse('[' + o + ']');
      } catch {
        s = o ? o.split(',') : [];
      }
      return s.map((a) => tu(t, a));
    }
    return n;
  },
  _p = (n) => (typeof n == 'string' ? n.replace(' ', 'T') : n),
  Ni = (n) => {
    let t = new URL(n);
    return (
      (t.protocol = t.protocol.replace(/^ws/i, 'http')),
      (t.pathname = t.pathname
        .replace(/\/+$/, '')
        .replace(/\/socket\/websocket$/i, '')
        .replace(/\/socket$/i, '')
        .replace(/\/websocket$/i, '')),
      t.pathname === '' || t.pathname === '/'
        ? (t.pathname = '/api/broadcast')
        : (t.pathname = t.pathname + '/api/broadcast'),
      t.href
    );
  };
var mr = (n) =>
    typeof n == 'function'
      ? n
      : function () {
          return n;
        },
  Ep = typeof self < 'u' ? self : null,
  mn = typeof window < 'u' ? window : null,
  Me$1 = Ep || mn || globalThis,
  Sp = '2.0.0',
  Dp = 1e4,
  Tp = 1e3,
  Ne = { connecting: 0, open: 1, closing: 2, closed: 3 },
  oe = {
    closed: 'closed',
    errored: 'errored',
    joined: 'joined',
    joining: 'joining',
    leaving: 'leaving',
  },
  Ke = {
    close: 'phx_close',
    error: 'phx_error',
    join: 'phx_join',
    reply: 'phx_reply',
    leave: 'phx_leave',
  },
  jo = { longpoll: 'longpoll', websocket: 'websocket' },
  Cp = { complete: 4 },
  Bo = 'base64url.bearer.phx.',
  Li = class {
    constructor(n, t, e, r) {
      ((this.channel = n),
        (this.event = t),
        (this.payload =
          e ||
          function () {
            return {};
          }),
        (this.receivedResp = null),
        (this.timeout = r),
        (this.timeoutTimer = null),
        (this.recHooks = []),
        (this.sent = false),
        (this.ref = void 0));
    }
    resend(n) {
      ((this.timeout = n), this.reset(), this.send());
    }
    send() {
      this.hasReceived('timeout') ||
        (this.startTimeout(),
        (this.sent = true),
        this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload(),
          ref: this.ref,
          join_ref: this.channel.joinRef(),
        }));
    }
    receive(n, t) {
      return (
        this.hasReceived(n) && t(this.receivedResp.response),
        this.recHooks.push({ status: n, callback: t }),
        this
      );
    }
    reset() {
      (this.cancelRefEvent(),
        (this.ref = null),
        (this.refEvent = null),
        (this.receivedResp = null),
        (this.sent = false));
    }
    destroy() {
      (this.cancelRefEvent(), this.cancelTimeout());
    }
    matchReceive({ status: n, response: t, _ref: e }) {
      this.recHooks.filter((r) => r.status === n).forEach((r) => r.callback(t));
    }
    cancelRefEvent() {
      this.refEvent && this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      (clearTimeout(this.timeoutTimer), (this.timeoutTimer = null));
    }
    startTimeout() {
      (this.timeoutTimer && this.cancelTimeout(),
        (this.ref = this.channel.socket.makeRef()),
        (this.refEvent = this.channel.replyEventName(this.ref)),
        this.channel.on(this.refEvent, (n) => {
          (this.cancelRefEvent(),
            this.cancelTimeout(),
            (this.receivedResp = n),
            this.matchReceive(n));
        }),
        (this.timeoutTimer = setTimeout(() => {
          this.trigger('timeout', {});
        }, this.timeout)));
    }
    hasReceived(n) {
      return this.receivedResp && this.receivedResp.status === n;
    }
    trigger(n, t) {
      this.channel.trigger(this.refEvent, { status: n, response: t });
    }
  },
  nu = class {
    constructor(n, t) {
      ((this.callback = n), (this.timerCalc = t), (this.timer = void 0), (this.tries = 0));
    }
    reset() {
      ((this.tries = 0), clearTimeout(this.timer));
    }
    scheduleTimeout() {
      (clearTimeout(this.timer),
        (this.timer = setTimeout(
          () => {
            ((this.tries = this.tries + 1), this.callback());
          },
          this.timerCalc(this.tries + 1),
        )));
    }
  },
  Rp = class {
    constructor(n, t, e) {
      ((this.state = oe.closed),
        (this.topic = n),
        (this.params = mr(t || {})),
        (this.socket = e),
        (this.bindings = []),
        (this.bindingRef = 0),
        (this.timeout = this.socket.timeout),
        (this.joinedOnce = false),
        (this.joinPush = new Li(this, Ke.join, this.params, this.timeout)),
        (this.pushBuffer = []),
        (this.stateChangeRefs = []),
        (this.rejoinTimer = new nu(() => {
          this.socket.isConnected() && this.rejoin();
        }, this.socket.rejoinAfterMs)),
        this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())),
        this.stateChangeRefs.push(
          this.socket.onOpen(() => {
            (this.rejoinTimer.reset(), this.isErrored() && this.rejoin());
          }),
        ),
        this.joinPush.receive('ok', () => {
          ((this.state = oe.joined),
            this.rejoinTimer.reset(),
            this.pushBuffer.forEach((r) => r.send()),
            (this.pushBuffer = []));
        }),
        this.joinPush.receive('error', (r) => {
          ((this.state = oe.errored),
            this.socket.hasLogger() && this.socket.log('channel', `error ${this.topic}`, r),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.onClose(() => {
          (this.rejoinTimer.reset(),
            this.socket.hasLogger() && this.socket.log('channel', `close ${this.topic}`),
            (this.state = oe.closed),
            this.socket.remove(this));
        }),
        this.onError((r) => {
          (this.socket.hasLogger() && this.socket.log('channel', `error ${this.topic}`, r),
            this.isJoining() && this.joinPush.reset(),
            (this.state = oe.errored),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.joinPush.receive('timeout', () => {
          (this.socket.hasLogger() &&
            this.socket.log('channel', `timeout ${this.topic}`, this.joinPush.timeout),
            new Li(this, Ke.leave, mr({}), this.timeout).send(),
            (this.state = oe.errored),
            this.joinPush.reset(),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.on(Ke.reply, (r, i) => {
          this.trigger(this.replyEventName(i), r);
        }));
    }
    join(n = this.timeout) {
      if (this.joinedOnce)
        throw new Error(
          "tried to join multiple times. 'join' can only be called a single time per channel instance",
        );
      return ((this.timeout = n), (this.joinedOnce = true), this.rejoin(), this.joinPush);
    }
    teardown() {
      (this.pushBuffer.forEach((n) => n.destroy()),
        (this.pushBuffer = []),
        this.rejoinTimer.reset(),
        this.joinPush.destroy(),
        (this.state = oe.closed),
        (this.bindings = []));
    }
    onClose(n) {
      this.on(Ke.close, n);
    }
    onError(n) {
      return this.on(Ke.error, (t) => n(t));
    }
    on(n, t) {
      let e = this.bindingRef++;
      return (this.bindings.push({ event: n, ref: e, callback: t }), e);
    }
    off(n, t) {
      this.bindings = this.bindings.filter(
        (e) => !(e.event === n && (typeof t > 'u' || t === e.ref)),
      );
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(n, t, e = this.timeout) {
      if (((t = t || {}), !this.joinedOnce))
        throw new Error(
          `tried to push '${n}' to '${this.topic}' before joining. Use channel.join() before pushing events`,
        );
      let r = new Li(
        this,
        n,
        function () {
          return t;
        },
        e,
      );
      return (this.canPush() ? r.send() : (r.startTimeout(), this.pushBuffer.push(r)), r);
    }
    leave(n = this.timeout) {
      (this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), (this.state = oe.leaving));
      let t = () => {
          (this.socket.hasLogger() && this.socket.log('channel', `leave ${this.topic}`),
            this.trigger(Ke.close, 'leave'));
        },
        e = new Li(this, Ke.leave, mr({}), n);
      return (
        e.receive('ok', () => t()).receive('timeout', () => t()),
        e.send(),
        this.canPush() || e.trigger('ok', {}),
        e
      );
    }
    onMessage(n, t, e) {
      return t;
    }
    filterBindings(n, t, e) {
      return true;
    }
    isMember(n, t, e, r) {
      return this.topic !== n
        ? false
        : r && r !== this.joinRef()
          ? (this.socket.hasLogger() &&
              this.socket.log('channel', 'dropping outdated message', {
                topic: n,
                event: t,
                payload: e,
                joinRef: r,
              }),
            false)
          : true;
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(n = this.timeout) {
      this.isLeaving() ||
        (this.socket.leaveOpenTopic(this.topic),
        (this.state = oe.joining),
        this.joinPush.resend(n));
    }
    trigger(n, t, e, r) {
      let i = this.onMessage(n, t, e, r);
      if (t && !i)
        throw new Error(
          'channel onMessage callbacks must return the payload, modified or unmodified',
        );
      let s = this.bindings.filter((o) => o.event === n && this.filterBindings(o, t, e));
      for (let o = 0; o < s.length; o++) s[o].callback(i, e, r || this.joinRef());
    }
    replyEventName(n) {
      return `chan_reply_${n}`;
    }
    isClosed() {
      return this.state === oe.closed;
    }
    isErrored() {
      return this.state === oe.errored;
    }
    isJoined() {
      return this.state === oe.joined;
    }
    isJoining() {
      return this.state === oe.joining;
    }
    isLeaving() {
      return this.state === oe.leaving;
    }
  },
  Ui = class {
    static request(n, t, e, r, i, s, o) {
      if (Me$1.XDomainRequest) {
        let a = new Me$1.XDomainRequest();
        return this.xdomainRequest(a, n, t, r, i, s, o);
      } else if (Me$1.XMLHttpRequest) {
        let a = new Me$1.XMLHttpRequest();
        return this.xhrRequest(a, n, t, e, r, i, s, o);
      } else {
        if (Me$1.fetch && Me$1.AbortController) return this.fetchRequest(n, t, e, r, i, s, o);
        throw new Error('No suitable XMLHttpRequest implementation found');
      }
    }
    static fetchRequest(n, t, e, r, i, s, o) {
      let a = { method: n, headers: e, body: r },
        c = null;
      if (i) {
        c = new AbortController();
        setTimeout(() => c.abort(), i);
        a.signal = c.signal;
      }
      return (
        Me$1.fetch(t, a)
          .then((l) => l.text())
          .then((l) => this.parseJSON(l))
          .then((l) => o && o(l))
          .catch((l) => {
            l.name === 'AbortError' && s ? s() : o && o(null);
          }),
        c
      );
    }
    static xdomainRequest(n, t, e, r, i, s, o) {
      return (
        (n.timeout = i),
        n.open(t, e),
        (n.onload = () => {
          let a = this.parseJSON(n.responseText);
          o && o(a);
        }),
        s && (n.ontimeout = s),
        (n.onprogress = () => {}),
        n.send(r),
        n
      );
    }
    static xhrRequest(n, t, e, r, i, s, o, a) {
      (n.open(t, e, true), (n.timeout = s));
      for (let [c, l] of Object.entries(r)) n.setRequestHeader(c, l);
      return (
        (n.onerror = () => a && a(null)),
        (n.onreadystatechange = () => {
          if (n.readyState === Cp.complete && a) {
            let c = this.parseJSON(n.responseText);
            a(c);
          }
        }),
        o && (n.ontimeout = o),
        n.send(i),
        n
      );
    }
    static parseJSON(n) {
      if (!n || n === '') return null;
      try {
        return JSON.parse(n);
      } catch {
        return (console && console.log('failed to parse JSON response', n), null);
      }
    }
    static serialize(n, t) {
      let e = [];
      for (var r in n) {
        if (!Object.prototype.hasOwnProperty.call(n, r)) continue;
        let i = t ? `${t}[${r}]` : r,
          s = n[r];
        typeof s == 'object'
          ? e.push(this.serialize(s, i))
          : e.push(encodeURIComponent(i) + '=' + encodeURIComponent(s));
      }
      return e.join('&');
    }
    static appendParams(n, t) {
      if (Object.keys(t).length === 0) return n;
      let e = n.match(/\?/) ? '&' : '?';
      return `${n}${e}${this.serialize(t)}`;
    }
  },
  Ap = (n) => {
    let t = '',
      e = new Uint8Array(n),
      r = e.byteLength;
    for (let i = 0; i < r; i++) t += String.fromCharCode(e[i]);
    return btoa(t);
  },
  pn = class {
    constructor(n, t) {
      (t && t.length === 2 && t[1].startsWith(Bo) && (this.authToken = atob(t[1].slice(Bo.length))),
        (this.endPoint = null),
        (this.token = null),
        (this.skipHeartbeat = true),
        (this.reqs = new Set()),
        (this.awaitingBatchAck = false),
        (this.currentBatch = null),
        (this.currentBatchTimer = null),
        (this.batchBuffer = []),
        (this.onopen = function () {}),
        (this.onerror = function () {}),
        (this.onmessage = function () {}),
        (this.onclose = function () {}),
        (this.pollEndpoint = this.normalizeEndpoint(n)),
        (this.readyState = Ne.connecting),
        setTimeout(() => this.poll(), 0));
    }
    normalizeEndpoint(n) {
      return n
        .replace('ws://', 'http://')
        .replace('wss://', 'https://')
        .replace(new RegExp('(.*)/' + jo.websocket), '$1/' + jo.longpoll);
    }
    endpointURL() {
      return Ui.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(n, t, e) {
      (this.close(n, t, e), (this.readyState = Ne.connecting));
    }
    ontimeout() {
      (this.onerror('timeout'), this.closeAndRetry(1005, 'timeout', false));
    }
    isActive() {
      return this.readyState === Ne.open || this.readyState === Ne.connecting;
    }
    poll() {
      let n = { Accept: 'application/json' };
      (this.authToken && (n['X-Phoenix-AuthToken'] = this.authToken),
        this.ajax(
          'GET',
          n,
          null,
          () => this.ontimeout(),
          (t) => {
            if (t) {
              var { status: e, token: r, messages: i } = t;
              if (e === 410 && this.token !== null) {
                (this.onerror(410), this.closeAndRetry(3410, 'session_gone', false));
                return;
              }
              this.token = r;
            } else e = 0;
            switch (e) {
              case 200:
                (i.forEach((s) => {
                  setTimeout(() => this.onmessage({ data: s }), 0);
                }),
                  this.poll());
                break;
              case 204:
                this.poll();
                break;
              case 410:
                ((this.readyState = Ne.open), this.onopen({}), this.poll());
                break;
              case 403:
                (this.onerror(403), this.close(1008, 'forbidden', false));
                break;
              case 0:
              case 500:
                (this.onerror(500), this.closeAndRetry(1011, 'internal server error', 500));
                break;
              default:
                throw new Error(`unhandled poll status ${e}`);
            }
          },
        ));
    }
    send(n) {
      (typeof n != 'string' && (n = Ap(n)),
        this.currentBatch
          ? this.currentBatch.push(n)
          : this.awaitingBatchAck
            ? this.batchBuffer.push(n)
            : ((this.currentBatch = [n]),
              (this.currentBatchTimer = setTimeout(() => {
                (this.batchSend(this.currentBatch), (this.currentBatch = null));
              }, 0))));
    }
    batchSend(n) {
      ((this.awaitingBatchAck = true),
        this.ajax(
          'POST',
          { 'Content-Type': 'application/x-ndjson' },
          n.join(`
`),
          () => this.onerror('timeout'),
          (t) => {
            ((this.awaitingBatchAck = false),
              !t || t.status !== 200
                ? (this.onerror(t && t.status),
                  this.closeAndRetry(1011, 'internal server error', false))
                : this.batchBuffer.length > 0 &&
                  (this.batchSend(this.batchBuffer), (this.batchBuffer = [])));
          },
        ));
    }
    close(n, t, e) {
      for (let i of this.reqs) i.abort();
      this.readyState = Ne.closed;
      let r = Object.assign(
        { code: 1e3, reason: void 0, wasClean: true },
        { code: n, reason: t, wasClean: e },
      );
      ((this.batchBuffer = []),
        clearTimeout(this.currentBatchTimer),
        (this.currentBatchTimer = null),
        typeof CloseEvent < 'u' ? this.onclose(new CloseEvent('close', r)) : this.onclose(r));
    }
    ajax(n, t, e, r, i) {
      let s,
        o = () => {
          (this.reqs.delete(s), r());
        };
      ((s = Ui.request(n, this.endpointURL(), t, e, this.timeout, o, (a) => {
        (this.reqs.delete(s), this.isActive() && i(a));
      })),
        this.reqs.add(s));
    }
  },
  ru = class pr {
    constructor(t, e = {}) {
      let r = e.events || { state: 'presence_state', diff: 'presence_diff' };
      ((this.state = {}),
        (this.pendingDiffs = []),
        (this.channel = t),
        (this.joinRef = null),
        (this.caller = { onJoin: function () {}, onLeave: function () {}, onSync: function () {} }),
        this.channel.on(r.state, (i) => {
          let { onJoin: s, onLeave: o, onSync: a } = this.caller;
          ((this.joinRef = this.channel.joinRef()),
            (this.state = pr.syncState(this.state, i, s, o)),
            this.pendingDiffs.forEach((c) => {
              this.state = pr.syncDiff(this.state, c, s, o);
            }),
            (this.pendingDiffs = []),
            a());
        }),
        this.channel.on(r.diff, (i) => {
          let { onJoin: s, onLeave: o, onSync: a } = this.caller;
          this.inPendingSyncState()
            ? this.pendingDiffs.push(i)
            : ((this.state = pr.syncDiff(this.state, i, s, o)), a());
        }));
    }
    onJoin(t) {
      this.caller.onJoin = t;
    }
    onLeave(t) {
      this.caller.onLeave = t;
    }
    onSync(t) {
      this.caller.onSync = t;
    }
    list(t) {
      return pr.list(this.state, t);
    }
    inPendingSyncState() {
      return !this.joinRef || this.joinRef !== this.channel.joinRef();
    }
    static syncState(t, e, r, i) {
      let s = this.clone(t),
        o = {},
        a = {};
      return (
        this.map(s, (c, l) => {
          e[c] || (a[c] = l);
        }),
        this.map(e, (c, l) => {
          let u = s[c];
          if (u) {
            let d = l.metas.map((g) => g.phx_ref),
              h = u.metas.map((g) => g.phx_ref),
              f = l.metas.filter((g) => h.indexOf(g.phx_ref) < 0),
              p = u.metas.filter((g) => d.indexOf(g.phx_ref) < 0);
            (f.length > 0 && ((o[c] = l), (o[c].metas = f)),
              p.length > 0 && ((a[c] = this.clone(u)), (a[c].metas = p)));
          } else o[c] = l;
        }),
        this.syncDiff(s, { joins: o, leaves: a }, r, i)
      );
    }
    static syncDiff(t, e, r, i) {
      let { joins: s, leaves: o } = this.clone(e);
      return (
        r || (r = function () {}),
        i || (i = function () {}),
        this.map(s, (a, c) => {
          let l = t[a];
          if (((t[a] = this.clone(c)), l)) {
            let u = t[a].metas.map((h) => h.phx_ref),
              d = l.metas.filter((h) => u.indexOf(h.phx_ref) < 0);
            t[a].metas.unshift(...d);
          }
          r(a, l, c);
        }),
        this.map(o, (a, c) => {
          let l = t[a];
          if (!l) return;
          let u = c.metas.map((d) => d.phx_ref);
          ((l.metas = l.metas.filter((d) => u.indexOf(d.phx_ref) < 0)),
            i(a, l, c),
            l.metas.length === 0 && delete t[a]);
        }),
        t
      );
    }
    static list(t, e) {
      return (
        e ||
          (e = function (r, i) {
            return i;
          }),
        this.map(t, (r, i) => e(r, i))
      );
    }
    static map(t, e) {
      return Object.getOwnPropertyNames(t).map((r) => e(r, t[r]));
    }
    static clone(t) {
      return JSON.parse(JSON.stringify(t));
    }
  },
  Fi = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(n, t) {
      if (n.payload.constructor === ArrayBuffer) return t(this.binaryEncode(n));
      {
        let e = [n.join_ref, n.ref, n.topic, n.event, n.payload];
        return t(JSON.stringify(e));
      }
    },
    decode(n, t) {
      if (n.constructor === ArrayBuffer) return t(this.binaryDecode(n));
      {
        let [e, r, i, s, o] = JSON.parse(n);
        return t({ join_ref: e, ref: r, topic: i, event: s, payload: o });
      }
    },
    binaryEncode(n) {
      let { join_ref: t, ref: e, event: r, topic: i, payload: s } = n,
        o = this.META_LENGTH + t.length + e.length + i.length + r.length,
        a = new ArrayBuffer(this.HEADER_LENGTH + o),
        c = new DataView(a),
        l = 0;
      (c.setUint8(l++, this.KINDS.push),
        c.setUint8(l++, t.length),
        c.setUint8(l++, e.length),
        c.setUint8(l++, i.length),
        c.setUint8(l++, r.length),
        Array.from(t, (d) => c.setUint8(l++, d.charCodeAt(0))),
        Array.from(e, (d) => c.setUint8(l++, d.charCodeAt(0))),
        Array.from(i, (d) => c.setUint8(l++, d.charCodeAt(0))),
        Array.from(r, (d) => c.setUint8(l++, d.charCodeAt(0))));
      var u = new Uint8Array(a.byteLength + s.byteLength);
      return (u.set(new Uint8Array(a), 0), u.set(new Uint8Array(s), a.byteLength), u.buffer);
    },
    binaryDecode(n) {
      let t = new DataView(n),
        e = t.getUint8(0),
        r = new TextDecoder();
      switch (e) {
        case this.KINDS.push:
          return this.decodePush(n, t, r);
        case this.KINDS.reply:
          return this.decodeReply(n, t, r);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(n, t, r);
      }
    },
    decodePush(n, t, e) {
      let r = t.getUint8(1),
        i = t.getUint8(2),
        s = t.getUint8(3),
        o = this.HEADER_LENGTH + this.META_LENGTH - 1,
        a = e.decode(n.slice(o, o + r));
      o = o + r;
      let c = e.decode(n.slice(o, o + i));
      o = o + i;
      let l = e.decode(n.slice(o, o + s));
      o = o + s;
      let u = n.slice(o, n.byteLength);
      return { join_ref: a, ref: null, topic: c, event: l, payload: u };
    },
    decodeReply(n, t, e) {
      let r = t.getUint8(1),
        i = t.getUint8(2),
        s = t.getUint8(3),
        o = t.getUint8(4),
        a = this.HEADER_LENGTH + this.META_LENGTH,
        c = e.decode(n.slice(a, a + r));
      a = a + r;
      let l = e.decode(n.slice(a, a + i));
      a = a + i;
      let u = e.decode(n.slice(a, a + s));
      a = a + s;
      let d = e.decode(n.slice(a, a + o));
      a = a + o;
      let h = n.slice(a, n.byteLength),
        f = { status: d, response: h };
      return { join_ref: c, ref: l, topic: u, event: Ke.reply, payload: f };
    },
    decodeBroadcast(n, t, e) {
      let r = t.getUint8(1),
        i = t.getUint8(2),
        s = this.HEADER_LENGTH + 2,
        o = e.decode(n.slice(s, s + r));
      s = s + r;
      let a = e.decode(n.slice(s, s + i));
      s = s + i;
      let c = n.slice(s, n.byteLength);
      return { join_ref: null, ref: null, topic: o, event: a, payload: c };
    },
  },
  iu = class {
    constructor(n, t = {}) {
      ((this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }),
        (this.channels = []),
        (this.sendBuffer = []),
        (this.ref = 0),
        (this.fallbackRef = null),
        (this.timeout = t.timeout || Dp),
        (this.transport = t.transport || Me$1.WebSocket || pn),
        (this.conn = void 0),
        (this.primaryPassedHealthCheck = false),
        (this.longPollFallbackMs = t.longPollFallbackMs),
        (this.fallbackTimer = null));
      let e = null;
      try {
        e = Me$1 && Me$1.sessionStorage;
      } catch {}
      ((this.sessionStore = t.sessionStorage || e),
        (this.establishedConnections = 0),
        (this.defaultEncoder = Fi.encode.bind(Fi)),
        (this.defaultDecoder = Fi.decode.bind(Fi)),
        (this.closeWasClean = true),
        (this.disconnecting = false),
        (this.binaryType = t.binaryType || 'arraybuffer'),
        (this.connectClock = 1),
        (this.pageHidden = false),
        (this.encode = void 0),
        (this.decode = void 0),
        this.transport !== pn
          ? ((this.encode = t.encode || this.defaultEncoder),
            (this.decode = t.decode || this.defaultDecoder))
          : ((this.encode = this.defaultEncoder), (this.decode = this.defaultDecoder)));
      let r = null;
      (mn &&
        mn.addEventListener &&
        (mn.addEventListener('pagehide', (i) => {
          this.conn && (this.disconnect(), (r = this.connectClock));
        }),
        mn.addEventListener('pageshow', (i) => {
          r === this.connectClock && ((r = null), this.connect());
        }),
        mn.addEventListener('visibilitychange', () => {
          document.visibilityState === 'hidden'
            ? (this.pageHidden = true)
            : ((this.pageHidden = false),
              !this.isConnected() && !this.closeWasClean && this.teardown(() => this.connect()));
        })),
        (this.heartbeatIntervalMs = t.heartbeatIntervalMs || 3e4),
        (this.autoSendHeartbeat = t.autoSendHeartbeat ?? true),
        (this.heartbeatCallback = t.heartbeatCallback ?? (() => {})),
        (this.rejoinAfterMs = (i) =>
          t.rejoinAfterMs ? t.rejoinAfterMs(i) : [1e3, 2e3, 5e3][i - 1] || 1e4),
        (this.reconnectAfterMs = (i) =>
          t.reconnectAfterMs
            ? t.reconnectAfterMs(i)
            : [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][i - 1] || 5e3),
        (this.logger = t.logger || null),
        !this.logger &&
          t.debug &&
          (this.logger = (i, s, o) => {
            console.log(`${i}: ${s}`, o);
          }),
        (this.longpollerTimeout = t.longpollerTimeout || 2e4),
        (this.params = mr(t.params || {})),
        (this.endPoint = `${n}/${jo.websocket}`),
        (this.vsn = t.vsn || Sp),
        (this.heartbeatTimeoutTimer = null),
        (this.heartbeatTimer = null),
        (this.heartbeatSentAt = null),
        (this.pendingHeartbeatRef = null),
        (this.reconnectTimer = new nu(() => {
          if (this.pageHidden) {
            (this.log('Not reconnecting as page is hidden!'), this.teardown());
            return;
          }
          this.teardown(async () => {
            (t.beforeReconnect && (await t.beforeReconnect()), this.connect());
          });
        }, this.reconnectAfterMs)),
        (this.authToken = t.authToken));
    }
    getLongPollTransport() {
      return pn;
    }
    replaceTransport(n) {
      (this.connectClock++,
        (this.closeWasClean = true),
        clearTimeout(this.fallbackTimer),
        this.reconnectTimer.reset(),
        this.conn && (this.conn.close(), (this.conn = null)),
        (this.transport = n));
    }
    protocol() {
      return location.protocol.match(/^https/) ? 'wss' : 'ws';
    }
    endPointURL() {
      let n = Ui.appendParams(Ui.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      return n.charAt(0) !== '/'
        ? n
        : n.charAt(1) === '/'
          ? `${this.protocol()}:${n}`
          : `${this.protocol()}://${location.host}${n}`;
    }
    disconnect(n, t, e) {
      (this.connectClock++,
        (this.disconnecting = true),
        (this.closeWasClean = true),
        clearTimeout(this.fallbackTimer),
        this.reconnectTimer.reset(),
        this.teardown(
          () => {
            ((this.disconnecting = false), n && n());
          },
          t,
          e,
        ));
    }
    connect(n) {
      (n &&
        (console &&
          console.log(
            'passing params to connect is deprecated. Instead pass :params to the Socket constructor',
          ),
        (this.params = mr(n))),
        !(this.conn && !this.disconnecting) &&
          (this.longPollFallbackMs && this.transport !== pn
            ? this.connectWithFallback(pn, this.longPollFallbackMs)
            : this.transportConnect()));
    }
    log(n, t, e) {
      this.logger && this.logger(n, t, e);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(n) {
      let t = this.makeRef();
      return (this.stateChangeCallbacks.open.push([t, n]), t);
    }
    onClose(n) {
      let t = this.makeRef();
      return (this.stateChangeCallbacks.close.push([t, n]), t);
    }
    onError(n) {
      let t = this.makeRef();
      return (this.stateChangeCallbacks.error.push([t, n]), t);
    }
    onMessage(n) {
      let t = this.makeRef();
      return (this.stateChangeCallbacks.message.push([t, n]), t);
    }
    onHeartbeat(n) {
      this.heartbeatCallback = n;
    }
    ping(n) {
      if (!this.isConnected()) return false;
      let t = this.makeRef(),
        e = Date.now();
      this.push({ topic: 'phoenix', event: 'heartbeat', payload: {}, ref: t });
      let r = this.onMessage((i) => {
        i.ref === t && (this.off([r]), n(Date.now() - e));
      });
      return true;
    }
    transportName(n) {
      return n === pn ? 'LongPoll' : n.name;
    }
    transportConnect() {
      (this.connectClock++, (this.closeWasClean = false));
      let n;
      (this.authToken && (n = ['phoenix', `${Bo}${btoa(this.authToken).replace(/=/g, '')}`]),
        (this.conn = new this.transport(this.endPointURL(), n)),
        (this.conn.binaryType = this.binaryType),
        (this.conn.timeout = this.longpollerTimeout),
        (this.conn.onopen = () => this.onConnOpen()),
        (this.conn.onerror = (t) => this.onConnError(t)),
        (this.conn.onmessage = (t) => this.onConnMessage(t)),
        (this.conn.onclose = (t) => this.onConnClose(t)));
    }
    getSession(n) {
      return this.sessionStore && this.sessionStore.getItem(n);
    }
    storeSession(n, t) {
      this.sessionStore && this.sessionStore.setItem(n, t);
    }
    connectWithFallback(n, t = 2500) {
      clearTimeout(this.fallbackTimer);
      let e = false,
        r = true,
        i,
        s,
        o = this.transportName(n),
        a = (c) => {
          (this.log('transport', `falling back to ${o}...`, c),
            this.off([i, s]),
            (r = false),
            this.replaceTransport(n),
            this.transportConnect());
        };
      if (this.getSession(`phx:fallback:${o}`)) return a('memorized');
      ((this.fallbackTimer = setTimeout(a, t)),
        (s = this.onError((c) => {
          (this.log('transport', 'error', c), r && !e && (clearTimeout(this.fallbackTimer), a(c)));
        })),
        this.fallbackRef && this.off([this.fallbackRef]),
        (this.fallbackRef = this.onOpen(() => {
          if (((e = true), !r)) {
            let c = this.transportName(n);
            return (
              this.primaryPassedHealthCheck || this.storeSession(`phx:fallback:${c}`, 'true'),
              this.log('transport', `established ${c} fallback`)
            );
          }
          (clearTimeout(this.fallbackTimer),
            (this.fallbackTimer = setTimeout(a, t)),
            this.ping((c) => {
              (this.log('transport', 'connected to primary after', c),
                (this.primaryPassedHealthCheck = true),
                clearTimeout(this.fallbackTimer));
            }));
        })),
        this.transportConnect());
    }
    clearHeartbeats() {
      (clearTimeout(this.heartbeatTimer), clearTimeout(this.heartbeatTimeoutTimer));
    }
    onConnOpen() {
      (this.hasLogger() && this.log('transport', `connected to ${this.endPointURL()}`),
        (this.closeWasClean = false),
        (this.disconnecting = false),
        this.establishedConnections++,
        this.flushSendBuffer(),
        this.reconnectTimer.reset(),
        this.autoSendHeartbeat && this.resetHeartbeat(),
        this.triggerStateCallbacks('open'));
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        ((this.pendingHeartbeatRef = null),
          (this.heartbeatSentAt = null),
          this.hasLogger() &&
            this.log('transport', 'heartbeat timeout. Attempting to re-establish connection'));
        try {
          this.heartbeatCallback('timeout');
        } catch (n) {
          this.log('error', 'error in heartbeat callback', n);
        }
        (this.triggerChanError(new Error('heartbeat timeout')),
          (this.closeWasClean = false),
          this.teardown(() => this.reconnectTimer.scheduleTimeout(), Tp, 'heartbeat timeout'));
      }
    }
    resetHeartbeat() {
      (this.conn && this.conn.skipHeartbeat) ||
        ((this.pendingHeartbeatRef = null),
        this.clearHeartbeats(),
        (this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs)));
    }
    teardown(n, t, e) {
      if (!this.conn) return n && n();
      let r = this.conn;
      this.waitForBufferDone(r, () => {
        (t ? r.close(t, e || '') : r.close(),
          this.waitForSocketClosed(r, () => {
            (this.conn === r &&
              ((this.conn.onopen = function () {}),
              (this.conn.onerror = function () {}),
              (this.conn.onmessage = function () {}),
              (this.conn.onclose = function () {}),
              (this.conn = null)),
              n && n());
          }));
      });
    }
    waitForBufferDone(n, t, e = 1) {
      if (e === 5 || !n.bufferedAmount) {
        t();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(n, t, e + 1);
      }, 150 * e);
    }
    waitForSocketClosed(n, t, e = 1) {
      if (e === 5 || n.readyState === Ne.closed) {
        t();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(n, t, e + 1);
      }, 150 * e);
    }
    onConnClose(n) {
      (this.conn && (this.conn.onclose = () => {}),
        this.hasLogger() && this.log('transport', 'close', n),
        this.triggerChanError(n),
        this.clearHeartbeats(),
        this.closeWasClean || this.reconnectTimer.scheduleTimeout(),
        this.triggerStateCallbacks('close', n));
    }
    onConnError(n) {
      this.hasLogger() && this.log('transport', 'error', n);
      let t = this.transport,
        e = this.establishedConnections;
      (this.triggerStateCallbacks('error', n, t, e),
        (t === this.transport || e > 0) && this.triggerChanError(n));
    }
    triggerChanError(n) {
      this.channels.forEach((t) => {
        t.isErrored() || t.isLeaving() || t.isClosed() || t.trigger(Ke.error, n);
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case Ne.connecting:
          return 'connecting';
        case Ne.open:
          return 'open';
        case Ne.closing:
          return 'closing';
        default:
          return 'closed';
      }
    }
    isConnected() {
      return this.connectionState() === 'open';
    }
    remove(n) {
      (this.off(n.stateChangeRefs), (this.channels = this.channels.filter((t) => t !== n)));
    }
    off(n) {
      for (let t in this.stateChangeCallbacks)
        this.stateChangeCallbacks[t] = this.stateChangeCallbacks[t].filter(
          ([e]) => n.indexOf(e) === -1,
        );
    }
    channel(n, t = {}) {
      let e = new Rp(n, t, this);
      return (this.channels.push(e), e);
    }
    push(n) {
      if (this.hasLogger()) {
        let { topic: t, event: e, payload: r, ref: i, join_ref: s } = n;
        this.log('push', `${t} ${e} (${s}, ${i})`, r);
      }
      this.isConnected()
        ? this.encode(n, (t) => this.conn.send(t))
        : this.sendBuffer.push(() => this.encode(n, (t) => this.conn.send(t)));
    }
    makeRef() {
      let n = this.ref + 1;
      return (n === this.ref ? (this.ref = 0) : (this.ref = n), this.ref.toString());
    }
    sendHeartbeat() {
      if (!this.isConnected()) {
        try {
          this.heartbeatCallback('disconnected');
        } catch (n) {
          this.log('error', 'error in heartbeat callback', n);
        }
        return;
      }
      if (this.pendingHeartbeatRef) {
        this.heartbeatTimeout();
        return;
      }
      ((this.pendingHeartbeatRef = this.makeRef()),
        (this.heartbeatSentAt = Date.now()),
        this.push({
          topic: 'phoenix',
          event: 'heartbeat',
          payload: {},
          ref: this.pendingHeartbeatRef,
        }));
      try {
        this.heartbeatCallback('sent');
      } catch (n) {
        this.log('error', 'error in heartbeat callback', n);
      }
      this.heartbeatTimeoutTimer = setTimeout(
        () => this.heartbeatTimeout(),
        this.heartbeatIntervalMs,
      );
    }
    flushSendBuffer() {
      this.isConnected() &&
        this.sendBuffer.length > 0 &&
        (this.sendBuffer.forEach((n) => n()), (this.sendBuffer = []));
    }
    onConnMessage(n) {
      this.decode(n.data, (t) => {
        let { topic: e, event: r, payload: i, ref: s, join_ref: o } = t;
        if (s && s === this.pendingHeartbeatRef) {
          let a = this.heartbeatSentAt ? Date.now() - this.heartbeatSentAt : void 0;
          this.clearHeartbeats();
          try {
            this.heartbeatCallback(i.status === 'ok' ? 'ok' : 'error', a);
          } catch (c) {
            this.log('error', 'error in heartbeat callback', c);
          }
          ((this.pendingHeartbeatRef = null),
            (this.heartbeatSentAt = null),
            this.autoSendHeartbeat &&
              (this.heartbeatTimer = setTimeout(
                () => this.sendHeartbeat(),
                this.heartbeatIntervalMs,
              )));
        }
        this.hasLogger() &&
          this.log(
            'receive',
            `${i.status || ''} ${e} ${r} ${(s && '(' + s + ')') || ''}`.trim(),
            i,
          );
        for (let a = 0; a < this.channels.length; a++) {
          let c = this.channels[a];
          c.isMember(e, r, i, o) && c.trigger(r, i, s, o);
        }
        this.triggerStateCallbacks('message', t);
      });
    }
    triggerStateCallbacks(n, ...t) {
      try {
        this.stateChangeCallbacks[n].forEach(([e, r]) => {
          try {
            r(...t);
          } catch (i) {
            this.log('error', `error in ${n} callback`, i);
          }
        });
      } catch (e) {
        this.log('error', `error triggering ${n} callbacks`, e);
      }
    }
    leaveOpenTopic(n) {
      let t = this.channels.find((e) => e.topic === n && (e.isJoined() || e.isJoining()));
      t && (this.hasLogger() && this.log('transport', `leaving duplicate topic "${n}"`), t.leave());
    }
  };
var Bi = class n {
  constructor(t, e) {
    let r = kp(e);
    ((this.presence = new ru(t.getChannel(), r)),
      this.presence.onJoin((i, s, o) => {
        let a = n.onJoinPayload(i, s, o);
        t.getChannel().trigger('presence', a);
      }),
      this.presence.onLeave((i, s, o) => {
        let a = n.onLeavePayload(i, s, o);
        t.getChannel().trigger('presence', a);
      }),
      this.presence.onSync(() => {
        t.getChannel().trigger('presence', { event: 'sync' });
      }));
  }
  get state() {
    return n.transformState(this.presence.state);
  }
  static transformState(t) {
    return (
      (t = Ip(t)),
      Object.getOwnPropertyNames(t).reduce((e, r) => {
        let i = t[r];
        return ((e[r] = ji(i)), e);
      }, {})
    );
  }
  static onJoinPayload(t, e, r) {
    let i = su(e),
      s = ji(r);
    return { event: 'join', key: t, currentPresences: i, newPresences: s };
  }
  static onLeavePayload(t, e, r) {
    let i = su(e),
      s = ji(r);
    return { event: 'leave', key: t, currentPresences: i, leftPresences: s };
  }
};
function ji(n) {
  return n.metas.map(
    (t) => ((t.presence_ref = t.phx_ref), delete t.phx_ref, delete t.phx_ref_prev, t),
  );
}
function Ip(n) {
  return JSON.parse(JSON.stringify(n));
}
function kp(n) {
  return n?.events && { events: n.events };
}
function su(n) {
  return n?.metas ? ji(n) : [];
}
var gr = class {
  get state() {
    return this.presenceAdapter.state;
  }
  constructor(t, e) {
    ((this.channel = t), (this.presenceAdapter = new Bi(this.channel.channelAdapter, e)));
  }
};
function ou(n) {
  if (n instanceof Error) return n;
  if (typeof n == 'string') return new Error(n);
  if (n && typeof n == 'object') {
    let t = n;
    if (typeof t.code == 'number') {
      let e = typeof t.reason == 'string' && t.reason ? ` (${t.reason})` : '';
      return new Error(`socket closed: ${t.code}${e}`, { cause: n });
    }
    return new Error('channel error: transport failure', { cause: n });
  }
  return new Error('channel error: connection lost');
}
var $i = class {
  constructor(t, e, r) {
    let i = Op(r);
    ((this.channel = t.getSocket().channel(e, i)), (this.socket = t));
  }
  get state() {
    return this.channel.state;
  }
  set state(t) {
    this.channel.state = t;
  }
  get joinedOnce() {
    return this.channel.joinedOnce;
  }
  get joinPush() {
    return this.channel.joinPush;
  }
  get rejoinTimer() {
    return this.channel.rejoinTimer;
  }
  on(t, e) {
    return this.channel.on(t, e);
  }
  off(t, e) {
    this.channel.off(t, e);
  }
  subscribe(t) {
    return this.channel.join(t);
  }
  unsubscribe(t) {
    return this.channel.leave(t);
  }
  teardown() {
    this.channel.teardown();
  }
  onClose(t) {
    this.channel.onClose(t);
  }
  onError(t) {
    return this.channel.onError(t);
  }
  push(t, e, r) {
    let i;
    try {
      i = this.channel.push(t, e, r);
    } catch {
      throw new Error(
        `tried to push '${t}' to '${this.channel.topic}' before joining. Use channel.subscribe() before pushing events`,
      );
    }
    if (this.channel.pushBuffer.length > eu) {
      let s = this.channel.pushBuffer.shift();
      (s.cancelTimeout(),
        this.socket.log(
          'channel',
          `discarded push due to buffer overflow: ${s.event}`,
          s.payload(),
        ));
    }
    return i;
  }
  updateJoinPayload(t) {
    let e = this.channel.joinPush.payload();
    this.channel.joinPush.payload = () => Object.assign(Object.assign({}, e), t);
  }
  canPush() {
    return this.socket.isConnected() && this.state === Pe.joined;
  }
  isJoined() {
    return this.state === Pe.joined;
  }
  isJoining() {
    return this.state === Pe.joining;
  }
  isClosed() {
    return this.state === Pe.closed;
  }
  isLeaving() {
    return this.state === Pe.leaving;
  }
  updateFilterBindings(t) {
    this.channel.filterBindings = t;
  }
  updatePayloadTransform(t) {
    this.channel.onMessage = t;
  }
  getChannel() {
    return this.channel;
  }
};
function Op(n) {
  return {
    config: Object.assign(
      {
        broadcast: { ack: false, self: false },
        presence: { key: '', enabled: false },
        private: false,
      },
      n.config,
    ),
  };
}
var gn = (function (n) {
    return (
      (n.BROADCAST = 'broadcast'),
      (n.PRESENCE = 'presence'),
      (n.POSTGRES_CHANGES = 'postgres_changes'),
      (n.SYSTEM = 'system'),
      n
    );
  })(gn || {}),
  Je = (function (n) {
    return (
      (n.SUBSCRIBED = 'SUBSCRIBED'),
      (n.TIMED_OUT = 'TIMED_OUT'),
      (n.CLOSED = 'CLOSED'),
      (n.CHANNEL_ERROR = 'CHANNEL_ERROR'),
      n
    );
  })(Je || {});
var vr = class n {
  get state() {
    return this.channelAdapter.state;
  }
  set state(t) {
    this.channelAdapter.state = t;
  }
  get joinedOnce() {
    return this.channelAdapter.joinedOnce;
  }
  get timeout() {
    return this.socket.timeout;
  }
  get joinPush() {
    return this.channelAdapter.joinPush;
  }
  get rejoinTimer() {
    return this.channelAdapter.rejoinTimer;
  }
  constructor(t, e = { config: {} }, r) {
    var i, s;
    if (
      ((this.topic = t),
      (this.params = e),
      (this.socket = r),
      (this.bindings = {}),
      (this.subTopic = t.replace(/^realtime:/i, '')),
      (this.params.config = Object.assign(
        {
          broadcast: { ack: false, self: false },
          presence: { key: '', enabled: false },
          private: false,
        },
        e.config,
      )),
      (this.channelAdapter = new $i(this.socket.socketAdapter, t, this.params)),
      (this.presence = new gr(this)),
      this._onClose(() => {
        this.socket._remove(this);
      }),
      this._updateFilterTransform(),
      (this.broadcastEndpointURL = Ni(this.socket.socketAdapter.endPointURL())),
      (this.private = this.params.config.private || false),
      !this.private &&
        !(
          (s = (i = this.params.config) === null || i === void 0 ? void 0 : i.broadcast) === null ||
          s === void 0
        ) &&
        s.replay)
    )
      throw new Error(
        `tried to use replay on public channel '${this.topic}'. It must be a private channel.`,
      );
  }
  subscribe(t, e = this.timeout) {
    var r, i, s;
    if ((this.socket.isConnected() || this.socket.connect(), this.channelAdapter.isClosed())) {
      let {
          config: { broadcast: o, presence: a, private: c },
        } = this.params,
        l =
          (i =
            (r = this.bindings.postgres_changes) === null || r === void 0
              ? void 0
              : r.map((f) => f.filter)) !== null && i !== void 0
            ? i
            : [],
        u =
          (!!this.bindings[gn.PRESENCE] && this.bindings[gn.PRESENCE].length > 0) ||
          ((s = this.params.config.presence) === null || s === void 0 ? void 0 : s.enabled) ===
            true,
        d = {},
        h = {
          broadcast: o,
          presence: Object.assign(Object.assign({}, a), { enabled: u }),
          postgres_changes: l,
          private: c,
        };
      (this.socket.accessTokenValue && (d.access_token = this.socket.accessTokenValue),
        this._onError((f) => {
          t?.(Je.CHANNEL_ERROR, ou(f));
        }),
        this._onClose(() => t?.(Je.CLOSED)),
        this.updateJoinPayload(Object.assign({ config: h }, d)),
        this._updateFilterMessage(),
        this.channelAdapter
          .subscribe(e)
          .receive('ok', async ({ postgres_changes: f }) => {
            if ((this.socket._isManualToken() || this.socket.setAuth(), f === void 0)) {
              t?.(Je.SUBSCRIBED);
              return;
            }
            this._updatePostgresBindings(f, t);
          })
          .receive('error', (f) => {
            this.state = Pe.errored;
            let p = Object.values(f).join(', ') || 'error';
            t?.(Je.CHANNEL_ERROR, new Error(p, { cause: f }));
          })
          .receive('timeout', () => {
            t?.(Je.TIMED_OUT);
          }));
    }
    return this;
  }
  _updatePostgresBindings(t, e) {
    var r;
    let i = this.bindings.postgres_changes,
      s = (r = i?.length) !== null && r !== void 0 ? r : 0,
      o = [];
    for (let a = 0; a < s; a++) {
      let c = i[a],
        {
          filter: { event: l, schema: u, table: d, filter: h },
        } = c,
        f = t && t[a];
      if (
        f &&
        f.event === l &&
        n.isFilterValueEqual(f.schema, u) &&
        n.isFilterValueEqual(f.table, d) &&
        n.isFilterValueEqual(f.filter, h)
      )
        o.push(Object.assign(Object.assign({}, c), { id: f.id }));
      else {
        (this.unsubscribe(),
          (this.state = Pe.errored),
          e?.(
            Je.CHANNEL_ERROR,
            new Error('mismatch between server and client bindings for postgres changes'),
          ));
        return;
      }
    }
    ((this.bindings.postgres_changes = o), this.state != Pe.errored && e && e(Je.SUBSCRIBED));
  }
  presenceState() {
    return this.presence.state;
  }
  async track(t, e = {}) {
    return await this.send(
      { type: 'presence', event: 'track', payload: t },
      e.timeout || this.timeout,
    );
  }
  async untrack(t = {}) {
    return await this.send({ type: 'presence', event: 'untrack' }, t);
  }
  on(t, e, r) {
    let i = this.channelAdapter.isJoined() || this.channelAdapter.isJoining(),
      s = t === gn.PRESENCE || t === gn.POSTGRES_CHANGES;
    if (i && s)
      throw (
        this.socket.log(
          'channel',
          `cannot add \`${t}\` callbacks for ${this.topic} after \`subscribe()\`.`,
        ),
        new Error(`cannot add \`${t}\` callbacks for ${this.topic} after \`subscribe()\`.`)
      );
    return this._on(t, e, r);
  }
  async httpSend(t, e, r = {}) {
    var i;
    if (e == null) return Promise.reject(new Error('Payload is required for httpSend()'));
    let s = e instanceof ArrayBuffer || ArrayBuffer.isView(e),
      o = {
        apikey: this.socket.apiKey ? this.socket.apiKey : '',
        'Content-Type': s ? 'application/octet-stream' : 'application/json',
      };
    this.socket.accessTokenValue && (o.Authorization = `Bearer ${this.socket.accessTokenValue}`);
    let a = new URL(this.broadcastEndpointURL);
    ((a.pathname += `/${encodeURIComponent(this.subTopic)}/events/${encodeURIComponent(t)}`),
      this.private && a.searchParams.set('private', 'true'));
    let c = { method: 'POST', headers: o, body: s ? e : JSON.stringify(e) },
      l = await this._fetchWithTimeout(
        a.toString(),
        c,
        (i = r.timeout) !== null && i !== void 0 ? i : this.timeout,
      );
    if (l.status === 202) return { success: true };
    let u = l.statusText;
    try {
      let d = await l.json();
      u = d.error || d.message || u;
    } catch {}
    return Promise.reject(new Error(u));
  }
  async send(t, e = {}) {
    var r, i;
    if (!this.channelAdapter.canPush() && t.type === 'broadcast') {
      console.warn(
        'Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.',
      );
      let { event: s, payload: o } = t,
        a = {
          apikey: this.socket.apiKey ? this.socket.apiKey : '',
          'Content-Type': 'application/json',
        };
      this.socket.accessTokenValue && (a.Authorization = `Bearer ${this.socket.accessTokenValue}`);
      let c = {
        method: 'POST',
        headers: a,
        body: JSON.stringify({
          messages: [{ topic: this.subTopic, event: s, payload: o, private: this.private }],
        }),
      };
      try {
        let l = await this._fetchWithTimeout(
          this.broadcastEndpointURL,
          c,
          (r = e.timeout) !== null && r !== void 0 ? r : this.timeout,
        );
        return (
          await ((i = l.body) === null || i === void 0 ? void 0 : i.cancel()),
          l.ok ? 'ok' : 'error'
        );
      } catch (l) {
        return l instanceof Error && l.name === 'AbortError' ? 'timed out' : 'error';
      }
    } else
      return new Promise((s) => {
        var o, a, c;
        let l = this.channelAdapter.push(t.type, t, e.timeout || this.timeout);
        (t.type === 'broadcast' &&
          !(
            !(
              (c =
                (a = (o = this.params) === null || o === void 0 ? void 0 : o.config) === null ||
                a === void 0
                  ? void 0
                  : a.broadcast) === null || c === void 0
            ) && c.ack
          ) &&
          s('ok'),
          l.receive('ok', () => s('ok')),
          l.receive('error', () => s('error')),
          l.receive('timeout', () => s('timed out')));
      });
  }
  updateJoinPayload(t) {
    this.channelAdapter.updateJoinPayload(t);
  }
  async unsubscribe(t = this.timeout) {
    return new Promise((e) => {
      this.channelAdapter
        .unsubscribe(t)
        .receive('ok', () => e('ok'))
        .receive('timeout', () => e('timed out'))
        .receive('error', () => e('error'));
    });
  }
  teardown() {
    this.channelAdapter.teardown();
  }
  async _fetchWithTimeout(t, e, r) {
    let i = new AbortController(),
      s = setTimeout(() => i.abort(), r),
      o = await this.socket.fetch(t, Object.assign(Object.assign({}, e), { signal: i.signal }));
    return (clearTimeout(s), o);
  }
  _on(t, e, r) {
    let i = t.toLocaleLowerCase(),
      s = this.channelAdapter.on(t, r),
      o = { type: i, filter: e, callback: r, ref: s };
    return (
      this.bindings[i] ? this.bindings[i].push(o) : (this.bindings[i] = [o]),
      this._updateFilterMessage(),
      this
    );
  }
  _onClose(t) {
    this.channelAdapter.onClose(t);
  }
  _onError(t) {
    this.channelAdapter.onError(t);
  }
  _updateFilterMessage() {
    this.channelAdapter.updateFilterBindings((t, e, r) => {
      var i, s, o, a, c, l, u;
      let d = t.event.toLocaleLowerCase();
      if (this._notThisChannelEvent(d, r)) return false;
      let h =
        (i = this.bindings[d]) === null || i === void 0 ? void 0 : i.find((f) => f.ref === t.ref);
      if (!h) return true;
      if (['broadcast', 'presence', 'postgres_changes'].includes(d))
        if ('id' in h) {
          let f = h.id,
            p = (s = h.filter) === null || s === void 0 ? void 0 : s.event;
          return (
            f &&
            ((o = e.ids) === null || o === void 0 ? void 0 : o.includes(f)) &&
            (p === '*' ||
              p?.toLocaleLowerCase() ===
                ((a = e.data) === null || a === void 0 ? void 0 : a.type.toLocaleLowerCase()))
          );
        } else {
          let f =
            (l = (c = h?.filter) === null || c === void 0 ? void 0 : c.event) === null ||
            l === void 0
              ? void 0
              : l.toLocaleLowerCase();
          return (
            f === '*' ||
            f === ((u = e?.event) === null || u === void 0 ? void 0 : u.toLocaleLowerCase())
          );
        }
      else return h.type.toLocaleLowerCase() === d;
    });
  }
  _notThisChannelEvent(t, e) {
    let { close: r, error: i, leave: s, join: o } = Pi;
    return e && [r, i, s, o].includes(t) && e !== this.joinPush.ref;
  }
  _updateFilterTransform() {
    this.channelAdapter.updatePayloadTransform((t, e, r) => {
      if (typeof e == 'object' && 'ids' in e) {
        let i = e.data,
          { schema: s, table: o, commit_timestamp: a, type: c, errors: l } = i;
        return Object.assign(
          Object.assign(
            {},
            { schema: s, table: o, commit_timestamp: a, eventType: c, new: {}, old: {}, errors: l },
          ),
          this._getPayloadRecords(i),
        );
      }
      return e;
    });
  }
  copyBindings(t) {
    if (this.joinedOnce) throw new Error('cannot copy bindings into joined channel');
    for (let e in t.bindings) for (let r of t.bindings[e]) this._on(r.type, r.filter, r.callback);
  }
  static isFilterValueEqual(t, e) {
    return (t ?? void 0) === (e ?? void 0);
  }
  _getPayloadRecords(t) {
    let e = { new: {}, old: {} };
    return (
      (t.type === 'INSERT' || t.type === 'UPDATE') && (e.new = Uo(t.columns, t.record)),
      (t.type === 'UPDATE' || t.type === 'DELETE') && (e.old = Uo(t.columns, t.old_record)),
      e
    );
  }
};
var zi = class {
  constructor(t, e) {
    this.socket = new iu(t, e);
  }
  get timeout() {
    return this.socket.timeout;
  }
  get endPoint() {
    return this.socket.endPoint;
  }
  get transport() {
    return this.socket.transport;
  }
  get heartbeatIntervalMs() {
    return this.socket.heartbeatIntervalMs;
  }
  get heartbeatCallback() {
    return this.socket.heartbeatCallback;
  }
  set heartbeatCallback(t) {
    this.socket.heartbeatCallback = t;
  }
  get heartbeatTimer() {
    return this.socket.heartbeatTimer;
  }
  get pendingHeartbeatRef() {
    return this.socket.pendingHeartbeatRef;
  }
  get reconnectTimer() {
    return this.socket.reconnectTimer;
  }
  get vsn() {
    return this.socket.vsn;
  }
  get encode() {
    return this.socket.encode;
  }
  get decode() {
    return this.socket.decode;
  }
  get reconnectAfterMs() {
    return this.socket.reconnectAfterMs;
  }
  get sendBuffer() {
    return this.socket.sendBuffer;
  }
  get stateChangeCallbacks() {
    return this.socket.stateChangeCallbacks;
  }
  connect() {
    this.socket.connect();
  }
  disconnect(t, e, r, i = 1e4) {
    return new Promise((s) => {
      (setTimeout(() => s('timeout'), i),
        this.socket.disconnect(
          () => {
            (t(), s('ok'));
          },
          e,
          r,
        ));
    });
  }
  push(t) {
    this.socket.push(t);
  }
  log(t, e, r) {
    this.socket.log(t, e, r);
  }
  makeRef() {
    return this.socket.makeRef();
  }
  onOpen(t) {
    this.socket.onOpen(t);
  }
  onClose(t) {
    this.socket.onClose(t);
  }
  onError(t) {
    this.socket.onError(t);
  }
  onMessage(t) {
    this.socket.onMessage(t);
  }
  isConnected() {
    return this.socket.isConnected();
  }
  isConnecting() {
    return this.socket.connectionState() == fr.connecting;
  }
  isDisconnecting() {
    return this.socket.connectionState() == fr.closing;
  }
  connectionState() {
    return this.socket.connectionState();
  }
  endPointURL() {
    return this.socket.endPointURL();
  }
  sendHeartbeat() {
    this.socket.sendHeartbeat();
  }
  getSocket() {
    return this.socket;
  }
};
var au = { HEARTBEAT_INTERVAL: 25e3 },
  xp = [1e3, 2e3, 5e3, 1e4],
  Pp = 1e4;
function Mp() {
  let n = new Map();
  return {
    get length() {
      return n.size;
    },
    clear() {
      n.clear();
    },
    getItem(t) {
      return n.has(t) ? n.get(t) : null;
    },
    key(t) {
      var e;
      return (e = Array.from(n.keys())[t]) !== null && e !== void 0 ? e : null;
    },
    removeItem(t) {
      n.delete(t);
    },
    setItem(t, e) {
      n.set(t, String(e));
    },
  };
}
function Np() {
  try {
    if (typeof globalThis < 'u' && globalThis.sessionStorage) return globalThis.sessionStorage;
  } catch {}
  return Mp();
}
var Lp = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`,
  br = class {
    get endPoint() {
      return this.socketAdapter.endPoint;
    }
    get timeout() {
      return this.socketAdapter.timeout;
    }
    get transport() {
      return this.socketAdapter.transport;
    }
    get heartbeatCallback() {
      return this.socketAdapter.heartbeatCallback;
    }
    get heartbeatIntervalMs() {
      return this.socketAdapter.heartbeatIntervalMs;
    }
    get heartbeatTimer() {
      return this.worker ? this._workerHeartbeatTimer : this.socketAdapter.heartbeatTimer;
    }
    get pendingHeartbeatRef() {
      return this.worker ? this._pendingWorkerHeartbeatRef : this.socketAdapter.pendingHeartbeatRef;
    }
    get reconnectTimer() {
      return this.socketAdapter.reconnectTimer;
    }
    get vsn() {
      return this.socketAdapter.vsn;
    }
    get encode() {
      return this.socketAdapter.encode;
    }
    get decode() {
      return this.socketAdapter.decode;
    }
    get reconnectAfterMs() {
      return this.socketAdapter.reconnectAfterMs;
    }
    get sendBuffer() {
      return this.socketAdapter.sendBuffer;
    }
    get stateChangeCallbacks() {
      return this.socketAdapter.stateChangeCallbacks;
    }
    constructor(t, e) {
      var r;
      if (
        ((this.channels = new Array()),
        (this.accessTokenValue = null),
        (this.accessToken = null),
        (this.apiKey = null),
        (this.httpEndpoint = ''),
        (this.headers = {}),
        (this.params = {}),
        (this.ref = 0),
        (this.serializer = new Mi()),
        (this._manuallySetToken = false),
        (this._authPromise = null),
        (this._workerHeartbeatTimer = void 0),
        (this._pendingWorkerHeartbeatRef = null),
        (this._pendingDisconnectTimer = null),
        (this._disconnectOnEmptyChannelsAfterMs = 0),
        (this._resolveFetch = (s) => (s ? (...o) => s(...o) : (...o) => fetch(...o))),
        !(!((r = e?.params) === null || r === void 0) && r.apikey))
      )
        throw new Error('API key is required to connect to Realtime');
      this.apiKey = e.params.apikey;
      let i = this._initializeOptions(e);
      ((this.socketAdapter = new zi(t, i)),
        (this.httpEndpoint = Ni(t)),
        (this.fetch = this._resolveFetch(e?.fetch)));
    }
    connect() {
      if (!(this.isConnecting() || this.isDisconnecting() || this.isConnected())) {
        (this.accessToken && !this._authPromise && this._setAuthSafely('connect'),
          this._setupConnectionHandlers());
        try {
          this.socketAdapter.connect();
        } catch (t) {
          let e = t.message;
          throw e.includes('Node.js')
            ? new Error(`${e}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`)
            : new Error(`WebSocket not available: ${e}`);
        }
        this._handleNodeJsRaceCondition();
      }
    }
    endpointURL() {
      return this.socketAdapter.endPointURL();
    }
    async disconnect(t, e) {
      return (
        this._cancelPendingDisconnect(),
        this.isDisconnecting()
          ? 'ok'
          : await this.socketAdapter.disconnect(
              () => {
                (clearInterval(this._workerHeartbeatTimer), this._terminateWorker());
              },
              t,
              e,
            )
      );
    }
    getChannels() {
      return this.channels;
    }
    async removeChannel(t) {
      let e = await t.unsubscribe();
      return (e === 'ok' && t.teardown(), e);
    }
    async removeAllChannels() {
      let t = this.channels.map(async (r) => {
          let i = await r.unsubscribe();
          return (r.teardown(), i);
        }),
        e = await Promise.all(t);
      return (await this.disconnect(), e);
    }
    log(t, e, r) {
      this.socketAdapter.log(t, e, r);
    }
    connectionState() {
      return this.socketAdapter.connectionState() || fr.closed;
    }
    isConnected() {
      return this.socketAdapter.isConnected();
    }
    isConnecting() {
      return this.socketAdapter.isConnecting();
    }
    isDisconnecting() {
      return this.socketAdapter.isDisconnecting();
    }
    channel(t, e = { config: {} }) {
      let r = `realtime:${t}`,
        i = this.getChannels().find((s) => s.topic === r);
      if (i) return i;
      {
        let s = new vr(`realtime:${t}`, e, this);
        return (this._cancelPendingDisconnect(), this.channels.push(s), s);
      }
    }
    push(t) {
      this.socketAdapter.push(t);
    }
    async setAuth(t = null) {
      this._authPromise = this._performAuth(t);
      try {
        await this._authPromise;
      } finally {
        this._authPromise = null;
      }
    }
    _isManualToken() {
      return this._manuallySetToken;
    }
    async sendHeartbeat() {
      this.socketAdapter.sendHeartbeat();
    }
    onHeartbeat(t) {
      this.socketAdapter.heartbeatCallback = this._wrapHeartbeatCallback(t);
    }
    _makeRef() {
      return this.socketAdapter.makeRef();
    }
    _remove(t) {
      ((this.channels = this.channels.filter((e) => e.topic !== t.topic)),
        this.channels.length === 0 &&
          (this.log('transport', 'no channels remaining, scheduling disconnect'),
          this._schedulePendingDisconnect()));
    }
    _schedulePendingDisconnect() {
      if ((this._cancelPendingDisconnect(), this._disconnectOnEmptyChannelsAfterMs === 0)) {
        (this.log('transport', 'disconnecting immediately - no channels'), this.disconnect());
        return;
      }
      ((this._pendingDisconnectTimer = setTimeout(() => {
        ((this._pendingDisconnectTimer = null),
          this.channels.length === 0 &&
            (this.log('transport', 'deferred disconnect fired - no channels, disconnecting'),
            this.disconnect()));
      }, this._disconnectOnEmptyChannelsAfterMs)),
        this.log(
          'transport',
          `deferred disconnect scheduled in ${this._disconnectOnEmptyChannelsAfterMs}ms`,
        ));
    }
    _cancelPendingDisconnect() {
      this._pendingDisconnectTimer !== null &&
        (this.log('transport', 'pending disconnect cancelled - channel activity detected'),
        clearTimeout(this._pendingDisconnectTimer),
        (this._pendingDisconnectTimer = null));
    }
    async _performAuth(t = null) {
      let e,
        r = false;
      if (t) ((e = t), (r = true));
      else if (this.accessToken)
        try {
          e = await this.accessToken();
        } catch (i) {
          (this.log('error', 'Error fetching access token from callback', i),
            (e = this.accessTokenValue));
        }
      else e = this.accessTokenValue;
      (r ? (this._manuallySetToken = true) : this.accessToken && (this._manuallySetToken = false),
        this.accessTokenValue != e &&
          ((this.accessTokenValue = e),
          this.channels.forEach((i) => {
            let s = { access_token: e, version: Yl };
            (e && i.updateJoinPayload(s),
              i.joinedOnce &&
                i.channelAdapter.isJoined() &&
                i.channelAdapter.push(Pi.access_token, { access_token: e }));
          })));
    }
    async _waitForAuthIfNeeded() {
      this._authPromise && (await this._authPromise);
    }
    _setAuthSafely(t = 'general') {
      this._isManualToken() ||
        this.setAuth().catch((e) => {
          this.log('error', `Error setting auth in ${t}`, e);
        });
    }
    _setupConnectionHandlers() {
      (this.socketAdapter.onOpen(() => {
        ((
          this._authPromise ||
          (this.accessToken && !this.accessTokenValue ? this.setAuth() : Promise.resolve())
        ).catch((e) => {
          this.log('error', 'error waiting for auth on connect', e);
        }),
          this.worker && !this.workerRef && this._startWorkerHeartbeat());
      }),
        this.socketAdapter.onClose(() => {
          this.worker && this.workerRef && this._terminateWorker();
        }),
        this.socketAdapter.onMessage((t) => {
          t.ref &&
            t.ref === this._pendingWorkerHeartbeatRef &&
            (this._pendingWorkerHeartbeatRef = null);
        }));
    }
    _handleNodeJsRaceCondition() {
      this.socketAdapter.isConnected() && this.socketAdapter.getSocket().onConnOpen();
    }
    _wrapHeartbeatCallback(t) {
      return (e, r) => {
        (e == 'sent' && this._setAuthSafely(), t && t(e, r));
      };
    }
    _startWorkerHeartbeat() {
      this.workerUrl
        ? this.log('worker', `starting worker for from ${this.workerUrl}`)
        : this.log('worker', 'starting default worker');
      let t = this._workerObjectUrl(this.workerUrl);
      ((this.workerRef = new Worker(t)),
        (this.workerRef.onerror = (e) => {
          (this.log('worker', 'worker error', e.message),
            this._terminateWorker(),
            this.disconnect());
        }),
        (this.workerRef.onmessage = (e) => {
          e.data.event === 'keepAlive' && this.sendHeartbeat();
        }),
        this.workerRef.postMessage({ event: 'start', interval: this.heartbeatIntervalMs }));
    }
    _terminateWorker() {
      this.workerRef &&
        (this.log('worker', 'terminating worker'),
        this.workerRef.terminate(),
        (this.workerRef = void 0));
    }
    _workerObjectUrl(t) {
      let e;
      if (t) e = t;
      else {
        let r = new Blob([Lp], { type: 'application/javascript' });
        e = URL.createObjectURL(r);
      }
      return e;
    }
    _initializeOptions(t) {
      var e, r, i, s, o, a, c, l, u, d, h, f;
      ((this.worker = (e = t?.worker) !== null && e !== void 0 ? e : false),
        (this.accessToken = (r = t?.accessToken) !== null && r !== void 0 ? r : null));
      let p = {};
      ((p.timeout = (i = t?.timeout) !== null && i !== void 0 ? i : Ql),
        (p.heartbeatIntervalMs =
          (s = t?.heartbeatIntervalMs) !== null && s !== void 0 ? s : au.HEARTBEAT_INTERVAL),
        (this._disconnectOnEmptyChannelsAfterMs =
          (o = t?.disconnectOnEmptyChannelsAfterMs) !== null && o !== void 0
            ? o
            : 2 *
              ((a = t?.heartbeatIntervalMs) !== null && a !== void 0 ? a : au.HEARTBEAT_INTERVAL)),
        (p.transport =
          (c = t?.transport) !== null && c !== void 0 ? c : No.getWebSocketConstructor()),
        (p.params = t?.params),
        (p.logger = t?.logger),
        (p.heartbeatCallback = this._wrapHeartbeatCallback(t?.heartbeatCallback)),
        (p.sessionStorage = (l = t?.sessionStorage) !== null && l !== void 0 ? l : Np()),
        (p.reconnectAfterMs =
          (u = t?.reconnectAfterMs) !== null && u !== void 0 ? u : (D) => xp[D - 1] || Pp));
      let g,
        y,
        v = (d = t?.vsn) !== null && d !== void 0 ? d : Zl;
      switch (v) {
        case Xl:
          ((g = (D, w) => w(JSON.stringify(D))), (y = (D, w) => w(JSON.parse(D))));
          break;
        case Lo:
          ((g = this.serializer.encode.bind(this.serializer)),
            (y = this.serializer.decode.bind(this.serializer)));
          break;
        default:
          throw new Error(`Unsupported serializer version: ${p.vsn}`);
      }
      if (
        ((p.vsn = v),
        (p.encode = (h = t?.encode) !== null && h !== void 0 ? h : g),
        (p.decode = (f = t?.decode) !== null && f !== void 0 ? f : y),
        (p.beforeReconnect = this._reconnectAuth.bind(this)),
        (t?.logLevel || t?.log_level) &&
          ((this.logLevel = t.logLevel || t.log_level),
          (p.params = Object.assign(Object.assign({}, p.params), { log_level: this.logLevel }))),
        this.worker)
      ) {
        if (typeof window < 'u' && !window.Worker) throw new Error('Web Worker is not supported');
        ((this.workerUrl = t?.workerUrl), (p.autoSendHeartbeat = !this.worker));
      }
      return p;
    }
    async _reconnectAuth() {
      (await this._waitForAuthIfNeeded(), this.isConnected() || this.connect());
    }
  };
var yr = class extends Error {
  constructor(n, t) {
    (super(n),
      (this.name = 'IcebergError'),
      (this.status = t.status),
      (this.icebergType = t.icebergType),
      (this.icebergCode = t.icebergCode),
      (this.details = t.details),
      (this.isCommitStateUnknown =
        t.icebergType === 'CommitStateUnknownException' ||
        ([500, 502, 504].includes(t.status) && t.icebergType?.includes('CommitState') === true)));
  }
  isNotFound() {
    return this.status === 404;
  }
  isConflict() {
    return this.status === 409;
  }
  isAuthenticationTimeout() {
    return this.status === 419;
  }
};
function Fp(n, t, e) {
  let r = new URL(t, n);
  if (e) for (let [i, s] of Object.entries(e)) s !== void 0 && r.searchParams.set(i, s);
  return r.toString();
}
async function Up(n) {
  return !n || n.type === 'none'
    ? {}
    : n.type === 'bearer'
      ? { Authorization: `Bearer ${n.token}` }
      : n.type === 'header'
        ? { [n.name]: n.value }
        : n.type === 'custom'
          ? await n.getHeaders()
          : {};
}
function jp(n) {
  let t = n.fetchImpl ?? globalThis.fetch;
  return {
    async request({ method: e, path: r, query: i, body: s, headers: o }) {
      let a = Fp(n.baseUrl, r, i),
        c = await Up(n.auth),
        l = await t(a, {
          method: e,
          headers: j$1(j$1(j$1({}, s ? { 'Content-Type': 'application/json' } : {}), c), o),
          body: s ? JSON.stringify(s) : void 0,
        }),
        u = await l.text(),
        d = (l.headers.get('content-type') || '').includes('application/json'),
        h = d && u ? JSON.parse(u) : u;
      if (!l.ok) {
        let f = d ? h : void 0,
          p = f?.error;
        throw new yr(p?.message ?? `Request failed with status ${l.status}`, {
          status: l.status,
          icebergType: p?.type,
          icebergCode: p?.code,
          details: f,
        });
      }
      return { status: l.status, headers: l.headers, data: h };
    },
  };
}
function Hi(n) {
  return n.join('');
}
var Bp = class {
  constructor(n, t = '') {
    ((this.client = n), (this.prefix = t));
  }
  async listNamespaces(n) {
    let t = n ? { parent: Hi(n.namespace) } : void 0;
    return (
      await this.client.request({ method: 'GET', path: `${this.prefix}/namespaces`, query: t })
    ).data.namespaces.map((r) => ({ namespace: r }));
  }
  async createNamespace(n, t) {
    let e = { namespace: n.namespace, properties: t?.properties };
    return (
      await this.client.request({ method: 'POST', path: `${this.prefix}/namespaces`, body: e })
    ).data;
  }
  async dropNamespace(n) {
    await this.client.request({
      method: 'DELETE',
      path: `${this.prefix}/namespaces/${Hi(n.namespace)}`,
    });
  }
  async loadNamespaceMetadata(n) {
    return {
      properties: (
        await this.client.request({
          method: 'GET',
          path: `${this.prefix}/namespaces/${Hi(n.namespace)}`,
        })
      ).data.properties,
    };
  }
  async namespaceExists(n) {
    try {
      return (
        await this.client.request({
          method: 'HEAD',
          path: `${this.prefix}/namespaces/${Hi(n.namespace)}`,
        }),
        !0
      );
    } catch (t) {
      if (t instanceof yr && t.status === 404) return false;
      throw t;
    }
  }
  async createNamespaceIfNotExists(n, t) {
    try {
      return await this.createNamespace(n, t);
    } catch (e) {
      if (e instanceof yr && e.status === 409) return;
      throw e;
    }
  }
};
function vn(n) {
  return n.join('');
}
var $p = class {
    constructor(n, t = '', e) {
      ((this.client = n), (this.prefix = t), (this.accessDelegation = e));
    }
    async listTables(n) {
      return (
        await this.client.request({
          method: 'GET',
          path: `${this.prefix}/namespaces/${vn(n.namespace)}/tables`,
        })
      ).data.identifiers;
    }
    async createTable(n, t) {
      let e = {};
      return (
        this.accessDelegation && (e['X-Iceberg-Access-Delegation'] = this.accessDelegation),
        (
          await this.client.request({
            method: 'POST',
            path: `${this.prefix}/namespaces/${vn(n.namespace)}/tables`,
            body: t,
            headers: e,
          })
        ).data.metadata
      );
    }
    async updateTable(n, t) {
      let e = await this.client.request({
        method: 'POST',
        path: `${this.prefix}/namespaces/${vn(n.namespace)}/tables/${n.name}`,
        body: t,
      });
      return { 'metadata-location': e.data['metadata-location'], metadata: e.data.metadata };
    }
    async dropTable(n, t) {
      await this.client.request({
        method: 'DELETE',
        path: `${this.prefix}/namespaces/${vn(n.namespace)}/tables/${n.name}`,
        query: { purgeRequested: String(t?.purge ?? false) },
      });
    }
    async loadTable(n) {
      let t = {};
      return (
        this.accessDelegation && (t['X-Iceberg-Access-Delegation'] = this.accessDelegation),
        (
          await this.client.request({
            method: 'GET',
            path: `${this.prefix}/namespaces/${vn(n.namespace)}/tables/${n.name}`,
            headers: t,
          })
        ).data.metadata
      );
    }
    async tableExists(n) {
      let t = {};
      this.accessDelegation && (t['X-Iceberg-Access-Delegation'] = this.accessDelegation);
      try {
        return (
          await this.client.request({
            method: 'HEAD',
            path: `${this.prefix}/namespaces/${vn(n.namespace)}/tables/${n.name}`,
            headers: t,
          }),
          !0
        );
      } catch (e) {
        if (e instanceof yr && e.status === 404) return false;
        throw e;
      }
    }
    async createTableIfNotExists(n, t) {
      try {
        return await this.createTable(n, t);
      } catch (e) {
        if (e instanceof yr && e.status === 409)
          return await this.loadTable({ namespace: n.namespace, name: t.name });
        throw e;
      }
    }
  },
  cu = class {
    constructor(n) {
      let t = 'v1';
      n.catalogName && (t += `/${n.catalogName}`);
      let e = n.baseUrl.endsWith('/') ? n.baseUrl : `${n.baseUrl}/`;
      ((this.client = jp({ baseUrl: e, auth: n.auth, fetchImpl: n.fetch })),
        (this.accessDelegation = n.accessDelegation?.join(',')),
        (this.namespaceOps = new Bp(this.client, t)),
        (this.tableOps = new $p(this.client, t, this.accessDelegation)));
    }
    async listNamespaces(n) {
      return this.namespaceOps.listNamespaces(n);
    }
    async createNamespace(n, t) {
      return this.namespaceOps.createNamespace(n, t);
    }
    async dropNamespace(n) {
      await this.namespaceOps.dropNamespace(n);
    }
    async loadNamespaceMetadata(n) {
      return this.namespaceOps.loadNamespaceMetadata(n);
    }
    async listTables(n) {
      return this.tableOps.listTables(n);
    }
    async createTable(n, t) {
      return this.tableOps.createTable(n, t);
    }
    async updateTable(n, t) {
      return this.tableOps.updateTable(n, t);
    }
    async dropTable(n, t) {
      await this.tableOps.dropTable(n, t);
    }
    async loadTable(n) {
      return this.tableOps.loadTable(n);
    }
    async namespaceExists(n) {
      return this.namespaceOps.namespaceExists(n);
    }
    async tableExists(n) {
      return this.tableOps.tableExists(n);
    }
    async createNamespaceIfNotExists(n, t) {
      return this.namespaceOps.createNamespaceIfNotExists(n, t);
    }
    async createTableIfNotExists(n, t) {
      return this.tableOps.createTableIfNotExists(n, t);
    }
  };
function wr(n) {
  '@babel/helpers - typeof';
  return (
    (wr =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t;
          }),
    wr(n)
  );
}
function zp(n, t) {
  if (wr(n) != 'object' || !n) return n;
  var e = n[Symbol.toPrimitive];
  if (e !== void 0) {
    var r = e.call(n, t);
    if (wr(r) != 'object') return r;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (t === 'string' ? String : Number)(n);
}
function Hp(n) {
  var t = zp(n, 'string');
  return wr(t) == 'symbol' ? t : t + '';
}
function Vp(n, t, e) {
  return (
    (t = Hp(t)) in n
      ? Object.defineProperty(n, t, {
          value: e,
          enumerable: true,
          configurable: true,
          writable: true,
        })
      : (n[t] = e),
    n
  );
}
function lu(n, t) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    (t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(n, i).enumerable;
      })),
      e.push.apply(e, r));
  }
  return e;
}
function T(n) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? lu(Object(e), true).forEach(function (r) {
          Vp(n, r, e[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e))
        : lu(Object(e)).forEach(function (r) {
            Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(e, r));
          });
  }
  return n;
}
var Gi = class extends Error {
  constructor(n, t = 'storage', e, r) {
    (super(n),
      (this.__isStorageError = true),
      (this.namespace = t),
      (this.name = t === 'vectors' ? 'StorageVectorsError' : 'StorageError'),
      (this.status = e),
      (this.statusCode = r));
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode,
    };
  }
};
function Wi(n) {
  return typeof n == 'object' && n !== null && '__isStorageError' in n;
}
var Vi = class extends Gi {
    constructor(n, t, e, r = 'storage') {
      (super(n, r, t, e),
        (this.name = r === 'vectors' ? 'StorageVectorsApiError' : 'StorageApiError'),
        (this.status = t),
        (this.statusCode = e));
    }
    toJSON() {
      return T({}, super.toJSON());
    }
  },
  hu = class extends Gi {
    constructor(n, t, e = 'storage') {
      (super(n, e),
        (this.name = e === 'vectors' ? 'StorageVectorsUnknownError' : 'StorageUnknownError'),
        (this.originalError = t));
    }
  };
function qi(n, t, e) {
  let r = T({}, n),
    i = t.toLowerCase();
  for (let s of Object.keys(r)) s.toLowerCase() === i && delete r[s];
  return ((r[i] = e), r);
}
function qp(n) {
  let t = {};
  for (let [e, r] of Object.entries(n)) t[e.toLowerCase()] = r;
  return t;
}
var Gp = (n) => (n ? (...t) => n(...t) : (...t) => fetch(...t)),
  Wp = (n) => {
    if (typeof n != 'object' || n === null) return false;
    let t = Object.getPrototypeOf(n);
    return (
      (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in n) &&
      !(Symbol.iterator in n)
    );
  },
  $o = (n) => {
    if (Array.isArray(n)) return n.map((e) => $o(e));
    if (typeof n == 'function' || n !== Object(n)) return n;
    let t = {};
    return (
      Object.entries(n).forEach(([e, r]) => {
        let i = e.replace(/([-_][a-z])/gi, (s) => s.toUpperCase().replace(/[-_]/g, ''));
        t[i] = $o(r);
      }),
      t
    );
  },
  Kp = (n) =>
    !n ||
    typeof n != 'string' ||
    n.length === 0 ||
    n.length > 100 ||
    n.trim() !== n ||
    n.includes('/') ||
    n.includes('\\')
      ? false
      : /^[\w!.\*'() &$@=;:+,?-]+$/.test(n),
  uu = (n) => {
    if (typeof n == 'object' && n !== null) {
      let t = n;
      if (typeof t.msg == 'string') return t.msg;
      if (typeof t.message == 'string') return t.message;
      if (typeof t.error_description == 'string') return t.error_description;
      if (typeof t.error == 'string') return t.error;
      if (typeof t.error == 'object' && t.error !== null) {
        let e = t.error;
        if (typeof e.message == 'string') return e.message;
      }
    }
    return JSON.stringify(n);
  },
  Jp = async (n, t, e, r) => {
    if (n !== null && typeof n == 'object' && 'json' in n && typeof n.json == 'function') {
      let i = n,
        s = parseInt(String(i.status), 10);
      (Number.isFinite(s) || (s = 500),
        i
          .json()
          .then((o) => {
            let a = o?.statusCode || o?.code || s + '';
            t(new Vi(uu(o), s, a, r));
          })
          .catch(() => {
            let o = s + '';
            t(new Vi(i.statusText || `HTTP ${s} error`, s, o, r));
          }));
    } else t(new hu(uu(n), n, r));
  },
  Yp = (n, t, e, r) => {
    let i = { method: n, headers: t?.headers || {} };
    if (n === 'GET' || n === 'HEAD' || !r) return T(T({}, i), e);
    if (Wp(r)) {
      var s;
      let o = t?.headers || {},
        a;
      for (let [c, l] of Object.entries(o)) c.toLowerCase() === 'content-type' && (a = l);
      ((i.headers = qi(
        o,
        'Content-Type',
        (s = a) !== null && s !== void 0 ? s : 'application/json',
      )),
        (i.body = JSON.stringify(r)));
    } else i.body = r;
    return (t?.duplex && (i.duplex = t.duplex), T(T({}, i), e));
  };
async function _r(n, t, e, r, i, s, o) {
  return new Promise((a, c) => {
    n(e, Yp(t, r, i, s))
      .then((l) => {
        if (!l.ok) throw l;
        if (r?.noResolveJson) return l;
        if (o === 'vectors') {
          let u = l.headers.get('content-type');
          if (l.headers.get('content-length') === '0' || l.status === 204) return {};
          if (!u || !u.includes('application/json')) return {};
        }
        return l.json();
      })
      .then((l) => a(l))
      .catch((l) => Jp(l, c, r, o));
  });
}
function fu(n = 'storage') {
  return {
    get: async (t, e, r, i) => _r(t, 'GET', e, r, i, void 0, n),
    post: async (t, e, r, i, s) => _r(t, 'POST', e, i, s, r, n),
    put: async (t, e, r, i, s) => _r(t, 'PUT', e, i, s, r, n),
    head: async (t, e, r, i) =>
      _r(t, 'HEAD', e, T(T({}, r), {}, { noResolveJson: true }), i, void 0, n),
    remove: async (t, e, r, i, s) => _r(t, 'DELETE', e, i, s, r, n),
  };
}
var Xp = fu('storage'),
  { get: Er, post: Ae, put: zo, head: Zp, remove: Ho } = Xp,
  pe = fu('vectors'),
  bn = class {
    constructor(n, t = {}, e, r = 'storage') {
      ((this.shouldThrowOnError = false),
        (this.url = n),
        (this.headers = qp(t)),
        (this.fetch = Gp(e)),
        (this.namespace = r));
    }
    throwOnError() {
      return ((this.shouldThrowOnError = true), this);
    }
    setHeader(n, t) {
      return ((this.headers = qi(this.headers, n, t)), this);
    }
    async handleOperation(n) {
      var t = this;
      try {
        return { data: await n(), error: null };
      } catch (e) {
        if (t.shouldThrowOnError) throw e;
        if (Wi(e)) return { data: null, error: e };
        throw e;
      }
    }
  },
  pu;
pu = Symbol.toStringTag;
var Qp = class {
    constructor(n, t) {
      ((this.downloadFn = n),
        (this.shouldThrowOnError = t),
        (this[pu] = 'StreamDownloadBuilder'),
        (this.promise = null));
    }
    then(n, t) {
      return this.getPromise().then(n, t);
    }
    catch(n) {
      return this.getPromise().catch(n);
    }
    finally(n) {
      return this.getPromise().finally(n);
    }
    getPromise() {
      return (this.promise || (this.promise = this.execute()), this.promise);
    }
    async execute() {
      var n = this;
      try {
        return { data: (await n.downloadFn()).body, error: null };
      } catch (t) {
        if (n.shouldThrowOnError) throw t;
        if (Wi(t)) return { data: null, error: t };
        throw t;
      }
    }
  },
  mu;
mu = Symbol.toStringTag;
var em = class {
    constructor(n, t) {
      ((this.downloadFn = n),
        (this.shouldThrowOnError = t),
        (this[mu] = 'BlobDownloadBuilder'),
        (this.promise = null));
    }
    asStream() {
      return new Qp(this.downloadFn, this.shouldThrowOnError);
    }
    then(n, t) {
      return this.getPromise().then(n, t);
    }
    catch(n) {
      return this.getPromise().catch(n);
    }
    finally(n) {
      return this.getPromise().finally(n);
    }
    getPromise() {
      return (this.promise || (this.promise = this.execute()), this.promise);
    }
    async execute() {
      var n = this;
      try {
        return { data: await (await n.downloadFn()).blob(), error: null };
      } catch (t) {
        if (n.shouldThrowOnError) throw t;
        if (Wi(t)) return { data: null, error: t };
        throw t;
      }
    }
  },
  tm = { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } },
  du = { cacheControl: '3600', contentType: 'text/plain;charset=UTF-8', upsert: false },
  nm = class extends bn {
    constructor(n, t = {}, e, r) {
      (super(n, t, r, 'storage'), (this.bucketId = e));
    }
    async uploadOrUpdate(n, t, e, r) {
      var i = this;
      return i.handleOperation(async () => {
        let s,
          o = T(T({}, du), r),
          a = T(T({}, i.headers), n === 'POST' && { 'x-upsert': String(o.upsert) }),
          c = o.metadata;
        if (
          (typeof Blob < 'u' && e instanceof Blob
            ? ((s = new FormData()),
              s.append('cacheControl', o.cacheControl),
              c && s.append('metadata', i.encodeMetadata(c)),
              s.append('', e))
            : typeof FormData < 'u' && e instanceof FormData
              ? ((s = e),
                s.has('cacheControl') || s.append('cacheControl', o.cacheControl),
                c && !s.has('metadata') && s.append('metadata', i.encodeMetadata(c)))
              : ((s = e),
                (a['cache-control'] = `max-age=${o.cacheControl}`),
                (a['content-type'] = o.contentType),
                c && (a['x-metadata'] = i.toBase64(i.encodeMetadata(c))),
                ((typeof ReadableStream < 'u' && s instanceof ReadableStream) ||
                  (s && typeof s == 'object' && 'pipe' in s && typeof s.pipe == 'function')) &&
                  !o.duplex &&
                  (o.duplex = 'half')),
          r?.headers)
        )
          for (let [h, f] of Object.entries(r.headers)) a = qi(a, h, f);
        let l = i._removeEmptyFolders(t),
          u = i._getFinalPath(l),
          d = await (n == 'PUT' ? zo : Ae)(
            i.fetch,
            `${i.url}/object/${u}`,
            s,
            T({ headers: a }, o?.duplex ? { duplex: o.duplex } : {}),
          );
        return { path: l, id: d.Id, fullPath: d.Key };
      });
    }
    async upload(n, t, e) {
      return this.uploadOrUpdate('POST', n, t, e);
    }
    async uploadToSignedUrl(n, t, e, r) {
      var i = this;
      let s = i._removeEmptyFolders(n),
        o = i._getFinalPath(s),
        a = new URL(i.url + `/object/upload/sign/${o}`);
      return (
        a.searchParams.set('token', t),
        i.handleOperation(async () => {
          let c,
            l = T(T({}, du), r),
            u = T(T({}, i.headers), { 'x-upsert': String(l.upsert) }),
            d = l.metadata;
          if (
            (typeof Blob < 'u' && e instanceof Blob
              ? ((c = new FormData()),
                c.append('cacheControl', l.cacheControl),
                d && c.append('metadata', i.encodeMetadata(d)),
                c.append('', e))
              : typeof FormData < 'u' && e instanceof FormData
                ? ((c = e),
                  c.has('cacheControl') || c.append('cacheControl', l.cacheControl),
                  d && !c.has('metadata') && c.append('metadata', i.encodeMetadata(d)))
                : ((c = e),
                  (u['cache-control'] = `max-age=${l.cacheControl}`),
                  (u['content-type'] = l.contentType),
                  d && (u['x-metadata'] = i.toBase64(i.encodeMetadata(d))),
                  ((typeof ReadableStream < 'u' && c instanceof ReadableStream) ||
                    (c && typeof c == 'object' && 'pipe' in c && typeof c.pipe == 'function')) &&
                    !l.duplex &&
                    (l.duplex = 'half')),
            r?.headers)
          )
            for (let [h, f] of Object.entries(r.headers)) u = qi(u, h, f);
          return {
            path: s,
            fullPath: (
              await zo(
                i.fetch,
                a.toString(),
                c,
                T({ headers: u }, l?.duplex ? { duplex: l.duplex } : {}),
              )
            ).Key,
          };
        })
      );
    }
    async createSignedUploadUrl(n, t) {
      var e = this;
      return e.handleOperation(async () => {
        let r = e._getFinalPath(n),
          i = T({}, e.headers);
        t?.upsert && (i['x-upsert'] = 'true');
        let s = await Ae(e.fetch, `${e.url}/object/upload/sign/${r}`, {}, { headers: i }),
          o = new URL(e.url + s.url),
          a = o.searchParams.get('token');
        if (!a) throw new Gi('No token returned by API');
        return { signedUrl: o.toString(), path: n, token: a };
      });
    }
    async update(n, t, e) {
      return this.uploadOrUpdate('PUT', n, t, e);
    }
    async move(n, t, e) {
      var r = this;
      return r.handleOperation(
        async () =>
          await Ae(
            r.fetch,
            `${r.url}/object/move`,
            {
              bucketId: r.bucketId,
              sourceKey: n,
              destinationKey: t,
              destinationBucket: e?.destinationBucket,
            },
            { headers: r.headers },
          ),
      );
    }
    async copy(n, t, e) {
      var r = this;
      return r.handleOperation(async () => ({
        path: (
          await Ae(
            r.fetch,
            `${r.url}/object/copy`,
            {
              bucketId: r.bucketId,
              sourceKey: n,
              destinationKey: t,
              destinationBucket: e?.destinationBucket,
            },
            { headers: r.headers },
          )
        ).Key,
      }));
    }
    async createSignedUrl(n, t, e) {
      var r = this;
      return r.handleOperation(async () => {
        let i = r._getFinalPath(n),
          s =
            typeof e?.transform == 'object' &&
            e.transform !== null &&
            Object.keys(e.transform).length > 0,
          o = await Ae(
            r.fetch,
            `${r.url}/object/sign/${i}`,
            T({ expiresIn: t }, s ? { transform: e.transform } : {}),
            { headers: r.headers },
          ),
          a = new URLSearchParams();
        (e?.download && a.set('download', e.download === true ? '' : e.download),
          e?.cacheNonce != null && a.set('cacheNonce', String(e.cacheNonce)));
        let c = a.toString();
        return { signedUrl: encodeURI(`${r.url}${o.signedURL}${c ? `&${c}` : ''}`) };
      });
    }
    async createSignedUrls(n, t, e) {
      var r = this;
      return r.handleOperation(async () => {
        let i = await Ae(
            r.fetch,
            `${r.url}/object/sign/${r.bucketId}`,
            { expiresIn: t, paths: n },
            { headers: r.headers },
          ),
          s = new URLSearchParams();
        (e?.download && s.set('download', e.download === true ? '' : e.download),
          e?.cacheNonce != null && s.set('cacheNonce', String(e.cacheNonce)));
        let o = s.toString();
        return i.map((a) =>
          T(
            T({}, a),
            {},
            {
              signedUrl: a.signedURL
                ? encodeURI(`${r.url}${a.signedURL}${o ? `&${o}` : ''}`)
                : null,
            },
          ),
        );
      });
    }
    download(n, t, e) {
      let r =
          typeof t?.transform == 'object' &&
          t.transform !== null &&
          Object.keys(t.transform).length > 0
            ? 'render/image/authenticated'
            : 'object',
        i = new URLSearchParams();
      (t?.transform && this.applyTransformOptsToQuery(i, t.transform),
        t?.cacheNonce != null && i.set('cacheNonce', String(t.cacheNonce)));
      let s = i.toString(),
        o = this._getFinalPath(n),
        a = () =>
          Er(
            this.fetch,
            `${this.url}/${r}/${o}${s ? `?${s}` : ''}`,
            { headers: this.headers, noResolveJson: true },
            e,
          );
      return new em(a, this.shouldThrowOnError);
    }
    async info(n) {
      var t = this;
      let e = t._getFinalPath(n);
      return t.handleOperation(async () =>
        $o(await Er(t.fetch, `${t.url}/object/info/${e}`, { headers: t.headers })),
      );
    }
    async exists(n) {
      var t = this;
      let e = t._getFinalPath(n);
      try {
        return (
          await Zp(t.fetch, `${t.url}/object/${e}`, { headers: t.headers }),
          { data: !0, error: null }
        );
      } catch (i) {
        if (t.shouldThrowOnError) throw i;
        if (Wi(i)) {
          var r;
          let s =
            i instanceof Vi
              ? i.status
              : i instanceof hu
                ? (r = i.originalError) === null || r === void 0
                  ? void 0
                  : r.status
                : void 0;
          if (s !== void 0 && [400, 404].includes(s)) return { data: false, error: i };
        }
        throw i;
      }
    }
    getPublicUrl(n, t) {
      let e = this._getFinalPath(n),
        r = new URLSearchParams();
      (t?.download && r.set('download', t.download === true ? '' : t.download),
        t?.transform && this.applyTransformOptsToQuery(r, t.transform),
        t?.cacheNonce != null && r.set('cacheNonce', String(t.cacheNonce)));
      let i = r.toString(),
        s =
          typeof t?.transform == 'object' &&
          t.transform !== null &&
          Object.keys(t.transform).length > 0
            ? 'render/image'
            : 'object';
      return {
        data: { publicUrl: encodeURI(`${this.url}/${s}/public/${e}`) + (i ? `?${i}` : '') },
      };
    }
    async remove(n) {
      var t = this;
      return t.handleOperation(
        async () =>
          await Ho(
            t.fetch,
            `${t.url}/object/${t.bucketId}`,
            { prefixes: n },
            { headers: t.headers },
          ),
      );
    }
    async list(n, t, e) {
      var r = this;
      return r.handleOperation(async () => {
        let i = T(T(T({}, tm), t), {}, { prefix: n || '' });
        return await Ae(
          r.fetch,
          `${r.url}/object/list/${r.bucketId}`,
          i,
          { headers: r.headers },
          e,
        );
      });
    }
    async listV2(n, t) {
      var e = this;
      return e.handleOperation(async () => {
        let r = T({}, n);
        return await Ae(
          e.fetch,
          `${e.url}/object/list-v2/${e.bucketId}`,
          r,
          { headers: e.headers },
          t,
        );
      });
    }
    encodeMetadata(n) {
      return JSON.stringify(n);
    }
    toBase64(n) {
      return typeof Buffer < 'u' ? Buffer.from(n).toString('base64') : btoa(n);
    }
    _getFinalPath(n) {
      return `${this.bucketId}/${n.replace(/^\/+/, '')}`;
    }
    _removeEmptyFolders(n) {
      return n.replace(/^\/|\/$/g, '').replace(/\/+/g, '/');
    }
    applyTransformOptsToQuery(n, t) {
      return (
        t.width && n.set('width', t.width.toString()),
        t.height && n.set('height', t.height.toString()),
        t.resize && n.set('resize', t.resize),
        t.format && n.set('format', t.format),
        t.quality && n.set('quality', t.quality.toString()),
        n
      );
    }
  },
  rm = '2.107.0',
  Sr = { 'X-Client-Info': `storage-js/${rm}` },
  im = class extends bn {
    constructor(n, t = {}, e, r) {
      let i = new URL(n);
      r?.useNewHostname &&
        /supabase\.(co|in|red)$/.test(i.hostname) &&
        !i.hostname.includes('storage.supabase.') &&
        (i.hostname = i.hostname.replace('supabase.', 'storage.supabase.'));
      let s = i.href.replace(/\/$/, ''),
        o = T(T({}, Sr), t);
      super(s, o, e, 'storage');
    }
    async listBuckets(n) {
      var t = this;
      return t.handleOperation(async () => {
        let e = t.listBucketOptionsToQueryString(n);
        return await Er(t.fetch, `${t.url}/bucket${e}`, { headers: t.headers });
      });
    }
    async getBucket(n) {
      var t = this;
      return t.handleOperation(
        async () => await Er(t.fetch, `${t.url}/bucket/${n}`, { headers: t.headers }),
      );
    }
    async createBucket(n, t = { public: false }) {
      var e = this;
      return e.handleOperation(
        async () =>
          await Ae(
            e.fetch,
            `${e.url}/bucket`,
            {
              id: n,
              name: n,
              type: t.type,
              public: t.public,
              file_size_limit: t.fileSizeLimit,
              allowed_mime_types: t.allowedMimeTypes,
            },
            { headers: e.headers },
          ),
      );
    }
    async updateBucket(n, t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await zo(
            e.fetch,
            `${e.url}/bucket/${n}`,
            {
              id: n,
              name: n,
              public: t.public,
              file_size_limit: t.fileSizeLimit,
              allowed_mime_types: t.allowedMimeTypes,
            },
            { headers: e.headers },
          ),
      );
    }
    async emptyBucket(n) {
      var t = this;
      return t.handleOperation(
        async () => await Ae(t.fetch, `${t.url}/bucket/${n}/empty`, {}, { headers: t.headers }),
      );
    }
    async deleteBucket(n) {
      var t = this;
      return t.handleOperation(
        async () => await Ho(t.fetch, `${t.url}/bucket/${n}`, {}, { headers: t.headers }),
      );
    }
    listBucketOptionsToQueryString(n) {
      let t = {};
      return (
        n &&
          ('limit' in n && (t.limit = String(n.limit)),
          'offset' in n && (t.offset = String(n.offset)),
          n.search && (t.search = n.search),
          n.sortColumn && (t.sortColumn = n.sortColumn),
          n.sortOrder && (t.sortOrder = n.sortOrder)),
        Object.keys(t).length > 0 ? '?' + new URLSearchParams(t).toString() : ''
      );
    }
  },
  sm = class extends bn {
    constructor(n, t = {}, e) {
      let r = n.replace(/\/$/, ''),
        i = T(T({}, Sr), t);
      super(r, i, e, 'storage');
    }
    async createBucket(n) {
      var t = this;
      return t.handleOperation(
        async () => await Ae(t.fetch, `${t.url}/bucket`, { name: n }, { headers: t.headers }),
      );
    }
    async listBuckets(n) {
      var t = this;
      return t.handleOperation(async () => {
        let e = new URLSearchParams();
        (n?.limit !== void 0 && e.set('limit', n.limit.toString()),
          n?.offset !== void 0 && e.set('offset', n.offset.toString()),
          n?.sortColumn && e.set('sortColumn', n.sortColumn),
          n?.sortOrder && e.set('sortOrder', n.sortOrder),
          n?.search && e.set('search', n.search));
        let r = e.toString(),
          i = r ? `${t.url}/bucket?${r}` : `${t.url}/bucket`;
        return await Er(t.fetch, i, { headers: t.headers });
      });
    }
    async deleteBucket(n) {
      var t = this;
      return t.handleOperation(
        async () => await Ho(t.fetch, `${t.url}/bucket/${n}`, {}, { headers: t.headers }),
      );
    }
    from(n) {
      var t = this;
      if (!Kp(n))
        throw new Gi(
          'Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.',
        );
      let e = new cu({
          baseUrl: this.url,
          catalogName: n,
          auth: { type: 'custom', getHeaders: async () => t.headers },
          fetch: this.fetch,
        }),
        r = this.shouldThrowOnError;
      return new Proxy(e, {
        get(i, s) {
          let o = i[s];
          return typeof o != 'function'
            ? o
            : async (...a) => {
                try {
                  return { data: await o.apply(i, a), error: null };
                } catch (c) {
                  if (r) throw c;
                  return { data: null, error: c };
                }
              };
        },
      });
    }
  },
  om = class extends bn {
    constructor(n, t = {}, e) {
      let r = n.replace(/\/$/, ''),
        i = T(T({}, Sr), {}, { 'Content-Type': 'application/json' }, t);
      super(r, i, e, 'vectors');
    }
    async createIndex(n) {
      var t = this;
      return t.handleOperation(
        async () =>
          (await pe.post(t.fetch, `${t.url}/CreateIndex`, n, { headers: t.headers })) || {},
      );
    }
    async getIndex(n, t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await pe.post(
            e.fetch,
            `${e.url}/GetIndex`,
            { vectorBucketName: n, indexName: t },
            { headers: e.headers },
          ),
      );
    }
    async listIndexes(n) {
      var t = this;
      return t.handleOperation(
        async () => await pe.post(t.fetch, `${t.url}/ListIndexes`, n, { headers: t.headers }),
      );
    }
    async deleteIndex(n, t) {
      var e = this;
      return e.handleOperation(
        async () =>
          (await pe.post(
            e.fetch,
            `${e.url}/DeleteIndex`,
            { vectorBucketName: n, indexName: t },
            { headers: e.headers },
          )) || {},
      );
    }
  },
  am = class extends bn {
    constructor(n, t = {}, e) {
      let r = n.replace(/\/$/, ''),
        i = T(T({}, Sr), {}, { 'Content-Type': 'application/json' }, t);
      super(r, i, e, 'vectors');
    }
    async putVectors(n) {
      var t = this;
      if (n.vectors.length < 1 || n.vectors.length > 500)
        throw new Error('Vector batch size must be between 1 and 500 items');
      return t.handleOperation(
        async () =>
          (await pe.post(t.fetch, `${t.url}/PutVectors`, n, { headers: t.headers })) || {},
      );
    }
    async getVectors(n) {
      var t = this;
      return t.handleOperation(
        async () => await pe.post(t.fetch, `${t.url}/GetVectors`, n, { headers: t.headers }),
      );
    }
    async listVectors(n) {
      var t = this;
      if (n.segmentCount !== void 0) {
        if (n.segmentCount < 1 || n.segmentCount > 16)
          throw new Error('segmentCount must be between 1 and 16');
        if (n.segmentIndex !== void 0 && (n.segmentIndex < 0 || n.segmentIndex >= n.segmentCount))
          throw new Error(`segmentIndex must be between 0 and ${n.segmentCount - 1}`);
      }
      return t.handleOperation(
        async () => await pe.post(t.fetch, `${t.url}/ListVectors`, n, { headers: t.headers }),
      );
    }
    async queryVectors(n) {
      var t = this;
      return t.handleOperation(
        async () => await pe.post(t.fetch, `${t.url}/QueryVectors`, n, { headers: t.headers }),
      );
    }
    async deleteVectors(n) {
      var t = this;
      if (n.keys.length < 1 || n.keys.length > 500)
        throw new Error('Keys batch size must be between 1 and 500 items');
      return t.handleOperation(
        async () =>
          (await pe.post(t.fetch, `${t.url}/DeleteVectors`, n, { headers: t.headers })) || {},
      );
    }
  },
  cm = class extends bn {
    constructor(n, t = {}, e) {
      let r = n.replace(/\/$/, ''),
        i = T(T({}, Sr), {}, { 'Content-Type': 'application/json' }, t);
      super(r, i, e, 'vectors');
    }
    async createBucket(n) {
      var t = this;
      return t.handleOperation(
        async () =>
          (await pe.post(
            t.fetch,
            `${t.url}/CreateVectorBucket`,
            { vectorBucketName: n },
            { headers: t.headers },
          )) || {},
      );
    }
    async getBucket(n) {
      var t = this;
      return t.handleOperation(
        async () =>
          await pe.post(
            t.fetch,
            `${t.url}/GetVectorBucket`,
            { vectorBucketName: n },
            { headers: t.headers },
          ),
      );
    }
    async listBuckets(n = {}) {
      var t = this;
      return t.handleOperation(
        async () => await pe.post(t.fetch, `${t.url}/ListVectorBuckets`, n, { headers: t.headers }),
      );
    }
    async deleteBucket(n) {
      var t = this;
      return t.handleOperation(
        async () =>
          (await pe.post(
            t.fetch,
            `${t.url}/DeleteVectorBucket`,
            { vectorBucketName: n },
            { headers: t.headers },
          )) || {},
      );
    }
  },
  lm = class extends cm {
    constructor(n, t = {}) {
      super(n, t.headers || {}, t.fetch);
    }
    from(n) {
      return new um(this.url, this.headers, n, this.fetch);
    }
    async createBucket(n) {
      var t = () => super.createBucket,
        e = this;
      return t().call(e, n);
    }
    async getBucket(n) {
      var t = () => super.getBucket,
        e = this;
      return t().call(e, n);
    }
    async listBuckets(n = {}) {
      var t = () => super.listBuckets,
        e = this;
      return t().call(e, n);
    }
    async deleteBucket(n) {
      var t = () => super.deleteBucket,
        e = this;
      return t().call(e, n);
    }
  },
  um = class extends om {
    constructor(n, t, e, r) {
      (super(n, t, r), (this.vectorBucketName = e));
    }
    async createIndex(n) {
      var t = () => super.createIndex,
        e = this;
      return t().call(e, T(T({}, n), {}, { vectorBucketName: e.vectorBucketName }));
    }
    async listIndexes(n = {}) {
      var t = () => super.listIndexes,
        e = this;
      return t().call(e, T(T({}, n), {}, { vectorBucketName: e.vectorBucketName }));
    }
    async getIndex(n) {
      var t = () => super.getIndex,
        e = this;
      return t().call(e, e.vectorBucketName, n);
    }
    async deleteIndex(n) {
      var t = () => super.deleteIndex,
        e = this;
      return t().call(e, e.vectorBucketName, n);
    }
    index(n) {
      return new dm(this.url, this.headers, this.vectorBucketName, n, this.fetch);
    }
  },
  dm = class extends am {
    constructor(n, t, e, r, i) {
      (super(n, t, i), (this.vectorBucketName = e), (this.indexName = r));
    }
    async putVectors(n) {
      var t = () => super.putVectors,
        e = this;
      return t().call(
        e,
        T(T({}, n), {}, { vectorBucketName: e.vectorBucketName, indexName: e.indexName }),
      );
    }
    async getVectors(n) {
      var t = () => super.getVectors,
        e = this;
      return t().call(
        e,
        T(T({}, n), {}, { vectorBucketName: e.vectorBucketName, indexName: e.indexName }),
      );
    }
    async listVectors(n = {}) {
      var t = () => super.listVectors,
        e = this;
      return t().call(
        e,
        T(T({}, n), {}, { vectorBucketName: e.vectorBucketName, indexName: e.indexName }),
      );
    }
    async queryVectors(n) {
      var t = () => super.queryVectors,
        e = this;
      return t().call(
        e,
        T(T({}, n), {}, { vectorBucketName: e.vectorBucketName, indexName: e.indexName }),
      );
    }
    async deleteVectors(n) {
      var t = () => super.deleteVectors,
        e = this;
      return t().call(
        e,
        T(T({}, n), {}, { vectorBucketName: e.vectorBucketName, indexName: e.indexName }),
      );
    }
  },
  gu = class extends im {
    constructor(n, t = {}, e, r) {
      super(n, t, e, r);
    }
    from(n) {
      return new nm(this.url, this.headers, n, this.fetch);
    }
    get vectors() {
      return new lm(this.url + '/vector', { headers: this.headers, fetch: this.fetch });
    }
    get analytics() {
      return new sm(this.url + '/iceberg', this.headers, this.fetch);
    }
  };
var Ki = '2.107.0';
var Ye = 30 * 1e3,
  yn = 3,
  Ji = yn * Ye,
  vu = 'http://localhost:9999',
  bu = 'supabase.auth.token';
var yu = { 'X-Client-Info': `gotrue-js/${Ki}` };
var Dr = 'X-Supabase-Api-Version',
  Vo = { '2024-01-01': { timestamp: Date.parse('2024-01-01T00:00:00.0Z'), name: '2024-01-01' } },
  _u = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,
  wu = 600 * 1e3;
var dt = class extends Error {
  constructor(t, e, r) {
    (super(t),
      (this.__isAuthError = true),
      (this.name = 'AuthError'),
      (this.status = e),
      (this.code = r));
  }
  toJSON() {
    return { name: this.name, message: this.message, status: this.status, code: this.code };
  }
};
function _(n) {
  return typeof n == 'object' && n !== null && '__isAuthError' in n;
}
var Yi = class extends dt {
  constructor(t, e, r) {
    (super(t, e, r), (this.name = 'AuthApiError'), (this.status = e), (this.code = r));
  }
};
function Eu(n) {
  return _(n) && n.name === 'AuthApiError';
}
var Z = class extends dt {
    constructor(t, e) {
      (super(t), (this.name = 'AuthUnknownError'), (this.originalError = e));
    }
  },
  De$1 = class De extends dt {
    constructor(t, e, r, i) {
      (super(t, r, i), (this.name = e), (this.status = r));
    }
  },
  z = class extends De$1 {
    constructor() {
      super('Auth session missing!', 'AuthSessionMissingError', 400, void 0);
    }
  };
function Ar(n) {
  return _(n) && n.name === 'AuthSessionMissingError';
}
var Xe = class extends De$1 {
    constructor() {
      super('Auth session or user missing', 'AuthInvalidTokenResponseError', 500, void 0);
    }
  },
  Dt = class extends De$1 {
    constructor(t) {
      super(t, 'AuthInvalidCredentialsError', 400, void 0);
    }
  },
  Tt = class extends De$1 {
    constructor(t, e = null) {
      (super(t, 'AuthImplicitGrantRedirectError', 500, void 0),
        (this.details = null),
        (this.details = e));
    }
    toJSON() {
      return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
    }
  };
function Su(n) {
  return _(n) && n.name === 'AuthImplicitGrantRedirectError';
}
var Tr = class extends De$1 {
    constructor(t, e = null) {
      (super(t, 'AuthPKCEGrantCodeExchangeError', 500, void 0),
        (this.details = null),
        (this.details = e));
    }
    toJSON() {
      return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
    }
  },
  Xi = class extends De$1 {
    constructor() {
      super(
        'PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.',
        'AuthPKCECodeVerifierMissingError',
        400,
        'pkce_code_verifier_not_found',
      );
    }
  };
var _n = class extends De$1 {
  constructor(t, e) {
    super(t, 'AuthRetryableFetchError', e, void 0);
  }
};
function Zi(n) {
  return _(n) && n.name === 'AuthRetryableFetchError';
}
var Cr = class extends De$1 {
  constructor(
    t = 'Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)',
  ) {
    super(t, 'AuthRefreshDiscardedError', 409, void 0);
  }
};
function Du(n) {
  return _(n) && n.name === 'AuthRefreshDiscardedError';
}
var Rr = class extends De$1 {
  constructor(t, e, r) {
    (super(t, 'AuthWeakPasswordError', e, 'weak_password'), (this.reasons = r));
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), { reasons: this.reasons });
  }
};
var ht = class extends De$1 {
  constructor(t) {
    super(t, 'AuthInvalidJwtError', 400, 'invalid_jwt');
  }
};
var Qi = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split(''),
  Tu = ` 	
\r=`.split(''),
  hm = (() => {
    let n = new Array(128);
    for (let t = 0; t < n.length; t += 1) n[t] = -1;
    for (let t = 0; t < Tu.length; t += 1) n[Tu[t].charCodeAt(0)] = -2;
    for (let t = 0; t < Qi.length; t += 1) n[Qi[t].charCodeAt(0)] = t;
    return n;
  })();
function Cu(n, t, e) {
  if (n !== null)
    for (t.queue = (t.queue << 8) | n, t.queuedBits += 8; t.queuedBits >= 6; ) {
      let r = (t.queue >> (t.queuedBits - 6)) & 63;
      (e(Qi[r]), (t.queuedBits -= 6));
    }
  else if (t.queuedBits > 0)
    for (t.queue = t.queue << (6 - t.queuedBits), t.queuedBits = 6; t.queuedBits >= 6; ) {
      let r = (t.queue >> (t.queuedBits - 6)) & 63;
      (e(Qi[r]), (t.queuedBits -= 6));
    }
}
function Ru(n, t, e) {
  let r = hm[n];
  if (r > -1)
    for (t.queue = (t.queue << 6) | r, t.queuedBits += 6; t.queuedBits >= 8; )
      (e((t.queue >> (t.queuedBits - 8)) & 255), (t.queuedBits -= 8));
  else {
    if (r === -2) return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(n)}"`);
  }
}
function qo(n) {
  let t = [],
    e = (o) => {
      t.push(String.fromCodePoint(o));
    },
    r = { utf8seq: 0, codepoint: 0 },
    i = { queue: 0, queuedBits: 0 },
    s = (o) => {
      mm(o, r, e);
    };
  for (let o = 0; o < n.length; o += 1) Ru(n.charCodeAt(o), i, s);
  return t.join('');
}
function fm(n, t) {
  if (n <= 127) {
    t(n);
    return;
  } else if (n <= 2047) {
    (t(192 | (n >> 6)), t(128 | (n & 63)));
    return;
  } else if (n <= 65535) {
    (t(224 | (n >> 12)), t(128 | ((n >> 6) & 63)), t(128 | (n & 63)));
    return;
  } else if (n <= 1114111) {
    (t(240 | (n >> 18)), t(128 | ((n >> 12) & 63)), t(128 | ((n >> 6) & 63)), t(128 | (n & 63)));
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${n.toString(16)}`);
}
function pm(n, t) {
  for (let e = 0; e < n.length; e += 1) {
    let r = n.charCodeAt(e);
    if (r > 55295 && r <= 56319) {
      let i = ((r - 55296) * 1024) & 65535;
      ((r = (((n.charCodeAt(e + 1) - 56320) & 65535) | i) + 65536), (e += 1));
    }
    fm(r, t);
  }
}
function mm(n, t, e) {
  if (t.utf8seq === 0) {
    if (n <= 127) {
      e(n);
      return;
    }
    for (let r = 1; r < 6; r += 1)
      if (((n >> (7 - r)) & 1) === 0) {
        t.utf8seq = r;
        break;
      }
    if (t.utf8seq === 2) t.codepoint = n & 31;
    else if (t.utf8seq === 3) t.codepoint = n & 15;
    else if (t.utf8seq === 4) t.codepoint = n & 7;
    else throw new Error('Invalid UTF-8 sequence');
    t.utf8seq -= 1;
  } else if (t.utf8seq > 0) {
    if (n <= 127) throw new Error('Invalid UTF-8 sequence');
    ((t.codepoint = (t.codepoint << 6) | (n & 63)),
      (t.utf8seq -= 1),
      t.utf8seq === 0 && e(t.codepoint));
  }
}
function ft(n) {
  let t = [],
    e = { queue: 0, queuedBits: 0 },
    r = (i) => {
      t.push(i);
    };
  for (let i = 0; i < n.length; i += 1) Ru(n.charCodeAt(i), e, r);
  return new Uint8Array(t);
}
function Au(n) {
  let t = [];
  return (pm(n, (e) => t.push(e)), new Uint8Array(t));
}
function Ze(n) {
  let t = [],
    e = { queue: 0, queuedBits: 0 },
    r = (i) => {
      t.push(i);
    };
  return (n.forEach((i) => Cu(i, e, r)), Cu(null, e, r), t.join(''));
}
function Iu(n) {
  return Math.round(Date.now() / 1e3) + n;
}
function ku() {
  return Symbol('auth-callback');
}
var J = () => typeof window < 'u' && typeof document < 'u',
  Ct = { tested: false, writable: false },
  es = () => {
    if (!J()) return false;
    try {
      if (typeof globalThis.localStorage != 'object') return !1;
    } catch {
      return false;
    }
    if (Ct.tested) return Ct.writable;
    let n = `lswt-${Math.random()}${Math.random()}`;
    try {
      (globalThis.localStorage.setItem(n, n),
        globalThis.localStorage.removeItem(n),
        (Ct.tested = !0),
        (Ct.writable = !0));
    } catch {
      ((Ct.tested = true), (Ct.writable = false));
    }
    return Ct.writable;
  };
function Ou(n) {
  let t = {},
    e = new URL(n);
  if (e.hash && e.hash[0] === '#')
    try {
      new URLSearchParams(e.hash.substring(1)).forEach((i, s) => {
        t[s] = i;
      });
    } catch {}
  return (
    e.searchParams.forEach((r, i) => {
      t[i] = r;
    }),
    t
  );
}
var ts = (n) => (n ? (...t) => n(...t) : (...t) => fetch(...t)),
  xu = (n) =>
    typeof n == 'object' &&
    n !== null &&
    'status' in n &&
    'ok' in n &&
    'json' in n &&
    typeof n.json == 'function',
  Rt = async (n, t, e) => {
    await n.setItem(t, JSON.stringify(e));
  },
  Le = async (n, t) => {
    let e = await n.getItem(t);
    if (!e) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  },
  G = async (n, t) => {
    await n.removeItem(t);
  },
  Ir = class n {
    constructor() {
      this.promise = new n.promiseConstructor((t, e) => {
        ((this.resolve = t), (this.reject = e));
      });
    }
  };
Ir.promiseConstructor = Promise;
function kr(n) {
  let t = n.split('.');
  if (t.length !== 3) throw new ht('Invalid JWT structure');
  for (let r = 0; r < t.length; r++)
    if (!_u.test(t[r])) throw new ht('JWT not in base64url format');
  return {
    header: JSON.parse(qo(t[0])),
    payload: JSON.parse(qo(t[1])),
    signature: ft(t[2]),
    raw: { header: t[0], payload: t[1] },
  };
}
async function Pu(n) {
  return await new Promise((t) => {
    setTimeout(() => t(null), n);
  });
}
function Mu(n, t) {
  return new Promise((r, i) => {
    (async () => {
      for (let s = 0; s < 1 / 0; s++)
        try {
          let o = await n(s);
          if (!t(s, null, o)) {
            r(o);
            return;
          }
        } catch (o) {
          if (!t(s, o)) {
            i(o);
            return;
          }
        }
    })();
  });
}
function gm(n) {
  return ('0' + n.toString(16)).substr(-2);
}
function vm() {
  let t = new Uint32Array(56);
  if (typeof crypto > 'u') {
    let e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~',
      r = e.length,
      i = '';
    for (let s = 0; s < 56; s++) i += e.charAt(Math.floor(Math.random() * r));
    return i;
  }
  return (crypto.getRandomValues(t), Array.from(t, gm).join(''));
}
async function bm(n) {
  let e = new TextEncoder().encode(n),
    r = await crypto.subtle.digest('SHA-256', e),
    i = new Uint8Array(r);
  return Array.from(i)
    .map((s) => String.fromCharCode(s))
    .join('');
}
async function ym(n) {
  if (!(typeof crypto < 'u' && typeof crypto.subtle < 'u' && typeof TextEncoder < 'u'))
    return (
      console.warn(
        'WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.',
      ),
      n
    );
  let e = await bm(n);
  return btoa(e).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function At(n, t, e = false) {
  let r = vm(),
    i = r;
  (e && (i += '/recovery'), await Rt(n, `${t}-code-verifier`, i));
  let s = await ym(r);
  return [s, r === s ? 'plain' : 's256'];
}
var _m = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function Nu(n) {
  let t = n.headers.get(Dr);
  if (!t || !t.match(_m)) return null;
  try {
    return new Date(`${t}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
function Lu(n) {
  if (!n) throw new Error('Missing exp claim');
  let t = Math.floor(Date.now() / 1e3);
  if (n <= t) throw new Error('JWT has expired');
}
function Fu(n) {
  switch (n) {
    case 'RS256':
      return { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } };
    case 'ES256':
      return { name: 'ECDSA', namedCurve: 'P-256', hash: { name: 'SHA-256' } };
    default:
      throw new Error('Invalid alg claim');
  }
}
var wm = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function Fe(n) {
  if (!wm.test(n)) throw new Error('@supabase/auth-js: Expected parameter to be UUID but is not');
}
function me$1(n) {
  if (!n.passkey)
    throw new Error(
      '@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).',
    );
}
function ns() {
  let n = {};
  return new Proxy(n, {
    get: (t, e) => {
      if (e === '__isUserNotAvailableProxy') return true;
      if (typeof e == 'symbol') {
        let r = e.toString();
        if (
          r === 'Symbol(Symbol.toPrimitive)' ||
          r === 'Symbol(Symbol.toStringTag)' ||
          r === 'Symbol(util.inspect.custom)'
        )
          return;
      }
      throw new Error(
        `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${e}" property of the session object is not supported. Please use getUser() instead.`,
      );
    },
    set: (t, e) => {
      throw new Error(
        `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${e}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`,
      );
    },
    deleteProperty: (t, e) => {
      throw new Error(
        `@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${e}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`,
      );
    },
  });
}
function Uu(n, t) {
  return new Proxy(n, {
    get: (e, r, i) => {
      if (r === '__isInsecureUserWarningProxy') return true;
      if (typeof r == 'symbol') {
        let s = r.toString();
        if (
          s === 'Symbol(Symbol.toPrimitive)' ||
          s === 'Symbol(Symbol.toStringTag)' ||
          s === 'Symbol(util.inspect.custom)' ||
          s === 'Symbol(nodejs.util.inspect.custom)'
        )
          return Reflect.get(e, r, i);
      }
      return (
        !t.value &&
          typeof r == 'string' &&
          (console.warn(
            'Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.',
          ),
          (t.value = true)),
        Reflect.get(e, r, i)
      );
    },
  });
}
function Go(n) {
  return JSON.parse(JSON.stringify(n));
}
var It = (n) => {
    if (typeof n == 'object' && n !== null) {
      let t = n;
      if (typeof t.msg == 'string') return t.msg;
      if (typeof t.message == 'string') return t.message;
      if (typeof t.error_description == 'string') return t.error_description;
      if (typeof t.error == 'string') return t.error;
    }
    return JSON.stringify(n);
  },
  Em = [502, 503, 504, 520, 521, 522, 523, 524, 530];
async function ju(n) {
  var t;
  if (!xu(n)) throw new _n(It(n), 0);
  if (Em.includes(n.status)) throw new _n(It(n), n.status);
  let e;
  try {
    e = await n.json();
  } catch (s) {
    throw new Z(It(s), s);
  }
  let r,
    i = Nu(n);
  if (
    (i &&
    i.getTime() >= Vo['2024-01-01'].timestamp &&
    typeof e == 'object' &&
    e &&
    typeof e.code == 'string'
      ? (r = e.code)
      : typeof e == 'object' && e && typeof e.error_code == 'string' && (r = e.error_code),
    r)
  ) {
    if (r === 'weak_password')
      throw new Rr(
        It(e),
        n.status,
        ((t = e.weak_password) === null || t === void 0 ? void 0 : t.reasons) || [],
      );
    if (r === 'session_not_found') throw new z();
  } else if (
    typeof e == 'object' &&
    e &&
    typeof e.weak_password == 'object' &&
    e.weak_password &&
    Array.isArray(e.weak_password.reasons) &&
    e.weak_password.reasons.length &&
    e.weak_password.reasons.reduce((s, o) => s && typeof o == 'string', true)
  )
    throw new Rr(It(e), n.status, e.weak_password.reasons);
  throw new Yi(It(e), n.status || 500, r);
}
var Sm = (n, t, e, r) => {
  let i = { method: n, headers: t?.headers || {} };
  return n === 'GET'
    ? i
    : ((i.headers = Object.assign(
        { 'Content-Type': 'application/json;charset=UTF-8' },
        t?.headers,
      )),
      (i.body = JSON.stringify(r)),
      Object.assign(Object.assign({}, i), e));
};
async function E(n, t, e, r) {
  var i;
  let s = Object.assign({}, r?.headers);
  (s[Dr] || (s[Dr] = Vo['2024-01-01'].name), r?.jwt && (s.Authorization = `Bearer ${r.jwt}`));
  let o = (i = r?.query) !== null && i !== void 0 ? i : {};
  r?.redirectTo && (o.redirect_to = r.redirectTo);
  let a = Object.keys(o).length ? '?' + new URLSearchParams(o).toString() : '',
    c = await Dm(n, t, e + a, { headers: s, noResolveJson: r?.noResolveJson }, {}, r?.body);
  return r?.xform ? r?.xform(c) : { data: Object.assign({}, c), error: null };
}
async function Dm(n, t, e, r, i, s) {
  let o = Sm(t, r, i, s),
    a;
  try {
    a = await n(e, Object.assign({}, o));
  } catch (c) {
    throw (console.error(c), new _n(It(c), 0));
  }
  if ((a.ok || (await ju(a)), r?.noResolveJson)) return a;
  try {
    return await a.json();
  } catch (c) {
    await ju(c);
  }
}
function ge$1(n) {
  var t;
  let e = null;
  Tm(n) && ((e = Object.assign({}, n)), n.expires_at || (e.expires_at = Iu(n.expires_in)));
  let r = (t = n.user) !== null && t !== void 0 ? t : typeof n?.id == 'string' ? n : null;
  return { data: { session: e, user: r }, error: null };
}
function Wo(n) {
  let t = ge$1(n);
  return (
    !t.error &&
      n.weak_password &&
      typeof n.weak_password == 'object' &&
      Array.isArray(n.weak_password.reasons) &&
      n.weak_password.reasons.length &&
      n.weak_password.message &&
      typeof n.weak_password.message == 'string' &&
      n.weak_password.reasons.reduce((e, r) => e && typeof r == 'string', true) &&
      (t.data.weak_password = n.weak_password),
    t
  );
}
function Ue(n) {
  var t;
  return { data: { user: (t = n.user) !== null && t !== void 0 ? t : n }, error: null };
}
function Bu(n) {
  return { data: n, error: null };
}
function $u(n) {
  let { action_link: t, email_otp: e, hashed_token: r, redirect_to: i, verification_type: s } = n,
    o = GD(n, ['action_link', 'email_otp', 'hashed_token', 'redirect_to', 'verification_type']),
    a = { action_link: t, email_otp: e, hashed_token: r, redirect_to: i, verification_type: s },
    c = Object.assign({}, o);
  return { data: { properties: a, user: c }, error: null };
}
function Ko(n) {
  return n;
}
function Tm(n) {
  return !!n.access_token && !!n.refresh_token && !!n.expires_in;
}
var rs = ['global', 'local', 'others'];
var wn = class {
  constructor({ url: t = '', headers: e = {}, fetch: r, experimental: i }) {
    ((this.url = t),
      (this.headers = e),
      (this.fetch = ts(r)),
      (this.experimental = i ?? {}),
      (this.mfa = {
        listFactors: this._listFactors.bind(this),
        deleteFactor: this._deleteFactor.bind(this),
      }),
      (this.oauth = {
        listClients: this._listOAuthClients.bind(this),
        createClient: this._createOAuthClient.bind(this),
        getClient: this._getOAuthClient.bind(this),
        updateClient: this._updateOAuthClient.bind(this),
        deleteClient: this._deleteOAuthClient.bind(this),
        regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this),
      }),
      (this.customProviders = {
        listProviders: this._listCustomProviders.bind(this),
        createProvider: this._createCustomProvider.bind(this),
        getProvider: this._getCustomProvider.bind(this),
        updateProvider: this._updateCustomProvider.bind(this),
        deleteProvider: this._deleteCustomProvider.bind(this),
      }),
      (this.passkey = {
        listPasskeys: this._adminListPasskeys.bind(this),
        deletePasskey: this._adminDeletePasskey.bind(this),
      }));
  }
  async signOut(t, e = rs[0]) {
    if (rs.indexOf(e) < 0)
      throw new Error(`@supabase/auth-js: Parameter scope must be one of ${rs.join(', ')}`);
    try {
      return (
        await E(this.fetch, 'POST', `${this.url}/logout?scope=${e}`, {
          headers: this.headers,
          jwt: t,
          noResolveJson: !0,
        }),
        { data: null, error: null }
      );
    } catch (r) {
      if (_(r)) return { data: null, error: r };
      throw r;
    }
  }
  async inviteUserByEmail(t, e = {}) {
    try {
      return await E(this.fetch, 'POST', `${this.url}/invite`, {
        body: { email: t, data: e.data },
        headers: this.headers,
        redirectTo: e.redirectTo,
        xform: Ue,
      });
    } catch (r) {
      if (_(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async generateLink(t) {
    try {
      let { options: e } = t,
        r = GD(t, ['options']),
        i = Object.assign(Object.assign({}, r), e);
      return (
        'newEmail' in r && ((i.new_email = r?.newEmail), delete i.newEmail),
        await E(this.fetch, 'POST', `${this.url}/admin/generate_link`, {
          body: i,
          headers: this.headers,
          xform: $u,
          redirectTo: e?.redirectTo,
        })
      );
    } catch (e) {
      if (_(e)) return { data: { properties: null, user: null }, error: e };
      throw e;
    }
  }
  async createUser(t) {
    try {
      return await E(this.fetch, 'POST', `${this.url}/admin/users`, {
        body: t,
        headers: this.headers,
        xform: Ue,
      });
    } catch (e) {
      if (_(e)) return { data: { user: null }, error: e };
      throw e;
    }
  }
  async listUsers(t) {
    var e, r, i, s, o, a, c;
    try {
      let l = { nextPage: null, lastPage: 0, total: 0 },
        u = await E(this.fetch, 'GET', `${this.url}/admin/users`, {
          headers: this.headers,
          noResolveJson: !0,
          query: {
            page:
              (r = (e = t?.page) === null || e === void 0 ? void 0 : e.toString()) !== null &&
              r !== void 0
                ? r
                : '',
            per_page:
              (s = (i = t?.perPage) === null || i === void 0 ? void 0 : i.toString()) !== null &&
              s !== void 0
                ? s
                : '',
          },
          xform: Ko,
        });
      if (u.error) throw u.error;
      let d = await u.json(),
        h = (o = u.headers.get('x-total-count')) !== null && o !== void 0 ? o : 0,
        f =
          (c = (a = u.headers.get('link')) === null || a === void 0 ? void 0 : a.split(',')) !==
            null && c !== void 0
            ? c
            : [];
      return (
        f.length > 0 &&
          (f.forEach((p) => {
            let g = parseInt(p.split(';')[0].split('=')[1].substring(0, 1)),
              y = JSON.parse(p.split(';')[1].split('=')[1]);
            l[`${y}Page`] = g;
          }),
          (l.total = parseInt(h))),
        { data: Object.assign(Object.assign({}, d), l), error: null }
      );
    } catch (l) {
      if (_(l)) return { data: { users: [] }, error: l };
      throw l;
    }
  }
  async getUserById(t) {
    Fe(t);
    try {
      return await E(this.fetch, 'GET', `${this.url}/admin/users/${t}`, {
        headers: this.headers,
        xform: Ue,
      });
    } catch (e) {
      if (_(e)) return { data: { user: null }, error: e };
      throw e;
    }
  }
  async updateUserById(t, e) {
    Fe(t);
    try {
      return await E(this.fetch, 'PUT', `${this.url}/admin/users/${t}`, {
        body: e,
        headers: this.headers,
        xform: Ue,
      });
    } catch (r) {
      if (_(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async deleteUser(t, e = false) {
    Fe(t);
    try {
      return await E(this.fetch, 'DELETE', `${this.url}/admin/users/${t}`, {
        headers: this.headers,
        body: { should_soft_delete: e },
        xform: Ue,
      });
    } catch (r) {
      if (_(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async _listFactors(t) {
    Fe(t.userId);
    try {
      let { data: e, error: r } = await E(
        this.fetch,
        'GET',
        `${this.url}/admin/users/${t.userId}/factors`,
        { headers: this.headers, xform: (i) => ({ data: { factors: i }, error: null }) },
      );
      return { data: e, error: r };
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _deleteFactor(t) {
    (Fe(t.userId), Fe(t.id));
    try {
      return {
        data: await E(this.fetch, 'DELETE', `${this.url}/admin/users/${t.userId}/factors/${t.id}`, {
          headers: this.headers,
        }),
        error: null,
      };
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _listOAuthClients(t) {
    var e, r, i, s, o, a, c;
    try {
      let l = { nextPage: null, lastPage: 0, total: 0 },
        u = await E(this.fetch, 'GET', `${this.url}/admin/oauth/clients`, {
          headers: this.headers,
          noResolveJson: !0,
          query: {
            page:
              (r = (e = t?.page) === null || e === void 0 ? void 0 : e.toString()) !== null &&
              r !== void 0
                ? r
                : '',
            per_page:
              (s = (i = t?.perPage) === null || i === void 0 ? void 0 : i.toString()) !== null &&
              s !== void 0
                ? s
                : '',
          },
          xform: Ko,
        });
      if (u.error) throw u.error;
      let d = await u.json(),
        h = (o = u.headers.get('x-total-count')) !== null && o !== void 0 ? o : 0,
        f =
          (c = (a = u.headers.get('link')) === null || a === void 0 ? void 0 : a.split(',')) !==
            null && c !== void 0
            ? c
            : [];
      return (
        f.length > 0 &&
          (f.forEach((p) => {
            let g = parseInt(p.split(';')[0].split('=')[1].substring(0, 1)),
              y = JSON.parse(p.split(';')[1].split('=')[1]);
            l[`${y}Page`] = g;
          }),
          (l.total = parseInt(h))),
        { data: Object.assign(Object.assign({}, d), l), error: null }
      );
    } catch (l) {
      if (_(l)) return { data: { clients: [] }, error: l };
      throw l;
    }
  }
  async _createOAuthClient(t) {
    try {
      return await E(this.fetch, 'POST', `${this.url}/admin/oauth/clients`, {
        body: t,
        headers: this.headers,
        xform: (e) => ({ data: e, error: null }),
      });
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _getOAuthClient(t) {
    try {
      return await E(this.fetch, 'GET', `${this.url}/admin/oauth/clients/${t}`, {
        headers: this.headers,
        xform: (e) => ({ data: e, error: null }),
      });
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _updateOAuthClient(t, e) {
    try {
      return await E(this.fetch, 'PUT', `${this.url}/admin/oauth/clients/${t}`, {
        body: e,
        headers: this.headers,
        xform: (r) => ({ data: r, error: null }),
      });
    } catch (r) {
      if (_(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _deleteOAuthClient(t) {
    try {
      return (
        await E(this.fetch, 'DELETE', `${this.url}/admin/oauth/clients/${t}`, {
          headers: this.headers,
          noResolveJson: !0,
        }),
        { data: null, error: null }
      );
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _regenerateOAuthClientSecret(t) {
    try {
      return await E(this.fetch, 'POST', `${this.url}/admin/oauth/clients/${t}/regenerate_secret`, {
        headers: this.headers,
        xform: (e) => ({ data: e, error: null }),
      });
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _listCustomProviders(t) {
    try {
      let e = {};
      return (
        t?.type && (e.type = t.type),
        await E(this.fetch, 'GET', `${this.url}/admin/custom-providers`, {
          headers: this.headers,
          query: e,
          xform: (r) => {
            var i;
            return {
              data: { providers: (i = r?.providers) !== null && i !== void 0 ? i : [] },
              error: null,
            };
          },
        })
      );
    } catch (e) {
      if (_(e)) return { data: { providers: [] }, error: e };
      throw e;
    }
  }
  async _createCustomProvider(t) {
    try {
      return await E(this.fetch, 'POST', `${this.url}/admin/custom-providers`, {
        body: t,
        headers: this.headers,
        xform: (e) => ({ data: e, error: null }),
      });
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _getCustomProvider(t) {
    try {
      return await E(this.fetch, 'GET', `${this.url}/admin/custom-providers/${t}`, {
        headers: this.headers,
        xform: (e) => ({ data: e, error: null }),
      });
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _updateCustomProvider(t, e) {
    try {
      return await E(this.fetch, 'PUT', `${this.url}/admin/custom-providers/${t}`, {
        body: e,
        headers: this.headers,
        xform: (r) => ({ data: r, error: null }),
      });
    } catch (r) {
      if (_(r)) return { data: null, error: r };
      throw r;
    }
  }
  async _deleteCustomProvider(t) {
    try {
      return (
        await E(this.fetch, 'DELETE', `${this.url}/admin/custom-providers/${t}`, {
          headers: this.headers,
          noResolveJson: !0,
        }),
        { data: null, error: null }
      );
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _adminListPasskeys(t) {
    (me$1(this.experimental), Fe(t.userId));
    try {
      return await E(this.fetch, 'GET', `${this.url}/admin/users/${t.userId}/passkeys`, {
        headers: this.headers,
        xform: (e) => ({ data: e, error: null }),
      });
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
  async _adminDeletePasskey(t) {
    (me$1(this.experimental), Fe(t.userId), Fe(t.passkeyId));
    try {
      return (
        await E(
          this.fetch,
          'DELETE',
          `${this.url}/admin/users/${t.userId}/passkeys/${t.passkeyId}`,
          { headers: this.headers, noResolveJson: !0 },
        ),
        { data: null, error: null }
      );
    } catch (e) {
      if (_(e)) return { data: null, error: e };
      throw e;
    }
  }
};
function Jo(n = {}) {
  return {
    getItem: (t) => n[t] || null,
    setItem: (t, e) => {
      n[t] = e;
    },
    removeItem: (t) => {
      delete n[t];
    },
  };
}
({
  debug: !!(
    globalThis &&
    es() &&
    globalThis.localStorage &&
    globalThis.localStorage.getItem('supabase.gotrue-js.locks.debug') === 'true'
  ),
});
var is = class extends Error {
  constructor(t) {
    (super(t), (this.isAcquireTimeout = true));
  }
};
function zu() {
  if (typeof globalThis != 'object')
    try {
      (Object.defineProperty(Object.prototype, '__magic__', {
        get: function () {
          return this;
        },
        configurable: !0,
      }),
        (__magic__.globalThis = __magic__),
        delete Object.prototype.__magic__);
    } catch {
      typeof self < 'u' && (self.globalThis = self);
    }
}
function Yo(n) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(n))
    throw new Error(`@supabase/auth-js: Address "${n}" is invalid.`);
  return n.toLowerCase();
}
function Hu(n) {
  return parseInt(n, 16);
}
function Vu(n) {
  let t = new TextEncoder().encode(n);
  return '0x' + Array.from(t, (r) => r.toString(16).padStart(2, '0')).join('');
}
function qu(n) {
  var t;
  let {
    chainId: e,
    domain: r,
    expirationTime: i,
    issuedAt: s = new Date(),
    nonce: o,
    notBefore: a,
    requestId: c,
    resources: l,
    scheme: u,
    uri: d,
    version: h,
  } = n;
  {
    if (!Number.isInteger(e))
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${e}`,
      );
    if (!r)
      throw new Error(
        '@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.',
      );
    if (o && o.length < 8)
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`,
      );
    if (!d)
      throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
    if (h !== '1')
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${h}`,
      );
    if (
      !((t = n.statement) === null || t === void 0) &&
      t.includes(`
`)
    )
      throw new Error(
        `@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${n.statement}`,
      );
  }
  let f = Yo(n.address),
    p = u ? `${u}://${r}` : r,
    g = n.statement
      ? `${n.statement}
`
      : '',
    y = `${p} wants you to sign in with your Ethereum account:
${f}

${g}`,
    v = `URI: ${d}
Version: ${h}
Chain ID: ${e}${
      o
        ? `
Nonce: ${o}`
        : ''
    }
Issued At: ${s.toISOString()}`;
  if (
    (i &&
      (v += `
Expiration Time: ${i.toISOString()}`),
    a &&
      (v += `
Not Before: ${a.toISOString()}`),
    c &&
      (v += `
Request ID: ${c}`),
    l)
  ) {
    let D = `
Resources:`;
    for (let w of l) {
      if (!w || typeof w != 'string')
        throw new Error(
          `@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${w}`,
        );
      D += `
- ${w}`;
    }
    v += D;
  }
  return `${y}
${v}`;
}
var $ = class extends Error {
    constructor({ message: t, code: e, cause: r, name: i }) {
      var s;
      (super(t, { cause: r }),
        (this.__isWebAuthnError = true),
        (this.name =
          (s = i ?? (r instanceof Error ? r.name : void 0)) !== null && s !== void 0
            ? s
            : 'Unknown Error'),
        (this.code = e));
    }
    toJSON() {
      return { name: this.name, message: this.message, code: this.code };
    }
  },
  kt = class extends $ {
    constructor(t, e) {
      (super({ code: 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY', cause: e, message: t }),
        (this.name = 'WebAuthnUnknownError'),
        (this.originalError = e));
    }
  };
function Gu({ error: n, options: t }) {
  var e, r, i;
  let { publicKey: s } = t;
  if (!s) throw Error('options was missing required publicKey property');
  if (n.name === 'AbortError') {
    if (t.signal instanceof AbortSignal)
      return new $({
        message: 'Registration ceremony was sent an abort signal',
        code: 'ERROR_CEREMONY_ABORTED',
        cause: n,
      });
  } else if (n.name === 'ConstraintError') {
    if (
      ((e = s.authenticatorSelection) === null || e === void 0 ? void 0 : e.requireResidentKey) ===
      true
    )
      return new $({
        message:
          'Discoverable credentials were required but no available authenticator supported it',
        code: 'ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT',
        cause: n,
      });
    if (
      t.mediation === 'conditional' &&
      ((r = s.authenticatorSelection) === null || r === void 0 ? void 0 : r.userVerification) ===
        'required'
    )
      return new $({
        message:
          'User verification was required during automatic registration but it could not be performed',
        code: 'ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE',
        cause: n,
      });
    if (
      ((i = s.authenticatorSelection) === null || i === void 0 ? void 0 : i.userVerification) ===
      'required'
    )
      return new $({
        message: 'User verification was required but no available authenticator supported it',
        code: 'ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT',
        cause: n,
      });
  } else {
    if (n.name === 'InvalidStateError')
      return new $({
        message: 'The authenticator was previously registered',
        code: 'ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED',
        cause: n,
      });
    if (n.name === 'NotAllowedError')
      return new $({ message: n.message, code: 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY', cause: n });
    if (n.name === 'NotSupportedError')
      return s.pubKeyCredParams.filter((a) => a.type === 'public-key').length === 0
        ? new $({
            message: 'No entry in pubKeyCredParams was of type "public-key"',
            code: 'ERROR_MALFORMED_PUBKEYCREDPARAMS',
            cause: n,
          })
        : new $({
            message:
              'No available authenticator supported any of the specified pubKeyCredParams algorithms',
            code: 'ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG',
            cause: n,
          });
    if (n.name === 'SecurityError') {
      let o = window.location.hostname;
      if (Xo(o)) {
        if (s.rp.id !== o)
          return new $({
            message: `The RP ID "${s.rp.id}" is invalid for this domain`,
            code: 'ERROR_INVALID_RP_ID',
            cause: n,
          });
      } else
        return new $({
          message: `${window.location.hostname} is an invalid domain`,
          code: 'ERROR_INVALID_DOMAIN',
          cause: n,
        });
    } else if (n.name === 'TypeError') {
      if (s.user.id.byteLength < 1 || s.user.id.byteLength > 64)
        return new $({
          message: 'User ID was not between 1 and 64 characters',
          code: 'ERROR_INVALID_USER_ID_LENGTH',
          cause: n,
        });
    } else if (n.name === 'UnknownError')
      return new $({
        message:
          'The authenticator was unable to process the specified options, or could not create a new credential',
        code: 'ERROR_AUTHENTICATOR_GENERAL_ERROR',
        cause: n,
      });
  }
  return new $({
    message: 'a Non-Webauthn related error has occurred',
    code: 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY',
    cause: n,
  });
}
function Wu({ error: n, options: t }) {
  let { publicKey: e } = t;
  if (!e) throw Error('options was missing required publicKey property');
  if (n.name === 'AbortError') {
    if (t.signal instanceof AbortSignal)
      return new $({
        message: 'Authentication ceremony was sent an abort signal',
        code: 'ERROR_CEREMONY_ABORTED',
        cause: n,
      });
  } else {
    if (n.name === 'NotAllowedError')
      return new $({ message: n.message, code: 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY', cause: n });
    if (n.name === 'SecurityError') {
      let r = window.location.hostname;
      if (Xo(r)) {
        if (e.rpId !== r)
          return new $({
            message: `The RP ID "${e.rpId}" is invalid for this domain`,
            code: 'ERROR_INVALID_RP_ID',
            cause: n,
          });
      } else
        return new $({
          message: `${window.location.hostname} is an invalid domain`,
          code: 'ERROR_INVALID_DOMAIN',
          cause: n,
        });
    } else if (n.name === 'UnknownError')
      return new $({
        message:
          'The authenticator was unable to process the specified options, or could not create a new assertion signature',
        code: 'ERROR_AUTHENTICATOR_GENERAL_ERROR',
        cause: n,
      });
  }
  return new $({
    message: 'a Non-Webauthn related error has occurred',
    code: 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY',
    cause: n,
  });
}
var Zo = class {
    createNewAbortSignal() {
      if (this.controller) {
        let e = new Error('Cancelling existing WebAuthn API call for new one');
        ((e.name = 'AbortError'), this.controller.abort(e));
      }
      let t = new AbortController();
      return ((this.controller = t), t.signal);
    }
    cancelCeremony() {
      if (this.controller) {
        let t = new Error('Manually cancelling existing WebAuthn API call');
        ((t.name = 'AbortError'), this.controller.abort(t), (this.controller = void 0));
      }
    }
  },
  as = new Zo();
function Qo(n) {
  if (!n) throw new Error('Credential creation options are required');
  if (
    typeof PublicKeyCredential < 'u' &&
    'parseCreationOptionsFromJSON' in PublicKeyCredential &&
    typeof PublicKeyCredential.parseCreationOptionsFromJSON == 'function'
  )
    return PublicKeyCredential.parseCreationOptionsFromJSON(n);
  let { challenge: t, user: e, excludeCredentials: r } = n,
    i = GD(n, ['challenge', 'user', 'excludeCredentials']),
    s = ft(t).buffer,
    o = Object.assign(Object.assign({}, e), { id: ft(e.id).buffer }),
    a = Object.assign(Object.assign({}, i), { challenge: s, user: o });
  if (r && r.length > 0) {
    a.excludeCredentials = new Array(r.length);
    for (let c = 0; c < r.length; c++) {
      let l = r[c];
      a.excludeCredentials[c] = Object.assign(Object.assign({}, l), {
        id: ft(l.id).buffer,
        type: l.type || 'public-key',
        transports: l.transports,
      });
    }
  }
  return a;
}
function ea(n) {
  if (!n) throw new Error('Credential request options are required');
  if (
    typeof PublicKeyCredential < 'u' &&
    'parseRequestOptionsFromJSON' in PublicKeyCredential &&
    typeof PublicKeyCredential.parseRequestOptionsFromJSON == 'function'
  )
    return PublicKeyCredential.parseRequestOptionsFromJSON(n);
  let { challenge: t, allowCredentials: e } = n,
    r = GD(n, ['challenge', 'allowCredentials']),
    i = ft(t).buffer,
    s = Object.assign(Object.assign({}, r), { challenge: i });
  if (e && e.length > 0) {
    s.allowCredentials = new Array(e.length);
    for (let o = 0; o < e.length; o++) {
      let a = e[o];
      s.allowCredentials[o] = Object.assign(Object.assign({}, a), {
        id: ft(a.id).buffer,
        type: a.type || 'public-key',
        transports: a.transports,
      });
    }
  }
  return s;
}
function ta(n) {
  var t;
  if ('toJSON' in n && typeof n.toJSON == 'function') return n.toJSON();
  let e = n;
  return {
    id: n.id,
    rawId: n.id,
    response: {
      attestationObject: Ze(new Uint8Array(n.response.attestationObject)),
      clientDataJSON: Ze(new Uint8Array(n.response.clientDataJSON)),
    },
    type: 'public-key',
    clientExtensionResults: n.getClientExtensionResults(),
    authenticatorAttachment: (t = e.authenticatorAttachment) !== null && t !== void 0 ? t : void 0,
  };
}
function na(n) {
  var t;
  if ('toJSON' in n && typeof n.toJSON == 'function') return n.toJSON();
  let e = n,
    r = n.getClientExtensionResults(),
    i = n.response;
  return {
    id: n.id,
    rawId: n.id,
    response: {
      authenticatorData: Ze(new Uint8Array(i.authenticatorData)),
      clientDataJSON: Ze(new Uint8Array(i.clientDataJSON)),
      signature: Ze(new Uint8Array(i.signature)),
      userHandle: i.userHandle ? Ze(new Uint8Array(i.userHandle)) : void 0,
    },
    type: 'public-key',
    clientExtensionResults: r,
    authenticatorAttachment: (t = e.authenticatorAttachment) !== null && t !== void 0 ? t : void 0,
  };
}
function Xo(n) {
  return n === 'localhost' || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(n);
}
function Or() {
  var n, t;
  return !!(
    J() &&
    'PublicKeyCredential' in window &&
    window.PublicKeyCredential &&
    'credentials' in navigator &&
    typeof ((n = navigator?.credentials) === null || n === void 0 ? void 0 : n.create) ==
      'function' &&
    typeof ((t = navigator?.credentials) === null || t === void 0 ? void 0 : t.get) == 'function'
  );
}
async function ra(n) {
  try {
    let t = await navigator.credentials.create(n);
    return t
      ? t instanceof PublicKeyCredential
        ? { data: t, error: null }
        : { data: null, error: new kt('Browser returned unexpected credential type', t) }
      : { data: null, error: new kt('Empty credential response', t) };
  } catch (t) {
    return { data: null, error: Gu({ error: t, options: n }) };
  }
}
async function ia(n) {
  try {
    let t = await navigator.credentials.get(n);
    return t
      ? t instanceof PublicKeyCredential
        ? { data: t, error: null }
        : { data: null, error: new kt('Browser returned unexpected credential type', t) }
      : { data: null, error: new kt('Empty credential response', t) };
  } catch (t) {
    return { data: null, error: Wu({ error: t, options: n }) };
  }
}
var Rm = {
    hints: ['security-key'],
    authenticatorSelection: {
      authenticatorAttachment: 'cross-platform',
      requireResidentKey: false,
      userVerification: 'preferred',
      residentKey: 'discouraged',
    },
    attestation: 'direct',
  },
  Am = { userVerification: 'preferred', hints: ['security-key'], attestation: 'direct' };
function ss(...n) {
  let t = (i) => i !== null && typeof i == 'object' && !Array.isArray(i),
    e = (i) => i instanceof ArrayBuffer || ArrayBuffer.isView(i),
    r = {};
  for (let i of n)
    if (i)
      for (let s in i) {
        let o = i[s];
        if (o !== void 0)
          if (Array.isArray(o)) r[s] = o;
          else if (e(o)) r[s] = o;
          else if (t(o)) {
            let a = r[s];
            t(a) ? (r[s] = ss(a, o)) : (r[s] = ss(o));
          } else r[s] = o;
      }
  return r;
}
function Im(n, t) {
  return ss(Rm, n, t || {});
}
function km(n, t) {
  return ss(Am, n, t || {});
}
var os = class {
  constructor(t) {
    ((this.client = t),
      (this.enroll = this._enroll.bind(this)),
      (this.challenge = this._challenge.bind(this)),
      (this.verify = this._verify.bind(this)),
      (this.authenticate = this._authenticate.bind(this)),
      (this.register = this._register.bind(this)));
  }
  async _enroll(t) {
    return this.client.mfa.enroll(Object.assign(Object.assign({}, t), { factorType: 'webauthn' }));
  }
  async _challenge({ factorId: t, webauthn: e, friendlyName: r, signal: i }, s) {
    var o;
    try {
      let { data: a, error: c } = await this.client.mfa.challenge({ factorId: t, webauthn: e });
      if (!a) return { data: null, error: c };
      let l = i ?? as.createNewAbortSignal();
      if (a.webauthn.type === 'create') {
        let { user: u } = a.webauthn.credential_options.publicKey;
        if (!u.name) {
          let d = r;
          if (d) u.name = `${u.id}:${d}`;
          else {
            let f = (await this.client.getUser()).data.user,
              p =
                ((o = f?.user_metadata) === null || o === void 0 ? void 0 : o.name) ||
                f?.email ||
                f?.id ||
                'User';
            u.name = `${u.id}:${p}`;
          }
        }
        u.displayName || (u.displayName = u.name);
      }
      switch (a.webauthn.type) {
        case 'create': {
          let u = Im(a.webauthn.credential_options.publicKey, s?.create),
            { data: d, error: h } = await ra({ publicKey: u, signal: l });
          return d
            ? {
                data: {
                  factorId: t,
                  challengeId: a.id,
                  webauthn: { type: a.webauthn.type, credential_response: d },
                },
                error: null,
              }
            : { data: null, error: h };
        }
        case 'request': {
          let u = km(a.webauthn.credential_options.publicKey, s?.request),
            { data: d, error: h } = await ia(
              Object.assign(Object.assign({}, a.webauthn.credential_options), {
                publicKey: u,
                signal: l,
              }),
            );
          return d
            ? {
                data: {
                  factorId: t,
                  challengeId: a.id,
                  webauthn: { type: a.webauthn.type, credential_response: d },
                },
                error: null,
              }
            : { data: null, error: h };
        }
      }
    } catch (a) {
      return _(a)
        ? { data: null, error: a }
        : { data: null, error: new Z('Unexpected error in challenge', a) };
    }
  }
  async _verify({ challengeId: t, factorId: e, webauthn: r }) {
    return this.client.mfa.verify({ factorId: e, challengeId: t, webauthn: r });
  }
  async _authenticate(
    {
      factorId: t,
      webauthn: {
        rpId: e = typeof window < 'u' ? window.location.hostname : void 0,
        rpOrigins: r = typeof window < 'u' ? [window.location.origin] : void 0,
        signal: i,
      } = {},
    },
    s,
  ) {
    if (!e) return { data: null, error: new dt('rpId is required for WebAuthn authentication') };
    try {
      if (!Or()) return { data: null, error: new Z('Browser does not support WebAuthn', null) };
      let { data: o, error: a } = await this.challenge(
        { factorId: t, webauthn: { rpId: e, rpOrigins: r }, signal: i },
        { request: s },
      );
      if (!o) return { data: null, error: a };
      let { webauthn: c } = o;
      return this._verify({
        factorId: t,
        challengeId: o.challengeId,
        webauthn: {
          type: c.type,
          rpId: e,
          rpOrigins: r,
          credential_response: c.credential_response,
        },
      });
    } catch (o) {
      return _(o)
        ? { data: null, error: o }
        : { data: null, error: new Z('Unexpected error in authenticate', o) };
    }
  }
  async _register(
    {
      friendlyName: t,
      webauthn: {
        rpId: e = typeof window < 'u' ? window.location.hostname : void 0,
        rpOrigins: r = typeof window < 'u' ? [window.location.origin] : void 0,
        signal: i,
      } = {},
    },
    s,
  ) {
    if (!e) return { data: null, error: new dt('rpId is required for WebAuthn registration') };
    try {
      if (!Or()) return { data: null, error: new Z('Browser does not support WebAuthn', null) };
      let { data: o, error: a } = await this._enroll({ friendlyName: t });
      if (!o)
        return (
          await this.client.mfa
            .listFactors()
            .then((u) => {
              var d;
              return (d = u.data) === null || d === void 0
                ? void 0
                : d.all.find(
                    (h) =>
                      h.factor_type === 'webauthn' &&
                      h.friendly_name === t &&
                      h.status !== 'unverified',
                  );
            })
            .then((u) => (u ? this.client.mfa.unenroll({ factorId: u?.id }) : void 0)),
          { data: null, error: a }
        );
      let { data: c, error: l } = await this._challenge(
        {
          factorId: o.id,
          friendlyName: o.friendly_name,
          webauthn: { rpId: e, rpOrigins: r },
          signal: i,
        },
        { create: s },
      );
      return c
        ? this._verify({
            factorId: o.id,
            challengeId: c.challengeId,
            webauthn: {
              rpId: e,
              rpOrigins: r,
              type: c.webauthn.type,
              credential_response: c.webauthn.credential_response,
            },
          })
        : { data: null, error: l };
    } catch (o) {
      return _(o)
        ? { data: null, error: o }
        : { data: null, error: new Z('Unexpected error in register', o) };
    }
  }
};
zu();
var Om = {
  url: vu,
  storageKey: bu,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  headers: yu,
  flowType: 'implicit',
  debug: false,
  hasCustomAuthorizationHeader: false,
  throwOnError: false,
  lockAcquireTimeout: 5e3,
  skipAutoInitialize: false,
  experimental: {},
};
var En = {},
  xm = (() => {
    class n {
      get jwks() {
        var e, r;
        return (r = (e = En[this.storageKey]) === null || e === void 0 ? void 0 : e.jwks) !==
          null && r !== void 0
          ? r
          : { keys: [] };
      }
      set jwks(e) {
        En[this.storageKey] = Object.assign(Object.assign({}, En[this.storageKey]), { jwks: e });
      }
      get jwks_cached_at() {
        var e, r;
        return (r = (e = En[this.storageKey]) === null || e === void 0 ? void 0 : e.cachedAt) !==
          null && r !== void 0
          ? r
          : Number.MIN_SAFE_INTEGER;
      }
      set jwks_cached_at(e) {
        En[this.storageKey] = Object.assign(Object.assign({}, En[this.storageKey]), {
          cachedAt: e,
        });
      }
      constructor(e) {
        var r, i, s;
        ((this.userStorage = null),
          (this.memoryStorage = null),
          (this.stateChangeEmitters = new Map()),
          (this.autoRefreshTicker = null),
          (this.autoRefreshTickTimeout = null),
          (this.visibilityChangedCallback = null),
          (this.refreshingDeferred = null),
          (this._sessionRemovalEpoch = 0),
          (this.initializePromise = null),
          (this.detectSessionInUrl = true),
          (this.hasCustomAuthorizationHeader = false),
          (this.suppressGetSessionWarning = false),
          (this.lock = null),
          (this.lockAcquired = false),
          (this.pendingInLock = []),
          (this.broadcastChannel = null),
          (this.logger = console.log));
        let o = Object.assign(Object.assign({}, Om), e);
        if (
          ((this.storageKey = o.storageKey),
          (this.instanceID =
            (r = n.nextInstanceID[this.storageKey]) !== null && r !== void 0 ? r : 0),
          (n.nextInstanceID[this.storageKey] = this.instanceID + 1),
          (this.logDebugMessages = !!o.debug),
          typeof o.debug == 'function' && (this.logger = o.debug),
          this.instanceID > 0 && J())
        ) {
          let a = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
          (console.warn(a), this.logDebugMessages && console.trace(a));
        }
        if (
          ((this.persistSession = o.persistSession),
          (this.autoRefreshToken = o.autoRefreshToken),
          (this.experimental = (i = o.experimental) !== null && i !== void 0 ? i : {}),
          (this.admin = new wn({
            url: o.url,
            headers: o.headers,
            fetch: o.fetch,
            experimental: this.experimental,
          })),
          (this.url = o.url),
          (this.headers = o.headers),
          (this.fetch = ts(o.fetch)),
          (this.detectSessionInUrl = o.detectSessionInUrl),
          (this.flowType = o.flowType),
          (this.hasCustomAuthorizationHeader = o.hasCustomAuthorizationHeader),
          (this.throwOnError = o.throwOnError),
          (this.lockAcquireTimeout = o.lockAcquireTimeout),
          o.lock != null && (this.lock = o.lock),
          this.jwks ||
            ((this.jwks = { keys: [] }), (this.jwks_cached_at = Number.MIN_SAFE_INTEGER)),
          (this.mfa = {
            verify: this._verify.bind(this),
            enroll: this._enroll.bind(this),
            unenroll: this._unenroll.bind(this),
            challenge: this._challenge.bind(this),
            listFactors: this._listFactors.bind(this),
            challengeAndVerify: this._challengeAndVerify.bind(this),
            getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
            webauthn: new os(this),
          }),
          (this.oauth = {
            getAuthorizationDetails: this._getAuthorizationDetails.bind(this),
            approveAuthorization: this._approveAuthorization.bind(this),
            denyAuthorization: this._denyAuthorization.bind(this),
            listGrants: this._listOAuthGrants.bind(this),
            revokeGrant: this._revokeOAuthGrant.bind(this),
          }),
          (this.passkey = {
            startRegistration: this._startPasskeyRegistration.bind(this),
            verifyRegistration: this._verifyPasskeyRegistration.bind(this),
            startAuthentication: this._startPasskeyAuthentication.bind(this),
            verifyAuthentication: this._verifyPasskeyAuthentication.bind(this),
            list: this._listPasskeys.bind(this),
            update: this._updatePasskey.bind(this),
            delete: this._deletePasskey.bind(this),
          }),
          this.persistSession
            ? (o.storage
                ? (this.storage = o.storage)
                : es()
                  ? (this.storage = globalThis.localStorage)
                  : ((this.memoryStorage = {}), (this.storage = Jo(this.memoryStorage))),
              o.userStorage && (this.userStorage = o.userStorage))
            : ((this.memoryStorage = {}), (this.storage = Jo(this.memoryStorage))),
          J() && globalThis.BroadcastChannel && this.persistSession && this.storageKey)
        ) {
          try {
            this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
          } catch (a) {
            console.error(
              'Failed to create a new BroadcastChannel, multi-tab state changes will not be available',
              a,
            );
          }
          (s = this.broadcastChannel) === null ||
            s === void 0 ||
            s.addEventListener('message', async (a) => {
              this._debug('received broadcast notification from other tab or client', a);
              try {
                await this._notifyAllSubscribers(a.data.event, a.data.session, !1);
              } catch (c) {
                this._debug('#broadcastChannel', 'error', c);
              }
            });
        }
        o.skipAutoInitialize ||
          this.initialize().catch((a) => {
            this._debug('#initialize()', 'error', a);
          });
      }
      isThrowOnErrorEnabled() {
        return this.throwOnError;
      }
      _returnResult(e) {
        if (this.throwOnError && e && e.error) throw e.error;
        return e;
      }
      _logPrefix() {
        return `GoTrueClient@${this.storageKey}:${this.instanceID} (${Ki}) ${new Date().toISOString()}`;
      }
      _debug(...e) {
        return (this.logDebugMessages && this.logger(this._logPrefix(), ...e), this);
      }
      async initialize() {
        return this.initializePromise
          ? await this.initializePromise
          : ((this.initializePromise = (async () =>
              this.lock != null
                ? await this._acquireLock(
                    this.lockAcquireTimeout,
                    async () => await this._initialize(),
                  )
                : await this._initialize())()),
            await this.initializePromise);
      }
      async _initialize() {
        var e;
        try {
          let r = {},
            i = 'none';
          if (
            (J() &&
              ((r = Ou(window.location.href)),
              this._isImplicitGrantCallback(r)
                ? (i = 'implicit')
                : (await this._isPKCECallback(r)) && (i = 'pkce')),
            J() && this.detectSessionInUrl && i !== 'none')
          ) {
            let { data: s, error: o } = await this._getSessionFromURL(r, i);
            if (o) {
              if ((this._debug('#_initialize()', 'error detecting session from URL', o), Su(o))) {
                let l = (e = o.details) === null || e === void 0 ? void 0 : e.code;
                if (
                  l === 'identity_already_exists' ||
                  l === 'identity_not_found' ||
                  l === 'single_identity_not_deletable'
                )
                  return { error: o };
              }
              return { error: o };
            }
            let { session: a, redirectType: c } = s;
            return (
              this._debug('#_initialize()', 'detected session in URL', a, 'redirect type', c),
              await this._saveSession(a),
              setTimeout(async () => {
                c === 'recovery'
                  ? await this._notifyAllSubscribers('PASSWORD_RECOVERY', a)
                  : await this._notifyAllSubscribers('SIGNED_IN', a);
              }, 0),
              { error: null }
            );
          }
          return (await this._recoverAndRefresh(), { error: null });
        } catch (r) {
          return _(r)
            ? this._returnResult({ error: r })
            : this._returnResult({ error: new Z('Unexpected error during initialization', r) });
        } finally {
          (await this._handleVisibilityChange(), this._debug('#_initialize()', 'end'));
        }
      }
      async signInAnonymously(e) {
        var r, i, s;
        try {
          let o = await E(this.fetch, 'POST', `${this.url}/signup`, {
              headers: this.headers,
              body: {
                data:
                  (i = (r = e?.options) === null || r === void 0 ? void 0 : r.data) !== null &&
                  i !== void 0
                    ? i
                    : {},
                gotrue_meta_security: {
                  captcha_token:
                    (s = e?.options) === null || s === void 0 ? void 0 : s.captchaToken,
                },
              },
              xform: ge$1,
            }),
            { data: a, error: c } = o;
          if (c || !a) return this._returnResult({ data: { user: null, session: null }, error: c });
          let l = a.session,
            u = a.user;
          return (
            a.session &&
              (await this._saveSession(a.session),
              await this._notifyAllSubscribers('SIGNED_IN', l)),
            this._returnResult({ data: { user: u, session: l }, error: null })
          );
        } catch (o) {
          if (_(o)) return this._returnResult({ data: { user: null, session: null }, error: o });
          throw o;
        }
      }
      async signUp(e) {
        var r, i, s;
        try {
          let o;
          if ('email' in e) {
            let { email: d, password: h, options: f } = e,
              p = null,
              g = null;
            (this.flowType === 'pkce' && ([p, g] = await At(this.storage, this.storageKey)),
              (o = await E(this.fetch, 'POST', `${this.url}/signup`, {
                headers: this.headers,
                redirectTo: f?.emailRedirectTo,
                body: {
                  email: d,
                  password: h,
                  data: (r = f?.data) !== null && r !== void 0 ? r : {},
                  gotrue_meta_security: { captcha_token: f?.captchaToken },
                  code_challenge: p,
                  code_challenge_method: g,
                },
                xform: ge$1,
              })));
          } else if ('phone' in e) {
            let { phone: d, password: h, options: f } = e;
            o = await E(this.fetch, 'POST', `${this.url}/signup`, {
              headers: this.headers,
              body: {
                phone: d,
                password: h,
                data: (i = f?.data) !== null && i !== void 0 ? i : {},
                channel: (s = f?.channel) !== null && s !== void 0 ? s : 'sms',
                gotrue_meta_security: { captcha_token: f?.captchaToken },
              },
              xform: ge$1,
            });
          } else throw new Dt('You must provide either an email or phone number and a password');
          let { data: a, error: c } = o;
          if (c || !a)
            return (
              await G(this.storage, `${this.storageKey}-code-verifier`),
              this._returnResult({ data: { user: null, session: null }, error: c })
            );
          let l = a.session,
            u = a.user;
          return (
            a.session &&
              (await this._saveSession(a.session),
              await this._notifyAllSubscribers('SIGNED_IN', l)),
            this._returnResult({ data: { user: u, session: l }, error: null })
          );
        } catch (o) {
          if ((await G(this.storage, `${this.storageKey}-code-verifier`), _(o)))
            return this._returnResult({ data: { user: null, session: null }, error: o });
          throw o;
        }
      }
      async signInWithPassword(e) {
        try {
          let r;
          if ('email' in e) {
            let { email: o, password: a, options: c } = e;
            r = await E(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
              headers: this.headers,
              body: {
                email: o,
                password: a,
                gotrue_meta_security: { captcha_token: c?.captchaToken },
              },
              xform: Wo,
            });
          } else if ('phone' in e) {
            let { phone: o, password: a, options: c } = e;
            r = await E(this.fetch, 'POST', `${this.url}/token?grant_type=password`, {
              headers: this.headers,
              body: {
                phone: o,
                password: a,
                gotrue_meta_security: { captcha_token: c?.captchaToken },
              },
              xform: Wo,
            });
          } else throw new Dt('You must provide either an email or phone number and a password');
          let { data: i, error: s } = r;
          if (s) return this._returnResult({ data: { user: null, session: null }, error: s });
          if (!i || !i.session || !i.user) {
            let o = new Xe();
            return this._returnResult({ data: { user: null, session: null }, error: o });
          }
          return (
            i.session &&
              (await this._saveSession(i.session),
              await this._notifyAllSubscribers('SIGNED_IN', i.session)),
            this._returnResult({
              data: Object.assign(
                { user: i.user, session: i.session },
                i.weak_password ? { weakPassword: i.weak_password } : null,
              ),
              error: s,
            })
          );
        } catch (r) {
          if (_(r)) return this._returnResult({ data: { user: null, session: null }, error: r });
          throw r;
        }
      }
      async signInWithOAuth(e) {
        var r, i, s, o;
        return await this._handleProviderSignIn(e.provider, {
          redirectTo: (r = e.options) === null || r === void 0 ? void 0 : r.redirectTo,
          scopes: (i = e.options) === null || i === void 0 ? void 0 : i.scopes,
          queryParams: (s = e.options) === null || s === void 0 ? void 0 : s.queryParams,
          skipBrowserRedirect:
            (o = e.options) === null || o === void 0 ? void 0 : o.skipBrowserRedirect,
        });
      }
      async exchangeCodeForSession(e) {
        return (
          await this.initializePromise,
          this.lock != null
            ? this._acquireLock(this.lockAcquireTimeout, async () =>
                this._exchangeCodeForSession(e),
              )
            : this._exchangeCodeForSession(e)
        );
      }
      async signInWithWeb3(e) {
        let { chain: r } = e;
        switch (r) {
          case 'ethereum':
            return await this.signInWithEthereum(e);
          case 'solana':
            return await this.signInWithSolana(e);
          default:
            throw new Error(`@supabase/auth-js: Unsupported chain "${r}"`);
        }
      }
      async signInWithEthereum(e) {
        var r, i, s, o, a, c, l, u, d, h, f;
        let p, g;
        if ('message' in e) ((p = e.message), (g = e.signature));
        else {
          let { chain: y, wallet: v, statement: D, options: w } = e,
            S;
          if (J())
            if (typeof v == 'object') S = v;
            else {
              let Q = window;
              if (
                'ethereum' in Q &&
                typeof Q.ethereum == 'object' &&
                'request' in Q.ethereum &&
                typeof Q.ethereum.request == 'function'
              )
                S = Q.ethereum;
              else
                throw new Error(
                  "@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.",
                );
            }
          else {
            if (typeof v != 'object' || !w?.url)
              throw new Error(
                '@supabase/auth-js: Both wallet and url must be specified in non-browser environments.',
              );
            S = v;
          }
          let P = new URL((r = w?.url) !== null && r !== void 0 ? r : window.location.href),
            W = await S.request({ method: 'eth_requestAccounts' })
              .then((Q) => Q)
              .catch(() => {
                throw new Error(
                  '@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid',
                );
              });
          if (!W || W.length === 0)
            throw new Error(
              '@supabase/auth-js: No accounts available. Please ensure the wallet is connected.',
            );
          let N = Yo(W[0]),
            B = (i = w?.signInWithEthereum) === null || i === void 0 ? void 0 : i.chainId;
          if (!B) {
            let Q = await S.request({ method: 'eth_chainId' });
            B = Hu(Q);
          }
          let je = {
            domain: P.host,
            address: N,
            statement: D,
            uri: P.href,
            version: '1',
            chainId: B,
            nonce: (s = w?.signInWithEthereum) === null || s === void 0 ? void 0 : s.nonce,
            issuedAt:
              (a = (o = w?.signInWithEthereum) === null || o === void 0 ? void 0 : o.issuedAt) !==
                null && a !== void 0
                ? a
                : new Date(),
            expirationTime:
              (c = w?.signInWithEthereum) === null || c === void 0 ? void 0 : c.expirationTime,
            notBefore: (l = w?.signInWithEthereum) === null || l === void 0 ? void 0 : l.notBefore,
            requestId: (u = w?.signInWithEthereum) === null || u === void 0 ? void 0 : u.requestId,
            resources: (d = w?.signInWithEthereum) === null || d === void 0 ? void 0 : d.resources,
          };
          ((p = qu(je)), (g = await S.request({ method: 'personal_sign', params: [Vu(p), N] })));
        }
        try {
          let { data: y, error: v } = await E(
            this.fetch,
            'POST',
            `${this.url}/token?grant_type=web3`,
            {
              headers: this.headers,
              body: Object.assign(
                { chain: 'ethereum', message: p, signature: g },
                !((h = e.options) === null || h === void 0) && h.captchaToken
                  ? {
                      gotrue_meta_security: {
                        captcha_token:
                          (f = e.options) === null || f === void 0 ? void 0 : f.captchaToken,
                      },
                    }
                  : null,
              ),
              xform: ge$1,
            },
          );
          if (v) throw v;
          if (!y || !y.session || !y.user) {
            let D = new Xe();
            return this._returnResult({ data: { user: null, session: null }, error: D });
          }
          return (
            y.session &&
              (await this._saveSession(y.session),
              await this._notifyAllSubscribers('SIGNED_IN', y.session)),
            this._returnResult({ data: Object.assign({}, y), error: v })
          );
        } catch (y) {
          if (_(y)) return this._returnResult({ data: { user: null, session: null }, error: y });
          throw y;
        }
      }
      async signInWithSolana(e) {
        var r, i, s, o, a, c, l, u, d, h, f, p;
        let g, y;
        if ('message' in e) ((g = e.message), (y = e.signature));
        else {
          let { chain: v, wallet: D, statement: w, options: S } = e,
            P;
          if (J())
            if (typeof D == 'object') P = D;
            else {
              let N = window;
              if (
                'solana' in N &&
                typeof N.solana == 'object' &&
                (('signIn' in N.solana && typeof N.solana.signIn == 'function') ||
                  ('signMessage' in N.solana && typeof N.solana.signMessage == 'function'))
              )
                P = N.solana;
              else
                throw new Error(
                  "@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.",
                );
            }
          else {
            if (typeof D != 'object' || !S?.url)
              throw new Error(
                '@supabase/auth-js: Both wallet and url must be specified in non-browser environments.',
              );
            P = D;
          }
          let W = new URL((r = S?.url) !== null && r !== void 0 ? r : window.location.href);
          if ('signIn' in P && P.signIn) {
            let N = await P.signIn(
                Object.assign(
                  Object.assign(
                    Object.assign({ issuedAt: new Date().toISOString() }, S?.signInWithSolana),
                    { version: '1', domain: W.host, uri: W.href },
                  ),
                  w ? { statement: w } : null,
                ),
              ),
              B;
            if (Array.isArray(N) && N[0] && typeof N[0] == 'object') B = N[0];
            else if (N && typeof N == 'object' && 'signedMessage' in N && 'signature' in N) B = N;
            else
              throw new Error(
                '@supabase/auth-js: Wallet method signIn() returned unrecognized value',
              );
            if (
              'signedMessage' in B &&
              'signature' in B &&
              (typeof B.signedMessage == 'string' || B.signedMessage instanceof Uint8Array) &&
              B.signature instanceof Uint8Array
            )
              ((g =
                typeof B.signedMessage == 'string'
                  ? B.signedMessage
                  : new TextDecoder().decode(B.signedMessage)),
                (y = B.signature));
            else
              throw new Error(
                '@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields',
              );
          } else {
            if (
              !('signMessage' in P) ||
              typeof P.signMessage != 'function' ||
              !('publicKey' in P) ||
              typeof P != 'object' ||
              !P.publicKey ||
              !('toBase58' in P.publicKey) ||
              typeof P.publicKey.toBase58 != 'function'
            )
              throw new Error(
                '@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API',
              );
            g = [
              `${W.host} wants you to sign in with your Solana account:`,
              P.publicKey.toBase58(),
              ...(w ? ['', w, ''] : ['']),
              'Version: 1',
              `URI: ${W.href}`,
              `Issued At: ${(s = (i = S?.signInWithSolana) === null || i === void 0 ? void 0 : i.issuedAt) !== null && s !== void 0 ? s : new Date().toISOString()}`,
              ...(!((o = S?.signInWithSolana) === null || o === void 0) && o.notBefore
                ? [`Not Before: ${S.signInWithSolana.notBefore}`]
                : []),
              ...(!((a = S?.signInWithSolana) === null || a === void 0) && a.expirationTime
                ? [`Expiration Time: ${S.signInWithSolana.expirationTime}`]
                : []),
              ...(!((c = S?.signInWithSolana) === null || c === void 0) && c.chainId
                ? [`Chain ID: ${S.signInWithSolana.chainId}`]
                : []),
              ...(!((l = S?.signInWithSolana) === null || l === void 0) && l.nonce
                ? [`Nonce: ${S.signInWithSolana.nonce}`]
                : []),
              ...(!((u = S?.signInWithSolana) === null || u === void 0) && u.requestId
                ? [`Request ID: ${S.signInWithSolana.requestId}`]
                : []),
              ...(!(
                (h = (d = S?.signInWithSolana) === null || d === void 0 ? void 0 : d.resources) ===
                  null || h === void 0
              ) && h.length
                ? ['Resources', ...S.signInWithSolana.resources.map((B) => `- ${B}`)]
                : []),
            ].join(`
`);
            let N = await P.signMessage(new TextEncoder().encode(g), 'utf8');
            if (!N || !(N instanceof Uint8Array))
              throw new Error(
                '@supabase/auth-js: Wallet signMessage() API returned an recognized value',
              );
            y = N;
          }
        }
        try {
          let { data: v, error: D } = await E(
            this.fetch,
            'POST',
            `${this.url}/token?grant_type=web3`,
            {
              headers: this.headers,
              body: Object.assign(
                { chain: 'solana', message: g, signature: Ze(y) },
                !((f = e.options) === null || f === void 0) && f.captchaToken
                  ? {
                      gotrue_meta_security: {
                        captcha_token:
                          (p = e.options) === null || p === void 0 ? void 0 : p.captchaToken,
                      },
                    }
                  : null,
              ),
              xform: ge$1,
            },
          );
          if (D) throw D;
          if (!v || !v.session || !v.user) {
            let w = new Xe();
            return this._returnResult({ data: { user: null, session: null }, error: w });
          }
          return (
            v.session &&
              (await this._saveSession(v.session),
              await this._notifyAllSubscribers('SIGNED_IN', v.session)),
            this._returnResult({ data: Object.assign({}, v), error: D })
          );
        } catch (v) {
          if (_(v)) return this._returnResult({ data: { user: null, session: null }, error: v });
          throw v;
        }
      }
      async _exchangeCodeForSession(e) {
        let r = await Le(this.storage, `${this.storageKey}-code-verifier`),
          [i, s] = (r ?? '').split('/');
        try {
          if (!i && this.flowType === 'pkce') throw new Xi();
          let { data: o, error: a } = await E(
            this.fetch,
            'POST',
            `${this.url}/token?grant_type=pkce`,
            { headers: this.headers, body: { auth_code: e, code_verifier: i }, xform: ge$1 },
          );
          if ((await G(this.storage, `${this.storageKey}-code-verifier`), a)) throw a;
          if (!o || !o.session || !o.user) {
            let c = new Xe();
            return this._returnResult({
              data: { user: null, session: null, redirectType: null },
              error: c,
            });
          }
          return (
            o.session &&
              (await this._saveSession(o.session),
              await this._notifyAllSubscribers(
                s === 'recovery' ? 'PASSWORD_RECOVERY' : 'SIGNED_IN',
                o.session,
              )),
            this._returnResult({
              data: Object.assign(Object.assign({}, o), { redirectType: s ?? null }),
              error: a,
            })
          );
        } catch (o) {
          if ((await G(this.storage, `${this.storageKey}-code-verifier`), _(o)))
            return this._returnResult({
              data: { user: null, session: null, redirectType: null },
              error: o,
            });
          throw o;
        }
      }
      async signInWithIdToken(e) {
        try {
          let { options: r, provider: i, token: s, access_token: o, nonce: a } = e,
            c = await E(this.fetch, 'POST', `${this.url}/token?grant_type=id_token`, {
              headers: this.headers,
              body: {
                provider: i,
                id_token: s,
                access_token: o,
                nonce: a,
                gotrue_meta_security: { captcha_token: r?.captchaToken },
              },
              xform: ge$1,
            }),
            { data: l, error: u } = c;
          if (u) return this._returnResult({ data: { user: null, session: null }, error: u });
          if (!l || !l.session || !l.user) {
            let d = new Xe();
            return this._returnResult({ data: { user: null, session: null }, error: d });
          }
          return (
            l.session &&
              (await this._saveSession(l.session),
              await this._notifyAllSubscribers('SIGNED_IN', l.session)),
            this._returnResult({ data: l, error: u })
          );
        } catch (r) {
          if (_(r)) return this._returnResult({ data: { user: null, session: null }, error: r });
          throw r;
        }
      }
      async signInWithOtp(e) {
        var r, i, s, o, a;
        try {
          if ('email' in e) {
            let { email: c, options: l } = e,
              u = null,
              d = null;
            this.flowType === 'pkce' && ([u, d] = await At(this.storage, this.storageKey));
            let { error: h } = await E(this.fetch, 'POST', `${this.url}/otp`, {
              headers: this.headers,
              body: {
                email: c,
                data: (r = l?.data) !== null && r !== void 0 ? r : {},
                create_user: (i = l?.shouldCreateUser) !== null && i !== void 0 ? i : !0,
                gotrue_meta_security: { captcha_token: l?.captchaToken },
                code_challenge: u,
                code_challenge_method: d,
              },
              redirectTo: l?.emailRedirectTo,
            });
            return this._returnResult({ data: { user: null, session: null }, error: h });
          }
          if ('phone' in e) {
            let { phone: c, options: l } = e,
              { data: u, error: d } = await E(this.fetch, 'POST', `${this.url}/otp`, {
                headers: this.headers,
                body: {
                  phone: c,
                  data: (s = l?.data) !== null && s !== void 0 ? s : {},
                  create_user: (o = l?.shouldCreateUser) !== null && o !== void 0 ? o : !0,
                  gotrue_meta_security: { captcha_token: l?.captchaToken },
                  channel: (a = l?.channel) !== null && a !== void 0 ? a : 'sms',
                },
              });
            return this._returnResult({
              data: { user: null, session: null, messageId: u?.message_id },
              error: d,
            });
          }
          throw new Dt('You must provide either an email or phone number.');
        } catch (c) {
          if ((await G(this.storage, `${this.storageKey}-code-verifier`), _(c)))
            return this._returnResult({ data: { user: null, session: null }, error: c });
          throw c;
        }
      }
      async verifyOtp(e) {
        var r, i;
        try {
          let s, o;
          'options' in e &&
            ((s = (r = e.options) === null || r === void 0 ? void 0 : r.redirectTo),
            (o = (i = e.options) === null || i === void 0 ? void 0 : i.captchaToken));
          let { data: a, error: c } = await E(this.fetch, 'POST', `${this.url}/verify`, {
            headers: this.headers,
            body: Object.assign(Object.assign({}, e), {
              gotrue_meta_security: { captcha_token: o },
            }),
            redirectTo: s,
            xform: ge$1,
          });
          if (c) throw c;
          if (!a) throw new Error('An error occurred on token verification.');
          let l = a.session,
            u = a.user;
          return (
            l?.access_token &&
              (await this._saveSession(l),
              await this._notifyAllSubscribers(
                e.type == 'recovery' ? 'PASSWORD_RECOVERY' : 'SIGNED_IN',
                l,
              )),
            this._returnResult({ data: { user: u, session: l }, error: null })
          );
        } catch (s) {
          if (_(s)) return this._returnResult({ data: { user: null, session: null }, error: s });
          throw s;
        }
      }
      async signInWithSSO(e) {
        var r, i, s, o, a;
        try {
          let c = null,
            l = null;
          this.flowType === 'pkce' && ([c, l] = await At(this.storage, this.storageKey));
          let u = await E(this.fetch, 'POST', `${this.url}/sso`, {
            body: Object.assign(
              Object.assign(
                Object.assign(
                  Object.assign(
                    Object.assign({}, 'providerId' in e ? { provider_id: e.providerId } : null),
                    'domain' in e ? { domain: e.domain } : null,
                  ),
                  {
                    redirect_to:
                      (i = (r = e.options) === null || r === void 0 ? void 0 : r.redirectTo) !==
                        null && i !== void 0
                        ? i
                        : void 0,
                  },
                ),
                !((s = e?.options) === null || s === void 0) && s.captchaToken
                  ? { gotrue_meta_security: { captcha_token: e.options.captchaToken } }
                  : null,
              ),
              { skip_http_redirect: !0, code_challenge: c, code_challenge_method: l },
            ),
            headers: this.headers,
            xform: Bu,
          });
          return (
            !((o = u.data) === null || o === void 0) &&
              o.url &&
              J() &&
              !(!((a = e.options) === null || a === void 0) && a.skipBrowserRedirect) &&
              window.location.assign(u.data.url),
            this._returnResult(u)
          );
        } catch (c) {
          if ((await G(this.storage, `${this.storageKey}-code-verifier`), _(c)))
            return this._returnResult({ data: null, error: c });
          throw c;
        }
      }
      async reauthenticate() {
        return (
          await this.initializePromise,
          this.lock != null
            ? await this._acquireLock(
                this.lockAcquireTimeout,
                async () => await this._reauthenticate(),
              )
            : await this._reauthenticate()
        );
      }
      async _reauthenticate() {
        try {
          return await this._useSession(async (e) => {
            let {
              data: { session: r },
              error: i,
            } = e;
            if (i) throw i;
            if (!r) throw new z();
            let { error: s } = await E(this.fetch, 'GET', `${this.url}/reauthenticate`, {
              headers: this.headers,
              jwt: r.access_token,
            });
            return this._returnResult({ data: { user: null, session: null }, error: s });
          });
        } catch (e) {
          if (_(e)) return this._returnResult({ data: { user: null, session: null }, error: e });
          throw e;
        }
      }
      async resend(e) {
        try {
          let r = `${this.url}/resend`;
          if ('email' in e) {
            let { email: i, type: s, options: o } = e,
              { error: a } = await E(this.fetch, 'POST', r, {
                headers: this.headers,
                body: {
                  email: i,
                  type: s,
                  gotrue_meta_security: { captcha_token: o?.captchaToken },
                },
                redirectTo: o?.emailRedirectTo,
              });
            return this._returnResult({ data: { user: null, session: null }, error: a });
          } else if ('phone' in e) {
            let { phone: i, type: s, options: o } = e,
              { data: a, error: c } = await E(this.fetch, 'POST', r, {
                headers: this.headers,
                body: {
                  phone: i,
                  type: s,
                  gotrue_meta_security: { captcha_token: o?.captchaToken },
                },
              });
            return this._returnResult({
              data: { user: null, session: null, messageId: a?.message_id },
              error: c,
            });
          }
          throw new Dt('You must provide either an email or phone number and a type');
        } catch (r) {
          if (_(r)) return this._returnResult({ data: { user: null, session: null }, error: r });
          throw r;
        }
      }
      async getSession() {
        return (
          await this.initializePromise,
          this.lock != null
            ? await this._acquireLock(this.lockAcquireTimeout, async () =>
                this._useSession(async (e) => e),
              )
            : await this._useSession(async (e) => e)
        );
      }
      async _acquireLock(e, r) {
        this._debug('#_acquireLock', 'begin', e);
        try {
          if (this.lockAcquired) {
            let i = this.pendingInLock.length
                ? this.pendingInLock[this.pendingInLock.length - 1]
                : Promise.resolve(),
              s = (async () => (await i, await r()))();
            return (
              this.pendingInLock.push(
                (async () => {
                  try {
                    await s;
                  } catch {}
                })(),
              ),
              s
            );
          }
          return await this.lock(`lock:${this.storageKey}`, e, async () => {
            this._debug('#_acquireLock', 'lock acquired for storage key', this.storageKey);
            try {
              this.lockAcquired = !0;
              let i = r();
              for (
                this.pendingInLock.push(
                  (async () => {
                    try {
                      await i;
                    } catch {}
                  })(),
                ),
                  await i;
                this.pendingInLock.length;
              ) {
                let s = [...this.pendingInLock];
                (await Promise.all(s), this.pendingInLock.splice(0, s.length));
              }
              return await i;
            } finally {
              (this._debug('#_acquireLock', 'lock released for storage key', this.storageKey),
                (this.lockAcquired = !1));
            }
          });
        } finally {
          this._debug('#_acquireLock', 'end');
        }
      }
      async _useSession(e) {
        this._debug('#_useSession', 'begin');
        try {
          let r = await this.__loadSession();
          return await e(r);
        } finally {
          this._debug('#_useSession', 'end');
        }
      }
      async __loadSession() {
        (this._debug('#__loadSession()', 'begin'),
          this.lock != null &&
            !this.lockAcquired &&
            this._debug(
              '#__loadSession()',
              'used outside of an acquired lock!',
              new Error().stack,
            ));
        try {
          let e = null,
            r = await Le(this.storage, this.storageKey);
          if (
            (this._debug('#getSession()', 'session from storage', r),
            r !== null &&
              (this._isValidSession(r)
                ? (e = r)
                : (this._debug('#getSession()', 'session from storage is not valid'),
                  await this._removeSession())),
            !e)
          )
            return { data: { session: null }, error: null };
          let i = e.expires_at ? e.expires_at * 1e3 - Date.now() < Ji : !1;
          if (
            (this._debug(
              '#__loadSession()',
              `session has${i ? '' : ' not'} expired`,
              'expires_at',
              e.expires_at,
            ),
            !i)
          ) {
            if (this.userStorage) {
              let a = await Le(this.userStorage, this.storageKey + '-user');
              a?.user ? (e.user = a.user) : (e.user = ns());
            }
            if (this.storage.isServer && e.user && !e.user.__isUserNotAvailableProxy) {
              let a = { value: this.suppressGetSessionWarning };
              ((e.user = Uu(e.user, a)), a.value && (this.suppressGetSessionWarning = !0));
            }
            return { data: { session: e }, error: null };
          }
          let { data: s, error: o } = await this._callRefreshToken(e.refresh_token);
          return o
            ? this._returnResult({ data: { session: null }, error: o })
            : this._returnResult({ data: { session: s }, error: null });
        } finally {
          this._debug('#__loadSession()', 'end');
        }
      }
      async getUser(e) {
        if (e) return await this._getUser(e);
        await this.initializePromise;
        let r;
        return (
          this.lock != null
            ? (r = await this._acquireLock(
                this.lockAcquireTimeout,
                async () => await this._getUser(),
              ))
            : (r = await this._getUser()),
          r.data.user && (this.suppressGetSessionWarning = true),
          r
        );
      }
      async _getUser(e) {
        try {
          return e
            ? await E(this.fetch, 'GET', `${this.url}/user`, {
                headers: this.headers,
                jwt: e,
                xform: Ue,
              })
            : await this._useSession(async (r) => {
                var i, s, o;
                let { data: a, error: c } = r;
                if (c) throw c;
                return !(!((i = a.session) === null || i === void 0) && i.access_token) &&
                  !this.hasCustomAuthorizationHeader
                  ? { data: { user: null }, error: new z() }
                  : await E(this.fetch, 'GET', `${this.url}/user`, {
                      headers: this.headers,
                      jwt:
                        (o = (s = a.session) === null || s === void 0 ? void 0 : s.access_token) !==
                          null && o !== void 0
                          ? o
                          : void 0,
                      xform: Ue,
                    });
              });
        } catch (r) {
          if (_(r))
            return (
              Ar(r) &&
                (await this._removeSession(),
                await G(this.storage, `${this.storageKey}-code-verifier`)),
              this._returnResult({ data: { user: null }, error: r })
            );
          throw r;
        }
      }
      async updateUser(e, r = {}) {
        return (
          await this.initializePromise,
          this.lock != null
            ? await this._acquireLock(
                this.lockAcquireTimeout,
                async () => await this._updateUser(e, r),
              )
            : await this._updateUser(e, r)
        );
      }
      async _updateUser(e, r = {}) {
        try {
          return await this._useSession(async (i) => {
            let { data: s, error: o } = i;
            if (o) throw o;
            if (!s.session) throw new z();
            let a = s.session,
              c = null,
              l = null;
            this.flowType === 'pkce' &&
              e.email != null &&
              ([c, l] = await At(this.storage, this.storageKey));
            let { data: u, error: d } = await E(this.fetch, 'PUT', `${this.url}/user`, {
              headers: this.headers,
              redirectTo: r?.emailRedirectTo,
              body: Object.assign(Object.assign({}, e), {
                code_challenge: c,
                code_challenge_method: l,
              }),
              jwt: a.access_token,
              xform: Ue,
            });
            if (d) throw d;
            return (
              (a.user = u.user),
              await this._saveSession(a),
              await this._notifyAllSubscribers('USER_UPDATED', a),
              this._returnResult({ data: { user: a.user }, error: null })
            );
          });
        } catch (i) {
          if ((await G(this.storage, `${this.storageKey}-code-verifier`), _(i)))
            return this._returnResult({ data: { user: null }, error: i });
          throw i;
        }
      }
      async setSession(e) {
        return (
          await this.initializePromise,
          this.lock != null
            ? await this._acquireLock(
                this.lockAcquireTimeout,
                async () => await this._setSession(e),
              )
            : await this._setSession(e)
        );
      }
      async _setSession(e) {
        try {
          if (!e.access_token || !e.refresh_token) throw new z();
          let r = Date.now() / 1e3,
            i = r,
            s = !0,
            o = null,
            { payload: a } = kr(e.access_token);
          if ((a.exp && ((i = a.exp), (s = i <= r)), s)) {
            let { data: c, error: l } = await this._callRefreshToken(e.refresh_token);
            if (l) return this._returnResult({ data: { user: null, session: null }, error: l });
            if (!c) return { data: { user: null, session: null }, error: null };
            o = c;
          } else {
            let { data: c, error: l } = await this._getUser(e.access_token);
            if (l) return this._returnResult({ data: { user: null, session: null }, error: l });
            ((o = {
              access_token: e.access_token,
              refresh_token: e.refresh_token,
              user: c.user,
              token_type: 'bearer',
              expires_in: i - r,
              expires_at: i,
            }),
              await this._saveSession(o),
              await this._notifyAllSubscribers('SIGNED_IN', o));
          }
          return this._returnResult({ data: { user: o.user, session: o }, error: null });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: { session: null, user: null }, error: r });
          throw r;
        }
      }
      async refreshSession(e) {
        return (
          await this.initializePromise,
          this.lock != null
            ? await this._acquireLock(
                this.lockAcquireTimeout,
                async () => await this._refreshSession(e),
              )
            : await this._refreshSession(e)
        );
      }
      async _refreshSession(e) {
        try {
          return await this._useSession(async (r) => {
            var i;
            if (!e) {
              let { data: a, error: c } = r;
              if (c) throw c;
              e = (i = a.session) !== null && i !== void 0 ? i : void 0;
            }
            if (!e?.refresh_token) throw new z();
            let { data: s, error: o } = await this._callRefreshToken(e.refresh_token);
            return o
              ? this._returnResult({ data: { user: null, session: null }, error: o })
              : s
                ? this._returnResult({ data: { user: s.user, session: s }, error: null })
                : this._returnResult({ data: { user: null, session: null }, error: null });
          });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: { user: null, session: null }, error: r });
          throw r;
        }
      }
      async _getSessionFromURL(e, r) {
        var i;
        try {
          if (!J()) throw new Tt('No browser detected.');
          if (e.error || e.error_description || e.error_code)
            throw new Tt(e.error_description || 'Error in URL with unspecified error_description', {
              error: e.error || 'unspecified_error',
              code: e.error_code || 'unspecified_code',
            });
          switch (r) {
            case 'implicit':
              if (this.flowType === 'pkce') throw new Tr('Not a valid PKCE flow url.');
              break;
            case 'pkce':
              if (this.flowType === 'implicit')
                throw new Tt('Not a valid implicit grant flow url.');
              break;
            default:
          }
          if (r === 'pkce') {
            if ((this._debug('#_initialize()', 'begin', 'is PKCE flow', !0), !e.code))
              throw new Tr('No code detected.');
            let { data: S, error: P } = await this._exchangeCodeForSession(e.code);
            if (P) throw P;
            let W = new URL(window.location.href);
            return (
              W.searchParams.delete('code'),
              window.history.replaceState(window.history.state, '', W.toString()),
              {
                data: {
                  session: S.session,
                  redirectType: (i = S.redirectType) !== null && i !== void 0 ? i : null,
                },
                error: null,
              }
            );
          }
          let {
            provider_token: s,
            provider_refresh_token: o,
            access_token: a,
            refresh_token: c,
            expires_in: l,
            expires_at: u,
            token_type: d,
          } = e;
          if (!a || !l || !c || !d) throw new Tt('No session defined in URL');
          let h = Math.round(Date.now() / 1e3),
            f = parseInt(l),
            p = h + f;
          u && (p = parseInt(u));
          let g = p - h;
          g * 1e3 <= Ye &&
            console.warn(
              `@supabase/gotrue-js: Session as retrieved from URL expires in ${g}s, should have been closer to ${f}s`,
            );
          let y = p - f;
          h - y >= 120
            ? console.warn(
                '@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale',
                y,
                p,
                h,
              )
            : h - y < 0 &&
              console.warn(
                '@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew',
                y,
                p,
                h,
              );
          let { data: v, error: D } = await this._getUser(a);
          if (D) throw D;
          let w = {
            provider_token: s,
            provider_refresh_token: o,
            access_token: a,
            expires_in: f,
            expires_at: p,
            refresh_token: c,
            token_type: d,
            user: v.user,
          };
          return (
            (window.location.hash = ''),
            this._debug('#_getSessionFromURL()', 'clearing window.location.hash'),
            this._returnResult({ data: { session: w, redirectType: e.type }, error: null })
          );
        } catch (s) {
          if (_(s))
            return this._returnResult({ data: { session: null, redirectType: null }, error: s });
          throw s;
        }
      }
      _isImplicitGrantCallback(e) {
        return typeof this.detectSessionInUrl == 'function'
          ? this.detectSessionInUrl(new URL(window.location.href), e)
          : !!(e.access_token || e.error || e.error_description || e.error_code);
      }
      async _isPKCECallback(e) {
        let r = await Le(this.storage, `${this.storageKey}-code-verifier`);
        return !!(e.code && r);
      }
      async signOut(e = { scope: 'global' }) {
        return (
          await this.initializePromise,
          this.lock != null
            ? await this._acquireLock(this.lockAcquireTimeout, async () => await this._signOut(e))
            : await this._signOut(e)
        );
      }
      async _signOut({ scope: e } = { scope: 'global' }) {
        return await this._useSession(async (r) => {
          var i;
          let { data: s, error: o } = r;
          if (o && !Ar(o)) return this._returnResult({ error: o });
          let a = (i = s.session) === null || i === void 0 ? void 0 : i.access_token;
          if (a) {
            let { error: c } = await this.admin.signOut(a, e);
            if (
              c &&
              !((Eu(c) && (c.status === 404 || c.status === 401 || c.status === 403)) || Ar(c))
            )
              return this._returnResult({ error: c });
          }
          return (
            e !== 'others' &&
              (await this._removeSession(),
              await G(this.storage, `${this.storageKey}-code-verifier`)),
            this._returnResult({ error: null })
          );
        });
      }
      onAuthStateChange(e) {
        let r = ku(),
          i = {
            id: r,
            callback: e,
            unsubscribe: () => {
              (this._debug('#unsubscribe()', 'state change callback with id removed', r),
                this.stateChangeEmitters.delete(r));
            },
          };
        return (
          this._debug('#onAuthStateChange()', 'registered callback with id', r),
          this.stateChangeEmitters.set(r, i),
          (async () => (
            await this.initializePromise,
            this.lock != null
              ? await this._acquireLock(this.lockAcquireTimeout, async () => {
                  this._emitInitialSession(r);
                })
              : await this._emitInitialSession(r)
          ))(),
          { data: { subscription: i } }
        );
      }
      async _emitInitialSession(e) {
        return await this._useSession(async (r) => {
          var i, s;
          try {
            let {
              data: { session: o },
              error: a,
            } = r;
            if (a) throw a;
            (await ((i = this.stateChangeEmitters.get(e)) === null || i === void 0
              ? void 0
              : i.callback('INITIAL_SESSION', o)),
              this._debug('INITIAL_SESSION', 'callback id', e, 'session', o));
          } catch (o) {
            (await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0
              ? void 0
              : s.callback('INITIAL_SESSION', null)),
              this._debug('INITIAL_SESSION', 'callback id', e, 'error', o),
              Ar(o) ? console.warn(o) : console.error(o));
          }
        });
      }
      async resetPasswordForEmail(e, r = {}) {
        let i = null,
          s = null;
        this.flowType === 'pkce' && ([i, s] = await At(this.storage, this.storageKey, true));
        try {
          return await E(this.fetch, 'POST', `${this.url}/recover`, {
            body: {
              email: e,
              code_challenge: i,
              code_challenge_method: s,
              gotrue_meta_security: { captcha_token: r.captchaToken },
            },
            headers: this.headers,
            redirectTo: r.redirectTo,
          });
        } catch (o) {
          if ((await G(this.storage, `${this.storageKey}-code-verifier`), _(o)))
            return this._returnResult({ data: null, error: o });
          throw o;
        }
      }
      async getUserIdentities() {
        var e;
        try {
          let { data: r, error: i } = await this.getUser();
          if (i) throw i;
          return this._returnResult({
            data: { identities: (e = r.user.identities) !== null && e !== void 0 ? e : [] },
            error: null,
          });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: null, error: r });
          throw r;
        }
      }
      async linkIdentity(e) {
        return 'token' in e ? this.linkIdentityIdToken(e) : this.linkIdentityOAuth(e);
      }
      async linkIdentityOAuth(e) {
        var r;
        try {
          let { data: i, error: s } = await this._useSession(async (o) => {
            var a, c, l, u, d;
            let { data: h, error: f } = o;
            if (f) throw f;
            let p = await this._getUrlForProvider(
              `${this.url}/user/identities/authorize`,
              e.provider,
              {
                redirectTo: (a = e.options) === null || a === void 0 ? void 0 : a.redirectTo,
                scopes: (c = e.options) === null || c === void 0 ? void 0 : c.scopes,
                queryParams: (l = e.options) === null || l === void 0 ? void 0 : l.queryParams,
                skipBrowserRedirect: !0,
              },
            );
            return await E(this.fetch, 'GET', p, {
              headers: this.headers,
              jwt:
                (d = (u = h.session) === null || u === void 0 ? void 0 : u.access_token) !== null &&
                d !== void 0
                  ? d
                  : void 0,
            });
          });
          if (s) throw s;
          return (
            J() &&
              !(!((r = e.options) === null || r === void 0) && r.skipBrowserRedirect) &&
              window.location.assign(i?.url),
            this._returnResult({ data: { provider: e.provider, url: i?.url }, error: null })
          );
        } catch (i) {
          if (_(i))
            return this._returnResult({ data: { provider: e.provider, url: null }, error: i });
          throw i;
        }
      }
      async linkIdentityIdToken(e) {
        return await this._useSession(async (r) => {
          var i;
          try {
            let {
              error: s,
              data: { session: o },
            } = r;
            if (s) throw s;
            let { options: a, provider: c, token: l, access_token: u, nonce: d } = e,
              h = await E(this.fetch, 'POST', `${this.url}/token?grant_type=id_token`, {
                headers: this.headers,
                jwt: (i = o?.access_token) !== null && i !== void 0 ? i : void 0,
                body: {
                  provider: c,
                  id_token: l,
                  access_token: u,
                  nonce: d,
                  link_identity: !0,
                  gotrue_meta_security: { captcha_token: a?.captchaToken },
                },
                xform: ge$1,
              }),
              { data: f, error: p } = h;
            return p
              ? this._returnResult({ data: { user: null, session: null }, error: p })
              : !f || !f.session || !f.user
                ? this._returnResult({ data: { user: null, session: null }, error: new Xe() })
                : (f.session &&
                    (await this._saveSession(f.session),
                    await this._notifyAllSubscribers('USER_UPDATED', f.session)),
                  this._returnResult({ data: f, error: p }));
          } catch (s) {
            if ((await G(this.storage, `${this.storageKey}-code-verifier`), _(s)))
              return this._returnResult({ data: { user: null, session: null }, error: s });
            throw s;
          }
        });
      }
      async unlinkIdentity(e) {
        try {
          return await this._useSession(async (r) => {
            var i, s;
            let { data: o, error: a } = r;
            if (a) throw a;
            return await E(this.fetch, 'DELETE', `${this.url}/user/identities/${e.identity_id}`, {
              headers: this.headers,
              jwt:
                (s = (i = o.session) === null || i === void 0 ? void 0 : i.access_token) !== null &&
                s !== void 0
                  ? s
                  : void 0,
            });
          });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: null, error: r });
          throw r;
        }
      }
      async _refreshAccessToken(e) {
        let r = '#_refreshAccessToken()';
        this._debug(r, 'begin');
        try {
          let i = Date.now();
          return await Mu(
            async (s) => (
              s > 0 && (await Pu(200 * Math.pow(2, s - 1))),
              this._debug(r, 'refreshing attempt', s),
              await E(this.fetch, 'POST', `${this.url}/token?grant_type=refresh_token`, {
                body: { refresh_token: e },
                headers: this.headers,
                xform: ge$1,
              })
            ),
            (s, o) => {
              let a = 200 * Math.pow(2, s);
              return o && Zi(o) && Date.now() + a - i < Ye;
            },
          );
        } catch (i) {
          if ((this._debug(r, 'error', i), _(i)))
            return this._returnResult({ data: { session: null, user: null }, error: i });
          throw i;
        } finally {
          this._debug(r, 'end');
        }
      }
      _isValidSession(e) {
        return (
          typeof e == 'object' &&
          e !== null &&
          'access_token' in e &&
          'refresh_token' in e &&
          'expires_at' in e
        );
      }
      async _handleProviderSignIn(e, r) {
        let i = await this._getUrlForProvider(`${this.url}/authorize`, e, {
          redirectTo: r.redirectTo,
          scopes: r.scopes,
          queryParams: r.queryParams,
        });
        return (
          this._debug('#_handleProviderSignIn()', 'provider', e, 'options', r, 'url', i),
          J() && !r.skipBrowserRedirect && window.location.assign(i),
          { data: { provider: e, url: i }, error: null }
        );
      }
      async _recoverAndRefresh() {
        var e, r;
        let i = '#_recoverAndRefresh()';
        this._debug(i, 'begin');
        try {
          let s = await Le(this.storage, this.storageKey);
          if (s && this.userStorage) {
            let a = await Le(this.userStorage, this.storageKey + '-user');
            (!this.storage.isServer &&
              Object.is(this.storage, this.userStorage) &&
              !a &&
              ((a = { user: s.user }), await Rt(this.userStorage, this.storageKey + '-user', a)),
              (s.user = (e = a?.user) !== null && e !== void 0 ? e : ns()));
          } else if (s && !s.user && !s.user) {
            let a = await Le(this.storage, this.storageKey + '-user');
            a && a?.user
              ? ((s.user = a.user),
                await G(this.storage, this.storageKey + '-user'),
                await Rt(this.storage, this.storageKey, s))
              : (s.user = ns());
          }
          if ((this._debug(i, 'session from storage', s), !this._isValidSession(s))) {
            (this._debug(i, 'session is not valid'), s !== null && (await this._removeSession()));
            return;
          }
          let o = ((r = s.expires_at) !== null && r !== void 0 ? r : 1 / 0) * 1e3 - Date.now() < Ji;
          if ((this._debug(i, `session has${o ? '' : ' not'} expired with margin of ${Ji}s`), o)) {
            if (this.autoRefreshToken && s.refresh_token) {
              let { error: a } = await this._callRefreshToken(s.refresh_token);
              a &&
                (Du(a)
                  ? this._debug(i, 'refresh discarded by commit guard', a)
                  : (console.error(a),
                    Zi(a) ||
                      (this._debug(
                        i,
                        'refresh failed with a non-retryable error, removing the session',
                        a,
                      ),
                      await this._removeSession())));
            }
          } else if (s.user && s.user.__isUserNotAvailableProxy === !0)
            try {
              let { data: a, error: c } = await this._getUser(s.access_token);
              !c && a?.user
                ? ((s.user = a.user),
                  await this._saveSession(s),
                  await this._notifyAllSubscribers('SIGNED_IN', s))
                : this._debug(i, 'could not get user data, skipping SIGNED_IN notification');
            } catch (a) {
              (console.error('Error getting user data:', a),
                this._debug(i, 'error getting user data, skipping SIGNED_IN notification', a));
            }
          else await this._notifyAllSubscribers('SIGNED_IN', s);
        } catch (s) {
          (this._debug(i, 'error', s), console.error(s));
          return;
        } finally {
          this._debug(i, 'end');
        }
      }
      async _callRefreshToken(e) {
        var r, i;
        if (!e) throw new z();
        if (this.refreshingDeferred) return this.refreshingDeferred.promise;
        let s = '#_callRefreshToken()';
        this._debug(s, 'begin');
        try {
          this.refreshingDeferred = new Ir();
          let o = await Le(this.storage, this.storageKey),
            { data: a, error: c } = await this._refreshAccessToken(e);
          if (c) throw c;
          if (!a.session) throw new z();
          let l = await Le(this.storage, this.storageKey);
          if (o !== null && (l === null || l.refresh_token !== o.refresh_token)) {
            this._debug(
              s,
              'commit guard: storage changed since refresh started, discarding rotated tokens',
              { startedWith: 'present', nowHolds: l ? 'replaced' : 'cleared' },
            );
            let f = { data: null, error: new Cr() };
            return (this.refreshingDeferred.resolve(f), f);
          }
          let d = this._sessionRemovalEpoch;
          if ((await this._saveSession(a.session), this._sessionRemovalEpoch !== d)) {
            (this._debug(
              s,
              'commit guard (post-save): _removeSession ran during _saveSession, undoing write',
            ),
              await G(this.storage, this.storageKey),
              this.userStorage && (await G(this.userStorage, this.storageKey + '-user')));
            let f = { data: null, error: new Cr() };
            return (this.refreshingDeferred.resolve(f), f);
          }
          await this._notifyAllSubscribers('TOKEN_REFRESHED', a.session);
          let h = { data: a.session, error: null };
          return (this.refreshingDeferred.resolve(h), h);
        } catch (o) {
          if ((this._debug(s, 'error', o), _(o))) {
            let a = { data: null, error: o };
            return (
              Zi(o) || (await this._removeSession()),
              (r = this.refreshingDeferred) === null || r === void 0 || r.resolve(a),
              a
            );
          }
          throw ((i = this.refreshingDeferred) === null || i === void 0 || i.reject(o), o);
        } finally {
          ((this.refreshingDeferred = null), this._debug(s, 'end'));
        }
      }
      async _notifyAllSubscribers(e, r, i = true) {
        let s = `#_notifyAllSubscribers(${e})`;
        this._debug(s, 'begin', r, `broadcast = ${i}`);
        try {
          this.broadcastChannel && i && this.broadcastChannel.postMessage({ event: e, session: r });
          let o = [],
            a = Array.from(this.stateChangeEmitters.values()).map(async (c) => {
              try {
                await c.callback(e, r);
              } catch (l) {
                o.push(l);
              }
            });
          if ((await Promise.all(a), o.length > 0)) {
            for (let c = 0; c < o.length; c += 1) console.error(o[c]);
            throw o[0];
          }
        } finally {
          this._debug(s, 'end');
        }
      }
      async _saveSession(e) {
        (this._debug('#_saveSession()', e),
          (this.suppressGetSessionWarning = true),
          await G(this.storage, `${this.storageKey}-code-verifier`));
        let r = Object.assign({}, e),
          i = r.user && r.user.__isUserNotAvailableProxy === true;
        if (this.userStorage) {
          !i && r.user && (await Rt(this.userStorage, this.storageKey + '-user', { user: r.user }));
          let s = Object.assign({}, r);
          delete s.user;
          let o = Go(s);
          await Rt(this.storage, this.storageKey, o);
        } else {
          let s = Go(r);
          await Rt(this.storage, this.storageKey, s);
        }
      }
      async _removeSession() {
        ((this._sessionRemovalEpoch += 1),
          this._debug('#_removeSession()'),
          (this.suppressGetSessionWarning = false),
          await G(this.storage, this.storageKey),
          await G(this.storage, this.storageKey + '-code-verifier'),
          await G(this.storage, this.storageKey + '-user'),
          this.userStorage && (await G(this.userStorage, this.storageKey + '-user')),
          await this._notifyAllSubscribers('SIGNED_OUT', null));
      }
      _removeVisibilityChangedCallback() {
        this._debug('#_removeVisibilityChangedCallback()');
        let e = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
          e &&
            J() &&
            window?.removeEventListener &&
            window.removeEventListener('visibilitychange', e);
        } catch (r) {
          console.error('removing visibilitychange callback failed', r);
        }
      }
      async _startAutoRefresh() {
        (await this._stopAutoRefresh(), this._debug('#_startAutoRefresh()'));
        let e = setInterval(() => this._autoRefreshTokenTick(), Ye);
        ((this.autoRefreshTicker = e),
          e && typeof e == 'object' && typeof e.unref == 'function'
            ? e.unref()
            : typeof Deno < 'u' && typeof Deno.unrefTimer == 'function' && Deno.unrefTimer(e));
        let r = setTimeout(async () => {
          (await this.initializePromise, await this._autoRefreshTokenTick());
        }, 0);
        ((this.autoRefreshTickTimeout = r),
          r && typeof r == 'object' && typeof r.unref == 'function'
            ? r.unref()
            : typeof Deno < 'u' && typeof Deno.unrefTimer == 'function' && Deno.unrefTimer(r));
      }
      async _stopAutoRefresh() {
        this._debug('#_stopAutoRefresh()');
        let e = this.autoRefreshTicker;
        ((this.autoRefreshTicker = null), e && clearInterval(e));
        let r = this.autoRefreshTickTimeout;
        ((this.autoRefreshTickTimeout = null), r && clearTimeout(r));
      }
      async startAutoRefresh() {
        (this._removeVisibilityChangedCallback(), await this._startAutoRefresh());
      }
      async stopAutoRefresh() {
        (this._removeVisibilityChangedCallback(), await this._stopAutoRefresh());
      }
      async dispose() {
        var e;
        (this._removeVisibilityChangedCallback(),
          await this._stopAutoRefresh(),
          (e = this.broadcastChannel) === null || e === void 0 || e.close(),
          (this.broadcastChannel = null),
          this.stateChangeEmitters.clear());
      }
      async _autoRefreshTokenTick() {
        if ((this._debug('#_autoRefreshTokenTick()', 'begin'), this.lock != null)) {
          try {
            await this._acquireLock(0, async () => {
              try {
                let e = Date.now();
                try {
                  return await this._useSession(async (r) => {
                    let {
                      data: { session: i },
                    } = r;
                    if (!i || !i.refresh_token || !i.expires_at) {
                      this._debug('#_autoRefreshTokenTick()', 'no session');
                      return;
                    }
                    let s = Math.floor((i.expires_at * 1e3 - e) / Ye);
                    (this._debug(
                      '#_autoRefreshTokenTick()',
                      `access token expires in ${s} ticks, a tick lasts ${Ye}ms, refresh threshold is ${yn} ticks`,
                    ),
                      s <= yn && (await this._callRefreshToken(i.refresh_token)));
                  });
                } catch (r) {
                  console.error(
                    'Auto refresh tick failed with error. This is likely a transient error.',
                    r,
                  );
                }
              } finally {
                this._debug('#_autoRefreshTokenTick()', 'end');
              }
            });
          } catch (e) {
            if (e instanceof is) this._debug('auto refresh token tick lock not available');
            else throw e;
          }
          return;
        }
        if (this.refreshingDeferred !== null) {
          this._debug('#_autoRefreshTokenTick()', 'refresh already in flight, skipping');
          return;
        }
        try {
          let e = Date.now();
          try {
            await this._useSession(async (r) => {
              let {
                data: { session: i },
              } = r;
              if (!i || !i.refresh_token || !i.expires_at) {
                this._debug('#_autoRefreshTokenTick()', 'no session');
                return;
              }
              let s = Math.floor((i.expires_at * 1e3 - e) / Ye);
              (this._debug(
                '#_autoRefreshTokenTick()',
                `access token expires in ${s} ticks, a tick lasts ${Ye}ms, refresh threshold is ${yn} ticks`,
              ),
                s <= yn && (await this._callRefreshToken(i.refresh_token)));
            });
          } catch (r) {
            console.error(
              'Auto refresh tick failed with error. This is likely a transient error.',
              r,
            );
          }
        } finally {
          this._debug('#_autoRefreshTokenTick()', 'end');
        }
      }
      async _handleVisibilityChange() {
        if ((this._debug('#_handleVisibilityChange()'), !J() || !window?.addEventListener))
          return (this.autoRefreshToken && this.startAutoRefresh(), false);
        try {
          ((this.visibilityChangedCallback = async () => {
            try {
              await this._onVisibilityChanged(!1);
            } catch (e) {
              this._debug('#visibilityChangedCallback', 'error', e);
            }
          }),
            window?.addEventListener('visibilitychange', this.visibilityChangedCallback),
            await this._onVisibilityChanged(!0));
        } catch (e) {
          console.error('_handleVisibilityChange', e);
        }
      }
      async _onVisibilityChanged(e) {
        let r = `#_onVisibilityChanged(${e})`;
        if (
          (this._debug(r, 'visibilityState', document.visibilityState),
          document.visibilityState === 'visible')
        ) {
          if ((this.autoRefreshToken && this._startAutoRefresh(), !e))
            if ((await this.initializePromise, this.lock != null))
              await this._acquireLock(this.lockAcquireTimeout, async () => {
                if (document.visibilityState !== 'visible') {
                  this._debug(
                    r,
                    'acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting',
                  );
                  return;
                }
                await this._recoverAndRefresh();
              });
            else {
              if (document.visibilityState !== 'visible') {
                this._debug(r, 'visibilityState is no longer visible, skipping recovery');
                return;
              }
              await this._recoverAndRefresh();
            }
        } else
          document.visibilityState === 'hidden' && this.autoRefreshToken && this._stopAutoRefresh();
      }
      async _getUrlForProvider(e, r, i) {
        let s = [`provider=${encodeURIComponent(r)}`];
        if (
          (i?.redirectTo && s.push(`redirect_to=${encodeURIComponent(i.redirectTo)}`),
          i?.scopes && s.push(`scopes=${encodeURIComponent(i.scopes)}`),
          this.flowType === 'pkce')
        ) {
          let [o, a] = await At(this.storage, this.storageKey),
            c = new URLSearchParams({
              code_challenge: `${encodeURIComponent(o)}`,
              code_challenge_method: `${encodeURIComponent(a)}`,
            });
          s.push(c.toString());
        }
        if (i?.queryParams) {
          let o = new URLSearchParams(i.queryParams);
          s.push(o.toString());
        }
        return (
          i?.skipBrowserRedirect && s.push(`skip_http_redirect=${i.skipBrowserRedirect}`),
          `${e}?${s.join('&')}`
        );
      }
      async _unenroll(e) {
        try {
          return await this._useSession(async (r) => {
            var i;
            let { data: s, error: o } = r;
            return o
              ? this._returnResult({ data: null, error: o })
              : await E(this.fetch, 'DELETE', `${this.url}/factors/${e.factorId}`, {
                  headers: this.headers,
                  jwt: (i = s?.session) === null || i === void 0 ? void 0 : i.access_token,
                });
          });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: null, error: r });
          throw r;
        }
      }
      async _enroll(e) {
        try {
          return await this._useSession(async (r) => {
            var i, s;
            let { data: o, error: a } = r;
            if (a) return this._returnResult({ data: null, error: a });
            let c = Object.assign(
                { friendly_name: e.friendlyName, factor_type: e.factorType },
                e.factorType === 'phone'
                  ? { phone: e.phone }
                  : e.factorType === 'totp'
                    ? { issuer: e.issuer }
                    : {},
              ),
              { data: l, error: u } = await E(this.fetch, 'POST', `${this.url}/factors`, {
                body: c,
                headers: this.headers,
                jwt: (i = o?.session) === null || i === void 0 ? void 0 : i.access_token,
              });
            return u
              ? this._returnResult({ data: null, error: u })
              : (e.factorType === 'totp' &&
                  l.type === 'totp' &&
                  !((s = l?.totp) === null || s === void 0) &&
                  s.qr_code &&
                  (l.totp.qr_code = `data:image/svg+xml;utf-8,${l.totp.qr_code}`),
                this._returnResult({ data: l, error: null }));
          });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: null, error: r });
          throw r;
        }
      }
      async _verify(e) {
        let r = async () => {
          try {
            return await this._useSession(async (i) => {
              var s;
              let { data: o, error: a } = i;
              if (a) return this._returnResult({ data: null, error: a });
              let c = Object.assign(
                  { challenge_id: e.challengeId },
                  'webauthn' in e
                    ? {
                        webauthn: Object.assign(Object.assign({}, e.webauthn), {
                          credential_response:
                            e.webauthn.type === 'create'
                              ? ta(e.webauthn.credential_response)
                              : na(e.webauthn.credential_response),
                        }),
                      }
                    : { code: e.code },
                ),
                { data: l, error: u } = await E(
                  this.fetch,
                  'POST',
                  `${this.url}/factors/${e.factorId}/verify`,
                  {
                    body: c,
                    headers: this.headers,
                    jwt: (s = o?.session) === null || s === void 0 ? void 0 : s.access_token,
                  },
                );
              return u
                ? this._returnResult({ data: null, error: u })
                : (await this._saveSession(
                    Object.assign({ expires_at: Math.round(Date.now() / 1e3) + l.expires_in }, l),
                  ),
                  await this._notifyAllSubscribers('MFA_CHALLENGE_VERIFIED', l),
                  this._returnResult({ data: l, error: u }));
            });
          } catch (i) {
            if (_(i)) return this._returnResult({ data: null, error: i });
            throw i;
          }
        };
        return this.lock != null ? this._acquireLock(this.lockAcquireTimeout, r) : r();
      }
      async _challenge(e) {
        let r = async () => {
          try {
            return await this._useSession(async (i) => {
              var s;
              let { data: o, error: a } = i;
              if (a) return this._returnResult({ data: null, error: a });
              let c = await E(this.fetch, 'POST', `${this.url}/factors/${e.factorId}/challenge`, {
                body: e,
                headers: this.headers,
                jwt: (s = o?.session) === null || s === void 0 ? void 0 : s.access_token,
              });
              if (c.error) return c;
              let { data: l } = c;
              if (l.type !== 'webauthn') return { data: l, error: null };
              switch (l.webauthn.type) {
                case 'create':
                  return {
                    data: Object.assign(Object.assign({}, l), {
                      webauthn: Object.assign(Object.assign({}, l.webauthn), {
                        credential_options: Object.assign(
                          Object.assign({}, l.webauthn.credential_options),
                          { publicKey: Qo(l.webauthn.credential_options.publicKey) },
                        ),
                      }),
                    }),
                    error: null,
                  };
                case 'request':
                  return {
                    data: Object.assign(Object.assign({}, l), {
                      webauthn: Object.assign(Object.assign({}, l.webauthn), {
                        credential_options: Object.assign(
                          Object.assign({}, l.webauthn.credential_options),
                          { publicKey: ea(l.webauthn.credential_options.publicKey) },
                        ),
                      }),
                    }),
                    error: null,
                  };
              }
            });
          } catch (i) {
            if (_(i)) return this._returnResult({ data: null, error: i });
            throw i;
          }
        };
        return this.lock != null ? this._acquireLock(this.lockAcquireTimeout, r) : r();
      }
      async _challengeAndVerify(e) {
        let { data: r, error: i } = await this._challenge({ factorId: e.factorId });
        return i
          ? this._returnResult({ data: null, error: i })
          : await this._verify({ factorId: e.factorId, challengeId: r.id, code: e.code });
      }
      async _listFactors() {
        var e;
        let {
          data: { user: r },
          error: i,
        } = await this.getUser();
        if (i) return { data: null, error: i };
        let s = { all: [], phone: [], totp: [], webauthn: [] };
        for (let o of (e = r?.factors) !== null && e !== void 0 ? e : [])
          (s.all.push(o), o.status === 'verified' && s[o.factor_type].push(o));
        return { data: s, error: null };
      }
      async _getAuthenticatorAssuranceLevel(e) {
        var r, i, s, o;
        if (e)
          try {
            let { payload: p } = kr(e),
              g = null;
            p.aal && (g = p.aal);
            let y = g,
              {
                data: { user: v },
                error: D,
              } = await this.getUser(e);
            if (D) return this._returnResult({ data: null, error: D });
            ((i =
              (r = v?.factors) === null || r === void 0
                ? void 0
                : r.filter((P) => P.status === 'verified')) !== null && i !== void 0
              ? i
              : []
            ).length > 0 && (y = 'aal2');
            let S = p.amr || [];
            return {
              data: { currentLevel: g, nextLevel: y, currentAuthenticationMethods: S },
              error: null,
            };
          } catch (p) {
            if (_(p)) return this._returnResult({ data: null, error: p });
            throw p;
          }
        let {
          data: { session: a },
          error: c,
        } = await this.getSession();
        if (c) return this._returnResult({ data: null, error: c });
        if (!a)
          return {
            data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
            error: null,
          };
        let { payload: l } = kr(a.access_token),
          u = null;
        l.aal && (u = l.aal);
        let d = u;
        ((o =
          (s = a.user.factors) === null || s === void 0
            ? void 0
            : s.filter((p) => p.status === 'verified')) !== null && o !== void 0
          ? o
          : []
        ).length > 0 && (d = 'aal2');
        let f = l.amr || [];
        return {
          data: { currentLevel: u, nextLevel: d, currentAuthenticationMethods: f },
          error: null,
        };
      }
      async _getAuthorizationDetails(e) {
        try {
          return await this._useSession(async (r) => {
            let {
              data: { session: i },
              error: s,
            } = r;
            return s
              ? this._returnResult({ data: null, error: s })
              : i
                ? await E(this.fetch, 'GET', `${this.url}/oauth/authorizations/${e}`, {
                    headers: this.headers,
                    jwt: i.access_token,
                    xform: (o) => ({ data: o, error: null }),
                  })
                : this._returnResult({ data: null, error: new z() });
          });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: null, error: r });
          throw r;
        }
      }
      async _approveAuthorization(e, r) {
        try {
          return await this._useSession(async (i) => {
            let {
              data: { session: s },
              error: o,
            } = i;
            if (o) return this._returnResult({ data: null, error: o });
            if (!s) return this._returnResult({ data: null, error: new z() });
            let a = await E(this.fetch, 'POST', `${this.url}/oauth/authorizations/${e}/consent`, {
              headers: this.headers,
              jwt: s.access_token,
              body: { action: 'approve' },
              xform: (c) => ({ data: c, error: null }),
            });
            return (
              a.data &&
                a.data.redirect_url &&
                J() &&
                !r?.skipBrowserRedirect &&
                window.location.assign(a.data.redirect_url),
              a
            );
          });
        } catch (i) {
          if (_(i)) return this._returnResult({ data: null, error: i });
          throw i;
        }
      }
      async _denyAuthorization(e, r) {
        try {
          return await this._useSession(async (i) => {
            let {
              data: { session: s },
              error: o,
            } = i;
            if (o) return this._returnResult({ data: null, error: o });
            if (!s) return this._returnResult({ data: null, error: new z() });
            let a = await E(this.fetch, 'POST', `${this.url}/oauth/authorizations/${e}/consent`, {
              headers: this.headers,
              jwt: s.access_token,
              body: { action: 'deny' },
              xform: (c) => ({ data: c, error: null }),
            });
            return (
              a.data &&
                a.data.redirect_url &&
                J() &&
                !r?.skipBrowserRedirect &&
                window.location.assign(a.data.redirect_url),
              a
            );
          });
        } catch (i) {
          if (_(i)) return this._returnResult({ data: null, error: i });
          throw i;
        }
      }
      async _listOAuthGrants() {
        try {
          return await this._useSession(async (e) => {
            let {
              data: { session: r },
              error: i,
            } = e;
            return i
              ? this._returnResult({ data: null, error: i })
              : r
                ? await E(this.fetch, 'GET', `${this.url}/user/oauth/grants`, {
                    headers: this.headers,
                    jwt: r.access_token,
                    xform: (s) => ({ data: s, error: null }),
                  })
                : this._returnResult({ data: null, error: new z() });
          });
        } catch (e) {
          if (_(e)) return this._returnResult({ data: null, error: e });
          throw e;
        }
      }
      async _revokeOAuthGrant(e) {
        try {
          return await this._useSession(async (r) => {
            let {
              data: { session: i },
              error: s,
            } = r;
            return s
              ? this._returnResult({ data: null, error: s })
              : i
                ? (await E(this.fetch, 'DELETE', `${this.url}/user/oauth/grants`, {
                    headers: this.headers,
                    jwt: i.access_token,
                    query: { client_id: e.clientId },
                    noResolveJson: !0,
                  }),
                  { data: {}, error: null })
                : this._returnResult({ data: null, error: new z() });
          });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: null, error: r });
          throw r;
        }
      }
      async fetchJwk(e, r = { keys: [] }) {
        let i = r.keys.find((c) => c.kid === e);
        if (i) return i;
        let s = Date.now();
        if (((i = this.jwks.keys.find((c) => c.kid === e)), i && this.jwks_cached_at + wu > s))
          return i;
        let { data: o, error: a } = await E(
          this.fetch,
          'GET',
          `${this.url}/.well-known/jwks.json`,
          { headers: this.headers },
        );
        if (a) throw a;
        return !o.keys ||
          o.keys.length === 0 ||
          ((this.jwks = o), (this.jwks_cached_at = s), (i = o.keys.find((c) => c.kid === e)), !i)
          ? null
          : i;
      }
      async getClaims(e, r = {}) {
        try {
          let i = e;
          if (!i) {
            let { data: p, error: g } = await this.getSession();
            if (g || !p.session) return this._returnResult({ data: null, error: g });
            i = p.session.access_token;
          }
          let {
            header: s,
            payload: o,
            signature: a,
            raw: { header: c, payload: l },
          } = kr(i);
          if (!r?.allowExpired)
            try {
              Lu(o.exp);
            } catch (p) {
              throw new ht(p instanceof Error ? p.message : 'JWT validation failed');
            }
          let u =
            !s.alg ||
            s.alg.startsWith('HS') ||
            !s.kid ||
            !('crypto' in globalThis && 'subtle' in globalThis.crypto)
              ? null
              : await this.fetchJwk(s.kid, r?.keys ? { keys: r.keys } : r?.jwks);
          if (!u) {
            let { error: p } = await this.getUser(i);
            if (p) throw p;
            return { data: { claims: o, header: s, signature: a }, error: null };
          }
          let d = Fu(s.alg),
            h = await crypto.subtle.importKey('jwk', u, d, !0, ['verify']);
          if (!(await crypto.subtle.verify(d, h, a, Au(`${c}.${l}`))))
            throw new ht('Invalid JWT signature');
          return { data: { claims: o, header: s, signature: a }, error: null };
        } catch (i) {
          if (_(i)) return this._returnResult({ data: null, error: i });
          throw i;
        }
      }
      async signInWithPasskey(e) {
        var r, i, s;
        me$1(this.experimental);
        try {
          if (!Or())
            return this._returnResult({
              data: null,
              error: new Z('Browser does not support WebAuthn', null),
            });
          let { data: o, error: a } = await this._startPasskeyAuthentication({
            options: {
              captchaToken: (r = e?.options) === null || r === void 0 ? void 0 : r.captchaToken,
            },
          });
          if (a || !o) return this._returnResult({ data: null, error: a });
          let c = ea(o.options),
            l =
              (s = (i = e?.options) === null || i === void 0 ? void 0 : i.signal) !== null &&
              s !== void 0
                ? s
                : as.createNewAbortSignal(),
            { data: u, error: d } = await ia({ publicKey: c, signal: l });
          if (d || !u)
            return this._returnResult({
              data: null,
              error: d ?? new Z('WebAuthn ceremony failed', null),
            });
          let h = na(u);
          return this._verifyPasskeyAuthentication({ challengeId: o.challenge_id, credential: h });
        } catch (o) {
          if (_(o)) return this._returnResult({ data: null, error: o });
          throw o;
        }
      }
      async registerPasskey(e) {
        var r, i;
        me$1(this.experimental);
        try {
          if (!Or())
            return this._returnResult({
              data: null,
              error: new Z('Browser does not support WebAuthn', null),
            });
          let { data: s, error: o } = await this._startPasskeyRegistration();
          if (o || !s) return this._returnResult({ data: null, error: o });
          let a = Qo(s.options),
            c =
              (i = (r = e?.options) === null || r === void 0 ? void 0 : r.signal) !== null &&
              i !== void 0
                ? i
                : as.createNewAbortSignal(),
            { data: l, error: u } = await ra({ publicKey: a, signal: c });
          if (u || !l)
            return this._returnResult({
              data: null,
              error: u ?? new Z('WebAuthn ceremony failed', null),
            });
          let d = ta(l);
          return this._verifyPasskeyRegistration({ challengeId: s.challenge_id, credential: d });
        } catch (s) {
          if (_(s)) return this._returnResult({ data: null, error: s });
          throw s;
        }
      }
      async _startPasskeyRegistration() {
        me$1(this.experimental);
        try {
          return await this._useSession(async (e) => {
            let {
              data: { session: r },
              error: i,
            } = e;
            if (i) return this._returnResult({ data: null, error: i });
            if (!r) return this._returnResult({ data: null, error: new z() });
            let { data: s, error: o } = await E(
              this.fetch,
              'POST',
              `${this.url}/passkeys/registration/options`,
              { headers: this.headers, jwt: r.access_token, body: {} },
            );
            return o
              ? this._returnResult({ data: null, error: o })
              : this._returnResult({ data: s, error: null });
          });
        } catch (e) {
          if (_(e)) return this._returnResult({ data: null, error: e });
          throw e;
        }
      }
      async _verifyPasskeyRegistration(e) {
        me$1(this.experimental);
        try {
          return await this._useSession(async (r) => {
            let {
              data: { session: i },
              error: s,
            } = r;
            if (s) return this._returnResult({ data: null, error: s });
            if (!i) return this._returnResult({ data: null, error: new z() });
            let { data: o, error: a } = await E(
              this.fetch,
              'POST',
              `${this.url}/passkeys/registration/verify`,
              {
                headers: this.headers,
                jwt: i.access_token,
                body: { challenge_id: e.challengeId, credential: e.credential },
              },
            );
            return a
              ? this._returnResult({ data: null, error: a })
              : this._returnResult({ data: o, error: null });
          });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: null, error: r });
          throw r;
        }
      }
      async _startPasskeyAuthentication(e) {
        var r;
        me$1(this.experimental);
        try {
          let { data: i, error: s } = await E(
            this.fetch,
            'POST',
            `${this.url}/passkeys/authentication/options`,
            {
              headers: this.headers,
              body: {
                gotrue_meta_security: {
                  captcha_token:
                    (r = e?.options) === null || r === void 0 ? void 0 : r.captchaToken,
                },
              },
            },
          );
          return s
            ? this._returnResult({ data: null, error: s })
            : this._returnResult({ data: i, error: null });
        } catch (i) {
          if (_(i)) return this._returnResult({ data: null, error: i });
          throw i;
        }
      }
      async _verifyPasskeyAuthentication(e) {
        me$1(this.experimental);
        try {
          let { data: r, error: i } = await E(
            this.fetch,
            'POST',
            `${this.url}/passkeys/authentication/verify`,
            {
              headers: this.headers,
              body: { challenge_id: e.challengeId, credential: e.credential },
              xform: ge$1,
            },
          );
          return i
            ? this._returnResult({ data: null, error: i })
            : (r.session &&
                (await this._saveSession(r.session),
                await this._notifyAllSubscribers('SIGNED_IN', r.session)),
              this._returnResult({ data: r, error: null }));
        } catch (r) {
          if (_(r)) return this._returnResult({ data: null, error: r });
          throw r;
        }
      }
      async _listPasskeys() {
        me$1(this.experimental);
        try {
          return await this._useSession(async (e) => {
            let {
              data: { session: r },
              error: i,
            } = e;
            if (i) return this._returnResult({ data: null, error: i });
            if (!r) return this._returnResult({ data: null, error: new z() });
            let { data: s, error: o } = await E(this.fetch, 'GET', `${this.url}/passkeys`, {
              headers: this.headers,
              jwt: r.access_token,
              xform: (a) => ({ data: a, error: null }),
            });
            return o
              ? this._returnResult({ data: null, error: o })
              : this._returnResult({ data: s, error: null });
          });
        } catch (e) {
          if (_(e)) return this._returnResult({ data: null, error: e });
          throw e;
        }
      }
      async _updatePasskey(e) {
        me$1(this.experimental);
        try {
          return await this._useSession(async (r) => {
            let {
              data: { session: i },
              error: s,
            } = r;
            if (s) return this._returnResult({ data: null, error: s });
            if (!i) return this._returnResult({ data: null, error: new z() });
            let { data: o, error: a } = await E(
              this.fetch,
              'PATCH',
              `${this.url}/passkeys/${e.passkeyId}`,
              {
                headers: this.headers,
                jwt: i.access_token,
                body: { friendly_name: e.friendlyName },
              },
            );
            return a
              ? this._returnResult({ data: null, error: a })
              : this._returnResult({ data: o, error: null });
          });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: null, error: r });
          throw r;
        }
      }
      async _deletePasskey(e) {
        me$1(this.experimental);
        try {
          return await this._useSession(async (r) => {
            let {
              data: { session: i },
              error: s,
            } = r;
            if (s) return this._returnResult({ data: null, error: s });
            if (!i) return this._returnResult({ data: null, error: new z() });
            let { error: o } = await E(
              this.fetch,
              'DELETE',
              `${this.url}/passkeys/${e.passkeyId}`,
              { headers: this.headers, jwt: i.access_token, noResolveJson: !0 },
            );
            return o
              ? this._returnResult({ data: null, error: o })
              : this._returnResult({ data: null, error: null });
          });
        } catch (r) {
          if (_(r)) return this._returnResult({ data: null, error: r });
          throw r;
        }
      }
    }
    return ((n.nextInstanceID = {}), n);
  })(),
  sa = xm;
var Pm = sa,
  oa = Pm;
var Mm = '2.107.0',
  xr = '',
  us;
typeof Deno < 'u'
  ? ((xr = 'deno'), (us = (cs = Deno.version) === null || cs === void 0 ? void 0 : cs.deno))
  : typeof document < 'u'
    ? (xr = 'web')
    : typeof navigator < 'u' && navigator.product === 'ReactNative'
      ? (xr = 'react-native')
      : ((xr = 'node'),
        (us =
          typeof process < 'u'
            ? (ls = process.version) === null || ls === void 0
              ? void 0
              : ls.replace(/^v/, '')
            : void 0));
var cs,
  ls,
  Yu = [`runtime=${xr}`];
us && Yu.push(`runtime-version=${us}`);
var Nm = { 'X-Client-Info': `supabase-js/${Mm}; ${Yu.join('; ')}` },
  Lm = { headers: Nm },
  Fm = { schema: 'public' },
  Um = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
  },
  jm = {},
  Bm = { enabled: false, respectSamplingDecision: true };
function $m(n, t, e, r) {
  function i(s) {
    return s instanceof e
      ? s
      : new e(function (o) {
          o(s);
        });
  }
  return new (e || (e = Promise))(function (s, o) {
    function a(u) {
      try {
        l(r.next(u));
      } catch (d) {
        o(d);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (d) {
        o(d);
      }
    }
    function l(u) {
      u.done ? s(u.value) : i(u.value).then(a, c);
    }
    l((r = r.apply(n, [])).next());
  });
}
var aa = null,
  zm = '@opentelemetry/api';
function Hm() {
  return (aa === null && (aa = import(zm).catch(() => null)), aa);
}
function Vm() {
  return $m(this, void 0, void 0, function* () {
    try {
      let n = yield Hm();
      if (!n || !n.propagation || !n.context) return null;
      let t = {};
      n.propagation.inject(n.context.active(), t);
      let e = t.traceparent;
      return e ? { traceparent: e, tracestate: t.tracestate, baggage: t.baggage } : null;
    } catch {
      return null;
    }
  });
}
function qm(n) {
  if (!n || typeof n != 'string') return null;
  let t = n.split('-');
  if (t.length !== 4) return null;
  let [e, r, i, s] = t;
  if (e.length !== 2 || r.length !== 32 || i.length !== 16 || s.length !== 2) return null;
  let o = /^[0-9a-f]+$/i;
  return !o.test(e) ||
    !o.test(r) ||
    !o.test(i) ||
    !o.test(s) ||
    r === '00000000000000000000000000000000' ||
    i === '0000000000000000'
    ? null
    : {
        version: e,
        traceId: r,
        parentId: i,
        traceFlags: s,
        isSampled: (parseInt(s, 16) & 1) === 1,
      };
}
function Gm(n, t) {
  if (!n || !t || t.length === 0) return false;
  let e;
  if (n instanceof URL) e = n;
  else
    try {
      e = new URL(n);
    } catch {
      return false;
    }
  for (let r of t)
    try {
      if (typeof r == 'string') {
        if (Wm(e.hostname, r)) return !0;
      } else if (r instanceof RegExp) {
        if (r.test(e.hostname)) return !0;
      } else if (typeof r == 'function' && r(e)) return !0;
    } catch {
      continue;
    }
  return false;
}
function Wm(n, t) {
  if (t === n) return true;
  if (t.startsWith('*.')) {
    let e = t.slice(2);
    if (n.endsWith(e) && (n === e || n.endsWith('.' + e))) return true;
  }
  return false;
}
function Km(n) {
  let t = [];
  try {
    let e = new URL(n);
    t.push(e.hostname);
  } catch {}
  return (t.push('*.supabase.co', '*.supabase.in'), t.push('localhost', '127.0.0.1', '[::1]'), t);
}
function Pr(n) {
  '@babel/helpers - typeof';
  return (
    (Pr =
      typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              typeof Symbol == 'function' &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? 'symbol'
              : typeof t;
          }),
    Pr(n)
  );
}
function Jm(n, t) {
  if (Pr(n) != 'object' || !n) return n;
  var e = n[Symbol.toPrimitive];
  if (e !== void 0) {
    var r = e.call(n, t);
    if (Pr(r) != 'object') return r;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (t === 'string' ? String : Number)(n);
}
function Ym(n) {
  var t = Jm(n, 'string');
  return Pr(t) == 'symbol' ? t : t + '';
}
function Xm(n, t, e) {
  return (
    (t = Ym(t)) in n
      ? Object.defineProperty(n, t, {
          value: e,
          enumerable: true,
          configurable: true,
          writable: true,
        })
      : (n[t] = e),
    n
  );
}
function Ku(n, t) {
  var e = Object.keys(n);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(n);
    (t &&
      (r = r.filter(function (i) {
        return Object.getOwnPropertyDescriptor(n, i).enumerable;
      })),
      e.push.apply(e, r));
  }
  return e;
}
function H(n) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? Ku(Object(e), true).forEach(function (r) {
          Xm(n, r, e[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e))
        : Ku(Object(e)).forEach(function (r) {
            Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(e, r));
          });
  }
  return n;
}
var Zm = (n) => (n ? (...t) => n(...t) : (...t) => fetch(...t)),
  Qm = () => Headers,
  eg = (n, t, e, r, i) => {
    let s = Zm(r),
      o = Qm(),
      a = i?.enabled === true,
      c = i?.respectSamplingDecision !== false,
      l = a ? Km(t) : null;
    return async (u, d) => {
      var h;
      let f = (h = await e()) !== null && h !== void 0 ? h : n,
        p = new o(d?.headers);
      if (
        (p.has('apikey') || p.set('apikey', n),
        p.has('Authorization') || p.set('Authorization', `Bearer ${f}`),
        l)
      ) {
        let g = await tg(u, l, c);
        g &&
          (g.traceparent && !p.has('traceparent') && p.set('traceparent', g.traceparent),
          g.tracestate && !p.has('tracestate') && p.set('tracestate', g.tracestate),
          g.baggage && !p.has('baggage') && p.set('baggage', g.baggage));
      }
      return s(u, H(H({}, d), {}, { headers: p }));
    };
  };
async function tg(n, t, e) {
  if (!Gm(typeof n == 'string' || n instanceof URL ? n : n.url, t)) return null;
  let r = await Vm();
  if (!r || !r.traceparent) return null;
  if (e) {
    let i = qm(r.traceparent);
    if (i && !i.isSampled) return null;
  }
  return r;
}
function Ju(n) {
  return typeof n == 'boolean' ? { enabled: n } : n;
}
function ng(n) {
  return n.endsWith('/') ? n : n + '/';
}
function rg(n, t) {
  var e, r, i, s, o, a;
  let { db: c, auth: l, realtime: u, global: d } = n,
    { db: h, auth: f, realtime: p, global: g } = t,
    y = Ju(n.tracePropagation),
    v = Ju(t.tracePropagation),
    D = {
      db: H(H({}, h), c),
      auth: H(H({}, f), l),
      realtime: H(H({}, p), u),
      storage: {},
      global: H(
        H(H({}, g), d),
        {},
        {
          headers: H(
            H({}, (e = g?.headers) !== null && e !== void 0 ? e : {}),
            (r = d?.headers) !== null && r !== void 0 ? r : {},
          ),
        },
      ),
      tracePropagation: {
        enabled:
          (i = (s = y?.enabled) !== null && s !== void 0 ? s : v?.enabled) !== null && i !== void 0
            ? i
            : false,
        respectSamplingDecision:
          (o =
            (a = y?.respectSamplingDecision) !== null && a !== void 0
              ? a
              : v?.respectSamplingDecision) !== null && o !== void 0
            ? o
            : true,
      },
      accessToken: async () => '',
    };
  return (n.accessToken ? (D.accessToken = n.accessToken) : delete D.accessToken, D);
}
function ig(n) {
  let t = n?.trim();
  if (!t) throw new Error('supabaseUrl is required.');
  if (!t.match(/^https?:\/\//i))
    throw new Error('Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.');
  try {
    return new URL(ng(t));
  } catch {
    throw Error('Invalid supabaseUrl: Provided URL is malformed.');
  }
}
var sg = class extends oa {
    constructor(n) {
      super(n);
    }
  },
  og = class {
    constructor(n, t, e) {
      var r, i;
      ((this.supabaseUrl = n), (this.supabaseKey = t));
      let s = ig(n);
      if (!t) throw new Error('supabaseKey is required.');
      ((this.realtimeUrl = new URL('realtime/v1', s)),
        (this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace('http', 'ws')),
        (this.authUrl = new URL('auth/v1', s)),
        (this.storageUrl = new URL('storage/v1', s)),
        (this.functionsUrl = new URL('functions/v1', s)));
      let o = `sb-${s.hostname.split('.')[0]}-auth-token`,
        a = {
          db: Fm,
          realtime: jm,
          auth: H(H({}, Um), {}, { storageKey: o }),
          global: Lm,
          tracePropagation: Bm,
        },
        c = rg(e ?? {}, a);
      if (
        ((this.settings = c),
        (this.storageKey = (r = c.auth.storageKey) !== null && r !== void 0 ? r : ''),
        (this.headers = (i = c.global.headers) !== null && i !== void 0 ? i : {}),
        c.accessToken)
      )
        ((this.accessToken = c.accessToken),
          (this.auth = new Proxy(
            {},
            {
              get: (u, d) => {
                throw new Error(
                  `@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(d)} is not possible`,
                );
              },
            },
          )));
      else {
        var l;
        this.auth = this._initSupabaseAuthClient(
          (l = c.auth) !== null && l !== void 0 ? l : {},
          this.headers,
          c.global.fetch,
        );
      }
      ((this.fetch = eg(t, n, this._getAccessToken.bind(this), c.global.fetch, c.tracePropagation)),
        (this.realtime = this._initRealtimeClient(
          H(
            {
              headers: this.headers,
              accessToken: this._getAccessToken.bind(this),
              fetch: this.fetch,
            },
            c.realtime,
          ),
        )),
        this.accessToken &&
          Promise.resolve(this.accessToken())
            .then((u) => this.realtime.setAuth(u))
            .catch((u) => console.warn('Failed to set initial Realtime auth token:', u)),
        (this.rest = new Wl(new URL('rest/v1', s).href, {
          headers: this.headers,
          schema: c.db.schema,
          fetch: this.fetch,
          timeout: c.db.timeout,
          urlLengthLimit: c.db.urlLengthLimit,
        })),
        (this.storage = new gu(this.storageUrl.href, this.headers, this.fetch, e?.storage)),
        c.accessToken || this._listenForAuthEvents());
    }
    get functions() {
      return new dr(this.functionsUrl.href, { headers: this.headers, customFetch: this.fetch });
    }
    from(n) {
      return this.rest.from(n);
    }
    schema(n) {
      return this.rest.schema(n);
    }
    rpc(n, t = {}, e = { head: false, get: false, count: void 0 }) {
      return this.rest.rpc(n, t, e);
    }
    channel(n, t = { config: {} }) {
      return this.realtime.channel(n, t);
    }
    getChannels() {
      return this.realtime.getChannels();
    }
    removeChannel(n) {
      return this.realtime.removeChannel(n);
    }
    removeAllChannels() {
      return this.realtime.removeAllChannels();
    }
    async _getAccessToken() {
      var n = this,
        t,
        e;
      if (n.accessToken) return await n.accessToken();
      let { data: r } = await n.auth.getSession();
      return (t = (e = r.session) === null || e === void 0 ? void 0 : e.access_token) !== null &&
        t !== void 0
        ? t
        : n.supabaseKey;
    }
    _initSupabaseAuthClient(
      {
        autoRefreshToken: n,
        persistSession: t,
        detectSessionInUrl: e,
        storage: r,
        userStorage: i,
        storageKey: s,
        flowType: o,
        lock: a,
        debug: c,
        throwOnError: l,
        experimental: u,
        lockAcquireTimeout: d,
        skipAutoInitialize: h,
      },
      f,
      p,
    ) {
      let g = { Authorization: `Bearer ${this.supabaseKey}`, apikey: `${this.supabaseKey}` };
      return new sg({
        url: this.authUrl.href,
        headers: H(H({}, g), f),
        storageKey: s,
        autoRefreshToken: n,
        persistSession: t,
        detectSessionInUrl: e,
        storage: r,
        userStorage: i,
        flowType: o,
        lock: a,
        debug: c,
        throwOnError: l,
        experimental: u,
        fetch: p,
        lockAcquireTimeout: d,
        skipAutoInitialize: h,
        hasCustomAuthorizationHeader: Object.keys(this.headers).some(
          (y) => y.toLowerCase() === 'authorization',
        ),
      });
    }
    _initRealtimeClient(n) {
      return new br(
        this.realtimeUrl.href,
        H(H({}, n), {}, { params: H(H({}, { apikey: this.supabaseKey }), n?.params) }),
      );
    }
    _listenForAuthEvents() {
      return this.auth.onAuthStateChange((n, t) => {
        this._handleTokenChanged(n, 'CLIENT', t?.access_token);
      });
    }
    _handleTokenChanged(n, t, e) {
      (n === 'TOKEN_REFRESHED' || n === 'SIGNED_IN') && this.changedAccessToken !== e
        ? ((this.changedAccessToken = e), this.realtime.setAuth(e))
        : n === 'SIGNED_OUT' &&
          (this.realtime.setAuth(),
          t == 'STORAGE' && this.auth.signOut(),
          (this.changedAccessToken = void 0));
    }
  },
  Xu = (n, t, e) => new og(n, t, e);
function ag() {
  if (typeof window < 'u') return false;
  let n = globalThis.process;
  if (!n) return false;
  let t = n.version;
  if (t == null) return false;
  let e = t.match(/^v(\d+)\./);
  return e ? parseInt(e[1], 10) <= 18 : false;
}
ag() &&
  console.warn(
    '\u26A0\uFE0F  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217',
  );
var Zu = class n {
  client;
  projectId = 'pskgaxfcwrutoqfuzhye';
  constructor() {
    this.client = Xu(
      `https://${this.projectId}.supabase.co`,
      'sb_publishable_yMFs6pNQAMWiiZjcO4MMBA_8fMtqNFg',
    );
  }
  getSupabaseClient() {
    return this.client;
  }
  getProjectId() {
    return this.projectId;
  }
  static ɵfac = function (e) {
    return new (e || n)();
  };
  static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
};
var n = class extends Error {};
n.prototype.name = 'InvalidTokenError';
function b(t) {
  return decodeURIComponent(
    atob(t).replace(/(.)/g, (e, s) => {
      let r = s.charCodeAt(0).toString(16).toUpperCase();
      return (r.length < 2 && (r = '0' + r), '%' + r);
    }),
  );
}
function f(t) {
  let e = t.replace(/-/g, '+').replace(/_/g, '/');
  switch (e.length % 4) {
    case 0:
      break;
    case 2:
      e += '==';
      break;
    case 3:
      e += '=';
      break;
    default:
      throw new Error('base64 string is not of the correct length');
  }
  try {
    return b(e);
  } catch {
    return atob(e);
  }
}
function l(t, e) {
  if (typeof t != 'string') throw new n('Invalid token specified: must be a string');
  e || (e = {});
  let s = e.header === true ? 0 : 1,
    r = t.split('.')[s];
  if (typeof r != 'string') throw new n(`Invalid token specified: missing part #${s + 1}`);
  let g;
  try {
    g = f(r);
  } catch (a) {
    throw new n(`Invalid token specified: invalid base64 for part #${s + 1} (${a.message})`);
  }
  try {
    return JSON.parse(g);
  } catch (a) {
    throw new n(`Invalid token specified: invalid json for part #${s + 1} (${a.message})`);
  }
}
var m = class t {
  service = E$1(Zu);
  logger = E$1(dl);
  supabase = this.service.getSupabaseClient();
  projectId = this.service.getProjectId();
  currentUser = _e(null);
  jwtToken = _e('');
  userRoles = it(() => l(this.jwtToken())?.app_metadata?.roles || []);
  isLoggedIn = it(() => !!this.currentUser());
  constructor() {
    this.supabase.auth.onAuthStateChange((e, s) => {
      (this.currentUser.set(s?.user ?? null), this.jwtToken.set(s?.access_token ?? ''));
    });
  }
  async signUp(e, s) {
    let r = await this.supabase.auth.signUp({ email: e, password: s });
    return (this.logger.debug('auth.service.ts signUp | Sign-up response:', r), r);
  }
  async signIn(e, s) {
    let r = await this.supabase.auth.signInWithPassword({ email: e, password: s });
    return (this.logger.debug('auth.service.ts signIn | Sign-in response:', r), r);
  }
  async signOut() {
    localStorage.removeItem(`sb-${this.projectId}-auth-token`);
    let e = await this.supabase.auth.signOut();
    return (this.logger.debug('auth.service.ts signOut | Sign-out response:', e), e);
  }
  async refreshSession() {
    let e = await this.supabase.auth.refreshSession();
    return (this.logger.debug('auth.service.ts refreshSession | Refresh session response:', e), e);
  }
  async checkSession() {
    let {
      data: { session: e },
    } = await this.supabase.auth.getSession();
    return (this.logger.debug('auth.service.ts checkSession | Session:', e), !!e);
  }
  static ɵfac = function (s) {
    return new (s || t)();
  };
  static ɵprov = ee({ token: t, factory: t.ɵfac, providedIn: 'root' });
};
var o = class t {
    static urlPaths = {
      Home: '',
      Signup: 'signup',
      Signin: 'signin',
      ChorusDashboard: ':language/:accent/:sentenceId',
    };
    static authFlowPaths = [t.urlPaths.Signin, t.urlPaths.Signup];
  },
  S = [
    {
      path: o.urlPaths.Home,
      loadComponent: () => import('./chunk-BH5HCGC1.js').then((t) => t.Landing),
    },
    {
      path: o.urlPaths.Signin,
      loadComponent: () => import('./chunk-DSaddU8o.js').then((t) => t.Signin),
    },
    {
      path: o.urlPaths.Signup,
      loadComponent: () => import('./chunk-CW6GlT0B.js').then((t) => t.Signup),
    },
  ],
  v = [
    {
      path: o.urlPaths.ChorusDashboard,
      loadComponent: () => import('./chunk-CCmU15OY.js').then((t) => t.ChorusDashboard),
    },
  ],
  P = [...S, ...v];
var me = { providers: [Fh$1(), Rf(P, Mf())] };
function de(e, o) {
  let n = !o?.manualCleanup ? (o?.injector?.get(Ve$1) ?? E$1(Ve$1)) : null,
    r = ge(o?.equal),
    c;
  o?.requireSync
    ? (c = _e({ kind: 0 }, { equal: r }))
    : (c = _e({ kind: 1, value: o?.initialValue }, { equal: r }));
  let m,
    k = e.subscribe({
      next: (u) => c.set({ kind: 1, value: u }),
      error: (u) => {
        (c.set({ kind: 2, error: u }), m?.());
      },
      complete: () => {
        m?.();
      },
    });
  if (o?.requireSync && c().kind === 0) throw new C(601, false);
  return (
    (m = n?.onDestroy(k.unsubscribe.bind(k))),
    it(
      () => {
        let u = c();
        switch (u.kind) {
          case 1:
            return u.value;
          case 2:
            throw u.error;
          case 0:
            throw new C(601, false);
        }
      },
      { equal: o?.equal },
    )
  );
}
function ge(e = Object.is) {
  return (o, t) => o.kind === 1 && t.kind === 1 && e(o.value, t.value);
}
var ve = ['*', [['mat-toolbar-row']]],
  he = ['*', 'mat-toolbar-row'],
  ye = (() => {
    class e {
      static ɵfac = function (n) {
        return new (n || e)();
      };
      static ɵdir = Lv({
        type: e,
        selectors: [['mat-toolbar-row']],
        hostAttrs: [1, 'mat-toolbar-row'],
        exportAs: ['matToolbarRow'],
      });
    }
    return e;
  })(),
  be = (() => {
    class e {
      _elementRef = E$1(Xn$1);
      _platform = E$1(xe);
      _document = E$1(tn$1);
      color;
      _toolbarRows;
      ngAfterViewInit() {
        this._platform.isBrowser &&
          (this._checkToolbarMixedModes(),
          this._toolbarRows.changes.subscribe(() => this._checkToolbarMixedModes()));
      }
      _checkToolbarMixedModes() {
        this._toolbarRows.length;
      }
      static ɵfac = function (n) {
        return new (n || e)();
      };
      static ɵcmp = Av({
        type: e,
        selectors: [['mat-toolbar']],
        contentQueries: function (n, r, c) {
          if ((n & 1 && _f$1(c, ye, 5), n & 2)) {
            let m;
            aE((m = cE())) && (r._toolbarRows = m);
          }
        },
        hostAttrs: [1, 'mat-toolbar'],
        hostVars: 6,
        hostBindings: function (n, r) {
          n & 2 &&
            (DE(r.color ? 'mat-' + r.color : ''),
            kf$1('mat-toolbar-multiple-rows', r._toolbarRows.length > 0)(
              'mat-toolbar-single-row',
              r._toolbarRows.length === 0,
            ));
        },
        inputs: { color: 'color' },
        exportAs: ['matToolbar'],
        ngContentSelectors: he,
        decls: 2,
        vars: 0,
        template: function (n, r) {
          n & 1 && (oE(ve), iE(0), iE(1, 1));
        },
        styles: [
          `.mat-toolbar {
  background: var(--mat-toolbar-container-background-color, var(--mat-sys-surface));
  color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}
.mat-toolbar, .mat-toolbar h1, .mat-toolbar h2, .mat-toolbar h3, .mat-toolbar h4, .mat-toolbar h5, .mat-toolbar h6 {
  font-family: var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));
  font-size: var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));
  line-height: var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-weight: var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));
  letter-spacing: var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));
  margin: 0;
}
@media (forced-colors: active) {
  .mat-toolbar {
    outline: solid 1px;
  }
}
.mat-toolbar .mat-form-field-underline,
.mat-toolbar .mat-form-field-ripple,
.mat-toolbar .mat-focused .mat-form-field-ripple {
  background-color: currentColor;
}
.mat-toolbar .mat-form-field-label,
.mat-toolbar .mat-focused .mat-form-field-label,
.mat-toolbar .mat-select-value,
.mat-toolbar .mat-select-arrow,
.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow {
  color: inherit;
}
.mat-toolbar .mat-input-element {
  caret-color: currentColor;
}
.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed {
  --mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
  --mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));
}

.mat-toolbar-row, .mat-toolbar-single-row {
  display: flex;
  box-sizing: border-box;
  padding: 0 16px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  white-space: nowrap;
  height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-row, .mat-toolbar-single-row {
    height: var(--mat-toolbar-mobile-height, 56px);
  }
}

.mat-toolbar-multiple-rows {
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  min-height: var(--mat-toolbar-standard-height, 64px);
}
@media (max-width: 599px) {
  .mat-toolbar-multiple-rows {
    min-height: var(--mat-toolbar-mobile-height, 56px);
  }
}
`,
        ],
        encapsulation: 2,
      });
    }
    return e;
  })();
var fe = (() => {
  class e {
    static ɵfac = function (n) {
      return new (n || e)();
    };
    static ɵmod = Rv({ type: e });
    static ɵinj = Uc$1({ imports: [on] });
  }
  return e;
})();
var R = (e) => ['/', e];
function Me(e, o) {
  if (e & 1) {
    let t = eE$1();
    (jo$1(0, 'button', 3)(1, 'mat-icon'),
      RE(2, 'settings'),
      Va$1(),
      RE(3, ' Settings '),
      Va$1(),
      jo$1(4, 'a', 4),
      Cf$1('click', function () {
        ml$1(t);
        let r = nE(2);
        return yl$1(r.logOut());
      }),
      jo$1(5, 'mat-icon'),
      RE(6, 'person'),
      Va$1(),
      RE(7, ' Log Out '),
      Va$1());
  }
  if (e & 2) {
    let t = nE(2);
    (km$1(4), vf$1('routerLink', UE(1, R, t.appRoutesHelper.urlPaths.Home)));
  }
}
function Ce(e, o) {
  if (
    (e & 1 &&
      (jo$1(0, 'a', 5)(1, 'mat-icon'),
      RE(2, 'person'),
      Va$1(),
      RE(3, ' Log In '),
      Va$1(),
      jo$1(4, 'a', 6),
      RE(5, ' Sign Up '),
      Va$1()),
    e & 2)
  ) {
    let t = nE(2);
    (vf$1('routerLink', UE(2, R, t.appRoutesHelper.urlPaths.Signin)),
      km$1(4),
      vf$1('routerLink', UE(4, R, t.appRoutesHelper.urlPaths.Signup)));
  }
}
function De(e, o) {
  if (
    (e & 1 &&
      (jo$1(0, 'mat-toolbar', 0),
      Ef$1(1, 'img', 1),
      jo$1(2, 'span'),
      RE(3, 'Repeat With Me'),
      Va$1(),
      Ef$1(4, 'span', 2),
      Kv(5, Me, 8, 3)(6, Ce, 6, 6),
      jo$1(7, 'span'),
      RE(8),
      Va$1()()),
    e & 2)
  ) {
    let t = nE();
    (km$1(5), Jv(t.isLoggedIn() ? 5 : 6), km$1(3), $a('Logged in: ', t.isLoggedIn()));
  }
}
var y = class e {
  router = E$1(rn);
  location = E$1(zt);
  authService = E$1(m);
  currentUser = this.authService.currentUser;
  isLoggedIn = this.authService.isLoggedIn;
  userRoles = this.authService.userRoles;
  appRoutesHelper = o;
  isCurrentPathPartOfAuthFlow = de(
    this.router.events.pipe(
      $t$1((o) => o instanceof Oe),
      Ge$1((o) => this.checkIfAuthFlow(o.urlAfterRedirects)),
    ),
    { initialValue: this.checkIfAuthFlow(this.location.path()) },
  );
  logOut() {
    this.authService.signOut();
  }
  checkIfAuthFlow(o) {
    let t = o.split('?')[0].replace(/^\//, '');
    return this.appRoutesHelper.authFlowPaths.map(String).includes(t);
  }
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = Av({
    type: e,
    selectors: [['app-navbar']],
    decls: 1,
    vars: 1,
    consts: [
      ['color', 'primary'],
      ['src', 'favicon-32x32.png', 'alt', 'Company Logo', 1, 'navbar-logo'],
      [1, 'navbar-spacer'],
      ['mat-button', '', 1, 'navbar-button'],
      ['mat-button', '', 1, 'navbar-button', 3, 'click', 'routerLink'],
      ['mat-button', '', 1, 'navbar-button', 3, 'routerLink'],
      ['mat-raised-button', '', 'color', 'primary', 1, 'navbar-button', 3, 'routerLink'],
    ],
    template: function (t, n) {
      (t & 1 && Kv(0, De, 9, 2, 'mat-toolbar', 0),
        t & 2 && Jv(n.isCurrentPathPartOfAuthFlow() ? -1 : 0));
    },
    dependencies: [lw, cw, fe, be, tE, eE, ul],
    styles: [
      '.navbar-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.navbar-button[_ngcontent-%COMP%]{margin:0 .5rem}',
    ],
  });
};
var x = class e {
  title = _e('repeat-with-me');
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = Av({
    type: e,
    selectors: [['app-root']],
    decls: 2,
    vars: 0,
    template: function (t, n) {
      t & 1 && Ef$1(0, 'app-navbar')(1, 'router-outlet');
    },
    dependencies: [mo, y],
    encapsulation: 2,
    changeDetection: 1,
  });
};
_d(x, me).catch((e) => console.error(e));
export {
  $y as $,
  Av as A,
  Ba as B,
  Cf$1 as C,
  DO as D,
  E$1 as E,
  Ff$1 as F,
  it as G,
  Ha as H,
  EO as I,
  Jv as J,
  Kv as K,
  Lv as L,
  p0 as M,
  N,
  J$1 as O,
  ln as P,
  Bf as Q,
  RE as R,
  bs as S,
  nh$1 as T,
  Uc$1 as U,
  Va$1 as V,
  Wy as W,
  Xn$1 as X,
  Ge$1 as Y,
  Xp$1 as Z,
  _e as _,
  Ef$1 as a,
  $t$1 as a0,
  oh$1 as a1,
  qp$1 as a2,
  bO as a3,
  id as a4,
  pf$1 as a5,
  $E as a6,
  Sf as a7,
  Mf$1 as a8,
  lE as a9,
  Vf$1 as aA,
  jf$1 as aB,
  Do as aC,
  Ae$1 as aD,
  Ll as aE,
  Kf$1 as aF,
  R0 as aG,
  Zu as aH,
  ee as aI,
  Vw as aJ,
  Br as aK,
  FE as aL,
  gm$1 as aM,
  V as aN,
  j$1 as aO,
  Zo$1 as aP,
  df$1 as aQ,
  Cg as aR,
  de$2 as aS,
  jv as aT,
  re as aU,
  Wp$1 as aV,
  $e as aW,
  Ve$1 as aX,
  C as aY,
  Pa as aZ,
  Ee$1 as a_,
  aE as aa,
  cE as ab,
  Nf$1 as ac,
  _f$1 as ad,
  Tf$1 as ae,
  Fy as af,
  t0 as ag,
  Hn$1 as ah,
  sg$1 as ai,
  wO as aj,
  yf$1 as ak,
  jl as al,
  Q as am,
  If$1 as an,
  uE as ao,
  Qn$1 as ap,
  rr as aq,
  ft$1 as ar,
  ut as as,
  Jn$1 as at,
  x$1 as au,
  eh$1 as av,
  GE as aw,
  yO as ax,
  hm$1 as ay,
  YE as az,
  jE as b,
  cw as c,
  dl as d,
  eE as e,
  $a as f,
  od as g,
  Rv as h,
  on as i,
  jo$1 as j,
  km$1 as k,
  lw as l,
  m,
  nE as n,
  o,
  oE as p,
  iE as q,
  rn as r,
  kf$1 as s,
  tE as t,
  Ro as u,
  vf$1 as v,
  De$2 as w,
  xe as x,
  vO as y,
  zw as z,
};
