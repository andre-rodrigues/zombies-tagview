(function(window, bb) {
  "use strict";

  window.ZombieDieSystem = window.TimeSystem.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("clickable") && entity.hasComponent("zombie");
    },

    process: function() {
      this.parent();

      this.entities.forEach(function(entity) {
        if (entity.clickable.isClicked) {
          entity.removeComponent("clickable");
          entity.removeComponent("walking");

          entity.addComponent(new ZombieDying);

          entity.animation.sprites = [
            "zombieDying01",
            "zombieDying02",
            "zombieDying03",
            "zombieDying04",
            "zombieDying05",
            "zombieDying06"
          ];
          entity.animation.time = 150;
          entity.animation.numberOfIterations = 0;

          entity.addComponent(new Expire(entity.animation.totalTime));
        }
      });
    }
  });
})(window, bb);
