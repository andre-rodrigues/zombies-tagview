(function(window, bb) {
  "use strict";

  window.ExpirationSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("expire");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        entity.expire.lifetime -= this.world.deltaTime;

        if (entity.expire.isExpired()) {
          this.world.removeEntity(entity);
        }
      }.bind(this));
    }
  });
})(window, window.bb);
