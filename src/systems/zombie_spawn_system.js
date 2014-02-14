(function(window, bb) {
  "use strict";

  window.ZombieSpawnSystem = window.TimeSystem.extend({
    init: function(area) {
      this.parent();
      this.area = area;
    },

    allowEntity: function(entity) {
      return entity.hasComponent("zombieSpawning");
    },

    process: function() {
      this.parent();

      this.entities.forEach(function(entity) {
        entity.zombieSpawning.time -= this.deltaTime;

        if (entity.zombieSpawning.time <= 0) {
          entity.removeComponent("zombieSpawning");

          var angle = Math.random() * 360;
          entity.addComponent(new Walking(angle));

          entity.animation.sprites = [
            "zombieWalking01",
            "zombieWalking02",
            "zombieWalking03",
            "zombieWalking04",
            "zombieWalking05",
            "zombieWalking06",
            "zombieWalking07",
            "zombieWalking08"
          ];

          entity.addComponent(new BoundaryRemovable);
        }
      }, this);

      if (Math.random() < 0.05) {
        var zombie = this.world.createEntity();

        var x = this.area.width * Math.random(),
        y = this.area.height * Math.random();

        zombie.addComponent(new Spatial(x, y, 60, 120));
        zombie.addComponent(new Renderable("zombieSpawning"));
        zombie.addComponent(new ZombieSpawning(800));
        zombie.addComponent(new Animation([
          "zombieSpawning01",
          "zombieSpawning02",
          "zombieSpawning03",
          "zombieSpawning04",
          "zombieSpawning05"
        ], 100));
      }
    }
  });
})(window, bb);
