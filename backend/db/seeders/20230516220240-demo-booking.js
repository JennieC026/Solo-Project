'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options,[
     {
      spotId:1,
      userId:2,
      startDate:new Date('2023-11-11'),
      endDate:new Date('2023-11-20'),
     },
     {
      spotId:2,
      userId:3,
      startDate:new Date('2023-9-15'),
      endDate:new Date('2023-9-16'),
     },
     {
      spotId:3,
      userId:3,
      startDate:new Date('2023-8-15'),
      endDate:new Date('2023-8-17'),
     },

    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      spotId:{[Op.in]:[1,2,3]},
      
    },{})
  }
};
