(function(window, bb) {
  "use strict";

  window.AnimationSystem = window.TimeSystem.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("animation") && entity.hasComponent("renderable");
    },

    onEntityAdd: function(entity) {
      entity.animation.currentTime = 0;
      entity.renderable.name = entity.animation.sprites[0];
    },

    process: function() {
      this.parent();
      this.entities.forEach(this.animate, this);
    },

    animate: function(entity) {
      var animation = entity.animation;
      animation.currentTime += this.deltaTime;

      if (animation.currentTime >= animation.time) {
        entity.animation.numberOfIterations++;
        var frameIndex = entity.animation.numberOfIterations % animation.sprites.length;
        entity.renderable.name = animation.sprites[frameIndex];

        animation.currentTime = 0;
      }
    }
  });
})(window, bb);
