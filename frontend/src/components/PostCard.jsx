import { Link } from 'react-router-dom'
import LikeButton from './LikeButton.jsx'
import ShareButton from './ShareButton.jsx'

export default function PostCard({ post, onLike }) {
  return (
    <article className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      {post.image && (
        <img src={post.image} alt="cover" className="w-full h-56 object-cover" />
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link to={`/posts/${post.id}`} className="text-lg font-semibold hover:underline flex-1">
            {post.title}
          </Link>
          {post.category && (
            <span 
              className="px-2 py-0.5 rounded-full text-xs text-white whitespace-nowrap"
              style={{ backgroundColor: post.category.color || '#6B7280' }}
            >
              {post.category.icon} {post.category.name}
            </span>
          )}
        </div>
        <p className="text-sm text-slate-600 mt-1 line-clamp-3">{post.excerpt || post.content?.slice(0,140)}...</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            by {post.author?.name || post.author?.email?.split('@')[0] || 'Anonymous'}
            {post._count && (
              <span className="ml-2 text-slate-400">
                · {post._count.comments || 0} comments
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <ShareButton url={`${window.location.origin}/posts/${post.id}`} title={post.title} />
            <LikeButton liked={post.liked} count={post._count?.likes || post.likes || 0} onToggle={()=>onLike?.(post)} />
          </div>
        </div>
      </div>
    </article>
  )
}
