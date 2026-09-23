"use client";

import * as THREE from "three";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import {
  Canvas,
  extend,
  useFrame,
  useThree,
} from "@react-three/fiber";

import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";

import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";

import {
  MeshLineGeometry,
  MeshLineMaterial,
} from "meshline";

extend({
  MeshLineGeometry,
  MeshLineMaterial,
});

const GLTF_PATH = "/assets/cards.glb";
const CARD_TEXTURE_PATH = "/assets/id_card.png";

useGLTF.preload(GLTF_PATH);
useTexture.preload(CARD_TEXTURE_PATH);

export default function BandCard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener(
        "resize",
        checkMobile
      );
    };
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Canvas
          gl={{
            alpha: true,
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.95,
          }}
          dpr={isMobile ? [1, 1.25] : [1, 2]}
          camera={{
            position: isMobile
              ? [0, -0.15, 12]
              : [0, 0, 13],
            fov: isMobile ? 26 : 25,
          }}
          style={{
            background: "transparent",
            width: "100%",
            height: "100%",
            pointerEvents: "auto",
            touchAction: "none",
          }}
        >
          {/* Balanced studio lighting so card isn't washed out */}
          <ambientLight intensity={0.85} />
          <directionalLight position={[4, 6, 5]} intensity={1.1} color="#ffffff" />
          <directionalLight position={[-4, 2, 3]} intensity={0.45} color="#93c5fd" />
          <pointLight position={[0, -2, 4]} intensity={0.35} color="#818cf8" />

          <Physics
            interpolate
            gravity={[0, -25, 0]}
            timeStep={1 / 60}
          >
            <Band isMobile={isMobile} />
          </Physics>

          <Environment blur={0.75}>
            <Lightformer
              intensity={1.2}
              color="#b0c4ff"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />

            <Lightformer
              intensity={1.5}
              color="#c8d6ff"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />

            <Lightformer
              intensity={1.5}
              color="#d0d8ff"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />

            {/* Soft rim lightformer */}
            <Lightformer
              intensity={2.2}
              color="#e8ecff"
              position={[-10, 0, 14]}
              rotation={[
                0,
                Math.PI / 2,
                Math.PI / 3,
              ]}
              scale={[100, 10, 1]}
            />

            {/* Subtle accent light for holographic sheen */}
            <Lightformer
              intensity={1.2}
              color="#8b9cf7"
              position={[5, 3, 2]}
              rotation={[0, Math.PI / 4, 0]}
              scale={[50, 5, 1]}
            />
          </Environment>
        </Canvas>
      </Suspense>
    </div>
  );
}

