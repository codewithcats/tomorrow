prettyPrint = (data) ->
    if angular.isString(data) or angular.isFunction(data) or data instanceof RegExp then data else angular.toJson(data)

futureFn = (fnName, fnConfig=promise:true) ->
    expectation = null
    calledWithArgs = null
    promise = then: (@resolve, @reject) =>
    fn = () ->
        calledWithArgs = Array.prototype.slice.call arguments, 0
        return promise
    fn.expect = () ->
        expectation = Array.prototype.slice.call arguments, 0
    fn.verifyExpectation = () ->
        if expectation? and not angular.equals calledWithArgs, expectation
            throw new Error "Expected #{fnName} to have been called with #{prettyPrint expectation}, but been called with #{prettyPrint calledWithArgs}"
    fn.resetExpectation = () ->
        expectation = null

    if fnConfig.promise is true
        fn.done = (data) => @resolve(data)
        fn.fail = (data) => @reject(data)

    return fn

tmr = angular.module 'tomorrow', []

tmr.factory 'futureFn', [ -> futureFn]