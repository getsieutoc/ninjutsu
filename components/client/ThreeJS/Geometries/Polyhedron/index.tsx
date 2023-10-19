'use client';
import { THREE } from '@/components/client';
import { useRef, useState, useMemo } from '@/hooks';
import { useFrame } from '@react-three/fiber';

type ThreeBoxType = {
  wireframe?: boolean;
  position?: THREE.Vector3;
  polyhedron: (THREE.BoxGeometry | THREE.SphereGeometry | THREE.DodecahedronGeometry)[];
};
export function Polyhedron({
  wireframe = true,
  polyhedron,
  position = new THREE.Vector3(0, 0, 0),
}: ThreeBoxType) {
  const instanceRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef(null);
  const [count, setCount] = useState(0);

  useFrame((state, delta) => {
    instanceRef.current.rotation.x += delta;
    instanceRef.current.rotation.y += 0.5 * delta;
  });
  return (
    <mesh
      ref={instanceRef}
      position={position}
      geometry={polyhedron[count]}
      onPointerDown={() => setCount((count + 1) % 3)}
    >
      <meshBasicMaterial ref={materialRef} color="lime" wireframe={wireframe} />
    </mesh>
  );
}
