import {useState,Suspense} from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/Island';
import Sky from '../models/Sky';
import Bird from '../models/Bird';
import Plane from '../models/Plane';

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);

  const adjustIslandForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];
    if(window.innerWidth < 768){
      screenScale = [0.9, 0.9, 0.9];
    }else{
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation]
  }

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition; 

    if(window.innerWidth < 768){
      screenScale = [1.5, 1.5, 1.5];
      screenPosition=[0, -1.5, 0];
    }else{
      screenScale = [3, 3, 3];
      screenPosition=[0, -4, -4];
    }
    return [screenScale, screenPosition]
  }

  const [planeScale, planePosition]=adjustPlaneForScreenSize();
  const [islandScale, islandPosition, islandRotation]=adjustIslandForScreenSize();

  return (
    <section className='w-full h-screen relative'>
      <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{near:0.1,far:1000}}
      >
        <Suspense fallback={<Loader/>}>
          <directionalLight intensity={1}/>
          <ambientLight intensity={1.3}/>
          <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1}></hemisphereLight>

          <Bird/>
          <Sky /> 
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          <Plane
            isRotating={isRotating}
            planeScale={planeScale}
            planePosition={planePosition}
            rotation={[0, 20, 0]}
          />
        </Suspense>

      </Canvas>
    </section>
  )
}

export default Home
