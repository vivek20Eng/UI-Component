import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeJSBackground = () => {
  const mountRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    const pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(50, 50, 50);
    pointLight.castShadow = true;
    scene.add(ambientLight, pointLight);

    // Stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
    const starVertices = [];
    for (let i = 0; i < 15000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.05 });
    const particlePositions = new Float32Array(1000 * 3);

    for (let i = 0; i < particlePositions.length; i += 3) {
      particlePositions[i] = Math.random() * 20 - 10;
      particlePositions[i + 1] = Math.random() * 20 - 10;
      particlePositions[i + 2] = Math.random() * 20 - 10;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 15;

    // Handle scroll
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrollY(scrollTop / (document.documentElement.scrollHeight - window.innerHeight));
    };

    window.addEventListener('scroll', onScroll);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      stars.rotation.y += 0.0002;
      particles.rotation.y += 0.001;

      const positions = particles.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.01;
        if (positions[i] > 10) {
          positions[i] = -10;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Scroll-based animation for particles
      gsap.to(particles.position, {
        x: scrollY * 10,
        y: Math.sin(scrollY * Math.PI * 2) * 5,
        z: Math.cos(scrollY * Math.PI * 2) * 5,
        duration: 1,
        ease: 'power1.inOut',
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [scrollY]);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default ThreeJSBackground;
