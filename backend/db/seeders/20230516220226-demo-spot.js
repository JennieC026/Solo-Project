'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options,[
      {
        ownerId:1,
        address:'123 Disney Lane',
        city:"San Francisco",
        state:"California",
        country:"United States of America",
        lat:37.7645358,
        lng:-122.4730327,
        name:"Golden Gate Bridge",
        description:"Place where web developers are created",
        price:123,//1
      },
      {
        ownerId:1,
        address:'999 Delicious Restaurant Blvd',
        city:"Los Angeles",
        state:"California",
        country:"United States of America",
        lat:34.137651,
        lng:-118.164625,
        name:"Good Good Restaurant",
        description:"The best restaurant in the world",
        price:50,//2
      },
      {
        ownerId:2,
        address:'122 Some Blvd',
        city:"Seattle",
        state:"Washington",
        country:"United States of America",
        lat:44.999509,
        lng:-122.024539,
        name:"Sea view House",
        description:"luxurious home with spectacular ocean views",
        price:999,//3
      },
      {
        ownerId:2,
        address:'122 Some Blvd',
        city:"New York",
        state:"New York",
        country:"United States of America",
        lat:44.999509,
        lng:-122.024539,
        name:"City View Hotel",
        description:"nice hotel in the downtown of New York, really pretty space",
        price:999,//4
      },
      {
        ownerId:2,
        address:'122 Bear Blvd',
        city:"New York",
        state:"New York",
        country:"United States of America",
        lat:44.999509,
        lng:-122.024539,
        name:"Bear Hotel",
        description:"nice place for a bear to stay",
        price:996,//5
      },
      {
        ownerId:1,
        address:'456 Mountain Ave',
        city:"Denver",
        state:"Colorado",
        country:"United States of America",
        lat:39.739236,
        lng:-104.990252,
        name:"Mountain Retreat",
        description:"Quiet mountain retreat perfect for nature lovers",
        price:200,//6
      },
      {
        ownerId:1,
        address:'789 Beach St',
        city:"Miami",
        state:"Florida",
        country:"United States of America",
        lat:25.761680,
        lng:-80.191790,
        name:"Sunny Beach House",
        description:"Beachfront house with stunning ocean views",
        price:300,//7
      },
      {
        ownerId:2,
        address:'123 River Rd',
        city:"Chicago",
        state:"Illinois",
        country:"United States of America",
        lat:41.878113,
        lng:-87.629799,
        name:"River House",
        description:"Spacious house with beautiful river views",
        price:250,
      },
      {
        ownerId:3,
        address:'456 Park Ave',
        city:"Boston",
        state:"Massachusetts",
        country:"United States of America",
        lat:42.360082,
        lng:-71.058880,
        name:"Park View Apartment",
        description:"Modern apartment overlooking a lovely park",
        price:220,
      },
      {
        ownerId:1,
        address:'789 Ocean Blvd',
        city:"San Diego",
        state:"California",
        country:"United States of America",
        lat:32.715736,
        lng:-117.161087,
        name:"Oceanfront Villa",
        description:"Luxury villa with direct access to the beach",
        price:400,
      },
      {
        ownerId:2,
        address:'123 Broadway',
        city:"New Orleans",
        state:"Louisiana",
        country:"United States of America",
        lat:29.951065,
        lng:-90.071533,
        name:"Broadway Suite",
        description:"Cozy suite in the heart of the city",
        price:150,
      },
      {
        ownerId:1,
        address:'456 Island Rd',
        city:"Honolulu",
        state:"Hawaii",
        country:"United States of America",
        lat:21.306944,
        lng:-157.858337,
        name:"Island Retreat",
        description:"Tropical retreat on a stunning island",
        price:350,
      },
      {
        ownerId:3,
        address:'789 Forest Ave',
        city:"Portland",
        state:"Oregon",
        country:"United States of America",
        lat:45.512231,
        lng:-122.658719,
        name:"Forest Cabin",
        description:"Secluded cabin surrounded by lush forest",
        price:180,
      },
      {
        ownerId:1,
        address:'123 Main St',
        city:"Dallas",
        state:"Texas",
        country:"United States of America",
        lat:32.776664,
        lng:-96.796988,
        name:"Downtown Loft",
        description:"Stylish loft in the city center",
        price:200,
      },
      {
        ownerId:1,
        address:'456 Lake Dr',
        city:"Minneapolis",
        state:"Minnesota",
        country:"United States of America",
        lat:44.977753,
        lng:-93.265011,
        name:"Lakeside House",
        description:"Peaceful house with stunning lake views",
        price:250,
      },
      {
        ownerId:1,
        address:'789 Hill St',
        city:"San Francisco",
        state:"California",
        country:"United States of America",
        lat:37.774929,
        lng:-122.419418,
        name:"Hilltop Studio",
        description:"Cozy studio with breathtaking city views",
        price:230,
      },
      {
        ownerId:1,
        address:'123 Desert Rd',
        city:"Phoenix",
        state:"Arizona",
        country:"United States of America",
        lat:33.448376,
        lng:-112.074036,
        name:"Desert Oasis",
        description:"Relaxing oasis in the heart of the desert",
        price:220,
      }
     
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options,{
      name:{[Op.in]:[
        'Golden Gate Bridge',
      'Good Good Restaurant',
      'Sea view House',
      'City View Hotel',
      'Bear Hotel',
      'Mountain Retreat',
      'Sunny Beach House',
      'River House',
      'Park View Apartment',
      'Oceanfront Villa',
      'Broadway Suite',
      'Island Retreat',
      'Forest Cabin',
      'Downtown Loft',
      'Lakeside House',
      'Hilltop Studio',
      'Desert Oasis'
    ]},
      
    },{})
  }
};
