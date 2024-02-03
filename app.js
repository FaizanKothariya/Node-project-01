const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
async function connectToDatabase() {
    try {
      await mongoose.connect(process.env.DATABASE_URL);
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection failed");
      console.error(error);
    }
  }
  
connectToDatabase();

// Configure Passport
require('./passport');

app.use(express.json());

// Register auth routes and Posts routes
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js app!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});