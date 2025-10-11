import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../utils/api.js'
import Loader from '../components/Loader.jsx'

export default function Profile() {
  const { username } = useParams()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [requesting, setRequesting] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const { data } = await api.get(`/users/${username}`)
        setProfile(data)
      } finally { setLoading(false) }
    }
    load()
  }, [username])

  const follow = async () => {
    setRequesting(true)
    try { await api.post(`/users/${username}/follow`) }
    finally { setRequesting(false) }
  }

  const unfollow = async () => {
    setRequesting(true)
    try { await api.post(`/users/${username}/unfollow`) }
    finally { setRequesting(false) }
  }

  if (loading) return <Loader />
  if (!profile) return <div>User not found</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-slate-200" />
        <div>
          <div className="text-xl font-semibold">@{profile.username}</div>
          <div className="text-sm text-slate-500">{profile.bio || 'No bio yet'}</div>
        </div>
      </div>
      <div className="flex gap-2">
        {profile.isFollowing ? (
          <button onClick={unfollow} disabled={requesting} className="px-3 py-1 rounded-md border">Unfollow</button>
        ) : (
          <button onClick={follow} disabled={requesting} className="px-3 py-1 rounded-md bg-brand-600 text-white">Follow</button>
        )}
      </div>

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {(profile.posts || []).map(p => (
          <a key={p.id} href={`/posts/${p.id}`} className="block group">
            <img src={p.image || `https://picsum.photos/seed/${p.id}/800/600`} className="rounded-lg object-cover aspect-[4/3] w-full" />
            <div className="text-sm text-slate-600 mt-1 group-hover:underline">{p.title}</div>
          </a>
        ))}
      </section>
    </div>
  )
}
