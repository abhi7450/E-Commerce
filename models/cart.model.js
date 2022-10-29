module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("card", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cost: {
      type: Sequelize.STRING,
    },
  });
  return Cart;
};
