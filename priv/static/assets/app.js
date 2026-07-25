(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };

  // node_modules/lodash.throttle/index.js
  var require_lodash = __commonJS({
    "node_modules/lodash.throttle/index.js"(exports, module) {
      var FUNC_ERROR_TEXT = "Expected a function";
      var NAN = 0 / 0;
      var symbolTag = "[object Symbol]";
      var reTrim = /^\s+|\s+$/g;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      var objectProto = Object.prototype;
      var objectToString = objectProto.toString;
      var nativeMax = Math.max;
      var nativeMin = Math.min;
      var now = function() {
        return root.Date.now();
      };
      function debounce(func, wait, options) {
        var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        wait = toNumber(wait) || 0;
        if (isObject2(options)) {
          leading = !!options.leading;
          maxing = "maxWait" in options;
          maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        function invokeFunc(time) {
          var args = lastArgs, thisArg = lastThis;
          lastArgs = lastThis = void 0;
          lastInvokeTime = time;
          result = func.apply(thisArg, args);
          return result;
        }
        function leadingEdge(time) {
          lastInvokeTime = time;
          timerId = setTimeout(timerExpired, wait);
          return leading ? invokeFunc(time) : result;
        }
        function remainingWait(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
          return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
        }
        function shouldInvoke(time) {
          var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
          return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
        }
        function timerExpired() {
          var time = now();
          if (shouldInvoke(time)) {
            return trailingEdge(time);
          }
          timerId = setTimeout(timerExpired, remainingWait(time));
        }
        function trailingEdge(time) {
          timerId = void 0;
          if (trailing && lastArgs) {
            return invokeFunc(time);
          }
          lastArgs = lastThis = void 0;
          return result;
        }
        function cancel() {
          if (timerId !== void 0) {
            clearTimeout(timerId);
          }
          lastInvokeTime = 0;
          lastArgs = lastCallTime = lastThis = timerId = void 0;
        }
        function flush() {
          return timerId === void 0 ? result : trailingEdge(now());
        }
        function debounced() {
          var time = now(), isInvoking = shouldInvoke(time);
          lastArgs = arguments;
          lastThis = this;
          lastCallTime = time;
          if (isInvoking) {
            if (timerId === void 0) {
              return leadingEdge(lastCallTime);
            }
            if (maxing) {
              timerId = setTimeout(timerExpired, wait);
              return invokeFunc(lastCallTime);
            }
          }
          if (timerId === void 0) {
            timerId = setTimeout(timerExpired, wait);
          }
          return result;
        }
        debounced.cancel = cancel;
        debounced.flush = flush;
        return debounced;
      }
      function throttle2(func, wait, options) {
        var leading = true, trailing = true;
        if (typeof func != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        if (isObject2(options)) {
          leading = "leading" in options ? !!options.leading : leading;
          trailing = "trailing" in options ? !!options.trailing : trailing;
        }
        return debounce(func, wait, {
          "leading": leading,
          "maxWait": wait,
          "trailing": trailing
        });
      }
      function isObject2(value) {
        var type = typeof value;
        return !!value && (type == "object" || type == "function");
      }
      function isObjectLike(value) {
        return !!value && typeof value == "object";
      }
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
      }
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject2(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject2(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = value.replace(reTrim, "");
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = throttle2;
    }
  });

  // vendor/topbar.js
  var require_topbar = __commonJS({
    "vendor/topbar.js"(exports, module) {
      (function(window2, document2) {
        "use strict";
        (function() {
          var lastTime = 0;
          var vendors = ["ms", "moz", "webkit", "o"];
          for (var x = 0; x < vendors.length && !window2.requestAnimationFrame; ++x) {
            window2.requestAnimationFrame = window2[vendors[x] + "RequestAnimationFrame"];
            window2.cancelAnimationFrame = window2[vendors[x] + "CancelAnimationFrame"] || window2[vendors[x] + "CancelRequestAnimationFrame"];
          }
          if (!window2.requestAnimationFrame)
            window2.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window2.setTimeout(function() {
                callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
            };
          if (!window2.cancelAnimationFrame)
            window2.cancelAnimationFrame = function(id) {
              clearTimeout(id);
            };
        })();
        var canvas, progressTimerId, fadeTimerId, currentProgress, showing, addEvent = function(elem, type, handler) {
          if (elem.addEventListener)
            elem.addEventListener(type, handler, false);
          else if (elem.attachEvent)
            elem.attachEvent("on" + type, handler);
          else
            elem["on" + type] = handler;
        }, options = {
          autoRun: true,
          barThickness: 3,
          barColors: {
            0: "rgba(26,  188, 156, .9)",
            ".25": "rgba(52,  152, 219, .9)",
            ".50": "rgba(241, 196, 15,  .9)",
            ".75": "rgba(230, 126, 34,  .9)",
            "1.0": "rgba(211, 84,  0,   .9)"
          },
          shadowBlur: 10,
          shadowColor: "rgba(0,   0,   0,   .6)",
          className: null
        }, repaint = function() {
          canvas.width = window2.innerWidth;
          canvas.height = options.barThickness * 5;
          var ctx = canvas.getContext("2d");
          ctx.shadowBlur = options.shadowBlur;
          ctx.shadowColor = options.shadowColor;
          var lineGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
          for (var stop in options.barColors)
            lineGradient.addColorStop(stop, options.barColors[stop]);
          ctx.lineWidth = options.barThickness;
          ctx.beginPath();
          ctx.moveTo(0, options.barThickness / 2);
          ctx.lineTo(Math.ceil(currentProgress * canvas.width), options.barThickness / 2);
          ctx.strokeStyle = lineGradient;
          ctx.stroke();
        }, createCanvas = function() {
          canvas = document2.createElement("canvas");
          var style = canvas.style;
          style.position = "fixed";
          style.top = style.left = style.right = style.margin = style.padding = 0;
          style.zIndex = 100001;
          style.display = "none";
          if (options.className)
            canvas.classList.add(options.className);
          document2.body.appendChild(canvas);
          addEvent(window2, "resize", repaint);
        }, topbar2 = {
          config: function(opts) {
            for (var key in opts)
              if (options.hasOwnProperty(key))
                options[key] = opts[key];
          },
          show: function() {
            if (showing)
              return;
            showing = true;
            if (fadeTimerId !== null)
              window2.cancelAnimationFrame(fadeTimerId);
            if (!canvas)
              createCanvas();
            canvas.style.opacity = 1;
            canvas.style.display = "block";
            topbar2.progress(0);
            if (options.autoRun) {
              (function loop() {
                progressTimerId = window2.requestAnimationFrame(loop);
                topbar2.progress("+" + 0.05 * Math.pow(1 - Math.sqrt(currentProgress), 2));
              })();
            }
          },
          progress: function(to) {
            if (typeof to === "undefined")
              return currentProgress;
            if (typeof to === "string") {
              to = (to.indexOf("+") >= 0 || to.indexOf("-") >= 0 ? currentProgress : 0) + parseFloat(to);
            }
            currentProgress = to > 1 ? 1 : to;
            repaint();
            return currentProgress;
          },
          hide: function() {
            if (!showing)
              return;
            showing = false;
            if (progressTimerId != null) {
              window2.cancelAnimationFrame(progressTimerId);
              progressTimerId = null;
            }
            (function loop() {
              if (topbar2.progress("+.1") >= 1) {
                canvas.style.opacity -= 0.05;
                if (canvas.style.opacity <= 0.05) {
                  canvas.style.display = "none";
                  fadeTimerId = null;
                  return;
                }
              }
              fadeTimerId = window2.requestAnimationFrame(loop);
            })();
          }
        };
        if (typeof module === "object" && typeof module.exports === "object") {
          module.exports = topbar2;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return topbar2;
          });
        } else {
          this.topbar = topbar2;
        }
      }).call(exports, window, document);
    }
  });

  // ../deps/phoenix_html/priv/static/phoenix_html.js
  "use strict";
  (function() {
    var PolyfillEvent = eventConstructor();
    function eventConstructor() {
      if (typeof window.CustomEvent === "function")
        return window.CustomEvent;
      function CustomEvent2(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: void 0 };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent2.prototype = window.Event.prototype;
      return CustomEvent2;
    }
    function buildHiddenInput(name, value) {
      var input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value;
      return input;
    }
    function handleClick(element, targetModifierKey) {
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), submit = document.createElement("input"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "none";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      submit.type = "submit";
      form.appendChild(submit);
      submit.click();
    }
    window.addEventListener("click", function(e) {
      var element = e.target;
      if (e.defaultPrevented)
        return;
      while (element && element.getAttribute) {
        var phoenixLinkEvent = new PolyfillEvent("phoenix.link.click", {
          "bubbles": true,
          "cancelable": true
        });
        if (!element.dispatchEvent(phoenixLinkEvent)) {
          e.preventDefault();
          e.stopImmediatePropagation();
          return false;
        }
        if (element.getAttribute("data-method") && element.getAttribute("data-to")) {
          handleClick(element, e.metaKey || e.shiftKey);
          e.preventDefault();
          return false;
        } else {
          element = element.parentNode;
        }
      }
    }, false);
    window.addEventListener("phoenix.link.click", function(e) {
      var message = e.target.getAttribute("data-confirm");
      if (message && !window.confirm(message)) {
        e.preventDefault();
      }
    }, false);
  })();

  // ../deps/phoenix/priv/static/phoenix.mjs
  var closure = (value) => {
    if (typeof value === "function") {
      return value;
    } else {
      let closure22 = function() {
        return value;
      };
      return closure22;
    }
  };
  var globalSelf = typeof self !== "undefined" ? self : null;
  var phxWindow = typeof window !== "undefined" ? window : null;
  var global2 = globalSelf || phxWindow || globalThis;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
  var MAX_LONGPOLL_BATCH_SIZE = 100;
  var DEFAULT_TIMEOUT = 1e4;
  var WS_CLOSE_NORMAL = 1e3;
  var CHANNEL_STATES = {
    closed: "closed",
    errored: "errored",
    joined: "joined",
    joining: "joining",
    leaving: "leaving"
  };
  var CHANNEL_EVENTS = {
    close: "phx_close",
    error: "phx_error",
    join: "phx_join",
    reply: "phx_reply",
    leave: "phx_leave"
  };
  var TRANSPORTS = {
    longpoll: "longpoll",
    websocket: "websocket"
  };
  var XHR_STATES = {
    complete: 4
  };
  var AUTH_TOKEN_PREFIX = "base64url.bearer.phx.";
  var Push = class {
    constructor(channel, event, payload, timeout) {
      this.channel = channel;
      this.event = event;
      this.payload = payload || function() {
        return {};
      };
      this.receivedResp = null;
      this.timeout = timeout;
      this.timeoutTimer = null;
      this.recHooks = [];
      this.sent = false;
    }
    resend(timeout) {
      this.timeout = timeout;
      this.reset();
      this.send();
    }
    send() {
      if (this.hasReceived("timeout")) {
        return;
      }
      this.startTimeout();
      this.sent = true;
      this.channel.socket.push({
        topic: this.channel.topic,
        event: this.event,
        payload: this.payload(),
        ref: this.ref,
        join_ref: this.channel.joinRef()
      });
    }
    receive(status, callback) {
      if (this.hasReceived(status)) {
        callback(this.receivedResp.response);
      }
      this.recHooks.push({ status, callback });
      return this;
    }
    reset() {
      this.cancelRefEvent();
      this.ref = null;
      this.refEvent = null;
      this.receivedResp = null;
      this.sent = false;
    }
    matchReceive({ status, response, _ref }) {
      this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
    }
    cancelRefEvent() {
      if (!this.refEvent) {
        return;
      }
      this.channel.off(this.refEvent);
    }
    cancelTimeout() {
      clearTimeout(this.timeoutTimer);
      this.timeoutTimer = null;
    }
    startTimeout() {
      if (this.timeoutTimer) {
        this.cancelTimeout();
      }
      this.ref = this.channel.socket.makeRef();
      this.refEvent = this.channel.replyEventName(this.ref);
      this.channel.on(this.refEvent, (payload) => {
        this.cancelRefEvent();
        this.cancelTimeout();
        this.receivedResp = payload;
        this.matchReceive(payload);
      });
      this.timeoutTimer = setTimeout(() => {
        this.trigger("timeout", {});
      }, this.timeout);
    }
    hasReceived(status) {
      return this.receivedResp && this.receivedResp.status === status;
    }
    trigger(status, response) {
      this.channel.trigger(this.refEvent, { status, response });
    }
  };
  var Timer = class {
    constructor(callback, timerCalc) {
      this.callback = callback;
      this.timerCalc = timerCalc;
      this.timer = null;
      this.tries = 0;
    }
    reset() {
      this.tries = 0;
      clearTimeout(this.timer);
    }
    scheduleTimeout() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.tries = this.tries + 1;
        this.callback();
      }, this.timerCalc(this.tries + 1));
    }
  };
  var Channel = class {
    constructor(topic, params, socket) {
      this.state = CHANNEL_STATES.closed;
      this.topic = topic;
      this.params = closure(params || {});
      this.socket = socket;
      this.bindings = [];
      this.bindingRef = 0;
      this.timeout = this.socket.timeout;
      this.joinedOnce = false;
      this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
      this.pushBuffer = [];
      this.stateChangeRefs = [];
      this.rejoinTimer = new Timer(() => {
        if (this.socket.isConnected()) {
          this.rejoin();
        }
      }, this.socket.rejoinAfterMs);
      this.stateChangeRefs.push(this.socket.onError(() => this.rejoinTimer.reset()));
      this.stateChangeRefs.push(this.socket.onOpen(() => {
        this.rejoinTimer.reset();
        if (this.isErrored()) {
          this.rejoin();
        }
      }));
      this.joinPush.receive("ok", () => {
        this.state = CHANNEL_STATES.joined;
        this.rejoinTimer.reset();
        this.pushBuffer.forEach((pushEvent) => pushEvent.send());
        this.pushBuffer = [];
      });
      this.joinPush.receive("error", () => {
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.onClose(() => {
        this.rejoinTimer.reset();
        if (this.socket.hasLogger())
          this.socket.log("channel", `close ${this.topic} ${this.joinRef()}`);
        this.state = CHANNEL_STATES.closed;
        this.socket.remove(this);
      });
      this.onError((reason) => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `error ${this.topic}`, reason);
        if (this.isJoining()) {
          this.joinPush.reset();
        }
        this.state = CHANNEL_STATES.errored;
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.joinPush.receive("timeout", () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `timeout ${this.topic} (${this.joinRef()})`, this.joinPush.timeout);
        let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), this.timeout);
        leavePush.send();
        this.state = CHANNEL_STATES.errored;
        this.joinPush.reset();
        if (this.socket.isConnected()) {
          this.rejoinTimer.scheduleTimeout();
        }
      });
      this.on(CHANNEL_EVENTS.reply, (payload, ref) => {
        this.trigger(this.replyEventName(ref), payload);
      });
    }
    join(timeout = this.timeout) {
      if (this.joinedOnce) {
        throw new Error("tried to join multiple times. 'join' can only be called a single time per channel instance");
      } else {
        this.timeout = timeout;
        this.joinedOnce = true;
        this.rejoin();
        return this.joinPush;
      }
    }
    onClose(callback) {
      this.on(CHANNEL_EVENTS.close, callback);
    }
    onError(callback) {
      return this.on(CHANNEL_EVENTS.error, (reason) => callback(reason));
    }
    on(event, callback) {
      let ref = this.bindingRef++;
      this.bindings.push({ event, ref, callback });
      return ref;
    }
    off(event, ref) {
      this.bindings = this.bindings.filter((bind) => {
        return !(bind.event === event && (typeof ref === "undefined" || ref === bind.ref));
      });
    }
    canPush() {
      return this.socket.isConnected() && this.isJoined();
    }
    push(event, payload, timeout = this.timeout) {
      payload = payload || {};
      if (!this.joinedOnce) {
        throw new Error(`tried to push '${event}' to '${this.topic}' before joining. Use channel.join() before pushing events`);
      }
      let pushEvent = new Push(this, event, function() {
        return payload;
      }, timeout);
      if (this.canPush()) {
        pushEvent.send();
      } else {
        pushEvent.startTimeout();
        this.pushBuffer.push(pushEvent);
      }
      return pushEvent;
    }
    leave(timeout = this.timeout) {
      this.rejoinTimer.reset();
      this.joinPush.cancelTimeout();
      this.state = CHANNEL_STATES.leaving;
      let onClose = () => {
        if (this.socket.hasLogger())
          this.socket.log("channel", `leave ${this.topic}`);
        this.trigger(CHANNEL_EVENTS.close, "leave");
      };
      let leavePush = new Push(this, CHANNEL_EVENTS.leave, closure({}), timeout);
      leavePush.receive("ok", () => onClose()).receive("timeout", () => onClose());
      leavePush.send();
      if (!this.canPush()) {
        leavePush.trigger("ok", {});
      }
      return leavePush;
    }
    onMessage(_event, payload, _ref) {
      return payload;
    }
    isMember(topic, event, payload, joinRef) {
      if (this.topic !== topic) {
        return false;
      }
      if (joinRef && joinRef !== this.joinRef()) {
        if (this.socket.hasLogger())
          this.socket.log("channel", "dropping outdated message", { topic, event, payload, joinRef });
        return false;
      } else {
        return true;
      }
    }
    joinRef() {
      return this.joinPush.ref;
    }
    rejoin(timeout = this.timeout) {
      if (this.isLeaving()) {
        return;
      }
      this.socket.leaveOpenTopic(this.topic);
      this.state = CHANNEL_STATES.joining;
      this.joinPush.resend(timeout);
    }
    trigger(event, payload, ref, joinRef) {
      let handledPayload = this.onMessage(event, payload, ref, joinRef);
      if (payload && !handledPayload) {
        throw new Error("channel onMessage callbacks must return the payload, modified or unmodified");
      }
      let eventBindings = this.bindings.filter((bind) => bind.event === event);
      for (let i = 0; i < eventBindings.length; i++) {
        let bind = eventBindings[i];
        bind.callback(handledPayload, ref, joinRef || this.joinRef());
      }
    }
    replyEventName(ref) {
      return `chan_reply_${ref}`;
    }
    isClosed() {
      return this.state === CHANNEL_STATES.closed;
    }
    isErrored() {
      return this.state === CHANNEL_STATES.errored;
    }
    isJoined() {
      return this.state === CHANNEL_STATES.joined;
    }
    isJoining() {
      return this.state === CHANNEL_STATES.joining;
    }
    isLeaving() {
      return this.state === CHANNEL_STATES.leaving;
    }
  };
  var Ajax = class {
    static request(method, endPoint, headers, body, timeout, ontimeout, callback) {
      if (global2.XDomainRequest) {
        let req = new global2.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else if (global2.XMLHttpRequest) {
        let req = new global2.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, headers, body, timeout, ontimeout, callback);
      } else if (global2.fetch && global2.AbortController) {
        return this.fetchRequest(method, endPoint, headers, body, timeout, ontimeout, callback);
      } else {
        throw new Error("No suitable XMLHttpRequest implementation found");
      }
    }
    static fetchRequest(method, endPoint, headers, body, timeout, ontimeout, callback) {
      let options = {
        method,
        headers,
        body
      };
      let controller = null;
      if (timeout) {
        controller = new AbortController();
        const _timeoutId = setTimeout(() => controller.abort(), timeout);
        options.signal = controller.signal;
      }
      global2.fetch(endPoint, options).then((response) => response.text()).then((data) => this.parseJSON(data)).then((data) => callback && callback(data)).catch((err) => {
        if (err.name === "AbortError" && ontimeout) {
          ontimeout();
        } else {
          callback && callback(null);
        }
      });
      return controller;
    }
    static xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback) {
      req.timeout = timeout;
      req.open(method, endPoint);
      req.onload = () => {
        let response = this.parseJSON(req.responseText);
        callback && callback(response);
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.onprogress = () => {
      };
      req.send(body);
      return req;
    }
    static xhrRequest(req, method, endPoint, headers, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      for (let [key, value] of Object.entries(headers)) {
        req.setRequestHeader(key, value);
      }
      req.onerror = () => callback && callback(null);
      req.onreadystatechange = () => {
        if (req.readyState === XHR_STATES.complete && callback) {
          let response = this.parseJSON(req.responseText);
          callback(response);
        }
      };
      if (ontimeout) {
        req.ontimeout = ontimeout;
      }
      req.send(body);
      return req;
    }
    static parseJSON(resp) {
      if (!resp || resp === "") {
        return null;
      }
      try {
        return JSON.parse(resp);
      } catch (e) {
        console && console.log("failed to parse JSON response", resp);
        return null;
      }
    }
    static serialize(obj, parentKey) {
      let queryStr = [];
      for (var key in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, key)) {
          continue;
        }
        let paramKey = parentKey ? `${parentKey}[${key}]` : key;
        let paramVal = obj[key];
        if (typeof paramVal === "object") {
          queryStr.push(this.serialize(paramVal, paramKey));
        } else {
          queryStr.push(encodeURIComponent(paramKey) + "=" + encodeURIComponent(paramVal));
        }
      }
      return queryStr.join("&");
    }
    static appendParams(url, params) {
      if (Object.keys(params).length === 0) {
        return url;
      }
      let prefix = url.match(/\?/) ? "&" : "?";
      return `${url}${prefix}${this.serialize(params)}`;
    }
  };
  var arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };
  var LongPoll = class {
    constructor(endPoint, protocols) {
      if (protocols && protocols.length === 2 && protocols[1].startsWith(AUTH_TOKEN_PREFIX)) {
        this.authToken = atob(protocols[1].slice(AUTH_TOKEN_PREFIX.length));
      }
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
      this.awaitingBatchAck = false;
      this.currentBatch = null;
      this.currentBatchTimer = null;
      this.batchBuffer = [];
      this.onopen = function() {
      };
      this.onerror = function() {
      };
      this.onmessage = function() {
      };
      this.onclose = function() {
      };
      this.pollEndpoint = this.normalizeEndpoint(endPoint);
      this.readyState = SOCKET_STATES.connecting;
      setTimeout(() => this.poll(), 0);
    }
    normalizeEndpoint(endPoint) {
      return endPoint.replace("ws://", "http://").replace("wss://", "https://").replace(new RegExp("(.*)/" + TRANSPORTS.websocket), "$1/" + TRANSPORTS.longpoll);
    }
    endpointURL() {
      return Ajax.appendParams(this.pollEndpoint, { token: this.token });
    }
    closeAndRetry(code, reason, wasClean) {
      this.close(code, reason, wasClean);
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry(1005, "timeout", false);
    }
    isActive() {
      return this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting;
    }
    poll() {
      const headers = { "Accept": "application/json" };
      if (this.authToken) {
        headers["X-Phoenix-AuthToken"] = this.authToken;
      }
      this.ajax("GET", headers, null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          if (status === 410 && this.token !== null) {
            this.onerror(410);
            this.closeAndRetry(3410, "session_gone", false);
            return;
          }
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => this.onmessage({ data: msg }), 0);
            });
            this.poll();
            break;
          case 204:
            this.poll();
            break;
          case 410:
            this.readyState = SOCKET_STATES.open;
            this.onopen({});
            this.poll();
            break;
          case 403:
            this.onerror(403);
            this.close(1008, "forbidden", false);
            break;
          case 0:
          case 500:
            this.onerror(500);
            this.closeAndRetry(1011, "internal server error", 500);
            break;
          default:
            throw new Error(`unhandled poll status ${status}`);
        }
      });
    }
    send(body) {
      if (typeof body !== "string") {
        body = arrayBufferToBase64(body);
      }
      if (this.currentBatch) {
        this.currentBatch.push(body);
      } else if (this.awaitingBatchAck) {
        this.batchBuffer.push(body);
      } else {
        this.currentBatch = [body];
        this.currentBatchTimer = setTimeout(() => {
          this.batchSend(this.currentBatch);
          this.currentBatch = null;
        }, 0);
      }
    }
    batchSend(messages, offset = 0) {
      this.awaitingBatchAck = true;
      const next = offset + MAX_LONGPOLL_BATCH_SIZE;
      const batch = messages.slice(offset, next);
      this.ajax("POST", { "Content-Type": "application/x-ndjson" }, batch.join("\n"), () => this.onerror("timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.awaitingBatchAck = false;
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        } else if (next < messages.length) {
          this.batchSend(messages, next);
        } else if (this.batchBuffer.length > 0) {
          this.batchSend(this.batchBuffer);
          this.batchBuffer = [];
        } else {
          this.awaitingBatchAck = false;
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      this.batchBuffer = [];
      clearTimeout(this.currentBatchTimer);
      this.currentBatchTimer = null;
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, headers, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), headers, body, this.timeout, ontimeout, (resp) => {
        this.reqs.delete(req);
        if (this.isActive()) {
          callback(resp);
        }
      });
      this.reqs.add(req);
    }
  };
  var serializer_default = {
    HEADER_LENGTH: 1,
    META_LENGTH: 4,
    KINDS: { push: 0, reply: 1, broadcast: 2 },
    encode(msg, callback) {
      if (msg.payload.constructor === ArrayBuffer) {
        return callback(this.binaryEncode(msg));
      } else {
        let payload = [msg.join_ref, msg.ref, msg.topic, msg.event, msg.payload];
        return callback(JSON.stringify(payload));
      }
    },
    decode(rawPayload, callback) {
      if (rawPayload.constructor === ArrayBuffer) {
        return callback(this.binaryDecode(rawPayload));
      } else {
        let [join_ref, ref, topic, event, payload] = JSON.parse(rawPayload);
        return callback({ join_ref, ref, topic, event, payload });
      }
    },
    binaryEncode(message) {
      let { join_ref, ref, event, topic, payload } = message;
      let encoder = new TextEncoder();
      let joinRefBytes = encoder.encode(join_ref);
      let refBytes = encoder.encode(ref);
      let topicBytes = encoder.encode(topic);
      let eventBytes = encoder.encode(event);
      this.assertFieldSize(joinRefBytes.byteLength, "join_ref");
      this.assertFieldSize(refBytes.byteLength, "ref");
      this.assertFieldSize(topicBytes.byteLength, "topic");
      this.assertFieldSize(eventBytes.byteLength, "event");
      let metaLength = this.META_LENGTH + joinRefBytes.byteLength + refBytes.byteLength + topicBytes.byteLength + eventBytes.byteLength;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let headerBytes = new Uint8Array(header);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, joinRefBytes.byteLength);
      view.setUint8(offset++, refBytes.byteLength);
      view.setUint8(offset++, topicBytes.byteLength);
      view.setUint8(offset++, eventBytes.byteLength);
      headerBytes.set(joinRefBytes, offset);
      offset += joinRefBytes.byteLength;
      headerBytes.set(refBytes, offset);
      offset += refBytes.byteLength;
      headerBytes.set(topicBytes, offset);
      offset += topicBytes.byteLength;
      headerBytes.set(eventBytes, offset);
      offset += eventBytes.byteLength;
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(headerBytes, 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
    },
    assertFieldSize(size, name) {
      if (size > 255) {
        throw new Error(`unable to convert ${name} to binary: must be less than or equal to 255 bytes, but is ${size} bytes`);
      }
    },
    binaryDecode(buffer) {
      let view = new DataView(buffer);
      let kind = view.getUint8(0);
      let decoder = new TextDecoder();
      switch (kind) {
        case this.KINDS.push:
          return this.decodePush(buffer, view, decoder);
        case this.KINDS.reply:
          return this.decodeReply(buffer, view, decoder);
        case this.KINDS.broadcast:
          return this.decodeBroadcast(buffer, view, decoder);
      }
    },
    decodePush(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let topicSize = view.getUint8(2);
      let eventSize = view.getUint8(3);
      let offset = this.HEADER_LENGTH + this.META_LENGTH - 1;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: joinRef, ref: null, topic, event, payload: data };
    },
    decodeReply(buffer, view, decoder) {
      let joinRefSize = view.getUint8(1);
      let refSize = view.getUint8(2);
      let topicSize = view.getUint8(3);
      let eventSize = view.getUint8(4);
      let offset = this.HEADER_LENGTH + this.META_LENGTH;
      let joinRef = decoder.decode(buffer.slice(offset, offset + joinRefSize));
      offset = offset + joinRefSize;
      let ref = decoder.decode(buffer.slice(offset, offset + refSize));
      offset = offset + refSize;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      let payload = { status: event, response: data };
      return { join_ref: joinRef, ref, topic, event: CHANNEL_EVENTS.reply, payload };
    },
    decodeBroadcast(buffer, view, decoder) {
      let topicSize = view.getUint8(1);
      let eventSize = view.getUint8(2);
      let offset = this.HEADER_LENGTH + 2;
      let topic = decoder.decode(buffer.slice(offset, offset + topicSize));
      offset = offset + topicSize;
      let event = decoder.decode(buffer.slice(offset, offset + eventSize));
      offset = offset + eventSize;
      let data = buffer.slice(offset, buffer.byteLength);
      return { join_ref: null, ref: null, topic, event, payload: data };
    }
  };
  var Socket = class {
    constructor(endPoint, opts = {}) {
      this.stateChangeCallbacks = { open: [], close: [], error: [], message: [] };
      this.channels = [];
      this.sendBuffer = [];
      this.ref = 0;
      this.fallbackRef = null;
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global2.WebSocket || LongPoll;
      this.primaryPassedHealthCheck = false;
      this.longPollFallbackMs = opts.longPollFallbackMs;
      this.fallbackTimer = null;
      this.sessionStore = opts.sessionStorage || global2 && global2.sessionStorage;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = true;
      this.disconnecting = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
      this.pageHidden = false;
      if (this.transport !== LongPoll) {
        this.encode = opts.encode || this.defaultEncoder;
        this.decode = opts.decode || this.defaultDecoder;
      } else {
        this.encode = this.defaultEncoder;
        this.decode = this.defaultDecoder;
      }
      let awaitingConnectionOnPageShow = null;
      if (phxWindow && phxWindow.addEventListener) {
        phxWindow.addEventListener("pagehide", (_e) => {
          if (this.conn) {
            this.disconnect();
            awaitingConnectionOnPageShow = this.connectClock;
          }
        });
        phxWindow.addEventListener("pageshow", (_e) => {
          if (awaitingConnectionOnPageShow === this.connectClock) {
            awaitingConnectionOnPageShow = null;
            this.connect();
          }
        });
        phxWindow.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "hidden") {
            this.pageHidden = true;
          } else {
            this.pageHidden = false;
            if (!this.isConnected() && !this.closeWasClean) {
              this.teardown(() => this.connect());
            }
          }
        });
      }
      this.heartbeatIntervalMs = opts.heartbeatIntervalMs || 3e4;
      this.rejoinAfterMs = (tries) => {
        if (opts.rejoinAfterMs) {
          return opts.rejoinAfterMs(tries);
        } else {
          return [1e3, 2e3, 5e3][tries - 1] || 1e4;
        }
      };
      this.reconnectAfterMs = (tries) => {
        if (opts.reconnectAfterMs) {
          return opts.reconnectAfterMs(tries);
        } else {
          return [10, 50, 100, 150, 200, 250, 500, 1e3, 2e3][tries - 1] || 5e3;
        }
      };
      this.logger = opts.logger || null;
      if (!this.logger && opts.debug) {
        this.logger = (kind, msg, data) => {
          console.log(`${kind}: ${msg}`, data);
        };
      }
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        if (this.pageHidden) {
          this.log("Not reconnecting as page is hidden!");
          this.teardown();
          return;
        }
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
      this.authToken = opts.authToken && closure(opts.authToken);
    }
    getLongPollTransport() {
      return LongPoll;
    }
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      clearTimeout(this.fallbackTimer);
      this.reconnectTimer.reset();
      if (this.conn) {
        this.conn.close();
        this.conn = null;
      }
      this.transport = newTransport;
    }
    protocol() {
      return location.protocol.match(/^https/) ? "wss" : "ws";
    }
    endPointURL() {
      let uri = Ajax.appendParams(Ajax.appendParams(this.endPoint, this.params()), { vsn: this.vsn });
      if (uri.charAt(0) !== "/") {
        return uri;
      }
      if (uri.charAt(1) === "/") {
        return `${this.protocol()}:${uri}`;
      }
      return `${this.protocol()}://${location.host}${uri}`;
    }
    disconnect(callback, code, reason) {
      this.connectClock++;
      this.disconnecting = true;
      this.closeWasClean = true;
      clearTimeout(this.fallbackTimer);
      this.reconnectTimer.reset();
      this.teardown(() => {
        this.disconnecting = false;
        callback && callback();
      }, code, reason);
    }
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn && !this.disconnecting) {
        return;
      }
      if (this.longPollFallbackMs && this.transport !== LongPoll) {
        this.connectWithFallback(LongPoll, this.longPollFallbackMs);
      } else {
        this.transportConnect();
      }
    }
    log(kind, msg, data) {
      this.logger && this.logger(kind, msg, data);
    }
    hasLogger() {
      return this.logger !== null;
    }
    onOpen(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.open.push([ref, callback]);
      return ref;
    }
    onClose(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.close.push([ref, callback]);
      return ref;
    }
    onError(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.error.push([ref, callback]);
      return ref;
    }
    onMessage(callback) {
      let ref = this.makeRef();
      this.stateChangeCallbacks.message.push([ref, callback]);
      return ref;
    }
    ping(callback) {
      if (!this.isConnected()) {
        return false;
      }
      let ref = this.makeRef();
      let startTime = Date.now();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref });
      let onMsgRef = this.onMessage((msg) => {
        if (msg.ref === ref) {
          this.off([onMsgRef]);
          callback(Date.now() - startTime);
        }
      });
      return true;
    }
    transportName(transport) {
      switch (transport) {
        case LongPoll:
          return "LongPoll";
        default:
          return transport.name;
      }
    }
    transportConnect() {
      this.connectClock++;
      this.closeWasClean = false;
      let protocols = void 0;
      if (this.authToken) {
        protocols = ["phoenix", `${AUTH_TOKEN_PREFIX}${btoa(this.authToken()).replace(/=/g, "")}`];
      }
      this.conn = new this.transport(this.endPointURL(), protocols);
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    getSession(key) {
      return this.sessionStore && this.sessionStore.getItem(key);
    }
    storeSession(key, val) {
      this.sessionStore && this.sessionStore.setItem(key, val);
    }
    connectWithFallback(fallbackTransport, fallbackThreshold = 2500) {
      clearTimeout(this.fallbackTimer);
      let established = false;
      let primaryTransport = true;
      let openRef, errorRef;
      let fallbackTransportName = this.transportName(fallbackTransport);
      let fallback = (reason) => {
        this.log("transport", `falling back to ${fallbackTransportName}...`, reason);
        this.off([openRef, errorRef]);
        primaryTransport = false;
        this.replaceTransport(fallbackTransport);
        this.transportConnect();
      };
      if (this.getSession(`phx:fallback:${fallbackTransportName}`)) {
        return fallback("memorized");
      }
      this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
      errorRef = this.onError((reason) => {
        this.log("transport", "error", reason);
        if (primaryTransport && !established) {
          clearTimeout(this.fallbackTimer);
          fallback(reason);
        }
      });
      if (this.fallbackRef) {
        this.off([this.fallbackRef]);
      }
      this.fallbackRef = this.onOpen(() => {
        established = true;
        if (!primaryTransport) {
          let fallbackTransportName2 = this.transportName(fallbackTransport);
          if (!this.primaryPassedHealthCheck) {
            this.storeSession(`phx:fallback:${fallbackTransportName2}`, "true");
          }
          return this.log("transport", `established ${fallbackTransportName2} fallback`);
        }
        clearTimeout(this.fallbackTimer);
        this.fallbackTimer = setTimeout(fallback, fallbackThreshold);
        this.ping((rtt) => {
          this.log("transport", "connected to primary after", rtt);
          this.primaryPassedHealthCheck = true;
          clearTimeout(this.fallbackTimer);
        });
      });
      this.transportConnect();
    }
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `${this.transportName(this.transport)} connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
      this.disconnecting = false;
      this.establishedConnections++;
      this.flushSendBuffer();
      this.reconnectTimer.reset();
      this.resetHeartbeat();
      this.stateChangeCallbacks.open.forEach(([, callback]) => callback());
    }
    heartbeatTimeout() {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null;
        if (this.hasLogger()) {
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
        }
        this.triggerChanError();
        this.closeWasClean = false;
        this.teardown(() => this.reconnectTimer.scheduleTimeout(), WS_CLOSE_NORMAL, "heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      this.clearHeartbeats();
      this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    }
    teardown(callback, code, reason) {
      if (!this.conn) {
        return callback && callback();
      }
      const connToClose = this.conn;
      this.waitForBufferDone(connToClose, () => {
        if (code) {
          connToClose.close(code, reason || "");
        } else {
          connToClose.close();
        }
        this.waitForSocketClosed(connToClose, () => {
          if (this.conn === connToClose) {
            this.conn.onopen = function() {
            };
            this.conn.onerror = function() {
            };
            this.conn.onmessage = function() {
            };
            this.conn.onclose = function() {
            };
            this.conn = null;
          }
          callback && callback();
        });
      });
    }
    waitForBufferDone(conn, callback, tries = 1) {
      if (tries === 5 || !conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(conn, callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(conn, callback, tries = 1) {
      if (tries === 5 || conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(conn, callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
      if (this.conn)
        this.conn.onclose = () => {
        };
      let closeCode = event && event.code;
      if (this.hasLogger())
        this.log("transport", "close", event);
      this.triggerChanError();
      this.clearHeartbeats();
      if (!this.closeWasClean && closeCode !== 1e3) {
        this.reconnectTimer.scheduleTimeout();
      }
      this.stateChangeCallbacks.close.forEach(([, callback]) => callback(event));
    }
    onConnError(error) {
      if (this.hasLogger())
        this.log("transport", "error", error);
      let transportBefore = this.transport;
      let establishedBefore = this.establishedConnections;
      this.stateChangeCallbacks.error.forEach(([, callback]) => {
        callback(error, transportBefore, establishedBefore);
      });
      if (transportBefore === this.transport || establishedBefore > 0) {
        this.triggerChanError();
      }
    }
    triggerChanError() {
      this.channels.forEach((channel) => {
        if (!(channel.isErrored() || channel.isLeaving() || channel.isClosed())) {
          channel.trigger(CHANNEL_EVENTS.error);
        }
      });
    }
    connectionState() {
      switch (this.conn && this.conn.readyState) {
        case SOCKET_STATES.connecting:
          return "connecting";
        case SOCKET_STATES.open:
          return "open";
        case SOCKET_STATES.closing:
          return "closing";
        default:
          return "closed";
      }
    }
    isConnected() {
      return this.connectionState() === "open";
    }
    remove(channel) {
      this.off(channel.stateChangeRefs);
      this.channels = this.channels.filter((c) => c !== channel);
    }
    off(refs) {
      for (let key in this.stateChangeCallbacks) {
        this.stateChangeCallbacks[key] = this.stateChangeCallbacks[key].filter(([ref]) => {
          return refs.indexOf(ref) === -1;
        });
      }
    }
    channel(topic, chanParams = {}) {
      let chan = new Channel(topic, chanParams, this);
      this.channels.push(chan);
      return chan;
    }
    push(data) {
      if (this.hasLogger()) {
        let { topic, event, payload, ref, join_ref } = data;
        this.log("push", `${topic} ${event} (${join_ref}, ${ref})`, payload);
      }
      if (this.isConnected()) {
        this.encode(data, (result) => this.conn.send(result));
      } else {
        this.sendBuffer.push(() => this.encode(data, (result) => this.conn.send(result)));
      }
    }
    makeRef() {
      let newRef = this.ref + 1;
      if (newRef === this.ref) {
        this.ref = 0;
      } else {
        this.ref = newRef;
      }
      return this.ref.toString();
    }
    sendHeartbeat() {
      if (this.pendingHeartbeatRef && !this.isConnected()) {
        return;
      }
      this.pendingHeartbeatRef = this.makeRef();
      this.push({ topic: "phoenix", event: "heartbeat", payload: {}, ref: this.pendingHeartbeatRef });
      this.heartbeatTimeoutTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    flushSendBuffer() {
      if (this.isConnected() && this.sendBuffer.length > 0) {
        this.sendBuffer.forEach((callback) => callback());
        this.sendBuffer = [];
      }
    }
    onConnMessage(rawMessage) {
      this.decode(rawMessage.data, (msg) => {
        let { topic, event, payload, ref, join_ref } = msg;
        if (ref && ref === this.pendingHeartbeatRef) {
          this.clearHeartbeats();
          this.pendingHeartbeatRef = null;
          this.heartbeatTimer = setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
        }
        if (this.hasLogger())
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
        for (let i = 0; i < this.channels.length; i++) {
          const channel = this.channels[i];
          if (!channel.isMember(topic, event, payload, join_ref)) {
            continue;
          }
          channel.trigger(event, payload, ref, join_ref);
        }
        for (let i = 0; i < this.stateChangeCallbacks.message.length; i++) {
          let [, callback] = this.stateChangeCallbacks.message[i];
          callback(msg);
        }
      });
    }
    leaveOpenTopic(topic) {
      let dupChannel = this.channels.find((c) => c.topic === topic && (c.isJoined() || c.isJoining()));
      if (dupChannel) {
        if (this.hasLogger())
          this.log("transport", `leaving duplicate topic "${topic}"`);
        dupChannel.leave();
      }
    }
  };

  // ../deps/phoenix_live_view/priv/static/phoenix_live_view.esm.js
  var CONSECUTIVE_RELOADS = "consecutive-reloads";
  var MAX_RELOADS = 10;
  var RELOAD_JITTER_MIN = 5e3;
  var RELOAD_JITTER_MAX = 1e4;
  var FAILSAFE_JITTER = 3e4;
  var PHX_EVENT_CLASSES = [
    "phx-click-loading",
    "phx-change-loading",
    "phx-submit-loading",
    "phx-keydown-loading",
    "phx-keyup-loading",
    "phx-blur-loading",
    "phx-focus-loading",
    "phx-hook-loading"
  ];
  var PHX_DROP_TARGET_ACTIVE_CLASS = "phx-drop-target-active";
  var PHX_COMPONENT = "data-phx-component";
  var PHX_VIEW_REF = "data-phx-view";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF_LOADING = "data-phx-ref-loading";
  var PHX_REF_SRC = "data-phx-ref-src";
  var PHX_REF_LOCK = "data-phx-ref-lock";
  var PHX_PENDING_REFS = "phx-pending-refs";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_MAGIC_ID = "data-phx-id";
  var PHX_PRUNE = "data-phx-prune";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_LOADING_CLASS = "phx-loading";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_CLIENT_ERROR_CLASS = "phx-client-error";
  var PHX_SERVER_ERROR_CLASS = "phx-server-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_VIEWPORT_TOP = "viewport-top";
  var PHX_VIEWPORT_BOTTOM = "viewport-bottom";
  var PHX_VIEWPORT_OVERRUN_TARGET = "viewport-overrun-target";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = [
    "text",
    "textarea",
    "number",
    "email",
    "password",
    "search",
    "tel",
    "url",
    "date",
    "time",
    "datetime-local",
    "color",
    "range"
  ];
  var CHECKABLE_INPUTS = ["checkbox", "radio"];
  var PHX_HAS_SUBMITTED = "phx-has-submitted";
  var PHX_SESSION = "data-phx-session";
  var PHX_VIEW_SELECTOR = `[${PHX_SESSION}]`;
  var PHX_STICKY = "data-phx-sticky";
  var PHX_STATIC = "data-phx-static";
  var PHX_READONLY = "data-phx-readonly";
  var PHX_DISABLED = "data-phx-disabled";
  var PHX_DISABLE_WITH = "disable-with";
  var PHX_DISABLE_WITH_RESTORE = "data-phx-disable-with-restore";
  var PHX_HOOK = "hook";
  var PHX_DEBOUNCE = "debounce";
  var PHX_THROTTLE = "throttle";
  var PHX_UPDATE = "update";
  var PHX_STREAM = "stream";
  var PHX_STREAM_REF = "data-phx-stream";
  var PHX_PORTAL = "data-phx-portal";
  var PHX_TELEPORTED_REF = "data-phx-teleported";
  var PHX_TELEPORTED_SRC = "data-phx-teleported-src";
  var PHX_RUNTIME_HOOK = "data-phx-runtime-hook";
  var PHX_LV_PID = "data-phx-pid";
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_NO_UNUSED_FIELD = "no-unused-field";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_LV_HISTORY_POSITION = "phx:nav-history-position";
  var PHX_PROGRESS = "progress";
  var PHX_MOUNTED = "mounted";
  var PHX_RELOAD_STATUS = "__phoenix_reload_status__";
  var LOADER_TIMEOUT = 1;
  var MAX_CHILD_JOIN_ATTEMPTS = 3;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var DISCONNECTED_TIMEOUT = 500;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var PHX_PENDING_ATTRS = [PHX_REF_LOADING, PHX_REF_SRC, PHX_REF_LOCK];
  var STATIC = "s";
  var ROOT = "r";
  var COMPONENTS = "c";
  var KEYED = "k";
  var KEYED_COUNT = "kc";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var TEMPLATES = "p";
  var STREAM = "stream";
  var EntryUploader = class {
    constructor(entry, config, liveSocket2) {
      const { chunk_size, chunk_timeout } = config;
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunk_size;
      this.chunkTimeout = chunk_timeout;
      this.chunkTimer = null;
      this.errored = false;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, {
        token: entry.metadata()
      });
    }
    error(reason) {
      if (this.errored) {
        return;
      }
      this.uploadChannel.leave();
      this.errored = true;
      this.chunkTimer != null && clearTimeout(this.chunkTimer);
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", ({ reason }) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      const reader = new window.FileReader();
      const blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
      reader.onload = (e) => {
        var _a, _b;
        if (((_a = e.target) == null ? void 0 : _a.error) === null) {
          this.offset += e.target.result.byteLength;
          this.pushChunk(e.target.result);
        } else {
          return logError("Read error: " + ((_b = e.target) == null ? void 0 : _b.error));
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk, this.chunkTimeout).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
        }
      }).receive("error", ({ reason }) => this.error(reason));
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var ensureSameOrigin = (href, kind) => {
    let url;
    try {
      url = new URL(href, window.location.href);
    } catch (e) {
      throw new Error(`expected ${kind} destination to be a valid URL, got: ${href}`);
    }
    if (url.origin !== window.location.origin) {
      throw new Error(`cannot ${kind} to "${href}" because its origin does not match the current origin "${window.location.origin}". Use window.location directly for cross-origin navigation.`);
    }
  };
  var isCid = (cid) => {
    const type = typeof cid;
    return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
  };
  function detectDuplicateIds() {
    const ids = /* @__PURE__ */ new Set();
    const elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(`Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i].id);
      }
    }
  }
  function detectInvalidStreamInserts(inserts) {
    const errors = /* @__PURE__ */ new Set();
    Object.keys(inserts).forEach((id) => {
      const streamEl = document.getElementById(id);
      if (streamEl && streamEl.parentElement && streamEl.parentElement.getAttribute("phx-update") !== "stream") {
        errors.add(`The stream container with id "${streamEl.parentElement.id}" is missing the phx-update="stream" attribute. Ensure it is set for streams to work properly.`);
      }
    });
    errors.forEach((error) => console.error(error));
  }
  var debug = (view, kind, msg, obj) => {
    if (view.liveSocket.isDebugEnabled()) {
      console.log(`${view.id} ${kind}: ${msg} - `, obj);
    }
  };
  var closure2 = (val) => typeof val === "function" ? val : function() {
    return val;
  };
  var clone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  var closestPhxBinding = (startEl, binding, borderEl) => {
    let el = startEl;
    do {
      if (el.matches(`[${binding}]`) && !("disabled" in el && el.disabled)) {
        return el;
      }
      el = el.parentElement;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (const x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      const entryUploader = new EntryUploader(entry, resp.config, liveSocket2);
      entryUploader.upload();
    });
  };
  var eventContainsFiles = (e) => {
    if (e.dataTransfer.types) {
      for (let i = 0; i < e.dataTransfer.types.length; i++) {
        if (e.dataTransfer.types[i] === "Files") {
          return true;
        }
      }
    }
    return false;
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      const current = this.getLocal(localStorage, namespace, subkey);
      const key = this.localKey(namespace, subkey);
      const newVal = current === null ? initial : func(current);
      localStorage.setItem(key, JSON.stringify(newVal));
      return newVal;
    },
    getLocal(localStorage, namespace, subkey) {
      return JSON.parse(localStorage.getItem(this.localKey(namespace, subkey)));
    },
    updateCurrentState(callback) {
      if (!this.canPushState()) {
        return;
      }
      history.replaceState(callback(history.state || {}), "", window.location.href);
    },
    pushState(kind, meta, to) {
      if (this.canPushState()) {
        if (to !== window.location.href) {
          if (meta.type == "redirect" && meta.scroll) {
            const currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          window.requestAnimationFrame(() => {
            const hashEl = this.getHashTargetEl(window.location.hash);
            if (hashEl) {
              hashEl.scrollIntoView();
            } else if (meta.type === "redirect") {
              window.scroll(0, 0);
            }
          });
        }
      } else if (to) {
        this.redirect(to);
      }
    },
    setCookie(name, value, maxAgeSeconds) {
      const expires = typeof maxAgeSeconds === "number" ? ` max-age=${maxAgeSeconds};` : "";
      document.cookie = `${name}=${value};${expires} path=/`;
    },
    getCookie(name) {
      return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    deleteCookie(name) {
      document.cookie = `${name}=; max-age=-1; path=/`;
    },
    redirect(toURL, flash = null, navigate = (url) => {
      window.location.href = url;
    }) {
      if (flash) {
        this.setCookie("__phoenix_flash__", flash, 60);
      }
      navigate(toURL);
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      const hash = maybeHash.toString().substring(1);
      if (hash === "") {
        return;
      }
      return document.getElementById(hash) || document.querySelector(`a[name="${hash}"]`);
    }
  };
  var browser_default = Browser;
  var DOM = {
    byId(id) {
      return document.getElementById(id) || logError(`no id found for ${id}`);
    },
    elementFromTarget(target) {
      if (!(target instanceof Node)) {
        return null;
      }
      if (target.nodeType === Node.ELEMENT_NODE) {
        return target;
      } else {
        return target.parentElement;
      }
    },
    removeClass(el, className) {
      el.classList.remove(className);
      if (el.classList.length === 0) {
        el.removeAttribute("class");
      }
    },
    all(node, query, callback) {
      if (!node) {
        return [];
      }
      const array = Array.from(node.querySelectorAll(query));
      if (callback) {
        array.forEach(callback);
      }
      return array;
    },
    childNodeLength(html) {
      const template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    isAutoUpload(inputEl) {
      return inputEl.hasAttribute("data-phx-auto-upload");
    },
    findUploadInputs(node) {
      const formId = node.id;
      const inputsOutsideForm = this.all(document, `input[type="file"][${PHX_UPLOAD_REF}][form="${formId}"]`);
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`).concat(inputsOutsideForm);
    },
    findComponent(viewId, cid, doc2 = document) {
      return doc2.querySelector(`[${PHX_VIEW_REF}="${viewId}"][${PHX_COMPONENT}="${cid}"]`);
    },
    getComponent(viewId, cid, doc2 = document) {
      const el = this.findComponent(viewId, cid, doc2);
      if (!el) {
        throw new Error(`no component found matching viewId ${viewId} and cid ${cid}`);
      }
      return el;
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    wantsNewTab(e) {
      const wantsNewTab = e.ctrlKey || e.shiftKey || e.metaKey || e.button && e.button === 1;
      const isDownload = e.target instanceof HTMLAnchorElement && e.target.hasAttribute("download");
      const isTargetBlank = e.target.hasAttribute("target") && e.target.getAttribute("target").toLowerCase() === "_blank";
      const isTargetNamedTab = e.target.hasAttribute("target") && !e.target.getAttribute("target").startsWith("_");
      return wantsNewTab || isTargetBlank || isDownload || isTargetNamedTab;
    },
    isUnloadableFormSubmit(e) {
      const isDialogSubmit = e.target && e.target.getAttribute("method") === "dialog" || e.submitter && e.submitter.getAttribute("formmethod") === "dialog";
      if (isDialogSubmit) {
        return false;
      } else {
        return !e.defaultPrevented && !this.wantsNewTab(e);
      }
    },
    isNewPageClick(e, currentLocation) {
      const href = e.target instanceof HTMLAnchorElement ? e.target.getAttribute("href") : null;
      let url;
      if (e.defaultPrevented || href === null || this.wantsNewTab(e)) {
        return false;
      }
      if (href.startsWith("mailto:") || href.startsWith("tel:")) {
        return false;
      }
      if (e.target.isContentEditable) {
        return false;
      }
      try {
        url = new URL(href);
      } catch (e2) {
        try {
          url = new URL(href, currentLocation);
        } catch (e3) {
          return true;
        }
      }
      if (url.host === currentLocation.host && url.protocol === currentLocation.protocol) {
        if (url.pathname === currentLocation.pathname && url.search === currentLocation.search) {
          return url.hash === "" && !url.href.endsWith("#");
        }
      }
      return url.protocol.startsWith("http");
    },
    markPhxChildDestroyed(el) {
      if (this.isPhxChild(el)) {
        el.setAttribute(PHX_SESSION, "");
      }
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      const template = document.createElement("template");
      template.innerHTML = html;
      return this.findPhxChildren(template.content, parentId);
    },
    isIgnored(el, phxUpdate) {
      return (el.getAttribute(phxUpdate) || el.getAttribute("data-phx-update")) === "ignore";
    },
    isPhxUpdate(el, phxUpdate, updateTypes) {
      return el.getAttribute && updateTypes.indexOf(el.getAttribute(phxUpdate)) >= 0;
    },
    findPhxSticky(el) {
      return this.all(el, `[${PHX_STICKY}]`);
    },
    findPhxChildren(el, parentId) {
      return this.all(el, `${PHX_VIEW_SELECTOR}[${PHX_PARENT_ID}="${parentId}"]`);
    },
    findExistingParentCIDs(viewId, cids) {
      const parentCids = /* @__PURE__ */ new Set();
      const childrenCids = /* @__PURE__ */ new Set();
      cids.forEach((cid) => {
        this.all(document, `[${PHX_VIEW_REF}="${viewId}"][${PHX_COMPONENT}="${cid}"]`).forEach((parent) => {
          parentCids.add(cid);
          this.all(parent, `[${PHX_VIEW_REF}="${viewId}"][${PHX_COMPONENT}]`).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => childrenCids.add(childCID));
        });
      });
      childrenCids.forEach((childCid) => parentCids.delete(childCid));
      return parentCids;
    },
    private(el, key) {
      return el[PHX_PRIVATE] && el[PHX_PRIVATE][key];
    },
    deletePrivate(el, key) {
      el[PHX_PRIVATE] && delete el[PHX_PRIVATE][key];
    },
    putPrivate(el, key, value) {
      if (!el[PHX_PRIVATE]) {
        el[PHX_PRIVATE] = {};
      }
      el[PHX_PRIVATE][key] = value;
    },
    updatePrivate(el, key, defaultVal, updateFunc) {
      const existing = this.private(el, key);
      if (existing === void 0) {
        this.putPrivate(el, key, updateFunc(defaultVal));
      } else {
        this.putPrivate(el, key, updateFunc(existing));
      }
    },
    syncPendingAttrs(fromEl, toEl) {
      if (!fromEl.hasAttribute(PHX_REF_SRC)) {
        return;
      }
      PHX_EVENT_CLASSES.forEach((className) => {
        fromEl.classList.contains(className) && toEl.classList.add(className);
      });
      PHX_PENDING_ATTRS.filter((attr) => fromEl.hasAttribute(attr)).forEach((attr) => {
        toEl.setAttribute(attr, fromEl.getAttribute(attr));
      });
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = source[PHX_PRIVATE];
      }
    },
    putTitle(str) {
      const titleEl = document.querySelector("title");
      if (titleEl) {
        const { prefix, suffix, default: defaultTitle } = titleEl.dataset;
        const isEmpty2 = typeof str !== "string" || str.trim() === "";
        if (isEmpty2 && typeof defaultTitle !== "string") {
          return;
        }
        const inner = isEmpty2 ? defaultTitle : str;
        document.title = `${prefix || ""}${inner || ""}${suffix || ""}`;
      } else {
        document.title = str;
      }
    },
    debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, callback) {
      let debounce = el.getAttribute(phxDebounce);
      let throttle2 = el.getAttribute(phxThrottle);
      if (debounce === "") {
        debounce = defaultDebounce;
      }
      if (throttle2 === "") {
        throttle2 = defaultThrottle;
      }
      const value = debounce || throttle2;
      switch (value) {
        case null:
          return callback();
        case "blur":
          this.incCycle(el, "debounce-blur-cycle", () => {
            if (asyncFilter()) {
              callback();
            }
          });
          if (this.once(el, "debounce-blur")) {
            el.addEventListener("blur", () => this.triggerCycle(el, "debounce-blur-cycle"));
          }
          return;
        default:
          const timeout = parseInt(value);
          const trigger = () => throttle2 ? this.deletePrivate(el, THROTTLED) : callback();
          const currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle2) {
            let newKeyDown = false;
            if (event.type === "keydown") {
              const prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
              newKeyDown = prevKey !== event.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              const t = setTimeout(() => {
                if (asyncFilter()) {
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                }
              }, timeout);
              this.putPrivate(el, THROTTLED, t);
            }
          } else {
            setTimeout(() => {
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
              }
            }, timeout);
          }
          const form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                const namedItem = form.elements.namedItem(name);
                const input = namedItem instanceof RadioNodeList ? namedItem[0] : namedItem;
                if (input) {
                  this.incCycle(input, DEBOUNCE_TRIGGER);
                  this.deletePrivate(input, THROTTLED);
                }
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => {
              clearTimeout(this.private(el, THROTTLED));
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER);
              }
            });
          }
      }
    },
    triggerCycle(el, key, currentCycle) {
      const [cycle, trigger] = this.private(el, key);
      if (!currentCycle) {
        currentCycle = cycle;
      }
      if (currentCycle === cycle) {
        this.incCycle(el, key);
        trigger();
      }
    },
    once(el, key) {
      if (this.private(el, key) === true) {
        return false;
      }
      this.putPrivate(el, key, true);
      return true;
    },
    incCycle(el, key, trigger = function() {
    }) {
      let [currentCycle] = this.private(el, key) || [0, trigger];
      currentCycle++;
      this.putPrivate(el, key, [currentCycle, trigger]);
      return currentCycle;
    },
    maintainPrivateHooks(fromEl, toEl, phxViewportTop, phxViewportBottom) {
      if (fromEl.hasAttribute && fromEl.hasAttribute("data-phx-hook") && !toEl.hasAttribute("data-phx-hook")) {
        toEl.setAttribute("data-phx-hook", fromEl.getAttribute("data-phx-hook"));
      }
      if (toEl.hasAttribute && (toEl.hasAttribute(phxViewportTop) || toEl.hasAttribute(phxViewportBottom))) {
        toEl.setAttribute("data-phx-hook", "Phoenix.InfiniteScroll");
      }
    },
    putCustomElHook(el, hook) {
      if (el.isConnected) {
        el.setAttribute("data-phx-hook", "");
      } else {
        console.error(`
        hook attached to non-connected DOM element
        ensure you are calling createHook within your connectedCallback. ${el.outerHTML}
      `);
      }
      this.putPrivate(el, "custom-el-hook", hook);
    },
    getCustomElHook(el) {
      return this.private(el, "custom-el-hook");
    },
    isUsedInput(el) {
      return el.nodeType === Node.ELEMENT_NODE && (this.private(el, PHX_HAS_FOCUSED) || this.private(el, PHX_HAS_SUBMITTED));
    },
    resetForm(form) {
      Array.from(form.elements).forEach((input) => {
        this.deletePrivate(input, PHX_HAS_FOCUSED);
        this.deletePrivate(input, PHX_HAS_SUBMITTED);
      });
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    isPhxSticky(node) {
      return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
    },
    isChildOfAny(el, parents) {
      return !!parents.find((parent) => parent.contains(el));
    },
    firstPhxChild(el) {
      return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
    },
    isPortalTemplate(el) {
      return el.tagName === "TEMPLATE" && el.hasAttribute(PHX_PORTAL);
    },
    closestViewEl(el) {
      const portalOrViewEl = el.closest(`[${PHX_TELEPORTED_REF}],${PHX_VIEW_SELECTOR}`);
      if (!portalOrViewEl) {
        return null;
      }
      if (portalOrViewEl.hasAttribute(PHX_TELEPORTED_REF)) {
        return this.byId(portalOrViewEl.getAttribute(PHX_TELEPORTED_REF));
      } else if (portalOrViewEl.hasAttribute(PHX_SESSION)) {
        return portalOrViewEl;
      }
      return null;
    },
    dispatchEvent(target, name, opts = {}) {
      let defaultBubble = true;
      const isUploadTarget = target.nodeName === "INPUT" && target.type === "file";
      if (isUploadTarget && name === "click") {
        defaultBubble = false;
      }
      const bubbles = opts.bubbles === void 0 ? defaultBubble : !!opts.bubbles;
      const eventOpts = {
        bubbles,
        cancelable: true,
        detail: opts.detail || {}
      };
      const event = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
      target.dispatchEvent(event);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        const cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    mergeAttrs(target, source, opts = {}) {
      var _a;
      const exclude = new Set(opts.exclude || []);
      const isIgnored = opts.isIgnored;
      const sourceAttrs = source.attributes;
      for (let i = sourceAttrs.length - 1; i >= 0; i--) {
        const name = sourceAttrs[i].name;
        if (!exclude.has(name)) {
          const sourceValue = source.getAttribute(name);
          if (target.getAttribute(name) !== sourceValue && (!isIgnored || isIgnored && name.startsWith("data-"))) {
            target.setAttribute(name, sourceValue);
          }
        } else {
          if (name === "value") {
            const sourceValue = (_a = source.value) != null ? _a : source.getAttribute(name);
            if (target.value === sourceValue) {
              target.setAttribute("value", source.getAttribute(name));
            }
          }
        }
      }
      const targetAttrs = target.attributes;
      for (let i = targetAttrs.length - 1; i >= 0; i--) {
        const name = targetAttrs[i].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name) && !PHX_PENDING_ATTRS.includes(name)) {
            target.removeAttribute(name);
          }
        } else {
          if (!source.hasAttribute(name)) {
            target.removeAttribute(name);
          }
        }
      }
    },
    mergeFocusedInput(target, source) {
      if (!(target instanceof HTMLSelectElement)) {
        DOM.mergeAttrs(target, source, { exclude: ["value"] });
      }
      if (source.readOnly) {
        target.setAttribute("readonly", true);
      } else {
        target.removeAttribute("readonly");
      }
    },
    hasSelectionRange(el) {
      return el.setSelectionRange && (el.type === "text" || el.type === "textarea");
    },
    restoreFocus(focused, selectionStart, selectionEnd) {
      if (focused instanceof HTMLSelectElement) {
        focused.focus();
      }
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      const wasFocused = focused.matches(":focus");
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    isEditableInput(el) {
      return this.isFormAssociated(el) && !(el instanceof HTMLButtonElement) && !(el instanceof HTMLInputElement && el.type === "button");
    },
    isFormAssociated(el) {
      if (!(el instanceof HTMLElement))
        return false;
      if (el.localName) {
        const customEl = customElements.get(el.localName);
        if (customEl) {
          return customEl.formAssociated === true;
        }
      }
      return el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement || el instanceof HTMLButtonElement;
    },
    syncAttrsToProps(el) {
      if (el instanceof HTMLInputElement && CHECKABLE_INPUTS.indexOf(el.type.toLocaleLowerCase()) >= 0) {
        el.checked = el.getAttribute("checked") !== null;
      }
    },
    isTextualInput(el) {
      return FOCUSABLE_INPUTS.indexOf(el.type) >= 0;
    },
    isNowTriggerFormExternal(el, phxTriggerExternal) {
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null && document.body.contains(el);
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend", PHX_STREAM])) {
        const toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!("id" in childNode) || !childNode.id) {
            const isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode && childNode.nodeType !== Node.COMMENT_NODE) {
              logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${("outerHTML" in childNode && childNode.outerHTML || childNode.nodeValue || "").trim()}"

`);
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      const retainedAttrs = /* @__PURE__ */ new Set([
        "id",
        PHX_SESSION,
        PHX_STATIC,
        PHX_MAIN,
        PHX_ROOT_ID
      ]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        const newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
        retainedAttrs.forEach((attr) => {
          const value = container.getAttribute(attr);
          if (value !== null) {
            newContainer.setAttribute(attr, value);
          }
        });
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    },
    getSticky(el, name, defaultVal) {
      const op = (DOM.private(el, "sticky") || []).find(([existingName]) => name === existingName);
      if (op) {
        const [_name, _op, stashedResult] = op;
        return stashedResult;
      } else {
        return typeof defaultVal === "function" ? defaultVal() : defaultVal;
      }
    },
    deleteSticky(el, name) {
      this.updatePrivate(el, "sticky", [], (ops) => {
        return ops.filter(([existingName, _]) => existingName !== name);
      });
    },
    putSticky(el, name, op) {
      const stashedResult = op(el);
      this.updatePrivate(el, "sticky", [], (ops) => {
        const existingIndex = ops.findIndex(([existingName]) => name === existingName);
        if (existingIndex >= 0) {
          ops[existingIndex] = [name, op, stashedResult];
        } else {
          ops.push([name, op, stashedResult]);
        }
        return ops;
      });
    },
    applyStickyOperations(el) {
      const ops = DOM.private(el, "sticky");
      if (!ops) {
        return;
      }
      ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
    },
    isLocked(el) {
      return el.hasAttribute && el.hasAttribute(PHX_REF_LOCK);
    },
    attributeIgnored(attribute, ignoredAttributes) {
      return ignoredAttributes.some((toIgnore) => attribute.name == toIgnore || toIgnore === "*" || toIgnore.includes("*") && attribute.name.match(toIgnore) != null);
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      const isNew = file._phxRef === void 0;
      const activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      const isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive);
    }
    static isPreflighted(fileEl, file) {
      const preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      const isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    static isPreflightInProgress(file) {
      return file._preflightInProgress === true;
    }
    static markPreflightInProgress(file) {
      file._preflightInProgress = true;
    }
    constructor(fileEl, file, view, autoUpload) {
      this.ref = LiveUploader.genFileRef(file);
      this.fileEl = fileEl;
      this.file = file;
      this.view = view;
      this.meta = null;
      this._isCancelled = false;
      this._isDone = false;
      this._progress = 0;
      this._lastProgressSent = -1;
      this._onDone = function() {
      };
      this._onElUpdated = this.onElUpdated.bind(this);
      this.fileEl.addEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.autoUpload = autoUpload;
    }
    metadata() {
      return this.meta;
    }
    progress(progress) {
      this._progress = Math.floor(progress);
      if (this._progress > this._lastProgressSent) {
        if (this._progress >= 100) {
          this._progress = 100;
          this._lastProgressSent = 100;
          this._isDone = true;
          this.view.pushFileProgress(this.fileEl, this.ref, 100, () => {
            LiveUploader.untrackFile(this.fileEl, this.file);
            this._onDone();
          });
        } else {
          this._lastProgressSent = this._progress;
          this.view.pushFileProgress(this.fileEl, this.ref, this._progress);
        }
      }
    }
    isCancelled() {
      return this._isCancelled;
    }
    cancel() {
      this.file._preflightInProgress = false;
      this._isCancelled = true;
      this._isDone = true;
      this._onDone();
    }
    isDone() {
      return this._isDone;
    }
    error(reason = "failed") {
      this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
      this.view.pushFileProgress(this.fileEl, this.ref, { error: reason });
      if (!this.isAutoUpload()) {
        LiveUploader.clearFiles(this.fileEl);
      }
    }
    isAutoUpload() {
      return this.autoUpload;
    }
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      const activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
        LiveUploader.untrackFile(this.fileEl, this.file);
        this.cancel();
      }
    }
    toPreflightPayload() {
      return {
        last_modified: this.file.lastModified,
        name: this.file.name,
        relative_path: this.file.webkitRelativePath,
        size: this.file.size,
        type: this.file.type,
        ref: this.ref,
        meta: typeof this.file.meta === "function" ? this.file.meta() : void 0
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        const callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, {
          input: this.fileEl,
          response: resp
        });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class _LiveUploader {
    static genFileRef(file) {
      const ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref) {
      const file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
      if (!file)
        return null;
      return URL.createObjectURL(file);
    }
    static hasUploadsInProgress(formEl) {
      let active = 0;
      dom_default.findUploadInputs(formEl).forEach((input) => {
        if (input.getAttribute(PHX_PREFLIGHTED_REFS) !== input.getAttribute(PHX_DONE_REFS)) {
          active++;
        }
      });
      return active > 0;
    }
    static serializeUploads(inputEl) {
      const files = this.activeFiles(inputEl);
      const fileData = {};
      files.forEach((file) => {
        const entry = { path: inputEl.name };
        const uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.last_modified = file.lastModified;
        entry.name = file.name || entry.ref;
        entry.relative_path = file.webkitRelativePath;
        entry.type = file.type;
        entry.size = file.size;
        if (typeof file.meta === "function") {
          entry.meta = file.meta();
        }
        fileData[uploadRef].push(entry);
      });
      return fileData;
    }
    static clearFiles(inputEl) {
      inputEl.value = null;
      inputEl.removeAttribute(PHX_UPLOAD_REF);
      dom_default.putPrivate(inputEl, "files", []);
    }
    static untrackFile(inputEl, file) {
      dom_default.putPrivate(inputEl, "files", dom_default.private(inputEl, "files").filter((f) => !Object.is(f, file)));
    }
    static trackFiles(inputEl, files, dataTransfer) {
      if (inputEl.getAttribute("multiple") !== null) {
        const newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file)));
        dom_default.updatePrivate(inputEl, "files", [], (existing) => existing.concat(newFiles));
        inputEl.value = "";
      } else {
        if (dataTransfer && dataTransfer.files.length > 0) {
          inputEl.files = dataTransfer.files;
        }
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      const fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter((f) => UploadEntry.isActive(input, f));
    }
    static inputsAwaitingPreflight(formEl) {
      const fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter((f) => !UploadEntry.isPreflighted(input, f) && !UploadEntry.isPreflightInProgress(f));
    }
    static markPreflightInProgress(entries) {
      entries.forEach((entry) => UploadEntry.markPreflightInProgress(entry.file));
    }
    constructor(inputEl, view, onComplete) {
      this.autoUpload = dom_default.isAutoUpload(inputEl);
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(_LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view, this.autoUpload));
      _LiveUploader.markPreflightInProgress(this._entries);
      this.numEntriesInProgress = this._entries.length;
    }
    isAutoUpload() {
      return this.autoUpload;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        if (entry.isCancelled()) {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        } else {
          entry.zipPostFlight(resp);
          entry.onDone(() => {
            this.numEntriesInProgress--;
            if (this.numEntriesInProgress === 0) {
              this.onComplete();
            }
          });
        }
        return entry;
      });
      const groupedEntries = this._entries.reduce((acc, entry) => {
        if (!entry.meta) {
          return acc;
        }
        const { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (const name in groupedEntries) {
        const { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var ARIA = {
    anyOf(instance, classes) {
      return classes.some((name) => instance instanceof name);
    },
    isFocusable(el, interactiveOnly = false) {
      return el instanceof HTMLAnchorElement && el.rel !== "ignore" || el instanceof HTMLAreaElement && el.href !== void 0 || !("disabled" in el && el.disabled) && this.anyOf(el, [
        HTMLInputElement,
        HTMLSelectElement,
        HTMLTextAreaElement,
        HTMLButtonElement
      ]) || el instanceof HTMLIFrameElement || el instanceof HTMLElement && el.tabIndex >= 0 && el.getAttribute("aria-hidden") !== "true" || !interactiveOnly && el.getAttribute("tabindex") !== null && el.getAttribute("aria-hidden") !== "true";
    },
    attemptFocus(el, interactiveOnly = false) {
      if (this.isFocusable(el, interactiveOnly)) {
        try {
          el.focus();
        } catch (e) {
        }
      }
      return !!document.activeElement && document.activeElement.isSameNode(el);
    },
    focusFirstInteractive(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child, true) || this.focusFirstInteractive(child)) {
          return true;
        }
        child = child.nextElementSibling;
      }
      return false;
    },
    focusFirst(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusFirst(child)) {
          return true;
        }
        child = child.nextElementSibling;
      }
      return false;
    },
    focusLast(el) {
      let child = el.lastElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusLast(child)) {
          return true;
        }
        child = child.previousElementSibling;
      }
      return false;
    }
  };
  var aria_default = ARIA;
  var findScrollContainer = (el) => {
    if (["HTML", "BODY"].indexOf(el.nodeName.toUpperCase()) >= 0)
      return null;
    if (["scroll", "auto"].indexOf(getComputedStyle(el).overflowY) >= 0)
      return el;
    return findScrollContainer(el.parentElement);
  };
  var scrollTop = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.scrollTop;
    } else {
      return document.documentElement.scrollTop || document.body.scrollTop;
    }
  };
  var bottom = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.getBoundingClientRect().bottom;
    } else {
      return window.innerHeight || document.documentElement.clientHeight;
    }
  };
  var top = (scrollContainer) => {
    if (scrollContainer) {
      return scrollContainer.getBoundingClientRect().top;
    } else {
      return 0;
    }
  };
  var isAtViewportTop = (el, scrollContainer) => {
    const rect = el.getBoundingClientRect();
    return Math.ceil(rect.top) >= top(scrollContainer) && Math.floor(rect.top) <= bottom(scrollContainer);
  };
  var isAtViewportBottom = (el, scrollContainer) => {
    const rect = el.getBoundingClientRect();
    return Math.ceil(rect.bottom) >= top(scrollContainer) && Math.floor(rect.bottom) <= bottom(scrollContainer);
  };
  var isWithinViewport = (el, scrollContainer) => {
    const rect = el.getBoundingClientRect();
    return Math.ceil(rect.top) >= top(scrollContainer) && Math.floor(rect.top) <= bottom(scrollContainer);
  };
  var InfiniteScroll = {
    mounted() {
      this.scrollContainer = findScrollContainer(this.el);
      let scrollBefore = scrollTop(this.scrollContainer);
      let topOverran = false;
      const throttleInterval = 500;
      let pendingOp = null;
      const onTopOverrun = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => true;
        this.liveSocket.js().push(this.el, topEvent, {
          value: { id: firstChild.id, _overran: true },
          callback: () => {
            pendingOp = null;
          }
        });
      });
      const onFirstChildAtTop = this.throttle(throttleInterval, (topEvent, firstChild) => {
        pendingOp = () => firstChild.scrollIntoView({ block: "start" });
        this.liveSocket.js().push(this.el, topEvent, {
          value: { id: firstChild.id },
          callback: () => {
            pendingOp = null;
            window.requestAnimationFrame(() => {
              if (!isWithinViewport(firstChild, this.scrollContainer)) {
                firstChild.scrollIntoView({ block: "start" });
              }
            });
          }
        });
      });
      const onLastChildAtBottom = this.throttle(throttleInterval, (bottomEvent, lastChild) => {
        pendingOp = () => lastChild.scrollIntoView({ block: "end" });
        this.liveSocket.js().push(this.el, bottomEvent, {
          value: { id: lastChild.id },
          callback: () => {
            pendingOp = null;
            window.requestAnimationFrame(() => {
              if (!isWithinViewport(lastChild, this.scrollContainer)) {
                lastChild.scrollIntoView({ block: "end" });
              }
            });
          }
        });
      });
      this.onScroll = (_e) => {
        const scrollNow = scrollTop(this.scrollContainer);
        if (pendingOp) {
          scrollBefore = scrollNow;
          return pendingOp();
        }
        const rect = this.findOverrunTarget();
        const topEvent = this.el.getAttribute(this.liveSocket.binding("viewport-top"));
        const bottomEvent = this.el.getAttribute(this.liveSocket.binding("viewport-bottom"));
        const lastChild = this.el.lastElementChild;
        const firstChild = this.el.firstElementChild;
        const isScrollingUp = scrollNow < scrollBefore;
        const isScrollingDown = scrollNow > scrollBefore;
        if (isScrollingUp && topEvent && !topOverran && rect.top >= 0) {
          topOverran = true;
          onTopOverrun(topEvent, firstChild);
        } else if (isScrollingDown && topOverran && rect.top <= 0) {
          topOverran = false;
        }
        if (topEvent && isScrollingUp && firstChild && isAtViewportTop(firstChild, this.scrollContainer)) {
          onFirstChildAtTop(topEvent, firstChild);
        } else if (bottomEvent && isScrollingDown && lastChild && isAtViewportBottom(lastChild, this.scrollContainer)) {
          onLastChildAtBottom(bottomEvent, lastChild);
        }
        scrollBefore = scrollNow;
      };
      if (this.scrollContainer) {
        this.scrollContainer.addEventListener("scroll", this.onScroll);
      } else {
        window.addEventListener("scroll", this.onScroll);
      }
    },
    updated() {
      if (this.scrollContainer && !this.scrollContainer.isConnected) {
        this.destroyed();
        this.mounted();
      }
    },
    destroyed() {
      if (this.scrollContainer) {
        this.scrollContainer.removeEventListener("scroll", this.onScroll);
      } else {
        window.removeEventListener("scroll", this.onScroll);
      }
    },
    throttle(interval, callback) {
      let lastCallAt = 0;
      let timer;
      return (...args) => {
        const now = Date.now();
        const remainingTime = interval - (now - lastCallAt);
        if (remainingTime <= 0 || remainingTime > interval) {
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }
          lastCallAt = now;
          callback(...args);
        } else if (!timer) {
          timer = setTimeout(() => {
            lastCallAt = Date.now();
            timer = null;
            callback(...args);
          }, remainingTime);
        }
      };
    },
    findOverrunTarget() {
      let rect;
      const overrunTarget = this.el.getAttribute(this.liveSocket.binding(PHX_VIEWPORT_OVERRUN_TARGET));
      if (overrunTarget) {
        const overrunEl = document.getElementById(overrunTarget);
        if (overrunEl) {
          rect = overrunEl.getBoundingClientRect();
        } else {
          throw new Error("did not find element with id " + overrunTarget);
        }
      } else {
        rect = this.el.getBoundingClientRect();
      }
      return rect;
    }
  };
  var LiveFileUpload = {
    activeRefs() {
      return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
    },
    preflightedRefs() {
      return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
    },
    mounted() {
      this.js().ignoreAttributes(this.el, ["value"]);
      this.preflightedWas = this.preflightedRefs();
    },
    updated() {
      const newPreflights = this.preflightedRefs();
      if (this.preflightedWas !== newPreflights) {
        this.preflightedWas = newPreflights;
        if (newPreflights === "") {
          this.__view().cancelSubmit(this.el.form);
        }
      }
      if (this.activeRefs() === "") {
        this.el.value = "";
      }
      this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
    }
  };
  var LiveImgPreview = {
    mounted() {
      this.ref = this.el.getAttribute("data-phx-entry-ref");
      this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
      this.url = LiveUploader.getEntryDataURL(this.inputEl, this.ref);
      this.el.src = this.url;
    },
    destroyed() {
      URL.revokeObjectURL(this.url);
    }
  };
  var Hooks = {
    LiveFileUpload,
    LiveImgPreview,
    FocusWrap: {
      mounted() {
        this.focusStart = this.el.firstElementChild;
        this.focusEnd = this.el.lastElementChild;
        this.focusStart.addEventListener("focus", (e) => {
          if (!e.relatedTarget || !this.el.contains(e.relatedTarget)) {
            const nextFocus = e.target.nextElementSibling;
            aria_default.attemptFocus(nextFocus) || aria_default.focusFirst(nextFocus);
          } else {
            aria_default.focusLast(this.el);
          }
        });
        this.focusEnd.addEventListener("focus", (e) => {
          if (!e.relatedTarget || !this.el.contains(e.relatedTarget)) {
            const nextFocus = e.target.previousElementSibling;
            aria_default.attemptFocus(nextFocus) || aria_default.focusLast(nextFocus);
          } else {
            aria_default.focusFirst(this.el);
          }
        });
        if (!this.el.contains(document.activeElement)) {
          this.el.addEventListener("phx:show-end", () => this.el.focus());
          if (window.getComputedStyle(this.el).display !== "none") {
            aria_default.focusFirst(this.el);
          }
        }
      }
    },
    InfiniteScroll
  };
  var hooks_default = Hooks;
  var ElementRef = class {
    static onUnlock(el, callback) {
      if (!dom_default.isLocked(el) && !el.closest(`[${PHX_REF_LOCK}]`)) {
        return callback();
      }
      const closestLock = el.closest(`[${PHX_REF_LOCK}]`);
      const ref = closestLock.closest(`[${PHX_REF_LOCK}]`).getAttribute(PHX_REF_LOCK);
      closestLock.addEventListener(`phx:undo-lock:${ref}`, () => {
        callback();
      }, { once: true });
    }
    constructor(el) {
      this.el = el;
      this.loadingRef = el.hasAttribute(PHX_REF_LOADING) ? parseInt(el.getAttribute(PHX_REF_LOADING), 10) : null;
      this.lockRef = el.hasAttribute(PHX_REF_LOCK) ? parseInt(el.getAttribute(PHX_REF_LOCK), 10) : null;
    }
    maybeUndo(ref, phxEvent, eachCloneCallback) {
      if (!this.isWithin(ref)) {
        dom_default.updatePrivate(this.el, PHX_PENDING_REFS, [], (pendingRefs) => {
          pendingRefs.push(ref);
          return pendingRefs;
        });
        return;
      }
      this.undoLocks(ref, phxEvent, eachCloneCallback);
      this.undoLoading(ref, phxEvent);
      dom_default.updatePrivate(this.el, PHX_PENDING_REFS, [], (pendingRefs) => {
        return pendingRefs.filter((pendingRef) => {
          let opts = {
            detail: { ref: pendingRef, event: phxEvent },
            bubbles: true,
            cancelable: false
          };
          if (this.loadingRef && this.loadingRef > pendingRef) {
            this.el.dispatchEvent(new CustomEvent(`phx:undo-loading:${pendingRef}`, opts));
          }
          if (this.lockRef && this.lockRef > pendingRef) {
            this.el.dispatchEvent(new CustomEvent(`phx:undo-lock:${pendingRef}`, opts));
          }
          return pendingRef > ref;
        });
      });
      if (this.isFullyResolvedBy(ref)) {
        this.el.removeAttribute(PHX_REF_SRC);
      }
    }
    isWithin(ref) {
      return !(this.loadingRef !== null && this.loadingRef > ref && this.lockRef !== null && this.lockRef > ref);
    }
    undoLocks(ref, phxEvent, eachCloneCallback) {
      if (!this.isLockUndoneBy(ref)) {
        return;
      }
      const clonedTree = dom_default.private(this.el, PHX_REF_LOCK);
      if (clonedTree) {
        eachCloneCallback(clonedTree);
        dom_default.deletePrivate(this.el, PHX_REF_LOCK);
      }
      this.el.removeAttribute(PHX_REF_LOCK);
      const opts = {
        detail: { ref, event: phxEvent },
        bubbles: true,
        cancelable: false
      };
      this.el.dispatchEvent(new CustomEvent(`phx:undo-lock:${this.lockRef}`, opts));
    }
    undoLoading(ref, phxEvent) {
      if (!this.isLoadingUndoneBy(ref)) {
        if (this.canUndoLoading(ref) && this.el.classList.contains("phx-submit-loading")) {
          this.el.classList.remove("phx-change-loading");
        }
        return;
      }
      if (this.canUndoLoading(ref)) {
        this.el.removeAttribute(PHX_REF_LOADING);
        const disabledVal = this.el.getAttribute(PHX_DISABLED);
        const readOnlyVal = this.el.getAttribute(PHX_READONLY);
        if (readOnlyVal !== null && "readOnly" in this.el) {
          this.el.readOnly = readOnlyVal === "true" ? true : false;
          this.el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null && "disabled" in this.el) {
          this.el.disabled = disabledVal === "true" ? true : false;
          this.el.removeAttribute(PHX_DISABLED);
        }
        const disableRestore = this.el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          this.el.textContent = disableRestore;
          this.el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        const opts = {
          detail: { ref, event: phxEvent },
          bubbles: true,
          cancelable: false
        };
        this.el.dispatchEvent(new CustomEvent(`phx:undo-loading:${this.loadingRef}`, opts));
      }
      PHX_EVENT_CLASSES.forEach((name) => {
        if (name !== "phx-submit-loading" || this.canUndoLoading(ref)) {
          dom_default.removeClass(this.el, name);
        }
      });
    }
    isLoadingUndoneBy(ref) {
      return this.loadingRef === null ? false : this.loadingRef <= ref;
    }
    isLockUndoneBy(ref) {
      return this.lockRef === null ? false : this.lockRef <= ref;
    }
    isFullyResolvedBy(ref) {
      return (this.loadingRef === null || this.loadingRef <= ref) && (this.lockRef === null || this.lockRef <= ref);
    }
    canUndoLoading(ref) {
      return this.lockRef === null || this.lockRef <= ref;
    }
  };
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      const idsBefore = /* @__PURE__ */ new Set();
      const idsAfter = new Set([...containerAfter.children].map((child) => child.id));
      const elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            const previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({
              elementId: child.id,
              previousElementId
            });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    perform() {
      const container = dom_default.byId(this.containerId);
      if (!container) {
        return;
      }
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
            maybe(document.getElementById(elementToModify.elementId), (elem) => {
              const isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
              if (!isInRightPlace) {
                previousElem.insertAdjacentElement("afterend", elem);
              }
            });
          });
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            const isInRightPlace = elem.previousElementSibling == null;
            if (!isInRightPlace) {
              container.insertAdjacentElement("afterbegin", elem);
            }
          });
        }
      });
      if (this.updateType == "prepend") {
        this.elementIdsToAdd.reverse().forEach((elemId) => {
          maybe(document.getElementById(elemId), (elem) => container.insertAdjacentElement("afterbegin", elem));
        });
      }
    }
  };
  var DOCUMENT_FRAGMENT_NODE = 11;
  function morphAttrs(fromNode, toNode) {
    var toNodeAttrs = toNode.attributes;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;
    if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE || fromNode.nodeType === DOCUMENT_FRAGMENT_NODE) {
      return;
    }
    for (var i = toNodeAttrs.length - 1; i >= 0; i--) {
      attr = toNodeAttrs[i];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      attrValue = attr.value;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        if (fromValue !== attrValue) {
          if (attr.prefix === "xmlns") {
            attrName = attr.name;
          }
          fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
        }
      } else {
        fromValue = fromNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          fromNode.setAttribute(attrName, attrValue);
        }
      }
    }
    var fromNodeAttrs = fromNode.attributes;
    for (var d = fromNodeAttrs.length - 1; d >= 0; d--) {
      attr = fromNodeAttrs[d];
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;
      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!toNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!toNode.hasAttribute(attrName)) {
          fromNode.removeAttribute(attrName);
        }
      }
    }
  }
  var range;
  var NS_XHTML = "http://www.w3.org/1999/xhtml";
  var doc = typeof document === "undefined" ? void 0 : document;
  var HAS_TEMPLATE_SUPPORT = !!doc && "content" in doc.createElement("template");
  var HAS_RANGE_SUPPORT = !!doc && doc.createRange && "createContextualFragment" in doc.createRange();
  function createFragmentFromTemplate(str) {
    var template = doc.createElement("template");
    template.innerHTML = str;
    return template.content.childNodes[0];
  }
  function createFragmentFromRange(str) {
    if (!range) {
      range = doc.createRange();
      range.selectNode(doc.body);
    }
    var fragment = range.createContextualFragment(str);
    return fragment.childNodes[0];
  }
  function createFragmentFromWrap(str) {
    var fragment = doc.createElement("body");
    fragment.innerHTML = str;
    return fragment.childNodes[0];
  }
  function toElement(str) {
    str = str.trim();
    if (HAS_TEMPLATE_SUPPORT) {
      return createFragmentFromTemplate(str);
    } else if (HAS_RANGE_SUPPORT) {
      return createFragmentFromRange(str);
    }
    return createFragmentFromWrap(str);
  }
  function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;
    var fromCodeStart, toCodeStart;
    if (fromNodeName === toNodeName) {
      return true;
    }
    fromCodeStart = fromNodeName.charCodeAt(0);
    toCodeStart = toNodeName.charCodeAt(0);
    if (fromCodeStart <= 90 && toCodeStart >= 97) {
      return fromNodeName === toNodeName.toUpperCase();
    } else if (toCodeStart <= 90 && fromCodeStart >= 97) {
      return toNodeName === fromNodeName.toUpperCase();
    } else {
      return false;
    }
  }
  function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ? doc.createElement(name) : doc.createElementNS(namespaceURI, name);
  }
  function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
      var nextChild = curChild.nextSibling;
      toEl.appendChild(curChild);
      curChild = nextChild;
    }
    return toEl;
  }
  function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
      fromEl[name] = toEl[name];
      if (fromEl[name]) {
        fromEl.setAttribute(name, "");
      } else {
        fromEl.removeAttribute(name);
      }
    }
  }
  var specialElHandlers = {
    OPTION: function(fromEl, toEl) {
      var parentNode = fromEl.parentNode;
      if (parentNode) {
        var parentName = parentNode.nodeName.toUpperCase();
        if (parentName === "OPTGROUP") {
          parentNode = parentNode.parentNode;
          parentName = parentNode && parentNode.nodeName.toUpperCase();
        }
        if (parentName === "SELECT" && !parentNode.hasAttribute("multiple")) {
          if (fromEl.hasAttribute("selected") && !toEl.selected) {
            fromEl.setAttribute("selected", "selected");
            fromEl.removeAttribute("selected");
          }
          parentNode.selectedIndex = -1;
        }
      }
      syncBooleanAttrProp(fromEl, toEl, "selected");
    },
    INPUT: function(fromEl, toEl) {
      syncBooleanAttrProp(fromEl, toEl, "checked");
      syncBooleanAttrProp(fromEl, toEl, "disabled");
      if (fromEl.value !== toEl.value) {
        fromEl.value = toEl.value;
      }
      if (!toEl.hasAttribute("value")) {
        fromEl.removeAttribute("value");
      }
    },
    TEXTAREA: function(fromEl, toEl) {
      var newValue = toEl.value;
      if (fromEl.value !== newValue) {
        fromEl.value = newValue;
      }
      var firstChild = fromEl.firstChild;
      if (firstChild) {
        var oldValue = firstChild.nodeValue;
        if (oldValue == newValue || !newValue && oldValue == fromEl.placeholder) {
          return;
        }
        firstChild.nodeValue = newValue;
      }
    },
    SELECT: function(fromEl, toEl) {
      if (!toEl.hasAttribute("multiple")) {
        var selectedIndex = -1;
        var i = 0;
        var curChild = fromEl.firstChild;
        var optgroup;
        var nodeName;
        while (curChild) {
          nodeName = curChild.nodeName && curChild.nodeName.toUpperCase();
          if (nodeName === "OPTGROUP") {
            optgroup = curChild;
            curChild = optgroup.firstChild;
            if (!curChild) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          } else {
            if (nodeName === "OPTION") {
              if (curChild.hasAttribute("selected")) {
                selectedIndex = i;
                break;
              }
              i++;
            }
            curChild = curChild.nextSibling;
            if (!curChild && optgroup) {
              curChild = optgroup.nextSibling;
              optgroup = null;
            }
          }
        }
        fromEl.selectedIndex = selectedIndex;
      }
    }
  };
  var ELEMENT_NODE = 1;
  var DOCUMENT_FRAGMENT_NODE$1 = 11;
  var TEXT_NODE = 3;
  var COMMENT_NODE = 8;
  function noop() {
  }
  function defaultGetNodeKey(node) {
    if (node) {
      return node.getAttribute && node.getAttribute("id") || node.id;
    }
  }
  function morphdomFactory(morphAttrs2) {
    return function morphdom2(fromNode, toNode, options) {
      if (!options) {
        options = {};
      }
      if (typeof toNode === "string") {
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else if (fromNode.nodeName === "BODY") {
          var toNodeBody = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeBody;
          var bodyElement = toNode.querySelector("body");
          if (bodyElement) {
            toNode = bodyElement;
          }
        } else {
          toNode = toElement(toNode);
        }
      } else if (toNode.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
        toNode = toNode.firstElementChild;
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var skipFromChildren = options.skipFromChildren || noop;
      var addChild = options.addChild || function(parent, child) {
        return parent.appendChild(child);
      };
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = /* @__PURE__ */ Object.create(null);
      var keyedRemovalList = [];
      function addKeyedRemoval(key) {
        keyedRemovalList.push(key);
      }
      function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = void 0;
            if (skipKeyedNodes && (key = getNodeKey(curChild))) {
              addKeyedRemoval(key);
            } else {
              onNodeDiscarded(curChild);
              if (curChild.firstChild) {
                walkDiscardedChildNodes(curChild, skipKeyedNodes);
              }
            }
            curChild = curChild.nextSibling;
          }
        }
      }
      function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
          return;
        }
        if (parentNode) {
          parentNode.removeChild(node);
        }
        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
      }
      function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE || node.nodeType === DOCUMENT_FRAGMENT_NODE$1) {
          var curChild = node.firstChild;
          while (curChild) {
            var key = getNodeKey(curChild);
            if (key) {
              fromNodesLookup[key] = curChild;
            }
            indexTree(curChild);
            curChild = curChild.nextSibling;
          }
        }
      }
      indexTree(fromNode);
      function handleNodeAdded(el) {
        onNodeAdded(el);
        var curChild = el.firstChild;
        while (curChild) {
          var nextSibling = curChild.nextSibling;
          var key = getNodeKey(curChild);
          if (key) {
            var unmatchedFromEl = fromNodesLookup[key];
            if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
              curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
              morphEl(unmatchedFromEl, curChild);
            } else {
              handleNodeAdded(curChild);
            }
          } else {
            handleNodeAdded(curChild);
          }
          curChild = nextSibling;
        }
      }
      function cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey) {
        while (curFromNodeChild) {
          var fromNextSibling = curFromNodeChild.nextSibling;
          if (curFromNodeKey = getNodeKey(curFromNodeChild)) {
            addKeyedRemoval(curFromNodeKey);
          } else {
            removeNode(curFromNodeChild, fromEl, true);
          }
          curFromNodeChild = fromNextSibling;
        }
      }
      function morphEl(fromEl, toEl, childrenOnly2) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
          delete fromNodesLookup[toElKey];
        }
        if (!childrenOnly2) {
          var beforeUpdateResult = onBeforeElUpdated(fromEl, toEl);
          if (beforeUpdateResult === false) {
            return;
          } else if (beforeUpdateResult instanceof HTMLElement) {
            fromEl = beforeUpdateResult;
            indexTree(fromEl);
          }
          morphAttrs2(fromEl, toEl);
          onElUpdated(fromEl);
          if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
            return;
          }
        }
        if (fromEl.nodeName !== "TEXTAREA") {
          morphChildren(fromEl, toEl);
        } else {
          specialElHandlers.TEXTAREA(fromEl, toEl);
        }
      }
      function morphChildren(fromEl, toEl) {
        var skipFrom = skipFromChildren(fromEl, toEl);
        var curToNodeChild = toEl.firstChild;
        var curFromNodeChild = fromEl.firstChild;
        var curToNodeKey;
        var curFromNodeKey;
        var fromNextSibling;
        var toNextSibling;
        var matchingFromEl;
        outer:
          while (curToNodeChild) {
            toNextSibling = curToNodeChild.nextSibling;
            curToNodeKey = getNodeKey(curToNodeChild);
            while (!skipFrom && curFromNodeChild) {
              fromNextSibling = curFromNodeChild.nextSibling;
              if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              curFromNodeKey = getNodeKey(curFromNodeChild);
              var curFromNodeType = curFromNodeChild.nodeType;
              var isCompatible = void 0;
              if (curFromNodeType === curToNodeChild.nodeType) {
                if (curFromNodeType === ELEMENT_NODE) {
                  if (curToNodeKey) {
                    if (curToNodeKey !== curFromNodeKey) {
                      if (matchingFromEl = fromNodesLookup[curToNodeKey]) {
                        if (fromNextSibling === matchingFromEl) {
                          isCompatible = false;
                        } else {
                          fromEl.insertBefore(matchingFromEl, curFromNodeChild);
                          if (curFromNodeKey) {
                            addKeyedRemoval(curFromNodeKey);
                          } else {
                            removeNode(curFromNodeChild, fromEl, true);
                          }
                          curFromNodeChild = matchingFromEl;
                          curFromNodeKey = getNodeKey(curFromNodeChild);
                        }
                      } else {
                        isCompatible = false;
                      }
                    }
                  } else if (curFromNodeKey) {
                    isCompatible = false;
                  }
                  isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                  if (isCompatible) {
                    morphEl(curFromNodeChild, curToNodeChild);
                  }
                } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                  isCompatible = true;
                  if (curFromNodeChild.nodeValue !== curToNodeChild.nodeValue) {
                    curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                  }
                }
              }
              if (isCompatible) {
                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
                continue outer;
              }
              if (curFromNodeKey) {
                addKeyedRemoval(curFromNodeKey);
              } else {
                removeNode(curFromNodeChild, fromEl, true);
              }
              curFromNodeChild = fromNextSibling;
            }
            if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
              if (!skipFrom) {
                addChild(fromEl, matchingFromEl);
              }
              morphEl(matchingFromEl, curToNodeChild);
            } else {
              var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
              if (onBeforeNodeAddedResult !== false) {
                if (onBeforeNodeAddedResult) {
                  curToNodeChild = onBeforeNodeAddedResult;
                }
                if (curToNodeChild.actualize) {
                  curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                }
                addChild(fromEl, curToNodeChild);
                handleNodeAdded(curToNodeChild);
              }
            }
            curToNodeChild = toNextSibling;
            curFromNodeChild = fromNextSibling;
          }
        cleanupFromEl(fromEl, curFromNodeChild, curFromNodeKey);
        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
          specialElHandler(fromEl, toEl);
        }
      }
      var morphedNode = fromNode;
      var morphedNodeType = morphedNode.nodeType;
      var toNodeType = toNode.nodeType;
      if (!childrenOnly) {
        if (morphedNodeType === ELEMENT_NODE) {
          if (toNodeType === ELEMENT_NODE) {
            if (!compareNodeNames(fromNode, toNode)) {
              onNodeDiscarded(fromNode);
              morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
            }
          } else {
            morphedNode = toNode;
          }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
          if (toNodeType === morphedNodeType) {
            if (morphedNode.nodeValue !== toNode.nodeValue) {
              morphedNode.nodeValue = toNode.nodeValue;
            }
            return morphedNode;
          } else {
            morphedNode = toNode;
          }
        }
      }
      if (morphedNode === toNode) {
        onNodeDiscarded(fromNode);
      } else {
        if (toNode.isSameNode && toNode.isSameNode(morphedNode)) {
          return;
        }
        morphEl(morphedNode, toNode, childrenOnly);
        if (keyedRemovalList) {
          for (var i = 0, len = keyedRemovalList.length; i < len; i++) {
            var elToRemove = fromNodesLookup[keyedRemovalList[i]];
            if (elToRemove) {
              removeNode(elToRemove, elToRemove.parentNode, false);
            }
          }
        }
      }
      if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
          morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
      }
      return morphedNode;
    };
  }
  var morphdom = morphdomFactory(morphAttrs);
  var morphdom_esm_default = morphdom;
  var DOMPatch = class {
    constructor(view, container, html, streams, targetCID, opts = {}) {
      var _a;
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.rootID = view.root.id;
      this.html = html;
      this.streams = streams;
      this.streamInserts = {};
      this.streamComponentRestore = {};
      this.targetCID = targetCID;
      this.pendingRemoves = [];
      this.phxRemove = this.liveSocket.binding("remove");
      this.targetContainer = targetCID ? dom_default.getComponent(this.view.id, targetCID) : container;
      this.beforeUpdatedCallbacks = [];
      this.afterAddedCallbacks = [];
      this.afterUpdatedCallbacks = [];
      this.afterPhxChildAddedCallbacks = [];
      this.afterDiscardedCallbacks = [];
      this.afterTransitionsDiscardedCallbacks = [];
      this.withChildren = opts.withChildren || opts.undoRef !== void 0 || false;
      this.undoRef = (_a = opts.undoRef) != null ? _a : null;
    }
    beforeUpdated(callback) {
      this.beforeUpdatedCallbacks.push(callback);
    }
    afterAdded(callback) {
      this.afterAddedCallbacks.push(callback);
    }
    afterUpdated(callback) {
      this.afterUpdatedCallbacks.push(callback);
    }
    afterPhxChildAdded(callback) {
      this.afterPhxChildAddedCallbacks.push(callback);
    }
    afterDiscarded(callback) {
      this.afterDiscardedCallbacks.push(callback);
    }
    afterTransitionsDiscarded(callback) {
      this.afterTransitionsDiscardedCallbacks.push(callback);
    }
    markPrunableContentForRemoval() {
      const phxUpdate = this.liveSocket.binding(PHX_UPDATE);
      dom_default.all(this.container, `[${phxUpdate}=append] > *, [${phxUpdate}=prepend] > *`, (el) => {
        el.setAttribute(PHX_PRUNE, "");
      });
    }
    perform(isJoinPatch) {
      const { view, liveSocket: liveSocket2, html, container } = this;
      let targetContainer = this.targetContainer;
      if (this.targetCID) {
        const closestLock = targetContainer.closest(`[${PHX_REF_LOCK}]`);
        if (closestLock && !closestLock.isSameNode(targetContainer)) {
          const clonedTree = dom_default.private(closestLock, PHX_REF_LOCK);
          if (clonedTree) {
            targetContainer = clonedTree.querySelector(`[data-phx-component="${this.targetCID}"]`);
            if (!targetContainer)
              return;
          }
        }
      }
      const focused = liveSocket2.getActiveElement();
      const { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      const phxUpdate = liveSocket2.binding(PHX_UPDATE);
      const phxViewportTop = liveSocket2.binding(PHX_VIEWPORT_TOP);
      const phxViewportBottom = liveSocket2.binding(PHX_VIEWPORT_BOTTOM);
      const phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      const added = [];
      const updates = [];
      const appendPrependUpdates = [];
      let portalCallbacks = [];
      let externalFormTriggered = null;
      const morph = (targetContainer2, source, withChildren = this.withChildren) => {
        const morphCallbacks = {
          childrenOnly: targetContainer2.getAttribute(PHX_COMPONENT) === null && !withChildren,
          getNodeKey: (node) => {
            if (!(node instanceof Element))
              return null;
            if (dom_default.isPhxDestroyed(node)) {
              return null;
            }
            if (isJoinPatch) {
              return node.id;
            }
            if (dom_default.private(node, "clientsideIdAttribute")) {
              return node.getAttribute(PHX_MAGIC_ID);
            }
            return node.id || node.getAttribute(PHX_MAGIC_ID);
          },
          skipFromChildren: (from) => {
            return from.getAttribute(phxUpdate) === PHX_STREAM;
          },
          addChild: (parent, child) => {
            const { ref, streamAt } = this.getStreamInsert(child);
            if (ref === void 0) {
              return parent.appendChild(child);
            }
            this.setStreamRef(child, ref);
            if (streamAt === 0) {
              parent.insertAdjacentElement("afterbegin", child);
            } else if (streamAt === -1) {
              const lastChild = parent.lastElementChild;
              if (lastChild && !lastChild.hasAttribute(PHX_STREAM_REF)) {
                const nonStreamChild = Array.from(parent.children).find((c) => !c.hasAttribute(PHX_STREAM_REF));
                parent.insertBefore(child, nonStreamChild != null ? nonStreamChild : null);
              } else {
                parent.appendChild(child);
              }
            } else if (streamAt > 0) {
              const sibling = Array.from(parent.children)[streamAt];
              parent.insertBefore(child, sibling);
            }
          },
          onBeforeNodeAdded: (el) => {
            var _a;
            if (!(el instanceof Element)) {
              return el;
            }
            if (((_a = this.getStreamInsert(el)) == null ? void 0 : _a.updateOnly) && !this.streamComponentRestore[el.id]) {
              return false;
            }
            dom_default.maintainPrivateHooks(el, el, phxViewportTop, phxViewportBottom);
            let morphedEl = el;
            if (this.streamComponentRestore[el.id]) {
              morphedEl = this.streamComponentRestore[el.id];
              delete this.streamComponentRestore[el.id];
              morph(morphedEl, el, true);
            }
            return morphedEl;
          },
          onNodeAdded: (el) => {
            if (!(el instanceof Element)) {
              added.push(el);
              return;
            }
            this.maybeReOrderStream(el, true);
            if (dom_default.isPortalTemplate(el)) {
              portalCallbacks.push(() => this.teleport(el, morph));
            }
            if (el instanceof HTMLImageElement && el.srcset) {
              el.srcset = el.srcset;
            } else if (el instanceof HTMLVideoElement && el.autoplay) {
              el.play();
            }
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
              this.trackAfterPhxChildAdded(el);
            }
            if (el.nodeName === "SCRIPT" && el.hasAttribute(PHX_RUNTIME_HOOK)) {
              this.handleRuntimeHook(el, source);
            }
            added.push(el);
          },
          onNodeDiscarded: (el) => this.onNodeDiscarded(el),
          onBeforeNodeDiscarded: (el) => {
            var _a;
            if (!(el instanceof Element)) {
              return true;
            }
            if (el.getAttribute(PHX_PRUNE) !== null) {
              return true;
            }
            if (el.parentElement !== null && el.id && dom_default.isPhxUpdate(el.parentElement, phxUpdate, [
              PHX_STREAM,
              "append",
              "prepend"
            ])) {
              return false;
            }
            if (el.getAttribute(PHX_TELEPORTED_REF)) {
              return false;
            }
            if (this.maybePendingRemove(el)) {
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            if (dom_default.isPortalTemplate(el)) {
              const teleportedEl = document.getElementById(((_a = el.content.firstElementChild) == null ? void 0 : _a.id) || "");
              if (teleportedEl) {
                teleportedEl.remove();
                morphCallbacks.onNodeDiscarded(teleportedEl);
                this.view.dropPortalElementId(teleportedEl.id);
              }
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
            this.maybeReOrderStream(el, false);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            if (fromEl.id && fromEl.isSameNode(targetContainer2) && fromEl.id !== toEl.id) {
              morphCallbacks.onNodeDiscarded(fromEl);
              fromEl.replaceWith(toEl);
              return morphCallbacks.onNodeAdded(toEl);
            }
            dom_default.syncPendingAttrs(fromEl, toEl);
            dom_default.maintainPrivateHooks(fromEl, toEl, phxViewportTop, phxViewportBottom);
            dom_default.cleanChildNodes(toEl, phxUpdate);
            const isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isEditableInput(fromEl);
            const focusedSelectChanged = isFocusedFormEl && this.isChangedSelect(fromEl, toEl);
            if (this.skipCIDSibling(toEl)) {
              this.maybeCloneLockedElement(fromEl, isFocusedFormEl);
              this.copyNestedPrivateLock(fromEl, toEl);
              this.maybeReOrderStream(fromEl);
              return false;
            }
            if (dom_default.isPhxSticky(fromEl)) {
              [PHX_SESSION, PHX_STATIC, PHX_ROOT_ID].map((attr) => [
                attr,
                fromEl.getAttribute(attr),
                toEl.getAttribute(attr)
              ]).forEach(([attr, fromVal, toVal]) => {
                if (toVal && fromVal !== toVal) {
                  fromEl.setAttribute(attr, toVal);
                }
              });
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate) || fromEl.form && fromEl.form.isSameNode(externalFormTriggered)) {
              this.trackBeforeUpdated(fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, {
                isIgnored: dom_default.isIgnored(fromEl, phxUpdate)
              });
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (fromEl.type === "number" && fromEl.validity && fromEl.validity.badInput) {
              return false;
            }
            fromEl = this.maybeCloneLockedElement(fromEl, isFocusedFormEl);
            if (dom_default.isPhxChild(toEl)) {
              const prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            this.copyNestedPrivateLock(fromEl, toEl);
            dom_default.copyPrivates(toEl, fromEl);
            if (dom_default.isPortalTemplate(toEl)) {
              portalCallbacks.push(() => this.teleport(toEl, morph));
              fromEl.content.replaceChildren(toEl.content.cloneNode(true));
              return false;
            }
            if (isFocusedFormEl && fromEl.type !== "hidden" && !focusedSelectChanged) {
              this.trackBeforeUpdated(fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            } else {
              if (focusedSelectChanged) {
                fromEl.blur();
              }
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
              }
              dom_default.syncAttrsToProps(toEl);
              dom_default.applyStickyOperations(toEl);
              this.trackBeforeUpdated(fromEl, toEl);
              return fromEl;
            }
          }
        };
        morphdom_esm_default(targetContainer2, source, morphCallbacks);
      };
      this.trackBeforeUpdated(container, container);
      liveSocket2.time("morphdom", () => {
        this.streams.forEach(([ref, inserts, deleteIds, reset]) => {
          inserts.forEach(([key, streamAt, limit, updateOnly]) => {
            this.streamInserts[key] = { ref, streamAt, limit, reset, updateOnly };
          });
          if (reset !== void 0) {
            dom_default.all(document, `[${PHX_STREAM_REF}="${ref}"]`, (child) => {
              this.removeStreamChildElement(child);
            });
          }
          deleteIds.forEach((id) => {
            const child = document.getElementById(id);
            if (child) {
              this.removeStreamChildElement(child);
            }
          });
        });
        if (isJoinPatch) {
          dom_default.all(this.container, `[${phxUpdate}=${PHX_STREAM}]`).filter((el) => this.view.ownsElement(el)).forEach((el) => {
            Array.from(el.children).forEach((child) => {
              this.removeStreamChildElement(child, true);
            });
          });
        }
        morph(targetContainer, html);
        let teleportCount = 0;
        while (portalCallbacks.length > 0 && teleportCount < 5) {
          const copy = portalCallbacks.slice();
          portalCallbacks = [];
          copy.forEach((callback) => callback());
          teleportCount++;
        }
        this.view.portalElementIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            const srcId = el.getAttribute(PHX_TELEPORTED_SRC);
            if (srcId) {
              const source = document.getElementById(srcId);
              if (!source) {
                el.remove();
                this.onNodeDiscarded(el);
                this.view.dropPortalElementId(id);
              }
            }
          }
        });
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
        detectInvalidStreamInserts(this.streamInserts);
        Array.from(document.querySelectorAll("input[name=id]")).forEach((node) => {
          if (node instanceof HTMLInputElement && node.form) {
            console.error('Detected an input with name="id" inside a form! This will cause problems when patching the DOM.\n', node);
          }
        });
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfterAdded(el));
      updates.forEach((el) => this.trackAfterUpdated(el));
      this.transitionPendingRemoves();
      if (externalFormTriggered) {
        liveSocket2.unload();
        const submitter = dom_default.private(externalFormTriggered, "submitter");
        if (submitter && submitter.name && targetContainer.contains(submitter)) {
          const input = document.createElement("input");
          input.type = "hidden";
          const formId = submitter.getAttribute("form");
          if (formId) {
            input.setAttribute("form", formId);
          }
          input.name = submitter.name;
          input.value = submitter.value;
          submitter.parentElement.insertBefore(input, submitter);
        }
        Object.getPrototypeOf(externalFormTriggered).submit.call(externalFormTriggered);
      }
      return true;
    }
    trackBeforeUpdated(fromEl, toEl) {
      this.beforeUpdatedCallbacks.forEach((cb) => cb(fromEl, toEl));
    }
    trackAfterAdded(el) {
      this.afterAddedCallbacks.forEach((cb) => cb(el));
    }
    trackAfterUpdated(el) {
      this.afterUpdatedCallbacks.forEach((cb) => cb(el));
    }
    trackAfterPhxChildAdded(el) {
      this.afterPhxChildAddedCallbacks.forEach((cb) => cb(el));
    }
    trackAfterDiscarded(el) {
      this.afterDiscardedCallbacks.forEach((cb) => cb(el));
    }
    trackAfterTransitionsDiscarded(els) {
      this.afterTransitionsDiscardedCallbacks.forEach((cb) => cb(els));
    }
    onNodeDiscarded(el) {
      if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
        this.liveSocket.destroyViewByEl(el);
      }
      this.trackAfterDiscarded(el);
    }
    maybePendingRemove(node) {
      if (node.getAttribute && node.getAttribute(this.phxRemove) !== null) {
        this.pendingRemoves.push(node);
        return true;
      } else {
        return false;
      }
    }
    removeStreamChildElement(child, force = false) {
      if (!force && !this.view.ownsElement(child)) {
        return;
      }
      if (this.streamInserts[child.id]) {
        this.streamComponentRestore[child.id] = child;
        child.remove();
      } else {
        if (!this.maybePendingRemove(child)) {
          child.remove();
          this.onNodeDiscarded(child);
        }
      }
    }
    getStreamInsert(el) {
      const insert = el.id ? this.streamInserts[el.id] : {};
      return insert || {};
    }
    setStreamRef(el, ref) {
      dom_default.putSticky(el, PHX_STREAM_REF, (el2) => el2.setAttribute(PHX_STREAM_REF, ref));
    }
    maybeReOrderStream(el, isNew = false) {
      const { ref, streamAt, reset } = this.getStreamInsert(el);
      if (streamAt === void 0) {
        return;
      }
      this.setStreamRef(el, ref);
      if (!reset && !isNew) {
        return;
      }
      if (!el.parentElement) {
        return;
      }
      if (streamAt === 0) {
        this.moveOrInsertBefore(el.parentElement, el, el.parentElement.firstElementChild);
      } else if (streamAt > 0) {
        const children = Array.from(el.parentElement.children);
        const oldIndex = children.indexOf(el);
        if (streamAt >= children.length - 1) {
          this.moveOrInsertBefore(el.parentElement, el, null);
        } else {
          const sibling = children[streamAt];
          if (oldIndex > streamAt) {
            this.moveOrInsertBefore(el.parentElement, el, sibling);
          } else {
            this.moveOrInsertBefore(el.parentElement, el, sibling.nextElementSibling);
          }
        }
      }
      this.maybeLimitStream(el);
    }
    moveOrInsertBefore(parent, child, ref) {
      if (typeof parent.moveBefore === "function") {
        try {
          parent.moveBefore(child, ref);
          return;
        } catch (e) {
        }
      }
      parent.insertBefore(child, ref);
    }
    maybeLimitStream(el) {
      const { limit } = this.getStreamInsert(el);
      if (limit !== null) {
        const children = Array.from(el.parentElement.children);
        if (limit < 0 && children.length > limit * -1) {
          children.slice(0, children.length + limit).forEach((child) => this.removeStreamChildElement(child));
        } else if (limit >= 0 && children.length > limit) {
          children.slice(limit).forEach((child) => this.removeStreamChildElement(child));
        }
      }
    }
    transitionPendingRemoves() {
      const { pendingRemoves, liveSocket: liveSocket2 } = this;
      if (pendingRemoves.length > 0) {
        liveSocket2.transitionRemoves(pendingRemoves, this.view, () => {
          pendingRemoves.forEach((el) => {
            const child = dom_default.firstPhxChild(el);
            if (child) {
              liveSocket2.destroyViewByEl(child);
            }
            el.remove();
          });
          this.trackAfterTransitionsDiscarded(pendingRemoves);
        });
      }
    }
    isChangedSelect(fromEl, toEl) {
      if (!(fromEl instanceof HTMLSelectElement) || fromEl.multiple) {
        return false;
      }
      if (fromEl.options.length !== toEl.options.length) {
        return true;
      }
      toEl.value = fromEl.value;
      return !fromEl.isEqualNode(toEl);
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.hasAttribute(PHX_SKIP);
    }
    maybeCloneLockedElement(fromEl, isFocusedFormEl) {
      if (!fromEl.hasAttribute(PHX_REF_SRC))
        return fromEl;
      const ref = new ElementRef(fromEl);
      if (!fromEl.hasAttribute(PHX_REF_LOCK) || this.undoRef !== null && ref.isLockUndoneBy(this.undoRef)) {
        return fromEl;
      }
      dom_default.applyStickyOperations(fromEl);
      const clone2 = fromEl.hasAttribute(PHX_REF_LOCK) ? dom_default.private(fromEl, PHX_REF_LOCK) || fromEl.cloneNode(true) : null;
      if (!clone2)
        return fromEl;
      dom_default.putPrivate(fromEl, PHX_REF_LOCK, clone2);
      return isFocusedFormEl ? fromEl : clone2;
    }
    copyNestedPrivateLock(fromEl, toEl) {
      if (this.undoRef === null || !dom_default.private(toEl, PHX_REF_LOCK))
        return;
      dom_default.putPrivate(fromEl, PHX_REF_LOCK, dom_default.private(toEl, PHX_REF_LOCK));
    }
    indexOf(parent, child) {
      return Array.from(parent.children).indexOf(child);
    }
    teleport(el, morph) {
      const targetSelector = el.getAttribute(PHX_PORTAL);
      const portalContainer = document.querySelector(targetSelector);
      if (!portalContainer) {
        throw new Error("portal target with selector " + targetSelector + " not found");
      }
      const toTeleport = el.content.firstElementChild;
      if (this.skipCIDSibling(toTeleport)) {
        return;
      }
      if (!(toTeleport == null ? void 0 : toTeleport.id)) {
        throw new Error("phx-portal template must have a single root element with ID!");
      }
      const existing = document.getElementById(toTeleport.id);
      let portalTarget;
      if (existing) {
        if (!portalContainer.contains(existing)) {
          portalContainer.appendChild(existing);
        }
        portalTarget = existing;
      } else {
        portalTarget = document.createElement(toTeleport.tagName);
        portalContainer.appendChild(portalTarget);
      }
      toTeleport.setAttribute(PHX_TELEPORTED_REF, this.view.id);
      toTeleport.setAttribute(PHX_TELEPORTED_SRC, el.id);
      morph(portalTarget, toTeleport, true);
      toTeleport.removeAttribute(PHX_TELEPORTED_REF);
      toTeleport.removeAttribute(PHX_TELEPORTED_SRC);
      this.view.pushPortalElementId(toTeleport.id);
    }
    handleRuntimeHook(el, source) {
      var _a, _b;
      const name = el.getAttribute(PHX_RUNTIME_HOOK);
      let nonce = el.hasAttribute("nonce") ? el.getAttribute("nonce") : null;
      if (el.hasAttribute("nonce")) {
        const template = document.createElement("template");
        template.innerHTML = source;
        nonce = (_b = (_a = template.content.querySelector(`script[${PHX_RUNTIME_HOOK}="${CSS.escape(name)}"]`)) == null ? void 0 : _a.getAttribute("nonce")) != null ? _b : null;
      }
      const script = document.createElement("script");
      script.textContent = el.textContent;
      dom_default.mergeAttrs(script, el, { isIgnored: false });
      if (nonce) {
        script.nonce = nonce;
      }
      el.replaceWith(script);
      el = script;
    }
  };
  var VOID_TAGS = /* @__PURE__ */ new Set([
    "area",
    "base",
    "br",
    "col",
    "command",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
  ]);
  var quoteChars = /* @__PURE__ */ new Set(["'", '"']);
  var modifyRoot = (html, attrs, clearInnerHTML) => {
    let i = 0;
    let insideComment = false;
    let beforeTag, afterTag, tag, tagNameEndsAt, id, newHTML;
    const lookahead = html.match(/^(\s*(?:<!--.*?-->\s*)*)<([^\s\/>]+)/);
    if (lookahead === null) {
      throw new Error(`malformed html ${html}`);
    }
    i = lookahead[0].length;
    beforeTag = lookahead[1];
    tag = lookahead[2];
    tagNameEndsAt = i;
    for (i; i < html.length; i++) {
      if (html.charAt(i) === ">") {
        break;
      }
      if (html.charAt(i) === "=") {
        const isId = html.slice(i - 3, i) === " id";
        i++;
        const char = html.charAt(i);
        if (quoteChars.has(char)) {
          const attrStartsAt = i;
          i++;
          for (i; i < html.length; i++) {
            if (html.charAt(i) === char) {
              break;
            }
          }
          if (isId) {
            id = html.slice(attrStartsAt + 1, i);
            break;
          }
        }
      }
    }
    let closeAt = html.length - 1;
    insideComment = false;
    while (closeAt >= beforeTag.length + tag.length) {
      const char = html.charAt(closeAt);
      if (insideComment) {
        if (char === "-" && html.slice(closeAt - 3, closeAt) === "<!-") {
          insideComment = false;
          closeAt -= 4;
        } else {
          closeAt -= 1;
        }
      } else if (char === ">" && html.slice(closeAt - 2, closeAt) === "--") {
        insideComment = true;
        closeAt -= 3;
      } else if (char === ">") {
        break;
      } else {
        closeAt -= 1;
      }
    }
    afterTag = html.slice(closeAt + 1, html.length);
    const attrsStr = Object.keys(attrs).map((attr) => attrs[attr] === true ? attr : `${attr}="${attrs[attr]}"`).join(" ");
    if (clearInnerHTML) {
      const idAttrStr = id ? ` id="${id}"` : "";
      if (VOID_TAGS.has(tag)) {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}/>`;
      } else {
        newHTML = `<${tag}${idAttrStr}${attrsStr === "" ? "" : " "}${attrsStr}></${tag}>`;
      }
    } else {
      const rest = html.slice(tagNameEndsAt, closeAt + 1);
      newHTML = `<${tag}${attrsStr === "" ? "" : " "}${attrsStr}${rest}`;
    }
    return [newHTML, beforeTag, afterTag];
  };
  var Rendered = class {
    static extract(diff) {
      const { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.magicId = 0;
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      const { buffer: str, streams } = this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids, true, {});
      return { buffer: str, streams };
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids, changeTracking, rootAttrs) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      const output = {
        buffer: "",
        components,
        onlyCids,
        streams: /* @__PURE__ */ new Set()
      };
      this.toOutputBuffer(rendered, null, output, changeTracking, rootAttrs);
      return { buffer: output.buffer, streams: output.streams };
    }
    componentCIDs(diff) {
      return Object.keys(diff[COMPONENTS] || {}).map((i) => parseInt(i));
    }
    isComponentOnlyDiff(diff) {
      if (!diff[COMPONENTS]) {
        return false;
      }
      return Object.keys(diff).length === 1;
    }
    getComponent(diff, cid) {
      return diff[COMPONENTS][cid];
    }
    resetRender(cid) {
      if (this.rendered[COMPONENTS][cid]) {
        this.rendered[COMPONENTS][cid].reset = true;
      }
    }
    mergeDiff(diff) {
      const newc = diff[COMPONENTS];
      const cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        const oldc = this.rendered[COMPONENTS];
        for (const cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (const cid in newc) {
          oldc[cid] = newc[cid];
        }
        diff[COMPONENTS] = newc;
      }
    }
    cachedFindComponent(cid, cdiff, oldc, newc, cache) {
      if (cache[cid]) {
        return cache[cid];
      } else {
        let ndiff, stat, scid = cdiff[STATIC];
        if (isCid(scid)) {
          let tdiff;
          if (scid > 0) {
            tdiff = this.cachedFindComponent(scid, newc[scid], oldc, newc, cache);
          } else {
            tdiff = oldc[-scid];
          }
          stat = tdiff[STATIC];
          ndiff = this.cloneMerge(tdiff, cdiff, true);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 || oldc[cid] === void 0 ? cdiff : this.cloneMerge(oldc[cid], cdiff, false);
        }
        cache[cid] = ndiff;
        return ndiff;
      }
    }
    mutableMerge(target, source) {
      if (source[STATIC] !== void 0) {
        return source;
      } else {
        this.doMutableMerge(target, source);
        return target;
      }
    }
    doMutableMerge(target, source) {
      if (source[KEYED]) {
        this.mergeKeyed(target, source);
      } else {
        for (const key in source) {
          const val = source[key];
          const targetVal = target[key];
          const isObjVal = isObject(val);
          if (isObjVal && val[STATIC] === void 0 && isObject(targetVal)) {
            this.doMutableMerge(targetVal, val);
          } else {
            target[key] = val;
          }
        }
      }
      if (target[ROOT]) {
        target.newRender = true;
      }
    }
    clone(diff) {
      if ("structuredClone" in window) {
        return structuredClone(diff);
      } else {
        return JSON.parse(JSON.stringify(diff));
      }
    }
    mergeKeyed(target, source) {
      const clonedTarget = this.clone(target);
      Object.entries(source[KEYED]).forEach(([i, entry]) => {
        if (i === KEYED_COUNT) {
          return;
        }
        if (Array.isArray(entry)) {
          const [old_idx, diff] = entry;
          target[KEYED][i] = clonedTarget[KEYED][old_idx];
          this.doMutableMerge(target[KEYED][i], diff);
        } else if (typeof entry === "number") {
          const old_idx = entry;
          target[KEYED][i] = clonedTarget[KEYED][old_idx];
        } else if (typeof entry === "object") {
          if (!target[KEYED][i]) {
            target[KEYED][i] = {};
          }
          this.doMutableMerge(target[KEYED][i], entry);
        }
      });
      if (source[KEYED][KEYED_COUNT] < target[KEYED][KEYED_COUNT]) {
        for (let i = source[KEYED][KEYED_COUNT]; i < target[KEYED][KEYED_COUNT]; i++) {
          delete target[KEYED][i];
        }
      }
      target[KEYED][KEYED_COUNT] = source[KEYED][KEYED_COUNT];
      if (source[STREAM]) {
        target[STREAM] = source[STREAM];
      }
      if (source[TEMPLATES]) {
        target[TEMPLATES] = source[TEMPLATES];
      }
    }
    cloneMerge(target, source, pruneMagicId) {
      let merged;
      if (source[KEYED]) {
        merged = this.clone(target);
        this.mergeKeyed(merged, source);
      } else {
        merged = __spreadValues(__spreadValues({}, target), source);
        for (const key in merged) {
          const val = source[key];
          const targetVal = target[key];
          if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
            merged[key] = this.cloneMerge(targetVal, val, pruneMagicId);
          } else if (val === void 0 && isObject(targetVal)) {
            merged[key] = this.cloneMerge(targetVal, {}, pruneMagicId);
          }
        }
      }
      if (pruneMagicId) {
        delete merged.magicId;
        delete merged.newRender;
      } else if (target[ROOT]) {
        merged.newRender = true;
      }
      return merged;
    }
    componentToString(cid) {
      const { buffer: str, streams } = this.recursiveCIDToString(this.rendered[COMPONENTS], cid, null);
      const [strippedHTML, _before, _after] = modifyRoot(str, {});
      return { buffer: strippedHTML, streams };
    }
    pruneCIDs(cids) {
      cids.forEach((cid) => delete this.rendered[COMPONENTS][cid]);
    }
    get() {
      return this.rendered;
    }
    isNewFingerprint(diff = {}) {
      return !!diff[STATIC];
    }
    templateStatic(part, templates) {
      if (typeof part === "number") {
        return templates[part];
      } else {
        return part;
      }
    }
    nextMagicID() {
      this.magicId++;
      return `m${this.magicId}-${this.parentViewId()}`;
    }
    toOutputBuffer(rendered, templates, output, changeTracking, rootAttrs = {}) {
      if (rendered[KEYED]) {
        return this.comprehensionToBuffer(rendered, templates, output, changeTracking);
      }
      if (rendered[TEMPLATES]) {
        templates = rendered[TEMPLATES];
        delete rendered[TEMPLATES];
      }
      let { [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      rendered[STATIC] = statics;
      const isRoot = rendered[ROOT];
      const prevBuffer = output.buffer;
      if (isRoot) {
        output.buffer = "";
      }
      if (changeTracking && isRoot && !rendered.magicId) {
        rendered.newRender = true;
        rendered.magicId = this.nextMagicID();
      }
      output.buffer += statics[0];
      for (let i = 1; i < statics.length; i++) {
        this.dynamicToBuffer(rendered[i - 1], templates, output, changeTracking);
        output.buffer += statics[i];
      }
      if (isRoot) {
        let skip = false;
        let attrs;
        if (changeTracking || rendered.magicId) {
          skip = changeTracking && !rendered.newRender;
          attrs = __spreadValues({ [PHX_MAGIC_ID]: rendered.magicId }, rootAttrs);
        } else {
          attrs = rootAttrs;
        }
        if (skip) {
          attrs[PHX_SKIP] = true;
        }
        const [newRoot, commentBefore, commentAfter] = modifyRoot(output.buffer, attrs, skip);
        rendered.newRender = false;
        output.buffer = prevBuffer + commentBefore + newRoot + commentAfter;
      }
    }
    comprehensionToBuffer(rendered, templates, output, changeTracking) {
      const keyedTemplates = templates || rendered[TEMPLATES];
      const statics = this.templateStatic(rendered[STATIC], templates);
      rendered[STATIC] = statics;
      delete rendered[TEMPLATES];
      for (let i = 0; i < rendered[KEYED][KEYED_COUNT]; i++) {
        output.buffer += statics[0];
        for (let j = 1; j < statics.length; j++) {
          this.dynamicToBuffer(rendered[KEYED][i][j - 1], keyedTemplates, output, changeTracking);
          output.buffer += statics[j];
        }
      }
      if (rendered[STREAM]) {
        const stream = rendered[STREAM];
        const [_ref, _inserts, deleteIds, reset] = stream || [null, {}, [], null];
        if (stream !== void 0 && (rendered[KEYED][KEYED_COUNT] > 0 || deleteIds.length > 0 || reset)) {
          delete rendered[STREAM];
          rendered[KEYED] = {
            [KEYED_COUNT]: 0
          };
          output.streams.add(stream);
        }
      }
    }
    dynamicToBuffer(rendered, templates, output, changeTracking) {
      if (typeof rendered === "number") {
        const { buffer: str, streams } = this.recursiveCIDToString(output.components, rendered, output.onlyCids);
        output.buffer += str;
        output.streams = /* @__PURE__ */ new Set([...output.streams, ...streams]);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, templates, output, changeTracking, {});
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      const component = components[cid] || logError(`no component for CID ${cid}`, components);
      const attrs = { [PHX_COMPONENT]: cid, [PHX_VIEW_REF]: this.viewId };
      const skip = onlyCids && !onlyCids.has(cid);
      component.newRender = !skip;
      component.magicId = `c${cid}-${this.parentViewId()}`;
      const changeTracking = !component.reset;
      const { buffer: html, streams } = this.recursiveToString(component, components, onlyCids, changeTracking, attrs);
      delete component.reset;
      return { buffer: html, streams };
    }
  };
  var focusStack = [];
  var default_transition_time = 200;
  var JS = {
    exec(e, eventType, phxEvent, view, sourceEl, defaults) {
      const [defaultKind, defaultArgs] = defaults || [
        null,
        { callback: defaults && defaults.callback }
      ];
      const commands = Array.isArray(phxEvent) ? phxEvent : typeof phxEvent === "string" && phxEvent.startsWith("[") ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
      commands.forEach(([kind, args]) => {
        if (kind === defaultKind) {
          args = __spreadValues(__spreadValues({}, defaultArgs), args);
          args.callback = args.callback || defaultArgs.callback;
        }
        this.filterToEls(view.liveSocket, sourceEl, args).forEach((el) => {
          this[`exec_${kind}`](e, eventType, phxEvent, view, sourceEl, el, args);
        });
      });
    },
    isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
    },
    isInViewport(el) {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      const windowWidth = window.innerWidth || document.documentElement.clientWidth;
      return rect.right > 0 && rect.bottom > 0 && rect.left < windowWidth && rect.top < windowHeight;
    },
    exec_exec(e, eventType, phxEvent, view, sourceEl, el, { attr, to }) {
      const encodedJS = el.getAttribute(attr);
      if (!encodedJS) {
        throw new Error(`expected ${attr} to contain JS command on "${to}"`);
      }
      view.liveSocket.execJS(el, encodedJS, eventType);
    },
    exec_dispatch(e, eventType, phxEvent, view, sourceEl, el, { event, detail, bubbles, blocking }) {
      detail = detail || {};
      detail.dispatcher = sourceEl;
      if (blocking) {
        const promise = new Promise((resolve, _reject) => {
          detail.done = resolve;
        });
        view.liveSocket.asyncTransition(promise);
      }
      dom_default.dispatchEvent(el, event, { detail, bubbles });
    },
    exec_push(e, eventType, phxEvent, view, sourceEl, el, args) {
      const {
        event,
        data,
        target,
        page_loading,
        loading,
        value,
        dispatcher,
        callback
      } = args;
      const pushOpts = {
        loading,
        value,
        target,
        page_loading: !!page_loading,
        originalEvent: e
      };
      const targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
      const phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      const handler = (targetView, targetCtx) => {
        if (!targetView.isConnected()) {
          return;
        }
        if (eventType === "change") {
          let { newCid, _target } = args;
          _target = _target || (dom_default.isFormAssociated(sourceEl) ? sourceEl.name : void 0);
          if (_target) {
            pushOpts._target = _target;
          }
          targetView.pushInput(sourceEl, targetCtx, newCid, event || phxEvent, pushOpts, callback);
        } else if (eventType === "submit") {
          const { submitter } = args;
          targetView.submitForm(sourceEl, targetCtx, event || phxEvent, submitter, pushOpts, callback);
        } else {
          targetView.pushEvent(eventType, sourceEl, targetCtx, event || phxEvent, data, pushOpts, callback);
        }
      };
      if (args.targetView && args.targetCtx) {
        handler(args.targetView, args.targetCtx);
      } else {
        view.withinTargets(phxTarget, handler);
      }
    },
    exec_navigate(e, eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.historyRedirect(e, href, replace ? "replace" : "push", null, sourceEl);
    },
    exec_patch(e, eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.pushHistoryPatch(e, href, replace ? "replace" : "push", sourceEl);
    },
    exec_focus(e, eventType, phxEvent, view, sourceEl, el) {
      aria_default.attemptFocus(el);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => aria_default.attemptFocus(el));
      });
    },
    exec_focus_first(e, eventType, phxEvent, view, sourceEl, el) {
      aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el));
      });
    },
    exec_push_focus(e, eventType, phxEvent, view, sourceEl, el) {
      focusStack.push(el || sourceEl);
    },
    exec_pop_focus(_e, _eventType, _phxEvent, _view, _sourceEl, _el) {
      const el = focusStack.pop();
      if (el) {
        el.focus();
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => el.focus());
        });
      }
    },
    exec_add_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.addOrRemoveClasses(el, names, [], transition, time, view, blocking);
    },
    exec_remove_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.addOrRemoveClasses(el, [], names, transition, time, view, blocking);
    },
    exec_toggle_class(e, eventType, phxEvent, view, sourceEl, el, { names, transition, time, blocking }) {
      this.toggleClasses(el, names, transition, time, view, blocking);
    },
    exec_toggle_attr(e, eventType, phxEvent, view, sourceEl, el, { attr: [attr, val1, val2] }) {
      this.toggleAttr(el, attr, val1, val2);
    },
    exec_ignore_attrs(e, eventType, phxEvent, view, sourceEl, el, { attrs }) {
      this.ignoreAttrs(el, attrs);
    },
    exec_transition(e, eventType, phxEvent, view, sourceEl, el, { time, transition, blocking }) {
      this.addOrRemoveClasses(el, [], [], transition, time, view, blocking);
    },
    exec_toggle(e, eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time, blocking }) {
      this.toggle(eventType, view, el, display, ins, outs, time, blocking);
    },
    exec_show(e, eventType, phxEvent, view, sourceEl, el, { display, transition, time, blocking }) {
      this.show(eventType, view, el, display, transition, time, blocking);
    },
    exec_hide(e, eventType, phxEvent, view, sourceEl, el, { display, transition, time, blocking }) {
      this.hide(eventType, view, el, display, transition, time, blocking);
    },
    exec_set_attr(e, eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
      this.setOrRemoveAttrs(el, [[attr, val]], []);
    },
    exec_remove_attr(e, eventType, phxEvent, view, sourceEl, el, { attr }) {
      this.setOrRemoveAttrs(el, [], [attr]);
    },
    ignoreAttrs(el, attrs) {
      dom_default.putPrivate(el, "JS:ignore_attrs", {
        apply: (fromEl, toEl) => {
          let fromAttributes = Array.from(fromEl.attributes);
          let fromAttributeNames = fromAttributes.map((attr) => attr.name);
          Array.from(toEl.attributes).filter((attr) => {
            return !fromAttributeNames.includes(attr.name);
          }).forEach((attr) => {
            if (dom_default.attributeIgnored(attr, attrs)) {
              toEl.removeAttribute(attr.name);
            }
          });
          fromAttributes.forEach((attr) => {
            if (dom_default.attributeIgnored(attr, attrs)) {
              toEl.setAttribute(attr.name, attr.value);
            }
          });
        }
      });
    },
    onBeforeElUpdated(fromEl, toEl) {
      const ignoreAttrs = dom_default.private(fromEl, "JS:ignore_attrs");
      if (ignoreAttrs) {
        ignoreAttrs.apply(fromEl, toEl);
      }
    },
    show(eventType, view, el, display, transition, time, blocking) {
      if (!this.isVisible(el)) {
        this.toggle(eventType, view, el, display, transition, null, time, blocking);
      }
    },
    hide(eventType, view, el, display, transition, time, blocking) {
      if (this.isVisible(el)) {
        this.toggle(eventType, view, el, display, null, transition, time, blocking);
      }
    },
    toggle(eventType, view, el, display, ins, outs, time, blocking) {
      time = time || default_transition_time;
      const [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
      const [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
      if (inClasses.length > 0 || outClasses.length > 0) {
        if (this.isVisible(el)) {
          const onStart = () => {
            this.addOrRemoveClasses(el, outStartClasses, inClasses.concat(inStartClasses).concat(inEndClasses));
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, outClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, outEndClasses, outStartClasses));
            });
          };
          const onEnd = () => {
            this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          };
          el.dispatchEvent(new Event("phx:hide-start"));
          if (blocking === false) {
            onStart();
            setTimeout(onEnd, time);
          } else {
            view.transition(time, onStart, onEnd);
          }
        } else {
          if (eventType === "remove") {
            return;
          }
          const onStart = () => {
            this.addOrRemoveClasses(el, inStartClasses, outClasses.concat(outStartClasses).concat(outEndClasses));
            const stickyDisplay = display || this.defaultDisplay(el);
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, inClasses, []);
              window.requestAnimationFrame(() => {
                dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
                this.addOrRemoveClasses(el, inEndClasses, inStartClasses);
              });
            });
          };
          const onEnd = () => {
            this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
            el.dispatchEvent(new Event("phx:show-end"));
          };
          el.dispatchEvent(new Event("phx:show-start"));
          if (blocking === false) {
            onStart();
            setTimeout(onEnd, time);
          } else {
            view.transition(time, onStart, onEnd);
          }
        }
      } else {
        if (this.isVisible(el)) {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:hide-start"));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          window.requestAnimationFrame(() => {
            el.dispatchEvent(new Event("phx:show-start"));
            const stickyDisplay = display || this.defaultDisplay(el);
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = stickyDisplay);
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      }
    },
    toggleClasses(el, classes, transition, time, view, blocking) {
      window.requestAnimationFrame(() => {
        const [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        const newAdds = classes.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        const newRemoves = classes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        this.addOrRemoveClasses(el, newAdds, newRemoves, transition, time, view, blocking);
      });
    },
    toggleAttr(el, attr, val1, val2) {
      if (el.hasAttribute(attr)) {
        if (val2 !== void 0) {
          if (el.getAttribute(attr) === val1) {
            this.setOrRemoveAttrs(el, [[attr, val2]], []);
          } else {
            this.setOrRemoveAttrs(el, [[attr, val1]], []);
          }
        } else {
          this.setOrRemoveAttrs(el, [], [attr]);
        }
      } else {
        this.setOrRemoveAttrs(el, [[attr, val1]], []);
      }
    },
    addOrRemoveClasses(el, adds, removes, transition, time, view, blocking) {
      time = time || default_transition_time;
      const [transitionRun, transitionStart, transitionEnd] = transition || [
        [],
        [],
        []
      ];
      if (transitionRun.length > 0) {
        const onStart = () => {
          this.addOrRemoveClasses(el, transitionStart, [].concat(transitionRun).concat(transitionEnd));
          window.requestAnimationFrame(() => {
            this.addOrRemoveClasses(el, transitionRun, []);
            window.requestAnimationFrame(() => this.addOrRemoveClasses(el, transitionEnd, transitionStart));
          });
        };
        const onDone = () => this.addOrRemoveClasses(el, adds.concat(transitionEnd), removes.concat(transitionRun).concat(transitionStart));
        if (blocking === false) {
          onStart();
          setTimeout(onDone, time);
        } else {
          view.transition(time, onStart, onDone);
        }
        return;
      }
      window.requestAnimationFrame(() => {
        const [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        const keepAdds = adds.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        const keepRemoves = removes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        const newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
        const newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
        dom_default.putSticky(el, "classes", (currentEl) => {
          currentEl.classList.remove(...newRemoves);
          currentEl.classList.add(...newAdds);
          return [newAdds, newRemoves];
        });
      });
    },
    setOrRemoveAttrs(el, sets, removes) {
      const [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
      const alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
      const newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
      const newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
      if (sets.some(([attr, val]) => attr === "id" && el.getAttribute("id") !== val)) {
        dom_default.putPrivate(el, "clientsideIdAttribute", true);
      }
      dom_default.putSticky(el, "attrs", (currentEl) => {
        newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
        newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
        return [newSets, newRemoves];
      });
    },
    hasAllClasses(el, classes) {
      return classes.every((name) => el.classList.contains(name));
    },
    isToggledOut(el, outClasses) {
      return !this.isVisible(el) || this.hasAllClasses(el, outClasses);
    },
    filterToEls(liveSocket2, sourceEl, { to }) {
      const defaultQuery = () => {
        if (typeof to === "string") {
          return document.querySelectorAll(to);
        } else if (to.closest) {
          const toEl = sourceEl.closest(to.closest);
          return toEl ? [toEl] : [];
        } else if (to.inner) {
          return sourceEl.querySelectorAll(to.inner);
        }
      };
      return to ? liveSocket2.jsQuerySelectorAll(sourceEl, to, defaultQuery) : [sourceEl];
    },
    defaultDisplay(el) {
      return { tr: "table-row", td: "table-cell" }[el.tagName.toLowerCase()] || "block";
    },
    transitionClasses(val) {
      if (!val) {
        return null;
      }
      let [trans, tStart, tEnd] = Array.isArray(val) ? val : [val.split(" "), [], []];
      trans = Array.isArray(trans) ? trans : trans.split(" ");
      tStart = Array.isArray(tStart) ? tStart : tStart.split(" ");
      tEnd = Array.isArray(tEnd) ? tEnd : tEnd.split(" ");
      return [trans, tStart, tEnd];
    }
  };
  var js_default = JS;
  var js_commands_default = (liveSocket2, eventType) => {
    return {
      exec(el, encodedJS) {
        liveSocket2.execJS(el, encodedJS, eventType);
      },
      show(el, opts = {}) {
        const owner = liveSocket2.owner(el);
        js_default.show(eventType, owner, el, opts.display, js_default.transitionClasses(opts.transition), opts.time, opts.blocking);
      },
      hide(el, opts = {}) {
        const owner = liveSocket2.owner(el);
        js_default.hide(eventType, owner, el, null, js_default.transitionClasses(opts.transition), opts.time, opts.blocking);
      },
      toggle(el, opts = {}) {
        const owner = liveSocket2.owner(el);
        const inTransition = js_default.transitionClasses(opts.in);
        const outTransition = js_default.transitionClasses(opts.out);
        js_default.toggle(eventType, owner, el, opts.display, inTransition, outTransition, opts.time, opts.blocking);
      },
      addClass(el, names, opts = {}) {
        const classNames = Array.isArray(names) ? names : names.split(" ");
        const owner = liveSocket2.owner(el);
        js_default.addOrRemoveClasses(el, classNames, [], js_default.transitionClasses(opts.transition), opts.time, owner, opts.blocking);
      },
      removeClass(el, names, opts = {}) {
        const classNames = Array.isArray(names) ? names : names.split(" ");
        const owner = liveSocket2.owner(el);
        js_default.addOrRemoveClasses(el, [], classNames, js_default.transitionClasses(opts.transition), opts.time, owner, opts.blocking);
      },
      toggleClass(el, names, opts = {}) {
        const classNames = Array.isArray(names) ? names : names.split(" ");
        const owner = liveSocket2.owner(el);
        js_default.toggleClasses(el, classNames, js_default.transitionClasses(opts.transition), opts.time, owner, opts.blocking);
      },
      transition(el, transition, opts = {}) {
        const owner = liveSocket2.owner(el);
        js_default.addOrRemoveClasses(el, [], [], js_default.transitionClasses(transition), opts.time, owner, opts.blocking);
      },
      setAttribute(el, attr, val) {
        js_default.setOrRemoveAttrs(el, [[attr, val]], []);
      },
      removeAttribute(el, attr) {
        js_default.setOrRemoveAttrs(el, [], [attr]);
      },
      toggleAttribute(el, attr, val1, val2) {
        js_default.toggleAttr(el, attr, val1, val2);
      },
      push(el, type, opts = {}) {
        liveSocket2.withinOwners(el, (view) => {
          const data = opts.value || {};
          delete opts.value;
          let e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
          js_default.exec(e, eventType, type, view, el, ["push", __spreadValues({ data }, opts)]);
        });
      },
      navigate(href, opts = {}) {
        ensureSameOrigin(href, "navigate");
        const customEvent = new CustomEvent("phx:exec");
        liveSocket2.historyRedirect(customEvent, href, opts.replace ? "replace" : "push", null, null);
      },
      patch(href, opts = {}) {
        ensureSameOrigin(href, "patch");
        const customEvent = new CustomEvent("phx:exec");
        liveSocket2.pushHistoryPatch(customEvent, href, opts.replace ? "replace" : "push", null);
      },
      ignoreAttributes(el, attrs) {
        js_default.ignoreAttrs(el, Array.isArray(attrs) ? attrs : [attrs]);
      }
    };
  };
  var HOOK_ID = "hookId";
  var DEAD_HOOK = "deadHook";
  var viewHookID = 1;
  var ViewHook = class _ViewHook {
    get liveSocket() {
      return this.__liveSocket();
    }
    static makeID() {
      return viewHookID++;
    }
    static elementID(el) {
      return dom_default.private(el, HOOK_ID);
    }
    static deadHook(el) {
      return dom_default.private(el, DEAD_HOOK) === true;
    }
    constructor(view, el, callbacks) {
      this.el = el;
      this.__attachView(view);
      this.__listeners = /* @__PURE__ */ new Set();
      this.__isDisconnected = false;
      dom_default.putPrivate(this.el, HOOK_ID, _ViewHook.makeID());
      if (view && view.isDead) {
        dom_default.putPrivate(this.el, DEAD_HOOK, true);
      }
      if (callbacks) {
        const protectedProps = /* @__PURE__ */ new Set([
          "el",
          "liveSocket",
          "__view",
          "__listeners",
          "__isDisconnected",
          "constructor",
          "js",
          "pushEvent",
          "pushEventTo",
          "handleEvent",
          "removeHandleEvent",
          "upload",
          "uploadTo",
          "__mounted",
          "__updated",
          "__beforeUpdate",
          "__destroyed",
          "__reconnected",
          "__disconnected",
          "__cleanup__"
        ]);
        for (const key in callbacks) {
          if (Object.prototype.hasOwnProperty.call(callbacks, key)) {
            this[key] = callbacks[key];
            if (protectedProps.has(key)) {
              console.warn(`Hook object for element #${el.id} overwrites core property '${key}'!`);
            }
          }
        }
        const lifecycleMethods = [
          "mounted",
          "beforeUpdate",
          "updated",
          "destroyed",
          "disconnected",
          "reconnected"
        ];
        lifecycleMethods.forEach((methodName) => {
          if (callbacks[methodName] && typeof callbacks[methodName] === "function") {
            this[methodName] = callbacks[methodName];
          }
        });
      }
    }
    __attachView(view) {
      if (view) {
        this.__view = () => view;
        this.__liveSocket = () => view.liveSocket;
      } else {
        this.__view = () => {
          throw new Error(`hook not yet attached to a live view: ${this.el.outerHTML}`);
        };
        this.__liveSocket = () => {
          throw new Error(`hook not yet attached to a live view: ${this.el.outerHTML}`);
        };
      }
    }
    mounted() {
    }
    beforeUpdate() {
    }
    updated() {
    }
    destroyed() {
    }
    disconnected() {
    }
    reconnected() {
    }
    __mounted() {
      this.mounted();
    }
    __updated() {
      this.updated();
    }
    __beforeUpdate() {
      this.beforeUpdate();
    }
    __destroyed() {
      this.destroyed();
      dom_default.deletePrivate(this.el, HOOK_ID);
    }
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected();
      }
    }
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected();
    }
    js() {
      return __spreadProps(__spreadValues({}, js_commands_default(this.__view().liveSocket, "hook")), {
        exec: (encodedJS) => {
          this.__view().liveSocket.execJS(this.el, encodedJS, "hook");
        }
      });
    }
    pushEvent(event, payload, onReply) {
      const promise = this.__view().pushHookEvent(this.el, null, event, payload || {});
      if (onReply === void 0) {
        return promise.then(({ reply }) => reply);
      }
      promise.then(({ reply, ref }) => onReply(reply, ref)).catch(() => {
      });
    }
    pushEventTo(selectorOrTarget, event, payload, onReply) {
      if (onReply === void 0) {
        const targetPair = [];
        this.__view().withinTargets(selectorOrTarget, (view, targetCtx) => {
          targetPair.push({ view, targetCtx });
        });
        const promises = targetPair.map(({ view, targetCtx }) => {
          return view.pushHookEvent(this.el, targetCtx, event, payload || {});
        });
        return Promise.allSettled(promises);
      }
      this.__view().withinTargets(selectorOrTarget, (view, targetCtx) => {
        view.pushHookEvent(this.el, targetCtx, event, payload || {}).then(({ reply, ref }) => onReply(reply, ref)).catch(() => {
        });
      });
    }
    handleEvent(event, callback) {
      const callbackRef = {
        event,
        callback: (customEvent) => callback(customEvent.detail)
      };
      window.addEventListener(`phx:${event}`, callbackRef.callback);
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(ref) {
      window.removeEventListener(`phx:${ref.event}`, ref.callback);
      this.__listeners.delete(ref);
    }
    upload(name, files) {
      return this.__view().dispatchUploads(null, name, files);
    }
    uploadTo(selectorOrTarget, name, files) {
      return this.__view().withinTargets(selectorOrTarget, (view, targetCtx) => {
        view.dispatchUploads(targetCtx, name, files);
      });
    }
    __cleanup__() {
      this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
    }
  };
  var prependFormDataKey = (key, prefix) => {
    const isArray = key.endsWith("[]");
    let baseKey = isArray ? key.slice(0, -2) : key;
    baseKey = baseKey.replace(/([^\[\]]+)(\]?$)/, `${prefix}$1$2`);
    if (isArray) {
      baseKey += "[]";
    }
    return baseKey;
  };
  var View = class _View {
    static closestView(el) {
      const liveViewEl = el.closest(PHX_VIEW_SELECTOR);
      return liveViewEl ? dom_default.private(liveViewEl, "view") : null;
    }
    constructor(el, liveSocket2, parentView, flash = null, liveReferer = null) {
      this.rendered = null;
      this.isDead = false;
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      const boundView = dom_default.private(this.el, "view");
      if (boundView !== void 0 && boundView.isDead !== true) {
        logError(`The DOM element for this view has already been bound to a view.

        An element can only ever be associated with a single view!
        Please ensure that you are not trying to initialize multiple LiveSockets on the same page.
        This could happen if you're accidentally trying to render your root layout more than once.
        Ensure that the template set on the LiveView is different than the root layout.
      `, { view: boundView });
        throw new Error("Cannot bind multiple views to the same DOM element.");
      }
      dom_default.putPrivate(this.el, "view", this);
      this.id = this.el.id;
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
      this.ref = 0;
      this.lastAckRef = null;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.disconnectedTimer = null;
      this.pendingDiffs = [];
      this.pendingForms = /* @__PURE__ */ new Set();
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinAttempts = 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function(onDone) {
        onDone && onDone();
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = [];
      this.viewHooks = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.formsForRecovery = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        var _a;
        const url = this.href && this.expandURL(this.href);
        return {
          redirect: this.redirect ? url : void 0,
          url: this.redirect ? void 0 : url || void 0,
          params: this.connectParams(liveReferer),
          session: this.getSession(),
          static: this.getStatic(),
          flash: (_a = this.flash) != null ? _a : void 0,
          sticky: this.el.hasAttribute(PHX_STICKY)
        };
      });
      this.portalElementIds = /* @__PURE__ */ new Set();
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.el.hasAttribute(PHX_MAIN);
    }
    connectParams(liveReferer) {
      const params = this.liveSocket.params(this.el);
      const manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => "src" in node && node.src || "href" in node && node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      params["_mount_attempts"] = this.joinAttempts;
      params["_live_referer"] = liveReferer != null ? liveReferer : void 0;
      this.joinAttempts++;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      const val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyPortalElements();
      this.destroyed = true;
      dom_default.deletePrivate(this.el, "view");
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      this.loaderTimer != null && clearTimeout(this.loaderTimer);
      const onFinished = () => {
        callback();
        for (const id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(PHX_CONNECTED_CLASS, PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS, PHX_SERVER_ERROR_CLASS);
      this.el.classList.add(...classes);
    }
    showLoader(timeout) {
      this.loaderTimer != null && clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (const id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_LOADING_CLASS);
      }
    }
    execAll(binding) {
      dom_default.all(this.el, `[${binding}]`, (el) => this.liveSocket.execJS(el, el.getAttribute(binding)));
    }
    hideLoader() {
      this.loaderTimer != null && clearTimeout(this.loaderTimer);
      this.disconnectedTimer != null && clearTimeout(this.disconnectedTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
      this.execAll(this.binding("connected"));
    }
    triggerReconnected() {
      for (const id in this.viewHooks) {
        this.viewHooks[id].__reconnected();
      }
    }
    log(kind, msgCallback) {
      this.liveSocket.log(this, kind, msgCallback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.liveSocket.transition(time, onStart, onDone);
    }
    withinTargets(phxTarget, callback, dom = document) {
      if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
        return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
      }
      if (isCid(phxTarget)) {
        const target = dom_default.findComponent(this.id, phxTarget, dom);
        if (!target) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(this, typeof phxTarget === "number" ? phxTarget : parseInt(phxTarget));
        }
      } else {
        const targets = Array.from(dom.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(`nothing found matching the phx-target selector "${phxTarget}"`);
        }
        targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      const { diff, reply, events, title } = Rendered.extract(rawDiff);
      const ev = events.reduce((acc, args) => {
        if (args.length === 3 && args[2] == true) {
          acc.pre.push(args.slice(0, -1));
        } else {
          acc.post.push(args);
        }
        return acc;
      }, { pre: [], post: [] });
      this.liveSocket.dispatchEvents(ev.pre);
      const update = () => {
        callback({ diff, reply, events: ev.post });
        if (typeof title === "string" || type == "mount" && this.isMain()) {
          window.requestAnimationFrame(() => dom_default.putTitle(title));
        }
      };
      if ("onDocumentPatch" in this.liveSocket.domCallbacks) {
        this.liveSocket.triggerDOM("onDocumentPatch", [update]);
      } else {
        update();
      }
    }
    onJoin(resp) {
      const { rendered, container, liveview_version, pid } = resp;
      if (container) {
        const [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
        dom_default.putPrivate(this.el, "view", this);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      if (this.root === this) {
        this.formsForRecovery = this.getFormsForRecovery();
      }
      if (this.isMain() && window.history.state === null) {
        browser_default.pushState("replace", {
          type: "patch",
          id: this.id,
          position: this.liveSocket.currentHistoryPosition
        });
      }
      if (liveview_version !== this.liveSocket.version()) {
        console.warn(`LiveView asset version mismatch. JavaScript version ${this.liveSocket.version()} vs. server ${liveview_version}. To avoid issues, please ensure that your assets use the same version as the server.`);
      }
      if (pid) {
        this.el.setAttribute(PHX_LV_PID, pid);
      }
      browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        const [html, streams] = this.renderContainer(null, "join");
        this.dropPendingRefs();
        this.joinCount++;
        this.joinAttempts = 0;
        this.maybeRecoverForms(html, () => {
          this.onJoinComplete(resp, html, streams, events);
        });
      });
    }
    dropPendingRefs() {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.refSrc()}"]`, (el) => {
        el.removeAttribute(PHX_REF_LOADING);
        el.removeAttribute(PHX_REF_SRC);
        el.removeAttribute(PHX_REF_LOCK);
      });
    }
    onJoinComplete({ live_patch }, html, streams, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, streams, events);
      }
      const newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
        const fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
        const phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
        if (phxStatic) {
          toEl.setAttribute(PHX_STATIC, phxStatic);
        }
        if (fromEl) {
          fromEl.setAttribute(PHX_ROOT_ID, this.root.id);
        }
        return this.joinChild(toEl);
      });
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([
            this,
            () => this.applyJoinPatch(live_patch, html, streams, events)
          ]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, streams, events);
        }
      } else {
        this.root.pendingJoinOps.push([
          this,
          () => this.applyJoinPatch(live_patch, html, streams, events)
        ]);
      }
    }
    attachTrueDocEl() {
      const el = dom_default.byId(this.id);
      if (!el) {
        throw new Error("unable to find root element for view");
      }
      this.el = el;
      dom_default.putPrivate(this.el, "view", this);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    execNewMounted(parent = document) {
      let phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
      let phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
      this.all(parent, `[${phxViewportTop}], [${phxViewportBottom}]`, (hookEl) => {
        dom_default.maintainPrivateHooks(hookEl, hookEl, phxViewportTop, phxViewportBottom);
        this.maybeAddNewHook(hookEl);
      });
      this.all(parent, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        this.maybeAddNewHook(hookEl);
      });
      this.all(parent, `[${this.binding(PHX_MOUNTED)}]`, (el) => {
        this.maybeMounted(el);
      });
    }
    all(parent, selector, callback) {
      dom_default.all(parent, selector, (el) => {
        if (this.ownsElement(el)) {
          callback(el);
        }
      });
    }
    applyJoinPatch(live_patch, html, streams, events) {
      if (this.joinCount > 1) {
        if (this.pendingJoinOps.length) {
          this.pendingJoinOps.forEach((cb) => typeof cb === "function" && cb());
          this.pendingJoinOps = [];
        }
      }
      this.attachTrueDocEl();
      const patch = new DOMPatch(this, this.el, html, streams, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false, true);
      this.joinNewChildren();
      this.execNewMounted();
      this.joinPending = false;
      this.liveSocket.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        const { kind, to } = live_patch;
        this.liveSocket.historyPatch(to, kind);
      }
      this.hideLoader();
      if (this.joinCount > 1) {
        this.triggerReconnected();
      }
      this.stopCallback();
    }
    triggerBeforeUpdateHook(fromEl, toEl) {
      this.liveSocket.triggerDOM("onBeforeElUpdated", [fromEl, toEl]);
      const hook = this.getHook(fromEl);
      const isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    maybeMounted(el) {
      const phxMounted = el.getAttribute(this.binding(PHX_MOUNTED));
      const hasBeenInvoked = phxMounted && dom_default.private(el, "mounted");
      if (phxMounted && !hasBeenInvoked) {
        this.liveSocket.execJS(el, phxMounted);
        dom_default.putPrivate(el, "mounted", true);
      }
    }
    maybeAddNewHook(el) {
      const newHook = this.addHook(el);
      if (newHook) {
        newHook.__mounted();
      }
    }
    performPatch(patch, pruneCids, isJoinPatch = false) {
      const removedEls = [];
      let phxChildrenAdded = false;
      const updatedHookIds = /* @__PURE__ */ new Set();
      this.liveSocket.triggerDOM("onPatchStart", [patch.targetContainer]);
      patch.afterAdded((el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        const phxViewportTop = this.binding(PHX_VIEWPORT_TOP);
        const phxViewportBottom = this.binding(PHX_VIEWPORT_BOTTOM);
        dom_default.maintainPrivateHooks(el, el, phxViewportTop, phxViewportBottom);
        this.maybeAddNewHook(el);
        if (el.getAttribute) {
          this.maybeMounted(el);
        }
      });
      patch.afterPhxChildAdded((el) => {
        if (dom_default.isPhxSticky(el)) {
          this.liveSocket.joinRootViews();
        } else {
          phxChildrenAdded = true;
        }
      });
      patch.beforeUpdated((fromEl, toEl) => {
        const hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
        js_default.onBeforeElUpdated(fromEl, toEl);
      });
      patch.afterUpdated((el) => {
        if (updatedHookIds.has(el.id)) {
          const hook = this.getHook(el);
          hook && hook.__updated();
        }
      });
      patch.afterDiscarded((el) => {
        if (el.nodeType === Node.ELEMENT_NODE) {
          removedEls.push(el);
        }
      });
      patch.afterTransitionsDiscarded((els) => this.afterElementsRemoved(els, pruneCids));
      patch.perform(isJoinPatch);
      this.afterElementsRemoved(removedEls, pruneCids);
      this.liveSocket.triggerDOM("onPatchEnd", [patch.targetContainer]);
      return phxChildrenAdded;
    }
    afterElementsRemoved(elements, pruneCids) {
      const destroyedCIDs = [];
      elements.forEach((parent) => {
        const components = dom_default.all(parent, `[${PHX_VIEW_REF}="${this.id}"][${PHX_COMPONENT}]`);
        const hooks = dom_default.all(parent, `[${this.binding(PHX_HOOK)}], [data-phx-hook]`);
        components.concat(parent).forEach((el) => {
          const cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1 && el.getAttribute(PHX_VIEW_REF) === this.id) {
            destroyedCIDs.push(cid);
          }
        });
        hooks.concat(parent).forEach((hookEl) => {
          const hook = this.getHook(hookEl);
          hook && this.destroyHook(hook);
        });
      });
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
    }
    joinNewChildren() {
      dom_default.findPhxChildren(document, this.id).forEach((el) => this.joinChild(el));
    }
    maybeRecoverForms(html, callback) {
      var _a;
      const phxChange = this.binding("change");
      const oldForms = this.root.formsForRecovery;
      const template = document.createElement("template");
      template.innerHTML = html;
      if (!template.content.firstElementChild) {
        return;
      }
      dom_default.all(template.content, `[${PHX_PORTAL}]`).forEach((portalTemplate) => {
        var _a2;
        if (!(portalTemplate instanceof HTMLTemplateElement)) {
          return;
        }
        (_a2 = template.content.firstElementChild) == null ? void 0 : _a2.appendChild(portalTemplate.content.firstElementChild);
      });
      const rootEl = template.content.firstElementChild;
      rootEl.id = this.id;
      rootEl.setAttribute(PHX_ROOT_ID, this.root.id);
      rootEl.setAttribute(PHX_SESSION, this.getSession());
      rootEl.setAttribute(PHX_STATIC, (_a = this.getStatic()) != null ? _a : "");
      this.parent && rootEl.setAttribute(PHX_PARENT_ID, this.parent.id);
      dom_default.putPrivate(rootEl, "view", this);
      const formsToRecover = dom_default.all(template.content, "form").filter((newForm) => newForm.id && oldForms[newForm.id]).filter((newForm) => !this.pendingForms.has(newForm.id)).filter((newForm) => oldForms[newForm.id].getAttribute(phxChange) === newForm.getAttribute(phxChange)).map((newForm) => {
        return [oldForms[newForm.id], newForm];
      });
      if (formsToRecover.length === 0) {
        return callback();
      }
      formsToRecover.forEach(([oldForm, newForm], i) => {
        this.pendingForms.add(newForm.id);
        this.pushFormRecovery(oldForm, newForm, template.content.firstElementChild, () => {
          this.pendingForms.delete(newForm.id);
          if (i === formsToRecover.length - 1) {
            callback();
          }
        });
      });
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      var _a;
      if (el.id === this.id) {
        return this;
      } else {
        return this.children && ((_a = this.children[el.getAttribute(PHX_PARENT_ID)]) == null ? void 0 : _a[el.id]);
      }
    }
    destroyDescendent(id) {
      for (const parentId in this.root.children) {
        for (const childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      const child = this.getChildById(el.id);
      if (!child) {
        const view = new _View(el, this.liveSocket, this);
        this.root.children[this.id][view.id] = view;
        view.join();
        this.childJoins++;
        return true;
      }
    }
    isJoinPending() {
      return this.joinPending;
    }
    ackJoin(_child) {
      this.childJoins--;
      if (this.childJoins === 0) {
        if (this.parent) {
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
        }
      }
    }
    onAllChildJoinsComplete() {
      this.pendingForms.clear();
      this.formsForRecovery = {};
      this.joinCallback(() => {
        this.pendingJoinOps.forEach(([view, op]) => {
          if (!view.isDestroyed()) {
            op();
          }
        });
        this.pendingJoinOps = [];
      });
    }
    update(diff, events, isPending = false) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && this.root.isMain()) {
        if (!isPending) {
          this.pendingDiffs.push({ diff, events });
        }
        return false;
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          const parentCids = dom_default.findExistingParentCIDs(this.id, this.rendered.componentCIDs(diff));
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          const [html, streams] = this.renderContainer(diff, "update");
          const patch = new DOMPatch(this, this.el, html, streams, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.liveSocket.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
      return true;
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        const tag = this.el.tagName;
        const cids = diff ? this.rendered.componentCIDs(diff) : null;
        const { buffer: html, streams } = this.rendered.toString(cids);
        return [`<${tag}>${html}</${tag}>`, streams];
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      const { buffer: html, streams } = this.rendered.componentToString(cid);
      const patch = new DOMPatch(this, this.el, html, streams, cid);
      const childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      const hookElId = ViewHook.elementID(el);
      if (el.getAttribute && !this.ownsElement(el)) {
        return;
      }
      if (hookElId && !this.viewHooks[hookElId]) {
        if (ViewHook.deadHook(el)) {
          return;
        }
        const hook = dom_default.getCustomElHook(el) || logError(`no hook found for custom element: ${el.id}`);
        this.viewHooks[hookElId] = hook;
        hook.__attachView(this);
        return hook;
      } else if (hookElId || !el.getAttribute) {
        return;
      } else {
        const hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
        if (!hookName) {
          return;
        }
        const hookDefinition = this.liveSocket.getHookDefinition(hookName);
        if (hookDefinition) {
          if (!el.id) {
            logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
            return;
          }
          let hookInstance;
          try {
            if (typeof hookDefinition === "function" && hookDefinition.prototype instanceof ViewHook) {
              hookInstance = new hookDefinition(this, el);
            } else if (typeof hookDefinition === "object" && hookDefinition !== null) {
              hookInstance = new ViewHook(this, el, hookDefinition);
            } else {
              logError(`Invalid hook definition for "${hookName}". Expected a class extending ViewHook or an object definition.`, el);
              return;
            }
          } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            logError(`Failed to create hook "${hookName}": ${errorMessage}`, el);
            return;
          }
          this.viewHooks[ViewHook.elementID(hookInstance.el)] = hookInstance;
          return hookInstance;
        } else if (hookName !== null) {
          logError(`unknown hook found for "${hookName}"`, el);
        }
      }
    }
    destroyHook(hook) {
      const hookId = ViewHook.elementID(hook.el);
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[hookId];
    }
    applyPendingUpdates() {
      this.pendingDiffs = this.pendingDiffs.filter(({ diff, events }) => !this.update(diff, events, true));
      this.eachChild((child) => child.applyPendingUpdates());
    }
    eachChild(callback) {
      const children = this.root.children[this.id] || {};
      for (const id in children) {
        callback(this.getChildById(id));
      }
    }
    onChannel(event, cb) {
      this.liveSocket.onChannel(this.channel, event, (resp) => {
        if (this.isJoinPending()) {
          if (this.joinCount > 1) {
            this.pendingJoinOps.push(() => cb(resp));
          } else {
            this.root.pendingJoinOps.push([this, () => cb(resp)]);
          }
        } else {
          this.liveSocket.requestDOMUpdate(() => cb(resp));
        }
      });
    }
    bindChannel() {
      this.liveSocket.onChannel(this.channel, "diff", (rawDiff) => {
        this.liveSocket.requestDOMUpdate(() => {
          this.applyDiff("update", rawDiff, ({ diff, events }) => this.update(diff, events));
        });
      });
      this.onChannel("redirect", ({ to, flash }) => this.onRedirect({ to, flash }));
      this.onChannel("live_patch", (redir) => this.onLivePatch(redir));
      this.onChannel("live_redirect", (redir) => this.onLiveRedirect(redir));
      this.channel.onError((reason) => this.onError(reason));
      this.channel.onClose((reason) => this.onClose(reason));
    }
    destroyAllChildren() {
      this.eachChild((child) => child.destroy());
    }
    onLiveRedirect(redir) {
      const { to, kind, flash } = redir;
      const url = this.expandURL(to);
      const e = new CustomEvent("phx:server-navigate", {
        detail: { to, kind, flash }
      });
      this.liveSocket.historyRedirect(e, url, kind, flash);
    }
    onLivePatch(redir) {
      const { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({
      to,
      flash,
      reloadToken
    }) {
      this.liveSocket.redirect(to, flash != null ? flash : null, reloadToken != null ? reloadToken : null);
    }
    isDestroyed() {
      return this.destroyed;
    }
    joinDead() {
      this.isDead = true;
    }
    join(callback) {
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
      if (this.isMain()) {
        this.stopCallback = this.liveSocket.withPageLoading({
          to: this.href,
          kind: "initial"
        });
      }
      this.joinCallback = (onDone) => {
        onDone = onDone || function() {
        };
        callback ? callback(this.joinCount, onDone) : onDone();
      };
      this.wrapPush(() => this.channel.join(), {
        ok: (resp) => this.liveSocket.requestDOMUpdate(() => this.onJoin(resp)),
        error: (error) => this.onJoinError(error),
        timeout: () => this.onJoinError({ reason: "timeout" })
      });
    }
    onJoinError(resp) {
      if (resp.events) {
        this.liveSocket.dispatchEvents(resp.events);
      }
      if (resp.reason === "reload") {
        this.log("error", () => [
          `failed mount with ${resp.status}. Falling back to page reload`,
          resp
        ]);
        this.onRedirect({
          to: this.liveSocket.main.href,
          reloadToken: resp.token
        });
        return;
      } else if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => [
          "unauthorized live_redirect. Falling back to page request",
          resp
        ]);
        this.onRedirect({ to: this.liveSocket.main.href, flash: this.flash });
        return;
      }
      if (resp.redirect || resp.live_redirect) {
        this.joinPending = false;
        this.channel.leave();
      }
      if (resp.redirect) {
        return this.onRedirect(resp.redirect);
      }
      if (resp.live_redirect) {
        return this.onLiveRedirect(resp.live_redirect);
      }
      this.log("error", () => ["unable to join", resp]);
      if (this.isMain()) {
        this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS], { unstructuredError: resp, errorKind: "server" });
        if (this.liveSocket.isConnected()) {
          this.liveSocket.reloadWithJitter(this);
        }
      } else {
        if (this.joinAttempts >= MAX_CHILD_JOIN_ATTEMPTS) {
          this.root.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS], { unstructuredError: resp, errorKind: "server" });
          this.log("error", () => [
            `giving up trying to mount after ${MAX_CHILD_JOIN_ATTEMPTS} tries`,
            resp
          ]);
          this.destroy();
        }
        const trueChildEl = dom_default.byId(this.el.id);
        if (trueChildEl) {
          dom_default.mergeAttrs(trueChildEl, this.el);
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS], { unstructuredError: resp, errorKind: "server" });
          this.el = trueChildEl;
        } else {
          this.destroy();
        }
      }
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.isMain() && this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (this.liveSocket.isUnloaded()) {
        this.showLoader(BEFORE_UNLOAD_LOADER_TIMEOUT);
      }
    }
    onError(reason) {
      this.onClose(reason);
      if (this.liveSocket.isConnected()) {
        this.log("error", () => ["view crashed", reason]);
      }
      if (!this.liveSocket.isUnloaded()) {
        if (this.liveSocket.isConnected()) {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_SERVER_ERROR_CLASS], { unstructuredError: reason, errorKind: "server" });
        } else {
          this.displayError([PHX_LOADING_CLASS, PHX_ERROR_CLASS, PHX_CLIENT_ERROR_CLASS], { unstructuredError: reason, errorKind: "client" });
        }
      }
    }
    displayError(classes, details = {}) {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", {
          detail: __spreadValues({ to: this.href, kind: "error" }, details)
        });
      }
      this.showLoader();
      this.setContainerClasses(...classes);
      this.delayedDisconnected();
    }
    delayedDisconnected() {
      this.disconnectedTimer = setTimeout(() => {
        this.execAll(this.binding("disconnected"));
      }, this.liveSocket.disconnectedTimeout);
    }
    wrapPush(callerPush, receives) {
      const latency = this.liveSocket.getLatencySim();
      const withLatency = latency ? (cb) => setTimeout(() => !this.isDestroyed() && cb(), latency) : (cb) => !this.isDestroyed() && cb();
      withLatency(() => {
        callerPush().receive("ok", (resp) => withLatency(() => receives.ok && receives.ok(resp))).receive("error", (reason) => withLatency(() => receives.error && receives.error(reason))).receive("timeout", () => withLatency(() => receives.timeout && receives.timeout()));
      });
    }
    pushWithReply(refGenerator, event, payload) {
      if (!this.isConnected()) {
        return Promise.reject(new Error("no connection"));
      }
      const [ref, [el], opts] = refGenerator ? refGenerator({ payload }) : [null, [], {}];
      const oldJoinCount = this.joinCount;
      let onLoadingDone = function() {
      };
      if (opts.page_loading) {
        onLoadingDone = this.liveSocket.withPageLoading({
          kind: "element",
          target: el
        });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return new Promise((resolve, reject) => {
        this.wrapPush(() => this.channel.push(event, payload, PUSH_TIMEOUT), {
          ok: (resp) => {
            if (ref !== null) {
              this.lastAckRef = ref;
            }
            const finish = (hookReply) => {
              if (resp.redirect) {
                this.onRedirect(resp.redirect);
              }
              if (resp.live_patch) {
                this.onLivePatch(resp.live_patch);
              }
              if (resp.live_redirect) {
                this.onLiveRedirect(resp.live_redirect);
              }
              onLoadingDone();
              resolve({ resp, reply: hookReply, ref });
            };
            if (resp.diff) {
              this.liveSocket.requestDOMUpdate(() => {
                this.applyDiff("update", resp.diff, ({ diff, reply, events }) => {
                  if (ref !== null) {
                    this.undoRefs(ref, payload.event);
                  }
                  this.update(diff, events);
                  finish(reply);
                });
              });
            } else {
              if (ref !== null) {
                this.undoRefs(ref, payload.event);
              }
              finish(null);
            }
          },
          error: (reason) => reject(new Error(`failed with reason: ${JSON.stringify(reason)}`)),
          timeout: () => {
            reject(new Error("timeout"));
            if (this.joinCount === oldJoinCount) {
              this.liveSocket.reloadWithJitter(this, () => {
                this.log("timeout", () => [
                  "received timeout while communicating with server. Falling back to hard refresh for recovery"
                ]);
              });
            }
          }
        });
      });
    }
    undoRefs(ref, phxEvent, onlyEls) {
      if (!this.isConnected()) {
        return;
      }
      const selector = `[${PHX_REF_SRC}="${this.refSrc()}"]`;
      if (onlyEls) {
        onlyEls = new Set(onlyEls);
        dom_default.all(document, selector, (parent) => {
          if (onlyEls && !onlyEls.has(parent)) {
            return;
          }
          dom_default.all(parent, selector, (child) => this.undoElRef(child, ref, phxEvent));
          this.undoElRef(parent, ref, phxEvent);
        });
      } else {
        dom_default.all(document, selector, (el) => this.undoElRef(el, ref, phxEvent));
      }
    }
    undoElRef(el, ref, phxEvent) {
      const elRef = new ElementRef(el);
      elRef.maybeUndo(ref, phxEvent, (clonedTree) => {
        const patch = new DOMPatch(this, el, clonedTree, /* @__PURE__ */ new Set(), null, {
          undoRef: ref
        });
        const phxChildrenAdded = this.performPatch(patch, true);
        dom_default.all(el, `[${PHX_REF_SRC}="${this.refSrc()}"]`, (child) => this.undoElRef(child, ref, phxEvent));
        if (phxChildrenAdded) {
          this.joinNewChildren();
        }
      });
    }
    refSrc() {
      return this.el.id;
    }
    putRef(elements, phxEvent, eventType, opts = {}) {
      const newRef = this.ref++;
      const disableWith = this.binding(PHX_DISABLE_WITH);
      if (opts.loading) {
        const loadingEls = dom_default.all(document, opts.loading).map((el) => {
          return { el, lock: true, loading: true };
        });
        elements = elements.concat(loadingEls);
      }
      for (const { el, lock, loading } of elements) {
        if (!lock && !loading) {
          throw new Error("putRef requires lock or loading");
        }
        el.setAttribute(PHX_REF_SRC, this.refSrc());
        if (loading) {
          el.setAttribute(PHX_REF_LOADING, newRef.toString());
        }
        if (lock) {
          el.setAttribute(PHX_REF_LOCK, newRef.toString());
        }
        if (!loading || opts.submitter && !(el === opts.submitter || el === opts.form)) {
          continue;
        }
        const lockCompletePromise = new Promise((resolve) => {
          el.addEventListener(`phx:undo-lock:${newRef}`, () => resolve(detail), {
            once: true
          });
        });
        const loadingCompletePromise = new Promise((resolve) => {
          el.addEventListener(`phx:undo-loading:${newRef}`, () => resolve(detail), { once: true });
        });
        el.classList.add(`phx-${eventType}-loading`);
        const disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.textContent || "");
          }
          if (disableText !== "") {
            el.textContent = disableText;
          }
          el.setAttribute(PHX_DISABLED, el.getAttribute(PHX_DISABLED) || ("disabled" in el ? String(el.disabled) : ""));
          el.setAttribute("disabled", "");
        }
        const detail = {
          event: phxEvent,
          eventType,
          ref: newRef,
          isLoading: loading,
          isLocked: lock,
          lockElements: elements.filter(({ lock: lock2 }) => lock2).map(({ el: el2 }) => el2),
          loadingElements: elements.filter(({ loading: loading2 }) => loading2).map(({ el: el2 }) => el2),
          unlock: (els) => {
            els = Array.isArray(els) ? els : [els];
            this.undoRefs(newRef, phxEvent, els);
          },
          lockComplete: lockCompletePromise,
          loadingComplete: loadingCompletePromise,
          lock: (lockEl) => {
            return new Promise((resolve) => {
              if (this.isAcked(newRef)) {
                return resolve(detail);
              }
              lockEl.setAttribute(PHX_REF_LOCK, newRef);
              lockEl.setAttribute(PHX_REF_SRC, this.refSrc());
              lockEl.addEventListener(`phx:lock-stop:${newRef}`, () => resolve(detail), { once: true });
            });
          }
        };
        if (opts.payload) {
          detail["payload"] = opts.payload;
        }
        if (opts.target) {
          detail["target"] = opts.target;
        }
        if (opts.originalEvent) {
          detail["originalEvent"] = opts.originalEvent;
        }
        el.dispatchEvent(new CustomEvent("phx:push", {
          detail,
          bubbles: true,
          cancelable: false
        }));
        if (phxEvent) {
          el.dispatchEvent(new CustomEvent(`phx:push:${phxEvent}`, {
            detail,
            bubbles: true,
            cancelable: false
          }));
        }
      }
      return [newRef, elements.map(({ el }) => el), opts];
    }
    isAcked(ref) {
      return this.lastAckRef !== null && this.lastAckRef >= ref;
    }
    componentID(el) {
      const cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx, opts = {}) {
      if (isCid(targetCtx)) {
        return targetCtx;
      }
      const cidOrSelector = opts.target || target.getAttribute(this.binding("target"));
      if (isCid(cidOrSelector)) {
        return typeof cidOrSelector === "number" ? cidOrSelector : parseInt(cidOrSelector);
      } else if (targetCtx && (cidOrSelector !== null || opts.target)) {
        return this.closestComponentID(targetCtx);
      } else {
        return null;
      }
    }
    closestComponentID(targetCtx) {
      if (isCid(targetCtx)) {
        return targetCtx;
      } else if (targetCtx) {
        return maybe(targetCtx.closest(`[${PHX_COMPONENT}],[${PHX_TELEPORTED_SRC}]`), (el) => {
          if (el.hasAttribute(PHX_COMPONENT)) {
            return this.ownsElement(el) && this.componentID(el);
          }
          if (el.hasAttribute(PHX_TELEPORTED_SRC)) {
            const portalParent = dom_default.byId(el.getAttribute(PHX_TELEPORTED_SRC));
            return this.closestComponentID(portalParent);
          }
        });
      } else {
        return null;
      }
    }
    pushHookEvent(el, targetCtx, event, payload) {
      if (!this.isConnected()) {
        this.log("hook", () => [
          "unable to push hook event. LiveView not connected",
          event,
          payload
        ]);
        return Promise.reject(new Error("unable to push hook event. LiveView not connected"));
      }
      const refGenerator = () => this.putRef([{ el, loading: true, lock: true }], event, "hook", {
        payload,
        target: targetCtx
      });
      return this.pushWithReply(refGenerator, "event", {
        type: "hook",
        event,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }).then(({ resp: _resp, reply, ref }) => ({ reply, ref }));
    }
    extractMeta(el, meta, value) {
      const prefix = this.binding("value-");
      for (let i = 0; i < el.attributes.length; i++) {
        if (!meta) {
          meta = {};
        }
        const name = el.attributes[i].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0 && !(el instanceof HTMLFormElement)) {
        if (!meta) {
          meta = {};
        }
        meta.value = el.value;
        if (el.tagName === "INPUT" && CHECKABLE_INPUTS.indexOf(el.type) >= 0 && !el.checked) {
          delete meta.value;
        }
      }
      if (value) {
        if (!meta) {
          meta = {};
        }
        for (const key in value) {
          meta[key] = value[key];
        }
      }
      return meta;
    }
    serializeForm(form, opts = {}, onlyNames = []) {
      const { submitter } = opts;
      let injectedElement;
      if (submitter && submitter.name) {
        const input = document.createElement("input");
        input.type = "hidden";
        const formId = submitter.getAttribute("form");
        if (formId) {
          input.setAttribute("form", formId);
        }
        input.name = submitter.name;
        input.value = submitter.value;
        submitter.parentElement.insertBefore(input, submitter);
        injectedElement = input;
      }
      const formData = new FormData(form);
      const toRemove = [];
      formData.forEach((val, key, _index) => {
        if (val instanceof File) {
          toRemove.push(key);
        }
      });
      toRemove.forEach((key) => formData.delete(key));
      const params = new URLSearchParams();
      const { inputsUnused, onlyHiddenInputs } = Array.from(form.elements).reduce((acc, input) => {
        if (!dom_default.isFormAssociated(input)) {
          return acc;
        }
        const { inputsUnused: inputsUnused2, onlyHiddenInputs: onlyHiddenInputs2 } = acc;
        const key = input.name;
        if (!key) {
          return acc;
        }
        if (inputsUnused2[key] === void 0) {
          inputsUnused2[key] = true;
        }
        if (onlyHiddenInputs2[key] === void 0) {
          onlyHiddenInputs2[key] = true;
        }
        const inputSkipUnusedField = input.hasAttribute(this.binding(PHX_NO_UNUSED_FIELD));
        const isUsed = dom_default.private(input, PHX_HAS_FOCUSED) || dom_default.private(input, PHX_HAS_SUBMITTED) || inputSkipUnusedField;
        const isHidden = input.type === "hidden";
        inputsUnused2[key] = inputsUnused2[key] && !isUsed;
        onlyHiddenInputs2[key] = onlyHiddenInputs2[key] && isHidden;
        return acc;
      }, { inputsUnused: {}, onlyHiddenInputs: {} });
      const formSkipUnusedFields = form.hasAttribute(this.binding(PHX_NO_UNUSED_FIELD));
      for (const [key, val] of formData.entries()) {
        if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
          const isUnused = inputsUnused[key];
          const hidden = onlyHiddenInputs[key];
          const skipUnusedCheck = formSkipUnusedFields;
          if (!skipUnusedCheck && isUnused && !(submitter && submitter.name == key) && !hidden) {
            params.append(prependFormDataKey(key, "_unused_"), "");
          }
          if (typeof val === "string") {
            params.append(key, val);
          }
        }
      }
      if (submitter && injectedElement) {
        submitter.parentElement.removeChild(injectedElement);
      }
      return params.toString();
    }
    pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}, onReply) {
      this.pushWithReply((maybePayload) => this.putRef([{ el, loading: true, lock: true }], phxEvent, type, __spreadProps(__spreadValues({}, opts), {
        payload: maybePayload == null ? void 0 : maybePayload.payload
      })), "event", {
        type,
        event: phxEvent,
        value: this.extractMeta(el, meta, opts.value),
        cid: this.targetComponentID(el, targetCtx, opts)
      }).then(({ reply }) => onReply && onReply(reply)).catch((error) => logError("Failed to push event", error));
    }
    pushFileProgress(fileEl, entryRef, progress, onReply = function() {
    }) {
      this.liveSocket.withinOwners(fileEl.form, (view, targetCtx) => {
        view.pushWithReply(null, "progress", {
          event: fileEl.getAttribute(view.binding(PHX_PROGRESS)),
          ref: fileEl.getAttribute(PHX_UPLOAD_REF),
          entry_ref: entryRef,
          progress,
          cid: view.targetComponentID(fileEl.form, targetCtx)
        }).then(() => onReply()).catch((error) => logError("Failed to push file progress", error));
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
      if (!inputEl.form) {
        throw new Error("form events require the input to be inside a form");
      }
      let uploads;
      const cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx, opts);
      const refGenerator = (maybePayload) => {
        return this.putRef([
          { el: inputEl, loading: true, lock: true },
          { el: inputEl.form, loading: true, lock: true }
        ], phxEvent, "change", __spreadProps(__spreadValues({}, opts), { payload: maybePayload == null ? void 0 : maybePayload.payload }));
      };
      let formData;
      const meta = this.extractMeta(inputEl.form, {}, opts.value);
      const serializeOpts = {};
      if (inputEl instanceof HTMLButtonElement) {
        serializeOpts.submitter = inputEl;
      }
      if (inputEl.getAttribute(this.binding("change"))) {
        formData = this.serializeForm(inputEl.form, serializeOpts, [
          inputEl.name
        ]);
      } else {
        formData = this.serializeForm(inputEl.form, serializeOpts);
      }
      if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      const event = {
        type: "form",
        event: phxEvent,
        value: formData,
        meta: __spreadValues({
          _target: opts._target || "undefined"
        }, meta),
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event).then(({ resp }) => {
        if (dom_default.isUploadInput(inputEl) && dom_default.isAutoUpload(inputEl)) {
          ElementRef.onUnlock(inputEl, () => {
            if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
              const [ref, _els] = refGenerator();
              this.undoRefs(ref, phxEvent, [inputEl.form]);
              this.uploadFiles(inputEl.form, phxEvent, targetCtx, ref, cid, (_uploads) => {
                callback && callback(resp);
                this.triggerAwaitingSubmit(inputEl.form, phxEvent);
                this.undoRefs(ref, phxEvent);
              });
            }
          });
        } else {
          callback && callback(resp);
        }
      }).catch((error) => logError("Failed to push input event", error));
    }
    triggerAwaitingSubmit(formEl, phxEvent) {
      const awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        const [_el, _ref, _opts, callback] = awaitingSubmit;
        this.cancelSubmit(formEl, phxEvent);
        callback();
      }
    }
    getScheduledSubmit(formEl) {
      return this.formSubmits.find(([el, _ref, _opts, _callback]) => el.isSameNode(formEl));
    }
    scheduleSubmit(formEl, ref, opts, callback) {
      if (this.getScheduledSubmit(formEl)) {
        return true;
      }
      this.formSubmits.push([formEl, ref, opts, callback]);
    }
    cancelSubmit(formEl, phxEvent) {
      this.formSubmits = this.formSubmits.filter(([el, ref, _opts, _callback]) => {
        if (el.isSameNode(formEl)) {
          this.undoRefs(ref, phxEvent);
          return false;
        } else {
          return true;
        }
      });
    }
    disableForm(formEl, phxEvent, opts = {}) {
      const filterIgnored = (el) => {
        const userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      const filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      const filterButton = (el) => el.tagName == "BUTTON";
      const filterInput = (el) => ["INPUT", "TEXTAREA"].includes(el.tagName);
      const formElements = Array.from(formEl.elements);
      const disables = formElements.filter(filterDisables);
      const buttons = formElements.filter(filterButton).filter(filterIgnored);
      const inputs = formElements.filter(filterInput).filter(filterIgnored);
      buttons.forEach((button) => {
        button.setAttribute(PHX_DISABLED, button.disabled.toString());
        button.disabled = true;
      });
      inputs.forEach((input) => {
        input.setAttribute(PHX_READONLY, input.readOnly.toString());
        input.readOnly = true;
        if (input instanceof HTMLInputElement && input.files) {
          input.setAttribute(PHX_DISABLED, input.disabled.toString());
          input.disabled = true;
        }
      });
      const formEls = disables.concat(buttons).concat(inputs).map((el) => {
        return { el, loading: true, lock: true };
      });
      const els = [
        { el: formEl, loading: true, lock: false },
        ...formEls
      ].reverse();
      return this.putRef(els, phxEvent, "submit", opts);
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply) {
      const refGenerator = (maybePayload) => this.disableForm(formEl, phxEvent, __spreadProps(__spreadValues({}, opts), {
        form: formEl,
        payload: maybePayload == null ? void 0 : maybePayload.payload,
        submitter
      }));
      dom_default.putPrivate(formEl, "submitter", submitter);
      const cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        const [ref, _els] = refGenerator();
        const push = () => this.pushFormSubmit(formEl, targetCtx, phxEvent, submitter, opts, onReply);
        return this.scheduleSubmit(formEl, ref, opts, push);
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        const [ref, els] = refGenerator();
        const proxyRefGen = () => [ref, els, opts];
        this.uploadFiles(formEl, phxEvent, targetCtx, ref, cid, (_uploads) => {
          if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
            return this.undoRefs(ref, phxEvent);
          }
          const meta = this.extractMeta(formEl, {}, opts.value);
          const formData = this.serializeForm(formEl, { submitter });
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            meta,
            cid
          }).then(({ resp }) => onReply(resp)).catch((error) => logError("Failed to push form submit", error));
        });
      } else if (!(formEl.hasAttribute(PHX_REF_SRC) && formEl.classList.contains("phx-submit-loading"))) {
        const meta = this.extractMeta(formEl, {}, opts.value);
        const formData = this.serializeForm(formEl, { submitter });
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          meta,
          cid
        }).then(({ resp }) => onReply(resp)).catch((error) => logError("Failed to push form submit", error));
      }
    }
    uploadFiles(formEl, phxEvent, targetCtx, ref, cid, onComplete) {
      const joinCountAtUpload = this.joinCount;
      const inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        const uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        const entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        if (entries.length === 0) {
          numFileInputsInProgress--;
          return;
        }
        const payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload).then(({ resp }) => {
          this.log("upload", () => ["got preflight response", resp]);
          uploader.entries().forEach((entry) => {
            if (resp.entries && !resp.entries[entry.ref]) {
              this.handleFailedEntryPreflight(entry.ref, "failed preflight", uploader);
            }
          });
          if (resp.error || Object.keys(resp.entries).length === 0) {
            this.undoRefs(ref, phxEvent);
            const errors = resp.error || [];
            errors.map(([entry_ref, reason]) => {
              this.handleFailedEntryPreflight(entry_ref, reason, uploader);
            });
          } else {
            const onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        }).catch((error) => logError("Failed to push upload", error));
      });
    }
    handleFailedEntryPreflight(uploadRef, reason, uploader) {
      if (uploader.isAutoUpload()) {
        const entry = uploader.entries().find((entry2) => entry2.ref === uploadRef.toString());
        if (entry) {
          entry.cancel();
        }
      } else {
        uploader.entries().map((entry) => entry.cancel());
      }
      this.log("upload", () => [`error for entry ${uploadRef}`, reason]);
    }
    dispatchUploads(targetCtx, name, filesOrBlobs) {
      const targetElement = this.targetCtxElement(targetCtx) || this.el;
      const inputs = dom_default.findUploadInputs(targetElement).filter((el) => el.name === name);
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, {
          detail: { files: filesOrBlobs }
        });
      }
    }
    targetCtxElement(targetCtx) {
      if (isCid(targetCtx)) {
        const target = dom_default.findComponent(this.id, targetCtx);
        return target;
      } else if (targetCtx) {
        return targetCtx;
      } else {
        return null;
      }
    }
    pushFormRecovery(oldForm, newForm, templateDom, callback) {
      const phxChange = this.binding("change");
      const phxTarget = newForm.getAttribute(this.binding("target")) || newForm;
      const phxEvent = newForm.getAttribute(this.binding(PHX_AUTO_RECOVER)) || newForm.getAttribute(this.binding("change"));
      const inputs = Array.from(oldForm.elements).filter((el) => dom_default.isFormAssociated(el) && el.name && !el.hasAttribute(phxChange));
      if (inputs.length === 0) {
        callback();
        return;
      }
      inputs.forEach((input2) => input2.hasAttribute(PHX_UPLOAD_REF) && LiveUploader.clearFiles(input2));
      const input = inputs.find((el) => el.type !== "hidden") || inputs[0];
      let pending = 0;
      this.withinTargets(phxTarget, (targetView, targetCtx) => {
        const cid = this.targetComponentID(newForm, targetCtx);
        pending++;
        let e = new CustomEvent("phx:form-recovery", {
          detail: { sourceElement: oldForm }
        });
        js_default.exec(e, "change", phxEvent, this, input, [
          "push",
          {
            _target: input.name,
            targetView,
            targetCtx,
            newCid: cid,
            callback: () => {
              pending--;
              if (pending === 0) {
                callback();
              }
            }
          }
        ]);
      }, templateDom);
    }
    pushLinkPatch(e, href, targetEl, callback) {
      const linkRef = this.liveSocket.setPendingLink(href);
      const loading = e.isTrusted && e.type !== "popstate";
      const refGen = targetEl ? () => this.putRef([{ el: targetEl, loading, lock: true }], null, "click") : null;
      const fallback = () => this.liveSocket.redirect(window.location.href, null, null);
      const url = href.startsWith("/") ? `${location.protocol}//${location.host}${href}` : href;
      this.pushWithReply(refGen, "live_patch", { url }).then(({ resp }) => {
        this.liveSocket.requestDOMUpdate(() => {
          if (resp.link_redirect) {
            this.liveSocket.replaceMain(href, null, callback, linkRef);
          } else if (resp.redirect) {
            return;
          } else {
            if (this.liveSocket.commitPendingLink(linkRef)) {
              this.href = href;
            }
            this.applyPendingUpdates();
            callback && callback(linkRef);
          }
        });
      }, ({ error: _error, timeout: _timeout }) => fallback());
    }
    getFormsForRecovery() {
      if (this.joinCount === 0) {
        return {};
      }
      const phxChange = this.binding("change");
      return dom_default.all(document, `#${CSS.escape(this.id)} form[${phxChange}], [${PHX_TELEPORTED_REF}="${CSS.escape(this.id)}"] form[${phxChange}]`).filter((form) => form instanceof HTMLFormElement).filter((form) => form.id).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => {
        const clonedForm = form.cloneNode(true);
        morphdom_esm_default(clonedForm, form, {
          onBeforeElUpdated: (fromEl, toEl) => {
            dom_default.copyPrivates(fromEl, toEl);
            if (fromEl.getAttribute("form") === form.id && fromEl.parentNode) {
              fromEl.parentNode.removeChild(fromEl);
              return false;
            }
            return true;
          }
        });
        const externalElements = document.querySelectorAll(`[form="${CSS.escape(form.id)}"]`);
        Array.from(externalElements).forEach((el) => {
          const clonedEl = el.cloneNode(true);
          morphdom_esm_default(clonedEl, el);
          dom_default.copyPrivates(clonedEl, el);
          clonedEl.removeAttribute("form");
          clonedForm.appendChild(clonedEl);
        });
        return clonedForm;
      }).reduce((acc, form) => {
        acc[form.id] = form;
        return acc;
      }, {});
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.filter((cid) => {
        return dom_default.findComponent(this.id, cid) === null;
      });
      const onError = (error) => {
        if (!this.isDestroyed()) {
          logError("Failed to push components destroyed", error);
        }
      };
      if (willDestroyCIDs.length > 0) {
        willDestroyCIDs.forEach((cid) => this.rendered.resetRender(cid));
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }).then(() => {
          this.liveSocket.requestDOMUpdate(() => {
            let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
              return dom_default.findComponent(this.id, cid) === null;
            });
            if (completelyDestroyCIDs.length > 0) {
              this.pushWithReply(null, "cids_destroyed", {
                cids: completelyDestroyCIDs
              }).then(({ resp }) => {
                this.rendered.pruneCIDs(resp.cids);
              }).catch(onError);
            }
          });
        }).catch(onError);
      }
    }
    ownsElement(el) {
      let parentViewEl = dom_default.closestViewEl(el);
      return el.getAttribute(PHX_PARENT_ID) === this.id || parentViewEl && parentViewEl.id === this.id || !parentViewEl && this.isDead;
    }
    submitForm(form, targetCtx, phxEvent, submitter, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      const inputs = Array.from(form.elements);
      inputs.forEach((input) => dom_default.putPrivate(input, PHX_HAS_SUBMITTED, true));
      this.liveSocket.blurActiveElement();
      this.pushFormSubmit(form, targetCtx, phxEvent, submitter, opts, () => {
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
    }
    pushPortalElementId(id) {
      this.portalElementIds.add(id);
    }
    dropPortalElementId(id) {
      this.portalElementIds.delete(id);
    }
    destroyPortalElements() {
      if (!this.liveSocket.unloaded) {
        this.portalElementIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) {
            el.remove();
          }
        });
      }
    }
  };
  var LiveSocket = class {
    constructor(url, phxSocket, opts = {}) {
      this.unloaded = false;
      if (!phxSocket || phxSocket.constructor.name === "Object") {
        throw new Error(`
      a phoenix Socket must be provided as the second argument to the LiveSocket constructor. For example:

          import {Socket} from "phoenix"
          import {LiveSocket} from "phoenix_live_view"
          let liveSocket = new LiveSocket("/live", Socket, {...})
      `);
      }
      this.socket = new phxSocket(url, opts);
      this.bindingPrefix = opts.bindingPrefix || BINDING_PREFIX;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.prevActive = null;
      this.silenced = false;
      this.main = null;
      this.outgoingMainEl = null;
      this.clickStartedAtTarget = null;
      this.linkRef = 1;
      this.roots = {};
      this.href = window.location.href;
      this.pendingLink = null;
      this.currentLocation = clone(window.location);
      this.hooks = opts.hooks || {};
      this.uploaders = opts.uploaders || {};
      this.loaderTimeout = opts.loaderTimeout || LOADER_TIMEOUT;
      this.disconnectedTimeout = opts.disconnectedTimeout || DISCONNECTED_TIMEOUT;
      this.reloadWithJitterTimer = null;
      this.maxReloads = opts.maxReloads || MAX_RELOADS;
      this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
      this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
      this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.boundEventNames = /* @__PURE__ */ new Set();
      this.blockPhxChangeWhileComposing = opts.blockPhxChangeWhileComposing || false;
      this.serverCloseRef = null;
      this.domCallbacks = Object.assign({
        jsQuerySelectorAll: null,
        onPatchStart: closure2(),
        onPatchEnd: closure2(),
        onNodeAdded: closure2(),
        onBeforeElUpdated: closure2()
      }, opts.dom || {});
      this.transitions = new TransitionSet();
      this.currentHistoryPosition = parseInt(this.sessionStorage.getItem(PHX_LV_HISTORY_POSITION) || "0") || 0;
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
    }
    version() {
      return "1.2.7";
    }
    isProfileEnabled() {
      return this.sessionStorage.getItem(PHX_LV_PROFILE) === "true";
    }
    isDebugEnabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "true";
    }
    isDebugDisabled() {
      return this.sessionStorage.getItem(PHX_LV_DEBUG) === "false";
    }
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    disableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "false");
    }
    disableProfiling() {
      this.sessionStorage.removeItem(PHX_LV_PROFILE);
    }
    enableLatencySim(upperBoundMs) {
      this.enableDebug();
      console.log("latency simulator enabled for the duration of this browser session. Call disableLatencySim() to disable");
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs.toString());
    }
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    getLatencySim() {
      const str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    getSocket() {
      return this.socket;
    }
    connect() {
      if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
        this.enableDebug();
      }
      const doConnect = () => {
        this.resetReloadStatus();
        if (this.joinRootViews()) {
          this.bindTopLevelEvents();
          this.socket.connect();
        } else if (this.main) {
          this.socket.connect();
        } else {
          this.bindTopLevelEvents({ dead: true });
        }
        this.joinDeadView();
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    disconnect(callback) {
      this.reloadWithJitterTimer != null && clearTimeout(this.reloadWithJitterTimer);
      if (this.serverCloseRef) {
        this.socket.off([this.serverCloseRef]);
        this.serverCloseRef = null;
      }
      this.socket.disconnect(callback);
    }
    replaceTransport(transport) {
      this.reloadWithJitterTimer != null && clearTimeout(this.reloadWithJitterTimer);
      this.socket.replaceTransport(transport);
      this.connect();
    }
    execJS(el, encodedJS, eventType = null) {
      const e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
      this.owner(el, (view) => js_default.exec(e, eventType, encodedJS, view, el));
    }
    js() {
      return js_commands_default(this, "js");
    }
    unload() {
      if (this.unloaded) {
        return;
      }
      if (this.main && this.isConnected()) {
        this.log(this.main, "socket", () => ["disconnect for page nav"]);
      }
      this.unloaded = true;
      this.destroyAllViews();
      this.disconnect();
    }
    triggerDOM(kind, args) {
      this.domCallbacks[kind](...args);
    }
    time(name, func) {
      if (!this.isProfileEnabled() || !console.time) {
        return func();
      }
      console.time(name);
      const result = func();
      console.timeEnd(name);
      return result;
    }
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        const [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        const [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    requestDOMUpdate(callback) {
      this.transitions.after(callback);
    }
    asyncTransition(promise) {
      this.transitions.addAsyncTransition(promise);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.transitions.addTransition(time, onStart, onDone);
    }
    onChannel(channel, event, cb) {
      channel.on(event, (data) => {
        const latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          setTimeout(() => cb(data), latency);
        }
      });
    }
    reloadWithJitter(view, log) {
      this.reloadWithJitterTimer != null && clearTimeout(this.reloadWithJitterTimer);
      this.disconnect();
      const minMs = this.reloadJitterMin;
      const maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      const tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      if (tries >= this.maxReloads) {
        afterMs = this.failsafeJitter;
      }
      this.reloadWithJitterTimer = setTimeout(() => {
        if (view.isDestroyed() || view.isConnected()) {
          return;
        }
        view.destroy();
        log ? log() : this.log(view, "join", () => [
          `encountered ${tries} consecutive reloads`
        ]);
        if (tries >= this.maxReloads) {
          this.log(view, "join", () => [
            `exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`
          ]);
        }
        if (this.pendingLink !== null) {
          window.location.href = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    getHookDefinition(name) {
      if (!name) {
        return;
      }
      return this.maybeInternalHook(name) || this.hooks[name] || this.maybeRuntimeHook(name);
    }
    maybeInternalHook(name) {
      return name && name.startsWith("Phoenix.") && hooks_default[name.split(".")[1]];
    }
    maybeRuntimeHook(name) {
      const runtimeHook = document.querySelector(`script[${PHX_RUNTIME_HOOK}="${CSS.escape(name)}"]`);
      if (!runtimeHook) {
        return;
      }
      let callbacks = window[`phx_hook_${name}`];
      if (!callbacks || typeof callbacks !== "function") {
        logError("a runtime hook must be a function", runtimeHook);
        return;
      }
      const hookDefiniton = callbacks();
      if (hookDefiniton && (typeof hookDefiniton === "object" || typeof hookDefiniton === "function")) {
        return hookDefiniton;
      }
      logError("runtime hook must return an object with hook callbacks or an instance of ViewHook", runtimeHook);
    }
    isUnloaded() {
      return this.unloaded;
    }
    isConnected() {
      return this.socket.isConnected();
    }
    getBindingPrefix() {
      return this.bindingPrefix;
    }
    binding(kind) {
      return `${this.getBindingPrefix()}${kind}`;
    }
    channel(topic, params) {
      return this.socket.channel(topic, params);
    }
    joinDeadView() {
      const body = document.body;
      if (body && !this.isPhxView(body) && !this.isPhxView(document.firstElementChild)) {
        const view = this.newRootView(body);
        view.setHref(this.getHref());
        view.joinDead();
        if (!this.main) {
          this.main = view;
        }
        window.requestAnimationFrame(() => {
          var _a;
          view.execNewMounted();
          this.maybeScroll((_a = history.state) == null ? void 0 : _a.scroll);
        });
      }
    }
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          const view = this.newRootView(rootEl);
          if (!dom_default.isPhxSticky(rootEl)) {
            view.setHref(this.getHref());
          }
          view.join();
          if (rootEl.hasAttribute(PHX_MAIN)) {
            this.main = view;
          }
        }
        rootsFound = true;
      });
      return rootsFound;
    }
    redirect(to, flash, reloadToken) {
      if (reloadToken) {
        browser_default.setCookie(PHX_RELOAD_STATUS, reloadToken, 60);
      }
      this.unload();
      browser_default.redirect(to, flash);
    }
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      if (!this.main) {
        return;
      }
      const liveReferer = this.currentLocation.href;
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      const stickies = dom_default.findPhxSticky(document) || [];
      const removeEls = dom_default.all(this.outgoingMainEl, `[${this.binding("remove")}]`).filter((el) => !dom_default.isChildOfAny(el, stickies));
      const newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      const oldMainView = this.main;
      oldMainView.showLoader(this.loaderTimeout);
      oldMainView.destroy();
      this.main = this.newRootView(newMainEl, flash, liveReferer);
      this.main.setRedirect(href);
      this.transitionRemoves(removeEls, oldMainView);
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            removeEls.forEach((el) => el.remove());
            stickies.forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && callback(linkRef);
            onDone();
          });
        }
      });
    }
    transitionRemoves(elements, view, callback) {
      const removeAttr = this.binding("remove");
      const silenceEvents = (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      };
      elements.forEach((el) => {
        for (const event of this.boundEventNames) {
          el.addEventListener(event, silenceEvents, true);
        }
        const e = new CustomEvent("phx:exec", { detail: { sourceElement: el } });
        js_default.exec(e, "remove", el.getAttribute(removeAttr), view, el);
      });
      this.requestDOMUpdate(() => {
        elements.forEach((el) => {
          for (const event of this.boundEventNames) {
            el.removeEventListener(event, silenceEvents, true);
          }
        });
        callback && callback();
      });
    }
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    newRootView(el, flash, liveReferer) {
      const view = new View(el, this, null, flash, liveReferer);
      this.roots[view.id] = view;
      return view;
    }
    owner(childEl, callback) {
      let view;
      const viewEl = dom_default.closestViewEl(childEl);
      if (viewEl) {
        view = dom_default.private(viewEl, "view");
      } else {
        if (!childEl.isConnected) {
          return null;
        }
        view = this.main;
      }
      return view && callback ? callback(view) : view;
    }
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => callback(view, childEl));
    }
    getViewByEl(el) {
      const rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
    }
    getRootById(id) {
      return this.roots[id];
    }
    destroyAllViews() {
      for (const id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
      this.main = null;
    }
    destroyViewByEl(el) {
      const root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root && root.id === el.id) {
        root.destroy();
        delete this.roots[root.id];
      } else if (root) {
        root.destroyDescendent(el.id);
      }
    }
    getActiveElement() {
      return document.activeElement;
    }
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body && this.prevActive instanceof HTMLElement) {
        this.prevActive.focus();
      }
    }
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body && this.prevActive instanceof HTMLElement) {
        this.prevActive.blur();
      }
    }
    bindTopLevelEvents({ dead } = {}) {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.serverCloseRef = this.socket.onClose((event) => {
        if (event && event.code === 1e3 && this.main) {
          return this.reloadWithJitter(this.main);
        }
      });
      document.body.addEventListener("click", function() {
      });
      window.addEventListener("pageshow", (e) => {
        if (e.persisted) {
          this.getSocket().disconnect();
          this.withPageLoading({ to: window.location.href, kind: "redirect" });
          window.location.reload();
        }
      }, true);
      if (!dead) {
        this.bindNav();
      }
      this.bindClicks();
      if (!dead) {
        this.bindForms();
      }
      this.bind({ keyup: "keyup", keydown: "keydown" }, (e, type, view, targetEl, phxEvent, _phxTarget) => {
        const matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
        const pressedKey = e.key && e.key.toLowerCase();
        if (matchKey && matchKey.toLowerCase() !== pressedKey) {
          return;
        }
        const data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
        js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
      });
      this.bind({ blur: "focusout", focus: "focusin" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
        if (!phxTarget) {
          const data = __spreadValues({}, this.eventMeta(type, e, targetEl));
          js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.bind({ blur: "blur", focus: "focus" }, (e, type, view, targetEl, phxEvent, phxTarget) => {
        if (phxTarget === "window") {
          const data = this.eventMeta(type, e, targetEl);
          js_default.exec(e, type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.on("dragover", (e) => e.preventDefault());
      this.on("dragenter", (e) => {
        let target = e.target && dom_default.elementFromTarget(e.target);
        if (!target) {
          return;
        }
        const dropzone = closestPhxBinding(target, this.binding(PHX_DROP_TARGET));
        if (!dropzone || !(dropzone instanceof HTMLElement)) {
          return;
        }
        if (eventContainsFiles(e)) {
          this.js().addClass(dropzone, PHX_DROP_TARGET_ACTIVE_CLASS);
        }
      });
      this.on("dragleave", (e) => {
        let target = e.target && dom_default.elementFromTarget(e.target);
        if (!target) {
          return;
        }
        const dropzone = closestPhxBinding(target, this.binding(PHX_DROP_TARGET));
        if (!dropzone || !(dropzone instanceof HTMLElement)) {
          return;
        }
        const rect = dropzone.getBoundingClientRect();
        if (e.clientX <= rect.left || e.clientX >= rect.right || e.clientY <= rect.top || e.clientY >= rect.bottom) {
          this.js().removeClass(dropzone, PHX_DROP_TARGET_ACTIVE_CLASS);
        }
      });
      this.on("drop", (e) => {
        let target = e.target && dom_default.elementFromTarget(e.target);
        if (!target) {
          return;
        }
        e.preventDefault();
        const dropzone = closestPhxBinding(target, this.binding(PHX_DROP_TARGET));
        if (!dropzone || !(dropzone instanceof HTMLElement)) {
          return;
        }
        this.js().removeClass(dropzone, PHX_DROP_TARGET_ACTIVE_CLASS);
        if (!e.dataTransfer) {
          return;
        }
        const dropTargetId = dropzone.getAttribute(this.binding(PHX_DROP_TARGET));
        const dropTarget = dropTargetId && document.getElementById(dropTargetId);
        const files = Array.from(e.dataTransfer.files || []);
        if (!dropTarget || !(dropTarget instanceof HTMLInputElement) || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files, e.dataTransfer);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e) => {
        const uploadTarget = e.target && dom_default.elementFromTarget(e.target);
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        const files = Array.from(e.detail.files || []).filter((f) => f instanceof File || f instanceof Blob);
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    eventMeta(eventName, e, targetEl) {
      const callback = this.metadataCallbacks[eventName];
      return callback ? callback(e, targetEl) : {};
    }
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      this.resetReloadStatus();
      return this.linkRef;
    }
    resetReloadStatus() {
      browser_default.deleteCookie(PHX_RELOAD_STATUS);
    }
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      }
      if (this.pendingLink !== null) {
        this.href = this.pendingLink;
        this.pendingLink = null;
      }
      return true;
    }
    getHref() {
      return this.href;
    }
    hasPendingLink() {
      return !!this.pendingLink;
    }
    bind(events, callback) {
      for (const event in events) {
        const browserEventName = events[event];
        this.on(browserEventName, (e) => {
          const binding = this.binding(event);
          const windowBinding = this.binding(`window-${event}`);
          const targetPhxEvent = e.target instanceof Element && e.target.getAttribute(binding);
          if (!(e.target instanceof Element)) {
            return;
          }
          if (targetPhxEvent) {
            this.debounce(e.target, e, browserEventName, () => {
              this.withinOwners(e.target, (view) => {
                callback(e, event, view, e.target, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              const phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e, browserEventName, () => {
                this.withinOwners(el, (view) => {
                  callback(e, event, view, el, phxEvent, "window");
                });
              });
            });
          }
        });
      }
    }
    bindClicks() {
      this.on("mousedown", (e) => this.clickStartedAtTarget = e.target);
      this.bindClick();
    }
    bindClick() {
      const click = this.binding("click");
      window.addEventListener("click", (e) => {
        let target = e.target && dom_default.elementFromTarget(e.target);
        if (!target) {
          return;
        }
        if (e.detail === 0)
          this.clickStartedAtTarget = target;
        const clickStartedAtTarget = this.clickStartedAtTarget || target;
        target = closestPhxBinding(target, click);
        this.dispatchClickAway(e, clickStartedAtTarget);
        this.clickStartedAtTarget = null;
        if (!target) {
          return;
        }
        const phxEvent = target.getAttribute(click);
        if (!phxEvent) {
          if (dom_default.isNewPageClick(e, window.location)) {
            this.unload();
          }
          return;
        }
        if (target.getAttribute("href") === "#") {
          e.preventDefault();
        }
        if (target.hasAttribute(PHX_REF_SRC)) {
          return;
        }
        this.debounce(target, e, "click", () => {
          this.withinOwners(target, (view) => {
            js_default.exec(e, "click", phxEvent, view, target, [
              "push",
              { data: this.eventMeta("click", e, target) }
            ]);
          });
        });
      }, false);
    }
    dispatchClickAway(e, clickStartedAt) {
      const phxClickAway = this.binding("click-away");
      const portal = clickStartedAt.closest(`[${PHX_TELEPORTED_SRC}]`);
      const portalStartedAt = portal && dom_default.byId(portal.getAttribute(PHX_TELEPORTED_SRC));
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        let startedAt = clickStartedAt;
        if (portal && !portal.contains(el)) {
          startedAt = portalStartedAt;
        }
        if (!(el.isSameNode(startedAt) || el.contains(startedAt) || !js_default.isVisible(clickStartedAt))) {
          this.withinOwners(el, (view) => {
            const phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el) && js_default.isInViewport(el)) {
              js_default.exec(e, "click", phxEvent, view, el, [
                "push",
                { data: this.eventMeta("click", e, e.target) }
              ]);
            }
          });
        }
      });
    }
    bindNav() {
      if (!browser_default.canPushState()) {
        return;
      }
      if (history.scrollRestoration) {
        history.scrollRestoration = "manual";
      }
      let scrollTimer = null;
      window.addEventListener("scroll", (_e) => {
        scrollTimer != null && clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
        }, 100);
      });
      window.addEventListener("popstate", (event) => {
        if (!this.registerNewLocation(window.location)) {
          return;
        }
        const { type, backType, id, scroll, position } = event.state || {};
        const href = window.location.href;
        const isForward = position > this.currentHistoryPosition;
        const navType = isForward ? type : backType || type;
        this.currentHistoryPosition = position || 0;
        this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
        dom_default.dispatchEvent(window, "phx:navigate", {
          detail: {
            href,
            patch: navType === "patch",
            pop: true,
            direction: isForward ? "forward" : "backward"
          }
        });
        this.requestDOMUpdate(() => {
          const callback = () => {
            this.maybeScroll(scroll);
          };
          if (this.main && this.main.isConnected() && navType === "patch" && id === this.main.id) {
            this.main.pushLinkPatch(event, href, null, callback);
          } else {
            this.replaceMain(href, null, callback);
          }
        });
      }, false);
      window.addEventListener("click", (e) => {
        let el = e.target && dom_default.elementFromTarget(e.target);
        if (!el) {
          return;
        }
        const target = closestPhxBinding(el, PHX_LIVE_LINK);
        const type = target && target.getAttribute(PHX_LIVE_LINK);
        if (!type || !this.isConnected() || !this.main || dom_default.wantsNewTab(e)) {
          return;
        }
        const href = target.href instanceof SVGAnimatedString ? target.href.baseVal : target.href;
        const linkState = target.getAttribute(PHX_LINK_STATE);
        if (linkState !== "replace" && linkState !== "push") {
          throw new Error(`expected ${PHX_LINK_STATE} to be "replace" or "push", got: ${linkState}`);
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.pendingLink === href) {
          return;
        }
        this.requestDOMUpdate(() => {
          if (type === "patch") {
            this.pushHistoryPatch(e, href, linkState, target);
          } else if (type === "redirect") {
            this.historyRedirect(e, href, linkState, null, target);
          } else {
            throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
          }
          const phxClick = target.getAttribute(this.binding("click"));
          if (phxClick) {
            this.requestDOMUpdate(() => this.execJS(target, phxClick, "click"));
          }
        });
      }, false);
    }
    maybeScroll(scroll) {
      if (typeof scroll === "number") {
        requestAnimationFrame(() => {
          window.scrollTo(0, scroll);
        });
      }
    }
    dispatchEvent(event, payload = {}) {
      dom_default.dispatchEvent(window, `phx:${event}`, { detail: payload });
    }
    dispatchEvents(events) {
      events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
      const done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
      return callback ? callback(done) : done;
    }
    pushHistoryPatch(e, href, linkState, targetEl) {
      if (!this.isConnected() || !(this.main && this.main.isMain())) {
        return browser_default.redirect(href);
      }
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(e, href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      this.currentHistoryPosition++;
      this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
      browser_default.updateCurrentState((state) => __spreadProps(__spreadValues({}, state), { backType: "patch" }));
      browser_default.pushState(linkState, {
        type: "patch",
        id: this.main.id,
        position: this.currentHistoryPosition
      }, href);
      dom_default.dispatchEvent(window, "phx:navigate", {
        detail: { patch: true, href, pop: false, direction: "forward" }
      });
      this.registerNewLocation(window.location);
    }
    historyRedirect(e, href, linkState, flash, targetEl) {
      const clickLoading = targetEl && e.isTrusted && e.type !== "popstate";
      if (clickLoading) {
        targetEl.classList.add("phx-click-loading");
      }
      if (!this.isConnected() || !(this.main && this.main.isMain())) {
        return browser_default.redirect(href, flash);
      }
      if (/^\/$|^\/[^\/]+.*$/.test(href)) {
        const { protocol, host } = window.location;
        href = `${protocol}//${host}${href}`;
      }
      const scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, (linkRef) => {
          if (linkRef === this.linkRef) {
            this.currentHistoryPosition++;
            this.sessionStorage.setItem(PHX_LV_HISTORY_POSITION, this.currentHistoryPosition.toString());
            browser_default.updateCurrentState((state) => __spreadProps(__spreadValues({}, state), {
              backType: "redirect"
            }));
            browser_default.pushState(linkState, {
              type: "redirect",
              id: this.main.id,
              scroll,
              position: this.currentHistoryPosition
            }, href);
            dom_default.dispatchEvent(window, "phx:navigate", {
              detail: { href, patch: false, pop: false, direction: "forward" }
            });
            this.registerNewLocation(window.location);
          }
          if (clickLoading) {
            targetEl.classList.remove("phx-click-loading");
          }
          done();
        });
      });
    }
    registerNewLocation(newLocation) {
      const { pathname, search } = this.currentLocation;
      if (pathname + search === newLocation.pathname + newLocation.search) {
        return false;
      } else {
        this.currentLocation = clone(newLocation);
        return true;
      }
    }
    bindForms() {
      let iterations = 0;
      let externalFormSubmitted = false;
      this.on("submit", (e) => {
        if (!(e.target instanceof HTMLFormElement))
          return;
        const phxSubmit = e.target.getAttribute(this.binding("submit"));
        const phxChange = e.target.getAttribute(this.binding("change"));
        if (!externalFormSubmitted && phxChange && !phxSubmit) {
          externalFormSubmitted = true;
          e.preventDefault();
          this.withinOwners(e.target, (view) => {
            view.disableForm(e.target);
            window.requestAnimationFrame(() => {
              if (dom_default.isUnloadableFormSubmit(e)) {
                this.unload();
              }
              e.target.submit();
            });
          });
        }
      });
      this.on("submit", (e) => {
        if (!(e.target instanceof HTMLFormElement))
          return;
        const phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          if (dom_default.isUnloadableFormSubmit(e)) {
            this.unload();
          }
          return;
        }
        e.preventDefault();
        e.target.disabled = true;
        this.withinOwners(e.target, (view) => {
          js_default.exec(e, "submit", phxEvent, view, e.target, [
            "push",
            { submitter: e.submitter }
          ]);
        });
      });
      for (const type of ["change", "input"]) {
        this.on(type, (e) => {
          if (!dom_default.isFormAssociated(e.target)) {
            return;
          }
          if (e instanceof CustomEvent && e.target.form === void 0) {
            if (e.detail && e.detail.dispatcher) {
              throw new Error(`dispatching a custom ${type} event is only supported on input elements inside a form`);
            }
            return;
          }
          const input = e.target;
          const phxChange = this.binding("change");
          if (this.blockPhxChangeWhileComposing && e instanceof InputEvent && e.isComposing) {
            const key = `composition-listener-${type}`;
            if (!dom_default.private(input, key)) {
              dom_default.putPrivate(input, key, true);
              input.addEventListener("compositionend", () => {
                input.dispatchEvent(new Event(type, { bubbles: true }));
                dom_default.deletePrivate(input, key);
              }, { once: true });
            }
            return;
          }
          const inputEvent = input.getAttribute(phxChange);
          const formEvent = input.form && input.form.getAttribute(phxChange);
          const phxEvent = inputEvent || formEvent;
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          const dispatcher = inputEvent ? input : input.form;
          const currentIterations = iterations;
          iterations++;
          const { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type === "change" && lastType === "input") {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", {
            at: currentIterations,
            type
          });
          this.debounce(input, e, type, () => {
            this.withinOwners(dispatcher, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              js_default.exec(e, "change", phxEvent, view, input, [
                "push",
                { _target: input.name, dispatcher }
              ]);
            });
          });
        });
      }
      this.on("reset", (e) => {
        const form = e.target;
        dom_default.resetForm(form);
        const input = Array.from(form.elements).find((el) => "type" in el && el.type === "reset");
        if (input) {
          window.requestAnimationFrame(() => {
            input.dispatchEvent(new Event("input", { bubbles: true, cancelable: false }));
          });
        }
      });
    }
    debounce(el, event, eventType, callback) {
      if (eventType === "blur" || eventType === "focusout") {
        return callback();
      }
      const phxDebounce = this.binding(PHX_DEBOUNCE);
      const phxThrottle = this.binding(PHX_THROTTLE);
      const defaultDebounce = this.defaults.debounce.toString();
      const defaultThrottle = this.defaults.throttle.toString();
      this.withinOwners(el, (view) => {
        const asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
        dom_default.debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, asyncFilter, () => {
          callback();
        });
      });
    }
    silenceEvents(callback) {
      this.silenced = true;
      callback();
      this.silenced = false;
    }
    on(event, callback) {
      this.boundEventNames.add(event);
      window.addEventListener(event, (e) => {
        if (!this.silenced) {
          callback(e);
        }
      });
    }
    jsQuerySelectorAll(sourceEl, query, defaultQuery) {
      const all = this.domCallbacks.jsQuerySelectorAll;
      return all ? all(sourceEl, query, defaultQuery) : defaultQuery();
    }
  };
  var TransitionSet = class {
    constructor() {
      this.transitions = /* @__PURE__ */ new Set();
      this.promises = /* @__PURE__ */ new Set();
      this.pendingOps = [];
    }
    reset() {
      this.transitions.forEach((timer) => {
        clearTimeout(timer);
        this.transitions.delete(timer);
      });
      this.promises.clear();
      this.flushPendingOps();
    }
    after(callback) {
      if (this.size() === 0) {
        callback();
      } else {
        this.pushPendingOp(callback);
      }
    }
    addTransition(time, onStart, onDone) {
      onStart();
      const timer = setTimeout(() => {
        this.transitions.delete(timer);
        onDone();
        this.flushPendingOps();
      }, time);
      this.transitions.add(timer);
    }
    addAsyncTransition(promise) {
      this.promises.add(promise);
      promise.then(() => {
        this.promises.delete(promise);
        this.flushPendingOps();
      });
    }
    pushPendingOp(op) {
      this.pendingOps.push(op);
    }
    size() {
      return this.transitions.size + this.promises.size;
    }
    flushPendingOps() {
      if (this.size() > 0) {
        return;
      }
      const op = this.pendingOps.shift();
      if (op) {
        op();
        this.flushPendingOps();
      }
    }
  };

  // js/app.js
  var import_lodash = __toModule(require_lodash());

  // js/jscolor.js
  "use strict";
  if (!window.jscolor) {
    window.jscolor = function() {
      var jsc = {
        initialized: false,
        instances: [],
        triggerQueue: [],
        register: function() {
          document.addEventListener("DOMContentLoaded", jsc.init, false);
          document.addEventListener("mousedown", jsc.onDocumentMouseDown, false);
          document.addEventListener("keyup", jsc.onDocumentKeyUp, false);
          window.addEventListener("resize", jsc.onWindowResize, false);
        },
        init: function() {
          if (jsc.initialized) {
            return;
          }
          jsc.pub.install();
          jsc.initialized = true;
          while (jsc.triggerQueue.length) {
            var ev = jsc.triggerQueue.shift();
            jsc.triggerGlobal(ev);
          }
        },
        installBySelector: function(selector, rootNode) {
          rootNode = rootNode ? jsc.node(rootNode) : document;
          if (!rootNode) {
            throw new Error("Missing root node");
          }
          var elms = rootNode.querySelectorAll(selector);
          var matchClass = new RegExp("(^|\\s)(" + jsc.pub.lookupClass + ")(\\s*(\\{[^}]*\\})|\\s|$)", "i");
          for (var i = 0; i < elms.length; i += 1) {
            if (elms[i].jscolor && elms[i].jscolor instanceof jsc.pub) {
              continue;
            }
            if (elms[i].type !== void 0 && elms[i].type.toLowerCase() == "color" && jsc.isColorAttrSupported) {
              continue;
            }
            var dataOpts, m;
            if ((dataOpts = jsc.getDataAttr(elms[i], "jscolor")) !== null || elms[i].className && (m = elms[i].className.match(matchClass))) {
              var targetElm = elms[i];
              var optsStr = "";
              if (dataOpts !== null) {
                optsStr = dataOpts;
              } else if (m) {
                console.warn('Installation using class name is DEPRECATED. Use data-jscolor="" attribute instead.' + jsc.docsRef);
                if (m[4]) {
                  optsStr = m[4];
                }
              }
              var opts = null;
              if (optsStr.trim()) {
                try {
                  opts = jsc.parseOptionsStr(optsStr);
                } catch (e) {
                  console.warn(e + "\n" + optsStr);
                }
              }
              try {
                new jsc.pub(targetElm, opts);
              } catch (e) {
                console.warn(e);
              }
            }
          }
        },
        parseOptionsStr: function(str) {
          var opts = null;
          try {
            opts = JSON.parse(str);
          } catch (eParse) {
            if (!jsc.pub.looseJSON) {
              throw new Error("Could not parse jscolor options as JSON: " + eParse);
            } else {
              try {
                opts = new Function("var opts = (" + str + '); return typeof opts === "object" ? opts : {};')();
              } catch (eEval) {
                throw new Error("Could not evaluate jscolor options: " + eEval);
              }
            }
          }
          return opts;
        },
        getInstances: function() {
          var inst = [];
          for (var i = 0; i < jsc.instances.length; i += 1) {
            if (jsc.instances[i] && jsc.instances[i].targetElement) {
              inst.push(jsc.instances[i]);
            }
          }
          return inst;
        },
        createEl: function(tagName) {
          var el = document.createElement(tagName);
          jsc.setData(el, "gui", true);
          return el;
        },
        node: function(nodeOrSelector) {
          if (!nodeOrSelector) {
            return null;
          }
          if (typeof nodeOrSelector === "string") {
            var sel = nodeOrSelector;
            var el = null;
            try {
              el = document.querySelector(sel);
            } catch (e) {
              console.warn(e);
              return null;
            }
            if (!el) {
              console.warn("No element matches the selector: %s", sel);
            }
            return el;
          }
          if (jsc.isNode(nodeOrSelector)) {
            return nodeOrSelector;
          }
          console.warn("Invalid node of type %s: %s", typeof nodeOrSelector, nodeOrSelector);
          return null;
        },
        isNode: function(val) {
          if (typeof Node === "object") {
            return val instanceof Node;
          }
          return val && typeof val === "object" && typeof val.nodeType === "number" && typeof val.nodeName === "string";
        },
        nodeName: function(node) {
          if (node && node.nodeName) {
            return node.nodeName.toLowerCase();
          }
          return false;
        },
        removeChildren: function(node) {
          while (node.firstChild) {
            node.removeChild(node.firstChild);
          }
        },
        isTextInput: function(el) {
          return el && jsc.nodeName(el) === "input" && el.type.toLowerCase() === "text";
        },
        isButton: function(el) {
          if (!el) {
            return false;
          }
          var n = jsc.nodeName(el);
          return n === "button" || n === "input" && ["button", "submit", "reset"].indexOf(el.type.toLowerCase()) > -1;
        },
        isButtonEmpty: function(el) {
          switch (jsc.nodeName(el)) {
            case "input":
              return !el.value || el.value.trim() === "";
            case "button":
              return el.textContent.trim() === "";
          }
          return null;
        },
        isPassiveEventSupported: function() {
          var supported = false;
          try {
            var opts = Object.defineProperty({}, "passive", {
              get: function() {
                supported = true;
              }
            });
            window.addEventListener("testPassive", null, opts);
            window.removeEventListener("testPassive", null, opts);
          } catch (e) {
          }
          return supported;
        }(),
        isColorAttrSupported: function() {
          var elm = document.createElement("input");
          if (elm.setAttribute) {
            elm.setAttribute("type", "color");
            if (elm.type.toLowerCase() == "color") {
              return true;
            }
          }
          return false;
        }(),
        dataProp: "_data_jscolor",
        setData: function() {
          var obj = arguments[0];
          if (arguments.length === 3) {
            var data = obj.hasOwnProperty(jsc.dataProp) ? obj[jsc.dataProp] : obj[jsc.dataProp] = {};
            var prop = arguments[1];
            var value = arguments[2];
            data[prop] = value;
            return true;
          } else if (arguments.length === 2 && typeof arguments[1] === "object") {
            var data = obj.hasOwnProperty(jsc.dataProp) ? obj[jsc.dataProp] : obj[jsc.dataProp] = {};
            var map = arguments[1];
            for (var prop in map) {
              if (map.hasOwnProperty(prop)) {
                data[prop] = map[prop];
              }
            }
            return true;
          }
          throw new Error("Invalid arguments");
        },
        removeData: function() {
          var obj = arguments[0];
          if (!obj.hasOwnProperty(jsc.dataProp)) {
            return true;
          }
          for (var i = 1; i < arguments.length; i += 1) {
            var prop = arguments[i];
            delete obj[jsc.dataProp][prop];
          }
          return true;
        },
        getData: function(obj, prop, setDefault) {
          if (!obj.hasOwnProperty(jsc.dataProp)) {
            if (setDefault !== void 0) {
              obj[jsc.dataProp] = {};
            } else {
              return void 0;
            }
          }
          var data = obj[jsc.dataProp];
          if (!data.hasOwnProperty(prop) && setDefault !== void 0) {
            data[prop] = setDefault;
          }
          return data[prop];
        },
        getDataAttr: function(el, name) {
          var attrName = "data-" + name;
          var attrValue = el.getAttribute(attrName);
          return attrValue;
        },
        _attachedGroupEvents: {},
        attachGroupEvent: function(groupName, el, evnt, func) {
          if (!jsc._attachedGroupEvents.hasOwnProperty(groupName)) {
            jsc._attachedGroupEvents[groupName] = [];
          }
          jsc._attachedGroupEvents[groupName].push([el, evnt, func]);
          el.addEventListener(evnt, func, false);
        },
        detachGroupEvents: function(groupName) {
          if (jsc._attachedGroupEvents.hasOwnProperty(groupName)) {
            for (var i = 0; i < jsc._attachedGroupEvents[groupName].length; i += 1) {
              var evt = jsc._attachedGroupEvents[groupName][i];
              evt[0].removeEventListener(evt[1], evt[2], false);
            }
            delete jsc._attachedGroupEvents[groupName];
          }
        },
        preventDefault: function(e) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          e.returnValue = false;
        },
        captureTarget: function(target) {
          if (target.setCapture) {
            jsc._capturedTarget = target;
            jsc._capturedTarget.setCapture();
          }
        },
        releaseTarget: function() {
          if (jsc._capturedTarget) {
            jsc._capturedTarget.releaseCapture();
            jsc._capturedTarget = null;
          }
        },
        triggerEvent: function(el, eventName, bubbles, cancelable) {
          if (!el) {
            return;
          }
          var ev = null;
          if (typeof Event === "function") {
            ev = new Event(eventName, {
              bubbles,
              cancelable
            });
          } else {
            ev = document.createEvent("Event");
            ev.initEvent(eventName, bubbles, cancelable);
          }
          if (!ev) {
            return false;
          }
          jsc.setData(ev, "internal", true);
          el.dispatchEvent(ev);
          return true;
        },
        triggerInputEvent: function(el, eventName, bubbles, cancelable) {
          if (!el) {
            return;
          }
          if (jsc.isTextInput(el)) {
            jsc.triggerEvent(el, eventName, bubbles, cancelable);
          }
        },
        eventKey: function(ev) {
          var keys = {
            9: "Tab",
            13: "Enter",
            27: "Escape"
          };
          if (typeof ev.code === "string") {
            return ev.code;
          } else if (ev.keyCode !== void 0 && keys.hasOwnProperty(ev.keyCode)) {
            return keys[ev.keyCode];
          }
          return null;
        },
        strList: function(str) {
          if (!str) {
            return [];
          }
          return str.replace(/^\s+|\s+$/g, "").split(/\s+/);
        },
        hasClass: function(elm, className) {
          if (!className) {
            return false;
          }
          if (elm.classList !== void 0) {
            return elm.classList.contains(className);
          }
          return (" " + elm.className.replace(/\s+/g, " ") + " ").indexOf(" " + className + " ") != -1;
        },
        addClass: function(elm, className) {
          var classNames = jsc.strList(className);
          if (elm.classList !== void 0) {
            for (var i = 0; i < classNames.length; i += 1) {
              elm.classList.add(classNames[i]);
            }
            return;
          }
          for (var i = 0; i < classNames.length; i += 1) {
            if (!jsc.hasClass(elm, classNames[i])) {
              elm.className += (elm.className ? " " : "") + classNames[i];
            }
          }
        },
        removeClass: function(elm, className) {
          var classNames = jsc.strList(className);
          if (elm.classList !== void 0) {
            for (var i = 0; i < classNames.length; i += 1) {
              elm.classList.remove(classNames[i]);
            }
            return;
          }
          for (var i = 0; i < classNames.length; i += 1) {
            var repl = new RegExp("^\\s*" + classNames[i] + "\\s*|\\s*" + classNames[i] + "\\s*$|\\s+" + classNames[i] + "(\\s+)", "g");
            elm.className = elm.className.replace(repl, "$1");
          }
        },
        getCompStyle: function(elm) {
          var compStyle = window.getComputedStyle ? window.getComputedStyle(elm) : elm.currentStyle;
          if (!compStyle) {
            return {};
          }
          return compStyle;
        },
        setStyle: function(elm, styles, important, reversible) {
          var priority = important ? "important" : "";
          var origStyle = null;
          for (var prop in styles) {
            if (styles.hasOwnProperty(prop)) {
              var setVal = null;
              if (styles[prop] === null) {
                if (!origStyle) {
                  origStyle = jsc.getData(elm, "origStyle");
                }
                if (origStyle && origStyle.hasOwnProperty(prop)) {
                  setVal = origStyle[prop];
                }
              } else {
                if (reversible) {
                  if (!origStyle) {
                    origStyle = jsc.getData(elm, "origStyle", {});
                  }
                  if (!origStyle.hasOwnProperty(prop)) {
                    origStyle[prop] = elm.style[prop];
                  }
                }
                setVal = styles[prop];
              }
              if (setVal !== null) {
                elm.style.setProperty(prop, setVal, priority);
              }
            }
          }
        },
        linearGradient: function() {
          function getFuncName() {
            var stdName = "linear-gradient";
            var prefixes = ["", "-webkit-", "-moz-", "-o-", "-ms-"];
            var helper = document.createElement("div");
            for (var i = 0; i < prefixes.length; i += 1) {
              var tryFunc = prefixes[i] + stdName;
              var tryVal = tryFunc + "(to right, rgba(0,0,0,0), rgba(0,0,0,0))";
              helper.style.background = tryVal;
              if (helper.style.background) {
                return tryFunc;
              }
            }
            return stdName;
          }
          var funcName = getFuncName();
          return function() {
            return funcName + "(" + Array.prototype.join.call(arguments, ", ") + ")";
          };
        }(),
        setBorderRadius: function(elm, value) {
          jsc.setStyle(elm, { "border-radius": value || "0" });
        },
        setBoxShadow: function(elm, value) {
          jsc.setStyle(elm, { "box-shadow": value || "none" });
        },
        getElementPos: function(e, relativeToViewport) {
          var x = 0, y = 0;
          var rect = e.getBoundingClientRect();
          x = rect.left;
          y = rect.top;
          if (!relativeToViewport) {
            var viewPos = jsc.getViewPos();
            x += viewPos[0];
            y += viewPos[1];
          }
          return [x, y];
        },
        getElementSize: function(e) {
          return [e.offsetWidth, e.offsetHeight];
        },
        getAbsPointerPos: function(e) {
          var x = 0, y = 0;
          if (typeof e.changedTouches !== "undefined" && e.changedTouches.length) {
            x = e.changedTouches[0].clientX;
            y = e.changedTouches[0].clientY;
          } else if (typeof e.clientX === "number") {
            x = e.clientX;
            y = e.clientY;
          }
          return { x, y };
        },
        getRelPointerPos: function(e) {
          var target = e.target || e.srcElement;
          var targetRect = target.getBoundingClientRect();
          var x = 0, y = 0;
          var clientX = 0, clientY = 0;
          if (typeof e.changedTouches !== "undefined" && e.changedTouches.length) {
            clientX = e.changedTouches[0].clientX;
            clientY = e.changedTouches[0].clientY;
          } else if (typeof e.clientX === "number") {
            clientX = e.clientX;
            clientY = e.clientY;
          }
          x = clientX - targetRect.left;
          y = clientY - targetRect.top;
          return { x, y };
        },
        getViewPos: function() {
          var doc2 = document.documentElement;
          return [
            (window.pageXOffset || doc2.scrollLeft) - (doc2.clientLeft || 0),
            (window.pageYOffset || doc2.scrollTop) - (doc2.clientTop || 0)
          ];
        },
        getViewSize: function() {
          var doc2 = document.documentElement;
          return [
            window.innerWidth || doc2.clientWidth,
            window.innerHeight || doc2.clientHeight
          ];
        },
        RGB_HSV: function(r, g, b) {
          r /= 255;
          g /= 255;
          b /= 255;
          var n = Math.min(Math.min(r, g), b);
          var v = Math.max(Math.max(r, g), b);
          var m = v - n;
          if (m === 0) {
            return [null, 0, 100 * v];
          }
          var h = r === n ? 3 + (b - g) / m : g === n ? 5 + (r - b) / m : 1 + (g - r) / m;
          return [
            60 * (h === 6 ? 0 : h),
            100 * (m / v),
            100 * v
          ];
        },
        HSV_RGB: function(h, s, v) {
          var u = 255 * (v / 100);
          if (h === null) {
            return [u, u, u];
          }
          h /= 60;
          s /= 100;
          var i = Math.floor(h);
          var f = i % 2 ? h - i : 1 - (h - i);
          var m = u * (1 - s);
          var n = u * (1 - s * f);
          switch (i) {
            case 6:
            case 0:
              return [u, n, m];
            case 1:
              return [n, u, m];
            case 2:
              return [m, u, n];
            case 3:
              return [m, n, u];
            case 4:
              return [n, m, u];
            case 5:
              return [u, m, n];
          }
        },
        parseColorString: function(str) {
          var ret = {
            rgba: null,
            format: null
          };
          var m;
          if (m = str.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i)) {
            ret.format = "hex";
            if (m[1].length === 6) {
              ret.rgba = [
                parseInt(m[1].substr(0, 2), 16),
                parseInt(m[1].substr(2, 2), 16),
                parseInt(m[1].substr(4, 2), 16),
                null
              ];
            } else {
              ret.rgba = [
                parseInt(m[1].charAt(0) + m[1].charAt(0), 16),
                parseInt(m[1].charAt(1) + m[1].charAt(1), 16),
                parseInt(m[1].charAt(2) + m[1].charAt(2), 16),
                null
              ];
            }
            return ret;
          } else if (m = str.match(/^\W*rgba?\(([^)]*)\)\W*$/i)) {
            var params = m[1].split(",");
            var re = /^\s*(\d+|\d*\.\d+|\d+\.\d*)\s*$/;
            var mR, mG, mB, mA;
            if (params.length >= 3 && (mR = params[0].match(re)) && (mG = params[1].match(re)) && (mB = params[2].match(re))) {
              ret.format = "rgb";
              ret.rgba = [
                parseFloat(mR[1]) || 0,
                parseFloat(mG[1]) || 0,
                parseFloat(mB[1]) || 0,
                null
              ];
              if (params.length >= 4 && (mA = params[3].match(re))) {
                ret.format = "rgba";
                ret.rgba[3] = parseFloat(mA[1]) || 0;
              }
              return ret;
            }
          }
          return false;
        },
        scaleCanvasForHighDPR: function(canvas) {
          var dpr = window.devicePixelRatio || 1;
          canvas.width *= dpr;
          canvas.height *= dpr;
          var ctx = canvas.getContext("2d");
          ctx.scale(dpr, dpr);
        },
        genColorPreviewCanvas: function(color, separatorPos, specWidth, scaleForHighDPR) {
          var sepW = Math.round(jsc.pub.previewSeparator.length);
          var sqSize = jsc.pub.chessboardSize;
          var sqColor1 = jsc.pub.chessboardColor1;
          var sqColor2 = jsc.pub.chessboardColor2;
          var cWidth = specWidth ? specWidth : sqSize * 2;
          var cHeight = sqSize * 2;
          var canvas = jsc.createEl("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = cWidth;
          canvas.height = cHeight;
          if (scaleForHighDPR) {
            jsc.scaleCanvasForHighDPR(canvas);
          }
          ctx.fillStyle = sqColor1;
          ctx.fillRect(0, 0, cWidth, cHeight);
          ctx.fillStyle = sqColor2;
          for (var x = 0; x < cWidth; x += sqSize * 2) {
            ctx.fillRect(x, 0, sqSize, sqSize);
            ctx.fillRect(x + sqSize, sqSize, sqSize, sqSize);
          }
          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, cWidth, cHeight);
          }
          var start = null;
          switch (separatorPos) {
            case "left":
              start = 0;
              ctx.clearRect(0, 0, sepW / 2, cHeight);
              break;
            case "right":
              start = cWidth - sepW;
              ctx.clearRect(cWidth - sepW / 2, 0, sepW / 2, cHeight);
              break;
          }
          if (start !== null) {
            ctx.lineWidth = 1;
            for (var i = 0; i < jsc.pub.previewSeparator.length; i += 1) {
              ctx.beginPath();
              ctx.strokeStyle = jsc.pub.previewSeparator[i];
              ctx.moveTo(0.5 + start + i, 0);
              ctx.lineTo(0.5 + start + i, cHeight);
              ctx.stroke();
            }
          }
          return {
            canvas,
            width: cWidth,
            height: cHeight
          };
        },
        genColorPreviewGradient: function(color, position, width) {
          var params = [];
          if (position && width) {
            params = [
              "to " + { "left": "right", "right": "left" }[position],
              color + " 0%",
              color + " " + width + "px",
              "rgba(0,0,0,0) " + (width + 1) + "px",
              "rgba(0,0,0,0) 100%"
            ];
          } else {
            params = [
              "to right",
              color + " 0%",
              color + " 100%"
            ];
          }
          return jsc.linearGradient.apply(this, params);
        },
        redrawPosition: function() {
          if (jsc.picker && jsc.picker.owner) {
            var thisObj = jsc.picker.owner;
            var tp, vp;
            if (thisObj.fixed) {
              tp = jsc.getElementPos(thisObj.targetElement, true);
              vp = [0, 0];
            } else {
              tp = jsc.getElementPos(thisObj.targetElement);
              vp = jsc.getViewPos();
            }
            var ts = jsc.getElementSize(thisObj.targetElement);
            var vs = jsc.getViewSize();
            var ps = jsc.getPickerOuterDims(thisObj);
            var a, b, c;
            switch (thisObj.position.toLowerCase()) {
              case "left":
                a = 1;
                b = 0;
                c = -1;
                break;
              case "right":
                a = 1;
                b = 0;
                c = 1;
                break;
              case "top":
                a = 0;
                b = 1;
                c = -1;
                break;
              default:
                a = 0;
                b = 1;
                c = 1;
                break;
            }
            var l = (ts[b] + ps[b]) / 2;
            if (!thisObj.smartPosition) {
              var pp = [
                tp[a],
                tp[b] + ts[b] - l + l * c
              ];
            } else {
              var pp = [
                -vp[a] + tp[a] + ps[a] > vs[a] ? -vp[a] + tp[a] + ts[a] / 2 > vs[a] / 2 && tp[a] + ts[a] - ps[a] >= 0 ? tp[a] + ts[a] - ps[a] : tp[a] : tp[a],
                -vp[b] + tp[b] + ts[b] + ps[b] - l + l * c > vs[b] ? -vp[b] + tp[b] + ts[b] / 2 > vs[b] / 2 && tp[b] + ts[b] - l - l * c >= 0 ? tp[b] + ts[b] - l - l * c : tp[b] + ts[b] - l + l * c : tp[b] + ts[b] - l + l * c >= 0 ? tp[b] + ts[b] - l + l * c : tp[b] + ts[b] - l - l * c
              ];
            }
            var x = pp[a];
            var y = pp[b];
            var positionValue = thisObj.fixed ? "fixed" : "absolute";
            var contractShadow = (pp[0] + ps[0] > tp[0] || pp[0] < tp[0] + ts[0]) && pp[1] + ps[1] < tp[1] + ts[1];
            jsc._drawPosition(thisObj, x, y, positionValue, contractShadow);
          }
        },
        _drawPosition: function(thisObj, x, y, positionValue, contractShadow) {
          var vShadow = contractShadow ? 0 : thisObj.shadowBlur;
          jsc.picker.wrap.style.position = positionValue;
          jsc.picker.wrap.style.left = x + "px";
          jsc.picker.wrap.style.top = y + "px";
          jsc.setBoxShadow(jsc.picker.boxS, thisObj.shadow ? new jsc.BoxShadow(0, vShadow, thisObj.shadowBlur, 0, thisObj.shadowColor) : null);
        },
        getPickerDims: function(thisObj) {
          var dims = [
            2 * thisObj.controlBorderWidth + 2 * thisObj.padding + thisObj.width,
            2 * thisObj.controlBorderWidth + 2 * thisObj.padding + thisObj.height
          ];
          var sliderSpace = 2 * thisObj.controlBorderWidth + 2 * jsc.getControlPadding(thisObj) + thisObj.sliderSize;
          if (jsc.getSliderChannel(thisObj)) {
            dims[0] += sliderSpace;
          }
          if (thisObj.hasAlphaChannel()) {
            dims[0] += sliderSpace;
          }
          if (thisObj.closeButton) {
            dims[1] += 2 * thisObj.controlBorderWidth + thisObj.padding + thisObj.buttonHeight;
          }
          return dims;
        },
        getPickerOuterDims: function(thisObj) {
          var dims = jsc.getPickerDims(thisObj);
          return [
            dims[0] + 2 * thisObj.borderWidth,
            dims[1] + 2 * thisObj.borderWidth
          ];
        },
        getControlPadding: function(thisObj) {
          return Math.max(thisObj.padding / 2, 2 * thisObj.pointerBorderWidth + thisObj.pointerThickness - thisObj.controlBorderWidth);
        },
        getPadYChannel: function(thisObj) {
          switch (thisObj.mode.charAt(1).toLowerCase()) {
            case "v":
              return "v";
              break;
          }
          return "s";
        },
        getSliderChannel: function(thisObj) {
          if (thisObj.mode.length > 2) {
            switch (thisObj.mode.charAt(2).toLowerCase()) {
              case "s":
                return "s";
                break;
              case "v":
                return "v";
                break;
            }
          }
          return null;
        },
        onDocumentMouseDown: function(e) {
          var target = e.target || e.srcElement;
          if (target.jscolor && target.jscolor instanceof jsc.pub) {
            if (target.jscolor.showOnClick && !target.disabled) {
              target.jscolor.show();
            }
          } else if (jsc.getData(target, "gui")) {
            var control = jsc.getData(target, "control");
            if (control) {
              jsc.onControlPointerStart(e, target, jsc.getData(target, "control"), "mouse");
            }
          } else {
            if (jsc.picker && jsc.picker.owner) {
              jsc.picker.owner.tryHide();
            }
          }
        },
        onDocumentKeyUp: function(e) {
          if (["Tab", "Escape"].indexOf(jsc.eventKey(e)) !== -1) {
            if (jsc.picker && jsc.picker.owner) {
              jsc.picker.owner.tryHide();
            }
          }
        },
        onWindowResize: function(e) {
          jsc.redrawPosition();
        },
        onParentScroll: function(e) {
          if (jsc.picker && jsc.picker.owner) {
            jsc.picker.owner.tryHide();
          }
        },
        onPickerTouchStart: function(e) {
          var target = e.target || e.srcElement;
          if (jsc.getData(target, "control")) {
            jsc.onControlPointerStart(e, target, jsc.getData(target, "control"), "touch");
          }
        },
        triggerCallback: function(thisObj, prop) {
          if (!thisObj[prop]) {
            return;
          }
          var callback = null;
          if (typeof thisObj[prop] === "string") {
            try {
              callback = new Function(thisObj[prop]);
            } catch (e) {
              console.error(e);
            }
          } else {
            callback = thisObj[prop];
          }
          if (callback) {
            callback.call(thisObj);
          }
        },
        triggerGlobal: function(eventNames) {
          var inst = jsc.getInstances();
          for (var i = 0; i < inst.length; i += 1) {
            inst[i].trigger(eventNames);
          }
        },
        _pointerMoveEvent: {
          mouse: "mousemove",
          touch: "touchmove"
        },
        _pointerEndEvent: {
          mouse: "mouseup",
          touch: "touchend"
        },
        _pointerOrigin: null,
        _capturedTarget: null,
        onControlPointerStart: function(e, target, controlName, pointerType) {
          var thisObj = jsc.getData(target, "instance");
          jsc.preventDefault(e);
          jsc.captureTarget(target);
          var registerDragEvents = function(doc2, offset) {
            jsc.attachGroupEvent("drag", doc2, jsc._pointerMoveEvent[pointerType], jsc.onDocumentPointerMove(e, target, controlName, pointerType, offset));
            jsc.attachGroupEvent("drag", doc2, jsc._pointerEndEvent[pointerType], jsc.onDocumentPointerEnd(e, target, controlName, pointerType));
          };
          registerDragEvents(document, [0, 0]);
          if (window.parent && window.frameElement) {
            var rect = window.frameElement.getBoundingClientRect();
            var ofs = [-rect.left, -rect.top];
            registerDragEvents(window.parent.window.document, ofs);
          }
          var abs = jsc.getAbsPointerPos(e);
          var rel = jsc.getRelPointerPos(e);
          jsc._pointerOrigin = {
            x: abs.x - rel.x,
            y: abs.y - rel.y
          };
          switch (controlName) {
            case "pad":
              if (jsc.getSliderChannel(thisObj) === "v" && thisObj.channels.v === 0) {
                thisObj.fromHSVA(null, null, 100, null);
              }
              jsc.setPad(thisObj, e, 0, 0);
              break;
            case "sld":
              jsc.setSld(thisObj, e, 0);
              break;
            case "asld":
              jsc.setASld(thisObj, e, 0);
              break;
          }
          thisObj.trigger("input");
        },
        onDocumentPointerMove: function(e, target, controlName, pointerType, offset) {
          return function(e2) {
            var thisObj = jsc.getData(target, "instance");
            switch (controlName) {
              case "pad":
                jsc.setPad(thisObj, e2, offset[0], offset[1]);
                break;
              case "sld":
                jsc.setSld(thisObj, e2, offset[1]);
                break;
              case "asld":
                jsc.setASld(thisObj, e2, offset[1]);
                break;
            }
            thisObj.trigger("input");
          };
        },
        onDocumentPointerEnd: function(e, target, controlName, pointerType) {
          return function(e2) {
            var thisObj = jsc.getData(target, "instance");
            jsc.detachGroupEvents("drag");
            jsc.releaseTarget();
            thisObj.trigger("input");
            thisObj.trigger("change");
          };
        },
        setPad: function(thisObj, e, ofsX, ofsY) {
          var pointerAbs = jsc.getAbsPointerPos(e);
          var x = ofsX + pointerAbs.x - jsc._pointerOrigin.x - thisObj.padding - thisObj.controlBorderWidth;
          var y = ofsY + pointerAbs.y - jsc._pointerOrigin.y - thisObj.padding - thisObj.controlBorderWidth;
          var xVal = x * (360 / (thisObj.width - 1));
          var yVal = 100 - y * (100 / (thisObj.height - 1));
          switch (jsc.getPadYChannel(thisObj)) {
            case "s":
              thisObj.fromHSVA(xVal, yVal, null, null);
              break;
            case "v":
              thisObj.fromHSVA(xVal, null, yVal, null);
              break;
          }
        },
        setSld: function(thisObj, e, ofsY) {
          var pointerAbs = jsc.getAbsPointerPos(e);
          var y = ofsY + pointerAbs.y - jsc._pointerOrigin.y - thisObj.padding - thisObj.controlBorderWidth;
          var yVal = 100 - y * (100 / (thisObj.height - 1));
          switch (jsc.getSliderChannel(thisObj)) {
            case "s":
              thisObj.fromHSVA(null, yVal, null, null);
              break;
            case "v":
              thisObj.fromHSVA(null, null, yVal, null);
              break;
          }
        },
        setASld: function(thisObj, e, ofsY) {
          var pointerAbs = jsc.getAbsPointerPos(e);
          var y = ofsY + pointerAbs.y - jsc._pointerOrigin.y - thisObj.padding - thisObj.controlBorderWidth;
          var yVal = 1 - y * (1 / (thisObj.height - 1));
          if (yVal < 1) {
            if (thisObj.format.toLowerCase() === "any" && thisObj.getFormat() !== "rgba") {
              thisObj._currentFormat = "rgba";
            }
          }
          thisObj.fromHSVA(null, null, null, yVal);
        },
        createPalette: function() {
          var paletteObj = {
            elm: null,
            draw: null
          };
          var canvas = jsc.createEl("canvas");
          var ctx = canvas.getContext("2d");
          var drawFunc = function(width, height, type) {
            canvas.width = width;
            canvas.height = height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var hGrad = ctx.createLinearGradient(0, 0, canvas.width, 0);
            hGrad.addColorStop(0 / 6, "#F00");
            hGrad.addColorStop(1 / 6, "#FF0");
            hGrad.addColorStop(2 / 6, "#0F0");
            hGrad.addColorStop(3 / 6, "#0FF");
            hGrad.addColorStop(4 / 6, "#00F");
            hGrad.addColorStop(5 / 6, "#F0F");
            hGrad.addColorStop(6 / 6, "#F00");
            ctx.fillStyle = hGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            var vGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            switch (type.toLowerCase()) {
              case "s":
                vGrad.addColorStop(0, "rgba(255,255,255,0)");
                vGrad.addColorStop(1, "rgba(255,255,255,1)");
                break;
              case "v":
                vGrad.addColorStop(0, "rgba(0,0,0,0)");
                vGrad.addColorStop(1, "rgba(0,0,0,1)");
                break;
            }
            ctx.fillStyle = vGrad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          };
          paletteObj.elm = canvas;
          paletteObj.draw = drawFunc;
          return paletteObj;
        },
        createSliderGradient: function() {
          var sliderObj = {
            elm: null,
            draw: null
          };
          var canvas = jsc.createEl("canvas");
          var ctx = canvas.getContext("2d");
          var drawFunc = function(width, height, color1, color2) {
            canvas.width = width;
            canvas.height = height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            grad.addColorStop(0, color1);
            grad.addColorStop(1, color2);
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          };
          sliderObj.elm = canvas;
          sliderObj.draw = drawFunc;
          return sliderObj;
        },
        createASliderGradient: function() {
          var sliderObj = {
            elm: null,
            draw: null
          };
          var canvas = jsc.createEl("canvas");
          var ctx = canvas.getContext("2d");
          var drawFunc = function(width, height, color) {
            canvas.width = width;
            canvas.height = height;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var sqSize = canvas.width / 2;
            var sqColor1 = jsc.pub.chessboardColor1;
            var sqColor2 = jsc.pub.chessboardColor2;
            ctx.fillStyle = sqColor1;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (var y = 0; y < canvas.height; y += sqSize * 2) {
              ctx.fillStyle = sqColor2;
              ctx.fillRect(0, y, sqSize, sqSize);
              ctx.fillRect(sqSize, y + sqSize, sqSize, sqSize);
            }
            var grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
            grad.addColorStop(0, color);
            grad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          };
          sliderObj.elm = canvas;
          sliderObj.draw = drawFunc;
          return sliderObj;
        },
        BoxShadow: function() {
          var BoxShadow = function(hShadow, vShadow, blur, spread, color, inset) {
            this.hShadow = hShadow;
            this.vShadow = vShadow;
            this.blur = blur;
            this.spread = spread;
            this.color = color;
            this.inset = !!inset;
          };
          BoxShadow.prototype.toString = function() {
            var vals = [
              Math.round(this.hShadow) + "px",
              Math.round(this.vShadow) + "px",
              Math.round(this.blur) + "px",
              Math.round(this.spread) + "px",
              this.color
            ];
            if (this.inset) {
              vals.push("inset");
            }
            return vals.join(" ");
          };
          return BoxShadow;
        }(),
        flags: {
          leaveValue: 1 << 0,
          leaveAlpha: 1 << 1,
          leavePreview: 1 << 2
        },
        enumOpts: {
          format: ["auto", "any", "hex", "rgb", "rgba"],
          previewPosition: ["left", "right"],
          mode: ["hsv", "hvs", "hs", "hv"],
          position: ["left", "right", "top", "bottom"],
          alphaChannel: ["auto", true, false]
        },
        deprecatedOpts: {
          "styleElement": "previewElement",
          "onFineChange": "onInput",
          "overwriteImportant": "forceStyle",
          "closable": "closeButton",
          "insetWidth": "controlBorderWidth",
          "insetColor": "controlBorderColor",
          "refine": null
        },
        docsRef: " See https://jscolor.com/docs/",
        pub: function(targetElement, opts) {
          var THIS = this;
          if (!opts) {
            opts = {};
          }
          this.channels = {
            r: 255,
            g: 255,
            b: 255,
            h: 0,
            s: 0,
            v: 100,
            a: 1
          };
          this.format = "auto";
          this.value = void 0;
          this.alpha = void 0;
          this.onChange = void 0;
          this.onInput = void 0;
          this.valueElement = void 0;
          this.alphaElement = void 0;
          this.previewElement = void 0;
          this.previewPosition = "left";
          this.previewSize = 32;
          this.previewPadding = 8;
          this.required = true;
          this.hash = true;
          this.uppercase = true;
          this.forceStyle = true;
          this.width = 181;
          this.height = 101;
          this.mode = "HSV";
          this.alphaChannel = "auto";
          this.position = "bottom";
          this.smartPosition = true;
          this.showOnClick = true;
          this.hideOnLeave = true;
          this.sliderSize = 16;
          this.crossSize = 8;
          this.closeButton = false;
          this.closeText = "Close";
          this.buttonColor = "rgba(0,0,0,1)";
          this.buttonHeight = 18;
          this.padding = 12;
          this.backgroundColor = "rgba(255,255,255,1)";
          this.borderWidth = 1;
          this.borderColor = "rgba(187,187,187,1)";
          this.borderRadius = 8;
          this.controlBorderWidth = 1;
          this.controlBorderColor = "rgba(187,187,187,1)";
          this.shadow = true;
          this.shadowBlur = 15;
          this.shadowColor = "rgba(0,0,0,0.2)";
          this.pointerColor = "rgba(76,76,76,1)";
          this.pointerBorderWidth = 1;
          this.pointerBorderColor = "rgba(255,255,255,1)";
          this.pointerThickness = 2;
          this.zIndex = 5e3;
          this.container = void 0;
          this.minS = 0;
          this.maxS = 100;
          this.minV = 0;
          this.maxV = 100;
          this.minA = 0;
          this.maxA = 1;
          if (jsc.pub.options) {
            for (var opt in jsc.pub.options) {
              if (jsc.pub.options.hasOwnProperty(opt)) {
                try {
                  setOption(opt, jsc.pub.options[opt]);
                } catch (e) {
                  console.warn(e);
                }
              }
            }
          }
          var presetsArr = [];
          if (opts.preset) {
            if (typeof opts.preset === "string") {
              presetsArr = opts.preset.split(/\s+/);
            } else if (Array.isArray(opts.preset)) {
              presetsArr = opts.preset.slice();
            } else {
              console.warn("Unrecognized preset value");
            }
          }
          if (presetsArr.indexOf("default") === -1) {
            presetsArr.push("default");
          }
          for (var i = presetsArr.length - 1; i >= 0; i -= 1) {
            var pres = presetsArr[i];
            if (!pres) {
              continue;
            }
            if (!jsc.pub.presets.hasOwnProperty(pres)) {
              console.warn("Unknown preset: %s", pres);
              continue;
            }
            for (var opt in jsc.pub.presets[pres]) {
              if (jsc.pub.presets[pres].hasOwnProperty(opt)) {
                try {
                  setOption(opt, jsc.pub.presets[pres][opt]);
                } catch (e) {
                  console.warn(e);
                }
              }
            }
          }
          var nonProperties = [
            "preset"
          ];
          for (var opt in opts) {
            if (opts.hasOwnProperty(opt)) {
              if (nonProperties.indexOf(opt) === -1) {
                try {
                  setOption(opt, opts[opt]);
                } catch (e) {
                  console.warn(e);
                }
              }
            }
          }
          this.option = function() {
            if (!arguments.length) {
              throw new Error("No option specified");
            }
            if (arguments.length === 1 && typeof arguments[0] === "string") {
              try {
                return getOption(arguments[0]);
              } catch (e) {
                console.warn(e);
              }
              return false;
            } else if (arguments.length >= 2 && typeof arguments[0] === "string") {
              try {
                if (!setOption(arguments[0], arguments[1])) {
                  return false;
                }
              } catch (e) {
                console.warn(e);
                return false;
              }
              this.redraw();
              this.exposeColor();
              return true;
            } else if (arguments.length === 1 && typeof arguments[0] === "object") {
              var opts2 = arguments[0];
              var success = true;
              for (var opt2 in opts2) {
                if (opts2.hasOwnProperty(opt2)) {
                  try {
                    if (!setOption(opt2, opts2[opt2])) {
                      success = false;
                    }
                  } catch (e) {
                    console.warn(e);
                    success = false;
                  }
                }
              }
              this.redraw();
              this.exposeColor();
              return success;
            }
            throw new Error("Invalid arguments");
          };
          this.channel = function(name, value) {
            if (typeof name !== "string") {
              throw new Error("Invalid value for channel name: " + name);
            }
            if (value === void 0) {
              if (!this.channels.hasOwnProperty(name.toLowerCase())) {
                console.warn("Getting unknown channel: " + name);
                return false;
              }
              return this.channels[name.toLowerCase()];
            } else {
              var res = false;
              switch (name.toLowerCase()) {
                case "r":
                  res = this.fromRGBA(value, null, null, null);
                  break;
                case "g":
                  res = this.fromRGBA(null, value, null, null);
                  break;
                case "b":
                  res = this.fromRGBA(null, null, value, null);
                  break;
                case "h":
                  res = this.fromHSVA(value, null, null, null);
                  break;
                case "s":
                  res = this.fromHSVA(null, value, null, null);
                  break;
                case "v":
                  res = this.fromHSVA(null, null, value, null);
                  break;
                case "a":
                  res = this.fromHSVA(null, null, null, value);
                  break;
                default:
                  console.warn("Setting unknown channel: " + name);
                  return false;
              }
              if (res) {
                this.redraw();
                return true;
              }
            }
            return false;
          };
          this.trigger = function(eventNames) {
            var evs = jsc.strList(eventNames);
            for (var i2 = 0; i2 < evs.length; i2 += 1) {
              var ev = evs[i2].toLowerCase();
              var callbackProp = null;
              switch (ev) {
                case "input":
                  callbackProp = "onInput";
                  break;
                case "change":
                  callbackProp = "onChange";
                  break;
              }
              if (callbackProp) {
                jsc.triggerCallback(this, callbackProp);
              }
              jsc.triggerInputEvent(this.valueElement, ev, true, true);
            }
          };
          this.fromHSVA = function(h, s, v, a, flags) {
            if (h === void 0) {
              h = null;
            }
            if (s === void 0) {
              s = null;
            }
            if (v === void 0) {
              v = null;
            }
            if (a === void 0) {
              a = null;
            }
            if (h !== null) {
              if (isNaN(h)) {
                return false;
              }
              this.channels.h = Math.max(0, Math.min(360, h));
            }
            if (s !== null) {
              if (isNaN(s)) {
                return false;
              }
              this.channels.s = Math.max(0, Math.min(100, this.maxS, s), this.minS);
            }
            if (v !== null) {
              if (isNaN(v)) {
                return false;
              }
              this.channels.v = Math.max(0, Math.min(100, this.maxV, v), this.minV);
            }
            if (a !== null) {
              if (isNaN(a)) {
                return false;
              }
              this.channels.a = this.hasAlphaChannel() ? Math.max(0, Math.min(1, this.maxA, a), this.minA) : 1;
            }
            var rgb = jsc.HSV_RGB(this.channels.h, this.channels.s, this.channels.v);
            this.channels.r = rgb[0];
            this.channels.g = rgb[1];
            this.channels.b = rgb[2];
            this.exposeColor(flags);
            return true;
          };
          this.fromRGBA = function(r, g, b, a, flags) {
            if (r === void 0) {
              r = null;
            }
            if (g === void 0) {
              g = null;
            }
            if (b === void 0) {
              b = null;
            }
            if (a === void 0) {
              a = null;
            }
            if (r !== null) {
              if (isNaN(r)) {
                return false;
              }
              r = Math.max(0, Math.min(255, r));
            }
            if (g !== null) {
              if (isNaN(g)) {
                return false;
              }
              g = Math.max(0, Math.min(255, g));
            }
            if (b !== null) {
              if (isNaN(b)) {
                return false;
              }
              b = Math.max(0, Math.min(255, b));
            }
            if (a !== null) {
              if (isNaN(a)) {
                return false;
              }
              this.channels.a = this.hasAlphaChannel() ? Math.max(0, Math.min(1, this.maxA, a), this.minA) : 1;
            }
            var hsv = jsc.RGB_HSV(r === null ? this.channels.r : r, g === null ? this.channels.g : g, b === null ? this.channels.b : b);
            if (hsv[0] !== null) {
              this.channels.h = Math.max(0, Math.min(360, hsv[0]));
            }
            if (hsv[2] !== 0) {
              this.channels.s = Math.max(0, this.minS, Math.min(100, this.maxS, hsv[1]));
            }
            this.channels.v = Math.max(0, this.minV, Math.min(100, this.maxV, hsv[2]));
            var rgb = jsc.HSV_RGB(this.channels.h, this.channels.s, this.channels.v);
            this.channels.r = rgb[0];
            this.channels.g = rgb[1];
            this.channels.b = rgb[2];
            this.exposeColor(flags);
            return true;
          };
          this.fromHSV = function(h, s, v, flags) {
            console.warn("fromHSV() method is DEPRECATED. Using fromHSVA() instead." + jsc.docsRef);
            return this.fromHSVA(h, s, v, null, flags);
          };
          this.fromRGB = function(r, g, b, flags) {
            console.warn("fromRGB() method is DEPRECATED. Using fromRGBA() instead." + jsc.docsRef);
            return this.fromRGBA(r, g, b, null, flags);
          };
          this.fromString = function(str, flags) {
            if (!this.required && str.trim() === "") {
              this.setPreviewElementBg(null);
              this.setValueElementValue("");
              return true;
            }
            var color2 = jsc.parseColorString(str);
            if (!color2) {
              return false;
            }
            if (this.format.toLowerCase() === "any") {
              this._currentFormat = color2.format;
              if (this.getFormat() !== "rgba") {
                color2.rgba[3] = 1;
              }
              this.redraw();
            }
            this.fromRGBA(color2.rgba[0], color2.rgba[1], color2.rgba[2], color2.rgba[3], flags);
            return true;
          };
          this.toString = function(format) {
            if (format === void 0) {
              format = this.getFormat();
            }
            switch (format.toLowerCase()) {
              case "hex":
                return this.toHEXString();
                break;
              case "rgb":
                return this.toRGBString();
                break;
              case "rgba":
                return this.toRGBAString();
                break;
            }
            return false;
          };
          this.toHEXString = function() {
            return "#" + (("0" + Math.round(this.channels.r).toString(16)).substr(-2) + ("0" + Math.round(this.channels.g).toString(16)).substr(-2) + ("0" + Math.round(this.channels.b).toString(16)).substr(-2)).toUpperCase();
          };
          this.toRGBString = function() {
            return "rgb(" + Math.round(this.channels.r) + "," + Math.round(this.channels.g) + "," + Math.round(this.channels.b) + ")";
          };
          this.toRGBAString = function() {
            return "rgba(" + Math.round(this.channels.r) + "," + Math.round(this.channels.g) + "," + Math.round(this.channels.b) + "," + Math.round(this.channels.a * 100) / 100 + ")";
          };
          this.toGrayscale = function() {
            return 0.213 * this.channels.r + 0.715 * this.channels.g + 0.072 * this.channels.b;
          };
          this.toCanvas = function() {
            return jsc.genColorPreviewCanvas(this.toRGBAString()).canvas;
          };
          this.toDataURL = function() {
            return this.toCanvas().toDataURL();
          };
          this.toBackground = function() {
            return jsc.pub.background(this.toRGBAString());
          };
          this.isLight = function() {
            return this.toGrayscale() > 255 / 2;
          };
          this.hide = function() {
            if (isPickerOwner()) {
              detachPicker();
            }
          };
          this.show = function() {
            drawPicker();
          };
          this.redraw = function() {
            if (isPickerOwner()) {
              drawPicker();
            }
          };
          this.getFormat = function() {
            return this._currentFormat;
          };
          this.hasAlphaChannel = function() {
            if (this.alphaChannel === "auto") {
              return this.format.toLowerCase() === "any" || this.getFormat() === "rgba" || this.alpha !== void 0 || this.alphaElement !== void 0;
            }
            return this.alphaChannel;
          };
          this.processValueInput = function(str) {
            if (!this.fromString(str)) {
              this.exposeColor();
            }
          };
          this.processAlphaInput = function(str) {
            if (!this.fromHSVA(null, null, null, parseFloat(str))) {
              this.exposeColor();
            }
          };
          this.exposeColor = function(flags) {
            if (!(flags & jsc.flags.leaveValue) && this.valueElement) {
              var value = this.toString();
              if (this.getFormat() === "hex") {
                if (!this.uppercase) {
                  value = value.toLowerCase();
                }
                if (!this.hash) {
                  value = value.replace(/^#/, "");
                }
              }
              this.setValueElementValue(value);
            }
            if (!(flags & jsc.flags.leaveAlpha) && this.alphaElement) {
              var value = Math.round(this.channels.a * 100) / 100;
              this.setAlphaElementValue(value);
            }
            if (!(flags & jsc.flags.leavePreview) && this.previewElement) {
              var previewPos = null;
              if (jsc.isTextInput(this.previewElement) || jsc.isButton(this.previewElement) && !jsc.isButtonEmpty(this.previewElement)) {
                previewPos = this.previewPosition;
              }
              this.setPreviewElementBg(this.toRGBAString());
            }
            if (isPickerOwner()) {
              redrawPad();
              redrawSld();
              redrawASld();
            }
          };
          this.setPreviewElementBg = function(color2) {
            if (!this.previewElement) {
              return;
            }
            var position = null;
            var width = null;
            if (jsc.isTextInput(this.previewElement) || jsc.isButton(this.previewElement) && !jsc.isButtonEmpty(this.previewElement)) {
              position = this.previewPosition;
              width = this.previewSize;
            }
            var backgrounds = [];
            if (!color2) {
              backgrounds.push({
                image: "none",
                position: "left top",
                size: "auto",
                repeat: "no-repeat",
                origin: "padding-box"
              });
            } else {
              backgrounds.push({
                image: jsc.genColorPreviewGradient(color2, position, width ? width - jsc.pub.previewSeparator.length : null),
                position: "left top",
                size: "auto",
                repeat: position ? "repeat-y" : "repeat",
                origin: "padding-box"
              });
              var preview = jsc.genColorPreviewCanvas("rgba(0,0,0,0)", position ? { "left": "right", "right": "left" }[position] : null, width, true);
              backgrounds.push({
                image: "url('" + preview.canvas.toDataURL() + "')",
                position: (position || "left") + " top",
                size: preview.width + "px " + preview.height + "px",
                repeat: position ? "repeat-y" : "repeat",
                origin: "padding-box"
              });
            }
            var bg = {
              image: [],
              position: [],
              size: [],
              repeat: [],
              origin: []
            };
            for (var i2 = 0; i2 < backgrounds.length; i2 += 1) {
              bg.image.push(backgrounds[i2].image);
              bg.position.push(backgrounds[i2].position);
              bg.size.push(backgrounds[i2].size);
              bg.repeat.push(backgrounds[i2].repeat);
              bg.origin.push(backgrounds[i2].origin);
            }
            var sty = {
              "background-image": bg.image.join(", "),
              "background-position": bg.position.join(", "),
              "background-size": bg.size.join(", "),
              "background-repeat": bg.repeat.join(", "),
              "background-origin": bg.origin.join(", ")
            };
            jsc.setStyle(this.previewElement, sty, this.forceStyle);
            var padding = {
              left: null,
              right: null
            };
            if (position) {
              padding[position] = this.previewSize + this.previewPadding + "px";
            }
            var sty = {
              "padding-left": padding.left,
              "padding-right": padding.right
            };
            jsc.setStyle(this.previewElement, sty, this.forceStyle, true);
          };
          this.setValueElementValue = function(str) {
            if (this.valueElement) {
              if (jsc.nodeName(this.valueElement) === "input") {
                this.valueElement.value = str;
              } else {
                this.valueElement.innerHTML = str;
              }
            }
          };
          this.setAlphaElementValue = function(str) {
            if (this.alphaElement) {
              if (jsc.nodeName(this.alphaElement) === "input") {
                this.alphaElement.value = str;
              } else {
                this.alphaElement.innerHTML = str;
              }
            }
          };
          this._processParentElementsInDOM = function() {
            if (this._linkedElementsProcessed) {
              return;
            }
            this._linkedElementsProcessed = true;
            var elm = this.targetElement;
            do {
              var compStyle2 = jsc.getCompStyle(elm);
              if (compStyle2.position && compStyle2.position.toLowerCase() === "fixed") {
                this.fixed = true;
              }
              if (elm !== this.targetElement) {
                if (!jsc.getData(elm, "hasScrollListener")) {
                  elm.addEventListener("scroll", jsc.onParentScroll, false);
                  jsc.setData(elm, "hasScrollListener", true);
                }
              }
            } while ((elm = elm.parentNode) && jsc.nodeName(elm) !== "body");
          };
          this.tryHide = function() {
            if (this.hideOnLeave) {
              this.hide();
            }
          };
          function setOption(option, value) {
            if (typeof option !== "string") {
              throw new Error("Invalid value for option name: " + option);
            }
            if (jsc.enumOpts.hasOwnProperty(option)) {
              if (typeof value === "string") {
                value = value.toLowerCase();
              }
              if (jsc.enumOpts[option].indexOf(value) === -1) {
                throw new Error("Option '" + option + "' has invalid value: " + value);
              }
            }
            if (jsc.deprecatedOpts.hasOwnProperty(option)) {
              var oldOpt = option;
              var newOpt = jsc.deprecatedOpts[option];
              if (newOpt) {
                console.warn("Option '%s' is DEPRECATED, using '%s' instead." + jsc.docsRef, oldOpt, newOpt);
                option = newOpt;
              } else {
                throw new Error("Option '" + option + "' is DEPRECATED");
              }
            }
            if (!(option in THIS)) {
              throw new Error("Unrecognized configuration option: " + option);
            }
            THIS[option] = value;
            return true;
          }
          function getOption(option) {
            if (jsc.deprecatedOpts.hasOwnProperty(option)) {
              var oldOpt = option;
              var newOpt = jsc.deprecatedOpts[option];
              if (newOpt) {
                console.warn("Option '%s' is DEPRECATED, using '%s' instead." + jsc.docsRef, oldOpt, newOpt);
                option = newOpt;
              } else {
                throw new Error("Option '" + option + "' is DEPRECATED");
              }
            }
            if (!(option in THIS)) {
              throw new Error("Unrecognized configuration option: " + option);
            }
            return THIS[option];
          }
          function detachPicker() {
            jsc.removeClass(THIS.targetElement, jsc.pub.activeClassName);
            jsc.picker.wrap.parentNode.removeChild(jsc.picker.wrap);
            delete jsc.picker.owner;
          }
          function drawPicker() {
            THIS._processParentElementsInDOM();
            if (!jsc.picker) {
              jsc.picker = {
                owner: null,
                wrap: jsc.createEl("div"),
                box: jsc.createEl("div"),
                boxS: jsc.createEl("div"),
                boxB: jsc.createEl("div"),
                pad: jsc.createEl("div"),
                padB: jsc.createEl("div"),
                padM: jsc.createEl("div"),
                padPal: jsc.createPalette(),
                cross: jsc.createEl("div"),
                crossBY: jsc.createEl("div"),
                crossBX: jsc.createEl("div"),
                crossLY: jsc.createEl("div"),
                crossLX: jsc.createEl("div"),
                sld: jsc.createEl("div"),
                sldB: jsc.createEl("div"),
                sldM: jsc.createEl("div"),
                sldGrad: jsc.createSliderGradient(),
                sldPtrS: jsc.createEl("div"),
                sldPtrIB: jsc.createEl("div"),
                sldPtrMB: jsc.createEl("div"),
                sldPtrOB: jsc.createEl("div"),
                asld: jsc.createEl("div"),
                asldB: jsc.createEl("div"),
                asldM: jsc.createEl("div"),
                asldGrad: jsc.createASliderGradient(),
                asldPtrS: jsc.createEl("div"),
                asldPtrIB: jsc.createEl("div"),
                asldPtrMB: jsc.createEl("div"),
                asldPtrOB: jsc.createEl("div"),
                btn: jsc.createEl("div"),
                btnT: jsc.createEl("span")
              };
              jsc.picker.pad.appendChild(jsc.picker.padPal.elm);
              jsc.picker.padB.appendChild(jsc.picker.pad);
              jsc.picker.cross.appendChild(jsc.picker.crossBY);
              jsc.picker.cross.appendChild(jsc.picker.crossBX);
              jsc.picker.cross.appendChild(jsc.picker.crossLY);
              jsc.picker.cross.appendChild(jsc.picker.crossLX);
              jsc.picker.padB.appendChild(jsc.picker.cross);
              jsc.picker.box.appendChild(jsc.picker.padB);
              jsc.picker.box.appendChild(jsc.picker.padM);
              jsc.picker.sld.appendChild(jsc.picker.sldGrad.elm);
              jsc.picker.sldB.appendChild(jsc.picker.sld);
              jsc.picker.sldB.appendChild(jsc.picker.sldPtrOB);
              jsc.picker.sldPtrOB.appendChild(jsc.picker.sldPtrMB);
              jsc.picker.sldPtrMB.appendChild(jsc.picker.sldPtrIB);
              jsc.picker.sldPtrIB.appendChild(jsc.picker.sldPtrS);
              jsc.picker.box.appendChild(jsc.picker.sldB);
              jsc.picker.box.appendChild(jsc.picker.sldM);
              jsc.picker.asld.appendChild(jsc.picker.asldGrad.elm);
              jsc.picker.asldB.appendChild(jsc.picker.asld);
              jsc.picker.asldB.appendChild(jsc.picker.asldPtrOB);
              jsc.picker.asldPtrOB.appendChild(jsc.picker.asldPtrMB);
              jsc.picker.asldPtrMB.appendChild(jsc.picker.asldPtrIB);
              jsc.picker.asldPtrIB.appendChild(jsc.picker.asldPtrS);
              jsc.picker.box.appendChild(jsc.picker.asldB);
              jsc.picker.box.appendChild(jsc.picker.asldM);
              jsc.picker.btn.appendChild(jsc.picker.btnT);
              jsc.picker.box.appendChild(jsc.picker.btn);
              jsc.picker.boxB.appendChild(jsc.picker.box);
              jsc.picker.wrap.appendChild(jsc.picker.boxS);
              jsc.picker.wrap.appendChild(jsc.picker.boxB);
              jsc.picker.wrap.addEventListener("touchstart", jsc.onPickerTouchStart, jsc.isPassiveEventSupported ? { passive: false } : false);
            }
            var p = jsc.picker;
            var displaySlider = !!jsc.getSliderChannel(THIS);
            var displayAlphaSlider = THIS.hasAlphaChannel();
            var dims = jsc.getPickerDims(THIS);
            var crossOuterSize = 2 * THIS.pointerBorderWidth + THIS.pointerThickness + 2 * THIS.crossSize;
            var controlPadding = jsc.getControlPadding(THIS);
            var borderRadius = Math.min(THIS.borderRadius, Math.round(THIS.padding * Math.PI));
            var padCursor = "crosshair";
            p.wrap.className = "jscolor-picker-wrap";
            p.wrap.style.clear = "both";
            p.wrap.style.width = dims[0] + 2 * THIS.borderWidth + "px";
            p.wrap.style.height = dims[1] + 2 * THIS.borderWidth + "px";
            p.wrap.style.zIndex = THIS.zIndex;
            p.box.className = "jscolor-picker";
            p.box.style.width = dims[0] + "px";
            p.box.style.height = dims[1] + "px";
            p.box.style.position = "relative";
            p.boxS.className = "jscolor-picker-shadow";
            p.boxS.style.position = "absolute";
            p.boxS.style.left = "0";
            p.boxS.style.top = "0";
            p.boxS.style.width = "100%";
            p.boxS.style.height = "100%";
            jsc.setBorderRadius(p.boxS, borderRadius + "px");
            p.boxB.className = "jscolor-picker-border";
            p.boxB.style.position = "relative";
            p.boxB.style.border = THIS.borderWidth + "px solid";
            p.boxB.style.borderColor = THIS.borderColor;
            p.boxB.style.background = THIS.backgroundColor;
            jsc.setBorderRadius(p.boxB, borderRadius + "px");
            p.padM.style.background = "rgba(255,0,0,.2)";
            p.sldM.style.background = "rgba(0,255,0,.2)";
            p.asldM.style.background = "rgba(0,0,255,.2)";
            p.padM.style.opacity = p.sldM.style.opacity = p.asldM.style.opacity = "0";
            p.pad.style.position = "relative";
            p.pad.style.width = THIS.width + "px";
            p.pad.style.height = THIS.height + "px";
            p.padPal.draw(THIS.width, THIS.height, jsc.getPadYChannel(THIS));
            p.padB.style.position = "absolute";
            p.padB.style.left = THIS.padding + "px";
            p.padB.style.top = THIS.padding + "px";
            p.padB.style.border = THIS.controlBorderWidth + "px solid";
            p.padB.style.borderColor = THIS.controlBorderColor;
            p.padM.style.position = "absolute";
            p.padM.style.left = 0 + "px";
            p.padM.style.top = 0 + "px";
            p.padM.style.width = THIS.padding + 2 * THIS.controlBorderWidth + THIS.width + controlPadding + "px";
            p.padM.style.height = 2 * THIS.controlBorderWidth + 2 * THIS.padding + THIS.height + "px";
            p.padM.style.cursor = padCursor;
            jsc.setData(p.padM, {
              instance: THIS,
              control: "pad"
            });
            p.cross.style.position = "absolute";
            p.cross.style.left = p.cross.style.top = "0";
            p.cross.style.width = p.cross.style.height = crossOuterSize + "px";
            p.crossBY.style.position = p.crossBX.style.position = "absolute";
            p.crossBY.style.background = p.crossBX.style.background = THIS.pointerBorderColor;
            p.crossBY.style.width = p.crossBX.style.height = 2 * THIS.pointerBorderWidth + THIS.pointerThickness + "px";
            p.crossBY.style.height = p.crossBX.style.width = crossOuterSize + "px";
            p.crossBY.style.left = p.crossBX.style.top = Math.floor(crossOuterSize / 2) - Math.floor(THIS.pointerThickness / 2) - THIS.pointerBorderWidth + "px";
            p.crossBY.style.top = p.crossBX.style.left = "0";
            p.crossLY.style.position = p.crossLX.style.position = "absolute";
            p.crossLY.style.background = p.crossLX.style.background = THIS.pointerColor;
            p.crossLY.style.height = p.crossLX.style.width = crossOuterSize - 2 * THIS.pointerBorderWidth + "px";
            p.crossLY.style.width = p.crossLX.style.height = THIS.pointerThickness + "px";
            p.crossLY.style.left = p.crossLX.style.top = Math.floor(crossOuterSize / 2) - Math.floor(THIS.pointerThickness / 2) + "px";
            p.crossLY.style.top = p.crossLX.style.left = THIS.pointerBorderWidth + "px";
            p.sld.style.overflow = "hidden";
            p.sld.style.width = THIS.sliderSize + "px";
            p.sld.style.height = THIS.height + "px";
            p.sldGrad.draw(THIS.sliderSize, THIS.height, "#000", "#000");
            p.sldB.style.display = displaySlider ? "block" : "none";
            p.sldB.style.position = "absolute";
            p.sldB.style.left = THIS.padding + THIS.width + 2 * THIS.controlBorderWidth + 2 * controlPadding + "px";
            p.sldB.style.top = THIS.padding + "px";
            p.sldB.style.border = THIS.controlBorderWidth + "px solid";
            p.sldB.style.borderColor = THIS.controlBorderColor;
            p.sldM.style.display = displaySlider ? "block" : "none";
            p.sldM.style.position = "absolute";
            p.sldM.style.left = THIS.padding + THIS.width + 2 * THIS.controlBorderWidth + controlPadding + "px";
            p.sldM.style.top = 0 + "px";
            p.sldM.style.width = THIS.sliderSize + 2 * controlPadding + 2 * THIS.controlBorderWidth + (displayAlphaSlider ? 0 : Math.max(0, THIS.padding - controlPadding)) + "px";
            p.sldM.style.height = 2 * THIS.controlBorderWidth + 2 * THIS.padding + THIS.height + "px";
            p.sldM.style.cursor = "default";
            jsc.setData(p.sldM, {
              instance: THIS,
              control: "sld"
            });
            p.sldPtrIB.style.border = p.sldPtrOB.style.border = THIS.pointerBorderWidth + "px solid " + THIS.pointerBorderColor;
            p.sldPtrOB.style.position = "absolute";
            p.sldPtrOB.style.left = -(2 * THIS.pointerBorderWidth + THIS.pointerThickness) + "px";
            p.sldPtrOB.style.top = "0";
            p.sldPtrMB.style.border = THIS.pointerThickness + "px solid " + THIS.pointerColor;
            p.sldPtrS.style.width = THIS.sliderSize + "px";
            p.sldPtrS.style.height = jsc.pub.sliderInnerSpace + "px";
            p.asld.style.overflow = "hidden";
            p.asld.style.width = THIS.sliderSize + "px";
            p.asld.style.height = THIS.height + "px";
            p.asldGrad.draw(THIS.sliderSize, THIS.height, "#000");
            p.asldB.style.display = displayAlphaSlider ? "block" : "none";
            p.asldB.style.position = "absolute";
            p.asldB.style.left = THIS.padding + THIS.width + 2 * THIS.controlBorderWidth + controlPadding + (displaySlider ? THIS.sliderSize + 3 * controlPadding + 2 * THIS.controlBorderWidth : 0) + "px";
            p.asldB.style.top = THIS.padding + "px";
            p.asldB.style.border = THIS.controlBorderWidth + "px solid";
            p.asldB.style.borderColor = THIS.controlBorderColor;
            p.asldM.style.display = displayAlphaSlider ? "block" : "none";
            p.asldM.style.position = "absolute";
            p.asldM.style.left = THIS.padding + THIS.width + 2 * THIS.controlBorderWidth + controlPadding + (displaySlider ? THIS.sliderSize + 2 * controlPadding + 2 * THIS.controlBorderWidth : 0) + "px";
            p.asldM.style.top = 0 + "px";
            p.asldM.style.width = THIS.sliderSize + 2 * controlPadding + 2 * THIS.controlBorderWidth + Math.max(0, THIS.padding - controlPadding) + "px";
            p.asldM.style.height = 2 * THIS.controlBorderWidth + 2 * THIS.padding + THIS.height + "px";
            p.asldM.style.cursor = "default";
            jsc.setData(p.asldM, {
              instance: THIS,
              control: "asld"
            });
            p.asldPtrIB.style.border = p.asldPtrOB.style.border = THIS.pointerBorderWidth + "px solid " + THIS.pointerBorderColor;
            p.asldPtrOB.style.position = "absolute";
            p.asldPtrOB.style.left = -(2 * THIS.pointerBorderWidth + THIS.pointerThickness) + "px";
            p.asldPtrOB.style.top = "0";
            p.asldPtrMB.style.border = THIS.pointerThickness + "px solid " + THIS.pointerColor;
            p.asldPtrS.style.width = THIS.sliderSize + "px";
            p.asldPtrS.style.height = jsc.pub.sliderInnerSpace + "px";
            function setBtnBorder() {
              var insetColors = THIS.controlBorderColor.split(/\s+/);
              var outsetColor = insetColors.length < 2 ? insetColors[0] : insetColors[1] + " " + insetColors[0] + " " + insetColors[0] + " " + insetColors[1];
              p.btn.style.borderColor = outsetColor;
            }
            var btnPadding = 15;
            p.btn.className = "jscolor-btn-close";
            p.btn.style.display = THIS.closeButton ? "block" : "none";
            p.btn.style.position = "absolute";
            p.btn.style.left = THIS.padding + "px";
            p.btn.style.bottom = THIS.padding + "px";
            p.btn.style.padding = "0 " + btnPadding + "px";
            p.btn.style.maxWidth = dims[0] - 2 * THIS.padding - 2 * THIS.controlBorderWidth - 2 * btnPadding + "px";
            p.btn.style.overflow = "hidden";
            p.btn.style.height = THIS.buttonHeight + "px";
            p.btn.style.whiteSpace = "nowrap";
            p.btn.style.border = THIS.controlBorderWidth + "px solid";
            setBtnBorder();
            p.btn.style.color = THIS.buttonColor;
            p.btn.style.font = "12px sans-serif";
            p.btn.style.textAlign = "center";
            p.btn.style.cursor = "pointer";
            p.btn.onmousedown = function() {
              THIS.hide();
            };
            p.btnT.style.lineHeight = THIS.buttonHeight + "px";
            p.btnT.innerHTML = "";
            p.btnT.appendChild(document.createTextNode(THIS.closeText));
            redrawPad();
            redrawSld();
            redrawASld();
            if (jsc.picker.owner && jsc.picker.owner !== THIS) {
              jsc.removeClass(jsc.picker.owner.targetElement, jsc.pub.activeClassName);
            }
            jsc.picker.owner = THIS;
            if (THIS.container === document.body) {
              jsc.redrawPosition();
            } else {
              jsc._drawPosition(THIS, 0, 0, "relative", false);
            }
            if (p.wrap.parentNode !== THIS.container) {
              THIS.container.appendChild(p.wrap);
            }
            jsc.addClass(THIS.targetElement, jsc.pub.activeClassName);
          }
          function redrawPad() {
            var yChannel = jsc.getPadYChannel(THIS);
            var x = Math.round(THIS.channels.h / 360 * (THIS.width - 1));
            var y = Math.round((1 - THIS.channels[yChannel] / 100) * (THIS.height - 1));
            var crossOuterSize = 2 * THIS.pointerBorderWidth + THIS.pointerThickness + 2 * THIS.crossSize;
            var ofs = -Math.floor(crossOuterSize / 2);
            jsc.picker.cross.style.left = x + ofs + "px";
            jsc.picker.cross.style.top = y + ofs + "px";
            switch (jsc.getSliderChannel(THIS)) {
              case "s":
                var rgb1 = jsc.HSV_RGB(THIS.channels.h, 100, THIS.channels.v);
                var rgb2 = jsc.HSV_RGB(THIS.channels.h, 0, THIS.channels.v);
                var color1 = "rgb(" + Math.round(rgb1[0]) + "," + Math.round(rgb1[1]) + "," + Math.round(rgb1[2]) + ")";
                var color2 = "rgb(" + Math.round(rgb2[0]) + "," + Math.round(rgb2[1]) + "," + Math.round(rgb2[2]) + ")";
                jsc.picker.sldGrad.draw(THIS.sliderSize, THIS.height, color1, color2);
                break;
              case "v":
                var rgb = jsc.HSV_RGB(THIS.channels.h, THIS.channels.s, 100);
                var color1 = "rgb(" + Math.round(rgb[0]) + "," + Math.round(rgb[1]) + "," + Math.round(rgb[2]) + ")";
                var color2 = "#000";
                jsc.picker.sldGrad.draw(THIS.sliderSize, THIS.height, color1, color2);
                break;
            }
            jsc.picker.asldGrad.draw(THIS.sliderSize, THIS.height, THIS.toHEXString());
          }
          function redrawSld() {
            var sldChannel = jsc.getSliderChannel(THIS);
            if (sldChannel) {
              var y = Math.round((1 - THIS.channels[sldChannel] / 100) * (THIS.height - 1));
              jsc.picker.sldPtrOB.style.top = y - (2 * THIS.pointerBorderWidth + THIS.pointerThickness) - Math.floor(jsc.pub.sliderInnerSpace / 2) + "px";
            }
            jsc.picker.asldGrad.draw(THIS.sliderSize, THIS.height, THIS.toHEXString());
          }
          function redrawASld() {
            var y = Math.round((1 - THIS.channels.a) * (THIS.height - 1));
            jsc.picker.asldPtrOB.style.top = y - (2 * THIS.pointerBorderWidth + THIS.pointerThickness) - Math.floor(jsc.pub.sliderInnerSpace / 2) + "px";
          }
          function isPickerOwner() {
            return jsc.picker && jsc.picker.owner === THIS;
          }
          function onValueKeyDown(ev) {
            if (jsc.eventKey(ev) === "Enter") {
              if (THIS.valueElement) {
                THIS.processValueInput(THIS.valueElement.value);
              }
              THIS.tryHide();
            }
          }
          function onAlphaKeyDown(ev) {
            if (jsc.eventKey(ev) === "Enter") {
              if (THIS.alphaElement) {
                THIS.processAlphaInput(THIS.alphaElement.value);
              }
              THIS.tryHide();
            }
          }
          function onValueChange(ev) {
            if (jsc.getData(ev, "internal")) {
              return;
            }
            var oldVal = THIS.valueElement.value;
            THIS.processValueInput(THIS.valueElement.value);
            jsc.triggerCallback(THIS, "onChange");
            if (THIS.valueElement.value !== oldVal) {
              jsc.triggerInputEvent(THIS.valueElement, "change", true, true);
            }
          }
          function onAlphaChange(ev) {
            if (jsc.getData(ev, "internal")) {
              return;
            }
            var oldVal = THIS.alphaElement.value;
            THIS.processAlphaInput(THIS.alphaElement.value);
            jsc.triggerCallback(THIS, "onChange");
            jsc.triggerInputEvent(THIS.valueElement, "change", true, true);
            if (THIS.alphaElement.value !== oldVal) {
              jsc.triggerInputEvent(THIS.alphaElement, "change", true, true);
            }
          }
          function onValueInput(ev) {
            if (jsc.getData(ev, "internal")) {
              return;
            }
            if (THIS.valueElement) {
              THIS.fromString(THIS.valueElement.value, jsc.flags.leaveValue);
            }
            jsc.triggerCallback(THIS, "onInput");
          }
          function onAlphaInput(ev) {
            if (jsc.getData(ev, "internal")) {
              return;
            }
            if (THIS.alphaElement) {
              THIS.fromHSVA(null, null, null, parseFloat(THIS.alphaElement.value), jsc.flags.leaveAlpha);
            }
            jsc.triggerCallback(THIS, "onInput");
            jsc.triggerInputEvent(THIS.valueElement, "input", true, true);
          }
          if (this.container === void 0) {
            this.container = document.body;
          } else {
            this.container = jsc.node(this.container);
          }
          if (!this.container) {
            throw new Error("Cannot instantiate color picker without a container element");
          }
          this.targetElement = jsc.node(targetElement);
          if (!this.targetElement) {
            if (typeof targetElement === "string" && /^[a-zA-Z][\w:.-]*$/.test(targetElement)) {
              var possiblyId = targetElement;
              throw new Error("If '" + possiblyId + "' is supposed to be an ID, please use '#" + possiblyId + "' or any valid CSS selector.");
            }
            throw new Error("Cannot instantiate color picker without a target element");
          }
          if (this.targetElement.jscolor && this.targetElement.jscolor instanceof jsc.pub) {
            throw new Error("Color picker already installed on this element");
          }
          this.targetElement.jscolor = this;
          jsc.addClass(this.targetElement, jsc.pub.className);
          jsc.instances.push(this);
          if (jsc.isButton(this.targetElement)) {
            if (this.targetElement.type.toLowerCase() !== "button") {
              this.targetElement.type = "button";
            }
            if (jsc.isButtonEmpty(this.targetElement)) {
              jsc.removeChildren(this.targetElement);
              this.targetElement.appendChild(document.createTextNode("\xA0"));
              var compStyle = jsc.getCompStyle(this.targetElement);
              var currMinWidth = parseFloat(compStyle["min-width"]) || 0;
              if (currMinWidth < this.previewSize) {
                jsc.setStyle(this.targetElement, {
                  "min-width": this.previewSize + "px"
                }, this.forceStyle);
              }
            }
          }
          if (this.valueElement === void 0) {
            if (jsc.isTextInput(this.targetElement)) {
              this.valueElement = this.targetElement;
            } else {
            }
          } else if (this.valueElement === null) {
          } else {
            this.valueElement = jsc.node(this.valueElement);
          }
          if (this.alphaElement) {
            this.alphaElement = jsc.node(this.alphaElement);
          }
          if (this.previewElement === void 0) {
            this.previewElement = this.targetElement;
          } else if (this.previewElement === null) {
          } else {
            this.previewElement = jsc.node(this.previewElement);
          }
          if (this.valueElement && jsc.isTextInput(this.valueElement)) {
            var valueElementOrigEvents = {
              onInput: this.valueElement.oninput
            };
            this.valueElement.oninput = null;
            this.valueElement.addEventListener("keydown", onValueKeyDown, false);
            this.valueElement.addEventListener("change", onValueChange, false);
            this.valueElement.addEventListener("input", onValueInput, false);
            if (valueElementOrigEvents.onInput) {
              this.valueElement.addEventListener("input", valueElementOrigEvents.onInput, false);
            }
            this.valueElement.setAttribute("autocomplete", "off");
            this.valueElement.setAttribute("autocorrect", "off");
            this.valueElement.setAttribute("autocapitalize", "off");
            this.valueElement.setAttribute("spellcheck", false);
          }
          if (this.alphaElement && jsc.isTextInput(this.alphaElement)) {
            this.alphaElement.addEventListener("keydown", onAlphaKeyDown, false);
            this.alphaElement.addEventListener("change", onAlphaChange, false);
            this.alphaElement.addEventListener("input", onAlphaInput, false);
            this.alphaElement.setAttribute("autocomplete", "off");
            this.alphaElement.setAttribute("autocorrect", "off");
            this.alphaElement.setAttribute("autocapitalize", "off");
            this.alphaElement.setAttribute("spellcheck", false);
          }
          var initValue = "FFFFFF";
          if (this.value !== void 0) {
            initValue = this.value;
          } else if (this.valueElement && this.valueElement.value !== void 0) {
            initValue = this.valueElement.value;
          }
          var initAlpha = void 0;
          if (this.alpha !== void 0) {
            initAlpha = "" + this.alpha;
          } else if (this.alphaElement && this.alphaElement.value !== void 0) {
            initAlpha = this.alphaElement.value;
          }
          this._currentFormat = null;
          if (["auto", "any"].indexOf(this.format.toLowerCase()) > -1) {
            var color = jsc.parseColorString(initValue);
            this._currentFormat = color ? color.format : "hex";
          } else {
            this._currentFormat = this.format.toLowerCase();
          }
          this.processValueInput(initValue);
          if (initAlpha !== void 0) {
            this.processAlphaInput(initAlpha);
          }
        }
      };
      jsc.pub.className = "jscolor";
      jsc.pub.activeClassName = "jscolor-active";
      jsc.pub.looseJSON = true;
      jsc.pub.presets = {};
      jsc.pub.presets["default"] = {};
      jsc.pub.presets["light"] = {
        backgroundColor: "rgba(255,255,255,1)",
        controlBorderColor: "rgba(187,187,187,1)",
        buttonColor: "rgba(0,0,0,1)"
      };
      jsc.pub.presets["dark"] = {
        backgroundColor: "rgba(51,51,51,1)",
        controlBorderColor: "rgba(153,153,153,1)",
        buttonColor: "rgba(240,240,240,1)"
      };
      jsc.pub.presets["small"] = { width: 101, height: 101, padding: 10, sliderSize: 14 };
      jsc.pub.presets["medium"] = { width: 181, height: 101, padding: 12, sliderSize: 16 };
      jsc.pub.presets["large"] = { width: 271, height: 151, padding: 12, sliderSize: 24 };
      jsc.pub.presets["thin"] = { borderWidth: 1, controlBorderWidth: 1, pointerBorderWidth: 1 };
      jsc.pub.presets["thick"] = { borderWidth: 2, controlBorderWidth: 2, pointerBorderWidth: 2 };
      jsc.pub.sliderInnerSpace = 3;
      jsc.pub.chessboardSize = 8;
      jsc.pub.chessboardColor1 = "#666666";
      jsc.pub.chessboardColor2 = "#999999";
      jsc.pub.previewSeparator = ["rgba(255,255,255,.65)", "rgba(128,128,128,.65)"];
      jsc.pub.install = function(rootNode) {
        var success = true;
        try {
          jsc.installBySelector("[data-jscolor]", rootNode);
        } catch (e) {
          success = false;
          console.warn(e);
        }
        if (jsc.pub.lookupClass) {
          try {
            jsc.installBySelector("input." + jsc.pub.lookupClass + ", button." + jsc.pub.lookupClass, rootNode);
          } catch (e) {
          }
        }
        return success;
      };
      jsc.pub.trigger = function(eventNames) {
        if (jsc.initialized) {
          jsc.triggerGlobal(eventNames);
        } else {
          jsc.triggerQueue.push(eventNames);
        }
      };
      jsc.pub.hide = function() {
        if (jsc.picker && jsc.picker.owner) {
          jsc.picker.owner.hide();
        }
      };
      jsc.pub.chessboard = function(color) {
        if (!color) {
          color = "rgba(0,0,0,0)";
        }
        var preview = jsc.genColorPreviewCanvas(color);
        return preview.canvas.toDataURL();
      };
      jsc.pub.background = function(color) {
        var backgrounds = [];
        backgrounds.push(jsc.genColorPreviewGradient(color));
        var preview = jsc.genColorPreviewCanvas();
        backgrounds.push([
          "url('" + preview.canvas.toDataURL() + "')",
          "left top",
          "repeat"
        ].join(" "));
        return backgrounds.join(", ");
      };
      jsc.pub.options = {};
      jsc.pub.lookupClass = "jscolor";
      jsc.pub.init = function() {
        console.warn("jscolor.init() is DEPRECATED. Using jscolor.install() instead." + jsc.docsRef);
        return jsc.pub.install();
      };
      jsc.pub.installByClassName = function() {
        console.error('jscolor.installByClassName() is DEPRECATED. Use data-jscolor="" attribute instead of a class name.' + jsc.docsRef);
        return false;
      };
      jsc.register();
      return jsc.pub;
    }();
    window.JSColor = window.jscolor;
  }

  // js/app.js
  var import_topbar = __toModule(require_topbar());
  var throttleMs = 100;
  var Hooks2 = {};
  Hooks2.ColorSelector = {
    target() {
      return this.el.getAttribute("phx-target");
    },
    mounted() {
      jscolor.install();
      this.el.addEventListener("build", (0, import_lodash.default)((e) => {
        const ev = e.detail;
        const hex = ev.toHEXString();
        this.pushEventTo(this.target(), "color", { hex, connName: this.el.dataset.connName });
      }, throttleMs));
    }
  };
  Hooks2.BrightnessSlider = {
    target() {
      return this.el.getAttribute("phx-target");
    },
    mounted() {
      this.el.addEventListener("input", (0, import_lodash.default)((e) => {
        const value = parseInt(e.target.value);
        this.pushEventTo(this.target(), "brightness", { value, connName: this.el.dataset.connName });
      }, throttleMs));
    }
  };
  Hooks2.WhiteSlider = {
    target() {
      return this.el.getAttribute("phx-target");
    },
    mounted() {
      this.el.addEventListener("input", (0, import_lodash.default)((e) => {
        const value = parseInt(e.target.value);
        this.pushEventTo(this.target(), "white-slider", { value, connName: this.el.dataset.connName });
      }, throttleMs));
    }
  };
  window.update = function(colorEvent) {
    const event = new CustomEvent("build", { detail: colorEvent });
    colorEvent.previewElement.dispatchEvent(event);
  };
  var csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content");
  var liveSocket = new LiveSocket("/live", Socket, { hooks: Hooks2, params: { _csrf_token: csrfToken } });
  import_topbar.default.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" });
  window.addEventListener("phx:page-loading-start", (info) => import_topbar.default.show());
  window.addEventListener("phx:page-loading-stop", (info) => import_topbar.default.hide());
  liveSocket.connect();
  window.liveSocket = liveSocket;
})();
/**
 * @license MIT
 * topbar 1.0.0, 2021-01-06
 * https://buunguyen.github.io/topbar
 * Copyright (c) 2021 Buu Nguyen
 */
/**
 * jscolor - JavaScript Color Picker
 *
 * @link    http://jscolor.com
 * @license For open source use: GPLv3
 *          For commercial use: JSColor Commercial License
 * @author  Jan Odvarko - East Desire
 * @version 2.3.3
 *
 * See usage examples at http://jscolor.com/examples/
 */
