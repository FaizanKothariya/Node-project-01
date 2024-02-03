const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async ({ username, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
};

exports.generateAuthToken = (user) => {
  return jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
