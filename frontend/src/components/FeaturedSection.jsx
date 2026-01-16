import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SectionCard from './SectionCard.jsx'

export default function FeaturedSection({ title, icon, posts, viewAllLink, color = 'blue' }) {
  const [displayPosts, setDisplayPosts] = useState([])

  useEffect(() => {
    if (posts && posts.length > 0) {
      setDisplayPosts(posts.slice(0, 6))
    }
  }, [posts])

  const colorClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400', 
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400',
    red: 'text-red-600 dark:text-red-400',
    pink: 'text-pink-600 dark:text-pink-400'
  }

  if (!displayPosts.length) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-2xl">{icon}</span>
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-xl h-48 mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  const featuredPost = displayPosts[0]
  const otherPosts = displayPosts.slice(1, 5)

  return (
    <section className="mb-16 scroll-mt-20">
      <div className="flex items-center justify-between mb-8 border-b border-beige-200 pb-4">
        <h2 className="text-3xl font-serif font-bold text-brand-dark flex items-center gap-3">
          {title}
        </h2>
        {viewAllLink && (
          <Link 
            to={viewAllLink} 
            className="text-sm font-medium text-brand-green hover:text-brand-dark tracking-wide uppercase transition-colors"
          >
            View all
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPosts.map((post) => (
          <SectionCard key={post.id} post={post} />
        ))}
      </div>

    </section>
  )
}
