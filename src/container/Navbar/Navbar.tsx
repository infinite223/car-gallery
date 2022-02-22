import React from 'react'
import './Navbar.scss';
import { FaRegImages } from 'react-icons/fa'
import { motion } from "framer-motion"

const Navbar = () => {
  return (
    <motion.nav className='navbar' animate={{
       rotate: 360,
    }}>
      <motion.div className='navbar__icon' drag>
        <FaRegImages size="30" color='rgba(14, 255, 86,0.8)'/>
      </motion.div>
      <h1>Hello!</h1>
      <text>
        <p>Your car gallery can be here...</p>
        <h3>Add your car and then pictures!</h3>
      </text>       
    </motion.nav>
  )
}

export default Navbar