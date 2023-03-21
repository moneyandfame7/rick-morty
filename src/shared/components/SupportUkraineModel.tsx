import { Box } from '@mui/material'
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import SupportUkraine from './3d/Support_ukraine'

export const SupportUkraineModel = () => {
  return (
    <motion.div
      // style={{ background: '#000', width: 150, height: 150, borderRadius: 30, color: '#fff' }}
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      exit={{ x: '-100vw' }}
      transition={{ duration: 2 }}
    >
      <Box component='div' sx={{ height: '200px', display: 'flex', gap: 5 }}>
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
