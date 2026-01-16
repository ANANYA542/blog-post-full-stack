import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  
  const navLinkClass = ({isActive}) => 
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? 'text-brand-green' : 'text-brand-dark hover:text-brand-green'
    }`

  return (
    <header className="sticky top-0 z-50 bg-beige-50/95 backdrop-blur border-b border-beige-200">
      <div className="container-responsive h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-green/10 text-brand-green group-hover:bg-brand-green group-hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="font-serif font-bold text-xl text-brand-dark tracking-tight">ThoughtFlow</span>
        </Link>
        
        <nav className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-6">
            <li><NavLink to="/" className={navLinkClass}>Reading List</NavLink></li>
            <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
          </ul>
          
          {user ? (
            <div className="flex items-center gap-4">
              <NavLink 
                to="/create" 
                className="hidden md:flex items-center gap-2 text-brand-dark hover:text-brand-green font-medium text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                Write
              </NavLink>
              
              <div className="h-6 w-px bg-beige-200 hidden md:block"></div>

              <div className="flex items-center gap-3">
                 <span className="text-sm font-medium text-brand-dark">{user.name || user.email.split('@')[0]}</span>
                 <button 
                  onClick={logout} 
                  className="text-sm text-brand-sage hover:text-brand-dark transition-colors"
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-brand-dark hover:text-brand-green">
                Sign in
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 rounded-full bg-brand-green text-white text-sm font-medium hover:bg-brand-hover transition-colors shadow-sm hover:shadow"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
