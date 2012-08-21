/*
---
description: print the document
provides: [Delegator.Controls]
requires: [Behavior/Delegator, Core/Element]
script: Delegator.Controls.js
name: Delegator.Controls
...
*/

(function(){

	Delegator.register('click', 'Controls.Delete', {
		handler: function(event, link, api) {
			event.stop();
			var deleteForm = link.getElement('!.content .deleteForm');
			deleteForm.submit();
		}
	});

})();