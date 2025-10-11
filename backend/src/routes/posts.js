const express = require('express');
const prisma = require('../prisma');
const router = express.Router();

// Create post
router.post('/', async (req, res) => {
  const { title, content, excerpt, image, authorId, categoryId } = req.body;
  try {
    const post = await prisma.post.create({
      data: { title, content, excerpt, image, authorId, categoryId, published: true },
      include: { author: true, category: true }
    });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all posts with optional category filter and search
router.get('/', async (req, res) => {
  const { category, q } = req.query;
  try {
    const where = { published: true };
    
    if (category) {
      const cat = await prisma.category.findUnique({ where: { slug: category } });
      if (cat) where.categoryId = cat.id;
    }
    
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { content: { contains: q } },
        { excerpt: { contains: q } }
      ];
    }
    
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
        _count: { select: { likes: true, comments: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: {
        author: { select: { id: true, name: true, email: true } },
        category: true,
        _count: { select: { likes: true, comments: true } }
      }
    });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  const { title, content, excerpt, image, categoryId } = req.body;
  try {
    const post = await prisma.post.update({
      where: { id: req.params.id },
      data: { title, content, excerpt, image, categoryId },
      include: { author: true, category: true }
    });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    await prisma.post.delete({ where: { id: req.params.id } });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Like/unlike post
router.post('/:id/like', async (req, res) => {
  const { userId } = req.body;
  try {
    const existing = await prisma.like.findUnique({
      where: { userId_postId: { userId, postId: req.params.id } }
    });
    
    if (existing) {
      await prisma.like.delete({ where: { id: existing.id } });
      res.json({ liked: false });
    } else {
      await prisma.like.create({ data: { userId, postId: req.params.id } });
      res.json({ liked: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get comments for post
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: req.params.id },
      include: { author: { select: { id: true, name: true, email: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add comment to post
router.post('/:id/comments', async (req, res) => {
  const { content, authorId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: { content, authorId, postId: req.params.id },
      include: { author: { select: { id: true, name: true, email: true } } }
    });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
