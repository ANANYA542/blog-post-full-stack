# Quick Start Guide

Get the BlogApp frontend running in 3 steps:

## 1. Install Dependencies

```bash
cd frontend
npm install
```

## 2. Configure Environment (Optional)

If you have a backend running:

```bash
cp .env.example .env
```

Edit `.env` and set your backend URL:
```
VITE_API_URL=http://localhost:3000/api
```

**Skip this step** if you want to try the demo mode with dummy data!

## 3. Start the App

```bash
npm start
```

The app will open at **http://localhost:5173**

## What You'll See

### Without Backend (Demo Mode)
- ✅ Browse 10 dummy posts from JSONPlaceholder
- ✅ View post details with dummy comments
- ✅ Search functionality (client-side)
- ✅ Beautiful landing page with hero section
- ⚠️ Sign in/up forms (won't work without backend)
- ⚠️ Like/comment features (require backend + auth)

### With Backend Connected
- ✅ Full authentication (signup, login, logout)
- ✅ Create, edit, delete your own posts
- ✅ Like and comment on posts
- ✅ Follow/unfollow users
- ✅ User dashboard with stats
- ✅ Profile pages
- ✅ Search across all posts

## Try It Out

1. **Browse as Guest**: Open the app and scroll through posts
2. **View a Post**: Click any post title to see details
3. **Sign Up**: Click "Get Started" to create an account (requires backend)
4. **Create Post**: After signing in, click "Create Post" on home page
5. **Comment**: Click a post and add a comment at the bottom

## Troubleshooting

**Port already in use?**
```bash
npm start -- --port 3001
```

**Backend not connecting?**
- Check `.env` has correct `VITE_API_URL`
- Verify backend is running
- Check browser console for errors

**Want to build for production?**
```bash
npm run build
npm run preview
```

## Next Steps

- Connect your Node.js/Express/Prisma backend
- Customize colors in `tailwind.config.js`
- Add more features in `src/pages/` and `src/components/`
- Deploy to Vercel, Netlify, or your preferred host

Enjoy! 🚀
