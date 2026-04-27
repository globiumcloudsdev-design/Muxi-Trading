'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, Text, PresentationControls, ContactShadows, Environment, MeshDistortMaterial, Sphere } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function FloatingObjects() {
  const group = useRef();

  useFrame((state) => {
    group.current.rotation.y = state.clock.elapsedTime * 0.1;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 1, -2]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[2, 2, -1]}>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={0.9} />
        </mesh>
      </Float>
      
      <Float speed={3} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, -2, -3]}>
          <torusGeometry args={[1, 0.3, 16, 32]} />
          <meshStandardMaterial color="#ec4899" roughness={0.3} metalness={0.6} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <Sphere args={[0.6, 32, 32]} position={[3, -1, 1]}>
          <MeshDistortMaterial
            color="#0ea5e9"
            envMapIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            metalness={0.5}
            roughness={0.1}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
          
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 2]}
          >
            <FloatingObjects />
          </PresentationControls>
          
          <Environment preset="city" />
          <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
