(function(window, bb, Rectangle) {
  "use strict";

  // NOTE: Keep the components in alphabetical order

  window.Alert = bb.Component.extend({
    type: "alertable",

    init: function(action) {
      this.action = action;
    },

    isRunningOut: function() {
      return this.action == "runningOut";
    }
  });

  window.Animation = bb.Component.extend({
    type: "animation",
    repeat: Infinity,

    init: function(sprites, frameTime) {
      sprites = sprites;

      this.frameTime = frameTime;
      this.elapsedTime = 0;

      Object.defineProperty(this, "totalTime", {
        get: function() {
          return this.frameTime * this.sprites.length;
        }.bind(this)
      });

      Object.defineProperty(this, "sprites", {
        get: function() {
          return sprites;
        },

        set: function(newSprites) {
          sprites = newSprites;
          this.elapsedTime = 0;
        }.bind(this)
      });

      Object.defineProperty(this, "cycles", {
        get: function() {
          return Math.floor(this.elapsedTime / this.totalTime);
        }.bind(this)
      });

      Object.defineProperty(this, "currentFrame", {
        get: function() {
          if (this.isStopped()) {
            return this.sprites.length - 1;
          } else {
            return Math.floor((this.elapsedTime / this.frameTime) % this.sprites.length);
          }
        }.bind(this)
      });

      Object.defineProperty(this, "currentSprite", {
        get: function() {
          return this.sprites[this.currentFrame];
        }.bind(this)
      });
    },

    isStopped: function() {
      return this.cycles > this.repeat;
    }
  });

  window.Blink = bb.Component.extend({
    type: "blink",

    init: function(rate, level) {
      this.rate = rate || 100;
      this.level = level || 0;
      this.elapsedTime = 0;
    },

    isOff: function() {
      return Math.floor((this.elapsedTime / this.rate) % 2) == 0;
    }
  });

  window.Bomb = bb.Component.extend({
    type: "bomb",

    init: function(radius, damage) {
      this.radius = radius;
      this.damage = damage || Infinity;
    }
  });

  window.BoundaryRemovable = bb.Component.extend({
    type: "boundaryRemovable"
  });

  window.Clickable = bb.Component.extend({
    type: "clickable",

    init: function() {
      this.isClicked = false;
    }
  });

  window.Countdown = bb.Class.extend({
    type: "countdown",

    init: function(time) {
      if (time == null || time < 0)
        throw "You must inform a positive time to the Countdown component";
      this.time = time;
      this.elapsetTime = 0;
    },

    tick: function(time) {
      this.elapsetTime += time;
    },

    isOver: function() {
      return this.elapsetTime >= this.time;
    }
  });

  window.Expire = bb.Component.extend({
    type: "expire",

    init: function(lifetime) {
      this.lifetime = lifetime;
    },

    isExpired: function() {
      return this.lifetime <= 0;
    }
  });

  window.Explosion = bb.Component.extend({
    type: "explosion",

    init: function(radius, damage) {
      this.radius = radius;
      this.damage = damage;
    }
  });

  window.Hittable = bb.Component.extend({
    type: "hittable"
  });

  window.Opacity = bb.Component.extend({
    type: "opacity",

    init: function(level) {
      this.level = level || 1;
    }
  });

  window.Life = bb.Component.extend({
    type: "life",

    init: function(health) {
      this.health = health;
    },

    takeDamage: function(damage) {
      this.health -= damage;
    },

    isAlive: function() {
      return this.health > 0;
    },

    isDead: function() {
      return !this.isAlive();
    }
  });

  window.Renderable = bb.Component.extend({
    type: "renderable",

    init: function(name) {
      if (!name) throw "You must specify the name of the image to be rendered";
      this.name = name;
    }
  });

  window.Spatial = Rectangle.extend({
    type: "spatial"
  });

  window.Walking = bb.Component.extend({
    type: "walking",

    init: function(angle, velocity) {
      this.angle = angle || 0;
      this.velocity = velocity || Math.random() * 20 + 20;
    }
  });

  window.ZombieDying = bb.Component.extend({
    type: "zombieDying"
  });

  window.ZombieSpawning = bb.Component.extend({
    type: "zombieSpawning"
  });

})(window, bb, window.Rectangle);
