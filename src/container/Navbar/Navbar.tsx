import React, {useState} from 'react'
import { useMediaQuery } from 'react-responsive'

import './Navbar.scss';

import { motion, IoCloseOutline, FaRegImages } from "../index"
// import { auth } from '../../firebase/config';

const Navbar = () => {
  const [display,setDisplay] = useState("flex");
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  return (  
     <motion.nav 
       animate={!isTabletOrMobile?{width:[10,25,50,100,150,200,240,340,370],display:display}
                                 :{height:[10,25,50,100,150,200,240,340,370,400],display:display}}
       transition={{ duration: .5 }}   
       drag="x"  
       dragConstraints={{right:0, left:0}} 
      >          
            <motion.div className='navbar__icon-image'>
              <FaRegImages size="35" color='rgb(14, 255, 86)'/>
            </motion.div>

            <motion.div className='navbar__icon-exit' onClick={()=>setDisplay("none")} >
              <IoCloseOutline size={30} color='rgba(34, 40, 51, 0.831)'/>
            </motion.div>
            
            <motion.span
                 style={{padding:"0rem 4rem"}}
                 animate={{opacity:[0,.2,.35,.4,.6,.8,1]}}
                 transition={{duration:1}}>
              <h1>
                Hello!
              </h1>
             
              <text>
                <p>Your car gallery can be here...</p>
                <p>Add your car and then pictures!</p>
              </text>   

              
             
            </motion.span>            
      </motion.nav>
  )
}

export default Navbar