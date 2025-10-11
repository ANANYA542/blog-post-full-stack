import { useEffect, useState } from 'react'
import api from '../utils/api.js'

export default function PostForm({ initial, onSubmit, submitting }) {
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', image: '', categoryId: '' })
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    if (initial) setForm({
      title: initial.title || '',
      content: initial.content || '',
      excerpt: initial.excerpt || '',
      image: initial.image || '',
      categoryId: initial.categoryId || ''
    })
  }, [initial])

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories')
      setCategories(data)
    } catch (err) {
      console.error('Failed to fetch categories')
    }
  }

  const submit = (e) => {
    e.preventDefault()
    onSubmit?.(form)
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div>
        <label className="block text-sm text-slate-600 mb-1">Title</label>
        <input value={form.title} onChange={e=>setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border rounded-md" placeholder="Post title" required />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Excerpt (optional)</label>
        <input value={form.excerpt} onChange={e=>setForm({...form, excerpt: e.target.value})} className="w-full px-3 py-2 border rounded-md" placeholder="Short summary..." />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Content</label>
        <textarea value={form.content} onChange={e=>setForm({...form, content: e.target.value})} className="w-full px-3 py-2 border rounded-md min-h-[140px]" placeholder="Write your post..." required />
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Category</label>
        <select value={form.categoryId} onChange={e=>setForm({...form, categoryId: e.target.value})} className="w-full px-3 py-2 border rounded-md">
          <option value="">Select a category...</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-slate-600 mb-1">Image URL (optional)</label>
        <input value={form.image} onChange={e=>setForm({...form, image: e.target.value})} className="w-full px-3 py-2 border rounded-md" placeholder="https://..." />
      </div>
      <div className="flex justify-end">
        <button disabled={submitting} className="px-4 py-2 rounded-md bg-slate-900 text-white">
          {submitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
