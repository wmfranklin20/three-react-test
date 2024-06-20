import { useRef, useEffect } from 'react';
import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.164.1/examples/jsm/controls/OrbitControls.js';

function SceneInit({ onSceneInit }) {
    const mountRef = useRef(null)

    useEffect(() => {
        const mount = mountRef.current

        const scene = new THREE.Scene()
        scene.up = new THREE.Vector3(0,0,1)
        scene.name = 'Main_Scene'
    
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        renderer.setSize(mount.clientWidth, mount.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        mount.appendChild(renderer.domElement)

        const camera = new THREE.PerspectiveCamera(
            60,
            (mount.clientWidth / mount.clientHeight),
            0.1,
            10_000
        )
        camera.up = new THREE.Vector3(0,0,1)
        camera.position.set(500,500,500)

        const controls = new OrbitControls(
            camera,
            renderer.domElement
        )
        controls.target = new THREE.Vector3(0,0,0)
        controls.enableDamping = true                           // Damping for smooth camera movement
        controls.dampingFactor = 0.05  

        // Lights
        const ambientLight = new THREE.AmbientLight(new THREE.Color('rgb(255,255,255)'), 5); // Soft white light
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight(new THREE.Color('rgb(255,255,255)'), 100_000);
        pointLight.position.set(50, 50, 500);
        scene.add(pointLight);

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        if (onSceneInit) {
            onSceneInit({ scene, camera, renderer, controls });
        }

        return () => {
            mount.removeChild(renderer.domElement)
        }
    }, [onSceneInit])
    
    return <div className='canvas' ref={mountRef}></div>
}

export default SceneInit