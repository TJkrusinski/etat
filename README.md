## Etat

French for `state`, is a state machine for the browser. Use it with [browserify](http://github.com/substack/browserify).

Managing application state in the browser kind of sucks, this is one way to do it.

## API

````javascript
var Etat = require('etat');
var etat = new Etat();

/**
 *  Add a state to the state machine
 *  @method addState
 *
 *  @param {String} name
 *  @param {Object} state
 */
etat.addState(name, state);

/**
 *  Get all states
 *  @method getStates
 *
 *  @return {Object}
 */
etat.getStates();

/**
 *  Get a state
 *  @method getState
 *
 *  @pararm {String} state
 *  @return {Object}
 */
etat.getState(state);

/**
 *  Get the current state
 *  @method getCurrentState
 *
 *  @return {Object}
 */
etat.getCurrentState();

/**
 *  Set a state for the machine
 *  @method setState
 *
 *  @param {String} state
 *  @param {Object} [obj]
 *  @param {Fucntion} [callback]
 *  @return undefined
 */
etat.setState(state, obj, cb);

/**
 *  Remove a state
 *  @method removeState
 *
 *  @param {String} state
 *  @return {Object}
 */
etat.removeState(state);

/**
 *  Call the update method for the current state 
 *  @method update
 *
 *  @param {*} data
 */
etat.update(data);

/**
 *  Call the create method for the current state 
 *  @method create
 *
 *  @param {*} data
 */
etat.create(data);

/**
 *  Call the remove method for the current state 
 *  @method remove
 *
 *  @param {*} data
 */
etat.remove(data);

````

## State Object

A state object has at minimum 2 methods, `bind` and `unbind`. These are called as the state is entered and exited.

If the state's `unbind` method has a callback parameter specified, it will be called asynchronously and the next state will not be bound until the callback is called.

````javascript

/**
 *	Miminal state
 */
var state = {
	bind: function(data) {
		// data is object passed in from `setState()`
	},
	unbind: function(callback) {
		// callback is optional
	},
};

/**
 *	Bigger state
 */
var state = {
	bind: function() {},
	unbind: function() {},
	update: function() {},
	create: function() {},
	remove: function() {}
};
````

When the `Etat` instances' `create`, `update` or `remove` function's are called, the current's states matching (if it has one) method is called with the data passed into the callee.

## Example

````javascript

var etat = require('etat');
var state = {
	bind: function(data) {
		console.log(data);
	},
	unbind: function(callback) {
		// async stuff
		callback();
	},
	create: function(data){
		console.log(data);
	},
};

var etat = new Etat();

etat.addState('foo', state);

etat.setState('foo', {foo: 'passed into the bind method for `foo`'});

etat.create('this is my data');
// the create method will be called for the `foo` state
// the `foo` state's create method will just print the string "this is my data"
````

## Tests

`$ npm test`

## License

(The MIT License)

````
Copyright (c) 2013 TJ Krusinski <tjkrus@gmail.com>;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
````
