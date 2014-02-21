(function(window, bb) {
  "use strict";

  window.ZombieSpawnSystem = bb.System.extend({
    init: function(area) {
      this.parent();
      this.area = area;
    },

    allowEntity: function(entity) {
      return entity.hasComponent("zombieSpawning");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        entity.zombieSpawning.time -= this.world.deltaTime;

        if (entity.zombieSpawning.time <= 0) {
          entity.removeComponent("zombieSpawning");

          var angle = 0;
          entity.addComponent(new Walking(angle));
          entity.addComponent(new Clickable);

          entity.animation.sprites = [
            "zombieWalking01",
            "zombieWalking02",
            "zombieWalking03",
            "zombieWalking04",
            "zombieWalking05",
            "zombieWalking06",
            "zombieWalking07",
            "zombieWalking08",
            "zombieWalking09",
            "zombieWalking10",
            "zombieWalking11",
            "zombieWalking12",
            "zombieWalking13",
            "zombieWalking14",
            "zombieWalking15",
            "zombieWalking16",
            "zombieWalking17",
            "zombieWalking18",
            "zombieWalking19",
            "zombieWalking20"
          ];
          entity.animation.frameTime = 50;

          entity.addComponent(new BoundaryRemovable);
        }
      }, this);

      if (Math.random() < 0.05) {
        var zombie = this.world.createEntity();
        zombie.tag("zombie");

        var x = 0,
            y = (this.area.height - 120) * Math.random();

        zombie.addComponent(new Spatial(x, y, 60, 120));
        zombie.addComponent(new Renderable("zombieSpawning"));
        zombie.addComponent(new ZombieSpawning(2100));
        zombie.addComponent(new Animation([
          "zombieSpawning01",
          "zombieSpawning01",
          "zombieSpawning01",
          "zombieSpawning01",
          "zombieSpawning01",
          "zombieSpawning01",
          "zombieSpawning01",
          "zombieSpawning02",
          "zombieSpawning02",
          "zombieSpawning02",
          "zombieSpawning03",
          "zombieSpawning03",
          "zombieSpawning04",
          "zombieSpawning05"
        ], 150));
      }
    }
  });
})(window, bb);
