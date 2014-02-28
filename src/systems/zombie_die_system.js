(function(window, bb) {
  "use strict";

  window.ZombieDieSystem = bb.System.extend({

    init: function() {
      this.parent();
      this.dyingSounds = [
        "zombieDying1",
        "zombieDying2",
        "zombieDying3",
        "zombieDying4",
        "zombieDying5",
        "zombieDying6",
        "zombieDying7"
      ];
    },

    allowEntity: function(entity) {
      return entity.hasTag("zombie") && entity.hasComponent("life");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        if (entity.hasComponent("clickable") && entity.clickable.isClicked) {
          entity.life.takeDamage(Infinity); // It is a killing blow for now
        }

        if (entity.life.isDead()) {
          if (entity.hasComponent("clickable")) entity.removeComponent("clickable");
          if (entity.hasComponent("walking")) entity.removeComponent("walking");
          if (entity.hasComponent("hittable")) entity.removeComponent("hittable");

          entity.removeComponent("life");

          entity.addComponent(new ZombieDying);

          entity.animation.sprites = [];

          for (var i = 1; i <= 48; i++) {
            entity.animation.sprites.push("zombieDying" + i);
          }

          entity.animation.frameTime = 50;
          entity.animation.repeat = 0;

          entity.addComponent(new Expire(entity.animation.totalTime));

          var zombieDying = this.world.createEntity();
          zombieDying.addComponent(new Sound(this.dyingSounds.sample()));
        }
      }, this);
    }
  });
})(window, bb);
