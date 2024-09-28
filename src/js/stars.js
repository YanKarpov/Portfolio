import * as THREE from 'three';

export function generateStars() {
    const starsGeometry = new THREE.BufferGeometry();
    const starVertices = [];

    for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000); 
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);

        starVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff }); 
    const starField = new THREE.Points(starsGeometry, starsMaterial);

    return starField;
}
