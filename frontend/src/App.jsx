import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import PostDetail from './pages/PostDetail.jsx'
import CreatePost from './pages/CreatePost.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Profile from './pages/Profile.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import { AuthProvider } from './context/AuthContext.jsx'

export default function App() {
  console.log("Frontend loaded successfully!");
  console.log("API URL:", import.meta.env.VITE_API_URL);
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route element={<ProtectedRoute />}> 
            <Route path="/create" element={<CreatePost />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Route>
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <footer className="py-8 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container-responsive">
          © {new Date().getFullYear()} Quill. Made with ❤️ for curious minds.
        </div>
      </footer>
      </div>
    </AuthProvider>
  )
}

