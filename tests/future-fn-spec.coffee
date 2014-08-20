describe 'futureFn', ->

    futureFn = null

    beforeEach module 'tomorrow'

    beforeEach inject (_futureFn_) ->
        futureFn = _futureFn_

    it 'should create function', ->
        fn = futureFn 'no name'
        expect(angular.isFunction fn).toBe(true)

    describe 'returned function', ->

        it 'should return promise with then()', ->
            fn = futureFn 'no name'
            promise = fn()
            expect(angular.isFunction promise.then).toBe(true)

        it 'should has done()', ->
            fn = futureFn 'no name'
            expect(angular.isFunction fn.done).toBe(true)

        it 'should has fail()', ->
            fn = futureFn 'no name'
            expect(angular.isFunction fn.fail).toBe(true)

        describe 'done()', ->

            it 'should call a resolve function with resolved data', ->
                fn = futureFn 'no name'
                resolveFn = jasmine.createSpy 'resolve function'
                fn().then resolveFn
                fn.done('data')
                expect(resolveFn).toHaveBeenCalledWith('data')

        describe 'fail()', ->

            it 'should call a reject function with rejected data', ->
                fn = futureFn 'no name'
                rejectFn = jasmine.createSpy 'reject function'
                fn().then undefined, rejectFn
                fn.fail('data')
                expect(rejectFn).toHaveBeenCalledWith('data')

