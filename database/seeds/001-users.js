const bcrypt = require('bcryptjs');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Admin', password: bcrypt.hashSync('aPassword', 14)},
        
      ]);
    });
};
