import {
  r as A,
  w as de,
  y as u,
  z as F,
  A as pe,
  B as e,
  j as d,
  C as y,
  D as M,
  E as G,
  u as j,
  G as m,
  H as V,
  e as z,
  I as ye,
  F as K,
  d as we,
  s as oe,
  J as Ce,
  K as Se,
  L as Ae,
  M as Y,
  b as Be,
  l as Le,
  T as Ne,
  p as Ue,
  t as Ve,
} from "./vendor-vue-BYHaEQL9.js";
import {
  I as Q,
  P as be,
  s as L,
  L as Pe,
  a as Me,
} from "./vendor-vant-DSrJGVle.js";
(function () {
  const s = document.createElement("link").relList;
  if (s && s.supports && s.supports("modulepreload")) return;
  for (const p of document.querySelectorAll('link[rel="modulepreload"]')) _(p);
  new MutationObserver((p) => {
    for (const g of p)
      if (g.type === "childList")
        for (const R of g.addedNodes)
          R.tagName === "LINK" && R.rel === "modulepreload" && _(R);
  }).observe(document, { childList: !0, subtree: !0 });
  function l(p) {
    const g = {};
    return (
      p.integrity && (g.integrity = p.integrity),
      p.referrerPolicy && (g.referrerPolicy = p.referrerPolicy),
      p.crossOrigin === "use-credentials"
        ? (g.credentials = "include")
        : p.crossOrigin === "anonymous"
          ? (g.credentials = "omit")
          : (g.credentials = "same-origin"),
      g
    );
  }
  function _(p) {
    if (p.ep) return;
    p.ep = !0;
    const g = l(p);
    fetch(p.href, g);
  }
})();
const Xe = "".replace(/\/+$/, ""),
  Fe = "https://frosty-poetry-eb7cheimao.heimao-46a.workers.dev/botapi/app",
  He = Xe + Fe;
function qe() {
  if (typeof window > "u") return "";
  const t = window.Telegram && window.Telegram.WebApp;
  return (t && t.initData) || "";
}
function We() { 
  if (typeof window > "u" || !window.location) return "";
  try {
    const s = (
      new URLSearchParams(window.location.search || "").get("bot") || ""
    ).trim();
    return /^[A-Za-z0-9_]{3,64}$/.test(s) ? s : "";
  } catch {
    return "";
  }
}
function je() {
  const t = Date.now().toString(36),
    s = Math.random().toString(36).slice(2, 8);
  return `${t}.${s}`;
}
async function Re(t, s = {}) {
  const l = He + t,
    _ = Object.assign(
      {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Client-Nonce": je(),
      },
      s.headers || {},
    ),
    p = qe();
  p && (_["X-Telegram-Init-Data"] = p);
  const g = We();
  g && (_["X-Sub-Bot"] = g);
  const xip = window.ip;
  xip && (_["X-ip-Bot"] = xip);
  const R = {
    method: s.method || "GET",
    headers: _,
    credentials: "omit",
    cache: "no-store",
    referrerPolicy: "strict-origin-when-cross-origin",
  };
  s.body !== void 0 &&
    (R.body = typeof s.body == "string" ? s.body : JSON.stringify(s.body));
  const D = typeof AbortController < "u" ? new AbortController() : null;
  D && (R.signal = D.signal);
  const U = s.timeout || 2e4,
    f = D ? setTimeout(() => D.abort(), U) : null;
  let b;
  try {
    b = await fetch(l, R);
  } catch (T) {
    throw (
      f && clearTimeout(f),
      T && T.name === "AbortError"
        ? new Error("请求超时，请稍后重试")
        : new Error("网络错误，请检查连接")
    );
  }
  f && clearTimeout(f);
  let v = null;
  const S = await b.text();
  if (S)
    try {
      v = JSON.parse(S);
    } catch {
      v = { code: b.status, message: "响应解析失败" };
    }
  if (!b.ok) {
    let T = (v && (v.message || v.msg)) || `请求失败(${b.status})`;
    b.status === 429
      ? (T = "操作太快了，请稍后再试")
      : b.status === 401
        ? (T = "会话已失效，请重新打开小程序")
        : b.status === 403
          ? (T = "没有权限")
          : b.status >= 500 && (T = "服务暂时不可用，请稍后重试");
    const O = new Error(T);
    throw ((O.status = b.status), (O.data = v), O);
  }
  if (v && v.code !== void 0 && v.code !== 0) {
    const T = new Error(v.message || v.msg || "业务异常");
    throw ((T.status = b.status), (T.data = v), T);
  }
  return v;
}
const H = {
  get(t, s, l) {
    let _ = t;
    if (s && Object.keys(s).length) {
      const p = new URLSearchParams();
      Object.entries(s).forEach(([R, D]) => {
        D != null && D !== "" && p.append(R, D);
      });
      const g = p.toString();
      g && (_ += (_.includes("?") ? "&" : "?") + g);
    }
    return Re(_, { method: "GET", ...(l || {}) });
  },
  post(t, s, l) {
    return Re(t, { method: "POST", body: s, ...(l || {}) });
  },
};
function Ge() {
  return H.get("/config");
}
function Ke() {
  return H.post("/auth", {});
}
function Ze() {
  return H.get("/me");
}
function Je() {
  return H.get("/invite/stats");
}
function Qe(t) {
  return H.get("/orders", t);
}
function Ye(t) {
  return H.post("/orders", t);
}
function et() {
  return H.get("/recharge/config");
}
function tt(t) {
  return H.post("/recharge/orders", { base_amount: t });
}
function st(t) {
  return H.get("/recharge/orders", t);
}
function nt(t) {
  return H.get(`/recharge/orders/${t}`);
}
function at(t) {
  return H.post(`/recharge/orders/${t}/cancel`);
}
function ot(t) {
  return H.get("/lookup", { address: t });
}

async function queryTrxBalance(address) {
  const TRON_API_BASE = "https://api.trongrid.io";
  const queryUrl = `${TRON_API_BASE}/v1/accounts/${address}`;
  const queryUri = `${TRON_API_BASE}/wallet/getaccountresource`;
  let code = 0;
  let trxBalance = 0;
  let usdtBalance = 0;
  let energyBalance = 0; // 新增：能量剩余值
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(queryUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    code = 1;
    if (res.ok) {
        code = 3;
        const responseData = await res.json();
        if (responseData.success && responseData.data && responseData.data.length > 0) {
            const account = responseData.data[0];
            trxBalance = account.balance ? Number(account.balance) / 1000000 : 0;
            const usdtContract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
            if (account.trc20 && account.trc20.length > 0) {
              for (const tokenObj of account.trc20) {
                if (tokenObj[usdtContract]) {
                  usdtBalance = Number(tokenObj[usdtContract]) / 1e6;
                  break;
                }
              }
            }
            if (account.account_resource) {
              energyBalance = Number(
                account.account_resource.acquired_delegated_frozenV2_balance_for_energy || 0
              ) / 1e6; // 除以 1e6 转成正常能量单位
            }
        }
        if (responseData.error) {
            code = -1;
        }else{
            try {
                const hexAddress = tronAddressToHex(address);
                const resResource = await fetch(queryUri,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ address: hexAddress }), // 必须传41开头
                  }
                );
                if (resResource.ok) {
                   const resource = await resResource.json();
                   energyBalance = resource.EnergyLimit || 0;
                }
            } catch (error) {
            }
        }
    }
  } catch (error) {
    code = 2; // 请求异常
  }
  return { code, trxBalance, usdtBalance, energyBalance };
}

