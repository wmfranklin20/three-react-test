import { useRef, useEffect } from 'react';
import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.164.1/examples/jsm/controls/OrbitControls.js';
import { addLights } from './Lighting';
import { LoadModel } from './AltLoadModel';

function SceneInit({ onSceneInit }) {
    const mountRef = useRef(null)
    

    useEffect(() => {
        const sceneContainer = mountRef.current

        const scene = new THREE.Scene()
        scene.up = new THREE.Vector3(0,0,1)
        scene.name = 'Main_Scene'
    
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        })
        renderer.setSize(sceneContainer.clientWidth, sceneContainer.clientHeight)
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.shadowMap.enabled = true
        renderer.shadowMap.type = THREE.PCFSoftShadowMap
        sceneContainer.appendChild(renderer.domElement)

        const camera = new THREE.PerspectiveCamera(
            60,
            (sceneContainer.clientWidth / sceneContainer.clientHeight),
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
        addLights(scene)

        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        if (onSceneInit) {
            onSceneInit({ scene, camera, renderer, controls, sceneContainer });
        }

        return () => {
            sceneContainer.removeChild(renderer.domElement)
        }
    }, [onSceneInit])
    
    return (
        <div id='canvas-container' style={{height:"100%", width:"100%"}}>
            <div id='canvas' ref={mountRef}></div>
        </div>
    )
}

export default SceneInit