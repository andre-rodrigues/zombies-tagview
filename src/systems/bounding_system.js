(function(window, bb) {
  "use strict";

  window.BoundingSystem = bb.System.extend({
    init: function(area) {
      this.parent();
      this.area = area;
    },

    allowEntity: function(entity) {
      return entity.hasComponent("boundaryRemovable") && entity.hasComponent("spatial");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        var spatial = entity.spatial;

        if (spatial.x + spatial.width / 2 < 0 ||
            spatial.x - spatial.width / 2 > this.area.width ||
            spatial.y + spatial.height < 0 ||
            spatial.y > this.area.height) {

          this.world.removeEntity(entity);
        }
      }.bind(this));
    }
  });
})(window, bb);
