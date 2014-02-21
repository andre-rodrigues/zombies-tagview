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

        zombieWalking01: new bb.Image("assets/zombie-01/skeleton-walk200.png"),
        zombieWalking02: new bb.Image("assets/zombie-01/skeleton-walk201.png"),
        zombieWalking03: new bb.Image("assets/zombie-01/skeleton-walk202.png"),
        zombieWalking04: new bb.Image("assets/zombie-01/skeleton-walk203.png"),
        zombieWalking05: new bb.Image("assets/zombie-01/skeleton-walk204.png"),
        zombieWalking06: new bb.Image("assets/zombie-01/skeleton-walk206.png"),
        zombieWalking07: new bb.Image("assets/zombie-01/skeleton-walk207.png"),
        zombieWalking08: new bb.Image("assets/zombie-01/skeleton-walk208.png"),
        zombieWalking09: new bb.Image("assets/zombie-01/skeleton-walk209.png"),
        zombieWalking10: new bb.Image("assets/zombie-01/skeleton-walk210.png"),
        zombieWalking11: new bb.Image("assets/zombie-01/skeleton-walk211.png"),
        zombieWalking12: new bb.Image("assets/zombie-01/skeleton-walk212.png"),
        zombieWalking13: new bb.Image("assets/zombie-01/skeleton-walk213.png"),
        zombieWalking14: new bb.Image("assets/zombie-01/skeleton-walk214.png"),
        zombieWalking15: new bb.Image("assets/zombie-01/skeleton-walk215.png"),
        zombieWalking16: new bb.Image("assets/zombie-01/skeleton-walk216.png"),
        zombieWalking17: new bb.Image("assets/zombie-01/skeleton-walk217.png"),
        zombieWalking18: new bb.Image("assets/zombie-01/skeleton-walk218.png"),
        zombieWalking19: new bb.Image("assets/zombie-01/skeleton-walk219.png"),
        zombieWalking20: new bb.Image("assets/zombie-01/skeleton-walk220.png"),

        zombieDying01: new bb.Image("assets/zombie_dying_1.png"),
        zombieDying02: new bb.Image("assets/zombie_dying_2.png"),
        zombieDying03: new bb.Image("assets/zombie_dying_3.png"),
        zombieDying04: new bb.Image("assets/zombie_dying_4.png"),
        zombieDying05: new bb.Image("assets/zombie_dying_5.png"),
        zombieDying06: new bb.Image("assets/zombie_dying_6.png"),

        alertable: new bb.Image("assets/runningOut.png")
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

      var screen = new Rectangle(
        this.views.ctx.canvas.offsetLeft,
        this.views.ctx.canvas.offsetTop,
        this.views.ctx.canvas.width,
        this.views.ctx.canvas.height
      );

      var waves = [
        new Wave(1000 * 60 * 5, {
          zombie1: 50,
          zombie2: 30
        })
      ];

      world.addSystem(new ExpirationSystem)
           .addSystem(new ZombieSpawnSystem(screen, waves))
           .addSystem(new WalkingSystem)
           .addSystem(new ZombieEscapingAlertSystem(screen))
           .addSystem(new BoundingSystem(screen))
           .addSystem(new ClickSystem(this.views.ctx.canvas))
           .addSystem(new ZombieDieSystem)
           .addSystem(new AnimationSystem)
           .addSystem(new ScoreCountSystem(this.views.score))
           .addSystem(new BlinkSystem)
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
