import { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Stars = ({ count = 5000 }) => {
  const ref = useRef();
  
  // Generate random positions for the stars
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() * 2 - 1) * 10;     // x
      positions[i3 + 1] = (Math.random() * 2 - 1) * 10; // y
      positions[i3 + 2] = (Math.random() * 2 - 1) * 10; // z
    }
    return positions;
  });
  
  useFrame((state, delta) => {
    ref.current.rotation.x += delta / 10;
    ref.current.rotation.y += delta / 15;
  });
  
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={positions}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export default Stars;