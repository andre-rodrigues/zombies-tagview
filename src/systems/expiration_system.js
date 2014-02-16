(function(window, bb) {
  "use strict";

  window.ExpirationSystem = window.TimeSystem.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("expire");
    },

    process: function() {
      this.parent();

      this.entities.forEach(function(entity) {
        entity.expire.lifetime -= this.deltaTime;

        if (entity.expire.isExpired()) {
          this.world.removeEntity(entity);
        }
      }.bind(this));
    }
  });
})(window, window.bb);
