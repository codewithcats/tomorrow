describe 'futureFn', ->

    futureFn = null

    beforeEach module 'tomorrow'

    beforeEach inject (_futureFn_) ->
        futureFn = _futureFn_

    it 'should create function', ->
        fn = futureFn 'no name'
        expect(angular.isFunction fn).toBe(true)