(function(window, bb) {
  "use strict";

  window.BlinkSystem = bb.System.extend({
    init: function() {
      this.parent();
      this.originalOpacitites = {};
    },

    allowEntity: function(entity) {
      return entity.hasComponent("blink");
    },

    onEntityAdd: function(entity) {
      if (!entity.hasComponent("opacity")) {
        // The blink component uses the opacity component to show/hide the image, but the entity
        // could not have one in the first plance, in this case, we add it here
        entity.addComponent(new Opacity);
      }
    },

    onEntityRemoval: function(entity) {
      // Restore the original opacity when the blink component is removed
      var originalOpacity = this.originalOpacitites[entity.id];
      if (originalOpacity && entity.hasComponent("opacity")) {
        entity.opacity.level = originalOpacity;
      }
      delete this.originalOpacitites[entity.id];
    },

    process: function() {
      this.entities.forEach(function(entity) {
        entity.blink.elapsedTime += this.world.deltaTime;

        if (entity.blink.isOff()) {
          if (entity.opacity.value != entity.blink.level) {
            // We must store the original entity opacity before blinking, so we can restore it back
            // after the blinking is over
            this.originalOpacitites[entity.id] = entity.opacity.value;
          }
          entity.opacity.level = entity.blink.level;
        } else {
          entity.opacity.level = this.originalOpacitites[entity.id];
        }
      }.bind(this));
    }
  });
})(window, bb);
