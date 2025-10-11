export default function LikeButton({ liked, count = 0, onToggle }) {
  return (
    <button onClick={onToggle} className={`text-sm px-3 py-1 rounded-md border ${liked? 'bg-brand-600 text-white border-brand-600':'border-slate-300 text-slate-700'}`}>
      ♥ {count}
    </button>
  )
}
