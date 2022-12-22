'use strict';

const { USERS_TABLE } = require('../models/user.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(USERS_TABLE, [
      {
        username: "t.hahn3076",
        email: "hahn_tad9155@outlook.ca",
        password: "BBQ83LYI5MW",
        first_name: "Tad",
        last_name: "Hahn",
        phone: "147-4742",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "g_michelle2001",
        email: "garrett_michelle8827@google.edu",
        password: "AWE23GFU6EZ",
        first_name: "Michelle",
        last_name: "Garrett",
        phone: "1-330-527-1547",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "i_dunn6320",
        email: "dunn_iliana@aol.net",
        password: "OOL94FCE4DQ",
        first_name: "Iliana",
        last_name: "Dunn",
        phone: "217-8299",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "fitzgerald.aiko5532",
        email: "aikofitzgerald@google.net",
        password: "IFW36XCM2RU",
        first_name: "Aiko",
        last_name: "Fitzgerald",
        phone: "1-826-729-7391",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(USERS_TABLE, null);
  }
};
