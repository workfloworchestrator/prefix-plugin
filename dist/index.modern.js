import { EuiCheckbox, EuiButton, EuiPopover, EuiFieldSearch } from '@elastic/eui';
import axios from 'axios';
import React from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var styles = {"euiButton--primary":"_3Cgwt","euiButton--fill":"_3qua2","euiButton--warning":"_fOrJq","euiButton":"_37gE4","euiTitle":"_3yMaR","options":"_f38L4","refresh":"_3pDor","checkbox":"_3uj6E","Allocated":"_1MDQm","Planned":"_3c6cb","Free":"_3Ywdt","selected":"_1SK_c","customer":"_1RpR0","sub_id":"_cMUwr","description":"_2DObb","fam":"_1cDYD","len":"_2V-VL","prefix":"_1wS4e","parent":"_1cfEB","status":"_3yn0Y","start_date":"_2xuGq","fa":"_1lCBP","fa-info-circle":"_3JOUY","tool-tip":"_1pDwC","show":"_31OzJ","label":"_3F5uN","value":"_3Anr1","prefixes":"_usmYq","new":"_2HSQ6","fa-plus":"_1Pye7"};

var apiPath = 'http://localhost:8080/api/';
var axiosConfig = {
  baseURL: apiPath,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    post: {
      'Content-Type': 'application/json'
    },
    put: {
      'Content-Type': 'application/json'
    }
  }
};
var axiosInstance = axios.create(axiosConfig);

function fetchJson(path, options, headers, showErrorDialog, result) {
  if (options === void 0) {
    options = {};
  }

  if (headers === void 0) {
    headers = {};
  }

  if (showErrorDialog === void 0) {
    showErrorDialog = true;
  }

  if (result === void 0) {
    result = true;
  }

  return axiosFetch(path, options, headers, showErrorDialog, result);
}

function axiosFetch(path, options, headers, showErrorDialog, result) {
  if (options === void 0) {
    options = {};
  }

  if (headers === void 0) {
    headers = {};
  }

  if (showErrorDialog === void 0) {
    showErrorDialog = true;
  }

  if (result === void 0) {
    result = true;
  }

  console.log(headers, result);
  return axiosInstance(_extends({
    url: path,
    method: 'GET'
  }, options)).then(function (res) {
    return res.data;
  })["catch"](function (err) {
    if (showErrorDialog) {
      setTimeout(function () {
        throw err;
      }, 250);
    }

    throw err;
  });
}

function organisations() {
  return fetchJson('crm/organisations', {}, {}, false);
}
function products() {
  return fetchJson('products/');
}
function prefixFilters() {
  return fetchJson('ipam/prefix_filters');
}
function prefixSubscriptionsByRootPrefix(parentId) {
  return fetchJson("ipam/prefix_subscriptions/" + parentId);
}
function freeSubnets(supernet) {
  return fetchJson("ipam/free_subnets/" + supernet);
}

var styles$1 = {"euiButton--primary":"_3suZm","euiButton--fill":"_-O0TT","euiButton--warning":"_2H7dM","euiButton":"_36frK","euiTitle":"_1x6qN","filterButton":"_nveuL","dropDown":"_1PhQf"};

var FilterDropDown = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(FilterDropDown, _React$PureComponent);

  function FilterDropDown() {
    var _this;

    _this = _React$PureComponent.apply(this, arguments) || this;
    _this.state = {
      dropDownActive: false
    };

    _this.renderDropDownItem = function (item, filterBy) {
      return React.createElement("li", {
        key: item.name,
        onClick: function onClick() {
          return filterBy(item);
        }
      }, React.createElement(EuiCheckbox, {
        title: item.name,
        id: item.name,
        checked: item.selected,
        label: item.name + " " + item.count,
        onChange: function onChange() {
          return filterBy(item);
        }
      }));
    };

    _this.renderDropDown = function (items, filterBy) {
      return React.createElement("ul", {
        className: styles$1.dropDown
      }, items.map(function (item) {
        return _this.renderDropDownItem(item, filterBy);
      }));
    };

    return _this;
  }

  var _proto = FilterDropDown.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        items = _this$props.items,
        filterBy = _this$props.filterBy;
    var dropDownActive = this.state.dropDownActive;
    var filtered = items.filter(function (item) {
      return item.selected;
    });
    var name = filtered.length === items.length ? 'ALL' : 'FILTERED';
    var button = React.createElement(EuiButton, {
      iconType: dropDownActive ? 'arrowUp' : 'arrowDown',
      iconSide: 'right',
      fullWidth: true,
      onClick: function onClick() {
        return _this2.setState({
          dropDownActive: !dropDownActive
        });
      }
    }, name);
    return React.createElement(EuiPopover, {
      button: button,
      isOpen: dropDownActive,
      closePopover: function closePopover() {
        return _this2.setState({
          dropDownActive: false
        });
      },
      className: styles$1.filterButton
    }, this.renderDropDown(items, filterBy));
  };

  return FilterDropDown;
}(React.PureComponent);

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var constant_1 = constant;

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return _root.Date.now();
};

