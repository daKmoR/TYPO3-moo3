/*
---
name: Behavior.Controls
description: allows to sync automatically
provides: [Behavior.Controls]
requires: [Behavior/Behavior, Behavior/Element.Data, More/Object.Extras, Controls]
script: Behavior.Controls.js

...
*/

Behavior.addGlobalFilter('Controls', {

	setup: function(element, api) {
		var controls = new Controls(element);
//		element.addEvent('click', function() {
//			if (this.ceControls.isActive()) {
//				//this.ceControls.deactivate();
//			} else {
//				this.ceControls.activate();
//			}
//		}.bind(this));

		element.addEvent('mouseenter', function() {
			controls.activate();
		}.bind(this));

		element.addEvent('mouseleave', function() {
			controls.deactivate();
		}.bind(this));

	}

});