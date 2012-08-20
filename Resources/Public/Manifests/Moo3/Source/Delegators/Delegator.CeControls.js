/*
---
description: print the document
provides: [Delegator.CeControls]
requires: [Behavior/Delegator, Core/Element]
script: Delegator.CeControls.js
name: Delegator.CeControls
...
*/

(function(){

	Delegator.register('click', 'CeControls.Delete', {
		handler: function(event, link, api) {
			event.stop();
			var deleteForm = link.getElement('!.ce .ceDeleteForm');
			deleteForm.submit();
		}
	});

})();