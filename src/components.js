(function(window, bb) {
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

  window.BoundaryRemovable = bb.Component.extend({
    type: "boundaryRemovable"
  });

  window.Clickable = bb.Component.extend({
    type: "clickable",

    init: function() {
      this.isClicked = false;
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

  window.Opacity = bb.Component.extend({
    type: "opacity",

    init: function(level) {
      this.level = level || 1;
    }
  });

  window.Renderable = bb.Component.extend({
    type: "renderable",

    init: function(name) {
      this.name = name;
    }
  });

  window.Spatial = bb.Component.extend({
    type: "spatial",

    init: function(x, y, width, height) {
      this.x = x || 0;
      this.y = y || 0;
      this.width = width || 20;
      this.height = height || 20;
    },

    containsPoint: function(x, y) {
      var halfWidth = this.width / 2;

      return x <= this.x + halfWidth &&
             x >= this.x - halfWidth &&
             y <= this.y + this.height &&
             y >= this.y;
    }
  });

  window.Walking = bb.Component.extend({
    type: "walking",

    init: function(angle, velocity) {
      this.angle = angle;
      this.velocity = velocity || Math.random() * 20 + 20;
    }
  });

  window.ZombieDying = bb.Component.extend({
    type: "zombieDying"
  });

  window.ZombieSpawning = bb.Component.extend({
    type: "zombieSpawning",

    init: function(time) {
      this.time = time;
    }
  });
})(window, bb);
