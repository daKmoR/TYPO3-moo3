/*
---
name: Behavior.Page.Move
description: allows to sync automatically
provides: [Behavior.Page.Move]
requires: [Behavior/Behavior, Behavior/Element.Data, More/Object.Extras, Core/Fx.Morph, More/Drag.Move]
script: Behavior.Page.Move.js

...
*/

Behavior.addGlobalFilter('Page.Move', {

	setup: function(element, api) {
		var page = element.getElement('!.page');

		element.addEvent('mousedown', function(event) {
    	event.stop();
			page.removeClass('pageDroppable');

			var reAddDroppable = page.getPrevious() ? page.getPrevious().hasClass('pageDroppable') : false;
			if (reAddDroppable) {
				page.getPrevious().removeClass('pageDroppable');
			}

			var clone = page.clone().setStyles(page.getCoordinates()).setStyles({
				opacity: 0.7,
				position: 'absolute'
			}).inject(document.body);

			var drag = new Drag.Move(clone, {
				handle: element,
				droppables: $$('.pageDroppable'),
				onEnter: function(dragging, dropArea) {
					dragging.fade(0.01);
					this.localClone = page.clone();
					this.localClone.setStyle('opacity', 0.7);
					this.localClone.inject(dropArea, 'after');
				},
				onLeave: function(dragging, dropArea) {
					dragging.fade(0.7);
					this.localClone.destroy();
				},
				onDrop: function(dragged, dropArea) {
					document.body.removeClass('pageDraging');
					page.addClass('pageDroppable');
					if (reAddDroppable) {
						page.getPrevious().addClass('pageDroppable');
					}

					if (dropArea) {
						this.localClone.destroy();
						page.setStyle('opacity', 1);
						page.inject(dropArea, 'after');
						var form = page.getElement('.moveForm');
						form.getElement('[name="tx_fluidce_content[pageUids][moveAfterUid]"]').set('value', dropArea.get('id').substr(4));
						form.submit();
						dragged.destroy();
					} else {
						page.fade(1);
						dragged.morph(this.startPosition).get('morph').chain(function() {
							dragged.destroy();
						});
					}
					this.detach();
				},
				onStart: function(dragging) {
					this.startPosition = clone.getStyles('left', 'top');
					var originalWidth = dragging.getStyle('width').toInt();
					dragging.addClass('dragged');
					var offset = originalWidth - dragging.getSize().x;
					this.startPosition.left = this.startPosition.left.toInt() - offset;
					dragging.setStyle('margin-left', offset);
					page.fade(0.1);
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