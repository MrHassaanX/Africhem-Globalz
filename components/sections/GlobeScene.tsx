"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import countryRings from "@/assets/geo/natural-earth-110m.json";

type Coordinate = [longitude: number, latitude: number];
type Props = { active: boolean; reducedMotion: boolean };
type RotationControl = { yaw: number; velocity: number; dragging: boolean; resumeAt: number; autoBlend: number };
const locations = [
  { name: "AFRICA", coordinate: [18, 2] as Coordinate },
  { name: "UAE", coordinate: [54, 24] as Coordinate },
  { name: "INDIA", coordinate: [79, 21] as Coordinate },
];
const connections = [[0, 1], [1, 2], [2, 0]] as const;
const revolutionSeconds = 24;

function onSphere([longitude, latitude]: Coordinate, radius: number) {
  const lat = latitude * Math.PI / 180;
  const lon = longitude * Math.PI / 180;
  return new THREE.Vector3(radius * Math.cos(lat) * Math.sin(lon), radius * Math.sin(lat), radius * Math.cos(lat) * Math.cos(lon));
}

function createEarthTexture(dark: boolean, mobile: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = mobile ? 1024 : 2048;
  canvas.height = mobile ? 512 : 1024;
  const context = canvas.getContext("2d");
  const texture = new THREE.CanvasTexture(canvas);
  if (!context) return texture;
  const { width, height } = canvas;
  const sea = context.createLinearGradient(0, 0, width, height);
  sea.addColorStop(0, dark ? "#082633" : "#0c414c");
  sea.addColorStop(.52, dark ? "#0a3543" : "#155965");
  sea.addColorStop(1, dark ? "#071923" : "#0a333d");
  context.fillStyle = sea;
  context.fillRect(0, 0, width, height);

  // Locally bundled Natural Earth 110m country boundaries. Shift across the
  // texture seam so countries at the antimeridian keep their actual outlines.
  for (const ring of countryRings) {
    const points: Array<[number, number]> = [];
    let previousX = 0;
    for (const [longitude, latitude] of ring) {
      let x = (longitude + 180) / 360 * width;
      if (points.length) {
        while (x - previousX > width / 2) x -= width;
        while (previousX - x > width / 2) x += width;
      }
      points.push([x, (90 - latitude) / 180 * height]);
      previousX = x;
    }
    if (points.length < 3) continue;
    for (const shift of [-width, 0, width]) {
      context.beginPath();
      context.moveTo(points[0][0] + shift, points[0][1]);
      for (let index = 1; index < points.length; index++) context.lineTo(points[index][0] + shift, points[index][1]);
      context.closePath();
      context.fillStyle = dark ? "#3c9291" : "#56a392";
      context.fill();
      context.strokeStyle = dark ? "rgba(91,207,194,.5)" : "rgba(209,239,220,.5)";
      context.lineWidth = mobile ? 1.15 : 1.5;
      context.stroke();
    }
  }
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.offset.x = .25; // SphereGeometry faces longitude zero at U=.25.
  texture.anisotropy = 4;
  return texture;
}

function createRoutes() {
  return connections.map(([from, to]) => {
    const start = onSphere(locations[from].coordinate, 1);
    const end = onSphere(locations[to].coordinate, 1);
    const path = Array.from({ length: 49 }, (_, index) => {
      const t = index / 48;
      return start.clone().lerp(end, t).normalize().multiplyScalar(1.54 + .15 * Math.sin(Math.PI * t));
    });
    const curve = new THREE.CatmullRomCurve3(path);
    return { curve, geometry: new THREE.TubeGeometry(curve, 64, .004, 4, false) };
  });
}

