
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
  static init (connection) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
    },
    {
      sequelize: connection,
      hooks: {
        beforeCreate: user => {
          user.set('password_hash', bcrypt.hashSync(String(user.password_hash), 10));
        }
      }
    })
  }
}

module.exports = User;