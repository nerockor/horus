import { useLayoutEffect } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useScrollAnimation() {
  const { camera, scene } = useThree()

  useLayoutEffect(() => {
    // 1. Carga Inicial (Dive)
    gsap.from(camera.position, {
      y: 50,
      z: 50,
      duration: 3,
      ease: 'power3.out'
    })

    // 2. Timeline de Scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'main', // El contenedor principal que tiene el scroll
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Suavizado de 1 segundo
        immediateRender: false
      }
    })

    // 0% - 20%: Vuelo entre nubes
    tl.to(camera.position, {
      z: -10,
      duration: 1
    })

    // 25%: Enfoque Isla Hoteles (Posición Isla: [-12, -5, -60])
    tl.to(camera.position, {
      x: -5,
      y: 0,
      z: -50,
      duration: 1
    }, 'hoteles')
    tl.to(camera.rotation, {
      y: -0.5,
      duration: 1
    }, 'hoteles')

    // 50%: Enfoque Isla Destinos (Posición Isla: [10, -5, -20])
    tl.to(camera.position, {
      x: 5,
      y: 0,
      z: -15,
      duration: 1
    }, 'destinos')
    tl.to(camera.rotation, {
      y: 0.5,
      duration: 1
    }, 'destinos')

    // 80%: Descenso Isla Ofertas (Posición Isla: [0, -5, -100])
    tl.to(camera.position, {
      x: 0,
      y: -2,
      z: -90,
      duration: 1
    }, 'ofertas')
    tl.to(camera.rotation, {
      x: -0.2,
      y: 0,
      duration: 1
    }, 'ofertas')

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [camera])
}
