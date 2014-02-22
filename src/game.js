(function(window, bb) {
  "use strict";

  window.Game = bb.Class.extend({
    init: function(views) {
      this.views = views;
      this.runner = new bb.Runner;
      this.loader = new bb.Loader;

      this.sprites = {
        zombieWalking01: new bb.Image("assets/zombie-01/skeleton-walk500.png"),
        zombieWalking02: new bb.Image("assets/zombie-01/skeleton-walk501.png"),
        zombieWalking03: new bb.Image("assets/zombie-01/skeleton-walk502.png"),
        zombieWalking04: new bb.Image("assets/zombie-01/skeleton-walk503.png"),
        zombieWalking05: new bb.Image("assets/zombie-01/skeleton-walk504.png"),
        zombieWalking06: new bb.Image("assets/zombie-01/skeleton-walk506.png"),
        zombieWalking07: new bb.Image("assets/zombie-01/skeleton-walk507.png"),
        zombieWalking08: new bb.Image("assets/zombie-01/skeleton-walk508.png"),
        zombieWalking09: new bb.Image("assets/zombie-01/skeleton-walk509.png"),
        zombieWalking10: new bb.Image("assets/zombie-01/skeleton-walk510.png"),
        zombieWalking11: new bb.Image("assets/zombie-01/skeleton-walk511.png"),
        zombieWalking12: new bb.Image("assets/zombie-01/skeleton-walk512.png"),
        zombieWalking13: new bb.Image("assets/zombie-01/skeleton-walk513.png"),
        zombieWalking14: new bb.Image("assets/zombie-01/skeleton-walk514.png"),
        zombieWalking15: new bb.Image("assets/zombie-01/skeleton-walk515.png"),
        zombieWalking16: new bb.Image("assets/zombie-01/skeleton-walk516.png"),
        zombieWalking17: new bb.Image("assets/zombie-01/skeleton-walk517.png"),
        zombieWalking18: new bb.Image("assets/zombie-01/skeleton-walk518.png"),
        zombieWalking19: new bb.Image("assets/zombie-01/skeleton-walk519.png"),
        zombieWalking20: new bb.Image("assets/zombie-01/skeleton-walk520.png"),

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

      world.screen = new Rectangle(
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
           .addSystem(new ZombieSpawnSystem(world.screen, waves))
           .addSystem(new WalkingSystem)
           .addSystem(new ZombieEscapingAlertSystem(world.screen))
           .addSystem(new BoundingSystem(world.screen))
           .addSystem(new ClickSystem(this.views.ctx.canvas))
           .addSystem(new ZombieDieSystem)
           .addSystem(new AnimationSystem)
           .addSystem(new ScoreCountSystem(this.views.score))
           .addSystem(new BlinkSystem)
           .addSystem(new PIXI.RenderingSystem(this.views.ctx, this.sprites));

      this.pause();

      this.runner.onTick = function(deltaTime) {
        world.deltaTime = deltaTime;
        world.process();
      }

      this.start();
    }
  });
})(window, bb);
