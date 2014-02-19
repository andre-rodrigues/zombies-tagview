(function(window, bb) {
  "use strict";

  window.ZombieEscapingAlertSystem = bb.System.extend({
    init: function(alertArea) {
      this.parent();
      this.alertArea = alertArea;
    },

    allowEntity: function(entity) {
      return entity.hasTag("zombie") && entity.hasComponent("spatial");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        var spatial = entity.spatial;

        if (spatial.x + spatial.width / 2 < 0 ||
            spatial.x - spatial.width / 2 > this.alertArea.width ||
            spatial.y + spatial.height < 0 ||
            spatial.y > this.alertArea.height) {
          this.createAlert(entity.spatial);
        }
      }.bind(this));
    },

    createAlert: function(spatial) {
      var alert = this.world.createEntity();
      alert.addComponent(new Spatial(spatial.x, spatial.y, spatial.width, spatial.height));
      alert.addComponent(new Renderable("alertable"));
      alert.addComponent(new Blink(30, .3));
      alert.addComponent(new Alert("runningOut"));
      alert.addComponent(new Expire(2 * 1000));
    }
  });
})(window, bb);
