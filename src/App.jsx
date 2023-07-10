import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './index.css';
import { PlanetContext } from './Context/PlanetContext';

// Images
import sunTexture from './Textures/Sun.jpg';
import mercuryTexture from './Textures/mercury.png';
import venusTexture from './Textures/venus.jpg';
import earthTexture from './Textures/earth.png';
import marsTexture from './Textures/mars.jpg';
import jupiterTexture from './Textures/jupiter.jpg';
import saturnTexture from './Textures/saturn.jpg';
import uranusTexture from './Textures/uranus.jpg';
import neptuneTexture from './Textures/neptune.png';
import PlanetDescription from './Components/PlanetDescription';


function App() {
  const canvasRef = React.useRef(null);
  const { createPlanet, addStar, addRing } = React.useContext(PlanetContext);

  React.useEffect(() => {
    // Create Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x00000);

    // Create Scene
    const scene = new THREE.Scene();

    // Create Camera
    const camera = new THREE.PerspectiveCamera(
      60,
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
    camera.position.set(0, 100, 60);
    orbit.update();

    // Limitar el zoom
    orbit.minDistance = 30; 
    orbit.maxDistance = 300; 

    // Create Stars
    Array(300).fill().forEach(() => addStar(scene))

    // Create Sun
    const sunGeo = new THREE.SphereGeometry(4, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    // Orbit
    addRing({ innerRadius: 7.9, outerRadius: 8, texture: mercuryTexture }, sun, 0);
    addRing({ innerRadius: 14.9, outerRadius: 15, texture: venusTexture }, sun, 0);
    addRing({ innerRadius: 24.9, outerRadius: 25, texture: earthTexture }, sun, 0);
    addRing({ innerRadius: 34.9, outerRadius: 35, texture: marsTexture }, sun, 0);
    addRing({ innerRadius: 49.9, outerRadius: 50, texture: jupiterTexture }, sun, 0);
    addRing({ innerRadius: 67.9, outerRadius: 68, texture: saturnTexture }, sun, 0);
    addRing({ innerRadius: 89.9, outerRadius: 90, texture: uranusTexture }, sun, 0);
    addRing({ innerRadius: 109.9, outerRadius: 110, texture: neptuneTexture }, sun, 0);

    scene.add(sun);

    // Create Mercury
    const mercury = createPlanet(1.5, mercuryTexture, 8);
    scene.add(mercury.obj);

    // Create Venus
    const venus = createPlanet(2, venusTexture, 15);
    scene.add(venus.obj);

    // Create Earth
    const earth = createPlanet(3, earthTexture, 25);
    scene.add(earth.obj);

    // Create Mars
    const mars = createPlanet(4, marsTexture, 35);
    scene.add(mars.obj);

    // Create Jupiter
    const jupiter = createPlanet(5, jupiterTexture, 50);
    scene.add(jupiter.obj);

    // Create Saturn
    const saturn = createPlanet(5, saturnTexture, 68, {innerRadius: 6, outerRadius: 8, texture: saturnTexture});
    scene.add(saturn.obj);

    // Create Uranus
    const uranus = createPlanet(5, uranusTexture, 90);
    scene.add(uranus.obj);

    // Create Neptune
    const neptune = createPlanet(5, neptuneTexture, 110);
    scene.add(neptune.obj);

    function animate() {
      renderer.render(scene, camera);

      // Self Rotation
      sun.rotation.y += 0.0040;
      mercury.mesh.rotation.y += 0.01;
      venus.mesh.rotation.y += 0.01;
      earth.mesh.rotation.y += 0.01;
      mars.mesh.rotation.y += 0.01;
      jupiter.mesh.rotation.y += 0.01;
      saturn.mesh.rotation.y += 0.001;
      uranus.mesh.rotation.y += 0.001;
      neptune.mesh.rotation.y += 0.001;

      // Orbit
      mercury.obj.rotation.y += 0.01;
      venus.obj.rotation.y += 0.001;
      earth.obj.rotation.y += 0.001;
      mars.obj.rotation.y += 0.001;
      jupiter.obj.rotation.y += 0.001;
      saturn.obj.rotation.y += 0.0004;
      uranus.obj.rotation.y += 0.0003;
      neptune.obj.rotation.y += 0.0001;

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

      // Optimized way to dispose of resources
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
      <PlanetDescription />
      <canvas ref={canvasRef} />
    </>
  );
}

export default App;
