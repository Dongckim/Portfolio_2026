import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

interface WireframeSphereProps {
  mousePosition: { x: number; y: number }
  scrollY: number
}

function Sphere({ mousePosition, scrollY }: WireframeSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)
  const baseRotationY = useRef(0)
  const baseRotationX = useRef(0)

  // Create wireframe geometry - larger mesh triangles
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(5.1, 16, 16) // Reduced segments for larger triangle mesh size
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return

    // Auto rotation (accumulated)
    baseRotationY.current += 0.003
    baseRotationX.current += 0.002

    // Scroll-based rotation (absolute)
    meshRef.current.rotation.y = baseRotationY.current + scrollY * 0.0005
    meshRef.current.rotation.x = baseRotationX.current + scrollY * 0.0003

    // Pulse animation (subtle)
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02
    meshRef.current.scale.setScalar(pulse)

    // Scroll-based visibility - always visible, but brighter when scrolling
    const scrollBoost = Math.min(scrollY / 100, 1) // 0 to 1 based on scroll
    const baseOpacity = 1.0 + scrollBoost * 0.45 // Always visible (0.15), brighter when scrolling (up to 0.6)

    // Mouse-based lighting effect
    const normalizedX = (mousePosition.x / window.innerWidth) * 2 - 1
    const normalizedY = -(mousePosition.y / window.innerHeight) * 2 + 1

    // Calculate distance from mouse to center
    const mouseDistance = Math.sqrt(
      normalizedX * normalizedX + normalizedY * normalizedY
    )
    const brightness = Math.max(0, 1 - mouseDistance / 1.5)

    // Update material color based on mouse proximity
    const hue = 200 + brightness * 30
    const saturation = 80
    const lightness = 50 + brightness * 20
    materialRef.current.color.setHSL(
      hue / 360,
      saturation / 100,
      lightness / 100
    )
    // Opacity: always visible, enhanced by scroll and mouse
    materialRef.current.opacity = baseOpacity + brightness * 0.2
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial
        ref={materialRef}
        wireframe
        transparent
        color="#0055ff"
      />
    </mesh>
  )
}

export default function WireframeSphere({
  mousePosition,
  scrollY,
}: WireframeSphereProps) {
  return (
    <div className="r3f-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Sphere mousePosition={mousePosition} scrollY={scrollY} />
      </Canvas>
    </div>
  )
}

