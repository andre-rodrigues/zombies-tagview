(function(window, bb) {
  "use strict";

  window.TimeBombSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("spatial") &&
             entity.hasComponent("bomb") &&
             entity.hasComponent("countdown");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        if (entity.countdown.isOver()) {
          entity.addComponent(new Collidable);
          entity.addComponent(new Explosion(entity.bomb.radius, entity.bomb.damage));
          entity.addComponent(new Renderable("explosion"));
          entity.addComponent(new Expire(1 * 1000));
          entity.removeComponent("bomb");
          entity.removeComponent("countdown");
        }
      }, this);

      // TODO: Remove this when we implement the drag/drop bomb
      if (Math.random() < 0.01) {
        var width = 126,
            height = 124,
            x = (this.world.screen.width - width) * Math.random(),
            y = (this.world.screen.height - height) * Math.random();

        var bomb = this.world.createEntity();
        bomb.addComponent(new Bomb(100));
        bomb.addComponent(new Spatial(x, y, width, height));
        bomb.addComponent(new Countdown(3 * 1000));
        bomb.addComponent(new Renderable("bomb"));
      }
    }
  });
})(window, window.bb);
