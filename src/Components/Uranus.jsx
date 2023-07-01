import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function Uranus() {


    const canvasRef = useRef(null);

    useEffect(() => {

        // Create a scene
        const scene = new THREE.Scene();

        // Create a geometry
        const geometry = new THREE.SphereGeometry(1, 32, 32);

        // Create a material
        const material = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa, // green color
            // wireframe: true 
            // specular: 0xaaaaaa,
            // shininess: 30
        });

        // Create a mesh
        const sphere = new THREE.Mesh(geometry, material);

        // Add the sphere to the scene
        scene.add(sphere);

        // Create lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Create a directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);

        // Create a camera
        const camera = new THREE.PerspectiveCamera(
            75, // field of view
            window.innerWidth / window.innerHeight, // aspect ratio
            0.1, // near clipping plane
            1000 // far clipping plane
        );
        camera.position.z = 5;

        // Set up a renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;

            // After making changes to aspect
            camera.updateProjectionMatrix();
        });
        
        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the sphere
            sphere.rotation.y += 0.01;

            // Render the scene with the camera
            renderer.render(scene, camera);
        };
        animate();

    }, []);

    return (
        <>
            <canvas ref={canvasRef} />
        </>
    );
}

export default Uranus