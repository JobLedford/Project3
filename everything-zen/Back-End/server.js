const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

// Create the Express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Everything-Zen', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('MongoDB connection error', error);
    process.exit(1); // Exit process if connection fails
  });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Routes
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
