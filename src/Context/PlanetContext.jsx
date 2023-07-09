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
        scene.add(obj);
        mesh.position.x = position;
        return { mesh, obj };
    }


    function addStar(scene) {
        const geo = new THREE.SphereGeometry(0.15, 24, 24);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const star = new THREE.Mesh(geo, mat);

        const [x, y, z] = Array(3)
            .fill()
            .map(() => THREE.MathUtils.randFloatSpread(100));

        star.position.set(x, y, z);
        scene.add(star);
    }

    // States
    const [currentPlanet, setCurrentPlanet] = useState("");

    return (
        <PlanetContext.Provider value={{ createPlanet, addStar, currentPlanet, setCurrentPlanet}}>
            {children}
        </PlanetContext.Provider>
    );
};
