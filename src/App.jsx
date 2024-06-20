import { useState } from 'react'
import './App.css'
import SceneInit from './test/Scene';
import ModelLoader from './test/LoadModel';

function Model() {
  const [sceneParams, setSceneParams] = useState(null)
  return (
    <div>
      <SceneInit onSceneInit={setSceneParams} />
      {sceneParams && <ModelLoader scene={sceneParams.scene} modelPath={'./models/Test.3dm'} />}
    </div>
  )
}


function App() {


  return (
    <>
      <div>
        <Model />
      </div>
    </>
  )
}

export default App
