(function(window, bb){
  "use strict";
  
  window.ScoreCountSystem = bb.System.extend({
    init: function (scoreView) {
      this.parent();
      this.scoreEntity = null;
      this.scoreView = scoreView
    },

    allowEntity: function(entity) {
      return entity.hasComponent("clickable") &&  entity.hasComponent("zombie");
    },

    process: function(){
      if (this.scoreEntity === null) {
        this.scoreEntity = this.world.createEntity();
        this.scoreEntity.addComponent(new Score());
      }

      this.entities.forEach(function(entity){
        if (entity.clickable.isClicked) {
          this.scoreEntity.score.count++;
        }
      });

      this.scoreView.innerHTML = this.scoreEntity.score.count;
    }
  });
})(window, bb);