(function() {
  describe('futureFn', function() {
    var futureFn;
    futureFn = null;
    beforeEach(module('tomorrow'));
    beforeEach(inject(function(_futureFn_) {
      return futureFn = _futureFn_;
    }));
    it('should create function', function() {
      var fn;
      fn = futureFn('no name');
      return expect(angular.isFunction(fn)).toBe(true);
    });
    return describe('returned function', function() {
      it('should return promise with then()', function() {
        var fn, promise;
        fn = futureFn('no name');
        promise = fn();
        return expect(angular.isFunction(promise.then)).toBe(true);
      });
      it('should has done()', function() {
        var fn;
        fn = futureFn('no name');
        return expect(angular.isFunction(fn.done)).toBe(true);
      });
      it('should has fail()', function() {
        var fn;
        fn = futureFn('no name');
        return expect(angular.isFunction(fn.fail)).toBe(true);
      });
      describe('done()', function() {
        return it('should call a resolve function with resolved data', function() {
          var fn, resolveFn;
          fn = futureFn('no name');
          resolveFn = jasmine.createSpy('resolve function');
          fn().then(resolveFn);
          fn.done('data');
          return expect(resolveFn).toHaveBeenCalledWith('data');
        });
      });
      return describe('fail()', function() {
        return it('should call a reject function with rejected data', function() {
          var fn, rejectFn;
          fn = futureFn('no name');
          rejectFn = jasmine.createSpy('reject function');
          fn().then(void 0, rejectFn);
          fn.fail('data');
          return expect(rejectFn).toHaveBeenCalledWith('data');
        });
      });
    });
  });

}).call(this);
