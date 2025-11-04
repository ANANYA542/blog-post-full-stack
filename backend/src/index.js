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
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoriesRoutes);

app.get('/', (req, res) => res.send('Prisma blog backend'));

// const port = process.env.PORT || 4000;
// app.listen(port, () => console.log(`Server listening on ${port}`));
module.exports = app;