function createLabelTexture(name: string, dark: boolean, mobile: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    context.fillStyle = dark ? "rgba(7,19,28,.92)" : "rgba(247,242,232,.94)";
    context.beginPath();
    context.roundRect(18, 15, 476, 98, 26);
    context.fill();
    context.strokeStyle = dark ? "rgba(131,201,194,.55)" : "rgba(11,105,116,.5)";
    context.lineWidth = 2;
    context.stroke();
    context.font = `700 ${mobile ? 80 : 52}px Arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = dark ? "#eef4f2" : "#10263a";
    context.fillText(name, 256, 66);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function GlobeObject({ active, reducedMotion, mobile, dark, getControl }: Props & { mobile: boolean; dark: boolean; getControl: () => RotationControl }) {
  const globe = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const routeMaterials = useRef<Array<THREE.MeshBasicMaterial | null>>([]);
  const routeHeads = useRef<Array<THREE.Mesh | null>>([]);
  const halos = useRef<Array<THREE.Mesh | null>>([]);
  const labels = useRef<Array<THREE.Sprite | null>>([]);
  const earthTexture = useMemo(() => createEarthTexture(dark, mobile), [dark, mobile]);
  const routes = useMemo(() => createRoutes(), []);
  const labelTextures = useMemo(() => locations.map(({ name }) => createLabelTexture(name, dark, mobile)), [dark, mobile]);
  const points = useMemo(() => locations.map(({ coordinate }) => onSphere(coordinate, 1.565)), []);

  useEffect(() => () => {
    earthTexture.dispose();
    routes.forEach(({ geometry }) => geometry.dispose());
    labelTextures.forEach((texture) => texture.dispose());
  }, [earthTexture, routes, labelTextures]);

  useFrame((_, delta) => {
    if (!globe.current) return;
    const step = Math.min(delta, .08);
    const rotation = getControl();
    if (active && !reducedMotion) {
      elapsed.current += step;
      if (!rotation.dragging) {
        rotation.yaw += rotation.velocity * step;
        rotation.velocity *= Math.exp(-step * 4.5);
        if (Math.abs(rotation.velocity) < .001) rotation.velocity = 0;
        if (performance.now() >= rotation.resumeAt) {
          rotation.autoBlend = Math.min(1, rotation.autoBlend + step / .8);
          rotation.yaw += step * 2 * Math.PI / revolutionSeconds * rotation.autoBlend;
        }
      }
    }
    const time = elapsed.current;
    globe.current.rotation.y = rotation.yaw;
    globe.current.rotation.x = -.07;
    const reveal = reducedMotion ? 1 : Math.min(1, time / 1.5);
    routes.forEach(({ curve }, index) => {
      const material = routeMaterials.current[index];
      const head = routeHeads.current[index];
      if (material) material.opacity = reveal * (dark ? .58 : .62);
      if (head) {
        head.position.copy(curve.getPointAt((time * .095 + index * .33) % 1));
        head.visible = reveal > .25;
      }
    });
    halos.current.forEach((halo, index) => {
      if (halo) halo.scale.setScalar(reducedMotion ? 1 : 1 + Math.sin(time * 1.7 + index * 1.6) * .14);
    });
    labels.current.forEach((sprite, index) => {
      if (!sprite) return;
      const front = points[index].clone().applyEuler(globe.current!.rotation).z > .12;
      (sprite.material as THREE.SpriteMaterial).opacity = front ? 1 : 0;
    });
  });

  return <group ref={globe} rotation={[-.07, -1, 0]}>
    <mesh>
      <sphereGeometry args={[1.5, mobile ? 48 : 80, mobile ? 32 : 56]} />
      <meshPhysicalMaterial map={earthTexture} roughness={.68} metalness={.12} clearcoat={.24} clearcoatRoughness={.52} />
    </mesh>
    {routes.map(({ geometry }, index) => <group key={index}>
      <mesh geometry={geometry}>
        <meshBasicMaterial ref={(material) => { routeMaterials.current[index] = material; }} color={dark ? "#69d4ca" : "#d8efde"} transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh ref={(node) => { routeHeads.current[index] = node; }} visible={false}>
        <sphereGeometry args={[mobile ? .018 : .021, 8, 8]} />
        <meshBasicMaterial color="#c6f3e9" />
      </mesh>
    </group>)}
    {locations.map(({ name }, index) => <group key={name} position={points[index]}>
      <mesh ref={(node) => { halos.current[index] = node; }}>
        <sphereGeometry args={[.075, 12, 12]} />
        <meshBasicMaterial color="#75cfc4" transparent opacity={.3} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[.026, 12, 12]} />
        <meshBasicMaterial color="#eef4f2" />
      </mesh>
      <sprite ref={(node) => { labels.current[index] = node; }} position={[index === 0 ? -.25 : .27, .14, .04]} scale={[mobile ? .9 : .77, mobile ? .225 : .193, 1]}>
        <spriteMaterial map={labelTextures[index]} transparent depthWrite={false} depthTest={false} opacity={1} />
      </sprite>
    </group>)}
    <mesh scale={1.045} renderOrder={2}>
      <sphereGeometry args={[1.5, mobile ? 32 : 48, mobile ? 24 : 36]} />
      <shaderMaterial transparent depthWrite={false} side={THREE.FrontSide} blending={THREE.AdditiveBlending}
        uniforms={{ color: { value: new THREE.Color(dark ? "#0ba7a3" : "#75bcb2") }, strength: { value: dark ? .2 : .13 } }}
        vertexShader={`varying vec3 vNormal; varying vec3 vView; void main() { vec4 viewPosition = modelViewMatrix * vec4(position, 1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-viewPosition.xyz); gl_Position = projectionMatrix * viewPosition; }`}
        fragmentShader={`uniform vec3 color; uniform float strength; varying vec3 vNormal; varying vec3 vView; void main() { float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 3.2); gl_FragColor = vec4(color, rim * strength); }`}
      />
    </mesh>
  </group>;
}

export default function GlobeScene(props: Props) {
  const control = useRef<RotationControl>({ yaw: -1, velocity: 0, dragging: false, resumeAt: 0, autoBlend: 1 });
  const pointer = useRef<{ id: number; x: number; y: number; time: number; horizontal: boolean } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [available] = useState(() => {
    if (typeof document === "undefined") return false;
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2") || probe.getContext("webgl");
    const supported = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return supported;
  });
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [dark, setDark] = useState(() => typeof document === "undefined" || document.documentElement.dataset.theme !== "light");
  useEffect(() => {
    const update = () => {
      setMobile(window.innerWidth < 768);
      setDark(document.documentElement.dataset.theme !== "light");
    };
    window.addEventListener("resize", update, { passive: true });
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => { window.removeEventListener("resize", update); observer.disconnect(); };
  }, []);
  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp, horizontal: false };
    control.current.resumeAt = performance.now() + 1500;
    control.current.autoBlend = 0;
    control.current.velocity = 0;
  }
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const gesture = pointer.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.horizontal) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
      gesture.horizontal = true;
      control.current.dragging = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    const elapsedMs = Math.max(8, event.timeStamp - gesture.time);
    const change = dx * .005;
    control.current.yaw += change;
    control.current.velocity = Math.max(-1.4, Math.min(1.4, change / elapsedMs * 1000));
    gesture.x = event.clientX;
    gesture.y = event.clientY;
    gesture.time = event.timeStamp;
  }
  function pointerEnd(event: PointerEvent<HTMLDivElement>) {
    if (!pointer.current || pointer.current.id !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    pointer.current = null;
    control.current.dragging = false;
    control.current.resumeAt = performance.now() + 1500;
    if (props.reducedMotion) control.current.velocity = 0;
    setDragging(false);
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    control.current.yaw += event.key === "ArrowRight" ? .18 : -.18;
    control.current.velocity = 0;
    control.current.autoBlend = 0;
    control.current.resumeAt = performance.now() + 1500;
  }
  if (!available) return <div className="globe-fallback" />;
  return <div className="globe-input" data-dragging={dragging} role="group" tabIndex={0}
    aria-label="Interactive globe. Drag left or right, or use arrow keys to rotate."
    onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onKeyDown={onKeyDown}>
  <Canvas className="globe-canvas" dpr={mobile ? [1, 1.2] : [1, 1.5]}
    frameloop={!props.active ? "demand" : "always"}
    camera={{ position: [0, .05, mobile ? 5.7 : 5.15], fov: 39, near: .1, far: 20 }}
    gl={{ alpha: true, antialias: !mobile, powerPreference: "high-performance" }}>
    <ambientLight intensity={dark ? 1.35 : 1.25} color={dark ? "#a8d1d0" : "#edf0e5"} />
    <directionalLight position={[-3, 3, 5]} intensity={dark ? 1.55 : 1.5} color={dark ? "#9cddd1" : "#d8efde"} />
    <directionalLight position={[3, -1, -2]} intensity={dark ? .8 : .8} color="#0b89a0" />
    <GlobeObject {...props} mobile={mobile} dark={dark} getControl={() => control.current} />
  </Canvas></div>;
}
