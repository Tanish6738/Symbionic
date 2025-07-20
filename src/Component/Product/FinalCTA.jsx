import React, { useRef, useLayoutEffect, Suspense, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';


function AnimatedSphere() {
  const mesh = useRef();
  const { scale } = useSpring({
    loop: true,
    to: [{ scale: 1.1 }, { scale: 1 }],
    from: { scale: 1 },
    config: { duration: 3000 },
  });

  useFrame((state) => {
    mesh.current.rotation.y += 0.003;
    mesh.current.rotation.x += 0.001;
  });

  return (
    <a.mesh ref={mesh} scale={scale}>
      <sphereGeometry args={[1.8, 64, 64]} />
      <meshStandardMaterial color="#10B981" roughness={0.2} metalness={1} />
    </a.mesh>
  );
}

function AnimatedGear({
  position,
  scale = 1,
  color = "#FFB84D",
  rotationSpeed = 0.02,
}) {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.z += rotationSpeed;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={mesh}>
        <cylinderGeometry args={[1.2, 1.2, 0.3, 16]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.8} />
        {/* Gear teeth */}
        {Array.from({ length: 16 }).map((_, i) => (
          <mesh
            key={i}
            rotation={[0, (i * Math.PI) / 8, 0]}
            position={[1.3, 0, 0]}
          >
            <boxGeometry args={[0.25, 0.8, 0.3]} />
            <meshStandardMaterial
              color={color}
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>
        ))}
        {/* Center hole */}
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.35, 16]} />
          <meshStandardMaterial
            color="#2D3748"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
      </mesh>
    </group>
  );
}

function VerticalSpiral({
  position = [8, 0, 0],
  turns = 5,
  color = "#111111",
}) {
  const points = [];
  const height = 8; // Full height in canvas units
  const radius = 0.4; // Spiral coil radius

  for (let i = 0; i <= turns * 20; i++) {
    const t = i / 20;
    const angle = t * Math.PI * 2;
    const y = (t / turns) * height - height / 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    points.push([x, y, z]);
  }

  return (
    <group position={position}>
      <mesh>
        {/* Increased tube radius from 0.05 → 0.15 for thicker spiral */}
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3(
              points.map((p) => new THREE.Vector3(...p))
            ),
            1000,
            0.15, // thickness
            12, // radial segments
            false,
          ]}
        />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.6} />
      </mesh>
    </group>
  );
}

function AnimatedSpring({ position, scale = 1, color = "#E53E3E" }) {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <group ref={mesh} position={position} scale={scale}>
      {/* Spring coils */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, i * 0.2 - 1.2, 0]}
          rotation={[0, i * 0.3, 0]}
        >
          <torusGeometry args={[0.4, 0.08, 8, 16]} />
          <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
        </mesh>
      ))}
      {/* Top and bottom plates */}
      <mesh position={[0, 1.4, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 16]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.15, 16]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
}

function AnimatedChain({ position, scale = 1, color = "#718096" }) {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.005;
      mesh.current.rotation.z += 0.008;
    }
  });

  return (
    <group ref={mesh} position={position} scale={scale}>
      {/* Chain links */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group
          key={i}
          position={[0, i * 0.4 - 1.4, 0]}
          rotation={[0, i * 0.5, 0]}
        >
          {/* Outer ring */}
          <mesh>
            <torusGeometry args={[0.3, 0.06, 8, 16]} />
            <meshStandardMaterial
              color={color}
              roughness={0.6}
              metalness={0.8}
            />
          </mesh>
          {/* Inner connector */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.04, 6, 12]} />
            <meshStandardMaterial
              color={color}
              roughness={0.6}
              metalness={0.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function AnimatedCornerSphere({ position, scale = 1, color = "#9F7AEA" }) {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.015;
      mesh.current.rotation.x += 0.008;
    }
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.3} metalness={0.7} />
    </mesh>
  );
}


