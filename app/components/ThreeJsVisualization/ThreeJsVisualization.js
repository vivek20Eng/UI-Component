"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from './ThreeJsVisualization.module.css';

const ThreeJsVisualization = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Set up the Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.offsetWidth / containerRef.current.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Add a cube to the scene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    // Animate the cube
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Clean up the scene on component unmount
    return () => {
      scene.remove(cube);
      renderer.dispose();
    };
  }, []);

  return <div className={styles.threeJsContainer} ref={containerRef} />;
};

export default ThreeJsVisualization;