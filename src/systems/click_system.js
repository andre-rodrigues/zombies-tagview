(function(window, bb) {
  "use strict";

  window.ClickSystem = bb.System.extend({
    init: function(container) {
      this.parent();
      this.container = container;
      this.clicks = [];

      this.startMouseCapture();
    },

    startMouseCapture: function() {
      this.container.addEventListener("click", this.click.bind(this), false);
    },

    allowEntity: function(entity) {
      return entity.hasComponent("clickable") && entity.hasComponent("spatial");
    },

    click: function(event) {
      this.clicks.push({ x: event.offsetX, y: event.offsetY });
    },

    isClicking: function(entity) {
      return this.clicks.some(function(click) {
        return entity.spatial.containsPoint(click.x, click.y);
      }, this);
    },

    process: function() {
      this.entities.forEach(function(entity) {
        entity.clickable.isClicked = this.isClicking(entity);
      }, this);

      this.clicks.clear();
    }
  });
})(window, bb);
