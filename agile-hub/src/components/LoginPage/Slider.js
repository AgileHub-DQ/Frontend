import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, TorusKnot, Icosahedron, MeshDistortMaterial, Box } from '@react-three/drei';
import * as THREE from 'three';

// 애니메이션 구체
const AnimatedObject = ({ type, position, color, args, speedFactor, orbitRadius }) => {
  const meshRef = useRef();
  const speed = Math.random() * 0.1 + speedFactor;
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // 각 객체의 이동 경로를 수정하여 서로 겹치지 않도록 합니다.
    meshRef.current.position.x = Math.sin(t * speed) * orbitRadius;
    meshRef.current.position.y = Math.cos(t * speed) * orbitRadius;
    meshRef.current.rotation.x = t * speed;
    meshRef.current.rotation.y = t * speed;
  });

  const components = {
    Sphere: Sphere,
    TorusKnot: TorusKnot,
    Icosahedron: Icosahedron,
    Box: Box
  };
  
  const Geometry = components[type];

  return (
    <Geometry ref={meshRef} args={args} position={position}>
      <MeshDistortMaterial color={color} distort={0.3} speed={2} />
    </Geometry>
  );
};

const Slider = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#E0F2F1' }}>
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} color="#FFFFFF" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#FFFFFF" intensity={1} />
        <AnimatedObject type="Sphere" position={[0, 0, 0]} color="#B2EBF2" args={[1, 32, 32]} speedFactor={0.05} orbitRadius={5} />
        <AnimatedObject type="TorusKnot" position={[0, 0, 0]} color="#FFCDD2" args={[1, 0.4, 100, 16]} speedFactor={0.04} orbitRadius={4} />
        <AnimatedObject type="Icosahedron" position={[0, 0, 0]} color="#4DD0E1" args={[1, 0]} speedFactor={0.06} orbitRadius={3} />
      </Canvas>
    </div>
  );
};
 

export default Slider;
     