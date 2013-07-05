/**
 * My next step of "Hello javascript world."</br>
 * namespace functions for Google apps script.
 * @namespace holds namespace control methods.
 */
var namespace = (function (globalObject) {
  var global_ = globalObject;
  var definedNamespaces_ = {};

  /**
   * create namespace.
   * @param {string} nsString name space
   * @param {object} nsObject object to set name space
   * @returns {object} new namespace
   */
  var namespace = function (nsString, nsObject) {
    var parent = global_,
        parts = nsString.split('.'),
        i, l;

    for (i = 0, l = parts.length; i < l; i++) {
      if (typeof parent[parts[i]] === "undefined") {
        parent[parts[i]] = (i < l-1) ? {} : (nsObject || {});
      }
      parent = parent[parts[i]];
    }

    return parent; // at last, parent is the leaf.
  };

  /**
   * define namespace with constructor.
   * @param {string} namespace name
   * @param {function} namespace constructor
   */
  var define = function (nsString, nsFunction) {

    if (definedNamespaces_[nsString]) {
      throw new Error("namespce.define MultiPlexed.");
    } else {
      definedNamespaces_[nsString] = {
          func: nsFunction,
          constructing: false
      };
    }
  };


  /**
   * require namespace
   * @param {string} required namespace
   * @returns {object} required object
   */
  var require = function (nsString) {

    if (!definedNamespaces_[nsString]) {
      var parent = global_,
          parts = nsString.split('.'),
          i, l;

      for (i = 0, l = parts.length; i < l; i++) {
        if (typeof parent[parts[i]] === "undefined") {
          throw new Error("required namespce is not defined.");
        }
        parent = parent[parts[i]];
      }
      definedNamespaces_[nsString] = {obj : parent};
      return parent; // at last, parent is the leaf.
    }

    if (definedNamespaces_[nsString].obj) {
      return definedNamespaces_[nsString].obj;
    }
    if (definedNamespaces_[nsString].constructing) {
      throw new Error("loop.");
    }

    constructing = true;
    definedNamespaces_[nsString].obj = namespace(nsString, definedNamespaces_[nsString].func());
    return definedNamespaces_[nsString].obj;
  };

  var reset_ = function() {
    definedNamespaces_ = {};
  };

  var exports = namespace;
  exports.define = define;
  exports.require = require;
  exports.reset_ = reset_;

  return exports;

})(this); // 'this' is global object
