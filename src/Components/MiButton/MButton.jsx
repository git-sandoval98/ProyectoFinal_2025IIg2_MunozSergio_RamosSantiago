import { motion } from 'framer-motion'
export default function MButton({className='', children, ...props}){
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.01 }}
      className={`btn ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
