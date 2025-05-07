import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0; /* Changed from -1 to 0 to ensure proper rendering */
  background: transparent;
  pointer-events: none; /* Ensure canvas doesn't block interaction */
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  
  span {
    display: block;
    width: 20px;
    height: 20px;
    border: 3px solid ${props => props.theme.colors.secondary};
    border-top: 3px solid ${props => props.theme.colors.primary};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ThreeCanvas = ({ children, camera = {}, controls = true, style = {} }) => {
  return (
    <CanvasContainer>
      <Canvas
        frameloop="demand"
        shadows
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 1000, ...camera }}
        gl={{ 
          preserveDrawingBuffer: true, 
          alpha: true,
          antialias: true,
          clearColor: [0, 0, 0, 0],
          premultipliedAlpha: false
        }}
        style={{ background: 'transparent', pointerEvents: 'auto', ...style }}
      >
        <Suspense fallback={<Loader><span></span></Loader>}>
          {children}
          
          {controls && (
            <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          )}
        </Suspense>
        
        <Preload all />
      </Canvas>
    </CanvasContainer>
  );
};

export default ThreeCanvas;