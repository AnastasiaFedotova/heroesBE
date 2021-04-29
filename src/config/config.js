const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('heroesdb', 'postgres', '1321081Aa', {
    dialect: "postgres",
    host: "localhost",
    define: {
        timestamps: false
    }
});

module.exports = sequelize;
