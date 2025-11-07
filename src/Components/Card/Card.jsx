import { motion } from 'framer-motion'
export default function Card({children, ...props}){
  return (
    <motion.article
      className="card"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type:'spring', stiffness: 260, damping: 20 }}
      {...props}
    >
      {children}
    </motion.article>
  )
}
