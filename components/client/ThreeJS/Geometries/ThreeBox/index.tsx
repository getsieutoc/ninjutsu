'use client';
import { THREE } from '@/components/client/ThreeJS';
import { useRef, useState, useMemo } from '@/hooks';
import { useFrame } from '@react-three/fiber';

type ThreeBoxType = {
  wireframe?: boolean;
  color?: number | string;
  position?: THREE.Vector3;
  name?: string;
};
export function ThreeBox({
  wireframe,
  color,
  position = new THREE.Vector3(0, 0, 0),
  name,
}: ThreeBoxType) {
  const instanceRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef(null);
  const [isHovered, setIsHover] = useState(false);
  const [isRotate, setIsRotate] = useState(1);
  const [count, setCount] = useState(0);
  const geometry = useMemo(() => [new THREE.BoxGeometry(), new THREE.SphereGeometry(0.785)], []);

  useFrame((state, delta) => {
    instanceRef.current.rotation.x += delta * isRotate;
    instanceRef.current.rotation.y += 0.05 * delta * isRotate;
  });
  return (
    <mesh
      ref={instanceRef}
      position={position}
      name={name}
      onPointerDown={() => {
        setCount((count + 1) % 2);
      }}
      scale={isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onPointerOver={() => setIsHover(true)}
      onPointerOut={() => setIsHover(false)}
      geometry={geometry[count]}
    >
      <meshBasicMaterial
        ref={materialRef}
        color={isHovered ? color : 'green'}
        wireframe={wireframe}
      />
    </mesh>
  );
}
