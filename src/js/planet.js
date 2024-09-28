import * as THREE from 'three';

export function createPlanet() {
    const material = new THREE.MeshStandardMaterial({ color: 0x0000FF }); 
    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        material
    );

    return planet;
}
