"use client";

import { Suspense, useCallback, useEffect, useMemo, useRef, useState, type PointerEvent, type KeyboardEvent } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { networkArcs, networkLocations, type Coordinate } from "@/lib/globe/locations";

type Props = { dark: boolean; active: boolean; reducedMotion: boolean; onSelectionChange: (index: number | null) => void };
type LabelRefs = { current: Array<HTMLDivElement | null> };
type LabelPosition = { x: number; y: number; width: number; height: number };
const labelOffsets = [0, -26, 26, -50, 50];

function overlaps(a: LabelPosition, b: LabelPosition) {
  return a.x < b.x + b.width + 3 && a.x + a.width + 3 > b.x
    && a.y < b.y + b.height + 3 && a.y + a.height + 3 > b.y;
}

type RotationControl = { yaw: number; velocity: number; dragging: boolean; resumeAt: number; autoBlend: number };
const revolutionSeconds = 42;

function onSphere([longitude, latitude]: Coordinate, radius: number) {
  const lat = latitude * Math.PI / 180;
  const lon = longitude * Math.PI / 180;
  return new THREE.Vector3(radius * Math.cos(lat) * Math.sin(lon), radius * Math.sin(lat), radius * Math.cos(lat) * Math.cos(lon));
}

function createRoutes() {
  return networkArcs.map(([from, to]) => {
    const start = onSphere(networkLocations[from].coordinate, 1);
    const end = onSphere(networkLocations[to].coordinate, 1);
    const path = Array.from({ length: 49 }, (_, index) => {
      const t = index / 48;
      return start.clone().lerp(end, t).normalize().multiplyScalar(1.535 + .11 * Math.sin(Math.PI * t));
    });
    const curve = new THREE.CatmullRomCurve3(path);
    return { curve, geometry: new THREE.TubeGeometry(curve, 48, .0055, 4, false) };
  });
}

