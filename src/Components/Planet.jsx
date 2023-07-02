import React, { useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const TestCube = () => {

    const canvasRef = useRef(null);

    React.useEffect(() => {
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xfeffff);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        const orbit = new OrbitControls(camera, renderer.domElement);
        camera.position.set(6, 8, 14);
        orbit.update();

        const gridHelper = new THREE.GridHelper(12, 12);
        scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(4);
        scene.add(axesHelper);

        function animate() {
            renderer.render(scene, camera);
        }

        renderer.setAnimationLoop(animate);

        let resizeTimer;

        function handleWindowResize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }, 200); // Adjust the timer delay according to your needs
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            // Clean up on unmount
            window.removeEventListener('resize', handleWindowResize);

            // Dispose of resources
            renderer.dispose();

            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach((material) => material.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
                if (object.texture) object.texture.dispose();
            });
        };
    }, []);



    return (
        <>
            <canvas ref={canvasRef} />
        </>
    );
}

export default TestCube;