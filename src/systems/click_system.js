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
      return entity.hasComponent("clickable")
                && entity.hasComponent("spatial")
                && !entity.hasComponent("zombieDying");
    },

    click: function(event) {
      this.clicks.push({ x: event.offsetX, y: event.offsetY });
    },

    hasCollisionWith: function(entity) {
      return this.clicks.some(function(click) {
        return entity.spatial.containsPoint(click.x, click.y);
      }, this);
    },

    process: function() {
      this.entities.forEach(function(entity) {
        if (this.hasCollisionWith(entity)) {
          entity.clickable.isClicked = true;
          entity.addComponent(new ZombieDying(800));
        }
      }, this);

      this.clicks.clear();
    }
  });
})(window, bb);
