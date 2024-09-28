import * as THREE from 'three';
import { createPlanet } from './planet';
import { generateStars } from './stars';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function initScene() {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);  // Добавляем для лучшего разрешения на разных устройствах
    document.body.appendChild(renderer.domElement);

    // Добавляем контролы камеры
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Улучшенное освещение
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(-5, 5, 5);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    // Планета и звёзды
    const planet = createPlanet();
    scene.add(planet);

    const stars = generateStars();
    scene.add(stars);

    function animate() {
        requestAnimationFrame(animate);

        // Вращение звёзд
        stars.rotation.y += 0.0005; // медленное вращение по оси Y

        // Пульсация звёзд
        const time = Date.now() * 0.0005;
        stars.material.size = 1 + Math.sin(time) * 0.3; // пульсирующий размер звёзд

        planet.rotation.y += 0.005;
        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Обновление размеров окна при изменении
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}


