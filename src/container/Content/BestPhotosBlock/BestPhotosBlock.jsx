import React from 'react'
import { Canvas } from '@react-three/fiber'

function Box(){
    return(
        <mesh> 
            <boxBufferGeometry/>
        </mesh>
    )
}

export const BestPhotosBlock = () => {
  return (
    <Canvas></Canvas>
  )
}
