(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /* proxy-compat-disable */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  function detect$1() {
    // Don't apply polyfill when ProxyCompat is enabled.
    if ('getKey' in Proxy) {
      return false;
    }

    const proxy = new Proxy([3, 4], {});
    const res = [1, 2].concat(proxy);
    return res.length !== 4;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    isConcatSpreadable
  } = Symbol;
  const {
    isArray: isArray$3
  } = Array;
  const {
    slice: ArraySlice$2,
    unshift: ArrayUnshift$2,
    shift: ArrayShift
  } = Array.prototype;

  function isObject$2(O) {
    return typeof O === 'object' ? O !== null : typeof O === 'function';
  } // https://www.ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable


  function isSpreadable(O) {
    if (!isObject$2(O)) {
      return false;
    }

    const spreadable = O[isConcatSpreadable];
    return spreadable !== undefined ? Boolean(spreadable) : isArray$3(O);
  } // https://www.ecma-international.org/ecma-262/6.0/#sec-array.prototype.concat


  function ArrayConcatPolyfill(..._args) {
    const O = Object(this);
    const A = [];
    let N = 0;
    const items = ArraySlice$2.call(arguments);
    ArrayUnshift$2.call(items, O);

    while (items.length) {
      const E = ArrayShift.call(items);

      if (isSpreadable(E)) {
        let k = 0;
        const length = E.length;

        for (k; k < length; k += 1, N += 1) {
          if (k in E) {
            const subElement = E[k];
            A[N] = subElement;
          }
        }
      } else {
        A[N] = E;
        N += 1;
      }
    }

    return A;
  }

  function apply() {
    // eslint-disable-next-line no-extend-native
    Array.prototype.concat = ArrayConcatPolyfill;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  if (detect$1()) {
    apply();
  }
  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function invariant$1(value, msg) {
    if (!value) {
      throw new Error(`Invariant Violation: ${msg}`);
    }
  }

  function isTrue$1$1(value, msg) {
    if (!value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function isFalse$1$1(value, msg) {
    if (value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function fail$1(msg) {
    throw new Error(msg);
  }

  var assert$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    invariant: invariant$1,
    isTrue: isTrue$1$1,
    isFalse: isFalse$1$1,
    fail: fail$1
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const {
    assign: assign$2,
    create: create$3,
    defineProperties: defineProperties$2,
    defineProperty: defineProperty$2,
    freeze: freeze$2,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$3,
    getOwnPropertyNames: getOwnPropertyNames$3,
    getPrototypeOf: getPrototypeOf$3,
    hasOwnProperty: hasOwnProperty$3,
    isFrozen: isFrozen$2,
    keys: keys$2,
    seal: seal$2,
    setPrototypeOf: setPrototypeOf$2
  } = Object;
  const {
    isArray: isArray$2
  } = Array;
  const {
    filter: ArrayFilter$1,
    find: ArrayFind$1,
    indexOf: ArrayIndexOf$2,
    join: ArrayJoin$1,
    map: ArrayMap$2,
    push: ArrayPush$3,
    reduce: ArrayReduce$1,
    reverse: ArrayReverse$1,
    slice: ArraySlice$1,
    splice: ArraySplice$2,
    unshift: ArrayUnshift$1,
    forEach: forEach$1
  } = Array.prototype;
  const {
    fromCharCode: StringFromCharCode$1
  } = String;
  const {
    charCodeAt: StringCharCodeAt$1,
    replace: StringReplace$1,
    slice: StringSlice$1,
    toLowerCase: StringToLowerCase$1
  } = String.prototype;

  function isUndefined$4(obj) {
    return obj === undefined;
  }

  function isNull$1(obj) {
    return obj === null;
  }

  function isFunction$2(obj) {
    return typeof obj === 'function';
  }

  function isObject$1(obj) {
    return typeof obj === 'object';
  }

  const OtS$2 = {}.toString;

  function toString$2(obj) {
    if (obj && obj.toString) {
      // Arrays might hold objects with "null" prototype So using
      // Array.prototype.toString directly will cause an error Iterate through
      // all the items and handle individually.
      if (isArray$2(obj)) {
        return ArrayJoin$1.call(ArrayMap$2.call(obj, toString$2), ',');
      }

      return obj.toString();
    } else if (typeof obj === 'object') {
      return OtS$2.call(obj);
    } else {
      return obj + '';
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
   * ariaGrabbed) are deprecated:
   * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
   *
   * The above list of 46 aria attributes is consistent with the following resources:
   * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
   * https://wicg.github.io/aom/spec/aria-reflection.html
   */


  const AriaPropertyNames$1 = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];

  const {
    AriaAttrNameToPropNameMap: AriaAttrNameToPropNameMap$1,
    AriaPropNameToAttrNameMap: AriaPropNameToAttrNameMap$1
  } = /*@__PURE__*/(() => {
    const AriaAttrNameToPropNameMap = create$3(null);
    const AriaPropNameToAttrNameMap = create$3(null); // Synthetic creation of all AOM property descriptors for Custom Elements

    forEach$1.call(AriaPropertyNames$1, propName => {
      const attrName = StringToLowerCase$1.call(StringReplace$1.call(propName, /^aria/, () => 'aria-'));
      AriaAttrNameToPropNameMap[attrName] = propName;
      AriaPropNameToAttrNameMap[propName] = attrName;
    });
    return {
      AriaAttrNameToPropNameMap,
      AriaPropNameToAttrNameMap
    };
  })();
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // We use this to detect symbol support in order to avoid the expensive symbol polyfill. Note that
  // we can't use typeof since it will fail when transpiling.


  const hasNativeSymbolSupport$1 = /*@__PURE__*/(() => Symbol('x').toString() === 'Symbol(x)')();
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // This method abstracts the creation of symbols, so we can fallback to strings when native symbols
  // are not supported.


  function createHiddenField$1(key, namespace) {
    return hasNativeSymbolSupport$1 ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
  }

  const hiddenFieldsMap$1 = new WeakMap();

  function setHiddenField$1(o, field, value) {
    let valuesByField = hiddenFieldsMap$1.get(o);

    if (isUndefined$4(valuesByField)) {
      valuesByField = create$3(null);
      hiddenFieldsMap$1.set(o, valuesByField);
    }

    valuesByField[field] = value;
  }

  function getHiddenField$1(o, field) {
    const valuesByField = hiddenFieldsMap$1.get(o);

    if (!isUndefined$4(valuesByField)) {
      return valuesByField[field];
    }
  }
  const KEY__SHADOW_TOKEN = '$shadowToken$';
  /**
   * Map composed of properties to attributes not following the HTML property to attribute mapping
   * convention.
   */

  const NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING$1 = new Map([['accessKey', 'accesskey'], ['readOnly', 'readonly'], ['tabIndex', 'tabindex'], ['bgColor', 'bgcolor'], ['colSpan', 'colspan'], ['rowSpan', 'rowspan'], ['contentEditable', 'contenteditable'], ['crossOrigin', 'crossorigin'], ['dateTime', 'datetime'], ['formAction', 'formaction'], ['isMap', 'ismap'], ['maxLength', 'maxlength'], ['minLength', 'minlength'], ['noValidate', 'novalidate'], ['useMap', 'usemap'], ['htmlFor', 'for']]);
  /**
   * Map associating previously transformed HTML property into HTML attribute.
   */

  const CACHED_PROPERTY_ATTRIBUTE_MAPPING$1 = new Map();

  function htmlPropertyToAttribute$1(propName) {
    const ariaAttributeName = AriaPropNameToAttrNameMap$1[propName];

    if (!isUndefined$4(ariaAttributeName)) {
      return ariaAttributeName;
    }

    const specialAttributeName = NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING$1.get(propName);

    if (!isUndefined$4(specialAttributeName)) {
      return specialAttributeName;
    }

    const cachedAttributeName = CACHED_PROPERTY_ATTRIBUTE_MAPPING$1.get(propName);

    if (!isUndefined$4(cachedAttributeName)) {
      return cachedAttributeName;
    }

    let attributeName = '';

    for (let i = 0, len = propName.length; i < len; i++) {
      const code = StringCharCodeAt$1.call(propName, i);

      if (code >= 65 && // "A"
      code <= 90 // "Z"
      ) {
          attributeName += '-' + StringFromCharCode$1(code + 32);
        } else {
        attributeName += StringFromCharCode$1(code);
      }
    }

    CACHED_PROPERTY_ATTRIBUTE_MAPPING$1.set(propName, attributeName);
    return attributeName;
  }
  /** version: 2.2.5 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function detect(propName) {
    return Object.getOwnPropertyDescriptor(Element.prototype, propName) === undefined;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const nodeToAriaPropertyValuesMap = new WeakMap();

  function getAriaPropertyMap(elm) {
    let map = nodeToAriaPropertyValuesMap.get(elm);

    if (map === undefined) {
      map = {};
      nodeToAriaPropertyValuesMap.set(elm, map);
    }

    return map;
  }

  function getNormalizedAriaPropertyValue(value) {
    return value == null ? null : String(value);
  }

  function createAriaPropertyPropertyDescriptor(propName, attrName) {
    return {
      get() {
        const map = getAriaPropertyMap(this);

        if (hasOwnProperty$3.call(map, propName)) {
          return map[propName];
        } // otherwise just reflect what's in the attribute


        return this.hasAttribute(attrName) ? this.getAttribute(attrName) : null;
      },

      set(newValue) {
        const normalizedValue = getNormalizedAriaPropertyValue(newValue);
        const map = getAriaPropertyMap(this);
        map[propName] = normalizedValue; // reflect into the corresponding attribute

        if (newValue === null) {
          this.removeAttribute(attrName);
        } else {
          this.setAttribute(attrName, newValue);
        }
      },

      configurable: true,
      enumerable: true
    };
  }

  function patch(propName) {
    // Typescript is inferring the wrong function type for this particular
    // overloaded method: https://github.com/Microsoft/TypeScript/issues/27972
    // @ts-ignore type-mismatch
    const attrName = AriaPropNameToAttrNameMap$1[propName];
    const descriptor = createAriaPropertyPropertyDescriptor(propName, attrName);
    Object.defineProperty(Element.prototype, propName, descriptor);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const ElementPrototypeAriaPropertyNames = keys$2(AriaPropNameToAttrNameMap$1);

  for (let i = 0, len = ElementPrototypeAriaPropertyNames.length; i < len; i += 1) {
    const propName = ElementPrototypeAriaPropertyNames[i];

    if (detect(propName)) {
      patch(propName);
    }
  }
  /* proxy-compat-disable */

  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function invariant(value, msg) {
    if (!value) {
      throw new Error(`Invariant Violation: ${msg}`);
    }
  }

  function isTrue$1(value, msg) {
    if (!value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function isFalse$1(value, msg) {
    if (value) {
      throw new Error(`Assert Violation: ${msg}`);
    }
  }

  function fail(msg) {
    throw new Error(msg);
  }

  var assert = /*#__PURE__*/Object.freeze({
    __proto__: null,
    invariant: invariant,
    isTrue: isTrue$1,
    isFalse: isFalse$1,
    fail: fail
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const {
    assign: assign$1,
    create: create$2,
    defineProperties: defineProperties$1,
    defineProperty: defineProperty$1,
    freeze: freeze$1,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$2,
    getOwnPropertyNames: getOwnPropertyNames$2,
    getPrototypeOf: getPrototypeOf$2,
    hasOwnProperty: hasOwnProperty$2,
    isFrozen: isFrozen$1,
    keys: keys$1,
    seal: seal$1,
    setPrototypeOf: setPrototypeOf$1
  } = Object;
  const {
    isArray: isArray$1
  } = Array;
  const {
    filter: ArrayFilter,
    find: ArrayFind,
    indexOf: ArrayIndexOf$1,
    join: ArrayJoin,
    map: ArrayMap$1,
    push: ArrayPush$2,
    reduce: ArrayReduce,
    reverse: ArrayReverse,
    slice: ArraySlice,
    splice: ArraySplice$1,
    unshift: ArrayUnshift,
    forEach
  } = Array.prototype;
  const {
    fromCharCode: StringFromCharCode
  } = String;
  const {
    charCodeAt: StringCharCodeAt,
    replace: StringReplace,
    slice: StringSlice,
    toLowerCase: StringToLowerCase
  } = String.prototype;

  function isUndefined$3(obj) {
    return obj === undefined;
  }

  function isNull(obj) {
    return obj === null;
  }

  function isTrue$2(obj) {
    return obj === true;
  }

  function isFalse$2(obj) {
    return obj === false;
  }

  function isBoolean(obj) {
    return typeof obj === 'boolean';
  }

  function isFunction$1(obj) {
    return typeof obj === 'function';
  }

  function isObject(obj) {
    return typeof obj === 'object';
  }

  function isString(obj) {
    return typeof obj === 'string';
  }

  function isNumber(obj) {
    return typeof obj === 'number';
  }

  const OtS$1 = {}.toString;

  function toString$1(obj) {
    if (obj && obj.toString) {
      // Arrays might hold objects with "null" prototype So using
      // Array.prototype.toString directly will cause an error Iterate through
      // all the items and handle individually.
      if (isArray$1(obj)) {
        return ArrayJoin.call(ArrayMap$1.call(obj, toString$1), ',');
      }

      return obj.toString();
    } else if (typeof obj === 'object') {
      return OtS$1.call(obj);
    } else {
      return obj + '';
    }
  }

  function getPropertyDescriptor(o, p) {
    do {
      const d = getOwnPropertyDescriptor$2(o, p);

      if (!isUndefined$3(d)) {
        return d;
      }

      o = getPrototypeOf$2(o);
    } while (o !== null);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * According to the following list, there are 48 aria attributes of which two (ariaDropEffect and
   * ariaGrabbed) are deprecated:
   * https://www.w3.org/TR/wai-aria-1.1/#x6-6-definitions-of-states-and-properties-all-aria-attributes
   *
   * The above list of 46 aria attributes is consistent with the following resources:
   * https://github.com/w3c/aria/pull/708/files#diff-eacf331f0ffc35d4b482f1d15a887d3bR11060
   * https://wicg.github.io/aom/spec/aria-reflection.html
   */


  const AriaPropertyNames = ['ariaActiveDescendant', 'ariaAtomic', 'ariaAutoComplete', 'ariaBusy', 'ariaChecked', 'ariaColCount', 'ariaColIndex', 'ariaColSpan', 'ariaControls', 'ariaCurrent', 'ariaDescribedBy', 'ariaDetails', 'ariaDisabled', 'ariaErrorMessage', 'ariaExpanded', 'ariaFlowTo', 'ariaHasPopup', 'ariaHidden', 'ariaInvalid', 'ariaKeyShortcuts', 'ariaLabel', 'ariaLabelledBy', 'ariaLevel', 'ariaLive', 'ariaModal', 'ariaMultiLine', 'ariaMultiSelectable', 'ariaOrientation', 'ariaOwns', 'ariaPlaceholder', 'ariaPosInSet', 'ariaPressed', 'ariaReadOnly', 'ariaRelevant', 'ariaRequired', 'ariaRoleDescription', 'ariaRowCount', 'ariaRowIndex', 'ariaRowSpan', 'ariaSelected', 'ariaSetSize', 'ariaSort', 'ariaValueMax', 'ariaValueMin', 'ariaValueNow', 'ariaValueText', 'role'];

  const {
    AriaAttrNameToPropNameMap,
    AriaPropNameToAttrNameMap
  } = /*@__PURE__*/(() => {
    const AriaAttrNameToPropNameMap = create$2(null);
    const AriaPropNameToAttrNameMap = create$2(null); // Synthetic creation of all AOM property descriptors for Custom Elements

    forEach.call(AriaPropertyNames, propName => {
      const attrName = StringToLowerCase.call(StringReplace.call(propName, /^aria/, () => 'aria-'));
      AriaAttrNameToPropNameMap[attrName] = propName;
      AriaPropNameToAttrNameMap[propName] = attrName;
    });
    return {
      AriaAttrNameToPropNameMap,
      AriaPropNameToAttrNameMap
    };
  })();
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // Inspired from: https://mathiasbynens.be/notes/globalthis


  const _globalThis$1 = /*@__PURE__*/function () {
    // On recent browsers, `globalThis` is already defined. In this case return it directly.
    if (typeof globalThis === 'object') {
      return globalThis;
    }

    let _globalThis;

    try {
      // eslint-disable-next-line no-extend-native
      Object.defineProperty(Object.prototype, '__magic__', {
        get: function () {
          return this;
        },
        configurable: true
      }); // __magic__ is undefined in Safari 10 and IE10 and older.
      // @ts-ignore
      // eslint-disable-next-line no-undef

      _globalThis = __magic__; // @ts-ignore

      delete Object.prototype.__magic__;
    } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
    } finally {
      // If the magic above fails for some reason we assume that we are in a legacy browser.
      // Assume `window` exists in this case.
      if (typeof _globalThis === 'undefined') {
        // @ts-ignore
        _globalThis = window;
      }
    }

    return _globalThis;
  }();
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // We use this to detect symbol support in order to avoid the expensive symbol polyfill. Note that
  // we can't use typeof since it will fail when transpiling.


  const hasNativeSymbolSupport = /*@__PURE__*/(() => Symbol('x').toString() === 'Symbol(x)')();
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // This method abstracts the creation of symbols, so we can fallback to strings when native symbols
  // are not supported.


  function createHiddenField(key, namespace) {
    return hasNativeSymbolSupport ? Symbol(key) : `$$lwc-${namespace}-${key}$$`;
  }

  const hiddenFieldsMap = new WeakMap();

  function setHiddenField(o, field, value) {
    let valuesByField = hiddenFieldsMap.get(o);

    if (isUndefined$3(valuesByField)) {
      valuesByField = create$2(null);
      hiddenFieldsMap.set(o, valuesByField);
    }

    valuesByField[field] = value;
  }

  function getHiddenField(o, field) {
    const valuesByField = hiddenFieldsMap.get(o);

    if (!isUndefined$3(valuesByField)) {
      return valuesByField[field];
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const KEY__IS_NATIVE_SHADOW_ROOT_DEFINED = '$isNativeShadowRootDefined$';
  const KEY__SHADOW_RESOLVER = '$shadowResolver$';
  const KEY__SYNTHETIC_MODE = '$$lwc-synthetic-mode';
  /**
   * Map composed of properties to attributes not following the HTML property to attribute mapping
   * convention.
   */

  const NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING = new Map([['accessKey', 'accesskey'], ['readOnly', 'readonly'], ['tabIndex', 'tabindex'], ['bgColor', 'bgcolor'], ['colSpan', 'colspan'], ['rowSpan', 'rowspan'], ['contentEditable', 'contenteditable'], ['crossOrigin', 'crossorigin'], ['dateTime', 'datetime'], ['formAction', 'formaction'], ['isMap', 'ismap'], ['maxLength', 'maxlength'], ['minLength', 'minlength'], ['noValidate', 'novalidate'], ['useMap', 'usemap'], ['htmlFor', 'for']]);
  /**
   * Map associating previously transformed HTML property into HTML attribute.
   */

  const CACHED_PROPERTY_ATTRIBUTE_MAPPING = new Map();

  function htmlPropertyToAttribute(propName) {
    const ariaAttributeName = AriaPropNameToAttrNameMap[propName];

    if (!isUndefined$3(ariaAttributeName)) {
      return ariaAttributeName;
    }

    const specialAttributeName = NO_STANDARD_PROPERTY_ATTRIBUTE_MAPPING.get(propName);

    if (!isUndefined$3(specialAttributeName)) {
      return specialAttributeName;
    }

    const cachedAttributeName = CACHED_PROPERTY_ATTRIBUTE_MAPPING.get(propName);

    if (!isUndefined$3(cachedAttributeName)) {
      return cachedAttributeName;
    }

    let attributeName = '';

    for (let i = 0, len = propName.length; i < len; i++) {
      const code = StringCharCodeAt.call(propName, i);

      if (code >= 65 && // "A"
      code <= 90 // "Z"
      ) {
          attributeName += '-' + StringFromCharCode(code + 32);
        } else {
        attributeName += StringFromCharCode(code);
      }
    }

    CACHED_PROPERTY_ATTRIBUTE_MAPPING.set(propName, attributeName);
    return attributeName;
  }
  /** version: 2.2.5 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  let nextTickCallbackQueue = [];
  const SPACE_CHAR = 32;
  const EmptyObject = seal$1(create$2(null));
  const EmptyArray = seal$1([]);

  function flushCallbackQueue() {
    {
      if (nextTickCallbackQueue.length === 0) {
        throw new Error(`Internal Error: If callbackQueue is scheduled, it is because there must be at least one callback on this pending queue.`);
      }
    }

    const callbacks = nextTickCallbackQueue;
    nextTickCallbackQueue = []; // reset to a new queue

    for (let i = 0, len = callbacks.length; i < len; i += 1) {
      callbacks[i]();
    }
  }

  function addCallbackToNextTick(callback) {
    {
      if (!isFunction$1(callback)) {
        throw new Error(`Internal Error: addCallbackToNextTick() can only accept a function callback`);
      }
    }

    if (nextTickCallbackQueue.length === 0) {
      Promise.resolve().then(flushCallbackQueue);
    }

    ArrayPush$2.call(nextTickCallbackQueue, callback);
  }
  /*
   * Copyright (c) 2019, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    create: create$1
  } = Object;
  const {
    splice: ArraySplice,
    indexOf: ArrayIndexOf,
    push: ArrayPush$1
  } = Array.prototype;
  const TargetToReactiveRecordMap = new WeakMap();

  function isUndefined$2(obj) {
    return obj === undefined;
  }

  function getReactiveRecord(target) {
    let reactiveRecord = TargetToReactiveRecordMap.get(target);

    if (isUndefined$2(reactiveRecord)) {
      const newRecord = create$1(null);
      reactiveRecord = newRecord;
      TargetToReactiveRecordMap.set(target, newRecord);
    }

    return reactiveRecord;
  }

  let currentReactiveObserver = null;

  function valueMutated(target, key) {
    const reactiveRecord = TargetToReactiveRecordMap.get(target);

    if (!isUndefined$2(reactiveRecord)) {
      const reactiveObservers = reactiveRecord[key];

      if (!isUndefined$2(reactiveObservers)) {
        for (let i = 0, len = reactiveObservers.length; i < len; i += 1) {
          const ro = reactiveObservers[i];
          ro.notify();
        }
      }
    }
  }

  function valueObserved(target, key) {
    // We should determine if an active Observing Record is present to track mutations.
    if (currentReactiveObserver === null) {
      return;
    }

    const ro = currentReactiveObserver;
    const reactiveRecord = getReactiveRecord(target);
    let reactiveObservers = reactiveRecord[key];

    if (isUndefined$2(reactiveObservers)) {
      reactiveObservers = [];
      reactiveRecord[key] = reactiveObservers;
    } else if (reactiveObservers[0] === ro) {
      return; // perf optimization considering that most subscriptions will come from the same record
    }

    if (ArrayIndexOf.call(reactiveObservers, ro) === -1) {
      ro.link(reactiveObservers);
    }
  }

  class ReactiveObserver {
    constructor(callback) {
      this.listeners = [];
      this.callback = callback;
    }

    observe(job) {
      const inceptionReactiveRecord = currentReactiveObserver;
      currentReactiveObserver = this;
      let error;

      try {
        job();
      } catch (e) {
        error = Object(e);
      } finally {
        currentReactiveObserver = inceptionReactiveRecord;

        if (error !== undefined) {
          throw error; // eslint-disable-line no-unsafe-finally
        }
      }
    }
    /**
     * This method is responsible for disconnecting the Reactive Observer
     * from any Reactive Record that has a reference to it, to prevent future
     * notifications about previously recorded access.
     */


    reset() {
      const {
        listeners
      } = this;
      const len = listeners.length;

      if (len > 0) {
        for (let i = 0; i < len; i += 1) {
          const set = listeners[i];
          const pos = ArrayIndexOf.call(listeners[i], this);
          ArraySplice.call(set, pos, 1);
        }

        listeners.length = 0;
      }
    } // friend methods


    notify() {
      this.callback.call(undefined, this);
    }

    link(reactiveObservers) {
      ArrayPush$1.call(reactiveObservers, this); // we keep track of observing records where the observing record was added to so we can do some clean up later on

      ArrayPush$1.call(this.listeners, reactiveObservers);
    }

  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function componentValueMutated(vm, key) {
    valueMutated(vm.component, key);
  }

  function componentValueObserved(vm, key) {
    valueObserved(vm.component, key);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function getComponentTag(vm) {
    return `<${StringToLowerCase.call(vm.tagName)}>`;
  } // TODO [#1695]: Unify getComponentStack and getErrorComponentStack


  function getComponentStack(vm) {
    const stack = [];
    let prefix = '';

    while (!isNull(vm.owner)) {
      ArrayPush$2.call(stack, prefix + getComponentTag(vm));
      vm = vm.owner;
      prefix += '\t';
    }

    return ArrayJoin.call(stack, '\n');
  }

  function getErrorComponentStack(vm) {
    const wcStack = [];
    let currentVm = vm;

    while (!isNull(currentVm)) {
      ArrayPush$2.call(wcStack, getComponentTag(currentVm));
      currentVm = currentVm.owner;
    }

    return wcStack.reverse().join('\n\t');
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function logError(message, vm) {
    let msg = `[LWC error]: ${message}`;

    if (!isUndefined$3(vm)) {
      msg = `${msg}\n${getComponentStack(vm)}`;
    }

    try {
      throw new Error(msg);
    } catch (e) {
      /* eslint-disable-next-line no-console */
      console.error(e);
    }
  }
  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /**
   * Copyright (C) 2018 salesforce.com, inc.
   */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const {
    assign,
    create,
    defineProperties,
    defineProperty,
    freeze,
    getOwnPropertyDescriptor: getOwnPropertyDescriptor$1,
    getOwnPropertyNames: getOwnPropertyNames$1,
    getPrototypeOf: getPrototypeOf$1,
    hasOwnProperty: hasOwnProperty$1,
    isFrozen,
    keys,
    seal,
    setPrototypeOf
  } = Object;
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // Inspired from: https://mathiasbynens.be/notes/globalthis


  const _globalThis = /*@__PURE__*/function () {
    // On recent browsers, `globalThis` is already defined. In this case return it directly.
    if (typeof globalThis === 'object') {
      return globalThis;
    }

    let _globalThis;

    try {
      // eslint-disable-next-line no-extend-native
      Object.defineProperty(Object.prototype, '__magic__', {
        get: function () {
          return this;
        },
        configurable: true
      }); // __magic__ is undefined in Safari 10 and IE10 and older.
      // @ts-ignore
      // eslint-disable-next-line no-undef

      _globalThis = __magic__; // @ts-ignore

      delete Object.prototype.__magic__;
    } catch (ex) {// In IE8, Object.defineProperty only works on DOM objects.
    } finally {
      // If the magic above fails for some reason we assume that we are in a legacy browser.
      // Assume `window` exists in this case.
      if (typeof _globalThis === 'undefined') {
        // @ts-ignore
        _globalThis = window;
      }
    }

    return _globalThis;
  }();
  /** version: 2.2.5 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  if (!_globalThis.lwcRuntimeFlags) {
    Object.defineProperty(_globalThis, 'lwcRuntimeFlags', {
      value: create(null)
    });
  }

  const runtimeFlags = _globalThis.lwcRuntimeFlags; // This function is not supported for use within components and is meant for
  /** version: 2.2.5 */

  /*
   * Copyright (c) 2020, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // This is a temporary workaround to get the @lwc/engine-server to evaluate in node without having
  // to inject at runtime.

  const HTMLElementConstructor$1 = typeof HTMLElement !== 'undefined' ? HTMLElement : function () {};
  const HTMLElementPrototype = HTMLElementConstructor$1.prototype;
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const defaultDefHTMLPropertyNames = ['accessKey', 'dir', 'draggable', 'hidden', 'id', 'lang', 'spellcheck', 'tabIndex', 'title'];

  function offsetPropertyErrorMessage(name) {
    return `Using the \`${name}\` property is an anti-pattern because it rounds the value to an integer. Instead, use the \`getBoundingClientRect\` method to obtain fractional values for the size of an element and its position relative to the viewport.`;
  } // Global HTML Attributes & Properties
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement


  const globalHTMLProperties = assign$1(create$2(null), {
    accessKey: {
      attribute: 'accesskey'
    },
    accessKeyLabel: {
      readOnly: true
    },
    className: {
      attribute: 'class',
      error: 'Using the `className` property is an anti-pattern because of slow runtime behavior and potential conflicts with classes provided by the owner element. Use the `classList` API instead.'
    },
    contentEditable: {
      attribute: 'contenteditable'
    },
    dataset: {
      readOnly: true,
      error: "Using the `dataset` property is an anti-pattern because it can't be statically analyzed. Expose each property individually using the `@api` decorator instead."
    },
    dir: {
      attribute: 'dir'
    },
    draggable: {
      attribute: 'draggable'
    },
    dropzone: {
      attribute: 'dropzone',
      readOnly: true
    },
    hidden: {
      attribute: 'hidden'
    },
    id: {
      attribute: 'id'
    },
    inputMode: {
      attribute: 'inputmode'
    },
    lang: {
      attribute: 'lang'
    },
    slot: {
      attribute: 'slot',
      error: 'Using the `slot` property is an anti-pattern.'
    },
    spellcheck: {
      attribute: 'spellcheck'
    },
    style: {
      attribute: 'style'
    },
    tabIndex: {
      attribute: 'tabindex'
    },
    title: {
      attribute: 'title'
    },
    translate: {
      attribute: 'translate'
    },
    // additional "global attributes" that are not present in the link above.
    isContentEditable: {
      readOnly: true
    },
    offsetHeight: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetHeight')
    },
    offsetLeft: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetLeft')
    },
    offsetParent: {
      readOnly: true
    },
    offsetTop: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetTop')
    },
    offsetWidth: {
      readOnly: true,
      error: offsetPropertyErrorMessage('offsetWidth')
    },
    role: {
      attribute: 'role'
    }
  });
  let controlledElement = null;
  let controlledAttributeName;

  function isAttributeLocked(elm, attrName) {
    return elm !== controlledElement || attrName !== controlledAttributeName;
  }

  function lockAttribute(_elm, _key) {
    controlledElement = null;
    controlledAttributeName = undefined;
  }

  function unlockAttribute(elm, key) {
    controlledElement = elm;
    controlledAttributeName = key;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * This is a descriptor map that contains
   * all standard properties that a Custom Element can support (including AOM properties), which
   * determines what kind of capabilities the Base HTML Element and
   * Base Lightning Element should support.
   */


  const HTMLElementOriginalDescriptors = create$2(null);
  forEach.call(keys$1(AriaPropNameToAttrNameMap), propName => {
    // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
    // in IE11, some properties are on Element.prototype instead of HTMLElement, just to be sure.
    const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);

    if (!isUndefined$3(descriptor)) {
      HTMLElementOriginalDescriptors[propName] = descriptor;
    }
  });
  forEach.call(defaultDefHTMLPropertyNames, propName => {
    // Note: intentionally using our in-house getPropertyDescriptor instead of getOwnPropertyDescriptor here because
    // in IE11, id property is on Element.prototype instead of HTMLElement, and we suspect that more will fall into
    // this category, so, better to be sure.
    const descriptor = getPropertyDescriptor(HTMLElementPrototype, propName);

    if (!isUndefined$3(descriptor)) {
      HTMLElementOriginalDescriptors[propName] = descriptor;
    }
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function generateDataDescriptor(options) {
    return assign$1({
      configurable: true,
      enumerable: true,
      writable: true
    }, options);
  }

  function generateAccessorDescriptor(options) {
    return assign$1({
      configurable: true,
      enumerable: true
    }, options);
  }

  let isDomMutationAllowed = false;

  function unlockDomMutation() {

    isDomMutationAllowed = true;
  }

  function lockDomMutation() {

    isDomMutationAllowed = false;
  }

  function logMissingPortalError(name, type) {
    return logError(`The \`${name}\` ${type} is available only on elements that use the \`lwc:dom="manual"\` directive.`);
  }

  function patchElementWithRestrictions(elm, options) {

    const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
    const descriptors = {
      outerHTML: generateAccessorDescriptor({
        get() {
          return originalOuterHTMLDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set outerHTML on Element.`);
        }

      })
    }; // Apply extra restriction related to DOM manipulation if the element is not a portal.

    if (!options.isLight && !options.isPortal) {
      const {
        appendChild,
        insertBefore,
        removeChild,
        replaceChild
      } = elm;
      const originalNodeValueDescriptor = getPropertyDescriptor(elm, 'nodeValue');
      const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
      const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
      assign$1(descriptors, {
        appendChild: generateDataDescriptor({
          value(aChild) {
            logMissingPortalError('appendChild', 'method');
            return appendChild.call(this, aChild);
          }

        }),
        insertBefore: generateDataDescriptor({
          value(newNode, referenceNode) {
            if (!isDomMutationAllowed) {
              logMissingPortalError('insertBefore', 'method');
            }

            return insertBefore.call(this, newNode, referenceNode);
          }

        }),
        removeChild: generateDataDescriptor({
          value(aChild) {
            if (!isDomMutationAllowed) {
              logMissingPortalError('removeChild', 'method');
            }

            return removeChild.call(this, aChild);
          }

        }),
        replaceChild: generateDataDescriptor({
          value(newChild, oldChild) {
            logMissingPortalError('replaceChild', 'method');
            return replaceChild.call(this, newChild, oldChild);
          }

        }),
        nodeValue: generateAccessorDescriptor({
          get() {
            return originalNodeValueDescriptor.get.call(this);
          },

          set(value) {
            if (!isDomMutationAllowed) {
              logMissingPortalError('nodeValue', 'property');
            }

            originalNodeValueDescriptor.set.call(this, value);
          }

        }),
        textContent: generateAccessorDescriptor({
          get() {
            return originalTextContentDescriptor.get.call(this);
          },

          set(value) {
            logMissingPortalError('textContent', 'property');
            originalTextContentDescriptor.set.call(this, value);
          }

        }),
        innerHTML: generateAccessorDescriptor({
          get() {
            return originalInnerHTMLDescriptor.get.call(this);
          },

          set(value) {
            logMissingPortalError('innerHTML', 'property');
            return originalInnerHTMLDescriptor.set.call(this, value);
          }

        })
      });
    }

    defineProperties$1(elm, descriptors);
  }

  function getShadowRootRestrictionsDescriptors(sr) {
    // thing when using the real shadow root, because if that's the case,
    // the component will not work when running with synthetic shadow.


    const originalAddEventListener = sr.addEventListener;
    const originalInnerHTMLDescriptor = getPropertyDescriptor(sr, 'innerHTML');
    const originalTextContentDescriptor = getPropertyDescriptor(sr, 'textContent');
    return {
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set innerHTML on ShadowRoot.`);
        }

      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set textContent on ShadowRoot.`);
        }

      }),
      addEventListener: generateDataDescriptor({
        value(type, listener, options) {
          // TODO [#420]: this is triggered when the component author attempts to add a listener
          // programmatically into its Component's shadow root
          if (!isUndefined$3(options)) {
            logError('The `addEventListener` method on ShadowRoot does not support any options.', getAssociatedVMIfPresent(this));
          } // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch


          return originalAddEventListener.apply(this, arguments);
        }

      })
    };
  } // Custom Elements Restrictions:
  // -----------------------------


  function getCustomElementRestrictionsDescriptors(elm) {

    const originalAddEventListener = elm.addEventListener;
    const originalInnerHTMLDescriptor = getPropertyDescriptor(elm, 'innerHTML');
    const originalOuterHTMLDescriptor = getPropertyDescriptor(elm, 'outerHTML');
    const originalTextContentDescriptor = getPropertyDescriptor(elm, 'textContent');
    return {
      innerHTML: generateAccessorDescriptor({
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set innerHTML on HTMLElement.`);
        }

      }),
      outerHTML: generateAccessorDescriptor({
        get() {
          return originalOuterHTMLDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set outerHTML on HTMLElement.`);
        }

      }),
      textContent: generateAccessorDescriptor({
        get() {
          return originalTextContentDescriptor.get.call(this);
        },

        set(_value) {
          throw new TypeError(`Invalid attempt to set textContent on HTMLElement.`);
        }

      }),
      addEventListener: generateDataDescriptor({
        value(type, listener, options) {
          // TODO [#420]: this is triggered when the component author attempts to add a listener
          // programmatically into a lighting element node
          if (!isUndefined$3(options)) {
            logError('The `addEventListener` method in `LightningElement` does not support any options.', getAssociatedVMIfPresent(this));
          } // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch


          return originalAddEventListener.apply(this, arguments);
        }

      })
    };
  }

  function getComponentRestrictionsDescriptors() {

    return {
      tagName: generateAccessorDescriptor({
        get() {
          throw new Error(`Usage of property \`tagName\` is disallowed because the component itself does` + ` not know which tagName will be used to create the element, therefore writing` + ` code that check for that value is error prone.`);
        },

        configurable: true,
        enumerable: false // no enumerable properties on component

      })
    };
  }

  function getLightningElementPrototypeRestrictionsDescriptors(proto) {

    const originalDispatchEvent = proto.dispatchEvent;
    const descriptors = {
      dispatchEvent: generateDataDescriptor({
        value(event) {
          const vm = getAssociatedVM(this);

          if (!isNull(event) && isObject(event)) {
            const {
              type
            } = event;

            if (!/^[a-z][a-z0-9_]*$/.test(type)) {
              logError(`Invalid event type "${type}" dispatched in element ${getComponentTag(vm)}.` + ` Event name must start with a lowercase letter and followed only lowercase` + ` letters, numbers, and underscores`, vm);
            }
          } // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch


          return originalDispatchEvent.apply(this, arguments);
        }

      })
    };
    forEach.call(getOwnPropertyNames$2(globalHTMLProperties), propName => {
      if (propName in proto) {
        return; // no need to redefine something that we are already exposing
      }

      descriptors[propName] = generateAccessorDescriptor({
        get() {
          const {
            error,
            attribute
          } = globalHTMLProperties[propName];
          const msg = [];
          msg.push(`Accessing the global HTML property "${propName}" is disabled.`);

          if (error) {
            msg.push(error);
          } else if (attribute) {
            msg.push(`Instead access it via \`this.getAttribute("${attribute}")\`.`);
          }

          logError(msg.join('\n'), getAssociatedVM(this));
        },

        set() {
          const {
            readOnly
          } = globalHTMLProperties[propName];

          if (readOnly) {
            logError(`The global HTML property \`${propName}\` is read-only.`, getAssociatedVM(this));
          }
        }

      });
    });
    return descriptors;
  } // This routine will prevent access to certain properties on a shadow root instance to guarantee
  // that all components will work fine in IE11 and other browsers without shadow dom support.


  function patchShadowRootWithRestrictions(sr) {
    defineProperties$1(sr, getShadowRootRestrictionsDescriptors(sr));
  }

  function patchCustomElementWithRestrictions(elm) {
    const restrictionsDescriptors = getCustomElementRestrictionsDescriptors(elm);
    const elmProto = getPrototypeOf$2(elm);
    setPrototypeOf$1(elm, create$2(elmProto, restrictionsDescriptors));
  }

  function patchComponentWithRestrictions(cmp) {
    defineProperties$1(cmp, getComponentRestrictionsDescriptors());
  }

  function patchLightningElementPrototypeWithRestrictions(proto) {
    defineProperties$1(proto, getLightningElementPrototypeRestrictionsDescriptors(proto));
  }
  /**
   * Copyright (C) 2017 salesforce.com, inc.
   */


  const {
    isArray
  } = Array;
  const {
    getPrototypeOf,
    create: ObjectCreate,
    defineProperty: ObjectDefineProperty,
    defineProperties: ObjectDefineProperties,
    isExtensible,
    getOwnPropertyDescriptor,
    getOwnPropertyNames,
    getOwnPropertySymbols,
    preventExtensions,
    hasOwnProperty
  } = Object;
  const {
    push: ArrayPush,
    concat: ArrayConcat,
    map: ArrayMap
  } = Array.prototype;
  const OtS = {}.toString;

  function toString(obj) {
    if (obj && obj.toString) {
      return obj.toString();
    } else if (typeof obj === 'object') {
      return OtS.call(obj);
    } else {
      return obj + '';
    }
  }

  function isUndefined(obj) {
    return obj === undefined;
  }

  function isFunction(obj) {
    return typeof obj === 'function';
  }

  const proxyToValueMap = new WeakMap();

  function registerProxy(proxy, value) {
    proxyToValueMap.set(proxy, value);
  }

  const unwrap$1 = replicaOrAny => proxyToValueMap.get(replicaOrAny) || replicaOrAny;

  class BaseProxyHandler {
    constructor(membrane, value) {
      this.originalTarget = value;
      this.membrane = membrane;
    } // Shared utility methods


    wrapDescriptor(descriptor) {
      if (hasOwnProperty.call(descriptor, 'value')) {
        descriptor.value = this.wrapValue(descriptor.value);
      } else {
        const {
          set: originalSet,
          get: originalGet
        } = descriptor;

        if (!isUndefined(originalGet)) {
          descriptor.get = this.wrapGetter(originalGet);
        }

        if (!isUndefined(originalSet)) {
          descriptor.set = this.wrapSetter(originalSet);
        }
      }

      return descriptor;
    }

    copyDescriptorIntoShadowTarget(shadowTarget, key) {
      const {
        originalTarget
      } = this; // Note: a property might get defined multiple times in the shadowTarget
      //       but it will always be compatible with the previous descriptor
      //       to preserve the object invariants, which makes these lines safe.

      const originalDescriptor = getOwnPropertyDescriptor(originalTarget, key);

      if (!isUndefined(originalDescriptor)) {
        const wrappedDesc = this.wrapDescriptor(originalDescriptor);
        ObjectDefineProperty(shadowTarget, key, wrappedDesc);
      }
    }

    lockShadowTarget(shadowTarget) {
      const {
        originalTarget
      } = this;
      const targetKeys = ArrayConcat.call(getOwnPropertyNames(originalTarget), getOwnPropertySymbols(originalTarget));
      targetKeys.forEach(key => {
        this.copyDescriptorIntoShadowTarget(shadowTarget, key);
      });
      const {
        membrane: {
          tagPropertyKey
        }
      } = this;

      if (!isUndefined(tagPropertyKey) && !hasOwnProperty.call(shadowTarget, tagPropertyKey)) {
        ObjectDefineProperty(shadowTarget, tagPropertyKey, ObjectCreate(null));
      }

      preventExtensions(shadowTarget);
    } // Shared Traps


    apply(shadowTarget, thisArg, argArray) {
      /* No op */
    }

    construct(shadowTarget, argArray, newTarget) {
      /* No op */
    }

    get(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved
        }
      } = this;
      const value = originalTarget[key];
      valueObserved(originalTarget, key);
      return this.wrapValue(value);
    }

    has(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          tagPropertyKey,
          valueObserved
        }
      } = this;
      valueObserved(originalTarget, key); // since key is never going to be undefined, and tagPropertyKey might be undefined
      // we can simply compare them as the second part of the condition.

      return key in originalTarget || key === tagPropertyKey;
    }

    ownKeys(shadowTarget) {
      const {
        originalTarget,
        membrane: {
          tagPropertyKey
        }
      } = this; // if the membrane tag key exists and it is not in the original target, we add it to the keys.

      const keys = isUndefined(tagPropertyKey) || hasOwnProperty.call(originalTarget, tagPropertyKey) ? [] : [tagPropertyKey]; // small perf optimization using push instead of concat to avoid creating an extra array

      ArrayPush.apply(keys, getOwnPropertyNames(originalTarget));
      ArrayPush.apply(keys, getOwnPropertySymbols(originalTarget));
      return keys;
    }

    isExtensible(shadowTarget) {
      const {
        originalTarget
      } = this; // optimization to avoid attempting to lock down the shadowTarget multiple times

      if (!isExtensible(shadowTarget)) {
        return false; // was already locked down
      }

      if (!isExtensible(originalTarget)) {
        this.lockShadowTarget(shadowTarget);
        return false;
      }

      return true;
    }

    getPrototypeOf(shadowTarget) {
      const {
        originalTarget
      } = this;
      return getPrototypeOf(originalTarget);
    }

    getOwnPropertyDescriptor(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueObserved,
          tagPropertyKey
        }
      } = this; // keys looked up via getOwnPropertyDescriptor need to be reactive

      valueObserved(originalTarget, key);
      let desc = getOwnPropertyDescriptor(originalTarget, key);

      if (isUndefined(desc)) {
        if (key !== tagPropertyKey) {
          return undefined;
        } // if the key is the membrane tag key, and is not in the original target,
        // we produce a synthetic descriptor and install it on the shadow target


        desc = {
          value: undefined,
          writable: false,
          configurable: false,
          enumerable: false
        };
        ObjectDefineProperty(shadowTarget, tagPropertyKey, desc);
        return desc;
      }

      if (desc.configurable === false) {
        // updating the descriptor to non-configurable on the shadow
        this.copyDescriptorIntoShadowTarget(shadowTarget, key);
      } // Note: by accessing the descriptor, the key is marked as observed
      // but access to the value, setter or getter (if available) cannot observe
      // mutations, just like regular methods, in which case we just do nothing.


      return this.wrapDescriptor(desc);
    }

  }

  const getterMap = new WeakMap();
  const setterMap = new WeakMap();
  const reverseGetterMap = new WeakMap();
  const reverseSetterMap = new WeakMap();

  class ReactiveProxyHandler extends BaseProxyHandler {
    wrapValue(value) {
      return this.membrane.getProxy(value);
    }

    wrapGetter(originalGet) {
      const wrappedGetter = getterMap.get(originalGet);

      if (!isUndefined(wrappedGetter)) {
        return wrappedGetter;
      }

      const handler = this;

      const get = function () {
        // invoking the original getter with the original target
        return handler.wrapValue(originalGet.call(unwrap$1(this)));
      };

      getterMap.set(originalGet, get);
      reverseGetterMap.set(get, originalGet);
      return get;
    }

    wrapSetter(originalSet) {
      const wrappedSetter = setterMap.get(originalSet);

      if (!isUndefined(wrappedSetter)) {
        return wrappedSetter;
      }

      const set = function (v) {
        // invoking the original setter with the original target
        originalSet.call(unwrap$1(this), unwrap$1(v));
      };

      setterMap.set(originalSet, set);
      reverseSetterMap.set(set, originalSet);
      return set;
    }

    unwrapDescriptor(descriptor) {
      if (hasOwnProperty.call(descriptor, 'value')) {
        // dealing with a data descriptor
        descriptor.value = unwrap$1(descriptor.value);
      } else {
        const {
          set,
          get
        } = descriptor;

        if (!isUndefined(get)) {
          descriptor.get = this.unwrapGetter(get);
        }

        if (!isUndefined(set)) {
          descriptor.set = this.unwrapSetter(set);
        }
      }

      return descriptor;
    }

    unwrapGetter(redGet) {
      const reverseGetter = reverseGetterMap.get(redGet);

      if (!isUndefined(reverseGetter)) {
        return reverseGetter;
      }

      const handler = this;

      const get = function () {
        // invoking the red getter with the proxy of this
        return unwrap$1(redGet.call(handler.wrapValue(this)));
      };

      getterMap.set(get, redGet);
      reverseGetterMap.set(redGet, get);
      return get;
    }

    unwrapSetter(redSet) {
      const reverseSetter = reverseSetterMap.get(redSet);

      if (!isUndefined(reverseSetter)) {
        return reverseSetter;
      }

      const handler = this;

      const set = function (v) {
        // invoking the red setter with the proxy of this
        redSet.call(handler.wrapValue(this), handler.wrapValue(v));
      };

      setterMap.set(set, redSet);
      reverseSetterMap.set(redSet, set);
      return set;
    }

    set(shadowTarget, key, value) {
      const {
        originalTarget,
        membrane: {
          valueMutated
        }
      } = this;
      const oldValue = originalTarget[key];

      if (oldValue !== value) {
        originalTarget[key] = value;
        valueMutated(originalTarget, key);
      } else if (key === 'length' && isArray(originalTarget)) {
        // fix for issue #236: push will add the new index, and by the time length
        // is updated, the internal length is already equal to the new length value
        // therefore, the oldValue is equal to the value. This is the forking logic
        // to support this use case.
        valueMutated(originalTarget, key);
      }

      return true;
    }

    deleteProperty(shadowTarget, key) {
      const {
        originalTarget,
        membrane: {
          valueMutated
        }
      } = this;
      delete originalTarget[key];
      valueMutated(originalTarget, key);
      return true;
    }

    setPrototypeOf(shadowTarget, prototype) {
      {
        throw new Error(`Invalid setPrototypeOf invocation for reactive proxy ${toString(this.originalTarget)}. Prototype of reactive objects cannot be changed.`);
      }
    }

    preventExtensions(shadowTarget) {
      if (isExtensible(shadowTarget)) {
        const {
          originalTarget
        } = this;
        preventExtensions(originalTarget); // if the originalTarget is a proxy itself, it might reject
        // the preventExtension call, in which case we should not attempt to lock down
        // the shadow target.

        if (isExtensible(originalTarget)) {
          return false;
        }

        this.lockShadowTarget(shadowTarget);
      }

      return true;
    }

    defineProperty(shadowTarget, key, descriptor) {
      const {
        originalTarget,
        membrane: {
          valueMutated,
          tagPropertyKey
        }
      } = this;

      if (key === tagPropertyKey && !hasOwnProperty.call(originalTarget, key)) {
        // To avoid leaking the membrane tag property into the original target, we must
        // be sure that the original target doesn't have yet.
        // NOTE: we do not return false here because Object.freeze and equivalent operations
        // will attempt to set the descriptor to the same value, and expect no to throw. This
        // is an small compromise for the sake of not having to diff the descriptors.
        return true;
      }

      ObjectDefineProperty(originalTarget, key, this.unwrapDescriptor(descriptor)); // intentionally testing if false since it could be undefined as well

      if (descriptor.configurable === false) {
        this.copyDescriptorIntoShadowTarget(shadowTarget, key);
      }

      valueMutated(originalTarget, key);
      return true;
    }

  }

  const getterMap$1 = new WeakMap();
  const setterMap$1 = new WeakMap();

  class ReadOnlyHandler extends BaseProxyHandler {
    wrapValue(value) {
      return this.membrane.getReadOnlyProxy(value);
    }

    wrapGetter(originalGet) {
      const wrappedGetter = getterMap$1.get(originalGet);

      if (!isUndefined(wrappedGetter)) {
        return wrappedGetter;
      }

      const handler = this;

      const get = function () {
        // invoking the original getter with the original target
        return handler.wrapValue(originalGet.call(unwrap$1(this)));
      };

      getterMap$1.set(originalGet, get);
      return get;
    }

    wrapSetter(originalSet) {
      const wrappedSetter = setterMap$1.get(originalSet);

      if (!isUndefined(wrappedSetter)) {
        return wrappedSetter;
      }

      const handler = this;

      const set = function (v) {
        {
          const {
            originalTarget
          } = handler;
          throw new Error(`Invalid mutation: Cannot invoke a setter on "${originalTarget}". "${originalTarget}" is read-only.`);
        }
      };

      setterMap$1.set(originalSet, set);
      return set;
    }

    set(shadowTarget, key, value) {
      {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot set "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
      }
    }

    deleteProperty(shadowTarget, key) {
      {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot delete "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
      }
    }

    setPrototypeOf(shadowTarget, prototype) {
      {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid prototype mutation: Cannot set prototype on "${originalTarget}". "${originalTarget}" prototype is read-only.`);
      }
    }

    preventExtensions(shadowTarget) {
      {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot preventExtensions on ${originalTarget}". "${originalTarget} is read-only.`);
      }
    }

    defineProperty(shadowTarget, key, descriptor) {
      {
        const {
          originalTarget
        } = this;
        throw new Error(`Invalid mutation: Cannot defineProperty "${key.toString()}" on "${originalTarget}". "${originalTarget}" is read-only.`);
      }
    }

  }

  function extract(objectOrArray) {
    if (isArray(objectOrArray)) {
      return objectOrArray.map(item => {
        const original = unwrap$1(item);

        if (original !== item) {
          return extract(original);
        }

        return item;
      });
    }

    const obj = ObjectCreate(getPrototypeOf(objectOrArray));
    const names = getOwnPropertyNames(objectOrArray);
    return ArrayConcat.call(names, getOwnPropertySymbols(objectOrArray)).reduce((seed, key) => {
      const item = objectOrArray[key];
      const original = unwrap$1(item);

      if (original !== item) {
        seed[key] = extract(original);
      } else {
        seed[key] = item;
      }

      return seed;
    }, obj);
  }

  const formatter = {
    header: plainOrProxy => {
      const originalTarget = unwrap$1(plainOrProxy); // if originalTarget is falsy or not unwrappable, exit

      if (!originalTarget || originalTarget === plainOrProxy) {
        return null;
      }

      const obj = extract(plainOrProxy);
      return ['object', {
        object: obj
      }];
    },
    hasBody: () => {
      return false;
    },
    body: () => {
      return null;
    }
  }; // Inspired from paulmillr/es6-shim
  // https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L176-L185

  function getGlobal() {
    // the only reliable means to get the global object is `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof globalThis !== 'undefined') {
      return globalThis;
    }

    if (typeof self !== 'undefined') {
      return self;
    }

    if (typeof window !== 'undefined') {
      return window;
    }

    if (typeof global !== 'undefined') {
      return global;
    } // Gracefully degrade if not able to locate the global object


    return {};
  }

  function init() {

    const global = getGlobal(); // Custom Formatter for Dev Tools. To enable this, open Chrome Dev Tools
    //  - Go to Settings,
    //  - Under console, select "Enable custom formatters"
    // For more information, https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview

    const devtoolsFormatters = global.devtoolsFormatters || [];
    ArrayPush.call(devtoolsFormatters, formatter);
    global.devtoolsFormatters = devtoolsFormatters;
  }

  {
    init();
  }

  const ObjectDotPrototype = Object.prototype;

  function defaultValueIsObservable(value) {
    // intentionally checking for null
    if (value === null) {
      return false;
    } // treat all non-object types, including undefined, as non-observable values


    if (typeof value !== 'object') {
      return false;
    }

    if (isArray(value)) {
      return true;
    }

    const proto = getPrototypeOf(value);
    return proto === ObjectDotPrototype || proto === null || getPrototypeOf(proto) === null;
  }

  const defaultValueObserved = (obj, key) => {
    /* do nothing */
  };

  const defaultValueMutated = (obj, key) => {
    /* do nothing */
  };

  const defaultValueDistortion = value => value;

  function createShadowTarget(value) {
    return isArray(value) ? [] : {};
  }

  class ReactiveMembrane {
    constructor(options) {
      this.valueDistortion = defaultValueDistortion;
      this.valueMutated = defaultValueMutated;
      this.valueObserved = defaultValueObserved;
      this.valueIsObservable = defaultValueIsObservable;
      this.objectGraph = new WeakMap();

      if (!isUndefined(options)) {
        const {
          valueDistortion,
          valueMutated,
          valueObserved,
          valueIsObservable,
          tagPropertyKey
        } = options;
        this.valueDistortion = isFunction(valueDistortion) ? valueDistortion : defaultValueDistortion;
        this.valueMutated = isFunction(valueMutated) ? valueMutated : defaultValueMutated;
        this.valueObserved = isFunction(valueObserved) ? valueObserved : defaultValueObserved;
        this.valueIsObservable = isFunction(valueIsObservable) ? valueIsObservable : defaultValueIsObservable;
        this.tagPropertyKey = tagPropertyKey;
      }
    }

    getProxy(value) {
      const unwrappedValue = unwrap$1(value);
      const distorted = this.valueDistortion(unwrappedValue);

      if (this.valueIsObservable(distorted)) {
        const o = this.getReactiveState(unwrappedValue, distorted); // when trying to extract the writable version of a readonly
        // we return the readonly.

        return o.readOnly === value ? value : o.reactive;
      }

      return distorted;
    }

    getReadOnlyProxy(value) {
      value = unwrap$1(value);
      const distorted = this.valueDistortion(value);

      if (this.valueIsObservable(distorted)) {
        return this.getReactiveState(value, distorted).readOnly;
      }

      return distorted;
    }

    unwrapProxy(p) {
      return unwrap$1(p);
    }

    getReactiveState(value, distortedValue) {
      const {
        objectGraph
      } = this;
      let reactiveState = objectGraph.get(distortedValue);

      if (reactiveState) {
        return reactiveState;
      }

      const membrane = this;
      reactiveState = {
        get reactive() {
          const reactiveHandler = new ReactiveProxyHandler(membrane, distortedValue); // caching the reactive proxy after the first time it is accessed

          const proxy = new Proxy(createShadowTarget(distortedValue), reactiveHandler);
          registerProxy(proxy, value);
          ObjectDefineProperty(this, 'reactive', {
            value: proxy
          });
          return proxy;
        },

        get readOnly() {
          const readOnlyHandler = new ReadOnlyHandler(membrane, distortedValue); // caching the readOnly proxy after the first time it is accessed

          const proxy = new Proxy(createShadowTarget(distortedValue), readOnlyHandler);
          registerProxy(proxy, value);
          ObjectDefineProperty(this, 'readOnly', {
            value: proxy
          });
          return proxy;
        }

      };
      objectGraph.set(distortedValue, reactiveState);
      return reactiveState;
    }

  }
  /** version: 1.0.0 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const lockerLivePropertyKey = Symbol.for('@@lockerLiveValue');

  function valueDistortion(value) {
    return value;
  }

  const reactiveMembrane = new ReactiveMembrane({
    valueObserved,
    valueMutated,
    valueDistortion,
    tagPropertyKey: lockerLivePropertyKey
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
   * This operation is called with a descriptor of an standard html property
   * that a Custom Element can support (including AOM properties), which
   * determines what kind of capabilities the Base Lightning Element should support. When producing the new descriptors
   * for the Base Lightning Element, it also include the reactivity bit, so the standard property is reactive.
   */


  function createBridgeToElementDescriptor(propName, descriptor) {
    const {
      get,
      set,
      enumerable,
      configurable
    } = descriptor;

    if (!isFunction$1(get)) {
      {
        assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard getter.`);
      }

      throw new TypeError();
    }

    if (!isFunction$1(set)) {
      {
        assert.fail(`Detected invalid public property descriptor for HTMLElement.prototype.${propName} definition. Missing the standard setter.`);
      }

      throw new TypeError();
    }

    return {
      enumerable,
      configurable,

      get() {
        const vm = getAssociatedVM(this);

        if (isBeingConstructed(vm)) {
          {
            logError(`The value of property \`${propName}\` can't be read from the constructor because the owner component hasn't set the value yet. Instead, use the constructor to set a default value for the property.`, vm);
          }

          return;
        }

        componentValueObserved(vm, propName);
        return get.call(vm.elm);
      },

      set(newValue) {
        const vm = getAssociatedVM(this);

        {
          const vmBeingRendered = getVMBeingRendered();
          assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm}.${propName}`);
          assert.invariant(!isUpdatingTemplate, `When updating the template of ${vmBeingRendered}, one of the accessors used by the template has side effects on the state of ${vm}.${propName}`);
          assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
          assert.invariant(!isObject(newValue) || isNull(newValue), `Invalid value "${newValue}" for "${propName}" of ${vm}. Value cannot be an object, must be a primitive value.`);
        }

        if (newValue !== vm.cmpProps[propName]) {
          vm.cmpProps[propName] = newValue;
          componentValueMutated(vm, propName);
        }

        return set.call(vm.elm, newValue);
      }

    };
  }
  /**
   * This class is the base class for any LWC element.
   * Some elements directly extends this class, others implement it via inheritance.
   **/
  // @ts-ignore


  const LightningElement = function () {
    var _a; // This should be as performant as possible, while any initialization should be done lazily


    if (isNull(vmBeingConstructed)) {
      throw new ReferenceError('Illegal constructor');
    }

    const vm = vmBeingConstructed;
    const {
      def,
      elm,
      renderer
    } = vm;
    const {
      bridge
    } = def;

    {
      (_a = renderer.assertInstanceOfHTMLElement) === null || _a === void 0 ? void 0 : _a.call(renderer, vm.elm, `Component creation requires a DOM element to be associated to ${vm}.`);
    }

    const component = this;
    setPrototypeOf$1(elm, bridge.prototype);
    vm.component = this; // Locker hooks assignment. When the LWC engine run with Locker, Locker intercepts all the new
    // component creation and passes hooks to instrument all the component interactions with the
    // engine. We are intentionally hiding this argument from the formal API of LightningElement
    // because we don't want folks to know about it just yet.

    if (arguments.length === 1) {
      const {
        callHook,
        setHook,
        getHook
      } = arguments[0];
      vm.callHook = callHook;
      vm.setHook = setHook;
      vm.getHook = getHook;
    } // Making the component instance a live value when using Locker to support expandos.


    defineProperty$1(component, lockerLivePropertyKey, EmptyObject); // Linking elm, shadow root and component with the VM.

    associateVM(component, vm);
    associateVM(elm, vm);

    if (!runtimeFlags.ENABLE_LIGHT_DOM_COMPONENTS) {
      assert.isTrue(def.renderMode !== RenderMode$1.Light, `${def.name || 'Anonymous class'} is an invalid LWC component. Light DOM components are not available in this environment.`);
    }

    if (vm.renderMode === RenderMode$1.Shadow) {
      attachShadow(vm);
    } // Adding extra guard rails in DEV mode.


    {
      patchCustomElementWithRestrictions(elm);
      patchComponentWithRestrictions(component);
    }

    return this;
  };

  function attachShadow(vm) {
    const {
      elm,
      mode,
      renderer,
      shadowMode,
      def: {
        ctor
      }
    } = vm;
    const cmpRoot = renderer.attachShadow(elm, {
      [KEY__SYNTHETIC_MODE]: shadowMode === ShadowMode.Synthetic,
      delegatesFocus: Boolean(ctor.delegatesFocus),
      mode
    });
    vm.cmpRoot = cmpRoot;
    associateVM(cmpRoot, vm);

    {
      patchShadowRootWithRestrictions(cmpRoot);
    }
  } // @ts-ignore


  LightningElement.prototype = {
    constructor: LightningElement,

    dispatchEvent(event) {
      const {
        elm,
        renderer: {
          dispatchEvent
        }
      } = getAssociatedVM(this);
      return dispatchEvent(elm, event);
    },

    addEventListener(type, listener, options) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          addEventListener
        }
      } = vm;

      {
        const vmBeingRendered = getVMBeingRendered();
        assert.invariant(!isInvokingRender, `${vmBeingRendered}.render() method has side effects on the state of ${vm} by adding an event listener for "${type}".`);
        assert.invariant(!isUpdatingTemplate, `Updating the template of ${vmBeingRendered} has side effects on the state of ${vm} by adding an event listener for "${type}".`);
        assert.invariant(isFunction$1(listener), `Invalid second argument for this.addEventListener() in ${vm} for event "${type}". Expected an EventListener but received ${listener}.`);
      }

      const wrappedListener = getWrappedComponentsListener(vm, listener);
      addEventListener(elm, type, wrappedListener, options);
    },

    removeEventListener(type, listener, options) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          removeEventListener
        }
      } = vm;
      const wrappedListener = getWrappedComponentsListener(vm, listener);
      removeEventListener(elm, type, wrappedListener, options);
    },

    hasAttribute(name) {
      const {
        elm,
        renderer: {
          getAttribute
        }
      } = getAssociatedVM(this);
      return !isNull(getAttribute(elm, name));
    },

    hasAttributeNS(namespace, name) {
      const {
        elm,
        renderer: {
          getAttribute
        }
      } = getAssociatedVM(this);
      return !isNull(getAttribute(elm, name, namespace));
    },

    removeAttribute(name) {
      const {
        elm,
        renderer: {
          removeAttribute
        }
      } = getAssociatedVM(this);
      unlockAttribute(elm, name);
      removeAttribute(elm, name);
      lockAttribute();
    },

    removeAttributeNS(namespace, name) {
      const {
        elm,
        renderer: {
          removeAttribute
        }
      } = getAssociatedVM(this);
      unlockAttribute(elm, name);
      removeAttribute(elm, name, namespace);
      lockAttribute();
    },

    getAttribute(name) {
      const {
        elm,
        renderer: {
          getAttribute
        }
      } = getAssociatedVM(this);
      return getAttribute(elm, name);
    },

    getAttributeNS(namespace, name) {
      const {
        elm,
        renderer: {
          getAttribute
        }
      } = getAssociatedVM(this);
      return getAttribute(elm, name, namespace);
    },

    setAttribute(name, value) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          setAttribute
        }
      } = vm;

      {
        assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
      }

      unlockAttribute(elm, name);
      setAttribute(elm, name, value);
      lockAttribute();
    },

    setAttributeNS(namespace, name, value) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          setAttribute
        }
      } = vm;

      {
        assert.isFalse(isBeingConstructed(vm), `Failed to construct '${getComponentTag(vm)}': The result must not have attributes.`);
      }

      unlockAttribute(elm, name);
      setAttribute(elm, name, value, namespace);
      lockAttribute();
    },

    getBoundingClientRect() {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getBoundingClientRect
        }
      } = vm;

      {
        assert.isFalse(isBeingConstructed(vm), `this.getBoundingClientRect() should not be called during the construction of the custom element for ${getComponentTag(vm)} because the element is not yet in the DOM, instead, you can use it in one of the available life-cycle hooks.`);
      }

      return getBoundingClientRect(elm);
    },

    querySelector(selectors) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          querySelector
        }
      } = vm;

      {
        assert.isFalse(isBeingConstructed(vm), `this.querySelector() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
      }

      return querySelector(elm, selectors);
    },

    querySelectorAll(selectors) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          querySelectorAll
        }
      } = vm;

      {
        assert.isFalse(isBeingConstructed(vm), `this.querySelectorAll() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
      }

      return querySelectorAll(elm, selectors);
    },

    getElementsByTagName(tagNameOrWildCard) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getElementsByTagName
        }
      } = vm;

      {
        assert.isFalse(isBeingConstructed(vm), `this.getElementsByTagName() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
      }

      return getElementsByTagName(elm, tagNameOrWildCard);
    },

    getElementsByClassName(names) {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getElementsByClassName
        }
      } = vm;

      {
        assert.isFalse(isBeingConstructed(vm), `this.getElementsByClassName() cannot be called during the construction of the custom element for ${getComponentTag(vm)} because no children has been added to this element yet.`);
      }

      return getElementsByClassName(elm, names);
    },

    get isConnected() {
      const {
        elm,
        renderer: {
          isConnected
        }
      } = getAssociatedVM(this);
      return isConnected(elm);
    },

    get classList() {
      const vm = getAssociatedVM(this);
      const {
        elm,
        renderer: {
          getClassList
        }
      } = vm;

      {
        // TODO [#1290]: this still fails in dev but works in production, eventually, we should
        // just throw in all modes
        assert.isFalse(isBeingConstructed(vm), `Failed to construct ${vm}: The result must not have attributes. Adding or tampering with classname in constructor is not allowed in a web component, use connectedCallback() instead.`);
      }

      return getClassList(elm);
    },

    get template() {
      const vm = getAssociatedVM(this);

      {
        if (vm.renderMode === RenderMode$1.Light) {
          logError('`this.template` returns null for light DOM components. Since there is no shadow, the rendered content can be accessed via `this` itself. e.g. instead of `this.template.querySelector`, use `this.querySelector`.');
        }
      }

      return vm.cmpRoot;
    },

    get shadowRoot() {
      // From within the component instance, the shadowRoot is always reported as "closed".
      // Authors should rely on this.template instead.
      return null;
    },

    render() {
      const vm = getAssociatedVM(this);
      return vm.def.template;
    },

    toString() {
      const vm = getAssociatedVM(this);
      return `[object ${vm.def.name}]`;
    }

  };
  const lightningBasedDescriptors = create$2(null);

  for (const propName in HTMLElementOriginalDescriptors) {
    lightningBasedDescriptors[propName] = createBridgeToElementDescriptor(propName, HTMLElementOriginalDescriptors[propName]);
  }

  defineProperties$1(LightningElement.prototype, lightningBasedDescriptors);
  defineProperty$1(LightningElement, 'CustomElementConstructor', {
    get() {
      // If required, a runtime-specific implementation must be defined.
      throw new ReferenceError('The current runtime does not support CustomElementConstructor.');
    },

    configurable: true
  });

  {
    patchLightningElementPrototypeWithRestrictions(LightningElement.prototype);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  var PropType;

  (function (PropType) {
    PropType[PropType["Field"] = 0] = "Field";
    PropType[PropType["Set"] = 1] = "Set";
    PropType[PropType["Get"] = 2] = "Get";
    PropType[PropType["GetSet"] = 3] = "GetSet";
  })(PropType || (PropType = {}));

  const signedDecoratorToMetaMap = new Map();

  const defaultMeta = {
    apiMethods: EmptyObject,
    apiFields: EmptyObject,
    apiFieldsConfig: EmptyObject,
    wiredMethods: EmptyObject,
    wiredFields: EmptyObject,
    observedFields: EmptyObject
  };

  function getDecoratorsMeta(Ctor) {
    const meta = signedDecoratorToMetaMap.get(Ctor);
    return isUndefined$3(meta) ? defaultMeta : meta;
  }

  const signedTemplateSet = new Set();

  function defaultEmptyTemplate() {
    return [];
  }

  signedTemplateSet.add(defaultEmptyTemplate);

  function isTemplateRegistered(tpl) {
    return signedTemplateSet.has(tpl);
  }
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by userland code.
   */


  function registerTemplate(tpl) {
    signedTemplateSet.add(tpl); // chaining this method as a way to wrap existing
    // assignment of templates easily, without too much transformation

    return tpl;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // from the element instance, and get the value or set a new value on the component.
  // This means that across different elements, similar names can get the exact same
  // descriptor, so we can cache them:


  const cachedGetterByKey = create$2(null);
  const cachedSetterByKey = create$2(null);

  function createGetter(key) {
    let fn = cachedGetterByKey[key];

    if (isUndefined$3(fn)) {
      fn = cachedGetterByKey[key] = function () {
        const vm = getAssociatedVM(this);
        const {
          getHook
        } = vm;
        return getHook(vm.component, key);
      };
    }

    return fn;
  }

  function createSetter(key) {
    let fn = cachedSetterByKey[key];

    if (isUndefined$3(fn)) {
      fn = cachedSetterByKey[key] = function (newValue) {
        const vm = getAssociatedVM(this);
        const {
          setHook
        } = vm;
        newValue = reactiveMembrane.getReadOnlyProxy(newValue);
        setHook(vm.component, key, newValue);
      };
    }

    return fn;
  }

  function createMethodCaller(methodName) {
    return function () {
      const vm = getAssociatedVM(this);
      const {
        callHook,
        component
      } = vm;
      const fn = component[methodName];
      return callHook(vm.component, fn, ArraySlice.call(arguments));
    };
  }

  function createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback) {
    return function attributeChangedCallback(attrName, oldValue, newValue) {
      if (oldValue === newValue) {
        // Ignore same values.
        return;
      }

      const propName = attributeToPropMap[attrName];

      if (isUndefined$3(propName)) {
        if (!isUndefined$3(superAttributeChangedCallback)) {
          // delegate unknown attributes to the super.
          // Typescript does not like it when you treat the `arguments` object as an array
          // @ts-ignore type-mismatch
          superAttributeChangedCallback.apply(this, arguments);
        }

        return;
      }

      if (!isAttributeLocked(this, attrName)) {
        // Ignore changes triggered by the engine itself during:
        // * diffing when public props are attempting to reflect to the DOM
        // * component via `this.setAttribute()`, should never update the prop
        // Both cases, the setAttribute call is always wrapped by the unlocking of the
        // attribute to be changed
        return;
      } // Reflect attribute change to the corresponding property when changed from outside.


      this[propName] = newValue;
    };
  }

  function HTMLBridgeElementFactory(SuperClass, props, methods) {
    let HTMLBridgeElement;
    /**
     * Modern browsers will have all Native Constructors as regular Classes
     * and must be instantiated with the new keyword. In older browsers,
     * specifically IE11, those are objects with a prototype property defined,
     * since they are not supposed to be extended or instantiated with the
     * new keyword. This forking logic supports both cases, specifically because
     * wc.ts relies on the construction path of the bridges to create new
     * fully qualifying web components.
     */

    if (isFunction$1(SuperClass)) {
      HTMLBridgeElement = class extends SuperClass {};
    } else {
      HTMLBridgeElement = function () {
        // Bridge classes are not supposed to be instantiated directly in
        // browsers that do not support web components.
        throw new TypeError('Illegal constructor');
      }; // prototype inheritance dance


      setPrototypeOf$1(HTMLBridgeElement, SuperClass);
      setPrototypeOf$1(HTMLBridgeElement.prototype, SuperClass.prototype);
      defineProperty$1(HTMLBridgeElement.prototype, 'constructor', {
        writable: true,
        configurable: true,
        value: HTMLBridgeElement
      });
    } // generating the hash table for attributes to avoid duplicate fields and facilitate validation
    // and false positives in case of inheritance.


    const attributeToPropMap = create$2(null);
    const {
      attributeChangedCallback: superAttributeChangedCallback
    } = SuperClass.prototype;
    const {
      observedAttributes: superObservedAttributes = []
    } = SuperClass;
    const descriptors = create$2(null); // expose getters and setters for each public props on the new Element Bridge

    for (let i = 0, len = props.length; i < len; i += 1) {
      const propName = props[i];
      attributeToPropMap[htmlPropertyToAttribute(propName)] = propName;
      descriptors[propName] = {
        get: createGetter(propName),
        set: createSetter(propName),
        enumerable: true,
        configurable: true
      };
    } // expose public methods as props on the new Element Bridge


    for (let i = 0, len = methods.length; i < len; i += 1) {
      const methodName = methods[i];
      descriptors[methodName] = {
        value: createMethodCaller(methodName),
        writable: true,
        configurable: true
      };
    } // creating a new attributeChangedCallback per bridge because they are bound to the corresponding
    // map of attributes to props. We do this after all other props and methods to avoid the possibility
    // of getting overrule by a class declaration in user-land, and we make it non-writable, non-configurable
    // to preserve this definition.


    descriptors.attributeChangedCallback = {
      value: createAttributeChangedCallback(attributeToPropMap, superAttributeChangedCallback)
    }; // Specify attributes for which we want to reflect changes back to their corresponding
    // properties via attributeChangedCallback.

    defineProperty$1(HTMLBridgeElement, 'observedAttributes', {
      get() {
        return [...superObservedAttributes, ...keys$1(attributeToPropMap)];
      }

    });
    defineProperties$1(HTMLBridgeElement.prototype, descriptors);
    return HTMLBridgeElement;
  }

  const BaseBridgeElement = HTMLBridgeElementFactory(HTMLElementConstructor$1, getOwnPropertyNames$2(HTMLElementOriginalDescriptors), []);
  freeze$1(BaseBridgeElement);
  seal$1(BaseBridgeElement.prototype);
  /*
   * Copyright (c) 2020, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function resolveCircularModuleDependency(fn) {
    const module = fn();
    return (module === null || module === void 0 ? void 0 : module.__esModule) ? module.default : module;
  }

  function isCircularModuleDependency(obj) {
    return isFunction$1(obj) && hasOwnProperty$2.call(obj, '__circular__');
  }
  /*
   * Copyright (c) 2020, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const swappedTemplateMap = new WeakMap();
  const swappedComponentMap = new WeakMap();
  const swappedStyleMap = new WeakMap();
  const activeTemplates = new WeakMap();
  const activeComponents = new WeakMap();
  const activeStyles = new WeakMap();

  function flattenStylesheets(stylesheets) {
    const list = [];

    for (const stylesheet of stylesheets) {
      if (!Array.isArray(stylesheet)) {
        list.push(stylesheet);
      } else {
        list.push(...flattenStylesheets(stylesheet));
      }
    }

    return list;
  }

  function getTemplateOrSwappedTemplate(tpl) {

    if (runtimeFlags.ENABLE_HMR) {
      const visited = new Set();

      while (swappedTemplateMap.has(tpl) && !visited.has(tpl)) {
        visited.add(tpl);
        tpl = swappedTemplateMap.get(tpl);
      }
    }

    return tpl;
  }

  function getComponentOrSwappedComponent(Ctor) {

    if (runtimeFlags.ENABLE_HMR) {
      const visited = new Set();

      while (swappedComponentMap.has(Ctor) && !visited.has(Ctor)) {
        visited.add(Ctor);
        Ctor = swappedComponentMap.get(Ctor);
      }
    }

    return Ctor;
  }

  function getStyleOrSwappedStyle(style) {

    if (runtimeFlags.ENABLE_HMR) {
      const visited = new Set();

      while (swappedStyleMap.has(style) && !visited.has(style)) {
        visited.add(style);
        style = swappedStyleMap.get(style);
      }
    }

    return style;
  }

  function setActiveVM(vm) {

    if (runtimeFlags.ENABLE_HMR) {
      // tracking active component
      const Ctor = vm.def.ctor;
      let componentVMs = activeComponents.get(Ctor);

      if (isUndefined$3(componentVMs)) {
        componentVMs = new Set();
        activeComponents.set(Ctor, componentVMs);
      } // this will allow us to keep track of the hot components


      componentVMs.add(vm); // tracking active template

      const tpl = vm.cmpTemplate;

      if (tpl) {
        let templateVMs = activeTemplates.get(tpl);

        if (isUndefined$3(templateVMs)) {
          templateVMs = new Set();
          activeTemplates.set(tpl, templateVMs);
        } // this will allow us to keep track of the templates that are
        // being used by a hot component


        templateVMs.add(vm); // tracking active styles associated to template

        const stylesheets = tpl.stylesheets;

        if (!isUndefined$3(stylesheets)) {
          flattenStylesheets(stylesheets).forEach(stylesheet => {
            // this is necessary because we don't hold the list of styles
            // in the vm, we only hold the selected (already swapped template)
            // but the styles attached to the template might not be the actual
            // active ones, but the swapped versions of those.
            stylesheet = getStyleOrSwappedStyle(stylesheet);
            let stylesheetVMs = activeStyles.get(stylesheet);

            if (isUndefined$3(stylesheetVMs)) {
              stylesheetVMs = new Set();
              activeStyles.set(stylesheet, stylesheetVMs);
            } // this will allow us to keep track of the stylesheet that are
            // being used by a hot component


            stylesheetVMs.add(vm);
          });
        }
      }
    }
  }

  function removeActiveVM(vm) {

    if (runtimeFlags.ENABLE_HMR) {
      // tracking inactive component
      const Ctor = vm.def.ctor;
      let list = activeComponents.get(Ctor);

      if (!isUndefined$3(list)) {
        // deleting the vm from the set to avoid leaking memory
        list.delete(vm);
      } // removing inactive template


      const tpl = vm.cmpTemplate;

      if (tpl) {
        list = activeTemplates.get(tpl);

        if (!isUndefined$3(list)) {
          // deleting the vm from the set to avoid leaking memory
          list.delete(vm);
        } // removing active styles associated to template


        const styles = tpl.stylesheets;

        if (!isUndefined$3(styles)) {
          flattenStylesheets(styles).forEach(style => {
            list = activeStyles.get(style);

            if (!isUndefined$3(list)) {
              // deleting the vm from the set to avoid leaking memory
              list.delete(vm);
            }
          });
        }
      }
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  var RenderMode$1;

  (function (RenderMode) {
    RenderMode[RenderMode["Light"] = 0] = "Light";
    RenderMode[RenderMode["Shadow"] = 1] = "Shadow";
  })(RenderMode$1 || (RenderMode$1 = {}));

  const CtorToDefMap = new WeakMap();

  function getCtorProto(Ctor) {
    let proto = getPrototypeOf$2(Ctor);

    if (isNull(proto)) {
      throw new ReferenceError(`Invalid prototype chain for ${Ctor.name}, you must extend LightningElement.`);
    } // covering the cases where the ref is circular in AMD


    if (isCircularModuleDependency(proto)) {
      const p = resolveCircularModuleDependency(proto);

      {
        if (isNull(p)) {
          throw new ReferenceError(`Circular module dependency for ${Ctor.name}, must resolve to a constructor that extends LightningElement.`);
        }
      } // escape hatch for Locker and other abstractions to provide their own base class instead
      // of our Base class without having to leak it to user-land. If the circular function returns
      // itself, that's the signal that we have hit the end of the proto chain, which must always
      // be base.


      proto = p === proto ? LightningElement : p;
    }

    return proto;
  }

  function createComponentDef(Ctor) {
    const {
      preferNativeShadow: ctorPreferNativeShadow,
      renderMode: ctorRenderMode
    } = Ctor;

    {
      const ctorName = Ctor.name; // Removing the following assert until https://bugs.webkit.org/show_bug.cgi?id=190140 is fixed.
      // assert.isTrue(ctorName && isString(ctorName), `${toString(Ctor)} should have a "name" property with string value, but found ${ctorName}.`);

      assert.isTrue(Ctor.constructor, `Missing ${ctorName}.constructor, ${ctorName} should have a "constructor" property.`);

      if (!isUndefined$3(ctorPreferNativeShadow)) {
        assert.invariant(isBoolean(ctorPreferNativeShadow), `Invalid value for static property preferNativeShadow: '${ctorPreferNativeShadow}'. preferNativeShadow must be a boolean value.`);
      }

      if (!isUndefined$3(ctorRenderMode)) {
        assert.invariant(ctorRenderMode === 'light' || ctorRenderMode === 'shadow', `Invalid value for static property renderMode: '${ctorRenderMode}'. renderMode must be either 'light' or 'shadow'.`);
      }
    }

    const decoratorsMeta = getDecoratorsMeta(Ctor);
    const {
      apiFields,
      apiFieldsConfig,
      apiMethods,
      wiredFields,
      wiredMethods,
      observedFields
    } = decoratorsMeta;
    const proto = Ctor.prototype;
    let {
      connectedCallback,
      disconnectedCallback,
      renderedCallback,
      errorCallback,
      render
    } = proto;
    const superProto = getCtorProto(Ctor);
    const superDef = superProto !== LightningElement ? getComponentInternalDef(superProto) : lightingElementDef;
    const bridge = HTMLBridgeElementFactory(superDef.bridge, keys$1(apiFields), keys$1(apiMethods));
    const props = assign$1(create$2(null), superDef.props, apiFields);
    const propsConfig = assign$1(create$2(null), superDef.propsConfig, apiFieldsConfig);
    const methods = assign$1(create$2(null), superDef.methods, apiMethods);
    const wire = assign$1(create$2(null), superDef.wire, wiredFields, wiredMethods);
    connectedCallback = connectedCallback || superDef.connectedCallback;
    disconnectedCallback = disconnectedCallback || superDef.disconnectedCallback;
    renderedCallback = renderedCallback || superDef.renderedCallback;
    errorCallback = errorCallback || superDef.errorCallback;
    render = render || superDef.render;
    let preferNativeShadow = superDef.preferNativeShadow;

    if (!isUndefined$3(ctorPreferNativeShadow)) {
      preferNativeShadow = Boolean(ctorPreferNativeShadow);
    }

    let renderMode = superDef.renderMode;

    if (!isUndefined$3(ctorRenderMode)) {
      renderMode = ctorRenderMode === 'light' ? RenderMode$1.Light : RenderMode$1.Shadow;
    }

    const template = getComponentRegisteredTemplate(Ctor) || superDef.template;
    const name = Ctor.name || superDef.name; // installing observed fields into the prototype.

    defineProperties$1(proto, observedFields);
    const def = {
      ctor: Ctor,
      name,
      wire,
      props,
      propsConfig,
      methods,
      bridge,
      template,
      preferNativeShadow,
      renderMode,
      connectedCallback,
      disconnectedCallback,
      renderedCallback,
      errorCallback,
      render
    };

    {
      freeze$1(Ctor.prototype);
    }

    return def;
  }
  /**
   * EXPERIMENTAL: This function allows for the identification of LWC constructors. This API is
   * subject to change or being removed.
   */


  function isComponentConstructor(ctor) {
    if (!isFunction$1(ctor)) {
      return false;
    } // Fast path: LightningElement is part of the prototype chain of the constructor.


    if (ctor.prototype instanceof LightningElement) {
      return true;
    } // Slow path: LightningElement is not part of the prototype chain of the constructor, we need
    // climb up the constructor prototype chain to check in case there are circular dependencies
    // to resolve.


    let current = ctor;

    do {
      if (isCircularModuleDependency(current)) {
        const circularResolved = resolveCircularModuleDependency(current); // If the circular function returns itself, that's the signal that we have hit the end
        // of the proto chain, which must always be a valid base constructor.

        if (circularResolved === current) {
          return true;
        }

        current = circularResolved;
      }

      if (current === LightningElement) {
        return true;
      }
    } while (!isNull(current) && (current = getPrototypeOf$2(current))); // Finally return false if the LightningElement is not part of the prototype chain.


    return false;
  }

  function getComponentInternalDef(Ctor) {
    {
      Ctor = getComponentOrSwappedComponent(Ctor);
    }

    let def = CtorToDefMap.get(Ctor);

    if (isUndefined$3(def)) {
      if (isCircularModuleDependency(Ctor)) {
        const resolvedCtor = resolveCircularModuleDependency(Ctor);
        def = getComponentInternalDef(resolvedCtor); // Cache the unresolved component ctor too. The next time if the same unresolved ctor is used,
        // look up the definition in cache instead of re-resolving and recreating the def.

        CtorToDefMap.set(Ctor, def);
        return def;
      }

      if (!isComponentConstructor(Ctor)) {
        throw new TypeError(`${Ctor} is not a valid component, or does not extends LightningElement from "lwc". You probably forgot to add the extend clause on the class declaration.`);
      }

      def = createComponentDef(Ctor);
      CtorToDefMap.set(Ctor, def);
    }

    return def;
  }

  const lightingElementDef = {
    ctor: LightningElement,
    name: LightningElement.name,
    props: lightningBasedDescriptors,
    propsConfig: EmptyObject,
    methods: EmptyObject,
    preferNativeShadow: false,
    renderMode: RenderMode$1.Shadow,
    wire: EmptyObject,
    bridge: BaseBridgeElement,
    template: defaultEmptyTemplate,
    render: LightningElement.prototype.render
  };
  var PropDefType;

  (function (PropDefType) {
    PropDefType["any"] = "any";
  })(PropDefType || (PropDefType = {}));
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function handleEvent(event, vnode) {
    const {
      type
    } = event;
    const {
      data: {
        on
      }
    } = vnode;
    const handler = on && on[type]; // call event handler if exists

    if (handler) {
      handler.call(undefined, event);
    }
  }

  function createListener() {
    return function handler(event) {
      handleEvent(event, handler.vnode);
    };
  }

  function updateAllEventListeners(oldVnode, vnode) {
    if (isUndefined$3(oldVnode.listener)) {
      createAllEventListeners(vnode);
    } else {
      vnode.listener = oldVnode.listener;
      vnode.listener.vnode = vnode;
    }
  }

  function createAllEventListeners(vnode) {
    const {
      elm,
      data: {
        on
      },
      owner: {
        renderer
      }
    } = vnode;

    if (isUndefined$3(on)) {
      return;
    }

    const listener = vnode.listener = createListener();
    listener.vnode = vnode;
    let name;

    for (name in on) {
      renderer.addEventListener(elm, name, listener);
    }
  }

  var modEvents = {
    update: updateAllEventListeners,
    create: createAllEventListeners
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const xlinkNS = 'http://www.w3.org/1999/xlink';
  const xmlNS = 'http://www.w3.org/XML/1998/namespace';
  const ColonCharCode = 58;

  function updateAttrs(oldVnode, vnode) {
    const {
      data: {
        attrs
      },
      owner: {
        renderer
      }
    } = vnode;

    if (isUndefined$3(attrs)) {
      return;
    }

    let {
      data: {
        attrs: oldAttrs
      }
    } = oldVnode;

    if (oldAttrs === attrs) {
      return;
    }

    {
      assert.invariant(isUndefined$3(oldAttrs) || keys$1(oldAttrs).join(',') === keys$1(attrs).join(','), `vnode.data.attrs cannot change shape.`);
    }

    const elm = vnode.elm;
    const {
      setAttribute,
      removeAttribute
    } = renderer;
    let key;
    oldAttrs = isUndefined$3(oldAttrs) ? EmptyObject : oldAttrs; // update modified attributes, add new attributes
    // this routine is only useful for data-* attributes in all kind of elements
    // and aria-* in standard elements (custom elements will use props for these)

    for (key in attrs) {
      const cur = attrs[key];
      const old = oldAttrs[key];

      if (old !== cur) {
        unlockAttribute(elm, key);

        if (StringCharCodeAt.call(key, 3) === ColonCharCode) {
          // Assume xml namespace
          setAttribute(elm, key, cur, xmlNS);
        } else if (StringCharCodeAt.call(key, 5) === ColonCharCode) {
          // Assume xlink namespace
          setAttribute(elm, key, cur, xlinkNS);
        } else if (isNull(cur)) {
          removeAttribute(elm, key);
        } else {
          setAttribute(elm, key, cur);
        }

        lockAttribute();
      }
    }
  }

  const emptyVNode$3 = {
    data: {}
  };
  var modAttrs = {
    create: vnode => updateAttrs(emptyVNode$3, vnode),
    update: updateAttrs
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function isLiveBindingProp(sel, key) {
    // For properties with live bindings, we read values from the DOM element
    // instead of relying on internally tracked values.
    return sel === 'input' && (key === 'value' || key === 'checked');
  }

  function update(oldVnode, vnode) {
    const props = vnode.data.props;

    if (isUndefined$3(props)) {
      return;
    }

    const oldProps = oldVnode.data.props;

    if (oldProps === props) {
      return;
    }

    {
      assert.invariant(isUndefined$3(oldProps) || keys$1(oldProps).join(',') === keys$1(props).join(','), 'vnode.data.props cannot change shape.');
    }

    const isFirstPatch = isUndefined$3(oldProps);
    const {
      elm,
      sel,
      owner: {
        renderer
      }
    } = vnode;

    for (const key in props) {
      const cur = props[key]; // if it is the first time this element is patched, or the current value is different to the previous value...

      if (isFirstPatch || cur !== (isLiveBindingProp(sel, key) ? renderer.getProperty(elm, key) : oldProps[key])) {
        renderer.setProperty(elm, key, cur);
      }
    }
  }

  const emptyVNode$2 = {
    data: {}
  };
  var modProps = {
    create: vnode => update(emptyVNode$2, vnode),
    update
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  const classNameToClassMap = create$2(null);

  function getMapFromClassName(className) {
    // Intentionally using == to match undefined and null values from computed style attribute
    if (className == null) {
      return EmptyObject;
    } // computed class names must be string


    className = isString(className) ? className : className + '';
    let map = classNameToClassMap[className];

    if (map) {
      return map;
    }

    map = create$2(null);
    let start = 0;
    let o;
    const len = className.length;

    for (o = 0; o < len; o++) {
      if (StringCharCodeAt.call(className, o) === SPACE_CHAR) {
        if (o > start) {
          map[StringSlice.call(className, start, o)] = true;
        }

        start = o + 1;
      }
    }

    if (o > start) {
      map[StringSlice.call(className, start, o)] = true;
    }

    classNameToClassMap[className] = map;

    {
      // just to make sure that this object never changes as part of the diffing algo
      freeze$1(map);
    }

    return map;
  }

  function updateClassAttribute(oldVnode, vnode) {
    const {
      elm,
      data: {
        className: newClass
      },
      owner: {
        renderer
      }
    } = vnode;
    const {
      data: {
        className: oldClass
      }
    } = oldVnode;

    if (oldClass === newClass) {
      return;
    }

    const classList = renderer.getClassList(elm);
    const newClassMap = getMapFromClassName(newClass);
    const oldClassMap = getMapFromClassName(oldClass);
    let name;

    for (name in oldClassMap) {
      // remove only if it is not in the new class collection and it is not set from within the instance
      if (isUndefined$3(newClassMap[name])) {
        classList.remove(name);
      }
    }

    for (name in newClassMap) {
      if (isUndefined$3(oldClassMap[name])) {
        classList.add(name);
      }
    }
  }

  const emptyVNode$1 = {
    data: {}
  };
  var modComputedClassName = {
    create: vnode => updateClassAttribute(emptyVNode$1, vnode),
    update: updateClassAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function updateStyleAttribute(oldVnode, vnode) {
    const {
      elm,
      data: {
        style: newStyle
      },
      owner: {
        renderer
      }
    } = vnode;
    const {
      setAttribute,
      removeAttribute
    } = renderer;

    if (oldVnode.data.style === newStyle) {
      return;
    }

    if (!isString(newStyle) || newStyle === '') {
      removeAttribute(elm, 'style');
    } else {
      setAttribute(elm, 'style', newStyle);
    }
  }

  const emptyVNode = {
    data: {}
  };
  var modComputedStyle = {
    create: vnode => updateStyleAttribute(emptyVNode, vnode),
    update: updateStyleAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // The compiler takes care of transforming the inline classnames into an object. It's faster to set the
  // different classnames properties individually instead of via a string.

  function createClassAttribute(vnode) {
    const {
      elm,
      data: {
        classMap
      },
      owner: {
        renderer
      }
    } = vnode;

    if (isUndefined$3(classMap)) {
      return;
    }

    const classList = renderer.getClassList(elm);

    for (const name in classMap) {
      classList.add(name);
    }
  }

  var modStaticClassName = {
    create: createClassAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */
  // The compiler takes care of transforming the inline style into an object. It's faster to set the
  // different style properties individually instead of via a string.

  function createStyleAttribute(vnode) {
    const {
      elm,
      data: {
        styleMap
      },
      owner: {
        renderer
      }
    } = vnode;

    if (isUndefined$3(styleMap)) {
      return;
    }

    for (const name in styleMap) {
      renderer.setCSSStyleProperty(elm, name, styleMap[name]);
    }
  }

  var modStaticStyle = {
    create: createStyleAttribute
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  /**
  @license
  Copyright (c) 2015 Simon Friis Vindum.
  This code may only be used under the MIT License found at
  https://github.com/snabbdom/snabbdom/blob/master/LICENSE
  Code distributed by Snabbdom as part of the Snabbdom project at
  https://github.com/snabbdom/snabbdom/
  */

  function isUndef(s) {
    return s === undefined;
  }

  function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
  }

  function isVNode(vnode) {
    return vnode != null;
  }

  function createKeyToOldIdx(children, beginIdx, endIdx) {
    const map = {};
    let j, key, ch; // TODO [#1637]: simplify this by assuming that all vnodes has keys

    for (j = beginIdx; j <= endIdx; ++j) {
      ch = children[j];

      if (isVNode(ch)) {
        key = ch.key;

        if (key !== undefined) {
          map[key] = j;
        }
      }
    }

    return map;
  }

  function addVnodes(parentElm, before, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx];

      if (isVNode(ch)) {
        ch.hook.create(ch);
        ch.hook.insert(ch, parentElm, before);
      }
    }
  }

  function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]; // text nodes do not have logic associated to them

      if (isVNode(ch)) {
        ch.hook.remove(ch, parentElm);
      }
    }
  }

  function updateDynamicChildren(parentElm, oldCh, newCh) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    const newChEnd = newCh.length - 1;
    let newEndIdx = newChEnd;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let oldKeyToIdx;
    let idxInOld;
    let elmToMove;
    let before;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (!isVNode(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
      } else if (!isVNode(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (!isVNode(newStartVnode)) {
        newStartVnode = newCh[++newStartIdx];
      } else if (!isVNode(newEndVnode)) {
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode);
        newEndVnode.hook.move(oldStartVnode, parentElm, oldEndVnode.owner.renderer.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode);
        newStartVnode.hook.move(oldEndVnode, parentElm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (oldKeyToIdx === undefined) {
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        }

        idxInOld = oldKeyToIdx[newStartVnode.key];

        if (isUndef(idxInOld)) {
          // New element
          newStartVnode.hook.create(newStartVnode);
          newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];

          if (isVNode(elmToMove)) {
            if (elmToMove.sel !== newStartVnode.sel) {
              // New element
              newStartVnode.hook.create(newStartVnode);
              newStartVnode.hook.insert(newStartVnode, parentElm, oldStartVnode.elm);
            } else {
              patchVnode(elmToMove, newStartVnode);
              oldCh[idxInOld] = undefined;
              newStartVnode.hook.move(elmToMove, parentElm, oldStartVnode.elm);
            }
          }

          newStartVnode = newCh[++newStartIdx];
        }
      }
    }

    if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
      if (oldStartIdx > oldEndIdx) {
        // There's some cases in which the sub array of vnodes to be inserted is followed by null(s) and an
        // already processed vnode, in such cases the vnodes to be inserted should be before that processed vnode.
        let i = newEndIdx;
        let n;

        do {
          n = newCh[++i];
        } while (!isVNode(n) && i < newChEnd);

        before = isVNode(n) ? n.elm : null;
        addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx);
      } else {
        removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
      }
    }
  }

  function updateStaticChildren(parentElm, oldCh, newCh) {
    const oldChLength = oldCh.length;
    const newChLength = newCh.length;

    if (oldChLength === 0) {
      // the old list is empty, we can directly insert anything new
      addVnodes(parentElm, null, newCh, 0, newChLength);
      return;
    }

    if (newChLength === 0) {
      // the old list is nonempty and the new list is empty so we can directly remove all old nodes
      // this is the case in which the dynamic children of an if-directive should be removed
      removeVnodes(parentElm, oldCh, 0, oldChLength);
      return;
    } // if the old list is not empty, the new list MUST have the same
    // amount of nodes, that's why we call this static children


    let referenceElm = null;

    for (let i = newChLength - 1; i >= 0; i -= 1) {
      const vnode = newCh[i];
      const oldVNode = oldCh[i];

      if (vnode !== oldVNode) {
        if (isVNode(oldVNode)) {
          if (isVNode(vnode)) {
            // both vnodes must be equivalent, and se just need to patch them
            patchVnode(oldVNode, vnode);
            referenceElm = vnode.elm;
          } else {
            // removing the old vnode since the new one is null
            oldVNode.hook.remove(oldVNode, parentElm);
          }
        } else if (isVNode(vnode)) {
          // this condition is unnecessary
          vnode.hook.create(vnode); // insert the new node one since the old one is null

          vnode.hook.insert(vnode, parentElm, referenceElm);
          referenceElm = vnode.elm;
        }
      }
    }
  }

  function patchVnode(oldVnode, vnode) {
    if (oldVnode !== vnode) {
      vnode.elm = oldVnode.elm;
      vnode.hook.update(oldVnode, vnode);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const noop$4 = () => void 0;

  function observeElementChildNodes(elm) {
    elm.$domManual$ = true;
  }

  function setElementShadowToken(elm, token) {
    elm.$shadowToken$ = token;
  }

  function updateNodeHook(oldVnode, vnode) {
    const {
      elm,
      text,
      owner: {
        renderer
      }
    } = vnode;

    if (oldVnode.text !== text) {
      {
        unlockDomMutation();
      }

      renderer.setText(elm, text);

      {
        lockDomMutation();
      }
    }
  }

  function insertNodeHook(vnode, parentNode, referenceNode) {
    const {
      renderer
    } = vnode.owner;

    {
      unlockDomMutation();
    }

    renderer.insert(vnode.elm, parentNode, referenceNode);

    {
      lockDomMutation();
    }
  }

  function removeNodeHook(vnode, parentNode) {
    const {
      renderer
    } = vnode.owner;

    {
      unlockDomMutation();
    }

    renderer.remove(vnode.elm, parentNode);

    {
      lockDomMutation();
    }
  }

  function createElmHook(vnode) {
    modEvents.create(vnode); // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.

    modAttrs.create(vnode);
    modProps.create(vnode);
    modStaticClassName.create(vnode);
    modStaticStyle.create(vnode);
    modComputedClassName.create(vnode);
    modComputedStyle.create(vnode);
  }

  var LWCDOMMode;

  (function (LWCDOMMode) {
    LWCDOMMode["manual"] = "manual";
  })(LWCDOMMode || (LWCDOMMode = {}));

  function fallbackElmHook(elm, vnode) {
    const {
      owner
    } = vnode;

    if (owner.shadowMode === ShadowMode.Synthetic) {
      const {
        data: {
          context
        }
      } = vnode;
      const {
        shadowAttribute
      } = owner.context;

      if (!isUndefined$3(context) && !isUndefined$3(context.lwc) && context.lwc.dom === LWCDOMMode.manual) {
        // this element will now accept any manual content inserted into it
        observeElementChildNodes(elm);
      } // when running in synthetic shadow mode, we need to set the shadowToken value
      // into each element from the template, so they can be styled accordingly.


      setElementShadowToken(elm, shadowAttribute);
    }

    {
      const {
        data: {
          context
        }
      } = vnode;
      const isPortal = !isUndefined$3(context) && !isUndefined$3(context.lwc) && context.lwc.dom === LWCDOMMode.manual;
      const isLight = owner.renderMode === RenderMode$1.Light;
      patchElementWithRestrictions(elm, {
        isPortal,
        isLight
      });
    }
  }

  function updateElmHook(oldVnode, vnode) {
    // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.
    modAttrs.update(oldVnode, vnode);
    modProps.update(oldVnode, vnode);
    modComputedClassName.update(oldVnode, vnode);
    modComputedStyle.update(oldVnode, vnode);
  }

  function updateChildrenHook(oldVnode, vnode) {
    const {
      children,
      owner
    } = vnode;
    const fn = hasDynamicChildren(children) ? updateDynamicChildren : updateStaticChildren;
    runWithBoundaryProtection(owner, owner.owner, noop$4, () => {
      fn(vnode.elm, oldVnode.children, children);
    }, noop$4);
  }

  function allocateChildrenHook(vnode, vm) {
    // A component with slots will re-render because:
    // 1- There is a change of the internal state.
    // 2- There is a change on the external api (ex: slots)
    //
    // In case #1, the vnodes in the cmpSlots will be reused since they didn't changed. This routine emptied the
    // slotted children when those VCustomElement were rendered and therefore in subsequent calls to allocate children
    // in a reused VCustomElement, there won't be any slotted children.
    // For those cases, we will use the reference for allocated children stored when rendering the fresh VCustomElement.
    //
    // In case #2, we will always get a fresh VCustomElement.
    const children = vnode.aChildren || vnode.children;
    vm.aChildren = children;
    const {
      renderMode,
      shadowMode
    } = vm;

    if (shadowMode === ShadowMode.Synthetic || renderMode === RenderMode$1.Light) {
      // slow path
      allocateInSlot(vm, children); // save the allocated children in case this vnode is reused.

      vnode.aChildren = children; // every child vnode is now allocated, and the host should receive none directly, it receives them via the shadow!

      vnode.children = EmptyArray;
    }
  }

  function createViewModelHook(elm, vnode) {
    if (!isUndefined$3(getAssociatedVMIfPresent(elm))) {
      // There is a possibility that a custom element is registered under tagName,
      // in which case, the initialization is already carry on, and there is nothing else
      // to do here since this hook is called right after invoking `document.createElement`.
      return;
    }

    const {
      sel,
      mode,
      ctor,
      owner
    } = vnode;

    if (owner.shadowMode === ShadowMode.Synthetic) {
      const {
        shadowAttribute
      } = owner.context; // when running in synthetic shadow mode, we need to set the shadowToken value
      // into each element from the template, so they can be styled accordingly.

      setElementShadowToken(elm, shadowAttribute);
    }

    const def = getComponentInternalDef(ctor);
    createVM(elm, def, {
      mode,
      owner,
      tagName: sel,
      renderer: owner.renderer
    });

    {
      assert.isTrue(isArray$1(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
    }
  }

  function createCustomElmHook(vnode) {
    modEvents.create(vnode); // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.

    modAttrs.create(vnode);
    modProps.create(vnode);
    modStaticClassName.create(vnode);
    modStaticStyle.create(vnode);
    modComputedClassName.create(vnode);
    modComputedStyle.create(vnode);
  }

  function createChildrenHook(vnode) {
    const {
      elm,
      children
    } = vnode;

    for (let j = 0; j < children.length; ++j) {
      const ch = children[j];

      if (ch != null) {
        ch.hook.create(ch);
        ch.hook.insert(ch, elm, null);
      }
    }
  }

  function updateCustomElmHook(oldVnode, vnode) {
    // Attrs need to be applied to element before props
    // IE11 will wipe out value on radio inputs if value
    // is set before type=radio.
    modAttrs.update(oldVnode, vnode);
    modProps.update(oldVnode, vnode);
    modComputedClassName.update(oldVnode, vnode);
    modComputedStyle.update(oldVnode, vnode);
  }

  function removeElmHook(vnode) {
    // this method only needs to search on child vnodes from template
    // to trigger the remove hook just in case some of those children
    // are custom elements.
    const {
      children,
      elm
    } = vnode;

    for (let j = 0, len = children.length; j < len; ++j) {
      const ch = children[j];

      if (!isNull(ch)) {
        ch.hook.remove(ch, elm);
      }
    }
  } // Using a WeakMap instead of a WeakSet because this one works in IE11 :(


  const FromIteration = new WeakMap(); // dynamic children means it was generated by an iteration
  // in a template, and will require a more complex diffing algo.

  function markAsDynamicChildren(children) {
    FromIteration.set(children, 1);
  }

  function hasDynamicChildren(children) {
    return FromIteration.has(children);
  }
  /*
   * Copyright (c) 2020, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function getUpgradableConstructor(tagName, renderer) {
    // Should never get a tag with upper case letter at this point, the compiler should
    // produce only tags with lowercase letters
    // But, for backwards compatibility, we will lower case the tagName
    tagName = tagName.toLowerCase();
    let CE = renderer.getCustomElement(tagName);

    if (!isUndefined$3(CE)) {
      return CE;
    }
    /**
     * LWC Upgradable Element reference to an element that was created
     * via the scoped registry mechanism, and that is ready to be upgraded.
     */


    CE = class LWCUpgradableElement extends renderer.HTMLElement {
      constructor(upgradeCallback) {
        super();

        if (isFunction$1(upgradeCallback)) {
          upgradeCallback(this); // nothing to do with the result for now
        }
      }

    };
    renderer.defineCustomElement(tagName, CE);
    return CE;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const CHAR_S = 115;
  const CHAR_V = 118;
  const CHAR_G = 103;
  const NamespaceAttributeForSVG = 'http://www.w3.org/2000/svg';
  const SymbolIterator = Symbol.iterator;
  const TextHook = {
    create: vnode => {
      const {
        owner
      } = vnode;
      const {
        renderer
      } = owner;
      const elm = renderer.createText(vnode.text);
      linkNodeToShadow(elm, owner);
      vnode.elm = elm;
    },
    update: updateNodeHook,
    insert: insertNodeHook,
    move: insertNodeHook,
    remove: removeNodeHook
  };
  const CommentHook = {
    create: vnode => {
      const {
        owner,
        text
      } = vnode;
      const {
        renderer
      } = owner;
      const elm = renderer.createComment(text);
      linkNodeToShadow(elm, owner);
      vnode.elm = elm;
    },
    update: updateNodeHook,
    insert: insertNodeHook,
    move: insertNodeHook,
    remove: removeNodeHook
  }; // insert is called after update, which is used somewhere else (via a module)
  // to mark the vm as inserted, that means we cannot use update as the main channel
  // to rehydrate when dirty, because sometimes the element is not inserted just yet,
  // which breaks some invariants. For that reason, we have the following for any
  // Custom Element that is inserted via a template.

  const ElementHook = {
    create: vnode => {
      const {
        sel,
        owner,
        data: {
          ns
        }
      } = vnode;
      const {
        renderer
      } = owner;
      const elm = renderer.createElement(sel, ns);
      linkNodeToShadow(elm, owner);
      fallbackElmHook(elm, vnode);
      vnode.elm = elm;
      createElmHook(vnode);
    },
    update: (oldVnode, vnode) => {
      updateElmHook(oldVnode, vnode);
      updateChildrenHook(oldVnode, vnode);
    },
    insert: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
      createChildrenHook(vnode);
    },
    move: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
    },
    remove: (vnode, parentNode) => {
      removeNodeHook(vnode, parentNode);
      removeElmHook(vnode);
    }
  };
  const CustomElementHook = {
    create: vnode => {
      const {
        sel,
        owner
      } = vnode;
      const {
        renderer
      } = owner;
      const UpgradableConstructor = getUpgradableConstructor(sel, renderer);
      /**
       * Note: if the upgradable constructor does not expect, or throw when we new it
       * with a callback as the first argument, we could implement a more advanced
       * mechanism that only passes that argument if the constructor is known to be
       * an upgradable custom element.
       */

      const elm = new UpgradableConstructor(elm => {
        // the custom element from the registry is expecting an upgrade callback
        createViewModelHook(elm, vnode);
      });
      linkNodeToShadow(elm, owner);
      vnode.elm = elm;
      const vm = getAssociatedVMIfPresent(elm);

      if (vm) {
        allocateChildrenHook(vnode, vm);
      } else if (vnode.ctor !== UpgradableConstructor) {
        throw new TypeError(`Incorrect Component Constructor`);
      }

      createCustomElmHook(vnode);
    },
    update: (oldVnode, vnode) => {
      updateCustomElmHook(oldVnode, vnode);
      const vm = getAssociatedVMIfPresent(vnode.elm);

      if (vm) {
        // in fallback mode, the allocation will always set children to
        // empty and delegate the real allocation to the slot elements
        allocateChildrenHook(vnode, vm);
      } // in fallback mode, the children will be always empty, so, nothing
      // will happen, but in native, it does allocate the light dom


      updateChildrenHook(oldVnode, vnode);

      if (vm) {
        {
          assert.isTrue(isArray$1(vnode.children), `Invalid vnode for a custom element, it must have children defined.`);
        } // this will probably update the shadowRoot, but only if the vm is in a dirty state
        // this is important to preserve the top to bottom synchronous rendering phase.


        rerenderVM(vm);
      }
    },
    insert: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
      const vm = getAssociatedVMIfPresent(vnode.elm);

      if (vm) {
        {
          assert.isTrue(vm.state === VMState.created, `${vm} cannot be recycled.`);
        }

        runConnectedCallback(vm);
      }

      createChildrenHook(vnode);

      if (vm) {
        appendVM(vm);
      }
    },
    move: (vnode, parentNode, referenceNode) => {
      insertNodeHook(vnode, parentNode, referenceNode);
    },
    remove: (vnode, parentNode) => {
      removeNodeHook(vnode, parentNode);
      const vm = getAssociatedVMIfPresent(vnode.elm);

      if (vm) {
        // for custom elements we don't have to go recursively because the removeVM routine
        // will take care of disconnecting any child VM attached to its shadow as well.
        removeVM(vm);
      }
    }
  };

  function linkNodeToShadow(elm, owner) {
    const {
      shadowMode
    } = owner; // TODO [#1164]: this should eventually be done by the polyfill directly

    if (shadowMode === ShadowMode.Synthetic) {
      elm[KEY__SHADOW_RESOLVER] = getRenderRoot(owner)[KEY__SHADOW_RESOLVER];
    }
  } // TODO [#1136]: this should be done by the compiler, adding ns to every sub-element


  function addNS(vnode) {
    const {
      data,
      children,
      sel
    } = vnode;
    data.ns = NamespaceAttributeForSVG; // TODO [#1275]: review why `sel` equal `foreignObject` should get this `ns`

    if (isArray$1(children) && sel !== 'foreignObject') {
      for (let j = 0, n = children.length; j < n; ++j) {
        const childNode = children[j];

        if (childNode != null && childNode.hook === ElementHook) {
          addNS(childNode);
        }
      }
    }
  }

  function addVNodeToChildLWC(vnode) {
    ArrayPush$2.call(getVMBeingRendered().velements, vnode);
  } // [h]tml node


  function h(sel, data, children) {
    const vmBeingRendered = getVMBeingRendered();

    {
      assert.isTrue(isString(sel), `h() 1st argument sel must be a string.`);
      assert.isTrue(isObject(data), `h() 2nd argument data must be an object.`);
      assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
      assert.isTrue('key' in data, ` <${sel}> "key" attribute is invalid or missing for ${vmBeingRendered}. Key inside iterator is either undefined or null.`); // checking reserved internal data properties

      assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
      assert.isFalse(data.styleMap && data.style, `vnode.data.styleMap and vnode.data.style ambiguous declaration.`);

      if (data.style && !isString(data.style)) {
        logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
      }

      forEach.call(children, childVnode => {
        if (childVnode != null) {
          assert.isTrue(childVnode && 'sel' in childVnode && 'data' in childVnode && 'children' in childVnode && 'text' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
        }
      });
    }

    const {
      key
    } = data;
    let text, elm;
    const vnode = {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: ElementHook,
      owner: vmBeingRendered
    };

    if (sel.length === 3 && StringCharCodeAt.call(sel, 0) === CHAR_S && StringCharCodeAt.call(sel, 1) === CHAR_V && StringCharCodeAt.call(sel, 2) === CHAR_G) {
      addNS(vnode);
    }

    return vnode;
  } // [t]ab[i]ndex function


  function ti(value) {
    // if value is greater than 0, we normalize to 0
    // If value is an invalid tabIndex value (null, undefined, string, etc), we let that value pass through
    // If value is less than -1, we don't care
    const shouldNormalize = value > 0 && !(isTrue$2(value) || isFalse$2(value));

    {
      const vmBeingRendered = getVMBeingRendered();

      if (shouldNormalize) {
        logError(`Invalid tabindex value \`${toString$1(value)}\` in template for ${vmBeingRendered}. This attribute must be set to 0 or -1.`, vmBeingRendered);
      }
    }

    return shouldNormalize ? 0 : value;
  } // [s]lot element node


  function s(slotName, data, children, slotset) {
    {
      assert.isTrue(isString(slotName), `s() 1st argument slotName must be a string.`);
      assert.isTrue(isObject(data), `s() 2nd argument data must be an object.`);
      assert.isTrue(isArray$1(children), `h() 3rd argument children must be an array.`);
    }

    if (!isUndefined$3(slotset) && !isUndefined$3(slotset[slotName]) && slotset[slotName].length !== 0) {
      children = slotset[slotName];
    }

    const vmBeingRendered = getVMBeingRendered();
    const {
      renderMode,
      shadowMode
    } = vmBeingRendered;

    if (renderMode === RenderMode$1.Light) {
      sc(children);
      return children;
    }

    if (shadowMode === ShadowMode.Synthetic) {
      // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic
      sc(children);
    }

    return h('slot', data, children);
  } // [c]ustom element node


  function c(sel, Ctor, data, children = EmptyArray) {
    const vmBeingRendered = getVMBeingRendered();

    {
      assert.isTrue(isString(sel), `c() 1st argument sel must be a string.`);
      assert.isTrue(isFunction$1(Ctor), `c() 2nd argument Ctor must be a function.`);
      assert.isTrue(isObject(data), `c() 3nd argument data must be an object.`);
      assert.isTrue(arguments.length === 3 || isArray$1(children), `c() 4nd argument data must be an array.`); // checking reserved internal data properties

      assert.isFalse(data.className && data.classMap, `vnode.data.className and vnode.data.classMap ambiguous declaration.`);
      assert.isFalse(data.styleMap && data.style, `vnode.data.styleMap and vnode.data.style ambiguous declaration.`);

      if (data.style && !isString(data.style)) {
        logError(`Invalid 'style' attribute passed to <${sel}> is ignored. This attribute must be a string value.`, vmBeingRendered);
      }

      if (arguments.length === 4) {
        forEach.call(children, childVnode => {
          if (childVnode != null) {
            assert.isTrue(childVnode && 'sel' in childVnode && 'data' in childVnode && 'children' in childVnode && 'text' in childVnode && 'elm' in childVnode && 'key' in childVnode, `${childVnode} is not a vnode.`);
          }
        });
      }
    }

    const {
      key
    } = data;
    let text, elm;
    const vnode = {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: CustomElementHook,
      ctor: Ctor,
      owner: vmBeingRendered,
      mode: 'open' // TODO [#1294]: this should be defined in Ctor

    };
    addVNodeToChildLWC(vnode);
    return vnode;
  } // [i]terable node


  function i(iterable, factory) {
    const list = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

    sc(list);
    const vmBeingRendered = getVMBeingRendered();

    if (isUndefined$3(iterable) || iterable === null) {
      {
        logError(`Invalid template iteration for value "${toString$1(iterable)}" in ${vmBeingRendered}. It must be an Array or an iterable Object.`, vmBeingRendered);
      }

      return list;
    }

    {
      assert.isFalse(isUndefined$3(iterable[SymbolIterator]), `Invalid template iteration for value \`${toString$1(iterable)}\` in ${vmBeingRendered}. It must be an array-like object and not \`null\` nor \`undefined\`.`);
    }

    const iterator = iterable[SymbolIterator]();

    {
      assert.isTrue(iterator && isFunction$1(iterator.next), `Invalid iterator function for "${toString$1(iterable)}" in ${vmBeingRendered}.`);
    }

    let next = iterator.next();
    let j = 0;
    let {
      value,
      done: last
    } = next;
    let keyMap;
    let iterationError;

    {
      keyMap = create$2(null);
    }

    while (last === false) {
      // implementing a look-back-approach because we need to know if the element is the last
      next = iterator.next();
      last = next.done; // template factory logic based on the previous collected value

      const vnode = factory(value, j, j === 0, last);

      if (isArray$1(vnode)) {
        ArrayPush$2.apply(list, vnode);
      } else {
        ArrayPush$2.call(list, vnode);
      }

      {
        const vnodes = isArray$1(vnode) ? vnode : [vnode];
        forEach.call(vnodes, childVnode => {
          if (!isNull(childVnode) && isObject(childVnode) && !isUndefined$3(childVnode.sel)) {
            const {
              key
            } = childVnode;

            if (isString(key) || isNumber(key)) {
              if (keyMap[key] === 1 && isUndefined$3(iterationError)) {
                iterationError = `Duplicated "key" attribute value for "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. A key with value "${childVnode.key}" appears more than once in the iteration. Key values must be unique numbers or strings.`;
              }

              keyMap[key] = 1;
            } else if (isUndefined$3(iterationError)) {
              iterationError = `Invalid "key" attribute value in "<${childVnode.sel}>" in ${vmBeingRendered} for item number ${j}. Set a unique "key" value on all iterated child elements.`;
            }
          }
        });
      } // preparing next value


      j += 1;
      value = next.value;
    }

    {
      if (!isUndefined$3(iterationError)) {
        logError(iterationError, vmBeingRendered);
      }
    }

    return list;
  }
  /**
   * [f]lattening
   */


  function f(items) {
    {
      assert.isTrue(isArray$1(items), 'flattening api can only work with arrays.');
    }

    const len = items.length;
    const flattened = []; // TODO [#1276]: compiler should give us some sort of indicator when a vnodes collection is dynamic

    sc(flattened);

    for (let j = 0; j < len; j += 1) {
      const item = items[j];

      if (isArray$1(item)) {
        ArrayPush$2.apply(flattened, item);
      } else {
        ArrayPush$2.call(flattened, item);
      }
    }

    return flattened;
  } // [t]ext node


  function t(text) {
    const data = EmptyObject;
    let sel, children, key, elm;
    return {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: TextHook,
      owner: getVMBeingRendered()
    };
  } // [co]mment node


  function co(text) {
    const data = EmptyObject;
    let sel, children, key, elm;
    return {
      sel,
      data,
      children,
      text,
      elm,
      key,
      hook: CommentHook,
      owner: getVMBeingRendered()
    };
  } // [d]ynamic value to produce a text vnode


  function d(value) {
    if (value == null) {
      return null;
    }

    return t(value);
  } // [b]ind function


  function b(fn) {
    const vmBeingRendered = getVMBeingRendered();

    if (isNull(vmBeingRendered)) {
      throw new Error();
    }

    const vm = vmBeingRendered;
    return function (event) {
      invokeEventListener(vm, fn, vm.component, event);
    };
  } // [k]ey function


  function k(compilerKey, obj) {
    switch (typeof obj) {
      case 'number':
      case 'string':
        return compilerKey + ':' + obj;

      case 'object':
        {
          assert.fail(`Invalid key value "${obj}" in ${getVMBeingRendered()}. Key must be a string or number.`);
        }

    }
  } // [g]lobal [id] function


  function gid(id) {
    const vmBeingRendered = getVMBeingRendered();

    if (isUndefined$3(id) || id === '') {
      {
        logError(`Invalid id value "${id}". The id attribute must contain a non-empty string.`, vmBeingRendered);
      }

      return id;
    } // We remove attributes when they are assigned a value of null


    if (isNull(id)) {
      return null;
    }

    const {
      idx,
      renderMode,
      shadowMode
    } = vmBeingRendered;

    if (shadowMode === ShadowMode.Synthetic && renderMode === RenderMode$1.Shadow) {
      return StringReplace.call(id, /\S+/g, id => `${id}-${idx}`);
    }

    return id;
  } // [f]ragment [id] function


  function fid(url) {
    const vmBeingRendered = getVMBeingRendered();

    if (isUndefined$3(url) || url === '') {
      {
        if (isUndefined$3(url)) {
          logError(`Undefined url value for "href" or "xlink:href" attribute. Expected a non-empty string.`, vmBeingRendered);
        }
      }

      return url;
    } // We remove attributes when they are assigned a value of null


    if (isNull(url)) {
      return null;
    }

    const {
      idx,
      renderMode,
      shadowMode
    } = vmBeingRendered; // Apply transformation only for fragment-only-urls, and only in shadow DOM

    if (shadowMode === ShadowMode.Synthetic && renderMode === RenderMode$1.Shadow && /^#/.test(url)) {
      return `${url}-${idx}`;
    }

    return url;
  }
  /**
   * Map to store an index value assigned to any dynamic component reference ingested
   * by dc() api. This allows us to generate a unique unique per template per dynamic
   * component reference to avoid diffing algo mismatches.
   */


  const DynamicImportedComponentMap = new Map();
  let dynamicImportedComponentCounter = 0;
  /**
   * create a dynamic component via `<x-foo lwc:dynamic={Ctor}>`
   */

  function dc(sel, Ctor, data, children) {
    {
      assert.isTrue(isString(sel), `dc() 1st argument sel must be a string.`);
      assert.isTrue(isObject(data), `dc() 3nd argument data must be an object.`);
      assert.isTrue(arguments.length === 3 || isArray$1(children), `dc() 4nd argument data must be an array.`);
    } // null or undefined values should produce a null value in the VNodes


    if (Ctor == null) {
      return null;
    }

    if (!isComponentConstructor(Ctor)) {
      throw new Error(`Invalid LWC Constructor ${toString$1(Ctor)} for custom element <${sel}>.`);
    }

    let idx = DynamicImportedComponentMap.get(Ctor);

    if (isUndefined$3(idx)) {
      idx = dynamicImportedComponentCounter++;
      DynamicImportedComponentMap.set(Ctor, idx);
    } // the new vnode key is a mix of idx and compiler key, this is required by the diffing algo
    // to identify different constructors as vnodes with different keys to avoid reusing the
    // element used for previous constructors.


    data.key = `dc:${idx}:${data.key}`;
    return c(sel, Ctor, data, children);
  }
  /**
   * slow children collection marking mechanism. this API allows the compiler to signal
   * to the engine that a particular collection of children must be diffed using the slow
   * algo based on keys due to the nature of the list. E.g.:
   *
   *   - slot element's children: the content of the slot has to be dynamic when in synthetic
   *                              shadow mode because the `vnode.children` might be the slotted
   *                              content vs default content, in which case the size and the
   *                              keys are not matching.
   *   - children that contain dynamic components
   *   - children that are produced by iteration
   *
   */


  function sc(vnodes) {
    {
      assert.isTrue(isArray$1(vnodes), 'sc() api can only work with arrays.');
    } // We have to mark the vnodes collection as dynamic so we can later on
    // choose to use the snabbdom virtual dom diffing algo instead of our
    // static dummy algo.


    markAsDynamicChildren(vnodes);
    return vnodes;
  }

  var api = /*#__PURE__*/Object.freeze({
    __proto__: null,
    h: h,
    ti: ti,
    s: s,
    c: c,
    i: i,
    f: f,
    t: t,
    co: co,
    d: d,
    b: b,
    k: k,
    gid: gid,
    fid: fid,
    dc: dc,
    sc: sc
  });
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function createInlineStyleVNode(content) {
    return h('style', {
      key: 'style',
      attrs: {
        type: 'text/css'
      }
    }, [t(content)]);
  }

  function updateSyntheticShadowAttributes(vm, template) {
    const {
      elm,
      context,
      renderer,
      renderMode
    } = vm;
    const {
      stylesheets: newStylesheets,
      stylesheetTokens: newStylesheetTokens
    } = template;
    let newTokens; // Reset the styling token applied to the host element.

    const oldHostAttribute = context.hostAttribute;

    if (!isUndefined$3(oldHostAttribute)) {
      renderer.removeAttribute(elm, oldHostAttribute);
    } // Apply the new template styling token to the host element, if the new template has any
    // associated stylesheets.


    if (!isUndefined$3(newStylesheets) && newStylesheets.length !== 0 && renderMode === RenderMode.Shadow) {
      newTokens = newStylesheetTokens;
    }

    if (!isUndefined$3(newTokens)) {
      renderer.setAttribute(elm, newTokens.hostAttribute, '');
    } // Update the styling tokens present on the context object.


    context.hostAttribute = newTokens === null || newTokens === void 0 ? void 0 : newTokens.hostAttribute;
    context.shadowAttribute = newTokens === null || newTokens === void 0 ? void 0 : newTokens.shadowAttribute;
  }

  function evaluateStylesheetsContent(stylesheets, hostSelector, shadowSelector, nativeShadow) {
    const content = [];

    for (let i = 0; i < stylesheets.length; i++) {
      let stylesheet = stylesheets[i];

      if (isArray$1(stylesheet)) {
        ArrayPush$2.apply(content, evaluateStylesheetsContent(stylesheet, hostSelector, shadowSelector, nativeShadow));
      } else {
        {
          // in dev-mode, we support hot swapping of stylesheet, which means that
          // the component instance might be attempting to use an old version of
          // the stylesheet, while internally, we have a replacement for it.
          stylesheet = getStyleOrSwappedStyle(stylesheet);
        }

        ArrayPush$2.call(content, stylesheet(hostSelector, shadowSelector, nativeShadow));
      }
    }

    return content;
  }

  function getStylesheetsContent(vm, template) {
    const {
      stylesheets,
      stylesheetTokens
    } = template;
    const {
      renderMode,
      shadowMode
    } = vm;
    let content = [];

    if (!isUndefined$3(stylesheets) && stylesheets.length !== 0) {
      let hostSelector;
      let shadowSelector; // Scoping with the tokens is only necessary for synthetic shadow. For both
      // light DOM elements and native shadow, we just render the CSS as-is.

      if (renderMode === RenderMode.Shadow && shadowMode === ShadowMode.Synthetic && !isUndefined$3(stylesheetTokens)) {
        hostSelector = `[${stylesheetTokens.hostAttribute}]`;
        shadowSelector = `[${stylesheetTokens.shadowAttribute}]`;
      } else {
        hostSelector = '';
        shadowSelector = '';
      }

      content = evaluateStylesheetsContent(stylesheets, hostSelector, shadowSelector, shadowMode === ShadowMode.Native);
    }

    return content;
  }

  function createStylesheet(vm, stylesheets) {
    const {
      renderer,
      renderMode,
      shadowMode
    } = vm;

    if (renderMode === RenderMode.Shadow && shadowMode === ShadowMode.Synthetic) {
      for (let i = 0; i < stylesheets.length; i++) {
        renderer.insertGlobalStylesheet(stylesheets[i]);
      }

      return null;
    } else {
      // native shadow or light DOM
      const combinedStylesheetContent = ArrayJoin.call(stylesheets, '\n');
      return createInlineStyleVNode(combinedStylesheetContent);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  var GlobalMeasurementPhase;

  (function (GlobalMeasurementPhase) {
    GlobalMeasurementPhase["REHYDRATE"] = "lwc-rehydrate";
    GlobalMeasurementPhase["HYDRATE"] = "lwc-hydrate";
  })(GlobalMeasurementPhase || (GlobalMeasurementPhase = {})); // Even if all the browser the engine supports implements the UserTiming API, we need to guard the measure APIs.
  // JSDom (used in Jest) for example doesn't implement the UserTiming APIs.


  const isUserTimingSupported = typeof performance !== 'undefined' && typeof performance.mark === 'function' && typeof performance.clearMarks === 'function' && typeof performance.measure === 'function' && typeof performance.clearMeasures === 'function';

  function getMarkName(phase, vm) {
    // Adding the VM idx to the mark name creates a unique mark name component instance. This is necessary to produce
    // the right measures for components that are recursive.
    return `${getComponentTag(vm)} - ${phase} - ${vm.idx}`;
  }

  function getMeasureName(phase, vm) {
    return `${getComponentTag(vm)} - ${phase}`;
  }

  function start(markName) {
    performance.mark(markName);
  }

  function end(measureName, markName) {
    performance.measure(measureName, markName); // Clear the created marks and measure to avoid filling the performance entries buffer.
    // Note: Even if the entries get deleted, existing PerformanceObservers preserve a copy of those entries.

    performance.clearMarks(markName);
    performance.clearMarks(measureName);
  }

  function noop$3() {
    /* do nothing */
  }

  const startMeasure = !isUserTimingSupported ? noop$3 : function (phase, vm) {
    const markName = getMarkName(phase, vm);
    start(markName);
  };
  const endMeasure = !isUserTimingSupported ? noop$3 : function (phase, vm) {
    const markName = getMarkName(phase, vm);
    const measureName = getMeasureName(phase, vm);
    end(measureName, markName);
  };
  const startGlobalMeasure = !isUserTimingSupported ? noop$3 : function (phase, vm) {
    const markName = isUndefined$3(vm) ? phase : getMarkName(phase, vm);
    start(markName);
  };
  const endGlobalMeasure = !isUserTimingSupported ? noop$3 : function (phase, vm) {
    const markName = isUndefined$3(vm) ? phase : getMarkName(phase, vm);
    end(phase, markName);
  };
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  function noop$2(_opId, _phase, _cmpName, _vm_idx) {}

  let logOperation = noop$2;
  var OperationId;

  (function (OperationId) {
    OperationId[OperationId["constructor"] = 0] = "constructor";
    OperationId[OperationId["render"] = 1] = "render";
    OperationId[OperationId["patch"] = 2] = "patch";
    OperationId[OperationId["connectedCallback"] = 3] = "connectedCallback";
    OperationId[OperationId["renderedCallback"] = 4] = "renderedCallback";
    OperationId[OperationId["disconnectedCallback"] = 5] = "disconnectedCallback";
    OperationId[OperationId["errorCallback"] = 6] = "errorCallback";
  })(OperationId || (OperationId = {}));

  var Phase;

  (function (Phase) {
    Phase[Phase["Start"] = 0] = "Start";
    Phase[Phase["Stop"] = 1] = "Stop";
  })(Phase || (Phase = {}));

  const opIdToMeasurementPhaseMappingArray = ['constructor', 'render', 'patch', 'connectedCallback', 'renderedCallback', 'disconnectedCallback', 'errorCallback'];
  let profilerEnabled$3 = false;
  let logMarks = false;
  let bufferLogging = false;

  {
    profilerEnabled$3 = true;
    logMarks = true;
    bufferLogging = false;
  }

  function trackProfilerState(callback) {
    callback(profilerEnabled$3);
  }

  function logOperationStart(opId, vm) {
    if (logMarks) {
      startMeasure(opIdToMeasurementPhaseMappingArray[opId], vm);
    }

    if (bufferLogging) {
      logOperation(opId, Phase.Start, vm.tagName, vm.idx);
    }
  }

  function logOperationEnd(opId, vm) {
    if (logMarks) {
      endMeasure(opIdToMeasurementPhaseMappingArray[opId], vm);
    }

    if (bufferLogging) {
      logOperation(opId, Phase.Stop, vm.tagName, vm.idx);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */

  let isUpdatingTemplate = false;
  let vmBeingRendered = null;

  function getVMBeingRendered() {
    return vmBeingRendered;
  }

  function setVMBeingRendered(vm) {
    vmBeingRendered = vm;
  }

  let profilerEnabled$2 = false;
  trackProfilerState(t => profilerEnabled$2 = t);

  function validateSlots(vm, html) {

    const {
      cmpSlots
    } = vm;
    const {
      slots = EmptyArray
    } = html;

    for (const slotName in cmpSlots) {
      // eslint-disable-next-line lwc-internal/no-production-assert
      assert.isTrue(isArray$1(cmpSlots[slotName]), `Slots can only be set to an array, instead received ${toString$1(cmpSlots[slotName])} for slot "${slotName}" in ${vm}.`);

      if (slotName !== '' && ArrayIndexOf$1.call(slots, slotName) === -1) {
        // TODO [#1297]: this should never really happen because the compiler should always validate
        // eslint-disable-next-line lwc-internal/no-production-assert
        logError(`Ignoring unknown provided slot name "${slotName}" in ${vm}. Check for a typo on the slot attribute.`, vm);
      }
    }
  }

  function validateLightDomTemplate(template, vm) {
    if (template === defaultEmptyTemplate) return;

    if (vm.renderMode === RenderMode$1.Light) {
      assert.isTrue(template.renderMode === 'light', `Light DOM components can't render shadow DOM templates. Add an 'lwc:render-mode="light"' directive on the root template tag.`);
    } else {
      assert.isTrue(isUndefined$3(template.renderMode), `Shadow DOM components template can't render light DOM templates. Either remove the 'lwc:render-mode' directive or set it to 'lwc:render-mode="shadow"`);
    }
  }

  function evaluateTemplate(vm, html) {
    {
      assert.isTrue(isFunction$1(html), `evaluateTemplate() second argument must be an imported template instead of ${toString$1(html)}`); // in dev-mode, we support hot swapping of templates, which means that
      // the component instance might be attempting to use an old version of
      // the template, while internally, we have a replacement for it.

      html = getTemplateOrSwappedTemplate(html);
    }

    const isUpdatingTemplateInception = isUpdatingTemplate;
    const vmOfTemplateBeingUpdatedInception = vmBeingRendered;
    let vnodes = [];
    runWithBoundaryProtection(vm, vm.owner, () => {
      // pre
      vmBeingRendered = vm;

      if (profilerEnabled$2) {
        logOperationStart(OperationId.render, vm);
      }
    }, () => {
      // job
      const {
        component,
        context,
        cmpSlots,
        cmpTemplate,
        tro,
        shadowMode
      } = vm;
      tro.observe(() => {
        // Reset the cache memoizer for template when needed.
        if (html !== cmpTemplate) {
          if ("development" !== 'production') {
            validateLightDomTemplate(html, vm);
          } // Perf opt: do not reset the shadow root during the first rendering (there is
          // nothing to reset).


          if (!isNull(cmpTemplate)) {
            // It is important to reset the content to avoid reusing similar elements
            // generated from a different template, because they could have similar IDs,
            // and snabbdom just rely on the IDs.
            resetComponentRoot(vm);
          } // Check that the template was built by the compiler.


          if (!isTemplateRegistered(html)) {
            throw new TypeError(`Invalid template returned by the render() method on ${vm}. It must return an imported template (e.g.: \`import html from "./${vm.def.name}.html"\`), instead, it has returned: ${toString$1(html)}.`);
          }

          vm.cmpTemplate = html; // Create a brand new template cache for the swapped templated.

          context.tplCache = create$2(null); // Update the synthetic shadow attributes on the host element if necessary.

          if (shadowMode === ShadowMode.Synthetic) {
            updateSyntheticShadowAttributes(vm, html);
          } // Evaluate, create stylesheet and cache the produced VNode for future
          // re-rendering.


          const stylesheetsContent = getStylesheetsContent(vm, html);
          context.styleVNode = stylesheetsContent.length === 0 ? null : createStylesheet(vm, stylesheetsContent);
        }

        if ("development" !== 'production') {
          // validating slots in every rendering since the allocated content might change over time
          validateSlots(vm, html); // add the VM to the list of host VMs that can be re-rendered if html is swapped

          setActiveVM(vm);
        } // right before producing the vnodes, we clear up all internal references
        // to custom elements from the template.


        vm.velements = []; // Set the global flag that template is being updated

        isUpdatingTemplate = true;
        vnodes = html.call(undefined, api, component, cmpSlots, context.tplCache);
        const {
          styleVNode
        } = context;

        if (!isNull(styleVNode)) {
          ArrayUnshift.call(vnodes, styleVNode);
        }
      });
    }, () => {
      // post
      isUpdatingTemplate = isUpdatingTemplateInception;
      vmBeingRendered = vmOfTemplateBeingUpdatedInception;

      if (profilerEnabled$2) {
        logOperationEnd(OperationId.render, vm);
      }
    });

    {
      assert.invariant(isArray$1(vnodes), `Compiler should produce html functions that always return an array.`);
    }

    return vnodes;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  function addErrorComponentStack(vm, error) {
    if (!isFrozen$1(error) && isUndefined$3(error.wcStack)) {
      const wcStack = getErrorComponentStack(vm);
      defineProperty$1(error, 'wcStack', {
        get() {
          return wcStack;
        }

      });
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  let isInvokingRender = false;
  let vmBeingConstructed = null;

  function isBeingConstructed(vm) {
    return vmBeingConstructed === vm;
  }

  let profilerEnabled$1 = false;
  trackProfilerState(t => profilerEnabled$1 = t);

  const noop$1 = () => void 0;

  function invokeComponentCallback(vm, fn, args) {
    const {
      component,
      callHook,
      owner
    } = vm;
    let result;
    runWithBoundaryProtection(vm, owner, noop$1, () => {
      // job
      result = callHook(component, fn, args);
    }, noop$1);
    return result;
  }

  function invokeComponentConstructor(vm, Ctor) {
    const vmBeingConstructedInception = vmBeingConstructed;
    let error;

    if (profilerEnabled$1) {
      logOperationStart(OperationId.constructor, vm);
    }

    vmBeingConstructed = vm;
    /**
     * Constructors don't need to be wrapped with a boundary because for root elements
     * it should throw, while elements from template are already wrapped by a boundary
     * associated to the diffing algo.
     */

    try {
      // job
      const result = new Ctor(); // Check indirectly if the constructor result is an instance of LightningElement. Using
      // the "instanceof" operator would not work here since Locker Service provides its own
      // implementation of LightningElement, so we indirectly check if the base constructor is
      // invoked by accessing the component on the vm.

      if (vmBeingConstructed.component !== result) {
        throw new TypeError('Invalid component constructor, the class should extend LightningElement.');
      }
    } catch (e) {
      error = Object(e);
    } finally {
      if (profilerEnabled$1) {
        logOperationEnd(OperationId.constructor, vm);
      }

      vmBeingConstructed = vmBeingConstructedInception;

      if (!isUndefined$3(error)) {
        addErrorComponentStack(vm, error); // re-throwing the original error annotated after restoring the context

        throw error; // eslint-disable-line no-unsafe-finally
      }
    }
  }

  function invokeComponentRenderMethod(vm) {
    const {
      def: {
        render
      },
      callHook,
      component,
      owner
    } = vm;
    const isRenderBeingInvokedInception = isInvokingRender;
    const vmBeingRenderedInception = getVMBeingRendered();
    let html;
    let renderInvocationSuccessful = false;
    runWithBoundaryProtection(vm, owner, () => {
      // pre
      isInvokingRender = true;
      setVMBeingRendered(vm);
    }, () => {
      // job
      vm.tro.observe(() => {
        html = callHook(component, render);
        renderInvocationSuccessful = true;
      });
    }, () => {
      // post
      isInvokingRender = isRenderBeingInvokedInception;
      setVMBeingRendered(vmBeingRenderedInception);
    }); // If render() invocation failed, process errorCallback in boundary and return an empty template

    return renderInvocationSuccessful ? evaluateTemplate(vm, html) : [];
  }

  function invokeComponentRenderedCallback(vm) {
    const {
      def: {
        renderedCallback
      },
      component,
      callHook,
      owner
    } = vm;

    if (!isUndefined$3(renderedCallback)) {
      runWithBoundaryProtection(vm, owner, () => {
        if (profilerEnabled$1) {
          logOperationStart(OperationId.renderedCallback, vm);
        }
      }, () => {
        // job
        callHook(component, renderedCallback);
      }, () => {
        // post
        if (profilerEnabled$1) {
          logOperationEnd(OperationId.renderedCallback, vm);
        }
      });
    }
  }

  function invokeEventListener(vm, fn, thisValue, event) {
    const {
      callHook,
      owner
    } = vm;
    runWithBoundaryProtection(vm, owner, noop$1, () => {
      // job
      if ("development" !== 'production') {
        assert.isTrue(isFunction$1(fn), `Invalid event handler for event '${event.type}' on ${vm}.`);
      }

      callHook(thisValue, fn, [event]);
    }, noop$1);
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const signedTemplateMap = new Map();
  /**
   * INTERNAL: This function can only be invoked by compiled code. The compiler
   * will prevent this function from being imported by userland code.
   */

  function registerComponent(Ctor, {
    tmpl
  }) {
    signedTemplateMap.set(Ctor, tmpl); // chaining this method as a way to wrap existing assignment of component constructor easily,
    // without too much transformation

    return Ctor;
  }

  function getComponentRegisteredTemplate(Ctor) {
    return signedTemplateMap.get(Ctor);
  }

  function createComponent(vm, Ctor) {
    // create the component instance
    invokeComponentConstructor(vm, Ctor);

    if (isUndefined$3(vm.component)) {
      throw new ReferenceError(`Invalid construction for ${Ctor}, you must extend LightningElement.`);
    }
  }

  function getTemplateReactiveObserver(vm) {
    return new ReactiveObserver(() => {
      const {
        isDirty
      } = vm;

      if (isFalse$2(isDirty)) {
        markComponentAsDirty(vm);
        scheduleRehydration(vm);
      }
    });
  }

  function renderComponent(vm) {
    {
      assert.invariant(vm.isDirty, `${vm} is not dirty.`);
    }

    vm.tro.reset();
    const vnodes = invokeComponentRenderMethod(vm);
    vm.isDirty = false;
    vm.isScheduled = false;

    {
      assert.invariant(isArray$1(vnodes), `${vm}.render() should always return an array of vnodes instead of ${vnodes}`);
    }

    return vnodes;
  }

  function markComponentAsDirty(vm) {
    {
      const vmBeingRendered = getVMBeingRendered();
      assert.isFalse(vm.isDirty, `markComponentAsDirty() for ${vm} should not be called when the component is already dirty.`);
      assert.isFalse(isInvokingRender, `markComponentAsDirty() for ${vm} cannot be called during rendering of ${vmBeingRendered}.`);
      assert.isFalse(isUpdatingTemplate, `markComponentAsDirty() for ${vm} cannot be called while updating template of ${vmBeingRendered}.`);
    }

    vm.isDirty = true;
  }

  const cmpEventListenerMap = new WeakMap();

  function getWrappedComponentsListener(vm, listener) {
    if (!isFunction$1(listener)) {
      throw new TypeError(); // avoiding problems with non-valid listeners
    }

    let wrappedListener = cmpEventListenerMap.get(listener);

    if (isUndefined$3(wrappedListener)) {
      wrappedListener = function (event) {
        invokeEventListener(vm, listener, undefined, event);
      };

      cmpEventListenerMap.set(listener, wrappedListener);
    }

    return wrappedListener;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const Services = create$2(null);

  function invokeServiceHook(vm, cbs) {
    {
      assert.isTrue(isArray$1(cbs) && cbs.length > 0, `Optimize invokeServiceHook() to be invoked only when needed`);
    }

    const {
      component,
      def,
      context
    } = vm;

    for (let i = 0, len = cbs.length; i < len; ++i) {
      cbs[i].call(undefined, component, {}, def, context);
    }
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const isNativeShadowRootDefined = _globalThis$1[KEY__IS_NATIVE_SHADOW_ROOT_DEFINED];
  var VMState;

  (function (VMState) {
    VMState[VMState["created"] = 0] = "created";
    VMState[VMState["connected"] = 1] = "connected";
    VMState[VMState["disconnected"] = 2] = "disconnected";
  })(VMState || (VMState = {}));

  var RenderMode;

  (function (RenderMode) {
    RenderMode[RenderMode["Light"] = 0] = "Light";
    RenderMode[RenderMode["Shadow"] = 1] = "Shadow";
  })(RenderMode || (RenderMode = {}));

  var ShadowMode;

  (function (ShadowMode) {
    ShadowMode[ShadowMode["Native"] = 0] = "Native";
    ShadowMode[ShadowMode["Synthetic"] = 1] = "Synthetic";
  })(ShadowMode || (ShadowMode = {}));

  let profilerEnabled = false;
  trackProfilerState(t => profilerEnabled = t);
  let idx = 0;
  /** The internal slot used to associate different objects the engine manipulates with the VM */

  const ViewModelReflection = createHiddenField('ViewModel', 'engine');

  function callHook(cmp, fn, args = []) {
    return fn.apply(cmp, args);
  }

  function setHook(cmp, prop, newValue) {
    cmp[prop] = newValue;
  }

  function getHook(cmp, prop) {
    return cmp[prop];
  }

  function rerenderVM(vm) {
    rehydrate(vm);
  }

  function connectRootElement(elm) {
    const vm = getAssociatedVM(elm);
    startGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm); // Usually means moving the element from one place to another, which is observable via
    // life-cycle hooks.

    if (vm.state === VMState.connected) {
      disconnectRootElement(elm);
    }

    runConnectedCallback(vm);
    rehydrate(vm);
    endGlobalMeasure(GlobalMeasurementPhase.HYDRATE, vm);
  }

  function disconnectRootElement(elm) {
    const vm = getAssociatedVM(elm);
    resetComponentStateWhenRemoved(vm);
  }

  function appendVM(vm) {
    rehydrate(vm);
  } // just in case the component comes back, with this we guarantee re-rendering it
  // while preventing any attempt to rehydration until after reinsertion.


  function resetComponentStateWhenRemoved(vm) {
    const {
      state
    } = vm;

    if (state !== VMState.disconnected) {
      const {
        oar,
        tro
      } = vm; // Making sure that any observing record will not trigger the rehydrated on this vm

      tro.reset(); // Making sure that any observing accessor record will not trigger the setter to be reinvoked

      for (const key in oar) {
        oar[key].reset();
      }

      runDisconnectedCallback(vm); // Spec: https://dom.spec.whatwg.org/#concept-node-remove (step 14-15)

      runChildNodesDisconnectedCallback(vm);
      runLightChildNodesDisconnectedCallback(vm);
    }

    {
      removeActiveVM(vm);
    }
  } // this method is triggered by the diffing algo only when a vnode from the
  // old vnode.children is removed from the DOM.


  function removeVM(vm) {
    {
      assert.isTrue(vm.state === VMState.connected || vm.state === VMState.disconnected, `${vm} must have been connected.`);
    }

    resetComponentStateWhenRemoved(vm);
  }

  function getNearestShadowAncestor(vm) {
    let ancestor = vm.owner;

    while (!isNull(ancestor) && ancestor.renderMode === RenderMode.Light) {
      ancestor = ancestor.owner;
    }

    return ancestor;
  }

  function assertNotSyntheticComposedWithinNative(vm) {
    const isSynthetic = vm.renderMode === RenderMode.Shadow && vm.shadowMode === ShadowMode.Synthetic;

    if (!isSynthetic) {
      return;
    }

    const ancestor = getNearestShadowAncestor(vm);

    if (!isNull(ancestor)) {
      // Any native shadow component being an ancestor of a synthetic shadow component is disallowed.
      assert.isFalse(ancestor.renderMode === RenderMode.Shadow && ancestor.shadowMode === ShadowMode.Native, `${getComponentTag(vm)} (synthetic shadow DOM) cannot be composed inside of ${getComponentTag(ancestor)} (native shadow DOM), because synthetic-within-native composition is disallowed`);
    }
  }

  function createVM(elm, def, options) {
    const {
      mode,
      owner,
      renderer,
      tagName
    } = options;
    let shadowMode;

    if (renderer.syntheticShadow) {
      shadowMode = def.preferNativeShadow && isNativeShadowRootDefined ? ShadowMode.Native : ShadowMode.Synthetic;
    } else {
      shadowMode = ShadowMode.Native;
    }

    const vm = {
      elm,
      def,
      idx: idx++,
      state: VMState.created,
      isScheduled: false,
      isDirty: true,
      tagName,
      mode,
      owner,
      renderer,
      children: EmptyArray,
      aChildren: EmptyArray,
      velements: EmptyArray,
      cmpProps: create$2(null),
      cmpFields: create$2(null),
      cmpSlots: create$2(null),
      oar: create$2(null),
      cmpTemplate: null,
      renderMode: def.renderMode,
      shadowMode,
      context: {
        hostAttribute: undefined,
        shadowAttribute: undefined,
        styleVNode: null,
        tplCache: EmptyObject,
        wiredConnecting: EmptyArray,
        wiredDisconnecting: EmptyArray
      },
      tro: null,
      component: null,
      cmpRoot: null,
      callHook,
      setHook,
      getHook
    };
    vm.tro = getTemplateReactiveObserver(vm);

    {
      vm.toString = () => {
        return `[object:vm ${def.name} (${vm.idx})]`;
      };

      assertNotSyntheticComposedWithinNative(vm);
    } // Create component instance associated to the vm and the element.


    createComponent(vm, def.ctor); // Initializing the wire decorator per instance only when really needed

    if (isFalse$2(renderer.ssr) && hasWireAdapters(vm)) {
      installWireAdapters(vm);
    }

    return vm;
  }

  function assertIsVM(obj) {
    if (isNull(obj) || !isObject(obj) || !('cmpRoot' in obj)) {
      throw new TypeError(`${obj} is not a VM.`);
    }
  }

  function associateVM(obj, vm) {
    setHiddenField(obj, ViewModelReflection, vm);
  }

  function getAssociatedVM(obj) {
    const vm = getHiddenField(obj, ViewModelReflection);

    {
      assertIsVM(vm);
    }

    return vm;
  }

  function getAssociatedVMIfPresent(obj) {
    const maybeVm = getHiddenField(obj, ViewModelReflection);

    {
      if (!isUndefined$3(maybeVm)) {
        assertIsVM(maybeVm);
      }
    }

    return maybeVm;
  }

  function rehydrate(vm) {
    if (isTrue$2(vm.isDirty)) {
      const children = renderComponent(vm);
      patchShadowRoot(vm, children);
    }
  }

  function patchShadowRoot(vm, newCh) {
    const {
      children: oldCh
    } = vm; // caching the new children collection

    vm.children = newCh;

    if (newCh.length > 0 || oldCh.length > 0) {
      // patch function mutates vnodes by adding the element reference,
      // however, if patching fails it contains partial changes.
      if (oldCh !== newCh) {
        const fn = hasDynamicChildren(newCh) ? updateDynamicChildren : updateStaticChildren;
        runWithBoundaryProtection(vm, vm, () => {
          // pre
          if (profilerEnabled) {
            logOperationStart(OperationId.patch, vm);
          }
        }, () => {
          // job
          const elementToRenderTo = getRenderRoot(vm);
          fn(elementToRenderTo, oldCh, newCh);
        }, () => {
          // post
          if (profilerEnabled) {
            logOperationEnd(OperationId.patch, vm);
          }
        });
      }
    }

    if (vm.state === VMState.connected) {
      // If the element is connected, that means connectedCallback was already issued, and
      // any successive rendering should finish with the call to renderedCallback, otherwise
      // the connectedCallback will take care of calling it in the right order at the end of
      // the current rehydration process.
      runRenderedCallback(vm);
    }
  }

  function runRenderedCallback(vm) {
    if (isTrue$2(vm.renderer.ssr)) {
      return;
    }

    const {
      rendered
    } = Services;

    if (rendered) {
      invokeServiceHook(vm, rendered);
    }

    invokeComponentRenderedCallback(vm);
  }

  let rehydrateQueue = [];

  function flushRehydrationQueue() {
    startGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);

    {
      assert.invariant(rehydrateQueue.length, `If rehydrateQueue was scheduled, it is because there must be at least one VM on this pending queue instead of ${rehydrateQueue}.`);
    }

    const vms = rehydrateQueue.sort((a, b) => a.idx - b.idx);
    rehydrateQueue = []; // reset to a new queue

    for (let i = 0, len = vms.length; i < len; i += 1) {
      const vm = vms[i];

      try {
        rehydrate(vm);
      } catch (error) {
        if (i + 1 < len) {
          // pieces of the queue are still pending to be rehydrated, those should have priority
          if (rehydrateQueue.length === 0) {
            addCallbackToNextTick(flushRehydrationQueue);
          }

          ArrayUnshift.apply(rehydrateQueue, ArraySlice.call(vms, i + 1));
        } // we need to end the measure before throwing.


        endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE); // re-throwing the original error will break the current tick, but since the next tick is
        // already scheduled, it should continue patching the rest.

        throw error; // eslint-disable-line no-unsafe-finally
      }
    }

    endGlobalMeasure(GlobalMeasurementPhase.REHYDRATE);
  }

  function runConnectedCallback(vm) {
    const {
      state
    } = vm;

    if (state === VMState.connected) {
      return; // nothing to do since it was already connected
    }

    vm.state = VMState.connected; // reporting connection

    const {
      connected
    } = Services;

    if (connected) {
      invokeServiceHook(vm, connected);
    }

    if (hasWireAdapters(vm)) {
      connectWireAdapters(vm);
    }

    const {
      connectedCallback
    } = vm.def;

    if (!isUndefined$3(connectedCallback)) {
      if (profilerEnabled) {
        logOperationStart(OperationId.connectedCallback, vm);
      }

      invokeComponentCallback(vm, connectedCallback);

      if (profilerEnabled) {
        logOperationEnd(OperationId.connectedCallback, vm);
      }
    }
  }

  function hasWireAdapters(vm) {
    return getOwnPropertyNames$2(vm.def.wire).length > 0;
  }

  function runDisconnectedCallback(vm) {
    {
      assert.isTrue(vm.state !== VMState.disconnected, `${vm} must be inserted.`);
    }

    if (isFalse$2(vm.isDirty)) {
      // this guarantees that if the component is reused/reinserted,
      // it will be re-rendered because we are disconnecting the reactivity
      // linking, so mutations are not automatically reflected on the state
      // of disconnected components.
      vm.isDirty = true;
    }

    vm.state = VMState.disconnected; // reporting disconnection

    const {
      disconnected
    } = Services;

    if (disconnected) {
      invokeServiceHook(vm, disconnected);
    }

    if (hasWireAdapters(vm)) {
      disconnectWireAdapters(vm);
    }

    const {
      disconnectedCallback
    } = vm.def;

    if (!isUndefined$3(disconnectedCallback)) {
      if (profilerEnabled) {
        logOperationStart(OperationId.disconnectedCallback, vm);
      }

      invokeComponentCallback(vm, disconnectedCallback);

      if (profilerEnabled) {
        logOperationEnd(OperationId.disconnectedCallback, vm);
      }
    }
  }

  function runChildNodesDisconnectedCallback(vm) {
    const {
      velements: vCustomElementCollection
    } = vm; // Reporting disconnection for every child in inverse order since they are
    // inserted in reserved order.

    for (let i = vCustomElementCollection.length - 1; i >= 0; i -= 1) {
      const {
        elm
      } = vCustomElementCollection[i]; // There are two cases where the element could be undefined:
      // * when there is an error during the construction phase, and an error
      //   boundary picks it, there is a possibility that the VCustomElement
      //   is not properly initialized, and therefore is should be ignored.
      // * when slotted custom element is not used by the element where it is
      //   slotted into it, as  a result, the custom element was never
      //   initialized.

      if (!isUndefined$3(elm)) {
        const childVM = getAssociatedVMIfPresent(elm); // The VM associated with the element might be associated undefined
        // in the case where the VM failed in the middle of its creation,
        // eg: constructor throwing before invoking super().

        if (!isUndefined$3(childVM)) {
          resetComponentStateWhenRemoved(childVM);
        }
      }
    }
  }

  function runLightChildNodesDisconnectedCallback(vm) {
    const {
      aChildren: adoptedChildren
    } = vm;
    recursivelyDisconnectChildren(adoptedChildren);
  }
  /**
   * The recursion doesn't need to be a complete traversal of the vnode graph,
   * instead it can be partial, when a custom element vnode is found, we don't
   * need to continue into its children because by attempting to disconnect the
   * custom element itself will trigger the removal of anything slotted or anything
   * defined on its shadow.
   */


  function recursivelyDisconnectChildren(vnodes) {
    for (let i = 0, len = vnodes.length; i < len; i += 1) {
      const vnode = vnodes[i];

      if (!isNull(vnode) && isArray$1(vnode.children) && !isUndefined$3(vnode.elm)) {
        // vnode is a VElement with children
        if (isUndefined$3(vnode.ctor)) {
          // it is a VElement, just keep looking (recursively)
          recursivelyDisconnectChildren(vnode.children);
        } else {
          // it is a VCustomElement, disconnect it and ignore its children
          resetComponentStateWhenRemoved(getAssociatedVM(vnode.elm));
        }
      }
    }
  } // This is a super optimized mechanism to remove the content of the root node (shadow root
  // for shadow DOM components and the root element itself for light DOM) without having to go
  // into snabbdom. Especially useful when the reset is a consequence of an error, in which case the
  // children VNodes might not be representing the current state of the DOM.


  function resetComponentRoot(vm) {
    const {
      children,
      renderer
    } = vm;
    const rootNode = getRenderRoot(vm);

    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];

      if (!isNull(child) && !isUndefined$3(child.elm)) {
        renderer.remove(child.elm, rootNode);
      }
    }

    vm.children = EmptyArray;
    runChildNodesDisconnectedCallback(vm);
    vm.velements = EmptyArray;
  }

  function scheduleRehydration(vm) {
    if (isTrue$2(vm.renderer.ssr) || isTrue$2(vm.isScheduled)) {
      return;
    }

    vm.isScheduled = true;

    if (rehydrateQueue.length === 0) {
      addCallbackToNextTick(flushRehydrationQueue);
    }

    ArrayPush$2.call(rehydrateQueue, vm);
  }

  function getErrorBoundaryVM(vm) {
    let currentVm = vm;

    while (!isNull(currentVm)) {
      if (!isUndefined$3(currentVm.def.errorCallback)) {
        return currentVm;
      }

      currentVm = currentVm.owner;
    }
  } // slow path routine
  // NOTE: we should probably more this routine to the synthetic shadow folder
  // and get the allocation to be cached by in the elm instead of in the VM


  function allocateInSlot(vm, children) {
    const {
      cmpSlots: oldSlots
    } = vm;
    const cmpSlots = vm.cmpSlots = create$2(null);

    for (let i = 0, len = children.length; i < len; i += 1) {
      const vnode = children[i];

      if (isNull(vnode)) {
        continue;
      }

      const {
        data
      } = vnode;
      const slotName = data.attrs && data.attrs.slot || '';
      const vnodes = cmpSlots[slotName] = cmpSlots[slotName] || []; // re-keying the vnodes is necessary to avoid conflicts with default content for the slot
      // which might have similar keys. Each vnode will always have a key that
      // starts with a numeric character from compiler. In this case, we add a unique
      // notation for slotted vnodes keys, e.g.: `@foo:1:1`

      if (!isUndefined$3(vnode.key)) {
        vnode.key = `@${slotName}:${vnode.key}`;
      }

      ArrayPush$2.call(vnodes, vnode);
    }

    if (isFalse$2(vm.isDirty)) {
      // We need to determine if the old allocation is really different from the new one
      // and mark the vm as dirty
      const oldKeys = keys$1(oldSlots);

      if (oldKeys.length !== keys$1(cmpSlots).length) {
        markComponentAsDirty(vm);
        return;
      }

      for (let i = 0, len = oldKeys.length; i < len; i += 1) {
        const key = oldKeys[i];

        if (isUndefined$3(cmpSlots[key]) || oldSlots[key].length !== cmpSlots[key].length) {
          markComponentAsDirty(vm);
          return;
        }

        const oldVNodes = oldSlots[key];
        const vnodes = cmpSlots[key];

        for (let j = 0, a = cmpSlots[key].length; j < a; j += 1) {
          if (oldVNodes[j] !== vnodes[j]) {
            markComponentAsDirty(vm);
            return;
          }
        }
      }
    }
  }

  function runWithBoundaryProtection(vm, owner, pre, job, post) {
    let error;
    pre();

    try {
      job();
    } catch (e) {
      error = Object(e);
    } finally {
      post();

      if (!isUndefined$3(error)) {
        addErrorComponentStack(vm, error);
        const errorBoundaryVm = isNull(owner) ? undefined : getErrorBoundaryVM(owner);

        if (isUndefined$3(errorBoundaryVm)) {
          throw error; // eslint-disable-line no-unsafe-finally
        }

        resetComponentRoot(vm); // remove offenders

        if (profilerEnabled) {
          logOperationStart(OperationId.errorCallback, vm);
        } // error boundaries must have an ErrorCallback


        const errorCallback = errorBoundaryVm.def.errorCallback;
        invokeComponentCallback(errorBoundaryVm, errorCallback, [error, error.wcStack]);

        if (profilerEnabled) {
          logOperationEnd(OperationId.errorCallback, vm);
        }
      }
    }
  }

  function getRenderRoot(vm) {
    return vm.renderMode === RenderMode.Shadow ? vm.cmpRoot : vm.elm;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const DeprecatedWiredElementHost = '$$DeprecatedWiredElementHostKey$$';
  const DeprecatedWiredParamsMeta = '$$DeprecatedWiredParamsMetaKey$$';
  const WireMetaMap = new Map();

  function noop() {}

  class WireContextRegistrationEvent extends CustomEvent {
    constructor(adapterToken, {
      setNewContext,
      setDisconnectedCallback
    }) {
      super(adapterToken, {
        bubbles: true,
        composed: true
      });
      defineProperties$1(this, {
        setNewContext: {
          value: setNewContext
        },
        setDisconnectedCallback: {
          value: setDisconnectedCallback
        }
      });
    }

  }

  function createFieldDataCallback(vm, name) {
    const {
      cmpFields
    } = vm;
    return value => {
      if (value !== vm.cmpFields[name]) {
        // storing the value in the underlying storage
        cmpFields[name] = value;
        componentValueMutated(vm, name);
      }
    };
  }

  function createMethodDataCallback(vm, method) {
    return value => {
      // dispatching new value into the wired method
      runWithBoundaryProtection(vm, vm.owner, noop, () => {
        // job
        method.call(vm.component, value);
      }, noop);
    };
  }

  function createConfigWatcher(component, configCallback, callbackWhenConfigIsReady) {
    let hasPendingConfig = false; // creating the reactive observer for reactive params when needed

    const ro = new ReactiveObserver(() => {
      if (hasPendingConfig === false) {
        hasPendingConfig = true; // collect new config in the micro-task

        Promise.resolve().then(() => {
          hasPendingConfig = false; // resetting current reactive params

          ro.reset(); // dispatching a new config due to a change in the configuration

          computeConfigAndUpdate();
        });
      }
    });

    const computeConfigAndUpdate = () => {
      let config;
      ro.observe(() => config = configCallback(component)); // eslint-disable-next-line lwc-internal/no-invalid-todo
      // TODO: dev-mode validation of config based on the adapter.configSchema
      // @ts-ignore it is assigned in the observe() callback

      callbackWhenConfigIsReady(config);
    };

    return {
      computeConfigAndUpdate,
      ro
    };
  }

  function createContextWatcher(vm, wireDef, callbackWhenContextIsReady) {
    const {
      adapter
    } = wireDef;
    const adapterContextToken = getAdapterToken(adapter);

    if (isUndefined$3(adapterContextToken)) {
      return; // no provider found, nothing to be done
    }

    const {
      elm,
      renderer,
      context: {
        wiredConnecting,
        wiredDisconnecting
      }
    } = vm; // waiting for the component to be connected to formally request the context via the token

    ArrayPush$2.call(wiredConnecting, () => {
      // This event is responsible for connecting the host element with another
      // element in the composed path that is providing contextual data. The provider
      // must be listening for a special dom event with the name corresponding to the value of
      // `adapterContextToken`, which will remain secret and internal to this file only to
      // guarantee that the linkage can be forged.
      const contextRegistrationEvent = new WireContextRegistrationEvent(adapterContextToken, {
        setNewContext(newContext) {
          // eslint-disable-next-line lwc-internal/no-invalid-todo
          // TODO: dev-mode validation of config based on the adapter.contextSchema
          callbackWhenContextIsReady(newContext);
        },

        setDisconnectedCallback(disconnectCallback) {
          // adds this callback into the disconnect bucket so it gets disconnected from parent
          // the the element hosting the wire is disconnected
          ArrayPush$2.call(wiredDisconnecting, disconnectCallback);
        }

      });
      renderer.dispatchEvent(elm, contextRegistrationEvent);
    });
  }

  function createConnector(vm, name, wireDef) {
    const {
      method,
      adapter,
      configCallback,
      dynamic
    } = wireDef;
    const dataCallback = isUndefined$3(method) ? createFieldDataCallback(vm, name) : createMethodDataCallback(vm, method);
    let context;
    let connector; // Workaround to pass the component element associated to this wire adapter instance.

    defineProperty$1(dataCallback, DeprecatedWiredElementHost, {
      value: vm.elm
    });
    defineProperty$1(dataCallback, DeprecatedWiredParamsMeta, {
      value: dynamic
    });
    runWithBoundaryProtection(vm, vm, noop, () => {
      // job
      connector = new adapter(dataCallback);
    }, noop);

    const updateConnectorConfig = config => {
      // every time the config is recomputed due to tracking,
      // this callback will be invoked with the new computed config
      runWithBoundaryProtection(vm, vm, noop, () => {
        // job
        connector.update(config, context);
      }, noop);
    }; // Computes the current wire config and calls the update method on the wire adapter.
    // If it has params, we will need to observe changes in the next tick.


    const {
      computeConfigAndUpdate,
      ro
    } = createConfigWatcher(vm.component, configCallback, updateConnectorConfig); // if the adapter needs contextualization, we need to watch for new context and push it alongside the config

    if (!isUndefined$3(adapter.contextSchema)) {
      createContextWatcher(vm, wireDef, newContext => {
        // every time the context is pushed into this component,
        // this callback will be invoked with the new computed context
        if (context !== newContext) {
          context = newContext; // Note: when new context arrives, the config will be recomputed and pushed along side the new
          // context, this is to preserve the identity characteristics, config should not have identity
          // (ever), while context can have identity

          if (vm.state === VMState.connected) {
            computeConfigAndUpdate();
          }
        }
      });
    }

    return {
      // @ts-ignore the boundary protection executes sync, connector is always defined
      connector,
      computeConfigAndUpdate,
      resetConfigWatcher: () => ro.reset()
    };
  }

  const AdapterToTokenMap = new Map();

  function getAdapterToken(adapter) {
    return AdapterToTokenMap.get(adapter);
  }

  function installWireAdapters(vm) {
    const {
      context,
      def: {
        wire
      }
    } = vm;
    const wiredConnecting = context.wiredConnecting = [];
    const wiredDisconnecting = context.wiredDisconnecting = [];

    for (const fieldNameOrMethod in wire) {
      const descriptor = wire[fieldNameOrMethod];
      const wireDef = WireMetaMap.get(descriptor);

      {
        assert.invariant(wireDef, `Internal Error: invalid wire definition found.`);
      }

      if (!isUndefined$3(wireDef)) {
        const {
          connector,
          computeConfigAndUpdate,
          resetConfigWatcher
        } = createConnector(vm, fieldNameOrMethod, wireDef);
        const hasDynamicParams = wireDef.dynamic.length > 0;
        ArrayPush$2.call(wiredConnecting, () => {
          connector.connect();

          if (hasDynamicParams) {
            Promise.resolve().then(computeConfigAndUpdate);
          } else {
            computeConfigAndUpdate();
          }
        });
        ArrayPush$2.call(wiredDisconnecting, () => {
          connector.disconnect();
          resetConfigWatcher();
        });
      }
    }
  }

  function connectWireAdapters(vm) {
    const {
      wiredConnecting
    } = vm.context;

    for (let i = 0, len = wiredConnecting.length; i < len; i += 1) {
      wiredConnecting[i]();
    }
  }

  function disconnectWireAdapters(vm) {
    const {
      wiredDisconnecting
    } = vm.context;
    runWithBoundaryProtection(vm, vm, noop, () => {
      // job
      for (let i = 0, len = wiredDisconnecting.length; i < len; i += 1) {
        wiredDisconnecting[i]();
      }
    }, noop);
  }
  /* version: 2.2.5 */

  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const globalStylesheets = create$3(null);

  {
    // @ts-ignore
    window.__lwcResetGlobalStylesheets = () => {
      for (const key of Object.keys(globalStylesheets)) {
        delete globalStylesheets[key];
      }
    };
  }

  const globalStylesheetsParentElement = document.head || document.body || document;
  let getCustomElement, defineCustomElement, HTMLElementConstructor;

  function isCustomElementRegistryAvailable() {
    if (typeof customElements === 'undefined') {
      return false;
    }

    try {
      // dereference HTMLElement global because babel wraps globals in compat mode with a
      // _wrapNativeSuper()
      // This is a problem because LWCUpgradableElement extends renderer.HTMLElement which does not
      // get wrapped by babel.
      const HTMLElementAlias = HTMLElement; // In case we use compat mode with a modern browser, the compat mode transformation
      // invokes the DOM api with an .apply() or .call() to initialize any DOM api sub-classing,
      // which are not equipped to be initialized that way.

      class clazz extends HTMLElementAlias {}

      customElements.define('lwc-test-' + Math.floor(Math.random() * 1000000), clazz);
      new clazz();
      return true;
    } catch (_a) {
      return false;
    }
  }

  if (isCustomElementRegistryAvailable()) {
    getCustomElement = customElements.get.bind(customElements);
    defineCustomElement = customElements.define.bind(customElements);
    HTMLElementConstructor = HTMLElement;
  } else {
    const registry = create$3(null);
    const reverseRegistry = new WeakMap();

    defineCustomElement = function define(name, ctor) {
      if (name !== StringToLowerCase$1.call(name) || registry[name]) {
        throw new TypeError(`Invalid Registration`);
      }

      registry[name] = ctor;
      reverseRegistry.set(ctor, name);
    };

    getCustomElement = function get(name) {
      return registry[name];
    };

    HTMLElementConstructor = function HTMLElement() {
      if (!(this instanceof HTMLElement)) {
        throw new TypeError(`Invalid Invocation`);
      }

      const {
        constructor
      } = this;
      const name = reverseRegistry.get(constructor);

      if (!name) {
        throw new TypeError(`Invalid Construction`);
      }

      const elm = document.createElement(name);
      setPrototypeOf$2(elm, constructor.prototype);
      return elm;
    };

    HTMLElementConstructor.prototype = HTMLElement.prototype;
  }

  const renderer = {
    ssr: false,
    syntheticShadow: hasOwnProperty$3.call(Element.prototype, KEY__SHADOW_TOKEN),

    createElement(tagName, namespace) {
      return isUndefined$4(namespace) ? document.createElement(tagName) : document.createElementNS(namespace, tagName);
    },

    createText(content) {
      return document.createTextNode(content);
    },

    createComment(content) {
      return document.createComment(content);
    },

    insert(node, parent, anchor) {
      parent.insertBefore(node, anchor);
    },

    remove(node, parent) {
      parent.removeChild(node);
    },

    nextSibling(node) {
      return node.nextSibling;
    },

    attachShadow(element, options) {
      return element.attachShadow(options);
    },

    setText(node, content) {
      node.nodeValue = content;
    },

    getProperty(node, key) {
      return node[key];
    },

    setProperty(node, key, value) {
      {
        if (node instanceof Element && !(key in node)) {
          // TODO [#1297]: Move this validation to the compiler
          assert$1.fail(`Unknown public property "${key}" of element <${node.tagName}>. This is likely a typo on the corresponding attribute "${htmlPropertyToAttribute$1(key)}".`);
        }
      }

      node[key] = value;
    },

    getAttribute(element, name, namespace) {
      return isUndefined$4(namespace) ? element.getAttribute(name) : element.getAttributeNS(namespace, name);
    },

    setAttribute(element, name, value, namespace) {
      return isUndefined$4(namespace) ? element.setAttribute(name, value) : element.setAttributeNS(namespace, name, value);
    },

    removeAttribute(element, name, namespace) {
      if (isUndefined$4(namespace)) {
        element.removeAttribute(name);
      } else {
        element.removeAttributeNS(namespace, name);
      }
    },

    addEventListener(target, type, callback, options) {
      target.addEventListener(type, callback, options);
    },

    removeEventListener(target, type, callback, options) {
      target.removeEventListener(type, callback, options);
    },

    dispatchEvent(target, event) {
      return target.dispatchEvent(event);
    },

    getClassList(element) {
      return element.classList;
    },

    setCSSStyleProperty(element, name, value) {
      // TODO [#0]: How to avoid this type casting? Shall we use a different type interface to
      // represent elements in the engine?
      element.style.setProperty(name, value);
    },

    getBoundingClientRect(element) {
      return element.getBoundingClientRect();
    },

    querySelector(element, selectors) {
      return element.querySelector(selectors);
    },

    querySelectorAll(element, selectors) {
      return element.querySelectorAll(selectors);
    },

    getElementsByTagName(element, tagNameOrWildCard) {
      return element.getElementsByTagName(tagNameOrWildCard);
    },

    getElementsByClassName(element, names) {
      return element.getElementsByClassName(names);
    },

    isConnected(node) {
      return node.isConnected;
    },

    insertGlobalStylesheet(content) {
      if (!isUndefined$4(globalStylesheets[content])) {
        return;
      }

      globalStylesheets[content] = true;
      const elm = document.createElement('style');
      elm.type = 'text/css';
      elm.textContent = content;
      globalStylesheetsParentElement.appendChild(elm);
    },

    assertInstanceOfHTMLElement(elm, msg) {
      assert$1.invariant(elm instanceof HTMLElement, msg);
    },

    defineCustomElement,
    getCustomElement,
    HTMLElement: HTMLElementConstructor
  };

  function buildCustomElementConstructor(Ctor) {
    const def = getComponentInternalDef(Ctor);
    return class extends def.bridge {
      constructor() {
        super();
        createVM(this, def, {
          mode: 'open',
          owner: null,
          tagName: this.tagName,
          renderer
        });
      }

      connectedCallback() {
        connectRootElement(this);
      }

      disconnectedCallback() {
        disconnectRootElement(this);
      }

    };
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const ConnectingSlot = createHiddenField$1('connecting', 'engine');
  const DisconnectingSlot = createHiddenField$1('disconnecting', 'engine');

  function callNodeSlot(node, slot) {
    {
      assert$1.isTrue(node, `callNodeSlot() should not be called for a non-object`);
    }

    const fn = getHiddenField$1(node, slot);

    if (!isUndefined$4(fn)) {
      fn(node);
    }

    return node; // for convenience
  } // Monkey patching Node methods to be able to detect the insertions and removal of root elements
  // created via createElement.


  const {
    appendChild,
    insertBefore,
    removeChild,
    replaceChild
  } = Node.prototype;
  assign$2(Node.prototype, {
    appendChild(newChild) {
      const appendedNode = appendChild.call(this, newChild);
      return callNodeSlot(appendedNode, ConnectingSlot);
    },

    insertBefore(newChild, referenceNode) {
      const insertedNode = insertBefore.call(this, newChild, referenceNode);
      return callNodeSlot(insertedNode, ConnectingSlot);
    },

    removeChild(oldChild) {
      const removedNode = removeChild.call(this, oldChild);
      return callNodeSlot(removedNode, DisconnectingSlot);
    },

    replaceChild(newChild, oldChild) {
      const replacedNode = replaceChild.call(this, newChild, oldChild);
      callNodeSlot(replacedNode, DisconnectingSlot);
      callNodeSlot(newChild, ConnectingSlot);
      return replacedNode;
    }

  });
  /**
   * EXPERIMENTAL: This function is almost identical to document.createElement with the slightly
   * difference that in the options, you can pass the `is` property set to a Constructor instead of
   * just a string value. The intent is to allow the creation of an element controlled by LWC without
   * having to register the element as a custom element.
   *
   * @example
   * ```
   * const el = createElement('x-foo', { is: FooCtor });
   * ```
   */

  function createElement(sel, options) {
    if (!isObject$1(options) || isNull$1(options)) {
      throw new TypeError(`"createElement" function expects an object as second parameter but received "${toString$2(options)}".`);
    }

    const Ctor = options.is;

    if (!isFunction$2(Ctor)) {
      throw new TypeError(`"createElement" function expects an "is" option with a valid component constructor.`);
    }

    const UpgradableConstructor = getUpgradableConstructor(sel, renderer);
    let wasComponentUpgraded = false; // the custom element from the registry is expecting an upgrade callback

    /**
     * Note: if the upgradable constructor does not expect, or throw when we new it
     * with a callback as the first argument, we could implement a more advanced
     * mechanism that only passes that argument if the constructor is known to be
     * an upgradable custom element.
     */

    const element = new UpgradableConstructor(elm => {
      const def = getComponentInternalDef(Ctor);
      createVM(elm, def, {
        tagName: sel,
        mode: options.mode !== 'closed' ? 'open' : 'closed',
        owner: null,
        renderer
      });
      setHiddenField$1(elm, ConnectingSlot, connectRootElement);
      setHiddenField$1(elm, DisconnectingSlot, disconnectRootElement);
      wasComponentUpgraded = true;
    });

    if (!wasComponentUpgraded) {
      /* eslint-disable-next-line no-console */
      console.error(`Unexpected tag name "${sel}". This name is a registered custom element, preventing LWC to upgrade the element.`);
    }

    return element;
  }
  /*
   * Copyright (c) 2018, salesforce.com, inc.
   * All rights reserved.
   * SPDX-License-Identifier: MIT
   * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
   */


  const ComponentConstructorToCustomElementConstructorMap = new Map();

  function getCustomElementConstructor(Ctor) {
    if (Ctor === LightningElement) {
      throw new TypeError(`Invalid Constructor. LightningElement base class can't be claimed as a custom element.`);
    }

    let ce = ComponentConstructorToCustomElementConstructorMap.get(Ctor);

    if (isUndefined$4(ce)) {
      ce = buildCustomElementConstructor(Ctor);
      ComponentConstructorToCustomElementConstructorMap.set(Ctor, ce);
    }

    return ce;
  }
  /**
   * This static getter builds a Web Component class from a LWC constructor so it can be registered
   * as a new element via customElements.define() at any given time. E.g.:
   *
   *      import Foo from 'ns/foo';
   *      customElements.define('x-foo', Foo.CustomElementConstructor);
   *      const elm = document.createElement('x-foo');
   *
   */


  defineProperty$2(LightningElement, 'CustomElementConstructor', {
    get() {
      return getCustomElementConstructor(this);
    }

  });
  freeze$2(LightningElement);
  seal$2(LightningElement.prototype);
  /* version: 2.2.5 */

  function stylesheet$2(hostSelector, shadowSelector, nativeShadow) {
    return [".main-presentation", shadowSelector, " {flex: 11 0 91%;position: relative;max-width: 91%;}.main-navigation", shadowSelector, " {flex: 1 0 8.3%;position: relative;}.main", shadowSelector, " {height: 100%;max-height: 100%;max-width: 100%;overflow: hidden;display: flex;flex-flow: row wrap;background-color: var(--flat-white);}.main-title", shadowSelector, " {display: flex;align-items: center;height: 5rem;padding: 2rem;font-family: var(--title-font-family);text-align: center;color: var(--light-text-content);width: 100%;min-width: 0;}.main-title", shadowSelector, " > div", shadowSelector, " {display: flex;align-items: center;justify-content: center;min-height: 2rem;min-height: 2rem;cursor: pointer;width: 4rem;}.main-title__gap", shadowSelector, " {margin: auto;min-width: 0;}.main-button__context", shadowSelector, " {border-radius: 50%;max-height: 4rem;display: flex;align-items: center;padding: 0.5rem;cursor: pointer;box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);}.main-container", shadowSelector, " {font-family: var(--content-font-family);color: var(--main-content-color-light);overflow: auto;display: flex;flex-flow: row wrap;position: relative;height: 100%;max-height: 100%;}.main-content__home", shadowSelector, " {scroll-behavior: smooth;height: 100%;overflow-y: scroll;}.main-container__sidebar", shadowSelector, " {flex: 1.5 0 0;margin-right: 1rem;animation: var(--animation-fade-in) 1s;position: relative;display: flex;flex-flow: column wrap;}.sidebar__top", shadowSelector, " {flex: 8 0 0;}.sidebar__bottom", shadowSelector, " {flex: 2 0 0;display: flex;flex-flow: row wrap;}", shadowSelector, "::-webkit-scrollbar {display: none;}.main-container__content", shadowSelector, " {scrollbar-width: none;position: relative;padding: 2rem;overflow: scroll;flex: 6 0 0;height: 90%;max-height: 90%;}.colective-mention", shadowSelector, " {color: var(--main-sidebar-color-pink);}.main-container__leftover", shadowSelector, " {flex: 1;margin-left: 1rem;}.main-header", shadowSelector, " {display: flex;min-height: 5rem;position: sticky;flex-flow: row nowrap;top: 0;z-index: 10;}.colective-bold", shadowSelector, " {color: var(--light-blue);}.container__vertical", shadowSelector, " {position: relative;display: flex;flex-direction: column;min-height: 100%;height: 100%;}"].join('');
  }
  var _implicitStylesheets$2 = [stylesheet$2];

  function stylesheet$1(hostSelector, shadowSelector, nativeShadow) {
    return [".main-header__logo", shadowSelector, " {flex: 2 0 0;display: flex;align-items: center;justify-content: center;margin: 5px;animation: var(--animation-fade-in) var(--fade-in-duration);}.logo__text", shadowSelector, " {font: var(--text-logo);color: var(--light-headers);letter-spacing: 2px;}.main-header__gap", shadowSelector, " {flex: 10 0 0;}"].join('');
  }
  var _implicitStylesheets$1 = [stylesheet$1];

  function tmpl$2($api, $cmp, $slotset, $ctx) {
    const {h: api_element} = $api;
    return [api_element("div", {
      classMap: {
        "main-header__logo": true
      },
      context: {
        lwc: {
          dom: "manual"
        }
      },
      key: 0
    }, []), api_element("div", {
      classMap: {
        "main-header__gap": true
      },
      key: 1
    }, [])];
  }
  var _tmpl$2 = registerTemplate(tmpl$2);
  tmpl$2.stylesheets = [];


  if (_implicitStylesheets$1) {
    tmpl$2.stylesheets.push.apply(tmpl$2.stylesheets, _implicitStylesheets$1);
  }
  tmpl$2.stylesheetTokens = {
    hostAttribute: "wired-header_header-host",
    shadowAttribute: "wired-header_header"
  };

  class Header extends LightningElement {
    connectedCallback() {}

    renderedCallback() {
      const foo = this.template.querySelector('.main-header__logo');
      console.log('foo', foo);
      foo.innerHTML = 'jojo';
    }

  }

  var _wiredHeader = registerComponent(Header, {
    tmpl: _tmpl$2
  });

  function stylesheet(hostSelector, shadowSelector, nativeShadow) {
    return [".home-text__presentation", shadowSelector, " {padding: 5rem;text-align: center;animation: var(--animation-fade-in-up) var(--fade-in-up-duration);font-size: 3.5vh;height: 95%;}"].join('');
  }
  var _implicitStylesheets = [stylesheet];

  function tmpl$1($api, $cmp, $slotset, $ctx) {
    const {t: api_text, h: api_element} = $api;
    return [api_element("div", {
      classMap: {
        "home-text__presentation": true
      },
      key: 0
    }, [api_element("p", {
      key: 1
    }, [api_text("El "), api_element("span", {
      classMap: {
        "colective-mention": true
      },
      key: 2
    }, [api_text("Colectivo Anagrama")]), api_text(" es una iniciativa cuyo propósito es consolidarse como un frente de investigación e inovación en el desarrollo de soluciones tecnológicas.")])])];
  }
  var _tmpl$1 = registerTemplate(tmpl$1);
  tmpl$1.stylesheets = [];


  if (_implicitStylesheets) {
    tmpl$1.stylesheets.push.apply(tmpl$1.stylesheets, _implicitStylesheets);
  }
  tmpl$1.stylesheetTokens = {
    hostAttribute: "wired-home_home-host",
    shadowAttribute: "wired-home_home"
  };

  class Home extends LightningElement {}

  var _wiredHome = registerComponent(Home, {
    tmpl: _tmpl$1
  });

  function tmpl($api, $cmp, $slotset, $ctx) {
    const {c: api_custom_element, h: api_element} = $api;
    return [api_element("div", {
      classMap: {
        "main": true
      },
      key: 0
    }, [api_element("div", {
      classMap: {
        "main-presentation": true,
        "container__vertical": true
      },
      key: 1
    }, [api_custom_element("wired-header", _wiredHeader, {
      classMap: {
        "main-header": true
      },
      key: 2
    }, []), api_element("section", {
      classMap: {
        "main-container": true
      },
      key: 3
    }, [api_element("div", {
      classMap: {
        "main-container__sclassebar": true
      },
      key: 4
    }, [api_element("div", {
      classMap: {
        "sclassebar__top": true
      },
      key: 5
    }, []), api_element("div", {
      classMap: {
        "sclassebar__bottom": true
      },
      key: 6
    }, [])]), api_element("div", {
      classMap: {
        "main-container__content": true
      },
      key: 7
    }, [api_custom_element("wired-home", _wiredHome, {
      classMap: {
        "main-content__home": true
      },
      key: 8
    }, [])]), api_element("div", {
      classMap: {
        "main-container__leftover": true
      },
      key: 9
    }, [])])]), api_element("div", {
      classMap: {
        "main-navigation": true
      },
      key: 10
    }, [])])];
  }
  var _tmpl = registerTemplate(tmpl);
  tmpl.stylesheets = [];


  if (_implicitStylesheets$2) {
    tmpl.stylesheets.push.apply(tmpl.stylesheets, _implicitStylesheets$2);
  }
  tmpl.stylesheetTokens = {
    hostAttribute: "wired-app_app-host",
    shadowAttribute: "wired-app_app"
  };

  class App extends LightningElement {}

  var App$1 = registerComponent(App, {
    tmpl: _tmpl
  });

  const elm = createElement("wired-app", {
    is: App$1
  });
  document.body.appendChild(elm);

})));