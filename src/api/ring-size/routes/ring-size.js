'use strict';

/**
 * ring-size router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::ring-size.ring-size');
