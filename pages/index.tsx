import type { NextPage } from 'next';
import { Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { VRButton, XR, Controllers, Hands } from '@react-three/xr';
import { OrbitControls } from '@react-three/drei';

const defaultStartPosition = new Vector3(0, 1.5, -1);

const StageContent = () => {
  return (
    <>
      <group position={defaultStartPosition}>
        <mesh>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>
    </>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <VRButton />
      <Canvas linear flat className="fixed left-0 right-0 top-0 bottom-0">
        <color attach="background" args={[0.2, 0.2, 0.2]} />

        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        <OrbitControls maxDistance={0.3} target={defaultStartPosition} />

        <XR>
          <Controllers rayMaterial={{ opacity: 0 }} />
          <Hands />
          <StageContent />
        </XR>
      </Canvas>
    </>
  );
};

export default Home;
