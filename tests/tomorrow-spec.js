(function() {
  describe('futureFn', function() {
    var futureFn;
    futureFn = null;
    beforeEach(module('tomorrow'));
    beforeEach(inject(function(_futureFn_) {
      return futureFn = _futureFn_;
    }));
    return it('should create function', function() {
      var fn;
      fn = futureFn('no name');
      return expect(angular.isFunction(fn)).toBe(true);
    });
  });

}).call(this);
