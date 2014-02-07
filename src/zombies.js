var Spatial = bb.Component.extend({
  type: "spatial",

  init: function(x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 20;
    this.height = height || 20;
  },

  getVector: function() {
    return new bb.Vector(this.x, this.y);
  }
});

var Renderable = bb.Component.extend({
  type: "renderable",

  init: function(name) {
    this.name = name;
  }
});

var Animation = bb.Component.extend({
  type: "animation",

  init: function(sprites, time) {
    this.sprites = sprites;
    this.time = time;
  }
});

var ZombieSpawning = bb.Component.extend({
  type: "zombieSpawning",

  init: function(time) {
    this.time = time;
  }
});

var Walking = bb.Component.extend({
  type: "walking",

  init: function(angle, velocity) {
    this.angle = angle;
    this.velocity = velocity || Math.random() * 3 + 1;
  }
});

var BoundaryRemovable = bb.Component.extend({
  type: "boundaryRemovable"
});

var ZombieSpawnSystem = bb.System.extend({
  init: function(area) {
    this.parent();
    this.area = area;
  },

  allowEntity: function(entity) {
    return entity.hasComponent("zombieSpawning");
  },

  process: function() {
    this.entities.forEach(function(entity) {
      entity.zombieSpawning.time -= 1;

      if (entity.zombieSpawning.time == 0) {
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
    });

    if (Math.random() < 0.05) {
      var zombie = this.world.createEntity();

      var x = this.area.width * Math.random(),
          y = this.area.height * Math.random();

      zombie.addComponent(new Spatial(x, y, 60, 120));
      zombie.addComponent(new Renderable("zombieSpawning"));
      zombie.addComponent(new ZombieSpawning(50));

      zombie.addComponent(new Animation([
        "zombieSpawning01",
        "zombieSpawning02",
        "zombieSpawning03",
        "zombieSpawning04",
        "zombieSpawning05"
      ], 10));
    }
  }
});

var WalkingSystem = bb.System.extend({
  allowEntity: function(entity) {
    return entity.hasComponent("walking");
  },

  process: function() {
    this.entities.forEach(function(entity) {
      var velocity = entity.walking.velocity;
      entity.spatial.x += Math.cos(entity.walking.angle) * velocity;
      entity.spatial.y += Math.sin(entity.walking.angle) * velocity;
    });
  }
});

var BoundingSystem = bb.System.extend({
  init: function(area) {
    this.parent();
    this.area = area;
  },

  allowEntity: function(entity) {
    return entity.hasComponent("boundaryRemovable") && entity.hasComponent("spatial");
  },

  process: function() {
    this.entities.forEach(function(entity) {
      var spatial = entity.spatial;

      if (spatial.x + spatial.width / 2 < 0 ||
          spatial.x - spatial.width / 2 > this.area.width ||
          spatial.y + spatial.height < 0 ||
          spatial.y - spatial.height > this.area.height) {
        this.world.removeEntity(entity);
      }
    }.bind(this));
  }
});

var AnimationSystem = bb.System.extend({
  allowEntity: function(entity) {
    return entity.hasComponent("animation") && entity.hasComponent("renderable");
  },

  process: function() {
    this.entities.forEach(function(entity) {
      var animation = entity.animation;
      animation.currentTime += 1;

      console.log(animation.currentTime);

      if (animation.currentTime == animation.time) {
        var nextFrame = animation.sprites.indexOf(entity.renderable.name) + 1;
        if (nextFrame == animation.sprites.length) nextFrame = 0;
        entity.renderable.name = animation.sprites[nextFrame];
        animation.currentTime = 0;
      }
    }.bind(this));
  },

  onEntityAdd: function(entity) {
    entity.animation.currentTime = 0;
    entity.renderable.name = entity.animation.sprites[0];
  }
});

var RenderingSystem = bb.System.extend({
  init: function(ctx, sprites) {
    this.parent();
    this.ctx = ctx;
    this.sprites = sprites;
  },

  allowEntity: function(entity) {
    return entity.hasComponent("spatial") && entity.hasComponent("renderable");
  },

  process: function() {
    this.clear();
    this.entities.toArray().sort(function(entityA, entityB) {
      return entityA.spatial.y > entityB.spatial.y;
    }).forEach(this.render.bind(this));
  },

  clear: function() {
    this.ctx.save();
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.restore();
  },

  render: function(entity) {
    this.ctx.save();
    this.ctx.translate(entity.spatial.x - entity.spatial.width / 2, entity.spatial.y)
    this.ctx.drawImage(this.sprites[entity.renderable.name].data, 0, 0);
    this.ctx.restore();
  }
});

var Game = bb.Class.extend({
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
         .addSystem(new RenderingSystem(this.ctx, this.sprites));

    this.pause();
    this.runner.onTick = world.process.bind(world);
    this.start();
  }
});
