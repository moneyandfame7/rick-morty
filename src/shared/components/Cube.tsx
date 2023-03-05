import { OrbitControls, PerspectiveCamera, RenderTexture, Text } from '@react-three/drei'
import { FC } from 'react'

export const Cube: FC = () => {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color='red'>
        <RenderTexture attach='map'>
          <PerspectiveCamera makeDefault position={[0, 0, 2]} />
          <color attach='background' args={['pink']} />
          <Text fontSize={1} color='black'>
            hello
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  )
}
