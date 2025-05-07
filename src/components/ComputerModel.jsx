import { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Custom 3D computer model component
const ComputerModel = ({ isMobile }) => {
  // We'll replace this with an actual model later
  // For now, we're creating a simple 3D object
  const computerRef = useRef();
  
  // Animate the computer model
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    computerRef.current.rotation.y = Math.sin(t / 4) / 8;
    computerRef.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <mesh ref={computerRef} scale={isMobile ? 0.6 : 0.75} position={[0, -1, -1.5]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} intensity={1} />
      <boxGeometry args={[2, 1.2, 0.1]} />
      <meshStandardMaterial color="#333" />
      
      {/* Monitor Frame */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[1.9, 1.1, 0.05]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      
      {/* Screen */}
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[1.85, 1.05, 0.01]} />
        <meshStandardMaterial 
          color="#1e293b" 
          emissive="#3b82f6"
          emissiveIntensity={0.2}
          roughness={0.2}
        />
      </mesh>
      
      {/* Keyboard */}
      <mesh position={[0, -1.3, 0]}>
        <boxGeometry args={[1.5, 0.5, 0.1]} />
        <meshStandardMaterial color="#222" />
      </mesh>
    </mesh>
  );
};

export default ComputerModel;