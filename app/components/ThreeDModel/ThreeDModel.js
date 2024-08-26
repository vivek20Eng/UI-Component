import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const ThreeDModel = () => {
  const mountRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mousePosition = useRef({ x: 0, y: 0 });

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

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

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
    renderer.toneMappingExposure = 0.5; // Reduced exposure to make the background darker
    renderer.outputEncoding = THREE.sRGBEncoding;
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const cityImageUrl =
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&h=1080&q=80";

    const backgroundSphere = new THREE.Mesh(
      new THREE.SphereGeometry(500, 60, 40),
      new THREE.MeshBasicMaterial({ side: THREE.BackSide, color: 0xbbbbbb }) // Slightly darkened color
    );
    scene.add(backgroundSphere);

    textureLoader.load(cityImageUrl, (texture) => {
      backgroundSphere.material.map = texture;
      backgroundSphere.material.needsUpdate = true;
    });

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    textureLoader.load(cityImageUrl, (texture) => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    });

    const reflectiveMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1,
    });

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

      gsap.to(sphere.position, {
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        z: Math.random() * -15 ,
        duration: 5 + Math.random() * 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Reduced intensity to decrease brightness
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); // Reduced intensity to decrease brightness
    directionalLight.position.set(10, 15, 15);
    scene.add(directionalLight);

    const onMouseMove = (event) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      backgroundSphere.rotation.y = (mousePosition.current.x * Math.PI) / 4;
      backgroundSphere.rotation.x = (mousePosition.current.y * Math.PI) / 4;
      camera.rotation.y = -backgroundSphere.rotation.y;
      camera.rotation.x = -backgroundSphere.rotation.x;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [dimensions]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Ensure it's behind the content
      }}
    ></div>
  );
};

export default ThreeDModel;
