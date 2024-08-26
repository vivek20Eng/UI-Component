import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

// Array of background image filenames
const backgroundImages = [
  "360-mountain.jpeg",
  "360-room.jpeg",
  "360-desert.jpeg",
  "360-spaceship.jpeg",
];

const ThreeDModel = () => {
  // Ref for the container element
  const mountRef = useRef(null);
  // State for container dimensions
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // Ref to store current mouse position
  const mousePosition = useRef({ x: 0, y: 0 });
  // State for current background image
  const [currentImageName, setCurrentImageName] = useState(backgroundImages[0]);
  // State to track if background is changing
  const [isChanging, setIsChanging] = useState(false);
  // Refs for custom cursor
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  // Effect to handle window resizing
  useEffect(() => {
    const updateDimensions = () => {
      if (mountRef.current) {
        setDimensions({
          width: mountRef.current.clientWidth,
          height: mountRef.current.clientHeight,
        });
      }
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Main effect for setting up and rendering the 3D scene
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    // Set up Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      100,
      dimensions.width / dimensions.height,
      0.1,
      1000
    );
    camera.position.z = 0.1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);

    // Create a background sphere for 360-degree image
    const textureLoader = new THREE.TextureLoader();
    const cityImageUrl = `/${currentImageName}`;

    const backgroundSphere = new THREE.Mesh(
      new THREE.SphereGeometry(500, 60, 40),
      new THREE.MeshBasicMaterial({ side: THREE.BackSide, color: 0xbbbbbb })
    );
    scene.add(backgroundSphere);

    // Function to update background texture with animation
    const updateBackgroundTexture = (newImageUrl) => {
      textureLoader.load(newImageUrl, (texture) => {
        gsap.to(backgroundSphere.material, {
          opacity: 0,
          duration: 1,
          onComplete: () => {
            backgroundSphere.material.map = texture;
            backgroundSphere.material.needsUpdate = true;
            gsap.to(backgroundSphere.material, {
              opacity: 1,
              duration: 1,
              onComplete: () => setIsChanging(false),
            });
          },
        });

        // Update environment map
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
      });
    };

    updateBackgroundTexture(cityImageUrl);

    // Create reflective material for spheres
    const reflectiveMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1,
    });

    // Create and animate multiple reflective spheres
    const spheres = [];
    for (let i = 0; i < 100; i++) {
      const radius = Math.random() * 0.5 + 0.1;
      const sphereGeometry = new THREE.SphereGeometry(radius, 20, 20);
      const sphere = new THREE.Mesh(sphereGeometry, reflectiveMaterial);

      sphere.position.set(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 2 - 2.5
      );

      spheres.push(sphere);
      scene.add(sphere);

      // Animate sphere movement
      gsap.to(sphere.position, {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        z: Math.random() * -15,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    // Add lighting to the scene
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 15, 15);
    scene.add(directionalLight);

    // Handle mouse movement for camera rotation and custom cursor
    const onMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };

      // Update custom cursor position
      if (cursorRef.current && cursorBorderRef.current) {
        cursorRef.current.style.left = `${event.clientX}px`;
        cursorRef.current.style.top = `${event.clientY}px`;
        cursorBorderRef.current.style.left = `${event.clientX}px`;
        cursorBorderRef.current.style.top = `${event.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    // Smooth rotation animation based on mouse position
    const updateRotation = () => {
      const targetX = (mousePosition.current.y * Math.PI) / 4;
      const targetY = (mousePosition.current.x * Math.PI) / 4;

      backgroundSphere.rotation.x +=
        (targetX - backgroundSphere.rotation.x) * 0.05;
      backgroundSphere.rotation.y +=
        (targetY - backgroundSphere.rotation.y) * 0.05;
      camera.rotation.x = -backgroundSphere.rotation.x;
      camera.rotation.y = -backgroundSphere.rotation.y;
    };

    // Add a particle system for a subtle effect
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xffffff,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      updateRotation();
      particleSystem.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [dimensions, currentImageName]);

  // Function to change background image
  const changeBackgroundImage = (newImage) => {
    if (isChanging) return;
    setIsChanging(true);
    setCurrentImageName(newImage);
  };

  // Render the 3D scene container and background selector cards
  return (
    <>
      {/* 3D scene container */}
      <div
        ref={mountRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      ></div>
      {/* Background selector cards */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 10,
        }}
      >
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            onClick={() => changeBackgroundImage(image)}
            style={{
              width: "60px",
              height: "60px",
              backgroundImage: `url(/${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "10px",
              cursor: isChanging ? "default" : "pointer",
              opacity: isChanging ? 0.5 : 1,
              border: currentImageName === image ? "3px solid white" : "none",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
          ></div>
        ))}
      </div>
      {/* Custom cursor with glass effect */}
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          backgroundColor: "white",
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
      <div
        ref={cursorBorderRef}
        style={{
          position: "fixed",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          border: "2px solid orange",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </>
  );
};

export default ThreeDModel;
