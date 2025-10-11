# Backend Setup Guide

## Prerequisites
- Node.js 16+ installed
- MySQL database running
- Database credentials ready

## Setup Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create a `.env` file in the backend directory:
```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/blog_db"
PORT=4000
JWT_SECRET=your-secret-key-here
```

Replace `USER`, `PASSWORD`, and `blog_db` with your MySQL credentials and database name.

### 3. Create Database
```bash
mysql -u root -p
```
```sql
CREATE DATABASE blog_db;
EXIT;
```

### 4. Run Prisma Migrations
This will create all tables (User, Post, Category, Comment, Like, Share):
```bash
npx prisma migrate dev --name init
```

### 5. Seed the Database
This will populate your database with 6 categories and 42 realistic posts:
```bash
node prisma/seed.js
```

**Categories Created:**
- 🚀 Science Fiction (7 posts)
- ✈️ Travel & Tourism (7 posts)
- 💻 Technology (7 posts)
- 🍳 Food & Cooking (7 posts)
- ❤️ Health & Wellness (7 posts)
- 🎨 Art & Culture (7 posts)

### 6. Start the Server
```bash
npm start
```

Server will run on `http://localhost:4000`

## API Endpoints

### Categories
- `GET /api/categories` - List all categories with post counts
- `GET /api/categories/:slug` - Get category with posts

### Posts
- `GET /api/posts` - List all posts (supports `?category=slug` and `?q=search`)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (requires: title, content, authorId, categoryId)
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:id/like` - Toggle like (requires: userId)
- `GET /api/posts/:id/comments` - Get comments
- `POST /api/posts/:id/comments` - Add comment (requires: content, authorId)

### Auth
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - Sign in
- `GET /api/auth/me` - Get current user

### Dashboard
- `GET /api/dashboard/stats` - User stats
- `GET /api/dashboard/posts` - User's posts

## Verify Setup

Test the API:
```bash
# Get all categories
curl http://localhost:4000/api/categories

# Get posts in a category
curl http://localhost:4000/api/posts?category=science-fiction

# Search posts
curl http://localhost:4000/api/posts?q=mars
```

## Troubleshooting

**Migration fails?**
- Ensure MySQL is running
- Check DATABASE_URL in .env
- Verify database exists

**Seed fails?**
- Run migrations first
- Check console for specific errors
- Ensure Prisma client is generated: `npx prisma generate`

**CORS errors from frontend?**
- Ensure `cors` package is installed: `npm install cors`
- Server includes `app.use(cors())` in index.js

## Reset Database (if needed)
```bash
npx prisma migrate reset
node prisma/seed.js
```

This will drop all tables, recreate them, and re-seed data.
