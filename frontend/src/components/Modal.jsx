import { useEffect } from 'react'

export default function Modal({ open, onClose, title, children, actions }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg" onClick={(e)=>e.stopPropagation()}>
        {title && <div className="px-4 py-3 border-b font-medium">{title}</div>}
        <div className="p-4">{children}</div>
        {actions && <div className="px-4 py-3 border-t flex justify-end gap-2">{actions}</div>}
      </div>
    </div>
  )
}
