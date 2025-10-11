# Category System Quick Reference

## 📚 Categories Overview

### 1. 🚀 Science Fiction
- **Slug:** `science-fiction`
- **Color:** `#8B5CF6` (Purple)
- **Posts:** 7 realistic sci-fi stories
- **Topics:** Mars colonies, AI consciousness, time travel, quantum mechanics, cybernetics, space exploration, genetic engineering

### 2. ✈️ Travel & Tourism
- **Slug:** `travel-tourism`
- **Color:** `#10B981` (Green)
- **Posts:** 7 travel guides and experiences
- **Topics:** Kyoto, Patagonia, Bangkok street food, Iceland northern lights, Morocco, Greek islands, Trans-Siberian Railway

### 3. 💻 Technology
- **Slug:** `technology`
- **Color:** `#3B82F6` (Blue)
- **Posts:** 7 tech articles
- **Topics:** Quantum computing, Web3, AI in healthcare, edge computing, sustainable tech, cybersecurity, metaverse

### 4. 🍳 Food & Cooking
- **Slug:** `food-cooking`
- **Color:** `#F59E0B` (Orange)
- **Posts:** 7 culinary guides
- **Topics:** Sourdough, plant-based cooking, French pastry, fermentation, perfect steak, Asian noodles, seasonal cooking

### 5. ❤️ Health & Wellness
- **Slug:** `health-wellness`
- **Color:** `#EF4444` (Red)
- **Posts:** 7 wellness articles
- **Topics:** Mindfulness, sleep science, strength training, nutrition myths, yoga, mental health, intermittent fasting

### 6. 🎨 Art & Culture
- **Slug:** `art-culture`
- **Color:** `#EC4899` (Pink)
- **Posts:** 7 cultural pieces
- **Topics:** Renaissance art, street art, indigenous art, music therapy, digital art/NFTs, Japanese tea ceremony, photography

## 🔌 API Usage

### Filter Posts by Category
```javascript
// Frontend
const { data } = await api.get('/posts', { params: { category: 'science-fiction' } })

// Backend endpoint
GET /api/posts?category=science-fiction
```

### Get All Categories
```javascript
// Frontend
const { data } = await api.get('/categories')

// Response
[
  {
    id: "uuid",
    name: "Science Fiction",
    slug: "science-fiction",
    description: "Explore futuristic worlds and technologies",
    color: "#8B5CF6",
    icon: "🚀",
    _count: { posts: 7 }
  },
  // ... more categories
]
```

### Create Post with Category
```javascript
// Frontend
await api.post('/posts', {
  title: "My Post",
  content: "Content here...",
  excerpt: "Short summary",
  categoryId: "category-uuid",
  authorId: "user-uuid"
})
```

## 🎨 Frontend Components

### Category Filter Pills
```jsx
<button
  onClick={() => handleCategoryChange(cat.slug)}
  className={`px-3 py-1.5 rounded-full text-sm ${
    selectedCategory === cat.slug ? 'text-white' : 'bg-slate-100'
  }`}
  style={selectedCategory === cat.slug ? { backgroundColor: cat.color } : {}}
>
  <span>{cat.icon}</span>
  <span>{cat.name}</span>
  <span>({cat._count?.posts || 0})</span>
</button>
```

### Category Badge on Post Card
```jsx
{post.category && (
  <span 
    className="px-2 py-0.5 rounded-full text-xs text-white"
    style={{ backgroundColor: post.category.color }}
  >
    {post.category.icon} {post.category.name}
  </span>
)}
```

## 🗄️ Database Queries

### Get Posts with Category
```javascript
// Prisma
const posts = await prisma.post.findMany({
  where: { published: true },
  include: {
    category: true,
    author: true,
    _count: { select: { likes: true, comments: true } }
  }
})
```

### Filter by Category Slug
```javascript
// Prisma
const category = await prisma.category.findUnique({ 
  where: { slug: 'science-fiction' } 
})

const posts = await prisma.post.findMany({
  where: { categoryId: category.id }
})
```

### Get Category with Posts
```javascript
// Prisma
const category = await prisma.category.findUnique({
  where: { slug: 'technology' },
  include: {
    posts: {
      where: { published: true },
      include: { author: true }
    }
  }
})
```

## 🎯 Common Use Cases

### 1. Show All Posts in a Category
```javascript
// Frontend component
const [posts, setPosts] = useState([])

useEffect(() => {
  const fetchPosts = async () => {
    const { data } = await api.get('/posts', { 
      params: { category: 'science-fiction' } 
    })
    setPosts(data)
  }
  fetchPosts()
}, [])
```

### 2. Category Dropdown in Form
```jsx
<select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
  <option value="">Select category...</option>
  {categories.map(cat => (
    <option key={cat.id} value={cat.id}>
      {cat.icon} {cat.name}
    </option>
  ))}
</select>
```

### 3. Filter + Search Combined
```javascript
// Backend route handles both
GET /api/posts?category=technology&q=AI

// Prisma query
const where = { published: true }
if (category) where.categoryId = categoryId
if (q) where.OR = [
  { title: { contains: q } },
  { content: { contains: q } }
]
```

## 🎨 Customization

### Add New Category
```javascript
// In seed.js or via Prisma Studio
await prisma.category.create({
  data: {
    name: 'Sports',
    slug: 'sports',
    description: 'Athletic achievements and fitness',
    color: '#14B8A6',
    icon: '⚽'
  }
})
```

### Change Category Colors
Edit `backend/prisma/seed.js`:
```javascript
const categories = [
  { 
    name: 'Science Fiction', 
    slug: 'science-fiction',
    color: '#YOUR_HEX_COLOR',  // Change this
    icon: '🚀'
  }
]
```

Then re-seed:
```bash
npm run seed
```

## 📊 Category Stats

### Get Post Count per Category
```javascript
const categories = await prisma.category.findMany({
  include: {
    _count: { select: { posts: true } }
  }
})

// Returns: [{ name: "Science Fiction", _count: { posts: 7 } }, ...]
```

### Most Popular Category
```javascript
const categories = await prisma.category.findMany({
  include: {
    _count: { select: { posts: true } }
  },
  orderBy: {
    posts: { _count: 'desc' }
  },
  take: 1
})
```

## 🔍 Search Within Category
```javascript
// Frontend
const searchInCategory = async (categorySlug, query) => {
  const { data } = await api.get('/posts', {
    params: { category: categorySlug, q: query }
  })
  return data
}

// Usage
const results = await searchInCategory('technology', 'quantum')
```

## 🎨 UI States

### Active Category
```javascript
const [selectedCategory, setSelectedCategory] = useState(null)

// Toggle category
const handleCategoryChange = (slug) => {
  setSelectedCategory(slug === selectedCategory ? null : slug)
}
```

### Show Active Filter
```jsx
{selectedCategory && (
  <div className="flex items-center gap-2">
    <span>Filtered by: {categoryName}</span>
    <button onClick={() => setSelectedCategory(null)}>
      Clear
    </button>
  </div>
)}
```

## 🚀 Performance Tips

1. **Index categoryId** in Post table (already done in schema)
2. **Cache categories** - they rarely change
3. **Paginate** filtered results for large datasets
4. **Use select** to limit fields returned

```javascript
// Efficient query
const posts = await prisma.post.findMany({
  where: { categoryId },
  select: {
    id: true,
    title: true,
    excerpt: true,
    category: { select: { name: true, icon: true, color: true } }
  },
  take: 20  // Pagination
})
```

---

**Total Posts in Database:** 42 (7 per category)  
**Total Categories:** 6  
**All posts are:** Published, have images, excerpts, and realistic content
