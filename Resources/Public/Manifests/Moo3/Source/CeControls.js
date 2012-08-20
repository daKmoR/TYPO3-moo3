/*
---

name: CeControls
description: Controls
license: MIT-style license.
requires: [Core/Fx, Fx, Core/Fx.Transitions, Core/Fx.Tween]
provides: [CeControls]

...
*/

var CeControls = new Class({

	Implements: [Options, Events],

	options: {
		template: '<div class="ceControls">' +
		          '  <a href="#" data-behavior="CeControls.Move" class="ceControlsMove"><i class="icon-move"></i></a>' +
		          '  <a href="#" data-trigger="CeControls.Delete" class="ceControlsDelete"><i class="icon-trash"></i></a>' +
		          '</div>'
	},

	_isActive: false,

	initialize: function(element, options) {
		this.element = element;
		this.setOptions(options);
		//this.build();
	},

	build: function() {
		var tmp = new Element('div');
		tmp.set('html', this.options.template);

		this.element.grab(tmp);
	},

	activate: function() {
		this._isActive = true;
		this.allowActivationOfTextediting();
		this.element.addClass('ceControlsActive');
	},

	deactivate: function() {
		this._isActive = false;
		this.disableActivationOfTextediting();
		this.element.removeClass('ceControlsActive');
	},

	isActive: function() {
		return this._isActive;
	},

	_setActivationOfTextediting: function(allow) {
		var textElements = this.element.getElements('[data-behavior~="Flexo"]');
		textElements.each(function(textElement) {
			var flexo = textElement.getBehaviorResult('Flexo');
			flexo.setOptions({allowActivation: allow});
		});
	},

	allowActivationOfTextediting: function() {
		this._setActivationOfTextediting(true);
	},

	disableActivationOfTextediting: function() {
		this._setActivationOfTextediting(false);
	}

});