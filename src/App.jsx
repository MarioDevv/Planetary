import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './index.css';
import { PlanetContext } from './Context/PlanetContext';

// Images
import sunTexture from './Textures/Sun.jpg';
import alpineTexture from './Textures/Alpine.png';
import savanaTexture from './Textures/Savannah.png';
import tropicalTexture from './Textures/Tropical.png';

function App() {
  const canvasRef = React.useRef(null);
  const { createPlanet, addStar } = React.useContext(PlanetContext);

  React.useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x00000);

    // Create Scene
    const scene = new THREE.Scene();
    // Create Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Create Texture Loader
    const textureLoader = new THREE.TextureLoader();
    // Create Point Light
    const pointLight = new THREE.PointLight(0xffffff, 2, 300);
    scene.add(pointLight);
    // Create Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.01);
    scene.add(ambientLight);

    // Create Orbit Controls
    const orbit = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 12, 60);
    orbit.update();

    // Create Stars
    Array(200).fill().forEach(() => addStar(scene))

    // Create Sun
    const sunGeo = new THREE.SphereGeometry(4, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Create Alpine
    const alpine = createPlanet(1.5, alpineTexture, 8);
    alpine.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(alpine.obj);

    // Create Savana
    const savana = createPlanet(2, savanaTexture, 12);
    savana.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(savana.obj);

    // Create Tropical
    const tropical = createPlanet(3, tropicalTexture, 20);
    tropical.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(tropical.obj);

    function animate() {
      renderer.render(scene, camera);

      // Self Rotation
      sun.rotation.z += 0.0040;
      alpine.mesh.rotation.z += 0.01;
      savana.mesh.rotation.z += 0.01;
      tropical.mesh.rotation.z += 0.01;

      // Orbit
      alpine.obj.rotation.y += 0.01;
      savana.obj.rotation.y += 0.001;
      tropical.obj.rotation.y += 0.0022;
    }

    renderer.setAnimationLoop(animate);

    let resizeTimer;

    function handleWindowResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const { innerWidth, innerHeight } = window;
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
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

  return <canvas ref={canvasRef} />;
}

export default App;
