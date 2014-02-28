(function(window, bb) {
  "use strict";

  window.AnimationSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("animation") && entity.hasComponent("renderable");
    },

    process: function() {
      this.entities.forEach(this.animate, this);
    },

    animate: function(entity) {
      entity.animation.elapsedTime += this.world.deltaTime;
      entity.renderable.name = entity.animation.currentSprite;
    }
  });
})(window, bb);
