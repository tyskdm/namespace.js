/*
namespace:
version 0.7.1
build 6 - 2013/07/17 23:00:39
Copyright (c) 2013 Tsuyoshi Kodama

The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/**
 * @fileoverview provides namespace functions for Google apps script.
 * @author tsuyoshi kodama / tsuyoshi.kodama@gmail.com
 */

/** @expose */
var namespace = (function(globalObject) {
  /** @private @type {Object} */
  var global_ = globalObject;

  /** @private @type {Object} */
  var definedNamespaces_ = {};

  /**
   * create namespace.
   * @param {string} nsString   name of namespace.
   * @param {Object} nsObject   object to set namespace.
   * @return {Object} new namespace.
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
   * @return {Object}           required object.
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
