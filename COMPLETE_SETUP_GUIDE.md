# Complete Blog App Setup Guide

This guide will help you set up the full-stack blog application with categories, realistic posts, and all features.

## 📋 Prerequisites

- Node.js 16+ installed
- MySQL database running
- Git (optional)

## 🚀 Quick Start (5 Steps)

### Step 1: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL="mysql://root:password@localhost:3306/blog_db"
PORT=4000
JWT_SECRET=your-super-secret-jwt-key-change-this
EOF
```

**Important:** Replace `root`, `password`, and database credentials with your actual MySQL credentials.

### Step 2: Create Database

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE blog_db;
EXIT;
```

### Step 3: Run Migrations & Seed

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (creates all tables)
npx prisma migrate dev --name add_categories

# Seed database with 42 realistic posts across 6 categories
npm run seed
```

**What gets created:**
- ✅ 6 Categories (Science Fiction, Travel, Technology, Food, Health, Art)
- ✅ 42 Realistic posts (7 per category)
- ✅ All with images, excerpts, and full content

### Step 4: Start Backend

```bash
npm start
# Server runs on http://localhost:4000
```

### Step 5: Start Frontend

```bash
# In a new terminal
cd ../frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:4000/api
EOF

# Start frontend
npm start
# App opens at http://localhost:5173
```

## ✅ Verify Everything Works

### Test Backend API

```bash
# Get all categories
curl http://localhost:4000/api/categories

# Get posts in Science Fiction category
curl http://localhost:4000/api/posts?category=science-fiction

# Search posts
curl "http://localhost:4000/api/posts?q=mars"
```

### Test Frontend

1. Open http://localhost:5173
2. You should see:
   - Hero section (if not logged in)
   - Category filter buttons with icons
   - 42 posts from the database
   - Each post showing its category badge

3. Click a category filter (e.g., 🚀 Science Fiction)
   - Posts filter to show only that category
   - URL updates with category parameter

4. Try search
   - Type "mars" or "travel"
   - Results update in real-time

## 🎨 Category System Features

### 6 Categories Created

| Category | Icon | Color | Posts |
|----------|------|-------|-------|
| Science Fiction | 🚀 | Purple | 7 |
| Travel & Tourism | ✈️ | Green | 7 |
| Technology | 💻 | Blue | 7 |
| Food & Cooking | 🍳 | Orange | 7 |
| Health & Wellness | ❤️ | Red | 7 |
| Art & Culture | 🎨 | Pink | 7 |

### Sample Posts Include

**Science Fiction:**
- "The Last Colony on Mars"
- "AI Consciousness: The Awakening"
- "Time Travelers Anonymous"
- "The Quantum Heist"

**Travel & Tourism:**
- "Hidden Gems of Kyoto"
- "Backpacking Through Patagonia"
- "Street Food Guide: Bangkok"
- "Northern Lights in Iceland"

**Technology:**
- "The Future of Quantum Computing"
- "Web3 and Decentralization"
- "AI in Healthcare Revolution"

...and 33 more realistic posts!

## 📱 Frontend Features

### Home Page
- **Hero Section** for unauthenticated users
- **Category Filters** with visual pills showing post counts
- **Search Bar** for finding posts
- **Create Post Button** (auth required)
- **Post Cards** with category badges, like counts, comment counts

### Category Filtering
- Click any category to filter posts
- Active category highlighted with category color
- "Clear filter" button to reset
- Filters persist with backend query parameters

### Post Creation
- Modal form with category dropdown
- Excerpt field for post summaries
- Image URL field
- Auto-includes author and timestamp

### Post Cards Show
- Category badge with icon and color
- Author name
- Like count and comment count
- Excerpt or truncated content
- Share button

## 🔧 Database Schema

### Category Model
```prisma
model Category {
  id          String   @id @default(uuid())
  name        String   @unique
  slug        String   @unique
  description String?
  color       String?
  icon        String?
  createdAt   DateTime @default(now())
  posts       Post[]
}
```

### Post Model (Updated)
```prisma
model Post {
  id         String    @id @default(uuid())
  title      String
  content    String
  excerpt    String?
  image      String?
  published  Boolean   @default(false)
  authorId   String?
  categoryId String?
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
  category   Category? @relation(fields: [categoryId], references: [id])
  // ... other relations
}
```

## 🛠️ Troubleshooting

### Backend Issues

**"Can't connect to MySQL"**
```bash
# Check MySQL is running
mysql -u root -p

# Verify DATABASE_URL in .env
cat .env | grep DATABASE_URL
```

**"Table doesn't exist"**
```bash
# Reset and recreate database
npx prisma migrate reset
npm run seed
```

**"Prisma Client not generated"**
```bash
npx prisma generate
```

### Frontend Issues

**"Network Error" or "Failed to fetch"**
- Ensure backend is running on port 4000
- Check VITE_API_URL in frontend/.env
- Verify CORS is enabled in backend (already included)

**"Categories not showing"**
- Backend must be running and seeded
- Check browser console for errors
- Verify `/api/categories` endpoint works

**"Posts not filtering"**
- Check category slug matches exactly
- Verify backend route handles `?category=` param
- Check browser network tab for API calls

## 🎯 Next Steps

### Create Your First User
1. Click "Get Started" or "Sign Up"
2. Fill in email, username, password
3. You'll be auto-logged in

### Create Your First Post
1. After logging in, click "Create Post"
2. Fill in title, excerpt, content
3. Select a category from dropdown
4. Add image URL (optional)
5. Click "Save"

### Test Interactions
1. Like a post (heart icon)
2. Click a post to view details
3. Add a comment
4. Share a post
5. Filter by category

## 📊 Database Stats After Seed

- **Users:** 0 (create via signup)
- **Categories:** 6
- **Posts:** 42 (7 per category)
- **Comments:** 0 (add via UI)
- **Likes:** 0 (add via UI)

## 🔄 Reset Everything

If you want to start fresh:

```bash
cd backend

# Drop all data and recreate
npx prisma migrate reset

# Re-seed
npm run seed

# Restart server
npm start
```

## 📝 API Quick Reference

### Get Posts by Category
```bash
GET /api/posts?category=science-fiction
GET /api/posts?category=travel-tourism
GET /api/posts?category=technology
```

### Search Posts
```bash
GET /api/posts?q=mars
GET /api/posts?q=travel
```

### Combine Filters
```bash
GET /api/posts?category=technology&q=AI
```

### Get All Categories
```bash
GET /api/categories
```

## 🎉 Success Checklist

- [ ] Backend running on port 4000
- [ ] Frontend running on port 5173
- [ ] Database seeded with 42 posts
- [ ] Categories showing on home page
- [ ] Can filter posts by category
- [ ] Can search posts
- [ ] Can create account
- [ ] Can create post with category
- [ ] Can like and comment (when logged in)
- [ ] Category badges showing on post cards

## 💡 Tips

1. **Use Prisma Studio** to view database:
   ```bash
   cd backend
   npx prisma studio
   # Opens at http://localhost:5555
   ```

2. **Check backend logs** for API errors

3. **Use browser DevTools** Network tab to debug API calls

4. **Category slugs** are URL-friendly (e.g., "science-fiction", "travel-tourism")

5. **Colors are hex codes** - customize in seed.js if desired

---

**Need help?** Check the individual README files in `/backend` and `/frontend` directories for more details.
