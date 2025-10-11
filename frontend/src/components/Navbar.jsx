import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 sticky top-0 z-50">
      <div className="container-responsive h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white">Quill</span>
        </Link>
        
        <nav className="flex items-center gap-6 text-sm">
          <NavLink 
            to="/" 
            className={({isActive}) => `font-medium transition-colors ${
              isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/about" 
            className={({isActive}) => `font-medium transition-colors ${
              isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            About
          </NavLink>
          
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center gap-4">
              <NavLink 
                to="/dashboard" 
                className={({isActive}) => `font-medium transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to={`/profile/${user.username || 'me'}`} 
                className={({isActive}) => `font-medium transition-colors ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Profile
              </NavLink>
              <button 
                onClick={logout} 
                className="px-4 py-2 rounded-lg bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink 
                to="/login" 
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors font-medium"
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup" 
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
