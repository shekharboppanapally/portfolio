import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, Center } from '@react-three/drei';
import * as THREE from 'three';

const FloatingText = ({ 
  words = ['React', 'Three.js', 'JavaScript', 'Vite', 'CSS', 'Frontend'], 
  size = 0.5, 
  height = 0.2, 
  color = '#915EFF',
  hoverColor = '#00FFFF' 
}) => {
  const groupRef = useRef();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [textPositions, setTextPositions] = useState([]);
  
  // Calculate positions in a circular pattern
  useEffect(() => {
    const radius = 5;
    const angleStep = (2 * Math.PI) / words.length;
    const positions = words.map((_, index) => {
      const angle = index * angleStep;
      return {
        x: radius * Math.cos(angle),
        y: (Math.random() - 0.5) * 2, // Random vertical offset
        z: radius * Math.sin(angle),
        rotationY: angle
      };
    });
    setTextPositions(positions);
  }, [words]);
  
  // Animate the group
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <group ref={groupRef}>
      {words.map((word, index) => (
        <Float 
          key={index}
          speed={1.5} 
          rotationIntensity={0.2} 
          floatIntensity={0.5}
          position={[textPositions[index]?.x || 0, textPositions[index]?.y || 0, textPositions[index]?.z || 0]}
        >
          <Center rotation={[0, textPositions[index]?.rotationY || 0, 0]}>
            <Text
              fontSize={size}
              color={hoveredIndex === index ? hoverColor : color}
              // Use a font path that exists
              font="/fonts/inter_bold.json"
              anchorX="center"
              anchorY="middle"
              onPointerOver={() => setHoveredIndex(index)}
              onPointerOut={() => setHoveredIndex(null)}
              outlineWidth={0.02}
              outlineColor={hoveredIndex === index ? color : "transparent"}
            >
              {word}
            </Text>
          </Center>
        </Float>
      ))}
    </group>
  );
};

export default FloatingText;