
const path = require('path');
require('dotenv').config();

module.exports = {
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../', 'database', process.env.DB_FILENAME),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  define: {
    timestamps: true,
    underscored: true,
  },
}