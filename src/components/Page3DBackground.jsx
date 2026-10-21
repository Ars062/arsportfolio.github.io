import { useEffect, useRef } from "react";
import * as THREE from "three";

function Page3DBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      300
    );
    camera.position.set(0, 8, 26);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const COLS = reduceMotion ? 60 : 110;
    const ROWS = reduceMotion ? 34 : 64;
    const SEP = 0.9;

    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const base = new Float32Array(count * 2);

    const emerald = new THREE.Color("#10b981");
    const teal = new THREE.Color("#2dd4bf");
    const deep = new THREE.Color("#0d6b5e");
    const gold = new THREE.Color("#fbbf24");

    let p = 0;
    for (let ix = 0; ix < COLS; ix++) {
      for (let iz = 0; iz < ROWS; iz++) {
        const i3 = p * 3;
        const x = (ix - COLS / 2) * SEP;
        const z = (iz - ROWS / 2) * SEP;
        positions[i3] = x;
        positions[i3 + 1] = 0;
        positions[i3 + 2] = z;
        base[p * 2] = x;
        base[p * 2 + 1] = z;

        const t = iz / ROWS;
        const c = t < 0.35 ? gold : t < 0.7 ? teal : emerald;
        const mix = c.clone().lerp(deep, Math.min(1, Math.abs(x) / (COLS * SEP)));
        colors[i3] = mix.r;
        colors[i3 + 1] = mix.g;
        colors[i3 + 2] = mix.b;
        p++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const sprite = (() => {
      const size = 48;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.4, "rgba(255,255,255,0.5)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(canvas);
    })();

    const material = new THREE.PointsMaterial({
      size: 0.32,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointerMove);

    const positionAttr = geometry.getAttribute("position");
    const clock = new THREE.Clock();
    let frameId;

    const currentScroll = { value: 0 };

    const animate = () => {
      const t = clock.getElapsedTime();
      const arr = positionAttr.array;

      if (!reduceMotion) {
        for (let i = 0; i < count; i++) {
          const x = base[i * 2];
          const z = base[i * 2 + 1];
          arr[i * 3 + 1] =
            Math.sin(x * 0.18 + t * 0.7) * 1.4 +
            Math.cos(z * 0.22 + t * 0.5) * 1.1 +
            Math.sin((x + z) * 0.12 + t * 0.35) * 0.8;
        }
        positionAttr.needsUpdate = true;

        target.x += (pointer.x - target.x) * 0.035;
        target.y += (pointer.y - target.y) * 0.035;

        points.rotation.y = t * 0.03 + target.x * 0.25;
        points.rotation.x = 0.02 + target.y * 0.12;
        camera.position.x = target.x * 4;
        camera.position.y = 8 - target.y * 3;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frameId);
      else {
        clock.start();
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      sprite.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
      void currentScroll;
    };
  }, []);

  return <div className="page-3d" ref={mountRef} aria-hidden="true" />;
}

export default Page3DBackground;
