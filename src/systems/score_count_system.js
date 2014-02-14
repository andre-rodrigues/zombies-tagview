(function(window, bb){
  "use strict";
  
  window.ScoreCountSystem = bb.System.extend({
    init: function () {
      this.parent();
      this.score = null;
    },

    allowEntity: function(entity) {
      return entity.hasComponent("clickable") &&  entity.hasComponent("zombie");
    },

    process: function(){
      if (this.score === null) {
        this.score = this.world.createEntity();
        this.score.addComponent(new Score());
        
      }
    }
  });
})(window, bb);