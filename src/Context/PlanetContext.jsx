import React, { useState } from "react";
import * as THREE from "three";

// Create context
export const PlanetContext = React.createContext();

// Create provider
export const PlanetProvider = ({ children }) => {
    const textureLoader = new THREE.TextureLoader();
    const scene = new THREE.Scene();

    // Create planet function
    function createPlanet(size, texture, position, ring) {
        const geo = new THREE.SphereGeometry(size, 30, 30);
        const mat = new THREE.MeshStandardMaterial({
            map: textureLoader.load(texture)
        });
        const mesh = new THREE.Mesh(geo, mat);
        const obj = new THREE.Object3D();
        obj.add(mesh);
        if (ring) {
            addRing(ring, obj, position);
        }
        scene.add(obj);
        mesh.position.x = position;
        return { mesh, obj };
    }

    function addRing(ring, obj, position) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32
        ); 
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
            
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }

    function addStar(scene) {
        const geo = new THREE.SphereGeometry(0.15, 24, 24);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geo, mat);

        const [x, y, z] = Array(3)
            .fill()
            .map(() => THREE.MathUtils.randFloatSpread(300));

        star.position.set(x, y, z);
        scene.add(star);
    }

    function orbitHelper(planetList, sun) {
        planetList.forEach((planet) => {
            addRing({ innerRadius: planet.mesh.position.x - 0.1, outerRadius: planet.mesh.position.x, texture: planet.obj.children[0].material.map }, sun, 0);
        });
    }

    // States
    const [currentPlanet, setCurrentPlanet] = useState("");

    return (
        <PlanetContext.Provider value={{ createPlanet, addStar, addRing, currentPlanet, setCurrentPlanet}}>
            {children}
        </PlanetContext.Provider>
    );
};
