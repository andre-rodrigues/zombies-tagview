(function(window, bb) {
  "use strict";

  window.ZombieSpawnSystem = bb.System.extend({
    init: function(area, slopeIncreaseEvery, spawnEvery, curve) {
      this.parent();
      this.area = area;

      this.tick = 0;
      this.initialSlopePoint = 0.2;
      this.slopePoint = this.initialSlopePoint;
      this.slopeIncreaseEvery = slopeIncreaseEvery || 1500;
      this.spawnEvery = spawnEvery || 300;
      this.curve = (curve || this.defaultSpawnCurve).bind(this);
    },

    allowEntity: function(entity) {
      return entity.hasComponent("zombieSpawning") && entity.hasComponent("spatial");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        if (entity.spatial.intersects(this.world.screen)) {
          entity.removeComponent("zombieSpawning");
          entity.addComponent(new Life(10));
          entity.addComponent(new Clickable);
          entity.addComponent(new BoundaryRemovable);
        }
      }, this);

      // Initial spawn
      if (this.tick == 0 && this.slopePoint == this.initialSlopePoint) {
        this.spawn();
      }

      var toSpawn = Math.floor(this.curve(this.slopePoint) * 10);

      this.tick += 1;
      if (this.tick % this.slopeIncreaseEvery == 0) {
        this.slopePoint += 0.1;
      }

      if (this.tick % this.spawnEvery == 0) {
        for (var i = 0; i < toSpawn; i++) {
          this.spawn();
        }
      }
    },

    defaultSpawnCurve: function(x) {
      return x / Math.sqrt(1 + Math.pow(x, 2));
    },

    spawn: function() {
      var ZOMBIE_WIDTH = 170;
      var ZOMBIE_HEIGHT = 266;

      function zombieSpawnPosition(area, goPoint) {
        // TODO: alter this to gameOverPosition
        var GOAL_POSITION = goPoint;

        // zombie walking angle
        var randAngle = Math.random() * Math.PI;
        var yDistance = area.height - GOAL_POSITION.y;
        var xDistance = GOAL_POSITION.x;
        // pitagoras
        var hypotenuse = Math.sqrt( Math.pow(xDistance, 2) + Math.pow(yDistance, 2) );
        return {
          x: (Math.cos(randAngle) * hypotenuse) + GOAL_POSITION.x,
          y: (Math.sin(randAngle) * hypotenuse) + GOAL_POSITION.y
        }
      }

      var zombiePosition = zombieSpawnPosition(this.area, this.goPoint);
      var zombie = this.world.createEntity().tag("zombie"),
          width = ZOMBIE_WIDTH,
          height = ZOMBIE_HEIGHT,
          x = zombiePosition.x,
          y = zombiePosition.y;

      // TODO: move this formula to walking_system
      var angle = Math.atan2( -1 * (zombiePosition.y - 0), (this.area.width / 2) - zombiePosition.x);

      zombie.addComponent(new Spatial(x, y, width, height));
      zombie.addComponent(new Walking(angle, 80));
      zombie.addComponent(new Hittable);
      zombie.addComponent(new DamageOnHuman);
      zombie.addComponent(new ZombieSpawning);
      zombie.addComponent(new Renderable("zombieWalking01"));
      zombie.addComponent(new Animation([
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
      ], 50));
    }
  });
})(window, bb);
