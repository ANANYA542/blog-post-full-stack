import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import api from '../utils/api.js'
import FeaturedSection from '../components/FeaturedSection.jsx'
import SectionCard from '../components/SectionCard.jsx'
import SearchBar from '../components/SearchBar.jsx'
import Loader from '../components/Loader.jsx'
import Modal from '../components/Modal.jsx'
import PostForm from '../components/PostForm.jsx'

// Mock data for different sections when backend is unavailable
const mockSections = {
  science: [
    { id: 1, title: "The Future of Quantum Computing", excerpt: "Exploring the revolutionary potential of quantum computers in solving complex problems.", image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800", author: { name: "Dr. Sarah Chen" }, category: { name: "Science", icon: "🔬" }, readTime: "8 min read" },
    { id: 2, title: "CRISPR Gene Editing Breakthrough", excerpt: "Scientists achieve new milestone in genetic engineering with unprecedented precision.", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800", author: { name: "Prof. Michael Rodriguez" }, category: { name: "Science", icon: "🔬" }, readTime: "6 min read" },
    { id: 3, title: "Mars Mission Updates", excerpt: "Latest developments from NASA's Mars exploration program and future colonization plans.", image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800", author: { name: "Dr. Emily Watson" }, category: { name: "Science", icon: "🔬" }, readTime: "10 min read" },
  ],
  travel: [
    { id: 4, title: "Hidden Gems of Southeast Asia", excerpt: "Discover untouched destinations beyond the typical tourist trails in Thailand, Vietnam, and Cambodia.", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", author: { name: "Alex Thompson" }, category: { name: "Travel", icon: "✈️" }, readTime: "12 min read" },
    { id: 5, title: "Digital Nomad Guide to Europe", excerpt: "Complete guide to working remotely while exploring European cities on a budget.", image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800", author: { name: "Maria Santos" }, category: { name: "Travel", icon: "✈️" }, readTime: "15 min read" },
    { id: 6, title: "Sustainable Travel in 2024", excerpt: "How to explore the world while minimizing your environmental footprint.", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800", author: { name: "James Wilson" }, category: { name: "Travel", icon: "✈️" }, readTime: "7 min read" },
  ],
  tech: [
    { id: 7, title: "AI Revolution in Healthcare", excerpt: "How artificial intelligence is transforming medical diagnosis and treatment protocols.", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800", author: { name: "Dr. Lisa Park" }, category: { name: "Technology", icon: "💻" }, readTime: "9 min read" },
    { id: 8, title: "Web3 and the Future of Internet", excerpt: "Understanding blockchain technology and its impact on digital ownership and privacy.", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800", author: { name: "David Kim" }, category: { name: "Technology", icon: "💻" }, readTime: "11 min read" },
    { id: 9, title: "Cybersecurity Trends 2024", excerpt: "Essential security practices for individuals and businesses in an increasingly digital world.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800", author: { name: "Rachel Green" }, category: { name: "Technology", icon: "💻" }, readTime: "8 min read" },
  ],
  lifestyle: [
    { id: 10, title: "Minimalist Living Guide", excerpt: "Transform your life by embracing simplicity and intentional living practices.", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800", author: { name: "Sophie Miller" }, category: { name: "Lifestyle", icon: "🌱" }, readTime: "6 min read" },
    { id: 11, title: "Mental Health in Remote Work", excerpt: "Strategies for maintaining psychological well-being while working from home.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800", author: { name: "Dr. Robert Lee" }, category: { name: "Lifestyle", icon: "🌱" }, readTime: "10 min read" },
    { id: 12, title: "Sustainable Fashion Choices", excerpt: "Building an eco-friendly wardrobe without compromising on style or budget.", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800", author: { name: "Emma Johnson" }, category: { name: "Lifestyle", icon: "🌱" }, readTime: "7 min read" },
  ],
  animals: [
    { id: 13, title: "Wildlife Conservation Success Stories", excerpt: "Inspiring tales of species recovery and the dedicated people making it possible.", image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800", author: { name: "Dr. Mark Anderson" }, category: { name: "Animals", icon: "🦁" }, readTime: "12 min read" },
    { id: 14, title: "Urban Wildlife Adaptation", excerpt: "How animals are adapting to city life and what we can learn from their resilience.", image: "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=800", author: { name: "Jennifer Brown" }, category: { name: "Animals", icon: "🦁" }, readTime: "8 min read" },
    { id: 15, title: "Ocean Plastic and Marine Life", excerpt: "The impact of plastic pollution on marine ecosystems and innovative cleanup solutions.", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800", author: { name: "Dr. Ocean Martinez" }, category: { name: "Animals", icon: "🦁" }, readTime: "9 min read" },
  ]
}

export default function Home() {
  console.log("🏠 Home component rendered");
  const { user } = useAuth()
  const [sections, setSections] = useState({})
  const [trendingPosts, setTrendingPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchAllSections()
  }, [])

  const fetchAllSections = async () => {
    setLoading(true)
    try {
      // Try to fetch from backend first
      try {
        const [scienceRes, travelRes, techRes, lifestyleRes, animalsRes] = await Promise.all([
          api.get('/posts?category=science-fiction'),
          api.get('/posts?category=travel-tourism'), 
          api.get('/posts?category=technology'),
          api.get('/posts?category=health-wellness'),
          api.get('/posts?category=art-culture')
        ])

        setSections({
          science: scienceRes.data.map(enrichPost),
          travel: travelRes.data.map(enrichPost),
          tech: techRes.data.map(enrichPost),
          lifestyle: lifestyleRes.data.map(enrichPost),
          animals: animalsRes.data.map(enrichPost)
        })

        // Get trending posts (most liked)
        const { data: trending } = await api.get('/posts?limit=6')
        setTrendingPosts(trending.map(enrichPost))
      } catch (backendErr) {
        // Fallback to mock data
        setSections(mockSections)
        setTrendingPosts([...mockSections.science, ...mockSections.tech].slice(0, 6))
      }
    } finally {
      setLoading(false)
    }
  }

  const enrichPost = (p) => ({
    ...p,
    image: p.image || `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=800`,
    readTime: p.readTime || `${Math.floor(Math.random() * 10) + 5} min read`
  })

  const createPost = async (data) => {
    setSubmitting(true)
    try {
      const { data: created } = await api.post('/posts', { ...data, authorId: user.id })
      // Refresh sections to show new post
      fetchAllSections()
      setOpen(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      {!user && (
        <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container-responsive py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                A place to share knowledge and better understand the world
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-slide-up">
                Discover stories, thinking, and expertise from writers on any topic.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <Link 
                  to="/signup" 
                  className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors text-lg"
                >
                  Start reading
                </Link>
                <Link 
                  to="/login" 
                  className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-colors text-lg"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
        </section>
      )}

      <div className="container-responsive py-8">
        {/* Search and Create Post */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <div className="flex-1">
            <SearchBar onSearch={() => {}} placeholder="Search for topics, people, or keywords..." />
          </div>
          {user && (
            <button 
              onClick={() => setOpen(true)} 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Write
            </button>
          )}
        </div>

        {loading ? (
          <div className="space-y-12">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 mb-6"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 h-64 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            {/* Science Section */}
            <FeaturedSection
              title="Science & Innovation"
              icon="🔬"
              posts={sections.science || []}
              viewAllLink="/?category=science-fiction"
              color="blue"
            />

            {/* Travel Section */}
            <FeaturedSection
              title="Travel & Adventure"
              icon="✈️"
              posts={sections.travel || []}
              viewAllLink="/?category=travel-tourism"
              color="green"
            />

            {/* Technology Section */}
            <FeaturedSection
              title="Technology"
              icon="💻"
              posts={sections.tech || []}
              viewAllLink="/?category=technology"
              color="purple"
            />

            {/* Lifestyle Section */}
            <FeaturedSection
              title="Lifestyle & Wellness"
              icon="🌱"
              posts={sections.lifestyle || []}
              viewAllLink="/?category=health-wellness"
              color="orange"
            />

            {/* Animals Section */}
            <FeaturedSection
              title="Animals & Nature"
              icon="🦁"
              posts={sections.animals || []}
              viewAllLink="/?category=art-culture"
              color="red"
            />

            {/* Trending Section */}
            {trendingPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  Trending Now
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingPosts.slice(0, 6).map((post, index) => (
                    <SectionCard key={post.id || index} post={post} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Newsletter Signup */}
        <section className="mt-20 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Stay curious. Get the best stories.
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of readers who get our best stories delivered to their inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </section>
      </div>

      {/* Create Post Modal */}
      <Modal open={open} onClose={() => !submitting && setOpen(false)} title="Create New Post">
        <PostForm onSubmit={createPost} submitting={submitting} />
      </Modal>
    </div>
  )
}
