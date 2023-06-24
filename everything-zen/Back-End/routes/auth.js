const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Load User model
const User = require('./models/User');

//Create Strategy
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // Compare
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect email or password' });
        }

        // Success
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize 
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Signup function
const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, 'your_secret_key');

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing up' });
  }
};

// Login 
const login = async (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ message: info.message });
    }

    const token = jwt.sign({ userId: user._id }, 'your_secret_key');

    res.status(200).json({ token });
  })(req, res, next);
};

// Logout
const logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = {
  signup,
  login,
  logout,
};
