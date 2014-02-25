(function(window, bb){
  "use strict";

  var ZOMBIE_KILL_SCORE = 1;

  window.ScoreCountSystem = bb.System.extend({
    init: function(scoreView) {
      this.parent();
      this.scoreView = scoreView;
      this.scoreView.innerHTML = 0;
      this.deadZombies = new bb.Set;
      this.score = 0;
    },

    allowEntity: function(entity) {
      return entity.hasTag("zombie");
    },

    onEntityChange: function(entity) {
      if (entity.hasComponent("zombieDying") && !this.deadZombies.contains(entity)) {
        this.deadZombies.add(entity);
        this.score += ZOMBIE_KILL_SCORE;
      }
    },

    onEntityRemoval: function(entity) {
      this.deadZombies.remove(entity);
    },

    process: function() {
      // We are doing this to have a animation effect of the increasing score
      var currentScoreView = parseInt(this.scoreView.innerHTML, 10);
      if (currentScoreView < this.score) {
        this.scoreView.innerHTML = currentScoreView + 1;
      }
    }
  });
})(window, bb);
