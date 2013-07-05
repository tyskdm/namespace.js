/**
 * My next step of "Hello javascript world."</br>
 * namespace functions for Google apps script.
 */
var namespace = (function() {

  var global_ = this,         // 'this' is global object
      definedNamespaces_ = [];

  /**
   * create namespace.
   * @param {string} nsString name space.
   * @param {object} nsObject object to set name space.
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
   * @param {string} namespace name.
   * @param {function} namespace constructor.
   */
  var define = function(nsString, nsFunction) {

    if (definedNamespaces_[nsString]) {
      throw new Error('namespce.define MultiPlexed.');
    } else {
      definedNamespaces_[nsString] = {
          func: nsFunction,
          constructing: false
      };
    }
  };


  /**
   * require namespace
   * @param {string} required namespace.
   * @return {object} required object.
   */
  var require = function(nsString) {

    if (!definedNamespaces_[nsString]) {
      var parent = global_,
          parts = nsString.split('.'),
          i, l;

      for (i = 0, l = parts.length; i < l; i++) {
        if (typeof parent[parts[i]] === 'undefined') {
          throw new Error('required namespce is not defined.');
        }
        parent = parent[parts[i]];
      }

      // at last, parent is the leaf.
      definedNamespaces_[nsString] = {obj: parent};

    } else if (!definedNamespaces_[nsString].obj) {
      if (definedNamespaces_[nsString].constructing) {
        throw new Error('loop.');
      } else {
        constructing = true;
        definedNamespaces_[nsString].obj =
          create(nsString, definedNamespaces_[nsString].func());
      }
    }

    return definedNamespaces_[nsString].obj;
  };

  var exports = create;
  exports.define = define;
  exports.require = require;

  return exports;

})();
