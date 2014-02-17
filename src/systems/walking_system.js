(function(window, bb) {
  "use strict";

  window.WalkingSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("walking") && entity.hasComponent("spatial");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        // TODO: Engine bug
        // After the ZombiDieSytem removes the walking sytem
        // the entities are not updated on the same loop
        if (!entity.walking) return;

        var velocity = entity.walking.velocity,
            distance = (this.world.deltaTime / 1000) * velocity;

        entity.spatial.x += Math.cos(entity.walking.angle) * distance;
        entity.spatial.y += Math.sin(entity.walking.angle) * distance;
      }, this);
    }
  });
})(window, bb);
