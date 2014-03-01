'use strict';

var Etat = require('../index.js');
var assert = require('assert');

describe('Etat', function(){
    var etat;

    describe('new Etat()', function(){
        it('constructs a new etat', function(){
            etat = new Etat;
            assert.ok(etat);
            assert.equal(typeof etat, 'object');
        });
    });

    describe('Etat#addState()', function(){
        it('adds a state', function(){
            var state = {
                bind: function() {},
                unbind: function(cb) { setTimeout(cb, 400) },
                update: function() {},
                create: function() {},
                remove: function() {}
            };

            etat.addState('foo', state);
            assert.equal(etat._states.foo, state);
        });
    });

    describe('Etat#addState()', function(){
        it('adds a state', function(){
            var state = {
                bind: function() {},
                unbind: function() {},
                update: function() {},
                create: function() {},
                remove: function() {}
            };

            etat.addState('bar', state);
            assert.equal(etat._states.bar, state);
        });
    });

    describe('Etat#addState()', function(){
        it('adds a state baz', function(){
            var state = {
                bind: function() {},
                unbind: function() {},
                update: function() {},
                create: function() {},
                remove: function() {}
            };

            etat.addState('baz', state);
            assert.equal(etat._states.baz, state);
        });
    });

    describe('Etat#getStates()', function(){
        it('gets all states from etat', function(){
            var states = etat.getStates();
            assert.ok(states);
            assert.equal(typeof states, 'object');
            assert.equal(typeof states.foo, 'object');
        });
    });

    describe('Etat#getState()', function(){
        it('gets a state from etat', function(){
            var state = etat.getState('foo');
            assert.ok(state);
            assert.equal(typeof state, 'object');
        });
    });

    describe('Etat#setState() foo', function(){
        it('sets a state for etat', function(){
            var state = etat.setState('foo');
            assert.ok(state);
        });
    });

    describe('Etat#setState() bar', function(){
        it('sets a state for etat', function(){
            var state = etat.setState('bar', {foo: 'bar'});
            assert.ok(true);
        });
    });

    describe('Etat#setState() baz', function(){
        it('sets a state for etat baz', function(d){
            var state = etat.setState('baz', {foo: 'bar'}, function(){
                assert.ok(true);
                d();
            });
        });
    });

    describe('Etat#setState() foo', function(){
        it('sets a state for etat', function(d){
            var state = etat.setState('foo', {foo: 'bar'}, function(){
                assert.ok(true);
                d();
            });
        });
    });

    describe('Etat#setState() bar', function(){
        it('sets a state for etat', function(d){
            var state = etat.setState('bar', {foo: 'bar'}, function(){
                assert.ok(true);
                d();
            });
        });
    });

    describe('Etat#removeState', function(){
        it('removes a state', function(){
            assert.ok(etat.removeState('foo'));
        });
    });

    describe('Etat#update()', function() {
        it('calls the current states update method', function(d){
            
            etat._states.bar.update = function(data){
                etat._states.bar.update = function() { };
                assert.equal(data.foo, 'bar');
                d();
            };

            etat.update({foo: 'bar'});
        });  
    });

    describe('Etat#create()', function() {
        it('calls the current states create method', function(d){
            
            etat._states.bar.create = function(data){
                etat._states.bar.create = function() { };
                assert.equal(data.foo, 'bar');
                d();
            };

            etat.create({foo: 'bar'});
        });  
    });

    describe('Etat#remove()', function() {
        it('calls the current states remove method', function(d){
            
            etat._states.bar.remove = function(data){
                etat._states.bar.remove = function() { };
                assert.equal(data.foo, 'bar');
                d();
            };

            etat.remove({foo: 'bar'});
        });  
    });
});
