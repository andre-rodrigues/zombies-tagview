(function(window, bb) {
  "use strict";

  var radius = 200;

  window.HumanDamageAreaSystem = bb.System.extend({
    allowEntity: function(entity) {
      return entity.hasComponent("damage") && entity.hasComponent("walking");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        var xd = Math.abs(this.endPoint.x - entity.spatial.x);
        var yd = Math.abs(this.endPoint.y - entity.spatial.y);
        
        // Distance between two points
        var distance = Math.sqrt(Math.pow(xd, 2) + Math.pow(yd, 2));

        if (distance < radius) {
          if (entity.hasComponent("walking")) {
            entity.removeComponent("walking");
          }
        }
      }, this);
    }
  });
})(window, bb);