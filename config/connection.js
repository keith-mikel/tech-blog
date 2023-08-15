const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
  // Use JawsDB URL provided by Heroku
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else if (process.env.DATABASE_URL) {
  // Use Heroku DATABASE_URL
  sequelize = new Sequelize(process.env.DATABASE_URL);
} else {
  // Fallback for local development
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306
    }
  );
}


module.exports = sequelize;
