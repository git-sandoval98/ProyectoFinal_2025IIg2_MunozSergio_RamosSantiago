import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ToastContext = createContext()

export function ToastProvider({ children }){
  const [toasts, setToasts] = useState([])
  const push = useCallback((msg, type='info')=>{
    const id = Date.now()
    setToasts(prev=> [...prev, { id, msg, type }])
    setTimeout(()=> setToasts(prev=> prev.filter(t=>t.id!==id)), 2500)
  },[])
  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div style={{position:'fixed', right:16, bottom:16, display:'grid', gap:8, zIndex:50}}>
        <AnimatePresence initial={false}>
          {toasts.map(t=> (
            <motion.div key={t.id}
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:16 }}
              className="card" style={{padding:'10px 12px', borderLeft:`4px solid ${t.type==='error'?'#ef4444':t.type==='success'?'#22c55e':'#3b82f6'}`}}
            >
              {t.msg}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
export function useToast(){ return useContext(ToastContext) }
