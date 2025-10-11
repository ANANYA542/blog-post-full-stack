const express = require('express');
const prisma = require('../prisma');
const router = express.Router();

// Example: get user stats
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const postsCount = await prisma.post.count({ where: { authorId: userId } });
    const commentsCount = await prisma.comment.count({ where: { userId } });
    res.json({ postsCount, commentsCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
