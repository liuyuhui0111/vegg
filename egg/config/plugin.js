'use strict';

/** @type Egg.EggPlugin */

module.exports = {
  // had enabled by egg
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  validate: {
  	enable: true,
  	package: 'egg-validate',
  }
};
