(function(window, bb) {
  "use strict";

  window.ZombieDieSystem = window.TimeSystem.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("zombieDying");
    },

    onEntityAdd: function(entity) {
        entity.removeComponent("walking");
        entity.animation.sprites = [
          "zombieDying01",
          "zombieDying02",
          "zombieDying03",
          "zombieDying04",
          "zombieDying05",
          "zombieDying06"
        ];

        entity.animation.numberOfIterations = 0;
    },

    process: function() {
      this.parent();

      this.entities.forEach(function(entity) {
        entity.zombieDying.time -= this.deltaTime;

        if (entity.zombieDying.time  <= 0) {
          this.world.removeEntity(entity);
        }
      }, this);

    }
  });
})(window, bb);
