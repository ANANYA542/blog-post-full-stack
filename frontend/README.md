# Blog App Frontend

Minimalist React + Vite + Tailwind frontend wired to a Node.js/Express/Prisma backend with JWT auth.

## Features

✨ **Public Landing Page** with dummy posts from JSONPlaceholder API  
🔐 **Authentication-gated interactions**: like, comment, and create posts require sign-in  
📝 **Full CRUD** for posts (create, edit, delete) in Dashboard  
🏷️ **Category System** with 6 curated categories and visual filters  
🔍 **Search & Filter** posts by title, content, author, or category  
💬 **Comments** with auth protection  
❤️ **Like/Unlike** posts  
📤 **Share** posts via Web Share API or clipboard  
👥 **Follow/Unfollow** users and manage follow requests  
📊 **User Dashboard** with stats and post management  

### Categories Available
- 🚀 **Science Fiction** - Futuristic worlds and technologies
- ✈️ **Travel & Tourism** - Amazing destinations worldwide
- 💻 **Technology** - Latest in tech and innovation
- 🍳 **Food & Cooking** - Recipes and culinary adventures
- ❤️ **Health & Wellness** - Tips for a healthier lifestyle
- 🎨 **Art & Culture** - Creative expressions and cultural insights  

## Quickstart

1. **Copy env example and set your backend URL**
```bash
cp .env.example .env
# Edit .env and set VITE_API_URL=http://localhost:3000/api
```

2. **Install dependencies**
```bash
npm install
```

3. **Start dev server**
```bash
npm start
# or
npm run dev
```

The app will open at `http://localhost:5173`

## Demo Mode (No Backend)

The app gracefully falls back to **JSONPlaceholder API** for demo posts and comments when the backend is unavailable. This allows:
- Browsing 10 dummy posts on the home page
- Viewing post details with dummy comments
- Seeing placeholder images via Picsum

**Note**: Like, comment, and create features require a working backend and authentication.

## Backend API Endpoints

The app expects these endpoints (adjust in `src/utils/api.js` if needed):

### Auth
- `POST /auth/signup` - Create account
- `POST /auth/login` - Sign in
- `GET /auth/me` - Get current user

### Categories
- `GET /categories` - List all categories with post counts
- `GET /categories/:slug` - Get category with posts

### Posts
- `GET /posts` - List all posts (supports `?q=search` and `?category=slug`)
- `GET /posts/:id` - Get single post
- `POST /posts` - Create post (auth required, include categoryId)
- `PUT /posts/:id` - Update post (auth required)
- `DELETE /posts/:id` - Delete post (auth required)

### Interactions
- `POST /posts/:id/like` - Toggle like (auth required)
- `GET /posts/:id/comments` - Get comments
- `POST /posts/:id/comments` - Add comment (auth required)

### Social
- `GET /users/:username` - Get user profile
- `POST /users/:username/follow` - Follow user (auth required)
- `POST /users/:username/unfollow` - Unfollow user (auth required)
- `GET /follow/requests` - Get pending follow requests (auth required)
- `POST /follow/requests/:id/accept` - Accept request (auth required)
- `POST /follow/requests/:id/reject` - Reject request (auth required)

### Dashboard
- `GET /dashboard/stats` - Get user stats (auth required)
- `GET /dashboard/posts` - Get user's posts (auth required)

## Project Structure

```
src/
├── state/
│   └── AuthContext.jsx          # JWT auth state management
├── utils/
│   ├── api.js                   # Axios instance with interceptors
│   └── storage.js               # LocalStorage helpers
├── components/
│   ├── Navbar.jsx               # Navigation bar
│   ├── PostCard.jsx             # Post preview card
│   ├── CommentCard.jsx          # Comment display
│   ├── LikeButton.jsx           # Like toggle button
│   ├── ShareButton.jsx          # Share functionality
│   ├── SearchBar.jsx            # Search input
│   ├── PostForm.jsx             # Create/edit post form
│   ├── Modal.jsx                # Reusable modal
│   ├── Loader.jsx               # Loading spinner
│   └── ProtectedRoute.jsx       # Auth guard for routes
├── pages/
│   ├── Home.jsx                 # Landing page with posts feed
│   ├── Login.jsx                # Sign in page
│   ├── Signup.jsx               # Registration page
│   ├── PostDetail.jsx           # Single post view
│   ├── Dashboard.jsx            # User dashboard
│   ├── Profile.jsx              # User profile
│   ├── About.jsx                # About page
│   └── NotFound.jsx             # 404 page
├── App.jsx                      # Route configuration
├── main.jsx                     # App entry point
└── index.css                    # Tailwind imports
```

## Authentication Flow

1. **JWT tokens** stored in `localStorage`
2. **Auto-attach** to requests via axios interceptor
3. **401 responses** trigger logout and redirect to `/login`
4. **Protected routes** redirect unauthenticated users to login
5. **Auth-gated features** show alerts prompting sign-in

## Styling

- **Tailwind CSS** for all styling
- **Minimalist design** with clean typography
- **Responsive** layout for mobile and desktop
- **Brand colors** defined in `tailwind.config.js`
- **Custom utility** `.container-responsive` for max-width layouts

## Notes

- Images use **Picsum** placeholder seeds when not provided
- **Search** is debounced on form submit
- **Share button** uses Web Share API with clipboard fallback
- **Modal** closes on Escape key
- **Protected routes** show loader during auth check
