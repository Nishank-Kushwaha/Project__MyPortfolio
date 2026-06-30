"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const COLOR_MAP: Record<string, string> = {
  C: "#A8B9CC",
  "C++": "#00599C",
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  HTML5: "#E34F26",
  CSS3: "#1572B6",
  React: "#61DAFB",
  "Next.js": "#FFFFFF",
  TailwindCSS: "#06B6D4",
  "Node.js": "#339933",
  Nodemon: "#76D04B",
  "Express.js": "#CCCCCC",
  Appwrite: "#FD366E",
  MongoDB: "#47A248",
  "Mongoose.js": "#880000",
  MySQL: "#4479A1",
  PostgreSQL: "#4169E1",
  Prisma: "#5A67D8",
  NumPy: "#4DABCF",
  Pandas: "#E70488",
  Seaborn: "#4C72B0",
  Matplotlib: "#11557C",
  Git: "#F05032",
  GitHub: "#E0E0E0",
  Docker: "#2496ED",
  MATLAB: "#E16737",
  "VS Code": "#007ACC",
  Jupyter: "#F37626",
  Linux: "#FCC624",
};

type Skill = {
  id: number;
  name: string;
  category: string;
  icon: string | null;
};

export default function SkillGlobe({ skills }: { skills: Skill[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const tooltip = tooltipRef.current;
    if (!container || !tooltip) return;

    // Responsive size
    const SIZE = Math.min(container.clientWidth, 500);
    const W = SIZE;
    const H = SIZE;

    /* RENDERER */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* SCENE */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 1000);
    camera.position.z = 5.5;

    /* INNER SPHERE */
    const innerGeo = new THREE.SphereGeometry(1.62, 80, 80);
    const innerMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDarkCol: { value: new THREE.Color(0x07111f) },
        uRimCol: { value: new THREE.Color(0xffffff) },
        uGlowCol: { value: new THREE.Color(0x1a1a1a) },
      },
      vertexShader: `
        varying vec3 vNormal; varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvp = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvp.xyz);
          gl_Position = projectionMatrix * mvp;
        }`,
      fragmentShader: `
        uniform float uTime; uniform vec3 uDarkCol, uRimCol, uGlowCol;
        varying vec3 vNormal, vViewDir;
        void main() {
          float fresnel = pow(1.0 - max(0.0, dot(vNormal, vViewDir)), 2.2);
          vec3 col = mix(uDarkCol, uGlowCol, pow(fresnel, 1.4));
          col = mix(col, uRimCol, pow(fresnel, 3.5) * 0.85);
          col += uRimCol * pow(fresnel, 4.0) * (0.5 + 0.5 * sin(uTime * 0.9)) * 0.35;
          gl_FragColor = vec4(col, 0.98);
        }`,
    });
    scene.add(new THREE.Mesh(innerGeo, innerMat));

    /* AURA */
    const auraMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec3 vNormal, vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvp = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvp.xyz);
          gl_Position = projectionMatrix * mvp;
        }`,
      fragmentShader: `
        uniform float uTime; varying vec3 vNormal, vViewDir;
        void main() {
          float fresnel = pow(1.0 - max(0.0, dot(vNormal, vViewDir)), 4.2);
          float pulse = 0.88 + 0.12 * sin(uTime * 1.3);
          vec3 col = mix(vec3(0.15, 0.15, 0.15),vec3(0.85, 0.85, 0.85),fresnel);
          gl_FragColor = vec4(col, fresnel * 0.38 * pulse);
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.78, 64, 64), auraMat));

    /* WIREFRAME */
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.34,
    });
    const sphereWire = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.72, 3)),
      wireMat,
    );
    scene.add(sphereWire);

    /* POSITIONS */
    const SPHERE_R = 1.72;
    function uniformSphere(n: number, r: number) {
      const pts = [];
      const goldenRatio = (1 + Math.sqrt(5)) / 2;
      for (let i = 0; i < n; i++) {
        const theta = Math.acos(1 - (2 * (i + 0.5)) / n);
        const phi = (2 * Math.PI * i) / goldenRatio;
        pts.push(
          new THREE.Vector3(
            r * Math.sin(theta) * Math.cos(phi),
            r * Math.cos(theta),
            r * Math.sin(theta) * Math.sin(phi),
          ),
        );
      }
      return pts;
    }
    const positions = uniformSphere(skills.length, SPHERE_R);

    /* TEXTURE */
    function makeTex(
      name: string,
      color: string,
      imgUrl: string,
    ): Promise<THREE.Texture> {
      const SIZE = 160,
        LABEL_H = 30;
      const cv = document.createElement("canvas");
      cv.width = SIZE;
      cv.height = SIZE + LABEL_H;
      const ctx = cv.getContext("2d")!;

      function draw(iconImg: HTMLImageElement | null) {
        ctx.clearRect(0, 0, cv.width, cv.height);
        if (iconImg) {
          ctx.drawImage(iconImg, 0, 0, SIZE, SIZE);
          const imageData = ctx.getImageData(0, 0, SIZE, SIZE);
          const d = imageData.data;
          for (let i = 0; i < d.length; i += 4) {
            if (d[i + 3] > 0 && d[i] < 40 && d[i + 1] < 40 && d[i + 2] < 40) {
              d[i] = d[i + 1] = d[i + 2] = 255;
            }
          }
          ctx.putImageData(imageData, 0, 0);
        } else {
          ctx.font = `bold ${Math.floor(SIZE * 0.5)}px sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = color;
          ctx.fillText(name.charAt(0), SIZE / 2, SIZE / 2);
        }
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(0,0,0,0.95)";
        ctx.shadowBlur = 8;
        ctx.fillText(name, SIZE / 2, SIZE + 22);
        ctx.shadowBlur = 0;
      }

      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          draw(img);
          resolve(makeTexture(cv));
        };
        img.onerror = () => {
          draw(null);
          resolve(makeTexture(cv));
        };
        img.src = imgUrl;
      });
    }

    function makeTexture(cv: HTMLCanvasElement) {
      const t = new THREE.CanvasTexture(cv);
      t.colorSpace = THREE.SRGBColorSpace;
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.needsUpdate = true;
      return t;
    }

    /* SPRITES */
    const sprites: THREE.Sprite[] = [];
    const BASE_W = 0.42,
      BASE_H = 0.48;

    async function buildCloud() {
      for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        const imgUrl = skill.icon ?? "";
        const color = COLOR_MAP[skill.name] ?? "#888888";
        const tex = await makeTex(skill.name, color, imgUrl);
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          depthWrite: false,
          depthTest: false,
          sizeAttenuation: true,
        });
        const sp = new THREE.Sprite(mat);
        sp.scale.set(BASE_W, BASE_H, 1);
        sp.position.copy(positions[i]);
        sp.userData = { name: skill.name, color, base: BASE_W, baseH: BASE_H };
        scene.add(sp);
        sprites.push(sp);
      }
    }

    /* RAYCASTER */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hovered: THREE.Sprite | null = null;

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / W) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / H) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(sprites);
      if (hits.length) {
        const s = hits[0].object as THREE.Sprite;
        if (hovered !== s) {
          if (hovered)
            hovered.scale.set(hovered.userData.base, hovered.userData.baseH, 1);
          hovered = s;
          s.scale.set(s.userData.base * 1.55, s.userData.baseH * 1.55, 1);
          tooltip.textContent = s.userData.name;
          tooltip.style.color = s.userData.color;
        }
        tooltip.style.opacity = "1";
        tooltip.style.left = e.clientX + 16 + "px";
        tooltip.style.top = e.clientY - 14 + "px";
        container.style.cursor = "pointer";
      } else {
        if (hovered) {
          hovered.scale.set(hovered.userData.base, hovered.userData.baseH, 1);
          hovered = null;
        }
        tooltip.style.opacity = "0";
        container.style.cursor = drag ? "grabbing" : "grab";
      }
    };
    container.addEventListener("mousemove", onMouseMove);

    /* DRAG — mouse */
    let drag = false,
      autoRot = true;
    let px = 0,
      py = 0,
      vx = 0,
      vy = 0;

    container.addEventListener("mousedown", (e) => {
      drag = true;
      autoRot = false;
      px = e.clientX;
      py = e.clientY;
      container.style.cursor = "grabbing";
    });
    window.addEventListener("mouseup", () => {
      drag = false;
      container.style.cursor = "grab";
      setTimeout(() => {
        autoRot = true;
      }, 2200);
    });
    window.addEventListener("mousemove", (e) => {
      if (!drag) return;
      vy += (e.clientX - px) * 0.0028;
      vx += (e.clientY - py) * 0.0028;
      px = e.clientX;
      py = e.clientY;
    });

    /* DRAG — touch */
    let tx = 0,
      ty = 0;
    container.addEventListener(
      "touchstart",
      (e) => {
        autoRot = false;
        tx = e.touches[0].clientX;
        ty = e.touches[0].clientY;
      },
      { passive: true },
    );
    container.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        vy += (e.touches[0].clientX - tx) * 0.0028;
        vx += (e.touches[0].clientY - ty) * 0.0028;
        tx = e.touches[0].clientX;
        ty = e.touches[0].clientY;
      },
      { passive: false },
    );
    container.addEventListener("touchend", () => {
      setTimeout(() => {
        autoRot = true;
      }, 2200);
    });

    /* ROTATION */
    const AY = new THREE.Vector3(0, 1, 0);
    const AX = new THREE.Vector3(1, 0, 0);
    function rotAll(dy: number, dx: number) {
      sphereWire.rotation.y += dy;
      sphereWire.rotation.x += dx;
      innerMat.uniforms.uTime && (innerSphere.rotation.y += dy * 0.05);
      sprites.forEach((s) => {
        s.position.applyAxisAngle(AY, dy);
        s.position.applyAxisAngle(AX, dx);
      });
    }
    const innerSphere = scene.children[0] as THREE.Mesh;

    /* ANIMATE */
    const clock = new THREE.Timer();
    let frameId: number;
    function animate() {
      frameId = requestAnimationFrame(animate);
      clock.update();
      const t = clock.getElapsed();
      innerMat.uniforms.uTime.value = t;
      auraMat.uniforms.uTime.value = t;
      if (autoRot) {
        rotAll(0.002, 0.00055);
      } else if (Math.abs(vy) > 0.00004 || Math.abs(vx) > 0.00004) {
        rotAll(vy, vx);
        vx *= 0.89;
        vy *= 0.89;
      }
      wireMat.opacity = 0.26 + 0.16 * (0.5 + 0.5 * Math.sin(t * 1.4));
      sprites.forEach((s) => {
        const z = s.position.z;
        const opacity = z <= 0 ? 0 : Math.min(1, z / (SPHERE_R * 0.3));
        const scale = 0.78 + (Math.max(0, z) / SPHERE_R) * 0.42;
        if (s !== hovered) {
          s.material.opacity = opacity;
          s.scale.set(s.userData.base * scale, s.userData.baseH * scale, 1);
        }
      });
      renderer.render(scene, camera);
    }
    buildCloud().then(() => animate());

    return () => {
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
    };
  }, [skills]);

  return (
    <div className="relative w-full max-w-125 mx-auto flex items-center justify-center">
      <div ref={containerRef} className="w-full aspect-square cursor-grab" />
      <div
        ref={tooltipRef}
        className="fixed pointer-events-none opacity-0 transition-opacity duration-150 whitespace-nowrap rounded-full border border-white/20 bg-[rgba(8,8,14,0.88)] px-4 py-1 text-xs font-semibold tracking-wide text-white z-50"
      />
    </div>
  );
}
