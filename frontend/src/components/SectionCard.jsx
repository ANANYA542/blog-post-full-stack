import { Link } from 'react-router-dom'

export default function SectionCard({ post, compact = false }) {
  if (compact) {
    return (
      <Link to={`/posts/${post.id}`} className="group block">
        <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-2 transition-colors">
              {post.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {post.author?.name || 'Anonymous'} · {post.readTime || '5 min read'}
            </p>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/posts/${post.id}`} className="group block card-hover">
      <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="aspect-[16/9] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            {post.category && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                {post.category.icon} {post.category.name}
              </span>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {post.readTime || '5 min read'}
            </span>
          </div>
          
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4">
            {post.excerpt || post.content?.slice(0, 150) + '...'}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {(post.author?.name || 'A')[0].toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {post.author?.name || 'Anonymous'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(post.createdAt || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                {post._count?.likes || post.likes || Math.floor(Math.random() * 50)}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
                {post._count?.comments || post.comments || Math.floor(Math.random() * 20)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
