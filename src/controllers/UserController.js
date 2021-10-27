const User = require('../models/User.js')

module.exports = {
  async getAll(req, res) {
    const response = await User.findAll();
    return res.json(response);
  },

  async getOne(req, res) {
    if (!req.id) {
      return res.json({ error: "Id don't provided" });
    }
    const response = await User.findOne({ where: { id: req.id }});
    return res.json(response);
  },
  
  async removeOne(req, res) {
    const { id } = req.params
    const response = await User.destroy({ where: { id }});
    return res.json();
  },
}