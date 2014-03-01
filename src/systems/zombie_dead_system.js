(function(window, bb) {
  "use strict";

  var dyingSounds = [
    "zombieDying1",
    "zombieDying2",
    "zombieDying3",
    "zombieDying4",
    "zombieDying5",
    "zombieDying6",
    "zombieDying7"
  ];

  window.ZombieDeadSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("zombieDying") && entity.hasComponent("animation");
    },

    onEntityAdd: function(entity) {
      entity.animation.sprites = [];

      for (var i = 1; i <= 48; i++) {
        entity.animation.sprites.push("zombieDying" + i);
      }

      entity.animation.frameTime = 30;
      entity.animation.repeat = 0;

      this.world.createEntity().addComponent(new Sound(dyingSounds.sample()));
    },

    process: function() {
      this.entities.forEach(function(entity) {
        if (entity.animation.hasEnded()) {
          entity.removeComponent("zombieDying");
          entity.addComponent(new Blink(20));
          entity.addComponent(new Expire(1 * 1000));
        }
      });
    }
  });
})(window, bb);
