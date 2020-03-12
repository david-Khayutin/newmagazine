'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { sanitizeEntity } = require('strapi-utils');

const Sequelize = require('sequelize');
const axios = require('axios')

const sequelize = new Sequelize('newmagazine', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql'
});
module.exports = {
    // this will limit the posts being returned to the front end to be published only 
    async find(ctx) {
        let entities;
    
        ctx.query = {
          ...ctx.query,
          status: 'published'
        };
    
        if (ctx.query._q) {
          entities = await strapi.services.post.search(ctx.query);
        } else {
          entities = await strapi.services.post.find(ctx.query);
        }
    
        return entities.map(entity =>
          sanitizeEntity(entity, { model: strapi.models.post })
        );
    },
    async findImageInformation(ctx){
        const res = await sequelize.query(
          `SELECT a.title, a.description, a.id
          FROM images a, upload_file_morph b, upload_file c
          WHERE a.id = b.related_id
          AND b.upload_file_id = c.id
          AND c.hash = "${ctx.params.id}"`, 
        { type: sequelize.QueryTypes.SELECT})
          ctx.send(res);
      },
      async getImageFromGoogle(ctx){
        const images = await axios({
          method: "get",
          url:`https://storage.googleapis.com/storage/v1/b/${strapi.config.BUCKET_NAME}/o`,
          headers:{
            Authorization:`Bearer ${strapi.config.BEARER}`
          }
        })
        if(images.data){
          ctx.send(images.data)
        }
      }
};
