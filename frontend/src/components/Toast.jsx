import { useState, useEffect } from 'react'

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const bgClass = type === 'error' ? 'bg-red-50 text-red-800 border-red-200' : 'bg-brand-green text-white shadow-lg'

  return (
    <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-md border ${bgClass} transition-all duration-300 animate-slide-up z-50 flex items-center gap-2`}>
       {type === 'success' && (
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
       )}
       {type === 'error' && (
         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
       )}
       <span className="font-medium text-sm">{message}</span>
    </div>
  )
}
