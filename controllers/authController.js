const passport = require('passport');
const authService = require('../services/authService');

exports.login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed. Invalid credentials.' });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }

      const token = authService.generateAuthToken(user);
      return res.json({ user, token });
    });
  })(req, res, next);
};

exports.register = async (req, res) => {
  try {
    await authService.register(req.body);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};
