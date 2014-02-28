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

    process: function() {
      this.clicks.forEach(function(click) {
        var clicked = this.entities.filter(function(entity) {
          return entity.spatial.contains({ x: click.x, y: click.y });
        });

        if (clicked.length > 0) {
          var entity = clicked.max(function(entity) {
            return entity.spatial.y;
          });

          entity.clickable.isClicked = true;
        }
      }, this);

      this.clicks.clear();
    }
  });
})(window, bb);
