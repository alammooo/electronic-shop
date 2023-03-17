"use strict"

const data = [
  {
    name: "Samsung",
    buyPrice: 57.07,
    sellPrice: 42.01,
    stock: 1,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  },
  {
    name: "iPhone",
    buyPrice: 65.65,
    sellPrice: 98.2,
    stock: 3,
    img: "https://images.unsplash.com/photo-1634196558948-197697724bb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
  },
  {
    name: "Blackberry",
    buyPrice: 47.56,
    sellPrice: 33.46,
    stock: 4,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  },
  {
    name: "Nokia",
    buyPrice: 64.15,
    sellPrice: 59.97,
    stock: 6,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  },
  {
    name: "Sony",
    buyPrice: 80.44,
    sellPrice: 48.86,
    stock: 7,
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    data.map((el)=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()

      return el
    })
    await queryInterface.bulkInsert("Items", data, {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Items", data, {})
  },
}
