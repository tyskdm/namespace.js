/**
 * @fileoverview provides namespace functions for Google apps script.
 * @author tsuyoshi kodama / tsuyoshi.kodama@gmail.com
 */

/** @expose */
var namespace = (function(globalObject) {
  /** @private @type {object} */
  var global_ = globalObject;

  /** @private @type {object} */
  var definedNamespaces_ = {};

  /**
   * create namespace.
   * @param {string} nsString   name of namespace.
   * @param {object} nsObject   object to set namespace.
   * @return {object} new namespace.
   */
  var namespace = function(nsString, nsObject) {
    var parent = global_,
        parts = nsString.split('.'),
        i, l;

    for (i = 0, l = parts.length; i < l; i++) {
      if (typeof parent[parts[i]] === 'undefined') {
        parent[parts[i]] = (i < l - 1) ? {} : (nsObject || {});
      }
      parent = parent[parts[i]];
    }

    return parent; // at last, parent is the leaf.
  };

  /**
   * define namespace with constructor.
   * @param {string} nsString       namespace name.
   * @param {function()} nsFunction   namespace constructor.
   */
  var define = function(nsString, nsFunction) {

    if (definedNamespaces_[nsString]) {
      throw new Error('namespce.define: Define MultiPlexed.');
    } else {
      definedNamespaces_[nsString] = {
          func: nsFunction,
          constructing: false
      };
    }
  };


  /**
   * require namespace
   * @param {string} nsString   required namespace.
   * @return {object}           required object.
   */
  var require = function(nsString) {

    if (!definedNamespaces_[nsString]) {
      var parent = global_,
          parts = nsString.split('.'),
          i, l;

      for (i = 0, l = parts.length; i < l; i++) {
        if (typeof parent[parts[i]] === 'undefined') {
          throw new Error(
            'namespace.require: required namespce is not defined.');
        }
        parent = parent[parts[i]];
      }
      // at last, parent is the leaf.
      definedNamespaces_[nsString] = {obj: parent};

      return definedNamespaces_[nsString].obj;
    }

    if (definedNamespaces_[nsString].obj) {
      return definedNamespaces_[nsString].obj;
    }

    if (definedNamespaces_[nsString].constructing) {
      throw new Error('namespace.require: looped dependensies.');
    }

    definedNamespaces_[nsString].constructing = true;
    definedNamespaces_[nsString].obj =
      namespace(nsString, definedNamespaces_[nsString].func());

    return definedNamespaces_[nsString].obj;
  };

  /**
   * Reset object definitions and actual object information.
   */
  var reset_ = function() {
    definedNamespaces_ = {};
  };

  var exports = namespace;
  /** @expose */ exports.define = define;
  /** @expose */ exports.require = require;
  /** @expose */ exports.reset_ = reset_;

  return exports;

})(this); // 'this' is global object
