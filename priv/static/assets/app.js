(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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
      var to = element.getAttribute("data-to"), method = buildHiddenInput("_method", element.getAttribute("data-method")), csrf = buildHiddenInput("_csrf_token", element.getAttribute("data-csrf")), form = document.createElement("form"), target = element.getAttribute("target");
      form.method = element.getAttribute("data-method") === "get" ? "get" : "post";
      form.action = to;
      form.style.display = "hidden";
      if (target)
        form.target = target;
      else if (targetModifierKey)
        form.target = "_blank";
      form.appendChild(csrf);
      form.appendChild(method);
      document.body.appendChild(form);
      form.submit();
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
        if (element.getAttribute("data-method")) {
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
  var global2 = globalSelf || phxWindow || global2;
  var DEFAULT_VSN = "2.0.0";
  var SOCKET_STATES = { connecting: 0, open: 1, closing: 2, closed: 3 };
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
    static request(method, endPoint, accept, body, timeout, ontimeout, callback) {
      if (global2.XDomainRequest) {
        let req = new global2.XDomainRequest();
        return this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global2.XMLHttpRequest();
        return this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
      }
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
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
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
  var LongPoll = class {
    constructor(endPoint) {
      this.endPoint = null;
      this.token = null;
      this.skipHeartbeat = true;
      this.reqs = /* @__PURE__ */ new Set();
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
      this.poll();
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
      this.ajax("GET", null, () => this.ontimeout(), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
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
      this.ajax("POST", body, () => this.onerror("timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        }
      });
    }
    close(code, reason, wasClean) {
      for (let req of this.reqs) {
        req.abort();
      }
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
    }
    ajax(method, body, onCallerTimeout, callback) {
      let req;
      let ontimeout = () => {
        this.reqs.delete(req);
        onCallerTimeout();
      };
      req = Ajax.request(method, this.endpointURL(), "application/json", body, this.timeout, ontimeout, (resp) => {
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
      let metaLength = this.META_LENGTH + join_ref.length + ref.length + topic.length + event.length;
      let header = new ArrayBuffer(this.HEADER_LENGTH + metaLength);
      let view = new DataView(header);
      let offset = 0;
      view.setUint8(offset++, this.KINDS.push);
      view.setUint8(offset++, join_ref.length);
      view.setUint8(offset++, ref.length);
      view.setUint8(offset++, topic.length);
      view.setUint8(offset++, event.length);
      Array.from(join_ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(ref, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(topic, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      Array.from(event, (char) => view.setUint8(offset++, char.charCodeAt(0)));
      var combined = new Uint8Array(header.byteLength + payload.byteLength);
      combined.set(new Uint8Array(header), 0);
      combined.set(new Uint8Array(payload), header.byteLength);
      return combined.buffer;
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
      this.timeout = opts.timeout || DEFAULT_TIMEOUT;
      this.transport = opts.transport || global2.WebSocket || LongPoll;
      this.establishedConnections = 0;
      this.defaultEncoder = serializer_default.encode.bind(serializer_default);
      this.defaultDecoder = serializer_default.decode.bind(serializer_default);
      this.closeWasClean = false;
      this.binaryType = opts.binaryType || "arraybuffer";
      this.connectClock = 1;
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
      this.longpollerTimeout = opts.longpollerTimeout || 2e4;
      this.params = closure(opts.params || {});
      this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
      this.vsn = opts.vsn || DEFAULT_VSN;
      this.heartbeatTimeoutTimer = null;
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    getLongPollTransport() {
      return LongPoll;
    }
    replaceTransport(newTransport) {
      this.connectClock++;
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.sendBuffer = [];
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
      this.closeWasClean = true;
      this.reconnectTimer.reset();
      this.teardown(callback, code, reason);
    }
    connect(params) {
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
      this.connectClock++;
      this.closeWasClean = false;
      this.conn = new this.transport(this.endPointURL());
      this.conn.binaryType = this.binaryType;
      this.conn.timeout = this.longpollerTimeout;
      this.conn.onopen = () => this.onConnOpen();
      this.conn.onerror = (error) => this.onConnError(error);
      this.conn.onmessage = (event) => this.onConnMessage(event);
      this.conn.onclose = (event) => this.onConnClose(event);
    }
    log(kind, msg, data) {
      this.logger(kind, msg, data);
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
    clearHeartbeats() {
      clearTimeout(this.heartbeatTimer);
      clearTimeout(this.heartbeatTimeoutTimer);
    }
    onConnOpen() {
      if (this.hasLogger())
        this.log("transport", `connected to ${this.endPointURL()}`);
      this.closeWasClean = false;
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
      this.waitForBufferDone(() => {
        if (this.conn) {
          if (code) {
            this.conn.close(code, reason || "");
          } else {
            this.conn.close();
          }
        }
        this.waitForSocketClosed(() => {
          if (this.conn) {
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
    waitForBufferDone(callback, tries = 1) {
      if (tries === 5 || !this.conn || !this.conn.bufferedAmount) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForBufferDone(callback, tries + 1);
      }, 150 * tries);
    }
    waitForSocketClosed(callback, tries = 1) {
      if (tries === 5 || !this.conn || this.conn.readyState === SOCKET_STATES.closed) {
        callback();
        return;
      }
      setTimeout(() => {
        this.waitForSocketClosed(callback, tries + 1);
      }, 150 * tries);
    }
    onConnClose(event) {
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
        this.log("transport", error);
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
      this.channels = this.channels.filter((c) => c.joinRef() !== channel.joinRef());
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
    "phx-focus-loading"
  ];
  var PHX_COMPONENT = "data-phx-component";
  var PHX_LIVE_LINK = "data-phx-link";
  var PHX_TRACK_STATIC = "track-static";
  var PHX_LINK_STATE = "data-phx-link-state";
  var PHX_REF = "data-phx-ref";
  var PHX_REF_SRC = "data-phx-ref-src";
  var PHX_TRACK_UPLOADS = "track-uploads";
  var PHX_UPLOAD_REF = "data-phx-upload-ref";
  var PHX_PREFLIGHTED_REFS = "data-phx-preflighted-refs";
  var PHX_DONE_REFS = "data-phx-done-refs";
  var PHX_DROP_TARGET = "drop-target";
  var PHX_ACTIVE_ENTRY_REFS = "data-phx-active-refs";
  var PHX_LIVE_FILE_UPDATED = "phx:live-file:updated";
  var PHX_SKIP = "data-phx-skip";
  var PHX_PRUNE = "data-phx-prune";
  var PHX_PAGE_LOADING = "page-loading";
  var PHX_CONNECTED_CLASS = "phx-connected";
  var PHX_DISCONNECTED_CLASS = "phx-loading";
  var PHX_NO_FEEDBACK_CLASS = "phx-no-feedback";
  var PHX_ERROR_CLASS = "phx-error";
  var PHX_PARENT_ID = "data-phx-parent-id";
  var PHX_MAIN = "data-phx-main";
  var PHX_ROOT_ID = "data-phx-root-id";
  var PHX_TRIGGER_ACTION = "trigger-action";
  var PHX_FEEDBACK_FOR = "feedback-for";
  var PHX_HAS_FOCUSED = "phx-has-focused";
  var FOCUSABLE_INPUTS = ["text", "textarea", "number", "email", "password", "search", "tel", "url", "date", "time", "datetime-local", "color", "range"];
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
  var PHX_KEY = "key";
  var PHX_PRIVATE = "phxPrivate";
  var PHX_AUTO_RECOVER = "auto-recover";
  var PHX_LV_DEBUG = "phx:live-socket:debug";
  var PHX_LV_PROFILE = "phx:live-socket:profiling";
  var PHX_LV_LATENCY_SIM = "phx:live-socket:latency-sim";
  var PHX_PROGRESS = "progress";
  var PHX_MOUNTED = "mounted";
  var LOADER_TIMEOUT = 1;
  var BEFORE_UNLOAD_LOADER_TIMEOUT = 200;
  var BINDING_PREFIX = "phx-";
  var PUSH_TIMEOUT = 3e4;
  var DEBOUNCE_TRIGGER = "debounce-trigger";
  var THROTTLED = "throttled";
  var DEBOUNCE_PREV_KEY = "debounce-prev-key";
  var DEFAULTS = {
    debounce: 300,
    throttle: 300
  };
  var DYNAMICS = "d";
  var STATIC = "s";
  var COMPONENTS = "c";
  var EVENTS = "e";
  var REPLY = "r";
  var TITLE = "t";
  var TEMPLATES = "p";
  var EntryUploader = class {
    constructor(entry, chunkSize, liveSocket2) {
      this.liveSocket = liveSocket2;
      this.entry = entry;
      this.offset = 0;
      this.chunkSize = chunkSize;
      this.chunkTimer = null;
      this.uploadChannel = liveSocket2.channel(`lvu:${entry.ref}`, { token: entry.metadata() });
    }
    error(reason) {
      clearTimeout(this.chunkTimer);
      this.uploadChannel.leave();
      this.entry.error(reason);
    }
    upload() {
      this.uploadChannel.onError((reason) => this.error(reason));
      this.uploadChannel.join().receive("ok", (_data) => this.readNextChunk()).receive("error", (reason) => this.error(reason));
    }
    isDone() {
      return this.offset >= this.entry.file.size;
    }
    readNextChunk() {
      let reader = new window.FileReader();
      let blob = this.entry.file.slice(this.offset, this.chunkSize + this.offset);
      reader.onload = (e) => {
        if (e.target.error === null) {
          this.offset += e.target.result.byteLength;
          this.pushChunk(e.target.result);
        } else {
          return logError("Read error: " + e.target.error);
        }
      };
      reader.readAsArrayBuffer(blob);
    }
    pushChunk(chunk) {
      if (!this.uploadChannel.isJoined()) {
        return;
      }
      this.uploadChannel.push("chunk", chunk).receive("ok", () => {
        this.entry.progress(this.offset / this.entry.file.size * 100);
        if (!this.isDone()) {
          this.chunkTimer = setTimeout(() => this.readNextChunk(), this.liveSocket.getLatencySim() || 0);
        }
      });
    }
  };
  var logError = (msg, obj) => console.error && console.error(msg, obj);
  var isCid = (cid) => {
    let type = typeof cid;
    return type === "number" || type === "string" && /^(0|[1-9]\d*)$/.test(cid);
  };
  function detectDuplicateIds() {
    let ids = /* @__PURE__ */ new Set();
    let elems = document.querySelectorAll("*[id]");
    for (let i = 0, len = elems.length; i < len; i++) {
      if (ids.has(elems[i].id)) {
        console.error(`Multiple IDs detected: ${elems[i].id}. Ensure unique element ids.`);
      } else {
        ids.add(elems[i].id);
      }
    }
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
  var closestPhxBinding = (el, binding, borderEl) => {
    do {
      if (el.matches(`[${binding}]`) && !el.disabled) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1 && !(borderEl && borderEl.isSameNode(el) || el.matches(PHX_VIEW_SELECTOR)));
    return null;
  };
  var isObject = (obj) => {
    return obj !== null && typeof obj === "object" && !(obj instanceof Array);
  };
  var isEqualObj = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
  var isEmpty = (obj) => {
    for (let x in obj) {
      return false;
    }
    return true;
  };
  var maybe = (el, callback) => el && callback(el);
  var channelUploader = function(entries, onError, resp, liveSocket2) {
    entries.forEach((entry) => {
      let entryUploader = new EntryUploader(entry, resp.config.chunk_size, liveSocket2);
      entryUploader.upload();
    });
  };
  var Browser = {
    canPushState() {
      return typeof history.pushState !== "undefined";
    },
    dropLocal(localStorage, namespace, subkey) {
      return localStorage.removeItem(this.localKey(namespace, subkey));
    },
    updateLocal(localStorage, namespace, subkey, initial, func) {
      let current = this.getLocal(localStorage, namespace, subkey);
      let key = this.localKey(namespace, subkey);
      let newVal = current === null ? initial : func(current);
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
            let currentState = history.state || {};
            currentState.scroll = meta.scroll;
            history.replaceState(currentState, "", window.location.href);
          }
          delete meta.scroll;
          history[kind + "State"](meta, "", to || null);
          let hashEl = this.getHashTargetEl(window.location.hash);
          if (hashEl) {
            hashEl.scrollIntoView();
          } else if (meta.type === "redirect") {
            window.scroll(0, 0);
          }
        }
      } else {
        this.redirect(to);
      }
    },
    setCookie(name, value) {
      document.cookie = `${name}=${value}`;
    },
    getCookie(name) {
      return document.cookie.replace(new RegExp(`(?:(?:^|.*;s*)${name}s*=s*([^;]*).*$)|^.*$`), "$1");
    },
    redirect(toURL, flash) {
      if (flash) {
        Browser.setCookie("__phoenix_flash__", flash + "; max-age=60000; path=/");
      }
      window.location = toURL;
    },
    localKey(namespace, subkey) {
      return `${namespace}-${subkey}`;
    },
    getHashTargetEl(maybeHash) {
      let hash = maybeHash.toString().substring(1);
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
      let array = Array.from(node.querySelectorAll(query));
      return callback ? array.forEach(callback) : array;
    },
    childNodeLength(html) {
      let template = document.createElement("template");
      template.innerHTML = html;
      return template.content.childElementCount;
    },
    isUploadInput(el) {
      return el.type === "file" && el.getAttribute(PHX_UPLOAD_REF) !== null;
    },
    findUploadInputs(node) {
      return this.all(node, `input[type="file"][${PHX_UPLOAD_REF}]`);
    },
    findComponentNodeList(node, cid) {
      return this.filterWithinSameLiveView(this.all(node, `[${PHX_COMPONENT}="${cid}"]`), node);
    },
    isPhxDestroyed(node) {
      return node.id && DOM.private(node, "destroyed") ? true : false;
    },
    wantsNewTab(e) {
      let wantsNewTab = e.ctrlKey || e.shiftKey || e.metaKey || e.button && e.button === 1;
      return wantsNewTab || e.target.getAttribute("target") === "_blank";
    },
    isNewPageHref(href, currentLocation) {
      let url;
      try {
        url = new URL(href);
      } catch (e) {
        try {
          url = new URL(href, currentLocation);
        } catch (e2) {
          return true;
        }
      }
      if (url.host === currentLocation.host && url.protocol === currentLocation.protocol) {
        if (url.pathname === currentLocation.pathname && url.search === currentLocation.search) {
          return url.hash === "" && !url.href.endsWith("#");
        }
      }
      return true;
    },
    markPhxChildDestroyed(el) {
      if (this.isPhxChild(el)) {
        el.setAttribute(PHX_SESSION, "");
      }
      this.putPrivate(el, "destroyed", true);
    },
    findPhxChildrenInFragment(html, parentId) {
      let template = document.createElement("template");
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
    findParentCIDs(node, cids) {
      let initial = new Set(cids);
      let parentCids = cids.reduce((acc, cid) => {
        let selector = `[${PHX_COMPONENT}="${cid}"] [${PHX_COMPONENT}]`;
        this.filterWithinSameLiveView(this.all(node, selector), node).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => acc.delete(childCID));
        return acc;
      }, initial);
      return parentCids.size === 0 ? new Set(cids) : parentCids;
    },
    filterWithinSameLiveView(nodes, parent) {
      if (parent.querySelector(PHX_VIEW_SELECTOR)) {
        return nodes.filter((el) => this.withinSameLiveView(el, parent));
      } else {
        return nodes;
      }
    },
    withinSameLiveView(node, parent) {
      while (node = node.parentNode) {
        if (node.isSameNode(parent)) {
          return true;
        }
        if (node.getAttribute(PHX_SESSION) !== null) {
          return false;
        }
      }
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
      let existing = this.private(el, key);
      if (existing === void 0) {
        this.putPrivate(el, key, updateFunc(defaultVal));
      } else {
        this.putPrivate(el, key, updateFunc(existing));
      }
    },
    copyPrivates(target, source) {
      if (source[PHX_PRIVATE]) {
        target[PHX_PRIVATE] = source[PHX_PRIVATE];
      }
    },
    putTitle(str) {
      let titleEl = document.querySelector("title");
      if (titleEl) {
        let { prefix, suffix } = titleEl.dataset;
        document.title = `${prefix || ""}${str}${suffix || ""}`;
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
      let value = debounce || throttle2;
      switch (value) {
        case null:
          return callback();
        case "blur":
          if (this.once(el, "debounce-blur")) {
            el.addEventListener("blur", () => callback());
          }
          return;
        default:
          let timeout = parseInt(value);
          let trigger = () => throttle2 ? this.deletePrivate(el, THROTTLED) : callback();
          let currentCycle = this.incCycle(el, DEBOUNCE_TRIGGER, trigger);
          if (isNaN(timeout)) {
            return logError(`invalid throttle/debounce value: ${value}`);
          }
          if (throttle2) {
            let newKeyDown = false;
            if (event.type === "keydown") {
              let prevKey = this.private(el, DEBOUNCE_PREV_KEY);
              this.putPrivate(el, DEBOUNCE_PREV_KEY, event.key);
              newKeyDown = prevKey !== event.key;
            }
            if (!newKeyDown && this.private(el, THROTTLED)) {
              return false;
            } else {
              callback();
              this.putPrivate(el, THROTTLED, true);
              setTimeout(() => {
                if (asyncFilter()) {
                  this.triggerCycle(el, DEBOUNCE_TRIGGER);
                }
              }, timeout);
            }
          } else {
            setTimeout(() => {
              if (asyncFilter()) {
                this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle);
              }
            }, timeout);
          }
          let form = el.form;
          if (form && this.once(form, "bind-debounce")) {
            form.addEventListener("submit", () => {
              Array.from(new FormData(form).entries(), ([name]) => {
                let input = form.querySelector(`[name="${name}"]`);
                this.incCycle(input, DEBOUNCE_TRIGGER);
                this.deletePrivate(input, THROTTLED);
              });
            });
          }
          if (this.once(el, "bind-debounce")) {
            el.addEventListener("blur", () => this.triggerCycle(el, DEBOUNCE_TRIGGER));
          }
      }
    },
    triggerCycle(el, key, currentCycle) {
      let [cycle, trigger] = this.private(el, key);
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
    discardError(container, el, phxFeedbackFor) {
      let field = el.getAttribute && el.getAttribute(phxFeedbackFor);
      let input = field && container.querySelector(`[id="${field}"], [name="${field}"], [name="${field}[]"]`);
      if (!input) {
        return;
      }
      if (!(this.private(input, PHX_HAS_FOCUSED) || this.private(input, PHX_HAS_SUBMITTED))) {
        el.classList.add(PHX_NO_FEEDBACK_CLASS);
      }
    },
    showError(inputEl, phxFeedbackFor) {
      if (inputEl.id || inputEl.name) {
        this.all(inputEl.form, `[${phxFeedbackFor}="${inputEl.id}"], [${phxFeedbackFor}="${inputEl.name}"]`, (el) => {
          this.removeClass(el, PHX_NO_FEEDBACK_CLASS);
        });
      }
    },
    isPhxChild(node) {
      return node.getAttribute && node.getAttribute(PHX_PARENT_ID);
    },
    isPhxSticky(node) {
      return node.getAttribute && node.getAttribute(PHX_STICKY) !== null;
    },
    firstPhxChild(el) {
      return this.isPhxChild(el) ? el : this.all(el, `[${PHX_PARENT_ID}]`)[0];
    },
    dispatchEvent(target, name, opts = {}) {
      let bubbles = opts.bubbles === void 0 ? true : !!opts.bubbles;
      let eventOpts = { bubbles, cancelable: true, detail: opts.detail || {} };
      let event = name === "click" ? new MouseEvent("click", eventOpts) : new CustomEvent(name, eventOpts);
      target.dispatchEvent(event);
    },
    cloneNode(node, html) {
      if (typeof html === "undefined") {
        return node.cloneNode(true);
      } else {
        let cloned = node.cloneNode(false);
        cloned.innerHTML = html;
        return cloned;
      }
    },
    mergeAttrs(target, source, opts = {}) {
      let exclude = opts.exclude || [];
      let isIgnored = opts.isIgnored;
      let sourceAttrs = source.attributes;
      for (let i = sourceAttrs.length - 1; i >= 0; i--) {
        let name = sourceAttrs[i].name;
        if (exclude.indexOf(name) < 0) {
          target.setAttribute(name, source.getAttribute(name));
        }
      }
      let targetAttrs = target.attributes;
      for (let i = targetAttrs.length - 1; i >= 0; i--) {
        let name = targetAttrs[i].name;
        if (isIgnored) {
          if (name.startsWith("data-") && !source.hasAttribute(name)) {
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
      if (!DOM.isTextualInput(focused)) {
        return;
      }
      let wasFocused = focused.matches(":focus");
      if (focused.readOnly) {
        focused.blur();
      }
      if (!wasFocused) {
        focused.focus();
      }
      if (this.hasSelectionRange(focused)) {
        focused.setSelectionRange(selectionStart, selectionEnd);
      }
    },
    isFormInput(el) {
      return /^(?:input|select|textarea)$/i.test(el.tagName) && el.type !== "button";
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
      return el.getAttribute && el.getAttribute(phxTriggerExternal) !== null;
    },
    syncPendingRef(fromEl, toEl, disableWith) {
      let ref = fromEl.getAttribute(PHX_REF);
      if (ref === null) {
        return true;
      }
      let refSrc = fromEl.getAttribute(PHX_REF_SRC);
      if (DOM.isFormInput(fromEl) || fromEl.getAttribute(disableWith) !== null) {
        if (DOM.isUploadInput(fromEl)) {
          DOM.mergeAttrs(fromEl, toEl, { isIgnored: true });
        }
        DOM.putPrivate(fromEl, PHX_REF, toEl);
        return false;
      } else {
        PHX_EVENT_CLASSES.forEach((className) => {
          fromEl.classList.contains(className) && toEl.classList.add(className);
        });
        toEl.setAttribute(PHX_REF, ref);
        toEl.setAttribute(PHX_REF_SRC, refSrc);
        return true;
      }
    },
    cleanChildNodes(container, phxUpdate) {
      if (DOM.isPhxUpdate(container, phxUpdate, ["append", "prepend"])) {
        let toRemove = [];
        container.childNodes.forEach((childNode) => {
          if (!childNode.id) {
            let isEmptyTextNode = childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim() === "";
            if (!isEmptyTextNode) {
              logError(`only HTML element tags with an id are allowed inside containers with phx-update.

removing illegal node: "${(childNode.outerHTML || childNode.nodeValue).trim()}"

`);
            }
            toRemove.push(childNode);
          }
        });
        toRemove.forEach((childNode) => childNode.remove());
      }
    },
    replaceRootContainer(container, tagName, attrs) {
      let retainedAttrs = /* @__PURE__ */ new Set(["id", PHX_SESSION, PHX_STATIC, PHX_MAIN, PHX_ROOT_ID]);
      if (container.tagName.toLowerCase() === tagName.toLowerCase()) {
        Array.from(container.attributes).filter((attr) => !retainedAttrs.has(attr.name.toLowerCase())).forEach((attr) => container.removeAttribute(attr.name));
        Object.keys(attrs).filter((name) => !retainedAttrs.has(name.toLowerCase())).forEach((attr) => container.setAttribute(attr, attrs[attr]));
        return container;
      } else {
        let newContainer = document.createElement(tagName);
        Object.keys(attrs).forEach((attr) => newContainer.setAttribute(attr, attrs[attr]));
        retainedAttrs.forEach((attr) => newContainer.setAttribute(attr, container.getAttribute(attr)));
        newContainer.innerHTML = container.innerHTML;
        container.replaceWith(newContainer);
        return newContainer;
      }
    },
    getSticky(el, name, defaultVal) {
      let op = (DOM.private(el, "sticky") || []).find(([existingName]) => name === existingName);
      if (op) {
        let [_name, _op, stashedResult] = op;
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
      let stashedResult = op(el);
      this.updatePrivate(el, "sticky", [], (ops) => {
        let existingIndex = ops.findIndex(([existingName]) => name === existingName);
        if (existingIndex >= 0) {
          ops[existingIndex] = [name, op, stashedResult];
        } else {
          ops.push([name, op, stashedResult]);
        }
        return ops;
      });
    },
    applyStickyOperations(el) {
      let ops = DOM.private(el, "sticky");
      if (!ops) {
        return;
      }
      ops.forEach(([name, op, _stashed]) => this.putSticky(el, name, op));
    }
  };
  var dom_default = DOM;
  var UploadEntry = class {
    static isActive(fileEl, file) {
      let isNew = file._phxRef === void 0;
      let activeRefs = fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      let isActive = activeRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return file.size > 0 && (isNew || isActive);
    }
    static isPreflighted(fileEl, file) {
      let preflightedRefs = fileEl.getAttribute(PHX_PREFLIGHTED_REFS).split(",");
      let isPreflighted = preflightedRefs.indexOf(LiveUploader.genFileRef(file)) >= 0;
      return isPreflighted && this.isActive(fileEl, file);
    }
    constructor(fileEl, file, view) {
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
    cancel() {
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
      LiveUploader.clearFiles(this.fileEl);
    }
    onDone(callback) {
      this._onDone = () => {
        this.fileEl.removeEventListener(PHX_LIVE_FILE_UPDATED, this._onElUpdated);
        callback();
      };
    }
    onElUpdated() {
      let activeRefs = this.fileEl.getAttribute(PHX_ACTIVE_ENTRY_REFS).split(",");
      if (activeRefs.indexOf(this.ref) === -1) {
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
        ref: this.ref
      };
    }
    uploader(uploaders) {
      if (this.meta.uploader) {
        let callback = uploaders[this.meta.uploader] || logError(`no uploader configured for ${this.meta.uploader}`);
        return { name: this.meta.uploader, callback };
      } else {
        return { name: "channel", callback: channelUploader };
      }
    }
    zipPostFlight(resp) {
      this.meta = resp.entries[this.ref];
      if (!this.meta) {
        logError(`no preflight upload response returned with ref ${this.ref}`, { input: this.fileEl, response: resp });
      }
    }
  };
  var liveUploaderFileRef = 0;
  var LiveUploader = class {
    static genFileRef(file) {
      let ref = file._phxRef;
      if (ref !== void 0) {
        return ref;
      } else {
        file._phxRef = (liveUploaderFileRef++).toString();
        return file._phxRef;
      }
    }
    static getEntryDataURL(inputEl, ref, callback) {
      let file = this.activeFiles(inputEl).find((file2) => this.genFileRef(file2) === ref);
      callback(URL.createObjectURL(file));
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
      let files = this.activeFiles(inputEl);
      let fileData = {};
      files.forEach((file) => {
        let entry = { path: inputEl.name };
        let uploadRef = inputEl.getAttribute(PHX_UPLOAD_REF);
        fileData[uploadRef] = fileData[uploadRef] || [];
        entry.ref = this.genFileRef(file);
        entry.last_modified = file.lastModified;
        entry.name = file.name || entry.ref;
        entry.relative_path = file.webkitRelativePath;
        entry.type = file.type;
        entry.size = file.size;
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
    static trackFiles(inputEl, files) {
      if (inputEl.getAttribute("multiple") !== null) {
        let newFiles = files.filter((file) => !this.activeFiles(inputEl).find((f) => Object.is(f, file)));
        dom_default.putPrivate(inputEl, "files", this.activeFiles(inputEl).concat(newFiles));
        inputEl.value = null;
      } else {
        dom_default.putPrivate(inputEl, "files", files);
      }
    }
    static activeFileInputs(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((el) => el.files && this.activeFiles(el).length > 0);
    }
    static activeFiles(input) {
      return (dom_default.private(input, "files") || []).filter((f) => UploadEntry.isActive(input, f));
    }
    static inputsAwaitingPreflight(formEl) {
      let fileInputs = dom_default.findUploadInputs(formEl);
      return Array.from(fileInputs).filter((input) => this.filesAwaitingPreflight(input).length > 0);
    }
    static filesAwaitingPreflight(input) {
      return this.activeFiles(input).filter((f) => !UploadEntry.isPreflighted(input, f));
    }
    constructor(inputEl, view, onComplete) {
      this.view = view;
      this.onComplete = onComplete;
      this._entries = Array.from(LiveUploader.filesAwaitingPreflight(inputEl) || []).map((file) => new UploadEntry(inputEl, file, view));
      this.numEntriesInProgress = this._entries.length;
    }
    entries() {
      return this._entries;
    }
    initAdapterUpload(resp, onError, liveSocket2) {
      this._entries = this._entries.map((entry) => {
        entry.zipPostFlight(resp);
        entry.onDone(() => {
          this.numEntriesInProgress--;
          if (this.numEntriesInProgress === 0) {
            this.onComplete();
          }
        });
        return entry;
      });
      let groupedEntries = this._entries.reduce((acc, entry) => {
        let { name, callback } = entry.uploader(liveSocket2.uploaders);
        acc[name] = acc[name] || { callback, entries: [] };
        acc[name].entries.push(entry);
        return acc;
      }, {});
      for (let name in groupedEntries) {
        let { callback, entries } = groupedEntries[name];
        callback(entries, onError, resp, liveSocket2);
      }
    }
  };
  var ARIA = {
    focusMain() {
      let target = document.querySelector("main h1, main, h1");
      if (target) {
        let origTabIndex = target.tabIndex;
        target.tabIndex = -1;
        target.focus();
        target.tabIndex = origTabIndex;
      }
    },
    anyOf(instance, classes) {
      return classes.find((name) => instance instanceof name);
    },
    isFocusable(el, interactiveOnly) {
      return el instanceof HTMLAnchorElement && el.rel !== "ignore" || el instanceof HTMLAreaElement && el.href !== void 0 || !el.disabled && this.anyOf(el, [HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement, HTMLButtonElement]) || el instanceof HTMLIFrameElement || (el.tabIndex > 0 || !interactiveOnly && el.tabIndex === 0 && el.getAttribute("tabindex") !== null && el.getAttribute("aria-hidden") !== "true");
    },
    attemptFocus(el, interactiveOnly) {
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
        if (this.attemptFocus(child, true) || this.focusFirstInteractive(child, true)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusFirst(el) {
      let child = el.firstElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusFirst(child)) {
          return true;
        }
        child = child.nextElementSibling;
      }
    },
    focusLast(el) {
      let child = el.lastElementChild;
      while (child) {
        if (this.attemptFocus(child) || this.focusLast(child)) {
          return true;
        }
        child = child.previousElementSibling;
      }
    }
  };
  var aria_default = ARIA;
  var Hooks = {
    LiveFileUpload: {
      activeRefs() {
        return this.el.getAttribute(PHX_ACTIVE_ENTRY_REFS);
      },
      preflightedRefs() {
        return this.el.getAttribute(PHX_PREFLIGHTED_REFS);
      },
      mounted() {
        this.preflightedWas = this.preflightedRefs();
      },
      updated() {
        let newPreflights = this.preflightedRefs();
        if (this.preflightedWas !== newPreflights) {
          this.preflightedWas = newPreflights;
          if (newPreflights === "") {
            this.__view.cancelSubmit(this.el.form);
          }
        }
        if (this.activeRefs() === "") {
          this.el.value = null;
        }
        this.el.dispatchEvent(new CustomEvent(PHX_LIVE_FILE_UPDATED));
      }
    },
    LiveImgPreview: {
      mounted() {
        this.ref = this.el.getAttribute("data-phx-entry-ref");
        this.inputEl = document.getElementById(this.el.getAttribute(PHX_UPLOAD_REF));
        LiveUploader.getEntryDataURL(this.inputEl, this.ref, (url) => {
          this.url = url;
          this.el.src = url;
        });
      },
      destroyed() {
        URL.revokeObjectURL(this.url);
      }
    },
    FocusWrap: {
      mounted() {
        this.focusStart = this.el.firstElementChild;
        this.focusEnd = this.el.lastElementChild;
        this.focusStart.addEventListener("focus", () => aria_default.focusLast(this.el));
        this.focusEnd.addEventListener("focus", () => aria_default.focusFirst(this.el));
        this.el.addEventListener("phx:show-end", () => this.el.focus());
        if (window.getComputedStyle(this.el).display !== "none") {
          aria_default.focusFirst(this.el);
        }
      }
    }
  };
  var hooks_default = Hooks;
  var DOMPostMorphRestorer = class {
    constructor(containerBefore, containerAfter, updateType) {
      let idsBefore = /* @__PURE__ */ new Set();
      let idsAfter = new Set([...containerAfter.children].map((child) => child.id));
      let elementsToModify = [];
      Array.from(containerBefore.children).forEach((child) => {
        if (child.id) {
          idsBefore.add(child.id);
          if (idsAfter.has(child.id)) {
            let previousElementId = child.previousElementSibling && child.previousElementSibling.id;
            elementsToModify.push({ elementId: child.id, previousElementId });
          }
        }
      });
      this.containerId = containerAfter.id;
      this.updateType = updateType;
      this.elementsToModify = elementsToModify;
      this.elementIdsToAdd = [...idsAfter].filter((id) => !idsBefore.has(id));
    }
    perform() {
      let container = dom_default.byId(this.containerId);
      this.elementsToModify.forEach((elementToModify) => {
        if (elementToModify.previousElementId) {
          maybe(document.getElementById(elementToModify.previousElementId), (previousElem) => {
            maybe(document.getElementById(elementToModify.elementId), (elem) => {
              let isInRightPlace = elem.previousElementSibling && elem.previousElementSibling.id == previousElem.id;
              if (!isInRightPlace) {
                previousElem.insertAdjacentElement("afterend", elem);
              }
            });
          });
        } else {
          maybe(document.getElementById(elementToModify.elementId), (elem) => {
            let isInRightPlace = elem.previousElementSibling == null;
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
        if (fromNode.nodeName === "#document" || fromNode.nodeName === "HTML" || fromNode.nodeName === "BODY") {
          var toNodeHtml = toNode;
          toNode = doc.createElement("html");
          toNode.innerHTML = toNodeHtml;
        } else {
          toNode = toElement(toNode);
        }
      }
      var getNodeKey = options.getNodeKey || defaultGetNodeKey;
      var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
      var onNodeAdded = options.onNodeAdded || noop;
      var onBeforeElUpdated = options.onBeforeElUpdated || noop;
      var onElUpdated = options.onElUpdated || noop;
      var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
      var onNodeDiscarded = options.onNodeDiscarded || noop;
      var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
      var childrenOnly = options.childrenOnly === true;
      var fromNodesLookup = Object.create(null);
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
          if (onBeforeElUpdated(fromEl, toEl) === false) {
            return;
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
            while (curFromNodeChild) {
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
              fromEl.appendChild(matchingFromEl);
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
                fromEl.appendChild(curToNodeChild);
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
    static patchEl(fromEl, toEl, activeElement) {
      morphdom_esm_default(fromEl, toEl, {
        childrenOnly: false,
        onBeforeElUpdated: (fromEl2, toEl2) => {
          if (activeElement && activeElement.isSameNode(fromEl2) && dom_default.isFormInput(fromEl2)) {
            dom_default.mergeFocusedInput(fromEl2, toEl2);
            return false;
          }
        }
      });
    }
    constructor(view, container, id, html, targetCID) {
      this.view = view;
      this.liveSocket = view.liveSocket;
      this.container = container;
      this.id = id;
      this.rootID = view.root.id;
      this.html = html;
      this.targetCID = targetCID;
      this.cidPatch = isCid(this.targetCID);
      this.callbacks = {
        beforeadded: [],
        beforeupdated: [],
        beforephxChildAdded: [],
        afteradded: [],
        afterupdated: [],
        afterdiscarded: [],
        afterphxChildAdded: [],
        aftertransitionsDiscarded: []
      };
    }
    before(kind, callback) {
      this.callbacks[`before${kind}`].push(callback);
    }
    after(kind, callback) {
      this.callbacks[`after${kind}`].push(callback);
    }
    trackBefore(kind, ...args) {
      this.callbacks[`before${kind}`].forEach((callback) => callback(...args));
    }
    trackAfter(kind, ...args) {
      this.callbacks[`after${kind}`].forEach((callback) => callback(...args));
    }
    markPrunableContentForRemoval() {
      dom_default.all(this.container, "[phx-update=append] > *, [phx-update=prepend] > *", (el) => {
        el.setAttribute(PHX_PRUNE, "");
      });
    }
    perform() {
      let { view, liveSocket: liveSocket2, container, html } = this;
      let targetContainer = this.isCIDPatch() ? this.targetCIDContainer(html) : container;
      if (this.isCIDPatch() && !targetContainer) {
        return;
      }
      let focused = liveSocket2.getActiveElement();
      let { selectionStart, selectionEnd } = focused && dom_default.hasSelectionRange(focused) ? focused : {};
      let phxUpdate = liveSocket2.binding(PHX_UPDATE);
      let phxFeedbackFor = liveSocket2.binding(PHX_FEEDBACK_FOR);
      let disableWith = liveSocket2.binding(PHX_DISABLE_WITH);
      let phxTriggerExternal = liveSocket2.binding(PHX_TRIGGER_ACTION);
      let phxRemove = liveSocket2.binding("remove");
      let added = [];
      let updates = [];
      let appendPrependUpdates = [];
      let pendingRemoves = [];
      let externalFormTriggered = null;
      let diffHTML = liveSocket2.time("premorph container prep", () => {
        return this.buildDiffHTML(container, html, phxUpdate, targetContainer);
      });
      this.trackBefore("added", container);
      this.trackBefore("updated", container, container);
      liveSocket2.time("morphdom", () => {
        morphdom_esm_default(targetContainer, diffHTML, {
          childrenOnly: targetContainer.getAttribute(PHX_COMPONENT) === null,
          getNodeKey: (node) => {
            return dom_default.isPhxDestroyed(node) ? null : node.id;
          },
          onBeforeNodeAdded: (el) => {
            this.trackBefore("added", el);
            return el;
          },
          onNodeAdded: (el) => {
            if (el instanceof HTMLImageElement && el.srcset) {
              el.srcset = el.srcset;
            } else if (el instanceof HTMLVideoElement && el.autoplay) {
              el.play();
            }
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            dom_default.discardError(targetContainer, el, phxFeedbackFor);
            if (dom_default.isPhxChild(el) && view.ownsElement(el) || dom_default.isPhxSticky(el) && view.ownsElement(el.parentNode)) {
              this.trackAfter("phxChildAdded", el);
            }
            added.push(el);
          },
          onNodeDiscarded: (el) => {
            if (dom_default.isPhxChild(el) || dom_default.isPhxSticky(el)) {
              liveSocket2.destroyViewByEl(el);
            }
            this.trackAfter("discarded", el);
          },
          onBeforeNodeDiscarded: (el) => {
            if (el.getAttribute && el.getAttribute(PHX_PRUNE) !== null) {
              return true;
            }
            if (el.parentNode !== null && dom_default.isPhxUpdate(el.parentNode, phxUpdate, ["append", "prepend"]) && el.id) {
              return false;
            }
            if (el.getAttribute && el.getAttribute(phxRemove)) {
              pendingRemoves.push(el);
              return false;
            }
            if (this.skipCIDSibling(el)) {
              return false;
            }
            return true;
          },
          onElUpdated: (el) => {
            if (dom_default.isNowTriggerFormExternal(el, phxTriggerExternal)) {
              externalFormTriggered = el;
            }
            updates.push(el);
          },
          onBeforeElUpdated: (fromEl, toEl) => {
            dom_default.cleanChildNodes(toEl, phxUpdate);
            if (this.skipCIDSibling(toEl)) {
              return false;
            }
            if (dom_default.isPhxSticky(fromEl)) {
              return false;
            }
            if (dom_default.isIgnored(fromEl, phxUpdate) || fromEl.form && fromEl.form.isSameNode(externalFormTriggered)) {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeAttrs(fromEl, toEl, { isIgnored: true });
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (fromEl.type === "number" && (fromEl.validity && fromEl.validity.badInput)) {
              return false;
            }
            if (!dom_default.syncPendingRef(fromEl, toEl, disableWith)) {
              if (dom_default.isUploadInput(fromEl)) {
                this.trackBefore("updated", fromEl, toEl);
                updates.push(fromEl);
              }
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            if (dom_default.isPhxChild(toEl)) {
              let prevSession = fromEl.getAttribute(PHX_SESSION);
              dom_default.mergeAttrs(fromEl, toEl, { exclude: [PHX_STATIC] });
              if (prevSession !== "") {
                fromEl.setAttribute(PHX_SESSION, prevSession);
              }
              fromEl.setAttribute(PHX_ROOT_ID, this.rootID);
              dom_default.applyStickyOperations(fromEl);
              return false;
            }
            dom_default.copyPrivates(toEl, fromEl);
            dom_default.discardError(targetContainer, toEl, phxFeedbackFor);
            let isFocusedFormEl = focused && fromEl.isSameNode(focused) && dom_default.isFormInput(fromEl);
            if (isFocusedFormEl && fromEl.type !== "hidden") {
              this.trackBefore("updated", fromEl, toEl);
              dom_default.mergeFocusedInput(fromEl, toEl);
              dom_default.syncAttrsToProps(fromEl);
              updates.push(fromEl);
              dom_default.applyStickyOperations(fromEl);
              return false;
            } else {
              if (dom_default.isPhxUpdate(toEl, phxUpdate, ["append", "prepend"])) {
                appendPrependUpdates.push(new DOMPostMorphRestorer(fromEl, toEl, toEl.getAttribute(phxUpdate)));
              }
              dom_default.syncAttrsToProps(toEl);
              dom_default.applyStickyOperations(toEl);
              this.trackBefore("updated", fromEl, toEl);
              return true;
            }
          }
        });
      });
      if (liveSocket2.isDebugEnabled()) {
        detectDuplicateIds();
      }
      if (appendPrependUpdates.length > 0) {
        liveSocket2.time("post-morph append/prepend restoration", () => {
          appendPrependUpdates.forEach((update) => update.perform());
        });
      }
      liveSocket2.silenceEvents(() => dom_default.restoreFocus(focused, selectionStart, selectionEnd));
      dom_default.dispatchEvent(document, "phx:update");
      added.forEach((el) => this.trackAfter("added", el));
      updates.forEach((el) => this.trackAfter("updated", el));
      if (pendingRemoves.length > 0) {
        liveSocket2.transitionRemoves(pendingRemoves);
        liveSocket2.requestDOMUpdate(() => {
          pendingRemoves.forEach((el) => {
            let child = dom_default.firstPhxChild(el);
            if (child) {
              liveSocket2.destroyViewByEl(child);
            }
            el.remove();
          });
          this.trackAfter("transitionsDiscarded", pendingRemoves);
        });
      }
      if (externalFormTriggered) {
        liveSocket2.unload();
        externalFormTriggered.submit();
      }
      return true;
    }
    isCIDPatch() {
      return this.cidPatch;
    }
    skipCIDSibling(el) {
      return el.nodeType === Node.ELEMENT_NODE && el.getAttribute(PHX_SKIP) !== null;
    }
    targetCIDContainer(html) {
      if (!this.isCIDPatch()) {
        return;
      }
      let [first, ...rest] = dom_default.findComponentNodeList(this.container, this.targetCID);
      if (rest.length === 0 && dom_default.childNodeLength(html) === 1) {
        return first;
      } else {
        return first && first.parentNode;
      }
    }
    buildDiffHTML(container, html, phxUpdate, targetContainer) {
      let isCIDPatch = this.isCIDPatch();
      let isCIDWithSingleRoot = isCIDPatch && targetContainer.getAttribute(PHX_COMPONENT) === this.targetCID.toString();
      if (!isCIDPatch || isCIDWithSingleRoot) {
        return html;
      } else {
        let diffContainer = null;
        let template = document.createElement("template");
        diffContainer = dom_default.cloneNode(targetContainer);
        let [firstComponent, ...rest] = dom_default.findComponentNodeList(diffContainer, this.targetCID);
        template.innerHTML = html;
        rest.forEach((el) => el.remove());
        Array.from(diffContainer.childNodes).forEach((child) => {
          if (child.id && child.nodeType === Node.ELEMENT_NODE && child.getAttribute(PHX_COMPONENT) !== this.targetCID.toString()) {
            child.setAttribute(PHX_SKIP, "");
            child.innerHTML = "";
          }
        });
        Array.from(template.content.childNodes).forEach((el) => diffContainer.insertBefore(el, firstComponent));
        firstComponent.remove();
        return diffContainer.outerHTML;
      }
    }
  };
  var Rendered = class {
    static extract(diff) {
      let { [REPLY]: reply, [EVENTS]: events, [TITLE]: title } = diff;
      delete diff[REPLY];
      delete diff[EVENTS];
      delete diff[TITLE];
      return { diff, title, reply: reply || null, events: events || [] };
    }
    constructor(viewId, rendered) {
      this.viewId = viewId;
      this.rendered = {};
      this.mergeDiff(rendered);
    }
    parentViewId() {
      return this.viewId;
    }
    toString(onlyCids) {
      return this.recursiveToString(this.rendered, this.rendered[COMPONENTS], onlyCids);
    }
    recursiveToString(rendered, components = rendered[COMPONENTS], onlyCids) {
      onlyCids = onlyCids ? new Set(onlyCids) : null;
      let output = { buffer: "", components, onlyCids };
      this.toOutputBuffer(rendered, null, output);
      return output.buffer;
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
    mergeDiff(diff) {
      let newc = diff[COMPONENTS];
      let cache = {};
      delete diff[COMPONENTS];
      this.rendered = this.mutableMerge(this.rendered, diff);
      this.rendered[COMPONENTS] = this.rendered[COMPONENTS] || {};
      if (newc) {
        let oldc = this.rendered[COMPONENTS];
        for (let cid in newc) {
          newc[cid] = this.cachedFindComponent(cid, newc[cid], oldc, newc, cache);
        }
        for (let cid in newc) {
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
          ndiff = this.cloneMerge(tdiff, cdiff);
          ndiff[STATIC] = stat;
        } else {
          ndiff = cdiff[STATIC] !== void 0 ? cdiff : this.cloneMerge(oldc[cid] || {}, cdiff);
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
      for (let key in source) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          this.doMutableMerge(targetVal, val);
        } else {
          target[key] = val;
        }
      }
    }
    cloneMerge(target, source) {
      let merged = __spreadValues(__spreadValues({}, target), source);
      for (let key in merged) {
        let val = source[key];
        let targetVal = target[key];
        if (isObject(val) && val[STATIC] === void 0 && isObject(targetVal)) {
          merged[key] = this.cloneMerge(targetVal, val);
        }
      }
      return merged;
    }
    componentToString(cid) {
      return this.recursiveCIDToString(this.rendered[COMPONENTS], cid);
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
    toOutputBuffer(rendered, templates, output) {
      if (rendered[DYNAMICS]) {
        return this.comprehensionToBuffer(rendered, templates, output);
      }
      let { [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      output.buffer += statics[0];
      for (let i = 1; i < statics.length; i++) {
        this.dynamicToBuffer(rendered[i - 1], templates, output);
        output.buffer += statics[i];
      }
    }
    comprehensionToBuffer(rendered, templates, output) {
      let { [DYNAMICS]: dynamics, [STATIC]: statics } = rendered;
      statics = this.templateStatic(statics, templates);
      let compTemplates = templates || rendered[TEMPLATES];
      for (let d = 0; d < dynamics.length; d++) {
        let dynamic = dynamics[d];
        output.buffer += statics[0];
        for (let i = 1; i < statics.length; i++) {
          this.dynamicToBuffer(dynamic[i - 1], compTemplates, output);
          output.buffer += statics[i];
        }
      }
    }
    dynamicToBuffer(rendered, templates, output) {
      if (typeof rendered === "number") {
        output.buffer += this.recursiveCIDToString(output.components, rendered, output.onlyCids);
      } else if (isObject(rendered)) {
        this.toOutputBuffer(rendered, templates, output);
      } else {
        output.buffer += rendered;
      }
    }
    recursiveCIDToString(components, cid, onlyCids) {
      let component = components[cid] || logError(`no component for CID ${cid}`, components);
      let template = document.createElement("template");
      template.innerHTML = this.recursiveToString(component, components, onlyCids);
      let container = template.content;
      let skip = onlyCids && !onlyCids.has(cid);
      let [hasChildNodes, hasChildComponents] = Array.from(container.childNodes).reduce(([hasNodes, hasComponents], child, i) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.getAttribute(PHX_COMPONENT)) {
            return [hasNodes, true];
          }
          child.setAttribute(PHX_COMPONENT, cid);
          if (!child.id) {
            child.id = `${this.parentViewId()}-${cid}-${i}`;
          }
          if (skip) {
            child.setAttribute(PHX_SKIP, "");
            child.innerHTML = "";
          }
          return [true, hasComponents];
        } else {
          if (child.nodeValue.trim() !== "") {
            logError(`only HTML element tags are allowed at the root of components.

got: "${child.nodeValue.trim()}"

within:
`, template.innerHTML.trim());
            child.replaceWith(this.createSpan(child.nodeValue, cid));
            return [true, hasComponents];
          } else {
            child.remove();
            return [hasNodes, hasComponents];
          }
        }
      }, [false, false]);
      if (!hasChildNodes && !hasChildComponents) {
        logError("expected at least one HTML element tag inside a component, but the component is empty:\n", template.innerHTML.trim());
        return this.createSpan("", cid).outerHTML;
      } else if (!hasChildNodes && hasChildComponents) {
        logError("expected at least one HTML element tag directly inside a component, but only subcomponents were found. A component must render at least one HTML tag directly inside itself.", template.innerHTML.trim());
        return template.innerHTML;
      } else {
        return template.innerHTML;
      }
    }
    createSpan(text, cid) {
      let span = document.createElement("span");
      span.innerText = text;
      span.setAttribute(PHX_COMPONENT, cid);
      return span;
    }
  };
  var viewHookID = 1;
  var ViewHook = class {
    static makeID() {
      return viewHookID++;
    }
    static elementID(el) {
      return el.phxHookId;
    }
    constructor(view, el, callbacks) {
      this.__view = view;
      this.liveSocket = view.liveSocket;
      this.__callbacks = callbacks;
      this.__listeners = /* @__PURE__ */ new Set();
      this.__isDisconnected = false;
      this.el = el;
      this.el.phxHookId = this.constructor.makeID();
      for (let key in this.__callbacks) {
        this[key] = this.__callbacks[key];
      }
    }
    __mounted() {
      this.mounted && this.mounted();
    }
    __updated() {
      this.updated && this.updated();
    }
    __beforeUpdate() {
      this.beforeUpdate && this.beforeUpdate();
    }
    __destroyed() {
      this.destroyed && this.destroyed();
    }
    __reconnected() {
      if (this.__isDisconnected) {
        this.__isDisconnected = false;
        this.reconnected && this.reconnected();
      }
    }
    __disconnected() {
      this.__isDisconnected = true;
      this.disconnected && this.disconnected();
    }
    pushEvent(event, payload = {}, onReply = function() {
    }) {
      return this.__view.pushHookEvent(null, event, payload, onReply);
    }
    pushEventTo(phxTarget, event, payload = {}, onReply = function() {
    }) {
      return this.__view.withinTargets(phxTarget, (view, targetCtx) => {
        return view.pushHookEvent(targetCtx, event, payload, onReply);
      });
    }
    handleEvent(event, callback) {
      let callbackRef = (customEvent, bypass) => bypass ? event : callback(customEvent.detail);
      window.addEventListener(`phx:${event}`, callbackRef);
      this.__listeners.add(callbackRef);
      return callbackRef;
    }
    removeHandleEvent(callbackRef) {
      let event = callbackRef(null, true);
      window.removeEventListener(`phx:${event}`, callbackRef);
      this.__listeners.delete(callbackRef);
    }
    upload(name, files) {
      return this.__view.dispatchUploads(name, files);
    }
    uploadTo(phxTarget, name, files) {
      return this.__view.withinTargets(phxTarget, (view) => view.dispatchUploads(name, files));
    }
    __cleanup__() {
      this.__listeners.forEach((callbackRef) => this.removeHandleEvent(callbackRef));
    }
  };
  var focusStack = null;
  var JS = {
    exec(eventType, phxEvent, view, sourceEl, defaults) {
      let [defaultKind, defaultArgs] = defaults || [null, {}];
      let commands = phxEvent.charAt(0) === "[" ? JSON.parse(phxEvent) : [[defaultKind, defaultArgs]];
      commands.forEach(([kind, args]) => {
        if (kind === defaultKind && defaultArgs.data) {
          args.data = Object.assign(args.data || {}, defaultArgs.data);
        }
        this.filterToEls(sourceEl, args).forEach((el) => {
          this[`exec_${kind}`](eventType, phxEvent, view, sourceEl, el, args);
        });
      });
    },
    isVisible(el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length > 0);
    },
    exec_dispatch(eventType, phxEvent, view, sourceEl, el, { to, event, detail, bubbles }) {
      detail = detail || {};
      detail.dispatcher = sourceEl;
      dom_default.dispatchEvent(el, event, { detail, bubbles });
    },
    exec_push(eventType, phxEvent, view, sourceEl, el, args) {
      if (!view.isConnected()) {
        return;
      }
      let { event, data, target, page_loading, loading, value, dispatcher } = args;
      let pushOpts = { loading, value, target, page_loading: !!page_loading };
      let targetSrc = eventType === "change" && dispatcher ? dispatcher : sourceEl;
      let phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      view.withinTargets(phxTarget, (targetView, targetCtx) => {
        if (eventType === "change") {
          let { newCid, _target, callback } = args;
          _target = _target || (dom_default.isFormInput(sourceEl) ? sourceEl.name : void 0);
          if (_target) {
            pushOpts._target = _target;
          }
          targetView.pushInput(sourceEl, targetCtx, newCid, event || phxEvent, pushOpts, callback);
        } else if (eventType === "submit") {
          targetView.submitForm(sourceEl, targetCtx, event || phxEvent, pushOpts);
        } else {
          targetView.pushEvent(eventType, sourceEl, targetCtx, event || phxEvent, data, pushOpts);
        }
      });
    },
    exec_navigate(eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.historyRedirect(href, replace ? "replace" : "push");
    },
    exec_patch(eventType, phxEvent, view, sourceEl, el, { href, replace }) {
      view.liveSocket.pushHistoryPatch(href, replace ? "replace" : "push", sourceEl);
    },
    exec_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => aria_default.attemptFocus(el));
    },
    exec_focus_first(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => aria_default.focusFirstInteractive(el) || aria_default.focusFirst(el));
    },
    exec_push_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => focusStack = el || sourceEl);
    },
    exec_pop_focus(eventType, phxEvent, view, sourceEl, el) {
      window.requestAnimationFrame(() => {
        if (focusStack) {
          focusStack.focus();
        }
        focusStack = null;
      });
    },
    exec_add_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, names, [], transition, time, view);
    },
    exec_remove_class(eventType, phxEvent, view, sourceEl, el, { names, transition, time }) {
      this.addOrRemoveClasses(el, [], names, transition, time, view);
    },
    exec_transition(eventType, phxEvent, view, sourceEl, el, { time, transition }) {
      let [transition_start, running, transition_end] = transition;
      let onStart = () => this.addOrRemoveClasses(el, transition_start.concat(running), []);
      let onDone = () => this.addOrRemoveClasses(el, transition_end, transition_start.concat(running));
      view.transition(time, onStart, onDone);
    },
    exec_toggle(eventType, phxEvent, view, sourceEl, el, { display, ins, outs, time }) {
      this.toggle(eventType, view, el, display, ins, outs, time);
    },
    exec_show(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.show(eventType, view, el, display, transition, time);
    },
    exec_hide(eventType, phxEvent, view, sourceEl, el, { display, transition, time }) {
      this.hide(eventType, view, el, display, transition, time);
    },
    exec_set_attr(eventType, phxEvent, view, sourceEl, el, { attr: [attr, val] }) {
      this.setOrRemoveAttrs(el, [[attr, val]], []);
    },
    exec_remove_attr(eventType, phxEvent, view, sourceEl, el, { attr }) {
      this.setOrRemoveAttrs(el, [], [attr]);
    },
    show(eventType, view, el, display, transition, time) {
      if (!this.isVisible(el)) {
        this.toggle(eventType, view, el, display, transition, null, time);
      }
    },
    hide(eventType, view, el, display, transition, time) {
      if (this.isVisible(el)) {
        this.toggle(eventType, view, el, display, null, transition, time);
      }
    },
    toggle(eventType, view, el, display, ins, outs, time) {
      let [inClasses, inStartClasses, inEndClasses] = ins || [[], [], []];
      let [outClasses, outStartClasses, outEndClasses] = outs || [[], [], []];
      if (inClasses.length > 0 || outClasses.length > 0) {
        if (this.isVisible(el)) {
          let onStart = () => {
            this.addOrRemoveClasses(el, outStartClasses, inClasses.concat(inStartClasses).concat(inEndClasses));
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, outClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, outEndClasses, outStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:hide-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], outClasses.concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = "none");
            el.dispatchEvent(new Event("phx:hide-end"));
          });
        } else {
          if (eventType === "remove") {
            return;
          }
          let onStart = () => {
            this.addOrRemoveClasses(el, inStartClasses, outClasses.concat(outStartClasses).concat(outEndClasses));
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = display || "block");
            window.requestAnimationFrame(() => {
              this.addOrRemoveClasses(el, inClasses, []);
              window.requestAnimationFrame(() => this.addOrRemoveClasses(el, inEndClasses, inStartClasses));
            });
          };
          el.dispatchEvent(new Event("phx:show-start"));
          view.transition(time, onStart, () => {
            this.addOrRemoveClasses(el, [], inClasses.concat(inEndClasses));
            el.dispatchEvent(new Event("phx:show-end"));
          });
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
            dom_default.putSticky(el, "toggle", (currentEl) => currentEl.style.display = display || "block");
            el.dispatchEvent(new Event("phx:show-end"));
          });
        }
      }
    },
    addOrRemoveClasses(el, adds, removes, transition, time, view) {
      let [transition_run, transition_start, transition_end] = transition || [[], [], []];
      if (transition_run.length > 0) {
        let onStart = () => this.addOrRemoveClasses(el, transition_start.concat(transition_run), []);
        let onDone = () => this.addOrRemoveClasses(el, adds.concat(transition_end), removes.concat(transition_run).concat(transition_start));
        return view.transition(time, onStart, onDone);
      }
      window.requestAnimationFrame(() => {
        let [prevAdds, prevRemoves] = dom_default.getSticky(el, "classes", [[], []]);
        let keepAdds = adds.filter((name) => prevAdds.indexOf(name) < 0 && !el.classList.contains(name));
        let keepRemoves = removes.filter((name) => prevRemoves.indexOf(name) < 0 && el.classList.contains(name));
        let newAdds = prevAdds.filter((name) => removes.indexOf(name) < 0).concat(keepAdds);
        let newRemoves = prevRemoves.filter((name) => adds.indexOf(name) < 0).concat(keepRemoves);
        dom_default.putSticky(el, "classes", (currentEl) => {
          currentEl.classList.remove(...newRemoves);
          currentEl.classList.add(...newAdds);
          return [newAdds, newRemoves];
        });
      });
    },
    setOrRemoveAttrs(el, sets, removes) {
      let [prevSets, prevRemoves] = dom_default.getSticky(el, "attrs", [[], []]);
      let alteredAttrs = sets.map(([attr, _val]) => attr).concat(removes);
      let newSets = prevSets.filter(([attr, _val]) => !alteredAttrs.includes(attr)).concat(sets);
      let newRemoves = prevRemoves.filter((attr) => !alteredAttrs.includes(attr)).concat(removes);
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
    filterToEls(sourceEl, { to }) {
      return to ? dom_default.all(document, to) : [sourceEl];
    }
  };
  var js_default = JS;
  var serializeForm = (form, meta, onlyNames = []) => {
    let formData = new FormData(form);
    let toRemove = [];
    formData.forEach((val, key, _index) => {
      if (val instanceof File) {
        toRemove.push(key);
      }
    });
    toRemove.forEach((key) => formData.delete(key));
    let params = new URLSearchParams();
    for (let [key, val] of formData.entries()) {
      if (onlyNames.length === 0 || onlyNames.indexOf(key) >= 0) {
        params.append(key, val);
      }
    }
    for (let metaKey in meta) {
      params.append(metaKey, meta[metaKey]);
    }
    return params.toString();
  };
  var View = class {
    constructor(el, liveSocket2, parentView, flash, liveReferer) {
      this.isDead = false;
      this.liveSocket = liveSocket2;
      this.flash = flash;
      this.parent = parentView;
      this.root = parentView ? parentView.root : this;
      this.el = el;
      this.id = this.el.id;
      this.ref = 0;
      this.childJoins = 0;
      this.loaderTimer = null;
      this.pendingDiffs = [];
      this.pruningCIDs = [];
      this.redirect = false;
      this.href = null;
      this.joinCount = this.parent ? this.parent.joinCount - 1 : 0;
      this.joinPending = true;
      this.destroyed = false;
      this.joinCallback = function(onDone) {
        onDone && onDone();
      };
      this.stopCallback = function() {
      };
      this.pendingJoinOps = this.parent ? null : [];
      this.viewHooks = {};
      this.uploaders = {};
      this.formSubmits = [];
      this.children = this.parent ? null : {};
      this.root.children[this.id] = {};
      this.channel = this.liveSocket.channel(`lv:${this.id}`, () => {
        return {
          redirect: this.redirect ? this.href : void 0,
          url: this.redirect ? void 0 : this.href || void 0,
          params: this.connectParams(liveReferer),
          session: this.getSession(),
          static: this.getStatic(),
          flash: this.flash
        };
      });
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
      let params = this.liveSocket.params(this.el);
      let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
      params["_live_referer"] = liveReferer;
      return params;
    }
    isConnected() {
      return this.channel.canPush();
    }
    getSession() {
      return this.el.getAttribute(PHX_SESSION);
    }
    getStatic() {
      let val = this.el.getAttribute(PHX_STATIC);
      return val === "" ? null : val;
    }
    destroy(callback = function() {
    }) {
      this.destroyAllChildren();
      this.destroyed = true;
      delete this.root.children[this.id];
      if (this.parent) {
        delete this.root.children[this.parent.id][this.id];
      }
      clearTimeout(this.loaderTimer);
      let onFinished = () => {
        callback();
        for (let id in this.viewHooks) {
          this.destroyHook(this.viewHooks[id]);
        }
      };
      dom_default.markPhxChildDestroyed(this.el);
      this.log("destroyed", () => ["the child has been removed from the parent"]);
      this.channel.leave().receive("ok", onFinished).receive("error", onFinished).receive("timeout", onFinished);
    }
    setContainerClasses(...classes) {
      this.el.classList.remove(PHX_CONNECTED_CLASS, PHX_DISCONNECTED_CLASS, PHX_ERROR_CLASS);
      this.el.classList.add(...classes);
    }
    showLoader(timeout) {
      clearTimeout(this.loaderTimer);
      if (timeout) {
        this.loaderTimer = setTimeout(() => this.showLoader(), timeout);
      } else {
        for (let id in this.viewHooks) {
          this.viewHooks[id].__disconnected();
        }
        this.setContainerClasses(PHX_DISCONNECTED_CLASS);
      }
    }
    execAll(binding) {
      dom_default.all(this.el, `[${binding}]`, (el) => this.liveSocket.execJS(el, el.getAttribute(binding)));
    }
    hideLoader() {
      clearTimeout(this.loaderTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
      this.execAll(this.binding("connected"));
    }
    triggerReconnected() {
      for (let id in this.viewHooks) {
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
    withinTargets(phxTarget, callback) {
      if (phxTarget instanceof HTMLElement || phxTarget instanceof SVGElement) {
        return this.liveSocket.owner(phxTarget, (view) => callback(view, phxTarget));
      }
      if (isCid(phxTarget)) {
        let targets = dom_default.findComponentNodeList(this.el, phxTarget);
        if (targets.length === 0) {
          logError(`no component found matching phx-target of ${phxTarget}`);
        } else {
          callback(this, parseInt(phxTarget));
        }
      } else {
        let targets = Array.from(document.querySelectorAll(phxTarget));
        if (targets.length === 0) {
          logError(`nothing found matching the phx-target selector "${phxTarget}"`);
        }
        targets.forEach((target) => this.liveSocket.owner(target, (view) => callback(view, target)));
      }
    }
    applyDiff(type, rawDiff, callback) {
      this.log(type, () => ["", clone(rawDiff)]);
      let { diff, reply, events, title } = Rendered.extract(rawDiff);
      callback({ diff, reply, events });
      if (title) {
        window.requestAnimationFrame(() => dom_default.putTitle(title));
      }
    }
    onJoin(resp) {
      let { rendered, container } = resp;
      if (container) {
        let [tag, attrs] = container;
        this.el = dom_default.replaceRootContainer(this.el, tag, attrs);
      }
      this.childJoins = 0;
      this.joinPending = true;
      this.flash = null;
      browser_default.dropLocal(this.liveSocket.localStorage, window.location.pathname, CONSECUTIVE_RELOADS);
      this.applyDiff("mount", rendered, ({ diff, events }) => {
        this.rendered = new Rendered(this.id, diff);
        let html = this.renderContainer(null, "join");
        this.dropPendingRefs();
        let forms = this.formsForRecovery(html);
        this.joinCount++;
        if (forms.length > 0) {
          forms.forEach(([form, newForm, newCid], i) => {
            this.pushFormRecovery(form, newCid, (resp2) => {
              if (i === forms.length - 1) {
                this.onJoinComplete(resp2, html, events);
              }
            });
          });
        } else {
          this.onJoinComplete(resp, html, events);
        }
      });
    }
    dropPendingRefs() {
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}]`, (el) => {
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
      });
    }
    onJoinComplete({ live_patch }, html, events) {
      if (this.joinCount > 1 || this.parent && !this.parent.isJoinPending()) {
        return this.applyJoinPatch(live_patch, html, events);
      }
      let newChildren = dom_default.findPhxChildrenInFragment(html, this.id).filter((toEl) => {
        let fromEl = toEl.id && this.el.querySelector(`[id="${toEl.id}"]`);
        let phxStatic = fromEl && fromEl.getAttribute(PHX_STATIC);
        if (phxStatic) {
          toEl.setAttribute(PHX_STATIC, phxStatic);
        }
        return this.joinChild(toEl);
      });
      if (newChildren.length === 0) {
        if (this.parent) {
          this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, events)]);
          this.parent.ackJoin(this);
        } else {
          this.onAllChildJoinsComplete();
          this.applyJoinPatch(live_patch, html, events);
        }
      } else {
        this.root.pendingJoinOps.push([this, () => this.applyJoinPatch(live_patch, html, events)]);
      }
    }
    attachTrueDocEl() {
      this.el = dom_default.byId(this.id);
      this.el.setAttribute(PHX_ROOT_ID, this.root.id);
    }
    execNewMounted() {
      dom_default.all(this.el, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        this.maybeAddNewHook(hookEl);
      });
      dom_default.all(this.el, `[${this.binding(PHX_MOUNTED)}]`, (el) => this.maybeMounted(el));
    }
    applyJoinPatch(live_patch, html, events) {
      this.attachTrueDocEl();
      let patch = new DOMPatch(this, this.el, this.id, html, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false);
      this.joinNewChildren();
      this.execNewMounted();
      this.joinPending = false;
      this.liveSocket.dispatchEvents(events);
      this.applyPendingUpdates();
      if (live_patch) {
        let { kind, to } = live_patch;
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
      let hook = this.getHook(fromEl);
      let isIgnored = hook && dom_default.isIgnored(fromEl, this.binding(PHX_UPDATE));
      if (hook && !fromEl.isEqualNode(toEl) && !(isIgnored && isEqualObj(fromEl.dataset, toEl.dataset))) {
        hook.__beforeUpdate();
        return hook;
      }
    }
    maybeMounted(el) {
      let phxMounted = el.getAttribute(this.binding(PHX_MOUNTED));
      let hasBeenInvoked = phxMounted && dom_default.private(el, "mounted");
      if (phxMounted && !hasBeenInvoked) {
        this.liveSocket.execJS(el, phxMounted);
        dom_default.putPrivate(el, "mounted", true);
      }
    }
    maybeAddNewHook(el, force) {
      let newHook = this.addHook(el);
      if (newHook) {
        newHook.__mounted();
      }
    }
    performPatch(patch, pruneCids) {
      let removedEls = [];
      let phxChildrenAdded = false;
      let updatedHookIds = /* @__PURE__ */ new Set();
      patch.after("added", (el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        this.maybeAddNewHook(el);
        if (el.getAttribute) {
          this.maybeMounted(el);
        }
      });
      patch.after("phxChildAdded", (el) => {
        if (dom_default.isPhxSticky(el)) {
          this.liveSocket.joinRootViews();
        } else {
          phxChildrenAdded = true;
        }
      });
      patch.before("updated", (fromEl, toEl) => {
        let hook = this.triggerBeforeUpdateHook(fromEl, toEl);
        if (hook) {
          updatedHookIds.add(fromEl.id);
        }
      });
      patch.after("updated", (el) => {
        if (updatedHookIds.has(el.id)) {
          this.getHook(el).__updated();
        }
      });
      patch.after("discarded", (el) => {
        if (el.nodeType === Node.ELEMENT_NODE) {
          removedEls.push(el);
        }
      });
      patch.after("transitionsDiscarded", (els) => this.afterElementsRemoved(els, pruneCids));
      patch.perform();
      this.afterElementsRemoved(removedEls, pruneCids);
      return phxChildrenAdded;
    }
    afterElementsRemoved(elements, pruneCids) {
      let destroyedCIDs = [];
      elements.forEach((parent) => {
        let components = dom_default.all(parent, `[${PHX_COMPONENT}]`);
        let hooks = dom_default.all(parent, `[${this.binding(PHX_HOOK)}]`);
        components.concat(parent).forEach((el) => {
          let cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
            destroyedCIDs.push(cid);
          }
        });
        hooks.concat(parent).forEach((hookEl) => {
          let hook = this.getHook(hookEl);
          hook && this.destroyHook(hook);
        });
      });
      if (pruneCids) {
        this.maybePushComponentsDestroyed(destroyedCIDs);
      }
    }
    joinNewChildren() {
      dom_default.findPhxChildren(this.el, this.id).forEach((el) => this.joinChild(el));
    }
    getChildById(id) {
      return this.root.children[this.id][id];
    }
    getDescendentByEl(el) {
      if (el.id === this.id) {
        return this;
      } else {
        return this.children[el.getAttribute(PHX_PARENT_ID)][el.id];
      }
    }
    destroyDescendent(id) {
      for (let parentId in this.root.children) {
        for (let childId in this.root.children[parentId]) {
          if (childId === id) {
            return this.root.children[parentId][childId].destroy();
          }
        }
      }
    }
    joinChild(el) {
      let child = this.getChildById(el.id);
      if (!child) {
        let view = new View(el, this.liveSocket, this);
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
      this.joinCallback(() => {
        this.pendingJoinOps.forEach(([view, op]) => {
          if (!view.isDestroyed()) {
            op();
          }
        });
        this.pendingJoinOps = [];
      });
    }
    update(diff, events) {
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && this.root.isMain()) {
        return this.pendingDiffs.push({ diff, events });
      }
      this.rendered.mergeDiff(diff);
      let phxChildrenAdded = false;
      if (this.rendered.isComponentOnlyDiff(diff)) {
        this.liveSocket.time("component patch complete", () => {
          let parentCids = dom_default.findParentCIDs(this.el, this.rendered.componentCIDs(diff));
          parentCids.forEach((parentCID) => {
            if (this.componentPatch(this.rendered.getComponent(diff, parentCID), parentCID)) {
              phxChildrenAdded = true;
            }
          });
        });
      } else if (!isEmpty(diff)) {
        this.liveSocket.time("full patch complete", () => {
          let html = this.renderContainer(diff, "update");
          let patch = new DOMPatch(this, this.el, this.id, html, null);
          phxChildrenAdded = this.performPatch(patch, true);
        });
      }
      this.liveSocket.dispatchEvents(events);
      if (phxChildrenAdded) {
        this.joinNewChildren();
      }
    }
    renderContainer(diff, kind) {
      return this.liveSocket.time(`toString diff (${kind})`, () => {
        let tag = this.el.tagName;
        let cids = diff ? this.rendered.componentCIDs(diff).concat(this.pruningCIDs) : null;
        let html = this.rendered.toString(cids);
        return `<${tag}>${html}</${tag}>`;
      });
    }
    componentPatch(diff, cid) {
      if (isEmpty(diff))
        return false;
      let html = this.rendered.componentToString(cid);
      let patch = new DOMPatch(this, this.el, this.id, html, cid);
      let childrenAdded = this.performPatch(patch, true);
      return childrenAdded;
    }
    getHook(el) {
      return this.viewHooks[ViewHook.elementID(el)];
    }
    addHook(el) {
      if (ViewHook.elementID(el) || !el.getAttribute) {
        return;
      }
      let hookName = el.getAttribute(`data-phx-${PHX_HOOK}`) || el.getAttribute(this.binding(PHX_HOOK));
      if (hookName && !this.ownsElement(el)) {
        return;
      }
      let callbacks = this.liveSocket.getHookCallbacks(hookName);
      if (callbacks) {
        if (!el.id) {
          logError(`no DOM ID for hook "${hookName}". Hooks require a unique ID on each element.`, el);
        }
        let hook = new ViewHook(this, el, callbacks);
        this.viewHooks[ViewHook.elementID(hook.el)] = hook;
        return hook;
      } else if (hookName !== null) {
        logError(`unknown hook found for "${hookName}"`, el);
      }
    }
    destroyHook(hook) {
      hook.__destroyed();
      hook.__cleanup__();
      delete this.viewHooks[ViewHook.elementID(hook.el)];
    }
    applyPendingUpdates() {
      this.pendingDiffs.forEach(({ diff, events }) => this.update(diff, events));
      this.pendingDiffs = [];
      this.eachChild((child) => child.applyPendingUpdates());
    }
    eachChild(callback) {
      let children = this.root.children[this.id] || {};
      for (let id in children) {
        callback(this.getChildById(id));
      }
    }
    onChannel(event, cb) {
      this.liveSocket.onChannel(this.channel, event, (resp) => {
        if (this.isJoinPending()) {
          this.root.pendingJoinOps.push([this, () => cb(resp)]);
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
      let { to, kind, flash } = redir;
      let url = this.expandURL(to);
      this.liveSocket.historyRedirect(url, kind, flash);
    }
    onLivePatch(redir) {
      let { to, kind } = redir;
      this.href = this.expandURL(to);
      this.liveSocket.historyPatch(to, kind);
    }
    expandURL(to) {
      return to.startsWith("/") ? `${window.location.protocol}//${window.location.host}${to}` : to;
    }
    onRedirect({ to, flash }) {
      this.liveSocket.redirect(to, flash);
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
        this.stopCallback = this.liveSocket.withPageLoading({ to: this.href, kind: "initial" });
      }
      this.joinCallback = (onDone) => {
        onDone = onDone || function() {
        };
        callback ? callback(this.joinCount, onDone) : onDone();
      };
      this.liveSocket.wrapPush(this, { timeout: false }, () => {
        return this.channel.join().receive("ok", (data) => {
          if (!this.isDestroyed()) {
            this.liveSocket.requestDOMUpdate(() => this.onJoin(data));
          }
        }).receive("error", (resp) => !this.isDestroyed() && this.onJoinError(resp)).receive("timeout", () => !this.isDestroyed() && this.onJoinError({ reason: "timeout" }));
      });
    }
    onJoinError(resp) {
      if (resp.reason === "unauthorized" || resp.reason === "stale") {
        this.log("error", () => ["unauthorized live_redirect. Falling back to page request", resp]);
        return this.onRedirect({ to: this.href });
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
      if (this.liveSocket.isConnected()) {
        this.liveSocket.reloadWithJitter(this);
      }
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.liveSocket.hasPendingLink() && reason !== "leave") {
        return this.liveSocket.reloadWithJitter(this);
      }
      this.destroyAllChildren();
      this.liveSocket.dropActiveElement(this);
      if (document.activeElement) {
        document.activeElement.blur();
      }
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
        this.displayError();
      }
    }
    displayError() {
      if (this.isMain()) {
        dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: { to: this.href, kind: "error" } });
      }
      this.showLoader();
      this.setContainerClasses(PHX_DISCONNECTED_CLASS, PHX_ERROR_CLASS);
      this.execAll(this.binding("disconnected"));
    }
    pushWithReply(refGenerator, event, payload, onReply = function() {
    }) {
      if (!this.isConnected()) {
        return;
      }
      let [ref, [el], opts] = refGenerator ? refGenerator() : [null, [], {}];
      let onLoadingDone = function() {
      };
      if (opts.page_loading || el && el.getAttribute(this.binding(PHX_PAGE_LOADING)) !== null) {
        onLoadingDone = this.liveSocket.withPageLoading({ kind: "element", target: el });
      }
      if (typeof payload.cid !== "number") {
        delete payload.cid;
      }
      return this.liveSocket.wrapPush(this, { timeout: true }, () => {
        return this.channel.push(event, payload, PUSH_TIMEOUT).receive("ok", (resp) => {
          let finish = (hookReply) => {
            if (resp.redirect) {
              this.onRedirect(resp.redirect);
            }
            if (resp.live_patch) {
              this.onLivePatch(resp.live_patch);
            }
            if (resp.live_redirect) {
              this.onLiveRedirect(resp.live_redirect);
            }
            if (ref !== null) {
              this.undoRefs(ref);
            }
            onLoadingDone();
            onReply(resp, hookReply);
          };
          if (resp.diff) {
            this.liveSocket.requestDOMUpdate(() => {
              this.applyDiff("update", resp.diff, ({ diff, reply, events }) => {
                this.update(diff, events);
                finish(reply);
              });
            });
          } else {
            finish(null);
          }
        });
      });
    }
    undoRefs(ref) {
      if (!this.isConnected()) {
        return;
      }
      dom_default.all(document, `[${PHX_REF_SRC}="${this.id}"][${PHX_REF}="${ref}"]`, (el) => {
        let disabledVal = el.getAttribute(PHX_DISABLED);
        el.removeAttribute(PHX_REF);
        el.removeAttribute(PHX_REF_SRC);
        if (el.getAttribute(PHX_READONLY) !== null) {
          el.readOnly = false;
          el.removeAttribute(PHX_READONLY);
        }
        if (disabledVal !== null) {
          el.disabled = disabledVal === "true" ? true : false;
          el.removeAttribute(PHX_DISABLED);
        }
        PHX_EVENT_CLASSES.forEach((className) => dom_default.removeClass(el, className));
        let disableRestore = el.getAttribute(PHX_DISABLE_WITH_RESTORE);
        if (disableRestore !== null) {
          el.innerText = disableRestore;
          el.removeAttribute(PHX_DISABLE_WITH_RESTORE);
        }
        let toEl = dom_default.private(el, PHX_REF);
        if (toEl) {
          let hook = this.triggerBeforeUpdateHook(el, toEl);
          DOMPatch.patchEl(el, toEl, this.liveSocket.getActiveElement());
          if (hook) {
            hook.__updated();
          }
          dom_default.deletePrivate(el, PHX_REF);
        }
      });
    }
    putRef(elements, event, opts = {}) {
      let newRef = this.ref++;
      let disableWith = this.binding(PHX_DISABLE_WITH);
      if (opts.loading) {
        elements = elements.concat(dom_default.all(document, opts.loading));
      }
      elements.forEach((el) => {
        el.classList.add(`phx-${event}-loading`);
        el.setAttribute(PHX_REF, newRef);
        el.setAttribute(PHX_REF_SRC, this.el.id);
        let disableText = el.getAttribute(disableWith);
        if (disableText !== null) {
          if (!el.getAttribute(PHX_DISABLE_WITH_RESTORE)) {
            el.setAttribute(PHX_DISABLE_WITH_RESTORE, el.innerText);
          }
          if (disableText !== "") {
            el.innerText = disableText;
          }
          el.setAttribute("disabled", "");
        }
      });
      return [newRef, elements, opts];
    }
    componentID(el) {
      let cid = el.getAttribute && el.getAttribute(PHX_COMPONENT);
      return cid ? parseInt(cid) : null;
    }
    targetComponentID(target, targetCtx, opts = {}) {
      if (isCid(targetCtx)) {
        return targetCtx;
      }
      let cidOrSelector = target.getAttribute(this.binding("target"));
      if (isCid(cidOrSelector)) {
        return parseInt(cidOrSelector);
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
        return maybe(targetCtx.closest(`[${PHX_COMPONENT}]`), (el) => this.ownsElement(el) && this.componentID(el));
      } else {
        return null;
      }
    }
    pushHookEvent(targetCtx, event, payload, onReply) {
      if (!this.isConnected()) {
        this.log("hook", () => ["unable to push hook event. LiveView not connected", event, payload]);
        return false;
      }
      let [ref, els, opts] = this.putRef([], "hook");
      this.pushWithReply(() => [ref, els, opts], "event", {
        type: "hook",
        event,
        value: payload,
        cid: this.closestComponentID(targetCtx)
      }, (resp, reply) => onReply(reply, ref));
      return ref;
    }
    extractMeta(el, meta, value) {
      let prefix = this.binding("value-");
      for (let i = 0; i < el.attributes.length; i++) {
        if (!meta) {
          meta = {};
        }
        let name = el.attributes[i].name;
        if (name.startsWith(prefix)) {
          meta[name.replace(prefix, "")] = el.getAttribute(name);
        }
      }
      if (el.value !== void 0) {
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
        for (let key in value) {
          meta[key] = value[key];
        }
      }
      return meta;
    }
    pushEvent(type, el, targetCtx, phxEvent, meta, opts = {}) {
      this.pushWithReply(() => this.putRef([el], type, opts), "event", {
        type,
        event: phxEvent,
        value: this.extractMeta(el, meta, opts.value),
        cid: this.targetComponentID(el, targetCtx, opts)
      });
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
        }, onReply);
      });
    }
    pushInput(inputEl, targetCtx, forceCid, phxEvent, opts, callback) {
      let uploads;
      let cid = isCid(forceCid) ? forceCid : this.targetComponentID(inputEl.form, targetCtx);
      let refGenerator = () => this.putRef([inputEl, inputEl.form], "change", opts);
      let formData;
      if (inputEl.getAttribute(this.binding("change"))) {
        formData = serializeForm(inputEl.form, { _target: opts._target }, [inputEl.name]);
      } else {
        formData = serializeForm(inputEl.form, { _target: opts._target });
      }
      if (dom_default.isUploadInput(inputEl) && inputEl.files && inputEl.files.length > 0) {
        LiveUploader.trackFiles(inputEl, Array.from(inputEl.files));
      }
      uploads = LiveUploader.serializeUploads(inputEl);
      let event = {
        type: "form",
        event: phxEvent,
        value: formData,
        uploads,
        cid
      };
      this.pushWithReply(refGenerator, "event", event, (resp) => {
        dom_default.showError(inputEl, this.liveSocket.binding(PHX_FEEDBACK_FOR));
        if (dom_default.isUploadInput(inputEl) && inputEl.getAttribute("data-phx-auto-upload") !== null) {
          if (LiveUploader.filesAwaitingPreflight(inputEl).length > 0) {
            let [ref, _els] = refGenerator();
            this.uploadFiles(inputEl.form, targetCtx, ref, cid, (_uploads) => {
              callback && callback(resp);
              this.triggerAwaitingSubmit(inputEl.form);
            });
          }
        } else {
          callback && callback(resp);
        }
      });
    }
    triggerAwaitingSubmit(formEl) {
      let awaitingSubmit = this.getScheduledSubmit(formEl);
      if (awaitingSubmit) {
        let [_el, _ref, _opts, callback] = awaitingSubmit;
        this.cancelSubmit(formEl);
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
    cancelSubmit(formEl) {
      this.formSubmits = this.formSubmits.filter(([el, ref, _callback]) => {
        if (el.isSameNode(formEl)) {
          this.undoRefs(ref);
          return false;
        } else {
          return true;
        }
      });
    }
    disableForm(formEl, opts = {}) {
      let filterIgnored = (el) => {
        let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      let filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      let filterButton = (el) => el.tagName == "BUTTON";
      let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
      let formElements = Array.from(formEl.elements);
      let disables = formElements.filter(filterDisables);
      let buttons = formElements.filter(filterButton).filter(filterIgnored);
      let inputs = formElements.filter(filterInput).filter(filterIgnored);
      buttons.forEach((button) => {
        button.setAttribute(PHX_DISABLED, button.disabled);
        button.disabled = true;
      });
      inputs.forEach((input) => {
        input.setAttribute(PHX_READONLY, input.readOnly);
        input.readOnly = true;
        if (input.files) {
          input.setAttribute(PHX_DISABLED, input.disabled);
          input.disabled = true;
        }
      });
      formEl.setAttribute(this.binding(PHX_PAGE_LOADING), "");
      return this.putRef([formEl].concat(disables).concat(buttons).concat(inputs), "submit", opts);
    }
    pushFormSubmit(formEl, targetCtx, phxEvent, opts, onReply) {
      let refGenerator = () => this.disableForm(formEl, opts);
      let cid = this.targetComponentID(formEl, targetCtx);
      if (LiveUploader.hasUploadsInProgress(formEl)) {
        let [ref, _els] = refGenerator();
        let push = () => this.pushFormSubmit(formEl, targetCtx, phxEvent, opts, onReply);
        return this.scheduleSubmit(formEl, ref, opts, push);
      } else if (LiveUploader.inputsAwaitingPreflight(formEl).length > 0) {
        let [ref, els] = refGenerator();
        let proxyRefGen = () => [ref, els, opts];
        this.uploadFiles(formEl, targetCtx, ref, cid, (_uploads) => {
          let formData = serializeForm(formEl, {});
          this.pushWithReply(proxyRefGen, "event", {
            type: "form",
            event: phxEvent,
            value: formData,
            cid
          }, onReply);
        });
      } else {
        let formData = serializeForm(formEl, {});
        this.pushWithReply(refGenerator, "event", {
          type: "form",
          event: phxEvent,
          value: formData,
          cid
        }, onReply);
      }
    }
    uploadFiles(formEl, targetCtx, ref, cid, onComplete) {
      let joinCountAtUpload = this.joinCount;
      let inputEls = LiveUploader.activeFileInputs(formEl);
      let numFileInputsInProgress = inputEls.length;
      inputEls.forEach((inputEl) => {
        let uploader = new LiveUploader(inputEl, this, () => {
          numFileInputsInProgress--;
          if (numFileInputsInProgress === 0) {
            onComplete();
          }
        });
        this.uploaders[inputEl] = uploader;
        let entries = uploader.entries().map((entry) => entry.toPreflightPayload());
        let payload = {
          ref: inputEl.getAttribute(PHX_UPLOAD_REF),
          entries,
          cid: this.targetComponentID(inputEl.form, targetCtx)
        };
        this.log("upload", () => ["sending preflight request", payload]);
        this.pushWithReply(null, "allow_upload", payload, (resp) => {
          this.log("upload", () => ["got preflight response", resp]);
          if (resp.error) {
            this.undoRefs(ref);
            let [entry_ref, reason] = resp.error;
            this.log("upload", () => [`error for entry ${entry_ref}`, reason]);
          } else {
            let onError = (callback) => {
              this.channel.onError(() => {
                if (this.joinCount === joinCountAtUpload) {
                  callback();
                }
              });
            };
            uploader.initAdapterUpload(resp, onError, this.liveSocket);
          }
        });
      });
    }
    dispatchUploads(name, filesOrBlobs) {
      let inputs = dom_default.findUploadInputs(this.el).filter((el) => el.name === name);
      if (inputs.length === 0) {
        logError(`no live file inputs found matching the name "${name}"`);
      } else if (inputs.length > 1) {
        logError(`duplicate live file inputs found matching the name "${name}"`);
      } else {
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { detail: { files: filesOrBlobs } });
      }
    }
    pushFormRecovery(form, newCid, callback) {
      this.liveSocket.withinOwners(form, (view, targetCtx) => {
        let input = form.elements[0];
        let phxEvent = form.getAttribute(this.binding(PHX_AUTO_RECOVER)) || form.getAttribute(this.binding("change"));
        js_default.exec("change", phxEvent, view, input, ["push", { _target: input.name, newCid, callback }]);
      });
    }
    pushLinkPatch(href, targetEl, callback) {
      let linkRef = this.liveSocket.setPendingLink(href);
      let refGen = targetEl ? () => this.putRef([targetEl], "click") : null;
      let fallback = () => this.liveSocket.redirect(window.location.href);
      let push = this.pushWithReply(refGen, "live_patch", { url: href }, (resp) => {
        this.liveSocket.requestDOMUpdate(() => {
          if (resp.link_redirect) {
            this.liveSocket.replaceMain(href, null, callback, linkRef);
          } else {
            if (this.liveSocket.commitPendingLink(linkRef)) {
              this.href = href;
            }
            this.applyPendingUpdates();
            callback && callback(linkRef);
          }
        });
      });
      if (push) {
        push.receive("timeout", fallback);
      } else {
        fallback();
      }
    }
    formsForRecovery(html) {
      if (this.joinCount === 0) {
        return [];
      }
      let phxChange = this.binding("change");
      let template = document.createElement("template");
      template.innerHTML = html;
      return dom_default.all(this.el, `form[${phxChange}]`).filter((form) => form.id && this.ownsElement(form)).filter((form) => form.elements.length > 0).filter((form) => form.getAttribute(this.binding(PHX_AUTO_RECOVER)) !== "ignore").map((form) => {
        let newForm = template.content.querySelector(`form[id="${form.id}"][${phxChange}="${form.getAttribute(phxChange)}"]`);
        if (newForm) {
          return [form, newForm, this.targetComponentID(newForm)];
        } else {
          return [form, null, null];
        }
      }).filter(([form, newForm, newCid]) => newForm);
    }
    maybePushComponentsDestroyed(destroyedCIDs) {
      let willDestroyCIDs = destroyedCIDs.filter((cid) => {
        return dom_default.findComponentNodeList(this.el, cid).length === 0;
      });
      if (willDestroyCIDs.length > 0) {
        this.pruningCIDs.push(...willDestroyCIDs);
        this.pushWithReply(null, "cids_will_destroy", { cids: willDestroyCIDs }, () => {
          this.pruningCIDs = this.pruningCIDs.filter((cid) => willDestroyCIDs.indexOf(cid) !== -1);
          let completelyDestroyCIDs = willDestroyCIDs.filter((cid) => {
            return dom_default.findComponentNodeList(this.el, cid).length === 0;
          });
          if (completelyDestroyCIDs.length > 0) {
            this.pushWithReply(null, "cids_destroyed", { cids: completelyDestroyCIDs }, (resp) => {
              this.rendered.pruneCIDs(resp.cids);
            });
          }
        });
      }
    }
    ownsElement(el) {
      let parentViewEl = el.closest(PHX_VIEW_SELECTOR);
      return el.getAttribute(PHX_PARENT_ID) === this.id || parentViewEl && parentViewEl.id === this.id || !parentViewEl && this.isDead;
    }
    submitForm(form, targetCtx, phxEvent, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      let phxFeedback = this.liveSocket.binding(PHX_FEEDBACK_FOR);
      let inputs = Array.from(form.elements);
      inputs.forEach((input) => dom_default.putPrivate(input, PHX_HAS_SUBMITTED, true));
      this.liveSocket.blurActiveElement(this);
      this.pushFormSubmit(form, targetCtx, phxEvent, opts, () => {
        inputs.forEach((input) => dom_default.showError(input, phxFeedback));
        this.liveSocket.restorePreviouslyActiveFocus();
      });
    }
    binding(kind) {
      return this.liveSocket.binding(kind);
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
      this.opts = opts;
      this.params = closure2(opts.params || {});
      this.viewLogger = opts.viewLogger;
      this.metadataCallbacks = opts.metadata || {};
      this.defaults = Object.assign(clone(DEFAULTS), opts.defaults || {});
      this.activeElement = null;
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
      this.reloadWithJitterTimer = null;
      this.maxReloads = opts.maxReloads || MAX_RELOADS;
      this.reloadJitterMin = opts.reloadJitterMin || RELOAD_JITTER_MIN;
      this.reloadJitterMax = opts.reloadJitterMax || RELOAD_JITTER_MAX;
      this.failsafeJitter = opts.failsafeJitter || FAILSAFE_JITTER;
      this.localStorage = opts.localStorage || window.localStorage;
      this.sessionStorage = opts.sessionStorage || window.sessionStorage;
      this.boundTopLevelEvents = false;
      this.domCallbacks = Object.assign({ onNodeAdded: closure2(), onBeforeElUpdated: closure2() }, opts.dom || {});
      this.transitions = new TransitionSet();
      window.addEventListener("pagehide", (_e) => {
        this.unloaded = true;
      });
      this.socket.onOpen(() => {
        if (this.isUnloaded()) {
          window.location.reload();
        }
      });
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
      this.sessionStorage.setItem(PHX_LV_LATENCY_SIM, upperBoundMs);
    }
    disableLatencySim() {
      this.sessionStorage.removeItem(PHX_LV_LATENCY_SIM);
    }
    getLatencySim() {
      let str = this.sessionStorage.getItem(PHX_LV_LATENCY_SIM);
      return str ? parseInt(str) : null;
    }
    getSocket() {
      return this.socket;
    }
    connect() {
      if (window.location.hostname === "localhost" && !this.isDebugDisabled()) {
        this.enableDebug();
      }
      let doConnect = () => {
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
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.disconnect(callback);
    }
    replaceTransport(transport) {
      clearTimeout(this.reloadWithJitterTimer);
      this.socket.replaceTransport(transport);
      this.connect();
    }
    execJS(el, encodedJS, eventType = null) {
      this.owner(el, (view) => js_default.exec(eventType, encodedJS, view, el));
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
      let result = func();
      console.timeEnd(name);
      return result;
    }
    log(view, kind, msgCallback) {
      if (this.viewLogger) {
        let [msg, obj] = msgCallback();
        this.viewLogger(view, kind, msg, obj);
      } else if (this.isDebugEnabled()) {
        let [msg, obj] = msgCallback();
        debug(view, kind, msg, obj);
      }
    }
    requestDOMUpdate(callback) {
      this.transitions.after(callback);
    }
    transition(time, onStart, onDone = function() {
    }) {
      this.transitions.addTransition(time, onStart, onDone);
    }
    onChannel(channel, event, cb) {
      channel.on(event, (data) => {
        let latency = this.getLatencySim();
        if (!latency) {
          cb(data);
        } else {
          setTimeout(() => cb(data), latency);
        }
      });
    }
    wrapPush(view, opts, push) {
      let latency = this.getLatencySim();
      let oldJoinCount = view.joinCount;
      if (!latency) {
        if (this.isConnected() && opts.timeout) {
          return push().receive("timeout", () => {
            if (view.joinCount === oldJoinCount && !view.isDestroyed()) {
              this.reloadWithJitter(view, () => {
                this.log(view, "timeout", () => ["received timeout while communicating with server. Falling back to hard refresh for recovery"]);
              });
            }
          });
        } else {
          return push();
        }
      }
      let fakePush = {
        receives: [],
        receive(kind, cb) {
          this.receives.push([kind, cb]);
        }
      };
      setTimeout(() => {
        if (view.isDestroyed()) {
          return;
        }
        fakePush.receives.reduce((acc, [kind, cb]) => acc.receive(kind, cb), push());
      }, latency);
      return fakePush;
    }
    reloadWithJitter(view, log) {
      clearTimeout(this.reloadWithJitterTimer);
      this.disconnect();
      let minMs = this.reloadJitterMin;
      let maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      if (tries > this.maxReloads) {
        afterMs = this.failsafeJitter;
      }
      this.reloadWithJitterTimer = setTimeout(() => {
        if (view.isDestroyed() || view.isConnected()) {
          return;
        }
        view.destroy();
        log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
        if (tries > this.maxReloads) {
          this.log(view, "join", () => [`exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`]);
        }
        if (this.hasPendingLink()) {
          window.location = this.pendingLink;
        } else {
          window.location.reload();
        }
      }, afterMs);
    }
    getHookCallbacks(name) {
      return name && name.startsWith("Phoenix.") ? hooks_default[name.split(".")[1]] : this.hooks[name];
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
      let body = document.body;
      if (body && !this.isPhxView(body) && !this.isPhxView(document.firstElementChild)) {
        let view = this.newRootView(body);
        view.setHref(this.getHref());
        view.joinDead();
        if (!this.main) {
          this.main = view;
        }
        window.requestAnimationFrame(() => view.execNewMounted());
      }
    }
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          let view = this.newRootView(rootEl);
          view.setHref(this.getHref());
          view.join();
          if (rootEl.hasAttribute(PHX_MAIN)) {
            this.main = view;
          }
        }
        rootsFound = true;
      });
      return rootsFound;
    }
    redirect(to, flash) {
      this.disconnect();
      browser_default.redirect(to, flash);
    }
    replaceMain(href, flash, callback = null, linkRef = this.setPendingLink(href)) {
      let liveReferer = this.currentLocation.href;
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      let newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash, liveReferer);
      this.main.setRedirect(href);
      this.transitionRemoves();
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            dom_default.findPhxSticky(document).forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && requestAnimationFrame(callback);
            onDone();
          });
        }
      });
    }
    transitionRemoves(elements) {
      let removeAttr = this.binding("remove");
      elements = elements || dom_default.all(document, `[${removeAttr}]`);
      elements.forEach((el) => {
        if (document.body.contains(el)) {
          this.execJS(el, el.getAttribute(removeAttr), "remove");
        }
      });
    }
    isPhxView(el) {
      return el.getAttribute && el.getAttribute(PHX_SESSION) !== null;
    }
    newRootView(el, flash, liveReferer) {
      let view = new View(el, this, null, flash, liveReferer);
      this.roots[view.id] = view;
      return view;
    }
    owner(childEl, callback) {
      let view = maybe(childEl.closest(PHX_VIEW_SELECTOR), (el) => this.getViewByEl(el)) || this.main;
      if (view) {
        callback(view);
      }
    }
    withinOwners(childEl, callback) {
      this.owner(childEl, (view) => callback(view, childEl));
    }
    getViewByEl(el) {
      let rootId = el.getAttribute(PHX_ROOT_ID);
      return maybe(this.getRootById(rootId), (root) => root.getDescendentByEl(el));
    }
    getRootById(id) {
      return this.roots[id];
    }
    destroyAllViews() {
      for (let id in this.roots) {
        this.roots[id].destroy();
        delete this.roots[id];
      }
      this.main = null;
    }
    destroyViewByEl(el) {
      let root = this.getRootById(el.getAttribute(PHX_ROOT_ID));
      if (root && root.id === el.id) {
        root.destroy();
        delete this.roots[root.id];
      } else if (root) {
        root.destroyDescendent(el.id);
      }
    }
    setActiveElement(target) {
      if (this.activeElement === target) {
        return;
      }
      this.activeElement = target;
      let cancel = () => {
        if (target === this.activeElement) {
          this.activeElement = null;
        }
        target.removeEventListener("mouseup", this);
        target.removeEventListener("touchend", this);
      };
      target.addEventListener("mouseup", cancel);
      target.addEventListener("touchend", cancel);
    }
    getActiveElement() {
      if (document.activeElement === document.body) {
        return this.activeElement || document.activeElement;
      } else {
        return document.activeElement || document.body;
      }
    }
    dropActiveElement(view) {
      if (this.prevActive && view.ownsElement(this.prevActive)) {
        this.prevActive = null;
      }
    }
    restorePreviouslyActiveFocus() {
      if (this.prevActive && this.prevActive !== document.body) {
        this.prevActive.focus();
      }
    }
    blurActiveElement() {
      this.prevActive = this.getActiveElement();
      if (this.prevActive !== document.body) {
        this.prevActive.blur();
      }
    }
    bindTopLevelEvents({ dead } = {}) {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.socket.onClose((event) => {
        if (event && event.code === 1001) {
          return this.unload();
        }
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
      this.bind({ keyup: "keyup", keydown: "keydown" }, (e, type, view, targetEl, phxEvent, eventTarget) => {
        let matchKey = targetEl.getAttribute(this.binding(PHX_KEY));
        let pressedKey = e.key && e.key.toLowerCase();
        if (matchKey && matchKey.toLowerCase() !== pressedKey) {
          return;
        }
        let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
        js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
      });
      this.bind({ blur: "focusout", focus: "focusin" }, (e, type, view, targetEl, phxEvent, eventTarget) => {
        if (!eventTarget) {
          let data = __spreadValues({ key: e.key }, this.eventMeta(type, e, targetEl));
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      this.bind({ blur: "blur", focus: "focus" }, (e, type, view, targetEl, targetCtx, phxEvent, phxTarget) => {
        if (phxTarget === "window") {
          let data = this.eventMeta(type, e, targetEl);
          js_default.exec(type, phxEvent, view, targetEl, ["push", { data }]);
        }
      });
      window.addEventListener("dragover", (e) => e.preventDefault());
      window.addEventListener("drop", (e) => {
        e.preventDefault();
        let dropTargetId = maybe(closestPhxBinding(e.target, this.binding(PHX_DROP_TARGET)), (trueTarget) => {
          return trueTarget.getAttribute(this.binding(PHX_DROP_TARGET));
        });
        let dropTarget = dropTargetId && document.getElementById(dropTargetId);
        let files = Array.from(e.dataTransfer.files || []);
        if (!dropTarget || dropTarget.disabled || files.length === 0 || !(dropTarget.files instanceof FileList)) {
          return;
        }
        LiveUploader.trackFiles(dropTarget, files);
        dropTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
      this.on(PHX_TRACK_UPLOADS, (e) => {
        let uploadTarget = e.target;
        if (!dom_default.isUploadInput(uploadTarget)) {
          return;
        }
        let files = Array.from(e.detail.files || []).filter((f) => f instanceof File || f instanceof Blob);
        LiveUploader.trackFiles(uploadTarget, files);
        uploadTarget.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
    eventMeta(eventName, e, targetEl) {
      let callback = this.metadataCallbacks[eventName];
      return callback ? callback(e, targetEl) : {};
    }
    setPendingLink(href) {
      this.linkRef++;
      this.pendingLink = href;
      return this.linkRef;
    }
    commitPendingLink(linkRef) {
      if (this.linkRef !== linkRef) {
        return false;
      } else {
        this.href = this.pendingLink;
        this.pendingLink = null;
        return true;
      }
    }
    getHref() {
      return this.href;
    }
    hasPendingLink() {
      return !!this.pendingLink;
    }
    bind(events, callback) {
      for (let event in events) {
        let browserEventName = events[event];
        this.on(browserEventName, (e) => {
          let binding = this.binding(event);
          let windowBinding = this.binding(`window-${event}`);
          let targetPhxEvent = e.target.getAttribute && e.target.getAttribute(binding);
          if (targetPhxEvent) {
            this.debounce(e.target, e, browserEventName, () => {
              this.withinOwners(e.target, (view) => {
                callback(e, event, view, e.target, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              let phxEvent = el.getAttribute(windowBinding);
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
      window.addEventListener("click", (e) => this.clickStartedAtTarget = e.target);
      this.bindClick("click", "click", false);
      this.bindClick("mousedown", "capture-click", true);
    }
    bindClick(eventName, bindingName, capture) {
      let click = this.binding(bindingName);
      window.addEventListener(eventName, (e) => {
        let target = null;
        if (capture) {
          target = e.target.matches(`[${click}]`) ? e.target : e.target.querySelector(`[${click}]`);
        } else {
          let clickStartedAtTarget = this.clickStartedAtTarget || e.target;
          target = closestPhxBinding(clickStartedAtTarget, click);
          this.dispatchClickAway(e, clickStartedAtTarget);
          this.clickStartedAtTarget = null;
        }
        let phxEvent = target && target.getAttribute(click);
        if (!phxEvent) {
          let href = e.target.href;
          if (!capture && href !== void 0 && !dom_default.wantsNewTab(e) && dom_default.isNewPageHref(href, window.location)) {
            this.unload();
          }
          return;
        }
        if (target.getAttribute("href") === "#") {
          e.preventDefault();
        }
        this.debounce(target, e, "click", () => {
          this.withinOwners(target, (view) => {
            js_default.exec("click", phxEvent, view, target, ["push", { data: this.eventMeta("click", e, target) }]);
          });
        });
      }, capture);
    }
    dispatchClickAway(e, clickStartedAt) {
      let phxClickAway = this.binding("click-away");
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        if (!(el.isSameNode(clickStartedAt) || el.contains(clickStartedAt))) {
          this.withinOwners(e.target, (view) => {
            let phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el)) {
              js_default.exec("click", phxEvent, view, el, ["push", { data: this.eventMeta("click", e, e.target) }]);
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
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
          browser_default.updateCurrentState((state) => Object.assign(state, { scroll: window.scrollY }));
        }, 100);
      });
      window.addEventListener("popstate", (event) => {
        if (!this.registerNewLocation(window.location)) {
          return;
        }
        let { type, id, root, scroll } = event.state || {};
        let href = window.location.href;
        this.requestDOMUpdate(() => {
          if (this.main.isConnected() && (type === "patch" && id === this.main.id)) {
            this.main.pushLinkPatch(href, null);
          } else {
            this.replaceMain(href, null, () => {
              if (root) {
                this.replaceRootHistory();
              }
              if (typeof scroll === "number") {
                setTimeout(() => {
                  window.scrollTo(0, scroll);
                }, 0);
              }
            });
          }
        });
      }, false);
      window.addEventListener("click", (e) => {
        let target = closestPhxBinding(e.target, PHX_LIVE_LINK);
        let type = target && target.getAttribute(PHX_LIVE_LINK);
        if (!type || !this.isConnected() || !this.main || dom_default.wantsNewTab(e)) {
          return;
        }
        let href = target.href;
        let linkState = target.getAttribute(PHX_LINK_STATE);
        e.preventDefault();
        e.stopImmediatePropagation();
        if (this.pendingLink === href) {
          return;
        }
        this.requestDOMUpdate(() => {
          if (type === "patch") {
            this.pushHistoryPatch(href, linkState, target);
          } else if (type === "redirect") {
            this.historyRedirect(href, linkState);
          } else {
            throw new Error(`expected ${PHX_LIVE_LINK} to be "patch" or "redirect", got: ${type}`);
          }
          let phxClick = target.getAttribute(this.binding("click"));
          if (phxClick) {
            this.requestDOMUpdate(() => this.execJS(target, phxClick, "click"));
          }
        });
      }, false);
    }
    dispatchEvent(event, payload = {}) {
      dom_default.dispatchEvent(window, `phx:${event}`, { detail: payload });
    }
    dispatchEvents(events) {
      events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", { detail: info });
      let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", { detail: info });
      return callback ? callback(done) : done;
    }
    pushHistoryPatch(href, linkState, targetEl) {
      if (!this.isConnected()) {
        return browser_default.redirect(href);
      }
      this.withPageLoading({ to: href, kind: "patch" }, (done) => {
        this.main.pushLinkPatch(href, targetEl, (linkRef) => {
          this.historyPatch(href, linkState, linkRef);
          done();
        });
      });
    }
    historyPatch(href, linkState, linkRef = this.setPendingLink(href)) {
      if (!this.commitPendingLink(linkRef)) {
        return;
      }
      browser_default.pushState(linkState, { type: "patch", id: this.main.id }, href);
      this.registerNewLocation(window.location);
    }
    historyRedirect(href, linkState, flash) {
      if (!this.isConnected()) {
        return browser_default.redirect(href, flash);
      }
      if (/^\/$|^\/[^\/]+.*$/.test(href)) {
        let { protocol, host } = window.location;
        href = `${protocol}//${host}${href}`;
      }
      let scroll = window.scrollY;
      this.withPageLoading({ to: href, kind: "redirect" }, (done) => {
        this.replaceMain(href, flash, () => {
          browser_default.pushState(linkState, { type: "redirect", id: this.main.id, scroll }, href);
          this.registerNewLocation(window.location);
          done();
        });
      });
    }
    replaceRootHistory() {
      browser_default.pushState("replace", { root: true, type: "patch", id: this.main.id });
    }
    registerNewLocation(newLocation) {
      let { pathname, search } = this.currentLocation;
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
        let phxSubmit = e.target.getAttribute(this.binding("submit"));
        let phxChange = e.target.getAttribute(this.binding("change"));
        if (!externalFormSubmitted && phxChange && !phxSubmit) {
          externalFormSubmitted = true;
          e.preventDefault();
          this.unload();
          this.withinOwners(e.target, (view) => {
            view.disableForm(e.target);
            window.requestAnimationFrame(() => e.target.submit());
          });
        }
      }, true);
      this.on("submit", (e) => {
        let phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          return this.unload();
        }
        e.preventDefault();
        e.target.disabled = true;
        this.withinOwners(e.target, (view) => {
          js_default.exec("submit", phxEvent, view, e.target, ["push", {}]);
        });
      }, false);
      for (let type of ["change", "input"]) {
        this.on(type, (e) => {
          let phxChange = this.binding("change");
          let input = e.target;
          let inputEvent = input.getAttribute(phxChange);
          let formEvent = input.form && input.form.getAttribute(phxChange);
          let phxEvent = inputEvent || formEvent;
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          let dispatcher = inputEvent ? input : input.form;
          let currentIterations = iterations;
          iterations++;
          let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type !== lastType) {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
          this.debounce(input, e, type, () => {
            this.withinOwners(dispatcher, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              if (!dom_default.isTextualInput(input)) {
                this.setActiveElement(input);
              }
              js_default.exec("change", phxEvent, view, input, ["push", { _target: e.target.name, dispatcher }]);
            });
          });
        }, false);
      }
    }
    debounce(el, event, eventType, callback) {
      if (eventType === "blur" || eventType === "focusout") {
        return callback();
      }
      let phxDebounce = this.binding(PHX_DEBOUNCE);
      let phxThrottle = this.binding(PHX_THROTTLE);
      let defaultDebounce = this.defaults.debounce.toString();
      let defaultThrottle = this.defaults.throttle.toString();
      this.withinOwners(el, (view) => {
        let asyncFilter = () => !view.isDestroyed() && document.body.contains(el);
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
      window.addEventListener(event, (e) => {
        if (!this.silenced) {
          callback(e);
        }
      });
    }
  };
  var TransitionSet = class {
    constructor() {
      this.transitions = /* @__PURE__ */ new Set();
      this.pendingOps = [];
      this.reset();
    }
    reset() {
      this.transitions.forEach((timer) => {
        clearTimeout(timer);
        this.transitions.delete(timer);
      });
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
      let timer = setTimeout(() => {
        this.transitions.delete(timer);
        onDone();
        if (this.size() === 0) {
          this.flushPendingOps();
        }
      }, time);
      this.transitions.add(timer);
    }
    pushPendingOp(op) {
      this.pendingOps.push(op);
    }
    size() {
      return this.transitions.size;
    }
    flushPendingOps() {
      this.pendingOps.forEach((op) => op());
      this.pendingOps = [];
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9sb2Rhc2gudGhyb3R0bGUvaW5kZXguanMiLCAiLi4vLi4vLi4vYXNzZXRzL3ZlbmRvci90b3BiYXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2h0bWwvcHJpdi9zdGF0aWMvcGhvZW5peF9odG1sLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC91dGlscy5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9wdXNoLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC90aW1lci5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY2hhbm5lbC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvYWpheC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvbG9uZ3BvbGwuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3ByZXNlbmNlLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zZXJpYWxpemVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zb2NrZXQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2VudHJ5X3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3V0aWxzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2Jyb3dzZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3VwbG9hZF9lbnRyeS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2FyaWEuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvaG9va3MuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tX3Bvc3RfbW9ycGhfcmVzdG9yZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvbm9kZV9tb2R1bGVzL21vcnBoZG9tL2Rpc3QvbW9ycGhkb20tZXNtLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2RvbV9wYXRjaC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9yZW5kZXJlZC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy92aWV3X2hvb2suanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvanMuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvdmlldy5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3NvY2tldC5qcyIsICIuLi8uLi8uLi9hc3NldHMvanMvYXBwLmpzIiwgIi4uLy4uLy4uL2Fzc2V0cy9qcy9qc2NvbG9yLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdGhyb3R0bGVkIGZ1bmN0aW9uIHRoYXQgb25seSBpbnZva2VzIGBmdW5jYCBhdCBtb3N0IG9uY2UgcGVyXG4gKiBldmVyeSBgd2FpdGAgbWlsbGlzZWNvbmRzLiBUaGUgdGhyb3R0bGVkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYFxuICogbWV0aG9kIHRvIGNhbmNlbCBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0b1xuICogaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgXG4gKiBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGUgbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgXG4gKiB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWQgd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlXG4gKiB0aHJvdHRsZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIHRocm90dGxlZCBmdW5jdGlvbiByZXR1cm4gdGhlXG4gKiByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8udGhyb3R0bGVgIGFuZCBgXy5kZWJvdW5jZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB0aHJvdHRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aHJvdHRsZSBpbnZvY2F0aW9ucyB0by5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB0aHJvdHRsZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGV4Y2Vzc2l2ZWx5IHVwZGF0aW5nIHRoZSBwb3NpdGlvbiB3aGlsZSBzY3JvbGxpbmcuXG4gKiBqUXVlcnkod2luZG93KS5vbignc2Nyb2xsJywgXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKSk7XG4gKlxuICogLy8gSW52b2tlIGByZW5ld1Rva2VuYCB3aGVuIHRoZSBjbGljayBldmVudCBpcyBmaXJlZCwgYnV0IG5vdCBtb3JlIHRoYW4gb25jZSBldmVyeSA1IG1pbnV0ZXMuXG4gKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZShyZW5ld1Rva2VuLCAzMDAwMDAsIHsgJ3RyYWlsaW5nJzogZmFsc2UgfSk7XG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgdGhyb3R0bGVkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIHRocm90dGxlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhyb3R0bGVkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlYWRpbmcgPSB0cnVlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAnbGVhZGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy5sZWFkaW5nIDogbGVhZGluZztcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG4gIHJldHVybiBkZWJvdW5jZShmdW5jLCB3YWl0LCB7XG4gICAgJ2xlYWRpbmcnOiBsZWFkaW5nLFxuICAgICdtYXhXYWl0Jzogd2FpdCxcbiAgICAndHJhaWxpbmcnOiB0cmFpbGluZ1xuICB9KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCAiLyoqXG4gKiBAbGljZW5zZSBNSVRcbiAqIHRvcGJhciAxLjAuMCwgMjAyMS0wMS0wNlxuICogaHR0cHM6Ly9idXVuZ3V5ZW4uZ2l0aHViLmlvL3RvcGJhclxuICogQ29weXJpZ2h0IChjKSAyMDIxIEJ1dSBOZ3V5ZW5cbiAqL1xuKGZ1bmN0aW9uICh3aW5kb3csIGRvY3VtZW50KSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3BhdWxpcmlzaC8xNTc5NjcxXG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxhc3RUaW1lID0gMDtcbiAgICB2YXIgdmVuZG9ycyA9IFtcIm1zXCIsIFwibW96XCIsIFwid2Via2l0XCIsIFwib1wiXTtcbiAgICBmb3IgKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPVxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID1cbiAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyBcIkNhbmNlbEFuaW1hdGlvbkZyYW1lXCJdIHx8XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcIl07XG4gICAgfVxuICAgIGlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xuICAgICAgICB2YXIgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTtcbiAgICAgICAgfSwgdGltZVRvQ2FsbCk7XG4gICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xuICAgICAgICByZXR1cm4gaWQ7XG4gICAgICB9O1xuICAgIGlmICghd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKVxuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICB9O1xuICB9KSgpO1xuXG4gIHZhciBjYW52YXMsXG4gICAgcHJvZ3Jlc3NUaW1lcklkLFxuICAgIGZhZGVUaW1lcklkLFxuICAgIGN1cnJlbnRQcm9ncmVzcyxcbiAgICBzaG93aW5nLFxuICAgIGFkZEV2ZW50ID0gZnVuY3Rpb24gKGVsZW0sIHR5cGUsIGhhbmRsZXIpIHtcbiAgICAgIGlmIChlbGVtLmFkZEV2ZW50TGlzdGVuZXIpIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICBlbHNlIGlmIChlbGVtLmF0dGFjaEV2ZW50KSBlbGVtLmF0dGFjaEV2ZW50KFwib25cIiArIHR5cGUsIGhhbmRsZXIpO1xuICAgICAgZWxzZSBlbGVtW1wib25cIiArIHR5cGVdID0gaGFuZGxlcjtcbiAgICB9LFxuICAgIG9wdGlvbnMgPSB7XG4gICAgICBhdXRvUnVuOiB0cnVlLFxuICAgICAgYmFyVGhpY2tuZXNzOiAzLFxuICAgICAgYmFyQ29sb3JzOiB7XG4gICAgICAgIDA6IFwicmdiYSgyNiwgIDE4OCwgMTU2LCAuOSlcIixcbiAgICAgICAgXCIuMjVcIjogXCJyZ2JhKDUyLCAgMTUyLCAyMTksIC45KVwiLFxuICAgICAgICBcIi41MFwiOiBcInJnYmEoMjQxLCAxOTYsIDE1LCAgLjkpXCIsXG4gICAgICAgIFwiLjc1XCI6IFwicmdiYSgyMzAsIDEyNiwgMzQsICAuOSlcIixcbiAgICAgICAgXCIxLjBcIjogXCJyZ2JhKDIxMSwgODQsICAwLCAgIC45KVwiLFxuICAgICAgfSxcbiAgICAgIHNoYWRvd0JsdXI6IDEwLFxuICAgICAgc2hhZG93Q29sb3I6IFwicmdiYSgwLCAgIDAsICAgMCwgICAuNilcIixcbiAgICAgIGNsYXNzTmFtZTogbnVsbCxcbiAgICB9LFxuICAgIHJlcGFpbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBjYW52YXMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLmJhclRoaWNrbmVzcyAqIDU7IC8vIG5lZWQgc3BhY2UgZm9yIHNoYWRvd1xuXG4gICAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gb3B0aW9ucy5zaGFkb3dCbHVyO1xuICAgICAgY3R4LnNoYWRvd0NvbG9yID0gb3B0aW9ucy5zaGFkb3dDb2xvcjtcblxuICAgICAgdmFyIGxpbmVHcmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCBjYW52YXMud2lkdGgsIDApO1xuICAgICAgZm9yICh2YXIgc3RvcCBpbiBvcHRpb25zLmJhckNvbG9ycylcbiAgICAgICAgbGluZUdyYWRpZW50LmFkZENvbG9yU3RvcChzdG9wLCBvcHRpb25zLmJhckNvbG9yc1tzdG9wXSk7XG4gICAgICBjdHgubGluZVdpZHRoID0gb3B0aW9ucy5iYXJUaGlja25lc3M7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKDAsIG9wdGlvbnMuYmFyVGhpY2tuZXNzIC8gMik7XG4gICAgICBjdHgubGluZVRvKFxuICAgICAgICBNYXRoLmNlaWwoY3VycmVudFByb2dyZXNzICogY2FudmFzLndpZHRoKSxcbiAgICAgICAgb3B0aW9ucy5iYXJUaGlja25lc3MgLyAyXG4gICAgICApO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gbGluZUdyYWRpZW50O1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH0sXG4gICAgY3JlYXRlQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgIHZhciBzdHlsZSA9IGNhbnZhcy5zdHlsZTtcbiAgICAgIHN0eWxlLnBvc2l0aW9uID0gXCJmaXhlZFwiO1xuICAgICAgc3R5bGUudG9wID0gc3R5bGUubGVmdCA9IHN0eWxlLnJpZ2h0ID0gc3R5bGUubWFyZ2luID0gc3R5bGUucGFkZGluZyA9IDA7XG4gICAgICBzdHlsZS56SW5kZXggPSAxMDAwMDE7XG4gICAgICBzdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBpZiAob3B0aW9ucy5jbGFzc05hbWUpIGNhbnZhcy5jbGFzc0xpc3QuYWRkKG9wdGlvbnMuY2xhc3NOYW1lKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKTtcbiAgICAgIGFkZEV2ZW50KHdpbmRvdywgXCJyZXNpemVcIiwgcmVwYWludCk7XG4gICAgfSxcbiAgICB0b3BiYXIgPSB7XG4gICAgICBjb25maWc6IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRzKVxuICAgICAgICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIG9wdGlvbnNba2V5XSA9IG9wdHNba2V5XTtcbiAgICAgIH0sXG4gICAgICBzaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzaG93aW5nKSByZXR1cm47XG4gICAgICAgIHNob3dpbmcgPSB0cnVlO1xuICAgICAgICBpZiAoZmFkZVRpbWVySWQgIT09IG51bGwpIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShmYWRlVGltZXJJZCk7XG4gICAgICAgIGlmICghY2FudmFzKSBjcmVhdGVDYW52YXMoKTtcbiAgICAgICAgY2FudmFzLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgdG9wYmFyLnByb2dyZXNzKDApO1xuICAgICAgICBpZiAob3B0aW9ucy5hdXRvUnVuKSB7XG4gICAgICAgICAgKGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgICBwcm9ncmVzc1RpbWVySWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgICAgICAgICAgdG9wYmFyLnByb2dyZXNzKFxuICAgICAgICAgICAgICBcIitcIiArIDAuMDUgKiBNYXRoLnBvdygxIC0gTWF0aC5zcXJ0KGN1cnJlbnRQcm9ncmVzcyksIDIpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9ncmVzczogZnVuY3Rpb24gKHRvKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdG8gPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBjdXJyZW50UHJvZ3Jlc3M7XG4gICAgICAgIGlmICh0eXBlb2YgdG8gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICB0byA9XG4gICAgICAgICAgICAodG8uaW5kZXhPZihcIitcIikgPj0gMCB8fCB0by5pbmRleE9mKFwiLVwiKSA+PSAwXG4gICAgICAgICAgICAgID8gY3VycmVudFByb2dyZXNzXG4gICAgICAgICAgICAgIDogMCkgKyBwYXJzZUZsb2F0KHRvKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyZW50UHJvZ3Jlc3MgPSB0byA+IDEgPyAxIDogdG87XG4gICAgICAgIHJlcGFpbnQoKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQcm9ncmVzcztcbiAgICAgIH0sXG4gICAgICBoaWRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghc2hvd2luZykgcmV0dXJuO1xuICAgICAgICBzaG93aW5nID0gZmFsc2U7XG4gICAgICAgIGlmIChwcm9ncmVzc1RpbWVySWQgIT0gbnVsbCkge1xuICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShwcm9ncmVzc1RpbWVySWQpO1xuICAgICAgICAgIHByb2dyZXNzVGltZXJJZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgKGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgaWYgKHRvcGJhci5wcm9ncmVzcyhcIisuMVwiKSA+PSAxKSB7XG4gICAgICAgICAgICBjYW52YXMuc3R5bGUub3BhY2l0eSAtPSAwLjA1O1xuICAgICAgICAgICAgaWYgKGNhbnZhcy5zdHlsZS5vcGFjaXR5IDw9IDAuMDUpIHtcbiAgICAgICAgICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgZmFkZVRpbWVySWQgPSBudWxsO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGZhZGVUaW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0sXG4gICAgfTtcblxuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHRvcGJhcjtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdG9wYmFyO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRoaXMudG9wYmFyID0gdG9wYmFyO1xuICB9XG59LmNhbGwodGhpcywgd2luZG93LCBkb2N1bWVudCkpO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBQb2x5ZmlsbEV2ZW50ID0gZXZlbnRDb25zdHJ1Y3RvcigpO1xuXG4gIGZ1bmN0aW9uIGV2ZW50Q29uc3RydWN0b3IoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHdpbmRvdy5DdXN0b21FdmVudDtcbiAgICAvLyBJRTw9OSBTdXBwb3J0XG4gICAgZnVuY3Rpb24gQ3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcykge1xuICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHtidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2UsIGRldGFpbDogdW5kZWZpbmVkfTtcbiAgICAgIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICAgIGV2dC5pbml0Q3VzdG9tRXZlbnQoZXZlbnQsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSwgcGFyYW1zLmRldGFpbCk7XG4gICAgICByZXR1cm4gZXZ0O1xuICAgIH1cbiAgICBDdXN0b21FdmVudC5wcm90b3R5cGUgPSB3aW5kb3cuRXZlbnQucHJvdG90eXBlO1xuICAgIHJldHVybiBDdXN0b21FdmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1aWxkSGlkZGVuSW5wdXQobmFtZSwgdmFsdWUpIHtcbiAgICB2YXIgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgaW5wdXQudHlwZSA9IFwiaGlkZGVuXCI7XG4gICAgaW5wdXQubmFtZSA9IG5hbWU7XG4gICAgaW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICByZXR1cm4gaW5wdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDbGljayhlbGVtZW50LCB0YXJnZXRNb2RpZmllcktleSkge1xuICAgIHZhciB0byA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10b1wiKSxcbiAgICAgICAgbWV0aG9kID0gYnVpbGRIaWRkZW5JbnB1dChcIl9tZXRob2RcIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSksXG4gICAgICAgIGNzcmYgPSBidWlsZEhpZGRlbklucHV0KFwiX2NzcmZfdG9rZW5cIiwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWNzcmZcIikpLFxuICAgICAgICBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIiksXG4gICAgICAgIHRhcmdldCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwidGFyZ2V0XCIpO1xuXG4gICAgZm9ybS5tZXRob2QgPSAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSA9PT0gXCJnZXRcIikgPyBcImdldFwiIDogXCJwb3N0XCI7XG4gICAgZm9ybS5hY3Rpb24gPSB0bztcbiAgICBmb3JtLnN0eWxlLmRpc3BsYXkgPSBcImhpZGRlblwiO1xuXG4gICAgaWYgKHRhcmdldCkgZm9ybS50YXJnZXQgPSB0YXJnZXQ7XG4gICAgZWxzZSBpZiAodGFyZ2V0TW9kaWZpZXJLZXkpIGZvcm0udGFyZ2V0ID0gXCJfYmxhbmtcIjtcblxuICAgIGZvcm0uYXBwZW5kQ2hpbGQoY3NyZik7XG4gICAgZm9ybS5hcHBlbmRDaGlsZChtZXRob2QpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgZm9ybS5zdWJtaXQoKTtcbiAgfVxuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgIHZhciBlbGVtZW50ID0gZS50YXJnZXQ7XG4gICAgaWYgKGUuZGVmYXVsdFByZXZlbnRlZCkgcmV0dXJuO1xuXG4gICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5nZXRBdHRyaWJ1dGUpIHtcbiAgICAgIHZhciBwaG9lbml4TGlua0V2ZW50ID0gbmV3IFBvbHlmaWxsRXZlbnQoJ3Bob2VuaXgubGluay5jbGljaycsIHtcbiAgICAgICAgXCJidWJibGVzXCI6IHRydWUsIFwiY2FuY2VsYWJsZVwiOiB0cnVlXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFlbGVtZW50LmRpc3BhdGNoRXZlbnQocGhvZW5peExpbmtFdmVudCkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWV0aG9kXCIpKSB7XG4gICAgICAgIGhhbmRsZUNsaWNrKGVsZW1lbnQsIGUubWV0YUtleSB8fCBlLnNoaWZ0S2V5KTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xuICAgICAgfVxuICAgIH1cbiAgfSwgZmFsc2UpO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwaG9lbml4LmxpbmsuY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBtZXNzYWdlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb25maXJtXCIpO1xuICAgIGlmKG1lc3NhZ2UgJiYgIXdpbmRvdy5jb25maXJtKG1lc3NhZ2UpKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9LCBmYWxzZSk7XG59KSgpO1xuIiwgIi8vIHdyYXBzIHZhbHVlIGluIGNsb3N1cmUgb3IgcmV0dXJucyBjbG9zdXJlXG5leHBvcnQgbGV0IGNsb3N1cmUgPSAodmFsdWUpID0+IHtcbiAgaWYodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpe1xuICAgIHJldHVybiB2YWx1ZVxuICB9IGVsc2Uge1xuICAgIGxldCBjbG9zdXJlID0gZnVuY3Rpb24gKCl7IHJldHVybiB2YWx1ZSB9XG4gICAgcmV0dXJuIGNsb3N1cmVcbiAgfVxufVxuIiwgImV4cG9ydCBjb25zdCBnbG9iYWxTZWxmID0gdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogbnVsbFxuZXhwb3J0IGNvbnN0IHBoeFdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBudWxsXG5leHBvcnQgY29uc3QgZ2xvYmFsID0gZ2xvYmFsU2VsZiB8fCBwaHhXaW5kb3cgfHwgZ2xvYmFsXG5leHBvcnQgY29uc3QgREVGQVVMVF9WU04gPSBcIjIuMC4wXCJcbmV4cG9ydCBjb25zdCBTT0NLRVRfU1RBVEVTID0ge2Nvbm5lY3Rpbmc6IDAsIG9wZW46IDEsIGNsb3Npbmc6IDIsIGNsb3NlZDogM31cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUVPVVQgPSAxMDAwMFxuZXhwb3J0IGNvbnN0IFdTX0NMT1NFX05PUk1BTCA9IDEwMDBcbmV4cG9ydCBjb25zdCBDSEFOTkVMX1NUQVRFUyA9IHtcbiAgY2xvc2VkOiBcImNsb3NlZFwiLFxuICBlcnJvcmVkOiBcImVycm9yZWRcIixcbiAgam9pbmVkOiBcImpvaW5lZFwiLFxuICBqb2luaW5nOiBcImpvaW5pbmdcIixcbiAgbGVhdmluZzogXCJsZWF2aW5nXCIsXG59XG5leHBvcnQgY29uc3QgQ0hBTk5FTF9FVkVOVFMgPSB7XG4gIGNsb3NlOiBcInBoeF9jbG9zZVwiLFxuICBlcnJvcjogXCJwaHhfZXJyb3JcIixcbiAgam9pbjogXCJwaHhfam9pblwiLFxuICByZXBseTogXCJwaHhfcmVwbHlcIixcbiAgbGVhdmU6IFwicGh4X2xlYXZlXCJcbn1cblxuZXhwb3J0IGNvbnN0IFRSQU5TUE9SVFMgPSB7XG4gIGxvbmdwb2xsOiBcImxvbmdwb2xsXCIsXG4gIHdlYnNvY2tldDogXCJ3ZWJzb2NrZXRcIlxufVxuZXhwb3J0IGNvbnN0IFhIUl9TVEFURVMgPSB7XG4gIGNvbXBsZXRlOiA0XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHVzaFxuICogQHBhcmFtIHtDaGFubmVsfSBjaGFubmVsIC0gVGhlIENoYW5uZWxcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudCAtIFRoZSBldmVudCwgZm9yIGV4YW1wbGUgYFwicGh4X2pvaW5cImBcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkIC0gVGhlIHBheWxvYWQsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogMTIzfWBcbiAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0IC0gVGhlIHB1c2ggdGltZW91dCBpbiBtaWxsaXNlY29uZHNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVzaCB7XG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0KXtcbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsXG4gICAgdGhpcy5ldmVudCA9IGV2ZW50XG4gICAgdGhpcy5wYXlsb2FkID0gcGF5bG9hZCB8fCBmdW5jdGlvbiAoKXsgcmV0dXJuIHt9IH1cbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gICAgdGhpcy5yZWNIb29rcyA9IFtdXG4gICAgdGhpcy5zZW50ID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZW91dFxuICAgKi9cbiAgcmVzZW5kKHRpbWVvdXQpe1xuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICB0aGlzLnJlc2V0KClcbiAgICB0aGlzLnNlbmQoKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqL1xuICBzZW5kKCl7XG4gICAgaWYodGhpcy5oYXNSZWNlaXZlZChcInRpbWVvdXRcIikpeyByZXR1cm4gfVxuICAgIHRoaXMuc3RhcnRUaW1lb3V0KClcbiAgICB0aGlzLnNlbnQgPSB0cnVlXG4gICAgdGhpcy5jaGFubmVsLnNvY2tldC5wdXNoKHtcbiAgICAgIHRvcGljOiB0aGlzLmNoYW5uZWwudG9waWMsXG4gICAgICBldmVudDogdGhpcy5ldmVudCxcbiAgICAgIHBheWxvYWQ6IHRoaXMucGF5bG9hZCgpLFxuICAgICAgcmVmOiB0aGlzLnJlZixcbiAgICAgIGpvaW5fcmVmOiB0aGlzLmNoYW5uZWwuam9pblJlZigpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0geyp9IHN0YXR1c1xuICAgKiBAcGFyYW0geyp9IGNhbGxiYWNrXG4gICAqL1xuICByZWNlaXZlKHN0YXR1cywgY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuaGFzUmVjZWl2ZWQoc3RhdHVzKSl7XG4gICAgICBjYWxsYmFjayh0aGlzLnJlY2VpdmVkUmVzcC5yZXNwb25zZSlcbiAgICB9XG5cbiAgICB0aGlzLnJlY0hvb2tzLnB1c2goe3N0YXR1cywgY2FsbGJhY2t9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlc2V0KCl7XG4gICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgdGhpcy5yZWYgPSBudWxsXG4gICAgdGhpcy5yZWZFdmVudCA9IG51bGxcbiAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IG51bGxcbiAgICB0aGlzLnNlbnQgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtYXRjaFJlY2VpdmUoe3N0YXR1cywgcmVzcG9uc2UsIF9yZWZ9KXtcbiAgICB0aGlzLnJlY0hvb2tzLmZpbHRlcihoID0+IGguc3RhdHVzID09PSBzdGF0dXMpXG4gICAgICAuZm9yRWFjaChoID0+IGguY2FsbGJhY2socmVzcG9uc2UpKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5jZWxSZWZFdmVudCgpe1xuICAgIGlmKCF0aGlzLnJlZkV2ZW50KXsgcmV0dXJuIH1cbiAgICB0aGlzLmNoYW5uZWwub2ZmKHRoaXMucmVmRXZlbnQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhbmNlbFRpbWVvdXQoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0VGltZXIpXG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBudWxsXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHN0YXJ0VGltZW91dCgpe1xuICAgIGlmKHRoaXMudGltZW91dFRpbWVyKXsgdGhpcy5jYW5jZWxUaW1lb3V0KCkgfVxuICAgIHRoaXMucmVmID0gdGhpcy5jaGFubmVsLnNvY2tldC5tYWtlUmVmKClcbiAgICB0aGlzLnJlZkV2ZW50ID0gdGhpcy5jaGFubmVsLnJlcGx5RXZlbnROYW1lKHRoaXMucmVmKVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKHRoaXMucmVmRXZlbnQsIHBheWxvYWQgPT4ge1xuICAgICAgdGhpcy5jYW5jZWxSZWZFdmVudCgpXG4gICAgICB0aGlzLmNhbmNlbFRpbWVvdXQoKVxuICAgICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBwYXlsb2FkXG4gICAgICB0aGlzLm1hdGNoUmVjZWl2ZShwYXlsb2FkKVxuICAgIH0pXG5cbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmlnZ2VyKFwidGltZW91dFwiLCB7fSlcbiAgICB9LCB0aGlzLnRpbWVvdXQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGhhc1JlY2VpdmVkKHN0YXR1cyl7XG4gICAgcmV0dXJuIHRoaXMucmVjZWl2ZWRSZXNwICYmIHRoaXMucmVjZWl2ZWRSZXNwLnN0YXR1cyA9PT0gc3RhdHVzXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXIoc3RhdHVzLCByZXNwb25zZSl7XG4gICAgdGhpcy5jaGFubmVsLnRyaWdnZXIodGhpcy5yZWZFdmVudCwge3N0YXR1cywgcmVzcG9uc2V9KVxuICB9XG59XG4iLCAiLyoqXG4gKlxuICogQ3JlYXRlcyBhIHRpbWVyIHRoYXQgYWNjZXB0cyBhIGB0aW1lckNhbGNgIGZ1bmN0aW9uIHRvIHBlcmZvcm1cbiAqIGNhbGN1bGF0ZWQgdGltZW91dCByZXRyaWVzLCBzdWNoIGFzIGV4cG9uZW50aWFsIGJhY2tvZmYuXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCByZWNvbm5lY3RUaW1lciA9IG5ldyBUaW1lcigoKSA9PiB0aGlzLmNvbm5lY3QoKSwgZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwMDAsIDUwMDAsIDEwMDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gKiB9KVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgNTAwMFxuICogcmVjb25uZWN0VGltZXIucmVzZXQoKVxuICogcmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgLy8gZmlyZXMgYWZ0ZXIgMTAwMFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0aW1lckNhbGNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgdGltZXJDYWxjKXtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICB0aGlzLnRpbWVyQ2FsYyA9IHRpbWVyQ2FsY1xuICAgIHRoaXMudGltZXIgPSBudWxsXG4gICAgdGhpcy50cmllcyA9IDBcbiAgfVxuXG4gIHJlc2V0KCl7XG4gICAgdGhpcy50cmllcyA9IDBcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcbiAgfVxuXG4gIC8qKlxuICAgKiBDYW5jZWxzIGFueSBwcmV2aW91cyBzY2hlZHVsZVRpbWVvdXQgYW5kIHNjaGVkdWxlcyBjYWxsYmFja1xuICAgKi9cbiAgc2NoZWR1bGVUaW1lb3V0KCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG5cbiAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRyaWVzID0gdGhpcy50cmllcyArIDFcbiAgICAgIHRoaXMuY2FsbGJhY2soKVxuICAgIH0sIHRoaXMudGltZXJDYWxjKHRoaXMudHJpZXMgKyAxKSlcbiAgfVxufVxuIiwgImltcG9ydCB7Y2xvc3VyZX0gZnJvbSBcIi4vdXRpbHNcIlxuaW1wb3J0IHtcbiAgQ0hBTk5FTF9FVkVOVFMsXG4gIENIQU5ORUxfU1RBVEVTLFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgUHVzaCBmcm9tIFwiLi9wdXNoXCJcbmltcG9ydCBUaW1lciBmcm9tIFwiLi90aW1lclwiXG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKX0gcGFyYW1zXG4gKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoYW5uZWwge1xuICBjb25zdHJ1Y3Rvcih0b3BpYywgcGFyYW1zLCBzb2NrZXQpe1xuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5jbG9zZWRcbiAgICB0aGlzLnRvcGljID0gdG9waWNcbiAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zIHx8IHt9KVxuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0XG4gICAgdGhpcy5iaW5kaW5ncyA9IFtdXG4gICAgdGhpcy5iaW5kaW5nUmVmID0gMFxuICAgIHRoaXMudGltZW91dCA9IHRoaXMuc29ja2V0LnRpbWVvdXRcbiAgICB0aGlzLmpvaW5lZE9uY2UgPSBmYWxzZVxuICAgIHRoaXMuam9pblB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5qb2luLCB0aGlzLnBhcmFtcywgdGhpcy50aW1lb3V0KVxuICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMgPSBbXVxuXG4gICAgdGhpcy5yZWpvaW5UaW1lciA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW4oKSB9XG4gICAgfSwgdGhpcy5zb2NrZXQucmVqb2luQWZ0ZXJNcylcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uRXJyb3IoKCkgPT4gdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpKSlcbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcy5wdXNoKHRoaXMuc29ja2V0Lm9uT3BlbigoKSA9PiB7XG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuaXNFcnJvcmVkKCkpeyB0aGlzLnJlam9pbigpIH1cbiAgICB9KVxuICAgIClcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmVkXG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5mb3JFYWNoKHB1c2hFdmVudCA9PiBwdXNoRXZlbnQuc2VuZCgpKVxuICAgICAgdGhpcy5wdXNoQnVmZmVyID0gW11cbiAgICB9KVxuICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZShcImVycm9yXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLm9uQ2xvc2UoKCkgPT4ge1xuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgY2xvc2UgJHt0aGlzLnRvcGljfSAke3RoaXMuam9pblJlZigpfWApXG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkXG4gICAgICB0aGlzLnNvY2tldC5yZW1vdmUodGhpcylcbiAgICB9KVxuICAgIHRoaXMub25FcnJvcihyZWFzb24gPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGVycm9yICR7dGhpcy50b3BpY31gLCByZWFzb24pXG4gICAgICBpZih0aGlzLmlzSm9pbmluZygpKXsgdGhpcy5qb2luUHVzaC5yZXNldCgpIH1cbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGB0aW1lb3V0ICR7dGhpcy50b3BpY30gKCR7dGhpcy5qb2luUmVmKCl9KWAsIHRoaXMuam9pblB1c2gudGltZW91dClcbiAgICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRoaXMudGltZW91dClcbiAgICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkXG4gICAgICB0aGlzLmpvaW5QdXNoLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpIH1cbiAgICB9KVxuICAgIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMucmVwbHksIChwYXlsb2FkLCByZWYpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcih0aGlzLnJlcGx5RXZlbnROYW1lKHJlZiksIHBheWxvYWQpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBKb2luIHRoZSBjaGFubmVsXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGpvaW4odGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgaWYodGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcInRyaWVkIHRvIGpvaW4gbXVsdGlwbGUgdGltZXMuICdqb2luJyBjYW4gb25seSBiZSBjYWxsZWQgYSBzaW5nbGUgdGltZSBwZXIgY2hhbm5lbCBpbnN0YW5jZVwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgICB0aGlzLmpvaW5lZE9uY2UgPSB0cnVlXG4gICAgICB0aGlzLnJlam9pbigpXG4gICAgICByZXR1cm4gdGhpcy5qb2luUHVzaFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIGludG8gY2hhbm5lbCBjbG9zZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25DbG9zZShjYWxsYmFjayl7XG4gICAgdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgY2FsbGJhY2spXG4gIH1cblxuICAvKipcbiAgICogSG9vayBpbnRvIGNoYW5uZWwgZXJyb3JzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkVycm9yKGNhbGxiYWNrKXtcbiAgICByZXR1cm4gdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5lcnJvciwgcmVhc29uID0+IGNhbGxiYWNrKHJlYXNvbikpXG4gIH1cblxuICAvKipcbiAgICogU3Vic2NyaWJlcyBvbiBjaGFubmVsIGV2ZW50c1xuICAgKlxuICAgKiBTdWJzY3JpcHRpb24gcmV0dXJucyBhIHJlZiBjb3VudGVyLCB3aGljaCBjYW4gYmUgdXNlZCBsYXRlciB0b1xuICAgKiB1bnN1YnNjcmliZSB0aGUgZXhhY3QgZXZlbnQgbGlzdGVuZXJcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY29uc3QgcmVmMiA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19vdGhlcl9zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKiAvLyBTaW5jZSB1bnN1YnNjcmlwdGlvbiwgZG9fc3R1ZmYgd29uJ3QgZmlyZSxcbiAgICogLy8gd2hpbGUgZG9fb3RoZXJfc3R1ZmYgd2lsbCBrZWVwIGZpcmluZyBvbiB0aGUgXCJldmVudFwiXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKiBAcmV0dXJucyB7aW50ZWdlcn0gcmVmXG4gICAqL1xuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLmJpbmRpbmdSZWYrK1xuICAgIHRoaXMuYmluZGluZ3MucHVzaCh7ZXZlbnQsIHJlZiwgY2FsbGJhY2t9KVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBVbnN1YnNjcmliZXMgb2ZmIG9mIGNoYW5uZWwgZXZlbnRzXG4gICAqXG4gICAqIFVzZSB0aGUgcmVmIHJldHVybmVkIGZyb20gYSBjaGFubmVsLm9uKCkgdG8gdW5zdWJzY3JpYmUgb25lXG4gICAqIGhhbmRsZXIsIG9yIHBhc3Mgbm90aGluZyBmb3IgdGhlIHJlZiB0byB1bnN1YnNjcmliZSBhbGxcbiAgICogaGFuZGxlcnMgZm9yIHRoZSBnaXZlbiBldmVudC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogLy8gVW5zdWJzY3JpYmUgdGhlIGRvX3N0dWZmIGhhbmRsZXJcbiAgICogY29uc3QgcmVmMSA9IGNoYW5uZWwub24oXCJldmVudFwiLCBkb19zdHVmZilcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiLCByZWYxKVxuICAgKlxuICAgKiAvLyBVbnN1YnNjcmliZSBhbGwgaGFuZGxlcnMgZnJvbSBldmVudFxuICAgKiBjaGFubmVsLm9mZihcImV2ZW50XCIpXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJlZlxuICAgKi9cbiAgb2ZmKGV2ZW50LCByZWYpe1xuICAgIHRoaXMuYmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcigoYmluZCkgPT4ge1xuICAgICAgcmV0dXJuICEoYmluZC5ldmVudCA9PT0gZXZlbnQgJiYgKHR5cGVvZiByZWYgPT09IFwidW5kZWZpbmVkXCIgfHwgcmVmID09PSBiaW5kLnJlZikpXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuUHVzaCgpeyByZXR1cm4gdGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSAmJiB0aGlzLmlzSm9pbmVkKCkgfVxuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgYGV2ZW50YCB0byBwaG9lbml4IHdpdGggdGhlIHBheWxvYWQgYHBheWxvYWRgLlxuICAgKiBQaG9lbml4IHJlY2VpdmVzIHRoaXMgaW4gdGhlIGBoYW5kbGVfaW4oZXZlbnQsIHBheWxvYWQsIHNvY2tldClgXG4gICAqIGZ1bmN0aW9uLiBpZiBwaG9lbml4IHJlcGxpZXMgb3IgaXQgdGltZXMgb3V0IChkZWZhdWx0IDEwMDAwbXMpLFxuICAgKiB0aGVuIG9wdGlvbmFsbHkgdGhlIHJlcGx5IGNhbiBiZSByZWNlaXZlZC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY2hhbm5lbC5wdXNoKFwiZXZlbnRcIilcbiAgICogICAucmVjZWl2ZShcIm9rXCIsIHBheWxvYWQgPT4gY29uc29sZS5sb2coXCJwaG9lbml4IHJlcGxpZWQ6XCIsIHBheWxvYWQpKVxuICAgKiAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgZXJyID0+IGNvbnNvbGUubG9nKFwicGhvZW5peCBlcnJvcmVkXCIsIGVycikpXG4gICAqICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IGNvbnNvbGUubG9nKFwidGltZWQgb3V0IHB1c2hpbmdcIikpXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RpbWVvdXRdXG4gICAqIEByZXR1cm5zIHtQdXNofVxuICAgKi9cbiAgcHVzaChldmVudCwgcGF5bG9hZCwgdGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgcGF5bG9hZCA9IHBheWxvYWQgfHwge31cbiAgICBpZighdGhpcy5qb2luZWRPbmNlKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdHJpZWQgdG8gcHVzaCAnJHtldmVudH0nIHRvICcke3RoaXMudG9waWN9JyBiZWZvcmUgam9pbmluZy4gVXNlIGNoYW5uZWwuam9pbigpIGJlZm9yZSBwdXNoaW5nIGV2ZW50c2ApXG4gICAgfVxuICAgIGxldCBwdXNoRXZlbnQgPSBuZXcgUHVzaCh0aGlzLCBldmVudCwgZnVuY3Rpb24gKCl7IHJldHVybiBwYXlsb2FkIH0sIHRpbWVvdXQpXG4gICAgaWYodGhpcy5jYW5QdXNoKCkpe1xuICAgICAgcHVzaEV2ZW50LnNlbmQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBwdXNoRXZlbnQuc3RhcnRUaW1lb3V0KClcbiAgICAgIHRoaXMucHVzaEJ1ZmZlci5wdXNoKHB1c2hFdmVudClcbiAgICB9XG5cbiAgICByZXR1cm4gcHVzaEV2ZW50XG4gIH1cblxuICAvKiogTGVhdmVzIHRoZSBjaGFubmVsXG4gICAqXG4gICAqIFVuc3Vic2NyaWJlcyBmcm9tIHNlcnZlciBldmVudHMsIGFuZFxuICAgKiBpbnN0cnVjdHMgY2hhbm5lbCB0byB0ZXJtaW5hdGUgb24gc2VydmVyXG4gICAqXG4gICAqIFRyaWdnZXJzIG9uQ2xvc2UoKSBob29rc1xuICAgKlxuICAgKiBUbyByZWNlaXZlIGxlYXZlIGFja25vd2xlZGdlbWVudHMsIHVzZSB0aGUgYHJlY2VpdmVgXG4gICAqIGhvb2sgdG8gYmluZCB0byB0aGUgc2VydmVyIGFjaywgaWU6XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNoYW5uZWwubGVhdmUoKS5yZWNlaXZlKFwib2tcIiwgKCkgPT4gYWxlcnQoXCJsZWZ0IVwiKSApXG4gICAqXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gdGltZW91dFxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIGxlYXZlKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgIHRoaXMuam9pblB1c2guY2FuY2VsVGltZW91dCgpXG5cbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMubGVhdmluZ1xuICAgIGxldCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGxlYXZlICR7dGhpcy50b3BpY31gKVxuICAgICAgdGhpcy50cmlnZ2VyKENIQU5ORUxfRVZFTlRTLmNsb3NlLCBcImxlYXZlXCIpXG4gICAgfVxuICAgIGxldCBsZWF2ZVB1c2ggPSBuZXcgUHVzaCh0aGlzLCBDSEFOTkVMX0VWRU5UUy5sZWF2ZSwgY2xvc3VyZSh7fSksIHRpbWVvdXQpXG4gICAgbGVhdmVQdXNoLnJlY2VpdmUoXCJva1wiLCAoKSA9PiBvbkNsb3NlKCkpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gb25DbG9zZSgpKVxuICAgIGxlYXZlUHVzaC5zZW5kKClcbiAgICBpZighdGhpcy5jYW5QdXNoKCkpeyBsZWF2ZVB1c2gudHJpZ2dlcihcIm9rXCIsIHt9KSB9XG5cbiAgICByZXR1cm4gbGVhdmVQdXNoXG4gIH1cblxuICAvKipcbiAgICogT3ZlcnJpZGFibGUgbWVzc2FnZSBob29rXG4gICAqXG4gICAqIFJlY2VpdmVzIGFsbCBldmVudHMgZm9yIHNwZWNpYWxpemVkIG1lc3NhZ2UgaGFuZGxpbmdcbiAgICogYmVmb3JlIGRpc3BhdGNoaW5nIHRvIHRoZSBjaGFubmVsIGNhbGxiYWNrcy5cbiAgICpcbiAgICogTXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gcmVmXG4gICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAqL1xuICBvbk1lc3NhZ2UoX2V2ZW50LCBwYXlsb2FkLCBfcmVmKXsgcmV0dXJuIHBheWxvYWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmKXtcbiAgICBpZih0aGlzLnRvcGljICE9PSB0b3BpYyl7IHJldHVybiBmYWxzZSB9XG5cbiAgICBpZihqb2luUmVmICYmIGpvaW5SZWYgIT09IHRoaXMuam9pblJlZigpKXtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIFwiZHJvcHBpbmcgb3V0ZGF0ZWQgbWVzc2FnZVwiLCB7dG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luUmVmfSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgam9pblJlZigpeyByZXR1cm4gdGhpcy5qb2luUHVzaC5yZWYgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIGlmKHRoaXMuaXNMZWF2aW5nKCkpeyByZXR1cm4gfVxuICAgIHRoaXMuc29ja2V0LmxlYXZlT3BlblRvcGljKHRoaXMudG9waWMpXG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5pbmdcbiAgICB0aGlzLmpvaW5QdXNoLnJlc2VuZCh0aW1lb3V0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpe1xuICAgIGxldCBoYW5kbGVkUGF5bG9hZCA9IHRoaXMub25NZXNzYWdlKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5SZWYpXG4gICAgaWYocGF5bG9hZCAmJiAhaGFuZGxlZFBheWxvYWQpeyB0aHJvdyBuZXcgRXJyb3IoXCJjaGFubmVsIG9uTWVzc2FnZSBjYWxsYmFja3MgbXVzdCByZXR1cm4gdGhlIHBheWxvYWQsIG1vZGlmaWVkIG9yIHVubW9kaWZpZWRcIikgfVxuXG4gICAgbGV0IGV2ZW50QmluZGluZ3MgPSB0aGlzLmJpbmRpbmdzLmZpbHRlcihiaW5kID0+IGJpbmQuZXZlbnQgPT09IGV2ZW50KVxuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGV2ZW50QmluZGluZ3MubGVuZ3RoOyBpKyspe1xuICAgICAgbGV0IGJpbmQgPSBldmVudEJpbmRpbmdzW2ldXG4gICAgICBiaW5kLmNhbGxiYWNrKGhhbmRsZWRQYXlsb2FkLCByZWYsIGpvaW5SZWYgfHwgdGhpcy5qb2luUmVmKCkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZXBseUV2ZW50TmFtZShyZWYpeyByZXR1cm4gYGNoYW5fcmVwbHlfJHtyZWZ9YCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0Nsb3NlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzRXJyb3JlZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0pvaW5lZCgpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmVkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzSm9pbmluZygpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMuam9pbmluZyB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0xlYXZpbmcoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmxlYXZpbmcgfVxufVxuIiwgImltcG9ydCB7XG4gIGdsb2JhbCxcbiAgWEhSX1NUQVRFU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4IHtcblxuICBzdGF0aWMgcmVxdWVzdChtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIGlmKGdsb2JhbC5YRG9tYWluUmVxdWVzdCl7XG4gICAgICBsZXQgcmVxID0gbmV3IGdsb2JhbC5YRG9tYWluUmVxdWVzdCgpIC8vIElFOCwgSUU5XG4gICAgICByZXR1cm4gdGhpcy54ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXEgPSBuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KCkgLy8gSUU3KywgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpXG4gICAgICByZXR1cm4gdGhpcy54aHJSZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB4ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS50aW1lb3V0ID0gdGltZW91dFxuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQpXG4gICAgcmVxLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IHRoaXMucGFyc2VKU09OKHJlcS5yZXNwb25zZVRleHQpXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwb25zZSlcbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICAvLyBXb3JrIGFyb3VuZCBidWcgaW4gSUU5IHRoYXQgcmVxdWlyZXMgYW4gYXR0YWNoZWQgb25wcm9ncmVzcyBoYW5kbGVyXG4gICAgcmVxLm9ucHJvZ3Jlc3MgPSAoKSA9PiB7IH1cblxuICAgIHJlcS5zZW5kKGJvZHkpXG4gICAgcmV0dXJuIHJlcVxuICB9XG5cbiAgc3RhdGljIHhoclJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQsIHRydWUpXG4gICAgcmVxLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgYWNjZXB0KVxuICAgIHJlcS5vbmVycm9yID0gKCkgPT4gY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbClcbiAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IFhIUl9TVEFURVMuY29tcGxldGUgJiYgY2FsbGJhY2spe1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnBhcnNlSlNPTihyZXEucmVzcG9uc2VUZXh0KVxuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICByZXEuc2VuZChib2R5KVxuICAgIHJldHVybiByZXFcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZUpTT04ocmVzcCl7XG4gICAgaWYoIXJlc3AgfHwgcmVzcCA9PT0gXCJcIil7IHJldHVybiBudWxsIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gSlNPTi5wYXJzZShyZXNwKVxuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgY29uc29sZSAmJiBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBwYXJzZSBKU09OIHJlc3BvbnNlXCIsIHJlc3ApXG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemUob2JqLCBwYXJlbnRLZXkpe1xuICAgIGxldCBxdWVyeVN0ciA9IFtdXG4gICAgZm9yKHZhciBrZXkgaW4gb2JqKXtcbiAgICAgIGlmKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKXsgY29udGludWUgfVxuICAgICAgbGV0IHBhcmFtS2V5ID0gcGFyZW50S2V5ID8gYCR7cGFyZW50S2V5fVske2tleX1dYCA6IGtleVxuICAgICAgbGV0IHBhcmFtVmFsID0gb2JqW2tleV1cbiAgICAgIGlmKHR5cGVvZiBwYXJhbVZhbCA9PT0gXCJvYmplY3RcIil7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2godGhpcy5zZXJpYWxpemUocGFyYW1WYWwsIHBhcmFtS2V5KSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5U3RyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtS2V5KSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtVmFsKSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHF1ZXJ5U3RyLmpvaW4oXCImXCIpXG4gIH1cblxuICBzdGF0aWMgYXBwZW5kUGFyYW1zKHVybCwgcGFyYW1zKXtcbiAgICBpZihPYmplY3Qua2V5cyhwYXJhbXMpLmxlbmd0aCA9PT0gMCl7IHJldHVybiB1cmwgfVxuXG4gICAgbGV0IHByZWZpeCA9IHVybC5tYXRjaCgvXFw/LykgPyBcIiZcIiA6IFwiP1wiXG4gICAgcmV0dXJuIGAke3VybH0ke3ByZWZpeH0ke3RoaXMuc2VyaWFsaXplKHBhcmFtcyl9YFxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgU09DS0VUX1NUQVRFUyxcbiAgVFJBTlNQT1JUU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgQWpheCBmcm9tIFwiLi9hamF4XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9uZ1BvbGwge1xuXG4gIGNvbnN0cnVjdG9yKGVuZFBvaW50KXtcbiAgICB0aGlzLmVuZFBvaW50ID0gbnVsbFxuICAgIHRoaXMudG9rZW4gPSBudWxsXG4gICAgdGhpcy5za2lwSGVhcnRiZWF0ID0gdHJ1ZVxuICAgIHRoaXMucmVxcyA9IG5ldyBTZXQoKVxuICAgIHRoaXMub25vcGVuID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25lcnJvciA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5wb2xsRW5kcG9pbnQgPSB0aGlzLm5vcm1hbGl6ZUVuZHBvaW50KGVuZFBvaW50KVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZ1xuICAgIHRoaXMucG9sbCgpXG4gIH1cblxuICBub3JtYWxpemVFbmRwb2ludChlbmRQb2ludCl7XG4gICAgcmV0dXJuIChlbmRQb2ludFxuICAgICAgLnJlcGxhY2UoXCJ3czovL1wiLCBcImh0dHA6Ly9cIilcbiAgICAgIC5yZXBsYWNlKFwid3NzOi8vXCIsIFwiaHR0cHM6Ly9cIilcbiAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoXCIoLiopXFwvXCIgKyBUUkFOU1BPUlRTLndlYnNvY2tldCksIFwiJDEvXCIgKyBUUkFOU1BPUlRTLmxvbmdwb2xsKSlcbiAgfVxuXG4gIGVuZHBvaW50VVJMKCl7XG4gICAgcmV0dXJuIEFqYXguYXBwZW5kUGFyYW1zKHRoaXMucG9sbEVuZHBvaW50LCB7dG9rZW46IHRoaXMudG9rZW59KVxuICB9XG5cbiAgY2xvc2VBbmRSZXRyeShjb2RlLCByZWFzb24sIHdhc0NsZWFuKXtcbiAgICB0aGlzLmNsb3NlKGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4pXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nXG4gIH1cblxuICBvbnRpbWVvdXQoKXtcbiAgICB0aGlzLm9uZXJyb3IoXCJ0aW1lb3V0XCIpXG4gICAgdGhpcy5jbG9zZUFuZFJldHJ5KDEwMDUsIFwidGltZW91dFwiLCBmYWxzZSlcbiAgfVxuXG4gIGlzQWN0aXZlKCl7IHJldHVybiB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMub3BlbiB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZyB9XG5cbiAgcG9sbCgpe1xuICAgIHRoaXMuYWpheChcIkdFVFwiLCBudWxsLCAoKSA9PiB0aGlzLm9udGltZW91dCgpLCByZXNwID0+IHtcbiAgICAgIGlmKHJlc3Ape1xuICAgICAgICB2YXIge3N0YXR1cywgdG9rZW4sIG1lc3NhZ2VzfSA9IHJlc3BcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXMgPSAwXG4gICAgICB9XG5cbiAgICAgIHN3aXRjaChzdGF0dXMpe1xuICAgICAgICBjYXNlIDIwMDpcbiAgICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB7XG4gICAgICAgICAgICAvLyBUYXNrcyBhcmUgd2hhdCB0aGluZ3MgbGlrZSBldmVudCBoYW5kbGVycywgc2V0VGltZW91dCBjYWxsYmFja3MsXG4gICAgICAgICAgICAvLyBwcm9taXNlIHJlc29sdmVzIGFuZCBtb3JlIGFyZSBydW4gd2l0aGluLlxuICAgICAgICAgICAgLy8gSW4gbW9kZXJuIGJyb3dzZXJzLCB0aGVyZSBhcmUgdHdvIGRpZmZlcmVudCBraW5kcyBvZiB0YXNrcyxcbiAgICAgICAgICAgIC8vIG1pY3JvdGFza3MgYW5kIG1hY3JvdGFza3MuXG4gICAgICAgICAgICAvLyBNaWNyb3Rhc2tzIGFyZSBtYWlubHkgdXNlZCBmb3IgUHJvbWlzZXMsIHdoaWxlIG1hY3JvdGFza3MgYXJlXG4gICAgICAgICAgICAvLyB1c2VkIGZvciBldmVyeXRoaW5nIGVsc2UuXG4gICAgICAgICAgICAvLyBNaWNyb3Rhc2tzIGFsd2F5cyBoYXZlIHByaW9yaXR5IG92ZXIgbWFjcm90YXNrcy4gSWYgdGhlIEpTIGVuZ2luZVxuICAgICAgICAgICAgLy8gaXMgbG9va2luZyBmb3IgYSB0YXNrIHRvIHJ1biwgaXQgd2lsbCBhbHdheXMgdHJ5IHRvIGVtcHR5IHRoZVxuICAgICAgICAgICAgLy8gbWljcm90YXNrIHF1ZXVlIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHJ1biBhbnl0aGluZyBmcm9tIHRoZVxuICAgICAgICAgICAgLy8gbWFjcm90YXNrIHF1ZXVlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEZvciB0aGUgV2ViU29ja2V0IHRyYW5zcG9ydCwgbWVzc2FnZXMgYWx3YXlzIGFycml2ZSBpbiB0aGVpciBvd25cbiAgICAgICAgICAgIC8vIGV2ZW50LiBUaGlzIG1lYW5zIHRoYXQgaWYgYW55IHByb21pc2VzIGFyZSByZXNvbHZlZCBmcm9tIHdpdGhpbixcbiAgICAgICAgICAgIC8vIHRoZWlyIGNhbGxiYWNrcyB3aWxsIGFsd2F5cyBmaW5pc2ggZXhlY3V0aW9uIGJ5IHRoZSB0aW1lIHRoZVxuICAgICAgICAgICAgLy8gbmV4dCBtZXNzYWdlIGV2ZW50IGhhbmRsZXIgaXMgcnVuLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIGVtdWxhdGUgdGhpcyBiZWhhdmlvdXIsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIGVhY2hcbiAgICAgICAgICAgIC8vIG9ubWVzc2FnZSBoYW5kbGVyIGlzIHJ1biB3aXRoaW4gaXQncyBvd24gbWFjcm90YXNrLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLm9ubWVzc2FnZSh7ZGF0YTogbXNnfSksIDApXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjA0OlxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MTA6XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5vcGVuXG4gICAgICAgICAgdGhpcy5vbm9wZW4oe30pXG4gICAgICAgICAgdGhpcy5wb2xsKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQwMzpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoNDAzKVxuICAgICAgICAgIHRoaXMuY2xvc2UoMTAwOCwgXCJmb3JiaWRkZW5cIiwgZmFsc2UpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICBjYXNlIDUwMDpcbiAgICAgICAgICB0aGlzLm9uZXJyb3IoNTAwKVxuICAgICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDExLCBcImludGVybmFsIHNlcnZlciBlcnJvclwiLCA1MDApXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKGB1bmhhbmRsZWQgcG9sbCBzdGF0dXMgJHtzdGF0dXN9YClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2VuZChib2R5KXtcbiAgICB0aGlzLmFqYXgoXCJQT1NUXCIsIGJvZHksICgpID0+IHRoaXMub25lcnJvcihcInRpbWVvdXRcIiksIHJlc3AgPT4ge1xuICAgICAgaWYoIXJlc3AgfHwgcmVzcC5zdGF0dXMgIT09IDIwMCl7XG4gICAgICAgIHRoaXMub25lcnJvcihyZXNwICYmIHJlc3Auc3RhdHVzKVxuICAgICAgICB0aGlzLmNsb3NlQW5kUmV0cnkoMTAxMSwgXCJpbnRlcm5hbCBzZXJ2ZXIgZXJyb3JcIiwgZmFsc2UpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNsb3NlKGNvZGUsIHJlYXNvbiwgd2FzQ2xlYW4pe1xuICAgIGZvcihsZXQgcmVxIG9mIHRoaXMucmVxcyl7IHJlcS5hYm9ydCgpIH1cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNsb3NlZFxuICAgIGxldCBvcHRzID0gT2JqZWN0LmFzc2lnbih7Y29kZTogMTAwMCwgcmVhc29uOiB1bmRlZmluZWQsIHdhc0NsZWFuOiB0cnVlfSwge2NvZGUsIHJlYXNvbiwgd2FzQ2xlYW59KVxuICAgIGlmKHR5cGVvZihDbG9zZUV2ZW50KSAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICB0aGlzLm9uY2xvc2UobmV3IENsb3NlRXZlbnQoXCJjbG9zZVwiLCBvcHRzKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vbmNsb3NlKG9wdHMpXG4gICAgfVxuICB9XG5cbiAgYWpheChtZXRob2QsIGJvZHksIG9uQ2FsbGVyVGltZW91dCwgY2FsbGJhY2spe1xuICAgIGxldCByZXFcbiAgICBsZXQgb250aW1lb3V0ID0gKCkgPT4ge1xuICAgICAgdGhpcy5yZXFzLmRlbGV0ZShyZXEpXG4gICAgICBvbkNhbGxlclRpbWVvdXQoKVxuICAgIH1cbiAgICByZXEgPSBBamF4LnJlcXVlc3QobWV0aG9kLCB0aGlzLmVuZHBvaW50VVJMKCksIFwiYXBwbGljYXRpb24vanNvblwiLCBib2R5LCB0aGlzLnRpbWVvdXQsIG9udGltZW91dCwgcmVzcCA9PiB7XG4gICAgICB0aGlzLnJlcXMuZGVsZXRlKHJlcSlcbiAgICAgIGlmKHRoaXMuaXNBY3RpdmUoKSl7IGNhbGxiYWNrKHJlc3ApIH1cbiAgICB9KVxuICAgIHRoaXMucmVxcy5hZGQocmVxKVxuICB9XG59XG4iLCAiLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgUHJlc2VuY2VcbiAqIEBwYXJhbSB7Q2hhbm5lbH0gY2hhbm5lbCAtIFRoZSBDaGFubmVsXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIFRoZSBvcHRpb25zLFxuICogICAgICAgIGZvciBleGFtcGxlIGB7ZXZlbnRzOiB7c3RhdGU6IFwic3RhdGVcIiwgZGlmZjogXCJkaWZmXCJ9fWBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJlc2VuY2Uge1xuXG4gIGNvbnN0cnVjdG9yKGNoYW5uZWwsIG9wdHMgPSB7fSl7XG4gICAgbGV0IGV2ZW50cyA9IG9wdHMuZXZlbnRzIHx8IHtzdGF0ZTogXCJwcmVzZW5jZV9zdGF0ZVwiLCBkaWZmOiBcInByZXNlbmNlX2RpZmZcIn1cbiAgICB0aGlzLnN0YXRlID0ge31cbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbFxuICAgIHRoaXMuam9pblJlZiA9IG51bGxcbiAgICB0aGlzLmNhbGxlciA9IHtcbiAgICAgIG9uSm9pbjogZnVuY3Rpb24gKCl7IH0sXG4gICAgICBvbkxlYXZlOiBmdW5jdGlvbiAoKXsgfSxcbiAgICAgIG9uU3luYzogZnVuY3Rpb24gKCl7IH1cbiAgICB9XG5cbiAgICB0aGlzLmNoYW5uZWwub24oZXZlbnRzLnN0YXRlLCBuZXdTdGF0ZSA9PiB7XG4gICAgICBsZXQge29uSm9pbiwgb25MZWF2ZSwgb25TeW5jfSA9IHRoaXMuY2FsbGVyXG5cbiAgICAgIHRoaXMuam9pblJlZiA9IHRoaXMuY2hhbm5lbC5qb2luUmVmKClcbiAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jU3RhdGUodGhpcy5zdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSlcblxuICAgICAgdGhpcy5wZW5kaW5nRGlmZnMuZm9yRWFjaChkaWZmID0+IHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSlcbiAgICAgIH0pXG4gICAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgICBvblN5bmMoKVxuICAgIH0pXG5cbiAgICB0aGlzLmNoYW5uZWwub24oZXZlbnRzLmRpZmYsIGRpZmYgPT4ge1xuICAgICAgbGV0IHtvbkpvaW4sIG9uTGVhdmUsIG9uU3luY30gPSB0aGlzLmNhbGxlclxuXG4gICAgICBpZih0aGlzLmluUGVuZGluZ1N5bmNTdGF0ZSgpKXtcbiAgICAgICAgdGhpcy5wZW5kaW5nRGlmZnMucHVzaChkaWZmKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNEaWZmKHRoaXMuc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSlcbiAgICAgICAgb25TeW5jKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgb25Kb2luKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25Kb2luID0gY2FsbGJhY2sgfVxuXG4gIG9uTGVhdmUoY2FsbGJhY2speyB0aGlzLmNhbGxlci5vbkxlYXZlID0gY2FsbGJhY2sgfVxuXG4gIG9uU3luYyhjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uU3luYyA9IGNhbGxiYWNrIH1cblxuICBsaXN0KGJ5KXsgcmV0dXJuIFByZXNlbmNlLmxpc3QodGhpcy5zdGF0ZSwgYnkpIH1cblxuICBpblBlbmRpbmdTeW5jU3RhdGUoKXtcbiAgICByZXR1cm4gIXRoaXMuam9pblJlZiB8fCAodGhpcy5qb2luUmVmICE9PSB0aGlzLmNoYW5uZWwuam9pblJlZigpKVxuICB9XG5cbiAgLy8gbG93ZXItbGV2ZWwgcHVibGljIHN0YXRpYyBBUElcblxuICAvKipcbiAgICogVXNlZCB0byBzeW5jIHRoZSBsaXN0IG9mIHByZXNlbmNlcyBvbiB0aGUgc2VydmVyXG4gICAqIHdpdGggdGhlIGNsaWVudCdzIHN0YXRlLiBBbiBvcHRpb25hbCBgb25Kb2luYCBhbmQgYG9uTGVhdmVgIGNhbGxiYWNrIGNhblxuICAgKiBiZSBwcm92aWRlZCB0byByZWFjdCB0byBjaGFuZ2VzIGluIHRoZSBjbGllbnQncyBsb2NhbCBwcmVzZW5jZXMgYWNyb3NzXG4gICAqIGRpc2Nvbm5lY3RzIGFuZCByZWNvbm5lY3RzIHdpdGggdGhlIHNlcnZlci5cbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIHN5bmNTdGF0ZShjdXJyZW50U3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpe1xuICAgIGxldCBzdGF0ZSA9IHRoaXMuY2xvbmUoY3VycmVudFN0YXRlKVxuICAgIGxldCBqb2lucyA9IHt9XG4gICAgbGV0IGxlYXZlcyA9IHt9XG5cbiAgICB0aGlzLm1hcChzdGF0ZSwgKGtleSwgcHJlc2VuY2UpID0+IHtcbiAgICAgIGlmKCFuZXdTdGF0ZVtrZXldKXtcbiAgICAgICAgbGVhdmVzW2tleV0gPSBwcmVzZW5jZVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5tYXAobmV3U3RhdGUsIChrZXksIG5ld1ByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlKXtcbiAgICAgICAgbGV0IG5ld1JlZnMgPSBuZXdQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBjdXJSZWZzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGpvaW5lZE1ldGFzID0gbmV3UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gY3VyUmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBsZXQgbGVmdE1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IG5ld1JlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgaWYoam9pbmVkTWV0YXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlXG4gICAgICAgICAgam9pbnNba2V5XS5tZXRhcyA9IGpvaW5lZE1ldGFzXG4gICAgICAgIH1cbiAgICAgICAgaWYobGVmdE1ldGFzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIGxlYXZlc1trZXldID0gdGhpcy5jbG9uZShjdXJyZW50UHJlc2VuY2UpXG4gICAgICAgICAgbGVhdmVzW2tleV0ubWV0YXMgPSBsZWZ0TWV0YXNcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgam9pbnNba2V5XSA9IG5ld1ByZXNlbmNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5zeW5jRGlmZihzdGF0ZSwge2pvaW5zOiBqb2lucywgbGVhdmVzOiBsZWF2ZXN9LCBvbkpvaW4sIG9uTGVhdmUpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogVXNlZCB0byBzeW5jIGEgZGlmZiBvZiBwcmVzZW5jZSBqb2luIGFuZCBsZWF2ZVxuICAgKiBldmVudHMgZnJvbSB0aGUgc2VydmVyLCBhcyB0aGV5IGhhcHBlbi4gTGlrZSBgc3luY1N0YXRlYCwgYHN5bmNEaWZmYFxuICAgKiBhY2NlcHRzIG9wdGlvbmFsIGBvbkpvaW5gIGFuZCBgb25MZWF2ZWAgY2FsbGJhY2tzIHRvIHJlYWN0IHRvIGEgdXNlclxuICAgKiBqb2luaW5nIG9yIGxlYXZpbmcgZnJvbSBhIGRldmljZS5cbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIHN5bmNEaWZmKHN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpe1xuICAgIGxldCB7am9pbnMsIGxlYXZlc30gPSB0aGlzLmNsb25lKGRpZmYpXG4gICAgaWYoIW9uSm9pbil7IG9uSm9pbiA9IGZ1bmN0aW9uICgpeyB9IH1cbiAgICBpZighb25MZWF2ZSl7IG9uTGVhdmUgPSBmdW5jdGlvbiAoKXsgfSB9XG5cbiAgICB0aGlzLm1hcChqb2lucywgKGtleSwgbmV3UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBzdGF0ZVtrZXldID0gdGhpcy5jbG9uZShuZXdQcmVzZW5jZSlcbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZSl7XG4gICAgICAgIGxldCBqb2luZWRSZWZzID0gc3RhdGVba2V5XS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBjdXJNZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBqb2luZWRSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIHN0YXRlW2tleV0ubWV0YXMudW5zaGlmdCguLi5jdXJNZXRhcylcbiAgICAgIH1cbiAgICAgIG9uSm9pbihrZXksIGN1cnJlbnRQcmVzZW5jZSwgbmV3UHJlc2VuY2UpXG4gICAgfSlcbiAgICB0aGlzLm1hcChsZWF2ZXMsIChrZXksIGxlZnRQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIGlmKCFjdXJyZW50UHJlc2VuY2UpeyByZXR1cm4gfVxuICAgICAgbGV0IHJlZnNUb1JlbW92ZSA9IGxlZnRQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICBjdXJyZW50UHJlc2VuY2UubWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKHAgPT4ge1xuICAgICAgICByZXR1cm4gcmVmc1RvUmVtb3ZlLmluZGV4T2YocC5waHhfcmVmKSA8IDBcbiAgICAgIH0pXG4gICAgICBvbkxlYXZlKGtleSwgY3VycmVudFByZXNlbmNlLCBsZWZ0UHJlc2VuY2UpXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2UubWV0YXMubGVuZ3RoID09PSAwKXtcbiAgICAgICAgZGVsZXRlIHN0YXRlW2tleV1cbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFycmF5IG9mIHByZXNlbmNlcywgd2l0aCBzZWxlY3RlZCBtZXRhZGF0YS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHByZXNlbmNlc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaG9vc2VyXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBsaXN0KHByZXNlbmNlcywgY2hvb3Nlcil7XG4gICAgaWYoIWNob29zZXIpeyBjaG9vc2VyID0gZnVuY3Rpb24gKGtleSwgcHJlcyl7IHJldHVybiBwcmVzIH0gfVxuXG4gICAgcmV0dXJuIHRoaXMubWFwKHByZXNlbmNlcywgKGtleSwgcHJlc2VuY2UpID0+IHtcbiAgICAgIHJldHVybiBjaG9vc2VyKGtleSwgcHJlc2VuY2UpXG4gICAgfSlcbiAgfVxuXG4gIC8vIHByaXZhdGVcblxuICBzdGF0aWMgbWFwKG9iaiwgZnVuYyl7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikubWFwKGtleSA9PiBmdW5jKGtleSwgb2JqW2tleV0pKVxuICB9XG5cbiAgc3RhdGljIGNsb25lKG9iail7IHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpIH1cbn1cbiIsICIvKiBUaGUgZGVmYXVsdCBzZXJpYWxpemVyIGZvciBlbmNvZGluZyBhbmQgZGVjb2RpbmcgbWVzc2FnZXMgKi9cbmltcG9ydCB7XG4gIENIQU5ORUxfRVZFTlRTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgSEVBREVSX0xFTkdUSDogMSxcbiAgTUVUQV9MRU5HVEg6IDQsXG4gIEtJTkRTOiB7cHVzaDogMCwgcmVwbHk6IDEsIGJyb2FkY2FzdDogMn0sXG5cbiAgZW5jb2RlKG1zZywgY2FsbGJhY2spe1xuICAgIGlmKG1zZy5wYXlsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5iaW5hcnlFbmNvZGUobXNnKSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBheWxvYWQgPSBbbXNnLmpvaW5fcmVmLCBtc2cucmVmLCBtc2cudG9waWMsIG1zZy5ldmVudCwgbXNnLnBheWxvYWRdXG4gICAgICByZXR1cm4gY2FsbGJhY2soSlNPTi5zdHJpbmdpZnkocGF5bG9hZCkpXG4gICAgfVxuICB9LFxuXG4gIGRlY29kZShyYXdQYXlsb2FkLCBjYWxsYmFjayl7XG4gICAgaWYocmF3UGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuYmluYXJ5RGVjb2RlKHJhd1BheWxvYWQpKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgW2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZF0gPSBKU09OLnBhcnNlKHJhd1BheWxvYWQpXG4gICAgICByZXR1cm4gY2FsbGJhY2soe2pvaW5fcmVmLCByZWYsIHRvcGljLCBldmVudCwgcGF5bG9hZH0pXG4gICAgfVxuICB9LFxuXG4gIC8vIHByaXZhdGVcblxuICBiaW5hcnlFbmNvZGUobWVzc2FnZSl7XG4gICAgbGV0IHtqb2luX3JlZiwgcmVmLCBldmVudCwgdG9waWMsIHBheWxvYWR9ID0gbWVzc2FnZVxuICAgIGxldCBtZXRhTGVuZ3RoID0gdGhpcy5NRVRBX0xFTkdUSCArIGpvaW5fcmVmLmxlbmd0aCArIHJlZi5sZW5ndGggKyB0b3BpYy5sZW5ndGggKyBldmVudC5sZW5ndGhcbiAgICBsZXQgaGVhZGVyID0gbmV3IEFycmF5QnVmZmVyKHRoaXMuSEVBREVSX0xFTkdUSCArIG1ldGFMZW5ndGgpXG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoaGVhZGVyKVxuICAgIGxldCBvZmZzZXQgPSAwXG5cbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0aGlzLktJTkRTLnB1c2gpIC8vIGtpbmRcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBqb2luX3JlZi5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgcmVmLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCB0b3BpYy5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgZXZlbnQubGVuZ3RoKVxuICAgIEFycmF5LmZyb20oam9pbl9yZWYsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKHJlZiwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20odG9waWMsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKGV2ZW50LCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG5cbiAgICB2YXIgY29tYmluZWQgPSBuZXcgVWludDhBcnJheShoZWFkZXIuYnl0ZUxlbmd0aCArIHBheWxvYWQuYnl0ZUxlbmd0aClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkoaGVhZGVyKSwgMClcbiAgICBjb21iaW5lZC5zZXQobmV3IFVpbnQ4QXJyYXkocGF5bG9hZCksIGhlYWRlci5ieXRlTGVuZ3RoKVxuXG4gICAgcmV0dXJuIGNvbWJpbmVkLmJ1ZmZlclxuICB9LFxuXG4gIGJpbmFyeURlY29kZShidWZmZXIpe1xuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcilcbiAgICBsZXQga2luZCA9IHZpZXcuZ2V0VWludDgoMClcbiAgICBsZXQgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpXG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSB0aGlzLktJTkRTLnB1c2g6IHJldHVybiB0aGlzLmRlY29kZVB1c2goYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgICAgY2FzZSB0aGlzLktJTkRTLnJlcGx5OiByZXR1cm4gdGhpcy5kZWNvZGVSZXBseShidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgICBjYXNlIHRoaXMuS0lORFMuYnJvYWRjYXN0OiByZXR1cm4gdGhpcy5kZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgIH1cbiAgfSxcblxuICBkZWNvZGVQdXNoKGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoMylcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSCAtIDEgLy8gcHVzaGVzIGhhdmUgbm8gcmVmXG4gICAgbGV0IGpvaW5SZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBqb2luUmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgam9pblJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9LFxuXG4gIGRlY29kZVJlcGx5KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IGpvaW5SZWZTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCByZWZTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDMpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoNClcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgdGhpcy5NRVRBX0xFTkdUSFxuICAgIGxldCBqb2luUmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgam9pblJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGpvaW5SZWZTaXplXG4gICAgbGV0IHJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHJlZlNpemVcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcbiAgICBsZXQgcGF5bG9hZCA9IHtzdGF0dXM6IGV2ZW50LCByZXNwb25zZTogZGF0YX1cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBqb2luUmVmLCByZWY6IHJlZiwgdG9waWM6IHRvcGljLCBldmVudDogQ0hBTk5FTF9FVkVOVFMucmVwbHksIHBheWxvYWQ6IHBheWxvYWR9XG4gIH0sXG5cbiAgZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2Rlcil7XG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyAyXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG5cbiAgICByZXR1cm4ge2pvaW5fcmVmOiBudWxsLCByZWY6IG51bGwsIHRvcGljOiB0b3BpYywgZXZlbnQ6IGV2ZW50LCBwYXlsb2FkOiBkYXRhfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgZ2xvYmFsLFxuICBwaHhXaW5kb3csXG4gIENIQU5ORUxfRVZFTlRTLFxuICBERUZBVUxUX1RJTUVPVVQsXG4gIERFRkFVTFRfVlNOLFxuICBTT0NLRVRfU1RBVEVTLFxuICBUUkFOU1BPUlRTLFxuICBXU19DTE9TRV9OT1JNQUxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvc3VyZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBBamF4IGZyb20gXCIuL2FqYXhcIlxuaW1wb3J0IENoYW5uZWwgZnJvbSBcIi4vY2hhbm5lbFwiXG5pbXBvcnQgTG9uZ1BvbGwgZnJvbSBcIi4vbG9uZ3BvbGxcIlxuaW1wb3J0IFNlcmlhbGl6ZXIgZnJvbSBcIi4vc2VyaWFsaXplclwiXG5pbXBvcnQgVGltZXIgZnJvbSBcIi4vdGltZXJcIlxuXG4vKiogSW5pdGlhbGl6ZXMgdGhlIFNvY2tldCAqXG4gKlxuICogRm9yIElFOCBzdXBwb3J0IHVzZSBhbiBFUzUtc2hpbSAoaHR0cHM6Ly9naXRodWIuY29tL2VzLXNoaW1zL2VzNS1zaGltKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbmRQb2ludCAtIFRoZSBzdHJpbmcgV2ViU29ja2V0IGVuZHBvaW50LCBpZSwgYFwid3M6Ly9leGFtcGxlLmNvbS9zb2NrZXRcImAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwid3NzOi8vZXhhbXBsZS5jb21cImBcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXCIvc29ja2V0XCJgIChpbmhlcml0ZWQgaG9zdCAmIHByb3RvY29sKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnRyYW5zcG9ydF0gLSBUaGUgV2Vic29ja2V0IFRyYW5zcG9ydCwgZm9yIGV4YW1wbGUgV2ViU29ja2V0IG9yIFBob2VuaXguTG9uZ1BvbGwuXG4gKlxuICogRGVmYXVsdHMgdG8gV2ViU29ja2V0IHdpdGggYXV0b21hdGljIExvbmdQb2xsIGZhbGxiYWNrLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMuZW5jb2RlXSAtIFRoZSBmdW5jdGlvbiB0byBlbmNvZGUgb3V0Z29pbmcgbWVzc2FnZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gSlNPTiBlbmNvZGVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmRlY29kZV0gLSBUaGUgZnVuY3Rpb24gdG8gZGVjb2RlIGluY29taW5nIG1lc3NhZ2VzLlxuICpcbiAqIERlZmF1bHRzIHRvIEpTT046XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogKHBheWxvYWQsIGNhbGxiYWNrKSA9PiBjYWxsYmFjayhKU09OLnBhcnNlKHBheWxvYWQpKVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnRpbWVvdXRdIC0gVGhlIGRlZmF1bHQgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gdHJpZ2dlciBwdXNoIHRpbWVvdXRzLlxuICpcbiAqIERlZmF1bHRzIGBERUZBVUxUX1RJTUVPVVRgXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNc10gLSBUaGUgbWlsbGlzZWMgaW50ZXJ2YWwgdG8gc2VuZCBhIGhlYXJ0YmVhdCBtZXNzYWdlXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMucmVjb25uZWN0QWZ0ZXJNc10gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtaWxsaXNlY1xuICogc29ja2V0IHJlY29ubmVjdCBpbnRlcnZhbC5cbiAqXG4gKiBEZWZhdWx0cyB0byBzdGVwcGVkIGJhY2tvZmYgb2Y6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICogfVxuICogYGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5yZWpvaW5BZnRlck1zXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG1pbGxpc2VjXG4gKiByZWpvaW4gaW50ZXJ2YWwgZm9yIGluZGl2aWR1YWwgY2hhbm5lbHMuXG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwMDAsIDIwMDAsIDUwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAqIH1cbiAqIGBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5sb2dnZXJdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLCBpZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbihraW5kLCBtc2csIGRhdGEpIHtcbiAqICAgY29uc29sZS5sb2coYCR7a2luZH06ICR7bXNnfWAsIGRhdGEpXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMubG9uZ3BvbGxlclRpbWVvdXRdIC0gVGhlIG1heGltdW0gdGltZW91dCBvZiBhIGxvbmcgcG9sbCBBSkFYIHJlcXVlc3QuXG4gKlxuICogRGVmYXVsdHMgdG8gMjBzIChkb3VibGUgdGhlIHNlcnZlciBsb25nIHBvbGwgdGltZXIpLlxuICpcbiAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbil9IFtvcHRzLnBhcmFtc10gLSBUaGUgb3B0aW9uYWwgcGFyYW1zIHRvIHBhc3Mgd2hlbiBjb25uZWN0aW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuYmluYXJ5VHlwZV0gLSBUaGUgYmluYXJ5IHR5cGUgdG8gdXNlIGZvciBiaW5hcnkgV2ViU29ja2V0IGZyYW1lcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBcImFycmF5YnVmZmVyXCJcbiAqXG4gKiBAcGFyYW0ge3Zzbn0gW29wdHMudnNuXSAtIFRoZSBzZXJpYWxpemVyJ3MgcHJvdG9jb2wgdmVyc2lvbiB0byBzZW5kIG9uIGNvbm5lY3QuXG4gKlxuICogRGVmYXVsdHMgdG8gREVGQVVMVF9WU04uXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0IHtcbiAgY29uc3RydWN0b3IoZW5kUG9pbnQsIG9wdHMgPSB7fSl7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyA9IHtvcGVuOiBbXSwgY2xvc2U6IFtdLCBlcnJvcjogW10sIG1lc3NhZ2U6IFtdfVxuICAgIHRoaXMuY2hhbm5lbHMgPSBbXVxuICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5yZWYgPSAwXG4gICAgdGhpcy50aW1lb3V0ID0gb3B0cy50aW1lb3V0IHx8IERFRkFVTFRfVElNRU9VVFxuICAgIHRoaXMudHJhbnNwb3J0ID0gb3B0cy50cmFuc3BvcnQgfHwgZ2xvYmFsLldlYlNvY2tldCB8fCBMb25nUG9sbFxuICAgIHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9ucyA9IDBcbiAgICB0aGlzLmRlZmF1bHRFbmNvZGVyID0gU2VyaWFsaXplci5lbmNvZGUuYmluZChTZXJpYWxpemVyKVxuICAgIHRoaXMuZGVmYXVsdERlY29kZXIgPSBTZXJpYWxpemVyLmRlY29kZS5iaW5kKFNlcmlhbGl6ZXIpXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICB0aGlzLmJpbmFyeVR5cGUgPSBvcHRzLmJpbmFyeVR5cGUgfHwgXCJhcnJheWJ1ZmZlclwiXG4gICAgdGhpcy5jb25uZWN0Q2xvY2sgPSAxXG4gICAgaWYodGhpcy50cmFuc3BvcnQgIT09IExvbmdQb2xsKXtcbiAgICAgIHRoaXMuZW5jb2RlID0gb3B0cy5lbmNvZGUgfHwgdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSBvcHRzLmRlY29kZSB8fCB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5jb2RlID0gdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfVxuICAgIGxldCBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgIGlmKHBoeFdpbmRvdyAmJiBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcil7XG4gICAgICBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIF9lID0+IHtcbiAgICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgICAgICAgIGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPSB0aGlzLmNvbm5lY3RDbG9ja1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBfZSA9PiB7XG4gICAgICAgIGlmKGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPT09IHRoaXMuY29ubmVjdENsb2NrKXtcbiAgICAgICAgICBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgICAgICAgIHRoaXMuY29ubmVjdCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyA9IG9wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNcyB8fCAzMDAwMFxuICAgIHRoaXMucmVqb2luQWZ0ZXJNcyA9ICh0cmllcykgPT4ge1xuICAgICAgaWYob3B0cy5yZWpvaW5BZnRlck1zKXtcbiAgICAgICAgcmV0dXJuIG9wdHMucmVqb2luQWZ0ZXJNcyh0cmllcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlY29ubmVjdEFmdGVyTXMgPSAodHJpZXMpID0+IHtcbiAgICAgIGlmKG9wdHMucmVjb25uZWN0QWZ0ZXJNcyl7XG4gICAgICAgIHJldHVybiBvcHRzLnJlY29ubmVjdEFmdGVyTXModHJpZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxvZ2dlciA9IG9wdHMubG9nZ2VyIHx8IG51bGxcbiAgICB0aGlzLmxvbmdwb2xsZXJUaW1lb3V0ID0gb3B0cy5sb25ncG9sbGVyVGltZW91dCB8fCAyMDAwMFxuICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShvcHRzLnBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLmVuZFBvaW50ID0gYCR7ZW5kUG9pbnR9LyR7VFJBTlNQT1JUUy53ZWJzb2NrZXR9YFxuICAgIHRoaXMudnNuID0gb3B0cy52c24gfHwgREVGQVVMVF9WU05cbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lciA9IG51bGxcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyID0gbnVsbFxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHtcbiAgICAgIHRoaXMudGVhcmRvd24oKCkgPT4gdGhpcy5jb25uZWN0KCkpXG4gICAgfSwgdGhpcy5yZWNvbm5lY3RBZnRlck1zKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIExvbmdQb2xsIHRyYW5zcG9ydCByZWZlcmVuY2VcbiAgICovXG4gIGdldExvbmdQb2xsVHJhbnNwb3J0KCl7IHJldHVybiBMb25nUG9sbCB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIGFuZCByZXBsYWNlcyB0aGUgYWN0aXZlIHRyYW5zcG9ydFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdUcmFuc3BvcnQgLSBUaGUgbmV3IHRyYW5zcG9ydCBjbGFzcyB0byBpbnN0YW50aWF0ZVxuICAgKlxuICAgKi9cbiAgcmVwbGFjZVRyYW5zcG9ydChuZXdUcmFuc3BvcnQpe1xuICAgIHRoaXMuY29ubmVjdENsb2NrKytcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSB0cnVlXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgdGhpcy5jb25uLmNsb3NlKClcbiAgICAgIHRoaXMuY29ubiA9IG51bGxcbiAgICB9XG4gICAgdGhpcy50cmFuc3BvcnQgPSBuZXdUcmFuc3BvcnRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzb2NrZXQgcHJvdG9jb2xcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHByb3RvY29sKCl7IHJldHVybiBsb2NhdGlvbi5wcm90b2NvbC5tYXRjaCgvXmh0dHBzLykgPyBcIndzc1wiIDogXCJ3c1wiIH1cblxuICAvKipcbiAgICogVGhlIGZ1bGx5IHF1YWxpZmllZCBzb2NrZXQgdXJsXG4gICAqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBlbmRQb2ludFVSTCgpe1xuICAgIGxldCB1cmkgPSBBamF4LmFwcGVuZFBhcmFtcyhcbiAgICAgIEFqYXguYXBwZW5kUGFyYW1zKHRoaXMuZW5kUG9pbnQsIHRoaXMucGFyYW1zKCkpLCB7dnNuOiB0aGlzLnZzbn0pXG4gICAgaWYodXJpLmNoYXJBdCgwKSAhPT0gXCIvXCIpeyByZXR1cm4gdXJpIH1cbiAgICBpZih1cmkuY2hhckF0KDEpID09PSBcIi9cIil7IHJldHVybiBgJHt0aGlzLnByb3RvY29sKCl9OiR7dXJpfWAgfVxuXG4gICAgcmV0dXJuIGAke3RoaXMucHJvdG9jb2woKX06Ly8ke2xvY2F0aW9uLmhvc3R9JHt1cml9YFxuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXRcbiAgICpcbiAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9DbG9zZUV2ZW50I1N0YXR1c19jb2RlcyBmb3IgdmFsaWQgc3RhdHVzIGNvZGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIE9wdGlvbmFsIGNhbGxiYWNrIHdoaWNoIGlzIGNhbGxlZCBhZnRlciBzb2NrZXQgaXMgZGlzY29ubmVjdGVkLlxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IGNvZGUgLSBBIHN0YXR1cyBjb2RlIGZvciBkaXNjb25uZWN0aW9uIChPcHRpb25hbCkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSByZWFzb24gLSBBIHRleHR1YWwgZGVzY3JpcHRpb24gb2YgdGhlIHJlYXNvbiB0byBkaXNjb25uZWN0LiAoT3B0aW9uYWwpXG4gICAqL1xuICBkaXNjb25uZWN0KGNhbGxiYWNrLCBjb2RlLCByZWFzb24pe1xuICAgIHRoaXMuY29ubmVjdENsb2NrKytcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSB0cnVlXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy50ZWFyZG93bihjYWxsYmFjaywgY29kZSwgcmVhc29uKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBUaGUgcGFyYW1zIHRvIHNlbmQgd2hlbiBjb25uZWN0aW5nLCBmb3IgZXhhbXBsZSBge3VzZXJfaWQ6IHVzZXJUb2tlbn1gXG4gICAqXG4gICAqIFBhc3NpbmcgcGFyYW1zIHRvIGNvbm5lY3QgaXMgZGVwcmVjYXRlZDsgcGFzcyB0aGVtIGluIHRoZSBTb2NrZXQgY29uc3RydWN0b3IgaW5zdGVhZDpcbiAgICogYG5ldyBTb2NrZXQoXCIvc29ja2V0XCIsIHtwYXJhbXM6IHt1c2VyX2lkOiB1c2VyVG9rZW59fSlgLlxuICAgKi9cbiAgY29ubmVjdChwYXJhbXMpe1xuICAgIGlmKHBhcmFtcyl7XG4gICAgICBjb25zb2xlICYmIGNvbnNvbGUubG9nKFwicGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkIHBhc3MgOnBhcmFtcyB0byB0aGUgU29ja2V0IGNvbnN0cnVjdG9yXCIpXG4gICAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zKVxuICAgIH1cbiAgICBpZih0aGlzLmNvbm4peyByZXR1cm4gfVxuXG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5jb25uID0gbmV3IHRoaXMudHJhbnNwb3J0KHRoaXMuZW5kUG9pbnRVUkwoKSlcbiAgICB0aGlzLmNvbm4uYmluYXJ5VHlwZSA9IHRoaXMuYmluYXJ5VHlwZVxuICAgIHRoaXMuY29ubi50aW1lb3V0ID0gdGhpcy5sb25ncG9sbGVyVGltZW91dFxuICAgIHRoaXMuY29ubi5vbm9wZW4gPSAoKSA9PiB0aGlzLm9uQ29ubk9wZW4oKVxuICAgIHRoaXMuY29ubi5vbmVycm9yID0gZXJyb3IgPT4gdGhpcy5vbkNvbm5FcnJvcihlcnJvcilcbiAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5NZXNzYWdlKGV2ZW50KVxuICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5DbG9zZShldmVudClcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIHRoZSBtZXNzYWdlLiBPdmVycmlkZSBgdGhpcy5sb2dnZXJgIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLiBub29wcyBieSBkZWZhdWx0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBraW5kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIGxvZyhraW5kLCBtc2csIGRhdGEpeyB0aGlzLmxvZ2dlcihraW5kLCBtc2csIGRhdGEpIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGEgbG9nZ2VyIGhhcyBiZWVuIHNldCBvbiB0aGlzIHNvY2tldC5cbiAgICovXG4gIGhhc0xvZ2dlcigpeyByZXR1cm4gdGhpcy5sb2dnZXIgIT09IG51bGwgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIG9wZW4gZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbk9wZW4oZnVuY3Rpb24oKXsgY29uc29sZS5pbmZvKFwidGhlIHNvY2tldCB3YXMgb3BlbmVkXCIpIH0pXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbk9wZW4oY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBjbG9zZSBldmVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2UoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gZXJyb3IgZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbkVycm9yKGZ1bmN0aW9uKGVycm9yKXsgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZFwiKSB9KVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25FcnJvcihjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5lcnJvci5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBtZXNzYWdlIGV2ZW50c1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25NZXNzYWdlKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFBpbmdzIHRoZSBzZXJ2ZXIgYW5kIGludm9rZXMgdGhlIGNhbGxiYWNrIHdpdGggdGhlIFJUVCBpbiBtaWxsaXNlY29uZHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICpcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBwaW5nIHdhcyBwdXNoZWQgb3IgZmFsc2UgaWYgdW5hYmxlIHRvIGJlIHB1c2hlZC5cbiAgICovXG4gIHBpbmcoY2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gZmFsc2UgfVxuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIGxldCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG4gICAgdGhpcy5wdXNoKHt0b3BpYzogXCJwaG9lbml4XCIsIGV2ZW50OiBcImhlYXJ0YmVhdFwiLCBwYXlsb2FkOiB7fSwgcmVmOiByZWZ9KVxuICAgIGxldCBvbk1zZ1JlZiA9IHRoaXMub25NZXNzYWdlKG1zZyA9PiB7XG4gICAgICBpZihtc2cucmVmID09PSByZWYpe1xuICAgICAgICB0aGlzLm9mZihbb25Nc2dSZWZdKVxuICAgICAgICBjYWxsYmFjayhEYXRlLm5vdygpIC0gc3RhcnRUaW1lKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICBjbGVhckhlYXJ0YmVhdHMoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpXG4gIH1cblxuICBvbkNvbm5PcGVuKCl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYGNvbm5lY3RlZCB0byAke3RoaXMuZW5kUG9pbnRVUkwoKX1gKVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5lc3RhYmxpc2hlZENvbm5lY3Rpb25zKytcbiAgICB0aGlzLmZsdXNoU2VuZEJ1ZmZlcigpXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy5yZXNldEhlYXJ0YmVhdCgpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5vcGVuLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4gY2FsbGJhY2soKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICBoZWFydGJlYXRUaW1lb3V0KCl7XG4gICAgaWYodGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpeyB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBcImhlYXJ0YmVhdCB0aW1lb3V0LiBBdHRlbXB0aW5nIHRvIHJlLWVzdGFibGlzaCBjb25uZWN0aW9uXCIpIH1cbiAgICAgIHRoaXMudHJpZ2dlckNoYW5FcnJvcigpXG4gICAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgICAgdGhpcy50ZWFyZG93bigoKSA9PiB0aGlzLnJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpLCBXU19DTE9TRV9OT1JNQUwsIFwiaGVhcnRiZWF0IHRpbWVvdXRcIilcbiAgICB9XG4gIH1cblxuICByZXNldEhlYXJ0YmVhdCgpe1xuICAgIGlmKHRoaXMuY29ubiAmJiB0aGlzLmNvbm4uc2tpcEhlYXJ0YmVhdCl7IHJldHVybiB9XG4gICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgIHRoaXMuY2xlYXJIZWFydGJlYXRzKClcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlbmRIZWFydGJlYXQoKSwgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICB9XG5cbiAgdGVhcmRvd24oY2FsbGJhY2ssIGNvZGUsIHJlYXNvbil7XG4gICAgaWYoIXRoaXMuY29ubil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgIHRoaXMud2FpdEZvckJ1ZmZlckRvbmUoKCkgPT4ge1xuICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgaWYoY29kZSl7IHRoaXMuY29ubi5jbG9zZShjb2RlLCByZWFzb24gfHwgXCJcIikgfSBlbHNlIHsgdGhpcy5jb25uLmNsb3NlKCkgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLndhaXRGb3JTb2NrZXRDbG9zZWQoKCkgPT4ge1xuICAgICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICAgIHRoaXMuY29ubi5vbm9wZW4gPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uLm9uZXJyb3IgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uLm9ubWVzc2FnZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICAgICAgICB0aGlzLmNvbm4ub25jbG9zZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICAgICAgICB0aGlzLmNvbm4gPSBudWxsXG4gICAgICAgIH1cblxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICB3YWl0Rm9yQnVmZmVyRG9uZShjYWxsYmFjaywgdHJpZXMgPSAxKXtcbiAgICBpZih0cmllcyA9PT0gNSB8fCAhdGhpcy5jb25uIHx8ICF0aGlzLmNvbm4uYnVmZmVyZWRBbW91bnQpe1xuICAgICAgY2FsbGJhY2soKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLndhaXRGb3JCdWZmZXJEb25lKGNhbGxiYWNrLCB0cmllcyArIDEpXG4gICAgfSwgMTUwICogdHJpZXMpXG4gIH1cblxuICB3YWl0Rm9yU29ja2V0Q2xvc2VkKGNhbGxiYWNrLCB0cmllcyA9IDEpe1xuICAgIGlmKHRyaWVzID09PSA1IHx8ICF0aGlzLmNvbm4gfHwgdGhpcy5jb25uLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMuY2xvc2VkKXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YWl0Rm9yU29ja2V0Q2xvc2VkKGNhbGxiYWNrLCB0cmllcyArIDEpXG4gICAgfSwgMTUwICogdHJpZXMpXG4gIH1cblxuICBvbkNvbm5DbG9zZShldmVudCl7XG4gICAgbGV0IGNsb3NlQ29kZSA9IGV2ZW50ICYmIGV2ZW50LmNvZGVcbiAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBcImNsb3NlXCIsIGV2ZW50KVxuICAgIHRoaXMudHJpZ2dlckNoYW5FcnJvcigpXG4gICAgdGhpcy5jbGVhckhlYXJ0YmVhdHMoKVxuICAgIGlmKCF0aGlzLmNsb3NlV2FzQ2xlYW4gJiYgY2xvc2VDb2RlICE9PSAxMDAwKXtcbiAgICAgIHRoaXMucmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KClcbiAgICB9XG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5jbG9zZS5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IGNhbGxiYWNrKGV2ZW50KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgb25Db25uRXJyb3IoZXJyb3Ipe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGVycm9yKVxuICAgIGxldCB0cmFuc3BvcnRCZWZvcmUgPSB0aGlzLnRyYW5zcG9ydFxuICAgIGxldCBlc3RhYmxpc2hlZEJlZm9yZSA9IHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9uc1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IuZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgdHJhbnNwb3J0QmVmb3JlLCBlc3RhYmxpc2hlZEJlZm9yZSlcbiAgICB9KVxuICAgIGlmKHRyYW5zcG9ydEJlZm9yZSA9PT0gdGhpcy50cmFuc3BvcnQgfHwgZXN0YWJsaXNoZWRCZWZvcmUgPiAwKXtcbiAgICAgIHRoaXMudHJpZ2dlckNoYW5FcnJvcigpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyQ2hhbkVycm9yKCl7XG4gICAgdGhpcy5jaGFubmVscy5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgaWYoIShjaGFubmVsLmlzRXJyb3JlZCgpIHx8IGNoYW5uZWwuaXNMZWF2aW5nKCkgfHwgY2hhbm5lbC5pc0Nsb3NlZCgpKSl7XG4gICAgICAgIGNoYW5uZWwudHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBjb25uZWN0aW9uU3RhdGUoKXtcbiAgICBzd2l0Y2godGhpcy5jb25uICYmIHRoaXMuY29ubi5yZWFkeVN0YXRlKXtcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nOiByZXR1cm4gXCJjb25uZWN0aW5nXCJcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5vcGVuOiByZXR1cm4gXCJvcGVuXCJcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jbG9zaW5nOiByZXR1cm4gXCJjbG9zaW5nXCJcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNsb3NlZFwiXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuY29ubmVjdGlvblN0YXRlKCkgPT09IFwib3BlblwiIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICpcbiAgICogQHBhcmFtIHtDaGFubmVsfVxuICAgKi9cbiAgcmVtb3ZlKGNoYW5uZWwpe1xuICAgIHRoaXMub2ZmKGNoYW5uZWwuc3RhdGVDaGFuZ2VSZWZzKVxuICAgIHRoaXMuY2hhbm5lbHMgPSB0aGlzLmNoYW5uZWxzLmZpbHRlcihjID0+IGMuam9pblJlZigpICE9PSBjaGFubmVsLmpvaW5SZWYoKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGBvbk9wZW5gLCBgb25DbG9zZWAsIGBvbkVycm9yLGAgYW5kIGBvbk1lc3NhZ2VgIHJlZ2lzdHJhdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7cmVmc30gLSBsaXN0IG9mIHJlZnMgcmV0dXJuZWQgYnkgY2FsbHMgdG9cbiAgICogICAgICAgICAgICAgICAgIGBvbk9wZW5gLCBgb25DbG9zZWAsIGBvbkVycm9yLGAgYW5kIGBvbk1lc3NhZ2VgXG4gICAqL1xuICBvZmYocmVmcyl7XG4gICAgZm9yKGxldCBrZXkgaW4gdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyl7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzW2tleV0gPSB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzW2tleV0uZmlsdGVyKChbcmVmXSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVmcy5pbmRleE9mKHJlZikgPT09IC0xXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgYSBuZXcgY2hhbm5lbCBmb3IgdGhlIGdpdmVuIHRvcGljXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICAgKiBAcGFyYW0ge09iamVjdH0gY2hhblBhcmFtcyAtIFBhcmFtZXRlcnMgZm9yIHRoZSBjaGFubmVsXG4gICAqIEByZXR1cm5zIHtDaGFubmVsfVxuICAgKi9cbiAgY2hhbm5lbCh0b3BpYywgY2hhblBhcmFtcyA9IHt9KXtcbiAgICBsZXQgY2hhbiA9IG5ldyBDaGFubmVsKHRvcGljLCBjaGFuUGFyYW1zLCB0aGlzKVxuICAgIHRoaXMuY2hhbm5lbHMucHVzaChjaGFuKVxuICAgIHJldHVybiBjaGFuXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIHB1c2goZGF0YSl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSl7XG4gICAgICBsZXQge3RvcGljLCBldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZn0gPSBkYXRhXG4gICAgICB0aGlzLmxvZyhcInB1c2hcIiwgYCR7dG9waWN9ICR7ZXZlbnR9ICgke2pvaW5fcmVmfSwgJHtyZWZ9KWAsIHBheWxvYWQpXG4gICAgfVxuXG4gICAgaWYodGhpcy5pc0Nvbm5lY3RlZCgpKXtcbiAgICAgIHRoaXMuZW5jb2RlKGRhdGEsIHJlc3VsdCA9PiB0aGlzLmNvbm4uc2VuZChyZXN1bHQpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaCgoKSA9PiB0aGlzLmVuY29kZShkYXRhLCByZXN1bHQgPT4gdGhpcy5jb25uLnNlbmQocmVzdWx0KSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgbmV4dCBtZXNzYWdlIHJlZiwgYWNjb3VudGluZyBmb3Igb3ZlcmZsb3dzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBtYWtlUmVmKCl7XG4gICAgbGV0IG5ld1JlZiA9IHRoaXMucmVmICsgMVxuICAgIGlmKG5ld1JlZiA9PT0gdGhpcy5yZWYpeyB0aGlzLnJlZiA9IDAgfSBlbHNlIHsgdGhpcy5yZWYgPSBuZXdSZWYgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVmLnRvU3RyaW5nKClcbiAgfVxuXG4gIHNlbmRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgJiYgIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnB1c2goe3RvcGljOiBcInBob2VuaXhcIiwgZXZlbnQ6IFwiaGVhcnRiZWF0XCIsIHBheWxvYWQ6IHt9LCByZWY6IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZn0pXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMuaGVhcnRiZWF0VGltZW91dCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gIH1cblxuICBmbHVzaFNlbmRCdWZmZXIoKXtcbiAgICBpZih0aGlzLmlzQ29ubmVjdGVkKCkgJiYgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aCA+IDApe1xuICAgICAgdGhpcy5zZW5kQnVmZmVyLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soKSlcbiAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdXG4gICAgfVxuICB9XG5cbiAgb25Db25uTWVzc2FnZShyYXdNZXNzYWdlKXtcbiAgICB0aGlzLmRlY29kZShyYXdNZXNzYWdlLmRhdGEsIG1zZyA9PiB7XG4gICAgICBsZXQge3RvcGljLCBldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZn0gPSBtc2dcbiAgICAgIGlmKHJlZiAmJiByZWYgPT09IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZil7XG4gICAgICAgIHRoaXMuY2xlYXJIZWFydGJlYXRzKClcbiAgICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgICAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlbmRIZWFydGJlYXQoKSwgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zKVxuICAgICAgfVxuXG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInJlY2VpdmVcIiwgYCR7cGF5bG9hZC5zdGF0dXMgfHwgXCJcIn0gJHt0b3BpY30gJHtldmVudH0gJHtyZWYgJiYgXCIoXCIgKyByZWYgKyBcIilcIiB8fCBcIlwifWAsIHBheWxvYWQpXG5cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmNoYW5uZWxzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgY29uc3QgY2hhbm5lbCA9IHRoaXMuY2hhbm5lbHNbaV1cbiAgICAgICAgaWYoIWNoYW5uZWwuaXNNZW1iZXIodG9waWMsIGV2ZW50LCBwYXlsb2FkLCBqb2luX3JlZikpeyBjb250aW51ZSB9XG4gICAgICAgIGNoYW5uZWwudHJpZ2dlcihldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZilcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZS5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGxldCBbLCBjYWxsYmFja10gPSB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2VbaV1cbiAgICAgICAgY2FsbGJhY2sobXNnKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBsZWF2ZU9wZW5Ub3BpYyh0b3BpYyl7XG4gICAgbGV0IGR1cENoYW5uZWwgPSB0aGlzLmNoYW5uZWxzLmZpbmQoYyA9PiBjLnRvcGljID09PSB0b3BpYyAmJiAoYy5pc0pvaW5lZCgpIHx8IGMuaXNKb2luaW5nKCkpKVxuICAgIGlmKGR1cENoYW5uZWwpe1xuICAgICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYGxlYXZpbmcgZHVwbGljYXRlIHRvcGljIFwiJHt0b3BpY31cImApXG4gICAgICBkdXBDaGFubmVsLmxlYXZlKClcbiAgICB9XG4gIH1cbn0iLCAiZXhwb3J0IGNvbnN0IENPTlNFQ1VUSVZFX1JFTE9BRFMgPSBcImNvbnNlY3V0aXZlLXJlbG9hZHNcIlxuZXhwb3J0IGNvbnN0IE1BWF9SRUxPQURTID0gMTBcbmV4cG9ydCBjb25zdCBSRUxPQURfSklUVEVSX01JTiA9IDUwMDBcbmV4cG9ydCBjb25zdCBSRUxPQURfSklUVEVSX01BWCA9IDEwMDAwXG5leHBvcnQgY29uc3QgRkFJTFNBRkVfSklUVEVSID0gMzAwMDBcbmV4cG9ydCBjb25zdCBQSFhfRVZFTlRfQ0xBU1NFUyA9IFtcbiAgXCJwaHgtY2xpY2stbG9hZGluZ1wiLCBcInBoeC1jaGFuZ2UtbG9hZGluZ1wiLCBcInBoeC1zdWJtaXQtbG9hZGluZ1wiLFxuICBcInBoeC1rZXlkb3duLWxvYWRpbmdcIiwgXCJwaHgta2V5dXAtbG9hZGluZ1wiLCBcInBoeC1ibHVyLWxvYWRpbmdcIiwgXCJwaHgtZm9jdXMtbG9hZGluZ1wiXG5dXG5leHBvcnQgY29uc3QgUEhYX0NPTVBPTkVOVCA9IFwiZGF0YS1waHgtY29tcG9uZW50XCJcbmV4cG9ydCBjb25zdCBQSFhfTElWRV9MSU5LID0gXCJkYXRhLXBoeC1saW5rXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJBQ0tfU1RBVElDID0gXCJ0cmFjay1zdGF0aWNcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSU5LX1NUQVRFID0gXCJkYXRhLXBoeC1saW5rLXN0YXRlXCJcbmV4cG9ydCBjb25zdCBQSFhfUkVGID0gXCJkYXRhLXBoeC1yZWZcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUZfU1JDID0gXCJkYXRhLXBoeC1yZWYtc3JjXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJBQ0tfVVBMT0FEUyA9IFwidHJhY2stdXBsb2Fkc1wiXG5leHBvcnQgY29uc3QgUEhYX1VQTE9BRF9SRUYgPSBcImRhdGEtcGh4LXVwbG9hZC1yZWZcIlxuZXhwb3J0IGNvbnN0IFBIWF9QUkVGTElHSFRFRF9SRUZTID0gXCJkYXRhLXBoeC1wcmVmbGlnaHRlZC1yZWZzXCJcbmV4cG9ydCBjb25zdCBQSFhfRE9ORV9SRUZTID0gXCJkYXRhLXBoeC1kb25lLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9EUk9QX1RBUkdFVCA9IFwiZHJvcC10YXJnZXRcIlxuZXhwb3J0IGNvbnN0IFBIWF9BQ1RJVkVfRU5UUllfUkVGUyA9IFwiZGF0YS1waHgtYWN0aXZlLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCA9IFwicGh4OmxpdmUtZmlsZTp1cGRhdGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfU0tJUCA9IFwiZGF0YS1waHgtc2tpcFwiXG5leHBvcnQgY29uc3QgUEhYX1BSVU5FID0gXCJkYXRhLXBoeC1wcnVuZVwiXG5leHBvcnQgY29uc3QgUEhYX1BBR0VfTE9BRElORyA9IFwicGFnZS1sb2FkaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfQ09OTkVDVEVEX0NMQVNTID0gXCJwaHgtY29ubmVjdGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQ09OTkVDVEVEX0NMQVNTID0gXCJwaHgtbG9hZGluZ1wiXG5leHBvcnQgY29uc3QgUEhYX05PX0ZFRURCQUNLX0NMQVNTID0gXCJwaHgtbm8tZmVlZGJhY2tcIlxuZXhwb3J0IGNvbnN0IFBIWF9FUlJPUl9DTEFTUyA9IFwicGh4LWVycm9yXCJcbmV4cG9ydCBjb25zdCBQSFhfUEFSRU5UX0lEID0gXCJkYXRhLXBoeC1wYXJlbnQtaWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9NQUlOID0gXCJkYXRhLXBoeC1tYWluXCJcbmV4cG9ydCBjb25zdCBQSFhfUk9PVF9JRCA9IFwiZGF0YS1waHgtcm9vdC1pZFwiXG5leHBvcnQgY29uc3QgUEhYX1RSSUdHRVJfQUNUSU9OID0gXCJ0cmlnZ2VyLWFjdGlvblwiXG5leHBvcnQgY29uc3QgUEhYX0ZFRURCQUNLX0ZPUiA9IFwiZmVlZGJhY2stZm9yXCJcbmV4cG9ydCBjb25zdCBQSFhfSEFTX0ZPQ1VTRUQgPSBcInBoeC1oYXMtZm9jdXNlZFwiXG5leHBvcnQgY29uc3QgRk9DVVNBQkxFX0lOUFVUUyA9IFtcInRleHRcIiwgXCJ0ZXh0YXJlYVwiLCBcIm51bWJlclwiLCBcImVtYWlsXCIsIFwicGFzc3dvcmRcIiwgXCJzZWFyY2hcIiwgXCJ0ZWxcIiwgXCJ1cmxcIiwgXCJkYXRlXCIsIFwidGltZVwiLCBcImRhdGV0aW1lLWxvY2FsXCIsIFwiY29sb3JcIiwgXCJyYW5nZVwiXVxuZXhwb3J0IGNvbnN0IENIRUNLQUJMRV9JTlBVVFMgPSBbXCJjaGVja2JveFwiLCBcInJhZGlvXCJdXG5leHBvcnQgY29uc3QgUEhYX0hBU19TVUJNSVRURUQgPSBcInBoeC1oYXMtc3VibWl0dGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfU0VTU0lPTiA9IFwiZGF0YS1waHgtc2Vzc2lvblwiXG5leHBvcnQgY29uc3QgUEhYX1ZJRVdfU0VMRUNUT1IgPSBgWyR7UEhYX1NFU1NJT059XWBcbmV4cG9ydCBjb25zdCBQSFhfU1RJQ0tZID0gXCJkYXRhLXBoeC1zdGlja3lcIlxuZXhwb3J0IGNvbnN0IFBIWF9TVEFUSUMgPSBcImRhdGEtcGh4LXN0YXRpY1wiXG5leHBvcnQgY29uc3QgUEhYX1JFQURPTkxZID0gXCJkYXRhLXBoeC1yZWFkb25seVwiXG5leHBvcnQgY29uc3QgUEhYX0RJU0FCTEVEID0gXCJkYXRhLXBoeC1kaXNhYmxlZFwiXG5leHBvcnQgY29uc3QgUEhYX0RJU0FCTEVfV0lUSCA9IFwiZGlzYWJsZS13aXRoXCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUgPSBcImRhdGEtcGh4LWRpc2FibGUtd2l0aC1yZXN0b3JlXCJcbmV4cG9ydCBjb25zdCBQSFhfSE9PSyA9IFwiaG9va1wiXG5leHBvcnQgY29uc3QgUEhYX0RFQk9VTkNFID0gXCJkZWJvdW5jZVwiXG5leHBvcnQgY29uc3QgUEhYX1RIUk9UVExFID0gXCJ0aHJvdHRsZVwiXG5leHBvcnQgY29uc3QgUEhYX1VQREFURSA9IFwidXBkYXRlXCJcbmV4cG9ydCBjb25zdCBQSFhfS0VZID0gXCJrZXlcIlxuZXhwb3J0IGNvbnN0IFBIWF9QUklWQVRFID0gXCJwaHhQcml2YXRlXCJcbmV4cG9ydCBjb25zdCBQSFhfQVVUT19SRUNPVkVSID0gXCJhdXRvLXJlY292ZXJcIlxuZXhwb3J0IGNvbnN0IFBIWF9MVl9ERUJVRyA9IFwicGh4OmxpdmUtc29ja2V0OmRlYnVnXCJcbmV4cG9ydCBjb25zdCBQSFhfTFZfUFJPRklMRSA9IFwicGh4OmxpdmUtc29ja2V0OnByb2ZpbGluZ1wiXG5leHBvcnQgY29uc3QgUEhYX0xWX0xBVEVOQ1lfU0lNID0gXCJwaHg6bGl2ZS1zb2NrZXQ6bGF0ZW5jeS1zaW1cIlxuZXhwb3J0IGNvbnN0IFBIWF9QUk9HUkVTUyA9IFwicHJvZ3Jlc3NcIlxuZXhwb3J0IGNvbnN0IFBIWF9NT1VOVEVEID0gXCJtb3VudGVkXCJcbmV4cG9ydCBjb25zdCBMT0FERVJfVElNRU9VVCA9IDFcbmV4cG9ydCBjb25zdCBCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VUID0gMjAwXG5leHBvcnQgY29uc3QgQklORElOR19QUkVGSVggPSBcInBoeC1cIlxuZXhwb3J0IGNvbnN0IFBVU0hfVElNRU9VVCA9IDMwMDAwXG5leHBvcnQgY29uc3QgTElOS19IRUFERVIgPSBcIngtcmVxdWVzdGVkLXdpdGhcIlxuZXhwb3J0IGNvbnN0IFJFU1BPTlNFX1VSTF9IRUFERVIgPSBcIngtcmVzcG9uc2UtdXJsXCJcbmV4cG9ydCBjb25zdCBERUJPVU5DRV9UUklHR0VSID0gXCJkZWJvdW5jZS10cmlnZ2VyXCJcbmV4cG9ydCBjb25zdCBUSFJPVFRMRUQgPSBcInRocm90dGxlZFwiXG5leHBvcnQgY29uc3QgREVCT1VOQ0VfUFJFVl9LRVkgPSBcImRlYm91bmNlLXByZXYta2V5XCJcbmV4cG9ydCBjb25zdCBERUZBVUxUUyA9IHtcbiAgZGVib3VuY2U6IDMwMCxcbiAgdGhyb3R0bGU6IDMwMFxufVxuXG4vLyBSZW5kZXJlZFxuZXhwb3J0IGNvbnN0IERZTkFNSUNTID0gXCJkXCJcbmV4cG9ydCBjb25zdCBTVEFUSUMgPSBcInNcIlxuZXhwb3J0IGNvbnN0IENPTVBPTkVOVFMgPSBcImNcIlxuZXhwb3J0IGNvbnN0IEVWRU5UUyA9IFwiZVwiXG5leHBvcnQgY29uc3QgUkVQTFkgPSBcInJcIlxuZXhwb3J0IGNvbnN0IFRJVExFID0gXCJ0XCJcbmV4cG9ydCBjb25zdCBURU1QTEFURVMgPSBcInBcIlxuIiwgImltcG9ydCB7XG4gIGxvZ0Vycm9yXG59IGZyb20gXCIuL3V0aWxzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50cnlVcGxvYWRlciB7XG4gIGNvbnN0cnVjdG9yKGVudHJ5LCBjaHVua1NpemUsIGxpdmVTb2NrZXQpe1xuICAgIHRoaXMubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXRcbiAgICB0aGlzLmVudHJ5ID0gZW50cnlcbiAgICB0aGlzLm9mZnNldCA9IDBcbiAgICB0aGlzLmNodW5rU2l6ZSA9IGNodW5rU2l6ZVxuICAgIHRoaXMuY2h1bmtUaW1lciA9IG51bGxcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwgPSBsaXZlU29ja2V0LmNoYW5uZWwoYGx2dToke2VudHJ5LnJlZn1gLCB7dG9rZW46IGVudHJ5Lm1ldGFkYXRhKCl9KVxuICB9XG5cbiAgZXJyb3IocmVhc29uKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5jaHVua1RpbWVyKVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5sZWF2ZSgpXG4gICAgdGhpcy5lbnRyeS5lcnJvcihyZWFzb24pXG4gIH1cblxuICB1cGxvYWQoKXtcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwub25FcnJvcihyZWFzb24gPT4gdGhpcy5lcnJvcihyZWFzb24pKVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5qb2luKClcbiAgICAgIC5yZWNlaXZlKFwib2tcIiwgX2RhdGEgPT4gdGhpcy5yZWFkTmV4dENodW5rKCkpXG4gICAgICAucmVjZWl2ZShcImVycm9yXCIsIHJlYXNvbiA9PiB0aGlzLmVycm9yKHJlYXNvbikpXG4gIH1cblxuICBpc0RvbmUoKXsgcmV0dXJuIHRoaXMub2Zmc2V0ID49IHRoaXMuZW50cnkuZmlsZS5zaXplIH1cblxuICByZWFkTmV4dENodW5rKCl7XG4gICAgbGV0IHJlYWRlciA9IG5ldyB3aW5kb3cuRmlsZVJlYWRlcigpXG4gICAgbGV0IGJsb2IgPSB0aGlzLmVudHJ5LmZpbGUuc2xpY2UodGhpcy5vZmZzZXQsIHRoaXMuY2h1bmtTaXplICsgdGhpcy5vZmZzZXQpXG4gICAgcmVhZGVyLm9ubG9hZCA9IChlKSA9PiB7XG4gICAgICBpZihlLnRhcmdldC5lcnJvciA9PT0gbnVsbCl7XG4gICAgICAgIHRoaXMub2Zmc2V0ICs9IGUudGFyZ2V0LnJlc3VsdC5ieXRlTGVuZ3RoXG4gICAgICAgIHRoaXMucHVzaENodW5rKGUudGFyZ2V0LnJlc3VsdClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBsb2dFcnJvcihcIlJlYWQgZXJyb3I6IFwiICsgZS50YXJnZXQuZXJyb3IpXG4gICAgICB9XG4gICAgfVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICB9XG5cbiAgcHVzaENodW5rKGNodW5rKXtcbiAgICBpZighdGhpcy51cGxvYWRDaGFubmVsLmlzSm9pbmVkKCkpeyByZXR1cm4gfVxuICAgIHRoaXMudXBsb2FkQ2hhbm5lbC5wdXNoKFwiY2h1bmtcIiwgY2h1bmspXG4gICAgICAucmVjZWl2ZShcIm9rXCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5lbnRyeS5wcm9ncmVzcygodGhpcy5vZmZzZXQgLyB0aGlzLmVudHJ5LmZpbGUuc2l6ZSkgKiAxMDApXG4gICAgICAgIGlmKCF0aGlzLmlzRG9uZSgpKXtcbiAgICAgICAgICB0aGlzLmNodW5rVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHRoaXMucmVhZE5leHRDaHVuaygpLCB0aGlzLmxpdmVTb2NrZXQuZ2V0TGF0ZW5jeVNpbSgpIHx8IDApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBQSFhfVklFV19TRUxFQ1RPUlxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQgRW50cnlVcGxvYWRlciBmcm9tIFwiLi9lbnRyeV91cGxvYWRlclwiXG5cbmV4cG9ydCBsZXQgbG9nRXJyb3IgPSAobXNnLCBvYmopID0+IGNvbnNvbGUuZXJyb3IgJiYgY29uc29sZS5lcnJvcihtc2csIG9iailcblxuZXhwb3J0IGxldCBpc0NpZCA9IChjaWQpID0+IHtcbiAgbGV0IHR5cGUgPSB0eXBlb2YoY2lkKVxuICByZXR1cm4gdHlwZSA9PT0gXCJudW1iZXJcIiB8fCAodHlwZSA9PT0gXCJzdHJpbmdcIiAmJiAvXigwfFsxLTldXFxkKikkLy50ZXN0KGNpZCkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3REdXBsaWNhdGVJZHMoKXtcbiAgbGV0IGlkcyA9IG5ldyBTZXQoKVxuICBsZXQgZWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiKltpZF1cIilcbiAgZm9yKGxldCBpID0gMCwgbGVuID0gZWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspe1xuICAgIGlmKGlkcy5oYXMoZWxlbXNbaV0uaWQpKXtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYE11bHRpcGxlIElEcyBkZXRlY3RlZDogJHtlbGVtc1tpXS5pZH0uIEVuc3VyZSB1bmlxdWUgZWxlbWVudCBpZHMuYClcbiAgICB9IGVsc2Uge1xuICAgICAgaWRzLmFkZChlbGVtc1tpXS5pZClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGxldCBkZWJ1ZyA9ICh2aWV3LCBraW5kLCBtc2csIG9iaikgPT4ge1xuICBpZih2aWV3LmxpdmVTb2NrZXQuaXNEZWJ1Z0VuYWJsZWQoKSl7XG4gICAgY29uc29sZS5sb2coYCR7dmlldy5pZH0gJHtraW5kfTogJHttc2d9IC0gYCwgb2JqKVxuICB9XG59XG5cbi8vIHdyYXBzIHZhbHVlIGluIGNsb3N1cmUgb3IgcmV0dXJucyBjbG9zdXJlXG5leHBvcnQgbGV0IGNsb3N1cmUgPSAodmFsKSA9PiB0eXBlb2YgdmFsID09PSBcImZ1bmN0aW9uXCIgPyB2YWwgOiBmdW5jdGlvbiAoKXsgcmV0dXJuIHZhbCB9XG5cbmV4cG9ydCBsZXQgY2xvbmUgPSAob2JqKSA9PiB7IHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iaikpIH1cblxuZXhwb3J0IGxldCBjbG9zZXN0UGh4QmluZGluZyA9IChlbCwgYmluZGluZywgYm9yZGVyRWwpID0+IHtcbiAgZG8ge1xuICAgIGlmKGVsLm1hdGNoZXMoYFske2JpbmRpbmd9XWApICYmICFlbC5kaXNhYmxlZCl7IHJldHVybiBlbCB9XG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGVcbiAgfSB3aGlsZShlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSAmJiAhKChib3JkZXJFbCAmJiBib3JkZXJFbC5pc1NhbWVOb2RlKGVsKSkgfHwgZWwubWF0Y2hlcyhQSFhfVklFV19TRUxFQ1RPUikpKVxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgbGV0IGlzT2JqZWN0ID0gKG9iaikgPT4ge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgIShvYmogaW5zdGFuY2VvZiBBcnJheSlcbn1cblxuZXhwb3J0IGxldCBpc0VxdWFsT2JqID0gKG9iajEsIG9iajIpID0+IEpTT04uc3RyaW5naWZ5KG9iajEpID09PSBKU09OLnN0cmluZ2lmeShvYmoyKVxuXG5leHBvcnQgbGV0IGlzRW1wdHkgPSAob2JqKSA9PiB7XG4gIGZvcihsZXQgeCBpbiBvYmopeyByZXR1cm4gZmFsc2UgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgbGV0IG1heWJlID0gKGVsLCBjYWxsYmFjaykgPT4gZWwgJiYgY2FsbGJhY2soZWwpXG5cbmV4cG9ydCBsZXQgY2hhbm5lbFVwbG9hZGVyID0gZnVuY3Rpb24gKGVudHJpZXMsIG9uRXJyb3IsIHJlc3AsIGxpdmVTb2NrZXQpe1xuICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgIGxldCBlbnRyeVVwbG9hZGVyID0gbmV3IEVudHJ5VXBsb2FkZXIoZW50cnksIHJlc3AuY29uZmlnLmNodW5rX3NpemUsIGxpdmVTb2NrZXQpXG4gICAgZW50cnlVcGxvYWRlci51cGxvYWQoKVxuICB9KVxufVxuIiwgImxldCBCcm93c2VyID0ge1xuICBjYW5QdXNoU3RhdGUoKXsgcmV0dXJuICh0eXBlb2YgKGhpc3RvcnkucHVzaFN0YXRlKSAhPT0gXCJ1bmRlZmluZWRcIikgfSxcblxuICBkcm9wTG9jYWwobG9jYWxTdG9yYWdlLCBuYW1lc3BhY2UsIHN1YmtleSl7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpKVxuICB9LFxuXG4gIHVwZGF0ZUxvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXksIGluaXRpYWwsIGZ1bmMpe1xuICAgIGxldCBjdXJyZW50ID0gdGhpcy5nZXRMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5KVxuICAgIGxldCBrZXkgPSB0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KVxuICAgIGxldCBuZXdWYWwgPSBjdXJyZW50ID09PSBudWxsID8gaW5pdGlhbCA6IGZ1bmMoY3VycmVudClcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG5ld1ZhbCkpXG4gICAgcmV0dXJuIG5ld1ZhbFxuICB9LFxuXG4gIGdldExvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXkpe1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpKSlcbiAgfSxcblxuICB1cGRhdGVDdXJyZW50U3RhdGUoY2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmNhblB1c2hTdGF0ZSgpKXsgcmV0dXJuIH1cbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShjYWxsYmFjayhoaXN0b3J5LnN0YXRlIHx8IHt9KSwgXCJcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpXG4gIH0sXG5cbiAgcHVzaFN0YXRlKGtpbmQsIG1ldGEsIHRvKXtcbiAgICBpZih0aGlzLmNhblB1c2hTdGF0ZSgpKXtcbiAgICAgIGlmKHRvICE9PSB3aW5kb3cubG9jYXRpb24uaHJlZil7XG4gICAgICAgIGlmKG1ldGEudHlwZSA9PSBcInJlZGlyZWN0XCIgJiYgbWV0YS5zY3JvbGwpe1xuICAgICAgICAgIC8vIElmIHdlJ3JlIHJlZGlyZWN0aW5nIHN0b3JlIHRoZSBjdXJyZW50IHNjcm9sbFkgZm9yIHRoZSBjdXJyZW50IGhpc3Rvcnkgc3RhdGUuXG4gICAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZSA9IGhpc3Rvcnkuc3RhdGUgfHwge31cbiAgICAgICAgICBjdXJyZW50U3RhdGUuc2Nyb2xsID0gbWV0YS5zY3JvbGxcbiAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShjdXJyZW50U3RhdGUsIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIG1ldGEuc2Nyb2xsIC8vIE9ubHkgc3RvcmUgdGhlIHNjcm9sbCBpbiB0aGUgcmVkaXJlY3QgY2FzZS5cbiAgICAgICAgaGlzdG9yeVtraW5kICsgXCJTdGF0ZVwiXShtZXRhLCBcIlwiLCB0byB8fCBudWxsKSAvLyBJRSB3aWxsIGNvZXJjZSB1bmRlZmluZWQgdG8gc3RyaW5nXG4gICAgICAgIGxldCBoYXNoRWwgPSB0aGlzLmdldEhhc2hUYXJnZXRFbCh3aW5kb3cubG9jYXRpb24uaGFzaClcblxuICAgICAgICBpZihoYXNoRWwpe1xuICAgICAgICAgIGhhc2hFbC5zY3JvbGxJbnRvVmlldygpXG4gICAgICAgIH0gZWxzZSBpZihtZXRhLnR5cGUgPT09IFwicmVkaXJlY3RcIil7XG4gICAgICAgICAgd2luZG93LnNjcm9sbCgwLCAwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVkaXJlY3QodG8pXG4gICAgfVxuICB9LFxuXG4gIHNldENvb2tpZShuYW1lLCB2YWx1ZSl7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09JHt2YWx1ZX1gXG4gIH0sXG5cbiAgZ2V0Q29va2llKG5hbWUpe1xuICAgIHJldHVybiBkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzooPzpefC4qO1xccyopJHtuYW1lfVxccypcXD1cXHMqKFteO10qKS4qJCl8Xi4qJGApLCBcIiQxXCIpXG4gIH0sXG5cbiAgcmVkaXJlY3QodG9VUkwsIGZsYXNoKXtcbiAgICBpZihmbGFzaCl7IEJyb3dzZXIuc2V0Q29va2llKFwiX19waG9lbml4X2ZsYXNoX19cIiwgZmxhc2ggKyBcIjsgbWF4LWFnZT02MDAwMDsgcGF0aD0vXCIpIH1cbiAgICB3aW5kb3cubG9jYXRpb24gPSB0b1VSTFxuICB9LFxuXG4gIGxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KXsgcmV0dXJuIGAke25hbWVzcGFjZX0tJHtzdWJrZXl9YCB9LFxuXG4gIGdldEhhc2hUYXJnZXRFbChtYXliZUhhc2gpe1xuICAgIGxldCBoYXNoID0gbWF5YmVIYXNoLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDEpXG4gICAgaWYoaGFzaCA9PT0gXCJcIil7IHJldHVybiB9XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGFbbmFtZT1cIiR7aGFzaH1cIl1gKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJyb3dzZXJcbiIsICJpbXBvcnQge1xuICBDSEVDS0FCTEVfSU5QVVRTLFxuICBERUJPVU5DRV9QUkVWX0tFWSxcbiAgREVCT1VOQ0VfVFJJR0dFUixcbiAgRk9DVVNBQkxFX0lOUFVUUyxcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX0VWRU5UX0NMQVNTRVMsXG4gIFBIWF9IQVNfRk9DVVNFRCxcbiAgUEhYX0hBU19TVUJNSVRURUQsXG4gIFBIWF9NQUlOLFxuICBQSFhfTk9fRkVFREJBQ0tfQ0xBU1MsXG4gIFBIWF9QQVJFTlRfSUQsXG4gIFBIWF9QUklWQVRFLFxuICBQSFhfUkVGLFxuICBQSFhfUkVGX1NSQyxcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9TRVNTSU9OLFxuICBQSFhfU1RBVElDLFxuICBQSFhfVVBMT0FEX1JFRixcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBIWF9TVElDS1ksXG4gIFRIUk9UVExFRFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmxldCBET00gPSB7XG4gIGJ5SWQoaWQpeyByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIHx8IGxvZ0Vycm9yKGBubyBpZCBmb3VuZCBmb3IgJHtpZH1gKSB9LFxuXG4gIHJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpe1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgIGlmKGVsLmNsYXNzTGlzdC5sZW5ndGggPT09IDApeyBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKSB9XG4gIH0sXG5cbiAgYWxsKG5vZGUsIHF1ZXJ5LCBjYWxsYmFjayl7XG4gICAgaWYoIW5vZGUpeyByZXR1cm4gW10gfVxuICAgIGxldCBhcnJheSA9IEFycmF5LmZyb20obm9kZS5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSlcbiAgICByZXR1cm4gY2FsbGJhY2sgPyBhcnJheS5mb3JFYWNoKGNhbGxiYWNrKSA6IGFycmF5XG4gIH0sXG5cbiAgY2hpbGROb2RlTGVuZ3RoKGh0bWwpe1xuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcbiAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5jaGlsZEVsZW1lbnRDb3VudFxuICB9LFxuXG4gIGlzVXBsb2FkSW5wdXQoZWwpeyByZXR1cm4gZWwudHlwZSA9PT0gXCJmaWxlXCIgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSAhPT0gbnVsbCB9LFxuXG4gIGZpbmRVcGxvYWRJbnB1dHMobm9kZSl7IHJldHVybiB0aGlzLmFsbChub2RlLCBgaW5wdXRbdHlwZT1cImZpbGVcIl1bJHtQSFhfVVBMT0FEX1JFRn1dYCkgfSxcblxuICBmaW5kQ29tcG9uZW50Tm9kZUxpc3Qobm9kZSwgY2lkKXtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwobm9kZSwgYFske1BIWF9DT01QT05FTlR9PVwiJHtjaWR9XCJdYCksIG5vZGUpXG4gIH0sXG5cbiAgaXNQaHhEZXN0cm95ZWQobm9kZSl7XG4gICAgcmV0dXJuIG5vZGUuaWQgJiYgRE9NLnByaXZhdGUobm9kZSwgXCJkZXN0cm95ZWRcIikgPyB0cnVlIDogZmFsc2VcbiAgfSxcblxuICB3YW50c05ld1RhYihlKXtcbiAgICBsZXQgd2FudHNOZXdUYWIgPSBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSB8fCBlLm1ldGFLZXkgfHwgKGUuYnV0dG9uICYmIGUuYnV0dG9uID09PSAxKVxuICAgIHJldHVybiB3YW50c05ld1RhYiB8fCBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIikgPT09IFwiX2JsYW5rXCJcbiAgfSxcblxuICBpc05ld1BhZ2VIcmVmKGhyZWYsIGN1cnJlbnRMb2NhdGlvbil7XG4gICAgbGV0IHVybFxuICAgIHRyeSB7XG4gICAgICB1cmwgPSBuZXcgVVJMKGhyZWYpXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICB0cnkge1xuICAgICAgICB1cmwgPSBuZXcgVVJMKGhyZWYsIGN1cnJlbnRMb2NhdGlvbilcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAvLyBiYWQgVVJMLCBmYWxsYmFjayB0byBsZXQgYnJvd3NlciB0cnkgaXQgYXMgZXh0ZXJuYWxcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZih1cmwuaG9zdCA9PT0gY3VycmVudExvY2F0aW9uLmhvc3QgJiYgdXJsLnByb3RvY29sID09PSBjdXJyZW50TG9jYXRpb24ucHJvdG9jb2wpe1xuICAgICAgaWYodXJsLnBhdGhuYW1lID09PSBjdXJyZW50TG9jYXRpb24ucGF0aG5hbWUgJiYgdXJsLnNlYXJjaCA9PT0gY3VycmVudExvY2F0aW9uLnNlYXJjaCl7XG4gICAgICAgIHJldHVybiB1cmwuaGFzaCA9PT0gXCJcIiAmJiAhdXJsLmhyZWYuZW5kc1dpdGgoXCIjXCIpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH0sXG5cbiAgbWFya1BoeENoaWxkRGVzdHJveWVkKGVsKXtcbiAgICBpZih0aGlzLmlzUGh4Q2hpbGQoZWwpKXsgZWwuc2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OLCBcIlwiKSB9XG4gICAgdGhpcy5wdXRQcml2YXRlKGVsLCBcImRlc3Ryb3llZFwiLCB0cnVlKVxuICB9LFxuXG4gIGZpbmRQaHhDaGlsZHJlbkluRnJhZ21lbnQoaHRtbCwgcGFyZW50SWQpe1xuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcbiAgICByZXR1cm4gdGhpcy5maW5kUGh4Q2hpbGRyZW4odGVtcGxhdGUuY29udGVudCwgcGFyZW50SWQpXG4gIH0sXG5cbiAgaXNJZ25vcmVkKGVsLCBwaHhVcGRhdGUpe1xuICAgIHJldHVybiAoZWwuZ2V0QXR0cmlidXRlKHBoeFVwZGF0ZSkgfHwgZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtdXBkYXRlXCIpKSA9PT0gXCJpZ25vcmVcIlxuICB9LFxuXG4gIGlzUGh4VXBkYXRlKGVsLCBwaHhVcGRhdGUsIHVwZGF0ZVR5cGVzKXtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlICYmIHVwZGF0ZVR5cGVzLmluZGV4T2YoZWwuZ2V0QXR0cmlidXRlKHBoeFVwZGF0ZSkpID49IDBcbiAgfSxcblxuICBmaW5kUGh4U3RpY2t5KGVsKXsgcmV0dXJuIHRoaXMuYWxsKGVsLCBgWyR7UEhYX1NUSUNLWX1dYCkgfSxcblxuICBmaW5kUGh4Q2hpbGRyZW4oZWwsIHBhcmVudElkKXtcbiAgICByZXR1cm4gdGhpcy5hbGwoZWwsIGAke1BIWF9WSUVXX1NFTEVDVE9SfVske1BIWF9QQVJFTlRfSUR9PVwiJHtwYXJlbnRJZH1cIl1gKVxuICB9LFxuXG4gIGZpbmRQYXJlbnRDSURzKG5vZGUsIGNpZHMpe1xuICAgIGxldCBpbml0aWFsID0gbmV3IFNldChjaWRzKVxuICAgIGxldCBwYXJlbnRDaWRzID1cbiAgICAgIGNpZHMucmVkdWNlKChhY2MsIGNpZCkgPT4ge1xuICAgICAgICBsZXQgc2VsZWN0b3IgPSBgWyR7UEhYX0NPTVBPTkVOVH09XCIke2NpZH1cIl0gWyR7UEhYX0NPTVBPTkVOVH1dYFxuXG4gICAgICAgIHRoaXMuZmlsdGVyV2l0aGluU2FtZUxpdmVWaWV3KHRoaXMuYWxsKG5vZGUsIHNlbGVjdG9yKSwgbm9kZSlcbiAgICAgICAgICAubWFwKGVsID0+IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSkpXG4gICAgICAgICAgLmZvckVhY2goY2hpbGRDSUQgPT4gYWNjLmRlbGV0ZShjaGlsZENJRCkpXG5cbiAgICAgICAgcmV0dXJuIGFjY1xuICAgICAgfSwgaW5pdGlhbClcblxuICAgIHJldHVybiBwYXJlbnRDaWRzLnNpemUgPT09IDAgPyBuZXcgU2V0KGNpZHMpIDogcGFyZW50Q2lkc1xuICB9LFxuXG4gIGZpbHRlcldpdGhpblNhbWVMaXZlVmlldyhub2RlcywgcGFyZW50KXtcbiAgICBpZihwYXJlbnQucXVlcnlTZWxlY3RvcihQSFhfVklFV19TRUxFQ1RPUikpe1xuICAgICAgcmV0dXJuIG5vZGVzLmZpbHRlcihlbCA9PiB0aGlzLndpdGhpblNhbWVMaXZlVmlldyhlbCwgcGFyZW50KSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5vZGVzXG4gICAgfVxuICB9LFxuXG4gIHdpdGhpblNhbWVMaXZlVmlldyhub2RlLCBwYXJlbnQpe1xuICAgIHdoaWxlKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpe1xuICAgICAgaWYobm9kZS5pc1NhbWVOb2RlKHBhcmVudCkpeyByZXR1cm4gdHJ1ZSB9XG4gICAgICBpZihub2RlLmdldEF0dHJpYnV0ZShQSFhfU0VTU0lPTikgIT09IG51bGwpeyByZXR1cm4gZmFsc2UgfVxuICAgIH1cbiAgfSxcblxuICBwcml2YXRlKGVsLCBrZXkpeyByZXR1cm4gZWxbUEhYX1BSSVZBVEVdICYmIGVsW1BIWF9QUklWQVRFXVtrZXldIH0sXG5cbiAgZGVsZXRlUHJpdmF0ZShlbCwga2V5KXsgZWxbUEhYX1BSSVZBVEVdICYmIGRlbGV0ZSAoZWxbUEhYX1BSSVZBVEVdW2tleV0pIH0sXG5cbiAgcHV0UHJpdmF0ZShlbCwga2V5LCB2YWx1ZSl7XG4gICAgaWYoIWVsW1BIWF9QUklWQVRFXSl7IGVsW1BIWF9QUklWQVRFXSA9IHt9IH1cbiAgICBlbFtQSFhfUFJJVkFURV1ba2V5XSA9IHZhbHVlXG4gIH0sXG5cbiAgdXBkYXRlUHJpdmF0ZShlbCwga2V5LCBkZWZhdWx0VmFsLCB1cGRhdGVGdW5jKXtcbiAgICBsZXQgZXhpc3RpbmcgPSB0aGlzLnByaXZhdGUoZWwsIGtleSlcbiAgICBpZihleGlzdGluZyA9PT0gdW5kZWZpbmVkKXtcbiAgICAgIHRoaXMucHV0UHJpdmF0ZShlbCwga2V5LCB1cGRhdGVGdW5jKGRlZmF1bHRWYWwpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgdXBkYXRlRnVuYyhleGlzdGluZykpXG4gICAgfVxuICB9LFxuXG4gIGNvcHlQcml2YXRlcyh0YXJnZXQsIHNvdXJjZSl7XG4gICAgaWYoc291cmNlW1BIWF9QUklWQVRFXSl7XG4gICAgICB0YXJnZXRbUEhYX1BSSVZBVEVdID0gc291cmNlW1BIWF9QUklWQVRFXVxuICAgIH1cbiAgfSxcblxuICBwdXRUaXRsZShzdHIpe1xuICAgIGxldCB0aXRsZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInRpdGxlXCIpXG4gICAgaWYodGl0bGVFbCl7XG4gICAgICBsZXQge3ByZWZpeCwgc3VmZml4fSA9IHRpdGxlRWwuZGF0YXNldFxuICAgICAgZG9jdW1lbnQudGl0bGUgPSBgJHtwcmVmaXggfHwgXCJcIn0ke3N0cn0ke3N1ZmZpeCB8fCBcIlwifWBcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQudGl0bGUgPSBzdHJcbiAgICB9XG4gIH0sXG5cbiAgZGVib3VuY2UoZWwsIGV2ZW50LCBwaHhEZWJvdW5jZSwgZGVmYXVsdERlYm91bmNlLCBwaHhUaHJvdHRsZSwgZGVmYXVsdFRocm90dGxlLCBhc3luY0ZpbHRlciwgY2FsbGJhY2spe1xuICAgIGxldCBkZWJvdW5jZSA9IGVsLmdldEF0dHJpYnV0ZShwaHhEZWJvdW5jZSlcbiAgICBsZXQgdGhyb3R0bGUgPSBlbC5nZXRBdHRyaWJ1dGUocGh4VGhyb3R0bGUpXG4gICAgaWYoZGVib3VuY2UgPT09IFwiXCIpeyBkZWJvdW5jZSA9IGRlZmF1bHREZWJvdW5jZSB9XG4gICAgaWYodGhyb3R0bGUgPT09IFwiXCIpeyB0aHJvdHRsZSA9IGRlZmF1bHRUaHJvdHRsZSB9XG4gICAgbGV0IHZhbHVlID0gZGVib3VuY2UgfHwgdGhyb3R0bGVcbiAgICBzd2l0Y2godmFsdWUpe1xuICAgICAgY2FzZSBudWxsOiByZXR1cm4gY2FsbGJhY2soKVxuXG4gICAgICBjYXNlIFwiYmx1clwiOlxuICAgICAgICBpZih0aGlzLm9uY2UoZWwsIFwiZGVib3VuY2UtYmx1clwiKSl7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImJsdXJcIiwgKCkgPT4gY2FsbGJhY2soKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm5cblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGV0IHRpbWVvdXQgPSBwYXJzZUludCh2YWx1ZSlcbiAgICAgICAgbGV0IHRyaWdnZXIgPSAoKSA9PiB0aHJvdHRsZSA/IHRoaXMuZGVsZXRlUHJpdmF0ZShlbCwgVEhST1RUTEVEKSA6IGNhbGxiYWNrKClcbiAgICAgICAgbGV0IGN1cnJlbnRDeWNsZSA9IHRoaXMuaW5jQ3ljbGUoZWwsIERFQk9VTkNFX1RSSUdHRVIsIHRyaWdnZXIpXG4gICAgICAgIGlmKGlzTmFOKHRpbWVvdXQpKXsgcmV0dXJuIGxvZ0Vycm9yKGBpbnZhbGlkIHRocm90dGxlL2RlYm91bmNlIHZhbHVlOiAke3ZhbHVlfWApIH1cbiAgICAgICAgaWYodGhyb3R0bGUpe1xuICAgICAgICAgIGxldCBuZXdLZXlEb3duID0gZmFsc2VcbiAgICAgICAgICBpZihldmVudC50eXBlID09PSBcImtleWRvd25cIil7XG4gICAgICAgICAgICBsZXQgcHJldktleSA9IHRoaXMucHJpdmF0ZShlbCwgREVCT1VOQ0VfUFJFVl9LRVkpXG4gICAgICAgICAgICB0aGlzLnB1dFByaXZhdGUoZWwsIERFQk9VTkNFX1BSRVZfS0VZLCBldmVudC5rZXkpXG4gICAgICAgICAgICBuZXdLZXlEb3duID0gcHJldktleSAhPT0gZXZlbnQua2V5XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIW5ld0tleURvd24gJiYgdGhpcy5wcml2YXRlKGVsLCBUSFJPVFRMRUQpKXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgICAgICB0aGlzLnB1dFByaXZhdGUoZWwsIFRIUk9UVExFRCwgdHJ1ZSlcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICBpZihhc3luY0ZpbHRlcigpKXsgdGhpcy50cmlnZ2VyQ3ljbGUoZWwsIERFQk9VTkNFX1RSSUdHRVIpIH1cbiAgICAgICAgICAgIH0sIHRpbWVvdXQpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYoYXN5bmNGaWx0ZXIoKSl7IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSLCBjdXJyZW50Q3ljbGUpIH1cbiAgICAgICAgICB9LCB0aW1lb3V0KVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGZvcm0gPSBlbC5mb3JtXG4gICAgICAgIGlmKGZvcm0gJiYgdGhpcy5vbmNlKGZvcm0sIFwiYmluZC1kZWJvdW5jZVwiKSl7XG4gICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsICgpID0+IHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oKG5ldyBGb3JtRGF0YShmb3JtKSkuZW50cmllcygpLCAoW25hbWVdKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke25hbWV9XCJdYClcbiAgICAgICAgICAgICAgdGhpcy5pbmNDeWNsZShpbnB1dCwgREVCT1VOQ0VfVFJJR0dFUilcbiAgICAgICAgICAgICAgdGhpcy5kZWxldGVQcml2YXRlKGlucHV0LCBUSFJPVFRMRUQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5vbmNlKGVsLCBcImJpbmQtZGVib3VuY2VcIikpe1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKSlcbiAgICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0cmlnZ2VyQ3ljbGUoZWwsIGtleSwgY3VycmVudEN5Y2xlKXtcbiAgICBsZXQgW2N5Y2xlLCB0cmlnZ2VyXSA9IHRoaXMucHJpdmF0ZShlbCwga2V5KVxuICAgIGlmKCFjdXJyZW50Q3ljbGUpeyBjdXJyZW50Q3ljbGUgPSBjeWNsZSB9XG4gICAgaWYoY3VycmVudEN5Y2xlID09PSBjeWNsZSl7XG4gICAgICB0aGlzLmluY0N5Y2xlKGVsLCBrZXkpXG4gICAgICB0cmlnZ2VyKClcbiAgICB9XG4gIH0sXG5cbiAgb25jZShlbCwga2V5KXtcbiAgICBpZih0aGlzLnByaXZhdGUoZWwsIGtleSkgPT09IHRydWUpeyByZXR1cm4gZmFsc2UgfVxuICAgIHRoaXMucHV0UHJpdmF0ZShlbCwga2V5LCB0cnVlKVxuICAgIHJldHVybiB0cnVlXG4gIH0sXG5cbiAgaW5jQ3ljbGUoZWwsIGtleSwgdHJpZ2dlciA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICBsZXQgW2N1cnJlbnRDeWNsZV0gPSB0aGlzLnByaXZhdGUoZWwsIGtleSkgfHwgWzAsIHRyaWdnZXJdXG4gICAgY3VycmVudEN5Y2xlKytcbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgW2N1cnJlbnRDeWNsZSwgdHJpZ2dlcl0pXG4gICAgcmV0dXJuIGN1cnJlbnRDeWNsZVxuICB9LFxuXG4gIGRpc2NhcmRFcnJvcihjb250YWluZXIsIGVsLCBwaHhGZWVkYmFja0Zvcil7XG4gICAgbGV0IGZpZWxkID0gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShwaHhGZWVkYmFja0ZvcilcbiAgICAvLyBUT0RPOiBSZW1vdmUgaWQgbG9va3VwIGFmdGVyIHdlIHVwZGF0ZSBQaG9lbml4IHRvIHVzZSBpbnB1dF9uYW1lIGluc3RlYWQgb2YgaW5wdXRfaWRcbiAgICBsZXQgaW5wdXQgPSBmaWVsZCAmJiBjb250YWluZXIucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtmaWVsZH1cIl0sIFtuYW1lPVwiJHtmaWVsZH1cIl0sIFtuYW1lPVwiJHtmaWVsZH1bXVwiXWApXG4gICAgaWYoIWlucHV0KXsgcmV0dXJuIH1cblxuICAgIGlmKCEodGhpcy5wcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQpIHx8IHRoaXMucHJpdmF0ZShpbnB1dCwgUEhYX0hBU19TVUJNSVRURUQpKSl7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFBIWF9OT19GRUVEQkFDS19DTEFTUylcbiAgICB9XG4gIH0sXG5cbiAgc2hvd0Vycm9yKGlucHV0RWwsIHBoeEZlZWRiYWNrRm9yKXtcbiAgICBpZihpbnB1dEVsLmlkIHx8IGlucHV0RWwubmFtZSl7XG4gICAgICB0aGlzLmFsbChpbnB1dEVsLmZvcm0sIGBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2lucHV0RWwuaWR9XCJdLCBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2lucHV0RWwubmFtZX1cIl1gLCAoZWwpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhlbCwgUEhYX05PX0ZFRURCQUNLX0NMQVNTKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgaXNQaHhDaGlsZChub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRClcbiAgfSxcblxuICBpc1BoeFN0aWNreShub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1NUSUNLWSkgIT09IG51bGxcbiAgfSxcblxuICBmaXJzdFBoeENoaWxkKGVsKXtcbiAgICByZXR1cm4gdGhpcy5pc1BoeENoaWxkKGVsKSA/IGVsIDogdGhpcy5hbGwoZWwsIGBbJHtQSFhfUEFSRU5UX0lEfV1gKVswXVxuICB9LFxuXG4gIGRpc3BhdGNoRXZlbnQodGFyZ2V0LCBuYW1lLCBvcHRzID0ge30pe1xuICAgIGxldCBidWJibGVzID0gb3B0cy5idWJibGVzID09PSB1bmRlZmluZWQgPyB0cnVlIDogISFvcHRzLmJ1YmJsZXNcbiAgICBsZXQgZXZlbnRPcHRzID0ge2J1YmJsZXM6IGJ1YmJsZXMsIGNhbmNlbGFibGU6IHRydWUsIGRldGFpbDogb3B0cy5kZXRhaWwgfHwge319XG4gICAgbGV0IGV2ZW50ID0gbmFtZSA9PT0gXCJjbGlja1wiID8gbmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiLCBldmVudE9wdHMpIDogbmV3IEN1c3RvbUV2ZW50KG5hbWUsIGV2ZW50T3B0cylcbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudClcbiAgfSxcblxuICBjbG9uZU5vZGUobm9kZSwgaHRtbCl7XG4gICAgaWYodHlwZW9mIChodG1sKSA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICByZXR1cm4gbm9kZS5jbG9uZU5vZGUodHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNsb25lZCA9IG5vZGUuY2xvbmVOb2RlKGZhbHNlKVxuICAgICAgY2xvbmVkLmlubmVySFRNTCA9IGh0bWxcbiAgICAgIHJldHVybiBjbG9uZWRcbiAgICB9XG4gIH0sXG5cbiAgbWVyZ2VBdHRycyh0YXJnZXQsIHNvdXJjZSwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZXhjbHVkZSA9IG9wdHMuZXhjbHVkZSB8fCBbXVxuICAgIGxldCBpc0lnbm9yZWQgPSBvcHRzLmlzSWdub3JlZFxuICAgIGxldCBzb3VyY2VBdHRycyA9IHNvdXJjZS5hdHRyaWJ1dGVzXG4gICAgZm9yKGxldCBpID0gc291cmNlQXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgbGV0IG5hbWUgPSBzb3VyY2VBdHRyc1tpXS5uYW1lXG4gICAgICBpZihleGNsdWRlLmluZGV4T2YobmFtZSkgPCAwKXsgdGFyZ2V0LnNldEF0dHJpYnV0ZShuYW1lLCBzb3VyY2UuZ2V0QXR0cmlidXRlKG5hbWUpKSB9XG4gICAgfVxuXG4gICAgbGV0IHRhcmdldEF0dHJzID0gdGFyZ2V0LmF0dHJpYnV0ZXNcbiAgICBmb3IobGV0IGkgPSB0YXJnZXRBdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICBsZXQgbmFtZSA9IHRhcmdldEF0dHJzW2ldLm5hbWVcbiAgICAgIGlmKGlzSWdub3JlZCl7XG4gICAgICAgIGlmKG5hbWUuc3RhcnRzV2l0aChcImRhdGEtXCIpICYmICFzb3VyY2UuaGFzQXR0cmlidXRlKG5hbWUpKXsgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZighc291cmNlLmhhc0F0dHJpYnV0ZShuYW1lKSl7IHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXJnZUZvY3VzZWRJbnB1dCh0YXJnZXQsIHNvdXJjZSl7XG4gICAgLy8gc2tpcCBzZWxlY3RzIGJlY2F1c2UgRkYgd2lsbCByZXNldCBoaWdobGlnaHRlZCBpbmRleCBmb3IgYW55IHNldEF0dHJpYnV0ZVxuICAgIGlmKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpKXsgRE9NLm1lcmdlQXR0cnModGFyZ2V0LCBzb3VyY2UsIHtleGNsdWRlOiBbXCJ2YWx1ZVwiXX0pIH1cbiAgICBpZihzb3VyY2UucmVhZE9ubHkpe1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInJlYWRvbmx5XCIsIHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKVxuICAgIH1cbiAgfSxcblxuICBoYXNTZWxlY3Rpb25SYW5nZShlbCl7XG4gICAgcmV0dXJuIGVsLnNldFNlbGVjdGlvblJhbmdlICYmIChlbC50eXBlID09PSBcInRleHRcIiB8fCBlbC50eXBlID09PSBcInRleHRhcmVhXCIpXG4gIH0sXG5cbiAgcmVzdG9yZUZvY3VzKGZvY3VzZWQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpe1xuICAgIGlmKCFET00uaXNUZXh0dWFsSW5wdXQoZm9jdXNlZCkpeyByZXR1cm4gfVxuICAgIGxldCB3YXNGb2N1c2VkID0gZm9jdXNlZC5tYXRjaGVzKFwiOmZvY3VzXCIpXG4gICAgaWYoZm9jdXNlZC5yZWFkT25seSl7IGZvY3VzZWQuYmx1cigpIH1cbiAgICBpZighd2FzRm9jdXNlZCl7IGZvY3VzZWQuZm9jdXMoKSB9XG4gICAgaWYodGhpcy5oYXNTZWxlY3Rpb25SYW5nZShmb2N1c2VkKSl7XG4gICAgICBmb2N1c2VkLnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpXG4gICAgfVxuICB9LFxuXG4gIGlzRm9ybUlucHV0KGVsKXsgcmV0dXJuIC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhKSQvaS50ZXN0KGVsLnRhZ05hbWUpICYmIGVsLnR5cGUgIT09IFwiYnV0dG9uXCIgfSxcblxuICBzeW5jQXR0cnNUb1Byb3BzKGVsKXtcbiAgICBpZihlbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgQ0hFQ0tBQkxFX0lOUFVUUy5pbmRleE9mKGVsLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSkgPj0gMCl7XG4gICAgICBlbC5jaGVja2VkID0gZWwuZ2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiKSAhPT0gbnVsbFxuICAgIH1cbiAgfSxcblxuICBpc1RleHR1YWxJbnB1dChlbCl7IHJldHVybiBGT0NVU0FCTEVfSU5QVVRTLmluZGV4T2YoZWwudHlwZSkgPj0gMCB9LFxuXG4gIGlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKXtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShwaHhUcmlnZ2VyRXh0ZXJuYWwpICE9PSBudWxsXG4gIH0sXG5cbiAgc3luY1BlbmRpbmdSZWYoZnJvbUVsLCB0b0VsLCBkaXNhYmxlV2l0aCl7XG4gICAgbGV0IHJlZiA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1JFRilcbiAgICBpZihyZWYgPT09IG51bGwpeyByZXR1cm4gdHJ1ZSB9XG4gICAgbGV0IHJlZlNyYyA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpXG5cbiAgICBpZihET00uaXNGb3JtSW5wdXQoZnJvbUVsKSB8fCBmcm9tRWwuZ2V0QXR0cmlidXRlKGRpc2FibGVXaXRoKSAhPT0gbnVsbCl7XG4gICAgICBpZihET00uaXNVcGxvYWRJbnB1dChmcm9tRWwpKXsgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7aXNJZ25vcmVkOiB0cnVlfSkgfVxuICAgICAgRE9NLnB1dFByaXZhdGUoZnJvbUVsLCBQSFhfUkVGLCB0b0VsKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIFBIWF9FVkVOVF9DTEFTU0VTLmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgZnJvbUVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpICYmIHRvRWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXG4gICAgICB9KVxuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRiwgcmVmKVxuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMsIHJlZlNyYylcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGNsZWFuQ2hpbGROb2Rlcyhjb250YWluZXIsIHBoeFVwZGF0ZSl7XG4gICAgaWYoRE9NLmlzUGh4VXBkYXRlKGNvbnRhaW5lciwgcGh4VXBkYXRlLCBbXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICBsZXQgdG9SZW1vdmUgPSBbXVxuICAgICAgY29udGFpbmVyLmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZE5vZGUgPT4ge1xuICAgICAgICBpZighY2hpbGROb2RlLmlkKXtcbiAgICAgICAgICAvLyBTa2lwIHdhcm5pbmcgaWYgaXQncyBhbiBlbXB0eSB0ZXh0IG5vZGUgKGUuZy4gYSBuZXctbGluZSlcbiAgICAgICAgICBsZXQgaXNFbXB0eVRleHROb2RlID0gY2hpbGROb2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBjaGlsZE5vZGUubm9kZVZhbHVlLnRyaW0oKSA9PT0gXCJcIlxuICAgICAgICAgIGlmKCFpc0VtcHR5VGV4dE5vZGUpe1xuICAgICAgICAgICAgbG9nRXJyb3IoXCJvbmx5IEhUTUwgZWxlbWVudCB0YWdzIHdpdGggYW4gaWQgYXJlIGFsbG93ZWQgaW5zaWRlIGNvbnRhaW5lcnMgd2l0aCBwaHgtdXBkYXRlLlxcblxcblwiICtcbiAgICAgICAgICAgICAgYHJlbW92aW5nIGlsbGVnYWwgbm9kZTogXCIkeyhjaGlsZE5vZGUub3V0ZXJIVE1MIHx8IGNoaWxkTm9kZS5ub2RlVmFsdWUpLnRyaW0oKX1cIlxcblxcbmApXG4gICAgICAgICAgfVxuICAgICAgICAgIHRvUmVtb3ZlLnB1c2goY2hpbGROb2RlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdG9SZW1vdmUuZm9yRWFjaChjaGlsZE5vZGUgPT4gY2hpbGROb2RlLnJlbW92ZSgpKVxuICAgIH1cbiAgfSxcblxuICByZXBsYWNlUm9vdENvbnRhaW5lcihjb250YWluZXIsIHRhZ05hbWUsIGF0dHJzKXtcbiAgICBsZXQgcmV0YWluZWRBdHRycyA9IG5ldyBTZXQoW1wiaWRcIiwgUEhYX1NFU1NJT04sIFBIWF9TVEFUSUMsIFBIWF9NQUlOLCBQSFhfUk9PVF9JRF0pXG4gICAgaWYoY29udGFpbmVyLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpKXtcbiAgICAgIEFycmF5LmZyb20oY29udGFpbmVyLmF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoYXR0ciA9PiAhcmV0YWluZWRBdHRycy5oYXMoYXR0ci5uYW1lLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyID0+IGNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKSlcblxuICAgICAgT2JqZWN0LmtleXMoYXR0cnMpXG4gICAgICAgIC5maWx0ZXIobmFtZSA9PiAhcmV0YWluZWRBdHRycy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgLmZvckVhY2goYXR0ciA9PiBjb250YWluZXIuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJzW2F0dHJdKSlcblxuICAgICAgcmV0dXJuIGNvbnRhaW5lclxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpXG4gICAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChhdHRyID0+IG5ld0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cnNbYXR0cl0pKVxuICAgICAgcmV0YWluZWRBdHRycy5mb3JFYWNoKGF0dHIgPT4gbmV3Q29udGFpbmVyLnNldEF0dHJpYnV0ZShhdHRyLCBjb250YWluZXIuZ2V0QXR0cmlidXRlKGF0dHIpKSlcbiAgICAgIG5ld0NvbnRhaW5lci5pbm5lckhUTUwgPSBjb250YWluZXIuaW5uZXJIVE1MXG4gICAgICBjb250YWluZXIucmVwbGFjZVdpdGgobmV3Q29udGFpbmVyKVxuICAgICAgcmV0dXJuIG5ld0NvbnRhaW5lclxuICAgIH1cbiAgfSxcblxuICBnZXRTdGlja3koZWwsIG5hbWUsIGRlZmF1bHRWYWwpe1xuICAgIGxldCBvcCA9IChET00ucHJpdmF0ZShlbCwgXCJzdGlja3lcIikgfHwgW10pLmZpbmQoKFtleGlzdGluZ05hbWUsIF0pID0+IG5hbWUgPT09IGV4aXN0aW5nTmFtZSlcbiAgICBpZihvcCl7XG4gICAgICBsZXQgW19uYW1lLCBfb3AsIHN0YXNoZWRSZXN1bHRdID0gb3BcbiAgICAgIHJldHVybiBzdGFzaGVkUmVzdWx0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0eXBlb2YoZGVmYXVsdFZhbCkgPT09IFwiZnVuY3Rpb25cIiA/IGRlZmF1bHRWYWwoKSA6IGRlZmF1bHRWYWxcbiAgICB9XG4gIH0sXG5cbiAgZGVsZXRlU3RpY2t5KGVsLCBuYW1lKXtcbiAgICB0aGlzLnVwZGF0ZVByaXZhdGUoZWwsIFwic3RpY2t5XCIsIFtdLCBvcHMgPT4ge1xuICAgICAgcmV0dXJuIG9wcy5maWx0ZXIoKFtleGlzdGluZ05hbWUsIF9dKSA9PiBleGlzdGluZ05hbWUgIT09IG5hbWUpXG4gICAgfSlcbiAgfSxcblxuICBwdXRTdGlja3koZWwsIG5hbWUsIG9wKXtcbiAgICBsZXQgc3Rhc2hlZFJlc3VsdCA9IG9wKGVsKVxuICAgIHRoaXMudXBkYXRlUHJpdmF0ZShlbCwgXCJzdGlja3lcIiwgW10sIG9wcyA9PiB7XG4gICAgICBsZXQgZXhpc3RpbmdJbmRleCA9IG9wcy5maW5kSW5kZXgoKFtleGlzdGluZ05hbWUsIF0pID0+IG5hbWUgPT09IGV4aXN0aW5nTmFtZSlcbiAgICAgIGlmKGV4aXN0aW5nSW5kZXggPj0gMCl7XG4gICAgICAgIG9wc1tleGlzdGluZ0luZGV4XSA9IFtuYW1lLCBvcCwgc3Rhc2hlZFJlc3VsdF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wcy5wdXNoKFtuYW1lLCBvcCwgc3Rhc2hlZFJlc3VsdF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gb3BzXG4gICAgfSlcbiAgfSxcblxuICBhcHBseVN0aWNreU9wZXJhdGlvbnMoZWwpe1xuICAgIGxldCBvcHMgPSBET00ucHJpdmF0ZShlbCwgXCJzdGlja3lcIilcbiAgICBpZighb3BzKXsgcmV0dXJuIH1cblxuICAgIG9wcy5mb3JFYWNoKChbbmFtZSwgb3AsIF9zdGFzaGVkXSkgPT4gdGhpcy5wdXRTdGlja3koZWwsIG5hbWUsIG9wKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBET01cbiIsICJpbXBvcnQge1xuICBQSFhfQUNUSVZFX0VOVFJZX1JFRlMsXG4gIFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2hhbm5lbFVwbG9hZGVyLFxuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZEVudHJ5IHtcbiAgc3RhdGljIGlzQWN0aXZlKGZpbGVFbCwgZmlsZSl7XG4gICAgbGV0IGlzTmV3ID0gZmlsZS5fcGh4UmVmID09PSB1bmRlZmluZWRcbiAgICBsZXQgYWN0aXZlUmVmcyA9IGZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX0FDVElWRV9FTlRSWV9SRUZTKS5zcGxpdChcIixcIilcbiAgICBsZXQgaXNBY3RpdmUgPSBhY3RpdmVSZWZzLmluZGV4T2YoTGl2ZVVwbG9hZGVyLmdlbkZpbGVSZWYoZmlsZSkpID49IDBcbiAgICByZXR1cm4gZmlsZS5zaXplID4gMCAmJiAoaXNOZXcgfHwgaXNBY3RpdmUpXG4gIH1cblxuICBzdGF0aWMgaXNQcmVmbGlnaHRlZChmaWxlRWwsIGZpbGUpe1xuICAgIGxldCBwcmVmbGlnaHRlZFJlZnMgPSBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9QUkVGTElHSFRFRF9SRUZTKS5zcGxpdChcIixcIilcbiAgICBsZXQgaXNQcmVmbGlnaHRlZCA9IHByZWZsaWdodGVkUmVmcy5pbmRleE9mKExpdmVVcGxvYWRlci5nZW5GaWxlUmVmKGZpbGUpKSA+PSAwXG4gICAgcmV0dXJuIGlzUHJlZmxpZ2h0ZWQgJiYgdGhpcy5pc0FjdGl2ZShmaWxlRWwsIGZpbGUpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihmaWxlRWwsIGZpbGUsIHZpZXcpe1xuICAgIHRoaXMucmVmID0gTGl2ZVVwbG9hZGVyLmdlbkZpbGVSZWYoZmlsZSlcbiAgICB0aGlzLmZpbGVFbCA9IGZpbGVFbFxuICAgIHRoaXMuZmlsZSA9IGZpbGVcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5tZXRhID0gbnVsbFxuICAgIHRoaXMuX2lzQ2FuY2VsbGVkID0gZmFsc2VcbiAgICB0aGlzLl9pc0RvbmUgPSBmYWxzZVxuICAgIHRoaXMuX3Byb2dyZXNzID0gMFxuICAgIHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQgPSAtMVxuICAgIHRoaXMuX29uRG9uZSA9IGZ1bmN0aW9uICgpeyB9XG4gICAgdGhpcy5fb25FbFVwZGF0ZWQgPSB0aGlzLm9uRWxVcGRhdGVkLmJpbmQodGhpcylcbiAgICB0aGlzLmZpbGVFbC5hZGRFdmVudExpc3RlbmVyKFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCwgdGhpcy5fb25FbFVwZGF0ZWQpXG4gIH1cblxuICBtZXRhZGF0YSgpeyByZXR1cm4gdGhpcy5tZXRhIH1cblxuICBwcm9ncmVzcyhwcm9ncmVzcyl7XG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHByb2dyZXNzKVxuICAgIGlmKHRoaXMuX3Byb2dyZXNzID4gdGhpcy5fbGFzdFByb2dyZXNzU2VudCl7XG4gICAgICBpZih0aGlzLl9wcm9ncmVzcyA+PSAxMDApe1xuICAgICAgICB0aGlzLl9wcm9ncmVzcyA9IDEwMFxuICAgICAgICB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50ID0gMTAwXG4gICAgICAgIHRoaXMuX2lzRG9uZSA9IHRydWVcbiAgICAgICAgdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsIHRoaXMucmVmLCAxMDAsICgpID0+IHtcbiAgICAgICAgICBMaXZlVXBsb2FkZXIudW50cmFja0ZpbGUodGhpcy5maWxlRWwsIHRoaXMuZmlsZSlcbiAgICAgICAgICB0aGlzLl9vbkRvbmUoKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbGFzdFByb2dyZXNzU2VudCA9IHRoaXMuX3Byb2dyZXNzXG4gICAgICAgIHRoaXMudmlldy5wdXNoRmlsZVByb2dyZXNzKHRoaXMuZmlsZUVsLCB0aGlzLnJlZiwgdGhpcy5fcHJvZ3Jlc3MpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsKCl7XG4gICAgdGhpcy5faXNDYW5jZWxsZWQgPSB0cnVlXG4gICAgdGhpcy5faXNEb25lID0gdHJ1ZVxuICAgIHRoaXMuX29uRG9uZSgpXG4gIH1cblxuICBpc0RvbmUoKXsgcmV0dXJuIHRoaXMuX2lzRG9uZSB9XG5cbiAgZXJyb3IocmVhc29uID0gXCJmYWlsZWRcIil7XG4gICAgdGhpcy5maWxlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihQSFhfTElWRV9GSUxFX1VQREFURUQsIHRoaXMuX29uRWxVcGRhdGVkKVxuICAgIHRoaXMudmlldy5wdXNoRmlsZVByb2dyZXNzKHRoaXMuZmlsZUVsLCB0aGlzLnJlZiwge2Vycm9yOiByZWFzb259KVxuICAgIExpdmVVcGxvYWRlci5jbGVhckZpbGVzKHRoaXMuZmlsZUVsKVxuICB9XG5cbiAgLy9wcml2YXRlXG5cbiAgb25Eb25lKGNhbGxiYWNrKXtcbiAgICB0aGlzLl9vbkRvbmUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmZpbGVFbC5yZW1vdmVFdmVudExpc3RlbmVyKFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCwgdGhpcy5fb25FbFVwZGF0ZWQpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgb25FbFVwZGF0ZWQoKXtcbiAgICBsZXQgYWN0aXZlUmVmcyA9IHRoaXMuZmlsZUVsLmdldEF0dHJpYnV0ZShQSFhfQUNUSVZFX0VOVFJZX1JFRlMpLnNwbGl0KFwiLFwiKVxuICAgIGlmKGFjdGl2ZVJlZnMuaW5kZXhPZih0aGlzLnJlZikgPT09IC0xKXsgdGhpcy5jYW5jZWwoKSB9XG4gIH1cblxuICB0b1ByZWZsaWdodFBheWxvYWQoKXtcbiAgICByZXR1cm4ge1xuICAgICAgbGFzdF9tb2RpZmllZDogdGhpcy5maWxlLmxhc3RNb2RpZmllZCxcbiAgICAgIG5hbWU6IHRoaXMuZmlsZS5uYW1lLFxuICAgICAgcmVsYXRpdmVfcGF0aDogdGhpcy5maWxlLndlYmtpdFJlbGF0aXZlUGF0aCxcbiAgICAgIHNpemU6IHRoaXMuZmlsZS5zaXplLFxuICAgICAgdHlwZTogdGhpcy5maWxlLnR5cGUsXG4gICAgICByZWY6IHRoaXMucmVmXG4gICAgfVxuICB9XG5cbiAgdXBsb2FkZXIodXBsb2FkZXJzKXtcbiAgICBpZih0aGlzLm1ldGEudXBsb2FkZXIpe1xuICAgICAgbGV0IGNhbGxiYWNrID0gdXBsb2FkZXJzW3RoaXMubWV0YS51cGxvYWRlcl0gfHwgbG9nRXJyb3IoYG5vIHVwbG9hZGVyIGNvbmZpZ3VyZWQgZm9yICR7dGhpcy5tZXRhLnVwbG9hZGVyfWApXG4gICAgICByZXR1cm4ge25hbWU6IHRoaXMubWV0YS51cGxvYWRlciwgY2FsbGJhY2s6IGNhbGxiYWNrfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge25hbWU6IFwiY2hhbm5lbFwiLCBjYWxsYmFjazogY2hhbm5lbFVwbG9hZGVyfVxuICAgIH1cbiAgfVxuXG4gIHppcFBvc3RGbGlnaHQocmVzcCl7XG4gICAgdGhpcy5tZXRhID0gcmVzcC5lbnRyaWVzW3RoaXMucmVmXVxuICAgIGlmKCF0aGlzLm1ldGEpeyBsb2dFcnJvcihgbm8gcHJlZmxpZ2h0IHVwbG9hZCByZXNwb25zZSByZXR1cm5lZCB3aXRoIHJlZiAke3RoaXMucmVmfWAsIHtpbnB1dDogdGhpcy5maWxlRWwsIHJlc3BvbnNlOiByZXNwfSkgfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgUEhYX0RPTkVfUkVGUyxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlMsXG4gIFBIWF9VUExPQURfUkVGXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IFVwbG9hZEVudHJ5IGZyb20gXCIuL3VwbG9hZF9lbnRyeVwiXG5cbmxldCBsaXZlVXBsb2FkZXJGaWxlUmVmID0gMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXZlVXBsb2FkZXIge1xuICBzdGF0aWMgZ2VuRmlsZVJlZihmaWxlKXtcbiAgICBsZXQgcmVmID0gZmlsZS5fcGh4UmVmXG4gICAgaWYocmVmICE9PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIHJlZlxuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlLl9waHhSZWYgPSAobGl2ZVVwbG9hZGVyRmlsZVJlZisrKS50b1N0cmluZygpXG4gICAgICByZXR1cm4gZmlsZS5fcGh4UmVmXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEVudHJ5RGF0YVVSTChpbnB1dEVsLCByZWYsIGNhbGxiYWNrKXtcbiAgICBsZXQgZmlsZSA9IHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbCkuZmluZChmaWxlID0+IHRoaXMuZ2VuRmlsZVJlZihmaWxlKSA9PT0gcmVmKVxuICAgIGNhbGxiYWNrKFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkpXG4gIH1cblxuICBzdGF0aWMgaGFzVXBsb2Fkc0luUHJvZ3Jlc3MoZm9ybUVsKXtcbiAgICBsZXQgYWN0aXZlID0gMFxuICAgIERPTS5maW5kVXBsb2FkSW5wdXRzKGZvcm1FbCkuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpZihpbnB1dC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpICE9PSBpbnB1dC5nZXRBdHRyaWJ1dGUoUEhYX0RPTkVfUkVGUykpe1xuICAgICAgICBhY3RpdmUrK1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGFjdGl2ZSA+IDBcbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemVVcGxvYWRzKGlucHV0RWwpe1xuICAgIGxldCBmaWxlcyA9IHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbClcbiAgICBsZXQgZmlsZURhdGEgPSB7fVxuICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBsZXQgZW50cnkgPSB7cGF0aDogaW5wdXRFbC5uYW1lfVxuICAgICAgbGV0IHVwbG9hZFJlZiA9IGlucHV0RWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKVxuICAgICAgZmlsZURhdGFbdXBsb2FkUmVmXSA9IGZpbGVEYXRhW3VwbG9hZFJlZl0gfHwgW11cbiAgICAgIGVudHJ5LnJlZiA9IHRoaXMuZ2VuRmlsZVJlZihmaWxlKVxuICAgICAgZW50cnkubGFzdF9tb2RpZmllZCA9IGZpbGUubGFzdE1vZGlmaWVkXG4gICAgICBlbnRyeS5uYW1lID0gZmlsZS5uYW1lIHx8IGVudHJ5LnJlZlxuICAgICAgZW50cnkucmVsYXRpdmVfcGF0aCA9IGZpbGUud2Via2l0UmVsYXRpdmVQYXRoXG4gICAgICBlbnRyeS50eXBlID0gZmlsZS50eXBlXG4gICAgICBlbnRyeS5zaXplID0gZmlsZS5zaXplXG4gICAgICBmaWxlRGF0YVt1cGxvYWRSZWZdLnB1c2goZW50cnkpXG4gICAgfSlcbiAgICByZXR1cm4gZmlsZURhdGFcbiAgfVxuXG4gIHN0YXRpYyBjbGVhckZpbGVzKGlucHV0RWwpe1xuICAgIGlucHV0RWwudmFsdWUgPSBudWxsXG4gICAgaW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpXG4gICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCBbXSlcbiAgfVxuXG4gIHN0YXRpYyB1bnRyYWNrRmlsZShpbnB1dEVsLCBmaWxlKXtcbiAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIERPTS5wcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIikuZmlsdGVyKGYgPT4gIU9iamVjdC5pcyhmLCBmaWxlKSkpXG4gIH1cblxuICBzdGF0aWMgdHJhY2tGaWxlcyhpbnB1dEVsLCBmaWxlcyl7XG4gICAgaWYoaW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKSAhPT0gbnVsbCl7XG4gICAgICBsZXQgbmV3RmlsZXMgPSBmaWxlcy5maWx0ZXIoZmlsZSA9PiAhdGhpcy5hY3RpdmVGaWxlcyhpbnB1dEVsKS5maW5kKGYgPT4gT2JqZWN0LmlzKGYsIGZpbGUpKSlcbiAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgdGhpcy5hY3RpdmVGaWxlcyhpbnB1dEVsKS5jb25jYXQobmV3RmlsZXMpKVxuICAgICAgaW5wdXRFbC52YWx1ZSA9IG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCBmaWxlcylcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYWN0aXZlRmlsZUlucHV0cyhmb3JtRWwpe1xuICAgIGxldCBmaWxlSW5wdXRzID0gRE9NLmZpbmRVcGxvYWRJbnB1dHMoZm9ybUVsKVxuICAgIHJldHVybiBBcnJheS5mcm9tKGZpbGVJbnB1dHMpLmZpbHRlcihlbCA9PiBlbC5maWxlcyAmJiB0aGlzLmFjdGl2ZUZpbGVzKGVsKS5sZW5ndGggPiAwKVxuICB9XG5cbiAgc3RhdGljIGFjdGl2ZUZpbGVzKGlucHV0KXtcbiAgICByZXR1cm4gKERPTS5wcml2YXRlKGlucHV0LCBcImZpbGVzXCIpIHx8IFtdKS5maWx0ZXIoZiA9PiBVcGxvYWRFbnRyeS5pc0FjdGl2ZShpbnB1dCwgZikpXG4gIH1cblxuICBzdGF0aWMgaW5wdXRzQXdhaXRpbmdQcmVmbGlnaHQoZm9ybUVsKXtcbiAgICBsZXQgZmlsZUlucHV0cyA9IERPTS5maW5kVXBsb2FkSW5wdXRzKGZvcm1FbClcbiAgICByZXR1cm4gQXJyYXkuZnJvbShmaWxlSW5wdXRzKS5maWx0ZXIoaW5wdXQgPT4gdGhpcy5maWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0KS5sZW5ndGggPiAwKVxuICB9XG5cbiAgc3RhdGljIGZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXQpe1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUZpbGVzKGlucHV0KS5maWx0ZXIoZiA9PiAhVXBsb2FkRW50cnkuaXNQcmVmbGlnaHRlZChpbnB1dCwgZikpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihpbnB1dEVsLCB2aWV3LCBvbkNvbXBsZXRlKXtcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5vbkNvbXBsZXRlID0gb25Db21wbGV0ZVxuICAgIHRoaXMuX2VudHJpZXMgPVxuICAgICAgQXJyYXkuZnJvbShMaXZlVXBsb2FkZXIuZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dEVsKSB8fCBbXSlcbiAgICAgICAgLm1hcChmaWxlID0+IG5ldyBVcGxvYWRFbnRyeShpbnB1dEVsLCBmaWxlLCB2aWV3KSlcblxuICAgIHRoaXMubnVtRW50cmllc0luUHJvZ3Jlc3MgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aFxuICB9XG5cbiAgZW50cmllcygpeyByZXR1cm4gdGhpcy5fZW50cmllcyB9XG5cbiAgaW5pdEFkYXB0ZXJVcGxvYWQocmVzcCwgb25FcnJvciwgbGl2ZVNvY2tldCl7XG4gICAgdGhpcy5fZW50cmllcyA9XG4gICAgICB0aGlzLl9lbnRyaWVzLm1hcChlbnRyeSA9PiB7XG4gICAgICAgIGVudHJ5LnppcFBvc3RGbGlnaHQocmVzcClcbiAgICAgICAgZW50cnkub25Eb25lKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm51bUVudHJpZXNJblByb2dyZXNzLS1cbiAgICAgICAgICBpZih0aGlzLm51bUVudHJpZXNJblByb2dyZXNzID09PSAwKXsgdGhpcy5vbkNvbXBsZXRlKCkgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gZW50cnlcbiAgICAgIH0pXG5cbiAgICBsZXQgZ3JvdXBlZEVudHJpZXMgPSB0aGlzLl9lbnRyaWVzLnJlZHVjZSgoYWNjLCBlbnRyeSkgPT4ge1xuICAgICAgbGV0IHtuYW1lLCBjYWxsYmFja30gPSBlbnRyeS51cGxvYWRlcihsaXZlU29ja2V0LnVwbG9hZGVycylcbiAgICAgIGFjY1tuYW1lXSA9IGFjY1tuYW1lXSB8fCB7Y2FsbGJhY2s6IGNhbGxiYWNrLCBlbnRyaWVzOiBbXX1cbiAgICAgIGFjY1tuYW1lXS5lbnRyaWVzLnB1c2goZW50cnkpXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwge30pXG5cbiAgICBmb3IobGV0IG5hbWUgaW4gZ3JvdXBlZEVudHJpZXMpe1xuICAgICAgbGV0IHtjYWxsYmFjaywgZW50cmllc30gPSBncm91cGVkRW50cmllc1tuYW1lXVxuICAgICAgY2FsbGJhY2soZW50cmllcywgb25FcnJvciwgcmVzcCwgbGl2ZVNvY2tldClcbiAgICB9XG4gIH1cbn1cbiIsICJsZXQgQVJJQSA9IHtcbiAgZm9jdXNNYWluKCl7XG4gICAgbGV0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtYWluIGgxLCBtYWluLCBoMVwiKVxuICAgIGlmKHRhcmdldCl7XG4gICAgICBsZXQgb3JpZ1RhYkluZGV4ID0gdGFyZ2V0LnRhYkluZGV4XG4gICAgICB0YXJnZXQudGFiSW5kZXggPSAtMVxuICAgICAgdGFyZ2V0LmZvY3VzKClcbiAgICAgIHRhcmdldC50YWJJbmRleCA9IG9yaWdUYWJJbmRleFxuICAgIH1cbiAgfSxcblxuICBhbnlPZihpbnN0YW5jZSwgY2xhc3Nlcyl7IHJldHVybiBjbGFzc2VzLmZpbmQobmFtZSA9PiBpbnN0YW5jZSBpbnN0YW5jZW9mIG5hbWUpIH0sXG5cbiAgaXNGb2N1c2FibGUoZWwsIGludGVyYWN0aXZlT25seSl7XG4gICAgcmV0dXJuKFxuICAgICAgKGVsIGluc3RhbmNlb2YgSFRNTEFuY2hvckVsZW1lbnQgJiYgZWwucmVsICE9PSBcImlnbm9yZVwiKSB8fFxuICAgICAgKGVsIGluc3RhbmNlb2YgSFRNTEFyZWFFbGVtZW50ICYmIGVsLmhyZWYgIT09IHVuZGVmaW5lZCkgfHxcbiAgICAgICghZWwuZGlzYWJsZWQgJiYgKHRoaXMuYW55T2YoZWwsIFtIVE1MSW5wdXRFbGVtZW50LCBIVE1MU2VsZWN0RWxlbWVudCwgSFRNTFRleHRBcmVhRWxlbWVudCwgSFRNTEJ1dHRvbkVsZW1lbnRdKSkpIHx8XG4gICAgICAoZWwgaW5zdGFuY2VvZiBIVE1MSUZyYW1lRWxlbWVudCkgfHxcbiAgICAgIChlbC50YWJJbmRleCA+IDAgfHwgKCFpbnRlcmFjdGl2ZU9ubHkgJiYgZWwudGFiSW5kZXggPT09IDAgJiYgZWwuZ2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIikgIT09IG51bGwgJiYgZWwuZ2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIikgIT09IFwidHJ1ZVwiKSlcbiAgICApXG4gIH0sXG5cbiAgYXR0ZW1wdEZvY3VzKGVsLCBpbnRlcmFjdGl2ZU9ubHkpe1xuICAgIGlmKHRoaXMuaXNGb2N1c2FibGUoZWwsIGludGVyYWN0aXZlT25seSkpeyB0cnl7IGVsLmZvY3VzKCkgfSBjYXRjaChlKXt9IH1cbiAgICByZXR1cm4gISFkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShlbClcbiAgfSxcblxuICBmb2N1c0ZpcnN0SW50ZXJhY3RpdmUoZWwpe1xuICAgIGxldCBjaGlsZCA9IGVsLmZpcnN0RWxlbWVudENoaWxkXG4gICAgd2hpbGUoY2hpbGQpe1xuICAgICAgaWYodGhpcy5hdHRlbXB0Rm9jdXMoY2hpbGQsIHRydWUpIHx8IHRoaXMuZm9jdXNGaXJzdEludGVyYWN0aXZlKGNoaWxkLCB0cnVlKSl7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgICBjaGlsZCA9IGNoaWxkLm5leHRFbGVtZW50U2libGluZ1xuICAgIH1cbiAgfSxcblxuICBmb2N1c0ZpcnN0KGVsKXtcbiAgICBsZXQgY2hpbGQgPSBlbC5maXJzdEVsZW1lbnRDaGlsZFxuICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgIGlmKHRoaXMuYXR0ZW1wdEZvY3VzKGNoaWxkKSB8fCB0aGlzLmZvY3VzRmlyc3QoY2hpbGQpKXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICAgIGNoaWxkID0gY2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgfVxuICB9LFxuXG4gIGZvY3VzTGFzdChlbCl7XG4gICAgbGV0IGNoaWxkID0gZWwubGFzdEVsZW1lbnRDaGlsZFxuICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgIGlmKHRoaXMuYXR0ZW1wdEZvY3VzKGNoaWxkKSB8fCB0aGlzLmZvY3VzTGFzdChjaGlsZCkpe1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgICAgY2hpbGQgPSBjaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBBUklBIiwgImltcG9ydCB7XG4gIFBIWF9BQ1RJVkVfRU5UUllfUkVGUyxcbiAgUEhYX0xJVkVfRklMRV9VUERBVEVELFxuICBQSFhfUFJFRkxJR0hURURfUkVGUyxcbiAgUEhYX1VQTE9BRF9SRUZcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcbmltcG9ydCBBUklBIGZyb20gXCIuL2FyaWFcIlxuXG5sZXQgSG9va3MgPSB7XG4gIExpdmVGaWxlVXBsb2FkOiB7XG4gICAgYWN0aXZlUmVmcygpeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX0FDVElWRV9FTlRSWV9SRUZTKSB9LFxuXG4gICAgcHJlZmxpZ2h0ZWRSZWZzKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfUFJFRkxJR0hURURfUkVGUykgfSxcblxuICAgIG1vdW50ZWQoKXsgdGhpcy5wcmVmbGlnaHRlZFdhcyA9IHRoaXMucHJlZmxpZ2h0ZWRSZWZzKCkgfSxcblxuICAgIHVwZGF0ZWQoKXtcbiAgICAgIGxldCBuZXdQcmVmbGlnaHRzID0gdGhpcy5wcmVmbGlnaHRlZFJlZnMoKVxuICAgICAgaWYodGhpcy5wcmVmbGlnaHRlZFdhcyAhPT0gbmV3UHJlZmxpZ2h0cyl7XG4gICAgICAgIHRoaXMucHJlZmxpZ2h0ZWRXYXMgPSBuZXdQcmVmbGlnaHRzXG4gICAgICAgIGlmKG5ld1ByZWZsaWdodHMgPT09IFwiXCIpe1xuICAgICAgICAgIHRoaXMuX192aWV3LmNhbmNlbFN1Ym1pdCh0aGlzLmVsLmZvcm0pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYodGhpcy5hY3RpdmVSZWZzKCkgPT09IFwiXCIpeyB0aGlzLmVsLnZhbHVlID0gbnVsbCB9XG4gICAgICB0aGlzLmVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCkpXG4gICAgfVxuICB9LFxuXG4gIExpdmVJbWdQcmV2aWV3OiB7XG4gICAgbW91bnRlZCgpe1xuICAgICAgdGhpcy5yZWYgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWVudHJ5LXJlZlwiKVxuICAgICAgdGhpcy5pbnB1dEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpKVxuICAgICAgTGl2ZVVwbG9hZGVyLmdldEVudHJ5RGF0YVVSTCh0aGlzLmlucHV0RWwsIHRoaXMucmVmLCB1cmwgPT4ge1xuICAgICAgICB0aGlzLnVybCA9IHVybFxuICAgICAgICB0aGlzLmVsLnNyYyA9IHVybFxuICAgICAgfSlcbiAgICB9LFxuICAgIGRlc3Ryb3llZCgpe1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh0aGlzLnVybClcbiAgICB9XG4gIH0sXG4gIEZvY3VzV3JhcDoge1xuICAgIG1vdW50ZWQoKXtcbiAgICAgIHRoaXMuZm9jdXNTdGFydCA9IHRoaXMuZWwuZmlyc3RFbGVtZW50Q2hpbGRcbiAgICAgIHRoaXMuZm9jdXNFbmQgPSB0aGlzLmVsLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgIHRoaXMuZm9jdXNTdGFydC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgKCkgPT4gQVJJQS5mb2N1c0xhc3QodGhpcy5lbCkpXG4gICAgICB0aGlzLmZvY3VzRW5kLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCAoKSA9PiBBUklBLmZvY3VzRmlyc3QodGhpcy5lbCkpXG4gICAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6c2hvdy1lbmRcIiwgKCkgPT4gdGhpcy5lbC5mb2N1cygpKVxuICAgICAgaWYod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbCkuZGlzcGxheSAhPT0gXCJub25lXCIpe1xuICAgICAgICBBUklBLmZvY3VzRmlyc3QodGhpcy5lbClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSG9va3NcbiIsICJpbXBvcnQge1xuICBtYXliZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NUG9zdE1vcnBoUmVzdG9yZXIge1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXJCZWZvcmUsIGNvbnRhaW5lckFmdGVyLCB1cGRhdGVUeXBlKXtcbiAgICBsZXQgaWRzQmVmb3JlID0gbmV3IFNldCgpXG4gICAgbGV0IGlkc0FmdGVyID0gbmV3IFNldChbLi4uY29udGFpbmVyQWZ0ZXIuY2hpbGRyZW5dLm1hcChjaGlsZCA9PiBjaGlsZC5pZCkpXG5cbiAgICBsZXQgZWxlbWVudHNUb01vZGlmeSA9IFtdXG5cbiAgICBBcnJheS5mcm9tKGNvbnRhaW5lckJlZm9yZS5jaGlsZHJlbikuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICBpZihjaGlsZC5pZCl7IC8vIGFsbCBvZiBvdXIgY2hpbGRyZW4gc2hvdWxkIGJlIGVsZW1lbnRzIHdpdGggaWRzXG4gICAgICAgIGlkc0JlZm9yZS5hZGQoY2hpbGQuaWQpXG4gICAgICAgIGlmKGlkc0FmdGVyLmhhcyhjaGlsZC5pZCkpe1xuICAgICAgICAgIGxldCBwcmV2aW91c0VsZW1lbnRJZCA9IGNoaWxkLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgY2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZy5pZFxuICAgICAgICAgIGVsZW1lbnRzVG9Nb2RpZnkucHVzaCh7ZWxlbWVudElkOiBjaGlsZC5pZCwgcHJldmlvdXNFbGVtZW50SWQ6IHByZXZpb3VzRWxlbWVudElkfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICB0aGlzLmNvbnRhaW5lcklkID0gY29udGFpbmVyQWZ0ZXIuaWRcbiAgICB0aGlzLnVwZGF0ZVR5cGUgPSB1cGRhdGVUeXBlXG4gICAgdGhpcy5lbGVtZW50c1RvTW9kaWZ5ID0gZWxlbWVudHNUb01vZGlmeVxuICAgIHRoaXMuZWxlbWVudElkc1RvQWRkID0gWy4uLmlkc0FmdGVyXS5maWx0ZXIoaWQgPT4gIWlkc0JlZm9yZS5oYXMoaWQpKVxuICB9XG5cbiAgLy8gV2UgZG8gdGhlIGZvbGxvd2luZyB0byBvcHRpbWl6ZSBhcHBlbmQvcHJlcGVuZCBvcGVyYXRpb25zOlxuICAvLyAgIDEpIFRyYWNrIGlkcyBvZiBtb2RpZmllZCBlbGVtZW50cyAmIG9mIG5ldyBlbGVtZW50c1xuICAvLyAgIDIpIEFsbCB0aGUgbW9kaWZpZWQgZWxlbWVudHMgYXJlIHB1dCBiYWNrIGluIHRoZSBjb3JyZWN0IHBvc2l0aW9uIGluIHRoZSBET00gdHJlZVxuICAvLyAgICAgIGJ5IHN0b3JpbmcgdGhlIGlkIG9mIHRoZWlyIHByZXZpb3VzIHNpYmxpbmdcbiAgLy8gICAzKSBOZXcgZWxlbWVudHMgYXJlIGdvaW5nIHRvIGJlIHB1dCBpbiB0aGUgcmlnaHQgcGxhY2UgYnkgbW9ycGhkb20gZHVyaW5nIGFwcGVuZC5cbiAgLy8gICAgICBGb3IgcHJlcGVuZCwgd2UgbW92ZSB0aGVtIHRvIHRoZSBmaXJzdCBwb3NpdGlvbiBpbiB0aGUgY29udGFpbmVyXG4gIHBlcmZvcm0oKXtcbiAgICBsZXQgY29udGFpbmVyID0gRE9NLmJ5SWQodGhpcy5jb250YWluZXJJZClcbiAgICB0aGlzLmVsZW1lbnRzVG9Nb2RpZnkuZm9yRWFjaChlbGVtZW50VG9Nb2RpZnkgPT4ge1xuICAgICAgaWYoZWxlbWVudFRvTW9kaWZ5LnByZXZpb3VzRWxlbWVudElkKXtcbiAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvTW9kaWZ5LnByZXZpb3VzRWxlbWVudElkKSwgcHJldmlvdXNFbGVtID0+IHtcbiAgICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Nb2RpZnkuZWxlbWVudElkKSwgZWxlbSA9PiB7XG4gICAgICAgICAgICBsZXQgaXNJblJpZ2h0UGxhY2UgPSBlbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmlkID09IHByZXZpb3VzRWxlbS5pZFxuICAgICAgICAgICAgaWYoIWlzSW5SaWdodFBsYWNlKXtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbGVtLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyZW5kXCIsIGVsZW0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGNvbnRhaW5lclxuICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Nb2RpZnkuZWxlbWVudElkKSwgZWxlbSA9PiB7XG4gICAgICAgICAgbGV0IGlzSW5SaWdodFBsYWNlID0gZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nID09IG51bGxcbiAgICAgICAgICBpZighaXNJblJpZ2h0UGxhY2Upe1xuICAgICAgICAgICAgY29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgZWxlbSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIGlmKHRoaXMudXBkYXRlVHlwZSA9PSBcInByZXBlbmRcIil7XG4gICAgICB0aGlzLmVsZW1lbnRJZHNUb0FkZC5yZXZlcnNlKCkuZm9yRWFjaChlbGVtSWQgPT4ge1xuICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtSWQpLCBlbGVtID0+IGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGVsZW0pKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiIsICJ2YXIgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSA9IDExO1xuXG5mdW5jdGlvbiBtb3JwaEF0dHJzKGZyb21Ob2RlLCB0b05vZGUpIHtcbiAgICB2YXIgdG9Ob2RlQXR0cnMgPSB0b05vZGUuYXR0cmlidXRlcztcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgYXR0ck5hbWU7XG4gICAgdmFyIGF0dHJOYW1lc3BhY2VVUkk7XG4gICAgdmFyIGF0dHJWYWx1ZTtcbiAgICB2YXIgZnJvbVZhbHVlO1xuXG4gICAgLy8gZG9jdW1lbnQtZnJhZ21lbnRzIGRvbnQgaGF2ZSBhdHRyaWJ1dGVzIHNvIGxldHMgbm90IGRvIGFueXRoaW5nXG4gICAgaWYgKHRvTm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSB8fCBmcm9tTm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBhdHRyaWJ1dGVzIG9uIG9yaWdpbmFsIERPTSBlbGVtZW50XG4gICAgZm9yICh2YXIgaSA9IHRvTm9kZUF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGF0dHIgPSB0b05vZGVBdHRyc1tpXTtcbiAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcbiAgICAgICAgYXR0clZhbHVlID0gYXR0ci52YWx1ZTtcblxuICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZTtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKTtcblxuICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dHIucHJlZml4ID09PSAneG1sbnMnKXtcbiAgICAgICAgICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7IC8vIEl0J3Mgbm90IGFsbG93ZWQgdG8gc2V0IGFuIGF0dHJpYnV0ZSB3aXRoIHRoZSBYTUxOUyBuYW1lc3BhY2Ugd2l0aG91dCBzcGVjaWZ5aW5nIHRoZSBgeG1sbnNgIHByZWZpeFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhbnkgZXh0cmEgYXR0cmlidXRlcyBmb3VuZCBvbiB0aGUgb3JpZ2luYWwgRE9NIGVsZW1lbnQgdGhhdFxuICAgIC8vIHdlcmVuJ3QgZm91bmQgb24gdGhlIHRhcmdldCBlbGVtZW50LlxuICAgIHZhciBmcm9tTm9kZUF0dHJzID0gZnJvbU5vZGUuYXR0cmlidXRlcztcblxuICAgIGZvciAodmFyIGQgPSBmcm9tTm9kZUF0dHJzLmxlbmd0aCAtIDE7IGQgPj0gMDsgZC0tKSB7XG4gICAgICAgIGF0dHIgPSBmcm9tTm9kZUF0dHJzW2RdO1xuICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuXG4gICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuXG4gICAgICAgICAgICBpZiAoIXRvTm9kZS5oYXNBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5yZW1vdmVBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRvTm9kZS5oYXNBdHRyaWJ1dGUoYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIHJhbmdlOyAvLyBDcmVhdGUgYSByYW5nZSBvYmplY3QgZm9yIGVmZmljZW50bHkgcmVuZGVyaW5nIHN0cmluZ3MgdG8gZWxlbWVudHMuXG52YXIgTlNfWEhUTUwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG5cbnZhciBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogZG9jdW1lbnQ7XG52YXIgSEFTX1RFTVBMQVRFX1NVUFBPUlQgPSAhIWRvYyAmJiAnY29udGVudCcgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG52YXIgSEFTX1JBTkdFX1NVUFBPUlQgPSAhIWRvYyAmJiBkb2MuY3JlYXRlUmFuZ2UgJiYgJ2NyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCcgaW4gZG9jLmNyZWF0ZVJhbmdlKCk7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50RnJvbVRlbXBsYXRlKHN0cikge1xuICAgIHZhciB0ZW1wbGF0ZSA9IGRvYy5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHN0cjtcbiAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21SYW5nZShzdHIpIHtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGUoZG9jLmJvZHkpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudCA9IHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChzdHIpO1xuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21XcmFwKHN0cikge1xuICAgIHZhciBmcmFnbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgZnJhZ21lbnQuaW5uZXJIVE1MID0gc3RyO1xuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgYWJvdXQgdGhlIHNhbWVcbiAqIHZhciBodG1sID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhzdHIsICd0ZXh0L2h0bWwnKTtcbiAqIHJldHVybiBodG1sLmJvZHkuZmlyc3RDaGlsZDtcbiAqXG4gKiBAbWV0aG9kIHRvRWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICovXG5mdW5jdGlvbiB0b0VsZW1lbnQoc3RyKSB7XG4gICAgc3RyID0gc3RyLnRyaW0oKTtcbiAgICBpZiAoSEFTX1RFTVBMQVRFX1NVUFBPUlQpIHtcbiAgICAgIC8vIGF2b2lkIHJlc3RyaWN0aW9ucyBvbiBjb250ZW50IGZvciB0aGluZ3MgbGlrZSBgPHRyPjx0aD5IaTwvdGg+PC90cj5gIHdoaWNoXG4gICAgICAvLyBjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQgZG9lc24ndCBzdXBwb3J0XG4gICAgICAvLyA8dGVtcGxhdGU+IHN1cHBvcnQgbm90IGF2YWlsYWJsZSBpbiBJRVxuICAgICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVRlbXBsYXRlKHN0cik7XG4gICAgfSBlbHNlIGlmIChIQVNfUkFOR0VfU1VQUE9SVCkge1xuICAgICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVJhbmdlKHN0cik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUZyYWdtZW50RnJvbVdyYXAoc3RyKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdHdvIG5vZGUncyBuYW1lcyBhcmUgdGhlIHNhbWUuXG4gKlxuICogTk9URTogV2UgZG9uJ3QgYm90aGVyIGNoZWNraW5nIGBuYW1lc3BhY2VVUklgIGJlY2F1c2UgeW91IHdpbGwgbmV2ZXIgZmluZCB0d28gSFRNTCBlbGVtZW50cyB3aXRoIHRoZSBzYW1lXG4gKiAgICAgICBub2RlTmFtZSBhbmQgZGlmZmVyZW50IG5hbWVzcGFjZSBVUklzLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiIFRoZSB0YXJnZXQgZWxlbWVudFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY29tcGFyZU5vZGVOYW1lcyhmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgZnJvbU5vZGVOYW1lID0gZnJvbUVsLm5vZGVOYW1lO1xuICAgIHZhciB0b05vZGVOYW1lID0gdG9FbC5ub2RlTmFtZTtcbiAgICB2YXIgZnJvbUNvZGVTdGFydCwgdG9Db2RlU3RhcnQ7XG5cbiAgICBpZiAoZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZyb21Db2RlU3RhcnQgPSBmcm9tTm9kZU5hbWUuY2hhckNvZGVBdCgwKTtcbiAgICB0b0NvZGVTdGFydCA9IHRvTm9kZU5hbWUuY2hhckNvZGVBdCgwKTtcblxuICAgIC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIHZpcnR1YWwgRE9NIG5vZGUgb3IgU1ZHIG5vZGUgdGhlbiB3ZSBtYXlcbiAgICAvLyBuZWVkIHRvIG5vcm1hbGl6ZSB0aGUgdGFnIG5hbWUgYmVmb3JlIGNvbXBhcmluZy4gTm9ybWFsIEhUTUwgZWxlbWVudHMgdGhhdCBhcmVcbiAgICAvLyBpbiB0aGUgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCJcbiAgICAvLyBhcmUgY29udmVydGVkIHRvIHVwcGVyIGNhc2VcbiAgICBpZiAoZnJvbUNvZGVTdGFydCA8PSA5MCAmJiB0b0NvZGVTdGFydCA+PSA5NykgeyAvLyBmcm9tIGlzIHVwcGVyIGFuZCB0byBpcyBsb3dlclxuICAgICAgICByZXR1cm4gZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIGlmICh0b0NvZGVTdGFydCA8PSA5MCAmJiBmcm9tQ29kZVN0YXJ0ID49IDk3KSB7IC8vIHRvIGlzIHVwcGVyIGFuZCBmcm9tIGlzIGxvd2VyXG4gICAgICAgIHJldHVybiB0b05vZGVOYW1lID09PSBmcm9tTm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50LCBvcHRpb25hbGx5IHdpdGggYSBrbm93biBuYW1lc3BhY2UgVVJJLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSBlbGVtZW50IG5hbWUsIGUuZy4gJ2Rpdicgb3IgJ3N2ZydcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZXNwYWNlVVJJXSB0aGUgZWxlbWVudCdzIG5hbWVzcGFjZSBVUkksIGkuZS4gdGhlIHZhbHVlIG9mXG4gKiBpdHMgYHhtbG5zYCBhdHRyaWJ1dGUgb3IgaXRzIGluZmVycmVkIG5hbWVzcGFjZS5cbiAqXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZSwgbmFtZXNwYWNlVVJJKSB7XG4gICAgcmV0dXJuICFuYW1lc3BhY2VVUkkgfHwgbmFtZXNwYWNlVVJJID09PSBOU19YSFRNTCA/XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50KG5hbWUpIDpcbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgY2hpbGRyZW4gb2Ygb25lIERPTSBlbGVtZW50IHRvIGFub3RoZXIgRE9NIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkcmVuKGZyb21FbCwgdG9FbCkge1xuICAgIHZhciBjdXJDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICB2YXIgbmV4dENoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIHRvRWwuYXBwZW5kQ2hpbGQoY3VyQ2hpbGQpO1xuICAgICAgICBjdXJDaGlsZCA9IG5leHRDaGlsZDtcbiAgICB9XG4gICAgcmV0dXJuIHRvRWw7XG59XG5cbmZ1bmN0aW9uIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCBuYW1lKSB7XG4gICAgaWYgKGZyb21FbFtuYW1lXSAhPT0gdG9FbFtuYW1lXSkge1xuICAgICAgICBmcm9tRWxbbmFtZV0gPSB0b0VsW25hbWVdO1xuICAgICAgICBpZiAoZnJvbUVsW25hbWVdKSB7XG4gICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBzcGVjaWFsRWxIYW5kbGVycyA9IHtcbiAgICBPUFRJT046IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICB2YXIgcGFyZW50Tm9kZSA9IGZyb21FbC5wYXJlbnROb2RlO1xuICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgdmFyIHBhcmVudE5hbWUgPSBwYXJlbnROb2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAocGFyZW50TmFtZSA9PT0gJ09QVEdST1VQJykge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBwYXJlbnROb2RlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgcGFyZW50TmFtZSA9IHBhcmVudE5vZGUgJiYgcGFyZW50Tm9kZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUgPT09ICdTRUxFQ1QnICYmICFwYXJlbnROb2RlLmhhc0F0dHJpYnV0ZSgnbXVsdGlwbGUnKSkge1xuICAgICAgICAgICAgICAgIGlmIChmcm9tRWwuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpICYmICF0b0VsLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdvcmthcm91bmQgZm9yIE1TIEVkZ2UgYnVnIHdoZXJlIHRoZSAnc2VsZWN0ZWQnIGF0dHJpYnV0ZSBjYW4gb25seSBiZVxuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmVkIGlmIHNldCB0byBhIG5vbi1lbXB0eSB2YWx1ZTpcbiAgICAgICAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMTIwODc2NzkvXG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoJ3NlbGVjdGVkJywgJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ3NlbGVjdGVkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gcmVzZXQgc2VsZWN0IGVsZW1lbnQncyBzZWxlY3RlZEluZGV4IHRvIC0xLCBvdGhlcndpc2Ugc2V0dGluZ1xuICAgICAgICAgICAgICAgIC8vIGZyb21FbC5zZWxlY3RlZCB1c2luZyB0aGUgc3luY0Jvb2xlYW5BdHRyUHJvcCBiZWxvdyBoYXMgbm8gZWZmZWN0LlxuICAgICAgICAgICAgICAgIC8vIFRoZSBjb3JyZWN0IHNlbGVjdGVkSW5kZXggd2lsbCBiZSBzZXQgaW4gdGhlIFNFTEVDVCBzcGVjaWFsIGhhbmRsZXIgYmVsb3cuXG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5zZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdzZWxlY3RlZCcpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogVGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgaXMgc3BlY2lhbCBmb3IgdGhlIDxpbnB1dD4gZWxlbWVudCBzaW5jZSBpdCBzZXRzXG4gICAgICogdGhlIGluaXRpYWwgdmFsdWUuIENoYW5naW5nIHRoZSBcInZhbHVlXCIgYXR0cmlidXRlIHdpdGhvdXQgY2hhbmdpbmcgdGhlXG4gICAgICogXCJ2YWx1ZVwiIHByb3BlcnR5IHdpbGwgaGF2ZSBubyBlZmZlY3Qgc2luY2UgaXQgaXMgb25seSB1c2VkIHRvIHRoZSBzZXQgdGhlXG4gICAgICogaW5pdGlhbCB2YWx1ZS4gIFNpbWlsYXIgZm9yIHRoZSBcImNoZWNrZWRcIiBhdHRyaWJ1dGUsIGFuZCBcImRpc2FibGVkXCIuXG4gICAgICovXG4gICAgSU5QVVQ6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ2NoZWNrZWQnKTtcbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdkaXNhYmxlZCcpO1xuXG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IHRvRWwudmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRvRWwuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFRFWFRBUkVBOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpcnN0Q2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgaWYgKGZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIC8vIE5lZWRlZCBmb3IgSUUuIEFwcGFyZW50bHkgSUUgc2V0cyB0aGUgcGxhY2Vob2xkZXIgYXMgdGhlXG4gICAgICAgICAgICAvLyBub2RlIHZhbHVlIGFuZCB2aXNlIHZlcnNhLiBUaGlzIGlnbm9yZXMgYW4gZW1wdHkgdXBkYXRlLlxuICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gZmlyc3RDaGlsZC5ub2RlVmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChvbGRWYWx1ZSA9PSBuZXdWYWx1ZSB8fCAoIW5ld1ZhbHVlICYmIG9sZFZhbHVlID09IGZyb21FbC5wbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZpcnN0Q2hpbGQubm9kZVZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFNFTEVDVDogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIGlmICghdG9FbC5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJykpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEluZGV4ID0gLTE7XG4gICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIHRvIGxvb3AgdGhyb3VnaCBjaGlsZHJlbiBvZiBmcm9tRWwsIG5vdCB0b0VsIHNpbmNlIG5vZGVzIGNhbiBiZSBtb3ZlZFxuICAgICAgICAgICAgLy8gZnJvbSB0b0VsIHRvIGZyb21FbCBkaXJlY3RseSB3aGVuIG1vcnBoaW5nLlxuICAgICAgICAgICAgLy8gQXQgdGhlIHRpbWUgdGhpcyBzcGVjaWFsIGhhbmRsZXIgaXMgaW52b2tlZCwgYWxsIGNoaWxkcmVuIGhhdmUgYWxyZWFkeSBiZWVuIG1vcnBoZWRcbiAgICAgICAgICAgIC8vIGFuZCBhcHBlbmRlZCB0byAvIHJlbW92ZWQgZnJvbSBmcm9tRWwsIHNvIHVzaW5nIGZyb21FbCBoZXJlIGlzIHNhZmUgYW5kIGNvcnJlY3QuXG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBvcHRncm91cDtcbiAgICAgICAgICAgIHZhciBub2RlTmFtZTtcbiAgICAgICAgICAgIHdoaWxlKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgbm9kZU5hbWUgPSBjdXJDaGlsZC5ub2RlTmFtZSAmJiBjdXJDaGlsZC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChub2RlTmFtZSA9PT0gJ09QVEdST1VQJykge1xuICAgICAgICAgICAgICAgICAgICBvcHRncm91cCA9IGN1ckNoaWxkO1xuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG9wdGdyb3VwLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVOYW1lID09PSAnT1BUSU9OJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNoaWxkLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY3VyQ2hpbGQgJiYgb3B0Z3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gb3B0Z3JvdXAubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRncm91cCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZyb21FbC5zZWxlY3RlZEluZGV4ID0gc2VsZWN0ZWRJbmRleDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBFTEVNRU5UX05PREUgPSAxO1xudmFyIERPQ1VNRU5UX0ZSQUdNRU5UX05PREUkMSA9IDExO1xudmFyIFRFWFRfTk9ERSA9IDM7XG52YXIgQ09NTUVOVF9OT0RFID0gODtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXROb2RlS2V5KG5vZGUpIHtcbiAgaWYgKG5vZGUpIHtcbiAgICAgIHJldHVybiAobm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoJ2lkJykpIHx8IG5vZGUuaWQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gbW9ycGhkb21GYWN0b3J5KG1vcnBoQXR0cnMpIHtcblxuICAgIHJldHVybiBmdW5jdGlvbiBtb3JwaGRvbShmcm9tTm9kZSwgdG9Ob2RlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0b05vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoZnJvbU5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnIHx8IGZyb21Ob2RlLm5vZGVOYW1lID09PSAnSFRNTCcgfHwgZnJvbU5vZGUubm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgICAgICAgICAgICAgIHZhciB0b05vZGVIdG1sID0gdG9Ob2RlO1xuICAgICAgICAgICAgICAgIHRvTm9kZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdodG1sJyk7XG4gICAgICAgICAgICAgICAgdG9Ob2RlLmlubmVySFRNTCA9IHRvTm9kZUh0bWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvTm9kZSA9IHRvRWxlbWVudCh0b05vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGdldE5vZGVLZXkgPSBvcHRpb25zLmdldE5vZGVLZXkgfHwgZGVmYXVsdEdldE5vZGVLZXk7XG4gICAgICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlQWRkZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIG9uTm9kZUFkZGVkID0gb3B0aW9ucy5vbk5vZGVBZGRlZCB8fCBub29wO1xuICAgICAgICB2YXIgb25CZWZvcmVFbFVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxVcGRhdGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBvbkVsVXBkYXRlZCA9IG9wdGlvbnMub25FbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIG9uQmVmb3JlTm9kZURpc2NhcmRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlRGlzY2FyZGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBvbk5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgICAgICB2YXIgb25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCB8fCBub29wO1xuICAgICAgICB2YXIgY2hpbGRyZW5Pbmx5ID0gb3B0aW9ucy5jaGlsZHJlbk9ubHkgPT09IHRydWU7XG5cbiAgICAgICAgLy8gVGhpcyBvYmplY3QgaXMgdXNlZCBhcyBhIGxvb2t1cCB0byBxdWlja2x5IGZpbmQgYWxsIGtleWVkIGVsZW1lbnRzIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS5cbiAgICAgICAgdmFyIGZyb21Ob2Rlc0xvb2t1cCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHZhciBrZXllZFJlbW92YWxMaXN0ID0gW107XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkS2V5ZWRSZW1vdmFsKGtleSkge1xuICAgICAgICAgICAga2V5ZWRSZW1vdmFsTGlzdC5wdXNoKGtleSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB3YWxrRGlzY2FyZGVkQ2hpbGROb2Rlcyhub2RlLCBza2lwS2V5ZWROb2Rlcykge1xuICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChza2lwS2V5ZWROb2RlcyAmJiAoa2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgc2tpcHBpbmcga2V5ZWQgbm9kZXMgdGhlbiB3ZSBhZGQgdGhlIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBsaXN0IHNvIHRoYXQgaXQgY2FuIGJlIGhhbmRsZWQgYXQgdGhlIHZlcnkgZW5kLlxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHJlcG9ydCB0aGUgbm9kZSBhcyBkaXNjYXJkZWQgaWYgaXQgaXMgbm90IGtleWVkLiBXZSBkbyB0aGlzIGJlY2F1c2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGF0IHRoZSBlbmQgd2UgbG9vcCB0aHJvdWdoIGFsbCBrZXllZCBlbGVtZW50cyB0aGF0IHdlcmUgdW5tYXRjaGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlbiBkaXNjYXJkIHRoZW0gaW4gb25lIGZpbmFsIHBhc3MuXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNoaWxkLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2RlcyhjdXJDaGlsZCwgc2tpcEtleWVkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlcyBhIERPTSBub2RlIG91dCBvZiB0aGUgb3JpZ2luYWwgRE9NXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgVGhlIG5vZGUgdG8gcmVtb3ZlXG4gICAgICAgICAqIEBwYXJhbSAge05vZGV9IHBhcmVudE5vZGUgVGhlIG5vZGVzIHBhcmVudFxuICAgICAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBza2lwS2V5ZWROb2RlcyBJZiB0cnVlIHRoZW4gZWxlbWVudHMgd2l0aCBrZXlzIHdpbGwgYmUgc2tpcHBlZCBhbmQgbm90IGRpc2NhcmRlZC5cbiAgICAgICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlLCBwYXJlbnROb2RlLCBza2lwS2V5ZWROb2Rlcykge1xuICAgICAgICAgICAgaWYgKG9uQmVmb3JlTm9kZURpc2NhcmRlZChub2RlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKG5vZGUpO1xuICAgICAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSwgc2tpcEtleWVkTm9kZXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gLy8gVHJlZVdhbGtlciBpbXBsZW1lbnRhdGlvbiBpcyBubyBmYXN0ZXIsIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kIGluIGNhc2UgdGhpcyBjaGFuZ2VzIGluIHRoZSBmdXR1cmVcbiAgICAgICAgLy8gZnVuY3Rpb24gaW5kZXhUcmVlKHJvb3QpIHtcbiAgICAgICAgLy8gICAgIHZhciB0cmVlV2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcbiAgICAgICAgLy8gICAgICAgICByb290LFxuICAgICAgICAvLyAgICAgICAgIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgIHZhciBlbDtcbiAgICAgICAgLy8gICAgIHdoaWxlKChlbCA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSkpIHtcbiAgICAgICAgLy8gICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShlbCk7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAvLyAgICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGVsO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIC8vIE5vZGVJdGVyYXRvciBpbXBsZW1lbnRhdGlvbiBpcyBubyBmYXN0ZXIsIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kIGluIGNhc2UgdGhpcyBjaGFuZ2VzIGluIHRoZSBmdXR1cmVcbiAgICAgICAgLy9cbiAgICAgICAgLy8gZnVuY3Rpb24gaW5kZXhUcmVlKG5vZGUpIHtcbiAgICAgICAgLy8gICAgIHZhciBub2RlSXRlcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iobm9kZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgICAgICAvLyAgICAgdmFyIGVsO1xuICAgICAgICAvLyAgICAgd2hpbGUoKGVsID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpKSB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoZWwpO1xuICAgICAgICAvLyAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBlbDtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICBmdW5jdGlvbiBpbmRleFRyZWUobm9kZSkge1xuICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSB8fCBub2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFJDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBjdXJDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFdhbGsgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICAgICAgaW5kZXhUcmVlKGN1ckNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGluZGV4VHJlZShmcm9tTm9kZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlTm9kZUFkZGVkKGVsKSB7XG4gICAgICAgICAgICBvbk5vZGVBZGRlZChlbCk7XG5cbiAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IGVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSBjdXJDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB1bm1hdGNoZWRGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgd2UgZmluZCBhIGR1cGxpY2F0ZSAjaWQgbm9kZSBpbiBjYWNoZSwgcmVwbGFjZSBgZWxgIHdpdGggY2FjaGUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIG1vcnBoIGl0IHRvIHRoZSBjaGlsZCBub2RlLlxuICAgICAgICAgICAgICAgICAgICBpZiAodW5tYXRjaGVkRnJvbUVsICYmIGNvbXBhcmVOb2RlTmFtZXMoY3VyQ2hpbGQsIHVubWF0Y2hlZEZyb21FbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHVubWF0Y2hlZEZyb21FbCwgY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhFbCh1bm1hdGNoZWRGcm9tRWwsIGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIHJlY3Vyc2l2ZWx5IGNhbGwgZm9yIGN1ckNoaWxkIGFuZCBpdCdzIGNoaWxkcmVuIHRvIHNlZSBpZiB3ZSBmaW5kIHNvbWV0aGluZyBpblxuICAgICAgICAgICAgICAgICAgLy8gZnJvbU5vZGVzTG9va3VwXG4gICAgICAgICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gbmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjbGVhbnVwRnJvbUVsKGZyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCwgY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgcHJvY2Vzc2VkIGFsbCBvZiB0aGUgXCJ0byBub2Rlc1wiLiBJZiBjdXJGcm9tTm9kZUNoaWxkIGlzXG4gICAgICAgICAgICAvLyBub24tbnVsbCB0aGVuIHdlIHN0aWxsIGhhdmUgc29tZSBmcm9tIG5vZGVzIGxlZnQgb3ZlciB0aGF0IG5lZWRcbiAgICAgICAgICAgIC8vIHRvIGJlIHJlbW92ZWRcbiAgICAgICAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKChjdXJGcm9tTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyRnJvbU5vZGVDaGlsZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbW9ycGhFbChmcm9tRWwsIHRvRWwsIGNoaWxkcmVuT25seSkge1xuICAgICAgICAgICAgdmFyIHRvRWxLZXkgPSBnZXROb2RlS2V5KHRvRWwpO1xuXG4gICAgICAgICAgICBpZiAodG9FbEtleSkge1xuICAgICAgICAgICAgICAgIC8vIElmIGFuIGVsZW1lbnQgd2l0aCBhbiBJRCBpcyBiZWluZyBtb3JwaGVkIHRoZW4gaXQgd2lsbCBiZSBpbiB0aGUgZmluYWxcbiAgICAgICAgICAgICAgICAvLyBET00gc28gY2xlYXIgaXQgb3V0IG9mIHRoZSBzYXZlZCBlbGVtZW50cyBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgICAgZGVsZXRlIGZyb21Ob2Rlc0xvb2t1cFt0b0VsS2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgICAgICAgICAvLyBvcHRpb25hbFxuICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZUVsVXBkYXRlZChmcm9tRWwsIHRvRWwpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIGF0dHJpYnV0ZXMgb24gb3JpZ2luYWwgRE9NIGVsZW1lbnQgZmlyc3RcbiAgICAgICAgICAgICAgICBtb3JwaEF0dHJzKGZyb21FbCwgdG9FbCk7XG4gICAgICAgICAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgICAgICAgICBvbkVsVXBkYXRlZChmcm9tRWwpO1xuXG4gICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZyb21FbC5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgICBtb3JwaENoaWxkcmVuKGZyb21FbCwgdG9FbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzcGVjaWFsRWxIYW5kbGVycy5URVhUQVJFQShmcm9tRWwsIHRvRWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbW9ycGhDaGlsZHJlbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgICAgIHZhciBjdXJUb05vZGVDaGlsZCA9IHRvRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgY3VyVG9Ob2RlS2V5O1xuICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlS2V5O1xuXG4gICAgICAgICAgICB2YXIgZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB2YXIgbWF0Y2hpbmdGcm9tRWw7XG5cbiAgICAgICAgICAgIC8vIHdhbGsgdGhlIGNoaWxkcmVuXG4gICAgICAgICAgICBvdXRlcjogd2hpbGUgKGN1clRvTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdG9OZXh0U2libGluZyA9IGN1clRvTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGN1clRvTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyVG9Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgLy8gd2FsayB0aGUgZnJvbU5vZGUgY2hpbGRyZW4gYWxsIHRoZSB3YXkgdGhyb3VnaFxuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLmlzU2FtZU5vZGUgJiYgY3VyVG9Ob2RlQ2hpbGQuaXNTYW1lTm9kZShjdXJGcm9tTm9kZUNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZVR5cGUgPSBjdXJGcm9tTm9kZUNoaWxkLm5vZGVUeXBlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgbWVhbnMgaWYgdGhlIGN1ckZyb21Ob2RlQ2hpbGQgZG9lc250IGhhdmUgYSBtYXRjaCB3aXRoIHRoZSBjdXJUb05vZGVDaGlsZFxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNDb21wYXRpYmxlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IGN1clRvTm9kZUNoaWxkLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIG5vZGVzIGJlaW5nIGNvbXBhcmVkIGFyZSBFbGVtZW50IG5vZGVzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSB0YXJnZXQgbm9kZSBoYXMgYSBrZXkgc28gd2Ugd2FudCB0byBtYXRjaCBpdCB1cCB3aXRoIHRoZSBjb3JyZWN0IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVLZXkgIT09IGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgY3VycmVudCBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCBET00gdHJlZSBkb2VzIG5vdCBoYXZlIGEgbWF0Y2hpbmcga2V5IHNvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQncyBjaGVjayBvdXIgbG9va3VwIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1hdGNoaW5nIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBET00gdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChtYXRjaGluZ0Zyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtjdXJUb05vZGVLZXldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmcm9tTmV4dFNpYmxpbmcgPT09IG1hdGNoaW5nRnJvbUVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3Igc2luZ2xlIGVsZW1lbnQgcmVtb3ZhbHMuIFRvIGF2b2lkIHJlbW92aW5nIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBET00gbm9kZSBvdXQgb2YgdGhlIHRyZWUgKHNpbmNlIHRoYXQgY2FuIGJyZWFrIENTUyB0cmFuc2l0aW9ucywgZXRjLiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIHdpbGwgaW5zdGVhZCBkaXNjYXJkIHRoZSBjdXJyZW50IG5vZGUgYW5kIHdhaXQgdW50aWwgdGhlIG5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXRlcmF0aW9uIHRvIHByb3Blcmx5IG1hdGNoIHVwIHRoZSBrZXllZCB0YXJnZXQgZWxlbWVudCB3aXRoIGl0cyBtYXRjaGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIGEgbWF0Y2hpbmcga2V5ZWQgZWxlbWVudCBzb21ld2hlcmUgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMZXQncyBtb3ZlIHRoZSBvcmlnaW5hbCBET00gbm9kZSBpbnRvIHRoZSBjdXJyZW50IHBvc2l0aW9uIGFuZCBtb3JwaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpdC5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBXZSB1c2UgaW5zZXJ0QmVmb3JlIGluc3RlYWQgb2YgcmVwbGFjZUNoaWxkIGJlY2F1c2Ugd2Ugd2FudCB0byBnbyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBgcmVtb3ZlTm9kZSgpYCBmdW5jdGlvbiBmb3IgdGhlIG5vZGUgdGhhdCBpcyBiZWluZyBkaXNjYXJkZWQgc28gdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGwgbGlmZWN5Y2xlIGhvb2tzIGFyZSBjb3JyZWN0bHkgaW52b2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tRWwuaW5zZXJ0QmVmb3JlKG1hdGNoaW5nRnJvbUVsLCBjdXJGcm9tTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gbWF0Y2hpbmdGcm9tRWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbm9kZXMgYXJlIG5vdCBjb21wYXRpYmxlIHNpbmNlIHRoZSBcInRvXCIgbm9kZSBoYXMgYSBrZXkgYW5kIHRoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgbm8gbWF0Y2hpbmcga2V5ZWQgbm9kZSBpbiB0aGUgc291cmNlIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG9yaWdpbmFsIGhhcyBhIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBpc0NvbXBhdGlibGUgIT09IGZhbHNlICYmIGNvbXBhcmVOb2RlTmFtZXMoY3VyRnJvbU5vZGVDaGlsZCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgY29tcGF0aWJsZSBET00gZWxlbWVudHMgc28gdHJhbnNmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IFwiZnJvbVwiIG5vZGUgdG8gbWF0Y2ggdGhlIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IERPTSBub2RlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNT1JQSFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBURVhUX05PREUgfHwgY3VyRnJvbU5vZGVUeXBlID09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIFRleHQgb3IgQ29tbWVudCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2ltcGx5IHVwZGF0ZSBub2RlVmFsdWUgb24gdGhlIG9yaWdpbmFsIG5vZGUgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHRleHQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVDaGlsZC5ub2RlVmFsdWUgIT09IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkLm5vZGVWYWx1ZSA9IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgYm90aCB0aGUgXCJ0b1wiIGNoaWxkIGFuZCB0aGUgXCJmcm9tXCIgY2hpbGQgc2luY2Ugd2UgZm91bmQgYSBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm90aGluZyBlbHNlIHRvIGRvIGFzIHdlIGFscmVhZHkgcmVjdXJzaXZlbHkgY2FsbGVkIG1vcnBoQ2hpbGRyZW4gYWJvdmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIGNvbXBhdGlibGUgbWF0Y2ggc28gcmVtb3ZlIHRoZSBvbGQgbm9kZSBmcm9tIHRoZSBET00gYW5kIGNvbnRpbnVlIHRyeWluZyB0byBmaW5kIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2ggaW4gdGhlIG9yaWdpbmFsIERPTS4gSG93ZXZlciwgd2Ugb25seSBkbyB0aGlzIGlmIHRoZSBmcm9tIG5vZGUgaXMgbm90IGtleWVkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIGl0IGlzIHBvc3NpYmxlIHRoYXQgYSBrZXllZCBub2RlIG1pZ2h0IG1hdGNoIHVwIHdpdGggYSBub2RlIHNvbWV3aGVyZSBlbHNlIGluIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgdHJlZSBhbmQgd2UgZG9uJ3Qgd2FudCB0byBkaXNjYXJkIGl0IGp1c3QgeWV0IHNpbmNlIGl0IHN0aWxsIG1pZ2h0IGZpbmQgYVxuICAgICAgICAgICAgICAgICAgICAvLyBob21lIGluIHRoZSBmaW5hbCBET00gdHJlZS4gQWZ0ZXIgZXZlcnl0aGluZyBpcyBkb25lIHdlIHdpbGwgcmVtb3ZlIGFueSBrZXllZCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGF0IGRpZG4ndCBmaW5kIGEgaG9tZVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICB9IC8vIEVORDogd2hpbGUoY3VyRnJvbU5vZGVDaGlsZCkge31cblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGdvdCB0aGlzIGZhciB0aGVuIHdlIGRpZCBub3QgZmluZCBhIGNhbmRpZGF0ZSBtYXRjaCBmb3JcbiAgICAgICAgICAgICAgICAvLyBvdXIgXCJ0byBub2RlXCIgYW5kIHdlIGV4aGF1c3RlZCBhbGwgb2YgdGhlIGNoaWxkcmVuIFwiZnJvbVwiXG4gICAgICAgICAgICAgICAgLy8gbm9kZXMuIFRoZXJlZm9yZSwgd2Ugd2lsbCBqdXN0IGFwcGVuZCB0aGUgY3VycmVudCBcInRvXCIgbm9kZVxuICAgICAgICAgICAgICAgIC8vIHRvIHRoZSBlbmRcbiAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICYmIChtYXRjaGluZ0Zyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtjdXJUb05vZGVLZXldKSAmJiBjb21wYXJlTm9kZU5hbWVzKG1hdGNoaW5nRnJvbUVsLCBjdXJUb05vZGVDaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmFwcGVuZENoaWxkKG1hdGNoaW5nRnJvbUVsKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gTU9SUEhcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChtYXRjaGluZ0Zyb21FbCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCA9IG9uQmVmb3JlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gY3VyVG9Ob2RlQ2hpbGQuYWN0dWFsaXplKGZyb21FbC5vd25lckRvY3VtZW50IHx8IGRvYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tRWwuYXBwZW5kQ2hpbGQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGVhbnVwRnJvbUVsKGZyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCwgY3VyRnJvbU5vZGVLZXkpO1xuXG4gICAgICAgICAgICB2YXIgc3BlY2lhbEVsSGFuZGxlciA9IHNwZWNpYWxFbEhhbmRsZXJzW2Zyb21FbC5ub2RlTmFtZV07XG4gICAgICAgICAgICBpZiAoc3BlY2lhbEVsSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIHNwZWNpYWxFbEhhbmRsZXIoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSAvLyBFTkQ6IG1vcnBoQ2hpbGRyZW4oLi4uKVxuXG4gICAgICAgIHZhciBtb3JwaGVkTm9kZSA9IGZyb21Ob2RlO1xuICAgICAgICB2YXIgbW9ycGhlZE5vZGVUeXBlID0gbW9ycGhlZE5vZGUubm9kZVR5cGU7XG4gICAgICAgIHZhciB0b05vZGVUeXBlID0gdG9Ob2RlLm5vZGVUeXBlO1xuXG4gICAgICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgYXJlIGdpdmVuIHR3byBET00gbm9kZXMgdGhhdCBhcmUgbm90XG4gICAgICAgICAgICAvLyBjb21wYXRpYmxlIChlLmcuIDxkaXY+IC0tPiA8c3Bhbj4gb3IgPGRpdj4gLS0+IFRFWFQpXG4gICAgICAgICAgICBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghY29tcGFyZU5vZGVOYW1lcyhmcm9tTm9kZSwgdG9Ob2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGZyb21Ob2RlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gbW92ZUNoaWxkcmVuKGZyb21Ob2RlLCBjcmVhdGVFbGVtZW50TlModG9Ob2RlLm5vZGVOYW1lLCB0b05vZGUubmFtZXNwYWNlVVJJKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBHb2luZyBmcm9tIGFuIGVsZW1lbnQgbm9kZSB0byBhIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IHRvTm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vcnBoZWROb2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IG1vcnBoZWROb2RlVHlwZSA9PT0gQ09NTUVOVF9OT0RFKSB7IC8vIFRleHQgb3IgY29tbWVudCBub2RlXG4gICAgICAgICAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IG1vcnBoZWROb2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobW9ycGhlZE5vZGUubm9kZVZhbHVlICE9PSB0b05vZGUubm9kZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZS5ub2RlVmFsdWUgPSB0b05vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRleHQgbm9kZSB0byBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IHRvTm9kZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9ycGhlZE5vZGUgPT09IHRvTm9kZSkge1xuICAgICAgICAgICAgLy8gVGhlIFwidG8gbm9kZVwiIHdhcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSBcImZyb20gbm9kZVwiIHNvIHdlIGhhZCB0b1xuICAgICAgICAgICAgLy8gdG9zcyBvdXQgdGhlIFwiZnJvbSBub2RlXCIgYW5kIHVzZSB0aGUgXCJ0byBub2RlXCJcbiAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodG9Ob2RlLmlzU2FtZU5vZGUgJiYgdG9Ob2RlLmlzU2FtZU5vZGUobW9ycGhlZE5vZGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb3JwaEVsKG1vcnBoZWROb2RlLCB0b05vZGUsIGNoaWxkcmVuT25seSk7XG5cbiAgICAgICAgICAgIC8vIFdlIG5vdyBuZWVkIHRvIGxvb3Agb3ZlciBhbnkga2V5ZWQgbm9kZXMgdGhhdCBtaWdodCBuZWVkIHRvIGJlXG4gICAgICAgICAgICAvLyByZW1vdmVkLiBXZSBvbmx5IGRvIHRoZSByZW1vdmFsIGlmIHdlIGtub3cgdGhhdCB0aGUga2V5ZWQgbm9kZVxuICAgICAgICAgICAgLy8gbmV2ZXIgZm91bmQgYSBtYXRjaC4gV2hlbiBhIGtleWVkIG5vZGUgaXMgbWF0Y2hlZCB1cCB3ZSByZW1vdmVcbiAgICAgICAgICAgIC8vIGl0IG91dCBvZiBmcm9tTm9kZXNMb29rdXAgYW5kIHdlIHVzZSBmcm9tTm9kZXNMb29rdXAgdG8gZGV0ZXJtaW5lXG4gICAgICAgICAgICAvLyBpZiBhIGtleWVkIG5vZGUgaGFzIGJlZW4gbWF0Y2hlZCB1cCBvciBub3RcbiAgICAgICAgICAgIGlmIChrZXllZFJlbW92YWxMaXN0KSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaT0wLCBsZW49a2V5ZWRSZW1vdmFsTGlzdC5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsVG9SZW1vdmUgPSBmcm9tTm9kZXNMb29rdXBba2V5ZWRSZW1vdmFsTGlzdFtpXV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbFRvUmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGVsVG9SZW1vdmUsIGVsVG9SZW1vdmUucGFyZW50Tm9kZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjaGlsZHJlbk9ubHkgJiYgbW9ycGhlZE5vZGUgIT09IGZyb21Ob2RlICYmIGZyb21Ob2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGlmIChtb3JwaGVkTm9kZS5hY3R1YWxpemUpIHtcbiAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IG1vcnBoZWROb2RlLmFjdHVhbGl6ZShmcm9tTm9kZS5vd25lckRvY3VtZW50IHx8IGRvYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYWQgdG8gc3dhcCBvdXQgdGhlIGZyb20gbm9kZSB3aXRoIGEgbmV3IG5vZGUgYmVjYXVzZSB0aGUgb2xkXG4gICAgICAgICAgICAvLyBub2RlIHdhcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSB0YXJnZXQgbm9kZSB0aGVuIHdlIG5lZWQgdG9cbiAgICAgICAgICAgIC8vIHJlcGxhY2UgdGhlIG9sZCBET00gbm9kZSBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuIFRoaXMgaXMgb25seVxuICAgICAgICAgICAgLy8gcG9zc2libGUgaWYgdGhlIG9yaWdpbmFsIERPTSBub2RlIHdhcyBwYXJ0IG9mIGEgRE9NIHRyZWUgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlIGtub3cgaXMgdGhlIGNhc2UgaWYgaXQgaGFzIGEgcGFyZW50IG5vZGUuXG4gICAgICAgICAgICBmcm9tTm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChtb3JwaGVkTm9kZSwgZnJvbU5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICAgIH07XG59XG5cbnZhciBtb3JwaGRvbSA9IG1vcnBoZG9tRmFjdG9yeShtb3JwaEF0dHJzKTtcblxuZXhwb3J0IGRlZmF1bHQgbW9ycGhkb207XG4iLCAiaW1wb3J0IHtcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX0RJU0FCTEVfV0lUSCxcbiAgUEhYX0ZFRURCQUNLX0ZPUixcbiAgUEhYX1BSVU5FLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TS0lQLFxuICBQSFhfU1RBVElDLFxuICBQSFhfVFJJR0dFUl9BQ1RJT04sXG4gIFBIWF9VUERBVEVcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgZGV0ZWN0RHVwbGljYXRlSWRzLFxuICBpc0NpZFxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBET01Qb3N0TW9ycGhSZXN0b3JlciBmcm9tIFwiLi9kb21fcG9zdF9tb3JwaF9yZXN0b3JlclwiXG5pbXBvcnQgbW9ycGhkb20gZnJvbSBcIm1vcnBoZG9tXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRE9NUGF0Y2gge1xuICBzdGF0aWMgcGF0Y2hFbChmcm9tRWwsIHRvRWwsIGFjdGl2ZUVsZW1lbnQpe1xuICAgIG1vcnBoZG9tKGZyb21FbCwgdG9FbCwge1xuICAgICAgY2hpbGRyZW5Pbmx5OiBmYWxzZSxcbiAgICAgIG9uQmVmb3JlRWxVcGRhdGVkOiAoZnJvbUVsLCB0b0VsKSA9PiB7XG4gICAgICAgIGlmKGFjdGl2ZUVsZW1lbnQgJiYgYWN0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGZyb21FbCkgJiYgRE9NLmlzRm9ybUlucHV0KGZyb21FbCkpe1xuICAgICAgICAgIERPTS5tZXJnZUZvY3VzZWRJbnB1dChmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY29uc3RydWN0b3IodmlldywgY29udGFpbmVyLCBpZCwgaHRtbCwgdGFyZ2V0Q0lEKXtcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5saXZlU29ja2V0ID0gdmlldy5saXZlU29ja2V0XG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXJcbiAgICB0aGlzLmlkID0gaWRcbiAgICB0aGlzLnJvb3RJRCA9IHZpZXcucm9vdC5pZFxuICAgIHRoaXMuaHRtbCA9IGh0bWxcbiAgICB0aGlzLnRhcmdldENJRCA9IHRhcmdldENJRFxuICAgIHRoaXMuY2lkUGF0Y2ggPSBpc0NpZCh0aGlzLnRhcmdldENJRClcbiAgICB0aGlzLmNhbGxiYWNrcyA9IHtcbiAgICAgIGJlZm9yZWFkZGVkOiBbXSwgYmVmb3JldXBkYXRlZDogW10sIGJlZm9yZXBoeENoaWxkQWRkZWQ6IFtdLFxuICAgICAgYWZ0ZXJhZGRlZDogW10sIGFmdGVydXBkYXRlZDogW10sIGFmdGVyZGlzY2FyZGVkOiBbXSwgYWZ0ZXJwaHhDaGlsZEFkZGVkOiBbXSxcbiAgICAgIGFmdGVydHJhbnNpdGlvbnNEaXNjYXJkZWQ6IFtdXG4gICAgfVxuICB9XG5cbiAgYmVmb3JlKGtpbmQsIGNhbGxiYWNrKXsgdGhpcy5jYWxsYmFja3NbYGJlZm9yZSR7a2luZH1gXS5wdXNoKGNhbGxiYWNrKSB9XG4gIGFmdGVyKGtpbmQsIGNhbGxiYWNrKXsgdGhpcy5jYWxsYmFja3NbYGFmdGVyJHtraW5kfWBdLnB1c2goY2FsbGJhY2spIH1cblxuICB0cmFja0JlZm9yZShraW5kLCAuLi5hcmdzKXtcbiAgICB0aGlzLmNhbGxiYWNrc1tgYmVmb3JlJHtraW5kfWBdLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpXG4gIH1cblxuICB0cmFja0FmdGVyKGtpbmQsIC4uLmFyZ3Mpe1xuICAgIHRoaXMuY2FsbGJhY2tzW2BhZnRlciR7a2luZH1gXS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKVxuICB9XG5cbiAgbWFya1BydW5hYmxlQ29udGVudEZvclJlbW92YWwoKXtcbiAgICBET00uYWxsKHRoaXMuY29udGFpbmVyLCBcIltwaHgtdXBkYXRlPWFwcGVuZF0gPiAqLCBbcGh4LXVwZGF0ZT1wcmVwZW5kXSA+ICpcIiwgZWwgPT4ge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9QUlVORSwgXCJcIilcbiAgICB9KVxuICB9XG5cbiAgcGVyZm9ybSgpe1xuICAgIGxldCB7dmlldywgbGl2ZVNvY2tldCwgY29udGFpbmVyLCBodG1sfSA9IHRoaXNcbiAgICBsZXQgdGFyZ2V0Q29udGFpbmVyID0gdGhpcy5pc0NJRFBhdGNoKCkgPyB0aGlzLnRhcmdldENJRENvbnRhaW5lcihodG1sKSA6IGNvbnRhaW5lclxuICAgIGlmKHRoaXMuaXNDSURQYXRjaCgpICYmICF0YXJnZXRDb250YWluZXIpeyByZXR1cm4gfVxuXG4gICAgbGV0IGZvY3VzZWQgPSBsaXZlU29ja2V0LmdldEFjdGl2ZUVsZW1lbnQoKVxuICAgIGxldCB7c2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZH0gPSBmb2N1c2VkICYmIERPTS5oYXNTZWxlY3Rpb25SYW5nZShmb2N1c2VkKSA/IGZvY3VzZWQgOiB7fVxuICAgIGxldCBwaHhVcGRhdGUgPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX1VQREFURSlcbiAgICBsZXQgcGh4RmVlZGJhY2tGb3IgPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX0ZFRURCQUNLX0ZPUilcbiAgICBsZXQgZGlzYWJsZVdpdGggPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX0RJU0FCTEVfV0lUSClcbiAgICBsZXQgcGh4VHJpZ2dlckV4dGVybmFsID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9UUklHR0VSX0FDVElPTilcbiAgICBsZXQgcGh4UmVtb3ZlID0gbGl2ZVNvY2tldC5iaW5kaW5nKFwicmVtb3ZlXCIpXG4gICAgbGV0IGFkZGVkID0gW11cbiAgICBsZXQgdXBkYXRlcyA9IFtdXG4gICAgbGV0IGFwcGVuZFByZXBlbmRVcGRhdGVzID0gW11cbiAgICBsZXQgcGVuZGluZ1JlbW92ZXMgPSBbXVxuICAgIGxldCBleHRlcm5hbEZvcm1UcmlnZ2VyZWQgPSBudWxsXG5cbiAgICBsZXQgZGlmZkhUTUwgPSBsaXZlU29ja2V0LnRpbWUoXCJwcmVtb3JwaCBjb250YWluZXIgcHJlcFwiLCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5idWlsZERpZmZIVE1MKGNvbnRhaW5lciwgaHRtbCwgcGh4VXBkYXRlLCB0YXJnZXRDb250YWluZXIpXG4gICAgfSlcblxuICAgIHRoaXMudHJhY2tCZWZvcmUoXCJhZGRlZFwiLCBjb250YWluZXIpXG4gICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgY29udGFpbmVyLCBjb250YWluZXIpXG5cbiAgICBsaXZlU29ja2V0LnRpbWUoXCJtb3JwaGRvbVwiLCAoKSA9PiB7XG4gICAgICBtb3JwaGRvbSh0YXJnZXRDb250YWluZXIsIGRpZmZIVE1MLCB7XG4gICAgICAgIGNoaWxkcmVuT25seTogdGFyZ2V0Q29udGFpbmVyLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSA9PT0gbnVsbCxcbiAgICAgICAgZ2V0Tm9kZUtleTogKG5vZGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gRE9NLmlzUGh4RGVzdHJveWVkKG5vZGUpID8gbnVsbCA6IG5vZGUuaWRcbiAgICAgICAgfSxcbiAgICAgICAgb25CZWZvcmVOb2RlQWRkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJhZGRlZFwiLCBlbClcbiAgICAgICAgICByZXR1cm4gZWxcbiAgICAgICAgfSxcbiAgICAgICAgb25Ob2RlQWRkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIC8vIGhhY2sgdG8gZml4IFNhZmFyaSBoYW5kbGluZyBvZiBpbWcgc3Jjc2V0IGFuZCB2aWRlbyB0YWdzXG4gICAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50ICYmIGVsLnNyY3NldCl7XG4gICAgICAgICAgICBlbC5zcmNzZXQgPSBlbC5zcmNzZXRcbiAgICAgICAgICB9IGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBIVE1MVmlkZW9FbGVtZW50ICYmIGVsLmF1dG9wbGF5KXtcbiAgICAgICAgICAgIGVsLnBsYXkoKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihET00uaXNOb3dUcmlnZ2VyRm9ybUV4dGVybmFsKGVsLCBwaHhUcmlnZ2VyRXh0ZXJuYWwpKXtcbiAgICAgICAgICAgIGV4dGVybmFsRm9ybVRyaWdnZXJlZCA9IGVsXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vaW5wdXQgaGFuZGxpbmdcbiAgICAgICAgICBET00uZGlzY2FyZEVycm9yKHRhcmdldENvbnRhaW5lciwgZWwsIHBoeEZlZWRiYWNrRm9yKVxuICAgICAgICAgIC8vIG5lc3RlZCB2aWV3IGhhbmRsaW5nXG4gICAgICAgICAgaWYoKERPTS5pc1BoeENoaWxkKGVsKSAmJiB2aWV3Lm93bnNFbGVtZW50KGVsKSkgfHwgRE9NLmlzUGh4U3RpY2t5KGVsKSAmJiB2aWV3Lm93bnNFbGVtZW50KGVsLnBhcmVudE5vZGUpKXtcbiAgICAgICAgICAgIHRoaXMudHJhY2tBZnRlcihcInBoeENoaWxkQWRkZWRcIiwgZWwpXG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZGVkLnB1c2goZWwpXG4gICAgICAgIH0sXG4gICAgICAgIG9uTm9kZURpc2NhcmRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgLy8gbmVzdGVkIHZpZXcgaGFuZGxpbmdcbiAgICAgICAgICBpZihET00uaXNQaHhDaGlsZChlbCkgfHwgRE9NLmlzUGh4U3RpY2t5KGVsKSl7IGxpdmVTb2NrZXQuZGVzdHJveVZpZXdCeUVsKGVsKSB9XG4gICAgICAgICAgdGhpcy50cmFja0FmdGVyKFwiZGlzY2FyZGVkXCIsIGVsKVxuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZU5vZGVEaXNjYXJkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1BSVU5FKSAhPT0gbnVsbCl7IHJldHVybiB0cnVlIH1cbiAgICAgICAgICBpZihlbC5wYXJlbnROb2RlICE9PSBudWxsICYmIERPTS5pc1BoeFVwZGF0ZShlbC5wYXJlbnROb2RlLCBwaHhVcGRhdGUsIFtcImFwcGVuZFwiLCBcInByZXBlbmRcIl0pICYmIGVsLmlkKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZihlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKHBoeFJlbW92ZSkpe1xuICAgICAgICAgICAgcGVuZGluZ1JlbW92ZXMucHVzaChlbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZih0aGlzLnNraXBDSURTaWJsaW5nKGVsKSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgb25FbFVwZGF0ZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIGlmKERPTS5pc05vd1RyaWdnZXJGb3JtRXh0ZXJuYWwoZWwsIHBoeFRyaWdnZXJFeHRlcm5hbCkpe1xuICAgICAgICAgICAgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gZWxcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlcy5wdXNoKGVsKVxuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZUVsVXBkYXRlZDogKGZyb21FbCwgdG9FbCkgPT4ge1xuICAgICAgICAgIERPTS5jbGVhbkNoaWxkTm9kZXModG9FbCwgcGh4VXBkYXRlKVxuICAgICAgICAgIGlmKHRoaXMuc2tpcENJRFNpYmxpbmcodG9FbCkpeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGlmKERPTS5pc1BoeFN0aWNreShmcm9tRWwpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZihET00uaXNJZ25vcmVkKGZyb21FbCwgcGh4VXBkYXRlKSB8fCAoZnJvbUVsLmZvcm0gJiYgZnJvbUVsLmZvcm0uaXNTYW1lTm9kZShleHRlcm5hbEZvcm1UcmlnZ2VyZWQpKSl7XG4gICAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLCBmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgICBET00ubWVyZ2VBdHRycyhmcm9tRWwsIHRvRWwsIHtpc0lnbm9yZWQ6IHRydWV9KVxuICAgICAgICAgICAgdXBkYXRlcy5wdXNoKGZyb21FbClcbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnMoZnJvbUVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGZyb21FbC50eXBlID09PSBcIm51bWJlclwiICYmIChmcm9tRWwudmFsaWRpdHkgJiYgZnJvbUVsLnZhbGlkaXR5LmJhZElucHV0KSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgaWYoIURPTS5zeW5jUGVuZGluZ1JlZihmcm9tRWwsIHRvRWwsIGRpc2FibGVXaXRoKSl7XG4gICAgICAgICAgICBpZihET00uaXNVcGxvYWRJbnB1dChmcm9tRWwpKXtcbiAgICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgICB1cGRhdGVzLnB1c2goZnJvbUVsKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBuZXN0ZWQgdmlldyBoYW5kbGluZ1xuICAgICAgICAgIGlmKERPTS5pc1BoeENoaWxkKHRvRWwpKXtcbiAgICAgICAgICAgIGxldCBwcmV2U2Vzc2lvbiA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pXG4gICAgICAgICAgICBET00ubWVyZ2VBdHRycyhmcm9tRWwsIHRvRWwsIHtleGNsdWRlOiBbUEhYX1NUQVRJQ119KVxuICAgICAgICAgICAgaWYocHJldlNlc3Npb24gIT09IFwiXCIpeyBmcm9tRWwuc2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OLCBwcmV2U2Vzc2lvbikgfVxuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZShQSFhfUk9PVF9JRCwgdGhpcy5yb290SUQpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGlucHV0IGhhbmRsaW5nXG4gICAgICAgICAgRE9NLmNvcHlQcml2YXRlcyh0b0VsLCBmcm9tRWwpXG4gICAgICAgICAgRE9NLmRpc2NhcmRFcnJvcih0YXJnZXRDb250YWluZXIsIHRvRWwsIHBoeEZlZWRiYWNrRm9yKVxuXG4gICAgICAgICAgbGV0IGlzRm9jdXNlZEZvcm1FbCA9IGZvY3VzZWQgJiYgZnJvbUVsLmlzU2FtZU5vZGUoZm9jdXNlZCkgJiYgRE9NLmlzRm9ybUlucHV0KGZyb21FbClcbiAgICAgICAgICBpZihpc0ZvY3VzZWRGb3JtRWwgJiYgZnJvbUVsLnR5cGUgIT09IFwiaGlkZGVuXCIpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlRm9jdXNlZElucHV0KGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIERPTS5zeW5jQXR0cnNUb1Byb3BzKGZyb21FbClcbiAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihET00uaXNQaHhVcGRhdGUodG9FbCwgcGh4VXBkYXRlLCBbXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICAgICAgICAgIGFwcGVuZFByZXBlbmRVcGRhdGVzLnB1c2gobmV3IERPTVBvc3RNb3JwaFJlc3RvcmVyKGZyb21FbCwgdG9FbCwgdG9FbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBET00uc3luY0F0dHJzVG9Qcm9wcyh0b0VsKVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyh0b0VsKVxuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGlmKGxpdmVTb2NrZXQuaXNEZWJ1Z0VuYWJsZWQoKSl7IGRldGVjdER1cGxpY2F0ZUlkcygpIH1cblxuICAgIGlmKGFwcGVuZFByZXBlbmRVcGRhdGVzLmxlbmd0aCA+IDApe1xuICAgICAgbGl2ZVNvY2tldC50aW1lKFwicG9zdC1tb3JwaCBhcHBlbmQvcHJlcGVuZCByZXN0b3JhdGlvblwiLCAoKSA9PiB7XG4gICAgICAgIGFwcGVuZFByZXBlbmRVcGRhdGVzLmZvckVhY2godXBkYXRlID0+IHVwZGF0ZS5wZXJmb3JtKCkpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGxpdmVTb2NrZXQuc2lsZW5jZUV2ZW50cygoKSA9PiBET00ucmVzdG9yZUZvY3VzKGZvY3VzZWQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpKVxuICAgIERPTS5kaXNwYXRjaEV2ZW50KGRvY3VtZW50LCBcInBoeDp1cGRhdGVcIilcbiAgICBhZGRlZC5mb3JFYWNoKGVsID0+IHRoaXMudHJhY2tBZnRlcihcImFkZGVkXCIsIGVsKSlcbiAgICB1cGRhdGVzLmZvckVhY2goZWwgPT4gdGhpcy50cmFja0FmdGVyKFwidXBkYXRlZFwiLCBlbCkpXG5cbiAgICBpZihwZW5kaW5nUmVtb3Zlcy5sZW5ndGggPiAwKXtcbiAgICAgIGxpdmVTb2NrZXQudHJhbnNpdGlvblJlbW92ZXMocGVuZGluZ1JlbW92ZXMpXG4gICAgICBsaXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBwZW5kaW5nUmVtb3Zlcy5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICBsZXQgY2hpbGQgPSBET00uZmlyc3RQaHhDaGlsZChlbClcbiAgICAgICAgICBpZihjaGlsZCl7IGxpdmVTb2NrZXQuZGVzdHJveVZpZXdCeUVsKGNoaWxkKSB9XG4gICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy50cmFja0FmdGVyKFwidHJhbnNpdGlvbnNEaXNjYXJkZWRcIiwgcGVuZGluZ1JlbW92ZXMpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmKGV4dGVybmFsRm9ybVRyaWdnZXJlZCl7XG4gICAgICBsaXZlU29ja2V0LnVubG9hZCgpXG4gICAgICBleHRlcm5hbEZvcm1UcmlnZ2VyZWQuc3VibWl0KClcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlzQ0lEUGF0Y2goKXsgcmV0dXJuIHRoaXMuY2lkUGF0Y2ggfVxuXG4gIHNraXBDSURTaWJsaW5nKGVsKXtcbiAgICByZXR1cm4gZWwubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIGVsLmdldEF0dHJpYnV0ZShQSFhfU0tJUCkgIT09IG51bGxcbiAgfVxuXG4gIHRhcmdldENJRENvbnRhaW5lcihodG1sKXtcbiAgICBpZighdGhpcy5pc0NJRFBhdGNoKCkpeyByZXR1cm4gfVxuICAgIGxldCBbZmlyc3QsIC4uLnJlc3RdID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmNvbnRhaW5lciwgdGhpcy50YXJnZXRDSUQpXG4gICAgaWYocmVzdC5sZW5ndGggPT09IDAgJiYgRE9NLmNoaWxkTm9kZUxlbmd0aChodG1sKSA9PT0gMSl7XG4gICAgICByZXR1cm4gZmlyc3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZpcnN0ICYmIGZpcnN0LnBhcmVudE5vZGVcbiAgICB9XG4gIH1cblxuICAvLyBidWlsZHMgSFRNTCBmb3IgbW9ycGhkb20gcGF0Y2hcbiAgLy8gLSBmb3IgZnVsbCBwYXRjaGVzIG9mIExpdmVWaWV3IG9yIGEgY29tcG9uZW50IHdpdGggYSBzaW5nbGVcbiAgLy8gICByb290IG5vZGUsIHNpbXBseSByZXR1cm5zIHRoZSBIVE1MXG4gIC8vIC0gZm9yIHBhdGNoZXMgb2YgYSBjb21wb25lbnQgd2l0aCBtdWx0aXBsZSByb290IG5vZGVzLCB0aGVcbiAgLy8gICBwYXJlbnQgbm9kZSBiZWNvbWVzIHRoZSB0YXJnZXQgY29udGFpbmVyIGFuZCBub24tY29tcG9uZW50XG4gIC8vICAgc2libGluZ3MgYXJlIG1hcmtlZCBhcyBza2lwLlxuICBidWlsZERpZmZIVE1MKGNvbnRhaW5lciwgaHRtbCwgcGh4VXBkYXRlLCB0YXJnZXRDb250YWluZXIpe1xuICAgIGxldCBpc0NJRFBhdGNoID0gdGhpcy5pc0NJRFBhdGNoKClcbiAgICBsZXQgaXNDSURXaXRoU2luZ2xlUm9vdCA9IGlzQ0lEUGF0Y2ggJiYgdGFyZ2V0Q29udGFpbmVyLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSA9PT0gdGhpcy50YXJnZXRDSUQudG9TdHJpbmcoKVxuICAgIGlmKCFpc0NJRFBhdGNoIHx8IGlzQ0lEV2l0aFNpbmdsZVJvb3Qpe1xuICAgICAgcmV0dXJuIGh0bWxcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29tcG9uZW50IHBhdGNoIHdpdGggbXVsdGlwbGUgQ0lEIHJvb3RzXG4gICAgICBsZXQgZGlmZkNvbnRhaW5lciA9IG51bGxcbiAgICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgICAgZGlmZkNvbnRhaW5lciA9IERPTS5jbG9uZU5vZGUodGFyZ2V0Q29udGFpbmVyKVxuICAgICAgbGV0IFtmaXJzdENvbXBvbmVudCwgLi4ucmVzdF0gPSBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KGRpZmZDb250YWluZXIsIHRoaXMudGFyZ2V0Q0lEKVxuICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgICAgcmVzdC5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKVxuICAgICAgQXJyYXkuZnJvbShkaWZmQ29udGFpbmVyLmNoaWxkTm9kZXMpLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAvLyB3ZSBjYW4gb25seSBza2lwIHRyYWNrYWJsZSBub2RlcyB3aXRoIGFuIElEXG4gICAgICAgIGlmKGNoaWxkLmlkICYmIGNoaWxkLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBjaGlsZC5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkgIT09IHRoaXMudGFyZ2V0Q0lELnRvU3RyaW5nKCkpe1xuICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZShQSFhfU0tJUCwgXCJcIilcbiAgICAgICAgICBjaGlsZC5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBBcnJheS5mcm9tKHRlbXBsYXRlLmNvbnRlbnQuY2hpbGROb2RlcykuZm9yRWFjaChlbCA9PiBkaWZmQ29udGFpbmVyLmluc2VydEJlZm9yZShlbCwgZmlyc3RDb21wb25lbnQpKVxuICAgICAgZmlyc3RDb21wb25lbnQucmVtb3ZlKClcbiAgICAgIHJldHVybiBkaWZmQ29udGFpbmVyLm91dGVySFRNTFxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENPTVBPTkVOVFMsXG4gIERZTkFNSUNTLFxuICBURU1QTEFURVMsXG4gIEVWRU5UUyxcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX1NLSVAsXG4gIFJFUExZLFxuICBTVEFUSUMsXG4gIFRJVExFXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGlzT2JqZWN0LFxuICBsb2dFcnJvcixcbiAgaXNDaWQsXG59IGZyb20gXCIuL3V0aWxzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZWQge1xuICBzdGF0aWMgZXh0cmFjdChkaWZmKXtcbiAgICBsZXQge1tSRVBMWV06IHJlcGx5LCBbRVZFTlRTXTogZXZlbnRzLCBbVElUTEVdOiB0aXRsZX0gPSBkaWZmXG4gICAgZGVsZXRlIGRpZmZbUkVQTFldXG4gICAgZGVsZXRlIGRpZmZbRVZFTlRTXVxuICAgIGRlbGV0ZSBkaWZmW1RJVExFXVxuICAgIHJldHVybiB7ZGlmZiwgdGl0bGUsIHJlcGx5OiByZXBseSB8fCBudWxsLCBldmVudHM6IGV2ZW50cyB8fCBbXX1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHZpZXdJZCwgcmVuZGVyZWQpe1xuICAgIHRoaXMudmlld0lkID0gdmlld0lkXG4gICAgdGhpcy5yZW5kZXJlZCA9IHt9XG4gICAgdGhpcy5tZXJnZURpZmYocmVuZGVyZWQpXG4gIH1cblxuICBwYXJlbnRWaWV3SWQoKXsgcmV0dXJuIHRoaXMudmlld0lkIH1cblxuICB0b1N0cmluZyhvbmx5Q2lkcyl7XG4gICAgcmV0dXJuIHRoaXMucmVjdXJzaXZlVG9TdHJpbmcodGhpcy5yZW5kZXJlZCwgdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSwgb25seUNpZHMpXG4gIH1cblxuICByZWN1cnNpdmVUb1N0cmluZyhyZW5kZXJlZCwgY29tcG9uZW50cyA9IHJlbmRlcmVkW0NPTVBPTkVOVFNdLCBvbmx5Q2lkcyl7XG4gICAgb25seUNpZHMgPSBvbmx5Q2lkcyA/IG5ldyBTZXQob25seUNpZHMpIDogbnVsbFxuICAgIGxldCBvdXRwdXQgPSB7YnVmZmVyOiBcIlwiLCBjb21wb25lbnRzOiBjb21wb25lbnRzLCBvbmx5Q2lkczogb25seUNpZHN9XG4gICAgdGhpcy50b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgbnVsbCwgb3V0cHV0KVxuICAgIHJldHVybiBvdXRwdXQuYnVmZmVyXG4gIH1cblxuICBjb21wb25lbnRDSURzKGRpZmYpeyByZXR1cm4gT2JqZWN0LmtleXMoZGlmZltDT01QT05FTlRTXSB8fCB7fSkubWFwKGkgPT4gcGFyc2VJbnQoaSkpIH1cblxuICBpc0NvbXBvbmVudE9ubHlEaWZmKGRpZmYpe1xuICAgIGlmKCFkaWZmW0NPTVBPTkVOVFNdKXsgcmV0dXJuIGZhbHNlIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZGlmZikubGVuZ3RoID09PSAxXG4gIH1cblxuICBnZXRDb21wb25lbnQoZGlmZiwgY2lkKXsgcmV0dXJuIGRpZmZbQ09NUE9ORU5UU11bY2lkXSB9XG5cbiAgbWVyZ2VEaWZmKGRpZmYpe1xuICAgIGxldCBuZXdjID0gZGlmZltDT01QT05FTlRTXVxuICAgIGxldCBjYWNoZSA9IHt9XG4gICAgZGVsZXRlIGRpZmZbQ09NUE9ORU5UU11cbiAgICB0aGlzLnJlbmRlcmVkID0gdGhpcy5tdXRhYmxlTWVyZ2UodGhpcy5yZW5kZXJlZCwgZGlmZilcbiAgICB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdID0gdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSB8fCB7fVxuXG4gICAgaWYobmV3Yyl7XG4gICAgICBsZXQgb2xkYyA9IHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU11cblxuICAgICAgZm9yKGxldCBjaWQgaW4gbmV3Yyl7XG4gICAgICAgIG5ld2NbY2lkXSA9IHRoaXMuY2FjaGVkRmluZENvbXBvbmVudChjaWQsIG5ld2NbY2lkXSwgb2xkYywgbmV3YywgY2FjaGUpXG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgY2lkIGluIG5ld2MpeyBvbGRjW2NpZF0gPSBuZXdjW2NpZF0gfVxuICAgICAgZGlmZltDT01QT05FTlRTXSA9IG5ld2NcbiAgICB9XG4gIH1cblxuICBjYWNoZWRGaW5kQ29tcG9uZW50KGNpZCwgY2RpZmYsIG9sZGMsIG5ld2MsIGNhY2hlKXtcbiAgICBpZihjYWNoZVtjaWRdKXtcbiAgICAgIHJldHVybiBjYWNoZVtjaWRdXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZGlmZiwgc3RhdCwgc2NpZCA9IGNkaWZmW1NUQVRJQ11cblxuICAgICAgaWYoaXNDaWQoc2NpZCkpe1xuICAgICAgICBsZXQgdGRpZmZcblxuICAgICAgICBpZihzY2lkID4gMCl7XG4gICAgICAgICAgdGRpZmYgPSB0aGlzLmNhY2hlZEZpbmRDb21wb25lbnQoc2NpZCwgbmV3Y1tzY2lkXSwgb2xkYywgbmV3YywgY2FjaGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGRpZmYgPSBvbGRjWy1zY2lkXVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdCA9IHRkaWZmW1NUQVRJQ11cbiAgICAgICAgbmRpZmYgPSB0aGlzLmNsb25lTWVyZ2UodGRpZmYsIGNkaWZmKVxuICAgICAgICBuZGlmZltTVEFUSUNdID0gc3RhdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmRpZmYgPSBjZGlmZltTVEFUSUNdICE9PSB1bmRlZmluZWQgPyBjZGlmZiA6IHRoaXMuY2xvbmVNZXJnZShvbGRjW2NpZF0gfHwge30sIGNkaWZmKVxuICAgICAgfVxuXG4gICAgICBjYWNoZVtjaWRdID0gbmRpZmZcbiAgICAgIHJldHVybiBuZGlmZlxuICAgIH1cbiAgfVxuXG4gIG11dGFibGVNZXJnZSh0YXJnZXQsIHNvdXJjZSl7XG4gICAgaWYoc291cmNlW1NUQVRJQ10gIT09IHVuZGVmaW5lZCl7XG4gICAgICByZXR1cm4gc291cmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9NdXRhYmxlTWVyZ2UodGFyZ2V0LCBzb3VyY2UpXG4gICAgICByZXR1cm4gdGFyZ2V0XG4gICAgfVxuICB9XG5cbiAgZG9NdXRhYmxlTWVyZ2UodGFyZ2V0LCBzb3VyY2Upe1xuICAgIGZvcihsZXQga2V5IGluIHNvdXJjZSl7XG4gICAgICBsZXQgdmFsID0gc291cmNlW2tleV1cbiAgICAgIGxldCB0YXJnZXRWYWwgPSB0YXJnZXRba2V5XVxuICAgICAgaWYoaXNPYmplY3QodmFsKSAmJiB2YWxbU1RBVElDXSA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KHRhcmdldFZhbCkpe1xuICAgICAgICB0aGlzLmRvTXV0YWJsZU1lcmdlKHRhcmdldFZhbCwgdmFsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9uZU1lcmdlKHRhcmdldCwgc291cmNlKXtcbiAgICBsZXQgbWVyZ2VkID0gey4uLnRhcmdldCwgLi4uc291cmNlfVxuICAgIGZvcihsZXQga2V5IGluIG1lcmdlZCl7XG4gICAgICBsZXQgdmFsID0gc291cmNlW2tleV1cbiAgICAgIGxldCB0YXJnZXRWYWwgPSB0YXJnZXRba2V5XVxuICAgICAgaWYoaXNPYmplY3QodmFsKSAmJiB2YWxbU1RBVElDXSA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KHRhcmdldFZhbCkpe1xuICAgICAgICBtZXJnZWRba2V5XSA9IHRoaXMuY2xvbmVNZXJnZSh0YXJnZXRWYWwsIHZhbClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlZFxuICB9XG5cbiAgY29tcG9uZW50VG9TdHJpbmcoY2lkKXsgcmV0dXJuIHRoaXMucmVjdXJzaXZlQ0lEVG9TdHJpbmcodGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSwgY2lkKSB9XG5cbiAgcHJ1bmVDSURzKGNpZHMpe1xuICAgIGNpZHMuZm9yRWFjaChjaWQgPT4gZGVsZXRlIHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU11bY2lkXSlcbiAgfVxuXG4gIC8vIHByaXZhdGVcblxuICBnZXQoKXsgcmV0dXJuIHRoaXMucmVuZGVyZWQgfVxuXG4gIGlzTmV3RmluZ2VycHJpbnQoZGlmZiA9IHt9KXsgcmV0dXJuICEhZGlmZltTVEFUSUNdIH1cblxuICB0ZW1wbGF0ZVN0YXRpYyhwYXJ0LCB0ZW1wbGF0ZXMpe1xuICAgIGlmKHR5cGVvZiAocGFydCkgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZXNbcGFydF1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBhcnRcbiAgICB9XG4gIH1cblxuICB0b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpe1xuICAgIGlmKHJlbmRlcmVkW0RZTkFNSUNTXSl7IHJldHVybiB0aGlzLmNvbXByZWhlbnNpb25Ub0J1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpIH1cbiAgICBsZXQge1tTVEFUSUNdOiBzdGF0aWNzfSA9IHJlbmRlcmVkXG4gICAgc3RhdGljcyA9IHRoaXMudGVtcGxhdGVTdGF0aWMoc3RhdGljcywgdGVtcGxhdGVzKVxuXG4gICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzWzBdXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHN0YXRpY3MubGVuZ3RoOyBpKyspe1xuICAgICAgdGhpcy5keW5hbWljVG9CdWZmZXIocmVuZGVyZWRbaSAtIDFdLCB0ZW1wbGF0ZXMsIG91dHB1dClcbiAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1tpXVxuICAgIH1cbiAgfVxuXG4gIGNvbXByZWhlbnNpb25Ub0J1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpe1xuICAgIGxldCB7W0RZTkFNSUNTXTogZHluYW1pY3MsIFtTVEFUSUNdOiBzdGF0aWNzfSA9IHJlbmRlcmVkXG4gICAgc3RhdGljcyA9IHRoaXMudGVtcGxhdGVTdGF0aWMoc3RhdGljcywgdGVtcGxhdGVzKVxuICAgIGxldCBjb21wVGVtcGxhdGVzID0gdGVtcGxhdGVzIHx8IHJlbmRlcmVkW1RFTVBMQVRFU11cblxuICAgIGZvcihsZXQgZCA9IDA7IGQgPCBkeW5hbWljcy5sZW5ndGg7IGQrKyl7XG4gICAgICBsZXQgZHluYW1pYyA9IGR5bmFtaWNzW2RdXG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbMF1cbiAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBzdGF0aWNzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgdGhpcy5keW5hbWljVG9CdWZmZXIoZHluYW1pY1tpIC0gMV0sIGNvbXBUZW1wbGF0ZXMsIG91dHB1dClcbiAgICAgICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHluYW1pY1RvQnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCl7XG4gICAgaWYodHlwZW9mIChyZW5kZXJlZCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgb3V0cHV0LmJ1ZmZlciArPSB0aGlzLnJlY3Vyc2l2ZUNJRFRvU3RyaW5nKG91dHB1dC5jb21wb25lbnRzLCByZW5kZXJlZCwgb3V0cHV0Lm9ubHlDaWRzKVxuICAgIH0gZWxzZSBpZihpc09iamVjdChyZW5kZXJlZCkpe1xuICAgICAgdGhpcy50b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5idWZmZXIgKz0gcmVuZGVyZWRcbiAgICB9XG4gIH1cblxuICByZWN1cnNpdmVDSURUb1N0cmluZyhjb21wb25lbnRzLCBjaWQsIG9ubHlDaWRzKXtcbiAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1tjaWRdIHx8IGxvZ0Vycm9yKGBubyBjb21wb25lbnQgZm9yIENJRCAke2NpZH1gLCBjb21wb25lbnRzKVxuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRoaXMucmVjdXJzaXZlVG9TdHJpbmcoY29tcG9uZW50LCBjb21wb25lbnRzLCBvbmx5Q2lkcylcbiAgICBsZXQgY29udGFpbmVyID0gdGVtcGxhdGUuY29udGVudFxuICAgIGxldCBza2lwID0gb25seUNpZHMgJiYgIW9ubHlDaWRzLmhhcyhjaWQpXG5cbiAgICBsZXQgW2hhc0NoaWxkTm9kZXMsIGhhc0NoaWxkQ29tcG9uZW50c10gPVxuICAgICAgQXJyYXkuZnJvbShjb250YWluZXIuY2hpbGROb2RlcykucmVkdWNlKChbaGFzTm9kZXMsIGhhc0NvbXBvbmVudHNdLCBjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZihjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpe1xuICAgICAgICAgIGlmKGNoaWxkLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSl7XG4gICAgICAgICAgICByZXR1cm4gW2hhc05vZGVzLCB0cnVlXVxuICAgICAgICAgIH1cbiAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCwgY2lkKVxuICAgICAgICAgIGlmKCFjaGlsZC5pZCl7IGNoaWxkLmlkID0gYCR7dGhpcy5wYXJlbnRWaWV3SWQoKX0tJHtjaWR9LSR7aX1gIH1cbiAgICAgICAgICBpZihza2lwKXtcbiAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZShQSFhfU0tJUCwgXCJcIilcbiAgICAgICAgICAgIGNoaWxkLmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFt0cnVlLCBoYXNDb21wb25lbnRzXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKGNoaWxkLm5vZGVWYWx1ZS50cmltKCkgIT09IFwiXCIpe1xuICAgICAgICAgICAgbG9nRXJyb3IoXCJvbmx5IEhUTUwgZWxlbWVudCB0YWdzIGFyZSBhbGxvd2VkIGF0IHRoZSByb290IG9mIGNvbXBvbmVudHMuXFxuXFxuXCIgK1xuICAgICAgICAgICAgICBgZ290OiBcIiR7Y2hpbGQubm9kZVZhbHVlLnRyaW0oKX1cIlxcblxcbmAgK1xuICAgICAgICAgICAgICBcIndpdGhpbjpcXG5cIiwgdGVtcGxhdGUuaW5uZXJIVE1MLnRyaW0oKSlcbiAgICAgICAgICAgIGNoaWxkLnJlcGxhY2VXaXRoKHRoaXMuY3JlYXRlU3BhbihjaGlsZC5ub2RlVmFsdWUsIGNpZCkpXG4gICAgICAgICAgICByZXR1cm4gW3RydWUsIGhhc0NvbXBvbmVudHNdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpXG4gICAgICAgICAgICByZXR1cm4gW2hhc05vZGVzLCBoYXNDb21wb25lbnRzXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgW2ZhbHNlLCBmYWxzZV0pXG5cbiAgICBpZighaGFzQ2hpbGROb2RlcyAmJiAhaGFzQ2hpbGRDb21wb25lbnRzKXtcbiAgICAgIGxvZ0Vycm9yKFwiZXhwZWN0ZWQgYXQgbGVhc3Qgb25lIEhUTUwgZWxlbWVudCB0YWcgaW5zaWRlIGEgY29tcG9uZW50LCBidXQgdGhlIGNvbXBvbmVudCBpcyBlbXB0eTpcXG5cIixcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MLnRyaW0oKSlcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVNwYW4oXCJcIiwgY2lkKS5vdXRlckhUTUxcbiAgICB9IGVsc2UgaWYoIWhhc0NoaWxkTm9kZXMgJiYgaGFzQ2hpbGRDb21wb25lbnRzKXtcbiAgICAgIGxvZ0Vycm9yKFwiZXhwZWN0ZWQgYXQgbGVhc3Qgb25lIEhUTUwgZWxlbWVudCB0YWcgZGlyZWN0bHkgaW5zaWRlIGEgY29tcG9uZW50LCBidXQgb25seSBzdWJjb21wb25lbnRzIHdlcmUgZm91bmQuIEEgY29tcG9uZW50IG11c3QgcmVuZGVyIGF0IGxlYXN0IG9uZSBIVE1MIHRhZyBkaXJlY3RseSBpbnNpZGUgaXRzZWxmLlwiLFxuICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwudHJpbSgpKVxuICAgICAgcmV0dXJuIHRlbXBsYXRlLmlubmVySFRNTFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGUuaW5uZXJIVE1MXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlU3Bhbih0ZXh0LCBjaWQpe1xuICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzcGFuLmlubmVyVGV4dCA9IHRleHRcbiAgICBzcGFuLnNldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5ULCBjaWQpXG4gICAgcmV0dXJuIHNwYW5cbiAgfVxufVxuIiwgImxldCB2aWV3SG9va0lEID0gMVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0hvb2sge1xuICBzdGF0aWMgbWFrZUlEKCl7IHJldHVybiB2aWV3SG9va0lEKysgfVxuICBzdGF0aWMgZWxlbWVudElEKGVsKXsgcmV0dXJuIGVsLnBoeEhvb2tJZCB9XG5cbiAgY29uc3RydWN0b3IodmlldywgZWwsIGNhbGxiYWNrcyl7XG4gICAgdGhpcy5fX3ZpZXcgPSB2aWV3XG4gICAgdGhpcy5saXZlU29ja2V0ID0gdmlldy5saXZlU29ja2V0XG4gICAgdGhpcy5fX2NhbGxiYWNrcyA9IGNhbGxiYWNrc1xuICAgIHRoaXMuX19saXN0ZW5lcnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLl9faXNEaXNjb25uZWN0ZWQgPSBmYWxzZVxuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMuZWwucGh4SG9va0lkID0gdGhpcy5jb25zdHJ1Y3Rvci5tYWtlSUQoKVxuICAgIGZvcihsZXQga2V5IGluIHRoaXMuX19jYWxsYmFja3MpeyB0aGlzW2tleV0gPSB0aGlzLl9fY2FsbGJhY2tzW2tleV0gfVxuICB9XG5cbiAgX19tb3VudGVkKCl7IHRoaXMubW91bnRlZCAmJiB0aGlzLm1vdW50ZWQoKSB9XG4gIF9fdXBkYXRlZCgpeyB0aGlzLnVwZGF0ZWQgJiYgdGhpcy51cGRhdGVkKCkgfVxuICBfX2JlZm9yZVVwZGF0ZSgpeyB0aGlzLmJlZm9yZVVwZGF0ZSAmJiB0aGlzLmJlZm9yZVVwZGF0ZSgpIH1cbiAgX19kZXN0cm95ZWQoKXsgdGhpcy5kZXN0cm95ZWQgJiYgdGhpcy5kZXN0cm95ZWQoKSB9XG4gIF9fcmVjb25uZWN0ZWQoKXtcbiAgICBpZih0aGlzLl9faXNEaXNjb25uZWN0ZWQpe1xuICAgICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gZmFsc2VcbiAgICAgIHRoaXMucmVjb25uZWN0ZWQgJiYgdGhpcy5yZWNvbm5lY3RlZCgpXG4gICAgfVxuICB9XG4gIF9fZGlzY29ubmVjdGVkKCl7XG4gICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gdHJ1ZVxuICAgIHRoaXMuZGlzY29ubmVjdGVkICYmIHRoaXMuZGlzY29ubmVjdGVkKClcbiAgfVxuXG4gIHB1c2hFdmVudChldmVudCwgcGF5bG9hZCA9IHt9LCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy5wdXNoSG9va0V2ZW50KG51bGwsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KVxuICB9XG5cbiAgcHVzaEV2ZW50VG8ocGh4VGFyZ2V0LCBldmVudCwgcGF5bG9hZCA9IHt9LCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy53aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgcmV0dXJuIHZpZXcucHVzaEhvb2tFdmVudCh0YXJnZXRDdHgsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVFdmVudChldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCBjYWxsYmFja1JlZiA9IChjdXN0b21FdmVudCwgYnlwYXNzKSA9PiBieXBhc3MgPyBldmVudCA6IGNhbGxiYWNrKGN1c3RvbUV2ZW50LmRldGFpbClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgcGh4OiR7ZXZlbnR9YCwgY2FsbGJhY2tSZWYpXG4gICAgdGhpcy5fX2xpc3RlbmVycy5hZGQoY2FsbGJhY2tSZWYpXG4gICAgcmV0dXJuIGNhbGxiYWNrUmVmXG4gIH1cblxuICByZW1vdmVIYW5kbGVFdmVudChjYWxsYmFja1JlZil7XG4gICAgbGV0IGV2ZW50ID0gY2FsbGJhY2tSZWYobnVsbCwgdHJ1ZSlcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihgcGh4OiR7ZXZlbnR9YCwgY2FsbGJhY2tSZWYpXG4gICAgdGhpcy5fX2xpc3RlbmVycy5kZWxldGUoY2FsbGJhY2tSZWYpXG4gIH1cblxuICB1cGxvYWQobmFtZSwgZmlsZXMpe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy5kaXNwYXRjaFVwbG9hZHMobmFtZSwgZmlsZXMpXG4gIH1cblxuICB1cGxvYWRUbyhwaHhUYXJnZXQsIG5hbWUsIGZpbGVzKXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsIHZpZXcgPT4gdmlldy5kaXNwYXRjaFVwbG9hZHMobmFtZSwgZmlsZXMpKVxuICB9XG5cbiAgX19jbGVhbnVwX18oKXtcbiAgICB0aGlzLl9fbGlzdGVuZXJzLmZvckVhY2goY2FsbGJhY2tSZWYgPT4gdGhpcy5yZW1vdmVIYW5kbGVFdmVudChjYWxsYmFja1JlZikpXG4gIH1cbn1cbiIsICJpbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgQVJJQSBmcm9tIFwiLi9hcmlhXCJcblxubGV0IGZvY3VzU3RhY2sgPSBudWxsXG5cbmxldCBKUyA9IHtcbiAgZXhlYyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZGVmYXVsdHMpe1xuICAgIGxldCBbZGVmYXVsdEtpbmQsIGRlZmF1bHRBcmdzXSA9IGRlZmF1bHRzIHx8IFtudWxsLCB7fV1cbiAgICBsZXQgY29tbWFuZHMgPSBwaHhFdmVudC5jaGFyQXQoMCkgPT09IFwiW1wiID9cbiAgICAgIEpTT04ucGFyc2UocGh4RXZlbnQpIDogW1tkZWZhdWx0S2luZCwgZGVmYXVsdEFyZ3NdXVxuXG4gICAgY29tbWFuZHMuZm9yRWFjaCgoW2tpbmQsIGFyZ3NdKSA9PiB7XG4gICAgICBpZihraW5kID09PSBkZWZhdWx0S2luZCAmJiBkZWZhdWx0QXJncy5kYXRhKXtcbiAgICAgICAgYXJncy5kYXRhID0gT2JqZWN0LmFzc2lnbihhcmdzLmRhdGEgfHwge30sIGRlZmF1bHRBcmdzLmRhdGEpXG4gICAgICB9XG4gICAgICB0aGlzLmZpbHRlclRvRWxzKHNvdXJjZUVsLCBhcmdzKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgdGhpc1tgZXhlY18ke2tpbmR9YF0oZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCBhcmdzKVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIGlzVmlzaWJsZShlbCl7XG4gICAgcmV0dXJuICEhKGVsLm9mZnNldFdpZHRoIHx8IGVsLm9mZnNldEhlaWdodCB8fCBlbC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA+IDApXG4gIH0sXG5cbiAgLy8gcHJpdmF0ZVxuXG4gIC8vIGNvbW1hbmRzXG5cbiAgZXhlY19kaXNwYXRjaChldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHt0bywgZXZlbnQsIGRldGFpbCwgYnViYmxlc30pe1xuICAgIGRldGFpbCA9IGRldGFpbCB8fCB7fVxuICAgIGRldGFpbC5kaXNwYXRjaGVyID0gc291cmNlRWxcbiAgICBET00uZGlzcGF0Y2hFdmVudChlbCwgZXZlbnQsIHtkZXRhaWwsIGJ1YmJsZXN9KVxuICB9LFxuXG4gIGV4ZWNfcHVzaChldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIGFyZ3Mpe1xuICAgIGlmKCF2aWV3LmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfVxuXG4gICAgbGV0IHtldmVudCwgZGF0YSwgdGFyZ2V0LCBwYWdlX2xvYWRpbmcsIGxvYWRpbmcsIHZhbHVlLCBkaXNwYXRjaGVyfSA9IGFyZ3NcbiAgICBsZXQgcHVzaE9wdHMgPSB7bG9hZGluZywgdmFsdWUsIHRhcmdldCwgcGFnZV9sb2FkaW5nOiAhIXBhZ2VfbG9hZGluZ31cbiAgICBsZXQgdGFyZ2V0U3JjID0gZXZlbnRUeXBlID09PSBcImNoYW5nZVwiICYmIGRpc3BhdGNoZXIgPyBkaXNwYXRjaGVyIDogc291cmNlRWxcbiAgICBsZXQgcGh4VGFyZ2V0ID0gdGFyZ2V0IHx8IHRhcmdldFNyYy5nZXRBdHRyaWJ1dGUodmlldy5iaW5kaW5nKFwidGFyZ2V0XCIpKSB8fCB0YXJnZXRTcmNcbiAgICB2aWV3LndpdGhpblRhcmdldHMocGh4VGFyZ2V0LCAodGFyZ2V0VmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICBpZihldmVudFR5cGUgPT09IFwiY2hhbmdlXCIpe1xuICAgICAgICBsZXQge25ld0NpZCwgX3RhcmdldCwgY2FsbGJhY2t9ID0gYXJnc1xuICAgICAgICBfdGFyZ2V0ID0gX3RhcmdldCB8fCAoRE9NLmlzRm9ybUlucHV0KHNvdXJjZUVsKSA/IHNvdXJjZUVsLm5hbWUgOiB1bmRlZmluZWQpXG4gICAgICAgIGlmKF90YXJnZXQpeyBwdXNoT3B0cy5fdGFyZ2V0ID0gX3RhcmdldCB9XG4gICAgICAgIHRhcmdldFZpZXcucHVzaElucHV0KHNvdXJjZUVsLCB0YXJnZXRDdHgsIG5ld0NpZCwgZXZlbnQgfHwgcGh4RXZlbnQsIHB1c2hPcHRzLCBjYWxsYmFjaylcbiAgICAgIH0gZWxzZSBpZihldmVudFR5cGUgPT09IFwic3VibWl0XCIpe1xuICAgICAgICB0YXJnZXRWaWV3LnN1Ym1pdEZvcm0oc291cmNlRWwsIHRhcmdldEN0eCwgZXZlbnQgfHwgcGh4RXZlbnQsIHB1c2hPcHRzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0Vmlldy5wdXNoRXZlbnQoZXZlbnRUeXBlLCBzb3VyY2VFbCwgdGFyZ2V0Q3R4LCBldmVudCB8fCBwaHhFdmVudCwgZGF0YSwgcHVzaE9wdHMpXG4gICAgICB9XG4gICAgfSlcbiAgfSxcblxuICBleGVjX25hdmlnYXRlKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2hyZWYsIHJlcGxhY2V9KXtcbiAgICB2aWV3LmxpdmVTb2NrZXQuaGlzdG9yeVJlZGlyZWN0KGhyZWYsIHJlcGxhY2UgPyBcInJlcGxhY2VcIiA6IFwicHVzaFwiKVxuICB9LFxuXG4gIGV4ZWNfcGF0Y2goZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7aHJlZiwgcmVwbGFjZX0pe1xuICAgIHZpZXcubGl2ZVNvY2tldC5wdXNoSGlzdG9yeVBhdGNoKGhyZWYsIHJlcGxhY2UgPyBcInJlcGxhY2VcIiA6IFwicHVzaFwiLCBzb3VyY2VFbClcbiAgfSxcblxuICBleGVjX2ZvY3VzKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCl7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBBUklBLmF0dGVtcHRGb2N1cyhlbCkpXG4gIH0sXG5cbiAgZXhlY19mb2N1c19maXJzdChldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwpe1xuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gQVJJQS5mb2N1c0ZpcnN0SW50ZXJhY3RpdmUoZWwpIHx8IEFSSUEuZm9jdXNGaXJzdChlbCkpXG4gIH0sXG5cbiAgZXhlY19wdXNoX2ZvY3VzKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCl7XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBmb2N1c1N0YWNrID0gZWwgfHwgc291cmNlRWwpXG4gIH0sXG5cbiAgZXhlY19wb3BfZm9jdXMoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsKXtcbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmKGZvY3VzU3RhY2speyBmb2N1c1N0YWNrLmZvY3VzKCkgfVxuICAgICAgZm9jdXNTdGFjayA9IG51bGxcbiAgICB9KVxuICB9LFxuXG4gIGV4ZWNfYWRkX2NsYXNzKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lfSl7XG4gICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG5hbWVzLCBbXSwgdHJhbnNpdGlvbiwgdGltZSwgdmlldylcbiAgfSxcblxuICBleGVjX3JlbW92ZV9jbGFzcyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtuYW1lcywgdHJhbnNpdGlvbiwgdGltZX0pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgbmFtZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcpXG4gIH0sXG5cbiAgZXhlY190cmFuc2l0aW9uKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge3RpbWUsIHRyYW5zaXRpb259KXtcbiAgICBsZXQgW3RyYW5zaXRpb25fc3RhcnQsIHJ1bm5pbmcsIHRyYW5zaXRpb25fZW5kXSA9IHRyYW5zaXRpb25cbiAgICBsZXQgb25TdGFydCA9ICgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uX3N0YXJ0LmNvbmNhdChydW5uaW5nKSwgW10pXG4gICAgbGV0IG9uRG9uZSA9ICgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uX2VuZCwgdHJhbnNpdGlvbl9zdGFydC5jb25jYXQocnVubmluZykpXG4gICAgdmlldy50cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSlcbiAgfSxcblxuICBleGVjX3RvZ2dsZShldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtkaXNwbGF5LCBpbnMsIG91dHMsIHRpbWV9KXtcbiAgICB0aGlzLnRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCBpbnMsIG91dHMsIHRpbWUpXG4gIH0sXG5cbiAgZXhlY19zaG93KGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2Rpc3BsYXksIHRyYW5zaXRpb24sIHRpbWV9KXtcbiAgICB0aGlzLnNob3coZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSlcbiAgfSxcblxuICBleGVjX2hpZGUoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7ZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZX0pe1xuICAgIHRoaXMuaGlkZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lKVxuICB9LFxuXG4gIGV4ZWNfc2V0X2F0dHIoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7YXR0cjogW2F0dHIsIHZhbF19KXtcbiAgICB0aGlzLnNldE9yUmVtb3ZlQXR0cnMoZWwsIFtbYXR0ciwgdmFsXV0sIFtdKVxuICB9LFxuXG4gIGV4ZWNfcmVtb3ZlX2F0dHIoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7YXR0cn0pe1xuICAgIHRoaXMuc2V0T3JSZW1vdmVBdHRycyhlbCwgW10sIFthdHRyXSlcbiAgfSxcblxuICAvLyB1dGlscyBmb3IgY29tbWFuZHNcblxuICBzaG93KGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIHRyYW5zaXRpb24sIHRpbWUpe1xuICAgIGlmKCF0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgdGhpcy50b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgbnVsbCwgdGltZSlcbiAgICB9XG4gIH0sXG5cbiAgaGlkZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lKXtcbiAgICBpZih0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgdGhpcy50b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgbnVsbCwgdHJhbnNpdGlvbiwgdGltZSlcbiAgICB9XG4gIH0sXG5cbiAgdG9nZ2xlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIGlucywgb3V0cywgdGltZSl7XG4gICAgbGV0IFtpbkNsYXNzZXMsIGluU3RhcnRDbGFzc2VzLCBpbkVuZENsYXNzZXNdID0gaW5zIHx8IFtbXSwgW10sIFtdXVxuICAgIGxldCBbb3V0Q2xhc3Nlcywgb3V0U3RhcnRDbGFzc2VzLCBvdXRFbmRDbGFzc2VzXSA9IG91dHMgfHwgW1tdLCBbXSwgW11dXG4gICAgaWYoaW5DbGFzc2VzLmxlbmd0aCA+IDAgfHwgb3V0Q2xhc3Nlcy5sZW5ndGggPiAwKXtcbiAgICAgIGlmKHRoaXMuaXNWaXNpYmxlKGVsKSl7XG4gICAgICAgIGxldCBvblN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBvdXRTdGFydENsYXNzZXMsIGluQ2xhc3Nlcy5jb25jYXQoaW5TdGFydENsYXNzZXMpLmNvbmNhdChpbkVuZENsYXNzZXMpKVxuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG91dENsYXNzZXMsIFtdKVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgb3V0RW5kQ2xhc3Nlcywgb3V0U3RhcnRDbGFzc2VzKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtc3RhcnRcIikpXG4gICAgICAgIHZpZXcudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBvdXRDbGFzc2VzLmNvbmNhdChvdXRFbmRDbGFzc2VzKSlcbiAgICAgICAgICBET00ucHV0U3RpY2t5KGVsLCBcInRvZ2dsZVwiLCBjdXJyZW50RWwgPT4gY3VycmVudEVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIilcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpoaWRlLWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGV2ZW50VHlwZSA9PT0gXCJyZW1vdmVcIil7IHJldHVybiB9XG4gICAgICAgIGxldCBvblN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBpblN0YXJ0Q2xhc3Nlcywgb3V0Q2xhc3Nlcy5jb25jYXQob3V0U3RhcnRDbGFzc2VzKS5jb25jYXQob3V0RW5kQ2xhc3NlcykpXG4gICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gKGRpc3BsYXkgfHwgXCJibG9ja1wiKSlcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBpbkNsYXNzZXMsIFtdKVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgaW5FbmRDbGFzc2VzLCBpblN0YXJ0Q2xhc3NlcykpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LXN0YXJ0XCIpKVxuICAgICAgICB2aWV3LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgaW5DbGFzc2VzLmNvbmNhdChpbkVuZENsYXNzZXMpKVxuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OnNob3ctZW5kXCIpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZih0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpoaWRlLXN0YXJ0XCIpKVxuICAgICAgICAgIERPTS5wdXRTdGlja3koZWwsIFwidG9nZ2xlXCIsIGN1cnJlbnRFbCA9PiBjdXJyZW50RWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKVxuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtZW5kXCIpKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1zdGFydFwiKSlcbiAgICAgICAgICBET00ucHV0U3RpY2t5KGVsLCBcInRvZ2dsZVwiLCBjdXJyZW50RWwgPT4gY3VycmVudEVsLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5IHx8IFwiYmxvY2tcIilcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBhZGRzLCByZW1vdmVzLCB0cmFuc2l0aW9uLCB0aW1lLCB2aWV3KXtcbiAgICBsZXQgW3RyYW5zaXRpb25fcnVuLCB0cmFuc2l0aW9uX3N0YXJ0LCB0cmFuc2l0aW9uX2VuZF0gPSB0cmFuc2l0aW9uIHx8IFtbXSwgW10sIFtdXVxuICAgIGlmKHRyYW5zaXRpb25fcnVuLmxlbmd0aCA+IDApe1xuICAgICAgbGV0IG9uU3RhcnQgPSAoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgdHJhbnNpdGlvbl9zdGFydC5jb25jYXQodHJhbnNpdGlvbl9ydW4pLCBbXSlcbiAgICAgIGxldCBvbkRvbmUgPSAoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgYWRkcy5jb25jYXQodHJhbnNpdGlvbl9lbmQpLCByZW1vdmVzLmNvbmNhdCh0cmFuc2l0aW9uX3J1bikuY29uY2F0KHRyYW5zaXRpb25fc3RhcnQpKVxuICAgICAgcmV0dXJuIHZpZXcudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gICAgfVxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgbGV0IFtwcmV2QWRkcywgcHJldlJlbW92ZXNdID0gRE9NLmdldFN0aWNreShlbCwgXCJjbGFzc2VzXCIsIFtbXSwgW11dKVxuICAgICAgbGV0IGtlZXBBZGRzID0gYWRkcy5maWx0ZXIobmFtZSA9PiBwcmV2QWRkcy5pbmRleE9mKG5hbWUpIDwgMCAmJiAhZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKVxuICAgICAgbGV0IGtlZXBSZW1vdmVzID0gcmVtb3Zlcy5maWx0ZXIobmFtZSA9PiBwcmV2UmVtb3Zlcy5pbmRleE9mKG5hbWUpIDwgMCAmJiBlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpXG4gICAgICBsZXQgbmV3QWRkcyA9IHByZXZBZGRzLmZpbHRlcihuYW1lID0+IHJlbW92ZXMuaW5kZXhPZihuYW1lKSA8IDApLmNvbmNhdChrZWVwQWRkcylcbiAgICAgIGxldCBuZXdSZW1vdmVzID0gcHJldlJlbW92ZXMuZmlsdGVyKG5hbWUgPT4gYWRkcy5pbmRleE9mKG5hbWUpIDwgMCkuY29uY2F0KGtlZXBSZW1vdmVzKVxuXG4gICAgICBET00ucHV0U3RpY2t5KGVsLCBcImNsYXNzZXNcIiwgY3VycmVudEVsID0+IHtcbiAgICAgICAgY3VycmVudEVsLmNsYXNzTGlzdC5yZW1vdmUoLi4ubmV3UmVtb3ZlcylcbiAgICAgICAgY3VycmVudEVsLmNsYXNzTGlzdC5hZGQoLi4ubmV3QWRkcylcbiAgICAgICAgcmV0dXJuIFtuZXdBZGRzLCBuZXdSZW1vdmVzXVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIHNldE9yUmVtb3ZlQXR0cnMoZWwsIHNldHMsIHJlbW92ZXMpe1xuICAgIGxldCBbcHJldlNldHMsIHByZXZSZW1vdmVzXSA9IERPTS5nZXRTdGlja3koZWwsIFwiYXR0cnNcIiwgW1tdLCBbXV0pXG5cbiAgICBsZXQgYWx0ZXJlZEF0dHJzID0gc2V0cy5tYXAoKFthdHRyLCBfdmFsXSkgPT4gYXR0cikuY29uY2F0KHJlbW92ZXMpO1xuICAgIGxldCBuZXdTZXRzID0gcHJldlNldHMuZmlsdGVyKChbYXR0ciwgX3ZhbF0pID0+ICFhbHRlcmVkQXR0cnMuaW5jbHVkZXMoYXR0cikpLmNvbmNhdChzZXRzKTtcbiAgICBsZXQgbmV3UmVtb3ZlcyA9IHByZXZSZW1vdmVzLmZpbHRlcigoYXR0cikgPT4gIWFsdGVyZWRBdHRycy5pbmNsdWRlcyhhdHRyKSkuY29uY2F0KHJlbW92ZXMpO1xuXG4gICAgRE9NLnB1dFN0aWNreShlbCwgXCJhdHRyc1wiLCBjdXJyZW50RWwgPT4ge1xuICAgICAgbmV3UmVtb3Zlcy5mb3JFYWNoKGF0dHIgPT4gY3VycmVudEVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyKSlcbiAgICAgIG5ld1NldHMuZm9yRWFjaCgoW2F0dHIsIHZhbF0pID0+IGN1cnJlbnRFbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsKSlcbiAgICAgIHJldHVybiBbbmV3U2V0cywgbmV3UmVtb3Zlc11cbiAgICB9KVxuICB9LFxuXG4gIGhhc0FsbENsYXNzZXMoZWwsIGNsYXNzZXMpeyByZXR1cm4gY2xhc3Nlcy5ldmVyeShuYW1lID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSkgfSxcblxuICBpc1RvZ2dsZWRPdXQoZWwsIG91dENsYXNzZXMpe1xuICAgIHJldHVybiAhdGhpcy5pc1Zpc2libGUoZWwpIHx8IHRoaXMuaGFzQWxsQ2xhc3NlcyhlbCwgb3V0Q2xhc3NlcylcbiAgfSxcblxuICBmaWx0ZXJUb0Vscyhzb3VyY2VFbCwge3RvfSl7XG4gICAgcmV0dXJuIHRvID8gRE9NLmFsbChkb2N1bWVudCwgdG8pIDogW3NvdXJjZUVsXVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpTXG4iLCAiaW1wb3J0IHtcbiAgQkVGT1JFX1VOTE9BRF9MT0FERVJfVElNRU9VVCxcbiAgQ0hFQ0tBQkxFX0lOUFVUUyxcbiAgQ09OU0VDVVRJVkVfUkVMT0FEUyxcbiAgUEhYX0FVVE9fUkVDT1ZFUixcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX0NPTk5FQ1RFRF9DTEFTUyxcbiAgUEhYX0RJU0FCTEVfV0lUSCxcbiAgUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFLFxuICBQSFhfRElTQUJMRUQsXG4gIFBIWF9ESVNDT05ORUNURURfQ0xBU1MsXG4gIFBIWF9FVkVOVF9DTEFTU0VTLFxuICBQSFhfRVJST1JfQ0xBU1MsXG4gIFBIWF9GRUVEQkFDS19GT1IsXG4gIFBIWF9IQVNfU1VCTUlUVEVELFxuICBQSFhfSE9PSyxcbiAgUEhYX1BBR0VfTE9BRElORyxcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1BST0dSRVNTLFxuICBQSFhfUkVBRE9OTFksXG4gIFBIWF9SRUYsXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9UUkFDS19TVEFUSUMsXG4gIFBIWF9UUkFDS19VUExPQURTLFxuICBQSFhfVVBEQVRFLFxuICBQSFhfVVBMT0FEX1JFRixcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBIWF9NQUlOLFxuICBQSFhfTU9VTlRFRCxcbiAgUFVTSF9USU1FT1VULFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjbG9uZSxcbiAgY2xvc2VzdFBoeEJpbmRpbmcsXG4gIGlzRW1wdHksXG4gIGlzRXF1YWxPYmosXG4gIGxvZ0Vycm9yLFxuICBtYXliZSxcbiAgaXNDaWQsXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEJyb3dzZXIgZnJvbSBcIi4vYnJvd3NlclwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgRE9NUGF0Y2ggZnJvbSBcIi4vZG9tX3BhdGNoXCJcbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5pbXBvcnQgUmVuZGVyZWQgZnJvbSBcIi4vcmVuZGVyZWRcIlxuaW1wb3J0IFZpZXdIb29rIGZyb20gXCIuL3ZpZXdfaG9va1wiXG5pbXBvcnQgSlMgZnJvbSBcIi4vanNcIlxuXG5sZXQgc2VyaWFsaXplRm9ybSA9IChmb3JtLCBtZXRhLCBvbmx5TmFtZXMgPSBbXSkgPT4ge1xuICBsZXQgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZm9ybSlcbiAgbGV0IHRvUmVtb3ZlID0gW11cblxuICBmb3JtRGF0YS5mb3JFYWNoKCh2YWwsIGtleSwgX2luZGV4KSA9PiB7XG4gICAgaWYodmFsIGluc3RhbmNlb2YgRmlsZSl7IHRvUmVtb3ZlLnB1c2goa2V5KSB9XG4gIH0pXG5cbiAgLy8gQ2xlYW51cCBhZnRlciBidWlsZGluZyBmaWxlRGF0YVxuICB0b1JlbW92ZS5mb3JFYWNoKGtleSA9PiBmb3JtRGF0YS5kZWxldGUoa2V5KSlcblxuICBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcygpXG4gIGZvcihsZXQgW2tleSwgdmFsXSBvZiBmb3JtRGF0YS5lbnRyaWVzKCkpe1xuICAgIGlmKG9ubHlOYW1lcy5sZW5ndGggPT09IDAgfHwgb25seU5hbWVzLmluZGV4T2Yoa2V5KSA+PSAwKXtcbiAgICAgIHBhcmFtcy5hcHBlbmQoa2V5LCB2YWwpXG4gICAgfVxuICB9XG4gIGZvcihsZXQgbWV0YUtleSBpbiBtZXRhKXsgcGFyYW1zLmFwcGVuZChtZXRhS2V5LCBtZXRhW21ldGFLZXldKSB9XG5cbiAgcmV0dXJuIHBhcmFtcy50b1N0cmluZygpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXcge1xuICBjb25zdHJ1Y3RvcihlbCwgbGl2ZVNvY2tldCwgcGFyZW50VmlldywgZmxhc2gsIGxpdmVSZWZlcmVyKXtcbiAgICB0aGlzLmlzRGVhZCA9IGZhbHNlXG4gICAgdGhpcy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuICAgIHRoaXMuZmxhc2ggPSBmbGFzaFxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Vmlld1xuICAgIHRoaXMucm9vdCA9IHBhcmVudFZpZXcgPyBwYXJlbnRWaWV3LnJvb3QgOiB0aGlzXG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5pZCA9IHRoaXMuZWwuaWRcbiAgICB0aGlzLnJlZiA9IDBcbiAgICB0aGlzLmNoaWxkSm9pbnMgPSAwXG4gICAgdGhpcy5sb2FkZXJUaW1lciA9IG51bGxcbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5wcnVuaW5nQ0lEcyA9IFtdXG4gICAgdGhpcy5yZWRpcmVjdCA9IGZhbHNlXG4gICAgdGhpcy5ocmVmID0gbnVsbFxuICAgIHRoaXMuam9pbkNvdW50ID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5qb2luQ291bnQgLSAxIDogMFxuICAgIHRoaXMuam9pblBlbmRpbmcgPSB0cnVlXG4gICAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZVxuICAgIHRoaXMuam9pbkNhbGxiYWNrID0gZnVuY3Rpb24ob25Eb25lKXsgb25Eb25lICYmIG9uRG9uZSgpIH1cbiAgICB0aGlzLnN0b3BDYWxsYmFjayA9IGZ1bmN0aW9uKCl7IH1cbiAgICB0aGlzLnBlbmRpbmdKb2luT3BzID0gdGhpcy5wYXJlbnQgPyBudWxsIDogW11cbiAgICB0aGlzLnZpZXdIb29rcyA9IHt9XG4gICAgdGhpcy51cGxvYWRlcnMgPSB7fVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSBbXVxuICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLnBhcmVudCA/IG51bGwgOiB7fVxuICAgIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSA9IHt9XG4gICAgdGhpcy5jaGFubmVsID0gdGhpcy5saXZlU29ja2V0LmNoYW5uZWwoYGx2OiR7dGhpcy5pZH1gLCAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZWRpcmVjdDogdGhpcy5yZWRpcmVjdCA/IHRoaXMuaHJlZiA6IHVuZGVmaW5lZCxcbiAgICAgICAgdXJsOiB0aGlzLnJlZGlyZWN0ID8gdW5kZWZpbmVkIDogdGhpcy5ocmVmIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgcGFyYW1zOiB0aGlzLmNvbm5lY3RQYXJhbXMobGl2ZVJlZmVyZXIpLFxuICAgICAgICBzZXNzaW9uOiB0aGlzLmdldFNlc3Npb24oKSxcbiAgICAgICAgc3RhdGljOiB0aGlzLmdldFN0YXRpYygpLFxuICAgICAgICBmbGFzaDogdGhpcy5mbGFzaCxcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2V0SHJlZihocmVmKXsgdGhpcy5ocmVmID0gaHJlZiB9XG5cbiAgc2V0UmVkaXJlY3QoaHJlZil7XG4gICAgdGhpcy5yZWRpcmVjdCA9IHRydWVcbiAgICB0aGlzLmhyZWYgPSBocmVmXG4gIH1cblxuICBpc01haW4oKXsgcmV0dXJuIHRoaXMuZWwuaGFzQXR0cmlidXRlKFBIWF9NQUlOKSB9XG5cbiAgY29ubmVjdFBhcmFtcyhsaXZlUmVmZXJlcil7XG4gICAgbGV0IHBhcmFtcyA9IHRoaXMubGl2ZVNvY2tldC5wYXJhbXModGhpcy5lbClcbiAgICBsZXQgbWFuaWZlc3QgPVxuICAgICAgRE9NLmFsbChkb2N1bWVudCwgYFske3RoaXMuYmluZGluZyhQSFhfVFJBQ0tfU1RBVElDKX1dYClcbiAgICAgICAgLm1hcChub2RlID0+IG5vZGUuc3JjIHx8IG5vZGUuaHJlZikuZmlsdGVyKHVybCA9PiB0eXBlb2YgKHVybCkgPT09IFwic3RyaW5nXCIpXG5cbiAgICBpZihtYW5pZmVzdC5sZW5ndGggPiAwKXsgcGFyYW1zW1wiX3RyYWNrX3N0YXRpY1wiXSA9IG1hbmlmZXN0IH1cbiAgICBwYXJhbXNbXCJfbW91bnRzXCJdID0gdGhpcy5qb2luQ291bnRcbiAgICBwYXJhbXNbXCJfbGl2ZV9yZWZlcmVyXCJdID0gbGl2ZVJlZmVyZXJcblxuICAgIHJldHVybiBwYXJhbXNcbiAgfVxuXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLmNoYW5uZWwuY2FuUHVzaCgpIH1cblxuICBnZXRTZXNzaW9uKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfU0VTU0lPTikgfVxuXG4gIGdldFN0YXRpYygpe1xuICAgIGxldCB2YWwgPSB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfU1RBVElDKVxuICAgIHJldHVybiB2YWwgPT09IFwiXCIgPyBudWxsIDogdmFsXG4gIH1cblxuICBkZXN0cm95KGNhbGxiYWNrID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHRoaXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWVcbiAgICBkZWxldGUgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdXG4gICAgaWYodGhpcy5wYXJlbnQpeyBkZWxldGUgdGhpcy5yb290LmNoaWxkcmVuW3RoaXMucGFyZW50LmlkXVt0aGlzLmlkXSB9XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgbGV0IG9uRmluaXNoZWQgPSAoKSA9PiB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICBmb3IobGV0IGlkIGluIHRoaXMudmlld0hvb2tzKXtcbiAgICAgICAgdGhpcy5kZXN0cm95SG9vayh0aGlzLnZpZXdIb29rc1tpZF0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgRE9NLm1hcmtQaHhDaGlsZERlc3Ryb3llZCh0aGlzLmVsKVxuXG4gICAgdGhpcy5sb2coXCJkZXN0cm95ZWRcIiwgKCkgPT4gW1widGhlIGNoaWxkIGhhcyBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgcGFyZW50XCJdKVxuICAgIHRoaXMuY2hhbm5lbC5sZWF2ZSgpXG4gICAgICAucmVjZWl2ZShcIm9rXCIsIG9uRmluaXNoZWQpXG4gICAgICAucmVjZWl2ZShcImVycm9yXCIsIG9uRmluaXNoZWQpXG4gICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgb25GaW5pc2hlZClcbiAgfVxuXG4gIHNldENvbnRhaW5lckNsYXNzZXMoLi4uY2xhc3Nlcyl7XG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgUEhYX0NPTk5FQ1RFRF9DTEFTUyxcbiAgICAgIFBIWF9ESVNDT05ORUNURURfQ0xBU1MsXG4gICAgICBQSFhfRVJST1JfQ0xBU1NcbiAgICApXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXMpXG4gIH1cblxuICBzaG93TG9hZGVyKHRpbWVvdXQpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmxvYWRlclRpbWVyKVxuICAgIGlmKHRpbWVvdXQpe1xuICAgICAgdGhpcy5sb2FkZXJUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zaG93TG9hZGVyKCksIHRpbWVvdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3MpeyB0aGlzLnZpZXdIb29rc1tpZF0uX19kaXNjb25uZWN0ZWQoKSB9XG4gICAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0RJU0NPTk5FQ1RFRF9DTEFTUylcbiAgICB9XG4gIH1cblxuICBleGVjQWxsKGJpbmRpbmcpe1xuICAgIERPTS5hbGwodGhpcy5lbCwgYFske2JpbmRpbmd9XWAsIGVsID0+IHRoaXMubGl2ZVNvY2tldC5leGVjSlMoZWwsIGVsLmdldEF0dHJpYnV0ZShiaW5kaW5nKSkpXG4gIH1cblxuICBoaWRlTG9hZGVyKCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgdGhpcy5zZXRDb250YWluZXJDbGFzc2VzKFBIWF9DT05ORUNURURfQ0xBU1MpXG4gICAgdGhpcy5leGVjQWxsKHRoaXMuYmluZGluZyhcImNvbm5lY3RlZFwiKSlcbiAgfVxuXG4gIHRyaWdnZXJSZWNvbm5lY3RlZCgpe1xuICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3MpeyB0aGlzLnZpZXdIb29rc1tpZF0uX19yZWNvbm5lY3RlZCgpIH1cbiAgfVxuXG4gIGxvZyhraW5kLCBtc2dDYWxsYmFjayl7XG4gICAgdGhpcy5saXZlU29ja2V0LmxvZyh0aGlzLCBraW5kLCBtc2dDYWxsYmFjaylcbiAgfVxuXG4gIHRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lID0gZnVuY3Rpb24oKXt9KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gIH1cblxuICB3aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgY2FsbGJhY2spe1xuICAgIGlmKHBoeFRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IHBoeFRhcmdldCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpe1xuICAgICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5vd25lcihwaHhUYXJnZXQsIHZpZXcgPT4gY2FsbGJhY2sodmlldywgcGh4VGFyZ2V0KSlcbiAgICB9XG5cbiAgICBpZihpc0NpZChwaHhUYXJnZXQpKXtcbiAgICAgIGxldCB0YXJnZXRzID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmVsLCBwaHhUYXJnZXQpXG4gICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGxvZ0Vycm9yKGBubyBjb21wb25lbnQgZm91bmQgbWF0Y2hpbmcgcGh4LXRhcmdldCBvZiAke3BoeFRhcmdldH1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcywgcGFyc2VJbnQocGh4VGFyZ2V0KSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRhcmdldHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGh4VGFyZ2V0KSlcbiAgICAgIGlmKHRhcmdldHMubGVuZ3RoID09PSAwKXsgbG9nRXJyb3IoYG5vdGhpbmcgZm91bmQgbWF0Y2hpbmcgdGhlIHBoeC10YXJnZXQgc2VsZWN0b3IgXCIke3BoeFRhcmdldH1cImApIH1cbiAgICAgIHRhcmdldHMuZm9yRWFjaCh0YXJnZXQgPT4gdGhpcy5saXZlU29ja2V0Lm93bmVyKHRhcmdldCwgdmlldyA9PiBjYWxsYmFjayh2aWV3LCB0YXJnZXQpKSlcbiAgICB9XG4gIH1cblxuICBhcHBseURpZmYodHlwZSwgcmF3RGlmZiwgY2FsbGJhY2spe1xuICAgIHRoaXMubG9nKHR5cGUsICgpID0+IFtcIlwiLCBjbG9uZShyYXdEaWZmKV0pXG4gICAgbGV0IHtkaWZmLCByZXBseSwgZXZlbnRzLCB0aXRsZX0gPSBSZW5kZXJlZC5leHRyYWN0KHJhd0RpZmYpXG4gICAgY2FsbGJhY2soe2RpZmYsIHJlcGx5LCBldmVudHN9KVxuICAgIGlmKHRpdGxlKXsgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBET00ucHV0VGl0bGUodGl0bGUpKSB9XG4gIH1cblxuICBvbkpvaW4ocmVzcCl7XG4gICAgbGV0IHtyZW5kZXJlZCwgY29udGFpbmVyfSA9IHJlc3BcbiAgICBpZihjb250YWluZXIpe1xuICAgICAgbGV0IFt0YWcsIGF0dHJzXSA9IGNvbnRhaW5lclxuICAgICAgdGhpcy5lbCA9IERPTS5yZXBsYWNlUm9vdENvbnRhaW5lcih0aGlzLmVsLCB0YWcsIGF0dHJzKVxuICAgIH1cbiAgICB0aGlzLmNoaWxkSm9pbnMgPSAwXG4gICAgdGhpcy5qb2luUGVuZGluZyA9IHRydWVcbiAgICB0aGlzLmZsYXNoID0gbnVsbFxuXG4gICAgQnJvd3Nlci5kcm9wTG9jYWwodGhpcy5saXZlU29ja2V0LmxvY2FsU3RvcmFnZSwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLCBDT05TRUNVVElWRV9SRUxPQURTKVxuICAgIHRoaXMuYXBwbHlEaWZmKFwibW91bnRcIiwgcmVuZGVyZWQsICh7ZGlmZiwgZXZlbnRzfSkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlZCA9IG5ldyBSZW5kZXJlZCh0aGlzLmlkLCBkaWZmKVxuICAgICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlckNvbnRhaW5lcihudWxsLCBcImpvaW5cIilcbiAgICAgIHRoaXMuZHJvcFBlbmRpbmdSZWZzKClcbiAgICAgIGxldCBmb3JtcyA9IHRoaXMuZm9ybXNGb3JSZWNvdmVyeShodG1sKVxuICAgICAgdGhpcy5qb2luQ291bnQrK1xuXG4gICAgICBpZihmb3Jtcy5sZW5ndGggPiAwKXtcbiAgICAgICAgZm9ybXMuZm9yRWFjaCgoW2Zvcm0sIG5ld0Zvcm0sIG5ld0NpZF0sIGkpID0+IHtcbiAgICAgICAgICB0aGlzLnB1c2hGb3JtUmVjb3ZlcnkoZm9ybSwgbmV3Q2lkLCByZXNwID0+IHtcbiAgICAgICAgICAgIGlmKGkgPT09IGZvcm1zLmxlbmd0aCAtIDEpe1xuICAgICAgICAgICAgICB0aGlzLm9uSm9pbkNvbXBsZXRlKHJlc3AsIGh0bWwsIGV2ZW50cylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vbkpvaW5Db21wbGV0ZShyZXNwLCBodG1sLCBldmVudHMpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGRyb3BQZW5kaW5nUmVmcygpe1xuICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHtQSFhfUkVGX1NSQ309XCIke3RoaXMuaWR9XCJdWyR7UEhYX1JFRn1dYCwgZWwgPT4ge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUYpXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpXG4gICAgfSlcbiAgfVxuXG4gIG9uSm9pbkNvbXBsZXRlKHtsaXZlX3BhdGNofSwgaHRtbCwgZXZlbnRzKXtcbiAgICAvLyBJbiBvcmRlciB0byBwcm92aWRlIGEgYmV0dGVyIGV4cGVyaWVuY2UsIHdlIHdhbnQgdG8gam9pblxuICAgIC8vIGFsbCBMaXZlVmlld3MgZmlyc3QgYW5kIG9ubHkgdGhlbiBhcHBseSB0aGVpciBwYXRjaGVzLlxuICAgIGlmKHRoaXMuam9pbkNvdW50ID4gMSB8fCAodGhpcy5wYXJlbnQgJiYgIXRoaXMucGFyZW50LmlzSm9pblBlbmRpbmcoKSkpe1xuICAgICAgcmV0dXJuIHRoaXMuYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgZXZlbnRzKVxuICAgIH1cblxuICAgIC8vIE9uZSBkb3duc2lkZSBvZiB0aGlzIGFwcHJvYWNoIGlzIHRoYXQgd2UgbmVlZCB0byBmaW5kIHBoeENoaWxkcmVuXG4gICAgLy8gaW4gdGhlIGh0bWwgZnJhZ21lbnQsIGluc3RlYWQgb2YgZGlyZWN0bHkgb24gdGhlIERPTS4gVGhlIGZyYWdtZW50XG4gICAgLy8gYWxzbyBkb2VzIG5vdCBpbmNsdWRlIFBIWF9TVEFUSUMsIHNvIHdlIG5lZWQgdG8gY29weSBpdCBvdmVyIGZyb21cbiAgICAvLyB0aGUgRE9NLlxuICAgIGxldCBuZXdDaGlsZHJlbiA9IERPTS5maW5kUGh4Q2hpbGRyZW5JbkZyYWdtZW50KGh0bWwsIHRoaXMuaWQpLmZpbHRlcih0b0VsID0+IHtcbiAgICAgIGxldCBmcm9tRWwgPSB0b0VsLmlkICYmIHRoaXMuZWwucXVlcnlTZWxlY3RvcihgW2lkPVwiJHt0b0VsLmlkfVwiXWApXG4gICAgICBsZXQgcGh4U3RhdGljID0gZnJvbUVsICYmIGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQylcbiAgICAgIGlmKHBoeFN0YXRpYyl7IHRvRWwuc2V0QXR0cmlidXRlKFBIWF9TVEFUSUMsIHBoeFN0YXRpYykgfVxuICAgICAgcmV0dXJuIHRoaXMuam9pbkNoaWxkKHRvRWwpXG4gICAgfSlcblxuICAgIGlmKG5ld0NoaWxkcmVuLmxlbmd0aCA9PT0gMCl7XG4gICAgICBpZih0aGlzLnBhcmVudCl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIGV2ZW50cyldKVxuICAgICAgICB0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKClcbiAgICAgICAgdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBldmVudHMpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIGV2ZW50cyldKVxuICAgIH1cbiAgfVxuXG4gIGF0dGFjaFRydWVEb2NFbCgpe1xuICAgIHRoaXMuZWwgPSBET00uYnlJZCh0aGlzLmlkKVxuICAgIHRoaXMuZWwuc2V0QXR0cmlidXRlKFBIWF9ST09UX0lELCB0aGlzLnJvb3QuaWQpXG4gIH1cblxuICBleGVjTmV3TW91bnRlZCgpe1xuICAgIERPTS5hbGwodGhpcy5lbCwgYFske3RoaXMuYmluZGluZyhQSFhfSE9PSyl9XSwgW2RhdGEtcGh4LSR7UEhYX0hPT0t9XWAsIGhvb2tFbCA9PiB7XG4gICAgICB0aGlzLm1heWJlQWRkTmV3SG9vayhob29rRWwpXG4gICAgfSlcbiAgICBET00uYWxsKHRoaXMuZWwsIGBbJHt0aGlzLmJpbmRpbmcoUEhYX01PVU5URUQpfV1gLCBlbCA9PiB0aGlzLm1heWJlTW91bnRlZChlbCkpXG4gIH1cblxuICBhcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBldmVudHMpe1xuICAgIHRoaXMuYXR0YWNoVHJ1ZURvY0VsKClcbiAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgbnVsbClcbiAgICBwYXRjaC5tYXJrUHJ1bmFibGVDb250ZW50Rm9yUmVtb3ZhbCgpXG4gICAgdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIGZhbHNlKVxuICAgIHRoaXMuam9pbk5ld0NoaWxkcmVuKClcbiAgICB0aGlzLmV4ZWNOZXdNb3VudGVkKClcblxuICAgIHRoaXMuam9pblBlbmRpbmcgPSBmYWxzZVxuICAgIHRoaXMubGl2ZVNvY2tldC5kaXNwYXRjaEV2ZW50cyhldmVudHMpXG4gICAgdGhpcy5hcHBseVBlbmRpbmdVcGRhdGVzKClcblxuICAgIGlmKGxpdmVfcGF0Y2gpe1xuICAgICAgbGV0IHtraW5kLCB0b30gPSBsaXZlX3BhdGNoXG4gICAgICB0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVBhdGNoKHRvLCBraW5kKVxuICAgIH1cbiAgICB0aGlzLmhpZGVMb2FkZXIoKVxuICAgIGlmKHRoaXMuam9pbkNvdW50ID4gMSl7IHRoaXMudHJpZ2dlclJlY29ubmVjdGVkKCkgfVxuICAgIHRoaXMuc3RvcENhbGxiYWNrKClcbiAgfVxuXG4gIHRyaWdnZXJCZWZvcmVVcGRhdGVIb29rKGZyb21FbCwgdG9FbCl7XG4gICAgdGhpcy5saXZlU29ja2V0LnRyaWdnZXJET00oXCJvbkJlZm9yZUVsVXBkYXRlZFwiLCBbZnJvbUVsLCB0b0VsXSlcbiAgICBsZXQgaG9vayA9IHRoaXMuZ2V0SG9vayhmcm9tRWwpXG4gICAgbGV0IGlzSWdub3JlZCA9IGhvb2sgJiYgRE9NLmlzSWdub3JlZChmcm9tRWwsIHRoaXMuYmluZGluZyhQSFhfVVBEQVRFKSlcbiAgICBpZihob29rICYmICFmcm9tRWwuaXNFcXVhbE5vZGUodG9FbCkgJiYgIShpc0lnbm9yZWQgJiYgaXNFcXVhbE9iaihmcm9tRWwuZGF0YXNldCwgdG9FbC5kYXRhc2V0KSkpe1xuICAgICAgaG9vay5fX2JlZm9yZVVwZGF0ZSgpXG4gICAgICByZXR1cm4gaG9va1xuICAgIH1cbiAgfVxuXG4gIG1heWJlTW91bnRlZChlbCl7XG4gICAgbGV0IHBoeE1vdW50ZWQgPSBlbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9NT1VOVEVEKSlcbiAgICBsZXQgaGFzQmVlbkludm9rZWQgPSBwaHhNb3VudGVkICYmIERPTS5wcml2YXRlKGVsLCBcIm1vdW50ZWRcIilcbiAgICBpZihwaHhNb3VudGVkICYmICFoYXNCZWVuSW52b2tlZCl7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQuZXhlY0pTKGVsLCBwaHhNb3VudGVkKVxuICAgICAgRE9NLnB1dFByaXZhdGUoZWwsIFwibW91bnRlZFwiLCB0cnVlKVxuICAgIH1cbiAgfVxuXG4gIG1heWJlQWRkTmV3SG9vayhlbCwgZm9yY2Upe1xuICAgIGxldCBuZXdIb29rID0gdGhpcy5hZGRIb29rKGVsKVxuICAgIGlmKG5ld0hvb2speyBuZXdIb29rLl9fbW91bnRlZCgpIH1cbiAgfVxuXG4gIHBlcmZvcm1QYXRjaChwYXRjaCwgcHJ1bmVDaWRzKXtcbiAgICBsZXQgcmVtb3ZlZEVscyA9IFtdXG4gICAgbGV0IHBoeENoaWxkcmVuQWRkZWQgPSBmYWxzZVxuICAgIGxldCB1cGRhdGVkSG9va0lkcyA9IG5ldyBTZXQoKVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJhZGRlZFwiLCBlbCA9PiB7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQudHJpZ2dlckRPTShcIm9uTm9kZUFkZGVkXCIsIFtlbF0pXG4gICAgICB0aGlzLm1heWJlQWRkTmV3SG9vayhlbClcbiAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSl7IHRoaXMubWF5YmVNb3VudGVkKGVsKSB9XG4gICAgfSlcblxuICAgIHBhdGNoLmFmdGVyKFwicGh4Q2hpbGRBZGRlZFwiLCBlbCA9PiB7XG4gICAgICBpZihET00uaXNQaHhTdGlja3koZWwpKXtcbiAgICAgICAgdGhpcy5saXZlU29ja2V0LmpvaW5Sb290Vmlld3MoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGh4Q2hpbGRyZW5BZGRlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYmVmb3JlKFwidXBkYXRlZFwiLCAoZnJvbUVsLCB0b0VsKSA9PiB7XG4gICAgICBsZXQgaG9vayA9IHRoaXMudHJpZ2dlckJlZm9yZVVwZGF0ZUhvb2soZnJvbUVsLCB0b0VsKVxuICAgICAgaWYoaG9vayl7IHVwZGF0ZWRIb29rSWRzLmFkZChmcm9tRWwuaWQpIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJ1cGRhdGVkXCIsIGVsID0+IHtcbiAgICAgIGlmKHVwZGF0ZWRIb29rSWRzLmhhcyhlbC5pZCkpeyB0aGlzLmdldEhvb2soZWwpLl9fdXBkYXRlZCgpIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJkaXNjYXJkZWRcIiwgKGVsKSA9PiB7XG4gICAgICBpZihlbC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpeyByZW1vdmVkRWxzLnB1c2goZWwpIH1cbiAgICB9KVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJ0cmFuc2l0aW9uc0Rpc2NhcmRlZFwiLCBlbHMgPT4gdGhpcy5hZnRlckVsZW1lbnRzUmVtb3ZlZChlbHMsIHBydW5lQ2lkcykpXG4gICAgcGF0Y2gucGVyZm9ybSgpXG4gICAgdGhpcy5hZnRlckVsZW1lbnRzUmVtb3ZlZChyZW1vdmVkRWxzLCBwcnVuZUNpZHMpXG5cbiAgICByZXR1cm4gcGh4Q2hpbGRyZW5BZGRlZFxuICB9XG5cbiAgYWZ0ZXJFbGVtZW50c1JlbW92ZWQoZWxlbWVudHMsIHBydW5lQ2lkcyl7XG4gICAgbGV0IGRlc3Ryb3llZENJRHMgPSBbXVxuICAgIGVsZW1lbnRzLmZvckVhY2gocGFyZW50ID0+IHtcbiAgICAgIGxldCBjb21wb25lbnRzID0gRE9NLmFsbChwYXJlbnQsIGBbJHtQSFhfQ09NUE9ORU5UfV1gKVxuICAgICAgbGV0IGhvb2tzID0gRE9NLmFsbChwYXJlbnQsIGBbJHt0aGlzLmJpbmRpbmcoUEhYX0hPT0spfV1gKVxuICAgICAgY29tcG9uZW50cy5jb25jYXQocGFyZW50KS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgbGV0IGNpZCA9IHRoaXMuY29tcG9uZW50SUQoZWwpXG4gICAgICAgIGlmKGlzQ2lkKGNpZCkgJiYgZGVzdHJveWVkQ0lEcy5pbmRleE9mKGNpZCkgPT09IC0xKXsgZGVzdHJveWVkQ0lEcy5wdXNoKGNpZCkgfVxuICAgICAgfSlcbiAgICAgIGhvb2tzLmNvbmNhdChwYXJlbnQpLmZvckVhY2goaG9va0VsID0+IHtcbiAgICAgICAgbGV0IGhvb2sgPSB0aGlzLmdldEhvb2soaG9va0VsKVxuICAgICAgICBob29rICYmIHRoaXMuZGVzdHJveUhvb2soaG9vaylcbiAgICAgIH0pXG4gICAgfSlcbiAgICAvLyBXZSBzaG91bGQgbm90IHBydW5lQ2lkcyBvbiBqb2lucy4gT3RoZXJ3aXNlLCBpbiBjYXNlIG9mXG4gICAgLy8gcmVqb2lucywgd2UgbWF5IG5vdGlmeSBjaWRzIHRoYXQgbm8gbG9uZ2VyIGJlbG9uZyB0byB0aGVcbiAgICAvLyBjdXJyZW50IExpdmVWaWV3IHRvIGJlIHJlbW92ZWQuXG4gICAgaWYocHJ1bmVDaWRzKXtcbiAgICAgIHRoaXMubWF5YmVQdXNoQ29tcG9uZW50c0Rlc3Ryb3llZChkZXN0cm95ZWRDSURzKVxuICAgIH1cbiAgfVxuXG4gIGpvaW5OZXdDaGlsZHJlbigpe1xuICAgIERPTS5maW5kUGh4Q2hpbGRyZW4odGhpcy5lbCwgdGhpcy5pZCkuZm9yRWFjaChlbCA9PiB0aGlzLmpvaW5DaGlsZChlbCkpXG4gIH1cblxuICBnZXRDaGlsZEJ5SWQoaWQpeyByZXR1cm4gdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdW2lkXSB9XG5cbiAgZ2V0RGVzY2VuZGVudEJ5RWwoZWwpe1xuICAgIGlmKGVsLmlkID09PSB0aGlzLmlkKXtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuW2VsLmdldEF0dHJpYnV0ZShQSFhfUEFSRU5UX0lEKV1bZWwuaWRdXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveURlc2NlbmRlbnQoaWQpe1xuICAgIGZvcihsZXQgcGFyZW50SWQgaW4gdGhpcy5yb290LmNoaWxkcmVuKXtcbiAgICAgIGZvcihsZXQgY2hpbGRJZCBpbiB0aGlzLnJvb3QuY2hpbGRyZW5bcGFyZW50SWRdKXtcbiAgICAgICAgaWYoY2hpbGRJZCA9PT0gaWQpeyByZXR1cm4gdGhpcy5yb290LmNoaWxkcmVuW3BhcmVudElkXVtjaGlsZElkXS5kZXN0cm95KCkgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGpvaW5DaGlsZChlbCl7XG4gICAgbGV0IGNoaWxkID0gdGhpcy5nZXRDaGlsZEJ5SWQoZWwuaWQpXG4gICAgaWYoIWNoaWxkKXtcbiAgICAgIGxldCB2aWV3ID0gbmV3IFZpZXcoZWwsIHRoaXMubGl2ZVNvY2tldCwgdGhpcylcbiAgICAgIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXVt2aWV3LmlkXSA9IHZpZXdcbiAgICAgIHZpZXcuam9pbigpXG4gICAgICB0aGlzLmNoaWxkSm9pbnMrK1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICBpc0pvaW5QZW5kaW5nKCl7IHJldHVybiB0aGlzLmpvaW5QZW5kaW5nIH1cblxuICBhY2tKb2luKF9jaGlsZCl7XG4gICAgdGhpcy5jaGlsZEpvaW5zLS1cblxuICAgIGlmKHRoaXMuY2hpbGRKb2lucyA9PT0gMCl7XG4gICAgICBpZih0aGlzLnBhcmVudCl7XG4gICAgICAgIHRoaXMucGFyZW50LmFja0pvaW4odGhpcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25BbGxDaGlsZEpvaW5zQ29tcGxldGUoKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKCl7XG4gICAgdGhpcy5qb2luQ2FsbGJhY2soKCkgPT4ge1xuICAgICAgdGhpcy5wZW5kaW5nSm9pbk9wcy5mb3JFYWNoKChbdmlldywgb3BdKSA9PiB7XG4gICAgICAgIGlmKCF2aWV3LmlzRGVzdHJveWVkKCkpeyBvcCgpIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLnBlbmRpbmdKb2luT3BzID0gW11cbiAgICB9KVxuICB9XG5cbiAgdXBkYXRlKGRpZmYsIGV2ZW50cyl7XG4gICAgaWYodGhpcy5pc0pvaW5QZW5kaW5nKCkgfHwgKHRoaXMubGl2ZVNvY2tldC5oYXNQZW5kaW5nTGluaygpICYmIHRoaXMucm9vdC5pc01haW4oKSkpe1xuICAgICAgcmV0dXJuIHRoaXMucGVuZGluZ0RpZmZzLnB1c2goe2RpZmYsIGV2ZW50c30pXG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJlZC5tZXJnZURpZmYoZGlmZilcbiAgICBsZXQgcGh4Q2hpbGRyZW5BZGRlZCA9IGZhbHNlXG5cbiAgICAvLyBXaGVuIHRoZSBkaWZmIG9ubHkgY29udGFpbnMgY29tcG9uZW50IGRpZmZzLCB0aGVuIHdhbGsgY29tcG9uZW50c1xuICAgIC8vIGFuZCBwYXRjaCBvbmx5IHRoZSBwYXJlbnQgY29tcG9uZW50IGNvbnRhaW5lcnMgZm91bmQgaW4gdGhlIGRpZmYuXG4gICAgLy8gT3RoZXJ3aXNlLCBwYXRjaCBlbnRpcmUgTFYgY29udGFpbmVyLlxuICAgIGlmKHRoaXMucmVuZGVyZWQuaXNDb21wb25lbnRPbmx5RGlmZihkaWZmKSl7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQudGltZShcImNvbXBvbmVudCBwYXRjaCBjb21wbGV0ZVwiLCAoKSA9PiB7XG4gICAgICAgIGxldCBwYXJlbnRDaWRzID0gRE9NLmZpbmRQYXJlbnRDSURzKHRoaXMuZWwsIHRoaXMucmVuZGVyZWQuY29tcG9uZW50Q0lEcyhkaWZmKSlcbiAgICAgICAgcGFyZW50Q2lkcy5mb3JFYWNoKHBhcmVudENJRCA9PiB7XG4gICAgICAgICAgaWYodGhpcy5jb21wb25lbnRQYXRjaCh0aGlzLnJlbmRlcmVkLmdldENvbXBvbmVudChkaWZmLCBwYXJlbnRDSUQpLCBwYXJlbnRDSUQpKXsgcGh4Q2hpbGRyZW5BZGRlZCA9IHRydWUgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYoIWlzRW1wdHkoZGlmZikpe1xuICAgICAgdGhpcy5saXZlU29ja2V0LnRpbWUoXCJmdWxsIHBhdGNoIGNvbXBsZXRlXCIsICgpID0+IHtcbiAgICAgICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlckNvbnRhaW5lcihkaWZmLCBcInVwZGF0ZVwiKVxuICAgICAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgbnVsbClcbiAgICAgICAgcGh4Q2hpbGRyZW5BZGRlZCA9IHRoaXMucGVyZm9ybVBhdGNoKHBhdGNoLCB0cnVlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLmxpdmVTb2NrZXQuZGlzcGF0Y2hFdmVudHMoZXZlbnRzKVxuICAgIGlmKHBoeENoaWxkcmVuQWRkZWQpeyB0aGlzLmpvaW5OZXdDaGlsZHJlbigpIH1cbiAgfVxuXG4gIHJlbmRlckNvbnRhaW5lcihkaWZmLCBraW5kKXtcbiAgICByZXR1cm4gdGhpcy5saXZlU29ja2V0LnRpbWUoYHRvU3RyaW5nIGRpZmYgKCR7a2luZH0pYCwgKCkgPT4ge1xuICAgICAgbGV0IHRhZyA9IHRoaXMuZWwudGFnTmFtZVxuICAgICAgLy8gRG9uJ3Qgc2tpcCBhbnkgY29tcG9uZW50IGluIHRoZSBkaWZmIG5vciBhbnkgbWFya2VkIGFzIHBydW5lZFxuICAgICAgLy8gKGFzIHRoZXkgbWF5IGhhdmUgYmVlbiBhZGRlZCBiYWNrKVxuICAgICAgbGV0IGNpZHMgPSBkaWZmID8gdGhpcy5yZW5kZXJlZC5jb21wb25lbnRDSURzKGRpZmYpLmNvbmNhdCh0aGlzLnBydW5pbmdDSURzKSA6IG51bGxcbiAgICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJlZC50b1N0cmluZyhjaWRzKVxuICAgICAgcmV0dXJuIGA8JHt0YWd9PiR7aHRtbH08LyR7dGFnfT5gXG4gICAgfSlcbiAgfVxuXG4gIGNvbXBvbmVudFBhdGNoKGRpZmYsIGNpZCl7XG4gICAgaWYoaXNFbXB0eShkaWZmKSkgcmV0dXJuIGZhbHNlXG4gICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlcmVkLmNvbXBvbmVudFRvU3RyaW5nKGNpZClcbiAgICBsZXQgcGF0Y2ggPSBuZXcgRE9NUGF0Y2godGhpcywgdGhpcy5lbCwgdGhpcy5pZCwgaHRtbCwgY2lkKVxuICAgIGxldCBjaGlsZHJlbkFkZGVkID0gdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIHRydWUpXG4gICAgcmV0dXJuIGNoaWxkcmVuQWRkZWRcbiAgfVxuXG4gIGdldEhvb2soZWwpeyByZXR1cm4gdGhpcy52aWV3SG9va3NbVmlld0hvb2suZWxlbWVudElEKGVsKV0gfVxuXG4gIGFkZEhvb2soZWwpe1xuICAgIGlmKFZpZXdIb29rLmVsZW1lbnRJRChlbCkgfHwgIWVsLmdldEF0dHJpYnV0ZSl7IHJldHVybiB9XG4gICAgbGV0IGhvb2tOYW1lID0gZWwuZ2V0QXR0cmlidXRlKGBkYXRhLXBoeC0ke1BIWF9IT09LfWApIHx8IGVsLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0hPT0spKVxuICAgIGlmKGhvb2tOYW1lICYmICF0aGlzLm93bnNFbGVtZW50KGVsKSl7IHJldHVybiB9XG4gICAgbGV0IGNhbGxiYWNrcyA9IHRoaXMubGl2ZVNvY2tldC5nZXRIb29rQ2FsbGJhY2tzKGhvb2tOYW1lKVxuXG4gICAgaWYoY2FsbGJhY2tzKXtcbiAgICAgIGlmKCFlbC5pZCl7IGxvZ0Vycm9yKGBubyBET00gSUQgZm9yIGhvb2sgXCIke2hvb2tOYW1lfVwiLiBIb29rcyByZXF1aXJlIGEgdW5pcXVlIElEIG9uIGVhY2ggZWxlbWVudC5gLCBlbCkgfVxuICAgICAgbGV0IGhvb2sgPSBuZXcgVmlld0hvb2sodGhpcywgZWwsIGNhbGxiYWNrcylcbiAgICAgIHRoaXMudmlld0hvb2tzW1ZpZXdIb29rLmVsZW1lbnRJRChob29rLmVsKV0gPSBob29rXG4gICAgICByZXR1cm4gaG9va1xuICAgIH0gZWxzZSBpZihob29rTmFtZSAhPT0gbnVsbCl7XG4gICAgICBsb2dFcnJvcihgdW5rbm93biBob29rIGZvdW5kIGZvciBcIiR7aG9va05hbWV9XCJgLCBlbClcbiAgICB9XG4gIH1cblxuICBkZXN0cm95SG9vayhob29rKXtcbiAgICBob29rLl9fZGVzdHJveWVkKClcbiAgICBob29rLl9fY2xlYW51cF9fKClcbiAgICBkZWxldGUgdGhpcy52aWV3SG9va3NbVmlld0hvb2suZWxlbWVudElEKGhvb2suZWwpXVxuICB9XG5cbiAgYXBwbHlQZW5kaW5nVXBkYXRlcygpe1xuICAgIHRoaXMucGVuZGluZ0RpZmZzLmZvckVhY2goKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICB0aGlzLmVhY2hDaGlsZChjaGlsZCA9PiBjaGlsZC5hcHBseVBlbmRpbmdVcGRhdGVzKCkpXG4gIH1cblxuICBlYWNoQ2hpbGQoY2FsbGJhY2spe1xuICAgIGxldCBjaGlsZHJlbiA9IHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSB8fCB7fVxuICAgIGZvcihsZXQgaWQgaW4gY2hpbGRyZW4peyBjYWxsYmFjayh0aGlzLmdldENoaWxkQnlJZChpZCkpIH1cbiAgfVxuXG4gIG9uQ2hhbm5lbChldmVudCwgY2Ipe1xuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBldmVudCwgcmVzcCA9PiB7XG4gICAgICBpZih0aGlzLmlzSm9pblBlbmRpbmcoKSl7XG4gICAgICAgIHRoaXMucm9vdC5wZW5kaW5nSm9pbk9wcy5wdXNoKFt0aGlzLCAoKSA9PiBjYihyZXNwKV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiBjYihyZXNwKSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYmluZENoYW5uZWwoKXtcbiAgICAvLyBUaGUgZGlmZiBldmVudCBzaG91bGQgYmUgaGFuZGxlZCBieSB0aGUgcmVndWxhciB1cGRhdGUgb3BlcmF0aW9ucy5cbiAgICAvLyBBbGwgb3RoZXIgb3BlcmF0aW9ucyBhcmUgcXVldWVkIHRvIGJlIGFwcGxpZWQgb25seSBhZnRlciBqb2luLlxuICAgIHRoaXMubGl2ZVNvY2tldC5vbkNoYW5uZWwodGhpcy5jaGFubmVsLCBcImRpZmZcIiwgKHJhd0RpZmYpID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBseURpZmYoXCJ1cGRhdGVcIiwgcmF3RGlmZiwgKHtkaWZmLCBldmVudHN9KSA9PiB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpKVxuICAgICAgfSlcbiAgICB9KVxuICAgIHRoaXMub25DaGFubmVsKFwicmVkaXJlY3RcIiwgKHt0bywgZmxhc2h9KSA9PiB0aGlzLm9uUmVkaXJlY3Qoe3RvLCBmbGFzaH0pKVxuICAgIHRoaXMub25DaGFubmVsKFwibGl2ZV9wYXRjaFwiLCAocmVkaXIpID0+IHRoaXMub25MaXZlUGF0Y2gocmVkaXIpKVxuICAgIHRoaXMub25DaGFubmVsKFwibGl2ZV9yZWRpcmVjdFwiLCAocmVkaXIpID0+IHRoaXMub25MaXZlUmVkaXJlY3QocmVkaXIpKVxuICAgIHRoaXMuY2hhbm5lbC5vbkVycm9yKHJlYXNvbiA9PiB0aGlzLm9uRXJyb3IocmVhc29uKSlcbiAgICB0aGlzLmNoYW5uZWwub25DbG9zZShyZWFzb24gPT4gdGhpcy5vbkNsb3NlKHJlYXNvbikpXG4gIH1cblxuICBkZXN0cm95QWxsQ2hpbGRyZW4oKXsgdGhpcy5lYWNoQ2hpbGQoY2hpbGQgPT4gY2hpbGQuZGVzdHJveSgpKSB9XG5cbiAgb25MaXZlUmVkaXJlY3QocmVkaXIpe1xuICAgIGxldCB7dG8sIGtpbmQsIGZsYXNofSA9IHJlZGlyXG4gICAgbGV0IHVybCA9IHRoaXMuZXhwYW5kVVJMKHRvKVxuICAgIHRoaXMubGl2ZVNvY2tldC5oaXN0b3J5UmVkaXJlY3QodXJsLCBraW5kLCBmbGFzaClcbiAgfVxuXG4gIG9uTGl2ZVBhdGNoKHJlZGlyKXtcbiAgICBsZXQge3RvLCBraW5kfSA9IHJlZGlyXG4gICAgdGhpcy5ocmVmID0gdGhpcy5leHBhbmRVUkwodG8pXG4gICAgdGhpcy5saXZlU29ja2V0Lmhpc3RvcnlQYXRjaCh0bywga2luZClcbiAgfVxuXG4gIGV4cGFuZFVSTCh0byl7XG4gICAgcmV0dXJuIHRvLnN0YXJ0c1dpdGgoXCIvXCIpID8gYCR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3aW5kb3cubG9jYXRpb24uaG9zdH0ke3RvfWAgOiB0b1xuICB9XG5cbiAgb25SZWRpcmVjdCh7dG8sIGZsYXNofSl7IHRoaXMubGl2ZVNvY2tldC5yZWRpcmVjdCh0bywgZmxhc2gpIH1cblxuICBpc0Rlc3Ryb3llZCgpeyByZXR1cm4gdGhpcy5kZXN0cm95ZWQgfVxuXG4gIGpvaW5EZWFkKCl7IHRoaXMuaXNEZWFkID0gdHJ1ZSB9XG5cbiAgam9pbihjYWxsYmFjayl7XG4gICAgdGhpcy5zaG93TG9hZGVyKHRoaXMubGl2ZVNvY2tldC5sb2FkZXJUaW1lb3V0KVxuICAgIHRoaXMuYmluZENoYW5uZWwoKVxuICAgIGlmKHRoaXMuaXNNYWluKCkpe1xuICAgICAgdGhpcy5zdG9wQ2FsbGJhY2sgPSB0aGlzLmxpdmVTb2NrZXQud2l0aFBhZ2VMb2FkaW5nKHt0bzogdGhpcy5ocmVmLCBraW5kOiBcImluaXRpYWxcIn0pXG4gICAgfVxuICAgIHRoaXMuam9pbkNhbGxiYWNrID0gKG9uRG9uZSkgPT4ge1xuICAgICAgb25Eb25lID0gb25Eb25lIHx8IGZ1bmN0aW9uKCl7fVxuICAgICAgY2FsbGJhY2sgPyBjYWxsYmFjayh0aGlzLmpvaW5Db3VudCwgb25Eb25lKSA6IG9uRG9uZSgpXG4gICAgfVxuICAgIHRoaXMubGl2ZVNvY2tldC53cmFwUHVzaCh0aGlzLCB7dGltZW91dDogZmFsc2V9LCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jaGFubmVsLmpvaW4oKVxuICAgICAgICAucmVjZWl2ZShcIm9rXCIsIGRhdGEgPT4ge1xuICAgICAgICAgIGlmKCF0aGlzLmlzRGVzdHJveWVkKCkpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4gdGhpcy5vbkpvaW4oZGF0YSkpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAucmVjZWl2ZShcImVycm9yXCIsIHJlc3AgPT4gIXRoaXMuaXNEZXN0cm95ZWQoKSAmJiB0aGlzLm9uSm9pbkVycm9yKHJlc3ApKVxuICAgICAgICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gIXRoaXMuaXNEZXN0cm95ZWQoKSAmJiB0aGlzLm9uSm9pbkVycm9yKHtyZWFzb246IFwidGltZW91dFwifSkpXG4gICAgfSlcbiAgfVxuXG4gIG9uSm9pbkVycm9yKHJlc3Ape1xuICAgIGlmKHJlc3AucmVhc29uID09PSBcInVuYXV0aG9yaXplZFwiIHx8IHJlc3AucmVhc29uID09PSBcInN0YWxlXCIpe1xuICAgICAgdGhpcy5sb2coXCJlcnJvclwiLCAoKSA9PiBbXCJ1bmF1dGhvcml6ZWQgbGl2ZV9yZWRpcmVjdC4gRmFsbGluZyBiYWNrIHRvIHBhZ2UgcmVxdWVzdFwiLCByZXNwXSlcbiAgICAgIHJldHVybiB0aGlzLm9uUmVkaXJlY3Qoe3RvOiB0aGlzLmhyZWZ9KVxuICAgIH1cbiAgICBpZihyZXNwLnJlZGlyZWN0IHx8IHJlc3AubGl2ZV9yZWRpcmVjdCl7XG4gICAgICB0aGlzLmpvaW5QZW5kaW5nID0gZmFsc2VcbiAgICAgIHRoaXMuY2hhbm5lbC5sZWF2ZSgpXG4gICAgfVxuICAgIGlmKHJlc3AucmVkaXJlY3QpeyByZXR1cm4gdGhpcy5vblJlZGlyZWN0KHJlc3AucmVkaXJlY3QpIH1cbiAgICBpZihyZXNwLmxpdmVfcmVkaXJlY3QpeyByZXR1cm4gdGhpcy5vbkxpdmVSZWRpcmVjdChyZXNwLmxpdmVfcmVkaXJlY3QpIH1cbiAgICB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtcInVuYWJsZSB0byBqb2luXCIsIHJlc3BdKVxuICAgIGlmKHRoaXMubGl2ZVNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5saXZlU29ja2V0LnJlbG9hZFdpdGhKaXR0ZXIodGhpcykgfVxuICB9XG5cbiAgb25DbG9zZShyZWFzb24pe1xuICAgIGlmKHRoaXMuaXNEZXN0cm95ZWQoKSl7IHJldHVybiB9XG4gICAgaWYodGhpcy5saXZlU29ja2V0Lmhhc1BlbmRpbmdMaW5rKCkgJiYgcmVhc29uICE9PSBcImxlYXZlXCIpe1xuICAgICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5yZWxvYWRXaXRoSml0dGVyKHRoaXMpXG4gICAgfVxuICAgIHRoaXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICB0aGlzLmxpdmVTb2NrZXQuZHJvcEFjdGl2ZUVsZW1lbnQodGhpcylcbiAgICAvLyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGNhbiBiZSBudWxsIGluIEludGVybmV0IEV4cGxvcmVyIDExXG4gICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCl7IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpIH1cbiAgICBpZih0aGlzLmxpdmVTb2NrZXQuaXNVbmxvYWRlZCgpKXtcbiAgICAgIHRoaXMuc2hvd0xvYWRlcihCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VUKVxuICAgIH1cbiAgfVxuXG4gIG9uRXJyb3IocmVhc29uKXtcbiAgICB0aGlzLm9uQ2xvc2UocmVhc29uKVxuICAgIGlmKHRoaXMubGl2ZVNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5sb2coXCJlcnJvclwiLCAoKSA9PiBbXCJ2aWV3IGNyYXNoZWRcIiwgcmVhc29uXSkgfVxuICAgIGlmKCF0aGlzLmxpdmVTb2NrZXQuaXNVbmxvYWRlZCgpKXsgdGhpcy5kaXNwbGF5RXJyb3IoKSB9XG4gIH1cblxuICBkaXNwbGF5RXJyb3IoKXtcbiAgICBpZih0aGlzLmlzTWFpbigpKXsgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpwYWdlLWxvYWRpbmctc3RhcnRcIiwge2RldGFpbDoge3RvOiB0aGlzLmhyZWYsIGtpbmQ6IFwiZXJyb3JcIn19KSB9XG4gICAgdGhpcy5zaG93TG9hZGVyKClcbiAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0RJU0NPTk5FQ1RFRF9DTEFTUywgUEhYX0VSUk9SX0NMQVNTKVxuICAgIHRoaXMuZXhlY0FsbCh0aGlzLmJpbmRpbmcoXCJkaXNjb25uZWN0ZWRcIikpXG4gIH1cblxuICBwdXNoV2l0aFJlcGx5KHJlZkdlbmVyYXRvciwgZXZlbnQsIHBheWxvYWQsIG9uUmVwbHkgPSBmdW5jdGlvbiAoKXsgfSl7XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG5cbiAgICBsZXQgW3JlZiwgW2VsXSwgb3B0c10gPSByZWZHZW5lcmF0b3IgPyByZWZHZW5lcmF0b3IoKSA6IFtudWxsLCBbXSwge31dXG4gICAgbGV0IG9uTG9hZGluZ0RvbmUgPSBmdW5jdGlvbigpeyB9XG4gICAgaWYob3B0cy5wYWdlX2xvYWRpbmcgfHwgKGVsICYmIChlbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9QQUdFX0xPQURJTkcpKSAhPT0gbnVsbCkpKXtcbiAgICAgIG9uTG9hZGluZ0RvbmUgPSB0aGlzLmxpdmVTb2NrZXQud2l0aFBhZ2VMb2FkaW5nKHtraW5kOiBcImVsZW1lbnRcIiwgdGFyZ2V0OiBlbH0pXG4gICAgfVxuXG4gICAgaWYodHlwZW9mIChwYXlsb2FkLmNpZCkgIT09IFwibnVtYmVyXCIpeyBkZWxldGUgcGF5bG9hZC5jaWQgfVxuICAgIHJldHVybiAoXG4gICAgICB0aGlzLmxpdmVTb2NrZXQud3JhcFB1c2godGhpcywge3RpbWVvdXQ6IHRydWV9LCAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5uZWwucHVzaChldmVudCwgcGF5bG9hZCwgUFVTSF9USU1FT1VUKS5yZWNlaXZlKFwib2tcIiwgcmVzcCA9PiB7XG4gICAgICAgICAgbGV0IGZpbmlzaCA9IChob29rUmVwbHkpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3AucmVkaXJlY3QpeyB0aGlzLm9uUmVkaXJlY3QocmVzcC5yZWRpcmVjdCkgfVxuICAgICAgICAgICAgaWYocmVzcC5saXZlX3BhdGNoKXsgdGhpcy5vbkxpdmVQYXRjaChyZXNwLmxpdmVfcGF0Y2gpIH1cbiAgICAgICAgICAgIGlmKHJlc3AubGl2ZV9yZWRpcmVjdCl7IHRoaXMub25MaXZlUmVkaXJlY3QocmVzcC5saXZlX3JlZGlyZWN0KSB9XG4gICAgICAgICAgICBpZihyZWYgIT09IG51bGwpeyB0aGlzLnVuZG9SZWZzKHJlZikgfVxuICAgICAgICAgICAgb25Mb2FkaW5nRG9uZSgpXG4gICAgICAgICAgICBvblJlcGx5KHJlc3AsIGhvb2tSZXBseSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzcC5kaWZmKXtcbiAgICAgICAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5hcHBseURpZmYoXCJ1cGRhdGVcIiwgcmVzcC5kaWZmLCAoe2RpZmYsIHJlcGx5LCBldmVudHN9KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoZGlmZiwgZXZlbnRzKVxuICAgICAgICAgICAgICAgIGZpbmlzaChyZXBseSlcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbmlzaChudWxsKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgdW5kb1JlZnMocmVmKXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH0gLy8gZXhpdCBpZiBleHRlcm5hbCBmb3JtIHRyaWdnZXJlZFxuXG4gICAgRE9NLmFsbChkb2N1bWVudCwgYFske1BIWF9SRUZfU1JDfT1cIiR7dGhpcy5pZH1cIl1bJHtQSFhfUkVGfT1cIiR7cmVmfVwiXWAsIGVsID0+IHtcbiAgICAgIGxldCBkaXNhYmxlZFZhbCA9IGVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICAvLyByZW1vdmUgcmVmc1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUYpXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpXG4gICAgICAvLyByZXN0b3JlIGlucHV0c1xuICAgICAgaWYoZWwuZ2V0QXR0cmlidXRlKFBIWF9SRUFET05MWSkgIT09IG51bGwpe1xuICAgICAgICBlbC5yZWFkT25seSA9IGZhbHNlXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVBRE9OTFkpXG4gICAgICB9XG4gICAgICBpZihkaXNhYmxlZFZhbCAhPT0gbnVsbCl7XG4gICAgICAgIGVsLmRpc2FibGVkID0gZGlzYWJsZWRWYWwgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgY2xhc3Nlc1xuICAgICAgUEhYX0VWRU5UX0NMQVNTRVMuZm9yRWFjaChjbGFzc05hbWUgPT4gRE9NLnJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpKVxuICAgICAgLy8gcmVzdG9yZSBkaXNhYmxlc1xuICAgICAgbGV0IGRpc2FibGVSZXN0b3JlID0gZWwuZ2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSlcbiAgICAgIGlmKGRpc2FibGVSZXN0b3JlICE9PSBudWxsKXtcbiAgICAgICAgZWwuaW5uZXJUZXh0ID0gZGlzYWJsZVJlc3RvcmVcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSlcbiAgICAgIH1cbiAgICAgIGxldCB0b0VsID0gRE9NLnByaXZhdGUoZWwsIFBIWF9SRUYpXG4gICAgICBpZih0b0VsKXtcbiAgICAgICAgbGV0IGhvb2sgPSB0aGlzLnRyaWdnZXJCZWZvcmVVcGRhdGVIb29rKGVsLCB0b0VsKVxuICAgICAgICBET01QYXRjaC5wYXRjaEVsKGVsLCB0b0VsLCB0aGlzLmxpdmVTb2NrZXQuZ2V0QWN0aXZlRWxlbWVudCgpKVxuICAgICAgICBpZihob29rKXsgaG9vay5fX3VwZGF0ZWQoKSB9XG4gICAgICAgIERPTS5kZWxldGVQcml2YXRlKGVsLCBQSFhfUkVGKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwdXRSZWYoZWxlbWVudHMsIGV2ZW50LCBvcHRzID0ge30pe1xuICAgIGxldCBuZXdSZWYgPSB0aGlzLnJlZisrXG4gICAgbGV0IGRpc2FibGVXaXRoID0gdGhpcy5iaW5kaW5nKFBIWF9ESVNBQkxFX1dJVEgpXG4gICAgaWYob3B0cy5sb2FkaW5nKXsgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQoRE9NLmFsbChkb2N1bWVudCwgb3B0cy5sb2FkaW5nKSl9XG5cbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYHBoeC0ke2V2ZW50fS1sb2FkaW5nYClcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShQSFhfUkVGLCBuZXdSZWYpXG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMsIHRoaXMuZWwuaWQpXG4gICAgICBsZXQgZGlzYWJsZVRleHQgPSBlbC5nZXRBdHRyaWJ1dGUoZGlzYWJsZVdpdGgpXG4gICAgICBpZihkaXNhYmxlVGV4dCAhPT0gbnVsbCl7XG4gICAgICAgIGlmKCFlbC5nZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFKSl7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSwgZWwuaW5uZXJUZXh0KVxuICAgICAgICB9XG4gICAgICAgIGlmKGRpc2FibGVUZXh0ICE9PSBcIlwiKXsgZWwuaW5uZXJUZXh0ID0gZGlzYWJsZVRleHQgfVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIFtuZXdSZWYsIGVsZW1lbnRzLCBvcHRzXVxuICB9XG5cbiAgY29tcG9uZW50SUQoZWwpe1xuICAgIGxldCBjaWQgPSBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpXG4gICAgcmV0dXJuIGNpZCA/IHBhcnNlSW50KGNpZCkgOiBudWxsXG4gIH1cblxuICB0YXJnZXRDb21wb25lbnRJRCh0YXJnZXQsIHRhcmdldEN0eCwgb3B0cyA9IHt9KXtcbiAgICBpZihpc0NpZCh0YXJnZXRDdHgpKXsgcmV0dXJuIHRhcmdldEN0eCB9XG5cbiAgICBsZXQgY2lkT3JTZWxlY3RvciA9IHRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwidGFyZ2V0XCIpKVxuICAgIGlmKGlzQ2lkKGNpZE9yU2VsZWN0b3IpKXtcbiAgICAgIHJldHVybiBwYXJzZUludChjaWRPclNlbGVjdG9yKVxuICAgIH0gZWxzZSBpZih0YXJnZXRDdHggJiYgKGNpZE9yU2VsZWN0b3IgIT09IG51bGwgfHwgb3B0cy50YXJnZXQpKXtcbiAgICAgIHJldHVybiB0aGlzLmNsb3Nlc3RDb21wb25lbnRJRCh0YXJnZXRDdHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eCl7XG4gICAgaWYoaXNDaWQodGFyZ2V0Q3R4KSl7XG4gICAgICByZXR1cm4gdGFyZ2V0Q3R4XG4gICAgfSBlbHNlIGlmKHRhcmdldEN0eCl7XG4gICAgICByZXR1cm4gbWF5YmUodGFyZ2V0Q3R4LmNsb3Nlc3QoYFske1BIWF9DT01QT05FTlR9XWApLCBlbCA9PiB0aGlzLm93bnNFbGVtZW50KGVsKSAmJiB0aGlzLmNvbXBvbmVudElEKGVsKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBwdXNoSG9va0V2ZW50KHRhcmdldEN0eCwgZXZlbnQsIHBheWxvYWQsIG9uUmVwbHkpe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpe1xuICAgICAgdGhpcy5sb2coXCJob29rXCIsICgpID0+IFtcInVuYWJsZSB0byBwdXNoIGhvb2sgZXZlbnQuIExpdmVWaWV3IG5vdCBjb25uZWN0ZWRcIiwgZXZlbnQsIHBheWxvYWRdKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGxldCBbcmVmLCBlbHMsIG9wdHNdID0gdGhpcy5wdXRSZWYoW10sIFwiaG9va1wiKVxuICAgIHRoaXMucHVzaFdpdGhSZXBseSgoKSA9PiBbcmVmLCBlbHMsIG9wdHNdLCBcImV2ZW50XCIsIHtcbiAgICAgIHR5cGU6IFwiaG9va1wiLFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgdmFsdWU6IHBheWxvYWQsXG4gICAgICBjaWQ6IHRoaXMuY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eClcbiAgICB9LCAocmVzcCwgcmVwbHkpID0+IG9uUmVwbHkocmVwbHksIHJlZikpXG5cbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICBleHRyYWN0TWV0YShlbCwgbWV0YSwgdmFsdWUpe1xuICAgIGxldCBwcmVmaXggPSB0aGlzLmJpbmRpbmcoXCJ2YWx1ZS1cIilcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZighbWV0YSl7IG1ldGEgPSB7fSB9XG4gICAgICBsZXQgbmFtZSA9IGVsLmF0dHJpYnV0ZXNbaV0ubmFtZVxuICAgICAgaWYobmFtZS5zdGFydHNXaXRoKHByZWZpeCkpeyBtZXRhW25hbWUucmVwbGFjZShwcmVmaXgsIFwiXCIpXSA9IGVsLmdldEF0dHJpYnV0ZShuYW1lKSB9XG4gICAgfVxuICAgIGlmKGVsLnZhbHVlICE9PSB1bmRlZmluZWQpe1xuICAgICAgaWYoIW1ldGEpeyBtZXRhID0ge30gfVxuICAgICAgbWV0YS52YWx1ZSA9IGVsLnZhbHVlXG5cbiAgICAgIGlmKGVsLnRhZ05hbWUgPT09IFwiSU5QVVRcIiAmJiBDSEVDS0FCTEVfSU5QVVRTLmluZGV4T2YoZWwudHlwZSkgPj0gMCAmJiAhZWwuY2hlY2tlZCl7XG4gICAgICAgIGRlbGV0ZSBtZXRhLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGlmKHZhbHVlKXtcbiAgICAgIGlmKCFtZXRhKXsgbWV0YSA9IHt9IH1cbiAgICAgIGZvcihsZXQga2V5IGluIHZhbHVlKXsgbWV0YVtrZXldID0gdmFsdWVba2V5XSB9XG4gICAgfVxuICAgIHJldHVybiBtZXRhXG4gIH1cblxuICBwdXNoRXZlbnQodHlwZSwgZWwsIHRhcmdldEN0eCwgcGh4RXZlbnQsIG1ldGEsIG9wdHMgPSB7fSl7XG4gICAgdGhpcy5wdXNoV2l0aFJlcGx5KCgpID0+IHRoaXMucHV0UmVmKFtlbF0sIHR5cGUsIG9wdHMpLCBcImV2ZW50XCIsIHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICB2YWx1ZTogdGhpcy5leHRyYWN0TWV0YShlbCwgbWV0YSwgb3B0cy52YWx1ZSksXG4gICAgICBjaWQ6IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoZWwsIHRhcmdldEN0eCwgb3B0cylcbiAgICB9KVxuICB9XG5cbiAgcHVzaEZpbGVQcm9ncmVzcyhmaWxlRWwsIGVudHJ5UmVmLCBwcm9ncmVzcywgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQud2l0aGluT3duZXJzKGZpbGVFbC5mb3JtLCAodmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICB2aWV3LnB1c2hXaXRoUmVwbHkobnVsbCwgXCJwcm9ncmVzc1wiLCB7XG4gICAgICAgIGV2ZW50OiBmaWxlRWwuZ2V0QXR0cmlidXRlKHZpZXcuYmluZGluZyhQSFhfUFJPR1JFU1MpKSxcbiAgICAgICAgcmVmOiBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSxcbiAgICAgICAgZW50cnlfcmVmOiBlbnRyeVJlZixcbiAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICBjaWQ6IHZpZXcudGFyZ2V0Q29tcG9uZW50SUQoZmlsZUVsLmZvcm0sIHRhcmdldEN0eClcbiAgICAgIH0sIG9uUmVwbHkpXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hJbnB1dChpbnB1dEVsLCB0YXJnZXRDdHgsIGZvcmNlQ2lkLCBwaHhFdmVudCwgb3B0cywgY2FsbGJhY2spe1xuICAgIGxldCB1cGxvYWRzXG4gICAgbGV0IGNpZCA9IGlzQ2lkKGZvcmNlQ2lkKSA/IGZvcmNlQ2lkIDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eClcbiAgICBsZXQgcmVmR2VuZXJhdG9yID0gKCkgPT4gdGhpcy5wdXRSZWYoW2lucHV0RWwsIGlucHV0RWwuZm9ybV0sIFwiY2hhbmdlXCIsIG9wdHMpXG4gICAgbGV0IGZvcm1EYXRhXG4gICAgaWYoaW5wdXRFbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpKSl7XG4gICAgICBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oaW5wdXRFbC5mb3JtLCB7X3RhcmdldDogb3B0cy5fdGFyZ2V0fSwgW2lucHV0RWwubmFtZV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShpbnB1dEVsLmZvcm0sIHtfdGFyZ2V0OiBvcHRzLl90YXJnZXR9KVxuICAgIH1cbiAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmZpbGVzICYmIGlucHV0RWwuZmlsZXMubGVuZ3RoID4gMCl7XG4gICAgICBMaXZlVXBsb2FkZXIudHJhY2tGaWxlcyhpbnB1dEVsLCBBcnJheS5mcm9tKGlucHV0RWwuZmlsZXMpKVxuICAgIH1cbiAgICB1cGxvYWRzID0gTGl2ZVVwbG9hZGVyLnNlcmlhbGl6ZVVwbG9hZHMoaW5wdXRFbClcbiAgICBsZXQgZXZlbnQgPSB7XG4gICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgIHVwbG9hZHM6IHVwbG9hZHMsXG4gICAgICBjaWQ6IGNpZFxuICAgIH1cbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBcImV2ZW50XCIsIGV2ZW50LCByZXNwID0+IHtcbiAgICAgIERPTS5zaG93RXJyb3IoaW5wdXRFbCwgdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoUEhYX0ZFRURCQUNLX0ZPUikpXG4gICAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWF1dG8tdXBsb2FkXCIpICE9PSBudWxsKXtcbiAgICAgICAgaWYoTGl2ZVVwbG9hZGVyLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXRFbCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgbGV0IFtyZWYsIF9lbHNdID0gcmVmR2VuZXJhdG9yKClcbiAgICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKGlucHV0RWwuZm9ybSwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgKF91cGxvYWRzKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwKVxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQXdhaXRpbmdTdWJtaXQoaW5wdXRFbC5mb3JtKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3ApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyaWdnZXJBd2FpdGluZ1N1Ym1pdChmb3JtRWwpe1xuICAgIGxldCBhd2FpdGluZ1N1Ym1pdCA9IHRoaXMuZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbClcbiAgICBpZihhd2FpdGluZ1N1Ym1pdCl7XG4gICAgICBsZXQgW19lbCwgX3JlZiwgX29wdHMsIGNhbGxiYWNrXSA9IGF3YWl0aW5nU3VibWl0XG4gICAgICB0aGlzLmNhbmNlbFN1Ym1pdChmb3JtRWwpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbCl7XG4gICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pdHMuZmluZCgoW2VsLCBfcmVmLCBfb3B0cywgX2NhbGxiYWNrXSkgPT4gZWwuaXNTYW1lTm9kZShmb3JtRWwpKVxuICB9XG5cbiAgc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLmdldFNjaGVkdWxlZFN1Ym1pdChmb3JtRWwpKXsgcmV0dXJuIHRydWUgfVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMucHVzaChbZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrXSlcbiAgfVxuXG4gIGNhbmNlbFN1Ym1pdChmb3JtRWwpe1xuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSB0aGlzLmZvcm1TdWJtaXRzLmZpbHRlcigoW2VsLCByZWYsIF9jYWxsYmFja10pID0+IHtcbiAgICAgIGlmKGVsLmlzU2FtZU5vZGUoZm9ybUVsKSl7XG4gICAgICAgIHRoaXMudW5kb1JlZnMocmVmKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGRpc2FibGVGb3JtKGZvcm1FbCwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZmlsdGVySWdub3JlZCA9IGVsID0+IHtcbiAgICAgIGxldCB1c2VySWdub3JlZCA9IGNsb3Nlc3RQaHhCaW5kaW5nKGVsLCBgJHt0aGlzLmJpbmRpbmcoUEhYX1VQREFURSl9PWlnbm9yZWAsIGVsLmZvcm0pXG4gICAgICByZXR1cm4gISh1c2VySWdub3JlZCB8fCBjbG9zZXN0UGh4QmluZGluZyhlbCwgXCJkYXRhLXBoeC11cGRhdGU9aWdub3JlXCIsIGVsLmZvcm0pKVxuICAgIH1cbiAgICBsZXQgZmlsdGVyRGlzYWJsZXMgPSBlbCA9PiB7XG4gICAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfRElTQUJMRV9XSVRIKSlcbiAgICB9XG4gICAgbGV0IGZpbHRlckJ1dHRvbiA9IGVsID0+IGVsLnRhZ05hbWUgPT0gXCJCVVRUT05cIlxuXG4gICAgbGV0IGZpbHRlcklucHV0ID0gZWwgPT4gW1wiSU5QVVRcIiwgXCJURVhUQVJFQVwiLCBcIlNFTEVDVFwiXS5pbmNsdWRlcyhlbC50YWdOYW1lKVxuXG4gICAgbGV0IGZvcm1FbGVtZW50cyA9IEFycmF5LmZyb20oZm9ybUVsLmVsZW1lbnRzKVxuICAgIGxldCBkaXNhYmxlcyA9IGZvcm1FbGVtZW50cy5maWx0ZXIoZmlsdGVyRGlzYWJsZXMpXG4gICAgbGV0IGJ1dHRvbnMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlckJ1dHRvbikuZmlsdGVyKGZpbHRlcklnbm9yZWQpXG4gICAgbGV0IGlucHV0cyA9IGZvcm1FbGVtZW50cy5maWx0ZXIoZmlsdGVySW5wdXQpLmZpbHRlcihmaWx0ZXJJZ25vcmVkKVxuXG4gICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICBidXR0b24uc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgYnV0dG9uLmRpc2FibGVkKVxuICAgICAgYnV0dG9uLmRpc2FibGVkID0gdHJ1ZVxuICAgIH0pXG4gICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFBIWF9SRUFET05MWSwgaW5wdXQucmVhZE9ubHkpXG4gICAgICBpbnB1dC5yZWFkT25seSA9IHRydWVcbiAgICAgIGlmKGlucHV0LmZpbGVzKXtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgaW5wdXQuZGlzYWJsZWQpXG4gICAgICAgIGlucHV0LmRpc2FibGVkID0gdHJ1ZVxuICAgICAgfVxuICAgIH0pXG4gICAgZm9ybUVsLnNldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX1BBR0VfTE9BRElORyksIFwiXCIpXG4gICAgcmV0dXJuIHRoaXMucHV0UmVmKFtmb3JtRWxdLmNvbmNhdChkaXNhYmxlcykuY29uY2F0KGJ1dHRvbnMpLmNvbmNhdChpbnB1dHMpLCBcInN1Ym1pdFwiLCBvcHRzKVxuICB9XG5cbiAgcHVzaEZvcm1TdWJtaXQoZm9ybUVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBvcHRzLCBvblJlcGx5KXtcbiAgICBsZXQgcmVmR2VuZXJhdG9yID0gKCkgPT4gdGhpcy5kaXNhYmxlRm9ybShmb3JtRWwsIG9wdHMpXG4gICAgbGV0IGNpZCA9IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoZm9ybUVsLCB0YXJnZXRDdHgpXG4gICAgaWYoTGl2ZVVwbG9hZGVyLmhhc1VwbG9hZHNJblByb2dyZXNzKGZvcm1FbCkpe1xuICAgICAgbGV0IFtyZWYsIF9lbHNdID0gcmVmR2VuZXJhdG9yKClcbiAgICAgIGxldCBwdXNoID0gKCkgPT4gdGhpcy5wdXNoRm9ybVN1Ym1pdChmb3JtRWwsIHRhcmdldEN0eCwgcGh4RXZlbnQsIG9wdHMsIG9uUmVwbHkpXG4gICAgICByZXR1cm4gdGhpcy5zY2hlZHVsZVN1Ym1pdChmb3JtRWwsIHJlZiwgb3B0cywgcHVzaClcbiAgICB9IGVsc2UgaWYoTGl2ZVVwbG9hZGVyLmlucHV0c0F3YWl0aW5nUHJlZmxpZ2h0KGZvcm1FbCkubGVuZ3RoID4gMCl7XG4gICAgICBsZXQgW3JlZiwgZWxzXSA9IHJlZkdlbmVyYXRvcigpXG4gICAgICBsZXQgcHJveHlSZWZHZW4gPSAoKSA9PiBbcmVmLCBlbHMsIG9wdHNdXG4gICAgICB0aGlzLnVwbG9hZEZpbGVzKGZvcm1FbCwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgKF91cGxvYWRzKSA9PiB7XG4gICAgICAgIGxldCBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oZm9ybUVsLCB7fSlcbiAgICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KHByb3h5UmVmR2VuLCBcImV2ZW50XCIsIHtcbiAgICAgICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICAgICAgdmFsdWU6IGZvcm1EYXRhLFxuICAgICAgICAgIGNpZDogY2lkXG4gICAgICAgIH0sIG9uUmVwbHkpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZm9ybURhdGEgPSBzZXJpYWxpemVGb3JtKGZvcm1FbCwge30pXG4gICAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBcImV2ZW50XCIsIHtcbiAgICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgICAgdmFsdWU6IGZvcm1EYXRhLFxuICAgICAgICBjaWQ6IGNpZFxuICAgICAgfSwgb25SZXBseSlcbiAgICB9XG4gIH1cblxuICB1cGxvYWRGaWxlcyhmb3JtRWwsIHRhcmdldEN0eCwgcmVmLCBjaWQsIG9uQ29tcGxldGUpe1xuICAgIGxldCBqb2luQ291bnRBdFVwbG9hZCA9IHRoaXMuam9pbkNvdW50XG4gICAgbGV0IGlucHV0RWxzID0gTGl2ZVVwbG9hZGVyLmFjdGl2ZUZpbGVJbnB1dHMoZm9ybUVsKVxuICAgIGxldCBudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcyA9IGlucHV0RWxzLmxlbmd0aFxuXG4gICAgLy8gZ2V0IGVhY2ggZmlsZSBpbnB1dFxuICAgIGlucHV0RWxzLmZvckVhY2goaW5wdXRFbCA9PiB7XG4gICAgICBsZXQgdXBsb2FkZXIgPSBuZXcgTGl2ZVVwbG9hZGVyKGlucHV0RWwsIHRoaXMsICgpID0+IHtcbiAgICAgICAgbnVtRmlsZUlucHV0c0luUHJvZ3Jlc3MtLVxuICAgICAgICBpZihudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcyA9PT0gMCl7IG9uQ29tcGxldGUoKSB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy51cGxvYWRlcnNbaW5wdXRFbF0gPSB1cGxvYWRlclxuICAgICAgbGV0IGVudHJpZXMgPSB1cGxvYWRlci5lbnRyaWVzKCkubWFwKGVudHJ5ID0+IGVudHJ5LnRvUHJlZmxpZ2h0UGF5bG9hZCgpKVxuXG4gICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgcmVmOiBpbnB1dEVsLmdldEF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRiksXG4gICAgICAgIGVudHJpZXM6IGVudHJpZXMsXG4gICAgICAgIGNpZDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eClcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2coXCJ1cGxvYWRcIiwgKCkgPT4gW1wic2VuZGluZyBwcmVmbGlnaHQgcmVxdWVzdFwiLCBwYXlsb2FkXSlcblxuICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KG51bGwsIFwiYWxsb3dfdXBsb2FkXCIsIHBheWxvYWQsIHJlc3AgPT4ge1xuICAgICAgICB0aGlzLmxvZyhcInVwbG9hZFwiLCAoKSA9PiBbXCJnb3QgcHJlZmxpZ2h0IHJlc3BvbnNlXCIsIHJlc3BdKVxuICAgICAgICBpZihyZXNwLmVycm9yKXtcbiAgICAgICAgICB0aGlzLnVuZG9SZWZzKHJlZilcbiAgICAgICAgICBsZXQgW2VudHJ5X3JlZiwgcmVhc29uXSA9IHJlc3AuZXJyb3JcbiAgICAgICAgICB0aGlzLmxvZyhcInVwbG9hZFwiLCAoKSA9PiBbYGVycm9yIGZvciBlbnRyeSAke2VudHJ5X3JlZn1gLCByZWFzb25dKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBvbkVycm9yID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwub25FcnJvcigoKSA9PiB7XG4gICAgICAgICAgICAgIGlmKHRoaXMuam9pbkNvdW50ID09PSBqb2luQ291bnRBdFVwbG9hZCl7IGNhbGxiYWNrKCkgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBsb2FkZXIuaW5pdEFkYXB0ZXJVcGxvYWQocmVzcCwgb25FcnJvciwgdGhpcy5saXZlU29ja2V0KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBkaXNwYXRjaFVwbG9hZHMobmFtZSwgZmlsZXNPckJsb2JzKXtcbiAgICBsZXQgaW5wdXRzID0gRE9NLmZpbmRVcGxvYWRJbnB1dHModGhpcy5lbCkuZmlsdGVyKGVsID0+IGVsLm5hbWUgPT09IG5hbWUpXG4gICAgaWYoaW5wdXRzLmxlbmd0aCA9PT0gMCl7IGxvZ0Vycm9yKGBubyBsaXZlIGZpbGUgaW5wdXRzIGZvdW5kIG1hdGNoaW5nIHRoZSBuYW1lIFwiJHtuYW1lfVwiYCkgfVxuICAgIGVsc2UgaWYoaW5wdXRzLmxlbmd0aCA+IDEpeyBsb2dFcnJvcihgZHVwbGljYXRlIGxpdmUgZmlsZSBpbnB1dHMgZm91bmQgbWF0Y2hpbmcgdGhlIG5hbWUgXCIke25hbWV9XCJgKSB9XG4gICAgZWxzZSB7IERPTS5kaXNwYXRjaEV2ZW50KGlucHV0c1swXSwgUEhYX1RSQUNLX1VQTE9BRFMsIHtkZXRhaWw6IHtmaWxlczogZmlsZXNPckJsb2JzfX0pIH1cbiAgfVxuXG4gIHB1c2hGb3JtUmVjb3ZlcnkoZm9ybSwgbmV3Q2lkLCBjYWxsYmFjayl7XG4gICAgdGhpcy5saXZlU29ja2V0LndpdGhpbk93bmVycyhmb3JtLCAodmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICBsZXQgaW5wdXQgPSBmb3JtLmVsZW1lbnRzWzBdXG4gICAgICBsZXQgcGh4RXZlbnQgPSBmb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0FVVE9fUkVDT1ZFUikpIHx8IGZvcm0uZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcImNoYW5nZVwiKSlcblxuICAgICAgSlMuZXhlYyhcImNoYW5nZVwiLCBwaHhFdmVudCwgdmlldywgaW5wdXQsIFtcInB1c2hcIiwge190YXJnZXQ6IGlucHV0Lm5hbWUsIG5ld0NpZDogbmV3Q2lkLCBjYWxsYmFjazogY2FsbGJhY2t9XSlcbiAgICB9KVxuICB9XG5cbiAgcHVzaExpbmtQYXRjaChocmVmLCB0YXJnZXRFbCwgY2FsbGJhY2spe1xuICAgIGxldCBsaW5rUmVmID0gdGhpcy5saXZlU29ja2V0LnNldFBlbmRpbmdMaW5rKGhyZWYpXG4gICAgbGV0IHJlZkdlbiA9IHRhcmdldEVsID8gKCkgPT4gdGhpcy5wdXRSZWYoW3RhcmdldEVsXSwgXCJjbGlja1wiKSA6IG51bGxcbiAgICBsZXQgZmFsbGJhY2sgPSAoKSA9PiB0aGlzLmxpdmVTb2NrZXQucmVkaXJlY3Qod2luZG93LmxvY2F0aW9uLmhyZWYpXG5cbiAgICBsZXQgcHVzaCA9IHRoaXMucHVzaFdpdGhSZXBseShyZWZHZW4sIFwibGl2ZV9wYXRjaFwiLCB7dXJsOiBocmVmfSwgcmVzcCA9PiB7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB7XG4gICAgICAgIGlmKHJlc3AubGlua19yZWRpcmVjdCl7XG4gICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcGxhY2VNYWluKGhyZWYsIG51bGwsIGNhbGxiYWNrLCBsaW5rUmVmKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKHRoaXMubGl2ZVNvY2tldC5jb21taXRQZW5kaW5nTGluayhsaW5rUmVmKSl7XG4gICAgICAgICAgICB0aGlzLmhyZWYgPSBocmVmXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuYXBwbHlQZW5kaW5nVXBkYXRlcygpXG4gICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2sobGlua1JlZilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgaWYocHVzaCl7XG4gICAgICBwdXNoLnJlY2VpdmUoXCJ0aW1lb3V0XCIsIGZhbGxiYWNrKVxuICAgIH0gZWxzZSB7XG4gICAgICBmYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgZm9ybXNGb3JSZWNvdmVyeShodG1sKXtcbiAgICBpZih0aGlzLmpvaW5Db3VudCA9PT0gMCl7IHJldHVybiBbXSB9XG5cbiAgICBsZXQgcGh4Q2hhbmdlID0gdGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpXG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuXG4gICAgcmV0dXJuIChcbiAgICAgIERPTS5hbGwodGhpcy5lbCwgYGZvcm1bJHtwaHhDaGFuZ2V9XWApXG4gICAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmlkICYmIHRoaXMub3duc0VsZW1lbnQoZm9ybSkpXG4gICAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmVsZW1lbnRzLmxlbmd0aCA+IDApXG4gICAgICAgIC5maWx0ZXIoZm9ybSA9PiBmb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0FVVE9fUkVDT1ZFUikpICE9PSBcImlnbm9yZVwiKVxuICAgICAgICAubWFwKGZvcm0gPT4ge1xuICAgICAgICAgIGxldCBuZXdGb3JtID0gdGVtcGxhdGUuY29udGVudC5xdWVyeVNlbGVjdG9yKGBmb3JtW2lkPVwiJHtmb3JtLmlkfVwiXVske3BoeENoYW5nZX09XCIke2Zvcm0uZ2V0QXR0cmlidXRlKHBoeENoYW5nZSl9XCJdYClcbiAgICAgICAgICBpZihuZXdGb3JtKXtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybSwgbmV3Rm9ybSwgdGhpcy50YXJnZXRDb21wb25lbnRJRChuZXdGb3JtKV1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtLCBudWxsLCBudWxsXVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmZpbHRlcigoW2Zvcm0sIG5ld0Zvcm0sIG5ld0NpZF0pID0+IG5ld0Zvcm0pXG4gICAgKVxuICB9XG5cbiAgbWF5YmVQdXNoQ29tcG9uZW50c0Rlc3Ryb3llZChkZXN0cm95ZWRDSURzKXtcbiAgICBsZXQgd2lsbERlc3Ryb3lDSURzID0gZGVzdHJveWVkQ0lEcy5maWx0ZXIoY2lkID0+IHtcbiAgICAgIHJldHVybiBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIGNpZCkubGVuZ3RoID09PSAwXG4gICAgfSlcbiAgICBpZih3aWxsRGVzdHJveUNJRHMubGVuZ3RoID4gMCl7XG4gICAgICB0aGlzLnBydW5pbmdDSURzLnB1c2goLi4ud2lsbERlc3Ryb3lDSURzKVxuXG4gICAgICB0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCwgXCJjaWRzX3dpbGxfZGVzdHJveVwiLCB7Y2lkczogd2lsbERlc3Ryb3lDSURzfSwgKCkgPT4ge1xuICAgICAgICAvLyBUaGUgY2lkcyBhcmUgZWl0aGVyIGJhY2sgb24gdGhlIHBhZ2Ugb3IgdGhleSB3aWxsIGJlIGZ1bGx5IHJlbW92ZWQsXG4gICAgICAgIC8vIHNvIHdlIGNhbiByZW1vdmUgdGhlbSBmcm9tIHRoZSBwcnVuaW5nQ0lEcy5cbiAgICAgICAgdGhpcy5wcnVuaW5nQ0lEcyA9IHRoaXMucHJ1bmluZ0NJRHMuZmlsdGVyKGNpZCA9PiB3aWxsRGVzdHJveUNJRHMuaW5kZXhPZihjaWQpICE9PSAtMSlcblxuICAgICAgICAvLyBTZWUgaWYgYW55IG9mIHRoZSBjaWRzIHdlIHdhbnRlZCB0byBkZXN0cm95IHdlcmUgYWRkZWQgYmFjayxcbiAgICAgICAgLy8gaWYgdGhleSB3ZXJlIGFkZGVkIGJhY2ssIHdlIGRvbid0IGFjdHVhbGx5IGRlc3Ryb3kgdGhlbS5cbiAgICAgICAgbGV0IGNvbXBsZXRlbHlEZXN0cm95Q0lEcyA9IHdpbGxEZXN0cm95Q0lEcy5maWx0ZXIoY2lkID0+IHtcbiAgICAgICAgICByZXR1cm4gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmVsLCBjaWQpLmxlbmd0aCA9PT0gMFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmKGNvbXBsZXRlbHlEZXN0cm95Q0lEcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICB0aGlzLnB1c2hXaXRoUmVwbHkobnVsbCwgXCJjaWRzX2Rlc3Ryb3llZFwiLCB7Y2lkczogY29tcGxldGVseURlc3Ryb3lDSURzfSwgKHJlc3ApID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWQucHJ1bmVDSURzKHJlc3AuY2lkcylcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIG93bnNFbGVtZW50KGVsKXtcbiAgICBsZXQgcGFyZW50Vmlld0VsID0gZWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUilcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKFBIWF9QQVJFTlRfSUQpID09PSB0aGlzLmlkIHx8XG4gICAgICAocGFyZW50Vmlld0VsICYmIHBhcmVudFZpZXdFbC5pZCA9PT0gdGhpcy5pZCkgfHxcbiAgICAgICghcGFyZW50Vmlld0VsICYmIHRoaXMuaXNEZWFkKVxuICB9XG5cbiAgc3VibWl0Rm9ybShmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBvcHRzID0ge30pe1xuICAgIERPTS5wdXRQcml2YXRlKGZvcm0sIFBIWF9IQVNfU1VCTUlUVEVELCB0cnVlKVxuICAgIGxldCBwaHhGZWVkYmFjayA9IHRoaXMubGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9GRUVEQkFDS19GT1IpXG4gICAgbGV0IGlucHV0cyA9IEFycmF5LmZyb20oZm9ybS5lbGVtZW50cylcbiAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBET00ucHV0UHJpdmF0ZShpbnB1dCwgUEhYX0hBU19TVUJNSVRURUQsIHRydWUpKVxuICAgIHRoaXMubGl2ZVNvY2tldC5ibHVyQWN0aXZlRWxlbWVudCh0aGlzKVxuICAgIHRoaXMucHVzaEZvcm1TdWJtaXQoZm9ybSwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgb3B0cywgKCkgPT4ge1xuICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4gRE9NLnNob3dFcnJvcihpbnB1dCwgcGh4RmVlZGJhY2spKVxuICAgICAgdGhpcy5saXZlU29ja2V0LnJlc3RvcmVQcmV2aW91c2x5QWN0aXZlRm9jdXMoKVxuICAgIH0pXG4gIH1cblxuICBiaW5kaW5nKGtpbmQpeyByZXR1cm4gdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoa2luZCkgfVxufVxuIiwgIi8qKiBJbml0aWFsaXplcyB0aGUgTGl2ZVNvY2tldFxuICpcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZW5kUG9pbnQgLSBUaGUgc3RyaW5nIFdlYlNvY2tldCBlbmRwb2ludCwgaWUsIGBcIndzczovL2V4YW1wbGUuY29tL2xpdmVcImAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwiL2xpdmVcImAgKGluaGVyaXRlZCBob3N0ICYgcHJvdG9jb2wpXG4gKiBAcGFyYW0ge1Bob2VuaXguU29ja2V0fSBzb2NrZXQgLSB0aGUgcmVxdWlyZWQgUGhvZW5peCBTb2NrZXQgY2xhc3MgaW1wb3J0ZWQgZnJvbSBcInBob2VuaXhcIi4gRm9yIGV4YW1wbGU6XG4gKlxuICogICAgIGltcG9ydCB7U29ja2V0fSBmcm9tIFwicGhvZW5peFwiXG4gKiAgICAgaW1wb3J0IHtMaXZlU29ja2V0fSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxuICogICAgIGxldCBsaXZlU29ja2V0ID0gbmV3IExpdmVTb2NrZXQoXCIvbGl2ZVwiLCBTb2NrZXQsIHsuLi59KVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c10gLSBPcHRpb25hbCBjb25maWd1cmF0aW9uLiBPdXRzaWRlIG9mIGtleXMgbGlzdGVkIGJlbG93LCBhbGxcbiAqIGNvbmZpZ3VyYXRpb24gaXMgcGFzc2VkIGRpcmVjdGx5IHRvIHRoZSBQaG9lbml4IFNvY2tldCBjb25zdHJ1Y3Rvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5kZWZhdWx0c10gLSBUaGUgb3B0aW9uYWwgZGVmYXVsdHMgdG8gdXNlIGZvciB2YXJpb3VzIGJpbmRpbmdzLFxuICogc3VjaCBhcyBgcGh4LWRlYm91bmNlYC4gU3VwcG9ydHMgdGhlIGZvbGxvd2luZyBrZXlzOlxuICpcbiAqICAgLSBkZWJvdW5jZSAtIHRoZSBtaWxsaXNlY29uZCBwaHgtZGVib3VuY2UgdGltZS4gRGVmYXVsdHMgMzAwXG4gKiAgIC0gdGhyb3R0bGUgLSB0aGUgbWlsbGlzZWNvbmQgcGh4LXRocm90dGxlIHRpbWUuIERlZmF1bHRzIDMwMFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnBhcmFtc10gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gZm9yIHBhc3NpbmcgY29ubmVjdCBwYXJhbXMuXG4gKiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gTGl2ZVZpZXcuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICAoZWwpID0+IHt2aWV3OiBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW15LXZpZXctbmFtZVwiLCB0b2tlbjogd2luZG93Lm15VG9rZW59XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmJpbmRpbmdQcmVmaXhdIC0gVGhlIG9wdGlvbmFsIHByZWZpeCB0byB1c2UgZm9yIGFsbCBwaHggRE9NIGFubm90YXRpb25zLlxuICogRGVmYXVsdHMgdG8gXCJwaHgtXCIuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuaG9va3NdIC0gVGhlIG9wdGlvbmFsIG9iamVjdCBmb3IgcmVmZXJlbmNpbmcgTGl2ZVZpZXcgaG9vayBjYWxsYmFja3MuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMudXBsb2FkZXJzXSAtIFRoZSBvcHRpb25hbCBvYmplY3QgZm9yIHJlZmVyZW5jaW5nIExpdmVWaWV3IHVwbG9hZGVyIGNhbGxiYWNrcy5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMubG9hZGVyVGltZW91dF0gLSBUaGUgb3B0aW9uYWwgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIGFwcGx5XG4gKiBsb2FkaW5nIHN0YXRlcy5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMubWF4UmVsb2Fkc10gLSBUaGUgbWF4aW11bSByZWxvYWRzIGJlZm9yZSBlbnRlcmluZyBmYWlsc2FmZSBtb2RlLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5yZWxvYWRKaXR0ZXJNaW5dIC0gVGhlIG1pbmltdW0gdGltZSBiZXR3ZWVuIG5vcm1hbCByZWxvYWQgYXR0ZW1wdHMuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLnJlbG9hZEppdHRlck1heF0gLSBUaGUgbWF4aW11bSB0aW1lIGJldHdlZW4gbm9ybWFsIHJlbG9hZCBhdHRlbXB0cy5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMuZmFpbHNhZmVKaXR0ZXJdIC0gVGhlIHRpbWUgYmV0d2VlbiByZWxvYWQgYXR0ZW1wdHMgaW4gZmFpbHNhZmUgbW9kZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnZpZXdMb2dnZXJdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGxvZyBkZWJ1ZyBpbmZvcm1hdGlvbi4gRm9yIGV4YW1wbGU6XG4gKlxuICogICAgICh2aWV3LCBraW5kLCBtc2csIG9iaikgPT4gY29uc29sZS5sb2coYCR7dmlldy5pZH0gJHtraW5kfTogJHttc2d9IC0gYCwgb2JqKVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5tZXRhZGF0YV0gLSBUaGUgb3B0aW9uYWwgb2JqZWN0IG1hcHBpbmcgZXZlbnQgbmFtZXMgdG8gZnVuY3Rpb25zIGZvclxuICogcG9wdWxhdGluZyBldmVudCBtZXRhZGF0YS4gRm9yIGV4YW1wbGU6XG4gKlxuICogICAgIG1ldGFkYXRhOiB7XG4gKiAgICAgICBjbGljazogKGUsIGVsKSA9PiB7XG4gKiAgICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgICAgY3RybEtleTogZS5jdHJsS2V5LFxuICogICAgICAgICAgIG1ldGFLZXk6IGUubWV0YUtleSxcbiAqICAgICAgICAgICBkZXRhaWw6IGUuZGV0YWlsIHx8IDEsXG4gKiAgICAgICAgIH1cbiAqICAgICAgIH0sXG4gKiAgICAgICBrZXlkb3duOiAoZSwgZWwpID0+IHtcbiAqICAgICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAgICBrZXk6IGUua2V5LFxuICogICAgICAgICAgIGN0cmxLZXk6IGUuY3RybEtleSxcbiAqICAgICAgICAgICBtZXRhS2V5OiBlLm1ldGFLZXksXG4gKiAgICAgICAgICAgc2hpZnRLZXk6IGUuc2hpZnRLZXlcbiAqICAgICAgICAgfVxuICogICAgICAgfVxuICogICAgIH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5zZXNzaW9uU3RvcmFnZV0gLSBBbiBvcHRpb25hbCBTdG9yYWdlIGNvbXBhdGlibGUgb2JqZWN0XG4gKiBVc2VmdWwgd2hlbiBMaXZlVmlldyB3b24ndCBoYXZlIGFjY2VzcyB0byBgc2Vzc2lvblN0b3JhZ2VgLiAgRm9yIGV4YW1wbGUsIFRoaXMgY291bGRcbiAqIGhhcHBlbiBpZiBhIHNpdGUgbG9hZHMgYSBjcm9zcy1kb21haW4gTGl2ZVZpZXcgaW4gYW4gaWZyYW1lLiAgRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiAgICAgY2xhc3MgSW5NZW1vcnlTdG9yYWdlIHtcbiAqICAgICAgIGNvbnN0cnVjdG9yKCkgeyB0aGlzLnN0b3JhZ2UgPSB7fSB9XG4gKiAgICAgICBnZXRJdGVtKGtleU5hbWUpIHsgcmV0dXJuIHRoaXMuc3RvcmFnZVtrZXlOYW1lXSB8fCBudWxsIH1cbiAqICAgICAgIHJlbW92ZUl0ZW0oa2V5TmFtZSkgeyBkZWxldGUgdGhpcy5zdG9yYWdlW2tleU5hbWVdIH1cbiAqICAgICAgIHNldEl0ZW0oa2V5TmFtZSwga2V5VmFsdWUpIHsgdGhpcy5zdG9yYWdlW2tleU5hbWVdID0ga2V5VmFsdWUgfVxuICogICAgIH1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMubG9jYWxTdG9yYWdlXSAtIEFuIG9wdGlvbmFsIFN0b3JhZ2UgY29tcGF0aWJsZSBvYmplY3RcbiAqIFVzZWZ1bCBmb3Igd2hlbiBMaXZlVmlldyB3b24ndCBoYXZlIGFjY2VzcyB0byBgbG9jYWxTdG9yYWdlYC5cbiAqIFNlZSBgb3B0cy5zZXNzaW9uU3RvcmFnZWAgZm9yIGV4YW1wbGVzLlxuKi9cblxuaW1wb3J0IHtcbiAgQklORElOR19QUkVGSVgsXG4gIENPTlNFQ1VUSVZFX1JFTE9BRFMsXG4gIERFRkFVTFRTLFxuICBGQUlMU0FGRV9KSVRURVIsXG4gIExPQURFUl9USU1FT1VULFxuICBNQVhfUkVMT0FEUyxcbiAgUEhYX0RFQk9VTkNFLFxuICBQSFhfRFJPUF9UQVJHRVQsXG4gIFBIWF9IQVNfRk9DVVNFRCxcbiAgUEhYX0tFWSxcbiAgUEhYX0xJTktfU1RBVEUsXG4gIFBIWF9MSVZFX0xJTkssXG4gIFBIWF9MVl9ERUJVRyxcbiAgUEhYX0xWX0xBVEVOQ1lfU0lNLFxuICBQSFhfTFZfUFJPRklMRSxcbiAgUEhYX01BSU4sXG4gIFBIWF9QQVJFTlRfSUQsXG4gIFBIWF9WSUVXX1NFTEVDVE9SLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1RIUk9UVExFLFxuICBQSFhfVFJBQ0tfVVBMT0FEUyxcbiAgUEhYX1NFU1NJT04sXG4gIFJFTE9BRF9KSVRURVJfTUlOLFxuICBSRUxPQURfSklUVEVSX01BWCxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvbmUsXG4gIGNsb3Nlc3RQaHhCaW5kaW5nLFxuICBjbG9zdXJlLFxuICBkZWJ1ZyxcbiAgaXNPYmplY3QsXG4gIG1heWJlXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEJyb3dzZXIgZnJvbSBcIi4vYnJvd3NlclwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgSG9va3MgZnJvbSBcIi4vaG9va3NcIlxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXdcIlxuaW1wb3J0IEpTIGZyb20gXCIuL2pzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGl2ZVNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHVybCwgcGh4U29ja2V0LCBvcHRzID0ge30pe1xuICAgIHRoaXMudW5sb2FkZWQgPSBmYWxzZVxuICAgIGlmKCFwaHhTb2NrZXQgfHwgcGh4U29ja2V0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCIpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgIGEgcGhvZW5peCBTb2NrZXQgbXVzdCBiZSBwcm92aWRlZCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHRoZSBMaXZlU29ja2V0IGNvbnN0cnVjdG9yLiBGb3IgZXhhbXBsZTpcblxuICAgICAgICAgIGltcG9ydCB7U29ja2V0fSBmcm9tIFwicGhvZW5peFwiXG4gICAgICAgICAgaW1wb3J0IHtMaXZlU29ja2V0fSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxuICAgICAgICAgIGxldCBsaXZlU29ja2V0ID0gbmV3IExpdmVTb2NrZXQoXCIvbGl2ZVwiLCBTb2NrZXQsIHsuLi59KVxuICAgICAgYClcbiAgICB9XG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgcGh4U29ja2V0KHVybCwgb3B0cylcbiAgICB0aGlzLmJpbmRpbmdQcmVmaXggPSBvcHRzLmJpbmRpbmdQcmVmaXggfHwgQklORElOR19QUkVGSVhcbiAgICB0aGlzLm9wdHMgPSBvcHRzXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKG9wdHMucGFyYW1zIHx8IHt9KVxuICAgIHRoaXMudmlld0xvZ2dlciA9IG9wdHMudmlld0xvZ2dlclxuICAgIHRoaXMubWV0YWRhdGFDYWxsYmFja3MgPSBvcHRzLm1ldGFkYXRhIHx8IHt9XG4gICAgdGhpcy5kZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oY2xvbmUoREVGQVVMVFMpLCBvcHRzLmRlZmF1bHRzIHx8IHt9KVxuICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGxcbiAgICB0aGlzLnByZXZBY3RpdmUgPSBudWxsXG4gICAgdGhpcy5zaWxlbmNlZCA9IGZhbHNlXG4gICAgdGhpcy5tYWluID0gbnVsbFxuICAgIHRoaXMub3V0Z29pbmdNYWluRWwgPSBudWxsXG4gICAgdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCA9IG51bGxcbiAgICB0aGlzLmxpbmtSZWYgPSAxXG4gICAgdGhpcy5yb290cyA9IHt9XG4gICAgdGhpcy5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICB0aGlzLnBlbmRpbmdMaW5rID0gbnVsbFxuICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gY2xvbmUod2luZG93LmxvY2F0aW9uKVxuICAgIHRoaXMuaG9va3MgPSBvcHRzLmhvb2tzIHx8IHt9XG4gICAgdGhpcy51cGxvYWRlcnMgPSBvcHRzLnVwbG9hZGVycyB8fCB7fVxuICAgIHRoaXMubG9hZGVyVGltZW91dCA9IG9wdHMubG9hZGVyVGltZW91dCB8fCBMT0FERVJfVElNRU9VVFxuICAgIHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyID0gbnVsbFxuICAgIHRoaXMubWF4UmVsb2FkcyA9IG9wdHMubWF4UmVsb2FkcyB8fCBNQVhfUkVMT0FEU1xuICAgIHRoaXMucmVsb2FkSml0dGVyTWluID0gb3B0cy5yZWxvYWRKaXR0ZXJNaW4gfHwgUkVMT0FEX0pJVFRFUl9NSU5cbiAgICB0aGlzLnJlbG9hZEppdHRlck1heCA9IG9wdHMucmVsb2FkSml0dGVyTWF4IHx8IFJFTE9BRF9KSVRURVJfTUFYXG4gICAgdGhpcy5mYWlsc2FmZUppdHRlciA9IG9wdHMuZmFpbHNhZmVKaXR0ZXIgfHwgRkFJTFNBRkVfSklUVEVSXG4gICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSBvcHRzLmxvY2FsU3RvcmFnZSB8fCB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgdGhpcy5zZXNzaW9uU3RvcmFnZSA9IG9wdHMuc2Vzc2lvblN0b3JhZ2UgfHwgd2luZG93LnNlc3Npb25TdG9yYWdlXG4gICAgdGhpcy5ib3VuZFRvcExldmVsRXZlbnRzID0gZmFsc2VcbiAgICB0aGlzLmRvbUNhbGxiYWNrcyA9IE9iamVjdC5hc3NpZ24oe29uTm9kZUFkZGVkOiBjbG9zdXJlKCksIG9uQmVmb3JlRWxVcGRhdGVkOiBjbG9zdXJlKCl9LCBvcHRzLmRvbSB8fCB7fSlcbiAgICB0aGlzLnRyYW5zaXRpb25zID0gbmV3IFRyYW5zaXRpb25TZXQoKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgX2UgPT4ge1xuICAgICAgdGhpcy51bmxvYWRlZCA9IHRydWVcbiAgICB9KVxuICAgIHRoaXMuc29ja2V0Lm9uT3BlbigoKSA9PiB7XG4gICAgICBpZih0aGlzLmlzVW5sb2FkZWQoKSl7XG4gICAgICAgIC8vIHJlbG9hZCBwYWdlIGlmIGJlaW5nIHJlc3RvcmVkIGZyb20gYmFjay9mb3J3YXJkIGNhY2hlIGFuZCBicm93c2VyIGRvZXMgbm90IGVtaXQgXCJwYWdlc2hvd1wiXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBwdWJsaWNcblxuICBpc1Byb2ZpbGVFbmFibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX1BST0ZJTEUpID09PSBcInRydWVcIiB9XG5cbiAgaXNEZWJ1Z0VuYWJsZWQoKXsgcmV0dXJuIHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfREVCVUcpID09PSBcInRydWVcIiB9XG5cbiAgaXNEZWJ1Z0Rpc2FibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX0RFQlVHKSA9PT0gXCJmYWxzZVwiIH1cblxuICBlbmFibGVEZWJ1ZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX0RFQlVHLCBcInRydWVcIikgfVxuXG4gIGVuYWJsZVByb2ZpbGluZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX1BST0ZJTEUsIFwidHJ1ZVwiKSB9XG5cbiAgZGlzYWJsZURlYnVnKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfREVCVUcsIFwiZmFsc2VcIikgfVxuXG4gIGRpc2FibGVQcm9maWxpbmcoKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFBIWF9MVl9QUk9GSUxFKSB9XG5cbiAgZW5hYmxlTGF0ZW5jeVNpbSh1cHBlckJvdW5kTXMpe1xuICAgIHRoaXMuZW5hYmxlRGVidWcoKVxuICAgIGNvbnNvbGUubG9nKFwibGF0ZW5jeSBzaW11bGF0b3IgZW5hYmxlZCBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoaXMgYnJvd3NlciBzZXNzaW9uLiBDYWxsIGRpc2FibGVMYXRlbmN5U2ltKCkgdG8gZGlzYWJsZVwiKVxuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0sIHVwcGVyQm91bmRNcylcbiAgfVxuXG4gIGRpc2FibGVMYXRlbmN5U2ltKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShQSFhfTFZfTEFURU5DWV9TSU0pIH1cblxuICBnZXRMYXRlbmN5U2ltKCl7XG4gICAgbGV0IHN0ciA9IHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0pXG4gICAgcmV0dXJuIHN0ciA/IHBhcnNlSW50KHN0cikgOiBudWxsXG4gIH1cblxuICBnZXRTb2NrZXQoKXsgcmV0dXJuIHRoaXMuc29ja2V0IH1cblxuICBjb25uZWN0KCl7XG4gICAgLy8gZW5hYmxlIGRlYnVnIGJ5IGRlZmF1bHQgaWYgb24gbG9jYWxob3N0IGFuZCBub3QgZXhwbGljaXRseSBkaXNhYmxlZFxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIiAmJiAhdGhpcy5pc0RlYnVnRGlzYWJsZWQoKSl7IHRoaXMuZW5hYmxlRGVidWcoKSB9XG4gICAgbGV0IGRvQ29ubmVjdCA9ICgpID0+IHtcbiAgICAgIGlmKHRoaXMuam9pblJvb3RWaWV3cygpKXtcbiAgICAgICAgdGhpcy5iaW5kVG9wTGV2ZWxFdmVudHMoKVxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0KClcbiAgICAgIH0gZWxzZSBpZih0aGlzLm1haW4pe1xuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0KClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYmluZFRvcExldmVsRXZlbnRzKHtkZWFkOiB0cnVlfSlcbiAgICAgIH1cbiAgICAgIHRoaXMuam9pbkRlYWRWaWV3KClcbiAgICB9XG4gICAgaWYoW1wiY29tcGxldGVcIiwgXCJsb2FkZWRcIiwgXCJpbnRlcmFjdGl2ZVwiXS5pbmRleE9mKGRvY3VtZW50LnJlYWR5U3RhdGUpID49IDApe1xuICAgICAgZG9Db25uZWN0KClcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gZG9Db25uZWN0KCkpXG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdChjYWxsYmFjayl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyKVxuICAgIHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QoY2FsbGJhY2spXG4gIH1cblxuICByZXBsYWNlVHJhbnNwb3J0KHRyYW5zcG9ydCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyKVxuICAgIHRoaXMuc29ja2V0LnJlcGxhY2VUcmFuc3BvcnQodHJhbnNwb3J0KVxuICAgIHRoaXMuY29ubmVjdCgpXG4gIH1cblxuICBleGVjSlMoZWwsIGVuY29kZWRKUywgZXZlbnRUeXBlID0gbnVsbCl7XG4gICAgdGhpcy5vd25lcihlbCwgdmlldyA9PiBKUy5leGVjKGV2ZW50VHlwZSwgZW5jb2RlZEpTLCB2aWV3LCBlbCkpXG4gIH1cblxuICAvLyBwcml2YXRlXG5cbiAgdW5sb2FkKCl7XG4gICAgaWYodGhpcy51bmxvYWRlZCl7IHJldHVybiB9XG4gICAgaWYodGhpcy5tYWluICYmIHRoaXMuaXNDb25uZWN0ZWQoKSl7IHRoaXMubG9nKHRoaXMubWFpbiwgXCJzb2NrZXRcIiwgKCkgPT4gW1wiZGlzY29ubmVjdCBmb3IgcGFnZSBuYXZcIl0pIH1cbiAgICB0aGlzLnVubG9hZGVkID0gdHJ1ZVxuICAgIHRoaXMuZGVzdHJveUFsbFZpZXdzKClcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICB9XG5cbiAgdHJpZ2dlckRPTShraW5kLCBhcmdzKXsgdGhpcy5kb21DYWxsYmFja3Nba2luZF0oLi4uYXJncykgfVxuXG4gIHRpbWUobmFtZSwgZnVuYyl7XG4gICAgaWYoIXRoaXMuaXNQcm9maWxlRW5hYmxlZCgpIHx8ICFjb25zb2xlLnRpbWUpeyByZXR1cm4gZnVuYygpIH1cbiAgICBjb25zb2xlLnRpbWUobmFtZSlcbiAgICBsZXQgcmVzdWx0ID0gZnVuYygpXG4gICAgY29uc29sZS50aW1lRW5kKG5hbWUpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgbG9nKHZpZXcsIGtpbmQsIG1zZ0NhbGxiYWNrKXtcbiAgICBpZih0aGlzLnZpZXdMb2dnZXIpe1xuICAgICAgbGV0IFttc2csIG9ial0gPSBtc2dDYWxsYmFjaygpXG4gICAgICB0aGlzLnZpZXdMb2dnZXIodmlldywga2luZCwgbXNnLCBvYmopXG4gICAgfSBlbHNlIGlmKHRoaXMuaXNEZWJ1Z0VuYWJsZWQoKSl7XG4gICAgICBsZXQgW21zZywgb2JqXSA9IG1zZ0NhbGxiYWNrKClcbiAgICAgIGRlYnVnKHZpZXcsIGtpbmQsIG1zZywgb2JqKVxuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RET01VcGRhdGUoY2FsbGJhY2spe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuYWZ0ZXIoY2FsbGJhY2spXG4gIH1cblxuICB0cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSA9IGZ1bmN0aW9uKCl7fSl7XG4gICAgdGhpcy50cmFuc2l0aW9ucy5hZGRUcmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSlcbiAgfVxuXG4gIG9uQ2hhbm5lbChjaGFubmVsLCBldmVudCwgY2Ipe1xuICAgIGNoYW5uZWwub24oZXZlbnQsIGRhdGEgPT4ge1xuICAgICAgbGV0IGxhdGVuY3kgPSB0aGlzLmdldExhdGVuY3lTaW0oKVxuICAgICAgaWYoIWxhdGVuY3kpe1xuICAgICAgICBjYihkYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjYihkYXRhKSwgbGF0ZW5jeSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgd3JhcFB1c2godmlldywgb3B0cywgcHVzaCl7XG4gICAgbGV0IGxhdGVuY3kgPSB0aGlzLmdldExhdGVuY3lTaW0oKVxuICAgIGxldCBvbGRKb2luQ291bnQgPSB2aWV3LmpvaW5Db3VudFxuICAgIGlmKCFsYXRlbmN5KXtcbiAgICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiBvcHRzLnRpbWVvdXQpe1xuICAgICAgICByZXR1cm4gcHVzaCgpLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgICAgICBpZih2aWV3LmpvaW5Db3VudCA9PT0gb2xkSm9pbkNvdW50ICYmICF2aWV3LmlzRGVzdHJveWVkKCkpe1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRXaXRoSml0dGVyKHZpZXcsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sb2codmlldywgXCJ0aW1lb3V0XCIsICgpID0+IFtcInJlY2VpdmVkIHRpbWVvdXQgd2hpbGUgY29tbXVuaWNhdGluZyB3aXRoIHNlcnZlci4gRmFsbGluZyBiYWNrIHRvIGhhcmQgcmVmcmVzaCBmb3IgcmVjb3ZlcnlcIl0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwdXNoKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgZmFrZVB1c2ggPSB7XG4gICAgICByZWNlaXZlczogW10sXG4gICAgICByZWNlaXZlKGtpbmQsIGNiKXsgdGhpcy5yZWNlaXZlcy5wdXNoKFtraW5kLCBjYl0pIH1cbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZih2aWV3LmlzRGVzdHJveWVkKCkpeyByZXR1cm4gfVxuICAgICAgZmFrZVB1c2gucmVjZWl2ZXMucmVkdWNlKChhY2MsIFtraW5kLCBjYl0pID0+IGFjYy5yZWNlaXZlKGtpbmQsIGNiKSwgcHVzaCgpKVxuICAgIH0sIGxhdGVuY3kpXG4gICAgcmV0dXJuIGZha2VQdXNoXG4gIH1cblxuICByZWxvYWRXaXRoSml0dGVyKHZpZXcsIGxvZyl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyKVxuICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgbGV0IG1pbk1zID0gdGhpcy5yZWxvYWRKaXR0ZXJNaW5cbiAgICBsZXQgbWF4TXMgPSB0aGlzLnJlbG9hZEppdHRlck1heFxuICAgIGxldCBhZnRlck1zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE1zIC0gbWluTXMgKyAxKSkgKyBtaW5Nc1xuICAgIGxldCB0cmllcyA9IEJyb3dzZXIudXBkYXRlTG9jYWwodGhpcy5sb2NhbFN0b3JhZ2UsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgQ09OU0VDVVRJVkVfUkVMT0FEUywgMCwgY291bnQgPT4gY291bnQgKyAxKVxuICAgIGlmKHRyaWVzID4gdGhpcy5tYXhSZWxvYWRzKXtcbiAgICAgIGFmdGVyTXMgPSB0aGlzLmZhaWxzYWZlSml0dGVyXG4gICAgfVxuICAgIHRoaXMucmVsb2FkV2l0aEppdHRlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBpZiB2aWV3IGhhcyByZWNvdmVyZWQsIHN1Y2ggYXMgdHJhbnNwb3J0IHJlcGxhY2VkLCB0aGVuIGNhbmNlbFxuICAgICAgaWYodmlldy5pc0Rlc3Ryb3llZCgpIHx8IHZpZXcuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgICB2aWV3LmRlc3Ryb3koKVxuICAgICAgbG9nID8gbG9nKCkgOiB0aGlzLmxvZyh2aWV3LCBcImpvaW5cIiwgKCkgPT4gW2BlbmNvdW50ZXJlZCAke3RyaWVzfSBjb25zZWN1dGl2ZSByZWxvYWRzYF0pXG4gICAgICBpZih0cmllcyA+IHRoaXMubWF4UmVsb2Fkcyl7XG4gICAgICAgIHRoaXMubG9nKHZpZXcsIFwiam9pblwiLCAoKSA9PiBbYGV4Y2VlZGVkICR7dGhpcy5tYXhSZWxvYWRzfSBjb25zZWN1dGl2ZSByZWxvYWRzLiBFbnRlcmluZyBmYWlsc2FmZSBtb2RlYF0pXG4gICAgICB9XG4gICAgICBpZih0aGlzLmhhc1BlbmRpbmdMaW5rKCkpe1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB0aGlzLnBlbmRpbmdMaW5rXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9LCBhZnRlck1zKVxuICB9XG5cbiAgZ2V0SG9va0NhbGxiYWNrcyhuYW1lKXtcbiAgICByZXR1cm4gbmFtZSAmJiBuYW1lLnN0YXJ0c1dpdGgoXCJQaG9lbml4LlwiKSA/IEhvb2tzW25hbWUuc3BsaXQoXCIuXCIpWzFdXSA6IHRoaXMuaG9va3NbbmFtZV1cbiAgfVxuXG4gIGlzVW5sb2FkZWQoKXsgcmV0dXJuIHRoaXMudW5sb2FkZWQgfVxuXG4gIGlzQ29ubmVjdGVkKCl7IHJldHVybiB0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpIH1cblxuICBnZXRCaW5kaW5nUHJlZml4KCl7IHJldHVybiB0aGlzLmJpbmRpbmdQcmVmaXggfVxuXG4gIGJpbmRpbmcoa2luZCl7IHJldHVybiBgJHt0aGlzLmdldEJpbmRpbmdQcmVmaXgoKX0ke2tpbmR9YCB9XG5cbiAgY2hhbm5lbCh0b3BpYywgcGFyYW1zKXsgcmV0dXJuIHRoaXMuc29ja2V0LmNoYW5uZWwodG9waWMsIHBhcmFtcykgfVxuXG4gIGpvaW5EZWFkVmlldygpe1xuICAgIGxldCBib2R5ID0gZG9jdW1lbnQuYm9keVxuICAgIGlmKGJvZHkgJiYgIXRoaXMuaXNQaHhWaWV3KGJvZHkpICYmICF0aGlzLmlzUGh4Vmlldyhkb2N1bWVudC5maXJzdEVsZW1lbnRDaGlsZCkpe1xuICAgICAgbGV0IHZpZXcgPSB0aGlzLm5ld1Jvb3RWaWV3KGJvZHkpXG4gICAgICB2aWV3LnNldEhyZWYodGhpcy5nZXRIcmVmKCkpXG4gICAgICB2aWV3LmpvaW5EZWFkKClcbiAgICAgIGlmKCF0aGlzLm1haW4peyB0aGlzLm1haW4gPSB2aWV3IH1cbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdmlldy5leGVjTmV3TW91bnRlZCgpKVxuICAgIH1cbiAgfVxuXG4gIGpvaW5Sb290Vmlld3MoKXtcbiAgICBsZXQgcm9vdHNGb3VuZCA9IGZhbHNlXG4gICAgRE9NLmFsbChkb2N1bWVudCwgYCR7UEhYX1ZJRVdfU0VMRUNUT1J9Om5vdChbJHtQSFhfUEFSRU5UX0lEfV0pYCwgcm9vdEVsID0+IHtcbiAgICAgIGlmKCF0aGlzLmdldFJvb3RCeUlkKHJvb3RFbC5pZCkpe1xuICAgICAgICBsZXQgdmlldyA9IHRoaXMubmV3Um9vdFZpZXcocm9vdEVsKVxuICAgICAgICB2aWV3LnNldEhyZWYodGhpcy5nZXRIcmVmKCkpXG4gICAgICAgIHZpZXcuam9pbigpXG4gICAgICAgIGlmKHJvb3RFbC5oYXNBdHRyaWJ1dGUoUEhYX01BSU4pKXsgdGhpcy5tYWluID0gdmlldyB9XG4gICAgICB9XG4gICAgICByb290c0ZvdW5kID0gdHJ1ZVxuICAgIH0pXG4gICAgcmV0dXJuIHJvb3RzRm91bmRcbiAgfVxuXG4gIHJlZGlyZWN0KHRvLCBmbGFzaCl7XG4gICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICBCcm93c2VyLnJlZGlyZWN0KHRvLCBmbGFzaClcbiAgfVxuXG4gIHJlcGxhY2VNYWluKGhyZWYsIGZsYXNoLCBjYWxsYmFjayA9IG51bGwsIGxpbmtSZWYgPSB0aGlzLnNldFBlbmRpbmdMaW5rKGhyZWYpKXtcbiAgICBsZXQgbGl2ZVJlZmVyZXIgPSB0aGlzLmN1cnJlbnRMb2NhdGlvbi5ocmVmXG4gICAgdGhpcy5vdXRnb2luZ01haW5FbCA9IHRoaXMub3V0Z29pbmdNYWluRWwgfHwgdGhpcy5tYWluLmVsXG4gICAgbGV0IG5ld01haW5FbCA9IERPTS5jbG9uZU5vZGUodGhpcy5vdXRnb2luZ01haW5FbCwgXCJcIilcbiAgICB0aGlzLm1haW4uc2hvd0xvYWRlcih0aGlzLmxvYWRlclRpbWVvdXQpXG4gICAgdGhpcy5tYWluLmRlc3Ryb3koKVxuXG4gICAgdGhpcy5tYWluID0gdGhpcy5uZXdSb290VmlldyhuZXdNYWluRWwsIGZsYXNoLCBsaXZlUmVmZXJlcilcbiAgICB0aGlzLm1haW4uc2V0UmVkaXJlY3QoaHJlZilcbiAgICB0aGlzLnRyYW5zaXRpb25SZW1vdmVzKClcbiAgICB0aGlzLm1haW4uam9pbigoam9pbkNvdW50LCBvbkRvbmUpID0+IHtcbiAgICAgIGlmKGpvaW5Db3VudCA9PT0gMSAmJiB0aGlzLmNvbW1pdFBlbmRpbmdMaW5rKGxpbmtSZWYpKXtcbiAgICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICBET00uZmluZFBoeFN0aWNreShkb2N1bWVudCkuZm9yRWFjaChlbCA9PiBuZXdNYWluRWwuYXBwZW5kQ2hpbGQoZWwpKVxuICAgICAgICAgIHRoaXMub3V0Z29pbmdNYWluRWwucmVwbGFjZVdpdGgobmV3TWFpbkVsKVxuICAgICAgICAgIHRoaXMub3V0Z29pbmdNYWluRWwgPSBudWxsXG4gICAgICAgICAgY2FsbGJhY2sgJiYgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKVxuICAgICAgICAgIG9uRG9uZSgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyYW5zaXRpb25SZW1vdmVzKGVsZW1lbnRzKXtcbiAgICBsZXQgcmVtb3ZlQXR0ciA9IHRoaXMuYmluZGluZyhcInJlbW92ZVwiKVxuICAgIGVsZW1lbnRzID0gZWxlbWVudHMgfHwgRE9NLmFsbChkb2N1bWVudCwgYFske3JlbW92ZUF0dHJ9XWApXG4gICAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBpZihkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKSl7IC8vIHNraXAgY2hpbGRyZW4gYWxyZWFkeSByZW1vdmVkXG4gICAgICAgIHRoaXMuZXhlY0pTKGVsLCBlbC5nZXRBdHRyaWJ1dGUocmVtb3ZlQXR0ciksIFwicmVtb3ZlXCIpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlzUGh4VmlldyhlbCl7IHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKSAhPT0gbnVsbCB9XG5cbiAgbmV3Um9vdFZpZXcoZWwsIGZsYXNoLCBsaXZlUmVmZXJlcil7XG4gICAgbGV0IHZpZXcgPSBuZXcgVmlldyhlbCwgdGhpcywgbnVsbCwgZmxhc2gsIGxpdmVSZWZlcmVyKVxuICAgIHRoaXMucm9vdHNbdmlldy5pZF0gPSB2aWV3XG4gICAgcmV0dXJuIHZpZXdcbiAgfVxuXG4gIG93bmVyKGNoaWxkRWwsIGNhbGxiYWNrKXtcbiAgICBsZXQgdmlldyA9IG1heWJlKGNoaWxkRWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUiksIGVsID0+IHRoaXMuZ2V0Vmlld0J5RWwoZWwpKSB8fCB0aGlzLm1haW5cbiAgICBpZih2aWV3KXsgY2FsbGJhY2sodmlldykgfVxuICB9XG5cbiAgd2l0aGluT3duZXJzKGNoaWxkRWwsIGNhbGxiYWNrKXtcbiAgICB0aGlzLm93bmVyKGNoaWxkRWwsIHZpZXcgPT4gY2FsbGJhY2sodmlldywgY2hpbGRFbCkpXG4gIH1cblxuICBnZXRWaWV3QnlFbChlbCl7XG4gICAgbGV0IHJvb3RJZCA9IGVsLmdldEF0dHJpYnV0ZShQSFhfUk9PVF9JRClcbiAgICByZXR1cm4gbWF5YmUodGhpcy5nZXRSb290QnlJZChyb290SWQpLCByb290ID0+IHJvb3QuZ2V0RGVzY2VuZGVudEJ5RWwoZWwpKVxuICB9XG5cbiAgZ2V0Um9vdEJ5SWQoaWQpeyByZXR1cm4gdGhpcy5yb290c1tpZF0gfVxuXG4gIGRlc3Ryb3lBbGxWaWV3cygpe1xuICAgIGZvcihsZXQgaWQgaW4gdGhpcy5yb290cyl7XG4gICAgICB0aGlzLnJvb3RzW2lkXS5kZXN0cm95KClcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RzW2lkXVxuICAgIH1cbiAgICB0aGlzLm1haW4gPSBudWxsXG4gIH1cblxuICBkZXN0cm95Vmlld0J5RWwoZWwpe1xuICAgIGxldCByb290ID0gdGhpcy5nZXRSb290QnlJZChlbC5nZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQpKVxuICAgIGlmKHJvb3QgJiYgcm9vdC5pZCA9PT0gZWwuaWQpe1xuICAgICAgcm9vdC5kZXN0cm95KClcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RzW3Jvb3QuaWRdXG4gICAgfSBlbHNlIGlmKHJvb3Qpe1xuICAgICAgcm9vdC5kZXN0cm95RGVzY2VuZGVudChlbC5pZClcbiAgICB9XG4gIH1cblxuICBzZXRBY3RpdmVFbGVtZW50KHRhcmdldCl7XG4gICAgaWYodGhpcy5hY3RpdmVFbGVtZW50ID09PSB0YXJnZXQpeyByZXR1cm4gfVxuICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IHRhcmdldFxuICAgIGxldCBjYW5jZWwgPSAoKSA9PiB7XG4gICAgICBpZih0YXJnZXQgPT09IHRoaXMuYWN0aXZlRWxlbWVudCl7IHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGwgfVxuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMpXG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMpXG4gICAgfVxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBjYW5jZWwpXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBjYW5jZWwpXG4gIH1cblxuICBnZXRBY3RpdmVFbGVtZW50KCl7XG4gICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSl7XG4gICAgICByZXR1cm4gdGhpcy5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBjYW4gYmUgbnVsbCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMVxuICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keVxuICAgIH1cbiAgfVxuXG4gIGRyb3BBY3RpdmVFbGVtZW50KHZpZXcpe1xuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAmJiB2aWV3Lm93bnNFbGVtZW50KHRoaXMucHJldkFjdGl2ZSkpe1xuICAgICAgdGhpcy5wcmV2QWN0aXZlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHJlc3RvcmVQcmV2aW91c2x5QWN0aXZlRm9jdXMoKXtcbiAgICBpZih0aGlzLnByZXZBY3RpdmUgJiYgdGhpcy5wcmV2QWN0aXZlICE9PSBkb2N1bWVudC5ib2R5KXtcbiAgICAgIHRoaXMucHJldkFjdGl2ZS5mb2N1cygpXG4gICAgfVxuICB9XG5cbiAgYmx1ckFjdGl2ZUVsZW1lbnQoKXtcbiAgICB0aGlzLnByZXZBY3RpdmUgPSB0aGlzLmdldEFjdGl2ZUVsZW1lbnQoKVxuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAhPT0gZG9jdW1lbnQuYm9keSl7IHRoaXMucHJldkFjdGl2ZS5ibHVyKCkgfVxuICB9XG5cbiAgYmluZFRvcExldmVsRXZlbnRzKHtkZWFkfSA9IHt9KXtcbiAgICBpZih0aGlzLmJvdW5kVG9wTGV2ZWxFdmVudHMpeyByZXR1cm4gfVxuXG4gICAgdGhpcy5ib3VuZFRvcExldmVsRXZlbnRzID0gdHJ1ZVxuICAgIC8vIGVudGVyIGZhaWxzYWZlIHJlbG9hZCBpZiBzZXJ2ZXIgaGFzIGdvbmUgYXdheSBpbnRlbnRpb25hbGx5LCBzdWNoIGFzIFwiZGlzY29ubmVjdFwiIGJyb2FkY2FzdFxuICAgIHRoaXMuc29ja2V0Lm9uQ2xvc2UoZXZlbnQgPT4ge1xuICAgICAgLy8gdW5sb2FkIHdoZW4gbmF2aWdhdGluZyBocmVmIG9yIGZvcm0gc3VibWl0IChzdWNoIGFzIGZvciBmaXJlZm94KVxuICAgICAgaWYoZXZlbnQgJiYgZXZlbnQuY29kZSA9PT0gMTAwMSl7IHJldHVybiB0aGlzLnVubG9hZCgpIH1cbiAgICAgIC8vIGZhaWxzYWZlIHJlbG9hZCBpZiBub3JtYWwgY2xvc3VyZSBhbmQgd2Ugc3RpbGwgaGF2ZSBhIG1haW4gTFZcbiAgICAgIGlmKGV2ZW50ICYmIGV2ZW50LmNvZGUgPT09IDEwMDAgJiYgdGhpcy5tYWluKXsgcmV0dXJuIHRoaXMucmVsb2FkV2l0aEppdHRlcih0aGlzLm1haW4pIH1cbiAgICB9KVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpeyB9KSAvLyBlbnN1cmUgYWxsIGNsaWNrIGV2ZW50cyBidWJibGUgZm9yIG1vYmlsZSBTYWZhcmlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIGUgPT4ge1xuICAgICAgaWYoZS5wZXJzaXN0ZWQpeyAvLyByZWxvYWQgcGFnZSBpZiBiZWluZyByZXN0b3JlZCBmcm9tIGJhY2svZm9yd2FyZCBjYWNoZVxuICAgICAgICB0aGlzLmdldFNvY2tldCgpLmRpc2Nvbm5lY3QoKVxuICAgICAgICB0aGlzLndpdGhQYWdlTG9hZGluZyh7dG86IHdpbmRvdy5sb2NhdGlvbi5ocmVmLCBraW5kOiBcInJlZGlyZWN0XCJ9KVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9LCB0cnVlKVxuICAgIGlmKCFkZWFkKXsgdGhpcy5iaW5kTmF2KCkgfVxuICAgIHRoaXMuYmluZENsaWNrcygpXG4gICAgaWYoIWRlYWQpeyB0aGlzLmJpbmRGb3JtcygpIH1cbiAgICB0aGlzLmJpbmQoe2tleXVwOiBcImtleXVwXCIsIGtleWRvd246IFwia2V5ZG93blwifSwgKGUsIHR5cGUsIHZpZXcsIHRhcmdldEVsLCBwaHhFdmVudCwgZXZlbnRUYXJnZXQpID0+IHtcbiAgICAgIGxldCBtYXRjaEtleSA9IHRhcmdldEVsLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0tFWSkpXG4gICAgICBsZXQgcHJlc3NlZEtleSA9IGUua2V5ICYmIGUua2V5LnRvTG93ZXJDYXNlKCkgLy8gY2hyb21lIGNsaWNrZWQgYXV0b2NvbXBsZXRlcyBzZW5kIGEga2V5ZG93biB3aXRob3V0IGtleVxuICAgICAgaWYobWF0Y2hLZXkgJiYgbWF0Y2hLZXkudG9Mb3dlckNhc2UoKSAhPT0gcHJlc3NlZEtleSl7IHJldHVybiB9XG5cbiAgICAgIGxldCBkYXRhID0ge2tleTogZS5rZXksIC4uLnRoaXMuZXZlbnRNZXRhKHR5cGUsIGUsIHRhcmdldEVsKX1cbiAgICAgIEpTLmV4ZWModHlwZSwgcGh4RXZlbnQsIHZpZXcsIHRhcmdldEVsLCBbXCJwdXNoXCIsIHtkYXRhfV0pXG4gICAgfSlcbiAgICB0aGlzLmJpbmQoe2JsdXI6IFwiZm9jdXNvdXRcIiwgZm9jdXM6IFwiZm9jdXNpblwifSwgKGUsIHR5cGUsIHZpZXcsIHRhcmdldEVsLCBwaHhFdmVudCwgZXZlbnRUYXJnZXQpID0+IHtcbiAgICAgIGlmKCFldmVudFRhcmdldCl7XG4gICAgICAgIGxldCBkYXRhID0ge2tleTogZS5rZXksIC4uLnRoaXMuZXZlbnRNZXRhKHR5cGUsIGUsIHRhcmdldEVsKX1cbiAgICAgICAgSlMuZXhlYyh0eXBlLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0RWwsIFtcInB1c2hcIiwge2RhdGF9XSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuYmluZCh7Ymx1cjogXCJibHVyXCIsIGZvY3VzOiBcImZvY3VzXCJ9LCAoZSwgdHlwZSwgdmlldywgdGFyZ2V0RWwsIHRhcmdldEN0eCwgcGh4RXZlbnQsIHBoeFRhcmdldCkgPT4ge1xuICAgICAgLy8gYmx1ciBhbmQgZm9jdXMgYXJlIHRyaWdnZXJlZCBvbiBkb2N1bWVudCBhbmQgd2luZG93LiBEaXNjYXJkIG9uZSB0byBhdm9pZCBkdXBzXG4gICAgICBpZihwaHhUYXJnZXQgPT09IFwid2luZG93XCIpe1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZXZlbnRNZXRhKHR5cGUsIGUsIHRhcmdldEVsKVxuICAgICAgICBKUy5leGVjKHR5cGUsIHBoeEV2ZW50LCB2aWV3LCB0YXJnZXRFbCwgW1wicHVzaFwiLCB7ZGF0YX1dKVxuICAgICAgfVxuICAgIH0pXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCBlID0+IGUucHJldmVudERlZmF1bHQoKSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3BcIiwgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGxldCBkcm9wVGFyZ2V0SWQgPSBtYXliZShjbG9zZXN0UGh4QmluZGluZyhlLnRhcmdldCwgdGhpcy5iaW5kaW5nKFBIWF9EUk9QX1RBUkdFVCkpLCB0cnVlVGFyZ2V0ID0+IHtcbiAgICAgICAgcmV0dXJuIHRydWVUYXJnZXQuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfRFJPUF9UQVJHRVQpKVxuICAgICAgfSlcbiAgICAgIGxldCBkcm9wVGFyZ2V0ID0gZHJvcFRhcmdldElkICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRyb3BUYXJnZXRJZClcbiAgICAgIGxldCBmaWxlcyA9IEFycmF5LmZyb20oZS5kYXRhVHJhbnNmZXIuZmlsZXMgfHwgW10pXG4gICAgICBpZighZHJvcFRhcmdldCB8fCBkcm9wVGFyZ2V0LmRpc2FibGVkIHx8IGZpbGVzLmxlbmd0aCA9PT0gMCB8fCAhKGRyb3BUYXJnZXQuZmlsZXMgaW5zdGFuY2VvZiBGaWxlTGlzdCkpeyByZXR1cm4gfVxuXG4gICAgICBMaXZlVXBsb2FkZXIudHJhY2tGaWxlcyhkcm9wVGFyZ2V0LCBmaWxlcylcbiAgICAgIGRyb3BUYXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiLCB7YnViYmxlczogdHJ1ZX0pKVxuICAgIH0pXG4gICAgdGhpcy5vbihQSFhfVFJBQ0tfVVBMT0FEUywgZSA9PiB7XG4gICAgICBsZXQgdXBsb2FkVGFyZ2V0ID0gZS50YXJnZXRcbiAgICAgIGlmKCFET00uaXNVcGxvYWRJbnB1dCh1cGxvYWRUYXJnZXQpKXsgcmV0dXJuIH1cbiAgICAgIGxldCBmaWxlcyA9IEFycmF5LmZyb20oZS5kZXRhaWwuZmlsZXMgfHwgW10pLmZpbHRlcihmID0+IGYgaW5zdGFuY2VvZiBGaWxlIHx8IGYgaW5zdGFuY2VvZiBCbG9iKVxuICAgICAgTGl2ZVVwbG9hZGVyLnRyYWNrRmlsZXModXBsb2FkVGFyZ2V0LCBmaWxlcylcbiAgICAgIHVwbG9hZFRhcmdldC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImlucHV0XCIsIHtidWJibGVzOiB0cnVlfSkpXG4gICAgfSlcbiAgfVxuXG4gIGV2ZW50TWV0YShldmVudE5hbWUsIGUsIHRhcmdldEVsKXtcbiAgICBsZXQgY2FsbGJhY2sgPSB0aGlzLm1ldGFkYXRhQ2FsbGJhY2tzW2V2ZW50TmFtZV1cbiAgICByZXR1cm4gY2FsbGJhY2sgPyBjYWxsYmFjayhlLCB0YXJnZXRFbCkgOiB7fVxuICB9XG5cbiAgc2V0UGVuZGluZ0xpbmsoaHJlZil7XG4gICAgdGhpcy5saW5rUmVmKytcbiAgICB0aGlzLnBlbmRpbmdMaW5rID0gaHJlZlxuICAgIHJldHVybiB0aGlzLmxpbmtSZWZcbiAgfVxuXG4gIGNvbW1pdFBlbmRpbmdMaW5rKGxpbmtSZWYpe1xuICAgIGlmKHRoaXMubGlua1JlZiAhPT0gbGlua1JlZil7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ocmVmID0gdGhpcy5wZW5kaW5nTGlua1xuICAgICAgdGhpcy5wZW5kaW5nTGluayA9IG51bGxcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgZ2V0SHJlZigpeyByZXR1cm4gdGhpcy5ocmVmIH1cblxuICBoYXNQZW5kaW5nTGluaygpeyByZXR1cm4gISF0aGlzLnBlbmRpbmdMaW5rIH1cblxuICBiaW5kKGV2ZW50cywgY2FsbGJhY2spe1xuICAgIGZvcihsZXQgZXZlbnQgaW4gZXZlbnRzKXtcbiAgICAgIGxldCBicm93c2VyRXZlbnROYW1lID0gZXZlbnRzW2V2ZW50XVxuXG4gICAgICB0aGlzLm9uKGJyb3dzZXJFdmVudE5hbWUsIGUgPT4ge1xuICAgICAgICBsZXQgYmluZGluZyA9IHRoaXMuYmluZGluZyhldmVudClcbiAgICAgICAgbGV0IHdpbmRvd0JpbmRpbmcgPSB0aGlzLmJpbmRpbmcoYHdpbmRvdy0ke2V2ZW50fWApXG4gICAgICAgIGxldCB0YXJnZXRQaHhFdmVudCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSAmJiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoYmluZGluZylcbiAgICAgICAgaWYodGFyZ2V0UGh4RXZlbnQpe1xuICAgICAgICAgIHRoaXMuZGVib3VuY2UoZS50YXJnZXQsIGUsIGJyb3dzZXJFdmVudE5hbWUsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soZSwgZXZlbnQsIHZpZXcsIGUudGFyZ2V0LCB0YXJnZXRQaHhFdmVudCwgbnVsbClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7d2luZG93QmluZGluZ31dYCwgZWwgPT4ge1xuICAgICAgICAgICAgbGV0IHBoeEV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKHdpbmRvd0JpbmRpbmcpXG4gICAgICAgICAgICB0aGlzLmRlYm91bmNlKGVsLCBlLCBicm93c2VyRXZlbnROYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMud2l0aGluT3duZXJzKGVsLCB2aWV3ID0+IHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlLCBldmVudCwgdmlldywgZWwsIHBoeEV2ZW50LCBcIndpbmRvd1wiKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGJpbmRDbGlja3MoKXtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4gdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCA9IGUudGFyZ2V0KVxuICAgIHRoaXMuYmluZENsaWNrKFwiY2xpY2tcIiwgXCJjbGlja1wiLCBmYWxzZSlcbiAgICB0aGlzLmJpbmRDbGljayhcIm1vdXNlZG93blwiLCBcImNhcHR1cmUtY2xpY2tcIiwgdHJ1ZSlcbiAgfVxuXG4gIGJpbmRDbGljayhldmVudE5hbWUsIGJpbmRpbmdOYW1lLCBjYXB0dXJlKXtcbiAgICBsZXQgY2xpY2sgPSB0aGlzLmJpbmRpbmcoYmluZGluZ05hbWUpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBlID0+IHtcbiAgICAgIGxldCB0YXJnZXQgPSBudWxsXG4gICAgICBpZihjYXB0dXJlKXtcbiAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQubWF0Y2hlcyhgWyR7Y2xpY2t9XWApID8gZS50YXJnZXQgOiBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKGBbJHtjbGlja31dYClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjbGlja1N0YXJ0ZWRBdFRhcmdldCA9IHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgfHwgZS50YXJnZXRcbiAgICAgICAgdGFyZ2V0ID0gY2xvc2VzdFBoeEJpbmRpbmcoY2xpY2tTdGFydGVkQXRUYXJnZXQsIGNsaWNrKVxuICAgICAgICB0aGlzLmRpc3BhdGNoQ2xpY2tBd2F5KGUsIGNsaWNrU3RhcnRlZEF0VGFyZ2V0KVxuICAgICAgICB0aGlzLmNsaWNrU3RhcnRlZEF0VGFyZ2V0ID0gbnVsbFxuICAgICAgfVxuICAgICAgbGV0IHBoeEV2ZW50ID0gdGFyZ2V0ICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoY2xpY2spXG4gICAgICBpZighcGh4RXZlbnQpe1xuICAgICAgICBsZXQgaHJlZiA9IGUudGFyZ2V0LmhyZWZcbiAgICAgICAgaWYoIWNhcHR1cmUgJiYgaHJlZiAhPT0gdW5kZWZpbmVkICYmICFET00ud2FudHNOZXdUYWIoZSkgJiYgRE9NLmlzTmV3UGFnZUhyZWYoaHJlZiwgd2luZG93LmxvY2F0aW9uKSl7XG4gICAgICAgICAgdGhpcy51bmxvYWQoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgICAgaWYodGFyZ2V0LmdldEF0dHJpYnV0ZShcImhyZWZcIikgPT09IFwiI1wiKXsgZS5wcmV2ZW50RGVmYXVsdCgpIH1cblxuICAgICAgdGhpcy5kZWJvdW5jZSh0YXJnZXQsIGUsIFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLndpdGhpbk93bmVycyh0YXJnZXQsIHZpZXcgPT4ge1xuICAgICAgICAgIEpTLmV4ZWMoXCJjbGlja1wiLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0LCBbXCJwdXNoXCIsIHtkYXRhOiB0aGlzLmV2ZW50TWV0YShcImNsaWNrXCIsIGUsIHRhcmdldCl9XSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSwgY2FwdHVyZSlcbiAgfVxuXG4gIGRpc3BhdGNoQ2xpY2tBd2F5KGUsIGNsaWNrU3RhcnRlZEF0KXtcbiAgICBsZXQgcGh4Q2xpY2tBd2F5ID0gdGhpcy5iaW5kaW5nKFwiY2xpY2stYXdheVwiKVxuICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHtwaHhDbGlja0F3YXl9XWAsIGVsID0+IHtcbiAgICAgIGlmKCEoZWwuaXNTYW1lTm9kZShjbGlja1N0YXJ0ZWRBdCkgfHwgZWwuY29udGFpbnMoY2xpY2tTdGFydGVkQXQpKSl7XG4gICAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgICBsZXQgcGh4RXZlbnQgPSBlbC5nZXRBdHRyaWJ1dGUocGh4Q2xpY2tBd2F5KVxuICAgICAgICAgIGlmKEpTLmlzVmlzaWJsZShlbCkpe1xuICAgICAgICAgICAgSlMuZXhlYyhcImNsaWNrXCIsIHBoeEV2ZW50LCB2aWV3LCBlbCwgW1wicHVzaFwiLCB7ZGF0YTogdGhpcy5ldmVudE1ldGEoXCJjbGlja1wiLCBlLCBlLnRhcmdldCl9XSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGJpbmROYXYoKXtcbiAgICBpZighQnJvd3Nlci5jYW5QdXNoU3RhdGUoKSl7IHJldHVybiB9XG4gICAgaWYoaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbil7IGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSBcIm1hbnVhbFwiIH1cbiAgICBsZXQgc2Nyb2xsVGltZXIgPSBudWxsXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgX2UgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVyKVxuICAgICAgc2Nyb2xsVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgQnJvd3Nlci51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUgPT4gT2JqZWN0LmFzc2lnbihzdGF0ZSwge3Njcm9sbDogd2luZG93LnNjcm9sbFl9KSlcbiAgICAgIH0sIDEwMClcbiAgICB9KVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZXZlbnQgPT4ge1xuICAgICAgaWYoIXRoaXMucmVnaXN0ZXJOZXdMb2NhdGlvbih3aW5kb3cubG9jYXRpb24pKXsgcmV0dXJuIH1cbiAgICAgIGxldCB7dHlwZSwgaWQsIHJvb3QsIHNjcm9sbH0gPSBldmVudC5zdGF0ZSB8fCB7fVxuICAgICAgbGV0IGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBpZih0aGlzLm1haW4uaXNDb25uZWN0ZWQoKSAmJiAodHlwZSA9PT0gXCJwYXRjaFwiICYmIGlkID09PSB0aGlzLm1haW4uaWQpKXtcbiAgICAgICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCBudWxsKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVwbGFjZU1haW4oaHJlZiwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYocm9vdCl7IHRoaXMucmVwbGFjZVJvb3RIaXN0b3J5KCkgfVxuICAgICAgICAgICAgaWYodHlwZW9mKHNjcm9sbCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsKVxuICAgICAgICAgICAgICB9LCAwKSAvLyB0aGUgYm9keSBuZWVkcyB0byByZW5kZXIgYmVmb3JlIHdlIHNjcm9sbC5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sIGZhbHNlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgdGFyZ2V0ID0gY2xvc2VzdFBoeEJpbmRpbmcoZS50YXJnZXQsIFBIWF9MSVZFX0xJTkspXG4gICAgICBsZXQgdHlwZSA9IHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFBIWF9MSVZFX0xJTkspXG4gICAgICBpZighdHlwZSB8fCAhdGhpcy5pc0Nvbm5lY3RlZCgpIHx8ICF0aGlzLm1haW4gfHwgRE9NLndhbnRzTmV3VGFiKGUpKXsgcmV0dXJuIH1cblxuICAgICAgbGV0IGhyZWYgPSB0YXJnZXQuaHJlZlxuICAgICAgbGV0IGxpbmtTdGF0ZSA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoUEhYX0xJTktfU1RBVEUpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCkgLy8gZG8gbm90IGJ1YmJsZSBjbGljayB0byByZWd1bGFyIHBoeC1jbGljayBiaW5kaW5nc1xuICAgICAgaWYodGhpcy5wZW5kaW5nTGluayA9PT0gaHJlZil7IHJldHVybiB9XG5cbiAgICAgIHRoaXMucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB7XG4gICAgICAgIGlmKHR5cGUgPT09IFwicGF0Y2hcIil7XG4gICAgICAgICAgdGhpcy5wdXNoSGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgdGFyZ2V0KVxuICAgICAgICB9IGVsc2UgaWYodHlwZSA9PT0gXCJyZWRpcmVjdFwiKXtcbiAgICAgICAgICB0aGlzLmhpc3RvcnlSZWRpcmVjdChocmVmLCBsaW5rU3RhdGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBleHBlY3RlZCAke1BIWF9MSVZFX0xJTkt9IHRvIGJlIFwicGF0Y2hcIiBvciBcInJlZGlyZWN0XCIsIGdvdDogJHt0eXBlfWApXG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBoeENsaWNrID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJjbGlja1wiKSlcbiAgICAgICAgaWYocGh4Q2xpY2spe1xuICAgICAgICAgIHRoaXMucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB0aGlzLmV4ZWNKUyh0YXJnZXQsIHBoeENsaWNrLCBcImNsaWNrXCIpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sIGZhbHNlKVxuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChldmVudCwgcGF5bG9hZCA9IHt9KXtcbiAgICBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIGBwaHg6JHtldmVudH1gLCB7ZGV0YWlsOiBwYXlsb2FkfSlcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnRzKGV2ZW50cyl7XG4gICAgZXZlbnRzLmZvckVhY2goKFtldmVudCwgcGF5bG9hZF0pID0+IHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCwgcGF5bG9hZCkpXG4gIH1cblxuICB3aXRoUGFnZUxvYWRpbmcoaW5mbywgY2FsbGJhY2spe1xuICAgIERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIHtkZXRhaWw6IGluZm99KVxuICAgIGxldCBkb25lID0gKCkgPT4gRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpwYWdlLWxvYWRpbmctc3RvcFwiLCB7ZGV0YWlsOiBpbmZvfSlcbiAgICByZXR1cm4gY2FsbGJhY2sgPyBjYWxsYmFjayhkb25lKSA6IGRvbmVcbiAgfVxuXG4gIHB1c2hIaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCB0YXJnZXRFbCl7XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiBCcm93c2VyLnJlZGlyZWN0KGhyZWYpIH1cblxuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJwYXRjaFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCB0YXJnZXRFbCwgbGlua1JlZiA9PiB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgbGlua1JlZilcbiAgICAgICAgZG9uZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBoaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCBsaW5rUmVmID0gdGhpcy5zZXRQZW5kaW5nTGluayhocmVmKSl7XG4gICAgaWYoIXRoaXMuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpeyByZXR1cm4gfVxuXG4gICAgQnJvd3Nlci5wdXNoU3RhdGUobGlua1N0YXRlLCB7dHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSwgaHJlZilcbiAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICB9XG5cbiAgaGlzdG9yeVJlZGlyZWN0KGhyZWYsIGxpbmtTdGF0ZSwgZmxhc2gpe1xuICAgIC8vIGNvbnZlcnQgdG8gZnVsbCBocmVmIGlmIG9ubHkgcGF0aCBwcmVmaXhcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIEJyb3dzZXIucmVkaXJlY3QoaHJlZiwgZmxhc2gpIH1cbiAgICBpZigvXlxcLyR8XlxcL1teXFwvXSsuKiQvLnRlc3QoaHJlZikpe1xuICAgICAgbGV0IHtwcm90b2NvbCwgaG9zdH0gPSB3aW5kb3cubG9jYXRpb25cbiAgICAgIGhyZWYgPSBgJHtwcm90b2NvbH0vLyR7aG9zdH0ke2hyZWZ9YFxuICAgIH1cbiAgICBsZXQgc2Nyb2xsID0gd2luZG93LnNjcm9sbFlcbiAgICB0aGlzLndpdGhQYWdlTG9hZGluZyh7dG86IGhyZWYsIGtpbmQ6IFwicmVkaXJlY3RcIn0sIGRvbmUgPT4ge1xuICAgICAgdGhpcy5yZXBsYWNlTWFpbihocmVmLCBmbGFzaCwgKCkgPT4ge1xuICAgICAgICBCcm93c2VyLnB1c2hTdGF0ZShsaW5rU3RhdGUsIHt0eXBlOiBcInJlZGlyZWN0XCIsIGlkOiB0aGlzLm1haW4uaWQsIHNjcm9sbDogc2Nyb2xsfSwgaHJlZilcbiAgICAgICAgdGhpcy5yZWdpc3Rlck5ld0xvY2F0aW9uKHdpbmRvdy5sb2NhdGlvbilcbiAgICAgICAgZG9uZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICByZXBsYWNlUm9vdEhpc3RvcnkoKXtcbiAgICBCcm93c2VyLnB1c2hTdGF0ZShcInJlcGxhY2VcIiwge3Jvb3Q6IHRydWUsIHR5cGU6IFwicGF0Y2hcIiwgaWQ6IHRoaXMubWFpbi5pZH0pXG4gIH1cblxuICByZWdpc3Rlck5ld0xvY2F0aW9uKG5ld0xvY2F0aW9uKXtcbiAgICBsZXQge3BhdGhuYW1lLCBzZWFyY2h9ID0gdGhpcy5jdXJyZW50TG9jYXRpb25cbiAgICBpZihwYXRobmFtZSArIHNlYXJjaCA9PT0gbmV3TG9jYXRpb24ucGF0aG5hbWUgKyBuZXdMb2NhdGlvbi5zZWFyY2gpe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gY2xvbmUobmV3TG9jYXRpb24pXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGJpbmRGb3Jtcygpe1xuICAgIGxldCBpdGVyYXRpb25zID0gMFxuICAgIGxldCBleHRlcm5hbEZvcm1TdWJtaXR0ZWQgPSBmYWxzZVxuXG4gICAgLy8gZGlzYWJsZSBmb3JtcyBvbiBzdWJtaXQgdGhhdCB0cmFjayBwaHgtY2hhbmdlIGJ1dCBwZXJmb3JtIGV4dGVybmFsIHN1Ym1pdFxuICAgIHRoaXMub24oXCJzdWJtaXRcIiwgZSA9PiB7XG4gICAgICBsZXQgcGh4U3VibWl0ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcInN1Ym1pdFwiKSlcbiAgICAgIGxldCBwaHhDaGFuZ2UgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpKVxuICAgICAgaWYoIWV4dGVybmFsRm9ybVN1Ym1pdHRlZCAmJiBwaHhDaGFuZ2UgJiYgIXBoeFN1Ym1pdCl7XG4gICAgICAgIGV4dGVybmFsRm9ybVN1Ym1pdHRlZCA9IHRydWVcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHRoaXMudW5sb2FkKClcbiAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoZS50YXJnZXQsIHZpZXcgPT4ge1xuICAgICAgICAgIHZpZXcuZGlzYWJsZUZvcm0oZS50YXJnZXQpXG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBlLnRhcmdldC5zdWJtaXQoKSkgLy8gc2FmYXJpIG5lZWRzIG5leHQgdGlja1xuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sIHRydWUpXG5cbiAgICB0aGlzLm9uKFwic3VibWl0XCIsIGUgPT4ge1xuICAgICAgbGV0IHBoeEV2ZW50ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcInN1Ym1pdFwiKSlcbiAgICAgIGlmKCFwaHhFdmVudCl7IHJldHVybiB0aGlzLnVubG9hZCgpIH1cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS50YXJnZXQuZGlzYWJsZWQgPSB0cnVlXG4gICAgICB0aGlzLndpdGhpbk93bmVycyhlLnRhcmdldCwgdmlldyA9PiB7XG4gICAgICAgIEpTLmV4ZWMoXCJzdWJtaXRcIiwgcGh4RXZlbnQsIHZpZXcsIGUudGFyZ2V0LCBbXCJwdXNoXCIsIHt9XSlcbiAgICAgIH0pXG4gICAgfSwgZmFsc2UpXG5cbiAgICBmb3IobGV0IHR5cGUgb2YgW1wiY2hhbmdlXCIsIFwiaW5wdXRcIl0pe1xuICAgICAgdGhpcy5vbih0eXBlLCBlID0+IHtcbiAgICAgICAgbGV0IHBoeENoYW5nZSA9IHRoaXMuYmluZGluZyhcImNoYW5nZVwiKVxuICAgICAgICBsZXQgaW5wdXQgPSBlLnRhcmdldFxuICAgICAgICBsZXQgaW5wdXRFdmVudCA9IGlucHV0LmdldEF0dHJpYnV0ZShwaHhDaGFuZ2UpXG4gICAgICAgIGxldCBmb3JtRXZlbnQgPSBpbnB1dC5mb3JtICYmIGlucHV0LmZvcm0uZ2V0QXR0cmlidXRlKHBoeENoYW5nZSlcbiAgICAgICAgbGV0IHBoeEV2ZW50ID0gaW5wdXRFdmVudCB8fCBmb3JtRXZlbnRcbiAgICAgICAgaWYoIXBoeEV2ZW50KXsgcmV0dXJuIH1cbiAgICAgICAgaWYoaW5wdXQudHlwZSA9PT0gXCJudW1iZXJcIiAmJiBpbnB1dC52YWxpZGl0eSAmJiBpbnB1dC52YWxpZGl0eS5iYWRJbnB1dCl7IHJldHVybiB9XG5cbiAgICAgICAgbGV0IGRpc3BhdGNoZXIgPSBpbnB1dEV2ZW50ID8gaW5wdXQgOiBpbnB1dC5mb3JtXG4gICAgICAgIGxldCBjdXJyZW50SXRlcmF0aW9ucyA9IGl0ZXJhdGlvbnNcbiAgICAgICAgaXRlcmF0aW9ucysrXG4gICAgICAgIGxldCB7YXQ6IGF0LCB0eXBlOiBsYXN0VHlwZX0gPSBET00ucHJpdmF0ZShpbnB1dCwgXCJwcmV2LWl0ZXJhdGlvblwiKSB8fCB7fVxuICAgICAgICAvLyBkZXRlY3QgZHVwIGJlY2F1c2Ugc29tZSBicm93c2VycyBkaXNwYXRjaCBib3RoIFwiaW5wdXRcIiBhbmQgXCJjaGFuZ2VcIlxuICAgICAgICBpZihhdCA9PT0gY3VycmVudEl0ZXJhdGlvbnMgLSAxICYmIHR5cGUgIT09IGxhc3RUeXBlKXsgcmV0dXJuIH1cblxuICAgICAgICBET00ucHV0UHJpdmF0ZShpbnB1dCwgXCJwcmV2LWl0ZXJhdGlvblwiLCB7YXQ6IGN1cnJlbnRJdGVyYXRpb25zLCB0eXBlOiB0eXBlfSlcblxuICAgICAgICB0aGlzLmRlYm91bmNlKGlucHV0LCBlLCB0eXBlLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoZGlzcGF0Y2hlciwgdmlldyA9PiB7XG4gICAgICAgICAgICBET00ucHV0UHJpdmF0ZShpbnB1dCwgUEhYX0hBU19GT0NVU0VELCB0cnVlKVxuICAgICAgICAgICAgaWYoIURPTS5pc1RleHR1YWxJbnB1dChpbnB1dCkpe1xuICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUVsZW1lbnQoaW5wdXQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBKUy5leGVjKFwiY2hhbmdlXCIsIHBoeEV2ZW50LCB2aWV3LCBpbnB1dCwgW1wicHVzaFwiLCB7X3RhcmdldDogZS50YXJnZXQubmFtZSwgZGlzcGF0Y2hlcjogZGlzcGF0Y2hlcn1dKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9LCBmYWxzZSlcbiAgICB9XG4gIH1cblxuICBkZWJvdW5jZShlbCwgZXZlbnQsIGV2ZW50VHlwZSwgY2FsbGJhY2spe1xuICAgIGlmKGV2ZW50VHlwZSA9PT0gXCJibHVyXCIgfHwgZXZlbnRUeXBlID09PSBcImZvY3Vzb3V0XCIpeyByZXR1cm4gY2FsbGJhY2soKSB9XG5cbiAgICBsZXQgcGh4RGVib3VuY2UgPSB0aGlzLmJpbmRpbmcoUEhYX0RFQk9VTkNFKVxuICAgIGxldCBwaHhUaHJvdHRsZSA9IHRoaXMuYmluZGluZyhQSFhfVEhST1RUTEUpXG4gICAgbGV0IGRlZmF1bHREZWJvdW5jZSA9IHRoaXMuZGVmYXVsdHMuZGVib3VuY2UudG9TdHJpbmcoKVxuICAgIGxldCBkZWZhdWx0VGhyb3R0bGUgPSB0aGlzLmRlZmF1bHRzLnRocm90dGxlLnRvU3RyaW5nKClcblxuICAgIHRoaXMud2l0aGluT3duZXJzKGVsLCB2aWV3ID0+IHtcbiAgICAgIGxldCBhc3luY0ZpbHRlciA9ICgpID0+ICF2aWV3LmlzRGVzdHJveWVkKCkgJiYgZG9jdW1lbnQuYm9keS5jb250YWlucyhlbClcbiAgICAgIERPTS5kZWJvdW5jZShlbCwgZXZlbnQsIHBoeERlYm91bmNlLCBkZWZhdWx0RGVib3VuY2UsIHBoeFRocm90dGxlLCBkZWZhdWx0VGhyb3R0bGUsIGFzeW5jRmlsdGVyLCAoKSA9PiB7XG4gICAgICAgIGNhbGxiYWNrKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHNpbGVuY2VFdmVudHMoY2FsbGJhY2spe1xuICAgIHRoaXMuc2lsZW5jZWQgPSB0cnVlXG4gICAgY2FsbGJhY2soKVxuICAgIHRoaXMuc2lsZW5jZWQgPSBmYWxzZVxuICB9XG5cbiAgb24oZXZlbnQsIGNhbGxiYWNrKXtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZSA9PiB7XG4gICAgICBpZighdGhpcy5zaWxlbmNlZCl7IGNhbGxiYWNrKGUpIH1cbiAgICB9KVxuICB9XG59XG5cbmNsYXNzIFRyYW5zaXRpb25TZXQge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMudHJhbnNpdGlvbnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLnBlbmRpbmdPcHMgPSBbXVxuICAgIHRoaXMucmVzZXQoKVxuICB9XG5cbiAgcmVzZXQoKXtcbiAgICB0aGlzLnRyYW5zaXRpb25zLmZvckVhY2godGltZXIgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKVxuICAgICAgdGhpcy50cmFuc2l0aW9ucy5kZWxldGUodGltZXIpXG4gICAgfSlcbiAgICB0aGlzLmZsdXNoUGVuZGluZ09wcygpXG4gIH1cblxuICBhZnRlcihjYWxsYmFjayl7XG4gICAgaWYodGhpcy5zaXplKCkgPT09IDApe1xuICAgICAgY2FsbGJhY2soKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1c2hQZW5kaW5nT3AoY2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgYWRkVHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpe1xuICAgIG9uU3RhcnQoKVxuICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmFuc2l0aW9ucy5kZWxldGUodGltZXIpXG4gICAgICBvbkRvbmUoKVxuICAgICAgaWYodGhpcy5zaXplKCkgPT09IDApeyB0aGlzLmZsdXNoUGVuZGluZ09wcygpIH1cbiAgICB9LCB0aW1lKVxuICAgIHRoaXMudHJhbnNpdGlvbnMuYWRkKHRpbWVyKVxuICB9XG5cbiAgcHVzaFBlbmRpbmdPcChvcCl7IHRoaXMucGVuZGluZ09wcy5wdXNoKG9wKSB9XG5cbiAgc2l6ZSgpeyByZXR1cm4gdGhpcy50cmFuc2l0aW9ucy5zaXplIH1cblxuICBmbHVzaFBlbmRpbmdPcHMoKXtcbiAgICB0aGlzLnBlbmRpbmdPcHMuZm9yRWFjaChvcCA9PiBvcCgpKVxuICAgIHRoaXMucGVuZGluZ09wcyA9IFtdXG4gIH1cbn1cbiIsICIvLyBXZSBpbXBvcnQgdGhlIENTUyB3aGljaCBpcyBleHRyYWN0ZWQgdG8gaXRzIG93biBmaWxlIGJ5IGVzYnVpbGQuXG4vLyBSZW1vdmUgdGhpcyBsaW5lIGlmIHlvdSBhZGQgYSB5b3VyIG93biBDU1MgYnVpbGQgcGlwZWxpbmUgKGUuZyBwb3N0Y3NzKS5cblxuLy8gSWYgeW91IHdhbnQgdG8gdXNlIFBob2VuaXggY2hhbm5lbHMsIHJ1biBgbWl4IGhlbHAgcGh4Lmdlbi5jaGFubmVsYFxuLy8gdG8gZ2V0IHN0YXJ0ZWQgYW5kIHRoZW4gdW5jb21tZW50IHRoZSBsaW5lIGJlbG93LlxuLy8gaW1wb3J0IFwiLi91c2VyX3NvY2tldC5qc1wiXG5cbi8vIFlvdSBjYW4gaW5jbHVkZSBkZXBlbmRlbmNpZXMgaW4gdHdvIHdheXMuXG4vL1xuLy8gVGhlIHNpbXBsZXN0IG9wdGlvbiBpcyB0byBwdXQgdGhlbSBpbiBhc3NldHMvdmVuZG9yIGFuZFxuLy8gaW1wb3J0IHRoZW0gdXNpbmcgcmVsYXRpdmUgcGF0aHM6XG4vL1xuLy8gICAgIGltcG9ydCBcIi4uL3ZlbmRvci9zb21lLXBhY2thZ2UuanNcIlxuLy9cbi8vIEFsdGVybmF0aXZlbHksIHlvdSBjYW4gYG5wbSBpbnN0YWxsIHNvbWUtcGFja2FnZSAtLXByZWZpeCBhc3NldHNgIGFuZCBpbXBvcnRcbi8vIHRoZW0gdXNpbmcgYSBwYXRoIHN0YXJ0aW5nIHdpdGggdGhlIHBhY2thZ2UgbmFtZTpcbi8vXG4vLyAgICAgaW1wb3J0IFwic29tZS1wYWNrYWdlXCJcbi8vXG5cbi8vIEluY2x1ZGUgcGhvZW5peF9odG1sIHRvIGhhbmRsZSBtZXRob2Q9UFVUL0RFTEVURSBpbiBmb3JtcyBhbmQgYnV0dG9ucy5cbmltcG9ydCBcInBob2VuaXhfaHRtbFwiXG4vLyBFc3RhYmxpc2ggUGhvZW5peCBTb2NrZXQgYW5kIExpdmVWaWV3IGNvbmZpZ3VyYXRpb24uXG5pbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuaW1wb3J0IHtMaXZlU29ja2V0fSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxuaW1wb3J0IHRocm90dGxlIGZyb20gJ2xvZGFzaC50aHJvdHRsZSdcbmltcG9ydCBcIi4vanNjb2xvci5qc1wiXG5cbmxldCB0aHJvdHRsZU1zID0gMTAwO1xubGV0IEhvb2tzID0ge31cblxuSG9va3MuQ29sb3JTZWxlY3RvciA9IHtcbiAgdGFyZ2V0KCkgeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJwaHgtdGFyZ2V0XCIpIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAganNjb2xvci5pbnN0YWxsKCk7XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFwiYnVpbGRcIiwgdGhyb3R0bGUoZSA9PiB7XG4gICAgICBjb25zdCBldiA9IGUuZGV0YWlsXG4gICAgICBjb25zdCBoZXggPSBldi50b0hFWFN0cmluZygpXG4gICAgICB0aGlzLnB1c2hFdmVudFRvKHRoaXMudGFyZ2V0KCksIFwiY29sb3JcIiwge2hleDogaGV4LCBjb25uTmFtZTogdGhpcy5lbC5kYXRhc2V0LmNvbm5OYW1lfSlcbiAgICB9LCB0aHJvdHRsZU1zKSlcbiAgfVxufVxuXG5Ib29rcy5CcmlnaHRuZXNzU2xpZGVyID0ge1xuICB0YXJnZXQoKSB7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShcInBoeC10YXJnZXRcIikgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB0aHJvdHRsZShlID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpXG4gICAgICB0aGlzLnB1c2hFdmVudFRvKHRoaXMudGFyZ2V0KCksIFwiYnJpZ2h0bmVzc1wiLCB7dmFsdWU6IHZhbHVlLCBjb25uTmFtZTogdGhpcy5lbC5kYXRhc2V0LmNvbm5OYW1lfSlcbiAgICB9LCB0aHJvdHRsZU1zKSlcbiAgfVxufVxuXG5Ib29rcy5XaGl0ZVNsaWRlciA9IHtcbiAgdGFyZ2V0KCkgeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJwaHgtdGFyZ2V0XCIpIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhyb3R0bGUoZSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKVxuICAgICAgdGhpcy5wdXNoRXZlbnRUbyh0aGlzLnRhcmdldCgpLCBcIndoaXRlLXNsaWRlclwiLCB7dmFsdWU6IHZhbHVlLCBjb25uTmFtZTogdGhpcy5lbC5kYXRhc2V0LmNvbm5OYW1lfSlcbiAgICB9LCB0aHJvdHRsZU1zKSlcbiAgfVxufVxuXG53aW5kb3cudXBkYXRlID0gZnVuY3Rpb24oY29sb3JFdmVudCkge1xuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnYnVpbGQnLCB7ZGV0YWlsOiBjb2xvckV2ZW50fSk7XG4gIGNvbG9yRXZlbnQucHJldmlld0VsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG59XG5pbXBvcnQgdG9wYmFyIGZyb20gXCIuLi92ZW5kb3IvdG9wYmFyXCJcblxubGV0IGNzcmZUb2tlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtZXRhW25hbWU9J2NzcmYtdG9rZW4nXVwiKS5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpXG5sZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7aG9va3M6IEhvb2tzLCBwYXJhbXM6IHtfY3NyZl90b2tlbjogY3NyZlRva2VufX0pXG5cbi8vIFNob3cgcHJvZ3Jlc3MgYmFyIG9uIGxpdmUgbmF2aWdhdGlvbiBhbmQgZm9ybSBzdWJtaXRzXG50b3BiYXIuY29uZmlnKHtiYXJDb2xvcnM6IHswOiBcIiMyOWRcIn0sIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwgMCwgMCwgLjMpXCJ9KVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIGluZm8gPT4gdG9wYmFyLnNob3coKSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGh4OnBhZ2UtbG9hZGluZy1zdG9wXCIsIGluZm8gPT4gdG9wYmFyLmhpZGUoKSlcblxuLy8gY29ubmVjdCBpZiB0aGVyZSBhcmUgYW55IExpdmVWaWV3cyBvbiB0aGUgcGFnZVxubGl2ZVNvY2tldC5jb25uZWN0KClcblxuLy8gZXhwb3NlIGxpdmVTb2NrZXQgb24gd2luZG93IGZvciB3ZWIgY29uc29sZSBkZWJ1ZyBsb2dzIGFuZCBsYXRlbmN5IHNpbXVsYXRpb246XG4vLyA+PiBsaXZlU29ja2V0LmVuYWJsZURlYnVnKClcbi8vID4+IGxpdmVTb2NrZXQuZW5hYmxlTGF0ZW5jeVNpbSgxMDAwKSAgLy8gZW5hYmxlZCBmb3IgZHVyYXRpb24gb2YgYnJvd3NlciBzZXNzaW9uXG4vLyA+PiBsaXZlU29ja2V0LmRpc2FibGVMYXRlbmN5U2ltKClcbndpbmRvdy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuXG4iLCAiLyoqXHJcbiAqIGpzY29sb3IgLSBKYXZhU2NyaXB0IENvbG9yIFBpY2tlclxyXG4gKlxyXG4gKiBAbGluayAgICBodHRwOi8vanNjb2xvci5jb21cclxuICogQGxpY2Vuc2UgRm9yIG9wZW4gc291cmNlIHVzZTogR1BMdjNcclxuICogICAgICAgICAgRm9yIGNvbW1lcmNpYWwgdXNlOiBKU0NvbG9yIENvbW1lcmNpYWwgTGljZW5zZVxyXG4gKiBAYXV0aG9yICBKYW4gT2R2YXJrbyAtIEVhc3QgRGVzaXJlXHJcbiAqIEB2ZXJzaW9uIDIuMy4zXHJcbiAqXHJcbiAqIFNlZSB1c2FnZSBleGFtcGxlcyBhdCBodHRwOi8vanNjb2xvci5jb20vZXhhbXBsZXMvXHJcbiAqL1xyXG5cclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuXHJcbmlmICghd2luZG93LmpzY29sb3IpIHtcclxuXHJcbndpbmRvdy5qc2NvbG9yID0gKGZ1bmN0aW9uICgpIHsgLy8gQkVHSU4gd2luZG93LmpzY29sb3JcclxuXHJcbnZhciBqc2MgPSB7XHJcblxyXG5cclxuXHRpbml0aWFsaXplZCA6IGZhbHNlLFxyXG5cclxuXHRpbnN0YW5jZXMgOiBbXSwgLy8gY3JlYXRlZCBpbnN0YW5jZXMgb2YganNjb2xvclxyXG5cclxuXHR0cmlnZ2VyUXVldWUgOiBbXSwgLy8gZXZlbnRzIHdhaXRpbmcgdG8gYmUgdHJpZ2dlcmVkIGFmdGVyIGluaXRcclxuXHJcblxyXG5cdHJlZ2lzdGVyIDogZnVuY3Rpb24gKCkge1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGpzYy5pbml0LCBmYWxzZSk7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBqc2Mub25Eb2N1bWVudE1vdXNlRG93biwgZmFsc2UpO1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBqc2Mub25Eb2N1bWVudEtleVVwLCBmYWxzZSk7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywganNjLm9uV2luZG93UmVzaXplLCBmYWxzZSk7XHJcblx0fSxcclxuXHJcblxyXG5cdGluaXQgOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoanNjLmluaXRpYWxpemVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRqc2MucHViLmluc3RhbGwoKTtcclxuXHRcdGpzYy5pbml0aWFsaXplZCA9IHRydWU7XHJcblxyXG5cdFx0Ly8gdHJpZ2dlciBldmVudHMgd2FpdGluZyBpbiB0aGUgcXVldWVcclxuXHRcdHdoaWxlIChqc2MudHJpZ2dlclF1ZXVlLmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgZXYgPSBqc2MudHJpZ2dlclF1ZXVlLnNoaWZ0KCk7XHJcblx0XHRcdGpzYy50cmlnZ2VyR2xvYmFsKGV2KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0aW5zdGFsbEJ5U2VsZWN0b3IgOiBmdW5jdGlvbiAoc2VsZWN0b3IsIHJvb3ROb2RlKSB7XHJcblx0XHRyb290Tm9kZSA9IHJvb3ROb2RlID8ganNjLm5vZGUocm9vdE5vZGUpIDogZG9jdW1lbnQ7XHJcblx0XHRpZiAoIXJvb3ROb2RlKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyByb290IG5vZGUnKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZWxtcyA9IHJvb3ROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRcdC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggREVQUkVDQVRFRCBpbnN0YWxsYXRpb24vY29uZmlndXJhdGlvbiB1c2luZyBjbGFzc05hbWVcclxuXHRcdHZhciBtYXRjaENsYXNzID0gbmV3IFJlZ0V4cCgnKF58XFxcXHMpKCcgKyBqc2MucHViLmxvb2t1cENsYXNzICsgJykoXFxcXHMqKFxcXFx7W159XSpcXFxcfSl8XFxcXHN8JCknLCAnaScpO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cclxuXHRcdFx0aWYgKGVsbXNbaV0uanNjb2xvciAmJiBlbG1zW2ldLmpzY29sb3IgaW5zdGFuY2VvZiBqc2MucHViKSB7XHJcblx0XHRcdFx0Y29udGludWU7IC8vIGpzY29sb3IgYWxyZWFkeSBpbnN0YWxsZWQgb24gdGhpcyBlbGVtZW50XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlbG1zW2ldLnR5cGUgIT09IHVuZGVmaW5lZCAmJiBlbG1zW2ldLnR5cGUudG9Mb3dlckNhc2UoKSA9PSAnY29sb3InICYmIGpzYy5pc0NvbG9yQXR0clN1cHBvcnRlZCkge1xyXG5cdFx0XHRcdGNvbnRpbnVlOyAvLyBza2lwcyBpbnB1dHMgb2YgdHlwZSAnY29sb3InIGlmIHN1cHBvcnRlZCBieSB0aGUgYnJvd3NlclxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgZGF0YU9wdHMsIG07XHJcblxyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0KGRhdGFPcHRzID0ganNjLmdldERhdGFBdHRyKGVsbXNbaV0sICdqc2NvbG9yJykpICE9PSBudWxsIHx8XHJcblx0XHRcdFx0KGVsbXNbaV0uY2xhc3NOYW1lICYmIChtID0gZWxtc1tpXS5jbGFzc05hbWUubWF0Y2gobWF0Y2hDbGFzcykpKSAvLyBpbnN0YWxsYXRpb24gdXNpbmcgY2xhc3NOYW1lIChERVBSRUNBVEVEKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHR2YXIgdGFyZ2V0RWxtID0gZWxtc1tpXTtcclxuXHJcblx0XHRcdFx0dmFyIG9wdHNTdHIgPSAnJztcclxuXHRcdFx0XHRpZiAoZGF0YU9wdHMgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdG9wdHNTdHIgPSBkYXRhT3B0cztcclxuXHJcblx0XHRcdFx0fSBlbHNlIGlmIChtKSB7IC8vIGluc3RhbGxhdGlvbiB1c2luZyBjbGFzc05hbWUgKERFUFJFQ0FURUQpXHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0luc3RhbGxhdGlvbiB1c2luZyBjbGFzcyBuYW1lIGlzIERFUFJFQ0FURUQuIFVzZSBkYXRhLWpzY29sb3I9XCJcIiBhdHRyaWJ1dGUgaW5zdGVhZC4nICsganNjLmRvY3NSZWYpO1xyXG5cdFx0XHRcdFx0aWYgKG1bNF0pIHtcclxuXHRcdFx0XHRcdFx0b3B0c1N0ciA9IG1bNF07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR2YXIgb3B0cyA9IG51bGw7XHJcblx0XHRcdFx0aWYgKG9wdHNTdHIudHJpbSgpKSB7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRvcHRzID0ganNjLnBhcnNlT3B0aW9uc1N0cihvcHRzU3RyKTtcclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGUgKyAnXFxuJyArIG9wdHNTdHIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdG5ldyBqc2MucHViKHRhcmdldEVsbSwgb3B0cyk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRwYXJzZU9wdGlvbnNTdHIgOiBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHR2YXIgb3B0cyA9IG51bGw7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0b3B0cyA9IEpTT04ucGFyc2Uoc3RyKTtcclxuXHJcblx0XHR9IGNhdGNoIChlUGFyc2UpIHtcclxuXHRcdFx0aWYgKCFqc2MucHViLmxvb3NlSlNPTikge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHBhcnNlIGpzY29sb3Igb3B0aW9ucyBhcyBKU09OOiAnICsgZVBhcnNlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBsb29zZSBKU09OIHN5bnRheCBpcyBlbmFibGVkIC0+IHRyeSB0byBldmFsdWF0ZSB0aGUgb3B0aW9ucyBzdHJpbmcgYXMgSmF2YVNjcmlwdCBvYmplY3RcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0b3B0cyA9IChuZXcgRnVuY3Rpb24gKCd2YXIgb3B0cyA9ICgnICsgc3RyICsgJyk7IHJldHVybiB0eXBlb2Ygb3B0cyA9PT0gXCJvYmplY3RcIiA/IG9wdHMgOiB7fTsnKSkoKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlRXZhbCkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZXZhbHVhdGUganNjb2xvciBvcHRpb25zOiAnICsgZUV2YWwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG9wdHM7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldEluc3RhbmNlcyA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBpbnN0ID0gW107XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGpzYy5pbnN0YW5jZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuXHRcdFx0Ly8gaWYgdGhlIHRhcmdldEVsZW1lbnQgc3RpbGwgZXhpc3RzLCB0aGUgaW5zdGFuY2UgaXMgY29uc2lkZXJlZCBcImFsaXZlXCJcclxuXHRcdFx0aWYgKGpzYy5pbnN0YW5jZXNbaV0gJiYganNjLmluc3RhbmNlc1tpXS50YXJnZXRFbGVtZW50KSB7XHJcblx0XHRcdFx0aW5zdC5wdXNoKGpzYy5pbnN0YW5jZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaW5zdDtcclxuXHR9LFxyXG5cclxuXHJcblx0Y3JlYXRlRWwgOiBmdW5jdGlvbiAodGFnTmFtZSkge1xyXG5cdFx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcclxuXHRcdGpzYy5zZXREYXRhKGVsLCAnZ3VpJywgdHJ1ZSlcclxuXHRcdHJldHVybiBlbDtcclxuXHR9LFxyXG5cclxuXHJcblx0bm9kZSA6IGZ1bmN0aW9uIChub2RlT3JTZWxlY3Rvcikge1xyXG5cdFx0aWYgKCFub2RlT3JTZWxlY3Rvcikge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG5vZGVPclNlbGVjdG9yID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHQvLyBxdWVyeSBzZWxlY3RvclxyXG5cdFx0XHR2YXIgc2VsID0gbm9kZU9yU2VsZWN0b3I7XHJcblx0XHRcdHZhciBlbCA9IG51bGw7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oZSk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFlbCkge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybignTm8gZWxlbWVudCBtYXRjaGVzIHRoZSBzZWxlY3RvcjogJXMnLCBzZWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBlbDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoanNjLmlzTm9kZShub2RlT3JTZWxlY3RvcikpIHtcclxuXHRcdFx0Ly8gRE9NIG5vZGVcclxuXHRcdFx0cmV0dXJuIG5vZGVPclNlbGVjdG9yO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUud2FybignSW52YWxpZCBub2RlIG9mIHR5cGUgJXM6ICVzJywgdHlwZW9mIG5vZGVPclNlbGVjdG9yLCBub2RlT3JTZWxlY3Rvcik7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM4NDI4Ni9cclxuXHRpc05vZGUgOiBmdW5jdGlvbiAodmFsKSB7XHJcblx0XHRpZiAodHlwZW9mIE5vZGUgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiB2YWwgaW5zdGFuY2VvZiBOb2RlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsLm5vZGVUeXBlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdmFsLm5vZGVOYW1lID09PSAnc3RyaW5nJztcclxuXHR9LFxyXG5cclxuXHJcblx0bm9kZU5hbWUgOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlTmFtZSkge1xyXG5cdFx0XHRyZXR1cm4gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cclxuXHRyZW1vdmVDaGlsZHJlbiA6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHR3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XHJcblx0XHRcdG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0aXNUZXh0SW5wdXQgOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdHJldHVybiBlbCAmJiBqc2Mubm9kZU5hbWUoZWwpID09PSAnaW5wdXQnICYmIGVsLnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHQnO1xyXG5cdH0sXHJcblxyXG5cclxuXHRpc0J1dHRvbiA6IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0aWYgKCFlbCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHR2YXIgbiA9IGpzYy5ub2RlTmFtZShlbCk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQobiA9PT0gJ2J1dHRvbicpIHx8XHJcblx0XHRcdChuID09PSAnaW5wdXQnICYmIFsnYnV0dG9uJywgJ3N1Ym1pdCcsICdyZXNldCddLmluZGV4T2YoZWwudHlwZS50b0xvd2VyQ2FzZSgpKSA+IC0xKVxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHJcblx0aXNCdXR0b25FbXB0eSA6IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0c3dpdGNoIChqc2Mubm9kZU5hbWUoZWwpKSB7XHJcblx0XHRcdGNhc2UgJ2lucHV0JzogcmV0dXJuICghZWwudmFsdWUgfHwgZWwudmFsdWUudHJpbSgpID09PSAnJyk7XHJcblx0XHRcdGNhc2UgJ2J1dHRvbic6IHJldHVybiAoZWwudGV4dENvbnRlbnQudHJpbSgpID09PSAnJyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDsgLy8gY291bGQgbm90IGRldGVybWluZSBlbGVtZW50J3MgdGV4dFxyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1dJQ0cvRXZlbnRMaXN0ZW5lck9wdGlvbnMvYmxvYi9naC1wYWdlcy9leHBsYWluZXIubWRcclxuXHRpc1Bhc3NpdmVFdmVudFN1cHBvcnRlZCA6IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgc3VwcG9ydGVkID0gZmFsc2U7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xyXG5cdFx0XHRcdGdldDogZnVuY3Rpb24gKCkgeyBzdXBwb3J0ZWQgPSB0cnVlOyB9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmUnLCBudWxsLCBvcHRzKTtcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cyk7XHJcblx0XHR9IGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdHJldHVybiBzdXBwb3J0ZWQ7XHJcblx0fSkoKSxcclxuXHJcblxyXG5cdGlzQ29sb3JBdHRyU3VwcG9ydGVkIDogKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdFx0aWYgKGVsbS5zZXRBdHRyaWJ1dGUpIHtcclxuXHRcdFx0ZWxtLnNldEF0dHJpYnV0ZSgndHlwZScsICdjb2xvcicpO1xyXG5cdFx0XHRpZiAoZWxtLnR5cGUudG9Mb3dlckNhc2UoKSA9PSAnY29sb3InKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KSgpLFxyXG5cclxuXHJcblx0ZGF0YVByb3AgOiAnX2RhdGFfanNjb2xvcicsXHJcblxyXG5cclxuXHQvLyB1c2FnZTpcclxuXHQvLyAgIHNldERhdGEob2JqLCBwcm9wLCB2YWx1ZSlcclxuXHQvLyAgIHNldERhdGEob2JqLCB7cHJvcDp2YWx1ZSwgLi4ufSlcclxuXHQvL1xyXG5cdHNldERhdGEgOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgb2JqID0gYXJndW1lbnRzWzBdO1xyXG5cclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XHJcblx0XHRcdC8vIHNldHRpbmcgYSBzaW5nbGUgcHJvcGVydHlcclxuXHRcdFx0dmFyIGRhdGEgPSBvYmouaGFzT3duUHJvcGVydHkoanNjLmRhdGFQcm9wKSA/IG9ialtqc2MuZGF0YVByb3BdIDogKG9ialtqc2MuZGF0YVByb3BdID0ge30pO1xyXG5cdFx0XHR2YXIgcHJvcCA9IGFyZ3VtZW50c1sxXTtcclxuXHRcdFx0dmFyIHZhbHVlID0gYXJndW1lbnRzWzJdO1xyXG5cclxuXHRcdFx0ZGF0YVtwcm9wXSA9IHZhbHVlO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Ly8gc2V0dGluZyBtdWx0aXBsZSBwcm9wZXJ0aWVzXHJcblx0XHRcdHZhciBkYXRhID0gb2JqLmhhc093blByb3BlcnR5KGpzYy5kYXRhUHJvcCkgPyBvYmpbanNjLmRhdGFQcm9wXSA6IChvYmpbanNjLmRhdGFQcm9wXSA9IHt9KTtcclxuXHRcdFx0dmFyIG1hcCA9IGFyZ3VtZW50c1sxXTtcclxuXHJcblx0XHRcdGZvciAodmFyIHByb3AgaW4gbWFwKSB7XHJcblx0XHRcdFx0aWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG5cdFx0XHRcdFx0ZGF0YVtwcm9wXSA9IG1hcFtwcm9wXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyB1c2FnZTpcclxuXHQvLyAgIHJlbW92ZURhdGEob2JqLCBwcm9wLCBbcHJvcC4uLl0pXHJcblx0Ly9cclxuXHRyZW1vdmVEYXRhIDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG9iaiA9IGFyZ3VtZW50c1swXTtcclxuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGpzYy5kYXRhUHJvcCkpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7IC8vIGRhdGEgb2JqZWN0IGRvZXMgbm90IGV4aXN0XHJcblx0XHR9XHJcblx0XHRmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHR2YXIgcHJvcCA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdFx0ZGVsZXRlIG9ialtqc2MuZGF0YVByb3BdW3Byb3BdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldERhdGEgOiBmdW5jdGlvbiAob2JqLCBwcm9wLCBzZXREZWZhdWx0KSB7XHJcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShqc2MuZGF0YVByb3ApKSB7XHJcblx0XHRcdC8vIGRhdGEgb2JqZWN0IGRvZXMgbm90IGV4aXN0XHJcblx0XHRcdGlmIChzZXREZWZhdWx0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRvYmpbanNjLmRhdGFQcm9wXSA9IHt9OyAvLyBjcmVhdGUgZGF0YSBvYmplY3RcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkOyAvLyBubyB2YWx1ZSB0byByZXR1cm5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dmFyIGRhdGEgPSBvYmpbanNjLmRhdGFQcm9wXTtcclxuXHJcblx0XHRpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgc2V0RGVmYXVsdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGRhdGFbcHJvcF0gPSBzZXREZWZhdWx0O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRhdGFbcHJvcF07XHJcblx0fSxcclxuXHJcblxyXG5cdGdldERhdGFBdHRyIDogZnVuY3Rpb24gKGVsLCBuYW1lKSB7XHJcblx0XHR2YXIgYXR0ck5hbWUgPSAnZGF0YS0nICsgbmFtZTtcclxuXHRcdHZhciBhdHRyVmFsdWUgPSBlbC5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG5cdFx0cmV0dXJuIGF0dHJWYWx1ZTtcclxuXHR9LFxyXG5cclxuXHJcblx0X2F0dGFjaGVkR3JvdXBFdmVudHMgOiB7fSxcclxuXHJcblxyXG5cdGF0dGFjaEdyb3VwRXZlbnQgOiBmdW5jdGlvbiAoZ3JvdXBOYW1lLCBlbCwgZXZudCwgZnVuYykge1xyXG5cdFx0aWYgKCFqc2MuX2F0dGFjaGVkR3JvdXBFdmVudHMuaGFzT3duUHJvcGVydHkoZ3JvdXBOYW1lKSkge1xyXG5cdFx0XHRqc2MuX2F0dGFjaGVkR3JvdXBFdmVudHNbZ3JvdXBOYW1lXSA9IFtdO1xyXG5cdFx0fVxyXG5cdFx0anNjLl9hdHRhY2hlZEdyb3VwRXZlbnRzW2dyb3VwTmFtZV0ucHVzaChbZWwsIGV2bnQsIGZ1bmNdKTtcclxuXHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZudCwgZnVuYywgZmFsc2UpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRkZXRhY2hHcm91cEV2ZW50cyA6IGZ1bmN0aW9uIChncm91cE5hbWUpIHtcclxuXHRcdGlmIChqc2MuX2F0dGFjaGVkR3JvdXBFdmVudHMuaGFzT3duUHJvcGVydHkoZ3JvdXBOYW1lKSkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGpzYy5fYXR0YWNoZWRHcm91cEV2ZW50c1tncm91cE5hbWVdLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0dmFyIGV2dCA9IGpzYy5fYXR0YWNoZWRHcm91cEV2ZW50c1tncm91cE5hbWVdW2ldO1xyXG5cdFx0XHRcdGV2dFswXS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFsxXSwgZXZ0WzJdLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZGVsZXRlIGpzYy5fYXR0YWNoZWRHcm91cEV2ZW50c1tncm91cE5hbWVdO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRwcmV2ZW50RGVmYXVsdCA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoZS5wcmV2ZW50RGVmYXVsdCkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH1cclxuXHRcdGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHJcblx0Y2FwdHVyZVRhcmdldCA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuXHRcdC8vIElFXHJcblx0XHRpZiAodGFyZ2V0LnNldENhcHR1cmUpIHtcclxuXHRcdFx0anNjLl9jYXB0dXJlZFRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0anNjLl9jYXB0dXJlZFRhcmdldC5zZXRDYXB0dXJlKCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdHJlbGVhc2VUYXJnZXQgOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQvLyBJRVxyXG5cdFx0aWYgKGpzYy5fY2FwdHVyZWRUYXJnZXQpIHtcclxuXHRcdFx0anNjLl9jYXB0dXJlZFRhcmdldC5yZWxlYXNlQ2FwdHVyZSgpO1xyXG5cdFx0XHRqc2MuX2NhcHR1cmVkVGFyZ2V0ID0gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0dHJpZ2dlckV2ZW50IDogZnVuY3Rpb24gKGVsLCBldmVudE5hbWUsIGJ1YmJsZXMsIGNhbmNlbGFibGUpIHtcclxuXHRcdGlmICghZWwpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBldiA9IG51bGw7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRldiA9IG5ldyBFdmVudChldmVudE5hbWUsIHtcclxuXHRcdFx0XHRidWJibGVzOiBidWJibGVzLFxyXG5cdFx0XHRcdGNhbmNlbGFibGU6IGNhbmNlbGFibGVcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBJRVxyXG5cdFx0XHRldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xyXG5cdFx0XHRldi5pbml0RXZlbnQoZXZlbnROYW1lLCBidWJibGVzLCBjYW5jZWxhYmxlKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWV2KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBzbyB0aGF0IHdlIGtub3cgdGhhdCB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBpbnRlcm5hbGx5XHJcblx0XHRqc2Muc2V0RGF0YShldiwgJ2ludGVybmFsJywgdHJ1ZSk7XHJcblxyXG5cdFx0ZWwuZGlzcGF0Y2hFdmVudChldik7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHJcblx0dHJpZ2dlcklucHV0RXZlbnQgOiBmdW5jdGlvbiAoZWwsIGV2ZW50TmFtZSwgYnViYmxlcywgY2FuY2VsYWJsZSkge1xyXG5cdFx0aWYgKCFlbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZiAoanNjLmlzVGV4dElucHV0KGVsKSkge1xyXG5cdFx0XHRqc2MudHJpZ2dlckV2ZW50KGVsLCBldmVudE5hbWUsIGJ1YmJsZXMsIGNhbmNlbGFibGUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRldmVudEtleSA6IGZ1bmN0aW9uIChldikge1xyXG5cdFx0dmFyIGtleXMgPSB7XHJcblx0XHRcdDk6ICdUYWInLFxyXG5cdFx0XHQxMzogJ0VudGVyJyxcclxuXHRcdFx0Mjc6ICdFc2NhcGUnLFxyXG5cdFx0fTtcclxuXHRcdGlmICh0eXBlb2YgZXYuY29kZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cmV0dXJuIGV2LmNvZGU7XHJcblx0XHR9IGVsc2UgaWYgKGV2LmtleUNvZGUgIT09IHVuZGVmaW5lZCAmJiBrZXlzLmhhc093blByb3BlcnR5KGV2LmtleUNvZGUpKSB7XHJcblx0XHRcdHJldHVybiBrZXlzW2V2LmtleUNvZGVdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fSxcclxuXHJcblxyXG5cdHN0ckxpc3QgOiBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHRpZiAoIXN0cikge1xyXG5cdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKS5zcGxpdCgvXFxzKy8pO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBUaGUgY2xhc3NOYW1lIHBhcmFtZXRlciAoc3RyKSBjYW4gb25seSBjb250YWluIGEgc2luZ2xlIGNsYXNzIG5hbWVcclxuXHRoYXNDbGFzcyA6IGZ1bmN0aW9uIChlbG0sIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKCFjbGFzc05hbWUpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGVsbS5jbGFzc0xpc3QgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxtLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gcG9seWZpbGxcclxuXHRcdHJldHVybiAtMSAhPSAoJyAnICsgZWxtLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnICcpLmluZGV4T2YoJyAnICsgY2xhc3NOYW1lICsgJyAnKTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gVGhlIGNsYXNzTmFtZSBwYXJhbWV0ZXIgKHN0cikgY2FuIGNvbnRhaW4gbXVsdGlwbGUgY2xhc3MgbmFtZXMgc2VwYXJhdGVkIGJ5IHdoaXRlc3BhY2VcclxuXHRhZGRDbGFzcyA6IGZ1bmN0aW9uIChlbG0sIGNsYXNzTmFtZSkge1xyXG5cdFx0dmFyIGNsYXNzTmFtZXMgPSBqc2Muc3RyTGlzdChjbGFzc05hbWUpO1xyXG5cclxuXHRcdGlmIChlbG0uY2xhc3NMaXN0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc05hbWVzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0ZWxtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8gcG9seWZpbGxcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NOYW1lcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRpZiAoIWpzYy5oYXNDbGFzcyhlbG0sIGNsYXNzTmFtZXNbaV0pKSB7XHJcblx0XHRcdFx0ZWxtLmNsYXNzTmFtZSArPSAoZWxtLmNsYXNzTmFtZSA/ICcgJyA6ICcnKSArIGNsYXNzTmFtZXNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gVGhlIGNsYXNzTmFtZSBwYXJhbWV0ZXIgKHN0cikgY2FuIGNvbnRhaW4gbXVsdGlwbGUgY2xhc3MgbmFtZXMgc2VwYXJhdGVkIGJ5IHdoaXRlc3BhY2VcclxuXHRyZW1vdmVDbGFzcyA6IGZ1bmN0aW9uIChlbG0sIGNsYXNzTmFtZSkge1xyXG5cdFx0dmFyIGNsYXNzTmFtZXMgPSBqc2Muc3RyTGlzdChjbGFzc05hbWUpO1xyXG5cclxuXHRcdGlmIChlbG0uY2xhc3NMaXN0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc05hbWVzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0ZWxtLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8gcG9seWZpbGxcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NOYW1lcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHR2YXIgcmVwbCA9IG5ldyBSZWdFeHAoXHJcblx0XHRcdFx0J15cXFxccyonICsgY2xhc3NOYW1lc1tpXSArICdcXFxccyp8JyArXHJcblx0XHRcdFx0J1xcXFxzKicgKyBjbGFzc05hbWVzW2ldICsgJ1xcXFxzKiR8JyArXHJcblx0XHRcdFx0J1xcXFxzKycgKyBjbGFzc05hbWVzW2ldICsgJyhcXFxccyspJyxcclxuXHRcdFx0XHQnZydcclxuXHRcdFx0KTtcclxuXHRcdFx0ZWxtLmNsYXNzTmFtZSA9IGVsbS5jbGFzc05hbWUucmVwbGFjZShyZXBsLCAnJDEnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0Z2V0Q29tcFN0eWxlIDogZnVuY3Rpb24gKGVsbSkge1xyXG5cdFx0dmFyIGNvbXBTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxtKSA6IGVsbS5jdXJyZW50U3R5bGU7XHJcblxyXG5cdFx0Ly8gTm90ZTogSW4gRmlyZWZveCwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gYSBoaWRkZW4gaWZyYW1lLFxyXG5cdFx0Ly8gdGhhdCdzIHdoeSB3ZSBuZWVkIHRvIGNoZWNrIGlmIHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBub24tZW1wdHlcclxuXHRcdGlmICghY29tcFN0eWxlKSB7XHJcblx0XHRcdHJldHVybiB7fTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBjb21wU3R5bGU7XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIE5vdGU6XHJcblx0Ly8gICBTZXR0aW5nIGEgcHJvcGVydHkgdG8gTlVMTCByZXZlcnRzIGl0IHRvIHRoZSBzdGF0ZSBiZWZvcmUgaXQgd2FzIGZpcnN0IHNldFxyXG5cdC8vICAgd2l0aCB0aGUgJ3JldmVyc2libGUnIGZsYWcgZW5hYmxlZFxyXG5cdC8vXHJcblx0c2V0U3R5bGUgOiBmdW5jdGlvbiAoZWxtLCBzdHlsZXMsIGltcG9ydGFudCwgcmV2ZXJzaWJsZSkge1xyXG5cdFx0Ly8gdXNpbmcgJycgZm9yIHN0YW5kYXJkIHByaW9yaXR5IChJRTEwIGFwcGFyZW50bHkgZG9lc24ndCBsaWtlIHZhbHVlIHVuZGVmaW5lZClcclxuXHRcdHZhciBwcmlvcml0eSA9IGltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJyc7XHJcblx0XHR2YXIgb3JpZ1N0eWxlID0gbnVsbDtcclxuXHJcblx0XHRmb3IgKHZhciBwcm9wIGluIHN0eWxlcykge1xyXG5cdFx0XHRpZiAoc3R5bGVzLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcblx0XHRcdFx0dmFyIHNldFZhbCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdGlmIChzdHlsZXNbcHJvcF0gPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdC8vIHJldmVydGluZyBhIHByb3BlcnR5IHZhbHVlXHJcblxyXG5cdFx0XHRcdFx0aWYgKCFvcmlnU3R5bGUpIHtcclxuXHRcdFx0XHRcdFx0Ly8gZ2V0IHRoZSBvcmlnaW5hbCBzdHlsZSBvYmplY3QsIGJ1dCBkb250J3QgdHJ5IHRvIGNyZWF0ZSBpdCBpZiBpdCBkb2Vzbid0IGV4aXN0XHJcblx0XHRcdFx0XHRcdG9yaWdTdHlsZSA9IGpzYy5nZXREYXRhKGVsbSwgJ29yaWdTdHlsZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKG9yaWdTdHlsZSAmJiBvcmlnU3R5bGUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuXHRcdFx0XHRcdFx0Ly8gd2UgaGF2ZSBwcm9wZXJ0eSdzIG9yaWdpbmFsIHZhbHVlIC0+IHVzZSBpdFxyXG5cdFx0XHRcdFx0XHRzZXRWYWwgPSBvcmlnU3R5bGVbcHJvcF07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBzZXR0aW5nIGEgcHJvcGVydHkgdmFsdWVcclxuXHJcblx0XHRcdFx0XHRpZiAocmV2ZXJzaWJsZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIW9yaWdTdHlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIGdldCB0aGUgb3JpZ2luYWwgc3R5bGUgb2JqZWN0IGFuZCBpZiBpdCBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgaXRcclxuXHRcdFx0XHRcdFx0XHRvcmlnU3R5bGUgPSBqc2MuZ2V0RGF0YShlbG0sICdvcmlnU3R5bGUnLCB7fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKCFvcmlnU3R5bGUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBvcmlnaW5hbCBwcm9wZXJ0eSB2YWx1ZSBub3QgeWV0IHN0b3JlZCAtPiBzdG9yZSBpdFxyXG5cdFx0XHRcdFx0XHRcdG9yaWdTdHlsZVtwcm9wXSA9IGVsbS5zdHlsZVtwcm9wXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0c2V0VmFsID0gc3R5bGVzW3Byb3BdO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHNldFZhbCAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0ZWxtLnN0eWxlLnNldFByb3BlcnR5KHByb3AsIHNldFZhbCwgcHJpb3JpdHkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRsaW5lYXJHcmFkaWVudCA6IChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0RnVuY05hbWUgKCkge1xyXG5cdFx0XHR2YXIgc3RkTmFtZSA9ICdsaW5lYXItZ3JhZGllbnQnO1xyXG5cdFx0XHR2YXIgcHJlZml4ZXMgPSBbJycsICctd2Via2l0LScsICctbW96LScsICctby0nLCAnLW1zLSddO1xyXG5cdFx0XHR2YXIgaGVscGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0dmFyIHRyeUZ1bmMgPSBwcmVmaXhlc1tpXSArIHN0ZE5hbWU7XHJcblx0XHRcdFx0dmFyIHRyeVZhbCA9IHRyeUZ1bmMgKyAnKHRvIHJpZ2h0LCByZ2JhKDAsMCwwLDApLCByZ2JhKDAsMCwwLDApKSc7XHJcblxyXG5cdFx0XHRcdGhlbHBlci5zdHlsZS5iYWNrZ3JvdW5kID0gdHJ5VmFsO1xyXG5cdFx0XHRcdGlmIChoZWxwZXIuc3R5bGUuYmFja2dyb3VuZCkgeyAvLyBDU1MgYmFja2dyb3VuZCBzdWNjZXNzZnVsbHkgc2V0IC0+IGZ1bmN0aW9uIG5hbWUgaXMgc3VwcG9ydGVkXHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ5RnVuYztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0ZE5hbWU7IC8vIGZhbGxiYWNrIHRvIHN0YW5kYXJkICdsaW5lYXItZ3JhZGllbnQnIHdpdGhvdXQgdmVuZG9yIHByZWZpeFxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBmdW5jTmFtZSA9IGdldEZ1bmNOYW1lKCk7XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGZ1bmNOYW1lICsgJygnICsgQXJyYXkucHJvdG90eXBlLmpvaW4uY2FsbChhcmd1bWVudHMsICcsICcpICsgJyknO1xyXG5cdFx0fTtcclxuXHJcblx0fSkoKSxcclxuXHJcblxyXG5cdHNldEJvcmRlclJhZGl1cyA6IGZ1bmN0aW9uIChlbG0sIHZhbHVlKSB7XHJcblx0XHRqc2Muc2V0U3R5bGUoZWxtLCB7J2JvcmRlci1yYWRpdXMnIDogdmFsdWUgfHwgJzAnfSk7XHJcblx0fSxcclxuXHJcblxyXG5cdHNldEJveFNoYWRvdyA6IGZ1bmN0aW9uIChlbG0sIHZhbHVlKSB7XHJcblx0XHRqc2Muc2V0U3R5bGUoZWxtLCB7J2JveC1zaGFkb3cnOiB2YWx1ZSB8fCAnbm9uZSd9KTtcclxuXHR9LFxyXG5cclxuXHJcblx0Z2V0RWxlbWVudFBvcyA6IGZ1bmN0aW9uIChlLCByZWxhdGl2ZVRvVmlld3BvcnQpIHtcclxuXHRcdHZhciB4PTAsIHk9MDtcclxuXHRcdHZhciByZWN0ID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdHggPSByZWN0LmxlZnQ7XHJcblx0XHR5ID0gcmVjdC50b3A7XHJcblx0XHRpZiAoIXJlbGF0aXZlVG9WaWV3cG9ydCkge1xyXG5cdFx0XHR2YXIgdmlld1BvcyA9IGpzYy5nZXRWaWV3UG9zKCk7XHJcblx0XHRcdHggKz0gdmlld1Bvc1swXTtcclxuXHRcdFx0eSArPSB2aWV3UG9zWzFdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFt4LCB5XTtcclxuXHR9LFxyXG5cclxuXHJcblx0Z2V0RWxlbWVudFNpemUgOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0cmV0dXJuIFtlLm9mZnNldFdpZHRoLCBlLm9mZnNldEhlaWdodF07XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIGdldCBwb2ludGVyJ3MgWC9ZIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHZpZXdwb3J0XHJcblx0Z2V0QWJzUG9pbnRlclBvcyA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgeCA9IDAsIHkgPSAwO1xyXG5cdFx0aWYgKHR5cGVvZiBlLmNoYW5nZWRUb3VjaGVzICE9PSAndW5kZWZpbmVkJyAmJiBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCkge1xyXG5cdFx0XHQvLyB0b3VjaCBkZXZpY2VzXHJcblx0XHRcdHggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcblx0XHRcdHkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBlLmNsaWVudFggPT09ICdudW1iZXInKSB7XHJcblx0XHRcdHggPSBlLmNsaWVudFg7XHJcblx0XHRcdHkgPSBlLmNsaWVudFk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4geyB4OiB4LCB5OiB5IH07XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIGdldCBwb2ludGVyJ3MgWC9ZIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRhcmdldCBlbGVtZW50XHJcblx0Z2V0UmVsUG9pbnRlclBvcyA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG5cdFx0dmFyIHRhcmdldFJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdFx0dmFyIHggPSAwLCB5ID0gMDtcclxuXHJcblx0XHR2YXIgY2xpZW50WCA9IDAsIGNsaWVudFkgPSAwO1xyXG5cdFx0aWYgKHR5cGVvZiBlLmNoYW5nZWRUb3VjaGVzICE9PSAndW5kZWZpbmVkJyAmJiBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCkge1xyXG5cdFx0XHQvLyB0b3VjaCBkZXZpY2VzXHJcblx0XHRcdGNsaWVudFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcblx0XHRcdGNsaWVudFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBlLmNsaWVudFggPT09ICdudW1iZXInKSB7XHJcblx0XHRcdGNsaWVudFggPSBlLmNsaWVudFg7XHJcblx0XHRcdGNsaWVudFkgPSBlLmNsaWVudFk7XHJcblx0XHR9XHJcblxyXG5cdFx0eCA9IGNsaWVudFggLSB0YXJnZXRSZWN0LmxlZnQ7XHJcblx0XHR5ID0gY2xpZW50WSAtIHRhcmdldFJlY3QudG9wO1xyXG5cdFx0cmV0dXJuIHsgeDogeCwgeTogeSB9O1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRWaWV3UG9zIDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApLFxyXG5cdFx0XHQod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcclxuXHRcdF07XHJcblx0fSxcclxuXHJcblxyXG5cdGdldFZpZXdTaXplIDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2MuY2xpZW50V2lkdGgpLFxyXG5cdFx0XHQod2luZG93LmlubmVySGVpZ2h0IHx8IGRvYy5jbGllbnRIZWlnaHQpLFxyXG5cdFx0XTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gcjogMC0yNTVcclxuXHQvLyBnOiAwLTI1NVxyXG5cdC8vIGI6IDAtMjU1XHJcblx0Ly9cclxuXHQvLyByZXR1cm5zOiBbIDAtMzYwLCAwLTEwMCwgMC0xMDAgXVxyXG5cdC8vXHJcblx0UkdCX0hTViA6IGZ1bmN0aW9uIChyLCBnLCBiKSB7XHJcblx0XHRyIC89IDI1NTtcclxuXHRcdGcgLz0gMjU1O1xyXG5cdFx0YiAvPSAyNTU7XHJcblx0XHR2YXIgbiA9IE1hdGgubWluKE1hdGgubWluKHIsZyksYik7XHJcblx0XHR2YXIgdiA9IE1hdGgubWF4KE1hdGgubWF4KHIsZyksYik7XHJcblx0XHR2YXIgbSA9IHYgLSBuO1xyXG5cdFx0aWYgKG0gPT09IDApIHsgcmV0dXJuIFsgbnVsbCwgMCwgMTAwICogdiBdOyB9XHJcblx0XHR2YXIgaCA9IHI9PT1uID8gMysoYi1nKS9tIDogKGc9PT1uID8gNSsoci1iKS9tIDogMSsoZy1yKS9tKTtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdDYwICogKGg9PT02PzA6aCksXHJcblx0XHRcdDEwMCAqIChtL3YpLFxyXG5cdFx0XHQxMDAgKiB2XHJcblx0XHRdO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBoOiAwLTM2MFxyXG5cdC8vIHM6IDAtMTAwXHJcblx0Ly8gdjogMC0xMDBcclxuXHQvL1xyXG5cdC8vIHJldHVybnM6IFsgMC0yNTUsIDAtMjU1LCAwLTI1NSBdXHJcblx0Ly9cclxuXHRIU1ZfUkdCIDogZnVuY3Rpb24gKGgsIHMsIHYpIHtcclxuXHRcdHZhciB1ID0gMjU1ICogKHYgLyAxMDApO1xyXG5cclxuXHRcdGlmIChoID09PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBbIHUsIHUsIHUgXTtcclxuXHRcdH1cclxuXHJcblx0XHRoIC89IDYwO1xyXG5cdFx0cyAvPSAxMDA7XHJcblxyXG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGgpO1xyXG5cdFx0dmFyIGYgPSBpJTIgPyBoLWkgOiAxLShoLWkpO1xyXG5cdFx0dmFyIG0gPSB1ICogKDEgLSBzKTtcclxuXHRcdHZhciBuID0gdSAqICgxIC0gcyAqIGYpO1xyXG5cdFx0c3dpdGNoIChpKSB7XHJcblx0XHRcdGNhc2UgNjpcclxuXHRcdFx0Y2FzZSAwOiByZXR1cm4gW3UsbixtXTtcclxuXHRcdFx0Y2FzZSAxOiByZXR1cm4gW24sdSxtXTtcclxuXHRcdFx0Y2FzZSAyOiByZXR1cm4gW20sdSxuXTtcclxuXHRcdFx0Y2FzZSAzOiByZXR1cm4gW20sbix1XTtcclxuXHRcdFx0Y2FzZSA0OiByZXR1cm4gW24sbSx1XTtcclxuXHRcdFx0Y2FzZSA1OiByZXR1cm4gW3UsbSxuXTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0cGFyc2VDb2xvclN0cmluZyA6IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdHZhciByZXQgPSB7XHJcblx0XHRcdHJnYmE6IG51bGwsXHJcblx0XHRcdGZvcm1hdDogbnVsbCAvLyAnaGV4JyB8ICdyZ2InIHwgJ3JnYmEnXHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBtO1xyXG5cdFx0aWYgKG0gPSBzdHIubWF0Y2goL15cXFcqKFswLTlBLUZdezN9KFswLTlBLUZdezN9KT8pXFxXKiQvaSkpIHtcclxuXHRcdFx0Ly8gSEVYIG5vdGF0aW9uXHJcblxyXG5cdFx0XHRyZXQuZm9ybWF0ID0gJ2hleCc7XHJcblxyXG5cdFx0XHRpZiAobVsxXS5sZW5ndGggPT09IDYpIHtcclxuXHRcdFx0XHQvLyA2LWNoYXIgbm90YXRpb25cclxuXHRcdFx0XHRyZXQucmdiYSA9IFtcclxuXHRcdFx0XHRcdHBhcnNlSW50KG1bMV0uc3Vic3RyKDAsMiksMTYpLFxyXG5cdFx0XHRcdFx0cGFyc2VJbnQobVsxXS5zdWJzdHIoMiwyKSwxNiksXHJcblx0XHRcdFx0XHRwYXJzZUludChtWzFdLnN1YnN0cig0LDIpLDE2KSxcclxuXHRcdFx0XHRcdG51bGxcclxuXHRcdFx0XHRdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIDMtY2hhciBub3RhdGlvblxyXG5cdFx0XHRcdHJldC5yZ2JhID0gW1xyXG5cdFx0XHRcdFx0cGFyc2VJbnQobVsxXS5jaGFyQXQoMCkgKyBtWzFdLmNoYXJBdCgwKSwxNiksXHJcblx0XHRcdFx0XHRwYXJzZUludChtWzFdLmNoYXJBdCgxKSArIG1bMV0uY2hhckF0KDEpLDE2KSxcclxuXHRcdFx0XHRcdHBhcnNlSW50KG1bMV0uY2hhckF0KDIpICsgbVsxXS5jaGFyQXQoMiksMTYpLFxyXG5cdFx0XHRcdFx0bnVsbFxyXG5cdFx0XHRcdF07XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHJldDtcclxuXHJcblx0XHR9IGVsc2UgaWYgKG0gPSBzdHIubWF0Y2goL15cXFcqcmdiYT9cXCgoW14pXSopXFwpXFxXKiQvaSkpIHtcclxuXHRcdFx0Ly8gcmdiKC4uLikgb3IgcmdiYSguLi4pIG5vdGF0aW9uXHJcblxyXG5cdFx0XHR2YXIgcGFyYW1zID0gbVsxXS5zcGxpdCgnLCcpO1xyXG5cdFx0XHR2YXIgcmUgPSAvXlxccyooXFxkK3xcXGQqXFwuXFxkK3xcXGQrXFwuXFxkKilcXHMqJC87XHJcblx0XHRcdHZhciBtUiwgbUcsIG1CLCBtQTtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdHBhcmFtcy5sZW5ndGggPj0gMyAmJlxyXG5cdFx0XHRcdChtUiA9IHBhcmFtc1swXS5tYXRjaChyZSkpICYmXHJcblx0XHRcdFx0KG1HID0gcGFyYW1zWzFdLm1hdGNoKHJlKSkgJiZcclxuXHRcdFx0XHQobUIgPSBwYXJhbXNbMl0ubWF0Y2gocmUpKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRyZXQuZm9ybWF0ID0gJ3JnYic7XHJcblx0XHRcdFx0cmV0LnJnYmEgPSBbXHJcblx0XHRcdFx0XHRwYXJzZUZsb2F0KG1SWzFdKSB8fCAwLFxyXG5cdFx0XHRcdFx0cGFyc2VGbG9hdChtR1sxXSkgfHwgMCxcclxuXHRcdFx0XHRcdHBhcnNlRmxvYXQobUJbMV0pIHx8IDAsXHJcblx0XHRcdFx0XHRudWxsXHJcblx0XHRcdFx0XTtcclxuXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0cGFyYW1zLmxlbmd0aCA+PSA0ICYmXHJcblx0XHRcdFx0XHQobUEgPSBwYXJhbXNbM10ubWF0Y2gocmUpKVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0cmV0LmZvcm1hdCA9ICdyZ2JhJztcclxuXHRcdFx0XHRcdHJldC5yZ2JhWzNdID0gcGFyc2VGbG9hdChtQVsxXSkgfHwgMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHJldDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gQ2FudmFzIHNjYWxpbmcgZm9yIHJldGluYSBkaXNwbGF5c1xyXG5cdC8vXHJcblx0Ly8gYWRhcHRlZCBmcm9tIGh0dHBzOi8vd3d3Lmh0bWw1cm9ja3MuY29tL2VuL3R1dG9yaWFscy9jYW52YXMvaGlkcGkvXHJcblx0Ly9cclxuXHRzY2FsZUNhbnZhc0ZvckhpZ2hEUFIgOiBmdW5jdGlvbiAoY2FudmFzKSB7XHJcblx0XHR2YXIgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuXHRcdGNhbnZhcy53aWR0aCAqPSBkcHI7XHJcblx0XHRjYW52YXMuaGVpZ2h0ICo9IGRwcjtcclxuXHRcdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHRcdGN0eC5zY2FsZShkcHIsIGRwcik7XHJcblx0fSxcclxuXHJcblxyXG5cdGdlbkNvbG9yUHJldmlld0NhbnZhcyA6IGZ1bmN0aW9uIChjb2xvciwgc2VwYXJhdG9yUG9zLCBzcGVjV2lkdGgsIHNjYWxlRm9ySGlnaERQUikge1xyXG5cclxuXHRcdHZhciBzZXBXID0gTWF0aC5yb3VuZChqc2MucHViLnByZXZpZXdTZXBhcmF0b3IubGVuZ3RoKTtcclxuXHRcdHZhciBzcVNpemUgPSBqc2MucHViLmNoZXNzYm9hcmRTaXplO1xyXG5cdFx0dmFyIHNxQ29sb3IxID0ganNjLnB1Yi5jaGVzc2JvYXJkQ29sb3IxO1xyXG5cdFx0dmFyIHNxQ29sb3IyID0ganNjLnB1Yi5jaGVzc2JvYXJkQ29sb3IyO1xyXG5cclxuXHRcdHZhciBjV2lkdGggPSBzcGVjV2lkdGggPyBzcGVjV2lkdGggOiBzcVNpemUgKiAyO1xyXG5cdFx0dmFyIGNIZWlnaHQgPSBzcVNpemUgKiAyO1xyXG5cclxuXHRcdHZhciBjYW52YXMgPSBqc2MuY3JlYXRlRWwoJ2NhbnZhcycpO1xyXG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRcdGNhbnZhcy53aWR0aCA9IGNXaWR0aDtcclxuXHRcdGNhbnZhcy5oZWlnaHQgPSBjSGVpZ2h0O1xyXG5cdFx0aWYgKHNjYWxlRm9ySGlnaERQUikge1xyXG5cdFx0XHRqc2Muc2NhbGVDYW52YXNGb3JIaWdoRFBSKGNhbnZhcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gdHJhbnNwYXJlbmN5IGNoZXNzYm9hcmQgLSBiYWNrZ3JvdW5kXHJcblx0XHRjdHguZmlsbFN0eWxlID0gc3FDb2xvcjE7XHJcblx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY1dpZHRoLCBjSGVpZ2h0KTtcclxuXHJcblx0XHQvLyB0cmFuc3BhcmVuY3kgY2hlc3Nib2FyZCAtIHNxdWFyZXNcclxuXHRcdGN0eC5maWxsU3R5bGUgPSBzcUNvbG9yMjtcclxuXHRcdGZvciAodmFyIHggPSAwOyB4IDwgY1dpZHRoOyB4ICs9IHNxU2l6ZSAqIDIpIHtcclxuXHRcdFx0Y3R4LmZpbGxSZWN0KHgsIDAsIHNxU2l6ZSwgc3FTaXplKTtcclxuXHRcdFx0Y3R4LmZpbGxSZWN0KHggKyBzcVNpemUsIHNxU2l6ZSwgc3FTaXplLCBzcVNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb2xvcikge1xyXG5cdFx0XHQvLyBhY3R1YWwgY29sb3IgaW4gZm9yZWdyb3VuZFxyXG5cdFx0XHRjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcblx0XHRcdGN0eC5maWxsUmVjdCgwLCAwLCBjV2lkdGgsIGNIZWlnaHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdGFydCA9IG51bGw7XHJcblx0XHRzd2l0Y2ggKHNlcGFyYXRvclBvcykge1xyXG5cdFx0XHRjYXNlICdsZWZ0JzpcclxuXHRcdFx0XHRzdGFydCA9IDA7XHJcblx0XHRcdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBzZXBXLzIsIGNIZWlnaHQpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyaWdodCc6XHJcblx0XHRcdFx0c3RhcnQgPSBjV2lkdGggLSBzZXBXO1xyXG5cdFx0XHRcdGN0eC5jbGVhclJlY3QoY1dpZHRoIC0gKHNlcFcvMiksIDAsIHNlcFcvMiwgY0hlaWdodCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRpZiAoc3RhcnQgIT09IG51bGwpIHtcclxuXHRcdFx0Y3R4LmxpbmVXaWR0aCA9IDE7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwganNjLnB1Yi5wcmV2aWV3U2VwYXJhdG9yLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0Y3R4LmJlZ2luUGF0aCgpO1xyXG5cdFx0XHRcdGN0eC5zdHJva2VTdHlsZSA9IGpzYy5wdWIucHJldmlld1NlcGFyYXRvcltpXTtcclxuXHRcdFx0XHRjdHgubW92ZVRvKDAuNSArIHN0YXJ0ICsgaSwgMCk7XHJcblx0XHRcdFx0Y3R4LmxpbmVUbygwLjUgKyBzdGFydCArIGksIGNIZWlnaHQpO1xyXG5cdFx0XHRcdGN0eC5zdHJva2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNhbnZhczogY2FudmFzLFxyXG5cdFx0XHR3aWR0aDogY1dpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IGNIZWlnaHQsXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBpZiBwb3NpdGlvbiBvciB3aWR0aCBpcyBub3Qgc2V0ID0+IGZpbGwgdGhlIGVudGlyZSBlbGVtZW50ICgwJS0xMDAlKVxyXG5cdGdlbkNvbG9yUHJldmlld0dyYWRpZW50IDogZnVuY3Rpb24gKGNvbG9yLCBwb3NpdGlvbiwgd2lkdGgpIHtcclxuXHRcdHZhciBwYXJhbXMgPSBbXTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gJiYgd2lkdGgpIHtcclxuXHRcdFx0cGFyYW1zID0gW1xyXG5cdFx0XHRcdCd0byAnICsgeydsZWZ0JzoncmlnaHQnLCAncmlnaHQnOidsZWZ0J31bcG9zaXRpb25dLFxyXG5cdFx0XHRcdGNvbG9yICsgJyAwJScsXHJcblx0XHRcdFx0Y29sb3IgKyAnICcgKyB3aWR0aCArICdweCcsXHJcblx0XHRcdFx0J3JnYmEoMCwwLDAsMCkgJyArICh3aWR0aCArIDEpICsgJ3B4JyxcclxuXHRcdFx0XHQncmdiYSgwLDAsMCwwKSAxMDAlJyxcclxuXHRcdFx0XTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBhcmFtcyA9IFtcclxuXHRcdFx0XHQndG8gcmlnaHQnLFxyXG5cdFx0XHRcdGNvbG9yICsgJyAwJScsXHJcblx0XHRcdFx0Y29sb3IgKyAnIDEwMCUnLFxyXG5cdFx0XHRdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBqc2MubGluZWFyR3JhZGllbnQuYXBwbHkodGhpcywgcGFyYW1zKTtcclxuXHR9LFxyXG5cclxuXHJcblx0cmVkcmF3UG9zaXRpb24gOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYgKGpzYy5waWNrZXIgJiYganNjLnBpY2tlci5vd25lcikge1xyXG5cdFx0XHR2YXIgdGhpc09iaiA9IGpzYy5waWNrZXIub3duZXI7XHJcblxyXG5cdFx0XHR2YXIgdHAsIHZwO1xyXG5cclxuXHRcdFx0aWYgKHRoaXNPYmouZml4ZWQpIHtcclxuXHRcdFx0XHQvLyBGaXhlZCBlbGVtZW50cyBhcmUgcG9zaXRpb25lZCByZWxhdGl2ZSB0byB2aWV3cG9ydCxcclxuXHRcdFx0XHQvLyB0aGVyZWZvcmUgd2UgY2FuIGlnbm9yZSB0aGUgc2Nyb2xsIG9mZnNldFxyXG5cdFx0XHRcdHRwID0ganNjLmdldEVsZW1lbnRQb3ModGhpc09iai50YXJnZXRFbGVtZW50LCB0cnVlKTsgLy8gdGFyZ2V0IHBvc1xyXG5cdFx0XHRcdHZwID0gWzAsIDBdOyAvLyB2aWV3IHBvc1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRwID0ganNjLmdldEVsZW1lbnRQb3ModGhpc09iai50YXJnZXRFbGVtZW50KTsgLy8gdGFyZ2V0IHBvc1xyXG5cdFx0XHRcdHZwID0ganNjLmdldFZpZXdQb3MoKTsgLy8gdmlldyBwb3NcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHRzID0ganNjLmdldEVsZW1lbnRTaXplKHRoaXNPYmoudGFyZ2V0RWxlbWVudCk7IC8vIHRhcmdldCBzaXplXHJcblx0XHRcdHZhciB2cyA9IGpzYy5nZXRWaWV3U2l6ZSgpOyAvLyB2aWV3IHNpemVcclxuXHRcdFx0dmFyIHBzID0ganNjLmdldFBpY2tlck91dGVyRGltcyh0aGlzT2JqKTsgLy8gcGlja2VyIHNpemVcclxuXHRcdFx0dmFyIGEsIGIsIGM7XHJcblx0XHRcdHN3aXRjaCAodGhpc09iai5wb3NpdGlvbi50b0xvd2VyQ2FzZSgpKSB7XHJcblx0XHRcdFx0Y2FzZSAnbGVmdCc6IGE9MTsgYj0wOyBjPS0xOyBicmVhaztcclxuXHRcdFx0XHRjYXNlICdyaWdodCc6YT0xOyBiPTA7IGM9MTsgYnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAndG9wJzogIGE9MDsgYj0xOyBjPS0xOyBicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OiAgICAgYT0wOyBiPTE7IGM9MTsgYnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIGwgPSAodHNbYl0rcHNbYl0pLzI7XHJcblxyXG5cdFx0XHQvLyBjb21wdXRlIHBpY2tlciBwb3NpdGlvblxyXG5cdFx0XHRpZiAoIXRoaXNPYmouc21hcnRQb3NpdGlvbikge1xyXG5cdFx0XHRcdHZhciBwcCA9IFtcclxuXHRcdFx0XHRcdHRwW2FdLFxyXG5cdFx0XHRcdFx0dHBbYl0rdHNbYl0tbCtsKmNcclxuXHRcdFx0XHRdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBwcCA9IFtcclxuXHRcdFx0XHRcdC12cFthXSt0cFthXStwc1thXSA+IHZzW2FdID9cclxuXHRcdFx0XHRcdFx0KC12cFthXSt0cFthXSt0c1thXS8yID4gdnNbYV0vMiAmJiB0cFthXSt0c1thXS1wc1thXSA+PSAwID8gdHBbYV0rdHNbYV0tcHNbYV0gOiB0cFthXSkgOlxyXG5cdFx0XHRcdFx0XHR0cFthXSxcclxuXHRcdFx0XHRcdC12cFtiXSt0cFtiXSt0c1tiXStwc1tiXS1sK2wqYyA+IHZzW2JdID9cclxuXHRcdFx0XHRcdFx0KC12cFtiXSt0cFtiXSt0c1tiXS8yID4gdnNbYl0vMiAmJiB0cFtiXSt0c1tiXS1sLWwqYyA+PSAwID8gdHBbYl0rdHNbYl0tbC1sKmMgOiB0cFtiXSt0c1tiXS1sK2wqYykgOlxyXG5cdFx0XHRcdFx0XHQodHBbYl0rdHNbYl0tbCtsKmMgPj0gMCA/IHRwW2JdK3RzW2JdLWwrbCpjIDogdHBbYl0rdHNbYl0tbC1sKmMpXHJcblx0XHRcdFx0XTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHggPSBwcFthXTtcclxuXHRcdFx0dmFyIHkgPSBwcFtiXTtcclxuXHRcdFx0dmFyIHBvc2l0aW9uVmFsdWUgPSB0aGlzT2JqLmZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHZhciBjb250cmFjdFNoYWRvdyA9XHJcblx0XHRcdFx0KHBwWzBdICsgcHNbMF0gPiB0cFswXSB8fCBwcFswXSA8IHRwWzBdICsgdHNbMF0pICYmXHJcblx0XHRcdFx0KHBwWzFdICsgcHNbMV0gPCB0cFsxXSArIHRzWzFdKTtcclxuXHJcblx0XHRcdGpzYy5fZHJhd1Bvc2l0aW9uKHRoaXNPYmosIHgsIHksIHBvc2l0aW9uVmFsdWUsIGNvbnRyYWN0U2hhZG93KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0X2RyYXdQb3NpdGlvbiA6IGZ1bmN0aW9uICh0aGlzT2JqLCB4LCB5LCBwb3NpdGlvblZhbHVlLCBjb250cmFjdFNoYWRvdykge1xyXG5cdFx0dmFyIHZTaGFkb3cgPSBjb250cmFjdFNoYWRvdyA/IDAgOiB0aGlzT2JqLnNoYWRvd0JsdXI7IC8vIHB4XHJcblxyXG5cdFx0anNjLnBpY2tlci53cmFwLnN0eWxlLnBvc2l0aW9uID0gcG9zaXRpb25WYWx1ZTtcclxuXHRcdGpzYy5waWNrZXIud3JhcC5zdHlsZS5sZWZ0ID0geCArICdweCc7XHJcblx0XHRqc2MucGlja2VyLndyYXAuc3R5bGUudG9wID0geSArICdweCc7XHJcblxyXG5cdFx0anNjLnNldEJveFNoYWRvdyhcclxuXHRcdFx0anNjLnBpY2tlci5ib3hTLFxyXG5cdFx0XHR0aGlzT2JqLnNoYWRvdyA/XHJcblx0XHRcdFx0bmV3IGpzYy5Cb3hTaGFkb3coMCwgdlNoYWRvdywgdGhpc09iai5zaGFkb3dCbHVyLCAwLCB0aGlzT2JqLnNoYWRvd0NvbG9yKSA6XHJcblx0XHRcdFx0bnVsbCk7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldFBpY2tlckRpbXMgOiBmdW5jdGlvbiAodGhpc09iaikge1xyXG5cdFx0dmFyIGRpbXMgPSBbXHJcblx0XHRcdDIgKiB0aGlzT2JqLmNvbnRyb2xCb3JkZXJXaWR0aCArIDIgKiB0aGlzT2JqLnBhZGRpbmcgKyB0aGlzT2JqLndpZHRoLFxyXG5cdFx0XHQyICogdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGggKyAyICogdGhpc09iai5wYWRkaW5nICsgdGhpc09iai5oZWlnaHRcclxuXHRcdF07XHJcblx0XHR2YXIgc2xpZGVyU3BhY2UgPSAyICogdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGggKyAyICoganNjLmdldENvbnRyb2xQYWRkaW5nKHRoaXNPYmopICsgdGhpc09iai5zbGlkZXJTaXplO1xyXG5cdFx0aWYgKGpzYy5nZXRTbGlkZXJDaGFubmVsKHRoaXNPYmopKSB7XHJcblx0XHRcdGRpbXNbMF0gKz0gc2xpZGVyU3BhY2U7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpc09iai5oYXNBbHBoYUNoYW5uZWwoKSkge1xyXG5cdFx0XHRkaW1zWzBdICs9IHNsaWRlclNwYWNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXNPYmouY2xvc2VCdXR0b24pIHtcclxuXHRcdFx0ZGltc1sxXSArPSAyICogdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGggKyB0aGlzT2JqLnBhZGRpbmcgKyB0aGlzT2JqLmJ1dHRvbkhlaWdodDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBkaW1zO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRQaWNrZXJPdXRlckRpbXMgOiBmdW5jdGlvbiAodGhpc09iaikge1xyXG5cdFx0dmFyIGRpbXMgPSBqc2MuZ2V0UGlja2VyRGltcyh0aGlzT2JqKTtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdGRpbXNbMF0gKyAyICogdGhpc09iai5ib3JkZXJXaWR0aCxcclxuXHRcdFx0ZGltc1sxXSArIDIgKiB0aGlzT2JqLmJvcmRlcldpZHRoXHJcblx0XHRdO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRDb250cm9sUGFkZGluZyA6IGZ1bmN0aW9uICh0aGlzT2JqKSB7XHJcblx0XHRyZXR1cm4gTWF0aC5tYXgoXHJcblx0XHRcdHRoaXNPYmoucGFkZGluZyAvIDIsXHJcblx0XHRcdCgyICogdGhpc09iai5wb2ludGVyQm9yZGVyV2lkdGggKyB0aGlzT2JqLnBvaW50ZXJUaGlja25lc3MpIC0gdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGhcclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldFBhZFlDaGFubmVsIDogZnVuY3Rpb24gKHRoaXNPYmopIHtcclxuXHRcdHN3aXRjaCAodGhpc09iai5tb2RlLmNoYXJBdCgxKS50b0xvd2VyQ2FzZSgpKSB7XHJcblx0XHRcdGNhc2UgJ3YnOiByZXR1cm4gJ3YnOyBicmVhaztcclxuXHRcdH1cclxuXHRcdHJldHVybiAncyc7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldFNsaWRlckNoYW5uZWwgOiBmdW5jdGlvbiAodGhpc09iaikge1xyXG5cdFx0aWYgKHRoaXNPYmoubW9kZS5sZW5ndGggPiAyKSB7XHJcblx0XHRcdHN3aXRjaCAodGhpc09iai5tb2RlLmNoYXJBdCgyKS50b0xvd2VyQ2FzZSgpKSB7XHJcblx0XHRcdFx0Y2FzZSAncyc6IHJldHVybiAncyc7IGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3YnOiByZXR1cm4gJ3YnOyBicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fSxcclxuXHJcblxyXG5cdG9uRG9jdW1lbnRNb3VzZURvd24gOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuXHJcblx0XHRpZiAodGFyZ2V0LmpzY29sb3IgJiYgdGFyZ2V0LmpzY29sb3IgaW5zdGFuY2VvZiBqc2MucHViKSB7IC8vIGNsaWNrZWQgdGFyZ2V0RWxlbWVudCAtPiBzaG93IHBpY2tlclxyXG5cdFx0XHRpZiAodGFyZ2V0LmpzY29sb3Iuc2hvd09uQ2xpY2sgJiYgIXRhcmdldC5kaXNhYmxlZCkge1xyXG5cdFx0XHRcdHRhcmdldC5qc2NvbG9yLnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChqc2MuZ2V0RGF0YSh0YXJnZXQsICdndWknKSkgeyAvLyBjbGlja2VkIGpzY29sb3IncyBHVUkgZWxlbWVudFxyXG5cdFx0XHR2YXIgY29udHJvbCA9IGpzYy5nZXREYXRhKHRhcmdldCwgJ2NvbnRyb2wnKTtcclxuXHRcdFx0aWYgKGNvbnRyb2wpIHtcclxuXHRcdFx0XHQvLyBqc2NvbG9yJ3MgY29udHJvbFxyXG5cdFx0XHRcdGpzYy5vbkNvbnRyb2xQb2ludGVyU3RhcnQoZSwgdGFyZ2V0LCBqc2MuZ2V0RGF0YSh0YXJnZXQsICdjb250cm9sJyksICdtb3VzZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBtb3VzZSBpcyBvdXRzaWRlIHRoZSBwaWNrZXIncyBjb250cm9scyAtPiBoaWRlIHRoZSBjb2xvciBwaWNrZXIhXHJcblx0XHRcdGlmIChqc2MucGlja2VyICYmIGpzYy5waWNrZXIub3duZXIpIHtcclxuXHRcdFx0XHRqc2MucGlja2VyLm93bmVyLnRyeUhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRvbkRvY3VtZW50S2V5VXAgOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKFsnVGFiJywgJ0VzY2FwZSddLmluZGV4T2YoanNjLmV2ZW50S2V5KGUpKSAhPT0gLTEpIHtcclxuXHRcdFx0aWYgKGpzYy5waWNrZXIgJiYganNjLnBpY2tlci5vd25lcikge1xyXG5cdFx0XHRcdGpzYy5waWNrZXIub3duZXIudHJ5SGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdG9uV2luZG93UmVzaXplIDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGpzYy5yZWRyYXdQb3NpdGlvbigpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRvblBhcmVudFNjcm9sbCA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvLyBoaWRlIHRoZSBwaWNrZXIgd2hlbiBvbmUgb2YgdGhlIHBhcmVudCBlbGVtZW50cyBpcyBzY3JvbGxlZFxyXG5cdFx0aWYgKGpzYy5waWNrZXIgJiYganNjLnBpY2tlci5vd25lcikge1xyXG5cdFx0XHRqc2MucGlja2VyLm93bmVyLnRyeUhpZGUoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0b25QaWNrZXJUb3VjaFN0YXJ0IDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcblxyXG5cdFx0aWYgKGpzYy5nZXREYXRhKHRhcmdldCwgJ2NvbnRyb2wnKSkge1xyXG5cdFx0XHRqc2Mub25Db250cm9sUG9pbnRlclN0YXJ0KGUsIHRhcmdldCwganNjLmdldERhdGEodGFyZ2V0LCAnY29udHJvbCcpLCAndG91Y2gnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gY2FsbHMgZnVuY3Rpb24gc3BlY2lmaWVkIGluIHBpY2tlcidzIHByb3BlcnR5XHJcblx0dHJpZ2dlckNhbGxiYWNrIDogZnVuY3Rpb24gKHRoaXNPYmosIHByb3ApIHtcclxuXHRcdGlmICghdGhpc09ialtwcm9wXSkge1xyXG5cdFx0XHRyZXR1cm47IC8vIGNhbGxiYWNrIGZ1bmMgbm90IHNwZWNpZmllZFxyXG5cdFx0fVxyXG5cdFx0dmFyIGNhbGxiYWNrID0gbnVsbDtcclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXNPYmpbcHJvcF0gPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdC8vIHN0cmluZyB3aXRoIGNvZGVcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRjYWxsYmFjayA9IG5ldyBGdW5jdGlvbiAodGhpc09ialtwcm9wXSk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBmdW5jdGlvblxyXG5cdFx0XHRjYWxsYmFjayA9IHRoaXNPYmpbcHJvcF07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNhbGxiYWNrKSB7XHJcblx0XHRcdGNhbGxiYWNrLmNhbGwodGhpc09iaik7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIFRyaWdnZXJzIGEgY29sb3IgY2hhbmdlIHJlbGF0ZWQgZXZlbnQocykgb24gYWxsIHBpY2tlciBpbnN0YW5jZXMuXHJcblx0Ly8gSXQgaXMgcG9zc2libGUgdG8gc3BlY2lmeSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIHdpdGggYSBzcGFjZS5cclxuXHR0cmlnZ2VyR2xvYmFsIDogZnVuY3Rpb24gKGV2ZW50TmFtZXMpIHtcclxuXHRcdHZhciBpbnN0ID0ganNjLmdldEluc3RhbmNlcygpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0Lmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdGluc3RbaV0udHJpZ2dlcihldmVudE5hbWVzKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0X3BvaW50ZXJNb3ZlRXZlbnQgOiB7XHJcblx0XHRtb3VzZTogJ21vdXNlbW92ZScsXHJcblx0XHR0b3VjaDogJ3RvdWNobW92ZSdcclxuXHR9LFxyXG5cdF9wb2ludGVyRW5kRXZlbnQgOiB7XHJcblx0XHRtb3VzZTogJ21vdXNldXAnLFxyXG5cdFx0dG91Y2g6ICd0b3VjaGVuZCdcclxuXHR9LFxyXG5cclxuXHJcblx0X3BvaW50ZXJPcmlnaW4gOiBudWxsLFxyXG5cdF9jYXB0dXJlZFRhcmdldCA6IG51bGwsXHJcblxyXG5cclxuXHRvbkNvbnRyb2xQb2ludGVyU3RhcnQgOiBmdW5jdGlvbiAoZSwgdGFyZ2V0LCBjb250cm9sTmFtZSwgcG9pbnRlclR5cGUpIHtcclxuXHRcdHZhciB0aGlzT2JqID0ganNjLmdldERhdGEodGFyZ2V0LCAnaW5zdGFuY2UnKTtcclxuXHJcblx0XHRqc2MucHJldmVudERlZmF1bHQoZSk7XHJcblx0XHRqc2MuY2FwdHVyZVRhcmdldCh0YXJnZXQpO1xyXG5cclxuXHRcdHZhciByZWdpc3RlckRyYWdFdmVudHMgPSBmdW5jdGlvbiAoZG9jLCBvZmZzZXQpIHtcclxuXHRcdFx0anNjLmF0dGFjaEdyb3VwRXZlbnQoJ2RyYWcnLCBkb2MsIGpzYy5fcG9pbnRlck1vdmVFdmVudFtwb2ludGVyVHlwZV0sXHJcblx0XHRcdFx0anNjLm9uRG9jdW1lbnRQb2ludGVyTW92ZShlLCB0YXJnZXQsIGNvbnRyb2xOYW1lLCBwb2ludGVyVHlwZSwgb2Zmc2V0KSk7XHJcblx0XHRcdGpzYy5hdHRhY2hHcm91cEV2ZW50KCdkcmFnJywgZG9jLCBqc2MuX3BvaW50ZXJFbmRFdmVudFtwb2ludGVyVHlwZV0sXHJcblx0XHRcdFx0anNjLm9uRG9jdW1lbnRQb2ludGVyRW5kKGUsIHRhcmdldCwgY29udHJvbE5hbWUsIHBvaW50ZXJUeXBlKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHJlZ2lzdGVyRHJhZ0V2ZW50cyhkb2N1bWVudCwgWzAsIDBdKTtcclxuXHJcblx0XHRpZiAod2luZG93LnBhcmVudCAmJiB3aW5kb3cuZnJhbWVFbGVtZW50KSB7XHJcblx0XHRcdHZhciByZWN0ID0gd2luZG93LmZyYW1lRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0dmFyIG9mcyA9IFstcmVjdC5sZWZ0LCAtcmVjdC50b3BdO1xyXG5cdFx0XHRyZWdpc3RlckRyYWdFdmVudHMod2luZG93LnBhcmVudC53aW5kb3cuZG9jdW1lbnQsIG9mcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGFicyA9IGpzYy5nZXRBYnNQb2ludGVyUG9zKGUpO1xyXG5cdFx0dmFyIHJlbCA9IGpzYy5nZXRSZWxQb2ludGVyUG9zKGUpO1xyXG5cdFx0anNjLl9wb2ludGVyT3JpZ2luID0ge1xyXG5cdFx0XHR4OiBhYnMueCAtIHJlbC54LFxyXG5cdFx0XHR5OiBhYnMueSAtIHJlbC55XHJcblx0XHR9O1xyXG5cclxuXHRcdHN3aXRjaCAoY29udHJvbE5hbWUpIHtcclxuXHRcdGNhc2UgJ3BhZCc6XHJcblx0XHRcdC8vIGlmIHRoZSB2YWx1ZSBzbGlkZXIgaXMgYXQgdGhlIGJvdHRvbSwgbW92ZSBpdCB1cFxyXG5cdFx0XHRpZiAoanNjLmdldFNsaWRlckNoYW5uZWwodGhpc09iaikgPT09ICd2JyAmJiB0aGlzT2JqLmNoYW5uZWxzLnYgPT09IDApIHtcclxuXHRcdFx0XHR0aGlzT2JqLmZyb21IU1ZBKG51bGwsIG51bGwsIDEwMCwgbnVsbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0anNjLnNldFBhZCh0aGlzT2JqLCBlLCAwLCAwKTtcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0Y2FzZSAnc2xkJzpcclxuXHRcdFx0anNjLnNldFNsZCh0aGlzT2JqLCBlLCAwKTtcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0Y2FzZSAnYXNsZCc6XHJcblx0XHRcdGpzYy5zZXRBU2xkKHRoaXNPYmosIGUsIDApO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdHRoaXNPYmoudHJpZ2dlcignaW5wdXQnKTtcclxuXHR9LFxyXG5cclxuXHJcblx0b25Eb2N1bWVudFBvaW50ZXJNb3ZlIDogZnVuY3Rpb24gKGUsIHRhcmdldCwgY29udHJvbE5hbWUsIHBvaW50ZXJUeXBlLCBvZmZzZXQpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgdGhpc09iaiA9IGpzYy5nZXREYXRhKHRhcmdldCwgJ2luc3RhbmNlJyk7XHJcblx0XHRcdHN3aXRjaCAoY29udHJvbE5hbWUpIHtcclxuXHRcdFx0Y2FzZSAncGFkJzpcclxuXHRcdFx0XHRqc2Muc2V0UGFkKHRoaXNPYmosIGUsIG9mZnNldFswXSwgb2Zmc2V0WzFdKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ3NsZCc6XHJcblx0XHRcdFx0anNjLnNldFNsZCh0aGlzT2JqLCBlLCBvZmZzZXRbMV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnYXNsZCc6XHJcblx0XHRcdFx0anNjLnNldEFTbGQodGhpc09iaiwgZSwgb2Zmc2V0WzFdKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzT2JqLnRyaWdnZXIoJ2lucHV0Jyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdG9uRG9jdW1lbnRQb2ludGVyRW5kIDogZnVuY3Rpb24gKGUsIHRhcmdldCwgY29udHJvbE5hbWUsIHBvaW50ZXJUeXBlKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIHRoaXNPYmogPSBqc2MuZ2V0RGF0YSh0YXJnZXQsICdpbnN0YW5jZScpO1xyXG5cdFx0XHRqc2MuZGV0YWNoR3JvdXBFdmVudHMoJ2RyYWcnKTtcclxuXHRcdFx0anNjLnJlbGVhc2VUYXJnZXQoKTtcclxuXHJcblx0XHRcdC8vIEFsd2F5cyB0cmlnZ2VyIGNoYW5nZXMgQUZURVIgZGV0YWNoaW5nIG91dHN0YW5kaW5nIG1vdXNlIGhhbmRsZXJzLFxyXG5cdFx0XHQvLyBpbiBjYXNlIHNvbWUgY29sb3IgY2hhbmdlIG9jY3VyZWQgaW4gdXNlci1kZWZpbmVkIG9uQ2hhbmdlL29uSW5wdXQgaGFuZGxlclxyXG5cdFx0XHQvLyB3b3VsZCBpbnRydWRlIGludG8gY3VycmVudCBtb3VzZSBldmVudHNcclxuXHRcdFx0dGhpc09iai50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdFx0XHR0aGlzT2JqLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHJcblx0c2V0UGFkIDogZnVuY3Rpb24gKHRoaXNPYmosIGUsIG9mc1gsIG9mc1kpIHtcclxuXHRcdHZhciBwb2ludGVyQWJzID0ganNjLmdldEFic1BvaW50ZXJQb3MoZSk7XHJcblx0XHR2YXIgeCA9IG9mc1ggKyBwb2ludGVyQWJzLnggLSBqc2MuX3BvaW50ZXJPcmlnaW4ueCAtIHRoaXNPYmoucGFkZGluZyAtIHRoaXNPYmouY29udHJvbEJvcmRlcldpZHRoO1xyXG5cdFx0dmFyIHkgPSBvZnNZICsgcG9pbnRlckFicy55IC0ganNjLl9wb2ludGVyT3JpZ2luLnkgLSB0aGlzT2JqLnBhZGRpbmcgLSB0aGlzT2JqLmNvbnRyb2xCb3JkZXJXaWR0aDtcclxuXHJcblx0XHR2YXIgeFZhbCA9IHggKiAoMzYwIC8gKHRoaXNPYmoud2lkdGggLSAxKSk7XHJcblx0XHR2YXIgeVZhbCA9IDEwMCAtICh5ICogKDEwMCAvICh0aGlzT2JqLmhlaWdodCAtIDEpKSk7XHJcblxyXG5cdFx0c3dpdGNoIChqc2MuZ2V0UGFkWUNoYW5uZWwodGhpc09iaikpIHtcclxuXHRcdGNhc2UgJ3MnOiB0aGlzT2JqLmZyb21IU1ZBKHhWYWwsIHlWYWwsIG51bGwsIG51bGwpOyBicmVhaztcclxuXHRcdGNhc2UgJ3YnOiB0aGlzT2JqLmZyb21IU1ZBKHhWYWwsIG51bGwsIHlWYWwsIG51bGwpOyBicmVhaztcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0c2V0U2xkIDogZnVuY3Rpb24gKHRoaXNPYmosIGUsIG9mc1kpIHtcclxuXHRcdHZhciBwb2ludGVyQWJzID0ganNjLmdldEFic1BvaW50ZXJQb3MoZSk7XHJcblx0XHR2YXIgeSA9IG9mc1kgKyBwb2ludGVyQWJzLnkgLSBqc2MuX3BvaW50ZXJPcmlnaW4ueSAtIHRoaXNPYmoucGFkZGluZyAtIHRoaXNPYmouY29udHJvbEJvcmRlcldpZHRoO1xyXG5cdFx0dmFyIHlWYWwgPSAxMDAgLSAoeSAqICgxMDAgLyAodGhpc09iai5oZWlnaHQgLSAxKSkpO1xyXG5cclxuXHRcdHN3aXRjaCAoanNjLmdldFNsaWRlckNoYW5uZWwodGhpc09iaikpIHtcclxuXHRcdGNhc2UgJ3MnOiB0aGlzT2JqLmZyb21IU1ZBKG51bGwsIHlWYWwsIG51bGwsIG51bGwpOyBicmVhaztcclxuXHRcdGNhc2UgJ3YnOiB0aGlzT2JqLmZyb21IU1ZBKG51bGwsIG51bGwsIHlWYWwsIG51bGwpOyBicmVhaztcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0c2V0QVNsZCA6IGZ1bmN0aW9uICh0aGlzT2JqLCBlLCBvZnNZKSB7XHJcblx0XHR2YXIgcG9pbnRlckFicyA9IGpzYy5nZXRBYnNQb2ludGVyUG9zKGUpO1xyXG5cdFx0dmFyIHkgPSBvZnNZICsgcG9pbnRlckFicy55IC0ganNjLl9wb2ludGVyT3JpZ2luLnkgLSB0aGlzT2JqLnBhZGRpbmcgLSB0aGlzT2JqLmNvbnRyb2xCb3JkZXJXaWR0aDtcclxuXHRcdHZhciB5VmFsID0gMS4wIC0gKHkgKiAoMS4wIC8gKHRoaXNPYmouaGVpZ2h0IC0gMSkpKTtcclxuXHJcblx0XHRpZiAoeVZhbCA8IDEuMCkge1xyXG5cdFx0XHQvLyBpZiBmb3JtYXQgaXMgZmxleGlibGUgYW5kIHRoZSBjdXJyZW50IGZvcm1hdCBkb2Vzbid0IHN1cHBvcnQgYWxwaGEsIHN3aXRjaCB0byBhIHN1aXRhYmxlIG9uZVxyXG5cdFx0XHRpZiAodGhpc09iai5mb3JtYXQudG9Mb3dlckNhc2UoKSA9PT0gJ2FueScgJiYgdGhpc09iai5nZXRGb3JtYXQoKSAhPT0gJ3JnYmEnKSB7XHJcblx0XHRcdFx0dGhpc09iai5fY3VycmVudEZvcm1hdCA9ICdyZ2JhJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNPYmouZnJvbUhTVkEobnVsbCwgbnVsbCwgbnVsbCwgeVZhbCk7XHJcblx0fSxcclxuXHJcblxyXG5cdGNyZWF0ZVBhbGV0dGUgOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIHBhbGV0dGVPYmogPSB7XHJcblx0XHRcdGVsbTogbnVsbCxcclxuXHRcdFx0ZHJhdzogbnVsbFxyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgY2FudmFzID0ganNjLmNyZWF0ZUVsKCdjYW52YXMnKTtcclxuXHRcdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcblx0XHR2YXIgZHJhd0Z1bmMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgdHlwZSkge1xyXG5cdFx0XHRjYW52YXMud2lkdGggPSB3aWR0aDtcclxuXHRcdFx0Y2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcblx0XHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcblx0XHRcdHZhciBoR3JhZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCBjYW52YXMud2lkdGgsIDApO1xyXG5cdFx0XHRoR3JhZC5hZGRDb2xvclN0b3AoMCAvIDYsICcjRjAwJyk7XHJcblx0XHRcdGhHcmFkLmFkZENvbG9yU3RvcCgxIC8gNiwgJyNGRjAnKTtcclxuXHRcdFx0aEdyYWQuYWRkQ29sb3JTdG9wKDIgLyA2LCAnIzBGMCcpO1xyXG5cdFx0XHRoR3JhZC5hZGRDb2xvclN0b3AoMyAvIDYsICcjMEZGJyk7XHJcblx0XHRcdGhHcmFkLmFkZENvbG9yU3RvcCg0IC8gNiwgJyMwMEYnKTtcclxuXHRcdFx0aEdyYWQuYWRkQ29sb3JTdG9wKDUgLyA2LCAnI0YwRicpO1xyXG5cdFx0XHRoR3JhZC5hZGRDb2xvclN0b3AoNiAvIDYsICcjRjAwJyk7XHJcblxyXG5cdFx0XHRjdHguZmlsbFN0eWxlID0gaEdyYWQ7XHJcblx0XHRcdGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuXHRcdFx0dmFyIHZHcmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRzd2l0Y2ggKHR5cGUudG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRjYXNlICdzJzpcclxuXHRcdFx0XHR2R3JhZC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjU1LDI1NSwyNTUsMCknKTtcclxuXHRcdFx0XHR2R3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMjU1LDI1NSwyNTUsMSknKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndic6XHJcblx0XHRcdFx0dkdyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDAsMCwwLDApJyk7XHJcblx0XHRcdFx0dkdyYWQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDAsMCwwLDEpJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IHZHcmFkO1xyXG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0cGFsZXR0ZU9iai5lbG0gPSBjYW52YXM7XHJcblx0XHRwYWxldHRlT2JqLmRyYXcgPSBkcmF3RnVuYztcclxuXHJcblx0XHRyZXR1cm4gcGFsZXR0ZU9iajtcclxuXHR9LFxyXG5cclxuXHJcblx0Y3JlYXRlU2xpZGVyR3JhZGllbnQgOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIHNsaWRlck9iaiA9IHtcclxuXHRcdFx0ZWxtOiBudWxsLFxyXG5cdFx0XHRkcmF3OiBudWxsXHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBjYW52YXMgPSBqc2MuY3JlYXRlRWwoJ2NhbnZhcycpO1xyXG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRcdHZhciBkcmF3RnVuYyA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBjb2xvcjEsIGNvbG9yMikge1xyXG5cdFx0XHRjYW52YXMud2lkdGggPSB3aWR0aDtcclxuXHRcdFx0Y2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcblx0XHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcblx0XHRcdHZhciBncmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRncmFkLmFkZENvbG9yU3RvcCgwLCBjb2xvcjEpO1xyXG5cdFx0XHRncmFkLmFkZENvbG9yU3RvcCgxLCBjb2xvcjIpO1xyXG5cclxuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IGdyYWQ7XHJcblx0XHRcdGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRzbGlkZXJPYmouZWxtID0gY2FudmFzO1xyXG5cdFx0c2xpZGVyT2JqLmRyYXcgPSBkcmF3RnVuYztcclxuXHJcblx0XHRyZXR1cm4gc2xpZGVyT2JqO1xyXG5cdH0sXHJcblxyXG5cclxuXHRjcmVhdGVBU2xpZGVyR3JhZGllbnQgOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIHNsaWRlck9iaiA9IHtcclxuXHRcdFx0ZWxtOiBudWxsLFxyXG5cdFx0XHRkcmF3OiBudWxsXHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBjYW52YXMgPSBqc2MuY3JlYXRlRWwoJ2NhbnZhcycpO1xyXG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRcdHZhciBkcmF3RnVuYyA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBjb2xvcikge1xyXG5cdFx0XHRjYW52YXMud2lkdGggPSB3aWR0aDtcclxuXHRcdFx0Y2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcblx0XHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcblx0XHRcdHZhciBzcVNpemUgPSBjYW52YXMud2lkdGggLyAyO1xyXG5cdFx0XHR2YXIgc3FDb2xvcjEgPSBqc2MucHViLmNoZXNzYm9hcmRDb2xvcjE7XHJcblx0XHRcdHZhciBzcUNvbG9yMiA9IGpzYy5wdWIuY2hlc3Nib2FyZENvbG9yMjtcclxuXHJcblx0XHRcdC8vIGRhcmsgZ3JheSBiYWNrZ3JvdW5kXHJcblx0XHRcdGN0eC5maWxsU3R5bGUgPSBzcUNvbG9yMTtcclxuXHRcdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG5cdFx0XHRmb3IgKHZhciB5ID0gMDsgeSA8IGNhbnZhcy5oZWlnaHQ7IHkgKz0gc3FTaXplICogMikge1xyXG5cdFx0XHRcdC8vIGxpZ2h0IGdyYXkgc3F1YXJlc1xyXG5cdFx0XHRcdGN0eC5maWxsU3R5bGUgPSBzcUNvbG9yMjtcclxuXHRcdFx0XHRjdHguZmlsbFJlY3QoMCwgeSwgc3FTaXplLCBzcVNpemUpO1xyXG5cdFx0XHRcdGN0eC5maWxsUmVjdChzcVNpemUsIHkgKyBzcVNpemUsIHNxU2l6ZSwgc3FTaXplKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGdyYWQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgY2FudmFzLmhlaWdodCk7XHJcblx0XHRcdGdyYWQuYWRkQ29sb3JTdG9wKDAsIGNvbG9yKTtcclxuXHRcdFx0Z3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwwLDAsMCknKTtcclxuXHJcblx0XHRcdGN0eC5maWxsU3R5bGUgPSBncmFkO1xyXG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0c2xpZGVyT2JqLmVsbSA9IGNhbnZhcztcclxuXHRcdHNsaWRlck9iai5kcmF3ID0gZHJhd0Z1bmM7XHJcblxyXG5cdFx0cmV0dXJuIHNsaWRlck9iajtcclxuXHR9LFxyXG5cclxuXHJcblx0Qm94U2hhZG93IDogKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBCb3hTaGFkb3cgPSBmdW5jdGlvbiAoaFNoYWRvdywgdlNoYWRvdywgYmx1ciwgc3ByZWFkLCBjb2xvciwgaW5zZXQpIHtcclxuXHRcdFx0dGhpcy5oU2hhZG93ID0gaFNoYWRvdztcclxuXHRcdFx0dGhpcy52U2hhZG93ID0gdlNoYWRvdztcclxuXHRcdFx0dGhpcy5ibHVyID0gYmx1cjtcclxuXHRcdFx0dGhpcy5zcHJlYWQgPSBzcHJlYWQ7XHJcblx0XHRcdHRoaXMuY29sb3IgPSBjb2xvcjtcclxuXHRcdFx0dGhpcy5pbnNldCA9ICEhaW5zZXQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdEJveFNoYWRvdy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciB2YWxzID0gW1xyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy5oU2hhZG93KSArICdweCcsXHJcblx0XHRcdFx0TWF0aC5yb3VuZCh0aGlzLnZTaGFkb3cpICsgJ3B4JyxcclxuXHRcdFx0XHRNYXRoLnJvdW5kKHRoaXMuYmx1cikgKyAncHgnLFxyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy5zcHJlYWQpICsgJ3B4JyxcclxuXHRcdFx0XHR0aGlzLmNvbG9yXHJcblx0XHRcdF07XHJcblx0XHRcdGlmICh0aGlzLmluc2V0KSB7XHJcblx0XHRcdFx0dmFscy5wdXNoKCdpbnNldCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB2YWxzLmpvaW4oJyAnKTtcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIEJveFNoYWRvdztcclxuXHR9KSgpLFxyXG5cclxuXHJcblx0ZmxhZ3MgOiB7XHJcblx0XHRsZWF2ZVZhbHVlIDogMSA8PCAwLFxyXG5cdFx0bGVhdmVBbHBoYSA6IDEgPDwgMSxcclxuXHRcdGxlYXZlUHJldmlldyA6IDEgPDwgMixcclxuXHR9LFxyXG5cclxuXHJcblx0ZW51bU9wdHMgOiB7XHJcblx0XHRmb3JtYXQ6IFsnYXV0bycsICdhbnknLCAnaGV4JywgJ3JnYicsICdyZ2JhJ10sXHJcblx0XHRwcmV2aWV3UG9zaXRpb246IFsnbGVmdCcsICdyaWdodCddLFxyXG5cdFx0bW9kZTogWydoc3YnLCAnaHZzJywgJ2hzJywgJ2h2J10sXHJcblx0XHRwb3NpdGlvbjogWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXSxcclxuXHRcdGFscGhhQ2hhbm5lbDogWydhdXRvJywgdHJ1ZSwgZmFsc2VdLFxyXG5cdH0sXHJcblxyXG5cclxuXHRkZXByZWNhdGVkT3B0cyA6IHtcclxuXHRcdC8vIDxvbGRfb3B0aW9uPjogPG5ld19vcHRpb24+ICAoPG5ld19vcHRpb24+IGNhbiBiZSBudWxsKVxyXG5cdFx0J3N0eWxlRWxlbWVudCc6ICdwcmV2aWV3RWxlbWVudCcsXHJcblx0XHQnb25GaW5lQ2hhbmdlJzogJ29uSW5wdXQnLFxyXG5cdFx0J292ZXJ3cml0ZUltcG9ydGFudCc6ICdmb3JjZVN0eWxlJyxcclxuXHRcdCdjbG9zYWJsZSc6ICdjbG9zZUJ1dHRvbicsXHJcblx0XHQnaW5zZXRXaWR0aCc6ICdjb250cm9sQm9yZGVyV2lkdGgnLFxyXG5cdFx0J2luc2V0Q29sb3InOiAnY29udHJvbEJvcmRlckNvbG9yJyxcclxuXHRcdCdyZWZpbmUnOiBudWxsLFxyXG5cdH0sXHJcblxyXG5cclxuXHRkb2NzUmVmIDogJyAnICsgJ1NlZSBodHRwczovL2pzY29sb3IuY29tL2RvY3MvJyxcclxuXHJcblxyXG5cdC8vXHJcblx0Ly8gVXNhZ2U6XHJcblx0Ly8gdmFyIG15UGlja2VyID0gbmV3IEpTQ29sb3IoPHRhcmdldEVsZW1lbnQ+IFssIDxvcHRpb25zPl0pXHJcblx0Ly9cclxuXHQvLyAoY29uc3RydWN0b3IgaXMgYWNjZXNzaWJsZSB2aWEgYm90aCAnanNjb2xvcicgYW5kICdKU0NvbG9yJyBuYW1lKVxyXG5cdC8vXHJcblxyXG5cdHB1YiA6IGZ1bmN0aW9uICh0YXJnZXRFbGVtZW50LCBvcHRzKSB7XHJcblxyXG5cdFx0dmFyIFRISVMgPSB0aGlzO1xyXG5cclxuXHRcdGlmICghb3B0cykge1xyXG5cdFx0XHRvcHRzID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jaGFubmVscyA9IHtcclxuXHRcdFx0cjogMjU1LCAvLyByZWQgWzAtMjU1XVxyXG5cdFx0XHRnOiAyNTUsIC8vIGdyZWVuIFswLTI1NV1cclxuXHRcdFx0YjogMjU1LCAvLyBibHVlIFswLTI1NV1cclxuXHRcdFx0aDogMCwgLy8gaHVlIFswLTM2MF1cclxuXHRcdFx0czogMCwgLy8gc2F0dXJhdGlvbiBbMC0xMDBdXHJcblx0XHRcdHY6IDEwMCwgLy8gdmFsdWUgKGJyaWdodG5lc3MpIFswLTEwMF1cclxuXHRcdFx0YTogMS4wLCAvLyBhbHBoYSAob3BhY2l0eSkgWzAuMCAtIDEuMF1cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gR2VuZXJhbCBvcHRpb25zXHJcblx0XHQvL1xyXG5cdFx0dGhpcy5mb3JtYXQgPSAnYXV0byc7IC8vICdhdXRvJyB8ICdhbnknIHwgJ2hleCcgfCAncmdiJyB8ICdyZ2JhJyAtIEZvcm1hdCBvZiB0aGUgaW5wdXQvb3V0cHV0IHZhbHVlXHJcblx0XHR0aGlzLnZhbHVlID0gdW5kZWZpbmVkOyAvLyBJTklUSUFMIGNvbG9yIHZhbHVlIGluIGFueSBzdXBwb3J0ZWQgZm9ybWF0LiBUbyBjaGFuZ2UgaXQgbGF0ZXIsIHVzZSBtZXRob2QgZnJvbVN0cmluZygpLCBmcm9tSFNWQSgpLCBmcm9tUkdCQSgpIG9yIGNoYW5uZWwoKVxyXG5cdFx0dGhpcy5hbHBoYSA9IHVuZGVmaW5lZDsgLy8gSU5JVElBTCBhbHBoYSB2YWx1ZS4gVG8gY2hhbmdlIGl0IGxhdGVyLCBjYWxsIG1ldGhvZCBjaGFubmVsKCdBJywgPHZhbHVlPilcclxuXHRcdHRoaXMub25DaGFuZ2UgPSB1bmRlZmluZWQ7IC8vIGNhbGxlZCB3aGVuIGNvbG9yIGNoYW5nZXMuIFZhbHVlIGNhbiBiZSBlaXRoZXIgYSBmdW5jdGlvbiBvciBhIHN0cmluZyB3aXRoIEpTIGNvZGUuXHJcblx0XHR0aGlzLm9uSW5wdXQgPSB1bmRlZmluZWQ7IC8vIGNhbGxlZCByZXBlYXRlZGx5IGFzIHRoZSBjb2xvciBpcyBiZWluZyBjaGFuZ2VkLCBlLmcuIHdoaWxlIGRyYWdnaW5nIGEgc2xpZGVyLiBWYWx1ZSBjYW4gYmUgZWl0aGVyIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmcgd2l0aCBKUyBjb2RlLlxyXG5cdFx0dGhpcy52YWx1ZUVsZW1lbnQgPSB1bmRlZmluZWQ7IC8vIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGlzcGxheSBhbmQgaW5wdXQgdGhlIGNvbG9yIHZhbHVlXHJcblx0XHR0aGlzLmFscGhhRWxlbWVudCA9IHVuZGVmaW5lZDsgLy8gZWxlbWVudCB0aGF0IHdpbGwgYmUgdXNlZCB0byBkaXNwbGF5IGFuZCBpbnB1dCB0aGUgYWxwaGEgKG9wYWNpdHkpIHZhbHVlXHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50ID0gdW5kZWZpbmVkOyAvLyBlbGVtZW50IHRoYXQgd2lsbCBwcmV2aWV3IHRoZSBwaWNrZWQgY29sb3IgdXNpbmcgQ1NTIGJhY2tncm91bmRcclxuXHRcdHRoaXMucHJldmlld1Bvc2l0aW9uID0gJ2xlZnQnOyAvLyAnbGVmdCcgfCAncmlnaHQnIC0gcG9zaXRpb24gb2YgdGhlIGNvbG9yIHByZXZpZXcgaW4gcHJldmlld0VsZW1lbnRcclxuXHRcdHRoaXMucHJldmlld1NpemUgPSAzMjsgLy8gKHB4KSB3aWR0aCBvZiB0aGUgY29sb3IgcHJldmlldyBkaXNwbGF5ZWQgaW4gcHJldmlld0VsZW1lbnRcclxuXHRcdHRoaXMucHJldmlld1BhZGRpbmcgPSA4OyAvLyAocHgpIHNwYWNlIGJldHdlZW4gY29sb3IgcHJldmlldyBhbmQgY29udGVudCBvZiB0aGUgcHJldmlld0VsZW1lbnRcclxuXHRcdHRoaXMucmVxdWlyZWQgPSB0cnVlOyAvLyB3aGV0aGVyIHRoZSBhc3NvY2lhdGVkIHRleHQgaW5wdXQgbXVzdCBhbHdheXMgY29udGFpbiBhIGNvbG9yIHZhbHVlLiBJZiBmYWxzZSwgdGhlIGlucHV0IGNhbiBiZSBsZWZ0IGVtcHR5LlxyXG5cdFx0dGhpcy5oYXNoID0gdHJ1ZTsgLy8gd2hldGhlciB0byBwcmVmaXggdGhlIEhFWCBjb2xvciBjb2RlIHdpdGggIyBzeW1ib2wgKG9ubHkgYXBwbGljYWJsZSBmb3IgSEVYIGZvcm1hdClcclxuXHRcdHRoaXMudXBwZXJjYXNlID0gdHJ1ZTsgLy8gd2hldGhlciB0byBzaG93IHRoZSBIRVggY29sb3IgY29kZSBpbiB1cHBlciBjYXNlIChvbmx5IGFwcGxpY2FibGUgZm9yIEhFWCBmb3JtYXQpXHJcblx0XHR0aGlzLmZvcmNlU3R5bGUgPSB0cnVlOyAvLyB3aGV0aGVyIHRvIG92ZXJ3cml0ZSBDU1Mgc3R5bGUgb2YgdGhlIHByZXZpZXdFbGVtZW50IHVzaW5nICFpbXBvcnRhbnQgZmxhZ1xyXG5cclxuXHRcdC8vIENvbG9yIFBpY2tlciBvcHRpb25zXHJcblx0XHQvL1xyXG5cdFx0dGhpcy53aWR0aCA9IDE4MTsgLy8gd2lkdGggb2YgY29sb3IgcGFsZXR0ZSAoaW4gcHgpXHJcblx0XHR0aGlzLmhlaWdodCA9IDEwMTsgLy8gaGVpZ2h0IG9mIGNvbG9yIHBhbGV0dGUgKGluIHB4KVxyXG5cdFx0dGhpcy5tb2RlID0gJ0hTVic7IC8vICdIU1YnIHwgJ0hWUycgfCAnSFMnIHwgJ0hWJyAtIGxheW91dCBvZiB0aGUgY29sb3IgcGlja2VyIGNvbnRyb2xzXHJcblx0XHR0aGlzLmFscGhhQ2hhbm5lbCA9ICdhdXRvJzsgLy8gJ2F1dG8nIHwgdHJ1ZSB8IGZhbHNlIC0gaWYgYWxwaGEgY2hhbm5lbCBpcyBlbmFibGVkLCB0aGUgYWxwaGEgc2xpZGVyIHdpbGwgYmUgdmlzaWJsZS4gSWYgJ2F1dG8nLCBpdCB3aWxsIGJlIGRldGVybWluZWQgYWNjb3JkaW5nIHRvIGNvbG9yIGZvcm1hdFxyXG5cdFx0dGhpcy5wb3NpdGlvbiA9ICdib3R0b20nOyAvLyAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcCcgfCAnYm90dG9tJyAtIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSB0YXJnZXQgZWxlbWVudFxyXG5cdFx0dGhpcy5zbWFydFBvc2l0aW9uID0gdHJ1ZTsgLy8gYXV0b21hdGljYWxseSBjaGFuZ2UgcGlja2VyIHBvc2l0aW9uIHdoZW4gdGhlcmUgaXMgbm90IGVub3VnaCBzcGFjZSBmb3IgaXRcclxuXHRcdHRoaXMuc2hvd09uQ2xpY2sgPSB0cnVlOyAvLyB3aGV0aGVyIHRvIHNob3cgdGhlIHBpY2tlciB3aGVuIHVzZXIgY2xpY2tzIGl0cyB0YXJnZXQgZWxlbWVudFxyXG5cdFx0dGhpcy5oaWRlT25MZWF2ZSA9IHRydWU7IC8vIHdoZXRoZXIgdG8gYXV0b21hdGljYWxseSBoaWRlIHRoZSBwaWNrZXIgd2hlbiB1c2VyIGxlYXZlcyBpdHMgdGFyZ2V0IGVsZW1lbnQgKGUuZy4gdXBvbiBjbGlja2luZyB0aGUgZG9jdW1lbnQpXHJcblx0XHR0aGlzLnNsaWRlclNpemUgPSAxNjsgLy8gcHhcclxuXHRcdHRoaXMuY3Jvc3NTaXplID0gODsgLy8gcHhcclxuXHRcdHRoaXMuY2xvc2VCdXR0b24gPSBmYWxzZTsgLy8gd2hldGhlciB0byBkaXNwbGF5IHRoZSBDbG9zZSBidXR0b25cclxuXHRcdHRoaXMuY2xvc2VUZXh0ID0gJ0Nsb3NlJztcclxuXHRcdHRoaXMuYnV0dG9uQ29sb3IgPSAncmdiYSgwLDAsMCwxKSc7IC8vIENTUyBjb2xvclxyXG5cdFx0dGhpcy5idXR0b25IZWlnaHQgPSAxODsgLy8gcHhcclxuXHRcdHRoaXMucGFkZGluZyA9IDEyOyAvLyBweFxyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTUsMjU1LDI1NSwxKSc7IC8vIENTUyBjb2xvclxyXG5cdFx0dGhpcy5ib3JkZXJXaWR0aCA9IDE7IC8vIHB4XHJcblx0XHR0aGlzLmJvcmRlckNvbG9yID0gJ3JnYmEoMTg3LDE4NywxODcsMSknOyAvLyBDU1MgY29sb3JcclxuXHRcdHRoaXMuYm9yZGVyUmFkaXVzID0gODsgLy8gcHhcclxuXHRcdHRoaXMuY29udHJvbEJvcmRlcldpZHRoID0gMTsgLy8gcHhcclxuXHRcdHRoaXMuY29udHJvbEJvcmRlckNvbG9yID0gJ3JnYmEoMTg3LDE4NywxODcsMSknOyAvLyBDU1MgY29sb3JcclxuXHRcdHRoaXMuc2hhZG93ID0gdHJ1ZTsgLy8gd2hldGhlciB0byBkaXNwbGF5IGEgc2hhZG93XHJcblx0XHR0aGlzLnNoYWRvd0JsdXIgPSAxNTsgLy8gcHhcclxuXHRcdHRoaXMuc2hhZG93Q29sb3IgPSAncmdiYSgwLDAsMCwwLjIpJzsgLy8gQ1NTIGNvbG9yXHJcblx0XHR0aGlzLnBvaW50ZXJDb2xvciA9ICdyZ2JhKDc2LDc2LDc2LDEpJzsgLy8gQ1NTIGNvbG9yXHJcblx0XHR0aGlzLnBvaW50ZXJCb3JkZXJXaWR0aCA9IDE7IC8vIHB4XHJcblx0XHR0aGlzLnBvaW50ZXJCb3JkZXJDb2xvciA9ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJzsgLy8gQ1NTIGNvbG9yXHJcblx0XHR0aGlzLnBvaW50ZXJUaGlja25lc3MgPSAyOyAvLyBweFxyXG5cdFx0dGhpcy56SW5kZXggPSA1MDAwO1xyXG5cdFx0dGhpcy5jb250YWluZXIgPSB1bmRlZmluZWQ7IC8vIHdoZXJlIHRvIGFwcGVuZCB0aGUgY29sb3IgcGlja2VyIChCT0RZIGVsZW1lbnQgYnkgZGVmYXVsdClcclxuXHJcblx0XHQvLyBFeHBlcmltZW50YWxcclxuXHRcdC8vXHJcblx0XHR0aGlzLm1pblMgPSAwOyAvLyBtaW4gYWxsb3dlZCBzYXR1cmF0aW9uICgwIC0gMTAwKVxyXG5cdFx0dGhpcy5tYXhTID0gMTAwOyAvLyBtYXggYWxsb3dlZCBzYXR1cmF0aW9uICgwIC0gMTAwKVxyXG5cdFx0dGhpcy5taW5WID0gMDsgLy8gbWluIGFsbG93ZWQgdmFsdWUgKGJyaWdodG5lc3MpICgwIC0gMTAwKVxyXG5cdFx0dGhpcy5tYXhWID0gMTAwOyAvLyBtYXggYWxsb3dlZCB2YWx1ZSAoYnJpZ2h0bmVzcykgKDAgLSAxMDApXHJcblx0XHR0aGlzLm1pbkEgPSAwLjA7IC8vIG1pbiBhbGxvd2VkIGFscGhhIChvcGFjaXR5KSAoMC4wIC0gMS4wKVxyXG5cdFx0dGhpcy5tYXhBID0gMS4wOyAvLyBtYXggYWxsb3dlZCBhbHBoYSAob3BhY2l0eSkgKDAuMCAtIDEuMClcclxuXHJcblxyXG5cdFx0Ly8gbGV0J3MgcHJvY2VzcyB0aGUgREVQUkVDQVRFRCAnb3B0aW9ucycgcHJvcGVydHkgKHRoaXMgd2lsbCBiZSBsYXRlciByZW1vdmVkKVxyXG5cdFx0aWYgKGpzYy5wdWIub3B0aW9ucykge1xyXG5cdFx0XHQvLyBsZXQncyBzZXQgY3VzdG9tIGRlZmF1bHQgb3B0aW9ucywgaWYgc3BlY2lmaWVkXHJcblx0XHRcdGZvciAodmFyIG9wdCBpbiBqc2MucHViLm9wdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAoanNjLnB1Yi5vcHRpb25zLmhhc093blByb3BlcnR5KG9wdCkpIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHNldE9wdGlvbihvcHQsIGpzYy5wdWIub3B0aW9uc1tvcHRdKTtcclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBsZXQncyBhcHBseSBjb25maWd1cmF0aW9uIHByZXNldHNcclxuXHRcdC8vXHJcblx0XHR2YXIgcHJlc2V0c0FyciA9IFtdO1xyXG5cclxuXHRcdGlmIChvcHRzLnByZXNldCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG9wdHMucHJlc2V0ID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdHByZXNldHNBcnIgPSBvcHRzLnByZXNldC5zcGxpdCgvXFxzKy8pO1xyXG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0cy5wcmVzZXQpKSB7XHJcblx0XHRcdFx0cHJlc2V0c0FyciA9IG9wdHMucHJlc2V0LnNsaWNlKCk7IC8vIHNsaWNlKCkgdG8gY2xvbmVcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ1VucmVjb2duaXplZCBwcmVzZXQgdmFsdWUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFsd2F5cyB1c2UgdGhlICdkZWZhdWx0JyBwcmVzZXQuIElmIGl0J3Mgbm90IGxpc3RlZCwgYXBwZW5kIGl0IHRvIHRoZSBlbmQuXHJcblx0XHRpZiAocHJlc2V0c0Fyci5pbmRleE9mKCdkZWZhdWx0JykgPT09IC0xKSB7XHJcblx0XHRcdHByZXNldHNBcnIucHVzaCgnZGVmYXVsdCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGxldCdzIGFwcGx5IHRoZSBwcmVzZXRzIGluIHJldmVyc2Ugb3JkZXIsIHNvIHRoYXQgc2hvdWxkIHRoZXJlIGJlIGFueSBvdmVybGFwcGluZyBvcHRpb25zLFxyXG5cdFx0Ly8gdGhlIGZvcm1lcmx5IGxpc3RlZCBwcmVzZXQgd2lsbCBvdmVycmlkZSB0aGUgbGF0dGVyXHJcblx0XHRmb3IgKHZhciBpID0gcHJlc2V0c0Fyci5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xyXG5cdFx0XHR2YXIgcHJlcyA9IHByZXNldHNBcnJbaV07XHJcblx0XHRcdGlmICghcHJlcykge1xyXG5cdFx0XHRcdGNvbnRpbnVlOyAvLyBwcmVzZXQgaXMgZW1wdHkgc3RyaW5nXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFqc2MucHViLnByZXNldHMuaGFzT3duUHJvcGVydHkocHJlcykpIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ1Vua25vd24gcHJlc2V0OiAlcycsIHByZXMpO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvciAodmFyIG9wdCBpbiBqc2MucHViLnByZXNldHNbcHJlc10pIHtcclxuXHRcdFx0XHRpZiAoanNjLnB1Yi5wcmVzZXRzW3ByZXNdLmhhc093blByb3BlcnR5KG9wdCkpIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHNldE9wdGlvbihvcHQsIGpzYy5wdWIucHJlc2V0c1twcmVzXVtvcHRdKTtcclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBsZXQncyBzZXQgc3BlY2lmaWMgb3B0aW9ucyBmb3IgdGhpcyBjb2xvciBwaWNrZXJcclxuXHRcdHZhciBub25Qcm9wZXJ0aWVzID0gW1xyXG5cdFx0XHQvLyB0aGVzZSBvcHRpb25zIHdvbid0IGJlIHNldCBhcyBpbnN0YW5jZSBwcm9wZXJ0aWVzXHJcblx0XHRcdCdwcmVzZXQnLFxyXG5cdFx0XTtcclxuXHRcdGZvciAodmFyIG9wdCBpbiBvcHRzKSB7XHJcblx0XHRcdGlmIChvcHRzLmhhc093blByb3BlcnR5KG9wdCkpIHtcclxuXHRcdFx0XHRpZiAobm9uUHJvcGVydGllcy5pbmRleE9mKG9wdCkgPT09IC0xKSB7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRzZXRPcHRpb24ob3B0LCBvcHRzW29wdF0pO1xyXG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vIEdldHRlcjogb3B0aW9uKG5hbWUpXHJcblx0XHQvLyBTZXR0ZXI6IG9wdGlvbihuYW1lLCB2YWx1ZSlcclxuXHRcdC8vICAgICAgICAgb3B0aW9uKHtuYW1lOnZhbHVlLCAuLi59KVxyXG5cdFx0Ly9cclxuXHRcdHRoaXMub3B0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ05vIG9wdGlvbiBzcGVjaWZpZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHQvLyBnZXR0aW5nIGEgc2luZ2xlIG9wdGlvblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZ2V0T3B0aW9uKGFyZ3VtZW50c1swXSk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMiAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdC8vIHNldHRpbmcgYSBzaW5nbGUgb3B0aW9uXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGlmICghc2V0T3B0aW9uKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnJlZHJhdygpOyAvLyBpbW1lZGlhdGVseSByZWRyYXdzIHRoZSBwaWNrZXIsIGlmIGl0J3MgZGlzcGxheWVkXHJcblx0XHRcdFx0dGhpcy5leHBvc2VDb2xvcigpOyAvLyBpbiBjYXNlIHNvbWUgcHJldmlldy1yZWxhdGVkIG9yIGZvcm1hdC1yZWxhdGVkIG9wdGlvbiB3YXMgY2hhbmdlZFxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0Ly8gc2V0dGluZyBtdWx0aXBsZSBvcHRpb25zXHJcblx0XHRcdFx0dmFyIG9wdHMgPSBhcmd1bWVudHNbMF07XHJcblx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB0cnVlO1xyXG5cdFx0XHRcdGZvciAodmFyIG9wdCBpbiBvcHRzKSB7XHJcblx0XHRcdFx0XHRpZiAob3B0cy5oYXNPd25Qcm9wZXJ0eShvcHQpKSB7XHJcblx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFzZXRPcHRpb24ob3B0LCBvcHRzW29wdF0pKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3MgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnJlZHJhdygpOyAvLyBpbW1lZGlhdGVseSByZWRyYXdzIHRoZSBwaWNrZXIsIGlmIGl0J3MgZGlzcGxheWVkXHJcblx0XHRcdFx0dGhpcy5leHBvc2VDb2xvcigpOyAvLyBpbiBjYXNlIHNvbWUgcHJldmlldy1yZWxhdGVkIG9yIGZvcm1hdC1yZWxhdGVkIG9wdGlvbiB3YXMgY2hhbmdlZFxyXG5cdFx0XHRcdHJldHVybiBzdWNjZXNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vIEdldHRlcjogY2hhbm5lbChuYW1lKVxyXG5cdFx0Ly8gU2V0dGVyOiBjaGFubmVsKG5hbWUsIHZhbHVlKVxyXG5cdFx0Ly9cclxuXHRcdHRoaXMuY2hhbm5lbCA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlIGZvciBjaGFubmVsIG5hbWU6ICcgKyBuYW1lKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHQvLyBnZXR0aW5nIGNoYW5uZWwgdmFsdWVcclxuXHRcdFx0XHRpZiAoIXRoaXMuY2hhbm5lbHMuaGFzT3duUHJvcGVydHkobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdHZXR0aW5nIHVua25vd24gY2hhbm5lbDogJyArIG5hbWUpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jaGFubmVsc1tuYW1lLnRvTG93ZXJDYXNlKCldO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBzZXR0aW5nIGNoYW5uZWwgdmFsdWVcclxuXHRcdFx0XHR2YXIgcmVzID0gZmFsc2U7XHJcblx0XHRcdFx0c3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcclxuXHRcdFx0XHRcdGNhc2UgJ3InOiByZXMgPSB0aGlzLmZyb21SR0JBKHZhbHVlLCBudWxsLCBudWxsLCBudWxsKTsgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICdnJzogcmVzID0gdGhpcy5mcm9tUkdCQShudWxsLCB2YWx1ZSwgbnVsbCwgbnVsbCk7IGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnYic6IHJlcyA9IHRoaXMuZnJvbVJHQkEobnVsbCwgbnVsbCwgdmFsdWUsIG51bGwpOyBicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ2gnOiByZXMgPSB0aGlzLmZyb21IU1ZBKHZhbHVlLCBudWxsLCBudWxsLCBudWxsKTsgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICdzJzogcmVzID0gdGhpcy5mcm9tSFNWQShudWxsLCB2YWx1ZSwgbnVsbCwgbnVsbCk7IGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAndic6IHJlcyA9IHRoaXMuZnJvbUhTVkEobnVsbCwgbnVsbCwgdmFsdWUsIG51bGwpOyBicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ2EnOiByZXMgPSB0aGlzLmZyb21IU1ZBKG51bGwsIG51bGwsIG51bGwsIHZhbHVlKTsgYnJlYWs7XHJcblx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ1NldHRpbmcgdW5rbm93biBjaGFubmVsOiAnICsgbmFtZSk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHJlcykge1xyXG5cdFx0XHRcdFx0dGhpcy5yZWRyYXcoKTsgLy8gaW1tZWRpYXRlbHkgcmVkcmF3cyB0aGUgcGlja2VyLCBpZiBpdCdzIGRpc3BsYXllZFxyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vIFRyaWdnZXJzIGdpdmVuIGlucHV0IGV2ZW50KHMpIGJ5OlxyXG5cdFx0Ly8gLSBleGVjdXRpbmcgb248RXZlbnQ+IGNhbGxiYWNrIHNwZWNpZmllZCBhcyBwaWNrZXIncyBvcHRpb25cclxuXHRcdC8vIC0gdHJpZ2dlcmluZyBzdGFuZGFyZCBET00gZXZlbnQgbGlzdGVuZXJzIGF0dGFjaGVkIHRvIHRoZSB2YWx1ZSBlbGVtZW50XHJcblx0XHQvL1xyXG5cdFx0Ly8gSXQgaXMgcG9zc2libGUgdG8gc3BlY2lmeSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIHdpdGggYSBzcGFjZS5cclxuXHRcdC8vXHJcblx0XHR0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lcykge1xyXG5cdFx0XHR2YXIgZXZzID0ganNjLnN0ckxpc3QoZXZlbnROYW1lcyk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZXZzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0dmFyIGV2ID0gZXZzW2ldLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0XHRcdC8vIHRyaWdnZXIgYSBjYWxsYmFja1xyXG5cdFx0XHRcdHZhciBjYWxsYmFja1Byb3AgPSBudWxsO1xyXG5cdFx0XHRcdHN3aXRjaCAoZXYpIHtcclxuXHRcdFx0XHRcdGNhc2UgJ2lucHV0JzogY2FsbGJhY2tQcm9wID0gJ29uSW5wdXQnOyBicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ2NoYW5nZSc6IGNhbGxiYWNrUHJvcCA9ICdvbkNoYW5nZSc7IGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoY2FsbGJhY2tQcm9wKSB7XHJcblx0XHRcdFx0XHRqc2MudHJpZ2dlckNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrUHJvcCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyB0cmlnZ2VyIHN0YW5kYXJkIERPTSBldmVudCBsaXN0ZW5lcnMgb24gdGhlIHZhbHVlIGVsZW1lbnRcclxuXHRcdFx0XHRqc2MudHJpZ2dlcklucHV0RXZlbnQodGhpcy52YWx1ZUVsZW1lbnQsIGV2LCB0cnVlLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0Ly8gaDogMC0zNjBcclxuXHRcdC8vIHM6IDAtMTAwXHJcblx0XHQvLyB2OiAwLTEwMFxyXG5cdFx0Ly8gYTogMC4wLTEuMFxyXG5cdFx0Ly9cclxuXHRcdHRoaXMuZnJvbUhTVkEgPSBmdW5jdGlvbiAoaCwgcywgdiwgYSwgZmxhZ3MpIHsgLy8gbnVsbCA9IGRvbid0IGNoYW5nZVxyXG5cdFx0XHRpZiAoaCA9PT0gdW5kZWZpbmVkKSB7IGggPSBudWxsOyB9XHJcblx0XHRcdGlmIChzID09PSB1bmRlZmluZWQpIHsgcyA9IG51bGw7IH1cclxuXHRcdFx0aWYgKHYgPT09IHVuZGVmaW5lZCkgeyB2ID0gbnVsbDsgfVxyXG5cdFx0XHRpZiAoYSA9PT0gdW5kZWZpbmVkKSB7IGEgPSBudWxsOyB9XHJcblxyXG5cdFx0XHRpZiAoaCAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmIChpc05hTihoKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdFx0XHR0aGlzLmNoYW5uZWxzLmggPSBNYXRoLm1heCgwLCBNYXRoLm1pbigzNjAsIGgpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocyAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmIChpc05hTihzKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdFx0XHR0aGlzLmNoYW5uZWxzLnMgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHRoaXMubWF4UywgcyksIHRoaXMubWluUyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHYgIT09IG51bGwpIHtcclxuXHRcdFx0XHRpZiAoaXNOYU4odikpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy52ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB0aGlzLm1heFYsIHYpLCB0aGlzLm1pblYpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChhICE9PSBudWxsKSB7XHJcblx0XHRcdFx0aWYgKGlzTmFOKGEpKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFx0XHRcdHRoaXMuY2hhbm5lbHMuYSA9IHRoaXMuaGFzQWxwaGFDaGFubmVsKCkgP1xyXG5cdFx0XHRcdFx0TWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdGhpcy5tYXhBLCBhKSwgdGhpcy5taW5BKSA6XHJcblx0XHRcdFx0XHQxLjA7IC8vIGlmIGFscGhhIGNoYW5uZWwgaXMgZGlzYWJsZWQsIHRoZSBjb2xvciBzaG91bGQgc3RheSAxMDAlIG9wYXF1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmdiID0ganNjLkhTVl9SR0IoXHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy5oLFxyXG5cdFx0XHRcdHRoaXMuY2hhbm5lbHMucyxcclxuXHRcdFx0XHR0aGlzLmNoYW5uZWxzLnZcclxuXHRcdFx0KTtcclxuXHRcdFx0dGhpcy5jaGFubmVscy5yID0gcmdiWzBdO1xyXG5cdFx0XHR0aGlzLmNoYW5uZWxzLmcgPSByZ2JbMV07XHJcblx0XHRcdHRoaXMuY2hhbm5lbHMuYiA9IHJnYlsyXTtcclxuXHJcblx0XHRcdHRoaXMuZXhwb3NlQ29sb3IoZmxhZ3MpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8vIHI6IDAtMjU1XHJcblx0XHQvLyBnOiAwLTI1NVxyXG5cdFx0Ly8gYjogMC0yNTVcclxuXHRcdC8vIGE6IDAuMC0xLjBcclxuXHRcdC8vXHJcblx0XHR0aGlzLmZyb21SR0JBID0gZnVuY3Rpb24gKHIsIGcsIGIsIGEsIGZsYWdzKSB7IC8vIG51bGwgPSBkb24ndCBjaGFuZ2VcclxuXHRcdFx0aWYgKHIgPT09IHVuZGVmaW5lZCkgeyByID0gbnVsbDsgfVxyXG5cdFx0XHRpZiAoZyA9PT0gdW5kZWZpbmVkKSB7IGcgPSBudWxsOyB9XHJcblx0XHRcdGlmIChiID09PSB1bmRlZmluZWQpIHsgYiA9IG51bGw7IH1cclxuXHRcdFx0aWYgKGEgPT09IHVuZGVmaW5lZCkgeyBhID0gbnVsbDsgfVxyXG5cclxuXHRcdFx0aWYgKHIgIT09IG51bGwpIHtcclxuXHRcdFx0XHRpZiAoaXNOYU4ocikpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcdFx0ciA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgcikpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChnICE9PSBudWxsKSB7XHJcblx0XHRcdFx0aWYgKGlzTmFOKGcpKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFx0XHRcdGcgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIGcpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoYiAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmIChpc05hTihiKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdFx0XHRiID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBiKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGEgIT09IG51bGwpIHtcclxuXHRcdFx0XHRpZiAoaXNOYU4oYSkpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy5hID0gdGhpcy5oYXNBbHBoYUNoYW5uZWwoKSA/XHJcblx0XHRcdFx0XHRNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0aGlzLm1heEEsIGEpLCB0aGlzLm1pbkEpIDpcclxuXHRcdFx0XHRcdDEuMDsgLy8gaWYgYWxwaGEgY2hhbm5lbCBpcyBkaXNhYmxlZCwgdGhlIGNvbG9yIHNob3VsZCBzdGF5IDEwMCUgb3BhcXVlXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBoc3YgPSBqc2MuUkdCX0hTVihcclxuXHRcdFx0XHRyPT09bnVsbCA/IHRoaXMuY2hhbm5lbHMuciA6IHIsXHJcblx0XHRcdFx0Zz09PW51bGwgPyB0aGlzLmNoYW5uZWxzLmcgOiBnLFxyXG5cdFx0XHRcdGI9PT1udWxsID8gdGhpcy5jaGFubmVscy5iIDogYlxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoaHN2WzBdICE9PSBudWxsKSB7XHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy5oID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMzYwLCBoc3ZbMF0pKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaHN2WzJdICE9PSAwKSB7IC8vIGZ1bGx5IGJsYWNrIGNvbG9yIHN0YXlzIGJsYWNrIHRocm91Z2ggZW50aXJlIHNhdHVyYXRpb24gcmFuZ2UsIHNvIGxldCdzIG5vdCBjaGFuZ2Ugc2F0dXJhdGlvblxyXG5cdFx0XHRcdHRoaXMuY2hhbm5lbHMucyA9IE1hdGgubWF4KDAsIHRoaXMubWluUywgTWF0aC5taW4oMTAwLCB0aGlzLm1heFMsIGhzdlsxXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY2hhbm5lbHMudiA9IE1hdGgubWF4KDAsIHRoaXMubWluViwgTWF0aC5taW4oMTAwLCB0aGlzLm1heFYsIGhzdlsyXSkpO1xyXG5cclxuXHRcdFx0Ly8gdXBkYXRlIFJHQiBhY2NvcmRpbmcgdG8gZmluYWwgSFNWLCBhcyBzb21lIHZhbHVlcyBtaWdodCBiZSB0cmltbWVkXHJcblx0XHRcdHZhciByZ2IgPSBqc2MuSFNWX1JHQih0aGlzLmNoYW5uZWxzLmgsIHRoaXMuY2hhbm5lbHMucywgdGhpcy5jaGFubmVscy52KTtcclxuXHRcdFx0dGhpcy5jaGFubmVscy5yID0gcmdiWzBdO1xyXG5cdFx0XHR0aGlzLmNoYW5uZWxzLmcgPSByZ2JbMV07XHJcblx0XHRcdHRoaXMuY2hhbm5lbHMuYiA9IHJnYlsyXTtcclxuXHJcblx0XHRcdHRoaXMuZXhwb3NlQ29sb3IoZmxhZ3MpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8vIERFUFJFQ0FURUQuIFVzZSAuZnJvbUhTVkEoKSBpbnN0ZWFkXHJcblx0XHQvL1xyXG5cdFx0dGhpcy5mcm9tSFNWID0gZnVuY3Rpb24gKGgsIHMsIHYsIGZsYWdzKSB7XHJcblx0XHRcdGNvbnNvbGUud2FybignZnJvbUhTVigpIG1ldGhvZCBpcyBERVBSRUNBVEVELiBVc2luZyBmcm9tSFNWQSgpIGluc3RlYWQuJyArIGpzYy5kb2NzUmVmKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZnJvbUhTVkEoaCwgcywgdiwgbnVsbCwgZmxhZ3MpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0Ly8gREVQUkVDQVRFRC4gVXNlIC5mcm9tUkdCQSgpIGluc3RlYWRcclxuXHRcdC8vXHJcblx0XHR0aGlzLmZyb21SR0IgPSBmdW5jdGlvbiAociwgZywgYiwgZmxhZ3MpIHtcclxuXHRcdFx0Y29uc29sZS53YXJuKCdmcm9tUkdCKCkgbWV0aG9kIGlzIERFUFJFQ0FURUQuIFVzaW5nIGZyb21SR0JBKCkgaW5zdGVhZC4nICsganNjLmRvY3NSZWYpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5mcm9tUkdCQShyLCBnLCBiLCBudWxsLCBmbGFncyk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLmZyb21TdHJpbmcgPSBmdW5jdGlvbiAoc3RyLCBmbGFncykge1xyXG5cdFx0XHRpZiAoIXRoaXMucmVxdWlyZWQgJiYgc3RyLnRyaW0oKSA9PT0gJycpIHtcclxuXHRcdFx0XHQvLyBzZXR0aW5nIGVtcHR5IHN0cmluZyB0byBhbiBvcHRpb25hbCBjb2xvciBpbnB1dFxyXG5cdFx0XHRcdHRoaXMuc2V0UHJldmlld0VsZW1lbnRCZyhudWxsKTtcclxuXHRcdFx0XHR0aGlzLnNldFZhbHVlRWxlbWVudFZhbHVlKCcnKTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGNvbG9yID0ganNjLnBhcnNlQ29sb3JTdHJpbmcoc3RyKTtcclxuXHRcdFx0aWYgKCFjb2xvcikge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTsgLy8gY291bGQgbm90IHBhcnNlXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuZm9ybWF0LnRvTG93ZXJDYXNlKCkgPT09ICdhbnknKSB7XHJcblx0XHRcdFx0dGhpcy5fY3VycmVudEZvcm1hdCA9IGNvbG9yLmZvcm1hdDsgLy8gYWRhcHQgZm9ybWF0XHJcblx0XHRcdFx0aWYgKHRoaXMuZ2V0Rm9ybWF0KCkgIT09ICdyZ2JhJykge1xyXG5cdFx0XHRcdFx0Y29sb3IucmdiYVszXSA9IDEuMDsgLy8gd2hlbiBzd2l0Y2hpbmcgdG8gYSBmb3JtYXQgdGhhdCBkb2Vzbid0IHN1cHBvcnQgYWxwaGEsIHNldCBmdWxsIG9wYWNpdHlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5yZWRyYXcoKTsgLy8gdG8gc2hvdy9oaWRlIHRoZSBhbHBoYSBzbGlkZXIgYWNjb3JkaW5nIHRvIGN1cnJlbnQgZm9ybWF0XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5mcm9tUkdCQShcclxuXHRcdFx0XHRjb2xvci5yZ2JhWzBdLFxyXG5cdFx0XHRcdGNvbG9yLnJnYmFbMV0sXHJcblx0XHRcdFx0Y29sb3IucmdiYVsyXSxcclxuXHRcdFx0XHRjb2xvci5yZ2JhWzNdLFxyXG5cdFx0XHRcdGZsYWdzXHJcblx0XHRcdCk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuXHRcdFx0aWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Zm9ybWF0ID0gdGhpcy5nZXRGb3JtYXQoKTsgLy8gZm9ybWF0IG5vdCBzcGVjaWZpZWQgLT4gdXNlIHRoZSBjdXJyZW50IGZvcm1hdFxyXG5cdFx0XHR9XHJcblx0XHRcdHN3aXRjaCAoZm9ybWF0LnRvTG93ZXJDYXNlKCkpIHtcclxuXHRcdFx0XHRjYXNlICdoZXgnOiByZXR1cm4gdGhpcy50b0hFWFN0cmluZygpOyBicmVhaztcclxuXHRcdFx0XHRjYXNlICdyZ2InOiByZXR1cm4gdGhpcy50b1JHQlN0cmluZygpOyBicmVhaztcclxuXHRcdFx0XHRjYXNlICdyZ2JhJzogcmV0dXJuIHRoaXMudG9SR0JBU3RyaW5nKCk7IGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMudG9IRVhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiAnIycgKyAoXHJcblx0XHRcdFx0KCcwJyArIE1hdGgucm91bmQodGhpcy5jaGFubmVscy5yKS50b1N0cmluZygxNikpLnN1YnN0cigtMikgK1xyXG5cdFx0XHRcdCgnMCcgKyBNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMuZykudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpICtcclxuXHRcdFx0XHQoJzAnICsgTWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLmIpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKVxyXG5cdFx0XHQpLnRvVXBwZXJDYXNlKCk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnRvUkdCU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gKCdyZ2IoJyArXHJcblx0XHRcdFx0TWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLnIpICsgJywnICtcclxuXHRcdFx0XHRNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMuZykgKyAnLCcgK1xyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy5jaGFubmVscy5iKSArXHJcblx0XHRcdCcpJyk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnRvUkdCQVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuICgncmdiYSgnICtcclxuXHRcdFx0XHRNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMucikgKyAnLCcgK1xyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy5jaGFubmVscy5nKSArICcsJyArXHJcblx0XHRcdFx0TWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLmIpICsgJywnICtcclxuXHRcdFx0XHQoTWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLmEgKiAxMDApIC8gMTAwKSArXHJcblx0XHRcdCcpJyk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnRvR3JheXNjYWxlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDAuMjEzICogdGhpcy5jaGFubmVscy5yICtcclxuXHRcdFx0XHQwLjcxNSAqIHRoaXMuY2hhbm5lbHMuZyArXHJcblx0XHRcdFx0MC4wNzIgKiB0aGlzLmNoYW5uZWxzLmJcclxuXHRcdFx0KTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMudG9DYW52YXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBqc2MuZ2VuQ29sb3JQcmV2aWV3Q2FudmFzKHRoaXMudG9SR0JBU3RyaW5nKCkpLmNhbnZhcztcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMudG9EYXRhVVJMID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50b0NhbnZhcygpLnRvRGF0YVVSTCgpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy50b0JhY2tncm91bmQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBqc2MucHViLmJhY2tncm91bmQodGhpcy50b1JHQkFTdHJpbmcoKSk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLmlzTGlnaHQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnRvR3JheXNjYWxlKCkgPiAyNTUgLyAyO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoaXNQaWNrZXJPd25lcigpKSB7XHJcblx0XHRcdFx0ZGV0YWNoUGlja2VyKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZHJhd1BpY2tlcigpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5yZWRyYXcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChpc1BpY2tlck93bmVyKCkpIHtcclxuXHRcdFx0XHRkcmF3UGlja2VyKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuZ2V0Rm9ybWF0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudEZvcm1hdDtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuaGFzQWxwaGFDaGFubmVsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy5hbHBoYUNoYW5uZWwgPT09ICdhdXRvJykge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHR0aGlzLmZvcm1hdC50b0xvd2VyQ2FzZSgpID09PSAnYW55JyB8fCAvLyBmb3JtYXQgY2FuIGNoYW5nZSBvbiB0aGUgZmx5IChlLmcuIGZyb20gaGV4IHRvIHJnYmEpLCBzbyBsZXQncyBjb25zaWRlciB0aGUgYWxwaGEgY2hhbm5lbCBlbmFibGVkXHJcblx0XHRcdFx0XHR0aGlzLmdldEZvcm1hdCgpID09PSAncmdiYScgfHwgLy8gdGhlIGN1cnJlbnQgZm9ybWF0IHN1cHBvcnRzIGFscGhhIGNoYW5uZWxcclxuXHRcdFx0XHRcdHRoaXMuYWxwaGEgIT09IHVuZGVmaW5lZCB8fCAvLyBpbml0aWFsIGFscGhhIHZhbHVlIGlzIHNldCwgc28gd2UncmUgd29ya2luZyB3aXRoIGFscGhhIGNoYW5uZWxcclxuXHRcdFx0XHRcdHRoaXMuYWxwaGFFbGVtZW50ICE9PSB1bmRlZmluZWQgLy8gdGhlIGFscGhhIHZhbHVlIGlzIHJlZGlyZWN0ZWQsIHNvIHdlJ3JlIHdvcmtpbmcgd2l0aCBhbHBoYSBjaGFubmVsXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuYWxwaGFDaGFubmVsOyAvLyB0aGUgYWxwaGEgY2hhbm5lbCBpcyBleHBsaWNpdGx5IHNldFxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5wcm9jZXNzVmFsdWVJbnB1dCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdFx0aWYgKCF0aGlzLmZyb21TdHJpbmcoc3RyKSkge1xyXG5cdFx0XHRcdC8vIGNvdWxkIG5vdCBwYXJzZSB0aGUgY29sb3IgdmFsdWUgLSBsZXQncyBqdXN0IGV4cG9zZSB0aGUgY3VycmVudCBjb2xvclxyXG5cdFx0XHRcdHRoaXMuZXhwb3NlQ29sb3IoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5wcm9jZXNzQWxwaGFJbnB1dCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdFx0aWYgKCF0aGlzLmZyb21IU1ZBKG51bGwsIG51bGwsIG51bGwsIHBhcnNlRmxvYXQoc3RyKSkpIHtcclxuXHRcdFx0XHQvLyBjb3VsZCBub3QgcGFyc2UgdGhlIGFscGhhIHZhbHVlIC0gbGV0J3MganVzdCBleHBvc2UgdGhlIGN1cnJlbnQgY29sb3JcclxuXHRcdFx0XHR0aGlzLmV4cG9zZUNvbG9yKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuZXhwb3NlQ29sb3IgPSBmdW5jdGlvbiAoZmxhZ3MpIHtcclxuXHJcblx0XHRcdGlmICghKGZsYWdzICYganNjLmZsYWdzLmxlYXZlVmFsdWUpICYmIHRoaXMudmFsdWVFbGVtZW50KSB7XHJcblx0XHRcdFx0dmFyIHZhbHVlID0gdGhpcy50b1N0cmluZygpO1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5nZXRGb3JtYXQoKSA9PT0gJ2hleCcpIHtcclxuXHRcdFx0XHRcdGlmICghdGhpcy51cHBlcmNhc2UpIHsgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpOyB9XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMuaGFzaCkgeyB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL14jLywgJycpOyB9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLnNldFZhbHVlRWxlbWVudFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCEoZmxhZ3MgJiBqc2MuZmxhZ3MubGVhdmVBbHBoYSkgJiYgdGhpcy5hbHBoYUVsZW1lbnQpIHtcclxuXHRcdFx0XHR2YXIgdmFsdWUgPSBNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMuYSAqIDEwMCkgLyAxMDA7XHJcblx0XHRcdFx0dGhpcy5zZXRBbHBoYUVsZW1lbnRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghKGZsYWdzICYganNjLmZsYWdzLmxlYXZlUHJldmlldykgJiYgdGhpcy5wcmV2aWV3RWxlbWVudCkge1xyXG5cdFx0XHRcdHZhciBwcmV2aWV3UG9zID0gbnVsbDsgLy8gJ2xlZnQnIHwgJ3JpZ2h0JyAobnVsbCAtPiBmaWxsIHRoZSBlbnRpcmUgZWxlbWVudClcclxuXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0anNjLmlzVGV4dElucHV0KHRoaXMucHJldmlld0VsZW1lbnQpIHx8IC8vIHRleHQgaW5wdXRcclxuXHRcdFx0XHRcdChqc2MuaXNCdXR0b24odGhpcy5wcmV2aWV3RWxlbWVudCkgJiYgIWpzYy5pc0J1dHRvbkVtcHR5KHRoaXMucHJldmlld0VsZW1lbnQpKSAvLyBidXR0b24gd2l0aCB0ZXh0XHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRwcmV2aWV3UG9zID0gdGhpcy5wcmV2aWV3UG9zaXRpb247XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLnNldFByZXZpZXdFbGVtZW50QmcodGhpcy50b1JHQkFTdHJpbmcoKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpc1BpY2tlck93bmVyKCkpIHtcclxuXHRcdFx0XHRyZWRyYXdQYWQoKTtcclxuXHRcdFx0XHRyZWRyYXdTbGQoKTtcclxuXHRcdFx0XHRyZWRyYXdBU2xkKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuc2V0UHJldmlld0VsZW1lbnRCZyA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG5cdFx0XHRpZiAoIXRoaXMucHJldmlld0VsZW1lbnQpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBwb3NpdGlvbiA9IG51bGw7IC8vIGNvbG9yIHByZXZpZXcgcG9zaXRpb246ICBudWxsIHwgJ2xlZnQnIHwgJ3JpZ2h0J1xyXG5cdFx0XHR2YXIgd2lkdGggPSBudWxsOyAvLyBjb2xvciBwcmV2aWV3IHdpZHRoOiAgcHggfCBudWxsID0gZmlsbCB0aGUgZW50aXJlIGVsZW1lbnRcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdGpzYy5pc1RleHRJbnB1dCh0aGlzLnByZXZpZXdFbGVtZW50KSB8fCAvLyB0ZXh0IGlucHV0XHJcblx0XHRcdFx0KGpzYy5pc0J1dHRvbih0aGlzLnByZXZpZXdFbGVtZW50KSAmJiAhanNjLmlzQnV0dG9uRW1wdHkodGhpcy5wcmV2aWV3RWxlbWVudCkpIC8vIGJ1dHRvbiB3aXRoIHRleHRcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSB0aGlzLnByZXZpZXdQb3NpdGlvbjtcclxuXHRcdFx0XHR3aWR0aCA9IHRoaXMucHJldmlld1NpemU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBiYWNrZ3JvdW5kcyA9IFtdO1xyXG5cclxuXHRcdFx0aWYgKCFjb2xvcikge1xyXG5cdFx0XHRcdC8vIHRoZXJlIGlzIG5vIGNvbG9yIHByZXZpZXcgdG8gZGlzcGxheSAtPiBsZXQncyByZW1vdmUgYW55IHByZXZpb3VzIGJhY2tncm91bmQgaW1hZ2VcclxuXHRcdFx0XHRiYWNrZ3JvdW5kcy5wdXNoKHtcclxuXHRcdFx0XHRcdGltYWdlOiAnbm9uZScsXHJcblx0XHRcdFx0XHRwb3NpdGlvbjogJ2xlZnQgdG9wJyxcclxuXHRcdFx0XHRcdHNpemU6ICdhdXRvJyxcclxuXHRcdFx0XHRcdHJlcGVhdDogJ25vLXJlcGVhdCcsXHJcblx0XHRcdFx0XHRvcmlnaW46ICdwYWRkaW5nLWJveCcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gQ1NTIGdyYWRpZW50IGZvciBiYWNrZ3JvdW5kIGNvbG9yIHByZXZpZXdcclxuXHRcdFx0XHRiYWNrZ3JvdW5kcy5wdXNoKHtcclxuXHRcdFx0XHRcdGltYWdlOiBqc2MuZ2VuQ29sb3JQcmV2aWV3R3JhZGllbnQoXHJcblx0XHRcdFx0XHRcdGNvbG9yLFxyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbixcclxuXHRcdFx0XHRcdFx0d2lkdGggPyB3aWR0aCAtIGpzYy5wdWIucHJldmlld1NlcGFyYXRvci5sZW5ndGggOiBudWxsXHJcblx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0cG9zaXRpb246ICdsZWZ0IHRvcCcsXHJcblx0XHRcdFx0XHRzaXplOiAnYXV0bycsXHJcblx0XHRcdFx0XHRyZXBlYXQ6IHBvc2l0aW9uID8gJ3JlcGVhdC15JyA6ICdyZXBlYXQnLFxyXG5cdFx0XHRcdFx0b3JpZ2luOiAncGFkZGluZy1ib3gnLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQvLyBkYXRhIFVSTCBvZiBnZW5lcmF0ZWQgUE5HIGltYWdlIHdpdGggYSBncmF5IHRyYW5zcGFyZW5jeSBjaGVzc2JvYXJkXHJcblx0XHRcdFx0dmFyIHByZXZpZXcgPSBqc2MuZ2VuQ29sb3JQcmV2aWV3Q2FudmFzKFxyXG5cdFx0XHRcdFx0J3JnYmEoMCwwLDAsMCknLFxyXG5cdFx0XHRcdFx0cG9zaXRpb24gPyB7J2xlZnQnOidyaWdodCcsICdyaWdodCc6J2xlZnQnfVtwb3NpdGlvbl0gOiBudWxsLFxyXG5cdFx0XHRcdFx0d2lkdGgsXHJcblx0XHRcdFx0XHR0cnVlXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kcy5wdXNoKHtcclxuXHRcdFx0XHRcdGltYWdlOiAndXJsKFxcJycgKyBwcmV2aWV3LmNhbnZhcy50b0RhdGFVUkwoKSArICdcXCcpJyxcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiAocG9zaXRpb24gfHwgJ2xlZnQnKSArICcgdG9wJyxcclxuXHRcdFx0XHRcdHNpemU6IHByZXZpZXcud2lkdGggKyAncHggJyArIHByZXZpZXcuaGVpZ2h0ICsgJ3B4JyxcclxuXHRcdFx0XHRcdHJlcGVhdDogcG9zaXRpb24gPyAncmVwZWF0LXknIDogJ3JlcGVhdCcsXHJcblx0XHRcdFx0XHRvcmlnaW46ICdwYWRkaW5nLWJveCcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBiZyA9IHtcclxuXHRcdFx0XHRpbWFnZTogW10sXHJcblx0XHRcdFx0cG9zaXRpb246IFtdLFxyXG5cdFx0XHRcdHNpemU6IFtdLFxyXG5cdFx0XHRcdHJlcGVhdDogW10sXHJcblx0XHRcdFx0b3JpZ2luOiBbXSxcclxuXHRcdFx0fTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiYWNrZ3JvdW5kcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRcdGJnLmltYWdlLnB1c2goYmFja2dyb3VuZHNbaV0uaW1hZ2UpO1xyXG5cdFx0XHRcdGJnLnBvc2l0aW9uLnB1c2goYmFja2dyb3VuZHNbaV0ucG9zaXRpb24pO1xyXG5cdFx0XHRcdGJnLnNpemUucHVzaChiYWNrZ3JvdW5kc1tpXS5zaXplKTtcclxuXHRcdFx0XHRiZy5yZXBlYXQucHVzaChiYWNrZ3JvdW5kc1tpXS5yZXBlYXQpO1xyXG5cdFx0XHRcdGJnLm9yaWdpbi5wdXNoKGJhY2tncm91bmRzW2ldLm9yaWdpbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIHNldCBwcmV2aWV3RWxlbWVudCdzIGJhY2tncm91bmQtaW1hZ2VzXHJcblx0XHRcdHZhciBzdHkgPSB7XHJcblx0XHRcdFx0J2JhY2tncm91bmQtaW1hZ2UnOiBiZy5pbWFnZS5qb2luKCcsICcpLFxyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLXBvc2l0aW9uJzogYmcucG9zaXRpb24uam9pbignLCAnKSxcclxuXHRcdFx0XHQnYmFja2dyb3VuZC1zaXplJzogYmcuc2l6ZS5qb2luKCcsICcpLFxyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLXJlcGVhdCc6IGJnLnJlcGVhdC5qb2luKCcsICcpLFxyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLW9yaWdpbic6IGJnLm9yaWdpbi5qb2luKCcsICcpLFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRqc2Muc2V0U3R5bGUodGhpcy5wcmV2aWV3RWxlbWVudCwgc3R5LCB0aGlzLmZvcmNlU3R5bGUpO1xyXG5cclxuXHJcblx0XHRcdC8vIHNldC9yZXN0b3JlIHByZXZpZXdFbGVtZW50J3MgcGFkZGluZ1xyXG5cdFx0XHR2YXIgcGFkZGluZyA9IHtcclxuXHRcdFx0XHRsZWZ0OiBudWxsLFxyXG5cdFx0XHRcdHJpZ2h0OiBudWxsLFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRpZiAocG9zaXRpb24pIHtcclxuXHRcdFx0XHRwYWRkaW5nW3Bvc2l0aW9uXSA9ICh0aGlzLnByZXZpZXdTaXplICsgdGhpcy5wcmV2aWV3UGFkZGluZykgKyAncHgnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgc3R5ID0ge1xyXG5cdFx0XHRcdCdwYWRkaW5nLWxlZnQnOiBwYWRkaW5nLmxlZnQsXHJcblx0XHRcdFx0J3BhZGRpbmctcmlnaHQnOiBwYWRkaW5nLnJpZ2h0LFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRqc2Muc2V0U3R5bGUodGhpcy5wcmV2aWV3RWxlbWVudCwgc3R5LCB0aGlzLmZvcmNlU3R5bGUsIHRydWUpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5zZXRWYWx1ZUVsZW1lbnRWYWx1ZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdFx0aWYgKHRoaXMudmFsdWVFbGVtZW50KSB7XHJcblx0XHRcdFx0aWYgKGpzYy5ub2RlTmFtZSh0aGlzLnZhbHVlRWxlbWVudCkgPT09ICdpbnB1dCcpIHtcclxuXHRcdFx0XHRcdHRoaXMudmFsdWVFbGVtZW50LnZhbHVlID0gc3RyO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5pbm5lckhUTUwgPSBzdHI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnNldEFscGhhRWxlbWVudFZhbHVlID0gZnVuY3Rpb24gKHN0cikge1xyXG5cdFx0XHRpZiAodGhpcy5hbHBoYUVsZW1lbnQpIHtcclxuXHRcdFx0XHRpZiAoanNjLm5vZGVOYW1lKHRoaXMuYWxwaGFFbGVtZW50KSA9PT0gJ2lucHV0Jykge1xyXG5cdFx0XHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQudmFsdWUgPSBzdHI7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuYWxwaGFFbGVtZW50LmlubmVySFRNTCA9IHN0cjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuX3Byb2Nlc3NQYXJlbnRFbGVtZW50c0luRE9NID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy5fbGlua2VkRWxlbWVudHNQcm9jZXNzZWQpIHsgcmV0dXJuOyB9XHJcblx0XHRcdHRoaXMuX2xpbmtlZEVsZW1lbnRzUHJvY2Vzc2VkID0gdHJ1ZTtcclxuXHJcblx0XHRcdHZhciBlbG0gPSB0aGlzLnRhcmdldEVsZW1lbnQ7XHJcblx0XHRcdGRvIHtcclxuXHRcdFx0XHQvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgb3Igb25lIG9mIGl0cyBwYXJlbnQgbm9kZXMgaGFzIGZpeGVkIHBvc2l0aW9uLFxyXG5cdFx0XHRcdC8vIHRoZW4gdXNlIGZpeGVkIHBvc2l0aW9uaW5nIGluc3RlYWRcclxuXHRcdFx0XHR2YXIgY29tcFN0eWxlID0ganNjLmdldENvbXBTdHlsZShlbG0pO1xyXG5cdFx0XHRcdGlmIChjb21wU3R5bGUucG9zaXRpb24gJiYgY29tcFN0eWxlLnBvc2l0aW9uLnRvTG93ZXJDYXNlKCkgPT09ICdmaXhlZCcpIHtcclxuXHRcdFx0XHRcdHRoaXMuZml4ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGVsbSAhPT0gdGhpcy50YXJnZXRFbGVtZW50KSB7XHJcblx0XHRcdFx0XHQvLyBFbnN1cmUgdG8gYXR0YWNoIG9uUGFyZW50U2Nyb2xsIG9ubHkgb25jZSB0byBlYWNoIHBhcmVudCBlbGVtZW50XHJcblx0XHRcdFx0XHQvLyAobXVsdGlwbGUgdGFyZ2V0RWxlbWVudHMgY2FuIHNoYXJlIHRoZSBzYW1lIHBhcmVudCBub2RlcylcclxuXHRcdFx0XHRcdC8vXHJcblx0XHRcdFx0XHQvLyBOb3RlOiBJdCdzIG5vdCBqdXN0IG9mZnNldFBhcmVudHMgdGhhdCBjYW4gYmUgc2Nyb2xsYWJsZSxcclxuXHRcdFx0XHRcdC8vIHRoYXQncyB3aHkgd2UgbG9vcCB0aHJvdWdoIGFsbCBwYXJlbnQgbm9kZXNcclxuXHRcdFx0XHRcdGlmICghanNjLmdldERhdGEoZWxtLCAnaGFzU2Nyb2xsTGlzdGVuZXInKSkge1xyXG5cdFx0XHRcdFx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywganNjLm9uUGFyZW50U2Nyb2xsLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdGpzYy5zZXREYXRhKGVsbSwgJ2hhc1Njcm9sbExpc3RlbmVyJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IHdoaWxlICgoZWxtID0gZWxtLnBhcmVudE5vZGUpICYmIGpzYy5ub2RlTmFtZShlbG0pICE9PSAnYm9keScpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy50cnlIaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy5oaWRlT25MZWF2ZSkge1xyXG5cdFx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRPcHRpb24gKG9wdGlvbiwgdmFsdWUpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb24gIT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gbmFtZTogJyArIG9wdGlvbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGVudW0gb3B0aW9uXHJcblx0XHRcdGlmIChqc2MuZW51bU9wdHMuaGFzT3duUHJvcGVydHkob3B0aW9uKSkge1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7IC8vIGVudW0gc3RyaW5nIHZhbHVlcyBhcmUgY2FzZSBpbnNlbnNpdGl2ZVxyXG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoanNjLmVudW1PcHRzW29wdGlvbl0uaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbiBcXCcnICsgb3B0aW9uICsgJ1xcJyBoYXMgaW52YWxpZCB2YWx1ZTogJyArIHZhbHVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGRlcHJlY2F0ZWQgb3B0aW9uXHJcblx0XHRcdGlmIChqc2MuZGVwcmVjYXRlZE9wdHMuaGFzT3duUHJvcGVydHkob3B0aW9uKSkge1xyXG5cdFx0XHRcdHZhciBvbGRPcHQgPSBvcHRpb247XHJcblx0XHRcdFx0dmFyIG5ld09wdCA9IGpzYy5kZXByZWNhdGVkT3B0c1tvcHRpb25dO1xyXG5cdFx0XHRcdGlmIChuZXdPcHQpIHtcclxuXHRcdFx0XHRcdC8vIGlmIHdlIGhhdmUgYSBuZXcgbmFtZSBmb3IgdGhpcyBvcHRpb24sIGxldCdzIGxvZyBhIHdhcm5pbmcgYW5kIHVzZSB0aGUgbmV3IG5hbWVcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybignT3B0aW9uIFxcJyVzXFwnIGlzIERFUFJFQ0FURUQsIHVzaW5nIFxcJyVzXFwnIGluc3RlYWQuJyArIGpzYy5kb2NzUmVmLCBvbGRPcHQsIG5ld09wdCk7XHJcblx0XHRcdFx0XHRvcHRpb24gPSBuZXdPcHQ7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIG5ldyBuYW1lIG5vdCBhdmFpbGFibGUgZm9yIHRoZSBvcHRpb25cclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignT3B0aW9uIFxcJycgKyBvcHRpb24gKyAnXFwnIGlzIERFUFJFQ0FURUQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghKG9wdGlvbiBpbiBUSElTKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignVW5yZWNvZ25pemVkIGNvbmZpZ3VyYXRpb24gb3B0aW9uOiAnICsgb3B0aW9uKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0VEhJU1tvcHRpb25dID0gdmFsdWU7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRPcHRpb24gKG9wdGlvbikge1xyXG5cdFx0XHQvLyBkZXByZWNhdGVkIG9wdGlvblxyXG5cdFx0XHRpZiAoanNjLmRlcHJlY2F0ZWRPcHRzLmhhc093blByb3BlcnR5KG9wdGlvbikpIHtcclxuXHRcdFx0XHR2YXIgb2xkT3B0ID0gb3B0aW9uO1xyXG5cdFx0XHRcdHZhciBuZXdPcHQgPSBqc2MuZGVwcmVjYXRlZE9wdHNbb3B0aW9uXTtcclxuXHRcdFx0XHRpZiAobmV3T3B0KSB7XHJcblx0XHRcdFx0XHQvLyBpZiB3ZSBoYXZlIGEgbmV3IG5hbWUgZm9yIHRoaXMgb3B0aW9uLCBsZXQncyBsb2cgYSB3YXJuaW5nIGFuZCB1c2UgdGhlIG5ldyBuYW1lXHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ09wdGlvbiBcXCclc1xcJyBpcyBERVBSRUNBVEVELCB1c2luZyBcXCclc1xcJyBpbnN0ZWFkLicgKyBqc2MuZG9jc1JlZiwgb2xkT3B0LCBuZXdPcHQpO1xyXG5cdFx0XHRcdFx0b3B0aW9uID0gbmV3T3B0O1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBuZXcgbmFtZSBub3QgYXZhaWxhYmxlIGZvciB0aGUgb3B0aW9uXHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbiBcXCcnICsgb3B0aW9uICsgJ1xcJyBpcyBERVBSRUNBVEVEJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShvcHRpb24gaW4gVEhJUykpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1VucmVjb2duaXplZCBjb25maWd1cmF0aW9uIG9wdGlvbjogJyArIG9wdGlvbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBUSElTW29wdGlvbl07XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIGRldGFjaFBpY2tlciAoKSB7XHJcblx0XHRcdGpzYy5yZW1vdmVDbGFzcyhUSElTLnRhcmdldEVsZW1lbnQsIGpzYy5wdWIuYWN0aXZlQ2xhc3NOYW1lKTtcclxuXHRcdFx0anNjLnBpY2tlci53cmFwLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoanNjLnBpY2tlci53cmFwKTtcclxuXHRcdFx0ZGVsZXRlIGpzYy5waWNrZXIub3duZXI7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIGRyYXdQaWNrZXIgKCkge1xyXG5cclxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgd2hlbiBkcmF3aW5nIHRoZSBwaWNrZXIsIHdlIGtub3cgd2hhdCB0aGUgcGFyZW50IGVsZW1lbnRzIGFyZVxyXG5cdFx0XHQvLyBhbmQgd2UgY2FuIGRvIGFsbCByZWxhdGVkIERPTSBvcGVyYXRpb25zLCBzdWNoIGFzIHJlZ2lzdGVyaW5nIGV2ZW50cyBvbiB0aGVtXHJcblx0XHRcdC8vIG9yIGNoZWNraW5nIHRoZWlyIHBvc2l0aW9uaW5nXHJcblx0XHRcdFRISVMuX3Byb2Nlc3NQYXJlbnRFbGVtZW50c0luRE9NKCk7XHJcblxyXG5cdFx0XHRpZiAoIWpzYy5waWNrZXIpIHtcclxuXHRcdFx0XHRqc2MucGlja2VyID0ge1xyXG5cdFx0XHRcdFx0b3duZXI6IG51bGwsIC8vIG93bmVyIHBpY2tlciBpbnN0YW5jZVxyXG5cdFx0XHRcdFx0d3JhcCA6IGpzYy5jcmVhdGVFbCgnZGl2JyksXHJcblx0XHRcdFx0XHRib3ggOiBqc2MuY3JlYXRlRWwoJ2RpdicpLFxyXG5cdFx0XHRcdFx0Ym94UyA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIHNoYWRvdyBhcmVhXHJcblx0XHRcdFx0XHRib3hCIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gYm9yZGVyXHJcblx0XHRcdFx0XHRwYWQgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLFxyXG5cdFx0XHRcdFx0cGFkQiA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIGJvcmRlclxyXG5cdFx0XHRcdFx0cGFkTSA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIG1vdXNlL3RvdWNoIGFyZWFcclxuXHRcdFx0XHRcdHBhZFBhbCA6IGpzYy5jcmVhdGVQYWxldHRlKCksXHJcblx0XHRcdFx0XHRjcm9zcyA6IGpzYy5jcmVhdGVFbCgnZGl2JyksXHJcblx0XHRcdFx0XHRjcm9zc0JZIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gYm9yZGVyIFlcclxuXHRcdFx0XHRcdGNyb3NzQlggOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBib3JkZXIgWFxyXG5cdFx0XHRcdFx0Y3Jvc3NMWSA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIGxpbmUgWVxyXG5cdFx0XHRcdFx0Y3Jvc3NMWCA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIGxpbmUgWFxyXG5cdFx0XHRcdFx0c2xkIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyXHJcblx0XHRcdFx0XHRzbGRCIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gYm9yZGVyXHJcblx0XHRcdFx0XHRzbGRNIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gbW91c2UvdG91Y2ggYXJlYVxyXG5cdFx0XHRcdFx0c2xkR3JhZCA6IGpzYy5jcmVhdGVTbGlkZXJHcmFkaWVudCgpLFxyXG5cdFx0XHRcdFx0c2xkUHRyUyA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIHNsaWRlciBwb2ludGVyIHNwYWNlclxyXG5cdFx0XHRcdFx0c2xkUHRySUIgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBzbGlkZXIgcG9pbnRlciBpbm5lciBib3JkZXJcclxuXHRcdFx0XHRcdHNsZFB0ck1CIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyIHBvaW50ZXIgbWlkZGxlIGJvcmRlclxyXG5cdFx0XHRcdFx0c2xkUHRyT0IgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBzbGlkZXIgcG9pbnRlciBvdXRlciBib3JkZXJcclxuXHRcdFx0XHRcdGFzbGQgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBhbHBoYSBzbGlkZXJcclxuXHRcdFx0XHRcdGFzbGRCIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gYm9yZGVyXHJcblx0XHRcdFx0XHRhc2xkTSA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIG1vdXNlL3RvdWNoIGFyZWFcclxuXHRcdFx0XHRcdGFzbGRHcmFkIDoganNjLmNyZWF0ZUFTbGlkZXJHcmFkaWVudCgpLFxyXG5cdFx0XHRcdFx0YXNsZFB0clMgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBzbGlkZXIgcG9pbnRlciBzcGFjZXJcclxuXHRcdFx0XHRcdGFzbGRQdHJJQiA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIHNsaWRlciBwb2ludGVyIGlubmVyIGJvcmRlclxyXG5cdFx0XHRcdFx0YXNsZFB0ck1CIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyIHBvaW50ZXIgbWlkZGxlIGJvcmRlclxyXG5cdFx0XHRcdFx0YXNsZFB0ck9CIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyIHBvaW50ZXIgb3V0ZXIgYm9yZGVyXHJcblx0XHRcdFx0XHRidG4gOiBqc2MuY3JlYXRlRWwoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YnRuVCA6IGpzYy5jcmVhdGVFbCgnc3BhbicpLCAvLyB0ZXh0XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0anNjLnBpY2tlci5wYWQuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5wYWRQYWwuZWxtKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLnBhZEIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5wYWQpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuY3Jvc3MuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5jcm9zc0JZKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmNyb3NzLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuY3Jvc3NCWCk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5jcm9zcy5hcHBlbmRDaGlsZChqc2MucGlja2VyLmNyb3NzTFkpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuY3Jvc3MuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5jcm9zc0xYKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLnBhZEIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5jcm9zcyk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5ib3guYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5wYWRCKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmJveC5hcHBlbmRDaGlsZChqc2MucGlja2VyLnBhZE0pO1xyXG5cclxuXHRcdFx0XHRqc2MucGlja2VyLnNsZC5hcHBlbmRDaGlsZChqc2MucGlja2VyLnNsZEdyYWQuZWxtKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLnNsZEIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5zbGQpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuc2xkQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLnNsZFB0ck9CKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLnNsZFB0ck9CLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuc2xkUHRyTUIpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuc2xkUHRyTUIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5zbGRQdHJJQik7XHJcblx0XHRcdFx0anNjLnBpY2tlci5zbGRQdHJJQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLnNsZFB0clMpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuYm94LmFwcGVuZENoaWxkKGpzYy5waWNrZXIuc2xkQik7XHJcblx0XHRcdFx0anNjLnBpY2tlci5ib3guYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5zbGRNKTtcclxuXHJcblx0XHRcdFx0anNjLnBpY2tlci5hc2xkLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYXNsZEdyYWQuZWxtKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmFzbGRCLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYXNsZCk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5hc2xkQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGRQdHJPQik7XHJcblx0XHRcdFx0anNjLnBpY2tlci5hc2xkUHRyT0IuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5hc2xkUHRyTUIpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuYXNsZFB0ck1CLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYXNsZFB0cklCKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmFzbGRQdHJJQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGRQdHJTKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmJveC5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGRCKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmJveC5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGRNKTtcclxuXHJcblx0XHRcdFx0anNjLnBpY2tlci5idG4uYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5idG5UKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmJveC5hcHBlbmRDaGlsZChqc2MucGlja2VyLmJ0bik7XHJcblxyXG5cdFx0XHRcdGpzYy5waWNrZXIuYm94Qi5hcHBlbmRDaGlsZChqc2MucGlja2VyLmJveCk7XHJcblx0XHRcdFx0anNjLnBpY2tlci53cmFwLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYm94Uyk7XHJcblx0XHRcdFx0anNjLnBpY2tlci53cmFwLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYm94Qik7XHJcblxyXG5cdFx0XHRcdGpzYy5waWNrZXIud3JhcC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywganNjLm9uUGlja2VyVG91Y2hTdGFydCxcclxuXHRcdFx0XHRcdGpzYy5pc1Bhc3NpdmVFdmVudFN1cHBvcnRlZCA/IHtwYXNzaXZlOiBmYWxzZX0gOiBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBwID0ganNjLnBpY2tlcjtcclxuXHJcblx0XHRcdHZhciBkaXNwbGF5U2xpZGVyID0gISFqc2MuZ2V0U2xpZGVyQ2hhbm5lbChUSElTKTtcclxuXHRcdFx0dmFyIGRpc3BsYXlBbHBoYVNsaWRlciA9IFRISVMuaGFzQWxwaGFDaGFubmVsKCk7XHJcblx0XHRcdHZhciBkaW1zID0ganNjLmdldFBpY2tlckRpbXMoVEhJUyk7XHJcblx0XHRcdHZhciBjcm9zc091dGVyU2l6ZSA9ICgyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyBUSElTLnBvaW50ZXJUaGlja25lc3MgKyAyICogVEhJUy5jcm9zc1NpemUpO1xyXG5cdFx0XHR2YXIgY29udHJvbFBhZGRpbmcgPSBqc2MuZ2V0Q29udHJvbFBhZGRpbmcoVEhJUyk7XHJcblx0XHRcdHZhciBib3JkZXJSYWRpdXMgPSBNYXRoLm1pbihcclxuXHRcdFx0XHRUSElTLmJvcmRlclJhZGl1cyxcclxuXHRcdFx0XHRNYXRoLnJvdW5kKFRISVMucGFkZGluZyAqIE1hdGguUEkpKTsgLy8gcHhcclxuXHRcdFx0dmFyIHBhZEN1cnNvciA9ICdjcm9zc2hhaXInO1xyXG5cclxuXHRcdFx0Ly8gd3JhcFxyXG5cdFx0XHRwLndyYXAuY2xhc3NOYW1lID0gJ2pzY29sb3ItcGlja2VyLXdyYXAnO1xyXG5cdFx0XHRwLndyYXAuc3R5bGUuY2xlYXIgPSAnYm90aCc7XHJcblx0XHRcdHAud3JhcC5zdHlsZS53aWR0aCA9IChkaW1zWzBdICsgMiAqIFRISVMuYm9yZGVyV2lkdGgpICsgJ3B4JztcclxuXHRcdFx0cC53cmFwLnN0eWxlLmhlaWdodCA9IChkaW1zWzFdICsgMiAqIFRISVMuYm9yZGVyV2lkdGgpICsgJ3B4JztcclxuXHRcdFx0cC53cmFwLnN0eWxlLnpJbmRleCA9IFRISVMuekluZGV4O1xyXG5cclxuXHRcdFx0Ly8gcGlja2VyXHJcblx0XHRcdHAuYm94LmNsYXNzTmFtZSA9ICdqc2NvbG9yLXBpY2tlcic7XHJcblx0XHRcdHAuYm94LnN0eWxlLndpZHRoID0gZGltc1swXSArICdweCc7XHJcblx0XHRcdHAuYm94LnN0eWxlLmhlaWdodCA9IGRpbXNbMV0gKyAncHgnO1xyXG5cdFx0XHRwLmJveC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcblxyXG5cdFx0XHQvLyBwaWNrZXIgc2hhZG93XHJcblx0XHRcdHAuYm94Uy5jbGFzc05hbWUgPSAnanNjb2xvci1waWNrZXItc2hhZG93JztcclxuXHRcdFx0cC5ib3hTLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0cC5ib3hTLnN0eWxlLmxlZnQgPSAnMCc7XHJcblx0XHRcdHAuYm94Uy5zdHlsZS50b3AgPSAnMCc7XHJcblx0XHRcdHAuYm94Uy5zdHlsZS53aWR0aCA9ICcxMDAlJztcclxuXHRcdFx0cC5ib3hTLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcclxuXHRcdFx0anNjLnNldEJvcmRlclJhZGl1cyhwLmJveFMsIGJvcmRlclJhZGl1cyArICdweCcpO1xyXG5cclxuXHRcdFx0Ly8gcGlja2VyIGJvcmRlclxyXG5cdFx0XHRwLmJveEIuY2xhc3NOYW1lID0gJ2pzY29sb3ItcGlja2VyLWJvcmRlcic7XHJcblx0XHRcdHAuYm94Qi5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcblx0XHRcdHAuYm94Qi5zdHlsZS5ib3JkZXIgPSBUSElTLmJvcmRlcldpZHRoICsgJ3B4IHNvbGlkJztcclxuXHRcdFx0cC5ib3hCLnN0eWxlLmJvcmRlckNvbG9yID0gVEhJUy5ib3JkZXJDb2xvcjtcclxuXHRcdFx0cC5ib3hCLnN0eWxlLmJhY2tncm91bmQgPSBUSElTLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0anNjLnNldEJvcmRlclJhZGl1cyhwLmJveEIsIGJvcmRlclJhZGl1cyArICdweCcpO1xyXG5cclxuXHRcdFx0Ly8gSUUgaGFjazpcclxuXHRcdFx0Ly8gSWYgdGhlIGVsZW1lbnQgaXMgdHJhbnNwYXJlbnQsIElFIHdpbGwgdHJpZ2dlciB0aGUgZXZlbnQgb24gdGhlIGVsZW1lbnRzIHVuZGVyIGl0LFxyXG5cdFx0XHQvLyBlLmcuIG9uIENhbnZhcyBvciBvbiBlbGVtZW50cyB3aXRoIGJvcmRlclxyXG5cdFx0XHRwLnBhZE0uc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDI1NSwwLDAsLjIpJztcclxuXHRcdFx0cC5zbGRNLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgwLDI1NSwwLC4yKSc7XHJcblx0XHRcdHAuYXNsZE0uc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDAsMCwyNTUsLjIpJztcclxuXHJcblx0XHRcdHAucGFkTS5zdHlsZS5vcGFjaXR5ID1cclxuXHRcdFx0cC5zbGRNLnN0eWxlLm9wYWNpdHkgPVxyXG5cdFx0XHRwLmFzbGRNLnN0eWxlLm9wYWNpdHkgPVxyXG5cdFx0XHRcdCcwJztcclxuXHJcblx0XHRcdC8vIHBhZFxyXG5cdFx0XHRwLnBhZC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcblx0XHRcdHAucGFkLnN0eWxlLndpZHRoID0gVEhJUy53aWR0aCArICdweCc7XHJcblx0XHRcdHAucGFkLnN0eWxlLmhlaWdodCA9IFRISVMuaGVpZ2h0ICsgJ3B4JztcclxuXHJcblx0XHRcdC8vIHBhZCBwYWxldHRlcyAoSFNWIGFuZCBIVlMpXHJcblx0XHRcdHAucGFkUGFsLmRyYXcoVEhJUy53aWR0aCwgVEhJUy5oZWlnaHQsIGpzYy5nZXRQYWRZQ2hhbm5lbChUSElTKSk7XHJcblxyXG5cdFx0XHQvLyBwYWQgYm9yZGVyXHJcblx0XHRcdHAucGFkQi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAucGFkQi5zdHlsZS5sZWZ0ID0gVEhJUy5wYWRkaW5nICsgJ3B4JztcclxuXHRcdFx0cC5wYWRCLnN0eWxlLnRvcCA9IFRISVMucGFkZGluZyArICdweCc7XHJcblx0XHRcdHAucGFkQi5zdHlsZS5ib3JkZXIgPSBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCArICdweCBzb2xpZCc7XHJcblx0XHRcdHAucGFkQi5zdHlsZS5ib3JkZXJDb2xvciA9IFRISVMuY29udHJvbEJvcmRlckNvbG9yO1xyXG5cclxuXHRcdFx0Ly8gcGFkIG1vdXNlIGFyZWFcclxuXHRcdFx0cC5wYWRNLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0cC5wYWRNLnN0eWxlLmxlZnQgPSAwICsgJ3B4JztcclxuXHRcdFx0cC5wYWRNLnN0eWxlLnRvcCA9IDAgKyAncHgnO1xyXG5cdFx0XHRwLnBhZE0uc3R5bGUud2lkdGggPSAoVEhJUy5wYWRkaW5nICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgVEhJUy53aWR0aCArIGNvbnRyb2xQYWRkaW5nKSArICdweCc7XHJcblx0XHRcdHAucGFkTS5zdHlsZS5oZWlnaHQgPSAoMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgMiAqIFRISVMucGFkZGluZyArIFRISVMuaGVpZ2h0KSArICdweCc7XHJcblx0XHRcdHAucGFkTS5zdHlsZS5jdXJzb3IgPSBwYWRDdXJzb3I7XHJcblx0XHRcdGpzYy5zZXREYXRhKHAucGFkTSwge1xyXG5cdFx0XHRcdGluc3RhbmNlOiBUSElTLFxyXG5cdFx0XHRcdGNvbnRyb2w6ICdwYWQnLFxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0Ly8gcGFkIGNyb3NzXHJcblx0XHRcdHAuY3Jvc3Muc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLmNyb3NzLnN0eWxlLmxlZnQgPVxyXG5cdFx0XHRwLmNyb3NzLnN0eWxlLnRvcCA9XHJcblx0XHRcdFx0JzAnO1xyXG5cdFx0XHRwLmNyb3NzLnN0eWxlLndpZHRoID1cclxuXHRcdFx0cC5jcm9zcy5zdHlsZS5oZWlnaHQgPVxyXG5cdFx0XHRcdGNyb3NzT3V0ZXJTaXplICsgJ3B4JztcclxuXHJcblx0XHRcdC8vIHBhZCBjcm9zcyBib3JkZXIgWSBhbmQgWFxyXG5cdFx0XHRwLmNyb3NzQlkuc3R5bGUucG9zaXRpb24gPVxyXG5cdFx0XHRwLmNyb3NzQlguc3R5bGUucG9zaXRpb24gPVxyXG5cdFx0XHRcdCdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuY3Jvc3NCWS5zdHlsZS5iYWNrZ3JvdW5kID1cclxuXHRcdFx0cC5jcm9zc0JYLnN0eWxlLmJhY2tncm91bmQgPVxyXG5cdFx0XHRcdFRISVMucG9pbnRlckJvcmRlckNvbG9yO1xyXG5cdFx0XHRwLmNyb3NzQlkuc3R5bGUud2lkdGggPVxyXG5cdFx0XHRwLmNyb3NzQlguc3R5bGUuaGVpZ2h0ID1cclxuXHRcdFx0XHQoMiAqIFRISVMucG9pbnRlckJvcmRlcldpZHRoICsgVEhJUy5wb2ludGVyVGhpY2tuZXNzKSArICdweCc7XHJcblx0XHRcdHAuY3Jvc3NCWS5zdHlsZS5oZWlnaHQgPVxyXG5cdFx0XHRwLmNyb3NzQlguc3R5bGUud2lkdGggPVxyXG5cdFx0XHRcdGNyb3NzT3V0ZXJTaXplICsgJ3B4JztcclxuXHRcdFx0cC5jcm9zc0JZLnN0eWxlLmxlZnQgPVxyXG5cdFx0XHRwLmNyb3NzQlguc3R5bGUudG9wID1cclxuXHRcdFx0XHQoTWF0aC5mbG9vcihjcm9zc091dGVyU2l6ZSAvIDIpIC0gTWF0aC5mbG9vcihUSElTLnBvaW50ZXJUaGlja25lc3MgLyAyKSAtIFRISVMucG9pbnRlckJvcmRlcldpZHRoKSArICdweCc7XHJcblx0XHRcdHAuY3Jvc3NCWS5zdHlsZS50b3AgPVxyXG5cdFx0XHRwLmNyb3NzQlguc3R5bGUubGVmdCA9XHJcblx0XHRcdFx0JzAnO1xyXG5cclxuXHRcdFx0Ly8gcGFkIGNyb3NzIGxpbmUgWSBhbmQgWFxyXG5cdFx0XHRwLmNyb3NzTFkuc3R5bGUucG9zaXRpb24gPVxyXG5cdFx0XHRwLmNyb3NzTFguc3R5bGUucG9zaXRpb24gPVxyXG5cdFx0XHRcdCdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuY3Jvc3NMWS5zdHlsZS5iYWNrZ3JvdW5kID1cclxuXHRcdFx0cC5jcm9zc0xYLnN0eWxlLmJhY2tncm91bmQgPVxyXG5cdFx0XHRcdFRISVMucG9pbnRlckNvbG9yO1xyXG5cdFx0XHRwLmNyb3NzTFkuc3R5bGUuaGVpZ2h0ID1cclxuXHRcdFx0cC5jcm9zc0xYLnN0eWxlLndpZHRoID1cclxuXHRcdFx0XHQoY3Jvc3NPdXRlclNpemUgLSAyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGgpICsgJ3B4JztcclxuXHRcdFx0cC5jcm9zc0xZLnN0eWxlLndpZHRoID1cclxuXHRcdFx0cC5jcm9zc0xYLnN0eWxlLmhlaWdodCA9XHJcblx0XHRcdFx0VEhJUy5wb2ludGVyVGhpY2tuZXNzICsgJ3B4JztcclxuXHRcdFx0cC5jcm9zc0xZLnN0eWxlLmxlZnQgPVxyXG5cdFx0XHRwLmNyb3NzTFguc3R5bGUudG9wID1cclxuXHRcdFx0XHQoTWF0aC5mbG9vcihjcm9zc091dGVyU2l6ZSAvIDIpIC0gTWF0aC5mbG9vcihUSElTLnBvaW50ZXJUaGlja25lc3MgLyAyKSkgKyAncHgnO1xyXG5cdFx0XHRwLmNyb3NzTFkuc3R5bGUudG9wID1cclxuXHRcdFx0cC5jcm9zc0xYLnN0eWxlLmxlZnQgPVxyXG5cdFx0XHRcdFRISVMucG9pbnRlckJvcmRlcldpZHRoICsgJ3B4JztcclxuXHJcblxyXG5cdFx0XHQvLyBzbGlkZXJcclxuXHRcdFx0cC5zbGQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHRcdFx0cC5zbGQuc3R5bGUud2lkdGggPSBUSElTLnNsaWRlclNpemUgKyAncHgnO1xyXG5cdFx0XHRwLnNsZC5zdHlsZS5oZWlnaHQgPSBUSElTLmhlaWdodCArICdweCc7XHJcblxyXG5cdFx0XHQvLyBzbGlkZXIgZ3JhZGllbnRcclxuXHRcdFx0cC5zbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgJyMwMDAnLCAnIzAwMCcpO1xyXG5cclxuXHRcdFx0Ly8gc2xpZGVyIGJvcmRlclxyXG5cdFx0XHRwLnNsZEIuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXlTbGlkZXIgPyAnYmxvY2snIDogJ25vbmUnO1xyXG5cdFx0XHRwLnNsZEIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLnNsZEIuc3R5bGUubGVmdCA9IChUSElTLnBhZGRpbmcgKyBUSElTLndpZHRoICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgMiAqIGNvbnRyb2xQYWRkaW5nKSArICdweCc7XHJcblx0XHRcdHAuc2xkQi5zdHlsZS50b3AgPSBUSElTLnBhZGRpbmcgKyAncHgnO1xyXG5cdFx0XHRwLnNsZEIuc3R5bGUuYm9yZGVyID0gVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyAncHggc29saWQnO1xyXG5cdFx0XHRwLnNsZEIuc3R5bGUuYm9yZGVyQ29sb3IgPSBUSElTLmNvbnRyb2xCb3JkZXJDb2xvcjtcclxuXHJcblx0XHRcdC8vIHNsaWRlciBtb3VzZSBhcmVhXHJcblx0XHRcdHAuc2xkTS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVNsaWRlciA/ICdibG9jaycgOiAnbm9uZSc7XHJcblx0XHRcdHAuc2xkTS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuc2xkTS5zdHlsZS5sZWZ0ID0gKFRISVMucGFkZGluZyArIFRISVMud2lkdGggKyAyICogVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyBjb250cm9sUGFkZGluZykgKyAncHgnO1xyXG5cdFx0XHRwLnNsZE0uc3R5bGUudG9wID0gMCArICdweCc7XHJcblx0XHRcdHAuc2xkTS5zdHlsZS53aWR0aCA9IChcclxuXHRcdFx0XHRcdChUSElTLnNsaWRlclNpemUgKyAyICogY29udHJvbFBhZGRpbmcgKyAyICogVEhJUy5jb250cm9sQm9yZGVyV2lkdGgpICtcclxuXHRcdFx0XHRcdChkaXNwbGF5QWxwaGFTbGlkZXIgPyAwIDogTWF0aC5tYXgoMCwgVEhJUy5wYWRkaW5nIC0gY29udHJvbFBhZGRpbmcpKSAvLyByZW1haW5pbmcgcGFkZGluZyB0byB0aGUgcmlnaHQgZWRnZVxyXG5cdFx0XHRcdCkgKyAncHgnO1xyXG5cdFx0XHRwLnNsZE0uc3R5bGUuaGVpZ2h0ID0gKDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCArIDIgKiBUSElTLnBhZGRpbmcgKyBUSElTLmhlaWdodCkgKyAncHgnO1xyXG5cdFx0XHRwLnNsZE0uc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xyXG5cdFx0XHRqc2Muc2V0RGF0YShwLnNsZE0sIHtcclxuXHRcdFx0XHRpbnN0YW5jZTogVEhJUyxcclxuXHRcdFx0XHRjb250cm9sOiAnc2xkJyxcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdC8vIHNsaWRlciBwb2ludGVyIGlubmVyIGFuZCBvdXRlciBib3JkZXJcclxuXHRcdFx0cC5zbGRQdHJJQi5zdHlsZS5ib3JkZXIgPVxyXG5cdFx0XHRwLnNsZFB0ck9CLnN0eWxlLmJvcmRlciA9XHJcblx0XHRcdFx0VEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyAncHggc29saWQgJyArIFRISVMucG9pbnRlckJvcmRlckNvbG9yO1xyXG5cclxuXHRcdFx0Ly8gc2xpZGVyIHBvaW50ZXIgb3V0ZXIgYm9yZGVyXHJcblx0XHRcdHAuc2xkUHRyT0Iuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLnNsZFB0ck9CLnN0eWxlLmxlZnQgPSAtKDIgKiBUSElTLnBvaW50ZXJCb3JkZXJXaWR0aCArIFRISVMucG9pbnRlclRoaWNrbmVzcykgKyAncHgnO1xyXG5cdFx0XHRwLnNsZFB0ck9CLnN0eWxlLnRvcCA9ICcwJztcclxuXHJcblx0XHRcdC8vIHNsaWRlciBwb2ludGVyIG1pZGRsZSBib3JkZXJcclxuXHRcdFx0cC5zbGRQdHJNQi5zdHlsZS5ib3JkZXIgPSBUSElTLnBvaW50ZXJUaGlja25lc3MgKyAncHggc29saWQgJyArIFRISVMucG9pbnRlckNvbG9yO1xyXG5cclxuXHRcdFx0Ly8gc2xpZGVyIHBvaW50ZXIgc3BhY2VyXHJcblx0XHRcdHAuc2xkUHRyUy5zdHlsZS53aWR0aCA9IFRISVMuc2xpZGVyU2l6ZSArICdweCc7XHJcblx0XHRcdHAuc2xkUHRyUy5zdHlsZS5oZWlnaHQgPSBqc2MucHViLnNsaWRlcklubmVyU3BhY2UgKyAncHgnO1xyXG5cclxuXHJcblx0XHRcdC8vIGFscGhhIHNsaWRlclxyXG5cdFx0XHRwLmFzbGQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHRcdFx0cC5hc2xkLnN0eWxlLndpZHRoID0gVEhJUy5zbGlkZXJTaXplICsgJ3B4JztcclxuXHRcdFx0cC5hc2xkLnN0eWxlLmhlaWdodCA9IFRISVMuaGVpZ2h0ICsgJ3B4JztcclxuXHJcblx0XHRcdC8vIGFscGhhIHNsaWRlciBncmFkaWVudFxyXG5cdFx0XHRwLmFzbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgJyMwMDAnKTtcclxuXHJcblx0XHRcdC8vIGFscGhhIHNsaWRlciBib3JkZXJcclxuXHRcdFx0cC5hc2xkQi5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheUFscGhhU2xpZGVyID8gJ2Jsb2NrJyA6ICdub25lJztcclxuXHRcdFx0cC5hc2xkQi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuYXNsZEIuc3R5bGUubGVmdCA9IChcclxuXHRcdFx0XHRcdChUSElTLnBhZGRpbmcgKyBUSElTLndpZHRoICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgY29udHJvbFBhZGRpbmcpICtcclxuXHRcdFx0XHRcdChkaXNwbGF5U2xpZGVyID8gKFRISVMuc2xpZGVyU2l6ZSArIDMgKiBjb250cm9sUGFkZGluZyArIDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCkgOiAwKVxyXG5cdFx0XHRcdCkgKyAncHgnO1xyXG5cdFx0XHRwLmFzbGRCLnN0eWxlLnRvcCA9IFRISVMucGFkZGluZyArICdweCc7XHJcblx0XHRcdHAuYXNsZEIuc3R5bGUuYm9yZGVyID0gVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyAncHggc29saWQnO1xyXG5cdFx0XHRwLmFzbGRCLnN0eWxlLmJvcmRlckNvbG9yID0gVEhJUy5jb250cm9sQm9yZGVyQ29sb3I7XHJcblxyXG5cdFx0XHQvLyBhbHBoYSBzbGlkZXIgbW91c2UgYXJlYVxyXG5cdFx0XHRwLmFzbGRNLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5QWxwaGFTbGlkZXIgPyAnYmxvY2snIDogJ25vbmUnO1xyXG5cdFx0XHRwLmFzbGRNLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0cC5hc2xkTS5zdHlsZS5sZWZ0ID0gKFxyXG5cdFx0XHRcdFx0KFRISVMucGFkZGluZyArIFRISVMud2lkdGggKyAyICogVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyBjb250cm9sUGFkZGluZykgK1xyXG5cdFx0XHRcdFx0KGRpc3BsYXlTbGlkZXIgPyAoVEhJUy5zbGlkZXJTaXplICsgMiAqIGNvbnRyb2xQYWRkaW5nICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoKSA6IDApXHJcblx0XHRcdFx0KSArICdweCc7XHJcblx0XHRcdHAuYXNsZE0uc3R5bGUudG9wID0gMCArICdweCc7XHJcblx0XHRcdHAuYXNsZE0uc3R5bGUud2lkdGggPSAoXHJcblx0XHRcdFx0XHQoVEhJUy5zbGlkZXJTaXplICsgMiAqIGNvbnRyb2xQYWRkaW5nICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoKSArXHJcblx0XHRcdFx0XHRNYXRoLm1heCgwLCBUSElTLnBhZGRpbmcgLSBjb250cm9sUGFkZGluZykgLy8gcmVtYWluaW5nIHBhZGRpbmcgdG8gdGhlIHJpZ2h0IGVkZ2VcclxuXHRcdFx0XHQpICsgJ3B4JztcclxuXHRcdFx0cC5hc2xkTS5zdHlsZS5oZWlnaHQgPSAoMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgMiAqIFRISVMucGFkZGluZyArIFRISVMuaGVpZ2h0KSArICdweCc7XHJcblx0XHRcdHAuYXNsZE0uc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xyXG5cdFx0XHRqc2Muc2V0RGF0YShwLmFzbGRNLCB7XHJcblx0XHRcdFx0aW5zdGFuY2U6IFRISVMsXHJcblx0XHRcdFx0Y29udHJvbDogJ2FzbGQnLFxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0Ly8gYWxwaGEgc2xpZGVyIHBvaW50ZXIgaW5uZXIgYW5kIG91dGVyIGJvcmRlclxyXG5cdFx0XHRwLmFzbGRQdHJJQi5zdHlsZS5ib3JkZXIgPVxyXG5cdFx0XHRwLmFzbGRQdHJPQi5zdHlsZS5ib3JkZXIgPVxyXG5cdFx0XHRcdFRISVMucG9pbnRlckJvcmRlcldpZHRoICsgJ3B4IHNvbGlkICcgKyBUSElTLnBvaW50ZXJCb3JkZXJDb2xvcjtcclxuXHJcblx0XHRcdC8vIGFscGhhIHNsaWRlciBwb2ludGVyIG91dGVyIGJvcmRlclxyXG5cdFx0XHRwLmFzbGRQdHJPQi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuYXNsZFB0ck9CLnN0eWxlLmxlZnQgPSAtKDIgKiBUSElTLnBvaW50ZXJCb3JkZXJXaWR0aCArIFRISVMucG9pbnRlclRoaWNrbmVzcykgKyAncHgnO1xyXG5cdFx0XHRwLmFzbGRQdHJPQi5zdHlsZS50b3AgPSAnMCc7XHJcblxyXG5cdFx0XHQvLyBhbHBoYSBzbGlkZXIgcG9pbnRlciBtaWRkbGUgYm9yZGVyXHJcblx0XHRcdHAuYXNsZFB0ck1CLnN0eWxlLmJvcmRlciA9IFRISVMucG9pbnRlclRoaWNrbmVzcyArICdweCBzb2xpZCAnICsgVEhJUy5wb2ludGVyQ29sb3I7XHJcblxyXG5cdFx0XHQvLyBhbHBoYSBzbGlkZXIgcG9pbnRlciBzcGFjZXJcclxuXHRcdFx0cC5hc2xkUHRyUy5zdHlsZS53aWR0aCA9IFRISVMuc2xpZGVyU2l6ZSArICdweCc7XHJcblx0XHRcdHAuYXNsZFB0clMuc3R5bGUuaGVpZ2h0ID0ganNjLnB1Yi5zbGlkZXJJbm5lclNwYWNlICsgJ3B4JztcclxuXHJcblxyXG5cdFx0XHQvLyB0aGUgQ2xvc2UgYnV0dG9uXHJcblx0XHRcdGZ1bmN0aW9uIHNldEJ0bkJvcmRlciAoKSB7XHJcblx0XHRcdFx0dmFyIGluc2V0Q29sb3JzID0gVEhJUy5jb250cm9sQm9yZGVyQ29sb3Iuc3BsaXQoL1xccysvKTtcclxuXHRcdFx0XHR2YXIgb3V0c2V0Q29sb3IgPSBpbnNldENvbG9ycy5sZW5ndGggPCAyID8gaW5zZXRDb2xvcnNbMF0gOiBpbnNldENvbG9yc1sxXSArICcgJyArIGluc2V0Q29sb3JzWzBdICsgJyAnICsgaW5zZXRDb2xvcnNbMF0gKyAnICcgKyBpbnNldENvbG9yc1sxXTtcclxuXHRcdFx0XHRwLmJ0bi5zdHlsZS5ib3JkZXJDb2xvciA9IG91dHNldENvbG9yO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBidG5QYWRkaW5nID0gMTU7IC8vIHB4XHJcblx0XHRcdHAuYnRuLmNsYXNzTmFtZSA9ICdqc2NvbG9yLWJ0bi1jbG9zZSc7XHJcblx0XHRcdHAuYnRuLnN0eWxlLmRpc3BsYXkgPSBUSElTLmNsb3NlQnV0dG9uID8gJ2Jsb2NrJyA6ICdub25lJztcclxuXHRcdFx0cC5idG4uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5sZWZ0ID0gVEhJUy5wYWRkaW5nICsgJ3B4JztcclxuXHRcdFx0cC5idG4uc3R5bGUuYm90dG9tID0gVEhJUy5wYWRkaW5nICsgJ3B4JztcclxuXHRcdFx0cC5idG4uc3R5bGUucGFkZGluZyA9ICcwICcgKyBidG5QYWRkaW5nICsgJ3B4JztcclxuXHRcdFx0cC5idG4uc3R5bGUubWF4V2lkdGggPSAoZGltc1swXSAtIDIgKiBUSElTLnBhZGRpbmcgLSAyICogVEhJUy5jb250cm9sQm9yZGVyV2lkdGggLSAyICogYnRuUGFkZGluZykgKyAncHgnO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5oZWlnaHQgPSBUSElTLmJ1dHRvbkhlaWdodCArICdweCc7XHJcblx0XHRcdHAuYnRuLnN0eWxlLndoaXRlU3BhY2UgPSAnbm93cmFwJztcclxuXHRcdFx0cC5idG4uc3R5bGUuYm9yZGVyID0gVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyAncHggc29saWQnO1xyXG5cdFx0XHRzZXRCdG5Cb3JkZXIoKTtcclxuXHRcdFx0cC5idG4uc3R5bGUuY29sb3IgPSBUSElTLmJ1dHRvbkNvbG9yO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5mb250ID0gJzEycHggc2Fucy1zZXJpZic7XHJcblx0XHRcdHAuYnRuLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcblx0XHRcdHAuYnRuLm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFRISVMuaGlkZSgpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRwLmJ0blQuc3R5bGUubGluZUhlaWdodCA9IFRISVMuYnV0dG9uSGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0cC5idG5ULmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHRwLmJ0blQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoVEhJUy5jbG9zZVRleHQpKTtcclxuXHJcblx0XHRcdC8vIHJlcG9zaXRpb24gdGhlIHBvaW50ZXJzXHJcblx0XHRcdHJlZHJhd1BhZCgpO1xyXG5cdFx0XHRyZWRyYXdTbGQoKTtcclxuXHRcdFx0cmVkcmF3QVNsZCgpO1xyXG5cclxuXHRcdFx0Ly8gSWYgd2UgYXJlIGNoYW5naW5nIHRoZSBvd25lciB3aXRob3V0IGZpcnN0IGNsb3NpbmcgdGhlIHBpY2tlcixcclxuXHRcdFx0Ly8gbWFrZSBzdXJlIHRvIGZpcnN0IGRlYWwgd2l0aCB0aGUgb2xkIG93bmVyXHJcblx0XHRcdGlmIChqc2MucGlja2VyLm93bmVyICYmIGpzYy5waWNrZXIub3duZXIgIT09IFRISVMpIHtcclxuXHRcdFx0XHRqc2MucmVtb3ZlQ2xhc3MoanNjLnBpY2tlci5vd25lci50YXJnZXRFbGVtZW50LCBqc2MucHViLmFjdGl2ZUNsYXNzTmFtZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNldCBhIG5ldyBwaWNrZXIgb3duZXJcclxuXHRcdFx0anNjLnBpY2tlci5vd25lciA9IFRISVM7XHJcblxyXG5cdFx0XHQvLyBUaGUgcmVkcmF3UG9zaXRpb24oKSBtZXRob2QgbmVlZHMgcGlja2VyLm93bmVyIHRvIGJlIHNldCwgdGhhdCdzIHdoeSB3ZSBjYWxsIGl0IGhlcmUsXHJcblx0XHRcdC8vIGFmdGVyIHNldHRpbmcgdGhlIG93bmVyXHJcblx0XHRcdGlmIChUSElTLmNvbnRhaW5lciA9PT0gZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0XHRcdGpzYy5yZWRyYXdQb3NpdGlvbigpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGpzYy5fZHJhd1Bvc2l0aW9uKFRISVMsIDAsIDAsICdyZWxhdGl2ZScsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHAud3JhcC5wYXJlbnROb2RlICE9PSBUSElTLmNvbnRhaW5lcikge1xyXG5cdFx0XHRcdFRISVMuY29udGFpbmVyLmFwcGVuZENoaWxkKHAud3JhcCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGpzYy5hZGRDbGFzcyhUSElTLnRhcmdldEVsZW1lbnQsIGpzYy5wdWIuYWN0aXZlQ2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVkcmF3UGFkICgpIHtcclxuXHRcdFx0Ly8gcmVkcmF3IHRoZSBwYWQgcG9pbnRlclxyXG5cdFx0XHR2YXIgeUNoYW5uZWwgPSBqc2MuZ2V0UGFkWUNoYW5uZWwoVEhJUyk7XHJcblx0XHRcdHZhciB4ID0gTWF0aC5yb3VuZCgoVEhJUy5jaGFubmVscy5oIC8gMzYwKSAqIChUSElTLndpZHRoIC0gMSkpO1xyXG5cdFx0XHR2YXIgeSA9IE1hdGgucm91bmQoKDEgLSBUSElTLmNoYW5uZWxzW3lDaGFubmVsXSAvIDEwMCkgKiAoVEhJUy5oZWlnaHQgLSAxKSk7XHJcblx0XHRcdHZhciBjcm9zc091dGVyU2l6ZSA9ICgyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyBUSElTLnBvaW50ZXJUaGlja25lc3MgKyAyICogVEhJUy5jcm9zc1NpemUpO1xyXG5cdFx0XHR2YXIgb2ZzID0gLU1hdGguZmxvb3IoY3Jvc3NPdXRlclNpemUgLyAyKTtcclxuXHRcdFx0anNjLnBpY2tlci5jcm9zcy5zdHlsZS5sZWZ0ID0gKHggKyBvZnMpICsgJ3B4JztcclxuXHRcdFx0anNjLnBpY2tlci5jcm9zcy5zdHlsZS50b3AgPSAoeSArIG9mcykgKyAncHgnO1xyXG5cclxuXHRcdFx0Ly8gcmVkcmF3IHRoZSBzbGlkZXJcclxuXHRcdFx0c3dpdGNoIChqc2MuZ2V0U2xpZGVyQ2hhbm5lbChUSElTKSkge1xyXG5cdFx0XHRjYXNlICdzJzpcclxuXHRcdFx0XHR2YXIgcmdiMSA9IGpzYy5IU1ZfUkdCKFRISVMuY2hhbm5lbHMuaCwgMTAwLCBUSElTLmNoYW5uZWxzLnYpO1xyXG5cdFx0XHRcdHZhciByZ2IyID0ganNjLkhTVl9SR0IoVEhJUy5jaGFubmVscy5oLCAwLCBUSElTLmNoYW5uZWxzLnYpO1xyXG5cdFx0XHRcdHZhciBjb2xvcjEgPSAncmdiKCcgK1xyXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChyZ2IxWzBdKSArICcsJyArXHJcblx0XHRcdFx0XHRNYXRoLnJvdW5kKHJnYjFbMV0pICsgJywnICtcclxuXHRcdFx0XHRcdE1hdGgucm91bmQocmdiMVsyXSkgKyAnKSc7XHJcblx0XHRcdFx0dmFyIGNvbG9yMiA9ICdyZ2IoJyArXHJcblx0XHRcdFx0XHRNYXRoLnJvdW5kKHJnYjJbMF0pICsgJywnICtcclxuXHRcdFx0XHRcdE1hdGgucm91bmQocmdiMlsxXSkgKyAnLCcgK1xyXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChyZ2IyWzJdKSArICcpJztcclxuXHRcdFx0XHRqc2MucGlja2VyLnNsZEdyYWQuZHJhdyhUSElTLnNsaWRlclNpemUsIFRISVMuaGVpZ2h0LCBjb2xvcjEsIGNvbG9yMik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3YnOlxyXG5cdFx0XHRcdHZhciByZ2IgPSBqc2MuSFNWX1JHQihUSElTLmNoYW5uZWxzLmgsIFRISVMuY2hhbm5lbHMucywgMTAwKTtcclxuXHRcdFx0XHR2YXIgY29sb3IxID0gJ3JnYignICtcclxuXHRcdFx0XHRcdE1hdGgucm91bmQocmdiWzBdKSArICcsJyArXHJcblx0XHRcdFx0XHRNYXRoLnJvdW5kKHJnYlsxXSkgKyAnLCcgK1xyXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChyZ2JbMl0pICsgJyknO1xyXG5cdFx0XHRcdHZhciBjb2xvcjIgPSAnIzAwMCc7XHJcblx0XHRcdFx0anNjLnBpY2tlci5zbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgY29sb3IxLCBjb2xvcjIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyByZWRyYXcgdGhlIGFscGhhIHNsaWRlclxyXG5cdFx0XHRqc2MucGlja2VyLmFzbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgVEhJUy50b0hFWFN0cmluZygpKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVkcmF3U2xkICgpIHtcclxuXHRcdFx0dmFyIHNsZENoYW5uZWwgPSBqc2MuZ2V0U2xpZGVyQ2hhbm5lbChUSElTKTtcclxuXHRcdFx0aWYgKHNsZENoYW5uZWwpIHtcclxuXHRcdFx0XHQvLyByZWRyYXcgdGhlIHNsaWRlciBwb2ludGVyXHJcblx0XHRcdFx0dmFyIHkgPSBNYXRoLnJvdW5kKCgxIC0gVEhJUy5jaGFubmVsc1tzbGRDaGFubmVsXSAvIDEwMCkgKiAoVEhJUy5oZWlnaHQgLSAxKSk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5zbGRQdHJPQi5zdHlsZS50b3AgPSAoeSAtICgyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyBUSElTLnBvaW50ZXJUaGlja25lc3MpIC0gTWF0aC5mbG9vcihqc2MucHViLnNsaWRlcklubmVyU3BhY2UgLyAyKSkgKyAncHgnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyByZWRyYXcgdGhlIGFscGhhIHNsaWRlclxyXG5cdFx0XHRqc2MucGlja2VyLmFzbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgVEhJUy50b0hFWFN0cmluZygpKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVkcmF3QVNsZCAoKSB7XHJcblx0XHRcdHZhciB5ID0gTWF0aC5yb3VuZCgoMSAtIFRISVMuY2hhbm5lbHMuYSkgKiAoVEhJUy5oZWlnaHQgLSAxKSk7XHJcblx0XHRcdGpzYy5waWNrZXIuYXNsZFB0ck9CLnN0eWxlLnRvcCA9ICh5IC0gKDIgKiBUSElTLnBvaW50ZXJCb3JkZXJXaWR0aCArIFRISVMucG9pbnRlclRoaWNrbmVzcykgLSBNYXRoLmZsb29yKGpzYy5wdWIuc2xpZGVySW5uZXJTcGFjZSAvIDIpKSArICdweCc7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIGlzUGlja2VyT3duZXIgKCkge1xyXG5cdFx0XHRyZXR1cm4ganNjLnBpY2tlciAmJiBqc2MucGlja2VyLm93bmVyID09PSBUSElTO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvblZhbHVlS2V5RG93biAoZXYpIHtcclxuXHRcdFx0aWYgKGpzYy5ldmVudEtleShldikgPT09ICdFbnRlcicpIHtcclxuXHRcdFx0XHRpZiAoVEhJUy52YWx1ZUVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFRISVMucHJvY2Vzc1ZhbHVlSW5wdXQoVEhJUy52YWx1ZUVsZW1lbnQudmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRUSElTLnRyeUhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvbkFscGhhS2V5RG93biAoZXYpIHtcclxuXHRcdFx0aWYgKGpzYy5ldmVudEtleShldikgPT09ICdFbnRlcicpIHtcclxuXHRcdFx0XHRpZiAoVEhJUy5hbHBoYUVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFRISVMucHJvY2Vzc0FscGhhSW5wdXQoVEhJUy5hbHBoYUVsZW1lbnQudmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRUSElTLnRyeUhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvblZhbHVlQ2hhbmdlIChldikge1xyXG5cdFx0XHRpZiAoanNjLmdldERhdGEoZXYsICdpbnRlcm5hbCcpKSB7XHJcblx0XHRcdFx0cmV0dXJuOyAvLyBza2lwIGlmIHRoZSBldmVudCB3YXMgaW50ZXJuYWxseSB0cmlnZ2VyZWQgYnkganNjb2xvclxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgb2xkVmFsID0gVEhJUy52YWx1ZUVsZW1lbnQudmFsdWU7XHJcblxyXG5cdFx0XHRUSElTLnByb2Nlc3NWYWx1ZUlucHV0KFRISVMudmFsdWVFbGVtZW50LnZhbHVlKTsgLy8gdGhpcyBtaWdodCBjaGFuZ2UgdGhlIHZhbHVlXHJcblxyXG5cdFx0XHRqc2MudHJpZ2dlckNhbGxiYWNrKFRISVMsICdvbkNoYW5nZScpO1xyXG5cclxuXHRcdFx0aWYgKFRISVMudmFsdWVFbGVtZW50LnZhbHVlICE9PSBvbGRWYWwpIHtcclxuXHRcdFx0XHQvLyB2YWx1ZSB3YXMgYWRkaXRpb25hbGx5IGNoYW5nZWQgLT4gbGV0J3MgdHJpZ2dlciB0aGUgY2hhbmdlIGV2ZW50IGFnYWluLCBldmVuIHRob3VnaCBpdCB3YXMgbmF0aXZlbHkgZGlzcGF0Y2hlZFxyXG5cdFx0XHRcdGpzYy50cmlnZ2VySW5wdXRFdmVudChUSElTLnZhbHVlRWxlbWVudCwgJ2NoYW5nZScsIHRydWUsIHRydWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIG9uQWxwaGFDaGFuZ2UgKGV2KSB7XHJcblx0XHRcdGlmIChqc2MuZ2V0RGF0YShldiwgJ2ludGVybmFsJykpIHtcclxuXHRcdFx0XHRyZXR1cm47IC8vIHNraXAgaWYgdGhlIGV2ZW50IHdhcyBpbnRlcm5hbGx5IHRyaWdnZXJlZCBieSBqc2NvbG9yXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBvbGRWYWwgPSBUSElTLmFscGhhRWxlbWVudC52YWx1ZTtcclxuXHJcblx0XHRcdFRISVMucHJvY2Vzc0FscGhhSW5wdXQoVEhJUy5hbHBoYUVsZW1lbnQudmFsdWUpOyAvLyB0aGlzIG1pZ2h0IGNoYW5nZSB0aGUgdmFsdWVcclxuXHJcblx0XHRcdGpzYy50cmlnZ2VyQ2FsbGJhY2soVEhJUywgJ29uQ2hhbmdlJyk7XHJcblxyXG5cdFx0XHQvLyB0cmlnZ2VyaW5nIHZhbHVlRWxlbWVudCdzIG9uQ2hhbmdlIChiZWNhdXNlIGNoYW5naW5nIGFscGhhIGNoYW5nZXMgdGhlIGVudGlyZSBjb2xvciwgZS5nLiB3aXRoIHJnYmEgZm9ybWF0KVxyXG5cdFx0XHRqc2MudHJpZ2dlcklucHV0RXZlbnQoVEhJUy52YWx1ZUVsZW1lbnQsICdjaGFuZ2UnLCB0cnVlLCB0cnVlKTtcclxuXHJcblx0XHRcdGlmIChUSElTLmFscGhhRWxlbWVudC52YWx1ZSAhPT0gb2xkVmFsKSB7XHJcblx0XHRcdFx0Ly8gdmFsdWUgd2FzIGFkZGl0aW9uYWxseSBjaGFuZ2VkIC0+IGxldCdzIHRyaWdnZXIgdGhlIGNoYW5nZSBldmVudCBhZ2FpbiwgZXZlbiB0aG91Z2ggaXQgd2FzIG5hdGl2ZWx5IGRpc3BhdGNoZWRcclxuXHRcdFx0XHRqc2MudHJpZ2dlcklucHV0RXZlbnQoVEhJUy5hbHBoYUVsZW1lbnQsICdjaGFuZ2UnLCB0cnVlLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvblZhbHVlSW5wdXQgKGV2KSB7XHJcblx0XHRcdGlmIChqc2MuZ2V0RGF0YShldiwgJ2ludGVybmFsJykpIHtcclxuXHRcdFx0XHRyZXR1cm47IC8vIHNraXAgaWYgdGhlIGV2ZW50IHdhcyBpbnRlcm5hbGx5IHRyaWdnZXJlZCBieSBqc2NvbG9yXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChUSElTLnZhbHVlRWxlbWVudCkge1xyXG5cdFx0XHRcdFRISVMuZnJvbVN0cmluZyhUSElTLnZhbHVlRWxlbWVudC52YWx1ZSwganNjLmZsYWdzLmxlYXZlVmFsdWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRqc2MudHJpZ2dlckNhbGxiYWNrKFRISVMsICdvbklucHV0Jyk7XHJcblxyXG5cdFx0XHQvLyB0cmlnZ2VyaW5nIHZhbHVlRWxlbWVudCdzIG9uSW5wdXRcclxuXHRcdFx0Ly8gKG5vdCBuZWVkZWQsIGl0IHdhcyBkaXNwYXRjaGVkIG5vcm1hbGx5IGJ5IHRoZSBicm93c2VyKVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvbkFscGhhSW5wdXQgKGV2KSB7XHJcblx0XHRcdGlmIChqc2MuZ2V0RGF0YShldiwgJ2ludGVybmFsJykpIHtcclxuXHRcdFx0XHRyZXR1cm47IC8vIHNraXAgaWYgdGhlIGV2ZW50IHdhcyBpbnRlcm5hbGx5IHRyaWdnZXJlZCBieSBqc2NvbG9yXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChUSElTLmFscGhhRWxlbWVudCkge1xyXG5cdFx0XHRcdFRISVMuZnJvbUhTVkEobnVsbCwgbnVsbCwgbnVsbCwgcGFyc2VGbG9hdChUSElTLmFscGhhRWxlbWVudC52YWx1ZSksIGpzYy5mbGFncy5sZWF2ZUFscGhhKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0anNjLnRyaWdnZXJDYWxsYmFjayhUSElTLCAnb25JbnB1dCcpO1xyXG5cclxuXHRcdFx0Ly8gdHJpZ2dlcmluZyB2YWx1ZUVsZW1lbnQncyBvbklucHV0IChiZWNhdXNlIGNoYW5naW5nIGFscGhhIGNoYW5nZXMgdGhlIGVudGlyZSBjb2xvciwgZS5nLiB3aXRoIHJnYmEgZm9ybWF0KVxyXG5cdFx0XHRqc2MudHJpZ2dlcklucHV0RXZlbnQoVEhJUy52YWx1ZUVsZW1lbnQsICdpbnB1dCcsIHRydWUsIHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvL1xyXG5cdFx0Ly8gSW5zdGFsbCB0aGUgY29sb3IgcGlja2VyIG9uIGNob3NlbiBlbGVtZW50KHMpXHJcblx0XHQvL1xyXG5cclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgcGlja2VyJ3MgY29udGFpbmVyIGVsZW1lbnRcclxuXHRcdGlmICh0aGlzLmNvbnRhaW5lciA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTsgLy8gZGVmYXVsdCBjb250YWluZXIgaXMgQk9EWSBlbGVtZW50XHJcblxyXG5cdFx0fSBlbHNlIHsgLy8gZXhwbGljaXRseSBzZXQgdG8gY3VzdG9tIGVsZW1lbnRcclxuXHRcdFx0dGhpcy5jb250YWluZXIgPSBqc2Mubm9kZSh0aGlzLmNvbnRhaW5lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLmNvbnRhaW5lcikge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBjb2xvciBwaWNrZXIgd2l0aG91dCBhIGNvbnRhaW5lciBlbGVtZW50Jyk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vIEZldGNoIHRoZSB0YXJnZXQgZWxlbWVudFxyXG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0ganNjLm5vZGUodGFyZ2V0RWxlbWVudCk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLnRhcmdldEVsZW1lbnQpIHtcclxuXHRcdFx0Ly8gdGVtcG9yYXJpbHkgY3VzdG9taXplZCBlcnJvciBtZXNzYWdlIHRvIGhlbHAgd2l0aCBtaWdyYXRpbmcgZnJvbSB2ZXJzaW9ucyBwcmlvciB0byAyLjJcclxuXHRcdFx0aWYgKHR5cGVvZiB0YXJnZXRFbGVtZW50ID09PSAnc3RyaW5nJyAmJiAvXlthLXpBLVpdW1xcdzouLV0qJC8udGVzdCh0YXJnZXRFbGVtZW50KSkge1xyXG5cdFx0XHRcdC8vIHRhcmdldEVsZW1lbnQgbG9va3MgbGlrZSB2YWxpZCBJRFxyXG5cdFx0XHRcdHZhciBwb3NzaWJseUlkID0gdGFyZ2V0RWxlbWVudDtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0lmIFxcJycgKyBwb3NzaWJseUlkICsgJ1xcJyBpcyBzdXBwb3NlZCB0byBiZSBhbiBJRCwgcGxlYXNlIHVzZSBcXCcjJyArIHBvc3NpYmx5SWQgKyAnXFwnIG9yIGFueSB2YWxpZCBDU1Mgc2VsZWN0b3IuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignQ2Fubm90IGluc3RhbnRpYXRlIGNvbG9yIHBpY2tlciB3aXRob3V0IGEgdGFyZ2V0IGVsZW1lbnQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy50YXJnZXRFbGVtZW50LmpzY29sb3IgJiYgdGhpcy50YXJnZXRFbGVtZW50LmpzY29sb3IgaW5zdGFuY2VvZiBqc2MucHViKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignQ29sb3IgcGlja2VyIGFscmVhZHkgaW5zdGFsbGVkIG9uIHRoaXMgZWxlbWVudCcpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBsaW5rIHRoaXMgaW5zdGFuY2Ugd2l0aCB0aGUgdGFyZ2V0IGVsZW1lbnRcclxuXHRcdHRoaXMudGFyZ2V0RWxlbWVudC5qc2NvbG9yID0gdGhpcztcclxuXHRcdGpzYy5hZGRDbGFzcyh0aGlzLnRhcmdldEVsZW1lbnQsIGpzYy5wdWIuY2xhc3NOYW1lKTtcclxuXHJcblx0XHQvLyByZWdpc3RlciB0aGlzIGluc3RhbmNlXHJcblx0XHRqc2MuaW5zdGFuY2VzLnB1c2godGhpcyk7XHJcblxyXG5cclxuXHRcdC8vIGlmIHRhcmdldCBpcyBCVVRUT05cclxuXHRcdGlmIChqc2MuaXNCdXR0b24odGhpcy50YXJnZXRFbGVtZW50KSkge1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudGFyZ2V0RWxlbWVudC50eXBlLnRvTG93ZXJDYXNlKCkgIT09ICdidXR0b24nKSB7XHJcblx0XHRcdFx0Ly8gb24gYnV0dG9ucywgYWx3YXlzIGZvcmNlIHR5cGUgdG8gYmUgJ2J1dHRvbicsIGUuZy4gaW4gc2l0dWF0aW9ucyB0aGUgdGFyZ2V0IDxidXR0b24+IGhhcyBubyB0eXBlXHJcblx0XHRcdFx0Ly8gYW5kIHRodXMgZGVmYXVsdHMgdG8gJ3N1Ym1pdCcgYW5kIHdvdWxkIHN1Ym1pdCB0aGUgZm9ybSB3aGVuIGNsaWNrZWRcclxuXHRcdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQudHlwZSA9ICdidXR0b24nO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoanNjLmlzQnV0dG9uRW1wdHkodGhpcy50YXJnZXRFbGVtZW50KSkgeyAvLyBlbXB0eSBidXR0b25cclxuXHRcdFx0XHQvLyBpdCBpcyBpbXBvcnRhbnQgdG8gY2xlYXIgZWxlbWVudCdzIGNvbnRlbnRzIGZpcnN0LlxyXG5cdFx0XHRcdC8vIGlmIHdlJ3JlIHJlLWluc3RhbnRpYXRpbmcgY29sb3IgcGlja2VycyBvbiBET00gdGhhdCBoYXMgYmVlbiBtb2RpZmllZCBieSBjaGFuZ2luZyBwYWdlJ3MgaW5uZXJIVE1MLFxyXG5cdFx0XHRcdC8vIHdlIHdvdWxkIGtlZXAgYWRkaW5nIG1vcmUgbm9uLWJyZWFraW5nIHNwYWNlcyB0byBlbGVtZW50J3MgY29udGVudCAoYmVjYXVzZSBlbGVtZW50J3MgY29udGVudHMgc3Vydml2ZVxyXG5cdFx0XHRcdC8vIGlubmVySFRNTCBjaGFuZ2VzLCBidXQgcGlja2VyIGluc3RhbmNlcyBkb24ndClcclxuXHRcdFx0XHRqc2MucmVtb3ZlQ2hpbGRyZW4odGhpcy50YXJnZXRFbGVtZW50KTtcclxuXHJcblx0XHRcdFx0Ly8gbGV0J3MgaW5zZXJ0IGEgbm9uLWJyZWFraW5nIHNwYWNlXHJcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdcXHhhMCcpKTtcclxuXHJcblx0XHRcdFx0Ly8gc2V0IG1pbi13aWR0aCA9IHByZXZpZXdTaXplLCBpZiBub3QgYWxyZWFkeSBncmVhdGVyXHJcblx0XHRcdFx0dmFyIGNvbXBTdHlsZSA9IGpzYy5nZXRDb21wU3R5bGUodGhpcy50YXJnZXRFbGVtZW50KTtcclxuXHRcdFx0XHR2YXIgY3Vyck1pbldpZHRoID0gcGFyc2VGbG9hdChjb21wU3R5bGVbJ21pbi13aWR0aCddKSB8fCAwO1xyXG5cdFx0XHRcdGlmIChjdXJyTWluV2lkdGggPCB0aGlzLnByZXZpZXdTaXplKSB7XHJcblx0XHRcdFx0XHRqc2Muc2V0U3R5bGUodGhpcy50YXJnZXRFbGVtZW50LCB7XHJcblx0XHRcdFx0XHRcdCdtaW4td2lkdGgnOiB0aGlzLnByZXZpZXdTaXplICsgJ3B4JyxcclxuXHRcdFx0XHRcdH0sIHRoaXMuZm9yY2VTdHlsZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSB2YWx1ZSBlbGVtZW50XHJcblx0XHRpZiAodGhpcy52YWx1ZUVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRpZiAoanNjLmlzVGV4dElucHV0KHRoaXMudGFyZ2V0RWxlbWVudCkpIHtcclxuXHRcdFx0XHQvLyBmb3IgdGV4dCBpbnB1dHMsIGRlZmF1bHQgdmFsdWVFbGVtZW50IGlzIHRhcmdldEVsZW1lbnRcclxuXHRcdFx0XHR0aGlzLnZhbHVlRWxlbWVudCA9IHRoaXMudGFyZ2V0RWxlbWVudDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBsZWF2ZSBpdCB1bmRlZmluZWRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSBpZiAodGhpcy52YWx1ZUVsZW1lbnQgPT09IG51bGwpIHsgLy8gZXhwbGljaXRseSBzZXQgdG8gbnVsbFxyXG5cdFx0XHQvLyBsZWF2ZSBpdCBudWxsXHJcblxyXG5cdFx0fSBlbHNlIHsgLy8gZXhwbGljaXRseSBzZXQgdG8gY3VzdG9tIGVsZW1lbnRcclxuXHRcdFx0dGhpcy52YWx1ZUVsZW1lbnQgPSBqc2Mubm9kZSh0aGlzLnZhbHVlRWxlbWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBhbHBoYSBlbGVtZW50XHJcblx0XHRpZiAodGhpcy5hbHBoYUVsZW1lbnQpIHtcclxuXHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQgPSBqc2Mubm9kZSh0aGlzLmFscGhhRWxlbWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBwcmV2aWV3IGVsZW1lbnRcclxuXHRcdGlmICh0aGlzLnByZXZpZXdFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMudGFyZ2V0RWxlbWVudDsgLy8gZGVmYXVsdCBwcmV2aWV3RWxlbWVudCBpcyB0YXJnZXRFbGVtZW50XHJcblxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnByZXZpZXdFbGVtZW50ID09PSBudWxsKSB7IC8vIGV4cGxpY2l0bHkgc2V0IHRvIG51bGxcclxuXHRcdFx0Ly8gbGVhdmUgaXQgbnVsbFxyXG5cclxuXHRcdH0gZWxzZSB7IC8vIGV4cGxpY2l0bHkgc2V0IHRvIGN1c3RvbSBlbGVtZW50XHJcblx0XHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSBqc2Mubm9kZSh0aGlzLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyB2YWx1ZUVsZW1lbnRcclxuXHRcdGlmICh0aGlzLnZhbHVlRWxlbWVudCAmJiBqc2MuaXNUZXh0SW5wdXQodGhpcy52YWx1ZUVsZW1lbnQpKSB7XHJcblxyXG5cdFx0XHQvLyBJZiB0aGUgdmFsdWUgZWxlbWVudCBoYXMgb25JbnB1dCBldmVudCBhbHJlYWR5IHNldCwgd2UgbmVlZCB0byBkZXRhY2ggaXQgYW5kIGF0dGFjaCBBRlRFUiBvdXIgbGlzdGVuZXIuXHJcblx0XHRcdC8vIG90aGVyd2lzZSB0aGUgcGlja2VyIGluc3RhbmNlIHdvdWxkIHN0aWxsIGNvbnRhaW4gdGhlIG9sZCBjb2xvciB3aGVuIGFjY2Vzc2VkIGZyb20gdGhlIG9uSW5wdXQgaGFuZGxlci5cclxuXHRcdFx0dmFyIHZhbHVlRWxlbWVudE9yaWdFdmVudHMgPSB7XHJcblx0XHRcdFx0b25JbnB1dDogdGhpcy52YWx1ZUVsZW1lbnQub25pbnB1dFxyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5vbmlucHV0ID0gbnVsbDtcclxuXHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvblZhbHVlS2V5RG93biwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblZhbHVlQ2hhbmdlLCBmYWxzZSk7XHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25WYWx1ZUlucHV0LCBmYWxzZSk7XHJcblx0XHRcdC8vIHRoZSBvcmlnaW5hbCBldmVudCBsaXN0ZW5lciBtdXN0IGJlIGF0dGFjaGVkIEFGVEVSIG91ciBoYW5kbGVyICh0byBsZXQgaXQgZmlyc3Qgc2V0IHBpY2tlcidzIGNvbG9yKVxyXG5cdFx0XHRpZiAodmFsdWVFbGVtZW50T3JpZ0V2ZW50cy5vbklucHV0KSB7XHJcblx0XHRcdFx0dGhpcy52YWx1ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB2YWx1ZUVsZW1lbnRPcmlnRXZlbnRzLm9uSW5wdXQsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy52YWx1ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7XHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXV0b2NvcnJlY3QnLCAnb2ZmJyk7XHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXV0b2NhcGl0YWxpemUnLCAnb2ZmJyk7XHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3BlbGxjaGVjaycsIGZhbHNlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBhbHBoYUVsZW1lbnRcclxuXHRcdGlmICh0aGlzLmFscGhhRWxlbWVudCAmJiBqc2MuaXNUZXh0SW5wdXQodGhpcy5hbHBoYUVsZW1lbnQpKSB7XHJcblx0XHRcdHRoaXMuYWxwaGFFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkFscGhhS2V5RG93biwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLmFscGhhRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvbkFscGhhQ2hhbmdlLCBmYWxzZSk7XHJcblx0XHRcdHRoaXMuYWxwaGFFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25BbHBoYUlucHV0LCBmYWxzZSk7XHJcblxyXG5cdFx0XHR0aGlzLmFscGhhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTtcclxuXHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhdXRvY29ycmVjdCcsICdvZmYnKTtcclxuXHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhdXRvY2FwaXRhbGl6ZScsICdvZmYnKTtcclxuXHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcGVsbGNoZWNrJywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGRldGVybWluZSBpbml0aWFsIGNvbG9yIHZhbHVlXHJcblx0XHQvL1xyXG5cdFx0dmFyIGluaXRWYWx1ZSA9ICdGRkZGRkYnO1xyXG5cclxuXHRcdGlmICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aW5pdFZhbHVlID0gdGhpcy52YWx1ZTsgLy8gZ2V0IGluaXRpYWwgY29sb3IgZnJvbSB0aGUgJ3ZhbHVlJyBwcm9wZXJ0eVxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnZhbHVlRWxlbWVudCAmJiB0aGlzLnZhbHVlRWxlbWVudC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGluaXRWYWx1ZSA9IHRoaXMudmFsdWVFbGVtZW50LnZhbHVlOyAvLyBnZXQgaW5pdGlhbCBjb2xvciBmcm9tIHZhbHVlRWxlbWVudCdzIHZhbHVlXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZGV0ZXJtaW5lIGluaXRpYWwgYWxwaGEgdmFsdWVcclxuXHRcdC8vXHJcblx0XHR2YXIgaW5pdEFscGhhID0gdW5kZWZpbmVkO1xyXG5cclxuXHRcdGlmICh0aGlzLmFscGhhICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aW5pdEFscGhhID0gKCcnK3RoaXMuYWxwaGEpOyAvLyBnZXQgaW5pdGlhbCBhbHBoYSB2YWx1ZSBmcm9tIHRoZSAnYWxwaGEnIHByb3BlcnR5XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuYWxwaGFFbGVtZW50ICYmIHRoaXMuYWxwaGFFbGVtZW50LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aW5pdEFscGhhID0gdGhpcy5hbHBoYUVsZW1lbnQudmFsdWU7IC8vIGdldCBpbml0aWFsIGNvbG9yIGZyb20gYWxwaGFFbGVtZW50J3MgdmFsdWVcclxuXHRcdH1cclxuXHJcblx0XHQvLyBkZXRlcm1pbmUgY3VycmVudCBmb3JtYXQgYmFzZWQgb24gdGhlIGluaXRpYWwgY29sb3IgdmFsdWVcclxuXHRcdC8vXHJcblx0XHR0aGlzLl9jdXJyZW50Rm9ybWF0ID0gbnVsbDtcclxuXHJcblx0XHRpZiAoWydhdXRvJywgJ2FueSddLmluZGV4T2YodGhpcy5mb3JtYXQudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xyXG5cdFx0XHQvLyBmb3JtYXQgaXMgJ2F1dG8nIG9yICdhbnknIC0+IGxldCdzIGF1dG8tZGV0ZWN0IGN1cnJlbnQgZm9ybWF0XHJcblx0XHRcdHZhciBjb2xvciA9IGpzYy5wYXJzZUNvbG9yU3RyaW5nKGluaXRWYWx1ZSk7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnRGb3JtYXQgPSBjb2xvciA/IGNvbG9yLmZvcm1hdCA6ICdoZXgnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gZm9ybWF0IGlzIHNwZWNpZmllZFxyXG5cdFx0XHR0aGlzLl9jdXJyZW50Rm9ybWF0ID0gdGhpcy5mb3JtYXQudG9Mb3dlckNhc2UoKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Ly8gbGV0J3MgcGFyc2UgdGhlIGluaXRpYWwgY29sb3IgdmFsdWUgYW5kIGV4cG9zZSBjb2xvcidzIHByZXZpZXdcclxuXHRcdHRoaXMucHJvY2Vzc1ZhbHVlSW5wdXQoaW5pdFZhbHVlKTtcclxuXHJcblx0XHQvLyBsZXQncyBhbHNvIHBhcnNlIGFuZCBleHBvc2UgdGhlIGluaXRpYWwgYWxwaGEgdmFsdWUsIGlmIGFueVxyXG5cdFx0Ly9cclxuXHRcdC8vIE5vdGU6IElmIHRoZSBpbml0aWFsIGNvbG9yIHZhbHVlIGNvbnRhaW5zIGFscGhhIHZhbHVlIGluIGl0IChlLmcuIGluIHJnYmEgZm9ybWF0KSxcclxuXHRcdC8vIHRoaXMgd2lsbCBvdmVyd3JpdGUgaXQuIFNvIHdlIHNob3VsZCBvbmx5IHByb2Nlc3MgYWxwaGEgaW5wdXQgaWYgdGhlcmUgd2FzIGFueSBpbml0aWFsXHJcblx0XHQvLyBhbHBoYSBleHBsaWNpdGx5IHNldCwgb3RoZXJ3aXNlIHdlIGNvdWxkIG5lZWRsZXNzbHkgbG9zZSBpbml0aWFsIHZhbHVlJ3MgYWxwaGFcclxuXHRcdGlmIChpbml0QWxwaGEgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnByb2Nlc3NBbHBoYUlucHV0KGluaXRBbHBoYSk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn07XHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQdWJsaWMgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vL1xyXG4vLyBUaGVzZSB3aWxsIGJlIHB1YmxpY2x5IGF2YWlsYWJsZSB2aWEganNjb2xvci48bmFtZT4gYW5kIEpTQ29sb3IuPG5hbWU+XHJcbi8vXHJcblxyXG5cclxuLy8gY2xhc3MgdGhhdCB3aWxsIGJlIHNldCB0byBlbGVtZW50cyBoYXZpbmcganNjb2xvciBpbnN0YWxsZWQgb24gdGhlbVxyXG5qc2MucHViLmNsYXNzTmFtZSA9ICdqc2NvbG9yJztcclxuXHJcblxyXG4vLyBjbGFzcyB0aGF0IHdpbGwgYmUgc2V0IHRvIGVsZW1lbnRzIGhhdmluZyBqc2NvbG9yIGFjdGl2ZSBvbiB0aGVtXHJcbmpzYy5wdWIuYWN0aXZlQ2xhc3NOYW1lID0gJ2pzY29sb3ItYWN0aXZlJztcclxuXHJcblxyXG4vLyB3aGV0aGVyIHRvIHRyeSB0byBwYXJzZSB0aGUgb3B0aW9ucyBzdHJpbmcgYnkgZXZhbHVhdGluZyBpdCB1c2luZyAnbmV3IEZ1bmN0aW9uKCknXHJcbi8vIGluIGNhc2UgaXQgY291bGQgbm90IGJlIHBhcnNlZCB3aXRoIEpTT04ucGFyc2UoKVxyXG5qc2MucHViLmxvb3NlSlNPTiA9IHRydWU7XHJcblxyXG5cclxuLy8gcHJlc2V0c1xyXG5qc2MucHViLnByZXNldHMgPSB7fTtcclxuXHJcbi8vIGJ1aWx0LWluIHByZXNldHNcclxuanNjLnB1Yi5wcmVzZXRzWydkZWZhdWx0J10gPSB7fTsgLy8gYmFzZWxpbmUgZm9yIGN1c3RvbWl6YXRpb25cclxuXHJcbmpzYy5wdWIucHJlc2V0c1snbGlnaHQnXSA9IHsgLy8gZGVmYXVsdCBjb2xvciBzY2hlbWVcclxuXHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyxcclxuXHRjb250cm9sQm9yZGVyQ29sb3I6ICdyZ2JhKDE4NywxODcsMTg3LDEpJyxcclxuXHRidXR0b25Db2xvcjogJ3JnYmEoMCwwLDAsMSknLFxyXG59O1xyXG5qc2MucHViLnByZXNldHNbJ2RhcmsnXSA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDUxLDUxLDUxLDEpJyxcclxuXHRjb250cm9sQm9yZGVyQ29sb3I6ICdyZ2JhKDE1MywxNTMsMTUzLDEpJyxcclxuXHRidXR0b25Db2xvcjogJ3JnYmEoMjQwLDI0MCwyNDAsMSknLFxyXG59O1xyXG5cclxuanNjLnB1Yi5wcmVzZXRzWydzbWFsbCddID0geyB3aWR0aDoxMDEsIGhlaWdodDoxMDEsIHBhZGRpbmc6MTAsIHNsaWRlclNpemU6MTQgfTtcclxuanNjLnB1Yi5wcmVzZXRzWydtZWRpdW0nXSA9IHsgd2lkdGg6MTgxLCBoZWlnaHQ6MTAxLCBwYWRkaW5nOjEyLCBzbGlkZXJTaXplOjE2IH07IC8vIGRlZmF1bHQgc2l6ZVxyXG5qc2MucHViLnByZXNldHNbJ2xhcmdlJ10gPSB7IHdpZHRoOjI3MSwgaGVpZ2h0OjE1MSwgcGFkZGluZzoxMiwgc2xpZGVyU2l6ZToyNCB9O1xyXG5cclxuanNjLnB1Yi5wcmVzZXRzWyd0aGluJ10gPSB7IGJvcmRlcldpZHRoOjEsIGNvbnRyb2xCb3JkZXJXaWR0aDoxLCBwb2ludGVyQm9yZGVyV2lkdGg6MSB9OyAvLyBkZWZhdWx0IHRoaWNrbmVzc1xyXG5qc2MucHViLnByZXNldHNbJ3RoaWNrJ10gPSB7IGJvcmRlcldpZHRoOjIsIGNvbnRyb2xCb3JkZXJXaWR0aDoyLCBwb2ludGVyQm9yZGVyV2lkdGg6MiB9O1xyXG5cclxuXHJcbi8vIHNpemUgb2Ygc3BhY2UgaW4gdGhlIHNsaWRlcnNcclxuanNjLnB1Yi5zbGlkZXJJbm5lclNwYWNlID0gMzsgLy8gcHhcclxuXHJcbi8vIHRyYW5zcGFyZW5jeSBjaGVzc2JvYXJkXHJcbmpzYy5wdWIuY2hlc3Nib2FyZFNpemUgPSA4OyAvLyBweFxyXG5qc2MucHViLmNoZXNzYm9hcmRDb2xvcjEgPSAnIzY2NjY2Nic7XHJcbmpzYy5wdWIuY2hlc3Nib2FyZENvbG9yMiA9ICcjOTk5OTk5JztcclxuXHJcbi8vIHByZXZpZXcgc2VwYXJhdG9yXHJcbmpzYy5wdWIucHJldmlld1NlcGFyYXRvciA9IFsncmdiYSgyNTUsMjU1LDI1NSwuNjUpJywgJ3JnYmEoMTI4LDEyOCwxMjgsLjY1KSddO1xyXG5cclxuXHJcbi8vIEluc3RhbGxzIGpzY29sb3Igb24gY3VycmVudCBET00gdHJlZVxyXG5qc2MucHViLmluc3RhbGwgPSBmdW5jdGlvbiAocm9vdE5vZGUpIHtcclxuXHR2YXIgc3VjY2VzcyA9IHRydWU7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRqc2MuaW5zdGFsbEJ5U2VsZWN0b3IoJ1tkYXRhLWpzY29sb3JdJywgcm9vdE5vZGUpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHN1Y2Nlc3MgPSBmYWxzZTtcclxuXHRcdGNvbnNvbGUud2FybihlKTtcclxuXHR9XHJcblxyXG5cdC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggREVQUkVDQVRFRCBpbnN0YWxsYXRpb24gdXNpbmcgY2xhc3MgbmFtZVxyXG5cdGlmIChqc2MucHViLmxvb2t1cENsYXNzKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRqc2MuaW5zdGFsbEJ5U2VsZWN0b3IoXHJcblx0XHRcdFx0KFxyXG5cdFx0XHRcdFx0J2lucHV0LicgKyBqc2MucHViLmxvb2t1cENsYXNzICsgJywgJyArXHJcblx0XHRcdFx0XHQnYnV0dG9uLicgKyBqc2MucHViLmxvb2t1cENsYXNzXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRyb290Tm9kZVxyXG5cdFx0XHQpO1xyXG5cdFx0fSBjYXRjaCAoZSkge31cclxuXHR9XHJcblxyXG5cdHJldHVybiBzdWNjZXNzO1xyXG59O1xyXG5cclxuXHJcbi8vIFRyaWdnZXJzIGdpdmVuIGlucHV0IGV2ZW50KHMpIChlLmcuICdpbnB1dCcgb3IgJ2NoYW5nZScpIG9uIGFsbCBjb2xvciBwaWNrZXJzLlxyXG4vL1xyXG4vLyBJdCBpcyBwb3NzaWJsZSB0byBzcGVjaWZ5IG11bHRpcGxlIGV2ZW50cyBzZXBhcmF0ZWQgd2l0aCBhIHNwYWNlLlxyXG4vLyBJZiBjYWxsZWQgYmVmb3JlIGpzY29sb3IgaXMgaW5pdGlhbGl6ZWQsIHRoZW4gdGhlIGV2ZW50cyB3aWxsIGJlIHRyaWdnZXJlZCBhZnRlciBpbml0aWFsaXphdGlvbi5cclxuLy9cclxuanNjLnB1Yi50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMpIHtcclxuXHRpZiAoanNjLmluaXRpYWxpemVkKSB7XHJcblx0XHRqc2MudHJpZ2dlckdsb2JhbChldmVudE5hbWVzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0anNjLnRyaWdnZXJRdWV1ZS5wdXNoKGV2ZW50TmFtZXMpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG4vLyBIaWRlcyBjdXJyZW50IGNvbG9yIHBpY2tlciBib3hcclxuanNjLnB1Yi5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cdGlmIChqc2MucGlja2VyICYmIGpzYy5waWNrZXIub3duZXIpIHtcclxuXHRcdGpzYy5waWNrZXIub3duZXIuaGlkZSgpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG4vLyBSZXR1cm5zIGEgZGF0YSBVUkwgb2YgYSBncmF5IGNoZXNzYm9hcmQgaW1hZ2UgdGhhdCBpbmRpY2F0ZXMgdHJhbnNwYXJlbmN5XHJcbmpzYy5wdWIuY2hlc3Nib2FyZCA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG5cdGlmICghY29sb3IpIHtcclxuXHRcdGNvbG9yID0gJ3JnYmEoMCwwLDAsMCknO1xyXG5cdH1cclxuXHR2YXIgcHJldmlldyA9IGpzYy5nZW5Db2xvclByZXZpZXdDYW52YXMoY29sb3IpO1xyXG5cdHJldHVybiBwcmV2aWV3LmNhbnZhcy50b0RhdGFVUkwoKTtcclxufTtcclxuXHJcblxyXG4vLyBSZXR1cm5zIGEgZGF0YSBVUkwgb2YgYSBncmF5IGNoZXNzYm9hcmQgaW1hZ2UgdGhhdCBpbmRpY2F0ZXMgdHJhbnNwYXJlbmN5XHJcbmpzYy5wdWIuYmFja2dyb3VuZCA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG5cdHZhciBiYWNrZ3JvdW5kcyA9IFtdO1xyXG5cclxuXHQvLyBDU1MgZ3JhZGllbnQgZm9yIGJhY2tncm91bmQgY29sb3IgcHJldmlld1xyXG5cdGJhY2tncm91bmRzLnB1c2goanNjLmdlbkNvbG9yUHJldmlld0dyYWRpZW50KGNvbG9yKSk7XHJcblxyXG5cdC8vIGRhdGEgVVJMIG9mIGdlbmVyYXRlZCBQTkcgaW1hZ2Ugd2l0aCBhIGdyYXkgdHJhbnNwYXJlbmN5IGNoZXNzYm9hcmRcclxuXHR2YXIgcHJldmlldyA9IGpzYy5nZW5Db2xvclByZXZpZXdDYW52YXMoKTtcclxuXHRiYWNrZ3JvdW5kcy5wdXNoKFtcclxuXHRcdCd1cmwoXFwnJyArIHByZXZpZXcuY2FudmFzLnRvRGF0YVVSTCgpICsgJ1xcJyknLFxyXG5cdFx0J2xlZnQgdG9wJyxcclxuXHRcdCdyZXBlYXQnLFxyXG5cdF0uam9pbignICcpKTtcclxuXHJcblx0cmV0dXJuIGJhY2tncm91bmRzLmpvaW4oJywgJyk7XHJcbn07XHJcblxyXG5cclxuLy9cclxuLy8gREVQUkVDQVRFRCBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXHJcbi8vXHJcblxyXG5cclxuLy8gREVQUkVDQVRFRC4gVXNlIGpzY29sb3IucHJlc2V0cy5kZWZhdWx0IGluc3RlYWQuXHJcbi8vXHJcbi8vIEN1c3RvbSBkZWZhdWx0IG9wdGlvbnMgZm9yIGFsbCBjb2xvciBwaWNrZXJzLCBlLmcuIHsgaGFzaDogdHJ1ZSwgd2lkdGg6IDMwMCB9XHJcbmpzYy5wdWIub3B0aW9ucyA9IHt9O1xyXG5cclxuXHJcbi8vIERFUFJFQ0FURUQuIFVzZSBkYXRhLWpzY29sb3IgYXR0cmlidXRlIGluc3RlYWQsIHdoaWNoIGluc3RhbGxzIGpzY29sb3Igb24gZ2l2ZW4gZWxlbWVudC5cclxuLy9cclxuLy8gQnkgZGVmYXVsdCwgd2UnbGwgc2VhcmNoIGZvciBhbGwgZWxlbWVudHMgd2l0aCBjbGFzcz1cImpzY29sb3JcIiBhbmQgaW5zdGFsbCBhIGNvbG9yIHBpY2tlciBvbiB0aGVtLlxyXG4vL1xyXG4vLyBZb3UgY2FuIGNoYW5nZSB3aGF0IGNsYXNzIG5hbWUgd2lsbCBiZSBsb29rZWQgZm9yIGJ5IHNldHRpbmcgdGhlIHByb3BlcnR5IGpzY29sb3IubG9va3VwQ2xhc3NcclxuLy8gYW55d2hlcmUgaW4geW91ciBIVE1MIGRvY3VtZW50LiBUbyBjb21wbGV0ZWx5IGRpc2FibGUgdGhlIGF1dG9tYXRpYyBsb29rdXAsIHNldCBpdCB0byBudWxsLlxyXG4vL1xyXG5qc2MucHViLmxvb2t1cENsYXNzID0gJ2pzY29sb3InO1xyXG5cclxuXHJcbi8vIERFUFJFQ0FURUQuIFVzZSBqc2NvbG9yLmluc3RhbGwoKSBpbnN0ZWFkXHJcbi8vXHJcbmpzYy5wdWIuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRjb25zb2xlLndhcm4oJ2pzY29sb3IuaW5pdCgpIGlzIERFUFJFQ0FURUQuIFVzaW5nIGpzY29sb3IuaW5zdGFsbCgpIGluc3RlYWQuJyArIGpzYy5kb2NzUmVmKTtcclxuXHRyZXR1cm4ganNjLnB1Yi5pbnN0YWxsKCk7XHJcbn07XHJcblxyXG5cclxuLy8gREVQUkVDQVRFRC4gVXNlIGRhdGEtanNjb2xvciBhdHRyaWJ1dGUgaW5zdGVhZCwgd2hpY2ggaW5zdGFsbHMganNjb2xvciBvbiBnaXZlbiBlbGVtZW50LlxyXG4vL1xyXG4vLyBJbnN0YWxsIGpzY29sb3Igb24gYWxsIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgc3BlY2lmaWVkIGNsYXNzIG5hbWVcclxuanNjLnB1Yi5pbnN0YWxsQnlDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc29sZS5lcnJvcignanNjb2xvci5pbnN0YWxsQnlDbGFzc05hbWUoKSBpcyBERVBSRUNBVEVELiBVc2UgZGF0YS1qc2NvbG9yPVwiXCIgYXR0cmlidXRlIGluc3RlYWQgb2YgYSBjbGFzcyBuYW1lLicgKyBqc2MuZG9jc1JlZik7XHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuXHJcbmpzYy5yZWdpc3RlcigpO1xyXG5cclxuXHJcbnJldHVybiBqc2MucHViO1xyXG5cclxuXHJcbn0pKCk7IC8vIEVORCB3aW5kb3cuanNjb2xvclxyXG5cclxud2luZG93LkpTQ29sb3IgPSB3aW5kb3cuanNjb2xvcjsgLy8gJ0pTQ29sb3InIGlzIGFuIGFsaWFzIHRvICdqc2NvbG9yJ1xyXG5cclxufSAvLyBlbmRpZlxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFVQSxVQUFJLGtCQUFrQjtBQUd0QixVQUFJLE1BQU0sSUFBSTtBQUdkLFVBQUksWUFBWTtBQUdoQixVQUFJLFNBQVM7QUFHYixVQUFJLGFBQWE7QUFHakIsVUFBSSxhQUFhO0FBR2pCLFVBQUksWUFBWTtBQUdoQixVQUFJLGVBQWU7QUFHbkIsVUFBSSxhQUFhLE9BQU8sVUFBVSxZQUFZLFVBQVUsT0FBTyxXQUFXLFVBQVU7QUFHcEYsVUFBSSxXQUFXLE9BQU8sUUFBUSxZQUFZLFFBQVEsS0FBSyxXQUFXLFVBQVU7QUFHNUUsVUFBSSxPQUFPLGNBQWMsWUFBWSxTQUFTO0FBRzlDLFVBQUksY0FBYyxPQUFPO0FBT3pCLFVBQUksaUJBQWlCLFlBQVk7QUFHakMsVUFBSSxZQUFZLEtBQUs7QUFBckIsVUFDSSxZQUFZLEtBQUs7QUFrQnJCLFVBQUksTUFBTSxX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UTtBQUVaLFNBQU0sZ0JBQWdCO0FBQUEsSUFDcEIsU0FBUztBQUFFLGFBQU8sS0FBSyxHQUFHLGFBQWE7QUFBQTtBQUFBLElBQ3ZDLFVBQVU7QUFDUixjQUFRO0FBQ1IsV0FBSyxHQUFHLGlCQUFpQixTQUFTLDJCQUFTLE9BQUs7QUFDOUMsY0FBTSxLQUFLLEVBQUU7QUFDYixjQUFNLE1BQU0sR0FBRztBQUNmLGFBQUssWUFBWSxLQUFLLFVBQVUsU0FBUyxFQUFDLEtBQVUsVUFBVSxLQUFLLEdBQUcsUUFBUTtBQUFBLFNBQzdFO0FBQUE7QUFBQTtBQUlQLFNBQU0sbUJBQW1CO0FBQUEsSUFDdkIsU0FBUztBQUFFLGFBQU8sS0FBSyxHQUFHLGFBQWE7QUFBQTtBQUFBLElBQ3ZDLFVBQVU7QUFDUixXQUFLLEdBQUcsaUJBQWlCLFNBQVMsMkJBQVMsT0FBSztBQUM5QyxjQUFNLFFBQVEsU0FBUyxFQUFFLE9BQU87QUFDaEMsYUFBSyxZQUFZLEtBQUssVUFBVSxjQUFjLEVBQUMsT0FBYyxVQUFVLEtBQUssR0FBRyxRQUFRO0FBQUEsU0FDdEY7QUFBQTtBQUFBO0FBSVAsU0FBTSxjQUFjO0FBQUEsSUFDbEIsU0FBUztBQUFFLGFBQU8sS0FBSyxHQUFHLGFBQWE7QUFBQTtBQUFBLElBQ3ZDLFVBQVU7QUFDUixXQUFLLEdBQUcsaUJBQWlCLFNBQVMsMkJBQVMsT0FBSztBQUM5QyxjQUFNLFFBQVEsU0FBUyxFQUFFLE9BQU87QUFDaEMsYUFBSyxZQUFZLEtBQUssVUFBVSxnQkFBZ0IsRUFBQyxPQUFjLFVBQVUsS0FBSyxHQUFHLFFBQVE7QUFBQSxTQUN4RjtBQUFBO0FBQUE7QUFJUCxTQUFPLFNBQVMsU0FBUyxZQUFZO0FBQ25DLFVBQU0sUUFBUSxJQUFJLFlBQVksU0FBUyxFQUFDLFFBQVE7QUFDaEQsZUFBVyxlQUFlLGNBQWM7QUFBQTtBQUkxQyxNQUFJLFlBQVksU0FBUyxjQUFjLDJCQUEyQixhQUFhO0FBQy9FLE1BQUksYUFBYSxJQUFJLFdBQVcsU0FBUyxRQUFRLEVBQUMsT0FBTyxRQUFPLFFBQVEsRUFBQyxhQUFhO0FBR3RGLHdCQUFPLE9BQU8sRUFBQyxXQUFXLEVBQUMsR0FBRyxVQUFTLGFBQWE7QUFDcEQsU0FBTyxpQkFBaUIsMEJBQTBCLFVBQVEsc0JBQU87QUFDakUsU0FBTyxpQkFBaUIseUJBQXlCLFVBQVEsc0JBQU87QUFHaEUsYUFBVztBQU1YLFNBQU8sYUFBYTsiLAogICJuYW1lcyI6IFtdCn0K
