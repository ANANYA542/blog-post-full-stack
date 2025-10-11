export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <div className="flex items-center gap-3 text-slate-500">
        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
        <span className="text-sm ml-2">{label}</span>
      </div>
    </div>
  )
}
