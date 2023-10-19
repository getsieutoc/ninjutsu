'use client';

import { Polyhedron, THREE } from '@/components/client/ThreeJS';
import { useEffect, useState } from '@/hooks';
import { Box } from '@/components/chakra';
import { Canvas } from '@react-three/fiber';

export default function CakeEditor() {
  const [height, setHeight] = useState(400);
  const polyhedron = [
    new THREE.BoxGeometry(),
    new THREE.SphereGeometry(0.785398),
    new THREE.DodecahedronGeometry(0.785398),
  ];
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);
  return (
    <Box width="100%" height={height}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <Polyhedron position={new THREE.Vector3(-0.75, -0.75, 0)} polyhedron={polyhedron} />
        <Polyhedron position={new THREE.Vector3(0.75, -0.75, 0)} polyhedron={polyhedron} />
        <Polyhedron position={new THREE.Vector3(-0.75, 0.75, 0)} polyhedron={polyhedron} />
        <Polyhedron position={new THREE.Vector3(0.75, 0.75, 0)} polyhedron={polyhedron} />
      </Canvas>
    </Box>
  );
}
