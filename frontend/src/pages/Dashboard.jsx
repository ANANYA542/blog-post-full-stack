import { useEffect, useState } from 'react'
import api from '../utils/api.js'
import Loader from '../components/Loader.jsx'
import PostCard from '../components/PostCard.jsx'
import Modal from '../components/Modal.jsx'
import PostForm from '../components/PostForm.jsx'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [posts, setPosts] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const [{ data: s }, { data: p }, { data: r }] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/posts'),
          api.get('/follow/requests')
        ])
        setStats(s)
        setPosts(p.items || p)
        setRequests(r.items || r)
      } finally { setLoading(false) }
    }
    load()
  }, [])

  const respond = async (id, action) => {
    await api.post(`/follow/requests/${id}/${action}`)
    setRequests(prev => prev.filter(x => x.id !== id))
  }

  const createPost = () => {
    setEditing(null)
    setOpen(true)
  }

  const editPost = (post) => {
    setEditing(post)
    setOpen(true)
  }

  const deletePost = async (post) => {
    if (!confirm('Delete this post?')) return
    await api.delete(`/posts/${post.id}`)
    setPosts(prev => prev.filter(p => p.id !== post.id))
  }

  const submitPost = async (data) => {
    setSubmitting(true)
    try {
      if (editing) {
        const { data: updated } = await api.put(`/posts/${editing.id}`, data)
        setPosts(prev => prev.map(p => p.id === editing.id ? updated : p))
      } else {
        const { data: created } = await api.post('/posts', data)
        setPosts(prev => [created, ...prev])
      }
      setOpen(false)
      setEditing(null)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Stat title="Posts" value={stats?.posts || 0} />
        <Stat title="Likes" value={stats?.likes || 0} />
        <Stat title="Followers" value={stats?.followers || 0} />
        <Stat title="Following" value={stats?.following || 0} />
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Your Posts</h2>
          <button onClick={createPost} className="px-3 py-1 rounded-md bg-brand-600 text-white">New Post</button>
        </div>
        <div className="grid gap-4">
          {posts.map(p => (
            <div key={p.id} className="relative">
              <PostCard post={p} />
              <div className="absolute top-2 right-2 flex gap-2">
                <button onClick={()=>editPost(p)} className="px-2 py-1 text-xs rounded-md bg-white/90 border">Edit</button>
                <button onClick={()=>deletePost(p)} className="px-2 py-1 text-xs rounded-md bg-white/90 border">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-medium">Follow Requests</h2>
        <div className="grid gap-2">
          {requests.length === 0 && <div className="text-sm text-slate-500">No pending requests</div>}
          {requests.map(req => (
            <div key={req.id} className="border rounded-md p-3 flex items-center justify-between">
              <div className="text-sm">@{req.from?.username || 'user'}</div>
              <div className="flex gap-2">
                <button onClick={()=>respond(req.id,'accept')} className="px-3 py-1 rounded-md bg-brand-600 text-white">Accept</button>
                <button onClick={()=>respond(req.id,'reject')} className="px-3 py-1 rounded-md border">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Modal open={open} onClose={()=>!submitting && setOpen(false)} title={editing ? 'Edit Post' : 'New Post'}
        actions={null}
      >
        <PostForm initial={editing} onSubmit={submitPost} submitting={submitting} />
      </Modal>
    </div>
  )
}

function Stat({ title, value }) {
  return (
    <div className="bg-white border rounded-lg p-4 text-center">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-sm text-slate-500">{title}</div>
    </div>
  )
}
