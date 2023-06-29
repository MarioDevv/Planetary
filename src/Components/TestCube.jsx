import React, { useRef } from 'react';
import * as THREE from 'three';

const TestCube = () => {

    const canvasRef = useRef(null);

    React.useEffect(() => {

        // Create a scene
        const scene = new THREE.Scene();

        // Create a geometry
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        // Create a material
        const material = new THREE.MeshPhongMaterial({
            color: 0x00ff00, // green color
            specular: 0xaaaaaa,
            shininess: 30
        });

        // Create a mesh
        const cube = new THREE.Mesh(geometry, material);

        // Add the cube to the scene
        scene.add(cube);

        // Create lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

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

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the cube
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;

            // Render the scene with the camera
            renderer.render(scene, camera);
        };
        animate();
    }, []);

    return (
        <>
            <canvas ref={canvasRef}  />
        </>
    );
}

export default TestCube;