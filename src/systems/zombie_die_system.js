(function(window, bb) {
  "use strict";

  window.ZombieDieSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("clickable") && entity.hasTag("zombie");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        if (entity.clickable.isClicked) {
          entity.life.takeDamage(6);
        }

        if (entity.life.life <= 0) {
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
          entity.animation.frameTime = 150;
          entity.animation.repeat = 0;

          entity.addComponent(new Expire(entity.animation.totalTime));
        }
      });
    }
  });
})(window, bb);
