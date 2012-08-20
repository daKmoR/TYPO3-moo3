/*
---
name: Behavior.CeControls
description: allows to sync automatically
provides: [Behavior.CeControls]
requires: [Behavior/Behavior, Behavior/Element.Data, More/Object.Extras, CeControls]
script: Behavior.CeControls.js

...
*/

Behavior.addGlobalFilter('CeControls', {

	setup: function(element, api) {
		var ceControls = new CeControls(element);
//		element.addEvent('click', function() {
//			if (this.ceControls.isActive()) {
//				//this.ceControls.deactivate();
//			} else {
//				this.ceControls.activate();
//			}
//		}.bind(this));

		element.addEvent('mouseenter', function() {
			ceControls.activate();
		}.bind(this));

		element.addEvent('mouseleave', function() {
			ceControls.deactivate();
		}.bind(this));

	}

});