import { Canvas, useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import CloudSystem from './CloudSystem'
import World from './World'
import useScrollAnimation from '../../hooks/useScrollAnimation'

function SceneContent() {
  const { camera } = useThree()
  useScrollAnimation()

  useFrame((state) => {
    // Si el mouse está presionado (botón principal = 1)
    const isPressed = state.mouse.buttons === 1
    
    // Objetivo de FOV: 60 cuando se presiona (zoom), 75 por defecto
    const targetFOV = isPressed ? 45 : 75
    camera.fov = THREE.MathUtils.lerp(camera.fov, targetFOV, 0.1)
    camera.updateProjectionMatrix()
    
    // También podemos añadir una pequeña inclinación de la cámara basada en el mouse
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, -state.mouse.x * 0.05, 0.1)
  })

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
      
      {/* Iluminación Atmosférica */}
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <directionalLight position={[-5, 10, 5]} intensity={2} color="#ffffff" />

      {/* Efecto de niebla para profundidad */}
      <fog attach="fog" args={['#87CEEB', 10, 150]} />

      <CloudSystem />
      <World />
    </>
  )
}

export default function Scene() {
  return (
    <Canvas shadows>
      <Suspense fallback={null}>
        <color attach="background" args={['#87CEEB']} />
        <SceneContent />
      </Suspense>
    </Canvas>
  )
}
