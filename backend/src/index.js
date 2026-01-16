const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const dashboardRoutes = require('./routes/dashboard');
const categoriesRoutes = require('./routes/categories');

const app = express();

/* CORS FIX */
app.use(cors({
  origin: true, // Allow all origins explicitly for now to fix blockers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
  credentials: true
}));

// Handle preflight requests
app.options("*", cors({
  origin: true,
  credentials: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Prisma blog backend'));
app.get('/heal', (req, res) => res.send('Prisma blog backend'));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoriesRoutes);

module.exports = app;
