import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function InteractiveIsland({ position, children, title, rotationSpeed = 1, mouseFactor = 0.5 }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (!groupRef.current) return
    const { mouse } = state

    // Rotación basada en el mouse
    const targetRotationX = mouse.y * mouseFactor
    const targetRotationY = mouse.x * mouseFactor

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.1)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.1)
    
    // Movimiento sutil adicional
    groupRef.current.position.y += Math.sin(state.clock.elapsedTime * rotationSpeed) * 0.005
  })

  return (
    <group position={position} ref={groupRef}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        {children}
        {title && (
          <Text
            position={[0, 4, 0]}
            fontSize={1}
            color="#ffd700"
            anchorX="center"
            anchorY="middle"
          >
            {title}
          </Text>
        )}
      </Float>
    </group>
  )
}

export default function World() {
  return (
    <group>
      {/* LOGO HORUS (Interactuando más fuerte con el mouse) */}
      <InteractiveIsland position={[0, 0, -5]} mouseFactor={0.8} rotationSpeed={2}>
        <mesh>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial 
            color="#ffd700" 
            metalness={1} 
            roughness={0.1} 
            emissive="#443300"
            transmission={0.5}
            thickness={2}
          />
        </mesh>
      </InteractiveIsland>

      {/* ISLA 1: DESTINOS */}
      <InteractiveIsland position={[10, -5, -20]} title="DESTINOS" mouseFactor={0.3}>
        <mesh>
          <cylinderGeometry args={[5, 6, 2, 32]} />
          <meshStandardMaterial color="#222" roughness={0.8} />
        </mesh>
      </InteractiveIsland>

      {/* ISLA 2: HOTELES */}
      <InteractiveIsland position={[-12, -5, -60]} title="HOTELES" mouseFactor={0.4}>
        <mesh>
          <boxGeometry args={[8, 4, 8]} />
          <meshStandardMaterial color="#111" roughness={0.5} />
        </mesh>
      </InteractiveIsland>

      {/* ISLA 3: PAQUETES PROMO */}
      <InteractiveIsland position={[0, -5, -100]} title="PROMOS" mouseFactor={0.5}>
        <mesh>
          <sphereGeometry args={[6, 32, 32]} />
          <MeshDistortMaterial
            color="#ffd700"
            speed={2}
            distort={0.3}
            radius={1}
          />
        </mesh>
      </InteractiveIsland>
    </group>
  )
}