function CosmicOrb({ position = [0, 0, 0], scale = 1 }) {
  const mesh = useRef();
  const glow = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      mesh.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      mesh.current.position.y = position[1] + Math.sin(t * 2) * 0.1;
    }
    if (glow.current) {
      glow.current.material.opacity = 0.4 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <group scale={scale}>
      {/* Outer glow */}
      <mesh ref={glow} position={position}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.5} />
      </mesh>

      {/* Inner orb with wobble and sparkle */}
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshWobbleMaterial
          color="#C084FC"
          factor={0.5}
          speed={1}
          metalness={0.8}
          roughness={0.2}
          emissive={"#E9D5FF"}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Sparkles floating around the orb */}
      <Sparkles
        count={80}
        scale={[2.5, 2.5, 2.5]}
        size={6}
        color={"#FFFFFF"}
        speed={1.5}
        noise={1}
      />
    </group>
  );
}

function SolidSpiral({
  position = [0, 0, 0],
  turns = 5,
  height = 8,
  radius = 0.4,
  tubeRadius = 0.15,
  colorStops = ["#ff0080", "#7928ca"],
  inclination = 0, // in degrees
  fixed = true,
}) {
  const meshRef = useRef();

  const inclinationRad = (inclination * Math.PI) / 180;

  const { geometry, originalPositions, colors } = useMemo(() => {
    const points = [];
    const totalPoints = turns * 20;

    for (let i = 0; i <= totalPoints; i++) {
      const t = i / 20;
      const angle = t * Math.PI * 2;
      const y = (t / turns) * height - height / 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      points.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const spiralGeometry = new THREE.TubeGeometry(
      curve,
      1000,
      tubeRadius,
      12,
      false
    ).toNonIndexed();

    const posAttr = spiralGeometry.getAttribute("position");
    const ori = posAttr.clone();

    const colors = new Float32Array(posAttr.count * 4);
    const gradient = colorStops.map((c) => new THREE.Color(c));

    for (let i = 0; i < posAttr.count; i++) {
      const t = i / posAttr.count;
      const color =
        gradient.length > 1
          ? gradient[0].clone().lerp(gradient[1], t)
          : gradient[0];
      colors.set([color.r, color.g, color.b, 1.0], i * 4);
    }

    spiralGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 4));

    return {
      geometry: spiralGeometry,
      originalPositions: ori.array,
      colors,
    };
  }, [turns, height, radius, tubeRadius, colorStops]);

  useFrame(({ clock }) => {
    if (fixed) return;

    const t = clock.getElapsedTime() * 1000;
    const posAttr = meshRef.current.geometry.getAttribute("position");
    const colAttr = meshRef.current.geometry.getAttribute("color");

    const posArray = posAttr.array;
    const colArray = colAttr.array;

    for (let i = 0; i < posArray.length / 3; i++) {
      const offset = i * 3;
      const ox = originalPositions[offset];
      const oy = originalPositions[offset + 1];
      const oz = originalPositions[offset + 2];

      const wave = Math.sin(t * 0.001 + i * 0.1) * 0.05;

      posArray[offset] = ox;
      posArray[offset + 1] = oy + wave;
      posArray[offset + 2] = oz;

      colArray[i * 4 + 3] = 0.9 + 0.1 * Math.sin(t * 0.001 + i * 0.2);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    meshRef.current.rotation.y = t / 4000;
  });

  return (
    <group position={position} rotation={[inclinationRad, 0, 0]}>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          vertexColors
          roughness={0.4}
          metalness={0.5}
          transparent
        />
      </mesh>
    </group>
  );
}

