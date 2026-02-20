'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Works', [
      {
        title: '1984',
        description: 'Distopía clásica de George Orwell',
        coverImage: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        type: 'BOOK',
        releaseYear: 1949,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Cien años de soledad',
        description: 'Obra maestra de Gabriel García Márquez',
        coverImage: 'https://ia800100.us.archive.org/view_archive.php?archive=/5/items/l_covers_0012/l_covers_0012_70.zip&file=0012703917-L.jpg',
        type: 'BOOK',
        releaseYear: 1967,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Works', null, {});
  }
};
