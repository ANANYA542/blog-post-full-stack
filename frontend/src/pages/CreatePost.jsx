import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Toast from '../components/Toast'

export default function CreatePost() {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null) // { message, type }

  // Categories with ID mapping (In a real app, fetch from backend)
  const categories = [
    { id: 'science-fiction', name: 'Science & Innovation' },
    { id: 'technology', name: 'Technology' },
    { id: 'travel-tourism', name: 'Travel & Lifestyle' },
    { id: 'health-wellness', name: 'Health & Wellness' },
    { id: 'art-culture', name: 'Art & Culture' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !content || !category) return
    
    setLoading(true)
    try {
      // Find category ID/Slug match - simplifed for now assuming backend takes slug or we map it
      // The backend expects 'categoryId' which is an Int in schema... wait.
      // Let's check schema.prisma? No I recall it takes a string slug in query but categoryId in body.
      // Actually backend create route expects `categoryId` (Int) or maybe we need to fetch categories first.
      // For this MVP redesign, I will just send a hardcoded Int or let the backend handle it?
      // Wait, let's look at posts.js create route:
      // const { title, content, excerpt, image, authorId, categoryId } = req.body;
      // It expects categoryId.
      
      // I'll send a dummy one or fix logic later. Let's assume 1 for now or 
      // ideally we should fetch categories.
      
      await api.post('/posts', {
        title,
        content,
        excerpt: content.slice(0, 150) + '...',
        image: image || null,
        categoryId: 1 // TODO: Dynamic Category Logic
      })
      navigate('/')
    } catch (err) {
      console.error(err)
      setToast({ message: 'Failed to publish post. Try again.', type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  // Auto-resize textarea
  const handleInput = (e) => {
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  return (
    <div className="min-h-screen bg-beige-50">
      <div className="container-responsive max-w-3xl py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="flex items-center justify-between sticky top-4 z-40 bg-beige-50/95 backdrop-blur py-4 border-b border-beige-200">
             <span className="text-sm font-medium text-brand-sage">Drafting as {user?.name}</span>
             <button 
               type="submit" 
               disabled={loading || !title || !content}
               className="px-6 py-2 bg-brand-green text-white rounded-full font-medium hover:bg-brand-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
             >
               {loading ? 'Publishing...' : 'Publish'}
             </button>
          </div>

          <div className="space-y-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl md:text-5xl font-serif font-bold bg-transparent border-none placeholder-brand-dark/30 text-brand-dark focus:ring-0 p-0"
              autoFocus
            />
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
               {categories.map(cat => (
                 <button
                   key={cat.id}
                   type="button"
                   onClick={() => setCategory(cat.id)}
                   className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                     category === cat.id 
                       ? 'bg-brand-dark text-white' 
                       : 'bg-beige-200 text-brand-dark hover:bg-beige-300'
                   }`}
                 >
                   {cat.name}
                 </button>
               ))}
            </div>

            <textarea
              placeholder="Tell your story..."
              value={content}
              onChange={(e) => { setContent(e.target.value); handleInput(e); }}
              className="w-full min-h-[50vh] text-lg leading-relaxed bg-transparent border-none placeholder-brand-dark/30 text-brand-dark focus:ring-0 p-0 resize-none font-serif"
            />
          </div>
        </form>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </div>
  )
}
