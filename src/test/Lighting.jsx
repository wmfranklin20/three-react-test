import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';


export function addLights(scene) {
    const ambientLight = new THREE.AmbientLight(new THREE.Color('rgb(255,255,255)'), 5); // Soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'), 100_000);
    pointLight.position.set(50, 50, 500);
    //scene.add(pointLight);

    const lightColor = new THREE.Color('rgb(255,255,255)')
    const lightA = new THREE.DirectionalLight(lightColor, 4)
    lightA.position.set(50, -50, 100)
    const lightB = new THREE.DirectionalLight(lightColor, 3)
    lightB.position.set(-50, 50, 100)
    const lightC = new THREE.DirectionalLight(lightColor, 2)
    lightC.position.set(50, 50, 100)
    const lightD = new THREE.DirectionalLight(lightColor, 1)
    lightD.position.set(-50, -50, 100)
    scene.add(
        lightA,
        lightB,
        lightC,
        lightD
    )
}