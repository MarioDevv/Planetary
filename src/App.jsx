import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './index.css';
import { PlanetContext } from './Context/PlanetContext';

// Images
import sunTexture from './Textures/Sun.jpg';
import alpineTexture from './Textures/Alpine.png';
import earthTexture from './Textures/earth.png';
import venusTexture from './Textures/Venus.jpg';
import marsTexture from './Textures/Mars.jpg';
import saturnTexture from './Textures/Saturn.jpg';
import jupiterTexture from './Textures/jupiter.jpg';
import uranusTexture from './Textures/uranus.jpg';
import neptuneTexture from './Textures/neptune.png';
import PlanetDescription from './Components/PlanetDescription';

function App() {
  const canvasRef = React.useRef(null);
  const { createPlanet, addStar } = React.useContext(PlanetContext);

  React.useEffect(() => {

    // Create Renderer
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
    camera.position.set(0, 100, 60);
    orbit.update();

    // Limitar el zoom
    orbit.minDistance = 30; // Establecer la distancia mínima de zoom
    orbit.maxDistance = 80; // Establecer la distancia máxima de zoom

    // Create Stars
    Array(200).fill().forEach(() => addStar(scene))

    // Create Sun
    const sunGeo = new THREE.SphereGeometry(4, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTexture) });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    scene.add(sun);

    // Create Alpine
    const alpine = createPlanet(1.5, alpineTexture, 10);
    alpine.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(alpine.obj);

    // Create Venus
    const venus = createPlanet(2, venusTexture, 12);
    venus.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(venus.obj);

    // Create Earth
    const earth = createPlanet(3, earthTexture, 20);
    earth.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(earth.obj);

    // Create Mars
    const mars = createPlanet(4, marsTexture, 30);
    mars.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(mars.obj);

    // Create Jupiter
    const jupiter = createPlanet(5, jupiterTexture, 40);
    jupiter.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(jupiter.obj);


    // Create Saturn
    const saturn = createPlanet(5, saturnTexture, 50, {innerRadius: 7, outerRadius: 9, texture: saturnTexture});
    saturn.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(saturn.obj);

    // Create Uranus
    const uranus = createPlanet(5, uranusTexture, 60);
    uranus.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(uranus.obj);

    // Create Neptune
    const neptune = createPlanet(5, neptuneTexture, 70);
    neptune.mesh.rotation.x = 0.5 * Math.PI;
    scene.add(neptune.obj);

    function animate() {
      renderer.render(scene, camera);

      // Self Rotation
      sun.rotation.z += 0.0040;
      alpine.mesh.rotation.z += 0.01;
      venus.mesh.rotation.z += 0.01;
      earth.mesh.rotation.z += 0.01;
      mars.mesh.rotation.z += 0.01;
      jupiter.mesh.rotation.z += 0.01;
      saturn.mesh.rotation.z += 0.01;
      uranus.mesh.rotation.z += 0.01;
      neptune.mesh.rotation.z += 0.01;

      // Orbit
      alpine.obj.rotation.y += 0.01;
      venus.obj.rotation.y += 0.001;
      earth.obj.rotation.y += 0.0022;
      mars.obj.rotation.y += 0.003;
      jupiter.obj.rotation.y += 0.0035;
      saturn.obj.rotation.y += 0.004;
      uranus.obj.rotation.y += 0.0045;
      neptune.obj.rotation.y += 0.005;

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
