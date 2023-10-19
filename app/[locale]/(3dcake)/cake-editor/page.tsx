'use client';

import { Polyhedron, THREE } from '@/components/client/ThreeJS';
import { useEffect, useMemo, useState } from '@/hooks';
import { Box } from '@/components/chakra';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

export default function CakeEditor() {
  const [height, setHeight] = useState(400);
  const polyhedron = useMemo(
    () => [
      new THREE.BoxGeometry(),
      new THREE.SphereGeometry(0.785398),
      new THREE.DodecahedronGeometry(0.785398),
    ],
    []
  );
  const options = useMemo(() => {
    return {
      x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
      visible: true,
      color: { value: 'lime' },
    };
  }, []);
  const pA = useControls('Polyhedron A', options);
  const pB = useControls('Polyhedron B', options);
  const color = useControls({
    value: '#33665d',
  });
  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);
  return (
    <Box width="100%" height={height}>
      <Canvas camera={{ position: [0, 3, 5] }}>
        <color attach="background" args={[color.value]} />
        <Polyhedron
          position={new THREE.Vector3(-1, 1, 0)}
          rotation={[pA.x, pA.y, pA.z]}
          visible={pA.visible}
          color={pA.color}
          polyhedron={polyhedron}
        />
        <Polyhedron
          position={[1, 1, 0]}
          rotation={[pB.x, pB.y, pB.z]}
          visible={pB.visible}
          color={pB.color}
          polyhedron={polyhedron}
        />
        <Stats showPanel={2} />
        <OrbitControls enableDamping={false} />
        <axesHelper args={[5]} />
        <gridHelper />
      </Canvas>
    </Box>
  );
}
