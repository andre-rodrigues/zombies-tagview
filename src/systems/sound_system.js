(function(window, bb) {
  "use strict";

  /**
   * A system that play sound components.
   * @class SoundSystem
   * @example
   *     var yell = world.createEntity();
   *     yell.addComponent(new bb.SoundComponent("yell"));
   *     world.addSystem(new SoundSystem({ yell: "song.ogg"}));
   */
  var SoundSystem = bb.System.extend({
    init: function(soundList) {
      this.parent();
      this.sounds = soundList;
      this.playing = {};
    },

    allowEntity: function(entity) {
      return entity.hasComponent("sound");
    },

    entityRemoved: function(entity) {
      var playing = this.playing[bb.objectId(entity)];
      if (playing) {
        if (playing.sound.loop && playing.sound.isPlaying) {
          playing.sound.stop();
        }

        delete this.playing[bb.objectId(entity)];
      }
    },

    notPlaying: function() {
      var notPlaying = [];

      this.entities.forEach(function(entity) {
        if (!this.playing[bb.objectId(entity)]) {
          notPlaying.push(entity);
        }
      }, this);

      return notPlaying;
    },

    process: function() {
      this.notPlaying().forEach(function(entity) {
        var soundConfig = entity.sound,
            sound = this.sounds[soundConfig.name];

        sound.volume = soundConfig.volume;
        sound.loop = soundConfig.loop;
        sound.play();

        this.playing[bb.objectId(entity)] = {
          sound: sound,
          entity: entity
        };

        if (soundConfig.removeOnEnd) {
          sound.data.addEventListener("ended", function onEnd() {
            entity.remove();
            sound.data.removeEventListener("ended", onEnd);
          });
        }
      }, this);
    },
  });

  window.SoundSystem = SoundSystem;
})(window, bb);
