'use client';

import { Floor, Lights, Polyhedron, THREE } from '@/components/client/ThreeJS';
import { useEffect, useState } from '@/hooks';
import { Box } from '@/components/chakra';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';

export default function CakeEditor() {
  const [height, setHeight] = useState(400);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);
  return (
    <Box width="100%" height={height}>
      <Canvas camera={{ position: [0, 3, 5] }} shadows>
        <Lights />
        <Polyhedron
          name="meshBasicMaterial"
          position={[-3, 1, 0]}
          material={new THREE.MeshBasicMaterial({ color: 'yellow' })}
        />
        <Polyhedron
          name="meshNormalMaterial"
          position={[-1, 1, 0]}
          material={new THREE.MeshNormalMaterial()}
        />
        <Polyhedron
          name="meshPhongMaterial"
          position={[1, 1, 0]}
          material={new THREE.MeshPhongMaterial({ color: 'lime', flatShading: true })}
        />
        <Polyhedron
          name="meshStandardMaterial"
          position={[3, 1, 0]}
          material={
            new THREE.MeshStandardMaterial({
              color: 0xff0033,
              flatShading: true,
            })
          }
        />
        <Floor />
        <OrbitControls />
        <axesHelper args={[5]} />
        <gridHelper />
        <Stats showPanel={2} />
      </Canvas>
    </Box>
  );
}
