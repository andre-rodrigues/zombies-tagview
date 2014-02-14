(function(window, bb) {
  "use strict";

  window.TimeSystem = bb.System.extend({
    init: function() {
      this.parent();
      this.lastFrameTime = new Date();
    },

    process: function() {
      this.deltaTime = new Date() - this.lastFrameTime;
      this.lastFrameTime = new Date();
    }
  });
})(window, bb);