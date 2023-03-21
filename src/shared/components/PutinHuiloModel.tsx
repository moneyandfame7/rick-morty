import { Box } from '@mui/material'
import { OrbitControls, PerspectiveCamera, Stage } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import PutinHuilo from './3d/Putin_huilo'

export const PutinHuiloModel = () => {
  return (
    <motion.div
      // style={{ background: '#000', width: 150, height: 150, borderRadius: 30, color: '#fff' }}
      initial={{ y: '-100vh' }}
      animate={{ y: 0 }}
      exit={{ y: '' }}
      transition={{ duration: 2 }}
    >
      <Box
        component='div'
        sx={{
          height: '800px',
          width: '100%',
          display: 'flex',
          gap: 5,
          top: -300,
          left: 0,
          position: 'absolute',
          zIndex: '-5'
        }}
      >
        <Canvas>
          <Stage environment={'city'}>
            <PutinHuilo />
          </Stage>

          <PerspectiveCamera makeDefault position={[10, 1, 1]} scale={10} />
          <OrbitControls scale={10} autoRotate={true} enableRotate={true} enableZoom={false} autoRotateSpeed={10} />
        </Canvas>
      </Box>
    </motion.div>
  )
}
