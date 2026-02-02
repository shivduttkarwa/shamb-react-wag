import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ArchitecturalBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const objectsRef = useRef<THREE.Mesh[]>([]);
  const frameIdRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xe8f0e5, 20, 100);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 35);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Enhanced Lighting - reduced intensity for subtlety
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x6b8e5f, 0.6);
    mainLight.position.set(10, 10, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    scene.add(mainLight);

    const accentLight1 = new THREE.PointLight(0xe67e22, 0.4, 50);
    accentLight1.position.set(-10, 5, 5);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x6b8e5f, 0.3, 50);
    accentLight2.position.set(10, -5, -5);
    scene.add(accentLight2);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.25);
    rimLight.position.set(-5, 0, -10);
    scene.add(rimLight);

    // Enhanced Materials with better aesthetics - reduced visibility
    const createGlassMaterial = (color: number, opacity: number) => {
      return new THREE.MeshPhysicalMaterial({
        color: color,
        transparent: true,
        opacity: opacity * 0.5, // Reduced visibility
        roughness: 0.1,
        metalness: 0.3,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
        envMapIntensity: 1.5,
      });
    };

    const createMetallicMaterial = (color: number, opacity: number) => {
      return new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: opacity * 0.5, // Reduced visibility
        roughness: 0.3,
        metalness: 0.8,
        emissive: color,
        emissiveIntensity: 0.1, // Reduced glow
      });
    };

    const createWireMaterial = (color: number) => {
      return new THREE.MeshBasicMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.2, // Reduced visibility
      });
    };

    const greenGlass = createGlassMaterial(0x6b8e5f, 0.5);
    const goldGlass = createGlassMaterial(0xe67e22, 0.45);
    const greenMetallic = createMetallicMaterial(0x6b8e5f, 0.6);
    const goldMetallic = createMetallicMaterial(0xe67e22, 0.55);
    const wireGreen = createWireMaterial(0x40513b);
    const wireGold = createWireMaterial(0xe67e22);

    // Create sophisticated architectural objects - reduced by 50% and more scattered
    const objects: THREE.Mesh[] = [];
    const materials = [greenGlass, goldGlass, greenMetallic, goldMetallic, wireGreen, wireGold];

    // Wider distribution range
    const spreadX = 80;
    const spreadY = 50;
    const spreadZ = 60;

    // Modern skyscrapers with glass facades (reduced from 5 to 3)
    for (let i = 0; i < 3; i++) {
      const width = Math.random() * 1.5 + 0.8;
      const height = Math.random() * 8 + 4;
      const depth = Math.random() * 1.5 + 0.8;
      const geometry = new THREE.BoxGeometry(width, height, depth, 2, 4, 2);
      const material = i % 2 === 0 ? greenGlass : goldGlass;
      const building = new THREE.Mesh(geometry, material);

      building.position.x = (Math.random() - 0.5) * spreadX;
      building.position.y = (Math.random() - 0.5) * spreadY;
      building.position.z = (Math.random() - 0.5) * spreadZ;

      building.rotation.x = (Math.random() - 0.5) * 0.3;
      building.rotation.y = Math.random() * Math.PI * 2;
      building.rotation.z = (Math.random() - 0.5) * 0.2;

      building.castShadow = true;
      building.receiveShadow = true;

      scene.add(building);
      objects.push(building);
    }

    // Geodesic domes (reduced from 4 to 2)
    for (let i = 0; i < 2; i++) {
      const radius = Math.random() * 2 + 1.5;
      const geometry = new THREE.IcosahedronGeometry(radius, 1);
      const material = i % 2 === 0 ? wireGreen : greenGlass;
      const dome = new THREE.Mesh(geometry, material);

      dome.position.x = (Math.random() - 0.5) * spreadX;
      dome.position.y = (Math.random() - 0.5) * spreadY;
      dome.position.z = (Math.random() - 0.5) * spreadZ;

      dome.castShadow = true;

      scene.add(dome);
      objects.push(dome);
    }

    // Abstract architectural pyramids (reduced from 4 to 2)
    for (let i = 0; i < 2; i++) {
      const size = Math.random() * 3 + 2;
      const geometry = new THREE.TetrahedronGeometry(size, 0);
      const material = goldMetallic;
      const pyramid = new THREE.Mesh(geometry, material);

      pyramid.position.x = (Math.random() - 0.5) * spreadX;
      pyramid.position.y = (Math.random() - 0.5) * spreadY;
      pyramid.position.z = (Math.random() - 0.5) * spreadZ;

      pyramid.rotation.x = Math.random() * Math.PI;
      pyramid.rotation.y = Math.random() * Math.PI;

      pyramid.castShadow = true;

      scene.add(pyramid);
      objects.push(pyramid);
    }

    // Modern columns (reduced from 4 to 2)
    for (let i = 0; i < 2; i++) {
      const radius = Math.random() * 0.6 + 0.3;
      const height = Math.random() * 6 + 3;
      const geometry = new THREE.CylinderGeometry(radius, radius * 0.8, height, 12);
      const material = greenMetallic;
      const column = new THREE.Mesh(geometry, material);

      column.position.x = (Math.random() - 0.5) * spreadX;
      column.position.y = (Math.random() - 0.5) * spreadY;
      column.position.z = (Math.random() - 0.5) * spreadZ;

      column.rotation.x = (Math.random() - 0.5) * 0.5;
      column.rotation.z = (Math.random() - 0.5) * 0.5;

      column.castShadow = true;

      scene.add(column);
      objects.push(column);
    }

    // Toroid structures (reduced from 3 to 2)
    for (let i = 0; i < 2; i++) {
      const geometry = new THREE.TorusGeometry(2.5, 0.4, 16, 32);
      const material = wireGold;
      const torus = new THREE.Mesh(geometry, material);

      torus.position.x = (Math.random() - 0.5) * spreadX;
      torus.position.y = (Math.random() - 0.5) * spreadY;
      torus.position.z = (Math.random() - 0.5) * spreadZ;

      scene.add(torus);
      objects.push(torus);
    }

    // Dodecahedrons (reduced from 3 to 2)
    for (let i = 0; i < 2; i++) {
      const geometry = new THREE.DodecahedronGeometry(2, 0);
      const material = goldGlass;
      const dodeca = new THREE.Mesh(geometry, material);

      dodeca.position.x = (Math.random() - 0.5) * spreadX;
      dodeca.position.y = (Math.random() - 0.5) * spreadY;
      dodeca.position.z = (Math.random() - 0.5) * spreadZ;

      dodeca.castShadow = true;

      scene.add(dodeca);
      objects.push(dodeca);
    }

    // Wireframe cubes (reduced from 4 to 2)
    for (let i = 0; i < 2; i++) {
      const size = Math.random() * 3 + 2;
      const geometry = new THREE.BoxGeometry(size, size, size);
      const material = wireGreen;
      const cube = new THREE.Mesh(geometry, material);

      cube.position.x = (Math.random() - 0.5) * spreadX;
      cube.position.y = (Math.random() - 0.5) * spreadY;
      cube.position.z = (Math.random() - 0.5) * spreadZ;

      cube.rotation.x = Math.random() * Math.PI;
      cube.rotation.y = Math.random() * Math.PI;

      scene.add(cube);
      objects.push(cube);
    }

    objectsRef.current = objects;

    // Animation velocities and properties for each object
    const objectData = objects.map(() => ({
      baseX: 0,
      baseY: 0,
      baseZ: 0,
      velX: (Math.random() - 0.5) * 0.015,
      velY: (Math.random() - 0.5) * 0.015,
      velZ: (Math.random() - 0.5) * 0.008,
      rotX: (Math.random() - 0.5) * 0.008,
      rotY: (Math.random() - 0.5) * 0.008,
      rotZ: (Math.random() - 0.5) * 0.005,
      mouseInfluence: Math.random() * 0.5 + 0.3,
    }));

    // Store initial positions
    objects.forEach((obj, index) => {
      objectData[index].baseX = obj.position.x;
      objectData[index].baseY = obj.position.y;
      objectData[index].baseZ = obj.position.z;
    });

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Smooth mouse interpolation
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      const time = Date.now() * 0.001;

      // Animate each object
      objects.forEach((obj, index) => {
        const data = objectData[index];

        // Base movement with sine wave for smooth floating
        const floatX = Math.sin(time * 0.3 + index) * 0.5;
        const floatY = Math.cos(time * 0.4 + index) * 0.5;
        const floatZ = Math.sin(time * 0.2 + index) * 0.3;

        // Mouse influence - objects react to mouse movement
        const mouseInfluenceX = mouseRef.current.x * 8 * data.mouseInfluence;
        const mouseInfluenceY = mouseRef.current.y * 8 * data.mouseInfluence;

        // Update base position
        data.baseX += data.velX;
        data.baseY += data.velY;
        data.baseZ += data.velZ;

        // Apply all movements
        obj.position.x = data.baseX + floatX + mouseInfluenceX;
        obj.position.y = data.baseY + floatY + mouseInfluenceY;
        obj.position.z = data.baseZ + floatZ;

        // Smooth rotation with mouse influence
        obj.rotation.x += data.rotX + mouseRef.current.y * 0.002;
        obj.rotation.y += data.rotY + mouseRef.current.x * 0.002;
        obj.rotation.z += data.rotZ;

        // Wrap around boundaries with smooth transition - wider boundaries
        if (Math.abs(data.baseX) > 50) {
          data.baseX = -data.baseX * 0.7;
          data.velX *= -0.8;
        }
        if (Math.abs(data.baseY) > 35) {
          data.baseY = -data.baseY * 0.7;
          data.velY *= -0.8;
        }
        if (Math.abs(data.baseZ) > 40) {
          data.baseZ = -data.baseZ * 0.7;
          data.velZ *= -0.8;
        }
      });

      // Camera movement based on mouse with smooth parallax
      camera.position.x = mouseRef.current.x * 3;
      camera.position.y = mouseRef.current.y * 2;
      camera.lookAt(0, 0, 0);

      // Subtle camera rotation
      camera.rotation.z = Math.sin(time * 0.1) * 0.02;

      // Animate lights for dynamic effect
      accentLight1.position.x = Math.sin(time * 0.5) * 15;
      accentLight1.position.y = Math.cos(time * 0.3) * 10;

      accentLight2.position.x = Math.cos(time * 0.4) * 15;
      accentLight2.position.y = Math.sin(time * 0.5) * 10;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameIdRef.current);

      // Dispose of geometries and materials
      objectsRef.current.forEach((obj) => {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((mat) => mat.dispose());
        } else {
          obj.material.dispose();
        }
      });

      rendererRef.current?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

export default ArchitecturalBackground;
