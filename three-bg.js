/**
 * three-bg.js – Deo Electronics
 * Animated 3D background using Three.js
 * Features:
 *  - Rotating wireframe icosahedron with neon glow
 *  - Floating glowing particle field
 *  - Mouse-parallax camera movement
 */

(function () {
  'use strict';

  /* ── Scene Setup ─────────────────────────────────────────── */
  const canvas = document.getElementById('bg-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0); // transparent background

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 24);

  /* ── Mouse Tracking ─────────────────────────────────────── */
  const mouse = { x: 0, y: 0 };
  const targetCam = { x: 0, y: 0 };

  document.addEventListener('mousemove', (e) => {
    // Normalize to range [-1, 1]
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  });

  /* ── Main Icosahedron ────────────────────────────────────── */
  const icoGeo = new THREE.IcosahedronGeometry(6, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x4f46e5,
    wireframe: true,
    transparent: true,
    opacity: 0.4,
  });
  const icosahedron = new THREE.Mesh(icoGeo, icoMat);
  scene.add(icosahedron);

  /* Inner smaller icosahedron (purple) */
  const icoInnerGeo = new THREE.IcosahedronGeometry(3.5, 1);
  const icoInnerMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const icoInner = new THREE.Mesh(icoInnerGeo, icoInnerMat);
  scene.add(icoInner);

  /* ── Particle System ─────────────────────────────────────── */
  const PARTICLE_COUNT = 280;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const particleSizes = new Float32Array(PARTICLE_COUNT);
  const particleColors = new Float32Array(PARTICLE_COUNT * 3);

  // Colour palette: cyan and purple particles
  const colorA = new THREE.Color(0x4f46e5); // neon blue
  const colorB = new THREE.Color(0x06b6d4); // neon purple

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3;
    // Spread particles in a sphere-ish volume
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const r = 10 + Math.random() * 22;

    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);

    particleSizes[i] = 0.06 + Math.random() * 0.14;

    // Mix colours randomly
    const t = Math.random();
    const c = colorA.clone().lerp(colorB, t);
    particleColors[i3] = c.r;
    particleColors[i3 + 1] = c.g;
    particleColors[i3 + 2] = c.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

  const particleMat = new THREE.PointsMaterial({
    size: 0.18,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* ── Ambient Glow Ring ───────────────────────────────────── */
  const ringGeo = new THREE.TorusGeometry(9, 0.04, 8, 80);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x4f46e5,
    transparent: true,
    opacity: 0.3,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  scene.add(ring);

  const ring2Geo = new THREE.TorusGeometry(11.5, 0.03, 8, 80);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.2,
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = -Math.PI / 5;
  ring2.rotation.y = Math.PI / 6;
  scene.add(ring2);

  /* ── Clock ───────────────────────────────────────────────── */
  const clock = new THREE.Clock();

  /* ── Animation Loop ──────────────────────────────────────── */
  function animate() {
    requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    /* Icosahedron rotation */
    icosahedron.rotation.x = elapsed * 0.12;
    icosahedron.rotation.y = elapsed * 0.18;

    icoInner.rotation.x = -elapsed * 0.20;
    icoInner.rotation.y = elapsed * 0.14;

    /* Particle drift */
    particles.rotation.y = elapsed * 0.025;
    particles.rotation.x = elapsed * 0.018;

    /* Rings */
    ring.rotation.z = elapsed * 0.06;
    ring2.rotation.z = -elapsed * 0.04;

    /* Mouse parallax – smooth lerp */
    targetCam.x += (mouse.x * 2.5 - targetCam.x) * 0.05;
    targetCam.y += (-mouse.y * 2.5 - targetCam.y) * 0.05;
    camera.position.x = targetCam.x;
    camera.position.y = targetCam.y;
    camera.lookAt(scene.position);

    /* Subtle opacity pulse on the icosahedron */
    icoMat.opacity = 0.18 + 0.07 * Math.sin(elapsed * 0.9);

    renderer.render(scene, camera);
  }

  /* ── Resize Handler ──────────────────────────────────────── */
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  /* ── Start ───────────────────────────────────────────────── */
  animate();

})();
