(function(window, bb) {
  "use strict";

  // NOTE: Keep the components in alphabetical order

  window.Alert = bb.Component.extend({
    type: "alertable",

    init: function(time, action) {
      this.time = time;
      this.action = action;
    }
  });

  window.Animation = bb.Component.extend({
    type: "animation",

    init: function(sprites, time) {
      this.sprites = sprites;
      this.time = time;
      this.numberOfIterations = 0;

      Object.defineProperty(this, "totalTime", {
        get: function() {
          return this.time * this.sprites.length;
        }.bind(this)
      });
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

  window.Zombie = bb.Component.extend({
    type: "zombie"
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
