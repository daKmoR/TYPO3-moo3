/*
---
name: Behavior.Content.Move
description: allows to sync automatically
provides: [Behavior.Content.Move]
requires: [Behavior/Behavior, Behavior/Element.Data, More/Object.Extras, Core/Fx.Morph, More/Drag.Move]
script: Behavior.Content.Move.js

...
*/

Behavior.addGlobalFilter('Content.Move', {

	setup: function(element, api) {
		var content = element.getElement('!.content');

		element.addEvent('mousedown', function(event) {
    	event.stop();
			content.removeClass('contentDroppable');

			var reAddDroppable = content.getPrevious() ? content.getPrevious().hasClass('contentDroppable') : false;
			if (reAddDroppable) {
				content.getPrevious().removeClass('contentDroppable');
			}

			var clone = content.clone().setStyles(content.getCoordinates()).setStyles({
				opacity: 0.7,
				position: 'absolute'
			}).inject(document.body);

			var drag = new Drag.Move(clone, {
				handle: element,
				droppables: $$('.contentDroppable'),
				onEnter: function(dragging, dropArea) {
					dragging.fade(0.01);
					this.localClone = content.clone();
					this.localClone.setStyle('opacity', 0.7);
					this.localClone.inject(dropArea, 'after');
				},
				onLeave: function(dragging, dropArea) {
					dragging.fade(0.7);
					this.localClone.destroy();
				},
				onDrop: function(dragged, dropArea) {
					document.body.removeClass('contentDraging');
					content.addClass('contentDroppable');
					if (reAddDroppable) {
						content.getPrevious().addClass('contentDroppable');
					}

					if (dropArea) {
						this.localClone.destroy();
						content.setStyle('opacity', 1);
						content.inject(dropArea, 'after');
						var form = content.getElement('.moveForm');
						form.getElement('[name="tx_fluidce_content[contentUids][moveAfterUid]"]').set('value', dropArea.get('id').substr(7));
						form.submit();
						dragged.destroy();
					} else {
						content.fade(1);
						dragged.morph(this.startPosition).get('morph').chain(function() {
							dragged.destroy();
						});
					}
					this.detach();
				},
				onStart: function(dragged) {
					this.startPosition = clone.getStyles('left', 'top');
					content.fade(0.1);
					document.body.addClass('contentDraging');
				},
				onCancel: function() {
					console.log('fail');
				}
			});

			drag.start(event);
		});

	}

});