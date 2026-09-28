const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const icons = () => window.lucide?.createIcons();
icons();
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("copy-email").addEventListener("click", async () => {
  const status = document.getElementById("copy-status");
  try {
    await navigator.clipboard.writeText("prachitbagde2017@gmail.com");
    status.textContent = "Email address copied.";
  } catch {
    status.textContent = "Please select the email address to copy it.";
  }
});

const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const active = link.hash === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    });
  },
  { rootMargin: "-15% 0px -55% 0px" },
);
document
  .querySelectorAll("main section[id]")
  .forEach((section) => sectionObserver.observe(section));

function createScene() {
  const container = document.getElementById("scene");
  const motionButton = document.getElementById("motion-toggle");
  if (!window.THREE) throw new Error("Three.js unavailable");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x151817, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);
  const assembly = new THREE.Group();
  scene.add(assembly);
  scene.add(new THREE.AmbientLight(0xd7e8d0, 2.4));
  const keyLight = new THREE.DirectionalLight(0xeaffdd, 4);
  keyLight.position.set(-3, 8, 5);
  scene.add(keyLight);
  const rimLight = new THREE.DirectionalLight(0xf4ac94, 2.5);
  rimLight.position.set(5, 2, -4);
  scene.add(rimLight);
  const graphite = new THREE.MeshStandardMaterial({
    color: 0x303b33,
    metalness: 0.65,
    roughness: 0.38,
  });
  const mint = new THREE.MeshStandardMaterial({
    color: 0xbcf59a,
    metalness: 0.3,
    roughness: 0.3,
  });
  const coral = new THREE.MeshStandardMaterial({
    color: 0xeaa28b,
    metalness: 0.35,
    roughness: 0.35,
  });
  const dark = new THREE.MeshStandardMaterial({
    color: 0x17201a,
    metalness: 0.55,
    roughness: 0.5,
  });
  const light = new THREE.MeshStandardMaterial({
    color: 0xc9d4c5,
    metalness: 0.55,
    roughness: 0.3,
  });

  function box(width, height, depth, material, position) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      material,
    );
    mesh.position.set(...position);
    assembly.add(mesh);
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(mesh.geometry),
      new THREE.LineBasicMaterial({
        color: material === mint ? 0xd8ffc2 : 0x71816b,
        transparent: true,
        opacity: 0.35,
      }),
    );
    mesh.add(edges);
    return mesh;
  }
  function label(text, position, width, color = "#c8f8ad") {
    const bitmap = document.createElement("canvas");
    bitmap.width = 512;
    bitmap.height = 128;
    const context = bitmap.getContext("2d");
    context.fillStyle = color;
    context.font = "500 65px monospace";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, 256, 64);
    const texture = new THREE.CanvasTexture(bitmap);
    texture.colorSpace = THREE.SRGBColorSpace;
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, width / 4),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      }),
    );
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(...position);
    assembly.add(plane);
  }
  box(5.9, 0.14, 4.8, dark, [0, -0.4, 0]);
  box(2.05, 0.23, 2.05, graphite, [0, -0.1, 0]);
  box(1.8, 0.15, 1.8, mint, [0, 0.14, 0]);
  box(1.55, 0.42, 1.55, graphite, [0, 0.43, 0]);
  box(1.48, 0.09, 1.48, light, [0, 0.7, 0]);
  label("C++", [0, 0.753, 0.08], 1.45, "#1c3223");
  for (let index = 0; index < 8; index++) {
    const offset = -0.72 + index * 0.205;
    box(0.085, 0.06, 0.19, light, [offset, 0.02, 1.1]);
    box(0.085, 0.06, 0.19, light, [offset, 0.02, -1.1]);
    box(0.19, 0.06, 0.085, light, [1.1, 0.02, offset]);
    box(0.19, 0.06, 0.085, light, [-1.1, 0.02, offset]);
  }
  const nodes = [
    [-2, -1.4, "LINUX"],
    [2, -1.4, "AWS"],
    [-2, 1.35, "DATA"],
    [2, 1.35, "THREADS"],
  ];
  nodes.forEach(([horizontal, depth, title], index) => {
    box(0.96, 0.11, 1.03, index % 2 ? coral : mint, [horizontal, -0.18, depth]);
    for (let layer = 0; layer < 3; layer++) {
      box(0.85, 0.2, 0.88, graphite, [horizontal, layer * 0.27, depth]);
      box(0.4, 0.035, 0.012, index % 2 ? coral : mint, [
        horizontal - 0.1,
        layer * 0.27,
        depth + 0.448,
      ]);
      box(0.055, 0.045, 0.015, mint, [
        horizontal + 0.27,
        layer * 0.27,
        depth + 0.448,
      ]);
    }
    label(title, [horizontal, 0.655, depth], 0.8);
    const path = [
      new THREE.Vector3(horizontal, -0.3, depth),
      new THREE.Vector3(horizontal * 0.55, -0.3, depth),
      new THREE.Vector3(horizontal * 0.55, -0.3, 0),
      new THREE.Vector3(0, -0.3, 0),
    ];
    assembly.add(
      new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(path),
        new THREE.LineBasicMaterial({ color: index % 2 ? 0xeaa28b : 0xa5d88b }),
      ),
    );
  });
  for (let index = 0; index < 9; index++) {
    box(0.025, 0.013, 0.22, light, [-0.85 + index * 0.21, -0.319, 2.08]);
  }
  label("SYSTEM / 01", [0, -0.316, -2.0], 1.5, "#82987c");
  let paused = reducedMotion.matches;
  let visible = true;
  let dragging = false;
  let lastPointer = 0;
  let targetRotation = -0.32;
  let rotation = -0.32;
  let elapsed = 0;
  let previousTime = 0;
  let frame;
  function resize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.position.set(7, 8.8, 10.8);
    camera.lookAt(0, 0, 0);
    camera.clearViewOffset();
    if (window.innerWidth > 700)
      camera.setViewOffset(width, height, -width * 0.255, 0, width, height);
    else camera.position.multiplyScalar(0.76);
    camera.updateProjectionMatrix();
    render();
  }
  function render() {
    assembly.rotation.y = rotation;
    assembly.position.y = Math.sin(elapsed * 0.55) * 0.09;
    renderer.render(scene, camera);
  }
  function animate(time) {
    frame = undefined;
    const delta = previousTime
      ? Math.min((time - previousTime) / 1000, 0.05)
      : 0;
    previousTime = time;
    if (!paused) elapsed += delta;
    rotation +=
      (targetRotation +
        (paused ? 0 : Math.sin(elapsed * 0.22) * 0.12) -
        rotation) *
      0.055;
    render();
    if (
      visible &&
      !document.hidden &&
      (!paused || Math.abs(rotation - targetRotation) > 0.001)
    )
      frame = requestAnimationFrame(animate);
  }
  function schedule() {
    previousTime = 0;
    if (!frame && visible && !document.hidden)
      frame = requestAnimationFrame(animate);
  }
  function updateMotionButton() {
    const action = paused ? "Play animation" : "Pause animation";
    motionButton.setAttribute("aria-label", action);
    motionButton.title = action;
    motionButton.innerHTML = `<i data-lucide="${paused ? "play" : "pause"}"></i>`;
    icons();
  }
  motionButton.addEventListener("click", () => {
    paused = !paused;
    updateMotionButton();
    schedule();
  });
  document.getElementById("scene-reset").addEventListener("click", () => {
    targetRotation = -0.32;
    elapsed = 0;
    if (reducedMotion.matches) rotation = targetRotation;
    schedule();
  });
  container.addEventListener("pointerdown", (event) => {
    dragging = true;
    lastPointer = event.clientX;
    container.setPointerCapture(event.pointerId);
  });
  container.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    targetRotation += (event.clientX - lastPointer) * 0.006;
    lastPointer = event.clientX;
    if (reducedMotion.matches) rotation = targetRotation;
    schedule();
  });
  const stopDragging = () => {
    dragging = false;
  };
  container.addEventListener("pointerup", stopDragging);
  container.addEventListener("pointercancel", stopDragging);
  reducedMotion.addEventListener("change", (event) => {
    paused = event.matches;
    updateMotionButton();
    schedule();
  });
  document.addEventListener("visibilitychange", schedule);
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) schedule();
  }).observe(container);
  new ResizeObserver(resize).observe(container);
  renderer.domElement.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    paused = true;
    document.querySelector(".hero").classList.add("scene-unavailable");
  });
  updateMotionButton();
  resize();
  schedule();
}

try {
  createScene();
} catch (error) {
  document.querySelector(".hero").classList.add("scene-unavailable");
  console.warn(
    "3D scene unavailable; portfolio content remains accessible.",
    error,
  );
}
