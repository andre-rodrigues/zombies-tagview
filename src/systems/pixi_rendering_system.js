(function($, bb, PIXI) {
  "use strict";

  PIXI.RenderingSystem = bb.System.extend({
    init: function(ctx, images) {
      this.parent();

      this.stage = new PIXI.Stage;
      this.renderer = PIXI.autoDetectRenderer(ctx.canvas.width, ctx.canvas.height, null, true);

      $(ctx.canvas).replaceWith(this.renderer.view);

      this.sprites = {};

      this.textures = {};
      for (var name in images) {
        this.textures[name] = new PIXI.Texture(new PIXI.BaseTexture(images[name].data));
      }

      this.container = new PIXI.SpriteBatch;
      this.stage.addChild(this.container);
    },

    allowEntity: function(entity) {
      return entity.hasComponent("spatial") && entity.hasComponent("renderable");
    },

    onEntityAdd: function(entity) {
      var sprite = new PIXI.Sprite(this.textures[entity.renderable.name]);
      sprite.anchor.x = sprite.anchor.y = 0.5;

      this.container.addChild(sprite);

      this.sprites[entity.id] = sprite;
    },

    onEntityRemoval: function(entity) {
      this.stage.removeChild(this.sprites[entity.id]);
      delete this.sprites[entity.id];
    },

    process: function() {
      this.entities
          .toArray()
          .sort(function(entityA, entityB) {
            return entityA.spatial.y - entityB.spatial.y;
          })
          .forEach(this.render, this);

      this.renderer.render(this.stage);
    },

    render: function(entity, index) {
      var sprite = this.sprites[entity.id];

      this.container.addChildAt(sprite, index);

      sprite.setTexture(this.textures[entity.renderable.name]);

      sprite.position.x = entity.spatial.x;
      sprite.position.y = entity.spatial.y;

      if (entity.hasComponent("opacity")) {
        sprite.alpha = entity.opacity.level;
      }
    }
  });
})(window.jQuery, window.bb, window.PIXI);
