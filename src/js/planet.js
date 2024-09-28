import * as THREE from 'three';

export function createPlanet() {
    const material = new THREE.MeshStandardMaterial({
        color: 0x1E90FF, 
        emissive: 0x000033, 
        metalness: 0.4, 
        roughness: 0.6, 
        flatShading: true 
    });

    const geometry = new THREE.SphereGeometry(1, 64, 64);

    const planet = new THREE.Mesh(geometry, material);

    planet.rotation.x = Math.random() * Math.PI; 
    planet.rotation.y = Math.random() * Math.PI;

    planet.pulsate = () => {
        const scale = 1 + Math.sin(Date.now() * 0.001) * 0.05; 
        planet.scale.set(scale, scale, scale);
    };

    return planet;
}
