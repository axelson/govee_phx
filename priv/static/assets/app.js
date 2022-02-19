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

  // ../deps/phoenix/priv/static/phoenix.esm.js
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
  var global2 = globalSelf || phxWindow || void 0;
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
    closeAndRetry() {
      this.close();
      this.readyState = SOCKET_STATES.connecting;
    }
    ontimeout() {
      this.onerror("timeout");
      this.closeAndRetry();
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
            this.onopen();
            this.poll();
            break;
          case 403:
            this.onerror();
            this.close();
            break;
          case 0:
          case 500:
            this.onerror();
            this.closeAndRetry();
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
          this.closeAndRetry();
        }
      });
    }
    close(_code, _reason) {
      this.readyState = SOCKET_STATES.closed;
      this.onclose();
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
    dispatchEvent(target, eventString, detail = {}) {
      let event = new CustomEvent(eventString, { bubbles: true, cancelable: true, detail });
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
        DOM.mergeAttrs(target, source, { except: ["value"] });
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
      this.__liveSocket = view.liveSocket;
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
    exec_dispatch(eventType, phxEvent, view, sourceEl, el, { to, event, detail }) {
      dom_default.dispatchEvent(el, event, detail);
    },
    exec_push(eventType, phxEvent, view, sourceEl, el, args) {
      let { event, data, target, page_loading, loading, value } = args;
      let pushOpts = { loading, value, target, page_loading: !!page_loading };
      let targetSrc = eventType === "change" ? sourceEl.form : sourceEl;
      let phxTarget = target || targetSrc.getAttribute(view.binding("target")) || targetSrc;
      view.withinTargets(phxTarget, (targetView, targetCtx) => {
        if (eventType === "change") {
          let { newCid, _target, callback } = args;
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
      let keepSets = sets.filter(([attr, _val]) => !this.hasSet(prevSets, attr) && !el.attributes.getNamedItem(attr));
      let keepRemoves = removes.filter((attr) => prevRemoves.indexOf(attr) < 0 && el.attributes.getNamedItem(attr));
      let newSets = prevSets.filter(([attr, _val]) => removes.indexOf(attr) < 0).concat(keepSets);
      let newRemoves = prevRemoves.filter((attr) => !this.hasSet(sets, attr)).concat(keepRemoves);
      dom_default.putSticky(el, "attrs", (currentEl) => {
        newRemoves.forEach((attr) => currentEl.removeAttribute(attr));
        newSets.forEach(([attr, val]) => currentEl.setAttribute(attr, val));
        return [newSets, newRemoves];
      });
    },
    hasSet(sets, nameSearch) {
      return sets.find(([name, val]) => name === nameSearch);
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
  var serializeForm = (form, meta = {}) => {
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
      params.append(key, val);
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
        components.concat(parent).forEach((el) => {
          let cid = this.componentID(el);
          if (isCid(cid) && destroyedCIDs.indexOf(cid) === -1) {
            destroyedCIDs.push(cid);
          }
          let hook = this.getHook(el);
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
      if (this.isJoinPending() || this.liveSocket.hasPendingLink()) {
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
        dom_default.dispatchEvent(window, "phx:page-loading-start", { to: this.href, kind: "error" });
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
      let formData = serializeForm(inputEl.form, { _target: opts._target });
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
        let formData = serializeForm(formEl);
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
        dom_default.dispatchEvent(inputs[0], PHX_TRACK_UPLOADS, { files: filesOrBlobs });
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
      this.linkRef = 1;
      this.clickRef = 1;
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
    enableDebug() {
      this.sessionStorage.setItem(PHX_LV_DEBUG, "true");
    }
    enableProfiling() {
      this.sessionStorage.setItem(PHX_LV_PROFILE, "true");
    }
    disableDebug() {
      this.sessionStorage.removeItem(PHX_LV_DEBUG);
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
        if (opts.timeout) {
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
      let oldMainEl = this.main.el;
      let newMainEl = dom_default.cloneNode(oldMainEl, "");
      this.main.showLoader(this.loaderTimeout);
      this.main.destroy();
      this.main = this.newRootView(newMainEl, flash);
      this.main.setRedirect(href);
      this.transitionRemoves();
      this.main.join((joinCount, onDone) => {
        if (joinCount === 1 && this.commitPendingLink(linkRef)) {
          this.requestDOMUpdate(() => {
            dom_default.findPhxSticky(document).forEach((el) => newMainEl.appendChild(el));
            oldMainEl.replaceWith(newMainEl);
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
        if (event.code === 1e3 && this.main) {
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
      this.bindClick("click", "click", false);
      this.bindClick("mousedown", "capture-click", true);
    }
    bindClick(eventName, bindingName, capture) {
      let click = this.binding(bindingName);
      window.addEventListener(eventName, (e) => {
        if (!this.isConnected()) {
          return;
        }
        this.clickRef++;
        let clickRefWas = this.clickRef;
        let target = null;
        if (capture) {
          target = e.target.matches(`[${click}]`) ? e.target : e.target.querySelector(`[${click}]`);
        } else {
          target = closestPhxBinding(e.target, click);
          this.dispatchClickAway(e, clickRefWas);
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
    dispatchClickAway(e, clickRefWas) {
      let phxClickAway = this.binding("click-away");
      let phxClick = this.binding("click");
      dom_default.all(document, `[${phxClickAway}]`, (el) => {
        if (!(el.isSameNode(e.target) || el.contains(e.target))) {
          this.withinOwners(e.target, (view) => {
            let phxEvent = el.getAttribute(phxClickAway);
            if (js_default.isVisible(el)) {
              let target = e.target.closest(`[${phxClick}]`) || e.target;
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
      dom_default.dispatchEvent(window, `phx:${event}`, payload);
    }
    dispatchEvents(events) {
      events.forEach(([event, payload]) => this.dispatchEvent(event, payload));
    }
    withPageLoading(info, callback) {
      dom_default.dispatchEvent(window, "phx:page-loading-start", info);
      let done = () => dom_default.dispatchEvent(window, "phx:page-loading-stop", info);
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
          let input = e.target;
          let phxEvent = input.form && input.form.getAttribute(this.binding("change"));
          if (!phxEvent) {
            return;
          }
          if (input.type === "number" && input.validity && input.validity.badInput) {
            return;
          }
          let currentIterations = iterations;
          iterations++;
          let { at, type: lastType } = dom_default.private(input, "prev-iteration") || {};
          if (at === currentIterations - 1 && type !== lastType) {
            return;
          }
          dom_default.putPrivate(input, "prev-iteration", { at: currentIterations, type });
          this.debounce(input, e, () => {
            this.withinOwners(input.form, (view) => {
              dom_default.putPrivate(input, PHX_HAS_FOCUSED, true);
              if (!dom_default.isTextualInput(input)) {
                this.setActiveElement(input);
              }
              js_default.exec("change", phxEvent, view, input, ["push", { _target: e.target.name }]);
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
    mounted() {
      this.el.addEventListener("build", (0, import_lodash.default)((e) => {
        const ev = e.detail;
        const hex = ev.toHEXString();
        this.pushEvent("color", { hex });
      }, throttleMs));
    }
  };
  Hooks2.BrightnessSlider = {
    mounted() {
      this.el.addEventListener("input", (0, import_lodash.default)((e) => {
        const value = parseInt(e.target.value);
        this.pushEvent("brightness", { value });
      }, throttleMs));
    }
  };
  Hooks2.WhiteSlider = {
    mounted() {
      this.el.addEventListener("input", (0, import_lodash.default)((e) => {
        const value = parseInt(e.target.value);
        this.pushEvent("white-slider", { value });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL25vZGVfbW9kdWxlcy9sb2Rhc2gudGhyb3R0bGUvaW5kZXguanMiLCAiLi4vLi4vLi4vYXNzZXRzL3ZlbmRvci90b3BiYXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2h0bWwvcHJpdi9zdGF0aWMvcGhvZW5peF9odG1sLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC91dGlscy5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9wdXNoLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC90aW1lci5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvY2hhbm5lbC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvYWpheC5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXgvYXNzZXRzL2pzL3Bob2VuaXgvbG9uZ3BvbGwuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4L2Fzc2V0cy9qcy9waG9lbml4L3ByZXNlbmNlLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zZXJpYWxpemVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peC9hc3NldHMvanMvcGhvZW5peC9zb2NrZXQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvY29uc3RhbnRzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2VudHJ5X3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3V0aWxzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2Jyb3dzZXIuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvZG9tLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3VwbG9hZF9lbnRyeS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9saXZlX3VwbG9hZGVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2hvb2tzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2RvbV9wb3N0X21vcnBoX3Jlc3RvcmVyLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL25vZGVfbW9kdWxlcy9tb3JwaGRvbS9kaXN0L21vcnBoZG9tLWVzbS5qcyIsICIuLi8uLi8uLi9kZXBzL3Bob2VuaXhfbGl2ZV92aWV3L2Fzc2V0cy9qcy9waG9lbml4X2xpdmVfdmlldy9kb21fcGF0Y2guanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvcmVuZGVyZWQuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvdmlld19ob29rLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L2pzLmpzIiwgIi4uLy4uLy4uL2RlcHMvcGhvZW5peF9saXZlX3ZpZXcvYXNzZXRzL2pzL3Bob2VuaXhfbGl2ZV92aWV3L3ZpZXcuanMiLCAiLi4vLi4vLi4vZGVwcy9waG9lbml4X2xpdmVfdmlldy9hc3NldHMvanMvcGhvZW5peF9saXZlX3ZpZXcvbGl2ZV9zb2NrZXQuanMiLCAiLi4vLi4vLi4vYXNzZXRzL2pzL2FwcC5qcyIsICIuLi8uLi8uLi9hc3NldHMvanMvanNjb2xvci5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBgVHlwZUVycm9yYCBtZXNzYWdlIGZvciBcIkZ1bmN0aW9uc1wiIG1ldGhvZHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxuICogZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gVGhlIHRocm90dGxlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGBcbiAqIG1ldGhvZCB0byBjYW5jZWwgZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG9cbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxuICogc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YFxuICogdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZVxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxuICogcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLnRocm90dGxlYCBhbmQgYF8uZGVib3VuY2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCkpO1xuICpcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7ICd0cmFpbGluZyc6IGZhbHNlIH0pO1xuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIHRocm90dGxlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyB0aHJvdHRsZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRocm90dGxlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwgIi8qKlxuICogQGxpY2Vuc2UgTUlUXG4gKiB0b3BiYXIgMS4wLjAsIDIwMjEtMDEtMDZcbiAqIGh0dHBzOi8vYnV1bmd1eWVuLmdpdGh1Yi5pby90b3BiYXJcbiAqIENvcHlyaWdodCAoYykgMjAyMSBCdXUgTmd1eWVuXG4gKi9cbihmdW5jdGlvbiAod2luZG93LCBkb2N1bWVudCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTU3OTY3MVxuICAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYXN0VGltZSA9IDA7XG4gICAgdmFyIHZlbmRvcnMgPSBbXCJtc1wiLCBcIm1velwiLCBcIndlYmtpdFwiLCBcIm9cIl07XG4gICAgZm9yICh2YXIgeCA9IDA7IHggPCB2ZW5kb3JzLmxlbmd0aCAmJiAhd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZTsgKyt4KSB7XG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID1cbiAgICAgICAgd2luZG93W3ZlbmRvcnNbeF0gKyBcIlJlcXVlc3RBbmltYXRpb25GcmFtZVwiXTtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9XG4gICAgICAgIHdpbmRvd1t2ZW5kb3JzW3hdICsgXCJDYW5jZWxBbmltYXRpb25GcmFtZVwiXSB8fFxuICAgICAgICB3aW5kb3dbdmVuZG9yc1t4XSArIFwiQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lXCJdO1xuICAgIH1cbiAgICBpZiAoIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBlbGVtZW50KSB7XG4gICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB2YXIgdGltZVRvQ2FsbCA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcbiAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7XG4gICAgICAgIH0sIHRpbWVUb0NhbGwpO1xuICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcbiAgICAgICAgcmV0dXJuIGlkO1xuICAgICAgfTtcbiAgICBpZiAoIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSlcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xuICAgICAgfTtcbiAgfSkoKTtcblxuICB2YXIgY2FudmFzLFxuICAgIHByb2dyZXNzVGltZXJJZCxcbiAgICBmYWRlVGltZXJJZCxcbiAgICBjdXJyZW50UHJvZ3Jlc3MsXG4gICAgc2hvd2luZyxcbiAgICBhZGRFdmVudCA9IGZ1bmN0aW9uIChlbGVtLCB0eXBlLCBoYW5kbGVyKSB7XG4gICAgICBpZiAoZWxlbS5hZGRFdmVudExpc3RlbmVyKSBlbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgZWxzZSBpZiAoZWxlbS5hdHRhY2hFdmVudCkgZWxlbS5hdHRhY2hFdmVudChcIm9uXCIgKyB0eXBlLCBoYW5kbGVyKTtcbiAgICAgIGVsc2UgZWxlbVtcIm9uXCIgKyB0eXBlXSA9IGhhbmRsZXI7XG4gICAgfSxcbiAgICBvcHRpb25zID0ge1xuICAgICAgYXV0b1J1bjogdHJ1ZSxcbiAgICAgIGJhclRoaWNrbmVzczogMyxcbiAgICAgIGJhckNvbG9yczoge1xuICAgICAgICAwOiBcInJnYmEoMjYsICAxODgsIDE1NiwgLjkpXCIsXG4gICAgICAgIFwiLjI1XCI6IFwicmdiYSg1MiwgIDE1MiwgMjE5LCAuOSlcIixcbiAgICAgICAgXCIuNTBcIjogXCJyZ2JhKDI0MSwgMTk2LCAxNSwgIC45KVwiLFxuICAgICAgICBcIi43NVwiOiBcInJnYmEoMjMwLCAxMjYsIDM0LCAgLjkpXCIsXG4gICAgICAgIFwiMS4wXCI6IFwicmdiYSgyMTEsIDg0LCAgMCwgICAuOSlcIixcbiAgICAgIH0sXG4gICAgICBzaGFkb3dCbHVyOiAxMCxcbiAgICAgIHNoYWRvd0NvbG9yOiBcInJnYmEoMCwgICAwLCAgIDAsICAgLjYpXCIsXG4gICAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgfSxcbiAgICByZXBhaW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICBjYW52YXMuaGVpZ2h0ID0gb3B0aW9ucy5iYXJUaGlja25lc3MgKiA1OyAvLyBuZWVkIHNwYWNlIGZvciBzaGFkb3dcblxuICAgICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IG9wdGlvbnMuc2hhZG93Qmx1cjtcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9IG9wdGlvbnMuc2hhZG93Q29sb3I7XG5cbiAgICAgIHZhciBsaW5lR3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgY2FudmFzLndpZHRoLCAwKTtcbiAgICAgIGZvciAodmFyIHN0b3AgaW4gb3B0aW9ucy5iYXJDb2xvcnMpXG4gICAgICAgIGxpbmVHcmFkaWVudC5hZGRDb2xvclN0b3Aoc3RvcCwgb3B0aW9ucy5iYXJDb2xvcnNbc3RvcF0pO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IG9wdGlvbnMuYmFyVGhpY2tuZXNzO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbygwLCBvcHRpb25zLmJhclRoaWNrbmVzcyAvIDIpO1xuICAgICAgY3R4LmxpbmVUbyhcbiAgICAgICAgTWF0aC5jZWlsKGN1cnJlbnRQcm9ncmVzcyAqIGNhbnZhcy53aWR0aCksXG4gICAgICAgIG9wdGlvbnMuYmFyVGhpY2tuZXNzIC8gMlxuICAgICAgKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGxpbmVHcmFkaWVudDtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9LFxuICAgIGNyZWF0ZUNhbnZhcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICB2YXIgc3R5bGUgPSBjYW52YXMuc3R5bGU7XG4gICAgICBzdHlsZS5wb3NpdGlvbiA9IFwiZml4ZWRcIjtcbiAgICAgIHN0eWxlLnRvcCA9IHN0eWxlLmxlZnQgPSBzdHlsZS5yaWdodCA9IHN0eWxlLm1hcmdpbiA9IHN0eWxlLnBhZGRpbmcgPSAwO1xuICAgICAgc3R5bGUuekluZGV4ID0gMTAwMDAxO1xuICAgICAgc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgaWYgKG9wdGlvbnMuY2xhc3NOYW1lKSBjYW52YXMuY2xhc3NMaXN0LmFkZChvcHRpb25zLmNsYXNzTmFtZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcyk7XG4gICAgICBhZGRFdmVudCh3aW5kb3csIFwicmVzaXplXCIsIHJlcGFpbnQpO1xuICAgIH0sXG4gICAgdG9wYmFyID0ge1xuICAgICAgY29uZmlnOiBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb3B0cylcbiAgICAgICAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSBvcHRpb25zW2tleV0gPSBvcHRzW2tleV07XG4gICAgICB9LFxuICAgICAgc2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoc2hvd2luZykgcmV0dXJuO1xuICAgICAgICBzaG93aW5nID0gdHJ1ZTtcbiAgICAgICAgaWYgKGZhZGVUaW1lcklkICE9PSBudWxsKSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoZmFkZVRpbWVySWQpO1xuICAgICAgICBpZiAoIWNhbnZhcykgY3JlYXRlQ2FudmFzKCk7XG4gICAgICAgIGNhbnZhcy5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHRvcGJhci5wcm9ncmVzcygwKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuYXV0b1J1bikge1xuICAgICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgICAgcHJvZ3Jlc3NUaW1lcklkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgICAgICAgICAgIHRvcGJhci5wcm9ncmVzcyhcbiAgICAgICAgICAgICAgXCIrXCIgKyAwLjA1ICogTWF0aC5wb3coMSAtIE1hdGguc3FydChjdXJyZW50UHJvZ3Jlc3MpLCAyKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvZ3Jlc3M6IGZ1bmN0aW9uICh0bykge1xuICAgICAgICBpZiAodHlwZW9mIHRvID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gY3VycmVudFByb2dyZXNzO1xuICAgICAgICBpZiAodHlwZW9mIHRvID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgdG8gPVxuICAgICAgICAgICAgKHRvLmluZGV4T2YoXCIrXCIpID49IDAgfHwgdG8uaW5kZXhPZihcIi1cIikgPj0gMFxuICAgICAgICAgICAgICA/IGN1cnJlbnRQcm9ncmVzc1xuICAgICAgICAgICAgICA6IDApICsgcGFyc2VGbG9hdCh0byk7XG4gICAgICAgIH1cbiAgICAgICAgY3VycmVudFByb2dyZXNzID0gdG8gPiAxID8gMSA6IHRvO1xuICAgICAgICByZXBhaW50KCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50UHJvZ3Jlc3M7XG4gICAgICB9LFxuICAgICAgaGlkZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXNob3dpbmcpIHJldHVybjtcbiAgICAgICAgc2hvd2luZyA9IGZhbHNlO1xuICAgICAgICBpZiAocHJvZ3Jlc3NUaW1lcklkICE9IG51bGwpIHtcbiAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocHJvZ3Jlc3NUaW1lcklkKTtcbiAgICAgICAgICBwcm9ncmVzc1RpbWVySWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIChmdW5jdGlvbiBsb29wKCkge1xuICAgICAgICAgIGlmICh0b3BiYXIucHJvZ3Jlc3MoXCIrLjFcIikgPj0gMSkge1xuICAgICAgICAgICAgY2FudmFzLnN0eWxlLm9wYWNpdHkgLT0gMC4wNTtcbiAgICAgICAgICAgIGlmIChjYW52YXMuc3R5bGUub3BhY2l0eSA8PSAwLjA1KSB7XG4gICAgICAgICAgICAgIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgIGZhZGVUaW1lcklkID0gbnVsbDtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBmYWRlVGltZXJJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgICAgIH0pKCk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB0b3BiYXI7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRvcGJhcjtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnRvcGJhciA9IHRvcGJhcjtcbiAgfVxufS5jYWxsKHRoaXMsIHdpbmRvdywgZG9jdW1lbnQpKTtcbiIsICJcInVzZSBzdHJpY3RcIjtcblxuKGZ1bmN0aW9uKCkge1xuICB2YXIgUG9seWZpbGxFdmVudCA9IGV2ZW50Q29uc3RydWN0b3IoKTtcblxuICBmdW5jdGlvbiBldmVudENvbnN0cnVjdG9yKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiB3aW5kb3cuQ3VzdG9tRXZlbnQ7XG4gICAgLy8gSUU8PTkgU3VwcG9ydFxuICAgIGZ1bmN0aW9uIEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMpIHtcbiAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBkZXRhaWw6IHVuZGVmaW5lZH07XG4gICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KGV2ZW50LCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUsIHBhcmFtcy5kZXRhaWwpO1xuICAgICAgcmV0dXJuIGV2dDtcbiAgICB9XG4gICAgQ3VzdG9tRXZlbnQucHJvdG90eXBlID0gd2luZG93LkV2ZW50LnByb3RvdHlwZTtcbiAgICByZXR1cm4gQ3VzdG9tRXZlbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBidWlsZEhpZGRlbklucHV0KG5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGlucHV0LnR5cGUgPSBcImhpZGRlblwiO1xuICAgIGlucHV0Lm5hbWUgPSBuYW1lO1xuICAgIGlucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgcmV0dXJuIGlucHV0O1xuICB9XG5cbiAgZnVuY3Rpb24gaGFuZGxlQ2xpY2soZWxlbWVudCwgdGFyZ2V0TW9kaWZpZXJLZXkpIHtcbiAgICB2YXIgdG8gPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdG9cIiksXG4gICAgICAgIG1ldGhvZCA9IGJ1aWxkSGlkZGVuSW5wdXQoXCJfbWV0aG9kXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikpLFxuICAgICAgICBjc3JmID0gYnVpbGRIaWRkZW5JbnB1dChcIl9jc3JmX3Rva2VuXCIsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jc3JmXCIpKSxcbiAgICAgICAgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpLFxuICAgICAgICB0YXJnZXQgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcInRhcmdldFwiKTtcblxuICAgIGZvcm0ubWV0aG9kID0gKGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXRob2RcIikgPT09IFwiZ2V0XCIpID8gXCJnZXRcIiA6IFwicG9zdFwiO1xuICAgIGZvcm0uYWN0aW9uID0gdG87XG4gICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJoaWRkZW5cIjtcblxuICAgIGlmICh0YXJnZXQpIGZvcm0udGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGVsc2UgaWYgKHRhcmdldE1vZGlmaWVyS2V5KSBmb3JtLnRhcmdldCA9IFwiX2JsYW5rXCI7XG5cbiAgICBmb3JtLmFwcGVuZENoaWxkKGNzcmYpO1xuICAgIGZvcm0uYXBwZW5kQ2hpbGQobWV0aG9kKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuICAgIGZvcm0uc3VibWl0KCk7XG4gIH1cblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZWxlbWVudCA9IGUudGFyZ2V0O1xuICAgIGlmIChlLmRlZmF1bHRQcmV2ZW50ZWQpIHJldHVybjtcblxuICAgIHdoaWxlIChlbGVtZW50ICYmIGVsZW1lbnQuZ2V0QXR0cmlidXRlKSB7XG4gICAgICB2YXIgcGhvZW5peExpbmtFdmVudCA9IG5ldyBQb2x5ZmlsbEV2ZW50KCdwaG9lbml4LmxpbmsuY2xpY2snLCB7XG4gICAgICAgIFwiYnViYmxlc1wiOiB0cnVlLCBcImNhbmNlbGFibGVcIjogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICAgIGlmICghZWxlbWVudC5kaXNwYXRjaEV2ZW50KHBob2VuaXhMaW5rRXZlbnQpKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1ldGhvZFwiKSkge1xuICAgICAgICBoYW5kbGVDbGljayhlbGVtZW50LCBlLm1ldGFLZXkgfHwgZS5zaGlmdEtleSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIGZhbHNlKTtcblxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncGhvZW5peC5saW5rLmNsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgbWVzc2FnZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtY29uZmlybVwiKTtcbiAgICBpZihtZXNzYWdlICYmICF3aW5kb3cuY29uZmlybShtZXNzYWdlKSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSwgZmFsc2UpO1xufSkoKTtcbiIsICIvLyB3cmFwcyB2YWx1ZSBpbiBjbG9zdXJlIG9yIHJldHVybnMgY2xvc3VyZVxuZXhwb3J0IGxldCBjbG9zdXJlID0gKHZhbHVlKSA9PiB7XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICByZXR1cm4gdmFsdWVcbiAgfSBlbHNlIHtcbiAgICBsZXQgY2xvc3VyZSA9IGZ1bmN0aW9uICgpeyByZXR1cm4gdmFsdWUgfVxuICAgIHJldHVybiBjbG9zdXJlXG4gIH1cbn1cbiIsICJleHBvcnQgY29uc3QgZ2xvYmFsU2VsZiA9IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IG51bGxcbmV4cG9ydCBjb25zdCBwaHhXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogbnVsbFxuZXhwb3J0IGNvbnN0IGdsb2JhbCA9IGdsb2JhbFNlbGYgfHwgcGh4V2luZG93IHx8IHRoaXNcbmV4cG9ydCBjb25zdCBERUZBVUxUX1ZTTiA9IFwiMi4wLjBcIlxuZXhwb3J0IGNvbnN0IFNPQ0tFVF9TVEFURVMgPSB7Y29ubmVjdGluZzogMCwgb3BlbjogMSwgY2xvc2luZzogMiwgY2xvc2VkOiAzfVxuZXhwb3J0IGNvbnN0IERFRkFVTFRfVElNRU9VVCA9IDEwMDAwXG5leHBvcnQgY29uc3QgV1NfQ0xPU0VfTk9STUFMID0gMTAwMFxuZXhwb3J0IGNvbnN0IENIQU5ORUxfU1RBVEVTID0ge1xuICBjbG9zZWQ6IFwiY2xvc2VkXCIsXG4gIGVycm9yZWQ6IFwiZXJyb3JlZFwiLFxuICBqb2luZWQ6IFwiam9pbmVkXCIsXG4gIGpvaW5pbmc6IFwiam9pbmluZ1wiLFxuICBsZWF2aW5nOiBcImxlYXZpbmdcIixcbn1cbmV4cG9ydCBjb25zdCBDSEFOTkVMX0VWRU5UUyA9IHtcbiAgY2xvc2U6IFwicGh4X2Nsb3NlXCIsXG4gIGVycm9yOiBcInBoeF9lcnJvclwiLFxuICBqb2luOiBcInBoeF9qb2luXCIsXG4gIHJlcGx5OiBcInBoeF9yZXBseVwiLFxuICBsZWF2ZTogXCJwaHhfbGVhdmVcIlxufVxuXG5leHBvcnQgY29uc3QgVFJBTlNQT1JUUyA9IHtcbiAgbG9uZ3BvbGw6IFwibG9uZ3BvbGxcIixcbiAgd2Vic29ja2V0OiBcIndlYnNvY2tldFwiXG59XG5leHBvcnQgY29uc3QgWEhSX1NUQVRFUyA9IHtcbiAgY29tcGxldGU6IDRcbn1cbiIsICIvKipcbiAqIEluaXRpYWxpemVzIHRoZSBQdXNoXG4gKiBAcGFyYW0ge0NoYW5uZWx9IGNoYW5uZWwgLSBUaGUgQ2hhbm5lbFxuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IC0gVGhlIGV2ZW50LCBmb3IgZXhhbXBsZSBgXCJwaHhfam9pblwiYFxuICogQHBhcmFtIHtPYmplY3R9IHBheWxvYWQgLSBUaGUgcGF5bG9hZCwgZm9yIGV4YW1wbGUgYHt1c2VyX2lkOiAxMjN9YFxuICogQHBhcmFtIHtudW1iZXJ9IHRpbWVvdXQgLSBUaGUgcHVzaCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdXNoIHtcbiAgY29uc3RydWN0b3IoY2hhbm5lbCwgZXZlbnQsIHBheWxvYWQsIHRpbWVvdXQpe1xuICAgIHRoaXMuY2hhbm5lbCA9IGNoYW5uZWxcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnRcbiAgICB0aGlzLnBheWxvYWQgPSBwYXlsb2FkIHx8IGZ1bmN0aW9uICgpeyByZXR1cm4ge30gfVxuICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gbnVsbFxuICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IG51bGxcbiAgICB0aGlzLnJlY0hvb2tzID0gW11cbiAgICB0aGlzLnNlbnQgPSBmYWxzZVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0XG4gICAqL1xuICByZXNlbmQodGltZW91dCl7XG4gICAgdGhpcy50aW1lb3V0ID0gdGltZW91dFxuICAgIHRoaXMucmVzZXQoKVxuICAgIHRoaXMuc2VuZCgpXG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHNlbmQoKXtcbiAgICBpZih0aGlzLmhhc1JlY2VpdmVkKFwidGltZW91dFwiKSl7IHJldHVybiB9XG4gICAgdGhpcy5zdGFydFRpbWVvdXQoKVxuICAgIHRoaXMuc2VudCA9IHRydWVcbiAgICB0aGlzLmNoYW5uZWwuc29ja2V0LnB1c2goe1xuICAgICAgdG9waWM6IHRoaXMuY2hhbm5lbC50b3BpYyxcbiAgICAgIGV2ZW50OiB0aGlzLmV2ZW50LFxuICAgICAgcGF5bG9hZDogdGhpcy5wYXlsb2FkKCksXG4gICAgICByZWY6IHRoaXMucmVmLFxuICAgICAgam9pbl9yZWY6IHRoaXMuY2hhbm5lbC5qb2luUmVmKClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqXG4gICAqIEBwYXJhbSB7Kn0gc3RhdHVzXG4gICAqIEBwYXJhbSB7Kn0gY2FsbGJhY2tcbiAgICovXG4gIHJlY2VpdmUoc3RhdHVzLCBjYWxsYmFjayl7XG4gICAgaWYodGhpcy5oYXNSZWNlaXZlZChzdGF0dXMpKXtcbiAgICAgIGNhbGxiYWNrKHRoaXMucmVjZWl2ZWRSZXNwLnJlc3BvbnNlKVxuICAgIH1cblxuICAgIHRoaXMucmVjSG9va3MucHVzaCh7c3RhdHVzLCBjYWxsYmFja30pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcmVzZXQoKXtcbiAgICB0aGlzLmNhbmNlbFJlZkV2ZW50KClcbiAgICB0aGlzLnJlZiA9IG51bGxcbiAgICB0aGlzLnJlZkV2ZW50ID0gbnVsbFxuICAgIHRoaXMucmVjZWl2ZWRSZXNwID0gbnVsbFxuICAgIHRoaXMuc2VudCA9IGZhbHNlXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG1hdGNoUmVjZWl2ZSh7c3RhdHVzLCByZXNwb25zZSwgX3JlZn0pe1xuICAgIHRoaXMucmVjSG9va3MuZmlsdGVyKGggPT4gaC5zdGF0dXMgPT09IHN0YXR1cylcbiAgICAgIC5mb3JFYWNoKGggPT4gaC5jYWxsYmFjayhyZXNwb25zZSkpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhbmNlbFJlZkV2ZW50KCl7XG4gICAgaWYoIXRoaXMucmVmRXZlbnQpeyByZXR1cm4gfVxuICAgIHRoaXMuY2hhbm5lbC5vZmYodGhpcy5yZWZFdmVudClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuY2VsVGltZW91dCgpe1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRUaW1lcilcbiAgICB0aGlzLnRpbWVvdXRUaW1lciA9IG51bGxcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RhcnRUaW1lb3V0KCl7XG4gICAgaWYodGhpcy50aW1lb3V0VGltZXIpeyB0aGlzLmNhbmNlbFRpbWVvdXQoKSB9XG4gICAgdGhpcy5yZWYgPSB0aGlzLmNoYW5uZWwuc29ja2V0Lm1ha2VSZWYoKVxuICAgIHRoaXMucmVmRXZlbnQgPSB0aGlzLmNoYW5uZWwucmVwbHlFdmVudE5hbWUodGhpcy5yZWYpXG5cbiAgICB0aGlzLmNoYW5uZWwub24odGhpcy5yZWZFdmVudCwgcGF5bG9hZCA9PiB7XG4gICAgICB0aGlzLmNhbmNlbFJlZkV2ZW50KClcbiAgICAgIHRoaXMuY2FuY2VsVGltZW91dCgpXG4gICAgICB0aGlzLnJlY2VpdmVkUmVzcCA9IHBheWxvYWRcbiAgICAgIHRoaXMubWF0Y2hSZWNlaXZlKHBheWxvYWQpXG4gICAgfSlcblxuICAgIHRoaXMudGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRyaWdnZXIoXCJ0aW1lb3V0XCIsIHt9KVxuICAgIH0sIHRoaXMudGltZW91dClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaGFzUmVjZWl2ZWQoc3RhdHVzKXtcbiAgICByZXR1cm4gdGhpcy5yZWNlaXZlZFJlc3AgJiYgdGhpcy5yZWNlaXZlZFJlc3Auc3RhdHVzID09PSBzdGF0dXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgdHJpZ2dlcihzdGF0dXMsIHJlc3BvbnNlKXtcbiAgICB0aGlzLmNoYW5uZWwudHJpZ2dlcih0aGlzLnJlZkV2ZW50LCB7c3RhdHVzLCByZXNwb25zZX0pXG4gIH1cbn1cbiIsICIvKipcbiAqXG4gKiBDcmVhdGVzIGEgdGltZXIgdGhhdCBhY2NlcHRzIGEgYHRpbWVyQ2FsY2AgZnVuY3Rpb24gdG8gcGVyZm9ybVxuICogY2FsY3VsYXRlZCB0aW1lb3V0IHJldHJpZXMsIHN1Y2ggYXMgZXhwb25lbnRpYWwgYmFja29mZi5cbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHJlY29ubmVjdFRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHRoaXMuY29ubmVjdCgpLCBmdW5jdGlvbih0cmllcyl7XG4gKiAgIHJldHVybiBbMTAwMCwgNTAwMCwgMTAwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAqIH0pXG4gKiByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciAxMDAwXG4gKiByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciA1MDAwXG4gKiByZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gKiByZWNvbm5lY3RUaW1lci5zY2hlZHVsZVRpbWVvdXQoKSAvLyBmaXJlcyBhZnRlciAxMDAwXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRpbWVyQ2FsY1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lciB7XG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCB0aW1lckNhbGMpe1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHRoaXMudGltZXJDYWxjID0gdGltZXJDYWxjXG4gICAgdGhpcy50aW1lciA9IG51bGxcbiAgICB0aGlzLnRyaWVzID0gMFxuICB9XG5cbiAgcmVzZXQoKXtcbiAgICB0aGlzLnRyaWVzID0gMFxuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKVxuICB9XG5cbiAgLyoqXG4gICAqIENhbmNlbHMgYW55IHByZXZpb3VzIHNjaGVkdWxlVGltZW91dCBhbmQgc2NoZWR1bGVzIGNhbGxiYWNrXG4gICAqL1xuICBzY2hlZHVsZVRpbWVvdXQoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lcilcblxuICAgIHRoaXMudGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudHJpZXMgPSB0aGlzLnRyaWVzICsgMVxuICAgICAgdGhpcy5jYWxsYmFjaygpXG4gICAgfSwgdGhpcy50aW1lckNhbGModGhpcy50cmllcyArIDEpKVxuICB9XG59XG4iLCAiaW1wb3J0IHtjbG9zdXJlfSBmcm9tIFwiLi91dGlsc1wiXG5pbXBvcnQge1xuICBDSEFOTkVMX0VWRU5UUyxcbiAgQ0hBTk5FTF9TVEFURVMsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCBQdXNoIGZyb20gXCIuL3B1c2hcIlxuaW1wb3J0IFRpbWVyIGZyb20gXCIuL3RpbWVyXCJcblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRvcGljXG4gKiBAcGFyYW0geyhPYmplY3R8ZnVuY3Rpb24pfSBwYXJhbXNcbiAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hhbm5lbCB7XG4gIGNvbnN0cnVjdG9yKHRvcGljLCBwYXJhbXMsIHNvY2tldCl7XG4gICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmNsb3NlZFxuICAgIHRoaXMudG9waWMgPSB0b3BpY1xuICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShwYXJhbXMgfHwge30pXG4gICAgdGhpcy5zb2NrZXQgPSBzb2NrZXRcbiAgICB0aGlzLmJpbmRpbmdzID0gW11cbiAgICB0aGlzLmJpbmRpbmdSZWYgPSAwXG4gICAgdGhpcy50aW1lb3V0ID0gdGhpcy5zb2NrZXQudGltZW91dFxuICAgIHRoaXMuam9pbmVkT25jZSA9IGZhbHNlXG4gICAgdGhpcy5qb2luUHVzaCA9IG5ldyBQdXNoKHRoaXMsIENIQU5ORUxfRVZFTlRTLmpvaW4sIHRoaXMucGFyYW1zLCB0aGlzLnRpbWVvdXQpXG4gICAgdGhpcy5wdXNoQnVmZmVyID0gW11cbiAgICB0aGlzLnN0YXRlQ2hhbmdlUmVmcyA9IFtdXG5cbiAgICB0aGlzLnJlam9pblRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHtcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pbigpIH1cbiAgICB9LCB0aGlzLnNvY2tldC5yZWpvaW5BZnRlck1zKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VSZWZzLnB1c2godGhpcy5zb2NrZXQub25FcnJvcigoKSA9PiB0aGlzLnJlam9pblRpbWVyLnJlc2V0KCkpKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VSZWZzLnB1c2godGhpcy5zb2NrZXQub25PcGVuKCgpID0+IHtcbiAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgICAgaWYodGhpcy5pc0Vycm9yZWQoKSl7IHRoaXMucmVqb2luKCkgfVxuICAgIH0pXG4gICAgKVxuICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZShcIm9rXCIsICgpID0+IHtcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5qb2luZWRcbiAgICAgIHRoaXMucmVqb2luVGltZXIucmVzZXQoKVxuICAgICAgdGhpcy5wdXNoQnVmZmVyLmZvckVhY2gocHVzaEV2ZW50ID0+IHB1c2hFdmVudC5zZW5kKCkpXG4gICAgICB0aGlzLnB1c2hCdWZmZXIgPSBbXVxuICAgIH0pXG4gICAgdGhpcy5qb2luUHVzaC5yZWNlaXZlKFwiZXJyb3JcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmVycm9yZWRcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpIH1cbiAgICB9KVxuICAgIHRoaXMub25DbG9zZSgoKSA9PiB7XG4gICAgICB0aGlzLnJlam9pblRpbWVyLnJlc2V0KClcbiAgICAgIGlmKHRoaXMuc29ja2V0Lmhhc0xvZ2dlcigpKSB0aGlzLnNvY2tldC5sb2coXCJjaGFubmVsXCIsIGBjbG9zZSAke3RoaXMudG9waWN9ICR7dGhpcy5qb2luUmVmKCl9YClcbiAgICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5jbG9zZWRcbiAgICAgIHRoaXMuc29ja2V0LnJlbW92ZSh0aGlzKVxuICAgIH0pXG4gICAgdGhpcy5vbkVycm9yKHJlYXNvbiA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgZXJyb3IgJHt0aGlzLnRvcGljfWAsIHJlYXNvbilcbiAgICAgIGlmKHRoaXMuaXNKb2luaW5nKCkpeyB0aGlzLmpvaW5QdXNoLnJlc2V0KCkgfVxuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmVycm9yZWRcbiAgICAgIGlmKHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkpeyB0aGlzLnJlam9pblRpbWVyLnNjaGVkdWxlVGltZW91dCgpIH1cbiAgICB9KVxuICAgIHRoaXMuam9pblB1c2gucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4ge1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgYHRpbWVvdXQgJHt0aGlzLnRvcGljfSAoJHt0aGlzLmpvaW5SZWYoKX0pYCwgdGhpcy5qb2luUHVzaC50aW1lb3V0KVxuICAgICAgbGV0IGxlYXZlUHVzaCA9IG5ldyBQdXNoKHRoaXMsIENIQU5ORUxfRVZFTlRTLmxlYXZlLCBjbG9zdXJlKHt9KSwgdGhpcy50aW1lb3V0KVxuICAgICAgbGVhdmVQdXNoLnNlbmQoKVxuICAgICAgdGhpcy5zdGF0ZSA9IENIQU5ORUxfU1RBVEVTLmVycm9yZWRcbiAgICAgIHRoaXMuam9pblB1c2gucmVzZXQoKVxuICAgICAgaWYodGhpcy5zb2NrZXQuaXNDb25uZWN0ZWQoKSl7IHRoaXMucmVqb2luVGltZXIuc2NoZWR1bGVUaW1lb3V0KCkgfVxuICAgIH0pXG4gICAgdGhpcy5vbihDSEFOTkVMX0VWRU5UUy5yZXBseSwgKHBheWxvYWQsIHJlZikgPT4ge1xuICAgICAgdGhpcy50cmlnZ2VyKHRoaXMucmVwbHlFdmVudE5hbWUocmVmKSwgcGF5bG9hZClcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEpvaW4gdGhlIGNoYW5uZWxcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSB0aW1lb3V0XG4gICAqIEByZXR1cm5zIHtQdXNofVxuICAgKi9cbiAgam9pbih0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICBpZih0aGlzLmpvaW5lZE9uY2Upe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJpZWQgdG8gam9pbiBtdWx0aXBsZSB0aW1lcy4gJ2pvaW4nIGNhbiBvbmx5IGJlIGNhbGxlZCBhIHNpbmdsZSB0aW1lIHBlciBjaGFubmVsIGluc3RhbmNlXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHRpbWVvdXRcbiAgICAgIHRoaXMuam9pbmVkT25jZSA9IHRydWVcbiAgICAgIHRoaXMucmVqb2luKClcbiAgICAgIHJldHVybiB0aGlzLmpvaW5QdXNoXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEhvb2sgaW50byBjaGFubmVsIGNsb3NlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbkNsb3NlKGNhbGxiYWNrKXtcbiAgICB0aGlzLm9uKENIQU5ORUxfRVZFTlRTLmNsb3NlLCBjYWxsYmFjaylcbiAgfVxuXG4gIC8qKlxuICAgKiBIb29rIGludG8gY2hhbm5lbCBlcnJvcnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uRXJyb3IoY2FsbGJhY2spe1xuICAgIHJldHVybiB0aGlzLm9uKENIQU5ORUxfRVZFTlRTLmVycm9yLCByZWFzb24gPT4gY2FsbGJhY2socmVhc29uKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIG9uIGNoYW5uZWwgZXZlbnRzXG4gICAqXG4gICAqIFN1YnNjcmlwdGlvbiByZXR1cm5zIGEgcmVmIGNvdW50ZXIsIHdoaWNoIGNhbiBiZSB1c2VkIGxhdGVyIHRvXG4gICAqIHVuc3Vic2NyaWJlIHRoZSBleGFjdCBldmVudCBsaXN0ZW5lclxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByZWYxID0gY2hhbm5lbC5vbihcImV2ZW50XCIsIGRvX3N0dWZmKVxuICAgKiBjb25zdCByZWYyID0gY2hhbm5lbC5vbihcImV2ZW50XCIsIGRvX290aGVyX3N0dWZmKVxuICAgKiBjaGFubmVsLm9mZihcImV2ZW50XCIsIHJlZjEpXG4gICAqIC8vIFNpbmNlIHVuc3Vic2NyaXB0aW9uLCBkb19zdHVmZiB3b24ndCBmaXJlLFxuICAgKiAvLyB3aGlsZSBkb19vdGhlcl9zdHVmZiB3aWxsIGtlZXAgZmlyaW5nIG9uIHRoZSBcImV2ZW50XCJcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqIEByZXR1cm5zIHtpbnRlZ2VyfSByZWZcbiAgICovXG4gIG9uKGV2ZW50LCBjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMuYmluZGluZ1JlZisrXG4gICAgdGhpcy5iaW5kaW5ncy5wdXNoKHtldmVudCwgcmVmLCBjYWxsYmFja30pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFVuc3Vic2NyaWJlcyBvZmYgb2YgY2hhbm5lbCBldmVudHNcbiAgICpcbiAgICogVXNlIHRoZSByZWYgcmV0dXJuZWQgZnJvbSBhIGNoYW5uZWwub24oKSB0byB1bnN1YnNjcmliZSBvbmVcbiAgICogaGFuZGxlciwgb3IgcGFzcyBub3RoaW5nIGZvciB0aGUgcmVmIHRvIHVuc3Vic2NyaWJlIGFsbFxuICAgKiBoYW5kbGVycyBmb3IgdGhlIGdpdmVuIGV2ZW50LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiAvLyBVbnN1YnNjcmliZSB0aGUgZG9fc3R1ZmYgaGFuZGxlclxuICAgKiBjb25zdCByZWYxID0gY2hhbm5lbC5vbihcImV2ZW50XCIsIGRvX3N0dWZmKVxuICAgKiBjaGFubmVsLm9mZihcImV2ZW50XCIsIHJlZjEpXG4gICAqXG4gICAqIC8vIFVuc3Vic2NyaWJlIGFsbCBoYW5kbGVycyBmcm9tIGV2ZW50XG4gICAqIGNoYW5uZWwub2ZmKFwiZXZlbnRcIilcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gcmVmXG4gICAqL1xuICBvZmYoZXZlbnQsIHJlZil7XG4gICAgdGhpcy5iaW5kaW5ncyA9IHRoaXMuYmluZGluZ3MuZmlsdGVyKChiaW5kKSA9PiB7XG4gICAgICByZXR1cm4gIShiaW5kLmV2ZW50ID09PSBldmVudCAmJiAodHlwZW9mIHJlZiA9PT0gXCJ1bmRlZmluZWRcIiB8fCByZWYgPT09IGJpbmQucmVmKSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjYW5QdXNoKCl7IHJldHVybiB0aGlzLnNvY2tldC5pc0Nvbm5lY3RlZCgpICYmIHRoaXMuaXNKb2luZWQoKSB9XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZSBgZXZlbnRgIHRvIHBob2VuaXggd2l0aCB0aGUgcGF5bG9hZCBgcGF5bG9hZGAuXG4gICAqIFBob2VuaXggcmVjZWl2ZXMgdGhpcyBpbiB0aGUgYGhhbmRsZV9pbihldmVudCwgcGF5bG9hZCwgc29ja2V0KWBcbiAgICogZnVuY3Rpb24uIGlmIHBob2VuaXggcmVwbGllcyBvciBpdCB0aW1lcyBvdXQgKGRlZmF1bHQgMTAwMDBtcyksXG4gICAqIHRoZW4gb3B0aW9uYWxseSB0aGUgcmVwbHkgY2FuIGJlIHJlY2VpdmVkLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjaGFubmVsLnB1c2goXCJldmVudFwiKVxuICAgKiAgIC5yZWNlaXZlKFwib2tcIiwgcGF5bG9hZCA9PiBjb25zb2xlLmxvZyhcInBob2VuaXggcmVwbGllZDpcIiwgcGF5bG9hZCkpXG4gICAqICAgLnJlY2VpdmUoXCJlcnJvclwiLCBlcnIgPT4gY29uc29sZS5sb2coXCJwaG9lbml4IGVycm9yZWRcIiwgZXJyKSlcbiAgICogICAucmVjZWl2ZShcInRpbWVvdXRcIiwgKCkgPT4gY29uc29sZS5sb2coXCJ0aW1lZCBvdXQgcHVzaGluZ1wiKSlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXlsb2FkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbdGltZW91dF1cbiAgICogQHJldHVybnMge1B1c2h9XG4gICAqL1xuICBwdXNoKGV2ZW50LCBwYXlsb2FkLCB0aW1lb3V0ID0gdGhpcy50aW1lb3V0KXtcbiAgICBwYXlsb2FkID0gcGF5bG9hZCB8fCB7fVxuICAgIGlmKCF0aGlzLmpvaW5lZE9uY2Upe1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0cmllZCB0byBwdXNoICcke2V2ZW50fScgdG8gJyR7dGhpcy50b3BpY30nIGJlZm9yZSBqb2luaW5nLiBVc2UgY2hhbm5lbC5qb2luKCkgYmVmb3JlIHB1c2hpbmcgZXZlbnRzYClcbiAgICB9XG4gICAgbGV0IHB1c2hFdmVudCA9IG5ldyBQdXNoKHRoaXMsIGV2ZW50LCBmdW5jdGlvbiAoKXsgcmV0dXJuIHBheWxvYWQgfSwgdGltZW91dClcbiAgICBpZih0aGlzLmNhblB1c2goKSl7XG4gICAgICBwdXNoRXZlbnQuc2VuZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHB1c2hFdmVudC5zdGFydFRpbWVvdXQoKVxuICAgICAgdGhpcy5wdXNoQnVmZmVyLnB1c2gocHVzaEV2ZW50KVxuICAgIH1cblxuICAgIHJldHVybiBwdXNoRXZlbnRcbiAgfVxuXG4gIC8qKiBMZWF2ZXMgdGhlIGNoYW5uZWxcbiAgICpcbiAgICogVW5zdWJzY3JpYmVzIGZyb20gc2VydmVyIGV2ZW50cywgYW5kXG4gICAqIGluc3RydWN0cyBjaGFubmVsIHRvIHRlcm1pbmF0ZSBvbiBzZXJ2ZXJcbiAgICpcbiAgICogVHJpZ2dlcnMgb25DbG9zZSgpIGhvb2tzXG4gICAqXG4gICAqIFRvIHJlY2VpdmUgbGVhdmUgYWNrbm93bGVkZ2VtZW50cywgdXNlIHRoZSBgcmVjZWl2ZWBcbiAgICogaG9vayB0byBiaW5kIHRvIHRoZSBzZXJ2ZXIgYWNrLCBpZTpcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY2hhbm5lbC5sZWF2ZSgpLnJlY2VpdmUoXCJva1wiLCAoKSA9PiBhbGVydChcImxlZnQhXCIpIClcbiAgICpcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSB0aW1lb3V0XG4gICAqIEByZXR1cm5zIHtQdXNofVxuICAgKi9cbiAgbGVhdmUodGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgdGhpcy5yZWpvaW5UaW1lci5yZXNldCgpXG4gICAgdGhpcy5qb2luUHVzaC5jYW5jZWxUaW1lb3V0KClcblxuICAgIHRoaXMuc3RhdGUgPSBDSEFOTkVMX1NUQVRFUy5sZWF2aW5nXG4gICAgbGV0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICBpZih0aGlzLnNvY2tldC5oYXNMb2dnZXIoKSkgdGhpcy5zb2NrZXQubG9nKFwiY2hhbm5lbFwiLCBgbGVhdmUgJHt0aGlzLnRvcGljfWApXG4gICAgICB0aGlzLnRyaWdnZXIoQ0hBTk5FTF9FVkVOVFMuY2xvc2UsIFwibGVhdmVcIilcbiAgICB9XG4gICAgbGV0IGxlYXZlUHVzaCA9IG5ldyBQdXNoKHRoaXMsIENIQU5ORUxfRVZFTlRTLmxlYXZlLCBjbG9zdXJlKHt9KSwgdGltZW91dClcbiAgICBsZWF2ZVB1c2gucmVjZWl2ZShcIm9rXCIsICgpID0+IG9uQ2xvc2UoKSlcbiAgICAgIC5yZWNlaXZlKFwidGltZW91dFwiLCAoKSA9PiBvbkNsb3NlKCkpXG4gICAgbGVhdmVQdXNoLnNlbmQoKVxuICAgIGlmKCF0aGlzLmNhblB1c2goKSl7IGxlYXZlUHVzaC50cmlnZ2VyKFwib2tcIiwge30pIH1cblxuICAgIHJldHVybiBsZWF2ZVB1c2hcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkYWJsZSBtZXNzYWdlIGhvb2tcbiAgICpcbiAgICogUmVjZWl2ZXMgYWxsIGV2ZW50cyBmb3Igc3BlY2lhbGl6ZWQgbWVzc2FnZSBoYW5kbGluZ1xuICAgKiBiZWZvcmUgZGlzcGF0Y2hpbmcgdG8gdGhlIGNoYW5uZWwgY2FsbGJhY2tzLlxuICAgKlxuICAgKiBNdXN0IHJldHVybiB0aGUgcGF5bG9hZCwgbW9kaWZpZWQgb3IgdW5tb2RpZmllZFxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRcbiAgICogQHBhcmFtIHtPYmplY3R9IHBheWxvYWRcbiAgICogQHBhcmFtIHtpbnRlZ2VyfSByZWZcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIG9uTWVzc2FnZShfZXZlbnQsIHBheWxvYWQsIF9yZWYpeyByZXR1cm4gcGF5bG9hZCB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBpc01lbWJlcih0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5SZWYpe1xuICAgIGlmKHRoaXMudG9waWMgIT09IHRvcGljKXsgcmV0dXJuIGZhbHNlIH1cblxuICAgIGlmKGpvaW5SZWYgJiYgam9pblJlZiAhPT0gdGhpcy5qb2luUmVmKCkpe1xuICAgICAgaWYodGhpcy5zb2NrZXQuaGFzTG9nZ2VyKCkpIHRoaXMuc29ja2V0LmxvZyhcImNoYW5uZWxcIiwgXCJkcm9wcGluZyBvdXRkYXRlZCBtZXNzYWdlXCIsIHt0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5SZWZ9KVxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBqb2luUmVmKCl7IHJldHVybiB0aGlzLmpvaW5QdXNoLnJlZiB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByZWpvaW4odGltZW91dCA9IHRoaXMudGltZW91dCl7XG4gICAgaWYodGhpcy5pc0xlYXZpbmcoKSl7IHJldHVybiB9XG4gICAgdGhpcy5zb2NrZXQubGVhdmVPcGVuVG9waWModGhpcy50b3BpYylcbiAgICB0aGlzLnN0YXRlID0gQ0hBTk5FTF9TVEFURVMuam9pbmluZ1xuICAgIHRoaXMuam9pblB1c2gucmVzZW5kKHRpbWVvdXQpXG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRyaWdnZXIoZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pblJlZil7XG4gICAgbGV0IGhhbmRsZWRQYXlsb2FkID0gdGhpcy5vbk1lc3NhZ2UoZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pblJlZilcbiAgICBpZihwYXlsb2FkICYmICFoYW5kbGVkUGF5bG9hZCl7IHRocm93IG5ldyBFcnJvcihcImNoYW5uZWwgb25NZXNzYWdlIGNhbGxiYWNrcyBtdXN0IHJldHVybiB0aGUgcGF5bG9hZCwgbW9kaWZpZWQgb3IgdW5tb2RpZmllZFwiKSB9XG5cbiAgICBsZXQgZXZlbnRCaW5kaW5ncyA9IHRoaXMuYmluZGluZ3MuZmlsdGVyKGJpbmQgPT4gYmluZC5ldmVudCA9PT0gZXZlbnQpXG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZXZlbnRCaW5kaW5ncy5sZW5ndGg7IGkrKyl7XG4gICAgICBsZXQgYmluZCA9IGV2ZW50QmluZGluZ3NbaV1cbiAgICAgIGJpbmQuY2FsbGJhY2soaGFuZGxlZFBheWxvYWQsIHJlZiwgam9pblJlZiB8fCB0aGlzLmpvaW5SZWYoKSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHJlcGx5RXZlbnROYW1lKHJlZil7IHJldHVybiBgY2hhbl9yZXBseV8ke3JlZn1gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzQ2xvc2VkKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5jbG9zZWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNFcnJvcmVkKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5lcnJvcmVkIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzSm9pbmVkKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5qb2luZWQgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgaXNKb2luaW5nKCl7IHJldHVybiB0aGlzLnN0YXRlID09PSBDSEFOTkVMX1NUQVRFUy5qb2luaW5nIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGlzTGVhdmluZygpeyByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gQ0hBTk5FTF9TVEFURVMubGVhdmluZyB9XG59XG4iLCAiaW1wb3J0IHtcbiAgZ2xvYmFsLFxuICBYSFJfU1RBVEVTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXgge1xuXG4gIHN0YXRpYyByZXF1ZXN0KG1ldGhvZCwgZW5kUG9pbnQsIGFjY2VwdCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjayl7XG4gICAgaWYoZ2xvYmFsLlhEb21haW5SZXF1ZXN0KXtcbiAgICAgIGxldCByZXEgPSBuZXcgZ2xvYmFsLlhEb21haW5SZXF1ZXN0KCkgLy8gSUU4LCBJRTlcbiAgICAgIHRoaXMueGRvbWFpblJlcXVlc3QocmVxLCBtZXRob2QsIGVuZFBvaW50LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcmVxID0gbmV3IGdsb2JhbC5YTUxIdHRwUmVxdWVzdCgpIC8vIElFNyssIEZpcmVmb3gsIENocm9tZSwgT3BlcmEsIFNhZmFyaVxuICAgICAgdGhpcy54aHJSZXF1ZXN0KHJlcSwgbWV0aG9kLCBlbmRQb2ludCwgYWNjZXB0LCBib2R5LCB0aW1lb3V0LCBvbnRpbWVvdXQsIGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB4ZG9tYWluUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGJvZHksIHRpbWVvdXQsIG9udGltZW91dCwgY2FsbGJhY2spe1xuICAgIHJlcS50aW1lb3V0ID0gdGltZW91dFxuICAgIHJlcS5vcGVuKG1ldGhvZCwgZW5kUG9pbnQpXG4gICAgcmVxLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGxldCByZXNwb25zZSA9IHRoaXMucGFyc2VKU09OKHJlcS5yZXNwb25zZVRleHQpXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwb25zZSlcbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICAvLyBXb3JrIGFyb3VuZCBidWcgaW4gSUU5IHRoYXQgcmVxdWlyZXMgYW4gYXR0YWNoZWQgb25wcm9ncmVzcyBoYW5kbGVyXG4gICAgcmVxLm9ucHJvZ3Jlc3MgPSAoKSA9PiB7IH1cblxuICAgIHJlcS5zZW5kKGJvZHkpXG4gIH1cblxuICBzdGF0aWMgeGhyUmVxdWVzdChyZXEsIG1ldGhvZCwgZW5kUG9pbnQsIGFjY2VwdCwgYm9keSwgdGltZW91dCwgb250aW1lb3V0LCBjYWxsYmFjayl7XG4gICAgcmVxLm9wZW4obWV0aG9kLCBlbmRQb2ludCwgdHJ1ZSlcbiAgICByZXEudGltZW91dCA9IHRpbWVvdXRcbiAgICByZXEuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBhY2NlcHQpXG4gICAgcmVxLm9uZXJyb3IgPSAoKSA9PiB7IGNhbGxiYWNrICYmIGNhbGxiYWNrKG51bGwpIH1cbiAgICByZXEub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYocmVxLnJlYWR5U3RhdGUgPT09IFhIUl9TVEFURVMuY29tcGxldGUgJiYgY2FsbGJhY2spe1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLnBhcnNlSlNPTihyZXEucmVzcG9uc2VUZXh0KVxuICAgICAgICBjYWxsYmFjayhyZXNwb25zZSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYob250aW1lb3V0KXsgcmVxLm9udGltZW91dCA9IG9udGltZW91dCB9XG5cbiAgICByZXEuc2VuZChib2R5KVxuICB9XG5cbiAgc3RhdGljIHBhcnNlSlNPTihyZXNwKXtcbiAgICBpZighcmVzcCB8fCByZXNwID09PSBcIlwiKXsgcmV0dXJuIG51bGwgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlc3ApXG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICBjb25zb2xlICYmIGNvbnNvbGUubG9nKFwiZmFpbGVkIHRvIHBhcnNlIEpTT04gcmVzcG9uc2VcIiwgcmVzcClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHNlcmlhbGl6ZShvYmosIHBhcmVudEtleSl7XG4gICAgbGV0IHF1ZXJ5U3RyID0gW11cbiAgICBmb3IodmFyIGtleSBpbiBvYmope1xuICAgICAgaWYoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpeyBjb250aW51ZSB9XG4gICAgICBsZXQgcGFyYW1LZXkgPSBwYXJlbnRLZXkgPyBgJHtwYXJlbnRLZXl9WyR7a2V5fV1gIDoga2V5XG4gICAgICBsZXQgcGFyYW1WYWwgPSBvYmpba2V5XVxuICAgICAgaWYodHlwZW9mIHBhcmFtVmFsID09PSBcIm9iamVjdFwiKXtcbiAgICAgICAgcXVlcnlTdHIucHVzaCh0aGlzLnNlcmlhbGl6ZShwYXJhbVZhbCwgcGFyYW1LZXkpKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlTdHIucHVzaChlbmNvZGVVUklDb21wb25lbnQocGFyYW1LZXkpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1WYWwpKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcXVlcnlTdHIuam9pbihcIiZcIilcbiAgfVxuXG4gIHN0YXRpYyBhcHBlbmRQYXJhbXModXJsLCBwYXJhbXMpe1xuICAgIGlmKE9iamVjdC5rZXlzKHBhcmFtcykubGVuZ3RoID09PSAwKXsgcmV0dXJuIHVybCB9XG5cbiAgICBsZXQgcHJlZml4ID0gdXJsLm1hdGNoKC9cXD8vKSA/IFwiJlwiIDogXCI/XCJcbiAgICByZXR1cm4gYCR7dXJsfSR7cHJlZml4fSR7dGhpcy5zZXJpYWxpemUocGFyYW1zKX1gXG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBTT0NLRVRfU1RBVEVTLFxuICBUUkFOU1BPUlRTXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCBBamF4IGZyb20gXCIuL2FqYXhcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMb25nUG9sbCB7XG5cbiAgY29uc3RydWN0b3IoZW5kUG9pbnQpe1xuICAgIHRoaXMuZW5kUG9pbnQgPSBudWxsXG4gICAgdGhpcy50b2tlbiA9IG51bGxcbiAgICB0aGlzLnNraXBIZWFydGJlYXQgPSB0cnVlXG4gICAgdGhpcy5vbm9wZW4gPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgdGhpcy5vbmVycm9yID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25tZXNzYWdlID0gZnVuY3Rpb24gKCl7IH0gLy8gbm9vcFxuICAgIHRoaXMub25jbG9zZSA9IGZ1bmN0aW9uICgpeyB9IC8vIG5vb3BcbiAgICB0aGlzLnBvbGxFbmRwb2ludCA9IHRoaXMubm9ybWFsaXplRW5kcG9pbnQoZW5kUG9pbnQpXG4gICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nXG5cbiAgICB0aGlzLnBvbGwoKVxuICB9XG5cbiAgbm9ybWFsaXplRW5kcG9pbnQoZW5kUG9pbnQpe1xuICAgIHJldHVybiAoZW5kUG9pbnRcbiAgICAgIC5yZXBsYWNlKFwid3M6Ly9cIiwgXCJodHRwOi8vXCIpXG4gICAgICAucmVwbGFjZShcIndzczovL1wiLCBcImh0dHBzOi8vXCIpXG4gICAgICAucmVwbGFjZShuZXcgUmVnRXhwKFwiKC4qKVxcL1wiICsgVFJBTlNQT1JUUy53ZWJzb2NrZXQpLCBcIiQxL1wiICsgVFJBTlNQT1JUUy5sb25ncG9sbCkpXG4gIH1cblxuICBlbmRwb2ludFVSTCgpe1xuICAgIHJldHVybiBBamF4LmFwcGVuZFBhcmFtcyh0aGlzLnBvbGxFbmRwb2ludCwge3Rva2VuOiB0aGlzLnRva2VufSlcbiAgfVxuXG4gIGNsb3NlQW5kUmV0cnkoKXtcbiAgICB0aGlzLmNsb3NlKClcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNvbm5lY3RpbmdcbiAgfVxuXG4gIG9udGltZW91dCgpe1xuICAgIHRoaXMub25lcnJvcihcInRpbWVvdXRcIilcbiAgICB0aGlzLmNsb3NlQW5kUmV0cnkoKVxuICB9XG5cbiAgcG9sbCgpe1xuICAgIGlmKCEodGhpcy5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLm9wZW4gfHwgdGhpcy5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLmNvbm5lY3RpbmcpKXsgcmV0dXJuIH1cblxuICAgIEFqYXgucmVxdWVzdChcIkdFVFwiLCB0aGlzLmVuZHBvaW50VVJMKCksIFwiYXBwbGljYXRpb24vanNvblwiLCBudWxsLCB0aGlzLnRpbWVvdXQsIHRoaXMub250aW1lb3V0LmJpbmQodGhpcyksIChyZXNwKSA9PiB7XG4gICAgICBpZihyZXNwKXtcbiAgICAgICAgdmFyIHtzdGF0dXMsIHRva2VuLCBtZXNzYWdlc30gPSByZXNwXG4gICAgICAgIHRoaXMudG9rZW4gPSB0b2tlblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhdHVzID0gMFxuICAgICAgfVxuXG4gICAgICBzd2l0Y2goc3RhdHVzKXtcbiAgICAgICAgY2FzZSAyMDA6XG4gICAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xuICAgICAgICAgICAgLy8gVGFza3MgYXJlIHdoYXQgdGhpbmdzIGxpa2UgZXZlbnQgaGFuZGxlcnMsIHNldFRpbWVvdXQgY2FsbGJhY2tzLFxuICAgICAgICAgICAgLy8gcHJvbWlzZSByZXNvbHZlcyBhbmQgbW9yZSBhcmUgcnVuIHdpdGhpbi5cbiAgICAgICAgICAgIC8vIEluIG1vZGVybiBicm93c2VycywgdGhlcmUgYXJlIHR3byBkaWZmZXJlbnQga2luZHMgb2YgdGFza3MsXG4gICAgICAgICAgICAvLyBtaWNyb3Rhc2tzIGFuZCBtYWNyb3Rhc2tzLlxuICAgICAgICAgICAgLy8gTWljcm90YXNrcyBhcmUgbWFpbmx5IHVzZWQgZm9yIFByb21pc2VzLCB3aGlsZSBtYWNyb3Rhc2tzIGFyZVxuICAgICAgICAgICAgLy8gdXNlZCBmb3IgZXZlcnl0aGluZyBlbHNlLlxuICAgICAgICAgICAgLy8gTWljcm90YXNrcyBhbHdheXMgaGF2ZSBwcmlvcml0eSBvdmVyIG1hY3JvdGFza3MuIElmIHRoZSBKUyBlbmdpbmVcbiAgICAgICAgICAgIC8vIGlzIGxvb2tpbmcgZm9yIGEgdGFzayB0byBydW4sIGl0IHdpbGwgYWx3YXlzIHRyeSB0byBlbXB0eSB0aGVcbiAgICAgICAgICAgIC8vIG1pY3JvdGFzayBxdWV1ZSBiZWZvcmUgYXR0ZW1wdGluZyB0byBydW4gYW55dGhpbmcgZnJvbSB0aGVcbiAgICAgICAgICAgIC8vIG1hY3JvdGFzayBxdWV1ZS5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBGb3IgdGhlIFdlYlNvY2tldCB0cmFuc3BvcnQsIG1lc3NhZ2VzIGFsd2F5cyBhcnJpdmUgaW4gdGhlaXIgb3duXG4gICAgICAgICAgICAvLyBldmVudC4gVGhpcyBtZWFucyB0aGF0IGlmIGFueSBwcm9taXNlcyBhcmUgcmVzb2x2ZWQgZnJvbSB3aXRoaW4sXG4gICAgICAgICAgICAvLyB0aGVpciBjYWxsYmFja3Mgd2lsbCBhbHdheXMgZmluaXNoIGV4ZWN1dGlvbiBieSB0aGUgdGltZSB0aGVcbiAgICAgICAgICAgIC8vIG5leHQgbWVzc2FnZSBldmVudCBoYW5kbGVyIGlzIHJ1bi5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBJbiBvcmRlciB0byBlbXVsYXRlIHRoaXMgYmVoYXZpb3VyLCB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSBlYWNoXG4gICAgICAgICAgICAvLyBvbm1lc3NhZ2UgaGFuZGxlciBpcyBydW4gd2l0aGluIGl0J3Mgb3duIG1hY3JvdGFzay5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLm9ubWVzc2FnZSh7ZGF0YTogbXNnfSlcbiAgICAgICAgICAgIH0sIDApXG4gICAgICAgICAgfSlcbiAgICAgICAgICB0aGlzLnBvbGwoKVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjA0OlxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MTA6XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gU09DS0VUX1NUQVRFUy5vcGVuXG4gICAgICAgICAgdGhpcy5vbm9wZW4oKVxuICAgICAgICAgIHRoaXMucG9sbCgpXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0MDM6XG4gICAgICAgICAgdGhpcy5vbmVycm9yKClcbiAgICAgICAgICB0aGlzLmNsb3NlKClcbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgIGNhc2UgNTAwOlxuICAgICAgICAgIHRoaXMub25lcnJvcigpXG4gICAgICAgICAgdGhpcy5jbG9zZUFuZFJldHJ5KClcbiAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OiB0aHJvdyBuZXcgRXJyb3IoYHVuaGFuZGxlZCBwb2xsIHN0YXR1cyAke3N0YXR1c31gKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzZW5kKGJvZHkpe1xuICAgIEFqYXgucmVxdWVzdChcIlBPU1RcIiwgdGhpcy5lbmRwb2ludFVSTCgpLCBcImFwcGxpY2F0aW9uL2pzb25cIiwgYm9keSwgdGhpcy50aW1lb3V0LCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzLCBcInRpbWVvdXRcIiksIChyZXNwKSA9PiB7XG4gICAgICBpZighcmVzcCB8fCByZXNwLnN0YXR1cyAhPT0gMjAwKXtcbiAgICAgICAgdGhpcy5vbmVycm9yKHJlc3AgJiYgcmVzcC5zdGF0dXMpXG4gICAgICAgIHRoaXMuY2xvc2VBbmRSZXRyeSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNsb3NlKF9jb2RlLCBfcmVhc29uKXtcbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBTT0NLRVRfU1RBVEVTLmNsb3NlZFxuICAgIHRoaXMub25jbG9zZSgpXG4gIH1cbn1cbiIsICIvKipcbiAqIEluaXRpYWxpemVzIHRoZSBQcmVzZW5jZVxuICogQHBhcmFtIHtDaGFubmVsfSBjaGFubmVsIC0gVGhlIENoYW5uZWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gVGhlIG9wdGlvbnMsXG4gKiAgICAgICAgZm9yIGV4YW1wbGUgYHtldmVudHM6IHtzdGF0ZTogXCJzdGF0ZVwiLCBkaWZmOiBcImRpZmZcIn19YFxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcmVzZW5jZSB7XG5cbiAgY29uc3RydWN0b3IoY2hhbm5lbCwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZXZlbnRzID0gb3B0cy5ldmVudHMgfHwge3N0YXRlOiBcInByZXNlbmNlX3N0YXRlXCIsIGRpZmY6IFwicHJlc2VuY2VfZGlmZlwifVxuICAgIHRoaXMuc3RhdGUgPSB7fVxuICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICB0aGlzLmNoYW5uZWwgPSBjaGFubmVsXG4gICAgdGhpcy5qb2luUmVmID0gbnVsbFxuICAgIHRoaXMuY2FsbGVyID0ge1xuICAgICAgb25Kb2luOiBmdW5jdGlvbiAoKXsgfSxcbiAgICAgIG9uTGVhdmU6IGZ1bmN0aW9uICgpeyB9LFxuICAgICAgb25TeW5jOiBmdW5jdGlvbiAoKXsgfVxuICAgIH1cblxuICAgIHRoaXMuY2hhbm5lbC5vbihldmVudHMuc3RhdGUsIG5ld1N0YXRlID0+IHtcbiAgICAgIGxldCB7b25Kb2luLCBvbkxlYXZlLCBvblN5bmN9ID0gdGhpcy5jYWxsZXJcblxuICAgICAgdGhpcy5qb2luUmVmID0gdGhpcy5jaGFubmVsLmpvaW5SZWYoKVxuICAgICAgdGhpcy5zdGF0ZSA9IFByZXNlbmNlLnN5bmNTdGF0ZSh0aGlzLnN0YXRlLCBuZXdTdGF0ZSwgb25Kb2luLCBvbkxlYXZlKVxuXG4gICAgICB0aGlzLnBlbmRpbmdEaWZmcy5mb3JFYWNoKGRpZmYgPT4ge1xuICAgICAgICB0aGlzLnN0YXRlID0gUHJlc2VuY2Uuc3luY0RpZmYodGhpcy5zdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKVxuICAgICAgfSlcbiAgICAgIHRoaXMucGVuZGluZ0RpZmZzID0gW11cbiAgICAgIG9uU3luYygpXG4gICAgfSlcblxuICAgIHRoaXMuY2hhbm5lbC5vbihldmVudHMuZGlmZiwgZGlmZiA9PiB7XG4gICAgICBsZXQge29uSm9pbiwgb25MZWF2ZSwgb25TeW5jfSA9IHRoaXMuY2FsbGVyXG5cbiAgICAgIGlmKHRoaXMuaW5QZW5kaW5nU3luY1N0YXRlKCkpe1xuICAgICAgICB0aGlzLnBlbmRpbmdEaWZmcy5wdXNoKGRpZmYpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnN0YXRlID0gUHJlc2VuY2Uuc3luY0RpZmYodGhpcy5zdGF0ZSwgZGlmZiwgb25Kb2luLCBvbkxlYXZlKVxuICAgICAgICBvblN5bmMoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBvbkpvaW4oY2FsbGJhY2speyB0aGlzLmNhbGxlci5vbkpvaW4gPSBjYWxsYmFjayB9XG5cbiAgb25MZWF2ZShjYWxsYmFjayl7IHRoaXMuY2FsbGVyLm9uTGVhdmUgPSBjYWxsYmFjayB9XG5cbiAgb25TeW5jKGNhbGxiYWNrKXsgdGhpcy5jYWxsZXIub25TeW5jID0gY2FsbGJhY2sgfVxuXG4gIGxpc3QoYnkpeyByZXR1cm4gUHJlc2VuY2UubGlzdCh0aGlzLnN0YXRlLCBieSkgfVxuXG4gIGluUGVuZGluZ1N5bmNTdGF0ZSgpe1xuICAgIHJldHVybiAhdGhpcy5qb2luUmVmIHx8ICh0aGlzLmpvaW5SZWYgIT09IHRoaXMuY2hhbm5lbC5qb2luUmVmKCkpXG4gIH1cblxuICAvLyBsb3dlci1sZXZlbCBwdWJsaWMgc3RhdGljIEFQSVxuXG4gIC8qKlxuICAgKiBVc2VkIHRvIHN5bmMgdGhlIGxpc3Qgb2YgcHJlc2VuY2VzIG9uIHRoZSBzZXJ2ZXJcbiAgICogd2l0aCB0aGUgY2xpZW50J3Mgc3RhdGUuIEFuIG9wdGlvbmFsIGBvbkpvaW5gIGFuZCBgb25MZWF2ZWAgY2FsbGJhY2sgY2FuXG4gICAqIGJlIHByb3ZpZGVkIHRvIHJlYWN0IHRvIGNoYW5nZXMgaW4gdGhlIGNsaWVudCdzIGxvY2FsIHByZXNlbmNlcyBhY3Jvc3NcbiAgICogZGlzY29ubmVjdHMgYW5kIHJlY29ubmVjdHMgd2l0aCB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJlc2VuY2V9XG4gICAqL1xuICBzdGF0aWMgc3luY1N0YXRlKGN1cnJlbnRTdGF0ZSwgbmV3U3RhdGUsIG9uSm9pbiwgb25MZWF2ZSl7XG4gICAgbGV0IHN0YXRlID0gdGhpcy5jbG9uZShjdXJyZW50U3RhdGUpXG4gICAgbGV0IGpvaW5zID0ge31cbiAgICBsZXQgbGVhdmVzID0ge31cblxuICAgIHRoaXMubWFwKHN0YXRlLCAoa2V5LCBwcmVzZW5jZSkgPT4ge1xuICAgICAgaWYoIW5ld1N0YXRlW2tleV0pe1xuICAgICAgICBsZWF2ZXNba2V5XSA9IHByZXNlbmNlXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLm1hcChuZXdTdGF0ZSwgKGtleSwgbmV3UHJlc2VuY2UpID0+IHtcbiAgICAgIGxldCBjdXJyZW50UHJlc2VuY2UgPSBzdGF0ZVtrZXldXG4gICAgICBpZihjdXJyZW50UHJlc2VuY2Upe1xuICAgICAgICBsZXQgbmV3UmVmcyA9IG5ld1ByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGN1clJlZnMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMubWFwKG0gPT4gbS5waHhfcmVmKVxuICAgICAgICBsZXQgam9pbmVkTWV0YXMgPSBuZXdQcmVzZW5jZS5tZXRhcy5maWx0ZXIobSA9PiBjdXJSZWZzLmluZGV4T2YobS5waHhfcmVmKSA8IDApXG4gICAgICAgIGxldCBsZWZ0TWV0YXMgPSBjdXJyZW50UHJlc2VuY2UubWV0YXMuZmlsdGVyKG0gPT4gbmV3UmVmcy5pbmRleE9mKG0ucGh4X3JlZikgPCAwKVxuICAgICAgICBpZihqb2luZWRNZXRhcy5sZW5ndGggPiAwKXtcbiAgICAgICAgICBqb2luc1trZXldID0gbmV3UHJlc2VuY2VcbiAgICAgICAgICBqb2luc1trZXldLm1ldGFzID0gam9pbmVkTWV0YXNcbiAgICAgICAgfVxuICAgICAgICBpZihsZWZ0TWV0YXMubGVuZ3RoID4gMCl7XG4gICAgICAgICAgbGVhdmVzW2tleV0gPSB0aGlzLmNsb25lKGN1cnJlbnRQcmVzZW5jZSlcbiAgICAgICAgICBsZWF2ZXNba2V5XS5tZXRhcyA9IGxlZnRNZXRhc1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqb2luc1trZXldID0gbmV3UHJlc2VuY2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzLnN5bmNEaWZmKHN0YXRlLCB7am9pbnM6IGpvaW5zLCBsZWF2ZXM6IGxlYXZlc30sIG9uSm9pbiwgb25MZWF2ZSlcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBVc2VkIHRvIHN5bmMgYSBkaWZmIG9mIHByZXNlbmNlIGpvaW4gYW5kIGxlYXZlXG4gICAqIGV2ZW50cyBmcm9tIHRoZSBzZXJ2ZXIsIGFzIHRoZXkgaGFwcGVuLiBMaWtlIGBzeW5jU3RhdGVgLCBgc3luY0RpZmZgXG4gICAqIGFjY2VwdHMgb3B0aW9uYWwgYG9uSm9pbmAgYW5kIGBvbkxlYXZlYCBjYWxsYmFja3MgdG8gcmVhY3QgdG8gYSB1c2VyXG4gICAqIGpvaW5pbmcgb3IgbGVhdmluZyBmcm9tIGEgZGV2aWNlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJlc2VuY2V9XG4gICAqL1xuICBzdGF0aWMgc3luY0RpZmYoc3RhdGUsIGRpZmYsIG9uSm9pbiwgb25MZWF2ZSl7XG4gICAgbGV0IHtqb2lucywgbGVhdmVzfSA9IHRoaXMuY2xvbmUoZGlmZilcbiAgICBpZighb25Kb2luKXsgb25Kb2luID0gZnVuY3Rpb24gKCl7IH0gfVxuICAgIGlmKCFvbkxlYXZlKXsgb25MZWF2ZSA9IGZ1bmN0aW9uICgpeyB9IH1cblxuICAgIHRoaXMubWFwKGpvaW5zLCAoa2V5LCBuZXdQcmVzZW5jZSkgPT4ge1xuICAgICAgbGV0IGN1cnJlbnRQcmVzZW5jZSA9IHN0YXRlW2tleV1cbiAgICAgIHN0YXRlW2tleV0gPSB0aGlzLmNsb25lKG5ld1ByZXNlbmNlKVxuICAgICAgaWYoY3VycmVudFByZXNlbmNlKXtcbiAgICAgICAgbGV0IGpvaW5lZFJlZnMgPSBzdGF0ZVtrZXldLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgICAgbGV0IGN1ck1ldGFzID0gY3VycmVudFByZXNlbmNlLm1ldGFzLmZpbHRlcihtID0+IGpvaW5lZFJlZnMuaW5kZXhPZihtLnBoeF9yZWYpIDwgMClcbiAgICAgICAgc3RhdGVba2V5XS5tZXRhcy51bnNoaWZ0KC4uLmN1ck1ldGFzKVxuICAgICAgfVxuICAgICAgb25Kb2luKGtleSwgY3VycmVudFByZXNlbmNlLCBuZXdQcmVzZW5jZSlcbiAgICB9KVxuICAgIHRoaXMubWFwKGxlYXZlcywgKGtleSwgbGVmdFByZXNlbmNlKSA9PiB7XG4gICAgICBsZXQgY3VycmVudFByZXNlbmNlID0gc3RhdGVba2V5XVxuICAgICAgaWYoIWN1cnJlbnRQcmVzZW5jZSl7IHJldHVybiB9XG4gICAgICBsZXQgcmVmc1RvUmVtb3ZlID0gbGVmdFByZXNlbmNlLm1ldGFzLm1hcChtID0+IG0ucGh4X3JlZilcbiAgICAgIGN1cnJlbnRQcmVzZW5jZS5tZXRhcyA9IGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5maWx0ZXIocCA9PiB7XG4gICAgICAgIHJldHVybiByZWZzVG9SZW1vdmUuaW5kZXhPZihwLnBoeF9yZWYpIDwgMFxuICAgICAgfSlcbiAgICAgIG9uTGVhdmUoa2V5LCBjdXJyZW50UHJlc2VuY2UsIGxlZnRQcmVzZW5jZSlcbiAgICAgIGlmKGN1cnJlbnRQcmVzZW5jZS5tZXRhcy5sZW5ndGggPT09IDApe1xuICAgICAgICBkZWxldGUgc3RhdGVba2V5XVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHN0YXRlXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJlc2VuY2VzLCB3aXRoIHNlbGVjdGVkIG1ldGFkYXRhLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcHJlc2VuY2VzXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNob29zZXJcbiAgICpcbiAgICogQHJldHVybnMge1ByZXNlbmNlfVxuICAgKi9cbiAgc3RhdGljIGxpc3QocHJlc2VuY2VzLCBjaG9vc2VyKXtcbiAgICBpZighY2hvb3Nlcil7IGNob29zZXIgPSBmdW5jdGlvbiAoa2V5LCBwcmVzKXsgcmV0dXJuIHByZXMgfSB9XG5cbiAgICByZXR1cm4gdGhpcy5tYXAocHJlc2VuY2VzLCAoa2V5LCBwcmVzZW5jZSkgPT4ge1xuICAgICAgcmV0dXJuIGNob29zZXIoa2V5LCBwcmVzZW5jZSlcbiAgICB9KVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIHN0YXRpYyBtYXAob2JqLCBmdW5jKXtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqKS5tYXAoa2V5ID0+IGZ1bmMoa2V5LCBvYmpba2V5XSkpXG4gIH1cblxuICBzdGF0aWMgY2xvbmUob2JqKXsgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkob2JqKSkgfVxufVxuIiwgIi8qIFRoZSBkZWZhdWx0IHNlcmlhbGl6ZXIgZm9yIGVuY29kaW5nIGFuZCBkZWNvZGluZyBtZXNzYWdlcyAqL1xuaW1wb3J0IHtcbiAgQ0hBTk5FTF9FVkVOVFNcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuZXhwb3J0IGRlZmF1bHQge1xuICBIRUFERVJfTEVOR1RIOiAxLFxuICBNRVRBX0xFTkdUSDogNCxcbiAgS0lORFM6IHtwdXNoOiAwLCByZXBseTogMSwgYnJvYWRjYXN0OiAyfSxcblxuICBlbmNvZGUobXNnLCBjYWxsYmFjayl7XG4gICAgaWYobXNnLnBheWxvYWQuY29uc3RydWN0b3IgPT09IEFycmF5QnVmZmVyKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLmJpbmFyeUVuY29kZShtc2cpKVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcGF5bG9hZCA9IFttc2cuam9pbl9yZWYsIG1zZy5yZWYsIG1zZy50b3BpYywgbXNnLmV2ZW50LCBtc2cucGF5bG9hZF1cbiAgICAgIHJldHVybiBjYWxsYmFjayhKU09OLnN0cmluZ2lmeShwYXlsb2FkKSlcbiAgICB9XG4gIH0sXG5cbiAgZGVjb2RlKHJhd1BheWxvYWQsIGNhbGxiYWNrKXtcbiAgICBpZihyYXdQYXlsb2FkLmNvbnN0cnVjdG9yID09PSBBcnJheUJ1ZmZlcil7XG4gICAgICByZXR1cm4gY2FsbGJhY2sodGhpcy5iaW5hcnlEZWNvZGUocmF3UGF5bG9hZCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBbam9pbl9yZWYsIHJlZiwgdG9waWMsIGV2ZW50LCBwYXlsb2FkXSA9IEpTT04ucGFyc2UocmF3UGF5bG9hZClcbiAgICAgIHJldHVybiBjYWxsYmFjayh7am9pbl9yZWYsIHJlZiwgdG9waWMsIGV2ZW50LCBwYXlsb2FkfSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gcHJpdmF0ZVxuXG4gIGJpbmFyeUVuY29kZShtZXNzYWdlKXtcbiAgICBsZXQge2pvaW5fcmVmLCByZWYsIGV2ZW50LCB0b3BpYywgcGF5bG9hZH0gPSBtZXNzYWdlXG4gICAgbGV0IG1ldGFMZW5ndGggPSB0aGlzLk1FVEFfTEVOR1RIICsgam9pbl9yZWYubGVuZ3RoICsgcmVmLmxlbmd0aCArIHRvcGljLmxlbmd0aCArIGV2ZW50Lmxlbmd0aFxuICAgIGxldCBoZWFkZXIgPSBuZXcgQXJyYXlCdWZmZXIodGhpcy5IRUFERVJfTEVOR1RIICsgbWV0YUxlbmd0aClcbiAgICBsZXQgdmlldyA9IG5ldyBEYXRhVmlldyhoZWFkZXIpXG4gICAgbGV0IG9mZnNldCA9IDBcblxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIHRoaXMuS0lORFMucHVzaCkgLy8ga2luZFxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGpvaW5fcmVmLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCByZWYubGVuZ3RoKVxuICAgIHZpZXcuc2V0VWludDgob2Zmc2V0KyssIHRvcGljLmxlbmd0aClcbiAgICB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBldmVudC5sZW5ndGgpXG4gICAgQXJyYXkuZnJvbShqb2luX3JlZiwgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20ocmVmLCBjaGFyID0+IHZpZXcuc2V0VWludDgob2Zmc2V0KyssIGNoYXIuY2hhckNvZGVBdCgwKSkpXG4gICAgQXJyYXkuZnJvbSh0b3BpYywgY2hhciA9PiB2aWV3LnNldFVpbnQ4KG9mZnNldCsrLCBjaGFyLmNoYXJDb2RlQXQoMCkpKVxuICAgIEFycmF5LmZyb20oZXZlbnQsIGNoYXIgPT4gdmlldy5zZXRVaW50OChvZmZzZXQrKywgY2hhci5jaGFyQ29kZUF0KDApKSlcblxuICAgIHZhciBjb21iaW5lZCA9IG5ldyBVaW50OEFycmF5KGhlYWRlci5ieXRlTGVuZ3RoICsgcGF5bG9hZC5ieXRlTGVuZ3RoKVxuICAgIGNvbWJpbmVkLnNldChuZXcgVWludDhBcnJheShoZWFkZXIpLCAwKVxuICAgIGNvbWJpbmVkLnNldChuZXcgVWludDhBcnJheShwYXlsb2FkKSwgaGVhZGVyLmJ5dGVMZW5ndGgpXG5cbiAgICByZXR1cm4gY29tYmluZWQuYnVmZmVyXG4gIH0sXG5cbiAgYmluYXJ5RGVjb2RlKGJ1ZmZlcil7XG4gICAgbGV0IHZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyKVxuICAgIGxldCBraW5kID0gdmlldy5nZXRVaW50OCgwKVxuICAgIGxldCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKClcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIHRoaXMuS0lORFMucHVzaDogcmV0dXJuIHRoaXMuZGVjb2RlUHVzaChidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgICBjYXNlIHRoaXMuS0lORFMucmVwbHk6IHJldHVybiB0aGlzLmRlY29kZVJlcGx5KGJ1ZmZlciwgdmlldywgZGVjb2RlcilcbiAgICAgIGNhc2UgdGhpcy5LSU5EUy5icm9hZGNhc3Q6IHJldHVybiB0aGlzLmRlY29kZUJyb2FkY2FzdChidWZmZXIsIHZpZXcsIGRlY29kZXIpXG4gICAgfVxuICB9LFxuXG4gIGRlY29kZVB1c2goYnVmZmVyLCB2aWV3LCBkZWNvZGVyKXtcbiAgICBsZXQgam9pblJlZlNpemUgPSB2aWV3LmdldFVpbnQ4KDEpXG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMilcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCgzKVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyB0aGlzLk1FVEFfTEVOR1RIIC0gMSAvLyBwdXNoZXMgaGF2ZSBubyByZWZcbiAgICBsZXQgam9pblJlZiA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGpvaW5SZWZTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBqb2luUmVmU2l6ZVxuICAgIGxldCB0b3BpYyA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHRvcGljU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplXG4gICAgbGV0IGV2ZW50ID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgZXZlbnRTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemVcbiAgICBsZXQgZGF0YSA9IGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgIHJldHVybiB7am9pbl9yZWY6IGpvaW5SZWYsIHJlZjogbnVsbCwgdG9waWM6IHRvcGljLCBldmVudDogZXZlbnQsIHBheWxvYWQ6IGRhdGF9XG4gIH0sXG5cbiAgZGVjb2RlUmVwbHkoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKXtcbiAgICBsZXQgam9pblJlZlNpemUgPSB2aWV3LmdldFVpbnQ4KDEpXG4gICAgbGV0IHJlZlNpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IHRvcGljU2l6ZSA9IHZpZXcuZ2V0VWludDgoMylcbiAgICBsZXQgZXZlbnRTaXplID0gdmlldy5nZXRVaW50OCg0KVxuICAgIGxldCBvZmZzZXQgPSB0aGlzLkhFQURFUl9MRU5HVEggKyB0aGlzLk1FVEFfTEVOR1RIXG4gICAgbGV0IGpvaW5SZWYgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBqb2luUmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgam9pblJlZlNpemVcbiAgICBsZXQgcmVmID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgcmVmU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgcmVmU2l6ZVxuICAgIGxldCB0b3BpYyA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIHRvcGljU2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgdG9waWNTaXplXG4gICAgbGV0IGV2ZW50ID0gZGVjb2Rlci5kZWNvZGUoYnVmZmVyLnNsaWNlKG9mZnNldCwgb2Zmc2V0ICsgZXZlbnRTaXplKSlcbiAgICBvZmZzZXQgPSBvZmZzZXQgKyBldmVudFNpemVcbiAgICBsZXQgZGF0YSA9IGJ1ZmZlci5zbGljZShvZmZzZXQsIGJ1ZmZlci5ieXRlTGVuZ3RoKVxuICAgIGxldCBwYXlsb2FkID0ge3N0YXR1czogZXZlbnQsIHJlc3BvbnNlOiBkYXRhfVxuICAgIHJldHVybiB7am9pbl9yZWY6IGpvaW5SZWYsIHJlZjogcmVmLCB0b3BpYzogdG9waWMsIGV2ZW50OiBDSEFOTkVMX0VWRU5UUy5yZXBseSwgcGF5bG9hZDogcGF5bG9hZH1cbiAgfSxcblxuICBkZWNvZGVCcm9hZGNhc3QoYnVmZmVyLCB2aWV3LCBkZWNvZGVyKXtcbiAgICBsZXQgdG9waWNTaXplID0gdmlldy5nZXRVaW50OCgxKVxuICAgIGxldCBldmVudFNpemUgPSB2aWV3LmdldFVpbnQ4KDIpXG4gICAgbGV0IG9mZnNldCA9IHRoaXMuSEVBREVSX0xFTkdUSCArIDJcbiAgICBsZXQgdG9waWMgPSBkZWNvZGVyLmRlY29kZShidWZmZXIuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyB0b3BpY1NpemUpKVxuICAgIG9mZnNldCA9IG9mZnNldCArIHRvcGljU2l6ZVxuICAgIGxldCBldmVudCA9IGRlY29kZXIuZGVjb2RlKGJ1ZmZlci5zbGljZShvZmZzZXQsIG9mZnNldCArIGV2ZW50U2l6ZSkpXG4gICAgb2Zmc2V0ID0gb2Zmc2V0ICsgZXZlbnRTaXplXG4gICAgbGV0IGRhdGEgPSBidWZmZXIuc2xpY2Uob2Zmc2V0LCBidWZmZXIuYnl0ZUxlbmd0aClcblxuICAgIHJldHVybiB7am9pbl9yZWY6IG51bGwsIHJlZjogbnVsbCwgdG9waWM6IHRvcGljLCBldmVudDogZXZlbnQsIHBheWxvYWQ6IGRhdGF9XG4gIH1cbn1cbiIsICJpbXBvcnQge1xuICBnbG9iYWwsXG4gIHBoeFdpbmRvdyxcbiAgQ0hBTk5FTF9FVkVOVFMsXG4gIERFRkFVTFRfVElNRU9VVCxcbiAgREVGQVVMVF9WU04sXG4gIFNPQ0tFVF9TVEFURVMsXG4gIFRSQU5TUE9SVFMsXG4gIFdTX0NMT1NFX05PUk1BTFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjbG9zdXJlXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IEFqYXggZnJvbSBcIi4vYWpheFwiXG5pbXBvcnQgQ2hhbm5lbCBmcm9tIFwiLi9jaGFubmVsXCJcbmltcG9ydCBMb25nUG9sbCBmcm9tIFwiLi9sb25ncG9sbFwiXG5pbXBvcnQgU2VyaWFsaXplciBmcm9tIFwiLi9zZXJpYWxpemVyXCJcbmltcG9ydCBUaW1lciBmcm9tIFwiLi90aW1lclwiXG5cbi8qKiBJbml0aWFsaXplcyB0aGUgU29ja2V0ICpcbiAqXG4gKiBGb3IgSUU4IHN1cHBvcnQgdXNlIGFuIEVTNS1zaGltIChodHRwczovL2dpdGh1Yi5jb20vZXMtc2hpbXMvZXM1LXNoaW0pXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGVuZFBvaW50IC0gVGhlIHN0cmluZyBXZWJTb2NrZXQgZW5kcG9pbnQsIGllLCBgXCJ3czovL2V4YW1wbGUuY29tL3NvY2tldFwiYCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXCJ3c3M6Ly9leGFtcGxlLmNvbVwiYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcIi9zb2NrZXRcImAgKGluaGVyaXRlZCBob3N0ICYgcHJvdG9jb2wpXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHNdIC0gT3B0aW9uYWwgY29uZmlndXJhdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMudHJhbnNwb3J0XSAtIFRoZSBXZWJzb2NrZXQgVHJhbnNwb3J0LCBmb3IgZXhhbXBsZSBXZWJTb2NrZXQgb3IgUGhvZW5peC5Mb25nUG9sbC5cbiAqXG4gKiBEZWZhdWx0cyB0byBXZWJTb2NrZXQgd2l0aCBhdXRvbWF0aWMgTG9uZ1BvbGwgZmFsbGJhY2suXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5lbmNvZGVdIC0gVGhlIGZ1bmN0aW9uIHRvIGVuY29kZSBvdXRnb2luZyBtZXNzYWdlcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBKU09OIGVuY29kZXIuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdHMuZGVjb2RlXSAtIFRoZSBmdW5jdGlvbiB0byBkZWNvZGUgaW5jb21pbmcgbWVzc2FnZXMuXG4gKlxuICogRGVmYXVsdHMgdG8gSlNPTjpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiAocGF5bG9hZCwgY2FsbGJhY2spID0+IGNhbGxiYWNrKEpTT04ucGFyc2UocGF5bG9hZCkpXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMudGltZW91dF0gLSBUaGUgZGVmYXVsdCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byB0cmlnZ2VyIHB1c2ggdGltZW91dHMuXG4gKlxuICogRGVmYXVsdHMgYERFRkFVTFRfVElNRU9VVGBcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5oZWFydGJlYXRJbnRlcnZhbE1zXSAtIFRoZSBtaWxsaXNlYyBpbnRlcnZhbCB0byBzZW5kIGEgaGVhcnRiZWF0IG1lc3NhZ2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0cy5yZWNvbm5lY3RBZnRlck1zXSAtIFRoZSBvcHRpb25hbCBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG1pbGxzZWNcbiAqIHNvY2tldCByZWNvbm5lY3QgaW50ZXJ2YWwuXG4gKlxuICogRGVmYXVsdHMgdG8gc3RlcHBlZCBiYWNrb2ZmIG9mOlxuICpcbiAqIGBgYGphdmFzY3JpcHRcbiAqIGZ1bmN0aW9uKHRyaWVzKXtcbiAqICAgcmV0dXJuIFsxMCwgNTAsIDEwMCwgMTUwLCAyMDAsIDI1MCwgNTAwLCAxMDAwLCAyMDAwXVt0cmllcyAtIDFdIHx8IDUwMDBcbiAqIH1cbiAqIGBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMucmVqb2luQWZ0ZXJNc10gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBtaWxsc2VjXG4gKiByZWpvaW4gaW50ZXJ2YWwgZm9yIGluZGl2aWR1YWwgY2hhbm5lbHMuXG4gKlxuICogYGBgamF2YXNjcmlwdFxuICogZnVuY3Rpb24odHJpZXMpe1xuICogICByZXR1cm4gWzEwMDAsIDIwMDAsIDUwMDBdW3RyaWVzIC0gMV0gfHwgMTAwMDBcbiAqIH1cbiAqIGBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0cy5sb2dnZXJdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLCBpZTpcbiAqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBmdW5jdGlvbihraW5kLCBtc2csIGRhdGEpIHtcbiAqICAgY29uc29sZS5sb2coYCR7a2luZH06ICR7bXNnfWAsIGRhdGEpXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdHMubG9uZ3BvbGxlclRpbWVvdXRdIC0gVGhlIG1heGltdW0gdGltZW91dCBvZiBhIGxvbmcgcG9sbCBBSkFYIHJlcXVlc3QuXG4gKlxuICogRGVmYXVsdHMgdG8gMjBzIChkb3VibGUgdGhlIHNlcnZlciBsb25nIHBvbGwgdGltZXIpLlxuICpcbiAqIEBwYXJhbSB7KE9iamVjdHxmdW5jdGlvbil9IFtvcHRzLnBhcmFtc10gLSBUaGUgb3B0aW9uYWwgcGFyYW1zIHRvIHBhc3Mgd2hlbiBjb25uZWN0aW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdHMuYmluYXJ5VHlwZV0gLSBUaGUgYmluYXJ5IHR5cGUgdG8gdXNlIGZvciBiaW5hcnkgV2ViU29ja2V0IGZyYW1lcy5cbiAqXG4gKiBEZWZhdWx0cyB0byBcImFycmF5YnVmZmVyXCJcbiAqXG4gKiBAcGFyYW0ge3Zzbn0gW29wdHMudnNuXSAtIFRoZSBzZXJpYWxpemVyJ3MgcHJvdG9jb2wgdmVyc2lvbiB0byBzZW5kIG9uIGNvbm5lY3QuXG4gKlxuICogRGVmYXVsdHMgdG8gREVGQVVMVF9WU04uXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU29ja2V0IHtcbiAgY29uc3RydWN0b3IoZW5kUG9pbnQsIG9wdHMgPSB7fSl7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyA9IHtvcGVuOiBbXSwgY2xvc2U6IFtdLCBlcnJvcjogW10sIG1lc3NhZ2U6IFtdfVxuICAgIHRoaXMuY2hhbm5lbHMgPSBbXVxuICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdXG4gICAgdGhpcy5yZWYgPSAwXG4gICAgdGhpcy50aW1lb3V0ID0gb3B0cy50aW1lb3V0IHx8IERFRkFVTFRfVElNRU9VVFxuICAgIHRoaXMudHJhbnNwb3J0ID0gb3B0cy50cmFuc3BvcnQgfHwgZ2xvYmFsLldlYlNvY2tldCB8fCBMb25nUG9sbFxuICAgIHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9ucyA9IDBcbiAgICB0aGlzLmRlZmF1bHRFbmNvZGVyID0gU2VyaWFsaXplci5lbmNvZGUuYmluZChTZXJpYWxpemVyKVxuICAgIHRoaXMuZGVmYXVsdERlY29kZXIgPSBTZXJpYWxpemVyLmRlY29kZS5iaW5kKFNlcmlhbGl6ZXIpXG4gICAgdGhpcy5jbG9zZVdhc0NsZWFuID0gZmFsc2VcbiAgICB0aGlzLmJpbmFyeVR5cGUgPSBvcHRzLmJpbmFyeVR5cGUgfHwgXCJhcnJheWJ1ZmZlclwiXG4gICAgdGhpcy5jb25uZWN0Q2xvY2sgPSAxXG4gICAgaWYodGhpcy50cmFuc3BvcnQgIT09IExvbmdQb2xsKXtcbiAgICAgIHRoaXMuZW5jb2RlID0gb3B0cy5lbmNvZGUgfHwgdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSBvcHRzLmRlY29kZSB8fCB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZW5jb2RlID0gdGhpcy5kZWZhdWx0RW5jb2RlclxuICAgICAgdGhpcy5kZWNvZGUgPSB0aGlzLmRlZmF1bHREZWNvZGVyXG4gICAgfVxuICAgIGxldCBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgIGlmKHBoeFdpbmRvdyAmJiBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcil7XG4gICAgICBwaHhXaW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VoaWRlXCIsIF9lID0+IHtcbiAgICAgICAgaWYodGhpcy5jb25uKXtcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgICAgICAgIGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPSB0aGlzLmNvbm5lY3RDbG9ja1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcGh4V2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBfZSA9PiB7XG4gICAgICAgIGlmKGF3YWl0aW5nQ29ubmVjdGlvbk9uUGFnZVNob3cgPT09IHRoaXMuY29ubmVjdENsb2NrKXtcbiAgICAgICAgICBhd2FpdGluZ0Nvbm5lY3Rpb25PblBhZ2VTaG93ID0gbnVsbFxuICAgICAgICAgIHRoaXMuY29ubmVjdCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcyA9IG9wdHMuaGVhcnRiZWF0SW50ZXJ2YWxNcyB8fCAzMDAwMFxuICAgIHRoaXMucmVqb2luQWZ0ZXJNcyA9ICh0cmllcykgPT4ge1xuICAgICAgaWYob3B0cy5yZWpvaW5BZnRlck1zKXtcbiAgICAgICAgcmV0dXJuIG9wdHMucmVqb2luQWZ0ZXJNcyh0cmllcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbMTAwMCwgMjAwMCwgNTAwMF1bdHJpZXMgLSAxXSB8fCAxMDAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLnJlY29ubmVjdEFmdGVyTXMgPSAodHJpZXMpID0+IHtcbiAgICAgIGlmKG9wdHMucmVjb25uZWN0QWZ0ZXJNcyl7XG4gICAgICAgIHJldHVybiBvcHRzLnJlY29ubmVjdEFmdGVyTXModHJpZXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gWzEwLCA1MCwgMTAwLCAxNTAsIDIwMCwgMjUwLCA1MDAsIDEwMDAsIDIwMDBdW3RyaWVzIC0gMV0gfHwgNTAwMFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxvZ2dlciA9IG9wdHMubG9nZ2VyIHx8IG51bGxcbiAgICB0aGlzLmxvbmdwb2xsZXJUaW1lb3V0ID0gb3B0cy5sb25ncG9sbGVyVGltZW91dCB8fCAyMDAwMFxuICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShvcHRzLnBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLmVuZFBvaW50ID0gYCR7ZW5kUG9pbnR9LyR7VFJBTlNQT1JUUy53ZWJzb2NrZXR9YFxuICAgIHRoaXMudnNuID0gb3B0cy52c24gfHwgREVGQVVMVF9WU05cbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVyID0gbnVsbFxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVyID0gbmV3IFRpbWVyKCgpID0+IHtcbiAgICAgIHRoaXMudGVhcmRvd24oKCkgPT4gdGhpcy5jb25uZWN0KCkpXG4gICAgfSwgdGhpcy5yZWNvbm5lY3RBZnRlck1zKVxuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIGFuZCByZXBsYWNlcyB0aGUgYWN0aXZlIHRyYW5zcG9ydFxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXdUcmFuc3BvcnQgLSBUaGUgbmV3IHRyYW5zcG9ydCBjbGFzcyB0byBpbnN0YW50aWF0ZVxuICAgKlxuICAgKi9cbiAgcmVwbGFjZVRyYW5zcG9ydChuZXdUcmFuc3BvcnQpe1xuICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgdGhpcy50cmFuc3BvcnQgPSBuZXdUcmFuc3BvcnRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzb2NrZXQgcHJvdG9jb2xcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIHByb3RvY29sKCl7IHJldHVybiBsb2NhdGlvbi5wcm90b2NvbC5tYXRjaCgvXmh0dHBzLykgPyBcIndzc1wiIDogXCJ3c1wiIH1cblxuICAvKipcbiAgICogVGhlIGZ1bGx5IHF1YWxpZmVkIHNvY2tldCB1cmxcbiAgICpcbiAgICogQHJldHVybnMge3N0cmluZ31cbiAgICovXG4gIGVuZFBvaW50VVJMKCl7XG4gICAgbGV0IHVyaSA9IEFqYXguYXBwZW5kUGFyYW1zKFxuICAgICAgQWpheC5hcHBlbmRQYXJhbXModGhpcy5lbmRQb2ludCwgdGhpcy5wYXJhbXMoKSksIHt2c246IHRoaXMudnNufSlcbiAgICBpZih1cmkuY2hhckF0KDApICE9PSBcIi9cIil7IHJldHVybiB1cmkgfVxuICAgIGlmKHVyaS5jaGFyQXQoMSkgPT09IFwiL1wiKXsgcmV0dXJuIGAke3RoaXMucHJvdG9jb2woKX06JHt1cml9YCB9XG5cbiAgICByZXR1cm4gYCR7dGhpcy5wcm90b2NvbCgpfTovLyR7bG9jYXRpb24uaG9zdH0ke3VyaX1gXG4gIH1cblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldFxuICAgKlxuICAgKiBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Nsb3NlRXZlbnQjU3RhdHVzX2NvZGVzIGZvciB2YWxpZCBzdGF0dXMgY29kZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gT3B0aW9uYWwgY2FsbGJhY2sgd2hpY2ggaXMgY2FsbGVkIGFmdGVyIHNvY2tldCBpcyBkaXNjb25uZWN0ZWQuXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gY29kZSAtIEEgc3RhdHVzIGNvZGUgZm9yIGRpc2Nvbm5lY3Rpb24gKE9wdGlvbmFsKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHJlYXNvbiAtIEEgdGV4dHVhbCBkZXNjcmlwdGlvbiBvZiB0aGUgcmVhc29uIHRvIGRpc2Nvbm5lY3QuIChPcHRpb25hbClcbiAgICovXG4gIGRpc2Nvbm5lY3QoY2FsbGJhY2ssIGNvZGUsIHJlYXNvbil7XG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IHRydWVcbiAgICB0aGlzLnJlY29ubmVjdFRpbWVyLnJlc2V0KClcbiAgICB0aGlzLnRlYXJkb3duKGNhbGxiYWNrLCBjb2RlLCByZWFzb24pXG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFRoZSBwYXJhbXMgdG8gc2VuZCB3aGVuIGNvbm5lY3RpbmcsIGZvciBleGFtcGxlIGB7dXNlcl9pZDogdXNlclRva2VufWBcbiAgICpcbiAgICogUGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkOyBwYXNzIHRoZW0gaW4gdGhlIFNvY2tldCBjb25zdHJ1Y3RvciBpbnN0ZWFkOlxuICAgKiBgbmV3IFNvY2tldChcIi9zb2NrZXRcIiwge3BhcmFtczoge3VzZXJfaWQ6IHVzZXJUb2tlbn19KWAuXG4gICAqL1xuICBjb25uZWN0KHBhcmFtcyl7XG4gICAgdGhpcy5jb25uZWN0Q2xvY2srK1xuICAgIGlmKHBhcmFtcyl7XG4gICAgICBjb25zb2xlICYmIGNvbnNvbGUubG9nKFwicGFzc2luZyBwYXJhbXMgdG8gY29ubmVjdCBpcyBkZXByZWNhdGVkLiBJbnN0ZWFkIHBhc3MgOnBhcmFtcyB0byB0aGUgU29ja2V0IGNvbnN0cnVjdG9yXCIpXG4gICAgICB0aGlzLnBhcmFtcyA9IGNsb3N1cmUocGFyYW1zKVxuICAgIH1cbiAgICBpZih0aGlzLmNvbm4peyByZXR1cm4gfVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5jb25uID0gbmV3IHRoaXMudHJhbnNwb3J0KHRoaXMuZW5kUG9pbnRVUkwoKSlcbiAgICB0aGlzLmNvbm4uYmluYXJ5VHlwZSA9IHRoaXMuYmluYXJ5VHlwZVxuICAgIHRoaXMuY29ubi50aW1lb3V0ID0gdGhpcy5sb25ncG9sbGVyVGltZW91dFxuICAgIHRoaXMuY29ubi5vbm9wZW4gPSAoKSA9PiB0aGlzLm9uQ29ubk9wZW4oKVxuICAgIHRoaXMuY29ubi5vbmVycm9yID0gZXJyb3IgPT4gdGhpcy5vbkNvbm5FcnJvcihlcnJvcilcbiAgICB0aGlzLmNvbm4ub25tZXNzYWdlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5NZXNzYWdlKGV2ZW50KVxuICAgIHRoaXMuY29ubi5vbmNsb3NlID0gZXZlbnQgPT4gdGhpcy5vbkNvbm5DbG9zZShldmVudClcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2dzIHRoZSBtZXNzYWdlLiBPdmVycmlkZSBgdGhpcy5sb2dnZXJgIGZvciBzcGVjaWFsaXplZCBsb2dnaW5nLiBub29wcyBieSBkZWZhdWx0XG4gICAqIEBwYXJhbSB7c3RyaW5nfSBraW5kXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIGxvZyhraW5kLCBtc2csIGRhdGEpeyB0aGlzLmxvZ2dlcihraW5kLCBtc2csIGRhdGEpIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0cnVlIGlmIGEgbG9nZ2VyIGhhcyBiZWVuIHNldCBvbiB0aGlzIHNvY2tldC5cbiAgICovXG4gIGhhc0xvZ2dlcigpeyByZXR1cm4gdGhpcy5sb2dnZXIgIT09IG51bGwgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlcnMgY2FsbGJhY2tzIGZvciBjb25uZWN0aW9uIG9wZW4gZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbk9wZW4oZnVuY3Rpb24oKXsgY29uc29sZS5pbmZvKFwidGhlIHNvY2tldCB3YXMgb3BlbmVkXCIpIH0pXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gICAqL1xuICBvbk9wZW4oY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3Mub3Blbi5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBjbG9zZSBldmVudHNcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICovXG4gIG9uQ2xvc2UoY2FsbGJhY2spe1xuICAgIGxldCByZWYgPSB0aGlzLm1ha2VSZWYoKVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuY2xvc2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBjYWxsYmFja3MgZm9yIGNvbm5lY3Rpb24gZXJyb3IgZXZlbnRzXG4gICAqXG4gICAqIEBleGFtcGxlIHNvY2tldC5vbkVycm9yKGZ1bmN0aW9uKGVycm9yKXsgYWxlcnQoXCJBbiBlcnJvciBvY2N1cnJlZFwiKSB9KVxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25FcnJvcihjYWxsYmFjayl7XG4gICAgbGV0IHJlZiA9IHRoaXMubWFrZVJlZigpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5lcnJvci5wdXNoKFtyZWYsIGNhbGxiYWNrXSlcbiAgICByZXR1cm4gcmVmXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXJzIGNhbGxiYWNrcyBmb3IgY29ubmVjdGlvbiBtZXNzYWdlIGV2ZW50c1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICAgKi9cbiAgb25NZXNzYWdlKGNhbGxiYWNrKXtcbiAgICBsZXQgcmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzLm1lc3NhZ2UucHVzaChbcmVmLCBjYWxsYmFja10pXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBvbkNvbm5PcGVuKCl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgYGNvbm5lY3RlZCB0byAke3RoaXMuZW5kUG9pbnRVUkwoKX1gKVxuICAgIHRoaXMuY2xvc2VXYXNDbGVhbiA9IGZhbHNlXG4gICAgdGhpcy5lc3RhYmxpc2hlZENvbm5lY3Rpb25zKytcbiAgICB0aGlzLmZsdXNoU2VuZEJ1ZmZlcigpXG4gICAgdGhpcy5yZWNvbm5lY3RUaW1lci5yZXNldCgpXG4gICAgdGhpcy5yZXNldEhlYXJ0YmVhdCgpXG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5vcGVuLmZvckVhY2goKFssIGNhbGxiYWNrXSkgPT4gY2FsbGJhY2soKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cblxuICBoZWFydGJlYXRUaW1lb3V0KCl7XG4gICAgaWYodGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmKXtcbiAgICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpeyB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBcImhlYXJ0YmVhdCB0aW1lb3V0LiBBdHRlbXB0aW5nIHRvIHJlLWVzdGFibGlzaCBjb25uZWN0aW9uXCIpIH1cbiAgICAgIHRoaXMuYWJub3JtYWxDbG9zZShcImhlYXJ0YmVhdCB0aW1lb3V0XCIpXG4gICAgfVxuICB9XG5cbiAgcmVzZXRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLmNvbm4gJiYgdGhpcy5jb25uLnNraXBIZWFydGJlYXQpeyByZXR1cm4gfVxuICAgIHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZiA9IG51bGxcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gIH1cblxuICB0ZWFyZG93bihjYWxsYmFjaywgY29kZSwgcmVhc29uKXtcbiAgICBpZighdGhpcy5jb25uKXtcbiAgICAgIHJldHVybiBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZSgoKSA9PiB7XG4gICAgICBpZih0aGlzLmNvbm4pe1xuICAgICAgICBpZihjb2RlKXsgdGhpcy5jb25uLmNsb3NlKGNvZGUsIHJlYXNvbiB8fCBcIlwiKSB9IGVsc2UgeyB0aGlzLmNvbm4uY2xvc2UoKSB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZCgoKSA9PiB7XG4gICAgICAgIGlmKHRoaXMuY29ubil7XG4gICAgICAgICAgdGhpcy5jb25uLm9uY2xvc2UgPSBmdW5jdGlvbiAoKXsgfSAvLyBub29wXG4gICAgICAgICAgdGhpcy5jb25uID0gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgd2FpdEZvckJ1ZmZlckRvbmUoY2FsbGJhY2ssIHRyaWVzID0gMSl7XG4gICAgaWYodHJpZXMgPT09IDUgfHwgIXRoaXMuY29ubiB8fCAhdGhpcy5jb25uLmJ1ZmZlcmVkQW1vdW50KXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy53YWl0Rm9yQnVmZmVyRG9uZShjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgd2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgPSAxKXtcbiAgICBpZih0cmllcyA9PT0gNSB8fCAhdGhpcy5jb25uIHx8IHRoaXMuY29ubi5yZWFkeVN0YXRlID09PSBTT0NLRVRfU1RBVEVTLmNsb3NlZCl7XG4gICAgICBjYWxsYmFjaygpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMud2FpdEZvclNvY2tldENsb3NlZChjYWxsYmFjaywgdHJpZXMgKyAxKVxuICAgIH0sIDE1MCAqIHRyaWVzKVxuICB9XG5cbiAgb25Db25uQ2xvc2UoZXZlbnQpe1xuICAgIGxldCBjbG9zZUNvZGUgPSBldmVudCAmJiBldmVudC5jb2RlXG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSkgdGhpcy5sb2coXCJ0cmFuc3BvcnRcIiwgXCJjbG9zZVwiLCBldmVudClcbiAgICB0aGlzLnRyaWdnZXJDaGFuRXJyb3IoKVxuICAgIGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0YmVhdFRpbWVyKVxuICAgIGlmKCF0aGlzLmNsb3NlV2FzQ2xlYW4gJiYgY2xvc2VDb2RlICE9PSAxMDAwKXtcbiAgICAgIHRoaXMucmVjb25uZWN0VGltZXIuc2NoZWR1bGVUaW1lb3V0KClcbiAgICB9XG4gICAgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5jbG9zZS5mb3JFYWNoKChbLCBjYWxsYmFja10pID0+IGNhbGxiYWNrKGV2ZW50KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgb25Db25uRXJyb3IoZXJyb3Ipe1xuICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwidHJhbnNwb3J0XCIsIGVycm9yKVxuICAgIGxldCB0cmFuc3BvcnRCZWZvcmUgPSB0aGlzLnRyYW5zcG9ydFxuICAgIGxldCBlc3RhYmxpc2hlZEJlZm9yZSA9IHRoaXMuZXN0YWJsaXNoZWRDb25uZWN0aW9uc1xuICAgIHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MuZXJyb3IuZm9yRWFjaCgoWywgY2FsbGJhY2tdKSA9PiB7XG4gICAgICBjYWxsYmFjayhlcnJvciwgdHJhbnNwb3J0QmVmb3JlLCBlc3RhYmxpc2hlZEJlZm9yZSlcbiAgICB9KVxuICAgIGlmKHRyYW5zcG9ydEJlZm9yZSA9PT0gdGhpcy50cmFuc3BvcnQgfHwgZXN0YWJsaXNoZWRCZWZvcmUgPiAwKXtcbiAgICAgIHRoaXMudHJpZ2dlckNoYW5FcnJvcigpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0cmlnZ2VyQ2hhbkVycm9yKCl7XG4gICAgdGhpcy5jaGFubmVscy5mb3JFYWNoKGNoYW5uZWwgPT4ge1xuICAgICAgaWYoIShjaGFubmVsLmlzRXJyb3JlZCgpIHx8IGNoYW5uZWwuaXNMZWF2aW5nKCkgfHwgY2hhbm5lbC5pc0Nsb3NlZCgpKSl7XG4gICAgICAgIGNoYW5uZWwudHJpZ2dlcihDSEFOTkVMX0VWRU5UUy5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBjb25uZWN0aW9uU3RhdGUoKXtcbiAgICBzd2l0Y2godGhpcy5jb25uICYmIHRoaXMuY29ubi5yZWFkeVN0YXRlKXtcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jb25uZWN0aW5nOiByZXR1cm4gXCJjb25uZWN0aW5nXCJcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5vcGVuOiByZXR1cm4gXCJvcGVuXCJcbiAgICAgIGNhc2UgU09DS0VUX1NUQVRFUy5jbG9zaW5nOiByZXR1cm4gXCJjbG9zaW5nXCJcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBcImNsb3NlZFwiXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgKi9cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuY29ubmVjdGlvblN0YXRlKCkgPT09IFwib3BlblwiIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICpcbiAgICogQHBhcmFtIHtDaGFubmVsfVxuICAgKi9cbiAgcmVtb3ZlKGNoYW5uZWwpe1xuICAgIHRoaXMub2ZmKGNoYW5uZWwuc3RhdGVDaGFuZ2VSZWZzKVxuICAgIHRoaXMuY2hhbm5lbHMgPSB0aGlzLmNoYW5uZWxzLmZpbHRlcihjID0+IGMuam9pblJlZigpICE9PSBjaGFubmVsLmpvaW5SZWYoKSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGBvbk9wZW5gLCBgb25DbG9zZWAsIGBvbkVycm9yLGAgYW5kIGBvbk1lc3NhZ2VgIHJlZ2lzdHJhdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7cmVmc30gLSBsaXN0IG9mIHJlZnMgcmV0dXJuZWQgYnkgY2FsbHMgdG9cbiAgICogICAgICAgICAgICAgICAgIGBvbk9wZW5gLCBgb25DbG9zZWAsIGBvbkVycm9yLGAgYW5kIGBvbk1lc3NhZ2VgXG4gICAqL1xuICBvZmYocmVmcyl7XG4gICAgZm9yKGxldCBrZXkgaW4gdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcyl7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzW2tleV0gPSB0aGlzLnN0YXRlQ2hhbmdlQ2FsbGJhY2tzW2tleV0uZmlsdGVyKChbcmVmXSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVmcy5pbmRleE9mKHJlZikgPT09IC0xXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgYSBuZXcgY2hhbm5lbCBmb3IgdGhlIGdpdmVuIHRvcGljXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0b3BpY1xuICAgKiBAcGFyYW0ge09iamVjdH0gY2hhblBhcmFtcyAtIFBhcmFtZXRlcnMgZm9yIHRoZSBjaGFubmVsXG4gICAqIEByZXR1cm5zIHtDaGFubmVsfVxuICAgKi9cbiAgY2hhbm5lbCh0b3BpYywgY2hhblBhcmFtcyA9IHt9KXtcbiAgICBsZXQgY2hhbiA9IG5ldyBDaGFubmVsKHRvcGljLCBjaGFuUGFyYW1zLCB0aGlzKVxuICAgIHRoaXMuY2hhbm5lbHMucHVzaChjaGFuKVxuICAgIHJldHVybiBjaGFuXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcbiAgICovXG4gIHB1c2goZGF0YSl7XG4gICAgaWYodGhpcy5oYXNMb2dnZXIoKSl7XG4gICAgICBsZXQge3RvcGljLCBldmVudCwgcGF5bG9hZCwgcmVmLCBqb2luX3JlZn0gPSBkYXRhXG4gICAgICB0aGlzLmxvZyhcInB1c2hcIiwgYCR7dG9waWN9ICR7ZXZlbnR9ICgke2pvaW5fcmVmfSwgJHtyZWZ9KWAsIHBheWxvYWQpXG4gICAgfVxuXG4gICAgaWYodGhpcy5pc0Nvbm5lY3RlZCgpKXtcbiAgICAgIHRoaXMuZW5jb2RlKGRhdGEsIHJlc3VsdCA9PiB0aGlzLmNvbm4uc2VuZChyZXN1bHQpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRCdWZmZXIucHVzaCgoKSA9PiB0aGlzLmVuY29kZShkYXRhLCByZXN1bHQgPT4gdGhpcy5jb25uLnNlbmQocmVzdWx0KSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgbmV4dCBtZXNzYWdlIHJlZiwgYWNjb3VudGluZyBmb3Igb3ZlcmZsb3dzXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBtYWtlUmVmKCl7XG4gICAgbGV0IG5ld1JlZiA9IHRoaXMucmVmICsgMVxuICAgIGlmKG5ld1JlZiA9PT0gdGhpcy5yZWYpeyB0aGlzLnJlZiA9IDAgfSBlbHNlIHsgdGhpcy5yZWYgPSBuZXdSZWYgfVxuXG4gICAgcmV0dXJuIHRoaXMucmVmLnRvU3RyaW5nKClcbiAgfVxuXG4gIHNlbmRIZWFydGJlYXQoKXtcbiAgICBpZih0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYgJiYgIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gdGhpcy5tYWtlUmVmKClcbiAgICB0aGlzLnB1c2goe3RvcGljOiBcInBob2VuaXhcIiwgZXZlbnQ6IFwiaGVhcnRiZWF0XCIsIHBheWxvYWQ6IHt9LCByZWY6IHRoaXMucGVuZGluZ0hlYXJ0YmVhdFJlZn0pXG4gICAgdGhpcy5oZWFydGJlYXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5oZWFydGJlYXRUaW1lb3V0KCksIHRoaXMuaGVhcnRiZWF0SW50ZXJ2YWxNcylcbiAgfVxuXG4gIGFibm9ybWFsQ2xvc2UocmVhc29uKXtcbiAgICB0aGlzLmNsb3NlV2FzQ2xlYW4gPSBmYWxzZVxuICAgIGlmKHRoaXMuaXNDb25uZWN0ZWQoKSl7IHRoaXMuY29ubi5jbG9zZShXU19DTE9TRV9OT1JNQUwsIHJlYXNvbikgfVxuICB9XG5cbiAgZmx1c2hTZW5kQnVmZmVyKCl7XG4gICAgaWYodGhpcy5pc0Nvbm5lY3RlZCgpICYmIHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGggPiAwKXtcbiAgICAgIHRoaXMuc2VuZEJ1ZmZlci5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKCkpXG4gICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXVxuICAgIH1cbiAgfVxuXG4gIG9uQ29ubk1lc3NhZ2UocmF3TWVzc2FnZSl7XG4gICAgdGhpcy5kZWNvZGUocmF3TWVzc2FnZS5kYXRhLCBtc2cgPT4ge1xuICAgICAgbGV0IHt0b3BpYywgZXZlbnQsIHBheWxvYWQsIHJlZiwgam9pbl9yZWZ9ID0gbXNnXG4gICAgICBpZihyZWYgJiYgcmVmID09PSB0aGlzLnBlbmRpbmdIZWFydGJlYXRSZWYpe1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lcilcbiAgICAgICAgdGhpcy5wZW5kaW5nSGVhcnRiZWF0UmVmID0gbnVsbFxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuc2VuZEhlYXJ0YmVhdCgpLCB0aGlzLmhlYXJ0YmVhdEludGVydmFsTXMpXG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuaGFzTG9nZ2VyKCkpIHRoaXMubG9nKFwicmVjZWl2ZVwiLCBgJHtwYXlsb2FkLnN0YXR1cyB8fCBcIlwifSAke3RvcGljfSAke2V2ZW50fSAke3JlZiAmJiBcIihcIiArIHJlZiArIFwiKVwiIHx8IFwiXCJ9YCwgcGF5bG9hZClcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuY2hhbm5lbHMubGVuZ3RoOyBpKyspe1xuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5jaGFubmVsc1tpXVxuICAgICAgICBpZighY2hhbm5lbC5pc01lbWJlcih0b3BpYywgZXZlbnQsIHBheWxvYWQsIGpvaW5fcmVmKSl7IGNvbnRpbnVlIH1cbiAgICAgICAgY2hhbm5lbC50cmlnZ2VyKGV2ZW50LCBwYXlsb2FkLCByZWYsIGpvaW5fcmVmKVxuICAgICAgfVxuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZUNoYW5nZUNhbGxiYWNrcy5tZXNzYWdlLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgbGV0IFssIGNhbGxiYWNrXSA9IHRoaXMuc3RhdGVDaGFuZ2VDYWxsYmFja3MubWVzc2FnZVtpXVxuICAgICAgICBjYWxsYmFjayhtc2cpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGxlYXZlT3BlblRvcGljKHRvcGljKXtcbiAgICBsZXQgZHVwQ2hhbm5lbCA9IHRoaXMuY2hhbm5lbHMuZmluZChjID0+IGMudG9waWMgPT09IHRvcGljICYmIChjLmlzSm9pbmVkKCkgfHwgYy5pc0pvaW5pbmcoKSkpXG4gICAgaWYoZHVwQ2hhbm5lbCl7XG4gICAgICBpZih0aGlzLmhhc0xvZ2dlcigpKSB0aGlzLmxvZyhcInRyYW5zcG9ydFwiLCBgbGVhdmluZyBkdXBsaWNhdGUgdG9waWMgXCIke3RvcGljfVwiYClcbiAgICAgIGR1cENoYW5uZWwubGVhdmUoKVxuICAgIH1cbiAgfVxufVxuIiwgIlxuZXhwb3J0IGNvbnN0IENPTlNFQ1VUSVZFX1JFTE9BRFMgPSBcImNvbnNlY3V0aXZlLXJlbG9hZHNcIlxuZXhwb3J0IGNvbnN0IE1BWF9SRUxPQURTID0gMTBcbmV4cG9ydCBjb25zdCBSRUxPQURfSklUVEVSX01JTiA9IDEwMDBcbmV4cG9ydCBjb25zdCBSRUxPQURfSklUVEVSX01BWCA9IDMwMDBcbmV4cG9ydCBjb25zdCBGQUlMU0FGRV9KSVRURVIgPSAzMDAwMFxuZXhwb3J0IGNvbnN0IFBIWF9FVkVOVF9DTEFTU0VTID0gW1xuICBcInBoeC1jbGljay1sb2FkaW5nXCIsIFwicGh4LWNoYW5nZS1sb2FkaW5nXCIsIFwicGh4LXN1Ym1pdC1sb2FkaW5nXCIsXG4gIFwicGh4LWtleWRvd24tbG9hZGluZ1wiLCBcInBoeC1rZXl1cC1sb2FkaW5nXCIsIFwicGh4LWJsdXItbG9hZGluZ1wiLCBcInBoeC1mb2N1cy1sb2FkaW5nXCJcbl1cbmV4cG9ydCBjb25zdCBQSFhfQ09NUE9ORU5UID0gXCJkYXRhLXBoeC1jb21wb25lbnRcIlxuZXhwb3J0IGNvbnN0IFBIWF9MSVZFX0xJTksgPSBcImRhdGEtcGh4LWxpbmtcIlxuZXhwb3J0IGNvbnN0IFBIWF9UUkFDS19TVEFUSUMgPSBcInRyYWNrLXN0YXRpY1wiXG5leHBvcnQgY29uc3QgUEhYX0xJTktfU1RBVEUgPSBcImRhdGEtcGh4LWxpbmstc3RhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9SRUYgPSBcImRhdGEtcGh4LXJlZlwiXG5leHBvcnQgY29uc3QgUEhYX1JFRl9TUkMgPSBcImRhdGEtcGh4LXJlZi1zcmNcIlxuZXhwb3J0IGNvbnN0IFBIWF9UUkFDS19VUExPQURTID0gXCJ0cmFjay11cGxvYWRzXCJcbmV4cG9ydCBjb25zdCBQSFhfVVBMT0FEX1JFRiA9IFwiZGF0YS1waHgtdXBsb2FkLXJlZlwiXG5leHBvcnQgY29uc3QgUEhYX1BSRUZMSUdIVEVEX1JFRlMgPSBcImRhdGEtcGh4LXByZWZsaWdodGVkLXJlZnNcIlxuZXhwb3J0IGNvbnN0IFBIWF9ET05FX1JFRlMgPSBcImRhdGEtcGh4LWRvbmUtcmVmc1wiXG5leHBvcnQgY29uc3QgUEhYX0RST1BfVEFSR0VUID0gXCJkcm9wLXRhcmdldFwiXG5leHBvcnQgY29uc3QgUEhYX0FDVElWRV9FTlRSWV9SRUZTID0gXCJkYXRhLXBoeC1hY3RpdmUtcmVmc1wiXG5leHBvcnQgY29uc3QgUEhYX0xJVkVfRklMRV9VUERBVEVEID0gXCJwaHg6bGl2ZS1maWxlOnVwZGF0ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9TS0lQID0gXCJkYXRhLXBoeC1za2lwXCJcbmV4cG9ydCBjb25zdCBQSFhfUFJVTkUgPSBcImRhdGEtcGh4LXBydW5lXCJcbmV4cG9ydCBjb25zdCBQSFhfUEFHRV9MT0FESU5HID0gXCJwYWdlLWxvYWRpbmdcIlxuZXhwb3J0IGNvbnN0IFBIWF9DT05ORUNURURfQ0xBU1MgPSBcInBoeC1jb25uZWN0ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9ESVNDT05ORUNURURfQ0xBU1MgPSBcInBoeC1sb2FkaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfTk9fRkVFREJBQ0tfQ0xBU1MgPSBcInBoeC1uby1mZWVkYmFja1wiXG5leHBvcnQgY29uc3QgUEhYX0VSUk9SX0NMQVNTID0gXCJwaHgtZXJyb3JcIlxuZXhwb3J0IGNvbnN0IFBIWF9QQVJFTlRfSUQgPSBcImRhdGEtcGh4LXBhcmVudC1pZFwiXG5leHBvcnQgY29uc3QgUEhYX01BSU4gPSBcImRhdGEtcGh4LW1haW5cIlxuZXhwb3J0IGNvbnN0IFBIWF9ST09UX0lEID0gXCJkYXRhLXBoeC1yb290LWlkXCJcbmV4cG9ydCBjb25zdCBQSFhfVFJJR0dFUl9BQ1RJT04gPSBcInRyaWdnZXItYWN0aW9uXCJcbmV4cG9ydCBjb25zdCBQSFhfRkVFREJBQ0tfRk9SID0gXCJmZWVkYmFjay1mb3JcIlxuZXhwb3J0IGNvbnN0IFBIWF9IQVNfRk9DVVNFRCA9IFwicGh4LWhhcy1mb2N1c2VkXCJcbmV4cG9ydCBjb25zdCBGT0NVU0FCTEVfSU5QVVRTID0gW1widGV4dFwiLCBcInRleHRhcmVhXCIsIFwibnVtYmVyXCIsIFwiZW1haWxcIiwgXCJwYXNzd29yZFwiLCBcInNlYXJjaFwiLCBcInRlbFwiLCBcInVybFwiLCBcImRhdGVcIiwgXCJ0aW1lXCIsIFwiZGF0ZXRpbWUtbG9jYWxcIiwgXCJjb2xvclwiLCBcInJhbmdlXCJdXG5leHBvcnQgY29uc3QgQ0hFQ0tBQkxFX0lOUFVUUyA9IFtcImNoZWNrYm94XCIsIFwicmFkaW9cIl1cbmV4cG9ydCBjb25zdCBQSFhfSEFTX1NVQk1JVFRFRCA9IFwicGh4LWhhcy1zdWJtaXR0ZWRcIlxuZXhwb3J0IGNvbnN0IFBIWF9TRVNTSU9OID0gXCJkYXRhLXBoeC1zZXNzaW9uXCJcbmV4cG9ydCBjb25zdCBQSFhfVklFV19TRUxFQ1RPUiA9IGBbJHtQSFhfU0VTU0lPTn1dYFxuZXhwb3J0IGNvbnN0IFBIWF9TVElDS1kgPSBcImRhdGEtcGh4LXN0aWNreVwiXG5leHBvcnQgY29uc3QgUEhYX1NUQVRJQyA9IFwiZGF0YS1waHgtc3RhdGljXCJcbmV4cG9ydCBjb25zdCBQSFhfUkVBRE9OTFkgPSBcImRhdGEtcGh4LXJlYWRvbmx5XCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRUQgPSBcImRhdGEtcGh4LWRpc2FibGVkXCJcbmV4cG9ydCBjb25zdCBQSFhfRElTQUJMRV9XSVRIID0gXCJkaXNhYmxlLXdpdGhcIlxuZXhwb3J0IGNvbnN0IFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSA9IFwiZGF0YS1waHgtZGlzYWJsZS13aXRoLXJlc3RvcmVcIlxuZXhwb3J0IGNvbnN0IFBIWF9IT09LID0gXCJob29rXCJcbmV4cG9ydCBjb25zdCBQSFhfREVCT1VOQ0UgPSBcImRlYm91bmNlXCJcbmV4cG9ydCBjb25zdCBQSFhfVEhST1RUTEUgPSBcInRocm90dGxlXCJcbmV4cG9ydCBjb25zdCBQSFhfVVBEQVRFID0gXCJ1cGRhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9LRVkgPSBcImtleVwiXG5leHBvcnQgY29uc3QgUEhYX1BSSVZBVEUgPSBcInBoeFByaXZhdGVcIlxuZXhwb3J0IGNvbnN0IFBIWF9BVVRPX1JFQ09WRVIgPSBcImF1dG8tcmVjb3ZlclwiXG5leHBvcnQgY29uc3QgUEhYX0xWX0RFQlVHID0gXCJwaHg6bGl2ZS1zb2NrZXQ6ZGVidWdcIlxuZXhwb3J0IGNvbnN0IFBIWF9MVl9QUk9GSUxFID0gXCJwaHg6bGl2ZS1zb2NrZXQ6cHJvZmlsaW5nXCJcbmV4cG9ydCBjb25zdCBQSFhfTFZfTEFURU5DWV9TSU0gPSBcInBoeDpsaXZlLXNvY2tldDpsYXRlbmN5LXNpbVwiXG5leHBvcnQgY29uc3QgUEhYX1BST0dSRVNTID0gXCJwcm9ncmVzc1wiXG5leHBvcnQgY29uc3QgTE9BREVSX1RJTUVPVVQgPSAxXG5leHBvcnQgY29uc3QgQkVGT1JFX1VOTE9BRF9MT0FERVJfVElNRU9VVCA9IDIwMFxuZXhwb3J0IGNvbnN0IEJJTkRJTkdfUFJFRklYID0gXCJwaHgtXCJcbmV4cG9ydCBjb25zdCBQVVNIX1RJTUVPVVQgPSAzMDAwMFxuZXhwb3J0IGNvbnN0IExJTktfSEVBREVSID0gXCJ4LXJlcXVlc3RlZC13aXRoXCJcbmV4cG9ydCBjb25zdCBSRVNQT05TRV9VUkxfSEVBREVSID0gXCJ4LXJlc3BvbnNlLXVybFwiXG5leHBvcnQgY29uc3QgREVCT1VOQ0VfVFJJR0dFUiA9IFwiZGVib3VuY2UtdHJpZ2dlclwiXG5leHBvcnQgY29uc3QgVEhST1RUTEVEID0gXCJ0aHJvdHRsZWRcIlxuZXhwb3J0IGNvbnN0IERFQk9VTkNFX1BSRVZfS0VZID0gXCJkZWJvdW5jZS1wcmV2LWtleVwiXG5leHBvcnQgY29uc3QgREVGQVVMVFMgPSB7XG4gIGRlYm91bmNlOiAzMDAsXG4gIHRocm90dGxlOiAzMDBcbn1cblxuLy8gUmVuZGVyZWRcbmV4cG9ydCBjb25zdCBEWU5BTUlDUyA9IFwiZFwiXG5leHBvcnQgY29uc3QgU1RBVElDID0gXCJzXCJcbmV4cG9ydCBjb25zdCBDT01QT05FTlRTID0gXCJjXCJcbmV4cG9ydCBjb25zdCBFVkVOVFMgPSBcImVcIlxuZXhwb3J0IGNvbnN0IFJFUExZID0gXCJyXCJcbmV4cG9ydCBjb25zdCBUSVRMRSA9IFwidFwiXG5leHBvcnQgY29uc3QgVEVNUExBVEVTID0gXCJwXCJcbiIsICJpbXBvcnQge1xuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudHJ5VXBsb2FkZXIge1xuICBjb25zdHJ1Y3RvcihlbnRyeSwgY2h1bmtTaXplLCBsaXZlU29ja2V0KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQgPSBsaXZlU29ja2V0XG4gICAgdGhpcy5lbnRyeSA9IGVudHJ5XG4gICAgdGhpcy5vZmZzZXQgPSAwXG4gICAgdGhpcy5jaHVua1NpemUgPSBjaHVua1NpemVcbiAgICB0aGlzLmNodW5rVGltZXIgPSBudWxsXG4gICAgdGhpcy51cGxvYWRDaGFubmVsID0gbGl2ZVNvY2tldC5jaGFubmVsKGBsdnU6JHtlbnRyeS5yZWZ9YCwge3Rva2VuOiBlbnRyeS5tZXRhZGF0YSgpfSlcbiAgfVxuXG4gIGVycm9yKHJlYXNvbil7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuY2h1bmtUaW1lcilcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwubGVhdmUoKVxuICAgIHRoaXMuZW50cnkuZXJyb3IocmVhc29uKVxuICB9XG5cbiAgdXBsb2FkKCl7XG4gICAgdGhpcy51cGxvYWRDaGFubmVsLm9uRXJyb3IocmVhc29uID0+IHRoaXMuZXJyb3IocmVhc29uKSlcbiAgICB0aGlzLnVwbG9hZENoYW5uZWwuam9pbigpXG4gICAgICAucmVjZWl2ZShcIm9rXCIsIF9kYXRhID0+IHRoaXMucmVhZE5leHRDaHVuaygpKVxuICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCByZWFzb24gPT4gdGhpcy5lcnJvcihyZWFzb24pKVxuICB9XG5cbiAgaXNEb25lKCl7IHJldHVybiB0aGlzLm9mZnNldCA+PSB0aGlzLmVudHJ5LmZpbGUuc2l6ZSB9XG5cbiAgcmVhZE5leHRDaHVuaygpe1xuICAgIGxldCByZWFkZXIgPSBuZXcgd2luZG93LkZpbGVSZWFkZXIoKVxuICAgIGxldCBibG9iID0gdGhpcy5lbnRyeS5maWxlLnNsaWNlKHRoaXMub2Zmc2V0LCB0aGlzLmNodW5rU2l6ZSArIHRoaXMub2Zmc2V0KVxuICAgIHJlYWRlci5vbmxvYWQgPSAoZSkgPT4ge1xuICAgICAgaWYoZS50YXJnZXQuZXJyb3IgPT09IG51bGwpe1xuICAgICAgICB0aGlzLm9mZnNldCArPSBlLnRhcmdldC5yZXN1bHQuYnl0ZUxlbmd0aFxuICAgICAgICB0aGlzLnB1c2hDaHVuayhlLnRhcmdldC5yZXN1bHQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbG9nRXJyb3IoXCJSZWFkIGVycm9yOiBcIiArIGUudGFyZ2V0LmVycm9yKVxuICAgICAgfVxuICAgIH1cbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgfVxuXG4gIHB1c2hDaHVuayhjaHVuayl7XG4gICAgaWYoIXRoaXMudXBsb2FkQ2hhbm5lbC5pc0pvaW5lZCgpKXsgcmV0dXJuIH1cbiAgICB0aGlzLnVwbG9hZENoYW5uZWwucHVzaChcImNodW5rXCIsIGNodW5rKVxuICAgICAgLnJlY2VpdmUoXCJva1wiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuZW50cnkucHJvZ3Jlc3MoKHRoaXMub2Zmc2V0IC8gdGhpcy5lbnRyeS5maWxlLnNpemUpICogMTAwKVxuICAgICAgICBpZighdGhpcy5pc0RvbmUoKSl7XG4gICAgICAgICAgdGhpcy5jaHVua1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnJlYWROZXh0Q2h1bmsoKSwgdGhpcy5saXZlU29ja2V0LmdldExhdGVuY3lTaW0oKSB8fCAwKVxuICAgICAgICB9XG4gICAgICB9KVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgUEhYX1ZJRVdfU0VMRUNUT1Jcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IEVudHJ5VXBsb2FkZXIgZnJvbSBcIi4vZW50cnlfdXBsb2FkZXJcIlxuXG5leHBvcnQgbGV0IGxvZ0Vycm9yID0gKG1zZywgb2JqKSA9PiBjb25zb2xlLmVycm9yICYmIGNvbnNvbGUuZXJyb3IobXNnLCBvYmopXG5cbmV4cG9ydCBsZXQgaXNDaWQgPSAoY2lkKSA9PiB7XG4gIGxldCB0eXBlID0gdHlwZW9mKGNpZClcbiAgcmV0dXJuIHR5cGUgPT09IFwibnVtYmVyXCIgfHwgKHR5cGUgPT09IFwic3RyaW5nXCIgJiYgL14oMHxbMS05XVxcZCopJC8udGVzdChjaWQpKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0RHVwbGljYXRlSWRzKCl7XG4gIGxldCBpZHMgPSBuZXcgU2V0KClcbiAgbGV0IGVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIipbaWRdXCIpXG4gIGZvcihsZXQgaSA9IDAsIGxlbiA9IGVsZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKXtcbiAgICBpZihpZHMuaGFzKGVsZW1zW2ldLmlkKSl7XG4gICAgICBjb25zb2xlLmVycm9yKGBNdWx0aXBsZSBJRHMgZGV0ZWN0ZWQ6ICR7ZWxlbXNbaV0uaWR9LiBFbnN1cmUgdW5pcXVlIGVsZW1lbnQgaWRzLmApXG4gICAgfSBlbHNlIHtcbiAgICAgIGlkcy5hZGQoZWxlbXNbaV0uaWQpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBsZXQgZGVidWcgPSAodmlldywga2luZCwgbXNnLCBvYmopID0+IHtcbiAgaWYodmlldy5saXZlU29ja2V0LmlzRGVidWdFbmFibGVkKCkpe1xuICAgIGNvbnNvbGUubG9nKGAke3ZpZXcuaWR9ICR7a2luZH06ICR7bXNnfSAtIGAsIG9iailcbiAgfVxufVxuXG4vLyB3cmFwcyB2YWx1ZSBpbiBjbG9zdXJlIG9yIHJldHVybnMgY2xvc3VyZVxuZXhwb3J0IGxldCBjbG9zdXJlID0gKHZhbCkgPT4gdHlwZW9mIHZhbCA9PT0gXCJmdW5jdGlvblwiID8gdmFsIDogZnVuY3Rpb24gKCl7IHJldHVybiB2YWwgfVxuXG5leHBvcnQgbGV0IGNsb25lID0gKG9iaikgPT4geyByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKSB9XG5cbmV4cG9ydCBsZXQgY2xvc2VzdFBoeEJpbmRpbmcgPSAoZWwsIGJpbmRpbmcsIGJvcmRlckVsKSA9PiB7XG4gIGRvIHtcbiAgICBpZihlbC5tYXRjaGVzKGBbJHtiaW5kaW5nfV1gKSl7IHJldHVybiBlbCB9XG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGVcbiAgfSB3aGlsZShlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSAmJiAhKChib3JkZXJFbCAmJiBib3JkZXJFbC5pc1NhbWVOb2RlKGVsKSkgfHwgZWwubWF0Y2hlcyhQSFhfVklFV19TRUxFQ1RPUikpKVxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnQgbGV0IGlzT2JqZWN0ID0gKG9iaikgPT4ge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiYgIShvYmogaW5zdGFuY2VvZiBBcnJheSlcbn1cblxuZXhwb3J0IGxldCBpc0VxdWFsT2JqID0gKG9iajEsIG9iajIpID0+IEpTT04uc3RyaW5naWZ5KG9iajEpID09PSBKU09OLnN0cmluZ2lmeShvYmoyKVxuXG5leHBvcnQgbGV0IGlzRW1wdHkgPSAob2JqKSA9PiB7XG4gIGZvcihsZXQgeCBpbiBvYmopeyByZXR1cm4gZmFsc2UgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgbGV0IG1heWJlID0gKGVsLCBjYWxsYmFjaykgPT4gZWwgJiYgY2FsbGJhY2soZWwpXG5cbmV4cG9ydCBsZXQgY2hhbm5lbFVwbG9hZGVyID0gZnVuY3Rpb24gKGVudHJpZXMsIG9uRXJyb3IsIHJlc3AsIGxpdmVTb2NrZXQpe1xuICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xuICAgIGxldCBlbnRyeVVwbG9hZGVyID0gbmV3IEVudHJ5VXBsb2FkZXIoZW50cnksIHJlc3AuY29uZmlnLmNodW5rX3NpemUsIGxpdmVTb2NrZXQpXG4gICAgZW50cnlVcGxvYWRlci51cGxvYWQoKVxuICB9KVxufVxuIiwgImxldCBCcm93c2VyID0ge1xuICBjYW5QdXNoU3RhdGUoKXsgcmV0dXJuICh0eXBlb2YgKGhpc3RvcnkucHVzaFN0YXRlKSAhPT0gXCJ1bmRlZmluZWRcIikgfSxcblxuICBkcm9wTG9jYWwobG9jYWxTdG9yYWdlLCBuYW1lc3BhY2UsIHN1YmtleSl7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpKVxuICB9LFxuXG4gIHVwZGF0ZUxvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXksIGluaXRpYWwsIGZ1bmMpe1xuICAgIGxldCBjdXJyZW50ID0gdGhpcy5nZXRMb2NhbChsb2NhbFN0b3JhZ2UsIG5hbWVzcGFjZSwgc3Via2V5KVxuICAgIGxldCBrZXkgPSB0aGlzLmxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KVxuICAgIGxldCBuZXdWYWwgPSBjdXJyZW50ID09PSBudWxsID8gaW5pdGlhbCA6IGZ1bmMoY3VycmVudClcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksIEpTT04uc3RyaW5naWZ5KG5ld1ZhbCkpXG4gICAgcmV0dXJuIG5ld1ZhbFxuICB9LFxuXG4gIGdldExvY2FsKGxvY2FsU3RvcmFnZSwgbmFtZXNwYWNlLCBzdWJrZXkpe1xuICAgIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMubG9jYWxLZXkobmFtZXNwYWNlLCBzdWJrZXkpKSlcbiAgfSxcblxuICB1cGRhdGVDdXJyZW50U3RhdGUoY2FsbGJhY2spe1xuICAgIGlmKCF0aGlzLmNhblB1c2hTdGF0ZSgpKXsgcmV0dXJuIH1cbiAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShjYWxsYmFjayhoaXN0b3J5LnN0YXRlIHx8IHt9KSwgXCJcIiwgd2luZG93LmxvY2F0aW9uLmhyZWYpXG4gIH0sXG5cbiAgcHVzaFN0YXRlKGtpbmQsIG1ldGEsIHRvKXtcbiAgICBpZih0aGlzLmNhblB1c2hTdGF0ZSgpKXtcbiAgICAgIGlmKHRvICE9PSB3aW5kb3cubG9jYXRpb24uaHJlZil7XG4gICAgICAgIGlmKG1ldGEudHlwZSA9PSBcInJlZGlyZWN0XCIgJiYgbWV0YS5zY3JvbGwpe1xuICAgICAgICAgIC8vIElmIHdlJ3JlIHJlZGlyZWN0aW5nIHN0b3JlIHRoZSBjdXJyZW50IHNjcm9sbFkgZm9yIHRoZSBjdXJyZW50IGhpc3Rvcnkgc3RhdGUuXG4gICAgICAgICAgbGV0IGN1cnJlbnRTdGF0ZSA9IGhpc3Rvcnkuc3RhdGUgfHwge31cbiAgICAgICAgICBjdXJyZW50U3RhdGUuc2Nyb2xsID0gbWV0YS5zY3JvbGxcbiAgICAgICAgICBoaXN0b3J5LnJlcGxhY2VTdGF0ZShjdXJyZW50U3RhdGUsIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5ocmVmKVxuICAgICAgICB9XG5cbiAgICAgICAgZGVsZXRlIG1ldGEuc2Nyb2xsIC8vIE9ubHkgc3RvcmUgdGhlIHNjcm9sbCBpbiB0aGUgcmVkaXJlY3QgY2FzZS5cbiAgICAgICAgaGlzdG9yeVtraW5kICsgXCJTdGF0ZVwiXShtZXRhLCBcIlwiLCB0byB8fCBudWxsKSAvLyBJRSB3aWxsIGNvZXJjZSB1bmRlZmluZWQgdG8gc3RyaW5nXG4gICAgICAgIGxldCBoYXNoRWwgPSB0aGlzLmdldEhhc2hUYXJnZXRFbCh3aW5kb3cubG9jYXRpb24uaGFzaClcblxuICAgICAgICBpZihoYXNoRWwpe1xuICAgICAgICAgIGhhc2hFbC5zY3JvbGxJbnRvVmlldygpXG4gICAgICAgIH0gZWxzZSBpZihtZXRhLnR5cGUgPT09IFwicmVkaXJlY3RcIil7XG4gICAgICAgICAgd2luZG93LnNjcm9sbCgwLCAwKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVkaXJlY3QodG8pXG4gICAgfVxuICB9LFxuXG4gIHNldENvb2tpZShuYW1lLCB2YWx1ZSl7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09JHt2YWx1ZX1gXG4gIH0sXG5cbiAgZ2V0Q29va2llKG5hbWUpe1xuICAgIHJldHVybiBkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzooPzpefC4qO1xccyopJHtuYW1lfVxccypcXD1cXHMqKFteO10qKS4qJCl8Xi4qJGApLCBcIiQxXCIpXG4gIH0sXG5cbiAgcmVkaXJlY3QodG9VUkwsIGZsYXNoKXtcbiAgICBpZihmbGFzaCl7IEJyb3dzZXIuc2V0Q29va2llKFwiX19waG9lbml4X2ZsYXNoX19cIiwgZmxhc2ggKyBcIjsgbWF4LWFnZT02MDAwMDsgcGF0aD0vXCIpIH1cbiAgICB3aW5kb3cubG9jYXRpb24gPSB0b1VSTFxuICB9LFxuXG4gIGxvY2FsS2V5KG5hbWVzcGFjZSwgc3Via2V5KXsgcmV0dXJuIGAke25hbWVzcGFjZX0tJHtzdWJrZXl9YCB9LFxuXG4gIGdldEhhc2hUYXJnZXRFbChtYXliZUhhc2gpe1xuICAgIGxldCBoYXNoID0gbWF5YmVIYXNoLnRvU3RyaW5nKCkuc3Vic3RyaW5nKDEpXG4gICAgaWYoaGFzaCA9PT0gXCJcIil7IHJldHVybiB9XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGFbbmFtZT1cIiR7aGFzaH1cIl1gKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJyb3dzZXJcbiIsICJpbXBvcnQge1xuICBDSEVDS0FCTEVfSU5QVVRTLFxuICBERUJPVU5DRV9QUkVWX0tFWSxcbiAgREVCT1VOQ0VfVFJJR0dFUixcbiAgRk9DVVNBQkxFX0lOUFVUUyxcbiAgUEhYX0NPTVBPTkVOVCxcbiAgUEhYX0VWRU5UX0NMQVNTRVMsXG4gIFBIWF9IQVNfRk9DVVNFRCxcbiAgUEhYX0hBU19TVUJNSVRURUQsXG4gIFBIWF9NQUlOLFxuICBQSFhfTk9fRkVFREJBQ0tfQ0xBU1MsXG4gIFBIWF9QQVJFTlRfSUQsXG4gIFBIWF9QUklWQVRFLFxuICBQSFhfUkVGLFxuICBQSFhfUkVGX1NSQyxcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9TRVNTSU9OLFxuICBQSFhfU1RBVElDLFxuICBQSFhfVVBMT0FEX1JFRixcbiAgUEhYX1ZJRVdfU0VMRUNUT1IsXG4gIFBIWF9TVElDS1ksXG4gIFRIUk9UVExFRFxufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBsb2dFcnJvclxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmxldCBET00gPSB7XG4gIGJ5SWQoaWQpeyByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIHx8IGxvZ0Vycm9yKGBubyBpZCBmb3VuZCBmb3IgJHtpZH1gKSB9LFxuXG4gIHJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpe1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgIGlmKGVsLmNsYXNzTGlzdC5sZW5ndGggPT09IDApeyBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKSB9XG4gIH0sXG5cbiAgYWxsKG5vZGUsIHF1ZXJ5LCBjYWxsYmFjayl7XG4gICAgaWYoIW5vZGUpeyByZXR1cm4gW10gfVxuICAgIGxldCBhcnJheSA9IEFycmF5LmZyb20obm9kZS5xdWVyeVNlbGVjdG9yQWxsKHF1ZXJ5KSlcbiAgICByZXR1cm4gY2FsbGJhY2sgPyBhcnJheS5mb3JFYWNoKGNhbGxiYWNrKSA6IGFycmF5XG4gIH0sXG5cbiAgY2hpbGROb2RlTGVuZ3RoKGh0bWwpe1xuICAgIGxldCB0ZW1wbGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKVxuICAgIHRlbXBsYXRlLmlubmVySFRNTCA9IGh0bWxcbiAgICByZXR1cm4gdGVtcGxhdGUuY29udGVudC5jaGlsZEVsZW1lbnRDb3VudFxuICB9LFxuXG4gIGlzVXBsb2FkSW5wdXQoZWwpeyByZXR1cm4gZWwudHlwZSA9PT0gXCJmaWxlXCIgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSAhPT0gbnVsbCB9LFxuXG4gIGZpbmRVcGxvYWRJbnB1dHMobm9kZSl7IHJldHVybiB0aGlzLmFsbChub2RlLCBgaW5wdXRbdHlwZT1cImZpbGVcIl1bJHtQSFhfVVBMT0FEX1JFRn1dYCkgfSxcblxuICBmaW5kQ29tcG9uZW50Tm9kZUxpc3Qobm9kZSwgY2lkKXtcbiAgICByZXR1cm4gdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwobm9kZSwgYFske1BIWF9DT01QT05FTlR9PVwiJHtjaWR9XCJdYCksIG5vZGUpXG4gIH0sXG5cbiAgaXNQaHhEZXN0cm95ZWQobm9kZSl7XG4gICAgcmV0dXJuIG5vZGUuaWQgJiYgRE9NLnByaXZhdGUobm9kZSwgXCJkZXN0cm95ZWRcIikgPyB0cnVlIDogZmFsc2VcbiAgfSxcblxuICBtYXJrUGh4Q2hpbGREZXN0cm95ZWQoZWwpe1xuICAgIGlmKHRoaXMuaXNQaHhDaGlsZChlbCkpeyBlbC5zZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04sIFwiXCIpIH1cbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIFwiZGVzdHJveWVkXCIsIHRydWUpXG4gIH0sXG5cbiAgZmluZFBoeENoaWxkcmVuSW5GcmFnbWVudChodG1sLCBwYXJlbnRJZCl7XG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gaHRtbFxuICAgIHJldHVybiB0aGlzLmZpbmRQaHhDaGlsZHJlbih0ZW1wbGF0ZS5jb250ZW50LCBwYXJlbnRJZClcbiAgfSxcblxuICBpc0lnbm9yZWQoZWwsIHBoeFVwZGF0ZSl7XG4gICAgcmV0dXJuIChlbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSB8fCBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC11cGRhdGVcIikpID09PSBcImlnbm9yZVwiXG4gIH0sXG5cbiAgaXNQaHhVcGRhdGUoZWwsIHBoeFVwZGF0ZSwgdXBkYXRlVHlwZXMpe1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgdXBkYXRlVHlwZXMuaW5kZXhPZihlbC5nZXRBdHRyaWJ1dGUocGh4VXBkYXRlKSkgPj0gMFxuICB9LFxuXG4gIGZpbmRQaHhTdGlja3koZWwpeyByZXR1cm4gdGhpcy5hbGwoZWwsIGBbJHtQSFhfU1RJQ0tZfV1gKSB9LFxuXG4gIGZpbmRQaHhDaGlsZHJlbihlbCwgcGFyZW50SWQpe1xuICAgIHJldHVybiB0aGlzLmFsbChlbCwgYCR7UEhYX1ZJRVdfU0VMRUNUT1J9WyR7UEhYX1BBUkVOVF9JRH09XCIke3BhcmVudElkfVwiXWApXG4gIH0sXG5cbiAgZmluZFBhcmVudENJRHMobm9kZSwgY2lkcyl7XG4gICAgbGV0IGluaXRpYWwgPSBuZXcgU2V0KGNpZHMpXG4gICAgcmV0dXJuIGNpZHMucmVkdWNlKChhY2MsIGNpZCkgPT4ge1xuICAgICAgbGV0IHNlbGVjdG9yID0gYFske1BIWF9DT01QT05FTlR9PVwiJHtjaWR9XCJdIFske1BIWF9DT01QT05FTlR9XWBcblxuICAgICAgdGhpcy5maWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcodGhpcy5hbGwobm9kZSwgc2VsZWN0b3IpLCBub2RlKVxuICAgICAgICAubWFwKGVsID0+IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSkpXG4gICAgICAgIC5mb3JFYWNoKGNoaWxkQ0lEID0+IGFjYy5kZWxldGUoY2hpbGRDSUQpKVxuXG4gICAgICByZXR1cm4gYWNjXG4gICAgfSwgaW5pdGlhbClcbiAgfSxcblxuICBmaWx0ZXJXaXRoaW5TYW1lTGl2ZVZpZXcobm9kZXMsIHBhcmVudCl7XG4gICAgaWYocGFyZW50LnF1ZXJ5U2VsZWN0b3IoUEhYX1ZJRVdfU0VMRUNUT1IpKXtcbiAgICAgIHJldHVybiBub2Rlcy5maWx0ZXIoZWwgPT4gdGhpcy53aXRoaW5TYW1lTGl2ZVZpZXcoZWwsIHBhcmVudCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBub2Rlc1xuICAgIH1cbiAgfSxcblxuICB3aXRoaW5TYW1lTGl2ZVZpZXcobm9kZSwgcGFyZW50KXtcbiAgICB3aGlsZShub2RlID0gbm9kZS5wYXJlbnROb2RlKXtcbiAgICAgIGlmKG5vZGUuaXNTYW1lTm9kZShwYXJlbnQpKXsgcmV0dXJuIHRydWUgfVxuICAgICAgaWYobm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1NFU1NJT04pICE9PSBudWxsKXsgcmV0dXJuIGZhbHNlIH1cbiAgICB9XG4gIH0sXG5cbiAgcHJpdmF0ZShlbCwga2V5KXsgcmV0dXJuIGVsW1BIWF9QUklWQVRFXSAmJiBlbFtQSFhfUFJJVkFURV1ba2V5XSB9LFxuXG4gIGRlbGV0ZVByaXZhdGUoZWwsIGtleSl7IGVsW1BIWF9QUklWQVRFXSAmJiBkZWxldGUgKGVsW1BIWF9QUklWQVRFXVtrZXldKSB9LFxuXG4gIHB1dFByaXZhdGUoZWwsIGtleSwgdmFsdWUpe1xuICAgIGlmKCFlbFtQSFhfUFJJVkFURV0peyBlbFtQSFhfUFJJVkFURV0gPSB7fSB9XG4gICAgZWxbUEhYX1BSSVZBVEVdW2tleV0gPSB2YWx1ZVxuICB9LFxuXG4gIHVwZGF0ZVByaXZhdGUoZWwsIGtleSwgZGVmYXVsdFZhbCwgdXBkYXRlRnVuYyl7XG4gICAgbGV0IGV4aXN0aW5nID0gdGhpcy5wcml2YXRlKGVsLCBrZXkpXG4gICAgaWYoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCl7XG4gICAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgdXBkYXRlRnVuYyhkZWZhdWx0VmFsKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBrZXksIHVwZGF0ZUZ1bmMoZXhpc3RpbmcpKVxuICAgIH1cbiAgfSxcblxuICBjb3B5UHJpdmF0ZXModGFyZ2V0LCBzb3VyY2Upe1xuICAgIGlmKHNvdXJjZVtQSFhfUFJJVkFURV0pe1xuICAgICAgdGFyZ2V0W1BIWF9QUklWQVRFXSA9IHNvdXJjZVtQSFhfUFJJVkFURV1cbiAgICB9XG4gIH0sXG5cbiAgcHV0VGl0bGUoc3RyKXtcbiAgICBsZXQgdGl0bGVFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ0aXRsZVwiKVxuICAgIGxldCB7cHJlZml4LCBzdWZmaXh9ID0gdGl0bGVFbC5kYXRhc2V0XG4gICAgZG9jdW1lbnQudGl0bGUgPSBgJHtwcmVmaXggfHwgXCJcIn0ke3N0cn0ke3N1ZmZpeCB8fCBcIlwifWBcbiAgfSxcblxuICBkZWJvdW5jZShlbCwgZXZlbnQsIHBoeERlYm91bmNlLCBkZWZhdWx0RGVib3VuY2UsIHBoeFRocm90dGxlLCBkZWZhdWx0VGhyb3R0bGUsIGNhbGxiYWNrKXtcbiAgICBsZXQgZGVib3VuY2UgPSBlbC5nZXRBdHRyaWJ1dGUocGh4RGVib3VuY2UpXG4gICAgbGV0IHRocm90dGxlID0gZWwuZ2V0QXR0cmlidXRlKHBoeFRocm90dGxlKVxuICAgIGlmKGRlYm91bmNlID09PSBcIlwiKXsgZGVib3VuY2UgPSBkZWZhdWx0RGVib3VuY2UgfVxuICAgIGlmKHRocm90dGxlID09PSBcIlwiKXsgdGhyb3R0bGUgPSBkZWZhdWx0VGhyb3R0bGUgfVxuICAgIGxldCB2YWx1ZSA9IGRlYm91bmNlIHx8IHRocm90dGxlXG4gICAgc3dpdGNoKHZhbHVlKXtcbiAgICAgIGNhc2UgbnVsbDogcmV0dXJuIGNhbGxiYWNrKClcblxuICAgICAgY2FzZSBcImJsdXJcIjpcbiAgICAgICAgaWYodGhpcy5vbmNlKGVsLCBcImRlYm91bmNlLWJsdXJcIikpe1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IGNhbGxiYWNrKCkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxldCB0aW1lb3V0ID0gcGFyc2VJbnQodmFsdWUpXG4gICAgICAgIGxldCB0cmlnZ2VyID0gKCkgPT4gdGhyb3R0bGUgPyB0aGlzLmRlbGV0ZVByaXZhdGUoZWwsIFRIUk9UVExFRCkgOiBjYWxsYmFjaygpXG4gICAgICAgIGxldCBjdXJyZW50Q3ljbGUgPSB0aGlzLmluY0N5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSLCB0cmlnZ2VyKVxuICAgICAgICBpZihpc05hTih0aW1lb3V0KSl7IHJldHVybiBsb2dFcnJvcihgaW52YWxpZCB0aHJvdHRsZS9kZWJvdW5jZSB2YWx1ZTogJHt2YWx1ZX1gKSB9XG4gICAgICAgIGlmKHRocm90dGxlKXtcbiAgICAgICAgICBsZXQgbmV3S2V5RG93biA9IGZhbHNlXG4gICAgICAgICAgaWYoZXZlbnQudHlwZSA9PT0gXCJrZXlkb3duXCIpe1xuICAgICAgICAgICAgbGV0IHByZXZLZXkgPSB0aGlzLnByaXZhdGUoZWwsIERFQk9VTkNFX1BSRVZfS0VZKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBERUJPVU5DRV9QUkVWX0tFWSwgZXZlbnQua2V5KVxuICAgICAgICAgICAgbmV3S2V5RG93biA9IHByZXZLZXkgIT09IGV2ZW50LmtleVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKCFuZXdLZXlEb3duICYmIHRoaXMucHJpdmF0ZShlbCwgVEhST1RUTEVEKSl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICAgICAgdGhpcy5wdXRQcml2YXRlKGVsLCBUSFJPVFRMRUQsIHRydWUpXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKSwgdGltZW91dClcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnRyaWdnZXJDeWNsZShlbCwgREVCT1VOQ0VfVFJJR0dFUiwgY3VycmVudEN5Y2xlKSwgdGltZW91dClcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGZvcm0gPSBlbC5mb3JtXG4gICAgICAgIGlmKGZvcm0gJiYgdGhpcy5vbmNlKGZvcm0sIFwiYmluZC1kZWJvdW5jZVwiKSl7XG4gICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsICgpID0+IHtcbiAgICAgICAgICAgIEFycmF5LmZyb20oKG5ldyBGb3JtRGF0YShmb3JtKSkuZW50cmllcygpLCAoW25hbWVdKSA9PiB7XG4gICAgICAgICAgICAgIGxldCBpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcihgW25hbWU9XCIke25hbWV9XCJdYClcbiAgICAgICAgICAgICAgdGhpcy5pbmNDeWNsZShpbnB1dCwgREVCT1VOQ0VfVFJJR0dFUilcbiAgICAgICAgICAgICAgdGhpcy5kZWxldGVQcml2YXRlKGlucHV0LCBUSFJPVFRMRUQpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5vbmNlKGVsLCBcImJpbmQtZGVib3VuY2VcIikpe1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJibHVyXCIsICgpID0+IHRoaXMudHJpZ2dlckN5Y2xlKGVsLCBERUJPVU5DRV9UUklHR0VSKSlcbiAgICAgICAgfVxuICAgIH1cbiAgfSxcblxuICB0cmlnZ2VyQ3ljbGUoZWwsIGtleSwgY3VycmVudEN5Y2xlKXtcbiAgICBsZXQgW2N5Y2xlLCB0cmlnZ2VyXSA9IHRoaXMucHJpdmF0ZShlbCwga2V5KVxuICAgIGlmKCFjdXJyZW50Q3ljbGUpeyBjdXJyZW50Q3ljbGUgPSBjeWNsZSB9XG4gICAgaWYoY3VycmVudEN5Y2xlID09PSBjeWNsZSl7XG4gICAgICB0aGlzLmluY0N5Y2xlKGVsLCBrZXkpXG4gICAgICB0cmlnZ2VyKClcbiAgICB9XG4gIH0sXG5cbiAgb25jZShlbCwga2V5KXtcbiAgICBpZih0aGlzLnByaXZhdGUoZWwsIGtleSkgPT09IHRydWUpeyByZXR1cm4gZmFsc2UgfVxuICAgIHRoaXMucHV0UHJpdmF0ZShlbCwga2V5LCB0cnVlKVxuICAgIHJldHVybiB0cnVlXG4gIH0sXG5cbiAgaW5jQ3ljbGUoZWwsIGtleSwgdHJpZ2dlciA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICBsZXQgW2N1cnJlbnRDeWNsZV0gPSB0aGlzLnByaXZhdGUoZWwsIGtleSkgfHwgWzAsIHRyaWdnZXJdXG4gICAgY3VycmVudEN5Y2xlKytcbiAgICB0aGlzLnB1dFByaXZhdGUoZWwsIGtleSwgW2N1cnJlbnRDeWNsZSwgdHJpZ2dlcl0pXG4gICAgcmV0dXJuIGN1cnJlbnRDeWNsZVxuICB9LFxuXG4gIGRpc2NhcmRFcnJvcihjb250YWluZXIsIGVsLCBwaHhGZWVkYmFja0Zvcil7XG4gICAgbGV0IGZpZWxkID0gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShwaHhGZWVkYmFja0ZvcilcbiAgICAvLyBUT0RPOiBSZW1vdmUgaWQgbG9va3VwIGFmdGVyIHdlIHVwZGF0ZSBQaG9lbml4IHRvIHVzZSBpbnB1dF9uYW1lIGluc3RlYWQgb2YgaW5wdXRfaWRcbiAgICBsZXQgaW5wdXQgPSBmaWVsZCAmJiBjb250YWluZXIucXVlcnlTZWxlY3RvcihgW2lkPVwiJHtmaWVsZH1cIl0sIFtuYW1lPVwiJHtmaWVsZH1cIl1gKVxuICAgIGlmKCFpbnB1dCl7IHJldHVybiB9XG5cbiAgICBpZighKHRoaXMucHJpdmF0ZShpbnB1dCwgUEhYX0hBU19GT0NVU0VEKSB8fCB0aGlzLnByaXZhdGUoaW5wdXQuZm9ybSwgUEhYX0hBU19TVUJNSVRURUQpKSl7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFBIWF9OT19GRUVEQkFDS19DTEFTUylcbiAgICB9XG4gIH0sXG5cbiAgc2hvd0Vycm9yKGlucHV0RWwsIHBoeEZlZWRiYWNrRm9yKXtcbiAgICBpZihpbnB1dEVsLmlkIHx8IGlucHV0RWwubmFtZSl7XG4gICAgICB0aGlzLmFsbChpbnB1dEVsLmZvcm0sIGBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2lucHV0RWwuaWR9XCJdLCBbJHtwaHhGZWVkYmFja0Zvcn09XCIke2lucHV0RWwubmFtZX1cIl1gLCAoZWwpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcyhlbCwgUEhYX05PX0ZFRURCQUNLX0NMQVNTKVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgaXNQaHhDaGlsZChub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRClcbiAgfSxcblxuICBpc1BoeFN0aWNreShub2RlKXtcbiAgICByZXR1cm4gbm9kZS5nZXRBdHRyaWJ1dGUgJiYgbm9kZS5nZXRBdHRyaWJ1dGUoUEhYX1NUSUNLWSkgIT09IG51bGxcbiAgfSxcblxuICBmaXJzdFBoeENoaWxkKGVsKXtcbiAgICByZXR1cm4gdGhpcy5pc1BoeENoaWxkKGVsKSA/IGVsIDogdGhpcy5hbGwoZWwsIGBbJHtQSFhfUEFSRU5UX0lEfV1gKVswXVxuICB9LFxuXG4gIGRpc3BhdGNoRXZlbnQodGFyZ2V0LCBldmVudFN0cmluZywgZGV0YWlsID0ge30pe1xuICAgIGxldCBldmVudCA9IG5ldyBDdXN0b21FdmVudChldmVudFN0cmluZywge2J1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWUsIGRldGFpbDogZGV0YWlsfSlcbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChldmVudClcbiAgfSxcblxuICBjbG9uZU5vZGUobm9kZSwgaHRtbCl7XG4gICAgaWYodHlwZW9mIChodG1sKSA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICByZXR1cm4gbm9kZS5jbG9uZU5vZGUodHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGNsb25lZCA9IG5vZGUuY2xvbmVOb2RlKGZhbHNlKVxuICAgICAgY2xvbmVkLmlubmVySFRNTCA9IGh0bWxcbiAgICAgIHJldHVybiBjbG9uZWRcbiAgICB9XG4gIH0sXG5cbiAgbWVyZ2VBdHRycyh0YXJnZXQsIHNvdXJjZSwgb3B0cyA9IHt9KXtcbiAgICBsZXQgZXhjbHVkZSA9IG9wdHMuZXhjbHVkZSB8fCBbXVxuICAgIGxldCBpc0lnbm9yZWQgPSBvcHRzLmlzSWdub3JlZFxuICAgIGxldCBzb3VyY2VBdHRycyA9IHNvdXJjZS5hdHRyaWJ1dGVzXG4gICAgZm9yKGxldCBpID0gc291cmNlQXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pe1xuICAgICAgbGV0IG5hbWUgPSBzb3VyY2VBdHRyc1tpXS5uYW1lXG4gICAgICBpZihleGNsdWRlLmluZGV4T2YobmFtZSkgPCAwKXsgdGFyZ2V0LnNldEF0dHJpYnV0ZShuYW1lLCBzb3VyY2UuZ2V0QXR0cmlidXRlKG5hbWUpKSB9XG4gICAgfVxuXG4gICAgbGV0IHRhcmdldEF0dHJzID0gdGFyZ2V0LmF0dHJpYnV0ZXNcbiAgICBmb3IobGV0IGkgPSB0YXJnZXRBdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSl7XG4gICAgICBsZXQgbmFtZSA9IHRhcmdldEF0dHJzW2ldLm5hbWVcbiAgICAgIGlmKGlzSWdub3JlZCl7XG4gICAgICAgIGlmKG5hbWUuc3RhcnRzV2l0aChcImRhdGEtXCIpICYmICFzb3VyY2UuaGFzQXR0cmlidXRlKG5hbWUpKXsgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShuYW1lKSB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZighc291cmNlLmhhc0F0dHJpYnV0ZShuYW1lKSl7IHRhcmdldC5yZW1vdmVBdHRyaWJ1dGUobmFtZSkgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBtZXJnZUZvY3VzZWRJbnB1dCh0YXJnZXQsIHNvdXJjZSl7XG4gICAgLy8gc2tpcCBzZWxlY3RzIGJlY2F1c2UgRkYgd2lsbCByZXNldCBoaWdobGlnaHRlZCBpbmRleCBmb3IgYW55IHNldEF0dHJpYnV0ZVxuICAgIGlmKCEodGFyZ2V0IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpKXsgRE9NLm1lcmdlQXR0cnModGFyZ2V0LCBzb3VyY2UsIHtleGNlcHQ6IFtcInZhbHVlXCJdfSkgfVxuICAgIGlmKHNvdXJjZS5yZWFkT25seSl7XG4gICAgICB0YXJnZXQuc2V0QXR0cmlidXRlKFwicmVhZG9ubHlcIiwgdHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0LnJlbW92ZUF0dHJpYnV0ZShcInJlYWRvbmx5XCIpXG4gICAgfVxuICB9LFxuXG4gIGhhc1NlbGVjdGlvblJhbmdlKGVsKXtcbiAgICByZXR1cm4gZWwuc2V0U2VsZWN0aW9uUmFuZ2UgJiYgKGVsLnR5cGUgPT09IFwidGV4dFwiIHx8IGVsLnR5cGUgPT09IFwidGV4dGFyZWFcIilcbiAgfSxcblxuICByZXN0b3JlRm9jdXMoZm9jdXNlZCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCl7XG4gICAgaWYoIURPTS5pc1RleHR1YWxJbnB1dChmb2N1c2VkKSl7IHJldHVybiB9XG4gICAgbGV0IHdhc0ZvY3VzZWQgPSBmb2N1c2VkLm1hdGNoZXMoXCI6Zm9jdXNcIilcbiAgICBpZihmb2N1c2VkLnJlYWRPbmx5KXsgZm9jdXNlZC5ibHVyKCkgfVxuICAgIGlmKCF3YXNGb2N1c2VkKXsgZm9jdXNlZC5mb2N1cygpIH1cbiAgICBpZih0aGlzLmhhc1NlbGVjdGlvblJhbmdlKGZvY3VzZWQpKXtcbiAgICAgIGZvY3VzZWQuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZClcbiAgICB9XG4gIH0sXG5cbiAgaXNGb3JtSW5wdXQoZWwpeyByZXR1cm4gL14oPzppbnB1dHxzZWxlY3R8dGV4dGFyZWEpJC9pLnRlc3QoZWwudGFnTmFtZSkgJiYgZWwudHlwZSAhPT0gXCJidXR0b25cIiB9LFxuXG4gIHN5bmNBdHRyc1RvUHJvcHMoZWwpe1xuICAgIGlmKGVsIGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiBDSEVDS0FCTEVfSU5QVVRTLmluZGV4T2YoZWwudHlwZS50b0xvY2FsZUxvd2VyQ2FzZSgpKSA+PSAwKXtcbiAgICAgIGVsLmNoZWNrZWQgPSBlbC5nZXRBdHRyaWJ1dGUoXCJjaGVja2VkXCIpICE9PSBudWxsXG4gICAgfVxuICB9LFxuXG4gIGlzVGV4dHVhbElucHV0KGVsKXsgcmV0dXJuIEZPQ1VTQUJMRV9JTlBVVFMuaW5kZXhPZihlbC50eXBlKSA+PSAwIH0sXG5cbiAgaXNOb3dUcmlnZ2VyRm9ybUV4dGVybmFsKGVsLCBwaHhUcmlnZ2VyRXh0ZXJuYWwpe1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKHBoeFRyaWdnZXJFeHRlcm5hbCkgIT09IG51bGxcbiAgfSxcblxuICBzeW5jUGVuZGluZ1JlZihmcm9tRWwsIHRvRWwsIGRpc2FibGVXaXRoKXtcbiAgICBsZXQgcmVmID0gZnJvbUVsLmdldEF0dHJpYnV0ZShQSFhfUkVGKVxuICAgIGlmKHJlZiA9PT0gbnVsbCl7IHJldHVybiB0cnVlIH1cbiAgICBsZXQgcmVmU3JjID0gZnJvbUVsLmdldEF0dHJpYnV0ZShQSFhfUkVGX1NSQylcblxuICAgIGlmKERPTS5pc0Zvcm1JbnB1dChmcm9tRWwpIHx8IGZyb21FbC5nZXRBdHRyaWJ1dGUoZGlzYWJsZVdpdGgpICE9PSBudWxsKXtcbiAgICAgIGlmKERPTS5pc1VwbG9hZElucHV0KGZyb21FbCkpeyBET00ubWVyZ2VBdHRycyhmcm9tRWwsIHRvRWwsIHtpc0lnbm9yZWQ6IHRydWV9KSB9XG4gICAgICBET00ucHV0UHJpdmF0ZShmcm9tRWwsIFBIWF9SRUYsIHRvRWwpXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgUEhYX0VWRU5UX0NMQVNTRVMuZm9yRWFjaChjbGFzc05hbWUgPT4ge1xuICAgICAgICBmcm9tRWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkgJiYgdG9FbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcbiAgICAgIH0pXG4gICAgICB0b0VsLnNldEF0dHJpYnV0ZShQSFhfUkVGLCByZWYpXG4gICAgICB0b0VsLnNldEF0dHJpYnV0ZShQSFhfUkVGX1NSQywgcmVmU3JjKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH0sXG5cbiAgY2xlYW5DaGlsZE5vZGVzKGNvbnRhaW5lciwgcGh4VXBkYXRlKXtcbiAgICBpZihET00uaXNQaHhVcGRhdGUoY29udGFpbmVyLCBwaHhVcGRhdGUsIFtcImFwcGVuZFwiLCBcInByZXBlbmRcIl0pKXtcbiAgICAgIGxldCB0b1JlbW92ZSA9IFtdXG4gICAgICBjb250YWluZXIuY2hpbGROb2Rlcy5mb3JFYWNoKGNoaWxkTm9kZSA9PiB7XG4gICAgICAgIGlmKCFjaGlsZE5vZGUuaWQpe1xuICAgICAgICAgIC8vIFNraXAgd2FybmluZyBpZiBpdCdzIGFuIGVtcHR5IHRleHQgbm9kZSAoZS5nLiBhIG5ldy1saW5lKVxuICAgICAgICAgIGxldCBpc0VtcHR5VGV4dE5vZGUgPSBjaGlsZE5vZGUubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFICYmIGNoaWxkTm9kZS5ub2RlVmFsdWUudHJpbSgpID09PSBcIlwiXG4gICAgICAgICAgaWYoIWlzRW1wdHlUZXh0Tm9kZSl7XG4gICAgICAgICAgICBsb2dFcnJvcihcIm9ubHkgSFRNTCBlbGVtZW50IHRhZ3Mgd2l0aCBhbiBpZCBhcmUgYWxsb3dlZCBpbnNpZGUgY29udGFpbmVycyB3aXRoIHBoeC11cGRhdGUuXFxuXFxuXCIgK1xuICAgICAgICAgICAgICBgcmVtb3ZpbmcgaWxsZWdhbCBub2RlOiBcIiR7KGNoaWxkTm9kZS5vdXRlckhUTUwgfHwgY2hpbGROb2RlLm5vZGVWYWx1ZSkudHJpbSgpfVwiXFxuXFxuYClcbiAgICAgICAgICB9XG4gICAgICAgICAgdG9SZW1vdmUucHVzaChjaGlsZE5vZGUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0b1JlbW92ZS5mb3JFYWNoKGNoaWxkTm9kZSA9PiBjaGlsZE5vZGUucmVtb3ZlKCkpXG4gICAgfVxuICB9LFxuXG4gIHJlcGxhY2VSb290Q29udGFpbmVyKGNvbnRhaW5lciwgdGFnTmFtZSwgYXR0cnMpe1xuICAgIGxldCByZXRhaW5lZEF0dHJzID0gbmV3IFNldChbXCJpZFwiLCBQSFhfU0VTU0lPTiwgUEhYX1NUQVRJQywgUEhYX01BSU4sIFBIWF9ST09UX0lEXSlcbiAgICBpZihjb250YWluZXIudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0YWdOYW1lLnRvTG93ZXJDYXNlKCkpe1xuICAgICAgQXJyYXkuZnJvbShjb250YWluZXIuYXR0cmlidXRlcylcbiAgICAgICAgLmZpbHRlcihhdHRyID0+ICFyZXRhaW5lZEF0dHJzLmhhcyhhdHRyLm5hbWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgIC5mb3JFYWNoKGF0dHIgPT4gY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShhdHRyLm5hbWUpKVxuXG4gICAgICBPYmplY3Qua2V5cyhhdHRycylcbiAgICAgICAgLmZpbHRlcihuYW1lID0+ICFyZXRhaW5lZEF0dHJzLmhhcyhuYW1lLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAuZm9yRWFjaChhdHRyID0+IGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYXR0ciwgYXR0cnNbYXR0cl0pKVxuXG4gICAgICByZXR1cm4gY29udGFpbmVyXG5cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5ld0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSlcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJzKS5mb3JFYWNoKGF0dHIgPT4gbmV3Q29udGFpbmVyLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyc1thdHRyXSkpXG4gICAgICByZXRhaW5lZEF0dHJzLmZvckVhY2goYXR0ciA9PiBuZXdDb250YWluZXIuc2V0QXR0cmlidXRlKGF0dHIsIGNvbnRhaW5lci5nZXRBdHRyaWJ1dGUoYXR0cikpKVxuICAgICAgbmV3Q29udGFpbmVyLmlubmVySFRNTCA9IGNvbnRhaW5lci5pbm5lckhUTUxcbiAgICAgIGNvbnRhaW5lci5yZXBsYWNlV2l0aChuZXdDb250YWluZXIpXG4gICAgICByZXR1cm4gbmV3Q29udGFpbmVyXG4gICAgfVxuICB9LFxuXG4gIGdldFN0aWNreShlbCwgbmFtZSwgZGVmYXVsdFZhbCl7XG4gICAgbGV0IG9wID0gKERPTS5wcml2YXRlKGVsLCBcInN0aWNreVwiKSB8fCBbXSkuZmluZCgoW2V4aXN0aW5nTmFtZSwgXSkgPT4gbmFtZSA9PT0gZXhpc3RpbmdOYW1lKVxuICAgIGlmKG9wKXtcbiAgICAgIGxldCBbX25hbWUsIF9vcCwgc3Rhc2hlZFJlc3VsdF0gPSBvcFxuICAgICAgcmV0dXJuIHN0YXNoZWRSZXN1bHRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHR5cGVvZihkZWZhdWx0VmFsKSA9PT0gXCJmdW5jdGlvblwiID8gZGVmYXVsdFZhbCgpIDogZGVmYXVsdFZhbFxuICAgIH1cbiAgfSxcblxuICBkZWxldGVTdGlja3koZWwsIG5hbWUpe1xuICAgIHRoaXMudXBkYXRlUHJpdmF0ZShlbCwgXCJzdGlja3lcIiwgW10sIG9wcyA9PiB7XG4gICAgICByZXR1cm4gb3BzLmZpbHRlcigoW2V4aXN0aW5nTmFtZSwgX10pID0+IGV4aXN0aW5nTmFtZSAhPT0gbmFtZSlcbiAgICB9KVxuICB9LFxuXG4gIHB1dFN0aWNreShlbCwgbmFtZSwgb3Ape1xuICAgIGxldCBzdGFzaGVkUmVzdWx0ID0gb3AoZWwpXG4gICAgdGhpcy51cGRhdGVQcml2YXRlKGVsLCBcInN0aWNreVwiLCBbXSwgb3BzID0+IHtcbiAgICAgIGxldCBleGlzdGluZ0luZGV4ID0gb3BzLmZpbmRJbmRleCgoW2V4aXN0aW5nTmFtZSwgXSkgPT4gbmFtZSA9PT0gZXhpc3RpbmdOYW1lKVxuICAgICAgaWYoZXhpc3RpbmdJbmRleCA+PSAwKXtcbiAgICAgICAgb3BzW2V4aXN0aW5nSW5kZXhdID0gW25hbWUsIG9wLCBzdGFzaGVkUmVzdWx0XVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3BzLnB1c2goW25hbWUsIG9wLCBzdGFzaGVkUmVzdWx0XSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcHNcbiAgICB9KVxuICB9LFxuXG4gIGFwcGx5U3RpY2t5T3BlcmF0aW9ucyhlbCl7XG4gICAgbGV0IG9wcyA9IERPTS5wcml2YXRlKGVsLCBcInN0aWNreVwiKVxuICAgIGlmKCFvcHMpeyByZXR1cm4gfVxuXG4gICAgb3BzLmZvckVhY2goKFtuYW1lLCBvcCwgX3N0YXNoZWRdKSA9PiB0aGlzLnB1dFN0aWNreShlbCwgbmFtZSwgb3ApKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERPTVxuIiwgImltcG9ydCB7XG4gIFBIWF9BQ1RJVkVfRU5UUllfUkVGUyxcbiAgUEhYX0xJVkVfRklMRV9VUERBVEVELFxuICBQSFhfUFJFRkxJR0hURURfUkVGU1xufSBmcm9tIFwiLi9jb25zdGFudHNcIlxuXG5pbXBvcnQge1xuICBjaGFubmVsVXBsb2FkZXIsXG4gIGxvZ0Vycm9yXG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXBsb2FkRW50cnkge1xuICBzdGF0aWMgaXNBY3RpdmUoZmlsZUVsLCBmaWxlKXtcbiAgICBsZXQgaXNOZXcgPSBmaWxlLl9waHhSZWYgPT09IHVuZGVmaW5lZFxuICAgIGxldCBhY3RpdmVSZWZzID0gZmlsZUVsLmdldEF0dHJpYnV0ZShQSFhfQUNUSVZFX0VOVFJZX1JFRlMpLnNwbGl0KFwiLFwiKVxuICAgIGxldCBpc0FjdGl2ZSA9IGFjdGl2ZVJlZnMuaW5kZXhPZihMaXZlVXBsb2FkZXIuZ2VuRmlsZVJlZihmaWxlKSkgPj0gMFxuICAgIHJldHVybiBmaWxlLnNpemUgPiAwICYmIChpc05ldyB8fCBpc0FjdGl2ZSlcbiAgfVxuXG4gIHN0YXRpYyBpc1ByZWZsaWdodGVkKGZpbGVFbCwgZmlsZSl7XG4gICAgbGV0IHByZWZsaWdodGVkUmVmcyA9IGZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpLnNwbGl0KFwiLFwiKVxuICAgIGxldCBpc1ByZWZsaWdodGVkID0gcHJlZmxpZ2h0ZWRSZWZzLmluZGV4T2YoTGl2ZVVwbG9hZGVyLmdlbkZpbGVSZWYoZmlsZSkpID49IDBcbiAgICByZXR1cm4gaXNQcmVmbGlnaHRlZCAmJiB0aGlzLmlzQWN0aXZlKGZpbGVFbCwgZmlsZSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGZpbGVFbCwgZmlsZSwgdmlldyl7XG4gICAgdGhpcy5yZWYgPSBMaXZlVXBsb2FkZXIuZ2VuRmlsZVJlZihmaWxlKVxuICAgIHRoaXMuZmlsZUVsID0gZmlsZUVsXG4gICAgdGhpcy5maWxlID0gZmlsZVxuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLm1ldGEgPSBudWxsXG4gICAgdGhpcy5faXNDYW5jZWxsZWQgPSBmYWxzZVxuICAgIHRoaXMuX2lzRG9uZSA9IGZhbHNlXG4gICAgdGhpcy5fcHJvZ3Jlc3MgPSAwXG4gICAgdGhpcy5fbGFzdFByb2dyZXNzU2VudCA9IC0xXG4gICAgdGhpcy5fb25Eb25lID0gZnVuY3Rpb24gKCl7IH1cbiAgICB0aGlzLl9vbkVsVXBkYXRlZCA9IHRoaXMub25FbFVwZGF0ZWQuYmluZCh0aGlzKVxuICAgIHRoaXMuZmlsZUVsLmFkZEV2ZW50TGlzdGVuZXIoUEhYX0xJVkVfRklMRV9VUERBVEVELCB0aGlzLl9vbkVsVXBkYXRlZClcbiAgfVxuXG4gIG1ldGFkYXRhKCl7IHJldHVybiB0aGlzLm1ldGEgfVxuXG4gIHByb2dyZXNzKHByb2dyZXNzKXtcbiAgICB0aGlzLl9wcm9ncmVzcyA9IE1hdGguZmxvb3IocHJvZ3Jlc3MpXG4gICAgaWYodGhpcy5fcHJvZ3Jlc3MgPiB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50KXtcbiAgICAgIGlmKHRoaXMuX3Byb2dyZXNzID49IDEwMCl7XG4gICAgICAgIHRoaXMuX3Byb2dyZXNzID0gMTAwXG4gICAgICAgIHRoaXMuX2xhc3RQcm9ncmVzc1NlbnQgPSAxMDBcbiAgICAgICAgdGhpcy5faXNEb25lID0gdHJ1ZVxuICAgICAgICB0aGlzLnZpZXcucHVzaEZpbGVQcm9ncmVzcyh0aGlzLmZpbGVFbCwgdGhpcy5yZWYsIDEwMCwgKCkgPT4ge1xuICAgICAgICAgIExpdmVVcGxvYWRlci51bnRyYWNrRmlsZSh0aGlzLmZpbGVFbCwgdGhpcy5maWxlKVxuICAgICAgICAgIHRoaXMuX29uRG9uZSgpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9sYXN0UHJvZ3Jlc3NTZW50ID0gdGhpcy5fcHJvZ3Jlc3NcbiAgICAgICAgdGhpcy52aWV3LnB1c2hGaWxlUHJvZ3Jlc3ModGhpcy5maWxlRWwsIHRoaXMucmVmLCB0aGlzLl9wcm9ncmVzcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjYW5jZWwoKXtcbiAgICB0aGlzLl9pc0NhbmNlbGxlZCA9IHRydWVcbiAgICB0aGlzLl9pc0RvbmUgPSB0cnVlXG4gICAgdGhpcy5fb25Eb25lKClcbiAgfVxuXG4gIGlzRG9uZSgpeyByZXR1cm4gdGhpcy5faXNEb25lIH1cblxuICBlcnJvcihyZWFzb24gPSBcImZhaWxlZFwiKXtcbiAgICB0aGlzLnZpZXcucHVzaEZpbGVQcm9ncmVzcyh0aGlzLmZpbGVFbCwgdGhpcy5yZWYsIHtlcnJvcjogcmVhc29ufSlcbiAgICBMaXZlVXBsb2FkZXIuY2xlYXJGaWxlcyh0aGlzLmZpbGVFbClcbiAgfVxuXG4gIC8vcHJpdmF0ZVxuXG4gIG9uRG9uZShjYWxsYmFjayl7XG4gICAgdGhpcy5fb25Eb25lID0gKCkgPT4ge1xuICAgICAgdGhpcy5maWxlRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihQSFhfTElWRV9GSUxFX1VQREFURUQsIHRoaXMuX29uRWxVcGRhdGVkKVxuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIG9uRWxVcGRhdGVkKCl7XG4gICAgbGV0IGFjdGl2ZVJlZnMgPSB0aGlzLmZpbGVFbC5nZXRBdHRyaWJ1dGUoUEhYX0FDVElWRV9FTlRSWV9SRUZTKS5zcGxpdChcIixcIilcbiAgICBpZihhY3RpdmVSZWZzLmluZGV4T2YodGhpcy5yZWYpID09PSAtMSl7IHRoaXMuY2FuY2VsKCkgfVxuICB9XG5cbiAgdG9QcmVmbGlnaHRQYXlsb2FkKCl7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxhc3RfbW9kaWZpZWQ6IHRoaXMuZmlsZS5sYXN0TW9kaWZpZWQsXG4gICAgICBuYW1lOiB0aGlzLmZpbGUubmFtZSxcbiAgICAgIHNpemU6IHRoaXMuZmlsZS5zaXplLFxuICAgICAgdHlwZTogdGhpcy5maWxlLnR5cGUsXG4gICAgICByZWY6IHRoaXMucmVmXG4gICAgfVxuICB9XG5cbiAgdXBsb2FkZXIodXBsb2FkZXJzKXtcbiAgICBpZih0aGlzLm1ldGEudXBsb2FkZXIpe1xuICAgICAgbGV0IGNhbGxiYWNrID0gdXBsb2FkZXJzW3RoaXMubWV0YS51cGxvYWRlcl0gfHwgbG9nRXJyb3IoYG5vIHVwbG9hZGVyIGNvbmZpZ3VyZWQgZm9yICR7dGhpcy5tZXRhLnVwbG9hZGVyfWApXG4gICAgICByZXR1cm4ge25hbWU6IHRoaXMubWV0YS51cGxvYWRlciwgY2FsbGJhY2s6IGNhbGxiYWNrfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge25hbWU6IFwiY2hhbm5lbFwiLCBjYWxsYmFjazogY2hhbm5lbFVwbG9hZGVyfVxuICAgIH1cbiAgfVxuXG4gIHppcFBvc3RGbGlnaHQocmVzcCl7XG4gICAgdGhpcy5tZXRhID0gcmVzcC5lbnRyaWVzW3RoaXMucmVmXVxuICAgIGlmKCF0aGlzLm1ldGEpeyBsb2dFcnJvcihgbm8gcHJlZmxpZ2h0IHVwbG9hZCByZXNwb25zZSByZXR1cm5lZCB3aXRoIHJlZiAke3RoaXMucmVmfWAsIHtpbnB1dDogdGhpcy5maWxlRWwsIHJlc3BvbnNlOiByZXNwfSkgfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgUEhYX0RPTkVfUkVGUyxcbiAgUEhYX1BSRUZMSUdIVEVEX1JFRlMsXG4gIFBIWF9VUExPQURfUkVGXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG59IGZyb20gXCIuL3V0aWxzXCJcblxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IFVwbG9hZEVudHJ5IGZyb20gXCIuL3VwbG9hZF9lbnRyeVwiXG5cbmxldCBsaXZlVXBsb2FkZXJGaWxlUmVmID0gMFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXZlVXBsb2FkZXIge1xuICBzdGF0aWMgZ2VuRmlsZVJlZihmaWxlKXtcbiAgICBsZXQgcmVmID0gZmlsZS5fcGh4UmVmXG4gICAgaWYocmVmICE9PSB1bmRlZmluZWQpe1xuICAgICAgcmV0dXJuIHJlZlxuICAgIH0gZWxzZSB7XG4gICAgICBmaWxlLl9waHhSZWYgPSAobGl2ZVVwbG9hZGVyRmlsZVJlZisrKS50b1N0cmluZygpXG4gICAgICByZXR1cm4gZmlsZS5fcGh4UmVmXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldEVudHJ5RGF0YVVSTChpbnB1dEVsLCByZWYsIGNhbGxiYWNrKXtcbiAgICBsZXQgZmlsZSA9IHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbCkuZmluZChmaWxlID0+IHRoaXMuZ2VuRmlsZVJlZihmaWxlKSA9PT0gcmVmKVxuICAgIGNhbGxiYWNrKFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSkpXG4gIH1cblxuICBzdGF0aWMgaGFzVXBsb2Fkc0luUHJvZ3Jlc3MoZm9ybUVsKXtcbiAgICBsZXQgYWN0aXZlID0gMFxuICAgIERPTS5maW5kVXBsb2FkSW5wdXRzKGZvcm1FbCkuZm9yRWFjaChpbnB1dCA9PiB7XG4gICAgICBpZihpbnB1dC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpICE9PSBpbnB1dC5nZXRBdHRyaWJ1dGUoUEhYX0RPTkVfUkVGUykpe1xuICAgICAgICBhY3RpdmUrK1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGFjdGl2ZSA+IDBcbiAgfVxuXG4gIHN0YXRpYyBzZXJpYWxpemVVcGxvYWRzKGlucHV0RWwpe1xuICAgIGxldCBmaWxlcyA9IHRoaXMuYWN0aXZlRmlsZXMoaW5wdXRFbClcbiAgICBsZXQgZmlsZURhdGEgPSB7fVxuICAgIGZpbGVzLmZvckVhY2goZmlsZSA9PiB7XG4gICAgICBsZXQgZW50cnkgPSB7cGF0aDogaW5wdXRFbC5uYW1lfVxuICAgICAgbGV0IHVwbG9hZFJlZiA9IGlucHV0RWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKVxuICAgICAgZmlsZURhdGFbdXBsb2FkUmVmXSA9IGZpbGVEYXRhW3VwbG9hZFJlZl0gfHwgW11cbiAgICAgIGVudHJ5LnJlZiA9IHRoaXMuZ2VuRmlsZVJlZihmaWxlKVxuICAgICAgZW50cnkubmFtZSA9IGZpbGUubmFtZSB8fCBlbnRyeS5yZWZcbiAgICAgIGVudHJ5LnR5cGUgPSBmaWxlLnR5cGVcbiAgICAgIGVudHJ5LnNpemUgPSBmaWxlLnNpemVcbiAgICAgIGZpbGVEYXRhW3VwbG9hZFJlZl0ucHVzaChlbnRyeSlcbiAgICB9KVxuICAgIHJldHVybiBmaWxlRGF0YVxuICB9XG5cbiAgc3RhdGljIGNsZWFyRmlsZXMoaW5wdXRFbCl7XG4gICAgaW5wdXRFbC52YWx1ZSA9IG51bGxcbiAgICBpbnB1dEVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRilcbiAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIFtdKVxuICB9XG5cbiAgc3RhdGljIHVudHJhY2tGaWxlKGlucHV0RWwsIGZpbGUpe1xuICAgIERPTS5wdXRQcml2YXRlKGlucHV0RWwsIFwiZmlsZXNcIiwgRE9NLnByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiKS5maWx0ZXIoZiA9PiAhT2JqZWN0LmlzKGYsIGZpbGUpKSlcbiAgfVxuXG4gIHN0YXRpYyB0cmFja0ZpbGVzKGlucHV0RWwsIGZpbGVzKXtcbiAgICBpZihpbnB1dEVsLmdldEF0dHJpYnV0ZShcIm11bHRpcGxlXCIpICE9PSBudWxsKXtcbiAgICAgIGxldCBuZXdGaWxlcyA9IGZpbGVzLmZpbHRlcihmaWxlID0+ICF0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpLmZpbmQoZiA9PiBPYmplY3QuaXMoZiwgZmlsZSkpKVxuICAgICAgRE9NLnB1dFByaXZhdGUoaW5wdXRFbCwgXCJmaWxlc1wiLCB0aGlzLmFjdGl2ZUZpbGVzKGlucHV0RWwpLmNvbmNhdChuZXdGaWxlcykpXG4gICAgICBpbnB1dEVsLnZhbHVlID0gbnVsbFxuICAgIH0gZWxzZSB7XG4gICAgICBET00ucHV0UHJpdmF0ZShpbnB1dEVsLCBcImZpbGVzXCIsIGZpbGVzKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBhY3RpdmVGaWxlSW5wdXRzKGZvcm1FbCl7XG4gICAgbGV0IGZpbGVJbnB1dHMgPSBET00uZmluZFVwbG9hZElucHV0cyhmb3JtRWwpXG4gICAgcmV0dXJuIEFycmF5LmZyb20oZmlsZUlucHV0cykuZmlsdGVyKGVsID0+IGVsLmZpbGVzICYmIHRoaXMuYWN0aXZlRmlsZXMoZWwpLmxlbmd0aCA+IDApXG4gIH1cblxuICBzdGF0aWMgYWN0aXZlRmlsZXMoaW5wdXQpe1xuICAgIHJldHVybiAoRE9NLnByaXZhdGUoaW5wdXQsIFwiZmlsZXNcIikgfHwgW10pLmZpbHRlcihmID0+IFVwbG9hZEVudHJ5LmlzQWN0aXZlKGlucHV0LCBmKSlcbiAgfVxuXG4gIHN0YXRpYyBpbnB1dHNBd2FpdGluZ1ByZWZsaWdodChmb3JtRWwpe1xuICAgIGxldCBmaWxlSW5wdXRzID0gRE9NLmZpbmRVcGxvYWRJbnB1dHMoZm9ybUVsKVxuICAgIHJldHVybiBBcnJheS5mcm9tKGZpbGVJbnB1dHMpLmZpbHRlcihpbnB1dCA9PiB0aGlzLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXQpLmxlbmd0aCA+IDApXG4gIH1cblxuICBzdGF0aWMgZmlsZXNBd2FpdGluZ1ByZWZsaWdodChpbnB1dCl7XG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlRmlsZXMoaW5wdXQpLmZpbHRlcihmID0+ICFVcGxvYWRFbnRyeS5pc1ByZWZsaWdodGVkKGlucHV0LCBmKSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGlucHV0RWwsIHZpZXcsIG9uQ29tcGxldGUpe1xuICAgIHRoaXMudmlldyA9IHZpZXdcbiAgICB0aGlzLm9uQ29tcGxldGUgPSBvbkNvbXBsZXRlXG4gICAgdGhpcy5fZW50cmllcyA9XG4gICAgICBBcnJheS5mcm9tKExpdmVVcGxvYWRlci5maWxlc0F3YWl0aW5nUHJlZmxpZ2h0KGlucHV0RWwpIHx8IFtdKVxuICAgICAgICAubWFwKGZpbGUgPT4gbmV3IFVwbG9hZEVudHJ5KGlucHV0RWwsIGZpbGUsIHZpZXcpKVxuXG4gICAgdGhpcy5udW1FbnRyaWVzSW5Qcm9ncmVzcyA9IHRoaXMuX2VudHJpZXMubGVuZ3RoXG4gIH1cblxuICBlbnRyaWVzKCl7IHJldHVybiB0aGlzLl9lbnRyaWVzIH1cblxuICBpbml0QWRhcHRlclVwbG9hZChyZXNwLCBvbkVycm9yLCBsaXZlU29ja2V0KXtcbiAgICB0aGlzLl9lbnRyaWVzID1cbiAgICAgIHRoaXMuX2VudHJpZXMubWFwKGVudHJ5ID0+IHtcbiAgICAgICAgZW50cnkuemlwUG9zdEZsaWdodChyZXNwKVxuICAgICAgICBlbnRyeS5vbkRvbmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMubnVtRW50cmllc0luUHJvZ3Jlc3MtLVxuICAgICAgICAgIGlmKHRoaXMubnVtRW50cmllc0luUHJvZ3Jlc3MgPT09IDApeyB0aGlzLm9uQ29tcGxldGUoKSB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBlbnRyeVxuICAgICAgfSlcblxuICAgIGxldCBncm91cGVkRW50cmllcyA9IHRoaXMuX2VudHJpZXMucmVkdWNlKChhY2MsIGVudHJ5KSA9PiB7XG4gICAgICBsZXQge25hbWUsIGNhbGxiYWNrfSA9IGVudHJ5LnVwbG9hZGVyKGxpdmVTb2NrZXQudXBsb2FkZXJzKVxuICAgICAgYWNjW25hbWVdID0gYWNjW25hbWVdIHx8IHtjYWxsYmFjazogY2FsbGJhY2ssIGVudHJpZXM6IFtdfVxuICAgICAgYWNjW25hbWVdLmVudHJpZXMucHVzaChlbnRyeSlcbiAgICAgIHJldHVybiBhY2NcbiAgICB9LCB7fSlcblxuICAgIGZvcihsZXQgbmFtZSBpbiBncm91cGVkRW50cmllcyl7XG4gICAgICBsZXQge2NhbGxiYWNrLCBlbnRyaWVzfSA9IGdyb3VwZWRFbnRyaWVzW25hbWVdXG4gICAgICBjYWxsYmFjayhlbnRyaWVzLCBvbkVycm9yLCByZXNwLCBsaXZlU29ja2V0KVxuICAgIH1cbiAgfVxufVxuIiwgImltcG9ydCB7XG4gIFBIWF9BQ1RJVkVfRU5UUllfUkVGUyxcbiAgUEhYX0xJVkVfRklMRV9VUERBVEVELFxuICBQSFhfUFJFRkxJR0hURURfUkVGUyxcbiAgUEhYX1VQTE9BRF9SRUZcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IExpdmVVcGxvYWRlciBmcm9tIFwiLi9saXZlX3VwbG9hZGVyXCJcblxubGV0IEhvb2tzID0ge1xuICBMaXZlRmlsZVVwbG9hZDoge1xuICAgIGFjdGl2ZVJlZnMoKXsgcmV0dXJuIHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9BQ1RJVkVfRU5UUllfUkVGUykgfSxcblxuICAgIHByZWZsaWdodGVkUmVmcygpeyByZXR1cm4gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoUEhYX1BSRUZMSUdIVEVEX1JFRlMpIH0sXG5cbiAgICBtb3VudGVkKCl7IHRoaXMucHJlZmxpZ2h0ZWRXYXMgPSB0aGlzLnByZWZsaWdodGVkUmVmcygpIH0sXG5cbiAgICB1cGRhdGVkKCl7XG4gICAgICBsZXQgbmV3UHJlZmxpZ2h0cyA9IHRoaXMucHJlZmxpZ2h0ZWRSZWZzKClcbiAgICAgIGlmKHRoaXMucHJlZmxpZ2h0ZWRXYXMgIT09IG5ld1ByZWZsaWdodHMpe1xuICAgICAgICB0aGlzLnByZWZsaWdodGVkV2FzID0gbmV3UHJlZmxpZ2h0c1xuICAgICAgICBpZihuZXdQcmVmbGlnaHRzID09PSBcIlwiKXtcbiAgICAgICAgICB0aGlzLl9fdmlldy5jYW5jZWxTdWJtaXQodGhpcy5lbC5mb3JtKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuYWN0aXZlUmVmcygpID09PSBcIlwiKXsgdGhpcy5lbC52YWx1ZSA9IG51bGwgfVxuICAgICAgdGhpcy5lbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChQSFhfTElWRV9GSUxFX1VQREFURUQpKVxuICAgIH1cbiAgfSxcblxuICBMaXZlSW1nUHJldmlldzoge1xuICAgIG1vdW50ZWQoKXtcbiAgICAgIHRoaXMucmVmID0gdGhpcy5lbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXBoeC1lbnRyeS1yZWZcIilcbiAgICAgIHRoaXMuaW5wdXRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9VUExPQURfUkVGKSlcbiAgICAgIExpdmVVcGxvYWRlci5nZXRFbnRyeURhdGFVUkwodGhpcy5pbnB1dEVsLCB0aGlzLnJlZiwgdXJsID0+IHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmxcbiAgICAgICAgdGhpcy5lbC5zcmMgPSB1cmxcbiAgICAgIH0pXG4gICAgfSxcbiAgICBkZXN0cm95ZWQoKXtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy51cmwpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEhvb2tzXG4iLCAiaW1wb3J0IHtcbiAgbWF5YmVcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERPTVBvc3RNb3JwaFJlc3RvcmVyIHtcbiAgY29uc3RydWN0b3IoY29udGFpbmVyQmVmb3JlLCBjb250YWluZXJBZnRlciwgdXBkYXRlVHlwZSl7XG4gICAgbGV0IGlkc0JlZm9yZSA9IG5ldyBTZXQoKVxuICAgIGxldCBpZHNBZnRlciA9IG5ldyBTZXQoWy4uLmNvbnRhaW5lckFmdGVyLmNoaWxkcmVuXS5tYXAoY2hpbGQgPT4gY2hpbGQuaWQpKVxuXG4gICAgbGV0IGVsZW1lbnRzVG9Nb2RpZnkgPSBbXVxuXG4gICAgQXJyYXkuZnJvbShjb250YWluZXJCZWZvcmUuY2hpbGRyZW4pLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgaWYoY2hpbGQuaWQpeyAvLyBhbGwgb2Ygb3VyIGNoaWxkcmVuIHNob3VsZCBiZSBlbGVtZW50cyB3aXRoIGlkc1xuICAgICAgICBpZHNCZWZvcmUuYWRkKGNoaWxkLmlkKVxuICAgICAgICBpZihpZHNBZnRlci5oYXMoY2hpbGQuaWQpKXtcbiAgICAgICAgICBsZXQgcHJldmlvdXNFbGVtZW50SWQgPSBjaGlsZC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmIGNoaWxkLnByZXZpb3VzRWxlbWVudFNpYmxpbmcuaWRcbiAgICAgICAgICBlbGVtZW50c1RvTW9kaWZ5LnB1c2goe2VsZW1lbnRJZDogY2hpbGQuaWQsIHByZXZpb3VzRWxlbWVudElkOiBwcmV2aW91c0VsZW1lbnRJZH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5jb250YWluZXJJZCA9IGNvbnRhaW5lckFmdGVyLmlkXG4gICAgdGhpcy51cGRhdGVUeXBlID0gdXBkYXRlVHlwZVxuICAgIHRoaXMuZWxlbWVudHNUb01vZGlmeSA9IGVsZW1lbnRzVG9Nb2RpZnlcbiAgICB0aGlzLmVsZW1lbnRJZHNUb0FkZCA9IFsuLi5pZHNBZnRlcl0uZmlsdGVyKGlkID0+ICFpZHNCZWZvcmUuaGFzKGlkKSlcbiAgfVxuXG4gIC8vIFdlIGRvIHRoZSBmb2xsb3dpbmcgdG8gb3B0aW1pemUgYXBwZW5kL3ByZXBlbmQgb3BlcmF0aW9uczpcbiAgLy8gICAxKSBUcmFjayBpZHMgb2YgbW9kaWZpZWQgZWxlbWVudHMgJiBvZiBuZXcgZWxlbWVudHNcbiAgLy8gICAyKSBBbGwgdGhlIG1vZGlmaWVkIGVsZW1lbnRzIGFyZSBwdXQgYmFjayBpbiB0aGUgY29ycmVjdCBwb3NpdGlvbiBpbiB0aGUgRE9NIHRyZWVcbiAgLy8gICAgICBieSBzdG9yaW5nIHRoZSBpZCBvZiB0aGVpciBwcmV2aW91cyBzaWJsaW5nXG4gIC8vICAgMykgTmV3IGVsZW1lbnRzIGFyZSBnb2luZyB0byBiZSBwdXQgaW4gdGhlIHJpZ2h0IHBsYWNlIGJ5IG1vcnBoZG9tIGR1cmluZyBhcHBlbmQuXG4gIC8vICAgICAgRm9yIHByZXBlbmQsIHdlIG1vdmUgdGhlbSB0byB0aGUgZmlyc3QgcG9zaXRpb24gaW4gdGhlIGNvbnRhaW5lclxuICBwZXJmb3JtKCl7XG4gICAgbGV0IGNvbnRhaW5lciA9IERPTS5ieUlkKHRoaXMuY29udGFpbmVySWQpXG4gICAgdGhpcy5lbGVtZW50c1RvTW9kaWZ5LmZvckVhY2goZWxlbWVudFRvTW9kaWZ5ID0+IHtcbiAgICAgIGlmKGVsZW1lbnRUb01vZGlmeS5wcmV2aW91c0VsZW1lbnRJZCl7XG4gICAgICAgIG1heWJlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRUb01vZGlmeS5wcmV2aW91c0VsZW1lbnRJZCksIHByZXZpb3VzRWxlbSA9PiB7XG4gICAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvTW9kaWZ5LmVsZW1lbnRJZCksIGVsZW0gPT4ge1xuICAgICAgICAgICAgbGV0IGlzSW5SaWdodFBsYWNlID0gZWxlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICYmIGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZy5pZCA9PSBwcmV2aW91c0VsZW0uaWRcbiAgICAgICAgICAgIGlmKCFpc0luUmlnaHRQbGFjZSl7XG4gICAgICAgICAgICAgIHByZXZpb3VzRWxlbS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmVuZFwiLCBlbGVtKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBmaXJzdCBlbGVtZW50IGluIHRoZSBjb250YWluZXJcbiAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudFRvTW9kaWZ5LmVsZW1lbnRJZCksIGVsZW0gPT4ge1xuICAgICAgICAgIGxldCBpc0luUmlnaHRQbGFjZSA9IGVsZW0ucHJldmlvdXNFbGVtZW50U2libGluZyA9PSBudWxsXG4gICAgICAgICAgaWYoIWlzSW5SaWdodFBsYWNlKXtcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIGVsZW0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBpZih0aGlzLnVwZGF0ZVR5cGUgPT0gXCJwcmVwZW5kXCIpe1xuICAgICAgdGhpcy5lbGVtZW50SWRzVG9BZGQucmV2ZXJzZSgpLmZvckVhY2goZWxlbUlkID0+IHtcbiAgICAgICAgbWF5YmUoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbUlkKSwgZWxlbSA9PiBjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBlbGVtKSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iLCAidmFyIERPQ1VNRU5UX0ZSQUdNRU5UX05PREUgPSAxMTtcblxuZnVuY3Rpb24gbW9ycGhBdHRycyhmcm9tTm9kZSwgdG9Ob2RlKSB7XG4gICAgdmFyIHRvTm9kZUF0dHJzID0gdG9Ob2RlLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGF0dHI7XG4gICAgdmFyIGF0dHJOYW1lO1xuICAgIHZhciBhdHRyTmFtZXNwYWNlVVJJO1xuICAgIHZhciBhdHRyVmFsdWU7XG4gICAgdmFyIGZyb21WYWx1ZTtcblxuICAgIC8vIGRvY3VtZW50LWZyYWdtZW50cyBkb250IGhhdmUgYXR0cmlidXRlcyBzbyBsZXRzIG5vdCBkbyBhbnl0aGluZ1xuICAgIGlmICh0b05vZGUubm9kZVR5cGUgPT09IERPQ1VNRU5UX0ZSQUdNRU5UX05PREUgfHwgZnJvbU5vZGUubm9kZVR5cGUgPT09IERPQ1VNRU5UX0ZSQUdNRU5UX05PREUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgYXR0cmlidXRlcyBvbiBvcmlnaW5hbCBET00gZWxlbWVudFxuICAgIGZvciAodmFyIGkgPSB0b05vZGVBdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBhdHRyID0gdG9Ob2RlQXR0cnNbaV07XG4gICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICBhdHRyTmFtZXNwYWNlVVJJID0gYXR0ci5uYW1lc3BhY2VVUkk7XG4gICAgICAgIGF0dHJWYWx1ZSA9IGF0dHIudmFsdWU7XG5cbiAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5sb2NhbE5hbWUgfHwgYXR0ck5hbWU7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBmcm9tTm9kZS5nZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChhdHRyLnByZWZpeCA9PT0gJ3htbG5zJyl7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lOyAvLyBJdCdzIG5vdCBhbGxvd2VkIHRvIHNldCBhbiBhdHRyaWJ1dGUgd2l0aCB0aGUgWE1MTlMgbmFtZXNwYWNlIHdpdGhvdXQgc3BlY2lmeWluZyB0aGUgYHhtbG5zYCBwcmVmaXhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUuc2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBmcm9tTm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoZnJvbVZhbHVlICE9PSBhdHRyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYW55IGV4dHJhIGF0dHJpYnV0ZXMgZm91bmQgb24gdGhlIG9yaWdpbmFsIERPTSBlbGVtZW50IHRoYXRcbiAgICAvLyB3ZXJlbid0IGZvdW5kIG9uIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICB2YXIgZnJvbU5vZGVBdHRycyA9IGZyb21Ob2RlLmF0dHJpYnV0ZXM7XG5cbiAgICBmb3IgKHZhciBkID0gZnJvbU5vZGVBdHRycy5sZW5ndGggLSAxOyBkID49IDA7IGQtLSkge1xuICAgICAgICBhdHRyID0gZnJvbU5vZGVBdHRyc1tkXTtcbiAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcblxuICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZTtcblxuICAgICAgICAgICAgaWYgKCF0b05vZGUuaGFzQXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0b05vZGUuaGFzQXR0cmlidXRlKGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciByYW5nZTsgLy8gQ3JlYXRlIGEgcmFuZ2Ugb2JqZWN0IGZvciBlZmZpY2VudGx5IHJlbmRlcmluZyBzdHJpbmdzIHRvIGVsZW1lbnRzLlxudmFyIE5TX1hIVE1MID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuXG52YXIgZG9jID0gdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGRvY3VtZW50O1xudmFyIEhBU19URU1QTEFURV9TVVBQT1JUID0gISFkb2MgJiYgJ2NvbnRlbnQnIGluIGRvYy5jcmVhdGVFbGVtZW50KCd0ZW1wbGF0ZScpO1xudmFyIEhBU19SQU5HRV9TVVBQT1JUID0gISFkb2MgJiYgZG9jLmNyZWF0ZVJhbmdlICYmICdjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQnIGluIGRvYy5jcmVhdGVSYW5nZSgpO1xuXG5mdW5jdGlvbiBjcmVhdGVGcmFnbWVudEZyb21UZW1wbGF0ZShzdHIpIHtcbiAgICB2YXIgdGVtcGxhdGUgPSBkb2MuY3JlYXRlRWxlbWVudCgndGVtcGxhdGUnKTtcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBzdHI7XG4gICAgcmV0dXJuIHRlbXBsYXRlLmNvbnRlbnQuY2hpbGROb2Rlc1swXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRGcm9tUmFuZ2Uoc3RyKSB7XG4gICAgaWYgKCFyYW5nZSkge1xuICAgICAgICByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGRvYy5ib2R5KTtcbiAgICB9XG5cbiAgICB2YXIgZnJhZ21lbnQgPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoc3RyKTtcbiAgICByZXR1cm4gZnJhZ21lbnQuY2hpbGROb2Rlc1swXTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRnJhZ21lbnRGcm9tV3JhcChzdHIpIHtcbiAgICB2YXIgZnJhZ21lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnYm9keScpO1xuICAgIGZyYWdtZW50LmlubmVySFRNTCA9IHN0cjtcbiAgICByZXR1cm4gZnJhZ21lbnQuY2hpbGROb2Rlc1swXTtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGFib3V0IHRoZSBzYW1lXG4gKiB2YXIgaHRtbCA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoc3RyLCAndGV4dC9odG1sJyk7XG4gKiByZXR1cm4gaHRtbC5ib2R5LmZpcnN0Q2hpbGQ7XG4gKlxuICogQG1ldGhvZCB0b0VsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqL1xuZnVuY3Rpb24gdG9FbGVtZW50KHN0cikge1xuICAgIHN0ciA9IHN0ci50cmltKCk7XG4gICAgaWYgKEhBU19URU1QTEFURV9TVVBQT1JUKSB7XG4gICAgICAvLyBhdm9pZCByZXN0cmljdGlvbnMgb24gY29udGVudCBmb3IgdGhpbmdzIGxpa2UgYDx0cj48dGg+SGk8L3RoPjwvdHI+YCB3aGljaFxuICAgICAgLy8gY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IGRvZXNuJ3Qgc3VwcG9ydFxuICAgICAgLy8gPHRlbXBsYXRlPiBzdXBwb3J0IG5vdCBhdmFpbGFibGUgaW4gSUVcbiAgICAgIHJldHVybiBjcmVhdGVGcmFnbWVudEZyb21UZW1wbGF0ZShzdHIpO1xuICAgIH0gZWxzZSBpZiAoSEFTX1JBTkdFX1NVUFBPUlQpIHtcbiAgICAgIHJldHVybiBjcmVhdGVGcmFnbWVudEZyb21SYW5nZShzdHIpO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVGcmFnbWVudEZyb21XcmFwKHN0cik7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHR3byBub2RlJ3MgbmFtZXMgYXJlIHRoZSBzYW1lLlxuICpcbiAqIE5PVEU6IFdlIGRvbid0IGJvdGhlciBjaGVja2luZyBgbmFtZXNwYWNlVVJJYCBiZWNhdXNlIHlvdSB3aWxsIG5ldmVyIGZpbmQgdHdvIEhUTUwgZWxlbWVudHMgd2l0aCB0aGUgc2FtZVxuICogICAgICAgbm9kZU5hbWUgYW5kIGRpZmZlcmVudCBuYW1lc3BhY2UgVVJJcy5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYiBUaGUgdGFyZ2V0IGVsZW1lbnRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOb2RlTmFtZXMoZnJvbUVsLCB0b0VsKSB7XG4gICAgdmFyIGZyb21Ob2RlTmFtZSA9IGZyb21FbC5ub2RlTmFtZTtcbiAgICB2YXIgdG9Ob2RlTmFtZSA9IHRvRWwubm9kZU5hbWU7XG4gICAgdmFyIGZyb21Db2RlU3RhcnQsIHRvQ29kZVN0YXJ0O1xuXG4gICAgaWYgKGZyb21Ob2RlTmFtZSA9PT0gdG9Ob2RlTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmcm9tQ29kZVN0YXJ0ID0gZnJvbU5vZGVOYW1lLmNoYXJDb2RlQXQoMCk7XG4gICAgdG9Db2RlU3RhcnQgPSB0b05vZGVOYW1lLmNoYXJDb2RlQXQoMCk7XG5cbiAgICAvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYSB2aXJ0dWFsIERPTSBub2RlIG9yIFNWRyBub2RlIHRoZW4gd2UgbWF5XG4gICAgLy8gbmVlZCB0byBub3JtYWxpemUgdGhlIHRhZyBuYW1lIGJlZm9yZSBjb21wYXJpbmcuIE5vcm1hbCBIVE1MIGVsZW1lbnRzIHRoYXQgYXJlXG4gICAgLy8gaW4gdGhlIFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiXG4gICAgLy8gYXJlIGNvbnZlcnRlZCB0byB1cHBlciBjYXNlXG4gICAgaWYgKGZyb21Db2RlU3RhcnQgPD0gOTAgJiYgdG9Db2RlU3RhcnQgPj0gOTcpIHsgLy8gZnJvbSBpcyB1cHBlciBhbmQgdG8gaXMgbG93ZXJcbiAgICAgICAgcmV0dXJuIGZyb21Ob2RlTmFtZSA9PT0gdG9Ob2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAodG9Db2RlU3RhcnQgPD0gOTAgJiYgZnJvbUNvZGVTdGFydCA+PSA5NykgeyAvLyB0byBpcyB1cHBlciBhbmQgZnJvbSBpcyBsb3dlclxuICAgICAgICByZXR1cm4gdG9Ob2RlTmFtZSA9PT0gZnJvbU5vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gZWxlbWVudCwgb3B0aW9uYWxseSB3aXRoIGEga25vd24gbmFtZXNwYWNlIFVSSS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgZWxlbWVudCBuYW1lLCBlLmcuICdkaXYnIG9yICdzdmcnXG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWVzcGFjZVVSSV0gdGhlIGVsZW1lbnQncyBuYW1lc3BhY2UgVVJJLCBpLmUuIHRoZSB2YWx1ZSBvZlxuICogaXRzIGB4bWxuc2AgYXR0cmlidXRlIG9yIGl0cyBpbmZlcnJlZCBuYW1lc3BhY2UuXG4gKlxuICogQHJldHVybiB7RWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWUsIG5hbWVzcGFjZVVSSSkge1xuICAgIHJldHVybiAhbmFtZXNwYWNlVVJJIHx8IG5hbWVzcGFjZVVSSSA9PT0gTlNfWEhUTUwgP1xuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudChuYW1lKSA6XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBuYW1lKTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIGNoaWxkcmVuIG9mIG9uZSBET00gZWxlbWVudCB0byBhbm90aGVyIERPTSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIG1vdmVDaGlsZHJlbihmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgY3VyQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgdmFyIG5leHRDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB0b0VsLmFwcGVuZENoaWxkKGN1ckNoaWxkKTtcbiAgICAgICAgY3VyQ2hpbGQgPSBuZXh0Q2hpbGQ7XG4gICAgfVxuICAgIHJldHVybiB0b0VsO1xufVxuXG5mdW5jdGlvbiBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgbmFtZSkge1xuICAgIGlmIChmcm9tRWxbbmFtZV0gIT09IHRvRWxbbmFtZV0pIHtcbiAgICAgICAgZnJvbUVsW25hbWVdID0gdG9FbFtuYW1lXTtcbiAgICAgICAgaWYgKGZyb21FbFtuYW1lXSkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgc3BlY2lhbEVsSGFuZGxlcnMgPSB7XG4gICAgT1BUSU9OOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgdmFyIHBhcmVudE5vZGUgPSBmcm9tRWwucGFyZW50Tm9kZTtcbiAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnROYW1lID0gcGFyZW50Tm9kZS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHBhcmVudE5hbWUgPT09ICdPUFRHUk9VUCcpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgICAgICAgICAgICAgIHBhcmVudE5hbWUgPSBwYXJlbnROb2RlICYmIHBhcmVudE5vZGUubm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJlbnROYW1lID09PSAnU0VMRUNUJyAmJiAhcGFyZW50Tm9kZS5oYXNBdHRyaWJ1dGUoJ211bHRpcGxlJykpIHtcbiAgICAgICAgICAgICAgICBpZiAoZnJvbUVsLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSAmJiAhdG9FbC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBXb3JrYXJvdW5kIGZvciBNUyBFZGdlIGJ1ZyB3aGVyZSB0aGUgJ3NlbGVjdGVkJyBhdHRyaWJ1dGUgY2FuIG9ubHkgYmVcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlZCBpZiBzZXQgdG8gYSBub24tZW1wdHkgdmFsdWU6XG4gICAgICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1pY3Jvc29mdC5jb20vZW4tdXMvbWljcm9zb2Z0LWVkZ2UvcGxhdGZvcm0vaXNzdWVzLzEyMDg3Njc5L1xuICAgICAgICAgICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKCdzZWxlY3RlZCcsICdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHRvIHJlc2V0IHNlbGVjdCBlbGVtZW50J3Mgc2VsZWN0ZWRJbmRleCB0byAtMSwgb3RoZXJ3aXNlIHNldHRpbmdcbiAgICAgICAgICAgICAgICAvLyBmcm9tRWwuc2VsZWN0ZWQgdXNpbmcgdGhlIHN5bmNCb29sZWFuQXR0clByb3AgYmVsb3cgaGFzIG5vIGVmZmVjdC5cbiAgICAgICAgICAgICAgICAvLyBUaGUgY29ycmVjdCBzZWxlY3RlZEluZGV4IHdpbGwgYmUgc2V0IGluIHRoZSBTRUxFQ1Qgc3BlY2lhbCBoYW5kbGVyIGJlbG93LlxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUuc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnc2VsZWN0ZWQnKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFRoZSBcInZhbHVlXCIgYXR0cmlidXRlIGlzIHNwZWNpYWwgZm9yIHRoZSA8aW5wdXQ+IGVsZW1lbnQgc2luY2UgaXQgc2V0c1xuICAgICAqIHRoZSBpbml0aWFsIHZhbHVlLiBDaGFuZ2luZyB0aGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSB3aXRob3V0IGNoYW5naW5nIHRoZVxuICAgICAqIFwidmFsdWVcIiBwcm9wZXJ0eSB3aWxsIGhhdmUgbm8gZWZmZWN0IHNpbmNlIGl0IGlzIG9ubHkgdXNlZCB0byB0aGUgc2V0IHRoZVxuICAgICAqIGluaXRpYWwgdmFsdWUuICBTaW1pbGFyIGZvciB0aGUgXCJjaGVja2VkXCIgYXR0cmlidXRlLCBhbmQgXCJkaXNhYmxlZFwiLlxuICAgICAqL1xuICAgIElOUFVUOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdjaGVja2VkJyk7XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnZGlzYWJsZWQnKTtcblxuICAgICAgICBpZiAoZnJvbUVsLnZhbHVlICE9PSB0b0VsLnZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSB0b0VsLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0b0VsLmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBURVhUQVJFQTogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmaXJzdENoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgIGlmIChmaXJzdENoaWxkKSB7XG4gICAgICAgICAgICAvLyBOZWVkZWQgZm9yIElFLiBBcHBhcmVudGx5IElFIHNldHMgdGhlIHBsYWNlaG9sZGVyIGFzIHRoZVxuICAgICAgICAgICAgLy8gbm9kZSB2YWx1ZSBhbmQgdmlzZSB2ZXJzYS4gVGhpcyBpZ25vcmVzIGFuIGVtcHR5IHVwZGF0ZS5cbiAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IGZpcnN0Q2hpbGQubm9kZVZhbHVlO1xuXG4gICAgICAgICAgICBpZiAob2xkVmFsdWUgPT0gbmV3VmFsdWUgfHwgKCFuZXdWYWx1ZSAmJiBvbGRWYWx1ZSA9PSBmcm9tRWwucGxhY2Vob2xkZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmaXJzdENoaWxkLm5vZGVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBTRUxFQ1Q6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBpZiAoIXRvRWwuaGFzQXR0cmlidXRlKCdtdWx0aXBsZScpKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IC0xO1xuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byBsb29wIHRocm91Z2ggY2hpbGRyZW4gb2YgZnJvbUVsLCBub3QgdG9FbCBzaW5jZSBub2RlcyBjYW4gYmUgbW92ZWRcbiAgICAgICAgICAgIC8vIGZyb20gdG9FbCB0byBmcm9tRWwgZGlyZWN0bHkgd2hlbiBtb3JwaGluZy5cbiAgICAgICAgICAgIC8vIEF0IHRoZSB0aW1lIHRoaXMgc3BlY2lhbCBoYW5kbGVyIGlzIGludm9rZWQsIGFsbCBjaGlsZHJlbiBoYXZlIGFscmVhZHkgYmVlbiBtb3JwaGVkXG4gICAgICAgICAgICAvLyBhbmQgYXBwZW5kZWQgdG8gLyByZW1vdmVkIGZyb20gZnJvbUVsLCBzbyB1c2luZyBmcm9tRWwgaGVyZSBpcyBzYWZlIGFuZCBjb3JyZWN0LlxuICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgb3B0Z3JvdXA7XG4gICAgICAgICAgICB2YXIgbm9kZU5hbWU7XG4gICAgICAgICAgICB3aGlsZShjdXJDaGlsZCkge1xuICAgICAgICAgICAgICAgIG5vZGVOYW1lID0gY3VyQ2hpbGQubm9kZU5hbWUgJiYgY3VyQ2hpbGQubm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAobm9kZU5hbWUgPT09ICdPUFRHUk9VUCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0Z3JvdXAgPSBjdXJDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBvcHRncm91cC5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlTmFtZSA9PT0gJ09QVElPTicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDaGlsZC5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWN1ckNoaWxkICYmIG9wdGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG9wdGdyb3VwLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0Z3JvdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmcm9tRWwuc2VsZWN0ZWRJbmRleCA9IHNlbGVjdGVkSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgRUxFTUVOVF9OT0RFID0gMTtcbnZhciBET0NVTUVOVF9GUkFHTUVOVF9OT0RFJDEgPSAxMTtcbnZhciBURVhUX05PREUgPSAzO1xudmFyIENPTU1FTlRfTk9ERSA9IDg7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0Tm9kZUtleShub2RlKSB7XG4gIGlmIChub2RlKSB7XG4gICAgICByZXR1cm4gKG5vZGUuZ2V0QXR0cmlidXRlICYmIG5vZGUuZ2V0QXR0cmlidXRlKCdpZCcpKSB8fCBub2RlLmlkO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1vcnBoZG9tRmFjdG9yeShtb3JwaEF0dHJzKSB7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gbW9ycGhkb20oZnJvbU5vZGUsIHRvTm9kZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdG9Ob2RlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKGZyb21Ob2RlLm5vZGVOYW1lID09PSAnI2RvY3VtZW50JyB8fCBmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnIHx8IGZyb21Ob2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9Ob2RlSHRtbCA9IHRvTm9kZTtcbiAgICAgICAgICAgICAgICB0b05vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xuICAgICAgICAgICAgICAgIHRvTm9kZS5pbm5lckhUTUwgPSB0b05vZGVIdG1sO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b05vZGUgPSB0b0VsZW1lbnQodG9Ob2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBnZXROb2RlS2V5ID0gb3B0aW9ucy5nZXROb2RlS2V5IHx8IGRlZmF1bHRHZXROb2RlS2V5O1xuICAgICAgICB2YXIgb25CZWZvcmVOb2RlQWRkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBvbk5vZGVBZGRlZCA9IG9wdGlvbnMub25Ob2RlQWRkZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIG9uQmVmb3JlRWxVcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsVXBkYXRlZCB8fCBub29wO1xuICAgICAgICB2YXIgb25FbFVwZGF0ZWQgPSBvcHRpb25zLm9uRWxVcGRhdGVkIHx8IG5vb3A7XG4gICAgICAgIHZhciBvbkJlZm9yZU5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgICAgICB2YXIgb25Ob2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbk5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQgfHwgbm9vcDtcbiAgICAgICAgdmFyIGNoaWxkcmVuT25seSA9IG9wdGlvbnMuY2hpbGRyZW5Pbmx5ID09PSB0cnVlO1xuXG4gICAgICAgIC8vIFRoaXMgb2JqZWN0IGlzIHVzZWQgYXMgYSBsb29rdXAgdG8gcXVpY2tseSBmaW5kIGFsbCBrZXllZCBlbGVtZW50cyBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgICAgIHZhciBmcm9tTm9kZXNMb29rdXAgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB2YXIga2V5ZWRSZW1vdmFsTGlzdCA9IFtdO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEtleWVkUmVtb3ZhbChrZXkpIHtcbiAgICAgICAgICAgIGtleWVkUmVtb3ZhbExpc3QucHVzaChrZXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSwgc2tpcEtleWVkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2tpcEtleWVkTm9kZXMgJiYgKGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIHNraXBwaW5nIGtleWVkIG5vZGVzIHRoZW4gd2UgYWRkIHRoZSBrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbGlzdCBzbyB0aGF0IGl0IGNhbiBiZSBoYW5kbGVkIGF0IHRoZSB2ZXJ5IGVuZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gT25seSByZXBvcnQgdGhlIG5vZGUgYXMgZGlzY2FyZGVkIGlmIGl0IGlzIG5vdCBrZXllZC4gV2UgZG8gdGhpcyBiZWNhdXNlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhdCB0aGUgZW5kIHdlIGxvb3AgdGhyb3VnaCBhbGwga2V5ZWQgZWxlbWVudHMgdGhhdCB3ZXJlIHVubWF0Y2hlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5kIHRoZW4gZGlzY2FyZCB0aGVtIGluIG9uZSBmaW5hbCBwYXNzLlxuICAgICAgICAgICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJDaGlsZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMoY3VyQ2hpbGQsIHNraXBLZXllZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZXMgYSBET00gbm9kZSBvdXQgb2YgdGhlIG9yaWdpbmFsIERPTVxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIFRoZSBub2RlIHRvIHJlbW92ZVxuICAgICAgICAgKiBAcGFyYW0gIHtOb2RlfSBwYXJlbnROb2RlIFRoZSBub2RlcyBwYXJlbnRcbiAgICAgICAgICogQHBhcmFtICB7Qm9vbGVhbn0gc2tpcEtleWVkTm9kZXMgSWYgdHJ1ZSB0aGVuIGVsZW1lbnRzIHdpdGgga2V5cyB3aWxsIGJlIHNraXBwZWQgYW5kIG5vdCBkaXNjYXJkZWQuXG4gICAgICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSwgcGFyZW50Tm9kZSwgc2tpcEtleWVkTm9kZXMpIHtcbiAgICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVEaXNjYXJkZWQobm9kZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChub2RlKTtcbiAgICAgICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUsIHNraXBLZXllZE5vZGVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIC8vIFRyZWVXYWxrZXIgaW1wbGVtZW50YXRpb24gaXMgbm8gZmFzdGVyLCBidXQga2VlcGluZyB0aGlzIGFyb3VuZCBpbiBjYXNlIHRoaXMgY2hhbmdlcyBpbiB0aGUgZnV0dXJlXG4gICAgICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShyb290KSB7XG4gICAgICAgIC8vICAgICB2YXIgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgICAgIC8vICAgICAgICAgcm9vdCxcbiAgICAgICAgLy8gICAgICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICB2YXIgZWw7XG4gICAgICAgIC8vICAgICB3aGlsZSgoZWwgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkpKSB7XG4gICAgICAgIC8vICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoZWwpO1xuICAgICAgICAvLyAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBlbDtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyAvLyBOb2RlSXRlcmF0b3IgaW1wbGVtZW50YXRpb24gaXMgbm8gZmFzdGVyLCBidXQga2VlcGluZyB0aGlzIGFyb3VuZCBpbiBjYXNlIHRoaXMgY2hhbmdlcyBpbiB0aGUgZnV0dXJlXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShub2RlKSB7XG4gICAgICAgIC8vICAgICB2YXIgbm9kZUl0ZXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICAgICAgLy8gICAgIHZhciBlbDtcbiAgICAgICAgLy8gICAgIHdoaWxlKChlbCA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSkge1xuICAgICAgICAvLyAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGVsKTtcbiAgICAgICAgLy8gICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gZWw7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW5kZXhUcmVlKG5vZGUpIHtcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUgfHwgbm9kZS5ub2RlVHlwZSA9PT0gRE9DVU1FTlRfRlJBR01FTlRfTk9ERSQxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gY3VyQ2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBXYWxrIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgICAgIGluZGV4VHJlZShjdXJDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpbmRleFRyZWUoZnJvbU5vZGUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZU5vZGVBZGRlZChlbCkge1xuICAgICAgICAgICAgb25Ob2RlQWRkZWQoZWwpO1xuXG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBlbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdW5tYXRjaGVkRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2tleV07XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHdlIGZpbmQgYSBkdXBsaWNhdGUgI2lkIG5vZGUgaW4gY2FjaGUsIHJlcGxhY2UgYGVsYCB3aXRoIGNhY2hlIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBtb3JwaCBpdCB0byB0aGUgY2hpbGQgbm9kZS5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVubWF0Y2hlZEZyb21FbCAmJiBjb21wYXJlTm9kZU5hbWVzKGN1ckNoaWxkLCB1bm1hdGNoZWRGcm9tRWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh1bm1hdGNoZWRGcm9tRWwsIGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwodW5tYXRjaGVkRnJvbUVsLCBjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyByZWN1cnNpdmVseSBjYWxsIGZvciBjdXJDaGlsZCBhbmQgaXQncyBjaGlsZHJlbiB0byBzZWUgaWYgd2UgZmluZCBzb21ldGhpbmcgaW5cbiAgICAgICAgICAgICAgICAgIC8vIGZyb21Ob2Rlc0xvb2t1cFxuICAgICAgICAgICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IG5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2xlYW51cEZyb21FbChmcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQsIGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAvLyBXZSBoYXZlIHByb2Nlc3NlZCBhbGwgb2YgdGhlIFwidG8gbm9kZXNcIi4gSWYgY3VyRnJvbU5vZGVDaGlsZCBpc1xuICAgICAgICAgICAgLy8gbm9uLW51bGwgdGhlbiB3ZSBzdGlsbCBoYXZlIHNvbWUgZnJvbSBub2RlcyBsZWZ0IG92ZXIgdGhhdCBuZWVkXG4gICAgICAgICAgICAvLyB0byBiZSByZW1vdmVkXG4gICAgICAgICAgICB3aGlsZSAoY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmICgoY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vcnBoRWwoZnJvbUVsLCB0b0VsLCBjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgICAgIHZhciB0b0VsS2V5ID0gZ2V0Tm9kZUtleSh0b0VsKTtcblxuICAgICAgICAgICAgaWYgKHRvRWxLZXkpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBhbiBlbGVtZW50IHdpdGggYW4gSUQgaXMgYmVpbmcgbW9ycGhlZCB0aGVuIGl0IHdpbGwgYmUgaW4gdGhlIGZpbmFsXG4gICAgICAgICAgICAgICAgLy8gRE9NIHNvIGNsZWFyIGl0IG91dCBvZiB0aGUgc2F2ZWQgZWxlbWVudHMgY29sbGVjdGlvblxuICAgICAgICAgICAgICAgIGRlbGV0ZSBmcm9tTm9kZXNMb29rdXBbdG9FbEtleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgICAgICAgICAgLy8gb3B0aW9uYWxcbiAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVFbFVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBhdHRyaWJ1dGVzIG9uIG9yaWdpbmFsIERPTSBlbGVtZW50IGZpcnN0XG4gICAgICAgICAgICAgICAgbW9ycGhBdHRycyhmcm9tRWwsIHRvRWwpO1xuICAgICAgICAgICAgICAgIC8vIG9wdGlvbmFsXG4gICAgICAgICAgICAgICAgb25FbFVwZGF0ZWQoZnJvbUVsKTtcblxuICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkKGZyb21FbCwgdG9FbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmcm9tRWwubm9kZU5hbWUgIT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgICAgICAgbW9ycGhDaGlsZHJlbihmcm9tRWwsIHRvRWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3BlY2lhbEVsSGFuZGxlcnMuVEVYVEFSRUEoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vcnBoQ2hpbGRyZW4oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgICAgICB2YXIgY3VyVG9Ob2RlQ2hpbGQgPSB0b0VsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIGN1clRvTm9kZUtleTtcbiAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZUtleTtcblxuICAgICAgICAgICAgdmFyIGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIHZhciB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIG1hdGNoaW5nRnJvbUVsO1xuXG4gICAgICAgICAgICAvLyB3YWxrIHRoZSBjaGlsZHJlblxuICAgICAgICAgICAgb3V0ZXI6IHdoaWxlIChjdXJUb05vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRvTmV4dFNpYmxpbmcgPSBjdXJUb05vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBjdXJUb05vZGVLZXkgPSBnZXROb2RlS2V5KGN1clRvTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgIC8vIHdhbGsgdGhlIGZyb21Ob2RlIGNoaWxkcmVuIGFsbCB0aGUgd2F5IHRocm91Z2hcbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVDaGlsZC5pc1NhbWVOb2RlICYmIGN1clRvTm9kZUNoaWxkLmlzU2FtZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVUeXBlID0gY3VyRnJvbU5vZGVDaGlsZC5ub2RlVHlwZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIG1lYW5zIGlmIHRoZSBjdXJGcm9tTm9kZUNoaWxkIGRvZXNudCBoYXZlIGEgbWF0Y2ggd2l0aCB0aGUgY3VyVG9Ob2RlQ2hpbGRcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ29tcGF0aWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBjdXJUb05vZGVDaGlsZC5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgRWxlbWVudCBub2Rlc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdGFyZ2V0IG5vZGUgaGFzIGEga2V5IHNvIHdlIHdhbnQgdG8gbWF0Y2ggaXQgdXAgd2l0aCB0aGUgY29ycmVjdCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICE9PSBjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUgZG9lcyBub3QgaGF2ZSBhIG1hdGNoaW5nIGtleSBzb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0J3MgY2hlY2sgb3VyIGxvb2t1cCB0byBzZWUgaWYgdGhlcmUgaXMgYSBtYXRjaGluZyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRE9NIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWF0Y2hpbmdGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBbY3VyVG9Ob2RlS2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJvbU5leHRTaWJsaW5nID09PSBtYXRjaGluZ0Zyb21FbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIHNpbmdsZSBlbGVtZW50IHJlbW92YWxzLiBUbyBhdm9pZCByZW1vdmluZyB0aGUgb3JpZ2luYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRE9NIG5vZGUgb3V0IG9mIHRoZSB0cmVlIChzaW5jZSB0aGF0IGNhbiBicmVhayBDU1MgdHJhbnNpdGlvbnMsIGV0Yy4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSB3aWxsIGluc3RlYWQgZGlzY2FyZCB0aGUgY3VycmVudCBub2RlIGFuZCB3YWl0IHVudGlsIHRoZSBuZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZXJhdGlvbiB0byBwcm9wZXJseSBtYXRjaCB1cCB0aGUga2V5ZWQgdGFyZ2V0IGVsZW1lbnQgd2l0aCBpdHMgbWF0Y2hpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBhIG1hdGNoaW5nIGtleWVkIGVsZW1lbnQgc29tZXdoZXJlIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGV0J3MgbW92ZSB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgaW50byB0aGUgY3VycmVudCBwb3NpdGlvbiBhbmQgbW9ycGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXQuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogV2UgdXNlIGluc2VydEJlZm9yZSBpbnN0ZWFkIG9mIHJlcGxhY2VDaGlsZCBiZWNhdXNlIHdlIHdhbnQgdG8gZ28gdGhyb3VnaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYHJlbW92ZU5vZGUoKWAgZnVuY3Rpb24gZm9yIHRoZSBub2RlIHRoYXQgaXMgYmVpbmcgZGlzY2FyZGVkIHNvIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGxpZmVjeWNsZSBob29rcyBhcmUgY29ycmVjdGx5IGludm9rZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmluc2VydEJlZm9yZShtYXRjaGluZ0Zyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IG1hdGNoaW5nRnJvbUVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG5vZGVzIGFyZSBub3QgY29tcGF0aWJsZSBzaW5jZSB0aGUgXCJ0b1wiIG5vZGUgaGFzIGEga2V5IGFuZCB0aGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlzIG5vIG1hdGNoaW5nIGtleWVkIG5vZGUgaW4gdGhlIHNvdXJjZSB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBvcmlnaW5hbCBoYXMgYSBrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gaXNDb21wYXRpYmxlICE9PSBmYWxzZSAmJiBjb21wYXJlTm9kZU5hbWVzKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wYXRpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIGNvbXBhdGlibGUgRE9NIGVsZW1lbnRzIHNvIHRyYW5zZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBcImZyb21cIiBub2RlIHRvIG1hdGNoIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCBET00gbm9kZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTU9SUEhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IGN1ckZyb21Ob2RlVHlwZSA9PSBDT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIG5vZGVzIGJlaW5nIGNvbXBhcmVkIGFyZSBUZXh0IG9yIENvbW1lbnQgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbXBseSB1cGRhdGUgbm9kZVZhbHVlIG9uIHRoZSBvcmlnaW5hbCBub2RlIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSB0ZXh0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlQ2hpbGQubm9kZVZhbHVlICE9PSBjdXJUb05vZGVDaGlsZC5ub2RlVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZC5ub2RlVmFsdWUgPSBjdXJUb05vZGVDaGlsZC5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wYXRpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZHZhbmNlIGJvdGggdGhlIFwidG9cIiBjaGlsZCBhbmQgdGhlIFwiZnJvbVwiIGNoaWxkIHNpbmNlIHdlIGZvdW5kIGEgbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5vdGhpbmcgZWxzZSB0byBkbyBhcyB3ZSBhbHJlYWR5IHJlY3Vyc2l2ZWx5IGNhbGxlZCBtb3JwaENoaWxkcmVuIGFib3ZlXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBObyBjb21wYXRpYmxlIG1hdGNoIHNvIHJlbW92ZSB0aGUgb2xkIG5vZGUgZnJvbSB0aGUgRE9NIGFuZCBjb250aW51ZSB0cnlpbmcgdG8gZmluZCBhXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoIGluIHRoZSBvcmlnaW5hbCBET00uIEhvd2V2ZXIsIHdlIG9ubHkgZG8gdGhpcyBpZiB0aGUgZnJvbSBub2RlIGlzIG5vdCBrZXllZFxuICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBpdCBpcyBwb3NzaWJsZSB0aGF0IGEga2V5ZWQgbm9kZSBtaWdodCBtYXRjaCB1cCB3aXRoIGEgbm9kZSBzb21ld2hlcmUgZWxzZSBpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHRyZWUgYW5kIHdlIGRvbid0IHdhbnQgdG8gZGlzY2FyZCBpdCBqdXN0IHlldCBzaW5jZSBpdCBzdGlsbCBtaWdodCBmaW5kIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9tZSBpbiB0aGUgZmluYWwgRE9NIHRyZWUuIEFmdGVyIGV2ZXJ5dGhpbmcgaXMgZG9uZSB3ZSB3aWxsIHJlbW92ZSBhbnkga2V5ZWQgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdCBkaWRuJ3QgZmluZCBhIGhvbWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfSAvLyBFTkQ6IHdoaWxlKGN1ckZyb21Ob2RlQ2hpbGQpIHt9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBnb3QgdGhpcyBmYXIgdGhlbiB3ZSBkaWQgbm90IGZpbmQgYSBjYW5kaWRhdGUgbWF0Y2ggZm9yXG4gICAgICAgICAgICAgICAgLy8gb3VyIFwidG8gbm9kZVwiIGFuZCB3ZSBleGhhdXN0ZWQgYWxsIG9mIHRoZSBjaGlsZHJlbiBcImZyb21cIlxuICAgICAgICAgICAgICAgIC8vIG5vZGVzLiBUaGVyZWZvcmUsIHdlIHdpbGwganVzdCBhcHBlbmQgdGhlIGN1cnJlbnQgXCJ0b1wiIG5vZGVcbiAgICAgICAgICAgICAgICAvLyB0byB0aGUgZW5kXG4gICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSAmJiAobWF0Y2hpbmdGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBbY3VyVG9Ob2RlS2V5XSkgJiYgY29tcGFyZU5vZGVOYW1lcyhtYXRjaGluZ0Zyb21FbCwgY3VyVG9Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5hcHBlbmRDaGlsZChtYXRjaGluZ0Zyb21FbCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIE1PUlBIXG4gICAgICAgICAgICAgICAgICAgIG1vcnBoRWwobWF0Y2hpbmdGcm9tRWwsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb25CZWZvcmVOb2RlQWRkZWRSZXN1bHQgPSBvbkJlZm9yZU5vZGVBZGRlZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gb25CZWZvcmVOb2RlQWRkZWRSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVDaGlsZC5hY3R1YWxpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZShmcm9tRWwub3duZXJEb2N1bWVudCB8fCBkb2MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmFwcGVuZENoaWxkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZU5vZGVBZGRlZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2xlYW51cEZyb21FbChmcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQsIGN1ckZyb21Ob2RlS2V5KTtcblxuICAgICAgICAgICAgdmFyIHNwZWNpYWxFbEhhbmRsZXIgPSBzcGVjaWFsRWxIYW5kbGVyc1tmcm9tRWwubm9kZU5hbWVdO1xuICAgICAgICAgICAgaWYgKHNwZWNpYWxFbEhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBzcGVjaWFsRWxIYW5kbGVyKGZyb21FbCwgdG9FbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gLy8gRU5EOiBtb3JwaENoaWxkcmVuKC4uLilcblxuICAgICAgICB2YXIgbW9ycGhlZE5vZGUgPSBmcm9tTm9kZTtcbiAgICAgICAgdmFyIG1vcnBoZWROb2RlVHlwZSA9IG1vcnBoZWROb2RlLm5vZGVUeXBlO1xuICAgICAgICB2YXIgdG9Ob2RlVHlwZSA9IHRvTm9kZS5ub2RlVHlwZTtcblxuICAgICAgICBpZiAoIWNoaWxkcmVuT25seSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIHdlIGFyZSBnaXZlbiB0d28gRE9NIG5vZGVzIHRoYXQgYXJlIG5vdFxuICAgICAgICAgICAgLy8gY29tcGF0aWJsZSAoZS5nLiA8ZGl2PiAtLT4gPHNwYW4+IG9yIDxkaXY+IC0tPiBURVhUKVxuICAgICAgICAgICAgaWYgKG1vcnBoZWROb2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbXBhcmVOb2RlTmFtZXMoZnJvbU5vZGUsIHRvTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IG1vdmVDaGlsZHJlbihmcm9tTm9kZSwgY3JlYXRlRWxlbWVudE5TKHRvTm9kZS5ub2RlTmFtZSwgdG9Ob2RlLm5hbWVzcGFjZVVSSSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR29pbmcgZnJvbSBhbiBlbGVtZW50IG5vZGUgdG8gYSB0ZXh0IG5vZGVcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChtb3JwaGVkTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBtb3JwaGVkTm9kZVR5cGUgPT09IENPTU1FTlRfTk9ERSkgeyAvLyBUZXh0IG9yIGNvbW1lbnQgbm9kZVxuICAgICAgICAgICAgICAgIGlmICh0b05vZGVUeXBlID09PSBtb3JwaGVkTm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vcnBoZWROb2RlLm5vZGVWYWx1ZSAhPT0gdG9Ob2RlLm5vZGVWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUubm9kZVZhbHVlID0gdG9Ob2RlLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBUZXh0IG5vZGUgdG8gc29tZXRoaW5nIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vcnBoZWROb2RlID09PSB0b05vZGUpIHtcbiAgICAgICAgICAgIC8vIFRoZSBcInRvIG5vZGVcIiB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgXCJmcm9tIG5vZGVcIiBzbyB3ZSBoYWQgdG9cbiAgICAgICAgICAgIC8vIHRvc3Mgb3V0IHRoZSBcImZyb20gbm9kZVwiIGFuZCB1c2UgdGhlIFwidG8gbm9kZVwiXG4gICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRvTm9kZS5pc1NhbWVOb2RlICYmIHRvTm9kZS5pc1NhbWVOb2RlKG1vcnBoZWROb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9ycGhFbChtb3JwaGVkTm9kZSwgdG9Ob2RlLCBjaGlsZHJlbk9ubHkpO1xuXG4gICAgICAgICAgICAvLyBXZSBub3cgbmVlZCB0byBsb29wIG92ZXIgYW55IGtleWVkIG5vZGVzIHRoYXQgbWlnaHQgbmVlZCB0byBiZVxuICAgICAgICAgICAgLy8gcmVtb3ZlZC4gV2Ugb25seSBkbyB0aGUgcmVtb3ZhbCBpZiB3ZSBrbm93IHRoYXQgdGhlIGtleWVkIG5vZGVcbiAgICAgICAgICAgIC8vIG5ldmVyIGZvdW5kIGEgbWF0Y2guIFdoZW4gYSBrZXllZCBub2RlIGlzIG1hdGNoZWQgdXAgd2UgcmVtb3ZlXG4gICAgICAgICAgICAvLyBpdCBvdXQgb2YgZnJvbU5vZGVzTG9va3VwIGFuZCB3ZSB1c2UgZnJvbU5vZGVzTG9va3VwIHRvIGRldGVybWluZVxuICAgICAgICAgICAgLy8gaWYgYSBrZXllZCBub2RlIGhhcyBiZWVuIG1hdGNoZWQgdXAgb3Igbm90XG4gICAgICAgICAgICBpZiAoa2V5ZWRSZW1vdmFsTGlzdCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGk9MCwgbGVuPWtleWVkUmVtb3ZhbExpc3QubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbFRvUmVtb3ZlID0gZnJvbU5vZGVzTG9va3VwW2tleWVkUmVtb3ZhbExpc3RbaV1dO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxUb1JlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShlbFRvUmVtb3ZlLCBlbFRvUmVtb3ZlLnBhcmVudE5vZGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2hpbGRyZW5Pbmx5ICYmIG1vcnBoZWROb2RlICE9PSBmcm9tTm9kZSAmJiBmcm9tTm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBpZiAobW9ycGhlZE5vZGUuYWN0dWFsaXplKSB7XG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSBtb3JwaGVkTm9kZS5hY3R1YWxpemUoZnJvbU5vZGUub3duZXJEb2N1bWVudCB8fCBkb2MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgd2UgaGFkIHRvIHN3YXAgb3V0IHRoZSBmcm9tIG5vZGUgd2l0aCBhIG5ldyBub2RlIGJlY2F1c2UgdGhlIG9sZFxuICAgICAgICAgICAgLy8gbm9kZSB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgdGFyZ2V0IG5vZGUgdGhlbiB3ZSBuZWVkIHRvXG4gICAgICAgICAgICAvLyByZXBsYWNlIHRoZSBvbGQgRE9NIG5vZGUgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLiBUaGlzIGlzIG9ubHlcbiAgICAgICAgICAgIC8vIHBvc3NpYmxlIGlmIHRoZSBvcmlnaW5hbCBET00gbm9kZSB3YXMgcGFydCBvZiBhIERPTSB0cmVlIHdoaWNoXG4gICAgICAgICAgICAvLyB3ZSBrbm93IGlzIHRoZSBjYXNlIGlmIGl0IGhhcyBhIHBhcmVudCBub2RlLlxuICAgICAgICAgICAgZnJvbU5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobW9ycGhlZE5vZGUsIGZyb21Ob2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbiAgICB9O1xufVxuXG52YXIgbW9ycGhkb20gPSBtb3JwaGRvbUZhY3RvcnkobW9ycGhBdHRycyk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vcnBoZG9tO1xuIiwgImltcG9ydCB7XG4gIFBIWF9DT01QT05FTlQsXG4gIFBIWF9ESVNBQkxFX1dJVEgsXG4gIFBIWF9GRUVEQkFDS19GT1IsXG4gIFBIWF9QUlVORSxcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9TRVNTSU9OLFxuICBQSFhfU0tJUCxcbiAgUEhYX1NUQVRJQyxcbiAgUEhYX1RSSUdHRVJfQUNUSU9OLFxuICBQSFhfVVBEQVRFXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGRldGVjdER1cGxpY2F0ZUlkcyxcbiAgaXNDaWRcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5pbXBvcnQgRE9NIGZyb20gXCIuL2RvbVwiXG5pbXBvcnQgRE9NUG9zdE1vcnBoUmVzdG9yZXIgZnJvbSBcIi4vZG9tX3Bvc3RfbW9ycGhfcmVzdG9yZXJcIlxuaW1wb3J0IG1vcnBoZG9tIGZyb20gXCJtb3JwaGRvbVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERPTVBhdGNoIHtcbiAgc3RhdGljIHBhdGNoRWwoZnJvbUVsLCB0b0VsLCBhY3RpdmVFbGVtZW50KXtcbiAgICBtb3JwaGRvbShmcm9tRWwsIHRvRWwsIHtcbiAgICAgIGNoaWxkcmVuT25seTogZmFsc2UsXG4gICAgICBvbkJlZm9yZUVsVXBkYXRlZDogKGZyb21FbCwgdG9FbCkgPT4ge1xuICAgICAgICBpZihhY3RpdmVFbGVtZW50ICYmIGFjdGl2ZUVsZW1lbnQuaXNTYW1lTm9kZShmcm9tRWwpICYmIERPTS5pc0Zvcm1JbnB1dChmcm9tRWwpKXtcbiAgICAgICAgICBET00ubWVyZ2VGb2N1c2VkSW5wdXQoZnJvbUVsLCB0b0VsKVxuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHZpZXcsIGNvbnRhaW5lciwgaWQsIGh0bWwsIHRhcmdldENJRCl7XG4gICAgdGhpcy52aWV3ID0gdmlld1xuICAgIHRoaXMubGl2ZVNvY2tldCA9IHZpZXcubGl2ZVNvY2tldFxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyXG4gICAgdGhpcy5pZCA9IGlkXG4gICAgdGhpcy5yb290SUQgPSB2aWV3LnJvb3QuaWRcbiAgICB0aGlzLmh0bWwgPSBodG1sXG4gICAgdGhpcy50YXJnZXRDSUQgPSB0YXJnZXRDSURcbiAgICB0aGlzLmNpZFBhdGNoID0gaXNDaWQodGhpcy50YXJnZXRDSUQpXG4gICAgdGhpcy5jYWxsYmFja3MgPSB7XG4gICAgICBiZWZvcmVhZGRlZDogW10sIGJlZm9yZXVwZGF0ZWQ6IFtdLCBiZWZvcmVwaHhDaGlsZEFkZGVkOiBbXSxcbiAgICAgIGFmdGVyYWRkZWQ6IFtdLCBhZnRlcnVwZGF0ZWQ6IFtdLCBhZnRlcmRpc2NhcmRlZDogW10sIGFmdGVycGh4Q2hpbGRBZGRlZDogW10sXG4gICAgICBhZnRlcnRyYW5zaXRpb25zRGlzY2FyZGVkOiBbXVxuICAgIH1cbiAgfVxuXG4gIGJlZm9yZShraW5kLCBjYWxsYmFjayl7IHRoaXMuY2FsbGJhY2tzW2BiZWZvcmUke2tpbmR9YF0ucHVzaChjYWxsYmFjaykgfVxuICBhZnRlcihraW5kLCBjYWxsYmFjayl7IHRoaXMuY2FsbGJhY2tzW2BhZnRlciR7a2luZH1gXS5wdXNoKGNhbGxiYWNrKSB9XG5cbiAgdHJhY2tCZWZvcmUoa2luZCwgLi4uYXJncyl7XG4gICAgdGhpcy5jYWxsYmFja3NbYGJlZm9yZSR7a2luZH1gXS5mb3JFYWNoKGNhbGxiYWNrID0+IGNhbGxiYWNrKC4uLmFyZ3MpKVxuICB9XG5cbiAgdHJhY2tBZnRlcihraW5kLCAuLi5hcmdzKXtcbiAgICB0aGlzLmNhbGxiYWNrc1tgYWZ0ZXIke2tpbmR9YF0uZm9yRWFjaChjYWxsYmFjayA9PiBjYWxsYmFjayguLi5hcmdzKSlcbiAgfVxuXG4gIG1hcmtQcnVuYWJsZUNvbnRlbnRGb3JSZW1vdmFsKCl7XG4gICAgRE9NLmFsbCh0aGlzLmNvbnRhaW5lciwgXCJbcGh4LXVwZGF0ZT1hcHBlbmRdID4gKiwgW3BoeC11cGRhdGU9cHJlcGVuZF0gPiAqXCIsIGVsID0+IHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZShQSFhfUFJVTkUsIFwiXCIpXG4gICAgfSlcbiAgfVxuXG4gIHBlcmZvcm0oKXtcbiAgICBsZXQge3ZpZXcsIGxpdmVTb2NrZXQsIGNvbnRhaW5lciwgaHRtbH0gPSB0aGlzXG4gICAgbGV0IHRhcmdldENvbnRhaW5lciA9IHRoaXMuaXNDSURQYXRjaCgpID8gdGhpcy50YXJnZXRDSURDb250YWluZXIoaHRtbCkgOiBjb250YWluZXJcbiAgICBpZih0aGlzLmlzQ0lEUGF0Y2goKSAmJiAhdGFyZ2V0Q29udGFpbmVyKXsgcmV0dXJuIH1cblxuICAgIGxldCBmb2N1c2VkID0gbGl2ZVNvY2tldC5nZXRBY3RpdmVFbGVtZW50KClcbiAgICBsZXQge3NlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmR9ID0gZm9jdXNlZCAmJiBET00uaGFzU2VsZWN0aW9uUmFuZ2UoZm9jdXNlZCkgPyBmb2N1c2VkIDoge31cbiAgICBsZXQgcGh4VXBkYXRlID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9VUERBVEUpXG4gICAgbGV0IHBoeEZlZWRiYWNrRm9yID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9GRUVEQkFDS19GT1IpXG4gICAgbGV0IGRpc2FibGVXaXRoID0gbGl2ZVNvY2tldC5iaW5kaW5nKFBIWF9ESVNBQkxFX1dJVEgpXG4gICAgbGV0IHBoeFRyaWdnZXJFeHRlcm5hbCA9IGxpdmVTb2NrZXQuYmluZGluZyhQSFhfVFJJR0dFUl9BQ1RJT04pXG4gICAgbGV0IHBoeFJlbW92ZSA9IGxpdmVTb2NrZXQuYmluZGluZyhcInJlbW92ZVwiKVxuICAgIGxldCBhZGRlZCA9IFtdXG4gICAgbGV0IHVwZGF0ZXMgPSBbXVxuICAgIGxldCBhcHBlbmRQcmVwZW5kVXBkYXRlcyA9IFtdXG4gICAgbGV0IHBlbmRpbmdSZW1vdmVzID0gW11cbiAgICBsZXQgZXh0ZXJuYWxGb3JtVHJpZ2dlcmVkID0gbnVsbFxuXG4gICAgbGV0IGRpZmZIVE1MID0gbGl2ZVNvY2tldC50aW1lKFwicHJlbW9ycGggY29udGFpbmVyIHByZXBcIiwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuYnVpbGREaWZmSFRNTChjb250YWluZXIsIGh0bWwsIHBoeFVwZGF0ZSwgdGFyZ2V0Q29udGFpbmVyKVxuICAgIH0pXG5cbiAgICB0aGlzLnRyYWNrQmVmb3JlKFwiYWRkZWRcIiwgY29udGFpbmVyKVxuICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGNvbnRhaW5lciwgY29udGFpbmVyKVxuXG4gICAgbGl2ZVNvY2tldC50aW1lKFwibW9ycGhkb21cIiwgKCkgPT4ge1xuICAgICAgbW9ycGhkb20odGFyZ2V0Q29udGFpbmVyLCBkaWZmSFRNTCwge1xuICAgICAgICBjaGlsZHJlbk9ubHk6IHRhcmdldENvbnRhaW5lci5nZXRBdHRyaWJ1dGUoUEhYX0NPTVBPTkVOVCkgPT09IG51bGwsXG4gICAgICAgIGdldE5vZGVLZXk6IChub2RlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIERPTS5pc1BoeERlc3Ryb3llZChub2RlKSA/IG51bGwgOiBub2RlLmlkXG4gICAgICAgIH0sXG4gICAgICAgIG9uQmVmb3JlTm9kZUFkZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICB0aGlzLnRyYWNrQmVmb3JlKFwiYWRkZWRcIiwgZWwpXG4gICAgICAgICAgcmV0dXJuIGVsXG4gICAgICAgIH0sXG4gICAgICAgIG9uTm9kZUFkZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICAvLyBoYWNrIHRvIGZpeCBTYWZhcmkgaGFuZGxpbmcgb2YgaW1nIHNyY3NldCBhbmQgdmlkZW8gdGFnc1xuICAgICAgICAgIGlmKGVsIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCAmJiBlbC5zcmNzZXQpe1xuICAgICAgICAgICAgZWwuc3Jjc2V0ID0gZWwuc3Jjc2V0XG4gICAgICAgICAgfSBlbHNlIGlmKGVsIGluc3RhbmNlb2YgSFRNTFZpZGVvRWxlbWVudCAmJiBlbC5hdXRvcGxheSl7XG4gICAgICAgICAgICBlbC5wbGF5KClcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoRE9NLmlzTm93VHJpZ2dlckZvcm1FeHRlcm5hbChlbCwgcGh4VHJpZ2dlckV4dGVybmFsKSl7XG4gICAgICAgICAgICBleHRlcm5hbEZvcm1UcmlnZ2VyZWQgPSBlbFxuICAgICAgICAgIH1cbiAgICAgICAgICAvL2lucHV0IGhhbmRsaW5nXG4gICAgICAgICAgRE9NLmRpc2NhcmRFcnJvcih0YXJnZXRDb250YWluZXIsIGVsLCBwaHhGZWVkYmFja0ZvcilcbiAgICAgICAgICAvLyBuZXN0ZWQgdmlldyBoYW5kbGluZ1xuICAgICAgICAgIGlmKChET00uaXNQaHhDaGlsZChlbCkgJiYgdmlldy5vd25zRWxlbWVudChlbCkpIHx8IERPTS5pc1BoeFN0aWNreShlbCkgJiYgdmlldy5vd25zRWxlbWVudChlbC5wYXJlbnROb2RlKSl7XG4gICAgICAgICAgICB0aGlzLnRyYWNrQWZ0ZXIoXCJwaHhDaGlsZEFkZGVkXCIsIGVsKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRlZC5wdXNoKGVsKVxuICAgICAgICB9LFxuICAgICAgICBvbk5vZGVEaXNjYXJkZWQ6IChlbCkgPT4ge1xuICAgICAgICAgIC8vIG5lc3RlZCB2aWV3IGhhbmRsaW5nXG4gICAgICAgICAgaWYoRE9NLmlzUGh4Q2hpbGQoZWwpIHx8IERPTS5pc1BoeFN0aWNreShlbCkpeyBsaXZlU29ja2V0LmRlc3Ryb3lWaWV3QnlFbChlbCkgfVxuICAgICAgICAgIHRoaXMudHJhY2tBZnRlcihcImRpc2NhcmRlZFwiLCBlbClcbiAgICAgICAgfSxcbiAgICAgICAgb25CZWZvcmVOb2RlRGlzY2FyZGVkOiAoZWwpID0+IHtcbiAgICAgICAgICBpZihlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9QUlVORSkgIT09IG51bGwpeyByZXR1cm4gdHJ1ZSB9XG4gICAgICAgICAgaWYoZWwucGFyZW50Tm9kZSAhPT0gbnVsbCAmJiBET00uaXNQaHhVcGRhdGUoZWwucGFyZW50Tm9kZSwgcGh4VXBkYXRlLCBbXCJhcHBlbmRcIiwgXCJwcmVwZW5kXCJdKSAmJiBlbC5pZCl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgaWYoZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShwaHhSZW1vdmUpKXtcbiAgICAgICAgICAgIHBlbmRpbmdSZW1vdmVzLnB1c2goZWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYodGhpcy5za2lwQ0lEU2libGluZyhlbCkpeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIG9uRWxVcGRhdGVkOiAoZWwpID0+IHtcbiAgICAgICAgICBpZihET00uaXNOb3dUcmlnZ2VyRm9ybUV4dGVybmFsKGVsLCBwaHhUcmlnZ2VyRXh0ZXJuYWwpKXtcbiAgICAgICAgICAgIGV4dGVybmFsRm9ybVRyaWdnZXJlZCA9IGVsXG4gICAgICAgICAgfVxuICAgICAgICAgIHVwZGF0ZXMucHVzaChlbClcbiAgICAgICAgfSxcbiAgICAgICAgb25CZWZvcmVFbFVwZGF0ZWQ6IChmcm9tRWwsIHRvRWwpID0+IHtcbiAgICAgICAgICBET00uY2xlYW5DaGlsZE5vZGVzKHRvRWwsIHBoeFVwZGF0ZSlcbiAgICAgICAgICBpZih0aGlzLnNraXBDSURTaWJsaW5nKHRvRWwpKXsgcmV0dXJuIGZhbHNlIH1cbiAgICAgICAgICBpZihET00uaXNQaHhTdGlja3koZnJvbUVsKSl7IHJldHVybiBmYWxzZSB9XG4gICAgICAgICAgaWYoRE9NLmlzSWdub3JlZChmcm9tRWwsIHBoeFVwZGF0ZSkpe1xuICAgICAgICAgICAgdGhpcy50cmFja0JlZm9yZShcInVwZGF0ZWRcIiwgZnJvbUVsLCB0b0VsKVxuICAgICAgICAgICAgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7aXNJZ25vcmVkOiB0cnVlfSlcbiAgICAgICAgICAgIHVwZGF0ZXMucHVzaChmcm9tRWwpXG4gICAgICAgICAgICBET00uYXBwbHlTdGlja3lPcGVyYXRpb25zKGZyb21FbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihmcm9tRWwudHlwZSA9PT0gXCJudW1iZXJcIiAmJiAoZnJvbUVsLnZhbGlkaXR5ICYmIGZyb21FbC52YWxpZGl0eS5iYWRJbnB1dCkpeyByZXR1cm4gZmFsc2UgfVxuICAgICAgICAgIGlmKCFET00uc3luY1BlbmRpbmdSZWYoZnJvbUVsLCB0b0VsLCBkaXNhYmxlV2l0aCkpe1xuICAgICAgICAgICAgaWYoRE9NLmlzVXBsb2FkSW5wdXQoZnJvbUVsKSl7XG4gICAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgICAgdXBkYXRlcy5wdXNoKGZyb21FbClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnMoZnJvbUVsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbmVzdGVkIHZpZXcgaGFuZGxpbmdcbiAgICAgICAgICBpZihET00uaXNQaHhDaGlsZCh0b0VsKSl7XG4gICAgICAgICAgICBsZXQgcHJldlNlc3Npb24gPSBmcm9tRWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKVxuICAgICAgICAgICAgRE9NLm1lcmdlQXR0cnMoZnJvbUVsLCB0b0VsLCB7ZXhjbHVkZTogW1BIWF9TVEFUSUNdfSlcbiAgICAgICAgICAgIGlmKHByZXZTZXNzaW9uICE9PSBcIlwiKXsgZnJvbUVsLnNldEF0dHJpYnV0ZShQSFhfU0VTU0lPTiwgcHJldlNlc3Npb24pIH1cbiAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQsIHRoaXMucm9vdElEKVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpbnB1dCBoYW5kbGluZ1xuICAgICAgICAgIERPTS5jb3B5UHJpdmF0ZXModG9FbCwgZnJvbUVsKVxuICAgICAgICAgIERPTS5kaXNjYXJkRXJyb3IodGFyZ2V0Q29udGFpbmVyLCB0b0VsLCBwaHhGZWVkYmFja0ZvcilcblxuICAgICAgICAgIGxldCBpc0ZvY3VzZWRGb3JtRWwgPSBmb2N1c2VkICYmIGZyb21FbC5pc1NhbWVOb2RlKGZvY3VzZWQpICYmIERPTS5pc0Zvcm1JbnB1dChmcm9tRWwpXG4gICAgICAgICAgaWYoaXNGb2N1c2VkRm9ybUVsKXtcbiAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIERPTS5tZXJnZUZvY3VzZWRJbnB1dChmcm9tRWwsIHRvRWwpXG4gICAgICAgICAgICBET00uc3luY0F0dHJzVG9Qcm9wcyhmcm9tRWwpXG4gICAgICAgICAgICB1cGRhdGVzLnB1c2goZnJvbUVsKVxuICAgICAgICAgICAgRE9NLmFwcGx5U3RpY2t5T3BlcmF0aW9ucyhmcm9tRWwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYoRE9NLmlzUGh4VXBkYXRlKHRvRWwsIHBoeFVwZGF0ZSwgW1wiYXBwZW5kXCIsIFwicHJlcGVuZFwiXSkpe1xuICAgICAgICAgICAgICBhcHBlbmRQcmVwZW5kVXBkYXRlcy5wdXNoKG5ldyBET01Qb3N0TW9ycGhSZXN0b3Jlcihmcm9tRWwsIHRvRWwsIHRvRWwuZ2V0QXR0cmlidXRlKHBoeFVwZGF0ZSkpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgRE9NLnN5bmNBdHRyc1RvUHJvcHModG9FbClcbiAgICAgICAgICAgIERPTS5hcHBseVN0aWNreU9wZXJhdGlvbnModG9FbClcbiAgICAgICAgICAgIHRoaXMudHJhY2tCZWZvcmUoXCJ1cGRhdGVkXCIsIGZyb21FbCwgdG9FbClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBpZihsaXZlU29ja2V0LmlzRGVidWdFbmFibGVkKCkpeyBkZXRlY3REdXBsaWNhdGVJZHMoKSB9XG5cbiAgICBpZihhcHBlbmRQcmVwZW5kVXBkYXRlcy5sZW5ndGggPiAwKXtcbiAgICAgIGxpdmVTb2NrZXQudGltZShcInBvc3QtbW9ycGggYXBwZW5kL3ByZXBlbmQgcmVzdG9yYXRpb25cIiwgKCkgPT4ge1xuICAgICAgICBhcHBlbmRQcmVwZW5kVXBkYXRlcy5mb3JFYWNoKHVwZGF0ZSA9PiB1cGRhdGUucGVyZm9ybSgpKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBsaXZlU29ja2V0LnNpbGVuY2VFdmVudHMoKCkgPT4gRE9NLnJlc3RvcmVGb2N1cyhmb2N1c2VkLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKSlcbiAgICBET00uZGlzcGF0Y2hFdmVudChkb2N1bWVudCwgXCJwaHg6dXBkYXRlXCIpXG4gICAgYWRkZWQuZm9yRWFjaChlbCA9PiB0aGlzLnRyYWNrQWZ0ZXIoXCJhZGRlZFwiLCBlbCkpXG4gICAgdXBkYXRlcy5mb3JFYWNoKGVsID0+IHRoaXMudHJhY2tBZnRlcihcInVwZGF0ZWRcIiwgZWwpKVxuXG4gICAgaWYocGVuZGluZ1JlbW92ZXMubGVuZ3RoID4gMCl7XG4gICAgICBsaXZlU29ja2V0LnRyYW5zaXRpb25SZW1vdmVzKHBlbmRpbmdSZW1vdmVzKVxuICAgICAgbGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgcGVuZGluZ1JlbW92ZXMuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgbGV0IGNoaWxkID0gRE9NLmZpcnN0UGh4Q2hpbGQoZWwpXG4gICAgICAgICAgaWYoY2hpbGQpeyBsaXZlU29ja2V0LmRlc3Ryb3lWaWV3QnlFbChjaGlsZCkgfVxuICAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgIH0pXG4gICAgICAgIHRoaXMudHJhY2tBZnRlcihcInRyYW5zaXRpb25zRGlzY2FyZGVkXCIsIHBlbmRpbmdSZW1vdmVzKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZihleHRlcm5hbEZvcm1UcmlnZ2VyZWQpe1xuICAgICAgbGl2ZVNvY2tldC5kaXNjb25uZWN0KClcbiAgICAgIGV4dGVybmFsRm9ybVRyaWdnZXJlZC5zdWJtaXQoKVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaXNDSURQYXRjaCgpeyByZXR1cm4gdGhpcy5jaWRQYXRjaCB9XG5cbiAgc2tpcENJRFNpYmxpbmcoZWwpe1xuICAgIHJldHVybiBlbC5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9TS0lQKSAhPT0gbnVsbFxuICB9XG5cbiAgdGFyZ2V0Q0lEQ29udGFpbmVyKGh0bWwpe1xuICAgIGlmKCF0aGlzLmlzQ0lEUGF0Y2goKSl7IHJldHVybiB9XG4gICAgbGV0IFtmaXJzdCwgLi4ucmVzdF0gPSBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuY29udGFpbmVyLCB0aGlzLnRhcmdldENJRClcbiAgICBpZihyZXN0Lmxlbmd0aCA9PT0gMCAmJiBET00uY2hpbGROb2RlTGVuZ3RoKGh0bWwpID09PSAxKXtcbiAgICAgIHJldHVybiBmaXJzdFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmlyc3QgJiYgZmlyc3QucGFyZW50Tm9kZVxuICAgIH1cbiAgfVxuXG4gIC8vIGJ1aWxkcyBIVE1MIGZvciBtb3JwaGRvbSBwYXRjaFxuICAvLyAtIGZvciBmdWxsIHBhdGNoZXMgb2YgTGl2ZVZpZXcgb3IgYSBjb21wb25lbnQgd2l0aCBhIHNpbmdsZVxuICAvLyAgIHJvb3Qgbm9kZSwgc2ltcGx5IHJldHVybnMgdGhlIEhUTUxcbiAgLy8gLSBmb3IgcGF0Y2hlcyBvZiBhIGNvbXBvbmVudCB3aXRoIG11bHRpcGxlIHJvb3Qgbm9kZXMsIHRoZVxuICAvLyAgIHBhcmVudCBub2RlIGJlY29tZXMgdGhlIHRhcmdldCBjb250YWluZXIgYW5kIG5vbi1jb21wb25lbnRcbiAgLy8gICBzaWJsaW5ncyBhcmUgbWFya2VkIGFzIHNraXAuXG4gIGJ1aWxkRGlmZkhUTUwoY29udGFpbmVyLCBodG1sLCBwaHhVcGRhdGUsIHRhcmdldENvbnRhaW5lcil7XG4gICAgbGV0IGlzQ0lEUGF0Y2ggPSB0aGlzLmlzQ0lEUGF0Y2goKVxuICAgIGxldCBpc0NJRFdpdGhTaW5nbGVSb290ID0gaXNDSURQYXRjaCAmJiB0YXJnZXRDb250YWluZXIuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpID09PSB0aGlzLnRhcmdldENJRC50b1N0cmluZygpXG4gICAgaWYoIWlzQ0lEUGF0Y2ggfHwgaXNDSURXaXRoU2luZ2xlUm9vdCl7XG4gICAgICByZXR1cm4gaHRtbFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb21wb25lbnQgcGF0Y2ggd2l0aCBtdWx0aXBsZSBDSUQgcm9vdHNcbiAgICAgIGxldCBkaWZmQ29udGFpbmVyID0gbnVsbFxuICAgICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgICBkaWZmQ29udGFpbmVyID0gRE9NLmNsb25lTm9kZSh0YXJnZXRDb250YWluZXIpXG4gICAgICBsZXQgW2ZpcnN0Q29tcG9uZW50LCAuLi5yZXN0XSA9IERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QoZGlmZkNvbnRhaW5lciwgdGhpcy50YXJnZXRDSUQpXG4gICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sXG4gICAgICByZXN0LmZvckVhY2goZWwgPT4gZWwucmVtb3ZlKCkpXG4gICAgICBBcnJheS5mcm9tKGRpZmZDb250YWluZXIuY2hpbGROb2RlcykuZm9yRWFjaChjaGlsZCA9PiB7XG4gICAgICAgIC8vIHdlIGNhbiBvbmx5IHNraXAgdHJhY2thYmxlIG5vZGVzIHdpdGggYW4gSURcbiAgICAgICAgaWYoY2hpbGQuaWQgJiYgY2hpbGQubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFICYmIGNoaWxkLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKSAhPT0gdGhpcy50YXJnZXRDSUQudG9TdHJpbmcoKSl7XG4gICAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKFBIWF9TS0lQLCBcIlwiKVxuICAgICAgICAgIGNoaWxkLmlubmVySFRNTCA9IFwiXCJcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIEFycmF5LmZyb20odGVtcGxhdGUuY29udGVudC5jaGlsZE5vZGVzKS5mb3JFYWNoKGVsID0+IGRpZmZDb250YWluZXIuaW5zZXJ0QmVmb3JlKGVsLCBmaXJzdENvbXBvbmVudCkpXG4gICAgICBmaXJzdENvbXBvbmVudC5yZW1vdmUoKVxuICAgICAgcmV0dXJuIGRpZmZDb250YWluZXIub3V0ZXJIVE1MXG4gICAgfVxuICB9XG59XG4iLCAiaW1wb3J0IHtcbiAgQ09NUE9ORU5UUyxcbiAgRFlOQU1JQ1MsXG4gIFRFTVBMQVRFUyxcbiAgRVZFTlRTLFxuICBQSFhfQ09NUE9ORU5ULFxuICBQSFhfU0tJUCxcbiAgUkVQTFksXG4gIFNUQVRJQyxcbiAgVElUTEVcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgaXNPYmplY3QsXG4gIGxvZ0Vycm9yLFxuICBpc0NpZCxcbn0gZnJvbSBcIi4vdXRpbHNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlZCB7XG4gIHN0YXRpYyBleHRyYWN0KGRpZmYpe1xuICAgIGxldCB7W1JFUExZXTogcmVwbHksIFtFVkVOVFNdOiBldmVudHMsIFtUSVRMRV06IHRpdGxlfSA9IGRpZmZcbiAgICBkZWxldGUgZGlmZltSRVBMWV1cbiAgICBkZWxldGUgZGlmZltFVkVOVFNdXG4gICAgZGVsZXRlIGRpZmZbVElUTEVdXG4gICAgcmV0dXJuIHtkaWZmLCB0aXRsZSwgcmVwbHk6IHJlcGx5IHx8IG51bGwsIGV2ZW50czogZXZlbnRzIHx8IFtdfVxuICB9XG5cbiAgY29uc3RydWN0b3Iodmlld0lkLCByZW5kZXJlZCl7XG4gICAgdGhpcy52aWV3SWQgPSB2aWV3SWRcbiAgICB0aGlzLnJlbmRlcmVkID0ge31cbiAgICB0aGlzLm1lcmdlRGlmZihyZW5kZXJlZClcbiAgfVxuXG4gIHBhcmVudFZpZXdJZCgpeyByZXR1cm4gdGhpcy52aWV3SWQgfVxuXG4gIHRvU3RyaW5nKG9ubHlDaWRzKXtcbiAgICByZXR1cm4gdGhpcy5yZWN1cnNpdmVUb1N0cmluZyh0aGlzLnJlbmRlcmVkLCB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdLCBvbmx5Q2lkcylcbiAgfVxuXG4gIHJlY3Vyc2l2ZVRvU3RyaW5nKHJlbmRlcmVkLCBjb21wb25lbnRzID0gcmVuZGVyZWRbQ09NUE9ORU5UU10sIG9ubHlDaWRzKXtcbiAgICBvbmx5Q2lkcyA9IG9ubHlDaWRzID8gbmV3IFNldChvbmx5Q2lkcykgOiBudWxsXG4gICAgbGV0IG91dHB1dCA9IHtidWZmZXI6IFwiXCIsIGNvbXBvbmVudHM6IGNvbXBvbmVudHMsIG9ubHlDaWRzOiBvbmx5Q2lkc31cbiAgICB0aGlzLnRvT3V0cHV0QnVmZmVyKHJlbmRlcmVkLCBudWxsLCBvdXRwdXQpXG4gICAgcmV0dXJuIG91dHB1dC5idWZmZXJcbiAgfVxuXG4gIGNvbXBvbmVudENJRHMoZGlmZil7IHJldHVybiBPYmplY3Qua2V5cyhkaWZmW0NPTVBPTkVOVFNdIHx8IHt9KS5tYXAoaSA9PiBwYXJzZUludChpKSkgfVxuXG4gIGlzQ29tcG9uZW50T25seURpZmYoZGlmZil7XG4gICAgaWYoIWRpZmZbQ09NUE9ORU5UU10peyByZXR1cm4gZmFsc2UgfVxuICAgIHJldHVybiBPYmplY3Qua2V5cyhkaWZmKS5sZW5ndGggPT09IDFcbiAgfVxuXG4gIGdldENvbXBvbmVudChkaWZmLCBjaWQpeyByZXR1cm4gZGlmZltDT01QT05FTlRTXVtjaWRdIH1cblxuICBtZXJnZURpZmYoZGlmZil7XG4gICAgbGV0IG5ld2MgPSBkaWZmW0NPTVBPTkVOVFNdXG4gICAgbGV0IGNhY2hlID0ge31cbiAgICBkZWxldGUgZGlmZltDT01QT05FTlRTXVxuICAgIHRoaXMucmVuZGVyZWQgPSB0aGlzLm11dGFibGVNZXJnZSh0aGlzLnJlbmRlcmVkLCBkaWZmKVxuICAgIHRoaXMucmVuZGVyZWRbQ09NUE9ORU5UU10gPSB0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdIHx8IHt9XG5cbiAgICBpZihuZXdjKXtcbiAgICAgIGxldCBvbGRjID0gdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXVxuXG4gICAgICBmb3IobGV0IGNpZCBpbiBuZXdjKXtcbiAgICAgICAgbmV3Y1tjaWRdID0gdGhpcy5jYWNoZWRGaW5kQ29tcG9uZW50KGNpZCwgbmV3Y1tjaWRdLCBvbGRjLCBuZXdjLCBjYWNoZSlcbiAgICAgIH1cblxuICAgICAgZm9yKGxldCBjaWQgaW4gbmV3Yyl7IG9sZGNbY2lkXSA9IG5ld2NbY2lkXSB9XG4gICAgICBkaWZmW0NPTVBPTkVOVFNdID0gbmV3Y1xuICAgIH1cbiAgfVxuXG4gIGNhY2hlZEZpbmRDb21wb25lbnQoY2lkLCBjZGlmZiwgb2xkYywgbmV3YywgY2FjaGUpe1xuICAgIGlmKGNhY2hlW2NpZF0pe1xuICAgICAgcmV0dXJuIGNhY2hlW2NpZF1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IG5kaWZmLCBzdGF0LCBzY2lkID0gY2RpZmZbU1RBVElDXVxuXG4gICAgICBpZihpc0NpZChzY2lkKSl7XG4gICAgICAgIGxldCB0ZGlmZlxuXG4gICAgICAgIGlmKHNjaWQgPiAwKXtcbiAgICAgICAgICB0ZGlmZiA9IHRoaXMuY2FjaGVkRmluZENvbXBvbmVudChzY2lkLCBuZXdjW3NjaWRdLCBvbGRjLCBuZXdjLCBjYWNoZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZGlmZiA9IG9sZGNbLXNjaWRdXG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ID0gdGRpZmZbU1RBVElDXVxuICAgICAgICBuZGlmZiA9IHRoaXMuY2xvbmVNZXJnZSh0ZGlmZiwgY2RpZmYpXG4gICAgICAgIG5kaWZmW1NUQVRJQ10gPSBzdGF0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZGlmZiA9IGNkaWZmW1NUQVRJQ10gIT09IHVuZGVmaW5lZCA/IGNkaWZmIDogdGhpcy5jbG9uZU1lcmdlKG9sZGNbY2lkXSB8fCB7fSwgY2RpZmYpXG4gICAgICB9XG5cbiAgICAgIGNhY2hlW2NpZF0gPSBuZGlmZlxuICAgICAgcmV0dXJuIG5kaWZmXG4gICAgfVxuICB9XG5cbiAgbXV0YWJsZU1lcmdlKHRhcmdldCwgc291cmNlKXtcbiAgICBpZihzb3VyY2VbU1RBVElDXSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIHJldHVybiBzb3VyY2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kb011dGFibGVNZXJnZSh0YXJnZXQsIHNvdXJjZSlcbiAgICAgIHJldHVybiB0YXJnZXRcbiAgICB9XG4gIH1cblxuICBkb011dGFibGVNZXJnZSh0YXJnZXQsIHNvdXJjZSl7XG4gICAgZm9yKGxldCBrZXkgaW4gc291cmNlKXtcbiAgICAgIGxldCB2YWwgPSBzb3VyY2Vba2V5XVxuICAgICAgbGV0IHRhcmdldFZhbCA9IHRhcmdldFtrZXldXG4gICAgICBpZihpc09iamVjdCh2YWwpICYmIHZhbFtTVEFUSUNdID09PSB1bmRlZmluZWQgJiYgaXNPYmplY3QodGFyZ2V0VmFsKSl7XG4gICAgICAgIHRoaXMuZG9NdXRhYmxlTWVyZ2UodGFyZ2V0VmFsLCB2YWwpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHZhbFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNsb25lTWVyZ2UodGFyZ2V0LCBzb3VyY2Upe1xuICAgIGxldCBtZXJnZWQgPSB7Li4udGFyZ2V0LCAuLi5zb3VyY2V9XG4gICAgZm9yKGxldCBrZXkgaW4gbWVyZ2VkKXtcbiAgICAgIGxldCB2YWwgPSBzb3VyY2Vba2V5XVxuICAgICAgbGV0IHRhcmdldFZhbCA9IHRhcmdldFtrZXldXG4gICAgICBpZihpc09iamVjdCh2YWwpICYmIHZhbFtTVEFUSUNdID09PSB1bmRlZmluZWQgJiYgaXNPYmplY3QodGFyZ2V0VmFsKSl7XG4gICAgICAgIG1lcmdlZFtrZXldID0gdGhpcy5jbG9uZU1lcmdlKHRhcmdldFZhbCwgdmFsKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWVyZ2VkXG4gIH1cblxuICBjb21wb25lbnRUb1N0cmluZyhjaWQpeyByZXR1cm4gdGhpcy5yZWN1cnNpdmVDSURUb1N0cmluZyh0aGlzLnJlbmRlcmVkW0NPTVBPTkVOVFNdLCBjaWQpIH1cblxuICBwcnVuZUNJRHMoY2lkcyl7XG4gICAgY2lkcy5mb3JFYWNoKGNpZCA9PiBkZWxldGUgdGhpcy5yZW5kZXJlZFtDT01QT05FTlRTXVtjaWRdKVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIGdldCgpeyByZXR1cm4gdGhpcy5yZW5kZXJlZCB9XG5cbiAgaXNOZXdGaW5nZXJwcmludChkaWZmID0ge30peyByZXR1cm4gISFkaWZmW1NUQVRJQ10gfVxuXG4gIHRlbXBsYXRlU3RhdGljKHBhcnQsIHRlbXBsYXRlcyl7XG4gICAgaWYodHlwZW9mIChwYXJ0KSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlc1twYXJ0XVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcGFydFxuICAgIH1cbiAgfVxuXG4gIHRvT3V0cHV0QnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCl7XG4gICAgaWYocmVuZGVyZWRbRFlOQU1JQ1NdKXsgcmV0dXJuIHRoaXMuY29tcHJlaGVuc2lvblRvQnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCkgfVxuICAgIGxldCB7W1NUQVRJQ106IHN0YXRpY3N9ID0gcmVuZGVyZWRcbiAgICBzdGF0aWNzID0gdGhpcy50ZW1wbGF0ZVN0YXRpYyhzdGF0aWNzLCB0ZW1wbGF0ZXMpXG5cbiAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbMF1cbiAgICBmb3IobGV0IGkgPSAxOyBpIDwgc3RhdGljcy5sZW5ndGg7IGkrKyl7XG4gICAgICB0aGlzLmR5bmFtaWNUb0J1ZmZlcihyZW5kZXJlZFtpIC0gMV0sIHRlbXBsYXRlcywgb3V0cHV0KVxuICAgICAgb3V0cHV0LmJ1ZmZlciArPSBzdGF0aWNzW2ldXG4gICAgfVxuICB9XG5cbiAgY29tcHJlaGVuc2lvblRvQnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dCl7XG4gICAgbGV0IHtbRFlOQU1JQ1NdOiBkeW5hbWljcywgW1NUQVRJQ106IHN0YXRpY3N9ID0gcmVuZGVyZWRcbiAgICBzdGF0aWNzID0gdGhpcy50ZW1wbGF0ZVN0YXRpYyhzdGF0aWNzLCB0ZW1wbGF0ZXMpXG4gICAgbGV0IGNvbXBUZW1wbGF0ZXMgPSB0ZW1wbGF0ZXMgfHwgcmVuZGVyZWRbVEVNUExBVEVTXVxuXG4gICAgZm9yKGxldCBkID0gMDsgZCA8IGR5bmFtaWNzLmxlbmd0aDsgZCsrKXtcbiAgICAgIGxldCBkeW5hbWljID0gZHluYW1pY3NbZF1cbiAgICAgIG91dHB1dC5idWZmZXIgKz0gc3RhdGljc1swXVxuICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHN0YXRpY3MubGVuZ3RoOyBpKyspe1xuICAgICAgICB0aGlzLmR5bmFtaWNUb0J1ZmZlcihkeW5hbWljW2kgLSAxXSwgY29tcFRlbXBsYXRlcywgb3V0cHV0KVxuICAgICAgICBvdXRwdXQuYnVmZmVyICs9IHN0YXRpY3NbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBkeW5hbWljVG9CdWZmZXIocmVuZGVyZWQsIHRlbXBsYXRlcywgb3V0cHV0KXtcbiAgICBpZih0eXBlb2YgKHJlbmRlcmVkKSA9PT0gXCJudW1iZXJcIil7XG4gICAgICBvdXRwdXQuYnVmZmVyICs9IHRoaXMucmVjdXJzaXZlQ0lEVG9TdHJpbmcob3V0cHV0LmNvbXBvbmVudHMsIHJlbmRlcmVkLCBvdXRwdXQub25seUNpZHMpXG4gICAgfSBlbHNlIGlmKGlzT2JqZWN0KHJlbmRlcmVkKSl7XG4gICAgICB0aGlzLnRvT3V0cHV0QnVmZmVyKHJlbmRlcmVkLCB0ZW1wbGF0ZXMsIG91dHB1dClcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LmJ1ZmZlciArPSByZW5kZXJlZFxuICAgIH1cbiAgfVxuXG4gIHJlY3Vyc2l2ZUNJRFRvU3RyaW5nKGNvbXBvbmVudHMsIGNpZCwgb25seUNpZHMpe1xuICAgIGxldCBjb21wb25lbnQgPSBjb21wb25lbnRzW2NpZF0gfHwgbG9nRXJyb3IoYG5vIGNvbXBvbmVudCBmb3IgQ0lEICR7Y2lkfWAsIGNvbXBvbmVudHMpXG4gICAgbGV0IHRlbXBsYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRlbXBsYXRlXCIpXG4gICAgdGVtcGxhdGUuaW5uZXJIVE1MID0gdGhpcy5yZWN1cnNpdmVUb1N0cmluZyhjb21wb25lbnQsIGNvbXBvbmVudHMsIG9ubHlDaWRzKVxuICAgIGxldCBjb250YWluZXIgPSB0ZW1wbGF0ZS5jb250ZW50XG4gICAgbGV0IHNraXAgPSBvbmx5Q2lkcyAmJiAhb25seUNpZHMuaGFzKGNpZClcblxuICAgIGxldCBbaGFzQ2hpbGROb2RlcywgaGFzQ2hpbGRDb21wb25lbnRzXSA9XG4gICAgICBBcnJheS5mcm9tKGNvbnRhaW5lci5jaGlsZE5vZGVzKS5yZWR1Y2UoKFtoYXNOb2RlcywgaGFzQ29tcG9uZW50c10sIGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmKGNoaWxkLm5vZGVUeXBlID09PSBOb2RlLkVMRU1FTlRfTk9ERSl7XG4gICAgICAgICAgaWYoY2hpbGQuZ2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQpKXtcbiAgICAgICAgICAgIHJldHVybiBbaGFzTm9kZXMsIHRydWVdXG4gICAgICAgICAgfVxuICAgICAgICAgIGNoaWxkLnNldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5ULCBjaWQpXG4gICAgICAgICAgaWYoIWNoaWxkLmlkKXsgY2hpbGQuaWQgPSBgJHt0aGlzLnBhcmVudFZpZXdJZCgpfS0ke2NpZH0tJHtpfWAgfVxuICAgICAgICAgIGlmKHNraXApe1xuICAgICAgICAgICAgY2hpbGQuc2V0QXR0cmlidXRlKFBIWF9TS0lQLCBcIlwiKVxuICAgICAgICAgICAgY2hpbGQuaW5uZXJIVE1MID0gXCJcIlxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gW3RydWUsIGhhc0NvbXBvbmVudHNdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYoY2hpbGQubm9kZVZhbHVlLnRyaW0oKSAhPT0gXCJcIil7XG4gICAgICAgICAgICBsb2dFcnJvcihcIm9ubHkgSFRNTCBlbGVtZW50IHRhZ3MgYXJlIGFsbG93ZWQgYXQgdGhlIHJvb3Qgb2YgY29tcG9uZW50cy5cXG5cXG5cIiArXG4gICAgICAgICAgICAgIGBnb3Q6IFwiJHtjaGlsZC5ub2RlVmFsdWUudHJpbSgpfVwiXFxuXFxuYCArXG4gICAgICAgICAgICAgIFwid2l0aGluOlxcblwiLCB0ZW1wbGF0ZS5pbm5lckhUTUwudHJpbSgpKVxuICAgICAgICAgICAgY2hpbGQucmVwbGFjZVdpdGgodGhpcy5jcmVhdGVTcGFuKGNoaWxkLm5vZGVWYWx1ZSwgY2lkKSlcbiAgICAgICAgICAgIHJldHVybiBbdHJ1ZSwgaGFzQ29tcG9uZW50c11cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hpbGQucmVtb3ZlKClcbiAgICAgICAgICAgIHJldHVybiBbaGFzTm9kZXMsIGhhc0NvbXBvbmVudHNdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCBbZmFsc2UsIGZhbHNlXSlcblxuICAgIGlmKCFoYXNDaGlsZE5vZGVzICYmICFoYXNDaGlsZENvbXBvbmVudHMpe1xuICAgICAgbG9nRXJyb3IoXCJleHBlY3RlZCBhdCBsZWFzdCBvbmUgSFRNTCBlbGVtZW50IHRhZyBpbnNpZGUgYSBjb21wb25lbnQsIGJ1dCB0aGUgY29tcG9uZW50IGlzIGVtcHR5OlxcblwiLFxuICAgICAgICB0ZW1wbGF0ZS5pbm5lckhUTUwudHJpbSgpKVxuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlU3BhbihcIlwiLCBjaWQpLm91dGVySFRNTFxuICAgIH0gZWxzZSBpZighaGFzQ2hpbGROb2RlcyAmJiBoYXNDaGlsZENvbXBvbmVudHMpe1xuICAgICAgbG9nRXJyb3IoXCJleHBlY3RlZCBhdCBsZWFzdCBvbmUgSFRNTCBlbGVtZW50IHRhZyBkaXJlY3RseSBpbnNpZGUgYSBjb21wb25lbnQsIGJ1dCBvbmx5IHN1YmNvbXBvbmVudHMgd2VyZSBmb3VuZC4gQSBjb21wb25lbnQgbXVzdCByZW5kZXIgYXQgbGVhc3Qgb25lIEhUTUwgdGFnIGRpcmVjdGx5IGluc2lkZSBpdHNlbGYuXCIsXG4gICAgICAgIHRlbXBsYXRlLmlubmVySFRNTC50cmltKCkpXG4gICAgICByZXR1cm4gdGVtcGxhdGUuaW5uZXJIVE1MXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZS5pbm5lckhUTUxcbiAgICB9XG4gIH1cblxuICBjcmVhdGVTcGFuKHRleHQsIGNpZCl7XG4gICAgbGV0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKVxuICAgIHNwYW4uaW5uZXJUZXh0ID0gdGV4dFxuICAgIHNwYW4uc2V0QXR0cmlidXRlKFBIWF9DT01QT05FTlQsIGNpZClcbiAgICByZXR1cm4gc3BhblxuICB9XG59XG4iLCAibGV0IHZpZXdIb29rSUQgPSAxXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3SG9vayB7XG4gIHN0YXRpYyBtYWtlSUQoKXsgcmV0dXJuIHZpZXdIb29rSUQrKyB9XG4gIHN0YXRpYyBlbGVtZW50SUQoZWwpeyByZXR1cm4gZWwucGh4SG9va0lkIH1cblxuICBjb25zdHJ1Y3Rvcih2aWV3LCBlbCwgY2FsbGJhY2tzKXtcbiAgICB0aGlzLl9fdmlldyA9IHZpZXdcbiAgICB0aGlzLl9fbGl2ZVNvY2tldCA9IHZpZXcubGl2ZVNvY2tldFxuICAgIHRoaXMuX19jYWxsYmFja3MgPSBjYWxsYmFja3NcbiAgICB0aGlzLl9fbGlzdGVuZXJzID0gbmV3IFNldCgpXG4gICAgdGhpcy5fX2lzRGlzY29ubmVjdGVkID0gZmFsc2VcbiAgICB0aGlzLmVsID0gZWxcbiAgICB0aGlzLmVsLnBoeEhvb2tJZCA9IHRoaXMuY29uc3RydWN0b3IubWFrZUlEKClcbiAgICBmb3IobGV0IGtleSBpbiB0aGlzLl9fY2FsbGJhY2tzKXsgdGhpc1trZXldID0gdGhpcy5fX2NhbGxiYWNrc1trZXldIH1cbiAgfVxuXG4gIF9fbW91bnRlZCgpeyB0aGlzLm1vdW50ZWQgJiYgdGhpcy5tb3VudGVkKCkgfVxuICBfX3VwZGF0ZWQoKXsgdGhpcy51cGRhdGVkICYmIHRoaXMudXBkYXRlZCgpIH1cbiAgX19iZWZvcmVVcGRhdGUoKXsgdGhpcy5iZWZvcmVVcGRhdGUgJiYgdGhpcy5iZWZvcmVVcGRhdGUoKSB9XG4gIF9fZGVzdHJveWVkKCl7IHRoaXMuZGVzdHJveWVkICYmIHRoaXMuZGVzdHJveWVkKCkgfVxuICBfX3JlY29ubmVjdGVkKCl7XG4gICAgaWYodGhpcy5fX2lzRGlzY29ubmVjdGVkKXtcbiAgICAgIHRoaXMuX19pc0Rpc2Nvbm5lY3RlZCA9IGZhbHNlXG4gICAgICB0aGlzLnJlY29ubmVjdGVkICYmIHRoaXMucmVjb25uZWN0ZWQoKVxuICAgIH1cbiAgfVxuICBfX2Rpc2Nvbm5lY3RlZCgpe1xuICAgIHRoaXMuX19pc0Rpc2Nvbm5lY3RlZCA9IHRydWVcbiAgICB0aGlzLmRpc2Nvbm5lY3RlZCAmJiB0aGlzLmRpc2Nvbm5lY3RlZCgpXG4gIH1cblxuICBwdXNoRXZlbnQoZXZlbnQsIHBheWxvYWQgPSB7fSwgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcucHVzaEhvb2tFdmVudChudWxsLCBldmVudCwgcGF5bG9hZCwgb25SZXBseSlcbiAgfVxuXG4gIHB1c2hFdmVudFRvKHBoeFRhcmdldCwgZXZlbnQsIHBheWxvYWQgPSB7fSwgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcud2l0aGluVGFyZ2V0cyhwaHhUYXJnZXQsICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgIHJldHVybiB2aWV3LnB1c2hIb29rRXZlbnQodGFyZ2V0Q3R4LCBldmVudCwgcGF5bG9hZCwgb25SZXBseSlcbiAgICB9KVxuICB9XG5cbiAgaGFuZGxlRXZlbnQoZXZlbnQsIGNhbGxiYWNrKXtcbiAgICBsZXQgY2FsbGJhY2tSZWYgPSAoY3VzdG9tRXZlbnQsIGJ5cGFzcykgPT4gYnlwYXNzID8gZXZlbnQgOiBjYWxsYmFjayhjdXN0b21FdmVudC5kZXRhaWwpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoYHBoeDoke2V2ZW50fWAsIGNhbGxiYWNrUmVmKVxuICAgIHRoaXMuX19saXN0ZW5lcnMuYWRkKGNhbGxiYWNrUmVmKVxuICAgIHJldHVybiBjYWxsYmFja1JlZlxuICB9XG5cbiAgcmVtb3ZlSGFuZGxlRXZlbnQoY2FsbGJhY2tSZWYpe1xuICAgIGxldCBldmVudCA9IGNhbGxiYWNrUmVmKG51bGwsIHRydWUpXG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoYHBoeDoke2V2ZW50fWAsIGNhbGxiYWNrUmVmKVxuICAgIHRoaXMuX19saXN0ZW5lcnMuZGVsZXRlKGNhbGxiYWNrUmVmKVxuICB9XG5cbiAgdXBsb2FkKG5hbWUsIGZpbGVzKXtcbiAgICByZXR1cm4gdGhpcy5fX3ZpZXcuZGlzcGF0Y2hVcGxvYWRzKG5hbWUsIGZpbGVzKVxuICB9XG5cbiAgdXBsb2FkVG8ocGh4VGFyZ2V0LCBuYW1lLCBmaWxlcyl7XG4gICAgcmV0dXJuIHRoaXMuX192aWV3LndpdGhpblRhcmdldHMocGh4VGFyZ2V0LCB2aWV3ID0+IHZpZXcuZGlzcGF0Y2hVcGxvYWRzKG5hbWUsIGZpbGVzKSlcbiAgfVxuXG4gIF9fY2xlYW51cF9fKCl7XG4gICAgdGhpcy5fX2xpc3RlbmVycy5mb3JFYWNoKGNhbGxiYWNrUmVmID0+IHRoaXMucmVtb3ZlSGFuZGxlRXZlbnQoY2FsbGJhY2tSZWYpKVxuICB9XG59XG4iLCAiaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuXG5sZXQgSlMgPSB7XG4gIGV4ZWMoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGRlZmF1bHRzKXtcbiAgICBsZXQgW2RlZmF1bHRLaW5kLCBkZWZhdWx0QXJnc10gPSBkZWZhdWx0cyB8fCBbbnVsbCwge31dXG4gICAgbGV0IGNvbW1hbmRzID0gcGh4RXZlbnQuY2hhckF0KDApID09PSBcIltcIiA/XG4gICAgICBKU09OLnBhcnNlKHBoeEV2ZW50KSA6IFtbZGVmYXVsdEtpbmQsIGRlZmF1bHRBcmdzXV1cblxuICAgIGNvbW1hbmRzLmZvckVhY2goKFtraW5kLCBhcmdzXSkgPT4ge1xuICAgICAgaWYoa2luZCA9PT0gZGVmYXVsdEtpbmQgJiYgZGVmYXVsdEFyZ3MuZGF0YSl7XG4gICAgICAgIGFyZ3MuZGF0YSA9IE9iamVjdC5hc3NpZ24oYXJncy5kYXRhIHx8IHt9LCBkZWZhdWx0QXJncy5kYXRhKVxuICAgICAgfVxuICAgICAgdGhpcy5maWx0ZXJUb0Vscyhzb3VyY2VFbCwgYXJncykuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgIHRoaXNbYGV4ZWNfJHtraW5kfWBdKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwgYXJncylcbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcblxuICBpc1Zpc2libGUoZWwpe1xuICAgIHJldHVybiAhIShlbC5vZmZzZXRXaWR0aCB8fCBlbC5vZmZzZXRIZWlnaHQgfHwgZWwuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGggPiAwKVxuICB9LFxuXG4gIC8vIHByaXZhdGVcblxuICAvLyBjb21tYW5kc1xuXG4gIGV4ZWNfZGlzcGF0Y2goZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7dG8sIGV2ZW50LCBkZXRhaWx9KXtcbiAgICBET00uZGlzcGF0Y2hFdmVudChlbCwgZXZlbnQsIGRldGFpbClcbiAgfSxcblxuICBleGVjX3B1c2goZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCBhcmdzKXtcbiAgICBsZXQge2V2ZW50LCBkYXRhLCB0YXJnZXQsIHBhZ2VfbG9hZGluZywgbG9hZGluZywgdmFsdWV9ID0gYXJnc1xuICAgIGxldCBwdXNoT3B0cyA9IHtsb2FkaW5nLCB2YWx1ZSwgdGFyZ2V0LCBwYWdlX2xvYWRpbmc6ICEhcGFnZV9sb2FkaW5nfVxuICAgIGxldCB0YXJnZXRTcmMgPSBldmVudFR5cGUgPT09IFwiY2hhbmdlXCIgPyBzb3VyY2VFbC5mb3JtIDogc291cmNlRWxcbiAgICBsZXQgcGh4VGFyZ2V0ID0gdGFyZ2V0IHx8IHRhcmdldFNyYy5nZXRBdHRyaWJ1dGUodmlldy5iaW5kaW5nKFwidGFyZ2V0XCIpKSB8fCB0YXJnZXRTcmNcbiAgICB2aWV3LndpdGhpblRhcmdldHMocGh4VGFyZ2V0LCAodGFyZ2V0VmlldywgdGFyZ2V0Q3R4KSA9PiB7XG4gICAgICBpZihldmVudFR5cGUgPT09IFwiY2hhbmdlXCIpe1xuICAgICAgICBsZXQge25ld0NpZCwgX3RhcmdldCwgY2FsbGJhY2t9ID0gYXJnc1xuICAgICAgICBpZihfdGFyZ2V0KXsgcHVzaE9wdHMuX3RhcmdldCA9IF90YXJnZXQgfVxuICAgICAgICB0YXJnZXRWaWV3LnB1c2hJbnB1dChzb3VyY2VFbCwgdGFyZ2V0Q3R4LCBuZXdDaWQsIGV2ZW50IHx8IHBoeEV2ZW50LCBwdXNoT3B0cywgY2FsbGJhY2spXG4gICAgICB9IGVsc2UgaWYoZXZlbnRUeXBlID09PSBcInN1Ym1pdFwiKXtcbiAgICAgICAgdGFyZ2V0Vmlldy5zdWJtaXRGb3JtKHNvdXJjZUVsLCB0YXJnZXRDdHgsIGV2ZW50IHx8IHBoeEV2ZW50LCBwdXNoT3B0cylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFZpZXcucHVzaEV2ZW50KGV2ZW50VHlwZSwgc291cmNlRWwsIHRhcmdldEN0eCwgZXZlbnQgfHwgcGh4RXZlbnQsIGRhdGEsIHB1c2hPcHRzKVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgZXhlY19hZGRfY2xhc3MoZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7bmFtZXMsIHRyYW5zaXRpb24sIHRpbWV9KXtcbiAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgbmFtZXMsIFtdLCB0cmFuc2l0aW9uLCB0aW1lLCB2aWV3KVxuICB9LFxuXG4gIGV4ZWNfcmVtb3ZlX2NsYXNzKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge25hbWVzLCB0cmFuc2l0aW9uLCB0aW1lfSl7XG4gICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBuYW1lcywgdHJhbnNpdGlvbiwgdGltZSwgdmlldylcbiAgfSxcblxuICBleGVjX3RyYW5zaXRpb24oZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7dGltZSwgdHJhbnNpdGlvbn0pe1xuICAgIGxldCBbdHJhbnNpdGlvbl9zdGFydCwgcnVubmluZywgdHJhbnNpdGlvbl9lbmRdID0gdHJhbnNpdGlvblxuICAgIGxldCBvblN0YXJ0ID0gKCkgPT4gdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIHRyYW5zaXRpb25fc3RhcnQuY29uY2F0KHJ1bm5pbmcpLCBbXSlcbiAgICBsZXQgb25Eb25lID0gKCkgPT4gdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIHRyYW5zaXRpb25fZW5kLCB0cmFuc2l0aW9uX3N0YXJ0LmNvbmNhdChydW5uaW5nKSlcbiAgICB2aWV3LnRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lKVxuICB9LFxuXG4gIGV4ZWNfdG9nZ2xlKGV2ZW50VHlwZSwgcGh4RXZlbnQsIHZpZXcsIHNvdXJjZUVsLCBlbCwge2Rpc3BsYXksIGlucywgb3V0cywgdGltZX0pe1xuICAgIHRoaXMudG9nZ2xlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIGlucywgb3V0cywgdGltZSlcbiAgfSxcblxuICBleGVjX3Nob3coZXZlbnRUeXBlLCBwaHhFdmVudCwgdmlldywgc291cmNlRWwsIGVsLCB7ZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZX0pe1xuICAgIHRoaXMuc2hvdyhldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lKVxuICB9LFxuXG4gIGV4ZWNfaGlkZShldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHtkaXNwbGF5LCB0cmFuc2l0aW9uLCB0aW1lfSl7XG4gICAgdGhpcy5oaWRlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIHRyYW5zaXRpb24sIHRpbWUpXG4gIH0sXG5cbiAgZXhlY19zZXRfYXR0cihldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHthdHRyOiBbYXR0ciwgdmFsXX0pe1xuICAgIHRoaXMuc2V0T3JSZW1vdmVBdHRycyhlbCwgW1thdHRyLCB2YWxdXSwgW10pXG4gIH0sXG5cbiAgZXhlY19yZW1vdmVfYXR0cihldmVudFR5cGUsIHBoeEV2ZW50LCB2aWV3LCBzb3VyY2VFbCwgZWwsIHthdHRyfSl7XG4gICAgdGhpcy5zZXRPclJlbW92ZUF0dHJzKGVsLCBbXSwgW2F0dHJdKVxuICB9LFxuXG4gIC8vIHV0aWxzIGZvciBjb21tYW5kc1xuXG4gIHNob3coZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgdHJhbnNpdGlvbiwgdGltZSl7XG4gICAgaWYoIXRoaXMuaXNWaXNpYmxlKGVsKSl7XG4gICAgICB0aGlzLnRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCB0cmFuc2l0aW9uLCBudWxsLCB0aW1lKVxuICAgIH1cbiAgfSxcblxuICBoaWRlKGV2ZW50VHlwZSwgdmlldywgZWwsIGRpc3BsYXksIHRyYW5zaXRpb24sIHRpbWUpe1xuICAgIGlmKHRoaXMuaXNWaXNpYmxlKGVsKSl7XG4gICAgICB0aGlzLnRvZ2dsZShldmVudFR5cGUsIHZpZXcsIGVsLCBkaXNwbGF5LCBudWxsLCB0cmFuc2l0aW9uLCB0aW1lKVxuICAgIH1cbiAgfSxcblxuICB0b2dnbGUoZXZlbnRUeXBlLCB2aWV3LCBlbCwgZGlzcGxheSwgaW5zLCBvdXRzLCB0aW1lKXtcbiAgICBsZXQgW2luQ2xhc3NlcywgaW5TdGFydENsYXNzZXMsIGluRW5kQ2xhc3Nlc10gPSBpbnMgfHwgW1tdLCBbXSwgW11dXG4gICAgbGV0IFtvdXRDbGFzc2VzLCBvdXRTdGFydENsYXNzZXMsIG91dEVuZENsYXNzZXNdID0gb3V0cyB8fCBbW10sIFtdLCBbXV1cbiAgICBpZihpbkNsYXNzZXMubGVuZ3RoID4gMCB8fCBvdXRDbGFzc2VzLmxlbmd0aCA+IDApe1xuICAgICAgaWYodGhpcy5pc1Zpc2libGUoZWwpKXtcbiAgICAgICAgbGV0IG9uU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIG91dFN0YXJ0Q2xhc3NlcywgaW5DbGFzc2VzLmNvbmNhdChpblN0YXJ0Q2xhc3NlcykuY29uY2F0KGluRW5kQ2xhc3NlcykpXG4gICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgb3V0Q2xhc3NlcywgW10pXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBvdXRFbmRDbGFzc2VzLCBvdXRTdGFydENsYXNzZXMpKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6aGlkZS1zdGFydFwiKSlcbiAgICAgICAgdmlldy50cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsICgpID0+IHtcbiAgICAgICAgICB0aGlzLmFkZE9yUmVtb3ZlQ2xhc3NlcyhlbCwgW10sIG91dENsYXNzZXMuY29uY2F0KG91dEVuZENsYXNzZXMpKVxuICAgICAgICAgIERPTS5wdXRTdGlja3koZWwsIFwidG9nZ2xlXCIsIGN1cnJlbnRFbCA9PiBjdXJyZW50RWwuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiKVxuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtZW5kXCIpKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYoZXZlbnRUeXBlID09PSBcInJlbW92ZVwiKXsgcmV0dXJuIH1cbiAgICAgICAgbGV0IG9uU3RhcnQgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIGluU3RhcnRDbGFzc2VzLCBvdXRDbGFzc2VzLmNvbmNhdChvdXRTdGFydENsYXNzZXMpLmNvbmNhdChvdXRFbmRDbGFzc2VzKSlcbiAgICAgICAgICBET00ucHV0U3RpY2t5KGVsLCBcInRvZ2dsZVwiLCBjdXJyZW50RWwgPT4gY3VycmVudEVsLnN0eWxlLmRpc3BsYXkgPSAoZGlzcGxheSB8fCBcImJsb2NrXCIpKVxuICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIGluQ2xhc3NlcywgW10pXG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBpbkVuZENsYXNzZXMsIGluU3RhcnRDbGFzc2VzKSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OnNob3ctc3RhcnRcIikpXG4gICAgICAgIHZpZXcudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5hZGRPclJlbW92ZUNsYXNzZXMoZWwsIFtdLCBpbkNsYXNzZXMuY29uY2F0KGluRW5kQ2xhc3NlcykpXG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6c2hvdy1lbmRcIikpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKHRoaXMuaXNWaXNpYmxlKGVsKSl7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OmhpZGUtc3RhcnRcIikpXG4gICAgICAgICAgRE9NLnB1dFN0aWNreShlbCwgXCJ0b2dnbGVcIiwgY3VycmVudEVsID0+IGN1cnJlbnRFbC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCIpXG4gICAgICAgICAgZWwuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJwaHg6aGlkZS1lbmRcIikpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBlbC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInBoeDpzaG93LXN0YXJ0XCIpKVxuICAgICAgICAgIERPTS5wdXRTdGlja3koZWwsIFwidG9nZ2xlXCIsIGN1cnJlbnRFbCA9PiBjdXJyZW50RWwuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXkgfHwgXCJibG9ja1wiKVxuICAgICAgICAgIGVsLmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwicGh4OnNob3ctZW5kXCIpKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBhZGRPclJlbW92ZUNsYXNzZXMoZWwsIGFkZHMsIHJlbW92ZXMsIHRyYW5zaXRpb24sIHRpbWUsIHZpZXcpe1xuICAgIGxldCBbdHJhbnNpdGlvbl9ydW4sIHRyYW5zaXRpb25fc3RhcnQsIHRyYW5zaXRpb25fZW5kXSA9IHRyYW5zaXRpb24gfHwgW1tdLCBbXSwgW11dXG4gICAgaWYodHJhbnNpdGlvbl9ydW4ubGVuZ3RoID4gMCl7XG4gICAgICBsZXQgb25TdGFydCA9ICgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCB0cmFuc2l0aW9uX3N0YXJ0LmNvbmNhdCh0cmFuc2l0aW9uX3J1biksIFtdKVxuICAgICAgbGV0IG9uRG9uZSA9ICgpID0+IHRoaXMuYWRkT3JSZW1vdmVDbGFzc2VzKGVsLCBhZGRzLmNvbmNhdCh0cmFuc2l0aW9uX2VuZCksIHJlbW92ZXMuY29uY2F0KHRyYW5zaXRpb25fcnVuKS5jb25jYXQodHJhbnNpdGlvbl9zdGFydCkpXG4gICAgICByZXR1cm4gdmlldy50cmFuc2l0aW9uKHRpbWUsIG9uU3RhcnQsIG9uRG9uZSlcbiAgICB9XG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBsZXQgW3ByZXZBZGRzLCBwcmV2UmVtb3Zlc10gPSBET00uZ2V0U3RpY2t5KGVsLCBcImNsYXNzZXNcIiwgW1tdLCBbXV0pXG4gICAgICBsZXQga2VlcEFkZHMgPSBhZGRzLmZpbHRlcihuYW1lID0+IHByZXZBZGRzLmluZGV4T2YobmFtZSkgPCAwICYmICFlbC5jbGFzc0xpc3QuY29udGFpbnMobmFtZSkpXG4gICAgICBsZXQga2VlcFJlbW92ZXMgPSByZW1vdmVzLmZpbHRlcihuYW1lID0+IHByZXZSZW1vdmVzLmluZGV4T2YobmFtZSkgPCAwICYmIGVsLmNsYXNzTGlzdC5jb250YWlucyhuYW1lKSlcbiAgICAgIGxldCBuZXdBZGRzID0gcHJldkFkZHMuZmlsdGVyKG5hbWUgPT4gcmVtb3Zlcy5pbmRleE9mKG5hbWUpIDwgMCkuY29uY2F0KGtlZXBBZGRzKVxuICAgICAgbGV0IG5ld1JlbW92ZXMgPSBwcmV2UmVtb3Zlcy5maWx0ZXIobmFtZSA9PiBhZGRzLmluZGV4T2YobmFtZSkgPCAwKS5jb25jYXQoa2VlcFJlbW92ZXMpXG5cbiAgICAgIERPTS5wdXRTdGlja3koZWwsIFwiY2xhc3Nlc1wiLCBjdXJyZW50RWwgPT4ge1xuICAgICAgICBjdXJyZW50RWwuY2xhc3NMaXN0LnJlbW92ZSguLi5uZXdSZW1vdmVzKVxuICAgICAgICBjdXJyZW50RWwuY2xhc3NMaXN0LmFkZCguLi5uZXdBZGRzKVxuICAgICAgICByZXR1cm4gW25ld0FkZHMsIG5ld1JlbW92ZXNdXG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG5cbiAgc2V0T3JSZW1vdmVBdHRycyhlbCwgc2V0cywgcmVtb3Zlcyl7XG4gICAgbGV0IFtwcmV2U2V0cywgcHJldlJlbW92ZXNdID0gRE9NLmdldFN0aWNreShlbCwgXCJhdHRyc1wiLCBbW10sIFtdXSlcbiAgICBsZXQga2VlcFNldHMgPSBzZXRzLmZpbHRlcigoW2F0dHIsIF92YWxdKSA9PiAhdGhpcy5oYXNTZXQocHJldlNldHMsIGF0dHIpICYmICFlbC5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbShhdHRyKSlcbiAgICBsZXQga2VlcFJlbW92ZXMgPSByZW1vdmVzLmZpbHRlcihhdHRyID0+IHByZXZSZW1vdmVzLmluZGV4T2YoYXR0cikgPCAwICYmIGVsLmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKGF0dHIpKVxuICAgIGxldCBuZXdTZXRzID0gcHJldlNldHMuZmlsdGVyKChbYXR0ciwgX3ZhbF0pID0+IHJlbW92ZXMuaW5kZXhPZihhdHRyKSA8IDApLmNvbmNhdChrZWVwU2V0cylcbiAgICBsZXQgbmV3UmVtb3ZlcyA9IHByZXZSZW1vdmVzLmZpbHRlcihhdHRyID0+ICF0aGlzLmhhc1NldChzZXRzLCBhdHRyKSkuY29uY2F0KGtlZXBSZW1vdmVzKVxuXG4gICAgRE9NLnB1dFN0aWNreShlbCwgXCJhdHRyc1wiLCBjdXJyZW50RWwgPT4ge1xuICAgICAgbmV3UmVtb3Zlcy5mb3JFYWNoKGF0dHIgPT4gY3VycmVudEVsLnJlbW92ZUF0dHJpYnV0ZShhdHRyKSlcbiAgICAgIG5ld1NldHMuZm9yRWFjaCgoW2F0dHIsIHZhbF0pID0+IGN1cnJlbnRFbC5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsKSlcbiAgICAgIHJldHVybiBbbmV3U2V0cywgbmV3UmVtb3Zlc11cbiAgICB9KVxuICB9LFxuXG4gIGhhc1NldChzZXRzLCBuYW1lU2VhcmNoKXsgcmV0dXJuIHNldHMuZmluZCgoW25hbWUsIHZhbF0pID0+IG5hbWUgPT09IG5hbWVTZWFyY2gpIH0sXG5cbiAgaGFzQWxsQ2xhc3NlcyhlbCwgY2xhc3Nlcyl7IHJldHVybiBjbGFzc2VzLmV2ZXJ5KG5hbWUgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKG5hbWUpKSB9LFxuXG4gIGlzVG9nZ2xlZE91dChlbCwgb3V0Q2xhc3Nlcyl7XG4gICAgcmV0dXJuICF0aGlzLmlzVmlzaWJsZShlbCkgfHwgdGhpcy5oYXNBbGxDbGFzc2VzKGVsLCBvdXRDbGFzc2VzKVxuICB9LFxuXG4gIGZpbHRlclRvRWxzKHNvdXJjZUVsLCB7dG99KXtcbiAgICByZXR1cm4gdG8gPyBET00uYWxsKGRvY3VtZW50LCB0bykgOiBbc291cmNlRWxdXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSlNcbiIsICJpbXBvcnQge1xuICBCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VULFxuICBDSEVDS0FCTEVfSU5QVVRTLFxuICBDT05TRUNVVElWRV9SRUxPQURTLFxuICBQSFhfQVVUT19SRUNPVkVSLFxuICBQSFhfQ09NUE9ORU5ULFxuICBQSFhfQ09OTkVDVEVEX0NMQVNTLFxuICBQSFhfRElTQUJMRV9XSVRILFxuICBQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUsXG4gIFBIWF9ESVNBQkxFRCxcbiAgUEhYX0RJU0NPTk5FQ1RFRF9DTEFTUyxcbiAgUEhYX0VWRU5UX0NMQVNTRVMsXG4gIFBIWF9FUlJPUl9DTEFTUyxcbiAgUEhYX0ZFRURCQUNLX0ZPUixcbiAgUEhYX0hBU19TVUJNSVRURUQsXG4gIFBIWF9IT09LLFxuICBQSFhfUEFHRV9MT0FESU5HLFxuICBQSFhfUEFSRU5UX0lELFxuICBQSFhfUFJPR1JFU1MsXG4gIFBIWF9SRUFET05MWSxcbiAgUEhYX1JFRixcbiAgUEhYX1JFRl9TUkMsXG4gIFBIWF9ST09UX0lELFxuICBQSFhfU0VTU0lPTixcbiAgUEhYX1NUQVRJQyxcbiAgUEhYX1RSQUNLX1NUQVRJQyxcbiAgUEhYX1RSQUNLX1VQTE9BRFMsXG4gIFBIWF9VUERBVEUsXG4gIFBIWF9VUExPQURfUkVGLFxuICBQSFhfVklFV19TRUxFQ1RPUixcbiAgUFVTSF9USU1FT1VULFxuICBQSFhfTUFJTixcbn0gZnJvbSBcIi4vY29uc3RhbnRzXCJcblxuaW1wb3J0IHtcbiAgY2xvbmUsXG4gIGNsb3Nlc3RQaHhCaW5kaW5nLFxuICBpc0VtcHR5LFxuICBpc0VxdWFsT2JqLFxuICBsb2dFcnJvcixcbiAgbWF5YmUsXG4gIGlzQ2lkLFxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBCcm93c2VyIGZyb20gXCIuL2Jyb3dzZXJcIlxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IERPTVBhdGNoIGZyb20gXCIuL2RvbV9wYXRjaFwiXG5pbXBvcnQgTGl2ZVVwbG9hZGVyIGZyb20gXCIuL2xpdmVfdXBsb2FkZXJcIlxuaW1wb3J0IFJlbmRlcmVkIGZyb20gXCIuL3JlbmRlcmVkXCJcbmltcG9ydCBWaWV3SG9vayBmcm9tIFwiLi92aWV3X2hvb2tcIlxuaW1wb3J0IEpTIGZyb20gXCIuL2pzXCJcblxubGV0IHNlcmlhbGl6ZUZvcm0gPSAoZm9ybSwgbWV0YSA9IHt9KSA9PiB7XG4gIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YShmb3JtKVxuICBsZXQgdG9SZW1vdmUgPSBbXVxuXG4gIGZvcm1EYXRhLmZvckVhY2goKHZhbCwga2V5LCBfaW5kZXgpID0+IHtcbiAgICBpZih2YWwgaW5zdGFuY2VvZiBGaWxlKXsgdG9SZW1vdmUucHVzaChrZXkpIH1cbiAgfSlcblxuICAvLyBDbGVhbnVwIGFmdGVyIGJ1aWxkaW5nIGZpbGVEYXRhXG4gIHRvUmVtb3ZlLmZvckVhY2goa2V5ID0+IGZvcm1EYXRhLmRlbGV0ZShrZXkpKVxuXG4gIGxldCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKClcbiAgZm9yKGxldCBba2V5LCB2YWxdIG9mIGZvcm1EYXRhLmVudHJpZXMoKSl7IHBhcmFtcy5hcHBlbmQoa2V5LCB2YWwpIH1cbiAgZm9yKGxldCBtZXRhS2V5IGluIG1ldGEpeyBwYXJhbXMuYXBwZW5kKG1ldGFLZXksIG1ldGFbbWV0YUtleV0pIH1cblxuICByZXR1cm4gcGFyYW1zLnRvU3RyaW5nKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlldyB7XG4gIGNvbnN0cnVjdG9yKGVsLCBsaXZlU29ja2V0LCBwYXJlbnRWaWV3LCBmbGFzaCl7XG4gICAgdGhpcy5saXZlU29ja2V0ID0gbGl2ZVNvY2tldFxuICAgIHRoaXMuZmxhc2ggPSBmbGFzaFxuICAgIHRoaXMucGFyZW50ID0gcGFyZW50Vmlld1xuICAgIHRoaXMucm9vdCA9IHBhcmVudFZpZXcgPyBwYXJlbnRWaWV3LnJvb3QgOiB0aGlzXG4gICAgdGhpcy5lbCA9IGVsXG4gICAgdGhpcy5pZCA9IHRoaXMuZWwuaWRcbiAgICB0aGlzLnJlZiA9IDBcbiAgICB0aGlzLmNoaWxkSm9pbnMgPSAwXG4gICAgdGhpcy5sb2FkZXJUaW1lciA9IG51bGxcbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gICAgdGhpcy5wcnVuaW5nQ0lEcyA9IFtdXG4gICAgdGhpcy5yZWRpcmVjdCA9IGZhbHNlXG4gICAgdGhpcy5ocmVmID0gbnVsbFxuICAgIHRoaXMuam9pbkNvdW50ID0gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5qb2luQ291bnQgLSAxIDogMFxuICAgIHRoaXMuam9pblBlbmRpbmcgPSB0cnVlXG4gICAgdGhpcy5kZXN0cm95ZWQgPSBmYWxzZVxuICAgIHRoaXMuam9pbkNhbGxiYWNrID0gZnVuY3Rpb24ob25Eb25lKXsgb25Eb25lICYmIG9uRG9uZSgpIH1cbiAgICB0aGlzLnN0b3BDYWxsYmFjayA9IGZ1bmN0aW9uKCl7IH1cbiAgICB0aGlzLnBlbmRpbmdKb2luT3BzID0gdGhpcy5wYXJlbnQgPyBudWxsIDogW11cbiAgICB0aGlzLnZpZXdIb29rcyA9IHt9XG4gICAgdGhpcy51cGxvYWRlcnMgPSB7fVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSBbXVxuICAgIHRoaXMuY2hpbGRyZW4gPSB0aGlzLnBhcmVudCA/IG51bGwgOiB7fVxuICAgIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXSA9IHt9XG4gICAgdGhpcy5jaGFubmVsID0gdGhpcy5saXZlU29ja2V0LmNoYW5uZWwoYGx2OiR7dGhpcy5pZH1gLCAoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZWRpcmVjdDogdGhpcy5yZWRpcmVjdCA/IHRoaXMuaHJlZiA6IHVuZGVmaW5lZCxcbiAgICAgICAgdXJsOiB0aGlzLnJlZGlyZWN0ID8gdW5kZWZpbmVkIDogdGhpcy5ocmVmIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgcGFyYW1zOiB0aGlzLmNvbm5lY3RQYXJhbXMoKSxcbiAgICAgICAgc2Vzc2lvbjogdGhpcy5nZXRTZXNzaW9uKCksXG4gICAgICAgIHN0YXRpYzogdGhpcy5nZXRTdGF0aWMoKSxcbiAgICAgICAgZmxhc2g6IHRoaXMuZmxhc2hcbiAgICAgIH1cbiAgICB9KVxuICAgIHRoaXMuc2hvd0xvYWRlcih0aGlzLmxpdmVTb2NrZXQubG9hZGVyVGltZW91dClcbiAgICB0aGlzLmJpbmRDaGFubmVsKClcbiAgfVxuXG4gIHNldEhyZWYoaHJlZil7IHRoaXMuaHJlZiA9IGhyZWYgfVxuXG4gIHNldFJlZGlyZWN0KGhyZWYpe1xuICAgIHRoaXMucmVkaXJlY3QgPSB0cnVlXG4gICAgdGhpcy5ocmVmID0gaHJlZlxuICB9XG5cbiAgaXNNYWluKCl7IHJldHVybiB0aGlzLmVsLmdldEF0dHJpYnV0ZShQSFhfTUFJTikgIT09IG51bGwgfVxuXG4gIGNvbm5lY3RQYXJhbXMoKXtcbiAgICBsZXQgcGFyYW1zID0gdGhpcy5saXZlU29ja2V0LnBhcmFtcyh0aGlzLmVsKVxuICAgIGxldCBtYW5pZmVzdCA9XG4gICAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7dGhpcy5iaW5kaW5nKFBIWF9UUkFDS19TVEFUSUMpfV1gKVxuICAgICAgICAubWFwKG5vZGUgPT4gbm9kZS5zcmMgfHwgbm9kZS5ocmVmKS5maWx0ZXIodXJsID0+IHR5cGVvZiAodXJsKSA9PT0gXCJzdHJpbmdcIilcblxuICAgIGlmKG1hbmlmZXN0Lmxlbmd0aCA+IDApeyBwYXJhbXNbXCJfdHJhY2tfc3RhdGljXCJdID0gbWFuaWZlc3QgfVxuICAgIHBhcmFtc1tcIl9tb3VudHNcIl0gPSB0aGlzLmpvaW5Db3VudFxuXG4gICAgcmV0dXJuIHBhcmFtc1xuICB9XG5cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuY2hhbm5lbC5jYW5QdXNoKCkgfVxuXG4gIGdldFNlc3Npb24oKXsgcmV0dXJuIHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKSB9XG5cbiAgZ2V0U3RhdGljKCl7XG4gICAgbGV0IHZhbCA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKFBIWF9TVEFUSUMpXG4gICAgcmV0dXJuIHZhbCA9PT0gXCJcIiA/IG51bGwgOiB2YWxcbiAgfVxuXG4gIGRlc3Ryb3koY2FsbGJhY2sgPSBmdW5jdGlvbiAoKXsgfSl7XG4gICAgdGhpcy5kZXN0cm95QWxsQ2hpbGRyZW4oKVxuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZVxuICAgIGRlbGV0ZSB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF1cbiAgICBpZih0aGlzLnBhcmVudCl7IGRlbGV0ZSB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5wYXJlbnQuaWRdW3RoaXMuaWRdIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy5sb2FkZXJUaW1lcilcbiAgICBsZXQgb25GaW5pc2hlZCA9ICgpID0+IHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3Mpe1xuICAgICAgICB0aGlzLmRlc3Ryb3lIb29rKHRoaXMudmlld0hvb2tzW2lkXSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBET00ubWFya1BoeENoaWxkRGVzdHJveWVkKHRoaXMuZWwpXG5cbiAgICB0aGlzLmxvZyhcImRlc3Ryb3llZFwiLCAoKSA9PiBbXCJ0aGUgY2hpbGQgaGFzIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBwYXJlbnRcIl0pXG4gICAgdGhpcy5jaGFubmVsLmxlYXZlKClcbiAgICAgIC5yZWNlaXZlKFwib2tcIiwgb25GaW5pc2hlZClcbiAgICAgIC5yZWNlaXZlKFwiZXJyb3JcIiwgb25GaW5pc2hlZClcbiAgICAgIC5yZWNlaXZlKFwidGltZW91dFwiLCBvbkZpbmlzaGVkKVxuICB9XG5cbiAgc2V0Q29udGFpbmVyQ2xhc3NlcyguLi5jbGFzc2VzKXtcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICBQSFhfQ09OTkVDVEVEX0NMQVNTLFxuICAgICAgUEhYX0RJU0NPTk5FQ1RFRF9DTEFTUyxcbiAgICAgIFBIWF9FUlJPUl9DTEFTU1xuICAgIClcbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NlcylcbiAgfVxuXG4gIHNob3dMb2FkZXIodGltZW91dCl7XG4gICAgY2xlYXJUaW1lb3V0KHRoaXMubG9hZGVyVGltZXIpXG4gICAgaWYodGltZW91dCl7XG4gICAgICB0aGlzLmxvYWRlclRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB0aGlzLnNob3dMb2FkZXIoKSwgdGltZW91dClcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yKGxldCBpZCBpbiB0aGlzLnZpZXdIb29rcyl7IHRoaXMudmlld0hvb2tzW2lkXS5fX2Rpc2Nvbm5lY3RlZCgpIH1cbiAgICAgIHRoaXMuc2V0Q29udGFpbmVyQ2xhc3NlcyhQSFhfRElTQ09OTkVDVEVEX0NMQVNTKVxuICAgIH1cbiAgfVxuXG4gIGhpZGVMb2FkZXIoKXtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5sb2FkZXJUaW1lcilcbiAgICB0aGlzLnNldENvbnRhaW5lckNsYXNzZXMoUEhYX0NPTk5FQ1RFRF9DTEFTUylcbiAgfVxuXG4gIHRyaWdnZXJSZWNvbm5lY3RlZCgpe1xuICAgIGZvcihsZXQgaWQgaW4gdGhpcy52aWV3SG9va3MpeyB0aGlzLnZpZXdIb29rc1tpZF0uX19yZWNvbm5lY3RlZCgpIH1cbiAgfVxuXG4gIGxvZyhraW5kLCBtc2dDYWxsYmFjayl7XG4gICAgdGhpcy5saXZlU29ja2V0LmxvZyh0aGlzLCBraW5kLCBtc2dDYWxsYmFjaylcbiAgfVxuXG4gIHRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lID0gZnVuY3Rpb24oKXt9KXtcbiAgICB0aGlzLmxpdmVTb2NrZXQudHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gIH1cblxuICB3aXRoaW5UYXJnZXRzKHBoeFRhcmdldCwgY2FsbGJhY2spe1xuICAgIGlmKHBoeFRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50IHx8IHBoeFRhcmdldCBpbnN0YW5jZW9mIFNWR0VsZW1lbnQpe1xuICAgICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5vd25lcihwaHhUYXJnZXQsIHZpZXcgPT4gY2FsbGJhY2sodmlldywgcGh4VGFyZ2V0KSlcbiAgICB9XG5cbiAgICBpZihpc0NpZChwaHhUYXJnZXQpKXtcbiAgICAgIGxldCB0YXJnZXRzID0gRE9NLmZpbmRDb21wb25lbnROb2RlTGlzdCh0aGlzLmVsLCBwaHhUYXJnZXQpXG4gICAgICBpZih0YXJnZXRzLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIGxvZ0Vycm9yKGBubyBjb21wb25lbnQgZm91bmQgbWF0Y2hpbmcgcGh4LXRhcmdldCBvZiAke3BoeFRhcmdldH1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sodGhpcywgcGFyc2VJbnQocGh4VGFyZ2V0KSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRhcmdldHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGh4VGFyZ2V0KSlcbiAgICAgIGlmKHRhcmdldHMubGVuZ3RoID09PSAwKXsgbG9nRXJyb3IoYG5vdGhpbmcgZm91bmQgbWF0Y2hpbmcgdGhlIHBoeC10YXJnZXQgc2VsZWN0b3IgXCIke3BoeFRhcmdldH1cImApIH1cbiAgICAgIHRhcmdldHMuZm9yRWFjaCh0YXJnZXQgPT4gdGhpcy5saXZlU29ja2V0Lm93bmVyKHRhcmdldCwgdmlldyA9PiBjYWxsYmFjayh2aWV3LCB0YXJnZXQpKSlcbiAgICB9XG4gIH1cblxuICBhcHBseURpZmYodHlwZSwgcmF3RGlmZiwgY2FsbGJhY2spe1xuICAgIHRoaXMubG9nKHR5cGUsICgpID0+IFtcIlwiLCBjbG9uZShyYXdEaWZmKV0pXG4gICAgbGV0IHtkaWZmLCByZXBseSwgZXZlbnRzLCB0aXRsZX0gPSBSZW5kZXJlZC5leHRyYWN0KHJhd0RpZmYpXG4gICAgaWYodGl0bGUpeyBET00ucHV0VGl0bGUodGl0bGUpIH1cblxuICAgIGNhbGxiYWNrKHtkaWZmLCByZXBseSwgZXZlbnRzfSlcbiAgICByZXR1cm4gcmVwbHlcbiAgfVxuXG4gIG9uSm9pbihyZXNwKXtcbiAgICBsZXQge3JlbmRlcmVkLCBjb250YWluZXJ9ID0gcmVzcFxuICAgIGlmKGNvbnRhaW5lcil7XG4gICAgICBsZXQgW3RhZywgYXR0cnNdID0gY29udGFpbmVyXG4gICAgICB0aGlzLmVsID0gRE9NLnJlcGxhY2VSb290Q29udGFpbmVyKHRoaXMuZWwsIHRhZywgYXR0cnMpXG4gICAgfVxuICAgIHRoaXMuY2hpbGRKb2lucyA9IDBcbiAgICB0aGlzLmpvaW5QZW5kaW5nID0gdHJ1ZVxuICAgIHRoaXMuZmxhc2ggPSBudWxsXG5cbiAgICBCcm93c2VyLmRyb3BMb2NhbCh0aGlzLmxpdmVTb2NrZXQubG9jYWxTdG9yYWdlLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsIENPTlNFQ1VUSVZFX1JFTE9BRFMpXG4gICAgdGhpcy5hcHBseURpZmYoXCJtb3VudFwiLCByZW5kZXJlZCwgKHtkaWZmLCBldmVudHN9KSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVkID0gbmV3IFJlbmRlcmVkKHRoaXMuaWQsIGRpZmYpXG4gICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVyQ29udGFpbmVyKG51bGwsIFwiam9pblwiKVxuICAgICAgdGhpcy5kcm9wUGVuZGluZ1JlZnMoKVxuICAgICAgbGV0IGZvcm1zID0gdGhpcy5mb3Jtc0ZvclJlY292ZXJ5KGh0bWwpXG4gICAgICB0aGlzLmpvaW5Db3VudCsrXG5cbiAgICAgIGlmKGZvcm1zLmxlbmd0aCA+IDApe1xuICAgICAgICBmb3Jtcy5mb3JFYWNoKChbZm9ybSwgbmV3Rm9ybSwgbmV3Q2lkXSwgaSkgPT4ge1xuICAgICAgICAgIHRoaXMucHVzaEZvcm1SZWNvdmVyeShmb3JtLCBuZXdDaWQsIHJlc3AgPT4ge1xuICAgICAgICAgICAgaWYoaSA9PT0gZm9ybXMubGVuZ3RoIC0gMSl7XG4gICAgICAgICAgICAgIHRoaXMub25Kb2luQ29tcGxldGUocmVzcCwgaHRtbCwgZXZlbnRzKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uSm9pbkNvbXBsZXRlKHJlc3AsIGh0bWwsIGV2ZW50cylcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZHJvcFBlbmRpbmdSZWZzKCl7XG4gICAgRE9NLmFsbChkb2N1bWVudCwgYFske1BIWF9SRUZfU1JDfT1cIiR7dGhpcy5pZH1cIl1bJHtQSFhfUkVGfV1gLCBlbCA9PiB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFRilcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGX1NSQylcbiAgICB9KVxuICB9XG5cbiAgb25Kb2luQ29tcGxldGUoe2xpdmVfcGF0Y2h9LCBodG1sLCBldmVudHMpe1xuICAgIC8vIEluIG9yZGVyIHRvIHByb3ZpZGUgYSBiZXR0ZXIgZXhwZXJpZW5jZSwgd2Ugd2FudCB0byBqb2luXG4gICAgLy8gYWxsIExpdmVWaWV3cyBmaXJzdCBhbmQgb25seSB0aGVuIGFwcGx5IHRoZWlyIHBhdGNoZXMuXG4gICAgaWYodGhpcy5qb2luQ291bnQgPiAxIHx8ICh0aGlzLnBhcmVudCAmJiAhdGhpcy5wYXJlbnQuaXNKb2luUGVuZGluZygpKSl7XG4gICAgICByZXR1cm4gdGhpcy5hcHBseUpvaW5QYXRjaChsaXZlX3BhdGNoLCBodG1sLCBldmVudHMpXG4gICAgfVxuXG4gICAgLy8gT25lIGRvd25zaWRlIG9mIHRoaXMgYXBwcm9hY2ggaXMgdGhhdCB3ZSBuZWVkIHRvIGZpbmQgcGh4Q2hpbGRyZW5cbiAgICAvLyBpbiB0aGUgaHRtbCBmcmFnbWVudCwgaW5zdGVhZCBvZiBkaXJlY3RseSBvbiB0aGUgRE9NLiBUaGUgZnJhZ21lbnRcbiAgICAvLyBhbHNvIGRvZXMgbm90IGluY2x1ZGUgUEhYX1NUQVRJQywgc28gd2UgbmVlZCB0byBjb3B5IGl0IG92ZXIgZnJvbVxuICAgIC8vIHRoZSBET00uXG4gICAgbGV0IG5ld0NoaWxkcmVuID0gRE9NLmZpbmRQaHhDaGlsZHJlbkluRnJhZ21lbnQoaHRtbCwgdGhpcy5pZCkuZmlsdGVyKHRvRWwgPT4ge1xuICAgICAgbGV0IGZyb21FbCA9IHRvRWwuaWQgJiYgdGhpcy5lbC5xdWVyeVNlbGVjdG9yKGBbaWQ9XCIke3RvRWwuaWR9XCJdYClcbiAgICAgIGxldCBwaHhTdGF0aWMgPSBmcm9tRWwgJiYgZnJvbUVsLmdldEF0dHJpYnV0ZShQSFhfU1RBVElDKVxuICAgICAgaWYocGh4U3RhdGljKXsgdG9FbC5zZXRBdHRyaWJ1dGUoUEhYX1NUQVRJQywgcGh4U3RhdGljKSB9XG4gICAgICByZXR1cm4gdGhpcy5qb2luQ2hpbGQodG9FbClcbiAgICB9KVxuXG4gICAgaWYobmV3Q2hpbGRyZW4ubGVuZ3RoID09PSAwKXtcbiAgICAgIGlmKHRoaXMucGFyZW50KXtcbiAgICAgICAgdGhpcy5yb290LnBlbmRpbmdKb2luT3BzLnB1c2goW3RoaXMsICgpID0+IHRoaXMuYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgZXZlbnRzKV0pXG4gICAgICAgIHRoaXMucGFyZW50LmFja0pvaW4odGhpcylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub25BbGxDaGlsZEpvaW5zQ29tcGxldGUoKVxuICAgICAgICB0aGlzLmFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIGV2ZW50cylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb290LnBlbmRpbmdKb2luT3BzLnB1c2goW3RoaXMsICgpID0+IHRoaXMuYXBwbHlKb2luUGF0Y2gobGl2ZV9wYXRjaCwgaHRtbCwgZXZlbnRzKV0pXG4gICAgfVxuICB9XG5cbiAgYXR0YWNoVHJ1ZURvY0VsKCl7XG4gICAgdGhpcy5lbCA9IERPTS5ieUlkKHRoaXMuaWQpXG4gICAgdGhpcy5lbC5zZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQsIHRoaXMucm9vdC5pZClcbiAgfVxuXG4gIGFwcGx5Sm9pblBhdGNoKGxpdmVfcGF0Y2gsIGh0bWwsIGV2ZW50cyl7XG4gICAgdGhpcy5hdHRhY2hUcnVlRG9jRWwoKVxuICAgIGxldCBwYXRjaCA9IG5ldyBET01QYXRjaCh0aGlzLCB0aGlzLmVsLCB0aGlzLmlkLCBodG1sLCBudWxsKVxuICAgIHBhdGNoLm1hcmtQcnVuYWJsZUNvbnRlbnRGb3JSZW1vdmFsKClcbiAgICB0aGlzLnBlcmZvcm1QYXRjaChwYXRjaCwgZmFsc2UpXG4gICAgdGhpcy5qb2luTmV3Q2hpbGRyZW4oKVxuICAgIERPTS5hbGwodGhpcy5lbCwgYFske3RoaXMuYmluZGluZyhQSFhfSE9PSyl9XSwgW2RhdGEtcGh4LSR7UEhYX0hPT0t9XWAsIGhvb2tFbCA9PiB7XG4gICAgICBsZXQgaG9vayA9IHRoaXMuYWRkSG9vayhob29rRWwpXG4gICAgICBpZihob29rKXsgaG9vay5fX21vdW50ZWQoKSB9XG4gICAgfSlcblxuICAgIHRoaXMuam9pblBlbmRpbmcgPSBmYWxzZVxuICAgIHRoaXMubGl2ZVNvY2tldC5kaXNwYXRjaEV2ZW50cyhldmVudHMpXG4gICAgdGhpcy5hcHBseVBlbmRpbmdVcGRhdGVzKClcblxuICAgIGlmKGxpdmVfcGF0Y2gpe1xuICAgICAgbGV0IHtraW5kLCB0b30gPSBsaXZlX3BhdGNoXG4gICAgICB0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVBhdGNoKHRvLCBraW5kKVxuICAgIH1cbiAgICB0aGlzLmhpZGVMb2FkZXIoKVxuICAgIGlmKHRoaXMuam9pbkNvdW50ID4gMSl7IHRoaXMudHJpZ2dlclJlY29ubmVjdGVkKCkgfVxuICAgIHRoaXMuc3RvcENhbGxiYWNrKClcbiAgfVxuXG4gIHRyaWdnZXJCZWZvcmVVcGRhdGVIb29rKGZyb21FbCwgdG9FbCl7XG4gICAgdGhpcy5saXZlU29ja2V0LnRyaWdnZXJET00oXCJvbkJlZm9yZUVsVXBkYXRlZFwiLCBbZnJvbUVsLCB0b0VsXSlcbiAgICBsZXQgaG9vayA9IHRoaXMuZ2V0SG9vayhmcm9tRWwpXG4gICAgbGV0IGlzSWdub3JlZCA9IGhvb2sgJiYgRE9NLmlzSWdub3JlZChmcm9tRWwsIHRoaXMuYmluZGluZyhQSFhfVVBEQVRFKSlcbiAgICBpZihob29rICYmICFmcm9tRWwuaXNFcXVhbE5vZGUodG9FbCkgJiYgIShpc0lnbm9yZWQgJiYgaXNFcXVhbE9iaihmcm9tRWwuZGF0YXNldCwgdG9FbC5kYXRhc2V0KSkpe1xuICAgICAgaG9vay5fX2JlZm9yZVVwZGF0ZSgpXG4gICAgICByZXR1cm4gaG9va1xuICAgIH1cbiAgfVxuXG4gIHBlcmZvcm1QYXRjaChwYXRjaCwgcHJ1bmVDaWRzKXtcbiAgICBsZXQgcmVtb3ZlZEVscyA9IFtdXG4gICAgbGV0IHBoeENoaWxkcmVuQWRkZWQgPSBmYWxzZVxuICAgIGxldCB1cGRhdGVkSG9va0lkcyA9IG5ldyBTZXQoKVxuXG4gICAgcGF0Y2guYWZ0ZXIoXCJhZGRlZFwiLCBlbCA9PiB7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQudHJpZ2dlckRPTShcIm9uTm9kZUFkZGVkXCIsIFtlbF0pXG5cbiAgICAgIGxldCBuZXdIb29rID0gdGhpcy5hZGRIb29rKGVsKVxuICAgICAgaWYobmV3SG9vayl7IG5ld0hvb2suX19tb3VudGVkKCkgfVxuICAgIH0pXG5cbiAgICBwYXRjaC5hZnRlcihcInBoeENoaWxkQWRkZWRcIiwgZWwgPT4ge1xuICAgICAgaWYoRE9NLmlzUGh4U3RpY2t5KGVsKSl7XG4gICAgICAgIHRoaXMubGl2ZVNvY2tldC5qb2luUm9vdFZpZXdzKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBoeENoaWxkcmVuQWRkZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSlcblxuICAgIHBhdGNoLmJlZm9yZShcInVwZGF0ZWRcIiwgKGZyb21FbCwgdG9FbCkgPT4ge1xuICAgICAgbGV0IGhvb2sgPSB0aGlzLnRyaWdnZXJCZWZvcmVVcGRhdGVIb29rKGZyb21FbCwgdG9FbClcbiAgICAgIGlmKGhvb2speyB1cGRhdGVkSG9va0lkcy5hZGQoZnJvbUVsLmlkKSB9XG4gICAgfSlcblxuICAgIHBhdGNoLmFmdGVyKFwidXBkYXRlZFwiLCBlbCA9PiB7XG4gICAgICBpZih1cGRhdGVkSG9va0lkcy5oYXMoZWwuaWQpKXsgdGhpcy5nZXRIb29rKGVsKS5fX3VwZGF0ZWQoKSB9XG4gICAgfSlcblxuICAgIHBhdGNoLmFmdGVyKFwiZGlzY2FyZGVkXCIsIChlbCkgPT4ge1xuICAgICAgaWYoZWwubm9kZVR5cGUgPT09IE5vZGUuRUxFTUVOVF9OT0RFKXsgcmVtb3ZlZEVscy5wdXNoKGVsKSB9XG4gICAgfSlcblxuICAgIHBhdGNoLmFmdGVyKFwidHJhbnNpdGlvbnNEaXNjYXJkZWRcIiwgZWxzID0+IHRoaXMuYWZ0ZXJFbGVtZW50c1JlbW92ZWQoZWxzLCBwcnVuZUNpZHMpKVxuICAgIHBhdGNoLnBlcmZvcm0oKVxuICAgIHRoaXMuYWZ0ZXJFbGVtZW50c1JlbW92ZWQocmVtb3ZlZEVscywgcHJ1bmVDaWRzKVxuXG4gICAgcmV0dXJuIHBoeENoaWxkcmVuQWRkZWRcbiAgfVxuXG4gIGFmdGVyRWxlbWVudHNSZW1vdmVkKGVsZW1lbnRzLCBwcnVuZUNpZHMpe1xuICAgIGxldCBkZXN0cm95ZWRDSURzID0gW11cbiAgICBlbGVtZW50cy5mb3JFYWNoKHBhcmVudCA9PiB7XG4gICAgICBsZXQgY29tcG9uZW50cyA9IERPTS5hbGwocGFyZW50LCBgWyR7UEhYX0NPTVBPTkVOVH1dYClcbiAgICAgICAgY29tcG9uZW50cy5jb25jYXQocGFyZW50KS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgbGV0IGNpZCA9IHRoaXMuY29tcG9uZW50SUQoZWwpXG4gICAgICAgIGlmKGlzQ2lkKGNpZCkgJiYgZGVzdHJveWVkQ0lEcy5pbmRleE9mKGNpZCkgPT09IC0xKXsgZGVzdHJveWVkQ0lEcy5wdXNoKGNpZCkgfVxuICAgICAgICBsZXQgaG9vayA9IHRoaXMuZ2V0SG9vayhlbClcbiAgICAgICAgaG9vayAmJiB0aGlzLmRlc3Ryb3lIb29rKGhvb2spXG4gICAgICB9KVxuICAgIH0pXG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBwcnVuZUNpZHMgb24gam9pbnMuIE90aGVyd2lzZSwgaW4gY2FzZSBvZlxuICAgIC8vIHJlam9pbnMsIHdlIG1heSBub3RpZnkgY2lkcyB0aGF0IG5vIGxvbmdlciBiZWxvbmcgdG8gdGhlXG4gICAgLy8gY3VycmVudCBMaXZlVmlldyB0byBiZSByZW1vdmVkLlxuICAgIGlmKHBydW5lQ2lkcyl7XG4gICAgICB0aGlzLm1heWJlUHVzaENvbXBvbmVudHNEZXN0cm95ZWQoZGVzdHJveWVkQ0lEcylcbiAgICB9XG4gIH1cblxuICBqb2luTmV3Q2hpbGRyZW4oKXtcbiAgICBET00uZmluZFBoeENoaWxkcmVuKHRoaXMuZWwsIHRoaXMuaWQpLmZvckVhY2goZWwgPT4gdGhpcy5qb2luQ2hpbGQoZWwpKVxuICB9XG5cbiAgZ2V0Q2hpbGRCeUlkKGlkKXsgcmV0dXJuIHRoaXMucm9vdC5jaGlsZHJlblt0aGlzLmlkXVtpZF0gfVxuXG4gIGdldERlc2NlbmRlbnRCeUVsKGVsKXtcbiAgICBpZihlbC5pZCA9PT0gdGhpcy5pZCl7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltlbC5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRCldW2VsLmlkXVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3lEZXNjZW5kZW50KGlkKXtcbiAgICBmb3IobGV0IHBhcmVudElkIGluIHRoaXMucm9vdC5jaGlsZHJlbil7XG4gICAgICBmb3IobGV0IGNoaWxkSWQgaW4gdGhpcy5yb290LmNoaWxkcmVuW3BhcmVudElkXSl7XG4gICAgICAgIGlmKGNoaWxkSWQgPT09IGlkKXsgcmV0dXJuIHRoaXMucm9vdC5jaGlsZHJlbltwYXJlbnRJZF1bY2hpbGRJZF0uZGVzdHJveSgpIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBqb2luQ2hpbGQoZWwpe1xuICAgIGxldCBjaGlsZCA9IHRoaXMuZ2V0Q2hpbGRCeUlkKGVsLmlkKVxuICAgIGlmKCFjaGlsZCl7XG4gICAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCB0aGlzLmxpdmVTb2NrZXQsIHRoaXMpXG4gICAgICB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF1bdmlldy5pZF0gPSB2aWV3XG4gICAgICB2aWV3LmpvaW4oKVxuICAgICAgdGhpcy5jaGlsZEpvaW5zKytcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgaXNKb2luUGVuZGluZygpeyByZXR1cm4gdGhpcy5qb2luUGVuZGluZyB9XG5cbiAgYWNrSm9pbihfY2hpbGQpe1xuICAgIHRoaXMuY2hpbGRKb2lucy0tXG5cbiAgICBpZih0aGlzLmNoaWxkSm9pbnMgPT09IDApe1xuICAgICAgaWYodGhpcy5wYXJlbnQpe1xuICAgICAgICB0aGlzLnBhcmVudC5hY2tKb2luKHRoaXMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9uQWxsQ2hpbGRKb2luc0NvbXBsZXRlKClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkFsbENoaWxkSm9pbnNDb21wbGV0ZSgpe1xuICAgIHRoaXMuam9pbkNhbGxiYWNrKCgpID0+IHtcbiAgICAgIHRoaXMucGVuZGluZ0pvaW5PcHMuZm9yRWFjaCgoW3ZpZXcsIG9wXSkgPT4ge1xuICAgICAgICBpZighdmlldy5pc0Rlc3Ryb3llZCgpKXsgb3AoKSB9XG4gICAgICB9KVxuICAgICAgdGhpcy5wZW5kaW5nSm9pbk9wcyA9IFtdXG4gICAgfSlcbiAgfVxuXG4gIHVwZGF0ZShkaWZmLCBldmVudHMpe1xuICAgIGlmKHRoaXMuaXNKb2luUGVuZGluZygpIHx8IHRoaXMubGl2ZVNvY2tldC5oYXNQZW5kaW5nTGluaygpKXtcbiAgICAgIHJldHVybiB0aGlzLnBlbmRpbmdEaWZmcy5wdXNoKHtkaWZmLCBldmVudHN9KVxuICAgIH1cblxuICAgIHRoaXMucmVuZGVyZWQubWVyZ2VEaWZmKGRpZmYpXG4gICAgbGV0IHBoeENoaWxkcmVuQWRkZWQgPSBmYWxzZVxuXG4gICAgLy8gV2hlbiB0aGUgZGlmZiBvbmx5IGNvbnRhaW5zIGNvbXBvbmVudCBkaWZmcywgdGhlbiB3YWxrIGNvbXBvbmVudHNcbiAgICAvLyBhbmQgcGF0Y2ggb25seSB0aGUgcGFyZW50IGNvbXBvbmVudCBjb250YWluZXJzIGZvdW5kIGluIHRoZSBkaWZmLlxuICAgIC8vIE90aGVyd2lzZSwgcGF0Y2ggZW50aXJlIExWIGNvbnRhaW5lci5cbiAgICBpZih0aGlzLnJlbmRlcmVkLmlzQ29tcG9uZW50T25seURpZmYoZGlmZikpe1xuICAgICAgdGhpcy5saXZlU29ja2V0LnRpbWUoXCJjb21wb25lbnQgcGF0Y2ggY29tcGxldGVcIiwgKCkgPT4ge1xuICAgICAgICBsZXQgcGFyZW50Q2lkcyA9IERPTS5maW5kUGFyZW50Q0lEcyh0aGlzLmVsLCB0aGlzLnJlbmRlcmVkLmNvbXBvbmVudENJRHMoZGlmZikpXG4gICAgICAgIHBhcmVudENpZHMuZm9yRWFjaChwYXJlbnRDSUQgPT4ge1xuICAgICAgICAgIGlmKHRoaXMuY29tcG9uZW50UGF0Y2godGhpcy5yZW5kZXJlZC5nZXRDb21wb25lbnQoZGlmZiwgcGFyZW50Q0lEKSwgcGFyZW50Q0lEKSl7IHBoeENoaWxkcmVuQWRkZWQgPSB0cnVlIH1cbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmKCFpc0VtcHR5KGRpZmYpKXtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC50aW1lKFwiZnVsbCBwYXRjaCBjb21wbGV0ZVwiLCAoKSA9PiB7XG4gICAgICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJDb250YWluZXIoZGlmZiwgXCJ1cGRhdGVcIilcbiAgICAgICAgbGV0IHBhdGNoID0gbmV3IERPTVBhdGNoKHRoaXMsIHRoaXMuZWwsIHRoaXMuaWQsIGh0bWwsIG51bGwpXG4gICAgICAgIHBoeENoaWxkcmVuQWRkZWQgPSB0aGlzLnBlcmZvcm1QYXRjaChwYXRjaCwgdHJ1ZSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5saXZlU29ja2V0LmRpc3BhdGNoRXZlbnRzKGV2ZW50cylcbiAgICBpZihwaHhDaGlsZHJlbkFkZGVkKXsgdGhpcy5qb2luTmV3Q2hpbGRyZW4oKSB9XG4gIH1cblxuICByZW5kZXJDb250YWluZXIoZGlmZiwga2luZCl7XG4gICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC50aW1lKGB0b1N0cmluZyBkaWZmICgke2tpbmR9KWAsICgpID0+IHtcbiAgICAgIGxldCB0YWcgPSB0aGlzLmVsLnRhZ05hbWVcbiAgICAgIC8vIERvbid0IHNraXAgYW55IGNvbXBvbmVudCBpbiB0aGUgZGlmZiBub3IgYW55IG1hcmtlZCBhcyBwcnVuZWRcbiAgICAgIC8vIChhcyB0aGV5IG1heSBoYXZlIGJlZW4gYWRkZWQgYmFjaylcbiAgICAgIGxldCBjaWRzID0gZGlmZiA/IHRoaXMucmVuZGVyZWQuY29tcG9uZW50Q0lEcyhkaWZmKS5jb25jYXQodGhpcy5wcnVuaW5nQ0lEcykgOiBudWxsXG4gICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVyZWQudG9TdHJpbmcoY2lkcylcbiAgICAgIHJldHVybiBgPCR7dGFnfT4ke2h0bWx9PC8ke3RhZ30+YFxuICAgIH0pXG4gIH1cblxuICBjb21wb25lbnRQYXRjaChkaWZmLCBjaWQpe1xuICAgIGlmKGlzRW1wdHkoZGlmZikpIHJldHVybiBmYWxzZVxuICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJlZC5jb21wb25lbnRUb1N0cmluZyhjaWQpXG4gICAgbGV0IHBhdGNoID0gbmV3IERPTVBhdGNoKHRoaXMsIHRoaXMuZWwsIHRoaXMuaWQsIGh0bWwsIGNpZClcbiAgICBsZXQgY2hpbGRyZW5BZGRlZCA9IHRoaXMucGVyZm9ybVBhdGNoKHBhdGNoLCB0cnVlKVxuICAgIHJldHVybiBjaGlsZHJlbkFkZGVkXG4gIH1cblxuICBnZXRIb29rKGVsKXsgcmV0dXJuIHRoaXMudmlld0hvb2tzW1ZpZXdIb29rLmVsZW1lbnRJRChlbCldIH1cblxuICBhZGRIb29rKGVsKXtcbiAgICBpZihWaWV3SG9vay5lbGVtZW50SUQoZWwpIHx8ICFlbC5nZXRBdHRyaWJ1dGUpeyByZXR1cm4gfVxuICAgIGxldCBob29rTmFtZSA9IGVsLmdldEF0dHJpYnV0ZShgZGF0YS1waHgtJHtQSFhfSE9PS31gKSB8fCBlbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9IT09LKSlcbiAgICBpZihob29rTmFtZSAmJiAhdGhpcy5vd25zRWxlbWVudChlbCkpeyByZXR1cm4gfVxuICAgIGxldCBjYWxsYmFja3MgPSB0aGlzLmxpdmVTb2NrZXQuZ2V0SG9va0NhbGxiYWNrcyhob29rTmFtZSlcblxuICAgIGlmKGNhbGxiYWNrcyl7XG4gICAgICBpZighZWwuaWQpeyBsb2dFcnJvcihgbm8gRE9NIElEIGZvciBob29rIFwiJHtob29rTmFtZX1cIi4gSG9va3MgcmVxdWlyZSBhIHVuaXF1ZSBJRCBvbiBlYWNoIGVsZW1lbnQuYCwgZWwpIH1cbiAgICAgIGxldCBob29rID0gbmV3IFZpZXdIb29rKHRoaXMsIGVsLCBjYWxsYmFja3MpXG4gICAgICB0aGlzLnZpZXdIb29rc1tWaWV3SG9vay5lbGVtZW50SUQoaG9vay5lbCldID0gaG9va1xuICAgICAgcmV0dXJuIGhvb2tcbiAgICB9IGVsc2UgaWYoaG9va05hbWUgIT09IG51bGwpe1xuICAgICAgbG9nRXJyb3IoYHVua25vd24gaG9vayBmb3VuZCBmb3IgXCIke2hvb2tOYW1lfVwiYCwgZWwpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveUhvb2soaG9vayl7XG4gICAgaG9vay5fX2Rlc3Ryb3llZCgpXG4gICAgaG9vay5fX2NsZWFudXBfXygpXG4gICAgZGVsZXRlIHRoaXMudmlld0hvb2tzW1ZpZXdIb29rLmVsZW1lbnRJRChob29rLmVsKV1cbiAgfVxuXG4gIGFwcGx5UGVuZGluZ1VwZGF0ZXMoKXtcbiAgICB0aGlzLnBlbmRpbmdEaWZmcy5mb3JFYWNoKCh7ZGlmZiwgZXZlbnRzfSkgPT4gdGhpcy51cGRhdGUoZGlmZiwgZXZlbnRzKSlcbiAgICB0aGlzLnBlbmRpbmdEaWZmcyA9IFtdXG4gIH1cblxuICBvbkNoYW5uZWwoZXZlbnQsIGNiKXtcbiAgICB0aGlzLmxpdmVTb2NrZXQub25DaGFubmVsKHRoaXMuY2hhbm5lbCwgZXZlbnQsIHJlc3AgPT4ge1xuICAgICAgaWYodGhpcy5pc0pvaW5QZW5kaW5nKCkpe1xuICAgICAgICB0aGlzLnJvb3QucGVuZGluZ0pvaW5PcHMucHVzaChbdGhpcywgKCkgPT4gY2IocmVzcCldKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5saXZlU29ja2V0LnJlcXVlc3RET01VcGRhdGUoKCkgPT4gY2IocmVzcCkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGJpbmRDaGFubmVsKCl7XG4gICAgLy8gVGhlIGRpZmYgZXZlbnQgc2hvdWxkIGJlIGhhbmRsZWQgYnkgdGhlIHJlZ3VsYXIgdXBkYXRlIG9wZXJhdGlvbnMuXG4gICAgLy8gQWxsIG90aGVyIG9wZXJhdGlvbnMgYXJlIHF1ZXVlZCB0byBiZSBhcHBsaWVkIG9ubHkgYWZ0ZXIgam9pbi5cbiAgICB0aGlzLmxpdmVTb2NrZXQub25DaGFubmVsKHRoaXMuY2hhbm5lbCwgXCJkaWZmXCIsIChyYXdEaWZmKSA9PiB7XG4gICAgICB0aGlzLmxpdmVTb2NrZXQucmVxdWVzdERPTVVwZGF0ZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwbHlEaWZmKFwidXBkYXRlXCIsIHJhd0RpZmYsICh7ZGlmZiwgZXZlbnRzfSkgPT4gdGhpcy51cGRhdGUoZGlmZiwgZXZlbnRzKSlcbiAgICAgIH0pXG4gICAgfSlcbiAgICB0aGlzLm9uQ2hhbm5lbChcInJlZGlyZWN0XCIsICh7dG8sIGZsYXNofSkgPT4gdGhpcy5vblJlZGlyZWN0KHt0bywgZmxhc2h9KSlcbiAgICB0aGlzLm9uQ2hhbm5lbChcImxpdmVfcGF0Y2hcIiwgKHJlZGlyKSA9PiB0aGlzLm9uTGl2ZVBhdGNoKHJlZGlyKSlcbiAgICB0aGlzLm9uQ2hhbm5lbChcImxpdmVfcmVkaXJlY3RcIiwgKHJlZGlyKSA9PiB0aGlzLm9uTGl2ZVJlZGlyZWN0KHJlZGlyKSlcbiAgICB0aGlzLmNoYW5uZWwub25FcnJvcihyZWFzb24gPT4gdGhpcy5vbkVycm9yKHJlYXNvbikpXG4gICAgdGhpcy5jaGFubmVsLm9uQ2xvc2UocmVhc29uID0+IHRoaXMub25DbG9zZShyZWFzb24pKVxuICB9XG5cbiAgZGVzdHJveUFsbENoaWxkcmVuKCl7XG4gICAgZm9yKGxldCBpZCBpbiB0aGlzLnJvb3QuY2hpbGRyZW5bdGhpcy5pZF0pe1xuICAgICAgdGhpcy5nZXRDaGlsZEJ5SWQoaWQpLmRlc3Ryb3koKVxuICAgIH1cbiAgfVxuXG4gIG9uTGl2ZVJlZGlyZWN0KHJlZGlyKXtcbiAgICBsZXQge3RvLCBraW5kLCBmbGFzaH0gPSByZWRpclxuICAgIGxldCB1cmwgPSB0aGlzLmV4cGFuZFVSTCh0bylcbiAgICB0aGlzLmxpdmVTb2NrZXQuaGlzdG9yeVJlZGlyZWN0KHVybCwga2luZCwgZmxhc2gpXG4gIH1cblxuICBvbkxpdmVQYXRjaChyZWRpcil7XG4gICAgbGV0IHt0bywga2luZH0gPSByZWRpclxuICAgIHRoaXMuaHJlZiA9IHRoaXMuZXhwYW5kVVJMKHRvKVxuICAgIHRoaXMubGl2ZVNvY2tldC5oaXN0b3J5UGF0Y2godG8sIGtpbmQpXG4gIH1cblxuICBleHBhbmRVUkwodG8pe1xuICAgIHJldHVybiB0by5zdGFydHNXaXRoKFwiL1wiKSA/IGAke3dpbmRvdy5sb2NhdGlvbi5wcm90b2NvbH0vLyR7d2luZG93LmxvY2F0aW9uLmhvc3R9JHt0b31gIDogdG9cbiAgfVxuXG4gIG9uUmVkaXJlY3Qoe3RvLCBmbGFzaH0peyB0aGlzLmxpdmVTb2NrZXQucmVkaXJlY3QodG8sIGZsYXNoKSB9XG5cbiAgaXNEZXN0cm95ZWQoKXsgcmV0dXJuIHRoaXMuZGVzdHJveWVkIH1cblxuICBqb2luKGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLmlzTWFpbigpKXtcbiAgICAgIHRoaXMuc3RvcENhbGxiYWNrID0gdGhpcy5saXZlU29ja2V0LndpdGhQYWdlTG9hZGluZyh7dG86IHRoaXMuaHJlZiwga2luZDogXCJpbml0aWFsXCJ9KVxuICAgIH1cbiAgICB0aGlzLmpvaW5DYWxsYmFjayA9IChvbkRvbmUpID0+IHtcbiAgICAgIG9uRG9uZSA9IG9uRG9uZSB8fCBmdW5jdGlvbigpe31cbiAgICAgIGNhbGxiYWNrID8gY2FsbGJhY2sodGhpcy5qb2luQ291bnQsIG9uRG9uZSkgOiBvbkRvbmUoKVxuICAgIH1cbiAgICB0aGlzLmxpdmVTb2NrZXQud3JhcFB1c2godGhpcywge3RpbWVvdXQ6IGZhbHNlfSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbC5qb2luKClcbiAgICAgICAgLnJlY2VpdmUoXCJva1wiLCBkYXRhID0+IHtcbiAgICAgICAgICBpZighdGhpcy5pc0Rlc3Ryb3llZCgpKXtcbiAgICAgICAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHRoaXMub25Kb2luKGRhdGEpKVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnJlY2VpdmUoXCJlcnJvclwiLCByZXNwID0+ICF0aGlzLmlzRGVzdHJveWVkKCkgJiYgdGhpcy5vbkpvaW5FcnJvcihyZXNwKSlcbiAgICAgICAgLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+ICF0aGlzLmlzRGVzdHJveWVkKCkgJiYgdGhpcy5vbkpvaW5FcnJvcih7cmVhc29uOiBcInRpbWVvdXRcIn0pKVxuICAgIH0pXG4gIH1cblxuICBvbkpvaW5FcnJvcihyZXNwKXtcbiAgICBpZihyZXNwLnJlYXNvbiA9PT0gXCJ1bmF1dGhvcml6ZWRcIiB8fCByZXNwLnJlYXNvbiA9PT0gXCJzdGFsZVwiKXtcbiAgICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW1widW5hdXRob3JpemVkIGxpdmVfcmVkaXJlY3QuIEZhbGxpbmcgYmFjayB0byBwYWdlIHJlcXVlc3RcIiwgcmVzcF0pXG4gICAgICByZXR1cm4gdGhpcy5vblJlZGlyZWN0KHt0bzogdGhpcy5ocmVmfSlcbiAgICB9XG4gICAgaWYocmVzcC5yZWRpcmVjdCB8fCByZXNwLmxpdmVfcmVkaXJlY3Qpe1xuICAgICAgdGhpcy5qb2luUGVuZGluZyA9IGZhbHNlXG4gICAgICB0aGlzLmNoYW5uZWwubGVhdmUoKVxuICAgIH1cbiAgICBpZihyZXNwLnJlZGlyZWN0KXsgcmV0dXJuIHRoaXMub25SZWRpcmVjdChyZXNwLnJlZGlyZWN0KSB9XG4gICAgaWYocmVzcC5saXZlX3JlZGlyZWN0KXsgcmV0dXJuIHRoaXMub25MaXZlUmVkaXJlY3QocmVzcC5saXZlX3JlZGlyZWN0KSB9XG4gICAgdGhpcy5sb2coXCJlcnJvclwiLCAoKSA9PiBbXCJ1bmFibGUgdG8gam9pblwiLCByZXNwXSlcbiAgICByZXR1cm4gdGhpcy5saXZlU29ja2V0LnJlbG9hZFdpdGhKaXR0ZXIodGhpcylcbiAgfVxuXG4gIG9uQ2xvc2UocmVhc29uKXtcbiAgICBpZih0aGlzLmlzRGVzdHJveWVkKCkpeyByZXR1cm4gfVxuICAgIGlmKCh0aGlzLmlzSm9pblBlbmRpbmcoKSAmJiBkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgIT09IFwiaGlkZGVuXCIpIHx8XG4gICAgICAodGhpcy5saXZlU29ja2V0Lmhhc1BlbmRpbmdMaW5rKCkgJiYgcmVhc29uICE9PSBcImxlYXZlXCIpKXtcblxuICAgICAgcmV0dXJuIHRoaXMubGl2ZVNvY2tldC5yZWxvYWRXaXRoSml0dGVyKHRoaXMpXG4gICAgfVxuICAgIHRoaXMuZGVzdHJveUFsbENoaWxkcmVuKClcbiAgICB0aGlzLmxpdmVTb2NrZXQuZHJvcEFjdGl2ZUVsZW1lbnQodGhpcylcbiAgICAvLyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IGNhbiBiZSBudWxsIGluIEludGVybmV0IEV4cGxvcmVyIDExXG4gICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCl7IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpIH1cbiAgICBpZih0aGlzLmxpdmVTb2NrZXQuaXNVbmxvYWRlZCgpKXtcbiAgICAgIHRoaXMuc2hvd0xvYWRlcihCRUZPUkVfVU5MT0FEX0xPQURFUl9USU1FT1VUKVxuICAgIH1cbiAgfVxuXG4gIG9uRXJyb3IocmVhc29uKXtcbiAgICB0aGlzLm9uQ2xvc2UocmVhc29uKVxuICAgIHRoaXMubG9nKFwiZXJyb3JcIiwgKCkgPT4gW1widmlldyBjcmFzaGVkXCIsIHJlYXNvbl0pXG4gICAgaWYoIXRoaXMubGl2ZVNvY2tldC5pc1VubG9hZGVkKCkpeyB0aGlzLmRpc3BsYXlFcnJvcigpIH1cbiAgfVxuXG4gIGRpc3BsYXlFcnJvcigpe1xuICAgIGlmKHRoaXMuaXNNYWluKCkpeyBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdGFydFwiLCB7dG86IHRoaXMuaHJlZiwga2luZDogXCJlcnJvclwifSkgfVxuICAgIHRoaXMuc2hvd0xvYWRlcigpXG4gICAgdGhpcy5zZXRDb250YWluZXJDbGFzc2VzKFBIWF9ESVNDT05ORUNURURfQ0xBU1MsIFBIWF9FUlJPUl9DTEFTUylcbiAgfVxuXG4gIHB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBldmVudCwgcGF5bG9hZCwgb25SZXBseSA9IGZ1bmN0aW9uICgpeyB9KXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXsgcmV0dXJuIH1cblxuICAgIGxldCBbcmVmLCBbZWxdLCBvcHRzXSA9IHJlZkdlbmVyYXRvciA/IHJlZkdlbmVyYXRvcigpIDogW251bGwsIFtdLCB7fV1cbiAgICBsZXQgb25Mb2FkaW5nRG9uZSA9IGZ1bmN0aW9uKCl7IH1cbiAgICBpZihvcHRzLnBhZ2VfbG9hZGluZyB8fCAoZWwgJiYgKGVsLmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX1BBR0VfTE9BRElORykpICE9PSBudWxsKSkpe1xuICAgICAgb25Mb2FkaW5nRG9uZSA9IHRoaXMubGl2ZVNvY2tldC53aXRoUGFnZUxvYWRpbmcoe2tpbmQ6IFwiZWxlbWVudFwiLCB0YXJnZXQ6IGVsfSlcbiAgICB9XG5cbiAgICBpZih0eXBlb2YgKHBheWxvYWQuY2lkKSAhPT0gXCJudW1iZXJcIil7IGRlbGV0ZSBwYXlsb2FkLmNpZCB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMubGl2ZVNvY2tldC53cmFwUHVzaCh0aGlzLCB7dGltZW91dDogdHJ1ZX0sICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbm5lbC5wdXNoKGV2ZW50LCBwYXlsb2FkLCBQVVNIX1RJTUVPVVQpLnJlY2VpdmUoXCJva1wiLCByZXNwID0+IHtcbiAgICAgICAgICBpZihyZWYgIT09IG51bGwpeyB0aGlzLnVuZG9SZWZzKHJlZikgfVxuICAgICAgICAgIGxldCBmaW5pc2ggPSAoaG9va1JlcGx5KSA9PiB7XG4gICAgICAgICAgICBpZihyZXNwLnJlZGlyZWN0KXsgdGhpcy5vblJlZGlyZWN0KHJlc3AucmVkaXJlY3QpIH1cbiAgICAgICAgICAgIGlmKHJlc3AubGl2ZV9wYXRjaCl7IHRoaXMub25MaXZlUGF0Y2gocmVzcC5saXZlX3BhdGNoKSB9XG4gICAgICAgICAgICBpZihyZXNwLmxpdmVfcmVkaXJlY3QpeyB0aGlzLm9uTGl2ZVJlZGlyZWN0KHJlc3AubGl2ZV9yZWRpcmVjdCkgfVxuICAgICAgICAgICAgb25Mb2FkaW5nRG9uZSgpXG4gICAgICAgICAgICBvblJlcGx5KHJlc3AsIGhvb2tSZXBseSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYocmVzcC5kaWZmKXtcbiAgICAgICAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICAgICAgbGV0IGhvb2tSZXBseSA9IHRoaXMuYXBwbHlEaWZmKFwidXBkYXRlXCIsIHJlc3AuZGlmZiwgKHtkaWZmLCBldmVudHN9KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoZGlmZiwgZXZlbnRzKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBmaW5pc2goaG9va1JlcGx5KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmluaXNoKG51bGwpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICB1bmRvUmVmcyhyZWYpe1xuICAgIERPTS5hbGwoZG9jdW1lbnQsIGBbJHtQSFhfUkVGX1NSQ309XCIke3RoaXMuaWR9XCJdWyR7UEhYX1JFRn09XCIke3JlZn1cIl1gLCBlbCA9PiB7XG4gICAgICBsZXQgZGlzYWJsZWRWYWwgPSBlbC5nZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVEKVxuICAgICAgLy8gcmVtb3ZlIHJlZnNcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfUkVGKVxuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFBIWF9SRUZfU1JDKVxuICAgICAgLy8gcmVzdG9yZSBpbnB1dHNcbiAgICAgIGlmKGVsLmdldEF0dHJpYnV0ZShQSFhfUkVBRE9OTFkpICE9PSBudWxsKXtcbiAgICAgICAgZWwucmVhZE9ubHkgPSBmYWxzZVxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX1JFQURPTkxZKVxuICAgICAgfVxuICAgICAgaWYoZGlzYWJsZWRWYWwgIT09IG51bGwpe1xuICAgICAgICBlbC5kaXNhYmxlZCA9IGRpc2FibGVkVmFsID09PSBcInRydWVcIiA/IHRydWUgOiBmYWxzZVxuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoUEhYX0RJU0FCTEVEKVxuICAgICAgfVxuICAgICAgLy8gcmVtb3ZlIGNsYXNzZXNcbiAgICAgIFBIWF9FVkVOVF9DTEFTU0VTLmZvckVhY2goY2xhc3NOYW1lID0+IERPTS5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKSlcbiAgICAgIC8vIHJlc3RvcmUgZGlzYWJsZXNcbiAgICAgIGxldCBkaXNhYmxlUmVzdG9yZSA9IGVsLmdldEF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpXG4gICAgICBpZihkaXNhYmxlUmVzdG9yZSAhPT0gbnVsbCl7XG4gICAgICAgIGVsLmlubmVyVGV4dCA9IGRpc2FibGVSZXN0b3JlXG4gICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUpXG4gICAgICB9XG4gICAgICBsZXQgdG9FbCA9IERPTS5wcml2YXRlKGVsLCBQSFhfUkVGKVxuICAgICAgaWYodG9FbCl7XG4gICAgICAgIGxldCBob29rID0gdGhpcy50cmlnZ2VyQmVmb3JlVXBkYXRlSG9vayhlbCwgdG9FbClcbiAgICAgICAgRE9NUGF0Y2gucGF0Y2hFbChlbCwgdG9FbCwgdGhpcy5saXZlU29ja2V0LmdldEFjdGl2ZUVsZW1lbnQoKSlcbiAgICAgICAgaWYoaG9vayl7IGhvb2suX191cGRhdGVkKCkgfVxuICAgICAgICBET00uZGVsZXRlUHJpdmF0ZShlbCwgUEhYX1JFRilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHV0UmVmKGVsZW1lbnRzLCBldmVudCwgb3B0cyA9IHt9KXtcbiAgICBsZXQgbmV3UmVmID0gdGhpcy5yZWYrK1xuICAgIGxldCBkaXNhYmxlV2l0aCA9IHRoaXMuYmluZGluZyhQSFhfRElTQUJMRV9XSVRIKVxuICAgIGlmKG9wdHMubG9hZGluZyl7IGVsZW1lbnRzID0gZWxlbWVudHMuY29uY2F0KERPTS5hbGwoZG9jdW1lbnQsIG9wdHMubG9hZGluZykpfVxuXG4gICAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGBwaHgtJHtldmVudH0tbG9hZGluZ2ApXG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoUEhYX1JFRiwgbmV3UmVmKVxuICAgICAgZWwuc2V0QXR0cmlidXRlKFBIWF9SRUZfU1JDLCB0aGlzLmVsLmlkKVxuICAgICAgbGV0IGRpc2FibGVUZXh0ID0gZWwuZ2V0QXR0cmlidXRlKGRpc2FibGVXaXRoKVxuICAgICAgaWYoZGlzYWJsZVRleHQgIT09IG51bGwpe1xuICAgICAgICBpZighZWwuZ2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFX1dJVEhfUkVTVE9SRSkpe1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShQSFhfRElTQUJMRV9XSVRIX1JFU1RPUkUsIGVsLmlubmVyVGV4dClcbiAgICAgICAgfVxuICAgICAgICBpZihkaXNhYmxlVGV4dCAhPT0gXCJcIil7IGVsLmlubmVyVGV4dCA9IGRpc2FibGVUZXh0IH1cbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIilcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBbbmV3UmVmLCBlbGVtZW50cywgb3B0c11cbiAgfVxuXG4gIGNvbXBvbmVudElEKGVsKXtcbiAgICBsZXQgY2lkID0gZWwuZ2V0QXR0cmlidXRlICYmIGVsLmdldEF0dHJpYnV0ZShQSFhfQ09NUE9ORU5UKVxuICAgIHJldHVybiBjaWQgPyBwYXJzZUludChjaWQpIDogbnVsbFxuICB9XG5cbiAgdGFyZ2V0Q29tcG9uZW50SUQodGFyZ2V0LCB0YXJnZXRDdHgsIG9wdHMgPSB7fSl7XG4gICAgaWYoaXNDaWQodGFyZ2V0Q3R4KSl7IHJldHVybiB0YXJnZXRDdHggfVxuXG4gICAgbGV0IGNpZE9yU2VsZWN0b3IgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcInRhcmdldFwiKSlcbiAgICBpZihpc0NpZChjaWRPclNlbGVjdG9yKSl7XG4gICAgICByZXR1cm4gcGFyc2VJbnQoY2lkT3JTZWxlY3RvcilcbiAgICB9IGVsc2UgaWYodGFyZ2V0Q3R4ICYmIChjaWRPclNlbGVjdG9yICE9PSBudWxsIHx8IG9wdHMudGFyZ2V0KSl7XG4gICAgICByZXR1cm4gdGhpcy5jbG9zZXN0Q29tcG9uZW50SUQodGFyZ2V0Q3R4KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNsb3Nlc3RDb21wb25lbnRJRCh0YXJnZXRDdHgpe1xuICAgIGlmKGlzQ2lkKHRhcmdldEN0eCkpe1xuICAgICAgcmV0dXJuIHRhcmdldEN0eFxuICAgIH0gZWxzZSBpZih0YXJnZXRDdHgpe1xuICAgICAgcmV0dXJuIG1heWJlKHRhcmdldEN0eC5jbG9zZXN0KGBbJHtQSFhfQ09NUE9ORU5UfV1gKSwgZWwgPT4gdGhpcy5vd25zRWxlbWVudChlbCkgJiYgdGhpcy5jb21wb25lbnRJRChlbCkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgcHVzaEhvb2tFdmVudCh0YXJnZXRDdHgsIGV2ZW50LCBwYXlsb2FkLCBvblJlcGx5KXtcbiAgICBpZighdGhpcy5pc0Nvbm5lY3RlZCgpKXtcbiAgICAgIHRoaXMubG9nKFwiaG9va1wiLCAoKSA9PiBbXCJ1bmFibGUgdG8gcHVzaCBob29rIGV2ZW50LiBMaXZlVmlldyBub3QgY29ubmVjdGVkXCIsIGV2ZW50LCBwYXlsb2FkXSlcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBsZXQgW3JlZiwgZWxzLCBvcHRzXSA9IHRoaXMucHV0UmVmKFtdLCBcImhvb2tcIilcbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkoKCkgPT4gW3JlZiwgZWxzLCBvcHRzXSwgXCJldmVudFwiLCB7XG4gICAgICB0eXBlOiBcImhvb2tcIixcbiAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgIHZhbHVlOiBwYXlsb2FkLFxuICAgICAgY2lkOiB0aGlzLmNsb3Nlc3RDb21wb25lbnRJRCh0YXJnZXRDdHgpXG4gICAgfSwgKHJlc3AsIHJlcGx5KSA9PiBvblJlcGx5KHJlcGx5LCByZWYpKVxuXG4gICAgcmV0dXJuIHJlZlxuICB9XG5cbiAgZXh0cmFjdE1ldGEoZWwsIG1ldGEsIHZhbHVlKXtcbiAgICBsZXQgcHJlZml4ID0gdGhpcy5iaW5kaW5nKFwidmFsdWUtXCIpXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGVsLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspe1xuICAgICAgaWYoIW1ldGEpeyBtZXRhID0ge30gfVxuICAgICAgbGV0IG5hbWUgPSBlbC5hdHRyaWJ1dGVzW2ldLm5hbWVcbiAgICAgIGlmKG5hbWUuc3RhcnRzV2l0aChwcmVmaXgpKXsgbWV0YVtuYW1lLnJlcGxhY2UocHJlZml4LCBcIlwiKV0gPSBlbC5nZXRBdHRyaWJ1dGUobmFtZSkgfVxuICAgIH1cbiAgICBpZihlbC52YWx1ZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIGlmKCFtZXRhKXsgbWV0YSA9IHt9IH1cbiAgICAgIG1ldGEudmFsdWUgPSBlbC52YWx1ZVxuXG4gICAgICBpZihlbC50YWdOYW1lID09PSBcIklOUFVUXCIgJiYgQ0hFQ0tBQkxFX0lOUFVUUy5pbmRleE9mKGVsLnR5cGUpID49IDAgJiYgIWVsLmNoZWNrZWQpe1xuICAgICAgICBkZWxldGUgbWV0YS52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBpZih2YWx1ZSl7XG4gICAgICBpZighbWV0YSl7IG1ldGEgPSB7fSB9XG4gICAgICBmb3IobGV0IGtleSBpbiB2YWx1ZSl7IG1ldGFba2V5XSA9IHZhbHVlW2tleV0gfVxuICAgIH1cbiAgICByZXR1cm4gbWV0YVxuICB9XG5cbiAgcHVzaEV2ZW50KHR5cGUsIGVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBtZXRhLCBvcHRzID0ge30pe1xuICAgIHRoaXMucHVzaFdpdGhSZXBseSgoKSA9PiB0aGlzLnB1dFJlZihbZWxdLCB0eXBlLCBvcHRzKSwgXCJldmVudFwiLCB7XG4gICAgICB0eXBlOiB0eXBlLFxuICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgdmFsdWU6IHRoaXMuZXh0cmFjdE1ldGEoZWwsIG1ldGEsIG9wdHMudmFsdWUpLFxuICAgICAgY2lkOiB0aGlzLnRhcmdldENvbXBvbmVudElEKGVsLCB0YXJnZXRDdHgsIG9wdHMpXG4gICAgfSlcbiAgfVxuXG4gIHB1c2hGaWxlUHJvZ3Jlc3MoZmlsZUVsLCBlbnRyeVJlZiwgcHJvZ3Jlc3MsIG9uUmVwbHkgPSBmdW5jdGlvbiAoKXsgfSl7XG4gICAgdGhpcy5saXZlU29ja2V0LndpdGhpbk93bmVycyhmaWxlRWwuZm9ybSwgKHZpZXcsIHRhcmdldEN0eCkgPT4ge1xuICAgICAgdmlldy5wdXNoV2l0aFJlcGx5KG51bGwsIFwicHJvZ3Jlc3NcIiwge1xuICAgICAgICBldmVudDogZmlsZUVsLmdldEF0dHJpYnV0ZSh2aWV3LmJpbmRpbmcoUEhYX1BST0dSRVNTKSksXG4gICAgICAgIHJlZjogZmlsZUVsLmdldEF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRiksXG4gICAgICAgIGVudHJ5X3JlZjogZW50cnlSZWYsXG4gICAgICAgIHByb2dyZXNzOiBwcm9ncmVzcyxcbiAgICAgICAgY2lkOiB2aWV3LnRhcmdldENvbXBvbmVudElEKGZpbGVFbC5mb3JtLCB0YXJnZXRDdHgpXG4gICAgICB9LCBvblJlcGx5KVxuICAgIH0pXG4gIH1cblxuICBwdXNoSW5wdXQoaW5wdXRFbCwgdGFyZ2V0Q3R4LCBmb3JjZUNpZCwgcGh4RXZlbnQsIG9wdHMsIGNhbGxiYWNrKXtcbiAgICBsZXQgdXBsb2Fkc1xuICAgIGxldCBjaWQgPSBpc0NpZChmb3JjZUNpZCkgPyBmb3JjZUNpZCA6IHRoaXMudGFyZ2V0Q29tcG9uZW50SUQoaW5wdXRFbC5mb3JtLCB0YXJnZXRDdHgpXG4gICAgbGV0IHJlZkdlbmVyYXRvciA9ICgpID0+IHRoaXMucHV0UmVmKFtpbnB1dEVsLCBpbnB1dEVsLmZvcm1dLCBcImNoYW5nZVwiLCBvcHRzKVxuICAgIGxldCBmb3JtRGF0YSA9IHNlcmlhbGl6ZUZvcm0oaW5wdXRFbC5mb3JtLCB7X3RhcmdldDogb3B0cy5fdGFyZ2V0fSlcbiAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmZpbGVzICYmIGlucHV0RWwuZmlsZXMubGVuZ3RoID4gMCl7XG4gICAgICBMaXZlVXBsb2FkZXIudHJhY2tGaWxlcyhpbnB1dEVsLCBBcnJheS5mcm9tKGlucHV0RWwuZmlsZXMpKVxuICAgIH1cbiAgICB1cGxvYWRzID0gTGl2ZVVwbG9hZGVyLnNlcmlhbGl6ZVVwbG9hZHMoaW5wdXRFbClcbiAgICBsZXQgZXZlbnQgPSB7XG4gICAgICB0eXBlOiBcImZvcm1cIixcbiAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgIHVwbG9hZHM6IHVwbG9hZHMsXG4gICAgICBjaWQ6IGNpZFxuICAgIH1cbiAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBcImV2ZW50XCIsIGV2ZW50LCByZXNwID0+IHtcbiAgICAgIERPTS5zaG93RXJyb3IoaW5wdXRFbCwgdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoUEhYX0ZFRURCQUNLX0ZPUikpXG4gICAgICBpZihET00uaXNVcGxvYWRJbnB1dChpbnB1dEVsKSAmJiBpbnB1dEVsLmdldEF0dHJpYnV0ZShcImRhdGEtcGh4LWF1dG8tdXBsb2FkXCIpICE9PSBudWxsKXtcbiAgICAgICAgaWYoTGl2ZVVwbG9hZGVyLmZpbGVzQXdhaXRpbmdQcmVmbGlnaHQoaW5wdXRFbCkubGVuZ3RoID4gMCl7XG4gICAgICAgICAgbGV0IFtyZWYsIF9lbHNdID0gcmVmR2VuZXJhdG9yKClcbiAgICAgICAgICB0aGlzLnVwbG9hZEZpbGVzKGlucHV0RWwuZm9ybSwgdGFyZ2V0Q3R4LCByZWYsIGNpZCwgKF91cGxvYWRzKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhyZXNwKVxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyQXdhaXRpbmdTdWJtaXQoaW5wdXRFbC5mb3JtKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKHJlc3ApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyaWdnZXJBd2FpdGluZ1N1Ym1pdChmb3JtRWwpe1xuICAgIGxldCBhd2FpdGluZ1N1Ym1pdCA9IHRoaXMuZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbClcbiAgICBpZihhd2FpdGluZ1N1Ym1pdCl7XG4gICAgICBsZXQgW19lbCwgX3JlZiwgX29wdHMsIGNhbGxiYWNrXSA9IGF3YWl0aW5nU3VibWl0XG4gICAgICB0aGlzLmNhbmNlbFN1Ym1pdChmb3JtRWwpXG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgZ2V0U2NoZWR1bGVkU3VibWl0KGZvcm1FbCl7XG4gICAgcmV0dXJuIHRoaXMuZm9ybVN1Ym1pdHMuZmluZCgoW2VsLCBfcmVmLCBfb3B0cywgX2NhbGxiYWNrXSkgPT4gZWwuaXNTYW1lTm9kZShmb3JtRWwpKVxuICB9XG5cbiAgc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrKXtcbiAgICBpZih0aGlzLmdldFNjaGVkdWxlZFN1Ym1pdChmb3JtRWwpKXsgcmV0dXJuIHRydWUgfVxuICAgIHRoaXMuZm9ybVN1Ym1pdHMucHVzaChbZm9ybUVsLCByZWYsIG9wdHMsIGNhbGxiYWNrXSlcbiAgfVxuXG4gIGNhbmNlbFN1Ym1pdChmb3JtRWwpe1xuICAgIHRoaXMuZm9ybVN1Ym1pdHMgPSB0aGlzLmZvcm1TdWJtaXRzLmZpbHRlcigoW2VsLCByZWYsIF9jYWxsYmFja10pID0+IHtcbiAgICAgIGlmKGVsLmlzU2FtZU5vZGUoZm9ybUVsKSl7XG4gICAgICAgIHRoaXMudW5kb1JlZnMocmVmKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHB1c2hGb3JtU3VibWl0KGZvcm1FbCwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgb3B0cywgb25SZXBseSl7XG4gICAgbGV0IGZpbHRlcklnbm9yZWQgPSBlbCA9PiB7XG4gICAgICBsZXQgdXNlcklnbm9yZWQgPSBjbG9zZXN0UGh4QmluZGluZyhlbCwgYCR7dGhpcy5iaW5kaW5nKFBIWF9VUERBVEUpfT1pZ25vcmVgLCBlbC5mb3JtKVxuICAgICAgcmV0dXJuICEodXNlcklnbm9yZWQgfHwgY2xvc2VzdFBoeEJpbmRpbmcoZWwsIFwiZGF0YS1waHgtdXBkYXRlPWlnbm9yZVwiLCBlbC5mb3JtKSlcbiAgICB9XG4gICAgbGV0IGZpbHRlckRpc2FibGVzID0gZWwgPT4ge1xuICAgICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0RJU0FCTEVfV0lUSCkpXG4gICAgfVxuICAgIGxldCBmaWx0ZXJCdXR0b24gPSBlbCA9PiBlbC50YWdOYW1lID09IFwiQlVUVE9OXCJcblxuICAgIGxldCBmaWx0ZXJJbnB1dCA9IGVsID0+IFtcIklOUFVUXCIsIFwiVEVYVEFSRUFcIiwgXCJTRUxFQ1RcIl0uaW5jbHVkZXMoZWwudGFnTmFtZSlcblxuICAgIGxldCByZWZHZW5lcmF0b3IgPSAoKSA9PiB7XG4gICAgICBsZXQgZm9ybUVsZW1lbnRzID0gQXJyYXkuZnJvbShmb3JtRWwuZWxlbWVudHMpXG4gICAgICBsZXQgZGlzYWJsZXMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlckRpc2FibGVzKVxuICAgICAgbGV0IGJ1dHRvbnMgPSBmb3JtRWxlbWVudHMuZmlsdGVyKGZpbHRlckJ1dHRvbikuZmlsdGVyKGZpbHRlcklnbm9yZWQpXG4gICAgICBsZXQgaW5wdXRzID0gZm9ybUVsZW1lbnRzLmZpbHRlcihmaWx0ZXJJbnB1dCkuZmlsdGVyKGZpbHRlcklnbm9yZWQpXG5cbiAgICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICBidXR0b24uc2V0QXR0cmlidXRlKFBIWF9ESVNBQkxFRCwgYnV0dG9uLmRpc2FibGVkKVxuICAgICAgICBidXR0b24uZGlzYWJsZWQgPSB0cnVlXG4gICAgICB9KVxuICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4ge1xuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoUEhYX1JFQURPTkxZLCBpbnB1dC5yZWFkT25seSlcbiAgICAgICAgaW5wdXQucmVhZE9ubHkgPSB0cnVlXG4gICAgICAgIGlmKGlucHV0LmZpbGVzKXtcbiAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoUEhYX0RJU0FCTEVELCBpbnB1dC5kaXNhYmxlZClcbiAgICAgICAgICBpbnB1dC5kaXNhYmxlZCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIGZvcm1FbC5zZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9QQUdFX0xPQURJTkcpLCBcIlwiKVxuICAgICAgcmV0dXJuIHRoaXMucHV0UmVmKFtmb3JtRWxdLmNvbmNhdChkaXNhYmxlcykuY29uY2F0KGJ1dHRvbnMpLmNvbmNhdChpbnB1dHMpLCBcInN1Ym1pdFwiLCBvcHRzKVxuICAgIH1cblxuICAgIGxldCBjaWQgPSB0aGlzLnRhcmdldENvbXBvbmVudElEKGZvcm1FbCwgdGFyZ2V0Q3R4KVxuICAgIGlmKExpdmVVcGxvYWRlci5oYXNVcGxvYWRzSW5Qcm9ncmVzcyhmb3JtRWwpKXtcbiAgICAgIGxldCBbcmVmLCBfZWxzXSA9IHJlZkdlbmVyYXRvcigpXG4gICAgICBsZXQgcHVzaCA9ICgpID0+IHRoaXMucHVzaEZvcm1TdWJtaXQoZm9ybUVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBvcHRzLCBvblJlcGx5KVxuICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVTdWJtaXQoZm9ybUVsLCByZWYsIG9wdHMsIHB1c2gpXG4gICAgfSBlbHNlIGlmKExpdmVVcGxvYWRlci5pbnB1dHNBd2FpdGluZ1ByZWZsaWdodChmb3JtRWwpLmxlbmd0aCA+IDApe1xuICAgICAgbGV0IFtyZWYsIGVsc10gPSByZWZHZW5lcmF0b3IoKVxuICAgICAgbGV0IHByb3h5UmVmR2VuID0gKCkgPT4gW3JlZiwgZWxzLCBvcHRzXVxuICAgICAgdGhpcy51cGxvYWRGaWxlcyhmb3JtRWwsIHRhcmdldEN0eCwgcmVmLCBjaWQsIChfdXBsb2FkcykgPT4ge1xuICAgICAgICBsZXQgZm9ybURhdGEgPSBzZXJpYWxpemVGb3JtKGZvcm1FbCwge30pXG4gICAgICAgIHRoaXMucHVzaFdpdGhSZXBseShwcm94eVJlZkdlbiwgXCJldmVudFwiLCB7XG4gICAgICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICAgICAgZXZlbnQ6IHBoeEV2ZW50LFxuICAgICAgICAgIHZhbHVlOiBmb3JtRGF0YSxcbiAgICAgICAgICBjaWQ6IGNpZFxuICAgICAgICB9LCBvblJlcGx5KVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGZvcm1EYXRhID0gc2VyaWFsaXplRm9ybShmb3JtRWwpXG4gICAgICB0aGlzLnB1c2hXaXRoUmVwbHkocmVmR2VuZXJhdG9yLCBcImV2ZW50XCIsIHtcbiAgICAgICAgdHlwZTogXCJmb3JtXCIsXG4gICAgICAgIGV2ZW50OiBwaHhFdmVudCxcbiAgICAgICAgdmFsdWU6IGZvcm1EYXRhLFxuICAgICAgICBjaWQ6IGNpZFxuICAgICAgfSwgb25SZXBseSlcbiAgICB9XG4gIH1cblxuICB1cGxvYWRGaWxlcyhmb3JtRWwsIHRhcmdldEN0eCwgcmVmLCBjaWQsIG9uQ29tcGxldGUpe1xuICAgIGxldCBqb2luQ291bnRBdFVwbG9hZCA9IHRoaXMuam9pbkNvdW50XG4gICAgbGV0IGlucHV0RWxzID0gTGl2ZVVwbG9hZGVyLmFjdGl2ZUZpbGVJbnB1dHMoZm9ybUVsKVxuICAgIGxldCBudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcyA9IGlucHV0RWxzLmxlbmd0aFxuXG4gICAgLy8gZ2V0IGVhY2ggZmlsZSBpbnB1dFxuICAgIGlucHV0RWxzLmZvckVhY2goaW5wdXRFbCA9PiB7XG4gICAgICBsZXQgdXBsb2FkZXIgPSBuZXcgTGl2ZVVwbG9hZGVyKGlucHV0RWwsIHRoaXMsICgpID0+IHtcbiAgICAgICAgbnVtRmlsZUlucHV0c0luUHJvZ3Jlc3MtLVxuICAgICAgICBpZihudW1GaWxlSW5wdXRzSW5Qcm9ncmVzcyA9PT0gMCl7IG9uQ29tcGxldGUoKSB9XG4gICAgICB9KTtcblxuICAgICAgdGhpcy51cGxvYWRlcnNbaW5wdXRFbF0gPSB1cGxvYWRlclxuICAgICAgbGV0IGVudHJpZXMgPSB1cGxvYWRlci5lbnRyaWVzKCkubWFwKGVudHJ5ID0+IGVudHJ5LnRvUHJlZmxpZ2h0UGF5bG9hZCgpKVxuXG4gICAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgICAgcmVmOiBpbnB1dEVsLmdldEF0dHJpYnV0ZShQSFhfVVBMT0FEX1JFRiksXG4gICAgICAgIGVudHJpZXM6IGVudHJpZXMsXG4gICAgICAgIGNpZDogdGhpcy50YXJnZXRDb21wb25lbnRJRChpbnB1dEVsLmZvcm0sIHRhcmdldEN0eClcbiAgICAgIH1cblxuICAgICAgdGhpcy5sb2coXCJ1cGxvYWRcIiwgKCkgPT4gW1wic2VuZGluZyBwcmVmbGlnaHQgcmVxdWVzdFwiLCBwYXlsb2FkXSlcblxuICAgICAgdGhpcy5wdXNoV2l0aFJlcGx5KG51bGwsIFwiYWxsb3dfdXBsb2FkXCIsIHBheWxvYWQsIHJlc3AgPT4ge1xuICAgICAgICB0aGlzLmxvZyhcInVwbG9hZFwiLCAoKSA9PiBbXCJnb3QgcHJlZmxpZ2h0IHJlc3BvbnNlXCIsIHJlc3BdKVxuICAgICAgICBpZihyZXNwLmVycm9yKXtcbiAgICAgICAgICB0aGlzLnVuZG9SZWZzKHJlZilcbiAgICAgICAgICBsZXQgW2VudHJ5X3JlZiwgcmVhc29uXSA9IHJlc3AuZXJyb3JcbiAgICAgICAgICB0aGlzLmxvZyhcInVwbG9hZFwiLCAoKSA9PiBbYGVycm9yIGZvciBlbnRyeSAke2VudHJ5X3JlZn1gLCByZWFzb25dKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxldCBvbkVycm9yID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNoYW5uZWwub25FcnJvcigoKSA9PiB7XG4gICAgICAgICAgICAgIGlmKHRoaXMuam9pbkNvdW50ID09PSBqb2luQ291bnRBdFVwbG9hZCl7IGNhbGxiYWNrKCkgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBsb2FkZXIuaW5pdEFkYXB0ZXJVcGxvYWQocmVzcCwgb25FcnJvciwgdGhpcy5saXZlU29ja2V0KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBkaXNwYXRjaFVwbG9hZHMobmFtZSwgZmlsZXNPckJsb2JzKXtcbiAgICBsZXQgaW5wdXRzID0gRE9NLmZpbmRVcGxvYWRJbnB1dHModGhpcy5lbCkuZmlsdGVyKGVsID0+IGVsLm5hbWUgPT09IG5hbWUpXG4gICAgaWYoaW5wdXRzLmxlbmd0aCA9PT0gMCl7IGxvZ0Vycm9yKGBubyBsaXZlIGZpbGUgaW5wdXRzIGZvdW5kIG1hdGNoaW5nIHRoZSBuYW1lIFwiJHtuYW1lfVwiYCkgfVxuICAgIGVsc2UgaWYoaW5wdXRzLmxlbmd0aCA+IDEpeyBsb2dFcnJvcihgZHVwbGljYXRlIGxpdmUgZmlsZSBpbnB1dHMgZm91bmQgbWF0Y2hpbmcgdGhlIG5hbWUgXCIke25hbWV9XCJgKSB9XG4gICAgZWxzZSB7IERPTS5kaXNwYXRjaEV2ZW50KGlucHV0c1swXSwgUEhYX1RSQUNLX1VQTE9BRFMsIHtmaWxlczogZmlsZXNPckJsb2JzfSkgfVxuICB9XG5cbiAgcHVzaEZvcm1SZWNvdmVyeShmb3JtLCBuZXdDaWQsIGNhbGxiYWNrKXtcbiAgICB0aGlzLmxpdmVTb2NrZXQud2l0aGluT3duZXJzKGZvcm0sICh2aWV3LCB0YXJnZXRDdHgpID0+IHtcbiAgICAgIGxldCBpbnB1dCA9IGZvcm0uZWxlbWVudHNbMF1cbiAgICAgIGxldCBwaHhFdmVudCA9IGZvcm0uZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfQVVUT19SRUNPVkVSKSkgfHwgZm9ybS5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFwiY2hhbmdlXCIpKVxuXG4gICAgICBKUy5leGVjKFwiY2hhbmdlXCIsIHBoeEV2ZW50LCB2aWV3LCBpbnB1dCwgW1wicHVzaFwiLCB7X3RhcmdldDogaW5wdXQubmFtZSwgbmV3Q2lkOiBuZXdDaWQsIGNhbGxiYWNrOiBjYWxsYmFja31dKVxuICAgIH0pXG4gIH1cblxuICBwdXNoTGlua1BhdGNoKGhyZWYsIHRhcmdldEVsLCBjYWxsYmFjayl7XG4gICAgbGV0IGxpbmtSZWYgPSB0aGlzLmxpdmVTb2NrZXQuc2V0UGVuZGluZ0xpbmsoaHJlZilcbiAgICBsZXQgcmVmR2VuID0gdGFyZ2V0RWwgPyAoKSA9PiB0aGlzLnB1dFJlZihbdGFyZ2V0RWxdLCBcImNsaWNrXCIpIDogbnVsbFxuICAgIGxldCBmYWxsYmFjayA9ICgpID0+IHRoaXMubGl2ZVNvY2tldC5yZWRpcmVjdCh3aW5kb3cubG9jYXRpb24uaHJlZilcblxuICAgIGxldCBwdXNoID0gdGhpcy5wdXNoV2l0aFJlcGx5KHJlZkdlbiwgXCJsaXZlX3BhdGNoXCIsIHt1cmw6IGhyZWZ9LCByZXNwID0+IHtcbiAgICAgIHRoaXMubGl2ZVNvY2tldC5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgaWYocmVzcC5saW5rX3JlZGlyZWN0KXtcbiAgICAgICAgICB0aGlzLmxpdmVTb2NrZXQucmVwbGFjZU1haW4oaHJlZiwgbnVsbCwgY2FsbGJhY2ssIGxpbmtSZWYpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYodGhpcy5saXZlU29ja2V0LmNvbW1pdFBlbmRpbmdMaW5rKGxpbmtSZWYpKXtcbiAgICAgICAgICAgIHRoaXMuaHJlZiA9IGhyZWZcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5hcHBseVBlbmRpbmdVcGRhdGVzKClcbiAgICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhsaW5rUmVmKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG5cbiAgICBpZihwdXNoKXtcbiAgICAgIHB1c2gucmVjZWl2ZShcInRpbWVvdXRcIiwgZmFsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIGZhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICBmb3Jtc0ZvclJlY292ZXJ5KGh0bWwpe1xuICAgIGlmKHRoaXMuam9pbkNvdW50ID09PSAwKXsgcmV0dXJuIFtdIH1cblxuICAgIGxldCBwaHhDaGFuZ2UgPSB0aGlzLmJpbmRpbmcoXCJjaGFuZ2VcIilcbiAgICBsZXQgdGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIilcbiAgICB0ZW1wbGF0ZS5pbm5lckhUTUwgPSBodG1sXG5cbiAgICByZXR1cm4gKFxuICAgICAgRE9NLmFsbCh0aGlzLmVsLCBgZm9ybVske3BoeENoYW5nZX1dYClcbiAgICAgICAgLmZpbHRlcihmb3JtID0+IGZvcm0uaWQgJiYgdGhpcy5vd25zRWxlbWVudChmb3JtKSlcbiAgICAgICAgLmZpbHRlcihmb3JtID0+IGZvcm0uZWxlbWVudHMubGVuZ3RoID4gMClcbiAgICAgICAgLmZpbHRlcihmb3JtID0+IGZvcm0uZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhQSFhfQVVUT19SRUNPVkVSKSkgIT09IFwiaWdub3JlXCIpXG4gICAgICAgIC5tYXAoZm9ybSA9PiB7XG4gICAgICAgICAgbGV0IG5ld0Zvcm0gPSB0ZW1wbGF0ZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoYGZvcm1baWQ9XCIke2Zvcm0uaWR9XCJdWyR7cGh4Q2hhbmdlfT1cIiR7Zm9ybS5nZXRBdHRyaWJ1dGUocGh4Q2hhbmdlKX1cIl1gKVxuICAgICAgICAgIGlmKG5ld0Zvcm0pe1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtLCBuZXdGb3JtLCB0aGlzLnRhcmdldENvbXBvbmVudElEKG5ld0Zvcm0pXVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm0sIG51bGwsIG51bGxdXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuZmlsdGVyKChbZm9ybSwgbmV3Rm9ybSwgbmV3Q2lkXSkgPT4gbmV3Rm9ybSlcbiAgICApXG4gIH1cblxuICBtYXliZVB1c2hDb21wb25lbnRzRGVzdHJveWVkKGRlc3Ryb3llZENJRHMpe1xuICAgIGxldCB3aWxsRGVzdHJveUNJRHMgPSBkZXN0cm95ZWRDSURzLmZpbHRlcihjaWQgPT4ge1xuICAgICAgcmV0dXJuIERPTS5maW5kQ29tcG9uZW50Tm9kZUxpc3QodGhpcy5lbCwgY2lkKS5sZW5ndGggPT09IDBcbiAgICB9KVxuICAgIGlmKHdpbGxEZXN0cm95Q0lEcy5sZW5ndGggPiAwKXtcbiAgICAgIHRoaXMucHJ1bmluZ0NJRHMucHVzaCguLi53aWxsRGVzdHJveUNJRHMpXG5cbiAgICAgIHRoaXMucHVzaFdpdGhSZXBseShudWxsLCBcImNpZHNfd2lsbF9kZXN0cm95XCIsIHtjaWRzOiB3aWxsRGVzdHJveUNJRHN9LCAoKSA9PiB7XG4gICAgICAgIC8vIFRoZSBjaWRzIGFyZSBlaXRoZXIgYmFjayBvbiB0aGUgcGFnZSBvciB0aGV5IHdpbGwgYmUgZnVsbHkgcmVtb3ZlZCxcbiAgICAgICAgLy8gc28gd2UgY2FuIHJlbW92ZSB0aGVtIGZyb20gdGhlIHBydW5pbmdDSURzLlxuICAgICAgICB0aGlzLnBydW5pbmdDSURzID0gdGhpcy5wcnVuaW5nQ0lEcy5maWx0ZXIoY2lkID0+IHdpbGxEZXN0cm95Q0lEcy5pbmRleE9mKGNpZCkgIT09IC0xKVxuXG4gICAgICAgIC8vIFNlZSBpZiBhbnkgb2YgdGhlIGNpZHMgd2Ugd2FudGVkIHRvIGRlc3Ryb3kgd2VyZSBhZGRlZCBiYWNrLFxuICAgICAgICAvLyBpZiB0aGV5IHdlcmUgYWRkZWQgYmFjaywgd2UgZG9uJ3QgYWN0dWFsbHkgZGVzdHJveSB0aGVtLlxuICAgICAgICBsZXQgY29tcGxldGVseURlc3Ryb3lDSURzID0gd2lsbERlc3Ryb3lDSURzLmZpbHRlcihjaWQgPT4ge1xuICAgICAgICAgIHJldHVybiBET00uZmluZENvbXBvbmVudE5vZGVMaXN0KHRoaXMuZWwsIGNpZCkubGVuZ3RoID09PSAwXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYoY29tcGxldGVseURlc3Ryb3lDSURzLmxlbmd0aCA+IDApe1xuICAgICAgICAgIHRoaXMucHVzaFdpdGhSZXBseShudWxsLCBcImNpZHNfZGVzdHJveWVkXCIsIHtjaWRzOiBjb21wbGV0ZWx5RGVzdHJveUNJRHN9LCAocmVzcCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZC5wcnVuZUNJRHMocmVzcC5jaWRzKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgb3duc0VsZW1lbnQoZWwpe1xuICAgIHJldHVybiBlbC5nZXRBdHRyaWJ1dGUoUEhYX1BBUkVOVF9JRCkgPT09IHRoaXMuaWQgfHxcbiAgICAgIG1heWJlKGVsLmNsb3Nlc3QoUEhYX1ZJRVdfU0VMRUNUT1IpLCBub2RlID0+IG5vZGUuaWQpID09PSB0aGlzLmlkXG4gIH1cblxuICBzdWJtaXRGb3JtKGZvcm0sIHRhcmdldEN0eCwgcGh4RXZlbnQsIG9wdHMgPSB7fSl7XG4gICAgRE9NLnB1dFByaXZhdGUoZm9ybSwgUEhYX0hBU19TVUJNSVRURUQsIHRydWUpXG4gICAgbGV0IHBoeEZlZWRiYWNrID0gdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoUEhYX0ZFRURCQUNLX0ZPUilcbiAgICBsZXQgaW5wdXRzID0gQXJyYXkuZnJvbShmb3JtLmVsZW1lbnRzKVxuICAgIHRoaXMubGl2ZVNvY2tldC5ibHVyQWN0aXZlRWxlbWVudCh0aGlzKVxuICAgIHRoaXMucHVzaEZvcm1TdWJtaXQoZm9ybSwgdGFyZ2V0Q3R4LCBwaHhFdmVudCwgb3B0cywgKCkgPT4ge1xuICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4gRE9NLnNob3dFcnJvcihpbnB1dCwgcGh4RmVlZGJhY2spKVxuICAgICAgdGhpcy5saXZlU29ja2V0LnJlc3RvcmVQcmV2aW91c2x5QWN0aXZlRm9jdXMoKVxuICAgIH0pXG4gIH1cblxuICBiaW5kaW5nKGtpbmQpeyByZXR1cm4gdGhpcy5saXZlU29ja2V0LmJpbmRpbmcoa2luZCkgfVxufVxuIiwgIi8qKiBJbml0aWFsaXplcyB0aGUgTGl2ZVNvY2tldFxuICpcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZW5kUG9pbnQgLSBUaGUgc3RyaW5nIFdlYlNvY2tldCBlbmRwb2ludCwgaWUsIGBcIndzczovL2V4YW1wbGUuY29tL2xpdmVcImAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFwiL2xpdmVcImAgKGluaGVyaXRlZCBob3N0ICYgcHJvdG9jb2wpXG4gKiBAcGFyYW0ge1Bob2VuaXguU29ja2V0fSBzb2NrZXQgLSB0aGUgcmVxdWlyZWQgUGhvZW5peCBTb2NrZXQgY2xhc3MgaW1wb3J0ZWQgZnJvbSBcInBob2VuaXhcIi4gRm9yIGV4YW1wbGU6XG4gKlxuICogICAgIGltcG9ydCB7U29ja2V0fSBmcm9tIFwicGhvZW5peFwiXG4gKiAgICAgaW1wb3J0IHtMaXZlU29ja2V0fSBmcm9tIFwicGhvZW5peF9saXZlX3ZpZXdcIlxuICogICAgIGxldCBsaXZlU29ja2V0ID0gbmV3IExpdmVTb2NrZXQoXCIvbGl2ZVwiLCBTb2NrZXQsIHsuLi59KVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0c10gLSBPcHRpb25hbCBjb25maWd1cmF0aW9uLiBPdXRzaWRlIG9mIGtleXMgbGlzdGVkIGJlbG93LCBhbGxcbiAqIGNvbmZpZ3VyYXRpb24gaXMgcGFzc2VkIGRpcmVjdGx5IHRvIHRoZSBQaG9lbml4IFNvY2tldCBjb25zdHJ1Y3Rvci5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5kZWZhdWx0c10gLSBUaGUgb3B0aW9uYWwgZGVmYXVsdHMgdG8gdXNlIGZvciB2YXJpb3VzIGJpbmRpbmdzLFxuICogc3VjaCBhcyBgcGh4LWRlYm91bmNlYC4gU3VwcG9ydHMgdGhlIGZvbGxvd2luZyBrZXlzOlxuICpcbiAqICAgLSBkZWJvdW5jZSAtIHRoZSBtaWxsaXNlY29uZCBwaHgtZGVib3VuY2UgdGltZS4gRGVmYXVsdHMgMzAwXG4gKiAgIC0gdGhyb3R0bGUgLSB0aGUgbWlsbGlzZWNvbmQgcGh4LXRocm90dGxlIHRpbWUuIERlZmF1bHRzIDMwMFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnBhcmFtc10gLSBUaGUgb3B0aW9uYWwgZnVuY3Rpb24gZm9yIHBhc3NpbmcgY29ubmVjdCBwYXJhbXMuXG4gKiBUaGUgZnVuY3Rpb24gcmVjZWl2ZXMgdGhlIGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIGEgZ2l2ZW4gTGl2ZVZpZXcuIEZvciBleGFtcGxlOlxuICpcbiAqICAgICAoZWwpID0+IHt2aWV3OiBlbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW15LXZpZXctbmFtZVwiLCB0b2tlbjogd2luZG93Lm15VG9rZW59XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRzLmJpbmRpbmdQcmVmaXhdIC0gVGhlIG9wdGlvbmFsIHByZWZpeCB0byB1c2UgZm9yIGFsbCBwaHggRE9NIGFubm90YXRpb25zLlxuICogRGVmYXVsdHMgdG8gXCJwaHgtXCIuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMuaG9va3NdIC0gVGhlIG9wdGlvbmFsIG9iamVjdCBmb3IgcmVmZXJlbmNpbmcgTGl2ZVZpZXcgaG9vayBjYWxsYmFja3MuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdHMudXBsb2FkZXJzXSAtIFRoZSBvcHRpb25hbCBvYmplY3QgZm9yIHJlZmVyZW5jaW5nIExpdmVWaWV3IHVwbG9hZGVyIGNhbGxiYWNrcy5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMubG9hZGVyVGltZW91dF0gLSBUaGUgb3B0aW9uYWwgZGVsYXkgaW4gbWlsbGlzZWNvbmRzIHRvIHdhaXQgYmVmb3JlIGFwcGx5XG4gKiBsb2FkaW5nIHN0YXRlcy5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMubWF4UmVsb2Fkc10gLSBUaGUgbWF4aW11bSByZWxvYWRzIGJlZm9yZSBlbnRlcmluZyBmYWlsc2FmZSBtb2RlLlxuICogQHBhcmFtIHtpbnRlZ2VyfSBbb3B0cy5yZWxvYWRKaXR0ZXJNaW5dIC0gVGhlIG1pbmltdW0gdGltZSBiZXR3ZWVuIG5vcm1hbCByZWxvYWQgYXR0ZW1wdHMuXG4gKiBAcGFyYW0ge2ludGVnZXJ9IFtvcHRzLnJlbG9hZEppdHRlck1heF0gLSBUaGUgbWF4aW11bSB0aW1lIGJldHdlZW4gbm9ybWFsIHJlbG9hZCBhdHRlbXB0cy5cbiAqIEBwYXJhbSB7aW50ZWdlcn0gW29wdHMuZmFpbHNhZmVKaXR0ZXJdIC0gVGhlIHRpbWUgYmV0d2VlbiByZWxvYWQgYXR0ZW1wdHMgaW4gZmFpbHNhZmUgbW9kZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtvcHRzLnZpZXdMb2dnZXJdIC0gVGhlIG9wdGlvbmFsIGZ1bmN0aW9uIHRvIGxvZyBkZWJ1ZyBpbmZvcm1hdGlvbi4gRm9yIGV4YW1wbGU6XG4gKlxuICogICAgICh2aWV3LCBraW5kLCBtc2csIG9iaikgPT4gY29uc29sZS5sb2coYCR7dmlldy5pZH0gJHtraW5kfTogJHttc2d9IC0gYCwgb2JqKVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5tZXRhZGF0YV0gLSBUaGUgb3B0aW9uYWwgb2JqZWN0IG1hcHBpbmcgZXZlbnQgbmFtZXMgdG8gZnVuY3Rpb25zIGZvclxuICogcG9wdWxhdGluZyBldmVudCBtZXRhZGF0YS4gRm9yIGV4YW1wbGU6XG4gKlxuICogICAgIG1ldGFkYXRhOiB7XG4gKiAgICAgICBjbGljazogKGUsIGVsKSA9PiB7XG4gKiAgICAgICAgIHJldHVybiB7XG4gKiAgICAgICAgICAgY3RybEtleTogZS5jdHJsS2V5LFxuICogICAgICAgICAgIG1ldGFLZXk6IGUubWV0YUtleSxcbiAqICAgICAgICAgICBkZXRhaWw6IGUuZGV0YWlsIHx8IDEsXG4gKiAgICAgICAgIH1cbiAqICAgICAgIH0sXG4gKiAgICAgICBrZXlkb3duOiAoZSwgZWwpID0+IHtcbiAqICAgICAgICAgcmV0dXJuIHtcbiAqICAgICAgICAgICBrZXk6IGUua2V5LFxuICogICAgICAgICAgIGN0cmxLZXk6IGUuY3RybEtleSxcbiAqICAgICAgICAgICBtZXRhS2V5OiBlLm1ldGFLZXksXG4gKiAgICAgICAgICAgc2hpZnRLZXk6IGUuc2hpZnRLZXlcbiAqICAgICAgICAgfVxuICogICAgICAgfVxuICogICAgIH1cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0cy5zZXNzaW9uU3RvcmFnZV0gLSBBbiBvcHRpb25hbCBTdG9yYWdlIGNvbXBhdGlibGUgb2JqZWN0XG4gKiBVc2VmdWwgd2hlbiBMaXZlVmlldyB3b24ndCBoYXZlIGFjY2VzcyB0byBgc2Vzc2lvblN0b3JhZ2VgLiAgRm9yIGV4YW1wbGUsIFRoaXMgY291bGRcbiAqIGhhcHBlbiBpZiBhIHNpdGUgbG9hZHMgYSBjcm9zcy1kb21haW4gTGl2ZVZpZXcgaW4gYW4gaWZyYW1lLiAgRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiAgICAgY2xhc3MgSW5NZW1vcnlTdG9yYWdlIHtcbiAqICAgICAgIGNvbnN0cnVjdG9yKCkgeyB0aGlzLnN0b3JhZ2UgPSB7fSB9XG4gKiAgICAgICBnZXRJdGVtKGtleU5hbWUpIHsgcmV0dXJuIHRoaXMuc3RvcmFnZVtrZXlOYW1lXSB9XG4gKiAgICAgICByZW1vdmVJdGVtKGtleU5hbWUpIHsgZGVsZXRlIHRoaXMuc3RvcmFnZVtrZXlOYW1lXSB9XG4gKiAgICAgICBzZXRJdGVtKGtleU5hbWUsIGtleVZhbHVlKSB7IHRoaXMuc3RvcmFnZVtrZXlOYW1lXSA9IGtleVZhbHVlIH1cbiAqICAgICB9XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRzLmxvY2FsU3RvcmFnZV0gLSBBbiBvcHRpb25hbCBTdG9yYWdlIGNvbXBhdGlibGUgb2JqZWN0XG4gKiBVc2VmdWwgZm9yIHdoZW4gTGl2ZVZpZXcgd29uJ3QgaGF2ZSBhY2Nlc3MgdG8gYGxvY2FsU3RvcmFnZWAuXG4gKiBTZWUgYG9wdHMuc2Vzc2lvblN0b3JhZ2VgIGZvciBleGFtcGxlcy5cbiovXG5cbmltcG9ydCB7XG4gIEJJTkRJTkdfUFJFRklYLFxuICBDT05TRUNVVElWRV9SRUxPQURTLFxuICBERUZBVUxUUyxcbiAgRkFJTFNBRkVfSklUVEVSLFxuICBMT0FERVJfVElNRU9VVCxcbiAgTUFYX1JFTE9BRFMsXG4gIFBIWF9ERUJPVU5DRSxcbiAgUEhYX0RST1BfVEFSR0VULFxuICBQSFhfSEFTX0ZPQ1VTRUQsXG4gIFBIWF9LRVksXG4gIFBIWF9MSU5LX1NUQVRFLFxuICBQSFhfTElWRV9MSU5LLFxuICBQSFhfTFZfREVCVUcsXG4gIFBIWF9MVl9MQVRFTkNZX1NJTSxcbiAgUEhYX0xWX1BST0ZJTEUsXG4gIFBIWF9NQUlOLFxuICBQSFhfUEFSRU5UX0lELFxuICBQSFhfVklFV19TRUxFQ1RPUixcbiAgUEhYX1JPT1RfSUQsXG4gIFBIWF9USFJPVFRMRSxcbiAgUEhYX1RSQUNLX1VQTE9BRFMsXG4gIFBIWF9TRVNTSU9OLFxuICBSRUxPQURfSklUVEVSX01JTixcbiAgUkVMT0FEX0pJVFRFUl9NQVgsXG59IGZyb20gXCIuL2NvbnN0YW50c1wiXG5cbmltcG9ydCB7XG4gIGNsb25lLFxuICBjbG9zZXN0UGh4QmluZGluZyxcbiAgY2xvc3VyZSxcbiAgZGVidWcsXG4gIGlzT2JqZWN0LFxuICBtYXliZVxufSBmcm9tIFwiLi91dGlsc1wiXG5cbmltcG9ydCBCcm93c2VyIGZyb20gXCIuL2Jyb3dzZXJcIlxuaW1wb3J0IERPTSBmcm9tIFwiLi9kb21cIlxuaW1wb3J0IEhvb2tzIGZyb20gXCIuL2hvb2tzXCJcbmltcG9ydCBMaXZlVXBsb2FkZXIgZnJvbSBcIi4vbGl2ZV91cGxvYWRlclwiXG5pbXBvcnQgVmlldyBmcm9tIFwiLi92aWV3XCJcbmltcG9ydCBKUyBmcm9tIFwiLi9qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpdmVTb2NrZXQge1xuICBjb25zdHJ1Y3Rvcih1cmwsIHBoeFNvY2tldCwgb3B0cyA9IHt9KXtcbiAgICB0aGlzLnVubG9hZGVkID0gZmFsc2VcbiAgICBpZighcGh4U29ja2V0IHx8IHBoeFNvY2tldC5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIk9iamVjdFwiKXtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgXG4gICAgICBhIHBob2VuaXggU29ja2V0IG11c3QgYmUgcHJvdmlkZWQgYXMgdGhlIHNlY29uZCBhcmd1bWVudCB0byB0aGUgTGl2ZVNvY2tldCBjb25zdHJ1Y3Rvci4gRm9yIGV4YW1wbGU6XG5cbiAgICAgICAgICBpbXBvcnQge1NvY2tldH0gZnJvbSBcInBob2VuaXhcIlxuICAgICAgICAgIGltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbiAgICAgICAgICBsZXQgbGl2ZVNvY2tldCA9IG5ldyBMaXZlU29ja2V0KFwiL2xpdmVcIiwgU29ja2V0LCB7Li4ufSlcbiAgICAgIGApXG4gICAgfVxuICAgIHRoaXMuc29ja2V0ID0gbmV3IHBoeFNvY2tldCh1cmwsIG9wdHMpXG4gICAgdGhpcy5iaW5kaW5nUHJlZml4ID0gb3B0cy5iaW5kaW5nUHJlZml4IHx8IEJJTkRJTkdfUFJFRklYXG4gICAgdGhpcy5vcHRzID0gb3B0c1xuICAgIHRoaXMucGFyYW1zID0gY2xvc3VyZShvcHRzLnBhcmFtcyB8fCB7fSlcbiAgICB0aGlzLnZpZXdMb2dnZXIgPSBvcHRzLnZpZXdMb2dnZXJcbiAgICB0aGlzLm1ldGFkYXRhQ2FsbGJhY2tzID0gb3B0cy5tZXRhZGF0YSB8fCB7fVxuICAgIHRoaXMuZGVmYXVsdHMgPSBPYmplY3QuYXNzaWduKGNsb25lKERFRkFVTFRTKSwgb3B0cy5kZWZhdWx0cyB8fCB7fSlcbiAgICB0aGlzLmFjdGl2ZUVsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5wcmV2QWN0aXZlID0gbnVsbFxuICAgIHRoaXMuc2lsZW5jZWQgPSBmYWxzZVxuICAgIHRoaXMubWFpbiA9IG51bGxcbiAgICB0aGlzLmxpbmtSZWYgPSAxXG4gICAgdGhpcy5jbGlja1JlZiA9IDFcbiAgICB0aGlzLnJvb3RzID0ge31cbiAgICB0aGlzLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgIHRoaXMucGVuZGluZ0xpbmsgPSBudWxsXG4gICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjbG9uZSh3aW5kb3cubG9jYXRpb24pXG4gICAgdGhpcy5ob29rcyA9IG9wdHMuaG9va3MgfHwge31cbiAgICB0aGlzLnVwbG9hZGVycyA9IG9wdHMudXBsb2FkZXJzIHx8IHt9XG4gICAgdGhpcy5sb2FkZXJUaW1lb3V0ID0gb3B0cy5sb2FkZXJUaW1lb3V0IHx8IExPQURFUl9USU1FT1VUXG4gICAgdGhpcy5tYXhSZWxvYWRzID0gb3B0cy5tYXhSZWxvYWRzIHx8IE1BWF9SRUxPQURTXG4gICAgdGhpcy5yZWxvYWRKaXR0ZXJNaW4gPSBvcHRzLnJlbG9hZEppdHRlck1pbiB8fCBSRUxPQURfSklUVEVSX01JTlxuICAgIHRoaXMucmVsb2FkSml0dGVyTWF4ID0gb3B0cy5yZWxvYWRKaXR0ZXJNYXggfHwgUkVMT0FEX0pJVFRFUl9NQVhcbiAgICB0aGlzLmZhaWxzYWZlSml0dGVyID0gb3B0cy5mYWlsc2FmZUppdHRlciB8fCBGQUlMU0FGRV9KSVRURVJcbiAgICB0aGlzLmxvY2FsU3RvcmFnZSA9IG9wdHMubG9jYWxTdG9yYWdlIHx8IHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAgICB0aGlzLnNlc3Npb25TdG9yYWdlID0gb3B0cy5zZXNzaW9uU3RvcmFnZSB8fCB3aW5kb3cuc2Vzc2lvblN0b3JhZ2VcbiAgICB0aGlzLmJvdW5kVG9wTGV2ZWxFdmVudHMgPSBmYWxzZVxuICAgIHRoaXMuZG9tQ2FsbGJhY2tzID0gT2JqZWN0LmFzc2lnbih7b25Ob2RlQWRkZWQ6IGNsb3N1cmUoKSwgb25CZWZvcmVFbFVwZGF0ZWQ6IGNsb3N1cmUoKX0sIG9wdHMuZG9tIHx8IHt9KVxuICAgIHRoaXMudHJhbnNpdGlvbnMgPSBuZXcgVHJhbnNpdGlvblNldCgpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlaGlkZVwiLCBfZSA9PiB7XG4gICAgICB0aGlzLnVubG9hZGVkID0gdHJ1ZVxuICAgIH0pXG4gICAgdGhpcy5zb2NrZXQub25PcGVuKCgpID0+IHtcbiAgICAgIGlmKHRoaXMuaXNVbmxvYWRlZCgpKXtcbiAgICAgICAgLy8gcmVsb2FkIHBhZ2UgaWYgYmVpbmcgcmVzdG9yZWQgZnJvbSBiYWNrL2ZvcndhcmQgY2FjaGUgYW5kIGJyb3dzZXIgZG9lcyBub3QgZW1pdCBcInBhZ2VzaG93XCJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8vIHB1YmxpY1xuXG4gIGlzUHJvZmlsZUVuYWJsZWQoKXsgcmV0dXJuIHRoaXMuc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShQSFhfTFZfUFJPRklMRSkgPT09IFwidHJ1ZVwiIH1cblxuICBpc0RlYnVnRW5hYmxlZCgpeyByZXR1cm4gdGhpcy5zZXNzaW9uU3RvcmFnZS5nZXRJdGVtKFBIWF9MVl9ERUJVRykgPT09IFwidHJ1ZVwiIH1cblxuICBlbmFibGVEZWJ1ZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX0RFQlVHLCBcInRydWVcIikgfVxuXG4gIGVuYWJsZVByb2ZpbGluZygpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX1BST0ZJTEUsIFwidHJ1ZVwiKSB9XG5cbiAgZGlzYWJsZURlYnVnKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShQSFhfTFZfREVCVUcpIH1cblxuICBkaXNhYmxlUHJvZmlsaW5nKCl7IHRoaXMuc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShQSFhfTFZfUFJPRklMRSkgfVxuXG4gIGVuYWJsZUxhdGVuY3lTaW0odXBwZXJCb3VuZE1zKXtcbiAgICB0aGlzLmVuYWJsZURlYnVnKClcbiAgICBjb25zb2xlLmxvZyhcImxhdGVuY3kgc2ltdWxhdG9yIGVuYWJsZWQgZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGlzIGJyb3dzZXIgc2Vzc2lvbi4gQ2FsbCBkaXNhYmxlTGF0ZW5jeVNpbSgpIHRvIGRpc2FibGVcIilcbiAgICB0aGlzLnNlc3Npb25TdG9yYWdlLnNldEl0ZW0oUEhYX0xWX0xBVEVOQ1lfU0lNLCB1cHBlckJvdW5kTXMpXG4gIH1cblxuICBkaXNhYmxlTGF0ZW5jeVNpbSgpeyB0aGlzLnNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oUEhYX0xWX0xBVEVOQ1lfU0lNKSB9XG5cbiAgZ2V0TGF0ZW5jeVNpbSgpe1xuICAgIGxldCBzdHIgPSB0aGlzLnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oUEhYX0xWX0xBVEVOQ1lfU0lNKVxuICAgIHJldHVybiBzdHIgPyBwYXJzZUludChzdHIpIDogbnVsbFxuICB9XG5cbiAgZ2V0U29ja2V0KCl7IHJldHVybiB0aGlzLnNvY2tldCB9XG5cbiAgY29ubmVjdCgpe1xuICAgIGxldCBkb0Nvbm5lY3QgPSAoKSA9PiB7XG4gICAgICBpZih0aGlzLmpvaW5Sb290Vmlld3MoKSl7XG4gICAgICAgIHRoaXMuYmluZFRvcExldmVsRXZlbnRzKClcbiAgICAgICAgdGhpcy5zb2NrZXQuY29ubmVjdCgpXG4gICAgICB9XG4gICAgfVxuICAgIGlmKFtcImNvbXBsZXRlXCIsIFwibG9hZGVkXCIsIFwiaW50ZXJhY3RpdmVcIl0uaW5kZXhPZihkb2N1bWVudC5yZWFkeVN0YXRlKSA+PSAwKXtcbiAgICAgIGRvQ29ubmVjdCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IGRvQ29ubmVjdCgpKVxuICAgIH1cbiAgfVxuXG4gIGRpc2Nvbm5lY3QoY2FsbGJhY2speyB0aGlzLnNvY2tldC5kaXNjb25uZWN0KGNhbGxiYWNrKSB9XG5cbiAgZXhlY0pTKGVsLCBlbmNvZGVkSlMsIGV2ZW50VHlwZSA9IG51bGwpe1xuICAgIHRoaXMub3duZXIoZWwsIHZpZXcgPT4gSlMuZXhlYyhldmVudFR5cGUsIGVuY29kZWRKUywgdmlldywgZWwpKVxuICB9XG5cbiAgLy8gcHJpdmF0ZVxuXG4gIHRyaWdnZXJET00oa2luZCwgYXJncyl7IHRoaXMuZG9tQ2FsbGJhY2tzW2tpbmRdKC4uLmFyZ3MpIH1cblxuICB0aW1lKG5hbWUsIGZ1bmMpe1xuICAgIGlmKCF0aGlzLmlzUHJvZmlsZUVuYWJsZWQoKSB8fCAhY29uc29sZS50aW1lKXsgcmV0dXJuIGZ1bmMoKSB9XG4gICAgY29uc29sZS50aW1lKG5hbWUpXG4gICAgbGV0IHJlc3VsdCA9IGZ1bmMoKVxuICAgIGNvbnNvbGUudGltZUVuZChuYW1lKVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIGxvZyh2aWV3LCBraW5kLCBtc2dDYWxsYmFjayl7XG4gICAgaWYodGhpcy52aWV3TG9nZ2VyKXtcbiAgICAgIGxldCBbbXNnLCBvYmpdID0gbXNnQ2FsbGJhY2soKVxuICAgICAgdGhpcy52aWV3TG9nZ2VyKHZpZXcsIGtpbmQsIG1zZywgb2JqKVxuICAgIH0gZWxzZSBpZih0aGlzLmlzRGVidWdFbmFibGVkKCkpe1xuICAgICAgbGV0IFttc2csIG9ial0gPSBtc2dDYWxsYmFjaygpXG4gICAgICBkZWJ1Zyh2aWV3LCBraW5kLCBtc2csIG9iailcbiAgICB9XG4gIH1cblxuICByZXF1ZXN0RE9NVXBkYXRlKGNhbGxiYWNrKXtcbiAgICB0aGlzLnRyYW5zaXRpb25zLmFmdGVyKGNhbGxiYWNrKVxuICB9XG5cbiAgdHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUgPSBmdW5jdGlvbigpe30pe1xuICAgIHRoaXMudHJhbnNpdGlvbnMuYWRkVHJhbnNpdGlvbih0aW1lLCBvblN0YXJ0LCBvbkRvbmUpXG4gIH1cblxuICBvbkNoYW5uZWwoY2hhbm5lbCwgZXZlbnQsIGNiKXtcbiAgICBjaGFubmVsLm9uKGV2ZW50LCBkYXRhID0+IHtcbiAgICAgIGxldCBsYXRlbmN5ID0gdGhpcy5nZXRMYXRlbmN5U2ltKClcbiAgICAgIGlmKCFsYXRlbmN5KXtcbiAgICAgICAgY2IoZGF0YSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBzaW11bGF0aW5nICR7bGF0ZW5jeX1tcyBvZiBsYXRlbmN5IGZyb20gc2VydmVyIHRvIGNsaWVudGApXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2IoZGF0YSksIGxhdGVuY3kpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHdyYXBQdXNoKHZpZXcsIG9wdHMsIHB1c2gpe1xuICAgIGxldCBsYXRlbmN5ID0gdGhpcy5nZXRMYXRlbmN5U2ltKClcbiAgICBsZXQgb2xkSm9pbkNvdW50ID0gdmlldy5qb2luQ291bnRcbiAgICBpZighbGF0ZW5jeSl7XG4gICAgICBpZihvcHRzLnRpbWVvdXQpe1xuICAgICAgICByZXR1cm4gcHVzaCgpLnJlY2VpdmUoXCJ0aW1lb3V0XCIsICgpID0+IHtcbiAgICAgICAgICBpZih2aWV3LmpvaW5Db3VudCA9PT0gb2xkSm9pbkNvdW50ICYmICF2aWV3LmlzRGVzdHJveWVkKCkpe1xuICAgICAgICAgICAgdGhpcy5yZWxvYWRXaXRoSml0dGVyKHZpZXcsICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sb2codmlldywgXCJ0aW1lb3V0XCIsICgpID0+IFtcInJlY2VpdmVkIHRpbWVvdXQgd2hpbGUgY29tbXVuaWNhdGluZyB3aXRoIHNlcnZlci4gRmFsbGluZyBiYWNrIHRvIGhhcmQgcmVmcmVzaCBmb3IgcmVjb3ZlcnlcIl0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwdXNoKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhgc2ltdWxhdGluZyAke2xhdGVuY3l9bXMgb2YgbGF0ZW5jeSBmcm9tIGNsaWVudCB0byBzZXJ2ZXJgKVxuICAgIGxldCBmYWtlUHVzaCA9IHtcbiAgICAgIHJlY2VpdmVzOiBbXSxcbiAgICAgIHJlY2VpdmUoa2luZCwgY2IpeyB0aGlzLnJlY2VpdmVzLnB1c2goW2tpbmQsIGNiXSkgfVxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmKHZpZXcuaXNEZXN0cm95ZWQoKSl7IHJldHVybiB9XG4gICAgICBmYWtlUHVzaC5yZWNlaXZlcy5yZWR1Y2UoKGFjYywgW2tpbmQsIGNiXSkgPT4gYWNjLnJlY2VpdmUoa2luZCwgY2IpLCBwdXNoKCkpXG4gICAgfSwgbGF0ZW5jeSlcbiAgICByZXR1cm4gZmFrZVB1c2hcbiAgfVxuXG4gIHJlbG9hZFdpdGhKaXR0ZXIodmlldywgbG9nKXtcbiAgICB2aWV3LmRlc3Ryb3koKVxuICAgIHRoaXMuZGlzY29ubmVjdCgpXG4gICAgbGV0IG1pbk1zID0gdGhpcy5yZWxvYWRKaXR0ZXJNaW5cbiAgICBsZXQgbWF4TXMgPSB0aGlzLnJlbG9hZEppdHRlck1heFxuICAgIGxldCBhZnRlck1zID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heE1zIC0gbWluTXMgKyAxKSkgKyBtaW5Nc1xuICAgIGxldCB0cmllcyA9IEJyb3dzZXIudXBkYXRlTG9jYWwodGhpcy5sb2NhbFN0b3JhZ2UsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSwgQ09OU0VDVVRJVkVfUkVMT0FEUywgMCwgY291bnQgPT4gY291bnQgKyAxKVxuICAgIGxvZyA/IGxvZygpIDogdGhpcy5sb2codmlldywgXCJqb2luXCIsICgpID0+IFtgZW5jb3VudGVyZWQgJHt0cmllc30gY29uc2VjdXRpdmUgcmVsb2Fkc2BdKVxuICAgIGlmKHRyaWVzID4gdGhpcy5tYXhSZWxvYWRzKXtcbiAgICAgIHRoaXMubG9nKHZpZXcsIFwiam9pblwiLCAoKSA9PiBbYGV4Y2VlZGVkICR7dGhpcy5tYXhSZWxvYWRzfSBjb25zZWN1dGl2ZSByZWxvYWRzLiBFbnRlcmluZyBmYWlsc2FmZSBtb2RlYF0pXG4gICAgICBhZnRlck1zID0gdGhpcy5mYWlsc2FmZUppdHRlclxuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmKHRoaXMuaGFzUGVuZGluZ0xpbmsoKSl7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IHRoaXMucGVuZGluZ0xpbmtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICAgICAgfVxuICAgIH0sIGFmdGVyTXMpXG4gIH1cblxuICBnZXRIb29rQ2FsbGJhY2tzKG5hbWUpe1xuICAgIHJldHVybiBuYW1lICYmIG5hbWUuc3RhcnRzV2l0aChcIlBob2VuaXguXCIpID8gSG9va3NbbmFtZS5zcGxpdChcIi5cIilbMV1dIDogdGhpcy5ob29rc1tuYW1lXVxuICB9XG5cbiAgaXNVbmxvYWRlZCgpeyByZXR1cm4gdGhpcy51bmxvYWRlZCB9XG5cbiAgaXNDb25uZWN0ZWQoKXsgcmV0dXJuIHRoaXMuc29ja2V0LmlzQ29ubmVjdGVkKCkgfVxuXG4gIGdldEJpbmRpbmdQcmVmaXgoKXsgcmV0dXJuIHRoaXMuYmluZGluZ1ByZWZpeCB9XG5cbiAgYmluZGluZyhraW5kKXsgcmV0dXJuIGAke3RoaXMuZ2V0QmluZGluZ1ByZWZpeCgpfSR7a2luZH1gIH1cblxuICBjaGFubmVsKHRvcGljLCBwYXJhbXMpeyByZXR1cm4gdGhpcy5zb2NrZXQuY2hhbm5lbCh0b3BpYywgcGFyYW1zKSB9XG5cbiAgam9pblJvb3RWaWV3cygpe1xuICAgIGxldCByb290c0ZvdW5kID0gZmFsc2VcbiAgICBET00uYWxsKGRvY3VtZW50LCBgJHtQSFhfVklFV19TRUxFQ1RPUn06bm90KFske1BIWF9QQVJFTlRfSUR9XSlgLCByb290RWwgPT4ge1xuICAgICAgaWYoIXRoaXMuZ2V0Um9vdEJ5SWQocm9vdEVsLmlkKSl7XG4gICAgICAgIGxldCB2aWV3ID0gdGhpcy5uZXdSb290Vmlldyhyb290RWwpXG4gICAgICAgIHZpZXcuc2V0SHJlZih0aGlzLmdldEhyZWYoKSlcbiAgICAgICAgdmlldy5qb2luKClcbiAgICAgICAgaWYocm9vdEVsLmdldEF0dHJpYnV0ZShQSFhfTUFJTikpeyB0aGlzLm1haW4gPSB2aWV3IH1cbiAgICAgIH1cbiAgICAgIHJvb3RzRm91bmQgPSB0cnVlXG4gICAgfSlcbiAgICByZXR1cm4gcm9vdHNGb3VuZFxuICB9XG5cbiAgcmVkaXJlY3QodG8sIGZsYXNoKXtcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKVxuICAgIEJyb3dzZXIucmVkaXJlY3QodG8sIGZsYXNoKVxuICB9XG5cbiAgcmVwbGFjZU1haW4oaHJlZiwgZmxhc2gsIGNhbGxiYWNrID0gbnVsbCwgbGlua1JlZiA9IHRoaXMuc2V0UGVuZGluZ0xpbmsoaHJlZikpe1xuICAgIGxldCBvbGRNYWluRWwgPSB0aGlzLm1haW4uZWxcbiAgICBsZXQgbmV3TWFpbkVsID0gRE9NLmNsb25lTm9kZShvbGRNYWluRWwsIFwiXCIpXG4gICAgdGhpcy5tYWluLnNob3dMb2FkZXIodGhpcy5sb2FkZXJUaW1lb3V0KVxuICAgIHRoaXMubWFpbi5kZXN0cm95KClcblxuICAgIHRoaXMubWFpbiA9IHRoaXMubmV3Um9vdFZpZXcobmV3TWFpbkVsLCBmbGFzaClcbiAgICB0aGlzLm1haW4uc2V0UmVkaXJlY3QoaHJlZilcbiAgICB0aGlzLnRyYW5zaXRpb25SZW1vdmVzKClcbiAgICB0aGlzLm1haW4uam9pbigoam9pbkNvdW50LCBvbkRvbmUpID0+IHtcbiAgICAgIGlmKGpvaW5Db3VudCA9PT0gMSAmJiB0aGlzLmNvbW1pdFBlbmRpbmdMaW5rKGxpbmtSZWYpKXtcbiAgICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgICBET00uZmluZFBoeFN0aWNreShkb2N1bWVudCkuZm9yRWFjaChlbCA9PiBuZXdNYWluRWwuYXBwZW5kQ2hpbGQoZWwpKVxuICAgICAgICAgIG9sZE1haW5FbC5yZXBsYWNlV2l0aChuZXdNYWluRWwpXG4gICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgICAgIG9uRG9uZSgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHRyYW5zaXRpb25SZW1vdmVzKGVsZW1lbnRzKXtcbiAgICBsZXQgcmVtb3ZlQXR0ciA9IHRoaXMuYmluZGluZyhcInJlbW92ZVwiKVxuICAgIGVsZW1lbnRzID0gZWxlbWVudHMgfHwgRE9NLmFsbChkb2N1bWVudCwgYFske3JlbW92ZUF0dHJ9XWApXG4gICAgZWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBpZihkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGVsKSl7IC8vIHNraXAgY2hpbGRyZW4gYWxyZWFkeSByZW1vdmVkXG4gICAgICAgIHRoaXMuZXhlY0pTKGVsLCBlbC5nZXRBdHRyaWJ1dGUocmVtb3ZlQXR0ciksIFwicmVtb3ZlXCIpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGlzUGh4VmlldyhlbCl7IHJldHVybiBlbC5nZXRBdHRyaWJ1dGUgJiYgZWwuZ2V0QXR0cmlidXRlKFBIWF9TRVNTSU9OKSAhPT0gbnVsbCB9XG5cbiAgbmV3Um9vdFZpZXcoZWwsIGZsYXNoKXtcbiAgICBsZXQgdmlldyA9IG5ldyBWaWV3KGVsLCB0aGlzLCBudWxsLCBmbGFzaClcbiAgICB0aGlzLnJvb3RzW3ZpZXcuaWRdID0gdmlld1xuICAgIHJldHVybiB2aWV3XG4gIH1cblxuICBvd25lcihjaGlsZEVsLCBjYWxsYmFjayl7XG4gICAgbGV0IHZpZXcgPSBtYXliZShjaGlsZEVsLmNsb3Nlc3QoUEhYX1ZJRVdfU0VMRUNUT1IpLCBlbCA9PiB0aGlzLmdldFZpZXdCeUVsKGVsKSkgfHwgdGhpcy5tYWluXG4gICAgaWYodmlldyl7IGNhbGxiYWNrKHZpZXcpIH1cbiAgfVxuXG4gIHdpdGhpbk93bmVycyhjaGlsZEVsLCBjYWxsYmFjayl7XG4gICAgdGhpcy5vd25lcihjaGlsZEVsLCB2aWV3ID0+IGNhbGxiYWNrKHZpZXcsIGNoaWxkRWwpKVxuICB9XG5cbiAgZ2V0Vmlld0J5RWwoZWwpe1xuICAgIGxldCByb290SWQgPSBlbC5nZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQpXG4gICAgcmV0dXJuIG1heWJlKHRoaXMuZ2V0Um9vdEJ5SWQocm9vdElkKSwgcm9vdCA9PiByb290LmdldERlc2NlbmRlbnRCeUVsKGVsKSlcbiAgfVxuXG4gIGdldFJvb3RCeUlkKGlkKXsgcmV0dXJuIHRoaXMucm9vdHNbaWRdIH1cblxuICBkZXN0cm95QWxsVmlld3MoKXtcbiAgICBmb3IobGV0IGlkIGluIHRoaXMucm9vdHMpe1xuICAgICAgdGhpcy5yb290c1tpZF0uZGVzdHJveSgpXG4gICAgICBkZWxldGUgdGhpcy5yb290c1tpZF1cbiAgICB9XG4gIH1cblxuICBkZXN0cm95Vmlld0J5RWwoZWwpe1xuICAgIGxldCByb290ID0gdGhpcy5nZXRSb290QnlJZChlbC5nZXRBdHRyaWJ1dGUoUEhYX1JPT1RfSUQpKVxuICAgIGlmKHJvb3QgJiYgcm9vdC5pZCA9PT0gZWwuaWQpe1xuICAgICAgcm9vdC5kZXN0cm95KClcbiAgICAgIGRlbGV0ZSB0aGlzLnJvb3RzW3Jvb3QuaWRdXG4gICAgfSBlbHNlIGlmKHJvb3Qpe1xuICAgICAgcm9vdC5kZXN0cm95RGVzY2VuZGVudChlbC5pZClcbiAgICB9XG4gIH1cblxuICBzZXRBY3RpdmVFbGVtZW50KHRhcmdldCl7XG4gICAgaWYodGhpcy5hY3RpdmVFbGVtZW50ID09PSB0YXJnZXQpeyByZXR1cm4gfVxuICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IHRhcmdldFxuICAgIGxldCBjYW5jZWwgPSAoKSA9PiB7XG4gICAgICBpZih0YXJnZXQgPT09IHRoaXMuYWN0aXZlRWxlbWVudCl7IHRoaXMuYWN0aXZlRWxlbWVudCA9IG51bGwgfVxuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMpXG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMpXG4gICAgfVxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBjYW5jZWwpXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBjYW5jZWwpXG4gIH1cblxuICBnZXRBY3RpdmVFbGVtZW50KCl7XG4gICAgaWYoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSl7XG4gICAgICByZXR1cm4gdGhpcy5hY3RpdmVFbGVtZW50IHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBjYW4gYmUgbnVsbCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMVxuICAgICAgcmV0dXJuIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgZG9jdW1lbnQuYm9keVxuICAgIH1cbiAgfVxuXG4gIGRyb3BBY3RpdmVFbGVtZW50KHZpZXcpe1xuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAmJiB2aWV3Lm93bnNFbGVtZW50KHRoaXMucHJldkFjdGl2ZSkpe1xuICAgICAgdGhpcy5wcmV2QWN0aXZlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIHJlc3RvcmVQcmV2aW91c2x5QWN0aXZlRm9jdXMoKXtcbiAgICBpZih0aGlzLnByZXZBY3RpdmUgJiYgdGhpcy5wcmV2QWN0aXZlICE9PSBkb2N1bWVudC5ib2R5KXtcbiAgICAgIHRoaXMucHJldkFjdGl2ZS5mb2N1cygpXG4gICAgfVxuICB9XG5cbiAgYmx1ckFjdGl2ZUVsZW1lbnQoKXtcbiAgICB0aGlzLnByZXZBY3RpdmUgPSB0aGlzLmdldEFjdGl2ZUVsZW1lbnQoKVxuICAgIGlmKHRoaXMucHJldkFjdGl2ZSAhPT0gZG9jdW1lbnQuYm9keSl7IHRoaXMucHJldkFjdGl2ZS5ibHVyKCkgfVxuICB9XG5cbiAgYmluZFRvcExldmVsRXZlbnRzKCl7XG4gICAgaWYodGhpcy5ib3VuZFRvcExldmVsRXZlbnRzKXsgcmV0dXJuIH1cblxuICAgIHRoaXMuYm91bmRUb3BMZXZlbEV2ZW50cyA9IHRydWVcbiAgICAvLyBlbnRlciBmYWlsc2FmZSByZWxvYWQgaWYgc2VydmVyIGhhcyBnb25lIGF3YXkgaW50ZW50aW9uYWxseSwgc3VjaCBhcyBcImRpc2Nvbm5lY3RcIiBicm9hZGNhc3RcbiAgICB0aGlzLnNvY2tldC5vbkNsb3NlKGV2ZW50ID0+IHtcbiAgICAgIGlmKGV2ZW50LmNvZGUgPT09IDEwMDAgJiYgdGhpcy5tYWluKXtcbiAgICAgICAgdGhpcy5yZWxvYWRXaXRoSml0dGVyKHRoaXMubWFpbilcbiAgICAgIH1cbiAgICB9KVxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpeyB9KSAvLyBlbnN1cmUgYWxsIGNsaWNrIGV2ZW50cyBidWJibGUgZm9yIG1vYmlsZSBTYWZhcmlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIGUgPT4ge1xuICAgICAgaWYoZS5wZXJzaXN0ZWQpeyAvLyByZWxvYWQgcGFnZSBpZiBiZWluZyByZXN0b3JlZCBmcm9tIGJhY2svZm9yd2FyZCBjYWNoZVxuICAgICAgICB0aGlzLmdldFNvY2tldCgpLmRpc2Nvbm5lY3QoKVxuICAgICAgICB0aGlzLndpdGhQYWdlTG9hZGluZyh7dG86IHdpbmRvdy5sb2NhdGlvbi5ocmVmLCBraW5kOiBcInJlZGlyZWN0XCJ9KVxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKClcbiAgICAgIH1cbiAgICB9LCB0cnVlKVxuICAgIHRoaXMuYmluZE5hdigpXG4gICAgdGhpcy5iaW5kQ2xpY2tzKClcbiAgICB0aGlzLmJpbmRGb3JtcygpXG4gICAgdGhpcy5iaW5kKHtrZXl1cDogXCJrZXl1cFwiLCBrZXlkb3duOiBcImtleWRvd25cIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgcGh4RXZlbnQsIGV2ZW50VGFyZ2V0KSA9PiB7XG4gICAgICBsZXQgbWF0Y2hLZXkgPSB0YXJnZXRFbC5nZXRBdHRyaWJ1dGUodGhpcy5iaW5kaW5nKFBIWF9LRVkpKVxuICAgICAgbGV0IHByZXNzZWRLZXkgPSBlLmtleSAmJiBlLmtleS50b0xvd2VyQ2FzZSgpIC8vIGNocm9tZSBjbGlja2VkIGF1dG9jb21wbGV0ZXMgc2VuZCBhIGtleWRvd24gd2l0aG91dCBrZXlcbiAgICAgIGlmKG1hdGNoS2V5ICYmIG1hdGNoS2V5LnRvTG93ZXJDYXNlKCkgIT09IHByZXNzZWRLZXkpeyByZXR1cm4gfVxuXG4gICAgICBsZXQgZGF0YSA9IHtrZXk6IGUua2V5LCAuLi50aGlzLmV2ZW50TWV0YSh0eXBlLCBlLCB0YXJnZXRFbCl9XG4gICAgICBKUy5leGVjKHR5cGUsIHBoeEV2ZW50LCB2aWV3LCB0YXJnZXRFbCwgW1wicHVzaFwiLCB7ZGF0YX1dKVxuICAgIH0pXG4gICAgdGhpcy5iaW5kKHtibHVyOiBcImZvY3Vzb3V0XCIsIGZvY3VzOiBcImZvY3VzaW5cIn0sIChlLCB0eXBlLCB2aWV3LCB0YXJnZXRFbCwgcGh4RXZlbnQsIGV2ZW50VGFyZ2V0KSA9PiB7XG4gICAgICBpZighZXZlbnRUYXJnZXQpe1xuICAgICAgICBsZXQgZGF0YSA9IHtrZXk6IGUua2V5LCAuLi50aGlzLmV2ZW50TWV0YSh0eXBlLCBlLCB0YXJnZXRFbCl9XG4gICAgICAgIEpTLmV4ZWModHlwZSwgcGh4RXZlbnQsIHZpZXcsIHRhcmdldEVsLCBbXCJwdXNoXCIsIHtkYXRhfV0pXG4gICAgICB9XG4gICAgfSlcbiAgICB0aGlzLmJpbmQoe2JsdXI6IFwiYmx1clwiLCBmb2N1czogXCJmb2N1c1wifSwgKGUsIHR5cGUsIHZpZXcsIHRhcmdldEVsLCB0YXJnZXRDdHgsIHBoeEV2ZW50LCBwaHhUYXJnZXQpID0+IHtcbiAgICAgIC8vIGJsdXIgYW5kIGZvY3VzIGFyZSB0cmlnZ2VyZWQgb24gZG9jdW1lbnQgYW5kIHdpbmRvdy4gRGlzY2FyZCBvbmUgdG8gYXZvaWQgZHVwc1xuICAgICAgaWYocGh4VGFyZ2V0ID09PSBcIndpbmRvd1wiKXtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmV2ZW50TWV0YSh0eXBlLCBlLCB0YXJnZXRFbClcbiAgICAgICAgSlMuZXhlYyh0eXBlLCBwaHhFdmVudCwgdmlldywgdGFyZ2V0RWwsIFtcInB1c2hcIiwge2RhdGF9XSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBsZXQgZHJvcFRhcmdldElkID0gbWF5YmUoY2xvc2VzdFBoeEJpbmRpbmcoZS50YXJnZXQsIHRoaXMuYmluZGluZyhQSFhfRFJPUF9UQVJHRVQpKSwgdHJ1ZVRhcmdldCA9PiB7XG4gICAgICAgIHJldHVybiB0cnVlVGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoUEhYX0RST1BfVEFSR0VUKSlcbiAgICAgIH0pXG4gICAgICBsZXQgZHJvcFRhcmdldCA9IGRyb3BUYXJnZXRJZCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkcm9wVGFyZ2V0SWQpXG4gICAgICBsZXQgZmlsZXMgPSBBcnJheS5mcm9tKGUuZGF0YVRyYW5zZmVyLmZpbGVzIHx8IFtdKVxuICAgICAgaWYoIWRyb3BUYXJnZXQgfHwgZHJvcFRhcmdldC5kaXNhYmxlZCB8fCBmaWxlcy5sZW5ndGggPT09IDAgfHwgIShkcm9wVGFyZ2V0LmZpbGVzIGluc3RhbmNlb2YgRmlsZUxpc3QpKXsgcmV0dXJuIH1cblxuICAgICAgTGl2ZVVwbG9hZGVyLnRyYWNrRmlsZXMoZHJvcFRhcmdldCwgZmlsZXMpXG4gICAgICBkcm9wVGFyZ2V0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KFwiaW5wdXRcIiwge2J1YmJsZXM6IHRydWV9KSlcbiAgICB9KVxuICAgIHRoaXMub24oUEhYX1RSQUNLX1VQTE9BRFMsIGUgPT4ge1xuICAgICAgbGV0IHVwbG9hZFRhcmdldCA9IGUudGFyZ2V0XG4gICAgICBpZighRE9NLmlzVXBsb2FkSW5wdXQodXBsb2FkVGFyZ2V0KSl7IHJldHVybiB9XG4gICAgICBsZXQgZmlsZXMgPSBBcnJheS5mcm9tKGUuZGV0YWlsLmZpbGVzIHx8IFtdKS5maWx0ZXIoZiA9PiBmIGluc3RhbmNlb2YgRmlsZSB8fCBmIGluc3RhbmNlb2YgQmxvYilcbiAgICAgIExpdmVVcGxvYWRlci50cmFja0ZpbGVzKHVwbG9hZFRhcmdldCwgZmlsZXMpXG4gICAgICB1cGxvYWRUYXJnZXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJpbnB1dFwiLCB7YnViYmxlczogdHJ1ZX0pKVxuICAgIH0pXG4gIH1cblxuICBldmVudE1ldGEoZXZlbnROYW1lLCBlLCB0YXJnZXRFbCl7XG4gICAgbGV0IGNhbGxiYWNrID0gdGhpcy5tZXRhZGF0YUNhbGxiYWNrc1tldmVudE5hbWVdXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gY2FsbGJhY2soZSwgdGFyZ2V0RWwpIDoge31cbiAgfVxuXG4gIHNldFBlbmRpbmdMaW5rKGhyZWYpe1xuICAgIHRoaXMubGlua1JlZisrXG4gICAgdGhpcy5wZW5kaW5nTGluayA9IGhyZWZcbiAgICByZXR1cm4gdGhpcy5saW5rUmVmXG4gIH1cblxuICBjb21taXRQZW5kaW5nTGluayhsaW5rUmVmKXtcbiAgICBpZih0aGlzLmxpbmtSZWYgIT09IGxpbmtSZWYpe1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaHJlZiA9IHRoaXMucGVuZGluZ0xpbmtcbiAgICAgIHRoaXMucGVuZGluZ0xpbmsgPSBudWxsXG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIGdldEhyZWYoKXsgcmV0dXJuIHRoaXMuaHJlZiB9XG5cbiAgaGFzUGVuZGluZ0xpbmsoKXsgcmV0dXJuICEhdGhpcy5wZW5kaW5nTGluayB9XG5cbiAgYmluZChldmVudHMsIGNhbGxiYWNrKXtcbiAgICBmb3IobGV0IGV2ZW50IGluIGV2ZW50cyl7XG4gICAgICBsZXQgYnJvd3NlckV2ZW50TmFtZSA9IGV2ZW50c1tldmVudF1cblxuICAgICAgdGhpcy5vbihicm93c2VyRXZlbnROYW1lLCBlID0+IHtcbiAgICAgICAgbGV0IGJpbmRpbmcgPSB0aGlzLmJpbmRpbmcoZXZlbnQpXG4gICAgICAgIGxldCB3aW5kb3dCaW5kaW5nID0gdGhpcy5iaW5kaW5nKGB3aW5kb3ctJHtldmVudH1gKVxuICAgICAgICBsZXQgdGFyZ2V0UGh4RXZlbnQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUgJiYgZS50YXJnZXQuZ2V0QXR0cmlidXRlKGJpbmRpbmcpXG4gICAgICAgIGlmKHRhcmdldFBoeEV2ZW50KXtcbiAgICAgICAgICB0aGlzLmRlYm91bmNlKGUudGFyZ2V0LCBlLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlLnRhcmdldCwgdmlldyA9PiB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKGUsIGV2ZW50LCB2aWV3LCBlLnRhcmdldCwgdGFyZ2V0UGh4RXZlbnQsIG51bGwpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgRE9NLmFsbChkb2N1bWVudCwgYFske3dpbmRvd0JpbmRpbmd9XWAsIGVsID0+IHtcbiAgICAgICAgICAgIGxldCBwaHhFdmVudCA9IGVsLmdldEF0dHJpYnV0ZSh3aW5kb3dCaW5kaW5nKVxuICAgICAgICAgICAgdGhpcy5kZWJvdW5jZShlbCwgZSwgKCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlbCwgdmlldyA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZSwgZXZlbnQsIHZpZXcsIGVsLCBwaHhFdmVudCwgXCJ3aW5kb3dcIilcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBiaW5kQ2xpY2tzKCl7XG4gICAgdGhpcy5iaW5kQ2xpY2soXCJjbGlja1wiLCBcImNsaWNrXCIsIGZhbHNlKVxuICAgIHRoaXMuYmluZENsaWNrKFwibW91c2Vkb3duXCIsIFwiY2FwdHVyZS1jbGlja1wiLCB0cnVlKVxuICB9XG5cbiAgYmluZENsaWNrKGV2ZW50TmFtZSwgYmluZGluZ05hbWUsIGNhcHR1cmUpe1xuICAgIGxldCBjbGljayA9IHRoaXMuYmluZGluZyhiaW5kaW5nTmFtZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGUgPT4ge1xuICAgICAgaWYoIXRoaXMuaXNDb25uZWN0ZWQoKSl7IHJldHVybiB9XG4gICAgICB0aGlzLmNsaWNrUmVmKytcbiAgICAgIGxldCBjbGlja1JlZldhcyA9IHRoaXMuY2xpY2tSZWZcbiAgICAgIGxldCB0YXJnZXQgPSBudWxsXG4gICAgICBpZihjYXB0dXJlKXtcbiAgICAgICAgdGFyZ2V0ID0gZS50YXJnZXQubWF0Y2hlcyhgWyR7Y2xpY2t9XWApID8gZS50YXJnZXQgOiBlLnRhcmdldC5xdWVyeVNlbGVjdG9yKGBbJHtjbGlja31dYClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldCA9IGNsb3Nlc3RQaHhCaW5kaW5nKGUudGFyZ2V0LCBjbGljaylcbiAgICAgICAgdGhpcy5kaXNwYXRjaENsaWNrQXdheShlLCBjbGlja1JlZldhcylcbiAgICAgIH1cbiAgICAgIGxldCBwaHhFdmVudCA9IHRhcmdldCAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKGNsaWNrKVxuICAgICAgaWYoIXBoeEV2ZW50KXsgcmV0dXJuIH1cbiAgICAgIGlmKHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpID09PSBcIiNcIil7IGUucHJldmVudERlZmF1bHQoKSB9XG5cbiAgICAgIHRoaXMuZGVib3VuY2UodGFyZ2V0LCBlLCAoKSA9PiB7XG4gICAgICAgIHRoaXMud2l0aGluT3duZXJzKHRhcmdldCwgdmlldyA9PiB7XG4gICAgICAgICAgSlMuZXhlYyhcImNsaWNrXCIsIHBoeEV2ZW50LCB2aWV3LCB0YXJnZXQsIFtcInB1c2hcIiwge2RhdGE6IHRoaXMuZXZlbnRNZXRhKFwiY2xpY2tcIiwgZSwgdGFyZ2V0KX1dKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9LCBjYXB0dXJlKVxuICB9XG5cbiAgZGlzcGF0Y2hDbGlja0F3YXkoZSwgY2xpY2tSZWZXYXMpe1xuICAgIGxldCBwaHhDbGlja0F3YXkgPSB0aGlzLmJpbmRpbmcoXCJjbGljay1hd2F5XCIpXG4gICAgbGV0IHBoeENsaWNrID0gdGhpcy5iaW5kaW5nKFwiY2xpY2tcIilcbiAgICBET00uYWxsKGRvY3VtZW50LCBgWyR7cGh4Q2xpY2tBd2F5fV1gLCBlbCA9PiB7XG4gICAgICBpZighKGVsLmlzU2FtZU5vZGUoZS50YXJnZXQpIHx8IGVsLmNvbnRhaW5zKGUudGFyZ2V0KSkpe1xuICAgICAgICB0aGlzLndpdGhpbk93bmVycyhlLnRhcmdldCwgdmlldyA9PiB7XG4gICAgICAgICAgbGV0IHBoeEV2ZW50ID0gZWwuZ2V0QXR0cmlidXRlKHBoeENsaWNrQXdheSlcbiAgICAgICAgICBpZihKUy5pc1Zpc2libGUoZWwpKXtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBlLnRhcmdldC5jbG9zZXN0KGBbJHtwaHhDbGlja31dYCkgfHwgZS50YXJnZXRcbiAgICAgICAgICAgIEpTLmV4ZWMoXCJjbGlja1wiLCBwaHhFdmVudCwgdmlldywgZWwsIFtcInB1c2hcIiwge2RhdGE6IHRoaXMuZXZlbnRNZXRhKFwiY2xpY2tcIiwgZSwgZS50YXJnZXQpfV0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBiaW5kTmF2KCl7XG4gICAgaWYoIUJyb3dzZXIuY2FuUHVzaFN0YXRlKCkpeyByZXR1cm4gfVxuICAgIGlmKGhpc3Rvcnkuc2Nyb2xsUmVzdG9yYXRpb24peyBoaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gXCJtYW51YWxcIiB9XG4gICAgbGV0IHNjcm9sbFRpbWVyID0gbnVsbFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIF9lID0+IHtcbiAgICAgIGNsZWFyVGltZW91dChzY3JvbGxUaW1lcilcbiAgICAgIHNjcm9sbFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIEJyb3dzZXIudXBkYXRlQ3VycmVudFN0YXRlKHN0YXRlID0+IE9iamVjdC5hc3NpZ24oc3RhdGUsIHtzY3JvbGw6IHdpbmRvdy5zY3JvbGxZfSkpXG4gICAgICB9LCAxMDApXG4gICAgfSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGV2ZW50ID0+IHtcbiAgICAgIGlmKCF0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKSl7IHJldHVybiB9XG4gICAgICBsZXQge3R5cGUsIGlkLCByb290LCBzY3JvbGx9ID0gZXZlbnQuc3RhdGUgfHwge31cbiAgICAgIGxldCBocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWZcblxuICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgaWYodGhpcy5tYWluLmlzQ29ubmVjdGVkKCkgJiYgKHR5cGUgPT09IFwicGF0Y2hcIiAmJiBpZCA9PT0gdGhpcy5tYWluLmlkKSl7XG4gICAgICAgICAgdGhpcy5tYWluLnB1c2hMaW5rUGF0Y2goaHJlZiwgbnVsbClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlcGxhY2VNYWluKGhyZWYsIG51bGwsICgpID0+IHtcbiAgICAgICAgICAgIGlmKHJvb3QpeyB0aGlzLnJlcGxhY2VSb290SGlzdG9yeSgpIH1cbiAgICAgICAgICAgIGlmKHR5cGVvZihzY3JvbGwpID09PSBcIm51bWJlclwiKXtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbClcbiAgICAgICAgICAgICAgfSwgMCkgLy8gdGhlIGJvZHkgbmVlZHMgdG8gcmVuZGVyIGJlZm9yZSB3ZSBzY3JvbGwuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGUgPT4ge1xuICAgICAgbGV0IHRhcmdldCA9IGNsb3Nlc3RQaHhCaW5kaW5nKGUudGFyZ2V0LCBQSFhfTElWRV9MSU5LKVxuICAgICAgbGV0IHR5cGUgPSB0YXJnZXQgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShQSFhfTElWRV9MSU5LKVxuICAgICAgbGV0IHdhbnRzTmV3VGFiID0gZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLmJ1dHRvbiA9PT0gMVxuICAgICAgaWYoIXR5cGUgfHwgIXRoaXMuaXNDb25uZWN0ZWQoKSB8fCAhdGhpcy5tYWluIHx8IHdhbnRzTmV3VGFiKXsgcmV0dXJuIH1cbiAgICAgIGxldCBocmVmID0gdGFyZ2V0LmhyZWZcbiAgICAgIGxldCBsaW5rU3RhdGUgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKFBIWF9MSU5LX1NUQVRFKVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBpZih0aGlzLnBlbmRpbmdMaW5rID09PSBocmVmKXsgcmV0dXJuIH1cblxuICAgICAgdGhpcy5yZXF1ZXN0RE9NVXBkYXRlKCgpID0+IHtcbiAgICAgICAgaWYodHlwZSA9PT0gXCJwYXRjaFwiKXtcbiAgICAgICAgICB0aGlzLnB1c2hIaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCB0YXJnZXQpXG4gICAgICAgIH0gZWxzZSBpZih0eXBlID09PSBcInJlZGlyZWN0XCIpe1xuICAgICAgICAgIHRoaXMuaGlzdG9yeVJlZGlyZWN0KGhyZWYsIGxpbmtTdGF0ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGV4cGVjdGVkICR7UEhYX0xJVkVfTElOS30gdG8gYmUgXCJwYXRjaFwiIG9yIFwicmVkaXJlY3RcIiwgZ290OiAke3R5cGV9YClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnQsIHBheWxvYWQgPSB7fSl7XG4gICAgRE9NLmRpc3BhdGNoRXZlbnQod2luZG93LCBgcGh4OiR7ZXZlbnR9YCwgcGF5bG9hZClcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnRzKGV2ZW50cyl7XG4gICAgZXZlbnRzLmZvckVhY2goKFtldmVudCwgcGF5bG9hZF0pID0+IHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCwgcGF5bG9hZCkpXG4gIH1cblxuICB3aXRoUGFnZUxvYWRpbmcoaW5mbywgY2FsbGJhY2spe1xuICAgIERPTS5kaXNwYXRjaEV2ZW50KHdpbmRvdywgXCJwaHg6cGFnZS1sb2FkaW5nLXN0YXJ0XCIsIGluZm8pXG4gICAgbGV0IGRvbmUgPSAoKSA9PiBET00uZGlzcGF0Y2hFdmVudCh3aW5kb3csIFwicGh4OnBhZ2UtbG9hZGluZy1zdG9wXCIsIGluZm8pXG4gICAgcmV0dXJuIGNhbGxiYWNrID8gY2FsbGJhY2soZG9uZSkgOiBkb25lXG4gIH1cblxuICBwdXNoSGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgdGFyZ2V0RWwpe1xuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJwYXRjaFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLm1haW4ucHVzaExpbmtQYXRjaChocmVmLCB0YXJnZXRFbCwgbGlua1JlZiA9PiB7XG4gICAgICAgIHRoaXMuaGlzdG9yeVBhdGNoKGhyZWYsIGxpbmtTdGF0ZSwgbGlua1JlZilcbiAgICAgICAgZG9uZSgpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBoaXN0b3J5UGF0Y2goaHJlZiwgbGlua1N0YXRlLCBsaW5rUmVmID0gdGhpcy5zZXRQZW5kaW5nTGluayhocmVmKSl7XG4gICAgaWYoIXRoaXMuY29tbWl0UGVuZGluZ0xpbmsobGlua1JlZikpeyByZXR1cm4gfVxuXG4gICAgQnJvd3Nlci5wdXNoU3RhdGUobGlua1N0YXRlLCB7dHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSwgaHJlZilcbiAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICB9XG5cbiAgaGlzdG9yeVJlZGlyZWN0KGhyZWYsIGxpbmtTdGF0ZSwgZmxhc2gpe1xuICAgIGxldCBzY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWVxuICAgIHRoaXMud2l0aFBhZ2VMb2FkaW5nKHt0bzogaHJlZiwga2luZDogXCJyZWRpcmVjdFwifSwgZG9uZSA9PiB7XG4gICAgICB0aGlzLnJlcGxhY2VNYWluKGhyZWYsIGZsYXNoLCAoKSA9PiB7XG4gICAgICAgIEJyb3dzZXIucHVzaFN0YXRlKGxpbmtTdGF0ZSwge3R5cGU6IFwicmVkaXJlY3RcIiwgaWQ6IHRoaXMubWFpbi5pZCwgc2Nyb2xsOiBzY3JvbGx9LCBocmVmKVxuICAgICAgICB0aGlzLnJlZ2lzdGVyTmV3TG9jYXRpb24od2luZG93LmxvY2F0aW9uKVxuICAgICAgICBkb25lKClcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIHJlcGxhY2VSb290SGlzdG9yeSgpe1xuICAgIEJyb3dzZXIucHVzaFN0YXRlKFwicmVwbGFjZVwiLCB7cm9vdDogdHJ1ZSwgdHlwZTogXCJwYXRjaFwiLCBpZDogdGhpcy5tYWluLmlkfSlcbiAgfVxuXG4gIHJlZ2lzdGVyTmV3TG9jYXRpb24obmV3TG9jYXRpb24pe1xuICAgIGxldCB7cGF0aG5hbWUsIHNlYXJjaH0gPSB0aGlzLmN1cnJlbnRMb2NhdGlvblxuICAgIGlmKHBhdGhuYW1lICsgc2VhcmNoID09PSBuZXdMb2NhdGlvbi5wYXRobmFtZSArIG5ld0xvY2F0aW9uLnNlYXJjaCl7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jdXJyZW50TG9jYXRpb24gPSBjbG9uZShuZXdMb2NhdGlvbilcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG5cbiAgYmluZEZvcm1zKCl7XG4gICAgbGV0IGl0ZXJhdGlvbnMgPSAwXG4gICAgdGhpcy5vbihcInN1Ym1pdFwiLCBlID0+IHtcbiAgICAgIGxldCBwaHhFdmVudCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLmJpbmRpbmcoXCJzdWJtaXRcIikpXG4gICAgICBpZighcGh4RXZlbnQpeyByZXR1cm4gfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnRhcmdldC5kaXNhYmxlZCA9IHRydWVcbiAgICAgIHRoaXMud2l0aGluT3duZXJzKGUudGFyZ2V0LCB2aWV3ID0+IHtcbiAgICAgICAgSlMuZXhlYyhcInN1Ym1pdFwiLCBwaHhFdmVudCwgdmlldywgZS50YXJnZXQsIFtcInB1c2hcIiwge31dKVxuICAgICAgfSlcbiAgICB9LCBmYWxzZSlcblxuICAgIGZvcihsZXQgdHlwZSBvZiBbXCJjaGFuZ2VcIiwgXCJpbnB1dFwiXSl7XG4gICAgICB0aGlzLm9uKHR5cGUsIGUgPT4ge1xuICAgICAgICBsZXQgaW5wdXQgPSBlLnRhcmdldFxuICAgICAgICBsZXQgcGh4RXZlbnQgPSBpbnB1dC5mb3JtICYmIGlucHV0LmZvcm0uZ2V0QXR0cmlidXRlKHRoaXMuYmluZGluZyhcImNoYW5nZVwiKSlcbiAgICAgICAgaWYoIXBoeEV2ZW50KXsgcmV0dXJuIH1cbiAgICAgICAgaWYoaW5wdXQudHlwZSA9PT0gXCJudW1iZXJcIiAmJiBpbnB1dC52YWxpZGl0eSAmJiBpbnB1dC52YWxpZGl0eS5iYWRJbnB1dCl7IHJldHVybiB9XG4gICAgICAgIGxldCBjdXJyZW50SXRlcmF0aW9ucyA9IGl0ZXJhdGlvbnNcbiAgICAgICAgaXRlcmF0aW9ucysrXG4gICAgICAgIGxldCB7YXQ6IGF0LCB0eXBlOiBsYXN0VHlwZX0gPSBET00ucHJpdmF0ZShpbnB1dCwgXCJwcmV2LWl0ZXJhdGlvblwiKSB8fCB7fVxuICAgICAgICAvLyBkZXRlY3QgZHVwIGJlY2F1c2Ugc29tZSBicm93c2VycyBkaXNwYXRjaCBib3RoIFwiaW5wdXRcIiBhbmQgXCJjaGFuZ2VcIlxuICAgICAgICBpZihhdCA9PT0gY3VycmVudEl0ZXJhdGlvbnMgLSAxICYmIHR5cGUgIT09IGxhc3RUeXBlKXsgcmV0dXJuIH1cblxuICAgICAgICBET00ucHV0UHJpdmF0ZShpbnB1dCwgXCJwcmV2LWl0ZXJhdGlvblwiLCB7YXQ6IGN1cnJlbnRJdGVyYXRpb25zLCB0eXBlOiB0eXBlfSlcblxuICAgICAgICB0aGlzLmRlYm91bmNlKGlucHV0LCBlLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy53aXRoaW5Pd25lcnMoaW5wdXQuZm9ybSwgdmlldyA9PiB7XG4gICAgICAgICAgICBET00ucHV0UHJpdmF0ZShpbnB1dCwgUEhYX0hBU19GT0NVU0VELCB0cnVlKVxuICAgICAgICAgICAgaWYoIURPTS5pc1RleHR1YWxJbnB1dChpbnB1dCkpe1xuICAgICAgICAgICAgICB0aGlzLnNldEFjdGl2ZUVsZW1lbnQoaW5wdXQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBKUy5leGVjKFwiY2hhbmdlXCIsIHBoeEV2ZW50LCB2aWV3LCBpbnB1dCwgW1wicHVzaFwiLCB7X3RhcmdldDogZS50YXJnZXQubmFtZX1dKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9LCBmYWxzZSlcbiAgICB9XG4gIH1cblxuICBkZWJvdW5jZShlbCwgZXZlbnQsIGNhbGxiYWNrKXtcbiAgICBsZXQgcGh4RGVib3VuY2UgPSB0aGlzLmJpbmRpbmcoUEhYX0RFQk9VTkNFKVxuICAgIGxldCBwaHhUaHJvdHRsZSA9IHRoaXMuYmluZGluZyhQSFhfVEhST1RUTEUpXG4gICAgbGV0IGRlZmF1bHREZWJvdW5jZSA9IHRoaXMuZGVmYXVsdHMuZGVib3VuY2UudG9TdHJpbmcoKVxuICAgIGxldCBkZWZhdWx0VGhyb3R0bGUgPSB0aGlzLmRlZmF1bHRzLnRocm90dGxlLnRvU3RyaW5nKClcbiAgICBET00uZGVib3VuY2UoZWwsIGV2ZW50LCBwaHhEZWJvdW5jZSwgZGVmYXVsdERlYm91bmNlLCBwaHhUaHJvdHRsZSwgZGVmYXVsdFRocm90dGxlLCBjYWxsYmFjaylcbiAgfVxuXG4gIHNpbGVuY2VFdmVudHMoY2FsbGJhY2spe1xuICAgIHRoaXMuc2lsZW5jZWQgPSB0cnVlXG4gICAgY2FsbGJhY2soKVxuICAgIHRoaXMuc2lsZW5jZWQgPSBmYWxzZVxuICB9XG5cbiAgb24oZXZlbnQsIGNhbGxiYWNrKXtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZSA9PiB7XG4gICAgICBpZighdGhpcy5zaWxlbmNlZCl7IGNhbGxiYWNrKGUpIH1cbiAgICB9KVxuICB9XG59XG5cbmNsYXNzIFRyYW5zaXRpb25TZXQge1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIHRoaXMudHJhbnNpdGlvbnMgPSBuZXcgU2V0KClcbiAgICB0aGlzLnBlbmRpbmdPcHMgPSBbXVxuICAgIHRoaXMucmVzZXQoKVxuICB9XG5cbiAgcmVzZXQoKXtcbiAgICB0aGlzLnRyYW5zaXRpb25zLmZvckVhY2godGltZXIgPT4ge1xuICAgICAgY2FuY2VsVGltZW91dCh0aW1lcilcbiAgICAgIHRoaXMudHJhbnNpdGlvbnMuZGVsZXRlKHRpbWVyKVxuICAgIH0pXG4gICAgdGhpcy5mbHVzaFBlbmRpbmdPcHMoKVxuICB9XG5cbiAgYWZ0ZXIoY2FsbGJhY2spe1xuICAgIGlmKHRoaXMuc2l6ZSgpID09PSAwKXtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wdXNoUGVuZGluZ09wKGNhbGxiYWNrKVxuICAgIH1cbiAgfVxuXG4gIGFkZFRyYW5zaXRpb24odGltZSwgb25TdGFydCwgb25Eb25lKXtcbiAgICBvblN0YXJ0KClcbiAgICBsZXQgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudHJhbnNpdGlvbnMuZGVsZXRlKHRpbWVyKVxuICAgICAgb25Eb25lKClcbiAgICAgIGlmKHRoaXMuc2l6ZSgpID09PSAwKXsgdGhpcy5mbHVzaFBlbmRpbmdPcHMoKSB9XG4gICAgfSwgdGltZSlcbiAgICB0aGlzLnRyYW5zaXRpb25zLmFkZCh0aW1lcilcbiAgfVxuXG4gIHB1c2hQZW5kaW5nT3Aob3ApeyB0aGlzLnBlbmRpbmdPcHMucHVzaChvcCkgfVxuXG4gIHNpemUoKXsgcmV0dXJuIHRoaXMudHJhbnNpdGlvbnMuc2l6ZSB9XG5cbiAgZmx1c2hQZW5kaW5nT3BzKCl7XG4gICAgdGhpcy5wZW5kaW5nT3BzLmZvckVhY2gob3AgPT4gb3AoKSlcbiAgICB0aGlzLnBlbmRpbmdPcHMgPSBbXVxuICB9XG59XG4iLCAiLy8gV2UgaW1wb3J0IHRoZSBDU1Mgd2hpY2ggaXMgZXh0cmFjdGVkIHRvIGl0cyBvd24gZmlsZSBieSBlc2J1aWxkLlxuLy8gUmVtb3ZlIHRoaXMgbGluZSBpZiB5b3UgYWRkIGEgeW91ciBvd24gQ1NTIGJ1aWxkIHBpcGVsaW5lIChlLmcgcG9zdGNzcykuXG5cbi8vIElmIHlvdSB3YW50IHRvIHVzZSBQaG9lbml4IGNoYW5uZWxzLCBydW4gYG1peCBoZWxwIHBoeC5nZW4uY2hhbm5lbGBcbi8vIHRvIGdldCBzdGFydGVkIGFuZCB0aGVuIHVuY29tbWVudCB0aGUgbGluZSBiZWxvdy5cbi8vIGltcG9ydCBcIi4vdXNlcl9zb2NrZXQuanNcIlxuXG4vLyBZb3UgY2FuIGluY2x1ZGUgZGVwZW5kZW5jaWVzIGluIHR3byB3YXlzLlxuLy9cbi8vIFRoZSBzaW1wbGVzdCBvcHRpb24gaXMgdG8gcHV0IHRoZW0gaW4gYXNzZXRzL3ZlbmRvciBhbmRcbi8vIGltcG9ydCB0aGVtIHVzaW5nIHJlbGF0aXZlIHBhdGhzOlxuLy9cbi8vICAgICBpbXBvcnQgXCIuLi92ZW5kb3Ivc29tZS1wYWNrYWdlLmpzXCJcbi8vXG4vLyBBbHRlcm5hdGl2ZWx5LCB5b3UgY2FuIGBucG0gaW5zdGFsbCBzb21lLXBhY2thZ2UgLS1wcmVmaXggYXNzZXRzYCBhbmQgaW1wb3J0XG4vLyB0aGVtIHVzaW5nIGEgcGF0aCBzdGFydGluZyB3aXRoIHRoZSBwYWNrYWdlIG5hbWU6XG4vL1xuLy8gICAgIGltcG9ydCBcInNvbWUtcGFja2FnZVwiXG4vL1xuXG4vLyBJbmNsdWRlIHBob2VuaXhfaHRtbCB0byBoYW5kbGUgbWV0aG9kPVBVVC9ERUxFVEUgaW4gZm9ybXMgYW5kIGJ1dHRvbnMuXG5pbXBvcnQgXCJwaG9lbml4X2h0bWxcIlxuLy8gRXN0YWJsaXNoIFBob2VuaXggU29ja2V0IGFuZCBMaXZlVmlldyBjb25maWd1cmF0aW9uLlxuaW1wb3J0IHtTb2NrZXR9IGZyb20gXCJwaG9lbml4XCJcbmltcG9ydCB7TGl2ZVNvY2tldH0gZnJvbSBcInBob2VuaXhfbGl2ZV92aWV3XCJcbmltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gudGhyb3R0bGUnXG5pbXBvcnQgXCIuL2pzY29sb3IuanNcIlxuXG5sZXQgdGhyb3R0bGVNcyA9IDEwMDtcbmxldCBIb29rcyA9IHt9XG5cbkhvb2tzLkNvbG9yU2VsZWN0b3IgPSB7XG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFwiYnVpbGRcIiwgdGhyb3R0bGUoZSA9PiB7XG4gICAgICBjb25zdCBldiA9IGUuZGV0YWlsXG4gICAgICBjb25zdCBoZXggPSBldi50b0hFWFN0cmluZygpXG4gICAgICB0aGlzLnB1c2hFdmVudChcImNvbG9yXCIsIHtoZXg6IGhleH0pXG4gICAgfSwgdGhyb3R0bGVNcykpXG4gIH1cbn1cblxuSG9va3MuQnJpZ2h0bmVzc1NsaWRlciA9IHtcbiAgbW91bnRlZCgpIHtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCB0aHJvdHRsZShlID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQoZS50YXJnZXQudmFsdWUpXG4gICAgICB0aGlzLnB1c2hFdmVudChcImJyaWdodG5lc3NcIiwge3ZhbHVlOiB2YWx1ZX0pXG4gICAgfSwgdGhyb3R0bGVNcykpXG4gIH1cbn1cblxuSG9va3MuV2hpdGVTbGlkZXIgPSB7XG4gIG1vdW50ZWQoKSB7XG4gICAgdGhpcy5lbC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGhyb3R0bGUoZSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlKVxuICAgICAgdGhpcy5wdXNoRXZlbnQoXCJ3aGl0ZS1zbGlkZXJcIiwge3ZhbHVlOiB2YWx1ZX0pXG4gICAgfSwgdGhyb3R0bGVNcykpXG4gIH1cbn1cblxud2luZG93LnVwZGF0ZSA9IGZ1bmN0aW9uKGNvbG9yRXZlbnQpIHtcbiAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2J1aWxkJywge2RldGFpbDogY29sb3JFdmVudH0pO1xuICBjb2xvckV2ZW50LnByZXZpZXdFbGVtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuaW1wb3J0IHRvcGJhciBmcm9tIFwiLi4vdmVuZG9yL3RvcGJhclwiXG5cbmxldCBjc3JmVG9rZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWV0YVtuYW1lPSdjc3JmLXRva2VuJ11cIikuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKVxubGV0IGxpdmVTb2NrZXQgPSBuZXcgTGl2ZVNvY2tldChcIi9saXZlXCIsIFNvY2tldCwge2hvb2tzOiBIb29rcywgcGFyYW1zOiB7X2NzcmZfdG9rZW46IGNzcmZUb2tlbn19KVxuXG4vLyBTaG93IHByb2dyZXNzIGJhciBvbiBsaXZlIG5hdmlnYXRpb24gYW5kIGZvcm0gc3VibWl0c1xudG9wYmFyLmNvbmZpZyh7YmFyQ29sb3JzOiB7MDogXCIjMjlkXCJ9LCBzaGFkb3dDb2xvcjogXCJyZ2JhKDAsIDAsIDAsIC4zKVwifSlcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicGh4OnBhZ2UtbG9hZGluZy1zdGFydFwiLCBpbmZvID0+IHRvcGJhci5zaG93KCkpXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBoeDpwYWdlLWxvYWRpbmctc3RvcFwiLCBpbmZvID0+IHRvcGJhci5oaWRlKCkpXG5cbi8vIGNvbm5lY3QgaWYgdGhlcmUgYXJlIGFueSBMaXZlVmlld3Mgb24gdGhlIHBhZ2VcbmxpdmVTb2NrZXQuY29ubmVjdCgpXG5cbi8vIGV4cG9zZSBsaXZlU29ja2V0IG9uIHdpbmRvdyBmb3Igd2ViIGNvbnNvbGUgZGVidWcgbG9ncyBhbmQgbGF0ZW5jeSBzaW11bGF0aW9uOlxuLy8gPj4gbGl2ZVNvY2tldC5lbmFibGVEZWJ1ZygpXG4vLyA+PiBsaXZlU29ja2V0LmVuYWJsZUxhdGVuY3lTaW0oMTAwMCkgIC8vIGVuYWJsZWQgZm9yIGR1cmF0aW9uIG9mIGJyb3dzZXIgc2Vzc2lvblxuLy8gPj4gbGl2ZVNvY2tldC5kaXNhYmxlTGF0ZW5jeVNpbSgpXG53aW5kb3cubGl2ZVNvY2tldCA9IGxpdmVTb2NrZXRcblxuIiwgIi8qKlxyXG4gKiBqc2NvbG9yIC0gSmF2YVNjcmlwdCBDb2xvciBQaWNrZXJcclxuICpcclxuICogQGxpbmsgICAgaHR0cDovL2pzY29sb3IuY29tXHJcbiAqIEBsaWNlbnNlIEZvciBvcGVuIHNvdXJjZSB1c2U6IEdQTHYzXHJcbiAqICAgICAgICAgIEZvciBjb21tZXJjaWFsIHVzZTogSlNDb2xvciBDb21tZXJjaWFsIExpY2Vuc2VcclxuICogQGF1dGhvciAgSmFuIE9kdmFya28gLSBFYXN0IERlc2lyZVxyXG4gKiBAdmVyc2lvbiAyLjMuM1xyXG4gKlxyXG4gKiBTZWUgdXNhZ2UgZXhhbXBsZXMgYXQgaHR0cDovL2pzY29sb3IuY29tL2V4YW1wbGVzL1xyXG4gKi9cclxuXHJcblxyXG5cInVzZSBzdHJpY3RcIjtcclxuXHJcblxyXG5pZiAoIXdpbmRvdy5qc2NvbG9yKSB7XHJcblxyXG53aW5kb3cuanNjb2xvciA9IChmdW5jdGlvbiAoKSB7IC8vIEJFR0lOIHdpbmRvdy5qc2NvbG9yXHJcblxyXG52YXIganNjID0ge1xyXG5cclxuXHJcblx0aW5pdGlhbGl6ZWQgOiBmYWxzZSxcclxuXHJcblx0aW5zdGFuY2VzIDogW10sIC8vIGNyZWF0ZWQgaW5zdGFuY2VzIG9mIGpzY29sb3JcclxuXHJcblx0dHJpZ2dlclF1ZXVlIDogW10sIC8vIGV2ZW50cyB3YWl0aW5nIHRvIGJlIHRyaWdnZXJlZCBhZnRlciBpbml0XHJcblxyXG5cclxuXHRyZWdpc3RlciA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBqc2MuaW5pdCwgZmFsc2UpO1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywganNjLm9uRG9jdW1lbnRNb3VzZURvd24sIGZhbHNlKTtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywganNjLm9uRG9jdW1lbnRLZXlVcCwgZmFsc2UpO1xyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGpzYy5vbldpbmRvd1Jlc2l6ZSwgZmFsc2UpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRpbml0IDogZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKGpzYy5pbml0aWFsaXplZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0anNjLnB1Yi5pbnN0YWxsKCk7XHJcblx0XHRqc2MuaW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG5cclxuXHRcdC8vIHRyaWdnZXIgZXZlbnRzIHdhaXRpbmcgaW4gdGhlIHF1ZXVlXHJcblx0XHR3aGlsZSAoanNjLnRyaWdnZXJRdWV1ZS5sZW5ndGgpIHtcclxuXHRcdFx0dmFyIGV2ID0ganNjLnRyaWdnZXJRdWV1ZS5zaGlmdCgpO1xyXG5cdFx0XHRqc2MudHJpZ2dlckdsb2JhbChldik7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdGluc3RhbGxCeVNlbGVjdG9yIDogZnVuY3Rpb24gKHNlbGVjdG9yLCByb290Tm9kZSkge1xyXG5cdFx0cm9vdE5vZGUgPSByb290Tm9kZSA/IGpzYy5ub2RlKHJvb3ROb2RlKSA6IGRvY3VtZW50O1xyXG5cdFx0aWYgKCFyb290Tm9kZSkge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01pc3Npbmcgcm9vdCBub2RlJyk7XHJcblx0XHR9XHJcblxyXG5cdFx0dmFyIGVsbXMgPSByb290Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuXHJcblx0XHQvLyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIERFUFJFQ0FURUQgaW5zdGFsbGF0aW9uL2NvbmZpZ3VyYXRpb24gdXNpbmcgY2xhc3NOYW1lXHJcblx0XHR2YXIgbWF0Y2hDbGFzcyA9IG5ldyBSZWdFeHAoJyhefFxcXFxzKSgnICsganNjLnB1Yi5sb29rdXBDbGFzcyArICcpKFxcXFxzKihcXFxce1tefV0qXFxcXH0pfFxcXFxzfCQpJywgJ2knKTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGVsbXMubGVuZ3RoOyBpICs9IDEpIHtcclxuXHJcblx0XHRcdGlmIChlbG1zW2ldLmpzY29sb3IgJiYgZWxtc1tpXS5qc2NvbG9yIGluc3RhbmNlb2YganNjLnB1Yikge1xyXG5cdFx0XHRcdGNvbnRpbnVlOyAvLyBqc2NvbG9yIGFscmVhZHkgaW5zdGFsbGVkIG9uIHRoaXMgZWxlbWVudFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZWxtc1tpXS50eXBlICE9PSB1bmRlZmluZWQgJiYgZWxtc1tpXS50eXBlLnRvTG93ZXJDYXNlKCkgPT0gJ2NvbG9yJyAmJiBqc2MuaXNDb2xvckF0dHJTdXBwb3J0ZWQpIHtcclxuXHRcdFx0XHRjb250aW51ZTsgLy8gc2tpcHMgaW5wdXRzIG9mIHR5cGUgJ2NvbG9yJyBpZiBzdXBwb3J0ZWQgYnkgdGhlIGJyb3dzZXJcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGRhdGFPcHRzLCBtO1xyXG5cclxuXHRcdFx0aWYgKFxyXG5cdFx0XHRcdChkYXRhT3B0cyA9IGpzYy5nZXREYXRhQXR0cihlbG1zW2ldLCAnanNjb2xvcicpKSAhPT0gbnVsbCB8fFxyXG5cdFx0XHRcdChlbG1zW2ldLmNsYXNzTmFtZSAmJiAobSA9IGVsbXNbaV0uY2xhc3NOYW1lLm1hdGNoKG1hdGNoQ2xhc3MpKSkgLy8gaW5zdGFsbGF0aW9uIHVzaW5nIGNsYXNzTmFtZSAoREVQUkVDQVRFRClcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0dmFyIHRhcmdldEVsbSA9IGVsbXNbaV07XHJcblxyXG5cdFx0XHRcdHZhciBvcHRzU3RyID0gJyc7XHJcblx0XHRcdFx0aWYgKGRhdGFPcHRzICE9PSBudWxsKSB7XHJcblx0XHRcdFx0XHRvcHRzU3RyID0gZGF0YU9wdHM7XHJcblxyXG5cdFx0XHRcdH0gZWxzZSBpZiAobSkgeyAvLyBpbnN0YWxsYXRpb24gdXNpbmcgY2xhc3NOYW1lIChERVBSRUNBVEVEKVxyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdJbnN0YWxsYXRpb24gdXNpbmcgY2xhc3MgbmFtZSBpcyBERVBSRUNBVEVELiBVc2UgZGF0YS1qc2NvbG9yPVwiXCIgYXR0cmlidXRlIGluc3RlYWQuJyArIGpzYy5kb2NzUmVmKTtcclxuXHRcdFx0XHRcdGlmIChtWzRdKSB7XHJcblx0XHRcdFx0XHRcdG9wdHNTdHIgPSBtWzRdO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dmFyIG9wdHMgPSBudWxsO1xyXG5cdFx0XHRcdGlmIChvcHRzU3RyLnRyaW0oKSkge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0b3B0cyA9IGpzYy5wYXJzZU9wdGlvbnNTdHIob3B0c1N0cik7XHJcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihlICsgJ1xcbicgKyBvcHRzU3RyKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRuZXcganNjLnB1Yih0YXJnZXRFbG0sIG9wdHMpO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0cGFyc2VPcHRpb25zU3RyIDogZnVuY3Rpb24gKHN0cikge1xyXG5cdFx0dmFyIG9wdHMgPSBudWxsO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdG9wdHMgPSBKU09OLnBhcnNlKHN0cik7XHJcblxyXG5cdFx0fSBjYXRjaCAoZVBhcnNlKSB7XHJcblx0XHRcdGlmICghanNjLnB1Yi5sb29zZUpTT04pIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBwYXJzZSBqc2NvbG9yIG9wdGlvbnMgYXMgSlNPTjogJyArIGVQYXJzZSk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gbG9vc2UgSlNPTiBzeW50YXggaXMgZW5hYmxlZCAtPiB0cnkgdG8gZXZhbHVhdGUgdGhlIG9wdGlvbnMgc3RyaW5nIGFzIEphdmFTY3JpcHQgb2JqZWN0XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdG9wdHMgPSAobmV3IEZ1bmN0aW9uICgndmFyIG9wdHMgPSAoJyArIHN0ciArICcpOyByZXR1cm4gdHlwZW9mIG9wdHMgPT09IFwib2JqZWN0XCIgPyBvcHRzIDoge307JykpKCk7XHJcblx0XHRcdFx0fSBjYXRjaCAoZUV2YWwpIHtcclxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGV2YWx1YXRlIGpzY29sb3Igb3B0aW9uczogJyArIGVFdmFsKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBvcHRzO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRJbnN0YW5jZXMgOiBmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgaW5zdCA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBqc2MuaW5zdGFuY2VzLmxlbmd0aDsgaSArPSAxKSB7XHJcblx0XHRcdC8vIGlmIHRoZSB0YXJnZXRFbGVtZW50IHN0aWxsIGV4aXN0cywgdGhlIGluc3RhbmNlIGlzIGNvbnNpZGVyZWQgXCJhbGl2ZVwiXHJcblx0XHRcdGlmIChqc2MuaW5zdGFuY2VzW2ldICYmIGpzYy5pbnN0YW5jZXNbaV0udGFyZ2V0RWxlbWVudCkge1xyXG5cdFx0XHRcdGluc3QucHVzaChqc2MuaW5zdGFuY2VzW2ldKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGluc3Q7XHJcblx0fSxcclxuXHJcblxyXG5cdGNyZWF0ZUVsIDogZnVuY3Rpb24gKHRhZ05hbWUpIHtcclxuXHRcdHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcblx0XHRqc2Muc2V0RGF0YShlbCwgJ2d1aScsIHRydWUpXHJcblx0XHRyZXR1cm4gZWw7XHJcblx0fSxcclxuXHJcblxyXG5cdG5vZGUgOiBmdW5jdGlvbiAobm9kZU9yU2VsZWN0b3IpIHtcclxuXHRcdGlmICghbm9kZU9yU2VsZWN0b3IpIHtcclxuXHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHR5cGVvZiBub2RlT3JTZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0Ly8gcXVlcnkgc2VsZWN0b3JcclxuXHRcdFx0dmFyIHNlbCA9IG5vZGVPclNlbGVjdG9yO1xyXG5cdFx0XHR2YXIgZWwgPSBudWxsO1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWwpO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghZWwpIHtcclxuXHRcdFx0XHRjb25zb2xlLndhcm4oJ05vIGVsZW1lbnQgbWF0Y2hlcyB0aGUgc2VsZWN0b3I6ICVzJywgc2VsKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZWw7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGpzYy5pc05vZGUobm9kZU9yU2VsZWN0b3IpKSB7XHJcblx0XHRcdC8vIERPTSBub2RlXHJcblx0XHRcdHJldHVybiBub2RlT3JTZWxlY3RvcjtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zb2xlLndhcm4oJ0ludmFsaWQgbm9kZSBvZiB0eXBlICVzOiAlcycsIHR5cGVvZiBub2RlT3JTZWxlY3Rvciwgbm9kZU9yU2VsZWN0b3IpO1xyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIFNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zODQyODYvXHJcblx0aXNOb2RlIDogZnVuY3Rpb24gKHZhbCkge1xyXG5cdFx0aWYgKHR5cGVvZiBOb2RlID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRyZXR1cm4gdmFsIGluc3RhbmNlb2YgTm9kZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbC5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIHZhbC5ub2RlTmFtZSA9PT0gJ3N0cmluZyc7XHJcblx0fSxcclxuXHJcblxyXG5cdG5vZGVOYW1lIDogZnVuY3Rpb24gKG5vZGUpIHtcclxuXHRcdGlmIChub2RlICYmIG5vZGUubm9kZU5hbWUpIHtcclxuXHRcdFx0cmV0dXJuIG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHJcblx0cmVtb3ZlQ2hpbGRyZW4gOiBmdW5jdGlvbiAobm9kZSkge1xyXG5cdFx0d2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdGlzVGV4dElucHV0IDogZnVuY3Rpb24gKGVsKSB7XHJcblx0XHRyZXR1cm4gZWwgJiYganNjLm5vZGVOYW1lKGVsKSA9PT0gJ2lucHV0JyAmJiBlbC50eXBlLnRvTG93ZXJDYXNlKCkgPT09ICd0ZXh0JztcclxuXHR9LFxyXG5cclxuXHJcblx0aXNCdXR0b24gOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdGlmICghZWwpIHtcclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0dmFyIG4gPSBqc2Mubm9kZU5hbWUoZWwpO1xyXG5cdFx0cmV0dXJuIChcclxuXHRcdFx0KG4gPT09ICdidXR0b24nKSB8fFxyXG5cdFx0XHQobiA9PT0gJ2lucHV0JyAmJiBbJ2J1dHRvbicsICdzdWJtaXQnLCAncmVzZXQnXS5pbmRleE9mKGVsLnR5cGUudG9Mb3dlckNhc2UoKSkgPiAtMSlcclxuXHRcdCk7XHJcblx0fSxcclxuXHJcblxyXG5cdGlzQnV0dG9uRW1wdHkgOiBmdW5jdGlvbiAoZWwpIHtcclxuXHRcdHN3aXRjaCAoanNjLm5vZGVOYW1lKGVsKSkge1xyXG5cdFx0XHRjYXNlICdpbnB1dCc6IHJldHVybiAoIWVsLnZhbHVlIHx8IGVsLnZhbHVlLnRyaW0oKSA9PT0gJycpO1xyXG5cdFx0XHRjYXNlICdidXR0b24nOiByZXR1cm4gKGVsLnRleHRDb250ZW50LnRyaW0oKSA9PT0gJycpO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIG51bGw7IC8vIGNvdWxkIG5vdCBkZXRlcm1pbmUgZWxlbWVudCdzIHRleHRcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9XSUNHL0V2ZW50TGlzdGVuZXJPcHRpb25zL2Jsb2IvZ2gtcGFnZXMvZXhwbGFpbmVyLm1kXHJcblx0aXNQYXNzaXZlRXZlbnRTdXBwb3J0ZWQgOiAoZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIHN1cHBvcnRlZCA9IGZhbHNlO1xyXG5cclxuXHRcdHRyeSB7XHJcblx0XHRcdHZhciBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcclxuXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uICgpIHsgc3VwcG9ydGVkID0gdHJ1ZTsgfVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlJywgbnVsbCwgb3B0cyk7XHJcblx0XHRcdHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZScsIG51bGwsIG9wdHMpO1xyXG5cdFx0fSBjYXRjaCAoZSkge31cclxuXHJcblx0XHRyZXR1cm4gc3VwcG9ydGVkO1xyXG5cdH0pKCksXHJcblxyXG5cclxuXHRpc0NvbG9yQXR0clN1cHBvcnRlZCA6IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuXHRcdGlmIChlbG0uc2V0QXR0cmlidXRlKSB7XHJcblx0XHRcdGVsbS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnY29sb3InKTtcclxuXHRcdFx0aWYgKGVsbS50eXBlLnRvTG93ZXJDYXNlKCkgPT0gJ2NvbG9yJykge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSkoKSxcclxuXHJcblxyXG5cdGRhdGFQcm9wIDogJ19kYXRhX2pzY29sb3InLFxyXG5cclxuXHJcblx0Ly8gdXNhZ2U6XHJcblx0Ly8gICBzZXREYXRhKG9iaiwgcHJvcCwgdmFsdWUpXHJcblx0Ly8gICBzZXREYXRhKG9iaiwge3Byb3A6dmFsdWUsIC4uLn0pXHJcblx0Ly9cclxuXHRzZXREYXRhIDogZnVuY3Rpb24gKCkge1xyXG5cdFx0dmFyIG9iaiA9IGFyZ3VtZW50c1swXTtcclxuXHJcblx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xyXG5cdFx0XHQvLyBzZXR0aW5nIGEgc2luZ2xlIHByb3BlcnR5XHJcblx0XHRcdHZhciBkYXRhID0gb2JqLmhhc093blByb3BlcnR5KGpzYy5kYXRhUHJvcCkgPyBvYmpbanNjLmRhdGFQcm9wXSA6IChvYmpbanNjLmRhdGFQcm9wXSA9IHt9KTtcclxuXHRcdFx0dmFyIHByb3AgPSBhcmd1bWVudHNbMV07XHJcblx0XHRcdHZhciB2YWx1ZSA9IGFyZ3VtZW50c1syXTtcclxuXHJcblx0XHRcdGRhdGFbcHJvcF0gPSB2YWx1ZTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBhcmd1bWVudHNbMV0gPT09ICdvYmplY3QnKSB7XHJcblx0XHRcdC8vIHNldHRpbmcgbXVsdGlwbGUgcHJvcGVydGllc1xyXG5cdFx0XHR2YXIgZGF0YSA9IG9iai5oYXNPd25Qcm9wZXJ0eShqc2MuZGF0YVByb3ApID8gb2JqW2pzYy5kYXRhUHJvcF0gOiAob2JqW2pzYy5kYXRhUHJvcF0gPSB7fSk7XHJcblx0XHRcdHZhciBtYXAgPSBhcmd1bWVudHNbMV07XHJcblxyXG5cdFx0XHRmb3IgKHZhciBwcm9wIGluIG1hcCkge1xyXG5cdFx0XHRcdGlmIChtYXAuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuXHRcdFx0XHRcdGRhdGFbcHJvcF0gPSBtYXBbcHJvcF07XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudHMnKTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gdXNhZ2U6XHJcblx0Ly8gICByZW1vdmVEYXRhKG9iaiwgcHJvcCwgW3Byb3AuLi5dKVxyXG5cdC8vXHJcblx0cmVtb3ZlRGF0YSA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBvYmogPSBhcmd1bWVudHNbMF07XHJcblx0XHRpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShqc2MuZGF0YVByb3ApKSB7XHJcblx0XHRcdHJldHVybiB0cnVlOyAvLyBkYXRhIG9iamVjdCBkb2VzIG5vdCBleGlzdFxyXG5cdFx0fVxyXG5cdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcclxuXHRcdFx0dmFyIHByb3AgPSBhcmd1bWVudHNbaV07XHJcblx0XHRcdGRlbGV0ZSBvYmpbanNjLmRhdGFQcm9wXVtwcm9wXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiB0cnVlO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXREYXRhIDogZnVuY3Rpb24gKG9iaiwgcHJvcCwgc2V0RGVmYXVsdCkge1xyXG5cdFx0aWYgKCFvYmouaGFzT3duUHJvcGVydHkoanNjLmRhdGFQcm9wKSkge1xyXG5cdFx0XHQvLyBkYXRhIG9iamVjdCBkb2VzIG5vdCBleGlzdFxyXG5cdFx0XHRpZiAoc2V0RGVmYXVsdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0b2JqW2pzYy5kYXRhUHJvcF0gPSB7fTsgLy8gY3JlYXRlIGRhdGEgb2JqZWN0XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIHVuZGVmaW5lZDsgLy8gbm8gdmFsdWUgdG8gcmV0dXJuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHZhciBkYXRhID0gb2JqW2pzYy5kYXRhUHJvcF07XHJcblxyXG5cdFx0aWYgKCFkYXRhLmhhc093blByb3BlcnR5KHByb3ApICYmIHNldERlZmF1bHQgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRkYXRhW3Byb3BdID0gc2V0RGVmYXVsdDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBkYXRhW3Byb3BdO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXREYXRhQXR0ciA6IGZ1bmN0aW9uIChlbCwgbmFtZSkge1xyXG5cdFx0dmFyIGF0dHJOYW1lID0gJ2RhdGEtJyArIG5hbWU7XHJcblx0XHR2YXIgYXR0clZhbHVlID0gZWwuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKTtcclxuXHRcdHJldHVybiBhdHRyVmFsdWU7XHJcblx0fSxcclxuXHJcblxyXG5cdF9hdHRhY2hlZEdyb3VwRXZlbnRzIDoge30sXHJcblxyXG5cclxuXHRhdHRhY2hHcm91cEV2ZW50IDogZnVuY3Rpb24gKGdyb3VwTmFtZSwgZWwsIGV2bnQsIGZ1bmMpIHtcclxuXHRcdGlmICghanNjLl9hdHRhY2hlZEdyb3VwRXZlbnRzLmhhc093blByb3BlcnR5KGdyb3VwTmFtZSkpIHtcclxuXHRcdFx0anNjLl9hdHRhY2hlZEdyb3VwRXZlbnRzW2dyb3VwTmFtZV0gPSBbXTtcclxuXHRcdH1cclxuXHRcdGpzYy5fYXR0YWNoZWRHcm91cEV2ZW50c1tncm91cE5hbWVdLnB1c2goW2VsLCBldm50LCBmdW5jXSk7XHJcblx0XHRlbC5hZGRFdmVudExpc3RlbmVyKGV2bnQsIGZ1bmMsIGZhbHNlKTtcclxuXHR9LFxyXG5cclxuXHJcblx0ZGV0YWNoR3JvdXBFdmVudHMgOiBmdW5jdGlvbiAoZ3JvdXBOYW1lKSB7XHJcblx0XHRpZiAoanNjLl9hdHRhY2hlZEdyb3VwRXZlbnRzLmhhc093blByb3BlcnR5KGdyb3VwTmFtZSkpIHtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBqc2MuX2F0dGFjaGVkR3JvdXBFdmVudHNbZ3JvdXBOYW1lXS5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRcdHZhciBldnQgPSBqc2MuX2F0dGFjaGVkR3JvdXBFdmVudHNbZ3JvdXBOYW1lXVtpXTtcclxuXHRcdFx0XHRldnRbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRbMV0sIGV2dFsyXSwgZmFsc2UpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGRlbGV0ZSBqc2MuX2F0dGFjaGVkR3JvdXBFdmVudHNbZ3JvdXBOYW1lXTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0cHJldmVudERlZmF1bHQgOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYgKGUucHJldmVudERlZmF1bHQpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XHJcblx0XHRlLnJldHVyblZhbHVlID0gZmFsc2U7XHJcblx0fSxcclxuXHJcblxyXG5cdGNhcHR1cmVUYXJnZXQgOiBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcblx0XHQvLyBJRVxyXG5cdFx0aWYgKHRhcmdldC5zZXRDYXB0dXJlKSB7XHJcblx0XHRcdGpzYy5fY2FwdHVyZWRUYXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdGpzYy5fY2FwdHVyZWRUYXJnZXQuc2V0Q2FwdHVyZSgpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRyZWxlYXNlVGFyZ2V0IDogZnVuY3Rpb24gKCkge1xyXG5cdFx0Ly8gSUVcclxuXHRcdGlmIChqc2MuX2NhcHR1cmVkVGFyZ2V0KSB7XHJcblx0XHRcdGpzYy5fY2FwdHVyZWRUYXJnZXQucmVsZWFzZUNhcHR1cmUoKTtcclxuXHRcdFx0anNjLl9jYXB0dXJlZFRhcmdldCA9IG51bGw7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdHRyaWdnZXJFdmVudCA6IGZ1bmN0aW9uIChlbCwgZXZlbnROYW1lLCBidWJibGVzLCBjYW5jZWxhYmxlKSB7XHJcblx0XHRpZiAoIWVsKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZXYgPSBudWxsO1xyXG5cclxuXHRcdGlmICh0eXBlb2YgRXZlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuXHRcdFx0ZXYgPSBuZXcgRXZlbnQoZXZlbnROYW1lLCB7XHJcblx0XHRcdFx0YnViYmxlczogYnViYmxlcyxcclxuXHRcdFx0XHRjYW5jZWxhYmxlOiBjYW5jZWxhYmxlXHJcblx0XHRcdH0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gSUVcclxuXHRcdFx0ZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcclxuXHRcdFx0ZXYuaW5pdEV2ZW50KGV2ZW50TmFtZSwgYnViYmxlcywgY2FuY2VsYWJsZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKCFldikge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gc28gdGhhdCB3ZSBrbm93IHRoYXQgdGhlIGV2ZW50IHdhcyB0cmlnZ2VyZWQgaW50ZXJuYWxseVxyXG5cdFx0anNjLnNldERhdGEoZXYsICdpbnRlcm5hbCcsIHRydWUpO1xyXG5cclxuXHRcdGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xyXG5cdFx0cmV0dXJuIHRydWU7XHJcblx0fSxcclxuXHJcblxyXG5cdHRyaWdnZXJJbnB1dEV2ZW50IDogZnVuY3Rpb24gKGVsLCBldmVudE5hbWUsIGJ1YmJsZXMsIGNhbmNlbGFibGUpIHtcclxuXHRcdGlmICghZWwpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYgKGpzYy5pc1RleHRJbnB1dChlbCkpIHtcclxuXHRcdFx0anNjLnRyaWdnZXJFdmVudChlbCwgZXZlbnROYW1lLCBidWJibGVzLCBjYW5jZWxhYmxlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0ZXZlbnRLZXkgOiBmdW5jdGlvbiAoZXYpIHtcclxuXHRcdHZhciBrZXlzID0ge1xyXG5cdFx0XHQ5OiAnVGFiJyxcclxuXHRcdFx0MTM6ICdFbnRlcicsXHJcblx0XHRcdDI3OiAnRXNjYXBlJyxcclxuXHRcdH07XHJcblx0XHRpZiAodHlwZW9mIGV2LmNvZGUgPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdHJldHVybiBldi5jb2RlO1xyXG5cdFx0fSBlbHNlIGlmIChldi5rZXlDb2RlICE9PSB1bmRlZmluZWQgJiYga2V5cy5oYXNPd25Qcm9wZXJ0eShldi5rZXlDb2RlKSkge1xyXG5cdFx0XHRyZXR1cm4ga2V5c1tldi5rZXlDb2RlXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH0sXHJcblxyXG5cclxuXHRzdHJMaXN0IDogZnVuY3Rpb24gKHN0cikge1xyXG5cdFx0aWYgKCFzdHIpIHtcclxuXHRcdFx0cmV0dXJuIFtdO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykuc3BsaXQoL1xccysvKTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gVGhlIGNsYXNzTmFtZSBwYXJhbWV0ZXIgKHN0cikgY2FuIG9ubHkgY29udGFpbiBhIHNpbmdsZSBjbGFzcyBuYW1lXHJcblx0aGFzQ2xhc3MgOiBmdW5jdGlvbiAoZWxtLCBjbGFzc05hbWUpIHtcclxuXHRcdGlmICghY2xhc3NOYW1lKSB7XHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdH1cclxuXHRcdGlmIChlbG0uY2xhc3NMaXN0ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0cmV0dXJuIGVsbS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHRcdC8vIHBvbHlmaWxsXHJcblx0XHRyZXR1cm4gLTEgIT0gKCcgJyArIGVsbS5jbGFzc05hbWUucmVwbGFjZSgvXFxzKy9nLCAnICcpICsgJyAnKS5pbmRleE9mKCcgJyArIGNsYXNzTmFtZSArICcgJyk7XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIFRoZSBjbGFzc05hbWUgcGFyYW1ldGVyIChzdHIpIGNhbiBjb250YWluIG11bHRpcGxlIGNsYXNzIG5hbWVzIHNlcGFyYXRlZCBieSB3aGl0ZXNwYWNlXHJcblx0YWRkQ2xhc3MgOiBmdW5jdGlvbiAoZWxtLCBjbGFzc05hbWUpIHtcclxuXHRcdHZhciBjbGFzc05hbWVzID0ganNjLnN0ckxpc3QoY2xhc3NOYW1lKTtcclxuXHJcblx0XHRpZiAoZWxtLmNsYXNzTGlzdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NOYW1lcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRcdGVsbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdC8vIHBvbHlmaWxsXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzTmFtZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuXHRcdFx0aWYgKCFqc2MuaGFzQ2xhc3MoZWxtLCBjbGFzc05hbWVzW2ldKSkge1xyXG5cdFx0XHRcdGVsbS5jbGFzc05hbWUgKz0gKGVsbS5jbGFzc05hbWUgPyAnICcgOiAnJykgKyBjbGFzc05hbWVzW2ldO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIFRoZSBjbGFzc05hbWUgcGFyYW1ldGVyIChzdHIpIGNhbiBjb250YWluIG11bHRpcGxlIGNsYXNzIG5hbWVzIHNlcGFyYXRlZCBieSB3aGl0ZXNwYWNlXHJcblx0cmVtb3ZlQ2xhc3MgOiBmdW5jdGlvbiAoZWxtLCBjbGFzc05hbWUpIHtcclxuXHRcdHZhciBjbGFzc05hbWVzID0ganNjLnN0ckxpc3QoY2xhc3NOYW1lKTtcclxuXHJcblx0XHRpZiAoZWxtLmNsYXNzTGlzdCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3NOYW1lcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRcdGVsbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZXNbaV0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdC8vIHBvbHlmaWxsXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzTmFtZXMubGVuZ3RoOyBpICs9IDEpIHtcclxuXHRcdFx0dmFyIHJlcGwgPSBuZXcgUmVnRXhwKFxyXG5cdFx0XHRcdCdeXFxcXHMqJyArIGNsYXNzTmFtZXNbaV0gKyAnXFxcXHMqfCcgK1xyXG5cdFx0XHRcdCdcXFxccyonICsgY2xhc3NOYW1lc1tpXSArICdcXFxccyokfCcgK1xyXG5cdFx0XHRcdCdcXFxccysnICsgY2xhc3NOYW1lc1tpXSArICcoXFxcXHMrKScsXHJcblx0XHRcdFx0J2cnXHJcblx0XHRcdCk7XHJcblx0XHRcdGVsbS5jbGFzc05hbWUgPSBlbG0uY2xhc3NOYW1lLnJlcGxhY2UocmVwbCwgJyQxJyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdGdldENvbXBTdHlsZSA6IGZ1bmN0aW9uIChlbG0pIHtcclxuXHRcdHZhciBjb21wU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA/IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsbSkgOiBlbG0uY3VycmVudFN0eWxlO1xyXG5cclxuXHRcdC8vIE5vdGU6IEluIEZpcmVmb3gsIGdldENvbXB1dGVkU3R5bGUgcmV0dXJucyBudWxsIGluIGEgaGlkZGVuIGlmcmFtZSxcclxuXHRcdC8vIHRoYXQncyB3aHkgd2UgbmVlZCB0byBjaGVjayBpZiB0aGUgcmV0dXJuZWQgdmFsdWUgaXMgbm9uLWVtcHR5XHJcblx0XHRpZiAoIWNvbXBTdHlsZSkge1xyXG5cdFx0XHRyZXR1cm4ge307XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gY29tcFN0eWxlO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBOb3RlOlxyXG5cdC8vICAgU2V0dGluZyBhIHByb3BlcnR5IHRvIE5VTEwgcmV2ZXJ0cyBpdCB0byB0aGUgc3RhdGUgYmVmb3JlIGl0IHdhcyBmaXJzdCBzZXRcclxuXHQvLyAgIHdpdGggdGhlICdyZXZlcnNpYmxlJyBmbGFnIGVuYWJsZWRcclxuXHQvL1xyXG5cdHNldFN0eWxlIDogZnVuY3Rpb24gKGVsbSwgc3R5bGVzLCBpbXBvcnRhbnQsIHJldmVyc2libGUpIHtcclxuXHRcdC8vIHVzaW5nICcnIGZvciBzdGFuZGFyZCBwcmlvcml0eSAoSUUxMCBhcHBhcmVudGx5IGRvZXNuJ3QgbGlrZSB2YWx1ZSB1bmRlZmluZWQpXHJcblx0XHR2YXIgcHJpb3JpdHkgPSBpbXBvcnRhbnQgPyAnaW1wb3J0YW50JyA6ICcnO1xyXG5cdFx0dmFyIG9yaWdTdHlsZSA9IG51bGw7XHJcblxyXG5cdFx0Zm9yICh2YXIgcHJvcCBpbiBzdHlsZXMpIHtcclxuXHRcdFx0aWYgKHN0eWxlcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG5cdFx0XHRcdHZhciBzZXRWYWwgPSBudWxsO1xyXG5cclxuXHRcdFx0XHRpZiAoc3R5bGVzW3Byb3BdID09PSBudWxsKSB7XHJcblx0XHRcdFx0XHQvLyByZXZlcnRpbmcgYSBwcm9wZXJ0eSB2YWx1ZVxyXG5cclxuXHRcdFx0XHRcdGlmICghb3JpZ1N0eWxlKSB7XHJcblx0XHRcdFx0XHRcdC8vIGdldCB0aGUgb3JpZ2luYWwgc3R5bGUgb2JqZWN0LCBidXQgZG9udCd0IHRyeSB0byBjcmVhdGUgaXQgaWYgaXQgZG9lc24ndCBleGlzdFxyXG5cdFx0XHRcdFx0XHRvcmlnU3R5bGUgPSBqc2MuZ2V0RGF0YShlbG0sICdvcmlnU3R5bGUnKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmIChvcmlnU3R5bGUgJiYgb3JpZ1N0eWxlLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcblx0XHRcdFx0XHRcdC8vIHdlIGhhdmUgcHJvcGVydHkncyBvcmlnaW5hbCB2YWx1ZSAtPiB1c2UgaXRcclxuXHRcdFx0XHRcdFx0c2V0VmFsID0gb3JpZ1N0eWxlW3Byb3BdO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gc2V0dGluZyBhIHByb3BlcnR5IHZhbHVlXHJcblxyXG5cdFx0XHRcdFx0aWYgKHJldmVyc2libGUpIHtcclxuXHRcdFx0XHRcdFx0aWYgKCFvcmlnU3R5bGUpIHtcclxuXHRcdFx0XHRcdFx0XHQvLyBnZXQgdGhlIG9yaWdpbmFsIHN0eWxlIG9iamVjdCBhbmQgaWYgaXQgZG9lc24ndCBleGlzdCwgY3JlYXRlIGl0XHJcblx0XHRcdFx0XHRcdFx0b3JpZ1N0eWxlID0ganNjLmdldERhdGEoZWxtLCAnb3JpZ1N0eWxlJywge30pO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmICghb3JpZ1N0eWxlLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcblx0XHRcdFx0XHRcdFx0Ly8gb3JpZ2luYWwgcHJvcGVydHkgdmFsdWUgbm90IHlldCBzdG9yZWQgLT4gc3RvcmUgaXRcclxuXHRcdFx0XHRcdFx0XHRvcmlnU3R5bGVbcHJvcF0gPSBlbG0uc3R5bGVbcHJvcF07XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHNldFZhbCA9IHN0eWxlc1twcm9wXTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChzZXRWYWwgIT09IG51bGwpIHtcclxuXHRcdFx0XHRcdGVsbS5zdHlsZS5zZXRQcm9wZXJ0eShwcm9wLCBzZXRWYWwsIHByaW9yaXR5KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0bGluZWFyR3JhZGllbnQgOiAoZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGZ1bmN0aW9uIGdldEZ1bmNOYW1lICgpIHtcclxuXHRcdFx0dmFyIHN0ZE5hbWUgPSAnbGluZWFyLWdyYWRpZW50JztcclxuXHRcdFx0dmFyIHByZWZpeGVzID0gWycnLCAnLXdlYmtpdC0nLCAnLW1vei0nLCAnLW8tJywgJy1tcy0nXTtcclxuXHRcdFx0dmFyIGhlbHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRcdHZhciB0cnlGdW5jID0gcHJlZml4ZXNbaV0gKyBzdGROYW1lO1xyXG5cdFx0XHRcdHZhciB0cnlWYWwgPSB0cnlGdW5jICsgJyh0byByaWdodCwgcmdiYSgwLDAsMCwwKSwgcmdiYSgwLDAsMCwwKSknO1xyXG5cclxuXHRcdFx0XHRoZWxwZXIuc3R5bGUuYmFja2dyb3VuZCA9IHRyeVZhbDtcclxuXHRcdFx0XHRpZiAoaGVscGVyLnN0eWxlLmJhY2tncm91bmQpIHsgLy8gQ1NTIGJhY2tncm91bmQgc3VjY2Vzc2Z1bGx5IHNldCAtPiBmdW5jdGlvbiBuYW1lIGlzIHN1cHBvcnRlZFxyXG5cdFx0XHRcdFx0cmV0dXJuIHRyeUZ1bmM7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGROYW1lOyAvLyBmYWxsYmFjayB0byBzdGFuZGFyZCAnbGluZWFyLWdyYWRpZW50JyB3aXRob3V0IHZlbmRvciBwcmVmaXhcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgZnVuY05hbWUgPSBnZXRGdW5jTmFtZSgpO1xyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBmdW5jTmFtZSArICcoJyArIEFycmF5LnByb3RvdHlwZS5qb2luLmNhbGwoYXJndW1lbnRzLCAnLCAnKSArICcpJztcclxuXHRcdH07XHJcblxyXG5cdH0pKCksXHJcblxyXG5cclxuXHRzZXRCb3JkZXJSYWRpdXMgOiBmdW5jdGlvbiAoZWxtLCB2YWx1ZSkge1xyXG5cdFx0anNjLnNldFN0eWxlKGVsbSwgeydib3JkZXItcmFkaXVzJyA6IHZhbHVlIHx8ICcwJ30pO1xyXG5cdH0sXHJcblxyXG5cclxuXHRzZXRCb3hTaGFkb3cgOiBmdW5jdGlvbiAoZWxtLCB2YWx1ZSkge1xyXG5cdFx0anNjLnNldFN0eWxlKGVsbSwgeydib3gtc2hhZG93JzogdmFsdWUgfHwgJ25vbmUnfSk7XHJcblx0fSxcclxuXHJcblxyXG5cdGdldEVsZW1lbnRQb3MgOiBmdW5jdGlvbiAoZSwgcmVsYXRpdmVUb1ZpZXdwb3J0KSB7XHJcblx0XHR2YXIgeD0wLCB5PTA7XHJcblx0XHR2YXIgcmVjdCA9IGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHR4ID0gcmVjdC5sZWZ0O1xyXG5cdFx0eSA9IHJlY3QudG9wO1xyXG5cdFx0aWYgKCFyZWxhdGl2ZVRvVmlld3BvcnQpIHtcclxuXHRcdFx0dmFyIHZpZXdQb3MgPSBqc2MuZ2V0Vmlld1BvcygpO1xyXG5cdFx0XHR4ICs9IHZpZXdQb3NbMF07XHJcblx0XHRcdHkgKz0gdmlld1Bvc1sxXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBbeCwgeV07XHJcblx0fSxcclxuXHJcblxyXG5cdGdldEVsZW1lbnRTaXplIDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHJldHVybiBbZS5vZmZzZXRXaWR0aCwgZS5vZmZzZXRIZWlnaHRdO1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBnZXQgcG9pbnRlcidzIFgvWSBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB2aWV3cG9ydFxyXG5cdGdldEFic1BvaW50ZXJQb3MgOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHggPSAwLCB5ID0gMDtcclxuXHRcdGlmICh0eXBlb2YgZS5jaGFuZ2VkVG91Y2hlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGgpIHtcclxuXHRcdFx0Ly8gdG91Y2ggZGV2aWNlc1xyXG5cdFx0XHR4ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xyXG5cdFx0XHR5ID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgZS5jbGllbnRYID09PSAnbnVtYmVyJykge1xyXG5cdFx0XHR4ID0gZS5jbGllbnRYO1xyXG5cdFx0XHR5ID0gZS5jbGllbnRZO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHsgeDogeCwgeTogeSB9O1xyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBnZXQgcG9pbnRlcidzIFgvWSBjb29yZGluYXRlcyByZWxhdGl2ZSB0byB0YXJnZXQgZWxlbWVudFxyXG5cdGdldFJlbFBvaW50ZXJQb3MgOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcclxuXHRcdHZhciB0YXJnZXRSZWN0ID0gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuXHRcdHZhciB4ID0gMCwgeSA9IDA7XHJcblxyXG5cdFx0dmFyIGNsaWVudFggPSAwLCBjbGllbnRZID0gMDtcclxuXHRcdGlmICh0eXBlb2YgZS5jaGFuZ2VkVG91Y2hlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGgpIHtcclxuXHRcdFx0Ly8gdG91Y2ggZGV2aWNlc1xyXG5cdFx0XHRjbGllbnRYID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYO1xyXG5cdFx0XHRjbGllbnRZID0gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZO1xyXG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgZS5jbGllbnRYID09PSAnbnVtYmVyJykge1xyXG5cdFx0XHRjbGllbnRYID0gZS5jbGllbnRYO1xyXG5cdFx0XHRjbGllbnRZID0gZS5jbGllbnRZO1xyXG5cdFx0fVxyXG5cclxuXHRcdHggPSBjbGllbnRYIC0gdGFyZ2V0UmVjdC5sZWZ0O1xyXG5cdFx0eSA9IGNsaWVudFkgLSB0YXJnZXRSZWN0LnRvcDtcclxuXHRcdHJldHVybiB7IHg6IHgsIHk6IHkgfTtcclxuXHR9LFxyXG5cclxuXHJcblx0Z2V0Vmlld1BvcyA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHQod2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvYy5zY3JvbGxMZWZ0KSAtIChkb2MuY2xpZW50TGVmdCB8fCAwKSxcclxuXHRcdFx0KHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2Muc2Nyb2xsVG9wKSAtIChkb2MuY2xpZW50VG9wIHx8IDApXHJcblx0XHRdO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRWaWV3U2l6ZSA6IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHQod2luZG93LmlubmVyV2lkdGggfHwgZG9jLmNsaWVudFdpZHRoKSxcclxuXHRcdFx0KHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2MuY2xpZW50SGVpZ2h0KSxcclxuXHRcdF07XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIHI6IDAtMjU1XHJcblx0Ly8gZzogMC0yNTVcclxuXHQvLyBiOiAwLTI1NVxyXG5cdC8vXHJcblx0Ly8gcmV0dXJuczogWyAwLTM2MCwgMC0xMDAsIDAtMTAwIF1cclxuXHQvL1xyXG5cdFJHQl9IU1YgOiBmdW5jdGlvbiAociwgZywgYikge1xyXG5cdFx0ciAvPSAyNTU7XHJcblx0XHRnIC89IDI1NTtcclxuXHRcdGIgLz0gMjU1O1xyXG5cdFx0dmFyIG4gPSBNYXRoLm1pbihNYXRoLm1pbihyLGcpLGIpO1xyXG5cdFx0dmFyIHYgPSBNYXRoLm1heChNYXRoLm1heChyLGcpLGIpO1xyXG5cdFx0dmFyIG0gPSB2IC0gbjtcclxuXHRcdGlmIChtID09PSAwKSB7IHJldHVybiBbIG51bGwsIDAsIDEwMCAqIHYgXTsgfVxyXG5cdFx0dmFyIGggPSByPT09biA/IDMrKGItZykvbSA6IChnPT09biA/IDUrKHItYikvbSA6IDErKGctcikvbSk7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHQ2MCAqIChoPT09Nj8wOmgpLFxyXG5cdFx0XHQxMDAgKiAobS92KSxcclxuXHRcdFx0MTAwICogdlxyXG5cdFx0XTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gaDogMC0zNjBcclxuXHQvLyBzOiAwLTEwMFxyXG5cdC8vIHY6IDAtMTAwXHJcblx0Ly9cclxuXHQvLyByZXR1cm5zOiBbIDAtMjU1LCAwLTI1NSwgMC0yNTUgXVxyXG5cdC8vXHJcblx0SFNWX1JHQiA6IGZ1bmN0aW9uIChoLCBzLCB2KSB7XHJcblx0XHR2YXIgdSA9IDI1NSAqICh2IC8gMTAwKTtcclxuXHJcblx0XHRpZiAoaCA9PT0gbnVsbCkge1xyXG5cdFx0XHRyZXR1cm4gWyB1LCB1LCB1IF07XHJcblx0XHR9XHJcblxyXG5cdFx0aCAvPSA2MDtcclxuXHRcdHMgLz0gMTAwO1xyXG5cclxuXHRcdHZhciBpID0gTWF0aC5mbG9vcihoKTtcclxuXHRcdHZhciBmID0gaSUyID8gaC1pIDogMS0oaC1pKTtcclxuXHRcdHZhciBtID0gdSAqICgxIC0gcyk7XHJcblx0XHR2YXIgbiA9IHUgKiAoMSAtIHMgKiBmKTtcclxuXHRcdHN3aXRjaCAoaSkge1xyXG5cdFx0XHRjYXNlIDY6XHJcblx0XHRcdGNhc2UgMDogcmV0dXJuIFt1LG4sbV07XHJcblx0XHRcdGNhc2UgMTogcmV0dXJuIFtuLHUsbV07XHJcblx0XHRcdGNhc2UgMjogcmV0dXJuIFttLHUsbl07XHJcblx0XHRcdGNhc2UgMzogcmV0dXJuIFttLG4sdV07XHJcblx0XHRcdGNhc2UgNDogcmV0dXJuIFtuLG0sdV07XHJcblx0XHRcdGNhc2UgNTogcmV0dXJuIFt1LG0sbl07XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdHBhcnNlQ29sb3JTdHJpbmcgOiBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHR2YXIgcmV0ID0ge1xyXG5cdFx0XHRyZ2JhOiBudWxsLFxyXG5cdFx0XHRmb3JtYXQ6IG51bGwgLy8gJ2hleCcgfCAncmdiJyB8ICdyZ2JhJ1xyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgbTtcclxuXHRcdGlmIChtID0gc3RyLm1hdGNoKC9eXFxXKihbMC05QS1GXXszfShbMC05QS1GXXszfSk/KVxcVyokL2kpKSB7XHJcblx0XHRcdC8vIEhFWCBub3RhdGlvblxyXG5cclxuXHRcdFx0cmV0LmZvcm1hdCA9ICdoZXgnO1xyXG5cclxuXHRcdFx0aWYgKG1bMV0ubGVuZ3RoID09PSA2KSB7XHJcblx0XHRcdFx0Ly8gNi1jaGFyIG5vdGF0aW9uXHJcblx0XHRcdFx0cmV0LnJnYmEgPSBbXHJcblx0XHRcdFx0XHRwYXJzZUludChtWzFdLnN1YnN0cigwLDIpLDE2KSxcclxuXHRcdFx0XHRcdHBhcnNlSW50KG1bMV0uc3Vic3RyKDIsMiksMTYpLFxyXG5cdFx0XHRcdFx0cGFyc2VJbnQobVsxXS5zdWJzdHIoNCwyKSwxNiksXHJcblx0XHRcdFx0XHRudWxsXHJcblx0XHRcdFx0XTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyAzLWNoYXIgbm90YXRpb25cclxuXHRcdFx0XHRyZXQucmdiYSA9IFtcclxuXHRcdFx0XHRcdHBhcnNlSW50KG1bMV0uY2hhckF0KDApICsgbVsxXS5jaGFyQXQoMCksMTYpLFxyXG5cdFx0XHRcdFx0cGFyc2VJbnQobVsxXS5jaGFyQXQoMSkgKyBtWzFdLmNoYXJBdCgxKSwxNiksXHJcblx0XHRcdFx0XHRwYXJzZUludChtWzFdLmNoYXJBdCgyKSArIG1bMV0uY2hhckF0KDIpLDE2KSxcclxuXHRcdFx0XHRcdG51bGxcclxuXHRcdFx0XHRdO1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiByZXQ7XHJcblxyXG5cdFx0fSBlbHNlIGlmIChtID0gc3RyLm1hdGNoKC9eXFxXKnJnYmE/XFwoKFteKV0qKVxcKVxcVyokL2kpKSB7XHJcblx0XHRcdC8vIHJnYiguLi4pIG9yIHJnYmEoLi4uKSBub3RhdGlvblxyXG5cclxuXHRcdFx0dmFyIHBhcmFtcyA9IG1bMV0uc3BsaXQoJywnKTtcclxuXHRcdFx0dmFyIHJlID0gL15cXHMqKFxcZCt8XFxkKlxcLlxcZCt8XFxkK1xcLlxcZCopXFxzKiQvO1xyXG5cdFx0XHR2YXIgbVIsIG1HLCBtQiwgbUE7XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRwYXJhbXMubGVuZ3RoID49IDMgJiZcclxuXHRcdFx0XHQobVIgPSBwYXJhbXNbMF0ubWF0Y2gocmUpKSAmJlxyXG5cdFx0XHRcdChtRyA9IHBhcmFtc1sxXS5tYXRjaChyZSkpICYmXHJcblx0XHRcdFx0KG1CID0gcGFyYW1zWzJdLm1hdGNoKHJlKSlcclxuXHRcdFx0KSB7XHJcblx0XHRcdFx0cmV0LmZvcm1hdCA9ICdyZ2InO1xyXG5cdFx0XHRcdHJldC5yZ2JhID0gW1xyXG5cdFx0XHRcdFx0cGFyc2VGbG9hdChtUlsxXSkgfHwgMCxcclxuXHRcdFx0XHRcdHBhcnNlRmxvYXQobUdbMV0pIHx8IDAsXHJcblx0XHRcdFx0XHRwYXJzZUZsb2F0KG1CWzFdKSB8fCAwLFxyXG5cdFx0XHRcdFx0bnVsbFxyXG5cdFx0XHRcdF07XHJcblxyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdHBhcmFtcy5sZW5ndGggPj0gNCAmJlxyXG5cdFx0XHRcdFx0KG1BID0gcGFyYW1zWzNdLm1hdGNoKHJlKSlcclxuXHRcdFx0XHQpIHtcclxuXHRcdFx0XHRcdHJldC5mb3JtYXQgPSAncmdiYSc7XHJcblx0XHRcdFx0XHRyZXQucmdiYVszXSA9IHBhcnNlRmxvYXQobUFbMV0pIHx8IDA7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiByZXQ7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIENhbnZhcyBzY2FsaW5nIGZvciByZXRpbmEgZGlzcGxheXNcclxuXHQvL1xyXG5cdC8vIGFkYXB0ZWQgZnJvbSBodHRwczovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvY2FudmFzL2hpZHBpL1xyXG5cdC8vXHJcblx0c2NhbGVDYW52YXNGb3JIaWdoRFBSIDogZnVuY3Rpb24gKGNhbnZhcykge1xyXG5cdFx0dmFyIGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XHJcblx0XHRjYW52YXMud2lkdGggKj0gZHByO1xyXG5cdFx0Y2FudmFzLmhlaWdodCAqPSBkcHI7XHJcblx0XHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblx0XHRjdHguc2NhbGUoZHByLCBkcHIpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZW5Db2xvclByZXZpZXdDYW52YXMgOiBmdW5jdGlvbiAoY29sb3IsIHNlcGFyYXRvclBvcywgc3BlY1dpZHRoLCBzY2FsZUZvckhpZ2hEUFIpIHtcclxuXHJcblx0XHR2YXIgc2VwVyA9IE1hdGgucm91bmQoanNjLnB1Yi5wcmV2aWV3U2VwYXJhdG9yLmxlbmd0aCk7XHJcblx0XHR2YXIgc3FTaXplID0ganNjLnB1Yi5jaGVzc2JvYXJkU2l6ZTtcclxuXHRcdHZhciBzcUNvbG9yMSA9IGpzYy5wdWIuY2hlc3Nib2FyZENvbG9yMTtcclxuXHRcdHZhciBzcUNvbG9yMiA9IGpzYy5wdWIuY2hlc3Nib2FyZENvbG9yMjtcclxuXHJcblx0XHR2YXIgY1dpZHRoID0gc3BlY1dpZHRoID8gc3BlY1dpZHRoIDogc3FTaXplICogMjtcclxuXHRcdHZhciBjSGVpZ2h0ID0gc3FTaXplICogMjtcclxuXHJcblx0XHR2YXIgY2FudmFzID0ganNjLmNyZWF0ZUVsKCdjYW52YXMnKTtcclxuXHRcdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcblx0XHRjYW52YXMud2lkdGggPSBjV2lkdGg7XHJcblx0XHRjYW52YXMuaGVpZ2h0ID0gY0hlaWdodDtcclxuXHRcdGlmIChzY2FsZUZvckhpZ2hEUFIpIHtcclxuXHRcdFx0anNjLnNjYWxlQ2FudmFzRm9ySGlnaERQUihjYW52YXMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIHRyYW5zcGFyZW5jeSBjaGVzc2JvYXJkIC0gYmFja2dyb3VuZFxyXG5cdFx0Y3R4LmZpbGxTdHlsZSA9IHNxQ29sb3IxO1xyXG5cdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIGNXaWR0aCwgY0hlaWdodCk7XHJcblxyXG5cdFx0Ly8gdHJhbnNwYXJlbmN5IGNoZXNzYm9hcmQgLSBzcXVhcmVzXHJcblx0XHRjdHguZmlsbFN0eWxlID0gc3FDb2xvcjI7XHJcblx0XHRmb3IgKHZhciB4ID0gMDsgeCA8IGNXaWR0aDsgeCArPSBzcVNpemUgKiAyKSB7XHJcblx0XHRcdGN0eC5maWxsUmVjdCh4LCAwLCBzcVNpemUsIHNxU2l6ZSk7XHJcblx0XHRcdGN0eC5maWxsUmVjdCh4ICsgc3FTaXplLCBzcVNpemUsIHNxU2l6ZSwgc3FTaXplKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoY29sb3IpIHtcclxuXHRcdFx0Ly8gYWN0dWFsIGNvbG9yIGluIGZvcmVncm91bmRcclxuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY1dpZHRoLCBjSGVpZ2h0KTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgc3RhcnQgPSBudWxsO1xyXG5cdFx0c3dpdGNoIChzZXBhcmF0b3JQb3MpIHtcclxuXHRcdFx0Y2FzZSAnbGVmdCc6XHJcblx0XHRcdFx0c3RhcnQgPSAwO1xyXG5cdFx0XHRcdGN0eC5jbGVhclJlY3QoMCwgMCwgc2VwVy8yLCBjSGVpZ2h0KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0Y2FzZSAncmlnaHQnOlxyXG5cdFx0XHRcdHN0YXJ0ID0gY1dpZHRoIC0gc2VwVztcclxuXHRcdFx0XHRjdHguY2xlYXJSZWN0KGNXaWR0aCAtIChzZXBXLzIpLCAwLCBzZXBXLzIsIGNIZWlnaHQpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHN0YXJ0ICE9PSBudWxsKSB7XHJcblx0XHRcdGN0eC5saW5lV2lkdGggPSAxO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGpzYy5wdWIucHJldmlld1NlcGFyYXRvci5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRcdGN0eC5iZWdpblBhdGgoKTtcclxuXHRcdFx0XHRjdHguc3Ryb2tlU3R5bGUgPSBqc2MucHViLnByZXZpZXdTZXBhcmF0b3JbaV07XHJcblx0XHRcdFx0Y3R4Lm1vdmVUbygwLjUgKyBzdGFydCArIGksIDApO1xyXG5cdFx0XHRcdGN0eC5saW5lVG8oMC41ICsgc3RhcnQgKyBpLCBjSGVpZ2h0KTtcclxuXHRcdFx0XHRjdHguc3Ryb2tlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjYW52YXM6IGNhbnZhcyxcclxuXHRcdFx0d2lkdGg6IGNXaWR0aCxcclxuXHRcdFx0aGVpZ2h0OiBjSGVpZ2h0LFxyXG5cdFx0fTtcclxuXHR9LFxyXG5cclxuXHJcblx0Ly8gaWYgcG9zaXRpb24gb3Igd2lkdGggaXMgbm90IHNldCA9PiBmaWxsIHRoZSBlbnRpcmUgZWxlbWVudCAoMCUtMTAwJSlcclxuXHRnZW5Db2xvclByZXZpZXdHcmFkaWVudCA6IGZ1bmN0aW9uIChjb2xvciwgcG9zaXRpb24sIHdpZHRoKSB7XHJcblx0XHR2YXIgcGFyYW1zID0gW107XHJcblxyXG5cdFx0aWYgKHBvc2l0aW9uICYmIHdpZHRoKSB7XHJcblx0XHRcdHBhcmFtcyA9IFtcclxuXHRcdFx0XHQndG8gJyArIHsnbGVmdCc6J3JpZ2h0JywgJ3JpZ2h0JzonbGVmdCd9W3Bvc2l0aW9uXSxcclxuXHRcdFx0XHRjb2xvciArICcgMCUnLFxyXG5cdFx0XHRcdGNvbG9yICsgJyAnICsgd2lkdGggKyAncHgnLFxyXG5cdFx0XHRcdCdyZ2JhKDAsMCwwLDApICcgKyAod2lkdGggKyAxKSArICdweCcsXHJcblx0XHRcdFx0J3JnYmEoMCwwLDAsMCkgMTAwJScsXHJcblx0XHRcdF07XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRwYXJhbXMgPSBbXHJcblx0XHRcdFx0J3RvIHJpZ2h0JyxcclxuXHRcdFx0XHRjb2xvciArICcgMCUnLFxyXG5cdFx0XHRcdGNvbG9yICsgJyAxMDAlJyxcclxuXHRcdFx0XTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ganNjLmxpbmVhckdyYWRpZW50LmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcblx0fSxcclxuXHJcblxyXG5cdHJlZHJhd1Bvc2l0aW9uIDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdGlmIChqc2MucGlja2VyICYmIGpzYy5waWNrZXIub3duZXIpIHtcclxuXHRcdFx0dmFyIHRoaXNPYmogPSBqc2MucGlja2VyLm93bmVyO1xyXG5cclxuXHRcdFx0dmFyIHRwLCB2cDtcclxuXHJcblx0XHRcdGlmICh0aGlzT2JqLmZpeGVkKSB7XHJcblx0XHRcdFx0Ly8gRml4ZWQgZWxlbWVudHMgYXJlIHBvc2l0aW9uZWQgcmVsYXRpdmUgdG8gdmlld3BvcnQsXHJcblx0XHRcdFx0Ly8gdGhlcmVmb3JlIHdlIGNhbiBpZ25vcmUgdGhlIHNjcm9sbCBvZmZzZXRcclxuXHRcdFx0XHR0cCA9IGpzYy5nZXRFbGVtZW50UG9zKHRoaXNPYmoudGFyZ2V0RWxlbWVudCwgdHJ1ZSk7IC8vIHRhcmdldCBwb3NcclxuXHRcdFx0XHR2cCA9IFswLCAwXTsgLy8gdmlldyBwb3NcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0cCA9IGpzYy5nZXRFbGVtZW50UG9zKHRoaXNPYmoudGFyZ2V0RWxlbWVudCk7IC8vIHRhcmdldCBwb3NcclxuXHRcdFx0XHR2cCA9IGpzYy5nZXRWaWV3UG9zKCk7IC8vIHZpZXcgcG9zXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB0cyA9IGpzYy5nZXRFbGVtZW50U2l6ZSh0aGlzT2JqLnRhcmdldEVsZW1lbnQpOyAvLyB0YXJnZXQgc2l6ZVxyXG5cdFx0XHR2YXIgdnMgPSBqc2MuZ2V0Vmlld1NpemUoKTsgLy8gdmlldyBzaXplXHJcblx0XHRcdHZhciBwcyA9IGpzYy5nZXRQaWNrZXJPdXRlckRpbXModGhpc09iaik7IC8vIHBpY2tlciBzaXplXHJcblx0XHRcdHZhciBhLCBiLCBjO1xyXG5cdFx0XHRzd2l0Y2ggKHRoaXNPYmoucG9zaXRpb24udG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRcdGNhc2UgJ2xlZnQnOiBhPTE7IGI9MDsgYz0tMTsgYnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAncmlnaHQnOmE9MTsgYj0wOyBjPTE7IGJyZWFrO1xyXG5cdFx0XHRcdGNhc2UgJ3RvcCc6ICBhPTA7IGI9MTsgYz0tMTsgYnJlYWs7XHJcblx0XHRcdFx0ZGVmYXVsdDogICAgIGE9MDsgYj0xOyBjPTE7IGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdHZhciBsID0gKHRzW2JdK3BzW2JdKS8yO1xyXG5cclxuXHRcdFx0Ly8gY29tcHV0ZSBwaWNrZXIgcG9zaXRpb25cclxuXHRcdFx0aWYgKCF0aGlzT2JqLnNtYXJ0UG9zaXRpb24pIHtcclxuXHRcdFx0XHR2YXIgcHAgPSBbXHJcblx0XHRcdFx0XHR0cFthXSxcclxuXHRcdFx0XHRcdHRwW2JdK3RzW2JdLWwrbCpjXHJcblx0XHRcdFx0XTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR2YXIgcHAgPSBbXHJcblx0XHRcdFx0XHQtdnBbYV0rdHBbYV0rcHNbYV0gPiB2c1thXSA/XHJcblx0XHRcdFx0XHRcdCgtdnBbYV0rdHBbYV0rdHNbYV0vMiA+IHZzW2FdLzIgJiYgdHBbYV0rdHNbYV0tcHNbYV0gPj0gMCA/IHRwW2FdK3RzW2FdLXBzW2FdIDogdHBbYV0pIDpcclxuXHRcdFx0XHRcdFx0dHBbYV0sXHJcblx0XHRcdFx0XHQtdnBbYl0rdHBbYl0rdHNbYl0rcHNbYl0tbCtsKmMgPiB2c1tiXSA/XHJcblx0XHRcdFx0XHRcdCgtdnBbYl0rdHBbYl0rdHNbYl0vMiA+IHZzW2JdLzIgJiYgdHBbYl0rdHNbYl0tbC1sKmMgPj0gMCA/IHRwW2JdK3RzW2JdLWwtbCpjIDogdHBbYl0rdHNbYl0tbCtsKmMpIDpcclxuXHRcdFx0XHRcdFx0KHRwW2JdK3RzW2JdLWwrbCpjID49IDAgPyB0cFtiXSt0c1tiXS1sK2wqYyA6IHRwW2JdK3RzW2JdLWwtbCpjKVxyXG5cdFx0XHRcdF07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB4ID0gcHBbYV07XHJcblx0XHRcdHZhciB5ID0gcHBbYl07XHJcblx0XHRcdHZhciBwb3NpdGlvblZhbHVlID0gdGhpc09iai5maXhlZCA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xyXG5cdFx0XHR2YXIgY29udHJhY3RTaGFkb3cgPVxyXG5cdFx0XHRcdChwcFswXSArIHBzWzBdID4gdHBbMF0gfHwgcHBbMF0gPCB0cFswXSArIHRzWzBdKSAmJlxyXG5cdFx0XHRcdChwcFsxXSArIHBzWzFdIDwgdHBbMV0gKyB0c1sxXSk7XHJcblxyXG5cdFx0XHRqc2MuX2RyYXdQb3NpdGlvbih0aGlzT2JqLCB4LCB5LCBwb3NpdGlvblZhbHVlLCBjb250cmFjdFNoYWRvdyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdF9kcmF3UG9zaXRpb24gOiBmdW5jdGlvbiAodGhpc09iaiwgeCwgeSwgcG9zaXRpb25WYWx1ZSwgY29udHJhY3RTaGFkb3cpIHtcclxuXHRcdHZhciB2U2hhZG93ID0gY29udHJhY3RTaGFkb3cgPyAwIDogdGhpc09iai5zaGFkb3dCbHVyOyAvLyBweFxyXG5cclxuXHRcdGpzYy5waWNrZXIud3JhcC5zdHlsZS5wb3NpdGlvbiA9IHBvc2l0aW9uVmFsdWU7XHJcblx0XHRqc2MucGlja2VyLndyYXAuc3R5bGUubGVmdCA9IHggKyAncHgnO1xyXG5cdFx0anNjLnBpY2tlci53cmFwLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xyXG5cclxuXHRcdGpzYy5zZXRCb3hTaGFkb3coXHJcblx0XHRcdGpzYy5waWNrZXIuYm94UyxcclxuXHRcdFx0dGhpc09iai5zaGFkb3cgP1xyXG5cdFx0XHRcdG5ldyBqc2MuQm94U2hhZG93KDAsIHZTaGFkb3csIHRoaXNPYmouc2hhZG93Qmx1ciwgMCwgdGhpc09iai5zaGFkb3dDb2xvcikgOlxyXG5cdFx0XHRcdG51bGwpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRQaWNrZXJEaW1zIDogZnVuY3Rpb24gKHRoaXNPYmopIHtcclxuXHRcdHZhciBkaW1zID0gW1xyXG5cdFx0XHQyICogdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGggKyAyICogdGhpc09iai5wYWRkaW5nICsgdGhpc09iai53aWR0aCxcclxuXHRcdFx0MiAqIHRoaXNPYmouY29udHJvbEJvcmRlcldpZHRoICsgMiAqIHRoaXNPYmoucGFkZGluZyArIHRoaXNPYmouaGVpZ2h0XHJcblx0XHRdO1xyXG5cdFx0dmFyIHNsaWRlclNwYWNlID0gMiAqIHRoaXNPYmouY29udHJvbEJvcmRlcldpZHRoICsgMiAqIGpzYy5nZXRDb250cm9sUGFkZGluZyh0aGlzT2JqKSArIHRoaXNPYmouc2xpZGVyU2l6ZTtcclxuXHRcdGlmIChqc2MuZ2V0U2xpZGVyQ2hhbm5lbCh0aGlzT2JqKSkge1xyXG5cdFx0XHRkaW1zWzBdICs9IHNsaWRlclNwYWNlO1xyXG5cdFx0fVxyXG5cdFx0aWYgKHRoaXNPYmouaGFzQWxwaGFDaGFubmVsKCkpIHtcclxuXHRcdFx0ZGltc1swXSArPSBzbGlkZXJTcGFjZTtcclxuXHRcdH1cclxuXHRcdGlmICh0aGlzT2JqLmNsb3NlQnV0dG9uKSB7XHJcblx0XHRcdGRpbXNbMV0gKz0gMiAqIHRoaXNPYmouY29udHJvbEJvcmRlcldpZHRoICsgdGhpc09iai5wYWRkaW5nICsgdGhpc09iai5idXR0b25IZWlnaHQ7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZGltcztcclxuXHR9LFxyXG5cclxuXHJcblx0Z2V0UGlja2VyT3V0ZXJEaW1zIDogZnVuY3Rpb24gKHRoaXNPYmopIHtcclxuXHRcdHZhciBkaW1zID0ganNjLmdldFBpY2tlckRpbXModGhpc09iaik7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHRkaW1zWzBdICsgMiAqIHRoaXNPYmouYm9yZGVyV2lkdGgsXHJcblx0XHRcdGRpbXNbMV0gKyAyICogdGhpc09iai5ib3JkZXJXaWR0aFxyXG5cdFx0XTtcclxuXHR9LFxyXG5cclxuXHJcblx0Z2V0Q29udHJvbFBhZGRpbmcgOiBmdW5jdGlvbiAodGhpc09iaikge1xyXG5cdFx0cmV0dXJuIE1hdGgubWF4KFxyXG5cdFx0XHR0aGlzT2JqLnBhZGRpbmcgLyAyLFxyXG5cdFx0XHQoMiAqIHRoaXNPYmoucG9pbnRlckJvcmRlcldpZHRoICsgdGhpc09iai5wb2ludGVyVGhpY2tuZXNzKSAtIHRoaXNPYmouY29udHJvbEJvcmRlcldpZHRoXHJcblx0XHQpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRQYWRZQ2hhbm5lbCA6IGZ1bmN0aW9uICh0aGlzT2JqKSB7XHJcblx0XHRzd2l0Y2ggKHRoaXNPYmoubW9kZS5jaGFyQXQoMSkudG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRjYXNlICd2JzogcmV0dXJuICd2JzsgYnJlYWs7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gJ3MnO1xyXG5cdH0sXHJcblxyXG5cclxuXHRnZXRTbGlkZXJDaGFubmVsIDogZnVuY3Rpb24gKHRoaXNPYmopIHtcclxuXHRcdGlmICh0aGlzT2JqLm1vZGUubGVuZ3RoID4gMikge1xyXG5cdFx0XHRzd2l0Y2ggKHRoaXNPYmoubW9kZS5jaGFyQXQoMikudG9Mb3dlckNhc2UoKSkge1xyXG5cdFx0XHRcdGNhc2UgJ3MnOiByZXR1cm4gJ3MnOyBicmVhaztcclxuXHRcdFx0XHRjYXNlICd2JzogcmV0dXJuICd2JzsgYnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH0sXHJcblxyXG5cclxuXHRvbkRvY3VtZW50TW91c2VEb3duIDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcblxyXG5cdFx0aWYgKHRhcmdldC5qc2NvbG9yICYmIHRhcmdldC5qc2NvbG9yIGluc3RhbmNlb2YganNjLnB1YikgeyAvLyBjbGlja2VkIHRhcmdldEVsZW1lbnQgLT4gc2hvdyBwaWNrZXJcclxuXHRcdFx0aWYgKHRhcmdldC5qc2NvbG9yLnNob3dPbkNsaWNrICYmICF0YXJnZXQuZGlzYWJsZWQpIHtcclxuXHRcdFx0XHR0YXJnZXQuanNjb2xvci5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSBpZiAoanNjLmdldERhdGEodGFyZ2V0LCAnZ3VpJykpIHsgLy8gY2xpY2tlZCBqc2NvbG9yJ3MgR1VJIGVsZW1lbnRcclxuXHRcdFx0dmFyIGNvbnRyb2wgPSBqc2MuZ2V0RGF0YSh0YXJnZXQsICdjb250cm9sJyk7XHJcblx0XHRcdGlmIChjb250cm9sKSB7XHJcblx0XHRcdFx0Ly8ganNjb2xvcidzIGNvbnRyb2xcclxuXHRcdFx0XHRqc2Mub25Db250cm9sUG9pbnRlclN0YXJ0KGUsIHRhcmdldCwganNjLmdldERhdGEodGFyZ2V0LCAnY29udHJvbCcpLCAnbW91c2UnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gbW91c2UgaXMgb3V0c2lkZSB0aGUgcGlja2VyJ3MgY29udHJvbHMgLT4gaGlkZSB0aGUgY29sb3IgcGlja2VyIVxyXG5cdFx0XHRpZiAoanNjLnBpY2tlciAmJiBqc2MucGlja2VyLm93bmVyKSB7XHJcblx0XHRcdFx0anNjLnBpY2tlci5vd25lci50cnlIaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHJcblx0b25Eb2N1bWVudEtleVVwIDogZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmIChbJ1RhYicsICdFc2NhcGUnXS5pbmRleE9mKGpzYy5ldmVudEtleShlKSkgIT09IC0xKSB7XHJcblx0XHRcdGlmIChqc2MucGlja2VyICYmIGpzYy5waWNrZXIub3duZXIpIHtcclxuXHRcdFx0XHRqc2MucGlja2VyLm93bmVyLnRyeUhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRvbldpbmRvd1Jlc2l6ZSA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHRqc2MucmVkcmF3UG9zaXRpb24oKTtcclxuXHR9LFxyXG5cclxuXHJcblx0b25QYXJlbnRTY3JvbGwgOiBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Ly8gaGlkZSB0aGUgcGlja2VyIHdoZW4gb25lIG9mIHRoZSBwYXJlbnQgZWxlbWVudHMgaXMgc2Nyb2xsZWRcclxuXHRcdGlmIChqc2MucGlja2VyICYmIGpzYy5waWNrZXIub3duZXIpIHtcclxuXHRcdFx0anNjLnBpY2tlci5vd25lci50cnlIaWRlKCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdG9uUGlja2VyVG91Y2hTdGFydCA6IGZ1bmN0aW9uIChlKSB7XHJcblx0XHR2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xyXG5cclxuXHRcdGlmIChqc2MuZ2V0RGF0YSh0YXJnZXQsICdjb250cm9sJykpIHtcclxuXHRcdFx0anNjLm9uQ29udHJvbFBvaW50ZXJTdGFydChlLCB0YXJnZXQsIGpzYy5nZXREYXRhKHRhcmdldCwgJ2NvbnRyb2wnKSwgJ3RvdWNoJyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdC8vIGNhbGxzIGZ1bmN0aW9uIHNwZWNpZmllZCBpbiBwaWNrZXIncyBwcm9wZXJ0eVxyXG5cdHRyaWdnZXJDYWxsYmFjayA6IGZ1bmN0aW9uICh0aGlzT2JqLCBwcm9wKSB7XHJcblx0XHRpZiAoIXRoaXNPYmpbcHJvcF0pIHtcclxuXHRcdFx0cmV0dXJuOyAvLyBjYWxsYmFjayBmdW5jIG5vdCBzcGVjaWZpZWRcclxuXHRcdH1cclxuXHRcdHZhciBjYWxsYmFjayA9IG51bGw7XHJcblxyXG5cdFx0aWYgKHR5cGVvZiB0aGlzT2JqW3Byb3BdID09PSAnc3RyaW5nJykge1xyXG5cdFx0XHQvLyBzdHJpbmcgd2l0aCBjb2RlXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0Y2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24gKHRoaXNPYmpbcHJvcF0pO1xyXG5cdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gZnVuY3Rpb25cclxuXHRcdFx0Y2FsbGJhY2sgPSB0aGlzT2JqW3Byb3BdO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChjYWxsYmFjaykge1xyXG5cdFx0XHRjYWxsYmFjay5jYWxsKHRoaXNPYmopO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHQvLyBUcmlnZ2VycyBhIGNvbG9yIGNoYW5nZSByZWxhdGVkIGV2ZW50KHMpIG9uIGFsbCBwaWNrZXIgaW5zdGFuY2VzLlxyXG5cdC8vIEl0IGlzIHBvc3NpYmxlIHRvIHNwZWNpZnkgbXVsdGlwbGUgZXZlbnRzIHNlcGFyYXRlZCB3aXRoIGEgc3BhY2UuXHJcblx0dHJpZ2dlckdsb2JhbCA6IGZ1bmN0aW9uIChldmVudE5hbWVzKSB7XHJcblx0XHR2YXIgaW5zdCA9IGpzYy5nZXRJbnN0YW5jZXMoKTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaW5zdC5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRpbnN0W2ldLnRyaWdnZXIoZXZlbnROYW1lcyk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdF9wb2ludGVyTW92ZUV2ZW50IDoge1xyXG5cdFx0bW91c2U6ICdtb3VzZW1vdmUnLFxyXG5cdFx0dG91Y2g6ICd0b3VjaG1vdmUnXHJcblx0fSxcclxuXHRfcG9pbnRlckVuZEV2ZW50IDoge1xyXG5cdFx0bW91c2U6ICdtb3VzZXVwJyxcclxuXHRcdHRvdWNoOiAndG91Y2hlbmQnXHJcblx0fSxcclxuXHJcblxyXG5cdF9wb2ludGVyT3JpZ2luIDogbnVsbCxcclxuXHRfY2FwdHVyZWRUYXJnZXQgOiBudWxsLFxyXG5cclxuXHJcblx0b25Db250cm9sUG9pbnRlclN0YXJ0IDogZnVuY3Rpb24gKGUsIHRhcmdldCwgY29udHJvbE5hbWUsIHBvaW50ZXJUeXBlKSB7XHJcblx0XHR2YXIgdGhpc09iaiA9IGpzYy5nZXREYXRhKHRhcmdldCwgJ2luc3RhbmNlJyk7XHJcblxyXG5cdFx0anNjLnByZXZlbnREZWZhdWx0KGUpO1xyXG5cdFx0anNjLmNhcHR1cmVUYXJnZXQodGFyZ2V0KTtcclxuXHJcblx0XHR2YXIgcmVnaXN0ZXJEcmFnRXZlbnRzID0gZnVuY3Rpb24gKGRvYywgb2Zmc2V0KSB7XHJcblx0XHRcdGpzYy5hdHRhY2hHcm91cEV2ZW50KCdkcmFnJywgZG9jLCBqc2MuX3BvaW50ZXJNb3ZlRXZlbnRbcG9pbnRlclR5cGVdLFxyXG5cdFx0XHRcdGpzYy5vbkRvY3VtZW50UG9pbnRlck1vdmUoZSwgdGFyZ2V0LCBjb250cm9sTmFtZSwgcG9pbnRlclR5cGUsIG9mZnNldCkpO1xyXG5cdFx0XHRqc2MuYXR0YWNoR3JvdXBFdmVudCgnZHJhZycsIGRvYywganNjLl9wb2ludGVyRW5kRXZlbnRbcG9pbnRlclR5cGVdLFxyXG5cdFx0XHRcdGpzYy5vbkRvY3VtZW50UG9pbnRlckVuZChlLCB0YXJnZXQsIGNvbnRyb2xOYW1lLCBwb2ludGVyVHlwZSkpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRyZWdpc3RlckRyYWdFdmVudHMoZG9jdW1lbnQsIFswLCAwXSk7XHJcblxyXG5cdFx0aWYgKHdpbmRvdy5wYXJlbnQgJiYgd2luZG93LmZyYW1lRWxlbWVudCkge1xyXG5cdFx0XHR2YXIgcmVjdCA9IHdpbmRvdy5mcmFtZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblx0XHRcdHZhciBvZnMgPSBbLXJlY3QubGVmdCwgLXJlY3QudG9wXTtcclxuXHRcdFx0cmVnaXN0ZXJEcmFnRXZlbnRzKHdpbmRvdy5wYXJlbnQud2luZG93LmRvY3VtZW50LCBvZnMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBhYnMgPSBqc2MuZ2V0QWJzUG9pbnRlclBvcyhlKTtcclxuXHRcdHZhciByZWwgPSBqc2MuZ2V0UmVsUG9pbnRlclBvcyhlKTtcclxuXHRcdGpzYy5fcG9pbnRlck9yaWdpbiA9IHtcclxuXHRcdFx0eDogYWJzLnggLSByZWwueCxcclxuXHRcdFx0eTogYWJzLnkgLSByZWwueVxyXG5cdFx0fTtcclxuXHJcblx0XHRzd2l0Y2ggKGNvbnRyb2xOYW1lKSB7XHJcblx0XHRjYXNlICdwYWQnOlxyXG5cdFx0XHQvLyBpZiB0aGUgdmFsdWUgc2xpZGVyIGlzIGF0IHRoZSBib3R0b20sIG1vdmUgaXQgdXBcclxuXHRcdFx0aWYgKGpzYy5nZXRTbGlkZXJDaGFubmVsKHRoaXNPYmopID09PSAndicgJiYgdGhpc09iai5jaGFubmVscy52ID09PSAwKSB7XHJcblx0XHRcdFx0dGhpc09iai5mcm9tSFNWQShudWxsLCBudWxsLCAxMDAsIG51bGwpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGpzYy5zZXRQYWQodGhpc09iaiwgZSwgMCwgMCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdGNhc2UgJ3NsZCc6XHJcblx0XHRcdGpzYy5zZXRTbGQodGhpc09iaiwgZSwgMCk7XHJcblx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdGNhc2UgJ2FzbGQnOlxyXG5cdFx0XHRqc2Muc2V0QVNsZCh0aGlzT2JqLCBlLCAwKTtcclxuXHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0XHR0aGlzT2JqLnRyaWdnZXIoJ2lucHV0Jyk7XHJcblx0fSxcclxuXHJcblxyXG5cdG9uRG9jdW1lbnRQb2ludGVyTW92ZSA6IGZ1bmN0aW9uIChlLCB0YXJnZXQsIGNvbnRyb2xOYW1lLCBwb2ludGVyVHlwZSwgb2Zmc2V0KSB7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKGUpIHtcclxuXHRcdFx0dmFyIHRoaXNPYmogPSBqc2MuZ2V0RGF0YSh0YXJnZXQsICdpbnN0YW5jZScpO1xyXG5cdFx0XHRzd2l0Y2ggKGNvbnRyb2xOYW1lKSB7XHJcblx0XHRcdGNhc2UgJ3BhZCc6XHJcblx0XHRcdFx0anNjLnNldFBhZCh0aGlzT2JqLCBlLCBvZmZzZXRbMF0sIG9mZnNldFsxXSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlICdzbGQnOlxyXG5cdFx0XHRcdGpzYy5zZXRTbGQodGhpc09iaiwgZSwgb2Zmc2V0WzFdKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgJ2FzbGQnOlxyXG5cdFx0XHRcdGpzYy5zZXRBU2xkKHRoaXNPYmosIGUsIG9mZnNldFsxXSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpc09iai50cmlnZ2VyKCdpbnB1dCcpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cclxuXHRvbkRvY3VtZW50UG9pbnRlckVuZCA6IGZ1bmN0aW9uIChlLCB0YXJnZXQsIGNvbnRyb2xOYW1lLCBwb2ludGVyVHlwZSkge1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRcdHZhciB0aGlzT2JqID0ganNjLmdldERhdGEodGFyZ2V0LCAnaW5zdGFuY2UnKTtcclxuXHRcdFx0anNjLmRldGFjaEdyb3VwRXZlbnRzKCdkcmFnJyk7XHJcblx0XHRcdGpzYy5yZWxlYXNlVGFyZ2V0KCk7XHJcblxyXG5cdFx0XHQvLyBBbHdheXMgdHJpZ2dlciBjaGFuZ2VzIEFGVEVSIGRldGFjaGluZyBvdXRzdGFuZGluZyBtb3VzZSBoYW5kbGVycyxcclxuXHRcdFx0Ly8gaW4gY2FzZSBzb21lIGNvbG9yIGNoYW5nZSBvY2N1cmVkIGluIHVzZXItZGVmaW5lZCBvbkNoYW5nZS9vbklucHV0IGhhbmRsZXJcclxuXHRcdFx0Ly8gd291bGQgaW50cnVkZSBpbnRvIGN1cnJlbnQgbW91c2UgZXZlbnRzXHJcblx0XHRcdHRoaXNPYmoudHJpZ2dlcignaW5wdXQnKTtcclxuXHRcdFx0dGhpc09iai50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuXHRcdH07XHJcblx0fSxcclxuXHJcblxyXG5cdHNldFBhZCA6IGZ1bmN0aW9uICh0aGlzT2JqLCBlLCBvZnNYLCBvZnNZKSB7XHJcblx0XHR2YXIgcG9pbnRlckFicyA9IGpzYy5nZXRBYnNQb2ludGVyUG9zKGUpO1xyXG5cdFx0dmFyIHggPSBvZnNYICsgcG9pbnRlckFicy54IC0ganNjLl9wb2ludGVyT3JpZ2luLnggLSB0aGlzT2JqLnBhZGRpbmcgLSB0aGlzT2JqLmNvbnRyb2xCb3JkZXJXaWR0aDtcclxuXHRcdHZhciB5ID0gb2ZzWSArIHBvaW50ZXJBYnMueSAtIGpzYy5fcG9pbnRlck9yaWdpbi55IC0gdGhpc09iai5wYWRkaW5nIC0gdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGg7XHJcblxyXG5cdFx0dmFyIHhWYWwgPSB4ICogKDM2MCAvICh0aGlzT2JqLndpZHRoIC0gMSkpO1xyXG5cdFx0dmFyIHlWYWwgPSAxMDAgLSAoeSAqICgxMDAgLyAodGhpc09iai5oZWlnaHQgLSAxKSkpO1xyXG5cclxuXHRcdHN3aXRjaCAoanNjLmdldFBhZFlDaGFubmVsKHRoaXNPYmopKSB7XHJcblx0XHRjYXNlICdzJzogdGhpc09iai5mcm9tSFNWQSh4VmFsLCB5VmFsLCBudWxsLCBudWxsKTsgYnJlYWs7XHJcblx0XHRjYXNlICd2JzogdGhpc09iai5mcm9tSFNWQSh4VmFsLCBudWxsLCB5VmFsLCBudWxsKTsgYnJlYWs7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdHNldFNsZCA6IGZ1bmN0aW9uICh0aGlzT2JqLCBlLCBvZnNZKSB7XHJcblx0XHR2YXIgcG9pbnRlckFicyA9IGpzYy5nZXRBYnNQb2ludGVyUG9zKGUpO1xyXG5cdFx0dmFyIHkgPSBvZnNZICsgcG9pbnRlckFicy55IC0ganNjLl9wb2ludGVyT3JpZ2luLnkgLSB0aGlzT2JqLnBhZGRpbmcgLSB0aGlzT2JqLmNvbnRyb2xCb3JkZXJXaWR0aDtcclxuXHRcdHZhciB5VmFsID0gMTAwIC0gKHkgKiAoMTAwIC8gKHRoaXNPYmouaGVpZ2h0IC0gMSkpKTtcclxuXHJcblx0XHRzd2l0Y2ggKGpzYy5nZXRTbGlkZXJDaGFubmVsKHRoaXNPYmopKSB7XHJcblx0XHRjYXNlICdzJzogdGhpc09iai5mcm9tSFNWQShudWxsLCB5VmFsLCBudWxsLCBudWxsKTsgYnJlYWs7XHJcblx0XHRjYXNlICd2JzogdGhpc09iai5mcm9tSFNWQShudWxsLCBudWxsLCB5VmFsLCBudWxsKTsgYnJlYWs7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblxyXG5cdHNldEFTbGQgOiBmdW5jdGlvbiAodGhpc09iaiwgZSwgb2ZzWSkge1xyXG5cdFx0dmFyIHBvaW50ZXJBYnMgPSBqc2MuZ2V0QWJzUG9pbnRlclBvcyhlKTtcclxuXHRcdHZhciB5ID0gb2ZzWSArIHBvaW50ZXJBYnMueSAtIGpzYy5fcG9pbnRlck9yaWdpbi55IC0gdGhpc09iai5wYWRkaW5nIC0gdGhpc09iai5jb250cm9sQm9yZGVyV2lkdGg7XHJcblx0XHR2YXIgeVZhbCA9IDEuMCAtICh5ICogKDEuMCAvICh0aGlzT2JqLmhlaWdodCAtIDEpKSk7XHJcblxyXG5cdFx0aWYgKHlWYWwgPCAxLjApIHtcclxuXHRcdFx0Ly8gaWYgZm9ybWF0IGlzIGZsZXhpYmxlIGFuZCB0aGUgY3VycmVudCBmb3JtYXQgZG9lc24ndCBzdXBwb3J0IGFscGhhLCBzd2l0Y2ggdG8gYSBzdWl0YWJsZSBvbmVcclxuXHRcdFx0aWYgKHRoaXNPYmouZm9ybWF0LnRvTG93ZXJDYXNlKCkgPT09ICdhbnknICYmIHRoaXNPYmouZ2V0Rm9ybWF0KCkgIT09ICdyZ2JhJykge1xyXG5cdFx0XHRcdHRoaXNPYmouX2N1cnJlbnRGb3JtYXQgPSAncmdiYSc7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzT2JqLmZyb21IU1ZBKG51bGwsIG51bGwsIG51bGwsIHlWYWwpO1xyXG5cdH0sXHJcblxyXG5cclxuXHRjcmVhdGVQYWxldHRlIDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBwYWxldHRlT2JqID0ge1xyXG5cdFx0XHRlbG06IG51bGwsXHJcblx0XHRcdGRyYXc6IG51bGxcclxuXHRcdH07XHJcblxyXG5cdFx0dmFyIGNhbnZhcyA9IGpzYy5jcmVhdGVFbCgnY2FudmFzJyk7XHJcblx0XHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG5cdFx0dmFyIGRyYXdGdW5jID0gZnVuY3Rpb24gKHdpZHRoLCBoZWlnaHQsIHR5cGUpIHtcclxuXHRcdFx0Y2FudmFzLndpZHRoID0gd2lkdGg7XHJcblx0XHRcdGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG5cdFx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG5cdFx0XHR2YXIgaEdyYWQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgY2FudmFzLndpZHRoLCAwKTtcclxuXHRcdFx0aEdyYWQuYWRkQ29sb3JTdG9wKDAgLyA2LCAnI0YwMCcpO1xyXG5cdFx0XHRoR3JhZC5hZGRDb2xvclN0b3AoMSAvIDYsICcjRkYwJyk7XHJcblx0XHRcdGhHcmFkLmFkZENvbG9yU3RvcCgyIC8gNiwgJyMwRjAnKTtcclxuXHRcdFx0aEdyYWQuYWRkQ29sb3JTdG9wKDMgLyA2LCAnIzBGRicpO1xyXG5cdFx0XHRoR3JhZC5hZGRDb2xvclN0b3AoNCAvIDYsICcjMDBGJyk7XHJcblx0XHRcdGhHcmFkLmFkZENvbG9yU3RvcCg1IC8gNiwgJyNGMEYnKTtcclxuXHRcdFx0aEdyYWQuYWRkQ29sb3JTdG9wKDYgLyA2LCAnI0YwMCcpO1xyXG5cclxuXHRcdFx0Y3R4LmZpbGxTdHlsZSA9IGhHcmFkO1xyXG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHJcblx0XHRcdHZhciB2R3JhZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRcdFx0c3dpdGNoICh0eXBlLnRvTG93ZXJDYXNlKCkpIHtcclxuXHRcdFx0Y2FzZSAncyc6XHJcblx0XHRcdFx0dkdyYWQuYWRkQ29sb3JTdG9wKDAsICdyZ2JhKDI1NSwyNTUsMjU1LDApJyk7XHJcblx0XHRcdFx0dkdyYWQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDI1NSwyNTUsMjU1LDEpJyk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdGNhc2UgJ3YnOlxyXG5cdFx0XHRcdHZHcmFkLmFkZENvbG9yU3RvcCgwLCAncmdiYSgwLDAsMCwwKScpO1xyXG5cdFx0XHRcdHZHcmFkLmFkZENvbG9yU3RvcCgxLCAncmdiYSgwLDAsMCwxKScpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHRcdGN0eC5maWxsU3R5bGUgPSB2R3JhZDtcclxuXHRcdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHBhbGV0dGVPYmouZWxtID0gY2FudmFzO1xyXG5cdFx0cGFsZXR0ZU9iai5kcmF3ID0gZHJhd0Z1bmM7XHJcblxyXG5cdFx0cmV0dXJuIHBhbGV0dGVPYmo7XHJcblx0fSxcclxuXHJcblxyXG5cdGNyZWF0ZVNsaWRlckdyYWRpZW50IDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBzbGlkZXJPYmogPSB7XHJcblx0XHRcdGVsbTogbnVsbCxcclxuXHRcdFx0ZHJhdzogbnVsbFxyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgY2FudmFzID0ganNjLmNyZWF0ZUVsKCdjYW52YXMnKTtcclxuXHRcdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcblx0XHR2YXIgZHJhd0Z1bmMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgY29sb3IxLCBjb2xvcjIpIHtcclxuXHRcdFx0Y2FudmFzLndpZHRoID0gd2lkdGg7XHJcblx0XHRcdGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG5cdFx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG5cdFx0XHR2YXIgZ3JhZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCgwLCAwLCAwLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRcdFx0Z3JhZC5hZGRDb2xvclN0b3AoMCwgY29sb3IxKTtcclxuXHRcdFx0Z3JhZC5hZGRDb2xvclN0b3AoMSwgY29sb3IyKTtcclxuXHJcblx0XHRcdGN0eC5maWxsU3R5bGUgPSBncmFkO1xyXG5cdFx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuXHRcdH07XHJcblxyXG5cdFx0c2xpZGVyT2JqLmVsbSA9IGNhbnZhcztcclxuXHRcdHNsaWRlck9iai5kcmF3ID0gZHJhd0Z1bmM7XHJcblxyXG5cdFx0cmV0dXJuIHNsaWRlck9iajtcclxuXHR9LFxyXG5cclxuXHJcblx0Y3JlYXRlQVNsaWRlckdyYWRpZW50IDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciBzbGlkZXJPYmogPSB7XHJcblx0XHRcdGVsbTogbnVsbCxcclxuXHRcdFx0ZHJhdzogbnVsbFxyXG5cdFx0fTtcclxuXHJcblx0XHR2YXIgY2FudmFzID0ganNjLmNyZWF0ZUVsKCdjYW52YXMnKTtcclxuXHRcdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcblx0XHR2YXIgZHJhd0Z1bmMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCwgY29sb3IpIHtcclxuXHRcdFx0Y2FudmFzLndpZHRoID0gd2lkdGg7XHJcblx0XHRcdGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG5cdFx0XHRjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblxyXG5cdFx0XHR2YXIgc3FTaXplID0gY2FudmFzLndpZHRoIC8gMjtcclxuXHRcdFx0dmFyIHNxQ29sb3IxID0ganNjLnB1Yi5jaGVzc2JvYXJkQ29sb3IxO1xyXG5cdFx0XHR2YXIgc3FDb2xvcjIgPSBqc2MucHViLmNoZXNzYm9hcmRDb2xvcjI7XHJcblxyXG5cdFx0XHQvLyBkYXJrIGdyYXkgYmFja2dyb3VuZFxyXG5cdFx0XHRjdHguZmlsbFN0eWxlID0gc3FDb2xvcjE7XHJcblx0XHRcdGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgeSA9IDA7IHkgPCBjYW52YXMuaGVpZ2h0OyB5ICs9IHNxU2l6ZSAqIDIpIHtcclxuXHRcdFx0XHQvLyBsaWdodCBncmF5IHNxdWFyZXNcclxuXHRcdFx0XHRjdHguZmlsbFN0eWxlID0gc3FDb2xvcjI7XHJcblx0XHRcdFx0Y3R4LmZpbGxSZWN0KDAsIHksIHNxU2l6ZSwgc3FTaXplKTtcclxuXHRcdFx0XHRjdHguZmlsbFJlY3Qoc3FTaXplLCB5ICsgc3FTaXplLCBzcVNpemUsIHNxU2l6ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBncmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIDAsIGNhbnZhcy5oZWlnaHQpO1xyXG5cdFx0XHRncmFkLmFkZENvbG9yU3RvcCgwLCBjb2xvcik7XHJcblx0XHRcdGdyYWQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDAsMCwwLDApJyk7XHJcblxyXG5cdFx0XHRjdHguZmlsbFN0eWxlID0gZ3JhZDtcclxuXHRcdFx0Y3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHNsaWRlck9iai5lbG0gPSBjYW52YXM7XHJcblx0XHRzbGlkZXJPYmouZHJhdyA9IGRyYXdGdW5jO1xyXG5cclxuXHRcdHJldHVybiBzbGlkZXJPYmo7XHJcblx0fSxcclxuXHJcblxyXG5cdEJveFNoYWRvdyA6IChmdW5jdGlvbiAoKSB7XHJcblx0XHR2YXIgQm94U2hhZG93ID0gZnVuY3Rpb24gKGhTaGFkb3csIHZTaGFkb3csIGJsdXIsIHNwcmVhZCwgY29sb3IsIGluc2V0KSB7XHJcblx0XHRcdHRoaXMuaFNoYWRvdyA9IGhTaGFkb3c7XHJcblx0XHRcdHRoaXMudlNoYWRvdyA9IHZTaGFkb3c7XHJcblx0XHRcdHRoaXMuYmx1ciA9IGJsdXI7XHJcblx0XHRcdHRoaXMuc3ByZWFkID0gc3ByZWFkO1xyXG5cdFx0XHR0aGlzLmNvbG9yID0gY29sb3I7XHJcblx0XHRcdHRoaXMuaW5zZXQgPSAhIWluc2V0O1xyXG5cdFx0fTtcclxuXHJcblx0XHRCb3hTaGFkb3cucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHR2YXIgdmFscyA9IFtcclxuXHRcdFx0XHRNYXRoLnJvdW5kKHRoaXMuaFNoYWRvdykgKyAncHgnLFxyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy52U2hhZG93KSArICdweCcsXHJcblx0XHRcdFx0TWF0aC5yb3VuZCh0aGlzLmJsdXIpICsgJ3B4JyxcclxuXHRcdFx0XHRNYXRoLnJvdW5kKHRoaXMuc3ByZWFkKSArICdweCcsXHJcblx0XHRcdFx0dGhpcy5jb2xvclxyXG5cdFx0XHRdO1xyXG5cdFx0XHRpZiAodGhpcy5pbnNldCkge1xyXG5cdFx0XHRcdHZhbHMucHVzaCgnaW5zZXQnKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdmFscy5qb2luKCcgJyk7XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBCb3hTaGFkb3c7XHJcblx0fSkoKSxcclxuXHJcblxyXG5cdGZsYWdzIDoge1xyXG5cdFx0bGVhdmVWYWx1ZSA6IDEgPDwgMCxcclxuXHRcdGxlYXZlQWxwaGEgOiAxIDw8IDEsXHJcblx0XHRsZWF2ZVByZXZpZXcgOiAxIDw8IDIsXHJcblx0fSxcclxuXHJcblxyXG5cdGVudW1PcHRzIDoge1xyXG5cdFx0Zm9ybWF0OiBbJ2F1dG8nLCAnYW55JywgJ2hleCcsICdyZ2InLCAncmdiYSddLFxyXG5cdFx0cHJldmlld1Bvc2l0aW9uOiBbJ2xlZnQnLCAncmlnaHQnXSxcclxuXHRcdG1vZGU6IFsnaHN2JywgJ2h2cycsICdocycsICdodiddLFxyXG5cdFx0cG9zaXRpb246IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ10sXHJcblx0XHRhbHBoYUNoYW5uZWw6IFsnYXV0bycsIHRydWUsIGZhbHNlXSxcclxuXHR9LFxyXG5cclxuXHJcblx0ZGVwcmVjYXRlZE9wdHMgOiB7XHJcblx0XHQvLyA8b2xkX29wdGlvbj46IDxuZXdfb3B0aW9uPiAgKDxuZXdfb3B0aW9uPiBjYW4gYmUgbnVsbClcclxuXHRcdCdzdHlsZUVsZW1lbnQnOiAncHJldmlld0VsZW1lbnQnLFxyXG5cdFx0J29uRmluZUNoYW5nZSc6ICdvbklucHV0JyxcclxuXHRcdCdvdmVyd3JpdGVJbXBvcnRhbnQnOiAnZm9yY2VTdHlsZScsXHJcblx0XHQnY2xvc2FibGUnOiAnY2xvc2VCdXR0b24nLFxyXG5cdFx0J2luc2V0V2lkdGgnOiAnY29udHJvbEJvcmRlcldpZHRoJyxcclxuXHRcdCdpbnNldENvbG9yJzogJ2NvbnRyb2xCb3JkZXJDb2xvcicsXHJcblx0XHQncmVmaW5lJzogbnVsbCxcclxuXHR9LFxyXG5cclxuXHJcblx0ZG9jc1JlZiA6ICcgJyArICdTZWUgaHR0cHM6Ly9qc2NvbG9yLmNvbS9kb2NzLycsXHJcblxyXG5cclxuXHQvL1xyXG5cdC8vIFVzYWdlOlxyXG5cdC8vIHZhciBteVBpY2tlciA9IG5ldyBKU0NvbG9yKDx0YXJnZXRFbGVtZW50PiBbLCA8b3B0aW9ucz5dKVxyXG5cdC8vXHJcblx0Ly8gKGNvbnN0cnVjdG9yIGlzIGFjY2Vzc2libGUgdmlhIGJvdGggJ2pzY29sb3InIGFuZCAnSlNDb2xvcicgbmFtZSlcclxuXHQvL1xyXG5cclxuXHRwdWIgOiBmdW5jdGlvbiAodGFyZ2V0RWxlbWVudCwgb3B0cykge1xyXG5cclxuXHRcdHZhciBUSElTID0gdGhpcztcclxuXHJcblx0XHRpZiAoIW9wdHMpIHtcclxuXHRcdFx0b3B0cyA9IHt9O1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY2hhbm5lbHMgPSB7XHJcblx0XHRcdHI6IDI1NSwgLy8gcmVkIFswLTI1NV1cclxuXHRcdFx0ZzogMjU1LCAvLyBncmVlbiBbMC0yNTVdXHJcblx0XHRcdGI6IDI1NSwgLy8gYmx1ZSBbMC0yNTVdXHJcblx0XHRcdGg6IDAsIC8vIGh1ZSBbMC0zNjBdXHJcblx0XHRcdHM6IDAsIC8vIHNhdHVyYXRpb24gWzAtMTAwXVxyXG5cdFx0XHR2OiAxMDAsIC8vIHZhbHVlIChicmlnaHRuZXNzKSBbMC0xMDBdXHJcblx0XHRcdGE6IDEuMCwgLy8gYWxwaGEgKG9wYWNpdHkpIFswLjAgLSAxLjBdXHJcblx0XHR9O1xyXG5cclxuXHRcdC8vIEdlbmVyYWwgb3B0aW9uc1xyXG5cdFx0Ly9cclxuXHRcdHRoaXMuZm9ybWF0ID0gJ2F1dG8nOyAvLyAnYXV0bycgfCAnYW55JyB8ICdoZXgnIHwgJ3JnYicgfCAncmdiYScgLSBGb3JtYXQgb2YgdGhlIGlucHV0L291dHB1dCB2YWx1ZVxyXG5cdFx0dGhpcy52YWx1ZSA9IHVuZGVmaW5lZDsgLy8gSU5JVElBTCBjb2xvciB2YWx1ZSBpbiBhbnkgc3VwcG9ydGVkIGZvcm1hdC4gVG8gY2hhbmdlIGl0IGxhdGVyLCB1c2UgbWV0aG9kIGZyb21TdHJpbmcoKSwgZnJvbUhTVkEoKSwgZnJvbVJHQkEoKSBvciBjaGFubmVsKClcclxuXHRcdHRoaXMuYWxwaGEgPSB1bmRlZmluZWQ7IC8vIElOSVRJQUwgYWxwaGEgdmFsdWUuIFRvIGNoYW5nZSBpdCBsYXRlciwgY2FsbCBtZXRob2QgY2hhbm5lbCgnQScsIDx2YWx1ZT4pXHJcblx0XHR0aGlzLm9uQ2hhbmdlID0gdW5kZWZpbmVkOyAvLyBjYWxsZWQgd2hlbiBjb2xvciBjaGFuZ2VzLiBWYWx1ZSBjYW4gYmUgZWl0aGVyIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmcgd2l0aCBKUyBjb2RlLlxyXG5cdFx0dGhpcy5vbklucHV0ID0gdW5kZWZpbmVkOyAvLyBjYWxsZWQgcmVwZWF0ZWRseSBhcyB0aGUgY29sb3IgaXMgYmVpbmcgY2hhbmdlZCwgZS5nLiB3aGlsZSBkcmFnZ2luZyBhIHNsaWRlci4gVmFsdWUgY2FuIGJlIGVpdGhlciBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nIHdpdGggSlMgY29kZS5cclxuXHRcdHRoaXMudmFsdWVFbGVtZW50ID0gdW5kZWZpbmVkOyAvLyBlbGVtZW50IHRoYXQgd2lsbCBiZSB1c2VkIHRvIGRpc3BsYXkgYW5kIGlucHV0IHRoZSBjb2xvciB2YWx1ZVxyXG5cdFx0dGhpcy5hbHBoYUVsZW1lbnQgPSB1bmRlZmluZWQ7IC8vIGVsZW1lbnQgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZGlzcGxheSBhbmQgaW5wdXQgdGhlIGFscGhhIChvcGFjaXR5KSB2YWx1ZVxyXG5cdFx0dGhpcy5wcmV2aWV3RWxlbWVudCA9IHVuZGVmaW5lZDsgLy8gZWxlbWVudCB0aGF0IHdpbGwgcHJldmlldyB0aGUgcGlja2VkIGNvbG9yIHVzaW5nIENTUyBiYWNrZ3JvdW5kXHJcblx0XHR0aGlzLnByZXZpZXdQb3NpdGlvbiA9ICdsZWZ0JzsgLy8gJ2xlZnQnIHwgJ3JpZ2h0JyAtIHBvc2l0aW9uIG9mIHRoZSBjb2xvciBwcmV2aWV3IGluIHByZXZpZXdFbGVtZW50XHJcblx0XHR0aGlzLnByZXZpZXdTaXplID0gMzI7IC8vIChweCkgd2lkdGggb2YgdGhlIGNvbG9yIHByZXZpZXcgZGlzcGxheWVkIGluIHByZXZpZXdFbGVtZW50XHJcblx0XHR0aGlzLnByZXZpZXdQYWRkaW5nID0gODsgLy8gKHB4KSBzcGFjZSBiZXR3ZWVuIGNvbG9yIHByZXZpZXcgYW5kIGNvbnRlbnQgb2YgdGhlIHByZXZpZXdFbGVtZW50XHJcblx0XHR0aGlzLnJlcXVpcmVkID0gdHJ1ZTsgLy8gd2hldGhlciB0aGUgYXNzb2NpYXRlZCB0ZXh0IGlucHV0IG11c3QgYWx3YXlzIGNvbnRhaW4gYSBjb2xvciB2YWx1ZS4gSWYgZmFsc2UsIHRoZSBpbnB1dCBjYW4gYmUgbGVmdCBlbXB0eS5cclxuXHRcdHRoaXMuaGFzaCA9IHRydWU7IC8vIHdoZXRoZXIgdG8gcHJlZml4IHRoZSBIRVggY29sb3IgY29kZSB3aXRoICMgc3ltYm9sIChvbmx5IGFwcGxpY2FibGUgZm9yIEhFWCBmb3JtYXQpXHJcblx0XHR0aGlzLnVwcGVyY2FzZSA9IHRydWU7IC8vIHdoZXRoZXIgdG8gc2hvdyB0aGUgSEVYIGNvbG9yIGNvZGUgaW4gdXBwZXIgY2FzZSAob25seSBhcHBsaWNhYmxlIGZvciBIRVggZm9ybWF0KVxyXG5cdFx0dGhpcy5mb3JjZVN0eWxlID0gdHJ1ZTsgLy8gd2hldGhlciB0byBvdmVyd3JpdGUgQ1NTIHN0eWxlIG9mIHRoZSBwcmV2aWV3RWxlbWVudCB1c2luZyAhaW1wb3J0YW50IGZsYWdcclxuXHJcblx0XHQvLyBDb2xvciBQaWNrZXIgb3B0aW9uc1xyXG5cdFx0Ly9cclxuXHRcdHRoaXMud2lkdGggPSAxODE7IC8vIHdpZHRoIG9mIGNvbG9yIHBhbGV0dGUgKGluIHB4KVxyXG5cdFx0dGhpcy5oZWlnaHQgPSAxMDE7IC8vIGhlaWdodCBvZiBjb2xvciBwYWxldHRlIChpbiBweClcclxuXHRcdHRoaXMubW9kZSA9ICdIU1YnOyAvLyAnSFNWJyB8ICdIVlMnIHwgJ0hTJyB8ICdIVicgLSBsYXlvdXQgb2YgdGhlIGNvbG9yIHBpY2tlciBjb250cm9sc1xyXG5cdFx0dGhpcy5hbHBoYUNoYW5uZWwgPSAnYXV0byc7IC8vICdhdXRvJyB8IHRydWUgfCBmYWxzZSAtIGlmIGFscGhhIGNoYW5uZWwgaXMgZW5hYmxlZCwgdGhlIGFscGhhIHNsaWRlciB3aWxsIGJlIHZpc2libGUuIElmICdhdXRvJywgaXQgd2lsbCBiZSBkZXRlcm1pbmVkIGFjY29yZGluZyB0byBjb2xvciBmb3JtYXRcclxuXHRcdHRoaXMucG9zaXRpb24gPSAnYm90dG9tJzsgLy8gJ2xlZnQnIHwgJ3JpZ2h0JyB8ICd0b3AnIHwgJ2JvdHRvbScgLSBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgdGFyZ2V0IGVsZW1lbnRcclxuXHRcdHRoaXMuc21hcnRQb3NpdGlvbiA9IHRydWU7IC8vIGF1dG9tYXRpY2FsbHkgY2hhbmdlIHBpY2tlciBwb3NpdGlvbiB3aGVuIHRoZXJlIGlzIG5vdCBlbm91Z2ggc3BhY2UgZm9yIGl0XHJcblx0XHR0aGlzLnNob3dPbkNsaWNrID0gdHJ1ZTsgLy8gd2hldGhlciB0byBzaG93IHRoZSBwaWNrZXIgd2hlbiB1c2VyIGNsaWNrcyBpdHMgdGFyZ2V0IGVsZW1lbnRcclxuXHRcdHRoaXMuaGlkZU9uTGVhdmUgPSB0cnVlOyAvLyB3aGV0aGVyIHRvIGF1dG9tYXRpY2FsbHkgaGlkZSB0aGUgcGlja2VyIHdoZW4gdXNlciBsZWF2ZXMgaXRzIHRhcmdldCBlbGVtZW50IChlLmcuIHVwb24gY2xpY2tpbmcgdGhlIGRvY3VtZW50KVxyXG5cdFx0dGhpcy5zbGlkZXJTaXplID0gMTY7IC8vIHB4XHJcblx0XHR0aGlzLmNyb3NzU2l6ZSA9IDg7IC8vIHB4XHJcblx0XHR0aGlzLmNsb3NlQnV0dG9uID0gZmFsc2U7IC8vIHdoZXRoZXIgdG8gZGlzcGxheSB0aGUgQ2xvc2UgYnV0dG9uXHJcblx0XHR0aGlzLmNsb3NlVGV4dCA9ICdDbG9zZSc7XHJcblx0XHR0aGlzLmJ1dHRvbkNvbG9yID0gJ3JnYmEoMCwwLDAsMSknOyAvLyBDU1MgY29sb3JcclxuXHRcdHRoaXMuYnV0dG9uSGVpZ2h0ID0gMTg7IC8vIHB4XHJcblx0XHR0aGlzLnBhZGRpbmcgPSAxMjsgLy8gcHhcclxuXHRcdHRoaXMuYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LDI1NSwyNTUsMSknOyAvLyBDU1MgY29sb3JcclxuXHRcdHRoaXMuYm9yZGVyV2lkdGggPSAxOyAvLyBweFxyXG5cdFx0dGhpcy5ib3JkZXJDb2xvciA9ICdyZ2JhKDE4NywxODcsMTg3LDEpJzsgLy8gQ1NTIGNvbG9yXHJcblx0XHR0aGlzLmJvcmRlclJhZGl1cyA9IDg7IC8vIHB4XHJcblx0XHR0aGlzLmNvbnRyb2xCb3JkZXJXaWR0aCA9IDE7IC8vIHB4XHJcblx0XHR0aGlzLmNvbnRyb2xCb3JkZXJDb2xvciA9ICdyZ2JhKDE4NywxODcsMTg3LDEpJzsgLy8gQ1NTIGNvbG9yXHJcblx0XHR0aGlzLnNoYWRvdyA9IHRydWU7IC8vIHdoZXRoZXIgdG8gZGlzcGxheSBhIHNoYWRvd1xyXG5cdFx0dGhpcy5zaGFkb3dCbHVyID0gMTU7IC8vIHB4XHJcblx0XHR0aGlzLnNoYWRvd0NvbG9yID0gJ3JnYmEoMCwwLDAsMC4yKSc7IC8vIENTUyBjb2xvclxyXG5cdFx0dGhpcy5wb2ludGVyQ29sb3IgPSAncmdiYSg3Niw3Niw3NiwxKSc7IC8vIENTUyBjb2xvclxyXG5cdFx0dGhpcy5wb2ludGVyQm9yZGVyV2lkdGggPSAxOyAvLyBweFxyXG5cdFx0dGhpcy5wb2ludGVyQm9yZGVyQ29sb3IgPSAncmdiYSgyNTUsMjU1LDI1NSwxKSc7IC8vIENTUyBjb2xvclxyXG5cdFx0dGhpcy5wb2ludGVyVGhpY2tuZXNzID0gMjsgLy8gcHhcclxuXHRcdHRoaXMuekluZGV4ID0gNTAwMDtcclxuXHRcdHRoaXMuY29udGFpbmVyID0gdW5kZWZpbmVkOyAvLyB3aGVyZSB0byBhcHBlbmQgdGhlIGNvbG9yIHBpY2tlciAoQk9EWSBlbGVtZW50IGJ5IGRlZmF1bHQpXHJcblxyXG5cdFx0Ly8gRXhwZXJpbWVudGFsXHJcblx0XHQvL1xyXG5cdFx0dGhpcy5taW5TID0gMDsgLy8gbWluIGFsbG93ZWQgc2F0dXJhdGlvbiAoMCAtIDEwMClcclxuXHRcdHRoaXMubWF4UyA9IDEwMDsgLy8gbWF4IGFsbG93ZWQgc2F0dXJhdGlvbiAoMCAtIDEwMClcclxuXHRcdHRoaXMubWluViA9IDA7IC8vIG1pbiBhbGxvd2VkIHZhbHVlIChicmlnaHRuZXNzKSAoMCAtIDEwMClcclxuXHRcdHRoaXMubWF4ViA9IDEwMDsgLy8gbWF4IGFsbG93ZWQgdmFsdWUgKGJyaWdodG5lc3MpICgwIC0gMTAwKVxyXG5cdFx0dGhpcy5taW5BID0gMC4wOyAvLyBtaW4gYWxsb3dlZCBhbHBoYSAob3BhY2l0eSkgKDAuMCAtIDEuMClcclxuXHRcdHRoaXMubWF4QSA9IDEuMDsgLy8gbWF4IGFsbG93ZWQgYWxwaGEgKG9wYWNpdHkpICgwLjAgLSAxLjApXHJcblxyXG5cclxuXHRcdC8vIGxldCdzIHByb2Nlc3MgdGhlIERFUFJFQ0FURUQgJ29wdGlvbnMnIHByb3BlcnR5ICh0aGlzIHdpbGwgYmUgbGF0ZXIgcmVtb3ZlZClcclxuXHRcdGlmIChqc2MucHViLm9wdGlvbnMpIHtcclxuXHRcdFx0Ly8gbGV0J3Mgc2V0IGN1c3RvbSBkZWZhdWx0IG9wdGlvbnMsIGlmIHNwZWNpZmllZFxyXG5cdFx0XHRmb3IgKHZhciBvcHQgaW4ganNjLnB1Yi5vcHRpb25zKSB7XHJcblx0XHRcdFx0aWYgKGpzYy5wdWIub3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShvcHQpKSB7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRzZXRPcHRpb24ob3B0LCBqc2MucHViLm9wdGlvbnNbb3B0XSk7XHJcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Ly8gbGV0J3MgYXBwbHkgY29uZmlndXJhdGlvbiBwcmVzZXRzXHJcblx0XHQvL1xyXG5cdFx0dmFyIHByZXNldHNBcnIgPSBbXTtcclxuXHJcblx0XHRpZiAob3B0cy5wcmVzZXQpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBvcHRzLnByZXNldCA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHRwcmVzZXRzQXJyID0gb3B0cy5wcmVzZXQuc3BsaXQoL1xccysvKTtcclxuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9wdHMucHJlc2V0KSkge1xyXG5cdFx0XHRcdHByZXNldHNBcnIgPSBvcHRzLnByZXNldC5zbGljZSgpOyAvLyBzbGljZSgpIHRvIGNsb25lXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y29uc29sZS53YXJuKCdVbnJlY29nbml6ZWQgcHJlc2V0IHZhbHVlJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHQvLyBhbHdheXMgdXNlIHRoZSAnZGVmYXVsdCcgcHJlc2V0LiBJZiBpdCdzIG5vdCBsaXN0ZWQsIGFwcGVuZCBpdCB0byB0aGUgZW5kLlxyXG5cdFx0aWYgKHByZXNldHNBcnIuaW5kZXhPZignZGVmYXVsdCcpID09PSAtMSkge1xyXG5cdFx0XHRwcmVzZXRzQXJyLnB1c2goJ2RlZmF1bHQnKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBsZXQncyBhcHBseSB0aGUgcHJlc2V0cyBpbiByZXZlcnNlIG9yZGVyLCBzbyB0aGF0IHNob3VsZCB0aGVyZSBiZSBhbnkgb3ZlcmxhcHBpbmcgb3B0aW9ucyxcclxuXHRcdC8vIHRoZSBmb3JtZXJseSBsaXN0ZWQgcHJlc2V0IHdpbGwgb3ZlcnJpZGUgdGhlIGxhdHRlclxyXG5cdFx0Zm9yICh2YXIgaSA9IHByZXNldHNBcnIubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcclxuXHRcdFx0dmFyIHByZXMgPSBwcmVzZXRzQXJyW2ldO1xyXG5cdFx0XHRpZiAoIXByZXMpIHtcclxuXHRcdFx0XHRjb250aW51ZTsgLy8gcHJlc2V0IGlzIGVtcHR5IHN0cmluZ1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghanNjLnB1Yi5wcmVzZXRzLmhhc093blByb3BlcnR5KHByZXMpKSB7XHJcblx0XHRcdFx0Y29uc29sZS53YXJuKCdVbmtub3duIHByZXNldDogJXMnLCBwcmVzKTtcclxuXHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IgKHZhciBvcHQgaW4ganNjLnB1Yi5wcmVzZXRzW3ByZXNdKSB7XHJcblx0XHRcdFx0aWYgKGpzYy5wdWIucHJlc2V0c1twcmVzXS5oYXNPd25Qcm9wZXJ0eShvcHQpKSB7XHJcblx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRzZXRPcHRpb24ob3B0LCBqc2MucHViLnByZXNldHNbcHJlc11bb3B0XSk7XHJcblx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihlKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Ly8gbGV0J3Mgc2V0IHNwZWNpZmljIG9wdGlvbnMgZm9yIHRoaXMgY29sb3IgcGlja2VyXHJcblx0XHR2YXIgbm9uUHJvcGVydGllcyA9IFtcclxuXHRcdFx0Ly8gdGhlc2Ugb3B0aW9ucyB3b24ndCBiZSBzZXQgYXMgaW5zdGFuY2UgcHJvcGVydGllc1xyXG5cdFx0XHQncHJlc2V0JyxcclxuXHRcdF07XHJcblx0XHRmb3IgKHZhciBvcHQgaW4gb3B0cykge1xyXG5cdFx0XHRpZiAob3B0cy5oYXNPd25Qcm9wZXJ0eShvcHQpKSB7XHJcblx0XHRcdFx0aWYgKG5vblByb3BlcnRpZXMuaW5kZXhPZihvcHQpID09PSAtMSkge1xyXG5cdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0c2V0T3B0aW9uKG9wdCwgb3B0c1tvcHRdKTtcclxuXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKGUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBHZXR0ZXI6IG9wdGlvbihuYW1lKVxyXG5cdFx0Ly8gU2V0dGVyOiBvcHRpb24obmFtZSwgdmFsdWUpXHJcblx0XHQvLyAgICAgICAgIG9wdGlvbih7bmFtZTp2YWx1ZSwgLi4ufSlcclxuXHRcdC8vXHJcblx0XHR0aGlzLm9wdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKCFhcmd1bWVudHMubGVuZ3RoKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdObyBvcHRpb24gc3BlY2lmaWVkJyk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdzdHJpbmcnKSB7XHJcblx0XHRcdFx0Ly8gZ2V0dGluZyBhIHNpbmdsZSBvcHRpb25cclxuXHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGdldE9wdGlvbihhcmd1bWVudHNbMF0pO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cclxuXHRcdFx0fSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID49IDIgJiYgdHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gJ3N0cmluZycpIHtcclxuXHRcdFx0XHQvLyBzZXR0aW5nIGEgc2luZ2xlIG9wdGlvblxyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRpZiAoIXNldE9wdGlvbihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSkpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybihlKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5yZWRyYXcoKTsgLy8gaW1tZWRpYXRlbHkgcmVkcmF3cyB0aGUgcGlja2VyLCBpZiBpdCdzIGRpc3BsYXllZFxyXG5cdFx0XHRcdHRoaXMuZXhwb3NlQ29sb3IoKTsgLy8gaW4gY2FzZSBzb21lIHByZXZpZXctcmVsYXRlZCBvciBmb3JtYXQtcmVsYXRlZCBvcHRpb24gd2FzIGNoYW5nZWRcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHJcblx0XHRcdH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJndW1lbnRzWzBdID09PSAnb2JqZWN0Jykge1xyXG5cdFx0XHRcdC8vIHNldHRpbmcgbXVsdGlwbGUgb3B0aW9uc1xyXG5cdFx0XHRcdHZhciBvcHRzID0gYXJndW1lbnRzWzBdO1xyXG5cdFx0XHRcdHZhciBzdWNjZXNzID0gdHJ1ZTtcclxuXHRcdFx0XHRmb3IgKHZhciBvcHQgaW4gb3B0cykge1xyXG5cdFx0XHRcdFx0aWYgKG9wdHMuaGFzT3duUHJvcGVydHkob3B0KSkge1xyXG5cdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdGlmICghc2V0T3B0aW9uKG9wdCwgb3B0c1tvcHRdKSkge1xyXG5cdFx0XHRcdFx0XHRcdFx0c3VjY2VzcyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHRcdFx0XHRcdGNvbnNvbGUud2FybihlKTtcclxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0dGhpcy5yZWRyYXcoKTsgLy8gaW1tZWRpYXRlbHkgcmVkcmF3cyB0aGUgcGlja2VyLCBpZiBpdCdzIGRpc3BsYXllZFxyXG5cdFx0XHRcdHRoaXMuZXhwb3NlQ29sb3IoKTsgLy8gaW4gY2FzZSBzb21lIHByZXZpZXctcmVsYXRlZCBvciBmb3JtYXQtcmVsYXRlZCBvcHRpb24gd2FzIGNoYW5nZWRcclxuXHRcdFx0XHRyZXR1cm4gc3VjY2VzcztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50cycpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBHZXR0ZXI6IGNoYW5uZWwobmFtZSlcclxuXHRcdC8vIFNldHRlcjogY2hhbm5lbChuYW1lLCB2YWx1ZSlcclxuXHRcdC8vXHJcblx0XHR0aGlzLmNoYW5uZWwgPSBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBmb3IgY2hhbm5lbCBuYW1lOiAnICsgbmFtZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0Ly8gZ2V0dGluZyBjaGFubmVsIHZhbHVlXHJcblx0XHRcdFx0aWYgKCF0aGlzLmNoYW5uZWxzLmhhc093blByb3BlcnR5KG5hbWUudG9Mb3dlckNhc2UoKSkpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUud2FybignR2V0dGluZyB1bmtub3duIGNoYW5uZWw6ICcgKyBuYW1lKTtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuY2hhbm5lbHNbbmFtZS50b0xvd2VyQ2FzZSgpXTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gc2V0dGluZyBjaGFubmVsIHZhbHVlXHJcblx0XHRcdFx0dmFyIHJlcyA9IGZhbHNlO1xyXG5cdFx0XHRcdHN3aXRjaCAobmFtZS50b0xvd2VyQ2FzZSgpKSB7XHJcblx0XHRcdFx0XHRjYXNlICdyJzogcmVzID0gdGhpcy5mcm9tUkdCQSh2YWx1ZSwgbnVsbCwgbnVsbCwgbnVsbCk7IGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAnZyc6IHJlcyA9IHRoaXMuZnJvbVJHQkEobnVsbCwgdmFsdWUsIG51bGwsIG51bGwpOyBicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ2InOiByZXMgPSB0aGlzLmZyb21SR0JBKG51bGwsIG51bGwsIHZhbHVlLCBudWxsKTsgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICdoJzogcmVzID0gdGhpcy5mcm9tSFNWQSh2YWx1ZSwgbnVsbCwgbnVsbCwgbnVsbCk7IGJyZWFrO1xyXG5cdFx0XHRcdFx0Y2FzZSAncyc6IHJlcyA9IHRoaXMuZnJvbUhTVkEobnVsbCwgdmFsdWUsIG51bGwsIG51bGwpOyBicmVhaztcclxuXHRcdFx0XHRcdGNhc2UgJ3YnOiByZXMgPSB0aGlzLmZyb21IU1ZBKG51bGwsIG51bGwsIHZhbHVlLCBudWxsKTsgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICdhJzogcmVzID0gdGhpcy5mcm9tSFNWQShudWxsLCBudWxsLCBudWxsLCB2YWx1ZSk7IGJyZWFrO1xyXG5cdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0Y29uc29sZS53YXJuKCdTZXR0aW5nIHVua25vd24gY2hhbm5lbDogJyArIG5hbWUpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGlmIChyZXMpIHtcclxuXHRcdFx0XHRcdHRoaXMucmVkcmF3KCk7IC8vIGltbWVkaWF0ZWx5IHJlZHJhd3MgdGhlIHBpY2tlciwgaWYgaXQncyBkaXNwbGF5ZWRcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBUcmlnZ2VycyBnaXZlbiBpbnB1dCBldmVudChzKSBieTpcclxuXHRcdC8vIC0gZXhlY3V0aW5nIG9uPEV2ZW50PiBjYWxsYmFjayBzcGVjaWZpZWQgYXMgcGlja2VyJ3Mgb3B0aW9uXHJcblx0XHQvLyAtIHRyaWdnZXJpbmcgc3RhbmRhcmQgRE9NIGV2ZW50IGxpc3RlbmVycyBhdHRhY2hlZCB0byB0aGUgdmFsdWUgZWxlbWVudFxyXG5cdFx0Ly9cclxuXHRcdC8vIEl0IGlzIHBvc3NpYmxlIHRvIHNwZWNpZnkgbXVsdGlwbGUgZXZlbnRzIHNlcGFyYXRlZCB3aXRoIGEgc3BhY2UuXHJcblx0XHQvL1xyXG5cdFx0dGhpcy50cmlnZ2VyID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMpIHtcclxuXHRcdFx0dmFyIGV2cyA9IGpzYy5zdHJMaXN0KGV2ZW50TmFtZXMpO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGV2cy5sZW5ndGg7IGkgKz0gMSkge1xyXG5cdFx0XHRcdHZhciBldiA9IGV2c1tpXS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuXHRcdFx0XHQvLyB0cmlnZ2VyIGEgY2FsbGJhY2tcclxuXHRcdFx0XHR2YXIgY2FsbGJhY2tQcm9wID0gbnVsbDtcclxuXHRcdFx0XHRzd2l0Y2ggKGV2KSB7XHJcblx0XHRcdFx0XHRjYXNlICdpbnB1dCc6IGNhbGxiYWNrUHJvcCA9ICdvbklucHV0JzsgYnJlYWs7XHJcblx0XHRcdFx0XHRjYXNlICdjaGFuZ2UnOiBjYWxsYmFja1Byb3AgPSAnb25DaGFuZ2UnOyBicmVhaztcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGNhbGxiYWNrUHJvcCkge1xyXG5cdFx0XHRcdFx0anNjLnRyaWdnZXJDYWxsYmFjayh0aGlzLCBjYWxsYmFja1Byb3ApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0Ly8gdHJpZ2dlciBzdGFuZGFyZCBET00gZXZlbnQgbGlzdGVuZXJzIG9uIHRoZSB2YWx1ZSBlbGVtZW50XHJcblx0XHRcdFx0anNjLnRyaWdnZXJJbnB1dEV2ZW50KHRoaXMudmFsdWVFbGVtZW50LCBldiwgdHJ1ZSwgdHJ1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8vIGg6IDAtMzYwXHJcblx0XHQvLyBzOiAwLTEwMFxyXG5cdFx0Ly8gdjogMC0xMDBcclxuXHRcdC8vIGE6IDAuMC0xLjBcclxuXHRcdC8vXHJcblx0XHR0aGlzLmZyb21IU1ZBID0gZnVuY3Rpb24gKGgsIHMsIHYsIGEsIGZsYWdzKSB7IC8vIG51bGwgPSBkb24ndCBjaGFuZ2VcclxuXHRcdFx0aWYgKGggPT09IHVuZGVmaW5lZCkgeyBoID0gbnVsbDsgfVxyXG5cdFx0XHRpZiAocyA9PT0gdW5kZWZpbmVkKSB7IHMgPSBudWxsOyB9XHJcblx0XHRcdGlmICh2ID09PSB1bmRlZmluZWQpIHsgdiA9IG51bGw7IH1cclxuXHRcdFx0aWYgKGEgPT09IHVuZGVmaW5lZCkgeyBhID0gbnVsbDsgfVxyXG5cclxuXHRcdFx0aWYgKGggIT09IG51bGwpIHtcclxuXHRcdFx0XHRpZiAoaXNOYU4oaCkpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy5oID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMzYwLCBoKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHMgIT09IG51bGwpIHtcclxuXHRcdFx0XHRpZiAoaXNOYU4ocykpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy5zID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMTAwLCB0aGlzLm1heFMsIHMpLCB0aGlzLm1pblMpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh2ICE9PSBudWxsKSB7XHJcblx0XHRcdFx0aWYgKGlzTmFOKHYpKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFx0XHRcdHRoaXMuY2hhbm5lbHMudiA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEwMCwgdGhpcy5tYXhWLCB2KSwgdGhpcy5taW5WKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoYSAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmIChpc05hTihhKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdFx0XHR0aGlzLmNoYW5uZWxzLmEgPSB0aGlzLmhhc0FscGhhQ2hhbm5lbCgpID9cclxuXHRcdFx0XHRcdE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHRoaXMubWF4QSwgYSksIHRoaXMubWluQSkgOlxyXG5cdFx0XHRcdFx0MS4wOyAvLyBpZiBhbHBoYSBjaGFubmVsIGlzIGRpc2FibGVkLCB0aGUgY29sb3Igc2hvdWxkIHN0YXkgMTAwJSBvcGFxdWVcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHJnYiA9IGpzYy5IU1ZfUkdCKFxyXG5cdFx0XHRcdHRoaXMuY2hhbm5lbHMuaCxcclxuXHRcdFx0XHR0aGlzLmNoYW5uZWxzLnMsXHJcblx0XHRcdFx0dGhpcy5jaGFubmVscy52XHJcblx0XHRcdCk7XHJcblx0XHRcdHRoaXMuY2hhbm5lbHMuciA9IHJnYlswXTtcclxuXHRcdFx0dGhpcy5jaGFubmVscy5nID0gcmdiWzFdO1xyXG5cdFx0XHR0aGlzLmNoYW5uZWxzLmIgPSByZ2JbMl07XHJcblxyXG5cdFx0XHR0aGlzLmV4cG9zZUNvbG9yKGZsYWdzKTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHQvLyByOiAwLTI1NVxyXG5cdFx0Ly8gZzogMC0yNTVcclxuXHRcdC8vIGI6IDAtMjU1XHJcblx0XHQvLyBhOiAwLjAtMS4wXHJcblx0XHQvL1xyXG5cdFx0dGhpcy5mcm9tUkdCQSA9IGZ1bmN0aW9uIChyLCBnLCBiLCBhLCBmbGFncykgeyAvLyBudWxsID0gZG9uJ3QgY2hhbmdlXHJcblx0XHRcdGlmIChyID09PSB1bmRlZmluZWQpIHsgciA9IG51bGw7IH1cclxuXHRcdFx0aWYgKGcgPT09IHVuZGVmaW5lZCkgeyBnID0gbnVsbDsgfVxyXG5cdFx0XHRpZiAoYiA9PT0gdW5kZWZpbmVkKSB7IGIgPSBudWxsOyB9XHJcblx0XHRcdGlmIChhID09PSB1bmRlZmluZWQpIHsgYSA9IG51bGw7IH1cclxuXHJcblx0XHRcdGlmIChyICE9PSBudWxsKSB7XHJcblx0XHRcdFx0aWYgKGlzTmFOKHIpKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFx0XHRcdHIgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIHIpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZiAoZyAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdGlmIChpc05hTihnKSkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHRcdFx0XHRnID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBnKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGIgIT09IG51bGwpIHtcclxuXHRcdFx0XHRpZiAoaXNOYU4oYikpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblx0XHRcdFx0YiA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgYikpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmIChhICE9PSBudWxsKSB7XHJcblx0XHRcdFx0aWYgKGlzTmFOKGEpKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cdFx0XHRcdHRoaXMuY2hhbm5lbHMuYSA9IHRoaXMuaGFzQWxwaGFDaGFubmVsKCkgP1xyXG5cdFx0XHRcdFx0TWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgdGhpcy5tYXhBLCBhKSwgdGhpcy5taW5BKSA6XHJcblx0XHRcdFx0XHQxLjA7IC8vIGlmIGFscGhhIGNoYW5uZWwgaXMgZGlzYWJsZWQsIHRoZSBjb2xvciBzaG91bGQgc3RheSAxMDAlIG9wYXF1ZVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgaHN2ID0ganNjLlJHQl9IU1YoXHJcblx0XHRcdFx0cj09PW51bGwgPyB0aGlzLmNoYW5uZWxzLnIgOiByLFxyXG5cdFx0XHRcdGc9PT1udWxsID8gdGhpcy5jaGFubmVscy5nIDogZyxcclxuXHRcdFx0XHRiPT09bnVsbCA/IHRoaXMuY2hhbm5lbHMuYiA6IGJcclxuXHRcdFx0KTtcclxuXHRcdFx0aWYgKGhzdlswXSAhPT0gbnVsbCkge1xyXG5cdFx0XHRcdHRoaXMuY2hhbm5lbHMuaCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDM2MCwgaHN2WzBdKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKGhzdlsyXSAhPT0gMCkgeyAvLyBmdWxseSBibGFjayBjb2xvciBzdGF5cyBibGFjayB0aHJvdWdoIGVudGlyZSBzYXR1cmF0aW9uIHJhbmdlLCBzbyBsZXQncyBub3QgY2hhbmdlIHNhdHVyYXRpb25cclxuXHRcdFx0XHR0aGlzLmNoYW5uZWxzLnMgPSBNYXRoLm1heCgwLCB0aGlzLm1pblMsIE1hdGgubWluKDEwMCwgdGhpcy5tYXhTLCBoc3ZbMV0pKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmNoYW5uZWxzLnYgPSBNYXRoLm1heCgwLCB0aGlzLm1pblYsIE1hdGgubWluKDEwMCwgdGhpcy5tYXhWLCBoc3ZbMl0pKTtcclxuXHJcblx0XHRcdC8vIHVwZGF0ZSBSR0IgYWNjb3JkaW5nIHRvIGZpbmFsIEhTViwgYXMgc29tZSB2YWx1ZXMgbWlnaHQgYmUgdHJpbW1lZFxyXG5cdFx0XHR2YXIgcmdiID0ganNjLkhTVl9SR0IodGhpcy5jaGFubmVscy5oLCB0aGlzLmNoYW5uZWxzLnMsIHRoaXMuY2hhbm5lbHMudik7XHJcblx0XHRcdHRoaXMuY2hhbm5lbHMuciA9IHJnYlswXTtcclxuXHRcdFx0dGhpcy5jaGFubmVscy5nID0gcmdiWzFdO1xyXG5cdFx0XHR0aGlzLmNoYW5uZWxzLmIgPSByZ2JbMl07XHJcblxyXG5cdFx0XHR0aGlzLmV4cG9zZUNvbG9yKGZsYWdzKTtcclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHQvLyBERVBSRUNBVEVELiBVc2UgLmZyb21IU1ZBKCkgaW5zdGVhZFxyXG5cdFx0Ly9cclxuXHRcdHRoaXMuZnJvbUhTViA9IGZ1bmN0aW9uIChoLCBzLCB2LCBmbGFncykge1xyXG5cdFx0XHRjb25zb2xlLndhcm4oJ2Zyb21IU1YoKSBtZXRob2QgaXMgREVQUkVDQVRFRC4gVXNpbmcgZnJvbUhTVkEoKSBpbnN0ZWFkLicgKyBqc2MuZG9jc1JlZik7XHJcblx0XHRcdHJldHVybiB0aGlzLmZyb21IU1ZBKGgsIHMsIHYsIG51bGwsIGZsYWdzKTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdC8vIERFUFJFQ0FURUQuIFVzZSAuZnJvbVJHQkEoKSBpbnN0ZWFkXHJcblx0XHQvL1xyXG5cdFx0dGhpcy5mcm9tUkdCID0gZnVuY3Rpb24gKHIsIGcsIGIsIGZsYWdzKSB7XHJcblx0XHRcdGNvbnNvbGUud2FybignZnJvbVJHQigpIG1ldGhvZCBpcyBERVBSRUNBVEVELiBVc2luZyBmcm9tUkdCQSgpIGluc3RlYWQuJyArIGpzYy5kb2NzUmVmKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZnJvbVJHQkEociwgZywgYiwgbnVsbCwgZmxhZ3MpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5mcm9tU3RyaW5nID0gZnVuY3Rpb24gKHN0ciwgZmxhZ3MpIHtcclxuXHRcdFx0aWYgKCF0aGlzLnJlcXVpcmVkICYmIHN0ci50cmltKCkgPT09ICcnKSB7XHJcblx0XHRcdFx0Ly8gc2V0dGluZyBlbXB0eSBzdHJpbmcgdG8gYW4gb3B0aW9uYWwgY29sb3IgaW5wdXRcclxuXHRcdFx0XHR0aGlzLnNldFByZXZpZXdFbGVtZW50QmcobnVsbCk7XHJcblx0XHRcdFx0dGhpcy5zZXRWYWx1ZUVsZW1lbnRWYWx1ZSgnJyk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjb2xvciA9IGpzYy5wYXJzZUNvbG9yU3RyaW5nKHN0cik7XHJcblx0XHRcdGlmICghY29sb3IpIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7IC8vIGNvdWxkIG5vdCBwYXJzZVxyXG5cdFx0XHR9XHJcblx0XHRcdGlmICh0aGlzLmZvcm1hdC50b0xvd2VyQ2FzZSgpID09PSAnYW55Jykge1xyXG5cdFx0XHRcdHRoaXMuX2N1cnJlbnRGb3JtYXQgPSBjb2xvci5mb3JtYXQ7IC8vIGFkYXB0IGZvcm1hdFxyXG5cdFx0XHRcdGlmICh0aGlzLmdldEZvcm1hdCgpICE9PSAncmdiYScpIHtcclxuXHRcdFx0XHRcdGNvbG9yLnJnYmFbM10gPSAxLjA7IC8vIHdoZW4gc3dpdGNoaW5nIHRvIGEgZm9ybWF0IHRoYXQgZG9lc24ndCBzdXBwb3J0IGFscGhhLCBzZXQgZnVsbCBvcGFjaXR5XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHRoaXMucmVkcmF3KCk7IC8vIHRvIHNob3cvaGlkZSB0aGUgYWxwaGEgc2xpZGVyIGFjY29yZGluZyB0byBjdXJyZW50IGZvcm1hdFxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZnJvbVJHQkEoXHJcblx0XHRcdFx0Y29sb3IucmdiYVswXSxcclxuXHRcdFx0XHRjb2xvci5yZ2JhWzFdLFxyXG5cdFx0XHRcdGNvbG9yLnJnYmFbMl0sXHJcblx0XHRcdFx0Y29sb3IucmdiYVszXSxcclxuXHRcdFx0XHRmbGFnc1xyXG5cdFx0XHQpO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoZm9ybWF0KSB7XHJcblx0XHRcdGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGZvcm1hdCA9IHRoaXMuZ2V0Rm9ybWF0KCk7IC8vIGZvcm1hdCBub3Qgc3BlY2lmaWVkIC0+IHVzZSB0aGUgY3VycmVudCBmb3JtYXRcclxuXHRcdFx0fVxyXG5cdFx0XHRzd2l0Y2ggKGZvcm1hdC50b0xvd2VyQ2FzZSgpKSB7XHJcblx0XHRcdFx0Y2FzZSAnaGV4JzogcmV0dXJuIHRoaXMudG9IRVhTdHJpbmcoKTsgYnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAncmdiJzogcmV0dXJuIHRoaXMudG9SR0JTdHJpbmcoKTsgYnJlYWs7XHJcblx0XHRcdFx0Y2FzZSAncmdiYSc6IHJldHVybiB0aGlzLnRvUkdCQVN0cmluZygpOyBicmVhaztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnRvSEVYU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gJyMnICsgKFxyXG5cdFx0XHRcdCgnMCcgKyBNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMucikudG9TdHJpbmcoMTYpKS5zdWJzdHIoLTIpICtcclxuXHRcdFx0XHQoJzAnICsgTWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLmcpLnRvU3RyaW5nKDE2KSkuc3Vic3RyKC0yKSArXHJcblx0XHRcdFx0KCcwJyArIE1hdGgucm91bmQodGhpcy5jaGFubmVscy5iKS50b1N0cmluZygxNikpLnN1YnN0cigtMilcclxuXHRcdFx0KS50b1VwcGVyQ2FzZSgpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy50b1JHQlN0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuICgncmdiKCcgK1xyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy5jaGFubmVscy5yKSArICcsJyArXHJcblx0XHRcdFx0TWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLmcpICsgJywnICtcclxuXHRcdFx0XHRNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMuYikgK1xyXG5cdFx0XHQnKScpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy50b1JHQkFTdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiAoJ3JnYmEoJyArXHJcblx0XHRcdFx0TWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLnIpICsgJywnICtcclxuXHRcdFx0XHRNYXRoLnJvdW5kKHRoaXMuY2hhbm5lbHMuZykgKyAnLCcgK1xyXG5cdFx0XHRcdE1hdGgucm91bmQodGhpcy5jaGFubmVscy5iKSArICcsJyArXHJcblx0XHRcdFx0KE1hdGgucm91bmQodGhpcy5jaGFubmVscy5hICogMTAwKSAvIDEwMCkgK1xyXG5cdFx0XHQnKScpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy50b0dyYXlzY2FsZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIChcclxuXHRcdFx0XHQwLjIxMyAqIHRoaXMuY2hhbm5lbHMuciArXHJcblx0XHRcdFx0MC43MTUgKiB0aGlzLmNoYW5uZWxzLmcgK1xyXG5cdFx0XHRcdDAuMDcyICogdGhpcy5jaGFubmVscy5iXHJcblx0XHRcdCk7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnRvQ2FudmFzID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4ganNjLmdlbkNvbG9yUHJldmlld0NhbnZhcyh0aGlzLnRvUkdCQVN0cmluZygpKS5jYW52YXM7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnRvRGF0YVVSTCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMudG9DYW52YXMoKS50b0RhdGFVUkwoKTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMudG9CYWNrZ3JvdW5kID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4ganNjLnB1Yi5iYWNrZ3JvdW5kKHRoaXMudG9SR0JBU3RyaW5nKCkpO1xyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5pc0xpZ2h0ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50b0dyYXlzY2FsZSgpID4gMjU1IC8gMjtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKGlzUGlja2VyT3duZXIoKSkge1xyXG5cdFx0XHRcdGRldGFjaFBpY2tlcigpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGRyYXdQaWNrZXIoKTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMucmVkcmF3ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoaXNQaWNrZXJPd25lcigpKSB7XHJcblx0XHRcdFx0ZHJhd1BpY2tlcigpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLmdldEZvcm1hdCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnRGb3JtYXQ7XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLmhhc0FscGhhQ2hhbm5lbCA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHRoaXMuYWxwaGFDaGFubmVsID09PSAnYXV0bycpIHtcclxuXHRcdFx0XHRyZXR1cm4gKFxyXG5cdFx0XHRcdFx0dGhpcy5mb3JtYXQudG9Mb3dlckNhc2UoKSA9PT0gJ2FueScgfHwgLy8gZm9ybWF0IGNhbiBjaGFuZ2Ugb24gdGhlIGZseSAoZS5nLiBmcm9tIGhleCB0byByZ2JhKSwgc28gbGV0J3MgY29uc2lkZXIgdGhlIGFscGhhIGNoYW5uZWwgZW5hYmxlZFxyXG5cdFx0XHRcdFx0dGhpcy5nZXRGb3JtYXQoKSA9PT0gJ3JnYmEnIHx8IC8vIHRoZSBjdXJyZW50IGZvcm1hdCBzdXBwb3J0cyBhbHBoYSBjaGFubmVsXHJcblx0XHRcdFx0XHR0aGlzLmFscGhhICE9PSB1bmRlZmluZWQgfHwgLy8gaW5pdGlhbCBhbHBoYSB2YWx1ZSBpcyBzZXQsIHNvIHdlJ3JlIHdvcmtpbmcgd2l0aCBhbHBoYSBjaGFubmVsXHJcblx0XHRcdFx0XHR0aGlzLmFscGhhRWxlbWVudCAhPT0gdW5kZWZpbmVkIC8vIHRoZSBhbHBoYSB2YWx1ZSBpcyByZWRpcmVjdGVkLCBzbyB3ZSdyZSB3b3JraW5nIHdpdGggYWxwaGEgY2hhbm5lbFxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmFscGhhQ2hhbm5lbDsgLy8gdGhlIGFscGhhIGNoYW5uZWwgaXMgZXhwbGljaXRseSBzZXRcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMucHJvY2Vzc1ZhbHVlSW5wdXQgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHRcdGlmICghdGhpcy5mcm9tU3RyaW5nKHN0cikpIHtcclxuXHRcdFx0XHQvLyBjb3VsZCBub3QgcGFyc2UgdGhlIGNvbG9yIHZhbHVlIC0gbGV0J3MganVzdCBleHBvc2UgdGhlIGN1cnJlbnQgY29sb3JcclxuXHRcdFx0XHR0aGlzLmV4cG9zZUNvbG9yKCk7XHJcblx0XHRcdH1cclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMucHJvY2Vzc0FscGhhSW5wdXQgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHRcdGlmICghdGhpcy5mcm9tSFNWQShudWxsLCBudWxsLCBudWxsLCBwYXJzZUZsb2F0KHN0cikpKSB7XHJcblx0XHRcdFx0Ly8gY291bGQgbm90IHBhcnNlIHRoZSBhbHBoYSB2YWx1ZSAtIGxldCdzIGp1c3QgZXhwb3NlIHRoZSBjdXJyZW50IGNvbG9yXHJcblx0XHRcdFx0dGhpcy5leHBvc2VDb2xvcigpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLmV4cG9zZUNvbG9yID0gZnVuY3Rpb24gKGZsYWdzKSB7XHJcblxyXG5cdFx0XHRpZiAoIShmbGFncyAmIGpzYy5mbGFncy5sZWF2ZVZhbHVlKSAmJiB0aGlzLnZhbHVlRWxlbWVudCkge1xyXG5cdFx0XHRcdHZhciB2YWx1ZSA9IHRoaXMudG9TdHJpbmcoKTtcclxuXHJcblx0XHRcdFx0aWYgKHRoaXMuZ2V0Rm9ybWF0KCkgPT09ICdoZXgnKSB7XHJcblx0XHRcdFx0XHRpZiAoIXRoaXMudXBwZXJjYXNlKSB7IHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTsgfVxyXG5cdFx0XHRcdFx0aWYgKCF0aGlzLmhhc2gpIHsgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9eIy8sICcnKTsgfVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5zZXRWYWx1ZUVsZW1lbnRWYWx1ZSh2YWx1ZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghKGZsYWdzICYganNjLmZsYWdzLmxlYXZlQWxwaGEpICYmIHRoaXMuYWxwaGFFbGVtZW50KSB7XHJcblx0XHRcdFx0dmFyIHZhbHVlID0gTWF0aC5yb3VuZCh0aGlzLmNoYW5uZWxzLmEgKiAxMDApIC8gMTAwO1xyXG5cdFx0XHRcdHRoaXMuc2V0QWxwaGFFbGVtZW50VmFsdWUodmFsdWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShmbGFncyAmIGpzYy5mbGFncy5sZWF2ZVByZXZpZXcpICYmIHRoaXMucHJldmlld0VsZW1lbnQpIHtcclxuXHRcdFx0XHR2YXIgcHJldmlld1BvcyA9IG51bGw7IC8vICdsZWZ0JyB8ICdyaWdodCcgKG51bGwgLT4gZmlsbCB0aGUgZW50aXJlIGVsZW1lbnQpXHJcblxyXG5cdFx0XHRcdGlmIChcclxuXHRcdFx0XHRcdGpzYy5pc1RleHRJbnB1dCh0aGlzLnByZXZpZXdFbGVtZW50KSB8fCAvLyB0ZXh0IGlucHV0XHJcblx0XHRcdFx0XHQoanNjLmlzQnV0dG9uKHRoaXMucHJldmlld0VsZW1lbnQpICYmICFqc2MuaXNCdXR0b25FbXB0eSh0aGlzLnByZXZpZXdFbGVtZW50KSkgLy8gYnV0dG9uIHdpdGggdGV4dFxyXG5cdFx0XHRcdCkge1xyXG5cdFx0XHRcdFx0cHJldmlld1BvcyA9IHRoaXMucHJldmlld1Bvc2l0aW9uO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5zZXRQcmV2aWV3RWxlbWVudEJnKHRoaXMudG9SR0JBU3RyaW5nKCkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoaXNQaWNrZXJPd25lcigpKSB7XHJcblx0XHRcdFx0cmVkcmF3UGFkKCk7XHJcblx0XHRcdFx0cmVkcmF3U2xkKCk7XHJcblx0XHRcdFx0cmVkcmF3QVNsZCgpO1xyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLnNldFByZXZpZXdFbGVtZW50QmcgPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuXHRcdFx0aWYgKCF0aGlzLnByZXZpZXdFbGVtZW50KSB7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcG9zaXRpb24gPSBudWxsOyAvLyBjb2xvciBwcmV2aWV3IHBvc2l0aW9uOiAgbnVsbCB8ICdsZWZ0JyB8ICdyaWdodCdcclxuXHRcdFx0dmFyIHdpZHRoID0gbnVsbDsgLy8gY29sb3IgcHJldmlldyB3aWR0aDogIHB4IHwgbnVsbCA9IGZpbGwgdGhlIGVudGlyZSBlbGVtZW50XHJcblx0XHRcdGlmIChcclxuXHRcdFx0XHRqc2MuaXNUZXh0SW5wdXQodGhpcy5wcmV2aWV3RWxlbWVudCkgfHwgLy8gdGV4dCBpbnB1dFxyXG5cdFx0XHRcdChqc2MuaXNCdXR0b24odGhpcy5wcmV2aWV3RWxlbWVudCkgJiYgIWpzYy5pc0J1dHRvbkVtcHR5KHRoaXMucHJldmlld0VsZW1lbnQpKSAvLyBidXR0b24gd2l0aCB0ZXh0XHJcblx0XHRcdCkge1xyXG5cdFx0XHRcdHBvc2l0aW9uID0gdGhpcy5wcmV2aWV3UG9zaXRpb247XHJcblx0XHRcdFx0d2lkdGggPSB0aGlzLnByZXZpZXdTaXplO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgYmFja2dyb3VuZHMgPSBbXTtcclxuXHJcblx0XHRcdGlmICghY29sb3IpIHtcclxuXHRcdFx0XHQvLyB0aGVyZSBpcyBubyBjb2xvciBwcmV2aWV3IHRvIGRpc3BsYXkgLT4gbGV0J3MgcmVtb3ZlIGFueSBwcmV2aW91cyBiYWNrZ3JvdW5kIGltYWdlXHJcblx0XHRcdFx0YmFja2dyb3VuZHMucHVzaCh7XHJcblx0XHRcdFx0XHRpbWFnZTogJ25vbmUnLFxyXG5cdFx0XHRcdFx0cG9zaXRpb246ICdsZWZ0IHRvcCcsXHJcblx0XHRcdFx0XHRzaXplOiAnYXV0bycsXHJcblx0XHRcdFx0XHRyZXBlYXQ6ICduby1yZXBlYXQnLFxyXG5cdFx0XHRcdFx0b3JpZ2luOiAncGFkZGluZy1ib3gnLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIENTUyBncmFkaWVudCBmb3IgYmFja2dyb3VuZCBjb2xvciBwcmV2aWV3XHJcblx0XHRcdFx0YmFja2dyb3VuZHMucHVzaCh7XHJcblx0XHRcdFx0XHRpbWFnZToganNjLmdlbkNvbG9yUHJldmlld0dyYWRpZW50KFxyXG5cdFx0XHRcdFx0XHRjb2xvcixcclxuXHRcdFx0XHRcdFx0cG9zaXRpb24sXHJcblx0XHRcdFx0XHRcdHdpZHRoID8gd2lkdGggLSBqc2MucHViLnByZXZpZXdTZXBhcmF0b3IubGVuZ3RoIDogbnVsbFxyXG5cdFx0XHRcdFx0KSxcclxuXHRcdFx0XHRcdHBvc2l0aW9uOiAnbGVmdCB0b3AnLFxyXG5cdFx0XHRcdFx0c2l6ZTogJ2F1dG8nLFxyXG5cdFx0XHRcdFx0cmVwZWF0OiBwb3NpdGlvbiA/ICdyZXBlYXQteScgOiAncmVwZWF0JyxcclxuXHRcdFx0XHRcdG9yaWdpbjogJ3BhZGRpbmctYm94JyxcclxuXHRcdFx0XHR9KTtcclxuXHJcblx0XHRcdFx0Ly8gZGF0YSBVUkwgb2YgZ2VuZXJhdGVkIFBORyBpbWFnZSB3aXRoIGEgZ3JheSB0cmFuc3BhcmVuY3kgY2hlc3Nib2FyZFxyXG5cdFx0XHRcdHZhciBwcmV2aWV3ID0ganNjLmdlbkNvbG9yUHJldmlld0NhbnZhcyhcclxuXHRcdFx0XHRcdCdyZ2JhKDAsMCwwLDApJyxcclxuXHRcdFx0XHRcdHBvc2l0aW9uID8geydsZWZ0JzoncmlnaHQnLCAncmlnaHQnOidsZWZ0J31bcG9zaXRpb25dIDogbnVsbCxcclxuXHRcdFx0XHRcdHdpZHRoLFxyXG5cdFx0XHRcdFx0dHJ1ZVxyXG5cdFx0XHRcdCk7XHJcblx0XHRcdFx0YmFja2dyb3VuZHMucHVzaCh7XHJcblx0XHRcdFx0XHRpbWFnZTogJ3VybChcXCcnICsgcHJldmlldy5jYW52YXMudG9EYXRhVVJMKCkgKyAnXFwnKScsXHJcblx0XHRcdFx0XHRwb3NpdGlvbjogKHBvc2l0aW9uIHx8ICdsZWZ0JykgKyAnIHRvcCcsXHJcblx0XHRcdFx0XHRzaXplOiBwcmV2aWV3LndpZHRoICsgJ3B4ICcgKyBwcmV2aWV3LmhlaWdodCArICdweCcsXHJcblx0XHRcdFx0XHRyZXBlYXQ6IHBvc2l0aW9uID8gJ3JlcGVhdC15JyA6ICdyZXBlYXQnLFxyXG5cdFx0XHRcdFx0b3JpZ2luOiAncGFkZGluZy1ib3gnLFxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgYmcgPSB7XHJcblx0XHRcdFx0aW1hZ2U6IFtdLFxyXG5cdFx0XHRcdHBvc2l0aW9uOiBbXSxcclxuXHRcdFx0XHRzaXplOiBbXSxcclxuXHRcdFx0XHRyZXBlYXQ6IFtdLFxyXG5cdFx0XHRcdG9yaWdpbjogW10sXHJcblx0XHRcdH07XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYmFja2dyb3VuZHMubGVuZ3RoOyBpICs9IDEpIHtcclxuXHRcdFx0XHRiZy5pbWFnZS5wdXNoKGJhY2tncm91bmRzW2ldLmltYWdlKTtcclxuXHRcdFx0XHRiZy5wb3NpdGlvbi5wdXNoKGJhY2tncm91bmRzW2ldLnBvc2l0aW9uKTtcclxuXHRcdFx0XHRiZy5zaXplLnB1c2goYmFja2dyb3VuZHNbaV0uc2l6ZSk7XHJcblx0XHRcdFx0YmcucmVwZWF0LnB1c2goYmFja2dyb3VuZHNbaV0ucmVwZWF0KTtcclxuXHRcdFx0XHRiZy5vcmlnaW4ucHVzaChiYWNrZ3JvdW5kc1tpXS5vcmlnaW4pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBzZXQgcHJldmlld0VsZW1lbnQncyBiYWNrZ3JvdW5kLWltYWdlc1xyXG5cdFx0XHR2YXIgc3R5ID0ge1xyXG5cdFx0XHRcdCdiYWNrZ3JvdW5kLWltYWdlJzogYmcuaW1hZ2Uuam9pbignLCAnKSxcclxuXHRcdFx0XHQnYmFja2dyb3VuZC1wb3NpdGlvbic6IGJnLnBvc2l0aW9uLmpvaW4oJywgJyksXHJcblx0XHRcdFx0J2JhY2tncm91bmQtc2l6ZSc6IGJnLnNpemUuam9pbignLCAnKSxcclxuXHRcdFx0XHQnYmFja2dyb3VuZC1yZXBlYXQnOiBiZy5yZXBlYXQuam9pbignLCAnKSxcclxuXHRcdFx0XHQnYmFja2dyb3VuZC1vcmlnaW4nOiBiZy5vcmlnaW4uam9pbignLCAnKSxcclxuXHRcdFx0fTtcclxuXHRcdFx0anNjLnNldFN0eWxlKHRoaXMucHJldmlld0VsZW1lbnQsIHN0eSwgdGhpcy5mb3JjZVN0eWxlKTtcclxuXHJcblxyXG5cdFx0XHQvLyBzZXQvcmVzdG9yZSBwcmV2aWV3RWxlbWVudCdzIHBhZGRpbmdcclxuXHRcdFx0dmFyIHBhZGRpbmcgPSB7XHJcblx0XHRcdFx0bGVmdDogbnVsbCxcclxuXHRcdFx0XHRyaWdodDogbnVsbCxcclxuXHRcdFx0fTtcclxuXHRcdFx0aWYgKHBvc2l0aW9uKSB7XHJcblx0XHRcdFx0cGFkZGluZ1twb3NpdGlvbl0gPSAodGhpcy5wcmV2aWV3U2l6ZSArIHRoaXMucHJldmlld1BhZGRpbmcpICsgJ3B4JztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHN0eSA9IHtcclxuXHRcdFx0XHQncGFkZGluZy1sZWZ0JzogcGFkZGluZy5sZWZ0LFxyXG5cdFx0XHRcdCdwYWRkaW5nLXJpZ2h0JzogcGFkZGluZy5yaWdodCxcclxuXHRcdFx0fTtcclxuXHRcdFx0anNjLnNldFN0eWxlKHRoaXMucHJldmlld0VsZW1lbnQsIHN0eSwgdGhpcy5mb3JjZVN0eWxlLCB0cnVlKTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMuc2V0VmFsdWVFbGVtZW50VmFsdWUgPSBmdW5jdGlvbiAoc3RyKSB7XHJcblx0XHRcdGlmICh0aGlzLnZhbHVlRWxlbWVudCkge1xyXG5cdFx0XHRcdGlmIChqc2Mubm9kZU5hbWUodGhpcy52YWx1ZUVsZW1lbnQpID09PSAnaW5wdXQnKSB7XHJcblx0XHRcdFx0XHR0aGlzLnZhbHVlRWxlbWVudC52YWx1ZSA9IHN0cjtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy52YWx1ZUVsZW1lbnQuaW5uZXJIVE1MID0gc3RyO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0dGhpcy5zZXRBbHBoYUVsZW1lbnRWYWx1ZSA9IGZ1bmN0aW9uIChzdHIpIHtcclxuXHRcdFx0aWYgKHRoaXMuYWxwaGFFbGVtZW50KSB7XHJcblx0XHRcdFx0aWYgKGpzYy5ub2RlTmFtZSh0aGlzLmFscGhhRWxlbWVudCkgPT09ICdpbnB1dCcpIHtcclxuXHRcdFx0XHRcdHRoaXMuYWxwaGFFbGVtZW50LnZhbHVlID0gc3RyO1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmFscGhhRWxlbWVudC5pbm5lckhUTUwgPSBzdHI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cclxuXHJcblx0XHR0aGlzLl9wcm9jZXNzUGFyZW50RWxlbWVudHNJbkRPTSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHRoaXMuX2xpbmtlZEVsZW1lbnRzUHJvY2Vzc2VkKSB7IHJldHVybjsgfVxyXG5cdFx0XHR0aGlzLl9saW5rZWRFbGVtZW50c1Byb2Nlc3NlZCA9IHRydWU7XHJcblxyXG5cdFx0XHR2YXIgZWxtID0gdGhpcy50YXJnZXRFbGVtZW50O1xyXG5cdFx0XHRkbyB7XHJcblx0XHRcdFx0Ly8gSWYgdGhlIHRhcmdldCBlbGVtZW50IG9yIG9uZSBvZiBpdHMgcGFyZW50IG5vZGVzIGhhcyBmaXhlZCBwb3NpdGlvbixcclxuXHRcdFx0XHQvLyB0aGVuIHVzZSBmaXhlZCBwb3NpdGlvbmluZyBpbnN0ZWFkXHJcblx0XHRcdFx0dmFyIGNvbXBTdHlsZSA9IGpzYy5nZXRDb21wU3R5bGUoZWxtKTtcclxuXHRcdFx0XHRpZiAoY29tcFN0eWxlLnBvc2l0aW9uICYmIGNvbXBTdHlsZS5wb3NpdGlvbi50b0xvd2VyQ2FzZSgpID09PSAnZml4ZWQnKSB7XHJcblx0XHRcdFx0XHR0aGlzLmZpeGVkID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChlbG0gIT09IHRoaXMudGFyZ2V0RWxlbWVudCkge1xyXG5cdFx0XHRcdFx0Ly8gRW5zdXJlIHRvIGF0dGFjaCBvblBhcmVudFNjcm9sbCBvbmx5IG9uY2UgdG8gZWFjaCBwYXJlbnQgZWxlbWVudFxyXG5cdFx0XHRcdFx0Ly8gKG11bHRpcGxlIHRhcmdldEVsZW1lbnRzIGNhbiBzaGFyZSB0aGUgc2FtZSBwYXJlbnQgbm9kZXMpXHJcblx0XHRcdFx0XHQvL1xyXG5cdFx0XHRcdFx0Ly8gTm90ZTogSXQncyBub3QganVzdCBvZmZzZXRQYXJlbnRzIHRoYXQgY2FuIGJlIHNjcm9sbGFibGUsXHJcblx0XHRcdFx0XHQvLyB0aGF0J3Mgd2h5IHdlIGxvb3AgdGhyb3VnaCBhbGwgcGFyZW50IG5vZGVzXHJcblx0XHRcdFx0XHRpZiAoIWpzYy5nZXREYXRhKGVsbSwgJ2hhc1Njcm9sbExpc3RlbmVyJykpIHtcclxuXHRcdFx0XHRcdFx0ZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGpzYy5vblBhcmVudFNjcm9sbCwgZmFsc2UpO1xyXG5cdFx0XHRcdFx0XHRqc2Muc2V0RGF0YShlbG0sICdoYXNTY3JvbGxMaXN0ZW5lcicsIHRydWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSB3aGlsZSAoKGVsbSA9IGVsbS5wYXJlbnROb2RlKSAmJiBqc2Mubm9kZU5hbWUoZWxtKSAhPT0gJ2JvZHknKTtcclxuXHRcdH07XHJcblxyXG5cclxuXHRcdHRoaXMudHJ5SGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHRoaXMuaGlkZU9uTGVhdmUpIHtcclxuXHRcdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gc2V0T3B0aW9uIChvcHRpb24sIHZhbHVlKSB7XHJcblx0XHRcdGlmICh0eXBlb2Ygb3B0aW9uICE9PSAnc3RyaW5nJykge1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCB2YWx1ZSBmb3Igb3B0aW9uIG5hbWU6ICcgKyBvcHRpb24pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBlbnVtIG9wdGlvblxyXG5cdFx0XHRpZiAoanNjLmVudW1PcHRzLmhhc093blByb3BlcnR5KG9wdGlvbikpIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykgeyAvLyBlbnVtIHN0cmluZyB2YWx1ZXMgYXJlIGNhc2UgaW5zZW5zaXRpdmVcclxuXHRcdFx0XHRcdHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0aWYgKGpzYy5lbnVtT3B0c1tvcHRpb25dLmluZGV4T2YodmFsdWUpID09PSAtMSkge1xyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdPcHRpb24gXFwnJyArIG9wdGlvbiArICdcXCcgaGFzIGludmFsaWQgdmFsdWU6ICcgKyB2YWx1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBkZXByZWNhdGVkIG9wdGlvblxyXG5cdFx0XHRpZiAoanNjLmRlcHJlY2F0ZWRPcHRzLmhhc093blByb3BlcnR5KG9wdGlvbikpIHtcclxuXHRcdFx0XHR2YXIgb2xkT3B0ID0gb3B0aW9uO1xyXG5cdFx0XHRcdHZhciBuZXdPcHQgPSBqc2MuZGVwcmVjYXRlZE9wdHNbb3B0aW9uXTtcclxuXHRcdFx0XHRpZiAobmV3T3B0KSB7XHJcblx0XHRcdFx0XHQvLyBpZiB3ZSBoYXZlIGEgbmV3IG5hbWUgZm9yIHRoaXMgb3B0aW9uLCBsZXQncyBsb2cgYSB3YXJuaW5nIGFuZCB1c2UgdGhlIG5ldyBuYW1lXHJcblx0XHRcdFx0XHRjb25zb2xlLndhcm4oJ09wdGlvbiBcXCclc1xcJyBpcyBERVBSRUNBVEVELCB1c2luZyBcXCclc1xcJyBpbnN0ZWFkLicgKyBqc2MuZG9jc1JlZiwgb2xkT3B0LCBuZXdPcHQpO1xyXG5cdFx0XHRcdFx0b3B0aW9uID0gbmV3T3B0O1xyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHQvLyBuZXcgbmFtZSBub3QgYXZhaWxhYmxlIGZvciB0aGUgb3B0aW9uXHJcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbiBcXCcnICsgb3B0aW9uICsgJ1xcJyBpcyBERVBSRUNBVEVEJyk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIShvcHRpb24gaW4gVEhJUykpIHtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ1VucmVjb2duaXplZCBjb25maWd1cmF0aW9uIG9wdGlvbjogJyArIG9wdGlvbik7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdFRISVNbb3B0aW9uXSA9IHZhbHVlO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gZ2V0T3B0aW9uIChvcHRpb24pIHtcclxuXHRcdFx0Ly8gZGVwcmVjYXRlZCBvcHRpb25cclxuXHRcdFx0aWYgKGpzYy5kZXByZWNhdGVkT3B0cy5oYXNPd25Qcm9wZXJ0eShvcHRpb24pKSB7XHJcblx0XHRcdFx0dmFyIG9sZE9wdCA9IG9wdGlvbjtcclxuXHRcdFx0XHR2YXIgbmV3T3B0ID0ganNjLmRlcHJlY2F0ZWRPcHRzW29wdGlvbl07XHJcblx0XHRcdFx0aWYgKG5ld09wdCkge1xyXG5cdFx0XHRcdFx0Ly8gaWYgd2UgaGF2ZSBhIG5ldyBuYW1lIGZvciB0aGlzIG9wdGlvbiwgbGV0J3MgbG9nIGEgd2FybmluZyBhbmQgdXNlIHRoZSBuZXcgbmFtZVxyXG5cdFx0XHRcdFx0Y29uc29sZS53YXJuKCdPcHRpb24gXFwnJXNcXCcgaXMgREVQUkVDQVRFRCwgdXNpbmcgXFwnJXNcXCcgaW5zdGVhZC4nICsganNjLmRvY3NSZWYsIG9sZE9wdCwgbmV3T3B0KTtcclxuXHRcdFx0XHRcdG9wdGlvbiA9IG5ld09wdDtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0Ly8gbmV3IG5hbWUgbm90IGF2YWlsYWJsZSBmb3IgdGhlIG9wdGlvblxyXG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdPcHRpb24gXFwnJyArIG9wdGlvbiArICdcXCcgaXMgREVQUkVDQVRFRCcpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKCEob3B0aW9uIGluIFRISVMpKSB7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdVbnJlY29nbml6ZWQgY29uZmlndXJhdGlvbiBvcHRpb246ICcgKyBvcHRpb24pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gVEhJU1tvcHRpb25dO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBkZXRhY2hQaWNrZXIgKCkge1xyXG5cdFx0XHRqc2MucmVtb3ZlQ2xhc3MoVEhJUy50YXJnZXRFbGVtZW50LCBqc2MucHViLmFjdGl2ZUNsYXNzTmFtZSk7XHJcblx0XHRcdGpzYy5waWNrZXIud3JhcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGpzYy5waWNrZXIud3JhcCk7XHJcblx0XHRcdGRlbGV0ZSBqc2MucGlja2VyLm93bmVyO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBkcmF3UGlja2VyICgpIHtcclxuXHJcblx0XHRcdC8vIEF0IHRoaXMgcG9pbnQsIHdoZW4gZHJhd2luZyB0aGUgcGlja2VyLCB3ZSBrbm93IHdoYXQgdGhlIHBhcmVudCBlbGVtZW50cyBhcmVcclxuXHRcdFx0Ly8gYW5kIHdlIGNhbiBkbyBhbGwgcmVsYXRlZCBET00gb3BlcmF0aW9ucywgc3VjaCBhcyByZWdpc3RlcmluZyBldmVudHMgb24gdGhlbVxyXG5cdFx0XHQvLyBvciBjaGVja2luZyB0aGVpciBwb3NpdGlvbmluZ1xyXG5cdFx0XHRUSElTLl9wcm9jZXNzUGFyZW50RWxlbWVudHNJbkRPTSgpO1xyXG5cclxuXHRcdFx0aWYgKCFqc2MucGlja2VyKSB7XHJcblx0XHRcdFx0anNjLnBpY2tlciA9IHtcclxuXHRcdFx0XHRcdG93bmVyOiBudWxsLCAvLyBvd25lciBwaWNrZXIgaW5zdGFuY2VcclxuXHRcdFx0XHRcdHdyYXAgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLFxyXG5cdFx0XHRcdFx0Ym94IDoganNjLmNyZWF0ZUVsKCdkaXYnKSxcclxuXHRcdFx0XHRcdGJveFMgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBzaGFkb3cgYXJlYVxyXG5cdFx0XHRcdFx0Ym94QiA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIGJvcmRlclxyXG5cdFx0XHRcdFx0cGFkIDoganNjLmNyZWF0ZUVsKCdkaXYnKSxcclxuXHRcdFx0XHRcdHBhZEIgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBib3JkZXJcclxuXHRcdFx0XHRcdHBhZE0gOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBtb3VzZS90b3VjaCBhcmVhXHJcblx0XHRcdFx0XHRwYWRQYWwgOiBqc2MuY3JlYXRlUGFsZXR0ZSgpLFxyXG5cdFx0XHRcdFx0Y3Jvc3MgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLFxyXG5cdFx0XHRcdFx0Y3Jvc3NCWSA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIGJvcmRlciBZXHJcblx0XHRcdFx0XHRjcm9zc0JYIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gYm9yZGVyIFhcclxuXHRcdFx0XHRcdGNyb3NzTFkgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBsaW5lIFlcclxuXHRcdFx0XHRcdGNyb3NzTFggOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBsaW5lIFhcclxuXHRcdFx0XHRcdHNsZCA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIHNsaWRlclxyXG5cdFx0XHRcdFx0c2xkQiA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIGJvcmRlclxyXG5cdFx0XHRcdFx0c2xkTSA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIG1vdXNlL3RvdWNoIGFyZWFcclxuXHRcdFx0XHRcdHNsZEdyYWQgOiBqc2MuY3JlYXRlU2xpZGVyR3JhZGllbnQoKSxcclxuXHRcdFx0XHRcdHNsZFB0clMgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBzbGlkZXIgcG9pbnRlciBzcGFjZXJcclxuXHRcdFx0XHRcdHNsZFB0cklCIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyIHBvaW50ZXIgaW5uZXIgYm9yZGVyXHJcblx0XHRcdFx0XHRzbGRQdHJNQiA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIHNsaWRlciBwb2ludGVyIG1pZGRsZSBib3JkZXJcclxuXHRcdFx0XHRcdHNsZFB0ck9CIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyIHBvaW50ZXIgb3V0ZXIgYm9yZGVyXHJcblx0XHRcdFx0XHRhc2xkIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gYWxwaGEgc2xpZGVyXHJcblx0XHRcdFx0XHRhc2xkQiA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIGJvcmRlclxyXG5cdFx0XHRcdFx0YXNsZE0gOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBtb3VzZS90b3VjaCBhcmVhXHJcblx0XHRcdFx0XHRhc2xkR3JhZCA6IGpzYy5jcmVhdGVBU2xpZGVyR3JhZGllbnQoKSxcclxuXHRcdFx0XHRcdGFzbGRQdHJTIDoganNjLmNyZWF0ZUVsKCdkaXYnKSwgLy8gc2xpZGVyIHBvaW50ZXIgc3BhY2VyXHJcblx0XHRcdFx0XHRhc2xkUHRySUIgOiBqc2MuY3JlYXRlRWwoJ2RpdicpLCAvLyBzbGlkZXIgcG9pbnRlciBpbm5lciBib3JkZXJcclxuXHRcdFx0XHRcdGFzbGRQdHJNQiA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIHNsaWRlciBwb2ludGVyIG1pZGRsZSBib3JkZXJcclxuXHRcdFx0XHRcdGFzbGRQdHJPQiA6IGpzYy5jcmVhdGVFbCgnZGl2JyksIC8vIHNsaWRlciBwb2ludGVyIG91dGVyIGJvcmRlclxyXG5cdFx0XHRcdFx0YnRuIDoganNjLmNyZWF0ZUVsKCdkaXYnKSxcclxuXHRcdFx0XHRcdGJ0blQgOiBqc2MuY3JlYXRlRWwoJ3NwYW4nKSwgLy8gdGV4dFxyXG5cdFx0XHRcdH07XHJcblxyXG5cdFx0XHRcdGpzYy5waWNrZXIucGFkLmFwcGVuZENoaWxkKGpzYy5waWNrZXIucGFkUGFsLmVsbSk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5wYWRCLmFwcGVuZENoaWxkKGpzYy5waWNrZXIucGFkKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmNyb3NzLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuY3Jvc3NCWSk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5jcm9zcy5hcHBlbmRDaGlsZChqc2MucGlja2VyLmNyb3NzQlgpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuY3Jvc3MuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5jcm9zc0xZKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmNyb3NzLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuY3Jvc3NMWCk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5wYWRCLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuY3Jvc3MpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuYm94LmFwcGVuZENoaWxkKGpzYy5waWNrZXIucGFkQik7XHJcblx0XHRcdFx0anNjLnBpY2tlci5ib3guYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5wYWRNKTtcclxuXHJcblx0XHRcdFx0anNjLnBpY2tlci5zbGQuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5zbGRHcmFkLmVsbSk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5zbGRCLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuc2xkKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLnNsZEIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5zbGRQdHJPQik7XHJcblx0XHRcdFx0anNjLnBpY2tlci5zbGRQdHJPQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLnNsZFB0ck1CKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLnNsZFB0ck1CLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuc2xkUHRySUIpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuc2xkUHRySUIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5zbGRQdHJTKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmJveC5hcHBlbmRDaGlsZChqc2MucGlja2VyLnNsZEIpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuYm94LmFwcGVuZENoaWxkKGpzYy5waWNrZXIuc2xkTSk7XHJcblxyXG5cdFx0XHRcdGpzYy5waWNrZXIuYXNsZC5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGRHcmFkLmVsbSk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5hc2xkQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGQpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuYXNsZEIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5hc2xkUHRyT0IpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuYXNsZFB0ck9CLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYXNsZFB0ck1CKTtcclxuXHRcdFx0XHRqc2MucGlja2VyLmFzbGRQdHJNQi5hcHBlbmRDaGlsZChqc2MucGlja2VyLmFzbGRQdHJJQik7XHJcblx0XHRcdFx0anNjLnBpY2tlci5hc2xkUHRySUIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5hc2xkUHRyUyk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5ib3guYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5hc2xkQik7XHJcblx0XHRcdFx0anNjLnBpY2tlci5ib3guYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5hc2xkTSk7XHJcblxyXG5cdFx0XHRcdGpzYy5waWNrZXIuYnRuLmFwcGVuZENoaWxkKGpzYy5waWNrZXIuYnRuVCk7XHJcblx0XHRcdFx0anNjLnBpY2tlci5ib3guYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5idG4pO1xyXG5cclxuXHRcdFx0XHRqc2MucGlja2VyLmJveEIuYXBwZW5kQ2hpbGQoanNjLnBpY2tlci5ib3gpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIud3JhcC5hcHBlbmRDaGlsZChqc2MucGlja2VyLmJveFMpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIud3JhcC5hcHBlbmRDaGlsZChqc2MucGlja2VyLmJveEIpO1xyXG5cclxuXHRcdFx0XHRqc2MucGlja2VyLndyYXAuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGpzYy5vblBpY2tlclRvdWNoU3RhcnQsXHJcblx0XHRcdFx0XHRqc2MuaXNQYXNzaXZlRXZlbnRTdXBwb3J0ZWQgPyB7cGFzc2l2ZTogZmFsc2V9IDogZmFsc2UpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcCA9IGpzYy5waWNrZXI7XHJcblxyXG5cdFx0XHR2YXIgZGlzcGxheVNsaWRlciA9ICEhanNjLmdldFNsaWRlckNoYW5uZWwoVEhJUyk7XHJcblx0XHRcdHZhciBkaXNwbGF5QWxwaGFTbGlkZXIgPSBUSElTLmhhc0FscGhhQ2hhbm5lbCgpO1xyXG5cdFx0XHR2YXIgZGltcyA9IGpzYy5nZXRQaWNrZXJEaW1zKFRISVMpO1xyXG5cdFx0XHR2YXIgY3Jvc3NPdXRlclNpemUgPSAoMiAqIFRISVMucG9pbnRlckJvcmRlcldpZHRoICsgVEhJUy5wb2ludGVyVGhpY2tuZXNzICsgMiAqIFRISVMuY3Jvc3NTaXplKTtcclxuXHRcdFx0dmFyIGNvbnRyb2xQYWRkaW5nID0ganNjLmdldENvbnRyb2xQYWRkaW5nKFRISVMpO1xyXG5cdFx0XHR2YXIgYm9yZGVyUmFkaXVzID0gTWF0aC5taW4oXHJcblx0XHRcdFx0VEhJUy5ib3JkZXJSYWRpdXMsXHJcblx0XHRcdFx0TWF0aC5yb3VuZChUSElTLnBhZGRpbmcgKiBNYXRoLlBJKSk7IC8vIHB4XHJcblx0XHRcdHZhciBwYWRDdXJzb3IgPSAnY3Jvc3NoYWlyJztcclxuXHJcblx0XHRcdC8vIHdyYXBcclxuXHRcdFx0cC53cmFwLmNsYXNzTmFtZSA9ICdqc2NvbG9yLXBpY2tlci13cmFwJztcclxuXHRcdFx0cC53cmFwLnN0eWxlLmNsZWFyID0gJ2JvdGgnO1xyXG5cdFx0XHRwLndyYXAuc3R5bGUud2lkdGggPSAoZGltc1swXSArIDIgKiBUSElTLmJvcmRlcldpZHRoKSArICdweCc7XHJcblx0XHRcdHAud3JhcC5zdHlsZS5oZWlnaHQgPSAoZGltc1sxXSArIDIgKiBUSElTLmJvcmRlcldpZHRoKSArICdweCc7XHJcblx0XHRcdHAud3JhcC5zdHlsZS56SW5kZXggPSBUSElTLnpJbmRleDtcclxuXHJcblx0XHRcdC8vIHBpY2tlclxyXG5cdFx0XHRwLmJveC5jbGFzc05hbWUgPSAnanNjb2xvci1waWNrZXInO1xyXG5cdFx0XHRwLmJveC5zdHlsZS53aWR0aCA9IGRpbXNbMF0gKyAncHgnO1xyXG5cdFx0XHRwLmJveC5zdHlsZS5oZWlnaHQgPSBkaW1zWzFdICsgJ3B4JztcclxuXHRcdFx0cC5ib3guc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG5cclxuXHRcdFx0Ly8gcGlja2VyIHNoYWRvd1xyXG5cdFx0XHRwLmJveFMuY2xhc3NOYW1lID0gJ2pzY29sb3ItcGlja2VyLXNoYWRvdyc7XHJcblx0XHRcdHAuYm94Uy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuYm94Uy5zdHlsZS5sZWZ0ID0gJzAnO1xyXG5cdFx0XHRwLmJveFMuc3R5bGUudG9wID0gJzAnO1xyXG5cdFx0XHRwLmJveFMuc3R5bGUud2lkdGggPSAnMTAwJSc7XHJcblx0XHRcdHAuYm94Uy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XHJcblx0XHRcdGpzYy5zZXRCb3JkZXJSYWRpdXMocC5ib3hTLCBib3JkZXJSYWRpdXMgKyAncHgnKTtcclxuXHJcblx0XHRcdC8vIHBpY2tlciBib3JkZXJcclxuXHRcdFx0cC5ib3hCLmNsYXNzTmFtZSA9ICdqc2NvbG9yLXBpY2tlci1ib3JkZXInO1xyXG5cdFx0XHRwLmJveEIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG5cdFx0XHRwLmJveEIuc3R5bGUuYm9yZGVyID0gVEhJUy5ib3JkZXJXaWR0aCArICdweCBzb2xpZCc7XHJcblx0XHRcdHAuYm94Qi5zdHlsZS5ib3JkZXJDb2xvciA9IFRISVMuYm9yZGVyQ29sb3I7XHJcblx0XHRcdHAuYm94Qi5zdHlsZS5iYWNrZ3JvdW5kID0gVEhJUy5iYWNrZ3JvdW5kQ29sb3I7XHJcblx0XHRcdGpzYy5zZXRCb3JkZXJSYWRpdXMocC5ib3hCLCBib3JkZXJSYWRpdXMgKyAncHgnKTtcclxuXHJcblx0XHRcdC8vIElFIGhhY2s6XHJcblx0XHRcdC8vIElmIHRoZSBlbGVtZW50IGlzIHRyYW5zcGFyZW50LCBJRSB3aWxsIHRyaWdnZXIgdGhlIGV2ZW50IG9uIHRoZSBlbGVtZW50cyB1bmRlciBpdCxcclxuXHRcdFx0Ly8gZS5nLiBvbiBDYW52YXMgb3Igb24gZWxlbWVudHMgd2l0aCBib3JkZXJcclxuXHRcdFx0cC5wYWRNLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgyNTUsMCwwLC4yKSc7XHJcblx0XHRcdHAuc2xkTS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYmEoMCwyNTUsMCwuMiknO1xyXG5cdFx0XHRwLmFzbGRNLnN0eWxlLmJhY2tncm91bmQgPSAncmdiYSgwLDAsMjU1LC4yKSc7XHJcblxyXG5cdFx0XHRwLnBhZE0uc3R5bGUub3BhY2l0eSA9XHJcblx0XHRcdHAuc2xkTS5zdHlsZS5vcGFjaXR5ID1cclxuXHRcdFx0cC5hc2xkTS5zdHlsZS5vcGFjaXR5ID1cclxuXHRcdFx0XHQnMCc7XHJcblxyXG5cdFx0XHQvLyBwYWRcclxuXHRcdFx0cC5wYWQuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG5cdFx0XHRwLnBhZC5zdHlsZS53aWR0aCA9IFRISVMud2lkdGggKyAncHgnO1xyXG5cdFx0XHRwLnBhZC5zdHlsZS5oZWlnaHQgPSBUSElTLmhlaWdodCArICdweCc7XHJcblxyXG5cdFx0XHQvLyBwYWQgcGFsZXR0ZXMgKEhTViBhbmQgSFZTKVxyXG5cdFx0XHRwLnBhZFBhbC5kcmF3KFRISVMud2lkdGgsIFRISVMuaGVpZ2h0LCBqc2MuZ2V0UGFkWUNoYW5uZWwoVEhJUykpO1xyXG5cclxuXHRcdFx0Ly8gcGFkIGJvcmRlclxyXG5cdFx0XHRwLnBhZEIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLnBhZEIuc3R5bGUubGVmdCA9IFRISVMucGFkZGluZyArICdweCc7XHJcblx0XHRcdHAucGFkQi5zdHlsZS50b3AgPSBUSElTLnBhZGRpbmcgKyAncHgnO1xyXG5cdFx0XHRwLnBhZEIuc3R5bGUuYm9yZGVyID0gVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyAncHggc29saWQnO1xyXG5cdFx0XHRwLnBhZEIuc3R5bGUuYm9yZGVyQ29sb3IgPSBUSElTLmNvbnRyb2xCb3JkZXJDb2xvcjtcclxuXHJcblx0XHRcdC8vIHBhZCBtb3VzZSBhcmVhXHJcblx0XHRcdHAucGFkTS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAucGFkTS5zdHlsZS5sZWZ0ID0gMCArICdweCc7XHJcblx0XHRcdHAucGFkTS5zdHlsZS50b3AgPSAwICsgJ3B4JztcclxuXHRcdFx0cC5wYWRNLnN0eWxlLndpZHRoID0gKFRISVMucGFkZGluZyArIDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCArIFRISVMud2lkdGggKyBjb250cm9sUGFkZGluZykgKyAncHgnO1xyXG5cdFx0XHRwLnBhZE0uc3R5bGUuaGVpZ2h0ID0gKDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCArIDIgKiBUSElTLnBhZGRpbmcgKyBUSElTLmhlaWdodCkgKyAncHgnO1xyXG5cdFx0XHRwLnBhZE0uc3R5bGUuY3Vyc29yID0gcGFkQ3Vyc29yO1xyXG5cdFx0XHRqc2Muc2V0RGF0YShwLnBhZE0sIHtcclxuXHRcdFx0XHRpbnN0YW5jZTogVEhJUyxcclxuXHRcdFx0XHRjb250cm9sOiAncGFkJyxcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdC8vIHBhZCBjcm9zc1xyXG5cdFx0XHRwLmNyb3NzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0cC5jcm9zcy5zdHlsZS5sZWZ0ID1cclxuXHRcdFx0cC5jcm9zcy5zdHlsZS50b3AgPVxyXG5cdFx0XHRcdCcwJztcclxuXHRcdFx0cC5jcm9zcy5zdHlsZS53aWR0aCA9XHJcblx0XHRcdHAuY3Jvc3Muc3R5bGUuaGVpZ2h0ID1cclxuXHRcdFx0XHRjcm9zc091dGVyU2l6ZSArICdweCc7XHJcblxyXG5cdFx0XHQvLyBwYWQgY3Jvc3MgYm9yZGVyIFkgYW5kIFhcclxuXHRcdFx0cC5jcm9zc0JZLnN0eWxlLnBvc2l0aW9uID1cclxuXHRcdFx0cC5jcm9zc0JYLnN0eWxlLnBvc2l0aW9uID1cclxuXHRcdFx0XHQnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLmNyb3NzQlkuc3R5bGUuYmFja2dyb3VuZCA9XHJcblx0XHRcdHAuY3Jvc3NCWC5zdHlsZS5iYWNrZ3JvdW5kID1cclxuXHRcdFx0XHRUSElTLnBvaW50ZXJCb3JkZXJDb2xvcjtcclxuXHRcdFx0cC5jcm9zc0JZLnN0eWxlLndpZHRoID1cclxuXHRcdFx0cC5jcm9zc0JYLnN0eWxlLmhlaWdodCA9XHJcblx0XHRcdFx0KDIgKiBUSElTLnBvaW50ZXJCb3JkZXJXaWR0aCArIFRISVMucG9pbnRlclRoaWNrbmVzcykgKyAncHgnO1xyXG5cdFx0XHRwLmNyb3NzQlkuc3R5bGUuaGVpZ2h0ID1cclxuXHRcdFx0cC5jcm9zc0JYLnN0eWxlLndpZHRoID1cclxuXHRcdFx0XHRjcm9zc091dGVyU2l6ZSArICdweCc7XHJcblx0XHRcdHAuY3Jvc3NCWS5zdHlsZS5sZWZ0ID1cclxuXHRcdFx0cC5jcm9zc0JYLnN0eWxlLnRvcCA9XHJcblx0XHRcdFx0KE1hdGguZmxvb3IoY3Jvc3NPdXRlclNpemUgLyAyKSAtIE1hdGguZmxvb3IoVEhJUy5wb2ludGVyVGhpY2tuZXNzIC8gMikgLSBUSElTLnBvaW50ZXJCb3JkZXJXaWR0aCkgKyAncHgnO1xyXG5cdFx0XHRwLmNyb3NzQlkuc3R5bGUudG9wID1cclxuXHRcdFx0cC5jcm9zc0JYLnN0eWxlLmxlZnQgPVxyXG5cdFx0XHRcdCcwJztcclxuXHJcblx0XHRcdC8vIHBhZCBjcm9zcyBsaW5lIFkgYW5kIFhcclxuXHRcdFx0cC5jcm9zc0xZLnN0eWxlLnBvc2l0aW9uID1cclxuXHRcdFx0cC5jcm9zc0xYLnN0eWxlLnBvc2l0aW9uID1cclxuXHRcdFx0XHQnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLmNyb3NzTFkuc3R5bGUuYmFja2dyb3VuZCA9XHJcblx0XHRcdHAuY3Jvc3NMWC5zdHlsZS5iYWNrZ3JvdW5kID1cclxuXHRcdFx0XHRUSElTLnBvaW50ZXJDb2xvcjtcclxuXHRcdFx0cC5jcm9zc0xZLnN0eWxlLmhlaWdodCA9XHJcblx0XHRcdHAuY3Jvc3NMWC5zdHlsZS53aWR0aCA9XHJcblx0XHRcdFx0KGNyb3NzT3V0ZXJTaXplIC0gMiAqIFRISVMucG9pbnRlckJvcmRlcldpZHRoKSArICdweCc7XHJcblx0XHRcdHAuY3Jvc3NMWS5zdHlsZS53aWR0aCA9XHJcblx0XHRcdHAuY3Jvc3NMWC5zdHlsZS5oZWlnaHQgPVxyXG5cdFx0XHRcdFRISVMucG9pbnRlclRoaWNrbmVzcyArICdweCc7XHJcblx0XHRcdHAuY3Jvc3NMWS5zdHlsZS5sZWZ0ID1cclxuXHRcdFx0cC5jcm9zc0xYLnN0eWxlLnRvcCA9XHJcblx0XHRcdFx0KE1hdGguZmxvb3IoY3Jvc3NPdXRlclNpemUgLyAyKSAtIE1hdGguZmxvb3IoVEhJUy5wb2ludGVyVGhpY2tuZXNzIC8gMikpICsgJ3B4JztcclxuXHRcdFx0cC5jcm9zc0xZLnN0eWxlLnRvcCA9XHJcblx0XHRcdHAuY3Jvc3NMWC5zdHlsZS5sZWZ0ID1cclxuXHRcdFx0XHRUSElTLnBvaW50ZXJCb3JkZXJXaWR0aCArICdweCc7XHJcblxyXG5cclxuXHRcdFx0Ly8gc2xpZGVyXHJcblx0XHRcdHAuc2xkLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblx0XHRcdHAuc2xkLnN0eWxlLndpZHRoID0gVEhJUy5zbGlkZXJTaXplICsgJ3B4JztcclxuXHRcdFx0cC5zbGQuc3R5bGUuaGVpZ2h0ID0gVEhJUy5oZWlnaHQgKyAncHgnO1xyXG5cclxuXHRcdFx0Ly8gc2xpZGVyIGdyYWRpZW50XHJcblx0XHRcdHAuc2xkR3JhZC5kcmF3KFRISVMuc2xpZGVyU2l6ZSwgVEhJUy5oZWlnaHQsICcjMDAwJywgJyMwMDAnKTtcclxuXHJcblx0XHRcdC8vIHNsaWRlciBib3JkZXJcclxuXHRcdFx0cC5zbGRCLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5U2xpZGVyID8gJ2Jsb2NrJyA6ICdub25lJztcclxuXHRcdFx0cC5zbGRCLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0cC5zbGRCLnN0eWxlLmxlZnQgPSAoVEhJUy5wYWRkaW5nICsgVEhJUy53aWR0aCArIDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCArIDIgKiBjb250cm9sUGFkZGluZykgKyAncHgnO1xyXG5cdFx0XHRwLnNsZEIuc3R5bGUudG9wID0gVEhJUy5wYWRkaW5nICsgJ3B4JztcclxuXHRcdFx0cC5zbGRCLnN0eWxlLmJvcmRlciA9IFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgJ3B4IHNvbGlkJztcclxuXHRcdFx0cC5zbGRCLnN0eWxlLmJvcmRlckNvbG9yID0gVEhJUy5jb250cm9sQm9yZGVyQ29sb3I7XHJcblxyXG5cdFx0XHQvLyBzbGlkZXIgbW91c2UgYXJlYVxyXG5cdFx0XHRwLnNsZE0uc3R5bGUuZGlzcGxheSA9IGRpc3BsYXlTbGlkZXIgPyAnYmxvY2snIDogJ25vbmUnO1xyXG5cdFx0XHRwLnNsZE0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLnNsZE0uc3R5bGUubGVmdCA9IChUSElTLnBhZGRpbmcgKyBUSElTLndpZHRoICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgY29udHJvbFBhZGRpbmcpICsgJ3B4JztcclxuXHRcdFx0cC5zbGRNLnN0eWxlLnRvcCA9IDAgKyAncHgnO1xyXG5cdFx0XHRwLnNsZE0uc3R5bGUud2lkdGggPSAoXHJcblx0XHRcdFx0XHQoVEhJUy5zbGlkZXJTaXplICsgMiAqIGNvbnRyb2xQYWRkaW5nICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoKSArXHJcblx0XHRcdFx0XHQoZGlzcGxheUFscGhhU2xpZGVyID8gMCA6IE1hdGgubWF4KDAsIFRISVMucGFkZGluZyAtIGNvbnRyb2xQYWRkaW5nKSkgLy8gcmVtYWluaW5nIHBhZGRpbmcgdG8gdGhlIHJpZ2h0IGVkZ2VcclxuXHRcdFx0XHQpICsgJ3B4JztcclxuXHRcdFx0cC5zbGRNLnN0eWxlLmhlaWdodCA9ICgyICogVEhJUy5jb250cm9sQm9yZGVyV2lkdGggKyAyICogVEhJUy5wYWRkaW5nICsgVEhJUy5oZWlnaHQpICsgJ3B4JztcclxuXHRcdFx0cC5zbGRNLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcclxuXHRcdFx0anNjLnNldERhdGEocC5zbGRNLCB7XHJcblx0XHRcdFx0aW5zdGFuY2U6IFRISVMsXHJcblx0XHRcdFx0Y29udHJvbDogJ3NsZCcsXHJcblx0XHRcdH0pXHJcblxyXG5cdFx0XHQvLyBzbGlkZXIgcG9pbnRlciBpbm5lciBhbmQgb3V0ZXIgYm9yZGVyXHJcblx0XHRcdHAuc2xkUHRySUIuc3R5bGUuYm9yZGVyID1cclxuXHRcdFx0cC5zbGRQdHJPQi5zdHlsZS5ib3JkZXIgPVxyXG5cdFx0XHRcdFRISVMucG9pbnRlckJvcmRlcldpZHRoICsgJ3B4IHNvbGlkICcgKyBUSElTLnBvaW50ZXJCb3JkZXJDb2xvcjtcclxuXHJcblx0XHRcdC8vIHNsaWRlciBwb2ludGVyIG91dGVyIGJvcmRlclxyXG5cdFx0XHRwLnNsZFB0ck9CLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0cC5zbGRQdHJPQi5zdHlsZS5sZWZ0ID0gLSgyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyBUSElTLnBvaW50ZXJUaGlja25lc3MpICsgJ3B4JztcclxuXHRcdFx0cC5zbGRQdHJPQi5zdHlsZS50b3AgPSAnMCc7XHJcblxyXG5cdFx0XHQvLyBzbGlkZXIgcG9pbnRlciBtaWRkbGUgYm9yZGVyXHJcblx0XHRcdHAuc2xkUHRyTUIuc3R5bGUuYm9yZGVyID0gVEhJUy5wb2ludGVyVGhpY2tuZXNzICsgJ3B4IHNvbGlkICcgKyBUSElTLnBvaW50ZXJDb2xvcjtcclxuXHJcblx0XHRcdC8vIHNsaWRlciBwb2ludGVyIHNwYWNlclxyXG5cdFx0XHRwLnNsZFB0clMuc3R5bGUud2lkdGggPSBUSElTLnNsaWRlclNpemUgKyAncHgnO1xyXG5cdFx0XHRwLnNsZFB0clMuc3R5bGUuaGVpZ2h0ID0ganNjLnB1Yi5zbGlkZXJJbm5lclNwYWNlICsgJ3B4JztcclxuXHJcblxyXG5cdFx0XHQvLyBhbHBoYSBzbGlkZXJcclxuXHRcdFx0cC5hc2xkLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblx0XHRcdHAuYXNsZC5zdHlsZS53aWR0aCA9IFRISVMuc2xpZGVyU2l6ZSArICdweCc7XHJcblx0XHRcdHAuYXNsZC5zdHlsZS5oZWlnaHQgPSBUSElTLmhlaWdodCArICdweCc7XHJcblxyXG5cdFx0XHQvLyBhbHBoYSBzbGlkZXIgZ3JhZGllbnRcclxuXHRcdFx0cC5hc2xkR3JhZC5kcmF3KFRISVMuc2xpZGVyU2l6ZSwgVEhJUy5oZWlnaHQsICcjMDAwJyk7XHJcblxyXG5cdFx0XHQvLyBhbHBoYSBzbGlkZXIgYm9yZGVyXHJcblx0XHRcdHAuYXNsZEIuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXlBbHBoYVNsaWRlciA/ICdibG9jaycgOiAnbm9uZSc7XHJcblx0XHRcdHAuYXNsZEIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLmFzbGRCLnN0eWxlLmxlZnQgPSAoXHJcblx0XHRcdFx0XHQoVEhJUy5wYWRkaW5nICsgVEhJUy53aWR0aCArIDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCArIGNvbnRyb2xQYWRkaW5nKSArXHJcblx0XHRcdFx0XHQoZGlzcGxheVNsaWRlciA/IChUSElTLnNsaWRlclNpemUgKyAzICogY29udHJvbFBhZGRpbmcgKyAyICogVEhJUy5jb250cm9sQm9yZGVyV2lkdGgpIDogMClcclxuXHRcdFx0XHQpICsgJ3B4JztcclxuXHRcdFx0cC5hc2xkQi5zdHlsZS50b3AgPSBUSElTLnBhZGRpbmcgKyAncHgnO1xyXG5cdFx0XHRwLmFzbGRCLnN0eWxlLmJvcmRlciA9IFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgJ3B4IHNvbGlkJztcclxuXHRcdFx0cC5hc2xkQi5zdHlsZS5ib3JkZXJDb2xvciA9IFRISVMuY29udHJvbEJvcmRlckNvbG9yO1xyXG5cclxuXHRcdFx0Ly8gYWxwaGEgc2xpZGVyIG1vdXNlIGFyZWFcclxuXHRcdFx0cC5hc2xkTS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheUFscGhhU2xpZGVyID8gJ2Jsb2NrJyA6ICdub25lJztcclxuXHRcdFx0cC5hc2xkTS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XHJcblx0XHRcdHAuYXNsZE0uc3R5bGUubGVmdCA9IChcclxuXHRcdFx0XHRcdChUSElTLnBhZGRpbmcgKyBUSElTLndpZHRoICsgMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgY29udHJvbFBhZGRpbmcpICtcclxuXHRcdFx0XHRcdChkaXNwbGF5U2xpZGVyID8gKFRISVMuc2xpZGVyU2l6ZSArIDIgKiBjb250cm9sUGFkZGluZyArIDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCkgOiAwKVxyXG5cdFx0XHRcdCkgKyAncHgnO1xyXG5cdFx0XHRwLmFzbGRNLnN0eWxlLnRvcCA9IDAgKyAncHgnO1xyXG5cdFx0XHRwLmFzbGRNLnN0eWxlLndpZHRoID0gKFxyXG5cdFx0XHRcdFx0KFRISVMuc2xpZGVyU2l6ZSArIDIgKiBjb250cm9sUGFkZGluZyArIDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCkgK1xyXG5cdFx0XHRcdFx0TWF0aC5tYXgoMCwgVEhJUy5wYWRkaW5nIC0gY29udHJvbFBhZGRpbmcpIC8vIHJlbWFpbmluZyBwYWRkaW5nIHRvIHRoZSByaWdodCBlZGdlXHJcblx0XHRcdFx0KSArICdweCc7XHJcblx0XHRcdHAuYXNsZE0uc3R5bGUuaGVpZ2h0ID0gKDIgKiBUSElTLmNvbnRyb2xCb3JkZXJXaWR0aCArIDIgKiBUSElTLnBhZGRpbmcgKyBUSElTLmhlaWdodCkgKyAncHgnO1xyXG5cdFx0XHRwLmFzbGRNLnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcclxuXHRcdFx0anNjLnNldERhdGEocC5hc2xkTSwge1xyXG5cdFx0XHRcdGluc3RhbmNlOiBUSElTLFxyXG5cdFx0XHRcdGNvbnRyb2w6ICdhc2xkJyxcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdC8vIGFscGhhIHNsaWRlciBwb2ludGVyIGlubmVyIGFuZCBvdXRlciBib3JkZXJcclxuXHRcdFx0cC5hc2xkUHRySUIuc3R5bGUuYm9yZGVyID1cclxuXHRcdFx0cC5hc2xkUHRyT0Iuc3R5bGUuYm9yZGVyID1cclxuXHRcdFx0XHRUSElTLnBvaW50ZXJCb3JkZXJXaWR0aCArICdweCBzb2xpZCAnICsgVEhJUy5wb2ludGVyQm9yZGVyQ29sb3I7XHJcblxyXG5cdFx0XHQvLyBhbHBoYSBzbGlkZXIgcG9pbnRlciBvdXRlciBib3JkZXJcclxuXHRcdFx0cC5hc2xkUHRyT0Iuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cdFx0XHRwLmFzbGRQdHJPQi5zdHlsZS5sZWZ0ID0gLSgyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyBUSElTLnBvaW50ZXJUaGlja25lc3MpICsgJ3B4JztcclxuXHRcdFx0cC5hc2xkUHRyT0Iuc3R5bGUudG9wID0gJzAnO1xyXG5cclxuXHRcdFx0Ly8gYWxwaGEgc2xpZGVyIHBvaW50ZXIgbWlkZGxlIGJvcmRlclxyXG5cdFx0XHRwLmFzbGRQdHJNQi5zdHlsZS5ib3JkZXIgPSBUSElTLnBvaW50ZXJUaGlja25lc3MgKyAncHggc29saWQgJyArIFRISVMucG9pbnRlckNvbG9yO1xyXG5cclxuXHRcdFx0Ly8gYWxwaGEgc2xpZGVyIHBvaW50ZXIgc3BhY2VyXHJcblx0XHRcdHAuYXNsZFB0clMuc3R5bGUud2lkdGggPSBUSElTLnNsaWRlclNpemUgKyAncHgnO1xyXG5cdFx0XHRwLmFzbGRQdHJTLnN0eWxlLmhlaWdodCA9IGpzYy5wdWIuc2xpZGVySW5uZXJTcGFjZSArICdweCc7XHJcblxyXG5cclxuXHRcdFx0Ly8gdGhlIENsb3NlIGJ1dHRvblxyXG5cdFx0XHRmdW5jdGlvbiBzZXRCdG5Cb3JkZXIgKCkge1xyXG5cdFx0XHRcdHZhciBpbnNldENvbG9ycyA9IFRISVMuY29udHJvbEJvcmRlckNvbG9yLnNwbGl0KC9cXHMrLyk7XHJcblx0XHRcdFx0dmFyIG91dHNldENvbG9yID0gaW5zZXRDb2xvcnMubGVuZ3RoIDwgMiA/IGluc2V0Q29sb3JzWzBdIDogaW5zZXRDb2xvcnNbMV0gKyAnICcgKyBpbnNldENvbG9yc1swXSArICcgJyArIGluc2V0Q29sb3JzWzBdICsgJyAnICsgaW5zZXRDb2xvcnNbMV07XHJcblx0XHRcdFx0cC5idG4uc3R5bGUuYm9yZGVyQ29sb3IgPSBvdXRzZXRDb2xvcjtcclxuXHRcdFx0fVxyXG5cdFx0XHR2YXIgYnRuUGFkZGluZyA9IDE1OyAvLyBweFxyXG5cdFx0XHRwLmJ0bi5jbGFzc05hbWUgPSAnanNjb2xvci1idG4tY2xvc2UnO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS5kaXNwbGF5ID0gVEhJUy5jbG9zZUJ1dHRvbiA/ICdibG9jaycgOiAnbm9uZSc7XHJcblx0XHRcdHAuYnRuLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcclxuXHRcdFx0cC5idG4uc3R5bGUubGVmdCA9IFRISVMucGFkZGluZyArICdweCc7XHJcblx0XHRcdHAuYnRuLnN0eWxlLmJvdHRvbSA9IFRISVMucGFkZGluZyArICdweCc7XHJcblx0XHRcdHAuYnRuLnN0eWxlLnBhZGRpbmcgPSAnMCAnICsgYnRuUGFkZGluZyArICdweCc7XHJcblx0XHRcdHAuYnRuLnN0eWxlLm1heFdpZHRoID0gKGRpbXNbMF0gLSAyICogVEhJUy5wYWRkaW5nIC0gMiAqIFRISVMuY29udHJvbEJvcmRlcldpZHRoIC0gMiAqIGJ0blBhZGRpbmcpICsgJ3B4JztcclxuXHRcdFx0cC5idG4uc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHRcdFx0cC5idG4uc3R5bGUuaGVpZ2h0ID0gVEhJUy5idXR0b25IZWlnaHQgKyAncHgnO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS53aGl0ZVNwYWNlID0gJ25vd3JhcCc7XHJcblx0XHRcdHAuYnRuLnN0eWxlLmJvcmRlciA9IFRISVMuY29udHJvbEJvcmRlcldpZHRoICsgJ3B4IHNvbGlkJztcclxuXHRcdFx0c2V0QnRuQm9yZGVyKCk7XHJcblx0XHRcdHAuYnRuLnN0eWxlLmNvbG9yID0gVEhJUy5idXR0b25Db2xvcjtcclxuXHRcdFx0cC5idG4uc3R5bGUuZm9udCA9ICcxMnB4IHNhbnMtc2VyaWYnO1xyXG5cdFx0XHRwLmJ0bi5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJztcclxuXHRcdFx0cC5idG4uc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG5cdFx0XHRwLmJ0bi5vbm1vdXNlZG93biA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRUSElTLmhpZGUoKTtcclxuXHRcdFx0fTtcclxuXHRcdFx0cC5idG5ULnN0eWxlLmxpbmVIZWlnaHQgPSBUSElTLmJ1dHRvbkhlaWdodCArICdweCc7XHJcblx0XHRcdHAuYnRuVC5pbm5lckhUTUwgPSAnJztcclxuXHRcdFx0cC5idG5ULmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFRISVMuY2xvc2VUZXh0KSk7XHJcblxyXG5cdFx0XHQvLyByZXBvc2l0aW9uIHRoZSBwb2ludGVyc1xyXG5cdFx0XHRyZWRyYXdQYWQoKTtcclxuXHRcdFx0cmVkcmF3U2xkKCk7XHJcblx0XHRcdHJlZHJhd0FTbGQoKTtcclxuXHJcblx0XHRcdC8vIElmIHdlIGFyZSBjaGFuZ2luZyB0aGUgb3duZXIgd2l0aG91dCBmaXJzdCBjbG9zaW5nIHRoZSBwaWNrZXIsXHJcblx0XHRcdC8vIG1ha2Ugc3VyZSB0byBmaXJzdCBkZWFsIHdpdGggdGhlIG9sZCBvd25lclxyXG5cdFx0XHRpZiAoanNjLnBpY2tlci5vd25lciAmJiBqc2MucGlja2VyLm93bmVyICE9PSBUSElTKSB7XHJcblx0XHRcdFx0anNjLnJlbW92ZUNsYXNzKGpzYy5waWNrZXIub3duZXIudGFyZ2V0RWxlbWVudCwganNjLnB1Yi5hY3RpdmVDbGFzc05hbWUpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBTZXQgYSBuZXcgcGlja2VyIG93bmVyXHJcblx0XHRcdGpzYy5waWNrZXIub3duZXIgPSBUSElTO1xyXG5cclxuXHRcdFx0Ly8gVGhlIHJlZHJhd1Bvc2l0aW9uKCkgbWV0aG9kIG5lZWRzIHBpY2tlci5vd25lciB0byBiZSBzZXQsIHRoYXQncyB3aHkgd2UgY2FsbCBpdCBoZXJlLFxyXG5cdFx0XHQvLyBhZnRlciBzZXR0aW5nIHRoZSBvd25lclxyXG5cdFx0XHRpZiAoVEhJUy5jb250YWluZXIgPT09IGRvY3VtZW50LmJvZHkpIHtcclxuXHRcdFx0XHRqc2MucmVkcmF3UG9zaXRpb24oKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRqc2MuX2RyYXdQb3NpdGlvbihUSElTLCAwLCAwLCAncmVsYXRpdmUnLCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChwLndyYXAucGFyZW50Tm9kZSAhPT0gVEhJUy5jb250YWluZXIpIHtcclxuXHRcdFx0XHRUSElTLmNvbnRhaW5lci5hcHBlbmRDaGlsZChwLndyYXApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRqc2MuYWRkQ2xhc3MoVEhJUy50YXJnZXRFbGVtZW50LCBqc2MucHViLmFjdGl2ZUNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIHJlZHJhd1BhZCAoKSB7XHJcblx0XHRcdC8vIHJlZHJhdyB0aGUgcGFkIHBvaW50ZXJcclxuXHRcdFx0dmFyIHlDaGFubmVsID0ganNjLmdldFBhZFlDaGFubmVsKFRISVMpO1xyXG5cdFx0XHR2YXIgeCA9IE1hdGgucm91bmQoKFRISVMuY2hhbm5lbHMuaCAvIDM2MCkgKiAoVEhJUy53aWR0aCAtIDEpKTtcclxuXHRcdFx0dmFyIHkgPSBNYXRoLnJvdW5kKCgxIC0gVEhJUy5jaGFubmVsc1t5Q2hhbm5lbF0gLyAxMDApICogKFRISVMuaGVpZ2h0IC0gMSkpO1xyXG5cdFx0XHR2YXIgY3Jvc3NPdXRlclNpemUgPSAoMiAqIFRISVMucG9pbnRlckJvcmRlcldpZHRoICsgVEhJUy5wb2ludGVyVGhpY2tuZXNzICsgMiAqIFRISVMuY3Jvc3NTaXplKTtcclxuXHRcdFx0dmFyIG9mcyA9IC1NYXRoLmZsb29yKGNyb3NzT3V0ZXJTaXplIC8gMik7XHJcblx0XHRcdGpzYy5waWNrZXIuY3Jvc3Muc3R5bGUubGVmdCA9ICh4ICsgb2ZzKSArICdweCc7XHJcblx0XHRcdGpzYy5waWNrZXIuY3Jvc3Muc3R5bGUudG9wID0gKHkgKyBvZnMpICsgJ3B4JztcclxuXHJcblx0XHRcdC8vIHJlZHJhdyB0aGUgc2xpZGVyXHJcblx0XHRcdHN3aXRjaCAoanNjLmdldFNsaWRlckNoYW5uZWwoVEhJUykpIHtcclxuXHRcdFx0Y2FzZSAncyc6XHJcblx0XHRcdFx0dmFyIHJnYjEgPSBqc2MuSFNWX1JHQihUSElTLmNoYW5uZWxzLmgsIDEwMCwgVEhJUy5jaGFubmVscy52KTtcclxuXHRcdFx0XHR2YXIgcmdiMiA9IGpzYy5IU1ZfUkdCKFRISVMuY2hhbm5lbHMuaCwgMCwgVEhJUy5jaGFubmVscy52KTtcclxuXHRcdFx0XHR2YXIgY29sb3IxID0gJ3JnYignICtcclxuXHRcdFx0XHRcdE1hdGgucm91bmQocmdiMVswXSkgKyAnLCcgK1xyXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChyZ2IxWzFdKSArICcsJyArXHJcblx0XHRcdFx0XHRNYXRoLnJvdW5kKHJnYjFbMl0pICsgJyknO1xyXG5cdFx0XHRcdHZhciBjb2xvcjIgPSAncmdiKCcgK1xyXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChyZ2IyWzBdKSArICcsJyArXHJcblx0XHRcdFx0XHRNYXRoLnJvdW5kKHJnYjJbMV0pICsgJywnICtcclxuXHRcdFx0XHRcdE1hdGgucm91bmQocmdiMlsyXSkgKyAnKSc7XHJcblx0XHRcdFx0anNjLnBpY2tlci5zbGRHcmFkLmRyYXcoVEhJUy5zbGlkZXJTaXplLCBUSElTLmhlaWdodCwgY29sb3IxLCBjb2xvcjIpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRjYXNlICd2JzpcclxuXHRcdFx0XHR2YXIgcmdiID0ganNjLkhTVl9SR0IoVEhJUy5jaGFubmVscy5oLCBUSElTLmNoYW5uZWxzLnMsIDEwMCk7XHJcblx0XHRcdFx0dmFyIGNvbG9yMSA9ICdyZ2IoJyArXHJcblx0XHRcdFx0XHRNYXRoLnJvdW5kKHJnYlswXSkgKyAnLCcgK1xyXG5cdFx0XHRcdFx0TWF0aC5yb3VuZChyZ2JbMV0pICsgJywnICtcclxuXHRcdFx0XHRcdE1hdGgucm91bmQocmdiWzJdKSArICcpJztcclxuXHRcdFx0XHR2YXIgY29sb3IyID0gJyMwMDAnO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuc2xkR3JhZC5kcmF3KFRISVMuc2xpZGVyU2l6ZSwgVEhJUy5oZWlnaHQsIGNvbG9yMSwgY29sb3IyKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gcmVkcmF3IHRoZSBhbHBoYSBzbGlkZXJcclxuXHRcdFx0anNjLnBpY2tlci5hc2xkR3JhZC5kcmF3KFRISVMuc2xpZGVyU2l6ZSwgVEhJUy5oZWlnaHQsIFRISVMudG9IRVhTdHJpbmcoKSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIHJlZHJhd1NsZCAoKSB7XHJcblx0XHRcdHZhciBzbGRDaGFubmVsID0ganNjLmdldFNsaWRlckNoYW5uZWwoVEhJUyk7XHJcblx0XHRcdGlmIChzbGRDaGFubmVsKSB7XHJcblx0XHRcdFx0Ly8gcmVkcmF3IHRoZSBzbGlkZXIgcG9pbnRlclxyXG5cdFx0XHRcdHZhciB5ID0gTWF0aC5yb3VuZCgoMSAtIFRISVMuY2hhbm5lbHNbc2xkQ2hhbm5lbF0gLyAxMDApICogKFRISVMuaGVpZ2h0IC0gMSkpO1xyXG5cdFx0XHRcdGpzYy5waWNrZXIuc2xkUHRyT0Iuc3R5bGUudG9wID0gKHkgLSAoMiAqIFRISVMucG9pbnRlckJvcmRlcldpZHRoICsgVEhJUy5wb2ludGVyVGhpY2tuZXNzKSAtIE1hdGguZmxvb3IoanNjLnB1Yi5zbGlkZXJJbm5lclNwYWNlIC8gMikpICsgJ3B4JztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gcmVkcmF3IHRoZSBhbHBoYSBzbGlkZXJcclxuXHRcdFx0anNjLnBpY2tlci5hc2xkR3JhZC5kcmF3KFRISVMuc2xpZGVyU2l6ZSwgVEhJUy5oZWlnaHQsIFRISVMudG9IRVhTdHJpbmcoKSk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGZ1bmN0aW9uIHJlZHJhd0FTbGQgKCkge1xyXG5cdFx0XHR2YXIgeSA9IE1hdGgucm91bmQoKDEgLSBUSElTLmNoYW5uZWxzLmEpICogKFRISVMuaGVpZ2h0IC0gMSkpO1xyXG5cdFx0XHRqc2MucGlja2VyLmFzbGRQdHJPQi5zdHlsZS50b3AgPSAoeSAtICgyICogVEhJUy5wb2ludGVyQm9yZGVyV2lkdGggKyBUSElTLnBvaW50ZXJUaGlja25lc3MpIC0gTWF0aC5mbG9vcihqc2MucHViLnNsaWRlcklubmVyU3BhY2UgLyAyKSkgKyAncHgnO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBpc1BpY2tlck93bmVyICgpIHtcclxuXHRcdFx0cmV0dXJuIGpzYy5waWNrZXIgJiYganNjLnBpY2tlci5vd25lciA9PT0gVEhJUztcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gb25WYWx1ZUtleURvd24gKGV2KSB7XHJcblx0XHRcdGlmIChqc2MuZXZlbnRLZXkoZXYpID09PSAnRW50ZXInKSB7XHJcblx0XHRcdFx0aWYgKFRISVMudmFsdWVFbGVtZW50KSB7XHJcblx0XHRcdFx0XHRUSElTLnByb2Nlc3NWYWx1ZUlucHV0KFRISVMudmFsdWVFbGVtZW50LnZhbHVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0VEhJUy50cnlIaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gb25BbHBoYUtleURvd24gKGV2KSB7XHJcblx0XHRcdGlmIChqc2MuZXZlbnRLZXkoZXYpID09PSAnRW50ZXInKSB7XHJcblx0XHRcdFx0aWYgKFRISVMuYWxwaGFFbGVtZW50KSB7XHJcblx0XHRcdFx0XHRUSElTLnByb2Nlc3NBbHBoYUlucHV0KFRISVMuYWxwaGFFbGVtZW50LnZhbHVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0VEhJUy50cnlIaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gb25WYWx1ZUNoYW5nZSAoZXYpIHtcclxuXHRcdFx0aWYgKGpzYy5nZXREYXRhKGV2LCAnaW50ZXJuYWwnKSkge1xyXG5cdFx0XHRcdHJldHVybjsgLy8gc2tpcCBpZiB0aGUgZXZlbnQgd2FzIGludGVybmFsbHkgdHJpZ2dlcmVkIGJ5IGpzY29sb3JcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIG9sZFZhbCA9IFRISVMudmFsdWVFbGVtZW50LnZhbHVlO1xyXG5cclxuXHRcdFx0VEhJUy5wcm9jZXNzVmFsdWVJbnB1dChUSElTLnZhbHVlRWxlbWVudC52YWx1ZSk7IC8vIHRoaXMgbWlnaHQgY2hhbmdlIHRoZSB2YWx1ZVxyXG5cclxuXHRcdFx0anNjLnRyaWdnZXJDYWxsYmFjayhUSElTLCAnb25DaGFuZ2UnKTtcclxuXHJcblx0XHRcdGlmIChUSElTLnZhbHVlRWxlbWVudC52YWx1ZSAhPT0gb2xkVmFsKSB7XHJcblx0XHRcdFx0Ly8gdmFsdWUgd2FzIGFkZGl0aW9uYWxseSBjaGFuZ2VkIC0+IGxldCdzIHRyaWdnZXIgdGhlIGNoYW5nZSBldmVudCBhZ2FpbiwgZXZlbiB0aG91Z2ggaXQgd2FzIG5hdGl2ZWx5IGRpc3BhdGNoZWRcclxuXHRcdFx0XHRqc2MudHJpZ2dlcklucHV0RXZlbnQoVEhJUy52YWx1ZUVsZW1lbnQsICdjaGFuZ2UnLCB0cnVlLCB0cnVlKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRmdW5jdGlvbiBvbkFscGhhQ2hhbmdlIChldikge1xyXG5cdFx0XHRpZiAoanNjLmdldERhdGEoZXYsICdpbnRlcm5hbCcpKSB7XHJcblx0XHRcdFx0cmV0dXJuOyAvLyBza2lwIGlmIHRoZSBldmVudCB3YXMgaW50ZXJuYWxseSB0cmlnZ2VyZWQgYnkganNjb2xvclxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgb2xkVmFsID0gVEhJUy5hbHBoYUVsZW1lbnQudmFsdWU7XHJcblxyXG5cdFx0XHRUSElTLnByb2Nlc3NBbHBoYUlucHV0KFRISVMuYWxwaGFFbGVtZW50LnZhbHVlKTsgLy8gdGhpcyBtaWdodCBjaGFuZ2UgdGhlIHZhbHVlXHJcblxyXG5cdFx0XHRqc2MudHJpZ2dlckNhbGxiYWNrKFRISVMsICdvbkNoYW5nZScpO1xyXG5cclxuXHRcdFx0Ly8gdHJpZ2dlcmluZyB2YWx1ZUVsZW1lbnQncyBvbkNoYW5nZSAoYmVjYXVzZSBjaGFuZ2luZyBhbHBoYSBjaGFuZ2VzIHRoZSBlbnRpcmUgY29sb3IsIGUuZy4gd2l0aCByZ2JhIGZvcm1hdClcclxuXHRcdFx0anNjLnRyaWdnZXJJbnB1dEV2ZW50KFRISVMudmFsdWVFbGVtZW50LCAnY2hhbmdlJywgdHJ1ZSwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRpZiAoVEhJUy5hbHBoYUVsZW1lbnQudmFsdWUgIT09IG9sZFZhbCkge1xyXG5cdFx0XHRcdC8vIHZhbHVlIHdhcyBhZGRpdGlvbmFsbHkgY2hhbmdlZCAtPiBsZXQncyB0cmlnZ2VyIHRoZSBjaGFuZ2UgZXZlbnQgYWdhaW4sIGV2ZW4gdGhvdWdoIGl0IHdhcyBuYXRpdmVseSBkaXNwYXRjaGVkXHJcblx0XHRcdFx0anNjLnRyaWdnZXJJbnB1dEV2ZW50KFRISVMuYWxwaGFFbGVtZW50LCAnY2hhbmdlJywgdHJ1ZSwgdHJ1ZSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gb25WYWx1ZUlucHV0IChldikge1xyXG5cdFx0XHRpZiAoanNjLmdldERhdGEoZXYsICdpbnRlcm5hbCcpKSB7XHJcblx0XHRcdFx0cmV0dXJuOyAvLyBza2lwIGlmIHRoZSBldmVudCB3YXMgaW50ZXJuYWxseSB0cmlnZ2VyZWQgYnkganNjb2xvclxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoVEhJUy52YWx1ZUVsZW1lbnQpIHtcclxuXHRcdFx0XHRUSElTLmZyb21TdHJpbmcoVEhJUy52YWx1ZUVsZW1lbnQudmFsdWUsIGpzYy5mbGFncy5sZWF2ZVZhbHVlKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0anNjLnRyaWdnZXJDYWxsYmFjayhUSElTLCAnb25JbnB1dCcpO1xyXG5cclxuXHRcdFx0Ly8gdHJpZ2dlcmluZyB2YWx1ZUVsZW1lbnQncyBvbklucHV0XHJcblx0XHRcdC8vIChub3QgbmVlZGVkLCBpdCB3YXMgZGlzcGF0Y2hlZCBub3JtYWxseSBieSB0aGUgYnJvd3NlcilcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0ZnVuY3Rpb24gb25BbHBoYUlucHV0IChldikge1xyXG5cdFx0XHRpZiAoanNjLmdldERhdGEoZXYsICdpbnRlcm5hbCcpKSB7XHJcblx0XHRcdFx0cmV0dXJuOyAvLyBza2lwIGlmIHRoZSBldmVudCB3YXMgaW50ZXJuYWxseSB0cmlnZ2VyZWQgYnkganNjb2xvclxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoVEhJUy5hbHBoYUVsZW1lbnQpIHtcclxuXHRcdFx0XHRUSElTLmZyb21IU1ZBKG51bGwsIG51bGwsIG51bGwsIHBhcnNlRmxvYXQoVEhJUy5hbHBoYUVsZW1lbnQudmFsdWUpLCBqc2MuZmxhZ3MubGVhdmVBbHBoYSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGpzYy50cmlnZ2VyQ2FsbGJhY2soVEhJUywgJ29uSW5wdXQnKTtcclxuXHJcblx0XHRcdC8vIHRyaWdnZXJpbmcgdmFsdWVFbGVtZW50J3Mgb25JbnB1dCAoYmVjYXVzZSBjaGFuZ2luZyBhbHBoYSBjaGFuZ2VzIHRoZSBlbnRpcmUgY29sb3IsIGUuZy4gd2l0aCByZ2JhIGZvcm1hdClcclxuXHRcdFx0anNjLnRyaWdnZXJJbnB1dEV2ZW50KFRISVMudmFsdWVFbGVtZW50LCAnaW5wdXQnLCB0cnVlLCB0cnVlKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Ly9cclxuXHRcdC8vIEluc3RhbGwgdGhlIGNvbG9yIHBpY2tlciBvbiBjaG9zZW4gZWxlbWVudChzKVxyXG5cdFx0Ly9cclxuXHJcblxyXG5cdFx0Ly8gRGV0ZXJtaW5lIHBpY2tlcidzIGNvbnRhaW5lciBlbGVtZW50XHJcblx0XHRpZiAodGhpcy5jb250YWluZXIgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LmJvZHk7IC8vIGRlZmF1bHQgY29udGFpbmVyIGlzIEJPRFkgZWxlbWVudFxyXG5cclxuXHRcdH0gZWxzZSB7IC8vIGV4cGxpY2l0bHkgc2V0IHRvIGN1c3RvbSBlbGVtZW50XHJcblx0XHRcdHRoaXMuY29udGFpbmVyID0ganNjLm5vZGUodGhpcy5jb250YWluZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5jb250YWluZXIpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW5zdGFudGlhdGUgY29sb3IgcGlja2VyIHdpdGhvdXQgYSBjb250YWluZXIgZWxlbWVudCcpO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHQvLyBGZXRjaCB0aGUgdGFyZ2V0IGVsZW1lbnRcclxuXHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IGpzYy5ub2RlKHRhcmdldEVsZW1lbnQpO1xyXG5cclxuXHRcdGlmICghdGhpcy50YXJnZXRFbGVtZW50KSB7XHJcblx0XHRcdC8vIHRlbXBvcmFyaWx5IGN1c3RvbWl6ZWQgZXJyb3IgbWVzc2FnZSB0byBoZWxwIHdpdGggbWlncmF0aW5nIGZyb20gdmVyc2lvbnMgcHJpb3IgdG8gMi4yXHJcblx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0RWxlbWVudCA9PT0gJ3N0cmluZycgJiYgL15bYS16QS1aXVtcXHc6Li1dKiQvLnRlc3QodGFyZ2V0RWxlbWVudCkpIHtcclxuXHRcdFx0XHQvLyB0YXJnZXRFbGVtZW50IGxvb2tzIGxpa2UgdmFsaWQgSURcclxuXHRcdFx0XHR2YXIgcG9zc2libHlJZCA9IHRhcmdldEVsZW1lbnQ7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdJZiBcXCcnICsgcG9zc2libHlJZCArICdcXCcgaXMgc3VwcG9zZWQgdG8gYmUgYW4gSUQsIHBsZWFzZSB1c2UgXFwnIycgKyBwb3NzaWJseUlkICsgJ1xcJyBvciBhbnkgdmFsaWQgQ1NTIHNlbGVjdG9yLicpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbnN0YW50aWF0ZSBjb2xvciBwaWNrZXIgd2l0aG91dCBhIHRhcmdldCBlbGVtZW50Jyk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHRoaXMudGFyZ2V0RWxlbWVudC5qc2NvbG9yICYmIHRoaXMudGFyZ2V0RWxlbWVudC5qc2NvbG9yIGluc3RhbmNlb2YganNjLnB1Yikge1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0NvbG9yIHBpY2tlciBhbHJlYWR5IGluc3RhbGxlZCBvbiB0aGlzIGVsZW1lbnQnKTtcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0Ly8gbGluayB0aGlzIGluc3RhbmNlIHdpdGggdGhlIHRhcmdldCBlbGVtZW50XHJcblx0XHR0aGlzLnRhcmdldEVsZW1lbnQuanNjb2xvciA9IHRoaXM7XHJcblx0XHRqc2MuYWRkQ2xhc3ModGhpcy50YXJnZXRFbGVtZW50LCBqc2MucHViLmNsYXNzTmFtZSk7XHJcblxyXG5cdFx0Ly8gcmVnaXN0ZXIgdGhpcyBpbnN0YW5jZVxyXG5cdFx0anNjLmluc3RhbmNlcy5wdXNoKHRoaXMpO1xyXG5cclxuXHJcblx0XHQvLyBpZiB0YXJnZXQgaXMgQlVUVE9OXHJcblx0XHRpZiAoanNjLmlzQnV0dG9uKHRoaXMudGFyZ2V0RWxlbWVudCkpIHtcclxuXHJcblx0XHRcdGlmICh0aGlzLnRhcmdldEVsZW1lbnQudHlwZS50b0xvd2VyQ2FzZSgpICE9PSAnYnV0dG9uJykge1xyXG5cdFx0XHRcdC8vIG9uIGJ1dHRvbnMsIGFsd2F5cyBmb3JjZSB0eXBlIHRvIGJlICdidXR0b24nLCBlLmcuIGluIHNpdHVhdGlvbnMgdGhlIHRhcmdldCA8YnV0dG9uPiBoYXMgbm8gdHlwZVxyXG5cdFx0XHRcdC8vIGFuZCB0aHVzIGRlZmF1bHRzIHRvICdzdWJtaXQnIGFuZCB3b3VsZCBzdWJtaXQgdGhlIGZvcm0gd2hlbiBjbGlja2VkXHJcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50LnR5cGUgPSAnYnV0dG9uJztcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKGpzYy5pc0J1dHRvbkVtcHR5KHRoaXMudGFyZ2V0RWxlbWVudCkpIHsgLy8gZW1wdHkgYnV0dG9uXHJcblx0XHRcdFx0Ly8gaXQgaXMgaW1wb3J0YW50IHRvIGNsZWFyIGVsZW1lbnQncyBjb250ZW50cyBmaXJzdC5cclxuXHRcdFx0XHQvLyBpZiB3ZSdyZSByZS1pbnN0YW50aWF0aW5nIGNvbG9yIHBpY2tlcnMgb24gRE9NIHRoYXQgaGFzIGJlZW4gbW9kaWZpZWQgYnkgY2hhbmdpbmcgcGFnZSdzIGlubmVySFRNTCxcclxuXHRcdFx0XHQvLyB3ZSB3b3VsZCBrZWVwIGFkZGluZyBtb3JlIG5vbi1icmVha2luZyBzcGFjZXMgdG8gZWxlbWVudCdzIGNvbnRlbnQgKGJlY2F1c2UgZWxlbWVudCdzIGNvbnRlbnRzIHN1cnZpdmVcclxuXHRcdFx0XHQvLyBpbm5lckhUTUwgY2hhbmdlcywgYnV0IHBpY2tlciBpbnN0YW5jZXMgZG9uJ3QpXHJcblx0XHRcdFx0anNjLnJlbW92ZUNoaWxkcmVuKHRoaXMudGFyZ2V0RWxlbWVudCk7XHJcblxyXG5cdFx0XHRcdC8vIGxldCdzIGluc2VydCBhIG5vbi1icmVha2luZyBzcGFjZVxyXG5cdFx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnXFx4YTAnKSk7XHJcblxyXG5cdFx0XHRcdC8vIHNldCBtaW4td2lkdGggPSBwcmV2aWV3U2l6ZSwgaWYgbm90IGFscmVhZHkgZ3JlYXRlclxyXG5cdFx0XHRcdHZhciBjb21wU3R5bGUgPSBqc2MuZ2V0Q29tcFN0eWxlKHRoaXMudGFyZ2V0RWxlbWVudCk7XHJcblx0XHRcdFx0dmFyIGN1cnJNaW5XaWR0aCA9IHBhcnNlRmxvYXQoY29tcFN0eWxlWydtaW4td2lkdGgnXSkgfHwgMDtcclxuXHRcdFx0XHRpZiAoY3Vyck1pbldpZHRoIDwgdGhpcy5wcmV2aWV3U2l6ZSkge1xyXG5cdFx0XHRcdFx0anNjLnNldFN0eWxlKHRoaXMudGFyZ2V0RWxlbWVudCwge1xyXG5cdFx0XHRcdFx0XHQnbWluLXdpZHRoJzogdGhpcy5wcmV2aWV3U2l6ZSArICdweCcsXHJcblx0XHRcdFx0XHR9LCB0aGlzLmZvcmNlU3R5bGUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgdmFsdWUgZWxlbWVudFxyXG5cdFx0aWYgKHRoaXMudmFsdWVFbGVtZW50ID09PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0aWYgKGpzYy5pc1RleHRJbnB1dCh0aGlzLnRhcmdldEVsZW1lbnQpKSB7XHJcblx0XHRcdFx0Ly8gZm9yIHRleHQgaW5wdXRzLCBkZWZhdWx0IHZhbHVlRWxlbWVudCBpcyB0YXJnZXRFbGVtZW50XHJcblx0XHRcdFx0dGhpcy52YWx1ZUVsZW1lbnQgPSB0aGlzLnRhcmdldEVsZW1lbnQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gbGVhdmUgaXQgdW5kZWZpbmVkXHJcblx0XHRcdH1cclxuXHJcblx0XHR9IGVsc2UgaWYgKHRoaXMudmFsdWVFbGVtZW50ID09PSBudWxsKSB7IC8vIGV4cGxpY2l0bHkgc2V0IHRvIG51bGxcclxuXHRcdFx0Ly8gbGVhdmUgaXQgbnVsbFxyXG5cclxuXHRcdH0gZWxzZSB7IC8vIGV4cGxpY2l0bHkgc2V0IHRvIGN1c3RvbSBlbGVtZW50XHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50ID0ganNjLm5vZGUodGhpcy52YWx1ZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgYWxwaGEgZWxlbWVudFxyXG5cdFx0aWYgKHRoaXMuYWxwaGFFbGVtZW50KSB7XHJcblx0XHRcdHRoaXMuYWxwaGFFbGVtZW50ID0ganNjLm5vZGUodGhpcy5hbHBoYUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIERldGVybWluZSB0aGUgcHJldmlldyBlbGVtZW50XHJcblx0XHRpZiAodGhpcy5wcmV2aWV3RWxlbWVudCA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMucHJldmlld0VsZW1lbnQgPSB0aGlzLnRhcmdldEVsZW1lbnQ7IC8vIGRlZmF1bHQgcHJldmlld0VsZW1lbnQgaXMgdGFyZ2V0RWxlbWVudFxyXG5cclxuXHRcdH0gZWxzZSBpZiAodGhpcy5wcmV2aWV3RWxlbWVudCA9PT0gbnVsbCkgeyAvLyBleHBsaWNpdGx5IHNldCB0byBudWxsXHJcblx0XHRcdC8vIGxlYXZlIGl0IG51bGxcclxuXHJcblx0XHR9IGVsc2UgeyAvLyBleHBsaWNpdGx5IHNldCB0byBjdXN0b20gZWxlbWVudFxyXG5cdFx0XHR0aGlzLnByZXZpZXdFbGVtZW50ID0ganNjLm5vZGUodGhpcy5wcmV2aWV3RWxlbWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gdmFsdWVFbGVtZW50XHJcblx0XHRpZiAodGhpcy52YWx1ZUVsZW1lbnQgJiYganNjLmlzVGV4dElucHV0KHRoaXMudmFsdWVFbGVtZW50KSkge1xyXG5cclxuXHRcdFx0Ly8gSWYgdGhlIHZhbHVlIGVsZW1lbnQgaGFzIG9uSW5wdXQgZXZlbnQgYWxyZWFkeSBzZXQsIHdlIG5lZWQgdG8gZGV0YWNoIGl0IGFuZCBhdHRhY2ggQUZURVIgb3VyIGxpc3RlbmVyLlxyXG5cdFx0XHQvLyBvdGhlcndpc2UgdGhlIHBpY2tlciBpbnN0YW5jZSB3b3VsZCBzdGlsbCBjb250YWluIHRoZSBvbGQgY29sb3Igd2hlbiBhY2Nlc3NlZCBmcm9tIHRoZSBvbklucHV0IGhhbmRsZXIuXHJcblx0XHRcdHZhciB2YWx1ZUVsZW1lbnRPcmlnRXZlbnRzID0ge1xyXG5cdFx0XHRcdG9uSW5wdXQ6IHRoaXMudmFsdWVFbGVtZW50Lm9uaW5wdXRcclxuXHRcdFx0fTtcclxuXHRcdFx0dGhpcy52YWx1ZUVsZW1lbnQub25pbnB1dCA9IG51bGw7XHJcblxyXG5cdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25WYWx1ZUtleURvd24sIGZhbHNlKTtcclxuXHRcdFx0dGhpcy52YWx1ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25WYWx1ZUNoYW5nZSwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVmFsdWVJbnB1dCwgZmFsc2UpO1xyXG5cdFx0XHQvLyB0aGUgb3JpZ2luYWwgZXZlbnQgbGlzdGVuZXIgbXVzdCBiZSBhdHRhY2hlZCBBRlRFUiBvdXIgaGFuZGxlciAodG8gbGV0IGl0IGZpcnN0IHNldCBwaWNrZXIncyBjb2xvcilcclxuXHRcdFx0aWYgKHZhbHVlRWxlbWVudE9yaWdFdmVudHMub25JbnB1dCkge1xyXG5cdFx0XHRcdHRoaXMudmFsdWVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdmFsdWVFbGVtZW50T3JpZ0V2ZW50cy5vbklucHV0LCBmYWxzZSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMudmFsdWVFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpO1xyXG5cdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2F1dG9jb3JyZWN0JywgJ29mZicpO1xyXG5cdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2F1dG9jYXBpdGFsaXplJywgJ29mZicpO1xyXG5cdFx0XHR0aGlzLnZhbHVlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NwZWxsY2hlY2snLCBmYWxzZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gYWxwaGFFbGVtZW50XHJcblx0XHRpZiAodGhpcy5hbHBoYUVsZW1lbnQgJiYganNjLmlzVGV4dElucHV0KHRoaXMuYWxwaGFFbGVtZW50KSkge1xyXG5cdFx0XHR0aGlzLmFscGhhRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25BbHBoYUtleURvd24sIGZhbHNlKTtcclxuXHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgb25BbHBoYUNoYW5nZSwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLmFscGhhRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uQWxwaGFJbnB1dCwgZmFsc2UpO1xyXG5cclxuXHRcdFx0dGhpcy5hbHBoYUVsZW1lbnQuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnb2ZmJyk7XHJcblx0XHRcdHRoaXMuYWxwaGFFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXV0b2NvcnJlY3QnLCAnb2ZmJyk7XHJcblx0XHRcdHRoaXMuYWxwaGFFbGVtZW50LnNldEF0dHJpYnV0ZSgnYXV0b2NhcGl0YWxpemUnLCAnb2ZmJyk7XHJcblx0XHRcdHRoaXMuYWxwaGFFbGVtZW50LnNldEF0dHJpYnV0ZSgnc3BlbGxjaGVjaycsIGZhbHNlKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBkZXRlcm1pbmUgaW5pdGlhbCBjb2xvciB2YWx1ZVxyXG5cdFx0Ly9cclxuXHRcdHZhciBpbml0VmFsdWUgPSAnRkZGRkZGJztcclxuXHJcblx0XHRpZiAodGhpcy52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGluaXRWYWx1ZSA9IHRoaXMudmFsdWU7IC8vIGdldCBpbml0aWFsIGNvbG9yIGZyb20gdGhlICd2YWx1ZScgcHJvcGVydHlcclxuXHRcdH0gZWxzZSBpZiAodGhpcy52YWx1ZUVsZW1lbnQgJiYgdGhpcy52YWx1ZUVsZW1lbnQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRpbml0VmFsdWUgPSB0aGlzLnZhbHVlRWxlbWVudC52YWx1ZTsgLy8gZ2V0IGluaXRpYWwgY29sb3IgZnJvbSB2YWx1ZUVsZW1lbnQncyB2YWx1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGRldGVybWluZSBpbml0aWFsIGFscGhhIHZhbHVlXHJcblx0XHQvL1xyXG5cdFx0dmFyIGluaXRBbHBoYSA9IHVuZGVmaW5lZDtcclxuXHJcblx0XHRpZiAodGhpcy5hbHBoYSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGluaXRBbHBoYSA9ICgnJyt0aGlzLmFscGhhKTsgLy8gZ2V0IGluaXRpYWwgYWxwaGEgdmFsdWUgZnJvbSB0aGUgJ2FscGhhJyBwcm9wZXJ0eVxyXG5cdFx0fSBlbHNlIGlmICh0aGlzLmFscGhhRWxlbWVudCAmJiB0aGlzLmFscGhhRWxlbWVudC52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdGluaXRBbHBoYSA9IHRoaXMuYWxwaGFFbGVtZW50LnZhbHVlOyAvLyBnZXQgaW5pdGlhbCBjb2xvciBmcm9tIGFscGhhRWxlbWVudCdzIHZhbHVlXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gZGV0ZXJtaW5lIGN1cnJlbnQgZm9ybWF0IGJhc2VkIG9uIHRoZSBpbml0aWFsIGNvbG9yIHZhbHVlXHJcblx0XHQvL1xyXG5cdFx0dGhpcy5fY3VycmVudEZvcm1hdCA9IG51bGw7XHJcblxyXG5cdFx0aWYgKFsnYXV0bycsICdhbnknXS5pbmRleE9mKHRoaXMuZm9ybWF0LnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcclxuXHRcdFx0Ly8gZm9ybWF0IGlzICdhdXRvJyBvciAnYW55JyAtPiBsZXQncyBhdXRvLWRldGVjdCBjdXJyZW50IGZvcm1hdFxyXG5cdFx0XHR2YXIgY29sb3IgPSBqc2MucGFyc2VDb2xvclN0cmluZyhpbml0VmFsdWUpO1xyXG5cdFx0XHR0aGlzLl9jdXJyZW50Rm9ybWF0ID0gY29sb3IgPyBjb2xvci5mb3JtYXQgOiAnaGV4JztcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdC8vIGZvcm1hdCBpcyBzcGVjaWZpZWRcclxuXHRcdFx0dGhpcy5fY3VycmVudEZvcm1hdCA9IHRoaXMuZm9ybWF0LnRvTG93ZXJDYXNlKCk7XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdC8vIGxldCdzIHBhcnNlIHRoZSBpbml0aWFsIGNvbG9yIHZhbHVlIGFuZCBleHBvc2UgY29sb3IncyBwcmV2aWV3XHJcblx0XHR0aGlzLnByb2Nlc3NWYWx1ZUlucHV0KGluaXRWYWx1ZSk7XHJcblxyXG5cdFx0Ly8gbGV0J3MgYWxzbyBwYXJzZSBhbmQgZXhwb3NlIHRoZSBpbml0aWFsIGFscGhhIHZhbHVlLCBpZiBhbnlcclxuXHRcdC8vXHJcblx0XHQvLyBOb3RlOiBJZiB0aGUgaW5pdGlhbCBjb2xvciB2YWx1ZSBjb250YWlucyBhbHBoYSB2YWx1ZSBpbiBpdCAoZS5nLiBpbiByZ2JhIGZvcm1hdCksXHJcblx0XHQvLyB0aGlzIHdpbGwgb3ZlcndyaXRlIGl0LiBTbyB3ZSBzaG91bGQgb25seSBwcm9jZXNzIGFscGhhIGlucHV0IGlmIHRoZXJlIHdhcyBhbnkgaW5pdGlhbFxyXG5cdFx0Ly8gYWxwaGEgZXhwbGljaXRseSBzZXQsIG90aGVyd2lzZSB3ZSBjb3VsZCBuZWVkbGVzc2x5IGxvc2UgaW5pdGlhbCB2YWx1ZSdzIGFscGhhXHJcblx0XHRpZiAoaW5pdEFscGhhICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy5wcm9jZXNzQWxwaGFJbnB1dChpbml0QWxwaGEpO1xyXG5cdFx0fVxyXG5cclxuXHR9XHJcblxyXG59O1xyXG5cclxuXHJcbi8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuLy8gUHVibGljIHByb3BlcnRpZXMgYW5kIG1ldGhvZHNcclxuLy89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG5cclxuLy9cclxuLy8gVGhlc2Ugd2lsbCBiZSBwdWJsaWNseSBhdmFpbGFibGUgdmlhIGpzY29sb3IuPG5hbWU+IGFuZCBKU0NvbG9yLjxuYW1lPlxyXG4vL1xyXG5cclxuXHJcbi8vIGNsYXNzIHRoYXQgd2lsbCBiZSBzZXQgdG8gZWxlbWVudHMgaGF2aW5nIGpzY29sb3IgaW5zdGFsbGVkIG9uIHRoZW1cclxuanNjLnB1Yi5jbGFzc05hbWUgPSAnanNjb2xvcic7XHJcblxyXG5cclxuLy8gY2xhc3MgdGhhdCB3aWxsIGJlIHNldCB0byBlbGVtZW50cyBoYXZpbmcganNjb2xvciBhY3RpdmUgb24gdGhlbVxyXG5qc2MucHViLmFjdGl2ZUNsYXNzTmFtZSA9ICdqc2NvbG9yLWFjdGl2ZSc7XHJcblxyXG5cclxuLy8gd2hldGhlciB0byB0cnkgdG8gcGFyc2UgdGhlIG9wdGlvbnMgc3RyaW5nIGJ5IGV2YWx1YXRpbmcgaXQgdXNpbmcgJ25ldyBGdW5jdGlvbigpJ1xyXG4vLyBpbiBjYXNlIGl0IGNvdWxkIG5vdCBiZSBwYXJzZWQgd2l0aCBKU09OLnBhcnNlKClcclxuanNjLnB1Yi5sb29zZUpTT04gPSB0cnVlO1xyXG5cclxuXHJcbi8vIHByZXNldHNcclxuanNjLnB1Yi5wcmVzZXRzID0ge307XHJcblxyXG4vLyBidWlsdC1pbiBwcmVzZXRzXHJcbmpzYy5wdWIucHJlc2V0c1snZGVmYXVsdCddID0ge307IC8vIGJhc2VsaW5lIGZvciBjdXN0b21pemF0aW9uXHJcblxyXG5qc2MucHViLnByZXNldHNbJ2xpZ2h0J10gPSB7IC8vIGRlZmF1bHQgY29sb3Igc2NoZW1lXHJcblx0YmFja2dyb3VuZENvbG9yOiAncmdiYSgyNTUsMjU1LDI1NSwxKScsXHJcblx0Y29udHJvbEJvcmRlckNvbG9yOiAncmdiYSgxODcsMTg3LDE4NywxKScsXHJcblx0YnV0dG9uQ29sb3I6ICdyZ2JhKDAsMCwwLDEpJyxcclxufTtcclxuanNjLnB1Yi5wcmVzZXRzWydkYXJrJ10gPSB7XHJcblx0YmFja2dyb3VuZENvbG9yOiAncmdiYSg1MSw1MSw1MSwxKScsXHJcblx0Y29udHJvbEJvcmRlckNvbG9yOiAncmdiYSgxNTMsMTUzLDE1MywxKScsXHJcblx0YnV0dG9uQ29sb3I6ICdyZ2JhKDI0MCwyNDAsMjQwLDEpJyxcclxufTtcclxuXHJcbmpzYy5wdWIucHJlc2V0c1snc21hbGwnXSA9IHsgd2lkdGg6MTAxLCBoZWlnaHQ6MTAxLCBwYWRkaW5nOjEwLCBzbGlkZXJTaXplOjE0IH07XHJcbmpzYy5wdWIucHJlc2V0c1snbWVkaXVtJ10gPSB7IHdpZHRoOjE4MSwgaGVpZ2h0OjEwMSwgcGFkZGluZzoxMiwgc2xpZGVyU2l6ZToxNiB9OyAvLyBkZWZhdWx0IHNpemVcclxuanNjLnB1Yi5wcmVzZXRzWydsYXJnZSddID0geyB3aWR0aDoyNzEsIGhlaWdodDoxNTEsIHBhZGRpbmc6MTIsIHNsaWRlclNpemU6MjQgfTtcclxuXHJcbmpzYy5wdWIucHJlc2V0c1sndGhpbiddID0geyBib3JkZXJXaWR0aDoxLCBjb250cm9sQm9yZGVyV2lkdGg6MSwgcG9pbnRlckJvcmRlcldpZHRoOjEgfTsgLy8gZGVmYXVsdCB0aGlja25lc3NcclxuanNjLnB1Yi5wcmVzZXRzWyd0aGljayddID0geyBib3JkZXJXaWR0aDoyLCBjb250cm9sQm9yZGVyV2lkdGg6MiwgcG9pbnRlckJvcmRlcldpZHRoOjIgfTtcclxuXHJcblxyXG4vLyBzaXplIG9mIHNwYWNlIGluIHRoZSBzbGlkZXJzXHJcbmpzYy5wdWIuc2xpZGVySW5uZXJTcGFjZSA9IDM7IC8vIHB4XHJcblxyXG4vLyB0cmFuc3BhcmVuY3kgY2hlc3Nib2FyZFxyXG5qc2MucHViLmNoZXNzYm9hcmRTaXplID0gODsgLy8gcHhcclxuanNjLnB1Yi5jaGVzc2JvYXJkQ29sb3IxID0gJyM2NjY2NjYnO1xyXG5qc2MucHViLmNoZXNzYm9hcmRDb2xvcjIgPSAnIzk5OTk5OSc7XHJcblxyXG4vLyBwcmV2aWV3IHNlcGFyYXRvclxyXG5qc2MucHViLnByZXZpZXdTZXBhcmF0b3IgPSBbJ3JnYmEoMjU1LDI1NSwyNTUsLjY1KScsICdyZ2JhKDEyOCwxMjgsMTI4LC42NSknXTtcclxuXHJcblxyXG4vLyBJbnN0YWxscyBqc2NvbG9yIG9uIGN1cnJlbnQgRE9NIHRyZWVcclxuanNjLnB1Yi5pbnN0YWxsID0gZnVuY3Rpb24gKHJvb3ROb2RlKSB7XHJcblx0dmFyIHN1Y2Nlc3MgPSB0cnVlO1xyXG5cclxuXHR0cnkge1xyXG5cdFx0anNjLmluc3RhbGxCeVNlbGVjdG9yKCdbZGF0YS1qc2NvbG9yXScsIHJvb3ROb2RlKTtcclxuXHR9IGNhdGNoIChlKSB7XHJcblx0XHRzdWNjZXNzID0gZmFsc2U7XHJcblx0XHRjb25zb2xlLndhcm4oZSk7XHJcblx0fVxyXG5cclxuXHQvLyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIERFUFJFQ0FURUQgaW5zdGFsbGF0aW9uIHVzaW5nIGNsYXNzIG5hbWVcclxuXHRpZiAoanNjLnB1Yi5sb29rdXBDbGFzcykge1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0anNjLmluc3RhbGxCeVNlbGVjdG9yKFxyXG5cdFx0XHRcdChcclxuXHRcdFx0XHRcdCdpbnB1dC4nICsganNjLnB1Yi5sb29rdXBDbGFzcyArICcsICcgK1xyXG5cdFx0XHRcdFx0J2J1dHRvbi4nICsganNjLnB1Yi5sb29rdXBDbGFzc1xyXG5cdFx0XHRcdCksXHJcblx0XHRcdFx0cm9vdE5vZGVcclxuXHRcdFx0KTtcclxuXHRcdH0gY2F0Y2ggKGUpIHt9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc3VjY2VzcztcclxufTtcclxuXHJcblxyXG4vLyBUcmlnZ2VycyBnaXZlbiBpbnB1dCBldmVudChzKSAoZS5nLiAnaW5wdXQnIG9yICdjaGFuZ2UnKSBvbiBhbGwgY29sb3IgcGlja2Vycy5cclxuLy9cclxuLy8gSXQgaXMgcG9zc2libGUgdG8gc3BlY2lmeSBtdWx0aXBsZSBldmVudHMgc2VwYXJhdGVkIHdpdGggYSBzcGFjZS5cclxuLy8gSWYgY2FsbGVkIGJlZm9yZSBqc2NvbG9yIGlzIGluaXRpYWxpemVkLCB0aGVuIHRoZSBldmVudHMgd2lsbCBiZSB0cmlnZ2VyZWQgYWZ0ZXIgaW5pdGlhbGl6YXRpb24uXHJcbi8vXHJcbmpzYy5wdWIudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudE5hbWVzKSB7XHJcblx0aWYgKGpzYy5pbml0aWFsaXplZCkge1xyXG5cdFx0anNjLnRyaWdnZXJHbG9iYWwoZXZlbnROYW1lcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdGpzYy50cmlnZ2VyUXVldWUucHVzaChldmVudE5hbWVzKTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuLy8gSGlkZXMgY3VycmVudCBjb2xvciBwaWNrZXIgYm94XHJcbmpzYy5wdWIuaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRpZiAoanNjLnBpY2tlciAmJiBqc2MucGlja2VyLm93bmVyKSB7XHJcblx0XHRqc2MucGlja2VyLm93bmVyLmhpZGUoKTtcclxuXHR9XHJcbn07XHJcblxyXG5cclxuLy8gUmV0dXJucyBhIGRhdGEgVVJMIG9mIGEgZ3JheSBjaGVzc2JvYXJkIGltYWdlIHRoYXQgaW5kaWNhdGVzIHRyYW5zcGFyZW5jeVxyXG5qc2MucHViLmNoZXNzYm9hcmQgPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuXHRpZiAoIWNvbG9yKSB7XHJcblx0XHRjb2xvciA9ICdyZ2JhKDAsMCwwLDApJztcclxuXHR9XHJcblx0dmFyIHByZXZpZXcgPSBqc2MuZ2VuQ29sb3JQcmV2aWV3Q2FudmFzKGNvbG9yKTtcclxuXHRyZXR1cm4gcHJldmlldy5jYW52YXMudG9EYXRhVVJMKCk7XHJcbn07XHJcblxyXG5cclxuLy8gUmV0dXJucyBhIGRhdGEgVVJMIG9mIGEgZ3JheSBjaGVzc2JvYXJkIGltYWdlIHRoYXQgaW5kaWNhdGVzIHRyYW5zcGFyZW5jeVxyXG5qc2MucHViLmJhY2tncm91bmQgPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuXHR2YXIgYmFja2dyb3VuZHMgPSBbXTtcclxuXHJcblx0Ly8gQ1NTIGdyYWRpZW50IGZvciBiYWNrZ3JvdW5kIGNvbG9yIHByZXZpZXdcclxuXHRiYWNrZ3JvdW5kcy5wdXNoKGpzYy5nZW5Db2xvclByZXZpZXdHcmFkaWVudChjb2xvcikpO1xyXG5cclxuXHQvLyBkYXRhIFVSTCBvZiBnZW5lcmF0ZWQgUE5HIGltYWdlIHdpdGggYSBncmF5IHRyYW5zcGFyZW5jeSBjaGVzc2JvYXJkXHJcblx0dmFyIHByZXZpZXcgPSBqc2MuZ2VuQ29sb3JQcmV2aWV3Q2FudmFzKCk7XHJcblx0YmFja2dyb3VuZHMucHVzaChbXHJcblx0XHQndXJsKFxcJycgKyBwcmV2aWV3LmNhbnZhcy50b0RhdGFVUkwoKSArICdcXCcpJyxcclxuXHRcdCdsZWZ0IHRvcCcsXHJcblx0XHQncmVwZWF0JyxcclxuXHRdLmpvaW4oJyAnKSk7XHJcblxyXG5cdHJldHVybiBiYWNrZ3JvdW5kcy5qb2luKCcsICcpO1xyXG59O1xyXG5cclxuXHJcbi8vXHJcbi8vIERFUFJFQ0FURUQgcHJvcGVydGllcyBhbmQgbWV0aG9kc1xyXG4vL1xyXG5cclxuXHJcbi8vIERFUFJFQ0FURUQuIFVzZSBqc2NvbG9yLnByZXNldHMuZGVmYXVsdCBpbnN0ZWFkLlxyXG4vL1xyXG4vLyBDdXN0b20gZGVmYXVsdCBvcHRpb25zIGZvciBhbGwgY29sb3IgcGlja2VycywgZS5nLiB7IGhhc2g6IHRydWUsIHdpZHRoOiAzMDAgfVxyXG5qc2MucHViLm9wdGlvbnMgPSB7fTtcclxuXHJcblxyXG4vLyBERVBSRUNBVEVELiBVc2UgZGF0YS1qc2NvbG9yIGF0dHJpYnV0ZSBpbnN0ZWFkLCB3aGljaCBpbnN0YWxscyBqc2NvbG9yIG9uIGdpdmVuIGVsZW1lbnQuXHJcbi8vXHJcbi8vIEJ5IGRlZmF1bHQsIHdlJ2xsIHNlYXJjaCBmb3IgYWxsIGVsZW1lbnRzIHdpdGggY2xhc3M9XCJqc2NvbG9yXCIgYW5kIGluc3RhbGwgYSBjb2xvciBwaWNrZXIgb24gdGhlbS5cclxuLy9cclxuLy8gWW91IGNhbiBjaGFuZ2Ugd2hhdCBjbGFzcyBuYW1lIHdpbGwgYmUgbG9va2VkIGZvciBieSBzZXR0aW5nIHRoZSBwcm9wZXJ0eSBqc2NvbG9yLmxvb2t1cENsYXNzXHJcbi8vIGFueXdoZXJlIGluIHlvdXIgSFRNTCBkb2N1bWVudC4gVG8gY29tcGxldGVseSBkaXNhYmxlIHRoZSBhdXRvbWF0aWMgbG9va3VwLCBzZXQgaXQgdG8gbnVsbC5cclxuLy9cclxuanNjLnB1Yi5sb29rdXBDbGFzcyA9ICdqc2NvbG9yJztcclxuXHJcblxyXG4vLyBERVBSRUNBVEVELiBVc2UganNjb2xvci5pbnN0YWxsKCkgaW5zdGVhZFxyXG4vL1xyXG5qc2MucHViLmluaXQgPSBmdW5jdGlvbiAoKSB7XHJcblx0Y29uc29sZS53YXJuKCdqc2NvbG9yLmluaXQoKSBpcyBERVBSRUNBVEVELiBVc2luZyBqc2NvbG9yLmluc3RhbGwoKSBpbnN0ZWFkLicgKyBqc2MuZG9jc1JlZik7XHJcblx0cmV0dXJuIGpzYy5wdWIuaW5zdGFsbCgpO1xyXG59O1xyXG5cclxuXHJcbi8vIERFUFJFQ0FURUQuIFVzZSBkYXRhLWpzY29sb3IgYXR0cmlidXRlIGluc3RlYWQsIHdoaWNoIGluc3RhbGxzIGpzY29sb3Igb24gZ2l2ZW4gZWxlbWVudC5cclxuLy9cclxuLy8gSW5zdGFsbCBqc2NvbG9yIG9uIGFsbCBlbGVtZW50cyB0aGF0IGhhdmUgdGhlIHNwZWNpZmllZCBjbGFzcyBuYW1lXHJcbmpzYy5wdWIuaW5zdGFsbEJ5Q2xhc3NOYW1lID0gZnVuY3Rpb24gKCkge1xyXG5cdGNvbnNvbGUuZXJyb3IoJ2pzY29sb3IuaW5zdGFsbEJ5Q2xhc3NOYW1lKCkgaXMgREVQUkVDQVRFRC4gVXNlIGRhdGEtanNjb2xvcj1cIlwiIGF0dHJpYnV0ZSBpbnN0ZWFkIG9mIGEgY2xhc3MgbmFtZS4nICsganNjLmRvY3NSZWYpO1xyXG5cdHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblxyXG5qc2MucmVnaXN0ZXIoKTtcclxuXHJcblxyXG5yZXR1cm4ganNjLnB1YjtcclxuXHJcblxyXG59KSgpOyAvLyBFTkQgd2luZG93LmpzY29sb3JcclxuXHJcbndpbmRvdy5KU0NvbG9yID0gd2luZG93LmpzY29sb3I7IC8vICdKU0NvbG9yJyBpcyBhbiBhbGlhcyB0byAnanNjb2xvcidcclxuXHJcbn0gLy8gZW5kaWZcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBVUEsVUFBSSxrQkFBa0I7QUFHdEIsVUFBSSxNQUFNLElBQUk7QUFHZCxVQUFJLFlBQVk7QUFHaEIsVUFBSSxTQUFTO0FBR2IsVUFBSSxhQUFhO0FBR2pCLFVBQUksYUFBYTtBQUdqQixVQUFJLFlBQVk7QUFHaEIsVUFBSSxlQUFlO0FBR25CLFVBQUksYUFBYSxPQUFPLFVBQVUsWUFBWSxVQUFVLE9BQU8sV0FBVyxVQUFVO0FBR3BGLFVBQUksV0FBVyxPQUFPLFFBQVEsWUFBWSxRQUFRLEtBQUssV0FBVyxVQUFVO0FBRzVFLFVBQUksT0FBTyxjQUFjLFlBQVksU0FBUztBQUc5QyxVQUFJLGNBQWMsT0FBTztBQU96QixVQUFJLGlCQUFpQixZQUFZO0FBR2pDLFVBQUksWUFBWSxLQUFLO0FBQXJCLFVBQ0ksWUFBWSxLQUFLO0FBa0JyQixVQUFJLE1BQU0sV0FBVztBQUNuQixlQUFPLEtBQUssS0FBSztBQUFBO0FBeURuQix3QkFBa0IsTUFBTSxNQUFNLFNBQVM7QUFDckMsWUFBSSxVQUNBLFVBQ0EsU0FDQSxRQUNBLFNBQ0EsY0FDQSxpQkFBaUIsR0FDakIsVUFBVSxPQUNWLFNBQVMsT0FDVCxXQUFXO0FBRWYsWUFBSSxPQUFPLFFBQVEsWUFBWTtBQUM3QixnQkFBTSxJQUFJLFVBQVU7QUFBQTtBQUV0QixlQUFPLFNBQVMsU0FBUztBQUN6QixZQUFJLFVBQVMsVUFBVTtBQUNyQixvQkFBVSxDQUFDLENBQUMsUUFBUTtBQUNwQixtQkFBUyxhQUFhO0FBQ3RCLG9CQUFVLFNBQVMsVUFBVSxTQUFTLFFBQVEsWUFBWSxHQUFHLFFBQVE7QUFDckUscUJBQVcsY0FBYyxVQUFVLENBQUMsQ0FBQyxRQUFR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LElBQUksY0FBYztBQUt0QixVQUFJLElBQUksT0FBTyxXQUFZO0FBQzFCLGdCQUFRLEtBQUssbUVBQW1FLElBQUk7QUFDcEYsZUFBTyxJQUFJLElBQUk7QUFBQTtBQU9oQixVQUFJLElBQUkscUJBQXFCLFdBQVk7QUFDeEMsZ0JBQVEsTUFBTSx1R0FBdUcsSUFBSTtBQUN6SCxlQUFPO0FBQUE7QUFJUixVQUFJO0FBR0osYUFBTyxJQUFJO0FBQUE7QUFLWCxXQUFPLFVBQVUsT0FBTztBQUFBOzs7QUQxaUd4QixzQkFBbUI7QUFuQ25CLE1BQUksYUFBYTtBQUNqQixNQUFJLFNBQVE7QUFFWixTQUFNLGdCQUFnQjtBQUFBLElBQ3BCLFVBQVU7QUFDUixXQUFLLEdBQUcsaUJBQWlCLFNBQVMsMkJBQVMsT0FBSztBQUM5QyxjQUFNLEtBQUssRUFBRTtBQUNiLGNBQU0sTUFBTSxHQUFHO0FBQ2YsYUFBSyxVQUFVLFNBQVMsRUFBQztBQUFBLFNBQ3hCO0FBQUE7QUFBQTtBQUlQLFNBQU0sbUJBQW1CO0FBQUEsSUFDdkIsVUFBVTtBQUNSLFdBQUssR0FBRyxpQkFBaUIsU0FBUywyQkFBUyxPQUFLO0FBQzlDLGNBQU0sUUFBUSxTQUFTLEVBQUUsT0FBTztBQUNoQyxhQUFLLFVBQVUsY0FBYyxFQUFDO0FBQUEsU0FDN0I7QUFBQTtBQUFBO0FBSVAsU0FBTSxjQUFjO0FBQUEsSUFDbEIsVUFBVTtBQUNSLFdBQUssR0FBRyxpQkFBaUIsU0FBUywyQkFBUyxPQUFLO0FBQzlDLGNBQU0sUUFBUSxTQUFTLEVBQUUsT0FBTztBQUNoQyxhQUFLLFVBQVUsZ0JBQWdCLEVBQUM7QUFBQSxTQUMvQjtBQUFBO0FBQUE7QUFJUCxTQUFPLFNBQVMsU0FBUyxZQUFZO0FBQ25DLFVBQU0sUUFBUSxJQUFJLFlBQVksU0FBUyxFQUFDLFFBQVE7QUFDaEQsZUFBVyxlQUFlLGNBQWM7QUFBQTtBQUkxQyxNQUFJLFlBQVksU0FBUyxjQUFjLDJCQUEyQixhQUFhO0FBQy9FLE1BQUksYUFBYSxJQUFJLFdBQVcsU0FBUyxRQUFRLEVBQUMsT0FBTyxRQUFPLFFBQVEsRUFBQyxhQUFhO0FBR3RGLHdCQUFPLE9BQU8sRUFBQyxXQUFXLEVBQUMsR0FBRyxVQUFTLGFBQWE7QUFDcEQsU0FBTyxpQkFBaUIsMEJBQTBCLFVBQVEsc0JBQU87QUFDakUsU0FBTyxpQkFBaUIseUJBQXlCLFVBQVEsc0JBQU87QUFHaEUsYUFBVztBQU1YLFNBQU8sYUFBYTsiLAogICJuYW1lcyI6IFtdCn0K
