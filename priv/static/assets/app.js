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
        this.xdomainRequest(req, method, endPoint, body, timeout, ontimeout, callback);
      } else {
        let req = new global2.XMLHttpRequest();
        this.xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback);
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
    }
    static xhrRequest(req, method, endPoint, accept, body, timeout, ontimeout, callback) {
      req.open(method, endPoint, true);
      req.timeout = timeout;
      req.setRequestHeader("Content-Type", accept);
      req.onerror = () => {
        callback && callback(null);
      };
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
    poll() {
      if (!(this.readyState === SOCKET_STATES.open || this.readyState === SOCKET_STATES.connecting)) {
        return;
      }
      Ajax.request("GET", this.endpointURL(), "application/json", null, this.timeout, this.ontimeout.bind(this), (resp) => {
        if (resp) {
          var { status, token, messages } = resp;
          this.token = token;
        } else {
          status = 0;
        }
        switch (status) {
          case 200:
            messages.forEach((msg) => {
              setTimeout(() => {
                this.onmessage({ data: msg });
              }, 0);
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
      Ajax.request("POST", this.endpointURL(), "application/json", body, this.timeout, this.onerror.bind(this, "timeout"), (resp) => {
        if (!resp || resp.status !== 200) {
          this.onerror(resp && resp.status);
          this.closeAndRetry(1011, "internal server error", false);
        }
      });
    }
    close(code, reason, wasClean) {
      this.readyState = SOCKET_STATES.closed;
      let opts = Object.assign({ code: 1e3, reason: void 0, wasClean: true }, { code, reason, wasClean });
      if (typeof CloseEvent !== "undefined") {
        this.onclose(new CloseEvent("close", opts));
      } else {
        this.onclose(opts);
      }
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
      this.heartbeatTimer = null;
      this.pendingHeartbeatRef = null;
      this.reconnectTimer = new Timer(() => {
        this.teardown(() => this.connect());
      }, this.reconnectAfterMs);
    }
    replaceTransport(newTransport) {
      this.disconnect();
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
      this.connectClock++;
      if (params) {
        console && console.log("passing params to connect is deprecated. Instead pass :params to the Socket constructor");
        this.params = closure(params);
      }
      if (this.conn) {
        return;
      }
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
        this.abnormalClose("heartbeat timeout");
      }
    }
    resetHeartbeat() {
      if (this.conn && this.conn.skipHeartbeat) {
        return;
      }
      this.pendingHeartbeatRef = null;
      clearTimeout(this.heartbeatTimer);
      setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
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
      clearTimeout(this.heartbeatTimer);
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
      this.heartbeatTimer = setTimeout(() => this.heartbeatTimeout(), this.heartbeatIntervalMs);
    }
    abnormalClose(reason) {
      this.closeWasClean = false;
      if (this.isConnected()) {
        this.conn.close(WS_CLOSE_NORMAL, reason);
      }
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
          clearTimeout(this.heartbeatTimer);
          this.pendingHeartbeatRef = null;
          setTimeout(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
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
  var RELOAD_JITTER_MIN = 1e3;
  var RELOAD_JITTER_MAX = 3e3;
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
      if (el.matches(`[${binding}]`)) {
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
      return cids.reduce((acc, cid) => {
        let selector = `[${PHX_COMPONENT}="${cid}"] [${PHX_COMPONENT}]`;
        this.filterWithinSameLiveView(this.all(node, selector), node).map((el) => parseInt(el.getAttribute(PHX_COMPONENT))).forEach((childCID) => acc.delete(childCID));
        return acc;
      }, initial);
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
      let { prefix, suffix } = titleEl.dataset;
      document.title = `${prefix || ""}${str}${suffix || ""}`;
    },
    debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, callback) {
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
              setTimeout(() => this.triggerCycle(el, DEBOUNCE_TRIGGER), timeout);
            }
          } else {
            setTimeout(() => this.triggerCycle(el, DEBOUNCE_TRIGGER, currentCycle), timeout);
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
      let input = field && container.querySelector(`[id="${field}"], [name="${field}"]`);
      if (!input) {
        return;
      }
      if (!(this.private(input, PHX_HAS_FOCUSED) || this.private(input.form, PHX_HAS_SUBMITTED))) {
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
        entry.name = file.name || entry.ref;
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
            if (dom_default.isIgnored(fromEl, phxUpdate)) {
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
            if (isFocusedFormEl) {
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
        liveSocket2.disconnect();
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
          _target = _target || (sourceEl instanceof HTMLInputElement ? sourceEl.name : void 0);
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
    constructor(el, liveSocket2, parentView, flash) {
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
          params: this.connectParams(),
          session: this.getSession(),
          static: this.getStatic(),
          flash: this.flash
        };
      });
      this.showLoader(this.liveSocket.loaderTimeout);
      this.bindChannel();
    }
    setHref(href) {
      this.href = href;
    }
    setRedirect(href) {
      this.redirect = true;
      this.href = href;
    }
    isMain() {
      return this.el.getAttribute(PHX_MAIN) !== null;
    }
    connectParams() {
      let params = this.liveSocket.params(this.el);
      let manifest = dom_default.all(document, `[${this.binding(PHX_TRACK_STATIC)}]`).map((node) => node.src || node.href).filter((url) => typeof url === "string");
      if (manifest.length > 0) {
        params["_track_static"] = manifest;
      }
      params["_mounts"] = this.joinCount;
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
    hideLoader() {
      clearTimeout(this.loaderTimer);
      this.setContainerClasses(PHX_CONNECTED_CLASS);
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
      if (title) {
        dom_default.putTitle(title);
      }
      callback({ diff, reply, events });
      return reply;
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
    applyJoinPatch(live_patch, html, events) {
      this.attachTrueDocEl();
      let patch = new DOMPatch(this, this.el, this.id, html, null);
      patch.markPrunableContentForRemoval();
      this.performPatch(patch, false);
      this.joinNewChildren();
      dom_default.all(this.el, `[${this.binding(PHX_HOOK)}], [data-phx-${PHX_HOOK}]`, (hookEl) => {
        let hook = this.addHook(hookEl);
        if (hook) {
          hook.__mounted();
        }
      });
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
    performPatch(patch, pruneCids) {
      let removedEls = [];
      let phxChildrenAdded = false;
      let updatedHookIds = /* @__PURE__ */ new Set();
      patch.after("added", (el) => {
        this.liveSocket.triggerDOM("onNodeAdded", [el]);
        let newHook = this.addHook(el);
        if (newHook) {
          newHook.__mounted();
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
      if (this.isJoinPending() || this.liveSocket.hasPendingLink() && !dom_default.isPhxSticky(this.el)) {
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
      for (let id in this.root.children[this.id]) {
        this.getChildById(id).destroy();
      }
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
    join(callback) {
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
      return this.liveSocket.reloadWithJitter(this);
    }
    onClose(reason) {
      if (this.isDestroyed()) {
        return;
      }
      if (this.isJoinPending() && document.visibilityState !== "hidden" || this.liveSocket.hasPendingLink() && reason !== "leave") {
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
      this.log("error", () => ["view crashed", reason]);
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
          if (ref !== null) {
            this.undoRefs(ref);
          }
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
            onLoadingDone();
            onReply(resp, hookReply);
          };
          if (resp.diff) {
            this.liveSocket.requestDOMUpdate(() => {
              let hookReply = this.applyDiff("update", resp.diff, ({ diff, events }) => {
                this.update(diff, events);
              });
              finish(hookReply);
            });
          } else {
            finish(null);
          }
        });
      });
    }
    undoRefs(ref) {
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
    pushFormSubmit(formEl, targetCtx, phxEvent, opts, onReply) {
      let filterIgnored = (el) => {
        let userIgnored = closestPhxBinding(el, `${this.binding(PHX_UPDATE)}=ignore`, el.form);
        return !(userIgnored || closestPhxBinding(el, "data-phx-update=ignore", el.form));
      };
      let filterDisables = (el) => {
        return el.hasAttribute(this.binding(PHX_DISABLE_WITH));
      };
      let filterButton = (el) => el.tagName == "BUTTON";
      let filterInput = (el) => ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
      let refGenerator = () => {
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
      };
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
      return el.getAttribute(PHX_PARENT_ID) === this.id || maybe(el.closest(PHX_VIEW_SELECTOR), (node) => node.id) === this.id;
    }
    submitForm(form, targetCtx, phxEvent, opts = {}) {
      dom_default.putPrivate(form, PHX_HAS_SUBMITTED, true);
      let phxFeedback = this.liveSocket.binding(PHX_FEEDBACK_FOR);
      let inputs = Array.from(form.elements);
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
        }
      };
      if (["complete", "loaded", "interactive"].indexOf(document.readyState) >= 0) {
        doConnect();
      } else {
        document.addEventListener("DOMContentLoaded", () => doConnect());
      }
    }
    disconnect(callback) {
      this.socket.disconnect(callback);
    }
    execJS(el, encodedJS, eventType = null) {
      this.owner(el, (view) => js_default.exec(eventType, encodedJS, view, el));
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
          console.log(`simulating ${latency}ms of latency from server to client`);
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
      console.log(`simulating ${latency}ms of latency from client to server`);
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
      view.destroy();
      this.disconnect();
      let minMs = this.reloadJitterMin;
      let maxMs = this.reloadJitterMax;
      let afterMs = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
      let tries = browser_default.updateLocal(this.localStorage, window.location.pathname, CONSECUTIVE_RELOADS, 0, (count) => count + 1);
      log ? log() : this.log(view, "join", () => [`encountered ${tries} consecutive reloads`]);
      if (tries > this.maxReloads) {
        this.log(view, "join", () => [`exceeded ${this.maxReloads} consecutive reloads. Entering failsafe mode`]);
        afterMs = this.failsafeJitter;
      }
      setTimeout(() => {
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
    joinRootViews() {
      let rootsFound = false;
      dom_default.all(document, `${PHX_VIEW_SELECTOR}:not([${PHX_PARENT_ID}])`, (rootEl) => {
        if (!this.getRootById(rootEl.id)) {
          let view = this.newRootView(rootEl);
          view.setHref(this.getHref());
          view.join();
          if (rootEl.getAttribute(PHX_MAIN)) {
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
      this.outgoingMainEl = this.outgoingMainEl || this.main.el;
      let newMainEl = dom_default.cloneNode(this.outgoingMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash);
      this.main.setRedirect(href);
      this.transitionRemoves();
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            dom_default.findPhxSticky(document).forEach((el) => newMainEl.appendChild(el));
            this.outgoingMainEl.replaceWith(newMainEl);
            this.outgoingMainEl = null;
            callback && callback();
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
    newRootView(el, flash) {
      let view = new View(el, this, null, flash);
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
    bindTopLevelEvents() {
      if (this.boundTopLevelEvents) {
        return;
      }
      this.boundTopLevelEvents = true;
      this.socket.onClose((event) => {
        if (event && event.code === 1e3 && this.main) {
          this.reloadWithJitter(this.main);
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
      this.bindNav();
      this.bindClicks();
      this.bindForms();
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
            this.debounce(e.target, e, () => {
              this.withinOwners(e.target, (view) => {
                callback(e, event, view, e.target, targetPhxEvent, null);
              });
            });
          } else {
            dom_default.all(document, `[${windowBinding}]`, (el) => {
              let phxEvent = el.getAttribute(windowBinding);
              this.debounce(el, e, () => {
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
      window.addEventListener("mousedown", (e) => this.clickStartedAtTarget = e.target);
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
          return;
        }
        if (target.getAttribute("href") === "#") {
          e.preventDefault();
        }
        this.debounce(target, e, () => {
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
        let wantsNewTab = e.metaKey || e.ctrlKey || e.button === 1;
        if (!type || !this.isConnected() || !this.main || wantsNewTab) {
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
      this.on("submit", (e) => {
        let phxEvent = e.target.getAttribute(this.binding("submit"));
        if (!phxEvent) {
          return;
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
          this.debounce(input, e, () => {
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
    debounce(el, event, callback) {
      let phxDebounce = this.binding(PHX_DEBOUNCE);
      let phxThrottle = this.binding(PHX_THROTTLE);
      let defaultDebounce = this.defaults.debounce.toString();
      let defaultThrottle = this.defaults.throttle.toString();
      dom_default.debounce(el, event, phxDebounce, defaultDebounce, phxThrottle, defaultThrottle, callback);
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
        cancelTimeout(timer);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9sb2Rhc2gudGhyb3R0bGUvaW5kZXguanMiLCAiLi4vLi4vLi4vYXNzZXRzL3ZlbmRvci90b3BiYXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2h0bWwvcHJpdi9zdGF0aWMvcGhvZW5peF9odG1sLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC91dGlscy5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9wdXNoLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC90aW1lci5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY2hhbm5lbC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvYWpheC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvbG9uZ3BvbGwuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3ByZXNlbmNlLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zZXJpYWxpemVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zb2NrZXQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2VudHJ5X3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3V0aWxzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2Jyb3dzZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3VwbG9hZF9lbnRyeS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2hvb2tzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2RvbV9wb3N0X21vcnBoX3Jlc3RvcmVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL25vZGVfbW9kdWxlcy9tb3JwaGRvbS9kaXN0L21vcnBoZG9tLWVzbS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9kb21fcGF0Y2guanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvcmVuZGVyZWQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvdmlld19ob29rLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2pzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3ZpZXcuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvbGl2ZV9zb2NrZXQuanMiLCAiLi4vLi4vLi4vYXNzZXRzL2pzL2FwcC5qcyIsICIuLi8uLi8uLi9hc3NldHMvanMvanNjb2xvci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxuICogZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gVGhlIHRocm90dGxlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGBcbiAqIG1ldGhvZCB0byBjYW5jZWwgZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG9cbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxuICogc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YFxuICogdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZVxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxuICogcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLnRocm90dGxlYCBhbmQgYF8uZGVib3VuY2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCkpO1xuICpcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7ICd0cmFpbGluZyc6IGZhbHNlIH0pO1xuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIHRocm90dGxlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyB0aHJvdHRsZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRocm90dGxlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwgIi8qKlxuICogQGxpY2Vuc2UgTUlUXG4gKiB0b3BiYXIgMS4wLjAsIDIwMjEtMDEtMDZcbiAqIGh0dHBzOi8vYnV1bmd1eWVuLmdpdGh1Yi5pby90b3BiYXJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBCdXUgTmd1eWVuXG4gKi9cbihmdW5jdGlvbiAod2luZG93LCBkb2N1bWVudCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTU3OTY3MVxuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgdmFyIHZlbmRvcnMgPSBbXCJtc1wiLCBcIm1velwiLCBcIndlYmtpdFwiLCBcIm9cIl07XG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID1cbiAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyBcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXSB8fFxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgIH0sIHRpbWVUb0NhbGwpO1xuICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgfTtcbiAgICBpZiAoIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSlcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgfTtcbiAgfSkoKTtcblxuICB2YXIgY2FudmFzLFxuICAgIHByb2dyZXNzVGltZXJJZCxcbiAgICBmYWRlVGltZXJJZCxcbiAgICBjdXJyZW50UHJvZ3Jlc3MsXG4gICAgc2hvd2luZyxcbiAgICBhZGRFdmVudCA9IGZ1bmN0aW9uIChlbGVtLCB0eXBlLCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyKSBlbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgZWxzZSBpZiAoZWxlbS5hdHRhY2hFdmVudCkgZWxlbS5hdHRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBoYW5kbGVyKTtcbiAgICAgIGVsc2UgZWxlbVtcIm9uXCIgKyB0eXBlXSA9IGhhbmRsZXI7XG4gICAgfSxcbiAgICBvcHRpb25zID0ge1xuICAgICAgYXV0b1J1bjogdHJ1ZSxcbiAgICAgIGJhclRoaWNrbmVzczogMyxcbiAgICAgIGJhckNvbG9yczoge1xuICAgICAgICAwOiBcInJnYmEoMjYsICAxODgsIDE1NiwgLjkpXCIsXG4gICAgICAgIFwiLjI1XCI6IFwicmdiYSg1MiwgIDE1MiwgMjE5LCAuOSlcIixcbiAgICAgICAgXCIuNTBcIjogXCJyZ2JhKDI0MSwgMTk2LCAxNSwgIC45KVwiLFxuICAgICAgICBcIi43NVwiOiBcInJnYmEoMjMwLCAxMjYsIDM0LCAgLjkpXCIsXG4gICAgICAgIFwiMS4wXCI6IFwicmdiYSgyMTEsIDg0LCAgMCwgICAuOSlcIixcbiAgICAgIH0sXG4gICAgICBzaGFkb3dCbHVyOiAxMCxcbiAgICAgIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwgICAwLCAgIDAsICAgLjYpXCIsXG4gICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgfSxcbiAgICByZXBhaW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gb3B0aW9ucy5iYXJUaGlja25lc3MgKiA1OyAvLyBuZWVkIHNwYWNlIGZvciBzaGFkb3dcblxuICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IG9wdGlvbnMuc2hhZG93Qmx1cjtcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9IG9wdGlvbnMuc2hhZG93Q29sb3I7XG5cbiAgICAgIHZhciBsaW5lR3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgY2FudmFzLndpZHRoLCAwKTtcbiAgICAgIGZvciAodmFyIHN0b3AgaW4gb3B0aW9ucy5iYXJDb2xvcnMpXG4gICAgICAgIGxpbmVHcmFkaWVudC5hZGRDb2xvclN0b3Aoc3RvcCwgb3B0aW9ucy5iYXJDb2xvcnNbc3RvcF0pO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IG9wdGlvbnMuYmFyVGhpY2tuZXNzO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygwLCBvcHRpb25zLmJhclRoaWNrbmVzcyAvIDIpO1xuICAgICAgY3R4LmxpbmVUbyhcbiAgICAgICAgTWF0aC5jZWlsKGN1cnJlbnRQcm9ncmVzcyAqIGNhbnZhcy53aWR0aCksXG4gICAgICAgIG9wdGlvbnMuYmFyVGhpY2tuZXNzIC8gMlxuICAgICAgKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGxpbmVHcmFkaWVudDtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9LFxuICAgIGNyZWF0ZUNhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICB2YXIgc3R5bGUgPSBjYW52YXMuc3R5bGU7XG4gICAgICBzdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICAgIHN0eWxlLnRvcCA9IHN0eWxlLmxlZnQgPSBzdHlsZS5yaWdodCA9IHN0eWxlLm1hcmdpbiA9IHN0eWxlLnBhZGRpbmcgPSAwO1xuICAgICAgc3R5bGUuekluZGV4ID0gMTAwMDAxO1xuICAgICAgc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgaWYgKG9wdGlvbnMuY2xhc3NOYW1lKSBjYW52YXMuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICBhZGRFdmVudCh3aW5kb3csIFwicmVzaXplXCIsIHJlcGFpbnQpO1xuICAgIH0sXG4gICAgdG9wYmFyID0ge1xuICAgICAgY29uZmlnOiBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb3B0cylcbiAgICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSBvcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG4gICAgICB9LFxuICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2hvd2luZykgcmV0dXJuO1xuICAgICAgICBzaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKGZhZGVUaW1lcklkICE9PSBudWxsKSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoZmFkZVRpbWVySWQpO1xuICAgICAgICBpZiAoIWNhbnZhcykgY3JlYXRlQ2FudmFzKCk7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHRvcGJhci5wcm9ncmVzcygwKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYXV0b1J1bikge1xuICAgICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgICAgcHJvZ3Jlc3NUaW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgICAgIHRvcGJhci5wcm9ncmVzcyhcbiAgICAgICAgICAgICAgXCIrXCIgKyAwLjA1ICogTWF0aC5wb3coMSAtIE1hdGguc3FydChjdXJyZW50UHJvZ3Jlc3MpLCAyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uICh0bykge1xuICAgICAgICBpZiAodHlwZW9mIHRvID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gY3VycmVudFByb2dyZXNzO1xuICAgICAgICBpZiAodHlwZW9mIHRvID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgdG8gPVxuICAgICAgICAgICAgKHRvLmluZGV4T2YoXCIrXCIpID49IDAgfHwgdG8uaW5kZXhPZihcIi1cIikgPj0gMFxuICAgICAgICAgICAgICA/IGN1cnJlbnRQcm9ncmVzc1xuICAgICAgICAgICAgICA6IDApICsgcGFyc2VGbG9hdCh0byk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFByb2dyZXNzID0gdG8gPiAxID8gMSA6IHRvO1xuICAgICAgICByZXBhaW50KCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvZ3Jlc3M7XG4gICAgICB9LFxuICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXNob3dpbmcpIHJldHVybjtcbiAgICAgICAgc2hvd2luZyA9IGZhbHNlO1xuICAgICAgICBpZiAocHJvZ3Jlc3NUaW1lcklkICE9IG51bGwpIHtcbiAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NUaW1lcklkKTtcbiAgICAgICAgICBwcm9ncmVzc1RpbWVySWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgIGlmICh0b3BiYXIucHJvZ3Jlc3MoXCIrLjFcIikgPj0gMSkge1xuICAgICAgICAgICAgY2FudmFzLnN0eWxlLm9wYWNpdHkgLT0gMC4wNTtcbiAgICAgICAgICAgIGlmIChjYW52YXMuc3R5bGUub3BhY2l0eSA8PSAwLjA1KSB7XG4gICAgICAgICAgICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgIGZhZGVUaW1lcklkID0gbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBmYWRlVGltZXJJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB0b3BiYXI7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRvcGJhcjtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRvcGJhciA9IHRvcGJhcjtcbiAgfVxufS5jYWxsKHRoaXMsIHdpbmRvdywgZG9jdW1lbnQpKTtcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uKCkge1xuICB2YXIgUG9seWZpbGxFdmVudCA9IGV2ZW50Q29uc3RydWN0b3IoKTtcblxuICBmdW5jdGlvbiBldmVudENvbnN0cnVjdG9yKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB3aW5kb3cuQ3VzdG9tRXZlbnQ7XG4gICAgLy8gSUU8PTkgU3VwcG9ydFxuICAgIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZH07XG4gICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgcmV0dXJuIGV2dDtcbiAgICB9XG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcbiAgICByZXR1cm4gQ3VzdG9tRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZEhpZGRlbklucHV0KG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnR5cGUgPSBcImhpZGRlblwiO1xuICAgIGlucHV0Lm5hbWUgPSBuYW1lO1xuICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soZWxlbWVudCwgdGFyZ2V0TW9kaWZpZXJLZXkpIHtcbiAgICB2YXIgdG8gPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdG9cIiksXG4gICAgICAgIG1ldGhvZCA9IGJ1aWxkSGlkZGVuSW5wdXQoXCJfbWV0aG9kXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikpLFxuICAgICAgICBjc3JmID0gYnVpbGRIaWRkZW5JbnB1dChcIl9jc3JmX3Rva2VuXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jc3JmXCIpKSxcbiAgICAgICAgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpLFxuICAgICAgICB0YXJnZXQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcInRhcmdldFwiKTtcblxuICAgIGZvcm0ubWV0aG9kID0gKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikgPT09IFwiZ2V0XCIpID8gXCJnZXRcIiA6IFwicG9zdFwiO1xuICAgIGZvcm0uYWN0aW9uID0gdG87XG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJoaWRkZW5cIjtcblxuICAgIGlmICh0YXJnZXQpIGZvcm0udGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGVsc2UgaWYgKHRhcmdldE1vZGlmaWVyS2V5KSBmb3JtLnRhcmdldCA9IFwiX2JsYW5rXCI7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGNzcmYpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobWV0aG9kKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIGZvcm0uc3VibWl0KCk7XG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IGUudGFyZ2V0O1xuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcblxuICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKSB7XG4gICAgICB2YXIgcGhvZW5peExpbmtFdmVudCA9IG5ldyBQb2x5ZmlsbEV2ZW50KCdwaG9lbml4LmxpbmsuY2xpY2snLCB7XG4gICAgICAgIFwiYnViYmxlc1wiOiB0cnVlLCBcImNhbmNlbGFibGVcIjogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudC5kaXNwYXRjaEV2ZW50KHBob2VuaXhMaW5rRXZlbnQpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSkge1xuICAgICAgICBoYW5kbGVDbGljayhlbGVtZW50LCBlLm1ldGFLZXkgfHwgZS5zaGlmdEtleSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIGZhbHNlKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncGhvZW5peC5saW5rLmNsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgbWVzc2FnZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29uZmlybVwiKTtcbiAgICBpZihtZXNzYWdlICYmICF3aW5kb3cuY29uZmlybShtZXNzYWdlKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSwgZmFsc2UpO1xufSkoKTtcbiIsICIvLyB3cmFwcyB2YWx1ZSBpbiBjbG9zdXJlIG9yIHJldHVybnMgY2xvc3VyZVxuZXhwb3J0IGxldCBjbG9zdXJlID0gKHZhbHVlKSA9PiB7XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICByZXR1cm4gdmFsdWVcbiAgfSBlbHNlIHtcbiAgICBsZXQgY2xvc3VyZSA9IGZ1bmN0aW9uICgpeyByZXR1cm4gdmFsdWUgfVxuICAgIHJldHVybiBjbG9zdXJlXG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgZ2xvYmFsU2VsZiA9IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IG51bGxcbmV4cG9ydCBjb25zdCBwaHhXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogbnVsbFxuZXhwb3J0IGNvbnN0IGdsb2JhbCA9IGdsb2JhbFNlbGYgfHwgcGh4V2luZG93IHx8IGdsb2JhbFxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVlNOID0gXCIyLjAuMFwiXG5leHBvcnQgY29uc3QgU09DS0VUX1NUQVRFUyA9IHtjb25uZWN0aW5nOiAwLCBvcGVuOiAxLCBjbG9zaW5nOiAyLCBjbG9zZWQ6IDN9XG5leHBvcnQgY29uc3QgREVGQVVMVF9USU1FT1VUID0gMTAwMDBcbmV4cG9ydCBjb25zdCBXU19DTE9TRV9OT1JNQUwgPSAxMDAwXG5leHBvcnQgY29uc3QgQ0hBTk5FTF9TVEFURVMgPSB7XG4gIGNsb3NlZDogXCJjbG9zZWRcIixcbiAgZXJyb3JlZDogXCJlcnJvcmVkXCIsXG4gIGpvaW5lZDogXCJqb2luZWRcIixcbiAgam9pbmluZzogXCJqb2luaW5nXCIsXG4gIGxlYXZpbmc6IFwibGVhdmluZ1wiLFxufVxuZXhwb3J0IGNvbnN0IENIQU5ORUxfRVZFTlRTID0ge1xuICBjbG9zZTogXCJwaHhfY2xvc2VcIixcbiAgZXJyb3I6IFwicGh4X2Vycm9yXCIsXG4gIGpvaW46IFwicGh4X2pvaW5cIixcbiAgcmVwbHk6IFwicGh4X3JlcGx5XCIsXG4gIGxlYXZlOiBcInBoeF9sZWF2ZVwiXG59XG5cbmV4cG9ydCBjb25zdCBUUkFOU1BPUlRTID0ge1xuICBsb25ncG9sbDogXCJsb25ncG9sbFwiLFxuICB3ZWJzb2NrZXQ6IFwid2Vic29ja2V0XCJcbn1cbmV4cG9ydCBjb25zdCBYSFJfU1RBVEVTID0ge1xuICBjb21wbGV0ZTogNFxufVxuIiwgIi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIFB1c2hcbiAqIEBwYXJhbSB7Q2hhbm5lbH0gY2hhbm5lbCAtIFRoZSBDaGFubmVsXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgLSBUaGUgZXZlbnQsIGZvciBleGFtcGxlIGBcInBoeF9qb2luXCJgXG4gKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZCAtIFRoZSBwYXlsb2FkLCBmb3IgZXhhbXBsZSBge3VzZXJfaWQ6IDEyM31gXG4gKiBAcGFyYW0ge251bWJlcn0gdGltZW91dCAtIFRoZSBwdXNoIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFB1c2gge1xuICBjb25zdHJ1Y3RvcihjaGFubmVsLCBldmVudCwgcGF5bG9hZCwgdGltZW91dCl7XG4gICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbFxuICAgIHRoaXMuZXZlbnQgPSBldmVudFxuICAgIHRoaXMucGF5bG9hZCA9IHBheWxvYWQgfHwgZnVuY3Rpb24gKCl7IHJldHVybiB7fSB9XG4gICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBudWxsXG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFxuICAgIHRoaXMudGltZW91dFRpbWVyID0gbnVsbFxuICAgIHRoaXMucmVjSG9va3MgPSBbXVxuICAgIHRoaXMuc2VudCA9IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXRcbiAgICovXG4gIHJlc2VuZCh0aW1lb3V0KXtcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgdGhpcy5yZXNldCgpXG4gICAgdGhpcy5zZW5kKClcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKi9cbiAgc2VuZCgpe1xuICAgIGlmKHRoaXMuaGFzUmVjZWl2ZWQoXCJ0aW1lb3V0XCIpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnN0YXJ0VGltZW91dCgpXG4gICAgdGhpcy5zZW50ID0gdHJ1ZVxuICAgIHRoaXMuY2hhbm5lbC5zb2NrZXQucHVzaCh7XG4gICAgICB0b3BpYzogdGhpcy5jaGFubmVsLnRvcGljLFxuICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXG4gICAgICBwYXlsb2FkOiB0aGlzLnBheWxvYWQoKSxcbiAgICAgIHJlZjogdGhpcy5yZWYsXG4gICAgICBqb2luX3JlZjogdGhpcy5jaGFubmVsLmpvaW5SZWYoKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHsqfSBzdGF0dXNcbiAgICogQHBhcmFtIHsqfSBjYWxsYmFja1xuICAgKi9cbiAgcmVjZWl2ZShzdGF0dXMsIGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLmhhc1JlY2VpdmVkKHN0YXR1cykpe1xuICAgICAgY2FsbGJhY2sodGhpcy5yZWNlaXZlZFJlc3AucmVzcG9uc2UpXG4gICAgfVxuXG4gICAgdGhpcy5yZWNIb29rcy5wdXNoKHtzdGF0dXMsIGNhbGxiYWNrfSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZXNldCgpe1xuICAgIHRoaXMuY2FuY2VsUmVmRXZlbnQoKVxuICAgIHRoaXMucmVmID0gbnVsbFxuICAgIHRoaXMucmVmRXZlbnQgPSBudWxsXG4gICAgdGhpcy5yZWNlaXZlZFJlc3AgPSBudWxsXG4gICAgdGhpcy5zZW50ID0gZmFsc2VcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbWF0Y2hSZWNlaXZlKHtzdGF0dXMsIHJlc3BvbnNlLCBfcmVmfSl7XG4gICAgdGhpcy5yZWNIb29rcy5maWx0ZXIoaCA9PiBoLnN0YXR1cyA9PT0gc3RhdHVzKVxuICAgICAgLmZvckVhY2goaCA9PiBoLmNhbGxiYWNrKHJlc3BvbnNlKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuY2VsUmVmRXZlbnQoKXtcbiAgICBpZighdGhpcy5yZWZFdmVudCl7IHJldHVybiB9XG4gICAgdGhpcy5jaGFubmVsLm9mZih0aGlzLnJlZkV2ZW50KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5jZWxUaW1lb3V0KCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dFRpbWVyKVxuICAgIHRoaXMudGltZW91dFRpbWVyID0gbnVsbFxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBzdGFydFRpbWVvdXQoKXtcbiAgICBpZih0aGlzLnRpbWVvdXRUaW1lcil7IHRoaXMuY2FuY2VsVGltZW91dCgpIH1cbiAgICB0aGlzLnJlZiA9IHRoaXMuY2hhbm5lbC5zb2NrZXQubWFrZVJlZigpXG4gICAgdGhpcy5yZWZFdmVudCA9IHRoaXMuY2hhbm5lbC5yZXBseUV2ZW50TmFtZSh0aGlzLnJlZilcblxuICAgIHRoaXMuY2hhbm5lbC5vbih0aGlzLnJlZkV2ZW50LCBwYXlsb2FkID0+IHtcbiAgICAgIHRoaXMuY2FuY2VsUmVmRXZlbnQoKVxuICAgICAgdGhpcy5jYW5jZWxUaW1lb3V0KClcbiAgICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gcGF5bG9hZFxuICAgICAgdGhpcy5tYXRjaFJlY2VpdmUocGF5bG9hZClcbiAgICB9KVxuXG4gICAgdGhpcy50aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudHJpZ2dlcihcInRpbWVvdXRcIiwge30pXG4gICAgfSwgdGhpcy50aW1lb3V0KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBoYXNSZWNlaXZlZChzdGF0dXMpe1xuICAgIHJldHVybiB0aGlzLnJlY2VpdmVkUmVzcCAmJiB0aGlzLnJlY2VpdmVkUmVzcC5zdGF0dXMgPT09IHN0YXR1c1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyKHN0YXR1cywgcmVzcG9uc2Upe1xuICAgIHRoaXMuY2hhbm5lbC50cmlnZ2VyKHRoaXMucmVmRXZlbnQsIHtzdGF0dXMsIHJlc3BvbnNlfSlcbiAgfVxufVxuIiwgIi8qKlxuICpcbiAqIENyZWF0ZXMgYSB0aW1lciB0aGF0IGFjY2VwdHMgYSBgdGltZXJDYWxjYCBmdW5jdGlvbiB0byBwZXJmb3JtXG4gKiBjYWxjdWxhdGVkIHRpbWVvdXQgcmV0cmllcywgc3VjaCBhcyBleHBvbmVudGlhbCBiYWNrb2ZmLlxuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgcmVjb25uZWN0VGltZXIgPSBuZXcgVGltZXIoKCkgPT4gdGhpcy5jb25uZWN0KCksIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgcmV0dXJuIFsxMDAwLCA1MDAwLCAxMDAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICogfSlcbiAqIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDEwMDBcbiAqIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDUwMDBcbiAqIHJlY29ubmVjdFRpbWVyLnJlc2V0KClcbiAqIHJlY29ubmVjdFRpbWVyLnNjaGVkdWxlVGltZW91dCgpIC8vIGZpcmVzIGFmdGVyIDEwMDBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHBhcmFtIHtGdW5jdGlvbn0gdGltZXJDYWxjXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2ssIHRpbWVyQ2FsYyl7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgdGhpcy50aW1lckNhbGMgPSB0aW1lckNhbGNcbiAgICB0aGlzLnRpbWVyID0gbnVsbFxuICAgIHRoaXMudHJpZXMgPSAwXG4gIH1cblxuICByZXNldCgpe1xuICAgIHRoaXMudHJpZXMgPSAwXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZXIpXG4gIH1cblxuICAvKipcbiAgICogQ2FuY2VscyBhbnkgcHJldmlvdXMgc2NoZWR1bGVUaW1lb3V0IGFuZCBzY2hlZHVsZXMgY2FsbGJhY2tcbiAgICovXG4gIHNjaGVkdWxlVGltZW91dCgpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxuXG4gICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmllcyA9IHRoaXMudHJpZXMgKyAxXG4gICAgICB0aGlzLmNhbGxiYWNrKClcbiAgICB9LCB0aGlzLnRpbWVyQ2FsYyh0aGlzLnRyaWVzICsgMSkpXG4gIH1cbn1cbiIsICJpbXBvcnQge2Nsb3N1cmV9IGZyb20gXCIuL3V0aWxzXCJcbmltcG9ydCB7XG4gIENIQU5ORUxfRVZFTlRTLFxuICBDSEFOTkVMX1NUQVRFUyxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IFB1c2ggZnJvbSBcIi4vcHVzaFwiXG5pbXBvcnQgVGltZXIgZnJvbSBcIi4vdGltZXJcIlxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9waWNcbiAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbil9IHBhcmFtc1xuICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaGFubmVsIHtcbiAgY29uc3RydWN0b3IodG9waWMsIHBhcmFtcywgc29ja2V0KXtcbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuY2xvc2VkXG4gICAgdGhpcy50b3BpYyA9IHRvcGljXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKHBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldFxuICAgIHRoaXMuYmluZGluZ3MgPSBbXVxuICAgIHRoaXMuYmluZGluZ1JlZiA9IDBcbiAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLnNvY2tldC50aW1lb3V0XG4gICAgdGhpcy5qb2luZWRPbmNlID0gZmFsc2VcbiAgICB0aGlzLmpvaW5QdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMuam9pbiwgdGhpcy5wYXJhbXMsIHRoaXMudGltZW91dClcbiAgICB0aGlzLnB1c2hCdWZmZXIgPSBbXVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VSZWZzID0gW11cblxuICAgIHRoaXMucmVqb2luVGltZXIgPSBuZXcgVGltZXIoKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luKCkgfVxuICAgIH0sIHRoaXMuc29ja2V0LnJlam9pbkFmdGVyTXMpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMucHVzaCh0aGlzLnNvY2tldC5vbkVycm9yKCgpID0+IHRoaXMucmVqb2luVGltZXIucmVzZXQoKSkpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZVJlZnMucHVzaCh0aGlzLnNvY2tldC5vbk9wZW4oKCkgPT4ge1xuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICBpZih0aGlzLmlzRXJyb3JlZCgpKXsgdGhpcy5yZWpvaW4oKSB9XG4gICAgfSlcbiAgICApXG4gICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKFwib2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmpvaW5lZFxuICAgICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgICB0aGlzLnB1c2hCdWZmZXIuZm9yRWFjaChwdXNoRXZlbnQgPT4gcHVzaEV2ZW50LnNlbmQoKSlcbiAgICAgIHRoaXMucHVzaEJ1ZmZlciA9IFtdXG4gICAgfSlcbiAgICB0aGlzLmpvaW5QdXNoLnJlY2VpdmUoXCJlcnJvclwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgfVxuICAgIH0pXG4gICAgdGhpcy5vbkNsb3NlKCgpID0+IHtcbiAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYGNsb3NlICR7dGhpcy50b3BpY30gJHt0aGlzLmpvaW5SZWYoKX1gKVxuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmNsb3NlZFxuICAgICAgdGhpcy5zb2NrZXQucmVtb3ZlKHRoaXMpXG4gICAgfSlcbiAgICB0aGlzLm9uRXJyb3IocmVhc29uID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGBlcnJvciAke3RoaXMudG9waWN9YCwgcmVhc29uKVxuICAgICAgaWYodGhpcy5pc0pvaW5pbmcoKSl7IHRoaXMuam9pblB1c2gucmVzZXQoKSB9XG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgfVxuICAgIH0pXG4gICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgdGltZW91dCAke3RoaXMudG9waWN9ICgke3RoaXMuam9pblJlZigpfSlgLCB0aGlzLmpvaW5QdXNoLnRpbWVvdXQpXG4gICAgICBsZXQgbGVhdmVQdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMubGVhdmUsIGNsb3N1cmUoe30pLCB0aGlzLnRpbWVvdXQpXG4gICAgICBsZWF2ZVB1c2guc2VuZCgpXG4gICAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuZXJyb3JlZFxuICAgICAgdGhpcy5qb2luUHVzaC5yZXNldCgpXG4gICAgICBpZih0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpKXsgdGhpcy5yZWpvaW5UaW1lci5zY2hlZHVsZVRpbWVvdXQoKSB9XG4gICAgfSlcbiAgICB0aGlzLm9uKENIQU5ORUxfRVZFTlRTLnJlcGx5LCAocGF5bG9hZCwgcmVmKSA9PiB7XG4gICAgICB0aGlzLnRyaWdnZXIodGhpcy5yZXBseUV2ZW50TmFtZShyZWYpLCBwYXlsb2FkKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogSm9pbiB0aGUgY2hhbm5lbFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHRpbWVvdXRcbiAgICogQHJldHVybnMge1B1c2h9XG4gICAqL1xuICBqb2luKHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIGlmKHRoaXMuam9pbmVkT25jZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cmllZCB0byBqb2luIG11bHRpcGxlIHRpbWVzLiAnam9pbicgY2FuIG9ubHkgYmUgY2FsbGVkIGEgc2luZ2xlIHRpbWUgcGVyIGNoYW5uZWwgaW5zdGFuY2VcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFxuICAgICAgdGhpcy5qb2luZWRPbmNlID0gdHJ1ZVxuICAgICAgdGhpcy5yZWpvaW4oKVxuICAgICAgcmV0dXJuIHRoaXMuam9pblB1c2hcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSG9vayBpbnRvIGNoYW5uZWwgY2xvc2VcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2UoY2FsbGJhY2spe1xuICAgIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMuY2xvc2UsIGNhbGxiYWNrKVxuICB9XG5cbiAgLyoqXG4gICAqIEhvb2sgaW50byBjaGFubmVsIGVycm9yc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25FcnJvcihjYWxsYmFjayl7XG4gICAgcmV0dXJuIHRoaXMub24oQ0hBTk5FTF9FVkVOVFMuZXJyb3IsIHJlYXNvbiA9PiBjYWxsYmFjayhyZWFzb24pKVxuICB9XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgb24gY2hhbm5lbCBldmVudHNcbiAgICpcbiAgICogU3Vic2NyaXB0aW9uIHJldHVybnMgYSByZWYgY291bnRlciwgd2hpY2ggY2FuIGJlIHVzZWQgbGF0ZXIgdG9cbiAgICogdW5zdWJzY3JpYmUgdGhlIGV4YWN0IGV2ZW50IGxpc3RlbmVyXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJlZjEgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fc3R1ZmYpXG4gICAqIGNvbnN0IHJlZjIgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fb3RoZXJfc3R1ZmYpXG4gICAqIGNoYW5uZWwub2ZmKFwiZXZlbnRcIiwgcmVmMSlcbiAgICogLy8gU2luY2UgdW5zdWJzY3JpcHRpb24sIGRvX3N0dWZmIHdvbid0IGZpcmUsXG4gICAqIC8vIHdoaWxlIGRvX290aGVyX3N0dWZmIHdpbGwga2VlcCBmaXJpbmcgb24gdGhlIFwiZXZlbnRcIlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICogQHJldHVybnMge2ludGVnZXJ9IHJlZlxuICAgKi9cbiAgb24oZXZlbnQsIGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5iaW5kaW5nUmVmKytcbiAgICB0aGlzLmJpbmRpbmdzLnB1c2goe2V2ZW50LCByZWYsIGNhbGxiYWNrfSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogVW5zdWJzY3JpYmVzIG9mZiBvZiBjaGFubmVsIGV2ZW50c1xuICAgKlxuICAgKiBVc2UgdGhlIHJlZiByZXR1cm5lZCBmcm9tIGEgY2hhbm5lbC5vbigpIHRvIHVuc3Vic2NyaWJlIG9uZVxuICAgKiBoYW5kbGVyLCBvciBwYXNzIG5vdGhpbmcgZm9yIHRoZSByZWYgdG8gdW5zdWJzY3JpYmUgYWxsXG4gICAqIGhhbmRsZXJzIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIC8vIFVuc3Vic2NyaWJlIHRoZSBkb19zdHVmZiBoYW5kbGVyXG4gICAqIGNvbnN0IHJlZjEgPSBjaGFubmVsLm9uKFwiZXZlbnRcIiwgZG9fc3R1ZmYpXG4gICAqIGNoYW5uZWwub2ZmKFwiZXZlbnRcIiwgcmVmMSlcbiAgICpcbiAgICogLy8gVW5zdWJzY3JpYmUgYWxsIGhhbmRsZXJzIGZyb20gZXZlbnRcbiAgICogY2hhbm5lbC5vZmYoXCJldmVudFwiKVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSByZWZcbiAgICovXG4gIG9mZihldmVudCwgcmVmKXtcbiAgICB0aGlzLmJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5maWx0ZXIoKGJpbmQpID0+IHtcbiAgICAgIHJldHVybiAhKGJpbmQuZXZlbnQgPT09IGV2ZW50ICYmICh0eXBlb2YgcmVmID09PSBcInVuZGVmaW5lZFwiIHx8IHJlZiA9PT0gYmluZC5yZWYpKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhblB1c2goKXsgcmV0dXJuIHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkgJiYgdGhpcy5pc0pvaW5lZCgpIH1cblxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIGBldmVudGAgdG8gcGhvZW5peCB3aXRoIHRoZSBwYXlsb2FkIGBwYXlsb2FkYC5cbiAgICogUGhvZW5peCByZWNlaXZlcyB0aGlzIGluIHRoZSBgaGFuZGxlX2luKGV2ZW50LCBwYXlsb2FkLCBzb2NrZXQpYFxuICAgKiBmdW5jdGlvbi4gaWYgcGhvZW5peCByZXBsaWVzIG9yIGl0IHRpbWVzIG91dCAoZGVmYXVsdCAxMDAwMG1zKSxcbiAgICogdGhlbiBvcHRpb25hbGx5IHRoZSByZXBseSBjYW4gYmUgcmVjZWl2ZWQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNoYW5uZWwucHVzaChcImV2ZW50XCIpXG4gICAqICAgLnJlY2VpdmUoXCJva1wiLCBwYXlsb2FkID0+IGNvbnNvbGUubG9nKFwicGhvZW5peCByZXBsaWVkOlwiLCBwYXlsb2FkKSlcbiAgICogICAucmVjZWl2ZShcImVycm9yXCIsIGVyciA9PiBjb25zb2xlLmxvZyhcInBob2VuaXggZXJyb3JlZFwiLCBlcnIpKVxuICAgKiAgIC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiBjb25zb2xlLmxvZyhcInRpbWVkIG91dCBwdXNoaW5nXCIpKVxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBheWxvYWRcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt0aW1lb3V0XVxuICAgKiBAcmV0dXJucyB7UHVzaH1cbiAgICovXG4gIHB1c2goZXZlbnQsIHBheWxvYWQsIHRpbWVvdXQgPSB0aGlzLnRpbWVvdXQpe1xuICAgIHBheWxvYWQgPSBwYXlsb2FkIHx8IHt9XG4gICAgaWYoIXRoaXMuam9pbmVkT25jZSl7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHRyaWVkIHRvIHB1c2ggJyR7ZXZlbnR9JyB0byAnJHt0aGlzLnRvcGljfScgYmVmb3JlIGpvaW5pbmcuIFVzZSBjaGFubmVsLmpvaW4oKSBiZWZvcmUgcHVzaGluZyBldmVudHNgKVxuICAgIH1cbiAgICBsZXQgcHVzaEV2ZW50ID0gbmV3IFB1c2godGhpcywgZXZlbnQsIGZ1bmN0aW9uICgpeyByZXR1cm4gcGF5bG9hZCB9LCB0aW1lb3V0KVxuICAgIGlmKHRoaXMuY2FuUHVzaCgpKXtcbiAgICAgIHB1c2hFdmVudC5zZW5kKClcbiAgICB9IGVsc2Uge1xuICAgICAgcHVzaEV2ZW50LnN0YXJ0VGltZW91dCgpXG4gICAgICB0aGlzLnB1c2hCdWZmZXIucHVzaChwdXNoRXZlbnQpXG4gICAgfVxuXG4gICAgcmV0dXJuIHB1c2hFdmVudFxuICB9XG5cbiAgLyoqIExlYXZlcyB0aGUgY2hhbm5lbFxuICAgKlxuICAgKiBVbnN1YnNjcmliZXMgZnJvbSBzZXJ2ZXIgZXZlbnRzLCBhbmRcbiAgICogaW5zdHJ1Y3RzIGNoYW5uZWwgdG8gdGVybWluYXRlIG9uIHNlcnZlclxuICAgKlxuICAgKiBUcmlnZ2VycyBvbkNsb3NlKCkgaG9va3NcbiAgICpcbiAgICogVG8gcmVjZWl2ZSBsZWF2ZSBhY2tub3dsZWRnZW1lbnRzLCB1c2UgdGhlIGByZWNlaXZlYFxuICAgKiBob29rIHRvIGJpbmQgdG8gdGhlIHNlcnZlciBhY2ssIGllOlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjaGFubmVsLmxlYXZlKCkucmVjZWl2ZShcIm9rXCIsICgpID0+IGFsZXJ0KFwibGVmdCFcIikgKVxuICAgKlxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHRpbWVvdXRcbiAgICogQHJldHVybnMge1B1c2h9XG4gICAqL1xuICBsZWF2ZSh0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICB0aGlzLmpvaW5QdXNoLmNhbmNlbFRpbWVvdXQoKVxuXG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmxlYXZpbmdcbiAgICBsZXQgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGBsZWF2ZSAke3RoaXMudG9waWN9YClcbiAgICAgIHRoaXMudHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5jbG9zZSwgXCJsZWF2ZVwiKVxuICAgIH1cbiAgICBsZXQgbGVhdmVQdXNoID0gbmV3IFB1c2godGhpcywgQ0hBTk5FTF9FVkVOVFMubGVhdmUsIGNsb3N1cmUoe30pLCB0aW1lb3V0KVxuICAgIGxlYXZlUHVzaC5yZWNlaXZlKFwib2tcIiwgKCkgPT4gb25DbG9zZSgpKVxuICAgICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IG9uQ2xvc2UoKSlcbiAgICBsZWF2ZVB1c2guc2VuZCgpXG4gICAgaWYoIXRoaXMuY2FuUHVzaCgpKXsgbGVhdmVQdXNoLnRyaWdnZXIoXCJva1wiLCB7fSkgfVxuXG4gICAgcmV0dXJuIGxlYXZlUHVzaFxuICB9XG5cbiAgLyoqXG4gICAqIE92ZXJyaWRhYmxlIG1lc3NhZ2UgaG9va1xuICAgKlxuICAgKiBSZWNlaXZlcyBhbGwgZXZlbnRzIGZvciBzcGVjaWFsaXplZCBtZXNzYWdlIGhhbmRsaW5nXG4gICAqIGJlZm9yZSBkaXNwYXRjaGluZyB0byB0aGUgY2hhbm5lbCBjYWxsYmFja3MuXG4gICAqXG4gICAqIE11c3QgcmV0dXJuIHRoZSBwYXlsb2FkLCBtb2RpZmllZCBvciB1bm1vZGlmaWVkXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFxuICAgKiBAcGFyYW0ge09iamVjdH0gcGF5bG9hZFxuICAgKiBAcGFyYW0ge2ludGVnZXJ9IHJlZlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgb25NZXNzYWdlKF9ldmVudCwgcGF5bG9hZCwgX3JlZil7IHJldHVybiBwYXlsb2FkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzTWVtYmVyKHRvcGljLCBldmVudCwgcGF5bG9hZCwgam9pblJlZil7XG4gICAgaWYodGhpcy50b3BpYyAhPT0gdG9waWMpeyByZXR1cm4gZmFsc2UgfVxuXG4gICAgaWYoam9pblJlZiAmJiBqb2luUmVmICE9PSB0aGlzLmpvaW5SZWYoKSl7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBcImRyb3BwaW5nIG91dGRhdGVkIG1lc3NhZ2VcIiwge3RvcGljLCBldmVudCwgcGF5bG9hZCwgam9pblJlZn0pXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGpvaW5SZWYoKXsgcmV0dXJuIHRoaXMuam9pblB1c2gucmVmIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlam9pbih0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICBpZih0aGlzLmlzTGVhdmluZygpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnNvY2tldC5sZWF2ZU9wZW5Ub3BpYyh0aGlzLnRvcGljKVxuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5qb2luaW5nXG4gICAgdGhpcy5qb2luUHVzaC5yZXNlbmQodGltZW91dClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlcihldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luUmVmKXtcbiAgICBsZXQgaGFuZGxlZFBheWxvYWQgPSB0aGlzLm9uTWVzc2FnZShldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luUmVmKVxuICAgIGlmKHBheWxvYWQgJiYgIWhhbmRsZWRQYXlsb2FkKXsgdGhyb3cgbmV3IEVycm9yKFwiY2hhbm5lbCBvbk1lc3NhZ2UgY2FsbGJhY2tzIG11c3QgcmV0dXJuIHRoZSBwYXlsb2FkLCBtb2RpZmllZCBvciB1bm1vZGlmaWVkXCIpIH1cblxuICAgIGxldCBldmVudEJpbmRpbmdzID0gdGhpcy5iaW5kaW5ncy5maWx0ZXIoYmluZCA9PiBiaW5kLmV2ZW50ID09PSBldmVudClcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBldmVudEJpbmRpbmdzLmxlbmd0aDsgaSsrKXtcbiAgICAgIGxldCBiaW5kID0gZXZlbnRCaW5kaW5nc1tpXVxuICAgICAgYmluZC5jYWxsYmFjayhoYW5kbGVkUGF5bG9hZCwgcmVmLCBqb2luUmVmIHx8IHRoaXMuam9pblJlZigpKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVwbHlFdmVudE5hbWUocmVmKXsgcmV0dXJuIGBjaGFuX3JlcGx5XyR7cmVmfWAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNDbG9zZWQoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmNsb3NlZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0Vycm9yZWQoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmVycm9yZWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNKb2luZWQoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmpvaW5lZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc0pvaW5pbmcoKXsgcmV0dXJuIHRoaXMuc3RhdGUgPT09IENIQU5ORUxfU1RBVEVTLmpvaW5pbmcgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNMZWF2aW5nKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5sZWF2aW5nIH1cbn1cbiIsICJpbXBvcnQge1xuICBnbG9iYWwsXG4gIFhIUl9TVEFURVNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheCB7XG5cbiAgc3RhdGljIHJlcXVlc3QobWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICBpZihnbG9iYWwuWERvbWFpblJlcXVlc3Qpe1xuICAgICAgbGV0IHJlcSA9IG5ldyBnbG9iYWwuWERvbWFpblJlcXVlc3QoKSAvLyBJRTgsIElFOVxuICAgICAgdGhpcy54ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCByZXEgPSBuZXcgZ2xvYmFsLlhNTEh0dHBSZXF1ZXN0KCkgLy8gSUU3KywgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgU2FmYXJpXG4gICAgICB0aGlzLnhoclJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBhY2NlcHQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHhkb21haW5SZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjayl7XG4gICAgcmVxLnRpbWVvdXQgPSB0aW1lb3V0XG4gICAgcmVxLm9wZW4obWV0aG9kLCBlbmRQb2ludClcbiAgICByZXEub25sb2FkID0gKCkgPT4ge1xuICAgICAgbGV0IHJlc3BvbnNlID0gdGhpcy5wYXJzZUpTT04ocmVxLnJlc3BvbnNlVGV4dClcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgIH1cbiAgICBpZihvbnRpbWVvdXQpeyByZXEub250aW1lb3V0ID0gb250aW1lb3V0IH1cblxuICAgIC8vIFdvcmsgYXJvdW5kIGJ1ZyBpbiBJRTkgdGhhdCByZXF1aXJlcyBhbiBhdHRhY2hlZCBvbnByb2dyZXNzIGhhbmRsZXJcbiAgICByZXEub25wcm9ncmVzcyA9ICgpID0+IHsgfVxuXG4gICAgcmVxLnNlbmQoYm9keSlcbiAgfVxuXG4gIHN0YXRpYyB4aHJSZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKXtcbiAgICByZXEub3BlbihtZXRob2QsIGVuZFBvaW50LCB0cnVlKVxuICAgIHJlcS50aW1lb3V0ID0gdGltZW91dFxuICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIGFjY2VwdClcbiAgICByZXEub25lcnJvciA9ICgpID0+IHsgY2FsbGJhY2sgJiYgY2FsbGJhY2sobnVsbCkgfVxuICAgIHJlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBpZihyZXEucmVhZHlTdGF0ZSA9PT0gWEhSX1NUQVRFUy5jb21wbGV0ZSAmJiBjYWxsYmFjayl7XG4gICAgICAgIGxldCByZXNwb25zZSA9IHRoaXMucGFyc2VKU09OKHJlcS5yZXNwb25zZVRleHQpXG4gICAgICAgIGNhbGxiYWNrKHJlc3BvbnNlKVxuICAgICAgfVxuICAgIH1cbiAgICBpZihvbnRpbWVvdXQpeyByZXEub250aW1lb3V0ID0gb250aW1lb3V0IH1cblxuICAgIHJlcS5zZW5kKGJvZHkpXG4gIH1cblxuICBzdGF0aWMgcGFyc2VKU09OKHJlc3Ape1xuICAgIGlmKCFyZXNwIHx8IHJlc3AgPT09IFwiXCIpeyByZXR1cm4gbnVsbCB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIEpTT04ucGFyc2UocmVzcClcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgIGNvbnNvbGUgJiYgY29uc29sZS5sb2coXCJmYWlsZWQgdG8gcGFyc2UgSlNPTiByZXNwb25zZVwiLCByZXNwKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgc2VyaWFsaXplKG9iaiwgcGFyZW50S2V5KXtcbiAgICBsZXQgcXVlcnlTdHIgPSBbXVxuICAgIGZvcih2YXIga2V5IGluIG9iail7XG4gICAgICBpZighT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSl7IGNvbnRpbnVlIH1cbiAgICAgIGxldCBwYXJhbUtleSA9IHBhcmVudEtleSA/IGAke3BhcmVudEtleX1bJHtrZXl9XWAgOiBrZXlcbiAgICAgIGxldCBwYXJhbVZhbCA9IG9ialtrZXldXG4gICAgICBpZih0eXBlb2YgcGFyYW1WYWwgPT09IFwib2JqZWN0XCIpe1xuICAgICAgICBxdWVyeVN0ci5wdXNoKHRoaXMuc2VyaWFsaXplKHBhcmFtVmFsLCBwYXJhbUtleSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeVN0ci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwYXJhbUtleSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbVZhbCkpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBxdWVyeVN0ci5qb2luKFwiJlwiKVxuICB9XG5cbiAgc3RhdGljIGFwcGVuZFBhcmFtcyh1cmwsIHBhcmFtcyl7XG4gICAgaWYoT2JqZWN0LmtleXMocGFyYW1zKS5sZW5ndGggPT09IDApeyByZXR1cm4gdXJsIH1cblxuICAgIGxldCBwcmVmaXggPSB1cmwubWF0Y2goL1xcPy8pID8gXCImXCIgOiBcIj9cIlxuICAgIHJldHVybiBgJHt1cmx9JHtwcmVmaXh9JHt0aGlzLnNlcmlhbGl6ZShwYXJhbXMpfWBcbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIFNPQ0tFVF9TVEFURVMsXG4gIFRSQU5TUE9SVFNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IEFqYXggZnJvbSBcIi4vYWpheFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvbmdQb2xsIHtcblxuICBjb25zdHJ1Y3RvcihlbmRQb2ludCl7XG4gICAgdGhpcy5lbmRQb2ludCA9IG51bGxcbiAgICB0aGlzLnRva2VuID0gbnVsbFxuICAgIHRoaXMuc2tpcEhlYXJ0YmVhdCA9IHRydWVcbiAgICB0aGlzLm9ub3BlbiA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLm9uZXJyb3IgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5vbmNsb3NlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMucG9sbEVuZHBvaW50ID0gdGhpcy5ub3JtYWxpemVFbmRwb2ludChlbmRQb2ludClcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNvbm5lY3RpbmdcbiAgICB0aGlzLnBvbGwoKVxuICB9XG5cbiAgbm9ybWFsaXplRW5kcG9pbnQoZW5kUG9pbnQpe1xuICAgIHJldHVybiAoZW5kUG9pbnRcbiAgICAgIC5yZXBsYWNlKFwid3M6Ly9cIiwgXCJodHRwOi8vXCIpXG4gICAgICAucmVwbGFjZShcIndzczovL1wiLCBcImh0dHBzOi8vXCIpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKFwiKC4qKVxcL1wiICsgVFJBTlNQT1JUUy53ZWJzb2NrZXQpLCBcIiQxL1wiICsgVFJBTlNQT1JUUy5sb25ncG9sbCkpXG4gIH1cblxuICBlbmRwb2ludFVSTCgpe1xuICAgIHJldHVybiBBamF4LmFwcGVuZFBhcmFtcyh0aGlzLnBvbGxFbmRwb2ludCwge3Rva2VuOiB0aGlzLnRva2VufSlcbiAgfVxuXG4gIGNsb3NlQW5kUmV0cnkoY29kZSwgcmVhc29uLCB3YXNDbGVhbil7XG4gICAgdGhpcy5jbG9zZShjb2RlLCByZWFzb24sIHdhc0NsZWFuKVxuICAgIHRoaXMucmVhZHlTdGF0ZSA9IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZ1xuICB9XG5cbiAgb250aW1lb3V0KCl7XG4gICAgdGhpcy5vbmVycm9yKFwidGltZW91dFwiKVxuICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDA1LCBcInRpbWVvdXRcIiwgZmFsc2UpXG4gIH1cblxuICBwb2xsKCl7XG4gICAgaWYoISh0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMub3BlbiB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFNPQ0tFVF9TVEFURVMuY29ubmVjdGluZykpeyByZXR1cm4gfVxuXG4gICAgQWpheC5yZXF1ZXN0KFwiR0VUXCIsIHRoaXMuZW5kcG9pbnRVUkwoKSwgXCJhcHBsaWNhdGlvbi9qc29uXCIsIG51bGwsIHRoaXMudGltZW91dCwgdGhpcy5vbnRpbWVvdXQuYmluZCh0aGlzKSwgKHJlc3ApID0+IHtcbiAgICAgIGlmKHJlc3Ape1xuICAgICAgICB2YXIge3N0YXR1cywgdG9rZW4sIG1lc3NhZ2VzfSA9IHJlc3BcbiAgICAgICAgdGhpcy50b2tlbiA9IHRva2VuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGF0dXMgPSAwXG4gICAgICB9XG5cbiAgICAgIHN3aXRjaChzdGF0dXMpe1xuICAgICAgICBjYXNlIDIwMDpcbiAgICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB7XG4gICAgICAgICAgICAvLyBUYXNrcyBhcmUgd2hhdCB0aGluZ3MgbGlrZSBldmVudCBoYW5kbGVycywgc2V0VGltZW91dCBjYWxsYmFja3MsXG4gICAgICAgICAgICAvLyBwcm9taXNlIHJlc29sdmVzIGFuZCBtb3JlIGFyZSBydW4gd2l0aGluLlxuICAgICAgICAgICAgLy8gSW4gbW9kZXJuIGJyb3dzZXJzLCB0aGVyZSBhcmUgdHdvIGRpZmZlcmVudCBraW5kcyBvZiB0YXNrcyxcbiAgICAgICAgICAgIC8vIG1pY3JvdGFza3MgYW5kIG1hY3JvdGFza3MuXG4gICAgICAgICAgICAvLyBNaWNyb3Rhc2tzIGFyZSBtYWlubHkgdXNlZCBmb3IgUHJvbWlzZXMsIHdoaWxlIG1hY3JvdGFza3MgYXJlXG4gICAgICAgICAgICAvLyB1c2VkIGZvciBldmVyeXRoaW5nIGVsc2UuXG4gICAgICAgICAgICAvLyBNaWNyb3Rhc2tzIGFsd2F5cyBoYXZlIHByaW9yaXR5IG92ZXIgbWFjcm90YXNrcy4gSWYgdGhlIEpTIGVuZ2luZVxuICAgICAgICAgICAgLy8gaXMgbG9va2luZyBmb3IgYSB0YXNrIHRvIHJ1biwgaXQgd2lsbCBhbHdheXMgdHJ5IHRvIGVtcHR5IHRoZVxuICAgICAgICAgICAgLy8gbWljcm90YXNrIHF1ZXVlIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHJ1biBhbnl0aGluZyBmcm9tIHRoZVxuICAgICAgICAgICAgLy8gbWFjcm90YXNrIHF1ZXVlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEZvciB0aGUgV2ViU29ja2V0IHRyYW5zcG9ydCwgbWVzc2FnZXMgYWx3YXlzIGFycml2ZSBpbiB0aGVpciBvd25cbiAgICAgICAgICAgIC8vIGV2ZW50LiBUaGlzIG1lYW5zIHRoYXQgaWYgYW55IHByb21pc2VzIGFyZSByZXNvbHZlZCBmcm9tIHdpdGhpbixcbiAgICAgICAgICAgIC8vIHRoZWlyIGNhbGxiYWNrcyB3aWxsIGFsd2F5cyBmaW5pc2ggZXhlY3V0aW9uIGJ5IHRoZSB0aW1lIHRoZVxuICAgICAgICAgICAgLy8gbmV4dCBtZXNzYWdlIGV2ZW50IGhhbmRsZXIgaXMgcnVuLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIEluIG9yZGVyIHRvIGVtdWxhdGUgdGhpcyBiZWhhdmlvdXIsIHdlIG5lZWQgdG8gbWFrZSBzdXJlIGVhY2hcbiAgICAgICAgICAgIC8vIG9ubWVzc2FnZSBoYW5kbGVyIGlzIHJ1biB3aXRoaW4gaXQncyBvd24gbWFjcm90YXNrLlxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMub25tZXNzYWdlKHtkYXRhOiBtc2d9KVxuICAgICAgICAgICAgfSwgMClcbiAgICAgICAgICB9KVxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyMDQ6XG4gICAgICAgICAgdGhpcy5wb2xsKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQxMDpcbiAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLm9wZW5cbiAgICAgICAgICB0aGlzLm9ub3Blbih7fSlcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDAzOlxuICAgICAgICAgIHRoaXMub25lcnJvcig0MDMpXG4gICAgICAgICAgdGhpcy5jbG9zZSgxMDA4LCBcImZvcmJpZGRlblwiLCBmYWxzZSlcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgIHRoaXMub25lcnJvcig1MDApXG4gICAgICAgICAgdGhpcy5jbG9zZUFuZFJldHJ5KDEwMTEsIFwiaW50ZXJuYWwgc2VydmVyIGVycm9yXCIsIDUwMClcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYHVuaGFuZGxlZCBwb2xsIHN0YXR1cyAke3N0YXR1c31gKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzZW5kKGJvZHkpe1xuICAgIEFqYXgucmVxdWVzdChcIlBPU1RcIiwgdGhpcy5lbmRwb2ludFVSTCgpLCBcImFwcGxpY2F0aW9uL2pzb25cIiwgYm9keSwgdGhpcy50aW1lb3V0LCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzLCBcInRpbWVvdXRcIiksIChyZXNwKSA9PiB7XG4gICAgICBpZighcmVzcCB8fCByZXNwLnN0YXR1cyAhPT0gMjAwKXtcbiAgICAgICAgdGhpcy5vbmVycm9yKHJlc3AgJiYgcmVzcC5zdGF0dXMpXG4gICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgxMDExLCBcImludGVybmFsIHNlcnZlciBlcnJvclwiLCBmYWxzZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgY2xvc2UoY29kZSwgcmVhc29uLCB3YXNDbGVhbil7XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jbG9zZWRcbiAgICBsZXQgb3B0cyA9IE9iamVjdC5hc3NpZ24oe2NvZGU6IDEwMDAsIHJlYXNvbjogdW5kZWZpbmVkLCB3YXNDbGVhbjogdHJ1ZX0sIHtjb2RlLCByZWFzb24sIHdhc0NsZWFufSlcbiAgICBpZih0eXBlb2YoQ2xvc2VFdmVudCkgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgdGhpcy5vbmNsb3NlKG5ldyBDbG9zZUV2ZW50KFwiY2xvc2VcIiwgb3B0cykpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub25jbG9zZShvcHRzKVxuICAgIH1cbiAgfVxufVxuIiwgIi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIFByZXNlbmNlXG4gKiBAcGFyYW0ge0NoYW5uZWx9IGNoYW5uZWwgLSBUaGUgQ2hhbm5lbFxuICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBUaGUgb3B0aW9ucyxcbiAqICAgICAgICBmb3IgZXhhbXBsZSBge2V2ZW50czoge3N0YXRlOiBcInN0YXRlXCIsIGRpZmY6IFwiZGlmZlwifX1gXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByZXNlbmNlIHtcblxuICBjb25zdHJ1Y3RvcihjaGFubmVsLCBvcHRzID0ge30pe1xuICAgIGxldCBldmVudHMgPSBvcHRzLmV2ZW50cyB8fCB7c3RhdGU6IFwicHJlc2VuY2Vfc3RhdGVcIiwgZGlmZjogXCJwcmVzZW5jZV9kaWZmXCJ9XG4gICAgdGhpcy5zdGF0ZSA9IHt9XG4gICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXVxuICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWxcbiAgICB0aGlzLmpvaW5SZWYgPSBudWxsXG4gICAgdGhpcy5jYWxsZXIgPSB7XG4gICAgICBvbkpvaW46IGZ1bmN0aW9uICgpeyB9LFxuICAgICAgb25MZWF2ZTogZnVuY3Rpb24gKCl7IH0sXG4gICAgICBvblN5bmM6IGZ1bmN0aW9uICgpeyB9XG4gICAgfVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKGV2ZW50cy5zdGF0ZSwgbmV3U3RhdGUgPT4ge1xuICAgICAgbGV0IHtvbkpvaW4sIG9uTGVhdmUsIG9uU3luY30gPSB0aGlzLmNhbGxlclxuXG4gICAgICB0aGlzLmpvaW5SZWYgPSB0aGlzLmNoYW5uZWwuam9pblJlZigpXG4gICAgICB0aGlzLnN0YXRlID0gUHJlc2VuY2Uuc3luY1N0YXRlKHRoaXMuc3RhdGUsIG5ld1N0YXRlLCBvbkpvaW4sIG9uTGVhdmUpXG5cbiAgICAgIHRoaXMucGVuZGluZ0RpZmZzLmZvckVhY2goZGlmZiA9PiB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jRGlmZih0aGlzLnN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpXG4gICAgICB9KVxuICAgICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXVxuICAgICAgb25TeW5jKClcbiAgICB9KVxuXG4gICAgdGhpcy5jaGFubmVsLm9uKGV2ZW50cy5kaWZmLCBkaWZmID0+IHtcbiAgICAgIGxldCB7b25Kb2luLCBvbkxlYXZlLCBvblN5bmN9ID0gdGhpcy5jYWxsZXJcblxuICAgICAgaWYodGhpcy5pblBlbmRpbmdTeW5jU3RhdGUoKSl7XG4gICAgICAgIHRoaXMucGVuZGluZ0RpZmZzLnB1c2goZGlmZilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcmVzZW5jZS5zeW5jRGlmZih0aGlzLnN0YXRlLCBkaWZmLCBvbkpvaW4sIG9uTGVhdmUpXG4gICAgICAgIG9uU3luYygpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIG9uSm9pbihjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uSm9pbiA9IGNhbGxiYWNrIH1cblxuICBvbkxlYXZlKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25MZWF2ZSA9IGNhbGxiYWNrIH1cblxuICBvblN5bmMoY2FsbGJhY2speyB0aGlzLmNhbGxlci5vblN5bmMgPSBjYWxsYmFjayB9XG5cbiAgbGlzdChieSl7IHJldHVybiBQcmVzZW5jZS5saXN0KHRoaXMuc3RhdGUsIGJ5KSB9XG5cbiAgaW5QZW5kaW5nU3luY1N0YXRlKCl7XG4gICAgcmV0dXJuICF0aGlzLmpvaW5SZWYgfHwgKHRoaXMuam9pblJlZiAhPT0gdGhpcy5jaGFubmVsLmpvaW5SZWYoKSlcbiAgfVxuXG4gIC8vIGxvd2VyLWxldmVsIHB1YmxpYyBzdGF0aWMgQVBJXG5cbiAgLyoqXG4gICAqIFVzZWQgdG8gc3luYyB0aGUgbGlzdCBvZiBwcmVzZW5jZXMgb24gdGhlIHNlcnZlclxuICAgKiB3aXRoIHRoZSBjbGllbnQncyBzdGF0ZS4gQW4gb3B0aW9uYWwgYG9uSm9pbmAgYW5kIGBvbkxlYXZlYCBjYWxsYmFjayBjYW5cbiAgICogYmUgcHJvdmlkZWQgdG8gcmVhY3QgdG8gY2hhbmdlcyBpbiB0aGUgY2xpZW50J3MgbG9jYWwgcHJlc2VuY2VzIGFjcm9zc1xuICAgKiBkaXNjb25uZWN0cyBhbmQgcmVjb25uZWN0cyB3aXRoIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBzeW5jU3RhdGUoY3VycmVudFN0YXRlLCBuZXdTdGF0ZSwgb25Kb2luLCBvbkxlYXZlKXtcbiAgICBsZXQgc3RhdGUgPSB0aGlzLmNsb25lKGN1cnJlbnRTdGF0ZSlcbiAgICBsZXQgam9pbnMgPSB7fVxuICAgIGxldCBsZWF2ZXMgPSB7fVxuXG4gICAgdGhpcy5tYXAoc3RhdGUsIChrZXksIHByZXNlbmNlKSA9PiB7XG4gICAgICBpZighbmV3U3RhdGVba2V5XSl7XG4gICAgICAgIGxlYXZlc1trZXldID0gcHJlc2VuY2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMubWFwKG5ld1N0YXRlLCAoa2V5LCBuZXdQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZSl7XG4gICAgICAgIGxldCBuZXdSZWZzID0gbmV3UHJlc2VuY2UubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgICBsZXQgY3VyUmVmcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5tYXAobSA9PiBtLnBoeF9yZWYpXG4gICAgICAgIGxldCBqb2luZWRNZXRhcyA9IG5ld1ByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IGN1clJlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgbGV0IGxlZnRNZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBuZXdSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIGlmKGpvaW5lZE1ldGFzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIGpvaW5zW2tleV0gPSBuZXdQcmVzZW5jZVxuICAgICAgICAgIGpvaW5zW2tleV0ubWV0YXMgPSBqb2luZWRNZXRhc1xuICAgICAgICB9XG4gICAgICAgIGlmKGxlZnRNZXRhcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICBsZWF2ZXNba2V5XSA9IHRoaXMuY2xvbmUoY3VycmVudFByZXNlbmNlKVxuICAgICAgICAgIGxlYXZlc1trZXldLm1ldGFzID0gbGVmdE1ldGFzXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpvaW5zW2tleV0gPSBuZXdQcmVzZW5jZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuc3luY0RpZmYoc3RhdGUsIHtqb2luczogam9pbnMsIGxlYXZlczogbGVhdmVzfSwgb25Kb2luLCBvbkxlYXZlKVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIFVzZWQgdG8gc3luYyBhIGRpZmYgb2YgcHJlc2VuY2Ugam9pbiBhbmQgbGVhdmVcbiAgICogZXZlbnRzIGZyb20gdGhlIHNlcnZlciwgYXMgdGhleSBoYXBwZW4uIExpa2UgYHN5bmNTdGF0ZWAsIGBzeW5jRGlmZmBcbiAgICogYWNjZXB0cyBvcHRpb25hbCBgb25Kb2luYCBhbmQgYG9uTGVhdmVgIGNhbGxiYWNrcyB0byByZWFjdCB0byBhIHVzZXJcbiAgICogam9pbmluZyBvciBsZWF2aW5nIGZyb20gYSBkZXZpY2UuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcmVzZW5jZX1cbiAgICovXG4gIHN0YXRpYyBzeW5jRGlmZihzdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKXtcbiAgICBsZXQge2pvaW5zLCBsZWF2ZXN9ID0gdGhpcy5jbG9uZShkaWZmKVxuICAgIGlmKCFvbkpvaW4peyBvbkpvaW4gPSBmdW5jdGlvbiAoKXsgfSB9XG4gICAgaWYoIW9uTGVhdmUpeyBvbkxlYXZlID0gZnVuY3Rpb24gKCl7IH0gfVxuXG4gICAgdGhpcy5tYXAoam9pbnMsIChrZXksIG5ld1ByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgc3RhdGVba2V5XSA9IHRoaXMuY2xvbmUobmV3UHJlc2VuY2UpXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2Upe1xuICAgICAgICBsZXQgam9pbmVkUmVmcyA9IHN0YXRlW2tleV0ubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgICBsZXQgY3VyTWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gam9pbmVkUmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBzdGF0ZVtrZXldLm1ldGFzLnVuc2hpZnQoLi4uY3VyTWV0YXMpXG4gICAgICB9XG4gICAgICBvbkpvaW4oa2V5LCBjdXJyZW50UHJlc2VuY2UsIG5ld1ByZXNlbmNlKVxuICAgIH0pXG4gICAgdGhpcy5tYXAobGVhdmVzLCAoa2V5LCBsZWZ0UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBpZighY3VycmVudFByZXNlbmNlKXsgcmV0dXJuIH1cbiAgICAgIGxldCByZWZzVG9SZW1vdmUgPSBsZWZ0UHJlc2VuY2UubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgY3VycmVudFByZXNlbmNlLm1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihwID0+IHtcbiAgICAgICAgcmV0dXJuIHJlZnNUb1JlbW92ZS5pbmRleE9mKHAucGh4X3JlZikgPCAwXG4gICAgICB9KVxuICAgICAgb25MZWF2ZShrZXksIGN1cnJlbnRQcmVzZW5jZSwgbGVmdFByZXNlbmNlKVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlLm1ldGFzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGRlbGV0ZSBzdGF0ZVtrZXldXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gc3RhdGVcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcmVzZW5jZXMsIHdpdGggc2VsZWN0ZWQgbWV0YWRhdGEuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcmVzZW5jZXNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2hvb3NlclxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJlc2VuY2V9XG4gICAqL1xuICBzdGF0aWMgbGlzdChwcmVzZW5jZXMsIGNob29zZXIpe1xuICAgIGlmKCFjaG9vc2VyKXsgY2hvb3NlciA9IGZ1bmN0aW9uIChrZXksIHByZXMpeyByZXR1cm4gcHJlcyB9IH1cblxuICAgIHJldHVybiB0aGlzLm1hcChwcmVzZW5jZXMsIChrZXksIHByZXNlbmNlKSA9PiB7XG4gICAgICByZXR1cm4gY2hvb3NlcihrZXksIHByZXNlbmNlKVxuICAgIH0pXG4gIH1cblxuICAvLyBwcml2YXRlXG5cbiAgc3RhdGljIG1hcChvYmosIGZ1bmMpe1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLm1hcChrZXkgPT4gZnVuYyhrZXksIG9ialtrZXldKSlcbiAgfVxuXG4gIHN0YXRpYyBjbG9uZShvYmopeyByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKSB9XG59XG4iLCAiLyogVGhlIGRlZmF1bHQgc2VyaWFsaXplciBmb3IgZW5jb2RpbmcgYW5kIGRlY29kaW5nIG1lc3NhZ2VzICovXG5pbXBvcnQge1xuICBDSEFOTkVMX0VWRU5UU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIEhFQURFUl9MRU5HVEg6IDEsXG4gIE1FVEFfTEVOR1RIOiA0LFxuICBLSU5EUzoge3B1c2g6IDAsIHJlcGx5OiAxLCBicm9hZGNhc3Q6IDJ9LFxuXG4gIGVuY29kZShtc2csIGNhbGxiYWNrKXtcbiAgICBpZihtc2cucGF5bG9hZC5jb25zdHJ1Y3RvciA9PT0gQXJyYXlCdWZmZXIpe1xuICAgICAgcmV0dXJuIGNhbGxiYWNrKHRoaXMuYmluYXJ5RW5jb2RlKG1zZykpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBwYXlsb2FkID0gW21zZy5qb2luX3JlZiwgbXNnLnJlZiwgbXNnLnRvcGljLCBtc2cuZXZlbnQsIG1zZy5wYXlsb2FkXVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKEpTT04uc3RyaW5naWZ5KHBheWxvYWQpKVxuICAgIH1cbiAgfSxcblxuICBkZWNvZGUocmF3UGF5bG9hZCwgY2FsbGJhY2spe1xuICAgIGlmKHJhd1BheWxvYWQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLmJpbmFyeURlY29kZShyYXdQYXlsb2FkKSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IFtqb2luX3JlZiwgcmVmLCB0b3BpYywgZXZlbnQsIHBheWxvYWRdID0gSlNPTi5wYXJzZShyYXdQYXlsb2FkKVxuICAgICAgcmV0dXJuIGNhbGxiYWNrKHtqb2luX3JlZiwgcmVmLCB0b3BpYywgZXZlbnQsIHBheWxvYWR9KVxuICAgIH1cbiAgfSxcblxuICAvLyBwcml2YXRlXG5cbiAgYmluYXJ5RW5jb2RlKG1lc3NhZ2Upe1xuICAgIGxldCB7am9pbl9yZWYsIHJlZiwgZXZlbnQsIHRvcGljLCBwYXlsb2FkfSA9IG1lc3NhZ2VcbiAgICBsZXQgbWV0YUxlbmd0aCA9IHRoaXMuTUVUQV9MRU5HVEggKyBqb2luX3JlZi5sZW5ndGggKyByZWYubGVuZ3RoICsgdG9waWMubGVuZ3RoICsgZXZlbnQubGVuZ3RoXG4gICAgbGV0IGhlYWRlciA9IG5ldyBBcnJheUJ1ZmZlcih0aGlzLkhFQURFUl9MRU5HVEggKyBtZXRhTGVuZ3RoKVxuICAgIGxldCB2aWV3ID0gbmV3IERhdGFWaWV3KGhlYWRlcilcbiAgICBsZXQgb2Zmc2V0ID0gMFxuXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgdGhpcy5LSU5EUy5wdXNoKSAvLyBraW5kXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgam9pbl9yZWYubGVuZ3RoKVxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIHJlZi5sZW5ndGgpXG4gICAgdmlldy5zZXRVaW50OChvZmZzZXQrKywgdG9waWMubGVuZ3RoKVxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGV2ZW50Lmxlbmd0aClcbiAgICBBcnJheS5mcm9tKGpvaW5fcmVmLCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG4gICAgQXJyYXkuZnJvbShyZWYsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcbiAgICBBcnJheS5mcm9tKHRvcGljLCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG4gICAgQXJyYXkuZnJvbShldmVudCwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuXG4gICAgdmFyIGNvbWJpbmVkID0gbmV3IFVpbnQ4QXJyYXkoaGVhZGVyLmJ5dGVMZW5ndGggKyBwYXlsb2FkLmJ5dGVMZW5ndGgpXG4gICAgY29tYmluZWQuc2V0KG5ldyBVaW50OEFycmF5KGhlYWRlciksIDApXG4gICAgY29tYmluZWQuc2V0KG5ldyBVaW50OEFycmF5KHBheWxvYWQpLCBoZWFkZXIuYnl0ZUxlbmd0aClcblxuICAgIHJldHVybiBjb21iaW5lZC5idWZmZXJcbiAgfSxcblxuICBiaW5hcnlEZWNvZGUoYnVmZmVyKXtcbiAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhidWZmZXIpXG4gICAgbGV0IGtpbmQgPSB2aWV3LmdldFVpbnQ4KDApXG4gICAgbGV0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKVxuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgdGhpcy5LSU5EUy5wdXNoOiByZXR1cm4gdGhpcy5kZWNvZGVQdXNoKGJ1ZmZlciwgdmlldywgZGVjb2RlcilcbiAgICAgIGNhc2UgdGhpcy5LSU5EUy5yZXBseTogcmV0dXJuIHRoaXMuZGVjb2RlUmVwbHkoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKVxuICAgICAgY2FzZSB0aGlzLktJTkRTLmJyb2FkY2FzdDogcmV0dXJuIHRoaXMuZGVjb2RlQnJvYWRjYXN0KGJ1ZmZlciwgdmlldywgZGVjb2RlcilcbiAgICB9XG4gIH0sXG5cbiAgZGVjb2RlUHVzaChidWZmZXIsIHZpZXcsIGRlY29kZXIpe1xuICAgIGxldCBqb2luUmVmU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgdG9waWNTaXplID0gdmlldy5nZXRVaW50OCgyKVxuICAgIGxldCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDMpXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuSEVBREVSX0xFTkdUSCArIHRoaXMuTUVUQV9MRU5HVEggLSAxIC8vIHB1c2hlcyBoYXZlIG5vIHJlZlxuICAgIGxldCBqb2luUmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgam9pblJlZlNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGpvaW5SZWZTaXplXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgcmV0dXJuIHtqb2luX3JlZjogam9pblJlZiwgcmVmOiBudWxsLCB0b3BpYzogdG9waWMsIGV2ZW50OiBldmVudCwgcGF5bG9hZDogZGF0YX1cbiAgfSxcblxuICBkZWNvZGVSZXBseShidWZmZXIsIHZpZXcsIGRlY29kZXIpe1xuICAgIGxldCBqb2luUmVmU2l6ZSA9IHZpZXcuZ2V0VWludDgoMSlcbiAgICBsZXQgcmVmU2l6ZSA9IHZpZXcuZ2V0VWludDgoMilcbiAgICBsZXQgdG9waWNTaXplID0gdmlldy5nZXRVaW50OCgzKVxuICAgIGxldCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDQpXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuSEVBREVSX0xFTkdUSCArIHRoaXMuTUVUQV9MRU5HVEhcbiAgICBsZXQgam9pblJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGpvaW5SZWZTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBqb2luUmVmU2l6ZVxuICAgIGxldCByZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyByZWZTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyByZWZTaXplXG4gICAgbGV0IHRvcGljID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgdG9waWNTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyB0b3BpY1NpemVcbiAgICBsZXQgZXZlbnQgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBldmVudFNpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIGV2ZW50U2l6ZVxuICAgIGxldCBkYXRhID0gYnVmZmVyLnNsaWNlKG9mZnNldCwgYnVmZmVyLmJ5dGVMZW5ndGgpXG4gICAgbGV0IHBheWxvYWQgPSB7c3RhdHVzOiBldmVudCwgcmVzcG9uc2U6IGRhdGF9XG4gICAgcmV0dXJuIHtqb2luX3JlZjogam9pblJlZiwgcmVmOiByZWYsIHRvcGljOiB0b3BpYywgZXZlbnQ6IENIQU5ORUxfRVZFTlRTLnJlcGx5LCBwYXlsb2FkOiBwYXlsb2FkfVxuICB9LFxuXG4gIGRlY29kZUJyb2FkY2FzdChidWZmZXIsIHZpZXcsIGRlY29kZXIpe1xuICAgIGxldCB0b3BpY1NpemUgPSB2aWV3LmdldFVpbnQ4KDEpXG4gICAgbGV0IGV2ZW50U2l6ZSA9IHZpZXcuZ2V0VWludDgoMilcbiAgICBsZXQgb2Zmc2V0ID0gdGhpcy5IRUFERVJfTEVOR1RIICsgMlxuICAgIGxldCB0b3BpYyA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHRvcGljU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplXG4gICAgbGV0IGV2ZW50ID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgZXZlbnRTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemVcbiAgICBsZXQgZGF0YSA9IGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKVxuXG4gICAgcmV0dXJuIHtqb2luX3JlZjogbnVsbCwgcmVmOiBudWxsLCB0b3BpYzogdG9waWMsIGV2ZW50OiBldmVudCwgcGF5bG9hZDogZGF0YX1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIGdsb2JhbCxcbiAgcGh4V2luZG93LFxuICBDSEFOTkVMX0VWRU5UUyxcbiAgREVGQVVMVF9USU1FT1VULFxuICBERUZBVUxUX1ZTTixcbiAgU09DS0VUX1NUQVRFUyxcbiAgVFJBTlNQT1JUUyxcbiAgV1NfQ0xPU0VfTk9STUFMXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNsb3N1cmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgQWpheCBmcm9tIFwiLi9hamF4XCJcbmltcG9ydCBDaGFubmVsIGZyb20gXCIuL2NoYW5uZWxcIlxuaW1wb3J0IExvbmdQb2xsIGZyb20gXCIuL2xvbmdwb2xsXCJcbmltcG9ydCBTZXJpYWxpemVyIGZyb20gXCIuL3NlcmlhbGl6ZXJcIlxuaW1wb3J0IFRpbWVyIGZyb20gXCIuL3RpbWVyXCJcblxuLyoqIEluaXRpYWxpemVzIHRoZSBTb2NrZXQgKlxuICpcbiAqIEZvciBJRTggc3VwcG9ydCB1c2UgYW4gRVM1LXNoaW0gKGh0dHBzOi8vZ2l0aHViLmNvbS9lcy1zaGltcy9lczUtc2hpbSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZW5kUG9pbnQgLSBUaGUgc3RyaW5nIFdlYlNvY2tldCBlbmRwb2ludCwgaWUsIGBcIndzOi8vZXhhbXBsZS5jb20vc29ja2V0XCJgLFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIndzczovL2V4YW1wbGUuY29tXCJgXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwiL3NvY2tldFwiYCAoaW5oZXJpdGVkIGhvc3QgJiBwcm90b2NvbClcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c10gLSBPcHRpb25hbCBjb25maWd1cmF0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy50cmFuc3BvcnRdIC0gVGhlIFdlYnNvY2tldCBUcmFuc3BvcnQsIGZvciBleGFtcGxlIFdlYlNvY2tldCBvciBQaG9lbml4LkxvbmdQb2xsLlxuICpcbiAqIERlZmF1bHRzIHRvIFdlYlNvY2tldCB3aXRoIGF1dG9tYXRpYyBMb25nUG9sbCBmYWxsYmFjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmVuY29kZV0gLSBUaGUgZnVuY3Rpb24gdG8gZW5jb2RlIG91dGdvaW5nIG1lc3NhZ2VzLlxuICpcbiAqIERlZmF1bHRzIHRvIEpTT04gZW5jb2Rlci5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5kZWNvZGVdIC0gVGhlIGZ1bmN0aW9uIHRvIGRlY29kZSBpbmNvbWluZyBtZXNzYWdlcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBKU09OOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIChwYXlsb2FkLCBjYWxsYmFjaykgPT4gY2FsbGJhY2soSlNPTi5wYXJzZShwYXlsb2FkKSlcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy50aW1lb3V0XSAtIFRoZSBkZWZhdWx0IHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIHRyaWdnZXIgcHVzaCB0aW1lb3V0cy5cbiAqXG4gKiBEZWZhdWx0cyBgREVGQVVMVF9USU1FT1VUYFxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLmhlYXJ0YmVhdEludGVydmFsTXNdIC0gVGhlIG1pbGxpc2VjIGludGVydmFsIHRvIHNlbmQgYSBoZWFydGJlYXQgbWVzc2FnZVxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRzLnJlY29ubmVjdEFmdGVyTXNdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyB0aGUgbWlsbHNlY1xuICogc29ja2V0IHJlY29ubmVjdCBpbnRlcnZhbC5cbiAqXG4gKiBEZWZhdWx0cyB0byBzdGVwcGVkIGJhY2tvZmYgb2Y6XG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICogfVxuICogYGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5yZWpvaW5BZnRlck1zXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG1pbGxzZWNcbiAqIHJlam9pbiBpbnRlcnZhbCBmb3IgaW5kaXZpZHVhbCBjaGFubmVscy5cbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICogfVxuICogYGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLmxvZ2dlcl0gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gZm9yIHNwZWNpYWxpemVkIGxvZ2dpbmcsIGllOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKGtpbmQsIG1zZywgZGF0YSkge1xuICogICBjb25zb2xlLmxvZyhgJHtraW5kfTogJHttc2d9YCwgZGF0YSlcbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5sb25ncG9sbGVyVGltZW91dF0gLSBUaGUgbWF4aW11bSB0aW1lb3V0IG9mIGEgbG9uZyBwb2xsIEFKQVggcmVxdWVzdC5cbiAqXG4gKiBEZWZhdWx0cyB0byAyMHMgKGRvdWJsZSB0aGUgc2VydmVyIGxvbmcgcG9sbCB0aW1lcikuXG4gKlxuICogQHBhcmFtIHsoT2JqZWN0fGZ1bmN0aW9uKX0gW29wdHMucGFyYW1zXSAtIFRoZSBvcHRpb25hbCBwYXJhbXMgdG8gcGFzcyB3aGVuIGNvbm5lY3RpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbb3B0cy5iaW5hcnlUeXBlXSAtIFRoZSBiaW5hcnkgdHlwZSB0byB1c2UgZm9yIGJpbmFyeSBXZWJTb2NrZXQgZnJhbWVzLlxuICpcbiAqIERlZmF1bHRzIHRvIFwiYXJyYXlidWZmZXJcIlxuICpcbiAqIEBwYXJhbSB7dnNufSBbb3B0cy52c25dIC0gVGhlIHNlcmlhbGl6ZXIncyBwcm90b2NvbCB2ZXJzaW9uIHRvIHNlbmQgb24gY29ubmVjdC5cbiAqXG4gKiBEZWZhdWx0cyB0byBERUZBVUxUX1ZTTi5cbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTb2NrZXQge1xuICBjb25zdHJ1Y3RvcihlbmRQb2ludCwgb3B0cyA9IHt9KXtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzID0ge29wZW46IFtdLCBjbG9zZTogW10sIGVycm9yOiBbXSwgbWVzc2FnZTogW119XG4gICAgdGhpcy5jaGFubmVscyA9IFtdXG4gICAgdGhpcy5zZW5kQnVmZmVyID0gW11cbiAgICB0aGlzLnJlZiA9IDBcbiAgICB0aGlzLnRpbWVvdXQgPSBvcHRzLnRpbWVvdXQgfHwgREVGQVVMVF9USU1FT1VUXG4gICAgdGhpcy50cmFuc3BvcnQgPSBvcHRzLnRyYW5zcG9ydCB8fCBnbG9iYWwuV2ViU29ja2V0IHx8IExvbmdQb2xsXG4gICAgdGhpcy5lc3RhYmxpc2hlZENvbm5lY3Rpb25zID0gMFxuICAgIHRoaXMuZGVmYXVsdEVuY29kZXIgPSBTZXJpYWxpemVyLmVuY29kZS5iaW5kKFNlcmlhbGl6ZXIpXG4gICAgdGhpcy5kZWZhdWx0RGVjb2RlciA9IFNlcmlhbGl6ZXIuZGVjb2RlLmJpbmQoU2VyaWFsaXplcilcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIHRoaXMuYmluYXJ5VHlwZSA9IG9wdHMuYmluYXJ5VHlwZSB8fCBcImFycmF5YnVmZmVyXCJcbiAgICB0aGlzLmNvbm5lY3RDbG9jayA9IDFcbiAgICBpZih0aGlzLnRyYW5zcG9ydCAhPT0gTG9uZ1BvbGwpe1xuICAgICAgdGhpcy5lbmNvZGUgPSBvcHRzLmVuY29kZSB8fCB0aGlzLmRlZmF1bHRFbmNvZGVyXG4gICAgICB0aGlzLmRlY29kZSA9IG9wdHMuZGVjb2RlIHx8IHRoaXMuZGVmYXVsdERlY29kZXJcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmNvZGUgPSB0aGlzLmRlZmF1bHRFbmNvZGVyXG4gICAgICB0aGlzLmRlY29kZSA9IHRoaXMuZGVmYXVsdERlY29kZXJcbiAgICB9XG4gICAgbGV0IGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPSBudWxsXG4gICAgaWYocGh4V2luZG93ICYmIHBoeFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKXtcbiAgICAgIHBoeFdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgX2UgPT4ge1xuICAgICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgICAgICAgYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9IHRoaXMuY29ubmVjdENsb2NrXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIF9lID0+IHtcbiAgICAgICAgaWYoYXdhaXRpbmdDb25uZWN0aW9uT25QYWdlU2hvdyA9PT0gdGhpcy5jb25uZWN0Q2xvY2spe1xuICAgICAgICAgIGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPSBudWxsXG4gICAgICAgICAgdGhpcy5jb25uZWN0KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5oZWFydGJlYXRJbnRlcnZhbE1zID0gb3B0cy5oZWFydGJlYXRJbnRlcnZhbE1zIHx8IDMwMDAwXG4gICAgdGhpcy5yZWpvaW5BZnRlck1zID0gKHRyaWVzKSA9PiB7XG4gICAgICBpZihvcHRzLnJlam9pbkFmdGVyTXMpe1xuICAgICAgICByZXR1cm4gb3B0cy5yZWpvaW5BZnRlck1zKHRyaWVzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFsxMDAwLCAyMDAwLCA1MDAwXVt0cmllcyAtIDFdIHx8IDEwMDAwXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMucmVjb25uZWN0QWZ0ZXJNcyA9ICh0cmllcykgPT4ge1xuICAgICAgaWYob3B0cy5yZWNvbm5lY3RBZnRlck1zKXtcbiAgICAgICAgcmV0dXJuIG9wdHMucmVjb25uZWN0QWZ0ZXJNcyh0cmllcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbMTAsIDUwLCAxMDAsIDE1MCwgMjAwLCAyNTAsIDUwMCwgMTAwMCwgMjAwMF1bdHJpZXMgLSAxXSB8fCA1MDAwXG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMubG9nZ2VyID0gb3B0cy5sb2dnZXIgfHwgbnVsbFxuICAgIHRoaXMubG9uZ3BvbGxlclRpbWVvdXQgPSBvcHRzLmxvbmdwb2xsZXJUaW1lb3V0IHx8IDIwMDAwXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKG9wdHMucGFyYW1zIHx8IHt9KVxuICAgIHRoaXMuZW5kUG9pbnQgPSBgJHtlbmRQb2ludH0vJHtUUkFOU1BPUlRTLndlYnNvY2tldH1gXG4gICAgdGhpcy52c24gPSBvcHRzLnZzbiB8fCBERUZBVUxUX1ZTTlxuICAgIHRoaXMuaGVhcnRiZWF0VGltZXIgPSBudWxsXG4gICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgIHRoaXMucmVjb25uZWN0VGltZXIgPSBuZXcgVGltZXIoKCkgPT4ge1xuICAgICAgdGhpcy50ZWFyZG93bigoKSA9PiB0aGlzLmNvbm5lY3QoKSlcbiAgICB9LCB0aGlzLnJlY29ubmVjdEFmdGVyTXMpXG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgYW5kIHJlcGxhY2VzIHRoZSBhY3RpdmUgdHJhbnNwb3J0XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG5ld1RyYW5zcG9ydCAtIFRoZSBuZXcgdHJhbnNwb3J0IGNsYXNzIHRvIGluc3RhbnRpYXRlXG4gICAqXG4gICAqL1xuICByZXBsYWNlVHJhbnNwb3J0KG5ld1RyYW5zcG9ydCl7XG4gICAgdGhpcy5kaXNjb25uZWN0KClcbiAgICB0aGlzLnRyYW5zcG9ydCA9IG5ld1RyYW5zcG9ydFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHNvY2tldCBwcm90b2NvbFxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgcHJvdG9jb2woKXsgcmV0dXJuIGxvY2F0aW9uLnByb3RvY29sLm1hdGNoKC9eaHR0cHMvKSA/IFwid3NzXCIgOiBcIndzXCIgfVxuXG4gIC8qKlxuICAgKiBUaGUgZnVsbHkgcXVhbGlmZWQgc29ja2V0IHVybFxuICAgKlxuICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgKi9cbiAgZW5kUG9pbnRVUkwoKXtcbiAgICBsZXQgdXJpID0gQWpheC5hcHBlbmRQYXJhbXMoXG4gICAgICBBamF4LmFwcGVuZFBhcmFtcyh0aGlzLmVuZFBvaW50LCB0aGlzLnBhcmFtcygpKSwge3ZzbjogdGhpcy52c259KVxuICAgIGlmKHVyaS5jaGFyQXQoMCkgIT09IFwiL1wiKXsgcmV0dXJuIHVyaSB9XG4gICAgaWYodXJpLmNoYXJBdCgxKSA9PT0gXCIvXCIpeyByZXR1cm4gYCR7dGhpcy5wcm90b2NvbCgpfToke3VyaX1gIH1cblxuICAgIHJldHVybiBgJHt0aGlzLnByb3RvY29sKCl9Oi8vJHtsb2NhdGlvbi5ob3N0fSR7dXJpfWBcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0XG4gICAqXG4gICAqIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ2xvc2VFdmVudCNTdGF0dXNfY29kZXMgZm9yIHZhbGlkIHN0YXR1cyBjb2Rlcy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBPcHRpb25hbCBjYWxsYmFjayB3aGljaCBpcyBjYWxsZWQgYWZ0ZXIgc29ja2V0IGlzIGRpc2Nvbm5lY3RlZC5cbiAgICogQHBhcmFtIHtpbnRlZ2VyfSBjb2RlIC0gQSBzdGF0dXMgY29kZSBmb3IgZGlzY29ubmVjdGlvbiAoT3B0aW9uYWwpLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmVhc29uIC0gQSB0ZXh0dWFsIGRlc2NyaXB0aW9uIG9mIHRoZSByZWFzb24gdG8gZGlzY29ubmVjdC4gKE9wdGlvbmFsKVxuICAgKi9cbiAgZGlzY29ubmVjdChjYWxsYmFjaywgY29kZSwgcmVhc29uKXtcbiAgICB0aGlzLmNvbm5lY3RDbG9jaysrXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gdHJ1ZVxuICAgIHRoaXMucmVjb25uZWN0VGltZXIucmVzZXQoKVxuICAgIHRoaXMudGVhcmRvd24oY2FsbGJhY2ssIGNvZGUsIHJlYXNvbilcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gVGhlIHBhcmFtcyB0byBzZW5kIHdoZW4gY29ubmVjdGluZywgZm9yIGV4YW1wbGUgYHt1c2VyX2lkOiB1c2VyVG9rZW59YFxuICAgKlxuICAgKiBQYXNzaW5nIHBhcmFtcyB0byBjb25uZWN0IGlzIGRlcHJlY2F0ZWQ7IHBhc3MgdGhlbSBpbiB0aGUgU29ja2V0IGNvbnN0cnVjdG9yIGluc3RlYWQ6XG4gICAqIGBuZXcgU29ja2V0KFwiL3NvY2tldFwiLCB7cGFyYW1zOiB7dXNlcl9pZDogdXNlclRva2VufX0pYC5cbiAgICovXG4gIGNvbm5lY3QocGFyYW1zKXtcbiAgICB0aGlzLmNvbm5lY3RDbG9jaysrXG4gICAgaWYocGFyYW1zKXtcbiAgICAgIGNvbnNvbGUgJiYgY29uc29sZS5sb2coXCJwYXNzaW5nIHBhcmFtcyB0byBjb25uZWN0IGlzIGRlcHJlY2F0ZWQuIEluc3RlYWQgcGFzcyA6cGFyYW1zIHRvIHRoZSBTb2NrZXQgY29uc3RydWN0b3JcIilcbiAgICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShwYXJhbXMpXG4gICAgfVxuICAgIGlmKHRoaXMuY29ubil7IHJldHVybiB9XG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICB0aGlzLmNvbm4gPSBuZXcgdGhpcy50cmFuc3BvcnQodGhpcy5lbmRQb2ludFVSTCgpKVxuICAgIHRoaXMuY29ubi5iaW5hcnlUeXBlID0gdGhpcy5iaW5hcnlUeXBlXG4gICAgdGhpcy5jb25uLnRpbWVvdXQgPSB0aGlzLmxvbmdwb2xsZXJUaW1lb3V0XG4gICAgdGhpcy5jb25uLm9ub3BlbiA9ICgpID0+IHRoaXMub25Db25uT3BlbigpXG4gICAgdGhpcy5jb25uLm9uZXJyb3IgPSBlcnJvciA9PiB0aGlzLm9uQ29ubkVycm9yKGVycm9yKVxuICAgIHRoaXMuY29ubi5vbm1lc3NhZ2UgPSBldmVudCA9PiB0aGlzLm9uQ29ubk1lc3NhZ2UoZXZlbnQpXG4gICAgdGhpcy5jb25uLm9uY2xvc2UgPSBldmVudCA9PiB0aGlzLm9uQ29ubkNsb3NlKGV2ZW50KVxuICB9XG5cbiAgLyoqXG4gICAqIExvZ3MgdGhlIG1lc3NhZ2UuIE92ZXJyaWRlIGB0aGlzLmxvZ2dlcmAgZm9yIHNwZWNpYWxpemVkIGxvZ2dpbmcuIG5vb3BzIGJ5IGRlZmF1bHRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtpbmRcbiAgICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuICAgKi9cbiAgbG9nKGtpbmQsIG1zZywgZGF0YSl7IHRoaXMubG9nZ2VyKGtpbmQsIG1zZywgZGF0YSkgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgYSBsb2dnZXIgaGFzIGJlZW4gc2V0IG9uIHRoaXMgc29ja2V0LlxuICAgKi9cbiAgaGFzTG9nZ2VyKCl7IHJldHVybiB0aGlzLmxvZ2dlciAhPT0gbnVsbCB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gb3BlbiBldmVudHNcbiAgICpcbiAgICogQGV4YW1wbGUgc29ja2V0Lm9uT3BlbihmdW5jdGlvbigpeyBjb25zb2xlLmluZm8oXCJ0aGUgc29ja2V0IHdhcyBvcGVuZWRcIikgfSlcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uT3BlbihjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5vcGVuLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIGNsb3NlIGV2ZW50c1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25DbG9zZShjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5jbG9zZS5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBlcnJvciBldmVudHNcbiAgICpcbiAgICogQGV4YW1wbGUgc29ja2V0Lm9uRXJyb3IoZnVuY3Rpb24oZXJyb3IpeyBhbGVydChcIkFuIGVycm9yIG9jY3VycmVkXCIpIH0pXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkVycm9yKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLmVycm9yLnB1c2goW3JlZiwgY2FsbGJhY2tdKVxuICAgIHJldHVybiByZWZcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIG1lc3NhZ2UgZXZlbnRzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbk1lc3NhZ2UoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZS5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUGluZ3MgdGhlIHNlcnZlciBhbmQgaW52b2tlcyB0aGUgY2FsbGJhY2sgd2l0aCB0aGUgUlRUIGluIG1pbGxpc2Vjb25kc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBpbmcgd2FzIHB1c2hlZCBvciBmYWxzZSBpZiB1bmFibGUgdG8gYmUgcHVzaGVkLlxuICAgKi9cbiAgcGluZyhjYWxsYmFjayl7XG4gICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiBmYWxzZSB9XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgbGV0IHN0YXJ0VGltZSA9IERhdGUubm93KClcbiAgICB0aGlzLnB1c2goe3RvcGljOiBcInBob2VuaXhcIiwgZXZlbnQ6IFwiaGVhcnRiZWF0XCIsIHBheWxvYWQ6IHt9LCByZWY6IHJlZn0pXG4gICAgbGV0IG9uTXNnUmVmID0gdGhpcy5vbk1lc3NhZ2UobXNnID0+IHtcbiAgICAgIGlmKG1zZy5yZWYgPT09IHJlZil7XG4gICAgICAgIHRoaXMub2ZmKFtvbk1zZ1JlZl0pXG4gICAgICAgIGNhbGxiYWNrKERhdGUubm93KCkgLSBzdGFydFRpbWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBvbkNvbm5PcGVuKCl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYGNvbm5lY3RlZCB0byAke3RoaXMuZW5kUG9pbnRVUkwoKX1gKVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5lc3RhYmxpc2hlZENvbm5lY3Rpb25zKytcbiAgICB0aGlzLmZsdXNoU2VuZEJ1ZmZlcigpXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy5yZXNldEhlYXJ0YmVhdCgpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5vcGVuLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4gY2FsbGJhY2soKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICBoZWFydGJlYXRUaW1lb3V0KCl7XG4gICAgaWYodGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpeyB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBcImhlYXJ0YmVhdCB0aW1lb3V0LiBBdHRlbXB0aW5nIHRvIHJlLWVzdGFibGlzaCBjb25uZWN0aW9uXCIpIH1cbiAgICAgIHRoaXMuYWJub3JtYWxDbG9zZShcImhlYXJ0YmVhdCB0aW1lb3V0XCIpXG4gICAgfVxuICB9XG5cbiAgcmVzZXRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLmNvbm4gJiYgdGhpcy5jb25uLnNraXBIZWFydGJlYXQpeyByZXR1cm4gfVxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gIH1cblxuICB0ZWFyZG93bihjYWxsYmFjaywgY29kZSwgcmVhc29uKXtcbiAgICBpZighdGhpcy5jb25uKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZSgoKSA9PiB7XG4gICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICBpZihjb2RlKXsgdGhpcy5jb25uLmNsb3NlKGNvZGUsIHJlYXNvbiB8fCBcIlwiKSB9IGVsc2UgeyB0aGlzLmNvbm4uY2xvc2UoKSB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZCgoKSA9PiB7XG4gICAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgICAgdGhpcy5jb25uLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgd2FpdEZvckJ1ZmZlckRvbmUoY2FsbGJhY2ssIHRyaWVzID0gMSl7XG4gICAgaWYodHJpZXMgPT09IDUgfHwgIXRoaXMuY29ubiB8fCAhdGhpcy5jb25uLmJ1ZmZlcmVkQW1vdW50KXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZShjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgd2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgPSAxKXtcbiAgICBpZih0cmllcyA9PT0gNSB8fCAhdGhpcy5jb25uIHx8IHRoaXMuY29ubi5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLmNsb3NlZCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgb25Db25uQ2xvc2UoZXZlbnQpe1xuICAgIGxldCBjbG9zZUNvZGUgPSBldmVudCAmJiBldmVudC5jb2RlXG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJjbG9zZVwiLCBldmVudClcbiAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0YmVhdFRpbWVyKVxuICAgIGlmKCF0aGlzLmNsb3NlV2FzQ2xlYW4gJiYgY2xvc2VDb2RlICE9PSAxMDAwKXtcbiAgICAgIHRoaXMucmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KClcbiAgICB9XG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5jbG9zZS5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IGNhbGxiYWNrKGV2ZW50KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgb25Db25uRXJyb3IoZXJyb3Ipe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGVycm9yKVxuICAgIGxldCB0cmFuc3BvcnRCZWZvcmUgPSB0aGlzLnRyYW5zcG9ydFxuICAgIGxldCBlc3RhYmxpc2hlZEJlZm9yZSA9IHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9uc1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IuZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgdHJhbnNwb3J0QmVmb3JlLCBlc3RhYmxpc2hlZEJlZm9yZSlcbiAgICB9KVxuICAgIGlmKHRyYW5zcG9ydEJlZm9yZSA9PT0gdGhpcy50cmFuc3BvcnQgfHwgZXN0YWJsaXNoZWRCZWZvcmUgPiAwKXtcbiAgICAgIHRoaXMudHJpZ2dlckNoYW5FcnJvcigpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyQ2hhbkVycm9yKCl7XG4gICAgdGhpcy5jaGFubmVscy5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgaWYoIShjaGFubmVsLmlzRXJyb3JlZCgpIHx8IGNoYW5uZWwuaXNMZWF2aW5nKCkgfHwgY2hhbm5lbC5pc0Nsb3NlZCgpKSl7XG4gICAgICAgIGNoYW5uZWwudHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBjb25uZWN0aW9uU3RhdGUoKXtcbiAgICBzd2l0Y2godGhpcy5jb25uICYmIHRoaXMuY29ubi5yZWFkeVN0YXRlKXtcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nOiByZXR1cm4gXCJjb25uZWN0aW5nXCJcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5vcGVuOiByZXR1cm4gXCJvcGVuXCJcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jbG9zaW5nOiByZXR1cm4gXCJjbG9zaW5nXCJcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNsb3NlZFwiXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuY29ubmVjdGlvblN0YXRlKCkgPT09IFwib3BlblwiIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICpcbiAgICogQHBhcmFtIHtDaGFubmVsfVxuICAgKi9cbiAgcmVtb3ZlKGNoYW5uZWwpe1xuICAgIHRoaXMub2ZmKGNoYW5uZWwuc3RhdGVDaGFuZ2VSZWZzKVxuICAgIHRoaXMuY2hhbm5lbHMgPSB0aGlzLmNoYW5uZWxzLmZpbHRlcihjID0+IGMuam9pblJlZigpICE9PSBjaGFubmVsLmpvaW5SZWYoKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGBvbk9wZW5gLCBgb25DbG9zZWAsIGBvbkVycm9yLGAgYW5kIGBvbk1lc3NhZ2VgIHJlZ2lzdHJhdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7cmVmc30gLSBsaXN0IG9mIHJlZnMgcmV0dXJuZWQgYnkgY2FsbHMgdG9cbiAgICogICAgICAgICAgICAgICAgIGBvbk9wZW5gLCBgb25DbG9zZWAsIGBvbkVycm9yLGAgYW5kIGBvbk1lc3NhZ2VgXG4gICAqL1xuICBvZmYocmVmcyl7XG4gICAgZm9yKGxldCBrZXkgaW4gdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyl7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzW2tleV0gPSB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzW2tleV0uZmlsdGVyKChbcmVmXSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVmcy5pbmRleE9mKHJlZikgPT09IC0xXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgYSBuZXcgY2hhbm5lbCBmb3IgdGhlIGdpdmVuIHRvcGljXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICAgKiBAcGFyYW0ge09iamVjdH0gY2hhblBhcmFtcyAtIFBhcmFtZXRlcnMgZm9yIHRoZSBjaGFubmVsXG4gICAqIEByZXR1cm5zIHtDaGFubmVsfVxuICAgKi9cbiAgY2hhbm5lbCh0b3BpYywgY2hhblBhcmFtcyA9IHt9KXtcbiAgICBsZXQgY2hhbiA9IG5ldyBDaGFubmVsKHRvcGljLCBjaGFuUGFyYW1zLCB0aGlzKVxuICAgIHRoaXMuY2hhbm5lbHMucHVzaChjaGFuKVxuICAgIHJldHVybiBjaGFuXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIHB1c2goZGF0YSl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSl7XG4gICAgICBsZXQge3RvcGljLCBldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZn0gPSBkYXRhXG4gICAgICB0aGlzLmxvZyhcInB1c2hcIiwgYCR7dG9waWN9ICR7ZXZlbnR9ICgke2pvaW5fcmVmfSwgJHtyZWZ9KWAsIHBheWxvYWQpXG4gICAgfVxuXG4gICAgaWYodGhpcy5pc0Nvbm5lY3RlZCgpKXtcbiAgICAgIHRoaXMuZW5jb2RlKGRhdGEsIHJlc3VsdCA9PiB0aGlzLmNvbm4uc2VuZChyZXN1bHQpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaCgoKSA9PiB0aGlzLmVuY29kZShkYXRhLCByZXN1bHQgPT4gdGhpcy5jb25uLnNlbmQocmVzdWx0KSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgbmV4dCBtZXNzYWdlIHJlZiwgYWNjb3VudGluZyBmb3Igb3ZlcmZsb3dzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBtYWtlUmVmKCl7XG4gICAgbGV0IG5ld1JlZiA9IHRoaXMucmVmICsgMVxuICAgIGlmKG5ld1JlZiA9PT0gdGhpcy5yZWYpeyB0aGlzLnJlZiA9IDAgfSBlbHNlIHsgdGhpcy5yZWYgPSBuZXdSZWYgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVmLnRvU3RyaW5nKClcbiAgfVxuXG4gIHNlbmRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgJiYgIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnB1c2goe3RvcGljOiBcInBob2VuaXhcIiwgZXZlbnQ6IFwiaGVhcnRiZWF0XCIsIHBheWxvYWQ6IHt9LCByZWY6IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZn0pXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oZWFydGJlYXRUaW1lb3V0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgfVxuXG4gIGFibm9ybWFsQ2xvc2UocmVhc29uKXtcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSl7IHRoaXMuY29ubi5jbG9zZShXU19DTE9TRV9OT1JNQUwsIHJlYXNvbikgfVxuICB9XG5cbiAgZmx1c2hTZW5kQnVmZmVyKCl7XG4gICAgaWYodGhpcy5pc0Nvbm5lY3RlZCgpICYmIHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGggPiAwKXtcbiAgICAgIHRoaXMuc2VuZEJ1ZmZlci5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKCkpXG4gICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXVxuICAgIH1cbiAgfVxuXG4gIG9uQ29ubk1lc3NhZ2UocmF3TWVzc2FnZSl7XG4gICAgdGhpcy5kZWNvZGUocmF3TWVzc2FnZS5kYXRhLCBtc2cgPT4ge1xuICAgICAgbGV0IHt0b3BpYywgZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pbl9yZWZ9ID0gbXNnXG4gICAgICBpZihyZWYgJiYgcmVmID09PSB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYpe1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwicmVjZWl2ZVwiLCBgJHtwYXlsb2FkLnN0YXR1cyB8fCBcIlwifSAke3RvcGljfSAke2V2ZW50fSAke3JlZiAmJiBcIihcIiArIHJlZiArIFwiKVwiIHx8IFwiXCJ9YCwgcGF5bG9hZClcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hhbm5lbHMubGVuZ3RoOyBpKyspe1xuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tpXVxuICAgICAgICBpZighY2hhbm5lbC5pc01lbWJlcih0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5fcmVmKSl7IGNvbnRpbnVlIH1cbiAgICAgICAgY2hhbm5lbC50cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmKVxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IFssIGNhbGxiYWNrXSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZVtpXVxuICAgICAgICBjYWxsYmFjayhtc2cpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGxlYXZlT3BlblRvcGljKHRvcGljKXtcbiAgICBsZXQgZHVwQ2hhbm5lbCA9IHRoaXMuY2hhbm5lbHMuZmluZChjID0+IGMudG9waWMgPT09IHRvcGljICYmIChjLmlzSm9pbmVkKCkgfHwgYy5pc0pvaW5pbmcoKSkpXG4gICAgaWYoZHVwQ2hhbm5lbCl7XG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgbGVhdmluZyBkdXBsaWNhdGUgdG9waWMgXCIke3RvcGljfVwiYClcbiAgICAgIGR1cENoYW5uZWwubGVhdmUoKVxuICAgIH1cbiAgfVxufVxuIiwgIlxuZXhwb3J0IGNvbnN0IENPTlNFQ1VUSVZFX1JFTE9BRFMgPSBcImNvbnNlY3V0aXZlLXJlbG9hZHNcIlxuZXhwb3J0IGNvbnN0IE1BWF9SRUxPQURTID0gMTBcbmV4cG9ydCBjb25zdCBSRUxPQURfSklUVEVSX01JTiA9IDEwMDBcbmV4cG9ydCBjb25zdCBSRUxPQURfSklUVEVSX01BWCA9IDMwMDBcbmV4cG9ydCBjb25zdCBGQUlMU0FGRV9KSVRURVIgPSAzMDAwMFxuZXhwb3J0IGNvbnN0IFBIWF9FVkVOVF9DTEFTU0VTID0gW1xuICBcInBoeC1jbGljay1sb2FkaW5nXCIsIFwicGh4LWNoYW5nZS1sb2FkaW5nXCIsIFwicGh4LXN1Ym1pdC1sb2FkaW5nXCIsXG4gIFwicGh4LWtleWRvd24tbG9hZGluZ1wiLCBcInBoeC1rZXl1cC1sb2FkaW5nXCIsIFwicGh4LWJsdXItbG9hZGluZ1wiLCBcInBoeC1mb2N1cy1sb2FkaW5nXCJcbl1cbmV4cG9ydCBjb25zdCBQSFhfQ09NUE9ORU5UID0gXCJkYXRhLXBoeC1jb21wb25lbnRcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSVZFX0xJTksgPSBcImRhdGEtcGh4LWxpbmtcIlxuZXhwb3J0IGNvbnN0IFBIWF9UUkFDS19TVEFUSUMgPSBcInRyYWNrLXN0YXRpY1wiXG5leHBvcnQgY29uc3QgUEhYX0xJTktfU1RBVEUgPSBcImRhdGEtcGh4LWxpbmstc3RhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUYgPSBcImRhdGEtcGh4LXJlZlwiXG5leHBvcnQgY29uc3QgUEhYX1JFRl9TUkMgPSBcImRhdGEtcGh4LXJlZi1zcmNcIlxuZXhwb3J0IGNvbnN0IFBIWF9UUkFDS19VUExPQURTID0gXCJ0cmFjay11cGxvYWRzXCJcbmV4cG9ydCBjb25zdCBQSFhfVVBMT0FEX1JFRiA9IFwiZGF0YS1waHgtdXBsb2FkLXJlZlwiXG5leHBvcnQgY29uc3QgUEhYX1BSRUZMSUdIVEVEX1JFRlMgPSBcImRhdGEtcGh4LXByZWZsaWdodGVkLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9ET05FX1JFRlMgPSBcImRhdGEtcGh4LWRvbmUtcmVmc1wiXG5leHBvcnQgY29uc3QgUEhYX0RST1BfVEFSR0VUID0gXCJkcm9wLXRhcmdldFwiXG5leHBvcnQgY29uc3QgUEhYX0FDVElWRV9FTlRSWV9SRUZTID0gXCJkYXRhLXBoeC1hY3RpdmUtcmVmc1wiXG5leHBvcnQgY29uc3QgUEhYX0xJVkVfRklMRV9VUERBVEVEID0gXCJwaHg6bGl2ZS1maWxlOnVwZGF0ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9TS0lQID0gXCJkYXRhLXBoeC1za2lwXCJcbmV4cG9ydCBjb25zdCBQSFhfUFJVTkUgPSBcImRhdGEtcGh4LXBydW5lXCJcbmV4cG9ydCBjb25zdCBQSFhfUEFHRV9MT0FESU5HID0gXCJwYWdlLWxvYWRpbmdcIlxuZXhwb3J0IGNvbnN0IFBIWF9DT05ORUNURURfQ0xBU1MgPSBcInBoeC1jb25uZWN0ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9ESVNDT05ORUNURURfQ0xBU1MgPSBcInBoeC1sb2FkaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfTk9fRkVFREJBQ0tfQ0xBU1MgPSBcInBoeC1uby1mZWVkYmFja1wiXG5leHBvcnQgY29uc3QgUEhYX0VSUk9SX0NMQVNTID0gXCJwaHgtZXJyb3JcIlxuZXhwb3J0IGNvbnN0IFBIWF9QQVJFTlRfSUQgPSBcImRhdGEtcGh4LXBhcmVudC1pZFwiXG5leHBvcnQgY29uc3QgUEhYX01BSU4gPSBcImRhdGEtcGh4LW1haW5cIlxuZXhwb3J0IGNvbnN0IFBIWF9ST09UX0lEID0gXCJkYXRhLXBoeC1yb290LWlkXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJJR0dFUl9BQ1RJT04gPSBcInRyaWdnZXItYWN0aW9uXCJcbmV4cG9ydCBjb25zdCBQSFhfRkVFREJBQ0tfRk9SID0gXCJmZWVkYmFjay1mb3JcIlxuZXhwb3J0IGNvbnN0IFBIWF9IQVNfRk9DVVNFRCA9IFwicGh4LWhhcy1mb2N1c2VkXCJcbmV4cG9ydCBjb25zdCBGT0NVU0FCTEVfSU5QVVRTID0gW1widGV4dFwiLCBcInRleHRhcmVhXCIsIFwibnVtYmVyXCIsIFwiZW1haWxcIiwgXCJwYXNzd29yZFwiLCBcInNlYXJjaFwiLCBcInRlbFwiLCBcInVybFwiLCBcImRhdGVcIiwgXCJ0aW1lXCIsIFwiZGF0ZXRpbWUtbG9jYWxcIiwgXCJjb2xvclwiLCBcInJhbmdlXCJdXG5leHBvcnQgY29uc3QgQ0hFQ0tBQkxFX0lOUFVUUyA9IFtcImNoZWNrYm94XCIsIFwicmFkaW9cIl1cbmV4cG9ydCBjb25zdCBQSFhfSEFTX1NVQk1JVFRFRCA9IFwicGh4LWhhcy1zdWJtaXR0ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9TRVNTSU9OID0gXCJkYXRhLXBoeC1zZXNzaW9uXCJcbmV4cG9ydCBjb25zdCBQSFhfVklFV19TRUxFQ1RPUiA9IGBbJHtQSFhfU0VTU0lPTn1dYFxuZXhwb3J0IGNvbnN0IFBIWF9TVElDS1kgPSBcImRhdGEtcGh4LXN0aWNreVwiXG5leHBvcnQgY29uc3QgUEhYX1NUQVRJQyA9IFwiZGF0YS1waHgtc3RhdGljXCJcbmV4cG9ydCBjb25zdCBQSFhfUkVBRE9OTFkgPSBcImRhdGEtcGh4LXJlYWRvbmx5XCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRUQgPSBcImRhdGEtcGh4LWRpc2FibGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRV9XSVRIID0gXCJkaXNhYmxlLXdpdGhcIlxuZXhwb3J0IGNvbnN0IFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSA9IFwiZGF0YS1waHgtZGlzYWJsZS13aXRoLXJlc3RvcmVcIlxuZXhwb3J0IGNvbnN0IFBIWF9IT09LID0gXCJob29rXCJcbmV4cG9ydCBjb25zdCBQSFhfREVCT1VOQ0UgPSBcImRlYm91bmNlXCJcbmV4cG9ydCBjb25zdCBQSFhfVEhST1RUTEUgPSBcInRocm90dGxlXCJcbmV4cG9ydCBjb25zdCBQSFhfVVBEQVRFID0gXCJ1cGRhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9LRVkgPSBcImtleVwiXG5leHBvcnQgY29uc3QgUEhYX1BSSVZBVEUgPSBcInBoeFByaXZhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9BVVRPX1JFQ09WRVIgPSBcImF1dG8tcmVjb3ZlclwiXG5leHBvcnQgY29uc3QgUEhYX0xWX0RFQlVHID0gXCJwaHg6bGl2ZS1zb2NrZXQ6ZGVidWdcIlxuZXhwb3J0IGNvbnN0IFBIWF9MVl9QUk9GSUxFID0gXCJwaHg6bGl2ZS1zb2NrZXQ6cHJvZmlsaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfTFZfTEFURU5DWV9TSU0gPSBcInBoeDpsaXZlLXNvY2tldDpsYXRlbmN5LXNpbVwiXG5leHBvcnQgY29uc3QgUEhYX1BST0dSRVNTID0gXCJwcm9ncmVzc1wiXG5leHBvcnQgY29uc3QgTE9BREVSX1RJTUVPVVQgPSAxXG5leHBvcnQgY29uc3QgQkVGT1JFX1VOTE9BRF9MT0FERVJfVElNRU9VVCA9IDIwMFxuZXhwb3J0IGNvbnN0IEJJTkRJTkdfUFJFRklYID0gXCJwaHgtXCJcbmV4cG9ydCBjb25zdCBQVVNIX1RJTUVPVVQgPSAzMDAwMFxuZXhwb3J0IGNvbnN0IExJTktfSEVBREVSID0gXCJ4LXJlcXVlc3RlZC13aXRoXCJcbmV4cG9ydCBjb25zdCBSRVNQT05TRV9VUkxfSEVBREVSID0gXCJ4LXJlc3BvbnNlLXVybFwiXG5leHBvcnQgY29uc3QgREVCT1VOQ0VfVFJJR0dFUiA9IFwiZGVib3VuY2UtdHJpZ2dlclwiXG5leHBvcnQgY29uc3QgVEhST1RUTEVEID0gXCJ0aHJvdHRsZWRcIlxuZXhwb3J0IGNvbnN0IERFQk9VTkNFX1BSRVZfS0VZID0gXCJkZWJvdW5jZS1wcmV2LWtleVwiXG5leHBvcnQgY29uc3QgREVGQVVMVFMgPSB7XG4gIGRlYm91bmNlOiAzMDAsXG4gIHRocm90dGxlOiAzMDBcbn1cblxuLy8gUmVuZGVyZWRcbmV4cG9ydCBjb25zdCBEWU5BTUlDUyA9IFwiZFwiXG5leHBvcnQgY29uc3QgU1RBVElDID0gXCJzXCJcbmV4cG9ydCBjb25zdCBDT01QT05FTlRTID0gXCJjXCJcbmV4cG9ydCBjb25zdCBFVkVOVFMgPSBcImVcIlxuZXhwb3J0IGNvbnN0IFJFUExZID0gXCJyXCJcbmV4cG9ydCBjb25zdCBUSVRMRSA9IFwidFwiXG5leHBvcnQgY29uc3QgVEVNUExBVEVTID0gXCJwXCJcbiIsICJpbXBvcnQge1xuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudHJ5VXBsb2FkZXIge1xuICBjb25zdHJ1Y3RvcihlbnRyeSwgY2h1bmtTaXplLCBsaXZlU29ja2V0KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQgPSBsaXZlU29ja2V0XG4gICAgdGhpcy5lbnRyeSA9IGVudHJ5XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5jaHVua1NpemUgPSBjaHVua1NpemVcbiAgICB0aGlzLmNodW5rVGltZXIgPSBudWxsXG4gICAgdGhpcy51cGxvYWRDaGFubmVsID0gbGl2ZVNvY2tldC5jaGFubmVsKGBsdnU6JHtlbnRyeS5yZWZ9YCwge3Rva2VuOiBlbnRyeS5tZXRhZGF0YSgpfSlcbiAgfVxuXG4gIGVycm9yKHJlYXNvbil7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY2h1bmtUaW1lcilcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwubGVhdmUoKVxuICAgIHRoaXMuZW50cnkuZXJyb3IocmVhc29uKVxuICB9XG5cbiAgdXBsb2FkKCl7XG4gICAgdGhpcy51cGxvYWRDaGFubmVsLm9uRXJyb3IocmVhc29uID0+IHRoaXMuZXJyb3IocmVhc29uKSlcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwuam9pbigpXG4gICAgICAucmVjZWl2ZShcIm9rXCIsIF9kYXRhID0+IHRoaXMucmVhZE5leHRDaHVuaygpKVxuICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCByZWFzb24gPT4gdGhpcy5lcnJvcihyZWFzb24pKVxuICB9XG5cbiAgaXNEb25lKCl7IHJldHVybiB0aGlzLm9mZnNldCA+PSB0aGlzLmVudHJ5LmZpbGUuc2l6ZSB9XG5cbiAgcmVhZE5leHRDaHVuaygpe1xuICAgIGxldCByZWFkZXIgPSBuZXcgd2luZG93LkZpbGVSZWFkZXIoKVxuICAgIGxldCBibG9iID0gdGhpcy5lbnRyeS5maWxlLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLmNodW5rU2l6ZSArIHRoaXMub2Zmc2V0KVxuICAgIHJlYWRlci5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgaWYoZS50YXJnZXQuZXJyb3IgPT09IG51bGwpe1xuICAgICAgICB0aGlzLm9mZnNldCArPSBlLnRhcmdldC5yZXN1bHQuYnl0ZUxlbmd0aFxuICAgICAgICB0aGlzLnB1c2hDaHVuayhlLnRhcmdldC5yZXN1bHQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbG9nRXJyb3IoXCJSZWFkIGVycm9yOiBcIiArIGUudGFyZ2V0LmVycm9yKVxuICAgICAgfVxuICAgIH1cbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgfVxuXG4gIHB1c2hDaHVuayhjaHVuayl7XG4gICAgaWYoIXRoaXMudXBsb2FkQ2hhbm5lbC5pc0pvaW5lZCgpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnVwbG9hZENoYW5uZWwucHVzaChcImNodW5rXCIsIGNodW5rKVxuICAgICAgLnJlY2VpdmUoXCJva1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZW50cnkucHJvZ3Jlc3MoKHRoaXMub2Zmc2V0IC8gdGhpcy5lbnRyeS5maWxlLnNpemUpICogMTAwKVxuICAgICAgICBpZighdGhpcy5pc0RvbmUoKSl7XG4gICAgICAgICAgdGhpcy5jaHVua1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlYWROZXh0Q2h1bmsoKSwgdGhpcy5saXZlU29ja2V0LmdldExhdGVuY3lTaW0oKSB8fCAwKVxuICAgICAgICB9XG4gICAgICB9KVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgUEhYX1ZJRVdfU0VMRUNUT1Jcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IEVudHJ5VXBsb2FkZXIgZnJvbSBcIi4vZW50cnlfdXBsb2FkZXJcIlxuXG5leHBvcnQgbGV0IGxvZ0Vycm9yID0gKG1zZywgb2JqKSA9PiBjb25zb2xlLmVycm9yICYmIGNvbnNvbGUuZXJyb3IobXNnLCBvYmopXG5cbmV4cG9ydCBsZXQgaXNDaWQgPSAoY2lkKSA9PiB7XG4gIGxldCB0eXBlID0gdHlwZW9mKGNpZClcbiAgcmV0dXJuIHR5cGUgPT09IFwibnVtYmVyXCIgfHwgKHR5cGUgPT09IFwic3RyaW5nXCIgJiYgL14oMHxbMS05XVxcZCopJC8udGVzdChjaWQpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0RHVwbGljYXRlSWRzKCl7XG4gIGxldCBpZHMgPSBuZXcgU2V0KClcbiAgbGV0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIipbaWRdXCIpXG4gIGZvcihsZXQgaSA9IDAsIGxlbiA9IGVsZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICBpZihpZHMuaGFzKGVsZW1zW2ldLmlkKSl7XG4gICAgICBjb25zb2xlLmVycm9yKGBNdWx0aXBsZSBJRHMgZGV0ZWN0ZWQ6ICR7ZWxlbXNbaV0uaWR9LiBFbnN1cmUgdW5pcXVlIGVsZW1lbnQgaWRzLmApXG4gICAgfSBlbHNlIHtcbiAgICAgIGlkcy5hZGQoZWxlbXNbaV0uaWQpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBsZXQgZGVidWcgPSAodmlldywga2luZCwgbXNnLCBvYmopID0+IHtcbiAgaWYodmlldy5saXZlU29ja2V0LmlzRGVidWdFbmFibGVkKCkpe1xuICAgIGNvbnNvbGUubG9nKGAke3ZpZXcuaWR9ICR7a2luZH06ICR7bXNnfSAtIGAsIG9iailcbiAgfVxufVxuXG4vLyB3cmFwcyB2YWx1ZSBpbiBjbG9zdXJlIG9yIHJldHVybnMgY2xvc3VyZVxuZXhwb3J0IGxldCBjbG9zdXJlID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gXCJmdW5jdGlvblwiID8gdmFsIDogZnVuY3Rpb24gKCl7IHJldHVybiB2YWwgfVxuXG5leHBvcnQgbGV0IGNsb25lID0gKG9iaikgPT4geyByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKSB9XG5cbmV4cG9ydCBsZXQgY2xvc2VzdFBoeEJpbmRpbmcgPSAoZWwsIGJpbmRpbmcsIGJvcmRlckVsKSA9PiB7XG4gIGRvIHtcbiAgICBpZihlbC5tYXRjaGVzKGBbJHtiaW5kaW5nfV1gKSl7IHJldHVybiBlbCB9XG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGVcbiAgfSB3aGlsZShlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSAmJiAhKChib3JkZXJFbCAmJiBib3JkZXJFbC5pc1NhbWVOb2RlKGVsKSkgfHwgZWwubWF0Y2hlcyhQSFhfVklFV19TRUxFQ1RPUikpKVxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgbGV0IGlzT2JqZWN0ID0gKG9iaikgPT4ge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgIShvYmogaW5zdGFuY2VvZiBBcnJheSlcbn1cblxuZXhwb3J0IGxldCBpc0VxdWFsT2JqID0gKG9iajEsIG9iajIpID0+IEpTT04uc3RyaW5naWZ5KG9iajEpID09PSBKU09OLnN0cmluZ2lmeShvYmoyKVxuXG5leHBvcnQgbGV0IGlzRW1wdHkgPSAob2JqKSA9PiB7XG4gIGZvcihsZXQgeCBpbiBvYmopeyByZXR1cm4gZmFsc2UgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgbGV0IG1heWJlID0gKGVsLCBjYWxsYmFjaykgPT4gZWwgJiYgY2FsbGJhY2soZWwpXG5cbmV4cG9ydCBsZXQgY2hhbm5lbFVwbG9hZGVyID0gZnVuY3Rpb24gKGVudHJpZXMsIG9uRXJyb3IsIHJlc3AsIGxpdmVTb2NrZXQpe1xuICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgIGxldCBlbnRyeVVwbG9hZGVyID0gbmV3IEVudHJ5VXBsb2FkZXIoZW50cnksIHJlc3AuY29uZmlnLmNodW5rX3NpemUsIGxpdmVTb2NrZXQpXG4gICAgZW50cnlVcGxvYWRlci51cGxvYWQoKVxuICB9KVxufVxuIiwgImxldCBCcm93c2VyID0ge1xuICBjYW5QdXNoU3RhdGUoKXsgcmV0dXJuICh0eXBlb2YgKGhpc3RvcnkucHVzaFN0YXRlKSAhPT0gXCJ1bmRlZmluZWRcIikgfSxcblxuICBkcm9wTG9jYWwobG9jYWxTdG9yYWdlLCBuYW1lc3BhY2UsIHN1YmtleSl7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpKVxuICB9LFxuXG4gIHVwZGF0ZUxvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXksIGluaXRpYWwsIGZ1bmMpe1xuICAgIGxldCBjdXJyZW50ID0gdGhpcy5nZXRMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5KVxuICAgIGxldCBrZXkgPSB0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KVxuICAgIGxldCBuZXdWYWwgPSBjdXJyZW50ID09PSBudWxsID8gaW5pdGlhbCA6IGZ1bmMoY3VycmVudClcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG5ld1ZhbCkpXG4gICAgcmV0dXJuIG5ld1ZhbFxuICB9LFxuXG4gIGdldExvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXkpe1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpKSlcbiAgfSxcblxuICB1cGRhdGVDdXJyZW50U3RhdGUoY2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmNhblB1c2hTdGF0ZSgpKXsgcmV0dXJuIH1cbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShjYWxsYmFjayhoaXN0b3J5LnN0YXRlIHx8IHt9KSwgXCJcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpXG4gIH0sXG5cbiAgcHVzaFN0YXRlKGtpbmQsIG1ldGEsIHRvKXtcbiAgICBpZih0aGlzLmNhblB1c2hTdGF0ZSgpKXtcbiAgICAgIGlmKHRvICE9PSB3aW5kb3cubG9jYXRpb24uaHJlZil7XG4gICAgICAgIGlmKG1ldGEudHlwZSA9PSBcInJlZGlyZWN0XCIgJiYgbWV0YS5zY3JvbGwpe1xuICAgICAgICAgIC8vIElmIHdlJ3JlIHJlZGlyZWN0aW5nIHN0b3JlIHRoZSBjdXJyZW50IHNjcm9sbFkgZm9yIHRoZSBjdXJyZW50IGhpc3Rvcnkgc3RhdGUuXG4gICAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZSA9IGhpc3Rvcnkuc3RhdGUgfHwge31cbiAgICAgICAgICBjdXJyZW50U3RhdGUuc2Nyb2xsID0gbWV0YS5zY3JvbGxcbiAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShjdXJyZW50U3RhdGUsIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIG1ldGEuc2Nyb2xsIC8vIE9ubHkgc3RvcmUgdGhlIHNjcm9sbCBpbiB0aGUgcmVkaXJlY3QgY2FzZS5cbiAgICAgICAgaGlzdG9yeVtraW5kICsgXCJTdGF0ZVwiXShtZXRhLCBcIlwiLCB0byB8fCBudWxsKSAvLyBJRSB3aWxsIGNvZXJjZSB1bmRlZmluZWQgdG8gc3RyaW5nXG4gICAgICAgIGxldCBoYXNoRWwgPSB0aGlzLmdldEhhc2hUYXJnZXRFbCh3aW5kb3cubG9jYXRpb24uaGFzaClcblxuICAgICAgICBpZihoYXNoRWwpe1xuICAgICAgICAgIGhhc2hFbC5zY3JvbGxJbnRvVmlldygpXG4gICAgICAgIH0gZWxzZSBpZihtZXRhLnR5cGUgPT09IFwicmVkaXJlY3RcIil7XG4gICAgICAgICAgd2luZG93LnNjcm9sbCgwLCAwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVkaXJlY3QodG8pXG4gICAgfVxuICB9LFxuXG4gIHNldENvb2tpZShuYW1lLCB2YWx1ZSl7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09JHt2YWx1ZX1gXG4gIH0sXG5cbiAgZ2V0Q29va2llKG5hbWUpe1xuICAgIHJldHVybiBkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzooPzpefC4qO1xccyopJHtuYW1lfVxccypcXD1cXHMqKFteO10qKS4qJCl8Xi4qJGApLCBcIiQxXCIpXG4gIH0sXG5cbiAgcmVkaXJlY3QodG9VUkwsIGZsYXNoKXtcbiAgICBpZihmbGFzaCl7IEJyb3dzZXIuc2V0Q29va2llKFwiX19waG9lbml4X2ZsYXNoX19cIiwgZmxhc2ggKyBcIjsgbWF4LWFnZT02MDAwMDsgcGF0aD0vXCIpIH1cbiAgICB3aW5kb3cubG9jYXRpb24gPSB0b1VSTFxuICB9LFxuXG4gIGxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KXsgcmV0dXJuIGAke25hbWVzcGFjZX0tJHtzdWJrZXl9YCB9LFxuXG4gIGdldEhhc2hUYXJnZXRFbChtYXliZUhhc2gpe1xuICAgIGxldCBoYXNoID0gbWF5YmVIYXNoLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDEpXG4gICAgaWYoaGFzaCA9PT0gXCJcIil7IHJldHVybiB9XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGFbbmFtZT1cIiR7aGFzaH1cIl1gKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJyb3dzZXJcbiIsICJpbXBvcnQge1xuICBDSEVDS0FCTEVfSU5QVVRTLFxuICBERUJPVU5DRV9QUkVWX0tFWSxcbiAgREVCT1VOQ0VfVFJJR0dFUixcbiAgRk9DVVNBQkxFX0lOUFVUUyxcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX0VWRU5UX0NMQVNTRVMsXG4gIFBIWF9IQVNfRk9DVVNFRCxcbiAgUEhYX0hBU19TVUJNSVRURUQsXG4gIFBIWF9NQUlOLFxuICBQSFhfTk9fRkVFREJBQ0tfQ0xBU1MsXG4gIFBIWF9QQVJFTlRfSUQsXG4gIFBIWF9QUklWQVRFLFxuICBQSFhfUkVGLFxuICBQSFhfUkVGX1NSQyxcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9TRVNTSU9OLFxuICBQSFhfU1RBVElDLFxuICBQSFhfVVBMT0FEX1JFRixcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBIWF9TVElDS1ksXG4gIFRIUk9UVExFRFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmxldCBET00gPSB7XG4gIGJ5SWQoaWQpeyByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIHx8IGxvZ0Vycm9yKGBubyBpZCBmb3VuZCBmb3IgJHtpZH1gKSB9LFxuXG4gIHJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpe1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgIGlmKGVsLmNsYXNzTGlzdC5sZW5ndGggPT09IDApeyBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKSB9XG4gIH0sXG5cbiAgYWxsKG5vZGUsIHF1ZXJ5LCBjYWxsYmFjayl7XG4gICAgaWYoIW5vZGUpeyByZXR1cm4gW10gfVxuICAgIGxldCBhcnJheSA9IEFycmF5LmZyb20obm9kZS5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSlcbiAgICByZXR1cm4gY2FsbGJhY2sgPyBhcnJheS5mb3JFYWNoKGNhbGxiYWNrKSA6IGFycmF5XG4gIH0sXG5cbiAgY2hpbGROb2RlTGVuZ3RoKGh0bWwpe1xuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcbiAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5jaGlsZEVsZW1lbnRDb3VudFxuICB9LFxuXG4gIGlzVXBsb2FkSW5wdXQoZWwpeyByZXR1cm4gZWwudHlwZSA9PT0gXCJmaWxlXCIgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSAhPT0gbnVsbCB9LFxuXG4gIGZpbmRVcGxvYWRJbnB1dHMobm9kZSl7IHJldHVybiB0aGlzLmFsbChub2RlLCBgaW5wdXRbdHlwZT1cImZpbGVcIl1bJHtQSFhfVVBMT0FEX1JFRn1dYCkgfSxcblxuICBmaW5kQ29tcG9uZW50Tm9kZUxpc3Qobm9kZSwgY2lkKXtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwobm9kZSwgYFske1BIWF9DT01QT05FTlR9PVwiJHtjaWR9XCJdYCksIG5vZGUpXG4gIH0sXG5cbiAgaXNQaHhEZXN0cm95ZWQobm9kZSl7XG4gICAgcmV0dXJuIG5vZGUuaWQgJiYgRE9NLnByaXZhdGUobm9kZSwgXCJkZXN0cm95ZWRcIikgPyB0cnVlIDogZmFsc2VcbiAgfSxcblxuICBtYXJrUGh4Q2hpbGREZXN0cm95ZWQoZWwpe1xuICAgIGlmKHRoaXMuaXNQaHhDaGlsZChlbCkpeyBlbC5zZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04sIFwiXCIpIH1cbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIFwiZGVzdHJveWVkXCIsIHRydWUpXG4gIH0sXG5cbiAgZmluZFBoeENoaWxkcmVuSW5GcmFnbWVudChodG1sLCBwYXJlbnRJZCl7XG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgIHJldHVybiB0aGlzLmZpbmRQaHhDaGlsZHJlbih0ZW1wbGF0ZS5jb250ZW50LCBwYXJlbnRJZClcbiAgfSxcblxuICBpc0lnbm9yZWQoZWwsIHBoeFVwZGF0ZSl7XG4gICAgcmV0dXJuIChlbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSB8fCBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC11cGRhdGVcIikpID09PSBcImlnbm9yZVwiXG4gIH0sXG5cbiAgaXNQaHhVcGRhdGUoZWwsIHBoeFVwZGF0ZSwgdXBkYXRlVHlwZXMpe1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgdXBkYXRlVHlwZXMuaW5kZXhPZihlbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSkgPj0gMFxuICB9LFxuXG4gIGZpbmRQaHhTdGlja3koZWwpeyByZXR1cm4gdGhpcy5hbGwoZWwsIGBbJHtQSFhfU1RJQ0tZfV1gKSB9LFxuXG4gIGZpbmRQaHhDaGlsZHJlbihlbCwgcGFyZW50SWQpe1xuICAgIHJldHVybiB0aGlzLmFsbChlbCwgYCR7UEhYX1ZJRVdfU0VMRUNUT1J9WyR7UEhYX1BBUkVOVF9JRH09XCIke3BhcmVudElkfVwiXWApXG4gIH0sXG5cbiAgZmluZFBhcmVudENJRHMobm9kZSwgY2lkcyl7XG4gICAgbGV0IGluaXRpYWwgPSBuZXcgU2V0KGNpZHMpXG4gICAgcmV0dXJuIGNpZHMucmVkdWNlKChhY2MsIGNpZCkgPT4ge1xuICAgICAgbGV0IHNlbGVjdG9yID0gYFske1BIWF9DT01QT05FTlR9PVwiJHtjaWR9XCJdIFske1BIWF9DT01QT05FTlR9XWBcblxuICAgICAgdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwobm9kZSwgc2VsZWN0b3IpLCBub2RlKVxuICAgICAgICAubWFwKGVsID0+IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSkpXG4gICAgICAgIC5mb3JFYWNoKGNoaWxkQ0lEID0+IGFjYy5kZWxldGUoY2hpbGRDSUQpKVxuXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgaW5pdGlhbClcbiAgfSxcblxuICBmaWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcobm9kZXMsIHBhcmVudCl7XG4gICAgaWYocGFyZW50LnF1ZXJ5U2VsZWN0b3IoUEhYX1ZJRVdfU0VMRUNUT1IpKXtcbiAgICAgIHJldHVybiBub2Rlcy5maWx0ZXIoZWwgPT4gdGhpcy53aXRoaW5TYW1lTGl2ZVZpZXcoZWwsIHBhcmVudCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub2Rlc1xuICAgIH1cbiAgfSxcblxuICB3aXRoaW5TYW1lTGl2ZVZpZXcobm9kZSwgcGFyZW50KXtcbiAgICB3aGlsZShub2RlID0gbm9kZS5wYXJlbnROb2RlKXtcbiAgICAgIGlmKG5vZGUuaXNTYW1lTm9kZShwYXJlbnQpKXsgcmV0dXJuIHRydWUgfVxuICAgICAgaWYobm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pICE9PSBudWxsKXsgcmV0dXJuIGZhbHNlIH1cbiAgICB9XG4gIH0sXG5cbiAgcHJpdmF0ZShlbCwga2V5KXsgcmV0dXJuIGVsW1BIWF9QUklWQVRFXSAmJiBlbFtQSFhfUFJJVkFURV1ba2V5XSB9LFxuXG4gIGRlbGV0ZVByaXZhdGUoZWwsIGtleSl7IGVsW1BIWF9QUklWQVRFXSAmJiBkZWxldGUgKGVsW1BIWF9QUklWQVRFXVtrZXldKSB9LFxuXG4gIHB1dFByaXZhdGUoZWwsIGtleSwgdmFsdWUpe1xuICAgIGlmKCFlbFtQSFhfUFJJVkFURV0peyBlbFtQSFhfUFJJVkFURV0gPSB7fSB9XG4gICAgZWxbUEhYX1BSSVZBVEVdW2tleV0gPSB2YWx1ZVxuICB9LFxuXG4gIHVwZGF0ZVByaXZhdGUoZWwsIGtleSwgZGVmYXVsdFZhbCwgdXBkYXRlRnVuYyl7XG4gICAgbGV0IGV4aXN0aW5nID0gdGhpcy5wcml2YXRlKGVsLCBrZXkpXG4gICAgaWYoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCl7XG4gICAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgdXBkYXRlRnVuYyhkZWZhdWx0VmFsKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBrZXksIHVwZGF0ZUZ1bmMoZXhpc3RpbmcpKVxuICAgIH1cbiAgfSxcblxuICBjb3B5UHJpdmF0ZXModGFyZ2V0LCBzb3VyY2Upe1xuICAgIGlmKHNvdXJjZVtQSFhfUFJJVkFURV0pe1xuICAgICAgdGFyZ2V0W1BIWF9QUklWQVRFXSA9IHNvdXJjZVtQSFhfUFJJVkFURV1cbiAgICB9XG4gIH0sXG5cbiAgcHV0VGl0bGUoc3RyKXtcbiAgICBsZXQgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0aXRsZVwiKVxuICAgIGxldCB7cHJlZml4LCBzdWZmaXh9ID0gdGl0bGVFbC5kYXRhc2V0XG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHtwcmVmaXggfHwgXCJcIn0ke3N0cn0ke3N1ZmZpeCB8fCBcIlwifWBcbiAgfSxcblxuICBkZWJvdW5jZShlbCwgZXZlbnQsIHBoeERlYm91bmNlLCBkZWZhdWx0RGVib3VuY2UsIHBoeFRocm90dGxlLCBkZWZhdWx0VGhyb3R0bGUsIGNhbGxiYWNrKXtcbiAgICBsZXQgZGVib3VuY2UgPSBlbC5nZXRBdHRyaWJ1dGUocGh4RGVib3VuY2UpXG4gICAgbGV0IHRocm90dGxlID0gZWwuZ2V0QXR0cmlidXRlKHBoeFRocm90dGxlKVxuICAgIGlmKGRlYm91bmNlID09PSBcIlwiKXsgZGVib3VuY2UgPSBkZWZhdWx0RGVib3VuY2UgfVxuICAgIGlmKHRocm90dGxlID09PSBcIlwiKXsgdGhyb3R0bGUgPSBkZWZhdWx0VGhyb3R0bGUgfVxuICAgIGxldCB2YWx1ZSA9IGRlYm91bmNlIHx8IHRocm90dGxlXG4gICAgc3dpdGNoKHZhbHVlKXtcbiAgICAgIGNhc2UgbnVsbDogcmV0dXJuIGNhbGxiYWNrKClcblxuICAgICAgY2FzZSBcImJsdXJcIjpcbiAgICAgICAgaWYodGhpcy5vbmNlKGVsLCBcImRlYm91bmNlLWJsdXJcIikpe1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IGNhbGxiYWNrKCkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxldCB0aW1lb3V0ID0gcGFyc2VJbnQodmFsdWUpXG4gICAgICAgIGxldCB0cmlnZ2VyID0gKCkgPT4gdGhyb3R0bGUgPyB0aGlzLmRlbGV0ZVByaXZhdGUoZWwsIFRIUk9UVExFRCkgOiBjYWxsYmFjaygpXG4gICAgICAgIGxldCBjdXJyZW50Q3ljbGUgPSB0aGlzLmluY0N5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSLCB0cmlnZ2VyKVxuICAgICAgICBpZihpc05hTih0aW1lb3V0KSl7IHJldHVybiBsb2dFcnJvcihgaW52YWxpZCB0aHJvdHRsZS9kZWJvdW5jZSB2YWx1ZTogJHt2YWx1ZX1gKSB9XG4gICAgICAgIGlmKHRocm90dGxlKXtcbiAgICAgICAgICBsZXQgbmV3S2V5RG93biA9IGZhbHNlXG4gICAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpe1xuICAgICAgICAgICAgbGV0IHByZXZLZXkgPSB0aGlzLnByaXZhdGUoZWwsIERFQk9VTkNFX1BSRVZfS0VZKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBERUJPVU5DRV9QUkVWX0tFWSwgZXZlbnQua2V5KVxuICAgICAgICAgICAgbmV3S2V5RG93biA9IHByZXZLZXkgIT09IGV2ZW50LmtleVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCFuZXdLZXlEb3duICYmIHRoaXMucHJpdmF0ZShlbCwgVEhST1RUTEVEKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBUSFJPVFRMRUQsIHRydWUpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKSwgdGltZW91dClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnRyaWdnZXJDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUiwgY3VycmVudEN5Y2xlKSwgdGltZW91dClcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGZvcm0gPSBlbC5mb3JtXG4gICAgICAgIGlmKGZvcm0gJiYgdGhpcy5vbmNlKGZvcm0sIFwiYmluZC1kZWJvdW5jZVwiKSl7XG4gICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsICgpID0+IHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oKG5ldyBGb3JtRGF0YShmb3JtKSkuZW50cmllcygpLCAoW25hbWVdKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke25hbWV9XCJdYClcbiAgICAgICAgICAgICAgdGhpcy5pbmNDeWNsZShpbnB1dCwgREVCT1VOQ0VfVFJJR0dFUilcbiAgICAgICAgICAgICAgdGhpcy5kZWxldGVQcml2YXRlKGlucHV0LCBUSFJPVFRMRUQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5vbmNlKGVsLCBcImJpbmQtZGVib3VuY2VcIikpe1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKSlcbiAgICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0cmlnZ2VyQ3ljbGUoZWwsIGtleSwgY3VycmVudEN5Y2xlKXtcbiAgICBsZXQgW2N5Y2xlLCB0cmlnZ2VyXSA9IHRoaXMucHJpdmF0ZShlbCwga2V5KVxuICAgIGlmKCFjdXJyZW50Q3ljbGUpeyBjdXJyZW50Q3ljbGUgPSBjeWNsZSB9XG4gICAgaWYoY3VycmVudEN5Y2xlID09PSBjeWNsZSl7XG4gICAgICB0aGlzLmluY0N5Y2xlKGVsLCBrZXkpXG4gICAgICB0cmlnZ2VyKClcbiAgICB9XG4gIH0sXG5cbiAgb25jZShlbCwga2V5KXtcbiAgICBpZih0aGlzLnByaXZhdGUoZWwsIGtleSkgPT09IHRydWUpeyByZXR1cm4gZmFsc2UgfVxuICAgIHRoaXMucHV0UHJpdmF0ZShlbCwga2V5LCB0cnVlKVxuICAgIHJldHVybiB0cnVlXG4gIH0sXG5cbiAgaW5jQ3ljbGUoZWwsIGtleSwgdHJpZ2dlciA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICBsZXQgW2N1cnJlbnRDeWNsZV0gPSB0aGlzLnByaXZhdGUoZWwsIGtleSkgfHwgWzAsIHRyaWdnZXJdXG4gICAgY3VycmVudEN5Y2xlKytcbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgW2N1cnJlbnRDeWNsZSwgdHJpZ2dlcl0pXG4gICAgcmV0dXJuIGN1cnJlbnRDeWNsZVxuICB9LFxuXG4gIGRpc2NhcmRFcnJvcihjb250YWluZXIsIGVsLCBwaHhGZWVkYmFja0Zvcil7XG4gICAgbGV0IGZpZWxkID0gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShwaHhGZWVkYmFja0ZvcilcbiAgICAvLyBUT0RPOiBSZW1vdmUgaWQgbG9va3VwIGFmdGVyIHdlIHVwZGF0ZSBQaG9lbml4IHRvIHVzZSBpbnB1dF9uYW1lIGluc3RlYWQgb2YgaW5wdXRfaWRcbiAgICBsZXQgaW5wdXQgPSBmaWVsZCAmJiBjb250YWluZXIucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtmaWVsZH1cIl0sIFtuYW1lPVwiJHtmaWVsZH1cIl1gKVxuICAgIGlmKCFpbnB1dCl7IHJldHVybiB9XG5cbiAgICBpZighKHRoaXMucHJpdmF0ZShpbnB1dCwgUEhYX0hBU19GT0NVU0VEKSB8fCB0aGlzLnByaXZhdGUoaW5wdXQuZm9ybSwgUEhYX0hBU19TVUJNSVRURUQpKSl7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFBIWF9OT19GRUVEQkFDS19DTEFTUylcbiAgICB9XG4gIH0sXG5cbiAgc2hvd0Vycm9yKGlucHV0RWwsIHBoeEZlZWRiYWNrRm9yKXtcbiAgICBpZihpbnB1dEVsLmlkIHx8IGlucHV0RWwubmFtZSl7XG4gICAgICB0aGlzLmFsbChpbnB1dEVsLmZvcm0sIGBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2lucHV0RWwuaWR9XCJdLCBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2lucHV0RWwubmFtZX1cIl1gLCAoZWwpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhlbCwgUEhYX05PX0ZFRURCQUNLX0NMQVNTKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgaXNQaHhDaGlsZChub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRClcbiAgfSxcblxuICBpc1BoeFN0aWNreShub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1NUSUNLWSkgIT09IG51bGxcbiAgfSxcblxuICBmaXJzdFBoeENoaWxkKGVsKXtcbiAgICByZXR1cm4gdGhpcy5pc1BoeENoaWxkKGVsKSA/IGVsIDogdGhpcy5hbGwoZWwsIGBbJHtQSFhfUEFSRU5UX0lEfV1gKVswXVxuICB9LFxuXG4gIGRpc3BhdGNoRXZlbnQodGFyZ2V0LCBuYW1lLCBvcHRzID0ge30pe1xuICAgIGxldCBidWJibGVzID0gb3B0cy5idWJibGVzID09PSB1bmRlZmluZWQgPyB0cnVlIDogISFvcHRzLmJ1YmJsZXNcbiAgICBsZXQgZXZlbnRPcHRzID0ge2J1YmJsZXM6IGJ1YmJsZXMsIGNhbmNlbGFibGU6IHRydWUsIGRldGFpbDogb3B0cy5kZXRhaWwgfHwge319XG4gICAgbGV0IGV2ZW50ID0gbmFtZSA9PT0gXCJjbGlja1wiID8gbmV3IE1vdXNlRXZlbnQoXCJjbGlja1wiLCBldmVudE9wdHMpIDogbmV3IEN1c3RvbUV2ZW50KG5hbWUsIGV2ZW50T3B0cylcbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudClcbiAgfSxcblxuICBjbG9uZU5vZGUobm9kZSwgaHRtbCl7XG4gICAgaWYodHlwZW9mIChodG1sKSA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICByZXR1cm4gbm9kZS5jbG9uZU5vZGUodHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNsb25lZCA9IG5vZGUuY2xvbmVOb2RlKGZhbHNlKVxuICAgICAgY2xvbmVkLmlubmVySFRNTCA9IGh0bWxcbiAgICAgIHJldHVybiBjbG9uZWRcbiAgICB9XG4gIH0sXG5cbiAgbWVyZ2VBdHRycyh0YXJnZXQsIHNvdXJjZSwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZXhjbHVkZSA9IG9wdHMuZXhjbHVkZSB8fCBbXVxuICAgIGxldCBpc0lnbm9yZWQgPSBvcHRzLmlzSWdub3JlZFxuICAgIGxldCBzb3VyY2VBdHRycyA9IHNvdXJjZS5hdHRyaWJ1dGVzXG4gICAgZm9yKGxldCBpID0gc291cmNlQXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgbGV0IG5hbWUgPSBzb3VyY2VBdHRyc1tpXS5uYW1lXG4gICAgICBpZihleGNsdWRlLmluZGV4T2YobmFtZSkgPCAwKXsgdGFyZ2V0LnNldEF0dHJpYnV0ZShuYW1lLCBzb3VyY2UuZ2V0QXR0cmlidXRlKG5hbWUpKSB9XG4gICAgfVxuXG4gICAgbGV0IHRhcmdldEF0dHJzID0gdGFyZ2V0LmF0dHJpYnV0ZXNcbiAgICBmb3IobGV0IGkgPSB0YXJnZXRBdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICBsZXQgbmFtZSA9IHRhcmdldEF0dHJzW2ldLm5hbWVcbiAgICAgIGlmKGlzSWdub3JlZCl7XG4gICAgICAgIGlmKG5hbWUuc3RhcnRzV2l0aChcImRhdGEtXCIpICYmICFzb3VyY2UuaGFzQXR0cmlidXRlKG5hbWUpKXsgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZighc291cmNlLmhhc0F0dHJpYnV0ZShuYW1lKSl7IHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXJnZUZvY3VzZWRJbnB1dCh0YXJnZXQsIHNvdXJjZSl7XG4gICAgLy8gc2tpcCBzZWxlY3RzIGJlY2F1c2UgRkYgd2lsbCByZXNldCBoaWdobGlnaHRlZCBpbmRleCBmb3IgYW55IHNldEF0dHJpYnV0ZVxuICAgIGlmKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpKXsgRE9NLm1lcmdlQXR0cnModGFyZ2V0LCBzb3VyY2UsIHtleGNsdWRlOiBbXCJ2YWx1ZVwiXX0pIH1cbiAgICBpZihzb3VyY2UucmVhZE9ubHkpe1xuICAgICAgdGFyZ2V0LnNldEF0dHJpYnV0ZShcInJlYWRvbmx5XCIsIHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUoXCJyZWFkb25seVwiKVxuICAgIH1cbiAgfSxcblxuICBoYXNTZWxlY3Rpb25SYW5nZShlbCl7XG4gICAgcmV0dXJuIGVsLnNldFNlbGVjdGlvblJhbmdlICYmIChlbC50eXBlID09PSBcInRleHRcIiB8fCBlbC50eXBlID09PSBcInRleHRhcmVhXCIpXG4gIH0sXG5cbiAgcmVzdG9yZUZvY3VzKGZvY3VzZWQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpe1xuICAgIGlmKCFET00uaXNUZXh0dWFsSW5wdXQoZm9jdXNlZCkpeyByZXR1cm4gfVxuICAgIGxldCB3YXNGb2N1c2VkID0gZm9jdXNlZC5tYXRjaGVzKFwiOmZvY3VzXCIpXG4gICAgaWYoZm9jdXNlZC5yZWFkT25seSl7IGZvY3VzZWQuYmx1cigpIH1cbiAgICBpZighd2FzRm9jdXNlZCl7IGZvY3VzZWQuZm9jdXMoKSB9XG4gICAgaWYodGhpcy5oYXNTZWxlY3Rpb25SYW5nZShmb2N1c2VkKSl7XG4gICAgICBmb2N1c2VkLnNldFNlbGVjdGlvblJhbmdlKHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpXG4gICAgfVxuICB9LFxuXG4gIGlzRm9ybUlucHV0KGVsKXsgcmV0dXJuIC9eKD86aW5wdXR8c2VsZWN0fHRleHRhcmVhKSQvaS50ZXN0KGVsLnRhZ05hbWUpICYmIGVsLnR5cGUgIT09IFwiYnV0dG9uXCIgfSxcblxuICBzeW5jQXR0cnNUb1Byb3BzKGVsKXtcbiAgICBpZihlbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgJiYgQ0hFQ0tBQkxFX0lOUFVUUy5pbmRleE9mKGVsLnR5cGUudG9Mb2NhbGVMb3dlckNhc2UoKSkgPj0gMCl7XG4gICAgICBlbC5jaGVja2VkID0gZWwuZ2V0QXR0cmlidXRlKFwiY2hlY2tlZFwiKSAhPT0gbnVsbFxuICAgIH1cbiAgfSxcblxuICBpc1RleHR1YWxJbnB1dChlbCl7IHJldHVybiBGT0NVU0FCTEVfSU5QVVRTLmluZGV4T2YoZWwudHlwZSkgPj0gMCB9LFxuXG4gIGlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKXtcbiAgICByZXR1cm4gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShwaHhUcmlnZ2VyRXh0ZXJuYWwpICE9PSBudWxsXG4gIH0sXG5cbiAgc3luY1BlbmRpbmdSZWYoZnJvbUVsLCB0b0VsLCBkaXNhYmxlV2l0aCl7XG4gICAgbGV0IHJlZiA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1JFRilcbiAgICBpZihyZWYgPT09IG51bGwpeyByZXR1cm4gdHJ1ZSB9XG4gICAgbGV0IHJlZlNyYyA9IGZyb21FbC5nZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpXG5cbiAgICBpZihET00uaXNGb3JtSW5wdXQoZnJvbUVsKSB8fCBmcm9tRWwuZ2V0QXR0cmlidXRlKGRpc2FibGVXaXRoKSAhPT0gbnVsbCl7XG4gICAgICBpZihET00uaXNVcGxvYWRJbnB1dChmcm9tRWwpKXsgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7aXNJZ25vcmVkOiB0cnVlfSkgfVxuICAgICAgRE9NLnB1dFByaXZhdGUoZnJvbUVsLCBQSFhfUkVGLCB0b0VsKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIFBIWF9FVkVOVF9DTEFTU0VTLmZvckVhY2goY2xhc3NOYW1lID0+IHtcbiAgICAgICAgZnJvbUVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpICYmIHRvRWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXG4gICAgICB9KVxuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRiwgcmVmKVxuICAgICAgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMsIHJlZlNyYylcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9LFxuXG4gIGNsZWFuQ2hpbGROb2Rlcyhjb250YWluZXIsIHBoeFVwZGF0ZSl7XG4gICAgaWYoRE9NLmlzUGh4VXBkYXRlKGNvbnRhaW5lciwgcGh4VXBkYXRlLCBbXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSl7XG4gICAgICBsZXQgdG9SZW1vdmUgPSBbXVxuICAgICAgY29udGFpbmVyLmNoaWxkTm9kZXMuZm9yRWFjaChjaGlsZE5vZGUgPT4ge1xuICAgICAgICBpZighY2hpbGROb2RlLmlkKXtcbiAgICAgICAgICAvLyBTa2lwIHdhcm5pbmcgaWYgaXQncyBhbiBlbXB0eSB0ZXh0IG5vZGUgKGUuZy4gYSBuZXctbGluZSlcbiAgICAgICAgICBsZXQgaXNFbXB0eVRleHROb2RlID0gY2hpbGROb2RlLm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSAmJiBjaGlsZE5vZGUubm9kZVZhbHVlLnRyaW0oKSA9PT0gXCJcIlxuICAgICAgICAgIGlmKCFpc0VtcHR5VGV4dE5vZGUpe1xuICAgICAgICAgICAgbG9nRXJyb3IoXCJvbmx5IEhUTUwgZWxlbWVudCB0YWdzIHdpdGggYW4gaWQgYXJlIGFsbG93ZWQgaW5zaWRlIGNvbnRhaW5lcnMgd2l0aCBwaHgtdXBkYXRlLlxcblxcblwiICtcbiAgICAgICAgICAgICAgYHJlbW92aW5nIGlsbGVnYWwgbm9kZTogXCIkeyhjaGlsZE5vZGUub3V0ZXJIVE1MIHx8IGNoaWxkTm9kZS5ub2RlVmFsdWUpLnRyaW0oKX1cIlxcblxcbmApXG4gICAgICAgICAgfVxuICAgICAgICAgIHRvUmVtb3ZlLnB1c2goY2hpbGROb2RlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdG9SZW1vdmUuZm9yRWFjaChjaGlsZE5vZGUgPT4gY2hpbGROb2RlLnJlbW92ZSgpKVxuICAgIH1cbiAgfSxcblxuICByZXBsYWNlUm9vdENvbnRhaW5lcihjb250YWluZXIsIHRhZ05hbWUsIGF0dHJzKXtcbiAgICBsZXQgcmV0YWluZWRBdHRycyA9IG5ldyBTZXQoW1wiaWRcIiwgUEhYX1NFU1NJT04sIFBIWF9TVEFUSUMsIFBIWF9NQUlOLCBQSFhfUk9PVF9JRF0pXG4gICAgaWYoY29udGFpbmVyLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpKXtcbiAgICAgIEFycmF5LmZyb20oY29udGFpbmVyLmF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoYXR0ciA9PiAhcmV0YWluZWRBdHRycy5oYXMoYXR0ci5uYW1lLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyID0+IGNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5uYW1lKSlcblxuICAgICAgT2JqZWN0LmtleXMoYXR0cnMpXG4gICAgICAgIC5maWx0ZXIobmFtZSA9PiAhcmV0YWluZWRBdHRycy5oYXMobmFtZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgLmZvckVhY2goYXR0ciA9PiBjb250YWluZXIuc2V0QXR0cmlidXRlKGF0dHIsIGF0dHJzW2F0dHJdKSlcblxuICAgICAgcmV0dXJuIGNvbnRhaW5lclxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZXdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpXG4gICAgICBPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChhdHRyID0+IG5ld0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cnNbYXR0cl0pKVxuICAgICAgcmV0YWluZWRBdHRycy5mb3JFYWNoKGF0dHIgPT4gbmV3Q29udGFpbmVyLnNldEF0dHJpYnV0ZShhdHRyLCBjb250YWluZXIuZ2V0QXR0cmlidXRlKGF0dHIpKSlcbiAgICAgIG5ld0NvbnRhaW5lci5pbm5lckhUTUwgPSBjb250YWluZXIuaW5uZXJIVE1MXG4gICAgICBjb250YWluZXIucmVwbGFjZVdpdGgobmV3Q29udGFpbmVyKVxuICAgICAgcmV0dXJuIG5ld0NvbnRhaW5lclxuICAgIH1cbiAgfSxcblxuICBnZXRTdGlja3koZWwsIG5hbWUsIGRlZmF1bHRWYWwpe1xuICAgIGxldCBvcCA9IChET00ucHJpdmF0ZShlbCwgXCJzdGlja3lcIikgfHwgW10pLmZpbmQoKFtleGlzdGluZ05hbWUsIF0pID0+IG5hbWUgPT09IGV4aXN0aW5nTmFtZSlcbiAgICBpZihvcCl7XG4gICAgICBsZXQgW19uYW1lLCBfb3AsIHN0YXNoZWRSZXN1bHRdID0gb3BcbiAgICAgIHJldHVybiBzdGFzaGVkUmVzdWx0XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0eXBlb2YoZGVmYXVsdFZhbCkgPT09IFwiZnVuY3Rpb25cIiA/IGRlZmF1bHRWYWwoKSA6IGRlZmF1bHRWYWxcbiAgICB9XG4gIH0sXG5cbiAgZGVsZXRlU3RpY2t5KGVsLCBuYW1lKXtcbiAgICB0aGlzLnVwZGF0ZVByaXZhdGUoZWwsIFwic3RpY2t5XCIsIFtdLCBvcHMgPT4ge1xuICAgICAgcmV0dXJuIG9wcy5maWx0ZXIoKFtleGlzdGluZ05hbWUsIF9dKSA9PiBleGlzdGluZ05hbWUgIT09IG5hbWUpXG4gICAgfSlcbiAgfSxcblxuICBwdXRTdGlja3koZWwsIG5hbWUsIG9wKXtcbiAgICBsZXQgc3Rhc2hlZFJlc3VsdCA9IG9wKGVsKVxuICAgIHRoaXMudXBkYXRlUHJpdmF0ZShlbCwgXCJzdGlja3lcIiwgW10sIG9wcyA9PiB7XG4gICAgICBsZXQgZXhpc3RpbmdJbmRleCA9IG9wcy5maW5kSW5kZXgoKFtleGlzdGluZ05hbWUsIF0pID0+IG5hbWUgPT09IGV4aXN0aW5nTmFtZSlcbiAgICAgIGlmKGV4aXN0aW5nSW5kZXggPj0gMCl7XG4gICAgICAgIG9wc1tleGlzdGluZ0luZGV4XSA9IFtuYW1lLCBvcCwgc3Rhc2hlZFJlc3VsdF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wcy5wdXNoKFtuYW1lLCBvcCwgc3Rhc2hlZFJlc3VsdF0pXG4gICAgICB9XG4gICAgICByZXR1cm4gb3BzXG4gICAgfSlcbiAgfSxcblxuICBhcHBseVN0aWNreU9wZXJhdGlvbnMoZWwpe1xuICAgIGxldCBvcHMgPSBET00ucHJpdmF0ZShlbCwgXCJzdGlja3lcIilcbiAgICBpZighb3BzKXsgcmV0dXJuIH1cblxuICAgIG9wcy5mb3JFYWNoKChbbmFtZSwgb3AsIF9zdGFzaGVkXSkgPT4gdGhpcy5wdXRTdGlja3koZWwsIG5hbWUsIG9wKSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBET01cbiIsICJpbXBvcnQge1xuICBQSFhfQUNUSVZFX0VOVFJZX1JFRlMsXG4gIFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2hhbm5lbFVwbG9hZGVyLFxuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVwbG9hZEVudHJ5IHtcbiAgc3RhdGljIGlzQWN0aXZlKGZpbGVFbCwgZmlsZSl7XG4gICAgbGV0IGlzTmV3ID0gZmlsZS5fcGh4UmVmID09PSB1bmRlZmluZWRcbiAgICBsZXQgYWN0aXZlUmVmcyA9IGZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX0FDVElWRV9FTlRSWV9SRUZTKS5zcGxpdChcIixcIilcbiAgICBsZXQgaXNBY3RpdmUgPSBhY3RpdmVSZWZzLmluZGV4T2YoTGl2ZVVwbG9hZGVyLmdlbkZpbGVSZWYoZmlsZSkpID49IDBcbiAgICByZXR1cm4gZmlsZS5zaXplID4gMCAmJiAoaXNOZXcgfHwgaXNBY3RpdmUpXG4gIH1cblxuICBzdGF0aWMgaXNQcmVmbGlnaHRlZChmaWxlRWwsIGZpbGUpe1xuICAgIGxldCBwcmVmbGlnaHRlZFJlZnMgPSBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9QUkVGTElHSFRFRF9SRUZTKS5zcGxpdChcIixcIilcbiAgICBsZXQgaXNQcmVmbGlnaHRlZCA9IHByZWZsaWdodGVkUmVmcy5pbmRleE9mKExpdmVVcGxvYWRlci5nZW5GaWxlUmVmKGZpbGUpKSA+PSAwXG4gICAgcmV0dXJuIGlzUHJlZmxpZ2h0ZWQgJiYgdGhpcy5pc0FjdGl2ZShmaWxlRWwsIGZpbGUpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihmaWxlRWwsIGZpbGUsIHZpZXcpe1xuICAgIHRoaXMucmVmID0gTGl2ZVVwbG9hZGVyLmdlbkZpbGVSZWYoZmlsZSlcbiAgICB0aGlzLmZpbGVFbCA9IGZpbGVFbFxuICAgIHRoaXMuZmlsZSA9IGZpbGVcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5tZXRhID0gbnVsbFxuICAgIHRoaXMuX2lzQ2FuY2VsbGVkID0gZmFsc2VcbiAgICB0aGlzLl9pc0RvbmUgPSBmYWxzZVxuICAgIHRoaXMuX3Byb2dyZXNzID0gMFxuICAgIHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQgPSAtMVxuICAgIHRoaXMuX29uRG9uZSA9IGZ1bmN0aW9uICgpeyB9XG4gICAgdGhpcy5fb25FbFVwZGF0ZWQgPSB0aGlzLm9uRWxVcGRhdGVkLmJpbmQodGhpcylcbiAgICB0aGlzLmZpbGVFbC5hZGRFdmVudExpc3RlbmVyKFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCwgdGhpcy5fb25FbFVwZGF0ZWQpXG4gIH1cblxuICBtZXRhZGF0YSgpeyByZXR1cm4gdGhpcy5tZXRhIH1cblxuICBwcm9ncmVzcyhwcm9ncmVzcyl7XG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSBNYXRoLmZsb29yKHByb2dyZXNzKVxuICAgIGlmKHRoaXMuX3Byb2dyZXNzID4gdGhpcy5fbGFzdFByb2dyZXNzU2VudCl7XG4gICAgICBpZih0aGlzLl9wcm9ncmVzcyA+PSAxMDApe1xuICAgICAgICB0aGlzLl9wcm9ncmVzcyA9IDEwMFxuICAgICAgICB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50ID0gMTAwXG4gICAgICAgIHRoaXMuX2lzRG9uZSA9IHRydWVcbiAgICAgICAgdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsIHRoaXMucmVmLCAxMDAsICgpID0+IHtcbiAgICAgICAgICBMaXZlVXBsb2FkZXIudW50cmFja0ZpbGUodGhpcy5maWxlRWwsIHRoaXMuZmlsZSlcbiAgICAgICAgICB0aGlzLl9vbkRvbmUoKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fbGFzdFByb2dyZXNzU2VudCA9IHRoaXMuX3Byb2dyZXNzXG4gICAgICAgIHRoaXMudmlldy5wdXNoRmlsZVByb2dyZXNzKHRoaXMuZmlsZUVsLCB0aGlzLnJlZiwgdGhpcy5fcHJvZ3Jlc3MpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsKCl7XG4gICAgdGhpcy5faXNDYW5jZWxsZWQgPSB0cnVlXG4gICAgdGhpcy5faXNEb25lID0gdHJ1ZVxuICAgIHRoaXMuX29uRG9uZSgpXG4gIH1cblxuICBpc0RvbmUoKXsgcmV0dXJuIHRoaXMuX2lzRG9uZSB9XG5cbiAgZXJyb3IocmVhc29uID0gXCJmYWlsZWRcIil7XG4gICAgdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsIHRoaXMucmVmLCB7ZXJyb3I6IHJlYXNvbn0pXG4gICAgTGl2ZVVwbG9hZGVyLmNsZWFyRmlsZXModGhpcy5maWxlRWwpXG4gIH1cblxuICAvL3ByaXZhdGVcblxuICBvbkRvbmUoY2FsbGJhY2spe1xuICAgIHRoaXMuX29uRG9uZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuZmlsZUVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoUEhYX0xJVkVfRklMRV9VUERBVEVELCB0aGlzLl9vbkVsVXBkYXRlZClcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICBvbkVsVXBkYXRlZCgpe1xuICAgIGxldCBhY3RpdmVSZWZzID0gdGhpcy5maWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9BQ1RJVkVfRU5UUllfUkVGUykuc3BsaXQoXCIsXCIpXG4gICAgaWYoYWN0aXZlUmVmcy5pbmRleE9mKHRoaXMucmVmKSA9PT0gLTEpeyB0aGlzLmNhbmNlbCgpIH1cbiAgfVxuXG4gIHRvUHJlZmxpZ2h0UGF5bG9hZCgpe1xuICAgIHJldHVybiB7XG4gICAgICBsYXN0X21vZGlmaWVkOiB0aGlzLmZpbGUubGFzdE1vZGlmaWVkLFxuICAgICAgbmFtZTogdGhpcy5maWxlLm5hbWUsXG4gICAgICBzaXplOiB0aGlzLmZpbGUuc2l6ZSxcbiAgICAgIHR5cGU6IHRoaXMuZmlsZS50eXBlLFxuICAgICAgcmVmOiB0aGlzLnJlZlxuICAgIH1cbiAgfVxuXG4gIHVwbG9hZGVyKHVwbG9hZGVycyl7XG4gICAgaWYodGhpcy5tZXRhLnVwbG9hZGVyKXtcbiAgICAgIGxldCBjYWxsYmFjayA9IHVwbG9hZGVyc1t0aGlzLm1ldGEudXBsb2FkZXJdIHx8IGxvZ0Vycm9yKGBubyB1cGxvYWRlciBjb25maWd1cmVkIGZvciAke3RoaXMubWV0YS51cGxvYWRlcn1gKVxuICAgICAgcmV0dXJuIHtuYW1lOiB0aGlzLm1ldGEudXBsb2FkZXIsIGNhbGxiYWNrOiBjYWxsYmFja31cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHtuYW1lOiBcImNoYW5uZWxcIiwgY2FsbGJhY2s6IGNoYW5uZWxVcGxvYWRlcn1cbiAgICB9XG4gIH1cblxuICB6aXBQb3N0RmxpZ2h0KHJlc3Ape1xuICAgIHRoaXMubWV0YSA9IHJlc3AuZW50cmllc1t0aGlzLnJlZl1cbiAgICBpZighdGhpcy5tZXRhKXsgbG9nRXJyb3IoYG5vIHByZWZsaWdodCB1cGxvYWQgcmVzcG9uc2UgcmV0dXJuZWQgd2l0aCByZWYgJHt0aGlzLnJlZn1gLCB7aW5wdXQ6IHRoaXMuZmlsZUVsLCByZXNwb25zZTogcmVzcH0pIH1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIFBIWF9ET05FX1JFRlMsXG4gIFBIWF9QUkVGTElHSFRFRF9SRUZTLFxuICBQSFhfVVBMT0FEX1JFRlxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBVcGxvYWRFbnRyeSBmcm9tIFwiLi91cGxvYWRfZW50cnlcIlxuXG5sZXQgbGl2ZVVwbG9hZGVyRmlsZVJlZiA9IDBcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGl2ZVVwbG9hZGVyIHtcbiAgc3RhdGljIGdlbkZpbGVSZWYoZmlsZSl7XG4gICAgbGV0IHJlZiA9IGZpbGUuX3BoeFJlZlxuICAgIGlmKHJlZiAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIHJldHVybiByZWZcbiAgICB9IGVsc2Uge1xuICAgICAgZmlsZS5fcGh4UmVmID0gKGxpdmVVcGxvYWRlckZpbGVSZWYrKykudG9TdHJpbmcoKVxuICAgICAgcmV0dXJuIGZpbGUuX3BoeFJlZlxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRFbnRyeURhdGFVUkwoaW5wdXRFbCwgcmVmLCBjYWxsYmFjayl7XG4gICAgbGV0IGZpbGUgPSB0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpLmZpbmQoZmlsZSA9PiB0aGlzLmdlbkZpbGVSZWYoZmlsZSkgPT09IHJlZilcbiAgICBjYWxsYmFjayhVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpKVxuICB9XG5cbiAgc3RhdGljIGhhc1VwbG9hZHNJblByb2dyZXNzKGZvcm1FbCl7XG4gICAgbGV0IGFjdGl2ZSA9IDBcbiAgICBET00uZmluZFVwbG9hZElucHV0cyhmb3JtRWwpLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgaWYoaW5wdXQuZ2V0QXR0cmlidXRlKFBIWF9QUkVGTElHSFRFRF9SRUZTKSAhPT0gaW5wdXQuZ2V0QXR0cmlidXRlKFBIWF9ET05FX1JFRlMpKXtcbiAgICAgICAgYWN0aXZlKytcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBhY3RpdmUgPiAwXG4gIH1cblxuICBzdGF0aWMgc2VyaWFsaXplVXBsb2FkcyhpbnB1dEVsKXtcbiAgICBsZXQgZmlsZXMgPSB0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpXG4gICAgbGV0IGZpbGVEYXRhID0ge31cbiAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgbGV0IGVudHJ5ID0ge3BhdGg6IGlucHV0RWwubmFtZX1cbiAgICAgIGxldCB1cGxvYWRSZWYgPSBpbnB1dEVsLmdldEF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRilcbiAgICAgIGZpbGVEYXRhW3VwbG9hZFJlZl0gPSBmaWxlRGF0YVt1cGxvYWRSZWZdIHx8IFtdXG4gICAgICBlbnRyeS5yZWYgPSB0aGlzLmdlbkZpbGVSZWYoZmlsZSlcbiAgICAgIGVudHJ5Lm5hbWUgPSBmaWxlLm5hbWUgfHwgZW50cnkucmVmXG4gICAgICBlbnRyeS50eXBlID0gZmlsZS50eXBlXG4gICAgICBlbnRyeS5zaXplID0gZmlsZS5zaXplXG4gICAgICBmaWxlRGF0YVt1cGxvYWRSZWZdLnB1c2goZW50cnkpXG4gICAgfSlcbiAgICByZXR1cm4gZmlsZURhdGFcbiAgfVxuXG4gIHN0YXRpYyBjbGVhckZpbGVzKGlucHV0RWwpe1xuICAgIGlucHV0RWwudmFsdWUgPSBudWxsXG4gICAgaW5wdXRFbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpXG4gICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCBbXSlcbiAgfVxuXG4gIHN0YXRpYyB1bnRyYWNrRmlsZShpbnB1dEVsLCBmaWxlKXtcbiAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIERPTS5wcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIikuZmlsdGVyKGYgPT4gIU9iamVjdC5pcyhmLCBmaWxlKSkpXG4gIH1cblxuICBzdGF0aWMgdHJhY2tGaWxlcyhpbnB1dEVsLCBmaWxlcyl7XG4gICAgaWYoaW5wdXRFbC5nZXRBdHRyaWJ1dGUoXCJtdWx0aXBsZVwiKSAhPT0gbnVsbCl7XG4gICAgICBsZXQgbmV3RmlsZXMgPSBmaWxlcy5maWx0ZXIoZmlsZSA9PiAhdGhpcy5hY3RpdmVGaWxlcyhpbnB1dEVsKS5maW5kKGYgPT4gT2JqZWN0LmlzKGYsIGZpbGUpKSlcbiAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgdGhpcy5hY3RpdmVGaWxlcyhpbnB1dEVsKS5jb25jYXQobmV3RmlsZXMpKVxuICAgICAgaW5wdXRFbC52YWx1ZSA9IG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCBmaWxlcylcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYWN0aXZlRmlsZUlucHV0cyhmb3JtRWwpe1xuICAgIGxldCBmaWxlSW5wdXRzID0gRE9NLmZpbmRVcGxvYWRJbnB1dHMoZm9ybUVsKVxuICAgIHJldHVybiBBcnJheS5mcm9tKGZpbGVJbnB1dHMpLmZpbHRlcihlbCA9PiBlbC5maWxlcyAmJiB0aGlzLmFjdGl2ZUZpbGVzKGVsKS5sZW5ndGggPiAwKVxuICB9XG5cbiAgc3RhdGljIGFjdGl2ZUZpbGVzKGlucHV0KXtcbiAgICByZXR1cm4gKERPTS5wcml2YXRlKGlucHV0LCBcImZpbGVzXCIpIHx8IFtdKS5maWx0ZXIoZiA9PiBVcGxvYWRFbnRyeS5pc0FjdGl2ZShpbnB1dCwgZikpXG4gIH1cblxuICBzdGF0aWMgaW5wdXRzQXdhaXRpbmdQcmVmbGlnaHQoZm9ybUVsKXtcbiAgICBsZXQgZmlsZUlucHV0cyA9IERPTS5maW5kVXBsb2FkSW5wdXRzKGZvcm1FbClcbiAgICByZXR1cm4gQXJyYXkuZnJvbShmaWxlSW5wdXRzKS5maWx0ZXIoaW5wdXQgPT4gdGhpcy5maWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0KS5sZW5ndGggPiAwKVxuICB9XG5cbiAgc3RhdGljIGZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXQpe1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZUZpbGVzKGlucHV0KS5maWx0ZXIoZiA9PiAhVXBsb2FkRW50cnkuaXNQcmVmbGlnaHRlZChpbnB1dCwgZikpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihpbnB1dEVsLCB2aWV3LCBvbkNvbXBsZXRlKXtcbiAgICB0aGlzLnZpZXcgPSB2aWV3XG4gICAgdGhpcy5vbkNvbXBsZXRlID0gb25Db21wbGV0ZVxuICAgIHRoaXMuX2VudHJpZXMgPVxuICAgICAgQXJyYXkuZnJvbShMaXZlVXBsb2FkZXIuZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dEVsKSB8fCBbXSlcbiAgICAgICAgLm1hcChmaWxlID0+IG5ldyBVcGxvYWRFbnRyeShpbnB1dEVsLCBmaWxlLCB2aWV3KSlcblxuICAgIHRoaXMubnVtRW50cmllc0luUHJvZ3Jlc3MgPSB0aGlzLl9lbnRyaWVzLmxlbmd0aFxuICB9XG5cbiAgZW50cmllcygpeyByZXR1cm4gdGhpcy5fZW50cmllcyB9XG5cbiAgaW5pdEFkYXB0ZXJVcGxvYWQocmVzcCwgb25FcnJvciwgbGl2ZVNvY2tldCl7XG4gICAgdGhpcy5fZW50cmllcyA9XG4gICAgICB0aGlzLl9lbnRyaWVzLm1hcChlbnRyeSA9PiB7XG4gICAgICAgIGVudHJ5LnppcFBvc3RGbGlnaHQocmVzcClcbiAgICAgICAgZW50cnkub25Eb25lKCgpID0+IHtcbiAgICAgICAgICB0aGlzLm51bUVudHJpZXNJblByb2dyZXNzLS1cbiAgICAgICAgICBpZih0aGlzLm51bUVudHJpZXNJblByb2dyZXNzID09PSAwKXsgdGhpcy5vbkNvbXBsZXRlKCkgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gZW50cnlcbiAgICAgIH0pXG5cbiAgICBsZXQgZ3JvdXBlZEVudHJpZXMgPSB0aGlzLl9lbnRyaWVzLnJlZHVjZSgoYWNjLCBlbnRyeSkgPT4ge1xuICAgICAgbGV0IHtuYW1lLCBjYWxsYmFja30gPSBlbnRyeS51cGxvYWRlcihsaXZlU29ja2V0LnVwbG9hZGVycylcbiAgICAgIGFjY1tuYW1lXSA9IGFjY1tuYW1lXSB8fCB7Y2FsbGJhY2s6IGNhbGxiYWNrLCBlbnRyaWVzOiBbXX1cbiAgICAgIGFjY1tuYW1lXS5lbnRyaWVzLnB1c2goZW50cnkpXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwge30pXG5cbiAgICBmb3IobGV0IG5hbWUgaW4gZ3JvdXBlZEVudHJpZXMpe1xuICAgICAgbGV0IHtjYWxsYmFjaywgZW50cmllc30gPSBncm91cGVkRW50cmllc1tuYW1lXVxuICAgICAgY2FsbGJhY2soZW50cmllcywgb25FcnJvciwgcmVzcCwgbGl2ZVNvY2tldClcbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBQSFhfQUNUSVZFX0VOVFJZX1JFRlMsXG4gIFBIWF9MSVZFX0ZJTEVfVVBEQVRFRCxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlMsXG4gIFBIWF9VUExPQURfUkVGXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5cbmxldCBIb29rcyA9IHtcbiAgTGl2ZUZpbGVVcGxvYWQ6IHtcbiAgICBhY3RpdmVSZWZzKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfQUNUSVZFX0VOVFJZX1JFRlMpIH0sXG5cbiAgICBwcmVmbGlnaHRlZFJlZnMoKXsgcmV0dXJuIHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9QUkVGTElHSFRFRF9SRUZTKSB9LFxuXG4gICAgbW91bnRlZCgpeyB0aGlzLnByZWZsaWdodGVkV2FzID0gdGhpcy5wcmVmbGlnaHRlZFJlZnMoKSB9LFxuXG4gICAgdXBkYXRlZCgpe1xuICAgICAgbGV0IG5ld1ByZWZsaWdodHMgPSB0aGlzLnByZWZsaWdodGVkUmVmcygpXG4gICAgICBpZih0aGlzLnByZWZsaWdodGVkV2FzICE9PSBuZXdQcmVmbGlnaHRzKXtcbiAgICAgICAgdGhpcy5wcmVmbGlnaHRlZFdhcyA9IG5ld1ByZWZsaWdodHNcbiAgICAgICAgaWYobmV3UHJlZmxpZ2h0cyA9PT0gXCJcIil7XG4gICAgICAgICAgdGhpcy5fX3ZpZXcuY2FuY2VsU3VibWl0KHRoaXMuZWwuZm9ybSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZih0aGlzLmFjdGl2ZVJlZnMoKSA9PT0gXCJcIil7IHRoaXMuZWwudmFsdWUgPSBudWxsIH1cbiAgICAgIHRoaXMuZWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoUEhYX0xJVkVfRklMRV9VUERBVEVEKSlcbiAgICB9XG4gIH0sXG5cbiAgTGl2ZUltZ1ByZXZpZXc6IHtcbiAgICBtb3VudGVkKCl7XG4gICAgICB0aGlzLnJlZiA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1waHgtZW50cnktcmVmXCIpXG4gICAgICB0aGlzLmlucHV0RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRikpXG4gICAgICBMaXZlVXBsb2FkZXIuZ2V0RW50cnlEYXRhVVJMKHRoaXMuaW5wdXRFbCwgdGhpcy5yZWYsIHVybCA9PiB7XG4gICAgICAgIHRoaXMudXJsID0gdXJsXG4gICAgICAgIHRoaXMuZWwuc3JjID0gdXJsXG4gICAgICB9KVxuICAgIH0sXG4gICAgZGVzdHJveWVkKCl7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHRoaXMudXJsKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBIb29rc1xuIiwgImltcG9ydCB7XG4gIG1heWJlXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBET01Qb3N0TW9ycGhSZXN0b3JlciB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lckJlZm9yZSwgY29udGFpbmVyQWZ0ZXIsIHVwZGF0ZVR5cGUpe1xuICAgIGxldCBpZHNCZWZvcmUgPSBuZXcgU2V0KClcbiAgICBsZXQgaWRzQWZ0ZXIgPSBuZXcgU2V0KFsuLi5jb250YWluZXJBZnRlci5jaGlsZHJlbl0ubWFwKGNoaWxkID0+IGNoaWxkLmlkKSlcblxuICAgIGxldCBlbGVtZW50c1RvTW9kaWZ5ID0gW11cblxuICAgIEFycmF5LmZyb20oY29udGFpbmVyQmVmb3JlLmNoaWxkcmVuKS5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgIGlmKGNoaWxkLmlkKXsgLy8gYWxsIG9mIG91ciBjaGlsZHJlbiBzaG91bGQgYmUgZWxlbWVudHMgd2l0aCBpZHNcbiAgICAgICAgaWRzQmVmb3JlLmFkZChjaGlsZC5pZClcbiAgICAgICAgaWYoaWRzQWZ0ZXIuaGFzKGNoaWxkLmlkKSl7XG4gICAgICAgICAgbGV0IHByZXZpb3VzRWxlbWVudElkID0gY2hpbGQucHJldmlvdXNFbGVtZW50U2libGluZyAmJiBjaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLmlkXG4gICAgICAgICAgZWxlbWVudHNUb01vZGlmeS5wdXNoKHtlbGVtZW50SWQ6IGNoaWxkLmlkLCBwcmV2aW91c0VsZW1lbnRJZDogcHJldmlvdXNFbGVtZW50SWR9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIHRoaXMuY29udGFpbmVySWQgPSBjb250YWluZXJBZnRlci5pZFxuICAgIHRoaXMudXBkYXRlVHlwZSA9IHVwZGF0ZVR5cGVcbiAgICB0aGlzLmVsZW1lbnRzVG9Nb2RpZnkgPSBlbGVtZW50c1RvTW9kaWZ5XG4gICAgdGhpcy5lbGVtZW50SWRzVG9BZGQgPSBbLi4uaWRzQWZ0ZXJdLmZpbHRlcihpZCA9PiAhaWRzQmVmb3JlLmhhcyhpZCkpXG4gIH1cblxuICAvLyBXZSBkbyB0aGUgZm9sbG93aW5nIHRvIG9wdGltaXplIGFwcGVuZC9wcmVwZW5kIG9wZXJhdGlvbnM6XG4gIC8vICAgMSkgVHJhY2sgaWRzIG9mIG1vZGlmaWVkIGVsZW1lbnRzICYgb2YgbmV3IGVsZW1lbnRzXG4gIC8vICAgMikgQWxsIHRoZSBtb2RpZmllZCBlbGVtZW50cyBhcmUgcHV0IGJhY2sgaW4gdGhlIGNvcnJlY3QgcG9zaXRpb24gaW4gdGhlIERPTSB0cmVlXG4gIC8vICAgICAgYnkgc3RvcmluZyB0aGUgaWQgb2YgdGhlaXIgcHJldmlvdXMgc2libGluZ1xuICAvLyAgIDMpIE5ldyBlbGVtZW50cyBhcmUgZ29pbmcgdG8gYmUgcHV0IGluIHRoZSByaWdodCBwbGFjZSBieSBtb3JwaGRvbSBkdXJpbmcgYXBwZW5kLlxuICAvLyAgICAgIEZvciBwcmVwZW5kLCB3ZSBtb3ZlIHRoZW0gdG8gdGhlIGZpcnN0IHBvc2l0aW9uIGluIHRoZSBjb250YWluZXJcbiAgcGVyZm9ybSgpe1xuICAgIGxldCBjb250YWluZXIgPSBET00uYnlJZCh0aGlzLmNvbnRhaW5lcklkKVxuICAgIHRoaXMuZWxlbWVudHNUb01vZGlmeS5mb3JFYWNoKGVsZW1lbnRUb01vZGlmeSA9PiB7XG4gICAgICBpZihlbGVtZW50VG9Nb2RpZnkucHJldmlvdXNFbGVtZW50SWQpe1xuICAgICAgICBtYXliZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50VG9Nb2RpZnkucHJldmlvdXNFbGVtZW50SWQpLCBwcmV2aW91c0VsZW0gPT4ge1xuICAgICAgICAgIG1heWJlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb01vZGlmeS5lbGVtZW50SWQpLCBlbGVtID0+IHtcbiAgICAgICAgICAgIGxldCBpc0luUmlnaHRQbGFjZSA9IGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZyAmJiBlbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuaWQgPT0gcHJldmlvdXNFbGVtLmlkXG4gICAgICAgICAgICBpZighaXNJblJpZ2h0UGxhY2Upe1xuICAgICAgICAgICAgICBwcmV2aW91c0VsZW0uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJlbmRcIiwgZWxlbSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgZmlyc3QgZWxlbWVudCBpbiB0aGUgY29udGFpbmVyXG4gICAgICAgIG1heWJlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb01vZGlmeS5lbGVtZW50SWQpLCBlbGVtID0+IHtcbiAgICAgICAgICBsZXQgaXNJblJpZ2h0UGxhY2UgPSBlbGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgPT0gbnVsbFxuICAgICAgICAgIGlmKCFpc0luUmlnaHRQbGFjZSl7XG4gICAgICAgICAgICBjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBlbGVtKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgaWYodGhpcy51cGRhdGVUeXBlID09IFwicHJlcGVuZFwiKXtcbiAgICAgIHRoaXMuZWxlbWVudElkc1RvQWRkLnJldmVyc2UoKS5mb3JFYWNoKGVsZW1JZCA9PiB7XG4gICAgICAgIG1heWJlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1JZCksIGVsZW0gPT4gY29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgZWxlbSkpXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIiwgInZhciBET0NVTUVOVF9GUkFHTUVOVF9OT0RFID0gMTE7XG5cbmZ1bmN0aW9uIG1vcnBoQXR0cnMoZnJvbU5vZGUsIHRvTm9kZSkge1xuICAgIHZhciB0b05vZGVBdHRycyA9IHRvTm9kZS5hdHRyaWJ1dGVzO1xuICAgIHZhciBhdHRyO1xuICAgIHZhciBhdHRyTmFtZTtcbiAgICB2YXIgYXR0ck5hbWVzcGFjZVVSSTtcbiAgICB2YXIgYXR0clZhbHVlO1xuICAgIHZhciBmcm9tVmFsdWU7XG5cbiAgICAvLyBkb2N1bWVudC1mcmFnbWVudHMgZG9udCBoYXZlIGF0dHJpYnV0ZXMgc28gbGV0cyBub3QgZG8gYW55dGhpbmdcbiAgICBpZiAodG9Ob2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFIHx8IGZyb21Ob2RlLm5vZGVUeXBlID09PSBET0NVTUVOVF9GUkFHTUVOVF9OT0RFKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGF0dHJpYnV0ZXMgb24gb3JpZ2luYWwgRE9NIGVsZW1lbnRcbiAgICBmb3IgKHZhciBpID0gdG9Ob2RlQXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgYXR0ciA9IHRvTm9kZUF0dHJzW2ldO1xuICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuICAgICAgICBhdHRyVmFsdWUgPSBhdHRyLnZhbHVlO1xuXG4gICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoZnJvbVZhbHVlICE9PSBhdHRyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0ci5wcmVmaXggPT09ICd4bWxucycpe1xuICAgICAgICAgICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTsgLy8gSXQncyBub3QgYWxsb3dlZCB0byBzZXQgYW4gYXR0cmlidXRlIHdpdGggdGhlIFhNTE5TIG5hbWVzcGFjZSB3aXRob3V0IHNwZWNpZnlpbmcgdGhlIGB4bWxuc2AgcHJlZml4XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKTtcblxuICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSBleHRyYSBhdHRyaWJ1dGVzIGZvdW5kIG9uIHRoZSBvcmlnaW5hbCBET00gZWxlbWVudCB0aGF0XG4gICAgLy8gd2VyZW4ndCBmb3VuZCBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgdmFyIGZyb21Ob2RlQXR0cnMgPSBmcm9tTm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgZm9yICh2YXIgZCA9IGZyb21Ob2RlQXR0cnMubGVuZ3RoIC0gMTsgZCA+PSAwOyBkLS0pIHtcbiAgICAgICAgYXR0ciA9IGZyb21Ob2RlQXR0cnNbZF07XG4gICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICBhdHRyTmFtZXNwYWNlVVJJID0gYXR0ci5uYW1lc3BhY2VVUkk7XG5cbiAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5sb2NhbE5hbWUgfHwgYXR0ck5hbWU7XG5cbiAgICAgICAgICAgIGlmICghdG9Ob2RlLmhhc0F0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnJlbW92ZUF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdG9Ob2RlLmhhc0F0dHJpYnV0ZShhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgcmFuZ2U7IC8vIENyZWF0ZSBhIHJhbmdlIG9iamVjdCBmb3IgZWZmaWNlbnRseSByZW5kZXJpbmcgc3RyaW5ncyB0byBlbGVtZW50cy5cbnZhciBOU19YSFRNTCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcblxudmFyIGRvYyA9IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBkb2N1bWVudDtcbnZhciBIQVNfVEVNUExBVEVfU1VQUE9SVCA9ICEhZG9jICYmICdjb250ZW50JyBpbiBkb2MuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbnZhciBIQVNfUkFOR0VfU1VQUE9SVCA9ICEhZG9jICYmIGRvYy5jcmVhdGVSYW5nZSAmJiAnY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50JyBpbiBkb2MuY3JlYXRlUmFuZ2UoKTtcblxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRGcm9tVGVtcGxhdGUoc3RyKSB7XG4gICAgdmFyIHRlbXBsYXRlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gc3RyO1xuICAgIHJldHVybiB0ZW1wbGF0ZS5jb250ZW50LmNoaWxkTm9kZXNbMF07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50RnJvbVJhbmdlKHN0cikge1xuICAgIGlmICghcmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShkb2MuYm9keSk7XG4gICAgfVxuXG4gICAgdmFyIGZyYWdtZW50ID0gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KHN0cik7XG4gICAgcmV0dXJuIGZyYWdtZW50LmNoaWxkTm9kZXNbMF07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyYWdtZW50RnJvbVdyYXAoc3RyKSB7XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcbiAgICBmcmFnbWVudC5pbm5lckhUTUwgPSBzdHI7XG4gICAgcmV0dXJuIGZyYWdtZW50LmNoaWxkTm9kZXNbMF07XG59XG5cbi8qKlxuICogVGhpcyBpcyBhYm91dCB0aGUgc2FtZVxuICogdmFyIGh0bWwgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHN0ciwgJ3RleHQvaHRtbCcpO1xuICogcmV0dXJuIGh0bWwuYm9keS5maXJzdENoaWxkO1xuICpcbiAqIEBtZXRob2QgdG9FbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKi9cbmZ1bmN0aW9uIHRvRWxlbWVudChzdHIpIHtcbiAgICBzdHIgPSBzdHIudHJpbSgpO1xuICAgIGlmIChIQVNfVEVNUExBVEVfU1VQUE9SVCkge1xuICAgICAgLy8gYXZvaWQgcmVzdHJpY3Rpb25zIG9uIGNvbnRlbnQgZm9yIHRoaW5ncyBsaWtlIGA8dHI+PHRoPkhpPC90aD48L3RyPmAgd2hpY2hcbiAgICAgIC8vIGNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCBkb2Vzbid0IHN1cHBvcnRcbiAgICAgIC8vIDx0ZW1wbGF0ZT4gc3VwcG9ydCBub3QgYXZhaWxhYmxlIGluIElFXG4gICAgICByZXR1cm4gY3JlYXRlRnJhZ21lbnRGcm9tVGVtcGxhdGUoc3RyKTtcbiAgICB9IGVsc2UgaWYgKEhBU19SQU5HRV9TVVBQT1JUKSB7XG4gICAgICByZXR1cm4gY3JlYXRlRnJhZ21lbnRGcm9tUmFuZ2Uoc3RyKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlRnJhZ21lbnRGcm9tV3JhcChzdHIpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0d28gbm9kZSdzIG5hbWVzIGFyZSB0aGUgc2FtZS5cbiAqXG4gKiBOT1RFOiBXZSBkb24ndCBib3RoZXIgY2hlY2tpbmcgYG5hbWVzcGFjZVVSSWAgYmVjYXVzZSB5b3Ugd2lsbCBuZXZlciBmaW5kIHR3byBIVE1MIGVsZW1lbnRzIHdpdGggdGhlIHNhbWVcbiAqICAgICAgIG5vZGVOYW1lIGFuZCBkaWZmZXJlbnQgbmFtZXNwYWNlIFVSSXMuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGIgVGhlIHRhcmdldCBlbGVtZW50XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBjb21wYXJlTm9kZU5hbWVzKGZyb21FbCwgdG9FbCkge1xuICAgIHZhciBmcm9tTm9kZU5hbWUgPSBmcm9tRWwubm9kZU5hbWU7XG4gICAgdmFyIHRvTm9kZU5hbWUgPSB0b0VsLm5vZGVOYW1lO1xuICAgIHZhciBmcm9tQ29kZVN0YXJ0LCB0b0NvZGVTdGFydDtcblxuICAgIGlmIChmcm9tTm9kZU5hbWUgPT09IHRvTm9kZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZnJvbUNvZGVTdGFydCA9IGZyb21Ob2RlTmFtZS5jaGFyQ29kZUF0KDApO1xuICAgIHRvQ29kZVN0YXJ0ID0gdG9Ob2RlTmFtZS5jaGFyQ29kZUF0KDApO1xuXG4gICAgLy8gSWYgdGhlIHRhcmdldCBlbGVtZW50IGlzIGEgdmlydHVhbCBET00gbm9kZSBvciBTVkcgbm9kZSB0aGVuIHdlIG1heVxuICAgIC8vIG5lZWQgdG8gbm9ybWFsaXplIHRoZSB0YWcgbmFtZSBiZWZvcmUgY29tcGFyaW5nLiBOb3JtYWwgSFRNTCBlbGVtZW50cyB0aGF0IGFyZVxuICAgIC8vIGluIHRoZSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIlxuICAgIC8vIGFyZSBjb252ZXJ0ZWQgdG8gdXBwZXIgY2FzZVxuICAgIGlmIChmcm9tQ29kZVN0YXJ0IDw9IDkwICYmIHRvQ29kZVN0YXJ0ID49IDk3KSB7IC8vIGZyb20gaXMgdXBwZXIgYW5kIHRvIGlzIGxvd2VyXG4gICAgICAgIHJldHVybiBmcm9tTm9kZU5hbWUgPT09IHRvTm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2UgaWYgKHRvQ29kZVN0YXJ0IDw9IDkwICYmIGZyb21Db2RlU3RhcnQgPj0gOTcpIHsgLy8gdG8gaXMgdXBwZXIgYW5kIGZyb20gaXMgbG93ZXJcbiAgICAgICAgcmV0dXJuIHRvTm9kZU5hbWUgPT09IGZyb21Ob2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGVsZW1lbnQsIG9wdGlvbmFsbHkgd2l0aCBhIGtub3duIG5hbWVzcGFjZSBVUkkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIGVsZW1lbnQgbmFtZSwgZS5nLiAnZGl2JyBvciAnc3ZnJ1xuICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lc3BhY2VVUkldIHRoZSBlbGVtZW50J3MgbmFtZXNwYWNlIFVSSSwgaS5lLiB0aGUgdmFsdWUgb2ZcbiAqIGl0cyBgeG1sbnNgIGF0dHJpYnV0ZSBvciBpdHMgaW5mZXJyZWQgbmFtZXNwYWNlLlxuICpcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lLCBuYW1lc3BhY2VVUkkpIHtcbiAgICByZXR1cm4gIW5hbWVzcGFjZVVSSSB8fCBuYW1lc3BhY2VVUkkgPT09IE5TX1hIVE1MID9cbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnQobmFtZSkgOlxuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgbmFtZSk7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSBjaGlsZHJlbiBvZiBvbmUgRE9NIGVsZW1lbnQgdG8gYW5vdGhlciBET00gZWxlbWVudFxuICovXG5mdW5jdGlvbiBtb3ZlQ2hpbGRyZW4oZnJvbUVsLCB0b0VsKSB7XG4gICAgdmFyIGN1ckNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgIHZhciBuZXh0Q2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgdG9FbC5hcHBlbmRDaGlsZChjdXJDaGlsZCk7XG4gICAgICAgIGN1ckNoaWxkID0gbmV4dENoaWxkO1xuICAgIH1cbiAgICByZXR1cm4gdG9FbDtcbn1cblxuZnVuY3Rpb24gc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsIG5hbWUpIHtcbiAgICBpZiAoZnJvbUVsW25hbWVdICE9PSB0b0VsW25hbWVdKSB7XG4gICAgICAgIGZyb21FbFtuYW1lXSA9IHRvRWxbbmFtZV07XG4gICAgICAgIGlmIChmcm9tRWxbbmFtZV0pIHtcbiAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUobmFtZSwgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIHNwZWNpYWxFbEhhbmRsZXJzID0ge1xuICAgIE9QVElPTjogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHZhciBwYXJlbnROb2RlID0gZnJvbUVsLnBhcmVudE5vZGU7XG4gICAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50TmFtZSA9IHBhcmVudE5vZGUubm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChwYXJlbnROYW1lID09PSAnT1BUR1JPVVAnKSB7XG4gICAgICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBwYXJlbnROYW1lID0gcGFyZW50Tm9kZSAmJiBwYXJlbnROb2RlLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyZW50TmFtZSA9PT0gJ1NFTEVDVCcgJiYgIXBhcmVudE5vZGUuaGFzQXR0cmlidXRlKCdtdWx0aXBsZScpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZyb21FbC5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykgJiYgIXRvRWwuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgTVMgRWRnZSBidWcgd2hlcmUgdGhlICdzZWxlY3RlZCcgYXR0cmlidXRlIGNhbiBvbmx5IGJlXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZWQgaWYgc2V0IHRvIGEgbm9uLWVtcHR5IHZhbHVlOlxuICAgICAgICAgICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5taWNyb3NvZnQuY29tL2VuLXVzL21pY3Jvc29mdC1lZGdlL3BsYXRmb3JtL2lzc3Vlcy8xMjA4NzY3OS9cbiAgICAgICAgICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byByZXNldCBzZWxlY3QgZWxlbWVudCdzIHNlbGVjdGVkSW5kZXggdG8gLTEsIG90aGVyd2lzZSBzZXR0aW5nXG4gICAgICAgICAgICAgICAgLy8gZnJvbUVsLnNlbGVjdGVkIHVzaW5nIHRoZSBzeW5jQm9vbGVhbkF0dHJQcm9wIGJlbG93IGhhcyBubyBlZmZlY3QuXG4gICAgICAgICAgICAgICAgLy8gVGhlIGNvcnJlY3Qgc2VsZWN0ZWRJbmRleCB3aWxsIGJlIHNldCBpbiB0aGUgU0VMRUNUIHNwZWNpYWwgaGFuZGxlciBiZWxvdy5cbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnNlbGVjdGVkSW5kZXggPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ3NlbGVjdGVkJyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBUaGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSBpcyBzcGVjaWFsIGZvciB0aGUgPGlucHV0PiBlbGVtZW50IHNpbmNlIGl0IHNldHNcbiAgICAgKiB0aGUgaW5pdGlhbCB2YWx1ZS4gQ2hhbmdpbmcgdGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgd2l0aG91dCBjaGFuZ2luZyB0aGVcbiAgICAgKiBcInZhbHVlXCIgcHJvcGVydHkgd2lsbCBoYXZlIG5vIGVmZmVjdCBzaW5jZSBpdCBpcyBvbmx5IHVzZWQgdG8gdGhlIHNldCB0aGVcbiAgICAgKiBpbml0aWFsIHZhbHVlLiAgU2ltaWxhciBmb3IgdGhlIFwiY2hlY2tlZFwiIGF0dHJpYnV0ZSwgYW5kIFwiZGlzYWJsZWRcIi5cbiAgICAgKi9cbiAgICBJTlBVVDogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnY2hlY2tlZCcpO1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gdG9FbC52YWx1ZSkge1xuICAgICAgICAgICAgZnJvbUVsLnZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdG9FbC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgVEVYVEFSRUE6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSB0b0VsLnZhbHVlO1xuICAgICAgICBpZiAoZnJvbUVsLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgZnJvbUVsLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlyc3RDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgICAgICBpZiAoZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgLy8gTmVlZGVkIGZvciBJRS4gQXBwYXJlbnRseSBJRSBzZXRzIHRoZSBwbGFjZWhvbGRlciBhcyB0aGVcbiAgICAgICAgICAgIC8vIG5vZGUgdmFsdWUgYW5kIHZpc2UgdmVyc2EuIFRoaXMgaWdub3JlcyBhbiBlbXB0eSB1cGRhdGUuXG4gICAgICAgICAgICB2YXIgb2xkVmFsdWUgPSBmaXJzdENoaWxkLm5vZGVWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKG9sZFZhbHVlID09IG5ld1ZhbHVlIHx8ICghbmV3VmFsdWUgJiYgb2xkVmFsdWUgPT0gZnJvbUVsLnBsYWNlaG9sZGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgU0VMRUNUOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgaWYgKCF0b0VsLmhhc0F0dHJpYnV0ZSgnbXVsdGlwbGUnKSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSW5kZXggPSAtMTtcbiAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgdG8gbG9vcCB0aHJvdWdoIGNoaWxkcmVuIG9mIGZyb21FbCwgbm90IHRvRWwgc2luY2Ugbm9kZXMgY2FuIGJlIG1vdmVkXG4gICAgICAgICAgICAvLyBmcm9tIHRvRWwgdG8gZnJvbUVsIGRpcmVjdGx5IHdoZW4gbW9ycGhpbmcuXG4gICAgICAgICAgICAvLyBBdCB0aGUgdGltZSB0aGlzIHNwZWNpYWwgaGFuZGxlciBpcyBpbnZva2VkLCBhbGwgY2hpbGRyZW4gaGF2ZSBhbHJlYWR5IGJlZW4gbW9ycGhlZFxuICAgICAgICAgICAgLy8gYW5kIGFwcGVuZGVkIHRvIC8gcmVtb3ZlZCBmcm9tIGZyb21FbCwgc28gdXNpbmcgZnJvbUVsIGhlcmUgaXMgc2FmZSBhbmQgY29ycmVjdC5cbiAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIG9wdGdyb3VwO1xuICAgICAgICAgICAgdmFyIG5vZGVOYW1lO1xuICAgICAgICAgICAgd2hpbGUoY3VyQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBub2RlTmFtZSA9IGN1ckNoaWxkLm5vZGVOYW1lICYmIGN1ckNoaWxkLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVOYW1lID09PSAnT1BUR1JPVVAnKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGdyb3VwID0gY3VyQ2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gb3B0Z3JvdXAuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZU5hbWUgPT09ICdPUFRJT04nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2hpbGQuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjdXJDaGlsZCAmJiBvcHRncm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBvcHRncm91cC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGdyb3VwID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnJvbUVsLnNlbGVjdGVkSW5kZXggPSBzZWxlY3RlZEluZGV4O1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIEVMRU1FTlRfTk9ERSA9IDE7XG52YXIgRE9DVU1FTlRfRlJBR01FTlRfTk9ERSQxID0gMTE7XG52YXIgVEVYVF9OT0RFID0gMztcbnZhciBDT01NRU5UX05PREUgPSA4O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gZGVmYXVsdEdldE5vZGVLZXkobm9kZSkge1xuICBpZiAobm9kZSkge1xuICAgICAgcmV0dXJuIChub2RlLmdldEF0dHJpYnV0ZSAmJiBub2RlLmdldEF0dHJpYnV0ZSgnaWQnKSkgfHwgbm9kZS5pZDtcbiAgfVxufVxuXG5mdW5jdGlvbiBtb3JwaGRvbUZhY3RvcnkobW9ycGhBdHRycykge1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG1vcnBoZG9tKGZyb21Ob2RlLCB0b05vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHRvTm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJyNkb2N1bWVudCcgfHwgZnJvbU5vZGUubm9kZU5hbWUgPT09ICdIVE1MJyB8fCBmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvTm9kZUh0bWwgPSB0b05vZGU7XG4gICAgICAgICAgICAgICAgdG9Ob2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcbiAgICAgICAgICAgICAgICB0b05vZGUuaW5uZXJIVE1MID0gdG9Ob2RlSHRtbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdG9Ob2RlID0gdG9FbGVtZW50KHRvTm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ2V0Tm9kZUtleSA9IG9wdGlvbnMuZ2V0Tm9kZUtleSB8fCBkZWZhdWx0R2V0Tm9kZUtleTtcbiAgICAgICAgdmFyIG9uQmVmb3JlTm9kZUFkZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVBZGRlZCB8fCBub29wO1xuICAgICAgICB2YXIgb25Ob2RlQWRkZWQgPSBvcHRpb25zLm9uTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBvbkJlZm9yZUVsVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIG9uRWxVcGRhdGVkID0gb3B0aW9ucy5vbkVsVXBkYXRlZCB8fCBub29wO1xuICAgICAgICB2YXIgb25CZWZvcmVOb2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIG9uTm9kZURpc2NhcmRlZCA9IG9wdGlvbnMub25Ob2RlRGlzY2FyZGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBjaGlsZHJlbk9ubHkgPSBvcHRpb25zLmNoaWxkcmVuT25seSA9PT0gdHJ1ZTtcblxuICAgICAgICAvLyBUaGlzIG9iamVjdCBpcyB1c2VkIGFzIGEgbG9va3VwIHRvIHF1aWNrbHkgZmluZCBhbGwga2V5ZWQgZWxlbWVudHMgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLlxuICAgICAgICB2YXIgZnJvbU5vZGVzTG9va3VwID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIGtleWVkUmVtb3ZhbExpc3QgPSBbXTtcblxuICAgICAgICBmdW5jdGlvbiBhZGRLZXllZFJlbW92YWwoa2V5KSB7XG4gICAgICAgICAgICBrZXllZFJlbW92YWxMaXN0LnB1c2goa2V5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUsIHNraXBLZXllZE5vZGVzKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNraXBLZXllZE5vZGVzICYmIChrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBza2lwcGluZyBrZXllZCBub2RlcyB0aGVuIHdlIGFkZCB0aGUga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBhIGxpc3Qgc28gdGhhdCBpdCBjYW4gYmUgaGFuZGxlZCBhdCB0aGUgdmVyeSBlbmQuXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgcmVwb3J0IHRoZSBub2RlIGFzIGRpc2NhcmRlZCBpZiBpdCBpcyBub3Qga2V5ZWQuIFdlIGRvIHRoaXMgYmVjYXVzZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXQgdGhlIGVuZCB3ZSBsb29wIHRocm91Z2ggYWxsIGtleWVkIGVsZW1lbnRzIHRoYXQgd2VyZSB1bm1hdGNoZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFuZCB0aGVuIGRpc2NhcmQgdGhlbSBpbiBvbmUgZmluYWwgcGFzcy5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2hpbGQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKGN1ckNoaWxkLCBza2lwS2V5ZWROb2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmVzIGEgRE9NIG5vZGUgb3V0IG9mIHRoZSBvcmlnaW5hbCBET01cbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBUaGUgbm9kZSB0byByZW1vdmVcbiAgICAgICAgICogQHBhcmFtICB7Tm9kZX0gcGFyZW50Tm9kZSBUaGUgbm9kZXMgcGFyZW50XG4gICAgICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHNraXBLZXllZE5vZGVzIElmIHRydWUgdGhlbiBlbGVtZW50cyB3aXRoIGtleXMgd2lsbCBiZSBza2lwcGVkIGFuZCBub3QgZGlzY2FyZGVkLlxuICAgICAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUsIHBhcmVudE5vZGUsIHNraXBLZXllZE5vZGVzKSB7XG4gICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlRGlzY2FyZGVkKG5vZGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQobm9kZSk7XG4gICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2Rlcyhub2RlLCBza2lwS2V5ZWROb2Rlcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAvLyBUcmVlV2Fsa2VyIGltcGxlbWVudGF0aW9uIGlzIG5vIGZhc3RlciwgYnV0IGtlZXBpbmcgdGhpcyBhcm91bmQgaW4gY2FzZSB0aGlzIGNoYW5nZXMgaW4gdGhlIGZ1dHVyZVxuICAgICAgICAvLyBmdW5jdGlvbiBpbmRleFRyZWUocm9vdCkge1xuICAgICAgICAvLyAgICAgdmFyIHRyZWVXYWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKFxuICAgICAgICAvLyAgICAgICAgIHJvb3QsXG4gICAgICAgIC8vICAgICAgICAgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgdmFyIGVsO1xuICAgICAgICAvLyAgICAgd2hpbGUoKGVsID0gdHJlZVdhbGtlci5uZXh0Tm9kZSgpKSkge1xuICAgICAgICAvLyAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGVsKTtcbiAgICAgICAgLy8gICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gZWw7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgLy8gLy8gTm9kZUl0ZXJhdG9yIGltcGxlbWVudGF0aW9uIGlzIG5vIGZhc3RlciwgYnV0IGtlZXBpbmcgdGhpcyBhcm91bmQgaW4gY2FzZSB0aGlzIGNoYW5nZXMgaW4gdGhlIGZ1dHVyZVxuICAgICAgICAvL1xuICAgICAgICAvLyBmdW5jdGlvbiBpbmRleFRyZWUobm9kZSkge1xuICAgICAgICAvLyAgICAgdmFyIG5vZGVJdGVyYXRvciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcihub2RlLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCk7XG4gICAgICAgIC8vICAgICB2YXIgZWw7XG4gICAgICAgIC8vICAgICB3aGlsZSgoZWwgPSBub2RlSXRlcmF0b3IubmV4dE5vZGUoKSkpIHtcbiAgICAgICAgLy8gICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShlbCk7XG4gICAgICAgIC8vICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAvLyAgICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGVsO1xuICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGZ1bmN0aW9uIGluZGV4VHJlZShub2RlKSB7XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFIHx8IG5vZGUubm9kZVR5cGUgPT09IERPQ1VNRU5UX0ZSQUdNRU5UX05PREUkMSkge1xuICAgICAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGN1ckNoaWxkO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2FsayByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgICAgICBpbmRleFRyZWUoY3VyQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXhUcmVlKGZyb21Ob2RlKTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVOb2RlQWRkZWQoZWwpIHtcbiAgICAgICAgICAgIG9uTm9kZUFkZGVkKGVsKTtcblxuICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gZWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0U2libGluZyA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVubWF0Y2hlZEZyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtrZXldO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB3ZSBmaW5kIGEgZHVwbGljYXRlICNpZCBub2RlIGluIGNhY2hlLCByZXBsYWNlIGBlbGAgd2l0aCBjYWNoZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgbW9ycGggaXQgdG8gdGhlIGNoaWxkIG5vZGUuXG4gICAgICAgICAgICAgICAgICAgIGlmICh1bm1hdGNoZWRGcm9tRWwgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJDaGlsZCwgdW5tYXRjaGVkRnJvbUVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodW5tYXRjaGVkRnJvbUVsLCBjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKHVubWF0Y2hlZEZyb21FbCwgY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZU5vZGVBZGRlZChjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgY2FsbCBmb3IgY3VyQ2hpbGQgYW5kIGl0J3MgY2hpbGRyZW4gdG8gc2VlIGlmIHdlIGZpbmQgc29tZXRoaW5nIGluXG4gICAgICAgICAgICAgICAgICAvLyBmcm9tTm9kZXNMb29rdXBcbiAgICAgICAgICAgICAgICAgIGhhbmRsZU5vZGVBZGRlZChjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBuZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNsZWFudXBGcm9tRWwoZnJvbUVsLCBjdXJGcm9tTm9kZUNoaWxkLCBjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSBwcm9jZXNzZWQgYWxsIG9mIHRoZSBcInRvIG5vZGVzXCIuIElmIGN1ckZyb21Ob2RlQ2hpbGQgaXNcbiAgICAgICAgICAgIC8vIG5vbi1udWxsIHRoZW4gd2Ugc3RpbGwgaGF2ZSBzb21lIGZyb20gbm9kZXMgbGVmdCBvdmVyIHRoYXQgbmVlZFxuICAgICAgICAgICAgLy8gdG8gYmUgcmVtb3ZlZFxuICAgICAgICAgICAgd2hpbGUgKGN1ckZyb21Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAoKGN1ckZyb21Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtb3JwaEVsKGZyb21FbCwgdG9FbCwgY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgICAgICB2YXIgdG9FbEtleSA9IGdldE5vZGVLZXkodG9FbCk7XG5cbiAgICAgICAgICAgIGlmICh0b0VsS2V5KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgYW4gZWxlbWVudCB3aXRoIGFuIElEIGlzIGJlaW5nIG1vcnBoZWQgdGhlbiBpdCB3aWxsIGJlIGluIHRoZSBmaW5hbFxuICAgICAgICAgICAgICAgIC8vIERPTSBzbyBjbGVhciBpdCBvdXQgb2YgdGhlIHNhdmVkIGVsZW1lbnRzIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgICBkZWxldGUgZnJvbU5vZGVzTG9va3VwW3RvRWxLZXldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWNoaWxkcmVuT25seSkge1xuICAgICAgICAgICAgICAgIC8vIG9wdGlvbmFsXG4gICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlRWxVcGRhdGVkKGZyb21FbCwgdG9FbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgYXR0cmlidXRlcyBvbiBvcmlnaW5hbCBET00gZWxlbWVudCBmaXJzdFxuICAgICAgICAgICAgICAgIG1vcnBoQXR0cnMoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgICAgICAgICAvLyBvcHRpb25hbFxuICAgICAgICAgICAgICAgIG9uRWxVcGRhdGVkKGZyb21FbCk7XG5cbiAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZChmcm9tRWwsIHRvRWwpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZnJvbUVsLm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgICAgICAgIG1vcnBoQ2hpbGRyZW4oZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNwZWNpYWxFbEhhbmRsZXJzLlRFWFRBUkVBKGZyb21FbCwgdG9FbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtb3JwaENoaWxkcmVuKGZyb21FbCwgdG9FbCkge1xuICAgICAgICAgICAgdmFyIGN1clRvTm9kZUNoaWxkID0gdG9FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBjdXJUb05vZGVLZXk7XG4gICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVLZXk7XG5cbiAgICAgICAgICAgIHZhciBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB2YXIgdG9OZXh0U2libGluZztcbiAgICAgICAgICAgIHZhciBtYXRjaGluZ0Zyb21FbDtcblxuICAgICAgICAgICAgLy8gd2FsayB0aGUgY2hpbGRyZW5cbiAgICAgICAgICAgIG91dGVyOiB3aGlsZSAoY3VyVG9Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0b05leHRTaWJsaW5nID0gY3VyVG9Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY3VyVG9Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJUb05vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAvLyB3YWxrIHRoZSBmcm9tTm9kZSBjaGlsZHJlbiBhbGwgdGhlIHdheSB0aHJvdWdoXG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1ckZyb21Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlQ2hpbGQuaXNTYW1lTm9kZSAmJiBjdXJUb05vZGVDaGlsZC5pc1NhbWVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyRnJvbU5vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlVHlwZSA9IGN1ckZyb21Ob2RlQ2hpbGQubm9kZVR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBtZWFucyBpZiB0aGUgY3VyRnJvbU5vZGVDaGlsZCBkb2VzbnQgaGF2ZSBhIG1hdGNoIHdpdGggdGhlIGN1clRvTm9kZUNoaWxkXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0NvbXBhdGlibGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gY3VyVG9Ob2RlQ2hpbGQubm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIEVsZW1lbnQgbm9kZXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHRhcmdldCBub2RlIGhhcyBhIGtleSBzbyB3ZSB3YW50IHRvIG1hdGNoIGl0IHVwIHdpdGggdGhlIGNvcnJlY3QgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSAhPT0gY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjdXJyZW50IGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlIGRvZXMgbm90IGhhdmUgYSBtYXRjaGluZyBrZXkgc29cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCdzIGNoZWNrIG91ciBsb29rdXAgdG8gc2VlIGlmIHRoZXJlIGlzIGEgbWF0Y2hpbmcgZWxlbWVudCBpbiB0aGUgb3JpZ2luYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERPTSB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG1hdGNoaW5nRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2N1clRvTm9kZUtleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZyb21OZXh0U2libGluZyA9PT0gbWF0Y2hpbmdGcm9tRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBzaW5nbGUgZWxlbWVudCByZW1vdmFscy4gVG8gYXZvaWQgcmVtb3ZpbmcgdGhlIG9yaWdpbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERPTSBub2RlIG91dCBvZiB0aGUgdHJlZSAoc2luY2UgdGhhdCBjYW4gYnJlYWsgQ1NTIHRyYW5zaXRpb25zLCBldGMuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2Ugd2lsbCBpbnN0ZWFkIGRpc2NhcmQgdGhlIGN1cnJlbnQgbm9kZSBhbmQgd2FpdCB1bnRpbCB0aGUgbmV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpdGVyYXRpb24gdG8gcHJvcGVybHkgbWF0Y2ggdXAgdGhlIGtleWVkIHRhcmdldCBlbGVtZW50IHdpdGggaXRzIG1hdGNoaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgYSBtYXRjaGluZyBrZXllZCBlbGVtZW50IHNvbWV3aGVyZSBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExldCdzIG1vdmUgdGhlIG9yaWdpbmFsIERPTSBub2RlIGludG8gdGhlIGN1cnJlbnQgcG9zaXRpb24gYW5kIG1vcnBoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0LlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFdlIHVzZSBpbnNlcnRCZWZvcmUgaW5zdGVhZCBvZiByZXBsYWNlQ2hpbGQgYmVjYXVzZSB3ZSB3YW50IHRvIGdvIHRocm91Z2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGByZW1vdmVOb2RlKClgIGZ1bmN0aW9uIGZvciB0aGUgbm9kZSB0aGF0IGlzIGJlaW5nIGRpc2NhcmRlZCBzbyB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsbCBsaWZlY3ljbGUgaG9va3MgYXJlIGNvcnJlY3RseSBpbnZva2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb21FbC5pbnNlcnRCZWZvcmUobWF0Y2hpbmdGcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBtYXRjaGluZ0Zyb21FbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBub2RlcyBhcmUgbm90IGNvbXBhdGlibGUgc2luY2UgdGhlIFwidG9cIiBub2RlIGhhcyBhIGtleSBhbmQgdGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpcyBubyBtYXRjaGluZyBrZXllZCBub2RlIGluIHRoZSBzb3VyY2UgdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgb3JpZ2luYWwgaGFzIGEga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGlzQ29tcGF0aWJsZSAhPT0gZmFsc2UgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBjb21wYXRpYmxlIERPTSBlbGVtZW50cyBzbyB0cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgXCJmcm9tXCIgbm9kZSB0byBtYXRjaCB0aGUgY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgRE9NIG5vZGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1PUlBIXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwoY3VyRnJvbU5vZGVDaGlsZCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBjdXJGcm9tTm9kZVR5cGUgPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgVGV4dCBvciBDb21tZW50IG5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW1wbHkgdXBkYXRlIG5vZGVWYWx1ZSBvbiB0aGUgb3JpZ2luYWwgbm9kZSB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgdGV4dCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUNoaWxkLm5vZGVWYWx1ZSAhPT0gY3VyVG9Ob2RlQ2hpbGQubm9kZVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQubm9kZVZhbHVlID0gY3VyVG9Ob2RlQ2hpbGQubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWR2YW5jZSBib3RoIHRoZSBcInRvXCIgY2hpbGQgYW5kIHRoZSBcImZyb21cIiBjaGlsZCBzaW5jZSB3ZSBmb3VuZCBhIG1hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RoaW5nIGVsc2UgdG8gZG8gYXMgd2UgYWxyZWFkeSByZWN1cnNpdmVseSBjYWxsZWQgbW9ycGhDaGlsZHJlbiBhYm92ZVxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTm8gY29tcGF0aWJsZSBtYXRjaCBzbyByZW1vdmUgdGhlIG9sZCBub2RlIGZyb20gdGhlIERPTSBhbmQgY29udGludWUgdHJ5aW5nIHRvIGZpbmQgYVxuICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaCBpbiB0aGUgb3JpZ2luYWwgRE9NLiBIb3dldmVyLCB3ZSBvbmx5IGRvIHRoaXMgaWYgdGhlIGZyb20gbm9kZSBpcyBub3Qga2V5ZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gc2luY2UgaXQgaXMgcG9zc2libGUgdGhhdCBhIGtleWVkIG5vZGUgbWlnaHQgbWF0Y2ggdXAgd2l0aCBhIG5vZGUgc29tZXdoZXJlIGVsc2UgaW4gdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCB0cmVlIGFuZCB3ZSBkb24ndCB3YW50IHRvIGRpc2NhcmQgaXQganVzdCB5ZXQgc2luY2UgaXQgc3RpbGwgbWlnaHQgZmluZCBhXG4gICAgICAgICAgICAgICAgICAgIC8vIGhvbWUgaW4gdGhlIGZpbmFsIERPTSB0cmVlLiBBZnRlciBldmVyeXRoaW5nIGlzIGRvbmUgd2Ugd2lsbCByZW1vdmUgYW55IGtleWVkIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoYXQgZGlkbid0IGZpbmQgYSBob21lXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIH0gLy8gRU5EOiB3aGlsZShjdXJGcm9tTm9kZUNoaWxkKSB7fVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZ290IHRoaXMgZmFyIHRoZW4gd2UgZGlkIG5vdCBmaW5kIGEgY2FuZGlkYXRlIG1hdGNoIGZvclxuICAgICAgICAgICAgICAgIC8vIG91ciBcInRvIG5vZGVcIiBhbmQgd2UgZXhoYXVzdGVkIGFsbCBvZiB0aGUgY2hpbGRyZW4gXCJmcm9tXCJcbiAgICAgICAgICAgICAgICAvLyBub2Rlcy4gVGhlcmVmb3JlLCB3ZSB3aWxsIGp1c3QgYXBwZW5kIHRoZSBjdXJyZW50IFwidG9cIiBub2RlXG4gICAgICAgICAgICAgICAgLy8gdG8gdGhlIGVuZFxuICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVLZXkgJiYgKG1hdGNoaW5nRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2N1clRvTm9kZUtleV0pICYmIGNvbXBhcmVOb2RlTmFtZXMobWF0Y2hpbmdGcm9tRWwsIGN1clRvTm9kZUNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tRWwuYXBwZW5kQ2hpbGQobWF0Y2hpbmdGcm9tRWwpO1xuICAgICAgICAgICAgICAgICAgICAvLyBNT1JQSFxuICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKG1hdGNoaW5nRnJvbUVsLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0ID0gb25CZWZvcmVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlQ2hpbGQuYWN0dWFsaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBjdXJUb05vZGVDaGlsZC5hY3R1YWxpemUoZnJvbUVsLm93bmVyRG9jdW1lbnQgfHwgZG9jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21FbC5hcHBlbmRDaGlsZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNsZWFudXBGcm9tRWwoZnJvbUVsLCBjdXJGcm9tTm9kZUNoaWxkLCBjdXJGcm9tTm9kZUtleSk7XG5cbiAgICAgICAgICAgIHZhciBzcGVjaWFsRWxIYW5kbGVyID0gc3BlY2lhbEVsSGFuZGxlcnNbZnJvbUVsLm5vZGVOYW1lXTtcbiAgICAgICAgICAgIGlmIChzcGVjaWFsRWxIYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgc3BlY2lhbEVsSGFuZGxlcihmcm9tRWwsIHRvRWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IC8vIEVORDogbW9ycGhDaGlsZHJlbiguLi4pXG5cbiAgICAgICAgdmFyIG1vcnBoZWROb2RlID0gZnJvbU5vZGU7XG4gICAgICAgIHZhciBtb3JwaGVkTm9kZVR5cGUgPSBtb3JwaGVkTm9kZS5ub2RlVHlwZTtcbiAgICAgICAgdmFyIHRvTm9kZVR5cGUgPSB0b05vZGUubm9kZVR5cGU7XG5cbiAgICAgICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSB3ZSBhcmUgZ2l2ZW4gdHdvIERPTSBub2RlcyB0aGF0IGFyZSBub3RcbiAgICAgICAgICAgIC8vIGNvbXBhdGlibGUgKGUuZy4gPGRpdj4gLS0+IDxzcGFuPiBvciA8ZGl2PiAtLT4gVEVYVClcbiAgICAgICAgICAgIGlmIChtb3JwaGVkTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIGlmICh0b05vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjb21wYXJlTm9kZU5hbWVzKGZyb21Ob2RlLCB0b05vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSBtb3ZlQ2hpbGRyZW4oZnJvbU5vZGUsIGNyZWF0ZUVsZW1lbnROUyh0b05vZGUubm9kZU5hbWUsIHRvTm9kZS5uYW1lc3BhY2VVUkkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEdvaW5nIGZyb20gYW4gZWxlbWVudCBub2RlIHRvIGEgdGV4dCBub2RlXG4gICAgICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBURVhUX05PREUgfHwgbW9ycGhlZE5vZGVUeXBlID09PSBDT01NRU5UX05PREUpIHsgLy8gVGV4dCBvciBjb21tZW50IG5vZGVcbiAgICAgICAgICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gbW9ycGhlZE5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb3JwaGVkTm9kZS5ub2RlVmFsdWUgIT09IHRvTm9kZS5ub2RlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlLm5vZGVWYWx1ZSA9IHRvTm9kZS5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9ycGhlZE5vZGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVGV4dCBub2RlIHRvIHNvbWV0aGluZyBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb3JwaGVkTm9kZSA9PT0gdG9Ob2RlKSB7XG4gICAgICAgICAgICAvLyBUaGUgXCJ0byBub2RlXCIgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIFwiZnJvbSBub2RlXCIgc28gd2UgaGFkIHRvXG4gICAgICAgICAgICAvLyB0b3NzIG91dCB0aGUgXCJmcm9tIG5vZGVcIiBhbmQgdXNlIHRoZSBcInRvIG5vZGVcIlxuICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGZyb21Ob2RlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0b05vZGUuaXNTYW1lTm9kZSAmJiB0b05vZGUuaXNTYW1lTm9kZShtb3JwaGVkTm9kZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vcnBoRWwobW9ycGhlZE5vZGUsIHRvTm9kZSwgY2hpbGRyZW5Pbmx5KTtcblxuICAgICAgICAgICAgLy8gV2Ugbm93IG5lZWQgdG8gbG9vcCBvdmVyIGFueSBrZXllZCBub2RlcyB0aGF0IG1pZ2h0IG5lZWQgdG8gYmVcbiAgICAgICAgICAgIC8vIHJlbW92ZWQuIFdlIG9ubHkgZG8gdGhlIHJlbW92YWwgaWYgd2Uga25vdyB0aGF0IHRoZSBrZXllZCBub2RlXG4gICAgICAgICAgICAvLyBuZXZlciBmb3VuZCBhIG1hdGNoLiBXaGVuIGEga2V5ZWQgbm9kZSBpcyBtYXRjaGVkIHVwIHdlIHJlbW92ZVxuICAgICAgICAgICAgLy8gaXQgb3V0IG9mIGZyb21Ob2Rlc0xvb2t1cCBhbmQgd2UgdXNlIGZyb21Ob2Rlc0xvb2t1cCB0byBkZXRlcm1pbmVcbiAgICAgICAgICAgIC8vIGlmIGEga2V5ZWQgbm9kZSBoYXMgYmVlbiBtYXRjaGVkIHVwIG9yIG5vdFxuICAgICAgICAgICAgaWYgKGtleWVkUmVtb3ZhbExpc3QpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpPTAsIGxlbj1rZXllZFJlbW92YWxMaXN0Lmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxUb1JlbW92ZSA9IGZyb21Ob2Rlc0xvb2t1cFtrZXllZFJlbW92YWxMaXN0W2ldXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsVG9SZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoZWxUb1JlbW92ZSwgZWxUb1JlbW92ZS5wYXJlbnROb2RlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNoaWxkcmVuT25seSAmJiBtb3JwaGVkTm9kZSAhPT0gZnJvbU5vZGUgJiYgZnJvbU5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgaWYgKG1vcnBoZWROb2RlLmFjdHVhbGl6ZSkge1xuICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gbW9ycGhlZE5vZGUuYWN0dWFsaXplKGZyb21Ob2RlLm93bmVyRG9jdW1lbnQgfHwgZG9jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIHdlIGhhZCB0byBzd2FwIG91dCB0aGUgZnJvbSBub2RlIHdpdGggYSBuZXcgbm9kZSBiZWNhdXNlIHRoZSBvbGRcbiAgICAgICAgICAgIC8vIG5vZGUgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIHRhcmdldCBub2RlIHRoZW4gd2UgbmVlZCB0b1xuICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgb2xkIERPTSBub2RlIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS4gVGhpcyBpcyBvbmx5XG4gICAgICAgICAgICAvLyBwb3NzaWJsZSBpZiB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgd2FzIHBhcnQgb2YgYSBET00gdHJlZSB3aGljaFxuICAgICAgICAgICAgLy8gd2Uga25vdyBpcyB0aGUgY2FzZSBpZiBpdCBoYXMgYSBwYXJlbnQgbm9kZS5cbiAgICAgICAgICAgIGZyb21Ob2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG1vcnBoZWROb2RlLCBmcm9tTm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbW9ycGhlZE5vZGU7XG4gICAgfTtcbn1cblxudmFyIG1vcnBoZG9tID0gbW9ycGhkb21GYWN0b3J5KG1vcnBoQXR0cnMpO1xuXG5leHBvcnQgZGVmYXVsdCBtb3JwaGRvbTtcbiIsICJpbXBvcnQge1xuICBQSFhfQ09NUE9ORU5ULFxuICBQSFhfRElTQUJMRV9XSVRILFxuICBQSFhfRkVFREJBQ0tfRk9SLFxuICBQSFhfUFJVTkUsXG4gIFBIWF9ST09UX0lELFxuICBQSFhfU0VTU0lPTixcbiAgUEhYX1NLSVAsXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9UUklHR0VSX0FDVElPTixcbiAgUEhYX1VQREFURVxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBkZXRlY3REdXBsaWNhdGVJZHMsXG4gIGlzQ2lkXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IERPTVBvc3RNb3JwaFJlc3RvcmVyIGZyb20gXCIuL2RvbV9wb3N0X21vcnBoX3Jlc3RvcmVyXCJcbmltcG9ydCBtb3JwaGRvbSBmcm9tIFwibW9ycGhkb21cIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBET01QYXRjaCB7XG4gIHN0YXRpYyBwYXRjaEVsKGZyb21FbCwgdG9FbCwgYWN0aXZlRWxlbWVudCl7XG4gICAgbW9ycGhkb20oZnJvbUVsLCB0b0VsLCB7XG4gICAgICBjaGlsZHJlbk9ubHk6IGZhbHNlLFxuICAgICAgb25CZWZvcmVFbFVwZGF0ZWQ6IChmcm9tRWwsIHRvRWwpID0+IHtcbiAgICAgICAgaWYoYWN0aXZlRWxlbWVudCAmJiBhY3RpdmVFbGVtZW50LmlzU2FtZU5vZGUoZnJvbUVsKSAmJiBET00uaXNGb3JtSW5wdXQoZnJvbUVsKSl7XG4gICAgICAgICAgRE9NLm1lcmdlRm9jdXNlZElucHV0KGZyb21FbCwgdG9FbClcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBjb25zdHJ1Y3Rvcih2aWV3LCBjb250YWluZXIsIGlkLCBodG1sLCB0YXJnZXRDSUQpe1xuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLmxpdmVTb2NrZXQgPSB2aWV3LmxpdmVTb2NrZXRcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lclxuICAgIHRoaXMuaWQgPSBpZFxuICAgIHRoaXMucm9vdElEID0gdmlldy5yb290LmlkXG4gICAgdGhpcy5odG1sID0gaHRtbFxuICAgIHRoaXMudGFyZ2V0Q0lEID0gdGFyZ2V0Q0lEXG4gICAgdGhpcy5jaWRQYXRjaCA9IGlzQ2lkKHRoaXMudGFyZ2V0Q0lEKVxuICAgIHRoaXMuY2FsbGJhY2tzID0ge1xuICAgICAgYmVmb3JlYWRkZWQ6IFtdLCBiZWZvcmV1cGRhdGVkOiBbXSwgYmVmb3JlcGh4Q2hpbGRBZGRlZDogW10sXG4gICAgICBhZnRlcmFkZGVkOiBbXSwgYWZ0ZXJ1cGRhdGVkOiBbXSwgYWZ0ZXJkaXNjYXJkZWQ6IFtdLCBhZnRlcnBoeENoaWxkQWRkZWQ6IFtdLFxuICAgICAgYWZ0ZXJ0cmFuc2l0aW9uc0Rpc2NhcmRlZDogW11cbiAgICB9XG4gIH1cblxuICBiZWZvcmUoa2luZCwgY2FsbGJhY2speyB0aGlzLmNhbGxiYWNrc1tgYmVmb3JlJHtraW5kfWBdLnB1c2goY2FsbGJhY2spIH1cbiAgYWZ0ZXIoa2luZCwgY2FsbGJhY2speyB0aGlzLmNhbGxiYWNrc1tgYWZ0ZXIke2tpbmR9YF0ucHVzaChjYWxsYmFjaykgfVxuXG4gIHRyYWNrQmVmb3JlKGtpbmQsIC4uLmFyZ3Mpe1xuICAgIHRoaXMuY2FsbGJhY2tzW2BiZWZvcmUke2tpbmR9YF0uZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayguLi5hcmdzKSlcbiAgfVxuXG4gIHRyYWNrQWZ0ZXIoa2luZCwgLi4uYXJncyl7XG4gICAgdGhpcy5jYWxsYmFja3NbYGFmdGVyJHtraW5kfWBdLmZvckVhY2goY2FsbGJhY2sgPT4gY2FsbGJhY2soLi4uYXJncykpXG4gIH1cblxuICBtYXJrUHJ1bmFibGVDb250ZW50Rm9yUmVtb3ZhbCgpe1xuICAgIERPTS5hbGwodGhpcy5jb250YWluZXIsIFwiW3BoeC11cGRhdGU9YXBwZW5kXSA+ICosIFtwaHgtdXBkYXRlPXByZXBlbmRdID4gKlwiLCBlbCA9PiB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX1BSVU5FLCBcIlwiKVxuICAgIH0pXG4gIH1cblxuICBwZXJmb3JtKCl7XG4gICAgbGV0IHt2aWV3LCBsaXZlU29ja2V0LCBjb250YWluZXIsIGh0bWx9ID0gdGhpc1xuICAgIGxldCB0YXJnZXRDb250YWluZXIgPSB0aGlzLmlzQ0lEUGF0Y2goKSA/IHRoaXMudGFyZ2V0Q0lEQ29udGFpbmVyKGh0bWwpIDogY29udGFpbmVyXG4gICAgaWYodGhpcy5pc0NJRFBhdGNoKCkgJiYgIXRhcmdldENvbnRhaW5lcil7IHJldHVybiB9XG5cbiAgICBsZXQgZm9jdXNlZCA9IGxpdmVTb2NrZXQuZ2V0QWN0aXZlRWxlbWVudCgpXG4gICAgbGV0IHtzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kfSA9IGZvY3VzZWQgJiYgRE9NLmhhc1NlbGVjdGlvblJhbmdlKGZvY3VzZWQpID8gZm9jdXNlZCA6IHt9XG4gICAgbGV0IHBoeFVwZGF0ZSA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfVVBEQVRFKVxuICAgIGxldCBwaHhGZWVkYmFja0ZvciA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfRkVFREJBQ0tfRk9SKVxuICAgIGxldCBkaXNhYmxlV2l0aCA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfRElTQUJMRV9XSVRIKVxuICAgIGxldCBwaHhUcmlnZ2VyRXh0ZXJuYWwgPSBsaXZlU29ja2V0LmJpbmRpbmcoUEhYX1RSSUdHRVJfQUNUSU9OKVxuICAgIGxldCBwaHhSZW1vdmUgPSBsaXZlU29ja2V0LmJpbmRpbmcoXCJyZW1vdmVcIilcbiAgICBsZXQgYWRkZWQgPSBbXVxuICAgIGxldCB1cGRhdGVzID0gW11cbiAgICBsZXQgYXBwZW5kUHJlcGVuZFVwZGF0ZXMgPSBbXVxuICAgIGxldCBwZW5kaW5nUmVtb3ZlcyA9IFtdXG4gICAgbGV0IGV4dGVybmFsRm9ybVRyaWdnZXJlZCA9IG51bGxcblxuICAgIGxldCBkaWZmSFRNTCA9IGxpdmVTb2NrZXQudGltZShcInByZW1vcnBoIGNvbnRhaW5lciBwcmVwXCIsICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmJ1aWxkRGlmZkhUTUwoY29udGFpbmVyLCBodG1sLCBwaHhVcGRhdGUsIHRhcmdldENvbnRhaW5lcilcbiAgICB9KVxuXG4gICAgdGhpcy50cmFja0JlZm9yZShcImFkZGVkXCIsIGNvbnRhaW5lcilcbiAgICB0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLCBjb250YWluZXIsIGNvbnRhaW5lcilcblxuICAgIGxpdmVTb2NrZXQudGltZShcIm1vcnBoZG9tXCIsICgpID0+IHtcbiAgICAgIG1vcnBoZG9tKHRhcmdldENvbnRhaW5lciwgZGlmZkhUTUwsIHtcbiAgICAgICAgY2hpbGRyZW5Pbmx5OiB0YXJnZXRDb250YWluZXIuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpID09PSBudWxsLFxuICAgICAgICBnZXROb2RlS2V5OiAobm9kZSkgPT4ge1xuICAgICAgICAgIHJldHVybiBET00uaXNQaHhEZXN0cm95ZWQobm9kZSkgPyBudWxsIDogbm9kZS5pZFxuICAgICAgICB9LFxuICAgICAgICBvbkJlZm9yZU5vZGVBZGRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcImFkZGVkXCIsIGVsKVxuICAgICAgICAgIHJldHVybiBlbFxuICAgICAgICB9LFxuICAgICAgICBvbk5vZGVBZGRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgLy8gaGFjayB0byBmaXggU2FmYXJpIGhhbmRsaW5nIG9mIGltZyBzcmNzZXQgYW5kIHZpZGVvIHRhZ3NcbiAgICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEhUTUxJbWFnZUVsZW1lbnQgJiYgZWwuc3Jjc2V0KXtcbiAgICAgICAgICAgIGVsLnNyY3NldCA9IGVsLnNyY3NldFxuICAgICAgICAgIH0gZWxzZSBpZihlbCBpbnN0YW5jZW9mIEhUTUxWaWRlb0VsZW1lbnQgJiYgZWwuYXV0b3BsYXkpe1xuICAgICAgICAgICAgZWwucGxheSgpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKERPTS5pc05vd1RyaWdnZXJGb3JtRXh0ZXJuYWwoZWwsIHBoeFRyaWdnZXJFeHRlcm5hbCkpe1xuICAgICAgICAgICAgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gZWxcbiAgICAgICAgICB9XG4gICAgICAgICAgLy9pbnB1dCBoYW5kbGluZ1xuICAgICAgICAgIERPTS5kaXNjYXJkRXJyb3IodGFyZ2V0Q29udGFpbmVyLCBlbCwgcGh4RmVlZGJhY2tGb3IpXG4gICAgICAgICAgLy8gbmVzdGVkIHZpZXcgaGFuZGxpbmdcbiAgICAgICAgICBpZigoRE9NLmlzUGh4Q2hpbGQoZWwpICYmIHZpZXcub3duc0VsZW1lbnQoZWwpKSB8fCBET00uaXNQaHhTdGlja3koZWwpICYmIHZpZXcub3duc0VsZW1lbnQoZWwucGFyZW50Tm9kZSkpe1xuICAgICAgICAgICAgdGhpcy50cmFja0FmdGVyKFwicGh4Q2hpbGRBZGRlZFwiLCBlbClcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkZWQucHVzaChlbClcbiAgICAgICAgfSxcbiAgICAgICAgb25Ob2RlRGlzY2FyZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICAvLyBuZXN0ZWQgdmlldyBoYW5kbGluZ1xuICAgICAgICAgIGlmKERPTS5pc1BoeENoaWxkKGVsKSB8fCBET00uaXNQaHhTdGlja3koZWwpKXsgbGl2ZVNvY2tldC5kZXN0cm95Vmlld0J5RWwoZWwpIH1cbiAgICAgICAgICB0aGlzLnRyYWNrQWZ0ZXIoXCJkaXNjYXJkZWRcIiwgZWwpXG4gICAgICAgIH0sXG4gICAgICAgIG9uQmVmb3JlTm9kZURpc2NhcmRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgaWYoZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShQSFhfUFJVTkUpICE9PSBudWxsKXsgcmV0dXJuIHRydWUgfVxuICAgICAgICAgIGlmKGVsLnBhcmVudE5vZGUgIT09IG51bGwgJiYgRE9NLmlzUGh4VXBkYXRlKGVsLnBhcmVudE5vZGUsIHBoeFVwZGF0ZSwgW1wiYXBwZW5kXCIsIFwicHJlcGVuZFwiXSkgJiYgZWwuaWQpeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUocGh4UmVtb3ZlKSl7XG4gICAgICAgICAgICBwZW5kaW5nUmVtb3Zlcy5wdXNoKGVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHRoaXMuc2tpcENJRFNpYmxpbmcoZWwpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBvbkVsVXBkYXRlZDogKGVsKSA9PiB7XG4gICAgICAgICAgaWYoRE9NLmlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKSl7XG4gICAgICAgICAgICBleHRlcm5hbEZvcm1UcmlnZ2VyZWQgPSBlbFxuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVzLnB1c2goZWwpXG4gICAgICAgIH0sXG4gICAgICAgIG9uQmVmb3JlRWxVcGRhdGVkOiAoZnJvbUVsLCB0b0VsKSA9PiB7XG4gICAgICAgICAgRE9NLmNsZWFuQ2hpbGROb2Rlcyh0b0VsLCBwaHhVcGRhdGUpXG4gICAgICAgICAgaWYodGhpcy5za2lwQ0lEU2libGluZyh0b0VsKSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgaWYoRE9NLmlzUGh4U3RpY2t5KGZyb21FbCkpeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGlmKERPTS5pc0lnbm9yZWQoZnJvbUVsLCBwaHhVcGRhdGUpKXtcbiAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIERPTS5tZXJnZUF0dHJzKGZyb21FbCwgdG9FbCwge2lzSWdub3JlZDogdHJ1ZX0pXG4gICAgICAgICAgICB1cGRhdGVzLnB1c2goZnJvbUVsKVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoZnJvbUVsLnR5cGUgPT09IFwibnVtYmVyXCIgJiYgKGZyb21FbC52YWxpZGl0eSAmJiBmcm9tRWwudmFsaWRpdHkuYmFkSW5wdXQpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZighRE9NLnN5bmNQZW5kaW5nUmVmKGZyb21FbCwgdG9FbCwgZGlzYWJsZVdpdGgpKXtcbiAgICAgICAgICAgIGlmKERPTS5pc1VwbG9hZElucHV0KGZyb21FbCkpe1xuICAgICAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLCBmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIG5lc3RlZCB2aWV3IGhhbmRsaW5nXG4gICAgICAgICAgaWYoRE9NLmlzUGh4Q2hpbGQodG9FbCkpe1xuICAgICAgICAgICAgbGV0IHByZXZTZXNzaW9uID0gZnJvbUVsLmdldEF0dHJpYnV0ZShQSFhfU0VTU0lPTilcbiAgICAgICAgICAgIERPTS5tZXJnZUF0dHJzKGZyb21FbCwgdG9FbCwge2V4Y2x1ZGU6IFtQSFhfU1RBVElDXX0pXG4gICAgICAgICAgICBpZihwcmV2U2Vzc2lvbiAhPT0gXCJcIil7IGZyb21FbC5zZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04sIHByZXZTZXNzaW9uKSB9XG4gICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKFBIWF9ST09UX0lELCB0aGlzLnJvb3RJRClcbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnMoZnJvbUVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gaW5wdXQgaGFuZGxpbmdcbiAgICAgICAgICBET00uY29weVByaXZhdGVzKHRvRWwsIGZyb21FbClcbiAgICAgICAgICBET00uZGlzY2FyZEVycm9yKHRhcmdldENvbnRhaW5lciwgdG9FbCwgcGh4RmVlZGJhY2tGb3IpXG5cbiAgICAgICAgICBsZXQgaXNGb2N1c2VkRm9ybUVsID0gZm9jdXNlZCAmJiBmcm9tRWwuaXNTYW1lTm9kZShmb2N1c2VkKSAmJiBET00uaXNGb3JtSW5wdXQoZnJvbUVsKVxuICAgICAgICAgIGlmKGlzRm9jdXNlZEZvcm1FbCl7XG4gICAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLCBmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgICBET00ubWVyZ2VGb2N1c2VkSW5wdXQoZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLnN5bmNBdHRyc1RvUHJvcHMoZnJvbUVsKVxuICAgICAgICAgICAgdXBkYXRlcy5wdXNoKGZyb21FbClcbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnMoZnJvbUVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKERPTS5pc1BoeFVwZGF0ZSh0b0VsLCBwaHhVcGRhdGUsIFtcImFwcGVuZFwiLCBcInByZXBlbmRcIl0pKXtcbiAgICAgICAgICAgICAgYXBwZW5kUHJlcGVuZFVwZGF0ZXMucHVzaChuZXcgRE9NUG9zdE1vcnBoUmVzdG9yZXIoZnJvbUVsLCB0b0VsLCB0b0VsLmdldEF0dHJpYnV0ZShwaHhVcGRhdGUpKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIERPTS5zeW5jQXR0cnNUb1Byb3BzKHRvRWwpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKHRvRWwpXG4gICAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwidXBkYXRlZFwiLCBmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgaWYobGl2ZVNvY2tldC5pc0RlYnVnRW5hYmxlZCgpKXsgZGV0ZWN0RHVwbGljYXRlSWRzKCkgfVxuXG4gICAgaWYoYXBwZW5kUHJlcGVuZFVwZGF0ZXMubGVuZ3RoID4gMCl7XG4gICAgICBsaXZlU29ja2V0LnRpbWUoXCJwb3N0LW1vcnBoIGFwcGVuZC9wcmVwZW5kIHJlc3RvcmF0aW9uXCIsICgpID0+IHtcbiAgICAgICAgYXBwZW5kUHJlcGVuZFVwZGF0ZXMuZm9yRWFjaCh1cGRhdGUgPT4gdXBkYXRlLnBlcmZvcm0oKSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgbGl2ZVNvY2tldC5zaWxlbmNlRXZlbnRzKCgpID0+IERPTS5yZXN0b3JlRm9jdXMoZm9jdXNlZCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCkpXG4gICAgRE9NLmRpc3BhdGNoRXZlbnQoZG9jdW1lbnQsIFwicGh4OnVwZGF0ZVwiKVxuICAgIGFkZGVkLmZvckVhY2goZWwgPT4gdGhpcy50cmFja0FmdGVyKFwiYWRkZWRcIiwgZWwpKVxuICAgIHVwZGF0ZXMuZm9yRWFjaChlbCA9PiB0aGlzLnRyYWNrQWZ0ZXIoXCJ1cGRhdGVkXCIsIGVsKSlcblxuICAgIGlmKHBlbmRpbmdSZW1vdmVzLmxlbmd0aCA+IDApe1xuICAgICAgbGl2ZVNvY2tldC50cmFuc2l0aW9uUmVtb3ZlcyhwZW5kaW5nUmVtb3ZlcylcbiAgICAgIGxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB7XG4gICAgICAgIHBlbmRpbmdSZW1vdmVzLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgIGxldCBjaGlsZCA9IERPTS5maXJzdFBoeENoaWxkKGVsKVxuICAgICAgICAgIGlmKGNoaWxkKXsgbGl2ZVNvY2tldC5kZXN0cm95Vmlld0J5RWwoY2hpbGQpIH1cbiAgICAgICAgICBlbC5yZW1vdmUoKVxuICAgICAgICB9KVxuICAgICAgICB0aGlzLnRyYWNrQWZ0ZXIoXCJ0cmFuc2l0aW9uc0Rpc2NhcmRlZFwiLCBwZW5kaW5nUmVtb3ZlcylcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgaWYoZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkKXtcbiAgICAgIGxpdmVTb2NrZXQuZGlzY29ubmVjdCgpXG4gICAgICBleHRlcm5hbEZvcm1UcmlnZ2VyZWQuc3VibWl0KClcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlzQ0lEUGF0Y2goKXsgcmV0dXJuIHRoaXMuY2lkUGF0Y2ggfVxuXG4gIHNraXBDSURTaWJsaW5nKGVsKXtcbiAgICByZXR1cm4gZWwubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIGVsLmdldEF0dHJpYnV0ZShQSFhfU0tJUCkgIT09IG51bGxcbiAgfVxuXG4gIHRhcmdldENJRENvbnRhaW5lcihodG1sKXtcbiAgICBpZighdGhpcy5pc0NJRFBhdGNoKCkpeyByZXR1cm4gfVxuICAgIGxldCBbZmlyc3QsIC4uLnJlc3RdID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmNvbnRhaW5lciwgdGhpcy50YXJnZXRDSUQpXG4gICAgaWYocmVzdC5sZW5ndGggPT09IDAgJiYgRE9NLmNoaWxkTm9kZUxlbmd0aChodG1sKSA9PT0gMSl7XG4gICAgICByZXR1cm4gZmlyc3RcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZpcnN0ICYmIGZpcnN0LnBhcmVudE5vZGVcbiAgICB9XG4gIH1cblxuICAvLyBidWlsZHMgSFRNTCBmb3IgbW9ycGhkb20gcGF0Y2hcbiAgLy8gLSBmb3IgZnVsbCBwYXRjaGVzIG9mIExpdmVWaWV3IG9yIGEgY29tcG9uZW50IHdpdGggYSBzaW5nbGVcbiAgLy8gICByb290IG5vZGUsIHNpbXBseSByZXR1cm5zIHRoZSBIVE1MXG4gIC8vIC0gZm9yIHBhdGNoZXMgb2YgYSBjb21wb25lbnQgd2l0aCBtdWx0aXBsZSByb290IG5vZGVzLCB0aGVcbiAgLy8gICBwYXJlbnQgbm9kZSBiZWNvbWVzIHRoZSB0YXJnZXQgY29udGFpbmVyIGFuZCBub24tY29tcG9uZW50XG4gIC8vICAgc2libGluZ3MgYXJlIG1hcmtlZCBhcyBza2lwLlxuICBidWlsZERpZmZIVE1MKGNvbnRhaW5lciwgaHRtbCwgcGh4VXBkYXRlLCB0YXJnZXRDb250YWluZXIpe1xuICAgIGxldCBpc0NJRFBhdGNoID0gdGhpcy5pc0NJRFBhdGNoKClcbiAgICBsZXQgaXNDSURXaXRoU2luZ2xlUm9vdCA9IGlzQ0lEUGF0Y2ggJiYgdGFyZ2V0Q29udGFpbmVyLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSA9PT0gdGhpcy50YXJnZXRDSUQudG9TdHJpbmcoKVxuICAgIGlmKCFpc0NJRFBhdGNoIHx8IGlzQ0lEV2l0aFNpbmdsZVJvb3Qpe1xuICAgICAgcmV0dXJuIGh0bWxcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29tcG9uZW50IHBhdGNoIHdpdGggbXVsdGlwbGUgQ0lEIHJvb3RzXG4gICAgICBsZXQgZGlmZkNvbnRhaW5lciA9IG51bGxcbiAgICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgICAgZGlmZkNvbnRhaW5lciA9IERPTS5jbG9uZU5vZGUodGFyZ2V0Q29udGFpbmVyKVxuICAgICAgbGV0IFtmaXJzdENvbXBvbmVudCwgLi4ucmVzdF0gPSBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KGRpZmZDb250YWluZXIsIHRoaXMudGFyZ2V0Q0lEKVxuICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgICAgcmVzdC5mb3JFYWNoKGVsID0+IGVsLnJlbW92ZSgpKVxuICAgICAgQXJyYXkuZnJvbShkaWZmQ29udGFpbmVyLmNoaWxkTm9kZXMpLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICAvLyB3ZSBjYW4gb25seSBza2lwIHRyYWNrYWJsZSBub2RlcyB3aXRoIGFuIElEXG4gICAgICAgIGlmKGNoaWxkLmlkICYmIGNoaWxkLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSAmJiBjaGlsZC5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkgIT09IHRoaXMudGFyZ2V0Q0lELnRvU3RyaW5nKCkpe1xuICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZShQSFhfU0tJUCwgXCJcIilcbiAgICAgICAgICBjaGlsZC5pbm5lckhUTUwgPSBcIlwiXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICBBcnJheS5mcm9tKHRlbXBsYXRlLmNvbnRlbnQuY2hpbGROb2RlcykuZm9yRWFjaChlbCA9PiBkaWZmQ29udGFpbmVyLmluc2VydEJlZm9yZShlbCwgZmlyc3RDb21wb25lbnQpKVxuICAgICAgZmlyc3RDb21wb25lbnQucmVtb3ZlKClcbiAgICAgIHJldHVybiBkaWZmQ29udGFpbmVyLm91dGVySFRNTFxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIENPTVBPTkVOVFMsXG4gIERZTkFNSUNTLFxuICBURU1QTEFURVMsXG4gIEVWRU5UUyxcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX1NLSVAsXG4gIFJFUExZLFxuICBTVEFUSUMsXG4gIFRJVExFXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGlzT2JqZWN0LFxuICBsb2dFcnJvcixcbiAgaXNDaWQsXG59IGZyb20gXCIuL3V0aWxzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVuZGVyZWQge1xuICBzdGF0aWMgZXh0cmFjdChkaWZmKXtcbiAgICBsZXQge1tSRVBMWV06IHJlcGx5LCBbRVZFTlRTXTogZXZlbnRzLCBbVElUTEVdOiB0aXRsZX0gPSBkaWZmXG4gICAgZGVsZXRlIGRpZmZbUkVQTFldXG4gICAgZGVsZXRlIGRpZmZbRVZFTlRTXVxuICAgIGRlbGV0ZSBkaWZmW1RJVExFXVxuICAgIHJldHVybiB7ZGlmZiwgdGl0bGUsIHJlcGx5OiByZXBseSB8fCBudWxsLCBldmVudHM6IGV2ZW50cyB8fCBbXX1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHZpZXdJZCwgcmVuZGVyZWQpe1xuICAgIHRoaXMudmlld0lkID0gdmlld0lkXG4gICAgdGhpcy5yZW5kZXJlZCA9IHt9XG4gICAgdGhpcy5tZXJnZURpZmYocmVuZGVyZWQpXG4gIH1cblxuICBwYXJlbnRWaWV3SWQoKXsgcmV0dXJuIHRoaXMudmlld0lkIH1cblxuICB0b1N0cmluZyhvbmx5Q2lkcyl7XG4gICAgcmV0dXJuIHRoaXMucmVjdXJzaXZlVG9TdHJpbmcodGhpcy5yZW5kZXJlZCwgdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSwgb25seUNpZHMpXG4gIH1cblxuICByZWN1cnNpdmVUb1N0cmluZyhyZW5kZXJlZCwgY29tcG9uZW50cyA9IHJlbmRlcmVkW0NPTVBPTkVOVFNdLCBvbmx5Q2lkcyl7XG4gICAgb25seUNpZHMgPSBvbmx5Q2lkcyA/IG5ldyBTZXQob25seUNpZHMpIDogbnVsbFxuICAgIGxldCBvdXRwdXQgPSB7YnVmZmVyOiBcIlwiLCBjb21wb25lbnRzOiBjb21wb25lbnRzLCBvbmx5Q2lkczogb25seUNpZHN9XG4gICAgdGhpcy50b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgbnVsbCwgb3V0cHV0KVxuICAgIHJldHVybiBvdXRwdXQuYnVmZmVyXG4gIH1cblxuICBjb21wb25lbnRDSURzKGRpZmYpeyByZXR1cm4gT2JqZWN0LmtleXMoZGlmZltDT01QT05FTlRTXSB8fCB7fSkubWFwKGkgPT4gcGFyc2VJbnQoaSkpIH1cblxuICBpc0NvbXBvbmVudE9ubHlEaWZmKGRpZmYpe1xuICAgIGlmKCFkaWZmW0NPTVBPTkVOVFNdKXsgcmV0dXJuIGZhbHNlIH1cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoZGlmZikubGVuZ3RoID09PSAxXG4gIH1cblxuICBnZXRDb21wb25lbnQoZGlmZiwgY2lkKXsgcmV0dXJuIGRpZmZbQ09NUE9ORU5UU11bY2lkXSB9XG5cbiAgbWVyZ2VEaWZmKGRpZmYpe1xuICAgIGxldCBuZXdjID0gZGlmZltDT01QT05FTlRTXVxuICAgIGxldCBjYWNoZSA9IHt9XG4gICAgZGVsZXRlIGRpZmZbQ09NUE9ORU5UU11cbiAgICB0aGlzLnJlbmRlcmVkID0gdGhpcy5tdXRhYmxlTWVyZ2UodGhpcy5yZW5kZXJlZCwgZGlmZilcbiAgICB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdID0gdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSB8fCB7fVxuXG4gICAgaWYobmV3Yyl7XG4gICAgICBsZXQgb2xkYyA9IHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU11cblxuICAgICAgZm9yKGxldCBjaWQgaW4gbmV3Yyl7XG4gICAgICAgIG5ld2NbY2lkXSA9IHRoaXMuY2FjaGVkRmluZENvbXBvbmVudChjaWQsIG5ld2NbY2lkXSwgb2xkYywgbmV3YywgY2FjaGUpXG4gICAgICB9XG5cbiAgICAgIGZvcihsZXQgY2lkIGluIG5ld2MpeyBvbGRjW2NpZF0gPSBuZXdjW2NpZF0gfVxuICAgICAgZGlmZltDT01QT05FTlRTXSA9IG5ld2NcbiAgICB9XG4gIH1cblxuICBjYWNoZWRGaW5kQ29tcG9uZW50KGNpZCwgY2RpZmYsIG9sZGMsIG5ld2MsIGNhY2hlKXtcbiAgICBpZihjYWNoZVtjaWRdKXtcbiAgICAgIHJldHVybiBjYWNoZVtjaWRdXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBuZGlmZiwgc3RhdCwgc2NpZCA9IGNkaWZmW1NUQVRJQ11cblxuICAgICAgaWYoaXNDaWQoc2NpZCkpe1xuICAgICAgICBsZXQgdGRpZmZcblxuICAgICAgICBpZihzY2lkID4gMCl7XG4gICAgICAgICAgdGRpZmYgPSB0aGlzLmNhY2hlZEZpbmRDb21wb25lbnQoc2NpZCwgbmV3Y1tzY2lkXSwgb2xkYywgbmV3YywgY2FjaGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGRpZmYgPSBvbGRjWy1zY2lkXVxuICAgICAgICB9XG5cbiAgICAgICAgc3RhdCA9IHRkaWZmW1NUQVRJQ11cbiAgICAgICAgbmRpZmYgPSB0aGlzLmNsb25lTWVyZ2UodGRpZmYsIGNkaWZmKVxuICAgICAgICBuZGlmZltTVEFUSUNdID0gc3RhdFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmRpZmYgPSBjZGlmZltTVEFUSUNdICE9PSB1bmRlZmluZWQgPyBjZGlmZiA6IHRoaXMuY2xvbmVNZXJnZShvbGRjW2NpZF0gfHwge30sIGNkaWZmKVxuICAgICAgfVxuXG4gICAgICBjYWNoZVtjaWRdID0gbmRpZmZcbiAgICAgIHJldHVybiBuZGlmZlxuICAgIH1cbiAgfVxuXG4gIG11dGFibGVNZXJnZSh0YXJnZXQsIHNvdXJjZSl7XG4gICAgaWYoc291cmNlW1NUQVRJQ10gIT09IHVuZGVmaW5lZCl7XG4gICAgICByZXR1cm4gc291cmNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZG9NdXRhYmxlTWVyZ2UodGFyZ2V0LCBzb3VyY2UpXG4gICAgICByZXR1cm4gdGFyZ2V0XG4gICAgfVxuICB9XG5cbiAgZG9NdXRhYmxlTWVyZ2UodGFyZ2V0LCBzb3VyY2Upe1xuICAgIGZvcihsZXQga2V5IGluIHNvdXJjZSl7XG4gICAgICBsZXQgdmFsID0gc291cmNlW2tleV1cbiAgICAgIGxldCB0YXJnZXRWYWwgPSB0YXJnZXRba2V5XVxuICAgICAgaWYoaXNPYmplY3QodmFsKSAmJiB2YWxbU1RBVElDXSA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KHRhcmdldFZhbCkpe1xuICAgICAgICB0aGlzLmRvTXV0YWJsZU1lcmdlKHRhcmdldFZhbCwgdmFsKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWxcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbG9uZU1lcmdlKHRhcmdldCwgc291cmNlKXtcbiAgICBsZXQgbWVyZ2VkID0gey4uLnRhcmdldCwgLi4uc291cmNlfVxuICAgIGZvcihsZXQga2V5IGluIG1lcmdlZCl7XG4gICAgICBsZXQgdmFsID0gc291cmNlW2tleV1cbiAgICAgIGxldCB0YXJnZXRWYWwgPSB0YXJnZXRba2V5XVxuICAgICAgaWYoaXNPYmplY3QodmFsKSAmJiB2YWxbU1RBVElDXSA9PT0gdW5kZWZpbmVkICYmIGlzT2JqZWN0KHRhcmdldFZhbCkpe1xuICAgICAgICBtZXJnZWRba2V5XSA9IHRoaXMuY2xvbmVNZXJnZSh0YXJnZXRWYWwsIHZhbClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlZFxuICB9XG5cbiAgY29tcG9uZW50VG9TdHJpbmcoY2lkKXsgcmV0dXJuIHRoaXMucmVjdXJzaXZlQ0lEVG9TdHJpbmcodGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXSwgY2lkKSB9XG5cbiAgcHJ1bmVDSURzKGNpZHMpe1xuICAgIGNpZHMuZm9yRWFjaChjaWQgPT4gZGVsZXRlIHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU11bY2lkXSlcbiAgfVxuXG4gIC8vIHByaXZhdGVcblxuICBnZXQoKXsgcmV0dXJuIHRoaXMucmVuZGVyZWQgfVxuXG4gIGlzTmV3RmluZ2VycHJpbnQoZGlmZiA9IHt9KXsgcmV0dXJuICEhZGlmZltTVEFUSUNdIH1cblxuICB0ZW1wbGF0ZVN0YXRpYyhwYXJ0LCB0ZW1wbGF0ZXMpe1xuICAgIGlmKHR5cGVvZiAocGFydCkgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZXNbcGFydF1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBhcnRcbiAgICB9XG4gIH1cblxuICB0b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpe1xuICAgIGlmKHJlbmRlcmVkW0RZTkFNSUNTXSl7IHJldHVybiB0aGlzLmNvbXByZWhlbnNpb25Ub0J1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpIH1cbiAgICBsZXQge1tTVEFUSUNdOiBzdGF0aWNzfSA9IHJlbmRlcmVkXG4gICAgc3RhdGljcyA9IHRoaXMudGVtcGxhdGVTdGF0aWMoc3RhdGljcywgdGVtcGxhdGVzKVxuXG4gICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzWzBdXG4gICAgZm9yKGxldCBpID0gMTsgaSA8IHN0YXRpY3MubGVuZ3RoOyBpKyspe1xuICAgICAgdGhpcy5keW5hbWljVG9CdWZmZXIocmVuZGVyZWRbaSAtIDFdLCB0ZW1wbGF0ZXMsIG91dHB1dClcbiAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1tpXVxuICAgIH1cbiAgfVxuXG4gIGNvbXByZWhlbnNpb25Ub0J1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpe1xuICAgIGxldCB7W0RZTkFNSUNTXTogZHluYW1pY3MsIFtTVEFUSUNdOiBzdGF0aWNzfSA9IHJlbmRlcmVkXG4gICAgc3RhdGljcyA9IHRoaXMudGVtcGxhdGVTdGF0aWMoc3RhdGljcywgdGVtcGxhdGVzKVxuICAgIGxldCBjb21wVGVtcGxhdGVzID0gdGVtcGxhdGVzIHx8IHJlbmRlcmVkW1RFTVBMQVRFU11cblxuICAgIGZvcihsZXQgZCA9IDA7IGQgPCBkeW5hbWljcy5sZW5ndGg7IGQrKyl7XG4gICAgICBsZXQgZHluYW1pYyA9IGR5bmFtaWNzW2RdXG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbMF1cbiAgICAgIGZvcihsZXQgaSA9IDE7IGkgPCBzdGF0aWNzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgdGhpcy5keW5hbWljVG9CdWZmZXIoZHluYW1pY1tpIC0gMV0sIGNvbXBUZW1wbGF0ZXMsIG91dHB1dClcbiAgICAgICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZHluYW1pY1RvQnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCl7XG4gICAgaWYodHlwZW9mIChyZW5kZXJlZCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgb3V0cHV0LmJ1ZmZlciArPSB0aGlzLnJlY3Vyc2l2ZUNJRFRvU3RyaW5nKG91dHB1dC5jb21wb25lbnRzLCByZW5kZXJlZCwgb3V0cHV0Lm9ubHlDaWRzKVxuICAgIH0gZWxzZSBpZihpc09iamVjdChyZW5kZXJlZCkpe1xuICAgICAgdGhpcy50b091dHB1dEJ1ZmZlcihyZW5kZXJlZCwgdGVtcGxhdGVzLCBvdXRwdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIG91dHB1dC5idWZmZXIgKz0gcmVuZGVyZWRcbiAgICB9XG4gIH1cblxuICByZWN1cnNpdmVDSURUb1N0cmluZyhjb21wb25lbnRzLCBjaWQsIG9ubHlDaWRzKXtcbiAgICBsZXQgY29tcG9uZW50ID0gY29tcG9uZW50c1tjaWRdIHx8IGxvZ0Vycm9yKGBubyBjb21wb25lbnQgZm9yIENJRCAke2NpZH1gLCBjb21wb25lbnRzKVxuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IHRoaXMucmVjdXJzaXZlVG9TdHJpbmcoY29tcG9uZW50LCBjb21wb25lbnRzLCBvbmx5Q2lkcylcbiAgICBsZXQgY29udGFpbmVyID0gdGVtcGxhdGUuY29udGVudFxuICAgIGxldCBza2lwID0gb25seUNpZHMgJiYgIW9ubHlDaWRzLmhhcyhjaWQpXG5cbiAgICBsZXQgW2hhc0NoaWxkTm9kZXMsIGhhc0NoaWxkQ29tcG9uZW50c10gPVxuICAgICAgQXJyYXkuZnJvbShjb250YWluZXIuY2hpbGROb2RlcykucmVkdWNlKChbaGFzTm9kZXMsIGhhc0NvbXBvbmVudHNdLCBjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZihjaGlsZC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpe1xuICAgICAgICAgIGlmKGNoaWxkLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSl7XG4gICAgICAgICAgICByZXR1cm4gW2hhc05vZGVzLCB0cnVlXVxuICAgICAgICAgIH1cbiAgICAgICAgICBjaGlsZC5zZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCwgY2lkKVxuICAgICAgICAgIGlmKCFjaGlsZC5pZCl7IGNoaWxkLmlkID0gYCR7dGhpcy5wYXJlbnRWaWV3SWQoKX0tJHtjaWR9LSR7aX1gIH1cbiAgICAgICAgICBpZihza2lwKXtcbiAgICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZShQSFhfU0tJUCwgXCJcIilcbiAgICAgICAgICAgIGNoaWxkLmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFt0cnVlLCBoYXNDb21wb25lbnRzXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmKGNoaWxkLm5vZGVWYWx1ZS50cmltKCkgIT09IFwiXCIpe1xuICAgICAgICAgICAgbG9nRXJyb3IoXCJvbmx5IEhUTUwgZWxlbWVudCB0YWdzIGFyZSBhbGxvd2VkIGF0IHRoZSByb290IG9mIGNvbXBvbmVudHMuXFxuXFxuXCIgK1xuICAgICAgICAgICAgICBgZ290OiBcIiR7Y2hpbGQubm9kZVZhbHVlLnRyaW0oKX1cIlxcblxcbmAgK1xuICAgICAgICAgICAgICBcIndpdGhpbjpcXG5cIiwgdGVtcGxhdGUuaW5uZXJIVE1MLnRyaW0oKSlcbiAgICAgICAgICAgIGNoaWxkLnJlcGxhY2VXaXRoKHRoaXMuY3JlYXRlU3BhbihjaGlsZC5ub2RlVmFsdWUsIGNpZCkpXG4gICAgICAgICAgICByZXR1cm4gW3RydWUsIGhhc0NvbXBvbmVudHNdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoaWxkLnJlbW92ZSgpXG4gICAgICAgICAgICByZXR1cm4gW2hhc05vZGVzLCBoYXNDb21wb25lbnRzXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgW2ZhbHNlLCBmYWxzZV0pXG5cbiAgICBpZighaGFzQ2hpbGROb2RlcyAmJiAhaGFzQ2hpbGRDb21wb25lbnRzKXtcbiAgICAgIGxvZ0Vycm9yKFwiZXhwZWN0ZWQgYXQgbGVhc3Qgb25lIEhUTUwgZWxlbWVudCB0YWcgaW5zaWRlIGEgY29tcG9uZW50LCBidXQgdGhlIGNvbXBvbmVudCBpcyBlbXB0eTpcXG5cIixcbiAgICAgICAgdGVtcGxhdGUuaW5uZXJIVE1MLnRyaW0oKSlcbiAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVNwYW4oXCJcIiwgY2lkKS5vdXRlckhUTUxcbiAgICB9IGVsc2UgaWYoIWhhc0NoaWxkTm9kZXMgJiYgaGFzQ2hpbGRDb21wb25lbnRzKXtcbiAgICAgIGxvZ0Vycm9yKFwiZXhwZWN0ZWQgYXQgbGVhc3Qgb25lIEhUTUwgZWxlbWVudCB0YWcgZGlyZWN0bHkgaW5zaWRlIGEgY29tcG9uZW50LCBidXQgb25seSBzdWJjb21wb25lbnRzIHdlcmUgZm91bmQuIEEgY29tcG9uZW50IG11c3QgcmVuZGVyIGF0IGxlYXN0IG9uZSBIVE1MIHRhZyBkaXJlY3RseSBpbnNpZGUgaXRzZWxmLlwiLFxuICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwudHJpbSgpKVxuICAgICAgcmV0dXJuIHRlbXBsYXRlLmlubmVySFRNTFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGUuaW5uZXJIVE1MXG4gICAgfVxuICB9XG5cbiAgY3JlYXRlU3Bhbih0ZXh0LCBjaWQpe1xuICAgIGxldCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIilcbiAgICBzcGFuLmlubmVyVGV4dCA9IHRleHRcbiAgICBzcGFuLnNldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5ULCBjaWQpXG4gICAgcmV0dXJuIHNwYW5cbiAgfVxufVxuIiwgImxldCB2aWV3SG9va0lEID0gMVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld0hvb2sge1xuICBzdGF0aWMgbWFrZUlEKCl7IHJldHVybiB2aWV3SG9va0lEKysgfVxuICBzdGF0aWMgZWxlbWVudElEKGVsKXsgcmV0dXJuIGVsLnBoeEhvb2tJZCB9XG5cbiAgY29uc3RydWN0b3IodmlldywgZWwsIGNhbGxiYWNrcyl7XG4gICAgdGhpcy5fX3ZpZXcgPSB2aWV3XG4gICAgdGhpcy5saXZlU29ja2V0ID0gdmlldy5saXZlU29ja2V0XG4gICAgdGhpcy5fX2NhbGxiYWNrcyA9IGNhbGxiYWNrc1xuICAgIHRoaXMuX19saXN0ZW5lcnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLl9faXNEaXNjb25uZWN0ZWQgPSBmYWxzZVxuICAgIHRoaXMuZWwgPSBlbFxuICAgIHRoaXMuZWwucGh4SG9va0lkID0gdGhpcy5jb25zdHJ1Y3Rvci5tYWtlSUQoKVxuICAgIGZvcihsZXQga2V5IGluIHRoaXMuX19jYWxsYmFja3MpeyB0aGlzW2tleV0gPSB0aGlzLl9fY2FsbGJhY2tzW2tleV0gfVxuICB9XG5cbiAgX19tb3VudGVkKCl7IHRoaXMubW91bnRlZCAmJiB0aGlzLm1vdW50ZWQoKSB9XG4gIF9fdXBkYXRlZCgpeyB0aGlzLnVwZGF0ZWQgJiYgdGhpcy51cGRhdGVkKCkgfVxuICBfX2JlZm9yZVVwZGF0ZSgpeyB0aGlzLmJlZm9yZVVwZGF0ZSAmJiB0aGlzLmJlZm9yZVVwZGF0ZSgpIH1cbiAgX19kZXN0cm95ZWQoKXsgdGhpcy5kZXN0cm95ZWQgJiYgdGhpcy5kZXN0cm95ZWQoKSB9XG4gIF9fcmVjb25uZWN0ZWQoKXtcbiAgICBpZih0aGlzLl9faXNEaXNjb25uZWN0ZWQpe1xuICAgICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gZmFsc2VcbiAgICAgIHRoaXMucmVjb25uZWN0ZWQgJiYgdGhpcy5yZWNvbm5lY3RlZCgpXG4gICAgfVxuICB9XG4gIF9fZGlzY29ubmVjdGVkKCl7XG4gICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gdHJ1ZVxuICAgIHRoaXMuZGlzY29ubmVjdGVkICYmIHRoaXMuZGlzY29ubmVjdGVkKClcbiAgfVxuXG4gIHB1c2hFdmVudChldmVudCwgcGF5bG9hZCA9IHt9LCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy5wdXNoSG9va0V2ZW50KG51bGwsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KVxuICB9XG5cbiAgcHVzaEV2ZW50VG8ocGh4VGFyZ2V0LCBldmVudCwgcGF5bG9hZCA9IHt9LCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy53aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgcmV0dXJuIHZpZXcucHVzaEhvb2tFdmVudCh0YXJnZXRDdHgsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVFdmVudChldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCBjYWxsYmFja1JlZiA9IChjdXN0b21FdmVudCwgYnlwYXNzKSA9PiBieXBhc3MgPyBldmVudCA6IGNhbGxiYWNrKGN1c3RvbUV2ZW50LmRldGFpbClcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihgcGh4OiR7ZXZlbnR9YCwgY2FsbGJhY2tSZWYpXG4gICAgdGhpcy5fX2xpc3RlbmVycy5hZGQoY2FsbGJhY2tSZWYpXG4gICAgcmV0dXJuIGNhbGxiYWNrUmVmXG4gIH1cblxuICByZW1vdmVIYW5kbGVFdmVudChjYWxsYmFja1JlZil7XG4gICAgbGV0IGV2ZW50ID0gY2FsbGJhY2tSZWYobnVsbCwgdHJ1ZSlcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihgcGh4OiR7ZXZlbnR9YCwgY2FsbGJhY2tSZWYpXG4gICAgdGhpcy5fX2xpc3RlbmVycy5kZWxldGUoY2FsbGJhY2tSZWYpXG4gIH1cblxuICB1cGxvYWQobmFtZSwgZmlsZXMpe1xuICAgIHJldHVybiB0aGlzLl9fdmlldy5kaXNwYXRjaFVwbG9hZHMobmFtZSwgZmlsZXMpXG4gIH1cblxuICB1cGxvYWRUbyhwaHhUYXJnZXQsIG5hbWUsIGZpbGVzKXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsIHZpZXcgPT4gdmlldy5kaXNwYXRjaFVwbG9hZHMobmFtZSwgZmlsZXMpKVxuICB9XG5cbiAgX19jbGVhbnVwX18oKXtcbiAgICB0aGlzLl9fbGlzdGVuZXJzLmZvckVhY2goY2FsbGJhY2tSZWYgPT4gdGhpcy5yZW1vdmVIYW5kbGVFdmVudChjYWxsYmFja1JlZikpXG4gIH1cbn1cbiIsICJpbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5cbmxldCBKUyA9IHtcbiAgZXhlYyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZGVmYXVsdHMpe1xuICAgIGxldCBbZGVmYXVsdEtpbmQsIGRlZmF1bHRBcmdzXSA9IGRlZmF1bHRzIHx8IFtudWxsLCB7fV1cbiAgICBsZXQgY29tbWFuZHMgPSBwaHhFdmVudC5jaGFyQXQoMCkgPT09IFwiW1wiID9cbiAgICAgIEpTT04ucGFyc2UocGh4RXZlbnQpIDogW1tkZWZhdWx0S2luZCwgZGVmYXVsdEFyZ3NdXVxuXG4gICAgY29tbWFuZHMuZm9yRWFjaCgoW2tpbmQsIGFyZ3NdKSA9PiB7XG4gICAgICBpZihraW5kID09PSBkZWZhdWx0S2luZCAmJiBkZWZhdWx0QXJncy5kYXRhKXtcbiAgICAgICAgYXJncy5kYXRhID0gT2JqZWN0LmFzc2lnbihhcmdzLmRhdGEgfHwge30sIGRlZmF1bHRBcmdzLmRhdGEpXG4gICAgICB9XG4gICAgICB0aGlzLmZpbHRlclRvRWxzKHNvdXJjZUVsLCBhcmdzKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgdGhpc1tgZXhlY18ke2tpbmR9YF0oZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCBhcmdzKVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIGlzVmlzaWJsZShlbCl7XG4gICAgcmV0dXJuICEhKGVsLm9mZnNldFdpZHRoIHx8IGVsLm9mZnNldEhlaWdodCB8fCBlbC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCA+IDApXG4gIH0sXG5cbiAgLy8gcHJpdmF0ZVxuXG4gIC8vIGNvbW1hbmRzXG5cbiAgZXhlY19kaXNwYXRjaChldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHt0bywgZXZlbnQsIGRldGFpbCwgYnViYmxlc30pe1xuICAgIGRldGFpbCA9IGRldGFpbCB8fCB7fVxuICAgIGRldGFpbC5kaXNwYXRjaGVyID0gc291cmNlRWxcbiAgICBET00uZGlzcGF0Y2hFdmVudChlbCwgZXZlbnQsIHtkZXRhaWwsIGJ1YmJsZXN9KVxuICB9LFxuXG4gIGV4ZWNfcHVzaChldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIGFyZ3Mpe1xuICAgIGlmKCF2aWV3LmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfVxuXG4gICAgbGV0IHtldmVudCwgZGF0YSwgdGFyZ2V0LCBwYWdlX2xvYWRpbmcsIGxvYWRpbmcsIHZhbHVlLCBkaXNwYXRjaGVyfSA9IGFyZ3NcbiAgICBsZXQgcHVzaE9wdHMgPSB7bG9hZGluZywgdmFsdWUsIHRhcmdldCwgcGFnZV9sb2FkaW5nOiAhIXBhZ2VfbG9hZGluZ31cbiAgICBsZXQgdGFyZ2V0U3JjID0gZXZlbnRUeXBlID09PSBcImNoYW5nZVwiICYmIGRpc3BhdGNoZXIgPyBkaXNwYXRjaGVyIDogc291cmNlRWxcbiAgICBsZXQgcGh4VGFyZ2V0ID0gdGFyZ2V0IHx8IHRhcmdldFNyYy5nZXRBdHRyaWJ1dGUodmlldy5iaW5kaW5nKFwidGFyZ2V0XCIpKSB8fCB0YXJnZXRTcmNcbiAgICB2aWV3LndpdGhpblRhcmdldHMocGh4VGFyZ2V0LCAodGFyZ2V0VmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICBpZihldmVudFR5cGUgPT09IFwiY2hhbmdlXCIpe1xuICAgICAgICBsZXQge25ld0NpZCwgX3RhcmdldCwgY2FsbGJhY2t9ID0gYXJnc1xuICAgICAgICBfdGFyZ2V0ID0gX3RhcmdldCB8fCAoc291cmNlRWwgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50ID8gc291cmNlRWwubmFtZSA6IHVuZGVmaW5lZClcbiAgICAgICAgaWYoX3RhcmdldCl7IHB1c2hPcHRzLl90YXJnZXQgPSBfdGFyZ2V0IH1cbiAgICAgICAgdGFyZ2V0Vmlldy5wdXNoSW5wdXQoc291cmNlRWwsIHRhcmdldEN0eCwgbmV3Q2lkLCBldmVudCB8fCBwaHhFdmVudCwgcHVzaE9wdHMsIGNhbGxiYWNrKVxuICAgICAgfSBlbHNlIGlmKGV2ZW50VHlwZSA9PT0gXCJzdWJtaXRcIil7XG4gICAgICAgIHRhcmdldFZpZXcuc3VibWl0Rm9ybShzb3VyY2VFbCwgdGFyZ2V0Q3R4LCBldmVudCB8fCBwaHhFdmVudCwgcHVzaE9wdHMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRWaWV3LnB1c2hFdmVudChldmVudFR5cGUsIHNvdXJjZUVsLCB0YXJnZXRDdHgsIGV2ZW50IHx8IHBoeEV2ZW50LCBkYXRhLCBwdXNoT3B0cylcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGV4ZWNfYWRkX2NsYXNzKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lfSl7XG4gICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG5hbWVzLCBbXSwgdHJhbnNpdGlvbiwgdGltZSwgdmlldylcbiAgfSxcblxuICBleGVjX3JlbW92ZV9jbGFzcyhldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtuYW1lcywgdHJhbnNpdGlvbiwgdGltZX0pe1xuICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgbmFtZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcpXG4gIH0sXG5cbiAgZXhlY190cmFuc2l0aW9uKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge3RpbWUsIHRyYW5zaXRpb259KXtcbiAgICBsZXQgW3RyYW5zaXRpb25fc3RhcnQsIHJ1bm5pbmcsIHRyYW5zaXRpb25fZW5kXSA9IHRyYW5zaXRpb25cbiAgICBsZXQgb25TdGFydCA9ICgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uX3N0YXJ0LmNvbmNhdChydW5uaW5nKSwgW10pXG4gICAgbGV0IG9uRG9uZSA9ICgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uX2VuZCwgdHJhbnNpdGlvbl9zdGFydC5jb25jYXQocnVubmluZykpXG4gICAgdmlldy50cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSlcbiAgfSxcblxuICBleGVjX3RvZ2dsZShldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtkaXNwbGF5LCBpbnMsIG91dHMsIHRpbWV9KXtcbiAgICB0aGlzLnRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCBpbnMsIG91dHMsIHRpbWUpXG4gIH0sXG5cbiAgZXhlY19zaG93KGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2Rpc3BsYXksIHRyYW5zaXRpb24sIHRpbWV9KXtcbiAgICB0aGlzLnNob3coZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSlcbiAgfSxcblxuICBleGVjX2hpZGUoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7ZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZX0pe1xuICAgIHRoaXMuaGlkZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lKVxuICB9LFxuXG4gIGV4ZWNfc2V0X2F0dHIoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7YXR0cjogW2F0dHIsIHZhbF19KXtcbiAgICB0aGlzLnNldE9yUmVtb3ZlQXR0cnMoZWwsIFtbYXR0ciwgdmFsXV0sIFtdKVxuICB9LFxuXG4gIGV4ZWNfcmVtb3ZlX2F0dHIoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7YXR0cn0pe1xuICAgIHRoaXMuc2V0T3JSZW1vdmVBdHRycyhlbCwgW10sIFthdHRyXSlcbiAgfSxcblxuICAvLyB1dGlscyBmb3IgY29tbWFuZHNcblxuICBzaG93KGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIHRyYW5zaXRpb24sIHRpbWUpe1xuICAgIGlmKCF0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgdGhpcy50b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgbnVsbCwgdGltZSlcbiAgICB9XG4gIH0sXG5cbiAgaGlkZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lKXtcbiAgICBpZih0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgdGhpcy50b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgbnVsbCwgdHJhbnNpdGlvbiwgdGltZSlcbiAgICB9XG4gIH0sXG5cbiAgdG9nZ2xlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIGlucywgb3V0cywgdGltZSl7XG4gICAgbGV0IFtpbkNsYXNzZXMsIGluU3RhcnRDbGFzc2VzLCBpbkVuZENsYXNzZXNdID0gaW5zIHx8IFtbXSwgW10sIFtdXVxuICAgIGxldCBbb3V0Q2xhc3Nlcywgb3V0U3RhcnRDbGFzc2VzLCBvdXRFbmRDbGFzc2VzXSA9IG91dHMgfHwgW1tdLCBbXSwgW11dXG4gICAgaWYoaW5DbGFzc2VzLmxlbmd0aCA+IDAgfHwgb3V0Q2xhc3Nlcy5sZW5ndGggPiAwKXtcbiAgICAgIGlmKHRoaXMuaXNWaXNpYmxlKGVsKSl7XG4gICAgICAgIGxldCBvblN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBvdXRTdGFydENsYXNzZXMsIGluQ2xhc3Nlcy5jb25jYXQoaW5TdGFydENsYXNzZXMpLmNvbmNhdChpbkVuZENsYXNzZXMpKVxuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG91dENsYXNzZXMsIFtdKVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgb3V0RW5kQ2xhc3Nlcywgb3V0U3RhcnRDbGFzc2VzKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtc3RhcnRcIikpXG4gICAgICAgIHZpZXcudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBvdXRDbGFzc2VzLmNvbmNhdChvdXRFbmRDbGFzc2VzKSlcbiAgICAgICAgICBET00ucHV0U3RpY2t5KGVsLCBcInRvZ2dsZVwiLCBjdXJyZW50RWwgPT4gY3VycmVudEVsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIilcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpoaWRlLWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGV2ZW50VHlwZSA9PT0gXCJyZW1vdmVcIil7IHJldHVybiB9XG4gICAgICAgIGxldCBvblN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBpblN0YXJ0Q2xhc3Nlcywgb3V0Q2xhc3Nlcy5jb25jYXQob3V0U3RhcnRDbGFzc2VzKS5jb25jYXQob3V0RW5kQ2xhc3NlcykpXG4gICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gKGRpc3BsYXkgfHwgXCJibG9ja1wiKSlcbiAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBpbkNsYXNzZXMsIFtdKVxuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgaW5FbmRDbGFzc2VzLCBpblN0YXJ0Q2xhc3NlcykpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LXN0YXJ0XCIpKVxuICAgICAgICB2aWV3LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBbXSwgaW5DbGFzc2VzLmNvbmNhdChpbkVuZENsYXNzZXMpKVxuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OnNob3ctZW5kXCIpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZih0aGlzLmlzVmlzaWJsZShlbCkpe1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpoaWRlLXN0YXJ0XCIpKVxuICAgICAgICAgIERPTS5wdXRTdGlja3koZWwsIFwidG9nZ2xlXCIsIGN1cnJlbnRFbCA9PiBjdXJyZW50RWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKVxuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtZW5kXCIpKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1zdGFydFwiKSlcbiAgICAgICAgICBET00ucHV0U3RpY2t5KGVsLCBcInRvZ2dsZVwiLCBjdXJyZW50RWwgPT4gY3VycmVudEVsLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5IHx8IFwiYmxvY2tcIilcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LWVuZFwiKSlcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBhZGRzLCByZW1vdmVzLCB0cmFuc2l0aW9uLCB0aW1lLCB2aWV3KXtcbiAgICBsZXQgW3RyYW5zaXRpb25fcnVuLCB0cmFuc2l0aW9uX3N0YXJ0LCB0cmFuc2l0aW9uX2VuZF0gPSB0cmFuc2l0aW9uIHx8IFtbXSwgW10sIFtdXVxuICAgIGlmKHRyYW5zaXRpb25fcnVuLmxlbmd0aCA+IDApe1xuICAgICAgbGV0IG9uU3RhcnQgPSAoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgdHJhbnNpdGlvbl9zdGFydC5jb25jYXQodHJhbnNpdGlvbl9ydW4pLCBbXSlcbiAgICAgIGxldCBvbkRvbmUgPSAoKSA9PiB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgYWRkcy5jb25jYXQodHJhbnNpdGlvbl9lbmQpLCByZW1vdmVzLmNvbmNhdCh0cmFuc2l0aW9uX3J1bikuY29uY2F0KHRyYW5zaXRpb25fc3RhcnQpKVxuICAgICAgcmV0dXJuIHZpZXcudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gICAgfVxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgbGV0IFtwcmV2QWRkcywgcHJldlJlbW92ZXNdID0gRE9NLmdldFN0aWNreShlbCwgXCJjbGFzc2VzXCIsIFtbXSwgW11dKVxuICAgICAgbGV0IGtlZXBBZGRzID0gYWRkcy5maWx0ZXIobmFtZSA9PiBwcmV2QWRkcy5pbmRleE9mKG5hbWUpIDwgMCAmJiAhZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKVxuICAgICAgbGV0IGtlZXBSZW1vdmVzID0gcmVtb3Zlcy5maWx0ZXIobmFtZSA9PiBwcmV2UmVtb3Zlcy5pbmRleE9mKG5hbWUpIDwgMCAmJiBlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpXG4gICAgICBsZXQgbmV3QWRkcyA9IHByZXZBZGRzLmZpbHRlcihuYW1lID0+IHJlbW92ZXMuaW5kZXhPZihuYW1lKSA8IDApLmNvbmNhdChrZWVwQWRkcylcbiAgICAgIGxldCBuZXdSZW1vdmVzID0gcHJldlJlbW92ZXMuZmlsdGVyKG5hbWUgPT4gYWRkcy5pbmRleE9mKG5hbWUpIDwgMCkuY29uY2F0KGtlZXBSZW1vdmVzKVxuXG4gICAgICBET00ucHV0U3RpY2t5KGVsLCBcImNsYXNzZXNcIiwgY3VycmVudEVsID0+IHtcbiAgICAgICAgY3VycmVudEVsLmNsYXNzTGlzdC5yZW1vdmUoLi4ubmV3UmVtb3ZlcylcbiAgICAgICAgY3VycmVudEVsLmNsYXNzTGlzdC5hZGQoLi4ubmV3QWRkcylcbiAgICAgICAgcmV0dXJuIFtuZXdBZGRzLCBuZXdSZW1vdmVzXVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuXG4gIHNldE9yUmVtb3ZlQXR0cnMoZWwsIHNldHMsIHJlbW92ZXMpe1xuICAgIGxldCBbcHJldlNldHMsIHByZXZSZW1vdmVzXSA9IERPTS5nZXRTdGlja3koZWwsIFwiYXR0cnNcIiwgW1tdLCBbXV0pXG5cbiAgICBsZXQgYWx0ZXJlZEF0dHJzID0gc2V0cy5tYXAoKFthdHRyLCBfdmFsXSkgPT4gYXR0cikuY29uY2F0KHJlbW92ZXMpO1xuICAgIGxldCBuZXdTZXRzID0gcHJldlNldHMuZmlsdGVyKChbYXR0ciwgX3ZhbF0pID0+ICFhbHRlcmVkQXR0cnMuaW5jbHVkZXMoYXR0cikpLmNvbmNhdChzZXRzKTtcbiAgICBsZXQgbmV3UmVtb3ZlcyA9IHByZXZSZW1vdmVzLmZpbHRlcigoYXR0cikgPT4gIWFsdGVyZWRBdHRycy5pbmNsdWRlcyhhdHRyKSkuY29uY2F0KHJlbW92ZXMpO1xuXG4gICAgRE9NLnB1dFN0aWNreShlbCwgXCJhdHRyc1wiLCBjdXJyZW50RWwgPT4ge1xuICAgICAgbmV3UmVtb3Zlcy5mb3JFYWNoKGF0dHIgPT4gY3VycmVudEVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyKSlcbiAgICAgIG5ld1NldHMuZm9yRWFjaCgoW2F0dHIsIHZhbF0pID0+IGN1cnJlbnRFbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsKSlcbiAgICAgIHJldHVybiBbbmV3U2V0cywgbmV3UmVtb3Zlc11cbiAgICB9KVxuICB9LFxuXG4gIGhhc0FsbENsYXNzZXMoZWwsIGNsYXNzZXMpeyByZXR1cm4gY2xhc3Nlcy5ldmVyeShuYW1lID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSkgfSxcblxuICBpc1RvZ2dsZWRPdXQoZWwsIG91dENsYXNzZXMpe1xuICAgIHJldHVybiAhdGhpcy5pc1Zpc2libGUoZWwpIHx8IHRoaXMuaGFzQWxsQ2xhc3NlcyhlbCwgb3V0Q2xhc3NlcylcbiAgfSxcblxuICBmaWx0ZXJUb0Vscyhzb3VyY2VFbCwge3RvfSl7XG4gICAgcmV0dXJuIHRvID8gRE9NLmFsbChkb2N1bWVudCwgdG8pIDogW3NvdXJjZUVsXVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpTXG4iLCAiaW1wb3J0IHtcbiAgQkVGT1JFX1VOTE9BRF9MT0FERVJfVElNRU9VVCxcbiAgQ0hFQ0tBQkxFX0lOUFVUUyxcbiAgQ09OU0VDVVRJVkVfUkVMT0FEUyxcbiAgUEhYX0FVVE9fUkVDT1ZFUixcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX0NPTk5FQ1RFRF9DTEFTUyxcbiAgUEhYX0RJU0FCTEVfV0lUSCxcbiAgUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFLFxuICBQSFhfRElTQUJMRUQsXG4gIFBIWF9ESVNDT05ORUNURURfQ0xBU1MsXG4gIFBIWF9FVkVOVF9DTEFTU0VTLFxuICBQSFhfRVJST1JfQ0xBU1MsXG4gIFBIWF9GRUVEQkFDS19GT1IsXG4gIFBIWF9IQVNfU1VCTUlUVEVELFxuICBQSFhfSE9PSyxcbiAgUEhYX1BBR0VfTE9BRElORyxcbiAgUEhYX1BBUkVOVF9JRCxcbiAgUEhYX1BST0dSRVNTLFxuICBQSFhfUkVBRE9OTFksXG4gIFBIWF9SRUYsXG4gIFBIWF9SRUZfU1JDLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1NFU1NJT04sXG4gIFBIWF9TVEFUSUMsXG4gIFBIWF9UUkFDS19TVEFUSUMsXG4gIFBIWF9UUkFDS19VUExPQURTLFxuICBQSFhfVVBEQVRFLFxuICBQSFhfVVBMT0FEX1JFRixcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBVU0hfVElNRU9VVCxcbiAgUEhYX01BSU4sXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNsb25lLFxuICBjbG9zZXN0UGh4QmluZGluZyxcbiAgaXNFbXB0eSxcbiAgaXNFcXVhbE9iaixcbiAgbG9nRXJyb3IsXG4gIG1heWJlLFxuICBpc0NpZCxcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgQnJvd3NlciBmcm9tIFwiLi9icm93c2VyXCJcbmltcG9ydCBET00gZnJvbSBcIi4vZG9tXCJcbmltcG9ydCBET01QYXRjaCBmcm9tIFwiLi9kb21fcGF0Y2hcIlxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcbmltcG9ydCBSZW5kZXJlZCBmcm9tIFwiLi9yZW5kZXJlZFwiXG5pbXBvcnQgVmlld0hvb2sgZnJvbSBcIi4vdmlld19ob29rXCJcbmltcG9ydCBKUyBmcm9tIFwiLi9qc1wiXG5cbmxldCBzZXJpYWxpemVGb3JtID0gKGZvcm0sIG1ldGEsIG9ubHlOYW1lcyA9IFtdKSA9PiB7XG4gIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKVxuICBsZXQgdG9SZW1vdmUgPSBbXVxuXG4gIGZvcm1EYXRhLmZvckVhY2goKHZhbCwga2V5LCBfaW5kZXgpID0+IHtcbiAgICBpZih2YWwgaW5zdGFuY2VvZiBGaWxlKXsgdG9SZW1vdmUucHVzaChrZXkpIH1cbiAgfSlcblxuICAvLyBDbGVhbnVwIGFmdGVyIGJ1aWxkaW5nIGZpbGVEYXRhXG4gIHRvUmVtb3ZlLmZvckVhY2goa2V5ID0+IGZvcm1EYXRhLmRlbGV0ZShrZXkpKVxuXG4gIGxldCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKClcbiAgZm9yKGxldCBba2V5LCB2YWxdIG9mIGZvcm1EYXRhLmVudHJpZXMoKSl7XG4gICAgaWYob25seU5hbWVzLmxlbmd0aCA9PT0gMCB8fCBvbmx5TmFtZXMuaW5kZXhPZihrZXkpID49IDApe1xuICAgICAgcGFyYW1zLmFwcGVuZChrZXksIHZhbClcbiAgICB9XG4gIH1cbiAgZm9yKGxldCBtZXRhS2V5IGluIG1ldGEpeyBwYXJhbXMuYXBwZW5kKG1ldGFLZXksIG1ldGFbbWV0YUtleV0pIH1cblxuICByZXR1cm4gcGFyYW1zLnRvU3RyaW5nKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIGNvbnN0cnVjdG9yKGVsLCBsaXZlU29ja2V0LCBwYXJlbnRWaWV3LCBmbGFzaCl7XG4gICAgdGhpcy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuICAgIHRoaXMuZmxhc2ggPSBmbGFzaFxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Vmlld1xuICAgIHRoaXMucm9vdCA9IHBhcmVudFZpZXcgPyBwYXJlbnRWaWV3LnJvb3QgOiB0aGlzXG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5pZCA9IHRoaXMuZWwuaWRcbiAgICB0aGlzLnJlZiA9IDBcbiAgICB0aGlzLmNoaWxkSm9pbnMgPSAwXG4gICAgdGhpcy5sb2FkZXJUaW1lciA9IG51bGxcbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5wcnVuaW5nQ0lEcyA9IFtdXG4gICAgdGhpcy5yZWRpcmVjdCA9IGZhbHNlXG4gICAgdGhpcy5ocmVmID0gbnVsbFxuICAgIHRoaXMuam9pbkNvdW50ID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5qb2luQ291bnQgLSAxIDogMFxuICAgIHRoaXMuam9pblBlbmRpbmcgPSB0cnVlXG4gICAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZVxuICAgIHRoaXMuam9pbkNhbGxiYWNrID0gZnVuY3Rpb24ob25Eb25lKXsgb25Eb25lICYmIG9uRG9uZSgpIH1cbiAgICB0aGlzLnN0b3BDYWxsYmFjayA9IGZ1bmN0aW9uKCl7IH1cbiAgICB0aGlzLnBlbmRpbmdKb2luT3BzID0gdGhpcy5wYXJlbnQgPyBudWxsIDogW11cbiAgICB0aGlzLnZpZXdIb29rcyA9IHt9XG4gICAgdGhpcy51cGxvYWRlcnMgPSB7fVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSBbXVxuICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLnBhcmVudCA/IG51bGwgOiB7fVxuICAgIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSA9IHt9XG4gICAgdGhpcy5jaGFubmVsID0gdGhpcy5saXZlU29ja2V0LmNoYW5uZWwoYGx2OiR7dGhpcy5pZH1gLCAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZWRpcmVjdDogdGhpcy5yZWRpcmVjdCA/IHRoaXMuaHJlZiA6IHVuZGVmaW5lZCxcbiAgICAgICAgdXJsOiB0aGlzLnJlZGlyZWN0ID8gdW5kZWZpbmVkIDogdGhpcy5ocmVmIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgcGFyYW1zOiB0aGlzLmNvbm5lY3RQYXJhbXMoKSxcbiAgICAgICAgc2Vzc2lvbjogdGhpcy5nZXRTZXNzaW9uKCksXG4gICAgICAgIHN0YXRpYzogdGhpcy5nZXRTdGF0aWMoKSxcbiAgICAgICAgZmxhc2g6IHRoaXMuZmxhc2hcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuc2hvd0xvYWRlcih0aGlzLmxpdmVTb2NrZXQubG9hZGVyVGltZW91dClcbiAgICB0aGlzLmJpbmRDaGFubmVsKClcbiAgfVxuXG4gIHNldEhyZWYoaHJlZil7IHRoaXMuaHJlZiA9IGhyZWYgfVxuXG4gIHNldFJlZGlyZWN0KGhyZWYpe1xuICAgIHRoaXMucmVkaXJlY3QgPSB0cnVlXG4gICAgdGhpcy5ocmVmID0gaHJlZlxuICB9XG5cbiAgaXNNYWluKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfTUFJTikgIT09IG51bGwgfVxuXG4gIGNvbm5lY3RQYXJhbXMoKXtcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5saXZlU29ja2V0LnBhcmFtcyh0aGlzLmVsKVxuICAgIGxldCBtYW5pZmVzdCA9XG4gICAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7dGhpcy5iaW5kaW5nKFBIWF9UUkFDS19TVEFUSUMpfV1gKVxuICAgICAgICAubWFwKG5vZGUgPT4gbm9kZS5zcmMgfHwgbm9kZS5ocmVmKS5maWx0ZXIodXJsID0+IHR5cGVvZiAodXJsKSA9PT0gXCJzdHJpbmdcIilcblxuICAgIGlmKG1hbmlmZXN0Lmxlbmd0aCA+IDApeyBwYXJhbXNbXCJfdHJhY2tfc3RhdGljXCJdID0gbWFuaWZlc3QgfVxuICAgIHBhcmFtc1tcIl9tb3VudHNcIl0gPSB0aGlzLmpvaW5Db3VudFxuXG4gICAgcmV0dXJuIHBhcmFtc1xuICB9XG5cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuY2hhbm5lbC5jYW5QdXNoKCkgfVxuXG4gIGdldFNlc3Npb24oKXsgcmV0dXJuIHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKSB9XG5cbiAgZ2V0U3RhdGljKCl7XG4gICAgbGV0IHZhbCA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9TVEFUSUMpXG4gICAgcmV0dXJuIHZhbCA9PT0gXCJcIiA/IG51bGwgOiB2YWxcbiAgfVxuXG4gIGRlc3Ryb3koY2FsbGJhY2sgPSBmdW5jdGlvbiAoKXsgfSl7XG4gICAgdGhpcy5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZVxuICAgIGRlbGV0ZSB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF1cbiAgICBpZih0aGlzLnBhcmVudCl7IGRlbGV0ZSB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5wYXJlbnQuaWRdW3RoaXMuaWRdIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5sb2FkZXJUaW1lcilcbiAgICBsZXQgb25GaW5pc2hlZCA9ICgpID0+IHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3Mpe1xuICAgICAgICB0aGlzLmRlc3Ryb3lIb29rKHRoaXMudmlld0hvb2tzW2lkXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBET00ubWFya1BoeENoaWxkRGVzdHJveWVkKHRoaXMuZWwpXG5cbiAgICB0aGlzLmxvZyhcImRlc3Ryb3llZFwiLCAoKSA9PiBbXCJ0aGUgY2hpbGQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBwYXJlbnRcIl0pXG4gICAgdGhpcy5jaGFubmVsLmxlYXZlKClcbiAgICAgIC5yZWNlaXZlKFwib2tcIiwgb25GaW5pc2hlZClcbiAgICAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgb25GaW5pc2hlZClcbiAgICAgIC5yZWNlaXZlKFwidGltZW91dFwiLCBvbkZpbmlzaGVkKVxuICB9XG5cbiAgc2V0Q29udGFpbmVyQ2xhc3NlcyguLi5jbGFzc2VzKXtcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICBQSFhfQ09OTkVDVEVEX0NMQVNTLFxuICAgICAgUEhYX0RJU0NPTk5FQ1RFRF9DTEFTUyxcbiAgICAgIFBIWF9FUlJPUl9DTEFTU1xuICAgIClcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NlcylcbiAgfVxuXG4gIHNob3dMb2FkZXIodGltZW91dCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgaWYodGltZW91dCl7XG4gICAgICB0aGlzLmxvYWRlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNob3dMb2FkZXIoKSwgdGltZW91dClcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLnZpZXdIb29rcyl7IHRoaXMudmlld0hvb2tzW2lkXS5fX2Rpc2Nvbm5lY3RlZCgpIH1cbiAgICAgIHRoaXMuc2V0Q29udGFpbmVyQ2xhc3NlcyhQSFhfRElTQ09OTkVDVEVEX0NMQVNTKVxuICAgIH1cbiAgfVxuXG4gIGhpZGVMb2FkZXIoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5sb2FkZXJUaW1lcilcbiAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0NPTk5FQ1RFRF9DTEFTUylcbiAgfVxuXG4gIHRyaWdnZXJSZWNvbm5lY3RlZCgpe1xuICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3MpeyB0aGlzLnZpZXdIb29rc1tpZF0uX19yZWNvbm5lY3RlZCgpIH1cbiAgfVxuXG4gIGxvZyhraW5kLCBtc2dDYWxsYmFjayl7XG4gICAgdGhpcy5saXZlU29ja2V0LmxvZyh0aGlzLCBraW5kLCBtc2dDYWxsYmFjaylcbiAgfVxuXG4gIHRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lID0gZnVuY3Rpb24oKXt9KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gIH1cblxuICB3aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgY2FsbGJhY2spe1xuICAgIGlmKHBoeFRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IHBoeFRhcmdldCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpe1xuICAgICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5vd25lcihwaHhUYXJnZXQsIHZpZXcgPT4gY2FsbGJhY2sodmlldywgcGh4VGFyZ2V0KSlcbiAgICB9XG5cbiAgICBpZihpc0NpZChwaHhUYXJnZXQpKXtcbiAgICAgIGxldCB0YXJnZXRzID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmVsLCBwaHhUYXJnZXQpXG4gICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGxvZ0Vycm9yKGBubyBjb21wb25lbnQgZm91bmQgbWF0Y2hpbmcgcGh4LXRhcmdldCBvZiAke3BoeFRhcmdldH1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcywgcGFyc2VJbnQocGh4VGFyZ2V0KSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRhcmdldHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGh4VGFyZ2V0KSlcbiAgICAgIGlmKHRhcmdldHMubGVuZ3RoID09PSAwKXsgbG9nRXJyb3IoYG5vdGhpbmcgZm91bmQgbWF0Y2hpbmcgdGhlIHBoeC10YXJnZXQgc2VsZWN0b3IgXCIke3BoeFRhcmdldH1cImApIH1cbiAgICAgIHRhcmdldHMuZm9yRWFjaCh0YXJnZXQgPT4gdGhpcy5saXZlU29ja2V0Lm93bmVyKHRhcmdldCwgdmlldyA9PiBjYWxsYmFjayh2aWV3LCB0YXJnZXQpKSlcbiAgICB9XG4gIH1cblxuICBhcHBseURpZmYodHlwZSwgcmF3RGlmZiwgY2FsbGJhY2spe1xuICAgIHRoaXMubG9nKHR5cGUsICgpID0+IFtcIlwiLCBjbG9uZShyYXdEaWZmKV0pXG4gICAgbGV0IHtkaWZmLCByZXBseSwgZXZlbnRzLCB0aXRsZX0gPSBSZW5kZXJlZC5leHRyYWN0KHJhd0RpZmYpXG4gICAgaWYodGl0bGUpeyBET00ucHV0VGl0bGUodGl0bGUpIH1cblxuICAgIGNhbGxiYWNrKHtkaWZmLCByZXBseSwgZXZlbnRzfSlcbiAgICByZXR1cm4gcmVwbHlcbiAgfVxuXG4gIG9uSm9pbihyZXNwKXtcbiAgICBsZXQge3JlbmRlcmVkLCBjb250YWluZXJ9ID0gcmVzcFxuICAgIGlmKGNvbnRhaW5lcil7XG4gICAgICBsZXQgW3RhZywgYXR0cnNdID0gY29udGFpbmVyXG4gICAgICB0aGlzLmVsID0gRE9NLnJlcGxhY2VSb290Q29udGFpbmVyKHRoaXMuZWwsIHRhZywgYXR0cnMpXG4gICAgfVxuICAgIHRoaXMuY2hpbGRKb2lucyA9IDBcbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gdHJ1ZVxuICAgIHRoaXMuZmxhc2ggPSBudWxsXG5cbiAgICBCcm93c2VyLmRyb3BMb2NhbCh0aGlzLmxpdmVTb2NrZXQubG9jYWxTdG9yYWdlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIENPTlNFQ1VUSVZFX1JFTE9BRFMpXG4gICAgdGhpcy5hcHBseURpZmYoXCJtb3VudFwiLCByZW5kZXJlZCwgKHtkaWZmLCBldmVudHN9KSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVkID0gbmV3IFJlbmRlcmVkKHRoaXMuaWQsIGRpZmYpXG4gICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVyQ29udGFpbmVyKG51bGwsIFwiam9pblwiKVxuICAgICAgdGhpcy5kcm9wUGVuZGluZ1JlZnMoKVxuICAgICAgbGV0IGZvcm1zID0gdGhpcy5mb3Jtc0ZvclJlY292ZXJ5KGh0bWwpXG4gICAgICB0aGlzLmpvaW5Db3VudCsrXG5cbiAgICAgIGlmKGZvcm1zLmxlbmd0aCA+IDApe1xuICAgICAgICBmb3Jtcy5mb3JFYWNoKChbZm9ybSwgbmV3Rm9ybSwgbmV3Q2lkXSwgaSkgPT4ge1xuICAgICAgICAgIHRoaXMucHVzaEZvcm1SZWNvdmVyeShmb3JtLCBuZXdDaWQsIHJlc3AgPT4ge1xuICAgICAgICAgICAgaWYoaSA9PT0gZm9ybXMubGVuZ3RoIC0gMSl7XG4gICAgICAgICAgICAgIHRoaXMub25Kb2luQ29tcGxldGUocmVzcCwgaHRtbCwgZXZlbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uSm9pbkNvbXBsZXRlKHJlc3AsIGh0bWwsIGV2ZW50cylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZHJvcFBlbmRpbmdSZWZzKCl7XG4gICAgRE9NLmFsbChkb2N1bWVudCwgYFske1BIWF9SRUZfU1JDfT1cIiR7dGhpcy5pZH1cIl1bJHtQSFhfUkVGfV1gLCBlbCA9PiB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRilcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGX1NSQylcbiAgICB9KVxuICB9XG5cbiAgb25Kb2luQ29tcGxldGUoe2xpdmVfcGF0Y2h9LCBodG1sLCBldmVudHMpe1xuICAgIC8vIEluIG9yZGVyIHRvIHByb3ZpZGUgYSBiZXR0ZXIgZXhwZXJpZW5jZSwgd2Ugd2FudCB0byBqb2luXG4gICAgLy8gYWxsIExpdmVWaWV3cyBmaXJzdCBhbmQgb25seSB0aGVuIGFwcGx5IHRoZWlyIHBhdGNoZXMuXG4gICAgaWYodGhpcy5qb2luQ291bnQgPiAxIHx8ICh0aGlzLnBhcmVudCAmJiAhdGhpcy5wYXJlbnQuaXNKb2luUGVuZGluZygpKSl7XG4gICAgICByZXR1cm4gdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBldmVudHMpXG4gICAgfVxuXG4gICAgLy8gT25lIGRvd25zaWRlIG9mIHRoaXMgYXBwcm9hY2ggaXMgdGhhdCB3ZSBuZWVkIHRvIGZpbmQgcGh4Q2hpbGRyZW5cbiAgICAvLyBpbiB0aGUgaHRtbCBmcmFnbWVudCwgaW5zdGVhZCBvZiBkaXJlY3RseSBvbiB0aGUgRE9NLiBUaGUgZnJhZ21lbnRcbiAgICAvLyBhbHNvIGRvZXMgbm90IGluY2x1ZGUgUEhYX1NUQVRJQywgc28gd2UgbmVlZCB0byBjb3B5IGl0IG92ZXIgZnJvbVxuICAgIC8vIHRoZSBET00uXG4gICAgbGV0IG5ld0NoaWxkcmVuID0gRE9NLmZpbmRQaHhDaGlsZHJlbkluRnJhZ21lbnQoaHRtbCwgdGhpcy5pZCkuZmlsdGVyKHRvRWwgPT4ge1xuICAgICAgbGV0IGZyb21FbCA9IHRvRWwuaWQgJiYgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke3RvRWwuaWR9XCJdYClcbiAgICAgIGxldCBwaHhTdGF0aWMgPSBmcm9tRWwgJiYgZnJvbUVsLmdldEF0dHJpYnV0ZShQSFhfU1RBVElDKVxuICAgICAgaWYocGh4U3RhdGljKXsgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQywgcGh4U3RhdGljKSB9XG4gICAgICByZXR1cm4gdGhpcy5qb2luQ2hpbGQodG9FbClcbiAgICB9KVxuXG4gICAgaWYobmV3Q2hpbGRyZW4ubGVuZ3RoID09PSAwKXtcbiAgICAgIGlmKHRoaXMucGFyZW50KXtcbiAgICAgICAgdGhpcy5yb290LnBlbmRpbmdKb2luT3BzLnB1c2goW3RoaXMsICgpID0+IHRoaXMuYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgZXZlbnRzKV0pXG4gICAgICAgIHRoaXMucGFyZW50LmFja0pvaW4odGhpcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25BbGxDaGlsZEpvaW5zQ29tcGxldGUoKVxuICAgICAgICB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIGV2ZW50cylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb290LnBlbmRpbmdKb2luT3BzLnB1c2goW3RoaXMsICgpID0+IHRoaXMuYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgZXZlbnRzKV0pXG4gICAgfVxuICB9XG5cbiAgYXR0YWNoVHJ1ZURvY0VsKCl7XG4gICAgdGhpcy5lbCA9IERPTS5ieUlkKHRoaXMuaWQpXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQsIHRoaXMucm9vdC5pZClcbiAgfVxuXG4gIGFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIGV2ZW50cyl7XG4gICAgdGhpcy5hdHRhY2hUcnVlRG9jRWwoKVxuICAgIGxldCBwYXRjaCA9IG5ldyBET01QYXRjaCh0aGlzLCB0aGlzLmVsLCB0aGlzLmlkLCBodG1sLCBudWxsKVxuICAgIHBhdGNoLm1hcmtQcnVuYWJsZUNvbnRlbnRGb3JSZW1vdmFsKClcbiAgICB0aGlzLnBlcmZvcm1QYXRjaChwYXRjaCwgZmFsc2UpXG4gICAgdGhpcy5qb2luTmV3Q2hpbGRyZW4oKVxuICAgIERPTS5hbGwodGhpcy5lbCwgYFske3RoaXMuYmluZGluZyhQSFhfSE9PSyl9XSwgW2RhdGEtcGh4LSR7UEhYX0hPT0t9XWAsIGhvb2tFbCA9PiB7XG4gICAgICBsZXQgaG9vayA9IHRoaXMuYWRkSG9vayhob29rRWwpXG4gICAgICBpZihob29rKXsgaG9vay5fX21vdW50ZWQoKSB9XG4gICAgfSlcblxuICAgIHRoaXMuam9pblBlbmRpbmcgPSBmYWxzZVxuICAgIHRoaXMubGl2ZVNvY2tldC5kaXNwYXRjaEV2ZW50cyhldmVudHMpXG4gICAgdGhpcy5hcHBseVBlbmRpbmdVcGRhdGVzKClcblxuICAgIGlmKGxpdmVfcGF0Y2gpe1xuICAgICAgbGV0IHtraW5kLCB0b30gPSBsaXZlX3BhdGNoXG4gICAgICB0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVBhdGNoKHRvLCBraW5kKVxuICAgIH1cbiAgICB0aGlzLmhpZGVMb2FkZXIoKVxuICAgIGlmKHRoaXMuam9pbkNvdW50ID4gMSl7IHRoaXMudHJpZ2dlclJlY29ubmVjdGVkKCkgfVxuICAgIHRoaXMuc3RvcENhbGxiYWNrKClcbiAgfVxuXG4gIHRyaWdnZXJCZWZvcmVVcGRhdGVIb29rKGZyb21FbCwgdG9FbCl7XG4gICAgdGhpcy5saXZlU29ja2V0LnRyaWdnZXJET00oXCJvbkJlZm9yZUVsVXBkYXRlZFwiLCBbZnJvbUVsLCB0b0VsXSlcbiAgICBsZXQgaG9vayA9IHRoaXMuZ2V0SG9vayhmcm9tRWwpXG4gICAgbGV0IGlzSWdub3JlZCA9IGhvb2sgJiYgRE9NLmlzSWdub3JlZChmcm9tRWwsIHRoaXMuYmluZGluZyhQSFhfVVBEQVRFKSlcbiAgICBpZihob29rICYmICFmcm9tRWwuaXNFcXVhbE5vZGUodG9FbCkgJiYgIShpc0lnbm9yZWQgJiYgaXNFcXVhbE9iaihmcm9tRWwuZGF0YXNldCwgdG9FbC5kYXRhc2V0KSkpe1xuICAgICAgaG9vay5fX2JlZm9yZVVwZGF0ZSgpXG4gICAgICByZXR1cm4gaG9va1xuICAgIH1cbiAgfVxuXG4gIHBlcmZvcm1QYXRjaChwYXRjaCwgcHJ1bmVDaWRzKXtcbiAgICBsZXQgcmVtb3ZlZEVscyA9IFtdXG4gICAgbGV0IHBoeENoaWxkcmVuQWRkZWQgPSBmYWxzZVxuICAgIGxldCB1cGRhdGVkSG9va0lkcyA9IG5ldyBTZXQoKVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJhZGRlZFwiLCBlbCA9PiB7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQudHJpZ2dlckRPTShcIm9uTm9kZUFkZGVkXCIsIFtlbF0pXG5cbiAgICAgIGxldCBuZXdIb29rID0gdGhpcy5hZGRIb29rKGVsKVxuICAgICAgaWYobmV3SG9vayl7IG5ld0hvb2suX19tb3VudGVkKCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInBoeENoaWxkQWRkZWRcIiwgZWwgPT4ge1xuICAgICAgaWYoRE9NLmlzUGh4U3RpY2t5KGVsKSl7XG4gICAgICAgIHRoaXMubGl2ZVNvY2tldC5qb2luUm9vdFZpZXdzKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBoeENoaWxkcmVuQWRkZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIHBhdGNoLmJlZm9yZShcInVwZGF0ZWRcIiwgKGZyb21FbCwgdG9FbCkgPT4ge1xuICAgICAgbGV0IGhvb2sgPSB0aGlzLnRyaWdnZXJCZWZvcmVVcGRhdGVIb29rKGZyb21FbCwgdG9FbClcbiAgICAgIGlmKGhvb2speyB1cGRhdGVkSG9va0lkcy5hZGQoZnJvbUVsLmlkKSB9XG4gICAgfSlcblxuICAgIHBhdGNoLmFmdGVyKFwidXBkYXRlZFwiLCBlbCA9PiB7XG4gICAgICBpZih1cGRhdGVkSG9va0lkcy5oYXMoZWwuaWQpKXsgdGhpcy5nZXRIb29rKGVsKS5fX3VwZGF0ZWQoKSB9XG4gICAgfSlcblxuICAgIHBhdGNoLmFmdGVyKFwiZGlzY2FyZGVkXCIsIChlbCkgPT4ge1xuICAgICAgaWYoZWwubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKXsgcmVtb3ZlZEVscy5wdXNoKGVsKSB9XG4gICAgfSlcblxuICAgIHBhdGNoLmFmdGVyKFwidHJhbnNpdGlvbnNEaXNjYXJkZWRcIiwgZWxzID0+IHRoaXMuYWZ0ZXJFbGVtZW50c1JlbW92ZWQoZWxzLCBwcnVuZUNpZHMpKVxuICAgIHBhdGNoLnBlcmZvcm0oKVxuICAgIHRoaXMuYWZ0ZXJFbGVtZW50c1JlbW92ZWQocmVtb3ZlZEVscywgcHJ1bmVDaWRzKVxuXG4gICAgcmV0dXJuIHBoeENoaWxkcmVuQWRkZWRcbiAgfVxuXG4gIGFmdGVyRWxlbWVudHNSZW1vdmVkKGVsZW1lbnRzLCBwcnVuZUNpZHMpe1xuICAgIGxldCBkZXN0cm95ZWRDSURzID0gW11cbiAgICBlbGVtZW50cy5mb3JFYWNoKHBhcmVudCA9PiB7XG4gICAgICBsZXQgY29tcG9uZW50cyA9IERPTS5hbGwocGFyZW50LCBgWyR7UEhYX0NPTVBPTkVOVH1dYClcbiAgICAgIGxldCBob29rcyA9IERPTS5hbGwocGFyZW50LCBgWyR7dGhpcy5iaW5kaW5nKFBIWF9IT09LKX1dYClcbiAgICAgIGNvbXBvbmVudHMuY29uY2F0KHBhcmVudCkuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIGxldCBjaWQgPSB0aGlzLmNvbXBvbmVudElEKGVsKVxuICAgICAgICBpZihpc0NpZChjaWQpICYmIGRlc3Ryb3llZENJRHMuaW5kZXhPZihjaWQpID09PSAtMSl7IGRlc3Ryb3llZENJRHMucHVzaChjaWQpIH1cbiAgICAgIH0pXG4gICAgICBob29rcy5jb25jYXQocGFyZW50KS5mb3JFYWNoKGhvb2tFbCA9PiB7XG4gICAgICAgIGxldCBob29rID0gdGhpcy5nZXRIb29rKGhvb2tFbClcbiAgICAgICAgaG9vayAmJiB0aGlzLmRlc3Ryb3lIb29rKGhvb2spXG4gICAgICB9KVxuICAgIH0pXG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBwcnVuZUNpZHMgb24gam9pbnMuIE90aGVyd2lzZSwgaW4gY2FzZSBvZlxuICAgIC8vIHJlam9pbnMsIHdlIG1heSBub3RpZnkgY2lkcyB0aGF0IG5vIGxvbmdlciBiZWxvbmcgdG8gdGhlXG4gICAgLy8gY3VycmVudCBMaXZlVmlldyB0byBiZSByZW1vdmVkLlxuICAgIGlmKHBydW5lQ2lkcyl7XG4gICAgICB0aGlzLm1heWJlUHVzaENvbXBvbmVudHNEZXN0cm95ZWQoZGVzdHJveWVkQ0lEcylcbiAgICB9XG4gIH1cblxuICBqb2luTmV3Q2hpbGRyZW4oKXtcbiAgICBET00uZmluZFBoeENoaWxkcmVuKHRoaXMuZWwsIHRoaXMuaWQpLmZvckVhY2goZWwgPT4gdGhpcy5qb2luQ2hpbGQoZWwpKVxuICB9XG5cbiAgZ2V0Q2hpbGRCeUlkKGlkKXsgcmV0dXJuIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXVtpZF0gfVxuXG4gIGdldERlc2NlbmRlbnRCeUVsKGVsKXtcbiAgICBpZihlbC5pZCA9PT0gdGhpcy5pZCl7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltlbC5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRCldW2VsLmlkXVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3lEZXNjZW5kZW50KGlkKXtcbiAgICBmb3IobGV0IHBhcmVudElkIGluIHRoaXMucm9vdC5jaGlsZHJlbil7XG4gICAgICBmb3IobGV0IGNoaWxkSWQgaW4gdGhpcy5yb290LmNoaWxkcmVuW3BhcmVudElkXSl7XG4gICAgICAgIGlmKGNoaWxkSWQgPT09IGlkKXsgcmV0dXJuIHRoaXMucm9vdC5jaGlsZHJlbltwYXJlbnRJZF1bY2hpbGRJZF0uZGVzdHJveSgpIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBqb2luQ2hpbGQoZWwpe1xuICAgIGxldCBjaGlsZCA9IHRoaXMuZ2V0Q2hpbGRCeUlkKGVsLmlkKVxuICAgIGlmKCFjaGlsZCl7XG4gICAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCB0aGlzLmxpdmVTb2NrZXQsIHRoaXMpXG4gICAgICB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF1bdmlldy5pZF0gPSB2aWV3XG4gICAgICB2aWV3LmpvaW4oKVxuICAgICAgdGhpcy5jaGlsZEpvaW5zKytcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgaXNKb2luUGVuZGluZygpeyByZXR1cm4gdGhpcy5qb2luUGVuZGluZyB9XG5cbiAgYWNrSm9pbihfY2hpbGQpe1xuICAgIHRoaXMuY2hpbGRKb2lucy0tXG5cbiAgICBpZih0aGlzLmNoaWxkSm9pbnMgPT09IDApe1xuICAgICAgaWYodGhpcy5wYXJlbnQpe1xuICAgICAgICB0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkFsbENoaWxkSm9pbnNDb21wbGV0ZSgpe1xuICAgIHRoaXMuam9pbkNhbGxiYWNrKCgpID0+IHtcbiAgICAgIHRoaXMucGVuZGluZ0pvaW5PcHMuZm9yRWFjaCgoW3ZpZXcsIG9wXSkgPT4ge1xuICAgICAgICBpZighdmlldy5pc0Rlc3Ryb3llZCgpKXsgb3AoKSB9XG4gICAgICB9KVxuICAgICAgdGhpcy5wZW5kaW5nSm9pbk9wcyA9IFtdXG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZShkaWZmLCBldmVudHMpe1xuICAgIGlmKHRoaXMuaXNKb2luUGVuZGluZygpIHx8ICh0aGlzLmxpdmVTb2NrZXQuaGFzUGVuZGluZ0xpbmsoKSAmJiAhRE9NLmlzUGh4U3RpY2t5KHRoaXMuZWwpKSl7XG4gICAgICByZXR1cm4gdGhpcy5wZW5kaW5nRGlmZnMucHVzaCh7ZGlmZiwgZXZlbnRzfSlcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVkLm1lcmdlRGlmZihkaWZmKVxuICAgIGxldCBwaHhDaGlsZHJlbkFkZGVkID0gZmFsc2VcblxuICAgIC8vIFdoZW4gdGhlIGRpZmYgb25seSBjb250YWlucyBjb21wb25lbnQgZGlmZnMsIHRoZW4gd2FsayBjb21wb25lbnRzXG4gICAgLy8gYW5kIHBhdGNoIG9ubHkgdGhlIHBhcmVudCBjb21wb25lbnQgY29udGFpbmVycyBmb3VuZCBpbiB0aGUgZGlmZi5cbiAgICAvLyBPdGhlcndpc2UsIHBhdGNoIGVudGlyZSBMViBjb250YWluZXIuXG4gICAgaWYodGhpcy5yZW5kZXJlZC5pc0NvbXBvbmVudE9ubHlEaWZmKGRpZmYpKXtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC50aW1lKFwiY29tcG9uZW50IHBhdGNoIGNvbXBsZXRlXCIsICgpID0+IHtcbiAgICAgICAgbGV0IHBhcmVudENpZHMgPSBET00uZmluZFBhcmVudENJRHModGhpcy5lbCwgdGhpcy5yZW5kZXJlZC5jb21wb25lbnRDSURzKGRpZmYpKVxuICAgICAgICBwYXJlbnRDaWRzLmZvckVhY2gocGFyZW50Q0lEID0+IHtcbiAgICAgICAgICBpZih0aGlzLmNvbXBvbmVudFBhdGNoKHRoaXMucmVuZGVyZWQuZ2V0Q29tcG9uZW50KGRpZmYsIHBhcmVudENJRCksIHBhcmVudENJRCkpeyBwaHhDaGlsZHJlbkFkZGVkID0gdHJ1ZSB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZighaXNFbXB0eShkaWZmKSl7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQudGltZShcImZ1bGwgcGF0Y2ggY29tcGxldGVcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVyQ29udGFpbmVyKGRpZmYsIFwidXBkYXRlXCIpXG4gICAgICAgIGxldCBwYXRjaCA9IG5ldyBET01QYXRjaCh0aGlzLCB0aGlzLmVsLCB0aGlzLmlkLCBodG1sLCBudWxsKVxuICAgICAgICBwaHhDaGlsZHJlbkFkZGVkID0gdGhpcy5wZXJmb3JtUGF0Y2gocGF0Y2gsIHRydWUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMubGl2ZVNvY2tldC5kaXNwYXRjaEV2ZW50cyhldmVudHMpXG4gICAgaWYocGh4Q2hpbGRyZW5BZGRlZCl7IHRoaXMuam9pbk5ld0NoaWxkcmVuKCkgfVxuICB9XG5cbiAgcmVuZGVyQ29udGFpbmVyKGRpZmYsIGtpbmQpe1xuICAgIHJldHVybiB0aGlzLmxpdmVTb2NrZXQudGltZShgdG9TdHJpbmcgZGlmZiAoJHtraW5kfSlgLCAoKSA9PiB7XG4gICAgICBsZXQgdGFnID0gdGhpcy5lbC50YWdOYW1lXG4gICAgICAvLyBEb24ndCBza2lwIGFueSBjb21wb25lbnQgaW4gdGhlIGRpZmYgbm9yIGFueSBtYXJrZWQgYXMgcHJ1bmVkXG4gICAgICAvLyAoYXMgdGhleSBtYXkgaGF2ZSBiZWVuIGFkZGVkIGJhY2spXG4gICAgICBsZXQgY2lkcyA9IGRpZmYgPyB0aGlzLnJlbmRlcmVkLmNvbXBvbmVudENJRHMoZGlmZikuY29uY2F0KHRoaXMucHJ1bmluZ0NJRHMpIDogbnVsbFxuICAgICAgbGV0IGh0bWwgPSB0aGlzLnJlbmRlcmVkLnRvU3RyaW5nKGNpZHMpXG4gICAgICByZXR1cm4gYDwke3RhZ30+JHtodG1sfTwvJHt0YWd9PmBcbiAgICB9KVxuICB9XG5cbiAgY29tcG9uZW50UGF0Y2goZGlmZiwgY2lkKXtcbiAgICBpZihpc0VtcHR5KGRpZmYpKSByZXR1cm4gZmFsc2VcbiAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVyZWQuY29tcG9uZW50VG9TdHJpbmcoY2lkKVxuICAgIGxldCBwYXRjaCA9IG5ldyBET01QYXRjaCh0aGlzLCB0aGlzLmVsLCB0aGlzLmlkLCBodG1sLCBjaWQpXG4gICAgbGV0IGNoaWxkcmVuQWRkZWQgPSB0aGlzLnBlcmZvcm1QYXRjaChwYXRjaCwgdHJ1ZSlcbiAgICByZXR1cm4gY2hpbGRyZW5BZGRlZFxuICB9XG5cbiAgZ2V0SG9vayhlbCl7IHJldHVybiB0aGlzLnZpZXdIb29rc1tWaWV3SG9vay5lbGVtZW50SUQoZWwpXSB9XG5cbiAgYWRkSG9vayhlbCl7XG4gICAgaWYoVmlld0hvb2suZWxlbWVudElEKGVsKSB8fCAhZWwuZ2V0QXR0cmlidXRlKXsgcmV0dXJuIH1cbiAgICBsZXQgaG9va05hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoYGRhdGEtcGh4LSR7UEhYX0hPT0t9YCkgfHwgZWwuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfSE9PSykpXG4gICAgaWYoaG9va05hbWUgJiYgIXRoaXMub3duc0VsZW1lbnQoZWwpKXsgcmV0dXJuIH1cbiAgICBsZXQgY2FsbGJhY2tzID0gdGhpcy5saXZlU29ja2V0LmdldEhvb2tDYWxsYmFja3MoaG9va05hbWUpXG5cbiAgICBpZihjYWxsYmFja3Mpe1xuICAgICAgaWYoIWVsLmlkKXsgbG9nRXJyb3IoYG5vIERPTSBJRCBmb3IgaG9vayBcIiR7aG9va05hbWV9XCIuIEhvb2tzIHJlcXVpcmUgYSB1bmlxdWUgSUQgb24gZWFjaCBlbGVtZW50LmAsIGVsKSB9XG4gICAgICBsZXQgaG9vayA9IG5ldyBWaWV3SG9vayh0aGlzLCBlbCwgY2FsbGJhY2tzKVxuICAgICAgdGhpcy52aWV3SG9va3NbVmlld0hvb2suZWxlbWVudElEKGhvb2suZWwpXSA9IGhvb2tcbiAgICAgIHJldHVybiBob29rXG4gICAgfSBlbHNlIGlmKGhvb2tOYW1lICE9PSBudWxsKXtcbiAgICAgIGxvZ0Vycm9yKGB1bmtub3duIGhvb2sgZm91bmQgZm9yIFwiJHtob29rTmFtZX1cImAsIGVsKVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3lIb29rKGhvb2spe1xuICAgIGhvb2suX19kZXN0cm95ZWQoKVxuICAgIGhvb2suX19jbGVhbnVwX18oKVxuICAgIGRlbGV0ZSB0aGlzLnZpZXdIb29rc1tWaWV3SG9vay5lbGVtZW50SUQoaG9vay5lbCldXG4gIH1cblxuICBhcHBseVBlbmRpbmdVcGRhdGVzKCl7XG4gICAgdGhpcy5wZW5kaW5nRGlmZnMuZm9yRWFjaCgoe2RpZmYsIGV2ZW50c30pID0+IHRoaXMudXBkYXRlKGRpZmYsIGV2ZW50cykpXG4gICAgdGhpcy5wZW5kaW5nRGlmZnMgPSBbXVxuICB9XG5cbiAgb25DaGFubmVsKGV2ZW50LCBjYil7XG4gICAgdGhpcy5saXZlU29ja2V0Lm9uQ2hhbm5lbCh0aGlzLmNoYW5uZWwsIGV2ZW50LCByZXNwID0+IHtcbiAgICAgIGlmKHRoaXMuaXNKb2luUGVuZGluZygpKXtcbiAgICAgICAgdGhpcy5yb290LnBlbmRpbmdKb2luT3BzLnB1c2goW3RoaXMsICgpID0+IGNiKHJlc3ApXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IGNiKHJlc3ApKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBiaW5kQ2hhbm5lbCgpe1xuICAgIC8vIFRoZSBkaWZmIGV2ZW50IHNob3VsZCBiZSBoYW5kbGVkIGJ5IHRoZSByZWd1bGFyIHVwZGF0ZSBvcGVyYXRpb25zLlxuICAgIC8vIEFsbCBvdGhlciBvcGVyYXRpb25zIGFyZSBxdWV1ZWQgdG8gYmUgYXBwbGllZCBvbmx5IGFmdGVyIGpvaW4uXG4gICAgdGhpcy5saXZlU29ja2V0Lm9uQ2hhbm5lbCh0aGlzLmNoYW5uZWwsIFwiZGlmZlwiLCAocmF3RGlmZikgPT4ge1xuICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICB0aGlzLmFwcGx5RGlmZihcInVwZGF0ZVwiLCByYXdEaWZmLCAoe2RpZmYsIGV2ZW50c30pID0+IHRoaXMudXBkYXRlKGRpZmYsIGV2ZW50cykpXG4gICAgICB9KVxuICAgIH0pXG4gICAgdGhpcy5vbkNoYW5uZWwoXCJyZWRpcmVjdFwiLCAoe3RvLCBmbGFzaH0pID0+IHRoaXMub25SZWRpcmVjdCh7dG8sIGZsYXNofSkpXG4gICAgdGhpcy5vbkNoYW5uZWwoXCJsaXZlX3BhdGNoXCIsIChyZWRpcikgPT4gdGhpcy5vbkxpdmVQYXRjaChyZWRpcikpXG4gICAgdGhpcy5vbkNoYW5uZWwoXCJsaXZlX3JlZGlyZWN0XCIsIChyZWRpcikgPT4gdGhpcy5vbkxpdmVSZWRpcmVjdChyZWRpcikpXG4gICAgdGhpcy5jaGFubmVsLm9uRXJyb3IocmVhc29uID0+IHRoaXMub25FcnJvcihyZWFzb24pKVxuICAgIHRoaXMuY2hhbm5lbC5vbkNsb3NlKHJlYXNvbiA9PiB0aGlzLm9uQ2xvc2UocmVhc29uKSlcbiAgfVxuXG4gIGRlc3Ryb3lBbGxDaGlsZHJlbigpe1xuICAgIGZvcihsZXQgaWQgaW4gdGhpcy5yb290LmNoaWxkcmVuW3RoaXMuaWRdKXtcbiAgICAgIHRoaXMuZ2V0Q2hpbGRCeUlkKGlkKS5kZXN0cm95KClcbiAgICB9XG4gIH1cblxuICBvbkxpdmVSZWRpcmVjdChyZWRpcil7XG4gICAgbGV0IHt0bywga2luZCwgZmxhc2h9ID0gcmVkaXJcbiAgICBsZXQgdXJsID0gdGhpcy5leHBhbmRVUkwodG8pXG4gICAgdGhpcy5saXZlU29ja2V0Lmhpc3RvcnlSZWRpcmVjdCh1cmwsIGtpbmQsIGZsYXNoKVxuICB9XG5cbiAgb25MaXZlUGF0Y2gocmVkaXIpe1xuICAgIGxldCB7dG8sIGtpbmR9ID0gcmVkaXJcbiAgICB0aGlzLmhyZWYgPSB0aGlzLmV4cGFuZFVSTCh0bylcbiAgICB0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVBhdGNoKHRvLCBraW5kKVxuICB9XG5cbiAgZXhwYW5kVVJMKHRvKXtcbiAgICByZXR1cm4gdG8uc3RhcnRzV2l0aChcIi9cIikgPyBgJHt3aW5kb3cubG9jYXRpb24ucHJvdG9jb2x9Ly8ke3dpbmRvdy5sb2NhdGlvbi5ob3N0fSR7dG99YCA6IHRvXG4gIH1cblxuICBvblJlZGlyZWN0KHt0bywgZmxhc2h9KXsgdGhpcy5saXZlU29ja2V0LnJlZGlyZWN0KHRvLCBmbGFzaCkgfVxuXG4gIGlzRGVzdHJveWVkKCl7IHJldHVybiB0aGlzLmRlc3Ryb3llZCB9XG5cbiAgam9pbihjYWxsYmFjayl7XG4gICAgaWYodGhpcy5pc01haW4oKSl7XG4gICAgICB0aGlzLnN0b3BDYWxsYmFjayA9IHRoaXMubGl2ZVNvY2tldC53aXRoUGFnZUxvYWRpbmcoe3RvOiB0aGlzLmhyZWYsIGtpbmQ6IFwiaW5pdGlhbFwifSlcbiAgICB9XG4gICAgdGhpcy5qb2luQ2FsbGJhY2sgPSAob25Eb25lKSA9PiB7XG4gICAgICBvbkRvbmUgPSBvbkRvbmUgfHwgZnVuY3Rpb24oKXt9XG4gICAgICBjYWxsYmFjayA/IGNhbGxiYWNrKHRoaXMuam9pbkNvdW50LCBvbkRvbmUpIDogb25Eb25lKClcbiAgICB9XG4gICAgdGhpcy5saXZlU29ja2V0LndyYXBQdXNoKHRoaXMsIHt0aW1lb3V0OiBmYWxzZX0sICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmNoYW5uZWwuam9pbigpXG4gICAgICAgIC5yZWNlaXZlKFwib2tcIiwgZGF0YSA9PiB7XG4gICAgICAgICAgaWYoIXRoaXMuaXNEZXN0cm95ZWQoKSl7XG4gICAgICAgICAgICB0aGlzLmxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB0aGlzLm9uSm9pbihkYXRhKSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgcmVzcCA9PiAhdGhpcy5pc0Rlc3Ryb3llZCgpICYmIHRoaXMub25Kb2luRXJyb3IocmVzcCkpXG4gICAgICAgIC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiAhdGhpcy5pc0Rlc3Ryb3llZCgpICYmIHRoaXMub25Kb2luRXJyb3Ioe3JlYXNvbjogXCJ0aW1lb3V0XCJ9KSlcbiAgICB9KVxuICB9XG5cbiAgb25Kb2luRXJyb3IocmVzcCl7XG4gICAgaWYocmVzcC5yZWFzb24gPT09IFwidW5hdXRob3JpemVkXCIgfHwgcmVzcC5yZWFzb24gPT09IFwic3RhbGVcIil7XG4gICAgICB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtcInVuYXV0aG9yaXplZCBsaXZlX3JlZGlyZWN0LiBGYWxsaW5nIGJhY2sgdG8gcGFnZSByZXF1ZXN0XCIsIHJlc3BdKVxuICAgICAgcmV0dXJuIHRoaXMub25SZWRpcmVjdCh7dG86IHRoaXMuaHJlZn0pXG4gICAgfVxuICAgIGlmKHJlc3AucmVkaXJlY3QgfHwgcmVzcC5saXZlX3JlZGlyZWN0KXtcbiAgICAgIHRoaXMuam9pblBlbmRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy5jaGFubmVsLmxlYXZlKClcbiAgICB9XG4gICAgaWYocmVzcC5yZWRpcmVjdCl7IHJldHVybiB0aGlzLm9uUmVkaXJlY3QocmVzcC5yZWRpcmVjdCkgfVxuICAgIGlmKHJlc3AubGl2ZV9yZWRpcmVjdCl7IHJldHVybiB0aGlzLm9uTGl2ZVJlZGlyZWN0KHJlc3AubGl2ZV9yZWRpcmVjdCkgfVxuICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW1widW5hYmxlIHRvIGpvaW5cIiwgcmVzcF0pXG4gICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5yZWxvYWRXaXRoSml0dGVyKHRoaXMpXG4gIH1cblxuICBvbkNsb3NlKHJlYXNvbil7XG4gICAgaWYodGhpcy5pc0Rlc3Ryb3llZCgpKXsgcmV0dXJuIH1cbiAgICBpZigodGhpcy5pc0pvaW5QZW5kaW5nKCkgJiYgZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlICE9PSBcImhpZGRlblwiKSB8fFxuICAgICAgKHRoaXMubGl2ZVNvY2tldC5oYXNQZW5kaW5nTGluaygpICYmIHJlYXNvbiAhPT0gXCJsZWF2ZVwiKSl7XG5cbiAgICAgIHJldHVybiB0aGlzLmxpdmVTb2NrZXQucmVsb2FkV2l0aEppdHRlcih0aGlzKVxuICAgIH1cbiAgICB0aGlzLmRlc3Ryb3lBbGxDaGlsZHJlbigpXG4gICAgdGhpcy5saXZlU29ja2V0LmRyb3BBY3RpdmVFbGVtZW50KHRoaXMpXG4gICAgLy8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBjYW4gYmUgbnVsbCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMVxuICAgIGlmKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpeyBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKSB9XG4gICAgaWYodGhpcy5saXZlU29ja2V0LmlzVW5sb2FkZWQoKSl7XG4gICAgICB0aGlzLnNob3dMb2FkZXIoQkVGT1JFX1VOTE9BRF9MT0FERVJfVElNRU9VVClcbiAgICB9XG4gIH1cblxuICBvbkVycm9yKHJlYXNvbil7XG4gICAgdGhpcy5vbkNsb3NlKHJlYXNvbilcbiAgICB0aGlzLmxvZyhcImVycm9yXCIsICgpID0+IFtcInZpZXcgY3Jhc2hlZFwiLCByZWFzb25dKVxuICAgIGlmKCF0aGlzLmxpdmVTb2NrZXQuaXNVbmxvYWRlZCgpKXsgdGhpcy5kaXNwbGF5RXJyb3IoKSB9XG4gIH1cblxuICBkaXNwbGF5RXJyb3IoKXtcbiAgICBpZih0aGlzLmlzTWFpbigpKXsgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBcInBoeDpwYWdlLWxvYWRpbmctc3RhcnRcIiwge2RldGFpbDoge3RvOiB0aGlzLmhyZWYsIGtpbmQ6IFwiZXJyb3JcIn19KSB9XG4gICAgdGhpcy5zaG93TG9hZGVyKClcbiAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0RJU0NPTk5FQ1RFRF9DTEFTUywgUEhYX0VSUk9SX0NMQVNTKVxuICB9XG5cbiAgcHVzaFdpdGhSZXBseShyZWZHZW5lcmF0b3IsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5ID0gZnVuY3Rpb24gKCl7IH0pe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpeyByZXR1cm4gfVxuXG4gICAgbGV0IFtyZWYsIFtlbF0sIG9wdHNdID0gcmVmR2VuZXJhdG9yID8gcmVmR2VuZXJhdG9yKCkgOiBbbnVsbCwgW10sIHt9XVxuICAgIGxldCBvbkxvYWRpbmdEb25lID0gZnVuY3Rpb24oKXsgfVxuICAgIGlmKG9wdHMucGFnZV9sb2FkaW5nIHx8IChlbCAmJiAoZWwuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfUEFHRV9MT0FESU5HKSkgIT09IG51bGwpKSl7XG4gICAgICBvbkxvYWRpbmdEb25lID0gdGhpcy5saXZlU29ja2V0LndpdGhQYWdlTG9hZGluZyh7a2luZDogXCJlbGVtZW50XCIsIHRhcmdldDogZWx9KVxuICAgIH1cblxuICAgIGlmKHR5cGVvZiAocGF5bG9hZC5jaWQpICE9PSBcIm51bWJlclwiKXsgZGVsZXRlIHBheWxvYWQuY2lkIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5saXZlU29ja2V0LndyYXBQdXNoKHRoaXMsIHt0aW1lb3V0OiB0cnVlfSwgKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFubmVsLnB1c2goZXZlbnQsIHBheWxvYWQsIFBVU0hfVElNRU9VVCkucmVjZWl2ZShcIm9rXCIsIHJlc3AgPT4ge1xuICAgICAgICAgIGlmKHJlZiAhPT0gbnVsbCl7IHRoaXMudW5kb1JlZnMocmVmKSB9XG4gICAgICAgICAgbGV0IGZpbmlzaCA9IChob29rUmVwbHkpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3AucmVkaXJlY3QpeyB0aGlzLm9uUmVkaXJlY3QocmVzcC5yZWRpcmVjdCkgfVxuICAgICAgICAgICAgaWYocmVzcC5saXZlX3BhdGNoKXsgdGhpcy5vbkxpdmVQYXRjaChyZXNwLmxpdmVfcGF0Y2gpIH1cbiAgICAgICAgICAgIGlmKHJlc3AubGl2ZV9yZWRpcmVjdCl7IHRoaXMub25MaXZlUmVkaXJlY3QocmVzcC5saXZlX3JlZGlyZWN0KSB9XG4gICAgICAgICAgICBvbkxvYWRpbmdEb25lKClcbiAgICAgICAgICAgIG9uUmVwbHkocmVzcCwgaG9va1JlcGx5KVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihyZXNwLmRpZmYpe1xuICAgICAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICAgICAgICBsZXQgaG9va1JlcGx5ID0gdGhpcy5hcHBseURpZmYoXCJ1cGRhdGVcIiwgcmVzcC5kaWZmLCAoe2RpZmYsIGV2ZW50c30pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZShkaWZmLCBldmVudHMpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGZpbmlzaChob29rUmVwbHkpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaW5pc2gobnVsbClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIHVuZG9SZWZzKHJlZil7XG4gICAgRE9NLmFsbChkb2N1bWVudCwgYFske1BIWF9SRUZfU1JDfT1cIiR7dGhpcy5pZH1cIl1bJHtQSFhfUkVGfT1cIiR7cmVmfVwiXWAsIGVsID0+IHtcbiAgICAgIGxldCBkaXNhYmxlZFZhbCA9IGVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICAvLyByZW1vdmUgcmVmc1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUYpXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRl9TUkMpXG4gICAgICAvLyByZXN0b3JlIGlucHV0c1xuICAgICAgaWYoZWwuZ2V0QXR0cmlidXRlKFBIWF9SRUFET05MWSkgIT09IG51bGwpe1xuICAgICAgICBlbC5yZWFkT25seSA9IGZhbHNlXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVBRE9OTFkpXG4gICAgICB9XG4gICAgICBpZihkaXNhYmxlZFZhbCAhPT0gbnVsbCl7XG4gICAgICAgIGVsLmRpc2FibGVkID0gZGlzYWJsZWRWYWwgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfRElTQUJMRUQpXG4gICAgICB9XG4gICAgICAvLyByZW1vdmUgY2xhc3Nlc1xuICAgICAgUEhYX0VWRU5UX0NMQVNTRVMuZm9yRWFjaChjbGFzc05hbWUgPT4gRE9NLnJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpKVxuICAgICAgLy8gcmVzdG9yZSBkaXNhYmxlc1xuICAgICAgbGV0IGRpc2FibGVSZXN0b3JlID0gZWwuZ2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSlcbiAgICAgIGlmKGRpc2FibGVSZXN0b3JlICE9PSBudWxsKXtcbiAgICAgICAgZWwuaW5uZXJUZXh0ID0gZGlzYWJsZVJlc3RvcmVcbiAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSlcbiAgICAgIH1cbiAgICAgIGxldCB0b0VsID0gRE9NLnByaXZhdGUoZWwsIFBIWF9SRUYpXG4gICAgICBpZih0b0VsKXtcbiAgICAgICAgbGV0IGhvb2sgPSB0aGlzLnRyaWdnZXJCZWZvcmVVcGRhdGVIb29rKGVsLCB0b0VsKVxuICAgICAgICBET01QYXRjaC5wYXRjaEVsKGVsLCB0b0VsLCB0aGlzLmxpdmVTb2NrZXQuZ2V0QWN0aXZlRWxlbWVudCgpKVxuICAgICAgICBpZihob29rKXsgaG9vay5fX3VwZGF0ZWQoKSB9XG4gICAgICAgIERPTS5kZWxldGVQcml2YXRlKGVsLCBQSFhfUkVGKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBwdXRSZWYoZWxlbWVudHMsIGV2ZW50LCBvcHRzID0ge30pe1xuICAgIGxldCBuZXdSZWYgPSB0aGlzLnJlZisrXG4gICAgbGV0IGRpc2FibGVXaXRoID0gdGhpcy5iaW5kaW5nKFBIWF9ESVNBQkxFX1dJVEgpXG4gICAgaWYob3B0cy5sb2FkaW5nKXsgZWxlbWVudHMgPSBlbGVtZW50cy5jb25jYXQoRE9NLmFsbChkb2N1bWVudCwgb3B0cy5sb2FkaW5nKSl9XG5cbiAgICBlbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYHBoeC0ke2V2ZW50fS1sb2FkaW5nYClcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShQSFhfUkVGLCBuZXdSZWYpXG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRl9TUkMsIHRoaXMuZWwuaWQpXG4gICAgICBsZXQgZGlzYWJsZVRleHQgPSBlbC5nZXRBdHRyaWJ1dGUoZGlzYWJsZVdpdGgpXG4gICAgICBpZihkaXNhYmxlVGV4dCAhPT0gbnVsbCl7XG4gICAgICAgIGlmKCFlbC5nZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVfV0lUSF9SRVNUT1JFKSl7XG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSwgZWwuaW5uZXJUZXh0KVxuICAgICAgICB9XG4gICAgICAgIGlmKGRpc2FibGVUZXh0ICE9PSBcIlwiKXsgZWwuaW5uZXJUZXh0ID0gZGlzYWJsZVRleHQgfVxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIFtuZXdSZWYsIGVsZW1lbnRzLCBvcHRzXVxuICB9XG5cbiAgY29tcG9uZW50SUQoZWwpe1xuICAgIGxldCBjaWQgPSBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpXG4gICAgcmV0dXJuIGNpZCA/IHBhcnNlSW50KGNpZCkgOiBudWxsXG4gIH1cblxuICB0YXJnZXRDb21wb25lbnRJRCh0YXJnZXQsIHRhcmdldEN0eCwgb3B0cyA9IHt9KXtcbiAgICBpZihpc0NpZCh0YXJnZXRDdHgpKXsgcmV0dXJuIHRhcmdldEN0eCB9XG5cbiAgICBsZXQgY2lkT3JTZWxlY3RvciA9IHRhcmdldC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwidGFyZ2V0XCIpKVxuICAgIGlmKGlzQ2lkKGNpZE9yU2VsZWN0b3IpKXtcbiAgICAgIHJldHVybiBwYXJzZUludChjaWRPclNlbGVjdG9yKVxuICAgIH0gZWxzZSBpZih0YXJnZXRDdHggJiYgKGNpZE9yU2VsZWN0b3IgIT09IG51bGwgfHwgb3B0cy50YXJnZXQpKXtcbiAgICAgIHJldHVybiB0aGlzLmNsb3Nlc3RDb21wb25lbnRJRCh0YXJnZXRDdHgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eCl7XG4gICAgaWYoaXNDaWQodGFyZ2V0Q3R4KSl7XG4gICAgICByZXR1cm4gdGFyZ2V0Q3R4XG4gICAgfSBlbHNlIGlmKHRhcmdldEN0eCl7XG4gICAgICByZXR1cm4gbWF5YmUodGFyZ2V0Q3R4LmNsb3Nlc3QoYFske1BIWF9DT01QT05FTlR9XWApLCBlbCA9PiB0aGlzLm93bnNFbGVtZW50KGVsKSAmJiB0aGlzLmNvbXBvbmVudElEKGVsKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBwdXNoSG9va0V2ZW50KHRhcmdldEN0eCwgZXZlbnQsIHBheWxvYWQsIG9uUmVwbHkpe1xuICAgIGlmKCF0aGlzLmlzQ29ubmVjdGVkKCkpe1xuICAgICAgdGhpcy5sb2coXCJob29rXCIsICgpID0+IFtcInVuYWJsZSB0byBwdXNoIGhvb2sgZXZlbnQuIExpdmVWaWV3IG5vdCBjb25uZWN0ZWRcIiwgZXZlbnQsIHBheWxvYWRdKVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGxldCBbcmVmLCBlbHMsIG9wdHNdID0gdGhpcy5wdXRSZWYoW10sIFwiaG9va1wiKVxuICAgIHRoaXMucHVzaFdpdGhSZXBseSgoKSA9PiBbcmVmLCBlbHMsIG9wdHNdLCBcImV2ZW50XCIsIHtcbiAgICAgIHR5cGU6IFwiaG9va1wiLFxuICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgdmFsdWU6IHBheWxvYWQsXG4gICAgICBjaWQ6IHRoaXMuY2xvc2VzdENvbXBvbmVudElEKHRhcmdldEN0eClcbiAgICB9LCAocmVzcCwgcmVwbHkpID0+IG9uUmVwbHkocmVwbHksIHJlZikpXG5cbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICBleHRyYWN0TWV0YShlbCwgbWV0YSwgdmFsdWUpe1xuICAgIGxldCBwcmVmaXggPSB0aGlzLmJpbmRpbmcoXCJ2YWx1ZS1cIilcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZWwuYXR0cmlidXRlcy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZighbWV0YSl7IG1ldGEgPSB7fSB9XG4gICAgICBsZXQgbmFtZSA9IGVsLmF0dHJpYnV0ZXNbaV0ubmFtZVxuICAgICAgaWYobmFtZS5zdGFydHNXaXRoKHByZWZpeCkpeyBtZXRhW25hbWUucmVwbGFjZShwcmVmaXgsIFwiXCIpXSA9IGVsLmdldEF0dHJpYnV0ZShuYW1lKSB9XG4gICAgfVxuICAgIGlmKGVsLnZhbHVlICE9PSB1bmRlZmluZWQpe1xuICAgICAgaWYoIW1ldGEpeyBtZXRhID0ge30gfVxuICAgICAgbWV0YS52YWx1ZSA9IGVsLnZhbHVlXG5cbiAgICAgIGlmKGVsLnRhZ05hbWUgPT09IFwiSU5QVVRcIiAmJiBDSEVDS0FCTEVfSU5QVVRTLmluZGV4T2YoZWwudHlwZSkgPj0gMCAmJiAhZWwuY2hlY2tlZCl7XG4gICAgICAgIGRlbGV0ZSBtZXRhLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGlmKHZhbHVlKXtcbiAgICAgIGlmKCFtZXRhKXsgbWV0YSA9IHt9IH1cbiAgICAgIGZvcihsZXQga2V5IGluIHZhbHVlKXsgbWV0YVtrZXldID0gdmFsdWVba2V5XSB9XG4gICAgfVxuICAgIHJldHVybiBtZXRhXG4gIH1cblxuICBwdXNoRXZlbnQodHlwZSwgZWwsIHRhcmdldEN0eCwgcGh4RXZlbnQsIG1ldGEsIG9wdHMgPSB7fSl7XG4gICAgdGhpcy5wdXNoV2l0aFJlcGx5KCgpID0+IHRoaXMucHV0UmVmKFtlbF0sIHR5cGUsIG9wdHMpLCBcImV2ZW50XCIsIHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICB2YWx1ZTogdGhpcy5leHRyYWN0TWV0YShlbCwgbWV0YSwgb3B0cy52YWx1ZSksXG4gICAgICBjaWQ6IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoZWwsIHRhcmdldEN0eCwgb3B0cylcbiAgICB9KVxuICB9XG5cbiAgcHVzaEZpbGVQcm9ncmVzcyhmaWxlRWwsIGVudHJ5UmVmLCBwcm9ncmVzcywgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQud2l0aGluT3duZXJzKGZpbGVFbC5mb3JtLCAodmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICB2aWV3LnB1c2hXaXRoUmVwbHkobnVsbCwgXCJwcm9ncmVzc1wiLCB7XG4gICAgICAgIGV2ZW50OiBmaWxlRWwuZ2V0QXR0cmlidXRlKHZpZXcuYmluZGluZyhQSFhfUFJPR1JFU1MpKSxcbiAgICAgICAgcmVmOiBmaWxlRWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSxcbiAgICAgICAgZW50cnlfcmVmOiBlbnRyeVJlZixcbiAgICAgICAgcHJvZ3Jlc3M6IHByb2dyZXNzLFxuICAgICAgICBjaWQ6IHZpZXcudGFyZ2V0Q29tcG9uZW50SUQoZmlsZUVsLmZvcm0sIHRhcmdldEN0eClcbiAgICAgIH0sIG9uUmVwbHkpXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hJbnB1dChpbnB1dEVsLCB0YXJnZXRDdHgsIGZvcmNlQ2lkLCBwaHhFdmVudCwgb3B0cywgY2FsbGJhY2spe1xuICAgIGxldCB1cGxvYWRzXG4gICAgbGV0IGNpZCA9IGlzQ2lkKGZvcmNlQ2lkKSA/IGZvcmNlQ2lkIDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eClcbiAgICBsZXQgcmVmR2VuZXJhdG9yID0gKCkgPT4gdGhpcy5wdXRSZWYoW2lucHV0RWwsIGlucHV0RWwuZm9ybV0sIFwiY2hhbmdlXCIsIG9wdHMpXG4gICAgbGV0IGZvcm1EYXRhXG4gICAgaWYoaW5wdXRFbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpKSl7XG4gICAgICBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oaW5wdXRFbC5mb3JtLCB7X3RhcmdldDogb3B0cy5fdGFyZ2V0fSwgW2lucHV0RWwubmFtZV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShpbnB1dEVsLmZvcm0sIHtfdGFyZ2V0OiBvcHRzLl90YXJnZXR9KVxuICAgIH1cbiAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmZpbGVzICYmIGlucHV0RWwuZmlsZXMubGVuZ3RoID4gMCl7XG4gICAgICBMaXZlVXBsb2FkZXIudHJhY2tGaWxlcyhpbnB1dEVsLCBBcnJheS5mcm9tKGlucHV0RWwuZmlsZXMpKVxuICAgIH1cbiAgICB1cGxvYWRzID0gTGl2ZVVwbG9hZGVyLnNlcmlhbGl6ZVVwbG9hZHMoaW5wdXRFbClcbiAgICBsZXQgZXZlbnQgPSB7XG4gICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgIHVwbG9hZHM6IHVwbG9hZHMsXG4gICAgICBjaWQ6IGNpZFxuICAgIH1cbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBcImV2ZW50XCIsIGV2ZW50LCByZXNwID0+IHtcbiAgICAgIERPTS5zaG93RXJyb3IoaW5wdXRFbCwgdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoUEhYX0ZFRURCQUNLX0ZPUikpXG4gICAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWF1dG8tdXBsb2FkXCIpICE9PSBudWxsKXtcbiAgICAgICAgaWYoTGl2ZVVwbG9hZGVyLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXRFbCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgbGV0IFtyZWYsIF9lbHNdID0gcmVmR2VuZXJhdG9yKClcbiAgICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKGlucHV0RWwuZm9ybSwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgKF91cGxvYWRzKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwKVxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQXdhaXRpbmdTdWJtaXQoaW5wdXRFbC5mb3JtKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3ApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyaWdnZXJBd2FpdGluZ1N1Ym1pdChmb3JtRWwpe1xuICAgIGxldCBhd2FpdGluZ1N1Ym1pdCA9IHRoaXMuZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbClcbiAgICBpZihhd2FpdGluZ1N1Ym1pdCl7XG4gICAgICBsZXQgW19lbCwgX3JlZiwgX29wdHMsIGNhbGxiYWNrXSA9IGF3YWl0aW5nU3VibWl0XG4gICAgICB0aGlzLmNhbmNlbFN1Ym1pdChmb3JtRWwpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbCl7XG4gICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pdHMuZmluZCgoW2VsLCBfcmVmLCBfb3B0cywgX2NhbGxiYWNrXSkgPT4gZWwuaXNTYW1lTm9kZShmb3JtRWwpKVxuICB9XG5cbiAgc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLmdldFNjaGVkdWxlZFN1Ym1pdChmb3JtRWwpKXsgcmV0dXJuIHRydWUgfVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMucHVzaChbZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrXSlcbiAgfVxuXG4gIGNhbmNlbFN1Ym1pdChmb3JtRWwpe1xuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSB0aGlzLmZvcm1TdWJtaXRzLmZpbHRlcigoW2VsLCByZWYsIF9jYWxsYmFja10pID0+IHtcbiAgICAgIGlmKGVsLmlzU2FtZU5vZGUoZm9ybUVsKSl7XG4gICAgICAgIHRoaXMudW5kb1JlZnMocmVmKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHB1c2hGb3JtU3VibWl0KGZvcm1FbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgb3B0cywgb25SZXBseSl7XG4gICAgbGV0IGZpbHRlcklnbm9yZWQgPSBlbCA9PiB7XG4gICAgICBsZXQgdXNlcklnbm9yZWQgPSBjbG9zZXN0UGh4QmluZGluZyhlbCwgYCR7dGhpcy5iaW5kaW5nKFBIWF9VUERBVEUpfT1pZ25vcmVgLCBlbC5mb3JtKVxuICAgICAgcmV0dXJuICEodXNlcklnbm9yZWQgfHwgY2xvc2VzdFBoeEJpbmRpbmcoZWwsIFwiZGF0YS1waHgtdXBkYXRlPWlnbm9yZVwiLCBlbC5mb3JtKSlcbiAgICB9XG4gICAgbGV0IGZpbHRlckRpc2FibGVzID0gZWwgPT4ge1xuICAgICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0RJU0FCTEVfV0lUSCkpXG4gICAgfVxuICAgIGxldCBmaWx0ZXJCdXR0b24gPSBlbCA9PiBlbC50YWdOYW1lID09IFwiQlVUVE9OXCJcblxuICAgIGxldCBmaWx0ZXJJbnB1dCA9IGVsID0+IFtcIklOUFVUXCIsIFwiVEVYVEFSRUFcIiwgXCJTRUxFQ1RcIl0uaW5jbHVkZXMoZWwudGFnTmFtZSlcblxuICAgIGxldCByZWZHZW5lcmF0b3IgPSAoKSA9PiB7XG4gICAgICBsZXQgZm9ybUVsZW1lbnRzID0gQXJyYXkuZnJvbShmb3JtRWwuZWxlbWVudHMpXG4gICAgICBsZXQgZGlzYWJsZXMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlckRpc2FibGVzKVxuICAgICAgbGV0IGJ1dHRvbnMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlckJ1dHRvbikuZmlsdGVyKGZpbHRlcklnbm9yZWQpXG4gICAgICBsZXQgaW5wdXRzID0gZm9ybUVsZW1lbnRzLmZpbHRlcihmaWx0ZXJJbnB1dCkuZmlsdGVyKGZpbHRlcklnbm9yZWQpXG5cbiAgICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgYnV0dG9uLmRpc2FibGVkKVxuICAgICAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlXG4gICAgICB9KVxuICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoUEhYX1JFQURPTkxZLCBpbnB1dC5yZWFkT25seSlcbiAgICAgICAgaW5wdXQucmVhZE9ubHkgPSB0cnVlXG4gICAgICAgIGlmKGlucHV0LmZpbGVzKXtcbiAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVELCBpbnB1dC5kaXNhYmxlZClcbiAgICAgICAgICBpbnB1dC5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGZvcm1FbC5zZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9QQUdFX0xPQURJTkcpLCBcIlwiKVxuICAgICAgcmV0dXJuIHRoaXMucHV0UmVmKFtmb3JtRWxdLmNvbmNhdChkaXNhYmxlcykuY29uY2F0KGJ1dHRvbnMpLmNvbmNhdChpbnB1dHMpLCBcInN1Ym1pdFwiLCBvcHRzKVxuICAgIH1cblxuICAgIGxldCBjaWQgPSB0aGlzLnRhcmdldENvbXBvbmVudElEKGZvcm1FbCwgdGFyZ2V0Q3R4KVxuICAgIGlmKExpdmVVcGxvYWRlci5oYXNVcGxvYWRzSW5Qcm9ncmVzcyhmb3JtRWwpKXtcbiAgICAgIGxldCBbcmVmLCBfZWxzXSA9IHJlZkdlbmVyYXRvcigpXG4gICAgICBsZXQgcHVzaCA9ICgpID0+IHRoaXMucHVzaEZvcm1TdWJtaXQoZm9ybUVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBvcHRzLCBvblJlcGx5KVxuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIHB1c2gpXG4gICAgfSBlbHNlIGlmKExpdmVVcGxvYWRlci5pbnB1dHNBd2FpdGluZ1ByZWZsaWdodChmb3JtRWwpLmxlbmd0aCA+IDApe1xuICAgICAgbGV0IFtyZWYsIGVsc10gPSByZWZHZW5lcmF0b3IoKVxuICAgICAgbGV0IHByb3h5UmVmR2VuID0gKCkgPT4gW3JlZiwgZWxzLCBvcHRzXVxuICAgICAgdGhpcy51cGxvYWRGaWxlcyhmb3JtRWwsIHRhcmdldEN0eCwgcmVmLCBjaWQsIChfdXBsb2FkcykgPT4ge1xuICAgICAgICBsZXQgZm9ybURhdGEgPSBzZXJpYWxpemVGb3JtKGZvcm1FbCwge30pXG4gICAgICAgIHRoaXMucHVzaFdpdGhSZXBseShwcm94eVJlZkdlbiwgXCJldmVudFwiLCB7XG4gICAgICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgICAgICBjaWQ6IGNpZFxuICAgICAgICB9LCBvblJlcGx5KVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShmb3JtRWwsIHt9KVxuICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KHJlZkdlbmVyYXRvciwgXCJldmVudFwiLCB7XG4gICAgICAgIHR5cGU6IFwiZm9ybVwiLFxuICAgICAgICBldmVudDogcGh4RXZlbnQsXG4gICAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgICAgY2lkOiBjaWRcbiAgICAgIH0sIG9uUmVwbHkpXG4gICAgfVxuICB9XG5cbiAgdXBsb2FkRmlsZXMoZm9ybUVsLCB0YXJnZXRDdHgsIHJlZiwgY2lkLCBvbkNvbXBsZXRlKXtcbiAgICBsZXQgam9pbkNvdW50QXRVcGxvYWQgPSB0aGlzLmpvaW5Db3VudFxuICAgIGxldCBpbnB1dEVscyA9IExpdmVVcGxvYWRlci5hY3RpdmVGaWxlSW5wdXRzKGZvcm1FbClcbiAgICBsZXQgbnVtRmlsZUlucHV0c0luUHJvZ3Jlc3MgPSBpbnB1dEVscy5sZW5ndGhcblxuICAgIC8vIGdldCBlYWNoIGZpbGUgaW5wdXRcbiAgICBpbnB1dEVscy5mb3JFYWNoKGlucHV0RWwgPT4ge1xuICAgICAgbGV0IHVwbG9hZGVyID0gbmV3IExpdmVVcGxvYWRlcihpbnB1dEVsLCB0aGlzLCAoKSA9PiB7XG4gICAgICAgIG51bUZpbGVJbnB1dHNJblByb2dyZXNzLS1cbiAgICAgICAgaWYobnVtRmlsZUlucHV0c0luUHJvZ3Jlc3MgPT09IDApeyBvbkNvbXBsZXRlKCkgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMudXBsb2FkZXJzW2lucHV0RWxdID0gdXBsb2FkZXJcbiAgICAgIGxldCBlbnRyaWVzID0gdXBsb2FkZXIuZW50cmllcygpLm1hcChlbnRyeSA9PiBlbnRyeS50b1ByZWZsaWdodFBheWxvYWQoKSlcblxuICAgICAgbGV0IHBheWxvYWQgPSB7XG4gICAgICAgIHJlZjogaW5wdXRFbC5nZXRBdHRyaWJ1dGUoUEhYX1VQTE9BRF9SRUYpLFxuICAgICAgICBlbnRyaWVzOiBlbnRyaWVzLFxuICAgICAgICBjaWQ6IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoaW5wdXRFbC5mb3JtLCB0YXJnZXRDdHgpXG4gICAgICB9XG5cbiAgICAgIHRoaXMubG9nKFwidXBsb2FkXCIsICgpID0+IFtcInNlbmRpbmcgcHJlZmxpZ2h0IHJlcXVlc3RcIiwgcGF5bG9hZF0pXG5cbiAgICAgIHRoaXMucHVzaFdpdGhSZXBseShudWxsLCBcImFsbG93X3VwbG9hZFwiLCBwYXlsb2FkLCByZXNwID0+IHtcbiAgICAgICAgdGhpcy5sb2coXCJ1cGxvYWRcIiwgKCkgPT4gW1wiZ290IHByZWZsaWdodCByZXNwb25zZVwiLCByZXNwXSlcbiAgICAgICAgaWYocmVzcC5lcnJvcil7XG4gICAgICAgICAgdGhpcy51bmRvUmVmcyhyZWYpXG4gICAgICAgICAgbGV0IFtlbnRyeV9yZWYsIHJlYXNvbl0gPSByZXNwLmVycm9yXG4gICAgICAgICAgdGhpcy5sb2coXCJ1cGxvYWRcIiwgKCkgPT4gW2BlcnJvciBmb3IgZW50cnkgJHtlbnRyeV9yZWZ9YCwgcmVhc29uXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZXQgb25FcnJvciA9IChjYWxsYmFjaykgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGFubmVsLm9uRXJyb3IoKCkgPT4ge1xuICAgICAgICAgICAgICBpZih0aGlzLmpvaW5Db3VudCA9PT0gam9pbkNvdW50QXRVcGxvYWQpeyBjYWxsYmFjaygpIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIHVwbG9hZGVyLmluaXRBZGFwdGVyVXBsb2FkKHJlc3AsIG9uRXJyb3IsIHRoaXMubGl2ZVNvY2tldClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgZGlzcGF0Y2hVcGxvYWRzKG5hbWUsIGZpbGVzT3JCbG9icyl7XG4gICAgbGV0IGlucHV0cyA9IERPTS5maW5kVXBsb2FkSW5wdXRzKHRoaXMuZWwpLmZpbHRlcihlbCA9PiBlbC5uYW1lID09PSBuYW1lKVxuICAgIGlmKGlucHV0cy5sZW5ndGggPT09IDApeyBsb2dFcnJvcihgbm8gbGl2ZSBmaWxlIGlucHV0cyBmb3VuZCBtYXRjaGluZyB0aGUgbmFtZSBcIiR7bmFtZX1cImApIH1cbiAgICBlbHNlIGlmKGlucHV0cy5sZW5ndGggPiAxKXsgbG9nRXJyb3IoYGR1cGxpY2F0ZSBsaXZlIGZpbGUgaW5wdXRzIGZvdW5kIG1hdGNoaW5nIHRoZSBuYW1lIFwiJHtuYW1lfVwiYCkgfVxuICAgIGVsc2UgeyBET00uZGlzcGF0Y2hFdmVudChpbnB1dHNbMF0sIFBIWF9UUkFDS19VUExPQURTLCB7ZGV0YWlsOiB7ZmlsZXM6IGZpbGVzT3JCbG9ic319KSB9XG4gIH1cblxuICBwdXNoRm9ybVJlY292ZXJ5KGZvcm0sIG5ld0NpZCwgY2FsbGJhY2spe1xuICAgIHRoaXMubGl2ZVNvY2tldC53aXRoaW5Pd25lcnMoZm9ybSwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgbGV0IGlucHV0ID0gZm9ybS5lbGVtZW50c1swXVxuICAgICAgbGV0IHBoeEV2ZW50ID0gZm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9BVVRPX1JFQ09WRVIpKSB8fCBmb3JtLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIikpXG5cbiAgICAgIEpTLmV4ZWMoXCJjaGFuZ2VcIiwgcGh4RXZlbnQsIHZpZXcsIGlucHV0LCBbXCJwdXNoXCIsIHtfdGFyZ2V0OiBpbnB1dC5uYW1lLCBuZXdDaWQ6IG5ld0NpZCwgY2FsbGJhY2s6IGNhbGxiYWNrfV0pXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hMaW5rUGF0Y2goaHJlZiwgdGFyZ2V0RWwsIGNhbGxiYWNrKXtcbiAgICBsZXQgbGlua1JlZiA9IHRoaXMubGl2ZVNvY2tldC5zZXRQZW5kaW5nTGluayhocmVmKVxuICAgIGxldCByZWZHZW4gPSB0YXJnZXRFbCA/ICgpID0+IHRoaXMucHV0UmVmKFt0YXJnZXRFbF0sIFwiY2xpY2tcIikgOiBudWxsXG4gICAgbGV0IGZhbGxiYWNrID0gKCkgPT4gdGhpcy5saXZlU29ja2V0LnJlZGlyZWN0KHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuXG4gICAgbGV0IHB1c2ggPSB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuLCBcImxpdmVfcGF0Y2hcIiwge3VybDogaHJlZn0sIHJlc3AgPT4ge1xuICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBpZihyZXNwLmxpbmtfcmVkaXJlY3Qpe1xuICAgICAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXBsYWNlTWFpbihocmVmLCBudWxsLCBjYWxsYmFjaywgbGlua1JlZilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZih0aGlzLmxpdmVTb2NrZXQuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpe1xuICAgICAgICAgICAgdGhpcy5ocmVmID0gaHJlZlxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmFwcGx5UGVuZGluZ1VwZGF0ZXMoKVxuICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGxpbmtSZWYpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGlmKHB1c2gpe1xuICAgICAgcHVzaC5yZWNlaXZlKFwidGltZW91dFwiLCBmYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgZmFsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIGZvcm1zRm9yUmVjb3ZlcnkoaHRtbCl7XG4gICAgaWYodGhpcy5qb2luQ291bnQgPT09IDApeyByZXR1cm4gW10gfVxuXG4gICAgbGV0IHBoeENoYW5nZSA9IHRoaXMuYmluZGluZyhcImNoYW5nZVwiKVxuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcblxuICAgIHJldHVybiAoXG4gICAgICBET00uYWxsKHRoaXMuZWwsIGBmb3JtWyR7cGh4Q2hhbmdlfV1gKVxuICAgICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5pZCAmJiB0aGlzLm93bnNFbGVtZW50KGZvcm0pKVxuICAgICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5lbGVtZW50cy5sZW5ndGggPiAwKVxuICAgICAgICAuZmlsdGVyKGZvcm0gPT4gZm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9BVVRPX1JFQ09WRVIpKSAhPT0gXCJpZ25vcmVcIilcbiAgICAgICAgLm1hcChmb3JtID0+IHtcbiAgICAgICAgICBsZXQgbmV3Rm9ybSA9IHRlbXBsYXRlLmNvbnRlbnQucXVlcnlTZWxlY3RvcihgZm9ybVtpZD1cIiR7Zm9ybS5pZH1cIl1bJHtwaHhDaGFuZ2V9PVwiJHtmb3JtLmdldEF0dHJpYnV0ZShwaHhDaGFuZ2UpfVwiXWApXG4gICAgICAgICAgaWYobmV3Rm9ybSl7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm0sIG5ld0Zvcm0sIHRoaXMudGFyZ2V0Q29tcG9uZW50SUQobmV3Rm9ybSldXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybSwgbnVsbCwgbnVsbF1cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5maWx0ZXIoKFtmb3JtLCBuZXdGb3JtLCBuZXdDaWRdKSA9PiBuZXdGb3JtKVxuICAgIClcbiAgfVxuXG4gIG1heWJlUHVzaENvbXBvbmVudHNEZXN0cm95ZWQoZGVzdHJveWVkQ0lEcyl7XG4gICAgbGV0IHdpbGxEZXN0cm95Q0lEcyA9IGRlc3Ryb3llZENJRHMuZmlsdGVyKGNpZCA9PiB7XG4gICAgICByZXR1cm4gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmVsLCBjaWQpLmxlbmd0aCA9PT0gMFxuICAgIH0pXG4gICAgaWYod2lsbERlc3Ryb3lDSURzLmxlbmd0aCA+IDApe1xuICAgICAgdGhpcy5wcnVuaW5nQ0lEcy5wdXNoKC4uLndpbGxEZXN0cm95Q0lEcylcblxuICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KG51bGwsIFwiY2lkc193aWxsX2Rlc3Ryb3lcIiwge2NpZHM6IHdpbGxEZXN0cm95Q0lEc30sICgpID0+IHtcbiAgICAgICAgLy8gVGhlIGNpZHMgYXJlIGVpdGhlciBiYWNrIG9uIHRoZSBwYWdlIG9yIHRoZXkgd2lsbCBiZSBmdWxseSByZW1vdmVkLFxuICAgICAgICAvLyBzbyB3ZSBjYW4gcmVtb3ZlIHRoZW0gZnJvbSB0aGUgcHJ1bmluZ0NJRHMuXG4gICAgICAgIHRoaXMucHJ1bmluZ0NJRHMgPSB0aGlzLnBydW5pbmdDSURzLmZpbHRlcihjaWQgPT4gd2lsbERlc3Ryb3lDSURzLmluZGV4T2YoY2lkKSAhPT0gLTEpXG5cbiAgICAgICAgLy8gU2VlIGlmIGFueSBvZiB0aGUgY2lkcyB3ZSB3YW50ZWQgdG8gZGVzdHJveSB3ZXJlIGFkZGVkIGJhY2ssXG4gICAgICAgIC8vIGlmIHRoZXkgd2VyZSBhZGRlZCBiYWNrLCB3ZSBkb24ndCBhY3R1YWxseSBkZXN0cm95IHRoZW0uXG4gICAgICAgIGxldCBjb21wbGV0ZWx5RGVzdHJveUNJRHMgPSB3aWxsRGVzdHJveUNJRHMuZmlsdGVyKGNpZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodGhpcy5lbCwgY2lkKS5sZW5ndGggPT09IDBcbiAgICAgICAgfSlcblxuICAgICAgICBpZihjb21wbGV0ZWx5RGVzdHJveUNJRHMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KG51bGwsIFwiY2lkc19kZXN0cm95ZWRcIiwge2NpZHM6IGNvbXBsZXRlbHlEZXN0cm95Q0lEc30sIChyZXNwKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkLnBydW5lQ0lEcyhyZXNwLmNpZHMpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBvd25zRWxlbWVudChlbCl7XG4gICAgcmV0dXJuIGVsLmdldEF0dHJpYnV0ZShQSFhfUEFSRU5UX0lEKSA9PT0gdGhpcy5pZCB8fFxuICAgICAgbWF5YmUoZWwuY2xvc2VzdChQSFhfVklFV19TRUxFQ1RPUiksIG5vZGUgPT4gbm9kZS5pZCkgPT09IHRoaXMuaWRcbiAgfVxuXG4gIHN1Ym1pdEZvcm0oZm9ybSwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgb3B0cyA9IHt9KXtcbiAgICBET00ucHV0UHJpdmF0ZShmb3JtLCBQSFhfSEFTX1NVQk1JVFRFRCwgdHJ1ZSlcbiAgICBsZXQgcGh4RmVlZGJhY2sgPSB0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhQSFhfRkVFREJBQ0tfRk9SKVxuICAgIGxldCBpbnB1dHMgPSBBcnJheS5mcm9tKGZvcm0uZWxlbWVudHMpXG4gICAgdGhpcy5saXZlU29ja2V0LmJsdXJBY3RpdmVFbGVtZW50KHRoaXMpXG4gICAgdGhpcy5wdXNoRm9ybVN1Ym1pdChmb3JtLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBvcHRzLCAoKSA9PiB7XG4gICAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBET00uc2hvd0Vycm9yKGlucHV0LCBwaHhGZWVkYmFjaykpXG4gICAgICB0aGlzLmxpdmVTb2NrZXQucmVzdG9yZVByZXZpb3VzbHlBY3RpdmVGb2N1cygpXG4gICAgfSlcbiAgfVxuXG4gIGJpbmRpbmcoa2luZCl7IHJldHVybiB0aGlzLmxpdmVTb2NrZXQuYmluZGluZyhraW5kKSB9XG59XG4iLCAiLyoqIEluaXRpYWxpemVzIHRoZSBMaXZlU29ja2V0XG4gKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBlbmRQb2ludCAtIFRoZSBzdHJpbmcgV2ViU29ja2V0IGVuZHBvaW50LCBpZSwgYFwid3NzOi8vZXhhbXBsZS5jb20vbGl2ZVwiYCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXCIvbGl2ZVwiYCAoaW5oZXJpdGVkIGhvc3QgJiBwcm90b2NvbClcbiAqIEBwYXJhbSB7UGhvZW5peC5Tb2NrZXR9IHNvY2tldCAtIHRoZSByZXF1aXJlZCBQaG9lbml4IFNvY2tldCBjbGFzcyBpbXBvcnRlZCBmcm9tIFwicGhvZW5peFwiLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgaW1wb3J0IHtTb2NrZXR9IGZyb20gXCJwaG9lbml4XCJcbiAqICAgICBpbXBvcnQge0xpdmVTb2NrZXR9IGZyb20gXCJwaG9lbml4X2xpdmVfdmlld1wiXG4gKiAgICAgbGV0IGxpdmVTb2NrZXQgPSBuZXcgTGl2ZVNvY2tldChcIi9saXZlXCIsIFNvY2tldCwgey4uLn0pXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24uIE91dHNpZGUgb2Yga2V5cyBsaXN0ZWQgYmVsb3csIGFsbFxuICogY29uZmlndXJhdGlvbiBpcyBwYXNzZWQgZGlyZWN0bHkgdG8gdGhlIFBob2VuaXggU29ja2V0IGNvbnN0cnVjdG9yLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmRlZmF1bHRzXSAtIFRoZSBvcHRpb25hbCBkZWZhdWx0cyB0byB1c2UgZm9yIHZhcmlvdXMgYmluZGluZ3MsXG4gKiBzdWNoIGFzIGBwaHgtZGVib3VuY2VgLiBTdXBwb3J0cyB0aGUgZm9sbG93aW5nIGtleXM6XG4gKlxuICogICAtIGRlYm91bmNlIC0gdGhlIG1pbGxpc2Vjb25kIHBoeC1kZWJvdW5jZSB0aW1lLiBEZWZhdWx0cyAzMDBcbiAqICAgLSB0aHJvdHRsZSAtIHRoZSBtaWxsaXNlY29uZCBwaHgtdGhyb3R0bGUgdGltZS4gRGVmYXVsdHMgMzAwXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMucGFyYW1zXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiBmb3IgcGFzc2luZyBjb25uZWN0IHBhcmFtcy5cbiAqIFRoZSBmdW5jdGlvbiByZWNlaXZlcyB0aGUgZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggYSBnaXZlbiBMaXZlVmlldy4gRm9yIGV4YW1wbGU6XG4gKlxuICogICAgIChlbCkgPT4ge3ZpZXc6IGVsLmdldEF0dHJpYnV0ZShcImRhdGEtbXktdmlldy1uYW1lXCIsIHRva2VuOiB3aW5kb3cubXlUb2tlbn1cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuYmluZGluZ1ByZWZpeF0gLSBUaGUgb3B0aW9uYWwgcHJlZml4IHRvIHVzZSBmb3IgYWxsIHBoeCBET00gYW5ub3RhdGlvbnMuXG4gKiBEZWZhdWx0cyB0byBcInBoeC1cIi5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5ob29rc10gLSBUaGUgb3B0aW9uYWwgb2JqZWN0IGZvciByZWZlcmVuY2luZyBMaXZlVmlldyBob29rIGNhbGxiYWNrcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy51cGxvYWRlcnNdIC0gVGhlIG9wdGlvbmFsIG9iamVjdCBmb3IgcmVmZXJlbmNpbmcgTGl2ZVZpZXcgdXBsb2FkZXIgY2FsbGJhY2tzLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5sb2FkZXJUaW1lb3V0XSAtIFRoZSBvcHRpb25hbCBkZWxheSBpbiBtaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgYXBwbHlcbiAqIGxvYWRpbmcgc3RhdGVzLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5tYXhSZWxvYWRzXSAtIFRoZSBtYXhpbXVtIHJlbG9hZHMgYmVmb3JlIGVudGVyaW5nIGZhaWxzYWZlIG1vZGUuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLnJlbG9hZEppdHRlck1pbl0gLSBUaGUgbWluaW11bSB0aW1lIGJldHdlZW4gbm9ybWFsIHJlbG9hZCBhdHRlbXB0cy5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMucmVsb2FkSml0dGVyTWF4XSAtIFRoZSBtYXhpbXVtIHRpbWUgYmV0d2VlbiBub3JtYWwgcmVsb2FkIGF0dGVtcHRzLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5mYWlsc2FmZUppdHRlcl0gLSBUaGUgdGltZSBiZXR3ZWVuIHJlbG9hZCBhdHRlbXB0cyBpbiBmYWlsc2FmZSBtb2RlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMudmlld0xvZ2dlcl0gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gdG8gbG9nIGRlYnVnIGluZm9ybWF0aW9uLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgKHZpZXcsIGtpbmQsIG1zZywgb2JqKSA9PiBjb25zb2xlLmxvZyhgJHt2aWV3LmlkfSAke2tpbmR9OiAke21zZ30gLSBgLCBvYmopXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLm1ldGFkYXRhXSAtIFRoZSBvcHRpb25hbCBvYmplY3QgbWFwcGluZyBldmVudCBuYW1lcyB0byBmdW5jdGlvbnMgZm9yXG4gKiBwb3B1bGF0aW5nIGV2ZW50IG1ldGFkYXRhLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgICAgbWV0YWRhdGE6IHtcbiAqICAgICAgIGNsaWNrOiAoZSwgZWwpID0+IHtcbiAqICAgICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAgICBjdHJsS2V5OiBlLmN0cmxLZXksXG4gKiAgICAgICAgICAgbWV0YUtleTogZS5tZXRhS2V5LFxuICogICAgICAgICAgIGRldGFpbDogZS5kZXRhaWwgfHwgMSxcbiAqICAgICAgICAgfVxuICogICAgICAgfSxcbiAqICAgICAgIGtleWRvd246IChlLCBlbCkgPT4ge1xuICogICAgICAgICByZXR1cm4ge1xuICogICAgICAgICAgIGtleTogZS5rZXksXG4gKiAgICAgICAgICAgY3RybEtleTogZS5jdHJsS2V5LFxuICogICAgICAgICAgIG1ldGFLZXk6IGUubWV0YUtleSxcbiAqICAgICAgICAgICBzaGlmdEtleTogZS5zaGlmdEtleVxuICogICAgICAgICB9XG4gKiAgICAgICB9XG4gKiAgICAgfVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLnNlc3Npb25TdG9yYWdlXSAtIEFuIG9wdGlvbmFsIFN0b3JhZ2UgY29tcGF0aWJsZSBvYmplY3RcbiAqIFVzZWZ1bCB3aGVuIExpdmVWaWV3IHdvbid0IGhhdmUgYWNjZXNzIHRvIGBzZXNzaW9uU3RvcmFnZWAuICBGb3IgZXhhbXBsZSwgVGhpcyBjb3VsZFxuICogaGFwcGVuIGlmIGEgc2l0ZSBsb2FkcyBhIGNyb3NzLWRvbWFpbiBMaXZlVmlldyBpbiBhbiBpZnJhbWUuICBFeGFtcGxlIHVzYWdlOlxuICpcbiAqICAgICBjbGFzcyBJbk1lbW9yeVN0b3JhZ2Uge1xuICogICAgICAgY29uc3RydWN0b3IoKSB7IHRoaXMuc3RvcmFnZSA9IHt9IH1cbiAqICAgICAgIGdldEl0ZW0oa2V5TmFtZSkgeyByZXR1cm4gdGhpcy5zdG9yYWdlW2tleU5hbWVdIH1cbiAqICAgICAgIHJlbW92ZUl0ZW0oa2V5TmFtZSkgeyBkZWxldGUgdGhpcy5zdG9yYWdlW2tleU5hbWVdIH1cbiAqICAgICAgIHNldEl0ZW0oa2V5TmFtZSwga2V5VmFsdWUpIHsgdGhpcy5zdG9yYWdlW2tleU5hbWVdID0ga2V5VmFsdWUgfVxuICogICAgIH1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMubG9jYWxTdG9yYWdlXSAtIEFuIG9wdGlvbmFsIFN0b3JhZ2UgY29tcGF0aWJsZSBvYmplY3RcbiAqIFVzZWZ1bCBmb3Igd2hlbiBMaXZlVmlldyB3b24ndCBoYXZlIGFjY2VzcyB0byBgbG9jYWxTdG9yYWdlYC5cbiAqIFNlZSBgb3B0cy5zZXNzaW9uU3RvcmFnZWAgZm9yIGV4YW1wbGVzLlxuKi9cblxuaW1wb3J0IHtcbiAgQklORElOR19QUkVGSVgsXG4gIENPTlNFQ1VUSVZFX1JFTE9BRFMsXG4gIERFRkFVTFRTLFxuICBGQUlMU0FGRV9KSVRURVIsXG4gIExPQURFUl9USU1FT1VULFxuICBNQVhfUkVMT0FEUyxcbiAgUEhYX0RFQk9VTkNFLFxuICBQSFhfRFJPUF9UQVJHRVQsXG4gIFBIWF9IQVNfRk9DVVNFRCxcbiAgUEhYX0tFWSxcbiAgUEhYX0xJTktfU1RBVEUsXG4gIFBIWF9MSVZFX0xJTkssXG4gIFBIWF9MVl9ERUJVRyxcbiAgUEhYX0xWX0xBVEVOQ1lfU0lNLFxuICBQSFhfTFZfUFJPRklMRSxcbiAgUEhYX01BSU4sXG4gIFBIWF9QQVJFTlRfSUQsXG4gIFBIWF9WSUVXX1NFTEVDVE9SLFxuICBQSFhfUk9PVF9JRCxcbiAgUEhYX1RIUk9UVExFLFxuICBQSFhfVFJBQ0tfVVBMT0FEUyxcbiAgUEhYX1NFU1NJT04sXG4gIFJFTE9BRF9KSVRURVJfTUlOLFxuICBSRUxPQURfSklUVEVSX01BWCxcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvbmUsXG4gIGNsb3Nlc3RQaHhCaW5kaW5nLFxuICBjbG9zdXJlLFxuICBkZWJ1ZyxcbiAgaXNPYmplY3QsXG4gIG1heWJlXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEJyb3dzZXIgZnJvbSBcIi4vYnJvd3NlclwiXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgSG9va3MgZnJvbSBcIi4vaG9va3NcIlxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcbmltcG9ydCBWaWV3IGZyb20gXCIuL3ZpZXdcIlxuaW1wb3J0IEpTIGZyb20gXCIuL2pzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGl2ZVNvY2tldCB7XG4gIGNvbnN0cnVjdG9yKHVybCwgcGh4U29ja2V0LCBvcHRzID0ge30pe1xuICAgIHRoaXMudW5sb2FkZWQgPSBmYWxzZVxuICAgIGlmKCFwaHhTb2NrZXQgfHwgcGh4U29ja2V0LmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiT2JqZWN0XCIpe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgIGEgcGhvZW5peCBTb2NrZXQgbXVzdCBiZSBwcm92aWRlZCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHRvIHRoZSBMaXZlU29ja2V0IGNvbnN0cnVjdG9yLiBGb3IgZXhhbXBsZTpcblxuICAgICAgICAgIGltcG9ydCB7U29ja2V0fSBmcm9tIFwicGhvZW5peFwiXG4gICAgICAgICAgaW1wb3J0IHtMaXZlU29ja2V0fSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxuICAgICAgICAgIGxldCBsaXZlU29ja2V0ID0gbmV3IExpdmVTb2NrZXQoXCIvbGl2ZVwiLCBTb2NrZXQsIHsuLi59KVxuICAgICAgYClcbiAgICB9XG4gICAgdGhpcy5zb2NrZXQgPSBuZXcgcGh4U29ja2V0KHVybCwgb3B0cylcbiAgICB0aGlzLmJpbmRpbmdQcmVmaXggPSBvcHRzLmJpbmRpbmdQcmVmaXggfHwgQklORElOR19QUkVGSVhcbiAgICB0aGlzLm9wdHMgPSBvcHRzXG4gICAgdGhpcy5wYXJhbXMgPSBjbG9zdXJlKG9wdHMucGFyYW1zIHx8IHt9KVxuICAgIHRoaXMudmlld0xvZ2dlciA9IG9wdHMudmlld0xvZ2dlclxuICAgIHRoaXMubWV0YWRhdGFDYWxsYmFja3MgPSBvcHRzLm1ldGFkYXRhIHx8IHt9XG4gICAgdGhpcy5kZWZhdWx0cyA9IE9iamVjdC5hc3NpZ24oY2xvbmUoREVGQVVMVFMpLCBvcHRzLmRlZmF1bHRzIHx8IHt9KVxuICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGxcbiAgICB0aGlzLnByZXZBY3RpdmUgPSBudWxsXG4gICAgdGhpcy5zaWxlbmNlZCA9IGZhbHNlXG4gICAgdGhpcy5tYWluID0gbnVsbFxuICAgIHRoaXMub3V0Z29pbmdNYWluRWwgPSBudWxsXG4gICAgdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCA9IG51bGxcbiAgICB0aGlzLmxpbmtSZWYgPSAxXG4gICAgdGhpcy5yb290cyA9IHt9XG4gICAgdGhpcy5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICB0aGlzLnBlbmRpbmdMaW5rID0gbnVsbFxuICAgIHRoaXMuY3VycmVudExvY2F0aW9uID0gY2xvbmUod2luZG93LmxvY2F0aW9uKVxuICAgIHRoaXMuaG9va3MgPSBvcHRzLmhvb2tzIHx8IHt9XG4gICAgdGhpcy51cGxvYWRlcnMgPSBvcHRzLnVwbG9hZGVycyB8fCB7fVxuICAgIHRoaXMubG9hZGVyVGltZW91dCA9IG9wdHMubG9hZGVyVGltZW91dCB8fCBMT0FERVJfVElNRU9VVFxuICAgIHRoaXMubWF4UmVsb2FkcyA9IG9wdHMubWF4UmVsb2FkcyB8fCBNQVhfUkVMT0FEU1xuICAgIHRoaXMucmVsb2FkSml0dGVyTWluID0gb3B0cy5yZWxvYWRKaXR0ZXJNaW4gfHwgUkVMT0FEX0pJVFRFUl9NSU5cbiAgICB0aGlzLnJlbG9hZEppdHRlck1heCA9IG9wdHMucmVsb2FkSml0dGVyTWF4IHx8IFJFTE9BRF9KSVRURVJfTUFYXG4gICAgdGhpcy5mYWlsc2FmZUppdHRlciA9IG9wdHMuZmFpbHNhZmVKaXR0ZXIgfHwgRkFJTFNBRkVfSklUVEVSXG4gICAgdGhpcy5sb2NhbFN0b3JhZ2UgPSBvcHRzLmxvY2FsU3RvcmFnZSB8fCB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgdGhpcy5zZXNzaW9uU3RvcmFnZSA9IG9wdHMuc2Vzc2lvblN0b3JhZ2UgfHwgd2luZG93LnNlc3Npb25TdG9yYWdlXG4gICAgdGhpcy5ib3VuZFRvcExldmVsRXZlbnRzID0gZmFsc2VcbiAgICB0aGlzLmRvbUNhbGxiYWNrcyA9IE9iamVjdC5hc3NpZ24oe29uTm9kZUFkZGVkOiBjbG9zdXJlKCksIG9uQmVmb3JlRWxVcGRhdGVkOiBjbG9zdXJlKCl9LCBvcHRzLmRvbSB8fCB7fSlcbiAgICB0aGlzLnRyYW5zaXRpb25zID0gbmV3IFRyYW5zaXRpb25TZXQoKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGFnZWhpZGVcIiwgX2UgPT4ge1xuICAgICAgdGhpcy51bmxvYWRlZCA9IHRydWVcbiAgICB9KVxuICAgIHRoaXMuc29ja2V0Lm9uT3BlbigoKSA9PiB7XG4gICAgICBpZih0aGlzLmlzVW5sb2FkZWQoKSl7XG4gICAgICAgIC8vIHJlbG9hZCBwYWdlIGlmIGJlaW5nIHJlc3RvcmVkIGZyb20gYmFjay9mb3J3YXJkIGNhY2hlIGFuZCBicm93c2VyIGRvZXMgbm90IGVtaXQgXCJwYWdlc2hvd1wiXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvLyBwdWJsaWNcblxuICBpc1Byb2ZpbGVFbmFibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX1BST0ZJTEUpID09PSBcInRydWVcIiB9XG5cbiAgaXNEZWJ1Z0VuYWJsZWQoKXsgcmV0dXJuIHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfREVCVUcpID09PSBcInRydWVcIiB9XG5cbiAgaXNEZWJ1Z0Rpc2FibGVkKCl7IHJldHVybiB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX0RFQlVHKSA9PT0gXCJmYWxzZVwiIH1cblxuICBlbmFibGVEZWJ1ZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX0RFQlVHLCBcInRydWVcIikgfVxuXG4gIGVuYWJsZVByb2ZpbGluZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX1BST0ZJTEUsIFwidHJ1ZVwiKSB9XG5cbiAgZGlzYWJsZURlYnVnKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfREVCVUcsIFwiZmFsc2VcIikgfVxuXG4gIGRpc2FibGVQcm9maWxpbmcoKXsgdGhpcy5zZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFBIWF9MVl9QUk9GSUxFKSB9XG5cbiAgZW5hYmxlTGF0ZW5jeVNpbSh1cHBlckJvdW5kTXMpe1xuICAgIHRoaXMuZW5hYmxlRGVidWcoKVxuICAgIGNvbnNvbGUubG9nKFwibGF0ZW5jeSBzaW11bGF0b3IgZW5hYmxlZCBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoaXMgYnJvd3NlciBzZXNzaW9uLiBDYWxsIGRpc2FibGVMYXRlbmN5U2ltKCkgdG8gZGlzYWJsZVwiKVxuICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0sIHVwcGVyQm91bmRNcylcbiAgfVxuXG4gIGRpc2FibGVMYXRlbmN5U2ltKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShQSFhfTFZfTEFURU5DWV9TSU0pIH1cblxuICBnZXRMYXRlbmN5U2ltKCl7XG4gICAgbGV0IHN0ciA9IHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfTEFURU5DWV9TSU0pXG4gICAgcmV0dXJuIHN0ciA/IHBhcnNlSW50KHN0cikgOiBudWxsXG4gIH1cblxuICBnZXRTb2NrZXQoKXsgcmV0dXJuIHRoaXMuc29ja2V0IH1cblxuICBjb25uZWN0KCl7XG4gICAgLy8gZW5hYmxlIGRlYnVnIGJ5IGRlZmF1bHQgaWYgb24gbG9jYWxob3N0IGFuZCBub3QgZXhwbGljaXRseSBkaXNhYmxlZFxuICAgIGlmKHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gXCJsb2NhbGhvc3RcIiAmJiAhdGhpcy5pc0RlYnVnRGlzYWJsZWQoKSl7IHRoaXMuZW5hYmxlRGVidWcoKSB9XG4gICAgbGV0IGRvQ29ubmVjdCA9ICgpID0+IHtcbiAgICAgIGlmKHRoaXMuam9pblJvb3RWaWV3cygpKXtcbiAgICAgICAgdGhpcy5iaW5kVG9wTGV2ZWxFdmVudHMoKVxuICAgICAgICB0aGlzLnNvY2tldC5jb25uZWN0KClcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoW1wiY29tcGxldGVcIiwgXCJsb2FkZWRcIiwgXCJpbnRlcmFjdGl2ZVwiXS5pbmRleE9mKGRvY3VtZW50LnJlYWR5U3RhdGUpID49IDApe1xuICAgICAgZG9Db25uZWN0KClcbiAgICB9IGVsc2Uge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4gZG9Db25uZWN0KCkpXG4gICAgfVxuICB9XG5cbiAgZGlzY29ubmVjdChjYWxsYmFjayl7IHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QoY2FsbGJhY2spIH1cblxuICBleGVjSlMoZWwsIGVuY29kZWRKUywgZXZlbnRUeXBlID0gbnVsbCl7XG4gICAgdGhpcy5vd25lcihlbCwgdmlldyA9PiBKUy5leGVjKGV2ZW50VHlwZSwgZW5jb2RlZEpTLCB2aWV3LCBlbCkpXG4gIH1cblxuICAvLyBwcml2YXRlXG5cbiAgdHJpZ2dlckRPTShraW5kLCBhcmdzKXsgdGhpcy5kb21DYWxsYmFja3Nba2luZF0oLi4uYXJncykgfVxuXG4gIHRpbWUobmFtZSwgZnVuYyl7XG4gICAgaWYoIXRoaXMuaXNQcm9maWxlRW5hYmxlZCgpIHx8ICFjb25zb2xlLnRpbWUpeyByZXR1cm4gZnVuYygpIH1cbiAgICBjb25zb2xlLnRpbWUobmFtZSlcbiAgICBsZXQgcmVzdWx0ID0gZnVuYygpXG4gICAgY29uc29sZS50aW1lRW5kKG5hbWUpXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgbG9nKHZpZXcsIGtpbmQsIG1zZ0NhbGxiYWNrKXtcbiAgICBpZih0aGlzLnZpZXdMb2dnZXIpe1xuICAgICAgbGV0IFttc2csIG9ial0gPSBtc2dDYWxsYmFjaygpXG4gICAgICB0aGlzLnZpZXdMb2dnZXIodmlldywga2luZCwgbXNnLCBvYmopXG4gICAgfSBlbHNlIGlmKHRoaXMuaXNEZWJ1Z0VuYWJsZWQoKSl7XG4gICAgICBsZXQgW21zZywgb2JqXSA9IG1zZ0NhbGxiYWNrKClcbiAgICAgIGRlYnVnKHZpZXcsIGtpbmQsIG1zZywgb2JqKVxuICAgIH1cbiAgfVxuXG4gIHJlcXVlc3RET01VcGRhdGUoY2FsbGJhY2spe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuYWZ0ZXIoY2FsbGJhY2spXG4gIH1cblxuICB0cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSA9IGZ1bmN0aW9uKCl7fSl7XG4gICAgdGhpcy50cmFuc2l0aW9ucy5hZGRUcmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSlcbiAgfVxuXG4gIG9uQ2hhbm5lbChjaGFubmVsLCBldmVudCwgY2Ipe1xuICAgIGNoYW5uZWwub24oZXZlbnQsIGRhdGEgPT4ge1xuICAgICAgbGV0IGxhdGVuY3kgPSB0aGlzLmdldExhdGVuY3lTaW0oKVxuICAgICAgaWYoIWxhdGVuY3kpe1xuICAgICAgICBjYihkYXRhKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coYHNpbXVsYXRpbmcgJHtsYXRlbmN5fW1zIG9mIGxhdGVuY3kgZnJvbSBzZXJ2ZXIgdG8gY2xpZW50YClcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjYihkYXRhKSwgbGF0ZW5jeSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgd3JhcFB1c2godmlldywgb3B0cywgcHVzaCl7XG4gICAgbGV0IGxhdGVuY3kgPSB0aGlzLmdldExhdGVuY3lTaW0oKVxuICAgIGxldCBvbGRKb2luQ291bnQgPSB2aWV3LmpvaW5Db3VudFxuICAgIGlmKCFsYXRlbmN5KXtcbiAgICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSAmJiBvcHRzLnRpbWVvdXQpe1xuICAgICAgICByZXR1cm4gcHVzaCgpLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgICAgICBpZih2aWV3LmpvaW5Db3VudCA9PT0gb2xkSm9pbkNvdW50ICYmICF2aWV3LmlzRGVzdHJveWVkKCkpe1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRXaXRoSml0dGVyKHZpZXcsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sb2codmlldywgXCJ0aW1lb3V0XCIsICgpID0+IFtcInJlY2VpdmVkIHRpbWVvdXQgd2hpbGUgY29tbXVuaWNhdGluZyB3aXRoIHNlcnZlci4gRmFsbGluZyBiYWNrIHRvIGhhcmQgcmVmcmVzaCBmb3IgcmVjb3ZlcnlcIl0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwdXNoKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhgc2ltdWxhdGluZyAke2xhdGVuY3l9bXMgb2YgbGF0ZW5jeSBmcm9tIGNsaWVudCB0byBzZXJ2ZXJgKVxuICAgIGxldCBmYWtlUHVzaCA9IHtcbiAgICAgIHJlY2VpdmVzOiBbXSxcbiAgICAgIHJlY2VpdmUoa2luZCwgY2IpeyB0aGlzLnJlY2VpdmVzLnB1c2goW2tpbmQsIGNiXSkgfVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmKHZpZXcuaXNEZXN0cm95ZWQoKSl7IHJldHVybiB9XG4gICAgICBmYWtlUHVzaC5yZWNlaXZlcy5yZWR1Y2UoKGFjYywgW2tpbmQsIGNiXSkgPT4gYWNjLnJlY2VpdmUoa2luZCwgY2IpLCBwdXNoKCkpXG4gICAgfSwgbGF0ZW5jeSlcbiAgICByZXR1cm4gZmFrZVB1c2hcbiAgfVxuXG4gIHJlbG9hZFdpdGhKaXR0ZXIodmlldywgbG9nKXtcbiAgICB2aWV3LmRlc3Ryb3koKVxuICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgbGV0IG1pbk1zID0gdGhpcy5yZWxvYWRKaXR0ZXJNaW5cbiAgICBsZXQgbWF4TXMgPSB0aGlzLnJlbG9hZEppdHRlck1heFxuICAgIGxldCBhZnRlck1zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE1zIC0gbWluTXMgKyAxKSkgKyBtaW5Nc1xuICAgIGxldCB0cmllcyA9IEJyb3dzZXIudXBkYXRlTG9jYWwodGhpcy5sb2NhbFN0b3JhZ2UsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgQ09OU0VDVVRJVkVfUkVMT0FEUywgMCwgY291bnQgPT4gY291bnQgKyAxKVxuICAgIGxvZyA/IGxvZygpIDogdGhpcy5sb2codmlldywgXCJqb2luXCIsICgpID0+IFtgZW5jb3VudGVyZWQgJHt0cmllc30gY29uc2VjdXRpdmUgcmVsb2Fkc2BdKVxuICAgIGlmKHRyaWVzID4gdGhpcy5tYXhSZWxvYWRzKXtcbiAgICAgIHRoaXMubG9nKHZpZXcsIFwiam9pblwiLCAoKSA9PiBbYGV4Y2VlZGVkICR7dGhpcy5tYXhSZWxvYWRzfSBjb25zZWN1dGl2ZSByZWxvYWRzLiBFbnRlcmluZyBmYWlsc2FmZSBtb2RlYF0pXG4gICAgICBhZnRlck1zID0gdGhpcy5mYWlsc2FmZUppdHRlclxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmKHRoaXMuaGFzUGVuZGluZ0xpbmsoKSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHRoaXMucGVuZGluZ0xpbmtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgfVxuICAgIH0sIGFmdGVyTXMpXG4gIH1cblxuICBnZXRIb29rQ2FsbGJhY2tzKG5hbWUpe1xuICAgIHJldHVybiBuYW1lICYmIG5hbWUuc3RhcnRzV2l0aChcIlBob2VuaXguXCIpID8gSG9va3NbbmFtZS5zcGxpdChcIi5cIilbMV1dIDogdGhpcy5ob29rc1tuYW1lXVxuICB9XG5cbiAgaXNVbmxvYWRlZCgpeyByZXR1cm4gdGhpcy51bmxvYWRlZCB9XG5cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkgfVxuXG4gIGdldEJpbmRpbmdQcmVmaXgoKXsgcmV0dXJuIHRoaXMuYmluZGluZ1ByZWZpeCB9XG5cbiAgYmluZGluZyhraW5kKXsgcmV0dXJuIGAke3RoaXMuZ2V0QmluZGluZ1ByZWZpeCgpfSR7a2luZH1gIH1cblxuICBjaGFubmVsKHRvcGljLCBwYXJhbXMpeyByZXR1cm4gdGhpcy5zb2NrZXQuY2hhbm5lbCh0b3BpYywgcGFyYW1zKSB9XG5cbiAgam9pblJvb3RWaWV3cygpe1xuICAgIGxldCByb290c0ZvdW5kID0gZmFsc2VcbiAgICBET00uYWxsKGRvY3VtZW50LCBgJHtQSFhfVklFV19TRUxFQ1RPUn06bm90KFske1BIWF9QQVJFTlRfSUR9XSlgLCByb290RWwgPT4ge1xuICAgICAgaWYoIXRoaXMuZ2V0Um9vdEJ5SWQocm9vdEVsLmlkKSl7XG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5uZXdSb290Vmlldyhyb290RWwpXG4gICAgICAgIHZpZXcuc2V0SHJlZih0aGlzLmdldEhyZWYoKSlcbiAgICAgICAgdmlldy5qb2luKClcbiAgICAgICAgaWYocm9vdEVsLmdldEF0dHJpYnV0ZShQSFhfTUFJTikpeyB0aGlzLm1haW4gPSB2aWV3IH1cbiAgICAgIH1cbiAgICAgIHJvb3RzRm91bmQgPSB0cnVlXG4gICAgfSlcbiAgICByZXR1cm4gcm9vdHNGb3VuZFxuICB9XG5cbiAgcmVkaXJlY3QodG8sIGZsYXNoKXtcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgIEJyb3dzZXIucmVkaXJlY3QodG8sIGZsYXNoKVxuICB9XG5cbiAgcmVwbGFjZU1haW4oaHJlZiwgZmxhc2gsIGNhbGxiYWNrID0gbnVsbCwgbGlua1JlZiA9IHRoaXMuc2V0UGVuZGluZ0xpbmsoaHJlZikpe1xuICAgIHRoaXMub3V0Z29pbmdNYWluRWwgPSB0aGlzLm91dGdvaW5nTWFpbkVsIHx8IHRoaXMubWFpbi5lbFxuICAgIGxldCBuZXdNYWluRWwgPSBET00uY2xvbmVOb2RlKHRoaXMub3V0Z29pbmdNYWluRWwsIFwiXCIpXG4gICAgdGhpcy5tYWluLnNob3dMb2FkZXIodGhpcy5sb2FkZXJUaW1lb3V0KVxuICAgIHRoaXMubWFpbi5kZXN0cm95KClcblxuICAgIHRoaXMubWFpbiA9IHRoaXMubmV3Um9vdFZpZXcobmV3TWFpbkVsLCBmbGFzaClcbiAgICB0aGlzLm1haW4uc2V0UmVkaXJlY3QoaHJlZilcbiAgICB0aGlzLnRyYW5zaXRpb25SZW1vdmVzKClcbiAgICB0aGlzLm1haW4uam9pbigoam9pbkNvdW50LCBvbkRvbmUpID0+IHtcbiAgICAgIGlmKGpvaW5Db3VudCA9PT0gMSAmJiB0aGlzLmNvbW1pdFBlbmRpbmdMaW5rKGxpbmtSZWYpKXtcbiAgICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICBET00uZmluZFBoeFN0aWNreShkb2N1bWVudCkuZm9yRWFjaChlbCA9PiBuZXdNYWluRWwuYXBwZW5kQ2hpbGQoZWwpKVxuICAgICAgICAgIHRoaXMub3V0Z29pbmdNYWluRWwucmVwbGFjZVdpdGgobmV3TWFpbkVsKVxuICAgICAgICAgIHRoaXMub3V0Z29pbmdNYWluRWwgPSBudWxsXG4gICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgICAgIG9uRG9uZSgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyYW5zaXRpb25SZW1vdmVzKGVsZW1lbnRzKXtcbiAgICBsZXQgcmVtb3ZlQXR0ciA9IHRoaXMuYmluZGluZyhcInJlbW92ZVwiKVxuICAgIGVsZW1lbnRzID0gZWxlbWVudHMgfHwgRE9NLmFsbChkb2N1bWVudCwgYFske3JlbW92ZUF0dHJ9XWApXG4gICAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBpZihkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKSl7IC8vIHNraXAgY2hpbGRyZW4gYWxyZWFkeSByZW1vdmVkXG4gICAgICAgIHRoaXMuZXhlY0pTKGVsLCBlbC5nZXRBdHRyaWJ1dGUocmVtb3ZlQXR0ciksIFwicmVtb3ZlXCIpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlzUGh4VmlldyhlbCl7IHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKSAhPT0gbnVsbCB9XG5cbiAgbmV3Um9vdFZpZXcoZWwsIGZsYXNoKXtcbiAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCB0aGlzLCBudWxsLCBmbGFzaClcbiAgICB0aGlzLnJvb3RzW3ZpZXcuaWRdID0gdmlld1xuICAgIHJldHVybiB2aWV3XG4gIH1cblxuICBvd25lcihjaGlsZEVsLCBjYWxsYmFjayl7XG4gICAgbGV0IHZpZXcgPSBtYXliZShjaGlsZEVsLmNsb3Nlc3QoUEhYX1ZJRVdfU0VMRUNUT1IpLCBlbCA9PiB0aGlzLmdldFZpZXdCeUVsKGVsKSkgfHwgdGhpcy5tYWluXG4gICAgaWYodmlldyl7IGNhbGxiYWNrKHZpZXcpIH1cbiAgfVxuXG4gIHdpdGhpbk93bmVycyhjaGlsZEVsLCBjYWxsYmFjayl7XG4gICAgdGhpcy5vd25lcihjaGlsZEVsLCB2aWV3ID0+IGNhbGxiYWNrKHZpZXcsIGNoaWxkRWwpKVxuICB9XG5cbiAgZ2V0Vmlld0J5RWwoZWwpe1xuICAgIGxldCByb290SWQgPSBlbC5nZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQpXG4gICAgcmV0dXJuIG1heWJlKHRoaXMuZ2V0Um9vdEJ5SWQocm9vdElkKSwgcm9vdCA9PiByb290LmdldERlc2NlbmRlbnRCeUVsKGVsKSlcbiAgfVxuXG4gIGdldFJvb3RCeUlkKGlkKXsgcmV0dXJuIHRoaXMucm9vdHNbaWRdIH1cblxuICBkZXN0cm95QWxsVmlld3MoKXtcbiAgICBmb3IobGV0IGlkIGluIHRoaXMucm9vdHMpe1xuICAgICAgdGhpcy5yb290c1tpZF0uZGVzdHJveSgpXG4gICAgICBkZWxldGUgdGhpcy5yb290c1tpZF1cbiAgICB9XG4gIH1cblxuICBkZXN0cm95Vmlld0J5RWwoZWwpe1xuICAgIGxldCByb290ID0gdGhpcy5nZXRSb290QnlJZChlbC5nZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQpKVxuICAgIGlmKHJvb3QgJiYgcm9vdC5pZCA9PT0gZWwuaWQpe1xuICAgICAgcm9vdC5kZXN0cm95KClcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RzW3Jvb3QuaWRdXG4gICAgfSBlbHNlIGlmKHJvb3Qpe1xuICAgICAgcm9vdC5kZXN0cm95RGVzY2VuZGVudChlbC5pZClcbiAgICB9XG4gIH1cblxuICBzZXRBY3RpdmVFbGVtZW50KHRhcmdldCl7XG4gICAgaWYodGhpcy5hY3RpdmVFbGVtZW50ID09PSB0YXJnZXQpeyByZXR1cm4gfVxuICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IHRhcmdldFxuICAgIGxldCBjYW5jZWwgPSAoKSA9PiB7XG4gICAgICBpZih0YXJnZXQgPT09IHRoaXMuYWN0aXZlRWxlbWVudCl7IHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGwgfVxuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMpXG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMpXG4gICAgfVxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBjYW5jZWwpXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBjYW5jZWwpXG4gIH1cblxuICBnZXRBY3RpdmVFbGVtZW50KCl7XG4gICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSl7XG4gICAgICByZXR1cm4gdGhpcy5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBjYW4gYmUgbnVsbCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMVxuICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keVxuICAgIH1cbiAgfVxuXG4gIGRyb3BBY3RpdmVFbGVtZW50KHZpZXcpe1xuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAmJiB2aWV3Lm93bnNFbGVtZW50KHRoaXMucHJldkFjdGl2ZSkpe1xuICAgICAgdGhpcy5wcmV2QWN0aXZlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHJlc3RvcmVQcmV2aW91c2x5QWN0aXZlRm9jdXMoKXtcbiAgICBpZih0aGlzLnByZXZBY3RpdmUgJiYgdGhpcy5wcmV2QWN0aXZlICE9PSBkb2N1bWVudC5ib2R5KXtcbiAgICAgIHRoaXMucHJldkFjdGl2ZS5mb2N1cygpXG4gICAgfVxuICB9XG5cbiAgYmx1ckFjdGl2ZUVsZW1lbnQoKXtcbiAgICB0aGlzLnByZXZBY3RpdmUgPSB0aGlzLmdldEFjdGl2ZUVsZW1lbnQoKVxuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAhPT0gZG9jdW1lbnQuYm9keSl7IHRoaXMucHJldkFjdGl2ZS5ibHVyKCkgfVxuICB9XG5cbiAgYmluZFRvcExldmVsRXZlbnRzKCl7XG4gICAgaWYodGhpcy5ib3VuZFRvcExldmVsRXZlbnRzKXsgcmV0dXJuIH1cblxuICAgIHRoaXMuYm91bmRUb3BMZXZlbEV2ZW50cyA9IHRydWVcbiAgICAvLyBlbnRlciBmYWlsc2FmZSByZWxvYWQgaWYgc2VydmVyIGhhcyBnb25lIGF3YXkgaW50ZW50aW9uYWxseSwgc3VjaCBhcyBcImRpc2Nvbm5lY3RcIiBicm9hZGNhc3RcbiAgICB0aGlzLnNvY2tldC5vbkNsb3NlKGV2ZW50ID0+IHtcbiAgICAgIGlmKGV2ZW50ICYmIGV2ZW50LmNvZGUgPT09IDEwMDAgJiYgdGhpcy5tYWluKXtcbiAgICAgICAgdGhpcy5yZWxvYWRXaXRoSml0dGVyKHRoaXMubWFpbilcbiAgICAgIH1cbiAgICB9KVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpeyB9KSAvLyBlbnN1cmUgYWxsIGNsaWNrIGV2ZW50cyBidWJibGUgZm9yIG1vYmlsZSBTYWZhcmlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIGUgPT4ge1xuICAgICAgaWYoZS5wZXJzaXN0ZWQpeyAvLyByZWxvYWQgcGFnZSBpZiBiZWluZyByZXN0b3JlZCBmcm9tIGJhY2svZm9yd2FyZCBjYWNoZVxuICAgICAgICB0aGlzLmdldFNvY2tldCgpLmRpc2Nvbm5lY3QoKVxuICAgICAgICB0aGlzLndpdGhQYWdlTG9hZGluZyh7dG86IHdpbmRvdy5sb2NhdGlvbi5ocmVmLCBraW5kOiBcInJlZGlyZWN0XCJ9KVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9LCB0cnVlKVxuICAgIHRoaXMuYmluZE5hdigpXG4gICAgdGhpcy5iaW5kQ2xpY2tzKClcbiAgICB0aGlzLmJpbmRGb3JtcygpXG4gICAgdGhpcy5iaW5kKHtrZXl1cDogXCJrZXl1cFwiLCBrZXlkb3duOiBcImtleWRvd25cIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgcGh4RXZlbnQsIGV2ZW50VGFyZ2V0KSA9PiB7XG4gICAgICBsZXQgbWF0Y2hLZXkgPSB0YXJnZXRFbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9LRVkpKVxuICAgICAgbGV0IHByZXNzZWRLZXkgPSBlLmtleSAmJiBlLmtleS50b0xvd2VyQ2FzZSgpIC8vIGNocm9tZSBjbGlja2VkIGF1dG9jb21wbGV0ZXMgc2VuZCBhIGtleWRvd24gd2l0aG91dCBrZXlcbiAgICAgIGlmKG1hdGNoS2V5ICYmIG1hdGNoS2V5LnRvTG93ZXJDYXNlKCkgIT09IHByZXNzZWRLZXkpeyByZXR1cm4gfVxuXG4gICAgICBsZXQgZGF0YSA9IHtrZXk6IGUua2V5LCAuLi50aGlzLmV2ZW50TWV0YSh0eXBlLCBlLCB0YXJnZXRFbCl9XG4gICAgICBKUy5leGVjKHR5cGUsIHBoeEV2ZW50LCB2aWV3LCB0YXJnZXRFbCwgW1wicHVzaFwiLCB7ZGF0YX1dKVxuICAgIH0pXG4gICAgdGhpcy5iaW5kKHtibHVyOiBcImZvY3Vzb3V0XCIsIGZvY3VzOiBcImZvY3VzaW5cIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgcGh4RXZlbnQsIGV2ZW50VGFyZ2V0KSA9PiB7XG4gICAgICBpZighZXZlbnRUYXJnZXQpe1xuICAgICAgICBsZXQgZGF0YSA9IHtrZXk6IGUua2V5LCAuLi50aGlzLmV2ZW50TWV0YSh0eXBlLCBlLCB0YXJnZXRFbCl9XG4gICAgICAgIEpTLmV4ZWModHlwZSwgcGh4RXZlbnQsIHZpZXcsIHRhcmdldEVsLCBbXCJwdXNoXCIsIHtkYXRhfV0pXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmJpbmQoe2JsdXI6IFwiYmx1clwiLCBmb2N1czogXCJmb2N1c1wifSwgKGUsIHR5cGUsIHZpZXcsIHRhcmdldEVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBwaHhUYXJnZXQpID0+IHtcbiAgICAgIC8vIGJsdXIgYW5kIGZvY3VzIGFyZSB0cmlnZ2VyZWQgb24gZG9jdW1lbnQgYW5kIHdpbmRvdy4gRGlzY2FyZCBvbmUgdG8gYXZvaWQgZHVwc1xuICAgICAgaWYocGh4VGFyZ2V0ID09PSBcIndpbmRvd1wiKXtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmV2ZW50TWV0YSh0eXBlLCBlLCB0YXJnZXRFbClcbiAgICAgICAgSlMuZXhlYyh0eXBlLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0RWwsIFtcInB1c2hcIiwge2RhdGF9XSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBsZXQgZHJvcFRhcmdldElkID0gbWF5YmUoY2xvc2VzdFBoeEJpbmRpbmcoZS50YXJnZXQsIHRoaXMuYmluZGluZyhQSFhfRFJPUF9UQVJHRVQpKSwgdHJ1ZVRhcmdldCA9PiB7XG4gICAgICAgIHJldHVybiB0cnVlVGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0RST1BfVEFSR0VUKSlcbiAgICAgIH0pXG4gICAgICBsZXQgZHJvcFRhcmdldCA9IGRyb3BUYXJnZXRJZCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcm9wVGFyZ2V0SWQpXG4gICAgICBsZXQgZmlsZXMgPSBBcnJheS5mcm9tKGUuZGF0YVRyYW5zZmVyLmZpbGVzIHx8IFtdKVxuICAgICAgaWYoIWRyb3BUYXJnZXQgfHwgZHJvcFRhcmdldC5kaXNhYmxlZCB8fCBmaWxlcy5sZW5ndGggPT09IDAgfHwgIShkcm9wVGFyZ2V0LmZpbGVzIGluc3RhbmNlb2YgRmlsZUxpc3QpKXsgcmV0dXJuIH1cblxuICAgICAgTGl2ZVVwbG9hZGVyLnRyYWNrRmlsZXMoZHJvcFRhcmdldCwgZmlsZXMpXG4gICAgICBkcm9wVGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIiwge2J1YmJsZXM6IHRydWV9KSlcbiAgICB9KVxuICAgIHRoaXMub24oUEhYX1RSQUNLX1VQTE9BRFMsIGUgPT4ge1xuICAgICAgbGV0IHVwbG9hZFRhcmdldCA9IGUudGFyZ2V0XG4gICAgICBpZighRE9NLmlzVXBsb2FkSW5wdXQodXBsb2FkVGFyZ2V0KSl7IHJldHVybiB9XG4gICAgICBsZXQgZmlsZXMgPSBBcnJheS5mcm9tKGUuZGV0YWlsLmZpbGVzIHx8IFtdKS5maWx0ZXIoZiA9PiBmIGluc3RhbmNlb2YgRmlsZSB8fCBmIGluc3RhbmNlb2YgQmxvYilcbiAgICAgIExpdmVVcGxvYWRlci50cmFja0ZpbGVzKHVwbG9hZFRhcmdldCwgZmlsZXMpXG4gICAgICB1cGxvYWRUYXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiLCB7YnViYmxlczogdHJ1ZX0pKVxuICAgIH0pXG4gIH1cblxuICBldmVudE1ldGEoZXZlbnROYW1lLCBlLCB0YXJnZXRFbCl7XG4gICAgbGV0IGNhbGxiYWNrID0gdGhpcy5tZXRhZGF0YUNhbGxiYWNrc1tldmVudE5hbWVdXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gY2FsbGJhY2soZSwgdGFyZ2V0RWwpIDoge31cbiAgfVxuXG4gIHNldFBlbmRpbmdMaW5rKGhyZWYpe1xuICAgIHRoaXMubGlua1JlZisrXG4gICAgdGhpcy5wZW5kaW5nTGluayA9IGhyZWZcbiAgICByZXR1cm4gdGhpcy5saW5rUmVmXG4gIH1cblxuICBjb21taXRQZW5kaW5nTGluayhsaW5rUmVmKXtcbiAgICBpZih0aGlzLmxpbmtSZWYgIT09IGxpbmtSZWYpe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaHJlZiA9IHRoaXMucGVuZGluZ0xpbmtcbiAgICAgIHRoaXMucGVuZGluZ0xpbmsgPSBudWxsXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGdldEhyZWYoKXsgcmV0dXJuIHRoaXMuaHJlZiB9XG5cbiAgaGFzUGVuZGluZ0xpbmsoKXsgcmV0dXJuICEhdGhpcy5wZW5kaW5nTGluayB9XG5cbiAgYmluZChldmVudHMsIGNhbGxiYWNrKXtcbiAgICBmb3IobGV0IGV2ZW50IGluIGV2ZW50cyl7XG4gICAgICBsZXQgYnJvd3NlckV2ZW50TmFtZSA9IGV2ZW50c1tldmVudF1cblxuICAgICAgdGhpcy5vbihicm93c2VyRXZlbnROYW1lLCBlID0+IHtcbiAgICAgICAgbGV0IGJpbmRpbmcgPSB0aGlzLmJpbmRpbmcoZXZlbnQpXG4gICAgICAgIGxldCB3aW5kb3dCaW5kaW5nID0gdGhpcy5iaW5kaW5nKGB3aW5kb3ctJHtldmVudH1gKVxuICAgICAgICBsZXQgdGFyZ2V0UGh4RXZlbnQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKGJpbmRpbmcpXG4gICAgICAgIGlmKHRhcmdldFBoeEV2ZW50KXtcbiAgICAgICAgICB0aGlzLmRlYm91bmNlKGUudGFyZ2V0LCBlLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlLnRhcmdldCwgdmlldyA9PiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKGUsIGV2ZW50LCB2aWV3LCBlLnRhcmdldCwgdGFyZ2V0UGh4RXZlbnQsIG51bGwpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgRE9NLmFsbChkb2N1bWVudCwgYFske3dpbmRvd0JpbmRpbmd9XWAsIGVsID0+IHtcbiAgICAgICAgICAgIGxldCBwaHhFdmVudCA9IGVsLmdldEF0dHJpYnV0ZSh3aW5kb3dCaW5kaW5nKVxuICAgICAgICAgICAgdGhpcy5kZWJvdW5jZShlbCwgZSwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlbCwgdmlldyA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZSwgZXZlbnQsIHZpZXcsIGVsLCBwaHhFdmVudCwgXCJ3aW5kb3dcIilcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBiaW5kQ2xpY2tzKCl7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZSA9PiB0aGlzLmNsaWNrU3RhcnRlZEF0VGFyZ2V0ID0gZS50YXJnZXQpXG4gICAgdGhpcy5iaW5kQ2xpY2soXCJjbGlja1wiLCBcImNsaWNrXCIsIGZhbHNlKVxuICAgIHRoaXMuYmluZENsaWNrKFwibW91c2Vkb3duXCIsIFwiY2FwdHVyZS1jbGlja1wiLCB0cnVlKVxuICB9XG5cbiAgYmluZENsaWNrKGV2ZW50TmFtZSwgYmluZGluZ05hbWUsIGNhcHR1cmUpe1xuICAgIGxldCBjbGljayA9IHRoaXMuYmluZGluZyhiaW5kaW5nTmFtZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGUgPT4ge1xuICAgICAgbGV0IHRhcmdldCA9IG51bGxcbiAgICAgIGlmKGNhcHR1cmUpe1xuICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5tYXRjaGVzKGBbJHtjbGlja31dYCkgPyBlLnRhcmdldCA6IGUudGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoYFske2NsaWNrfV1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGNsaWNrU3RhcnRlZEF0VGFyZ2V0ID0gdGhpcy5jbGlja1N0YXJ0ZWRBdFRhcmdldCB8fCBlLnRhcmdldFxuICAgICAgICB0YXJnZXQgPSBjbG9zZXN0UGh4QmluZGluZyhjbGlja1N0YXJ0ZWRBdFRhcmdldCwgY2xpY2spXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDbGlja0F3YXkoZSwgY2xpY2tTdGFydGVkQXRUYXJnZXQpXG4gICAgICAgIHRoaXMuY2xpY2tTdGFydGVkQXRUYXJnZXQgPSBudWxsXG4gICAgICB9XG4gICAgICBsZXQgcGh4RXZlbnQgPSB0YXJnZXQgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShjbGljaylcbiAgICAgIGlmKCFwaHhFdmVudCl7IHJldHVybiB9XG4gICAgICBpZih0YXJnZXQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSA9PT0gXCIjXCIpeyBlLnByZXZlbnREZWZhdWx0KCkgfVxuXG4gICAgICB0aGlzLmRlYm91bmNlKHRhcmdldCwgZSwgKCkgPT4ge1xuICAgICAgICB0aGlzLndpdGhpbk93bmVycyh0YXJnZXQsIHZpZXcgPT4ge1xuICAgICAgICAgIEpTLmV4ZWMoXCJjbGlja1wiLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0LCBbXCJwdXNoXCIsIHtkYXRhOiB0aGlzLmV2ZW50TWV0YShcImNsaWNrXCIsIGUsIHRhcmdldCl9XSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSwgY2FwdHVyZSlcbiAgfVxuXG4gIGRpc3BhdGNoQ2xpY2tBd2F5KGUsIGNsaWNrU3RhcnRlZEF0KXtcbiAgICBsZXQgcGh4Q2xpY2tBd2F5ID0gdGhpcy5iaW5kaW5nKFwiY2xpY2stYXdheVwiKVxuICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHtwaHhDbGlja0F3YXl9XWAsIGVsID0+IHtcbiAgICAgIGlmKCEoZWwuaXNTYW1lTm9kZShjbGlja1N0YXJ0ZWRBdCkgfHwgZWwuY29udGFpbnMoY2xpY2tTdGFydGVkQXQpKSl7XG4gICAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgICBsZXQgcGh4RXZlbnQgPSBlbC5nZXRBdHRyaWJ1dGUocGh4Q2xpY2tBd2F5KVxuICAgICAgICAgIGlmKEpTLmlzVmlzaWJsZShlbCkpe1xuICAgICAgICAgICAgSlMuZXhlYyhcImNsaWNrXCIsIHBoeEV2ZW50LCB2aWV3LCBlbCwgW1wicHVzaFwiLCB7ZGF0YTogdGhpcy5ldmVudE1ldGEoXCJjbGlja1wiLCBlLCBlLnRhcmdldCl9XSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGJpbmROYXYoKXtcbiAgICBpZighQnJvd3Nlci5jYW5QdXNoU3RhdGUoKSl7IHJldHVybiB9XG4gICAgaWYoaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbil7IGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24gPSBcIm1hbnVhbFwiIH1cbiAgICBsZXQgc2Nyb2xsVGltZXIgPSBudWxsXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgX2UgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHNjcm9sbFRpbWVyKVxuICAgICAgc2Nyb2xsVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgQnJvd3Nlci51cGRhdGVDdXJyZW50U3RhdGUoc3RhdGUgPT4gT2JqZWN0LmFzc2lnbihzdGF0ZSwge3Njcm9sbDogd2luZG93LnNjcm9sbFl9KSlcbiAgICAgIH0sIDEwMClcbiAgICB9KVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZXZlbnQgPT4ge1xuICAgICAgaWYoIXRoaXMucmVnaXN0ZXJOZXdMb2NhdGlvbih3aW5kb3cubG9jYXRpb24pKXsgcmV0dXJuIH1cbiAgICAgIGxldCB7dHlwZSwgaWQsIHJvb3QsIHNjcm9sbH0gPSBldmVudC5zdGF0ZSB8fCB7fVxuICAgICAgbGV0IGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuXG4gICAgICB0aGlzLnJlcXVlc3RET01VcGRhdGUoKCkgPT4ge1xuICAgICAgICBpZih0aGlzLm1haW4uaXNDb25uZWN0ZWQoKSAmJiAodHlwZSA9PT0gXCJwYXRjaFwiICYmIGlkID09PSB0aGlzLm1haW4uaWQpKXtcbiAgICAgICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCBudWxsKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucmVwbGFjZU1haW4oaHJlZiwgbnVsbCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYocm9vdCl7IHRoaXMucmVwbGFjZVJvb3RIaXN0b3J5KCkgfVxuICAgICAgICAgICAgaWYodHlwZW9mKHNjcm9sbCkgPT09IFwibnVtYmVyXCIpe1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgc2Nyb2xsKVxuICAgICAgICAgICAgICB9LCAwKSAvLyB0aGUgYm9keSBuZWVkcyB0byByZW5kZXIgYmVmb3JlIHdlIHNjcm9sbC5cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sIGZhbHNlKVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZSA9PiB7XG4gICAgICBsZXQgdGFyZ2V0ID0gY2xvc2VzdFBoeEJpbmRpbmcoZS50YXJnZXQsIFBIWF9MSVZFX0xJTkspXG4gICAgICBsZXQgdHlwZSA9IHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKFBIWF9MSVZFX0xJTkspXG4gICAgICBsZXQgd2FudHNOZXdUYWIgPSBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5IHx8IGUuYnV0dG9uID09PSAxXG4gICAgICBpZighdHlwZSB8fCAhdGhpcy5pc0Nvbm5lY3RlZCgpIHx8ICF0aGlzLm1haW4gfHwgd2FudHNOZXdUYWIpeyByZXR1cm4gfVxuXG4gICAgICBsZXQgaHJlZiA9IHRhcmdldC5ocmVmXG4gICAgICBsZXQgbGlua1N0YXRlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShQSFhfTElOS19TVEFURSlcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSAvLyBkbyBub3QgYnViYmxlIGNsaWNrIHRvIHJlZ3VsYXIgcGh4LWNsaWNrIGJpbmRpbmdzXG4gICAgICBpZih0aGlzLnBlbmRpbmdMaW5rID09PSBocmVmKXsgcmV0dXJuIH1cblxuICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgaWYodHlwZSA9PT0gXCJwYXRjaFwiKXtcbiAgICAgICAgICB0aGlzLnB1c2hIaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCB0YXJnZXQpXG4gICAgICAgIH0gZWxzZSBpZih0eXBlID09PSBcInJlZGlyZWN0XCIpe1xuICAgICAgICAgIHRoaXMuaGlzdG9yeVJlZGlyZWN0KGhyZWYsIGxpbmtTdGF0ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGV4cGVjdGVkICR7UEhYX0xJVkVfTElOS30gdG8gYmUgXCJwYXRjaFwiIG9yIFwicmVkaXJlY3RcIiwgZ290OiAke3R5cGV9YClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnQsIHBheWxvYWQgPSB7fSl7XG4gICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBgcGh4OiR7ZXZlbnR9YCwge2RldGFpbDogcGF5bG9hZH0pXG4gIH1cblxuICBkaXNwYXRjaEV2ZW50cyhldmVudHMpe1xuICAgIGV2ZW50cy5mb3JFYWNoKChbZXZlbnQsIHBheWxvYWRdKSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQsIHBheWxvYWQpKVxuICB9XG5cbiAgd2l0aFBhZ2VMb2FkaW5nKGluZm8sIGNhbGxiYWNrKXtcbiAgICBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdGFydFwiLCB7ZGV0YWlsOiBpbmZvfSlcbiAgICBsZXQgZG9uZSA9ICgpID0+IERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6cGFnZS1sb2FkaW5nLXN0b3BcIiwge2RldGFpbDogaW5mb30pXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gY2FsbGJhY2soZG9uZSkgOiBkb25lXG4gIH1cblxuICBwdXNoSGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgdGFyZ2V0RWwpe1xuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJwYXRjaFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCB0YXJnZXRFbCwgbGlua1JlZiA9PiB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgbGlua1JlZilcbiAgICAgICAgZG9uZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBoaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCBsaW5rUmVmID0gdGhpcy5zZXRQZW5kaW5nTGluayhocmVmKSl7XG4gICAgaWYoIXRoaXMuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpeyByZXR1cm4gfVxuXG4gICAgQnJvd3Nlci5wdXNoU3RhdGUobGlua1N0YXRlLCB7dHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSwgaHJlZilcbiAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICB9XG5cbiAgaGlzdG9yeVJlZGlyZWN0KGhyZWYsIGxpbmtTdGF0ZSwgZmxhc2gpe1xuICAgIGxldCBzY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWVxuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJyZWRpcmVjdFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLnJlcGxhY2VNYWluKGhyZWYsIGZsYXNoLCAoKSA9PiB7XG4gICAgICAgIEJyb3dzZXIucHVzaFN0YXRlKGxpbmtTdGF0ZSwge3R5cGU6IFwicmVkaXJlY3RcIiwgaWQ6IHRoaXMubWFpbi5pZCwgc2Nyb2xsOiBzY3JvbGx9LCBocmVmKVxuICAgICAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICAgICAgICBkb25lKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlcGxhY2VSb290SGlzdG9yeSgpe1xuICAgIEJyb3dzZXIucHVzaFN0YXRlKFwicmVwbGFjZVwiLCB7cm9vdDogdHJ1ZSwgdHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSlcbiAgfVxuXG4gIHJlZ2lzdGVyTmV3TG9jYXRpb24obmV3TG9jYXRpb24pe1xuICAgIGxldCB7cGF0aG5hbWUsIHNlYXJjaH0gPSB0aGlzLmN1cnJlbnRMb2NhdGlvblxuICAgIGlmKHBhdGhuYW1lICsgc2VhcmNoID09PSBuZXdMb2NhdGlvbi5wYXRobmFtZSArIG5ld0xvY2F0aW9uLnNlYXJjaCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjbG9uZShuZXdMb2NhdGlvbilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgYmluZEZvcm1zKCl7XG4gICAgbGV0IGl0ZXJhdGlvbnMgPSAwXG4gICAgdGhpcy5vbihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGxldCBwaHhFdmVudCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJzdWJtaXRcIikpXG4gICAgICBpZighcGh4RXZlbnQpeyByZXR1cm4gfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnRhcmdldC5kaXNhYmxlZCA9IHRydWVcbiAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgSlMuZXhlYyhcInN1Ym1pdFwiLCBwaHhFdmVudCwgdmlldywgZS50YXJnZXQsIFtcInB1c2hcIiwge31dKVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcblxuICAgIGZvcihsZXQgdHlwZSBvZiBbXCJjaGFuZ2VcIiwgXCJpbnB1dFwiXSl7XG4gICAgICB0aGlzLm9uKHR5cGUsIGUgPT4ge1xuICAgICAgICBsZXQgcGh4Q2hhbmdlID0gdGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpXG4gICAgICAgIGxldCBpbnB1dCA9IGUudGFyZ2V0XG4gICAgICAgIGxldCBpbnB1dEV2ZW50ID0gaW5wdXQuZ2V0QXR0cmlidXRlKHBoeENoYW5nZSlcbiAgICAgICAgbGV0IGZvcm1FdmVudCA9IGlucHV0LmZvcm0gJiYgaW5wdXQuZm9ybS5nZXRBdHRyaWJ1dGUocGh4Q2hhbmdlKVxuICAgICAgICBsZXQgcGh4RXZlbnQgPSBpbnB1dEV2ZW50IHx8IGZvcm1FdmVudFxuICAgICAgICBpZighcGh4RXZlbnQpeyByZXR1cm4gfVxuICAgICAgICBpZihpbnB1dC50eXBlID09PSBcIm51bWJlclwiICYmIGlucHV0LnZhbGlkaXR5ICYmIGlucHV0LnZhbGlkaXR5LmJhZElucHV0KXsgcmV0dXJuIH1cblxuICAgICAgICBsZXQgZGlzcGF0Y2hlciA9IGlucHV0RXZlbnQgPyBpbnB1dCA6IGlucHV0LmZvcm1cbiAgICAgICAgbGV0IGN1cnJlbnRJdGVyYXRpb25zID0gaXRlcmF0aW9uc1xuICAgICAgICBpdGVyYXRpb25zKytcbiAgICAgICAgbGV0IHthdDogYXQsIHR5cGU6IGxhc3RUeXBlfSA9IERPTS5wcml2YXRlKGlucHV0LCBcInByZXYtaXRlcmF0aW9uXCIpIHx8IHt9XG4gICAgICAgIC8vIGRldGVjdCBkdXAgYmVjYXVzZSBzb21lIGJyb3dzZXJzIGRpc3BhdGNoIGJvdGggXCJpbnB1dFwiIGFuZCBcImNoYW5nZVwiXG4gICAgICAgIGlmKGF0ID09PSBjdXJyZW50SXRlcmF0aW9ucyAtIDEgJiYgdHlwZSAhPT0gbGFzdFR5cGUpeyByZXR1cm4gfVxuXG4gICAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0LCBcInByZXYtaXRlcmF0aW9uXCIsIHthdDogY3VycmVudEl0ZXJhdGlvbnMsIHR5cGU6IHR5cGV9KVxuXG4gICAgICAgIHRoaXMuZGVib3VuY2UoaW5wdXQsIGUsICgpID0+IHtcbiAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhkaXNwYXRjaGVyLCB2aWV3ID0+IHtcbiAgICAgICAgICAgIERPTS5wdXRQcml2YXRlKGlucHV0LCBQSFhfSEFTX0ZPQ1VTRUQsIHRydWUpXG4gICAgICAgICAgICBpZighRE9NLmlzVGV4dHVhbElucHV0KGlucHV0KSl7XG4gICAgICAgICAgICAgIHRoaXMuc2V0QWN0aXZlRWxlbWVudChpbnB1dClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEpTLmV4ZWMoXCJjaGFuZ2VcIiwgcGh4RXZlbnQsIHZpZXcsIGlucHV0LCBbXCJwdXNoXCIsIHtfdGFyZ2V0OiBlLnRhcmdldC5uYW1lLCBkaXNwYXRjaGVyOiBkaXNwYXRjaGVyfV0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0sIGZhbHNlKVxuICAgIH1cbiAgfVxuXG4gIGRlYm91bmNlKGVsLCBldmVudCwgY2FsbGJhY2spe1xuICAgIGxldCBwaHhEZWJvdW5jZSA9IHRoaXMuYmluZGluZyhQSFhfREVCT1VOQ0UpXG4gICAgbGV0IHBoeFRocm90dGxlID0gdGhpcy5iaW5kaW5nKFBIWF9USFJPVFRMRSlcbiAgICBsZXQgZGVmYXVsdERlYm91bmNlID0gdGhpcy5kZWZhdWx0cy5kZWJvdW5jZS50b1N0cmluZygpXG4gICAgbGV0IGRlZmF1bHRUaHJvdHRsZSA9IHRoaXMuZGVmYXVsdHMudGhyb3R0bGUudG9TdHJpbmcoKVxuICAgIERPTS5kZWJvdW5jZShlbCwgZXZlbnQsIHBoeERlYm91bmNlLCBkZWZhdWx0RGVib3VuY2UsIHBoeFRocm90dGxlLCBkZWZhdWx0VGhyb3R0bGUsIGNhbGxiYWNrKVxuICB9XG5cbiAgc2lsZW5jZUV2ZW50cyhjYWxsYmFjayl7XG4gICAgdGhpcy5zaWxlbmNlZCA9IHRydWVcbiAgICBjYWxsYmFjaygpXG4gICAgdGhpcy5zaWxlbmNlZCA9IGZhbHNlXG4gIH1cblxuICBvbihldmVudCwgY2FsbGJhY2spe1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBlID0+IHtcbiAgICAgIGlmKCF0aGlzLnNpbGVuY2VkKXsgY2FsbGJhY2soZSkgfVxuICAgIH0pXG4gIH1cbn1cblxuY2xhc3MgVHJhbnNpdGlvblNldCB7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy50cmFuc2l0aW9ucyA9IG5ldyBTZXQoKVxuICAgIHRoaXMucGVuZGluZ09wcyA9IFtdXG4gICAgdGhpcy5yZXNldCgpXG4gIH1cblxuICByZXNldCgpe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuZm9yRWFjaCh0aW1lciA9PiB7XG4gICAgICBjYW5jZWxUaW1lb3V0KHRpbWVyKVxuICAgICAgdGhpcy50cmFuc2l0aW9ucy5kZWxldGUodGltZXIpXG4gICAgfSlcbiAgICB0aGlzLmZsdXNoUGVuZGluZ09wcygpXG4gIH1cblxuICBhZnRlcihjYWxsYmFjayl7XG4gICAgaWYodGhpcy5zaXplKCkgPT09IDApe1xuICAgICAgY2FsbGJhY2soKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnB1c2hQZW5kaW5nT3AoY2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgYWRkVHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpe1xuICAgIG9uU3RhcnQoKVxuICAgIGxldCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50cmFuc2l0aW9ucy5kZWxldGUodGltZXIpXG4gICAgICBvbkRvbmUoKVxuICAgICAgaWYodGhpcy5zaXplKCkgPT09IDApeyB0aGlzLmZsdXNoUGVuZGluZ09wcygpIH1cbiAgICB9LCB0aW1lKVxuICAgIHRoaXMudHJhbnNpdGlvbnMuYWRkKHRpbWVyKVxuICB9XG5cbiAgcHVzaFBlbmRpbmdPcChvcCl7IHRoaXMucGVuZGluZ09wcy5wdXNoKG9wKSB9XG5cbiAgc2l6ZSgpeyByZXR1cm4gdGhpcy50cmFuc2l0aW9ucy5zaXplIH1cblxuICBmbHVzaFBlbmRpbmdPcHMoKXtcbiAgICB0aGlzLnBlbmRpbmdPcHMuZm9yRWFjaChvcCA9PiBvcCgpKVxuICAgIHRoaXMucGVuZGluZ09wcyA9IFtdXG4gIH1cbn1cbiIsICIvLyBXZSBpbXBvcnQgdGhlIENTUyB3aGljaCBpcyBleHRyYWN0ZWQgdG8gaXRzIG93biBmaWxlIGJ5IGVzYnVpbGQuXG4vLyBSZW1vdmUgdGhpcyBsaW5lIGlmIHlvdSBhZGQgYSB5b3VyIG93biBDU1MgYnVpbGQgcGlwZWxpbmUgKGUuZyBwb3N0Y3NzKS5cblxuLy8gSWYgeW91IHdhbnQgdG8gdXNlIFBob2VuaXggY2hhbm5lbHMsIHJ1biBgbWl4IGhlbHAgcGh4Lmdlbi5jaGFubmVsYFxuLy8gdG8gZ2V0IHN0YXJ0ZWQgYW5kIHRoZW4gdW5jb21tZW50IHRoZSBsaW5lIGJlbG93LlxuLy8gaW1wb3J0IFwiLi91c2VyX3NvY2tldC5qc1wiXG5cbi8vIFlvdSBjYW4gaW5jbHVkZSBkZXBlbmRlbmNpZXMgaW4gdHdvIHdheXMuXG4vL1xuLy8gVGhlIHNpbXBsZXN0IG9wdGlvbiBpcyB0byBwdXQgdGhlbSBpbiBhc3NldHMvdmVuZG9yIGFuZFxuLy8gaW1wb3J0IHRoZW0gdXNpbmcgcmVsYXRpdmUgcGF0aHM6XG4vL1xuLy8gICAgIGltcG9ydCBcIi4uL3ZlbmRvci9zb21lLXBhY2thZ2UuanNcIlxuLy9cbi8vIEFsdGVybmF0aXZlbHksIHlvdSBjYW4gYG5wbSBpbnN0YWxsIHNvbWUtcGFja2FnZSAtLXByZWZpeCBhc3NldHNgIGFuZCBpbXBvcnRcbi8vIHRoZW0gdXNpbmcgYSBwYXRoIHN0YXJ0aW5nIHdpdGggdGhlIHBhY2thZ2UgbmFtZTpcbi8vXG4vLyAgICAgaW1wb3J0IFwic29tZS1wYWNrYWdlXCJcbi8vXG5cbi8vIEluY2x1ZGUgcGhvZW5peF9odG1sIHRvIGhhbmRsZSBtZXRob2Q9UFVUL0RFTEVURSBpbiBmb3JtcyBhbmQgYnV0dG9ucy5cbmltcG9ydCBcInBob2VuaXhfaHRtbFwiXG4vLyBFc3RhYmxpc2ggUGhvZW5peCBTb2NrZXQgYW5kIExpdmVWaWV3IGNvbmZpZ3VyYXRpb24uXG5pbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuaW1wb3J0IHtMaXZlU29ja2V0fSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxuaW1wb3J0IHRocm90dGxlIGZyb20gJ2xvZGFzaC50aHJvdHRsZSdcbmltcG9ydCBcIi4vanNjb2xvci5qc1wiXG5cbmxldCB0aHJvdHRsZU1zID0gMTAwO1xubGV0IEhvb2tzID0ge31cblxuSG9va3MuQ29sb3JTZWxlY3RvciA9IHtcbiAgdGFyZ2V0KCkgeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJwaHgtdGFyZ2V0XCIpIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAganNjb2xvci5pbnN0YWxsKCk7XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFwiYnVpbGRcIiwgdGhyb3R0bGUoZSA9PiB7XG4gICAgICBjb25zdCBldiA9IGUuZGV0YWlsXG4gICAgICBjb25zdCBoZXggPSBldi50b0hFWFN0cmluZygpXG4gICAgICB0aGlzLnB1c2hFdmVudFRvKHRoaXMudGFyZ2V0KCksIFwiY29sb3JcIiwge2hleDogaGV4LCBjb25uTmFtZTogdGhpcy5lbC5kYXRhc2V0LmNvbm5OYW1lfSlcbiAgICB9LCB0aHJvdHRsZU1zKSlcbiAgfVxufVxuXG5Ib29rcy5CcmlnaHRuZXNzU2xpZGVyID0ge1xuICB0YXJnZXQoKSB7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShcInBoeC10YXJnZXRcIikgfSxcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB0aHJvdHRsZShlID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpXG4gICAgICB0aGlzLnB1c2hFdmVudFRvKHRoaXMudGFyZ2V0KCksIFwiYnJpZ2h0bmVzc1wiLCB7dmFsdWU6IHZhbHVlLCBjb25uTmFtZTogdGhpcy5lbC5kYXRhc2V0LmNvbm5OYW1lfSlcbiAgICB9LCB0aHJvdHRsZU1zKSlcbiAgfVxufVxuXG5Ib29rcy5XaGl0ZVNsaWRlciA9IHtcbiAgdGFyZ2V0KCkgeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJwaHgtdGFyZ2V0XCIpIH0sXG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhyb3R0bGUoZSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKVxuICAgICAgdGhpcy5wdXNoRXZlbnRUbyh0aGlzLnRhcmdldCgpLCBcIndoaXRlLXNsaWRlclwiLCB7dmFsdWU6IHZhbHVlLCBjb25uTmFtZTogdGhpcy5lbC5kYXRhc2V0LmNvbm5OYW1lfSlcbiAgICB9LCB0aHJvdHRsZU1zKSlcbiAgfVxufVxuXG53aW5kb3cudXBkYXRlID0gZnVuY3Rpb24oY29sb3JFdmVudCkge1xuICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnYnVpbGQnLCB7ZGV0YWlsOiBjb2xvckV2ZW50fSk7XG4gIGNvbG9yRXZlbnQucHJldmlld0VsZW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG59XG5pbXBvcnQgdG9wYmFyIGZyb20gXCIuLi92ZW5kb3IvdG9wYmFyXCJcblxubGV0IGNzcmZUb2tlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtZXRhW25hbWU9J2NzcmYtdG9rZW4nXVwiKS5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpXG5sZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7aG9va3M6IEhvb2tzLCBwYXJhbXM6IHtfY3NyZl90b2tlbjogY3NyZlRva2VufX0pXG5cbi8vIFNob3cgcHJvZ3Jlc3MgYmFyIG9uIGxpdmUgbmF2aWdhdGlvbiBhbmQgZm9ybSBzdWJtaXRzXG50b3BiYXIuY29uZmlnKHtiYXJDb2xvcnM6IHswOiBcIiMyOWRcIn0sIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwgMCwgMCwgLjMpXCJ9KVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIGluZm8gPT4gdG9wYmFyLnNob3coKSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGh4OnBhZ2UtbG9hZGluZy1zdG9wXCIsIGluZm8gPT4gdG9wYmFyLmhpZGUoKSlcblxuLy8gY29ubmVjdCBpZiB0aGVyZSBhcmUgYW55IExpdmVWaWV3cyBvbiB0aGUgcGFnZVxubGl2ZVNvY2tldC5jb25uZWN0KClcblxuLy8gZXhwb3NlIGxpdmVTb2NrZXQgb24gd2luZG93IGZvciB3ZWIgY29uc29sZSBkZWJ1ZyBsb2dzIGFuZCBsYXRlbmN5IHNpbXVsYXRpb246XG4vLyA+PiBsaXZlU29ja2V0LmVuYWJsZURlYnVnKClcbi8vID4+IGxpdmVTb2NrZXQuZW5hYmxlTGF0ZW5jeVNpbSgxMDAwKSAgLy8gZW5hYmxlZCBmb3IgZHVyYXRpb24gb2YgYnJvd3NlciBzZXNzaW9uXG4vLyA+PiBsaXZlU29ja2V0LmRpc2FibGVMYXRlbmN5U2ltKClcbndpbmRvdy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuXG4iLCAiLyoqXHJcbiAqIGpzY29sb3IgLSBKYXZhU2NyaXB0IENvbG9yIFBpY2tlclxyXG4gKlxyXG4gKiBAbGluayAgICBodHRwOi8vanNjb2xvci5jb21cclxuICogQGxpY2Vuc2UgRm9yIG9wZW4gc291cmNlIHVzZTogR1BMdjNcclxuICogICAgICAgICAgRm9yIGNvbW1lcmNpYWwgdXNlOiBKU0NvbG9yIENvbW1lcmNpYWwgTGljZW5zZVxyXG4gKiBAYXV0aG9yICBKYW4gT2R2YXJrbyAtIEVhc3QgRGVzaXJlXHJcbiAqIEB2ZXJzaW9uIDIuMy4zXHJcbiAqXHJcbiAqIFNlZSB1c2FnZSBleGFtcGxlcyBhdCBodHRwOi8vanNjb2xvci5jb20vZXhhbXBsZXMvXHJcbiAqL1xyXG5cclxuXHJcblwidXNlIHN0cmljdFwiO1xyXG5cclxuXHJcbmlmICghd2luZG93LmpzY29sb3IpIHtcclxuXHJcbndpbmRvdy5qc2NvbG9yID0gKGZ1bmN0aW9uICgpIHsgLy8gQkVHSU4gd2luZG93LmpzY29sb3JcclxuXHJcbnZhciBqc2MgPSB7XHJcblxyXG5cclxuXHRpbml0aWFsaXplZCA6IGZhbHNlLFxyXG5cclxuXHRpbnN0YW5jZXMgOiBbXSwgLy8gY3JlYXRlZCBpbnN0YW5jZXMgb2YganNjb2xvclxyXG5cclxuXHR0cmlnZ2VyUXVldWUgOiBbXSwgLy8gZXZlbnRzIHdhaXRpbmcgdG8gYmUgdHJpZ2dlcmVkIGFmdGVyIGluaXRcclxuXHJcblxyXG5cdHJlZ2lzdGVyIDogZnVuY3Rpb24gKCkge1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGpzYy5pbml0LCBmYWxzZSk7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBqc2Mub25Eb2N1bWVudE1vdXNlRG93biwgZmFsc2UpO1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBqc2Mub25Eb2N1bWVudEtleVVwLCBmYWxzZSk7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywganNjLm9uV2luZG93UmVzaXplLCBmYWxzZSk7XHJcblx0fSxcclxuXHJcblxyXG5cdGluaXQgOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoanNjLmluaXRpYWxpemVkKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRqc2MucHViLmluc3RhbGwoKTtcclxuXHRcdGpzYy5pbml0aWFsaXplZCA9IHRydWU7XHJcblxyXG5cdFx0Ly8gdHJpZ2dlciBldmVudHMgd2FpdGluZyBpbiB0aGUgcXVldWVcclxuXHRcdHdoaWxlIChqc2MudHJpZ2dlclF1ZXVlLmxlbmd0aCkge1xyXG5cdFx0XHR2YXIgZXYgPSBqc2MudHJpZ2dlclF1ZXVlLnNoaWZ0KCk7XHJcblx0XHRcdGpzYy50cmlnZ2VyR2xvYmFsKGV2KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0aW5zdGFsbEJ5U2VsZWN0b3IgOiBmdW5jdGlvbiAoc2VsZWN0b3IsIHJvb3ROb2RlKSB7XHJcblx0XHRyb290Tm9kZSA9IHJvb3ROb2RlID8ganNjLm5vZGUocm9vdE5vZGUpIDogZG9jdW1lbnQ7XHJcblx0XHRpZiAoIXJvb3ROb2RlKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignTWlzc2luZyByb290IG5vZGUnKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZWxtcyA9IHJvb3ROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG5cclxuXHRcdC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggREVQUkVDQVRFRCBpbnN0YWxsYXRpb24vY29uZmlndXJhdGlvbiB1c2luZyBjbGFzc05hbWVcclxuXHRcdHZhciBtYXRjaENsYXNzID0gbmV3IFJlZ0V4cCgnKF58XFxcXHMpKCcgKyBqc2MucHViLmxvb2t1cENsYXNzICsgJykoXFxcXHMqKFxcXFx7W159XSpcXFxcfSl8XFxcXHN8JCknLCAnaScpO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZWxtcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cclxuXHRcdFx0aWYgKGVsbXNbaV0uanNjb2xvciAmJiBlbG1zW2ldLmpzY29sb3IgaW5zdGFuY2VvZiBqc2MucHViKSB7XHJcblx0XHRcdFx0Y29udGludWU7IC8vIGpzY29sb3IgYWxyZWFkeSBpbnN0YWxsZWQgb24gdGhpcyBlbGVtZW50XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlbG1zW2ldLnR5cGUgIT09IHVuZGVmaW5lZCAmJiBlbG1zW2ldLnR5cGUudG9Mb3dlckNhc2UoKSA9PSAnY29sb3InICYmIGpzYy5pc0NvbG9yQXR0clN1cHBvcnRlZCkge1xyXG5cdFx0XHRcdGNvbnRpbnVlOyAvLyBza2lwcyBpbnB1dHMgb2YgdHlwZSAnY29sb3InIGlmIHN1cHBvcnRlZCBieSB0aGUgYnJvd3NlclxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgZGF0YU9wdHMsIG07XHJcblxyXG5cdFx0XHRpZiAoXHJcblx0XHRcdFx0KGRhdGFPcHRzID0ganNjLmdldERhdGFBdHRyKGVsbXNbaV0sICdqc2NvbG9yJykpICE9PSBudWxsIHx8XHJcblx0XHRcdFx0KGVsbXNbaV0uY2xhc3NOYW1lICYmIChtID0gZWxtc1tpXS5jbGFzc05hbWUubWF0Y2gobWF0Y2hDbGFzcykpKSAvLyBpbnN0YWxsYXRpb24gdXNpbmcgY2xhc3NOYW1lIChERVBSRUNBVEVEKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHR2YXIgdGFyZ2V0RWxtID0gZWxtc1tpXTtcclxuXHJcblx0XHRcdFx0dmFyIG9wdHNTdHIgPSAnJztcclxuXHRcdFx0XHRpZiAoZGF0YU9wdHMgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdG9wdHNTdHIgPSBkYXRhT3B0cztcclxuXHJcblx0XHRcdFx0fSBlbHNlIGlmIChtKSB7IC8vIGluc3RhbGxhdGlvbiB1c2luZyBjbGFzc05hbWUgKERFUFJFQ0FURUQpXHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ0luc3RhbGxhdGlvbiB1c2luZyBjbGFzcyBuYW1lIGlzIERFUFJFQ0FURUQuIFVzZSBkYXRhLWpzY29sb3I9XCJcIiBhdHRyaWJ1dGUgaW5zdGVhZC4nICsganNjLmRvY3NSZWYpO1xyXG5cdFx0XHRcdFx0aWYgKG1bNF0pIHtcclxuXHRcdFx0XHRcdFx0b3B0c1N0ciA9IG1bNF07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR2YXIgb3B0cyA9IG51bGw7XHJcblx0XHRcdFx0aWYgKG9wdHNTdHIudHJpbSgpKSB7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRvcHRzID0ganNjLnBhcnNlT3B0aW9uc1N0cihvcHRzU3RyKTtcclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGUgKyAnXFxuJyArIG9wdHNTdHIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdG5ldyBqc2MucHViKHRhcmdldEVsbSwgb3B0cyk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRwYXJzZU9wdGlvbnNTdHIgOiBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHR2YXIgb3B0cyA9IG51bGw7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0b3B0cyA9IEpTT04ucGFyc2Uoc3RyKTtcclxuXHJcblx0XHR9IGNhdGNoIChlUGFyc2UpIHtcclxuXHRcdFx0aWYgKCFqc2MucHViLmxvb3NlSlNPTikge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IHBhcnNlIGpzY29sb3Igb3B0aW9ucyBhcyBKU09OOiAnICsgZVBhcnNlKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBsb29zZSBKU09OIHN5bnRheCBpcyBlbmFibGVkIC0+IHRyeSB0byBldmFsdWF0ZSB0aGUgb3B0aW9ucyBzdHJpbmcgYXMgSmF2YVNjcmlwdCBvYmplY3RcclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0b3B0cyA9IChuZXcgRnVuY3Rpb24gKCd2YXIgb3B0cyA9ICgnICsgc3RyICsgJyk7IHJldHVybiB0eXBlb2Ygb3B0cyA9PT0gXCJvYmplY3RcIiA/IG9wdHMgOiB7fTsnKSkoKTtcclxuXHRcdFx0XHR9IGNhdGNoIChlRXZhbCkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZXZhbHVhdGUganNjb2xvciBvcHRpb25zOiAnICsgZUV2YWwpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG9wdHM7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldEluc3RhbmNlcyA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBpbnN0ID0gW107XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGpzYy5pbnN0YW5jZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuXHRcdFx0Ly8gaWYgdGhlIHRhcmdldEVsZW1lbnQgc3RpbGwgZXhpc3RzLCB0aGUgaW5zdGFuY2UgaXMgY29uc2lkZXJlZCBcImFsaXZlXCJcclxuXHRcdFx0aWYgKGpzYy5pbnN0YW5jZXNbaV0gJiYganNjLmluc3RhbmNlc1tpXS50YXJnZXRFbGVtZW50KSB7XHJcblx0XHRcdFx0aW5zdC5wdXNoKGpzYy5pbnN0YW5jZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gaW5zdDtcclxuXHR9LFxyXG5cclxuXHJcblx0Y3JlYXRlRWwgOiBmdW5jdGlvbiAodGFnTmFtZSkge1xyXG5cdFx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lKTtcclxuXHRcdGpzYy5zZXREYXRhKGVsLCAnZ3VpJywgdHJ1ZSlcclxuXHRcdHJldHVybiBlbDtcclxuXHR9LFxyXG5cclxuXHJcblx0bm9kZSA6IGZ1bmN0aW9uIChub2RlT3JTZWxlY3Rvcikge1xyXG5cdFx0aWYgKCFub2RlT3JTZWxlY3Rvcikge1xyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodHlwZW9mIG5vZGVPclNlbGVjdG9yID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHQvLyBxdWVyeSBzZWxlY3RvclxyXG5cdFx0XHR2YXIgc2VsID0gbm9kZU9yU2VsZWN0b3I7XHJcblx0XHRcdHZhciBlbCA9IG51bGw7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0ZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbCk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oZSk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFlbCkge1xyXG5cdFx0XHRcdGNvbnNvbGUud2FybignTm8gZWxlbWVudCBtYXRjaGVzIHRoZSBzZWxlY3RvcjogJXMnLCBzZWwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBlbDtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoanNjLmlzTm9kZShub2RlT3JTZWxlY3RvcikpIHtcclxuXHRcdFx0Ly8gRE9NIG5vZGVcclxuXHRcdFx0cmV0dXJuIG5vZGVPclNlbGVjdG9yO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUud2FybignSW52YWxpZCBub2RlIG9mIHR5cGUgJXM6ICVzJywgdHlwZW9mIG5vZGVPclNlbGVjdG9yLCBub2RlT3JTZWxlY3Rvcik7XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM4NDI4Ni9cclxuXHRpc05vZGUgOiBmdW5jdGlvbiAodmFsKSB7XHJcblx0XHRpZiAodHlwZW9mIE5vZGUgPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdHJldHVybiB2YWwgaW5zdGFuY2VvZiBOb2RlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHZhbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsLm5vZGVUeXBlID09PSAnbnVtYmVyJyAmJiB0eXBlb2YgdmFsLm5vZGVOYW1lID09PSAnc3RyaW5nJztcclxuXHR9LFxyXG5cclxuXHJcblx0bm9kZU5hbWUgOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0aWYgKG5vZGUgJiYgbm9kZS5ub2RlTmFtZSkge1xyXG5cdFx0XHRyZXR1cm4gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0sXHJcblxyXG5cclxuXHRyZW1vdmVDaGlsZHJlbiA6IGZ1bmN0aW9uIChub2RlKSB7XHJcblx0XHR3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XHJcblx0XHRcdG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0aXNUZXh0SW5wdXQgOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdHJldHVybiBlbCAmJiBqc2Mubm9kZU5hbWUoZWwpID09PSAnaW5wdXQnICYmIGVsLnR5cGUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHQnO1xyXG5cdH0sXHJcblxyXG5cclxuXHRpc0J1dHRvbiA6IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0aWYgKCFlbCkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblx0XHR2YXIgbiA9IGpzYy5ub2RlTmFtZShlbCk7XHJcblx0XHRyZXR1cm4gKFxyXG5cdFx0XHQobiA9PT0gJ2J1dHRvbicpIHx8XHJcblx0XHRcdChuID09PSAnaW5wdXQnICYmIFsnYnV0dG9uJywgJ3N1Ym1pdCcsICdyZXNldCddLmluZGV4T2YoZWwudHlwZS50b0xvd2VyQ2FzZSgpKSA+IC0xKVxyXG5cdFx0KTtcclxuXHR9LFxyXG5cclxuXHJcblx0aXNCdXR0b25FbXB0eSA6IGZ1bmN0aW9uIChlbCkge1xyXG5cdFx0c3dpdGNoIChqc2Mubm9kZU5hbWUoZWwpKSB7XHJcblx0XHRcdGNhc2UgJ2lucHV0JzogcmV0dXJuICghZWwudmFsdWUgfHwgZWwudmFsdWUudHJpbSgpID09PSAnJyk7XHJcblx0XHRcdGNhc2UgJ2J1dHRvbic6IHJldHVybiAoZWwudGV4dENvbnRlbnQudHJpbSgpID09PSAnJyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDsgLy8gY291bGQgbm90IGRldGVybWluZSBlbGVtZW50J3MgdGV4dFxyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL1dJQ0cvRXZlbnRMaXN0ZW5lck9wdGlvbnMvYmxvYi9naC1wYWdlcy9leHBsYWluZXIubWRcclxuXHRpc1Bhc3NpdmVFdmVudFN1cHBvcnRlZCA6IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgc3VwcG9ydGVkID0gZmFsc2U7XHJcblxyXG5cdFx0dHJ5IHtcclxuXHRcdFx0dmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xyXG5cdFx0XHRcdGdldDogZnVuY3Rpb24gKCkgeyBzdXBwb3J0ZWQgPSB0cnVlOyB9XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmUnLCBudWxsLCBvcHRzKTtcclxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cyk7XHJcblx0XHR9IGNhdGNoIChlKSB7fVxyXG5cclxuXHRcdHJldHVybiBzdXBwb3J0ZWQ7XHJcblx0fSkoKSxcclxuXHJcblxyXG5cdGlzQ29sb3JBdHRyU3VwcG9ydGVkIDogKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBlbG0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG5cdFx0aWYgKGVsbS5zZXRBdHRyaWJ1dGUpIHtcclxuXHRcdFx0ZWxtLnNldEF0dHJpYnV0ZSgndHlwZScsICdjb2xvcicpO1xyXG5cdFx0XHRpZiAoZWxtLnR5cGUudG9Mb3dlckNhc2UoKSA9PSAnY29sb3InKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KSgpLFxyXG5cclxuXHJcblx0ZGF0YVByb3AgOiAnX2RhdGFfanNjb2xvcicsXHJcblxyXG5cclxuXHQvLyB1c2FnZTpcclxuXHQvLyAgIHNldERhdGEob2JqLCBwcm9wLCB2YWx1ZSlcclxuXHQvLyAgIHNldERhdGEob2JqLCB7cHJvcDp2YWx1ZSwgLi4ufSlcclxuXHQvL1xyXG5cdHNldERhdGEgOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgb2JqID0gYXJndW1lbnRzWzBdO1xyXG5cclxuXHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XHJcblx0XHRcdC8vIHNldHRpbmcgYSBzaW5nbGUgcHJvcGVydHlcclxuXHRcdFx0dmFyIGRhdGEgPSBvYmouaGFzT3duUHJvcGVydHkoanNjLmRhdGFQcm9wKSA/IG9ialtqc2MuZGF0YVByb3BdIDogKG9ialtqc2MuZGF0YVByb3BdID0ge30pO1xyXG5cdFx0XHR2YXIgcHJvcCA9IGFyZ3VtZW50c1sxXTtcclxuXHRcdFx0dmFyIHZhbHVlID0gYXJndW1lbnRzWzJdO1xyXG5cclxuXHRcdFx0ZGF0YVtwcm9wXSA9IHZhbHVlO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHR9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gJ29iamVjdCcpIHtcclxuXHRcdFx0Ly8gc2V0dGluZyBtdWx0aXBsZSBwcm9wZXJ0aWVzXHJcblx0XHRcdHZhciBkYXRhID0gb2JqLmhhc093blByb3BlcnR5KGpzYy5kYXRhUHJvcCkgPyBvYmpbanNjLmRhdGFQcm9wXSA6IChvYmpbanNjLmRhdGFQcm9wXSA9IHt9KTtcclxuXHRcdFx0dmFyIG1hcCA9IGFyZ3VtZW50c1sxXTtcclxuXHJcblx0XHRcdGZvciAodmFyIHByb3AgaW4gbWFwKSB7XHJcblx0XHRcdFx0aWYgKG1hcC5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG5cdFx0XHRcdFx0ZGF0YVtwcm9wXSA9IG1hcFtwcm9wXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9XHJcblxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyB1c2FnZTpcclxuXHQvLyAgIHJlbW92ZURhdGEob2JqLCBwcm9wLCBbcHJvcC4uLl0pXHJcblx0Ly9cclxuXHRyZW1vdmVEYXRhIDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG9iaiA9IGFyZ3VtZW50c1swXTtcclxuXHRcdGlmICghb2JqLmhhc093blByb3BlcnR5KGpzYy5kYXRhUHJvcCkpIHtcclxuXHRcdFx0cmV0dXJuIHRydWU7IC8vIGRhdGEgb2JqZWN0IGRvZXMgbm90IGV4aXN0XHJcblx0XHR9XHJcblx0XHRmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHR2YXIgcHJvcCA9IGFyZ3VtZW50c1tpXTtcclxuXHRcdFx0ZGVsZXRlIG9ialtqc2MuZGF0YVByb3BdW3Byb3BdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldERhdGEgOiBmdW5jdGlvbiAob2JqLCBwcm9wLCBzZXREZWZhdWx0KSB7XHJcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShqc2MuZGF0YVByb3ApKSB7XHJcblx0XHRcdC8vIGRhdGEgb2JqZWN0IGRvZXMgbm90IGV4aXN0XHJcblx0XHRcdGlmIChzZXREZWZhdWx0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHRvYmpbanNjLmRhdGFQcm9wXSA9IHt9OyAvLyBjcmVhdGUgZGF0YSBvYmplY3RcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gdW5kZWZpbmVkOyAvLyBubyB2YWx1ZSB0byByZXR1cm5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dmFyIGRhdGEgPSBvYmpbanNjLmRhdGFQcm9wXTtcclxuXHJcblx0XHRpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgc2V0RGVmYXVsdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGRhdGFbcHJvcF0gPSBzZXREZWZhdWx0O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGRhdGFbcHJvcF07XHJcblx0fSxcclxuXHJcblxyXG5cdGdldERhdGFBdHRyIDogZnVuY3Rpb24gKGVsLCBuYW1lKSB7XHJcblx0XHR2YXIgYXR0ck5hbWUgPSAnZGF0YS0nICsgbmFtZTtcclxuXHRcdHZhciBhdHRyVmFsdWUgPSBlbC5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xyXG5cdFx0cmV0dXJuIGF0dHJWYWx1ZTtcclxuXHR9LFxyXG5cclxuXHJcblx0X2F0dGFjaGVkR3JvdXBFdmVudHMgOiB7fSxcclxuXHJcblxyXG5cdGF0dGFjaEdyb3VwRXZlbnQgOiBmdW5jdGlvbiAoZ3JvdXBOYW1lLCBlbCwgZXZudCwgZnVuYykge1xyXG5cdFx0aWYgKCFqc2MuX2F0dGFjaGVkR3JvdXBFdmVudHMuaGFzT3duUHJvcGVydHkoZ3JvdXBOYW1lKSkge1xyXG5cdFx0XHRqc2MuX2F0dGFjaGVkR3JvdXBFdmVudHNbZ3JvdXBOYW1lXSA9IFtdO1xyXG5cdFx0fVxyXG5cdFx0anNjLl9hdHRhY2hlZEdyb3VwRXZlbnRzW2dyb3VwTmFtZV0ucHVzaChbZWwsIGV2bnQsIGZ1bmNdKTtcclxuXHRcdGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZudCwgZnVuYywgZmFsc2UpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRkZXRhY2hHcm91cEV2ZW50cyA6IGZ1bmN0aW9uIChncm91cE5hbWUpIHtcclxuXHRcdGlmIChqc2MuX2F0dGFjaGVkR3JvdXBFdmVudHMuaGFzT3duUHJvcGVydHkoZ3JvdXBOYW1lKSkge1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGpzYy5fYXR0YWNoZWRHcm91cEV2ZW50c1tncm91cE5hbWVdLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0dmFyIGV2dCA9IGpzYy5fYXR0YWNoZWRHcm91cEV2ZW50c1tncm91cE5hbWVdW2ldO1xyXG5cdFx0XHRcdGV2dFswXS5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFsxXSwgZXZ0WzJdLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZGVsZXRlIGpzYy5fYXR0YWNoZWRHcm91cEV2ZW50c1tncm91cE5hbWVdO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRwcmV2ZW50RGVmYXVsdCA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZiAoZS5wcmV2ZW50RGVmYXVsdCkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH1cclxuXHRcdGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHJcblx0Y2FwdHVyZVRhcmdldCA6IGZ1bmN0aW9uICh0YXJnZXQpIHtcclxuXHRcdC8vIElFXHJcblx0XHRpZiAodGFyZ2V0LnNldENhcHR1cmUpIHtcclxuXHRcdFx0anNjLl9jYXB0dXJlZFRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0anNjLl9jYXB0dXJlZFRhcmdldC5zZXRDYXB0dXJlKCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdHJlbGVhc2VUYXJnZXQgOiBmdW5jdGlvbiAoKSB7XHJcblx0XHQvLyBJRVxyXG5cdFx0aWYgKGpzYy5fY2FwdHVyZWRUYXJnZXQpIHtcclxuXHRcdFx0anNjLl9jYXB0dXJlZFRhcmdldC5yZWxlYXNlQ2FwdHVyZSgpO1xyXG5cdFx0XHRqc2MuX2NhcHR1cmVkVGFyZ2V0ID0gbnVsbDtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0dHJpZ2dlckV2ZW50IDogZnVuY3Rpb24gKGVsLCBldmVudE5hbWUsIGJ1YmJsZXMsIGNhbmNlbGFibGUpIHtcclxuXHRcdGlmICghZWwpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBldiA9IG51bGw7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xyXG5cdFx0XHRldiA9IG5ldyBFdmVudChldmVudE5hbWUsIHtcclxuXHRcdFx0XHRidWJibGVzOiBidWJibGVzLFxyXG5cdFx0XHRcdGNhbmNlbGFibGU6IGNhbmNlbGFibGVcclxuXHRcdFx0fSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBJRVxyXG5cdFx0XHRldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xyXG5cdFx0XHRldi5pbml0RXZlbnQoZXZlbnROYW1lLCBidWJibGVzLCBjYW5jZWxhYmxlKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIWV2KSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBzbyB0aGF0IHdlIGtub3cgdGhhdCB0aGUgZXZlbnQgd2FzIHRyaWdnZXJlZCBpbnRlcm5hbGx5XHJcblx0XHRqc2Muc2V0RGF0YShldiwgJ2ludGVybmFsJywgdHJ1ZSk7XHJcblxyXG5cdFx0ZWwuZGlzcGF0Y2hFdmVudChldik7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHJcblx0dHJpZ2dlcklucHV0RXZlbnQgOiBmdW5jdGlvbiAoZWwsIGV2ZW50TmFtZSwgYnViYmxlcywgY2FuY2VsYWJsZSkge1xyXG5cdFx0aWYgKCFlbCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZiAoanNjLmlzVGV4dElucHV0KGVsKSkge1xyXG5cdFx0XHRqc2MudHJpZ2dlckV2ZW50KGVsLCBldmVudE5hbWUsIGJ1YmJsZXMsIGNhbmNlbGFibGUpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRldmVudEtleSA6IGZ1bmN0aW9uIChldikge1xyXG5cdFx0dmFyIGtleXMgPSB7XHJcblx0XHRcdDk6ICdUYWInLFxyXG5cdFx0XHQxMzogJ0VudGVyJyxcclxuXHRcdFx0Mjc6ICdFc2NhcGUnLFxyXG5cdFx0fTtcclxuXHRcdGlmICh0eXBlb2YgZXYuY29kZSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0cmV0dXJuIGV2LmNvZGU7XHJcblx0XHR9IGVsc2UgaWYgKGV2LmtleUNvZGUgIT09IHVuZGVmaW5lZCAmJiBrZXlzLmhhc093blByb3BlcnR5KGV2LmtleUNvZGUpKSB7XHJcblx0XHRcdHJldHVybiBrZXlzW2V2LmtleUNvZGVdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fSxcclxuXHJcblxyXG5cdHN0ckxpc3QgOiBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHRpZiAoIXN0cikge1xyXG5cdFx0XHRyZXR1cm4gW107XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKS5zcGxpdCgvXFxzKy8pO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBUaGUgY2xhc3NOYW1lIHBhcmFtZXRlciAoc3RyKSBjYW4gb25seSBjb250YWluIGEgc2luZ2xlIGNsYXNzIG5hbWVcclxuXHRoYXNDbGFzcyA6IGZ1bmN0aW9uIChlbG0sIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKCFjbGFzc05hbWUpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGVsbS5jbGFzc0xpc3QgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRyZXR1cm4gZWxtLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gcG9seWZpbGxcclxuXHRcdHJldHVybiAtMSAhPSAoJyAnICsgZWxtLmNsYXNzTmFtZS5yZXBsYWNlKC9cXHMrL2csICcgJykgKyAnICcpLmluZGV4T2YoJyAnICsgY2xhc3NOYW1lICsgJyAnKTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gVGhlIGNsYXNzTmFtZSBwYXJhbWV0ZXIgKHN0cikgY2FuIGNvbnRhaW4gbXVsdGlwbGUgY2xhc3MgbmFtZXMgc2VwYXJhdGVkIGJ5IHdoaXRlc3BhY2VcclxuXHRhZGRDbGFzcyA6IGZ1bmN0aW9uIChlbG0sIGNsYXNzTmFtZSkge1xyXG5cdFx0dmFyIGNsYXNzTmFtZXMgPSBqc2Muc3RyTGlzdChjbGFzc05hbWUpO1xyXG5cclxuXHRcdGlmIChlbG0uY2xhc3NMaXN0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc05hbWVzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0ZWxtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8gcG9seWZpbGxcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NOYW1lcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRpZiAoIWpzYy5oYXNDbGFzcyhlbG0sIGNsYXNzTmFtZXNbaV0pKSB7XHJcblx0XHRcdFx0ZWxtLmNsYXNzTmFtZSArPSAoZWxtLmNsYXNzTmFtZSA/ICcgJyA6ICcnKSArIGNsYXNzTmFtZXNbaV07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gVGhlIGNsYXNzTmFtZSBwYXJhbWV0ZXIgKHN0cikgY2FuIGNvbnRhaW4gbXVsdGlwbGUgY2xhc3MgbmFtZXMgc2VwYXJhdGVkIGJ5IHdoaXRlc3BhY2VcclxuXHRyZW1vdmVDbGFzcyA6IGZ1bmN0aW9uIChlbG0sIGNsYXNzTmFtZSkge1xyXG5cdFx0dmFyIGNsYXNzTmFtZXMgPSBqc2Muc3RyTGlzdChjbGFzc05hbWUpO1xyXG5cclxuXHRcdGlmIChlbG0uY2xhc3NMaXN0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc05hbWVzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0ZWxtLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lc1tpXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Ly8gcG9seWZpbGxcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NOYW1lcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHR2YXIgcmVwbCA9IG5ldyBSZWdFeHAoXHJcblx0XHRcdFx0J15cXFxccyonICsgY2xhc3NOYW1lc1tpXSArICdcXFxccyp8JyArXHJcblx0XHRcdFx0J1xcXFxzKicgKyBjbGFzc05hbWVzW2ldICsgJ1xcXFxzKiR8JyArXHJcblx0XHRcdFx0J1xcXFxzKycgKyBjbGFzc05hbWVzW2ldICsgJyhcXFxccyspJyxcclxuXHRcdFx0XHQnZydcclxuXHRcdFx0KTtcclxuXHRcdFx0ZWxtLmNsYXNzTmFtZSA9IGVsbS5jbGFzc05hbWUucmVwbGFjZShyZXBsLCAnJDEnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0Z2V0Q29tcFN0eWxlIDogZnVuY3Rpb24gKGVsbSkge1xyXG5cdFx0dmFyIGNvbXBTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlID8gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxtKSA6IGVsbS5jdXJyZW50U3R5bGU7XHJcblxyXG5cdFx0Ly8gTm90ZTogSW4gRmlyZWZveCwgZ2V0Q29tcHV0ZWRTdHlsZSByZXR1cm5zIG51bGwgaW4gYSBoaWRkZW4gaWZyYW1lLFxyXG5cdFx0Ly8gdGhhdCdzIHdoeSB3ZSBuZWVkIHRvIGNoZWNrIGlmIHRoZSByZXR1cm5lZCB2YWx1ZSBpcyBub24tZW1wdHlcclxuXHRcdGlmICghY29tcFN0eWxlKSB7XHJcblx0XHRcdHJldHVybiB7fTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBjb21wU3R5bGU7XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIE5vdGU6XHJcblx0Ly8gICBTZXR0aW5nIGEgcHJvcGVydHkgdG8gTlVMTCByZXZlcnRzIGl0IHRvIHRoZSBzdGF0ZSBiZWZvcmUgaXQgd2FzIGZpcnN0IHNldFxyXG5cdC8vICAgd2l0aCB0aGUgJ3JldmVyc2libGUnIGZsYWcgZW5hYmxlZFxyXG5cdC8vXHJcblx0c2V0U3R5bGUgOiBmdW5jdGlvbiAoZWxtLCBzdHlsZXMsIGltcG9ydGFudCwgcmV2ZXJzaWJsZSkge1xyXG5cdFx0Ly8gdXNpbmcgJycgZm9yIHN0YW5kYXJkIHByaW9yaXR5IChJRTEwIGFwcGFyZW50bHkgZG9lc24ndCBsaWtlIHZhbHVlIHVuZGVmaW5lZClcclxuXHRcdHZhciBwcmlvcml0eSA9IGltcG9ydGFudCA/ICdpbXBvcnRhbnQnIDogJyc7XHJcblx0XHR2YXIgb3JpZ1N0eWxlID0gbnVsbDtcclxuXHJcblx0XHRmb3IgKHZhciBwcm9wIGluIHN0eWxlcykge1xyXG5cdFx0XHRpZiAoc3R5bGVzLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcblx0XHRcdFx0dmFyIHNldFZhbCA9IG51bGw7XHJcblxyXG5cdFx0XHRcdGlmIChzdHlsZXNbcHJvcF0gPT09IG51bGwpIHtcclxuXHRcdFx0XHRcdC8vIHJldmVydGluZyBhIHByb3BlcnR5IHZhbHVlXHJcblxyXG5cdFx0XHRcdFx0aWYgKCFvcmlnU3R5bGUpIHtcclxuXHRcdFx0XHRcdFx0Ly8gZ2V0IHRoZSBvcmlnaW5hbCBzdHlsZSBvYmplY3QsIGJ1dCBkb250J3QgdHJ5IHRvIGNyZWF0ZSBpdCBpZiBpdCBkb2Vzbid0IGV4aXN0XHJcblx0XHRcdFx0XHRcdG9yaWdTdHlsZSA9IGpzYy5nZXREYXRhKGVsbSwgJ29yaWdTdHlsZScpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKG9yaWdTdHlsZSAmJiBvcmlnU3R5bGUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuXHRcdFx0XHRcdFx0Ly8gd2UgaGF2ZSBwcm9wZXJ0eSdzIG9yaWdpbmFsIHZhbHVlIC0+IHVzZSBpdFxyXG5cdFx0XHRcdFx0XHRzZXRWYWwgPSBvcmlnU3R5bGVbcHJvcF07XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBzZXR0aW5nIGEgcHJvcGVydHkgdmFsdWVcclxuXHJcblx0XHRcdFx0XHRpZiAocmV2ZXJzaWJsZSkge1xyXG5cdFx0XHRcdFx0XHRpZiAoIW9yaWdTdHlsZSkge1xyXG5cdFx0XHRcdFx0XHRcdC8vIGdldCB0aGUgb3JpZ2luYWwgc3R5bGUgb2JqZWN0IGFuZCBpZiBpdCBkb2Vzbid0IGV4aXN0LCBjcmVhdGUgaXRcclxuXHRcdFx0XHRcdFx0XHRvcmlnU3R5bGUgPSBqc2MuZ2V0RGF0YShlbG0sICdvcmlnU3R5bGUnLCB7fSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0aWYgKCFvcmlnU3R5bGUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBvcmlnaW5hbCBwcm9wZXJ0eSB2YWx1ZSBub3QgeWV0IHN0b3JlZCAtPiBzdG9yZSBpdFxyXG5cdFx0XHRcdFx0XHRcdG9yaWdTdHlsZVtwcm9wXSA9IGVsbS5zdHlsZVtwcm9wXTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0c2V0VmFsID0gc3R5bGVzW3Byb3BdO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKHNldFZhbCAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdFx0ZWxtLnN0eWxlLnNldFByb3BlcnR5KHByb3AsIHNldFZhbCwgcHJpb3JpdHkpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRsaW5lYXJHcmFkaWVudCA6IChmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0RnVuY05hbWUgKCkge1xyXG5cdFx0XHR2YXIgc3RkTmFtZSA9ICdsaW5lYXItZ3JhZGllbnQnO1xyXG5cdFx0XHR2YXIgcHJlZml4ZXMgPSBbJycsICctd2Via2l0LScsICctbW96LScsICctby0nLCAnLW1zLSddO1xyXG5cdFx0XHR2YXIgaGVscGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0dmFyIHRyeUZ1bmMgPSBwcmVmaXhlc1tpXSArIHN0ZE5hbWU7XHJcblx0XHRcdFx0dmFyIHRyeVZhbCA9IHRyeUZ1bmMgKyAnKHRvIHJpZ2h0LCByZ2JhKDAsMCwwLDApLCByZ2JhKDAsMCwwLDApKSc7XHJcblxyXG5cdFx0XHRcdGhlbHBlci5zdHlsZS5iYWNrZ3JvdW5kID0gdHJ5VmFsO1xyXG5cdFx0XHRcdGlmIChoZWxwZXIuc3R5bGUuYmFja2dyb3VuZCkgeyAvLyBDU1MgYmFja2dyb3VuZCBzdWNjZXNzZnVsbHkgc2V0IC0+IGZ1bmN0aW9uIG5hbWUgaXMgc3VwcG9ydGVkXHJcblx0XHRcdFx0XHRyZXR1cm4gdHJ5RnVuYztcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0ZE5hbWU7IC8vIGZhbGxiYWNrIHRvIHN0YW5kYXJkICdsaW5lYXItZ3JhZGllbnQnIHdpdGhvdXQgdmVuZG9yIHByZWZpeFxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBmdW5jTmFtZSA9IGdldEZ1bmNOYW1lKCk7XHJcblxyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGZ1bmNOYW1lICsgJygnICsgQXJyYXkucHJvdG90eXBlLmpvaW4uY2FsbChhcmd1bWVudHMsICcsICcpICsgJyknO1xyXG5cdFx0fTtcclxuXHJcblx0fSkoKSxcclxuXHJcblxyXG5cdHNldEJvcmRlclJhZGl1cyA6IGZ1bmN0aW9uIChlbG0sIHZhbHVlKSB7XHJcblx0XHRqc2Muc2V0U3R5bGUoZWxtLCB7J2JvcmRlci1yYWRpdXMnIDogdmFsdWUgfHwgJzAnfSk7XHJcblx0fSxcclxuXHJcblxyXG5cdHNldEJveFNoYWRvdyA6IGZ1bmN0aW9uIChlbG0sIHZhbHVlKSB7XHJcblx0XHRqc2Muc2V0U3R5bGUoZWxtLCB7J2JveC1zaGFkb3cnOiB2YWx1ZSB8fCAnbm9uZSd9KTtcclxuXHR9LFxyXG5cclxuXHJcblx0Z2V0RWxlbWVudFBvcyA6IGZ1bmN0aW9uIChlLCByZWxhdGl2ZVRvVmlld3BvcnQpIHtcclxuXHRcdHZhciB4PTAsIHk9MDtcclxuXHRcdHZhciByZWN0ID0gZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdHggPSByZWN0LmxlZnQ7XHJcblx0XHR5ID0gcmVjdC50b3A7XHJcblx0XHRpZiAoIXJlbGF0aXZlVG9WaWV3cG9ydCkge1xyXG5cdFx0XHR2YXIgdmlld1BvcyA9IGpzYy5nZXRWaWV3UG9zKCk7XHJcblx0XHRcdHggKz0gdmlld1Bvc1swXTtcclxuXHRcdFx0eSArPSB2aWV3UG9zWzFdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFt4LCB5XTtcclxuXHR9LFxyXG5cclxuXHJcblx0Z2V0RWxlbWVudFNpemUgOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0cmV0dXJuIFtlLm9mZnNldFdpZHRoLCBlLm9mZnNldEhlaWdodF07XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIGdldCBwb2ludGVyJ3MgWC9ZIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHZpZXdwb3J0XHJcblx0Z2V0QWJzUG9pbnRlclBvcyA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgeCA9IDAsIHkgPSAwO1xyXG5cdFx0aWYgKHR5cGVvZiBlLmNoYW5nZWRUb3VjaGVzICE9PSAndW5kZWZpbmVkJyAmJiBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCkge1xyXG5cdFx0XHQvLyB0b3VjaCBkZXZpY2VzXHJcblx0XHRcdHggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcblx0XHRcdHkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBlLmNsaWVudFggPT09ICdudW1iZXInKSB7XHJcblx0XHRcdHggPSBlLmNsaWVudFg7XHJcblx0XHRcdHkgPSBlLmNsaWVudFk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4geyB4OiB4LCB5OiB5IH07XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIGdldCBwb2ludGVyJ3MgWC9ZIGNvb3JkaW5hdGVzIHJlbGF0aXZlIHRvIHRhcmdldCBlbGVtZW50XHJcblx0Z2V0UmVsUG9pbnRlclBvcyA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG5cdFx0dmFyIHRhcmdldFJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG5cdFx0dmFyIHggPSAwLCB5ID0gMDtcclxuXHJcblx0XHR2YXIgY2xpZW50WCA9IDAsIGNsaWVudFkgPSAwO1xyXG5cdFx0aWYgKHR5cGVvZiBlLmNoYW5nZWRUb3VjaGVzICE9PSAndW5kZWZpbmVkJyAmJiBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCkge1xyXG5cdFx0XHQvLyB0b3VjaCBkZXZpY2VzXHJcblx0XHRcdGNsaWVudFggPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFg7XHJcblx0XHRcdGNsaWVudFkgPSBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFk7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBlLmNsaWVudFggPT09ICdudW1iZXInKSB7XHJcblx0XHRcdGNsaWVudFggPSBlLmNsaWVudFg7XHJcblx0XHRcdGNsaWVudFkgPSBlLmNsaWVudFk7XHJcblx0XHR9XHJcblxyXG5cdFx0eCA9IGNsaWVudFggLSB0YXJnZXRSZWN0LmxlZnQ7XHJcblx0XHR5ID0gY2xpZW50WSAtIHRhcmdldFJlY3QudG9wO1xyXG5cdFx0cmV0dXJuIHsgeDogeCwgeTogeSB9O1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRWaWV3UG9zIDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCh3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jLnNjcm9sbExlZnQpIC0gKGRvYy5jbGllbnRMZWZ0IHx8IDApLFxyXG5cdFx0XHQod2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvYy5zY3JvbGxUb3ApIC0gKGRvYy5jbGllbnRUb3AgfHwgMClcclxuXHRcdF07XHJcblx0fSxcclxuXHJcblxyXG5cdGdldFZpZXdTaXplIDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdCh3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2MuY2xpZW50V2lkdGgpLFxyXG5cdFx0XHQod2luZG93LmlubmVySGVpZ2h0IHx8IGRvYy5jbGllbnRIZWlnaHQpLFxyXG5cdFx0XTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gcjogMC0yNTVcclxuXHQvLyBnOiAwLTI1NVxyXG5cdC8vIGI6IDAtMjU1XHJcblx0Ly9cclxuXHQvLyByZXR1cm5zOiBbIDAtMzYwLCAwLTEwMCwgMC0xMDAgXVxyXG5cdC8vXHJcblx0UkdCX0hTViA6IGZ1bmN0aW9uIChyLCBnLCBiKSB7XHJcblx0XHRyIC89IDI1NTtcclxuXHRcdGcgLz0gMjU1O1xyXG5cdFx0YiAvPSAyNTU7XHJcblx0XHR2YXIgbiA9IE1hdGgubWluKE1hdGgubWluKHIsZyksYik7XHJcblx0XHR2YXIgdiA9IE1hdGgubWF4KE1hdGgubWF4KHIsZyksYik7XHJcblx0XHR2YXIgbSA9IHYgLSBuO1xyXG5cdFx0aWYgKG0gPT09IDApIHsgcmV0dXJuIFsgbnVsbCwgMCwgMTAwICogdiBdOyB9XHJcblx0XHR2YXIgaCA9IHI9PT1uID8gMysoYi1nKS9tIDogKGc9PT1uID8gNSsoci1iKS9tIDogMSsoZy1yKS9tKTtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdDYwICogKGg9PT02PzA6aCksXHJcblx0XHRcdDEwMCAqIChtL3YpLFxyXG5cdFx0XHQxMDAgKiB2XHJcblx0XHRdO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBoOiAwLTM2MFxyXG5cdC8vIHM6IDAtMTAwXHJcblx0Ly8gdjogMC0xMDBcclxuXHQvL1xyXG5cdC8vIHJldHVybnM6IFsgMC0yNTUsIDAtMjU1LCAwLTI1NSBdXHJcblx0Ly9cclxuXHRIU1ZfUkdCIDogZnVuY3Rpb24gKGgsIHMsIHYpIHtcclxuXHRcdHZhciB1ID0gMjU1ICogKHYgLyAxMDApO1xyXG5cclxuXHRcdGlmIChoID09PSBudWxsKSB7XHJcblx0XHRcdHJldHVybiBbIHUsIHUsIHUgXTtcclxuXHRcdH1cclxuXHJcblx0XHRoIC89IDYwO1xyXG5cdFx0cyAvPSAxMDA7XHJcblxyXG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGgpO1xyXG5cdFx0dmFyIGYgPSBpJTIgPyBoLWkgOiAxLShoLWkpO1xyXG5cdFx0dmFyIG0gPSB1ICogKDEgLSBzKTtcclxuXHRcdHZhciBuID0gdSAqICgxIC0gcyAqIGYpO1xyXG5cdFx0c3dpdGNoIChpKSB7XHJcblx0XHRcdGNhc2UgNjpcclxuXHRcdFx0Y2FzZSAwOiByZXR1cm4gW3UsbixtXTtcclxuXHRcdFx0Y2FzZSAxOiByZXR1cm4gW24sdSxtXTtcclxuXHRcdFx0Y2FzZSAyOiByZXR1cm4gW20sdSxuXTtcclxuXHRcdFx0Y2FzZSAzOiByZXR1cm4gW20sbix1XTtcclxuXHRcdFx0Y2FzZSA0OiByZXR1cm4gW24sbSx1XTtcclxuXHRcdFx0Y2FzZSA1OiByZXR1cm4gW3UsbSxuXTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0cGFyc2VDb2xvclN0cmluZyA6IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdHZhciByZXQgPSB7XHJcblx0XHRcdHJnYmE6IG51bGwsXHJcblx0XHRcdGZvcm1hdDogbnVsbCAvLyAnaGV4JyB8ICdyZ2InIHwgJ3JnYmEnXHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBtO1xyXG5cdFx0aWYgKG0gPSBzdHIubWF0Y2goL15cXFcqKFswLTlBLUZdezN9KFswLTlBLUZdezN9KT8pXFxXKiQvaSkpIHtcclxuXHRcdFx0Ly8gSEVYIG5vdGF0aW9uXHJcblxyXG5cdFx0XHRyZXQuZm9ybWF0ID0gJ2hleCc7XHJcblxyXG5cdFx0XHRpZiAobVsxXS5sZW5ndGggPT09IDYpIHtcclxuXHRcdFx0XHQvLyA2LWNoYXIgbm90YXRpb25cclxuXHRcdFx0XHRyZXQucmdiYSA9IFtcclxuXHRcdFx0XHRcdHBhcnNlSW50KG1bMV0uc3Vic3RyKDAsMiksMTYpLFxyXG5cdFx0XHRcdFx0cGFyc2VJbnQobVsxXS5zdWJzdHIoMiwyKSwxNiksXHJcblx0XHRcdFx0XHRwYXJzZUludChtWzFdLnN1YnN0cig0LDIpLDE2KSxcclxuXHRcdFx0XHRcdG51bGxcclxuXHRcdFx0XHRdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIDMtY2hhciBub3RhdGlvblxyXG5cdFx0XHRcdHJldC5yZ2JhID0gW1xyXG5cdFx0XHRcdFx0cGFyc2VJbnQobVsxXS5jaGFyQXQoMCkgKyBtWzFdLmNoYXJBdCgwKSwxNiksXHJcblx0XHRcdFx0XHRwYXJzZUludChtWzFdLmNoYXJBdCgxKSArIG1bMV0uY2hhckF0KDEpLDE2KSxcclxuXHRcdFx0XHRcdHBhcnNlSW50KG1bMV0uY2hhckF0KDIpICsgbVsxXS5jaGFyQXQoMiksMTYpLFxyXG5cdFx0XHRcdFx0bnVsbFxyXG5cdFx0XHRcdF07XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHJldDtcclxuXHJcblx0XHR9IGVsc2UgaWYgKG0gPSBzdHIubWF0Y2goL15cXFcqcmdiYT9cXCgoW14pXSopXFwpXFxXKiQvaSkpIHtcclxuXHRcdFx0Ly8gcmdiKC4uLikgb3IgcmdiYSguLi4pIG5vdGF0aW9uXHJcblxyXG5cdFx0XHR2YXIgcGFyYW1zID0gbVsxXS5zcGxpdCgnLCcpO1xyXG5cdFx0XHR2YXIgcmUgPSAvXlxccyooXFxkK3xcXGQqXFwuXFxkK3xcXGQrXFwuXFxkKilcXHMqJC87XHJcblx0XHRcdHZhciBtUiwgbUcsIG1CLCBtQTtcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdHBhcmFtcy5sZW5ndGggPj0gMyAmJlxyXG5cdFx0XHRcdChtUiA9IHBhcmFtc1swXS5tYXRjaChyZSkpICYmXHJcblx0XHRcdFx0KG1HID0gcGFyYW1zWzFdLm1hdGNoKHJlKSkgJiZcclxuXHRcdFx0XHQobUIgPSBwYXJhbXNbMl0ubWF0Y2gocmUpKVxyXG5cdFx0XHQpIHtcclxuXHRcdFx0XHRyZXQuZm9ybWF0ID0gJ3JnYic7XHJcblx0XHRcdFx0cmV0LnJnYmEgPSBbXHJcblx0XHRcdFx0XHRwYXJzZUZsb2F0KG1SWzFdKSB8fCAwLFxyXG5cdFx0XHRcdFx0cGFyc2VGbG9hdChtR1sxXSkgfHwgMCxcclxuXHRcdFx0XHRcdHBhcnNlRmxvYXQobUJbMV0pIHx8IDAsXHJcblx0XHRcdFx0XHRudWxsXHJcblx0XHRcdFx0XTtcclxuXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0cGFyYW1zLmxlbmd0aCA+PSA0ICYmXHJcblx0XHRcdFx0XHQobUEgPSBwYXJhbXNbM10ubWF0Y2gocmUpKVxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0cmV0LmZvcm1hdCA9ICdyZ2JhJztcclxuXHRcdFx0XHRcdHJldC5yZ2JhWzNdID0gcGFyc2VGbG9hdChtQVsxXSkgfHwgMDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHJldDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gQ2FudmFzIHNjYWxpbmcgZm9yIHJldGluYSBkaXNwbGF5c1xyXG5cdC8vXHJcblx0Ly8gYWRhcHRlZCBmcm9tIGh0dHBzOi8vd3d3Lmh0bWw1cm9ja3MuY29tL2VuL3R1dG9yaWFscy9jYW52YXMvaGlkcGkvXHJcblx0Ly9cclxuXHRzY2FsZUNhbnZhc0ZvckhpZ2hEUFIgOiBmdW5jdGlvbiAoY2FudmFzKSB7XHJcblx0XHR2YXIgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuXHRcdGNhbnZhcy53aWR0aCAqPSBkcHI7XHJcblx0XHRjYW52YXMuaGVpZ2h0ICo9IGRwcjtcclxuXHRcdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHRcdGN0eC5zY2FsZShkcHIsIGRwcik7XHJcblx0fSxcclxuXHJcblxyXG5cdGdlbkNvbG9yUHJldmlld0NhbnZhcyA6IGZ1bmN0aW9uIChjb2xvciwgc2VwYXJhdG9yUG9zLCBzcGVjV2lkdGgsIHNjYWxlRm9ySGlnaERQUikge1xyXG5cclxuXHRcdHZhciBzZXBXID0gTWF0aC5yb3VuZChqc2MucHViLnByZXZpZXdTZXBhcmF0b3IubGVuZ3RoKTtcclxuXHRcdHZhciBzcVNpemUgPSBqc2MucHViLmNoZXNzYm9hcmRTaXplO1xyXG5cdFx0dmFyIHNxQ29sb3IxID0ganNjLnB1Yi5jaGVzc2JvYXJkQ29sb3IxO1xyXG5cdFx0dmFyIHNxQ29sb3IyID0ganNjLnB1Yi5jaGVzc2JvYXJkQ29sb3IyO1xyXG5cclxuXHRcdHZhciBjV2lkdGggPSBzcGVjV2lkdGggPyBzcGVjV2lkdGggOiBzcVNpemUgKiAyO1xyXG5cdFx0dmFyIGNIZWlnaHQgPSBzcVNpemUgKiAyO1xyXG5cclxuXHRcdHZhciBjYW52YXMgPSBqc2MuY3JlYXRlRWwoJ2NhbnZhcycpO1xyXG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRcdGNhbnZhcy53aWR0aCA9IGNXaWR0aDtcclxuXHRcdGNhbnZhcy5oZWlnaHQgPSBjSGVpZ2h0O1xyXG5cdFx0aWYgKHNjYWxlRm9ySGlnaERQUikge1xyXG5cdFx0XHRqc2Muc2NhbGVDYW52YXNGb3JIaWdoRFBSKGNhbnZhcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gdHJhbnNwYXJlbmN5IGNoZXNzYm9hcmQgLSBiYWNrZ3JvdW5kXHJcblx0XHRjdHguZmlsbFN0eWxlID0gc3FDb2xvcjE7XHJcblx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY1dpZHRoLCBjSGVpZ2h0KTtcclxuXHJcblx0XHQvLyB0cmFuc3BhcmVuY3kgY2hlc3Nib2FyZCAtIHNxdWFyZXNcclxuXHRcdGN0eC5maWxsU3R5bGUgPSBzcUNvbG9yMjtcclxuXHRcdGZvciAodmFyIHggPSAwOyB4IDwgY1dpZHRoOyB4ICs9IHNxU2l6ZSAqIDIpIHtcclxuXHRcdFx0Y3R4LmZpbGxSZWN0KHgsIDAsIHNxU2l6ZSwgc3FTaXplKTtcclxuXHRcdFx0Y3R4LmZpbGxSZWN0KHggKyBzcVNpemUsIHNxU2l6ZSwgc3FTaXplLCBzcVNpemUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjb2xvcikge1xyXG5cdFx0XHQvLyBhY3R1YWwgY29sb3IgaW4gZm9yZWdyb3VuZFxyXG5cdFx0XHRjdHguZmlsbFN0eWxlID0gY29sb3I7XHJcblx0XHRcdGN0eC5maWxsUmVjdCgwLCAwLCBjV2lkdGgsIGNIZWlnaHQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBzdGFydCA9IG51bGw7XHJcblx0XHRzd2l0Y2ggKHNlcGFyYXRvclBvcykge1xyXG5cdFx0XHRjYXNlICdsZWZ0JzpcclxuXHRcdFx0XHRzdGFydCA9IDA7XHJcblx0XHRcdFx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBzZXBXLzIsIGNIZWlnaHQpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICdyaWdodCc6XHJcblx0XHRcdFx0c3RhcnQgPSBjV2lkdGggLSBzZXBXO1xyXG5cdFx0XHRcdGN0eC5jbGVhclJlY3QoY1dpZHRoIC0gKHNlcFcvMiksIDAsIHNlcFcvMiwgY0hlaWdodCk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHRpZiAoc3RhcnQgIT09IG51bGwpIHtcclxuXHRcdFx0Y3R4LmxpbmVXaWR0aCA9IDE7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwganNjLnB1Yi5wcmV2aWV3U2VwYXJhdG9yLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0Y3R4LmJlZ2luUGF0aCgpO1xyXG5cdFx0XHRcdGN0eC5zdHJva2VTdHlsZSA9IGpzYy5wdWIucHJldmlld1NlcGFyYXRvcltpXTtcclxuXHRcdFx0XHRjdHgubW92ZVRvKDAuNSArIHN0YXJ0ICsgaSwgMCk7XHJcblx0XHRcdFx0Y3R4LmxpbmVUbygwLjUgKyBzdGFydCArIGksIGNIZWlnaHQpO1xyXG5cdFx0XHRcdGN0eC5zdHJva2UoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGNhbnZhczogY2FudmFzLFxyXG5cdFx0XHR3aWR0aDogY1dpZHRoLFxyXG5cdFx0XHRoZWlnaHQ6IGNIZWlnaHQsXHJcblx0XHR9O1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBpZiBwb3NpdGlvbiBvciB3aWR0aCBpcyBub3Qgc2V0ID0+IGZpbGwgdGhlIGVudGlyZSBlbGVtZW50ICgwJS0xMDAlKVxyXG5cdGdlbkNvbG9yUHJldmlld0dyYWRpZW50IDogZnVuY3Rpb24gKGNvbG9yLCBwb3NpdGlvbiwgd2lkdGgpIHtcclxuXHRcdHZhciBwYXJhbXMgPSBbXTtcclxuXHJcblx0XHRpZiAocG9zaXRpb24gJiYgd2lkdGgpIHtcclxuXHRcdFx0cGFyYW1zID0gW1xyXG5cdFx0XHRcdCd0byAnICsgeydsZWZ0JzoncmlnaHQnLCAncmlnaHQnOidsZWZ0J31bcG9zaXRpb25dLFxyXG5cdFx0XHRcdGNvbG9yICsgJyAwJScsXHJcblx0XHRcdFx0Y29sb3IgKyAnICcgKyB3aWR0aCArICdweCcsXHJcblx0XHRcdFx0J3JnYmEoMCwwLDAsMCkgJyArICh3aWR0aCArIDEpICsgJ3B4JyxcclxuXHRcdFx0XHQncmdiYSgwLDAsMCwwKSAxMDAlJyxcclxuXHRcdFx0XTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHBhcmFtcyA9IFtcclxuXHRcdFx0XHQndG8gcmlnaHQnLFxyXG5cdFx0XHRcdGNvbG9yICsgJyAwJScsXHJcblx0XHRcdFx0Y29sb3IgKyAnIDEwMCUnLFxyXG5cdFx0XHRdO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBqc2MubGluZWFyR3JhZGllbnQuYXBwbHkodGhpcywgcGFyYW1zKTtcclxuXHR9LFxyXG5cclxuXHJcblx0cmVkcmF3UG9zaXRpb24gOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0aWYgKGpzYy5waWNrZXIgJiYganNjLnBpY2tlci5vd25lcikge1xyXG5cdFx0XHR2YXIgdGhpc09iaiA9IGpzYy5waWNrZXIub3duZXI7XHJcblxyXG5cdFx0XHR2YXIgdHAsIHZwO1xyXG5cclxuXHRcdFx0aWYgKHRoaXNPYmouZml4ZWQpIHtcclxuXHRcdFx0XHQvLyBGaXhlZCBlbGVtZW50cyBhcmUgcG9zaXRpb25lZCByZWxhdGl2ZSB0byB2aWV3cG9ydCxcclxuXHRcdFx0XHQvLyB0aGVyZWZvcmUgd2UgY2FuIGlnbm9yZSB0aGUgc2Nyb2xsIG9mZnNldFxyXG5cdFx0XHRcdHRwID0ganNjLmdldEVsZW1lbnRQb3ModGhpc09iai50YXJnZXRFbGVtZW50LCB0cnVlKTsgLy8gdGFyZ2V0IHBvc1xyXG5cdFx0XHRcdHZwID0gWzAsIDBdOyAvLyB2aWV3IHBvc1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRwID0ganNjLmdldEVsZW1lbnRQb3ModGhpc09iai50YXJnZXRFbGVtZW50KTsgLy8gdGFyZ2V0IHBvc1xyXG5cdFx0XHRcdHZwID0ganNjLmdldFZpZXdQb3MoKTsgLy8gdmlldyBwb3NcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHRzID0ganNjLmdldEVsZW1lbnRTaXplKHRoaXNPYmoudGFyZ2V0RWxlbWVudCk7IC8vIHRhcmdldCBzaXplXHJcblx0XHRcdHZhciB2cyA9IGpzYy5nZXRWaWV3U2l6ZSgpOyAvLyB2aWV3IHNpemVcclxuXHRcdFx0dmFyIHBzID0ganNjLmdldFBpY2tlck91dGVyRGltcyh0aGlzT2JqKTsgLy8gcGlja2VyIHNpemVcclxuXHRcdFx0dmFyIGEsIGIsIGM7XHJcblx0XHRcdHN3aXRjaCAodGhpc09iai5wb3NpdGlvbi50b0xvd2VyQ2FzZSgpKSB7XHJcblx0XHRcdFx0Y2FzZSAnbGVmdCc6IGE9MTsgYj0wOyBjPS0xOyBicmVhaztcclxuXHRcdFx0XHRjYXNlICdyaWdodCc6YT0xOyBiPTA7IGM9MTsgYnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAndG9wJzogIGE9MDsgYj0xOyBjPS0xOyBicmVhaztcclxuXHRcdFx0XHRkZWZhdWx0OiAgICAgYT0wOyBiPTE7IGM9MTsgYnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0dmFyIGwgPSAodHNbYl0rcHNbYl0pLzI7XHJcblxyXG5cdFx0XHQvLyBjb21wdXRlIHBpY2tlciBwb3NpdGlvblxyXG5cdFx0XHRpZiAoIXRoaXNPYmouc21hcnRQb3NpdGlvbikge1xyXG5cdFx0XHRcdHZhciBwcCA9IFtcclxuXHRcdFx0XHRcdHRwW2FdLFxyXG5cdFx0XHRcdFx0dHBbYl0rdHNbYl0tbCtsKmNcclxuXHRcdFx0XHRdO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHZhciBwcCA9IFtcclxuXHRcdFx0XHRcdC12cFthXSt0cFthXStwc1thXSA+IHZzW2FdID9cclxuXHRcdFx0XHRcdFx0KC12cFthXSt0cFthXSt0c1thXS8yID4gdnNbYV0vMiAmJiB0cFthXSt0c1thXS1wc1thXSA+PSAwID8gdHBbYV0rdHNbYV0tcHNbYV0gOiB0cFthXSkgOlxyXG5cdFx0XHRcdFx0XHR0cFthXSxcclxuXHRcdFx0XHRcdC12cFtiXSt0cFtiXSt0c1tiXStwc1tiXS1sK2wqYyA+IHZzW2JdID9cclxuXHRcdFx0XHRcdFx0KC12cFtiXSt0cFtiXSt0c1tiXS8yID4gdnNbYl0vMiAmJiB0cFtiXSt0c1tiXS1sLWwqYyA+PSAwID8gdHBbYl0rdHNbYl0tbC1sKmMgOiB0cFtiXSt0c1tiXS1sK2wqYykgOlxyXG5cdFx0XHRcdFx0XHQodHBbYl0rdHNbYl0tbCtsKmMgPj0gMCA/IHRwW2JdK3RzW2JdLWwrbCpjIDogdHBbYl0rdHNbYl0tbC1sKmMpXHJcblx0XHRcdFx0XTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHggPSBwcFthXTtcclxuXHRcdFx0dmFyIHkgPSBwcFtiXTtcclxuXHRcdFx0dmFyIHBvc2l0aW9uVmFsdWUgPSB0aGlzT2JqLmZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHZhciBjb250cmFjdFNoYWRvdyA9XHJcblx0XHRcdFx0KHBwWzBdICsgcHNbMF0gPiB0cFswXSB8fCBwcFswXSA8IHRwWzBdICsgdHNbMF0pICYmXHJcblx0XHRcdFx0KHBwWzFdICsgcHNbMV0gPCB0cFsxXSArIHRzWzFdKTtcclxuXHJcblx0XHRcdGpzYy5fZHJhd1Bvc2l0aW9uKHRoaXNPYmosIHgsIHksIHBvc2l0aW9uVmFsdWUsIGNvbnRyYWN0U2hhZG93KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0X2RyYXdQb3NpdGlvbiA6IGZ1bmN0aW9uICh0aGlzT2JqLCB4LCB5LCBwb3NpdGlvblZhbHVlLCBjb250cmFjdFNoYWRvdykge1xyXG5cdFx0dmFyIHZTaGFkb3cgPSBjb250cmFjdFNoYWRvdyA/IDAgOiB0aGlzT2JqLnNoYWRvd0JsdXI7IC8vIHB4XHJcblxyXG5cdFx0anNjLnBpY2tlci53cmFwLnN0eWxlLnBvc2l0aW9uID0gcG9zaXRpb25WYWx1ZTtcclxuXHRcdGpzYy5waWNrZXIud3JhcC5zdHlsZS5sZWZ0ID0geCArICdweCc7XHJcblx0XHRqc2MucGlja2VyLndyYXAuc3R5bGUudG9wID0geSArICdweCc7XHJcblxyXG5cdFx0anNjLnNldEJveFNoYWRvdyhcclxuXHRcdFx0anNjLnBpY2tlci5ib3hTLFxyXG5cdFx0XHR0aGlzT2JqLnNoYWRvdyA/XHJcblx0XHRcdFx0bmV3IGpzYy5Cb3hTaGFkb3coMCwgdlNoYWRvdywgdGhpc09iai5zaGFkb3dCbHVyLCAwLCB0aGlzT2JqLnNoYWRvd0NvbG9yKSA6XHJcblx0XHRcdFx0bnVsbCk7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldFBpY2tlckRpbXMgOiBmdW5jdGlvbiAodGhpc09iaikge1xyXG5cdFx0dmFyIGRpbXMgPSBbXHJcblx0XHRcdDIgKiB0aGlzT2JqLmNvbnRyb2xCb3JkZXJXaWR0aCArIDIgKiB0aGlzT2JqLnBhZGRpbmcgKyB0aGlzT2JqLndpZHRoLFxyXG5cdFx0XHQyICogdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGggKyAyICogdGhpc09iai5wYWRkaW5nICsgdGhpc09iai5oZWlnaHRcclxuXHRcdF07XHJcblx0XHR2YXIgc2xpZGVyU3BhY2UgPSAyICogdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGggKyAyICoganNjLmdldENvbnRyb2xQYWRkaW5nKHRoaXNPYmopICsgdGhpc09iai5zbGlkZXJTaXplO1xyXG5cdFx0aWYgKGpzYy5nZXRTbGlkZXJDaGFubmVsKHRoaXNPYmopKSB7XHJcblx0XHRcdGRpbXNbMF0gKz0gc2xpZGVyU3BhY2U7XHJcblx0XHR9XHJcblx0XHRpZiAodGhpc09iai5oYXNBbHBoYUNoYW5uZWwoKSkge1xyXG5cdFx0XHRkaW1zWzBdICs9IHNsaWRlclNwYWNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXNPYmouY2xvc2VCdXR0b24pIHtcclxuXHRcdFx0ZGltc1sxXSArPSAyICogdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGggKyB0aGlzT2JqLnBhZGRpbmcgKyB0aGlzT2JqLmJ1dHRvbkhlaWdodDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBkaW1zO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRQaWNrZXJPdXRlckRpbXMgOiBmdW5jdGlvbiAodGhpc09iaikge1xyXG5cdFx0dmFyIGRpbXMgPSBqc2MuZ2V0UGlja2VyRGltcyh0aGlzT2JqKTtcclxuXHRcdHJldHVybiBbXHJcblx0XHRcdGRpbXNbMF0gKyAyICogdGhpc09iai5ib3JkZXJXaWR0aCxcclxuXHRcdFx0ZGltc1sxXSArIDIgKiB0aGlzT2JqLmJvcmRlcldpZHRoXHJcblx0XHRdO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRDb250cm9sUGFkZGluZyA6IGZ1bmN0aW9uICh0aGlzT2JqKSB7XHJcblx0XHRyZXR1cm4gTWF0aC5tYXgoXHJcblx0XHRcdHRoaXNPYmoucGFkZGluZyAvIDIsXHJcblx0XHRcdCgyICogdGhpc09iai5wb2ludGVyQm9yZGVyV2lkdGggKyB0aGlzT2JqLnBvaW50ZXJUaGlja25lc3MpIC0gdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGhcclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldFBhZFlDaGFubmVsIDogZnVuY3Rpb24gKHRoaXNPYmopIHtcclxuXHRcdHN3aXRjaCAodGhpc09iai5tb2RlLmNoYXJBdCgxKS50b0xvd2VyQ2FzZSgpKSB7XHJcblx0XHRcdGNhc2UgJ3YnOiByZXR1cm4gJ3YnOyBicmVhaztcclxuXHRcdH1cclxuXHRcdHJldHVybiAncyc7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldFNsaWRlckNoYW5uZWwgOiBmdW5jdGlvbiAodGhpc09iaikge1xyXG5cdFx0aWYgKHRoaXNPYmoubW9kZS5sZW5ndGggPiAyKSB7XHJcblx0XHRcdHN3aXRjaCAodGhpc09iai5tb2RlLmNoYXJBdCgyKS50b0xvd2VyQ2FzZSgpKSB7XHJcblx0XHRcdFx0Y2FzZSAncyc6IHJldHVybiAncyc7IGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3YnOiByZXR1cm4gJ3YnOyBicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fSxcclxuXHJcblxyXG5cdG9uRG9jdW1lbnRNb3VzZURvd24gOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuXHJcblx0XHRpZiAodGFyZ2V0LmpzY29sb3IgJiYgdGFyZ2V0LmpzY29sb3IgaW5zdGFuY2VvZiBqc2MucHViKSB7IC8vIGNsaWNrZWQgdGFyZ2V0RWxlbWVudCAtPiBzaG93IHBpY2tlclxyXG5cdFx0XHRpZiAodGFyZ2V0LmpzY29sb3Iuc2hvd09uQ2xpY2sgJiYgIXRhcmdldC5kaXNhYmxlZCkge1xyXG5cdFx0XHRcdHRhcmdldC5qc2NvbG9yLnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIGlmIChqc2MuZ2V0RGF0YSh0YXJnZXQsICdndWknKSkgeyAvLyBjbGlja2VkIGpzY29sb3IncyBHVUkgZWxlbWVudFxyXG5cdFx0XHR2YXIgY29udHJvbCA9IGpzYy5nZXREYXRhKHRhcmdldCwgJ2NvbnRyb2wnKTtcclxuXHRcdFx0aWYgKGNvbnRyb2wpIHtcclxuXHRcdFx0XHQvLyBqc2NvbG9yJ3MgY29udHJvbFxyXG5cdFx0XHRcdGpzYy5vbkNvbnRyb2xQb2ludGVyU3RhcnQoZSwgdGFyZ2V0LCBqc2MuZ2V0RGF0YSh0YXJnZXQsICdjb250cm9sJyksICdtb3VzZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBtb3VzZSBpcyBvdXRzaWRlIHRoZSBwaWNrZXIncyBjb250cm9scyAtPiBoaWRlIHRoZSBjb2xvciBwaWNrZXIhXHJcblx0XHRcdGlmIChqc2MucGlja2VyICYmIGpzYy5waWNrZXIub3duZXIpIHtcclxuXHRcdFx0XHRqc2MucGlja2VyLm93bmVyLnRyeUhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRvbkRvY3VtZW50S2V5VXAgOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKFsnVGFiJywgJ0VzY2FwZSddLmluZGV4T2YoanNjLmV2ZW50S2V5KGUpKSAhPT0gLTEpIHtcclxuXHRcdFx0aWYgKGpzYy5waWNrZXIgJiYganNjLnBpY2tlci5vd25lcikge1xyXG5cdFx0XHRcdGpzYy5waWNrZXIub3duZXIudHJ5SGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdG9uV2luZG93UmVzaXplIDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGpzYy5yZWRyYXdQb3NpdGlvbigpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRvblBhcmVudFNjcm9sbCA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvLyBoaWRlIHRoZSBwaWNrZXIgd2hlbiBvbmUgb2YgdGhlIHBhcmVudCBlbGVtZW50cyBpcyBzY3JvbGxlZFxyXG5cdFx0aWYgKGpzYy5waWNrZXIgJiYganNjLnBpY2tlci5vd25lcikge1xyXG5cdFx0XHRqc2MucGlja2VyLm93bmVyLnRyeUhpZGUoKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0b25QaWNrZXJUb3VjaFN0YXJ0IDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcblxyXG5cdFx0aWYgKGpzYy5nZXREYXRhKHRhcmdldCwgJ2NvbnRyb2wnKSkge1xyXG5cdFx0XHRqc2Mub25Db250cm9sUG9pbnRlclN0YXJ0KGUsIHRhcmdldCwganNjLmdldERhdGEodGFyZ2V0LCAnY29udHJvbCcpLCAndG91Y2gnKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gY2FsbHMgZnVuY3Rpb24gc3BlY2lmaWVkIGluIHBpY2tlcidzIHByb3BlcnR5XHJcblx0dHJpZ2dlckNhbGxiYWNrIDogZnVuY3Rpb24gKHRoaXNPYmosIHByb3ApIHtcclxuXHRcdGlmICghdGhpc09ialtwcm9wXSkge1xyXG5cdFx0XHRyZXR1cm47IC8vIGNhbGxiYWNrIGZ1bmMgbm90IHNwZWNpZmllZFxyXG5cdFx0fVxyXG5cdFx0dmFyIGNhbGxiYWNrID0gbnVsbDtcclxuXHJcblx0XHRpZiAodHlwZW9mIHRoaXNPYmpbcHJvcF0gPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdC8vIHN0cmluZyB3aXRoIGNvZGVcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRjYWxsYmFjayA9IG5ldyBGdW5jdGlvbiAodGhpc09ialtwcm9wXSk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGUpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHQvLyBmdW5jdGlvblxyXG5cdFx0XHRjYWxsYmFjayA9IHRoaXNPYmpbcHJvcF07XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNhbGxiYWNrKSB7XHJcblx0XHRcdGNhbGxiYWNrLmNhbGwodGhpc09iaik7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIFRyaWdnZXJzIGEgY29sb3IgY2hhbmdlIHJlbGF0ZWQgZXZlbnQocykgb24gYWxsIHBpY2tlciBpbnN0YW5jZXMuXHJcblx0Ly8gSXQgaXMgcG9zc2libGUgdG8gc3BlY2lmeSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIHdpdGggYSBzcGFjZS5cclxuXHR0cmlnZ2VyR2xvYmFsIDogZnVuY3Rpb24gKGV2ZW50TmFtZXMpIHtcclxuXHRcdHZhciBpbnN0ID0ganNjLmdldEluc3RhbmNlcygpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBpbnN0Lmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdGluc3RbaV0udHJpZ2dlcihldmVudE5hbWVzKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0X3BvaW50ZXJNb3ZlRXZlbnQgOiB7XHJcblx0XHRtb3VzZTogJ21vdXNlbW92ZScsXHJcblx0XHR0b3VjaDogJ3RvdWNobW92ZSdcclxuXHR9LFxyXG5cdF9wb2ludGVyRW5kRXZlbnQgOiB7XHJcblx0XHRtb3VzZTogJ21vdXNldXAnLFxyXG5cdFx0dG91Y2g6ICd0b3VjaGVuZCdcclxuXHR9LFxyXG5cclxuXHJcblx0X3BvaW50ZXJPcmlnaW4gOiBudWxsLFxyXG5cdF9jYXB0dXJlZFRhcmdldCA6IG51bGwsXHJcblxyXG5cclxuXHRvbkNvbnRyb2xQb2ludGVyU3RhcnQgOiBmdW5jdGlvbiAoZSwgdGFyZ2V0LCBjb250cm9sTmFtZSwgcG9pbnRlclR5cGUpIHtcclxuXHRcdHZhciB0aGlzT2JqID0ganNjLmdldERhdGEodGFyZ2V0LCAnaW5zdGFuY2UnKTtcclxuXHJcblx0XHRqc2MucHJldmVudERlZmF1bHQoZSk7XHJcblx0XHRqc2MuY2FwdHVyZVRhcmdldCh0YXJnZXQpO1xyXG5cclxuXHRcdHZhciByZWdpc3RlckRyYWdFdmVudHMgPSBmdW5jdGlvbiAoZG9jLCBvZmZzZXQpIHtcclxuXHRcdFx0anNjLmF0dGFjaEdyb3VwRXZlbnQoJ2RyYWcnLCBkb2MsIGpzYy5fcG9pbnRlck1vdmVFdmVudFtwb2ludGVyVHlwZV0sXHJcblx0XHRcdFx0anNjLm9uRG9jdW1lbnRQb2ludGVyTW92ZShlLCB0YXJnZXQsIGNvbnRyb2xOYW1lLCBwb2ludGVyVHlwZSwgb2Zmc2V0KSk7XHJcblx0XHRcdGpzYy5hdHRhY2hHcm91cEV2ZW50KCdkcmFnJywgZG9jLCBqc2MuX3BvaW50ZXJFbmRFdmVudFtwb2ludGVyVHlwZV0sXHJcblx0XHRcdFx0anNjLm9uRG9jdW1lbnRQb2ludGVyRW5kKGUsIHRhcmdldCwgY29udHJvbE5hbWUsIHBvaW50ZXJUeXBlKSk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHJlZ2lzdGVyRHJhZ0V2ZW50cyhkb2N1bWVudCwgWzAsIDBdKTtcclxuXHJcblx0XHRpZiAod2luZG93LnBhcmVudCAmJiB3aW5kb3cuZnJhbWVFbGVtZW50KSB7XHJcblx0XHRcdHZhciByZWN0ID0gd2luZG93LmZyYW1lRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHRcdFx0dmFyIG9mcyA9IFstcmVjdC5sZWZ0LCAtcmVjdC50b3BdO1xyXG5cdFx0XHRyZWdpc3RlckRyYWdFdmVudHMod2luZG93LnBhcmVudC53aW5kb3cuZG9jdW1lbnQsIG9mcyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGFicyA9IGpzYy5nZXRBYnNQb2ludGVyUG9zKGUpO1xyXG5cdFx0dmFyIHJlbCA9IGpzYy5nZXRSZWxQb2ludGVyUG9zKGUpO1xyXG5cdFx0anNjLl9wb2ludGVyT3JpZ2luID0ge1xyXG5cdFx0XHR4OiBhYnMueCAtIHJlbC54LFxyXG5cdFx0XHR5OiBhYnMueSAtIHJlbC55XHJcblx0XHR9O1xyXG5cclxuXHRcdHN3aXRjaCAoY29udHJvbE5hbWUpIHtcclxuXHRcdGNhc2UgJ3BhZCc6XHJcblx0XHRcdC8vIGlmIHRoZSB2YWx1ZSBzbGlkZXIgaXMgYXQgdGhlIGJvdHRvbSwgbW92ZSBpdCB1cFxyXG5cdFx0XHRpZiAoanNjLmdldFNsaWRlckNoYW5uZWwodGhpc09iaikgPT09ICd2JyAmJiB0aGlzT2JqLmNoYW5uZWxzLnYgPT09IDApIHtcclxuXHRcdFx0XHR0aGlzT2JqLmZyb21IU1ZBKG51bGwsIG51bGwsIDEwMCwgbnVsbCk7XHJcblx0XHRcdH1cclxuXHRcdFx0anNjLnNldFBhZCh0aGlzT2JqLCBlLCAwLCAwKTtcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0Y2FzZSAnc2xkJzpcclxuXHRcdFx0anNjLnNldFNsZCh0aGlzT2JqLCBlLCAwKTtcclxuXHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0Y2FzZSAnYXNsZCc6XHJcblx0XHRcdGpzYy5zZXRBU2xkKHRoaXNPYmosIGUsIDApO1xyXG5cdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHRcdHRoaXNPYmoudHJpZ2dlcignaW5wdXQnKTtcclxuXHR9LFxyXG5cclxuXHJcblx0b25Eb2N1bWVudFBvaW50ZXJNb3ZlIDogZnVuY3Rpb24gKGUsIHRhcmdldCwgY29udHJvbE5hbWUsIHBvaW50ZXJUeXBlLCBvZmZzZXQpIHtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHR2YXIgdGhpc09iaiA9IGpzYy5nZXREYXRhKHRhcmdldCwgJ2luc3RhbmNlJyk7XHJcblx0XHRcdHN3aXRjaCAoY29udHJvbE5hbWUpIHtcclxuXHRcdFx0Y2FzZSAncGFkJzpcclxuXHRcdFx0XHRqc2Muc2V0UGFkKHRoaXNPYmosIGUsIG9mZnNldFswXSwgb2Zmc2V0WzFdKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ3NsZCc6XHJcblx0XHRcdFx0anNjLnNldFNsZCh0aGlzT2JqLCBlLCBvZmZzZXRbMV0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAnYXNsZCc6XHJcblx0XHRcdFx0anNjLnNldEFTbGQodGhpc09iaiwgZSwgb2Zmc2V0WzFdKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzT2JqLnRyaWdnZXIoJ2lucHV0Jyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdG9uRG9jdW1lbnRQb2ludGVyRW5kIDogZnVuY3Rpb24gKGUsIHRhcmdldCwgY29udHJvbE5hbWUsIHBvaW50ZXJUeXBlKSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIHRoaXNPYmogPSBqc2MuZ2V0RGF0YSh0YXJnZXQsICdpbnN0YW5jZScpO1xyXG5cdFx0XHRqc2MuZGV0YWNoR3JvdXBFdmVudHMoJ2RyYWcnKTtcclxuXHRcdFx0anNjLnJlbGVhc2VUYXJnZXQoKTtcclxuXHJcblx0XHRcdC8vIEFsd2F5cyB0cmlnZ2VyIGNoYW5nZXMgQUZURVIgZGV0YWNoaW5nIG91dHN0YW5kaW5nIG1vdXNlIGhhbmRsZXJzLFxyXG5cdFx0XHQvLyBpbiBjYXNlIHNvbWUgY29sb3IgY2hhbmdlIG9jY3VyZWQgaW4gdXNlci1kZWZpbmVkIG9uQ2hhbmdlL29uSW5wdXQgaGFuZGxlclxyXG5cdFx0XHQvLyB3b3VsZCBpbnRydWRlIGludG8gY3VycmVudCBtb3VzZSBldmVudHNcclxuXHRcdFx0dGhpc09iai50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdFx0XHR0aGlzT2JqLnRyaWdnZXIoJ2NoYW5nZScpO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHJcblx0c2V0UGFkIDogZnVuY3Rpb24gKHRoaXNPYmosIGUsIG9mc1gsIG9mc1kpIHtcclxuXHRcdHZhciBwb2ludGVyQWJzID0ganNjLmdldEFic1BvaW50ZXJQb3MoZSk7XHJcblx0XHR2YXIgeCA9IG9mc1ggKyBwb2ludGVyQWJzLnggLSBqc2MuX3BvaW50ZXJPcmlnaW4ueCAtIHRoaXNPYmoucGFkZGluZyAtIHRoaXNPYmouY29udHJvbEJvcmRlcldpZHRoO1xyXG5cdFx0dmFyIHkgPSBvZnNZICsgcG9pbnRlckFicy55IC0ganNjLl9wb2ludGVyT3JpZ2luLnkgLSB0aGlzT2JqLnBhZGRpbmcgLSB0aGlzT2JqLmNvbnRyb2xCb3JkZXJXaWR0aDtcclxuXHJcblx0XHR2YXIgeFZhbCA9IHggKiAoMzYwIC8gKHRoaXNPYmoud2lkdGggLSAxKSk7XHJcblx0XHR2YXIgeVZhbCA9IDEwMCAtICh5ICogKDEwMCAvICh0aGlzT2JqLmhlaWdodCAtIDEpKSk7XHJcblxyXG5cdFx0c3dpdGNoIChqc2MuZ2V0UGFkWUNoYW5uZWwodGhpc09iaikpIHtcclxuXHRcdGNhc2UgJ3MnOiB0aGlzT2JqLmZyb21IU1ZBKHhWYWwsIHlWYWwsIG51bGwsIG51bGwpOyBicmVhaztcclxuXHRcdGNhc2UgJ3YnOiB0aGlzT2JqLmZyb21IU1ZBKHhWYWwsIG51bGwsIHlWYWwsIG51bGwpOyBicmVhaztcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0c2V0U2xkIDogZnVuY3Rpb24gKHRoaXNPYmosIGUsIG9mc1kpIHtcclxuXHRcdHZhciBwb2ludGVyQWJzID0ganNjLmdldEFic1BvaW50ZXJQb3MoZSk7XHJcblx0XHR2YXIgeSA9IG9mc1kgKyBwb2ludGVyQWJzLnkgLSBqc2MuX3BvaW50ZXJPcmlnaW4ueSAtIHRoaXNPYmoucGFkZGluZyAtIHRoaXNPYmouY29udHJvbEJvcmRlcldpZHRoO1xyXG5cdFx0dmFyIHlWYWwgPSAxMDAgLSAoeSAqICgxMDAgLyAodGhpc09iai5oZWlnaHQgLSAxKSkpO1xyXG5cclxuXHRcdHN3aXRjaCAoanNjLmdldFNsaWRlckNoYW5uZWwodGhpc09iaikpIHtcclxuXHRcdGNhc2UgJ3MnOiB0aGlzT2JqLmZyb21IU1ZBKG51bGwsIHlWYWwsIG51bGwsIG51bGwpOyBicmVhaztcclxuXHRcdGNhc2UgJ3YnOiB0aGlzT2JqLmZyb21IU1ZBKG51bGwsIG51bGwsIHlWYWwsIG51bGwpOyBicmVhaztcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0c2V0QVNsZCA6IGZ1bmN0aW9uICh0aGlzT2JqLCBlLCBvZnNZKSB7XHJcblx0XHR2YXIgcG9pbnRlckFicyA9IGpzYy5nZXRBYnNQb2ludGVyUG9zKGUpO1xyXG5cdFx0dmFyIHkgPSBvZnNZICsgcG9pbnRlckFicy55IC0ganNjLl9wb2ludGVyT3JpZ2luLnkgLSB0aGlzT2JqLnBhZGRpbmcgLSB0aGlzT2JqLmNvbnRyb2xCb3JkZXJXaWR0aDtcclxuXHRcdHZhciB5VmFsID0gMS4wIC0gKHkgKiAoMS4wIC8gKHRoaXNPYmouaGVpZ2h0IC0gMSkpKTtcclxuXHJcblx0XHRpZiAoeVZhbCA8IDEuMCkge1xyXG5cdFx0XHQvLyBpZiBmb3JtYXQgaXMgZmxleGlibGUgYW5kIHRoZSBjdXJyZW50IGZvcm1hdCBkb2Vzbid0IHN1cHBvcnQgYWxwaGEsIHN3aXRjaCB0byBhIHN1aXRhYmxlIG9uZVxyXG5cdFx0XHRpZiAodGhpc09iai5mb3JtYXQudG9Mb3dlckNhc2UoKSA9PT0gJ2FueScgJiYgdGhpc09iai5nZXRGb3JtYXQoKSAhPT0gJ3JnYmEnKSB7XHJcblx0XHRcdFx0dGhpc09iai5fY3VycmVudEZvcm1hdCA9ICdyZ2JhJztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXNPYmouZnJvbUhTVkEobnVsbCwgbnVsbCwgbnVsbCwgeVZhbCk7XHJcblx0fSxcclxuXHJcblxyXG5cdGNyZWF0ZVBhbGV0dGUgOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIHBhbGV0dGVPYmogPSB7XHJcblx0XHRcdGVsbTogbnVsbCxcclxuXHRcdFx0ZHJhdzogbnVsbFxyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgY2FudmFzID0ganNjLmNyZWF0ZUVsKCdjYW52YXMnKTtcclxuXHRcdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcblx0XHR2YXIgZHJhd0Z1bmMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgdHlwZSkge1xyXG5cdFx0XHRjYW52YXMud2lkdGggPSB3aWR0aDtcclxuXHRcdFx0Y2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcblx0XHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcblx0XHRcdHZhciBoR3JhZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCBjYW52YXMud2lkdGgsIDApO1xyXG5cdFx0XHRoR3JhZC5hZGRDb2xvclN0b3AoMCAvIDYsICcjRjAwJyk7XHJcblx0XHRcdGhHcmFkLmFkZENvbG9yU3RvcCgxIC8gNiwgJyNGRjAnKTtcclxuXHRcdFx0aEdyYWQuYWRkQ29sb3JTdG9wKDIgLyA2LCAnIzBGMCcpO1xyXG5cdFx0XHRoR3JhZC5hZGRDb2xvclN0b3AoMyAvIDYsICcjMEZGJyk7XHJcblx0XHRcdGhHcmFkLmFkZENvbG9yU3RvcCg0IC8gNiwgJyMwMEYnKTtcclxuXHRcdFx0aEdyYWQuYWRkQ29sb3JTdG9wKDUgLyA2LCAnI0YwRicpO1xyXG5cdFx0XHRoR3JhZC5hZGRDb2xvclN0b3AoNiAvIDYsICcjRjAwJyk7XHJcblxyXG5cdFx0XHRjdHguZmlsbFN0eWxlID0gaEdyYWQ7XHJcblx0XHRcdGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuXHRcdFx0dmFyIHZHcmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRzd2l0Y2ggKHR5cGUudG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRjYXNlICdzJzpcclxuXHRcdFx0XHR2R3JhZC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMjU1LDI1NSwyNTUsMCknKTtcclxuXHRcdFx0XHR2R3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMjU1LDI1NSwyNTUsMSknKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAndic6XHJcblx0XHRcdFx0dkdyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDAsMCwwLDApJyk7XHJcblx0XHRcdFx0dkdyYWQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDAsMCwwLDEpJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IHZHcmFkO1xyXG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0cGFsZXR0ZU9iai5lbG0gPSBjYW52YXM7XHJcblx0XHRwYWxldHRlT2JqLmRyYXcgPSBkcmF3RnVuYztcclxuXHJcblx0XHRyZXR1cm4gcGFsZXR0ZU9iajtcclxuXHR9LFxyXG5cclxuXHJcblx0Y3JlYXRlU2xpZGVyR3JhZGllbnQgOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIHNsaWRlck9iaiA9IHtcclxuXHRcdFx0ZWxtOiBudWxsLFxyXG5cdFx0XHRkcmF3OiBudWxsXHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBjYW52YXMgPSBqc2MuY3JlYXRlRWwoJ2NhbnZhcycpO1xyXG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRcdHZhciBkcmF3RnVuYyA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBjb2xvcjEsIGNvbG9yMikge1xyXG5cdFx0XHRjYW52YXMud2lkdGggPSB3aWR0aDtcclxuXHRcdFx0Y2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcblx0XHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcblx0XHRcdHZhciBncmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRncmFkLmFkZENvbG9yU3RvcCgwLCBjb2xvcjEpO1xyXG5cdFx0XHRncmFkLmFkZENvbG9yU3RvcCgxLCBjb2xvcjIpO1xyXG5cclxuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IGdyYWQ7XHJcblx0XHRcdGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRzbGlkZXJPYmouZWxtID0gY2FudmFzO1xyXG5cdFx0c2xpZGVyT2JqLmRyYXcgPSBkcmF3RnVuYztcclxuXHJcblx0XHRyZXR1cm4gc2xpZGVyT2JqO1xyXG5cdH0sXHJcblxyXG5cclxuXHRjcmVhdGVBU2xpZGVyR3JhZGllbnQgOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIHNsaWRlck9iaiA9IHtcclxuXHRcdFx0ZWxtOiBudWxsLFxyXG5cdFx0XHRkcmF3OiBudWxsXHJcblx0XHR9O1xyXG5cclxuXHRcdHZhciBjYW52YXMgPSBqc2MuY3JlYXRlRWwoJ2NhbnZhcycpO1xyXG5cdFx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRcdHZhciBkcmF3RnVuYyA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0LCBjb2xvcikge1xyXG5cdFx0XHRjYW52YXMud2lkdGggPSB3aWR0aDtcclxuXHRcdFx0Y2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcblx0XHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcblx0XHRcdHZhciBzcVNpemUgPSBjYW52YXMud2lkdGggLyAyO1xyXG5cdFx0XHR2YXIgc3FDb2xvcjEgPSBqc2MucHViLmNoZXNzYm9hcmRDb2xvcjE7XHJcblx0XHRcdHZhciBzcUNvbG9yMiA9IGpzYy5wdWIuY2hlc3Nib2FyZENvbG9yMjtcclxuXHJcblx0XHRcdC8vIGRhcmsgZ3JheSBiYWNrZ3JvdW5kXHJcblx0XHRcdGN0eC5maWxsU3R5bGUgPSBzcUNvbG9yMTtcclxuXHRcdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG5cdFx0XHRmb3IgKHZhciB5ID0gMDsgeSA8IGNhbnZhcy5oZWlnaHQ7IHkgKz0gc3FTaXplICogMikge1xyXG5cdFx0XHRcdC8vIGxpZ2h0IGdyYXkgc3F1YXJlc1xyXG5cdFx0XHRcdGN0eC5maWxsU3R5bGUgPSBzcUNvbG9yMjtcclxuXHRcdFx0XHRjdHguZmlsbFJlY3QoMCwgeSwgc3FTaXplLCBzcVNpemUpO1xyXG5cdFx0XHRcdGN0eC5maWxsUmVjdChzcVNpemUsIHkgKyBzcVNpemUsIHNxU2l6ZSwgc3FTaXplKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGdyYWQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgMCwgY2FudmFzLmhlaWdodCk7XHJcblx0XHRcdGdyYWQuYWRkQ29sb3JTdG9wKDAsIGNvbG9yKTtcclxuXHRcdFx0Z3JhZC5hZGRDb2xvclN0b3AoMSwgJ3JnYmEoMCwwLDAsMCknKTtcclxuXHJcblx0XHRcdGN0eC5maWxsU3R5bGUgPSBncmFkO1xyXG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0c2xpZGVyT2JqLmVsbSA9IGNhbnZhcztcclxuXHRcdHNsaWRlck9iai5kcmF3ID0gZHJhd0Z1bmM7XHJcblxyXG5cdFx0cmV0dXJuIHNsaWRlck9iajtcclxuXHR9LFxyXG5cclxuXHJcblx0Qm94U2hhZG93IDogKGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBCb3hTaGFkb3cgPSBmdW5jdGlvbiAoaFNoYWRvdywgdlNoYWRvdywgYmx1ciwgc3ByZWFkLCBjb2xvciwgaW5zZXQpIHtcclxuXHRcdFx0dGhpcy5oU2hhZG93ID0gaFNoYWRvdztcclxuXHRcdFx0dGhpcy52U2hhZG93ID0gdlNoYWRvdztcclxuXHRcdFx0dGhpcy5ibHVyID0gYmx1cjtcclxuXHRcdFx0dGhpcy5zcHJlYWQgPSBzcHJlYWQ7XHJcblx0XHRcdHRoaXMuY29sb3IgPSBjb2xvcjtcclxuXHRcdFx0dGhpcy5pbnNldCA9ICEhaW5zZXQ7XHJcblx0XHR9O1xyXG5cclxuXHRcdEJveFNoYWRvdy5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHZhciB2YWxzID0gW1xyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy5oU2hhZG93KSArICdweCcsXHJcblx0XHRcdFx0TWF0aC5yb3VuZCh0aGlzLnZTaGFkb3cpICsgJ3B4JyxcclxuXHRcdFx0XHRNYXRoLnJvdW5kKHRoaXMuYmx1cikgKyAncHgnLFxyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy5zcHJlYWQpICsgJ3B4JyxcclxuXHRcdFx0XHR0aGlzLmNvbG9yXHJcblx0XHRcdF07XHJcblx0XHRcdGlmICh0aGlzLmluc2V0KSB7XHJcblx0XHRcdFx0dmFscy5wdXNoKCdpbnNldCcpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB2YWxzLmpvaW4oJyAnKTtcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIEJveFNoYWRvdztcclxuXHR9KSgpLFxyXG5cclxuXHJcblx0ZmxhZ3MgOiB7XHJcblx0XHRsZWF2ZVZhbHVlIDogMSA8PCAwLFxyXG5cdFx0bGVhdmVBbHBoYSA6IDEgPDwgMSxcclxuXHRcdGxlYXZlUHJldmlldyA6IDEgPDwgMixcclxuXHR9LFxyXG5cclxuXHJcblx0ZW51bU9wdHMgOiB7XHJcblx0XHRmb3JtYXQ6IFsnYXV0bycsICdhbnknLCAnaGV4JywgJ3JnYicsICdyZ2JhJ10sXHJcblx0XHRwcmV2aWV3UG9zaXRpb246IFsnbGVmdCcsICdyaWdodCddLFxyXG5cdFx0bW9kZTogWydoc3YnLCAnaHZzJywgJ2hzJywgJ2h2J10sXHJcblx0XHRwb3NpdGlvbjogWydsZWZ0JywgJ3JpZ2h0JywgJ3RvcCcsICdib3R0b20nXSxcclxuXHRcdGFscGhhQ2hhbm5lbDogWydhdXRvJywgdHJ1ZSwgZmFsc2VdLFxyXG5cdH0sXHJcblxyXG5cclxuXHRkZXByZWNhdGVkT3B0cyA6IHtcclxuXHRcdC8vIDxvbGRfb3B0aW9uPjogPG5ld19vcHRpb24+ICAoPG5ld19vcHRpb24+IGNhbiBiZSBudWxsKVxyXG5cdFx0J3N0eWxlRWxlbWVudCc6ICdwcmV2aWV3RWxlbWVudCcsXHJcblx0XHQnb25GaW5lQ2hhbmdlJzogJ29uSW5wdXQnLFxyXG5cdFx0J292ZXJ3cml0ZUltcG9ydGFudCc6ICdmb3JjZVN0eWxlJyxcclxuXHRcdCdjbG9zYWJsZSc6ICdjbG9zZUJ1dHRvbicsXHJcblx0XHQnaW5zZXRXaWR0aCc6ICdjb250cm9sQm9yZGVyV2lkdGgnLFxyXG5cdFx0J2luc2V0Q29sb3InOiAnY29udHJvbEJvcmRlckNvbG9yJyxcclxuXHRcdCdyZWZpbmUnOiBudWxsLFxyXG5cdH0sXHJcblxyXG5cclxuXHRkb2NzUmVmIDogJyAnICsgJ1NlZSBodHRwczovL2pzY29sb3IuY29tL2RvY3MvJyxcclxuXHJcblxyXG5cdC8vXHJcblx0Ly8gVXNhZ2U6XHJcblx0Ly8gdmFyIG15UGlja2VyID0gbmV3IEpTQ29sb3IoPHRhcmdldEVsZW1lbnQ+IFssIDxvcHRpb25zPl0pXHJcblx0Ly9cclxuXHQvLyAoY29uc3RydWN0b3IgaXMgYWNjZXNzaWJsZSB2aWEgYm90aCAnanNjb2xvcicgYW5kICdKU0NvbG9yJyBuYW1lKVxyXG5cdC8vXHJcblxyXG5cdHB1YiA6IGZ1bmN0aW9uICh0YXJnZXRFbGVtZW50LCBvcHRzKSB7XHJcblxyXG5cdFx0dmFyIFRISVMgPSB0aGlzO1xyXG5cclxuXHRcdGlmICghb3B0cykge1xyXG5cdFx0XHRvcHRzID0ge307XHJcblx0XHR9XHJcblxyXG5cdFx0dGhpcy5jaGFubmVscyA9IHtcclxuXHRcdFx0cjogMjU1LCAvLyByZWQgWzAtMjU1XVxyXG5cdFx0XHRnOiAyNTUsIC8vIGdyZWVuIFswLTI1NV1cclxuXHRcdFx0YjogMjU1LCAvLyBibHVlIFswLTI1NV1cclxuXHRcdFx0aDogMCwgLy8gaHVlIFswLTM2MF1cclxuXHRcdFx0czogMCwgLy8gc2F0dXJhdGlvbiBbMC0xMDBdXHJcblx0XHRcdHY6IDEwMCwgLy8gdmFsdWUgKGJyaWdodG5lc3MpIFswLTEwMF1cclxuXHRcdFx0YTogMS4wLCAvLyBhbHBoYSAob3BhY2l0eSkgWzAuMCAtIDEuMF1cclxuXHRcdH07XHJcblxyXG5cdFx0Ly8gR2VuZXJhbCBvcHRpb25zXHJcblx0XHQvL1xyXG5cdFx0dGhpcy5mb3JtYXQgPSAnYXV0byc7IC8vICdhdXRvJyB8ICdhbnknIHwgJ2hleCcgfCAncmdiJyB8ICdyZ2JhJyAtIEZvcm1hdCBvZiB0aGUgaW5wdXQvb3V0cHV0IHZhbHVlXHJcblx0XHR0aGlzLnZhbHVlID0gdW5kZWZpbmVkOyAvLyBJTklUSUFMIGNvbG9yIHZhbHVlIGluIGFueSBzdXBwb3J0ZWQgZm9ybWF0LiBUbyBjaGFuZ2UgaXQgbGF0ZXIsIHVzZSBtZXRob2QgZnJvbVN0cmluZygpLCBmcm9tSFNWQSgpLCBmcm9tUkdCQSgpIG9yIGNoYW5uZWwoKVxyXG5cdFx0dGhpcy5hbHBoYSA9IHVuZGVmaW5lZDsgLy8gSU5JVElBTCBhbHBoYSB2YWx1ZS4gVG8gY2hhbmdlIGl0IGxhdGVyLCBjYWxsIG1ldGhvZCBjaGFubmVsKCdBJywgPHZhbHVlPilcclxuXHRcdHRoaXMub25DaGFuZ2UgPSB1bmRlZmluZWQ7IC8vIGNhbGxlZCB3aGVuIGNvbG9yIGNoYW5nZXMuIFZhbHVlIGNhbiBiZSBlaXRoZXIgYSBmdW5jdGlvbiBvciBhIHN0cmluZyB3aXRoIEpTIGNvZGUuXHJcblx0XHR0aGlzLm9uSW5wdXQgPSB1bmRlZmluZWQ7IC8vIGNhbGxlZCByZXBlYXRlZGx5IGFzIHRoZSBjb2xvciBpcyBiZWluZyBjaGFuZ2VkLCBlLmcuIHdoaWxlIGRyYWdnaW5nIGEgc2xpZGVyLiBWYWx1ZSBjYW4gYmUgZWl0aGVyIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmcgd2l0aCBKUyBjb2RlLlxyXG5cdFx0dGhpcy52YWx1ZUVsZW1lbnQgPSB1bmRlZmluZWQ7IC8vIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGlzcGxheSBhbmQgaW5wdXQgdGhlIGNvbG9yIHZhbHVlXHJcblx0XHR0aGlzLmFscGhhRWxlbWVudCA9IHVuZGVmaW5lZDsgLy8gZWxlbWVudCB0aGF0IHdpbGwgYmUgdXNlZCB0byBkaXNwbGF5IGFuZCBpbnB1dCB0aGUgYWxwaGEgKG9wYWNpdHkpIHZhbHVlXHJcblx0XHR0aGlzLnByZXZpZXdFbGVtZW50ID0gdW5kZWZpbmVkOyAvLyBlbGVtZW50IHRoYXQgd2lsbCBwcmV2aWV3IHRoZSBwaWNrZWQgY29sb3IgdXNpbmcgQ1NTIGJhY2tncm91bmRcclxuXHRcdHRoaXMucHJldmlld1Bvc2l0aW9uID0gJ2xlZnQnOyAvLyAnbGVmdCcgfCAncmlnaHQnIC0gcG9zaXRpb24gb2YgdGhlIGNvbG9yIHByZXZpZXcgaW4gcHJldmlld0VsZW1lbnRcclxuXHRcdHRoaXMucHJldmlld1NpemUgPSAzMjsgLy8gKHB4KSB3aWR0aCBvZiB0aGUgY29sb3IgcHJldmlldyBkaXNwbGF5ZWQgaW4gcHJldmlld0VsZW1lbnRcclxuXHRcdHRoaXMucHJldmlld1BhZGRpbmcgPSA4OyAvLyAocHgpIHNwYWNlIGJldHdlZW4gY29sb3IgcHJldmlldyBhbmQgY29udGVudCBvZiB0aGUgcHJldmlld0VsZW1lbnRcclxuXHRcdHRoaXMucmVxdWlyZWQgPSB0cnVlOyAvLyB3aGV0aGVyIHRoZSBhc3NvY2lhdGVkIHRleHQgaW5wdXQgbXVzdCBhbHdheXMgY29udGFpbiBhIGNvbG9yIHZhbHVlLiBJZiBmYWxzZSwgdGhlIGlucHV0IGNhbiBiZSBsZWZ0IGVtcHR5LlxyXG5cdFx0dGhpcy5oYXNoID0gdHJ1ZTsgLy8gd2hldGhlciB0byBwcmVmaXggdGhlIEhFWCBjb2xvciBjb2RlIHdpdGggIyBzeW1ib2wgKG9ubHkgYXBwbGljYWJsZSBmb3IgSEVYIGZvcm1hdClcclxuXHRcdHRoaXMudXBwZXJjYXNlID0gdHJ1ZTsgLy8gd2hldGhlciB0byBzaG93IHRoZSBIRVggY29sb3IgY29kZSBpbiB1cHBlciBjYXNlIChvbmx5IGFwcGxpY2FibGUgZm9yIEhFWCBmb3JtYXQpXHJcblx0XHR0aGlzLmZvcmNlU3R5bGUgPSB0cnVlOyAvLyB3aGV0aGVyIHRvIG92ZXJ3cml0ZSBDU1Mgc3R5bGUgb2YgdGhlIHByZXZpZXdFbGVtZW50IHVzaW5nICFpbXBvcnRhbnQgZmxhZ1xyXG5cclxuXHRcdC8vIENvbG9yIFBpY2tlciBvcHRpb25zXHJcblx0XHQvL1xyXG5cdFx0dGhpcy53aWR0aCA9IDE4MTsgLy8gd2lkdGggb2YgY29sb3IgcGFsZXR0ZSAoaW4gcHgpXHJcblx0XHR0aGlzLmhlaWdodCA9IDEwMTsgLy8gaGVpZ2h0IG9mIGNvbG9yIHBhbGV0dGUgKGluIHB4KVxyXG5cdFx0dGhpcy5tb2RlID0gJ0hTVic7IC8vICdIU1YnIHwgJ0hWUycgfCAnSFMnIHwgJ0hWJyAtIGxheW91dCBvZiB0aGUgY29sb3IgcGlja2VyIGNvbnRyb2xzXHJcblx0XHR0aGlzLmFscGhhQ2hhbm5lbCA9ICdhdXRvJzsgLy8gJ2F1dG8nIHwgdHJ1ZSB8IGZhbHNlIC0gaWYgYWxwaGEgY2hhbm5lbCBpcyBlbmFibGVkLCB0aGUgYWxwaGEgc2xpZGVyIHdpbGwgYmUgdmlzaWJsZS4gSWYgJ2F1dG8nLCBpdCB3aWxsIGJlIGRldGVybWluZWQgYWNjb3JkaW5nIHRvIGNvbG9yIGZvcm1hdFxyXG5cdFx0dGhpcy5wb3NpdGlvbiA9ICdib3R0b20nOyAvLyAnbGVmdCcgfCAncmlnaHQnIHwgJ3RvcCcgfCAnYm90dG9tJyAtIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSB0YXJnZXQgZWxlbWVudFxyXG5cdFx0dGhpcy5zbWFydFBvc2l0aW9uID0gdHJ1ZTsgLy8gYXV0b21hdGljYWxseSBjaGFuZ2UgcGlja2VyIHBvc2l0aW9uIHdoZW4gdGhlcmUgaXMgbm90IGVub3VnaCBzcGFjZSBmb3IgaXRcclxuXHRcdHRoaXMuc2hvd09uQ2xpY2sgPSB0cnVlOyAvLyB3aGV0aGVyIHRvIHNob3cgdGhlIHBpY2tlciB3aGVuIHVzZXIgY2xpY2tzIGl0cyB0YXJnZXQgZWxlbWVudFxyXG5cdFx0dGhpcy5oaWRlT25MZWF2ZSA9IHRydWU7IC8vIHdoZXRoZXIgdG8gYXV0b21hdGljYWxseSBoaWRlIHRoZSBwaWNrZXIgd2hlbiB1c2VyIGxlYXZlcyBpdHMgdGFyZ2V0IGVsZW1lbnQgKGUuZy4gdXBvbiBjbGlja2luZyB0aGUgZG9jdW1lbnQpXHJcblx0XHR0aGlzLnNsaWRlclNpemUgPSAxNjsgLy8gcHhcclxuXHRcdHRoaXMuY3Jvc3NTaXplID0gODsgLy8gcHhcclxuXHRcdHRoaXMuY2xvc2VCdXR0b24gPSBmYWxzZTsgLy8gd2hldGhlciB0byBkaXNwbGF5IHRoZSBDbG9zZSBidXR0b25cclxuXHRcdHRoaXMuY2xvc2VUZXh0ID0gJ0Nsb3NlJztcclxuXHRcdHRoaXMuYnV0dG9uQ29sb3IgPSAncmdiYSgwLDAsMCwxKSc7IC8vIENTUyBjb2xvclxyXG5cdFx0dGhpcy5idXR0b25IZWlnaHQgPSAxODsgLy8gcHhcclxuXHRcdHRoaXMucGFkZGluZyA9IDEyOyAvLyBweFxyXG5cdFx0dGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgyNTUsMjU1LDI1NSwxKSc7IC8vIENTUyBjb2xvclxyXG5cdFx0dGhpcy5ib3JkZXJXaWR0aCA9IDE7IC8vIHB4XHJcblx0XHR0aGlzLmJvcmRlckNvbG9yID0gJ3JnYmEoMTg3LDE4NywxODcsMSknOyAvLyBDU1MgY29sb3JcclxuXHRcdHRoaXMuYm9yZGVyUmFkaXVzID0gODsgLy8gcHhcclxuXHRcdHRoaXMuY29udHJvbEJvcmRlcldpZHRoID0gMTsgLy8gcHhcclxuXHRcdHRoaXMuY29udHJvbEJvcmRlckNvbG9yID0gJ3JnYmEoMTg3LDE4NywxODcsMSknOyAvLyBDU1MgY29sb3JcclxuXHRcdHRoaXMuc2hhZG93ID0gdHJ1ZTsgLy8gd2hldGhlciB0byBkaXNwbGF5IGEgc2hhZG93XHJcblx0XHR0aGlzLnNoYWRvd0JsdXIgPSAxNTsgLy8gcHhcclxuXHRcdHRoaXMuc2hhZG93Q29sb3IgPSAncmdiYSgwLDAsMCwwLjIpJzsgLy8gQ1NTIGNvbG9yXHJcblx0XHR0aGlzLnBvaW50ZXJDb2xvciA9ICdyZ2JhKDc2LDc2LDc2LDEpJzsgLy8gQ1NTIGNvbG9yXHJcblx0XHR0aGlzLnBvaW50ZXJCb3JkZXJXaWR0aCA9IDE7IC8vIHB4XHJcblx0XHR0aGlzLnBvaW50ZXJCb3JkZXJDb2xvciA9ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJzsgLy8gQ1NTIGNvbG9yXHJcblx0XHR0aGlzLnBvaW50ZXJUaGlja25lc3MgPSAyOyAvLyBweFxyXG5cdFx0dGhpcy56SW5kZXggPSA1MDAwO1xyXG5cdFx0dGhpcy5jb250YWluZXIgPSB1bmRlZmluZWQ7IC8vIHdoZXJlIHRvIGFwcGVuZCB0aGUgY29sb3IgcGlja2VyIChCT0RZIGVsZW1lbnQgYnkgZGVmYXVsdClcclxuXHJcblx0XHQvLyBFeHBlcmltZW50YWxcclxuXHRcdC8vXHJcblx0XHR0aGlzLm1pblMgPSAwOyAvLyBtaW4gYWxsb3dlZCBzYXR1cmF0aW9uICgwIC0gMTAwKVxyXG5cdFx0dGhpcy5tYXhTID0gMTAwOyAvLyBtYXggYWxsb3dlZCBzYXR1cmF0aW9uICgwIC0gMTAwKVxyXG5cdFx0dGhpcy5taW5WID0gMDsgLy8gbWluIGFsbG93ZWQgdmFsdWUgKGJyaWdodG5lc3MpICgwIC0gMTAwKVxyXG5cdFx0dGhpcy5tYXhWID0gMTAwOyAvLyBtYXggYWxsb3dlZCB2YWx1ZSAoYnJpZ2h0bmVzcykgKDAgLSAxMDApXHJcblx0XHR0aGlzLm1pbkEgPSAwLjA7IC8vIG1pbiBhbGxvd2VkIGFscGhhIChvcGFjaXR5KSAoMC4wIC0gMS4wKVxyXG5cdFx0dGhpcy5tYXhBID0gMS4wOyAvLyBtYXggYWxsb3dlZCBhbHBoYSAob3BhY2l0eSkgKDAuMCAtIDEuMClcclxuXHJcblxyXG5cdFx0Ly8gbGV0J3MgcHJvY2VzcyB0aGUgREVQUkVDQVRFRCAnb3B0aW9ucycgcHJvcGVydHkgKHRoaXMgd2lsbCBiZSBsYXRlciByZW1vdmVkKVxyXG5cdFx0aWYgKGpzYy5wdWIub3B0aW9ucykge1xyXG5cdFx0XHQvLyBsZXQncyBzZXQgY3VzdG9tIGRlZmF1bHQgb3B0aW9ucywgaWYgc3BlY2lmaWVkXHJcblx0XHRcdGZvciAodmFyIG9wdCBpbiBqc2MucHViLm9wdGlvbnMpIHtcclxuXHRcdFx0XHRpZiAoanNjLnB1Yi5vcHRpb25zLmhhc093blByb3BlcnR5KG9wdCkpIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHNldE9wdGlvbihvcHQsIGpzYy5wdWIub3B0aW9uc1tvcHRdKTtcclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBsZXQncyBhcHBseSBjb25maWd1cmF0aW9uIHByZXNldHNcclxuXHRcdC8vXHJcblx0XHR2YXIgcHJlc2V0c0FyciA9IFtdO1xyXG5cclxuXHRcdGlmIChvcHRzLnByZXNldCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG9wdHMucHJlc2V0ID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdHByZXNldHNBcnIgPSBvcHRzLnByZXNldC5zcGxpdCgvXFxzKy8pO1xyXG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3B0cy5wcmVzZXQpKSB7XHJcblx0XHRcdFx0cHJlc2V0c0FyciA9IG9wdHMucHJlc2V0LnNsaWNlKCk7IC8vIHNsaWNlKCkgdG8gY2xvbmVcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ1VucmVjb2duaXplZCBwcmVzZXQgdmFsdWUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGFsd2F5cyB1c2UgdGhlICdkZWZhdWx0JyBwcmVzZXQuIElmIGl0J3Mgbm90IGxpc3RlZCwgYXBwZW5kIGl0IHRvIHRoZSBlbmQuXHJcblx0XHRpZiAocHJlc2V0c0Fyci5pbmRleE9mKCdkZWZhdWx0JykgPT09IC0xKSB7XHJcblx0XHRcdHByZXNldHNBcnIucHVzaCgnZGVmYXVsdCcpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGxldCdzIGFwcGx5IHRoZSBwcmVzZXRzIGluIHJldmVyc2Ugb3JkZXIsIHNvIHRoYXQgc2hvdWxkIHRoZXJlIGJlIGFueSBvdmVybGFwcGluZyBvcHRpb25zLFxyXG5cdFx0Ly8gdGhlIGZvcm1lcmx5IGxpc3RlZCBwcmVzZXQgd2lsbCBvdmVycmlkZSB0aGUgbGF0dGVyXHJcblx0XHRmb3IgKHZhciBpID0gcHJlc2V0c0Fyci5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xyXG5cdFx0XHR2YXIgcHJlcyA9IHByZXNldHNBcnJbaV07XHJcblx0XHRcdGlmICghcHJlcykge1xyXG5cdFx0XHRcdGNvbnRpbnVlOyAvLyBwcmVzZXQgaXMgZW1wdHkgc3RyaW5nXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCFqc2MucHViLnByZXNldHMuaGFzT3duUHJvcGVydHkocHJlcykpIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ1Vua25vd24gcHJlc2V0OiAlcycsIHByZXMpO1xyXG5cdFx0XHRcdGNvbnRpbnVlO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvciAodmFyIG9wdCBpbiBqc2MucHViLnByZXNldHNbcHJlc10pIHtcclxuXHRcdFx0XHRpZiAoanNjLnB1Yi5wcmVzZXRzW3ByZXNdLmhhc093blByb3BlcnR5KG9wdCkpIHtcclxuXHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdHNldE9wdGlvbihvcHQsIGpzYy5wdWIucHJlc2V0c1twcmVzXVtvcHRdKTtcclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBsZXQncyBzZXQgc3BlY2lmaWMgb3B0aW9ucyBmb3IgdGhpcyBjb2xvciBwaWNrZXJcclxuXHRcdHZhciBub25Qcm9wZXJ0aWVzID0gW1xyXG5cdFx0XHQvLyB0aGVzZSBvcHRpb25zIHdvbid0IGJlIHNldCBhcyBpbnN0YW5jZSBwcm9wZXJ0aWVzXHJcblx0XHRcdCdwcmVzZXQnLFxyXG5cdFx0XTtcclxuXHRcdGZvciAodmFyIG9wdCBpbiBvcHRzKSB7XHJcblx0XHRcdGlmIChvcHRzLmhhc093blByb3BlcnR5KG9wdCkpIHtcclxuXHRcdFx0XHRpZiAobm9uUHJvcGVydGllcy5pbmRleE9mKG9wdCkgPT09IC0xKSB7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRzZXRPcHRpb24ob3B0LCBvcHRzW29wdF0pO1xyXG5cdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vIEdldHRlcjogb3B0aW9uKG5hbWUpXHJcblx0XHQvLyBTZXR0ZXI6IG9wdGlvbihuYW1lLCB2YWx1ZSlcclxuXHRcdC8vICAgICAgICAgb3B0aW9uKHtuYW1lOnZhbHVlLCAuLi59KVxyXG5cdFx0Ly9cclxuXHRcdHRoaXMub3B0aW9uID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ05vIG9wdGlvbiBzcGVjaWZpZWQnKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHQvLyBnZXR0aW5nIGEgc2luZ2xlIG9wdGlvblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZ2V0T3B0aW9uKGFyZ3VtZW50c1swXSk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblxyXG5cdFx0XHR9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMiAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdC8vIHNldHRpbmcgYSBzaW5nbGUgb3B0aW9uXHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGlmICghc2V0T3B0aW9uKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdKSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnJlZHJhdygpOyAvLyBpbW1lZGlhdGVseSByZWRyYXdzIHRoZSBwaWNrZXIsIGlmIGl0J3MgZGlzcGxheWVkXHJcblx0XHRcdFx0dGhpcy5leHBvc2VDb2xvcigpOyAvLyBpbiBjYXNlIHNvbWUgcHJldmlldy1yZWxhdGVkIG9yIGZvcm1hdC1yZWxhdGVkIG9wdGlvbiB3YXMgY2hhbmdlZFxyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdFx0Ly8gc2V0dGluZyBtdWx0aXBsZSBvcHRpb25zXHJcblx0XHRcdFx0dmFyIG9wdHMgPSBhcmd1bWVudHNbMF07XHJcblx0XHRcdFx0dmFyIHN1Y2Nlc3MgPSB0cnVlO1xyXG5cdFx0XHRcdGZvciAodmFyIG9wdCBpbiBvcHRzKSB7XHJcblx0XHRcdFx0XHRpZiAob3B0cy5oYXNPd25Qcm9wZXJ0eShvcHQpKSB7XHJcblx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKCFzZXRPcHRpb24ob3B0LCBvcHRzW29wdF0pKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzdWNjZXNzID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdFx0XHRcdHN1Y2Nlc3MgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR0aGlzLnJlZHJhdygpOyAvLyBpbW1lZGlhdGVseSByZWRyYXdzIHRoZSBwaWNrZXIsIGlmIGl0J3MgZGlzcGxheWVkXHJcblx0XHRcdFx0dGhpcy5leHBvc2VDb2xvcigpOyAvLyBpbiBjYXNlIHNvbWUgcHJldmlldy1yZWxhdGVkIG9yIGZvcm1hdC1yZWxhdGVkIG9wdGlvbiB3YXMgY2hhbmdlZFxyXG5cdFx0XHRcdHJldHVybiBzdWNjZXNzO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnRzJyk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vIEdldHRlcjogY2hhbm5lbChuYW1lKVxyXG5cdFx0Ly8gU2V0dGVyOiBjaGFubmVsKG5hbWUsIHZhbHVlKVxyXG5cdFx0Ly9cclxuXHRcdHRoaXMuY2hhbm5lbCA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlIGZvciBjaGFubmVsIG5hbWU6ICcgKyBuYW1lKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0XHQvLyBnZXR0aW5nIGNoYW5uZWwgdmFsdWVcclxuXHRcdFx0XHRpZiAoIXRoaXMuY2hhbm5lbHMuaGFzT3duUHJvcGVydHkobmFtZS50b0xvd2VyQ2FzZSgpKSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdHZXR0aW5nIHVua25vd24gY2hhbm5lbDogJyArIG5hbWUpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5jaGFubmVsc1tuYW1lLnRvTG93ZXJDYXNlKCldO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBzZXR0aW5nIGNoYW5uZWwgdmFsdWVcclxuXHRcdFx0XHR2YXIgcmVzID0gZmFsc2U7XHJcblx0XHRcdFx0c3dpdGNoIChuYW1lLnRvTG93ZXJDYXNlKCkpIHtcclxuXHRcdFx0XHRcdGNhc2UgJ3InOiByZXMgPSB0aGlzLmZyb21SR0JBKHZhbHVlLCBudWxsLCBudWxsLCBudWxsKTsgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICdnJzogcmVzID0gdGhpcy5mcm9tUkdCQShudWxsLCB2YWx1ZSwgbnVsbCwgbnVsbCk7IGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnYic6IHJlcyA9IHRoaXMuZnJvbVJHQkEobnVsbCwgbnVsbCwgdmFsdWUsIG51bGwpOyBicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ2gnOiByZXMgPSB0aGlzLmZyb21IU1ZBKHZhbHVlLCBudWxsLCBudWxsLCBudWxsKTsgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICdzJzogcmVzID0gdGhpcy5mcm9tSFNWQShudWxsLCB2YWx1ZSwgbnVsbCwgbnVsbCk7IGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAndic6IHJlcyA9IHRoaXMuZnJvbUhTVkEobnVsbCwgbnVsbCwgdmFsdWUsIG51bGwpOyBicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ2EnOiByZXMgPSB0aGlzLmZyb21IU1ZBKG51bGwsIG51bGwsIG51bGwsIHZhbHVlKTsgYnJlYWs7XHJcblx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ1NldHRpbmcgdW5rbm93biBjaGFubmVsOiAnICsgbmFtZSk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKHJlcykge1xyXG5cdFx0XHRcdFx0dGhpcy5yZWRyYXcoKTsgLy8gaW1tZWRpYXRlbHkgcmVkcmF3cyB0aGUgcGlja2VyLCBpZiBpdCdzIGRpc3BsYXllZFxyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vIFRyaWdnZXJzIGdpdmVuIGlucHV0IGV2ZW50KHMpIGJ5OlxyXG5cdFx0Ly8gLSBleGVjdXRpbmcgb248RXZlbnQ+IGNhbGxiYWNrIHNwZWNpZmllZCBhcyBwaWNrZXIncyBvcHRpb25cclxuXHRcdC8vIC0gdHJpZ2dlcmluZyBzdGFuZGFyZCBET00gZXZlbnQgbGlzdGVuZXJzIGF0dGFjaGVkIHRvIHRoZSB2YWx1ZSBlbGVtZW50XHJcblx0XHQvL1xyXG5cdFx0Ly8gSXQgaXMgcG9zc2libGUgdG8gc3BlY2lmeSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIHdpdGggYSBzcGFjZS5cclxuXHRcdC8vXHJcblx0XHR0aGlzLnRyaWdnZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lcykge1xyXG5cdFx0XHR2YXIgZXZzID0ganNjLnN0ckxpc3QoZXZlbnROYW1lcyk7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZXZzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdFx0dmFyIGV2ID0gZXZzW2ldLnRvTG93ZXJDYXNlKCk7XHJcblxyXG5cdFx0XHRcdC8vIHRyaWdnZXIgYSBjYWxsYmFja1xyXG5cdFx0XHRcdHZhciBjYWxsYmFja1Byb3AgPSBudWxsO1xyXG5cdFx0XHRcdHN3aXRjaCAoZXYpIHtcclxuXHRcdFx0XHRcdGNhc2UgJ2lucHV0JzogY2FsbGJhY2tQcm9wID0gJ29uSW5wdXQnOyBicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ2NoYW5nZSc6IGNhbGxiYWNrUHJvcCA9ICdvbkNoYW5nZSc7IGJyZWFrO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoY2FsbGJhY2tQcm9wKSB7XHJcblx0XHRcdFx0XHRqc2MudHJpZ2dlckNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrUHJvcCk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQvLyB0cmlnZ2VyIHN0YW5kYXJkIERPTSBldmVudCBsaXN0ZW5lcnMgb24gdGhlIHZhbHVlIGVsZW1lbnRcclxuXHRcdFx0XHRqc2MudHJpZ2dlcklucHV0RXZlbnQodGhpcy52YWx1ZUVsZW1lbnQsIGV2LCB0cnVlLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0Ly8gaDogMC0zNjBcclxuXHRcdC8vIHM6IDAtMTAwXHJcblx0XHQvLyB2OiAwLTEwMFxyXG5cdFx0Ly8gYTogMC4wLTEuMFxyXG5cdFx0Ly9cclxuXHRcdHRoaXMuZnJvbUhTVkEgPSBmdW5jdGlvbiAoaCwgcywgdiwgYSwgZmxhZ3MpIHsgLy8gbnVsbCA9IGRvbid0IGNoYW5nZVxyXG5cdFx0XHRpZiAoaCA9PT0gdW5kZWZpbmVkKSB7IGggPSBudWxsOyB9XHJcblx0XHRcdGlmIChzID09PSB1bmRlZmluZWQpIHsgcyA9IG51bGw7IH1cclxuXHRcdFx0aWYgKHYgPT09IHVuZGVmaW5lZCkgeyB2ID0gbnVsbDsgfVxyXG5cdFx0XHRpZiAoYSA9PT0gdW5kZWZpbmVkKSB7IGEgPSBudWxsOyB9XHJcblxyXG5cdFx0XHRpZiAoaCAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmIChpc05hTihoKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdFx0XHR0aGlzLmNoYW5uZWxzLmggPSBNYXRoLm1heCgwLCBNYXRoLm1pbigzNjAsIGgpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAocyAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmIChpc05hTihzKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdFx0XHR0aGlzLmNoYW5uZWxzLnMgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxMDAsIHRoaXMubWF4UywgcyksIHRoaXMubWluUyk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHYgIT09IG51bGwpIHtcclxuXHRcdFx0XHRpZiAoaXNOYU4odikpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy52ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB0aGlzLm1heFYsIHYpLCB0aGlzLm1pblYpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChhICE9PSBudWxsKSB7XHJcblx0XHRcdFx0aWYgKGlzTmFOKGEpKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFx0XHRcdHRoaXMuY2hhbm5lbHMuYSA9IHRoaXMuaGFzQWxwaGFDaGFubmVsKCkgP1xyXG5cdFx0XHRcdFx0TWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdGhpcy5tYXhBLCBhKSwgdGhpcy5taW5BKSA6XHJcblx0XHRcdFx0XHQxLjA7IC8vIGlmIGFscGhhIGNoYW5uZWwgaXMgZGlzYWJsZWQsIHRoZSBjb2xvciBzaG91bGQgc3RheSAxMDAlIG9wYXF1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcmdiID0ganNjLkhTVl9SR0IoXHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy5oLFxyXG5cdFx0XHRcdHRoaXMuY2hhbm5lbHMucyxcclxuXHRcdFx0XHR0aGlzLmNoYW5uZWxzLnZcclxuXHRcdFx0KTtcclxuXHRcdFx0dGhpcy5jaGFubmVscy5yID0gcmdiWzBdO1xyXG5cdFx0XHR0aGlzLmNoYW5uZWxzLmcgPSByZ2JbMV07XHJcblx0XHRcdHRoaXMuY2hhbm5lbHMuYiA9IHJnYlsyXTtcclxuXHJcblx0XHRcdHRoaXMuZXhwb3NlQ29sb3IoZmxhZ3MpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8vIHI6IDAtMjU1XHJcblx0XHQvLyBnOiAwLTI1NVxyXG5cdFx0Ly8gYjogMC0yNTVcclxuXHRcdC8vIGE6IDAuMC0xLjBcclxuXHRcdC8vXHJcblx0XHR0aGlzLmZyb21SR0JBID0gZnVuY3Rpb24gKHIsIGcsIGIsIGEsIGZsYWdzKSB7IC8vIG51bGwgPSBkb24ndCBjaGFuZ2VcclxuXHRcdFx0aWYgKHIgPT09IHVuZGVmaW5lZCkgeyByID0gbnVsbDsgfVxyXG5cdFx0XHRpZiAoZyA9PT0gdW5kZWZpbmVkKSB7IGcgPSBudWxsOyB9XHJcblx0XHRcdGlmIChiID09PSB1bmRlZmluZWQpIHsgYiA9IG51bGw7IH1cclxuXHRcdFx0aWYgKGEgPT09IHVuZGVmaW5lZCkgeyBhID0gbnVsbDsgfVxyXG5cclxuXHRcdFx0aWYgKHIgIT09IG51bGwpIHtcclxuXHRcdFx0XHRpZiAoaXNOYU4ocikpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcdFx0ciA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgcikpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChnICE9PSBudWxsKSB7XHJcblx0XHRcdFx0aWYgKGlzTmFOKGcpKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFx0XHRcdGcgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIGcpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoYiAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmIChpc05hTihiKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdFx0XHRiID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBiKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGEgIT09IG51bGwpIHtcclxuXHRcdFx0XHRpZiAoaXNOYU4oYSkpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy5hID0gdGhpcy5oYXNBbHBoYUNoYW5uZWwoKSA/XHJcblx0XHRcdFx0XHRNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB0aGlzLm1heEEsIGEpLCB0aGlzLm1pbkEpIDpcclxuXHRcdFx0XHRcdDEuMDsgLy8gaWYgYWxwaGEgY2hhbm5lbCBpcyBkaXNhYmxlZCwgdGhlIGNvbG9yIHNob3VsZCBzdGF5IDEwMCUgb3BhcXVlXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBoc3YgPSBqc2MuUkdCX0hTVihcclxuXHRcdFx0XHRyPT09bnVsbCA/IHRoaXMuY2hhbm5lbHMuciA6IHIsXHJcblx0XHRcdFx0Zz09PW51bGwgPyB0aGlzLmNoYW5uZWxzLmcgOiBnLFxyXG5cdFx0XHRcdGI9PT1udWxsID8gdGhpcy5jaGFubmVscy5iIDogYlxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAoaHN2WzBdICE9PSBudWxsKSB7XHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy5oID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMzYwLCBoc3ZbMF0pKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoaHN2WzJdICE9PSAwKSB7IC8vIGZ1bGx5IGJsYWNrIGNvbG9yIHN0YXlzIGJsYWNrIHRocm91Z2ggZW50aXJlIHNhdHVyYXRpb24gcmFuZ2UsIHNvIGxldCdzIG5vdCBjaGFuZ2Ugc2F0dXJhdGlvblxyXG5cdFx0XHRcdHRoaXMuY2hhbm5lbHMucyA9IE1hdGgubWF4KDAsIHRoaXMubWluUywgTWF0aC5taW4oMTAwLCB0aGlzLm1heFMsIGhzdlsxXSkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuY2hhbm5lbHMudiA9IE1hdGgubWF4KDAsIHRoaXMubWluViwgTWF0aC5taW4oMTAwLCB0aGlzLm1heFYsIGhzdlsyXSkpO1xyXG5cclxuXHRcdFx0Ly8gdXBkYXRlIFJHQiBhY2NvcmRpbmcgdG8gZmluYWwgSFNWLCBhcyBzb21lIHZhbHVlcyBtaWdodCBiZSB0cmltbWVkXHJcblx0XHRcdHZhciByZ2IgPSBqc2MuSFNWX1JHQih0aGlzLmNoYW5uZWxzLmgsIHRoaXMuY2hhbm5lbHMucywgdGhpcy5jaGFubmVscy52KTtcclxuXHRcdFx0dGhpcy5jaGFubmVscy5yID0gcmdiWzBdO1xyXG5cdFx0XHR0aGlzLmNoYW5uZWxzLmcgPSByZ2JbMV07XHJcblx0XHRcdHRoaXMuY2hhbm5lbHMuYiA9IHJnYlsyXTtcclxuXHJcblx0XHRcdHRoaXMuZXhwb3NlQ29sb3IoZmxhZ3MpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8vIERFUFJFQ0FURUQuIFVzZSAuZnJvbUhTVkEoKSBpbnN0ZWFkXHJcblx0XHQvL1xyXG5cdFx0dGhpcy5mcm9tSFNWID0gZnVuY3Rpb24gKGgsIHMsIHYsIGZsYWdzKSB7XHJcblx0XHRcdGNvbnNvbGUud2FybignZnJvbUhTVigpIG1ldGhvZCBpcyBERVBSRUNBVEVELiBVc2luZyBmcm9tSFNWQSgpIGluc3RlYWQuJyArIGpzYy5kb2NzUmVmKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZnJvbUhTVkEoaCwgcywgdiwgbnVsbCwgZmxhZ3MpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0Ly8gREVQUkVDQVRFRC4gVXNlIC5mcm9tUkdCQSgpIGluc3RlYWRcclxuXHRcdC8vXHJcblx0XHR0aGlzLmZyb21SR0IgPSBmdW5jdGlvbiAociwgZywgYiwgZmxhZ3MpIHtcclxuXHRcdFx0Y29uc29sZS53YXJuKCdmcm9tUkdCKCkgbWV0aG9kIGlzIERFUFJFQ0FURUQuIFVzaW5nIGZyb21SR0JBKCkgaW5zdGVhZC4nICsganNjLmRvY3NSZWYpO1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5mcm9tUkdCQShyLCBnLCBiLCBudWxsLCBmbGFncyk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLmZyb21TdHJpbmcgPSBmdW5jdGlvbiAoc3RyLCBmbGFncykge1xyXG5cdFx0XHRpZiAoIXRoaXMucmVxdWlyZWQgJiYgc3RyLnRyaW0oKSA9PT0gJycpIHtcclxuXHRcdFx0XHQvLyBzZXR0aW5nIGVtcHR5IHN0cmluZyB0byBhbiBvcHRpb25hbCBjb2xvciBpbnB1dFxyXG5cdFx0XHRcdHRoaXMuc2V0UHJldmlld0VsZW1lbnRCZyhudWxsKTtcclxuXHRcdFx0XHR0aGlzLnNldFZhbHVlRWxlbWVudFZhbHVlKCcnKTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGNvbG9yID0ganNjLnBhcnNlQ29sb3JTdHJpbmcoc3RyKTtcclxuXHRcdFx0aWYgKCFjb2xvcikge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTsgLy8gY291bGQgbm90IHBhcnNlXHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuZm9ybWF0LnRvTG93ZXJDYXNlKCkgPT09ICdhbnknKSB7XHJcblx0XHRcdFx0dGhpcy5fY3VycmVudEZvcm1hdCA9IGNvbG9yLmZvcm1hdDsgLy8gYWRhcHQgZm9ybWF0XHJcblx0XHRcdFx0aWYgKHRoaXMuZ2V0Rm9ybWF0KCkgIT09ICdyZ2JhJykge1xyXG5cdFx0XHRcdFx0Y29sb3IucmdiYVszXSA9IDEuMDsgLy8gd2hlbiBzd2l0Y2hpbmcgdG8gYSBmb3JtYXQgdGhhdCBkb2Vzbid0IHN1cHBvcnQgYWxwaGEsIHNldCBmdWxsIG9wYWNpdHlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5yZWRyYXcoKTsgLy8gdG8gc2hvdy9oaWRlIHRoZSBhbHBoYSBzbGlkZXIgYWNjb3JkaW5nIHRvIGN1cnJlbnQgZm9ybWF0XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5mcm9tUkdCQShcclxuXHRcdFx0XHRjb2xvci5yZ2JhWzBdLFxyXG5cdFx0XHRcdGNvbG9yLnJnYmFbMV0sXHJcblx0XHRcdFx0Y29sb3IucmdiYVsyXSxcclxuXHRcdFx0XHRjb2xvci5yZ2JhWzNdLFxyXG5cdFx0XHRcdGZsYWdzXHJcblx0XHRcdCk7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcclxuXHRcdFx0aWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Zm9ybWF0ID0gdGhpcy5nZXRGb3JtYXQoKTsgLy8gZm9ybWF0IG5vdCBzcGVjaWZpZWQgLT4gdXNlIHRoZSBjdXJyZW50IGZvcm1hdFxyXG5cdFx0XHR9XHJcblx0XHRcdHN3aXRjaCAoZm9ybWF0LnRvTG93ZXJDYXNlKCkpIHtcclxuXHRcdFx0XHRjYXNlICdoZXgnOiByZXR1cm4gdGhpcy50b0hFWFN0cmluZygpOyBicmVhaztcclxuXHRcdFx0XHRjYXNlICdyZ2InOiByZXR1cm4gdGhpcy50b1JHQlN0cmluZygpOyBicmVhaztcclxuXHRcdFx0XHRjYXNlICdyZ2JhJzogcmV0dXJuIHRoaXMudG9SR0JBU3RyaW5nKCk7IGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMudG9IRVhTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiAnIycgKyAoXHJcblx0XHRcdFx0KCcwJyArIE1hdGgucm91bmQodGhpcy5jaGFubmVscy5yKS50b1N0cmluZygxNikpLnN1YnN0cigtMikgK1xyXG5cdFx0XHRcdCgnMCcgKyBNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMuZykudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpICtcclxuXHRcdFx0XHQoJzAnICsgTWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLmIpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKVxyXG5cdFx0XHQpLnRvVXBwZXJDYXNlKCk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnRvUkdCU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gKCdyZ2IoJyArXHJcblx0XHRcdFx0TWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLnIpICsgJywnICtcclxuXHRcdFx0XHRNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMuZykgKyAnLCcgK1xyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy5jaGFubmVscy5iKSArXHJcblx0XHRcdCcpJyk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnRvUkdCQVN0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuICgncmdiYSgnICtcclxuXHRcdFx0XHRNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMucikgKyAnLCcgK1xyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy5jaGFubmVscy5nKSArICcsJyArXHJcblx0XHRcdFx0TWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLmIpICsgJywnICtcclxuXHRcdFx0XHQoTWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLmEgKiAxMDApIC8gMTAwKSArXHJcblx0XHRcdCcpJyk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnRvR3JheXNjYWxlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdDAuMjEzICogdGhpcy5jaGFubmVscy5yICtcclxuXHRcdFx0XHQwLjcxNSAqIHRoaXMuY2hhbm5lbHMuZyArXHJcblx0XHRcdFx0MC4wNzIgKiB0aGlzLmNoYW5uZWxzLmJcclxuXHRcdFx0KTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMudG9DYW52YXMgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBqc2MuZ2VuQ29sb3JQcmV2aWV3Q2FudmFzKHRoaXMudG9SR0JBU3RyaW5nKCkpLmNhbnZhcztcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMudG9EYXRhVVJMID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50b0NhbnZhcygpLnRvRGF0YVVSTCgpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy50b0JhY2tncm91bmQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBqc2MucHViLmJhY2tncm91bmQodGhpcy50b1JHQkFTdHJpbmcoKSk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLmlzTGlnaHQgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLnRvR3JheXNjYWxlKCkgPiAyNTUgLyAyO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoaXNQaWNrZXJPd25lcigpKSB7XHJcblx0XHRcdFx0ZGV0YWNoUGlja2VyKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0ZHJhd1BpY2tlcigpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5yZWRyYXcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChpc1BpY2tlck93bmVyKCkpIHtcclxuXHRcdFx0XHRkcmF3UGlja2VyKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuZ2V0Rm9ybWF0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudEZvcm1hdDtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuaGFzQWxwaGFDaGFubmVsID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy5hbHBoYUNoYW5uZWwgPT09ICdhdXRvJykge1xyXG5cdFx0XHRcdHJldHVybiAoXHJcblx0XHRcdFx0XHR0aGlzLmZvcm1hdC50b0xvd2VyQ2FzZSgpID09PSAnYW55JyB8fCAvLyBmb3JtYXQgY2FuIGNoYW5nZSBvbiB0aGUgZmx5IChlLmcuIGZyb20gaGV4IHRvIHJnYmEpLCBzbyBsZXQncyBjb25zaWRlciB0aGUgYWxwaGEgY2hhbm5lbCBlbmFibGVkXHJcblx0XHRcdFx0XHR0aGlzLmdldEZvcm1hdCgpID09PSAncmdiYScgfHwgLy8gdGhlIGN1cnJlbnQgZm9ybWF0IHN1cHBvcnRzIGFscGhhIGNoYW5uZWxcclxuXHRcdFx0XHRcdHRoaXMuYWxwaGEgIT09IHVuZGVmaW5lZCB8fCAvLyBpbml0aWFsIGFscGhhIHZhbHVlIGlzIHNldCwgc28gd2UncmUgd29ya2luZyB3aXRoIGFscGhhIGNoYW5uZWxcclxuXHRcdFx0XHRcdHRoaXMuYWxwaGFFbGVtZW50ICE9PSB1bmRlZmluZWQgLy8gdGhlIGFscGhhIHZhbHVlIGlzIHJlZGlyZWN0ZWQsIHNvIHdlJ3JlIHdvcmtpbmcgd2l0aCBhbHBoYSBjaGFubmVsXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuYWxwaGFDaGFubmVsOyAvLyB0aGUgYWxwaGEgY2hhbm5lbCBpcyBleHBsaWNpdGx5IHNldFxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5wcm9jZXNzVmFsdWVJbnB1dCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdFx0aWYgKCF0aGlzLmZyb21TdHJpbmcoc3RyKSkge1xyXG5cdFx0XHRcdC8vIGNvdWxkIG5vdCBwYXJzZSB0aGUgY29sb3IgdmFsdWUgLSBsZXQncyBqdXN0IGV4cG9zZSB0aGUgY3VycmVudCBjb2xvclxyXG5cdFx0XHRcdHRoaXMuZXhwb3NlQ29sb3IoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5wcm9jZXNzQWxwaGFJbnB1dCA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdFx0aWYgKCF0aGlzLmZyb21IU1ZBKG51bGwsIG51bGwsIG51bGwsIHBhcnNlRmxvYXQoc3RyKSkpIHtcclxuXHRcdFx0XHQvLyBjb3VsZCBub3QgcGFyc2UgdGhlIGFscGhhIHZhbHVlIC0gbGV0J3MganVzdCBleHBvc2UgdGhlIGN1cnJlbnQgY29sb3JcclxuXHRcdFx0XHR0aGlzLmV4cG9zZUNvbG9yKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuZXhwb3NlQ29sb3IgPSBmdW5jdGlvbiAoZmxhZ3MpIHtcclxuXHJcblx0XHRcdGlmICghKGZsYWdzICYganNjLmZsYWdzLmxlYXZlVmFsdWUpICYmIHRoaXMudmFsdWVFbGVtZW50KSB7XHJcblx0XHRcdFx0dmFyIHZhbHVlID0gdGhpcy50b1N0cmluZygpO1xyXG5cclxuXHRcdFx0XHRpZiAodGhpcy5nZXRGb3JtYXQoKSA9PT0gJ2hleCcpIHtcclxuXHRcdFx0XHRcdGlmICghdGhpcy51cHBlcmNhc2UpIHsgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpOyB9XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMuaGFzaCkgeyB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL14jLywgJycpOyB9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLnNldFZhbHVlRWxlbWVudFZhbHVlKHZhbHVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCEoZmxhZ3MgJiBqc2MuZmxhZ3MubGVhdmVBbHBoYSkgJiYgdGhpcy5hbHBoYUVsZW1lbnQpIHtcclxuXHRcdFx0XHR2YXIgdmFsdWUgPSBNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMuYSAqIDEwMCkgLyAxMDA7XHJcblx0XHRcdFx0dGhpcy5zZXRBbHBoYUVsZW1lbnRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghKGZsYWdzICYganNjLmZsYWdzLmxlYXZlUHJldmlldykgJiYgdGhpcy5wcmV2aWV3RWxlbWVudCkge1xyXG5cdFx0XHRcdHZhciBwcmV2aWV3UG9zID0gbnVsbDsgLy8gJ2xlZnQnIHwgJ3JpZ2h0JyAobnVsbCAtPiBmaWxsIHRoZSBlbnRpcmUgZWxlbWVudClcclxuXHJcblx0XHRcdFx0aWYgKFxyXG5cdFx0XHRcdFx0anNjLmlzVGV4dElucHV0KHRoaXMucHJldmlld0VsZW1lbnQpIHx8IC8vIHRleHQgaW5wdXRcclxuXHRcdFx0XHRcdChqc2MuaXNCdXR0b24odGhpcy5wcmV2aWV3RWxlbWVudCkgJiYgIWpzYy5pc0J1dHRvbkVtcHR5KHRoaXMucHJldmlld0VsZW1lbnQpKSAvLyBidXR0b24gd2l0aCB0ZXh0XHJcblx0XHRcdFx0KSB7XHJcblx0XHRcdFx0XHRwcmV2aWV3UG9zID0gdGhpcy5wcmV2aWV3UG9zaXRpb247XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR0aGlzLnNldFByZXZpZXdFbGVtZW50QmcodGhpcy50b1JHQkFTdHJpbmcoKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChpc1BpY2tlck93bmVyKCkpIHtcclxuXHRcdFx0XHRyZWRyYXdQYWQoKTtcclxuXHRcdFx0XHRyZWRyYXdTbGQoKTtcclxuXHRcdFx0XHRyZWRyYXdBU2xkKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuc2V0UHJldmlld0VsZW1lbnRCZyA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG5cdFx0XHRpZiAoIXRoaXMucHJldmlld0VsZW1lbnQpIHtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBwb3NpdGlvbiA9IG51bGw7IC8vIGNvbG9yIHByZXZpZXcgcG9zaXRpb246ICBudWxsIHwgJ2xlZnQnIHwgJ3JpZ2h0J1xyXG5cdFx0XHR2YXIgd2lkdGggPSBudWxsOyAvLyBjb2xvciBwcmV2aWV3IHdpZHRoOiAgcHggfCBudWxsID0gZmlsbCB0aGUgZW50aXJlIGVsZW1lbnRcclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdGpzYy5pc1RleHRJbnB1dCh0aGlzLnByZXZpZXdFbGVtZW50KSB8fCAvLyB0ZXh0IGlucHV0XHJcblx0XHRcdFx0KGpzYy5pc0J1dHRvbih0aGlzLnByZXZpZXdFbGVtZW50KSAmJiAhanNjLmlzQnV0dG9uRW1wdHkodGhpcy5wcmV2aWV3RWxlbWVudCkpIC8vIGJ1dHRvbiB3aXRoIHRleHRcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cG9zaXRpb24gPSB0aGlzLnByZXZpZXdQb3NpdGlvbjtcclxuXHRcdFx0XHR3aWR0aCA9IHRoaXMucHJldmlld1NpemU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBiYWNrZ3JvdW5kcyA9IFtdO1xyXG5cclxuXHRcdFx0aWYgKCFjb2xvcikge1xyXG5cdFx0XHRcdC8vIHRoZXJlIGlzIG5vIGNvbG9yIHByZXZpZXcgdG8gZGlzcGxheSAtPiBsZXQncyByZW1vdmUgYW55IHByZXZpb3VzIGJhY2tncm91bmQgaW1hZ2VcclxuXHRcdFx0XHRiYWNrZ3JvdW5kcy5wdXNoKHtcclxuXHRcdFx0XHRcdGltYWdlOiAnbm9uZScsXHJcblx0XHRcdFx0XHRwb3NpdGlvbjogJ2xlZnQgdG9wJyxcclxuXHRcdFx0XHRcdHNpemU6ICdhdXRvJyxcclxuXHRcdFx0XHRcdHJlcGVhdDogJ25vLXJlcGVhdCcsXHJcblx0XHRcdFx0XHRvcmlnaW46ICdwYWRkaW5nLWJveCcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gQ1NTIGdyYWRpZW50IGZvciBiYWNrZ3JvdW5kIGNvbG9yIHByZXZpZXdcclxuXHRcdFx0XHRiYWNrZ3JvdW5kcy5wdXNoKHtcclxuXHRcdFx0XHRcdGltYWdlOiBqc2MuZ2VuQ29sb3JQcmV2aWV3R3JhZGllbnQoXHJcblx0XHRcdFx0XHRcdGNvbG9yLFxyXG5cdFx0XHRcdFx0XHRwb3NpdGlvbixcclxuXHRcdFx0XHRcdFx0d2lkdGggPyB3aWR0aCAtIGpzYy5wdWIucHJldmlld1NlcGFyYXRvci5sZW5ndGggOiBudWxsXHJcblx0XHRcdFx0XHQpLFxyXG5cdFx0XHRcdFx0cG9zaXRpb246ICdsZWZ0IHRvcCcsXHJcblx0XHRcdFx0XHRzaXplOiAnYXV0bycsXHJcblx0XHRcdFx0XHRyZXBlYXQ6IHBvc2l0aW9uID8gJ3JlcGVhdC15JyA6ICdyZXBlYXQnLFxyXG5cdFx0XHRcdFx0b3JpZ2luOiAncGFkZGluZy1ib3gnLFxyXG5cdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHQvLyBkYXRhIFVSTCBvZiBnZW5lcmF0ZWQgUE5HIGltYWdlIHdpdGggYSBncmF5IHRyYW5zcGFyZW5jeSBjaGVzc2JvYXJkXHJcblx0XHRcdFx0dmFyIHByZXZpZXcgPSBqc2MuZ2VuQ29sb3JQcmV2aWV3Q2FudmFzKFxyXG5cdFx0XHRcdFx0J3JnYmEoMCwwLDAsMCknLFxyXG5cdFx0XHRcdFx0cG9zaXRpb24gPyB7J2xlZnQnOidyaWdodCcsICdyaWdodCc6J2xlZnQnfVtwb3NpdGlvbl0gOiBudWxsLFxyXG5cdFx0XHRcdFx0d2lkdGgsXHJcblx0XHRcdFx0XHR0cnVlXHJcblx0XHRcdFx0KTtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kcy5wdXNoKHtcclxuXHRcdFx0XHRcdGltYWdlOiAndXJsKFxcJycgKyBwcmV2aWV3LmNhbnZhcy50b0RhdGFVUkwoKSArICdcXCcpJyxcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiAocG9zaXRpb24gfHwgJ2xlZnQnKSArICcgdG9wJyxcclxuXHRcdFx0XHRcdHNpemU6IHByZXZpZXcud2lkdGggKyAncHggJyArIHByZXZpZXcuaGVpZ2h0ICsgJ3B4JyxcclxuXHRcdFx0XHRcdHJlcGVhdDogcG9zaXRpb24gPyAncmVwZWF0LXknIDogJ3JlcGVhdCcsXHJcblx0XHRcdFx0XHRvcmlnaW46ICdwYWRkaW5nLWJveCcsXHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBiZyA9IHtcclxuXHRcdFx0XHRpbWFnZTogW10sXHJcblx0XHRcdFx0cG9zaXRpb246IFtdLFxyXG5cdFx0XHRcdHNpemU6IFtdLFxyXG5cdFx0XHRcdHJlcGVhdDogW10sXHJcblx0XHRcdFx0b3JpZ2luOiBbXSxcclxuXHRcdFx0fTtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiYWNrZ3JvdW5kcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRcdGJnLmltYWdlLnB1c2goYmFja2dyb3VuZHNbaV0uaW1hZ2UpO1xyXG5cdFx0XHRcdGJnLnBvc2l0aW9uLnB1c2goYmFja2dyb3VuZHNbaV0ucG9zaXRpb24pO1xyXG5cdFx0XHRcdGJnLnNpemUucHVzaChiYWNrZ3JvdW5kc1tpXS5zaXplKTtcclxuXHRcdFx0XHRiZy5yZXBlYXQucHVzaChiYWNrZ3JvdW5kc1tpXS5yZXBlYXQpO1xyXG5cdFx0XHRcdGJnLm9yaWdpbi5wdXNoKGJhY2tncm91bmRzW2ldLm9yaWdpbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIHNldCBwcmV2aWV3RWxlbWVudCdzIGJhY2tncm91bmQtaW1hZ2VzXHJcblx0XHRcdHZhciBzdHkgPSB7XHJcblx0XHRcdFx0J2JhY2tncm91bmQtaW1hZ2UnOiBiZy5pbWFnZS5qb2luKCcsICcpLFxyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLXBvc2l0aW9uJzogYmcucG9zaXRpb24uam9pbignLCAnKSxcclxuXHRcdFx0XHQnYmFja2dyb3VuZC1zaXplJzogYmcuc2l6ZS5qb2luKCcsICcpLFxyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLXJlcGVhdCc6IGJnLnJlcGVhdC5qb2luKCcsICcpLFxyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLW9yaWdpbic6IGJnLm9yaWdpbi5qb2luKCcsICcpLFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRqc2Muc2V0U3R5bGUodGhpcy5wcmV2aWV3RWxlbWVudCwgc3R5LCB0aGlzLmZvcmNlU3R5bGUpO1xyXG5cclxuXHJcblx0XHRcdC8vIHNldC9yZXN0b3JlIHByZXZpZXdFbGVtZW50J3MgcGFkZGluZ1xyXG5cdFx0XHR2YXIgcGFkZGluZyA9IHtcclxuXHRcdFx0XHRsZWZ0OiBudWxsLFxyXG5cdFx0XHRcdHJpZ2h0OiBudWxsLFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRpZiAocG9zaXRpb24pIHtcclxuXHRcdFx0XHRwYWRkaW5nW3Bvc2l0aW9uXSA9ICh0aGlzLnByZXZpZXdTaXplICsgdGhpcy5wcmV2aWV3UGFkZGluZykgKyAncHgnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgc3R5ID0ge1xyXG5cdFx0XHRcdCdwYWRkaW5nLWxlZnQnOiBwYWRkaW5nLmxlZnQsXHJcblx0XHRcdFx0J3BhZGRpbmctcmlnaHQnOiBwYWRkaW5nLnJpZ2h0LFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRqc2Muc2V0U3R5bGUodGhpcy5wcmV2aWV3RWxlbWVudCwgc3R5LCB0aGlzLmZvcmNlU3R5bGUsIHRydWUpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5zZXRWYWx1ZUVsZW1lbnRWYWx1ZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdFx0aWYgKHRoaXMudmFsdWVFbGVtZW50KSB7XHJcblx0XHRcdFx0aWYgKGpzYy5ub2RlTmFtZSh0aGlzLnZhbHVlRWxlbWVudCkgPT09ICdpbnB1dCcpIHtcclxuXHRcdFx0XHRcdHRoaXMudmFsdWVFbGVtZW50LnZhbHVlID0gc3RyO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5pbm5lckhUTUwgPSBzdHI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnNldEFscGhhRWxlbWVudFZhbHVlID0gZnVuY3Rpb24gKHN0cikge1xyXG5cdFx0XHRpZiAodGhpcy5hbHBoYUVsZW1lbnQpIHtcclxuXHRcdFx0XHRpZiAoanNjLm5vZGVOYW1lKHRoaXMuYWxwaGFFbGVtZW50KSA9PT0gJ2lucHV0Jykge1xyXG5cdFx0XHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQudmFsdWUgPSBzdHI7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHRoaXMuYWxwaGFFbGVtZW50LmlubmVySFRNTCA9IHN0cjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuX3Byb2Nlc3NQYXJlbnRFbGVtZW50c0luRE9NID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy5fbGlua2VkRWxlbWVudHNQcm9jZXNzZWQpIHsgcmV0dXJuOyB9XHJcblx0XHRcdHRoaXMuX2xpbmtlZEVsZW1lbnRzUHJvY2Vzc2VkID0gdHJ1ZTtcclxuXHJcblx0XHRcdHZhciBlbG0gPSB0aGlzLnRhcmdldEVsZW1lbnQ7XHJcblx0XHRcdGRvIHtcclxuXHRcdFx0XHQvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgb3Igb25lIG9mIGl0cyBwYXJlbnQgbm9kZXMgaGFzIGZpeGVkIHBvc2l0aW9uLFxyXG5cdFx0XHRcdC8vIHRoZW4gdXNlIGZpeGVkIHBvc2l0aW9uaW5nIGluc3RlYWRcclxuXHRcdFx0XHR2YXIgY29tcFN0eWxlID0ganNjLmdldENvbXBTdHlsZShlbG0pO1xyXG5cdFx0XHRcdGlmIChjb21wU3R5bGUucG9zaXRpb24gJiYgY29tcFN0eWxlLnBvc2l0aW9uLnRvTG93ZXJDYXNlKCkgPT09ICdmaXhlZCcpIHtcclxuXHRcdFx0XHRcdHRoaXMuZml4ZWQgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYgKGVsbSAhPT0gdGhpcy50YXJnZXRFbGVtZW50KSB7XHJcblx0XHRcdFx0XHQvLyBFbnN1cmUgdG8gYXR0YWNoIG9uUGFyZW50U2Nyb2xsIG9ubHkgb25jZSB0byBlYWNoIHBhcmVudCBlbGVtZW50XHJcblx0XHRcdFx0XHQvLyAobXVsdGlwbGUgdGFyZ2V0RWxlbWVudHMgY2FuIHNoYXJlIHRoZSBzYW1lIHBhcmVudCBub2RlcylcclxuXHRcdFx0XHRcdC8vXHJcblx0XHRcdFx0XHQvLyBOb3RlOiBJdCdzIG5vdCBqdXN0IG9mZnNldFBhcmVudHMgdGhhdCBjYW4gYmUgc2Nyb2xsYWJsZSxcclxuXHRcdFx0XHRcdC8vIHRoYXQncyB3aHkgd2UgbG9vcCB0aHJvdWdoIGFsbCBwYXJlbnQgbm9kZXNcclxuXHRcdFx0XHRcdGlmICghanNjLmdldERhdGEoZWxtLCAnaGFzU2Nyb2xsTGlzdGVuZXInKSkge1xyXG5cdFx0XHRcdFx0XHRlbG0uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywganNjLm9uUGFyZW50U2Nyb2xsLCBmYWxzZSk7XHJcblx0XHRcdFx0XHRcdGpzYy5zZXREYXRhKGVsbSwgJ2hhc1Njcm9sbExpc3RlbmVyJywgdHJ1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IHdoaWxlICgoZWxtID0gZWxtLnBhcmVudE5vZGUpICYmIGpzYy5ub2RlTmFtZShlbG0pICE9PSAnYm9keScpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy50cnlIaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodGhpcy5oaWRlT25MZWF2ZSkge1xyXG5cdFx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBzZXRPcHRpb24gKG9wdGlvbiwgdmFsdWUpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRpb24gIT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHZhbHVlIGZvciBvcHRpb24gbmFtZTogJyArIG9wdGlvbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGVudW0gb3B0aW9uXHJcblx0XHRcdGlmIChqc2MuZW51bU9wdHMuaGFzT3duUHJvcGVydHkob3B0aW9uKSkge1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7IC8vIGVudW0gc3RyaW5nIHZhbHVlcyBhcmUgY2FzZSBpbnNlbnNpdGl2ZVxyXG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpZiAoanNjLmVudW1PcHRzW29wdGlvbl0uaW5kZXhPZih2YWx1ZSkgPT09IC0xKSB7XHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbiBcXCcnICsgb3B0aW9uICsgJ1xcJyBoYXMgaW52YWxpZCB2YWx1ZTogJyArIHZhbHVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIGRlcHJlY2F0ZWQgb3B0aW9uXHJcblx0XHRcdGlmIChqc2MuZGVwcmVjYXRlZE9wdHMuaGFzT3duUHJvcGVydHkob3B0aW9uKSkge1xyXG5cdFx0XHRcdHZhciBvbGRPcHQgPSBvcHRpb247XHJcblx0XHRcdFx0dmFyIG5ld09wdCA9IGpzYy5kZXByZWNhdGVkT3B0c1tvcHRpb25dO1xyXG5cdFx0XHRcdGlmIChuZXdPcHQpIHtcclxuXHRcdFx0XHRcdC8vIGlmIHdlIGhhdmUgYSBuZXcgbmFtZSBmb3IgdGhpcyBvcHRpb24sIGxldCdzIGxvZyBhIHdhcm5pbmcgYW5kIHVzZSB0aGUgbmV3IG5hbWVcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybignT3B0aW9uIFxcJyVzXFwnIGlzIERFUFJFQ0FURUQsIHVzaW5nIFxcJyVzXFwnIGluc3RlYWQuJyArIGpzYy5kb2NzUmVmLCBvbGRPcHQsIG5ld09wdCk7XHJcblx0XHRcdFx0XHRvcHRpb24gPSBuZXdPcHQ7XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdC8vIG5ldyBuYW1lIG5vdCBhdmFpbGFibGUgZm9yIHRoZSBvcHRpb25cclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignT3B0aW9uIFxcJycgKyBvcHRpb24gKyAnXFwnIGlzIERFUFJFQ0FURUQnKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghKG9wdGlvbiBpbiBUSElTKSkge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignVW5yZWNvZ25pemVkIGNvbmZpZ3VyYXRpb24gb3B0aW9uOiAnICsgb3B0aW9uKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0VEhJU1tvcHRpb25dID0gdmFsdWU7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBnZXRPcHRpb24gKG9wdGlvbikge1xyXG5cdFx0XHQvLyBkZXByZWNhdGVkIG9wdGlvblxyXG5cdFx0XHRpZiAoanNjLmRlcHJlY2F0ZWRPcHRzLmhhc093blByb3BlcnR5KG9wdGlvbikpIHtcclxuXHRcdFx0XHR2YXIgb2xkT3B0ID0gb3B0aW9uO1xyXG5cdFx0XHRcdHZhciBuZXdPcHQgPSBqc2MuZGVwcmVjYXRlZE9wdHNbb3B0aW9uXTtcclxuXHRcdFx0XHRpZiAobmV3T3B0KSB7XHJcblx0XHRcdFx0XHQvLyBpZiB3ZSBoYXZlIGEgbmV3IG5hbWUgZm9yIHRoaXMgb3B0aW9uLCBsZXQncyBsb2cgYSB3YXJuaW5nIGFuZCB1c2UgdGhlIG5ldyBuYW1lXHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ09wdGlvbiBcXCclc1xcJyBpcyBERVBSRUNBVEVELCB1c2luZyBcXCclc1xcJyBpbnN0ZWFkLicgKyBqc2MuZG9jc1JlZiwgb2xkT3B0LCBuZXdPcHQpO1xyXG5cdFx0XHRcdFx0b3B0aW9uID0gbmV3T3B0O1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBuZXcgbmFtZSBub3QgYXZhaWxhYmxlIGZvciB0aGUgb3B0aW9uXHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbiBcXCcnICsgb3B0aW9uICsgJ1xcJyBpcyBERVBSRUNBVEVEJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShvcHRpb24gaW4gVEhJUykpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1VucmVjb2duaXplZCBjb25maWd1cmF0aW9uIG9wdGlvbjogJyArIG9wdGlvbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBUSElTW29wdGlvbl07XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIGRldGFjaFBpY2tlciAoKSB7XHJcblx0XHRcdGpzYy5yZW1vdmVDbGFzcyhUSElTLnRhcmdldEVsZW1lbnQsIGpzYy5wdWIuYWN0aXZlQ2xhc3NOYW1lKTtcclxuXHRcdFx0anNjLnBpY2tlci53cmFwLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoanNjLnBpY2tlci53cmFwKTtcclxuXHRcdFx0ZGVsZXRlIGpzYy5waWNrZXIub3duZXI7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIGRyYXdQaWNrZXIgKCkge1xyXG5cclxuXHRcdFx0Ly8gQXQgdGhpcyBwb2ludCwgd2hlbiBkcmF3aW5nIHRoZSBwaWNrZXIsIHdlIGtub3cgd2hhdCB0aGUgcGFyZW50IGVsZW1lbnRzIGFyZVxyXG5cdFx0XHQvLyBhbmQgd2UgY2FuIGRvIGFsbCByZWxhdGVkIERPTSBvcGVyYXRpb25zLCBzdWNoIGFzIHJlZ2lzdGVyaW5nIGV2ZW50cyBvbiB0aGVtXHJcblx0XHRcdC8vIG9yIGNoZWNraW5nIHRoZWlyIHBvc2l0aW9uaW5nXHJcblx0XHRcdFRISVMuX3Byb2Nlc3NQYXJlbnRFbGVtZW50c0luRE9NKCk7XHJcblxyXG5cdFx0XHRpZiAoIWpzYy5waWNrZXIpIHtcclxuXHRcdFx0XHRqc2MucGlja2VyID0ge1xyXG5cdFx0XHRcdFx0b3duZXI6IG51bGwsIC8vIG93bmVyIHBpY2tlciBpbnN0YW5jZVxyXG5cdFx0XHRcdFx0d3JhcCA6IGpzYy5jcmVhdGVFbCgnZGl2JyksXHJcblx0XHRcdFx0XHRib3ggOiBqc2MuY3JlYXRlRWwoJ2RpdicpLFxyXG5cdFx0XHRcdFx0Ym94UyA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIHNoYWRvdyBhcmVhXHJcblx0XHRcdFx0XHRib3hCIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gYm9yZGVyXHJcblx0XHRcdFx0XHRwYWQgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLFxyXG5cdFx0XHRcdFx0cGFkQiA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIGJvcmRlclxyXG5cdFx0XHRcdFx0cGFkTSA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIG1vdXNlL3RvdWNoIGFyZWFcclxuXHRcdFx0XHRcdHBhZFBhbCA6IGpzYy5jcmVhdGVQYWxldHRlKCksXHJcblx0XHRcdFx0XHRjcm9zcyA6IGpzYy5jcmVhdGVFbCgnZGl2JyksXHJcblx0XHRcdFx0XHRjcm9zc0JZIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gYm9yZGVyIFlcclxuXHRcdFx0XHRcdGNyb3NzQlggOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBib3JkZXIgWFxyXG5cdFx0XHRcdFx0Y3Jvc3NMWSA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIGxpbmUgWVxyXG5cdFx0XHRcdFx0Y3Jvc3NMWCA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIGxpbmUgWFxyXG5cdFx0XHRcdFx0c2xkIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyXHJcblx0XHRcdFx0XHRzbGRCIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gYm9yZGVyXHJcblx0XHRcdFx0XHRzbGRNIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gbW91c2UvdG91Y2ggYXJlYVxyXG5cdFx0XHRcdFx0c2xkR3JhZCA6IGpzYy5jcmVhdGVTbGlkZXJHcmFkaWVudCgpLFxyXG5cdFx0XHRcdFx0c2xkUHRyUyA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIHNsaWRlciBwb2ludGVyIHNwYWNlclxyXG5cdFx0XHRcdFx0c2xkUHRySUIgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBzbGlkZXIgcG9pbnRlciBpbm5lciBib3JkZXJcclxuXHRcdFx0XHRcdHNsZFB0ck1CIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyIHBvaW50ZXIgbWlkZGxlIGJvcmRlclxyXG5cdFx0XHRcdFx0c2xkUHRyT0IgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBzbGlkZXIgcG9pbnRlciBvdXRlciBib3JkZXJcclxuXHRcdFx0XHRcdGFzbGQgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBhbHBoYSBzbGlkZXJcclxuXHRcdFx0XHRcdGFzbGRCIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gYm9yZGVyXHJcblx0XHRcdFx0XHRhc2xkTSA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIG1vdXNlL3RvdWNoIGFyZWFcclxuXHRcdFx0XHRcdGFzbGRHcmFkIDoganNjLmNyZWF0ZUFTbGlkZXJHcmFkaWVudCgpLFxyXG5cdFx0XHRcdFx0YXNsZFB0clMgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBzbGlkZXIgcG9pbnRlciBzcGFjZXJcclxuXHRcdFx0XHRcdGFzbGRQdHJJQiA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIHNsaWRlciBwb2ludGVyIGlubmVyIGJvcmRlclxyXG5cdFx0XHRcdFx0YXNsZFB0ck1CIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyIHBvaW50ZXIgbWlkZGxlIGJvcmRlclxyXG5cdFx0XHRcdFx0YXNsZFB0ck9CIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyIHBvaW50ZXIgb3V0ZXIgYm9yZGVyXHJcblx0XHRcdFx0XHRidG4gOiBqc2MuY3JlYXRlRWwoJ2RpdicpLFxyXG5cdFx0XHRcdFx0YnRuVCA6IGpzYy5jcmVhdGVFbCgnc3BhbicpLCAvLyB0ZXh0XHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0anNjLnBpY2tlci5wYWQuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5wYWRQYWwuZWxtKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLnBhZEIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5wYWQpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuY3Jvc3MuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5jcm9zc0JZKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmNyb3NzLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuY3Jvc3NCWCk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5jcm9zcy5hcHBlbmRDaGlsZChqc2MucGlja2VyLmNyb3NzTFkpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuY3Jvc3MuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5jcm9zc0xYKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLnBhZEIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5jcm9zcyk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5ib3guYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5wYWRCKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmJveC5hcHBlbmRDaGlsZChqc2MucGlja2VyLnBhZE0pO1xyXG5cclxuXHRcdFx0XHRqc2MucGlja2VyLnNsZC5hcHBlbmRDaGlsZChqc2MucGlja2VyLnNsZEdyYWQuZWxtKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLnNsZEIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5zbGQpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuc2xkQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLnNsZFB0ck9CKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLnNsZFB0ck9CLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuc2xkUHRyTUIpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuc2xkUHRyTUIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5zbGRQdHJJQik7XHJcblx0XHRcdFx0anNjLnBpY2tlci5zbGRQdHJJQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLnNsZFB0clMpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuYm94LmFwcGVuZENoaWxkKGpzYy5waWNrZXIuc2xkQik7XHJcblx0XHRcdFx0anNjLnBpY2tlci5ib3guYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5zbGRNKTtcclxuXHJcblx0XHRcdFx0anNjLnBpY2tlci5hc2xkLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYXNsZEdyYWQuZWxtKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmFzbGRCLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYXNsZCk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5hc2xkQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGRQdHJPQik7XHJcblx0XHRcdFx0anNjLnBpY2tlci5hc2xkUHRyT0IuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5hc2xkUHRyTUIpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuYXNsZFB0ck1CLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYXNsZFB0cklCKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmFzbGRQdHJJQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGRQdHJTKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmJveC5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGRCKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmJveC5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGRNKTtcclxuXHJcblx0XHRcdFx0anNjLnBpY2tlci5idG4uYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5idG5UKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmJveC5hcHBlbmRDaGlsZChqc2MucGlja2VyLmJ0bik7XHJcblxyXG5cdFx0XHRcdGpzYy5waWNrZXIuYm94Qi5hcHBlbmRDaGlsZChqc2MucGlja2VyLmJveCk7XHJcblx0XHRcdFx0anNjLnBpY2tlci53cmFwLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYm94Uyk7XHJcblx0XHRcdFx0anNjLnBpY2tlci53cmFwLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYm94Qik7XHJcblxyXG5cdFx0XHRcdGpzYy5waWNrZXIud3JhcC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywganNjLm9uUGlja2VyVG91Y2hTdGFydCxcclxuXHRcdFx0XHRcdGpzYy5pc1Bhc3NpdmVFdmVudFN1cHBvcnRlZCA/IHtwYXNzaXZlOiBmYWxzZX0gOiBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBwID0ganNjLnBpY2tlcjtcclxuXHJcblx0XHRcdHZhciBkaXNwbGF5U2xpZGVyID0gISFqc2MuZ2V0U2xpZGVyQ2hhbm5lbChUSElTKTtcclxuXHRcdFx0dmFyIGRpc3BsYXlBbHBoYVNsaWRlciA9IFRISVMuaGFzQWxwaGFDaGFubmVsKCk7XHJcblx0XHRcdHZhciBkaW1zID0ganNjLmdldFBpY2tlckRpbXMoVEhJUyk7XHJcblx0XHRcdHZhciBjcm9zc091dGVyU2l6ZSA9ICgyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyBUSElTLnBvaW50ZXJUaGlja25lc3MgKyAyICogVEhJUy5jcm9zc1NpemUpO1xyXG5cdFx0XHR2YXIgY29udHJvbFBhZGRpbmcgPSBqc2MuZ2V0Q29udHJvbFBhZGRpbmcoVEhJUyk7XHJcblx0XHRcdHZhciBib3JkZXJSYWRpdXMgPSBNYXRoLm1pbihcclxuXHRcdFx0XHRUSElTLmJvcmRlclJhZGl1cyxcclxuXHRcdFx0XHRNYXRoLnJvdW5kKFRISVMucGFkZGluZyAqIE1hdGguUEkpKTsgLy8gcHhcclxuXHRcdFx0dmFyIHBhZEN1cnNvciA9ICdjcm9zc2hhaXInO1xyXG5cclxuXHRcdFx0Ly8gd3JhcFxyXG5cdFx0XHRwLndyYXAuY2xhc3NOYW1lID0gJ2pzY29sb3ItcGlja2VyLXdyYXAnO1xyXG5cdFx0XHRwLndyYXAuc3R5bGUuY2xlYXIgPSAnYm90aCc7XHJcblx0XHRcdHAud3JhcC5zdHlsZS53aWR0aCA9IChkaW1zWzBdICsgMiAqIFRISVMuYm9yZGVyV2lkdGgpICsgJ3B4JztcclxuXHRcdFx0cC53cmFwLnN0eWxlLmhlaWdodCA9IChkaW1zWzFdICsgMiAqIFRISVMuYm9yZGVyV2lkdGgpICsgJ3B4JztcclxuXHRcdFx0cC53cmFwLnN0eWxlLnpJbmRleCA9IFRISVMuekluZGV4O1xyXG5cclxuXHRcdFx0Ly8gcGlja2VyXHJcblx0XHRcdHAuYm94LmNsYXNzTmFtZSA9ICdqc2NvbG9yLXBpY2tlcic7XHJcblx0XHRcdHAuYm94LnN0eWxlLndpZHRoID0gZGltc1swXSArICdweCc7XHJcblx0XHRcdHAuYm94LnN0eWxlLmhlaWdodCA9IGRpbXNbMV0gKyAncHgnO1xyXG5cdFx0XHRwLmJveC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcblxyXG5cdFx0XHQvLyBwaWNrZXIgc2hhZG93XHJcblx0XHRcdHAuYm94Uy5jbGFzc05hbWUgPSAnanNjb2xvci1waWNrZXItc2hhZG93JztcclxuXHRcdFx0cC5ib3hTLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0cC5ib3hTLnN0eWxlLmxlZnQgPSAnMCc7XHJcblx0XHRcdHAuYm94Uy5zdHlsZS50b3AgPSAnMCc7XHJcblx0XHRcdHAuYm94Uy5zdHlsZS53aWR0aCA9ICcxMDAlJztcclxuXHRcdFx0cC5ib3hTLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcclxuXHRcdFx0anNjLnNldEJvcmRlclJhZGl1cyhwLmJveFMsIGJvcmRlclJhZGl1cyArICdweCcpO1xyXG5cclxuXHRcdFx0Ly8gcGlja2VyIGJvcmRlclxyXG5cdFx0XHRwLmJveEIuY2xhc3NOYW1lID0gJ2pzY29sb3ItcGlja2VyLWJvcmRlcic7XHJcblx0XHRcdHAuYm94Qi5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcblx0XHRcdHAuYm94Qi5zdHlsZS5ib3JkZXIgPSBUSElTLmJvcmRlcldpZHRoICsgJ3B4IHNvbGlkJztcclxuXHRcdFx0cC5ib3hCLnN0eWxlLmJvcmRlckNvbG9yID0gVEhJUy5ib3JkZXJDb2xvcjtcclxuXHRcdFx0cC5ib3hCLnN0eWxlLmJhY2tncm91bmQgPSBUSElTLmJhY2tncm91bmRDb2xvcjtcclxuXHRcdFx0anNjLnNldEJvcmRlclJhZGl1cyhwLmJveEIsIGJvcmRlclJhZGl1cyArICdweCcpO1xyXG5cclxuXHRcdFx0Ly8gSUUgaGFjazpcclxuXHRcdFx0Ly8gSWYgdGhlIGVsZW1lbnQgaXMgdHJhbnNwYXJlbnQsIElFIHdpbGwgdHJpZ2dlciB0aGUgZXZlbnQgb24gdGhlIGVsZW1lbnRzIHVuZGVyIGl0LFxyXG5cdFx0XHQvLyBlLmcuIG9uIENhbnZhcyBvciBvbiBlbGVtZW50cyB3aXRoIGJvcmRlclxyXG5cdFx0XHRwLnBhZE0uc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDI1NSwwLDAsLjIpJztcclxuXHRcdFx0cC5zbGRNLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgwLDI1NSwwLC4yKSc7XHJcblx0XHRcdHAuYXNsZE0uc3R5bGUuYmFja2dyb3VuZCA9ICdyZ2JhKDAsMCwyNTUsLjIpJztcclxuXHJcblx0XHRcdHAucGFkTS5zdHlsZS5vcGFjaXR5ID1cclxuXHRcdFx0cC5zbGRNLnN0eWxlLm9wYWNpdHkgPVxyXG5cdFx0XHRwLmFzbGRNLnN0eWxlLm9wYWNpdHkgPVxyXG5cdFx0XHRcdCcwJztcclxuXHJcblx0XHRcdC8vIHBhZFxyXG5cdFx0XHRwLnBhZC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcblx0XHRcdHAucGFkLnN0eWxlLndpZHRoID0gVEhJUy53aWR0aCArICdweCc7XHJcblx0XHRcdHAucGFkLnN0eWxlLmhlaWdodCA9IFRISVMuaGVpZ2h0ICsgJ3B4JztcclxuXHJcblx0XHRcdC8vIHBhZCBwYWxldHRlcyAoSFNWIGFuZCBIVlMpXHJcblx0XHRcdHAucGFkUGFsLmRyYXcoVEhJUy53aWR0aCwgVEhJUy5oZWlnaHQsIGpzYy5nZXRQYWRZQ2hhbm5lbChUSElTKSk7XHJcblxyXG5cdFx0XHQvLyBwYWQgYm9yZGVyXHJcblx0XHRcdHAucGFkQi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAucGFkQi5zdHlsZS5sZWZ0ID0gVEhJUy5wYWRkaW5nICsgJ3B4JztcclxuXHRcdFx0cC5wYWRCLnN0eWxlLnRvcCA9IFRISVMucGFkZGluZyArICdweCc7XHJcblx0XHRcdHAucGFkQi5zdHlsZS5ib3JkZXIgPSBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCArICdweCBzb2xpZCc7XHJcblx0XHRcdHAucGFkQi5zdHlsZS5ib3JkZXJDb2xvciA9IFRISVMuY29udHJvbEJvcmRlckNvbG9yO1xyXG5cclxuXHRcdFx0Ly8gcGFkIG1vdXNlIGFyZWFcclxuXHRcdFx0cC5wYWRNLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0cC5wYWRNLnN0eWxlLmxlZnQgPSAwICsgJ3B4JztcclxuXHRcdFx0cC5wYWRNLnN0eWxlLnRvcCA9IDAgKyAncHgnO1xyXG5cdFx0XHRwLnBhZE0uc3R5bGUud2lkdGggPSAoVEhJUy5wYWRkaW5nICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgVEhJUy53aWR0aCArIGNvbnRyb2xQYWRkaW5nKSArICdweCc7XHJcblx0XHRcdHAucGFkTS5zdHlsZS5oZWlnaHQgPSAoMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgMiAqIFRISVMucGFkZGluZyArIFRISVMuaGVpZ2h0KSArICdweCc7XHJcblx0XHRcdHAucGFkTS5zdHlsZS5jdXJzb3IgPSBwYWRDdXJzb3I7XHJcblx0XHRcdGpzYy5zZXREYXRhKHAucGFkTSwge1xyXG5cdFx0XHRcdGluc3RhbmNlOiBUSElTLFxyXG5cdFx0XHRcdGNvbnRyb2w6ICdwYWQnLFxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0Ly8gcGFkIGNyb3NzXHJcblx0XHRcdHAuY3Jvc3Muc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLmNyb3NzLnN0eWxlLmxlZnQgPVxyXG5cdFx0XHRwLmNyb3NzLnN0eWxlLnRvcCA9XHJcblx0XHRcdFx0JzAnO1xyXG5cdFx0XHRwLmNyb3NzLnN0eWxlLndpZHRoID1cclxuXHRcdFx0cC5jcm9zcy5zdHlsZS5oZWlnaHQgPVxyXG5cdFx0XHRcdGNyb3NzT3V0ZXJTaXplICsgJ3B4JztcclxuXHJcblx0XHRcdC8vIHBhZCBjcm9zcyBib3JkZXIgWSBhbmQgWFxyXG5cdFx0XHRwLmNyb3NzQlkuc3R5bGUucG9zaXRpb24gPVxyXG5cdFx0XHRwLmNyb3NzQlguc3R5bGUucG9zaXRpb24gPVxyXG5cdFx0XHRcdCdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuY3Jvc3NCWS5zdHlsZS5iYWNrZ3JvdW5kID1cclxuXHRcdFx0cC5jcm9zc0JYLnN0eWxlLmJhY2tncm91bmQgPVxyXG5cdFx0XHRcdFRISVMucG9pbnRlckJvcmRlckNvbG9yO1xyXG5cdFx0XHRwLmNyb3NzQlkuc3R5bGUud2lkdGggPVxyXG5cdFx0XHRwLmNyb3NzQlguc3R5bGUuaGVpZ2h0ID1cclxuXHRcdFx0XHQoMiAqIFRISVMucG9pbnRlckJvcmRlcldpZHRoICsgVEhJUy5wb2ludGVyVGhpY2tuZXNzKSArICdweCc7XHJcblx0XHRcdHAuY3Jvc3NCWS5zdHlsZS5oZWlnaHQgPVxyXG5cdFx0XHRwLmNyb3NzQlguc3R5bGUud2lkdGggPVxyXG5cdFx0XHRcdGNyb3NzT3V0ZXJTaXplICsgJ3B4JztcclxuXHRcdFx0cC5jcm9zc0JZLnN0eWxlLmxlZnQgPVxyXG5cdFx0XHRwLmNyb3NzQlguc3R5bGUudG9wID1cclxuXHRcdFx0XHQoTWF0aC5mbG9vcihjcm9zc091dGVyU2l6ZSAvIDIpIC0gTWF0aC5mbG9vcihUSElTLnBvaW50ZXJUaGlja25lc3MgLyAyKSAtIFRISVMucG9pbnRlckJvcmRlcldpZHRoKSArICdweCc7XHJcblx0XHRcdHAuY3Jvc3NCWS5zdHlsZS50b3AgPVxyXG5cdFx0XHRwLmNyb3NzQlguc3R5bGUubGVmdCA9XHJcblx0XHRcdFx0JzAnO1xyXG5cclxuXHRcdFx0Ly8gcGFkIGNyb3NzIGxpbmUgWSBhbmQgWFxyXG5cdFx0XHRwLmNyb3NzTFkuc3R5bGUucG9zaXRpb24gPVxyXG5cdFx0XHRwLmNyb3NzTFguc3R5bGUucG9zaXRpb24gPVxyXG5cdFx0XHRcdCdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuY3Jvc3NMWS5zdHlsZS5iYWNrZ3JvdW5kID1cclxuXHRcdFx0cC5jcm9zc0xYLnN0eWxlLmJhY2tncm91bmQgPVxyXG5cdFx0XHRcdFRISVMucG9pbnRlckNvbG9yO1xyXG5cdFx0XHRwLmNyb3NzTFkuc3R5bGUuaGVpZ2h0ID1cclxuXHRcdFx0cC5jcm9zc0xYLnN0eWxlLndpZHRoID1cclxuXHRcdFx0XHQoY3Jvc3NPdXRlclNpemUgLSAyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGgpICsgJ3B4JztcclxuXHRcdFx0cC5jcm9zc0xZLnN0eWxlLndpZHRoID1cclxuXHRcdFx0cC5jcm9zc0xYLnN0eWxlLmhlaWdodCA9XHJcblx0XHRcdFx0VEhJUy5wb2ludGVyVGhpY2tuZXNzICsgJ3B4JztcclxuXHRcdFx0cC5jcm9zc0xZLnN0eWxlLmxlZnQgPVxyXG5cdFx0XHRwLmNyb3NzTFguc3R5bGUudG9wID1cclxuXHRcdFx0XHQoTWF0aC5mbG9vcihjcm9zc091dGVyU2l6ZSAvIDIpIC0gTWF0aC5mbG9vcihUSElTLnBvaW50ZXJUaGlja25lc3MgLyAyKSkgKyAncHgnO1xyXG5cdFx0XHRwLmNyb3NzTFkuc3R5bGUudG9wID1cclxuXHRcdFx0cC5jcm9zc0xYLnN0eWxlLmxlZnQgPVxyXG5cdFx0XHRcdFRISVMucG9pbnRlckJvcmRlcldpZHRoICsgJ3B4JztcclxuXHJcblxyXG5cdFx0XHQvLyBzbGlkZXJcclxuXHRcdFx0cC5zbGQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHRcdFx0cC5zbGQuc3R5bGUud2lkdGggPSBUSElTLnNsaWRlclNpemUgKyAncHgnO1xyXG5cdFx0XHRwLnNsZC5zdHlsZS5oZWlnaHQgPSBUSElTLmhlaWdodCArICdweCc7XHJcblxyXG5cdFx0XHQvLyBzbGlkZXIgZ3JhZGllbnRcclxuXHRcdFx0cC5zbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgJyMwMDAnLCAnIzAwMCcpO1xyXG5cclxuXHRcdFx0Ly8gc2xpZGVyIGJvcmRlclxyXG5cdFx0XHRwLnNsZEIuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXlTbGlkZXIgPyAnYmxvY2snIDogJ25vbmUnO1xyXG5cdFx0XHRwLnNsZEIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLnNsZEIuc3R5bGUubGVmdCA9IChUSElTLnBhZGRpbmcgKyBUSElTLndpZHRoICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgMiAqIGNvbnRyb2xQYWRkaW5nKSArICdweCc7XHJcblx0XHRcdHAuc2xkQi5zdHlsZS50b3AgPSBUSElTLnBhZGRpbmcgKyAncHgnO1xyXG5cdFx0XHRwLnNsZEIuc3R5bGUuYm9yZGVyID0gVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyAncHggc29saWQnO1xyXG5cdFx0XHRwLnNsZEIuc3R5bGUuYm9yZGVyQ29sb3IgPSBUSElTLmNvbnRyb2xCb3JkZXJDb2xvcjtcclxuXHJcblx0XHRcdC8vIHNsaWRlciBtb3VzZSBhcmVhXHJcblx0XHRcdHAuc2xkTS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVNsaWRlciA/ICdibG9jaycgOiAnbm9uZSc7XHJcblx0XHRcdHAuc2xkTS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuc2xkTS5zdHlsZS5sZWZ0ID0gKFRISVMucGFkZGluZyArIFRISVMud2lkdGggKyAyICogVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyBjb250cm9sUGFkZGluZykgKyAncHgnO1xyXG5cdFx0XHRwLnNsZE0uc3R5bGUudG9wID0gMCArICdweCc7XHJcblx0XHRcdHAuc2xkTS5zdHlsZS53aWR0aCA9IChcclxuXHRcdFx0XHRcdChUSElTLnNsaWRlclNpemUgKyAyICogY29udHJvbFBhZGRpbmcgKyAyICogVEhJUy5jb250cm9sQm9yZGVyV2lkdGgpICtcclxuXHRcdFx0XHRcdChkaXNwbGF5QWxwaGFTbGlkZXIgPyAwIDogTWF0aC5tYXgoMCwgVEhJUy5wYWRkaW5nIC0gY29udHJvbFBhZGRpbmcpKSAvLyByZW1haW5pbmcgcGFkZGluZyB0byB0aGUgcmlnaHQgZWRnZVxyXG5cdFx0XHRcdCkgKyAncHgnO1xyXG5cdFx0XHRwLnNsZE0uc3R5bGUuaGVpZ2h0ID0gKDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCArIDIgKiBUSElTLnBhZGRpbmcgKyBUSElTLmhlaWdodCkgKyAncHgnO1xyXG5cdFx0XHRwLnNsZE0uc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xyXG5cdFx0XHRqc2Muc2V0RGF0YShwLnNsZE0sIHtcclxuXHRcdFx0XHRpbnN0YW5jZTogVEhJUyxcclxuXHRcdFx0XHRjb250cm9sOiAnc2xkJyxcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdC8vIHNsaWRlciBwb2ludGVyIGlubmVyIGFuZCBvdXRlciBib3JkZXJcclxuXHRcdFx0cC5zbGRQdHJJQi5zdHlsZS5ib3JkZXIgPVxyXG5cdFx0XHRwLnNsZFB0ck9CLnN0eWxlLmJvcmRlciA9XHJcblx0XHRcdFx0VEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyAncHggc29saWQgJyArIFRISVMucG9pbnRlckJvcmRlckNvbG9yO1xyXG5cclxuXHRcdFx0Ly8gc2xpZGVyIHBvaW50ZXIgb3V0ZXIgYm9yZGVyXHJcblx0XHRcdHAuc2xkUHRyT0Iuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLnNsZFB0ck9CLnN0eWxlLmxlZnQgPSAtKDIgKiBUSElTLnBvaW50ZXJCb3JkZXJXaWR0aCArIFRISVMucG9pbnRlclRoaWNrbmVzcykgKyAncHgnO1xyXG5cdFx0XHRwLnNsZFB0ck9CLnN0eWxlLnRvcCA9ICcwJztcclxuXHJcblx0XHRcdC8vIHNsaWRlciBwb2ludGVyIG1pZGRsZSBib3JkZXJcclxuXHRcdFx0cC5zbGRQdHJNQi5zdHlsZS5ib3JkZXIgPSBUSElTLnBvaW50ZXJUaGlja25lc3MgKyAncHggc29saWQgJyArIFRISVMucG9pbnRlckNvbG9yO1xyXG5cclxuXHRcdFx0Ly8gc2xpZGVyIHBvaW50ZXIgc3BhY2VyXHJcblx0XHRcdHAuc2xkUHRyUy5zdHlsZS53aWR0aCA9IFRISVMuc2xpZGVyU2l6ZSArICdweCc7XHJcblx0XHRcdHAuc2xkUHRyUy5zdHlsZS5oZWlnaHQgPSBqc2MucHViLnNsaWRlcklubmVyU3BhY2UgKyAncHgnO1xyXG5cclxuXHJcblx0XHRcdC8vIGFscGhhIHNsaWRlclxyXG5cdFx0XHRwLmFzbGQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHRcdFx0cC5hc2xkLnN0eWxlLndpZHRoID0gVEhJUy5zbGlkZXJTaXplICsgJ3B4JztcclxuXHRcdFx0cC5hc2xkLnN0eWxlLmhlaWdodCA9IFRISVMuaGVpZ2h0ICsgJ3B4JztcclxuXHJcblx0XHRcdC8vIGFscGhhIHNsaWRlciBncmFkaWVudFxyXG5cdFx0XHRwLmFzbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgJyMwMDAnKTtcclxuXHJcblx0XHRcdC8vIGFscGhhIHNsaWRlciBib3JkZXJcclxuXHRcdFx0cC5hc2xkQi5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheUFscGhhU2xpZGVyID8gJ2Jsb2NrJyA6ICdub25lJztcclxuXHRcdFx0cC5hc2xkQi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuYXNsZEIuc3R5bGUubGVmdCA9IChcclxuXHRcdFx0XHRcdChUSElTLnBhZGRpbmcgKyBUSElTLndpZHRoICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgY29udHJvbFBhZGRpbmcpICtcclxuXHRcdFx0XHRcdChkaXNwbGF5U2xpZGVyID8gKFRISVMuc2xpZGVyU2l6ZSArIDMgKiBjb250cm9sUGFkZGluZyArIDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCkgOiAwKVxyXG5cdFx0XHRcdCkgKyAncHgnO1xyXG5cdFx0XHRwLmFzbGRCLnN0eWxlLnRvcCA9IFRISVMucGFkZGluZyArICdweCc7XHJcblx0XHRcdHAuYXNsZEIuc3R5bGUuYm9yZGVyID0gVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyAncHggc29saWQnO1xyXG5cdFx0XHRwLmFzbGRCLnN0eWxlLmJvcmRlckNvbG9yID0gVEhJUy5jb250cm9sQm9yZGVyQ29sb3I7XHJcblxyXG5cdFx0XHQvLyBhbHBoYSBzbGlkZXIgbW91c2UgYXJlYVxyXG5cdFx0XHRwLmFzbGRNLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5QWxwaGFTbGlkZXIgPyAnYmxvY2snIDogJ25vbmUnO1xyXG5cdFx0XHRwLmFzbGRNLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0cC5hc2xkTS5zdHlsZS5sZWZ0ID0gKFxyXG5cdFx0XHRcdFx0KFRISVMucGFkZGluZyArIFRISVMud2lkdGggKyAyICogVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyBjb250cm9sUGFkZGluZykgK1xyXG5cdFx0XHRcdFx0KGRpc3BsYXlTbGlkZXIgPyAoVEhJUy5zbGlkZXJTaXplICsgMiAqIGNvbnRyb2xQYWRkaW5nICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoKSA6IDApXHJcblx0XHRcdFx0KSArICdweCc7XHJcblx0XHRcdHAuYXNsZE0uc3R5bGUudG9wID0gMCArICdweCc7XHJcblx0XHRcdHAuYXNsZE0uc3R5bGUud2lkdGggPSAoXHJcblx0XHRcdFx0XHQoVEhJUy5zbGlkZXJTaXplICsgMiAqIGNvbnRyb2xQYWRkaW5nICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoKSArXHJcblx0XHRcdFx0XHRNYXRoLm1heCgwLCBUSElTLnBhZGRpbmcgLSBjb250cm9sUGFkZGluZykgLy8gcmVtYWluaW5nIHBhZGRpbmcgdG8gdGhlIHJpZ2h0IGVkZ2VcclxuXHRcdFx0XHQpICsgJ3B4JztcclxuXHRcdFx0cC5hc2xkTS5zdHlsZS5oZWlnaHQgPSAoMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgMiAqIFRISVMucGFkZGluZyArIFRISVMuaGVpZ2h0KSArICdweCc7XHJcblx0XHRcdHAuYXNsZE0uc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xyXG5cdFx0XHRqc2Muc2V0RGF0YShwLmFzbGRNLCB7XHJcblx0XHRcdFx0aW5zdGFuY2U6IFRISVMsXHJcblx0XHRcdFx0Y29udHJvbDogJ2FzbGQnLFxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdFx0Ly8gYWxwaGEgc2xpZGVyIHBvaW50ZXIgaW5uZXIgYW5kIG91dGVyIGJvcmRlclxyXG5cdFx0XHRwLmFzbGRQdHJJQi5zdHlsZS5ib3JkZXIgPVxyXG5cdFx0XHRwLmFzbGRQdHJPQi5zdHlsZS5ib3JkZXIgPVxyXG5cdFx0XHRcdFRISVMucG9pbnRlckJvcmRlcldpZHRoICsgJ3B4IHNvbGlkICcgKyBUSElTLnBvaW50ZXJCb3JkZXJDb2xvcjtcclxuXHJcblx0XHRcdC8vIGFscGhhIHNsaWRlciBwb2ludGVyIG91dGVyIGJvcmRlclxyXG5cdFx0XHRwLmFzbGRQdHJPQi5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuYXNsZFB0ck9CLnN0eWxlLmxlZnQgPSAtKDIgKiBUSElTLnBvaW50ZXJCb3JkZXJXaWR0aCArIFRISVMucG9pbnRlclRoaWNrbmVzcykgKyAncHgnO1xyXG5cdFx0XHRwLmFzbGRQdHJPQi5zdHlsZS50b3AgPSAnMCc7XHJcblxyXG5cdFx0XHQvLyBhbHBoYSBzbGlkZXIgcG9pbnRlciBtaWRkbGUgYm9yZGVyXHJcblx0XHRcdHAuYXNsZFB0ck1CLnN0eWxlLmJvcmRlciA9IFRISVMucG9pbnRlclRoaWNrbmVzcyArICdweCBzb2xpZCAnICsgVEhJUy5wb2ludGVyQ29sb3I7XHJcblxyXG5cdFx0XHQvLyBhbHBoYSBzbGlkZXIgcG9pbnRlciBzcGFjZXJcclxuXHRcdFx0cC5hc2xkUHRyUy5zdHlsZS53aWR0aCA9IFRISVMuc2xpZGVyU2l6ZSArICdweCc7XHJcblx0XHRcdHAuYXNsZFB0clMuc3R5bGUuaGVpZ2h0ID0ganNjLnB1Yi5zbGlkZXJJbm5lclNwYWNlICsgJ3B4JztcclxuXHJcblxyXG5cdFx0XHQvLyB0aGUgQ2xvc2UgYnV0dG9uXHJcblx0XHRcdGZ1bmN0aW9uIHNldEJ0bkJvcmRlciAoKSB7XHJcblx0XHRcdFx0dmFyIGluc2V0Q29sb3JzID0gVEhJUy5jb250cm9sQm9yZGVyQ29sb3Iuc3BsaXQoL1xccysvKTtcclxuXHRcdFx0XHR2YXIgb3V0c2V0Q29sb3IgPSBpbnNldENvbG9ycy5sZW5ndGggPCAyID8gaW5zZXRDb2xvcnNbMF0gOiBpbnNldENvbG9yc1sxXSArICcgJyArIGluc2V0Q29sb3JzWzBdICsgJyAnICsgaW5zZXRDb2xvcnNbMF0gKyAnICcgKyBpbnNldENvbG9yc1sxXTtcclxuXHRcdFx0XHRwLmJ0bi5zdHlsZS5ib3JkZXJDb2xvciA9IG91dHNldENvbG9yO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBidG5QYWRkaW5nID0gMTU7IC8vIHB4XHJcblx0XHRcdHAuYnRuLmNsYXNzTmFtZSA9ICdqc2NvbG9yLWJ0bi1jbG9zZSc7XHJcblx0XHRcdHAuYnRuLnN0eWxlLmRpc3BsYXkgPSBUSElTLmNsb3NlQnV0dG9uID8gJ2Jsb2NrJyA6ICdub25lJztcclxuXHRcdFx0cC5idG4uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5sZWZ0ID0gVEhJUy5wYWRkaW5nICsgJ3B4JztcclxuXHRcdFx0cC5idG4uc3R5bGUuYm90dG9tID0gVEhJUy5wYWRkaW5nICsgJ3B4JztcclxuXHRcdFx0cC5idG4uc3R5bGUucGFkZGluZyA9ICcwICcgKyBidG5QYWRkaW5nICsgJ3B4JztcclxuXHRcdFx0cC5idG4uc3R5bGUubWF4V2lkdGggPSAoZGltc1swXSAtIDIgKiBUSElTLnBhZGRpbmcgLSAyICogVEhJUy5jb250cm9sQm9yZGVyV2lkdGggLSAyICogYnRuUGFkZGluZykgKyAncHgnO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5oZWlnaHQgPSBUSElTLmJ1dHRvbkhlaWdodCArICdweCc7XHJcblx0XHRcdHAuYnRuLnN0eWxlLndoaXRlU3BhY2UgPSAnbm93cmFwJztcclxuXHRcdFx0cC5idG4uc3R5bGUuYm9yZGVyID0gVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyAncHggc29saWQnO1xyXG5cdFx0XHRzZXRCdG5Cb3JkZXIoKTtcclxuXHRcdFx0cC5idG4uc3R5bGUuY29sb3IgPSBUSElTLmJ1dHRvbkNvbG9yO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5mb250ID0gJzEycHggc2Fucy1zZXJpZic7XHJcblx0XHRcdHAuYnRuLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcblx0XHRcdHAuYnRuLm9ubW91c2Vkb3duID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFRISVMuaGlkZSgpO1xyXG5cdFx0XHR9O1xyXG5cdFx0XHRwLmJ0blQuc3R5bGUubGluZUhlaWdodCA9IFRISVMuYnV0dG9uSGVpZ2h0ICsgJ3B4JztcclxuXHRcdFx0cC5idG5ULmlubmVySFRNTCA9ICcnO1xyXG5cdFx0XHRwLmJ0blQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoVEhJUy5jbG9zZVRleHQpKTtcclxuXHJcblx0XHRcdC8vIHJlcG9zaXRpb24gdGhlIHBvaW50ZXJzXHJcblx0XHRcdHJlZHJhd1BhZCgpO1xyXG5cdFx0XHRyZWRyYXdTbGQoKTtcclxuXHRcdFx0cmVkcmF3QVNsZCgpO1xyXG5cclxuXHRcdFx0Ly8gSWYgd2UgYXJlIGNoYW5naW5nIHRoZSBvd25lciB3aXRob3V0IGZpcnN0IGNsb3NpbmcgdGhlIHBpY2tlcixcclxuXHRcdFx0Ly8gbWFrZSBzdXJlIHRvIGZpcnN0IGRlYWwgd2l0aCB0aGUgb2xkIG93bmVyXHJcblx0XHRcdGlmIChqc2MucGlja2VyLm93bmVyICYmIGpzYy5waWNrZXIub3duZXIgIT09IFRISVMpIHtcclxuXHRcdFx0XHRqc2MucmVtb3ZlQ2xhc3MoanNjLnBpY2tlci5vd25lci50YXJnZXRFbGVtZW50LCBqc2MucHViLmFjdGl2ZUNsYXNzTmFtZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIFNldCBhIG5ldyBwaWNrZXIgb3duZXJcclxuXHRcdFx0anNjLnBpY2tlci5vd25lciA9IFRISVM7XHJcblxyXG5cdFx0XHQvLyBUaGUgcmVkcmF3UG9zaXRpb24oKSBtZXRob2QgbmVlZHMgcGlja2VyLm93bmVyIHRvIGJlIHNldCwgdGhhdCdzIHdoeSB3ZSBjYWxsIGl0IGhlcmUsXHJcblx0XHRcdC8vIGFmdGVyIHNldHRpbmcgdGhlIG93bmVyXHJcblx0XHRcdGlmIChUSElTLmNvbnRhaW5lciA9PT0gZG9jdW1lbnQuYm9keSkge1xyXG5cdFx0XHRcdGpzYy5yZWRyYXdQb3NpdGlvbigpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGpzYy5fZHJhd1Bvc2l0aW9uKFRISVMsIDAsIDAsICdyZWxhdGl2ZScsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHAud3JhcC5wYXJlbnROb2RlICE9PSBUSElTLmNvbnRhaW5lcikge1xyXG5cdFx0XHRcdFRISVMuY29udGFpbmVyLmFwcGVuZENoaWxkKHAud3JhcCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGpzYy5hZGRDbGFzcyhUSElTLnRhcmdldEVsZW1lbnQsIGpzYy5wdWIuYWN0aXZlQ2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVkcmF3UGFkICgpIHtcclxuXHRcdFx0Ly8gcmVkcmF3IHRoZSBwYWQgcG9pbnRlclxyXG5cdFx0XHR2YXIgeUNoYW5uZWwgPSBqc2MuZ2V0UGFkWUNoYW5uZWwoVEhJUyk7XHJcblx0XHRcdHZhciB4ID0gTWF0aC5yb3VuZCgoVEhJUy5jaGFubmVscy5oIC8gMzYwKSAqIChUSElTLndpZHRoIC0gMSkpO1xyXG5cdFx0XHR2YXIgeSA9IE1hdGgucm91bmQoKDEgLSBUSElTLmNoYW5uZWxzW3lDaGFubmVsXSAvIDEwMCkgKiAoVEhJUy5oZWlnaHQgLSAxKSk7XHJcblx0XHRcdHZhciBjcm9zc091dGVyU2l6ZSA9ICgyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyBUSElTLnBvaW50ZXJUaGlja25lc3MgKyAyICogVEhJUy5jcm9zc1NpemUpO1xyXG5cdFx0XHR2YXIgb2ZzID0gLU1hdGguZmxvb3IoY3Jvc3NPdXRlclNpemUgLyAyKTtcclxuXHRcdFx0anNjLnBpY2tlci5jcm9zcy5zdHlsZS5sZWZ0ID0gKHggKyBvZnMpICsgJ3B4JztcclxuXHRcdFx0anNjLnBpY2tlci5jcm9zcy5zdHlsZS50b3AgPSAoeSArIG9mcykgKyAncHgnO1xyXG5cclxuXHRcdFx0Ly8gcmVkcmF3IHRoZSBzbGlkZXJcclxuXHRcdFx0c3dpdGNoIChqc2MuZ2V0U2xpZGVyQ2hhbm5lbChUSElTKSkge1xyXG5cdFx0XHRjYXNlICdzJzpcclxuXHRcdFx0XHR2YXIgcmdiMSA9IGpzYy5IU1ZfUkdCKFRISVMuY2hhbm5lbHMuaCwgMTAwLCBUSElTLmNoYW5uZWxzLnYpO1xyXG5cdFx0XHRcdHZhciByZ2IyID0ganNjLkhTVl9SR0IoVEhJUy5jaGFubmVscy5oLCAwLCBUSElTLmNoYW5uZWxzLnYpO1xyXG5cdFx0XHRcdHZhciBjb2xvcjEgPSAncmdiKCcgK1xyXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChyZ2IxWzBdKSArICcsJyArXHJcblx0XHRcdFx0XHRNYXRoLnJvdW5kKHJnYjFbMV0pICsgJywnICtcclxuXHRcdFx0XHRcdE1hdGgucm91bmQocmdiMVsyXSkgKyAnKSc7XHJcblx0XHRcdFx0dmFyIGNvbG9yMiA9ICdyZ2IoJyArXHJcblx0XHRcdFx0XHRNYXRoLnJvdW5kKHJnYjJbMF0pICsgJywnICtcclxuXHRcdFx0XHRcdE1hdGgucm91bmQocmdiMlsxXSkgKyAnLCcgK1xyXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChyZ2IyWzJdKSArICcpJztcclxuXHRcdFx0XHRqc2MucGlja2VyLnNsZEdyYWQuZHJhdyhUSElTLnNsaWRlclNpemUsIFRISVMuaGVpZ2h0LCBjb2xvcjEsIGNvbG9yMik7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3YnOlxyXG5cdFx0XHRcdHZhciByZ2IgPSBqc2MuSFNWX1JHQihUSElTLmNoYW5uZWxzLmgsIFRISVMuY2hhbm5lbHMucywgMTAwKTtcclxuXHRcdFx0XHR2YXIgY29sb3IxID0gJ3JnYignICtcclxuXHRcdFx0XHRcdE1hdGgucm91bmQocmdiWzBdKSArICcsJyArXHJcblx0XHRcdFx0XHRNYXRoLnJvdW5kKHJnYlsxXSkgKyAnLCcgK1xyXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChyZ2JbMl0pICsgJyknO1xyXG5cdFx0XHRcdHZhciBjb2xvcjIgPSAnIzAwMCc7XHJcblx0XHRcdFx0anNjLnBpY2tlci5zbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgY29sb3IxLCBjb2xvcjIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyByZWRyYXcgdGhlIGFscGhhIHNsaWRlclxyXG5cdFx0XHRqc2MucGlja2VyLmFzbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgVEhJUy50b0hFWFN0cmluZygpKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVkcmF3U2xkICgpIHtcclxuXHRcdFx0dmFyIHNsZENoYW5uZWwgPSBqc2MuZ2V0U2xpZGVyQ2hhbm5lbChUSElTKTtcclxuXHRcdFx0aWYgKHNsZENoYW5uZWwpIHtcclxuXHRcdFx0XHQvLyByZWRyYXcgdGhlIHNsaWRlciBwb2ludGVyXHJcblx0XHRcdFx0dmFyIHkgPSBNYXRoLnJvdW5kKCgxIC0gVEhJUy5jaGFubmVsc1tzbGRDaGFubmVsXSAvIDEwMCkgKiAoVEhJUy5oZWlnaHQgLSAxKSk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5zbGRQdHJPQi5zdHlsZS50b3AgPSAoeSAtICgyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyBUSElTLnBvaW50ZXJUaGlja25lc3MpIC0gTWF0aC5mbG9vcihqc2MucHViLnNsaWRlcklubmVyU3BhY2UgLyAyKSkgKyAncHgnO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyByZWRyYXcgdGhlIGFscGhhIHNsaWRlclxyXG5cdFx0XHRqc2MucGlja2VyLmFzbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgVEhJUy50b0hFWFN0cmluZygpKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gcmVkcmF3QVNsZCAoKSB7XHJcblx0XHRcdHZhciB5ID0gTWF0aC5yb3VuZCgoMSAtIFRISVMuY2hhbm5lbHMuYSkgKiAoVEhJUy5oZWlnaHQgLSAxKSk7XHJcblx0XHRcdGpzYy5waWNrZXIuYXNsZFB0ck9CLnN0eWxlLnRvcCA9ICh5IC0gKDIgKiBUSElTLnBvaW50ZXJCb3JkZXJXaWR0aCArIFRISVMucG9pbnRlclRoaWNrbmVzcykgLSBNYXRoLmZsb29yKGpzYy5wdWIuc2xpZGVySW5uZXJTcGFjZSAvIDIpKSArICdweCc7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIGlzUGlja2VyT3duZXIgKCkge1xyXG5cdFx0XHRyZXR1cm4ganNjLnBpY2tlciAmJiBqc2MucGlja2VyLm93bmVyID09PSBUSElTO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvblZhbHVlS2V5RG93biAoZXYpIHtcclxuXHRcdFx0aWYgKGpzYy5ldmVudEtleShldikgPT09ICdFbnRlcicpIHtcclxuXHRcdFx0XHRpZiAoVEhJUy52YWx1ZUVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFRISVMucHJvY2Vzc1ZhbHVlSW5wdXQoVEhJUy52YWx1ZUVsZW1lbnQudmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRUSElTLnRyeUhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvbkFscGhhS2V5RG93biAoZXYpIHtcclxuXHRcdFx0aWYgKGpzYy5ldmVudEtleShldikgPT09ICdFbnRlcicpIHtcclxuXHRcdFx0XHRpZiAoVEhJUy5hbHBoYUVsZW1lbnQpIHtcclxuXHRcdFx0XHRcdFRISVMucHJvY2Vzc0FscGhhSW5wdXQoVEhJUy5hbHBoYUVsZW1lbnQudmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRUSElTLnRyeUhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvblZhbHVlQ2hhbmdlIChldikge1xyXG5cdFx0XHRpZiAoanNjLmdldERhdGEoZXYsICdpbnRlcm5hbCcpKSB7XHJcblx0XHRcdFx0cmV0dXJuOyAvLyBza2lwIGlmIHRoZSBldmVudCB3YXMgaW50ZXJuYWxseSB0cmlnZ2VyZWQgYnkganNjb2xvclxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgb2xkVmFsID0gVEhJUy52YWx1ZUVsZW1lbnQudmFsdWU7XHJcblxyXG5cdFx0XHRUSElTLnByb2Nlc3NWYWx1ZUlucHV0KFRISVMudmFsdWVFbGVtZW50LnZhbHVlKTsgLy8gdGhpcyBtaWdodCBjaGFuZ2UgdGhlIHZhbHVlXHJcblxyXG5cdFx0XHRqc2MudHJpZ2dlckNhbGxiYWNrKFRISVMsICdvbkNoYW5nZScpO1xyXG5cclxuXHRcdFx0aWYgKFRISVMudmFsdWVFbGVtZW50LnZhbHVlICE9PSBvbGRWYWwpIHtcclxuXHRcdFx0XHQvLyB2YWx1ZSB3YXMgYWRkaXRpb25hbGx5IGNoYW5nZWQgLT4gbGV0J3MgdHJpZ2dlciB0aGUgY2hhbmdlIGV2ZW50IGFnYWluLCBldmVuIHRob3VnaCBpdCB3YXMgbmF0aXZlbHkgZGlzcGF0Y2hlZFxyXG5cdFx0XHRcdGpzYy50cmlnZ2VySW5wdXRFdmVudChUSElTLnZhbHVlRWxlbWVudCwgJ2NoYW5nZScsIHRydWUsIHRydWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIG9uQWxwaGFDaGFuZ2UgKGV2KSB7XHJcblx0XHRcdGlmIChqc2MuZ2V0RGF0YShldiwgJ2ludGVybmFsJykpIHtcclxuXHRcdFx0XHRyZXR1cm47IC8vIHNraXAgaWYgdGhlIGV2ZW50IHdhcyBpbnRlcm5hbGx5IHRyaWdnZXJlZCBieSBqc2NvbG9yXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBvbGRWYWwgPSBUSElTLmFscGhhRWxlbWVudC52YWx1ZTtcclxuXHJcblx0XHRcdFRISVMucHJvY2Vzc0FscGhhSW5wdXQoVEhJUy5hbHBoYUVsZW1lbnQudmFsdWUpOyAvLyB0aGlzIG1pZ2h0IGNoYW5nZSB0aGUgdmFsdWVcclxuXHJcblx0XHRcdGpzYy50cmlnZ2VyQ2FsbGJhY2soVEhJUywgJ29uQ2hhbmdlJyk7XHJcblxyXG5cdFx0XHQvLyB0cmlnZ2VyaW5nIHZhbHVlRWxlbWVudCdzIG9uQ2hhbmdlIChiZWNhdXNlIGNoYW5naW5nIGFscGhhIGNoYW5nZXMgdGhlIGVudGlyZSBjb2xvciwgZS5nLiB3aXRoIHJnYmEgZm9ybWF0KVxyXG5cdFx0XHRqc2MudHJpZ2dlcklucHV0RXZlbnQoVEhJUy52YWx1ZUVsZW1lbnQsICdjaGFuZ2UnLCB0cnVlLCB0cnVlKTtcclxuXHJcblx0XHRcdGlmIChUSElTLmFscGhhRWxlbWVudC52YWx1ZSAhPT0gb2xkVmFsKSB7XHJcblx0XHRcdFx0Ly8gdmFsdWUgd2FzIGFkZGl0aW9uYWxseSBjaGFuZ2VkIC0+IGxldCdzIHRyaWdnZXIgdGhlIGNoYW5nZSBldmVudCBhZ2FpbiwgZXZlbiB0aG91Z2ggaXQgd2FzIG5hdGl2ZWx5IGRpc3BhdGNoZWRcclxuXHRcdFx0XHRqc2MudHJpZ2dlcklucHV0RXZlbnQoVEhJUy5hbHBoYUVsZW1lbnQsICdjaGFuZ2UnLCB0cnVlLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvblZhbHVlSW5wdXQgKGV2KSB7XHJcblx0XHRcdGlmIChqc2MuZ2V0RGF0YShldiwgJ2ludGVybmFsJykpIHtcclxuXHRcdFx0XHRyZXR1cm47IC8vIHNraXAgaWYgdGhlIGV2ZW50IHdhcyBpbnRlcm5hbGx5IHRyaWdnZXJlZCBieSBqc2NvbG9yXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChUSElTLnZhbHVlRWxlbWVudCkge1xyXG5cdFx0XHRcdFRISVMuZnJvbVN0cmluZyhUSElTLnZhbHVlRWxlbWVudC52YWx1ZSwganNjLmZsYWdzLmxlYXZlVmFsdWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRqc2MudHJpZ2dlckNhbGxiYWNrKFRISVMsICdvbklucHV0Jyk7XHJcblxyXG5cdFx0XHQvLyB0cmlnZ2VyaW5nIHZhbHVlRWxlbWVudCdzIG9uSW5wdXRcclxuXHRcdFx0Ly8gKG5vdCBuZWVkZWQsIGl0IHdhcyBkaXNwYXRjaGVkIG5vcm1hbGx5IGJ5IHRoZSBicm93c2VyKVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvbkFscGhhSW5wdXQgKGV2KSB7XHJcblx0XHRcdGlmIChqc2MuZ2V0RGF0YShldiwgJ2ludGVybmFsJykpIHtcclxuXHRcdFx0XHRyZXR1cm47IC8vIHNraXAgaWYgdGhlIGV2ZW50IHdhcyBpbnRlcm5hbGx5IHRyaWdnZXJlZCBieSBqc2NvbG9yXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChUSElTLmFscGhhRWxlbWVudCkge1xyXG5cdFx0XHRcdFRISVMuZnJvbUhTVkEobnVsbCwgbnVsbCwgbnVsbCwgcGFyc2VGbG9hdChUSElTLmFscGhhRWxlbWVudC52YWx1ZSksIGpzYy5mbGFncy5sZWF2ZUFscGhhKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0anNjLnRyaWdnZXJDYWxsYmFjayhUSElTLCAnb25JbnB1dCcpO1xyXG5cclxuXHRcdFx0Ly8gdHJpZ2dlcmluZyB2YWx1ZUVsZW1lbnQncyBvbklucHV0IChiZWNhdXNlIGNoYW5naW5nIGFscGhhIGNoYW5nZXMgdGhlIGVudGlyZSBjb2xvciwgZS5nLiB3aXRoIHJnYmEgZm9ybWF0KVxyXG5cdFx0XHRqc2MudHJpZ2dlcklucHV0RXZlbnQoVEhJUy52YWx1ZUVsZW1lbnQsICdpbnB1dCcsIHRydWUsIHRydWUpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvL1xyXG5cdFx0Ly8gSW5zdGFsbCB0aGUgY29sb3IgcGlja2VyIG9uIGNob3NlbiBlbGVtZW50KHMpXHJcblx0XHQvL1xyXG5cclxuXHJcblx0XHQvLyBEZXRlcm1pbmUgcGlja2VyJ3MgY29udGFpbmVyIGVsZW1lbnRcclxuXHRcdGlmICh0aGlzLmNvbnRhaW5lciA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuYm9keTsgLy8gZGVmYXVsdCBjb250YWluZXIgaXMgQk9EWSBlbGVtZW50XHJcblxyXG5cdFx0fSBlbHNlIHsgLy8gZXhwbGljaXRseSBzZXQgdG8gY3VzdG9tIGVsZW1lbnRcclxuXHRcdFx0dGhpcy5jb250YWluZXIgPSBqc2Mubm9kZSh0aGlzLmNvbnRhaW5lcik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCF0aGlzLmNvbnRhaW5lcikge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBjb2xvciBwaWNrZXIgd2l0aG91dCBhIGNvbnRhaW5lciBlbGVtZW50Jyk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vIEZldGNoIHRoZSB0YXJnZXQgZWxlbWVudFxyXG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0ganNjLm5vZGUodGFyZ2V0RWxlbWVudCk7XHJcblxyXG5cdFx0aWYgKCF0aGlzLnRhcmdldEVsZW1lbnQpIHtcclxuXHRcdFx0Ly8gdGVtcG9yYXJpbHkgY3VzdG9taXplZCBlcnJvciBtZXNzYWdlIHRvIGhlbHAgd2l0aCBtaWdyYXRpbmcgZnJvbSB2ZXJzaW9ucyBwcmlvciB0byAyLjJcclxuXHRcdFx0aWYgKHR5cGVvZiB0YXJnZXRFbGVtZW50ID09PSAnc3RyaW5nJyAmJiAvXlthLXpBLVpdW1xcdzouLV0qJC8udGVzdCh0YXJnZXRFbGVtZW50KSkge1xyXG5cdFx0XHRcdC8vIHRhcmdldEVsZW1lbnQgbG9va3MgbGlrZSB2YWxpZCBJRFxyXG5cdFx0XHRcdHZhciBwb3NzaWJseUlkID0gdGFyZ2V0RWxlbWVudDtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0lmIFxcJycgKyBwb3NzaWJseUlkICsgJ1xcJyBpcyBzdXBwb3NlZCB0byBiZSBhbiBJRCwgcGxlYXNlIHVzZSBcXCcjJyArIHBvc3NpYmx5SWQgKyAnXFwnIG9yIGFueSB2YWxpZCBDU1Mgc2VsZWN0b3IuJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignQ2Fubm90IGluc3RhbnRpYXRlIGNvbG9yIHBpY2tlciB3aXRob3V0IGEgdGFyZ2V0IGVsZW1lbnQnKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGhpcy50YXJnZXRFbGVtZW50LmpzY29sb3IgJiYgdGhpcy50YXJnZXRFbGVtZW50LmpzY29sb3IgaW5zdGFuY2VvZiBqc2MucHViKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcignQ29sb3IgcGlja2VyIGFscmVhZHkgaW5zdGFsbGVkIG9uIHRoaXMgZWxlbWVudCcpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBsaW5rIHRoaXMgaW5zdGFuY2Ugd2l0aCB0aGUgdGFyZ2V0IGVsZW1lbnRcclxuXHRcdHRoaXMudGFyZ2V0RWxlbWVudC5qc2NvbG9yID0gdGhpcztcclxuXHRcdGpzYy5hZGRDbGFzcyh0aGlzLnRhcmdldEVsZW1lbnQsIGpzYy5wdWIuY2xhc3NOYW1lKTtcclxuXHJcblx0XHQvLyByZWdpc3RlciB0aGlzIGluc3RhbmNlXHJcblx0XHRqc2MuaW5zdGFuY2VzLnB1c2godGhpcyk7XHJcblxyXG5cclxuXHRcdC8vIGlmIHRhcmdldCBpcyBCVVRUT05cclxuXHRcdGlmIChqc2MuaXNCdXR0b24odGhpcy50YXJnZXRFbGVtZW50KSkge1xyXG5cclxuXHRcdFx0aWYgKHRoaXMudGFyZ2V0RWxlbWVudC50eXBlLnRvTG93ZXJDYXNlKCkgIT09ICdidXR0b24nKSB7XHJcblx0XHRcdFx0Ly8gb24gYnV0dG9ucywgYWx3YXlzIGZvcmNlIHR5cGUgdG8gYmUgJ2J1dHRvbicsIGUuZy4gaW4gc2l0dWF0aW9ucyB0aGUgdGFyZ2V0IDxidXR0b24+IGhhcyBubyB0eXBlXHJcblx0XHRcdFx0Ly8gYW5kIHRodXMgZGVmYXVsdHMgdG8gJ3N1Ym1pdCcgYW5kIHdvdWxkIHN1Ym1pdCB0aGUgZm9ybSB3aGVuIGNsaWNrZWRcclxuXHRcdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQudHlwZSA9ICdidXR0b24nO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoanNjLmlzQnV0dG9uRW1wdHkodGhpcy50YXJnZXRFbGVtZW50KSkgeyAvLyBlbXB0eSBidXR0b25cclxuXHRcdFx0XHQvLyBpdCBpcyBpbXBvcnRhbnQgdG8gY2xlYXIgZWxlbWVudCdzIGNvbnRlbnRzIGZpcnN0LlxyXG5cdFx0XHRcdC8vIGlmIHdlJ3JlIHJlLWluc3RhbnRpYXRpbmcgY29sb3IgcGlja2VycyBvbiBET00gdGhhdCBoYXMgYmVlbiBtb2RpZmllZCBieSBjaGFuZ2luZyBwYWdlJ3MgaW5uZXJIVE1MLFxyXG5cdFx0XHRcdC8vIHdlIHdvdWxkIGtlZXAgYWRkaW5nIG1vcmUgbm9uLWJyZWFraW5nIHNwYWNlcyB0byBlbGVtZW50J3MgY29udGVudCAoYmVjYXVzZSBlbGVtZW50J3MgY29udGVudHMgc3Vydml2ZVxyXG5cdFx0XHRcdC8vIGlubmVySFRNTCBjaGFuZ2VzLCBidXQgcGlja2VyIGluc3RhbmNlcyBkb24ndClcclxuXHRcdFx0XHRqc2MucmVtb3ZlQ2hpbGRyZW4odGhpcy50YXJnZXRFbGVtZW50KTtcclxuXHJcblx0XHRcdFx0Ly8gbGV0J3MgaW5zZXJ0IGEgbm9uLWJyZWFraW5nIHNwYWNlXHJcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdcXHhhMCcpKTtcclxuXHJcblx0XHRcdFx0Ly8gc2V0IG1pbi13aWR0aCA9IHByZXZpZXdTaXplLCBpZiBub3QgYWxyZWFkeSBncmVhdGVyXHJcblx0XHRcdFx0dmFyIGNvbXBTdHlsZSA9IGpzYy5nZXRDb21wU3R5bGUodGhpcy50YXJnZXRFbGVtZW50KTtcclxuXHRcdFx0XHR2YXIgY3Vyck1pbldpZHRoID0gcGFyc2VGbG9hdChjb21wU3R5bGVbJ21pbi13aWR0aCddKSB8fCAwO1xyXG5cdFx0XHRcdGlmIChjdXJyTWluV2lkdGggPCB0aGlzLnByZXZpZXdTaXplKSB7XHJcblx0XHRcdFx0XHRqc2Muc2V0U3R5bGUodGhpcy50YXJnZXRFbGVtZW50LCB7XHJcblx0XHRcdFx0XHRcdCdtaW4td2lkdGgnOiB0aGlzLnByZXZpZXdTaXplICsgJ3B4JyxcclxuXHRcdFx0XHRcdH0sIHRoaXMuZm9yY2VTdHlsZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSB2YWx1ZSBlbGVtZW50XHJcblx0XHRpZiAodGhpcy52YWx1ZUVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRpZiAoanNjLmlzVGV4dElucHV0KHRoaXMudGFyZ2V0RWxlbWVudCkpIHtcclxuXHRcdFx0XHQvLyBmb3IgdGV4dCBpbnB1dHMsIGRlZmF1bHQgdmFsdWVFbGVtZW50IGlzIHRhcmdldEVsZW1lbnRcclxuXHRcdFx0XHR0aGlzLnZhbHVlRWxlbWVudCA9IHRoaXMudGFyZ2V0RWxlbWVudDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBsZWF2ZSBpdCB1bmRlZmluZWRcclxuXHRcdFx0fVxyXG5cclxuXHRcdH0gZWxzZSBpZiAodGhpcy52YWx1ZUVsZW1lbnQgPT09IG51bGwpIHsgLy8gZXhwbGljaXRseSBzZXQgdG8gbnVsbFxyXG5cdFx0XHQvLyBsZWF2ZSBpdCBudWxsXHJcblxyXG5cdFx0fSBlbHNlIHsgLy8gZXhwbGljaXRseSBzZXQgdG8gY3VzdG9tIGVsZW1lbnRcclxuXHRcdFx0dGhpcy52YWx1ZUVsZW1lbnQgPSBqc2Mubm9kZSh0aGlzLnZhbHVlRWxlbWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBhbHBoYSBlbGVtZW50XHJcblx0XHRpZiAodGhpcy5hbHBoYUVsZW1lbnQpIHtcclxuXHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQgPSBqc2Mubm9kZSh0aGlzLmFscGhhRWxlbWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHRoZSBwcmV2aWV3IGVsZW1lbnRcclxuXHRcdGlmICh0aGlzLnByZXZpZXdFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHRoaXMudGFyZ2V0RWxlbWVudDsgLy8gZGVmYXVsdCBwcmV2aWV3RWxlbWVudCBpcyB0YXJnZXRFbGVtZW50XHJcblxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnByZXZpZXdFbGVtZW50ID09PSBudWxsKSB7IC8vIGV4cGxpY2l0bHkgc2V0IHRvIG51bGxcclxuXHRcdFx0Ly8gbGVhdmUgaXQgbnVsbFxyXG5cclxuXHRcdH0gZWxzZSB7IC8vIGV4cGxpY2l0bHkgc2V0IHRvIGN1c3RvbSBlbGVtZW50XHJcblx0XHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSBqc2Mubm9kZSh0aGlzLnByZXZpZXdFbGVtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyB2YWx1ZUVsZW1lbnRcclxuXHRcdGlmICh0aGlzLnZhbHVlRWxlbWVudCAmJiBqc2MuaXNUZXh0SW5wdXQodGhpcy52YWx1ZUVsZW1lbnQpKSB7XHJcblxyXG5cdFx0XHQvLyBJZiB0aGUgdmFsdWUgZWxlbWVudCBoYXMgb25JbnB1dCBldmVudCBhbHJlYWR5IHNldCwgd2UgbmVlZCB0byBkZXRhY2ggaXQgYW5kIGF0dGFjaCBBRlRFUiBvdXIgbGlzdGVuZXIuXHJcblx0XHRcdC8vIG90aGVyd2lzZSB0aGUgcGlja2VyIGluc3RhbmNlIHdvdWxkIHN0aWxsIGNvbnRhaW4gdGhlIG9sZCBjb2xvciB3aGVuIGFjY2Vzc2VkIGZyb20gdGhlIG9uSW5wdXQgaGFuZGxlci5cclxuXHRcdFx0dmFyIHZhbHVlRWxlbWVudE9yaWdFdmVudHMgPSB7XHJcblx0XHRcdFx0b25JbnB1dDogdGhpcy52YWx1ZUVsZW1lbnQub25pbnB1dFxyXG5cdFx0XHR9O1xyXG5cdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5vbmlucHV0ID0gbnVsbDtcclxuXHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvblZhbHVlS2V5RG93biwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvblZhbHVlQ2hhbmdlLCBmYWxzZSk7XHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25WYWx1ZUlucHV0LCBmYWxzZSk7XHJcblx0XHRcdC8vIHRoZSBvcmlnaW5hbCBldmVudCBsaXN0ZW5lciBtdXN0IGJlIGF0dGFjaGVkIEFGVEVSIG91ciBoYW5kbGVyICh0byBsZXQgaXQgZmlyc3Qgc2V0IHBpY2tlcidzIGNvbG9yKVxyXG5cdFx0XHRpZiAodmFsdWVFbGVtZW50T3JpZ0V2ZW50cy5vbklucHV0KSB7XHJcblx0XHRcdFx0dGhpcy52YWx1ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB2YWx1ZUVsZW1lbnRPcmlnRXZlbnRzLm9uSW5wdXQsIGZhbHNlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhpcy52YWx1ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7XHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXV0b2NvcnJlY3QnLCAnb2ZmJyk7XHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXV0b2NhcGl0YWxpemUnLCAnb2ZmJyk7XHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3BlbGxjaGVjaycsIGZhbHNlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBhbHBoYUVsZW1lbnRcclxuXHRcdGlmICh0aGlzLmFscGhhRWxlbWVudCAmJiBqc2MuaXNUZXh0SW5wdXQodGhpcy5hbHBoYUVsZW1lbnQpKSB7XHJcblx0XHRcdHRoaXMuYWxwaGFFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbkFscGhhS2V5RG93biwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLmFscGhhRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBvbkFscGhhQ2hhbmdlLCBmYWxzZSk7XHJcblx0XHRcdHRoaXMuYWxwaGFFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25BbHBoYUlucHV0LCBmYWxzZSk7XHJcblxyXG5cdFx0XHR0aGlzLmFscGhhRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTtcclxuXHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhdXRvY29ycmVjdCcsICdvZmYnKTtcclxuXHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhdXRvY2FwaXRhbGl6ZScsICdvZmYnKTtcclxuXHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdzcGVsbGNoZWNrJywgZmFsc2UpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGRldGVybWluZSBpbml0aWFsIGNvbG9yIHZhbHVlXHJcblx0XHQvL1xyXG5cdFx0dmFyIGluaXRWYWx1ZSA9ICdGRkZGRkYnO1xyXG5cclxuXHRcdGlmICh0aGlzLnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aW5pdFZhbHVlID0gdGhpcy52YWx1ZTsgLy8gZ2V0IGluaXRpYWwgY29sb3IgZnJvbSB0aGUgJ3ZhbHVlJyBwcm9wZXJ0eVxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLnZhbHVlRWxlbWVudCAmJiB0aGlzLnZhbHVlRWxlbWVudC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGluaXRWYWx1ZSA9IHRoaXMudmFsdWVFbGVtZW50LnZhbHVlOyAvLyBnZXQgaW5pdGlhbCBjb2xvciBmcm9tIHZhbHVlRWxlbWVudCdzIHZhbHVlXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZGV0ZXJtaW5lIGluaXRpYWwgYWxwaGEgdmFsdWVcclxuXHRcdC8vXHJcblx0XHR2YXIgaW5pdEFscGhhID0gdW5kZWZpbmVkO1xyXG5cclxuXHRcdGlmICh0aGlzLmFscGhhICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aW5pdEFscGhhID0gKCcnK3RoaXMuYWxwaGEpOyAvLyBnZXQgaW5pdGlhbCBhbHBoYSB2YWx1ZSBmcm9tIHRoZSAnYWxwaGEnIHByb3BlcnR5XHJcblx0XHR9IGVsc2UgaWYgKHRoaXMuYWxwaGFFbGVtZW50ICYmIHRoaXMuYWxwaGFFbGVtZW50LnZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aW5pdEFscGhhID0gdGhpcy5hbHBoYUVsZW1lbnQudmFsdWU7IC8vIGdldCBpbml0aWFsIGNvbG9yIGZyb20gYWxwaGFFbGVtZW50J3MgdmFsdWVcclxuXHRcdH1cclxuXHJcblx0XHQvLyBkZXRlcm1pbmUgY3VycmVudCBmb3JtYXQgYmFzZWQgb24gdGhlIGluaXRpYWwgY29sb3IgdmFsdWVcclxuXHRcdC8vXHJcblx0XHR0aGlzLl9jdXJyZW50Rm9ybWF0ID0gbnVsbDtcclxuXHJcblx0XHRpZiAoWydhdXRvJywgJ2FueSddLmluZGV4T2YodGhpcy5mb3JtYXQudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xyXG5cdFx0XHQvLyBmb3JtYXQgaXMgJ2F1dG8nIG9yICdhbnknIC0+IGxldCdzIGF1dG8tZGV0ZWN0IGN1cnJlbnQgZm9ybWF0XHJcblx0XHRcdHZhciBjb2xvciA9IGpzYy5wYXJzZUNvbG9yU3RyaW5nKGluaXRWYWx1ZSk7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnRGb3JtYXQgPSBjb2xvciA/IGNvbG9yLmZvcm1hdCA6ICdoZXgnO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gZm9ybWF0IGlzIHNwZWNpZmllZFxyXG5cdFx0XHR0aGlzLl9jdXJyZW50Rm9ybWF0ID0gdGhpcy5mb3JtYXQudG9Mb3dlckNhc2UoKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Ly8gbGV0J3MgcGFyc2UgdGhlIGluaXRpYWwgY29sb3IgdmFsdWUgYW5kIGV4cG9zZSBjb2xvcidzIHByZXZpZXdcclxuXHRcdHRoaXMucHJvY2Vzc1ZhbHVlSW5wdXQoaW5pdFZhbHVlKTtcclxuXHJcblx0XHQvLyBsZXQncyBhbHNvIHBhcnNlIGFuZCBleHBvc2UgdGhlIGluaXRpYWwgYWxwaGEgdmFsdWUsIGlmIGFueVxyXG5cdFx0Ly9cclxuXHRcdC8vIE5vdGU6IElmIHRoZSBpbml0aWFsIGNvbG9yIHZhbHVlIGNvbnRhaW5zIGFscGhhIHZhbHVlIGluIGl0IChlLmcuIGluIHJnYmEgZm9ybWF0KSxcclxuXHRcdC8vIHRoaXMgd2lsbCBvdmVyd3JpdGUgaXQuIFNvIHdlIHNob3VsZCBvbmx5IHByb2Nlc3MgYWxwaGEgaW5wdXQgaWYgdGhlcmUgd2FzIGFueSBpbml0aWFsXHJcblx0XHQvLyBhbHBoYSBleHBsaWNpdGx5IHNldCwgb3RoZXJ3aXNlIHdlIGNvdWxkIG5lZWRsZXNzbHkgbG9zZSBpbml0aWFsIHZhbHVlJ3MgYWxwaGFcclxuXHRcdGlmIChpbml0QWxwaGEgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLnByb2Nlc3NBbHBoYUlucHV0KGluaXRBbHBoYSk7XHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn07XHJcblxyXG5cclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4vLyBQdWJsaWMgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xyXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcblxyXG4vL1xyXG4vLyBUaGVzZSB3aWxsIGJlIHB1YmxpY2x5IGF2YWlsYWJsZSB2aWEganNjb2xvci48bmFtZT4gYW5kIEpTQ29sb3IuPG5hbWU+XHJcbi8vXHJcblxyXG5cclxuLy8gY2xhc3MgdGhhdCB3aWxsIGJlIHNldCB0byBlbGVtZW50cyBoYXZpbmcganNjb2xvciBpbnN0YWxsZWQgb24gdGhlbVxyXG5qc2MucHViLmNsYXNzTmFtZSA9ICdqc2NvbG9yJztcclxuXHJcblxyXG4vLyBjbGFzcyB0aGF0IHdpbGwgYmUgc2V0IHRvIGVsZW1lbnRzIGhhdmluZyBqc2NvbG9yIGFjdGl2ZSBvbiB0aGVtXHJcbmpzYy5wdWIuYWN0aXZlQ2xhc3NOYW1lID0gJ2pzY29sb3ItYWN0aXZlJztcclxuXHJcblxyXG4vLyB3aGV0aGVyIHRvIHRyeSB0byBwYXJzZSB0aGUgb3B0aW9ucyBzdHJpbmcgYnkgZXZhbHVhdGluZyBpdCB1c2luZyAnbmV3IEZ1bmN0aW9uKCknXHJcbi8vIGluIGNhc2UgaXQgY291bGQgbm90IGJlIHBhcnNlZCB3aXRoIEpTT04ucGFyc2UoKVxyXG5qc2MucHViLmxvb3NlSlNPTiA9IHRydWU7XHJcblxyXG5cclxuLy8gcHJlc2V0c1xyXG5qc2MucHViLnByZXNldHMgPSB7fTtcclxuXHJcbi8vIGJ1aWx0LWluIHByZXNldHNcclxuanNjLnB1Yi5wcmVzZXRzWydkZWZhdWx0J10gPSB7fTsgLy8gYmFzZWxpbmUgZm9yIGN1c3RvbWl6YXRpb25cclxuXHJcbmpzYy5wdWIucHJlc2V0c1snbGlnaHQnXSA9IHsgLy8gZGVmYXVsdCBjb2xvciBzY2hlbWVcclxuXHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyxcclxuXHRjb250cm9sQm9yZGVyQ29sb3I6ICdyZ2JhKDE4NywxODcsMTg3LDEpJyxcclxuXHRidXR0b25Db2xvcjogJ3JnYmEoMCwwLDAsMSknLFxyXG59O1xyXG5qc2MucHViLnByZXNldHNbJ2RhcmsnXSA9IHtcclxuXHRiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDUxLDUxLDUxLDEpJyxcclxuXHRjb250cm9sQm9yZGVyQ29sb3I6ICdyZ2JhKDE1MywxNTMsMTUzLDEpJyxcclxuXHRidXR0b25Db2xvcjogJ3JnYmEoMjQwLDI0MCwyNDAsMSknLFxyXG59O1xyXG5cclxuanNjLnB1Yi5wcmVzZXRzWydzbWFsbCddID0geyB3aWR0aDoxMDEsIGhlaWdodDoxMDEsIHBhZGRpbmc6MTAsIHNsaWRlclNpemU6MTQgfTtcclxuanNjLnB1Yi5wcmVzZXRzWydtZWRpdW0nXSA9IHsgd2lkdGg6MTgxLCBoZWlnaHQ6MTAxLCBwYWRkaW5nOjEyLCBzbGlkZXJTaXplOjE2IH07IC8vIGRlZmF1bHQgc2l6ZVxyXG5qc2MucHViLnByZXNldHNbJ2xhcmdlJ10gPSB7IHdpZHRoOjI3MSwgaGVpZ2h0OjE1MSwgcGFkZGluZzoxMiwgc2xpZGVyU2l6ZToyNCB9O1xyXG5cclxuanNjLnB1Yi5wcmVzZXRzWyd0aGluJ10gPSB7IGJvcmRlcldpZHRoOjEsIGNvbnRyb2xCb3JkZXJXaWR0aDoxLCBwb2ludGVyQm9yZGVyV2lkdGg6MSB9OyAvLyBkZWZhdWx0IHRoaWNrbmVzc1xyXG5qc2MucHViLnByZXNldHNbJ3RoaWNrJ10gPSB7IGJvcmRlcldpZHRoOjIsIGNvbnRyb2xCb3JkZXJXaWR0aDoyLCBwb2ludGVyQm9yZGVyV2lkdGg6MiB9O1xyXG5cclxuXHJcbi8vIHNpemUgb2Ygc3BhY2UgaW4gdGhlIHNsaWRlcnNcclxuanNjLnB1Yi5zbGlkZXJJbm5lclNwYWNlID0gMzsgLy8gcHhcclxuXHJcbi8vIHRyYW5zcGFyZW5jeSBjaGVzc2JvYXJkXHJcbmpzYy5wdWIuY2hlc3Nib2FyZFNpemUgPSA4OyAvLyBweFxyXG5qc2MucHViLmNoZXNzYm9hcmRDb2xvcjEgPSAnIzY2NjY2Nic7XHJcbmpzYy5wdWIuY2hlc3Nib2FyZENvbG9yMiA9ICcjOTk5OTk5JztcclxuXHJcbi8vIHByZXZpZXcgc2VwYXJhdG9yXHJcbmpzYy5wdWIucHJldmlld1NlcGFyYXRvciA9IFsncmdiYSgyNTUsMjU1LDI1NSwuNjUpJywgJ3JnYmEoMTI4LDEyOCwxMjgsLjY1KSddO1xyXG5cclxuXHJcbi8vIEluc3RhbGxzIGpzY29sb3Igb24gY3VycmVudCBET00gdHJlZVxyXG5qc2MucHViLmluc3RhbGwgPSBmdW5jdGlvbiAocm9vdE5vZGUpIHtcclxuXHR2YXIgc3VjY2VzcyA9IHRydWU7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRqc2MuaW5zdGFsbEJ5U2VsZWN0b3IoJ1tkYXRhLWpzY29sb3JdJywgcm9vdE5vZGUpO1xyXG5cdH0gY2F0Y2ggKGUpIHtcclxuXHRcdHN1Y2Nlc3MgPSBmYWxzZTtcclxuXHRcdGNvbnNvbGUud2FybihlKTtcclxuXHR9XHJcblxyXG5cdC8vIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IHdpdGggREVQUkVDQVRFRCBpbnN0YWxsYXRpb24gdXNpbmcgY2xhc3MgbmFtZVxyXG5cdGlmIChqc2MucHViLmxvb2t1cENsYXNzKSB7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRqc2MuaW5zdGFsbEJ5U2VsZWN0b3IoXHJcblx0XHRcdFx0KFxyXG5cdFx0XHRcdFx0J2lucHV0LicgKyBqc2MucHViLmxvb2t1cENsYXNzICsgJywgJyArXHJcblx0XHRcdFx0XHQnYnV0dG9uLicgKyBqc2MucHViLmxvb2t1cENsYXNzXHJcblx0XHRcdFx0KSxcclxuXHRcdFx0XHRyb290Tm9kZVxyXG5cdFx0XHQpO1xyXG5cdFx0fSBjYXRjaCAoZSkge31cclxuXHR9XHJcblxyXG5cdHJldHVybiBzdWNjZXNzO1xyXG59O1xyXG5cclxuXHJcbi8vIFRyaWdnZXJzIGdpdmVuIGlucHV0IGV2ZW50KHMpIChlLmcuICdpbnB1dCcgb3IgJ2NoYW5nZScpIG9uIGFsbCBjb2xvciBwaWNrZXJzLlxyXG4vL1xyXG4vLyBJdCBpcyBwb3NzaWJsZSB0byBzcGVjaWZ5IG11bHRpcGxlIGV2ZW50cyBzZXBhcmF0ZWQgd2l0aCBhIHNwYWNlLlxyXG4vLyBJZiBjYWxsZWQgYmVmb3JlIGpzY29sb3IgaXMgaW5pdGlhbGl6ZWQsIHRoZW4gdGhlIGV2ZW50cyB3aWxsIGJlIHRyaWdnZXJlZCBhZnRlciBpbml0aWFsaXphdGlvbi5cclxuLy9cclxuanNjLnB1Yi50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMpIHtcclxuXHRpZiAoanNjLmluaXRpYWxpemVkKSB7XHJcblx0XHRqc2MudHJpZ2dlckdsb2JhbChldmVudE5hbWVzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0anNjLnRyaWdnZXJRdWV1ZS5wdXNoKGV2ZW50TmFtZXMpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG4vLyBIaWRlcyBjdXJyZW50IGNvbG9yIHBpY2tlciBib3hcclxuanNjLnB1Yi5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG5cdGlmIChqc2MucGlja2VyICYmIGpzYy5waWNrZXIub3duZXIpIHtcclxuXHRcdGpzYy5waWNrZXIub3duZXIuaGlkZSgpO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG4vLyBSZXR1cm5zIGEgZGF0YSBVUkwgb2YgYSBncmF5IGNoZXNzYm9hcmQgaW1hZ2UgdGhhdCBpbmRpY2F0ZXMgdHJhbnNwYXJlbmN5XHJcbmpzYy5wdWIuY2hlc3Nib2FyZCA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG5cdGlmICghY29sb3IpIHtcclxuXHRcdGNvbG9yID0gJ3JnYmEoMCwwLDAsMCknO1xyXG5cdH1cclxuXHR2YXIgcHJldmlldyA9IGpzYy5nZW5Db2xvclByZXZpZXdDYW52YXMoY29sb3IpO1xyXG5cdHJldHVybiBwcmV2aWV3LmNhbnZhcy50b0RhdGFVUkwoKTtcclxufTtcclxuXHJcblxyXG4vLyBSZXR1cm5zIGEgZGF0YSBVUkwgb2YgYSBncmF5IGNoZXNzYm9hcmQgaW1hZ2UgdGhhdCBpbmRpY2F0ZXMgdHJhbnNwYXJlbmN5XHJcbmpzYy5wdWIuYmFja2dyb3VuZCA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG5cdHZhciBiYWNrZ3JvdW5kcyA9IFtdO1xyXG5cclxuXHQvLyBDU1MgZ3JhZGllbnQgZm9yIGJhY2tncm91bmQgY29sb3IgcHJldmlld1xyXG5cdGJhY2tncm91bmRzLnB1c2goanNjLmdlbkNvbG9yUHJldmlld0dyYWRpZW50KGNvbG9yKSk7XHJcblxyXG5cdC8vIGRhdGEgVVJMIG9mIGdlbmVyYXRlZCBQTkcgaW1hZ2Ugd2l0aCBhIGdyYXkgdHJhbnNwYXJlbmN5IGNoZXNzYm9hcmRcclxuXHR2YXIgcHJldmlldyA9IGpzYy5nZW5Db2xvclByZXZpZXdDYW52YXMoKTtcclxuXHRiYWNrZ3JvdW5kcy5wdXNoKFtcclxuXHRcdCd1cmwoXFwnJyArIHByZXZpZXcuY2FudmFzLnRvRGF0YVVSTCgpICsgJ1xcJyknLFxyXG5cdFx0J2xlZnQgdG9wJyxcclxuXHRcdCdyZXBlYXQnLFxyXG5cdF0uam9pbignICcpKTtcclxuXHJcblx0cmV0dXJuIGJhY2tncm91bmRzLmpvaW4oJywgJyk7XHJcbn07XHJcblxyXG5cclxuLy9cclxuLy8gREVQUkVDQVRFRCBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXHJcbi8vXHJcblxyXG5cclxuLy8gREVQUkVDQVRFRC4gVXNlIGpzY29sb3IucHJlc2V0cy5kZWZhdWx0IGluc3RlYWQuXHJcbi8vXHJcbi8vIEN1c3RvbSBkZWZhdWx0IG9wdGlvbnMgZm9yIGFsbCBjb2xvciBwaWNrZXJzLCBlLmcuIHsgaGFzaDogdHJ1ZSwgd2lkdGg6IDMwMCB9XHJcbmpzYy5wdWIub3B0aW9ucyA9IHt9O1xyXG5cclxuXHJcbi8vIERFUFJFQ0FURUQuIFVzZSBkYXRhLWpzY29sb3IgYXR0cmlidXRlIGluc3RlYWQsIHdoaWNoIGluc3RhbGxzIGpzY29sb3Igb24gZ2l2ZW4gZWxlbWVudC5cclxuLy9cclxuLy8gQnkgZGVmYXVsdCwgd2UnbGwgc2VhcmNoIGZvciBhbGwgZWxlbWVudHMgd2l0aCBjbGFzcz1cImpzY29sb3JcIiBhbmQgaW5zdGFsbCBhIGNvbG9yIHBpY2tlciBvbiB0aGVtLlxyXG4vL1xyXG4vLyBZb3UgY2FuIGNoYW5nZSB3aGF0IGNsYXNzIG5hbWUgd2lsbCBiZSBsb29rZWQgZm9yIGJ5IHNldHRpbmcgdGhlIHByb3BlcnR5IGpzY29sb3IubG9va3VwQ2xhc3NcclxuLy8gYW55d2hlcmUgaW4geW91ciBIVE1MIGRvY3VtZW50LiBUbyBjb21wbGV0ZWx5IGRpc2FibGUgdGhlIGF1dG9tYXRpYyBsb29rdXAsIHNldCBpdCB0byBudWxsLlxyXG4vL1xyXG5qc2MucHViLmxvb2t1cENsYXNzID0gJ2pzY29sb3InO1xyXG5cclxuXHJcbi8vIERFUFJFQ0FURUQuIFVzZSBqc2NvbG9yLmluc3RhbGwoKSBpbnN0ZWFkXHJcbi8vXHJcbmpzYy5wdWIuaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRjb25zb2xlLndhcm4oJ2pzY29sb3IuaW5pdCgpIGlzIERFUFJFQ0FURUQuIFVzaW5nIGpzY29sb3IuaW5zdGFsbCgpIGluc3RlYWQuJyArIGpzYy5kb2NzUmVmKTtcclxuXHRyZXR1cm4ganNjLnB1Yi5pbnN0YWxsKCk7XHJcbn07XHJcblxyXG5cclxuLy8gREVQUkVDQVRFRC4gVXNlIGRhdGEtanNjb2xvciBhdHRyaWJ1dGUgaW5zdGVhZCwgd2hpY2ggaW5zdGFsbHMganNjb2xvciBvbiBnaXZlbiBlbGVtZW50LlxyXG4vL1xyXG4vLyBJbnN0YWxsIGpzY29sb3Igb24gYWxsIGVsZW1lbnRzIHRoYXQgaGF2ZSB0aGUgc3BlY2lmaWVkIGNsYXNzIG5hbWVcclxuanNjLnB1Yi5pbnN0YWxsQnlDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc29sZS5lcnJvcignanNjb2xvci5pbnN0YWxsQnlDbGFzc05hbWUoKSBpcyBERVBSRUNBVEVELiBVc2UgZGF0YS1qc2NvbG9yPVwiXCIgYXR0cmlidXRlIGluc3RlYWQgb2YgYSBjbGFzcyBuYW1lLicgKyBqc2MuZG9jc1JlZik7XHJcblx0cmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuXHJcbmpzYy5yZWdpc3RlcigpO1xyXG5cclxuXHJcbnJldHVybiBqc2MucHViO1xyXG5cclxuXHJcbn0pKCk7IC8vIEVORCB3aW5kb3cuanNjb2xvclxyXG5cclxud2luZG93LkpTQ29sb3IgPSB3aW5kb3cuanNjb2xvcjsgLy8gJ0pTQ29sb3InIGlzIGFuIGFsaWFzIHRvICdqc2NvbG9yJ1xyXG5cclxufSAvLyBlbmRpZlxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFVQSxVQUFJLGtCQUFrQjtBQUd0QixVQUFJLE1BQU0sSUFBSTtBQUdkLFVBQUksWUFBWTtBQUdoQixVQUFJLFNBQVM7QUFHYixVQUFJLGFBQWE7QUFHakIsVUFBSSxhQUFhO0FBR2pCLFVBQUksWUFBWTtBQUdoQixVQUFJLGVBQWU7QUFHbkIsVUFBSSxhQUFhLE9BQU8sVUFBVSxZQUFZLFVBQVUsT0FBTyxXQUFXLFVBQVU7QUFHcEYsVUFBSSxXQUFXLE9BQU8sUUFBUSxZQUFZLFFBQVEsS0FBSyxXQUFXLFVBQVU7QUFHNUUsVUFBSSxPQUFPLGNBQWMsWUFBWSxTQUFTO0FBRzlDLFVBQUksY0FBYyxPQUFPO0FBT3pCLFVBQUksaUJBQWlCLFlBQVk7QUFHakMsVUFBSSxZQUFZLEtBQUs7QUFBckIsVUFDSSxZQUFZLEtBQUs7QUFrQnJCLFVBQUksTUFBTSxXQUFXO0FBQ25CLGVBQU8sS0FBSyxLQUFLO0FBQUE7QUF5RG5CLHdCQUFrQixNQUFNLE1BQU0sU0FBUztBQUNyQyxZQUFJLFVBQ0EsVUFDQSxTQUNBLFFBQ0EsU0FDQSxjQUNBLGlCQUFpQixHQUNqQixVQUFVLE9BQ1YsU0FBUyxPQUNULFdBQVc7QUFFZixZQUFJLE9BQU8sUUFBUSxZQUFZO0FBQzdCLGdCQUFNLElBQUksVUFBVTtBQUFBO0FBRXRCLGVBQU8sU0FBUyxTQUFTO0FBQ3pCLFlBQUksVUFBUyxVQUFVO0FBQ3JCLG9CQUFVLENBQUMsQ0FBQyxRQUFRO0FB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QSxnQkFDUCxNQUFPLElBQUksU0FBUztBQUFBLGdCQUNwQixLQUFNLElBQUksU0FBUztBQUFBLGdCQUNuQixNQUFPLElBQUksU0FBUztBQUFBLGdCQUNwQixNQUFPLElBQUksU0FBUztBQUFBLGdCQUNwQixLQUFNLElBQUksU0FBUztBQUFBLGdCQUNuQixNQUFPLElBQUksU0FBUztBQUFBLGdCQUNwQixNQUFPLElBQUksU0FBUztBQUFBLGdCQUNwQixRQUFTLElBQUk7QUFBQSxnQkFDYixPQUFRLElBQUksU0FBUztBQUFBLGdCQUNyQixTQUFVLElBQUksU0FBUztBQUFBLGdCQUN2QixTQUFVLElBQUksU0FBUztBQUFBLGdCQUN2QixTQUFVLElBQUksU0FBUztBQUFBLGdCQUN2QixTQUFVLElBQUksU0FBUztBQUFBLGdCQUN2QixLQUFNLElBQUksU0FBUztBQUFBLGdCQUNuQixNQUFPLElBQUksU0FBUztBQUFBLGdCQUNwQixNQUFPLElBQUksU0FBUztBQUFBLGdCQUNwQixTQUFVLElBQUk7QUFBQSxnQkFDZCxTQUFVLElBQUksU0FBUztBQUFBLGdCQUN2QixVQUFXLElBQUksU0FBUztBQUFBLGdCQUN4QixVQUFXLElBQUksU0FBUztBQUFBLGdCQUN4QixVQUFXLElBQUksU0FBUztBQUFBLGdCQUN4QixNQUFPLElBQUksU0FBUztBQUFBLGdCQUNwQixPQUFRLElBQUksU0FBUztBQUFBLGdCQUNyQixPQUFRLElBQUksU0FBUztBQUFBLGdCQUNyQixVQUFXLElBQUk7QUFBQSxnQkFDZixVQUFXLElBQUksU0FBUztBQUFBLGdCQUN4QixXQUFZLElBQUksU0FBUztBQUFBLGdCQUN6QixXQUFZLElBQUksU0FBUztBQUFBLGdCQUN6QixXQUFZLElBQUksU0FBUztBQUFBLGdCQUN6QixLQUFNLElBQUksU0FBUztBQUFBLGdCQUNuQixNQUFPLElBQUksU0FBUztBQUFBO0FBR3JCLGtCQUFJLE9BQU8sSUFBSSxZQUFZLElBQUksT0FBTyxPQUFPO0FBQzdDLGtCQUFJLE9BQU8sS0FBSyxZQUFZLElBQUksT0FBTztB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
