(function(window, bb) {
  "use strict";

  window.CountdownSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("countdown");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        entity.countdown.tick(this.world.deltaTime);
      }.bind(this));
    }
  });
})(window, bb);
