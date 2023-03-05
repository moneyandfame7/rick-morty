import React, { FC } from 'react'
import { Canvas } from '@react-three/fiber'
import SupportUkraine from '../components/3d/Support_ukraine'
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'

export const HomePage: FC = () => {
  return (
    <motion.div
      // style={{ background: '#000', width: 150, height: 150, borderRadius: 30, color: '#fff' }}
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      exit={{ x: '-100vw' }}
      transition={{ duration: 2 }}
    >
      <Box component='div' sx={{ height: '500px', display: 'flex', gap: 5 }}>
        <Canvas>
          <Stage environment='city' intensity={0.3}>
            <SupportUkraine />
          </Stage>
          <PerspectiveCamera makeDefault fov={100} />
          <OrbitControls autoRotate={true} enableRotate={false} enableZoom={false} autoRotateSpeed={10} />
        </Canvas>
      </Box>
    </motion.div>
  )
}
