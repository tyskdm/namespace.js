/** 
 * My next step of "Hello javascript world."
 * @fileOverview namespace function for Google apps script.
 * @author <a href="mailto:tsuyoshi.kodama@gmail.com">Tsuyoshi Kodma</a> 
 * @version 0.3.0
 */

/**
 * namespace library.</br>
 * This static library includes create, define and require
 * @namespace holds namespace controll methods.
 */
var namespace = (function (globalObject) {
  var global_ = globalObject;
  var definedNamespaces_ = [];

  /**
   * create namespace.
   * @param {string} nsString: name space
   * @param {object} nsObject: object to set name space
   * @returns {object} new namespace
   */
  function namespace(nsString, nsObject) {
    var parent = global_,
        parts = nsString.split('.'),
        i, l;
  
    for (i = 0, l = parts.length; i < l; i++) {
  
      if (typeof parent[parts[i]] === "undefined") {
        if (i < l-1) {
          parent[parts[i]] = {};
        } else {
          parent[parts[i]] = nsObject || {};
        }
      }
      parent = parent[parts[i]];
    }
  
    return parent; // at last, parent is the leaf.
  };

  /**
   * define namespace with constractor.
   * @param {string} namespace name
   * @param {function} namespace constractor
   */
  function define(nsString, nsFunction) {

    if (definedNamespaces_[nsString]) {
      throw new Error("namespce.define MultiPlexed.");
    } else {
      definedNamespaces_[nsString] = {
          func: nsFunction,
          constracting: false
      };
    }
  };


  /**
   * require namespace
   * @param {string} requiredNamespace
   * @returns {object} required object
   */
  function require(requiredNamespace) {
    if (!definedNamespaces_[nsString]) {
      throw new Error("required namespce is not defined.");
    }
    if (definedNamespaces_[nsString].obj) {
      return definedNamespaces_[nsString].obj;
    }
    if (definedNamespaces_[nsString].constracting) {
      throw new Error("loop.");
    }
    constracting = true;
    definedNamespaces_[nsString].obj = definedNamespaces_[nsString].func();
    return definedNamespaces_[nsString].obj;
  };

  var exports = namespace;
  exports.define = define;
  exports.require = require;
  
  return exports;

})(this); // 'this' is global object