var now_1 = now;

/** Used to match a single whitespace character. */
var reWhitespace = /\s/;

/**
 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
 * character of `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the index of the last non-whitespace character.
 */
function trimmedEndIndex(string) {
  var index = string.length;

  while (index-- && reWhitespace.test(string.charAt(index))) {}
  return index;
}

var _trimmedEndIndex = trimmedEndIndex;

/** Used to match leading whitespace. */
var reTrimStart = /^\s+/;

/**
 * The base implementation of `_.trim`.
 *
 * @private
 * @param {string} string The string to trim.
 * @returns {string} Returns the trimmed string.
 */
function baseTrim(string) {
  return string
    ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string;
}

var _baseTrim = baseTrim;

/** Built-in value references. */
var Symbol$1 = _root.Symbol;

var _Symbol = Symbol$1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
}

var isSymbol_1 = isSymbol;

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol_1(value)) {
    return NAN;
  }
  if (isObject_1(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject_1(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = _baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

var toNumber_1 = toNumber;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber_1(wait) || 0;
  if (isObject_1(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now_1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now_1());
  }

  function debounced() {
    var time = now_1(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

var debounce_1 = debounce;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Error message constants. */
var FUNC_ERROR_TEXT$1 = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

const pMap = (iterable, mapper, options) => new Promise((resolve, reject) => {
	options = Object.assign({
		concurrency: Infinity
	}, options);

	if (typeof mapper !== 'function') {
		throw new TypeError('Mapper function is required');
	}

	const {concurrency} = options;

	if (!(typeof concurrency === 'number' && concurrency >= 1)) {
		throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${concurrency}\` (${typeof concurrency})`);
	}

	const ret = [];
	const iterator = iterable[Symbol.iterator]();
	let isRejected = false;
	let isIterableDone = false;
	let resolvingCount = 0;
	let currentIndex = 0;

	const next = () => {
		if (isRejected) {
			return;
		}

		const nextItem = iterator.next();
		const i = currentIndex;
		currentIndex++;

		if (nextItem.done) {
			isIterableDone = true;

			if (resolvingCount === 0) {
				resolve(ret);
			}

			return;
		}

		resolvingCount++;

		Promise.resolve(nextItem.value)
			.then(element => mapper(element, i))
			.then(
				value => {
					ret[i] = value;
					resolvingCount--;
					next();
				},
				error => {
					isRejected = true;
					reject(error);
				}
			);
	};

	for (let i = 0; i < concurrency; i++) {
		next();

		if (isIterableDone) {
			break;
		}
	}
});

var pMap_1 = pMap;
// TODO: Remove this for the next major release
var _default = pMap;
pMap_1.default = _default;

function stop(e) {
  if (e !== undefined && e !== null) {
    e.preventDefault();
    e.stopPropagation();
  }
}
function isEmpty(obj) {
  if (obj === undefined || obj === null) {
    return true;
  }

  if (Array.isArray(obj)) {
    return obj.length === 0;
  }

  if (typeof obj === 'string') {
    return obj.trim().length === 0;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }

  return false;
}
var UUIDv4RegEx = /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
function isValidUUIDv4(id) {
  return UUIDv4RegEx.test(id);
}

var classNames = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else {
		window.classNames = classNames;
	}
}());
});

function organisationNameByUuid(uuid, organisations) {
  var organisation = organisations && organisations.find(function (org) {
    return org.uuid === uuid;
  });
  return organisation ? organisation.name : uuid;
}
function renderDate(epoch) {
  return isEmpty(epoch) ? '' : new Date(epoch * 1000).toLocaleDateString('nl-NL') + ' CET';
}
var ipamStates = ['Free', 'Allocated', null, 'Planned', null, null];
var familyFullName = ['N/A', 'N/A', 'N/A', 'N/A', 'IPv4', 'N/A', 'IPv6'];
function ipAddressToNumber(ipAddress) {
  var octets = ipAddress.split('.');

  if (octets.length === 4) {
    return parseInt(octets[0], 10) * 16777216 + parseInt(octets[1], 10) * 65536 + parseInt(octets[2], 10) * 256 + parseInt(octets[3], 10);
  } else {
    var hextets = ipAddress.split(':');
    var power;
    var result = 0;

    for (power = 128 - 16; hextets.length > 0; power = power - 16) {
      var hextet = parseInt(hextets[0], 16);

      if (!isNaN(hextet)) {
        result += hextet * Math.pow(2, power);
      }

      hextets.shift();
    }

    return result;
  }
}

