/*
---

name: Controls
description: Controls
license: MIT-style license.
requires: [Core/Fx, Fx, Core/Fx.Transitions, Core/Fx.Tween]
provides: [Controls]

...
*/

var Controls = new Class({

	Implements: [Options, Events],

	options: {
		setActivationOfTextediting: true,
		activeCssClass: 'controlsActive'
	},

	_isActive: false,

	initialize: function(element, options) {
		this.element = element;
		this.setOptions(options);
	},

	activate: function() {
		this._isActive = true;
		this.element.addClass(this.options.activeCssClass);
		if (this.options.setActivationOfTextediting === true) {
			this.allowClickActivationOfTextediting();
		}
	},

	deactivate: function() {
		this._isActive = false;
		this.element.removeClass(this.options.activeCssClass);
		if (this.options.setActivationOfTextediting === true) {
			this.disableClickActivationOfTextediting();
		}
	},

	isActive: function() {
		return this._isActive;
	},

	_setActivationOfTextediting: function(allow) {
		var textElements = this.element.getElements('[data-behavior~="Flexo"]');
		textElements.each(function(textElement) {
			var flexo = textElement.getBehaviorResult('Flexo');
			flexo.setOptions({allowClickActivation: allow});
		});
	},

	allowClickActivationOfTextediting: function() {
		this._setActivationOfTextediting(true);
	},

	disableClickActivationOfTextediting: function() {
		this._setActivationOfTextediting(false);
	}

});