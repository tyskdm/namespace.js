
foooo();


describe(555, 'namespace', function() {

  beforeEach(function() {
    WIL = undefined;
  });

  it('should be able to create object.', function() {
    expect(WIL).toBeUndefined();
    var o = namespace('WIL.name.space.tree');

    expect(WIL.name.space.tree).toBeDefined();
    expect(WIL.name.space.tree).toEqual(o);
    expect(typeof(WIL.name.space.tree)).toBe(typeof{});
  });


  it('should not overwrite existing object.', function() {
    var WIL = {};
    var o = {a: 1, b: 2};
    WIL.obj = o;
    namespace('WIL.obj');
    expect(WIL.obj).toEqual(o);
  });

});



describe('namespace.define', function() {

  var func = function() {
    namespace.define('WIL.test', function() { return {a: 1, b: 2}; });
  };

  beforeEach(function() {
    WIL = undefined;
    namespace.reset_();
  });

  it('should not throw Error to call.', function() {
    expect(func).not.toThrow();
  });

  it('should throw Error to multiplex call.', function() {

//    Logger.log("Hello, world!");

    expect(func).not.toThrow();
    expect(func).toThrow();
  });


});


describe('namespace.require', function() {

  beforeEach(function() {
    WIL = undefined;
    namespace.reset_();
  });

  describe('#Simple', function() {

    var func = function() {
      namespace.define('WIL.test', function() { return {a: 1, b: 2}; });
    };

    it('should return object.', function() {
      func();
      var o = namespace.require('WIL.test');
      expect(o).toBeDefined();
    });

    it('should create defined object.', function() {
      func();
      var o = namespace.require('WIL.test');
      expect(WIL.test).toBeDefined();
    });

    it('should create WIL.test as {a:1, b:2}.', function() {
      func();
      var o = namespace.require('WIL.test');
      expect(WIL.test).toEqual({a: 1, b: 2});
    });

    it('should return same object as defined.', function() {
      func();
      var o = namespace.require('WIL.test');
      expect(WIL.test).toEqual(o);
    });

  });

  describe('#depend', function() {

    var moduleE = function() {
      var f = namespace.require('WIL.moduleF');
      return {e: 1, f: f};
    };

    var moduleF = function() {
      return {foo: 1, bar: 2};
    };

    it('WIL should not be exist.', function() {
      expect(WIL).toBeUndefined();
    });

    it('should not throw Error', function() {
      namespace.define('WIL.moduleE', moduleE);
      namespace.define('WIL.moduleF', moduleF);

      function requireE() {
        namespace.require('WIL.moduleE');
      }

      expect(requireE).not.toThrow();
    });

    it('should return object.', function() {
      namespace.define('WIL.moduleE', moduleE);
      namespace.define('WIL.moduleF', moduleF);

      var e = namespace.require('WIL.moduleE');

      expect(typeof e).toEqual(typeof {});
    });

    it('should return defined object.', function() {
      namespace.define('WIL.moduleE', moduleE);
      namespace.define('WIL.moduleF', moduleF);

      var e = namespace.require('WIL.moduleE');

      expect(e).toEqual({ e: 1, f: {foo: 1, bar: 2}});
    });

    it('should create two modules.', function() {
      namespace.define('WIL.moduleE', moduleE);
      namespace.define('WIL.moduleF', moduleF);

      expect(WIL).toBeUndefined();

      namespace.require('WIL.moduleE');

      expect(WIL.moduleE).toBeDefined();
      expect(WIL.moduleF).toBeDefined();
    });

    it('should create one modules.', function() {
      namespace.define('WIL.moduleE', moduleE);
      namespace.define('WIL.moduleF', moduleF);

      expect(WIL).toBeUndefined();

      namespace.require('WIL.moduleF');

      expect(WIL.moduleE).toBeUndefined();
      expect(WIL.moduleF).toBeDefined();
    });
  });

  describe('#Loop', function() {

    var moduleA = function() {
      var b = namespace.require('WIL.moduleB');
      return {b: b};
    };

    var moduleB = function() {
      var a = namespace.require('WIL.moduleA');
      return {a: a};
    };

    it('define looped, then require should throw Error.', function() {
      namespace.define('WIL.moduleA', moduleA);
      namespace.define('WIL.moduleB', moduleB);

      function requireA() {
        namespace.require('WIL.moduleA');
      }

      expect(requireA).toThrow();
    });

  });



  describe('#Not defined', function() {

    it('it should throw Error', function() {
      function requireC() {
        namespace.require('WIL.moduleC');
      }
      expect(requireC).toThrow();
    });

    it('but exist, It should not throw Error', function() {
      var g;
      WIL = {};
      WIL.moduleD = {a: 1, b: 2, c: 3};

      var requireD = function() {
        g = namespace.require('WIL.moduleD');
      };
      expect(requireD).not.toThrow();
      expect(g).toEqual(WIL.moduleD);
    });

  });


});
