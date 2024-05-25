import React, { useRef } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { Sphere, Box, Icosahedron, Cylinder, Cone, MeshDistortMaterial } from '@react-three/drei';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import helvetiker from 'three/examples/fonts/helvetiker_regular.typeface.json';

extend({ TextGeometry });

const AnimatedObject = ({ type, position, color, args, speedFactor }) => {
  const meshRef = useRef();
  const { mouse, clock } = useThree();
  const speed = Math.random() * 0.1 + speedFactor;

  useFrame(() => {
    const maxX = 1.5; // x축 최대 이동 범위를 1.5로 더 줄임
    const maxY = 1; // y축 최대 이동 범위 유지
    const minX = -3; // x축 최소 이동 범위 유지
    const minY = -3; // y축 최소 이동 범위 유지

    const targetX = (mouse.x * 5 - meshRef.current.position.x) * 0.05;
    const targetY = (-mouse.y * 5 - meshRef.current.position.y) * 0.05;

    meshRef.current.rotation.x += 0.01;
    meshRef.current.position.x = Math.max(minX, Math.min(maxX, meshRef.current.position.x + targetX));
    meshRef.current.position.y = Math.max(minY, Math.min(maxY, meshRef.current.position.y + targetY));

    // 도형 추가
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x += 0.01;
    meshRef.current.position.x = position[0] + Math.sin(t * speed) * 2; // 시간에 따라 X 위치 조정
    meshRef.current.position.y = position[1] + Math.cos(t * speed) * 2; // 시간에 따라 Y 위치 조정
  });

  const components = {
    Sphere: Sphere,
    Icosahedron: Icosahedron,
    Box: Box,
    Cylinder: Cylinder,
    Cone: Cone,
  };

  const Geometry = components[type];

  if (!Geometry) {
    console.error(`Unknown type: ${type}`);
    return null;
  }

  return (
    <Geometry ref={meshRef} args={args} position={position}>
      <MeshDistortMaterial color={color} distort={0.3} speed={2} />
    </Geometry>
  );
};

const Text3D = ({ text, position, color, fontSize }) => {
  const meshRef = useRef();
  const { mouse } = useThree();

  const fontLoader = new FontLoader();
  const font = fontLoader.parse(helvetiker);

  const textOptions = {
    font: font,
    size: fontSize,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.08,
    bevelOffset: 0,
    bevelSegments: 5,
  };

  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.position.x += (mouse.x * 5 - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (-mouse.y * 5 - meshRef.current.position.y) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <textGeometry args={[text, textOptions]} />
      <meshStandardMaterial metalness={0.9} roughness={0.1} emissive={color} />
    </mesh>
  );
};

const Slider = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        float: 'left',
      }}
    >
      <Canvas>
        <ambientLight intensity={0.9} />
        <pointLight position={[0, 0, 10]} color="#ffffff" intensity={1.5} />
        <pointLight position={[0, 10, 0]} color="#ffffff" intensity={0.7} />
        <Text3D text="Agile Hub" position={[0, -2, 0]} color="#FF1493" fontSize={1} metalness={0.1} roughness={0.5} />
        <directionalLight position={[0, 0, 10]} color="#ffffff" intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={0.1} intensity={2} color="#ffffff" />
      </Canvas>
    </div>
  );
};

export default Slider;
