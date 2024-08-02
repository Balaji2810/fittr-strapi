'use strict';

/**
 * consumer-protection service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::consumer-protection.consumer-protection');
