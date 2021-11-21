$(document).ready(() => {
  var t,
    w = 0,
    o = 0,
    a = document.querySelector("#scroll-outer-wrapper"),
    l = document.querySelector("#scroll-inner-wrapper"),
    n = document.querySelector("#head"),
    y = document.querySelector("#scalp"),
    b = !1,
    M = 0.4,
    E = 0,
    x = 0,
    T = document.querySelector("#scalp-bottom"),
    A = null,
    O = null,
    X = null,
    S = null,
    Y = null,
    C = document.querySelector("#face"),
    q = 800,
    D = 500,
    L = null,
    j = document.querySelector("#eyes"),
    H = document.querySelector("#content"),
    V = document.querySelectorAll("#intro, #outro, .project"),
    I = V.length,
    P = document.querySelectorAll(".project"),
    W = P.length,
    e = document.querySelectorAll(".project .image-container"),
    r = e.length,
    k = document.querySelectorAll(".project > .title"),
    Q = k.length,
    R = 30,
    B = 2e3,
    N = 3e3,
    i = "bored",
    s = null,
    F = performance.now(),
    z = F,
    c = a,
    d = a,
    G = !0,
    J = pt(),
    K = J,
    U = 0,
    u = !1,
    m = !1,
    p = 0,
    v = 0,
    f = null,
    h = 100,
    g = !0,
    _ = (function () {
      var t = !1;
      try {
        var e = Object.defineProperty({}, "passive", {
          get: function () {
            t = !0;
          },
        });
        window.addEventListener("testPassive", null, e),
          window.removeEventListener("testPassive", null, e);
      } catch (t) {}
      return t;
    })(),
    Z =
      "onwheel" in document.createElement("div")
        ? "wheel"
        : void 0 !== document.onmousewheel
        ? "mousewheel"
        : "DOMMouseScroll";
  (((t = document.createElement("a").style).cssText = "pointer-events:auto"),
  "auto" === t.pointerEvents) ||
    ((document.documentElement.className += " no-css-pointer-events-support"),
    (c = window),
    (d = document.documentElement));

  for (var nt = !0, rt = 0; rt < W; rt++) {
    var it = P[rt];
    (it._active = !1),
      (it._transitioning = !1),
      (it._targetOffsetX = (0.3 + 0.2 * Math.random()) * (nt ? -1 : 1)),
      (it._targetOffsetXMultiplier = 1),
      (nt = !nt);
  }
  for (var ot = 0; ot < r; ot++)
    e[ot].addEventListener("click", ht),
      e[ot].addEventListener(Z, gt, !("wheel" != Z || !_) && { passive: !0 }),
      e[ot].addEventListener("pointerdown", _t);
  document.addEventListener(
    "pointermove",
    function (t) {
      u &&
        ((d.scrollTop = v + (p - t.clientY)),
        !m &&
          10 < Math.abs(p - t.clientY) &&
          ((m = !0),
          document.body.setAttribute("data-project-dragging", "true")));
    },
    !!_ && { passive: !0 }
  ),
    document.addEventListener("pointerup", wt, !!_ && { passive: !0 }),
    document.addEventListener("pointerleave", wt, !!_ && { passive: !0 });

  var st = "IntersectionObserver" in window;
  if (st)
    for (
      var ct = new IntersectionObserver(
          function (t, e) {
            for (var n = t.length, r = 0; r < n; r++)
              0 < t[r].intersectionRatio
                ? ((t[r].target._inViewport = !0),
                  t[r].target.setAttribute("data-in-viewport", "true"))
                : ((t[r].target._inViewport = !1),
                  t[r].target.setAttribute("data-in-viewport", "false"));
          },
          { root: null, rootMargin: "15%", threshold: 0 }
        ),
        dt = 0;
      dt < I;
      dt++
    )
      ct.observe(V[dt]);
  function ut(t) {
    (o = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )),
      (w = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      ));
    var e = 0.01 * Math.min(o, w);
    document.documentElement.style.setProperty("--vmin", e + "px");
    var n = 0.01 * w;
    document.documentElement.style.setProperty("--vh", n + "px"),
      (document.documentElement.style.height =
        document.body.style.height =
        a.style.height =
          w - 1 + "px"),
      (l.style.height = H.offsetHeight + "px"),
      (C._cachedClientWidth = C.clientWidth),
      (C._cachedClientHeight = C.clientHeight),
      (y._cachedClientWidth = y.clientWidth),
      (y._cachedClientHeight = y.clientHeight),
      pt();
    for (var r = 0; r < W; r++) {
      var i = P[r].getBoundingClientRect();
      P[r]._bottomOffset = K + i.bottom;
    }
    yt();
  }
  function mt(t) {
    G = !0;
  }
  function pt() {
    return (J = d.scrollTop);
  }
  function vt() {
    window.clearTimeout(L), (d.scrollTop = 0);
  }
  function ft(t, e) {
    (t != i || e) && (n.setAttribute("data-emotional-state", t), (i = t));
  }
  function ht(t) {
    if ((t.preventDefault(), m)) return !1;
    var e = t.target.closest(".project"),
      n = e.getAttribute("data-active");
    n && "false" != n
      ? bt(e)
      : (function (t) {
          void 0 !== (s = t)._transitioningTimeout &&
            t._transitioningTimeout &&
            window.clearTimeout(t._transitioningTimeout);
          yt(),
            (t._active = !0),
            (t._transitioning = !0),
            t.setAttribute("data-transitioning", "true"),
            (t._transitioningTimeout = window.setTimeout(function () {
              t.setAttribute("data-active", "true");
            }, 20)),
            document.body.setAttribute("data-project-active", "true"),
            document.body.setAttribute("data-project-transitioning", "true"),
            (t.querySelector(".description__inner").scrollTop = 0),
            a.addEventListener("click", Mt);
        })(e);
  }
  function gt(t) {
    if (null !== f) return !1;
    var e = t.detail
      ? -120 * t.detail
      : t.wheelDelta
      ? t.wheelDelta
      : t.deltaY
      ? 1 * t.deltaY * -120
      : 0;
    return (
      (d.scrollTop -= (0 <= e ? 1 : -1) * w * 0.2),
      (f = setTimeout(function () {
        f = null;
      }, h)),
      !1
    );
  }
  function _t(t) {
    t.preventDefault(),
      s || ((m = !(u = !0)), (p = t.clientY), (v = d.scrollTop));
  }
  function wt(t) {
    (u = !1), document.body.setAttribute("data-project-dragging", "false");
  }
  function yt() {
    s && (d.scrollTop = s.offsetTop - 0.23 * Math.min(o, w));
  }
  function bt(t) {
    (s = null),
      (t._active = !1),
      t.setAttribute("data-active", "false"),
      (t._transitioningTimeout = window.setTimeout(function () {
        (t._transitioning = !1),
          t.setAttribute("data-transitioning", "false"),
          document.body.setAttribute("data-project-transitioning", "false");
      }, 400)),
      document.body.setAttribute("data-project-active", "false"),
      a.removeEventListener("click", Mt);
  }
  function Mt(t) {
    s &&
      t.target &&
      void 0 !== t.target.id &&
      "scroll-outer-wrapper" == t.target.id &&
      bt(s);
  }
  function Et(t, e) {
    switch (t) {
      case "easeOutElastic":
        var n,
          r = 1.5;
        return 0 === e
          ? 0
          : 1 === e
          ? 1
          : ((n =
              !r || r < 1
                ? ((r = 1), 0.075)
                : (0.3 * Math.asin(1 / r)) / (2 * Math.PI)),
            r *
              Math.pow(2, -10 * e) *
              Math.sin(((e - n) * (2 * Math.PI)) / 0.3) +
              1);
      case "easeInQuad":
        return e * e;
      case "easeOutQuad":
        return e * (2 - e);
      case "easeInOutQuad":
        return e < 0.5 ? 2 * e * e : (4 - 2 * e) * e - 1;
    }
  }
  window.addEventListener("resize", ut),
    ut(),
    c.addEventListener("scroll", mt),
    mt(),
    window.requestAnimationFrame(function t(e) {
      if (((z += Math.min(e - F, 50)), G)) {
        if (((G = !1), pt(), !b && J < M * w))
          (E = (J * (M * w - 0.5 * J)) / (M * w)),
            0 != J
              ? (ft("startled"),
                window.clearTimeout(L),
                (L = window.setTimeout(vt, D)))
              : ft("bored");
        else {
          if (!b) {
            ft("horrified"), window.clearTimeout(L), (A = z);
            var n = y.getBoundingClientRect(),
              r = C.getBoundingClientRect();
            (S = n.width / y._cachedClientWidth),
              (Y = n.height / y._cachedClientHeight),
              (O = r.width / C._cachedClientWidth),
              (X = r.height / C._cachedClientHeight),
              (b = !0),
              document.body.setAttribute("data-detached", "true");
          }
          E = J;
        }
        U = J;
      }
      if (
        ((x = (6 * x + E) / 7) <= w
          ? ((y.style.transform = "translate3d(0px, " + -1 * x + "px, 0px)"),
            "block" != y.style.display && (y.style.display = "block"))
          : "none" != y.style.display && (y.style.display = "none"),
        x <= 1 &&
          b &&
          (ft("bored"),
          document.body.setAttribute("data-detached", "false"),
          (b = !1)),
        b)
      ) {
        if (z - A <= q) {
          var i = Et("easeOutElastic", (z - A) / q);
          (C.style.transform =
            "scale(" + (O - (O - 1) * i) + ", " + (X - (X - 1) * i) + ")"),
            (j.style.transform =
              "scaleY(" + Math.pow(1 / (X - (X - 1) * i), 0.4) + ")"),
            (y.style.transform +=
              " scale(" + (S - (S - 1) * i) + ", " + (Y - (Y - 1) * i) + ")");
        }
        T.style.transform =
          "translate3d(0px, 50%, 0px) scaleY(" + Math.min(x / w, 1) + ")";
      } else {
        var o = (C._cachedClientHeight + x) / C._cachedClientHeight;
        (C.style.transform = "scale(" + (5 + 1 / o) / 6 + ", " + o + ")"),
          (j.style.transform = "scaleY(" + Math.pow(1 / o, 0.4) + ")"),
          (y.style.transform +=
            " scale(" + (5 + 1 / o) / 6 + ", " + (12 + o) / 13 + ")"),
          (T.style.transform = "translate3d(0px, 50%, 0px) scaleY(0)");
      }
      for (var a = 0; a < Q; a++) {
        var l = k[a],
          s = Et(
            "easeInOutQuad",
            (z - l._movementStartTimestampX) / l._movementDurationX
          ),
          c = l._originX - (l._originX - l._targetX) * s;
        z >= l._movementStartTimestampX + l._movementDurationX &&
          ((l._originX = c),
          (l._targetX = Math.random() * R * (0 < l._targetX ? -1 : 1)),
          (l._movementDurationX = B + Math.random() * (N - B)),
          (l._movementStartTimestampX = z));
        var d = Et(
            "easeInOutQuad",
            (z - l._movementStartTimestampY) / l._movementDurationY
          ),
          u = l._originY - (l._originY - l._targetY) * d;
        z >= l._movementStartTimestampY + l._movementDurationY &&
          ((l._originY = u),
          (l._targetY = Math.random() * R * (0 < l._targetY ? -1 : 1)),
          (l._movementDurationY = B + Math.random() * (N - B)),
          (l._movementStartTimestampY = z)),
          (l.style.transform = "translate3d(" + c + "px, " + u + "px, 0px)");
      }
      (K = (6 * K + U) / 7) < 0.1 && (K = 0),
        (H.style.transform = "translate3d(0px, " + -1 * K + "px, 0px)");
      for (var m = 0; m < W; m++) {
        var p = P[m];
        if (void 0 === p._inViewport || p._inViewport) {
          p._active &&
            0.01 < p._targetOffsetXMultiplier &&
            (p._targetOffsetXMultiplier = 0.75 * p._targetOffsetXMultiplier),
            !p._active &&
              !p._transitioning &&
              p._targetOffsetXMultiplier < 0.99 &&
              (p._targetOffsetXMultiplier =
                (3 * p._targetOffsetXMultiplier + 1) / 4);
          var v = Math.max(0, Math.min(w, p._bottomOffset - K + 0.2 * w)) / w;
          p.style.transform =
            "translate3d(" +
            p._targetOffsetX *
              p._targetOffsetXMultiplier *
              100 *
              (1 - v) *
              Et("easeInQuad", 1 - v) +
            "vw, 0px, 0px)";
        }
      }
      if (!st)
        for (var f = 0; f < I; f++) {
          var h = V[f],
            g = (_ = h.getBoundingClientRect()).top <= w && _.top >= -_.height;
          !g || (void 0 !== h._inViewport && h._inViewport)
            ? g ||
              (void 0 !== h._inViewport && !h._inViewport) ||
              ((h._inViewport = !1),
              h.setAttribute("data-in-viewport", "false"))
            : ((h._inViewport = !0),
              h.setAttribute("data-in-viewport", "true"));
        }
      var _;
      (F = e), window.requestAnimationFrame(t);
    });
});
