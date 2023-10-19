'use client';
import { THREE } from '@/components/client';
import { useRef } from '@/hooks';
import { MeshProps, useFrame } from '@react-three/fiber';

type PolyhedronType = MeshProps;
export function Polyhedron(props: PolyhedronType) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    ref.current.rotation.x += 0.2 * delta;
    ref.current.rotation.y += 0.05 * delta;
  });

  return (
    <mesh {...props} ref={ref} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 1]} />
    </mesh>
  );
}