function GlobeObject({ active, reducedMotion, mobile, dark, getControl, select, labels }: Props & { mobile: boolean; labels: LabelRefs; getControl: () => RotationControl; select: (index: number) => void }) {
  const globe = useRef<THREE.Group>(null);
  const projected = useMemo(() => new THREE.Vector3(), []);
  const markers = useMemo(() => networkLocations.map(() => ({ x: 0, y: 0, visible: false })), []);
  const occupied = useRef<LabelPosition[]>([]);
  const firstFrame = useRef<string | null>(null);
  const elapsed = useRef(0);
  const routeMaterials = useRef<Array<THREE.MeshBasicMaterial | null>>([]);
  const halos = useRef<Array<THREE.Mesh | null>>([]);
  const loadedTexture = useLoader(THREE.TextureLoader, `/globe/earth-${dark ? "dark" : "light"}-${mobile ? "mobile" : "desktop"}.webp`);
  const earthTexture = useMemo(() => {
    const texture = loadedTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.offset.x = .25; // SphereGeometry faces longitude zero at U=.25.
    texture.anisotropy = 4;
    texture.needsUpdate = true;
    return texture;
  }, [loadedTexture]);
  const routes = useMemo(() => createRoutes(), []);
  const points = useMemo(() => networkLocations.map(({ coordinate }) => onSphere(coordinate, 1.565)), []);

  useEffect(() => () => {
    earthTexture.dispose();
    routes.forEach(({ geometry }) => geometry.dispose());
  }, [earthTexture, routes]);

  useFrame(({ camera, size }, delta) => {
    const group = globe.current;
    if (!group) return;
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
    group.rotation.y = rotation.yaw;
    group.rotation.x = -.07;
    group.updateMatrixWorld();
    points.forEach((point, index) => {
      projected.copy(point).applyMatrix4(group.matrixWorld);
      // The point normal faces the camera when P · (camera - P) is positive.
      const marker = markers[index];
      marker.visible = projected.dot(camera.position) > point.lengthSq() + 1;
      projected.project(camera);
      marker.x = (1 + projected.x) * size.width / 2;
      marker.y = (1 - projected.y) * size.height / 2;
    });

    const placed = occupied.current;
    placed.length = 0;
    markers.forEach(({ x, y, visible }, index) => {
      const label = labels.current[index];
      if (!label) return;
      const width = Number(label.dataset.width);
      const height = Number(label.dataset.height);
      if (!visible || !width || !height) {
        label.style.visibility = "hidden";
        return;
      }

      // Try either side of the marker before shifting vertically. Each label
      // keeps a leader to its own marker, including in the crowded Gulf region.
      for (const dy of labelOffsets) {
        for (const direction of [1, -1]) {
          const dx = direction * (dy === 0 ? 10 : 16);
          const candidate = { x: x + dx - (direction < 0 ? width : 0), y: y + dy - height / 2, width, height };
          if (candidate.x < 4 || candidate.x + width > size.width - 4
            || candidate.y < 4 || candidate.y + height > size.height - 4
            || placed.some((other) => overlaps(candidate, other))
            || markers.some((other, otherIndex) => otherIndex !== index && other.visible
              && overlaps(candidate, { x: other.x - 3, y: other.y - 3, width: 6, height: 6 }))) continue;

          placed.push(candidate);
          label.style.transform = "translate3d(" + candidate.x + "px," + candidate.y + "px,0)";
          label.style.setProperty("--leader-start", direction > 0 ? "0%" : "100%");
          label.style.setProperty("--leader-length", Math.hypot(dx, dy) + "px");
          label.style.setProperty("--leader-angle", Math.atan2(-dy, -dx) + "rad");
          label.style.visibility = "visible";
          return;
        }
      }
      label.style.visibility = "hidden";
    });
    const reveal = reducedMotion ? 1 : Math.min(1, time / 1.5);
    routes.forEach((_, index) => {
      const material = routeMaterials.current[index];
      if (material) material.opacity = reveal * (dark ? .82 : .74);
    });
    halos.current.forEach((halo, index) => {
      if (halo) halo.scale.setScalar(reducedMotion ? 1 : 1 + Math.sin(time * 1.7 + index * 1.6) * .14);
    });
  });

  return <group ref={globe} rotation={[-.07, -1, 0]}>
    <mesh onAfterRender={() => {
      const renderedTheme = dark ? "dark" : "light";
      if (firstFrame.current === renderedTheme) return;
      firstFrame.current = renderedTheme;
      requestAnimationFrame(() => requestAnimationFrame(() => window.dispatchEvent(new CustomEvent("africhem-globe-ready", { detail: { theme: renderedTheme } }))));
    }}>
      <sphereGeometry args={[1.5, mobile ? 48 : 80, mobile ? 32 : 56]} />
      <meshPhysicalMaterial map={earthTexture} roughness={.68} metalness={.12} clearcoat={.24} clearcoatRoughness={.52} />
    </mesh>
    {routes.map(({ geometry }, index) => <group key={index}>
      <mesh geometry={geometry}>
        <meshBasicMaterial ref={(material) => { routeMaterials.current[index] = material; }} color={dark ? "#d7635c" : "#b84d48"} transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>)}
    {networkLocations.map(({ name, primary }, index) => <group key={name} position={points[index]} onClick={(event) => { event.stopPropagation(); select(index); }} onPointerOver={(event) => { event.stopPropagation(); select(index); }}>
      <mesh ref={(node) => { halos.current[index] = node; }}>
        <sphereGeometry args={[primary ? .067 : mobile ? .048 : .05, 12, 12]} />
        <meshBasicMaterial color={primary ? "#e7b999" : dark ? "#5cbdd5" : "#3d90a9"} transparent opacity={primary ? .28 : .18} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[primary ? .033 : mobile ? .023 : .025, 12, 12]} />
        <meshBasicMaterial color={primary ? "#f2d7c1" : dark ? "#d6f5fa" : "#e8faf9"} />
      </mesh>
      <mesh>
        <sphereGeometry args={[primary ? .13 : .105, 10, 10]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>)}
    <mesh scale={1.045} renderOrder={2}>
      <sphereGeometry args={[1.5, mobile ? 32 : 48, mobile ? 24 : 36]} />
      <shaderMaterial transparent depthWrite={false} side={THREE.FrontSide} blending={THREE.AdditiveBlending}
        uniforms={{ color: { value: new THREE.Color(dark ? "#53b9dc" : "#4b91ac") }, strength: { value: dark ? .22 : .12 } }}
        vertexShader={`varying vec3 vNormal; varying vec3 vView; void main() { vec4 viewPosition = modelViewMatrix * vec4(position, 1.0); vNormal = normalize(normalMatrix * normal); vView = normalize(-viewPosition.xyz); gl_Position = projectionMatrix * viewPosition; }`}
        fragmentShader={`uniform vec3 color; uniform float strength; varying vec3 vNormal; varying vec3 vView; void main() { float rim = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 3.2); gl_FragColor = vec4(color, rim * strength); }`}
      />
    </mesh>
  </group>;
}

