
const path = require('path');

module.exports = {
  async renderHome(req, res) {
    const filePath = path.resolve(__dirname, '..', 'public/index.html');
    return res.sendFile(filePath);
  },

  async renderLogin(req, res) {
    const filePath = path.resolve(__dirname, '..', 'public/login.html');
    return res.sendFile(filePath);
  },

  async renderRegister(req, res) {
    const filePath = path.resolve(__dirname, '..', 'public/register.html');
    return res.sendFile(filePath);
  }
}