'use strict';

/**
 *  No op
 */

function noop () {};

/**
 *  Expose
 */

module.exports = Etat;

/**
 *  Constructor 
 *  @class Etat
 */

function Etat () {
    this._states = {};
    this._currentState = undefined;
};

/**
 *  Add a state to the state machine
 *  @method addState
 *
 *  @param {String} name
 *  @param {Object} state
 */

Etat.prototype.addState = function(name, state) {
    if (typeof state != 'object') return;
    this._states[name] = state;   
    return this;
};

/**
 *  Get all states
 *  @method getStates
 *
 *  @return {Object}
 */

Etat.prototype.getStates = function() {
    return this._states;
};

/**
 *  Get a state
 *  @method getState
 *
 *  @pararm {String} state
 *  @return {Object}
 */

Etat.prototype.getState = function(state) {
    return this._states[state];
};

/**
 *  Get the current state
 *  @method getCurrentState
 *
 *  @return {Object}
 */

Etat.prototype.getCurrentState = function() {
    return this._currentState;
};

/**
 *  Set a state for the machine
 *  @method setState
 *
 *  @param {String} state
 *  @param {Object} obj
 *  @param {Fucntion} callback
 *  @return undefined
 */

Etat.prototype.setState = function(state, obj, cb) {
    if (!obj) {
        obj = undefined;
        cb = noop;
    };

    if (!cb && typeof obj == 'function') {
        cb = obj;
        obj = undefined;
    };

    if (!cb && typeof obj == 'object') {
        cb = noop;
    };

    var pendingState = this.getState(state);

    var unbind = this._currentState ? 
        (this._currentState.unbind || noop) :
        noop;

    if (!pendingState) return cb('No state', null);

    // unbind has no cb
    if (!unbind.length) {
        unbind();
        pendingState.bind(obj);
        this._currentState = pendingState;
        cb(null, pendingState);
        return this;
    };

    var self = this;
    unbind(function(){
        pendingState.bind(obj);
        self._currentState = pendingState;
        cb(null, pendingState);
    });

    return this;
};

/**
 *  Remove a state
 *  @method removeState
 *
 *  @param {String} state
 *  @return {Object}
 */

Etat.prototype.removeState = function(state) {
    return delete this._states[state];
};

/**
 *  Call the update method for the current state 
 *  @method update
 *
 *  @param {*} data
 */

Etat.prototype.update = function(data) {
    var currentState = this.getCurrentState();
    if (!currentState || !currentState.update) return this;
    currentState.update(data);
    return this;
};

/**
 *  Call the create method for the current state 
 *  @method create
 *
 *  @param {*} data
 */

Etat.prototype.create = function(data) {
    var currentState = this.getCurrentState();
    if (!currentState || !currentState.create) return this;
    currentState.create(data);
    return this;
};

/**
 *  Call the remove method for the current state 
 *  @method remove
 *
 *  @param {*} data
 */

Etat.prototype.remove = function(data) {
    var currentState = this.getCurrentState();
    if (!currentState || !currentState.remove) return this;
    currentState.remove(data);
    return this;
};
