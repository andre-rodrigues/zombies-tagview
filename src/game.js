(function(window, bb) {
  "use strict";

  window.Game = bb.Class.extend({
    init: function(views) {
      this.views = views;
      this.runner = new bb.Runner;
      this.loader = new bb.Loader;

      this.sprites = {
        zombieSpawning01: new bb.Image("assets/zombie_rising_1.png"),
        zombieSpawning02: new bb.Image("assets/zombie_rising_2.png"),
        zombieSpawning03: new bb.Image("assets/zombie_rising_3.png"),
        zombieSpawning04: new bb.Image("assets/zombie_rising_4.png"),
        zombieSpawning05: new bb.Image("assets/zombie_rising_5.png"),

        zombieWalking01: new bb.Image("assets/walking/skeleton-walking-200.png"),
        zombieWalking02: new bb.Image("assets/walking/skeleton-walking-201.png"),
        zombieWalking03: new bb.Image("assets/walking/skeleton-walking-202.png"),
        zombieWalking04: new bb.Image("assets/walking/skeleton-walking-203.png"),
        zombieWalking05: new bb.Image("assets/walking/skeleton-walking-204.png"),
        zombieWalking06: new bb.Image("assets/walking/skeleton-walking-206.png"),
        zombieWalking07: new bb.Image("assets/walking/skeleton-walking-207.png"),
        zombieWalking08: new bb.Image("assets/walking/skeleton-walking-208.png"),
        zombieWalking09: new bb.Image("assets/walking/skeleton-walking-209.png"),
        zombieWalking10: new bb.Image("assets/walking/skeleton-walking-210.png"),
        zombieWalking11: new bb.Image("assets/walking/skeleton-walking-211.png"),
        zombieWalking12: new bb.Image("assets/walking/skeleton-walking-212.png"),
        zombieWalking13: new bb.Image("assets/walking/skeleton-walking-213.png"),
        zombieWalking14: new bb.Image("assets/walking/skeleton-walking-214.png"),
        zombieWalking15: new bb.Image("assets/walking/skeleton-walking-215.png"),
        zombieWalking16: new bb.Image("assets/walking/skeleton-walking-216.png"),
        zombieWalking17: new bb.Image("assets/walking/skeleton-walking-217.png"),
        zombieWalking18: new bb.Image("assets/walking/skeleton-walking-218.png"),
        zombieWalking19: new bb.Image("assets/walking/skeleton-walking-219.png"),
        zombieWalking20: new bb.Image("assets/walking/skeleton-walking-220.png"),
        zombieWalking21: new bb.Image("assets/walking/skeleton-walking-221.png"),

        zombieDying01: new bb.Image("assets/zombie_dying_1.png"),
        zombieDying02: new bb.Image("assets/zombie_dying_2.png"),
        zombieDying03: new bb.Image("assets/zombie_dying_3.png"),
        zombieDying04: new bb.Image("assets/zombie_dying_4.png"),
        zombieDying05: new bb.Image("assets/zombie_dying_5.png"),
        zombieDying06: new bb.Image("assets/zombie_dying_6.png"),

        alertable:       new bb.Image("assets/runningOut.png")
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

      world.addSystem(new ExpirationSystem)
           .addSystem(new ZombieSpawnSystem(this.views.ctx.canvas))
           .addSystem(new WalkingSystem)
           .addSystem(new BoundingSystem(this.views.ctx.canvas))
           .addSystem(new ClickSystem(this.views.ctx.canvas))
           .addSystem(new ZombieDieSystem)
           .addSystem(new AnimationSystem)
           .addSystem(new ScoreCountSystem(this.views.score))
           .addSystem(new RenderingSystem(this.views.ctx, this.sprites));

      this.pause();

      this.runner.onTick = function(deltaTime) {
        world.deltaTime = deltaTime;
        world.process();
      }

      this.start();
    }
  });
})(window, bb);
