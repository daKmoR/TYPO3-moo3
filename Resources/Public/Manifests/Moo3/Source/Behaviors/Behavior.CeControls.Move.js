/*
---
name: Behavior.CeControls.Move
description: allows to sync automatically
provides: [Behavior.CeControls.Move]
requires: [Behavior/Behavior, Behavior/Element.Data, More/Object.Extras, Core/Fx.Morph, More/Drag.Move]
script: Behavior.CeControls.Move.js

...
*/

Behavior.addGlobalFilter('CeControls.Move', {

	setup: function(element, api) {
		var ce = element.getElement('!.ce');

		element.addEvent('mousedown', function(event) {
    	event.stop();
			ce.removeClass('ceDroppable');

			var reAddDroppable = ce.getPrevious().hasClass('ceDroppable');
			if (reAddDroppable) {
				ce.getPrevious().removeClass('ceDroppable');
			}

			var clone = ce.clone().setStyles(ce.getCoordinates()).setStyles({
				opacity: 0.7,
				position: 'absolute'
			}).inject(document.body);

			var drag = new Drag.Move(clone, {
				handle: element,
				droppables: $$('.ceDroppable'),
				onEnter: function(dragging, dropArea) {
					dragging.fade(0.01);
					this.localClone = ce.clone();
					this.localClone.setStyle('opacity', 0.7);
					this.localClone.inject(dropArea, 'after');
				},
				onLeave: function(dragging, dropArea) {
					dragging.fade(0.7);
					this.localClone.destroy();
				},
				onDrop: function(dragged, dropArea) {
					document.body.removeClass('ceDraging');
					ce.addClass('ceDroppable');
					if (reAddDroppable) {
						ce.getPrevious().addClass('ceDroppable');
					}

					if (dropArea) {
						this.localClone.destroy();
						ce.setStyle('opacity', 1);
						ce.inject(dropArea, 'after');
						var form = ce.getElement('.ceMoveForm');
						form.getElement('[name="tx_fluidce_content[contentUids][moveAfterUid]"]').set('value', dropArea.get('id').substr(2));
						form.submit();
						dragged.destroy();
					} else {
						ce.fade(1);
						dragged.morph(this.startPosition).get('morph').chain(function() {
							dragged.destroy();
						});
					}
					this.detach();
				},
				onStart: function(dragged) {
					this.startPosition = clone.getStyles('left', 'top');
					ce.fade(0.1);
					document.body.addClass('ceDraging');
				},
				onCancel: function() {
					console.log('fail');
				}
			});

			drag.start(event);
		});

	}

});