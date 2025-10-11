import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../state/AuthContext.jsx'
import api from '../utils/api.js'
import Loader from '../components/Loader.jsx'
import CommentCard from '../components/CommentCard.jsx'
import LikeButton from '../components/LikeButton.jsx'
import ShareButton from '../components/ShareButton.jsx'

export default function PostDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      // Try backend first
      try {
        const [{ data: p }, { data: c }] = await Promise.all([
          api.get(`/posts/${id}`),
          api.get(`/posts/${id}/comments`)
        ])
        setPost(p)
        setComments(c.items || c)
      } catch (backendErr) {
        // Fallback to dummy API for demo
        const { data: p } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const { data: c } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        setPost({
          id: p.id,
          title: p.title,
          content: p.body,
          author: { username: `user${p.userId}` },
          likes: Math.floor(Math.random() * 50),
          liked: false,
          image: `https://picsum.photos/seed/${p.id}/1200/600`
        })
        setComments(c.slice(0, 5).map(cm => ({
          id: cm.id,
          content: cm.body,
          author: { username: cm.email.split('@')[0] }
        })))
      }
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchData() }, [id])

  const toggleLike = async () => {
    if (!user) {
      alert('Please sign in to like posts')
      return
    }
    try {
      await api.post(`/posts/${id}/like`)
      setPost(prev => ({...prev, liked: !prev.liked, likes: (prev.likes||0) + (prev.liked? -1 : 1)}))
    } catch {}
  }

  const addComment = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('Please sign in to comment')
      return
    }
    if (!commentText.trim()) return
    try {
      const { data } = await api.post(`/posts/${id}/comments`, { content: commentText })
      setComments(prev => [data, ...prev])
      setCommentText('')
    } catch (err) {
      alert('Failed to add comment. Please try again.')
    }
  }

  if (loading) return <Loader />
  if (!post) return <div>Post not found</div>

  return (
    <div className="space-y-6">
      {post.image && <img className="w-full rounded-lg" src={post.image} alt="cover" />}
      <div>
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="text-slate-600 mt-2">{post.content}</p>
        <div className="mt-3 flex items-center gap-3">
          <LikeButton liked={post.liked} count={post.likes || 0} onToggle={toggleLike} />
          <ShareButton url={window.location.href} title={post.title} />
          <span className="text-sm text-slate-500">by @{post.author?.username || 'author'}</span>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Comments</h2>
        {user ? (
          <form onSubmit={addComment} className="flex gap-2">
            <input value={commentText} onChange={e=>setCommentText(e.target.value)} className="flex-1 px-3 py-2 border rounded-md" placeholder="Add a comment..." />
            <button className="px-3 py-2 rounded-md bg-slate-900 text-white">Comment</button>
          </form>
        ) : (
          <div className="border border-slate-200 rounded-md p-4 text-center text-sm text-slate-600">
            <Link to="/login" className="text-brand-600 hover:underline">Sign in</Link> to comment on this post
          </div>
        )}
        <div className="space-y-2">
          {comments.length === 0 && <div className="text-sm text-slate-500">No comments yet</div>}
          {comments.map(c => <CommentCard key={c.id} comment={c} />)}
        </div>
      </section>
    </div>
  )
}
