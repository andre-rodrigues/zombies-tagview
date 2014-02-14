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

    hasCollisionInX: function(click, spatial) {
      var halfWidth = spatial.width / 2;
      return click.x <= spatial.x + halfWidth && click.x >= spatial.x - halfWidth;
    },

    hasCollisionInY: function(click, spatial) {
      return click.y <= spatial.y + spatial.height && click.y >= spatial.y;
    },

    hasCollisionWith: function(entity) {
      return this.clicks.some(function(click) {
        return this.hasCollisionInX(click, entity.spatial) && this.hasCollisionInY(click, entity.spatial);
      }, this);
    },

    process: function() {
      this.entities.forEach(function(entity) {
        if (this.hasCollisionWith(entity)) {
          entity.clickable.isClicked = true;;
        }
      }, this);

      this.clicks.clear();
    }
  });
})(window, bb);
