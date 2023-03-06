import React, { useEffect, useRef, useState} from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { DragControls } from 'three-stdlib'

function Box(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const material = mesh.current.material

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={1}>
        
      <boxGeometry args={[1, 1, 1]} />
      
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

function CubeFace(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={3.3}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'black'} />
    </mesh>
  )
}

const Rig = ({ v = new THREE.Vector3() }) => {
  return useFrame((state) => {
    state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 5), 0.05)
  })
}

type DraggableProps = {
  children: React.ReactNode
}

const Draggable: React.FC<DraggableProps> = ({children}) => {
  const ref = useRef<THREE.Group>(null);
  const {camera, gl, scene} = useThree();

  useEffect(()=>{
    const controls = new DragControls(ref.current!.children, camera, gl.domElement);
    controls.transformGroup = true;

    const orbitControls = (scene as any).orbitControls;

    controls.addEventListener('dragstart', ()=>{
      orbitControls.enabled = false
    });
    controls.addEventListener('dragend', ()=>{
      orbitControls.enabled = true
    });
  }, [camera, gl.domElement, scene])

  return <group ref={ref}>{children}</group>
}

export default function Home() {
  const [size, setSize] = useState({width: window.innerWidth, height: window.innerHeight});

  useEffect(()=>{
    const resizeHandler = () => setSize({width: window.innerWidth, height: window.innerHeight})
    window.addEventListener("resize", resizeHandler)
    return ()=> window.removeEventListener("resize", resizeHandler)
  }, [])

  return (
    <div style={{width: size.width, height: size.height}}>
      <Canvas dpr={window.devicePixelRatio}>
        <ambientLight />
        <OrbitControls attach="orbitControls" />
        <color attach="background" args={["#fff"]} />
        {/* <fog attach="fog" color={'#fff'} near={1} far={20} /> */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />


        {/* Top */}
        <Draggable>
        </Draggable>
          <CubeFace position={[0, 0, 0]} />
          <Box position={[-1.2, 1.2, 0]} />
          <Box position={[-1.2, 1.2, 1.2]} />
          <Box position={[-1.2, 1.2, -1.2]} />
          <Box position={[0, 1.2, 1.2]} />
          <Box position={[0, 1.2, 0]} />
          <Box position={[0, 1.2, -1.2]} />
          <Box position={[1.2, 1.2, 0]} />
          <Box position={[1.2, 1.2, 1.2]} />
          <Box position={[1.2, 1.2, -1.2]} />
        {/* Middle */}
        <Box position={[-1.2, 0, 0]} />
        <Box position={[-1.2, 0, 1.2]} />
        <Box position={[-1.2, 0, -1.2]} />
        <Box position={[0, 0, 1.2]} />
        <Box position={[0, 0, 0]} />
        <Box position={[0, 0, -1.2]} />
        <Box position={[1.2, 0, 0]} />
        <Box position={[1.2, 0, 1.2]} />
        <Box position={[1.2, 0, -1.2]} />

        {/* Bottom */}
        <Box position={[-1.2, -1.2, 0]} />
        <Box position={[-1.2, -1.2, 1.2]} />
        <Box position={[-1.2, -1.2, -1.2]} />
        <Box position={[0, -1.2, 1.2]} />
        <Box position={[0, -1.2, 0]} />
        <Box position={[0, -1.2, -1.2]} />
        <Box position={[1.2, -1.2, 0]} />
        <Box position={[1.2, -1.2, 1.2]} />
        <Box position={[1.2, -1.2, -1.2]} />        
      </Canvas> 
    </div>
  )
}
