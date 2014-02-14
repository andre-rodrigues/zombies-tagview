(function(window, bb) {
  "use strict";

  window.WalkingSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("walking") && entity.hasComponent("spatial");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        var velocity = entity.walking.velocity;
        entity.spatial.x += Math.cos(entity.walking.angle) * velocity;
        entity.spatial.y += Math.sin(entity.walking.angle) * velocity;
      });
    }
  });
})(window, bb);
