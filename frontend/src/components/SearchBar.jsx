import { useState } from 'react'

export default function SearchBar({ onSearch, placeholder = 'Search posts...' }) {
  const [q, setQ] = useState('')
  const submit = (e) => {
    e.preventDefault()
    onSearch?.(q)
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input value={q} onChange={e=>setQ(e.target.value)} placeholder={placeholder}
        className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-600" />
      <button className="px-3 py-2 rounded-md bg-brand-600 text-white">Search</button>
    </form>
  )
}