function InvalidateBridge({ register }: { register: (invalidate: () => void) => void }) {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(() => {
    register(invalidate);
    window.dispatchEvent(new Event("africhem-canvas-ready"));
  }, [invalidate, register]);
  return null;
}

export default function GlobeScene(props: Props) {
  const control = useRef<RotationControl>({ yaw: -1, velocity: 0, dragging: false, resumeAt: 0, autoBlend: 1 });
  const labels = useRef<Array<HTMLDivElement | null>>([]);
  const pointer = useRef<{ id: number; x: number; y: number; time: number; horizontal: boolean } | null>(null);
  const invalidate = useRef<() => void>(() => {});
  const [dragging, setDragging] = useState(false);
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  const [tablet, setTablet] = useState(() => typeof window !== "undefined" && window.innerWidth >= 768 && window.innerWidth < 1100);
  const dark = props.dark;
  const registerInvalidate = useCallback((fn: () => void) => { invalidate.current = fn; }, []);
  const getControl = useCallback(() => control.current, []);
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const { target } of entries) {
        const label = target as HTMLDivElement;
        label.dataset.width = String(label.offsetWidth);
        label.dataset.height = String(label.offsetHeight);
      }
      invalidate.current();
    });
    labels.current.forEach((label) => { if (label) observer.observe(label); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const update = () => {
      setMobile(window.innerWidth < 768);
      setTablet(window.innerWidth >= 768 && window.innerWidth < 1100);
    };
    window.addEventListener("resize", update, { passive: true });
    return () => { window.removeEventListener("resize", update); };
  }, []);
  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointer.current = { id: event.pointerId, x: event.clientX, y: event.clientY, time: event.timeStamp, horizontal: false };
    control.current.resumeAt = performance.now() + 1500;
    control.current.autoBlend = 0;
    control.current.velocity = 0;
    invalidate.current();
  }
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const gesture = pointer.current;
    if (!gesture || gesture.id !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.horizontal) {
      if (Math.abs(dx) < 8 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
      gesture.horizontal = true;
      props.onSelectionChange(null);
      control.current.dragging = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.preventDefault();
    const elapsedMs = Math.max(8, event.timeStamp - gesture.time);
    const change = dx * .005;
    control.current.yaw += change;
    control.current.velocity = Math.max(-1.4, Math.min(1.4, change / elapsedMs * 1000));
    invalidate.current();
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
    invalidate.current();
    setDragging(false);
  }
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    control.current.yaw += event.key === "ArrowRight" ? .18 : -.18;
    control.current.velocity = 0;
    control.current.autoBlend = 0;
    control.current.resumeAt = performance.now() + 1500;
    props.onSelectionChange(null);
    invalidate.current();
  }
  return <div className="globe-input" data-dragging={dragging} role="group" tabIndex={0}
    aria-label="Interactive globe. Drag left or right, or use arrow keys to rotate."
    onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerEnd} onPointerCancel={pointerEnd} onKeyDown={onKeyDown}>
  <Canvas className="globe-canvas" style={{ touchAction: "pan-y pinch-zoom" }} dpr={mobile ? [1, 1.2] : [1, 1.5]}
    frameloop={!props.active || props.reducedMotion ? "demand" : "always"}
    camera={{ position: [0, .05, mobile ? 6.25 : tablet ? 6.8 : 5.15], fov: 39, near: .1, far: 20 }}
    gl={{ alpha: true, antialias: !mobile, powerPreference: "high-performance" }}>
    <InvalidateBridge register={registerInvalidate} />
    <ambientLight intensity={dark ? 1.25 : 1.4} color={dark ? "#b7dce7" : "#e6eef0"} />
    <directionalLight position={[-3, 3, 5]} intensity={dark ? 1.55 : 1.4} color={dark ? "#9cd5e6" : "#dce9ec"} />
    <directionalLight position={[3, -1, -2]} intensity={.7} color="#2d8fae" />
    <Suspense fallback={null}><GlobeObject {...props} mobile={mobile} dark={dark} getControl={getControl} select={props.onSelectionChange} labels={labels} /></Suspense>
  </Canvas>
  <div className="globe-labels" aria-hidden="true">
    {networkLocations.map(({ name }, index) => (
      <div className="globe-label" key={name} ref={(label) => { labels.current[index] = label; }}>{name}</div>
    ))}
  </div>
  </div>;
}
