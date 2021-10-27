const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User.js');

function generateToken(params = {}) {
  return jwt.sign(params, process.env.JWT_PRIVATE, {
    expiresIn: '1d',
  });
}

module.exports = {
  async register(req, res) {
    const { name, email, password } = req.body
    var password_hash = ''

    if (!name || !email || !password) {
      return res.status(401).json({ message: 'Name or email or password not sent' });
    }

    const exists = await User.findOne({ where: { email: email } });

    if (exists) {
      return res.status(401).json({ message: 'Email already registred' });
    }

    const user = await User.create({ name, email, password_hash: password });

    const token = generateToken({ id: user.id });
    user.password_hash = undefined;
    
    return res.json({ user, token });
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    if ( !email || !password ) {
      return res.status(401).json({ error: 'Email or password not sent' });
    }

    const user = await User.findOne({ where: { email }});

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const confirmPass = await bcrypt.compare(password, user.password_hash);
    
    if (!confirmPass) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = generateToken({ id: user.id });

    user.password_hash = undefined;

    return res.json({ user, token });
  },
}