(function(window, bb) {
  "use strict";

  window.AlertSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("alertable");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        entity.alertable.time -= 1;

        if (entity.alertable.time == 0) {
          this.world.removeEntity(entity);
        }
      }.bind(this));
    }
  });
})(window, bb);