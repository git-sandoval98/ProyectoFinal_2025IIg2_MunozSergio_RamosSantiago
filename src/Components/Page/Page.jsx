import { motion } from 'framer-motion'
const Page = ({children}) => (
  <motion.div
    className="container"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.25 }}
  >
    {children}
  </motion.div>
)
export default Page
