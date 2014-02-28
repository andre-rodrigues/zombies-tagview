(function(window, bb) {
  "use strict";

  window.ZombieDieSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasTag("zombie") && entity.hasComponent("life");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        if (entity.hasComponent("clickable") && entity.clickable.isClicked) {
          entity.life.takeDamage(10);
        }

        if (entity.life.isDead()) {
          if (entity.hasComponent("clickable")) entity.removeComponent("clickable");
          if (entity.hasComponent("walking")) entity.removeComponent("walking");
          if (entity.hasComponent("hittable")) entity.removeComponent("hittable");

          entity.removeComponent("life");

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
