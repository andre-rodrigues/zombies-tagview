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
        if (!entity.spatial.intersects(this.area)) {
          this.world.removeEntity(entity);
        }
      }.bind(this));
    }
  });
})(window, bb);
