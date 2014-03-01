(function(window, bb) {
  "use strict";

  window.ZombieDieSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasTag("zombie") && entity.hasComponent("life");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        if (entity.hasComponent("clickable") && entity.clickable.isClicked) {
          entity.life.takeDamage(Infinity); // It is a killing blow for now
        }

        if (entity.life.isDead()) {
          if (entity.hasComponent("clickable")) entity.removeComponent("clickable");
          if (entity.hasComponent("walking")) entity.removeComponent("walking");
          if (entity.hasComponent("hittable")) entity.removeComponent("hittable");

          entity.removeComponent("life");

          entity.addComponent(new ZombieDying);
        }
      }, this);
    }
  });
})(window, bb);
