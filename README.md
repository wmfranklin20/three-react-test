# Three + React + Vite

Testing for utilziing native Three.js in a React/Vite framework.

### Model Loading
- In testing there are two methods:
    1. Define LoadModel in seperate script and simply call that function with model url in Scene where the scene is declared and accessible
    2. Call LoadModel using useState in App to reference the scene objects and append model to scene

It seems like best practice might be to load in App, similar to Vanilla structuring of loading Scene, then calling lights and models in main Model file.