const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
 
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hp: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 150 },
      },

    attack: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 150 },
    },

    defense: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 150 },
    },

    speed: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 150 },
    },

    height: {
      type: DataTypes.INTEGER,
    },

    weight: {
      type: DataTypes.INTEGER,
    },

    image: {
      type: DataTypes.STRING(1000),
      isUrl: true,
    },

    createInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {timestamps: false});
};
