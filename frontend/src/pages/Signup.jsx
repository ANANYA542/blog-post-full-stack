import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Signup() {
  const { signup } = useAuth()
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try { await signup(form) }
    catch (e) { 
      if (e.response && e.response.status === 409) {
        setError("User already exists. Please log in.");
      } else {
        setError(e.response?.data?.message || 'Signup failed');
      }
    }
    finally { setLoading(false) }
  }

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full px-3 py-2 border rounded-md" placeholder="Username" value={form.username} onChange={e=>setForm({...form, username: e.target.value})} />
        <input className="w-full px-3 py-2 border rounded-md" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
        <input className="w-full px-3 py-2 border rounded-md" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button disabled={loading} className="w-full px-3 py-2 rounded-md bg-slate-900 text-white">
          {loading? 'Creating account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}
