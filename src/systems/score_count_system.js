(function(window, bb){
  "use strict";

  window.ScoreCountSystem = bb.System.extend({
    init: function (scoreView) {
      this.parent();
      this.scoreEntity = null;
      this.scoreView = scoreView
    },

    allowEntity: function(entity) {
      return entity.hasComponent("zombie");
    },

    entityChanged: function(entity) {
      if (entity.hasComponent("zombieDying") && !entity.zombie.scoreProcessed) {
        this.scoreEntity.score.pendingCount += 20;
        entity.zombie.scoreProcessed = true;
      }
    },

    process: function(){
      if (this.scoreEntity === null) {
        this.scoreEntity = this.world.createEntity();
        this.scoreEntity.addComponent(new Score());
      }

      if (this.scoreEntity.score.pendingCount > 0) {
        this.scoreEntity.score.pendingCount--;
        this.scoreEntity.score.count++;
      }
      this.scoreView.innerHTML = this.scoreEntity.score.count;
    }
  });
})(window, bb);
