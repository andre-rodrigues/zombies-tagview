(function(window, bb) {
  "use strict";

  window.RenderingSystem = bb.System.extend({
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
        return entityA.spatial.y - entityB.spatial.y;
      }).forEach(this.render.bind(this));
    },

    clear: function() {
      this.ctx.save();
      this.ctx.fillStyle = "#000";
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.restore();
    },

    render: function(entity) {
      var x = entity.spatial.x,
          y = entity.spatial.y,
          width = entity.spatial.width,
          height = entity.spatial.height,
          image = this.sprites[entity.renderable.name].data;

      this.ctx.save();
      this.ctx.translate(x, y);

      if (entity.hasComponent("walking") && Math.cos(entity.walking.angle) > 0) {
        this.ctx.scale(-1, 1);
      }

      this.ctx.drawImage(image, -width / 2, 0);
      this.ctx.restore();
    }
  });
})(window, bb);
