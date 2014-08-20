(function() {
  var futureFn, prettyPrint, tmr;

  prettyPrint = function(data) {
    if (angular.isString(data) || angular.isFunction(data) || data instanceof RegExp) {
      return data;
    } else {
      return angular.toJson(data);
    }
  };

  futureFn = function(fnName, fnConfig) {
    var calledWithArgs, expectation, fn, promise;
    expectation = null;
    calledWithArgs = null;
    promise = {
      then: (function(_this) {
        return function(resolve, reject) {
          _this.resolve = resolve;
          _this.reject = reject;
        };
      })(this)
    };
    fn = function() {
      calledWithArgs = Array.prototype.slice.call(arguments, 0);
      return promise;
    };
    fn.expect = function() {
      return expectation = Array.prototype.slice.call(arguments, 0);
    };
    fn.verifyExpectation = function() {
      if ((expectation != null) && !angular.equals(calledWithArgs, expectation)) {
        throw new Error("Expected " + fnName + " to have been called with " + (prettyPrint(expectation)) + ", but been called with " + (prettyPrint(calledWithArgs)));
      }
    };
    fn.resetExpectation = function() {
      return expectation = null;
    };
    if (fnConfig.promise === true) {
      fn.done = (function(_this) {
        return function(data) {
          return _this.resolve(data);
        };
      })(this);
      fn.fail = (function(_this) {
        return function(data) {
          return _this.reject(data);
        };
      })(this);
    }
    return fn;
  };

  tmr = angular.module('tomorrow', []);

  tmr.factory('futureFn', [
    function() {
      return futureFn;
    }
  ]);

}).call(this);
