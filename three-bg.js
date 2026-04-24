/**
 * three-bg.js – Deo Electronics (Light Theme Redesign)
 * Soft, light-appropriate animated 3D background
 * Features:
 *  - Gentle wireframe geometry in muted indigo/violet
 *  - Soft floating particle field with light pastel tones
 *  - Mouse-parallax camera movement
 *  - Performance-friendly opacity and blending
 */

(function () {
  'use strict';

  const canvas = document.getElementById('bg-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 26);

  /* ── Mouse Parallax ── */
  const mouse = { x: 0, y: 0 };
  const camTarget = { x: 0, y: 0 };
  document.addEventListener('mousemove', e => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  });

  /* ── Main Icosahedron (soft indigo wireframe) ── */
  const icoGeo = new THREE.IcosahedronGeometry(7, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.08,
  });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  scene.add(ico);

  /* ── Inner icosahedron (pink) ── */
  const icoInGeo = new THREE.IcosahedronGeometry(4, 1);
  const icoInMat = new THREE.MeshBasicMaterial({
    color: 0xec4899,
    wireframe: true,
    transparent: true,
    opacity: 0.065,
  });
  const icoIn = new THREE.Mesh(icoInGeo, icoInMat);
  scene.add(icoIn);

  /* ── Particle Field ── */
  const COUNT = 240;
  const pos = new Float32Array(COUNT * 3);
  const cols = new Float32Array(COUNT * 3);
  const sizes = new Float32Array(COUNT);

  const cA = new THREE.Color(0x6366f1); // indigo
  const cB = new THREE.Color(0xec4899); // pink
  const cC = new THREE.Color(0x06b6d4); // cyan

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    const r = 11 + Math.random() * 20;
    pos[i3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i3 + 2] = r * Math.cos(phi);
    sizes[i] = 0.05 + Math.random() * 0.12;

    // Mix three colors
    const t = Math.random();
    let c;
    if (t < 0.45) c = cA.clone().lerp(cB, t / 0.45);
    else if (t < 0.75) c = cB.clone().lerp(cC, (t - 0.45) / 0.3);
    else c = cC.clone().lerp(cA, (t - 0.75) / 0.25);
    cols[i3] = c.r;
    cols[i3 + 1] = c.g;
    cols[i3 + 2] = c.b;
  }

  const ptGeo = new THREE.BufferGeometry();
  ptGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  ptGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  ptGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const ptMat = new THREE.PointsMaterial({
    size: 0.16,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
    blending: THREE.NormalBlending,
    depthWrite: false,
  });
  const particles = new THREE.Points(ptGeo, ptMat);
  scene.add(particles);

  /* ── Subtle Torus Rings ── */
  const ringGeo = new THREE.TorusGeometry(10, 0.035, 8, 90);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.07 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3.5;
  scene.add(ring);

  const ring2Geo = new THREE.TorusGeometry(13, 0.025, 8, 90);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xec4899, transparent: true, opacity: 0.055 });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.x = -Math.PI / 5;
  ring2.rotation.y = Math.PI / 7;
  scene.add(ring2);

  /* ── Grid Helper (very faint) ── */
  const gridHelper = new THREE.GridHelper(60, 30, 0x6366f1, 0x6366f1);
  gridHelper.material.transparent = true;
  gridHelper.material.opacity = 0.025;
  gridHelper.position.y = -12;
  scene.add(gridHelper);

  /* ── Clock & Animate ── */
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    ico.rotation.x = t * 0.10;
    ico.rotation.y = t * 0.15;
    icoIn.rotation.x = -t * 0.18;
    icoIn.rotation.y = t * 0.12;

    particles.rotation.y = t * 0.018;
    particles.rotation.x = t * 0.012;

    ring.rotation.z = t * 0.05;
    ring2.rotation.z = -t * 0.035;
    gridHelper.rotation.y = t * 0.008;

    // Smooth mouse parallax
    camTarget.x += (mouse.x * 2.2 - camTarget.x) * 0.04;
    camTarget.y += (-mouse.y * 2.2 - camTarget.y) * 0.04;
    camera.position.x = camTarget.x;
    camera.position.y = camTarget.y;
    camera.lookAt(scene.position);

    // Subtle opacity pulse
    icoMat.opacity = 0.06 + 0.025 * Math.sin(t * 0.8);

    renderer.render(scene, camera);
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  animate();
})();
