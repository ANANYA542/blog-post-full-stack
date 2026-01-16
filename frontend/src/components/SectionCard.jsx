import { Link } from 'react-router-dom'

export default function SectionCard({ post, compact = false }) {
  if (compact) {
    return (
      <Link to={`/posts/${post.id}`} className="group block">
        <div className="flex gap-3 p-3 rounded-lg hover:bg-beige-100 transition-colors">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0 grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-serif font-medium text-brand-dark group-hover:text-brand-green line-clamp-2 transition-colors">
              {post.title}
            </h4>
            <p className="text-sm text-brand-sage mt-1">
              {post.author?.name || 'Anonymous'} · {post.readTime || '5 min read'}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/posts/${post.id}`} className="group block card-hover h-full">
      <article className="bg-white rounded-xl overflow-hidden border border-beige-200 h-full flex flex-col">
        <div className="aspect-[16/9] overflow-hidden relative">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/10 transition-colors duration-300"></div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            {post.category && (
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-beige-100 text-brand-green border border-beige-200">
                {post.category.name}
              </span>
            )}
            <span className="text-xs text-brand-sage">
              {post.readTime || '5 min read'}
            </span>
          </div>
          
          <h3 className="font-serif font-bold text-xl text-brand-dark group-hover:text-brand-green transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          
          <p className="text-brand-dark/70 text-sm line-clamp-3 mb-4 flex-1">
            {post.excerpt || post.content?.slice(0, 150) + '...'}
          </p>
          
          <div className="flex items-center justify-between pt-4 border-t border-beige-100 mt-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-beige-200 rounded-full flex items-center justify-center text-brand-dark font-serif text-sm">
                {(post.author?.name || 'A')[0].toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-brand-dark">
                  {post.author?.name || 'Anonymous'}
                </p>
                <p className="text-xs text-brand-sage">
                  {new Date(post.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