function ExplodingTorus({ position = [0, 0, 0], color = "royalblue" }) {
  const meshRef = useRef();

  const { geometry, originalPositions, normals, colors } = useMemo(() => {
    const geo = new THREE.TorusGeometry(2, 0.5, 6, 16).toNonIndexed();

    const posAttr = geo.getAttribute("position");
    const normAttr = geo.getAttribute("normal");

    const ori = posAttr.clone();
    const normals = normAttr.clone();
    const colors = new Float32Array(posAttr.count * 4);

    for (let i = 0; i < posAttr.count; i++) {
      colors.set([0.3, 1.0, 0.5, 1.0], i * 4); // RGB + Alpha
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 4));

    return {
      geometry: geo,
      originalPositions: ori.array,
      normals: normals.array,
      colors: colors,
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 1000;
    const posAttr = meshRef.current.geometry.getAttribute("position");
    const colAttr = meshRef.current.geometry.getAttribute("color");

    const posArray = posAttr.array;
    const colArray = colAttr.array;

    for (let i = 0; i < posArray.length / 3; i++) {
      const triIndex = Math.floor(i / 6); // Each triangle = 6 vertices in non-indexed
      const offset = i * 3;
      const normalOffset = i * 3;
      const oriOffset = offset;

      const dist = (Math.sin(t / 200 + triIndex * triIndex) * 0.5 + 0.5) / 5;

      const nx = normals[normalOffset];
      const ny = normals[normalOffset + 1];
      const nz = normals[normalOffset + 2];

      const ox = originalPositions[oriOffset];
      const oy = originalPositions[oriOffset + 1];
      const oz = originalPositions[oriOffset + 2];

      posArray[offset] = ox + nx * dist;
      posArray[offset + 1] = oy + ny * dist;
      posArray[offset + 2] = oz + nz * dist;

      colArray[i * 4 + 3] = 1 - 4 * dist; // alpha channel
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    meshRef.current.rotation.x = t / 3000;
    meshRef.current.rotation.y = t / 2000;
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshPhongMaterial
        vertexColors={true}
        flatShading={true}
        side={THREE.DoubleSide}
        transparent
        shininess={510}
        color={color}
      />
    </mesh>
  );
}

function NebulaBloomSphere({ position = [0, 0, 0], color = "violet" }) {
  const meshRef = useRef();

  const { geometry, originalPositions, normals, colors } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 4).toNonIndexed(); // More detail than a sphere

    const posAttr = geo.getAttribute("position");
    const normAttr = geo.getAttribute("normal");

    const ori = posAttr.clone();
    const normals = normAttr.clone();
    const colors = new Float32Array(posAttr.count * 4);

    for (let i = 0; i < posAttr.count; i++) {
      const hue = (i / posAttr.count) * 360;
      const color = new THREE.Color(`hsl(${hue}, 100%, 70%)`);
      colors.set([color.r, color.g, color.b, 1.0], i * 4);
    }

    geo.setAttribute("color", new THREE.BufferAttribute(colors, 4));

    return {
      geometry: geo,
      originalPositions: ori.array,
      normals: normals.array,
      colors: colors,
    };
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 1000;
    const posAttr = meshRef.current.geometry.getAttribute("position");
    const colAttr = meshRef.current.geometry.getAttribute("color");

    const posArray = posAttr.array;
    const colArray = colAttr.array;

    for (let i = 0; i < posArray.length / 3; i++) {
      const offset = i * 3;
      const nx = normals[offset];
      const ny = normals[offset + 1];
      const nz = normals[offset + 2];
      const ox = originalPositions[offset];
      const oy = originalPositions[offset + 1];
      const oz = originalPositions[offset + 2];

      const pulsate =
        Math.sin(t * 0.001 + i * 0.05) * 0.2 +
        Math.sin(i * 0.1 + t * 0.0003) * 0.1;

      posArray[offset] = ox + nx * pulsate;
      posArray[offset + 1] = oy + ny * pulsate;
      posArray[offset + 2] = oz + nz * pulsate;

      colArray[i * 4 + 3] = 0.6 + 0.4 * Math.sin(t * 0.001 + i * 0.1); // Breathing alpha
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    meshRef.current.rotation.x = t / 4000;
    meshRef.current.rotation.y = t / 2500;
    meshRef.current.rotation.z = t / 7000;
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial
        vertexColors
        flatShading
        transparent
        emissive={new THREE.Color(color)}
        emissiveIntensity={1}
        metalness={0.5}
        roughness={0.3}
      />
    </mesh>
  );
}
const FinalCTA = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1.2} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4299E1" />
          <Suspense fallback={null}>
            {/* <InclinedSpiral position={[0, 0, 0]} turns={5} angle={Math.PI / 4} /> */}
            <SolidSpiral position={[-6 , 0, 0]} colorStops={["#ff0080", "#7928ca"]} />
            <Environment preset="studio" />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 h-full w-full flex items-center justify-center text-white ">
        <div className="text-center max-w-4xl px-8">
          <h2 className="text-6xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-2xl mb-8 text-gray-300">
            Join thousands of companies already using our products to transform their business
          </p>
          <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors duration-300">
            Start Your Journey
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA