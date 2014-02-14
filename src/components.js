(function(window, bb) {
  "use strict";

  window.Spatial = bb.Component.extend({
    type: "spatial",

    init: function(x, y, width, height) {
      this.x = x || 0;
      this.y = y || 0;
      this.width = width || 20;
      this.height = height || 20;
    }
  });

  window.Renderable = bb.Component.extend({
    type: "renderable",

    init: function(name) {
      this.name = name;
    }
  });

  window.Animation = bb.Component.extend({
    type: "animation",

    init: function(sprites, time) {
      this.sprites = sprites;
      this.time = time;
    }
  });

  window.ZombieSpawning = bb.Component.extend({
    type: "zombieSpawning",

    init: function(time) {
      this.time = time;
    }
  });

  window.Walking = bb.Component.extend({
    type: "walking",

    init: function(angle, velocity) {
      this.angle = angle;
      this.velocity = velocity || Math.random() * 2 + 1;
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
})(window, bb);
