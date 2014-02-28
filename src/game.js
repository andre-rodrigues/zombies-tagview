(function(window, bb) {
  "use strict";

  var fpsMeter = new FPSMeter({
    graph: true,
    history: 30
  });

  window.Game = bb.Class.extend({
    init: function(views) {
      this.views = views;
      this.runner = new bb.Runner;
      this.loader = new bb.Loader;

      this.sprites = {
        zombieWalking01: new bb.Image("assets/zombie-01-walking/skeleton-walk500.png"),
        zombieWalking02: new bb.Image("assets/zombie-01-walking/skeleton-walk501.png"),
        zombieWalking03: new bb.Image("assets/zombie-01-walking/skeleton-walk502.png"),
        zombieWalking04: new bb.Image("assets/zombie-01-walking/skeleton-walk503.png"),
        zombieWalking05: new bb.Image("assets/zombie-01-walking/skeleton-walk504.png"),
        zombieWalking06: new bb.Image("assets/zombie-01-walking/skeleton-walk506.png"),
        zombieWalking07: new bb.Image("assets/zombie-01-walking/skeleton-walk507.png"),
        zombieWalking08: new bb.Image("assets/zombie-01-walking/skeleton-walk508.png"),
        zombieWalking09: new bb.Image("assets/zombie-01-walking/skeleton-walk509.png"),
        zombieWalking10: new bb.Image("assets/zombie-01-walking/skeleton-walk510.png"),
        zombieWalking11: new bb.Image("assets/zombie-01-walking/skeleton-walk511.png"),
        zombieWalking12: new bb.Image("assets/zombie-01-walking/skeleton-walk512.png"),
        zombieWalking13: new bb.Image("assets/zombie-01-walking/skeleton-walk513.png"),
        zombieWalking14: new bb.Image("assets/zombie-01-walking/skeleton-walk514.png"),
        zombieWalking15: new bb.Image("assets/zombie-01-walking/skeleton-walk515.png"),
        zombieWalking16: new bb.Image("assets/zombie-01-walking/skeleton-walk516.png"),
        zombieWalking17: new bb.Image("assets/zombie-01-walking/skeleton-walk517.png"),
        zombieWalking18: new bb.Image("assets/zombie-01-walking/skeleton-walk518.png"),
        zombieWalking19: new bb.Image("assets/zombie-01-walking/skeleton-walk519.png"),
        zombieWalking20: new bb.Image("assets/zombie-01-walking/skeleton-walk520.png"),

        zombieDying1: new bb.Image("assets/zombie-01-dying/skeleton-dying0.png"),
        zombieDying2: new bb.Image("assets/zombie-01-dying/skeleton-dying1.png"),
        zombieDying3: new bb.Image("assets/zombie-01-dying/skeleton-dying2.png"),
        zombieDying4: new bb.Image("assets/zombie-01-dying/skeleton-dying3.png"),
        zombieDying5: new bb.Image("assets/zombie-01-dying/skeleton-dying4.png"),
        zombieDying6: new bb.Image("assets/zombie-01-dying/skeleton-dying5.png"),
        zombieDying7: new bb.Image("assets/zombie-01-dying/skeleton-dying6.png"),
        zombieDying8: new bb.Image("assets/zombie-01-dying/skeleton-dying7.png"),
        zombieDying9: new bb.Image("assets/zombie-01-dying/skeleton-dying8.png"),
        zombieDying10: new bb.Image("assets/zombie-01-dying/skeleton-dying9.png"),
        zombieDying11: new bb.Image("assets/zombie-01-dying/skeleton-dying100.png"),
        zombieDying12: new bb.Image("assets/zombie-01-dying/skeleton-dying101.png"),
        zombieDying13: new bb.Image("assets/zombie-01-dying/skeleton-dying102.png"),
        zombieDying14: new bb.Image("assets/zombie-01-dying/skeleton-dying103.png"),
        zombieDying15: new bb.Image("assets/zombie-01-dying/skeleton-dying104.png"),
        zombieDying16: new bb.Image("assets/zombie-01-dying/skeleton-dying105.png"),
        zombieDying17: new bb.Image("assets/zombie-01-dying/skeleton-dying106.png"),
        zombieDying18: new bb.Image("assets/zombie-01-dying/skeleton-dying107.png"),
        zombieDying19: new bb.Image("assets/zombie-01-dying/skeleton-dying108.png"),
        zombieDying20: new bb.Image("assets/zombie-01-dying/skeleton-dying109.png"),
        zombieDying21: new bb.Image("assets/zombie-01-dying/skeleton-dying200.png"),
        zombieDying22: new bb.Image("assets/zombie-01-dying/skeleton-dying201.png"),
        zombieDying23: new bb.Image("assets/zombie-01-dying/skeleton-dying202.png"),
        zombieDying24: new bb.Image("assets/zombie-01-dying/skeleton-dying203.png"),
        zombieDying25: new bb.Image("assets/zombie-01-dying/skeleton-dying204.png"),
        zombieDying26: new bb.Image("assets/zombie-01-dying/skeleton-dying205.png"),
        zombieDying27: new bb.Image("assets/zombie-01-dying/skeleton-dying206.png"),
        zombieDying28: new bb.Image("assets/zombie-01-dying/skeleton-dying207.png"),
        zombieDying29: new bb.Image("assets/zombie-01-dying/skeleton-dying208.png"),
        zombieDying30: new bb.Image("assets/zombie-01-dying/skeleton-dying209.png"),
        zombieDying31: new bb.Image("assets/zombie-01-dying/skeleton-dying300.png"),
        zombieDying32: new bb.Image("assets/zombie-01-dying/skeleton-dying301.png"),
        zombieDying33: new bb.Image("assets/zombie-01-dying/skeleton-dying302.png"),
        zombieDying34: new bb.Image("assets/zombie-01-dying/skeleton-dying303.png"),
        zombieDying35: new bb.Image("assets/zombie-01-dying/skeleton-dying304.png"),
        zombieDying36: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying37: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying38: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying39: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying40: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying41: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying42: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying43: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying44: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying45: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying46: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying47: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),
        zombieDying48: new bb.Image("assets/zombie-01-dying/skeleton-dying305.png"),

        bomb: new bb.Image("assets/bomb.png"),
        explosion: new bb.Image("assets/explosion.png"),
        littleGirl: new bb.Image("assets/human-01.png")
      };

      this.sounds = {
        zombieDying1: new bb.Sound("assets/sounds/dying1.wav"),
        zombieDying2: new bb.Sound("assets/sounds/dying2.wav"),
        zombieDying3: new bb.Sound("assets/sounds/dying3.wav"),
        zombieDying4: new bb.Sound("assets/sounds/dying4.wav"),
        zombieDying5: new bb.Sound("assets/sounds/dying5.wav"),
        zombieDying6: new bb.Sound("assets/sounds/dying6.wav"),
        zombieDying7: new bb.Sound("assets/sounds/dying7.wav")
      };

      for (var sprite in this.sprites) {
        this.loader.add(this.sprites[sprite]);
      }

      for (var sound in this.sounds) {
        this.loader.add(this.sounds[sound]);
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

      world.addSystem(new ExpirationSystem)
           .addSystem(new CountdownSystem)
           .addSystem(new ZombieSpawnSystem(world.screen))
           .addSystem(new WalkingSystem)
           .addSystem(new BoundingSystem(world.screen))
           .addSystem(new ClickSystem(this.views.ctx.canvas))
           .addSystem(new ZombieDieSystem)
           .addSystem(new AnimationSystem)
           .addSystem(new SoundSystem(this.sounds))
           .addSystem(new ScoreCountSystem(this.views.score))
           .addSystem(new HumanSystem)
           .addSystem(new RenderingSystem(this.views.ctx, this.sprites));

      this.pause();

      this.runner.onTick = function(deltaTime) {
        world.deltaTime = deltaTime;
        world.process();
        fpsMeter.tick();
      }

      var littleGirl = world.createEntity();

      littleGirl.image = {
        width: 106,
        height: 189
      }

      var width = world.screen.width / 2 - littleGirl.image.width / 2;
      var height = (50/768 * world.screen.height) - 30

      littleGirl.addComponent(new Human(10))
      littleGirl.addComponent(new Spatial(width, height, 106, 189));
      littleGirl.addComponent(new Renderable("littleGirl"));

      this.start();
    }
  });
})(window, bb);
