'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/3.0.0-beta.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
  '*/1 * * * *': async () => {
    // fetch posts to publish
    const draftPostToPublish = await strapi.api.post.services.post.find({
      status: 'draft',
      publish_at_lt: new Date()
    });

    // update status of posts
    draftPostToPublish.forEach(async (post) => {
      await strapi.api.post.services.post.update(
        {id: post.id},
        {status: 'published'}
      );
    });
  },
};

