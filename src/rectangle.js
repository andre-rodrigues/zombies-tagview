(function(window, bb) {
  window.Rectangle = bb.Class.extend({
    init: function(left, top, width, height) {
      this.x = left;
      this.y = top;
      this.width = width;
      this.height = height;

      Object.defineProperty(this, "center", {
        get: function() {
          var halfWidth = this.width / 2,
              halfHeight = this.height / 2;

          return {
            x: this.left + halfWidth,
            y: this.top + halfHeight
          };
        },

        set: function(center) {
          this.x = center.x - this.width / 2;
          this.y = center.y - this.height / 2;
        }
      });

      Object.defineProperty(this, "left", {
        get: function() {
          return this.x;
        },

        set: function(left) {
          this.x = left;
        }
      });

      Object.defineProperty(this, "top", {
        get: function() {
          return this.y;
        },

        set: function(top) {
          this.y = top;
        }
      });

      Object.defineProperty(this, "right", {
        get: function() {
          return this.left + this.width;
        },

        set: function(right) {
          this.x = right - this.width;
        }
      });

      Object.defineProperty(this, "bottom", {
        get: function() {
          return this.top + this.height;
        },

        set: function(bottom) {
          this.y = bottom - this.height;
        }
      });
    },

    intersects: function(other) {
      return this.left <= other.right &&
             this.right >= other.left &&
             this.top <= other.bottom &&
             this.bottom >= other.top;
    },

    contains: function(other) {
      if (other instanceof Rect) {
        return this.left <= other.left &&
               this.right >= other.right &&
               this.top <= other.top &&
               this.bottom >= other.bottom;
      } else {
        // Point
        return this.left <= other.x &&
               this.right >= other.x &&
               this.top <= other.y &&
               this.bottom >= other.y;
      }
    },
  });
})(window, window.bb);
