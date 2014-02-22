(function(window, bb) {
  "use strict";

  window.Wave = bb.Class.extend({
    /** @class Wave
     * @constructor
     * @param {Integer} duration with how long the wave must endure
     * @param {Object} zombies
     *    key holding the zombie type and value {Integer} how many of them
     * @param {Object} weights by zombie type
     *    key holding the zombie type and value {Integer} weight (min 1, max 10)
     */
    init: function(duration, zombies, weights) {
      this.zombies = zombies;
      this.duration = duration;
      this.time = this.duration;
      this.isFinished = false;

      this.weights = weights || {
        zombie1: 6,
        zombie2: 4,
        zombie3: 2
      };

      this.buildWeigthedZombies();
    },

    /**
     * Spawn zombies when time is right
     * @method spawn
     * @param {Integer} deltaTime expressing how long has passed since last iteration
     * @param {Function} callback to call when a zombie must be spawned
     *    @param {String} zombieType the type of zombie to spawn
     */
    spawn: function(deltaTime, callback) {
      this.time -= deltaTime;

      if (this.time <= 0) {
        this.isFinished = true;
        return;
      }

      var zombieType;
      if (Math.random() < 0.05) {
        zombieType = this.spawnZombieByWeight();
        return callback(zombieType);
      }
    },

    spawnZombieByWeight: function() {
      return this.weightedZombies.sample();
    },

    /**
       * Creates an array with weighted zombie types
       * @return {Array} weightedZombies
       *    eg. weighted = { zombie1: 2, zombie2: 1 } => ["zombie1", "zombie1", "zombie2"]
       */
    buildWeigthedZombies: function() {
      var types = [];
      var allowedTypes = Object.keys(this.zombies).intersect(Object.keys(this.weights));

      allowedTypes.forEach(function(type) {
        this.weights[type].times(function() {
          types.push(type);
        });
      }, this);

      this.weightedZombies = types;
    }
  });

  window.ZombieSpawnSystem = bb.System.extend({
    init: function(area, waves) {
      this.parent();
      this.area = area;
      this.waves = waves;

      this.currentWave = this.waves[0];
    },

    allowEntity: function(entity) {
      return entity.hasComponent("zombieSpawning") && entity.hasComponent("spatial");
    },

    process: function() {
      this.entities.forEach(function(entity) {
        if (entity.spatial.intersects(this.world.screen.left)) {
          entity.removeComponent("zombieSpawning");
          entity.addComponent(new Life(10));
          entity.addComponent(new Clickable);
          entity.addComponent(new BoundaryRemovable);
        }
      }, this);

      this.currentWave.spawn(this.world.deltaTime, this.spawnZombieByType.bind(this));

      if (this.currentWave.isFinished) {
        // Next wave
        var newWaveIndex = this.waves.indexOf(this.currentWave) + 1;
        if (newWaveIndex < this.waves.length) {
          this.currentWave = this.waves[newWaveIndex];
        } else {
          console.log("LOL game is over, bitch!");
        }
      }
    },

    spawnZombieByType: function(type) {
      var zombie = this.world.createEntity().tag("zombie"),
          width = 100,
          height = 220,
          x = - width,
          y = (this.area.height - height) * Math.random();

      zombie.addComponent(new Spatial(x, y, width, height));
      zombie.addComponent(new Walking);
      zombie.addComponent(new ZombieSpawning);
      zombie.addComponent(new Renderable);
      zombie.addComponent(new Animation([
        "zombieWalking01",
        "zombieWalking02",
        "zombieWalking03",
        "zombieWalking04",
        "zombieWalking05",
        "zombieWalking06",
        "zombieWalking07",
        "zombieWalking08",
        "zombieWalking09",
        "zombieWalking10",
        "zombieWalking11",
        "zombieWalking12",
        "zombieWalking13",
        "zombieWalking14",
        "zombieWalking15",
        "zombieWalking16",
        "zombieWalking17",
        "zombieWalking18",
        "zombieWalking19",
        "zombieWalking20"
      ], 50));
    }
  });
})(window, bb);
