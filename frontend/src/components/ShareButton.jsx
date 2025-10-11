export default function ShareButton({ url, title = 'Check this out!' }) {
  const doShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title, url })
      } else {
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard')
      }
    } catch (e) {
      // user canceled or not available
    }
  }
  return (
    <button onClick={doShare} className="text-sm px-3 py-1 rounded-md border border-slate-300 text-slate-700">
      Share
    </button>
  )
}
