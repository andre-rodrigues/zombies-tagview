(function(bb) {
  bb.Set.reopen({
    map: function(callback, scope) {
      scope = scope || this;

      var results = [];
      for (var key in this.data) {
        results.push(callback.call(scope, this.data[key]));
      }

      return results;
    },

    filter: function(callback, scope) {
      scope = scope || this;

      var results = [];
      for (var key in this.data) {
        var data = this.data[key];

        if (callback.call(scope, data)) {
          results.push(data);
        }
      }

      return results;
    }
  });
})(window.bb);
