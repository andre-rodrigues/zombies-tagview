(function(window, bb) {
  "use strict";

  window.ExplosionSystem = bb.System.extend({
    targets: new bb.Set,
    explosions: new bb.Set,

    allowEntity: function(entity) {
      return this.isExplosion(entity) || this.isTarget(entity);
    },

    isTarget: function(entity) {
      return entity.hasComponent("spatial") &&
             entity.hasComponent("hittable") &&
             entity.hasComponent("life");
    },

    isExplosion: function(entity) {
      return entity.hasComponent("spatial") && entity.hasComponent("explosion");
    },

    onEntityAdd: function(entity) {
      if (this.isTarget(entity)) {
        this.targets.add(entity);
      } else {
        this.explosions.add(entity);
      }
    },

    onEntityRemoval: function(entity) {
      this.targets.remove(entity);
      this.explosions.remove(entity);
    },

    process: function() {
      function rectangleCircleCollision(rectangle, circle) {
        return circle.x + circle.radius > rectangle.left &&
               circle.x - circle.radius < rectangle.right &&
               circle.y + circle.radius > rectangle.top &&
               circle.y - circle.radius < rectangle.bottom;
      }

      this.explosions.forEach(function(explosion) {
        var circle = {
          x: explosion.spatial.center.x,
          y: explosion.spatial.center.y,
          radius: explosion.explosion.radius
        };

        this.targets.forEach(function(target) {
          if (rectangleCircleCollision(target.spatial, circle)) {
            target.life.takeDamage(explosion.explosion.damage);
          }
        });

        explosion.removeComponent("explosion");
      }, this);
    }
  });
})(window, window.bb);
