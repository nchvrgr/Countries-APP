const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

	sequelize.define('Activity', {
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		difficulty: {
			type: DataTypes.ENUM('1', '2', '3', '4', '5'),
			allowNull: true
		},
		duration: {
			type: DataTypes.STRING,
			allowNull: true
		},
		season: {
			type: DataTypes.ENUM('summer', 'autumn', 'winter', 'spring'),
			allowNull: true
		}
	});
};
