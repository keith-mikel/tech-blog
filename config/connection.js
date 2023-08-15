const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // Use JawsDB URL provided by Heroku
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Fallback to environment variables for local development
  sequelize = new Sequelize(
    process.env.DATABASE_URL || process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || 'localhost', // Use environment variable or default to 'localhost'
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306 // Use environment variable or default to 3306
    }
  );
}

module.exports = sequelize;
