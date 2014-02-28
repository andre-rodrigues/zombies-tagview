(function(window, bb) {
  "use strict";

  window.HumanSystem = bb.System.extend({
    init: function(life) {
      this.parent();
      this.life = life;
    },

    allowEntity: function(entity) {
      return entity.hasComponent("human");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        // console.log(entity.spatial.x + " - " + entity.spatial.y);
      });
    }
  });
})(window, bb);