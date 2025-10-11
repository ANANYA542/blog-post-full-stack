import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="text-slate-600 mt-2">The page you are looking for does not exist.</p>
      <Link className="inline-block mt-4 px-4 py-2 rounded-md bg-slate-900 text-white" to="/">Go Home</Link>
    </div>
  )
}