var Prefixes = /*#__PURE__*/function (_React$PureComponent) {
  _inheritsLoose(Prefixes, _React$PureComponent);

  function Prefixes() {
    var _this;

    _this = _React$PureComponent.apply(this, arguments) || this;
    _this.state = {
      prefixes: [],
      organisations: _this.props.organisations,
      products: _this.props.products,
      query: '',
      searchResults: [],
      sortOrder: {
        name: 'prefix',
        descending: false
      },
      filterAttributes: {
        state: ipamStates.filter(function (s) {
          return s;
        }).map(function (state) {
          return {
            name: state || '',
            selected: state === 'Allocated',
            count: 0
          };
        }),
        rootPrefix: []
      },
      rootPrefixes: [],
      availablePrefixId: 10000
    };

    _this.getOrganisations = function () {
      try {
        return Promise.resolve(organisations().then(function (result) {
          return _this.setState({
            organisations: result
          });
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };

    _this.getProducts = function () {
      try {
        return Promise.resolve(products().then(function (result) {
          return _this.setState({
            products: result
          });
        })).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    };

    _this.getPrefixSubscriptions = function (roots) {
      try {
        var _organisations = _this.state.organisations;

        var mapper = function mapper(root) {
          try {
            return Promise.resolve(prefixSubscriptionsByRootPrefix(root.id).then(function (result) {
              return result.map(function (prefix) {
                var customer_id = prefix.customer_id,
                    start_date = prefix.start_date,
                    subscription_id = prefix.subscription_id;
                var organisation = customer_id === undefined ? 'Unknown' : organisationNameByUuid(customer_id, _organisations);
                var subscription = subscription_id === undefined ? 'Unknown' : subscription_id;
                return _extends({}, prefix, {
                  subscription_id: subscription,
                  start_date_as_str: renderDate(start_date),
                  customer: organisation
                });
              });
            }).then(function (result) {
              _this.setState(function (prevState) {
                var newPrefixes = prevState.prefixes.concat(result);
                newPrefixes = Array.from(new Set(newPrefixes.map(function (p) {
                  return p.id;
                }))).map(function (id) {
                  return newPrefixes.find(function (s) {
                    return s.id === id;
                  });
                });
                return {
                  prefixes: newPrefixes
                };
              });
            })["catch"](function () {
              console.log("failed to load prefix " + root.id);
            })).then(function () {});
          } catch (e) {
            return Promise.reject(e);
          }
        };

        return Promise.resolve(pMap_1(roots, mapper, {
          concurrency: 2,
          stopOnError: false
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    };

    _this.getFreePrefixes = function (roots) {
      var now = Math.floor(Date.now() / 1000);
      var nowString = renderDate(now);
      return roots.map(function (p) {
        return freeSubnets(p.prefix).then(function (result) {
          var availablePrefixId = _this.state.availablePrefixId;
          var free = result.map(function (r, idx) {
            var _r$split = r.split('/'),
                networkAddress = _r$split[0],
                prefixlen = _r$split[1];

            return {
              id: availablePrefixId + idx,
              customer: 'N/A',
              subscription_id: 'N/A',
              start_date: now,
              start_date_as_str: nowString,
              description: 'Vrije ruimte - gegenereerd',
              family: p.version,
              prefix: r,
              network_address_as_int: ipAddressToNumber(networkAddress),
              prefixlen: parseInt(prefixlen, 10),
              parent: p.prefix,
              state: ipamStates.indexOf('Free'),
              version: 4,
              name: '',
              product: {},
              product_id: '',
              status: '',
              insync: false,
              customer_id: '',
              end_date: now,
              note: ''
            };
          });

          _this.setState(function (prevState) {
            return {
              prefixes: prevState.prefixes.concat(free),
              availablePrefixId: prevState.availablePrefixId + free.length
            };
          });
        });
      });
    };

    _this.count = function () {
      var _this$state = _this.state,
          prefixes = _this$state.prefixes,
          filterAttributes = _this$state.filterAttributes;
      var state = filterAttributes.state,
          rootPrefix = filterAttributes.rootPrefix;
      var stateCount = state.map(function (attr) {
        var newCount = prefixes.reduce(function (acc, p) {
          return ipamStates[p.state] === attr.name ? acc + 1 : acc;
        }, 0);
        return newCount === attr.count ? attr : _extends({}, attr, {
          count: newCount
        });
      });
      var rootPrefixCount = rootPrefix.map(function (attr) {
        var newCount = prefixes.reduce(function (acc, p) {
          return p.parent === attr.name ? acc + 1 : acc;
        }, 0);
        return newCount === attr.count ? attr : _extends({}, attr, {
          count: newCount
        });
      });

      _this.setState({
        filterAttributes: {
          state: stateCount,
          rootPrefix: rootPrefixCount
        }
      });
    };

    _this.debouncedCount = debounce_1(_this.count, 1500, {
      leading: true,
      trailing: true
    });

    _this.setFilter = function (filterName) {
      return function (item) {
        var currentFilterAttributes = _this.state.filterAttributes;
        var modifiedAttributes = {};
        modifiedAttributes[filterName] = currentFilterAttributes[filterName].map(function (attr) {
          if (attr.name === item.name) {
            attr.selected = !attr.selected;
          }

          return attr;
        });

        _this.setState({
          filterAttributes: _extends({}, currentFilterAttributes, modifiedAttributes)
        });
      };
    };

    _this.singleSelectFilter = function (filterName) {
      return function (e, item) {
        stop(e);
        var currentFilterAttributes = _this.state.filterAttributes;
        var modifiedAttributes = {};
        modifiedAttributes[filterName] = currentFilterAttributes[filterName].map(function (attr) {
          if (attr.name !== item.name && attr.selected) {
            attr.selected = false;
          } else if (attr.name === item.name && !attr.selected) {
            attr.selected = true;
          }

          return attr;
        });

        _this.setState({
          filterAttributes: _extends({}, currentFilterAttributes, modifiedAttributes)
        });
      };
    };

    _this.selectAll = function (filterName) {
      return function (e) {
        stop(e);
        var currentFilterAttributes = _this.state.filterAttributes;
        var modifiedAttributes = {};
        modifiedAttributes[filterName] = currentFilterAttributes[filterName].map(function (attr) {
          if (!attr.selected) {
            attr.selected = true;
          }

          return attr;
        });

        _this.setState({
          filterAttributes: _extends({}, currentFilterAttributes, modifiedAttributes)
        });
      };
    };

    _this.filter = function (unfiltered) {
      var state = _this.state.filterAttributes.state;
      return unfiltered.filter(function (prefix) {
        var stateFilter = state.find(function (attr) {
          return ipamStates.indexOf(attr.name) === prefix.state;
        });
        return stateFilter ? stateFilter.selected : true;
      });
    };

    _this.sortBy = function (name) {
      return function (a, b) {
        console.log(a, b, name);
      };
    };

    _this.toggleSort = function (name) {
      return function (e) {
        stop(e);

        var sortOrder = _extends({}, _this.state.sortOrder);

        sortOrder.descending = sortOrder.name === name ? !sortOrder.descending : false;
        sortOrder.name = name;

        _this.setState({
          sortOrder: sortOrder
        });
      };
    };

    _this.sort = function (unsorted) {
      return unsorted;
    };

    _this.search = function (e) {
      var query = e.target.value;

      _this.setState({
        query: query
      });

      _this.debouncedRunQuery(query);
    };

    _this.runQuery = function (query) {
      console.log(query);
      var prefixes = _this.state.prefixes;
      var queryToLower = query.toLowerCase();
      var results = prefixes.filter(function (prefix) {
        var _ipamStates$prefix$st;

        return prefix.prefix.toLowerCase().includes(queryToLower) || prefix.customer.toLowerCase().includes(queryToLower) || prefix.description !== null && prefix.description.toLowerCase().includes(queryToLower) || ((_ipamStates$prefix$st = ipamStates[prefix.state]) === null || _ipamStates$prefix$st === void 0 ? void 0 : _ipamStates$prefix$st.toLowerCase().includes(queryToLower)) || queryToLower === familyFullName[prefix.family].toLowerCase() || prefix.start_date_as_str.includes(query);
      });

      _this.setState({
        searchResults: results
      });
    };

    _this.debouncedRunQuery = debounce_1(_this.runQuery, 800);

    _this.sortColumnIcon = function (name, sorted) {
      if (sorted.name === name) {
        return React.createElement("i", {
          className: sorted.descending ? 'fas fa-sort-down' : 'fas fa-sort-up'
        });
      }

      return React.createElement("i", null);
    };

    _this.subscriptionLink = function (selection) {
      return function (_event) {
        var products = _this.state.products;
        var subscription_id = selection.subscription_id,
            prefix = selection.prefix,
            prefixlen = selection.prefixlen;
        var product_id = memoize_1(constant_1(products.filter(function (p) {
          return p.tag === 'IP_PREFIX';
        }).map(function (p) {
          return p.product_id;
        }).pop()))();

        if (isValidUUIDv4(subscription_id)) {
          window.location.href = '/subscriptions/' + subscription_id;
        } else if (subscription_id === 'N/A') {
          var network = prefix.split('/')[0];
          window.location.href = "new-process/?product=" + product_id + "&prefix=" + network + "&prefixlen=" + prefixlen + "&prefix_min=" + prefixlen;
        }
      };
    };

    return _this;
  }

  var _proto = Prefixes.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.state.organisations === undefined) {
      console.log('Prefixes:: No organisations props found => handling fetching of organisations internally');
      this.getOrganisations().then();
    }

    if (this.state.products === undefined) {
      console.log('Prefixes:: No products props found => handling fetching of products internally');
      this.getProducts().then();
    }

    prefixFilters().then(function (result) {
      var prefixFilters = result.map(function (p, idx) {
        return {
          name: p.prefix,
          selected: idx === 0,
          count: 0
        };
      });
      var currentFilterAttributes = _this2.state.filterAttributes;
      var modifiedAttributes = {
        rootPrefix: prefixFilters
      };

      _this2.setState({
        rootPrefixes: result,
        filterAttributes: _extends({}, currentFilterAttributes, modifiedAttributes)
      });

      _this2.getFreePrefixes(result);

      _this2.getPrefixSubscriptions(result).then();
    });
  };

  _proto.componentDidUpdate = function componentDidUpdate(_prevProps, prevState) {
    if (this.state.prefixes !== prevState.prefixes) {
      this.debouncedCount();
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var columns = ['customer', 'sub_id', 'description', 'fam', 'len', 'prefix', 'parent', 'state', 'start_date'];

    var th = function th(index) {
      var name = columns[index];
      return React.createElement("th", {
        key: index,
        className: styles[classNames(name)],
        onClick: _this3.toggleSort(name)
      }, React.createElement("span", null, name), _this3.sortColumnIcon(name, _this3.state.sortOrder));
    };

    var _this$state2 = this.state,
        prefixes = _this$state2.prefixes,
        query = _this$state2.query,
        searchResults = _this$state2.searchResults,
        filterAttributes = _this$state2.filterAttributes;
    var filteredPrefixes = isEmpty(query) ? this.filter(prefixes) : this.filter(searchResults);
    var sortedPrefixes = this.sort(filteredPrefixes);
    return React.createElement("div", null, React.createElement("div", {
      className: styles[classNames('options')]
    }, React.createElement(FilterDropDown, {
      items: filterAttributes.state,
      filterBy: this.setFilter('state'),
      selectAll: this.selectAll('state'),
      label: 'prefixes.filters.state'
    }), React.createElement(EuiFieldSearch, {
      placeholder: 'search',
      value: query,
      onChange: this.search,
      isClearable: true,
      fullWidth: true
    })), React.createElement("div", null, React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, columns.map(function (_column, index) {
      return th(index);
    }))), React.createElement("tbody", null, sortedPrefixes.map(function (prefix) {
      return React.createElement("tr", {
        key: prefix.id,
        onClick: _this3.subscriptionLink(prefix),
        className: prefix.state === 1 ? styles.Allocated : prefix.state === 2 ? styles.Planned : styles.Free
      }, React.createElement("td", {
        "data-label": 'customer',
        className: styles.customer
      }, prefix.customer), React.createElement("td", {
        "data-label": 'subscription_id',
        className: styles.sub_id
      }, prefix.subscription_id.substring(0, 8)), React.createElement("td", {
        "data-label": 'description',
        className: styles.description
      }, prefix.description), React.createElement("td", {
        "data-label": 'fam',
        className: styles.fam
      }, prefix.family), React.createElement("td", {
        "data-label": 'len',
        className: styles.len
      }, "/", prefix.prefixlen), React.createElement("td", {
        "data-label": 'prefix',
        className: styles.prefix
      }, prefix.prefix), React.createElement("td", {
        "data-label": 'parent',
        className: styles.parent
      }, prefix.parent), React.createElement("td", {
        "data-label": 'state',
        className: styles.status
      }, prefix.state), React.createElement("td", {
        "data-label": 'start_date',
        className: styles.start_date
      }, prefix.start_date_as_str));
    })))));
  };

  return Prefixes;
}(React.PureComponent);

export { Prefixes, organisations };
//# sourceMappingURL=index.modern.js.map
