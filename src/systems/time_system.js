(function(window, bb) {
  "use strict";

  window.TimeSystem = bb.System.extend({
    init: function() {
      this.parent();
      this.lastFrameTime = new Date();
      this.elapsedTime = 0;
    },

    process: function() {
      this.deltaTime = new Date() - this.lastFrameTime;
      this.elapsedTime = this.elapsedTime + this.deltaTime;
      this.lastFrameTime = new Date();
    }
  });
})(window, bb);