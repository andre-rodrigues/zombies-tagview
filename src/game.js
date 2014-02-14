(function(window, bb) {
  "use strict";

  window.Game = bb.Class.extend({
    init: function(ctx) {
      this.ctx = ctx;
      this.runner = new bb.Runner;
      this.loader = new bb.Loader;

      this.sprites = {
        zombieSpawning01: new bb.Image("/assets/zombie_rising_1.png"),
        zombieSpawning02: new bb.Image("/assets/zombie_rising_2.png"),
        zombieSpawning03: new bb.Image("/assets/zombie_rising_3.png"),
        zombieSpawning04: new bb.Image("/assets/zombie_rising_4.png"),
        zombieSpawning05: new bb.Image("/assets/zombie_rising_5.png"),
        zombieWalking01: new bb.Image("/assets/zombie_walking_1.png"),
        zombieWalking02: new bb.Image("/assets/zombie_walking_2.png"),
        zombieWalking03: new bb.Image("/assets/zombie_walking_3.png"),
        zombieWalking04: new bb.Image("/assets/zombie_walking_4.png"),
        zombieWalking05: new bb.Image("/assets/zombie_walking_5.png"),
        zombieWalking06: new bb.Image("/assets/zombie_walking_6.png"),
        zombieWalking07: new bb.Image("/assets/zombie_walking_7.png"),
        zombieWalking08: new bb.Image("/assets/zombie_walking_8.png")
      };

      for (var sprite in this.sprites) {
        this.loader.add(this.sprites[sprite]);
      }

      this.loader.load(this.reset.bind(this));
    },

    start: function() {
      this.runner.start();
    },

    pause: function() {
      this.runner.stop();
    },

    reset: function() {
      var world = new bb.World;

      world.addSystem(new ZombieSpawnSystem(this.ctx.canvas))
           .addSystem(new WalkingSystem)
           .addSystem(new BoundingSystem(this.ctx.canvas))
           .addSystem(new AnimationSystem)
           .addSystem(new RenderingSystem(this.ctx, this.sprites))
           .addSystem(new ScoreCountSystem());

      this.pause();
      this.runner.onTick = world.process.bind(world);
      this.start();
    }
  });
})(window, bb);
