const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
	sequelize.define('Country', {
		id: {
			type: DataTypes.STRING,
			allowNull: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true
		},
		continent: {
			type: DataTypes.STRING,
			allowNull: true
		},
		capital: {
			type: DataTypes.STRING,
			allowNull: true
		},
		subregion: {
			type: DataTypes.STRING
		},
		area: {
			type: DataTypes.INTEGER
		},
		population: {
			type: DataTypes.INTEGER
		}
	});
};
