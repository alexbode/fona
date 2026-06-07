var Jf$1 = Object.defineProperty,
  Xf$1 = Object.defineProperties;
var ep$1 = Object.getOwnPropertyDescriptors;
var Ka$1 = Object.getOwnPropertySymbols;
var tp$1 = Object.prototype.hasOwnProperty,
  np$1 = Object.prototype.propertyIsEnumerable;
var Ja$1 = (e, t, n) =>
    t in e
      ? Jf$1(e, t, { enumerable: true, configurable: true, writable: true, value: n })
      : (e[t] = n),
  j$1 = (e, t) => {
    for (var n in (t ||= {})) tp$1.call(t, n) && Ja$1(e, n, t[n]);
    if (Ka$1) for (var n of Ka$1(t)) np$1.call(t, n) && Ja$1(e, n, t[n]);
    return e;
  },
  V$1 = (e, t) => Xf$1(e, ep$1(t));
var q = null,
  nr$1 = false,
  ti$1 = 1,
  L = Symbol('SIGNAL');
function y(e) {
  let t = q;
  return ((q = e), t);
}
function rr$1() {
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
  if (nr$1) throw new Error('');
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
  if (o !== void 0 && o.consumer === q && (!r || ip$1(o, q))) return;
  let i = Lt$1(q),
    s = {
      producer: e,
      consumer: q,
      nextProducer: n,
      prevConsumer: o,
      lastReadVersion: e.version,
      nextConsumer: void 0,
    };
  ((q.producersTail = s), t !== void 0 ? (t.nextProducer = s) : (q.producers = s), i && nc$1(e, s));
}
function Xa$1() {
  ti$1++;
}
function at$2(e) {
  if (!(Lt$1(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === ti$1)) {
    if (!e.producerMustRecompute(e) && !Pt(e)) {
      Ot(e);
      return;
    }
    (e.producerRecomputeValue(e), Ot(e));
  }
}
function ni$1(e) {
  if (e.consumers === void 0) return;
  let t = nr$1;
  nr$1 = true;
  try {
    for (let n = e.consumers; n !== void 0; n = n.nextConsumer) {
      let r = n.consumer;
      r.dirty || op$1(r);
    }
  } finally {
    nr$1 = t;
  }
}
function ri$1() {
  return q?.consumerAllowSignalWrites !== false;
}
function op$1(e) {
  ((e.dirty = true), ni$1(e), e.consumerMarkedDirty?.(e));
}
function Ot(e) {
  ((e.dirty = false), (e.lastCleanEpoch = ti$1));
}
function Ne(e) {
  return (e && ec$1(e), y(e));
}
function ec$1(e) {
  ((e.producersTail = void 0), (e.recomputing = true));
}
function We$1(e, t) {
  (y(t), e && tc$1(e));
}
function tc$1(e) {
  e.recomputing = false;
  let t = e.producersTail,
    n = t !== void 0 ? t.nextProducer : e.producers;
  if (n !== void 0) {
    if (Lt$1(e))
      do n = oi$1(n);
      while (n !== void 0);
    t !== void 0 ? (t.nextProducer = void 0) : (e.producers = void 0);
  }
}
function Pt(e) {
  for (let t = e.producers; t !== void 0; t = t.nextProducer) {
    let n = t.producer,
      r = t.lastReadVersion;
    if (r !== n.version || (at$2(n), r !== n.version)) return true;
  }
  return false;
}
function qe$1(e) {
  if (Lt$1(e)) {
    let t = e.producers;
    for (; t !== void 0; ) t = oi$1(t);
  }
  ((e.producers = void 0),
    (e.producersTail = void 0),
    (e.consumers = void 0),
    (e.consumersTail = void 0));
}
function nc$1(e, t) {
  let n = e.consumersTail,
    r = Lt$1(e);
  if (
    (n !== void 0
      ? ((t.nextConsumer = n.nextConsumer), (n.nextConsumer = t))
      : ((t.nextConsumer = void 0), (e.consumers = t)),
    (t.prevConsumer = n),
    (e.consumersTail = t),
    !r)
  )
    for (let o = e.producers; o !== void 0; o = o.nextProducer) nc$1(o.producer, o);
}
function oi$1(e) {
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
  else if (((t.consumers = r), !Lt$1(t))) {
    let i = t.producers;
    for (; i !== void 0; ) i = oi$1(i);
  }
  return n;
}
function Lt$1(e) {
  return e.consumerIsAlwaysLive || e.consumers !== void 0;
}
function ip$1(e, t) {
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
function hn$1(e, t) {
  return Object.is(e, t);
}
function gn(e, t) {
  let n = Object.create(sp$1);
  ((n.computation = e), t !== void 0 && (n.equal = t));
  let r = () => {
    if ((at$2(n), Ue$1(n), n.value === me$1)) throw n.error;
    return n.value;
  };
  return ((r[L] = n), r);
}
var it$2 = Symbol('UNSET'),
  st$2 = Symbol('COMPUTING'),
  me$1 = Symbol('ERRORED'),
  sp$1 = V$1(j$1({}, $e$1), {
    value: it$2,
    dirty: true,
    error: null,
    equal: hn$1,
    kind: 'computed',
    producerMustRecompute(e) {
      return e.value === it$2 || e.value === st$2;
    },
    producerRecomputeValue(e) {
      if (e.value === st$2) throw new Error('');
      let t = e.value;
      e.value = st$2;
      let n = Ne(e),
        r,
        o = false;
      try {
        ((r = e.computation()),
          y(null),
          (o = t !== it$2 && t !== me$1 && r !== me$1 && e.equal(t, r)));
      } catch (i) {
        ((r = me$1), (e.error = i));
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
function ap$1() {
  throw new Error();
}
var rc$1 = ap$1;
function oc$1(e) {
  rc$1(e);
}
function ii$1(e) {
  rc$1 = e;
}
function si$1(e, t) {
  let n = Object.create(mn);
  ((n.value = e), t !== void 0 && (n.equal = t));
  let r = () => ic$1(n);
  return ((r[L] = n), [r, (s) => ct$1(n, s), (s) => or$1(n, s)]);
}
function ic$1(e) {
  return (Ue$1(e), e.value);
}
function ct$1(e, t) {
  (ri$1() || oc$1(e), e.equal(e.value, t) || ((e.value = t), lp$1(e)));
}
function or$1(e, t) {
  (ri$1() || oc$1(e), ct$1(e, t(e.value)));
}
var mn = V$1(j$1({}, $e$1), { equal: hn$1, value: void 0, kind: 'signal' });
function lp$1(e) {
  (e.version++, Xa$1(), ni$1(e));
}
var ai$1 = V$1(j$1({}, $e$1), {
  consumerIsAlwaysLive: true,
  consumerAllowSignalWrites: true,
  dirty: true,
  kind: 'effect',
});
function ci$1(e) {
  if (((e.dirty = false), e.version > 0 && !Pt(e))) return;
  e.version++;
  let t = Ne(e);
  try {
    (e.cleanup(), e.fn());
  } finally {
    We$1(e, t);
  }
}
var li$1;
function ir$1() {
  return li$1;
}
function ye(e) {
  let t = li$1;
  return ((li$1 = e), t);
}
var sc$1 = Symbol('NotFound');
function Ft$1(e) {
  return e === sc$1 || e?.name === '\u0275NotFound';
}
function ui$1(e, t, n) {
  let r = Object.create(up$1);
  ((r.source = e), (r.computation = t), n != null && (r.equal = n));
  let i = () => {
    if ((at$2(r), Ue$1(r), r.value === me$1)) throw r.error;
    return r.value;
  };
  return ((i[L] = r), i);
}
function ac$1(e, t) {
  (at$2(e), ct$1(e, t), Ot(e));
}
function cc(e, t) {
  if ((at$2(e), e.value === me$1)) throw e.error;
  (or$1(e, t), Ot(e));
}
var up$1 = V$1(j$1({}, $e$1), {
  value: it$2,
  dirty: true,
  error: null,
  equal: hn$1,
  kind: 'linkedSignal',
  producerMustRecompute(e) {
    return e.value === it$2 || e.value === st$2;
  },
  producerRecomputeValue(e) {
    if (e.value === st$2) throw new Error('');
    let t = e.value;
    e.value = st$2;
    let n = Ne(e),
      r,
      o = false;
    try {
      let i = e.source(),
        s = t !== it$2 && t !== me$1,
        a = s ? { source: e.sourceValue, value: t } : void 0;
      ((r = e.computation(i, a)),
        (e.sourceValue = i),
        y(null),
        (o = s && r !== me$1 && e.equal(t, r)));
    } catch (i) {
      ((r = me$1), (e.error = i));
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
function lc$1(e) {
  let t = y(null);
  try {
    return e();
  } finally {
    y(t);
  }
}
function I(e) {
  return typeof e == 'function';
}
function jt$1(e) {
  let n = e((r) => {
    (Error.call(r), (r.stack = new Error().stack));
  });
  return ((n.prototype = Object.create(Error.prototype)), (n.prototype.constructor = n), n);
}
var sr$1 = jt$1(
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
function yn(e, t) {
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
      if (I(r))
        try {
          r();
        } catch (i) {
          t = i instanceof sr$1 ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            uc$1(i);
          } catch (s) {
            ((t = t ?? []), s instanceof sr$1 ? (t = [...t, ...s.errors]) : t.push(s));
          }
      }
      if (t) throw new sr$1(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) uc$1(t);
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
    n === t ? (this._parentage = null) : Array.isArray(n) && yn(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    (n && yn(n, t), t instanceof e && t._removeParent(this));
  }
};
Q.EMPTY = (() => {
  let e = new Q();
  return ((e.closed = true), e);
})();
var di$1 = Q.EMPTY;
function ar$1(e) {
  return e instanceof Q || (e && 'closed' in e && I(e.remove) && I(e.add) && I(e.unsubscribe));
}
function uc$1(e) {
  I(e) ? e() : e.unsubscribe();
}
var ue$1 = { Promise: void 0 };
var Vt$1 = {
  setTimeout(e, t, ...n) {
    return setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    return clearTimeout(e);
  },
  delegate: void 0,
};
function cr(e) {
  Vt$1.setTimeout(() => {
    throw e;
  });
}
function vn() {}
function Ht$1(e) {
  e();
}
var ut$2 = class ut extends Q {
  constructor(t) {
    (super(),
      (this.isStopped = false),
      t ? ((this.destination = t), ar$1(t) && t.add(this)) : (this.destination = pp$1));
  }
  static create(t, n, r) {
    return new Se$1(t, n, r);
  }
  next(t) {
    this.isStopped ? hi$1() : this._next(t);
  }
  error(t) {
    this.isStopped ? hi$1() : ((this.isStopped = true), this._error(t));
  }
  complete() {
    this.isStopped ? hi$1() : ((this.isStopped = true), this._complete());
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
var gi$1 = class gi {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          lr$1(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          lr$1(r);
        }
      else lr$1(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          lr$1(n);
        }
    }
  },
  Se$1 = class Se extends ut$2 {
    constructor(t, n, r) {
      super();
      let o;
      if (I(t) || !t) o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        o = t;
      }
      this.destination = new gi$1(o);
    }
  };
function lr$1(e) {
  cr(e);
}
function fp$1(e) {
  throw e;
}
function hi$1(e, t) {}
var pp$1 = { closed: true, next: vn, error: fp$1, complete: vn };
var Bt$1 = (typeof Symbol == 'function' && Symbol.observable) || '@@observable';
function K(e) {
  return e;
}
function hp$1(...e) {
  return mi$1(e);
}
function mi$1(e) {
  return e.length === 0
    ? K
    : e.length === 1
      ? e[0]
      : function (n) {
          return e.reduce((r, o) => o(r), n);
        };
}
var x = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return ((r.source = this), (r.operator = n), r);
    }
    subscribe(n, r, o) {
      let i = mp(n) ? n : new Se$1(n, r, o);
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
        (r = gc$1(r)),
        new r((o, i) => {
          let s = new Se$1({
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
    [Bt$1]() {
      return this;
    }
    pipe(...n) {
      return mi$1(n)(this);
    }
    toPromise(n) {
      return (
        (n = gc$1(n)),
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
function gc$1(e) {
  var t;
  return (t = e ?? ue$1.Promise) !== null && t !== void 0 ? t : Promise;
}
function gp$1(e) {
  return e && I(e.next) && I(e.error) && I(e.complete);
}
function mp(e) {
  return (e && e instanceof ut$2) || (gp$1(e) && ar$1(e));
}
function yp$1(e) {
  return I(e?.lift);
}
function w(e) {
  return (t) => {
    if (yp$1(t))
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
  return new yi$1(e, t, n, r, o);
}
var yi$1 = class yi extends ut$2 {
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
var mc$1 = jt$1(
  (e) =>
    function () {
      (e(this), (this.name = 'ObjectUnsubscribedError'), (this.message = 'object unsubscribed'));
    },
);
var J$1 = (() => {
    class e extends x {
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
        let r = new ur$1(this, this);
        return ((r.operator = n), r);
      }
      _throwIfClosed() {
        if (this.closed) throw new mc$1();
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
          ? di$1
          : ((this.currentObservers = null),
            i.push(n),
            new Q(() => {
              ((this.currentObservers = null), yn(i, n));
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new x();
        return ((n.source = this), n);
      }
    }
    return ((e.create = (t, n) => new ur$1(t, n)), e);
  })(),
  ur$1 = class ur extends J$1 {
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
        : di$1;
    }
  };
var En = class extends J$1 {
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
var vi$1 = {
  now() {
    return (vi$1.delegate || Date).now();
  },
  delegate: void 0,
};
var dr$1 = class dr extends J$1 {
  constructor(t = 1 / 0, n = 1 / 0, r = vi$1) {
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
var dt$1 = new x((e) => e.complete());
function yc$1(e) {
  return e && I(e.schedule);
}
function Ei$1(e) {
  return e[e.length - 1];
}
function fr$1(e) {
  return I(Ei$1(e)) ? e.pop() : void 0;
}
function ve$1(e) {
  return yc$1(Ei$1(e)) ? e.pop() : void 0;
}
function vc$1(e, t) {
  return typeof Ei$1(e) == 'number' ? e.pop() : t;
}
function OD(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == 'function')
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (n[r[o]] = e[r[o]]);
  return n;
}
function Ic$1(e, t, n, r) {
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
function Ec$1(e) {
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
function ft$1(e) {
  return this instanceof ft$1 ? ((this.v = e), this) : new ft$1(e);
}
function Dc$1(e, t, n) {
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
    f.value instanceof ft$1 ? Promise.resolve(f.value.v).then(u, d) : p(i[0][2], f);
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
function Tc$1(e) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof Ec$1 == 'function' ? Ec$1(e) : e[Symbol.iterator]()),
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
var pr$1 = (e) => e && typeof e.length == 'number' && typeof e != 'function';
function hr$1(e) {
  return I(e?.then);
}
function gr$1(e) {
  return I(e[Bt$1]);
}
function mr$1(e) {
  return Symbol.asyncIterator && I(e?.[Symbol.asyncIterator]);
}
function yr$1(e) {
  return new TypeError(
    `You provided ${e !== null && typeof e == 'object' ? 'an invalid object' : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`,
  );
}
function vp$1() {
  return typeof Symbol != 'function' || !Symbol.iterator ? '@@iterator' : Symbol.iterator;
}
var vr$1 = vp$1();
function Er$1(e) {
  return I(e?.[vr$1]);
}
function Ir(e) {
  return Dc$1(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield ft$1(n.read());
        if (o) return yield ft$1(void 0);
        yield yield ft$1(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function Dr$1(e) {
  return I(e?.getReader);
}
function O(e) {
  if (e instanceof x) return e;
  if (e != null) {
    if (gr$1(e)) return Ep$1(e);
    if (pr$1(e)) return Ip$1(e);
    if (hr$1(e)) return Dp$1(e);
    if (mr$1(e)) return wc$1(e);
    if (Er$1(e)) return Tp$1(e);
    if (Dr$1(e)) return wp$1(e);
  }
  throw yr$1(e);
}
function Ep$1(e) {
  return new x((t) => {
    let n = e[Bt$1]();
    if (I(n.subscribe)) return n.subscribe(t);
    throw new TypeError('Provided object does not correctly implement Symbol.observable');
  });
}
function Ip$1(e) {
  return new x((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Dp$1(e) {
  return new x((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n),
    ).then(null, cr);
  });
}
function Tp$1(e) {
  return new x((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function wc$1(e) {
  return new x((t) => {
    Cp$1(e, t).catch((n) => t.error(n));
  });
}
function wp$1(e) {
  return wc$1(Ir(e));
}
function Cp$1(e, t) {
  var n, r, o, i;
  return Ic$1(this, void 0, void 0, function* () {
    try {
      for (n = Tc$1(e); (r = yield n.next()), !r.done; ) {
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
function Z(e, t, n, r = 0, o = false) {
  let i = t.schedule(function () {
    (n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe());
  }, r);
  if ((e.add(i), !o)) return i;
}
function Tr$1(e, t = 0) {
  return w((n, r) => {
    n.subscribe(
      b$1(
        r,
        (o) => Z(r, e, () => r.next(o), t),
        () => Z(r, e, () => r.complete(), t),
        (o) => Z(r, e, () => r.error(o), t),
      ),
    );
  });
}
function wr$1(e, t = 0) {
  return w((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function Cc$1(e, t) {
  return O(e).pipe(wr$1(t), Tr$1(t));
}
function bc$1(e, t) {
  return O(e).pipe(wr$1(t), Tr$1(t));
}
function _c$1(e, t) {
  return new x((n) => {
    let r = 0;
    return t.schedule(function () {
      r === e.length ? n.complete() : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function Mc$1(e, t) {
  return new x((n) => {
    let r;
    return (
      Z(n, t, () => {
        ((r = e[vr$1]()),
          Z(
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
      () => I(r?.return) && r.return()
    );
  });
}
function Cr$1(e, t) {
  if (!e) throw new Error('Iterable cannot be null');
  return new x((n) => {
    Z(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      Z(
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
function Nc$1(e, t) {
  return Cr$1(Ir(e), t);
}
function Sc$1(e, t) {
  if (e != null) {
    if (gr$1(e)) return Cc$1(e, t);
    if (pr$1(e)) return _c$1(e, t);
    if (hr$1(e)) return bc$1(e, t);
    if (mr$1(e)) return Cr$1(e, t);
    if (Er$1(e)) return Mc$1(e, t);
    if (Dr$1(e)) return Nc$1(e, t);
  }
  throw yr$1(e);
}
function Ee$1(e, t) {
  return t ? Sc$1(e, t) : O(e);
}
function bp$1(...e) {
  let t = ve$1(e);
  return Ee$1(e, t);
}
function _p$1(e, t) {
  let n = I(e) ? e : () => e,
    r = (o) => o.error(n());
  return new x(r);
}
function Mp$1(e) {
  return !!e && (e instanceof x || (I(e.lift) && I(e.subscribe)));
}
var In$1 = jt$1(
  (e) =>
    function () {
      (e(this), (this.name = 'EmptyError'), (this.message = 'no elements in sequence'));
    },
);
function pt$2(e, t) {
  return w((n, r) => {
    let o = 0;
    n.subscribe(
      b$1(r, (i) => {
        r.next(e.call(t, i, o++));
      }),
    );
  });
}
var { isArray: Np$1 } = Array;
function Sp$1(e, t) {
  return Np$1(t) ? e(...t) : e(t);
}
function br$1(e) {
  return pt$2((t) => Sp$1(e, t));
}
var { isArray: xp$1 } = Array,
  { getPrototypeOf: Ap$1, prototype: kp$1, keys: Rp$1 } = Object;
function _r$1(e) {
  if (e.length === 1) {
    let t = e[0];
    if (xp$1(t)) return { args: t, keys: null };
    if (Op$1(t)) {
      let n = Rp$1(t);
      return { args: n.map((r) => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function Op$1(e) {
  return e && typeof e == 'object' && Ap$1(e) === kp$1;
}
function Mr(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function Pp$1(...e) {
  let t = ve$1(e),
    n = fr$1(e),
    { args: r, keys: o } = _r$1(e);
  if (r.length === 0) return Ee$1([], t);
  let i = new x(Lp$1(r, t, o ? (s) => Mr(o, s) : K));
  return n ? i.pipe(br$1(n)) : i;
}
function Lp$1(e, t, n = K) {
  return (r) => {
    xc$1(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let c = 0; c < o; c++)
          xc$1(
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
function xc$1(e, t, n) {
  e ? Z(n, e, t) : t();
}
function Ac$1(e, t, n, r, o, i, s, a) {
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
                  s ? Z(t, s, () => h(S)) : h(S);
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
function ht(e, t, n = 1 / 0) {
  return I(t)
    ? ht((r, o) => pt$2((i, s) => t(r, i, o, s))(O(e(r, o))), n)
    : (typeof t == 'number' && (n = t), w((r, o) => Ac$1(r, o, e, n)));
}
function Nr(e = 1 / 0) {
  return ht(K, e);
}
function kc$1() {
  return Nr(1);
}
function Sr$1(...e) {
  return kc$1()(Ee$1(e, ve$1(e)));
}
function Fp$1(e) {
  return new x((t) => {
    O(e()).subscribe(t);
  });
}
function jp$1(...e) {
  let t = fr$1(e),
    { args: n, keys: r } = _r$1(e),
    o = new x((i) => {
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
              (!c || !d) && (l || i.next(r ? Mr(r, a) : a), i.complete());
            },
          ),
        );
      }
    });
  return t ? o.pipe(br$1(t)) : o;
}
function Vp$1(...e) {
  let t = ve$1(e),
    n = vc$1(e, 1 / 0),
    r = e;
  return r.length ? (r.length === 1 ? O(r[0]) : Nr(n)(Ee$1(r, t))) : dt$1;
}
function Dn(e, t) {
  return w((n, r) => {
    let o = 0;
    n.subscribe(b$1(r, (i) => e.call(t, i, o++) && r.next(i)));
  });
}
function Rc$1(e) {
  return w((t, n) => {
    let r = null,
      o = !1,
      i;
    ((r = t.subscribe(
      b$1(n, void 0, void 0, (s) => {
        ((i = O(e(s, Rc$1(e)(t)))), r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0));
      }),
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n)));
  });
}
function Hp$1(e, t) {
  return I(t) ? ht(e, t, 1) : ht(e, 1);
}
function Oc$1(e) {
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
function Ii$1(e) {
  return e <= 0
    ? () => dt$1
    : w((t, n) => {
        let r = 0;
        t.subscribe(
          b$1(n, (o) => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          }),
        );
      });
}
function Bp$1(e, t = K) {
  return (
    (e = e ?? $p$1),
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
function $p$1(e, t) {
  return e === t;
}
function Pc$1(e = Up$1) {
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
function Up$1() {
  return new In$1();
}
function Wp$1(e) {
  return w((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function qp$1(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(e ? Dn((o, i) => e(o, i, r)) : K, Ii$1(1), n ? Oc$1(t) : Pc$1(() => new In$1()));
}
function Gp$1(e) {
  return e <= 0
    ? () => dt$1
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
function zp$1() {
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
function Ti$1(e = {}) {
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
        (l--, l === 0 && !d && !u && (a = Di$1(h, o)));
      }),
        S.subscribe(_),
        !s &&
          l > 0 &&
          ((s = new Se$1({
            next: (fn) => S.next(fn),
            error: (fn) => {
              ((d = !0), p(), (a = Di$1(f, n, fn)), S.error(fn));
            },
            complete: () => {
              ((u = !0), p(), (a = Di$1(f, r)), S.complete());
            },
          })),
          O(m).subscribe(s)));
    })(i);
  };
}
function Di$1(e, t, ...n) {
  if (t === true) {
    e();
    return;
  }
  if (t === false) return;
  let r = new Se$1({
    next: () => {
      (r.unsubscribe(), e());
    },
  });
  return O(t(...n)).subscribe(r);
}
function Qp$1(e, t, n) {
  let r,
    o = false;
  return (
    e && typeof e == 'object'
      ? ({ bufferSize: r = 1 / 0, windowTime: t = 1 / 0, refCount: o = false, scheduler: n } = e)
      : (r = e ?? 1 / 0),
    Ti$1({
      connector: () => new dr$1(r, t, n),
      resetOnError: true,
      resetOnComplete: false,
      resetOnRefCountZero: o,
    })
  );
}
function Zp$1(e) {
  return Dn((t, n) => e <= n);
}
function Yp$1(...e) {
  let t = ve$1(e);
  return w((n, r) => {
    (t ? Sr$1(e, n, t) : Sr$1(e, n)).subscribe(r);
  });
}
function Kp$1(e, t) {
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
function Jp$1(e) {
  return w((t, n) => {
    (O(e).subscribe(b$1(n, () => n.complete(), vn)), !n.closed && t.subscribe(n));
  });
}
function Xp$1(e, t, n) {
  let r = I(e) || t || n ? { next: e, error: t, complete: n } : e;
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
    : K;
}
var Lr = 'https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss',
  C = class extends Error {
    code;
    constructor(t, n) {
      (super(Fr(t, n)), (this.code = t));
    }
  };
function eh$1(e) {
  return `NG0${Math.abs(e)}`;
}
function Fr(e, t) {
  return `${eh$1(e)}${t ? ': ' + t : ''}`;
}
function A(e) {
  for (let t in e) if (e[t] === A) return t;
  throw Error('');
}
function Hc$1(e, t) {
  for (let n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
}
function Mn$1(e) {
  if (typeof e == 'string') return e;
  if (Array.isArray(e)) return `[${e.map(Mn$1).join(', ')}]`;
  if (e == null) return '' + e;
  let t = e.overriddenName || e.name;
  if (t) return `${t}`;
  let n = e.toString();
  if (n == null) return '' + n;
  let r = n.indexOf(`
`);
  return r >= 0 ? n.slice(0, r) : n;
}
function jr(e, t) {
  return e ? (t ? `${e} ${t}` : e) : t || '';
}
var th$1 = A({ __forward_ref__: A });
function Vr$1(e) {
  return ((e.__forward_ref__ = Vr$1), e);
}
function $$1(e) {
  return Pi$1(e) ? e() : e;
}
function Pi$1(e) {
  return typeof e == 'function' && e.hasOwnProperty(th$1) && e.__forward_ref__ === Vr$1;
}
function ee(e) {
  return { token: e.token, providedIn: e.providedIn || null, factory: e.factory, value: void 0 };
}
function Bc$1(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function Nn$1(e) {
  return rh$1(e, Hr$1);
}
function nh$1(e) {
  return Nn$1(e) !== null;
}
function rh$1(e, t) {
  return (e.hasOwnProperty(t) && e[t]) || null;
}
function oh$1(e) {
  let t = e?.[Hr$1] ?? null;
  return t || null;
}
function Ci$1(e) {
  return e && e.hasOwnProperty(Ar) ? e[Ar] : null;
}
var Hr$1 = A({ ɵprov: A }),
  Ar = A({ ɵinj: A }),
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
function Li$1(e) {
  return e && !!e.ɵproviders;
}
var Fi$1 = A({ ɵcmp: A }),
  ji$1 = A({ ɵdir: A }),
  Vi$1 = A({ ɵpipe: A }),
  Hi$1 = A({ ɵmod: A }),
  wn = A({ ɵfac: A }),
  It = A({ __NG_ELEMENT_ID__: A }),
  Lc$1 = A({ __NG_ENV_ID__: A });
function $c$1(e) {
  return (Br(e), e[Hi$1] || null);
}
function Re$1(e) {
  return (Br(e), e[Fi$1] || null);
}
function Bi$1(e) {
  return (Br(e), e[ji$1] || null);
}
function Uc$1(e) {
  return (Br(e), e[Vi$1] || null);
}
function Br(e, t) {
  if (e == null) throw new C(-919, false);
}
function Sn(e) {
  return typeof e == 'string' ? e : e == null ? '' : String(e);
}
var Wc$1 = A({ ngErrorCode: A }),
  ih$1 = A({ ngErrorMessage: A });
A({ ngTokenPath: A });
function $i$1(e, t) {
  return qc$1('', -200);
}
function $r$1(e, t) {
  throw new C(-201, false);
}
function qc$1(e, t, n) {
  let r = new C(t, e);
  return ((r[Wc$1] = t), (r[ih$1] = e), r);
}
function ah$1(e) {
  return e[Wc$1];
}
var bi$1;
function Gc$1() {
  return bi$1;
}
function X(e) {
  let t = bi$1;
  return ((bi$1 = e), t);
}
function Ui$1(e, t, n) {
  let r = Nn$1(e);
  if (r && r.providedIn == 'root') return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & 8) return null;
  if (t !== void 0) return t;
  $r$1();
}
var Ur = globalThis;
var ch$1 = {},
  gt$1 = ch$1,
  lh$1 = '__NG_DI_FLAG__',
  _i$1 = class _i {
    injector;
    constructor(t) {
      this.injector = t;
    }
    retrieve(t, n) {
      let r = mt$1(n) || 0;
      try {
        return this.injector.get(t, r & 8 ? null : gt$1, r);
      } catch (o) {
        if (Ft$1(o)) return o;
        throw o;
      }
    }
  };
function uh$1(e, t = 0) {
  let n = ir$1();
  if (n === void 0) throw new C(-203, false);
  if (n === null) return Ui$1(e, void 0, t);
  {
    let r = dh$1(t),
      o = n.retrieve(e, r);
    if (Ft$1(o)) {
      if (r.optional) return null;
      throw o;
    }
    return o;
  }
}
function Ie$1(e, t = 0) {
  return (Gc$1() || uh$1)($$1(e), t);
}
function E$1(e, t) {
  return Ie$1(e, mt$1(t));
}
function mt$1(e) {
  return typeof e > 'u' || typeof e == 'number'
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function dh$1(e) {
  return { optional: !!(e & 8), host: !!(e & 1), self: !!(e & 2), skipSelf: !!(e & 4) };
}
function Mi$1(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = $$1(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new C(900, false);
      let o,
        i = 0;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          c = fh$1(a);
        typeof c == 'number' ? (c === -1 ? (o = a.token) : (i |= c)) : (o = a);
      }
      t.push(Ie$1(o, i));
    } else t.push(Ie$1(r));
  }
  return t;
}
function fh$1(e) {
  return e[lh$1];
}
function yt$1(e, t) {
  let n = e.hasOwnProperty(wn);
  return n ? e[wn] : null;
}
function zc$1(e, t, n) {
  if (e.length !== t.length) return false;
  for (let r = 0; r < e.length; r++) {
    let o = e[r],
      i = t[r];
    if ((n && ((o = n(o)), (i = n(i))), i !== o)) return false;
  }
  return true;
}
function Qc$1(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function Wr$1(e, t) {
  e.forEach((n) => (Array.isArray(n) ? Wr$1(n, t) : t(n)));
}
function Wi$1(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function xn$1(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function Zc$1(e, t) {
  let n = [];
  for (let r = 0; r < e; r++) n.push(t);
  return n;
}
function Yc$1(e, t, n, r) {
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
function qr$1(e, t, n) {
  let r = Wt$1(e, t);
  return (r >= 0 ? (e[r | 1] = n) : ((r = ~r), Yc$1(e, r, t, n)), r);
}
function Gr$1(e, t) {
  let n = Wt$1(e, t);
  if (n >= 0) return e[n | 1];
}
function Wt$1(e, t) {
  return ph$1(e, t, 1);
}
function ph$1(e, t, n) {
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
var Qe = {},
  G$1 = [],
  qt$1 = new N(''),
  An$1 = new N('', -1),
  qi$1 = new N(''),
  Ut$1 = class Ut {
    get(t, n = gt$1) {
      if (n === gt$1) {
        let o = qc$1('', -201);
        throw ((o.name = '\u0275NotFound'), o);
      }
      return n;
    }
  };
function zr$1(e) {
  return { ɵproviders: e };
}
function Kc$1(e) {
  return zr$1([{ provide: qt$1, multi: true, useValue: e }]);
}
function Jc$1(...e) {
  return { ɵproviders: Gi$1(true, e), ɵfromNgModule: true };
}
function Gi$1(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = (s) => {
      n.push(s);
    };
  return (
    Wr$1(t, (s) => {
      let a = s;
      kr(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && Xc$1(o, i),
    n
  );
}
function Xc$1(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    zi$1(o, (i) => {
      t(i, r);
    });
  }
}
function kr(e, t, n, r) {
  if (((e = $$1(e)), !e)) return false;
  let o = null,
    i = Ci$1(e),
    s = !i && Re$1(e);
  if (!i && !s) {
    let c = e.ngModule;
    if (((i = Ci$1(c)), i)) o = c;
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
      for (let l of c) kr(l, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let l;
      (Wr$1(i.imports, (u) => {
        kr(u, t, n, r) && ((l ||= []), l.push(u));
      }),
        l !== void 0 && Xc$1(l, t));
    }
    if (!a) {
      let l = yt$1(o) || (() => new o());
      (t({ provide: o, useFactory: l, deps: G$1 }, o),
        t({ provide: qi$1, useValue: o, multi: true }, o),
        t({ provide: qt$1, useValue: () => Ie$1(o), multi: true }, o));
    }
    let c = i.providers;
    if (c != null && !a) {
      let l = e;
      zi$1(c, (u) => {
        t(u, l);
      });
    }
  } else return false;
  return o !== e && e.providers !== void 0;
}
function zi$1(e, t) {
  for (let n of e) (Li$1(n) && (n = n.ɵproviders), Array.isArray(n) ? zi$1(n, t) : t(n));
}
var hh$1 = A({ provide: String, useValue: A });
function el$1(e) {
  return e !== null && typeof e == 'object' && hh$1 in e;
}
function gh$1(e) {
  return !!(e && e.useExisting);
}
function mh$1(e) {
  return !!(e && e.useFactory);
}
function vt$1(e) {
  return typeof e == 'function';
}
function tl$1(e) {
  return !!e.useClass;
}
var Qi$1 = new N(''),
  xr = {},
  Fc$1 = {},
  wi$1;
function Gt$1() {
  return (wi$1 === void 0 && (wi$1 = new Ut$1()), wi$1);
}
var re = class {},
  Et$1 = class Et extends re {
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
        Si$1(t, (s) => this.processProvider(s)),
        this.records.set(An$1, $t$1(void 0, this)),
        o.has('environment') && this.records.set(re, $t$1(void 0, this)));
      let i = this.records.get(Qi$1);
      (i != null && typeof i.value == 'string' && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(qi$1, G$1, { self: true }))));
    }
    retrieve(t, n) {
      let r = mt$1(n) || 0;
      try {
        return this.get(t, gt$1, r);
      } catch (o) {
        if (Ft$1(o)) return o;
        throw o;
      }
    }
    destroy() {
      (Tn$1(this), (this._destroyed = true));
      let t = y(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of n) r();
      } finally {
        (this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), y(t));
      }
    }
    onDestroy(t) {
      return (Tn$1(this), this._onDestroyHooks.push(t), () => this.removeOnDestroy(t));
    }
    runInContext(t) {
      Tn$1(this);
      let n = ye(this),
        r = X(void 0);
      try {
        return t();
      } finally {
        (ye(n), X(r));
      }
    }
    get(t, n = gt$1, r) {
      if ((Tn$1(this), t.hasOwnProperty(Lc$1))) return t[Lc$1](this);
      let o = mt$1(r),
        s = ye(this),
        a = X(void 0);
      try {
        if (!(o & 4)) {
          let l = this.records.get(t);
          if (l === void 0) {
            let u = Dh$1(t) && Nn$1(t);
            (u && this.injectableDefInScope(u) ? (l = $t$1(Ni$1(t), xr)) : (l = null),
              this.records.set(t, l));
          }
          if (l != null) return this.hydrate(t, l, o);
        }
        let c = o & 2 ? Gt$1() : this.parent;
        return ((n = o & 8 && n === gt$1 ? null : n), c.get(t, n));
      } catch (c) {
        let l = ah$1(c);
        throw l === -200 || l === -201 ? new C(l, null) : c;
      } finally {
        (X(a), ye(s));
      }
    }
    resolveInjectorInitializers() {
      let t = y(null),
        n = ye(this),
        r = X(void 0);
      try {
        let i = this.get(qt$1, G$1, { self: !0 });
        for (let s of i) s();
      } finally {
        (ye(n), X(r), y(t));
      }
    }
    toString() {
      return 'R3Injector[...]';
    }
    processProvider(t) {
      t = $$1(t);
      let n = vt$1(t) ? t : $$1(t && t.provide),
        r = vh$1(t);
      if (!vt$1(t) && t.multi === true) {
        let o = this.records.get(n);
        (o ||
          ((o = $t$1(void 0, xr, true)), (o.factory = () => Mi$1(o.multi)), this.records.set(n, o)),
          (n = t),
          o.multi.push(t));
      }
      this.records.set(n, r);
    }
    hydrate(t, n, r) {
      let o = y(null);
      try {
        if (n.value === Fc$1) throw $i$1('');
        return (
          n.value === xr && ((n.value = Fc$1), (n.value = n.factory(void 0, r))),
          typeof n.value == 'object' &&
            n.value &&
            Ih$1(n.value) &&
            this._ngOnDestroyHooks.add(n.value),
          n.value
        );
      } finally {
        y(o);
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
function Ni$1(e) {
  let t = Nn$1(e),
    n = t !== null ? t.factory : yt$1(e);
  if (n !== null) return n;
  if (e instanceof N) throw new C(-204, false);
  if (e instanceof Function) return yh$1(e);
  throw new C(-204, false);
}
function yh$1(e) {
  if (e.length > 0) throw new C(-204, false);
  let n = oh$1(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function vh$1(e) {
  if (el$1(e)) return $t$1(void 0, e.useValue);
  {
    let t = Zi$1(e);
    return $t$1(t, xr);
  }
}
function Zi$1(e, t, n) {
  let r;
  if (vt$1(e)) {
    let o = $$1(e);
    return yt$1(o) || Ni$1(o);
  } else if (el$1(e)) r = () => $$1(e.useValue);
  else if (mh$1(e)) r = () => e.useFactory(...Mi$1(e.deps || []));
  else if (gh$1(e)) r = (o, i) => Ie$1($$1(e.useExisting), i !== void 0 && i & 8 ? 8 : void 0);
  else {
    let o = $$1(e && (e.useClass || e.provide));
    if (Eh$1(e)) r = () => new o(...Mi$1(e.deps));
    else return yt$1(o) || Ni$1(o);
  }
  return r;
}
function Tn$1(e) {
  if (e.destroyed) throw new C(-205, false);
}
function $t$1(e, t, n = false) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function Eh$1(e) {
  return !!e.deps;
}
function Ih$1(e) {
  return e !== null && typeof e == 'object' && typeof e.ngOnDestroy == 'function';
}
function Dh$1(e) {
  return typeof e == 'function' || (typeof e == 'object' && e.ngMetadataName === 'InjectionToken');
}
function Si$1(e, t) {
  for (let n of e) Array.isArray(n) ? Si$1(n, t) : n && Li$1(n) ? Si$1(n.ɵproviders, t) : t(n);
}
function Qr$1(e, t) {
  let n;
  e instanceof Et$1 ? (Tn$1(e), (n = e)) : (n = new _i$1(e));
  let o = ye(n),
    i = X(void 0);
  try {
    return t();
  } finally {
    (ye(o), X(i));
  }
}
function nl$1() {
  return Gc$1() !== void 0 || ir$1() != null;
}
var fe = 0,
  g$1 = 1,
  v$1 = 2,
  H$1 = 3,
  oe = 4,
  z$1 = 5,
  zt$1 = 6,
  Qt$1 = 7,
  U = 8,
  Oe$1 = 9,
  pe = 10,
  R$1 = 11,
  Zt$1 = 12,
  Yi$1 = 13,
  Dt$1 = 14,
  Y$1 = 15,
  Ze = 16,
  Tt$1 = 17,
  we = 18,
  Pe$1 = 19,
  Ki$1 = 20,
  Ae$1 = 21,
  Zr$1 = 22,
  Ge$1 = 23,
  te = 24,
  wt$1 = 25,
  Ye = 26,
  F = 27,
  rl$1 = 1;
var Ke$1 = 7,
  kn$1 = 8,
  Ct$1 = 9,
  W$1 = 10;
function Le(e) {
  return Array.isArray(e) && typeof e[rl$1] == 'object';
}
function ie(e) {
  return Array.isArray(e) && e[rl$1] === true;
}
function Ji$1(e) {
  return (e.flags & 4) !== 0;
}
function Fe(e) {
  return e.componentOffset > -1;
}
function Rn$1(e) {
  return (e.flags & 1) === 1;
}
function Ce(e) {
  return !!e.template;
}
function Yt$1(e) {
  return (e[v$1] & 512) !== 0;
}
function bt$1(e) {
  return (e[v$1] & 256) === 256;
}
var ol$1 = 'svg',
  il$1 = 'math';
function se(e) {
  for (; Array.isArray(e); ) e = e[fe];
  return e;
}
function Xi$1(e, t) {
  return se(t[e]);
}
function ae$1(e, t) {
  return se(t[e.index]);
}
function Yr$1(e, t) {
  return e.data[t];
}
function sl$1(e, t) {
  return e[t];
}
function ce$1(e, t) {
  let n = t[e];
  return Le(n) ? n : n[fe];
}
function al$1(e) {
  return (e[v$1] & 4) === 4;
}
function Kr$1(e) {
  return (e[v$1] & 128) === 128;
}
function cl$1(e) {
  return ie(e[H$1]);
}
function be$1(e, t) {
  return t == null ? null : e[t];
}
function es$1(e) {
  e[Tt$1] = 0;
}
function ts$1(e) {
  e[v$1] & 1024 || ((e[v$1] |= 1024), Kr$1(e) && _t$1(e));
}
function ll$1(e, t) {
  for (; e > 0; ) ((t = t[Dt$1]), e--);
  return t;
}
function On$1(e) {
  return !!(e[v$1] & 9216 || e[te]?.dirty);
}
function Jr$1(e) {
  (e[pe].changeDetectionScheduler?.notify(8), e[v$1] & 64 && (e[v$1] |= 1024), On$1(e) && _t$1(e));
}
function _t$1(e) {
  e[pe].changeDetectionScheduler?.notify(0);
  let t = ke$1(e);
  for (; t !== null && !(t[v$1] & 8192 || ((t[v$1] |= 8192), !Kr$1(t))); ) t = ke$1(t);
}
function Xr$1(e, t) {
  if (bt$1(e)) throw new C(911, false);
  (e[Ae$1] === null && (e[Ae$1] = []), e[Ae$1].push(t));
}
function ul$1(e, t) {
  if (e[Ae$1] === null) return;
  let n = e[Ae$1].indexOf(t);
  n !== -1 && e[Ae$1].splice(n, 1);
}
function ke$1(e) {
  let t = e[H$1];
  return ie(t) ? t[H$1] : t;
}
function ns$1(e) {
  return (e[Qt$1] ??= []);
}
function rs$1(e) {
  return (e.cleanup ??= []);
}
function dl$1(e, t, n, r) {
  let o = ns$1(t);
  (o.push(n), e.firstCreatePass && rs$1(e).push(r, o.length - 1));
}
var T$1 = { lFrame: Cl$1(null), bindingsEnabled: true, skipHydrationRootTNode: null };
var xi$1 = false;
function fl$1() {
  return T$1.lFrame.elementDepthCount;
}
function pl$1() {
  T$1.lFrame.elementDepthCount++;
}
function os() {
  T$1.lFrame.elementDepthCount--;
}
function is$1() {
  return T$1.bindingsEnabled;
}
function ss$1() {
  return T$1.skipHydrationRootTNode !== null;
}
function as(e) {
  return T$1.skipHydrationRootTNode === e;
}
function cs() {
  T$1.skipHydrationRootTNode = null;
}
function D() {
  return T$1.lFrame.lView;
}
function P$1() {
  return T$1.lFrame.tView;
}
function hl$1(e) {
  return ((T$1.lFrame.contextLView = e), e[U]);
}
function gl$1(e) {
  return ((T$1.lFrame.contextLView = null), e);
}
function B() {
  let e = ls();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function ls() {
  return T$1.lFrame.currentTNode;
}
function ml$1() {
  let e = T$1.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function Kt$1(e, t) {
  let n = T$1.lFrame;
  ((n.currentTNode = e), (n.isParent = t));
}
function us() {
  return T$1.lFrame.isParent;
}
function ds() {
  T$1.lFrame.isParent = false;
}
function yl$1() {
  return T$1.lFrame.contextLView;
}
function fs() {
  return xi$1;
}
function Cn$1(e) {
  let t = xi$1;
  return ((xi$1 = e), t);
}
function vl$1(e) {
  return (T$1.lFrame.bindingIndex = e);
}
function Je$1() {
  return T$1.lFrame.bindingIndex++;
}
function ps(e) {
  let t = T$1.lFrame,
    n = t.bindingIndex;
  return ((t.bindingIndex = t.bindingIndex + e), n);
}
function El$1() {
  return T$1.lFrame.inI18n;
}
function Il$1(e, t) {
  let n = T$1.lFrame;
  ((n.bindingIndex = n.bindingRootIndex = e), eo$1(t));
}
function Dl$1() {
  return T$1.lFrame.currentDirectiveIndex;
}
function eo$1(e) {
  T$1.lFrame.currentDirectiveIndex = e;
}
function Tl$1(e) {
  let t = T$1.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function to$1() {
  return T$1.lFrame.currentQueryIndex;
}
function Pn$1(e) {
  T$1.lFrame.currentQueryIndex = e;
}
function Th$1(e) {
  let t = e[g$1];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[z$1] : null;
}
function hs(e, t, n) {
  if (n & 4) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & 1); )
      if (((o = Th$1(i)), o === null || ((i = i[Dt$1]), o.type & 10))) break;
    if (o === null) return false;
    ((t = o), (e = i));
  }
  let r = (T$1.lFrame = wl$1());
  return ((r.currentTNode = t), (r.lView = e), true);
}
function no$1(e) {
  let t = wl$1(),
    n = e[g$1];
  ((T$1.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = false));
}
function wl$1() {
  let e = T$1.lFrame,
    t = e === null ? null : e.child;
  return t === null ? Cl$1(e) : t;
}
function Cl$1(e) {
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
function bl$1() {
  let e = T$1.lFrame;
  return ((T$1.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e);
}
var gs = bl$1;
function ro$1() {
  let e = bl$1();
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
function _l$1(e) {
  return (T$1.lFrame.contextLView = ll$1(e, T$1.lFrame.contextLView))[U];
}
function Xe() {
  return T$1.lFrame.selectedIndex;
}
function et$1(e) {
  T$1.lFrame.selectedIndex = e;
}
function Jt$1() {
  let e = T$1.lFrame;
  return Yr$1(e.tView, e.selectedIndex);
}
function ms() {
  return T$1.lFrame.currentNamespace;
}
var Ml$1 = true;
function oo$1() {
  return Ml$1;
}
function io$1(e) {
  Ml$1 = e;
}
function Ai$1(e, t = null, n = null, r) {
  let o = ys(e, t, n);
  return (o.resolveInjectorInitializers(), o);
}
function ys(e, t = null, n = null, r, o = new Set()) {
  let i = [n || G$1, Jc$1(e)];
  return new Et$1(i, t || Gt$1(), null, o);
}
var de$1 = class e {
    static THROW_IF_NOT_FOUND = gt$1;
    static NULL = new Ut$1();
    static create(t, n) {
      if (Array.isArray(t)) return Ai$1({ name: '' }, n, t);
      {
        let r = t.name ?? '';
        return Ai$1({ name: r }, t.parent, t.providers);
      }
    }
    static ɵprov = ee({ token: e, providedIn: 'any', factory: () => Ie$1(An$1) });
    static __NG_ELEMENT_ID__ = -1;
  },
  Xt$1 = new N(''),
  je$1 = (() => {
    class e {
      static __NG_ELEMENT_ID__ = wh$1;
      static __NG_ENV_ID__ = (n) => n;
    }
    return e;
  })(),
  Rr$1 = class Rr extends je$1 {
    _lView;
    constructor(t) {
      (super(), (this._lView = t));
    }
    get destroyed() {
      return bt$1(this._lView);
    }
    onDestroy(t) {
      let n = this._lView;
      return (Xr$1(n, t), () => ul$1(n, t));
    }
  };
function wh$1() {
  return new Rr$1(D());
}
var Nl$1 = false,
  Sl$1 = new N(''),
  Mt = (() => {
    class e {
      taskId = 0;
      pendingTasks = new Set();
      destroyed = false;
      pendingTask = new En(false);
      debugTaskTracker = E$1(Sl$1, { optional: true });
      get hasPendingTasks() {
        return this.destroyed ? false : this.pendingTask.value;
      }
      get hasPendingTasksObservable() {
        return this.destroyed
          ? new x((n) => {
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
  ki$1 = class ki extends J$1 {
    __isAsync;
    destroyRef = void 0;
    pendingTasks = void 0;
    constructor(t = false) {
      (super(),
        (this.__isAsync = t),
        nl$1() &&
          ((this.destroyRef = E$1(je$1, { optional: true }) ?? void 0),
          (this.pendingTasks = E$1(Mt, { optional: true }) ?? void 0)));
    }
    emit(t) {
      let n = y(null);
      try {
        super.next(t);
      } finally {
        y(n);
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
  xe$1 = ki$1;
function Or(...e) {}
function vs(e) {
  let t, n;
  function r() {
    e = Or;
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
function xl$1(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = Or;
    }
  );
}
var Es = 'isAngularZone',
  bn = Es + '_ID',
  Ch$1 = 0,
  De$1 = class e {
    hasPendingMacrotasks = false;
    hasPendingMicrotasks = false;
    isStable = true;
    onUnstable = new xe$1(false);
    onMicrotaskEmpty = new xe$1(false);
    onStable = new xe$1(false);
    onError = new xe$1(false);
    constructor(t) {
      let {
        enableLongStackTrace: n = false,
        shouldCoalesceEventChangeDetection: r = false,
        shouldCoalesceRunChangeDetection: o = false,
        scheduleInRootZone: i = Nl$1,
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
        Mh$1(s));
    }
    static isInAngularZone() {
      return typeof Zone < 'u' && Zone.current.get(Es) === true;
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
        s = i.scheduleEventTask('NgZoneEvent: ' + o, t, bh$1, Or, Or);
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
  bh$1 = {};
function Is$1(e) {
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
function _h$1(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = true;
  function t() {
    vs(() => {
      ((e.callbackScheduled = false),
        Ri$1(e),
        (e.isCheckStableRunning = true),
        Is$1(e),
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
    Ri$1(e));
}
function Mh$1(e) {
  let t = () => {
      _h$1(e);
    },
    n = Ch$1++;
  e._inner = e._inner.fork({
    name: 'angular',
    properties: { [Es]: true, [bn]: n, [bn + n]: true },
    onInvokeTask: (r, o, i, s, a, c) => {
      if (Nh$1(c)) return r.invokeTask(i, s, a, c);
      try {
        return (jc$1(e), r.invokeTask(i, s, a, c));
      } finally {
        (((e.shouldCoalesceEventChangeDetection && s.type === 'eventTask') ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          Vc$1(e));
      }
    },
    onInvoke: (r, o, i, s, a, c, l) => {
      try {
        return (jc$1(e), r.invoke(i, s, a, c, l));
      } finally {
        (e.shouldCoalesceRunChangeDetection && !e.callbackScheduled && !Sh$1(c) && t(), Vc$1(e));
      }
    },
    onHasTask: (r, o, i, s) => {
      (r.hasTask(i, s),
        o === i &&
          (s.change == 'microTask'
            ? ((e._hasPendingMicrotasks = s.microTask), Ri$1(e), Is$1(e))
            : s.change == 'macroTask' && (e.hasPendingMacrotasks = s.macroTask)));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s),
      e.runOutsideAngular(() => e.onError.emit(s)),
      false
    ),
  });
}
function Ri$1(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === true)
    ? (e.hasPendingMicrotasks = true)
    : (e.hasPendingMicrotasks = false);
}
function jc$1(e) {
  (e._nesting++, e.isStable && ((e.isStable = false), e.onUnstable.emit(null)));
}
function Vc$1(e) {
  (e._nesting--, Is$1(e));
}
var _n = class {
  hasPendingMicrotasks = false;
  hasPendingMacrotasks = false;
  isStable = true;
  onUnstable = new xe$1();
  onMicrotaskEmpty = new xe$1();
  onStable = new xe$1();
  onError = new xe$1();
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
function Nh$1(e) {
  return Al$1(e, '__ignore_ng_zone__');
}
function Sh$1(e) {
  return Al$1(e, '__scheduler_tick__');
}
function Al$1(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? false : e[0]?.data?.[t] === true;
}
var ze$1 = class ze {
    _console = console;
    handleError(t) {
      this._console.error('ERROR', t);
    }
  },
  tt = new N('', {
    factory: () => {
      let e = E$1(De$1),
        t = E$1(re),
        n;
      return (r) => {
        e.runOutsideAngular(() => {
          t.destroyed && !n
            ? setTimeout(() => {
                throw r;
              })
            : ((n ??= t.get(ze$1)), n.handleError(r));
        });
      };
    },
  }),
  kl$1 = {
    provide: qt$1,
    useValue: () => {
      E$1(ze$1, { optional: true });
    },
    multi: true,
  },
  xh$1 = new N('', {
    factory: () => {
      let e = E$1(Xt$1).defaultView;
      if (!e) return;
      let t = E$1(tt),
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
        E$1(je$1).onDestroy(() => {
          (e.removeEventListener('error', r), e.removeEventListener('unhandledrejection', n));
        }));
    },
  });
function Ah$1() {
  return zr$1([
    Kc$1(() => {
      E$1(xh$1);
    }),
  ]);
}
function _e(e, t) {
  let [n, r, o] = si$1(e, t?.equal),
    i = n;
  i[L];
  return ((i.set = r), (i.update = o), (i.asReadonly = Ln$1.bind(i)), i);
}
function Ln$1() {
  let e = this[L];
  if (e.readonlyFn === void 0) {
    let t = () => this();
    ((t[L] = e), (e.readonlyFn = t));
  }
  return e.readonlyFn;
}
var Ds$1 = new N('', { factory: () => kh$1 }),
  kh$1 = 'ng';
var Rl$1 = new N(''),
  Rh$1 = new N('', { providedIn: 'platform', factory: () => 'unknown' }),
  Oh$1 = new N(''),
  Ph$1 = new N('', {
    factory: () =>
      E$1(Xt$1).body?.querySelector('[ngCspNonce]')?.getAttribute('ngCspNonce') || null,
  });
var so$1 = (() => {
  class e {
    static ɵprov = ee({
      token: e,
      providedIn: 'root',
      factory: () => {
        let n = new e();
        return ((n.store = Ol$1(E$1(Xt$1), E$1(Ds$1))), n);
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
function Ol$1(e, t) {
  let n = e.getElementById(t + '-state');
  if (n?.textContent)
    try {
      return JSON.parse(n.textContent);
    } catch (r) {
      console.warn('Exception while restoring TransferState for app ' + t, r);
    }
  return {};
}
var Fn$1 = (() => {
  class e {
    view;
    node;
    constructor(n, r) {
      ((this.view = n), (this.node = r));
    }
    static __NG_ELEMENT_ID__ = Lh$1;
  }
  return e;
})();
function Lh$1() {
  return new Fn$1(D(), B());
}
var Te = class {},
  jn$1 = new N('', { factory: () => true });
var Ts$1 = new N(''),
  ao$1 = (() => {
    class e {
      static ɵprov = ee({ token: e, providedIn: 'root', factory: () => new Oi$1() });
    }
    return e;
  })(),
  Oi$1 = class Oi {
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
  Pr = class {
    [L];
    constructor(t) {
      this[L] = t;
    }
    destroy() {
      this[L].destroy();
    }
  };
function ws(e, t) {
  let n = t?.injector ?? E$1(de$1),
    r = t?.manualCleanup !== true ? n.get(je$1) : null,
    o,
    i = n.get(Fn$1, null, { optional: true }),
    s = n.get(Te);
  return (
    i !== null
      ? ((o = Vh$1(i.view, s, e)), r instanceof Rr$1 && r._lView === i.view && (r = null))
      : (o = Hh$1(e, n.get(ao$1), s)),
    (o.injector = n),
    r !== null && (o.onDestroyFns = [r.onDestroy(() => o.destroy())]),
    new Pr(o)
  );
}
var Pl$1 = V$1(j$1({}, ai$1), {
    cleanupFns: void 0,
    zone: null,
    onDestroyFns: null,
    run() {
      let e = Cn$1(false);
      try {
        ci$1(this);
      } finally {
        Cn$1(e);
      }
    },
    cleanup() {
      if (!this.cleanupFns?.length) return;
      let e = y(null);
      try {
        for (; this.cleanupFns.length; ) this.cleanupFns.pop()();
      } finally {
        ((this.cleanupFns = []), y(e));
      }
    },
  }),
  Fh$1 = V$1(j$1({}, Pl$1), {
    consumerMarkedDirty() {
      (this.scheduler.schedule(this), this.notifier.notify(12));
    },
    destroy() {
      if ((qe$1(this), this.onDestroyFns !== null)) for (let e of this.onDestroyFns) e();
      (this.cleanup(), this.scheduler.remove(this));
    },
  }),
  jh$1 = V$1(j$1({}, Pl$1), {
    consumerMarkedDirty() {
      ((this.view[v$1] |= 8192), _t$1(this.view), this.notifier.notify(13));
    },
    destroy() {
      if ((qe$1(this), this.onDestroyFns !== null)) for (let e of this.onDestroyFns) e();
      (this.cleanup(), this.view[Ge$1]?.delete(this));
    },
  });
function Vh$1(e, t, n) {
  let r = Object.create(jh$1);
  return (
    (r.view = e),
    (r.zone = typeof Zone < 'u' ? Zone.current : null),
    (r.notifier = t),
    (r.fn = Ll$1(r, n)),
    (e[Ge$1] ??= new Set()),
    e[Ge$1].add(r),
    r.consumerMarkedDirty(r),
    r
  );
}
function Hh$1(e, t, n) {
  let r = Object.create(Fh$1);
  return (
    (r.fn = Ll$1(r, e)),
    (r.scheduler = t),
    (r.notifier = n),
    (r.zone = typeof Zone < 'u' ? Zone.current : null),
    r.scheduler.add(r),
    r.notifier.notify(12),
    r
  );
}
function Ll$1(e, t) {
  return () => {
    t((n) => (e.cleanupFns ??= []).push(n));
  };
}
function Vn$1(e) {
  return typeof e == 'function' && e[L] !== void 0;
}
function co$1(e) {
  return Vn$1(e) && typeof e.set == 'function';
}
var lo$1 = (() => {
  class e {
    internalPendingTasks = E$1(Mt);
    scheduler = E$1(Te);
    errorHandler = E$1(tt);
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
function Yn$1(e) {
  return { toString: e }.toString();
}
function mu$1(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
var vo$1 = class vo {
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
  eg$1 = (() => {
    let e = () => yu$1;
    return ((e.ngInherit = true), e);
  })();
function yu$1(e) {
  return (e.type.prototype.ngOnChanges && (e.setInput = ng), tg$1);
}
function tg$1() {
  let e = Eu$1(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === Qe) e.previous = t;
    else for (let r in t) n[r] = t[r];
    ((e.current = null), this.ngOnChanges(t));
  }
}
function ng(e, t, n, r, o) {
  let i = this.declaredInputs[r],
    s = Eu$1(e) || rg(e, { previous: Qe, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    l = c[i];
  ((a[i] = new vo$1(l && l.currentValue, n, c === Qe)), mu$1(e, t, o, n));
}
var vu$1 = '__ngSimpleChanges__';
function Eu$1(e) {
  return e[vu$1] || null;
}
function rg(e, t) {
  return (e[vu$1] = t);
}
var Fl$1 = [];
var k = function (e, t = null, n) {
    for (let r = 0; r < Fl$1.length; r++) {
      let o = Fl$1[r];
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
function og(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = yu$1(t);
    ((n.preOrderHooks ??= []).push(e, s), (n.preOrderCheckHooks ??= []).push(e, s));
  }
  (o && (n.preOrderHooks ??= []).push(0 - e, o),
    i && ((n.preOrderHooks ??= []).push(e, i), (n.preOrderCheckHooks ??= []).push(e, i)));
}
function Iu$1(e, t) {
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
function ho$1(e, t, n) {
  Du$1(e, t, 3, n);
}
function go$1(e, t, n, r) {
  (e[v$1] & 3) === n && Du$1(e, t, n, r);
}
function Cs$1(e, t) {
  let n = e[v$1];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[v$1] = n));
}
function Du$1(e, t, n, r) {
  let o = r !== void 0 ? e[Tt$1] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let c = o; c < s; c++)
    if (typeof t[c + 1] == 'number') {
      if (((a = t[c]), r != null && a >= r)) break;
    } else
      (t[c] < 0 && (e[Tt$1] += 65536),
        (a < i || i == -1) && (ig(e, n, t, c), (e[Tt$1] = (e[Tt$1] & 4294901760) + c + 2)),
        c++);
}
function jl$1(e, t) {
  k(M$1.LifecycleHookStart, e, t);
  let n = y(null);
  try {
    t.call(e);
  } finally {
    (y(n), k(M$1.LifecycleHookEnd, e, t));
  }
}
function ig(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o
    ? e[v$1] >> 14 < e[Tt$1] >> 16 && (e[v$1] & 3) === t && ((e[v$1] += 16384), jl$1(a, i))
    : jl$1(a, i);
}
var tn$1 = -1,
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
function sg(e) {
  return (e.flags & 8) !== 0;
}
function ag(e) {
  return (e.flags & 16) !== 0;
}
function cg(e, t, n) {
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
      (lg(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++);
    }
  }
  return r;
}
function Tu$1(e) {
  return e === 3 || e === 4 || e === 6;
}
function lg(e) {
  return e.charCodeAt(0) === 64;
}
function rn$1(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let n = -1;
      for (let r = 0; r < t.length; r++) {
        let o = t[r];
        typeof o == 'number'
          ? (n = o)
          : n === 0 ||
            (n === -1 || n === 2 ? Vl$1(e, n, o, null, t[++r]) : Vl$1(e, n, o, null, null));
      }
    }
  return e;
}
function Vl$1(e, t, n, r, o) {
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
function wu$1(e) {
  return e !== tn$1;
}
function Eo$1(e) {
  return e & 32767;
}
function ug(e) {
  return e >> 16;
}
function Io$1(e, t) {
  let n = ug(e),
    r = t;
  for (; n > 0; ) ((r = r[Dt$1]), n--);
  return r;
}
var Rs$1 = true;
function Hl$1(e) {
  let t = Rs$1;
  return ((Rs$1 = e), t);
}
var dg = 256,
  Cu$1 = dg - 1,
  bu$1 = 5,
  fg = 0,
  Me$1 = {};
function pg(e, t, n) {
  let r;
  (typeof n == 'string' ? (r = n.charCodeAt(0) || 0) : n.hasOwnProperty(It) && (r = n[It]),
    r == null && (r = n[It] = fg++));
  let o = r & Cu$1,
    i = 1 << o;
  t.data[e + (o >> bu$1)] |= i;
}
function Do$1(e, t) {
  let n = _u$1(e, t);
  if (n !== -1) return n;
  let r = t[g$1];
  r.firstCreatePass &&
    ((e.injectorIndex = t.length), bs(r.data, e), bs(t, null), bs(r.blueprint, null));
  let o = ca(e, t),
    i = e.injectorIndex;
  if (wu$1(o)) {
    let s = Eo$1(o),
      a = Io$1(o, t),
      c = a[g$1].data;
    for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | c[s + l];
  }
  return ((t[i + 8] = o), i);
}
function bs(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function _u$1(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function ca(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = Au$1(o)), r === null)) return tn$1;
    if ((n++, (o = o[Dt$1]), r.injectorIndex !== -1)) return r.injectorIndex | (n << 16);
  }
  return tn$1;
}
function Os$1(e, t, n) {
  pg(e, t, n);
}
function hg(e, t) {
  if (t === 'class') return e.classes;
  if (t === 'style') return e.styles;
  let n = e.attrs;
  if (n) {
    let r = n.length,
      o = 0;
    for (; o < r; ) {
      let i = n[o];
      if (Tu$1(i)) break;
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
function Mu$1(e, t, n) {
  if (n & 8 || e !== void 0) return e;
  $r$1();
}
function Nu$1(e, t, n, r) {
  if ((n & 8 && r === void 0 && (r = null), (n & 3) === 0)) {
    let o = e[Oe$1],
      i = X(void 0);
    try {
      return o ? o.get(t, r, n & 8) : Ui$1(t, r, n & 8);
    } finally {
      X(i);
    }
  }
  return Mu$1(r, t, n);
}
function Su$1(e, t, n, r = 0, o) {
  if (e !== null) {
    if (t[v$1] & 2048 && !(r & 2)) {
      let s = Eg(e, t, n, r, Me$1);
      if (s !== Me$1) return s;
    }
    let i = xu$1(e, t, n, r, Me$1);
    if (i !== Me$1) return i;
  }
  return Nu$1(t, n, r, o);
}
function xu$1(e, t, n, r, o) {
  let i = mg(n);
  if (typeof i == 'function') {
    if (!hs(t, e, r)) return r & 1 ? Mu$1(o, n, r) : Nu$1(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & 8))) $r$1(n);
      else return s;
    } finally {
      gs();
    }
  } else if (typeof i == 'number') {
    let s = null,
      a = _u$1(e, t),
      c = tn$1,
      l = r & 1 ? t[Y$1][z$1] : null;
    for (
      (a === -1 || r & 4) &&
      ((c = a === -1 ? ca(e, t) : t[a + 8]),
      c === tn$1 || !$l$1(r, false) ? (a = -1) : ((s = t[g$1]), (a = Eo$1(c)), (t = Io$1(c, t))));
      a !== -1;
    ) {
      let u = t[g$1];
      if (Bl$1(i, a, u.data)) {
        let d = gg(a, t, n, s, r, l);
        if (d !== Me$1) return d;
      }
      ((c = t[a + 8]),
        c !== tn$1 && $l$1(r, t[g$1].data[a + 8] === l) && Bl$1(i, a, t)
          ? ((s = u), (a = Eo$1(c)), (t = Io$1(c, t)))
          : (a = -1));
    }
  }
  return o;
}
function gg(e, t, n, r, o, i) {
  let s = t[g$1],
    a = s.data[e + 8],
    c = r == null ? Fe(a) && Rs$1 : r != s && (a.type & 3) !== 0,
    l = o & 1 && i === a,
    u = mo$1(a, s, n, c, l);
  return u !== null ? Un$1(t, s, u, a, o) : Me$1;
}
function mo$1(e, t, n, r, o) {
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
    if (f && Ce(f) && f.type === n) return c;
  }
  return null;
}
function Un$1(e, t, n, r, o) {
  let i = e[n],
    s = t.data;
  if (i instanceof Nt) {
    let a = i;
    if (a.resolving) throw $i$1();
    let c = Hl$1(a.canSeeViewProviders);
    a.resolving = true;
    s[n].type || s[n];
    let d = a.injectImpl ? X(a.injectImpl) : null;
    hs(e, r, 0);
    try {
      ((i = e[n] = a.factory(void 0, o, s, e, r)),
        t.firstCreatePass && n >= r.directiveStart && og(n, s[n], t));
    } finally {
      (d !== null && X(d), Hl$1(c), (a.resolving = false), gs());
    }
  }
  return i;
}
function mg(e) {
  if (typeof e == 'string') return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(It) ? e[It] : void 0;
  return typeof t == 'number' ? (t >= 0 ? t & Cu$1 : yg) : t;
}
function Bl$1(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> bu$1)] & r);
}
function $l$1(e, t) {
  return !(e & 2) && !(e & 1 && t);
}
var nt$1 = class nt {
  _tNode;
  _lView;
  constructor(t, n) {
    ((this._tNode = t), (this._lView = n));
  }
  get(t, n, r) {
    return Su$1(this._tNode, this._lView, t, mt$1(r), n);
  }
};
function yg() {
  return new nt$1(B(), D());
}
function vg(e) {
  return Yn$1(() => {
    let t = e.prototype.constructor,
      n = t[wn] || Ps$1(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[wn] || Ps$1(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function Ps$1(e) {
  return Pi$1(e)
    ? () => {
        let t = Ps$1($$1(e));
        return t && t();
      }
    : yt$1(e);
}
function Eg(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[v$1] & 2048 && !Yt$1(s); ) {
    let a = xu$1(i, s, n, r | 2, Me$1);
    if (a !== Me$1) return a;
    let c = i.parent;
    if (!c) {
      let l = s[Ki$1];
      if (l) {
        let u = l.get(n, Me$1, r & -5);
        if (u !== Me$1) return u;
      }
      ((c = Au$1(s)), (s = s[Dt$1]));
    }
    i = c;
  }
  return o;
}
function Au$1(e) {
  let t = e[g$1],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[z$1] : null;
}
function ku$1(e) {
  return hg(B(), e);
}
function Kn$1(e) {
  return {
    token: e.token,
    providedIn: e.autoProvided === false ? null : 'root',
    factory: e.factory,
    value: void 0,
  };
}
function Ig() {
  return cn$1(B(), D());
}
function cn$1(e, t) {
  return new Jn$1(ae$1(e, t));
}
var Jn$1 = (() => {
  class e {
    nativeElement;
    constructor(n) {
      this.nativeElement = n;
    }
    static __NG_ELEMENT_ID__ = Ig;
  }
  return e;
})();
function Ru$1(e) {
  return e instanceof Jn$1 ? e.nativeElement : e;
}
function Dg() {
  return this._results[Symbol.iterator]();
}
var To$1 = class To {
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
    let r = Qc$1(t);
    (this._changesDetected = !zc$1(this._results, r, n)) &&
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
  [Symbol.iterator] = Dg;
};
function Ou$1(e) {
  return (e.flags & 128) === 128;
}
var la = (function (e) {
    return (
      (e[(e.OnPush = 0)] = 'OnPush'),
      (e[(e.Eager = 1)] = 'Eager'),
      (e[(e.Default = 1)] = 'Default'),
      e
    );
  })(la || {}),
  Pu$1 = new Map(),
  Tg = 0;
function wg() {
  return Tg++;
}
function Cg(e) {
  Pu$1.set(e[Pe$1], e);
}
function Ls$1(e) {
  Pu$1.delete(e[Pe$1]);
}
var Ul$1 = '__ngContext__';
function on$1(e, t) {
  Le(t) ? ((e[Ul$1] = t[Pe$1]), Cg(t)) : (e[Ul$1] = t);
}
function Lu$1(e) {
  return ju$1(e[Zt$1]);
}
function Fu$1(e) {
  return ju$1(e[oe]);
}
function ju$1(e) {
  for (; e !== null && !ie(e); ) e = e[oe];
  return e;
}
var Fs$1;
function bg(e) {
  Fs$1 = e;
}
function Vu$1() {
  if (Fs$1 !== void 0) return Fs$1;
  if (typeof document < 'u') return document;
  throw new C(210, false);
}
var Hu$1 = false,
  Bu$1 = new N('', { factory: () => Hu$1 });
var Wl$1 = new WeakMap();
function _g(e, t) {
  if (e == null || typeof e != 'object') return;
  let n = Wl$1.get(e);
  (n || ((n = new WeakSet()), Wl$1.set(e, n)), n.add(t));
}
function jo$1(e) {
  return (e.flags & 32) === 32;
}
var Sg = () => null;
function $u$1(e, t, n = false) {
  return Sg();
}
function Uu$1(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = y(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          (Pn$1(i), a.contentQueries(2, t[s], s));
        }
      }
    } finally {
      y(r);
    }
  }
}
function js$1(e, t, n) {
  Pn$1(0);
  let r = y(null);
  try {
    t(e, n);
  } finally {
    y(r);
  }
}
function Wu$1(e, t, n) {
  if (Ji$1(t)) {
    let r = y(null);
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
      y(r);
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
var uo$1;
function xg() {
  if (uo$1 === void 0 && ((uo$1 = null), Ur.trustedTypes))
    try {
      uo$1 = Ur.trustedTypes.createPolicy('angular', {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return uo$1;
}
function Vo$1(e) {
  return xg()?.createHTML(e) || e;
}
var Ve$1 = class Ve {
    changingThisBreaksApplicationSecurity;
    constructor(t) {
      this.changingThisBreaksApplicationSecurity = t;
    }
    toString() {
      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Lr})`;
    }
  },
  Vs$1 = class Vs extends Ve$1 {
    getTypeName() {
      return 'HTML';
    }
  },
  Hs$1 = class Hs extends Ve$1 {
    getTypeName() {
      return 'Style';
    }
  },
  Bs$1 = class Bs extends Ve$1 {
    getTypeName() {
      return 'Script';
    }
  },
  $s$1 = class $s extends Ve$1 {
    getTypeName() {
      return 'URL';
    }
  },
  Us$1 = class Us extends Ve$1 {
    getTypeName() {
      return 'ResourceURL';
    }
  };
function Ho$1(e) {
  return e instanceof Ve$1 ? e.changingThisBreaksApplicationSecurity : e;
}
function qu$1(e, t) {
  let n = Gu$1(e);
  if (n != null && n !== t) {
    if (n === 'ResourceURL' && t === 'URL') return true;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${Lr})`);
  }
  return n === t;
}
function Gu$1(e) {
  return (e instanceof Ve$1 && e.getTypeName()) || null;
}
function Ag(e) {
  return new Vs$1(e);
}
function kg(e) {
  return new Hs$1(e);
}
function Rg(e) {
  return new Bs$1(e);
}
function Og(e) {
  return new $s$1(e);
}
function Pg(e) {
  return new Us$1(e);
}
function Lg(e) {
  let t = new qs$1(e);
  return Fg() ? new Ws$1(t) : t;
}
var Ws$1 = class Ws {
    inertDocumentHelper;
    constructor(t) {
      this.inertDocumentHelper = t;
    }
    getInertBodyElement(t) {
      t = '<body><remove></remove>' + t;
      try {
        let n = new window.DOMParser().parseFromString(Vo$1(t), 'text/html').body;
        return n === null
          ? this.inertDocumentHelper.getInertBodyElement(t)
          : (n.firstChild?.remove(), n);
      } catch {
        return null;
      }
    }
  },
  qs$1 = class qs {
    defaultDoc;
    inertDocument;
    constructor(t) {
      ((this.defaultDoc = t),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument('sanitization-inert')));
    }
    getInertBodyElement(t) {
      let n = this.inertDocument.createElement('template');
      return ((n.innerHTML = Vo$1(t)), n);
    }
  };
function Fg() {
  try {
    return !!new window.DOMParser().parseFromString(Vo$1(''), 'text/html');
  } catch {
    return false;
  }
}
var jg = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function ua(e) {
  return ((e = String(e)), e.match(jg) ? e : 'unsafe:' + e);
}
function He$1(e) {
  let t = {};
  for (let n of e.split(',')) t[n] = true;
  return t;
}
function Xn$1(...e) {
  let t = {};
  for (let n of e) for (let r in n) n.hasOwnProperty(r) && (t[r] = true);
  return t;
}
var zu$1 = He$1('area,br,col,hr,img,wbr'),
  Qu = He$1('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
  Zu$1 = He$1('rp,rt'),
  Vg = Xn$1(Zu$1, Qu),
  Hg = Xn$1(
    Qu,
    He$1(
      'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul',
    ),
  ),
  Bg = Xn$1(
    Zu$1,
    He$1(
      'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video',
    ),
  ),
  ql$1 = Xn$1(zu$1, Hg, Bg, Vg),
  Yu$1 = He$1('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
  $g = He$1(
    'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width',
  ),
  Ug = He$1(
    'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext',
  ),
  Wg = Xn$1(Yu$1, $g, Ug),
  qg = He$1('script,style,template'),
  Gs$1 = class Gs {
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
          (o.push(n), (n = Qg(n)));
          continue;
        }
        for (; n; ) {
          n.nodeType === Node.ELEMENT_NODE && this.endElement(n);
          let i = zg(n);
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
      let n = Gl$1(t).toLowerCase();
      if (!ql$1.hasOwnProperty(n)) return ((this.sanitizedSomething = true), !qg.hasOwnProperty(n));
      (this.buf.push('<'), this.buf.push(n));
      let r = t.attributes;
      for (let o = 0; o < r.length; o++) {
        let i = r.item(o),
          s = i.name,
          a = s.toLowerCase();
        if (!Wg.hasOwnProperty(a)) {
          this.sanitizedSomething = true;
          continue;
        }
        let c = i.value;
        (Yu$1[a] && (c = ua(c)), this.buf.push(' ', s, '="', zl(c), '"'));
      }
      return (this.buf.push('>'), true);
    }
    endElement(t) {
      let n = Gl$1(t).toLowerCase();
      ql$1.hasOwnProperty(n) &&
        !zu$1.hasOwnProperty(n) &&
        (this.buf.push('</'), this.buf.push(n), this.buf.push('>'));
    }
    chars(t) {
      this.buf.push(zl(t));
    }
  };
function Gg(e, t) {
  return (
    (e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) !==
    Node.DOCUMENT_POSITION_CONTAINED_BY
  );
}
function zg(e) {
  let t = e.nextSibling;
  if (t && e !== t.previousSibling) throw Ku$1(t);
  return t;
}
function Qg(e) {
  let t = e.firstChild;
  if (t && Gg(e, t)) throw Ku$1(t);
  return t;
}
function Gl$1(e) {
  let t = e.nodeName;
  return typeof t == 'string' ? t : 'FORM';
}
function Ku$1(e) {
  return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`);
}
var Zg = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  Yg = /([^\#-~ |!])/g;
function zl(e) {
  return e
    .replace(/&/g, '&amp;')
    .replace(Zg, function (t) {
      let n = t.charCodeAt(0),
        r = t.charCodeAt(1);
      return '&#' + ((n - 55296) * 1024 + (r - 56320) + 65536) + ';';
    })
    .replace(Yg, function (t) {
      return '&#' + t.charCodeAt(0) + ';';
    })
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
var fo$1;
function Kg(e, t) {
  let n = null;
  try {
    fo$1 = fo$1 || Lg(e);
    let r = t ? String(t) : '';
    n = fo$1.getInertBodyElement(r);
    let o = 5,
      i = r;
    do {
      if (o === 0) throw new Error('Failed to sanitize html because the input is unstable');
      (o--, (r = i), (i = n.innerHTML), (n = fo$1.getInertBodyElement(r)));
    } while (r !== i);
    let a = new Gs$1().sanitizeChildren(Ql$1(n) || n);
    return Vo$1(a);
  } finally {
    if (n) {
      let r = Ql$1(n) || n;
      for (; r.firstChild; ) r.firstChild.remove();
    }
  }
}
function Ql$1(e) {
  return 'content' in e && Jg(e) ? e.content : null;
}
function Jg(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === 'TEMPLATE';
}
function Xg(e, t) {
  return e.createText(t);
}
function em$1(e, t, n) {
  e.setValue(t, n);
}
function Ju$1(e, t, n) {
  return e.createElement(t, n);
}
function wo$1(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function Xu$1(e, t, n) {
  e.appendChild(t, n);
}
function Zl$1(e, t, n, r, o) {
  r !== null ? wo$1(e, t, n, r, o) : Xu$1(e, t, n);
}
function tm$1(e, t, n, r) {
  e.removeChild(null, t, n, r);
}
function nm$1(e, t, n) {
  e.setAttribute(t, 'style', n);
}
function rm$1(e, t, n) {
  n === '' ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n);
}
function ed(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  (r !== null && cg(e, t, r), o !== null && rm$1(e, t, o), i !== null && nm$1(e, t, i));
}
var da = (function (e) {
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
})(da || {});
function om$1(e) {
  let t = im$1();
  return t ? t.sanitize(da.URL, e) || '' : qu$1(e, 'URL') ? Ho$1(e) : ua(Sn(e));
}
function im$1() {
  let e = D();
  return e && e[pe].sanitizer;
}
function sm$1(e) {
  return e.ownerDocument.defaultView;
}
function am$1(e) {
  return e.ownerDocument;
}
function cm$1(e) {
  return e instanceof Function ? e() : e;
}
function lm$1(e, t, n) {
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
var td$1 = 'ng-template';
function um$1(e, t, n, r) {
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == 'string'; o += 2)
      if (t[o] === 'class' && lm$1(t[o + 1].toLowerCase(), n, 0) !== -1) return true;
  } else if (fa(e)) return false;
  if (((o = t.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == 'string'; )
      if (i.toLowerCase() === n) return true;
  }
  return false;
}
function fa(e) {
  return e.type === 4 && e.value !== td$1;
}
function dm$1(e, t, n) {
  let r = e.type === 4 && !n ? td$1 : e.value;
  return t === r;
}
function fm$1(e, t, n) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? gm$1(o) : 0,
    s = false;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == 'number') {
      if (!s && !he(r) && !he(c)) return false;
      if (s && he(c)) continue;
      ((s = false), (r = c | (r & 1)));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (((r = 2 | (r & 1)), (c !== '' && !dm$1(e, c, n)) || (c === '' && t.length === 1))) {
          if (he(r)) return false;
          s = true;
        }
      } else if (r & 8) {
        if (o === null || !um$1(e, o, c, n)) {
          if (he(r)) return false;
          s = true;
        }
      } else {
        let l = t[++a],
          u = pm$1(c, o, fa(e), n);
        if (u === -1) {
          if (he(r)) return false;
          s = true;
          continue;
        }
        if (l !== '') {
          let d;
          if ((u > i ? (d = '') : (d = o[u + 1].toLowerCase()), r & 2 && l !== d)) {
            if (he(r)) return false;
            s = true;
          }
        }
      }
  }
  return he(r) || s;
}
function he(e) {
  return (e & 1) === 0;
}
function pm$1(e, t, n, r) {
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
  } else return mm$1(t, e);
}
function nd$1(e, t, n = false) {
  for (let r = 0; r < t.length; r++) if (fm$1(e, t[r], n)) return true;
  return false;
}
function hm$1(e) {
  let t = e.attrs;
  if (t != null) {
    let n = t.indexOf(5);
    if ((n & 1) === 0) return t[n + 1];
  }
  return null;
}
function gm$1(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (Tu$1(n)) return t;
  }
  return e.length;
}
function mm$1(e, t) {
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
function ym$1(e, t) {
  e: for (let n = 0; n < t.length; n++) {
    let r = t[n];
    if (e.length === r.length) {
      for (let o = 0; o < e.length; o++) if (e[o] !== r[o]) continue e;
      return true;
    }
  }
  return false;
}
function Yl$1(e, t) {
  return e ? ':not(' + t.trim() + ')' : t;
}
function vm$1(e) {
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
    else (o !== '' && !he(s) && ((t += Yl$1(i, o)), (o = '')), (r = s), (i = i || !he(r)));
    n++;
  }
  return (o !== '' && (t += Yl$1(i, o)), t);
}
function Em$1(e) {
  return e.map(vm$1).join(',');
}
function Im$1(e) {
  let t = [],
    n = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == 'string') o === 2 ? i !== '' && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!he(o)) break;
      o = i;
    }
    r++;
  }
  return (n.length && t.push(1, ...n), t);
}
var le$1 = {};
function pa(e, t, n, r, o, i, s, a, c, l, u) {
  let d = F + r,
    p = d + o,
    f = Dm$1(d, p),
    h = typeof l == 'function' ? l() : l;
  return (f[g$1] = {
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
function Dm$1(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : le$1);
  return n;
}
function Tm$1(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = pa(
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
function ha(e, t, n, r, o, i, s, a, c, l, u) {
  let d = t.blueprint.slice();
  return (
    (d[fe] = o),
    (d[v$1] = r | 4 | 128 | 8 | 64 | 1024),
    (l !== null || (e && e[v$1] & 2048)) && (d[v$1] |= 2048),
    es$1(d),
    (d[H$1] = d[Dt$1] = e),
    (d[U] = n),
    (d[pe] = s || (e && e[pe])),
    (d[R$1] = a || (e && e[R$1])),
    (d[Oe$1] = c || (e && e[Oe$1]) || null),
    (d[z$1] = i),
    (d[Pe$1] = wg()),
    (d[zt$1] = u),
    (d[Ki$1] = l),
    (d[Y$1] = t.type == 2 ? e[Y$1] : d),
    d
  );
}
function wm$1(e, t, n) {
  let r = ae$1(t, e),
    o = Tm$1(n),
    i = e[pe].rendererFactory,
    s = ga(e, ha(e, o, null, rd$1(n), r, t, null, i.createRenderer(r, n), null, null, null));
  return (e[t.index] = s);
}
function rd$1(e) {
  let t = 16;
  return (e.signals ? (t = 4096) : e.onPush && (t = 64), t);
}
function od$1(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) (t.push(r), e.blueprint.push(r), e.data.push(null));
  return o;
}
function ga(e, t) {
  return (e[Zt$1] ? (e[Yi$1][oe] = t) : (e[Zt$1] = t), (e[Yi$1] = t), t);
}
function Cm$1(e = 1) {
  id$1(P$1(), D(), Xe() + e);
}
function id$1(e, t, n, r) {
  if ((t[v$1] & 3) === 3) {
    let i = e.preOrderCheckHooks;
    i !== null && ho$1(t, i, n);
  } else {
    let i = e.preOrderHooks;
    i !== null && go$1(t, i, 0, n);
  }
  et$1(n);
}
var Bo$1 = (function (e) {
  return (
    (e[(e.None = 0)] = 'None'),
    (e[(e.SignalBased = 1)] = 'SignalBased'),
    (e[(e.HasDecoratorInputTransform = 2)] = 'HasDecoratorInputTransform'),
    e
  );
})(Bo$1 || {});
function xt(e, t, n, r) {
  let o = y(null);
  try {
    let [i, s, a] = e.inputs[n],
      c = null;
    ((s & Bo$1.SignalBased) !== 0 && (c = t[i][L]),
      c !== null && c.transformFn !== void 0
        ? (r = c.transformFn(r))
        : a !== null && (r = a.call(t, r)),
      e.setInput !== null ? e.setInput(t, c, r, n, i) : mu$1(t, c, i, r));
  } finally {
    y(o);
  }
}
var Co$1 = (function (e) {
    return ((e[(e.Important = 1)] = 'Important'), (e[(e.DashCase = 2)] = 'DashCase'), e);
  })(Co$1 || {}),
  bm$1;
function ma(e, t) {
  return bm$1(e, t);
}
typeof document < 'u' && typeof document?.documentElement?.getAnimations == 'function';
var zs$1 = new WeakMap(),
  Hn$1 = new WeakSet();
function _m(e, t) {
  let n = zs$1.get(e);
  if (!n || n.length === 0) return;
  let r = t.parentNode,
    o = t.previousSibling;
  for (let i = n.length - 1; i >= 0; i--) {
    let s = n[i],
      a = s.parentNode;
    s === t
      ? (n.splice(i, 1),
        Hn$1.add(s),
        s.dispatchEvent(new CustomEvent('animationend', { detail: { cancel: true } })))
      : ((o && s === o) || (a && r && a !== r)) &&
        (n.splice(i, 1),
        s.dispatchEvent(new CustomEvent('animationend', { detail: { cancel: true } })),
        s.parentNode?.removeChild(s));
  }
}
function Mm$1(e, t) {
  let n = zs$1.get(e);
  n ? n.includes(t) || n.push(t) : zs$1.set(e, [t]);
}
var Wn$1 = new Set(),
  $o$1 = (function (e) {
    return (
      (e[(e.CHANGE_DETECTION = 0)] = 'CHANGE_DETECTION'),
      (e[(e.AFTER_NEXT_RENDER = 1)] = 'AFTER_NEXT_RENDER'),
      e
    );
  })($o$1 || {}),
  ln$1 = new N(''),
  Kl$1 = new Set();
function un$1(e) {
  Kl$1.has(e) ||
    (Kl$1.add(e), performance?.mark?.('mark_feature_usage', { detail: { feature: e } }));
}
var ya = (() => {
    class e {
      impl = null;
      execute() {
        this.impl?.execute();
      }
      static ɵprov = ee({ token: e, providedIn: 'root', factory: () => new e() });
    }
    return e;
  })(),
  va = [0, 1, 2, 3],
  sd$1 = (() => {
    class e {
      ngZone = E$1(De$1);
      scheduler = E$1(Te);
      errorHandler = E$1(ze$1, { optional: true });
      sequences = new Set();
      deferredRegistrations = new Set();
      executing = false;
      constructor() {
        E$1(ln$1, { optional: true });
      }
      execute() {
        let n = this.sequences.size > 0;
        (n && k(M$1.AfterRenderHooksStart), (this.executing = true));
        for (let r of va)
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
        return r ? r.run($o$1.AFTER_NEXT_RENDER, n) : n();
      }
      static ɵprov = ee({ token: e, providedIn: 'root', factory: () => new e() });
    }
    return e;
  })(),
  bo$1 = class bo {
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
var ad$1 = new N('', {
  factory: () => {
    let e = E$1(re),
      t = new Set();
    return (
      e.onDestroy(() => t.clear()),
      { queue: t, isScheduled: false, scheduler: null, injector: e }
    );
  },
});
function cd(e, t, n) {
  let r = e.get(ad$1);
  if (Array.isArray(t)) for (let o of t) (r.queue.add(o), n?.detachedLeaveAnimationFns?.push(o));
  else (r.queue.add(t), n?.detachedLeaveAnimationFns?.push(t));
  r.scheduler && r.scheduler(e);
}
function Nm$1(e, t) {
  let n = e.get(ad$1);
  if (Array.isArray(t)) for (let r of t) n.queue.delete(r);
  else n.queue.delete(t);
}
function Sm$1(e, t) {
  for (let [n, r] of t) cd(e, r.animateFns);
}
function Jl$1(e, t, n, r) {
  let o = e?.[Ye]?.enter;
  t !== null && o && o.has(n.index) && Sm$1(r, o);
}
function Xl$1(e, t, n, r) {
  try {
    n.get(An$1);
  } catch {
    return r(false);
  }
  let o = e?.[Ye];
  o?.enter?.has(t.index) && Nm$1(n, o.enter.get(t.index).animateFns);
  let i = xm$1(e, t, o);
  if (i.size === 0) {
    let s = false;
    if (e) {
      let a = [];
      (Uo$1(e, t, a), (s = a.length > 0));
    }
    if (!s) return r(false);
  }
  (e && Wn$1.add(e[Pe$1]), cd(n, () => Am$1(e, t, o || void 0, i, r), o || void 0));
}
function xm$1(e, t, n) {
  let r = new Map(),
    o = n?.leave;
  if ((o && o.has(t.index) && r.set(t.index, o.get(t.index)), e && o))
    for (let [i, s] of o) {
      if (r.has(i)) continue;
      let c = e[g$1].data[i].parent;
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
function Am$1(e, t, n, r, o) {
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
  if ((e && Uo$1(e, t, i), i.length > 0)) {
    let s = n || e?.[Ye];
    if (s) {
      let a = s.running;
      (a && i.push(a), (s.running = Promise.allSettled(i)), Rm$1(e, s.running, o));
    } else
      Promise.allSettled(i).then(() => {
        (e && Wn$1.delete(e[Pe$1]), o(true));
      });
  } else (e && Wn$1.delete(e[Pe$1]), o(false));
}
function Uo$1(e, t, n) {
  if (t.type & 12) {
    let o = e[t.index];
    if (ie(o))
      for (let i = W$1; i < o.length; i++) {
        let s = o[i];
        s[g$1].type === 2 && km$1(s, n);
      }
  }
  let r = t.child;
  for (; r; ) (Uo$1(e, r, n), (r = r.next));
}
function km$1(e, t) {
  let n = e[Ye];
  if (n && n.leave)
    for (let o of n.leave.values())
      for (let i of o.animateFns) {
        let { promise: s } = i();
        t.push(s);
      }
  let r = e[g$1].firstChild;
  for (; r; ) (Uo$1(e, r, t), (r = r.next));
}
function Rm$1(e, t, n) {
  t.then(() => {
    (e[Ye]?.running === t && ((e[Ye].running = void 0), Wn$1.delete(e[Pe$1])), n(true));
  });
}
function en$1(e, t, n, r, o, i, s, a) {
  if (o != null) {
    let c,
      l = false;
    ie(o) ? (c = o) : Le(o) && ((l = true), (o = o[fe]));
    let u = se(o);
    (e === 0 && r !== null
      ? (Jl$1(a, r, i, n), s == null ? Xu$1(t, r, u) : wo$1(t, r, u, s || null, true))
      : e === 1 && r !== null
        ? (Jl$1(a, r, i, n), wo$1(t, r, u, s || null, true), _m(i, u))
        : e === 2
          ? (a?.[Ye]?.leave?.has(i.index) && Mm$1(i, u),
            Hn$1.delete(u),
            Xl$1(a, i, n, (d) => {
              if (Hn$1.has(u)) {
                Hn$1.delete(u);
                return;
              }
              tm$1(t, u, l, d);
            }))
          : e === 3 &&
            (Hn$1.delete(u),
            Xl$1(a, i, n, () => {
              t.destroyNode(u);
            })),
      c != null && Um$1(t, e, n, c, i, r, s));
  }
}
function Om$1(e, t) {
  (ld$1(e, t), (t[fe] = null), (t[z$1] = null));
}
function Pm$1(e, t, n, r, o, i) {
  ((r[fe] = o), (r[z$1] = t), Wo$1(e, r, n, 1, o, i));
}
function ld$1(e, t) {
  (t[pe].changeDetectionScheduler?.notify(9), Wo$1(e, t, t[R$1], 2, null, null));
}
function Lm$1(e) {
  let t = e[Zt$1];
  if (!t) return _s(e[g$1], e);
  for (; t; ) {
    let n = null;
    if (Le(t)) n = t[Zt$1];
    else {
      let r = t[W$1];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[oe] && t !== e; ) (Le(t) && _s(t[g$1], t), (t = t[H$1]));
      (t === null && (t = e), Le(t) && _s(t[g$1], t), (n = t && t[oe]));
    }
    t = n;
  }
}
function Ea(e, t) {
  let n = e[Ct$1],
    r = n.indexOf(t);
  n.splice(r, 1);
}
function Ia(e, t) {
  if (bt$1(t)) return;
  let n = t[R$1];
  (n.destroyNode && Wo$1(e, t, n, 3, null, null), Lm$1(t));
}
function _s(e, t) {
  if (bt$1(t)) return;
  let n = y(null);
  try {
    ((t[v$1] &= -129),
      (t[v$1] |= 256),
      t[te] && qe$1(t[te]),
      jm$1(e, t),
      Fm$1(e, t),
      t[g$1].type === 1 && t[R$1].destroy());
    let r = t[Ze];
    if (r !== null && ie(t[H$1])) {
      r !== t[H$1] && Ea(r, t);
      let o = t[we];
      o !== null && o.detachView(e);
    }
    Ls$1(t);
  } finally {
    y(n);
  }
}
function Fm$1(e, t) {
  let n = e.cleanup,
    r = t[Qt$1];
  if (n !== null)
    for (let s = 0; s < n.length - 1; s += 2)
      if (typeof n[s] == 'string') {
        let a = n[s + 3];
        (a >= 0 ? r[a]() : r[-a].unsubscribe(), (s += 2));
      } else {
        let a = r[n[s + 1]];
        n[s].call(a);
      }
  r !== null && (t[Qt$1] = null);
  let o = t[Ae$1];
  if (o !== null) {
    t[Ae$1] = null;
    for (let s = 0; s < o.length; s++) {
      let a = o[s];
      a();
    }
  }
  let i = t[Ge$1];
  if (i !== null) {
    t[Ge$1] = null;
    for (let s of i) s.destroy();
  }
}
function jm$1(e, t) {
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
function ud$1(e, t, n) {
  return Vm$1(e, t.parent, n);
}
function Vm$1(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 168; ) ((t = r), (r = t.parent));
  if (r === null) return n[fe];
  if (Fe(r)) {
    let { encapsulation: o } = e.data[r.directiveStart + r.componentOffset];
    if (o === St$1.None || o === St$1.Emulated) return null;
  }
  return ae$1(r, n);
}
function dd$1(e, t, n) {
  return Bm$1(e, t, n);
}
function Hm$1(e, t, n) {
  return e.type & 40 ? ae$1(e, n) : null;
}
var Bm$1 = Hm$1;
function Da(e, t, n, r) {
  let o = ud$1(e, r, t),
    i = t[R$1],
    s = r.parent || t[z$1],
    a = dd$1(s, r, t);
  if (o != null)
    if (Array.isArray(n)) for (let c = 0; c < n.length; c++) Zl$1(i, o, n[c], a, false);
    else Zl$1(i, o, n, a, false);
}
function Bn$1(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return ae$1(t, e);
    if (n & 4) return Qs$1(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return Bn$1(e, r);
      {
        let o = e[t.index];
        return ie(o) ? Qs$1(-1, o) : se(o);
      }
    } else {
      if (n & 128) return Bn$1(e, t.next);
      if (n & 32) return ma(t, e)() || se(e[t.index]);
      {
        let r = fd$1(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = ke$1(e[Y$1]);
          return Bn$1(o, r);
        } else return Bn$1(e, t.next);
      }
    }
  }
  return null;
}
function fd$1(e, t) {
  if (t !== null) {
    let r = e[Y$1][z$1],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function Qs$1(e, t) {
  let n = W$1 + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[g$1].firstChild;
    if (o !== null) return Bn$1(r, o);
  }
  return t[Ke$1];
}
function Ta(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    let a = r[Oe$1];
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let c = r[n.index],
      l = n.type;
    if ((s && t === 0 && (c && on$1(se(c), r), (n.flags |= 2)), !jo$1(n)))
      if (l & 8) (Ta(e, t, n.child, r, o, i, false), en$1(t, e, a, o, c, n, i, r));
      else if (l & 32) {
        let u = ma(n, r),
          d;
        for (; (d = u()); ) en$1(t, e, a, o, d, n, i, r);
        en$1(t, e, a, o, c, n, i, r);
      } else l & 16 ? pd$1(e, t, r, n, o, i) : en$1(t, e, a, o, c, n, i, r);
    n = s ? n.projectionNext : n.next;
  }
}
function Wo$1(e, t, n, r, o, i) {
  Ta(n, r, e.firstChild, t, o, i, false);
}
function $m$1(e, t, n) {
  let r = t[R$1],
    o = ud$1(e, n, t),
    i = n.parent || t[z$1],
    s = dd$1(i, n, t);
  pd$1(r, 0, t, n, o, s);
}
function pd$1(e, t, n, r, o, i) {
  let s = n[Y$1],
    c = s[z$1].projection[r.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      let u = c[l];
      en$1(t, e, n[Oe$1], o, u, r, i, n);
    }
  else {
    let l = c,
      u = s[H$1];
    (Ou$1(r) && (l.flags |= 128), Ta(e, t, l, u, o, i, true));
  }
}
function Um$1(e, t, n, r, o, i, s) {
  let a = r[Ke$1],
    c = se(r);
  a !== c && en$1(t, e, n, i, a, o, s);
  for (let l = W$1; l < r.length; l++) {
    let u = r[l];
    Wo$1(u[g$1], u, e, t, i, a);
  }
}
function Wm$1(e, t, n, r, o) {
  o ? e.addClass(n, r) : e.removeClass(n, r);
}
function hd$1(e, t, n, r, o) {
  let i = Xe(),
    s = r & 2;
  try {
    (et$1(-1), s && t.length > F && id$1(e, t, F, !1));
    let a = s ? M$1.TemplateUpdateStart : M$1.TemplateCreateStart;
    (k(a, o, n), n(r, o));
  } finally {
    et$1(i);
    let a = s ? M$1.TemplateUpdateEnd : M$1.TemplateCreateEnd;
    k(a, o, n);
  }
}
function wa(e, t, n) {
  (Ym$1(e, t, n), (n.flags & 64) === 64 && Km$1(e, t, n));
}
function qo$1(e, t, n = ae$1) {
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
function qm$1(e, t, n, r) {
  let i = r.get(Bu$1, Hu$1) || n === St$1.ShadowDom || n === St$1.ExperimentalIsolatedShadowDom,
    s = e.selectRootElement(t, i);
  if (s.tagName.toLowerCase() === 'script') throw new C(905, false);
  return s;
}
function Qm$1(e) {
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
function gd$1(e, t, n, r, o, i) {
  let s = t[g$1];
  if (Ca(e, s, t, n, r)) {
    Fe(e) && Zm$1(t, e.index);
    return;
  }
  (e.type & 3 && (n = Qm$1(n)), md$1(e, t, n, r, o, i));
}
function md$1(e, t, n, r, o, i) {
  if (e.type & 3) {
    let s = ae$1(e, t);
    ((r = i != null ? i(r, e.value || '', n) : r), o.setProperty(s, n, r));
  } else e.type & 12;
}
function Zm$1(e, t) {
  let n = ce$1(t, e);
  n[v$1] & 16 || (n[v$1] |= 64);
}
function Ym$1(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd;
  (Fe(n) && wm$1(t, n, e.data[r + n.componentOffset]), e.firstCreatePass || Do$1(n, t));
  let i = n.initialInputs;
  for (let s = r; s < o; s++) {
    let a = e.data[s],
      c = Un$1(t, e, s, n);
    if ((on$1(c, t), i !== null && ty(t, s - r, c, a, n, i), Ce(a))) {
      let l = ce$1(n.index, t);
      l[U] = Un$1(t, e, s, n);
    }
  }
}
function Km$1(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = Dl$1();
  try {
    et$1(i);
    for (let a = r; a < o; a++) {
      let c = e.data[a],
        l = t[a];
      (eo$1(a),
        (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) && Jm$1(c, l));
    }
  } finally {
    (et$1(-1), eo$1(s));
  }
}
function Jm$1(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function yd$1(e, t) {
  let n = e.directiveRegistry,
    r = null;
  if (n)
    for (let o = 0; o < n.length; o++) {
      let i = n[o];
      nd$1(t, i.selectors, false) && ((r ??= []), Ce(i) ? r.unshift(i) : r.push(i));
    }
  return r;
}
function Xm$1(e, t, n, r, o, i) {
  let s = ae$1(e, t);
  ey(t[R$1], s, i, e.value, n, r, o);
}
function ey(e, t, n, r, o, i, s) {
  if (i == null) e.removeAttribute(t, o, n);
  else {
    let a = s == null ? Sn(i) : s(i, r || '', o);
    e.setAttribute(t, o, a, n);
  }
}
function ty(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; a += 2) {
      let c = s[a],
        l = s[a + 1];
      xt(r, n, c, l);
    }
}
function vd$1(e, t, n, r, o) {
  let i = F + n,
    s = t[g$1],
    a = o(s, t, e, r, n);
  ((t[i] = a), Kt$1(e, true));
  let c = e.type === 2;
  return (
    c ? (ed(t[R$1], a, e), (fl$1() === 0 || Rn$1(e)) && on$1(a, t), pl$1()) : on$1(a, t),
    oo$1() && (!c || !jo$1(e)) && Da(s, t, a, e),
    e
  );
}
function Ed$1(e) {
  let t = e;
  return (us() ? ds() : ((t = t.parent), Kt$1(t, false)), t);
}
function ny(e, t) {
  let n = e[Oe$1];
  if (!n) return;
  let r;
  try {
    r = n.get(tt, null);
  } catch {
    r = null;
  }
  r?.(t);
}
function Ca(e, t, n, r, o) {
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
function ry(e, t, n, r, o, i) {
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
function oy(e, t) {
  let n = ce$1(t, e),
    r = n[g$1];
  iy(r, n);
  let o = n[fe];
  (o !== null && n[zt$1] === null && (n[zt$1] = $u$1(o, n[Oe$1])), k(M$1.ComponentStart));
  try {
    ba(r, n, n[U]);
  } finally {
    k(M$1.ComponentEnd, n[U]);
  }
}
function iy(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function ba(e, t, n) {
  no$1(t);
  try {
    let r = e.viewQuery;
    r !== null && js$1(1, r, n);
    let o = e.template;
    (o !== null && hd$1(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[we]?.finishViewCreation(e),
      e.staticContentQueries && Uu$1(e, t),
      e.staticViewQueries && js$1(2, e.viewQuery, n));
    let i = e.components;
    i !== null && sy(t, i);
  } catch (r) {
    throw (e.firstCreatePass && ((e.incompleteFirstPass = true), (e.firstCreatePass = false)), r);
  } finally {
    ((t[v$1] &= -5), ro$1());
  }
}
function sy(e, t) {
  for (let n = 0; n < t.length; n++) oy(e, t[n]);
}
function _a(e, t, n, r) {
  let o = y(null);
  try {
    let i = t.tView,
      a = e[v$1] & 4096 ? 4096 : 16,
      c = ha(
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
    c[Ze] = l;
    let u = e[we];
    return (u !== null && (c[we] = u.createEmbeddedView(i)), ba(i, c, n), c);
  } finally {
    y(o);
  }
}
function _o$1(e, t) {
  return !t || t.firstChild === null || Ou$1(e);
}
function qn$1(e, t, n, r, o = false) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = o ? n.projectionNext : n.next;
      continue;
    }
    let i = t[n.index];
    (i !== null && r.push(se(i)), ie(i) && Id$1(i, r));
    let s = n.type;
    if (s & 8) qn$1(e, t, n.child, r);
    else if (s & 32) {
      let a = ma(n, t),
        c;
      for (; (c = a()); ) r.push(c);
    } else if (s & 16) {
      let a = fd$1(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let c = ke$1(t[Y$1]);
        qn$1(c[g$1], c, a, r, true);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function Id$1(e, t) {
  for (let n = W$1; n < e.length; n++) {
    let r = e[n],
      o = r[g$1].firstChild;
    o !== null && qn$1(r[g$1], r, o, t);
  }
  e[Ke$1] !== e[fe] && t.push(e[Ke$1]);
}
function Dd$1(e) {
  if (e[wt$1] !== null) {
    for (let t of e[wt$1]) t.impl.addSequence(t);
    e[wt$1].length = 0;
  }
}
var Td$1 = [];
function ay(e) {
  return e[te] ?? cy(e);
}
function cy(e) {
  let t = Td$1.pop() ?? Object.create(uy);
  return ((t.lView = e), t);
}
function ly(e) {
  e.lView[te] !== e && ((e.lView = null), Td$1.push(e));
}
var uy = V$1(j$1({}, $e$1), {
  consumerIsAlwaysLive: true,
  kind: 'template',
  consumerMarkedDirty: (e) => {
    _t$1(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[te] = this;
  },
});
function dy(e) {
  let t = e[te] ?? Object.create(fy);
  return ((t.lView = e), t);
}
var fy = V$1(j$1({}, $e$1), {
  consumerIsAlwaysLive: true,
  kind: 'template',
  consumerMarkedDirty: (e) => {
    let t = ke$1(e.lView);
    for (; t && !wd$1(t[g$1]); ) t = ke$1(t);
    t && ts$1(t);
  },
  consumerOnSignalRead() {
    this.lView[te] = this;
  },
});
function wd$1(e) {
  return e.type !== 2;
}
function Cd$1(e) {
  if (e[Ge$1] === null) return;
  let t = true;
  for (; t; ) {
    let n = false;
    for (let r of e[Ge$1])
      r.dirty &&
        ((n = true),
        r.zone === null || Zone.current === r.zone ? r.run() : r.zone.run(() => r.run()));
    t = n && !!(e[v$1] & 8192);
  }
}
var py = 100;
function bd$1(e, t = 0) {
  let r = e[pe].rendererFactory;
  r.begin?.();
  try {
    hy(e, t);
  } finally {
    r.end?.();
  }
}
function hy(e, t) {
  let n = fs();
  try {
    (Cn$1(!0), Zs$1(e, t));
    let r = 0;
    for (; On$1(e); ) {
      if (r === py) throw new C(103, !1);
      (r++, Zs$1(e, 1));
    }
  } finally {
    Cn$1(n);
  }
}
function gy(e, t, n, r) {
  if (bt$1(t)) return;
  let o = t[v$1],
    i = false,
    s = false;
  no$1(t);
  let a = true,
    c = null,
    l = null;
  wd$1(e)
    ? ((l = ay(t)), (c = Ne(l)))
    : rr$1() === null
      ? ((a = false), (l = dy(t)), (c = Ne(l)))
      : t[te] && (qe$1(t[te]), (t[te] = null));
  try {
    (es$1(t), vl$1(e.bindingStartIndex), n !== null && hd$1(e, t, n, 2, r));
    let u = (o & 3) === 3;
    if (!i)
      if (u) {
        let f = e.preOrderCheckHooks;
        f !== null && ho$1(t, f, null);
      } else {
        let f = e.preOrderHooks;
        (f !== null && go$1(t, f, 0, null), Cs$1(t, 0));
      }
    if ((s || my(t), Cd$1(t), _d$1(t, 0), e.contentQueries !== null && Uu$1(e, t), !i))
      if (u) {
        let f = e.contentCheckHooks;
        f !== null && ho$1(t, f);
      } else {
        let f = e.contentHooks;
        (f !== null && go$1(t, f, 1), Cs$1(t, 1));
      }
    vy(e, t);
    let d = e.components;
    d !== null && Nd$1(t, d, 0);
    let p = e.viewQuery;
    if ((p !== null && js$1(2, p, r), !i))
      if (u) {
        let f = e.viewCheckHooks;
        f !== null && ho$1(t, f);
      } else {
        let f = e.viewHooks;
        (f !== null && go$1(t, f, 2), Cs$1(t, 2));
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Zr$1])) {
      for (let f of t[Zr$1]) f();
      t[Zr$1] = null;
    }
    i || (Dd$1(t), (t[v$1] &= -73));
  } catch (u) {
    throw (_t$1(t), u);
  } finally {
    (l !== null && (We$1(l, c), a && ly(l)), ro$1());
  }
}
function _d$1(e, t) {
  for (let n = Lu$1(e); n !== null; n = Fu$1(n))
    for (let r = W$1; r < n.length; r++) {
      let o = n[r];
      Md$1(o, t);
    }
}
function my(e) {
  for (let t = Lu$1(e); t !== null; t = Fu$1(t)) {
    if (!(t[v$1] & 2)) continue;
    let n = t[Ct$1];
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      ts$1(o);
    }
  }
}
function yy(e, t, n) {
  k(M$1.ComponentStart);
  let r = ce$1(t, e);
  try {
    Md$1(r, n);
  } finally {
    k(M$1.ComponentEnd, r[U]);
  }
}
function Md$1(e, t) {
  Kr$1(e) && Zs$1(e, t);
}
function Zs$1(e, t) {
  let r = e[g$1],
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
    gy(r, e, r.template, e[U]);
  else if (o & 8192) {
    let a = y(null);
    try {
      (Cd$1(e), _d$1(e, 1));
      let c = r.components;
      (c !== null && Nd$1(e, c, 1), Dd$1(e));
    } finally {
      y(a);
    }
  }
}
function Nd$1(e, t, n) {
  for (let r = 0; r < t.length; r++) yy(e, t[r], n);
}
function vy(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) et$1(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          Il$1(s, i);
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
      et$1(-1);
    }
}
function Ma(e, t) {
  let n = fs() ? 64 : 1088;
  for (e[pe].changeDetectionScheduler?.notify(t); e; ) {
    e[v$1] |= n;
    let r = ke$1(e);
    if (Yt$1(e) && !r) return e;
    e = r;
  }
  return null;
}
function Sd$1(e, t, n, r) {
  return [e, true, 0, t, null, r, null, n, null, null];
}
function Ey(e, t) {
  let n = W$1 + t;
  if (n < e.length) return e[n];
}
function Na(e, t, n, r = true) {
  let o = t[g$1];
  if ((Dy(o, t, e, n), r)) {
    let s = Qs$1(n, e),
      a = t[R$1],
      c = a.parentNode(e[Ke$1]);
    c !== null && Pm$1(o, e[z$1], a, t, c, s);
  }
  let i = t[zt$1];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function Iy(e, t) {
  let n = Mo$1(e, t);
  return (n !== void 0 && Ia(n[g$1], n), n);
}
function Mo$1(e, t) {
  if (e.length <= W$1) return;
  let n = W$1 + t,
    r = e[n];
  if (r) {
    let o = r[Ze];
    (o !== null && o !== e && Ea(o, r), t > 0 && (e[n - 1][oe] = r[oe]));
    let i = xn$1(e, W$1 + t);
    Om$1(r[g$1], r);
    let s = i[we];
    (s !== null && s.detachView(i[g$1]), (r[H$1] = null), (r[oe] = null), (r[v$1] &= -129));
  }
  return r;
}
function Dy(e, t, n, r) {
  let o = W$1 + r,
    i = n.length;
  (r > 0 && (n[o - 1][oe] = t),
    r < i - W$1 ? ((t[oe] = n[o]), Wi$1(n, W$1 + r, t)) : (n.push(t), (t[oe] = null)),
    (t[H$1] = n));
  let s = t[Ze];
  s !== null && n !== s && xd$1(s, t);
  let a = t[we];
  (a !== null && a.insertView(e), Jr$1(t), (t[v$1] |= 128));
}
function xd$1(e, t) {
  let n = e[Ct$1],
    r = t[H$1];
  if (Le(r)) e[v$1] |= 2;
  else {
    let o = r[H$1][Y$1];
    t[Y$1] !== o && (e[v$1] |= 2);
  }
  n === null ? (e[Ct$1] = [t]) : n.push(t);
}
var rt$1 = class rt {
  _lView;
  _cdRefInjectingView;
  _appRef = null;
  _attachedToViewContainer = false;
  exhaustive;
  get rootNodes() {
    let t = this._lView,
      n = t[g$1];
    return qn$1(n, t, n.firstChild, []);
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
      if (ie(t)) {
        let n = t[kn$1],
          r = n ? n.indexOf(this) : -1;
        r > -1 && (Mo$1(t, r), xn$1(n, r));
      }
      this._attachedToViewContainer = false;
    }
    Ia(this._lView[g$1], this._lView);
  }
  onDestroy(t) {
    Xr$1(this._lView, t);
  }
  markForCheck() {
    Ma(this._cdRefInjectingView || this._lView, 4);
  }
  detach() {
    this._lView[v$1] &= -129;
  }
  reattach() {
    (Jr$1(this._lView), (this._lView[v$1] |= 128));
  }
  detectChanges() {
    ((this._lView[v$1] |= 1024), bd$1(this._lView));
  }
  checkNoChanges() {}
  attachToViewContainerRef() {
    if (this._appRef) throw new C(902, false);
    this._attachedToViewContainer = true;
  }
  detachFromAppRef() {
    this._appRef = null;
    let t = Yt$1(this._lView),
      n = this._lView[Ze];
    (n !== null && !t && Ea(n, this._lView), ld$1(this._lView[g$1], this._lView));
  }
  attachToAppRef(t) {
    if (this._attachedToViewContainer) throw new C(902, false);
    this._appRef = t;
    let n = Yt$1(this._lView),
      r = this._lView[Ze];
    (r !== null && !n && xd$1(r, this._lView), Jr$1(this._lView));
  }
};
var Gn$1 = (() => {
  class e {
    _declarationLView;
    _declarationTContainer;
    elementRef;
    static __NG_ELEMENT_ID__ = Ty;
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
      let i = _a(this._declarationLView, this._declarationTContainer, n, {
        embeddedViewInjector: r,
        dehydratedView: o,
      });
      return new rt$1(i);
    }
  }
  return e;
})();
function Ty() {
  return Go$1(B(), D());
}
function Go$1(e, t) {
  return e.type & 4 ? new Gn$1(t, e, cn$1(e, t)) : null;
}
function dn$1(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) ((i = wy(e, t, n, r, o)), El$1() && (i.flags |= 32));
  else if (i.type & 64) {
    ((i.type = n), (i.value = r), (i.attrs = o));
    let s = ml$1();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return (Kt$1(i, true), i);
}
function wy(e, t, n, r, o) {
  let i = ls(),
    s = us(),
    a = s ? i : i && i.parent,
    c = (e.data[t] = by(e, a, n, t, r, o));
  return (Cy(e, c, i, s), c);
}
function Cy(e, t, n, r) {
  (e.firstChild === null && (e.firstChild = t),
    n !== null &&
      (r
        ? n.child == null && t.parent !== null && (n.child = t)
        : n.next === null && ((n.next = t), (t.prev = n))));
}
function by(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    ss$1() && (a |= 128),
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
      namespace: ms(),
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
var _y = () => null,
  My = () => null;
function Ys$1(e, t) {
  return _y();
}
function Ny(e, t, n) {
  return My();
}
var Ad$1 = class Ad {},
  zn$1 = class zn {},
  Sy = (() => {
    class e {
      destroyNode = null;
      static __NG_ELEMENT_ID__ = () => xy();
    }
    return e;
  })();
function xy() {
  let e = D(),
    t = B(),
    n = ce$1(t.index, e);
  return (Le(n) ? n : e)[R$1];
}
var kd$1 = (() => {
  class e {
    static ɵprov = ee({ token: e, providedIn: 'root', factory: () => null });
  }
  return e;
})();
function Rd$1(e) {
  return e.debugInfo?.className || e.type.name || null;
}
var yo$1 = {},
  No$1 = class No {
    injector;
    parentInjector;
    constructor(t, n) {
      ((this.injector = t), (this.parentInjector = n));
    }
    get(t, n, r) {
      let o = this.injector.get(t, yo$1, r);
      return o !== yo$1 || n === yo$1 ? o : this.parentInjector.get(t, n, r);
    }
  };
function Be$1(e, t, n) {
  if (n === le$1) return false;
  let r = e[t];
  return Object.is(r, n) ? false : ((e[t] = n), true);
}
function nn$1(e, t, n) {
  return function r(o) {
    let i = r.__ngNativeEl__;
    i !== void 0 && _g(o, i);
    let s = Fe(e) ? ce$1(e.index, t) : t;
    Ma(s, 5);
    let a = t[U],
      c = tu$1(t, a, n, o),
      l = r.__ngNextListenerFn__;
    for (; l; ) ((c = tu$1(t, a, l, o) && c), (l = l.__ngNextListenerFn__));
    return c;
  };
}
function tu$1(e, t, n, r) {
  let o = y(null);
  try {
    return (k(M$1.OutputStart, t, n), n(r) !== !1);
  } catch (i) {
    return (ny(e, i), false);
  } finally {
    (k(M$1.OutputEnd, t, n), y(o));
  }
}
function Od$1(e, t, n, r, o, i, s, a) {
  let c = Rn$1(e),
    l = false,
    u = null;
  if ((!r && c && (u = ky(t, n, i, e.index)), u !== null)) {
    let d = u.__ngLastListenerFn__ || u;
    ((d.__ngNextListenerFn__ = s), (u.__ngLastListenerFn__ = s), (l = true));
  } else {
    let d = ae$1(e, n),
      p = r ? r(d) : d;
    r || (a.__ngNativeEl__ = d);
    let f = o.listen(p, i, a);
    if (!Ay(i)) {
      let h = r ? (m) => r(se(m[e.index])) : e.index;
      Pd$1(h, t, n, i, a, f, false);
    }
  }
  return l;
}
function Ay(e) {
  return e.startsWith('animation') || e.startsWith('transition');
}
function ky(e, t, n, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === n && o[i + 1] === r) {
        let a = t[Qt$1],
          c = o[i + 2];
        return a && a.length > c ? a[c] : null;
      }
      typeof s == 'string' && (i += 2);
    }
  return null;
}
function Pd$1(e, t, n, r, o, i, s) {
  let a = t.firstCreatePass ? rs$1(t) : null,
    c = ns$1(n),
    l = c.length;
  (c.push(o, i), a && a.push(r, e, l, (l + 1) * (s ? -1 : 1)));
}
function nu$1(e, t, n, r, o) {
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
      if (p >= s && p <= a) ((c = true), So$1(e, t, p, u[d + 1], r, o));
      else if (p > a) break;
    }
  }
  return (n.outputs.hasOwnProperty(r) && ((c = true), So$1(e, t, i, r, r, o)), c);
}
function So$1(e, t, n, r, o, i) {
  let s = t[n],
    a = t[g$1],
    l = a.data[n].outputs[r],
    d = s[l].subscribe(i);
  Pd$1(e.index, a, t, o, i, d, true);
}
function Ry() {
  Oy();
}
function Oy() {
  let e = D(),
    t = P$1(),
    n = B();
  if ((t.firstCreatePass && Fy(t, n), n.controlDirectiveIndex === -1)) return;
  un$1('NgSignalForms');
  let r = e[n.controlDirectiveIndex];
  t.data[n.controlDirectiveIndex].controlDef.create(r, new xo$1(e, t, n));
}
function Py() {
  Ly();
}
function Ly() {
  let e = D(),
    t = P$1(),
    n = Jt$1();
  if (n.controlDirectiveIndex === -1) return;
  let r = t.data[n.controlDirectiveIndex].controlDef,
    o = e[n.controlDirectiveIndex];
  r.update(o, new xo$1(e, t, n));
}
var xo$1 = class xo {
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
    return ae$1(this.tNode, this.lView);
  }
  get descriptor() {
    return `<${this.tNode.value}>`;
  }
  listenToCustomControlOutput(t, n) {
    let r = this.tView.data[this.tNode.customControlIndex];
    nu$1(this.tNode, this.lView, r, t, nn$1(this.tNode, this.lView, n));
  }
  listenToCustomControlModel(t) {
    let n = this.tNode.flags & 1024 ? 'valueChange' : 'checkedChange',
      r = this.tView.data[this.tNode.customControlIndex];
    nu$1(this.tNode, this.lView, r, n, nn$1(this.tNode, this.lView, t));
  }
  listenToDom(t, n) {
    Od$1(
      this.tNode,
      this.tView,
      this.lView,
      void 0,
      this.lView[R$1],
      t,
      n,
      nn$1(this.tNode, this.lView, n),
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
    ry(this.tNode, this.tView, this.lView, n, r, t);
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
          let i = ru$1(o.directive);
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
          let s = ru$1(i.directive);
          s !== null && r.push(...s);
        }
      }
    }
    return n;
  }
};
function ru$1(e) {
  return typeof e == 'function' && '\u0275dir' in e ? (e.ɵdir.hostDirectives ?? null) : null;
}
function Fy(e, t, n) {
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
  jy(e, t);
}
function jy(e, t) {
  for (let n = t.directiveStart; n < t.directiveEnd; n++) {
    let r = e.data[n];
    if (!(t.directiveToIndex && !t.directiveToIndex.has(r.type))) {
      if (ou$1(r, 'value')) {
        ((t.flags |= 1024), (t.customControlIndex = n));
        return;
      }
      if (ou$1(r, 'checked')) {
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
function ou$1(e, t) {
  return Vy(e, t) && Hy(e, t + 'Change');
}
function Vy(e, t) {
  return t in e.inputs;
}
function Hy(e, t) {
  return t in e.outputs;
}
var Ks$1 = Symbol('BINDING');
var Ld$1 = new N('');
function Ao$1(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == 'number') i = a;
      else if (i == 1) o = jr(o, a);
      else if (i == 2) {
        let c = a,
          l = t[++s];
        r = jr(r, c + ': ' + l + ';');
      }
    }
  (n ? (e.styles = r) : (e.stylesWithoutHost = r),
    n ? (e.classes = o) : (e.classesWithoutHost = o));
}
function zo$1(e, t = 0) {
  let n = D();
  if (n === null) return Ie$1(e, t);
  let r = B();
  return Su$1(r, n, $$1(e), t);
}
function By() {
  let e = 'invalid';
  throw new Error(e);
}
function Fd$1(e, t, n, r, o) {
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
    Wy(e, t, n, a, i, c, l);
  }
  i !== null && r !== null && $y(n, r, i);
}
function $y(e, t, n) {
  let r = (e.localNames = []);
  for (let o = 0; o < t.length; o += 2) {
    let i = n[t[o + 1]];
    if (i == null) throw new C(-301, false);
    r.push(t[o], i);
  }
}
function Uy(e, t, n) {
  ((t.componentOffset = n), (e.components ??= []).push(t.index));
}
function Wy(e, t, n, r, o, i, s) {
  let a = r.length,
    c = null;
  for (let p = 0; p < a; p++) {
    let f = r[p];
    (c === null && Ce(f) && ((c = f), Uy(e, n, p)), Os$1(Do$1(n, t), e, f.type));
  }
  (Yy(n, e.data.length, a), c?.viewProvidersResolver && c.viewProvidersResolver(c));
  for (let p = 0; p < a; p++) {
    let f = r[p];
    f.providersResolver && f.providersResolver(f);
  }
  let l = false,
    u = false,
    d = od$1(e, t, a, null);
  a > 0 && (n.directiveToIndex = new Map());
  for (let p = 0; p < a; p++) {
    let f = r[p];
    if (
      ((n.mergedAttrs = rn$1(n.mergedAttrs, f.hostAttrs)),
      Gy(e, n, t, d, f),
      Zy(d, f, o),
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
  qy(e, n, i);
}
function qy(e, t, n) {
  for (let r = t.directiveStart; r < t.directiveEnd; r++) {
    let o = e.data[r];
    if (n === null || !n.has(o)) (iu$1(0, t, o, r), iu$1(1, t, o, r), au$1(t, r, false));
    else {
      let i = n.get(o);
      (su$1(0, t, i, r), su$1(1, t, i, r), au$1(t, r, true));
    }
  }
}
function iu$1(e, t, n, r) {
  let o = e === 0 ? n.inputs : n.outputs;
  for (let i in o)
    if (o.hasOwnProperty(i)) {
      let s;
      (e === 0 ? (s = t.inputs ??= {}) : (s = t.outputs ??= {}),
        (s[i] ??= []),
        s[i].push(r),
        jd(t, i));
    }
}
function su$1(e, t, n, r) {
  let o = e === 0 ? n.inputs : n.outputs;
  for (let i in o)
    if (o.hasOwnProperty(i)) {
      let s = o[i],
        a;
      (e === 0 ? (a = t.hostDirectiveInputs ??= {}) : (a = t.hostDirectiveOutputs ??= {}),
        (a[s] ??= []),
        a[s].push(r, i),
        jd(t, s));
    }
}
function jd(e, t) {
  t === 'class' ? (e.flags |= 8) : t === 'style' && (e.flags |= 16);
}
function au$1(e, t, n) {
  let { attrs: r, inputs: o, hostDirectiveInputs: i } = e;
  if (r === null || (!n && o === null) || (n && i === null) || fa(e)) {
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
function Gy(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = yt$1(o.type)),
    s = new Nt(i, Ce(o), zo$1, null);
  ((e.blueprint[r] = s), (n[r] = s), zy(e, t, r, od$1(e, n, o.hostVars, le$1), o));
}
function zy(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    (Qy(s) != a && s.push(a), s.push(n, r, i));
  }
}
function Qy(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == 'number' && n < 0) return n;
  }
  return 0;
}
function Zy(e, t, n) {
  if (n) {
    if (t.exportAs) for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    Ce(t) && (n[''] = e);
  }
}
function Yy(e, t, n) {
  ((e.flags |= 1), (e.directiveStart = t), (e.directiveEnd = t + n), (e.providerIndexes = t));
}
function Vd$1(e, t, n, r, o, i, s, a) {
  let c = t[g$1],
    l = c.consts,
    u = be$1(l, s),
    d = dn$1(c, e, n, r, u);
  return (
    Fd$1(c, t, d, be$1(l, a), o),
    (d.mergedAttrs = rn$1(d.mergedAttrs, d.attrs)),
    d.attrs !== null && Ao$1(d, d.attrs, false),
    d.mergedAttrs !== null && Ao$1(d, d.mergedAttrs, true),
    c.queries !== null && c.queries.elementStart(c, d),
    d
  );
}
function Hd$1(e, t) {
  (Iu$1(e, t), Ji$1(t) && e.queries.elementEnd(t));
}
function Ky(e, t, n, r, o, i) {
  let s = t.consts,
    a = be$1(s, o),
    c = dn$1(t, e, n, r, a);
  if (((c.mergedAttrs = rn$1(c.mergedAttrs, c.attrs)), i != null)) {
    let l = be$1(s, i);
    c.localNames = [];
    for (let u = 0; u < l.length; u += 2) c.localNames.push(l[u], -1);
  }
  return (
    c.attrs !== null && Ao$1(c, c.attrs, false),
    c.mergedAttrs !== null && Ao$1(c, c.mergedAttrs, true),
    t.queries !== null && t.queries.elementStart(t, c),
    c
  );
}
var Bd$1 = typeof ShadowRoot < 'u',
  Jy = typeof Document < 'u';
function Xy(e) {
  return Object.keys(e).map((t) => {
    let [n, r, o] = e[t],
      i = { propName: n, templateName: t, isSignal: (r & Bo$1.SignalBased) !== 0 };
    return (o && (i.transform = o), i);
  });
}
function ev(e) {
  return Object.keys(e).map((t) => ({ propName: e[t], templateName: t }));
}
function tv(e, t, n) {
  let r = t instanceof re ? t : t?.injector;
  return (
    r && e.getStandaloneInjector !== null && (r = e.getStandaloneInjector(r) || r),
    r ? new No$1(n, r) : n
  );
}
function nv(e) {
  let t = e.get(zn$1, null);
  if (t === null) throw new C(407, false);
  let n = e.get(kd$1, null),
    r = e.get(Te, null),
    o = e.get(ln$1, null, { optional: true });
  return {
    rendererFactory: t,
    sanitizer: n,
    changeDetectionScheduler: r,
    ngReflect: false,
    tracingService: o,
  };
}
function rv(e, t) {
  let n = $d(e);
  return Ju$1(t, n, n === 'svg' ? ol$1 : n === 'math' ? il$1 : null);
}
function $d(e) {
  return (e.selectors[0][0] || 'div').toLowerCase();
}
var At = class {
  componentDef;
  ngModule;
  selector;
  componentType;
  ngContentSelectors;
  isBoundToModule;
  cachedInputs = null;
  cachedOutputs = null;
  get inputs() {
    return ((this.cachedInputs ??= Xy(this.componentDef.inputs)), this.cachedInputs);
  }
  get outputs() {
    return ((this.cachedOutputs ??= ev(this.componentDef.outputs)), this.cachedOutputs);
  }
  constructor(t, n) {
    ((this.componentDef = t),
      (this.ngModule = n),
      (this.componentType = t.type),
      (this.selector = Em$1(t.selectors)),
      (this.ngContentSelectors = t.ngContentSelectors ?? []),
      (this.isBoundToModule = !!n));
  }
  create(t, n, r, o, i, s) {
    k(M$1.DynamicComponentStart);
    let a = y(null);
    try {
      let c = this.componentDef,
        l = tv(c, o || this.ngModule, t),
        u = nv(l),
        d = u.tracingService;
      return d && d.componentCreate
        ? d.componentCreate(Rd$1(c), () => this.createComponentRef(u, l, n, r, i, s))
        : this.createComponentRef(u, l, n, r, i, s);
    } finally {
      y(a);
    }
  }
  createComponentRef(t, n, r, o, i, s) {
    let a = this.componentDef,
      c = ov(o, a, s, i),
      l = t.rendererFactory.createRenderer(null, a),
      u = o ? qm$1(l, o, a.encapsulation, n) : rv(a, l),
      d = n.get(Ld$1, null),
      p = iv(u, () => n.get(Xt$1, null) ?? Vu$1());
    d && d.addHost(p);
    let f = s?.some(cu$1) || i?.some((_) => typeof _ != 'function' && _.bindings.some(cu$1)),
      h = ha(null, c, null, 512 | rd$1(a), null, null, t, l, n, null, $u$1(u, n, true));
    (d &&
      Bd$1 &&
      p instanceof ShadowRoot &&
      Xr$1(h, () => {
        d.removeHost(p);
      }),
      (h[F] = u),
      no$1(h));
    let m = null;
    try {
      let _ = Vd$1(F, h, 2, '#host', () => c.directiveRegistry, !0, 0);
      (ed(l, u, _),
        on$1(u, h),
        wa(c, h, _),
        Wu$1(c, _, h),
        Hd$1(c, _),
        r !== void 0 && av(_, this.ngContentSelectors, r),
        (m = ce$1(_.index, h)),
        (h[U] = m[U]),
        ba(c, h, null));
    } catch (_) {
      throw (m !== null && Ls$1(m), Ls$1(h), _);
    } finally {
      (k(M$1.DynamicComponentEnd), ro$1());
    }
    return new ko$1(this.componentType, h, !!f);
  }
};
function ov(e, t, n, r) {
  let o = e ? ['ng-version', '22.0.0'] : Im$1(t.selectors[0]),
    i = null,
    s = null,
    a = 0;
  if (n)
    for (let u of n)
      ((a += u[Ks$1].requiredVars),
        u.create && ((u.targetIdx = 0), (i ??= []).push(u)),
        u.update && ((u.targetIdx = 0), (s ??= []).push(u)));
  if (r)
    for (let u = 0; u < r.length; u++) {
      let d = r[u];
      if (typeof d != 'function')
        for (let p of d.bindings) {
          a += p[Ks$1].requiredVars;
          let f = u + 1;
          (p.create && ((p.targetIdx = f), (i ??= []).push(p)),
            p.update && ((p.targetIdx = f), (s ??= []).push(p)));
        }
    }
  let c = [t];
  if (r)
    for (let u of r) {
      let d = typeof u == 'function' ? u : u.type,
        p = Bi$1(d);
      c.push(p);
    }
  return pa(0, null, sv(i, s), 1, a, c, null, null, null, [o], null);
}
function iv(e, t) {
  let n = e.getRootNode?.();
  return Jy && n instanceof Document ? n.head : n && Bd$1 && n instanceof ShadowRoot ? n : t().head;
}
function sv(e, t) {
  return !e && !t
    ? null
    : (n) => {
        if (n & 1 && e) for (let r of e) r.create();
        if (n & 2 && t) for (let r of t) r.update();
      };
}
function cu$1(e) {
  let t = e[Ks$1].kind;
  return t === 'input' || t === 'twoWay';
}
var ko$1 = class ko extends Ad$1 {
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
      (this._tNode = Yr$1(n[g$1], F)),
      (this.location = cn$1(this._tNode, n)),
      (this.instance = ce$1(this._tNode.index, n)[U]),
      (this.hostView = this.changeDetectorRef = new rt$1(n, void 0)),
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
    Ca(r, o[g$1], o, t, n);
    this.previousInputValues.set(t, n);
    let s = ce$1(r.index, o);
    Ma(s, 1);
  }
  get injector() {
    return new nt$1(this._tNode, this._rootLView);
  }
  destroy() {
    this.hostView.destroy();
  }
  onDestroy(t) {
    this.hostView.onDestroy(t);
  }
};
function av(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null && i.length ? Array.from(i) : null);
  }
}
var Qo$1 = (() => {
  class e {
    static __NG_ELEMENT_ID__ = cv;
  }
  return e;
})();
function cv() {
  let e = B();
  return Ud(e, D());
}
var Js$1 = class e extends Qo$1 {
  _lContainer;
  _hostTNode;
  _hostLView;
  constructor(t, n, r) {
    (super(), (this._lContainer = t), (this._hostTNode = n), (this._hostLView = r));
  }
  get element() {
    return cn$1(this._hostTNode, this._hostLView);
  }
  get injector() {
    return new nt$1(this._hostTNode, this._hostLView);
  }
  get parentInjector() {
    let t = ca(this._hostTNode, this._hostLView);
    if (wu$1(t)) {
      let n = Io$1(t, this._hostLView),
        r = Eo$1(t),
        o = n[g$1].data[r + 8];
      return new nt$1(o, n);
    } else return new nt$1(null, this._hostLView);
  }
  clear() {
    for (; this.length > 0; ) this.remove(this.length - 1);
  }
  get(t) {
    let n = lu$1(this._lContainer);
    return (n !== null && n[t]) || null;
  }
  get length() {
    return this._lContainer.length - W$1;
  }
  createEmbeddedView(t, n, r) {
    let o, i;
    typeof r == 'number' ? (o = r) : r != null && ((o = r.index), (i = r.injector));
    let s = Ys$1(this._lContainer, t.ssrId),
      a = t.createEmbeddedViewImpl(n || {}, i, s);
    return (this.insertImpl(a, o, _o$1(this._hostTNode, s)), a);
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
    let u = new At(Re$1(t)),
      d = r || this.parentInjector;
    if (!i && u.ngModule == null) {
      let S = this.parentInjector.get(re, null);
      S && (i = S);
    }
    let p = Re$1(u.componentType ?? {}),
      f = Ys$1(this._lContainer, p?.id ?? null),
      h = null,
      m = u.create(d, o, h, i, s, a);
    return (this.insertImpl(m.hostView, c, _o$1(this._hostTNode, f)), m);
  }
  insert(t, n) {
    return this.insertImpl(t, n, true);
  }
  insertImpl(t, n, r) {
    let o = t._lView;
    if (cl$1(o)) {
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
    return (Na(s, o, i, r), t.attachToViewContainerRef(), Wi$1(Ms$1(s), i, t), t);
  }
  move(t, n) {
    return this.insert(t, n);
  }
  indexOf(t) {
    let n = lu$1(this._lContainer);
    return n !== null ? n.indexOf(t) : -1;
  }
  remove(t) {
    let n = this._adjustIndex(t, -1),
      r = Mo$1(this._lContainer, n);
    r && (xn$1(Ms$1(this._lContainer), n), Ia(r[g$1], r));
  }
  detach(t) {
    let n = this._adjustIndex(t, -1),
      r = Mo$1(this._lContainer, n);
    return r && xn$1(Ms$1(this._lContainer), n) != null ? new rt$1(r) : null;
  }
  _adjustIndex(t, n = 0) {
    return t ?? this.length + n;
  }
};
function lu$1(e) {
  return e[kn$1];
}
function Ms$1(e) {
  return e[kn$1] || (e[kn$1] = []);
}
function Ud(e, t) {
  let n,
    r = t[e.index];
  return (
    ie(r) ? (n = r) : ((n = Sd$1(r, t, null, e)), (t[e.index] = n), ga(t, n)),
    uv(n, t, e, r),
    new Js$1(n, e, t)
  );
}
function lv(e, t) {
  let n = e[R$1],
    r = n.createComment(''),
    o = ae$1(t, e),
    i = n.parentNode(o);
  return (wo$1(n, i, r, n.nextSibling(o), false), r);
}
var uv = pv;
function pv(e, t, n, r) {
  if (e[Ke$1]) return;
  let o;
  (n.type & 8 ? (o = se(r)) : (o = lv(t, n)), (e[Ke$1] = o));
}
var Xs$1 = class e {
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
  ea$1 = class e {
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
        xa(t, n).matches !== null && this.queries[n].setDirty();
    }
  },
  Ro$1 = class Ro {
    flags;
    read;
    predicate;
    constructor(t, n, r = null) {
      ((this.flags = n),
        (this.read = r),
        typeof t == 'string' ? (this.predicate = vv(t)) : (this.predicate = t));
    }
  },
  ta$1 = class e {
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
  na$1 = class e {
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
          (this.matchTNodeWithReadOption(t, n, hv(n, i)),
            this.matchTNodeWithReadOption(t, n, mo$1(n, t, i, false, false)));
        }
      else
        r === Gn$1
          ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1)
          : this.matchTNodeWithReadOption(t, n, mo$1(n, t, r, false, false));
    }
    matchTNodeWithReadOption(t, n, r) {
      if (r !== null) {
        let o = this.metadata.read;
        if (o !== null)
          if (o === Jn$1 || o === Qo$1 || (o === Gn$1 && n.type & 4)) this.addMatch(n.index, -2);
          else {
            let i = mo$1(n, t, o, false, false);
            i !== null && this.addMatch(n.index, i);
          }
        else this.addMatch(n.index, r);
      }
    }
    addMatch(t, n) {
      this.matches === null ? (this.matches = [t, n]) : this.matches.push(t, n);
    }
  };
function hv(e, t) {
  let n = e.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
  }
  return null;
}
function gv(e, t) {
  return e.type & 11 ? cn$1(e, t) : e.type & 4 ? Go$1(e, t) : null;
}
function mv(e, t, n, r) {
  return n === -1 ? gv(t, e) : n === -2 ? yv(e, t, r) : Un$1(e, e[g$1], n, t);
}
function yv(e, t, n) {
  if (n === Jn$1) return cn$1(t, e);
  if (n === Gn$1) return Go$1(t, e);
  if (n === Qo$1) return Ud(t, e);
}
function Wd$1(e, t, n, r) {
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
        a.push(mv(t, u, s[c + 1], n.metadata.read));
      }
    }
    o.matches = a;
  }
  return o.matches;
}
function ra$1(e, t, n, r) {
  let o = e.queries.getByIndex(n),
    i = o.matches;
  if (i !== null) {
    let s = Wd$1(e, t, o, n);
    for (let a = 0; a < i.length; a += 2) {
      let c = i[a];
      if (c > 0) r.push(s[a / 2]);
      else {
        let l = i[a + 1],
          u = t[-c];
        for (let d = W$1; d < u.length; d++) {
          let p = u[d];
          p[Ze] === p[H$1] && ra$1(p[g$1], p, l, r);
        }
        if (u[Ct$1] !== null) {
          let d = u[Ct$1];
          for (let p = 0; p < d.length; p++) {
            let f = d[p];
            ra$1(f[g$1], f, l, r);
          }
        }
      }
    }
  }
  return r;
}
function Sa(e, t) {
  return e[we].queries[t].queryList;
}
function qd$1(e, t, n) {
  let r = new To$1((n & 4) === 4);
  return (dl$1(e, t, r, r.destroy), (t[we] ??= new ea$1()).queries.push(new Xs$1(r)) - 1);
}
function Gd$1(e, t, n) {
  let r = P$1();
  return (
    r.firstCreatePass &&
      (Qd$1(r, new Ro$1(e, t, n), -1), (t & 2) === 2 && (r.staticViewQueries = true)),
    qd$1(r, D(), t)
  );
}
function zd(e, t, n, r) {
  let o = P$1();
  if (o.firstCreatePass) {
    let i = B();
    (Qd$1(o, new Ro$1(t, n, r), i.index),
      Ev(o, e),
      (n & 2) === 2 && (o.staticContentQueries = true));
  }
  return qd$1(o, D(), n);
}
function vv(e) {
  return e.split(',').map((t) => t.trim());
}
function Qd$1(e, t, n) {
  (e.queries === null && (e.queries = new ta$1()), e.queries.track(new na$1(t, n)));
}
function Ev(e, t) {
  let n = e.contentQueries || (e.contentQueries = []),
    r = n.length ? n[n.length - 1] : -1;
  t !== r && n.push(e.queries.length - 1, t);
}
function xa(e, t) {
  return e.queries.getByIndex(t);
}
function Zd$1(e, t) {
  let n = e[g$1],
    r = xa(n, t);
  return r.crossesNgTemplate ? ra$1(n, e, t, []) : Wd$1(n, e, r, t);
}
function Yd$1(e, t, n) {
  let r,
    o = gn(() => {
      r._dirtyCounter();
      let i = Iv(r, e);
      if (t && i === void 0) throw new C(-951, false);
      return i;
    });
  return ((r = o[L]), (r._dirtyCounter = _e(0)), (r._flatValue = void 0), o);
}
function Aa(e) {
  return Yd$1(true, false);
}
function ka(e) {
  return Yd$1(true, true);
}
function Kd$1(e, t) {
  let n = e[L];
  ((n._lView = D()),
    (n._queryIndex = t),
    (n._queryList = Sa(n._lView, t)),
    n._queryList.onDirty(() => n._dirtyCounter.update((r) => r + 1)));
}
function Iv(e, t) {
  let n = e._lView,
    r = e._queryIndex;
  if (n === void 0 || r === void 0 || n[v$1] & 4) return t ? void 0 : G$1;
  let o = Sa(n, r),
    i = Zd$1(n, r);
  return (
    o.reset(i, Ru$1),
    t
      ? o.first
      : o._changesDetected || e._flatValue === void 0
        ? (e._flatValue = o.toArray())
        : e._flatValue
  );
}
function Ra(e) {
  return !!e && typeof e.then == 'function';
}
function Jd$1(e) {
  return !!e && typeof e.subscribe == 'function';
}
var sn$1 = class sn {},
  Xd$1 = class Xd {};
var Oo$1 = class Oo extends sn$1 {
    ngModuleType;
    _parent;
    _bootstrapComponents = [];
    _r3Injector;
    instance;
    destroyCbs = [];
    constructor(t, n, r, o = true) {
      (super(), (this.ngModuleType = t), (this._parent = n));
      let i = $c$1(t);
      ((this._bootstrapComponents = cm$1(i.bootstrap)),
        (this._r3Injector = ys(
          t,
          n,
          [{ provide: sn$1, useValue: this }, ...r],
          Mn$1(t),
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
  Po$1 = class Po extends Xd$1 {
    moduleType;
    constructor(t) {
      (super(), (this.moduleType = t));
    }
    create(t) {
      return new Oo$1(this.moduleType, t, []);
    }
  };
var Qn$1 = class Qn extends sn$1 {
  injector;
  instance = null;
  constructor(t) {
    super();
    let n = new Et$1(
      [...t.providers, { provide: sn$1, useValue: this }],
      t.parent || Gt$1(),
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
function ef$1(e, t, n = null) {
  return new Qn$1({ providers: e, parent: t, debugName: n, runEnvironmentInitializers: true })
    .injector;
}
var Dv = (() => {
  class e {
    _injector;
    cachedInjectors = new Map();
    constructor(n) {
      this._injector = n;
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = Gi$1(false, n.type),
          o = r.length > 0 ? ef$1([r], this._injector, '') : null;
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
    static ɵprov = ee({ token: e, providedIn: 'environment', factory: () => new e(Ie$1(re)) });
  }
  return e;
})();
function Tv(e) {
  return Yn$1(() => {
    let t = tf$1(e),
      n = V$1(j$1({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection !== la.Eager,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: t.standalone
          ? (o) => o.get(Dv).getOrCreateStandaloneInjector(n)
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
    (t.standalone && un$1('NgStandalone'), nf$1(n));
    let r = e.dependencies;
    return ((n.directiveDefs = uu$1(r, wv)), (n.pipeDefs = uu$1(r, Uc$1)), (n.id = Nv(n)), n);
  });
}
function wv(e) {
  return Re$1(e) || Bi$1(e);
}
function Cv(e) {
  return Yn$1(() => ({
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
function bv(e, t) {
  if (e == null) return Qe;
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
        : ((i = o), (s = o), (a = Bo$1.None), (c = null)),
        (n[i] = [r, a, c]),
        (t[i] = s));
    }
  return n;
}
function _v(e) {
  if (e == null) return Qe;
  let t = {};
  for (let n in e) e.hasOwnProperty(n) && (t[e[n]] = n);
  return t;
}
function Mv(e) {
  return Yn$1(() => {
    let t = tf$1(e);
    return (nf$1(t), t);
  });
}
function tf$1(e) {
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
    inputConfig: e.inputs || Qe,
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
    inputs: bv(e.inputs, t),
    outputs: _v(e.outputs),
    debugInfo: null,
  };
}
function nf$1(e) {
  e.features?.forEach((t) => t(e));
}
function uu$1(e, t) {
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
function Nv(e) {
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
var rf$1 = new N('');
var Oa = (() => {
  class e {
    resolve;
    reject;
    initialized = false;
    done = false;
    donePromise = new Promise((n, r) => {
      ((this.resolve = n), (this.reject = r));
    });
    appInits = E$1(rf$1, { optional: true }) ?? [];
    injector = E$1(de$1);
    constructor() {}
    runInitializers() {
      if (this.initialized) return;
      let n = [];
      for (let o of this.appInits) {
        let i = Qr$1(this.injector, o);
        if (Ra(i)) n.push(i);
        else if (Jd$1(i)) {
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
    static ɵprov = Kn$1({ token: e, factory: e.ɵfac });
  }
  return e;
})();
function Sv(e) {
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
function xv(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function of$1(e) {
  let t = xv(e.type),
    n = true,
    r = [e];
  for (; t; ) {
    let o;
    if (Ce(e)) o = t.ɵcmp || t.ɵdir;
    else {
      if (t.ɵcmp) throw new C(903, false);
      o = t.ɵdir;
    }
    if (o) {
      if (n) {
        r.push(o);
        let s = e;
        ((s.inputs = Ns$1(e.inputs)),
          (s.declaredInputs = Ns$1(e.declaredInputs)),
          (s.outputs = Ns$1(e.outputs)));
        let a = o.hostBindings;
        a && Pv(e, a);
        let c = o.viewQuery,
          l = o.contentQueries;
        if (
          (c && Rv(e, c),
          l && Ov(e, l),
          Av(e, o),
          Hc$1(e.outputs, o.outputs),
          Ce(o) && o.data.animation)
        ) {
          let u = e.data;
          u.animation = (u.animation || []).concat(o.data.animation);
        }
      }
      let i = o.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          let a = i[s];
          (a && a.ngInherit && a(e), a === of$1 && (n = false));
        }
    }
    t = Object.getPrototypeOf(t);
  }
  kv(r);
}
function Av(e, t) {
  for (let n in t.inputs) {
    if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n)) continue;
    let r = t.inputs[n];
    r !== void 0 && ((e.inputs[n] = r), (e.declaredInputs[n] = t.declaredInputs[n]));
  }
}
function kv(e) {
  let t = 0,
    n = null;
  for (let r = e.length - 1; r >= 0; r--) {
    let o = e[r];
    ((o.hostVars = t += o.hostVars), (o.hostAttrs = rn$1(o.hostAttrs, (n = rn$1(n, o.hostAttrs)))));
  }
}
function Ns$1(e) {
  return e === Qe ? {} : e === G$1 ? [] : e;
}
function Rv(e, t) {
  let n = e.viewQuery;
  n
    ? (e.viewQuery = (r, o) => {
        (t(r, o), n(r, o));
      })
    : (e.viewQuery = t);
}
function Ov(e, t) {
  let n = e.contentQueries;
  n
    ? (e.contentQueries = (r, o, i) => {
        (t(r, o, i), n(r, o, i));
      })
    : (e.contentQueries = t);
}
function Pv(e, t) {
  let n = e.hostBindings;
  n
    ? (e.hostBindings = (r, o) => {
        (t(r, o), n(r, o));
      })
    : (e.hostBindings = t);
}
function sf$1(e, t, n, r, o, i, s, a) {
  if (n.firstCreatePass) {
    e.mergedAttrs = rn$1(e.mergedAttrs, e.attrs);
    let u = (e.tView = pa(
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
  (a && (e.flags |= a), Kt$1(e, false));
  let c = Fv(n, t);
  (oo$1() && Da(n, t, c, e), on$1(c, t));
  let l = Sd$1(c, t, c, e);
  ((t[r + F] = l), ga(t, l));
}
function Lv(e, t, n, r, o, i, s, a, c, l, u) {
  let d = n + F,
    p;
  return (
    t.firstCreatePass
      ? ((p = dn$1(t, d, 4, s || null, a || null)),
        Fd$1(t, e, p, be$1(t.consts, l), yd$1),
        Iu$1(t, p))
      : (p = t.data[d]),
    sf$1(p, e, t, n, r, o, i, c),
    Rn$1(p) && wa(t, e, p),
    l != null && qo$1(e, p, u),
    p
  );
}
function Pa(e, t, n, r, o, i, s, a, c, l, u) {
  let d = n + F,
    p;
  if (t.firstCreatePass) {
    if (((p = dn$1(t, d, 4, s || null, a || null)), l != null)) {
      let f = be$1(t.consts, l);
      p.localNames = [];
      for (let h = 0; h < f.length; h += 2) p.localNames.push(f[h], -1);
    }
  } else p = t.data[d];
  return (sf$1(p, e, t, n, r, o, i, c), l != null && qo$1(e, p, u), p);
}
function af$1(e, t, n, r, o, i, s, a) {
  let c = D(),
    l = P$1(),
    u = be$1(l.consts, i);
  return (Lv(c, l, e, t, n, r, o, u, void 0, s, a), af$1);
}
var Fv = jv;
function jv(e, t, n, r) {
  return (io$1(true), t[R$1].createComment(''));
}
var Vv = (() => {
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
var cf$1 = new N('');
var lf$1 = new N('');
function uf$1() {
  ii$1(() => {
    let e = '';
    throw new C(600, e);
  });
}
var Hv = 10;
var Zo$1 = (() => {
  class e {
    _runningTick = false;
    _destroyed = false;
    _destroyListeners = [];
    _views = [];
    internalErrorHandler = E$1(tt);
    afterRenderManager = E$1(ya);
    zonelessEnabled = E$1(jn$1);
    rootEffectScheduler = E$1(ao$1);
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
      return this.internalPendingTask.hasPendingTasksObservable.pipe(pt$2((n) => !n));
    }
    constructor() {
      E$1(ln$1, { optional: true });
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
    _injector = E$1(re);
    _rendererFactory = null;
    get injector() {
      return this._injector;
    }
    bootstrap(n, r) {
      return this.bootstrapImpl(n, r);
    }
    bootstrapImpl(n, r, o = de$1.NULL) {
      return this._injector.get(De$1).run(() => {
        if ((k(M$1.BootstrapComponentStart), !this._injector.get(Oa).done)) {
          let S = '';
          throw new C(405, S);
        }
        let a = Re$1(n),
          c = this._injector.get(sn$1),
          l = new At(a, c);
        this.componentTypes.push(n);
        let { hostElement: u, directives: d, bindings: p } = Bv(r),
          f = u || l.selector,
          h = l.create(o, [], f, c.injector, d, p),
          m = h.location.nativeElement,
          _ = h.injector.get(cf$1, null);
        return (
          _?.registerApplication(m),
          h.onDestroy(() => {
            (this.detachView(h.hostView), $n$1(this.components, h), _?.unregisterApplication(m));
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
          ? this.tracingSnapshot.run($o$1.CHANGE_DETECTION, this.tickImpl)
          : this.tickImpl());
    }
    tickImpl = () => {
      if (this._runningTick) throw (k(M$1.ChangeDetectionEnd), new C(101, false));
      let n = y(null);
      try {
        ((this._runningTick = !0), this.synchronize());
      } finally {
        ((this._runningTick = false),
          this.tracingSnapshot?.dispose(),
          (this.tracingSnapshot = null),
          y(n),
          this.afterTick.next(),
          k(M$1.ChangeDetectionEnd));
      }
    };
    synchronize() {
      this._rendererFactory === null &&
        !this._injector.destroyed &&
        (this._rendererFactory = this._injector.get(zn$1, null, { optional: true }));
      let n = 0;
      for (; this.dirtyFlags !== 0 && n++ < Hv; ) {
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
          if (!r && !On$1(o)) continue;
          let i = r && !this.zonelessEnabled ? 0 : 1;
          (bd$1(o, i), (n = true));
        }
        if (((this.dirtyFlags &= -5), this.syncDirtyFlagsWithViews(), this.dirtyFlags & 23)) return;
      }
      (n || (this._rendererFactory?.begin?.(), this._rendererFactory?.end?.()),
        this.dirtyFlags & 8 && ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews());
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: n }) => On$1(n))) {
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
      ($n$1(this._views, r), r.detachFromAppRef());
    }
    _loadComponent(n) {
      this.attachView(n.hostView);
      try {
        this.tick();
      } catch (o) {
        this.internalErrorHandler(o);
      }
      (this.components.push(n), this._injector.get(lf$1, []).forEach((o) => o(n)));
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
      return (this._destroyListeners.push(n), () => $n$1(this._destroyListeners, n));
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
    static ɵprov = Kn$1({ token: e, factory: e.ɵfac });
  }
  return e;
})();
function Bv(e) {
  return e === void 0 || typeof e == 'string' || e instanceof Element ? { hostElement: e } : e;
}
function $n$1(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
function df$1(e, t, n, r) {
  let o = D(),
    i = Je$1();
  if (Be$1(o, i, t)) {
    P$1();
    let a = Jt$1();
    Xm$1(a, o, e, t, n, r);
  }
  return df$1;
}
function $v(e, t, n, r, o, i, s, a) {
  un$1('NgControlFlow');
  let c = D(),
    l = P$1(),
    u = be$1(l.consts, i);
  return (Pa(c, l, e, t, n, r, o, u, 256, s, a), La);
}
function La(e, t, n, r, o, i, s, a) {
  un$1('NgControlFlow');
  let c = D(),
    l = P$1(),
    u = be$1(l.consts, i);
  return (Pa(c, l, e, t, n, r, o, u, 512, s, a), La);
}
function Uv(e, t) {
  un$1('NgControlFlow');
  let n = D(),
    r = Je$1(),
    o = n[r] !== le$1 ? n[r] : -1,
    i = o !== -1 ? du$1(n, F + o) : void 0,
    s = 0;
  if (Be$1(n, r, e)) {
    let a = y(null);
    try {
      if ((i !== void 0 && Iy(i, s), e !== -1)) {
        let c = F + e,
          l = du$1(n, c),
          u = Wv(n[g$1], c),
          d = Ny(l, u, n),
          p = _a(n, u, t, { dehydratedView: d });
        Na(l, p, s, _o$1(u, d));
      }
    } finally {
      y(a);
    }
  } else if (i !== void 0) {
    let a = Ey(i, s);
    a !== void 0 && (a[U] = t);
  }
}
function du$1(e, t) {
  return e[t];
}
function Wv(e, t) {
  return Yr$1(e, t);
}
function ff$1(e, t, n) {
  let r = D(),
    o = Je$1();
  if (Be$1(r, o, t)) {
    P$1();
    let s = Jt$1();
    gd$1(s, r, e, t, r[R$1], n);
  }
  return ff$1;
}
function oa(e, t, n, r, o) {
  Ca(t, e, n, o ? 'class' : 'style', r);
}
function Lo$1(e, t, n, r) {
  let o = D(),
    i = o[g$1],
    s = e + F,
    a = i.firstCreatePass ? Vd$1(s, o, 2, t, yd$1, is$1(), n, r) : i.data[s];
  if (Fe(a)) {
    let c = o[pe].tracingService;
    if (c && c.componentCreate) {
      let l = i.data[a.directiveStart + a.componentOffset];
      return c.componentCreate(Rd$1(l), () => (fu$1(e, t, o, a, r), Lo$1));
    }
  }
  return (fu$1(e, t, o, a, r), Lo$1);
}
function fu$1(e, t, n, r, o) {
  if ((vd$1(r, n, e, t, gf$1), Rn$1(r))) {
    let i = n[g$1];
    (wa(i, n, r), Wu$1(i, r, n));
  }
  o != null && qo$1(n, r);
}
function Fa() {
  let e = P$1(),
    t = B(),
    n = Ed$1(t);
  return (
    e.firstCreatePass && Hd$1(e, n),
    as(n) && cs(),
    os(),
    n.classesWithoutHost != null && sg(n) && oa(e, n, D(), n.classesWithoutHost, true),
    n.stylesWithoutHost != null && ag(n) && oa(e, n, D(), n.stylesWithoutHost, false),
    Fa
  );
}
function pf$1(e, t, n, r) {
  return (Lo$1(e, t, n, r), Fa(), pf$1);
}
function ja$1(e, t, n, r) {
  let o = D(),
    i = o[g$1],
    s = e + F,
    a = i.firstCreatePass ? Ky(s, i, 2, t, n, r) : i.data[s];
  return (vd$1(a, o, e, t, gf$1), r != null && qo$1(o, a), ja$1);
}
function Va$1() {
  let e = B(),
    t = Ed$1(e);
  return (as(t) && cs(), os(), Va$1);
}
function hf$1(e, t, n, r) {
  return (ja$1(e, t, n, r), Va$1(), hf$1);
}
var gf$1 = (e, t, n, r, o) => (io$1(true), Ju$1(t[R$1], r, ms()));
function qv() {
  return D();
}
function mf$1(e, t, n) {
  let r = D(),
    o = Je$1();
  if (Be$1(r, o, t)) {
    P$1();
    let s = Jt$1();
    md$1(s, r, e, t, r[R$1], n);
  }
  return mf$1;
}
var er$1 = 'en-US';
function yf$1(e) {
  typeof e == 'string' && e.toLowerCase().replace(/_/g, '-');
}
function vf(e, t, n) {
  let r = D(),
    o = P$1(),
    i = B();
  return (Ef$1(o, r, r[R$1], i, e, t, n), vf);
}
function Ef$1(e, t, n, r, o, i, s) {
  let a = true,
    c = null;
  if (
    ((r.type & 3 || s) && ((c ??= nn$1(r, t, i)), Od$1(r, e, t, s, n, o, i, c) && (a = false)), a)
  ) {
    let l = r.outputs?.[o],
      u = r.hostDirectiveOutputs?.[o];
    if (u && u.length)
      for (let d = 0; d < u.length; d += 2) {
        let p = u[d],
          f = u[d + 1];
        ((c ??= nn$1(r, t, i)), So$1(r, t, p, f, o, c));
      }
    if (l && l.length) for (let d of l) ((c ??= nn$1(r, t, i)), So$1(r, t, d, o, o, c));
  }
}
function zv(e = 1) {
  return _l$1(e);
}
function Qv(e, t) {
  let n = null,
    r = hm$1(e);
  for (let o = 0; o < t.length; o++) {
    let i = t[o];
    if (i === '*') {
      n = o;
      continue;
    }
    if (r === null ? nd$1(e, i, true) : ym$1(r, i)) return o;
  }
  return n;
}
function Zv(e) {
  let t = D()[Y$1][z$1];
  if (!t.projection) {
    let n = e ? e.length : 1,
      r = (t.projection = Zc$1(n, null)),
      o = r.slice(),
      i = t.child;
    for (; i !== null; ) {
      if (i.type !== 128) {
        let s = e ? Qv(i, e) : 0;
        s !== null && (o[s] ? (o[s].projectionNext = i) : (r[s] = i), (o[s] = i));
      }
      i = i.next;
    }
  }
}
function Yv(e, t = 0, n, r, o, i) {
  let s = D(),
    a = P$1(),
    c = null;
  let l = dn$1(a, F + e, 16, null, null);
  (l.projection === null && (l.projection = t), ds());
  let d = !s[zt$1] || ss$1();
  s[Y$1][z$1].projection[l.projection] === null && c !== null
    ? Kv(s, a, c)
    : d && !jo$1(l) && $m$1(a, s, l);
}
function Kv(e, t, n) {
  let r = F + n,
    o = t.data[r],
    i = e[r],
    s = Ys$1(i, o.tView.ssrId),
    a = _a(e, o, void 0, { dehydratedView: s });
  Na(i, a, 0, _o$1(o, s));
}
function If$1(e, t, n, r) {
  return (zd(e, t, n, r), If$1);
}
function Df$1(e, t, n) {
  return (Gd$1(e, t, n), Df$1);
}
function Jv(e) {
  let t = D(),
    n = P$1(),
    r = to$1();
  Pn$1(r + 1);
  let o = xa(n, r);
  if (e.dirty && al$1(t) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null) e.reset([]);
    else {
      let i = Zd$1(t, r);
      (e.reset(i, Ru$1), e.notifyOnChanges());
    }
    return true;
  }
  return false;
}
function Xv() {
  return Sa(D(), to$1());
}
function Tf$1(e, t, n, r, o) {
  return (Kd$1(t, zd(e, n, r, o)), Tf$1);
}
function wf$1(e, t, n, r) {
  return (Kd$1(e, Gd$1(t, n, r)), wf$1);
}
function eE(e = 1) {
  Pn$1(to$1() + e);
}
function tE(e) {
  let t = yl$1();
  return sl$1(t, F + e);
}
function po$1(e, t) {
  return (e << 17) | (t << 2);
}
function kt(e) {
  return (e >> 17) & 32767;
}
function nE(e) {
  return (e & 2) == 2;
}
function rE(e, t) {
  return (e & 131071) | (t << 17);
}
function ia(e) {
  return e | 2;
}
function an$1(e) {
  return (e & 131068) >> 2;
}
function Ss$1(e, t) {
  return (e & -131069) | (t << 2);
}
function oE(e) {
  return (e & 1) === 1;
}
function sa(e) {
  return e | 1;
}
function iE(e, t, n, r, o, i) {
  let s = t.classBindings,
    a = kt(s),
    c = an$1(s);
  e[r] = n;
  let l = false,
    u;
  if (Array.isArray(n)) {
    let d = n;
    ((u = d[1]), (u === null || Wt$1(d, u) > 0) && (l = true));
  } else u = n;
  if (o)
    if (c !== 0) {
      let p = kt(e[a + 1]);
      ((e[r + 1] = po$1(p, a)),
        p !== 0 && (e[p + 1] = Ss$1(e[p + 1], r)),
        (e[a + 1] = rE(e[a + 1], r)));
    } else ((e[r + 1] = po$1(a, 0)), a !== 0 && (e[a + 1] = Ss$1(e[a + 1], r)), (a = r));
  else ((e[r + 1] = po$1(c, 0)), a === 0 ? (a = r) : (e[c + 1] = Ss$1(e[c + 1], r)), (c = r));
  (l && (e[r + 1] = ia(e[r + 1])),
    pu$1(e, u, r, true),
    pu$1(e, u, r, false),
    sE(t, u, e, r),
    (s = po$1(a, c)),
    (t.classBindings = s));
}
function sE(e, t, n, r, o) {
  let i = e.residualClasses;
  i != null && typeof t == 'string' && Wt$1(i, t) >= 0 && (n[r + 1] = sa(n[r + 1]));
}
function pu$1(e, t, n, r) {
  let o = e[n + 1],
    i = t === null,
    s = r ? kt(o) : an$1(o),
    a = false;
  for (; s !== 0 && (a === false || i); ) {
    let c = e[s],
      l = e[s + 1];
    (aE(c, t) && ((a = true), (e[s + 1] = r ? sa(l) : ia(l))), (s = r ? kt(l) : an$1(l)));
  }
  a && (e[n + 1] = r ? ia(o) : sa(o));
}
function aE(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? true
    : Array.isArray(e) && typeof t == 'string'
      ? Wt$1(e, t) >= 0
      : false;
}
var ge$1 = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function cE(e) {
  return e.substring(ge$1.key, ge$1.keyEnd);
}
function lE(e) {
  return (uE(e), Cf$1(e, bf(e, 0, ge$1.textEnd)));
}
function Cf$1(e, t) {
  let n = ge$1.textEnd;
  return n === t ? -1 : ((t = ge$1.keyEnd = dE(e, (ge$1.key = t), n)), bf(e, t, n));
}
function uE(e) {
  ((ge$1.key = 0),
    (ge$1.keyEnd = 0),
    (ge$1.value = 0),
    (ge$1.valueEnd = 0),
    (ge$1.textEnd = e.length));
}
function bf(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; ) t++;
  return t;
}
function dE(e, t, n) {
  for (; t < n && e.charCodeAt(t) > 32; ) t++;
  return t;
}
function _f$1(e, t) {
  return (hE(e, t, null, true), _f$1);
}
function fE(e) {
  gE(DE, pE, e, true);
}
function pE(e, t) {
  for (let n = lE(t); n >= 0; n = Cf$1(t, n)) qr$1(e, cE(t), true);
}
function hE(e, t, n, r) {
  let o = D(),
    i = P$1(),
    s = ps(2);
  if ((i.firstUpdatePass && Nf$1(i, e, s, r), t !== le$1 && Be$1(o, s, t))) {
    let a = i.data[Xe()];
    Sf$1(i, a, o, o[R$1], e, (o[s + 1] = wE(t)), r, s);
  }
}
function gE(e, t, n, r) {
  let o = P$1(),
    i = ps(2);
  o.firstUpdatePass && Nf$1(o, null, i, r);
  let s = D();
  if (n !== le$1 && Be$1(s, i, n)) {
    let a = o.data[Xe()];
    if (xf$1(a) && !Mf$1(o, i)) {
      let c = a.classesWithoutHost;
      (c !== null && (n = jr(c, n || '')), oa(o, a, s, n, r));
    } else TE(o, a, s, s[R$1], s[i + 1], (s[i + 1] = IE(e, t, n)), r, i);
  }
}
function Mf$1(e, t) {
  return t >= e.expandoStartIndex;
}
function Nf$1(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[Xe()],
      s = Mf$1(e, n);
    (xf$1(i) && t === null && !s && (t = false), (t = mE(o, i, t, r)), iE(o, i, t, n, s));
  }
}
function mE(e, t, n, r) {
  let o = Tl$1(e),
    i = t.residualClasses;
  if (o === null)
    t.classBindings === 0 && ((n = xs$1(null, e, t, n)), (n = Zn$1(n, t.attrs)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = xs$1(o, e, t, n)), i === null)) {
        let c = yE(e, t);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = xs$1(null, e, t, c[1])), (c = Zn$1(c, t.attrs)), vE(e, t, r, c));
      } else i = EE(e, t);
  }
  return (i !== void 0 && (t.residualClasses = i), n);
}
function yE(e, t, n) {
  let r = t.classBindings;
  if (an$1(r) !== 0) return e[kt(r)];
}
function vE(e, t, n, r) {
  let o = t.classBindings;
  e[kt(o)] = r;
}
function EE(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = Zn$1(r, s);
  }
  return Zn$1(r, t.attrs);
}
function xs$1(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((i = t[a]), (r = Zn$1(r, i.hostAttrs)), i !== e);
  )
    a++;
  return (e !== null && (n.directiveStylingLast = a), r);
}
function Zn$1(e, t, n) {
  let r = 1,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == 'number'
        ? (o = s)
        : o === r && (Array.isArray(e) || (e = e === void 0 ? [] : ['', e]), qr$1(e, s, true));
    }
  return e === void 0 ? null : e;
}
function IE(e, t, n) {
  if (n == null || n === '') return G$1;
  let r = [],
    o = Ho$1(n);
  if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], true);
  else if (o instanceof Set) for (let i of o) e(r, i, true);
  else if (typeof o == 'object') for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
  else typeof o == 'string' && t(r, o);
  return r;
}
function DE(e, t, n) {
  let r = String(t);
  r !== '' && !r.includes(' ') && qr$1(e, r, n);
}
function TE(e, t, n, r, o, i, s, a) {
  o === le$1 && (o = G$1);
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
      h !== null && Sf$1(e, t, n, r, h, m, s, a),
      (u = c < o.length ? o[c] : null),
      (d = l < i.length ? i[l] : null));
  }
}
function Sf$1(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let c = e.data,
    l = c[a + 1],
    u = oE(l) ? hu$1(c, t, n, o, an$1(l)) : void 0;
  if (!Fo$1(u)) {
    Fo$1(i) || (nE(l) && (i = hu$1(c, null, n, o, a)));
    let d = Xi$1(Xe(), n);
    Wm$1(r, s, d, o, i);
  }
}
function hu$1(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let c = e[o],
      l = Array.isArray(c),
      u = l ? c[1] : c,
      d = u === null,
      p = n[o + 1];
    p === le$1 && (p = d ? G$1 : void 0);
    let f = d ? Gr$1(p, r) : u === r ? p : void 0;
    if ((l && !Fo$1(f) && (f = Gr$1(c, r)), Fo$1(f) && ((a = f), s))) return a;
    let h = e[o + 1];
    o = s ? kt(h) : an$1(h);
  }
  if (t !== null) {
    let c = t.residualClasses;
    c != null && (a = Gr$1(c, r));
  }
  return a;
}
function Fo$1(e) {
  return e !== void 0;
}
function wE(e, t) {
  return (e == null || e === '' || (typeof e == 'object' && (e = Mn$1(Ho$1(e)))), e);
}
function xf$1(e, t) {
  return (e.flags & 8) !== 0;
}
function CE(e, t = '') {
  let n = D(),
    r = P$1(),
    o = e + F,
    i = r.firstCreatePass ? dn$1(r, o, 1, t, null) : r.data[o],
    s = bE(r, n, i, t);
  ((n[o] = s), oo$1() && Da(r, n, s, i), Kt$1(i, false));
}
var bE = (e, t, n, r) => (io$1(true), Xg(t[R$1], r));
function _E(e, t, n, r = '') {
  return Be$1(e, Je$1(), n) ? t + Sn(n) + r : le$1;
}
function Af(e) {
  return (Ha$1('', e), Af);
}
function Ha$1(e, t, n) {
  let r = D(),
    o = _E(r, e, t, n);
  return (o !== le$1 && ME(r, Xe(), o), Ha$1);
}
function ME(e, t, n) {
  let r = Xi$1(t, e);
  em$1(e[R$1], r, n);
}
function kf$1(e, t, n) {
  co$1(t) && (t = t());
  let r = D(),
    o = Je$1();
  if (Be$1(r, o, t)) {
    P$1();
    let s = Jt$1();
    gd$1(s, r, e, t, r[R$1], n);
  }
  return kf$1;
}
function NE(e, t) {
  let n = co$1(e);
  return (n && e.set(t), n);
}
function Rf$1(e, t) {
  let n = D(),
    r = P$1(),
    o = B();
  return (Ef$1(r, n, n[R$1], o, e, t), Rf$1);
}
function SE(e) {
  return Be$1(D(), Je$1(), e) ? Sn(e) : le$1;
}
function gu$1(e, t, n) {
  let r = P$1();
  r.firstCreatePass && Of$1(t, r.data, r.blueprint, Ce(e), n);
}
function Of$1(e, t, n, r, o) {
  if (((e = $$1(e)), Array.isArray(e))) for (let i = 0; i < e.length; i++) Of$1(e[i], t, n, r, o);
  else {
    let i = P$1(),
      s = D(),
      a = B(),
      c = vt$1(e) ? e : $$1(e.provide),
      l = Zi$1(e),
      u = a.providerIndexes & 1048575,
      d = a.directiveStart,
      p = a.providerIndexes >> 20;
    if (vt$1(e) || !e.multi) {
      let f = new Nt(l, o, zo$1, null),
        h = ks$1(c, t, u + p, d);
      h === -1
        ? (Os$1(Do$1(a, s), i, c),
          As$1(i, e, t.length),
          t.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          n.push(f),
          s.push(f))
        : ((n[h] = f), (s[h] = f));
    } else {
      let f = ks$1(c, t, u + p, d),
        h = ks$1(c, t, u, u + p),
        m = f >= 0 && n[f],
        _ = h >= 0 && n[h];
      if (!m) {
        Os$1(Do$1(a, s), i, c);
        let S = kE(xE, n.length, o, r, l);
        (_ && (n[h].providerFactory = S),
          As$1(i, e, t.length, 0),
          t.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          n.push(S),
          s.push(S));
      } else {
        let S = Pf$1(n[f], l, r);
        As$1(i, e, f > -1 ? f : h, S);
      }
      r && _ && n[h].componentProviders++;
    }
  }
}
function As$1(e, t, n, r) {
  let o = vt$1(t),
    i = tl$1(t);
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
function Pf$1(e, t, n) {
  return (n && e.componentProviders++, e.multi.push(t) - 1);
}
function ks$1(e, t, n, r) {
  for (let o = n; o < r; o++) if (t[o] === e) return o;
  return -1;
}
function xE(e, t, n, r, o) {
  return aa(this.multi, []);
}
function aa(e, t) {
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    t.push(r());
  }
  return t;
}
function kE(e, t, n, r, o, i) {
  let s = new Nt(e, n, zo$1, null);
  return ((s.multi = []), (s.index = t), (s.componentProviders = 0), Pf$1(s, o, r && !n), s);
}
function RE(e, t) {
  return (n) => {
    n.providersResolver = (r, o) => gu$1(r, o ? o(e) : e, false);
  };
}
function OE(e, t) {
  return Go$1(e, t);
}
var Lf$1 = (() => {
  class e {
    applicationErrorHandler = E$1(tt);
    appRef = E$1(Zo$1);
    taskService = E$1(Mt);
    ngZone = E$1(De$1);
    zonelessEnabled = E$1(jn$1);
    tracing = E$1(ln$1, { optional: true });
    zoneIsDefined = typeof Zone < 'u' && !!Zone.root.run;
    schedulerTickApplyArgs = [{ data: { __scheduler_tick__: true } }];
    subscriptions = new Q();
    angularZoneId = this.zoneIsDefined ? this.ngZone._inner?.get(bn) : null;
    scheduleInRootZone =
      !this.zonelessEnabled && this.zoneIsDefined && (E$1(Ts$1, { optional: true }) ?? false);
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
      let r = this.useMicrotaskScheduler ? xl$1 : vs;
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
        (!this.zonelessEnabled && this.zoneIsDefined && Zone.current.get(bn + this.angularZoneId))
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
    static ɵprov = Kn$1({ token: e, factory: e.ɵfac });
  }
  return e;
})();
function Ff$1() {
  return [
    { provide: Te, useExisting: Lf$1 },
    { provide: De$1, useClass: _n },
    { provide: jn$1, useValue: true },
  ];
}
var PE = (() => {
  class e {
    compileModuleSync(n) {
      return new Po$1(n);
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
    static ɵprov = Kn$1({ token: e, factory: e.ɵfac });
  }
  return e;
})();
function LE() {
  return (typeof $localize < 'u' && $localize.locale) || er$1;
}
var Ba$1 = new N('', { factory: () => E$1(Ba$1, { optional: true, skipSelf: true }) || LE() });
var Hf$1 = new N('');
function ot$1(e, t) {
  return gn(e, t?.equal);
}
function ne$1(e) {
  return lc$1(e);
}
var Yo$1 = class Yo extends Error {
    dependency;
    constructor(t) {
      (super('Dependency error', { cause: t.error() }),
        (this.name = 'ResourceDependencyError'),
        (this.dependency = t));
    }
  },
  Rt = class e extends Error {
    _brand;
    constructor(t) {
      super(t);
    }
    static IDLE = new e('IDLE');
    static LOADING = new e('LOADING');
  },
  FE = (e) => e;
function $a$1(e, t) {
  if (typeof e == 'function') {
    let n = ui$1(e, FE, t?.equal);
    return jf$1(n);
  } else {
    let n = ui$1(e.source, e.computation, e.equal);
    return jf$1(n, e.debugName);
  }
}
function jf$1(e, t) {
  let n = e[L],
    r = e;
  return (
    (r.set = (o) => ac$1(n, o)),
    (r.update = (o) => cc(n, o)),
    (r.asReadonly = Ln$1.bind(e)),
    r
  );
}
function jE(e) {
  let t = e.request,
    n = e.params ?? t ?? (() => null);
  return new Ko$1(
    n,
    HE(e),
    e.defaultValue,
    e.equal ? VE(e.equal) : void 0,
    e.debugName,
    e.injector ?? E$1(de$1),
    e.id,
  );
}
var Ua = class {
    value;
    isLoading;
    constructor(t, n) {
      ((this.value = t),
        (this.value.set = this.set.bind(this)),
        (this.value.update = this.update.bind(this)),
        (this.value.asReadonly = Ln$1),
        (this.isLoading = ot$1(
          () => this.status() === 'loading' || this.status() === 'reloading',
          void 0,
        )));
    }
    isError = ot$1(() => this.status() === 'error');
    update(t) {
      this.set(t(ne$1(this.value)));
    }
    isValueDefined = ot$1(() => (this.isError() ? false : this.value() !== void 0));
    _snapshot;
    get snapshot() {
      return (this._snapshot ??= ot$1(() => {
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
  Ko$1 = class Ko extends Ua {
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
      if (Uf$1()) throw Wf$1();
      (super(
        ot$1(
          () => {
            let u = this.state().stream?.();
            if (!u || (this.state().status === 'loading' && this.error())) return r;
            if (!Wa$1(u)) throw new Xo$1(this.error());
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
      let l = s.get(Hf$1, void 0, { optional: true }) ?? { isActive: false };
      ((this.transferState = s.get(so$1, void 0, { optional: true }) ?? void 0),
        (this.extRequest = $a$1(
          () => {
            try {
              return (Ga$1(!0), { request: t(UE), reload: 0 });
            } catch (u) {
              return (
                za$1(u),
                u === Rt.IDLE
                  ? { status: 'idle', reload: 0 }
                  : u === Rt.LOADING
                    ? { status: 'loading', reload: 0 }
                    : { error: u, reload: 0 }
              );
            } finally {
              Ga$1(false);
            }
          },
          void 0,
        )),
        (this.state = $a$1({
          source: this.extRequest,
          computation: (u, d) => {
            let { request: p, status: f, error: h } = u,
              m;
            if (h) ((f = 'resolved'), (m = _e({ error: Jo$1(h) }, void 0)));
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
              previousStatus: d ? Vf$1(d.value) : 'idle',
              stream: m,
            };
          },
        })),
        (this.effectRef = ws(this.loadEffect.bind(this), { injector: s, manualCleanup: true })),
        (this.pendingTasks = s.get(lo$1)),
        (this.unregisterOnDestroy = s.get(je$1).onDestroy(() => this.destroy())),
        (this.status = ot$1(() => Vf$1(this.state()), void 0)),
        (this.error = ot$1(
          () => {
            let u = this.state().stream?.();
            return u && !Wa$1(u) ? u.error : void 0;
          },
          void 0,
        )));
    }
    set(t) {
      if (this.destroyed) return;
      let n = ne$1(this.error),
        r = ne$1(this.state);
      if (!n) {
        let o = ne$1(this.value);
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
      let { status: t } = ne$1(this.state);
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
        { status: n, previousStatus: r } = ne$1(this.state);
      if (t.request === void 0) return;
      if (n !== 'loading') return;
      this.abortInProgressLoad();
      let o = (this.resolvePendingTask = this.pendingTasks.add()),
        { signal: i } = (this.pendingController = new AbortController());
      try {
        let s = ne$1(() =>
            this.loaderFn({ params: t.request, abortSignal: i, previous: { status: r } }),
          ),
          a = () => i.aborted || ne$1(this.extRequest) !== t;
        if (Vn$1(s)) {
          if (a()) return;
          this.state.set({
            extRequest: t,
            status: 'resolved',
            previousStatus: 'resolved',
            stream: s,
          });
          let c = ne$1(s);
        } else {
          let c = await s;
          if (a()) return;
          this.state.set({
            extRequest: t,
            status: 'resolved',
            previousStatus: 'resolved',
            stream: c,
          });
          let l = c ? ne$1(c) : void 0;
        }
      } catch (s) {
        if ((za$1(s), i.aborted || ne$1(this.extRequest) !== t)) return;
        this.state.set({
          extRequest: t,
          status: 'resolved',
          previousStatus: 'error',
          stream: _e({ error: Jo$1(s) }, void 0),
        });
      } finally {
        (o?.(), (o = void 0));
      }
    }
    abortInProgressLoad() {
      (ne$1(() => this.pendingController?.abort()),
        (this.pendingController = void 0),
        this.resolvePendingTask?.(),
        (this.resolvePendingTask = void 0));
    }
  };
function VE(e) {
  return (t, n) => (t === void 0 || n === void 0 ? t === n : e(t, n));
}
function HE(e) {
  return BE(e)
    ? e.stream
    : async (t) => {
        try {
          return _e({ value: await e.loader(t) }, void 0);
        } catch (n) {
          return _e({ error: Jo$1(n) }, void 0);
        }
      };
}
function BE(e) {
  return !!e.stream;
}
function Vf$1(e) {
  switch (e.status) {
    case 'loading':
      return e.extRequest.reload === 0 ? 'loading' : 'reloading';
    case 'resolved':
      return Wa$1(e.stream()) ? 'resolved' : 'error';
    default:
      return e.status;
  }
}
function Wa$1(e) {
  return e.error === void 0;
}
function Jo$1(e) {
  return $E(e) ? e : new qa$1(e);
}
function $E(e) {
  return (
    e instanceof Error ||
    (typeof e == 'object' && typeof e.name == 'string' && typeof e.message == 'string')
  );
}
var Xo$1 = class Xo extends Error {
    constructor(t) {
      super(t.message, { cause: t });
    }
  },
  qa$1 = class qa extends Error {
    constructor(t) {
      super(String(t), { cause: t });
    }
  };
function Bf$1(e) {
  switch (e.status()) {
    case 'idle':
      throw Rt.IDLE;
    case 'error':
      throw new Yo$1(e);
    case 'loading':
    case 'reloading':
      throw Rt.LOADING;
  }
  return e.value();
}
var UE = { chain: Bf$1 },
  $f$1 = false;
function Uf$1() {
  return $f$1;
}
function Ga$1(e) {
  $f$1 = e;
}
function Wf$1() {
  return new C(992, false);
}
function za$1(e) {
  if (e instanceof C && e.code === 992) throw e;
}
var Zf$1 = Symbol('InputSignalNode#UNSET'),
  WE = V$1(j$1({}, mn), {
    transformFn: void 0,
    applyValueToInputSignal(e, t) {
      ct$1(e, t);
    },
  });
function Yf$1(e, t) {
  let n = Object.create(WE);
  ((n.value = e), (n.transformFn = t?.transform));
  function r() {
    if ((Ue$1(n), n.value === Zf$1)) {
      let o = null;
      throw new C(-950, o);
    }
    return n.value;
  }
  return ((r[L] = n), r);
}
var qf$1 = class qf {
  attributeName;
  constructor(t) {
    this.attributeName = t;
  }
  __NG_ELEMENT_ID__ = () => ku$1(this.attributeName);
  toString() {
    return `HostAttributeToken ${this.attributeName}`;
  }
};
function sO(e) {
  return qE(e) ? e.default : e;
}
function qE(e) {
  return e && typeof e == 'object' && 'default' in e;
}
function Gf$1(e, t) {
  return Yf$1(e, t);
}
function GE(e) {
  return Yf$1(Zf$1, e);
}
var aO = ((Gf$1.required = GE), Gf$1);
function zf$1(e, t) {
  return Aa();
}
function zE(e, t) {
  return ka();
}
var cO = ((zf$1.required = zE), zf$1);
function Qf$1(e, t) {
  return Aa();
}
function QE(e, t) {
  return ka();
}
var lO = ((Qf$1.required = QE), Qf$1);
var dO = (() => {
  class e {
    static __NG_ELEMENT_ID__ = YE;
  }
  return e;
})();
function YE(e) {
  return KE(B(), D(), (e & 16) === 16);
}
function KE(e, t, n) {
  if (Fe(e) && !n) {
    let r = ce$1(e.index, t);
    return new rt$1(r, r);
  } else if (e.type & 175) {
    let r = t[Y$1];
    return new rt$1(r, t);
  }
  return null;
}
var Za$1 = new N(''),
  JE = new N('');
function tr$1(e) {
  return !e.moduleRef;
}
function XE(e) {
  let t = tr$1(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(De$1);
  return n.run(() => {
    tr$1(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let r = t.get(tt),
      o;
    if (
      (n.runOutsideAngular(() => {
        o = n.onError.subscribe({ next: r });
      }),
      tr$1(e))
    ) {
      let i = () => t.destroy(),
        s = e.platformInjector.get(Za$1);
      (s.add(i),
        t.onDestroy(() => {
          (o.unsubscribe(), s.delete(i));
        }));
    } else {
      let i = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(Za$1);
      (s.add(i),
        e.moduleRef.onDestroy(() => {
          ($n$1(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i));
        }));
    }
    return tI(r, n, () => {
      let i = t.get(Mt),
        s = i.add(),
        a = t.get(Oa);
      return (
        a.runInitializers(),
        a.donePromise
          .then(() => {
            let c = t.get(Ba$1, er$1);
            if ((yf$1(c || er$1), !t.get(JE, !0)))
              return tr$1(e) ? t.get(Zo$1) : (e.allPlatformModules.push(e.moduleRef), e.moduleRef);
            if (tr$1(e)) {
              let u = t.get(Zo$1);
              return (e.rootComponent !== void 0 && u.bootstrap(e.rootComponent), u);
            } else return (eI?.(e.moduleRef, e.allPlatformModules), e.moduleRef);
          })
          .finally(() => {
            i.remove(s);
          })
      );
    });
  });
}
var eI;
function tI(e, t, n) {
  try {
    let r = n();
    return Ra(r)
      ? r.catch((o) => {
          throw (t.runOutsideAngular(() => e(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e(r)), r);
  }
}
var ei$1 = null;
function nI(e = [], t) {
  return de$1.create({
    name: t,
    providers: [
      { provide: Qi$1, useValue: 'platform' },
      { provide: Za$1, useValue: new Set([() => (ei$1 = null)]) },
      ...e,
    ],
  });
}
function rI(e = []) {
  if (ei$1) return ei$1;
  let t = nI(e);
  return ((ei$1 = t), uf$1(), oI(t), t);
}
function oI(e) {
  let t = e.get(Rl$1, null);
  Qr$1(e, () => {
    t?.forEach((n) => n());
  });
}
function fO(e) {
  let { rootComponent: t, appProviders: n, platformProviders: r, platformRef: o } = e;
  k(M$1.BootstrapApplicationStart);
  try {
    let i = o?.injector ?? rI(r),
      s = [Ff$1(), kl$1, ...(n || [])],
      a = new Qn$1({ providers: s, parent: i, debugName: '', runEnvironmentInitializers: !1 });
    return XE({ r3Injector: a.injector, platformInjector: i, rootComponent: t });
  } catch (i) {
    return Promise.reject(i);
  } finally {
    k(M$1.BootstrapApplicationEnd);
  }
}
function pO(e) {
  return typeof e == 'boolean' ? e : e != null && e !== 'false';
}
function hO(e, t = NaN) {
  return !isNaN(parseFloat(e)) && !isNaN(Number(e)) ? Number(e) : t;
}
var Qa$1 = Symbol('NOT_SET'),
  Kf$1 = new Set(),
  iI = V$1(j$1({}, mn), {
    kind: 'afterRenderEffectPhase',
    consumerIsAlwaysLive: true,
    consumerAllowSignalWrites: true,
    value: Qa$1,
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
      if (((this.dirty = false), this.value !== Qa$1 && !Pt(this))) return this.signal;
      try {
        for (let o of this.cleanup ?? Kf$1) o();
      } finally {
        this.cleanup?.clear();
      }
      let t = [];
      (e !== void 0 && t.push(e), t.push(this.registerCleanupFn));
      let n = Ne(this),
        r;
      try {
        r = this.userFn.apply(null, t);
      } finally {
        We$1(this, n);
      }
      return (
        (this.value === Qa$1 || !this.equal(this.value, r)) && ((this.value = r), this.version++),
        this.signal
      );
    },
  }),
  Ya$1 = class Ya extends bo$1 {
    scheduler;
    lastPhase = null;
    nodes = [void 0, void 0, void 0, void 0];
    onDestroyFns = null;
    constructor(t, n, r, o, i, s = null) {
      (super(t, [void 0, void 0, void 0, void 0], r, false, i.get(je$1), s), (this.scheduler = o));
      for (let a of va) {
        let c = n[a];
        if (c === void 0) continue;
        let l = Object.create(iI);
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
            for (let n of t.cleanup ?? Kf$1) n();
          } finally {
            qe$1(t);
          }
    }
  };
function gO(e, t) {
  let n = E$1(de$1),
    r = n.get(Te),
    o = n.get(ya),
    i = n.get(ln$1, null, { optional: true });
  o.impl ??= n.get(sd$1);
  let s = e;
  typeof s == 'function' && (s = { mixedReadWrite: e });
  let a = n.get(Fn$1, null, { optional: true }),
    c = new Ya$1(
      o.impl,
      [s.earlyRead, s.write, s.mixedReadWrite, s.read],
      a?.view,
      r,
      n,
      i?.snapshot(null),
    );
  return (o.impl.register(c), c);
}
function mO(e, t) {
  let n = Re$1(e),
    r = t.elementInjector || Gt$1();
  return new At(n).create(
    r,
    t.projectableNodes,
    t.hostElement,
    t.environmentInjector,
    t.directives,
    t.bindings,
  );
}
function yO(e) {
  let t = Re$1(e);
  if (!t) return null;
  let n = new At(t);
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
var ja = null;
function Ue() {
  return ja;
}
function Ss(n) {
  ja ??= n;
}
var Tn = class {},
  $r = (() => {
    class n {
      historyGo(e) {
        throw new Error('');
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = ee({ token: n, factory: () => E$1(Ba), providedIn: 'platform' });
    }
    return n;
  })();
var Ba = (() => {
  class n extends $r {
    _location;
    _history;
    _doc = E$1(Xt$1);
    constructor() {
      (super(), (this._location = window.location), (this._history = window.history));
    }
    getBaseHrefFromDOM() {
      return Ue().getBaseHref(this._doc);
    }
    onPopState(e) {
      let r = Ue().getGlobalEventTarget(this._doc, 'window');
      return (r.addEventListener('popstate', e, false), () => r.removeEventListener('popstate', e));
    }
    onHashChange(e) {
      let r = Ue().getGlobalEventTarget(this._doc, 'window');
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
function Ha(n, t) {
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
function $a(n) {
  let t = n.search(/#|\?|$/);
  return n[t - 1] === '/' ? n.slice(0, t - 1) + n.slice(t) : n;
}
function rt(n) {
  return n && n[0] !== '?' ? `?${n}` : n;
}
var zr = (() => {
    class n {
      historyGo(e) {
        throw new Error('');
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = ee({ token: n, factory: () => E$1(Ku), providedIn: 'root' });
    }
    return n;
  })(),
  Wu = new N(''),
  Ku = (() => {
    class n extends zr {
      _platformLocation;
      _baseHref;
      _removeListenerFns = [];
      constructor(e, r) {
        (super(),
          (this._platformLocation = e),
          (this._baseHref =
            r ?? this._platformLocation.getBaseHrefFromDOM() ?? E$1(Xt$1).location?.origin ?? ''));
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
        return Ha(this._baseHref, e);
      }
      path(e = false) {
        let r = this._platformLocation.pathname + rt(this._platformLocation.search),
          i = this._platformLocation.hash;
        return i && e ? `${r}${i}` : r;
      }
      pushState(e, r, i, s) {
        let o = this.prepareExternalUrl(i + rt(s));
        this._platformLocation.pushState(e, r, o);
      }
      replaceState(e, r, i, s) {
        let o = this.prepareExternalUrl(i + rt(s));
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
        return new (r || n)(Ie$1($r), Ie$1(Wu, 8));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
    }
    return n;
  })();
var Lt = (() => {
  class n {
    _subject = new J$1();
    _basePath;
    _locationStrategy;
    _urlChangeListeners = [];
    _urlChangeSubscription = null;
    constructor(e) {
      this._locationStrategy = e;
      let r = this._locationStrategy.getBaseHref();
      ((this._basePath = Xu($a(za(r)))),
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
      return this.path() == this.normalize(e + rt(r));
    }
    normalize(e) {
      return n.stripTrailingSlash(Yu(this._basePath, za(e)));
    }
    prepareExternalUrl(e) {
      return (e && e[0] !== '/' && (e = '/' + e), this._locationStrategy.prepareExternalUrl(e));
    }
    go(e, r = '', i = null) {
      (this._locationStrategy.pushState(i, '', e, r),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(e + rt(r)), i));
    }
    replaceState(e, r = '', i = null) {
      (this._locationStrategy.replaceState(i, '', e, r),
        this._notifyUrlChangeListeners(this.prepareExternalUrl(e + rt(r)), i));
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
    static normalizeQueryParams = rt;
    static joinWithSlash = Ha;
    static stripTrailingSlash = $a;
    static ɵfac = function (r) {
      return new (r || n)(Ie$1(zr));
    };
    static ɵprov = ee({ token: n, factory: () => Ju(), providedIn: 'root' });
  }
  return n;
})();
function Ju() {
  return new Lt(Ie$1(zr));
}
function Yu(n, t) {
  if (!n || !t.startsWith(n)) return t;
  let e = t.substring(n.length);
  return e === '' || ['/', ';', '?', '#'].includes(e[0]) ? e : t;
}
function za(n) {
  return n.replace(/\/index\.html$/, '');
}
function Xu(n) {
  if (new RegExp('^(https?:)?//').test(n)) {
    let [, e] = n.split(/\/\/[^\/]+/);
    return e;
  }
  return n;
}
var Zu = (() => {
  class n {
    _viewContainerRef;
    _viewRef = null;
    ngTemplateOutletContext = null;
    ngTemplateOutlet = null;
    ngTemplateOutletInjector = null;
    injector = E$1(de$1);
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
      return new (r || n)(zo$1(Qo$1));
    };
    static ɵdir = Mv({
      type: n,
      selectors: [['', 'ngTemplateOutlet', '']],
      inputs: {
        ngTemplateOutletContext: 'ngTemplateOutletContext',
        ngTemplateOutlet: 'ngTemplateOutlet',
        ngTemplateOutletInjector: 'ngTemplateOutletInjector',
      },
      features: [eg$1],
    });
  }
  return n;
})();
function Ds(n, t) {
  t = encodeURIComponent(t);
  for (let e of n.split(';')) {
    let r = e.indexOf('='),
      [i, s] = r == -1 ? [e, ''] : [e.slice(0, r), e.slice(r + 1)];
    if (i.trim() === t) return decodeURIComponent(s);
  }
  return null;
}
var Ts = 'browser';
function Va(n) {
  return n === Ts;
}
var Cn = class {
    _doc;
    constructor(t) {
      this._doc = t;
    }
    manager;
  },
  Hr = (() => {
    class n extends Cn {
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
        return new (r || n)(Ie$1(Xt$1));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  Gr = new N(''),
  Is = (() => {
    class n {
      _zone;
      _plugins;
      _eventNameToPlugin = new Map();
      constructor(e, r) {
        ((this._zone = r),
          e.forEach((o) => {
            o.manager = this;
          }));
        let i = e.filter((o) => !(o instanceof Hr));
        this._plugins = i.slice().reverse();
        let s = e.find((o) => o instanceof Hr);
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
        return new (r || n)(Ie$1(Gr), Ie$1(De$1));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  Cs = 'ng-app-id';
function qa(n) {
  for (let t of n) t.remove();
}
function Ga(n, t) {
  let e = t.createElement('style');
  return ((e.textContent = n), e);
}
function td(n, t, e, r) {
  let i = n.head?.querySelectorAll(`style[${Cs}="${t}"],link[${Cs}="${t}"]`);
  if (!i || i.length === 0) return false;
  for (let s of i)
    (s.removeAttribute(Cs),
      s instanceof HTMLLinkElement
        ? r.set(s.href.slice(s.href.lastIndexOf('/') + 1), { usage: 0, elements: [s] })
        : s.textContent && e.set(s.textContent, { usage: 0, elements: [s] }));
  return true;
}
function As(n, t) {
  let e = t.createElement('link');
  return (e.setAttribute('rel', 'stylesheet'), e.setAttribute('href', n), e);
}
var ks = (() => {
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
          td(e, r, this.inline, this.external) && this.hosts.add(e.head));
      }
      addStyles(e, r) {
        for (let i of e) this.addUsage(i, this.inline, Ga);
        r?.forEach((i) => this.addUsage(i, this.external, As));
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
        i && (i.usage--, i.usage <= 0 && (qa(i.elements), r.delete(e)));
      }
      ngOnDestroy() {
        for (let [, { elements: e }] of [...this.inline, ...this.external]) qa(e);
        this.hosts.clear();
      }
      addHost(e) {
        if (!this.hosts.has(e)) {
          this.hosts.add(e);
          for (let [r, { elements: i }] of this.inline) i.push(this.addElement(e, Ga(r, this.doc)));
          for (let [r, { elements: i }] of this.external)
            i.push(this.addElement(e, As(r, this.doc)));
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
        return new (r || n)(Ie$1(Xt$1), Ie$1(Ds$1), Ie$1(Ph$1, 8), Ie$1(Rh$1));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  Rs = {
    svg: 'http://www.w3.org/2000/svg',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    math: 'http://www.w3.org/1998/Math/MathML',
  },
  Os = /%COMP%/g;
var Ka = '%COMP%',
  nd = `_nghost-${Ka}`,
  rd = `_ngcontent-${Ka}`,
  id = true,
  sd = new N('', { factory: () => id });
function od(n) {
  return rd.replace(Os, n);
}
function ad(n) {
  return nd.replace(Os, n);
}
function Ja(n, t) {
  return t.map((e) => e.replace(Os, n));
}
var xs = (() => {
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
          (this.defaultRenderer = new Rn(e, o, a, this.tracingService)));
      }
      createRenderer(e, r) {
        if (!e || !r) return this.defaultRenderer;
        let i = this.getOrCreateRenderer(e, r);
        return (i instanceof qr ? i.applyToHost(e) : i instanceof An && i.applyStyles(), i);
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
              s = new qr(c, l, r, this.appId, u, o, a, d);
              break;
            case St$1.ShadowDom:
              return new Vr(c, e, r, o, a, this.nonce, d, l);
            case St$1.ExperimentalIsolatedShadowDom:
              return new Vr(c, e, r, o, a, this.nonce, d);
            default:
              s = new An(c, l, r, u, o, a, d);
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
          Ie$1(Is),
          Ie$1(Ld$1),
          Ie$1(Ds$1),
          Ie$1(sd),
          Ie$1(Xt$1),
          Ie$1(De$1),
          Ie$1(Ph$1),
          Ie$1(ln$1, 8),
        );
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  Rn = class {
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
      return e ? this.doc.createElementNS(Rs[e] || e, t) : this.doc.createElement(t);
    }
    createComment(t) {
      return this.doc.createComment(t);
    }
    createText(t) {
      return this.doc.createTextNode(t);
    }
    appendChild(t, e) {
      (Wa(t) ? t.content : t).appendChild(e);
    }
    insertBefore(t, e, r) {
      t && (Wa(t) ? t.content : t).insertBefore(e, r);
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
        let s = Rs[i];
        s ? t.setAttributeNS(s, e, r) : t.setAttribute(e, r);
      } else t.setAttribute(e, r);
    }
    removeAttribute(t, e, r) {
      if (r) {
        let i = Rs[r];
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
      i & (Co$1.DashCase | Co$1.Important)
        ? t.style.setProperty(e, r, i & Co$1.Important ? 'important' : '')
        : (t.style[e] = r);
    }
    removeStyle(t, e, r) {
      r & Co$1.DashCase ? t.style.removeProperty(e) : (t.style[e] = '');
    }
    setProperty(t, e, r) {
      t != null && (t[e] = r);
    }
    setValue(t, e) {
      t.nodeValue = e;
    }
    listen(t, e, r, i) {
      if (typeof t == 'string' && ((t = Ue().getGlobalEventTarget(this.doc, t)), !t))
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
function Wa(n) {
  return n.tagName === 'TEMPLATE' && n.content !== void 0;
}
var Vr = class extends Rn {
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
      l = Ja(r.id, l);
      for (let d of l) {
        let h = document.createElement('style');
        (o && h.setAttribute('nonce', o), (h.textContent = d), this.shadowRoot.appendChild(h));
      }
      let u = r.getExternalStyles?.();
      if (u)
        for (let d of u) {
          let h = As(d, i);
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
  An = class extends Rn {
    sharedStylesHost;
    removeStylesOnCompDestroy;
    styles;
    styleUrls;
    constructor(t, e, r, i, s, o, a, c) {
      (super(t, s, o, a), (this.sharedStylesHost = e), (this.removeStylesOnCompDestroy = i));
      let l = r.styles;
      ((this.styles = c ? Ja(c, l) : l), (this.styleUrls = r.getExternalStyles?.(c)));
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles, this.styleUrls);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        Wn$1.size === 0 &&
        this.sharedStylesHost.removeStyles(this.styles, this.styleUrls);
    }
  },
  qr = class extends An {
    contentAttr;
    hostAttr;
    constructor(t, e, r, i, s, o, a, c) {
      let l = i + '-' + r.id;
      (super(t, e, r, s, o, a, c, l), (this.contentAttr = od(l)), (this.hostAttr = ad(l)));
    }
    applyToHost(t) {
      (this.applyStyles(), this.setAttribute(t, this.hostAttr, ''));
    }
    createElement(t, e) {
      let r = super.createElement(t, e);
      return (super.setAttribute(r, this.contentAttr, ''), r);
    }
  };
var Wr = class n extends Tn {
    supportsDOMEvents = true;
    static makeCurrent() {
      Ss(new n());
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
      let e = ld();
      return e == null ? null : ud(e);
    }
    resetBaseElement() {
      In = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(t) {
      return Ds(document.cookie, t);
    }
  },
  In = null;
function ld() {
  return ((In = In || document.head.querySelector('base')), In ? In.getAttribute('href') : null);
}
function ud(n) {
  return new URL(n, document.baseURI).pathname;
}
var Ya = ['alt', 'control', 'meta', 'shift'],
  dd = {
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
  hd = {
    alt: (n) => n.altKey,
    control: (n) => n.ctrlKey,
    meta: (n) => n.metaKey,
    shift: (n) => n.shiftKey,
  },
  Xa = (() => {
    class n extends Cn {
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
          .runOutsideAngular(() => Ue().onAndCancel(e, o.domEventName, a, s));
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
          Ya.forEach((l) => {
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
        let i = dd[e.key] || e.key,
          s = '';
        return (
          r.indexOf('code.') > -1 && ((i = e.code), (s = 'code.')),
          i == null || !i
            ? false
            : ((i = i.toLowerCase()),
              i === ' ' ? (i = 'space') : i === '.' && (i = 'dot'),
              Ya.forEach((o) => {
                if (o !== i) {
                  let a = hd[o];
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
        return new (r || n)(Ie$1(Xt$1));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
async function fd(n, t, e) {
  let r = j$1({ rootComponent: n }, pd(t, e));
  return fO(r);
}
function pd(n, t) {
  return {
    platformRef: t?.platformRef,
    appProviders: [...yd, ...(n?.providers ?? [])],
    platformProviders: bd,
  };
}
function md() {
  Wr.makeCurrent();
}
function gd() {
  return new ze$1();
}
function vd() {
  return (bg(document), document);
}
var bd = [
  { provide: Rh$1, useValue: Ts },
  { provide: Rl$1, useValue: md, multi: true },
  { provide: Xt$1, useFactory: vd },
];
var yd = [
  { provide: Qi$1, useValue: 'root' },
  { provide: ze$1, useFactory: gd },
  { provide: Gr, useClass: Hr, multi: true },
  { provide: Gr, useClass: Xa, multi: true },
  xs,
  { provide: Ld$1, useClass: ks },
  { provide: ks, useExisting: Ld$1 },
  Is,
  { provide: zn$1, useExisting: xs },
  [],
];
var Be = class n {
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
var Ns = class {
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
  Ls = class {
    encodeKey(t) {
      return Za(t);
    }
    encodeValue(t) {
      return Za(t);
    }
    decodeKey(t) {
      return decodeURIComponent(t);
    }
    decodeValue(t) {
      return decodeURIComponent(t);
    }
  };
function _d(n, t) {
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
var wd = /%(\d[a-f0-9])/gi,
  Ed = { 40: '@', '3A': ':', 24: '$', '2C': ',', '3B': ';', '3D': '=', '3F': '?', '2F': '/' };
function Za(n) {
  return encodeURIComponent(n).replace(wd, (t, e) => Ed[e] ?? t);
}
function Kr(n) {
  return `${n}`;
}
var je = class n {
  map;
  encoder;
  updates = null;
  cloneFrom = null;
  constructor(t = {}) {
    if (((this.encoder = t.encoder || new Ls()), t.fromString)) {
      if (t.fromObject) throw new C(2805, false);
      this.map = _d(t.fromString, this.encoder);
    } else
      t.fromObject
        ? ((this.map = new Map()),
          Object.keys(t.fromObject).forEach((e) => {
            let r = t.fromObject[e],
              i = Array.isArray(r) ? r.map(Kr) : [Kr(r)];
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
              (e.push(Kr(t.value)), this.map.set(t.param, e));
              break;
            case 'd':
              if (t.value !== void 0) {
                let r = this.map.get(t.param) || [],
                  i = r.indexOf(Kr(t.value));
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
function Sd(n) {
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
function Qa(n) {
  return typeof ArrayBuffer < 'u' && n instanceof ArrayBuffer;
}
function ec(n) {
  return typeof Blob < 'u' && n instanceof Blob;
}
function tc(n) {
  return typeof FormData < 'u' && n instanceof FormData;
}
function Dd(n) {
  return typeof URLSearchParams < 'u' && n instanceof URLSearchParams;
}
var Ps = 'Content-Type',
  nc = 'Accept',
  ic = 'text/plain',
  sc = 'application/json',
  Td = `${sc}, ${ic}, */*`,
  Ft = class n {
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
      if ((Sd(this.method) || i ? ((this.body = r !== void 0 ? r : null), (s = i)) : (s = r), s)) {
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
      if (((this.headers ??= new Be()), (this.context ??= new Ns()), !this.params))
        ((this.params = new je()), (this.urlWithParams = e));
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
            Qa(this.body) ||
            ec(this.body) ||
            tc(this.body) ||
            Dd(this.body)
          ? this.body
          : this.body instanceof je
            ? this.body.toString()
            : typeof this.body == 'object' ||
                typeof this.body == 'boolean' ||
                Array.isArray(this.body)
              ? JSON.stringify(this.body)
              : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || tc(this.body)
        ? null
        : ec(this.body)
          ? this.body.type || null
          : Qa(this.body)
            ? null
            : typeof this.body == 'string'
              ? ic
              : this.body instanceof je
                ? 'application/x-www-form-urlencoded;charset=UTF-8'
                : typeof this.body == 'object' ||
                    typeof this.body == 'number' ||
                    typeof this.body == 'boolean'
                  ? sc
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
        b = t.body !== void 0 ? t.body : this.body,
        v = t.withCredentials ?? this.withCredentials,
        D = t.reportProgress ?? this.reportProgress,
        w = t.reportUploadProgress ?? this.reportUploadProgress,
        S = t.reportDownloadProgress ?? this.reportDownloadProgress,
        P = t.headers || this.headers,
        q = t.params || this.params,
        N = t.context ?? this.context;
      return (
        t.setHeaders !== void 0 &&
          (P = Object.keys(t.setHeaders).reduce((B, Ne) => B.set(Ne, t.setHeaders[Ne]), P)),
        t.setParams &&
          (q = Object.keys(t.setParams).reduce((B, Ne) => B.set(Ne, t.setParams[Ne]), q)),
        new n(e, r, b, {
          params: q,
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
  Ut = (function (n) {
    return (
      (n[(n.Sent = 0)] = 'Sent'),
      (n[(n.UploadProgress = 1)] = 'UploadProgress'),
      (n[(n.ResponseHeader = 2)] = 'ResponseHeader'),
      (n[(n.DownloadProgress = 3)] = 'DownloadProgress'),
      (n[(n.Response = 4)] = 'Response'),
      (n[(n.User = 5)] = 'User'),
      n
    );
  })(Ut || {}),
  kn = class {
    headers;
    status;
    statusText;
    url;
    ok;
    type;
    redirected;
    responseType;
    constructor(t, e = 200, r = 'OK') {
      ((this.headers = t.headers || new Be()),
        (this.status = t.status !== void 0 ? t.status : e),
        (this.statusText = t.statusText || r),
        (this.url = t.url || null),
        (this.redirected = t.redirected),
        (this.responseType = t.responseType),
        (this.ok = this.status >= 200 && this.status < 300));
    }
  },
  Fs = class n extends kn {
    constructor(t = {}) {
      super(t);
    }
    type = Ut.ResponseHeader;
    clone(t = {}) {
      return new n({
        headers: t.headers || this.headers,
        status: t.status !== void 0 ? t.status : this.status,
        statusText: t.statusText || this.statusText,
        url: t.url || this.url || void 0,
      });
    }
  },
  On = class n extends kn {
    body;
    constructor(t = {}) {
      (super(t), (this.body = t.body !== void 0 ? t.body : null));
    }
    type = Ut.Response;
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
  ft = class extends kn {
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
  Cd = 200;
var Rd = /^\)\]\}',?\n/,
  Ad = new N('', { factory: () => null }),
  Id = (() => {
    class n {
      fetchImpl = E$1(Us, { optional: true })?.fetch ?? ((...e) => globalThis.fetch(...e));
      ngZone = E$1(De$1);
      destroyRef = E$1(je$1);
      maxResponseSize = E$1(Ad);
      handle(e) {
        return new x((r) => {
          let i = new AbortController();
          this.doRequest(e, i.signal, r).then(js, (o) => r.error(new ft({ error: o })));
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
          let b = this.ngZone.runOutsideAngular(() =>
            this.fetchImpl(e.urlWithParams, j$1({ signal: r }, s)),
          );
          (kd(b), i.next({ type: Ut.Sent }), (o = await b));
        } catch (b) {
          i.error(
            new ft({
              error: b,
              status: b.status ?? 0,
              statusText: b.statusText,
              url: e.urlWithParams,
              headers: b.headers,
            }),
          );
          return;
        }
        let a = new Be(o.headers),
          c = o.statusText,
          l = o.url || e.urlWithParams,
          u = o.status,
          d = null,
          h = e.reportProgress || e.reportDownloadProgress;
        if ((h && i.next(new Fs({ headers: a, status: u, statusText: c, url: l })), o.body)) {
          let b = o.headers.get('content-length'),
            v = b !== null ? Number(b) : NaN;
          this.maxResponseSize !== null &&
            Number.isFinite(v) &&
            v > this.maxResponseSize &&
            rc(this.maxResponseSize);
          let D = [],
            w = o.body.getReader(),
            S = 0,
            P,
            q,
            N = typeof Zone < 'u' && Zone.current,
            B = false;
          if (
            (await this.ngZone.runOutsideAngular(async () => {
              for (;;) {
                if (this.destroyRef.destroyed) {
                  (await w.cancel(), (B = true));
                  break;
                }
                let { done: X, value: os } = await w.read();
                if (X) break;
                if (
                  (D.push(os),
                  (S += os.length),
                  this.maxResponseSize !== null &&
                    S > this.maxResponseSize &&
                    (await w.cancel(), rc(this.maxResponseSize)),
                  h)
                ) {
                  q =
                    e.responseType === 'text'
                      ? (q ?? '') + (P ??= new TextDecoder()).decode(os, { stream: true })
                      : void 0;
                  let ia = () =>
                    i.next({
                      type: Ut.DownloadProgress,
                      total: Number.isFinite(v) ? v : void 0,
                      loaded: S,
                      partialText: q,
                    });
                  N ? N.run(ia) : ia();
                }
              }
            }),
            B)
          ) {
            i.complete();
            return;
          }
          let Ne = this.concatChunks(D, S);
          try {
            let X = o.headers.get(Ps) ?? '';
            d = this.parseBody(e, Ne, X, u);
          } catch (X) {
            i.error(
              new ft({
                error: X,
                headers: new Be(o.headers),
                status: o.status,
                statusText: o.statusText,
                url: o.url || e.urlWithParams,
              }),
            );
            return;
          }
        }
        u === 0 && (u = d ? Cd : 0);
        let f = u >= 200 && u < 300,
          p = o.redirected,
          g = o.type;
        f
          ? (i.next(
              new On({
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
              new ft({
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
            let o = new TextDecoder().decode(r).replace(Rd, '');
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
          e.headers.has(nc) || (r[nc] = Td),
          !e.headers.has(Ps))
        ) {
          let s = e.detectContentTypeHeader();
          s !== null && (r[Ps] = s);
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
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  Us = class {};
function js() {}
function kd(n) {
  n.then(js, js);
}
function rc(n) {
  throw new C(2825, false);
}
function Od(n, t) {
  return t(n);
}
function xd(n, t, e) {
  return (r, i) => Qr$1(e, () => t(r, (s) => n(s, i)));
}
var Pd = new N('', { factory: () => [] }),
  oc = new N(''),
  Md = new N('', { factory: () => true });
var Nd = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵprov = ee({
      token: n,
      factory: function (r) {
        let i = null;
        return (r ? (i = new (r || n)()) : (i = Ie$1(Id)), i);
      },
      providedIn: 'root',
    });
  }
  return n;
})();
var Ld = (() => {
    class n {
      backend;
      injector;
      chain = null;
      pendingTasks = E$1(lo$1);
      contributeToStability = E$1(Md);
      constructor(e, r) {
        ((this.backend = e), (this.injector = r));
      }
      handle(e) {
        if (this.chain === null) {
          let r = Array.from(new Set([...this.injector.get(Pd), ...this.injector.get(oc, [])]));
          this.chain = r.reduceRight((i, s) => xd(i, s, this.injector), Od);
        }
        if (this.contributeToStability) {
          let r = this.pendingTasks.add();
          return this.chain(e, (i) => this.backend.handle(i)).pipe(Wp$1(r));
        } else return this.chain(e, (r) => this.backend.handle(r));
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie$1(Nd), Ie$1(re));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
    }
    return n;
  })(),
  Fd = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = ee({
        token: n,
        factory: function (r) {
          let i = null;
          return (r ? (i = new (r || n)()) : (i = Ie$1(Ld)), i);
        },
        providedIn: 'root',
      });
    }
    return n;
  })();
function Ms(n, t) {
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
var Bs = (() => {
  class n {
    handler;
    constructor(e) {
      this.handler = e;
    }
    request(e, r, i = {}) {
      let s;
      if (e instanceof Ft) s = e;
      else {
        let c;
        i.headers instanceof Be ? (c = i.headers) : (c = new Be(i.headers));
        let l;
        (i.params &&
          (i.params instanceof je ? (l = i.params) : (l = new je({ fromObject: i.params }))),
          (s = new Ft(e, r, i.body !== void 0 ? i.body : null, {
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
      let o = bp$1(s).pipe(Hp$1((c) => this.handler.handle(c)));
      if (e instanceof Ft || i.observe === 'events') return o;
      let a = o.pipe(Dn((c) => c instanceof On));
      switch (i.observe || 'body') {
        case 'body':
          switch (s.responseType) {
            case 'arraybuffer':
              return a.pipe(
                pt$2((c) => {
                  if (c.body !== null && !(c.body instanceof ArrayBuffer)) throw new C(2806, false);
                  return c.body;
                }),
              );
            case 'blob':
              return a.pipe(
                pt$2((c) => {
                  if (c.body !== null && !(c.body instanceof Blob)) throw new C(2807, false);
                  return c.body;
                }),
              );
            case 'text':
              return a.pipe(
                pt$2((c) => {
                  if (c.body !== null && typeof c.body != 'string') throw new C(2808, false);
                  return c.body;
                }),
              );
            default:
              return a.pipe(pt$2((c) => c.body));
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
        params: new je().append(r, 'JSONP_CALLBACK'),
        observe: 'body',
        responseType: 'json',
      });
    }
    options(e, r = {}) {
      return this.request('OPTIONS', e, r);
    }
    patch(e, r, i = {}) {
      return this.request('PATCH', e, Ms(i, r));
    }
    post(e, r, i = {}) {
      return this.request('POST', e, Ms(i, r));
    }
    put(e, r, i = {}) {
      return this.request('PUT', e, Ms(i, r));
    }
    static ɵfac = function (r) {
      return new (r || n)(Ie$1(Fd));
    };
    static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
  }
  return n;
})();
var ac = (() => {
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
      return new (r || n)(Ie$1(Xt$1));
    };
    static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
  }
  return n;
})();
var $s = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = ee({
        token: n,
        factory: function (r) {
          let i = null;
          return (r ? (i = new (r || n)()) : (i = Ie$1(Bd)), i);
        },
        providedIn: 'root',
      });
    }
    return n;
  })(),
  Bd = (() => {
    class n extends $s {
      _doc = E$1(Xt$1);
      sanitize(e, r) {
        if (r == null) return null;
        switch (e) {
          case da.NONE:
            return r;
          case da.HTML:
            return qu$1(r, 'HTML') ? Ho$1(r) : Kg(this._doc, String(r)).toString();
          case da.STYLE:
            return qu$1(r, 'Style') ? Ho$1(r) : r;
          case da.SCRIPT:
            if (qu$1(r, 'Script')) return Ho$1(r);
            throw new C(5200, false);
          case da.URL:
            return qu$1(r, 'URL') ? Ho$1(r) : ua(String(r));
          case da.RESOURCE_URL:
            if (qu$1(r, 'ResourceURL')) return Ho$1(r);
            throw new C(5201, false);
          default:
            throw new C(5202, false);
        }
      }
      bypassSecurityTrustHtml(e) {
        return Ag(e);
      }
      bypassSecurityTrustStyle(e) {
        return kg(e);
      }
      bypassSecurityTrustScript(e) {
        return Rg(e);
      }
      bypassSecurityTrustUrl(e) {
        return Og(e);
      }
      bypassSecurityTrustResourceUrl(e) {
        return Pg(e);
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
var R = 'primary',
  qn = Symbol('RouteTitle'),
  Gs = class {
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
function mt(n) {
  return new Gs(n);
}
function zs(n, t, e) {
  for (let r = 0; r < n.length; r++) {
    let i = n[r],
      s = t[r];
    if (i[0] === ':') e[i.substring(1)] = s;
    else if (i !== s.path) return false;
  }
  return true;
}
function gc(n, t, e) {
  let r = e.path.split('/'),
    i = r.indexOf('**');
  if (i === -1) {
    if (r.length > n.length || (e.pathMatch === 'full' && (t.hasChildren() || r.length < n.length)))
      return null;
    let c = {},
      l = n.slice(0, r.length);
    return zs(r, l, c) ? { consumed: l, posParams: c } : null;
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
  return !zs(s, n.slice(0, s.length), a) || !zs(o, n.slice(n.length - o.length), a)
    ? null
    : { consumed: n, posParams: a };
}
function ei(n) {
  return new Promise((t, e) => {
    n.pipe(qp$1()).subscribe({ next: (r) => t(r), error: (r) => e(r) });
  });
}
function Hd(n, t) {
  if (n.length !== t.length) return false;
  for (let e = 0; e < n.length; ++e) if (!Re(n[e], t[e])) return false;
  return true;
}
function Re(n, t) {
  let e = n ? Ws(n) : void 0,
    r = t ? Ws(t) : void 0;
  if (!e || !r || e.length != r.length) return false;
  let i;
  for (let s = 0; s < e.length; s++) if (((i = e[s]), !vc(n[i], t[i]))) return false;
  return true;
}
function Ws(n) {
  return [...Object.keys(n), ...Object.getOwnPropertySymbols(n)];
}
function vc(n, t) {
  if (Array.isArray(n) && Array.isArray(t)) {
    if (n.length !== t.length) return false;
    let e = [...n].sort(),
      r = [...t].sort();
    return e.every((i, s) => r[s] === i);
  } else return n === t;
}
function Vd(n) {
  return n.length > 0 ? n[n.length - 1] : null;
}
function bt(n) {
  return Mp$1(n) ? n : Ra(n) ? Ee$1(Promise.resolve(n)) : bp$1(n);
}
function bc(n) {
  return Mp$1(n) ? ei(n) : Promise.resolve(n);
}
var qd = { exact: wc, subset: Ec },
  yc = { exact: Gd, subset: Wd, ignored: () => true },
  _c = { paths: 'exact', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'exact' },
  Ks = { paths: 'subset', fragment: 'ignored', matrixParams: 'ignored', queryParams: 'subset' };
function lc(n, t, e) {
  return (
    qd[e.paths](n.root, t.root, e.matrixParams) &&
    yc[e.queryParams](n.queryParams, t.queryParams) &&
    !(e.fragment === 'exact' && n.fragment !== t.fragment)
  );
}
function Gd(n, t) {
  return Re(n, t);
}
function wc(n, t, e) {
  if (
    !pt$1(n.segments, t.segments) ||
    !Xr(n.segments, t.segments, e) ||
    n.numberOfChildren !== t.numberOfChildren
  )
    return false;
  for (let r in t.children)
    if (!n.children[r] || !wc(n.children[r], t.children[r], e)) return false;
  return true;
}
function Wd(n, t) {
  return (
    Object.keys(t).length <= Object.keys(n).length && Object.keys(t).every((e) => vc(n[e], t[e]))
  );
}
function Ec(n, t, e) {
  return Sc(n, t, t.segments, e);
}
function Sc(n, t, e, r) {
  if (n.segments.length > e.length) {
    let i = n.segments.slice(0, e.length);
    return !(!pt$1(i, e) || t.hasChildren() || !Xr(i, e, r));
  } else if (n.segments.length === e.length) {
    if (!pt$1(n.segments, e) || !Xr(n.segments, e, r)) return false;
    for (let i in t.children)
      if (!n.children[i] || !Ec(n.children[i], t.children[i], r)) return false;
    return true;
  } else {
    let i = e.slice(0, n.segments.length),
      s = e.slice(n.segments.length);
    return !pt$1(n.segments, i) || !Xr(n.segments, i, r) || !n.children[R]
      ? false
      : Sc(n.children[R], t, s, r);
  }
}
function Xr(n, t, e) {
  return t.every((r, i) => yc[e](n[i].parameters, r.parameters));
}
var ge = class {
    root;
    queryParams;
    fragment;
    _queryParamMap;
    constructor(t = new M([], {}), e = {}, r = null) {
      ((this.root = t), (this.queryParams = e), (this.fragment = r));
    }
    get queryParamMap() {
      return ((this._queryParamMap ??= mt(this.queryParams)), this._queryParamMap);
    }
    toString() {
      return Yd.serialize(this);
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
      return Zr(this);
    }
  },
  it$1 = class it {
    path;
    parameters;
    _parameterMap;
    constructor(t, e) {
      ((this.path = t), (this.parameters = e));
    }
    get parameterMap() {
      return ((this._parameterMap ??= mt(this.parameters)), this._parameterMap);
    }
    toString() {
      return Tc(this);
    }
  };
function Kd(n, t) {
  return pt$1(n, t) && n.every((e, r) => Re(e.parameters, t[r].parameters));
}
function pt$1(n, t) {
  return n.length !== t.length ? false : n.every((e, r) => e.path === t[r].path);
}
function Jd(n, t) {
  let e = [];
  return (
    Object.entries(n.children).forEach(([r, i]) => {
      r === R && (e = e.concat(t(i, r)));
    }),
    Object.entries(n.children).forEach(([r, i]) => {
      r !== R && (e = e.concat(t(i, r)));
    }),
    e
  );
}
var Gn = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: () => new st$1() });
    }
    return n;
  })(),
  st$1 = class st {
    parse(t) {
      let e = new Ys(t);
      return new ge(e.parseRootSegment(), e.parseQueryParams(), e.parseFragment());
    }
    serialize(t) {
      let e = `/${xn(t.root, true)}`,
        r = Qd(t.queryParams),
        i = typeof t.fragment == 'string' ? `#${Xd(t.fragment)}` : '';
      return `${e}${r}${i}`;
    }
  },
  Yd = new st$1();
function Zr(n) {
  return n.segments.map((t) => Tc(t)).join('/');
}
function xn(n, t) {
  if (!n.hasChildren()) return Zr(n);
  if (t) {
    let e = n.children[R] ? xn(n.children[R], false) : '',
      r = [];
    return (
      Object.entries(n.children).forEach(([i, s]) => {
        i !== R && r.push(`${i}:${xn(s, false)}`);
      }),
      r.length > 0 ? `${e}(${r.join('//')})` : e
    );
  } else {
    let e = Jd(n, (r, i) => (i === R ? [xn(n.children[R], false)] : [`${i}:${xn(r, false)}`]));
    return Object.keys(n.children).length === 1 && n.children[R] != null
      ? `${Zr(n)}/${e[0]}`
      : `${Zr(n)}/(${e.join('//')})`;
  }
}
function Dc(n) {
  return encodeURIComponent(n)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',');
}
function Jr(n) {
  return Dc(n).replace(/%3B/gi, ';');
}
function Xd(n) {
  return encodeURI(n);
}
function Js(n) {
  return Dc(n).replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/%26/gi, '&');
}
function Qr(n) {
  return decodeURIComponent(n);
}
function uc(n) {
  return Qr(n.replace(/\+/g, '%20'));
}
function Tc(n) {
  return `${Js(n.path)}${Zd(n.parameters)}`;
}
function Zd(n) {
  return Object.entries(n)
    .map(([t, e]) => `;${Js(t)}=${Js(e)}`)
    .join('');
}
function Qd(n) {
  let t = Object.entries(n)
    .map(([e, r]) =>
      Array.isArray(r) ? r.map((i) => `${Jr(e)}=${Jr(i)}`).join('&') : `${Jr(e)}=${Jr(r)}`,
    )
    .filter((e) => e);
  return t.length ? `?${t.join('&')}` : '';
}
var eh = /^[^\/()?;#]+/;
function Hs(n) {
  let t = n.match(eh);
  return t ? t[0] : '';
}
var th = /^[^\/()?;=#]+/;
function nh(n) {
  let t = n.match(th);
  return t ? t[0] : '';
}
var rh = /^[^=?&#]+/;
function ih(n) {
  let t = n.match(rh);
  return t ? t[0] : '';
}
var sh = /^[^&#]+/;
function oh(n) {
  let t = n.match(sh);
  return t ? t[0] : '';
}
var Ys = class {
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
      (e.length > 0 || Object.keys(r).length > 0) && (i[R] = new M(e, r)),
      i
    );
  }
  parseSegment() {
    let t = Hs(this.remaining);
    if (t === '' && this.peekStartsWith(';')) throw new C(4009, false);
    return (this.capture(t), new it$1(Qr(t), this.parseMatrixParams()));
  }
  parseMatrixParams() {
    let t = {};
    for (; this.consumeOptional(';'); ) this.parseParam(t);
    return t;
  }
  parseParam(t) {
    let e = nh(this.remaining);
    if (!e) return;
    this.capture(e);
    let r = '';
    if (this.consumeOptional('=')) {
      let i = Hs(this.remaining);
      i && ((r = i), this.capture(r));
    }
    t[Qr(e)] = Qr(r);
  }
  parseQueryParam(t) {
    let e = ih(this.remaining);
    if (!e) return;
    this.capture(e);
    let r = '';
    if (this.consumeOptional('=')) {
      let o = oh(this.remaining);
      o && ((r = o), this.capture(r));
    }
    let i = uc(e),
      s = uc(r);
    if (t.hasOwnProperty(i)) {
      let o = t[i];
      (Array.isArray(o) || ((o = [o]), (t[i] = o)), o.push(s));
    } else t[i] = s;
  }
  parseParens(t, e) {
    let r = {};
    for (this.capture('('); !this.consumeOptional(')') && this.remaining.length > 0; ) {
      let i = Hs(this.remaining),
        s = this.remaining[i.length];
      if (s !== '/' && s !== ')' && s !== ';') throw new C(4010, false);
      let o;
      i.indexOf(':') > -1
        ? ((o = i.slice(0, i.indexOf(':'))), this.capture(o), this.capture(':'))
        : t && (o = R);
      let a = this.parseChildren(e + 1);
      ((r[o ?? R] = Object.keys(a).length === 1 && a[R] ? a[R] : new M([], a)),
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
function Cc(n) {
  return n.segments.length > 0 ? new M([], { [R]: n }) : n;
}
function Rc(n) {
  let t = {};
  for (let [r, i] of Object.entries(n.children)) {
    let s = Rc(i);
    if (r === R && s.segments.length === 0 && s.hasChildren())
      for (let [o, a] of Object.entries(s.children)) t[o] = a;
    else (s.segments.length > 0 || s.hasChildren()) && (t[r] = s);
  }
  let e = new M(n.segments, t);
  return ah(e);
}
function ah(n) {
  if (n.numberOfChildren === 1 && n.children[R]) {
    let t = n.children[R];
    return new M(n.segments.concat(t.segments), t.children);
  }
  return n;
}
function zt(n) {
  return n instanceof ge;
}
function Ac(n, t, e = null, r = null, i = new st$1()) {
  let s = Ic(n);
  return kc(s, t, e, r, i);
}
function Ic(n) {
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
    i = Cc(r);
  return t ?? i;
}
function kc(n, t, e, r, i) {
  let s = n;
  for (; s.parent; ) s = s.parent;
  if (t.length === 0) return Vs(s, s, s, e, r, i);
  let o = ch(t);
  if (o.toRoot()) return Vs(s, s, new M([], {}), e, r, i);
  let a = lh(o, s, n),
    c = a.processChildren
      ? Mn(a.segmentGroup, a.index, o.commands)
      : xc(a.segmentGroup, a.index, o.commands);
  return Vs(s, a.segmentGroup, c, e, r, i);
}
function ti(n) {
  return typeof n == 'object' && n != null && !n.outlets && !n.segmentPath;
}
function Fn(n) {
  return typeof n == 'object' && n != null && n.outlets;
}
function dc(n, t, e) {
  n ||= '\u0275';
  let r = new ge();
  return ((r.queryParams = { [n]: t }), e.parse(e.serialize(r)).queryParams[n]);
}
function Vs(n, t, e, r, i, s) {
  let o = {};
  for (let [l, u] of Object.entries(r ?? {}))
    o[l] = Array.isArray(u) ? u.map((d) => dc(l, d, s)) : dc(l, u, s);
  let a;
  n === t ? (a = e) : (a = Oc(n, t, e));
  let c = Cc(Rc(a));
  return new ge(c, o, i);
}
function Oc(n, t, e) {
  let r = {};
  return (
    Object.entries(n.children).forEach(([i, s]) => {
      s === t ? (r[i] = e) : (r[i] = Oc(s, t, e));
    }),
    new M(n.segments, r)
  );
}
var ni = class {
  isAbsolute;
  numberOfDoubleDots;
  commands;
  constructor(t, e, r) {
    if (
      ((this.isAbsolute = t),
      (this.numberOfDoubleDots = e),
      (this.commands = r),
      t && r.length > 0 && ti(r[0]))
    )
      throw new C(4003, false);
    let i = r.find(Fn);
    if (i && i !== Vd(r)) throw new C(4004, false);
  }
  toRoot() {
    return this.isAbsolute && this.commands.length === 1 && this.commands[0] == '/';
  }
};
function ch(n) {
  if (typeof n[0] == 'string' && n.length === 1 && n[0] === '/') return new ni(true, 0, n);
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
  return new ni(e, t, r);
}
var Bt = class {
  segmentGroup;
  processChildren;
  index;
  constructor(t, e, r) {
    ((this.segmentGroup = t), (this.processChildren = e), (this.index = r));
  }
};
function lh(n, t, e) {
  if (n.isAbsolute) return new Bt(t, true, 0);
  if (!e) return new Bt(t, false, NaN);
  if (e.parent === null) return new Bt(e, true, 0);
  let r = ti(n.commands[0]) ? 0 : 1,
    i = e.segments.length - 1 + r;
  return uh(e, i, n.numberOfDoubleDots);
}
function uh(n, t, e) {
  let r = n,
    i = t,
    s = e;
  for (; s > i; ) {
    if (((s -= i), (r = r.parent), !r)) throw new C(4005, false);
    i = r.segments.length;
  }
  return new Bt(r, false, i - s);
}
function dh(n) {
  return Fn(n[0]) ? n[0].outlets : { [R]: n };
}
function xc(n, t, e) {
  if (((n ??= new M([], {})), n.segments.length === 0 && n.hasChildren())) return Mn(n, t, e);
  let r = hh(n, t, e),
    i = e.slice(r.commandIndex);
  if (r.match && r.pathIndex < n.segments.length) {
    let s = new M(n.segments.slice(0, r.pathIndex), {});
    return ((s.children[R] = new M(n.segments.slice(r.pathIndex), n.children)), Mn(s, 0, i));
  } else
    return r.match && i.length === 0
      ? new M(n.segments, {})
      : r.match && !n.hasChildren()
        ? Xs(n, t, e)
        : r.match
          ? Mn(n, 0, i)
          : Xs(n, t, e);
}
function Mn(n, t, e) {
  if (e.length === 0) return new M(n.segments, {});
  {
    let r = dh(e),
      i = {};
    if (
      Object.keys(r).some((s) => s !== R) &&
      n.children[R] &&
      n.numberOfChildren === 1 &&
      n.children[R].segments.length === 0
    ) {
      let s = Mn(n.children[R], t, e);
      return new M(n.segments, s.children);
    }
    return (
      Object.entries(r).forEach(([s, o]) => {
        (typeof o == 'string' && (o = [o]), o !== null && (i[s] = xc(n.children[s], t, o)));
      }),
      Object.entries(n.children).forEach(([s, o]) => {
        r[s] === void 0 && (i[s] = o);
      }),
      new M(n.segments, i)
    );
  }
}
function hh(n, t, e) {
  let r = 0,
    i = t,
    s = { match: false, pathIndex: 0, commandIndex: 0 };
  for (; i < n.segments.length; ) {
    if (r >= e.length) return s;
    let o = n.segments[i],
      a = e[r];
    if (Fn(a)) break;
    let c = `${a}`,
      l = r < e.length - 1 ? e[r + 1] : null;
    if (i > 0 && c === void 0) break;
    if (c && l && typeof l == 'object' && l.outlets === void 0) {
      if (!fc(c, l, o)) return s;
      r += 2;
    } else {
      if (!fc(c, {}, o)) return s;
      r++;
    }
    i++;
  }
  return { match: true, pathIndex: i, commandIndex: r };
}
function Xs(n, t, e) {
  let r = n.segments.slice(0, t),
    i = 0;
  for (; i < e.length; ) {
    let s = e[i];
    if (Fn(s)) {
      let c = fh(s.outlets);
      return new M(r, c);
    }
    if (i === 0 && ti(e[0])) {
      let c = n.segments[t];
      (r.push(new it$1(c.path, hc(e[0]))), i++);
      continue;
    }
    let o = Fn(s) ? s.outlets[R] : `${s}`,
      a = i < e.length - 1 ? e[i + 1] : null;
    o && a && ti(a) ? (r.push(new it$1(o, hc(a))), (i += 2)) : (r.push(new it$1(o, {})), i++);
  }
  return new M(r, {});
}
function fh(n) {
  let t = {};
  return (
    Object.entries(n).forEach(([e, r]) => {
      (typeof r == 'string' && (r = [r]), r !== null && (t[e] = Xs(new M([], {}), 0, r)));
    }),
    t
  );
}
function hc(n) {
  let t = {};
  return (Object.entries(n).forEach(([e, r]) => (t[e] = `${r}`)), t);
}
function fc(n, t, e) {
  return n == e.path && Re(t, e.parameters);
}
var Nn = 'imperative',
  G = (function (n) {
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
  })(G || {}),
  ce = class {
    id;
    url;
    constructor(t, e) {
      ((this.id = t), (this.url = e));
    }
  },
  gt = class extends ce {
    type = G.NavigationStart;
    navigationTrigger;
    restoredState;
    constructor(t, e, r = 'imperative', i = null) {
      (super(t, e), (this.navigationTrigger = r), (this.restoredState = i));
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  ze = class extends ce {
    urlAfterRedirects;
    type = G.NavigationEnd;
    constructor(t, e, r) {
      (super(t, e), (this.urlAfterRedirects = r));
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  J = (function (n) {
    return (
      (n[(n.Redirect = 0)] = 'Redirect'),
      (n[(n.SupersededByNewNavigation = 1)] = 'SupersededByNewNavigation'),
      (n[(n.NoDataFromResolver = 2)] = 'NoDataFromResolver'),
      (n[(n.GuardRejected = 3)] = 'GuardRejected'),
      (n[(n.Aborted = 4)] = 'Aborted'),
      n
    );
  })(J || {}),
  Un = (function (n) {
    return (
      (n[(n.IgnoredSameUrlNavigation = 0)] = 'IgnoredSameUrlNavigation'),
      (n[(n.IgnoredByUrlHandlingStrategy = 1)] = 'IgnoredByUrlHandlingStrategy'),
      n
    );
  })(Un || {}),
  me = class extends ce {
    reason;
    code;
    type = G.NavigationCancel;
    constructor(t, e, r, i) {
      (super(t, e), (this.reason = r), (this.code = i));
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  };
function Pc(n) {
  return n instanceof me && (n.code === J.Redirect || n.code === J.SupersededByNewNavigation);
}
var He = class extends ce {
    reason;
    code;
    type = G.NavigationSkipped;
    constructor(t, e, r, i) {
      (super(t, e), (this.reason = r), (this.code = i));
    }
  },
  vt = class extends ce {
    error;
    target;
    type = G.NavigationError;
    constructor(t, e, r, i) {
      (super(t, e), (this.error = r), (this.target = i));
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  jn = class extends ce {
    urlAfterRedirects;
    state;
    type = G.RoutesRecognized;
    constructor(t, e, r, i) {
      (super(t, e), (this.urlAfterRedirects = r), (this.state = i));
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  ri = class extends ce {
    urlAfterRedirects;
    state;
    type = G.GuardsCheckStart;
    constructor(t, e, r, i) {
      (super(t, e), (this.urlAfterRedirects = r), (this.state = i));
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  ii = class extends ce {
    urlAfterRedirects;
    state;
    shouldActivate;
    type = G.GuardsCheckEnd;
    constructor(t, e, r, i, s) {
      (super(t, e), (this.urlAfterRedirects = r), (this.state = i), (this.shouldActivate = s));
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  si = class extends ce {
    urlAfterRedirects;
    state;
    type = G.ResolveStart;
    constructor(t, e, r, i) {
      (super(t, e), (this.urlAfterRedirects = r), (this.state = i));
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  oi = class extends ce {
    urlAfterRedirects;
    state;
    type = G.ResolveEnd;
    constructor(t, e, r, i) {
      (super(t, e), (this.urlAfterRedirects = r), (this.state = i));
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  ai = class {
    route;
    type = G.RouteConfigLoadStart;
    constructor(t) {
      this.route = t;
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  ci = class {
    route;
    type = G.RouteConfigLoadEnd;
    constructor(t) {
      this.route = t;
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  li = class {
    snapshot;
    type = G.ChildActivationStart;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  },
  ui = class {
    snapshot;
    type = G.ChildActivationEnd;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  },
  di = class {
    snapshot;
    type = G.ActivationStart;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  },
  hi = class {
    snapshot;
    type = G.ActivationEnd;
    constructor(t) {
      this.snapshot = t;
    }
    toString() {
      return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ''}')`;
    }
  };
var Ht = class {},
  Bn = class {},
  Vt = class {
    url;
    navigationBehaviorOptions;
    constructor(t, e) {
      ((this.url = t), (this.navigationBehaviorOptions = e));
    }
  };
function ph(n) {
  return !(n instanceof Ht) && !(n instanceof Vt) && !(n instanceof Bn);
}
var fi = class {
    rootInjector;
    outlet = null;
    route = null;
    children;
    attachRef = null;
    get injector() {
      return this.route?.snapshot._environmentInjector ?? this.rootInjector;
    }
    constructor(t) {
      ((this.rootInjector = t), (this.children = new Kt(this.rootInjector)));
    }
  },
  Kt = (() => {
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
        return (r || ((r = new fi(this.rootInjector)), this.contexts.set(e, r)), r);
      }
      getContext(e) {
        return this.contexts.get(e) || null;
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie$1(re));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
    }
    return n;
  })(),
  pi = class {
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
      let e = Zs(t, this._root);
      return e ? e.children.map((r) => r.value) : [];
    }
    firstChild(t) {
      let e = Zs(t, this._root);
      return e && e.children.length > 0 ? e.children[0].value : null;
    }
    siblings(t) {
      let e = Qs(t, this._root);
      return e.length < 2
        ? []
        : e[e.length - 2].children.map((i) => i.value).filter((i) => i !== t);
    }
    pathFromRoot(t) {
      return Qs(t, this._root).map((e) => e.value);
    }
  };
function Zs(n, t) {
  if (n === t.value) return t;
  for (let e of t.children) {
    let r = Zs(n, e);
    if (r) return r;
  }
  return null;
}
function Qs(n, t) {
  if (n === t.value) return [t];
  for (let e of t.children) {
    let r = Qs(n, e);
    if (r.length) return (r.unshift(t), r);
  }
  return [];
}
var ae = class {
  value;
  children;
  constructor(t, e) {
    ((this.value = t), (this.children = e));
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function jt(n) {
  let t = {};
  return (n && n.children.forEach((e) => (t[e.value.outlet] = e)), t);
}
var $n = class extends pi {
  snapshot;
  constructor(t, e) {
    (super(t), (this.snapshot = e), co(this, t));
  }
  toString() {
    return this.snapshot.toString();
  }
};
function Mc(n, t) {
  let e = mh(n, t),
    r = new En([new it$1('', {})]),
    i = new En({}),
    s = new En({}),
    o = new En({}),
    a = new En(''),
    c = new ot(r, i, o, a, s, R, n, e.root);
  return ((c.snapshot = e.root), new $n(new ae(c, []), e));
}
function mh(n, t) {
  let e = {},
    r = {},
    i = {},
    o = new qt([], e, i, '', r, R, n, null, {}, t);
  return new zn('', new ae(o, []));
}
var ot = class {
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
        (this.title = this.dataSubject?.pipe(pt$2((l) => l[qn])) ?? bp$1(void 0)),
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
      return ((this._paramMap ??= this.params.pipe(pt$2((t) => mt(t)))), this._paramMap);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= this.queryParams.pipe(pt$2((t) => mt(t)))),
        this._queryParamMap
      );
    }
    toString() {
      return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`;
    }
  },
  gh = 'always';
function ao(n, t, e) {
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
    i && Lc(i) && (r.resolve[qn] = i.title),
    r
  );
}
var qt = class {
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
      return this.data?.[qn];
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
      return ((this._paramMap ??= mt(this.params)), this._paramMap);
    }
    get queryParamMap() {
      return ((this._queryParamMap ??= mt(this.queryParams)), this._queryParamMap);
    }
    toString() {
      let t = this.url.map((r) => r.toString()).join('/'),
        e = this.routeConfig ? this.routeConfig.path : '';
      return `Route(url:'${t}', path:'${e}')`;
    }
  },
  zn = class extends pi {
    url;
    constructor(t, e) {
      (super(e), (this.url = t), co(this, e));
    }
    toString() {
      return Nc(this._root);
    }
  };
function co(n, t) {
  ((t.value._routerState = n), t.children.forEach((e) => co(n, e)));
}
function Nc(n) {
  let t = n.children.length > 0 ? ` { ${n.children.map(Nc).join(', ')} } ` : '';
  return `${n.value}${t}`;
}
function qs(n) {
  if (n.snapshot) {
    let t = n.snapshot,
      e = n._futureSnapshot;
    ((n.snapshot = e),
      Re(t.queryParams, e.queryParams) || n.queryParamsSubject.next(e.queryParams),
      t.fragment !== e.fragment && n.fragmentSubject.next(e.fragment),
      Re(t.params, e.params) || n.paramsSubject.next(e.params),
      Hd(t.url, e.url) || n.urlSubject.next(e.url),
      Re(t.data, e.data) || n.dataSubject.next(e.data));
  } else ((n.snapshot = n._futureSnapshot), n.dataSubject.next(n._futureSnapshot.data));
}
function eo(n, t) {
  let e = Re(n.params, t.params) && Kd(n.url, t.url),
    r = !n.parent != !t.parent;
  return e && !r && (!n.parent || eo(n.parent, t.parent));
}
function Lc(n) {
  return typeof n.title == 'string' || n.title === null;
}
var Fc = new N(''),
  lo = (() => {
    class n {
      activated = null;
      get activatedComponentRef() {
        return this.activated;
      }
      _activatedRoute = null;
      name = R;
      activateEvents = new xe$1();
      deactivateEvents = new xe$1();
      attachEvents = new xe$1();
      detachEvents = new xe$1();
      routerOutletData = aO();
      parentContexts = E$1(Kt);
      location = E$1(Qo$1);
      changeDetector = E$1(dO);
      inputBinder = E$1(Wn, { optional: true });
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
          c = new to(e, a, i.injector, this.routerOutletData);
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
      static ɵdir = Mv({
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
        features: [eg$1],
      });
    }
    return n;
  })(),
  to = class {
    route;
    childContexts;
    parent;
    outletData;
    constructor(t, e, r, i) {
      ((this.route = t), (this.childContexts = e), (this.parent = r), (this.outletData = i));
    }
    get(t, e) {
      return t === ot
        ? this.route
        : t === Kt
          ? this.childContexts
          : t === Fc
            ? this.outletData
            : this.parent.get(t, e);
    }
  },
  Wn = new N(''),
  Uc = (() => {
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
          i = Pp$1([this.options.queryParams ? r.queryParams : bp$1({}), r.params, r.data])
            .pipe(
              Kp$1(
                ([s, o, a], c) => (
                  (a = j$1(j$1(j$1({}, s), o), a)),
                  c === 0 ? bp$1(a) : Promise.resolve(a)
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
              let o = yO(r.component);
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
        By();
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  uo = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵcmp = Tv({
        type: n,
        selectors: [['ng-component']],
        exportAs: ['emptyRouterOutlet'],
        decls: 1,
        vars: 0,
        template: function (r, i) {
          r & 1 && pf$1(0, 'router-outlet');
        },
        dependencies: [lo],
        encapsulation: 2,
        changeDetection: 1,
      });
    }
    return n;
  })();
function ho(n) {
  let t = n.children && n.children.map(ho),
    e = t ? V$1(j$1({}, n), { children: t }) : j$1({}, n);
  return (
    !e.component &&
      !e.loadComponent &&
      (t || e.loadChildren) &&
      e.outlet &&
      e.outlet !== R &&
      (e.component = uo),
    e
  );
}
function vh(n, t, e) {
  let r = Hn(n, t._root, e ? e._root : void 0);
  return new $n(r, t);
}
function Hn(n, t, e) {
  if (e && n.shouldReuseRoute(t.value, e.value.snapshot)) {
    let r = e.value;
    r._futureSnapshot = t.value;
    let i = bh(n, t, e);
    return new ae(r, i);
  } else {
    if (n.shouldAttach(t.value)) {
      let s = n.retrieve(t.value);
      if (s !== null) {
        let o = s.route;
        return (
          (o.value._futureSnapshot = t.value),
          (o.children = t.children.map((a) => Hn(n, a))),
          o
        );
      }
    }
    let r = yh(t.value),
      i = t.children.map((s) => Hn(n, s));
    return new ae(r, i);
  }
}
function bh(n, t, e) {
  return t.children.map((r) => {
    for (let i of e.children) if (n.shouldReuseRoute(r.value, i.value.snapshot)) return Hn(n, r, i);
    return Hn(n, r);
  });
}
function yh(n) {
  return new ot(
    new En(n.url),
    new En(n.params),
    new En(n.queryParams),
    new En(n.fragment),
    new En(n.data),
    n.outlet,
    n.component,
    n,
  );
}
var Gt = class {
    redirectTo;
    navigationBehaviorOptions;
    constructor(t, e) {
      ((this.redirectTo = t), (this.navigationBehaviorOptions = e));
    }
  },
  jc = 'ngNavigationCancelingError';
function mi(n, t) {
  let { redirectTo: e, navigationBehaviorOptions: r } = zt(t)
      ? { redirectTo: t, navigationBehaviorOptions: void 0 }
      : t,
    i = Bc(false, J.Redirect);
  return ((i.url = e), (i.navigationBehaviorOptions = r), i);
}
function Bc(n, t) {
  let e = new Error(`NavigationCancelingError: ${''}`);
  return ((e[jc] = true), (e.cancellationCode = t), e);
}
function _h(n) {
  return $c(n) && zt(n.url);
}
function $c(n) {
  return !!n && n[jc];
}
var no = class {
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
        qs(this.futureState.root),
        this.activateChildRoutes(e, r, t));
    }
    deactivateChildRoutes(t, e, r) {
      let i = jt(e);
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
        s = jt(t);
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
        s = jt(t);
      for (let o of Object.values(s)) this.deactivateRouteAndItsChildren(o, i);
      r &&
        (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()),
        (r.attachRef = null),
        (r.route = null));
    }
    activateChildRoutes(t, e, r) {
      let i = jt(e);
      (t.children.forEach((s) => {
        (this.activateRoutes(s, i[s.value.outlet], r), this.forwardEvent(new hi(s.value.snapshot)));
      }),
        t.children.length && this.forwardEvent(new ui(t.value.snapshot)));
    }
    activateRoutes(t, e, r) {
      let i = t.value,
        s = e ? e.value : null;
      if ((qs(i), i === s))
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
            qs(a.route.value),
            this.activateChildRoutes(t, null, o.children));
        } else
          ((o.attachRef = null),
            (o.route = i),
            o.outlet && o.outlet.activateWith(i, o.injector),
            this.activateChildRoutes(t, null, o.children));
      } else this.activateChildRoutes(t, null, r);
    }
  },
  gi = class {
    path;
    route;
    constructor(t) {
      ((this.path = t), (this.route = this.path[this.path.length - 1]));
    }
  },
  $t = class {
    component;
    route;
    constructor(t, e) {
      ((this.component = t), (this.route = e));
    }
  };
function wh(n, t, e) {
  let r = n._root,
    i = t ? t._root : null;
  return Pn(r, i, e, [r.value]);
}
function Eh(n) {
  let t = n.routeConfig ? n.routeConfig.canActivateChild : null;
  return !t || t.length === 0 ? null : { node: n, guards: t };
}
function Jt(n, t) {
  let e = Symbol(),
    r = t.get(n, e);
  return r === e ? (typeof n == 'function' && !nh$1(n) ? n : t.get(n)) : r;
}
function Pn(n, t, e, r, i = { canDeactivateChecks: [], canActivateChecks: [] }) {
  let s = jt(t);
  return (
    n.children.forEach((o) => {
      (Sh(o, s[o.value.outlet], e, r.concat([o.value]), i), delete s[o.value.outlet]);
    }),
    Object.entries(s).forEach(([o, a]) => Ln(a, e.getContext(o), i)),
    i
  );
}
function Sh(n, t, e, r, i = { canDeactivateChecks: [], canActivateChecks: [] }) {
  let s = n.value,
    o = t ? t.value : null,
    a = e ? e.getContext(n.value.outlet) : null;
  if (o && s.routeConfig === o.routeConfig) {
    let c = Dh(o, s, s.routeConfig.runGuardsAndResolvers);
    (c
      ? i.canActivateChecks.push(new gi(r))
      : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
      s.component ? Pn(n, t, a ? a.children : null, r, i) : Pn(n, t, e, r, i),
      c &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        i.canDeactivateChecks.push(new $t(a.outlet.component, o)));
  } else
    (o && Ln(t, a, i),
      i.canActivateChecks.push(new gi(r)),
      s.component ? Pn(n, null, a ? a.children : null, r, i) : Pn(n, null, e, r, i));
  return i;
}
function Dh(n, t, e) {
  if (typeof e == 'function') return Qr$1(t._environmentInjector, () => e(n, t));
  switch (e) {
    case 'pathParamsChange':
      return !pt$1(n.url, t.url);
    case 'pathParamsOrQueryParamsChange':
      return !pt$1(n.url, t.url) || !Re(n.queryParams, t.queryParams);
    case 'always':
      return true;
    case 'paramsOrQueryParamsChange':
      return !eo(n, t) || !Re(n.queryParams, t.queryParams);
    default:
      return !eo(n, t);
  }
}
function Ln(n, t, e) {
  let r = jt(n),
    i = n.value;
  (Object.entries(r).forEach(([s, o]) => {
    i.component ? (t ? Ln(o, t.children.getContext(s), e) : Ln(o, null, e)) : Ln(o, t, e);
  }),
    i.component
      ? t && t.outlet && t.outlet.isActivated
        ? e.canDeactivateChecks.push(new $t(t.outlet.component, i))
        : e.canDeactivateChecks.push(new $t(null, i))
      : e.canDeactivateChecks.push(new $t(null, i)));
}
function Kn(n) {
  return typeof n == 'function';
}
function Th(n) {
  return typeof n == 'boolean';
}
function Ch(n) {
  return n && Kn(n.canLoad);
}
function Rh(n) {
  return n && Kn(n.canActivate);
}
function Ah(n) {
  return n && Kn(n.canActivateChild);
}
function Ih(n) {
  return n && Kn(n.canDeactivate);
}
function kh(n) {
  return n && Kn(n.canMatch);
}
function zc(n) {
  return n instanceof In$1 || n?.name === 'EmptyError';
}
var Yr = Symbol('INITIAL_VALUE');
function Wt() {
  return Kp$1((n) =>
    Pp$1(n.map((t) => t.pipe(Ii$1(1), Yp$1(Yr)))).pipe(
      pt$2((t) => {
        for (let e of t)
          if (e !== true) {
            if (e === Yr) return Yr;
            if (e === false || Oh(e)) return e;
          }
        return true;
      }),
      Dn((t) => t !== Yr),
      Ii$1(1),
    ),
  );
}
function Oh(n) {
  return zt(n) || n instanceof Gt;
}
function Hc(n) {
  return n.aborted
    ? bp$1(void 0).pipe(Ii$1(1))
    : new x((t) => {
        let e = () => {
          (t.next(), t.complete());
        };
        return (n.addEventListener('abort', e), () => n.removeEventListener('abort', e));
      });
}
function Vc(n) {
  return Jp$1(Hc(n));
}
function xh(n) {
  return ht((t) => {
    let {
      targetSnapshot: e,
      currentSnapshot: r,
      guards: { canActivateChecks: i, canDeactivateChecks: s },
    } = t;
    return s.length === 0 && i.length === 0
      ? bp$1(V$1(j$1({}, t), { guardsResult: true }))
      : Ph(s, e, r).pipe(
          ht((o) => (o && Th(o) ? Mh(e, i, n) : bp$1(o))),
          pt$2((o) => V$1(j$1({}, t), { guardsResult: o })),
        );
  });
}
function Ph(n, t, e) {
  return Ee$1(n).pipe(
    ht((r) => jh(r.component, r.route, e, t)),
    qp$1((r) => r !== true, true),
  );
}
function Mh(n, t, e) {
  return Ee$1(t).pipe(
    Hp$1((r) => Sr$1(Lh(r.route.parent, e), Nh(r.route, e), Uh(n, r.path), Fh(n, r.route))),
    qp$1((r) => r !== true, true),
  );
}
function Nh(n, t) {
  return (n !== null && t && t(new di(n)), bp$1(true));
}
function Lh(n, t) {
  return (n !== null && t && t(new li(n)), bp$1(true));
}
function Fh(n, t) {
  let e = t.routeConfig ? t.routeConfig.canActivate : null;
  if (!e || e.length === 0) return bp$1(true);
  let r = e.map((i) =>
    Fp$1(() => {
      let s = t._environmentInjector,
        o = Jt(i, s),
        a = Rh(o) ? o.canActivate(t, n) : Qr$1(s, () => o(t, n));
      return bt(a).pipe(qp$1());
    }),
  );
  return bp$1(r).pipe(Wt());
}
function Uh(n, t) {
  let e = t[t.length - 1],
    i = t
      .slice(0, t.length - 1)
      .reverse()
      .map((s) => Eh(s))
      .filter((s) => s !== null)
      .map((s) =>
        Fp$1(() => {
          let o = s.guards.map((a) => {
            let c = s.node._environmentInjector,
              l = Jt(a, c),
              u = Ah(l) ? l.canActivateChild(e, n) : Qr$1(c, () => l(e, n));
            return bt(u).pipe(qp$1());
          });
          return bp$1(o).pipe(Wt());
        }),
      );
  return bp$1(i).pipe(Wt());
}
function jh(n, t, e, r) {
  let i = t && t.routeConfig ? t.routeConfig.canDeactivate : null;
  if (!i || i.length === 0) return bp$1(true);
  let s = i.map((o) => {
    let a = t._environmentInjector,
      c = Jt(o, a),
      l = Ih(c) ? c.canDeactivate(n, t, e, r) : Qr$1(a, () => c(n, t, e, r));
    return bt(l).pipe(qp$1());
  });
  return bp$1(s).pipe(Wt());
}
function Bh(n, t, e, r, i) {
  let s = t.canLoad;
  if (s === void 0 || s.length === 0) return bp$1(true);
  let o = s.map((a) => {
    let c = Jt(a, n),
      l = Ch(c) ? c.canLoad(t, e) : Qr$1(n, () => c(t, e)),
      u = bt(l);
    return i ? u.pipe(Vc(i)) : u;
  });
  return bp$1(o).pipe(Wt(), qc(r));
}
function qc(n) {
  return hp$1(
    Xp$1((t) => {
      if (typeof t != 'boolean') throw mi(n, t);
    }),
    pt$2((t) => t === true),
  );
}
function $h(n, t, e, r, i, s) {
  let o = t.canMatch;
  if (!o || o.length === 0) return bp$1(true);
  let a = o.map((c) => {
    let l = Jt(c, n),
      u = kh(l) ? l.canMatch(t, e, i) : Qr$1(n, () => l(t, e, i));
    return bt(u).pipe(Vc(s));
  });
  return bp$1(a).pipe(Wt(), qc(r));
}
var $e = class n extends Error {
    segmentGroup;
    constructor(t) {
      (super(), (this.segmentGroup = t || null), Object.setPrototypeOf(this, n.prototype));
    }
  },
  Vn = class n extends Error {
    urlTree;
    constructor(t) {
      (super(), (this.urlTree = t), Object.setPrototypeOf(this, n.prototype));
    }
  };
function zh(n) {
  throw new C(4e3, false);
}
function Hh(n) {
  throw Bc(false, J.GuardRejected);
}
var ro = class {
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
      if (i.numberOfChildren > 1 || !i.children[R]) throw zh(`${t.redirectTo}`);
      i = i.children[R];
    }
  }
  async applyRedirectCommands(t, e, r, i, s) {
    let o = await Vh(e, i, s);
    if (o instanceof ge) throw new Vn(o);
    let a = this.applyRedirectCreateUrlTree(o, this.urlSerializer.parse(o), t, r);
    if (o[0] === '/') throw new Vn(a);
    return a;
  }
  applyRedirectCreateUrlTree(t, e, r, i) {
    let s = this.createSegmentGroup(t, e.root, r, i);
    return new ge(s, this.createQueryParams(e.queryParams, this.urlTree.queryParams), e.fragment);
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
function Vh(n, t, e) {
  if (typeof n == 'string') return Promise.resolve(n);
  let r = n;
  return ei(bt(Qr$1(e, () => r(t))));
}
function qh(n, t) {
  return (
    n.providers && !n._injector && (n._injector = ef$1(n.providers, t, `Route: ${n.path}`)),
    n._injector ?? t
  );
}
function Ee(n) {
  return n.outlet || R;
}
function Gh(n, t) {
  let e = n.filter((r) => Ee(r) === t);
  return (e.push(...n.filter((r) => Ee(r) !== t)), e);
}
var io = {
  matched: false,
  consumedSegments: [],
  remainingSegments: [],
  parameters: {},
  positionalParamSegments: {},
};
function Gc(n) {
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
function Wh(n, t, e, r, i, s, o) {
  let a = Wc(n, t, e);
  if (!a.matched) return bp$1(a);
  let c = Gc(s(a));
  return ((r = qh(t, r)), $h(r, t, e, i, c, o).pipe(pt$2((l) => (l === true ? a : j$1({}, io)))));
}
function Wc(n, t, e) {
  if (t.path === '')
    return t.pathMatch === 'full' && (n.hasChildren() || e.length > 0)
      ? j$1({}, io)
      : {
          matched: true,
          consumedSegments: [],
          remainingSegments: e,
          parameters: {},
          positionalParamSegments: {},
        };
  let i = (t.matcher || gc)(e, n, t);
  if (!i) return j$1({}, io);
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
function pc(n, t, e, r, i) {
  return e.length > 0 && Yh(n, e, r, i)
    ? { segmentGroup: new M(t, Jh(r, new M(e, n.children))), slicedSegments: [] }
    : e.length === 0 && Xh(n, e, r)
      ? { segmentGroup: new M(n.segments, Kh(n, e, r, n.children)), slicedSegments: e }
      : { segmentGroup: new M(n.segments, n.children), slicedSegments: e };
}
function Kh(n, t, e, r) {
  let i = {};
  for (let s of e)
    if (bi(n, t, s) && !r[Ee(s)]) {
      let o = new M([], {});
      i[Ee(s)] = o;
    }
  return j$1(j$1({}, r), i);
}
function Jh(n, t) {
  let e = {};
  e[R] = t;
  for (let r of n)
    if (r.path === '' && Ee(r) !== R) {
      let i = new M([], {});
      e[Ee(r)] = i;
    }
  return e;
}
function Yh(n, t, e, r) {
  return e.some((i) => (!bi(n, t, i) || !(Ee(i) !== R) ? false : !(r !== void 0 && Ee(i) === r)));
}
function Xh(n, t, e) {
  return e.some((r) => bi(n, t, r));
}
function bi(n, t, e) {
  return (n.hasChildren() || t.length > 0) && e.pathMatch === 'full' ? false : e.path === '';
}
function Zh(n, t, e) {
  return t.length === 0 && !n.children[e];
}
var so = class {};
async function Qh(n, t, e, r, i, s, o, a) {
  return new oo(n, t, e, r, i, o, s, a).recognize();
}
var ef = 31,
  oo = class {
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
        (this.applyRedirects = new ro(this.urlSerializer, this.urlTree)));
    }
    noMatchError(t) {
      return new C(4002, `'${t.segmentGroup}'`);
    }
    async recognize() {
      let t = pc(this.urlTree.root, [], [], this.config).segmentGroup,
        { children: e, rootSnapshot: r } = await this.match(t),
        i = new ae(r, e),
        s = new zn('', i),
        o = Ac(r, [], this.urlTree.queryParams, this.urlTree.fragment);
      return (
        (o.queryParams = this.urlTree.queryParams),
        (s.url = this.urlSerializer.serialize(o)),
        { state: s, tree: o }
      );
    }
    async match(t) {
      let e = new qt(
        [],
        Object.freeze({}),
        Object.freeze(j$1({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        R,
        this.rootComponentType,
        null,
        {},
        this.injector,
      );
      try {
        return {
          children: await this.processSegmentGroup(this.injector, this.config, t, R, e),
          rootSnapshot: e,
        };
      } catch (r) {
        if (r instanceof Vn) return ((this.urlTree = r.urlTree), this.match(r.urlTree.root));
        throw r instanceof $e ? this.noMatchError(r) : r;
      }
    }
    async processSegmentGroup(t, e, r, i, s) {
      if (r.segments.length === 0 && r.hasChildren()) return this.processChildren(t, e, r, s);
      let o = await this.processSegment(t, e, r, r.segments, i, true, s);
      return o instanceof ae ? [o] : [];
    }
    async processChildren(t, e, r, i) {
      let s = [];
      for (let c of Object.keys(r.children)) c === 'primary' ? s.unshift(c) : s.push(c);
      let o = [];
      for (let c of s) {
        let l = r.children[c],
          u = Gh(e, c),
          d = await this.processSegmentGroup(t, u, l, c, i);
        o.push(...d);
      }
      let a = Kc(o);
      return (tf(a), a);
    }
    async processSegment(t, e, r, i, s, o, a) {
      for (let c of e)
        try {
          return await this.processSegmentAgainstRoute(c._injector ?? t, e, c, r, i, s, o, a);
        } catch (l) {
          if (l instanceof $e || zc(l)) continue;
          throw l;
        }
      if (Zh(r, i, s)) return new so();
      throw new $e(r);
    }
    async processSegmentAgainstRoute(t, e, r, i, s, o, a, c) {
      if (Ee(r) !== o && (o === R || !bi(i, s, r))) throw new $e(i);
      if (r.redirectTo === void 0) return this.matchSegmentAgainstRoute(t, i, r, s, o, c);
      if (this.allowRedirects && a)
        return this.expandSegmentAgainstRouteUsingRedirect(t, i, e, r, s, o, c);
      throw new $e(i);
    }
    async expandSegmentAgainstRouteUsingRedirect(t, e, r, i, s, o, a) {
      let {
        matched: c,
        parameters: l,
        consumedSegments: u,
        positionalParamSegments: d,
        remainingSegments: h,
      } = Wc(e, i, s);
      if (!c) throw new $e(e);
      typeof i.redirectTo == 'string' &&
        i.redirectTo[0] === '/' &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > ef && (this.allowRedirects = false));
      let f = this.createSnapshot(t, i, s, l, a);
      if (this.abortSignal.aborted) throw new Error(this.abortSignal.reason);
      let p = await this.applyRedirects.applyRedirectCommands(u, i.redirectTo, d, Gc(f), t),
        g = await this.applyRedirects.lineralizeSegments(i, p);
      return this.processSegment(t, r, e, g.concat(h), o, false, a);
    }
    createSnapshot(t, e, r, i, s) {
      let o = new qt(
          r,
          i,
          Object.freeze(j$1({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          rf(e),
          Ee(e),
          e.component ?? e._loadedComponent ?? null,
          e,
          sf(e),
          t,
        ),
        a = ao(o, s, this.paramsInheritanceStrategy);
      return ((o.params = Object.freeze(a.params)), (o.data = Object.freeze(a.data)), o);
    }
    async matchSegmentAgainstRoute(t, e, r, i, s, o) {
      if (this.abortSignal.aborted) throw new Error(this.abortSignal.reason);
      let a = (w) => this.createSnapshot(t, r, w.consumedSegments, w.parameters, o),
        c = await ei(Wh(e, r, i, t, this.urlSerializer, a, this.abortSignal));
      if ((r.path === '**' && (e.children = {}), !c?.matched)) throw new $e(e);
      t = r._injector ?? t;
      let { routes: l } = await this.getChildConfig(t, r, i),
        u = r._loadedInjector ?? t,
        { parameters: d, consumedSegments: h, remainingSegments: f } = c,
        p = this.createSnapshot(t, r, h, d, o),
        { segmentGroup: g, slicedSegments: b } = pc(e, h, f, l, s);
      if (b.length === 0 && g.hasChildren()) {
        let w = await this.processChildren(u, l, g, p);
        return new ae(p, w);
      }
      if (l.length === 0 && b.length === 0) return new ae(p, []);
      let v = Ee(r) === s,
        D = await this.processSegment(u, l, g, b, v ? R : s, true, p);
      return new ae(p, D instanceof ae ? [D] : []);
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
        if (await ei(Bh(t, e, r, this.urlSerializer, this.abortSignal))) {
          let s = await this.configLoader.loadChildren(t, e);
          return (
            (e._loadedRoutes = s.routes),
            (e._loadedInjector = s.injector),
            (e._loadedNgModuleFactory = s.factory),
            s
          );
        }
        throw Hh();
      }
      return { routes: [], injector: t };
    }
  };
function tf(n) {
  n.sort((t, e) =>
    t.value.outlet === R
      ? -1
      : e.value.outlet === R
        ? 1
        : t.value.outlet.localeCompare(e.value.outlet),
  );
}
function nf(n) {
  let t = n.value.routeConfig;
  return t && t.path === '';
}
function Kc(n) {
  let t = [],
    e = new Set();
  for (let r of n) {
    if (!nf(r)) {
      t.push(r);
      continue;
    }
    let i = t.find((s) => r.value.routeConfig === s.value.routeConfig);
    i !== void 0 ? (i.children.push(...r.children), e.add(i)) : t.push(r);
  }
  for (let r of e) {
    let i = Kc(r.children);
    t.push(new ae(r.value, i));
  }
  return t.filter((r) => !e.has(r));
}
function rf(n) {
  return n.data || {};
}
function sf(n) {
  return n.resolve || {};
}
function of(n, t, e, r, i, s, o) {
  return ht(async (a) => {
    let { state: c, tree: l } = await Qh(n, t, e, r, a.extractedUrl, i, s, o);
    return V$1(j$1({}, a), { targetSnapshot: c, urlAfterRedirects: l });
  });
}
function af(n) {
  return ht((t) => {
    let {
      targetSnapshot: e,
      guards: { canActivateChecks: r },
    } = t;
    if (!r.length) return bp$1(t);
    let i = new Set(r.map((a) => a.route)),
      s = new Set();
    for (let a of i) if (!s.has(a)) for (let c of Jc(a)) s.add(c);
    let o = 0;
    return Ee$1(s).pipe(
      Hp$1((a) => (i.has(a) ? cf(a, e, n) : ((a.data = ao(a, a.parent, n).resolve), bp$1(void 0)))),
      Xp$1(() => o++),
      Gp$1(1),
      ht((a) => (o === s.size ? bp$1(t) : dt$1)),
    );
  });
}
function Jc(n) {
  let t = n.children.map((e) => Jc(e)).flat();
  return [n, ...t];
}
function cf(n, t, e) {
  let r = n.routeConfig,
    i = n._resolve;
  return (
    r?.title !== void 0 && !Lc(r) && (i[qn] = r.title),
    Fp$1(
      () => (
        (n.data = ao(n, n.parent, e).resolve),
        lf(i, n, t).pipe(
          pt$2((s) => ((n._resolvedData = s), (n.data = j$1(j$1({}, n.data), s)), null)),
        )
      ),
    )
  );
}
function lf(n, t, e) {
  let r = Ws(n);
  if (r.length === 0) return bp$1({});
  let i = {};
  return Ee$1(r).pipe(
    ht((s) =>
      uf(n[s], t, e).pipe(
        qp$1(),
        Xp$1((o) => {
          if (o instanceof Gt) throw mi(new st$1(), o);
          i[s] = o;
        }),
      ),
    ),
    Gp$1(1),
    pt$2(() => i),
    Rc$1((s) => (zc(s) ? dt$1 : _p$1(s))),
  );
}
function uf(n, t, e) {
  let r = t._environmentInjector,
    i = Jt(n, r),
    s = i.resolve ? i.resolve(t, e) : Qr$1(r, () => i(t, e));
  return bt(s);
}
function mc(n) {
  return Kp$1((t) => {
    let e = n(t);
    return e ? Ee$1(e).pipe(pt$2(() => t)) : bp$1(t);
  });
}
var fo = (() => {
    class n {
      buildTitle(e) {
        let r,
          i = e.root;
        for (; i !== void 0; )
          ((r = this.getResolvedTitleForRoute(i) ?? r),
            (i = i.children.find((s) => s.outlet === R)));
        return r;
      }
      getResolvedTitleForRoute(e) {
        return e.data[qn];
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: () => E$1(Yc) });
    }
    return n;
  })(),
  Yc = (() => {
    class n extends fo {
      title;
      constructor(e) {
        (super(), (this.title = e));
      }
      updateTitle(e) {
        let r = this.buildTitle(e);
        r !== void 0 && this.title.setTitle(r);
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie$1(ac));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
    }
    return n;
  })(),
  Jn = new N('', { factory: () => ({}) }),
  Yn = new N(''),
  Xc = (() => {
    class n {
      componentLoaders = new WeakMap();
      childrenLoaders = new WeakMap();
      onLoadStartListener;
      onLoadEndListener;
      compiler = E$1(PE);
      async loadComponent(e, r) {
        if (this.componentLoaders.get(r)) return this.componentLoaders.get(r);
        if (r._loadedComponent) return Promise.resolve(r._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(r);
        let i = (async () => {
          try {
            let s = await bc(Qr$1(e, () => r.loadComponent())),
              o = await Qc(sO(s));
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
            let s = await Zc(r, this.compiler, e, this.onLoadEndListener);
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
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
async function Zc(n, t, e, r) {
  let i = await bc(Qr$1(e, () => n.loadChildren())),
    s = await Qc(sO(i)),
    o;
  (s instanceof Xd$1 || Array.isArray(s) ? (o = s) : (o = await t.compileModuleAsync(s)),
    r && r(n));
  let a, c, u;
  return (
    Array.isArray(o)
      ? ((c = o), true)
      : ((a = o.create(e).injector),
        (u = o),
        (c = a.get(Yn, [], { optional: true, self: true }).flat())),
    { routes: c.map(ho), injector: a, factory: u }
  );
}
async function Qc(n) {
  return n;
}
var yi = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: () => E$1(df) });
    }
    return n;
  })(),
  df = (() => {
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
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  el = new N('');
var hf = () => {},
  tl = new N(''),
  nl = (() => {
    class n {
      currentNavigation = _e(null, { equal: () => false });
      currentTransition = null;
      lastSuccessfulNavigation = _e(null);
      events = new J$1();
      transitionAbortWithErrorSubject = new J$1();
      configLoader = E$1(Xc);
      environmentInjector = E$1(re);
      destroyRef = E$1(je$1);
      urlSerializer = E$1(Gn);
      rootContexts = E$1(Kt);
      location = E$1(Lt);
      inputBindingEnabled = E$1(Wn, { optional: true }) !== null;
      titleStrategy = E$1(fo);
      options = E$1(Jn, { optional: true }) || {};
      paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || gh;
      urlHandlingStrategy = E$1(yi);
      createViewTransition = E$1(el, { optional: true });
      navigationErrorHandler = E$1(tl, { optional: true });
      navigationId = 0;
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      transitions;
      afterPreactivation = () => bp$1(void 0);
      rootComponentType = null;
      destroyed = false;
      constructor() {
        let e = (i) => this.events.next(new ai(i)),
          r = (i) => this.events.next(new ci(i));
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
        ne$1(() => {
          this.transitions?.next(
            V$1(j$1({}, e), {
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
          (this.transitions = new En(null)),
          this.transitions.pipe(
            Dn((r) => r !== null),
            Kp$1((r) => {
              let i = true,
                s = false,
                o = new AbortController(),
                a = () => !s && this.currentTransition?.id === r.id;
              return bp$1(r).pipe(
                Kp$1((c) => {
                  if (this.navigationId > r.id)
                    return (
                      this.cancelNavigationTransition(r, '', J.SupersededByNewNavigation),
                      dt$1
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
                    previousNavigation: l ? V$1(j$1({}, l), { previousNavigation: null }) : null,
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
                        new He(
                          c.id,
                          this.urlSerializer.serialize(c.rawUrl),
                          '',
                          Un.IgnoredSameUrlNavigation,
                        ),
                      ),
                      c.resolve(false),
                      dt$1
                    );
                  if (this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                    return bp$1(c).pipe(
                      Kp$1(
                        (h) => (
                          this.events.next(
                            new gt(
                              h.id,
                              this.urlSerializer.serialize(h.extractedUrl),
                              h.source,
                              h.restoredState,
                            ),
                          ),
                          h.id !== this.navigationId ? dt$1 : Promise.resolve(h)
                        ),
                      ),
                      of(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        e.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy,
                        o.signal,
                      ),
                      Xp$1((h) => {
                        ((r.targetSnapshot = h.targetSnapshot),
                          (r.urlAfterRedirects = h.urlAfterRedirects),
                          this.currentNavigation.update(
                            (f) => ((f.finalUrl = h.urlAfterRedirects), f),
                          ),
                          this.events.next(new Bn()));
                      }),
                      Kp$1((h) =>
                        Ee$1(r.routesRecognizeHandler.deferredHandle ?? bp$1(void 0)).pipe(
                          pt$2(() => h),
                        ),
                      ),
                      Xp$1(() => {
                        let h = new jn(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot,
                        );
                        this.events.next(h);
                      }),
                    );
                  if (u && this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)) {
                    let { id: h, extractedUrl: f, source: p, restoredState: g, extras: b } = c,
                      v = new gt(h, this.urlSerializer.serialize(f), p, g);
                    this.events.next(v);
                    let D = Mc(this.rootComponentType, this.environmentInjector).snapshot;
                    return (
                      (this.currentTransition = r =
                        V$1(j$1({}, c), {
                          targetSnapshot: D,
                          urlAfterRedirects: f,
                          extras: V$1(j$1({}, b), { skipLocationChange: false, replaceUrl: false }),
                        })),
                      this.currentNavigation.update((w) => ((w.finalUrl = f), w)),
                      bp$1(r)
                    );
                  } else
                    return (
                      this.events.next(
                        new He(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          '',
                          Un.IgnoredByUrlHandlingStrategy,
                        ),
                      ),
                      c.resolve(false),
                      dt$1
                    );
                }),
                pt$2((c) => {
                  let l = new ri(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot,
                  );
                  return (
                    this.events.next(l),
                    (this.currentTransition = r =
                      V$1(j$1({}, c), {
                        guards: wh(c.targetSnapshot, c.currentSnapshot, this.rootContexts),
                      })),
                    r
                  );
                }),
                xh((c) => this.events.next(c)),
                Kp$1((c) => {
                  if (
                    ((r.guardsResult = c.guardsResult),
                    c.guardsResult && typeof c.guardsResult != 'boolean')
                  )
                    throw mi(this.urlSerializer, c.guardsResult);
                  let l = new ii(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot,
                    !!c.guardsResult,
                  );
                  if ((this.events.next(l), !a())) return dt$1;
                  if (!c.guardsResult)
                    return (this.cancelNavigationTransition(c, '', J.GuardRejected), dt$1);
                  if (c.guards.canActivateChecks.length === 0) return bp$1(c);
                  let u = new si(
                    c.id,
                    this.urlSerializer.serialize(c.extractedUrl),
                    this.urlSerializer.serialize(c.urlAfterRedirects),
                    c.targetSnapshot,
                  );
                  if ((this.events.next(u), !a())) return dt$1;
                  let d = false;
                  return bp$1(c).pipe(
                    af(this.paramsInheritanceStrategy),
                    Xp$1({
                      next: () => {
                        d = true;
                        let h = new oi(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot,
                        );
                        this.events.next(h);
                      },
                      complete: () => {
                        d || this.cancelNavigationTransition(c, '', J.NoDataFromResolver);
                      },
                    }),
                  );
                }),
                mc((c) => {
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
                  return u.length === 0 ? bp$1(c) : Ee$1(Promise.all(u).then(() => c));
                }),
                Kp$1((c) => {
                  let l = vh(e.routeReuseStrategy, c.targetSnapshot, c.currentRouterState);
                  return (
                    (this.currentTransition = r = c = V$1(j$1({}, c), { targetRouterState: l })),
                    this.currentNavigation.update((u) => ((u.targetRouterState = l), u)),
                    bp$1(c)
                  );
                }),
                mc(() => this.afterPreactivation()),
                Kp$1(() => {
                  let { currentSnapshot: c, targetSnapshot: l } = r,
                    u = this.createViewTransition?.(this.environmentInjector, c.root, l.root);
                  return u ? Ee$1(u).pipe(pt$2(() => r)) : bp$1(r);
                }),
                Ii$1(1),
                Kp$1((c) => {
                  ((i = false), this.events.next(new Ht()));
                  let l = r.beforeActivateHandler.deferredHandle;
                  return l ? Ee$1(l.then(() => c)) : bp$1(c);
                }),
                Xp$1((c) => {
                  (new no(
                    e.routeReuseStrategy,
                    r.targetRouterState,
                    r.currentRouterState,
                    (l) => this.events.next(l),
                    this.inputBindingEnabled,
                  ).activate(this.rootContexts),
                    a() &&
                      ((s = true),
                      this.currentNavigation.update((l) => ((l.abort = hf), l)),
                      this.lastSuccessfulNavigation.set(ne$1(this.currentNavigation)),
                      this.events.next(
                        new ze(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                        ),
                      ),
                      this.titleStrategy?.updateTitle(c.targetRouterState.snapshot),
                      c.resolve(true)));
                }),
                Jp$1(
                  Hc(o.signal).pipe(
                    Dn(() => !s && i),
                    Xp$1(() => {
                      this.cancelNavigationTransition(r, o.signal.reason + '', J.Aborted);
                    }),
                  ),
                ),
                Xp$1({
                  complete: () => {
                    s = true;
                  },
                }),
                Jp$1(
                  this.transitionAbortWithErrorSubject.pipe(
                    Xp$1((c) => {
                      throw c;
                    }),
                  ),
                ),
                Wp$1(() => {
                  (o.abort(),
                    s || this.cancelNavigationTransition(r, '', J.SupersededByNewNavigation),
                    this.currentTransition?.id === r.id &&
                      (this.currentNavigation.set(null), (this.currentTransition = null)));
                }),
                Rc$1((c) => {
                  if (((s = true), this.destroyed)) return (r.resolve(false), dt$1);
                  if ($c(c))
                    (this.events.next(
                      new me(
                        r.id,
                        this.urlSerializer.serialize(r.extractedUrl),
                        c.message,
                        c.cancellationCode,
                      ),
                    ),
                      _h(c)
                        ? this.events.next(new Vt(c.url, c.navigationBehaviorOptions))
                        : r.resolve(false));
                  else {
                    let l = new vt(
                      r.id,
                      this.urlSerializer.serialize(r.extractedUrl),
                      c,
                      r.targetSnapshot ?? void 0,
                    );
                    try {
                      let u = Qr$1(this.environmentInjector, () =>
                        this.navigationErrorHandler?.(l),
                      );
                      if (u instanceof Gt) {
                        let { message: d, cancellationCode: h } = mi(this.urlSerializer, u);
                        (this.events.next(
                          new me(r.id, this.urlSerializer.serialize(r.extractedUrl), d, h),
                        ),
                          this.events.next(new Vt(u.redirectTo, u.navigationBehaviorOptions)));
                      } else throw (this.events.next(l), c);
                    } catch (u) {
                      this.options.resolveNavigationPromiseOnError ? r.resolve(false) : r.reject(u);
                    }
                  }
                  return dt$1;
                }),
              );
            }),
          )
        );
      }
      cancelNavigationTransition(e, r, i) {
        let s = new me(e.id, this.urlSerializer.serialize(e.extractedUrl), r, i);
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
          r = ne$1(this.currentNavigation),
          i = r?.targetBrowserUrl ?? r?.extractedUrl;
        return e.toString() !== i?.toString() && !r?.extras.skipLocationChange;
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
function ff(n) {
  return n !== Nn;
}
var rl = new N('');
var il = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: () => E$1(pf) });
    }
    return n;
  })(),
  vi = class {
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
  pf = (() => {
    class n extends vi {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  po = (() => {
    class n {
      urlSerializer = E$1(Gn);
      options = E$1(Jn, { optional: true }) || {};
      canceledNavigationResolution = this.options.canceledNavigationResolution || 'replace';
      location = E$1(Lt);
      urlHandlingStrategy = E$1(yi);
      urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
      currentUrlTree = new ge();
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
        return o instanceof ge ? this.urlSerializer.serialize(o) : o;
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
      routerState = Mc(null, E$1(re));
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
      static ɵprov = Kn$1({ token: n, factory: () => E$1(mf) });
    }
    return n;
  })(),
  mf = (() => {
    class n extends po {
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
        e instanceof gt
          ? this.updateStateMemento()
          : e instanceof He
            ? this.commitTransition(r)
            : e instanceof jn
              ? this.urlUpdateStrategy === 'eager' &&
                (r.extras.skipLocationChange || this.setBrowserUrl(this.createBrowserPath(r), r))
              : e instanceof Ht
                ? (this.commitTransition(r),
                  this.urlUpdateStrategy === 'deferred' &&
                    !r.extras.skipLocationChange &&
                    this.setBrowserUrl(this.createBrowserPath(r), r))
                : e instanceof me && !Pc(e)
                  ? this.restoreHistory(r)
                  : e instanceof vt
                    ? this.restoreHistory(r, true)
                    : e instanceof ze &&
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
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
function mo(n, t) {
  n.events
    .pipe(
      Dn((e) => e instanceof ze || e instanceof me || e instanceof vt || e instanceof He),
      pt$2((e) =>
        e instanceof ze || e instanceof He
          ? 0
          : (
                e instanceof me
                  ? e.code === J.Redirect || e.code === J.SupersededByNewNavigation
                  : false
              )
            ? 2
            : 1,
      ),
      Dn((e) => e !== 2),
      Ii$1(1),
    )
    .subscribe(() => {
      t();
    });
}
var _i = (() => {
  class n {
    get currentUrlTree() {
      return this.stateManager.getCurrentUrlTree();
    }
    get rawUrlTree() {
      return this.stateManager.getRawUrlTree();
    }
    disposed = false;
    nonRouterCurrentEntryChangeSubscription;
    console = E$1(Vv);
    stateManager = E$1(po);
    options = E$1(Jn, { optional: true }) || {};
    pendingTasks = E$1(Mt);
    urlUpdateStrategy = this.options.urlUpdateStrategy || 'deferred';
    navigationTransitions = E$1(nl);
    urlSerializer = E$1(Gn);
    location = E$1(Lt);
    urlHandlingStrategy = E$1(yi);
    injector = E$1(re);
    _events = new J$1();
    get events() {
      return this._events;
    }
    get routerState() {
      return this.stateManager.getRouterState();
    }
    navigated = false;
    routeReuseStrategy = E$1(il);
    injectorCleanup = E$1(rl, { optional: true });
    onSameUrlNavigation = this.options.onSameUrlNavigation || 'ignore';
    config = E$1(Yn, { optional: true })?.flat() ?? [];
    componentInputBindingEnabled = !!E$1(Wn, { optional: true });
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
            s = ne$1(this.navigationTransitions.currentNavigation);
          if (i !== null && s !== null) {
            if (
              (this.stateManager.handleRouterEvent(r, s),
              r instanceof me && r.code !== J.Redirect && r.code !== J.SupersededByNewNavigation)
            )
              this.navigated = !0;
            else if (r instanceof ze)
              ((this.navigated = !0),
                this.injectorCleanup?.(this.routeReuseStrategy, this.routerState, this.config));
            else if (r instanceof Vt) {
              let o = r.navigationBehaviorOptions,
                a = this.urlHandlingStrategy.merge(r.url, i.currentRawUrl),
                c = j$1(
                  {
                    scroll: i.extras.scroll,
                    browserUrl: i.extras.browserUrl,
                    info: i.extras.info,
                    skipLocationChange: i.extras.skipLocationChange,
                    replaceUrl:
                      i.extras.replaceUrl || this.urlUpdateStrategy === 'eager' || ff(i.source),
                  },
                  o,
                );
              this.scheduleNavigation(a, Nn, null, c, {
                resolve: i.resolve,
                reject: i.reject,
                promise: i.promise,
              });
            }
          }
          ph(r) && this._events.next(r);
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
            Nn,
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
      if ((i?.ɵrouterUrl && (s = V$1(j$1({}, s), { browserUrl: e })), i)) {
        let l = j$1({}, i);
        (delete l.navigationId,
          delete l.ɵrouterPageId,
          delete l.ɵrouterUrl,
          Object.keys(l).length !== 0 && (s.state = l));
      }
      let c = this.parseUrl(a);
      this.scheduleNavigation(c, r, o, s).catch((l) => {
        this.disposed || this.injector.get(tt)(l);
      });
    }
    get url() {
      return this.serializeUrl(this.currentUrlTree);
    }
    getCurrentNavigation() {
      return ne$1(this.navigationTransitions.currentNavigation);
    }
    get lastSuccessfulNavigation() {
      return this.navigationTransitions.lastSuccessfulNavigation;
    }
    resetConfig(e) {
      ((this.config = e.map(ho)), (this.navigated = false));
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
        d = Ic(h);
      } catch {
        ((typeof e[0] != 'string' || e[0][0] !== '/') && (e = []), (d = this.currentUrlTree.root));
      }
      return kc(d, e, u, l ?? null, this.urlSerializer);
    }
    navigateByUrl(e, r = { skipLocationChange: false }) {
      let i = zt(e) ? e : this.parseUrl(e),
        s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
      return this.scheduleNavigation(s, Nn, null, r);
    }
    navigate(e, r = { skipLocationChange: false }) {
      return (gf(e), this.navigateByUrl(this.createUrlTree(e, r), r));
    }
    serializeUrl(e) {
      return this.urlSerializer.serialize(e);
    }
    parseUrl(e) {
      try {
        return this.urlSerializer.parse(e);
      } catch {
        return (this.console.warn(Fr(4018, false)), this.urlSerializer.parse('/'));
      }
    }
    isActive(e, r) {
      let i;
      if (
        (r === true
          ? (i = j$1({}, _c))
          : r === false
            ? (i = j$1({}, Ks))
            : (i = j$1(j$1({}, Ks), r)),
        zt(e))
      )
        return lc(this.currentUrlTree, e, i);
      let s = this.parseUrl(e);
      return lc(this.currentUrlTree, s, i);
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
        mo(this, () => {
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
    static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
  }
  return n;
})();
function gf(n) {
  for (let t = 0; t < n.length; t++) if (n[t] == null) throw new C(4008, false);
}
var yf = new N('');
function _f(n, ...t) {
  return zr$1([
    { provide: Yn, multi: true, useValue: n },
    { provide: ot, useFactory: wf },
    { provide: lf$1, multi: true, useFactory: Sf },
    t.map((e) => e.ɵproviders),
  ]);
}
function wf() {
  return E$1(_i).routerState.root;
}
function Ef(n, t) {
  return { ɵkind: n, ɵproviders: t };
}
function Sf() {
  let n = E$1(de$1);
  return (t) => {
    let e = n.get(Zo$1);
    if (t !== e.components[0]) return;
    let r = n.get(_i),
      i = n.get(Df);
    (n.get(Tf) === 1 && r.initialNavigation(),
      n.get(Cf, null, { optional: true })?.setUpPreloading(),
      n.get(yf, null, { optional: true })?.init(),
      r.resetRootComponentType(e.componentTypes[0]),
      i.closed || (i.next(), i.complete(), i.unsubscribe()));
  };
}
var Df = new N('', { factory: () => new J$1() }),
  Tf = new N('', { factory: () => 1 });
var Cf = new N('');
function Rf(n = {}) {
  return Ef(8, [{ provide: Wn, useFactory: () => new Uc(n) }]);
}
var ol = ((s) => (
    (s[(s.DEBUG = 0)] = 'DEBUG'),
    (s[(s.INFO = 1)] = 'INFO'),
    (s[(s.WARN = 2)] = 'WARN'),
    (s[(s.ERROR = 3)] = 'ERROR'),
    (s[(s.OFF = 4)] = 'OFF'),
    s
  ))(ol || {}),
  sl = class n {
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
      let s = `[${new Date().toISOString()}] [${ol[t]}] -`;
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
var wi = new WeakMap(),
  Xn = (() => {
    class n {
      _appRef;
      _injector = E$1(de$1);
      _environmentInjector = E$1(re);
      load(e) {
        let r = (this._appRef = this._appRef || this._injector.get(Zo$1)),
          i = wi.get(r);
        (i ||
          ((i = { loaders: new Set(), refs: [] }),
          wi.set(r, i),
          r.onDestroy(() => {
            (wi.get(r)?.refs.forEach((s) => s.destroy()), wi.delete(r));
          })),
          i.loaders.has(e) ||
            (i.loaders.add(e),
            i.refs.push(mO(e, { environmentInjector: this._environmentInjector }))));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
var Ei;
function If() {
  if (Ei === void 0 && ((Ei = null), typeof window < 'u')) {
    let n = window;
    n.trustedTypes !== void 0 &&
      (Ei = n.trustedTypes.createPolicy('angular#components', { createHTML: (t) => t }));
  }
  return Ei;
}
function Yt(n) {
  return If()?.createHTML(n) || n;
}
function al(n) {
  return Error(`Unable to find icon with the name "${n}"`);
}
function kf() {
  return Error(
    'Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.',
  );
}
function cl(n) {
  return Error(
    `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${n}".`,
  );
}
function ll(n) {
  return Error(
    `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${n}".`,
  );
}
var Ve = class {
    url;
    svgText;
    options;
    svgElement = null;
    constructor(t, e, r) {
      ((this.url = t), (this.svgText = e), (this.options = r));
    }
  },
  dl = (() => {
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
        return this._addSvgIconConfig(e, r, new Ve(i, null, s));
      }
      addSvgIconResolver(e) {
        return (this._resolvers.push(e), this);
      }
      addSvgIconLiteralInNamespace(e, r, i, s) {
        let o = this._sanitizer.sanitize(da.HTML, i);
        if (!o) throw ll(i);
        let a = Yt(o);
        return this._addSvgIconConfig(e, r, new Ve('', a, s));
      }
      addSvgIconSet(e, r) {
        return this.addSvgIconSetInNamespace('', e, r);
      }
      addSvgIconSetLiteral(e, r) {
        return this.addSvgIconSetLiteralInNamespace('', e, r);
      }
      addSvgIconSetInNamespace(e, r, i) {
        return this._addSvgIconSetConfig(e, new Ve(r, null, i));
      }
      addSvgIconSetLiteralInNamespace(e, r, i) {
        let s = this._sanitizer.sanitize(da.HTML, r);
        if (!s) throw ll(r);
        let o = Yt(s);
        return this._addSvgIconSetConfig(e, new Ve('', o, i));
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
        let r = this._sanitizer.sanitize(da.RESOURCE_URL, e);
        if (!r) throw cl(e);
        let i = this._cachedIconsByUrl.get(r);
        return i
          ? bp$1(Si(i))
          : this._loadSvgIconFromConfig(new Ve(e, null)).pipe(
              Xp$1((s) => this._cachedIconsByUrl.set(r, s)),
              pt$2((s) => Si(s)),
            );
      }
      getNamedSvgIcon(e, r = '') {
        let i = ul(r, e),
          s = this._svgIconConfigs.get(i);
        if (s) return this._getSvgFromConfig(s);
        if (((s = this._getIconConfigFromResolvers(r, e)), s))
          return (this._svgIconConfigs.set(i, s), this._getSvgFromConfig(s));
        let o = this._iconSetConfigs.get(r);
        return o ? this._getSvgFromIconSetConfigs(e, o) : _p$1(al(i));
      }
      ngOnDestroy() {
        ((this._resolvers = []),
          this._svgIconConfigs.clear(),
          this._iconSetConfigs.clear(),
          this._cachedIconsByUrl.clear());
      }
      _getSvgFromConfig(e) {
        return e.svgText
          ? bp$1(Si(this._svgElementFromConfig(e)))
          : this._loadSvgIconFromConfig(e).pipe(pt$2((r) => Si(r)));
      }
      _getSvgFromIconSetConfigs(e, r) {
        let i = this._extractIconWithNameFromAnySet(e, r);
        if (i) return bp$1(i);
        let s = r
          .filter((o) => !o.svgText)
          .map((o) =>
            this._loadSvgIconSetFromConfig(o).pipe(
              Rc$1((a) => {
                let l = `Loading icon set URL: ${this._sanitizer.sanitize(da.RESOURCE_URL, o.url)} failed: ${a.message}`;
                return (this._errorHandler.handleError(new Error(l)), bp$1(null));
              }),
            ),
          );
        return jp$1(s).pipe(
          pt$2(() => {
            let o = this._extractIconWithNameFromAnySet(e, r);
            if (!o) throw al(e);
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
          Xp$1((r) => (e.svgText = r)),
          pt$2(() => this._svgElementFromConfig(e)),
        );
      }
      _loadSvgIconSetFromConfig(e) {
        return e.svgText ? bp$1(null) : this._fetchIcon(e).pipe(Xp$1((r) => (e.svgText = r)));
      }
      _extractSvgIconFromSet(e, r, i) {
        let s = e.querySelector(`[id="${r}"]`);
        if (!s) return null;
        let o = s.cloneNode(true);
        if ((o.removeAttribute('id'), o.nodeName.toLowerCase() === 'svg'))
          return this._setSvgAttributes(o, i);
        if (o.nodeName.toLowerCase() === 'symbol')
          return this._setSvgAttributes(this._toSvgElement(o), i);
        let a = this._svgElementFromString(Yt('<svg></svg>'));
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
        let r = this._svgElementFromString(Yt('<svg></svg>')),
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
        if (!this._httpClient) throw kf();
        if (r == null) throw Error(`Cannot fetch icon from URL "${r}".`);
        let o = this._sanitizer.sanitize(da.RESOURCE_URL, r);
        if (!o) throw cl(r);
        let a = this._inProgressUrlFetches.get(o);
        if (a) return a;
        let c = this._httpClient.get(o, { responseType: 'text', withCredentials: s }).pipe(
          pt$2((l) => Yt(l)),
          Wp$1(() => this._inProgressUrlFetches.delete(o)),
          Ti$1(),
        );
        return (this._inProgressUrlFetches.set(o, c), c);
      }
      _addSvgIconConfig(e, r, i) {
        return (this._svgIconConfigs.set(ul(e, r), i), this);
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
          if (s) return Of(s) ? new Ve(s.url, null, s.options) : new Ve(s, null);
        }
      }
      static ɵfac = function (r) {
        return new (r || n)(Ie$1(Bs, 8), Ie$1($s), Ie$1(Xt$1, 8), Ie$1(ze$1));
      };
      static ɵprov = ee({ token: n, factory: n.ɵfac, providedIn: 'root' });
    }
    return n;
  })();
function Si(n) {
  return n.cloneNode(true);
}
function ul(n, t) {
  return n + ':' + t;
}
function Of(n) {
  return !!(n.url && n.options);
}
var xf = new N('cdk-dir-doc', { providedIn: 'root', factory: () => E$1(Xt$1) }),
  Pf =
    /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function hl(n) {
  let t = n?.toLowerCase() || '';
  return t === 'auto' && typeof navigator < 'u' && navigator?.language
    ? Pf.test(navigator.language)
      ? 'rtl'
      : 'ltr'
    : t === 'rtl'
      ? 'rtl'
      : 'ltr';
}
var Mf = (() => {
  class n {
    get value() {
      return this.valueSignal();
    }
    valueSignal = _e('ltr');
    change = new xe$1();
    constructor() {
      let e = E$1(xf, { optional: true });
      if (e) {
        let r = e.body ? e.body.dir : null,
          i = e.documentElement ? e.documentElement.dir : null;
        this.valueSignal.set(hl(r || i || 'ltr'));
      }
    }
    ngOnDestroy() {
      this.change.complete();
    }
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
  }
  return n;
})();
var Xt = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵmod = Cv({ type: n });
    static ɵinj = Bc$1({});
  }
  return n;
})();
var Nf = ['*'],
  Lf = new N('MAT_ICON_DEFAULT_OPTIONS'),
  Ff = new N('mat-icon-location', {
    providedIn: 'root',
    factory: () => {
      let n = E$1(Xt$1),
        t = n ? n.location : null;
      return { getPathname: () => (t ? t.pathname + t.search : '') };
    },
  }),
  fl = [
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
  Uf = fl.map((n) => `[${n}]`).join(', '),
  jf = /^url\(['"]?#(.*?)['"]?\)$/,
  nw = (() => {
    class n {
      _elementRef = E$1(Jn$1);
      _iconRegistry = E$1(dl);
      _location = E$1(Ff);
      _errorHandler = E$1(ze$1);
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
        let e = E$1(new qf$1('aria-hidden'), { optional: true }),
          r = E$1(Lf, { optional: true });
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
        let r = e.querySelectorAll(Uf),
          i = (this._elementsWithExternalReferences =
            this._elementsWithExternalReferences || new Map());
        for (let s = 0; s < r.length; s++)
          fl.forEach((o) => {
            let a = r[s],
              c = a.getAttribute(o),
              l = c ? c.match(jf) : null;
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
              .pipe(Ii$1(1))
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
      static ɵcmp = Tv({
        type: n,
        selectors: [['mat-icon']],
        hostAttrs: ['role', 'img', 1, 'mat-icon', 'notranslate'],
        hostVars: 10,
        hostBindings: function (r, i) {
          r & 2 &&
            (df$1('data-mat-icon-type', i._usingFontIcon() ? 'font' : 'svg')(
              'data-mat-icon-name',
              i._svgName || i.fontIcon,
            )('data-mat-icon-namespace', i._svgNamespace || i.fontSet)(
              'fontIcon',
              i._usingFontIcon() ? i.fontIcon : null,
            ),
            fE(i.color ? 'mat-' + i.color : ''),
            _f$1('mat-icon-inline', i.inline)(
              'mat-icon-no-color',
              i.color !== 'primary' && i.color !== 'accent' && i.color !== 'warn',
            ));
        },
        inputs: {
          color: 'color',
          inline: [2, 'inline', 'inline', pO],
          svgIcon: 'svgIcon',
          fontSet: 'fontSet',
          fontIcon: 'fontIcon',
        },
        exportAs: ['matIcon'],
        ngContentSelectors: Nf,
        decls: 1,
        vars: 0,
        template: function (r, i) {
          r & 1 && (Zv(), Yv(0));
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
  rw = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵmod = Cv({ type: n });
      static ɵinj = Bc$1({ imports: [Xt] });
    }
    return n;
  })();
function Zn(n) {
  return n.buttons === 0 || n.detail === 0;
}
function Qn(n) {
  let t = (n.touches && n.touches[0]) || (n.changedTouches && n.changedTouches[0]);
  return (
    !!t &&
    t.identifier === -1 &&
    (t.radiusX == null || t.radiusX === 1) &&
    (t.radiusY == null || t.radiusY === 1)
  );
}
var go;
function pl() {
  if (go == null) {
    let n = typeof document < 'u' ? document.head : null;
    go = !!(n && (n.createShadowRoot || n.attachShadow));
  }
  return go;
}
function vo(n) {
  if (pl()) {
    let t = n.getRootNode ? n.getRootNode() : null;
    if (typeof ShadowRoot < 'u' && ShadowRoot && t instanceof ShadowRoot) return t;
  }
  return null;
}
function Se(n) {
  return n.composedPath ? n.composedPath()[0] : n.target;
}
var bo;
try {
  bo = typeof Intl < 'u' && Intl.v8BreakIterator;
} catch {
  bo = false;
}
var Ae = (() => {
  class n {
    _platformId = E$1(Rh$1);
    isBrowser = this._platformId ? Va(this._platformId) : typeof document == 'object' && !!document;
    EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
    TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
    BLINK =
      this.isBrowser && !!(window.chrome || bo) && typeof CSS < 'u' && !this.EDGE && !this.TRIDENT;
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
    static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
  }
  return n;
})();
var er;
function ml() {
  if (er == null && typeof window < 'u')
    try {
      window.addEventListener(
        'test',
        null,
        Object.defineProperty({}, 'passive', { get: () => (er = !0) }),
      );
    } finally {
      er = er || false;
    }
  return er;
}
function Zt(n) {
  return ml() ? n : !!n.capture;
}
function at$1(n) {
  return n instanceof Jn$1 ? n.nativeElement : n;
}
var gl = new N('cdk-input-modality-detector-options'),
  vl = { ignoreKeys: [18, 17, 224, 91, 16] },
  bl = 650,
  yo = { passive: true, capture: true },
  yl = (() => {
    class n {
      _platform = E$1(Ae);
      _listenerCleanups;
      modalityDetected;
      modalityChanged;
      get mostRecentModality() {
        return this._modality.value;
      }
      _mostRecentTarget = null;
      _modality = new En(null);
      _options;
      _lastTouchMs = 0;
      _onKeydown = (e) => {
        this._options?.ignoreKeys?.some((r) => r === e.keyCode) ||
          (this._modality.next('keyboard'), (this._mostRecentTarget = Se(e)));
      };
      _onMousedown = (e) => {
        Date.now() - this._lastTouchMs < bl ||
          (this._modality.next(Zn(e) ? 'keyboard' : 'mouse'), (this._mostRecentTarget = Se(e)));
      };
      _onTouchstart = (e) => {
        if (Qn(e)) {
          this._modality.next('keyboard');
          return;
        }
        ((this._lastTouchMs = Date.now()),
          this._modality.next('touch'),
          (this._mostRecentTarget = Se(e)));
      };
      constructor() {
        let e = E$1(De$1),
          r = E$1(Xt$1),
          i = E$1(gl, { optional: true });
        if (
          ((this._options = j$1(j$1({}, vl), i)),
          (this.modalityDetected = this._modality.pipe(Zp$1(1))),
          (this.modalityChanged = this.modalityDetected.pipe(Bp$1())),
          this._platform.isBrowser)
        ) {
          let s = E$1(zn$1).createRenderer(null, null);
          this._listenerCleanups = e.runOutsideAngular(() => [
            s.listen(r, 'keydown', this._onKeydown, yo),
            s.listen(r, 'mousedown', this._onMousedown, yo),
            s.listen(r, 'touchstart', this._onTouchstart, yo),
          ]);
        }
      }
      ngOnDestroy() {
        (this._modality.complete(), this._listenerCleanups?.forEach((e) => e()));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })(),
  tr = (function (n) {
    return ((n[(n.IMMEDIATE = 0)] = 'IMMEDIATE'), (n[(n.EVENTUAL = 1)] = 'EVENTUAL'), n);
  })(tr || {}),
  _l = new N('cdk-focus-monitor-default-options'),
  Di = Zt({ passive: true, capture: true }),
  _o = (() => {
    class n {
      _ngZone = E$1(De$1);
      _platform = E$1(Ae);
      _inputModalityDetector = E$1(yl);
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
      _document = E$1(Xt$1);
      _stopInputModalityDetector = new J$1();
      constructor() {
        let e = E$1(_l, { optional: true });
        this._detectionMode = e?.detectionMode || tr.IMMEDIATE;
      }
      _rootNodeFocusAndBlurListener = (e) => {
        let r = Se(e);
        for (let i = r; i; i = i.parentElement)
          e.type === 'focus' ? this._onFocus(e, i) : this._onBlur(e, i);
      };
      monitor(e, r = false) {
        let i = at$1(e);
        if (!this._platform.isBrowser || i.nodeType !== 1) return bp$1();
        let s = vo(i) || this._document,
          o = this._elementInfo.get(i);
        if (o) return (r && (o.checkChildren = true), o.subject);
        let a = { checkChildren: r, subject: new J$1(), rootNode: s };
        return (this._elementInfo.set(i, a), this._registerGlobalListeners(a), a.subject);
      }
      stopMonitoring(e) {
        let r = at$1(e),
          i = this._elementInfo.get(r);
        i &&
          (i.subject.complete(),
          this._setClasses(r),
          this._elementInfo.delete(r),
          this._removeGlobalListeners(i));
      }
      focusVia(e, r, i) {
        let s = at$1(e),
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
          this._detectionMode === tr.EVENTUAL ||
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
            this._detectionMode === tr.IMMEDIATE)
          ) {
            clearTimeout(this._originTimeoutId);
            let i = this._originFromTouchInteraction ? bl : 1;
            this._originTimeoutId = setTimeout(() => (this._origin = null), i);
          }
        });
      }
      _onFocus(e, r) {
        let i = this._elementInfo.get(r),
          s = Se(e);
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
            (r.addEventListener('focus', this._rootNodeFocusAndBlurListener, Di),
              r.addEventListener('blur', this._rootNodeFocusAndBlurListener, Di));
          }),
          this._rootNodeFocusListenerCount.set(r, i + 1),
          ++this._monitoredElementCount === 1 &&
            (this._ngZone.runOutsideAngular(() => {
              this._getWindow().addEventListener('focus', this._windowFocusListener);
            }),
            this._inputModalityDetector.modalityDetected
              .pipe(Jp$1(this._stopInputModalityDetector))
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
            : (r.removeEventListener('focus', this._rootNodeFocusAndBlurListener, Di),
              r.removeEventListener('blur', this._rootNodeFocusAndBlurListener, Di),
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
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
var wl = new Set(),
  yt,
  wo = (() => {
    class n {
      _platform = E$1(Ae);
      _nonce = E$1(Ph$1, { optional: true });
      _matchMedia;
      constructor() {
        this._matchMedia =
          this._platform.isBrowser && window.matchMedia ? window.matchMedia.bind(window) : $f;
      }
      matchMedia(e) {
        return (
          (this._platform.WEBKIT || this._platform.BLINK) && Bf(e, this._nonce),
          this._matchMedia(e)
        );
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
function Bf(n, t) {
  if (!wl.has(n))
    try {
      (yt ||
        ((yt = document.createElement('style')),
        t && yt.setAttribute('nonce', t),
        yt.setAttribute('type', 'text/css'),
        document.head.appendChild(yt)),
        yt.sheet && (yt.sheet.insertRule(`@media ${n} {body{ }}`, 0), wl.add(n)));
    } catch (e) {
      console.error(e);
    }
}
function $f(n) {
  return {
    matches: n === 'all' || n === '',
    media: n,
    addListener: () => {},
    removeListener: () => {},
  };
}
var zf = (() => {
  class n {
    create(e) {
      return typeof MutationObserver > 'u' ? null : new MutationObserver(e);
    }
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
  }
  return n;
})();
var Lw = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵmod = Cv({ type: n });
    static ɵinj = Bc$1({ providers: [zf] });
  }
  return n;
})();
function Uw(n, ...t) {
  return t.length ? t.some((e) => n[e]) : n.altKey || n.shiftKey || n.ctrlKey || n.metaKey;
}
var Eo = {},
  So = class n {
    _appId = E$1(Ds$1);
    static _infix = `a${Math.floor(Math.random() * 1e5).toString()}`;
    getId(t, e = false) {
      return (
        this._appId !== 'ng' && (t += this._appId),
        Eo.hasOwnProperty(t) || (Eo[t] = 0),
        `${t}${e ? n._infix + '-' : ''}${Eo[t]++}`
      );
    }
    static ɵfac = function (e) {
      return new (e || n)();
    };
    static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
  };
var Qt,
  El = [
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
function Jw() {
  if (Qt) return Qt;
  if (typeof document != 'object' || !document) return ((Qt = new Set(El)), Qt);
  let n = document.createElement('input');
  return ((Qt = new Set(El.filter((t) => (n.setAttribute('type', t), n.type === t)))), Qt);
}
var Hf = new N('MATERIAL_ANIMATIONS'),
  Sl = null;
function Vf() {
  return E$1(Hf, { optional: true })?.animationsDisabled ||
    E$1(Oh$1, { optional: true }) === 'NoopAnimations'
    ? 'di-disabled'
    : ((Sl ??= E$1(wo).matchMedia('(prefers-reduced-motion)').matches),
      Sl ? 'reduced-motion' : 'enabled');
}
function en() {
  return Vf() !== 'enabled';
}
function c0(n) {
  return n != null && `${n}` != 'false';
}
var ve = (function (n) {
    return (
      (n[(n.FADING_IN = 0)] = 'FADING_IN'),
      (n[(n.VISIBLE = 1)] = 'VISIBLE'),
      (n[(n.FADING_OUT = 2)] = 'FADING_OUT'),
      (n[(n.HIDDEN = 3)] = 'HIDDEN'),
      n
    );
  })(ve || {}),
  Do = class {
    _renderer;
    element;
    config;
    _animationForciblyDisabledThroughCss;
    state = ve.HIDDEN;
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
  Dl = Zt({ passive: true, capture: true }),
  To = class {
    _events = new Map();
    addHandler(t, e, r, i) {
      let s = this._events.get(e);
      if (s) {
        let o = s.get(r);
        o ? o.add(i) : s.set(r, new Set([i]));
      } else
        (this._events.set(e, new Map([[r, new Set([i])]])),
          t.runOutsideAngular(() => {
            document.addEventListener(e, this._delegateEventHandler, Dl);
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
          document.removeEventListener(t, this._delegateEventHandler, Dl)));
    }
    _delegateEventHandler = (t) => {
      let e = Se(t);
      e &&
        this._events.get(t.type)?.forEach((r, i) => {
          (i === e || i.contains(e)) && r.forEach((s) => s.handleEvent(t));
        });
    };
  },
  nr = { enterDuration: 225, exitDuration: 150 },
  qf = 800,
  Tl = Zt({ passive: true, capture: true }),
  Cl = ['mousedown', 'touchstart'],
  Rl = ['mouseup', 'mouseleave', 'touchend', 'touchcancel'],
  Gf = (() => {
    class n {
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵcmp = Tv({
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
  rr = class n {
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
    static _eventManager = new To();
    constructor(t, e, r, i, s) {
      ((this._target = t),
        (this._ngZone = e),
        (this._platform = i),
        i.isBrowser && (this._containerElement = at$1(r)),
        s && s.get(Xn).load(Gf));
    }
    fadeInRipple(t, e, r = {}) {
      let i = (this._containerRect =
          this._containerRect || this._containerElement.getBoundingClientRect()),
        s = j$1(j$1({}, nr), r.animation);
      r.centered && ((t = i.left + i.width / 2), (e = i.top + i.height / 2));
      let o = r.radius || Wf(t, e, i),
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
        g = new Do(this, u, r, p);
      ((u.style.transform = 'scale3d(1, 1, 1)'),
        (g.state = ve.FADING_IN),
        r.persistent || (this._mostRecentTransientRipple = g));
      let b = null;
      return (
        !p &&
          (l || s.exitDuration) &&
          this._ngZone.runOutsideAngular(() => {
            let v = () => {
                (b && (b.fallbackTimer = null), clearTimeout(w), this._finishRippleTransition(g));
              },
              D = () => this._destroyRipple(g),
              w = setTimeout(D, l + 100);
            (u.addEventListener('transitionend', v),
              u.addEventListener('transitioncancel', D),
              (b = { onTransitionEnd: v, onTransitionCancel: D, fallbackTimer: w }));
          }),
        this._activeRipples.set(g, b),
        (p || !l) && this._finishRippleTransition(g),
        g
      );
    }
    fadeOutRipple(t) {
      if (t.state === ve.FADING_OUT || t.state === ve.HIDDEN) return;
      let e = t.element,
        r = j$1(j$1({}, nr), t.config.animation);
      ((e.style.transitionDuration = `${r.exitDuration}ms`),
        (e.style.opacity = '0'),
        (t.state = ve.FADING_OUT),
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
      let e = at$1(t);
      !this._platform.isBrowser ||
        !e ||
        e === this._triggerElement ||
        (this._removeTriggerEvents(),
        (this._triggerElement = e),
        Cl.forEach((r) => {
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
            Rl.forEach((e) => {
              this._triggerElement.addEventListener(e, this, Tl);
            });
          }),
          (this._pointerUpEventsRegistered = true)));
    }
    _finishRippleTransition(t) {
      t.state === ve.FADING_IN
        ? this._startFadeOutTransition(t)
        : t.state === ve.FADING_OUT && this._destroyRipple(t);
    }
    _startFadeOutTransition(t) {
      let e = t === this._mostRecentTransientRipple,
        { persistent: r } = t.config;
      ((t.state = ve.VISIBLE), !r && (!e || !this._isPointerDown) && t.fadeOut());
    }
    _destroyRipple(t) {
      let e = this._activeRipples.get(t) ?? null;
      (this._activeRipples.delete(t),
        this._activeRipples.size || (this._containerRect = null),
        t === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null),
        (t.state = ve.HIDDEN),
        e !== null &&
          (t.element.removeEventListener('transitionend', e.onTransitionEnd),
          t.element.removeEventListener('transitioncancel', e.onTransitionCancel),
          e.fallbackTimer !== null && clearTimeout(e.fallbackTimer)),
        t.element.remove());
    }
    _onMousedown(t) {
      let e = Zn(t),
        r = this._lastTouchStartEvent && Date.now() < this._lastTouchStartEvent + qf;
      !this._target.rippleDisabled &&
        !e &&
        !r &&
        ((this._isPointerDown = true),
        this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
    }
    _onTouchStart(t) {
      if (!this._target.rippleDisabled && !Qn(t)) {
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
            t.state === ve.VISIBLE || (t.config.terminateOnPointerUp && t.state === ve.FADING_IN);
          !t.config.persistent && e && t.fadeOut();
        }));
    }
    _getActiveRipples() {
      return Array.from(this._activeRipples.keys());
    }
    _removeTriggerEvents() {
      let t = this._triggerElement;
      t &&
        (Cl.forEach((e) => n._eventManager.removeHandler(e, t, this)),
        this._pointerUpEventsRegistered &&
          (Rl.forEach((e) => t.removeEventListener(e, this, Tl)),
          (this._pointerUpEventsRegistered = false)));
    }
  };
function Wf(n, t, e) {
  let r = Math.max(Math.abs(n - e.left), Math.abs(n - e.right)),
    i = Math.max(Math.abs(t - e.top), Math.abs(t - e.bottom));
  return Math.sqrt(r * r + i * i);
}
var Co = new N('mat-ripple-global-options'),
  w0 = (() => {
    class n {
      _elementRef = E$1(Jn$1);
      _animationsDisabled = en();
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
        let e = E$1(De$1),
          r = E$1(Ae),
          i = E$1(Co, { optional: true }),
          s = E$1(de$1);
        ((this._globalOptions = i || {}),
          (this._rippleRenderer = new rr(this, e, this._elementRef, r, s)));
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
      static ɵdir = Mv({
        type: n,
        selectors: [
          ['', 'mat-ripple', ''],
          ['', 'matRipple', ''],
        ],
        hostAttrs: [1, 'mat-ripple'],
        hostVars: 2,
        hostBindings: function (r, i) {
          r & 2 && _f$1('mat-ripple-unbounded', i.unbounded);
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
var Kf = { capture: true },
  Jf = ['focus', 'mousedown', 'mouseenter', 'touchstart'],
  Ro = 'mat-ripple-loader-uninitialized',
  Ao = 'mat-ripple-loader-class-name',
  Al = 'mat-ripple-loader-centered',
  Ti = 'mat-ripple-loader-disabled',
  Il = (() => {
    class n {
      _document = E$1(Xt$1);
      _animationsDisabled = en();
      _globalRippleOptions = E$1(Co, { optional: true });
      _platform = E$1(Ae);
      _ngZone = E$1(De$1);
      _injector = E$1(de$1);
      _eventCleanups;
      _hosts = new Map();
      constructor() {
        let e = E$1(zn$1).createRenderer(null, null);
        this._eventCleanups = this._ngZone.runOutsideAngular(() =>
          Jf.map((r) => e.listen(this._document, r, this._onInteraction, Kf)),
        );
      }
      ngOnDestroy() {
        let e = this._hosts.keys();
        for (let r of e) this.destroyRipple(r);
        this._eventCleanups.forEach((r) => r());
      }
      configureRipple(e, r) {
        (e.setAttribute(Ro, this._globalRippleOptions?.namespace ?? ''),
          (r.className || !e.hasAttribute(Ao)) && e.setAttribute(Ao, r.className || ''),
          r.centered && e.setAttribute(Al, ''),
          r.disabled && e.setAttribute(Ti, ''));
      }
      setDisabled(e, r) {
        let i = this._hosts.get(e);
        i
          ? ((i.target.rippleDisabled = r),
            !r &&
              !i.hasSetUpEvents &&
              ((i.hasSetUpEvents = true), i.renderer.setupTriggerEvents(e)))
          : r
            ? e.setAttribute(Ti, '')
            : e.removeAttribute(Ti);
      }
      _onInteraction = (e) => {
        let r = Se(e);
        if (r instanceof HTMLElement) {
          let i = r.closest(`[${Ro}="${this._globalRippleOptions?.namespace ?? ''}"]`);
          i && this._createRipple(i);
        }
      };
      _createRipple(e) {
        if (!this._document || this._hosts.has(e)) return;
        e.querySelector('.mat-ripple')?.remove();
        let r = this._document.createElement('span');
        (r.classList.add('mat-ripple', e.getAttribute(Ao)), e.append(r));
        let i = this._globalRippleOptions,
          s = this._animationsDisabled ? 0 : (i?.animation?.enterDuration ?? nr.enterDuration),
          o = this._animationsDisabled ? 0 : (i?.animation?.exitDuration ?? nr.exitDuration),
          a = {
            rippleDisabled: this._animationsDisabled || i?.disabled || e.hasAttribute(Ti),
            rippleConfig: {
              centered: e.hasAttribute(Al),
              terminateOnPointerUp: i?.terminateOnPointerUp,
              animation: { enterDuration: s, exitDuration: o },
            },
          },
          c = new rr(a, this._ngZone, r, this._platform, this._injector),
          l = !a.rippleDisabled;
        (l && c.setupTriggerEvents(e),
          this._hosts.set(e, { target: a, renderer: c, hasSetUpEvents: l }),
          e.removeAttribute(Ro));
      }
      destroyRipple(e) {
        let r = this._hosts.get(e);
        r && (r.renderer._removeTriggerEvents(), this._hosts.delete(e));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵprov = Kn$1({ token: n, factory: n.ɵfac });
    }
    return n;
  })();
var kl = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵcmp = Tv({
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
var Yf = new N('MAT_BUTTON_CONFIG');
function Ol(n) {
  return n == null ? void 0 : hO(n);
}
var xl = (() => {
  class n {
    _elementRef = E$1(Jn$1);
    _ngZone = E$1(De$1);
    _animationsDisabled = en();
    _config = E$1(Yf, { optional: true });
    _focusMonitor = E$1(_o);
    _cleanupClick;
    _renderer = E$1(Sy);
    _rippleLoader = E$1(Il);
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
    showProgress = aO(false, { transform: pO });
    constructor() {
      E$1(Xn).load(kl);
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
    static ɵdir = Mv({
      type: n,
      hostAttrs: [1, 'mat-mdc-button-base'],
      hostVars: 15,
      hostBindings: function (r, i) {
        r & 2 &&
          (df$1('disabled', i._getDisabledAttribute())('aria-disabled', i._getAriaDisabled())(
            'tabindex',
            i._getTabIndex(),
          ),
          fE(i.color ? 'mat-' + i.color : ''),
          _f$1('mat-mdc-button-progress-indicator-shown', i.showProgress())(
            'mat-mdc-button-disabled',
            i.disabled,
          )('mat-mdc-button-disabled-interactive', i.disabledInteractive)('mat-unthemed', !i.color)(
            '_mat-animation-noopable',
            i._animationsDisabled,
          ));
      },
      inputs: {
        color: 'color',
        disableRipple: [2, 'disableRipple', 'disableRipple', pO],
        disabled: [2, 'disabled', 'disabled', pO],
        ariaDisabled: [2, 'aria-disabled', 'ariaDisabled', pO],
        disabledInteractive: [2, 'disabledInteractive', 'disabledInteractive', pO],
        tabIndex: [2, 'tabIndex', 'tabIndex', Ol],
        _tabindex: [2, 'tabindex', '_tabindex', Ol],
        showProgress: [1, 'showProgress'],
      },
    });
  }
  return n;
})();
var Pl = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵmod = Cv({ type: n });
    static ɵinj = Bc$1({ imports: [Xt] });
  }
  return n;
})();
var Xf = [
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
  Zf = [
    '.material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])',
    '*',
    '.material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]',
    '[progressIndicator]',
  ];
function Qf(n, t) {
  n & 1 && (ja$1(0, 'div', 2), Yv(1, 3), Va$1());
}
var Ml = new Map([
    ['text', ['mat-mdc-button']],
    ['filled', ['mdc-button--unelevated', 'mat-mdc-unelevated-button']],
    ['elevated', ['mdc-button--raised', 'mat-mdc-raised-button']],
    ['outlined', ['mdc-button--outlined', 'mat-mdc-outlined-button']],
    ['tonal', ['mat-tonal-button']],
  ]),
  K0 = (() => {
    class n extends xl {
      get appearance() {
        return this._appearance;
      }
      set appearance(e) {
        this.setAppearance(e || this._config?.defaultAppearance || 'text');
      }
      _appearance = null;
      constructor() {
        super();
        let e = ep(this._elementRef.nativeElement);
        e && this.setAppearance(e);
      }
      setAppearance(e) {
        if (e === this._appearance) return;
        let r = this._elementRef.nativeElement.classList,
          i = this._appearance ? Ml.get(this._appearance) : null,
          s = Ml.get(e);
        (i && r.remove(...i), r.add(...s), (this._appearance = e));
      }
      static ɵfac = function (r) {
        return new (r || n)();
      };
      static ɵcmp = Tv({
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
        features: [of$1],
        ngContentSelectors: Zf,
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
            (Zv(Xf),
            hf$1(0, 'span', 0),
            Yv(1),
            ja$1(2, 'span', 1),
            Yv(3, 1),
            Va$1(),
            Yv(4, 2),
            $v(5, Qf, 2, 0, 'div', 2),
            hf$1(6, 'span', 3)(7, 'span', 4)),
            r & 2 &&
              (_f$1('mdc-button__ripple', !i._isFab)('mdc-fab__ripple', i._isFab),
              Cm$1(5),
              Uv(i.showProgress() ? 5 : -1)));
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
function ep(n) {
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
var J0 = (() => {
  class n {
    static ɵfac = function (r) {
      return new (r || n)();
    };
    static ɵmod = Cv({ type: n });
    static ɵinj = Bc$1({ imports: [Pl, Xt] });
  }
  return n;
})();
var Nl = (n) => (n ? (...t) => n(...t) : (...t) => fetch(...t));
var tn = class extends Error {
    constructor(t, e = 'FunctionsError', r) {
      (super(t), (this.name = e), (this.context = r));
    }
    toJSON() {
      return { name: this.name, message: this.message, context: this.context };
    }
  },
  ir = class extends tn {
    constructor(t) {
      super('Failed to send a request to the Edge Function', 'FunctionsFetchError', t);
    }
  },
  nn = class extends tn {
    constructor(t) {
      super('Relay Error invoking the Edge Function', 'FunctionsRelayError', t);
    }
  },
  rn = class extends tn {
    constructor(t) {
      super('Edge Function returned a non-2xx status code', 'FunctionsHttpError', t);
    }
  },
  Ci = (function (n) {
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
  })(Ci || {});
var sr = class {
  constructor(t, { headers: e = {}, customFetch: r, region: i = Ci.Any } = {}) {
    ((this.url = t), (this.headers = e), (this.region = i), (this.fetch = Nl(r)));
  }
  setAuth(t) {
    this.headers.Authorization = `Bearer ${t}`;
  }
  invoke(t) {
    return Ic$1(this, arguments, void 0, function* (e, r = {}) {
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
        let b = u;
        d &&
          ((o = new AbortController()),
          (s = setTimeout(() => o.abort(), d)),
          u ? ((b = o.signal), u.addEventListener('abort', () => o.abort())) : (b = o.signal));
        let v = yield this.fetch(p.toString(), {
            method: c || 'POST',
            headers: Object.assign(Object.assign(Object.assign({}, h), this.headers), a),
            body: g,
            signal: b,
          }).catch((P) => {
            throw new ir(P);
          }),
          D = v.headers.get('x-relay-error');
        if (D && D === 'true') throw new nn(v);
        if (!v.ok) throw new rn(v);
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
          response: a instanceof rn || a instanceof nn ? a.context : void 0,
        };
      } finally {
        s && clearTimeout(s);
      }
    });
  }
};
var Ll = (n) => Math.min(1e3 * 2 ** n, 3e4),
  tp = [520, 503],
  Bl = ['GET', 'HEAD', 'OPTIONS'],
  Io = class extends Error {
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
function Fl(n, t) {
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
function np(n, t, e, r) {
  return !(!r || e >= 3 || !Bl.includes(n) || !tp.includes(t));
}
var rp = class {
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
              if (d?.name === 'AbortError' || d?.code === 'ABORT_ERR' || !Bl.includes(e.method))
                throw d;
              if (e.retryEnabled && o < 3) {
                let h = Ll(o);
                (o++, await Fl(h, e.signal));
                continue;
              }
              throw d;
            }
            if (np(e.method, u.status, o, e.retryEnabled)) {
              var a, c;
              let d =
                  (a = (c = u.headers) === null || c === void 0 ? void 0 : c.get('Retry-After')) !==
                    null && a !== void 0
                    ? a
                    : null,
                h = d !== null ? Math.max(0, parseInt(d, 10) || 0) * 1e3 : Ll(o);
              (await u.text(), o++, await Fl(h, e.signal));
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
              var b;
              c = (b = o?.stack) !== null && b !== void 0 ? b : '';
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
                  throw new Io({ message: h, details: '', hint: '', code: '' });
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
        if (e && t.shouldThrowOnError) throw new Io(e);
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
  ip = class extends rp {
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
  Ul = new RegExp('[,()]'),
  sn = class extends ip {
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
        .map((r) => (typeof r == 'string' && Ul.test(r) ? `"${r}"` : `${r}`))
        .join(',');
      return (this.url.searchParams.append(n, `in.(${e})`), this);
    }
    notIn(n, t) {
      let e = Array.from(new Set(t))
        .map((r) => (typeof r == 'string' && Ul.test(r) ? `"${r}"` : `${r}`))
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
  sp = class {
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
        new sn({
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
      return new sn({
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
      return new sn({
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
        new sn({
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
        new sn({
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
function or(n) {
  '@babel/helpers - typeof';
  return (
    (or =
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
    or(n)
  );
}
function op(n, t) {
  if (or(n) != 'object' || !n) return n;
  var e = n[Symbol.toPrimitive];
  if (e !== void 0) {
    var r = e.call(n, t);
    if (or(r) != 'object') return r;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (t === 'string' ? String : Number)(n);
}
function ap(n) {
  var t = op(n, 'string');
  return or(t) == 'symbol' ? t : t + '';
}
function cp(n, t, e) {
  return (
    (t = ap(t)) in n
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
function jl(n, t) {
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
function Ri(n) {
  for (var t = 1; t < arguments.length; t++) {
    var e = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? jl(Object(e), true).forEach(function (r) {
          cp(n, r, e[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e))
        : jl(Object(e)).forEach(function (r) {
            Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(e, r));
          });
  }
  return n;
}
var $l = class zl {
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
              c(l, Ri(Ri({}, u), {}, { signal: d.signal })).finally(() => {
                (clearTimeout(h), f.removeEventListener('abort', p));
              })
            );
          }
          return c(l, Ri(Ri({}, u), {}, { signal: d.signal })).finally(() => clearTimeout(h));
        })
      : (this.fetch = c),
      (this.retry = a));
  }
  from(t) {
    if (!t || typeof t != 'string' || t.trim() === '')
      throw new Error('Invalid relation name: relation must be a non-empty string.');
    return new sp(new URL(`${this.url}/${t}`), {
      headers: new Headers(this.headers),
      schema: this.schemaName,
      fetch: this.fetch,
      urlLengthLimit: this.urlLengthLimit,
      retry: this.retry,
    });
  }
  schema(t) {
    return new zl(this.url, {
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
      new sn({
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
var ko = class {
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
  Oo = ko;
var Hl = '2.107.0';
var Vl = `realtime-js/${Hl}`,
  ql = '1.0.0',
  xo = '2.0.0',
  Gl = xo;
var Wl = 1e4;
var Kl = 100;
var Ie = {
    closed: 'closed',
    errored: 'errored',
    joined: 'joined',
    joining: 'joining',
    leaving: 'leaving',
  },
  Ai = {
    close: 'phx_close',
    error: 'phx_error',
    join: 'phx_join',
    leave: 'phx_leave',
    access_token: 'access_token',
  };
var ar = { connecting: 'connecting', closing: 'closing', closed: 'closed' };
var Ii = class {
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
    var b = new Uint8Array(f.byteLength + r.byteLength);
    return (b.set(new Uint8Array(f), 0), b.set(new Uint8Array(r), f.byteLength), b.buffer);
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
  Mo = (n, t, e = {}) => {
    var r;
    let i = (r = e.skipTypes) !== null && r !== void 0 ? r : [];
    return t ? Object.keys(t).reduce((s, o) => ((s[o] = lp(o, n, t, i)), s), {}) : {};
  },
  lp = (n, t, e, r) => {
    let i = t.find((a) => a.name === n),
      s = i?.type,
      o = e[n];
    return s && !r.includes(s) ? Jl(s, o) : Po(o);
  },
  Jl = (n, t) => {
    if (n.charAt(0) === '_') {
      let e = n.slice(1, n.length);
      return fp(t, e);
    }
    switch (n) {
      case j.bool:
        return up(t);
      case j.float4:
      case j.float8:
      case j.int2:
      case j.int4:
      case j.int8:
      case j.numeric:
      case j.oid:
        return dp(t);
      case j.json:
      case j.jsonb:
        return hp(t);
      case j.timestamp:
        return pp(t);
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
        return Po(t);
      default:
        return Po(t);
    }
  },
  Po = (n) => n,
  up = (n) => {
    switch (n) {
      case 't':
        return true;
      case 'f':
        return false;
      default:
        return n;
    }
  },
  dp = (n) => {
    if (typeof n == 'string') {
      let t = parseFloat(n);
      if (!Number.isNaN(t)) return t;
    }
    return n;
  },
  hp = (n) => {
    if (typeof n == 'string')
      try {
        return JSON.parse(n);
      } catch {
        return n;
      }
    return n;
  },
  fp = (n, t) => {
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
      return s.map((a) => Jl(t, a));
    }
    return n;
  },
  pp = (n) => (typeof n == 'string' ? n.replace(' ', 'T') : n),
  ki = (n) => {
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
var lr = (n) =>
    typeof n == 'function'
      ? n
      : function () {
          return n;
        },
  gp = typeof self < 'u' ? self : null,
  an = typeof window < 'u' ? window : null,
  ke = gp || an || globalThis,
  vp = '2.0.0',
  bp = 1e4,
  yp = 1e3,
  Oe = { connecting: 0, open: 1, closing: 2, closed: 3 },
  ne = {
    closed: 'closed',
    errored: 'errored',
    joined: 'joined',
    joining: 'joining',
    leaving: 'leaving',
  },
  qe = {
    close: 'phx_close',
    error: 'phx_error',
    join: 'phx_join',
    reply: 'phx_reply',
    leave: 'phx_leave',
  },
  No = { longpoll: 'longpoll', websocket: 'websocket' },
  _p = { complete: 4 },
  Lo = 'base64url.bearer.phx.',
  Oi = class {
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
  Yl = class {
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
  wp = class {
    constructor(n, t, e) {
      ((this.state = ne.closed),
        (this.topic = n),
        (this.params = lr(t || {})),
        (this.socket = e),
        (this.bindings = []),
        (this.bindingRef = 0),
        (this.timeout = this.socket.timeout),
        (this.joinedOnce = false),
        (this.joinPush = new Oi(this, qe.join, this.params, this.timeout)),
        (this.pushBuffer = []),
        (this.stateChangeRefs = []),
        (this.rejoinTimer = new Yl(() => {
          this.socket.isConnected() && this.rejoin();
        }, this.socket.rejoinAfterMs)),
        this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset())),
        this.stateChangeRefs.push(
          this.socket.onOpen(() => {
            (this.rejoinTimer.reset(), this.isErrored() && this.rejoin());
          }),
        ),
        this.joinPush.receive('ok', () => {
          ((this.state = ne.joined),
            this.rejoinTimer.reset(),
            this.pushBuffer.forEach((r) => r.send()),
            (this.pushBuffer = []));
        }),
        this.joinPush.receive('error', (r) => {
          ((this.state = ne.errored),
            this.socket.hasLogger() && this.socket.log('channel', `error ${this.topic}`, r),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.onClose(() => {
          (this.rejoinTimer.reset(),
            this.socket.hasLogger() && this.socket.log('channel', `close ${this.topic}`),
            (this.state = ne.closed),
            this.socket.remove(this));
        }),
        this.onError((r) => {
          (this.socket.hasLogger() && this.socket.log('channel', `error ${this.topic}`, r),
            this.isJoining() && this.joinPush.reset(),
            (this.state = ne.errored),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.joinPush.receive('timeout', () => {
          (this.socket.hasLogger() &&
            this.socket.log('channel', `timeout ${this.topic}`, this.joinPush.timeout),
            new Oi(this, qe.leave, lr({}), this.timeout).send(),
            (this.state = ne.errored),
            this.joinPush.reset(),
            this.socket.isConnected() && this.rejoinTimer.scheduleTimeout());
        }),
        this.on(qe.reply, (r, i) => {
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
        (this.state = ne.closed),
        (this.bindings = []));
    }
    onClose(n) {
      this.on(qe.close, n);
    }
    onError(n) {
      return this.on(qe.error, (t) => n(t));
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
      let r = new Oi(
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
      (this.rejoinTimer.reset(), this.joinPush.cancelTimeout(), (this.state = ne.leaving));
      let t = () => {
          (this.socket.hasLogger() && this.socket.log('channel', `leave ${this.topic}`),
            this.trigger(qe.close, 'leave'));
        },
        e = new Oi(this, qe.leave, lr({}), n);
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
        (this.state = ne.joining),
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
      return this.state === ne.closed;
    }
    isErrored() {
      return this.state === ne.errored;
    }
    isJoined() {
      return this.state === ne.joined;
    }
    isJoining() {
      return this.state === ne.joining;
    }
    isLeaving() {
      return this.state === ne.leaving;
    }
  },
  Pi = class {
    static request(n, t, e, r, i, s, o) {
      if (ke.XDomainRequest) {
        let a = new ke.XDomainRequest();
        return this.xdomainRequest(a, n, t, r, i, s, o);
      } else if (ke.XMLHttpRequest) {
        let a = new ke.XMLHttpRequest();
        return this.xhrRequest(a, n, t, e, r, i, s, o);
      } else {
        if (ke.fetch && ke.AbortController) return this.fetchRequest(n, t, e, r, i, s, o);
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
        ke
          .fetch(t, a)
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
          if (n.readyState === _p.complete && a) {
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
  Ep = (n) => {
    let t = '',
      e = new Uint8Array(n),
      r = e.byteLength;
    for (let i = 0; i < r; i++) t += String.fromCharCode(e[i]);
    return btoa(t);
  },
  on = class {
    constructor(n, t) {
      (t && t.length === 2 && t[1].startsWith(Lo) && (this.authToken = atob(t[1].slice(Lo.length))),
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
        (this.readyState = Oe.connecting),
        setTimeout(() => this.poll(), 0));
    }
    normalizeEndpoint(n) {
      return n
        .replace('ws://', 'http://')
        .replace('wss://', 'https://')
        .replace(new RegExp('(.*)/' + No.websocket), '$1/' + No.longpoll);
    }
    endpointURL() {
      return Pi.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(n, t, e) {
      (this.close(n, t, e), (this.readyState = Oe.connecting));
    }
    ontimeout() {
      (this.onerror('timeout'), this.closeAndRetry(1005, 'timeout', false));
    }
    isActive() {
      return this.readyState === Oe.open || this.readyState === Oe.connecting;
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
                ((this.readyState = Oe.open), this.onopen({}), this.poll());
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
      (typeof n != 'string' && (n = Ep(n)),
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
      this.readyState = Oe.closed;
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
      ((s = Pi.request(n, this.endpointURL(), t, e, this.timeout, o, (a) => {
        (this.reqs.delete(s), this.isActive() && i(a));
      })),
        this.reqs.add(s));
    }
  },
  Xl = class cr {
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
            (this.state = cr.syncState(this.state, i, s, o)),
            this.pendingDiffs.forEach((c) => {
              this.state = cr.syncDiff(this.state, c, s, o);
            }),
            (this.pendingDiffs = []),
            a());
        }),
        this.channel.on(r.diff, (i) => {
          let { onJoin: s, onLeave: o, onSync: a } = this.caller;
          this.inPendingSyncState()
            ? this.pendingDiffs.push(i)
            : ((this.state = cr.syncDiff(this.state, i, s, o)), a());
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
      return cr.list(this.state, t);
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
  xi = {
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
      return { join_ref: c, ref: l, topic: u, event: qe.reply, payload: f };
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
  Zl = class {
    constructor(n, t = {}) {
      ((this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] }),
        (this.channels = []),
        (this.sendBuffer = []),
        (this.ref = 0),
        (this.fallbackRef = null),
        (this.timeout = t.timeout || bp),
        (this.transport = t.transport || ke.WebSocket || on),
        (this.conn = void 0),
        (this.primaryPassedHealthCheck = false),
        (this.longPollFallbackMs = t.longPollFallbackMs),
        (this.fallbackTimer = null));
      let e = null;
      try {
        e = ke && ke.sessionStorage;
      } catch {}
      ((this.sessionStore = t.sessionStorage || e),
        (this.establishedConnections = 0),
        (this.defaultEncoder = xi.encode.bind(xi)),
        (this.defaultDecoder = xi.decode.bind(xi)),
        (this.closeWasClean = true),
        (this.disconnecting = false),
        (this.binaryType = t.binaryType || 'arraybuffer'),
        (this.connectClock = 1),
        (this.pageHidden = false),
        (this.encode = void 0),
        (this.decode = void 0),
        this.transport !== on
          ? ((this.encode = t.encode || this.defaultEncoder),
            (this.decode = t.decode || this.defaultDecoder))
          : ((this.encode = this.defaultEncoder), (this.decode = this.defaultDecoder)));
      let r = null;
      (an &&
        an.addEventListener &&
        (an.addEventListener('pagehide', (i) => {
          this.conn && (this.disconnect(), (r = this.connectClock));
        }),
        an.addEventListener('pageshow', (i) => {
          r === this.connectClock && ((r = null), this.connect());
        }),
        an.addEventListener('visibilitychange', () => {
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
        (this.params = lr(t.params || {})),
        (this.endPoint = `${n}/${No.websocket}`),
        (this.vsn = t.vsn || vp),
        (this.heartbeatTimeoutTimer = null),
        (this.heartbeatTimer = null),
        (this.heartbeatSentAt = null),
        (this.pendingHeartbeatRef = null),
        (this.reconnectTimer = new Yl(() => {
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
      return on;
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
      let n = Pi.appendParams(Pi.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
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
        (this.params = lr(n))),
        !(this.conn && !this.disconnecting) &&
          (this.longPollFallbackMs && this.transport !== on
            ? this.connectWithFallback(on, this.longPollFallbackMs)
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
      return n === on ? 'LongPoll' : n.name;
    }
    transportConnect() {
      (this.connectClock++, (this.closeWasClean = false));
      let n;
      (this.authToken && (n = ['phoenix', `${Lo}${btoa(this.authToken).replace(/=/g, '')}`]),
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
          this.teardown(() => this.reconnectTimer.scheduleTimeout(), yp, 'heartbeat timeout'));
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
      if (e === 5 || n.readyState === Oe.closed) {
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
        t.isErrored() || t.isLeaving() || t.isClosed() || t.trigger(qe.error, n);
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case Oe.connecting:
          return 'connecting';
        case Oe.open:
          return 'open';
        case Oe.closing:
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
      let e = new wp(n, t, this);
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
var Ni = class n {
  constructor(t, e) {
    let r = Dp(e);
    ((this.presence = new Xl(t.getChannel(), r)),
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
      (t = Sp(t)),
      Object.getOwnPropertyNames(t).reduce((e, r) => {
        let i = t[r];
        return ((e[r] = Mi(i)), e);
      }, {})
    );
  }
  static onJoinPayload(t, e, r) {
    let i = Ql(e),
      s = Mi(r);
    return { event: 'join', key: t, currentPresences: i, newPresences: s };
  }
  static onLeavePayload(t, e, r) {
    let i = Ql(e),
      s = Mi(r);
    return { event: 'leave', key: t, currentPresences: i, leftPresences: s };
  }
};
function Mi(n) {
  return n.metas.map(
    (t) => ((t.presence_ref = t.phx_ref), delete t.phx_ref, delete t.phx_ref_prev, t),
  );
}
function Sp(n) {
  return JSON.parse(JSON.stringify(n));
}
function Dp(n) {
  return n?.events && { events: n.events };
}
function Ql(n) {
  return n?.metas ? Mi(n) : [];
}
var ur = class {
  get state() {
    return this.presenceAdapter.state;
  }
  constructor(t, e) {
    ((this.channel = t), (this.presenceAdapter = new Ni(this.channel.channelAdapter, e)));
  }
};
function eu(n) {
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
var Li = class {
  constructor(t, e, r) {
    let i = Tp(r);
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
    if (this.channel.pushBuffer.length > Kl) {
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
    return this.socket.isConnected() && this.state === Ie.joined;
  }
  isJoined() {
    return this.state === Ie.joined;
  }
  isJoining() {
    return this.state === Ie.joining;
  }
  isClosed() {
    return this.state === Ie.closed;
  }
  isLeaving() {
    return this.state === Ie.leaving;
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
function Tp(n) {
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
var cn = (function (n) {
    return (
      (n.BROADCAST = 'broadcast'),
      (n.PRESENCE = 'presence'),
      (n.POSTGRES_CHANGES = 'postgres_changes'),
      (n.SYSTEM = 'system'),
      n
    );
  })(cn || {}),
  Ge = (function (n) {
    return (
      (n.SUBSCRIBED = 'SUBSCRIBED'),
      (n.TIMED_OUT = 'TIMED_OUT'),
      (n.CLOSED = 'CLOSED'),
      (n.CHANNEL_ERROR = 'CHANNEL_ERROR'),
      n
    );
  })(Ge || {});
var dr = class n {
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
      (this.channelAdapter = new Li(this.socket.socketAdapter, t, this.params)),
      (this.presence = new ur(this)),
      this._onClose(() => {
        this.socket._remove(this);
      }),
      this._updateFilterTransform(),
      (this.broadcastEndpointURL = ki(this.socket.socketAdapter.endPointURL())),
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
          (!!this.bindings[cn.PRESENCE] && this.bindings[cn.PRESENCE].length > 0) ||
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
          t?.(Ge.CHANNEL_ERROR, eu(f));
        }),
        this._onClose(() => t?.(Ge.CLOSED)),
        this.updateJoinPayload(Object.assign({ config: h }, d)),
        this._updateFilterMessage(),
        this.channelAdapter
          .subscribe(e)
          .receive('ok', async ({ postgres_changes: f }) => {
            if ((this.socket._isManualToken() || this.socket.setAuth(), f === void 0)) {
              t?.(Ge.SUBSCRIBED);
              return;
            }
            this._updatePostgresBindings(f, t);
          })
          .receive('error', (f) => {
            this.state = Ie.errored;
            let p = Object.values(f).join(', ') || 'error';
            t?.(Ge.CHANNEL_ERROR, new Error(p, { cause: f }));
          })
          .receive('timeout', () => {
            t?.(Ge.TIMED_OUT);
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
          (this.state = Ie.errored),
          e?.(
            Ge.CHANNEL_ERROR,
            new Error('mismatch between server and client bindings for postgres changes'),
          ));
        return;
      }
    }
    ((this.bindings.postgres_changes = o), this.state != Ie.errored && e && e(Ge.SUBSCRIBED));
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
      s = t === cn.PRESENCE || t === cn.POSTGRES_CHANGES;
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
    let { close: r, error: i, leave: s, join: o } = Ai;
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
      (t.type === 'INSERT' || t.type === 'UPDATE') && (e.new = Mo(t.columns, t.record)),
      (t.type === 'UPDATE' || t.type === 'DELETE') && (e.old = Mo(t.columns, t.old_record)),
      e
    );
  }
};
var Fi = class {
  constructor(t, e) {
    this.socket = new Zl(t, e);
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
    return this.socket.connectionState() == ar.connecting;
  }
  isDisconnecting() {
    return this.socket.connectionState() == ar.closing;
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
var tu = { HEARTBEAT_INTERVAL: 25e3 },
  Cp = [1e3, 2e3, 5e3, 1e4],
  Rp = 1e4;
function Ap() {
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
function Ip() {
  try {
    if (typeof globalThis < 'u' && globalThis.sessionStorage) return globalThis.sessionStorage;
  } catch {}
  return Ap();
}
var kp = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`,
  hr = class {
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
        (this.serializer = new Ii()),
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
      ((this.socketAdapter = new Fi(t, i)),
        (this.httpEndpoint = ki(t)),
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
      return this.socketAdapter.connectionState() || ar.closed;
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
        let s = new dr(`realtime:${t}`, e, this);
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
            let s = { access_token: e, version: Vl };
            (e && i.updateJoinPayload(s),
              i.joinedOnce &&
                i.channelAdapter.isJoined() &&
                i.channelAdapter.push(Ai.access_token, { access_token: e }));
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
        let r = new Blob([kp], { type: 'application/javascript' });
        e = URL.createObjectURL(r);
      }
      return e;
    }
    _initializeOptions(t) {
      var e, r, i, s, o, a, c, l, u, d, h, f;
      ((this.worker = (e = t?.worker) !== null && e !== void 0 ? e : false),
        (this.accessToken = (r = t?.accessToken) !== null && r !== void 0 ? r : null));
      let p = {};
      ((p.timeout = (i = t?.timeout) !== null && i !== void 0 ? i : Wl),
        (p.heartbeatIntervalMs =
          (s = t?.heartbeatIntervalMs) !== null && s !== void 0 ? s : tu.HEARTBEAT_INTERVAL),
        (this._disconnectOnEmptyChannelsAfterMs =
          (o = t?.disconnectOnEmptyChannelsAfterMs) !== null && o !== void 0
            ? o
            : 2 *
              ((a = t?.heartbeatIntervalMs) !== null && a !== void 0 ? a : tu.HEARTBEAT_INTERVAL)),
        (p.transport =
          (c = t?.transport) !== null && c !== void 0 ? c : Oo.getWebSocketConstructor()),
        (p.params = t?.params),
        (p.logger = t?.logger),
        (p.heartbeatCallback = this._wrapHeartbeatCallback(t?.heartbeatCallback)),
        (p.sessionStorage = (l = t?.sessionStorage) !== null && l !== void 0 ? l : Ip()),
        (p.reconnectAfterMs =
          (u = t?.reconnectAfterMs) !== null && u !== void 0 ? u : (D) => Cp[D - 1] || Rp));
      let g,
        b,
        v = (d = t?.vsn) !== null && d !== void 0 ? d : Gl;
      switch (v) {
        case ql:
          ((g = (D, w) => w(JSON.stringify(D))), (b = (D, w) => w(JSON.parse(D))));
          break;
        case xo:
          ((g = this.serializer.encode.bind(this.serializer)),
            (b = this.serializer.decode.bind(this.serializer)));
          break;
        default:
          throw new Error(`Unsupported serializer version: ${p.vsn}`);
      }
      if (
        ((p.vsn = v),
        (p.encode = (h = t?.encode) !== null && h !== void 0 ? h : g),
        (p.decode = (f = t?.decode) !== null && f !== void 0 ? f : b),
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
var fr = class extends Error {
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
function Op(n, t, e) {
  let r = new URL(t, n);
  if (e) for (let [i, s] of Object.entries(e)) s !== void 0 && r.searchParams.set(i, s);
  return r.toString();
}
async function xp(n) {
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
function Pp(n) {
  let t = n.fetchImpl ?? globalThis.fetch;
  return {
    async request({ method: e, path: r, query: i, body: s, headers: o }) {
      let a = Op(n.baseUrl, r, i),
        c = await xp(n.auth),
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
        throw new fr(p?.message ?? `Request failed with status ${l.status}`, {
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
function Ui(n) {
  return n.join('');
}
var Mp = class {
  constructor(n, t = '') {
    ((this.client = n), (this.prefix = t));
  }
  async listNamespaces(n) {
    let t = n ? { parent: Ui(n.namespace) } : void 0;
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
      path: `${this.prefix}/namespaces/${Ui(n.namespace)}`,
    });
  }
  async loadNamespaceMetadata(n) {
    return {
      properties: (
        await this.client.request({
          method: 'GET',
          path: `${this.prefix}/namespaces/${Ui(n.namespace)}`,
        })
      ).data.properties,
    };
  }
  async namespaceExists(n) {
    try {
      return (
        await this.client.request({
          method: 'HEAD',
          path: `${this.prefix}/namespaces/${Ui(n.namespace)}`,
        }),
        !0
      );
    } catch (t) {
      if (t instanceof fr && t.status === 404) return false;
      throw t;
    }
  }
  async createNamespaceIfNotExists(n, t) {
    try {
      return await this.createNamespace(n, t);
    } catch (e) {
      if (e instanceof fr && e.status === 409) return;
      throw e;
    }
  }
};
function ln(n) {
  return n.join('');
}
var Np = class {
    constructor(n, t = '', e) {
      ((this.client = n), (this.prefix = t), (this.accessDelegation = e));
    }
    async listTables(n) {
      return (
        await this.client.request({
          method: 'GET',
          path: `${this.prefix}/namespaces/${ln(n.namespace)}/tables`,
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
            path: `${this.prefix}/namespaces/${ln(n.namespace)}/tables`,
            body: t,
            headers: e,
          })
        ).data.metadata
      );
    }
    async updateTable(n, t) {
      let e = await this.client.request({
        method: 'POST',
        path: `${this.prefix}/namespaces/${ln(n.namespace)}/tables/${n.name}`,
        body: t,
      });
      return { 'metadata-location': e.data['metadata-location'], metadata: e.data.metadata };
    }
    async dropTable(n, t) {
      await this.client.request({
        method: 'DELETE',
        path: `${this.prefix}/namespaces/${ln(n.namespace)}/tables/${n.name}`,
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
            path: `${this.prefix}/namespaces/${ln(n.namespace)}/tables/${n.name}`,
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
            path: `${this.prefix}/namespaces/${ln(n.namespace)}/tables/${n.name}`,
            headers: t,
          }),
          !0
        );
      } catch (e) {
        if (e instanceof fr && e.status === 404) return false;
        throw e;
      }
    }
    async createTableIfNotExists(n, t) {
      try {
        return await this.createTable(n, t);
      } catch (e) {
        if (e instanceof fr && e.status === 409)
          return await this.loadTable({ namespace: n.namespace, name: t.name });
        throw e;
      }
    }
  },
  nu = class {
    constructor(n) {
      let t = 'v1';
      n.catalogName && (t += `/${n.catalogName}`);
      let e = n.baseUrl.endsWith('/') ? n.baseUrl : `${n.baseUrl}/`;
      ((this.client = Pp({ baseUrl: e, auth: n.auth, fetchImpl: n.fetch })),
        (this.accessDelegation = n.accessDelegation?.join(',')),
        (this.namespaceOps = new Mp(this.client, t)),
        (this.tableOps = new Np(this.client, t, this.accessDelegation)));
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
function mr(n) {
  '@babel/helpers - typeof';
  return (
    (mr =
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
    mr(n)
  );
}
function Lp(n, t) {
  if (mr(n) != 'object' || !n) return n;
  var e = n[Symbol.toPrimitive];
  if (e !== void 0) {
    var r = e.call(n, t);
    if (mr(r) != 'object') return r;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (t === 'string' ? String : Number)(n);
}
function Fp(n) {
  var t = Lp(n, 'string');
  return mr(t) == 'symbol' ? t : t + '';
}
function Up(n, t, e) {
  return (
    (t = Fp(t)) in n
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
function ru(n, t) {
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
      ? ru(Object(e), true).forEach(function (r) {
          Up(n, r, e[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e))
        : ru(Object(e)).forEach(function (r) {
            Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(e, r));
          });
  }
  return n;
}
var $i = class extends Error {
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
function zi(n) {
  return typeof n == 'object' && n !== null && '__isStorageError' in n;
}
var ji = class extends $i {
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
  ou = class extends $i {
    constructor(n, t, e = 'storage') {
      (super(n, e),
        (this.name = e === 'vectors' ? 'StorageVectorsUnknownError' : 'StorageUnknownError'),
        (this.originalError = t));
    }
  };
function Bi(n, t, e) {
  let r = T({}, n),
    i = t.toLowerCase();
  for (let s of Object.keys(r)) s.toLowerCase() === i && delete r[s];
  return ((r[i] = e), r);
}
function jp(n) {
  let t = {};
  for (let [e, r] of Object.entries(n)) t[e.toLowerCase()] = r;
  return t;
}
var Bp = (n) => (n ? (...t) => n(...t) : (...t) => fetch(...t)),
  $p = (n) => {
    if (typeof n != 'object' || n === null) return false;
    let t = Object.getPrototypeOf(n);
    return (
      (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in n) &&
      !(Symbol.iterator in n)
    );
  },
  Fo = (n) => {
    if (Array.isArray(n)) return n.map((e) => Fo(e));
    if (typeof n == 'function' || n !== Object(n)) return n;
    let t = {};
    return (
      Object.entries(n).forEach(([e, r]) => {
        let i = e.replace(/([-_][a-z])/gi, (s) => s.toUpperCase().replace(/[-_]/g, ''));
        t[i] = Fo(r);
      }),
      t
    );
  },
  zp = (n) =>
    !n ||
    typeof n != 'string' ||
    n.length === 0 ||
    n.length > 100 ||
    n.trim() !== n ||
    n.includes('/') ||
    n.includes('\\')
      ? false
      : /^[\w!.\*'() &$@=;:+,?-]+$/.test(n),
  iu = (n) => {
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
  Hp = async (n, t, e, r) => {
    if (n !== null && typeof n == 'object' && 'json' in n && typeof n.json == 'function') {
      let i = n,
        s = parseInt(String(i.status), 10);
      (Number.isFinite(s) || (s = 500),
        i
          .json()
          .then((o) => {
            let a = o?.statusCode || o?.code || s + '';
            t(new ji(iu(o), s, a, r));
          })
          .catch(() => {
            let o = s + '';
            t(new ji(i.statusText || `HTTP ${s} error`, s, o, r));
          }));
    } else t(new ou(iu(n), n, r));
  },
  Vp = (n, t, e, r) => {
    let i = { method: n, headers: t?.headers || {} };
    if (n === 'GET' || n === 'HEAD' || !r) return T(T({}, i), e);
    if ($p(r)) {
      var s;
      let o = t?.headers || {},
        a;
      for (let [c, l] of Object.entries(o)) c.toLowerCase() === 'content-type' && (a = l);
      ((i.headers = Bi(
        o,
        'Content-Type',
        (s = a) !== null && s !== void 0 ? s : 'application/json',
      )),
        (i.body = JSON.stringify(r)));
    } else i.body = r;
    return (t?.duplex && (i.duplex = t.duplex), T(T({}, i), e));
  };
async function pr(n, t, e, r, i, s, o) {
  return new Promise((a, c) => {
    n(e, Vp(t, r, i, s))
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
      .catch((l) => Hp(l, c, r, o));
  });
}
function au(n = 'storage') {
  return {
    get: async (t, e, r, i) => pr(t, 'GET', e, r, i, void 0, n),
    post: async (t, e, r, i, s) => pr(t, 'POST', e, i, s, r, n),
    put: async (t, e, r, i, s) => pr(t, 'PUT', e, i, s, r, n),
    head: async (t, e, r, i) =>
      pr(t, 'HEAD', e, T(T({}, r), {}, { noResolveJson: true }), i, void 0, n),
    remove: async (t, e, r, i, s) => pr(t, 'DELETE', e, i, s, r, n),
  };
}
var qp = au('storage'),
  { get: gr, post: De, put: Uo, head: Gp, remove: jo } = qp,
  le = au('vectors'),
  un = class {
    constructor(n, t = {}, e, r = 'storage') {
      ((this.shouldThrowOnError = false),
        (this.url = n),
        (this.headers = jp(t)),
        (this.fetch = Bp(e)),
        (this.namespace = r));
    }
    throwOnError() {
      return ((this.shouldThrowOnError = true), this);
    }
    setHeader(n, t) {
      return ((this.headers = Bi(this.headers, n, t)), this);
    }
    async handleOperation(n) {
      var t = this;
      try {
        return { data: await n(), error: null };
      } catch (e) {
        if (t.shouldThrowOnError) throw e;
        if (zi(e)) return { data: null, error: e };
        throw e;
      }
    }
  },
  cu;
cu = Symbol.toStringTag;
var Wp = class {
    constructor(n, t) {
      ((this.downloadFn = n),
        (this.shouldThrowOnError = t),
        (this[cu] = 'StreamDownloadBuilder'),
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
        if (zi(t)) return { data: null, error: t };
        throw t;
      }
    }
  },
  lu;
lu = Symbol.toStringTag;
var Kp = class {
    constructor(n, t) {
      ((this.downloadFn = n),
        (this.shouldThrowOnError = t),
        (this[lu] = 'BlobDownloadBuilder'),
        (this.promise = null));
    }
    asStream() {
      return new Wp(this.downloadFn, this.shouldThrowOnError);
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
        if (zi(t)) return { data: null, error: t };
        throw t;
      }
    }
  },
  Jp = { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } },
  su = { cacheControl: '3600', contentType: 'text/plain;charset=UTF-8', upsert: false },
  Yp = class extends un {
    constructor(n, t = {}, e, r) {
      (super(n, t, r, 'storage'), (this.bucketId = e));
    }
    async uploadOrUpdate(n, t, e, r) {
      var i = this;
      return i.handleOperation(async () => {
        let s,
          o = T(T({}, su), r),
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
          for (let [h, f] of Object.entries(r.headers)) a = Bi(a, h, f);
        let l = i._removeEmptyFolders(t),
          u = i._getFinalPath(l),
          d = await (n == 'PUT' ? Uo : De)(
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
            l = T(T({}, su), r),
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
            for (let [h, f] of Object.entries(r.headers)) u = Bi(u, h, f);
          return {
            path: s,
            fullPath: (
              await Uo(
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
        let s = await De(e.fetch, `${e.url}/object/upload/sign/${r}`, {}, { headers: i }),
          o = new URL(e.url + s.url),
          a = o.searchParams.get('token');
        if (!a) throw new $i('No token returned by API');
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
          await De(
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
          await De(
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
          o = await De(
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
        let i = await De(
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
          gr(
            this.fetch,
            `${this.url}/${r}/${o}${s ? `?${s}` : ''}`,
            { headers: this.headers, noResolveJson: true },
            e,
          );
      return new Kp(a, this.shouldThrowOnError);
    }
    async info(n) {
      var t = this;
      let e = t._getFinalPath(n);
      return t.handleOperation(async () =>
        Fo(await gr(t.fetch, `${t.url}/object/info/${e}`, { headers: t.headers })),
      );
    }
    async exists(n) {
      var t = this;
      let e = t._getFinalPath(n);
      try {
        return (
          await Gp(t.fetch, `${t.url}/object/${e}`, { headers: t.headers }),
          { data: !0, error: null }
        );
      } catch (i) {
        if (t.shouldThrowOnError) throw i;
        if (zi(i)) {
          var r;
          let s =
            i instanceof ji
              ? i.status
              : i instanceof ou
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
          await jo(
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
        let i = T(T(T({}, Jp), t), {}, { prefix: n || '' });
        return await De(
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
        return await De(
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
  Xp = '2.107.0',
  vr = { 'X-Client-Info': `storage-js/${Xp}` },
  Zp = class extends un {
    constructor(n, t = {}, e, r) {
      let i = new URL(n);
      r?.useNewHostname &&
        /supabase\.(co|in|red)$/.test(i.hostname) &&
        !i.hostname.includes('storage.supabase.') &&
        (i.hostname = i.hostname.replace('supabase.', 'storage.supabase.'));
      let s = i.href.replace(/\/$/, ''),
        o = T(T({}, vr), t);
      super(s, o, e, 'storage');
    }
    async listBuckets(n) {
      var t = this;
      return t.handleOperation(async () => {
        let e = t.listBucketOptionsToQueryString(n);
        return await gr(t.fetch, `${t.url}/bucket${e}`, { headers: t.headers });
      });
    }
    async getBucket(n) {
      var t = this;
      return t.handleOperation(
        async () => await gr(t.fetch, `${t.url}/bucket/${n}`, { headers: t.headers }),
      );
    }
    async createBucket(n, t = { public: false }) {
      var e = this;
      return e.handleOperation(
        async () =>
          await De(
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
          await Uo(
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
        async () => await De(t.fetch, `${t.url}/bucket/${n}/empty`, {}, { headers: t.headers }),
      );
    }
    async deleteBucket(n) {
      var t = this;
      return t.handleOperation(
        async () => await jo(t.fetch, `${t.url}/bucket/${n}`, {}, { headers: t.headers }),
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
  Qp = class extends un {
    constructor(n, t = {}, e) {
      let r = n.replace(/\/$/, ''),
        i = T(T({}, vr), t);
      super(r, i, e, 'storage');
    }
    async createBucket(n) {
      var t = this;
      return t.handleOperation(
        async () => await De(t.fetch, `${t.url}/bucket`, { name: n }, { headers: t.headers }),
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
        return await gr(t.fetch, i, { headers: t.headers });
      });
    }
    async deleteBucket(n) {
      var t = this;
      return t.handleOperation(
        async () => await jo(t.fetch, `${t.url}/bucket/${n}`, {}, { headers: t.headers }),
      );
    }
    from(n) {
      var t = this;
      if (!zp(n))
        throw new $i(
          'Invalid bucket name: File, folder, and bucket names must follow AWS object key naming guidelines and should avoid the use of any other characters.',
        );
      let e = new nu({
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
  em = class extends un {
    constructor(n, t = {}, e) {
      let r = n.replace(/\/$/, ''),
        i = T(T({}, vr), {}, { 'Content-Type': 'application/json' }, t);
      super(r, i, e, 'vectors');
    }
    async createIndex(n) {
      var t = this;
      return t.handleOperation(
        async () =>
          (await le.post(t.fetch, `${t.url}/CreateIndex`, n, { headers: t.headers })) || {},
      );
    }
    async getIndex(n, t) {
      var e = this;
      return e.handleOperation(
        async () =>
          await le.post(
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
        async () => await le.post(t.fetch, `${t.url}/ListIndexes`, n, { headers: t.headers }),
      );
    }
    async deleteIndex(n, t) {
      var e = this;
      return e.handleOperation(
        async () =>
          (await le.post(
            e.fetch,
            `${e.url}/DeleteIndex`,
            { vectorBucketName: n, indexName: t },
            { headers: e.headers },
          )) || {},
      );
    }
  },
  tm = class extends un {
    constructor(n, t = {}, e) {
      let r = n.replace(/\/$/, ''),
        i = T(T({}, vr), {}, { 'Content-Type': 'application/json' }, t);
      super(r, i, e, 'vectors');
    }
    async putVectors(n) {
      var t = this;
      if (n.vectors.length < 1 || n.vectors.length > 500)
        throw new Error('Vector batch size must be between 1 and 500 items');
      return t.handleOperation(
        async () =>
          (await le.post(t.fetch, `${t.url}/PutVectors`, n, { headers: t.headers })) || {},
      );
    }
    async getVectors(n) {
      var t = this;
      return t.handleOperation(
        async () => await le.post(t.fetch, `${t.url}/GetVectors`, n, { headers: t.headers }),
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
        async () => await le.post(t.fetch, `${t.url}/ListVectors`, n, { headers: t.headers }),
      );
    }
    async queryVectors(n) {
      var t = this;
      return t.handleOperation(
        async () => await le.post(t.fetch, `${t.url}/QueryVectors`, n, { headers: t.headers }),
      );
    }
    async deleteVectors(n) {
      var t = this;
      if (n.keys.length < 1 || n.keys.length > 500)
        throw new Error('Keys batch size must be between 1 and 500 items');
      return t.handleOperation(
        async () =>
          (await le.post(t.fetch, `${t.url}/DeleteVectors`, n, { headers: t.headers })) || {},
      );
    }
  },
  nm = class extends un {
    constructor(n, t = {}, e) {
      let r = n.replace(/\/$/, ''),
        i = T(T({}, vr), {}, { 'Content-Type': 'application/json' }, t);
      super(r, i, e, 'vectors');
    }
    async createBucket(n) {
      var t = this;
      return t.handleOperation(
        async () =>
          (await le.post(
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
          await le.post(
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
        async () => await le.post(t.fetch, `${t.url}/ListVectorBuckets`, n, { headers: t.headers }),
      );
    }
    async deleteBucket(n) {
      var t = this;
      return t.handleOperation(
        async () =>
          (await le.post(
            t.fetch,
            `${t.url}/DeleteVectorBucket`,
            { vectorBucketName: n },
            { headers: t.headers },
          )) || {},
      );
    }
  },
  rm = class extends nm {
    constructor(n, t = {}) {
      super(n, t.headers || {}, t.fetch);
    }
    from(n) {
      return new im(this.url, this.headers, n, this.fetch);
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
  im = class extends em {
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
      return new sm(this.url, this.headers, this.vectorBucketName, n, this.fetch);
    }
  },
  sm = class extends tm {
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
  uu = class extends Zp {
    constructor(n, t = {}, e, r) {
      super(n, t, e, r);
    }
    from(n) {
      return new Yp(this.url, this.headers, n, this.fetch);
    }
    get vectors() {
      return new rm(this.url + '/vector', { headers: this.headers, fetch: this.fetch });
    }
    get analytics() {
      return new Qp(this.url + '/iceberg', this.headers, this.fetch);
    }
  };
var Hi = '2.107.0';
var We = 30 * 1e3,
  dn = 3,
  Vi = dn * We,
  du = 'http://localhost:9999',
  hu = 'supabase.auth.token';
var fu = { 'X-Client-Info': `gotrue-js/${Hi}` };
var br = 'X-Supabase-Api-Version',
  Bo = { '2024-01-01': { timestamp: Date.parse('2024-01-01T00:00:00.0Z'), name: '2024-01-01' } },
  pu = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i,
  mu = 600 * 1e3;
var ct = class extends Error {
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
var qi = class extends ct {
  constructor(t, e, r) {
    (super(t, e, r), (this.name = 'AuthApiError'), (this.status = e), (this.code = r));
  }
};
function gu(n) {
  return _(n) && n.name === 'AuthApiError';
}
var Y = class extends ct {
    constructor(t, e) {
      (super(t), (this.name = 'AuthUnknownError'), (this.originalError = e));
    }
  },
  be = class extends ct {
    constructor(t, e, r, i) {
      (super(t, r, i), (this.name = e), (this.status = r));
    }
  },
  z = class extends be {
    constructor() {
      super('Auth session missing!', 'AuthSessionMissingError', 400, void 0);
    }
  };
function Er(n) {
  return _(n) && n.name === 'AuthSessionMissingError';
}
var Ke = class extends be {
    constructor() {
      super('Auth session or user missing', 'AuthInvalidTokenResponseError', 500, void 0);
    }
  },
  _t = class extends be {
    constructor(t) {
      super(t, 'AuthInvalidCredentialsError', 400, void 0);
    }
  },
  wt = class extends be {
    constructor(t, e = null) {
      (super(t, 'AuthImplicitGrantRedirectError', 500, void 0),
        (this.details = null),
        (this.details = e));
    }
    toJSON() {
      return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
    }
  };
function vu(n) {
  return _(n) && n.name === 'AuthImplicitGrantRedirectError';
}
var yr = class extends be {
    constructor(t, e = null) {
      (super(t, 'AuthPKCEGrantCodeExchangeError', 500, void 0),
        (this.details = null),
        (this.details = e));
    }
    toJSON() {
      return Object.assign(Object.assign({}, super.toJSON()), { details: this.details });
    }
  },
  Gi = class extends be {
    constructor() {
      super(
        'PKCE code verifier not found in storage. This can happen if the auth flow was initiated in a different browser or device, or if the storage was cleared. For SSR frameworks (Next.js, SvelteKit, etc.), use @supabase/ssr on both the server and client to store the code verifier in cookies.',
        'AuthPKCECodeVerifierMissingError',
        400,
        'pkce_code_verifier_not_found',
      );
    }
  };
var hn = class extends be {
  constructor(t, e) {
    super(t, 'AuthRetryableFetchError', e, void 0);
  }
};
function Wi(n) {
  return _(n) && n.name === 'AuthRetryableFetchError';
}
var _r = class extends be {
  constructor(
    t = 'Refresh result discarded: session state changed mid-flight (e.g., concurrent signOut)',
  ) {
    super(t, 'AuthRefreshDiscardedError', 409, void 0);
  }
};
function bu(n) {
  return _(n) && n.name === 'AuthRefreshDiscardedError';
}
var wr = class extends be {
  constructor(t, e, r) {
    (super(t, 'AuthWeakPasswordError', e, 'weak_password'), (this.reasons = r));
  }
  toJSON() {
    return Object.assign(Object.assign({}, super.toJSON()), { reasons: this.reasons });
  }
};
var lt$1 = class lt extends be {
  constructor(t) {
    super(t, 'AuthInvalidJwtError', 400, 'invalid_jwt');
  }
};
var Ki = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'.split(''),
  yu = ` 	
\r=`.split(''),
  om = (() => {
    let n = new Array(128);
    for (let t = 0; t < n.length; t += 1) n[t] = -1;
    for (let t = 0; t < yu.length; t += 1) n[yu[t].charCodeAt(0)] = -2;
    for (let t = 0; t < Ki.length; t += 1) n[Ki[t].charCodeAt(0)] = t;
    return n;
  })();
function _u(n, t, e) {
  if (n !== null)
    for (t.queue = (t.queue << 8) | n, t.queuedBits += 8; t.queuedBits >= 6; ) {
      let r = (t.queue >> (t.queuedBits - 6)) & 63;
      (e(Ki[r]), (t.queuedBits -= 6));
    }
  else if (t.queuedBits > 0)
    for (t.queue = t.queue << (6 - t.queuedBits), t.queuedBits = 6; t.queuedBits >= 6; ) {
      let r = (t.queue >> (t.queuedBits - 6)) & 63;
      (e(Ki[r]), (t.queuedBits -= 6));
    }
}
function wu(n, t, e) {
  let r = om[n];
  if (r > -1)
    for (t.queue = (t.queue << 6) | r, t.queuedBits += 6; t.queuedBits >= 8; )
      (e((t.queue >> (t.queuedBits - 8)) & 255), (t.queuedBits -= 8));
  else {
    if (r === -2) return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(n)}"`);
  }
}
function $o(n) {
  let t = [],
    e = (o) => {
      t.push(String.fromCodePoint(o));
    },
    r = { utf8seq: 0, codepoint: 0 },
    i = { queue: 0, queuedBits: 0 },
    s = (o) => {
      lm(o, r, e);
    };
  for (let o = 0; o < n.length; o += 1) wu(n.charCodeAt(o), i, s);
  return t.join('');
}
function am(n, t) {
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
function cm(n, t) {
  for (let e = 0; e < n.length; e += 1) {
    let r = n.charCodeAt(e);
    if (r > 55295 && r <= 56319) {
      let i = ((r - 55296) * 1024) & 65535;
      ((r = (((n.charCodeAt(e + 1) - 56320) & 65535) | i) + 65536), (e += 1));
    }
    am(r, t);
  }
}
function lm(n, t, e) {
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
function ut$1(n) {
  let t = [],
    e = { queue: 0, queuedBits: 0 },
    r = (i) => {
      t.push(i);
    };
  for (let i = 0; i < n.length; i += 1) wu(n.charCodeAt(i), e, r);
  return new Uint8Array(t);
}
function Eu(n) {
  let t = [];
  return (cm(n, (e) => t.push(e)), new Uint8Array(t));
}
function Je(n) {
  let t = [],
    e = { queue: 0, queuedBits: 0 },
    r = (i) => {
      t.push(i);
    };
  return (n.forEach((i) => _u(i, e, r)), _u(null, e, r), t.join(''));
}
function Su(n) {
  return Math.round(Date.now() / 1e3) + n;
}
function Du() {
  return Symbol('auth-callback');
}
var W = () => typeof window < 'u' && typeof document < 'u',
  Et = { tested: false, writable: false },
  Ji = () => {
    if (!W()) return false;
    try {
      if (typeof globalThis.localStorage != 'object') return !1;
    } catch {
      return false;
    }
    if (Et.tested) return Et.writable;
    let n = `lswt-${Math.random()}${Math.random()}`;
    try {
      (globalThis.localStorage.setItem(n, n),
        globalThis.localStorage.removeItem(n),
        (Et.tested = !0),
        (Et.writable = !0));
    } catch {
      ((Et.tested = true), (Et.writable = false));
    }
    return Et.writable;
  };
function Tu(n) {
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
var Yi = (n) => (n ? (...t) => n(...t) : (...t) => fetch(...t)),
  Cu = (n) =>
    typeof n == 'object' &&
    n !== null &&
    'status' in n &&
    'ok' in n &&
    'json' in n &&
    typeof n.json == 'function',
  St = async (n, t, e) => {
    await n.setItem(t, JSON.stringify(e));
  },
  xe = async (n, t) => {
    let e = await n.getItem(t);
    if (!e) return null;
    try {
      return JSON.parse(e);
    } catch {
      return null;
    }
  },
  V = async (n, t) => {
    await n.removeItem(t);
  },
  Sr = class n {
    constructor() {
      this.promise = new n.promiseConstructor((t, e) => {
        ((this.resolve = t), (this.reject = e));
      });
    }
  };
Sr.promiseConstructor = Promise;
function Dr(n) {
  let t = n.split('.');
  if (t.length !== 3) throw new lt$1('Invalid JWT structure');
  for (let r = 0; r < t.length; r++)
    if (!pu.test(t[r])) throw new lt$1('JWT not in base64url format');
  return {
    header: JSON.parse($o(t[0])),
    payload: JSON.parse($o(t[1])),
    signature: ut$1(t[2]),
    raw: { header: t[0], payload: t[1] },
  };
}
async function Ru(n) {
  return await new Promise((t) => {
    setTimeout(() => t(null), n);
  });
}
function Au(n, t) {
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
function um(n) {
  return ('0' + n.toString(16)).substr(-2);
}
function dm() {
  let t = new Uint32Array(56);
  if (typeof crypto > 'u') {
    let e = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~',
      r = e.length,
      i = '';
    for (let s = 0; s < 56; s++) i += e.charAt(Math.floor(Math.random() * r));
    return i;
  }
  return (crypto.getRandomValues(t), Array.from(t, um).join(''));
}
async function hm(n) {
  let e = new TextEncoder().encode(n),
    r = await crypto.subtle.digest('SHA-256', e),
    i = new Uint8Array(r);
  return Array.from(i)
    .map((s) => String.fromCharCode(s))
    .join('');
}
async function fm(n) {
  if (!(typeof crypto < 'u' && typeof crypto.subtle < 'u' && typeof TextEncoder < 'u'))
    return (
      console.warn(
        'WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.',
      ),
      n
    );
  let e = await hm(n);
  return btoa(e).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function Dt(n, t, e = false) {
  let r = dm(),
    i = r;
  (e && (i += '/recovery'), await St(n, `${t}-code-verifier`, i));
  let s = await fm(r);
  return [s, r === s ? 'plain' : 's256'];
}
var pm = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function Iu(n) {
  let t = n.headers.get(br);
  if (!t || !t.match(pm)) return null;
  try {
    return new Date(`${t}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
function ku(n) {
  if (!n) throw new Error('Missing exp claim');
  let t = Math.floor(Date.now() / 1e3);
  if (n <= t) throw new Error('JWT has expired');
}
function Ou(n) {
  switch (n) {
    case 'RS256':
      return { name: 'RSASSA-PKCS1-v1_5', hash: { name: 'SHA-256' } };
    case 'ES256':
      return { name: 'ECDSA', namedCurve: 'P-256', hash: { name: 'SHA-256' } };
    default:
      throw new Error('Invalid alg claim');
  }
}
var mm = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function Pe(n) {
  if (!mm.test(n)) throw new Error('@supabase/auth-js: Expected parameter to be UUID but is not');
}
function ue(n) {
  if (!n.passkey)
    throw new Error(
      '@supabase/auth-js: the passkey API is experimental and disabled by default. Enable it by passing `auth: { experimental: { passkey: true } }` to createClient (or to the GoTrueClient constructor).',
    );
}
function Xi() {
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
function xu(n, t) {
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
function zo(n) {
  return JSON.parse(JSON.stringify(n));
}
var Tt = (n) => {
    if (typeof n == 'object' && n !== null) {
      let t = n;
      if (typeof t.msg == 'string') return t.msg;
      if (typeof t.message == 'string') return t.message;
      if (typeof t.error_description == 'string') return t.error_description;
      if (typeof t.error == 'string') return t.error;
    }
    return JSON.stringify(n);
  },
  gm = [502, 503, 504, 520, 521, 522, 523, 524, 530];
async function Pu(n) {
  var t;
  if (!Cu(n)) throw new hn(Tt(n), 0);
  if (gm.includes(n.status)) throw new hn(Tt(n), n.status);
  let e;
  try {
    e = await n.json();
  } catch (s) {
    throw new Y(Tt(s), s);
  }
  let r,
    i = Iu(n);
  if (
    (i &&
    i.getTime() >= Bo['2024-01-01'].timestamp &&
    typeof e == 'object' &&
    e &&
    typeof e.code == 'string'
      ? (r = e.code)
      : typeof e == 'object' && e && typeof e.error_code == 'string' && (r = e.error_code),
    r)
  ) {
    if (r === 'weak_password')
      throw new wr(
        Tt(e),
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
    throw new wr(Tt(e), n.status, e.weak_password.reasons);
  throw new qi(Tt(e), n.status || 500, r);
}
var vm = (n, t, e, r) => {
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
  (s[br] || (s[br] = Bo['2024-01-01'].name), r?.jwt && (s.Authorization = `Bearer ${r.jwt}`));
  let o = (i = r?.query) !== null && i !== void 0 ? i : {};
  r?.redirectTo && (o.redirect_to = r.redirectTo);
  let a = Object.keys(o).length ? '?' + new URLSearchParams(o).toString() : '',
    c = await bm(n, t, e + a, { headers: s, noResolveJson: r?.noResolveJson }, {}, r?.body);
  return r?.xform ? r?.xform(c) : { data: Object.assign({}, c), error: null };
}
async function bm(n, t, e, r, i, s) {
  let o = vm(t, r, i, s),
    a;
  try {
    a = await n(e, Object.assign({}, o));
  } catch (c) {
    throw (console.error(c), new hn(Tt(c), 0));
  }
  if ((a.ok || (await Pu(a)), r?.noResolveJson)) return a;
  try {
    return await a.json();
  } catch (c) {
    await Pu(c);
  }
}
function de(n) {
  var t;
  let e = null;
  ym(n) && ((e = Object.assign({}, n)), n.expires_at || (e.expires_at = Su(n.expires_in)));
  let r = (t = n.user) !== null && t !== void 0 ? t : typeof n?.id == 'string' ? n : null;
  return { data: { session: e, user: r }, error: null };
}
function Ho(n) {
  let t = de(n);
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
function Me(n) {
  var t;
  return { data: { user: (t = n.user) !== null && t !== void 0 ? t : n }, error: null };
}
function Mu(n) {
  return { data: n, error: null };
}
function Nu(n) {
  let { action_link: t, email_otp: e, hashed_token: r, redirect_to: i, verification_type: s } = n,
    o = OD(n, ['action_link', 'email_otp', 'hashed_token', 'redirect_to', 'verification_type']),
    a = { action_link: t, email_otp: e, hashed_token: r, redirect_to: i, verification_type: s },
    c = Object.assign({}, o);
  return { data: { properties: a, user: c }, error: null };
}
function Vo(n) {
  return n;
}
function ym(n) {
  return !!n.access_token && !!n.refresh_token && !!n.expires_in;
}
var Zi = ['global', 'local', 'others'];
var fn = class {
  constructor({ url: t = '', headers: e = {}, fetch: r, experimental: i }) {
    ((this.url = t),
      (this.headers = e),
      (this.fetch = Yi(r)),
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
  async signOut(t, e = Zi[0]) {
    if (Zi.indexOf(e) < 0)
      throw new Error(`@supabase/auth-js: Parameter scope must be one of ${Zi.join(', ')}`);
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
        xform: Me,
      });
    } catch (r) {
      if (_(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async generateLink(t) {
    try {
      let { options: e } = t,
        r = OD(t, ['options']),
        i = Object.assign(Object.assign({}, r), e);
      return (
        'newEmail' in r && ((i.new_email = r?.newEmail), delete i.newEmail),
        await E(this.fetch, 'POST', `${this.url}/admin/generate_link`, {
          body: i,
          headers: this.headers,
          xform: Nu,
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
        xform: Me,
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
          xform: Vo,
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
              b = JSON.parse(p.split(';')[1].split('=')[1]);
            l[`${b}Page`] = g;
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
    Pe(t);
    try {
      return await E(this.fetch, 'GET', `${this.url}/admin/users/${t}`, {
        headers: this.headers,
        xform: Me,
      });
    } catch (e) {
      if (_(e)) return { data: { user: null }, error: e };
      throw e;
    }
  }
  async updateUserById(t, e) {
    Pe(t);
    try {
      return await E(this.fetch, 'PUT', `${this.url}/admin/users/${t}`, {
        body: e,
        headers: this.headers,
        xform: Me,
      });
    } catch (r) {
      if (_(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async deleteUser(t, e = false) {
    Pe(t);
    try {
      return await E(this.fetch, 'DELETE', `${this.url}/admin/users/${t}`, {
        headers: this.headers,
        body: { should_soft_delete: e },
        xform: Me,
      });
    } catch (r) {
      if (_(r)) return { data: { user: null }, error: r };
      throw r;
    }
  }
  async _listFactors(t) {
    Pe(t.userId);
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
    (Pe(t.userId), Pe(t.id));
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
          xform: Vo,
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
              b = JSON.parse(p.split(';')[1].split('=')[1]);
            l[`${b}Page`] = g;
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
    (ue(this.experimental), Pe(t.userId));
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
    (ue(this.experimental), Pe(t.userId), Pe(t.passkeyId));
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
function qo(n = {}) {
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
    Ji() &&
    globalThis.localStorage &&
    globalThis.localStorage.getItem('supabase.gotrue-js.locks.debug') === 'true'
  ),
});
var Qi = class extends Error {
  constructor(t) {
    (super(t), (this.isAcquireTimeout = true));
  }
};
function Lu() {
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
function Go(n) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(n))
    throw new Error(`@supabase/auth-js: Address "${n}" is invalid.`);
  return n.toLowerCase();
}
function Fu(n) {
  return parseInt(n, 16);
}
function Uu(n) {
  let t = new TextEncoder().encode(n);
  return '0x' + Array.from(t, (r) => r.toString(16).padStart(2, '0')).join('');
}
function ju(n) {
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
  let f = Go(n.address),
    p = u ? `${u}://${r}` : r,
    g = n.statement
      ? `${n.statement}
`
      : '',
    b = `${p} wants you to sign in with your Ethereum account:
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
  return `${b}
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
  Ct = class extends $ {
    constructor(t, e) {
      (super({ code: 'ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY', cause: e, message: t }),
        (this.name = 'WebAuthnUnknownError'),
        (this.originalError = e));
    }
  };
function Bu({ error: n, options: t }) {
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
      if (Wo(o)) {
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
function $u({ error: n, options: t }) {
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
      if (Wo(r)) {
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
var Ko = class {
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
  ns = new Ko();
function Jo(n) {
  if (!n) throw new Error('Credential creation options are required');
  if (
    typeof PublicKeyCredential < 'u' &&
    'parseCreationOptionsFromJSON' in PublicKeyCredential &&
    typeof PublicKeyCredential.parseCreationOptionsFromJSON == 'function'
  )
    return PublicKeyCredential.parseCreationOptionsFromJSON(n);
  let { challenge: t, user: e, excludeCredentials: r } = n,
    i = OD(n, ['challenge', 'user', 'excludeCredentials']),
    s = ut$1(t).buffer,
    o = Object.assign(Object.assign({}, e), { id: ut$1(e.id).buffer }),
    a = Object.assign(Object.assign({}, i), { challenge: s, user: o });
  if (r && r.length > 0) {
    a.excludeCredentials = new Array(r.length);
    for (let c = 0; c < r.length; c++) {
      let l = r[c];
      a.excludeCredentials[c] = Object.assign(Object.assign({}, l), {
        id: ut$1(l.id).buffer,
        type: l.type || 'public-key',
        transports: l.transports,
      });
    }
  }
  return a;
}
function Yo(n) {
  if (!n) throw new Error('Credential request options are required');
  if (
    typeof PublicKeyCredential < 'u' &&
    'parseRequestOptionsFromJSON' in PublicKeyCredential &&
    typeof PublicKeyCredential.parseRequestOptionsFromJSON == 'function'
  )
    return PublicKeyCredential.parseRequestOptionsFromJSON(n);
  let { challenge: t, allowCredentials: e } = n,
    r = OD(n, ['challenge', 'allowCredentials']),
    i = ut$1(t).buffer,
    s = Object.assign(Object.assign({}, r), { challenge: i });
  if (e && e.length > 0) {
    s.allowCredentials = new Array(e.length);
    for (let o = 0; o < e.length; o++) {
      let a = e[o];
      s.allowCredentials[o] = Object.assign(Object.assign({}, a), {
        id: ut$1(a.id).buffer,
        type: a.type || 'public-key',
        transports: a.transports,
      });
    }
  }
  return s;
}
function Xo(n) {
  var t;
  if ('toJSON' in n && typeof n.toJSON == 'function') return n.toJSON();
  let e = n;
  return {
    id: n.id,
    rawId: n.id,
    response: {
      attestationObject: Je(new Uint8Array(n.response.attestationObject)),
      clientDataJSON: Je(new Uint8Array(n.response.clientDataJSON)),
    },
    type: 'public-key',
    clientExtensionResults: n.getClientExtensionResults(),
    authenticatorAttachment: (t = e.authenticatorAttachment) !== null && t !== void 0 ? t : void 0,
  };
}
function Zo(n) {
  var t;
  if ('toJSON' in n && typeof n.toJSON == 'function') return n.toJSON();
  let e = n,
    r = n.getClientExtensionResults(),
    i = n.response;
  return {
    id: n.id,
    rawId: n.id,
    response: {
      authenticatorData: Je(new Uint8Array(i.authenticatorData)),
      clientDataJSON: Je(new Uint8Array(i.clientDataJSON)),
      signature: Je(new Uint8Array(i.signature)),
      userHandle: i.userHandle ? Je(new Uint8Array(i.userHandle)) : void 0,
    },
    type: 'public-key',
    clientExtensionResults: r,
    authenticatorAttachment: (t = e.authenticatorAttachment) !== null && t !== void 0 ? t : void 0,
  };
}
function Wo(n) {
  return n === 'localhost' || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(n);
}
function Tr() {
  var n, t;
  return !!(
    W() &&
    'PublicKeyCredential' in window &&
    window.PublicKeyCredential &&
    'credentials' in navigator &&
    typeof ((n = navigator?.credentials) === null || n === void 0 ? void 0 : n.create) ==
      'function' &&
    typeof ((t = navigator?.credentials) === null || t === void 0 ? void 0 : t.get) == 'function'
  );
}
async function Qo(n) {
  try {
    let t = await navigator.credentials.create(n);
    return t
      ? t instanceof PublicKeyCredential
        ? { data: t, error: null }
        : { data: null, error: new Ct('Browser returned unexpected credential type', t) }
      : { data: null, error: new Ct('Empty credential response', t) };
  } catch (t) {
    return { data: null, error: Bu({ error: t, options: n }) };
  }
}
async function ea(n) {
  try {
    let t = await navigator.credentials.get(n);
    return t
      ? t instanceof PublicKeyCredential
        ? { data: t, error: null }
        : { data: null, error: new Ct('Browser returned unexpected credential type', t) }
      : { data: null, error: new Ct('Empty credential response', t) };
  } catch (t) {
    return { data: null, error: $u({ error: t, options: n }) };
  }
}
var wm = {
    hints: ['security-key'],
    authenticatorSelection: {
      authenticatorAttachment: 'cross-platform',
      requireResidentKey: false,
      userVerification: 'preferred',
      residentKey: 'discouraged',
    },
    attestation: 'direct',
  },
  Em = { userVerification: 'preferred', hints: ['security-key'], attestation: 'direct' };
function es(...n) {
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
            t(a) ? (r[s] = es(a, o)) : (r[s] = es(o));
          } else r[s] = o;
      }
  return r;
}
function Sm(n, t) {
  return es(wm, n, t || {});
}
function Dm(n, t) {
  return es(Em, n, t || {});
}
var ts = class {
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
      let l = i ?? ns.createNewAbortSignal();
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
          let u = Sm(a.webauthn.credential_options.publicKey, s?.create),
            { data: d, error: h } = await Qo({ publicKey: u, signal: l });
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
          let u = Dm(a.webauthn.credential_options.publicKey, s?.request),
            { data: d, error: h } = await ea(
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
        : { data: null, error: new Y('Unexpected error in challenge', a) };
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
    if (!e) return { data: null, error: new ct('rpId is required for WebAuthn authentication') };
    try {
      if (!Tr()) return { data: null, error: new Y('Browser does not support WebAuthn', null) };
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
        : { data: null, error: new Y('Unexpected error in authenticate', o) };
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
    if (!e) return { data: null, error: new ct('rpId is required for WebAuthn registration') };
    try {
      if (!Tr()) return { data: null, error: new Y('Browser does not support WebAuthn', null) };
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
        : { data: null, error: new Y('Unexpected error in register', o) };
    }
  }
};
Lu();
var Tm = {
  url: du,
  storageKey: hu,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
  headers: fu,
  flowType: 'implicit',
  debug: false,
  hasCustomAuthorizationHeader: false,
  throwOnError: false,
  lockAcquireTimeout: 5e3,
  skipAutoInitialize: false,
  experimental: {},
};
var pn = {},
  Cm = (() => {
    class n {
      get jwks() {
        var e, r;
        return (r = (e = pn[this.storageKey]) === null || e === void 0 ? void 0 : e.jwks) !==
          null && r !== void 0
          ? r
          : { keys: [] };
      }
      set jwks(e) {
        pn[this.storageKey] = Object.assign(Object.assign({}, pn[this.storageKey]), { jwks: e });
      }
      get jwks_cached_at() {
        var e, r;
        return (r = (e = pn[this.storageKey]) === null || e === void 0 ? void 0 : e.cachedAt) !==
          null && r !== void 0
          ? r
          : Number.MIN_SAFE_INTEGER;
      }
      set jwks_cached_at(e) {
        pn[this.storageKey] = Object.assign(Object.assign({}, pn[this.storageKey]), {
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
        let o = Object.assign(Object.assign({}, Tm), e);
        if (
          ((this.storageKey = o.storageKey),
          (this.instanceID =
            (r = n.nextInstanceID[this.storageKey]) !== null && r !== void 0 ? r : 0),
          (n.nextInstanceID[this.storageKey] = this.instanceID + 1),
          (this.logDebugMessages = !!o.debug),
          typeof o.debug == 'function' && (this.logger = o.debug),
          this.instanceID > 0 && W())
        ) {
          let a = `${this._logPrefix()} Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.`;
          (console.warn(a), this.logDebugMessages && console.trace(a));
        }
        if (
          ((this.persistSession = o.persistSession),
          (this.autoRefreshToken = o.autoRefreshToken),
          (this.experimental = (i = o.experimental) !== null && i !== void 0 ? i : {}),
          (this.admin = new fn({
            url: o.url,
            headers: o.headers,
            fetch: o.fetch,
            experimental: this.experimental,
          })),
          (this.url = o.url),
          (this.headers = o.headers),
          (this.fetch = Yi(o.fetch)),
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
            webauthn: new ts(this),
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
                : Ji()
                  ? (this.storage = globalThis.localStorage)
                  : ((this.memoryStorage = {}), (this.storage = qo(this.memoryStorage))),
              o.userStorage && (this.userStorage = o.userStorage))
            : ((this.memoryStorage = {}), (this.storage = qo(this.memoryStorage))),
          W() && globalThis.BroadcastChannel && this.persistSession && this.storageKey)
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
        return `GoTrueClient@${this.storageKey}:${this.instanceID} (${Hi}) ${new Date().toISOString()}`;
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
            (W() &&
              ((r = Tu(window.location.href)),
              this._isImplicitGrantCallback(r)
                ? (i = 'implicit')
                : (await this._isPKCECallback(r)) && (i = 'pkce')),
            W() && this.detectSessionInUrl && i !== 'none')
          ) {
            let { data: s, error: o } = await this._getSessionFromURL(r, i);
            if (o) {
              if ((this._debug('#_initialize()', 'error detecting session from URL', o), vu(o))) {
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
            : this._returnResult({ error: new Y('Unexpected error during initialization', r) });
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
              xform: de,
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
            (this.flowType === 'pkce' && ([p, g] = await Dt(this.storage, this.storageKey)),
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
                xform: de,
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
              xform: de,
            });
          } else throw new _t('You must provide either an email or phone number and a password');
          let { data: a, error: c } = o;
          if (c || !a)
            return (
              await V(this.storage, `${this.storageKey}-code-verifier`),
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
          if ((await V(this.storage, `${this.storageKey}-code-verifier`), _(o)))
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
              xform: Ho,
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
              xform: Ho,
            });
          } else throw new _t('You must provide either an email or phone number and a password');
          let { data: i, error: s } = r;
          if (s) return this._returnResult({ data: { user: null, session: null }, error: s });
          if (!i || !i.session || !i.user) {
            let o = new Ke();
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
          let { chain: b, wallet: v, statement: D, options: w } = e,
            S;
          if (W())
            if (typeof v == 'object') S = v;
            else {
              let X = window;
              if (
                'ethereum' in X &&
                typeof X.ethereum == 'object' &&
                'request' in X.ethereum &&
                typeof X.ethereum.request == 'function'
              )
                S = X.ethereum;
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
            q = await S.request({ method: 'eth_requestAccounts' })
              .then((X) => X)
              .catch(() => {
                throw new Error(
                  '@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid',
                );
              });
          if (!q || q.length === 0)
            throw new Error(
              '@supabase/auth-js: No accounts available. Please ensure the wallet is connected.',
            );
          let N = Go(q[0]),
            B = (i = w?.signInWithEthereum) === null || i === void 0 ? void 0 : i.chainId;
          if (!B) {
            let X = await S.request({ method: 'eth_chainId' });
            B = Fu(X);
          }
          let Ne = {
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
          ((p = ju(Ne)), (g = await S.request({ method: 'personal_sign', params: [Uu(p), N] })));
        }
        try {
          let { data: b, error: v } = await E(
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
              xform: de,
            },
          );
          if (v) throw v;
          if (!b || !b.session || !b.user) {
            let D = new Ke();
            return this._returnResult({ data: { user: null, session: null }, error: D });
          }
          return (
            b.session &&
              (await this._saveSession(b.session),
              await this._notifyAllSubscribers('SIGNED_IN', b.session)),
            this._returnResult({ data: Object.assign({}, b), error: v })
          );
        } catch (b) {
          if (_(b)) return this._returnResult({ data: { user: null, session: null }, error: b });
          throw b;
        }
      }
      async signInWithSolana(e) {
        var r, i, s, o, a, c, l, u, d, h, f, p;
        let g, b;
        if ('message' in e) ((g = e.message), (b = e.signature));
        else {
          let { chain: v, wallet: D, statement: w, options: S } = e,
            P;
          if (W())
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
          let q = new URL((r = S?.url) !== null && r !== void 0 ? r : window.location.href);
          if ('signIn' in P && P.signIn) {
            let N = await P.signIn(
                Object.assign(
                  Object.assign(
                    Object.assign({ issuedAt: new Date().toISOString() }, S?.signInWithSolana),
                    { version: '1', domain: q.host, uri: q.href },
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
                (b = B.signature));
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
              `${q.host} wants you to sign in with your Solana account:`,
              P.publicKey.toBase58(),
              ...(w ? ['', w, ''] : ['']),
              'Version: 1',
              `URI: ${q.href}`,
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
            b = N;
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
                { chain: 'solana', message: g, signature: Je(b) },
                !((f = e.options) === null || f === void 0) && f.captchaToken
                  ? {
                      gotrue_meta_security: {
                        captcha_token:
                          (p = e.options) === null || p === void 0 ? void 0 : p.captchaToken,
                      },
                    }
                  : null,
              ),
              xform: de,
            },
          );
          if (D) throw D;
          if (!v || !v.session || !v.user) {
            let w = new Ke();
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
        let r = await xe(this.storage, `${this.storageKey}-code-verifier`),
          [i, s] = (r ?? '').split('/');
        try {
          if (!i && this.flowType === 'pkce') throw new Gi();
          let { data: o, error: a } = await E(
            this.fetch,
            'POST',
            `${this.url}/token?grant_type=pkce`,
            { headers: this.headers, body: { auth_code: e, code_verifier: i }, xform: de },
          );
          if ((await V(this.storage, `${this.storageKey}-code-verifier`), a)) throw a;
          if (!o || !o.session || !o.user) {
            let c = new Ke();
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
          if ((await V(this.storage, `${this.storageKey}-code-verifier`), _(o)))
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
              xform: de,
            }),
            { data: l, error: u } = c;
          if (u) return this._returnResult({ data: { user: null, session: null }, error: u });
          if (!l || !l.session || !l.user) {
            let d = new Ke();
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
            this.flowType === 'pkce' && ([u, d] = await Dt(this.storage, this.storageKey));
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
          throw new _t('You must provide either an email or phone number.');
        } catch (c) {
          if ((await V(this.storage, `${this.storageKey}-code-verifier`), _(c)))
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
            xform: de,
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
          this.flowType === 'pkce' && ([c, l] = await Dt(this.storage, this.storageKey));
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
            xform: Mu,
          });
          return (
            !((o = u.data) === null || o === void 0) &&
              o.url &&
              W() &&
              !(!((a = e.options) === null || a === void 0) && a.skipBrowserRedirect) &&
              window.location.assign(u.data.url),
            this._returnResult(u)
          );
        } catch (c) {
          if ((await V(this.storage, `${this.storageKey}-code-verifier`), _(c)))
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
          throw new _t('You must provide either an email or phone number and a type');
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
            r = await xe(this.storage, this.storageKey);
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
          let i = e.expires_at ? e.expires_at * 1e3 - Date.now() < Vi : !1;
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
              let a = await xe(this.userStorage, this.storageKey + '-user');
              a?.user ? (e.user = a.user) : (e.user = Xi());
            }
            if (this.storage.isServer && e.user && !e.user.__isUserNotAvailableProxy) {
              let a = { value: this.suppressGetSessionWarning };
              ((e.user = xu(e.user, a)), a.value && (this.suppressGetSessionWarning = !0));
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
                xform: Me,
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
                      xform: Me,
                    });
              });
        } catch (r) {
          if (_(r))
            return (
              Er(r) &&
                (await this._removeSession(),
                await V(this.storage, `${this.storageKey}-code-verifier`)),
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
              ([c, l] = await Dt(this.storage, this.storageKey));
            let { data: u, error: d } = await E(this.fetch, 'PUT', `${this.url}/user`, {
              headers: this.headers,
              redirectTo: r?.emailRedirectTo,
              body: Object.assign(Object.assign({}, e), {
                code_challenge: c,
                code_challenge_method: l,
              }),
              jwt: a.access_token,
              xform: Me,
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
          if ((await V(this.storage, `${this.storageKey}-code-verifier`), _(i)))
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
            { payload: a } = Dr(e.access_token);
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
          if (!W()) throw new wt('No browser detected.');
          if (e.error || e.error_description || e.error_code)
            throw new wt(e.error_description || 'Error in URL with unspecified error_description', {
              error: e.error || 'unspecified_error',
              code: e.error_code || 'unspecified_code',
            });
          switch (r) {
            case 'implicit':
              if (this.flowType === 'pkce') throw new yr('Not a valid PKCE flow url.');
              break;
            case 'pkce':
              if (this.flowType === 'implicit')
                throw new wt('Not a valid implicit grant flow url.');
              break;
            default:
          }
          if (r === 'pkce') {
            if ((this._debug('#_initialize()', 'begin', 'is PKCE flow', !0), !e.code))
              throw new yr('No code detected.');
            let { data: S, error: P } = await this._exchangeCodeForSession(e.code);
            if (P) throw P;
            let q = new URL(window.location.href);
            return (
              q.searchParams.delete('code'),
              window.history.replaceState(window.history.state, '', q.toString()),
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
          if (!a || !l || !c || !d) throw new wt('No session defined in URL');
          let h = Math.round(Date.now() / 1e3),
            f = parseInt(l),
            p = h + f;
          u && (p = parseInt(u));
          let g = p - h;
          g * 1e3 <= We &&
            console.warn(
              `@supabase/gotrue-js: Session as retrieved from URL expires in ${g}s, should have been closer to ${f}s`,
            );
          let b = p - f;
          h - b >= 120
            ? console.warn(
                '@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale',
                b,
                p,
                h,
              )
            : h - b < 0 &&
              console.warn(
                '@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew',
                b,
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
        let r = await xe(this.storage, `${this.storageKey}-code-verifier`);
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
          if (o && !Er(o)) return this._returnResult({ error: o });
          let a = (i = s.session) === null || i === void 0 ? void 0 : i.access_token;
          if (a) {
            let { error: c } = await this.admin.signOut(a, e);
            if (
              c &&
              !((gu(c) && (c.status === 404 || c.status === 401 || c.status === 403)) || Er(c))
            )
              return this._returnResult({ error: c });
          }
          return (
            e !== 'others' &&
              (await this._removeSession(),
              await V(this.storage, `${this.storageKey}-code-verifier`)),
            this._returnResult({ error: null })
          );
        });
      }
      onAuthStateChange(e) {
        let r = Du(),
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
              Er(o) ? console.warn(o) : console.error(o));
          }
        });
      }
      async resetPasswordForEmail(e, r = {}) {
        let i = null,
          s = null;
        this.flowType === 'pkce' && ([i, s] = await Dt(this.storage, this.storageKey, true));
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
          if ((await V(this.storage, `${this.storageKey}-code-verifier`), _(o)))
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
            W() &&
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
                xform: de,
              }),
              { data: f, error: p } = h;
            return p
              ? this._returnResult({ data: { user: null, session: null }, error: p })
              : !f || !f.session || !f.user
                ? this._returnResult({ data: { user: null, session: null }, error: new Ke() })
                : (f.session &&
                    (await this._saveSession(f.session),
                    await this._notifyAllSubscribers('USER_UPDATED', f.session)),
                  this._returnResult({ data: f, error: p }));
          } catch (s) {
            if ((await V(this.storage, `${this.storageKey}-code-verifier`), _(s)))
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
          return await Au(
            async (s) => (
              s > 0 && (await Ru(200 * Math.pow(2, s - 1))),
              this._debug(r, 'refreshing attempt', s),
              await E(this.fetch, 'POST', `${this.url}/token?grant_type=refresh_token`, {
                body: { refresh_token: e },
                headers: this.headers,
                xform: de,
              })
            ),
            (s, o) => {
              let a = 200 * Math.pow(2, s);
              return o && Wi(o) && Date.now() + a - i < We;
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
          W() && !r.skipBrowserRedirect && window.location.assign(i),
          { data: { provider: e, url: i }, error: null }
        );
      }
      async _recoverAndRefresh() {
        var e, r;
        let i = '#_recoverAndRefresh()';
        this._debug(i, 'begin');
        try {
          let s = await xe(this.storage, this.storageKey);
          if (s && this.userStorage) {
            let a = await xe(this.userStorage, this.storageKey + '-user');
            (!this.storage.isServer &&
              Object.is(this.storage, this.userStorage) &&
              !a &&
              ((a = { user: s.user }), await St(this.userStorage, this.storageKey + '-user', a)),
              (s.user = (e = a?.user) !== null && e !== void 0 ? e : Xi()));
          } else if (s && !s.user && !s.user) {
            let a = await xe(this.storage, this.storageKey + '-user');
            a && a?.user
              ? ((s.user = a.user),
                await V(this.storage, this.storageKey + '-user'),
                await St(this.storage, this.storageKey, s))
              : (s.user = Xi());
          }
          if ((this._debug(i, 'session from storage', s), !this._isValidSession(s))) {
            (this._debug(i, 'session is not valid'), s !== null && (await this._removeSession()));
            return;
          }
          let o = ((r = s.expires_at) !== null && r !== void 0 ? r : 1 / 0) * 1e3 - Date.now() < Vi;
          if ((this._debug(i, `session has${o ? '' : ' not'} expired with margin of ${Vi}s`), o)) {
            if (this.autoRefreshToken && s.refresh_token) {
              let { error: a } = await this._callRefreshToken(s.refresh_token);
              a &&
                (bu(a)
                  ? this._debug(i, 'refresh discarded by commit guard', a)
                  : (console.error(a),
                    Wi(a) ||
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
          this.refreshingDeferred = new Sr();
          let o = await xe(this.storage, this.storageKey),
            { data: a, error: c } = await this._refreshAccessToken(e);
          if (c) throw c;
          if (!a.session) throw new z();
          let l = await xe(this.storage, this.storageKey);
          if (o !== null && (l === null || l.refresh_token !== o.refresh_token)) {
            this._debug(
              s,
              'commit guard: storage changed since refresh started, discarding rotated tokens',
              { startedWith: 'present', nowHolds: l ? 'replaced' : 'cleared' },
            );
            let f = { data: null, error: new _r() };
            return (this.refreshingDeferred.resolve(f), f);
          }
          let d = this._sessionRemovalEpoch;
          if ((await this._saveSession(a.session), this._sessionRemovalEpoch !== d)) {
            (this._debug(
              s,
              'commit guard (post-save): _removeSession ran during _saveSession, undoing write',
            ),
              await V(this.storage, this.storageKey),
              this.userStorage && (await V(this.userStorage, this.storageKey + '-user')));
            let f = { data: null, error: new _r() };
            return (this.refreshingDeferred.resolve(f), f);
          }
          await this._notifyAllSubscribers('TOKEN_REFRESHED', a.session);
          let h = { data: a.session, error: null };
          return (this.refreshingDeferred.resolve(h), h);
        } catch (o) {
          if ((this._debug(s, 'error', o), _(o))) {
            let a = { data: null, error: o };
            return (
              Wi(o) || (await this._removeSession()),
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
          await V(this.storage, `${this.storageKey}-code-verifier`));
        let r = Object.assign({}, e),
          i = r.user && r.user.__isUserNotAvailableProxy === true;
        if (this.userStorage) {
          !i && r.user && (await St(this.userStorage, this.storageKey + '-user', { user: r.user }));
          let s = Object.assign({}, r);
          delete s.user;
          let o = zo(s);
          await St(this.storage, this.storageKey, o);
        } else {
          let s = zo(r);
          await St(this.storage, this.storageKey, s);
        }
      }
      async _removeSession() {
        ((this._sessionRemovalEpoch += 1),
          this._debug('#_removeSession()'),
          (this.suppressGetSessionWarning = false),
          await V(this.storage, this.storageKey),
          await V(this.storage, this.storageKey + '-code-verifier'),
          await V(this.storage, this.storageKey + '-user'),
          this.userStorage && (await V(this.userStorage, this.storageKey + '-user')),
          await this._notifyAllSubscribers('SIGNED_OUT', null));
      }
      _removeVisibilityChangedCallback() {
        this._debug('#_removeVisibilityChangedCallback()');
        let e = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
          e &&
            W() &&
            window?.removeEventListener &&
            window.removeEventListener('visibilitychange', e);
        } catch (r) {
          console.error('removing visibilitychange callback failed', r);
        }
      }
      async _startAutoRefresh() {
        (await this._stopAutoRefresh(), this._debug('#_startAutoRefresh()'));
        let e = setInterval(() => this._autoRefreshTokenTick(), We);
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
                    let s = Math.floor((i.expires_at * 1e3 - e) / We);
                    (this._debug(
                      '#_autoRefreshTokenTick()',
                      `access token expires in ${s} ticks, a tick lasts ${We}ms, refresh threshold is ${dn} ticks`,
                    ),
                      s <= dn && (await this._callRefreshToken(i.refresh_token)));
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
            if (e instanceof Qi) this._debug('auto refresh token tick lock not available');
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
              let s = Math.floor((i.expires_at * 1e3 - e) / We);
              (this._debug(
                '#_autoRefreshTokenTick()',
                `access token expires in ${s} ticks, a tick lasts ${We}ms, refresh threshold is ${dn} ticks`,
              ),
                s <= dn && (await this._callRefreshToken(i.refresh_token)));
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
        if ((this._debug('#_handleVisibilityChange()'), !W() || !window?.addEventListener))
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
          let [o, a] = await Dt(this.storage, this.storageKey),
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
                              ? Xo(e.webauthn.credential_response)
                              : Zo(e.webauthn.credential_response),
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
                          { publicKey: Jo(l.webauthn.credential_options.publicKey) },
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
                          { publicKey: Yo(l.webauthn.credential_options.publicKey) },
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
            let { payload: p } = Dr(e),
              g = null;
            p.aal && (g = p.aal);
            let b = g,
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
            ).length > 0 && (b = 'aal2');
            let S = p.amr || [];
            return {
              data: { currentLevel: g, nextLevel: b, currentAuthenticationMethods: S },
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
        let { payload: l } = Dr(a.access_token),
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
                W() &&
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
                W() &&
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
        if (((i = this.jwks.keys.find((c) => c.kid === e)), i && this.jwks_cached_at + mu > s))
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
          } = Dr(i);
          if (!r?.allowExpired)
            try {
              ku(o.exp);
            } catch (p) {
              throw new lt$1(p instanceof Error ? p.message : 'JWT validation failed');
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
          let d = Ou(s.alg),
            h = await crypto.subtle.importKey('jwk', u, d, !0, ['verify']);
          if (!(await crypto.subtle.verify(d, h, a, Eu(`${c}.${l}`))))
            throw new lt$1('Invalid JWT signature');
          return { data: { claims: o, header: s, signature: a }, error: null };
        } catch (i) {
          if (_(i)) return this._returnResult({ data: null, error: i });
          throw i;
        }
      }
      async signInWithPasskey(e) {
        var r, i, s;
        ue(this.experimental);
        try {
          if (!Tr())
            return this._returnResult({
              data: null,
              error: new Y('Browser does not support WebAuthn', null),
            });
          let { data: o, error: a } = await this._startPasskeyAuthentication({
            options: {
              captchaToken: (r = e?.options) === null || r === void 0 ? void 0 : r.captchaToken,
            },
          });
          if (a || !o) return this._returnResult({ data: null, error: a });
          let c = Yo(o.options),
            l =
              (s = (i = e?.options) === null || i === void 0 ? void 0 : i.signal) !== null &&
              s !== void 0
                ? s
                : ns.createNewAbortSignal(),
            { data: u, error: d } = await ea({ publicKey: c, signal: l });
          if (d || !u)
            return this._returnResult({
              data: null,
              error: d ?? new Y('WebAuthn ceremony failed', null),
            });
          let h = Zo(u);
          return this._verifyPasskeyAuthentication({ challengeId: o.challenge_id, credential: h });
        } catch (o) {
          if (_(o)) return this._returnResult({ data: null, error: o });
          throw o;
        }
      }
      async registerPasskey(e) {
        var r, i;
        ue(this.experimental);
        try {
          if (!Tr())
            return this._returnResult({
              data: null,
              error: new Y('Browser does not support WebAuthn', null),
            });
          let { data: s, error: o } = await this._startPasskeyRegistration();
          if (o || !s) return this._returnResult({ data: null, error: o });
          let a = Jo(s.options),
            c =
              (i = (r = e?.options) === null || r === void 0 ? void 0 : r.signal) !== null &&
              i !== void 0
                ? i
                : ns.createNewAbortSignal(),
            { data: l, error: u } = await Qo({ publicKey: a, signal: c });
          if (u || !l)
            return this._returnResult({
              data: null,
              error: u ?? new Y('WebAuthn ceremony failed', null),
            });
          let d = Xo(l);
          return this._verifyPasskeyRegistration({ challengeId: s.challenge_id, credential: d });
        } catch (s) {
          if (_(s)) return this._returnResult({ data: null, error: s });
          throw s;
        }
      }
      async _startPasskeyRegistration() {
        ue(this.experimental);
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
        ue(this.experimental);
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
        ue(this.experimental);
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
        ue(this.experimental);
        try {
          let { data: r, error: i } = await E(
            this.fetch,
            'POST',
            `${this.url}/passkeys/authentication/verify`,
            {
              headers: this.headers,
              body: { challenge_id: e.challengeId, credential: e.credential },
              xform: de,
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
        ue(this.experimental);
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
        ue(this.experimental);
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
        ue(this.experimental);
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
  ta = Cm;
var Rm = ta,
  na = Rm;
var Am = '2.107.0',
  Cr = '',
  ss;
typeof Deno < 'u'
  ? ((Cr = 'deno'), (ss = (rs = Deno.version) === null || rs === void 0 ? void 0 : rs.deno))
  : typeof document < 'u'
    ? (Cr = 'web')
    : typeof navigator < 'u' && navigator.product === 'ReactNative'
      ? (Cr = 'react-native')
      : ((Cr = 'node'),
        (ss =
          typeof process < 'u'
            ? (is = process.version) === null || is === void 0
              ? void 0
              : is.replace(/^v/, '')
            : void 0));
var rs,
  is,
  Vu = [`runtime=${Cr}`];
ss && Vu.push(`runtime-version=${ss}`);
var Im = { 'X-Client-Info': `supabase-js/${Am}; ${Vu.join('; ')}` },
  km = { headers: Im },
  Om = { schema: 'public' },
  xm = {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'implicit',
  },
  Pm = {},
  Mm = { enabled: false, respectSamplingDecision: true };
function Nm(n, t, e, r) {
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
var ra = null,
  Lm = '@opentelemetry/api';
function Fm() {
  return (ra === null && (ra = import(Lm).catch(() => null)), ra);
}
function Um() {
  return Nm(this, void 0, void 0, function* () {
    try {
      let n = yield Fm();
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
function jm(n) {
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
function Bm(n, t) {
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
        if ($m(e.hostname, r)) return !0;
      } else if (r instanceof RegExp) {
        if (r.test(e.hostname)) return !0;
      } else if (typeof r == 'function' && r(e)) return !0;
    } catch {
      continue;
    }
  return false;
}
function $m(n, t) {
  if (t === n) return true;
  if (t.startsWith('*.')) {
    let e = t.slice(2);
    if (n.endsWith(e) && (n === e || n.endsWith('.' + e))) return true;
  }
  return false;
}
function zm(n) {
  let t = [];
  try {
    let e = new URL(n);
    t.push(e.hostname);
  } catch {}
  return (t.push('*.supabase.co', '*.supabase.in'), t.push('localhost', '127.0.0.1', '[::1]'), t);
}
function Rr(n) {
  '@babel/helpers - typeof';
  return (
    (Rr =
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
    Rr(n)
  );
}
function Hm(n, t) {
  if (Rr(n) != 'object' || !n) return n;
  var e = n[Symbol.toPrimitive];
  if (e !== void 0) {
    var r = e.call(n, t);
    if (Rr(r) != 'object') return r;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return (t === 'string' ? String : Number)(n);
}
function Vm(n) {
  var t = Hm(n, 'string');
  return Rr(t) == 'symbol' ? t : t + '';
}
function qm(n, t, e) {
  return (
    (t = Vm(t)) in n
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
function zu(n, t) {
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
      ? zu(Object(e), true).forEach(function (r) {
          qm(n, r, e[r]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(e))
        : zu(Object(e)).forEach(function (r) {
            Object.defineProperty(n, r, Object.getOwnPropertyDescriptor(e, r));
          });
  }
  return n;
}
var Gm = (n) => (n ? (...t) => n(...t) : (...t) => fetch(...t)),
  Wm = () => Headers,
  Km = (n, t, e, r, i) => {
    let s = Gm(r),
      o = Wm(),
      a = i?.enabled === true,
      c = i?.respectSamplingDecision !== false,
      l = a ? zm(t) : null;
    return async (u, d) => {
      var h;
      let f = (h = await e()) !== null && h !== void 0 ? h : n,
        p = new o(d?.headers);
      if (
        (p.has('apikey') || p.set('apikey', n),
        p.has('Authorization') || p.set('Authorization', `Bearer ${f}`),
        l)
      ) {
        let g = await Jm(u, l, c);
        g &&
          (g.traceparent && !p.has('traceparent') && p.set('traceparent', g.traceparent),
          g.tracestate && !p.has('tracestate') && p.set('tracestate', g.tracestate),
          g.baggage && !p.has('baggage') && p.set('baggage', g.baggage));
      }
      return s(u, H(H({}, d), {}, { headers: p }));
    };
  };
async function Jm(n, t, e) {
  if (!Bm(typeof n == 'string' || n instanceof URL ? n : n.url, t)) return null;
  let r = await Um();
  if (!r || !r.traceparent) return null;
  if (e) {
    let i = jm(r.traceparent);
    if (i && !i.isSampled) return null;
  }
  return r;
}
function Hu(n) {
  return typeof n == 'boolean' ? { enabled: n } : n;
}
function Ym(n) {
  return n.endsWith('/') ? n : n + '/';
}
function Xm(n, t) {
  var e, r, i, s, o, a;
  let { db: c, auth: l, realtime: u, global: d } = n,
    { db: h, auth: f, realtime: p, global: g } = t,
    b = Hu(n.tracePropagation),
    v = Hu(t.tracePropagation),
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
          (i = (s = b?.enabled) !== null && s !== void 0 ? s : v?.enabled) !== null && i !== void 0
            ? i
            : false,
        respectSamplingDecision:
          (o =
            (a = b?.respectSamplingDecision) !== null && a !== void 0
              ? a
              : v?.respectSamplingDecision) !== null && o !== void 0
            ? o
            : true,
      },
      accessToken: async () => '',
    };
  return (n.accessToken ? (D.accessToken = n.accessToken) : delete D.accessToken, D);
}
function Zm(n) {
  let t = n?.trim();
  if (!t) throw new Error('supabaseUrl is required.');
  if (!t.match(/^https?:\/\//i))
    throw new Error('Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.');
  try {
    return new URL(Ym(t));
  } catch {
    throw Error('Invalid supabaseUrl: Provided URL is malformed.');
  }
}
var Qm = class extends na {
    constructor(n) {
      super(n);
    }
  },
  eg = class {
    constructor(n, t, e) {
      var r, i;
      ((this.supabaseUrl = n), (this.supabaseKey = t));
      let s = Zm(n);
      if (!t) throw new Error('supabaseKey is required.');
      ((this.realtimeUrl = new URL('realtime/v1', s)),
        (this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace('http', 'ws')),
        (this.authUrl = new URL('auth/v1', s)),
        (this.storageUrl = new URL('storage/v1', s)),
        (this.functionsUrl = new URL('functions/v1', s)));
      let o = `sb-${s.hostname.split('.')[0]}-auth-token`,
        a = {
          db: Om,
          realtime: Pm,
          auth: H(H({}, xm), {}, { storageKey: o }),
          global: km,
          tracePropagation: Mm,
        },
        c = Xm(e ?? {}, a);
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
      ((this.fetch = Km(t, n, this._getAccessToken.bind(this), c.global.fetch, c.tracePropagation)),
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
        (this.rest = new $l(new URL('rest/v1', s).href, {
          headers: this.headers,
          schema: c.db.schema,
          fetch: this.fetch,
          timeout: c.db.timeout,
          urlLengthLimit: c.db.urlLengthLimit,
        })),
        (this.storage = new uu(this.storageUrl.href, this.headers, this.fetch, e?.storage)),
        c.accessToken || this._listenForAuthEvents());
    }
    get functions() {
      return new sr(this.functionsUrl.href, { headers: this.headers, customFetch: this.fetch });
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
      return new Qm({
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
          (b) => b.toLowerCase() === 'authorization',
        ),
      });
    }
    _initRealtimeClient(n) {
      return new hr(
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
  qu = (n, t, e) => new eg(n, t, e);
function tg() {
  if (typeof window < 'u') return false;
  let n = globalThis.process;
  if (!n) return false;
  let t = n.version;
  if (t == null) return false;
  let e = t.match(/^v(\d+)\./);
  return e ? parseInt(e[1], 10) <= 18 : false;
}
tg() &&
  console.warn(
    '\u26A0\uFE0F  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217',
  );
var Gu = class n {
  client;
  projectId = 'pskgaxfcwrutoqfuzhye';
  constructor() {
    this.client = qu(
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
  service = E$1(Gu);
  logger = E$1(sl);
  supabase = this.service.getSupabaseClient();
  projectId = this.service.getProjectId();
  currentUser = _e(null);
  jwtToken = _e('');
  userRoles = ot$1(() => l(this.jwtToken())?.app_metadata?.roles || []);
  isLoggedIn = ot$1(() => !!this.currentUser());
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
      loadComponent: () => import('./chunk-BX3VZtB-.js').then((t) => t.Landing),
    },
    {
      path: o.urlPaths.Signin,
      loadComponent: () => import('./chunk-AXMnmkXr.js').then((t) => t.Signin),
    },
    {
      path: o.urlPaths.Signup,
      loadComponent: () => import('./chunk-VBkIzSk3.js').then((t) => t.Signup),
    },
  ],
  v = [
    {
      path: o.urlPaths.ChorusDashboard,
      loadComponent: () => import('./chunk-DVOGmVnL.js').then((t) => t.ChorusDashboard),
    },
  ],
  P = [...S, ...v];
var et = { providers: [Ah$1(), _f(P, Rf())] };
var it = ['*', [['mat-toolbar-row']]],
  lt = ['*', 'mat-toolbar-row'],
  st = (() => {
    class t {
      static ɵfac = function (o) {
        return new (o || t)();
      };
      static ɵdir = Mv({
        type: t,
        selectors: [['mat-toolbar-row']],
        hostAttrs: [1, 'mat-toolbar-row'],
        exportAs: ['matToolbarRow'],
      });
    }
    return t;
  })(),
  nt = (() => {
    class t {
      _elementRef = E$1(Jn$1);
      _platform = E$1(Ae);
      _document = E$1(Xt$1);
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
      static ɵfac = function (o) {
        return new (o || t)();
      };
      static ɵcmp = Tv({
        type: t,
        selectors: [['mat-toolbar']],
        contentQueries: function (o, n, rt) {
          if ((o & 1 && If$1(rt, st, 5), o & 2)) {
            let C;
            Jv((C = Xv())) && (n._toolbarRows = C);
          }
        },
        hostAttrs: [1, 'mat-toolbar'],
        hostVars: 6,
        hostBindings: function (o, n) {
          o & 2 &&
            (fE(n.color ? 'mat-' + n.color : ''),
            _f$1('mat-toolbar-multiple-rows', n._toolbarRows.length > 0)(
              'mat-toolbar-single-row',
              n._toolbarRows.length === 0,
            ));
        },
        inputs: { color: 'color' },
        exportAs: ['matToolbar'],
        ngContentSelectors: lt,
        decls: 2,
        vars: 0,
        template: function (o, n) {
          o & 1 && (Zv(it), Yv(0), Yv(1, 1));
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
    return t;
  })();
var at = (() => {
  class t {
    static ɵfac = function (o) {
      return new (o || t)();
    };
    static ɵmod = Cv({ type: t });
    static ɵinj = Bc$1({ imports: [Xt] });
  }
  return t;
})();
function pt(t, l) {
  if (t & 1) {
    let e = qv();
    (Lo$1(0, 'button', 3)(1, 'mat-icon'),
      CE(2, 'settings'),
      Fa(),
      CE(3, ' Settings '),
      Fa(),
      Lo$1(4, 'a', 4),
      vf('click', function () {
        hl$1(e);
        let n = zv(2);
        return gl$1(n.logOut());
      }),
      Lo$1(5, 'button', 5),
      vf('click', function () {
        hl$1(e);
        let n = zv(2);
        return gl$1(n.logOut());
      }),
      Lo$1(6, 'mat-icon'),
      CE(7, 'person'),
      Fa(),
      CE(8, ' Log Out '),
      Fa()());
  }
  if (t & 2) {
    let e = zv(2);
    (Cm$1(4), ff$1('href', SE(e.appRoutesHelper.urlPaths.Home), om$1));
  }
}
function dt(t, l) {
  if (
    (t & 1 &&
      (Lo$1(0, 'a', 6)(1, 'button', 3)(2, 'mat-icon'),
      CE(3, 'person'),
      Fa(),
      CE(4, ' Log In '),
      Fa()(),
      Lo$1(5, 'a', 6)(6, 'button', 7),
      CE(7, 'Sign Up'),
      Fa()()),
    t & 2)
  ) {
    let e = zv(2);
    (ff$1('href', SE(e.appRoutesHelper.urlPaths.Signin), om$1),
      Cm$1(5),
      ff$1('href', SE(e.appRoutesHelper.urlPaths.Signup), om$1));
  }
}
function ut(t, l) {
  if (
    (t & 1 &&
      (Lo$1(0, 'mat-toolbar', 0),
      pf$1(1, 'img', 1),
      Lo$1(2, 'span'),
      CE(3, 'Repeat With Me'),
      Fa(),
      pf$1(4, 'span', 2),
      $v(5, pt, 9, 2)(6, dt, 8, 4),
      Lo$1(7, 'span'),
      CE(8),
      Fa()()),
    t & 2)
  ) {
    let e = zv();
    (Cm$1(5), Uv(e.isLoggedIn() ? 5 : 6), Cm$1(3), Ha$1('Logged in: ', e.isLoggedIn()));
  }
}
var g = class t {
  router = E$1(_i);
  authService = E$1(m);
  currentUser = this.authService.currentUser;
  isLoggedIn = this.authService.isLoggedIn;
  userRoles = this.authService.userRoles;
  appRoutesHelper = o;
  logOut() {
    this.authService.signOut();
  }
  isCurrentPathPartOfAuthFlow = ot$1(() => {
    let e =
      this.router.lastSuccessfulNavigation()?.finalUrl?.toString().slice(1) ?? this.router.url;
    return this.appRoutesHelper.authFlowPaths.map(String).includes(e);
  });
  static ɵfac = function (e) {
    return new (e || t)();
  };
  static ɵcmp = Tv({
    type: t,
    selectors: [['app-navbar']],
    decls: 1,
    vars: 1,
    consts: [
      ['color', 'primary'],
      ['src', 'favicon-32x32.png', 'alt', 'Company Logo', 1, 'navbar-logo'],
      [1, 'navbar-spacer'],
      ['matButton', 'tonal', 1, 'navbar-button'],
      [3, 'click', 'href'],
      ['matButton', 'tonal', 1, 'navbar-button', 3, 'click'],
      [3, 'href'],
      ['matButton', 'filled', 1, 'navbar-button'],
    ],
    template: function (e, o) {
      (e & 1 && $v(0, ut, 9, 2, 'mat-toolbar', 0),
        e & 2 && Uv(o.isCurrentPathPartOfAuthFlow() ? -1 : 0));
    },
    dependencies: [rw, nw, at, nt, J0, K0],
    styles: [
      '.navbar-spacer[_ngcontent-%COMP%]{flex:1 1 auto}.navbar-button[_ngcontent-%COMP%]{margin:0 .5rem}',
    ],
  });
};
var h = class t {
  title = _e('repeat-with-me');
  static ɵfac = function (e) {
    return new (e || t)();
  };
  static ɵcmp = Tv({
    type: t,
    selectors: [['app-root']],
    decls: 2,
    vars: 0,
    template: function (e, o) {
      e & 1 && pf$1(0, 'app-navbar')(1, 'router-outlet');
    },
    dependencies: [lo, g],
    encapsulation: 2,
    changeDetection: 1,
  });
};
fd(h, et).catch((t) => console.error(t));
export {
  $v as $,
  Af as A,
  Bc$1 as B,
  CE as C,
  De$1 as D,
  E$1 as E,
  Fa as F,
  Mf as G,
  Ha$1 as H,
  ws as I,
  J0 as J,
  K0 as K,
  Lo$1 as L,
  Mv as M,
  N,
  Yp$1 as O,
  Py as P,
  pt$2 as Q,
  Ry as R,
  SE as S,
  Tv as T,
  Uv as U,
  Va$1 as V,
  zp$1 as W,
  Xt as X,
  Yv as Y,
  Zv as Z,
  _i as _,
  _e as a,
  Dn as a0,
  Jp$1 as a1,
  Vp$1 as a2,
  gO as a3,
  Zu as a4,
  af$1 as a5,
  RE as a6,
  wf$1 as a7,
  Df$1 as a8,
  eE as a9,
  Rf$1 as aA,
  kf$1 as aB,
  _o as aC,
  xe$1 as aD,
  kl as aE,
  qf$1 as aF,
  w0 as aG,
  Gu as aH,
  ee as aI,
  Uw as aJ,
  Vr$1 as aK,
  NE as aL,
  am$1 as aM,
  V$1 as aN,
  j$1 as aO,
  zo$1 as aP,
  of$1 as aQ,
  vg as aR,
  de$1 as aS,
  Sv as aT,
  ne$1 as aU,
  jp$1 as aV,
  Ue as aW,
  je$1 as aX,
  C as aY,
  Ra as aZ,
  Ee$1 as a_,
  Jv as aa,
  Xv as ab,
  Tf$1 as ac,
  If$1 as ad,
  mf$1 as ae,
  Sy as af,
  Jw as ag,
  Vn$1 as ah,
  eg$1 as ai,
  pO as aj,
  df$1 as ak,
  Pl as al,
  Q as am,
  hf$1 as an,
  tE as ao,
  zn$1 as ap,
  Xn as aq,
  dt$1 as ar,
  at$1 as as,
  Kn$1 as at,
  x as au,
  Qp$1 as av,
  OE as aw,
  aO as ax,
  sm$1 as ay,
  jE as az,
  Cm$1 as b,
  om$1 as c,
  Cv as d,
  _f$1 as e,
  ff$1 as f,
  Lw as g,
  Jn$1 as h,
  dO as i,
  ja$1 as j,
  Ae as k,
  So as l,
  m,
  nw as n,
  o,
  pf$1 as p,
  cO as q,
  rw as r,
  sl as s,
  ot$1 as t,
  lO as u,
  vf as v,
  c0 as w,
  J$1 as x,
  en as y,
  zv as z,
};
