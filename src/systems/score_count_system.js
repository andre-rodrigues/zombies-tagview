(function(window, bb){
  "use strict";

  var ZOMBIE_KILL_SCORE = 20;

  window.ScoreCountSystem = bb.System.extend({
    init: function (scoreView) {
      this.parent();
      this.scoreEntity = null;
      this.scoreView = scoreView;
      this.deadZombies = new bb.Set;
    },

    allowEntity: function(entity) {
      return entity.hasComponent("zombie");
    },

    entityChanged: function(entity) {
      if (entity.hasComponent("zombieDying") && !this.deadZombies.contains(entity)) {
        this.deadZombies.add(entity);
        this.scoreEntity.score.pendingCount += ZOMBIE_KILL_SCORE;
      }
    },

    entityRemoved: function(entity) {
      this.deadZombies.remove(entity);
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
