'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

// const Sequelize = require('sequelize');
// const axios = require('axios')

// const sequelize = new Sequelize('newmagazine', 'root', '123', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

module.exports = {
  // findInfo: async ctx => {
  //   const res = await sequelize.query(
  //     `SELECT a.title, a.description, a.id
  //     FROM images a, upload_file_morph b, upload_file c
  //     WHERE a.id = b.related_id
  //     AND b.upload_file_id = c.id
  //     AND c.hash = "${ctx.params.id}"`, 
  //   { type: sequelize.QueryTypes.SELECT})
  //     ctx.send(res);
  // },
  // getImageInfo: async ctx =>{
  //   const images = await axios({
  //     method: "get",
  //     url:`https://storage.googleapis.com/storage/v1/b/${strapi.config.BUCKET_NAME}/o`,
  //     headers:{
  //       Authorization:`Bearer ${strapi.config.BEARER}`
  //     }
  //   })
  //   if(images.data){
  //     ctx.send(images.data)
  //   }
  // }
};

