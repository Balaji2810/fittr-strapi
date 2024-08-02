'use strict';

/**
 * ring-size service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ring-size.ring-size');
