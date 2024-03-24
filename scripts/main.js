import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Movimiento suave de la cámara

const player = new THREE.Object3D();
scene.add(player);

function cargarModelo() {
    const loader = new GLTFLoader();
    loader.load(
        '/model/scene.gltf',
        function (gltf) {
            player.add(gltf.scene);
            renderizar();
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );
}

function renderizar() {
    renderer.render(scene, camera);
}

function configurarCamara() {
    camera.position.set(0, 5, 25);
    camera.lookAt(0, 0, 0); // Apuntar la cámara hacia el origen de la escena
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Actualizar los controles de la cámara
    renderizar();
}

function iniciar() {
    cargarModelo();
    configurarCamara();
    animate();
}

window.onload = iniciar;