function Band({
  isMobile,
  maxSpeed = 50,
  minSpeed = 10,
}: {
  isMobile: boolean;
  maxSpeed?: number;
  minSpeed?: number;
}) {
  const band = useRef<any>(null);

  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);

  const card = useRef<any>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: any = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const gltf = useGLTF(GLTF_PATH) as any;

  const nodes = gltf?.nodes || {};
  const materials = gltf?.materials || {};

  const { gl } = useThree();
  const cardTexture = useTexture(CARD_TEXTURE_PATH);
  useEffect(() => {
    if (cardTexture) {
      cardTexture.flipY = false;
      cardTexture.colorSpace = THREE.SRGBColorSpace;
      cardTexture.generateMipmaps = true;
      cardTexture.minFilter = THREE.LinearMipmapLinearFilter;
      cardTexture.magFilter = THREE.LinearFilter;
      const maxAniso = gl?.capabilities?.getMaxAnisotropy?.() || 16;
      cardTexture.anisotropy = Math.min(16, maxAniso);
      cardTexture.needsUpdate = true;
    }
  }, [cardTexture, gl]);

  const texture = useMemo(() => {
    if (typeof document === "undefined") return new THREE.Texture();
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      // Premium dark textured background for lanyard band
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#080b14");
      gradient.addColorStop(0.3, "#0f172a");
      gradient.addColorStop(0.5, "#172554");
      gradient.addColorStop(0.7, "#0f172a");
      gradient.addColorStop(1, "#080b14");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Edge stitching lines
      ctx.fillStyle = "rgba(59, 130, 246, 0.45)";
      ctx.fillRect(0, 16, canvas.width, 4);
      ctx.fillRect(0, canvas.height - 20, canvas.width, 4);

      // Subtle center track line
      ctx.fillStyle = "rgba(147, 197, 253, 0.18)";
      ctx.fillRect(0, canvas.height / 2 - 1, canvas.width, 2);

      // Rotate 180 degrees so text reads upright along the hanging lanyard
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI);

      // Premium text with glow
      ctx.shadowColor = "rgba(96, 165, 250, 0.75)";
      ctx.shadowBlur = 18;
      ctx.fillStyle = "#e0e8ff";
      ctx.font = "900 114px 'Inter', 'Montserrat', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("PARESH", 0, 0);

      // Sharp crisp pass
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffff";
      ctx.fillText("PARESH", 0, 0);
      ctx.restore();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  const { width, height } = useThree(
    (state) => state.size
  );
  const { width: vpWidth, height: vpHeight } = useThree(
    (state) => state.viewport
  );

  // Responsive alignment calculation:
  // Desktop: Card hangs cleanly in the right half of the hero section, avoiding left text and staying within screen bounds
  // Mobile: Card hangs centered horizontally so it fits cleanly on narrow phone screens
  const targetX = useMemo(() => {
    if (isMobile) return 0;
    // On desktop, center of right half is around 25% of viewport width to the right
    // Constrain to keep at least 1.9 units away from the right screen boundary
    const maxSafeRight = Math.max(1.5, vpWidth / 2 - 1.9);
    return Math.min(vpWidth * 0.24, maxSafeRight);
  }, [isMobile, vpWidth]);

  const targetY = useMemo(() => {
    return isMobile ? vpHeight / 2 + 0.35 : vpHeight / 2 + 0.55;
  }, [isMobile, vpHeight]);

  const cardScale = isMobile ? 2.15 : 2.05;

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );

  const [dragged, drag] =
    useState<any>(null);

  const [hovered, hover] =
    useState(false);

  const canDrag = true;

  useRopeJoint(
    fixed,
    j1,
    [[0, 0, 0], [0, 0, 0], 1] as any
  );

  useRopeJoint(
    j1,
    j2,
    [[0, 0, 0], [0, 0, 0], 1] as any
  );

  useRopeJoint(
    j2,
    j3,
    [[0, 0, 0], [0, 0, 0], 1] as any
  );

  useSphericalJoint(
    j3,
    card,
    [[0, 0, 0], [0, 1.45, 0]] as any
  );

  useEffect(() => {
    if (hovered && canDrag) {
      document.body.style.cursor =
        dragged ? "grabbing" : "grab";

      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (
      dragged !== null &&
      card.current &&
      canDrag
    ) {
      vec
        .set(
          state.pointer.x,
          state.pointer.y,
          0.5
        )
        .unproject(state.camera);

      dir
        .copy(vec)
        .sub(state.camera.position)
        .normalize();

      vec.add(
        dir.multiplyScalar(
          state.camera.position.length()
        )
      );

      [
        card,
        j1,
        j2,
        j3,
        fixed,
      ].forEach((r) =>
        r.current?.wakeUp()
      );

      const newX = vec.x - dragged.x;

      let newY = vec.y - dragged.y;

      const newZ = 0;

      if (isMobile) {
        vec.multiplyScalar(0.92);
      }

      const limit = isMobile
        ? -0.05
        : -0.2;

      if (state.pointer.y < limit) {
        newY =
          card.current.translation().y;
      }

      card.current.setNextKinematicTranslation(
        {
          x: newX,
          y: newY,
          z: newZ,
        }
      );
    }

    if (
      fixed.current &&
      j1.current &&
      j2.current &&
      j3.current &&
      card.current
    ) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped =
            new THREE.Vector3().copy(
              ref.current.translation()
            );
        }

        const d = Math.max(
          0.1,
          Math.min(
            1,
            ref.current.lerped.distanceTo(
              ref.current.translation()
            )
          )
        );

        ref.current.lerped.lerp(
          ref.current.translation(),
          delta *
          (minSpeed +
            d *
            (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(
        j3.current.translation()
      );

      curve.points[1].copy(
        j2.current.lerped
      );

      curve.points[2].copy(
        j1.current.lerped
      );

      curve.points[3].copy(
        fixed.current.translation()
      );

      if (band.current?.geometry) {
        band.current.geometry.setPoints(
          curve.getPoints(32)
        );
      }

      ang.copy(card.current.angvel());

      rot.copy(card.current.rotation());

      card.current.setAngvel({
        x: ang.x * 0.98,
        y: (ang.y - rot.y * 0.3) * 0.98,
        z: ang.z * 0.98,
      });
    }
  });

  curve.curveType = "chordal";

  return (
    <>
      <group
        position={[targetX, targetY, 0]}
      >
        <RigidBody
          ref={fixed}
          {...segmentProps}
          type="fixed"
        />

        <RigidBody
          position={[0, -0.6, 0]}
          ref={j1}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[0, -1.2, 0]}
          ref={j2}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[0, -1.8, 0]}
          ref={j3}
          {...segmentProps}
        >
          <BallCollider args={[0.1]} />
        </RigidBody>

        <RigidBody
          position={[0, -2.4, 0]}
          ref={card}
          {...segmentProps}
          type={
            dragged
              ? "kinematicPosition"
              : "dynamic"
          }
        >
          <CuboidCollider
            args={[0.8, 1.125, 0.01]}
          />

          <group
            scale={cardScale}
            position={[0, -1.2, -0.05]}
            onPointerOver={() =>
              canDrag && hover(true)
            }
            onPointerOut={() =>
              canDrag && hover(false)
            }
            onPointerUp={(e: any) => {
              if (!canDrag) return;

              e.stopPropagation();

              e.target.releasePointerCapture(
                e.pointerId
              );

              drag(false);
            }}
            onPointerDown={(e: any) => {
              if (!canDrag) return;

              e.target.setPointerCapture(
                e.pointerId
              );

              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(
                    vec.copy(
                      card.current.translation()
                    )
                  )
              );
            }}
          >
            {nodes?.card?.geometry && (
              <mesh
                geometry={
                  nodes.card.geometry
                }
              >
                <meshPhysicalMaterial
                  map={cardTexture}
                  clearcoat={0.65}
                  clearcoatRoughness={0.2}
                  roughness={0.35}
                  metalness={0.04}
                  envMapIntensity={0.6}
                />
              </mesh>
            )}

            {nodes?.clip?.geometry && (
              <mesh
                geometry={
                  nodes.clip.geometry
                }
              >
                <meshStandardMaterial
                  color="#d1d5db"
                  roughness={0.22}
                  metalness={0.92}
                  envMapIntensity={1.2}
                />
              </mesh>
            )}

            {nodes?.clamp?.geometry && (
              <mesh
                geometry={
                  nodes.clamp.geometry
                }
              >
                <meshStandardMaterial
                  color="#e2e8f0"
                  roughness={0.2}
                  metalness={0.92}
                  envMapIntensity={1.2}
                />
              </mesh>
            )}
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        {/* @ts-expect-error meshline */}
        <meshLineGeometry />

        {/* @ts-expect-error meshline */}
        <meshLineMaterial
          transparent
          opacity={0.96}
          color="#3b82f6"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1.15}
        />
      </mesh>
    </>
  );
}