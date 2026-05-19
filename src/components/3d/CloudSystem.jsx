import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const CLOUD_COUNT = 50

export default function CloudSystem() {
  const texture = useTexture('/textures/nube.png')
  const cloudsRef = useRef([])

  // Generar posiciones y rotaciones aleatorias iniciales
  const cloudData = useMemo(() => {
    return Array.from({ length: CLOUD_COUNT }).map(() => ({
      position: [
        (Math.random() - 0.5) * 40, // X
        (Math.random() - 0.5) * 20, // Y
        Math.random() * 200 - 100  // Z: entre -100 y 100
      ],
      rotation: Math.random() * Math.PI * 2,
      scale: 5 + Math.random() * 10
    }))
  }, [])

  useFrame((state, delta) => {
    cloudsRef.current.forEach((cloud, i) => {
      if (cloud) {
        // Restar posición en Z para el efecto de vuelo (según hoja de ruta)
        cloud.position.z -= 20 * delta

        // Bucle infinito: si z < -100, resetear a 100
        if (cloud.position.z < -100) {
          cloud.position.z = 100
          // Reposicionar aleatoriamente en X e Y al resetear para variedad
          cloud.position.x = (Math.random() - 0.5) * 40
          cloud.position.y = (Math.random() - 0.5) * 20
        }
      }
    })
  })

  return (
    <group>
      {cloudData.map((data, i) => (
        <mesh
          key={i}
          ref={(el) => (cloudsRef.current[i] = el)}
          position={data.position}
          rotation={[0, 0, data.rotation]}
          scale={data.scale}
        >
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial
            map={texture}
            transparent
            opacity={0.8}
            depthWrite={false}
            side={THREE.DoubleSide}
            color="#ffffff"
          />
        </mesh>
      ))}
    </group>
  )
}
