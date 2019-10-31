/**
 * @preserve
 * @laomao800/vue-item-list-selector v2.1.0
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = global || self, global['vue-item-list-selector'] = factory(global.Vue));
}(this, function (vue) { 'use strict';

  vue = vue && vue.hasOwnProperty('default') ? vue['default'] : vue;

  /* eslint-disable no-undefined,no-param-reassign,no-shadow */

  /**
   * Throttle execution of a function. Especially useful for rate limiting
   * execution of handlers on events like resize and scroll.
   *
   * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
   * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
   *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
   *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
   *                                    the internal counter is reset)
   * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
   *                                    to `callback` when the throttled-function is executed.
   * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
   *                                    schedule `callback` to execute after `delay` ms.
   *
   * @return {Function}  A new, throttled, function.
   */
  function throttle (delay, noTrailing, callback, debounceMode) {
    /*
     * After wrapper has stopped being called, this timeout ensures that
     * `callback` is executed at the proper times in `throttle` and `end`
     * debounce modes.
     */
    var timeoutID;
    var cancelled = false; // Keep track of the last time `callback` was executed.

    var lastExec = 0; // Function to clear existing timeout

    function clearExistingTimeout() {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
    } // Function to cancel next exec


    function cancel() {
      clearExistingTimeout();
      cancelled = true;
    } // `noTrailing` defaults to falsy.


    if (typeof noTrailing !== 'boolean') {
      debounceMode = callback;
      callback = noTrailing;
      noTrailing = undefined;
    }
    /*
     * The `wrapper` function encapsulates all of the throttling / debouncing
     * functionality and when executed will limit the rate at which `callback`
     * is executed.
     */


    function wrapper() {
      var self = this;
      var elapsed = Date.now() - lastExec;
      var args = arguments;

      if (cancelled) {
        return;
      } // Execute `callback` and update the `lastExec` timestamp.


      function exec() {
        lastExec = Date.now();
        callback.apply(self, args);
      }
      /*
       * If `debounceMode` is true (at begin) this is used to clear the flag
       * to allow future `callback` executions.
       */


      function clear() {
        timeoutID = undefined;
      }

      if (debounceMode && !timeoutID) {
        /*
         * Since `wrapper` is being called for the first time and
         * `debounceMode` is true (at begin), execute `callback`.
         */
        exec();
      }

      clearExistingTimeout();

      if (debounceMode === undefined && elapsed > delay) {
        /*
         * In throttle mode, if `delay` time has been exceeded, execute
         * `callback`.
         */
        exec();
      } else if (noTrailing !== true) {
        /*
         * In trailing throttle mode, since `delay` time has not been
         * exceeded, schedule `callback` to execute `delay` ms after most
         * recent execution.
         *
         * If `debounceMode` is true (at begin), schedule `clear` to execute
         * after `delay` ms.
         *
         * If `debounceMode` is false (at end), schedule `callback` to
         * execute after `delay` ms.
         */
        timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
      }
    }

    wrapper.cancel = cancel; // Return the wrapper function.

    return wrapper;
  }

  /**
   * Returns the object type of the given payload
   *
   * @param {*} payload
   * @returns {string}
   */
  function getType(payload) {
      return Object.prototype.toString.call(payload).slice(8, -1);
  }
  /**
   * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
   *
   * @param {*} payload
   * @returns {payload is {[key: string]: any}}
   */
  function isPlainObject(payload) {
      if (getType(payload) !== 'Object')
          { return false; }
      return (payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype);
  }

  var isArray = Array.isArray;
  var keyList = Object.keys;
  var hasProp = Object.prototype.hasOwnProperty;

  var fastDeepEqual = function equal(a, b) {
    if (a === b) { return true; }

    if (a && b && typeof a == 'object' && typeof b == 'object') {
      var arrA = isArray(a)
        , arrB = isArray(b)
        , i
        , length
        , key;

      if (arrA && arrB) {
        length = a.length;
        if (length != b.length) { return false; }
        for (i = length; i-- !== 0;)
          { if (!equal(a[i], b[i])) { return false; } }
        return true;
      }

      if (arrA != arrB) { return false; }

      var dateA = a instanceof Date
        , dateB = b instanceof Date;
      if (dateA != dateB) { return false; }
      if (dateA && dateB) { return a.getTime() == b.getTime(); }

      var regexpA = a instanceof RegExp
        , regexpB = b instanceof RegExp;
      if (regexpA != regexpB) { return false; }
      if (regexpA && regexpB) { return a.toString() == b.toString(); }

      var keys = keyList(a);
      length = keys.length;

      if (length !== keyList(b).length)
        { return false; }

      for (i = length; i-- !== 0;)
        { if (!hasProp.call(b, keys[i])) { return false; } }

      for (i = length; i-- !== 0;) {
        key = keys[i];
        if (!equal(a[key], b[key])) { return false; }
      }

      return true;
    }

    return a!==a && b!==b;
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var vueVirtualScrollList = createCommonjsModule(function (module, exports) {
  (function (root, factory) {
      var namespace = 'VirtualScrollList';
      {
          module.exports = factory(namespace, vue);
      }
  })(commonjsGlobal, function (namespace, Vue2) {
      if (typeof Vue2 === 'object' && typeof Vue2.default === 'function') {
          Vue2 = Vue2.default;
      }

      var _debounce = function (func, wait, immediate) {
          var timeout;
          return function () {
              var context = this;
              var args = arguments;
              var later = function () {
                  timeout = null;
                  if (!immediate) {
                      func.apply(context, args);
                  }
              };
              var callNow = immediate && !timeout;
              clearTimeout(timeout);
              timeout = setTimeout(later, wait);
              if (callNow) {
                  func.apply(context, args);
              }
          }
      };

      return Vue2.component(namespace, {
          props: {
              size: { type: Number, required: true },
              remain: { type: Number, required: true },
              rtag: { type: String, default: 'div' },
              wtag: { type: String, default: 'div' },
              wclass: { type: String, default: '' },
              start: { type: Number, default: 0 },
              offset: { type: Number, default: 0 },
              variable: [Function, Boolean],
              bench: Number,
              debounce: Number,
              totop: Function,
              tobottom: Function,
              onscroll: Function
          },

          created: function () {
              var start = this.start >= this.remain ? this.start : 0;
              var keeps = this.remain + (this.bench || this.remain);

              this.delta = {
                  start: start, // start index.
                  end: start + keeps - 1, // end index.
                  keeps: keeps, // nums keeping in real dom.
                  total: 0, // all items count, update in filter.
                  offsetAll: 0, // cache all the scrollable offset.
                  paddingTop: 0, // container wrapper real padding-top.
                  paddingBottom: 0, // container wrapper real padding-bottom.
                  varCache: {}, // object to cache variable index height and scroll offset.
                  varAverSize: 0, // average/estimate item height before variable be calculated.
                  varLastCalcIndex: 0 // last calculated variable height/offset index, always increase.
              };
          },

          watch: {
              size: function () {
                  this.alter = 'size';
              },
              remain: function () {
                  this.alter = 'remain';
              },
              bench: function () {
                  this.alter = 'bench';
              },
              start: function () {
                  this.alter = 'start';
              },
              offset: function () {
                  this.alter = 'offset';
              }
          },

          methods: {
              onScroll: function (e) {
                  var delta = this.delta;
                  var offset = (this.$refs.vsl && this.$refs.vsl.scrollTop) || 0;

                  if (delta.total > delta.keeps) {
                      this.updateZone(offset);
                  } else {
                      delta.end = delta.total - 1;
                  }

                  var offsetAll = delta.offsetAll;
                  if (this.onscroll) {
                      this.onscroll(e, {
                          offset: offset,
                          offsetAll: offsetAll,
                          start: delta.start,
                          end: delta.end
                      });
                  }

                  if (!offset && delta.total) {
                      this.triggerEvent('totop');
                  }

                  if (offset >= offsetAll) {
                      this.triggerEvent('tobottom');
                  }
              },

              // update render zone by scroll offset.
              updateZone: function (offset) {
                  var overs = this.variable
                      ? this.getVarOvers(offset)
                      : Math.floor(offset / this.size);

                  var delta = this.delta;
                  var zone = this.getZone(overs);
                  var bench = this.bench || this.remain;

                  // for better performance, if scroll pass items within now bench, do not update.
                  if (!zone.isLast && (overs > delta.start) && (overs - delta.start <= bench)) {
                      return
                  }

                  delta.end = zone.end;
                  delta.start = zone.start;
                  this.$forceUpdate();
              },

              // return the scroll passed items count in variable.
              getVarOvers: function (offset) {
                  var low = 0;
                  var middle = 0;
                  var middleOffset = 0;
                  var delta = this.delta;
                  var high = delta.total;

                  while (low <= high) {
                      middle = low + Math.floor((high - low) / 2);
                      middleOffset = this.getVarOffset(middle);

                      // calculate the average variable height at first binary search.
                      if (!delta.varAverSize) {
                          delta.varAverSize = Math.floor(middleOffset / middle);
                      }

                      if (middleOffset === offset) {
                          return middle
                      } else if (middleOffset < offset) {
                          low = middle + 1;
                      } else if (middleOffset > offset) {
                          high = middle - 1;
                      }
                  }

                  return low > 0 ? --low : 0
              },

              // return a variable scroll offset from given index.
              getVarOffset: function (index, nocache) {
                  var delta = this.delta;
                  var cache = delta.varCache[index];

                  if (!nocache && cache) {
                      return cache.offset
                  }

                  var offset = 0;
                  for (var i = 0; i < index; i++) {
                      var size = this.getVarSize(i, nocache);
                      delta.varCache[i] = {
                          size: size,
                          offset: offset
                      };
                      offset += size;
                  }

                  delta.varLastCalcIndex = Math.max(delta.varLastCalcIndex, index - 1);
                  delta.varLastCalcIndex = Math.min(delta.varLastCalcIndex, delta.total - 1);

                  return offset
              },

              // return a variable size (height) from given index.
              getVarSize: function (index, nocache) {
                  var cache = this.delta.varCache[index];
                  if (!nocache && cache) {
                      return cache.size
                  }

                  if (typeof this.variable === 'function') {
                      return this.variable(index) || 0
                  } else {
                      var slot = this.$slots.default[index];
                      var style = slot && slot.data && slot.data.style;
                      if (style && style.height) {
                          var shm = style.height.match(/^(.*)px$/);
                          return (shm && +shm[1]) || 0
                      }
                  }
                  return 0
              },

              // return the variable paddingTop base current zone.
              // @todo: if set a large `start` before variable was calculated,
              // here will also case too much offset calculate when list is very large,
              // consider use estimate paddingTop in this case just like `getVarPaddingBottom`.
              getVarPaddingTop: function () {
                  return this.getVarOffset(this.delta.start)
              },

              // return the variable paddingBottom base current zone.
              getVarPaddingBottom: function () {
                  var delta = this.delta;
                  var last = delta.total - 1;
                  if (delta.total - delta.end <= delta.keeps || delta.varLastCalcIndex === last) {
                      return this.getVarOffset(last) - this.getVarOffset(delta.end)
                  } else {
                      // if unreached last zone or uncalculate real behind offset
                      // return the estimate paddingBottom avoid too much calculate.
                      return (delta.total - delta.end) * (delta.varAverSize || this.size)
                  }
              },

              // retun the variable all heights use to judge reach bottom.
              getVarAllHeight: function () {
                  var delta = this.delta;
                  if (delta.total - delta.end <= delta.keeps || delta.varLastCalcIndex === delta.total - 1) {
                      return this.getVarOffset(delta.total)
                  } else {
                      return this.getVarOffset(delta.start) + (delta.total - delta.end) * (delta.varAverSize || this.size)
                  }
              },

              // the ONLY ONE public method, allow the parent update variable by index.
              updateVariable: function (index) {
                  // clear/update all the offfsets and heights ahead of index.
                  this.getVarOffset(index, true);
              },

              // return the right zone info base on `start/index`.
              getZone: function (index) {
                  var start, end;
                  var delta = this.delta;

                  index = parseInt(index, 10);
                  index = Math.max(0, index);

                  var lastStart = delta.total - delta.keeps;
                  var isLast = (index <= delta.total && index >= lastStart) || (index > delta.total);
                  if (isLast) {
                      end = delta.total - 1;
                      start = Math.max(0, lastStart);
                  } else {
                      start = index;
                      end = start + delta.keeps - 1;
                  }

                  return {
                      end: end,
                      start: start,
                      isLast: isLast
                  }
              },

              // trigger a props event on parent.
              triggerEvent: function (event) {
                  if (this[event]) {
                      this[event]();
                  }
              },

              // set manual scroll top.
              setScrollTop: function (scrollTop) {
                  var vsl = this.$refs.vsl;
                  if (vsl) {
                      vsl.scrollTop = scrollTop;
                  }
              },

              // filter the shown items base on `start` and `end`.
              filter: function () {
                  var delta = this.delta;
                  var slots = this.$slots.default;

                  if (!slots) {
                      slots = [];
                      delta.start = 0;
                  }

                  delta.total = slots.length;

                  var paddingTop, paddingBottom, allHeight;
                  var hasPadding = delta.total > delta.keeps;

                  if (this.variable) {
                      allHeight = this.getVarAllHeight();
                      paddingTop = hasPadding ? this.getVarPaddingTop() : 0;
                      paddingBottom = hasPadding ? this.getVarPaddingBottom() : 0;
                  } else {
                      allHeight = this.size * delta.total;
                      paddingTop = this.size * (hasPadding ? delta.start : 0);
                      paddingBottom = this.size * (hasPadding ? delta.total - delta.keeps : 0) - paddingTop;
                  }

                  delta.paddingTop = paddingTop;
                  delta.paddingBottom = paddingBottom;
                  delta.offsetAll = allHeight - this.size * this.remain;

                  var targets = [];
                  for (var i = delta.start; i <= Math.ceil(delta.end); i++) {
                      targets.push(slots[i]);
                  }
                  return targets
              }
          },

          mounted: function () {
              if (this.start) {
                  var start = this.getZone(this.start).start;
                  this.setScrollTop(this.variable ? this.getVarOffset(start) : start * this.size);
              } else if (this.offset) {
                  this.setScrollTop(this.offset);
              }
          },

          // check if delta should update when prorps change.
          beforeUpdate: function () {
              var delta = this.delta;
              delta.keeps = this.remain + (this.bench || this.remain);

              var calcstart = this.alter === 'start' ? this.start : delta.start;
              var zone = this.getZone(calcstart);

              // if start, size or offset change, update scroll position.
              if (~['start', 'size', 'offset'].indexOf(this.alter)) {
                  this.$nextTick(this.setScrollTop.bind(this, this.alter === 'offset'
                      ? this.offset : this.variable
                          ? this.getVarOffset(zone.isLast ? delta.total : zone.start)
                          : zone.isLast && (delta.total - calcstart <= this.remain)
                              ? delta.total * this.size : calcstart * this.size)
                  );
              }

              // if points out difference, force update once again.
              if (calcstart !== zone.start || delta.end !== zone.end || this.alter) {
                  this.alter = '';
                  delta.end = zone.end;
                  delta.start = zone.start;
                  this.$forceUpdate();
              }
          },

          render: function (h) {
              var list = this.filter();
              var delta = this.delta;
              var dbc = this.debounce;

              return h(this.rtag, {
                  'ref': 'vsl',
                  'style': {
                      'display': 'block',
                      'overflow-y': 'auto',
                      'height': this.size * this.remain + 'px'
                  },
                  'on': {
                      '&scroll': dbc ? _debounce(this.onScroll.bind(this), dbc) : this.onScroll
                  }
              }, [
                  h(this.wtag, {
                      'style': {
                          'display': 'block',
                          'padding-top': delta.paddingTop + 'px',
                          'padding-bottom': delta.paddingBottom + 'px'
                      },
                      'class': this.wclass
                  }, list)
              ])
          }
      })
  });
  });

  function isElement(el) {
    return el != null && typeof el === 'object' && el.nodeType === 1;
  }

  function canOverflow(overflow, skipOverflowHiddenElements) {
    if (skipOverflowHiddenElements && overflow === 'hidden') {
      return false;
    }

    return overflow !== 'visible' && overflow !== 'clip';
  }

  function isScrollable(el, skipOverflowHiddenElements) {
    if (el.clientHeight < el.scrollHeight || el.clientWidth < el.scrollWidth) {
      var style = getComputedStyle(el, null);
      return canOverflow(style.overflowY, skipOverflowHiddenElements) || canOverflow(style.overflowX, skipOverflowHiddenElements);
    }

    return false;
  }

  function alignNearest(scrollingEdgeStart, scrollingEdgeEnd, scrollingSize, scrollingBorderStart, scrollingBorderEnd, elementEdgeStart, elementEdgeEnd, elementSize) {
    if (elementEdgeStart < scrollingEdgeStart && elementEdgeEnd > scrollingEdgeEnd || elementEdgeStart > scrollingEdgeStart && elementEdgeEnd < scrollingEdgeEnd) {
      return 0;
    }

    if (elementEdgeStart <= scrollingEdgeStart && elementSize <= scrollingSize || elementEdgeEnd >= scrollingEdgeEnd && elementSize >= scrollingSize) {
      return elementEdgeStart - scrollingEdgeStart - scrollingBorderStart;
    }

    if (elementEdgeEnd > scrollingEdgeEnd && elementSize < scrollingSize || elementEdgeStart < scrollingEdgeStart && elementSize > scrollingSize) {
      return elementEdgeEnd - scrollingEdgeEnd + scrollingBorderEnd;
    }

    return 0;
  }

  var computeScrollIntoView = (function (target, options) {
    var scrollMode = options.scrollMode,
        block = options.block,
        inline = options.inline,
        boundary = options.boundary,
        skipOverflowHiddenElements = options.skipOverflowHiddenElements;
    var checkBoundary = typeof boundary === 'function' ? boundary : function (node) {
      return node !== boundary;
    };

    if (!isElement(target)) {
      throw new TypeError('Invalid target');
    }

    var scrollingElement = document.scrollingElement || document.documentElement;
    var frames = [];
    var cursor = target;

    while (isElement(cursor) && checkBoundary(cursor)) {
      cursor = cursor.parentNode;

      if (cursor === scrollingElement) {
        frames.push(cursor);
        break;
      }

      if (cursor === document.body && isScrollable(cursor) && !isScrollable(document.documentElement)) {
        continue;
      }

      if (isScrollable(cursor, skipOverflowHiddenElements)) {
        frames.push(cursor);
      }
    }

    var viewportWidth = window.visualViewport ? visualViewport.width : innerWidth;
    var viewportHeight = window.visualViewport ? visualViewport.height : innerHeight;
    var viewportX = window.scrollX || pageXOffset;
    var viewportY = window.scrollY || pageYOffset;

    var _target$getBoundingCl = target.getBoundingClientRect(),
        targetHeight = _target$getBoundingCl.height,
        targetWidth = _target$getBoundingCl.width,
        targetTop = _target$getBoundingCl.top,
        targetRight = _target$getBoundingCl.right,
        targetBottom = _target$getBoundingCl.bottom,
        targetLeft = _target$getBoundingCl.left;

    var targetBlock = block === 'start' || block === 'nearest' ? targetTop : block === 'end' ? targetBottom : targetTop + targetHeight / 2;
    var targetInline = inline === 'center' ? targetLeft + targetWidth / 2 : inline === 'end' ? targetRight : targetLeft;
    var computations = [];

    for (var index = 0; index < frames.length; index++) {
      var frame = frames[index];

      var _frame$getBoundingCli = frame.getBoundingClientRect(),
          _height = _frame$getBoundingCli.height,
          _width = _frame$getBoundingCli.width,
          _top = _frame$getBoundingCli.top,
          right = _frame$getBoundingCli.right,
          bottom = _frame$getBoundingCli.bottom,
          _left = _frame$getBoundingCli.left;

      if (scrollMode === 'if-needed' && targetTop >= 0 && targetLeft >= 0 && targetBottom <= viewportHeight && targetRight <= viewportWidth && targetTop >= _top && targetBottom <= bottom && targetLeft >= _left && targetRight <= right) {
        return computations;
      }

      var frameStyle = getComputedStyle(frame);
      var borderLeft = parseInt(frameStyle.borderLeftWidth, 10);
      var borderTop = parseInt(frameStyle.borderTopWidth, 10);
      var borderRight = parseInt(frameStyle.borderRightWidth, 10);
      var borderBottom = parseInt(frameStyle.borderBottomWidth, 10);
      var blockScroll = 0;
      var inlineScroll = 0;
      var scrollbarWidth = 'offsetWidth' in frame ? frame.offsetWidth - frame.clientWidth - borderLeft - borderRight : 0;
      var scrollbarHeight = 'offsetHeight' in frame ? frame.offsetHeight - frame.clientHeight - borderTop - borderBottom : 0;

      if (scrollingElement === frame) {
        if (block === 'start') {
          blockScroll = targetBlock;
        } else if (block === 'end') {
          blockScroll = targetBlock - viewportHeight;
        } else if (block === 'nearest') {
          blockScroll = alignNearest(viewportY, viewportY + viewportHeight, viewportHeight, borderTop, borderBottom, viewportY + targetBlock, viewportY + targetBlock + targetHeight, targetHeight);
        } else {
          blockScroll = targetBlock - viewportHeight / 2;
        }

        if (inline === 'start') {
          inlineScroll = targetInline;
        } else if (inline === 'center') {
          inlineScroll = targetInline - viewportWidth / 2;
        } else if (inline === 'end') {
          inlineScroll = targetInline - viewportWidth;
        } else {
          inlineScroll = alignNearest(viewportX, viewportX + viewportWidth, viewportWidth, borderLeft, borderRight, viewportX + targetInline, viewportX + targetInline + targetWidth, targetWidth);
        }

        blockScroll = Math.max(0, blockScroll + viewportY);
        inlineScroll = Math.max(0, inlineScroll + viewportX);
      } else {
        if (block === 'start') {
          blockScroll = targetBlock - _top - borderTop;
        } else if (block === 'end') {
          blockScroll = targetBlock - bottom + borderBottom + scrollbarHeight;
        } else if (block === 'nearest') {
          blockScroll = alignNearest(_top, bottom, _height, borderTop, borderBottom + scrollbarHeight, targetBlock, targetBlock + targetHeight, targetHeight);
        } else {
          blockScroll = targetBlock - (_top + _height / 2) + scrollbarHeight / 2;
        }

        if (inline === 'start') {
          inlineScroll = targetInline - _left - borderLeft;
        } else if (inline === 'center') {
          inlineScroll = targetInline - (_left + _width / 2) + scrollbarWidth / 2;
        } else if (inline === 'end') {
          inlineScroll = targetInline - right + borderRight + scrollbarWidth;
        } else {
          inlineScroll = alignNearest(_left, right, _width, borderLeft, borderRight + scrollbarWidth, targetInline, targetInline + targetWidth, targetWidth);
        }

        var scrollLeft = frame.scrollLeft,
            scrollTop = frame.scrollTop;
        blockScroll = Math.max(0, Math.min(scrollTop + blockScroll, frame.scrollHeight - _height + scrollbarHeight));
        inlineScroll = Math.max(0, Math.min(scrollLeft + inlineScroll, frame.scrollWidth - _width + scrollbarWidth));
        targetBlock += scrollTop - blockScroll;
        targetInline += scrollLeft - inlineScroll;
      }

      computations.push({
        el: frame,
        top: blockScroll,
        left: inlineScroll
      });
    }

    return computations;
  });

  var escaped = function (text) { return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); };

  function genKeywordRegExp(keyword, exact) {
    if ( exact === void 0 ) exact = false;

    if (!keyword || !(keyword = keyword.trim())) {
      return null
    } else {
      var keywords = [keyword];
      if (!exact) {
        keywords = keywords.concat(
          keyword.split(' ').filter(function (word) { return word; })
        );
      }
      var escapedKeywords = keywords.map(function (word) { return escaped(word); });
      return new RegExp(escapedKeywords.join('|'), 'gi')
    }
  }

  function mark(
    text,
    keyword,
    tplFn,
    /* istanbul ignore next */
    exact
  ) {
    if ( tplFn === void 0 ) tplFn = function (match) { return ("<mark>" + match + "</mark>"); };
    if ( exact === void 0 ) exact = false;

    var keywordReg = genKeywordRegExp(keyword, exact);
    return keywordReg
      ? text.replace(keywordReg, tplFn)
      : text
  }

  function markMatch(text, keyword, tplFn) {
    return mark(text, keyword, tplFn)
  }

  function markExactMatch(text, keyword, tplFn) {
    return mark(text, keyword, tplFn, true)
  }

  function hasMatch(text, keyword) {
    var keywordReg = genKeywordRegExp(keyword);
    return !!keywordReg && keywordReg.test(text)
  }

  function hasExactMatch(text, keyword) {
    var keywordReg = genKeywordRegExp(keyword, true);
    return !!keywordReg && keywordReg.test(text)
  }

  var markMatch_1 = {
    markMatch: markMatch,
    markExactMatch: markExactMatch,
    hasMatch: hasMatch,
    hasExactMatch: hasExactMatch
  };
  var markMatch_2 = markMatch_1.markMatch;
  var markMatch_3 = markMatch_1.markExactMatch;
  var markMatch_4 = markMatch_1.hasMatch;
  var markMatch_5 = markMatch_1.hasExactMatch;

  function isPromise(val) {
    return (
      !!val &&
      (typeof val === 'object' || typeof val === 'function') &&
      typeof val.then === 'function'
    )
  }

  function isFunction(val) {
    return typeof val === 'function'
  }

  function isArray$1(val) {
    return Array.isArray(val)
  }

  function getObjVal(obj, key) {
    return key ? obj[key] : obj
  }

  //

  var script = {
    name: 'ItemListSelector',

    components: {
      VirtualList: vueVirtualScrollList
    },

    model: {
      prop: 'value',
      event: 'change'
    },

    props: {
      value: {
        default: function () { return []; }
      },
      optionsData: {
        type: [Array, Function, Promise],
        default: function () { return []; }
      },
      multiple: {
        type: Boolean,
        default: true
      },
      loadingText: {
        type: String,
        default: 'Loading...'
      },
      notFoundText: {
        type: String,
        default: 'No results'
      },
      searchText: {
        type: String,
        default: 'Search'
      },
      splitKeyword: {
        type: Boolean,
        default: true
      },
      matchTemplate: {
        type: Function,
        default: function (t) { return ("<mark>" + t + "</mark>"); }
      },
      labelKey: {
        type: String,
        default: 'label'
      },
      valueKey: {
        type: String
      },
      filterMethod: {
        type: Function
      },
      optionTemplate: {
        type: Function
      },
      optionHeight: {
        type: Number,
        default: 34
      },
      optionsRemain: {
        type: Number,
        default: 6
      },
      optionsBench: {
        type: Number,
        default: 6
      }
    },

    data: function data() {
      return {
        internalValue: [],
        internalOptions: [],
        loading: false,
        keyword: '',
        debounceKeyword: '',
        startIndex: 0,
        activeIndex: -1
      }
    },

    computed: {
      filtedData: function filtedData() {
        var this$1 = this;

        var keyword = this.debounceKeyword;
        if (!keyword) {
          return this.internalOptions
        } else {
          var filterMethod;
          if (this.filterMethod) {
            filterMethod = this.filterMethod;
          } else {
            var matchFn = this.splitKeyword ? markMatch_4 : markMatch_5;
            filterMethod = function (option, kw) {
              var optionStr;
              try {
                optionStr = this$1.optionToString(option).toString();
              } catch (e) {}
              return optionStr && matchFn(optionStr, kw)
            };
          }
          return this.internalOptions.filter(function (option) { return filterMethod(option, keyword); }
          )
        }
      },
      optionToString: function optionToString() {
        var this$1 = this;

        return (
          this.optionTemplate ||
          (function (option) { return isPlainObject(option) && this$1.labelKey
              ? option[this$1.labelKey]
              : option; })
        )
      }
    },

    watch: {
      keyword: function keyword() {
        this.throttleKeyword();
      },
      debounceKeyword: function debounceKeyword() {
        this.startIndex = 0;
        this.activeIndex = -1;
      },
      value: 'initValue',
      optionsData: 'initOptionsData'
    },

    created: function created() {
      /* istanbul ignore if */
      if (this.multiple && !Array.isArray(this.value)) {
        // eslint-disable-next-line no-console
        console.error(
          '[ItemListSelect error] Expected array with v-model/value in multiple mode, got ' +
            typeof this.value +
            ' with value',
          this.value
        );
      }
      this.initOptionsData();
    },

    methods: {
      initOptionsData: function initOptionsData() {
        var this$1 = this;

        var done = function (newOptions) {
          /* istanbul ignore else */
          if (Array.isArray(newOptions)) {
            this$1.internalOptions = newOptions;
            this$1.loading = false;
            this$1.initValue();
          }
        };
        var optionsData = this.optionsData;
        /* istanbul ignore else */
        if (isArray$1(optionsData)) {
          done(optionsData);
        } else if (isFunction(optionsData)) {
          this.loading = true;
          var fnResult = optionsData(done);
          if (isPromise(fnResult)) {
            fnResult.then(function (data) { return done(data); });
          }
        } else if (isPromise(optionsData)) {
          this.loading = true;
          optionsData.then(function (data) { return done(data); });
        }
      },

      initValue: function initValue() {
        var this$1 = this;

        if (this.multiple) {
          this.internalValue = this.internalOptions.filter(
            function (option) { return this$1.value.indexOf(getObjVal(option, this$1.valueKey)) > -1; }
          );
        } else {
          var val = this.internalOptions.find(
            function (option) { return this$1.value === getObjVal(option, this$1.valueKey); }
          );
          this.internalValue = val ? [val] : [];
        }
        this.syncValue(this.internalValue);
      },

      syncValue: function syncValue(newVal) {
        var this$1 = this;

        if (!fastDeepEqual(newVal, this.internalValue)) {
          var emitVal;
          if (this.multiple) {
            emitVal = this.valueKey
              ? newVal.map(function (option) { return getObjVal(option, this$1.valueKey); })
              : newVal;
          } else {
            emitVal = getObjVal(newVal[0], this.valueKey);
          }
          this.internalValue = newVal;
          this.$emit('change', emitVal);
        }
      },

      throttleKeyword: throttle(300, function() {
        this.debounceKeyword = this.keyword;
      }),

      isSelected: function isSelected(item) {
        return this.internalValue.indexOf(item) > -1
      },

      highlightMatch: function highlightMatch(text) {
        var matchFn = this.splitKeyword ? markMatch_2 : markMatch_3;
        return this.debounceKeyword
          ? matchFn(text, this.debounceKeyword, this.matchTemplate)
          : text
      },

      activePrevOptions: function activePrevOptions() {
        if (this.activeIndex > 0) {
          this.activeIndex--;
          this.scrollActiveOptionToView('prev');
        } else {
          this.activeIndex = this.filtedData.length - 1;
          this.startIndex = this.filtedData.length;
        }
      },

      activeNextOptions: function activeNextOptions() {
        if (this.activeIndex < this.filtedData.length - 1) {
          this.activeIndex++;
          this.scrollActiveOptionToView('next');
        } else {
          this.activeIndex = 0;
          this.startIndex = 0;
        }
      },

      toggleSelection: function toggleSelection(index) {
        var targetItem = this.filtedData[index];
        // istanbul ignore if
        if (!targetItem) { return }

        var newSelection = [];
        if (this.multiple) {
          var valueIndex = this.internalValue.indexOf(targetItem);
          if (valueIndex > -1) {
            newSelection = this.internalValue.slice(0, valueIndex).concat( this.internalValue.slice(valueIndex + 1)
            );
          } else {
            newSelection = ( this.internalValue ).concat( [targetItem]);
          }
        } else {
          newSelection = [targetItem];
        }
        this.syncValue(newSelection);
      },

      scrollActiveOptionToView: function scrollActiveOptionToView() {
        var this$1 = this;

        this.$nextTick().then(function () {
          var options = this$1.$refs.options.$el;
          var option = options.querySelector('.item-selector__option--active');
          try {
            var actions = computeScrollIntoView(option, {
              scrollMode: 'if-needed',
              block: 'nearest',
              inline: 'nearest'
            });
            actions.forEach(function (ref) {
              var el = ref.el;
              var top = ref.top;
              var left = ref.left;

              el.scrollTop = top;
              el.scrollLeft = left;
            });
          } catch (error) {}
        });
      },

      setValue: function setValue(filterFn) {
        // istanbul ignore if
        if (typeof filterFn !== 'function') {
          throw Error(
            '[ItemListSelect Error] "setValue()" accept a function as argument.'
          )
        }
        var newSelection = this.internalOptions.filter(filterFn);
        this.syncValue(newSelection);
      },

      addValue: function addValue(filterFn) {
        // istanbul ignore if
        if (!this.multiple) {
          throw Error(
            '[ItemListSelect Error] "addValue()" only works on multiple mode.'
          )
        }
        // istanbul ignore if
        if (typeof filterFn !== 'function') {
          throw Error(
            '[ItemListSelect Error] "addValue()" accept a function as argument.'
          )
        }
        var filtedSelection = this.internalOptions.filter(filterFn);
        var newSelection = [].concat( new Set(( this.internalValue ).concat( filtedSelection)) );
        this.syncValue(newSelection);
      },

      removeValue: function removeValue(filterFn) {
        // istanbul ignore if
        if (typeof filterFn !== 'function') {
          throw Error(
            '[ItemListSelect Error] "removeValue()" accept a function as argument.'
          )
        }
        var newSelection = this.internalValue.filter(function (item) { return !filterFn(item); });
        this.syncValue(newSelection);
      },

      reset: function reset() {
        this.keyword = '';
        this.syncValue([]);
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD;
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) { style.element.setAttribute('media', css.media); }

        if (HEAD === undefined) {
          HEAD = document.head || document.getElementsByTagName('head')[0];
        }

        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) { style.element.removeChild(nodes[index]); }
        if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
      }
    }
  }

  var browser = createInjector;

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"item-selector",on:{"keydown":[function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();return _vm.activePrevOptions($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();return _vm.activeNextOptions($event)},function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.toggleSelection(_vm.activeIndex)}]}},[_c('div',{staticClass:"item-selector__searchbar"},[(_vm.keyword !== '')?_c('span',{staticClass:"item-selector__searchbar-clean",on:{"click":function($event){_vm.keyword = '';}}}):_vm._e(),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.keyword),expression:"keyword",modifiers:{"trim":true}}],attrs:{"placeholder":_vm.searchText,"type":"text"},domProps:{"value":(_vm.keyword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.keyword=$event.target.value.trim();},"blur":function($event){return _vm.$forceUpdate()}}})]),_vm._v(" "),(_vm.filtedData.length === 0)?_c('div',{staticClass:"item-selector__options--empty"},[_vm._v("\n    "+_vm._s(_vm.loading ? _vm.loadingText : _vm.notFoundText)+"\n  ")]):_c('virtual-list',{key:_vm.debounceKeyword,ref:"options",staticClass:"item-selector__options-wrap",attrs:{"start":_vm.startIndex,"size":_vm.optionHeight,"remain":_vm.optionsRemain,"bench":_vm.optionsBench,"wtag":"ul","wclass":"item-selector__options"}},_vm._l((_vm.filtedData),function(option,index){return _c('li',{key:index,class:[
          'item-selector__option',
          {
            'item-selector__option--checked': _vm.isSelected(option),
            'item-selector__option--active': index === _vm.activeIndex
          }
        ],on:{"click":function($event){return _vm.toggleSelection(index)},"mouseenter":function($event){_vm.activeIndex = index;}}},[_vm._t("option-template",[_c('span',{domProps:{"innerHTML":_vm._s(_vm.highlightMatch(_vm.optionToString(option)))}})],null,{
            option: option,
            keyword: _vm.keyword,
            selected: _vm.isSelected(option),
            markedHtml: _vm.highlightMatch(_vm.optionToString(option))
          })],2)}),0)],1)};
  var __vue_staticRenderFns__ = [];

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-93b85f12_0", { source: ".item-selector{position:relative;line-height:1;background-color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;overflow:hidden;font-size:14px}.item-selector__searchbar{position:relative;margin:8px}.item-selector__searchbar input{background-color:#fff;border-radius:4px;border:1px solid #dcdfe6;-webkit-box-sizing:border-box;box-sizing:border-box;color:#606266;display:inline-block;font-size:inherit;height:32px;line-height:32px;outline:0;padding:0 15px;-webkit-transition:border-color .2s cubic-bezier(.645,.045,.355,1);transition:border-color .2s cubic-bezier(.645,.045,.355,1);width:100%}.item-selector__searchbar input:focus{border-color:#409eff}.item-selector__searchbar input::-webkit-input-placeholder{color:#bdc2ca}.item-selector__searchbar input::-moz-placeholder{color:#bdc2ca}.item-selector__searchbar input:-ms-input-placeholder{color:#bdc2ca}.item-selector__searchbar input::-ms-input-placeholder{color:#bdc2ca}.item-selector__searchbar input::placeholder{color:#bdc2ca}.item-selector__searchbar-clean{width:20px;height:20px;line-height:20px;position:absolute;top:50%;right:5px;margin-top:-10px;text-align:center;cursor:pointer;opacity:.6}.item-selector__searchbar-clean:hover{opacity:1}.item-selector__searchbar-clean::after,.item-selector__searchbar-clean::before{content:'';position:absolute;width:16px;height:1px;background-color:#999;left:50%;top:50%;margin-left:-8px}.item-selector__searchbar-clean::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}.item-selector__searchbar-clean::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.item-selector__options-wrap{border-top:#e2e6ec 1px solid}.item-selector__options{margin:0;padding:0;list-style:none}.item-selector__options--empty{margin:0;line-height:34px;text-align:center;color:#999;font-size:14px}.item-selector__option{font-size:14px;padding:0 15px;position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#606266;height:34px;line-height:34px;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer}.item-selector__option--active,.item-selector__option:hover{background-color:#f5f7fa}.item-selector__option::after{position:absolute;top:50%;right:15px;display:none;width:6px;height:12px;margin-top:-8px;content:'';-webkit-transform:rotate(45deg);transform:rotate(45deg);text-align:center;border:solid #ddd;border-width:0 1px 1px 0}.item-selector__option--checked{color:#409eff;font-weight:700}.item-selector__option--checked::after{display:block;border-color:#409eff}.item-selector mark{background-color:#ff0}", map: undefined, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var Component = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  Component.install = function(Vue) {
    Vue.component(Component.name, Component);
  };

  if (typeof window !== 'undefined' && window.Vue) {
    Component.install(window.Vue);
  }

  return Component;

}));