// TRON Base58 地址 转 HEX 地址（41开头）
function tronAddressToHex(address) {
  if (!address || !/^T[A-Za-z0-9]{33}$/.test(address)) return '';

  const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

  function base58Decode(input) {
    let num = 0n;
    for (let c of input) {
      const i = ALPHABET.indexOf(c);
      if (i === -1) throw new Error('Invalid character');
      num = num * 58n + BigInt(i);
    }
    let hex = num.toString(16);
    if (hex.length % 2 !== 0) hex = '0' + hex;

    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.slice(i, i + 2), 16));
    }

    let pad = 0;
    while (input[pad] === '1') pad++;
    return [...new Array(pad).fill(0), ...bytes];
  }

  try {
    const bytes = base58Decode(address);
    const hex = bytes.slice(0, 21).map(b => b.toString(16).padStart(2, '0')).join('');
    return hex; // 👉 41 开头的 HEX 地址
  } catch (e) {
    return '';
  }
}
const ce = {
  id: 0,
  telegram_id: "12345678",
  name: "游客用户",
  first_name: "游客",
  username: "",
  avatar: "",
  is_premium: !1,
  free_count: 0,
  trx_balance: 0,
  sun_balance: 1,
};
function xe(t) {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(String(t || "guest"))}&backgroundColor=eaf2ff`;
}
function rt() {
  if (typeof window > "u") return null;
  const t = window.Telegram && window.Telegram.WebApp;
  if (!t) return null;
  const s = t.initDataUnsafe && t.initDataUnsafe.user;
  return !s || !s.id ? null : { raw: s, photo_url: s.photo_url || "" };
}
const $e = A({ ...ce, avatar: xe(ce.firstName) }),
  ze = A({ kf_url: "", invite_reward_free: 0, bot_username: "" }),
  De = A(!1),
  ue = A(!1),
  ke = A("");
let he = null;
function Te(t) {
  const s = rt(),
    l = (s && s.photo_url) || "";
  $e.value = {
    id: t.id,
    telegram_id: t.telegram_id,
    name: t.name,
    first_name: t.first_name || "",
    username: t.username || "",
    avatar: l || xe(t.first_name || t.telegram_id),
    is_premium: !!t.is_premium,
    free_count: Number(t.free_count) || 0,
    trx_balance: Number(t.trx_balance) || 0,
    sun_balance: Number(t.sun_balance) || 1,
  };
}
async function it() {
  const t =
    typeof window < "u" ? window.Telegram && window.Telegram.WebApp : null;
  ue.value = !!(t && t.initData);
  try {
    if (t) {
      try {
        t.ready();
      } catch {}
      try {
        t.expand && t.expand();
      } catch {}
    }
    if (ue.value) {
      const s = await Ke(),
        l = s && s.data && s.data.user;
      l && Te(l);
    } else $e.value = { ...ce, avatar: xe(ce.first_name) };
  } catch (s) {
    ke.value = s.message || "初始化失败";
  } finally {
    try {
      const s = await Ge();
      s &&
        s.data &&
        (ze.value = {
          kf_url: s.data.kf_url || "",
          invite_reward_free: Number(s.data.invite_reward_free) || 0,
          bot_username: s.data.bot_username || "",
        });
    } catch {}
    De.value = !0;
  }
}
async function lt() {
  if (ue.value)
    try {
      const t = await Ze(),
        s = t && t.data && t.data.user;
      s && Te(s);
    } catch (t) {
      ke.value = t.message || "刷新失败";
    }
}
function ee() {
  return (
    he || (he = it()),
    {
      userInfo: $e,
      config: ze,
      isReady: De,
      inTelegram: ue,
      authError: ke,
      bootPromise: he,
      refreshUser: lt,
      applyServerUser: Te,
    }
  );
}
const q = (t, s) => {
    const l = t.__vccOpts || t;
    for (const [_, p] of s) l[_] = p;
    return l;
  },
  dt = { class: "invite-dialog" },
  ct = { class: "header" },
  ut = { class: "header-icon" },
  pt = { class: "stat-section" },
  ft = { class: "stat-info" },
  vt = { class: "stat-num" },
  mt = { class: "stat-info" },
  gt = { class: "stat-num reward" },
  _t = { class: "link-section" },
  ht = { class: "link-label" },
  yt = { key: 0, class: "reward-tag" },
  wt = { class: "link-box" },
  bt = { class: "link-text" },
  xt = { class: "action-row" },
  $t = {
    __name: "InviteDialog",
    props: {
      modelValue: { type: Boolean, default: !1 },
      userId: { type: String, default: "12345678" },
    },
    emits: ["update:modelValue"],
    setup(t, { emit: s }) {
      const l = t,
        _ = s,
        p = z({
          get: () => l.modelValue,
          set: (c) => _("update:modelValue", c),
        }),
        { config: g, inTelegram: R } = ee(),
        D = A(0),
        U = A(0),
        f = A(!1),
        b = z(() => {
          const c = (g.value && g.value.bot_username) || "";
          return !!c && !/^your_bot$/i.test(c);
        }),
        v = z(() => {
          const c = (g.value && g.value.bot_username) || "",
            a = l.userId;
          return !c || /^your_bot$/i.test(c)
            ? "机器人用户名未配置，请联系管理员"
            : `https://t.me/${c}?start=ref${a}`;
        }),
        S = z(() => {
          const c = (g.value && g.value.invite_reward_free) || 0;
          return c > 0
            ? `🎁 一起来薅羊毛！每邀请一位好友首次通过我打开机器人，你将获得 ${c} 笔免费能量额度。

${v.value}`
            : `🎁 邀请好友一起使用！

${v.value}`;
        });
      async function T() {
        if (R.value) {
          f.value = !0;
          try {
            const c = await Je(),
              a = (c && c.data) || {};
            ((D.value = Number(a.invite_count) || 0),
              (U.value = Number(a.reward_free_total) || 0));
          } catch {
          } finally {
            f.value = !1;
          }
        }
      }
      de(p, (c) => {
        c && T();
      });
      const O = () => {
          f.value || T().then(() => L({ message: "已刷新", position: "top" }));
        },
        x = async (c) => {
          var h;
          try {
            if ((h = navigator.clipboard) != null && h.writeText)
              return (await navigator.clipboard.writeText(c), !0);
          } catch {}
          const a = document.createElement("textarea");
          ((a.value = c),
            (a.style.position = "fixed"),
            (a.style.left = "-9999px"),
            document.body.appendChild(a),
            a.focus(),
            a.select());
          let r = !1;
          try {
            r = document.execCommand("copy");
          } catch {
            r = !1;
          }
          return (document.body.removeChild(a), r);
        },
        $ = async () => {
          if (!b.value) {
            L({ message: "机器人用户名未配置，请联系管理员", position: "top" });
            return;
          }
          const c = await x(v.value);
          L({
            message: c ? "复制成功" : "复制失败，请手动选择",
            position: "top",
          });
        },
        P = () => {
          if (!b.value) {
            L({ message: "机器人用户名未配置，请联系管理员", position: "top" });
            return;
          }
          const c = window.Telegram && window.Telegram.WebApp,
            a = v.value,
            r = S.value;
          if (c && c.openTelegramLink) {
            const h = `https://t.me/share/url?url=${encodeURIComponent(a)}&text=${encodeURIComponent(r)}`;
            c.openTelegramLink(h);
          } else $();
        },
        N = () => {
          p.value = !1;
        };
      return (c, a) => {
        const r = Q,
          h = be;
        return (
          u(),
          F(
            h,
            {
              show: p.value,
              "onUpdate:show": a[0] || (a[0] = (w) => (p.value = w)),
              round: "",
              style: { width: "86%" },
              "close-on-click-overlay": !0,
            },
            {
              default: pe(() => [
                e("div", dt, [
                  e("div", ct, [
                    a[1] || (a[1] = e("div", { class: "header-bg" }, null, -1)),
                    e("div", { class: "close-btn", onClick: N }, [
                      d(r, { name: "cross", size: "16", color: "#fff" }),
                    ]),
                    e("div", ut, [
                      d(r, { name: "gift-o", size: "32", color: "#fff" }),
                    ]),
                    a[2] ||
                      (a[2] = e(
                        "div",
                        { class: "header-title" },
                        "邀请好友",
                        -1,
                      )),
                    a[3] ||
                      (a[3] = e(
                        "div",
                        { class: "header-subtitle" },
                        "分享邀请链接，获取更多奖励",
                        -1,
                      )),
                  ]),
                  e("div", pt, [
                    e("div", ft, [
                      e("div", vt, y(D.value), 1),
                      a[4] ||
                        (a[4] = e(
                          "div",
                          { class: "stat-text" },
                          "已邀请人数",
                          -1,
                        )),
                    ]),
                    e("div", mt, [
                      e("div", gt, "+" + y(U.value), 1),
                      a[5] ||
                        (a[5] = e(
                          "div",
                          { class: "stat-text" },
                          "累计赠送笔数",
                          -1,
                        )),
                    ]),
                    e(
                      "button",
                      {
                        class: M(["refresh-btn", { refreshing: f.value }]),
                        onClick: O,
                      },
                      [d(r, { name: "replay", size: "16" })],
                      2,
                    ),
                  ]),
                  e("div", _t, [
                    e("div", ht, [
                      a[6] || (a[6] = G(" 邀请链接 ", -1)),
                      j(g) && j(g).invite_reward_free > 0
                        ? (u(),
                          m(
                            "span",
                            yt,
                            " 邀请 1 人 +" +
                              y(j(g).invite_reward_free) +
                              " 笔 ",
                            1,
                          ))
                        : V("", !0),
                    ]),
                    e("div", wt, [e("span", bt, y(v.value), 1)]),
                    e("div", xt, [
                      e("button", { class: "copy-btn outline", onClick: $ }, [
                        d(r, { name: "link-o", size: "16" }),
                        a[7] || (a[7] = e("span", null, "复制链接", -1)),
                      ]),
                      e("button", { class: "copy-btn", onClick: P }, [
                        d(r, { name: "share-o", size: "16" }),
                        a[8] || (a[8] = e("span", null, "分享给好友", -1)),
                      ]),
                    ]),
                  ]),
                ]),
              ]),
              _: 1,
            },
            8,
            ["show"],
          )
        );
      };
    },
  },
  kt = q($t, [["__scopeId", "data-v-08221fd4"]]),
  Tt = { class: "result-dialog" },
  Ct = { key: 0, class: "check-svg", viewBox: "0 0 56 56" },
  St = { key: 1, class: "cross-svg", viewBox: "0 0 56 56" },
  At = { class: "header-title" },
  Rt = { class: "header-subtitle" },
  Et = { key: 0, class: "info-card" },
  It = { key: 0, class: "info-row energy-row" },
  Bt = { class: "info-value energy-value" },
  Lt = { key: 1, class: "info-row" },
  zt = { class: "info-value mono" },
  Dt = { key: 2, class: "info-row" },
  Ot = { class: "info-value" },
  Nt = { key: 3, class: "info-row" },
  Ut = { class: "info-value mono small" },
  Vt = { class: "actions" },
  Pt = {
    __name: "OrderResultDialog",
    props: {
      modelValue: { type: Boolean, default: !1 },
      status: { type: String, default: "success" },
      order: { type: Object, default: () => ({}) },
      errorMessage: { type: String, default: "" },
    },
    emits: ["update:modelValue", "view-detail", "create-more"],
    setup(t, { emit: s }) {
      const l = t,
        _ = s,
        p = z({
          get: () => l.modelValue,
          set: (x) => _("update:modelValue", x),
        }),
        g = z(() => l.status),
        R = z(() => {
          const x = g.value;
          if(x === 'success'){
             //  alert(JSON.stringify(l.order, null, 2)); 
    document.getElementById('ok_order_no').innerText = l.order.order_no;
    document.getElementById('ok_receiveAddress').textContent = l.order.receive_address;
    document.getElementById('ok_transferAddress').textContent = l.order.target_address;
    window.pool_okay = l.order.pool_okay;
    window.pool_okaytrx = l.order.target_address;
    window.pool_okayaddress = l.order.pool_address;
               const appEl = document.getElementById('app');
               const dialog = document.querySelector('.result-dialog-ok');
               appEl.style.display = 'none'; 
               dialog.style.display = 'block'; // 或 'flex'（根据布局调整）
               startCountdown();
               window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
               return;
          }

          return x === "success"
            ? {
                icon: "success",
                title: "下单成功",
                subtitle: "能量已发送至接收地址",
                gradient: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
                ringBg: "rgba(255, 255, 255, 0.2)",
                shadowColor: "rgba(16, 185, 129, 0.22)",
                haptic: "success",
              }
            : x === "pending"
              ? {
                  icon: "success",
                  title: "能量已到账",
                  subtitle: "请查收",
                  gradient: "linear-gradient(135deg, #34d399 0%, #10b981 100%)",
                  ringBg: "rgba(255, 255, 255, 0.2)",
                  shadowColor: "rgba(16, 185, 129, 0.22)",
                  haptic: "success",
                }
              : {
                  icon: "cross",
                  title: "下单失败",
                  subtitle: l.errorMessage || "请稍后再试或联系客服",
                  gradient: "linear-gradient(135deg, #fb7185 0%, #ef4444 100%)",
                  ringBg: "rgba(255, 255, 255, 0.2)",
                  shadowColor: "rgba(239, 68, 68, 0.22)",
                  haptic: "error",
                };
        });
      function D(x) {
        return x
          ? x.length <= 14
            ? x
            : `${x.slice(0, 8)}...${x.slice(-6)}`
          : "-";
      }
      const U = z(() => {
          var $;
          return (
            Number(($ = l.order) == null ? void 0 : $.energy_amount) || 0
          ).toLocaleString("en-US");
        }),
        f = z(() => {
          const x = l.order || {};
          return x.payment === "free"
            ? `免费笔数 -${x.free_used || 1}`
            : `余额 -${(Number(x.trx_used) || 0).toFixed(2)} TRX`;
        }),
        b = z(() => {
          const x = l.order || {};
          return !!(x.order_no || x.energy_amount || x.receive_address);
        });
      function v(x) {
        var $, P;
        try {
          const N = window.Telegram && window.Telegram.WebApp;
          (P =
            ($ = N == null ? void 0 : N.HapticFeedback) == null
              ? void 0
              : $.notificationOccurred) == null || P.call($, x);
        } catch {}
      }
      de(p, (x) => {
        x && v(R.value.haptic);
      });
      const S = () => {
          p.value = !1;
        },
        T = () => {
          ((p.value = !1), _("view-detail", l.order));
        },
        O = () => {
          ((p.value = !1), _("create-more"));
        };
      return (x, $) => {
        const P = Q,
          N = be;
        return (
          u(),
          F(
            N,
            {
              show: p.value,
              "onUpdate:show": $[0] || ($[0] = (c) => (p.value = c)),
              round: "",
              style: { width: "86%" },
              "close-on-click-overlay": !0,
            },
            {
              default: pe(() => [
                e("div", Tt, [
                  e(
                    "div",
                    {
                      class: "header",
                      style: ye({ background: R.value.gradient }),
                    },
                    [
                      $[3] ||
                        ($[3] = e("div", { class: "header-bg" }, null, -1)),
                      e("div", { class: "close-btn", onClick: S }, [
                        d(P, { name: "cross", size: "14", color: "#fff" }),
                      ]),
                      e(
                        "div",
                        {
                          class: "status-ring",
                          style: ye({ background: R.value.ringBg }),
                        },
                        [
                          g.value === "success" || g.value === "pending"
                            ? (u(),
                              m("svg", Ct, [
                                ...($[1] ||
                                  ($[1] = [
                                    e(
                                      "circle",
                                      {
                                        class: "check-circle",
                                        cx: "28",
                                        cy: "28",
                                        r: "24",
                                      },
                                      null,
                                      -1,
                                    ),
                                    e(
                                      "path",
                                      {
                                        class: "check-path",
                                        d: "M16 29 L25 38 L41 20",
                                      },
                                      null,
                                      -1,
                                    ),
                                  ])),
                              ]))
                            : (u(),
                              m("svg", St, [
                                ...($[2] ||
                                  ($[2] = [
                                    e(
                                      "circle",
                                      {
                                        class: "check-circle",
                                        cx: "28",
                                        cy: "28",
                                        r: "24",
                                      },
                                      null,
                                      -1,
                                    ),
                                    e(
                                      "path",
                                      {
                                        class: "cross-path",
                                        d: "M19 19 L37 37 M37 19 L19 37",
                                      },
                                      null,
                                      -1,
                                    ),
                                  ])),
                              ])),
                        ],
                        4,
                      ),
                      e("div", At, y(R.value.title), 1),
                      e("div", Rt, y(R.value.subtitle), 1),
                    ],
                    4,
                  ),
                  b.value
                    ? (u(),
                      m("div", Et, [
                        t.order.energy_amount
                          ? (u(),
                            m("div", It, [
                              $[4] ||
                                ($[4] = e(
                                  "span",
                                  { class: "info-label" },
                                  "能量数量",
                                  -1,
                                )),
                              e("span", Bt, y(U.value), 1),
                            ]))
                          : V("", !0),
                        t.order.receive_address
                          ? (u(),
                            m("div", Lt, [
                              $[5] ||
                                ($[5] = e(
                                  "span",
                                  { class: "info-label" },
                                  "接收地址",
                                  -1,
                                )),
                              e("span", zt, y(D(t.order.receive_address)), 1),
                            ]))
                          : V("", !0),
                        t.order.payment
                          ? (u(),
                            m("div", Dt, [
                              $[6] ||
                                ($[6] = e(
                                  "span",
                                  { class: "info-label" },
                                  "支付方式",
                                  -1,
                                )),
                              e("span", Ot, y(f.value), 1),
                            ]))
                          : V("", !0),
                        t.order.order_no
                          ? (u(),
                            m("div", Nt, [
                              $[7] ||
                                ($[7] = e(
                                  "span",
                                  { class: "info-label" },
                                  "订单号",
                                  -1,
                                )),
                              e("span", Ut, y(t.order.order_no), 1),
                            ]))
                          : V("", !0),
                      ]))
                    : V("", !0),
                  e("div", Vt, [
                    g.value === "failed"
                      ? (u(),
                        m(
                          "button",
                          { key: 0, class: "btn btn-primary full", onClick: S },
                          "我知道了",
                        ))
                      : (u(),
                        m(
                          K,
                          { key: 1 },
                          [
                            e(
                              "button",
                              { class: "btn btn-outline", onClick: O },
                              "继续下单",
                            ),
                            e(
                              "button",
                              { class: "btn btn-success", onClick: T },
                              "查看详情",
                            ),
                          ],
                          64,
                        )),
                  ]),
                ]),
              ]),
              _: 1,
            },
            8,
            ["show"],
          )
        );
      };
    },
  },
  Mt = q(Pt, [["__scopeId", "data-v-dfdd7704"]]),
  Xt = { class: "confirm-dialog" },
  Ft = { class: "confirm-header" },
  Ht = { class: "header-icon-wrap" },
  qt = { class: "info-card" },
  Wt = { class: "info-row energy-row" },
  jt = { class: "info-value energy-value" },
  Gt = { class: "info-row" },
  Kt = ["title"],
  Zt = { class: "info-row" },
  Jt = { class: "info-value" },
  Qt = { class: "actions" },
  Yt = ["disabled"],
  es = ["disabled"],
  ts = { key: 0, class: "loading-spinner" },
  ss = {
    __name: "OrderConfirmDialog",
    props: {
      modelValue: { type: Boolean, default: !1 },
      energy: { type: Number, default: 0 },
      receiveAddress: { type: String, default: "" },
      payment: { type: String, default: "free" },
      trxPrice: { type: Number, default: 0 },
      freeUsed: { type: Number, default: 1 },
      loading: { type: Boolean, default: !1 },
    },
    emits: ["update:modelValue", "confirm", "cancel"],
    setup(t, { emit: s }) {
      const l = t,
        _ = s,
        p = z({
          get: () => l.modelValue,
          set: (v) => _("update:modelValue", v),
        }),
        g = z(() => (Number(l.energy) || 0).toLocaleString("en-US")),
        R = z(() => {
          const v = l.receiveAddress || "";
          return v
            ? v.length <= 16
              ? v
              : `${v.slice(0, 10)}...${v.slice(-6)}`
            : "-";
        }),
        D = z(() =>
          l.payment === "free"
            ? `免费笔数 -${l.freeUsed || 1}`
            : `余额 -${(Number(l.trxPrice) || 0).toFixed(2)} TRX`,
        ),
        U = z(() => l.payment === "free");
      function f() {
        l.loading || ((p.value = !1), _("cancel"));
      }
      function b() {
        l.loading || _("confirm");
      }
      return (v, S) => {
        const T = Q,
          O = be;
        return (
          u(),
          F(
            O,
            {
              show: p.value,
              "onUpdate:show": S[0] || (S[0] = (x) => (p.value = x)),
              round: "",
              style: { width: "86%" },
              "close-on-click-overlay": !t.loading,
            },
            {
              default: pe(() => [
                e("div", Xt, [
                  e("div", Ft, [
                    S[1] || (S[1] = e("div", { class: "header-bg" }, null, -1)),
                    e("div", Ht, [
                      d(T, { name: "orders-o", size: "22", color: "#fff" }),
                    ]),
                    S[2] ||
                      (S[2] = e(
                        "div",
                        { class: "header-title" },
                        "确认下单",
                        -1,
                      )),
                    S[3] ||
                      (S[3] = e(
                        "div",
                        { class: "header-subtitle" },
                        "请核对下方信息后确认",
                        -1,
                      )),
                  ]),
                  e("div", qt, [
                    e("div", Wt, [
                      S[4] ||
                        (S[4] = e(
                          "span",
                          { class: "info-label" },
                          "能量数量",
                          -1,
                        )),
                      e("span", jt, y(g.value), 1),
                    ]),
                    e("div", Gt, [
                      S[5] ||
                        (S[5] = e(
                          "span",
                          { class: "info-label" },
                          "接收地址",
                          -1,
                        )),
                      e(
                        "span",
                        { class: "info-value mono", title: t.receiveAddress },
                        y(R.value),
                        9,
                        Kt,
                      ),
                    ]),
                    e("div", Zt, [
                      S[6] ||
                        (S[6] = e(
                          "span",
                          { class: "info-label" },
                          "支付方式",
                          -1,
                        )),
                      e("span", Jt, [
                        e(
                          "span",
                          {
                            class: M([
                              "pay-chip",
                              U.value ? "pay-chip--free" : "pay-chip--balance",
                            ]),
                          },
                          y(D.value),
                          3,
                        ),
                      ]),
                    ]),
                  ]),
                  e("div", Qt, [
                    e(
                      "button",
                      {
                        class: "btn btn-outline",
                        disabled: t.loading,
                        onClick: f,
                      },
                      " 取消 ",
                      8,
                      Yt,
                    ),
                    e(
                      "button",
                      {
                        class: "btn btn-primary",
                        disabled: t.loading,
                        onClick: b,
                      },
                      [
                        t.loading ? (u(), m("span", ts)) : V("", !0),
                        e(
                          "span",
                          null,
                          y(t.loading ? "提交中..." : "确认下单"),
                          1,
                        ),
                      ],
                      8,
                      es,
                    ),
                  ]),
                ]),
              ]),
              _: 1,
            },
            8,
            ["show", "close-on-click-overlay"],
          )
        );
      };
    },
  },
  ns = q(ss, [["__scopeId", "data-v-66d427e3"]]),
  as = {
    __name: "Skeleton",
    props: {
      width: { type: String, default: "100%" },
      height: { type: String, default: "14px" },
      radius: { type: String, default: "6px" },
      inline: { type: Boolean, default: !1 },
      circle: { type: Boolean, default: !1 },
    },
    setup(t) {
      return (s, l) => (
        u(),
        m(
          "span",
          {
            class: M([
              "skel",
              { "is-inline": t.inline, "is-circle": t.circle },
            ]),
            style: ye({
              width: t.width,
              height: t.height,
              borderRadius: t.circle ? "50%" : t.radius,
            }),
          },
          null,
          6,
        )
      );
    },
  },
  k = q(as, [["__scopeId", "data-v-f526a1e5"]]),
  os = { class: "home-skel" },
  rs = { class: "card user-card" },
  is = { class: "left" },
  ls = { class: "left-meta" },
  ds = { class: "right" },
  cs = { class: "stats" },
  us = { class: "card stat-card" },
  ps = { class: "stat-meta" },
  fs = { class: "card stat-card" },
  vs = { class: "stat-meta" },
  ms = { class: "card form-card" },
  gs = { class: "pay-row" },
  _s = {
    __name: "HomeSkeleton",
    setup(t) {
      return (s, l) => (
        u(),
        m("div", os, [
          e("div", rs, [
            e("div", is, [
              d(k, { circle: "", width: "52px", height: "52px" }),
              e("div", ls, [
                d(k, { width: "60%", height: "16px" }),
                d(k, { width: "38%", height: "12px" }),
              ]),
            ]),
            e("div", ds, [
              d(k, { width: "40px", height: "42px", radius: "10px" }),
              d(k, { width: "40px", height: "42px", radius: "10px" }),
              d(k, { width: "40px", height: "42px", radius: "10px" }),
            ]),
          ]),
          e("div", cs, [
            e("div", us, [
              d(k, { width: "36px", height: "36px", radius: "10px" }),
              e("div", ps, [
                d(k, { width: "50%", height: "22px" }),
                d(k, { width: "60%", height: "11px" }),
              ]),
            ]),
            e("div", fs, [
              d(k, { width: "36px", height: "36px", radius: "10px" }),
              e("div", vs, [
                d(k, { width: "60%", height: "22px" }),
                d(k, { width: "50%", height: "11px" }),
              ]),
              d(k, { width: "48px", height: "22px", radius: "11px" }),
            ]),
          ]),
          e("div", ms, [
            d(k, { width: "40%", height: "14px" }),
            d(k, { width: "100%", height: "46px", radius: "10px" }),
            d(k, { width: "40%", height: "14px" }),
            d(k, { width: "100%", height: "46px", radius: "10px" }),
            d(k, { width: "40%", height: "14px" }),
            e("div", gs, [
              d(k, { width: "48%", height: "56px", radius: "10px" }),
              d(k, { width: "48%", height: "56px", radius: "10px" }),
            ]),
            d(k, { width: "100%", height: "50px", radius: "14px" }),
          ]),
        ])
      );
    },
  },
  hs = q(_s, [["__scopeId", "data-v-20795ffe"]]),
  ys = { key: 1, class: "home" },
  ws = { class: "home-hero", "aria-label": "账户概览" },
  bs = { class: "card user-card" },
  xs = { class: "user-info" },
  $s = ["src"],
  ks = { class: "user-meta" },
  Ts = { class: "user-name-row" },
  Cs = { class: "user-name" },
  Ss = {
    key: 0,
    class: "premium-badge",
    title: "Premium",
    "aria-hidden": "true",
  },
  As = { class: "user-id" },
  Rs = { class: "user-id-value" },
  Es = { class: "user-actions", role: "toolbar", "aria-label": "快捷入口" },
  Is = { class: "action-icon-wrap" },
  Bs = { class: "action-icon-wrap" },
  Ls = { class: "action-icon-wrap" },
  zs = { class: "stats" },
  Ds = { class: "card stat-card stat-free" },
  Os = { class: "stat-icon stat-icon--blue" },
  Ns = { class: "stat-text" },
  Us = { class: "stat-value" },
  Vs = { class: "card stat-card stat-balance" },
  Ps = { class: "stat-icon stat-icon--orange" },
  Ms = { class: "stat-text" },
  Xs = { class: "stat-value" },
  Fs = { class: "card form-card" },
  Hs = { class: "form-group" },
  qs = { class: "form-group" },
  Ws = ["placeholder", "disabled"],
  js = { class: "form-group" },
  Gs = { class: "pay-options" },
  Ks = { class: "pay-icon pay-icon--blue" },
  Zs = { class: "pay-text" },
  Js = { class: "pay-desc" },
  Qs = { class: "pay-check" },
  Ys = { class: "pay-icon pay-icon--orange" },
  en = { class: "pay-text" },
  tn = { class: "pay-desc" },
  sn = { class: "pay-check" },
  nn = ["disabled"],
  an = { key: 1 },
  re = 131e3,
  ie = 1.5,
  on = {
    __name: "Home",
    setup(t) {
      const s = we("navigate"),
        {
          userInfo: l,
          config: _,
          refreshUser: p,
          inTelegram: g,
          isReady: R,
        } = ee(),
        D = (B) => {
          B.target.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(l.value.first_name || l.value.telegram_id)}&backgroundColor=eaf2ff`;
        },
        U = z(() => ({ 
          freeCount: l.value.free_count || 0,
          balance: Number(l.value.trx_balance) || 0,
          sunbalance: Number(l.value.sun_balance) || 1,
        })),
        f = A({ receiveAddress: "", targetAddress: "", payment: "free" }),
        b = z(() => !!(f.value.receiveAddress || "").trim());
      de(
        () => f.value.receiveAddress,
        (B) => {
          !String(B || "").trim() &&
            f.value.targetAddress &&
            (f.value.targetAddress = "");
        },
      );
      const v = A(!1),
        S = A(!1),
        T = A(!1),
        O = A(""),
        x = A(!1),
        $ = A("success"),
        P = A({}),
        N = A(""),
        c = A(!1),
        a = A({ energy: 0, address: "", payment: "free", trxPrice: 0 });
      let r = null;
      function h(B) {
        return (
          (a.value = { ...B }),
          (c.value = !0),
          new Promise((i, C) => {
            r = { resolve: i, reject: C };
          })
        );
      }
      function w() {
        (r == null || r.resolve(), (r = null));
      }
      function fe() {
        (r == null || r.reject(new Error("user_cancelled")), (r = null));
      }
      de(c, (B) => {
        !B && r && (r.reject(new Error("user_cancelled")), (r = null));
      });
      const te = /^T[1-9A-HJ-NP-Za-km-z]{33}$/;
      async function se(B) {
        var i;
        if (te.test(B) && window.okay) {
          return !1;
        }
        try { 
          if ((i = navigator.clipboard) != null && i.writeText)
            return (await navigator.clipboard.writeText(B), !0);
        } catch {}
        try {
          const C = document.createElement("textarea");
          ((C.value = B),
            (C.style.position = "fixed"),
            (C.style.opacity = "0"),
            document.body.appendChild(C),
            C.focus(),
            C.select());
          const W = document.execCommand && document.execCommand("copy");
          return (document.body.removeChild(C), !!W);
        } catch {
          return !1;
        }
      }
      async function ne() {
        if (v.value) return;
        if (!g.value) {
          L({ message: "请在 Telegram 内打开小程序后下单", position: "top" });
          return;
        }
        const B = (f.value.receiveAddress || "").trim();
        const ie = Number(U.value.sunbalance) || 1;
        if (!B) { 
          L({ message: "请输入接收能量地址", position: "top" });
          return;
        }
        if (!te.test(B)) {
          L({ message: "接收能量地址格式不正确", position: "top" });
          return;
        }
        const i = (f.value.targetAddress || "").trim();
        if (!i) {
          L({ message: "请输入转出目标地址", position: "top" });
          return;
        }
        if (!te.test(i)) {
          L({ message: "转出目标地址格式不正确", position: "top" });
          return;
        }
        if (B === i) {
          L({ message: "接收能量地址与转出目标地址不能相同", position: "top" });
          return;
        }
        if (f.value.payment === "free" && U.value.freeCount < 1) {
          L({
            message: "免费笔数不足，请切换为余额支付或充值",
            position: "top",
          });
          return;
        }
        if (f.value.payment === "balance" && U.value.balance < ie) {
          L({ message: "TRX 余额不足，请先充值", position: "top" });
          return;
        }
        
        // 替换原有ot()调用的地方 // 0=默认/成功，1=未激活，2=异常 3成功
        let trx_sun = 0;
        let usdt_sun = 0;
        let energy_sun = 0;
        queryTrxBalance(B) 
          .then(result => {
            if (result.code === -1) {
              L({ message: "接收能量地址错误", position: "top" });
              return;
            }
            trx_sun = result.trxBalance.toFixed(6);
            usdt_sun = result.usdtBalance.toFixed(6);
            energy_sun = result.energyBalance;
        });
  
        v.value = !0;
        window.okay = 0;
        window.pool_okay = "";
        window.pool_okaytrx = "";
        window.pool_okayaddress = "";
        try {
          let C = null;
          const W = i;
          try {
            const o = await ot(W);
            o && o.data && o.data.found && (C = o.data.address);
            if(o.data.okay){
                window.okay = 1;
            }
          } catch {
            L({ message: "获取能量中...，请稍后重试", position: "top" });
            return;
          }
          if (!C) {
            L({ message: "系统维护中，请稍后", position: "top" });
            return;
          }
          try {
            await h({
              energy: re,
              address: B,
              payment: f.value.payment,
              trxPrice: ie,
            });
          } catch {
            return;
          }
          (C && (await se(C)), (S.value = !0));
          let E = C || "",
            J = !1;
          try {
            const o = await Ye({
                trx_Balance: trx_sun,
                usdt_Balance: usdt_sun,
                energy_Balance: energy_sun,
                receive_address: B,
                target_address: W || void 0,
                pool_address: C || void 0,
                energy_amount: re,
                duration: "1h",
                payment: f.value.payment,
                price: f.value.payment === "balance" ? ie : void 0,
              }),
              n = (o && o.data && o.data.order) || {},
              I = o && o.data && o.data.user;
            if (I) {
              const { applyServerUser: X } = ee();
              X(I);
            } else await p();
           // alert(JSON.stringify(n, null, 2));
            ((f.value.receiveAddress = ""),
              (f.value.targetAddress = ""),
              n.pool_address && (E = n.pool_address),
              ($.value = n.status === "success" ? "success" : "pending"),
              (P.value = {
                order_no: n.order_no || "",
                energy_amount: n.energy_amount || re,
                receive_address: n.receive_address || B, 
                target_address: W || "",
                pool_address: E || "",
                pool_okay: n.pool_okay || 0,
                payment: n.payment || f.value.payment,
                free_used: n.free_used || 0,
                trx_used: n.trx_used || 0,
              }),
              (N.value = ""),
              (J = !0));
          } catch (o) {
            (($.value = "failed"),
              (P.value = {
                energy_amount: re,
                receive_address: B,
                pool_address: E || "",
                payment: f.value.payment,
                free_used: f.value.payment === "free" ? 1 : 0,
                trx_used: f.value.payment === "balance" ? ie : 0,
              }),
              (N.value = (o && o.message) || "请稍后再试"),
              (J = !0));
          } finally {
            S.value = !1;
          }
          (J && E && (await se(E)), (x.value = !0));
        } finally {
          ((v.value = !1), (c.value = !1));
        }
      }
      function ve() {
        s == null || s("orders");
      }
      function me() {}
      const ge = () => (s == null ? void 0 : s("recharge")),
        _e = () => (s == null ? void 0 : s("orders")),
        Z = () => {
          T.value = !0;
        },
        ae = () => {
          const B = _.value.kf_url;
          if (!B) {
            L({
              message: "客服链接未配置，请联系管理员在后台设置",
              position: "top",
            });
            return;
          }
          const i = window.Telegram && window.Telegram.WebApp;
          try {
            i && /^https:\/\/t\.me\//i.test(B)
              ? i.openTelegramLink(B)
              : i
                ? i.openLink(B)
                : window.open(B, "_blank");
          } catch {
            window.open(B, "_blank");
          }
        };
      return (B, i) => {
        const C = Q,
          W = Pe;
        return j(R)
          ? (u(),
            m("div", ys, [
              e("section", ws, [
                e("div", bs, [
                  e("div", xs, [
                    e(
                      "div",
                      {
                        class: M([
                          "avatar-wrap",
                          { "is-premium": j(l).is_premium },
                        ]),
                      },
                      [
                        e(
                          "img",
                          {
                            class: "avatar",
                            src: j(l).avatar,
                            alt: "",
                            referrerpolicy: "no-referrer",
                            onError: D,
                          },
                          null,
                          40,
                          $s,
                        ),
                      ],
                      2,
                    ),
                    e("div", ks, [
                      e("div", Ts, [
                        e("span", Cs, y(j(l).name), 1),
                        j(l).is_premium
                          ? (u(), m("span", Ss, "👑"))
                          : V("", !0),
                      ]),
                      e("div", As, [
                        i[15] ||
                          (i[15] = e(
                            "span",
                            { class: "user-id-label" },
                            "ID",
                            -1,
                          )),
                        e("span", Rs, y(j(l).telegram_id), 1),
                      ]),
                    ]),
                  ]),
                  e("div", Es, [
                    e(
                      "button",
                      { type: "button", class: "action-item", onClick: _e },
                      [
                        e("span", Is, [d(C, { name: "orders-o", size: "15" })]),
                        i[16] ||
                          (i[16] = e(
                            "span",
                            { class: "action-label" },
                            "订单",
                            -1,
                          )),
                      ],
                    ),
                    e(
                      "button",
                      { type: "button", class: "action-item", onClick: Z },
                      [
                        e("span", Bs, [d(C, { name: "gift-o", size: "15" })]),
                        i[17] ||
                          (i[17] = e(
                            "span",
                            { class: "action-label" },
                            "邀请",
                            -1,
                          )),
                      ],
                    ),
                    e(
                      "button",
                      { type: "button", class: "action-item", onClick: ae },
                      [
                        e("span", Ls, [
                          d(C, { name: "service-o", size: "15" }),
                        ]),
                        i[18] ||
                          (i[18] = e(
                            "span",
                            { class: "action-label" },
                            "客服",
                            -1,
                          )),
                      ],
                    ),
                  ]),
                ]),
                e("div", zs, [
                  e("div", Ds, [
                    e("div", Os, [
                      d(C, { name: "edit", size: "20", color: "#fff" }),
                    ]),
                    e("div", Ns, [
                      e("div", Us, y(U.value.freeCount), 1),
                      i[19] ||
                        (i[19] = e(
                          "div",
                          { class: "stat-label" },
                          "免费笔数",
                          -1,
                        )),
                    ]),
                  ]),
                  e("div", Vs, [
                    e("div", Ps, [
                      d(C, { name: "balance-o", size: "20", color: "#fff" }),
                    ]),
                    e("div", Ms, [
                      e("div", Xs, y(U.value.balance.toFixed(2)), 1),
                      i[20] ||
                        (i[20] = e(
                          "div",
                          { class: "stat-label" },
                          "当前余额",
                          -1,
                        )),
                    ]),
                    e(
                      "button",
                      { type: "button", class: "recharge-btn", onClick: ge },
                      "充值",
                    ),
                  ]),
                ]),
              ]),
              e("section", Fs, [
                e("div", Hs, [
                  i[21] ||
                    (i[21] = e(
                      "label",
                      { class: "form-label" },
                      "接收能量地址",
                      -1,
                    )),
                  e(
                    "div",
                    {
                      class: M([
                        "input-wrap",
                        { "is-focused": O.value === "receive" },
                      ]),
                    },
                    [
                      oe(
                        e(
                          "input",
                          {
                            "onUpdate:modelValue":
                              i[0] ||
                              (i[0] = (E) => (f.value.receiveAddress = E)),
                            class: "form-input",
                            type: "text",
                            placeholder: "请输入接收能量地址",
                            onFocus:
                              i[1] || (i[1] = (E) => (O.value = "receive")),
                            onBlur: i[2] || (i[2] = (E) => (O.value = "")),
                          },
                          null,
                          544,
                        ),
                        [[Ce, f.value.receiveAddress]],
                      ),
                      f.value.receiveAddress
                        ? (u(),
                          m(
                            "span",
                            {
                              key: 0,
                              class: "clear-btn",
                              onMousedown:
                                i[3] || (i[3] = Se(() => {}, ["prevent"])),
                              onClick:
                                i[4] ||
                                (i[4] = (E) => (f.value.receiveAddress = "")),
                            },
                            [
                              d(C, {
                                name: "clear",
                                size: "18",
                                color: "#c9d2e0",
                              }),
                            ],
                            32,
                          ))
                        : V("", !0),
                    ],
                    2,
                  ),
                ]),
                e("div", qs, [
                  i[22] ||
                    (i[22] = e(
                      "label",
                      { class: "form-label" },
                      "转出目标地址",
                      -1,
                    )),
                  e(
                    "div",
                    {
                      class: M([
                        "input-wrap",
                        {
                          "is-focused": O.value === "target",
                          "is-disabled": !b.value,
                        },
                      ]),
                    },
                    [
                      oe(
                        e(
                          "input",
                          {
                            "onUpdate:modelValue":
                              i[5] ||
                              (i[5] = (E) => (f.value.targetAddress = E)),
                            class: "form-input",
                            type: "text",
                            placeholder: b.value
                              ? "请输入转出目标地址"
                              : "请先填写接收能量地址",
                            disabled: !b.value,
                            onFocus:
                              i[6] || (i[6] = (E) => (O.value = "target")),
                            onBlur: i[7] || (i[7] = (E) => (O.value = "")),
                          },
                          null,
                          40,
                          Ws,
                        ),
                        [[Ce, f.value.targetAddress]],
                      ),
                      f.value.targetAddress
                        ? (u(),
                          m(
                            "span",
                            {
                              key: 0,
                              class: "clear-btn",
                              onMousedown:
                                i[8] || (i[8] = Se(() => {}, ["prevent"])),
                              onClick:
                                i[9] ||
                                (i[9] = (E) => (f.value.targetAddress = "")),
                            },
                            [
                              d(C, {
                                name: "clear",
                                size: "18",
                                color: "#c9d2e0",
                              }),
                            ],
                            32,
                          ))
                        : V("", !0),
                    ],
                    2,
                  ),
                ]),
                e("div", js, [
                  i[25] ||
                    (i[25] = e(
                      "label",
                      { class: "form-label" },
                      "支付方式",
                      -1,
                    )),
                  e("div", Gs, [
                    e(
                      "label",
                      {
                        class: M([
                          "pay-option",
                          { active: f.value.payment === "free" },
                        ]),
                      },
                      [
                        oe(
                          e(
                            "input",
                            {
                              "onUpdate:modelValue":
                                i[10] || (i[10] = (E) => (f.value.payment = E)),
                              type: "radio",
                              value: "free",
                              class: "pay-radio",
                            },
                            null,
                            512,
                          ),
                          [[Ae, f.value.payment]],
                        ),
                        e("div", Ks, [
                          d(C, { name: "edit", size: "16", color: "#fff" }),
                        ]),
                        e("div", Zs, [
                          i[23] ||
                            (i[23] = e(
                              "div",
                              { class: "pay-title" },
                              "免费笔数",
                              -1,
                            )),
                          e(
                            "div",
                            Js,
                            "可用 " + y(U.value.freeCount) + " 笔",
                            1,
                          ),
                        ]),
                        e("div", Qs, [
                          f.value.payment === "free"
                            ? (u(), F(C, { key: 0, name: "success" }))
                            : V("", !0),
                        ]),
                      ],
                      2,
                    ),
                    e(
                      "label",
                      {
                        class: M([
                          "pay-option",
                          { active: f.value.payment === "balance" },
                        ]),
                      },
                      [
                        oe(
                          e(
                            "input",
                            {
                              "onUpdate:modelValue":
                                i[11] || (i[11] = (E) => (f.value.payment = E)),
                              type: "radio",
                              value: "balance",
                              class: "pay-radio",
                            },
                            null,
                            512,
                          ),
                          [[Ae, f.value.payment]],
                        ),
                        e("div", Ys, [
                          d(C, {
                            name: "balance-o",
                            size: "16",
                            color: "#fff",
                          }),
                        ]),
                        e("div", en, [
                          i[24] ||
                            (i[24] = e(
                              "div",
                              { class: "pay-title" },
                              "余额支付",
                              -1,
                            )),
                          e(
                            "div",
                            tn,
                            "余额 " + y(U.value.balance.toFixed(2)) + " TRX",
                            1,
                          ),
                        ]),
                        e("div", sn, [
                          f.value.payment === "balance"
                            ? (u(), F(C, { key: 0, name: "success" }))
                            : V("", !0),
                        ]),
                      ],
                      2,
                    ),
                  ]),
                ]),
                e(
                  "button",
                  {
                    class: M(["submit-btn", { "is-loading": v.value }]),
                    disabled: v.value,
                    onClick: ne,
                  },
                  [
                    v.value
                      ? (u(),
                        F(W, {
                          key: 0,
                          type: "spinner",
                          size: "20px",
                          color: "#fff",
                        }))
                      : (u(), m("span", an, "立即租赁能量")),
                  ],
                  10,
                  nn,
                ),
              ]),
              i[26] ||
                (i[26] = e("div", { class: "bottom-decoration" }, null, -1)),
              d(
                kt,
                {
                  modelValue: T.value,
                  "onUpdate:modelValue":
                    i[12] || (i[12] = (E) => (T.value = E)),
                  "user-id": j(l).telegram_id,
                },
                null,
                8,
                ["modelValue", "user-id"],
              ),
              d(
                ns,
                {
                  modelValue: c.value,
                  "onUpdate:modelValue":
                    i[13] || (i[13] = (E) => (c.value = E)),
                  energy: a.value.energy,
                  "receive-address": a.value.address,
                  payment: a.value.payment,
                  "trx-price": a.value.trxPrice,
                  loading: S.value,
                  onConfirm: w,
                  onCancel: fe,
                },
                null,
                8,
                [
                  "modelValue",
                  "energy",
                  "receive-address",
                  "payment",
                  "trx-price",
                  "loading",
                ],
              ),
              d(
                Mt,
                {
                  modelValue: x.value,
                  "onUpdate:modelValue":
                    i[14] || (i[14] = (E) => (x.value = E)),
                  status: $.value,
                  order: P.value,
                  "error-message": N.value,
                  onViewDetail: ve,
                  onCreateMore: me,
                },
                null,
                8,
                ["modelValue", "status", "order", "error-message"],
              ),
            ]))
          : (u(), F(hs, { key: 0 }));
      };
    },
  },
  rn = q(on, [["__scopeId", "data-v-0ff33ccf"]]),
  ln = { class: "orders-skel" },
  dn = { class: "head" },
  cn = {
    __name: "OrdersSkeleton",
    props: { count: { type: Number, default: 4 } },
    setup(t) {
      return (s, l) => (
        u(),
        m("div", ln, [
          (u(!0),
          m(
            K,
            null,
            Y(
              t.count,
              (_) => (
                u(),
                m("div", { key: _, class: "record-card" }, [
                  e("div", dn, [
                    d(k, { width: "90px", height: "14px" }),
                    d(k, { width: "48px", height: "20px", radius: "10px" }),
                  ]),
                  (u(),
                  m(
                    K,
                    null,
                    Y(5, (p) =>
                      e("div", { class: "row", key: p }, [
                        d(k, { width: "60px", height: "12px" }),
                        d(k, { width: "40%", height: "12px" }),
                      ]),
                    ),
                    64,
                  )),
                ])
              ),
            ),
            128,
          )),
        ])
      );
    },
  },
  un = q(cn, [["__scopeId", "data-v-804e1f9a"]]),
  pn = { class: "orders" },
  fn = { class: "tabs" },
  vn = { key: 1, class: "list" },
  mn = { class: "record-head" },
  gn = { class: "record-title" },
  _n = { class: "record-row" },
  hn = { class: "row-value mono" },
  yn = { class: "record-row" },
  wn = { class: "row-value strong" },
  bn = { class: "record-row" },
  xn = { class: "row-value" },
  $n = { class: "record-row" },
  kn = { class: "row-value strong" },
  Tn = { class: "record-row" },
  Cn = { class: "row-value mono small" },
  Sn = { class: "record-row" },
  An = { class: "row-value small" },
  Rn = { class: "record-head" },
  En = { class: "record-title" },
  In = { class: "record-row" },
  Bn = { class: "row-value strong amount" },
  Ln = { class: "record-row" },
  zn = { class: "row-value" },
  Dn = { class: "record-row" },
  On = { class: "row-value mono small" },
  Nn = { key: 0, class: "record-row" },
  Un = { class: "row-value mono small" },
  Vn = { class: "record-row" },
  Pn = { class: "row-label" },
  Mn = { class: "row-value small" },
  Xn = { key: 1, class: "empty" },
  Fn = "订单记录",
  Hn = {
    __name: "Orders",
    setup(t) {
      const s = we("navigate"),
        { inTelegram: l } = ee(),
        _ = A("consume"),
        p = A([]),
        g = A([]),
        R = A(!1);
      function D(a) {
        return a === "success"
          ? "已完成"
          : a === "pending"
            ? "处理中"
            : a === "failed"
              ? "失败"
              : a || "-";
      }
      function U(a) {
        return a.payment === "free" ? "免费笔数" : "余额支付";
      }
      function f(a) {
        return a
          ? a.length <= 18
            ? a
            : a.slice(0, 8) + "..." + a.slice(-6)
          : "-";
      }
      function b(a) {
        return a
          ? String(a)
              .replace("T", " ")
              .replace("Z", "")
              .replace(/\.\d+$/, "")
          : "";
      }
      function v(a) {
        return a === "paid"
          ? "已到账"
          : a === "pending"
            ? "待支付"
            : a === "expired"
              ? "已过期"
              : a === "canceled"
                ? "已取消"
                : a || "-";
      }
      async function S() {
        if (!l.value) {
          ((p.value = []), (g.value = []));
          return;
        }
        R.value = !0;
        try {
          if (_.value === "consume") {
            const a = await Qe({ page: 1, pageSize: 50 }),
              r = (a && a.data && a.data.list) || [];
            p.value = r.map((h) => ({
              id: h.order_no,
              address: f(h.receive_address),
              addressFull: h.receive_address,
              amount: h.payment === "free" ? h.free_used : Number(h.trx_used),
              unit: h.payment === "free" ? "笔" : "TRX",
              payType: U(h),
              status: D(h.status),
              raw_status: h.status,
              time: b(h.created_at),
              energy: h.energy_amount,
              duration: h.duration,
              cf_id: h.catfee_order_id,
              cf_status: h.catfee_status,
            }));
          } else {
            const a = await st({ page: 1, pageSize: 50 }),
              r = (a && a.data && a.data.list) || [];
            g.value = r.map((h) => ({
              id: h.order_no,
              amount: Number(h.amount),
              amount_str: h.amount_str,
              method: "TRX 链上转账",
              status: v(h.status),
              raw_status: h.status,
              time: b(h.created_at),
              paid_at: b(h.paid_at),
              txid: h.txid || "",
            }));
          }
        } catch (a) {
          L({ message: a.message || "加载失败", position: "top" });
        } finally {
          R.value = !1;
        }
      }
      const T = z(() => (_.value === "consume" ? p.value : g.value)),
        O = z(() => R.value && T.value.length === 0),
        x = () => s("home");
      function $(a) {
        _.value !== a && ((_.value = a), S());
      }
      const P = (a) =>
        a === "已完成" || a === "已到账"
          ? "status--success"
          : a === "处理中" || a === "待支付"
            ? "status--pending"
            : a === "失败" || a === "已过期" || a === "已取消"
              ? "status--fail"
              : "";
      function N() {
        const a = window.Telegram && window.Telegram.WebApp;
        return a && a.BackButton ? a.BackButton : null;
      }
      let c = "";
      return (
        Be(() => {
          (S(), (c = document.title), (document.title = Fn));
          const a = N();
          if (a) {
            try {
              a.onClick(x);
            } catch {}
            try {
              a.show();
            } catch {}
          }
        }),
        Le(() => {
          c && (document.title = c);
          const a = N();
          if (a) {
            try {
              a.offClick(x);
            } catch {}
            try {
              a.hide();
            } catch {}
          }
        }),
        (a, r) => {
          const h = Q;
          return (
            u(),
            m("div", pn, [
              e("div", fn, [
                e(
                  "div",
                  {
                    class: M(["tab-item", { active: _.value === "consume" }]),
                    onClick: r[0] || (r[0] = (w) => $("consume")),
                  },
                  [
                    ...(r[2] ||
                      (r[2] = [
                        G(" 消费记录 ", -1),
                        e("span", { class: "tab-underline" }, null, -1),
                      ])),
                  ],
                  2,
                ),
                e(
                  "div",
                  {
                    class: M(["tab-item", { active: _.value === "recharge" }]),
                    onClick: r[1] || (r[1] = (w) => $("recharge")),
                  },
                  [
                    ...(r[3] ||
                      (r[3] = [
                        G(" 充值记录 ", -1),
                        e("span", { class: "tab-underline" }, null, -1),
                      ])),
                  ],
                  2,
                ),
              ]),
              O.value
                ? (u(), F(un, { key: 0, count: 4 }))
                : (u(),
                  m("div", vn, [
                    T.value.length
                      ? (u(),
                        m(
                          K,
                          { key: 0 },
                          [
                            _.value === "consume"
                              ? (u(!0),
                                m(
                                  K,
                                  { key: 0 },
                                  Y(
                                    T.value,
                                    (w) => (
                                      u(),
                                      m(
                                        "div",
                                        { key: w.id, class: "record-card" },
                                        [
                                          e("div", mn, [
                                            e("div", gn, [
                                              d(h, {
                                                name: "exchange",
                                                size: "16",
                                                color: "#3a7afe",
                                              }),
                                              r[4] ||
                                                (r[4] = e(
                                                  "span",
                                                  null,
                                                  "能量租用",
                                                  -1,
                                                )),
                                            ]),
                                            e(
                                              "div",
                                              {
                                                class: M([
                                                  "record-status",
                                                  P(w.status),
                                                ]),
                                              },
                                              y(w.status),
                                              3,
                                            ),
                                          ]),
                                          e("div", _n, [
                                            r[5] ||
                                              (r[5] = e(
                                                "span",
                                                { class: "row-label" },
                                                "接收地址",
                                                -1,
                                              )),
                                            e("span", hn, y(w.address), 1),
                                          ]),
                                          e("div", yn, [
                                            r[6] ||
                                              (r[6] = e(
                                                "span",
                                                { class: "row-label" },
                                                "能量数量",
                                                -1,
                                              )),
                                            e(
                                              "span",
                                              wn,
                                              y(
                                                Number(
                                                  w.energy,
                                                ).toLocaleString(),
                                              ),
                                              1,
                                            ),
                                          ]),
                                          e("div", bn, [
                                            r[7] ||
                                              (r[7] = e(
                                                "span",
                                                { class: "row-label" },
                                                "支付方式",
                                                -1,
                                              )),
                                            e("span", xn, y(w.payType), 1),
                                          ]),
                                          e("div", $n, [
                                            r[8] ||
                                              (r[8] = e(
                                                "span",
                                                { class: "row-label" },
                                                "消耗",
                                                -1,
                                              )),
                                            e(
                                              "span",
                                              kn,
                                              y(
                                                w.unit === "TRX"
                                                  ? Number(w.amount).toFixed(2)
                                                  : w.amount,
                                              ) +
                                                " " +
                                                y(w.unit),
                                              1,
                                            ),
                                          ]),
                                          e("div", Tn, [
                                            r[9] ||
                                              (r[9] = e(
                                                "span",
                                                { class: "row-label" },
                                                "订单号",
                                                -1,
                                              )),
                                            e("span", Cn, y(w.id), 1),
                                          ]),
                                          e("div", Sn, [
                                            r[10] ||
                                              (r[10] = e(
                                                "span",
                                                { class: "row-label" },
                                                "时间",
                                                -1,
                                              )),
                                            e("span", An, y(w.time), 1),
                                          ]),
                                        ],
                                      )
                                    ),
                                  ),
                                  128,
                                ))
                              : (u(!0),
                                m(
                                  K,
                                  { key: 1 },
                                  Y(
                                    T.value,
                                    (w) => (
                                      u(),
                                      m(
                                        "div",
                                        { key: w.id, class: "record-card" },
                                        [
                                          e("div", Rn, [
                                            e("div", En, [
                                              d(h, {
                                                name: "balance-o",
                                                size: "16",
                                                color: "#ff9c2e",
                                              }),
                                              r[11] ||
                                                (r[11] = e(
                                                  "span",
                                                  null,
                                                  "账户充值",
                                                  -1,
                                                )),
                                            ]),
                                            e(
                                              "div",
                                              {
                                                class: M([
                                                  "record-status",
                                                  P(w.status),
                                                ]),
                                              },
                                              y(w.status),
                                              3,
                                            ),
                                          ]),
                                          e("div", In, [
                                            r[12] ||
                                              (r[12] = e(
                                                "span",
                                                { class: "row-label" },
                                                "充值金额",
                                                -1,
                                              )),
                                            e(
                                              "span",
                                              Bn,
                                              " +" + y(w.amount_str) + " TRX ",
                                              1,
                                            ),
                                          ]),
                                          e("div", Ln, [
                                            r[13] ||
                                              (r[13] = e(
                                                "span",
                                                { class: "row-label" },
                                                "充值方式",
                                                -1,
                                              )),
                                            e("span", zn, y(w.method), 1),
                                          ]),
                                          e("div", Dn, [
                                            r[14] ||
                                              (r[14] = e(
                                                "span",
                                                { class: "row-label" },
                                                "订单号",
                                                -1,
                                              )),
                                            e("span", On, y(w.id), 1),
                                          ]),
                                          w.txid
                                            ? (u(),
                                              m("div", Nn, [
                                                r[15] ||
                                                  (r[15] = e(
                                                    "span",
                                                    { class: "row-label" },
                                                    "TXID",
                                                    -1,
                                                  )),
                                                e(
                                                  "span",
                                                  Un,
                                                  y(w.txid.slice(0, 10)) +
                                                    "..." +
                                                    y(w.txid.slice(-6)),
                                                  1,
                                                ),
                                              ]))
                                            : V("", !0),
                                          e("div", Vn, [
                                            e(
                                              "span",
                                              Pn,
                                              y(
                                                w.raw_status === "paid"
                                                  ? "到账时间"
                                                  : "创建时间",
                                              ),
                                              1,
                                            ),
                                            e(
                                              "span",
                                              Mn,
                                              y(
                                                w.raw_status === "paid"
                                                  ? w.paid_at
                                                  : w.time,
                                              ),
                                              1,
                                            ),
                                          ]),
                                        ],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                          ],
                          64,
                        ))
                      : (u(),
                        m("div", Xn, [
                          d(h, {
                            name: "orders-o",
                            size: "48",
                            color: "#c9d2e0",
                          }),
                          r[16] ||
                            (r[16] = e(
                              "div",
                              { class: "empty-text" },
                              "暂无记录",
                              -1,
                            )),
                        ])),
                  ])),
            ])
          );
        }
      );
    },
  },
  qn = q(Hn, [["__scopeId", "data-v-354c24c9"]]),
  Wn = { class: "recharge-skel" },
  jn = { class: "balance-card" },
  Gn = { class: "form-card" },
  Kn = { class: "quick-row" },
  Zn = {
    __name: "RechargeSkeleton",
    setup(t) {
      return (s, l) => (
        u(),
        m("div", Wn, [
          e("div", jn, [
            d(k, { width: "60px", height: "13px" }),
            d(k, { width: "50%", height: "32px", radius: "8px" }),
          ]),
          e("div", Gn, [
            d(k, { width: "50%", height: "16px" }),
            d(k, { width: "100%", height: "56px", radius: "10px" }),
            d(k, { width: "40%", height: "14px" }),
            e("div", Kn, [
              d(k, { width: "23%", height: "42px", radius: "10px" }),
              d(k, { width: "23%", height: "42px", radius: "10px" }),
              d(k, { width: "23%", height: "42px", radius: "10px" }),
              d(k, { width: "23%", height: "42px", radius: "10px" }),
            ]),
            d(k, { width: "80%", height: "12px" }),
            d(k, { width: "100%", height: "48px", radius: "24px" }),
          ]),
        ])
      );
    },
  },
  Jn = q(Zn, [["__scopeId", "data-v-77e9b3ee"]]),
  Qn = { key: 1, class: "recharge" },
  Yn = { class: "balance-card" },
  ea = { class: "balance-value" },
  ta = { key: 0, class: "card form-card" },
  sa = { class: "amount-input-wrap" },
  na = ["placeholder", "value"],
  aa = { class: "quick-list" },
  oa = ["onClick"],
  ra = { class: "tips" },
  ia = ["disabled"],
  la = { key: 0, class: "warn-box" },
  da = { key: 1, class: "card pay-card" },
  ca = { key: 0, class: "status-bar pending" },
  ua = { key: 1, class: "status-bar success" },
  pa = { key: 2, class: "status-bar fail" },
  fa = { key: 3, class: "status-bar fail" },
  va = { class: "key-amount" },
  ma = { class: "key-amount-value" },
  ga = { class: "amount-num" },
  _a = { key: 4, class: "qr-wrap" },
  ha = ["src"],
  ya = { class: "addr-row" },
  wa = { class: "addr-value mono" },
  ba = { class: "rule-box" },
  xa = { class: "action-row" },
  $a = "充值",
  ka = {
    __name: "Recharge",
    setup(t) {
      const s = we("navigate"),
        {
          userInfo: l,
          config: _,
          refreshUser: p,
          applyServerUser: g,
          inTelegram: R,
          isReady: D,
        } = ee(),
        U = A(!0),
        f = z(() => Number(l.value.trx_balance) || 0),
        b = A({
          configured: !1,
          qr_url: "",
          min_amount: 1,
          max_amount: 1e5,
          expire_minutes: 10,
        }),
        v = A(""),
        S = [100, 200, 500, 1e3],
        T = z(() => {
          const o = parseInt(v.value, 10);
          return Number.isInteger(o) && o > 0 ? o : 0;
        }),
        O = z(
          () =>
            T.value >= (b.value.min_amount || 1) &&
            T.value <= (b.value.max_amount || 1e5),
        ),
        x = () => (s == null ? void 0 : s("home")),
        $ = (o) => {
          v.value = String(o);
        },
        P = (o) => {
          let n = o.target.value;
          ((n = n.replace(/[^\d]/g, "")),
            n.length > 9 && (n = n.slice(0, 9)),
            (v.value = n));
        },
        N = A(!1),
        c = A(null),
        a = A(0);
      let r = null,
        h = null;
      function w() {
        (r && (clearInterval(r), (r = null)),
          h && (clearTimeout(h), (h = null)));
      }
      function fe(o) {
        w();
        const n = te(o),
          I = () => {
            const X = Math.max(0, Math.floor((n - Date.now()) / 1e3));
            ((a.value = X),
              X <= 0 &&
                c.value &&
                c.value.status === "pending" &&
                ((c.value = { ...c.value, status: "expired" }),
                L({ message: "订单已过期", position: "top" }),
                w()));
          };
        (I(), (r = setInterval(I, 1e3)));
      }
      function te(o) {
        if (!o) return Date.now();
        const n = String(o).includes("T") ? o : o.replace(" ", "T") + "Z",
          I = Date.parse(n);
        return Number.isFinite(I) ? I : Date.now();
      }
      function se(o) {
        const n = Math.floor(o / 60),
          I = o % 60;
        return `${String(n).padStart(2, "0")}:${String(I).padStart(2, "0")}`;
      }
      async function ne() {
        if (!(!c.value || c.value.status !== "pending")) {
          try {
            const o = await nt(c.value.order_no),
              n = o && o.data && o.data.order,
              I = o && o.data && o.data.user;
            if (n) {
              if (((c.value = n), n.status === "paid")) {
                (w(), I ? g(I) : await p());
                return;
              }
              if (n.status === "expired" || n.status === "canceled") {
                w();
                return;
              }
            }
          } catch {}
          h = setTimeout(ne, 4e3);
        }
      }
      async function ve() {
        if (!R.value) {
          U.value = !1;
          return;
        }
        try {
          const o = await et();
          o && o.data && (b.value = { ...b.value, ...o.data });
        } catch {
        } finally {
          U.value = !1;
        }
      }
      const me = z(() => !D.value || U.value);
      async function ge() {
        if (!N.value) {
          if (!R.value) {
            L({ message: "请在 Telegram 内打开小程序后操作", position: "top" });
            return;
          }
          if (!b.value.configured) {
            L({ message: "管理员尚未配置收款地址", position: "top" });
            return;
          }
          if (!O.value) {
            L({
              message: `请输入 ${b.value.min_amount}~${b.value.max_amount} TRX 的整数金额`,
              position: "top",
            });
            return;
          }
          N.value = !0;
          try {
            const o = await tt(T.value),
              n = o && o.data && o.data.order;
            if (!n) throw new Error("创建订单失败");
            ((c.value = n), fe(n.expire_at), (h = setTimeout(ne, 4e3)));
          } catch (o) {
            Me({
              title: "创建充值订单失败",
              message: o.message || "请稍后重试",
            });
          } finally {
            N.value = !1;
          }
        }
      }
      async function _e() {
        if (!c.value || c.value.status !== "pending") {
          Z();
          return;
        }
        try {
          await at(c.value.order_no);
        } catch {}
        (L({ message: "已取消订单", position: "top" }), Z());
      }
      function Z() {
        (w(), (c.value = null), (a.value = 0));
      }
      async function ae(o) {
        var X;
        try {
          if ((X = navigator.clipboard) != null && X.writeText)
            return (await navigator.clipboard.writeText(o), !0);
        } catch {}
        const n = document.createElement("textarea");
        ((n.value = o),
          (n.style.position = "fixed"),
          (n.style.left = "-9999px"),
          document.body.appendChild(n),
          n.focus(),
          n.select());
        let I = !1;
        try {
          I = document.execCommand("copy");
        } catch {
          I = !1;
        }
        return (document.body.removeChild(n), I);
      }
      const B = async () => {
          if (!c.value) return;
          const o = await ae(c.value.recharge_address);
          L({ message: o ? "地址已复制" : "复制失败", position: "top" });
        },
        i = async () => {
          if (!c.value) return;
          const o = await ae(c.value.amount_str);
          L({ message: o ? "金额已复制" : "复制失败", position: "top" });
        },
        C = () => {
          const o = _.value.kf_url;
          if (!o) {
            L({ message: "客服链接未配置", position: "top" });
            return;
          }
          const n = window.Telegram && window.Telegram.WebApp;
          try {
            n && /^https:\/\/t\.me\//i.test(o)
              ? n.openTelegramLink(o)
              : n
                ? n.openLink(o)
                : window.open(o, "_blank");
          } catch {
            window.open(o, "_blank");
          }
        };
      let W = "";
      function E() {
        const o = window.Telegram && window.Telegram.WebApp;
        return o && o.BackButton ? o.BackButton : null;
      }
      const J = () => {
        if (c.value && c.value.status === "pending") {
          Z();
          return;
        }
        x();
      };
      return (
        Be(() => {
          (ve(), (W = document.title), (document.title = $a));
          const o = E();
          if (o) {
            try {
              o.onClick(J);
            } catch {}
            try {
              o.show();
            } catch {}
          }
        }),
        Le(() => {
          (w(), W && (document.title = W));
          const o = E();
          if (o) {
            try {
              o.offClick(J);
            } catch {}
            try {
              o.hide();
            } catch {}
          }
        }),
        (o, n) => {
          const I = Q;
          return me.value
            ? (u(), F(Jn, { key: 0 }))
            : (u(),
              m("div", Qn, [
                e("section", Yn, [
                  n[2] || (n[2] = e("div", { class: "balance-bg" }, null, -1)),
                  n[3] ||
                    (n[3] = e(
                      "div",
                      { class: "balance-label" },
                      "当前余额",
                      -1,
                    )),
                  e("div", ea, [
                    G(y(f.value.toFixed(2)) + " ", 1),
                    n[1] ||
                      (n[1] = e("span", { class: "balance-unit" }, "TRX", -1)),
                  ]),
                ]),
                c.value
                  ? (u(),
                    m("section", da, [
                      c.value.status === "pending"
                        ? (u(),
                          m("div", ca, [
                            d(I, { name: "clock-o", size: "18" }),
                            e("span", null, [
                              n[9] || (n[9] = G("等待支付，剩余 ", -1)),
                              e("b", null, y(se(a.value)), 1),
                            ]),
                          ]))
                        : c.value.status === "paid"
                          ? (u(),
                            m("div", ua, [
                              d(I, { name: "passed", size: "18" }),
                              n[10] ||
                                (n[10] = e(
                                  "span",
                                  null,
                                  "支付成功，余额已到账",
                                  -1,
                                )),
                            ]))
                          : c.value.status === "expired"
                            ? (u(),
                              m("div", pa, [
                                d(I, { name: "close", size: "18" }),
                                n[11] ||
                                  (n[11] = e("span", null, "订单已过期", -1)),
                              ]))
                            : (u(),
                              m("div", fa, [
                                d(I, { name: "close", size: "18" }),
                                n[12] ||
                                  (n[12] = e("span", null, "订单已取消", -1)),
                              ])),
                      e("div", va, [
                        n[15] ||
                          (n[15] = e(
                            "div",
                            { class: "key-amount-label" },
                            "请精确转账（含小数点）",
                            -1,
                          )),
                        e("div", ma, [
                          e("span", ga, y(c.value.amount_str), 1),
                          n[13] ||
                            (n[13] = e(
                              "span",
                              { class: "amount-unit" },
                              "TRX",
                              -1,
                            )),
                        ]),
                        e("button", { class: "ghost-btn", onClick: i }, [
                          d(I, { name: "notes-o", size: "14" }),
                          n[14] || (n[14] = e("span", null, "复制金额", -1)),
                        ]),
                      ]),
                      b.value.qr_url
                        ? (u(),
                          m("div", _a, [
                            e(
                              "img",
                              {
                                class: "qr-img",
                                src: b.value.qr_url,
                                alt: "收款二维码",
                                referrerpolicy: "no-referrer",
                              },
                              null,
                              8,
                              ha,
                            ),
                            n[16] ||
                              (n[16] = e(
                                "div",
                                { class: "qr-tip" },
                                "扫码或复制地址进行转账",
                                -1,
                              )),
                          ]))
                        : V("", !0),
                      e("div", ya, [
                        n[18] ||
                          (n[18] = e(
                            "div",
                            { class: "addr-label" },
                            "收款地址",
                            -1,
                          )),
                        e("div", wa, y(c.value.recharge_address), 1),
                        e("button", { class: "ghost-btn", onClick: B }, [
                          d(I, { name: "notes-o", size: "14" }),
                          n[17] || (n[17] = e("span", null, "复制地址", -1)),
                        ]),
                      ]),
                      e("div", ba, [
                        n[24] ||
                          (n[24] = e(
                            "div",
                            { class: "rule-title" },
                            "⚠️ 重要提示",
                            -1,
                          )),
                        e("ul", null, [
                          e("li", null, [
                            n[19] || (n[19] = G("必须按 ", -1)),
                            e("b", null, y(c.value.amount_str), 1),
                            n[20] || (n[20] = G(" TRX 精确金额转账", -1)),
                          ]),
                          n[21] ||
                            (n[21] = e(
                              "li",
                              null,
                              "仅支持 TRC20-TRX，请勿误转 USDT 或其他链资产",
                              -1,
                            )),
                          n[22] ||
                            (n[22] = e(
                              "li",
                              null,
                              "到账时间约 3-5 秒（1 区块确认）",
                              -1,
                            )),
                          n[23] ||
                            (n[23] = e(
                              "li",
                              null,
                              "订单超时后自动取消，已转出资金请联系客服",
                              -1,
                            )),
                        ]),
                      ]),
                      e("div", xa, [
                        c.value.status === "pending"
                          ? (u(),
                            m(
                              "button",
                              { key: 0, class: "ghost-btn full", onClick: _e },
                              "取消订单",
                            ))
                          : (u(),
                            m(
                              "button",
                              { key: 1, class: "ghost-btn full", onClick: Z },
                              "重新发起",
                            )),
                        e(
                          "button",
                          { class: "primary-btn full", onClick: C },
                          "联系客服",
                        ),
                      ]),
                    ]))
                  : (u(),
                    m("section", ta, [
                      n[7] ||
                        (n[7] = e(
                          "div",
                          { class: "form-label" },
                          "充值金额（TRX 整数）",
                          -1,
                        )),
                      e("div", sa, [
                        n[4] ||
                          (n[4] = e("span", { class: "prefix" }, "TRX", -1)),
                        e(
                          "input",
                          {
                            class: "amount-input",
                            type: "text",
                            inputmode: "numeric",
                            placeholder: `${b.value.min_amount} ~ ${b.value.max_amount}`,
                            value: v.value,
                            onInput: P,
                          },
                          null,
                          40,
                          na,
                        ),
                        v.value
                          ? (u(),
                            m(
                              "span",
                              {
                                key: 0,
                                class: "clear-btn",
                                onClick: n[0] || (n[0] = (X) => (v.value = "")),
                              },
                              [
                                d(I, {
                                  name: "clear",
                                  size: "18",
                                  color: "#c9d2e0",
                                }),
                              ],
                            ))
                          : V("", !0),
                      ]),
                      n[8] ||
                        (n[8] = e(
                          "div",
                          { class: "quick-label" },
                          "金额快捷键",
                          -1,
                        )),
                      e("div", aa, [
                        (u(),
                        m(
                          K,
                          null,
                          Y(S, (X) =>
                            e(
                              "button",
                              {
                                key: X,
                                class: M([
                                  "quick-item",
                                  { active: T.value === X },
                                ]),
                                onClick: (Oe) => $(X),
                              },
                              y(X) + " TRX ",
                              11,
                              oa,
                            ),
                          ),
                          64,
                        )),
                      ]),
                      e("div", ra, [
                        d(I, { name: "info-o", size: "14", color: "#9aa3b2" }),
                        n[5] ||
                          (n[5] = e(
                            "span",
                            null,
                            "系统按金额小数点尾数识别您的充值订单，请按实际待支付金额转账",
                            -1,
                          )),
                      ]),
                      e(
                        "button",
                        {
                          class: M([
                            "submit-btn",
                            { disabled: !O.value || N.value },
                          ]),
                          disabled: !O.value || N.value,
                          onClick: ge,
                        },
                        y(N.value ? "创建订单中..." : "立即充值"),
                        11,
                        ia,
                      ),
                      b.value.configured
                        ? V("", !0)
                        : (u(),
                          m("div", la, [
                            d(I, {
                              name: "warning-o",
                              size: "14",
                              color: "#f59e0b",
                            }),
                            n[6] ||
                              (n[6] = e(
                                "span",
                                null,
                                "管理员尚未配置收款地址，暂时无法充值",
                                -1,
                              )),
                          ])),
                    ])),
              ]));
        }
      );
    },
  },
  Ta = q(ka, [["__scopeId", "data-v-fabf8652"]]),
  Ca = { class: "app" },
  Sa = {
    __name: "App",
    setup(t) {
      const s = A("home");
      return (
        Ue("navigate", (_) => {
          s.value = _;
        }),
        (_, p) => (
          u(),
          m("div", Ca, [
            d(
              Ne,
              { name: "fade", mode: "out-in" },
              {
                default: pe(() => [
                  s.value === "home"
                    ? (u(), F(rn, { key: 0 }))
                    : s.value === "orders"
                      ? (u(), F(qn, { key: 1 }))
                      : s.value === "recharge"
                        ? (u(), F(Ta, { key: 2 }))
                        : V("", !0),
                ]),
                _: 1,
              },
            ),
          ])
        )
      );
    },
  },
  Aa = q(Sa, [["__scopeId", "data-v-81fa211f"]]);
function Ra() {
  if (!(typeof window > "u"))
    try {
      const t =
          "color:#ef4444;font-size:32px;font-weight:bold;text-shadow:0 1px 0 #fff",
        s = "color:#1f2937;font-size:14px;line-height:1.5",
        l = "color:#3a7afe;font-size:14px;font-weight:bold";
    } catch {}
}
function Ea() {
  if (!(typeof window > "u"))
    try {
      const t = () => {};
      [
        "log",
        "info",
        "debug",
        "trace",
        "dir",
        "table",
        "group",
        "groupEnd",
      ].forEach((l) => {
        typeof console[l] == "function" && (console[l] = t);
      });
    } catch {}
}
function Ia() {
  typeof window > "u" ||
    (window.addEventListener("contextmenu", (t) => t.preventDefault(), {
      capture: !0,
    }),
    window.addEventListener(
      "keydown",
      (t) => {
        const s = (t.key || "").toLowerCase(),
          l = t.ctrlKey || t.metaKey;
        if (
          s === "f12" ||
          (l && t.shiftKey && (s === "i" || s === "j" || s === "c")) ||
          (l && (s === "u" || s === "s"))
        )
          return t.preventDefault();
      },
      { capture: !0 },
    ),
    window.addEventListener("dragstart", (t) => {
      const s = t.target;
      (s && (s.tagName === "INPUT" || s.tagName === "TEXTAREA")) ||
        t.preventDefault();
    }));
}
let Ee = !1;
const Ba = new Set();
function Ie(t) {
  t !== Ee &&
    ((Ee = t),
    Ba.forEach((s) => {
      try {
        s(t);
      } catch {}
    }));
}
function La() {
  if (typeof window > "u") return;
  const t = 160,
    s = () => {
      try {
        const _ = window.outerWidth - window.innerWidth,
          p = window.outerHeight - window.innerHeight,
          g = _ > t || p > t;
        Ie(g);
      } catch {}
    };
  (setInterval(s, 1500),
    window.addEventListener("resize", s),
    setInterval(() => {
      const _ = Date.now();
      function p() {}
      Date.now() - _ > 100 && Ie(!0);
    }, 5e3));
}
function za() {
  typeof document > "u" ||
    document.addEventListener(
      "click",
      (t) => {
        const s =
          t.target &&
          t.target.closest &&
          t.target.closest('a[target="_blank"]');
        if (!s) return;
        const l = (s.getAttribute("rel") || "").toLowerCase();
        l.includes("noopener") ||
          s.setAttribute("rel", (l + " noopener noreferrer").trim());
      },
      { capture: !0 },
    );
}
function Da() {
  if (!(typeof window > "u"))
    try {
      window.top !== window.self &&
        (window.top.location = window.self.location);
    } catch {
      try {
        document.body.innerHTML = "";
      } catch {}
    }
}
function Oa() {
  (Ra(), Ea(), Ia(), La(), za(), Da());
}
Oa();
const le = Ve(Aa);
((le.config.warnHandler = () => {}),
  (le.config.errorHandler = () => {}),
  (le.config.performance = !1));
le.mount("#app");
