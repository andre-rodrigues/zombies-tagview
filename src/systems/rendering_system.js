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

      var renderArea = this.world.screen;

      this.entities
          .toArray()
          .filter(function(entity) {
            return renderArea.intersects(entity.spatial);
          })
          .sort(function(entityA, entityB) {
            return entityA.spatial.y - entityB.spatial.y;
          })
          .forEach(this.render, this);
    },

    clear: function() {
      this.ctx.save();
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.restore();
    },

    render: function(entity) {
      var image = this.sprites[entity.renderable.name].data,
          spatial = entity.spatial;

      this.ctx.save();
      this.ctx.translate(spatial.center.x, spatial.y);

      if (entity.hasComponent("walking") && Math.cos(entity.walking.angle) < 0) {
        this.ctx.scale(-1, 1);
      }

      // TODO: this should not belong here
      if (entity.hasComponent("alertable") && entity.alertable.isRunningOut()) {

        if (spatial.x + spatial.width / 2 < 0) {
          spatial.x += 60;
        } else if (spatial.x - spatial.width / 2 > this.ctx.canvas.width) {
          spatial.x -= 100;
        }

        if (spatial.y + spatial.height < 0) {
          spatial.y += 120;
        } else if (spatial.y > this.ctx.canvas.height) {
          spatial.y -= 30;
        }
      }

      if (entity.hasComponent("opacity")) {
        this.ctx.globalAlpha = entity.opacity.level;
      }

      this.ctx.drawImage(image, -spatial.width / 2, 0);
      this.ctx.restore();
    }
  });
})(window, bb);
