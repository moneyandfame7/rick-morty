/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 russian_tank_lox.gltf --transform --types
Author: 3dtomchuk (https://sketchfab.com/3dtomchuk)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/destroyed-russian-tank-t-72b-246100389e1f49fc9d325473abc04723
Title: Destroyed Russian tank T-72b
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Model_material2_0: THREE.Mesh
    Model_material2_0_1: THREE.Mesh
    Model_material2_0_2: THREE.Mesh
    Model_material2_0_3: THREE.Mesh
    Model_material2_0_4: THREE.Mesh
    Model_material2_0_5: THREE.Mesh
    Model_material2_0_6: THREE.Mesh
    Model_material2_0_7: THREE.Mesh
    Model_material2_0_8: THREE.Mesh
    Model_material2_0_9: THREE.Mesh
    Model_material2_0_10: THREE.Mesh
    Model_material2_0_11: THREE.Mesh
    Model_material2_0_12: THREE.Mesh
    Model_material2_0_13: THREE.Mesh
    Model_material2_0_14: THREE.Mesh
    Model_material2_0_15: THREE.Mesh
    polySurface3_blinn1_0: THREE.Mesh
    pPlane2_lambert3_0: THREE.Mesh
    pPlane2_blinn1_0: THREE.Mesh
  }
  materials: {
    material2: THREE.MeshStandardMaterial
    blinn1: THREE.MeshStandardMaterial
    lambert3: THREE.MeshStandardMaterial
  }
}

export default function Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/russian_tank_lox-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[0, -22.93, -15.15]} rotation={[0.47, 0.18, 0.29]}>
          <group position={[249.3, -16732.94, -51.29]}>
            <group position={[0.08, 0, -0.07]} rotation={[-1.57, 0, 0]} scale={100}>
              <mesh geometry={nodes.Model_material2_0.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_1.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_2.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_3.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_4.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_5.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_6.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_7.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_8.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_9.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_10.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_11.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_12.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_13.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_14.geometry} material={materials.material2} />
              <mesh geometry={nodes.Model_material2_0_15.geometry} material={materials.material2} />
            </group>
            <mesh
              geometry={nodes.polySurface3_blinn1_0.geometry}
              material={materials.blinn1}
              position={[0, 0.01, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            />
          </group>
        </group>
        <group position={[393.56, 0, -69.86]} rotation={[-Math.PI / 2, -Math.PI / 3, -Math.PI / 2]} scale={0.64}>
          <group position={[-143.73, 117.46, -144.38]} rotation={[-2.62, 0, Math.PI]} scale={0.2}>
            <mesh geometry={nodes.pPlane2_lambert3_0.geometry} material={materials.lambert3} />
            <mesh geometry={nodes.pPlane2_blinn1_0.geometry} material={materials.blinn1} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/russian_tank_lox-transformed.glb')