import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Float } from '@react-three/drei'
import * as THREE from 'three'
import shipUrl from '../../assets/ship.png'

export default function PlayerShip() {
  const meshRef = useRef()
  const texture = useTexture(shipUrl)
  
  const targetPos = new THREE.Vector3()
  const targetRot = new THREE.Quaternion()

  useFrame((state) => {
    const { camera } = state
    if (!meshRef.current) return

    const offset = new THREE.Vector3(0, -1.2, -4)
    offset.applyQuaternion(camera.quaternion)
    targetPos.copy(camera.position).add(offset)

    meshRef.current.position.lerp(targetPos, 0.1)

    targetRot.copy(camera.quaternion)
    meshRef.current.quaternion.slerp(targetRot, 0.05)

    const tilt = -camera.rotation.y * 0.5
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, tilt, 0.1)
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef} scale={[3.5, 3.5, 1]}>
          <planeGeometry />
          <meshBasicMaterial 
            map={texture} 
            transparent={true} 
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  )
}
