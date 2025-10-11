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
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-2xl">{icon}</span>
          {title}
        </h2>
        {viewAllLink && (
          <Link 
            to={viewAllLink} 
            className={`text-sm font-medium ${colorClasses[color]} hover:underline flex items-center gap-1`}
          >
            View all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured post - larger */}
        <div className="lg:col-span-2">
          <Link to={`/posts/${featuredPost.id}`} className="group block card-hover">
            <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 h-full">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  {featuredPost.category && (
                    <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${color}-100 dark:bg-${color}-900 text-${color}-800 dark:text-${color}-200`}>
                      {featuredPost.category.icon} {featuredPost.category.name}
                    </span>
                  )}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Featured · {featuredPost.readTime || '8 min read'}
                  </span>
                </div>
                
                <h3 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-3">
                  {featuredPost.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
                  {featuredPost.excerpt || featuredPost.content?.slice(0, 200) + '...'}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">
                        {(featuredPost.author?.name || 'A')[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {featuredPost.author?.name || 'Anonymous'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(featuredPost.createdAt || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      {featuredPost._count?.likes || featuredPost.likes || Math.floor(Math.random() * 100)}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                      {featuredPost._count?.comments || featuredPost.comments || Math.floor(Math.random() * 30)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>

        {/* Other posts - smaller cards */}
        <div className="space-y-4">
          {otherPosts.map((post, index) => (
            <SectionCard key={post.id || index} post={post} compact={true} />
          ))}
        </div>
      </div>
    </section>
  )
}
