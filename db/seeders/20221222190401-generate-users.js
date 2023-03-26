'use strict';

const { USERS_TABLE } = require('../models/user.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert(USERS_TABLE, [
      {
        username: "t.hahn3076",
        email: "hahn_tad9155@outlook.ca",
        password: "$2b$10$oljPVV/zB0Tc4jkBReeEdO6bGvQYpUVtLZ/88rBF6H9Dt/RyQah6m",
        first_name: "Tad",
        last_name: "Hahn",
        role: 'customer',
        phone: "147-4742",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "g_michelle2001",
        email: "garrett_michelle8827@google.edu",
        password: "$2b$10$h1872E3HyMFV8R6k4jAEVuFUzHc0Hta1yTmPN196i6JNlQC8dJmJ.",
        first_name: "Michelle",
        last_name: "Garrett",
        role: 'customer',
        phone: "1-330-527-1547",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "i_dunn6320",
        email: "dunn_iliana@aol.net",
        password: "$2b$10$axmeuxFF1.CKq6NKaFeC.OGGR6lYiwcVRKycMug51aOHCwX7PKPua",
        first_name: "Iliana",
        last_name: "Dunn",
        role: 'customer',
        phone: "217-8299",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "fitzgerald.aiko5532",
        email: "aikofitzgerald@google.net",
        password: "$2b$10$.1CzshUJTuk4fmPmcssSrOjEr9tPK2QLHo4.Cl/6fjvMwPCMOBmIy",
        first_name: "Aiko",
        last_name: "Fitzgerald",
        role: 'customer',
        phone: "1-826-729-7391",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "geras4323",
        email: "german432yo@gmail.com",
        password: "$2b$10$Rbima2RW0aX1o2zD7lk6oOfaVrO.z7XUGxT5qdvlT6QIgqe5rHaE6",
        first_name: "Geras",
        last_name: "Master",
        role: 'administrator',
        phone: "1-826-729-7321",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete(USERS_TABLE, null);
  }
};
