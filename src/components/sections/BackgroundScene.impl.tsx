"use client";

/**
 * BackgroundScene — global ambient backdrop. Two variants:
 *
 *   • "ribbon" (default, inner pages) — original chromeribbon: a CatmullRom
 *     flowing tube with per-frame anchor displacement.
 *
 *   • "globe" (homepage) — iridescent chrome sphere. Centered, slowly
 *     rotating, evolves on scroll (tilt, scale, speed). Pairs with the
 *     premium navy backdrop layered into the homepage itself.
 *
 * Shared infrastructure (lights, composer, bloom, vignette, cursor parallax,
 * scroll drift) is identical between variants. Single-canvas rule honoured.
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const TUNING = {
  // ───── Ribbon variant (inner pages) ─────
  RIBBON_TUBE_RADIUS: 0.20,
  RIBBON_TUBULAR_SEGMENTS: 100,  // was 160 — cuts geometry rebuild cost ~38%
  RIBBON_RADIAL_SEGMENTS: 14,    // was 20
  RIBBON_CURVE_TENSION: 0.55,
  RIBBON_POSITION_X: 1.30,
  RIBBON_POSITION_Y: 0.00,
  RIBBON_ROTATION_Y_SPEED: 0.045,
  FLOW_AMP_X: 0.55,
  FLOW_AMP_Y: 0.55,
  FLOW_AMP_Z: 0.60,
  FLOW_FREQ: 0.42,
  FLOW_PHASE_STEP: 0.85,

  RIBBON_BLOOM_STRENGTH: 0.28,
  RIBBON_BLOOM_RADIUS: 0.65,
  RIBBON_BLOOM_THRESHOLD: 0.85,
  RIBBON_VIGNETTE_AMOUNT: 0.78,
  RIBBON_CANVAS_OPACITY: 0.48,

  // ───── Globe variant (homepage) ─────
  GLOBE_RADIUS: 1.55,
  GLOBE_SEGMENTS: 96,
  GLOBE_POSITION_X: 0.00,
  GLOBE_POSITION_Y: 0.00,
  GLOBE_ROTATION_Y_SPEED: 0.012,
  GLOBE_WOBBLE_AMP: 0.04,
  GLOBE_WOBBLE_FREQ: 0.12,
  SCROLL_GLOBE_SCALE: 0.18,
  SCROLL_GLOBE_TILT: 0.45,
  SCROLL_GLOBE_SPEED_BOOST: 0.20,
  SCROLL_GLOBE_DRIFT_Y: 5.50,  // large so the globe is well off-screen past Hero

  // Wireframe lat/long overlay — sits just outside the chrome sphere, gives
  // the globe a "technology / data" read instead of just a chrome ball.
  // Counter-rotates slowly so it shimmers against the chrome below.
  WIRE_RADIUS_OFFSET: 0.010,   // wireframe is slightly larger than the core
  WIRE_WIDTH_SEGMENTS: 32,     // meridians (longitude lines)
  WIRE_HEIGHT_SEGMENTS: 18,    // parallels (latitude lines)
  WIRE_OPACITY: 0.70,          // brighter — the grid carries the sphere outline
  WIRE_COUNTER_ROTATE: -0.03,  // small counter-spin so it shimmers

  // Surface network nodes — glowing dots distributed on the globe surface.
  // Each node picks from a small blockchain/AI palette (cyan, electric blue,
  // cerulean, violet) so the network reads as multi-protocol / multi-domain.
  NODE_COUNT: 56,
  NODE_RADIUS_OFFSET: 0.025,
  NODE_SIZE: 18,
  NODE_OPACITY: 0.95,
  NODE_PULSE_SPEED: 1.2,

  // Connection arcs — curved lines between random pairs of surface nodes,
  // bulging outward. Reads as blockchain transactions / AI data flows.
  ARC_COUNT: 26,
  ARC_POINTS: 30,
  ARC_BULGE: 0.22,
  ARC_OPACITY: 0.75,

  // Equatorial orbital ring — thin violet torus tilted off-axis.
  RING_RADIUS_FACTOR: 1.18,
  RING_TUBE: 0.012,
  RING_OPACITY: 0.42,
  RING_TILT_X: 0.30,
  RING_ORBIT_SPEED: 0.12,

  // Pulsing inner core — additive cyan sphere inside the wireframe.
  CORE_RADIUS_FACTOR: 0.42,
  CORE_OPACITY: 0.55,
  CORE_PULSE_SPEED: 0.9,

  // Star halo — points distributed in a spherical shell around the globe.
  // Each star twinkles with its own random phase so the halo feels alive.
  STAR_COUNT: 240,
  STAR_INNER_RADIUS: 2.20,     // just outside the globe (radius 1.65)
  STAR_OUTER_RADIUS: 3.80,
  STAR_POINT_SIZE: 30,         // pixel size at distance 0; scaled by perspective
  STAR_OPACITY: 0.92,
  STAR_ROTATE_SPEED: 0.018,    // very slow counter-spin
  STAR_TWINKLE_SPEED: 1.6,

  GLOBE_BLOOM_STRENGTH: 0.16,
  GLOBE_BLOOM_RADIUS: 0.55,
  GLOBE_BLOOM_THRESHOLD: 0.92,
  GLOBE_VIGNETTE_AMOUNT: 0.22,
  GLOBE_CANVAS_OPACITY: 1.0,

  // ───── Shared ─────
  MAT_METALNESS: 1.0,
  MAT_ROUGHNESS: 0.14,
  MAT_IRIDESCENCE: 1.0,
  MAT_IRIDESCENCE_IOR: 1.35,
  MAT_CLEARCOAT: 1.0,
  MAT_CLEARCOAT_ROUGHNESS: 0.05,
  ENV_INTENSITY: 0.85,

  LIGHT_CYAN_INTENSITY: 14,
  LIGHT_LAVENDER_INTENSITY: 16,
  LIGHT_CERULEAN_INTENSITY: 12,
  KEY_LIGHT_INTENSITY: 0.22,

  CAMERA_FOV: 42,
  CAMERA_DISTANCE: 5.4,

  MOUSE_PARALLAX_X: 0.9,
  MOUSE_PARALLAX_Y: 0.5,
  MOUSE_LERP: 0.05,

  SCROLL_CAMERA_Y: -1.2,
  SCROLL_CAMERA_Z: 0.4,
  SCROLL_LERP: 0.06,

  IDLE_CAMERA_DRIFT_RANGE: 0.20,
  IDLE_CAMERA_DRIFT_PERIOD: 30,
  LIGHT_DRIFT_PERIOD: 28,

  GRAIN_AMOUNT: 0.025,
  MAX_PIXEL_RATIO: 2.0,  // render at native retina resolution — kills the "graphic" / blocky look
} as const;

export type SceneTint = "default" | "blockchain" | "ai" | "crypto";
export type SceneVariant = "ribbon" | "globe" | "key" | "crypto" | "neural" | "chain" | "appdev" | "aboutus" | "resources";

/**
 * Per-category tint — biases the three brand point lights to give each
 * area of the site a subtle identity. Values are multipliers applied to
 * LIGHT_*_INTENSITY and BLOOM_STRENGTH at scene-mount time.
 */
const TINTS: Record<SceneTint, { cyan: number; lavender: number; cerulean: number; bloom: number }> = {
  default:    { cyan: 1.00, lavender: 1.00, cerulean: 1.00, bloom: 1.00 },
  blockchain: { cyan: 0.70, lavender: 0.50, cerulean: 1.55, bloom: 1.10 },
  crypto:     { cyan: 1.55, lavender: 0.60, cerulean: 1.00, bloom: 1.05 },
  ai:         { cyan: 0.55, lavender: 1.65, cerulean: 0.75, bloom: 1.15 },
};

function mountScene(
  canvas: HTMLCanvasElement,
  tint: SceneTint,
  variant: SceneVariant,
  onFps?: (fps: number) => void
): (() => void) | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch (err) {
    if (typeof console !== "undefined") {
      console.warn("[BackgroundScene] WebGL unavailable — fallback to gradient.", err);
    }
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, TUNING.MAX_PIXEL_RATIO));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(TUNING.CAMERA_FOV, 1, 0.1, 100);
  const cameraBase = new THREE.Vector3(0, 0, TUNING.CAMERA_DISTANCE);
  camera.position.copy(cameraBase);

  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envScene = new RoomEnvironment();
  const envRT = pmrem.fromScene(envScene, 0.04);
  scene.environment = envRT.texture;

  // ─────────── Shared material ───────────
  // Globe uses an UNLIT (MeshBasicMaterial) sphere. No specular, no env-map
  // reflections, no response to any scene light — guarantees no bright blobs
  // can ever appear on it. The sphere reads as a soft semi-transparent solid;
  // the wireframe overlay carries the structure on top.
  //
  // Ribbon keeps the full mirror-chrome MeshPhysicalMaterial.
  const isGlobeMat = variant === "globe";
  const isKeyMat = variant === "key";
  const meshMaterial: THREE.Material = isGlobeMat
    ? new THREE.MeshBasicMaterial({
        color: new THREE.Color("#5E7DA8"),
        transparent: true,
        opacity: 0.30,
        side: THREE.FrontSide,
      })
    : new THREE.MeshPhysicalMaterial({
        // Key variant: obsidian-titanium — dark cool-toned metal with
        // restrained iridescence (subtle Fresnel shimmer, not rainbow plastic).
        // Ribbon variant: brighter polished chrome with full iridescence —
        // the flowing form needs the rainbow play to read.
        color: new THREE.Color(isKeyMat ? "#2C3744" : "#E8ECF2"),
        metalness: TUNING.MAT_METALNESS,
        roughness: isKeyMat ? 0.18 : 0.10,
        iridescence: isKeyMat ? 0.55 : TUNING.MAT_IRIDESCENCE,
        iridescenceIOR: TUNING.MAT_IRIDESCENCE_IOR,
        iridescenceThicknessRange: isKeyMat ? [140, 520] : [80, 880],
        clearcoat: TUNING.MAT_CLEARCOAT,
        clearcoatRoughness: isKeyMat ? 0.10 : 0.04,
        envMapIntensity: isKeyMat ? 1.0 : 1.2,
        side: THREE.DoubleSide,
      });

  // ─────────── Variant-specific geometry ───────────
  const isGlobe = variant === "globe";
  const isKey = variant === "key";
  const isCrypto = variant === "crypto";
  const isNeural = variant === "neural";
  const isChain = variant === "chain";
  const isAppDev = variant === "appdev";
  const isAboutUs = variant === "aboutus";
  const isResources = variant === "resources";
  // Globe variant — STARS_ONLY mode. The cinematic key image owns the Hero
  // visual; the canvas just contributes a sparse star halo behind the rest
  // of the page (visible in gaps between section-boxes).
  const STARS_ONLY = true;

  // Ribbon state (only used when variant === "ribbon")
  const ANCHORS: THREE.Vector3[] = [
    new THREE.Vector3(0.20, 2.60, -0.40),
    new THREE.Vector3(-0.80, 1.40, 0.80),
    new THREE.Vector3(1.10, 0.50, -0.50),
    new THREE.Vector3(-0.40, -0.40, 0.90),
    new THREE.Vector3(1.20, -1.30, -0.40),
    new THREE.Vector3(-0.30, -2.20, 0.70),
    new THREE.Vector3(0.60, -3.00, -0.20),
  ];
  const PHASES = ANCHORS.map((_, i) => i * TUNING.FLOW_PHASE_STEP);
  const livePoints = ANCHORS.map((v) => v.clone());

  function buildRibbonGeometry() {
    const curve = new THREE.CatmullRomCurve3(
      livePoints,
      false,
      "catmullrom",
      TUNING.RIBBON_CURVE_TENSION
    );
    return new THREE.TubeGeometry(
      curve,
      TUNING.RIBBON_TUBULAR_SEGMENTS,
      TUNING.RIBBON_TUBE_RADIUS,
      TUNING.RIBBON_RADIAL_SEGMENTS,
      false
    );
  }

  const meshGroup = new THREE.Group();
  if (isGlobe) {
    meshGroup.position.set(TUNING.GLOBE_POSITION_X, TUNING.GLOBE_POSITION_Y, 0);
  } else {
    meshGroup.position.set(TUNING.RIBBON_POSITION_X, TUNING.RIBBON_POSITION_Y, 0);
  }
  scene.add(meshGroup);

  // Geometries we need to dispose at cleanup.
  const ownedGeometries: THREE.BufferGeometry[] = [];
  let meshObj: THREE.Mesh;
  if (isKey) {
    // ─── Horizontal master-key with orbital ring + sparse particles ───
    // Adapted from the ORBITA reference: bow on the left, shaft running
    // right, four teeth hanging at the bottom-right, triangular tip.
    // Surrounded by an inclined orbital ring with a satellite point and
    // ~140 sparse vertex-coloured particles in the brand cool palette.
    // The key sits in an isometric tilt and rotates slowly on Y.

    const keyGroup = new THREE.Group();

    // Cool palette — silver-blue body, electric-blue node, soft violet
    // satellite. No bright cyan / Tron edge lines.
    const COLOR_NODE   = 0x5FB4E6;
    const COLOR_BLUE   = 0x6F8FD8;
    const COLOR_VIOLET = 0x9D86D4;

    // ─── Lighting ────────────────────────────────────────────────────
    // Cool ambient + warm-tinted key + violet rim, mirroring the
    // reference setup so the silver-blue metal reads correctly.
    scene.add(new THREE.AmbientLight(0x4A5072, 0.7));
    const keyLight = new THREE.DirectionalLight(0xCFE2F4, 2.0);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(COLOR_VIOLET, 1.4);
    rimLight.position.set(-6, -2, -3);
    scene.add(rimLight);
    const accentLight = new THREE.PointLight(COLOR_BLUE, 1.3, 22);
    accentLight.position.set(1, 3, 5);
    scene.add(accentLight);

    // ─── Materials ───────────────────────────────────────────────────
    // Silver-blue brushed metal — keeps the homepage's MeshPhysicalMaterial
    // base so the existing env-map pipeline applies. Slightly brighter
    // body tone + a punchier emissive so the silhouette reads cleanly
    // against the dark hero rather than getting muddy.
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#B4BFDC"),
      metalness: 1.0,
      roughness: 0.20,
      emissive: new THREE.Color("#2A3A78"),
      emissiveIntensity: 0.55,
      clearcoat: 0.85,
      clearcoatRoughness: 0.10,
    });
    meshGroup.userData.bodyMaterial = bodyMaterial;

    // Inner glowing node — orbits the bow centre in the tick.
    const nodeMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(COLOR_BLUE),
      emissive: new THREE.Color(COLOR_NODE),
      emissiveIntensity: 1.1,
      metalness: 0.5,
      roughness: 0.35,
    });
    meshGroup.userData.accentMaterial = nodeMaterial;

    // Helper — drop a body piece into the key group (no edge-glow line
    // overlay; the new look reads clean, not Tron).
    const addPiece = (
      geom: THREE.BufferGeometry,
      x: number, y: number, z = 0,
      rotation: { x?: number; y?: number; z?: number } = {},
      material: THREE.Material = bodyMaterial,
    ) => {
      ownedGeometries.push(geom);
      const mesh = new THREE.Mesh(geom, material);
      mesh.position.set(x, y, z);
      mesh.rotation.x = rotation.x ?? 0;
      mesh.rotation.y = rotation.y ?? 0;
      mesh.rotation.z = rotation.z ?? 0;
      keyGroup.add(mesh);
      return mesh;
    };

    // ─── Bow (large torus, left) ─────────────────────────────────────
    const bowX = -2.0;
    const bow = addPiece(
      new THREE.TorusGeometry(1.12, 0.17, 56, 160),
      bowX, 0,
    );

    // Inner thin ring — spins independently on X+Z in the tick.
    const innerGeom = new THREE.TorusGeometry(0.60, 0.045, 32, 128);
    ownedGeometries.push(innerGeom);
    const innerRing = new THREE.Mesh(innerGeom, bodyMaterial);
    innerRing.position.set(bowX, 0, 0);
    keyGroup.add(innerRing);

    // Glowing node sphere — orbits the bow centre (animated in tick).
    const nodeGeom = new THREE.SphereGeometry(0.13, 24, 24);
    ownedGeometries.push(nodeGeom);
    const node = new THREE.Mesh(nodeGeom, nodeMaterial);
    node.position.set(bowX, 0, 0);
    keyGroup.add(node);

    // ─── Shaft + collar + ridge ─────────────────────────────────────
    const shaftGeom = new THREE.CylinderGeometry(0.155, 0.155, 3.5, 40);
    ownedGeometries.push(shaftGeom);
    const shaft = new THREE.Mesh(shaftGeom, bodyMaterial);
    shaft.rotation.z = Math.PI / 2;
    shaft.position.set(0.5, 0, 0);
    keyGroup.add(shaft);

    const collarGeom = new THREE.CylinderGeometry(0.27, 0.27, 0.28, 40);
    ownedGeometries.push(collarGeom);
    const collar = new THREE.Mesh(collarGeom, bodyMaterial);
    collar.rotation.z = Math.PI / 2;
    collar.position.set(-0.9, 0, 0);
    keyGroup.add(collar);

    addPiece(
      new THREE.TorusGeometry(0.20, 0.035, 16, 40),
      -0.5, 0, 0,
      { y: Math.PI / 2 },
    );

    // ─── Four teeth hanging off the bottom-right of the shaft ───────
    const TEETH = [
      { w: 0.24, h: 0.50, x: 1.50 },
      { w: 0.24, h: 0.86, x: 1.84 },
      { w: 0.24, h: 0.40, x: 2.16 },
      { w: 0.24, h: 0.66, x: 2.48 },
    ] as const;
    for (const t of TEETH) {
      addPiece(
        new THREE.BoxGeometry(t.w, t.h, 0.27),
        t.x, -0.15 - t.h / 2, 0,
      );
    }

    // ─── Triangular tip at the far right ────────────────────────────
    const tipShape = new THREE.Shape();
    tipShape.moveTo(0, 0.20);
    tipShape.lineTo(-0.17, -0.14);
    tipShape.lineTo(0.17, -0.14);
    tipShape.lineTo(0, 0.20);
    const tipGeom = new THREE.ExtrudeGeometry(tipShape, {
      depth: 0.27,
      bevelEnabled: false,
    });
    ownedGeometries.push(tipGeom);
    const tip = new THREE.Mesh(tipGeom, bodyMaterial);
    tip.position.set(2.8, 0, -0.135);
    keyGroup.add(tip);

    // Isometric tilt — what makes the key read as a 3D artefact.
    keyGroup.rotation.x = -0.30;
    keyGroup.rotation.y = 0.50;
    meshGroup.add(keyGroup);

    // ─── Orbital ring + satellite (parented to meshGroup, not keyGroup,
    //     so they're not pulled by the key's auto-rotation) ───────────
    const orbitGroup = new THREE.Group();
    const orbitTorusGeom = new THREE.TorusGeometry(3.4, 0.012, 16, 200);
    ownedGeometries.push(orbitTorusGeom);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: COLOR_BLUE,
      transparent: true,
      opacity: 0.30,
      depthWrite: false,
    });
    meshGroup.userData.orbitMat = orbitMat;
    orbitGroup.add(new THREE.Mesh(orbitTorusGeom, orbitMat));

    const satMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(COLOR_VIOLET),
      emissive: new THREE.Color(COLOR_VIOLET),
      emissiveIntensity: 1.0,
      roughness: 0.4,
      metalness: 0.4,
    });
    meshGroup.userData.satMaterial = satMaterial;
    const satGeom = new THREE.SphereGeometry(0.085, 18, 18);
    ownedGeometries.push(satGeom);
    const satellite = new THREE.Mesh(satGeom, satMaterial);
    orbitGroup.add(satellite);
    orbitGroup.rotation.x = Math.PI / 2.3;
    orbitGroup.rotation.z = 0.25;
    meshGroup.add(orbitGroup);

    // ─── Sparse particle field (Points) ──────────────────────────────
    // ~140 small dots scattered in a flattened spherical volume,
    // vertex-coloured from the cool palette. Reads as ambient cosmos
    // around the artefact.
    const PARTICLE_COUNT = 140;
    const palette = [
      new THREE.Color(COLOR_NODE),
      new THREE.Color(COLOR_BLUE),
      new THREE.Color(COLOR_VIOLET),
    ];
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pColors    = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r  = 4.5 + Math.random() * 6;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPositions[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pPositions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.55;
      pPositions[i * 3 + 2] = r * Math.cos(ph);
      const c = palette[Math.floor(Math.random() * palette.length)];
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeom.setAttribute("color",    new THREE.BufferAttribute(pColors, 3));
    ownedGeometries.push(pGeom);
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    meshGroup.userData.particleMat = pMat;
    const particlesObj = new THREE.Points(pGeom, pMat);
    meshGroup.add(particlesObj);

    // Userdata contract — drives the tick.
    meshObj = bow;
    meshGroup.userData.keyGroup    = keyGroup;
    meshGroup.userData.innerRing   = innerRing;
    meshGroup.userData.node        = node;
    meshGroup.userData.nodeOrbitR  = 1.12;
    meshGroup.userData.nodeOriginX = bowX;
    meshGroup.userData.orbitGroup  = orbitGroup;
    meshGroup.userData.satellite   = satellite;
    meshGroup.userData.particles   = particlesObj;
    meshGroup.userData.sideAccents = [];
    meshGroup.userData.portalRings = [];
  } else if (isCrypto) {
    // ─── Cryptocurrency variant — orbit-arc + coin + embossed key ─────
    // A 3/4-arc orbital ring (with end-cap spheres so the gap reads
    // intentional), an orbiting glowing node, a notched coin disc in
    // the centre, and a small embossed key on the coin face. Lit with
    // the same cool palette as the horizontal-key variant.

    const COL_CYAN   = 0x5FB4E6;
    const COL_BLUE   = 0x6F8FD8;
    const COL_VIOLET = 0xB06CF0;

    // Lighting
    scene.add(new THREE.AmbientLight(0x4A5072, 0.7));
    const keyLight = new THREE.DirectionalLight(0x9FD0F4, 2.2);
    keyLight.position.set(5, 5, 7);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xC89DF0, 1.7);
    rimLight.position.set(-6, -1, -2);
    scene.add(rimLight);
    const accentLight = new THREE.PointLight(COL_BLUE, 1.5, 22);
    accentLight.position.set(0, 2, 5);
    scene.add(accentLight);

    // Shared materials
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#7A86D8"),
      metalness: 1.0,
      roughness: 0.22,
      emissive: new THREE.Color("#2A3A7A"),
      emissiveIntensity: 0.5,
    });
    const coinMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#9FB0E0"),
      metalness: 1.0,
      roughness: 0.18,
      emissive: new THREE.Color("#243066"),
      emissiveIntensity: 0.45,
    });
    const nodeMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(COL_BLUE),
      emissive: new THREE.Color(COL_CYAN),
      emissiveIntensity: 1.25,
      metalness: 0.5,
      roughness: 0.30,
    });
    const embossKeyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#C7B4E8"),
      metalness: 1.0,
      roughness: 0.20,
      emissive: new THREE.Color("#4A2A72"),
      emissiveIntensity: 0.55,
    });
    meshGroup.userData.bodyMaterial   = ringMat;
    meshGroup.userData.coinMaterial   = coinMat;
    meshGroup.userData.accentMaterial = nodeMat;
    meshGroup.userData.keyMaterial    = embossKeyMat;

    // ── Logo group (the whole emblem) ──
    const logoGroup = new THREE.Group();

    // Orbit arc — 3/4 circle with sphere caps at both ends, tilted on Z
    const orbitGroup = new THREE.Group();
    const ARC_RADIUS = 2.05;
    const ARC_THETA  = Math.PI * 1.62;
    const ringGeom = new THREE.TorusGeometry(ARC_RADIUS, 0.16, 24, 120, ARC_THETA);
    ownedGeometries.push(ringGeom);
    orbitGroup.add(new THREE.Mesh(ringGeom, ringMat));
    const capGeom = new THREE.SphereGeometry(0.16, 20, 20);
    ownedGeometries.push(capGeom);
    const capStart = new THREE.Mesh(capGeom, ringMat);
    capStart.position.set(ARC_RADIUS, 0, 0);
    orbitGroup.add(capStart);
    const capEnd = new THREE.Mesh(capGeom, ringMat);
    capEnd.position.set(
      Math.cos(ARC_THETA) * ARC_RADIUS,
      Math.sin(ARC_THETA) * ARC_RADIUS,
      0,
    );
    orbitGroup.add(capEnd);
    const ORBIT_TILT_Z = Math.PI * 0.62;
    orbitGroup.rotation.z = ORBIT_TILT_Z;
    logoGroup.add(orbitGroup);

    // Orbiting node — icosahedron with a faceted glow
    const nodeGeom = new THREE.IcosahedronGeometry(0.34, 2);
    ownedGeometries.push(nodeGeom);
    const node = new THREE.Mesh(nodeGeom, nodeMat);
    logoGroup.add(node);

    // Inner coin/token — disc body + two rim toruses + 8 radial notches
    const coinGroup = new THREE.Group();
    const coinBodyGeom = new THREE.CylinderGeometry(1.15, 1.15, 0.34, 64);
    ownedGeometries.push(coinBodyGeom);
    const coinBody = new THREE.Mesh(coinBodyGeom, coinMat);
    coinBody.rotation.x = Math.PI / 2;
    coinGroup.add(coinBody);
    const rimGeom = new THREE.TorusGeometry(1.0, 0.07, 24, 128);
    ownedGeometries.push(rimGeom);
    const rimFront = new THREE.Mesh(rimGeom, coinMat);
    rimFront.position.z = 0.18;
    coinGroup.add(rimFront);
    const rimBack = new THREE.Mesh(rimGeom, coinMat);
    rimBack.position.z = -0.18;
    coinGroup.add(rimBack);
    const notchGeom = new THREE.BoxGeometry(0.16, 0.34, 0.42);
    ownedGeometries.push(notchGeom);
    const NOTCHES = 8;
    for (let i = 0; i < NOTCHES; i++) {
      const a = (i / NOTCHES) * Math.PI * 2;
      const notch = new THREE.Mesh(notchGeom, coinMat);
      notch.position.set(Math.cos(a) * 1.15, Math.sin(a) * 1.15, 0);
      notch.rotation.z = a;
      coinGroup.add(notch);
    }
    logoGroup.add(coinGroup);

    // Embossed key on the coin face
    const embossGroup = new THREE.Group();
    const keyBowGeom = new THREE.TorusGeometry(0.30, 0.10, 24, 80);
    ownedGeometries.push(keyBowGeom);
    const keyBow = new THREE.Mesh(keyBowGeom, embossKeyMat);
    keyBow.position.set(0, 0.62, 0.30);
    embossGroup.add(keyBow);
    const keyShaftGeom = new THREE.CylinderGeometry(0.10, 0.10, 1.10, 24);
    ownedGeometries.push(keyShaftGeom);
    const keyShaft = new THREE.Mesh(keyShaftGeom, embossKeyMat);
    keyShaft.position.set(0, -0.05, 0.30);
    embossGroup.add(keyShaft);
    const toothBigGeom = new THREE.BoxGeometry(0.34, 0.16, 0.20);
    ownedGeometries.push(toothBigGeom);
    const toothBig = new THREE.Mesh(toothBigGeom, embossKeyMat);
    toothBig.position.set(0.20, -0.50, 0.30);
    embossGroup.add(toothBig);
    const toothSmallGeom = new THREE.BoxGeometry(0.24, 0.16, 0.20);
    ownedGeometries.push(toothSmallGeom);
    const toothSmall = new THREE.Mesh(toothSmallGeom, embossKeyMat);
    toothSmall.position.set(0.15, -0.28, 0.30);
    embossGroup.add(toothSmall);
    logoGroup.add(embossGroup);

    // Slight isometric tilt
    logoGroup.rotation.x = -0.18;
    logoGroup.rotation.y = 0.35;
    meshGroup.add(logoGroup);

    // Sparse particles around the scene — cool palette
    const PARTICLE_COUNT = 110;
    const palette = [
      new THREE.Color(COL_CYAN),
      new THREE.Color(COL_BLUE),
      new THREE.Color(COL_VIOLET),
    ];
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    const pColors    = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r  = 3.5 + Math.random() * 4.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPositions[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pPositions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6;
      pPositions[i * 3 + 2] = r * Math.cos(ph);
      const c = palette[Math.floor(Math.random() * palette.length)];
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeom.setAttribute("color",    new THREE.BufferAttribute(pColors, 3));
    ownedGeometries.push(pGeom);
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.60,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    meshGroup.userData.particleMat = pMat;
    const particlesObj = new THREE.Points(pGeom, pMat);
    meshGroup.add(particlesObj);

    // Userdata for tick
    meshObj = coinBody;
    meshGroup.userData.logoGroup    = logoGroup;
    meshGroup.userData.coinGroup    = coinGroup;
    meshGroup.userData.embossGroup  = embossGroup;
    meshGroup.userData.node         = node;
    meshGroup.userData.nodeOrbitR   = ARC_RADIUS;
    meshGroup.userData.nodeTiltZ    = ORBIT_TILT_Z;
    meshGroup.userData.particles    = particlesObj;
    meshGroup.userData.sideAccents  = [];
    meshGroup.userData.portalRings  = [];
  } else if (isNeural) {
    // ─── AI variant — neural-network core + orbit ring + key accent ───
    // Three shells of Fibonacci-distributed nodes form the "brain";
    // nearby nodes connect with synaptic edges that flicker. A small
    // key shape sits below the cluster as a faint brand callback.
    // Palette tuned to match the hero key — cool, restrained, dark.
    // One bright moment (the central core + orbit halo); everything
    // else recedes into the dark.
    const COL_BODY   = 0xB4BFDC; // silver-blue (hero body tone)
    const COL_DEEP   = 0x2A3A78; // hero emissive deep-blue
    const COL_TEAL   = 0x3D7A7E; // muted deep teal
    const COL_BLUE   = 0x4A6A9E; // muted cool blue
    const COL_VIOLET = 0x5A4080; // deep restrained violet
    const COL_SPARK  = 0x5FB4E6; // single bright accent (core + halo)

    // Lighting — restrained cool key + violet rim, mirrors the hero.
    scene.add(new THREE.AmbientLight(0x1A1A2E, 0.45));
    const kLight = new THREE.DirectionalLight(0x9AB4C8, 1.1);
    kLight.position.set(3, 4, 5);
    scene.add(kLight);
    const rLight = new THREE.DirectionalLight(0x6E5A8E, 0.75);
    rLight.position.set(-4, 2, -3);
    scene.add(rLight);
    const fLight = new THREE.PointLight(COL_BLUE, 0.5, 20);
    fLight.position.set(0, -3, 4);
    scene.add(fLight);

    // Materials — MeshStandardMaterial keeps the 30+ nodes cheap.
    // Bodies are deep tones, emissive low so they don't bloom out.
    const cyanNodeMat = new THREE.MeshStandardMaterial({
      color: COL_TEAL, metalness: 0.85, roughness: 0.22,
      emissive: COL_TEAL, emissiveIntensity: 0.22,
    });
    const blueNodeMat = new THREE.MeshStandardMaterial({
      color: COL_BLUE, metalness: 0.85, roughness: 0.22,
      emissive: COL_BLUE, emissiveIntensity: 0.22,
    });
    const purpleNodeMat = new THREE.MeshStandardMaterial({
      color: COL_VIOLET, metalness: 0.85, roughness: 0.22,
      emissive: COL_VIOLET, emissiveIntensity: 0.22,
    });
    const ringMat = new THREE.MeshStandardMaterial({
      color: COL_BODY, metalness: 1.0, roughness: 0.22,
      emissive: COL_DEEP, emissiveIntensity: 0.40,
    });
    // Central core — the one bright moment in the composition.
    const coreMat = new THREE.MeshStandardMaterial({
      color: COL_SPARK, metalness: 0.9, roughness: 0.1,
      emissive: COL_SPARK, emissiveIntensity: 0.55,
      transparent: true, opacity: 0.95,
    });
    const coreGlowMat = new THREE.MeshBasicMaterial({
      color: COL_SPARK, transparent: true, opacity: 0.10,
    });
    const orbitNodeMat = new THREE.MeshStandardMaterial({
      color: COL_SPARK, metalness: 0.6, roughness: 0.25,
      emissive: COL_SPARK, emissiveIntensity: 0.45,
    });
    const orbitGlowMat = new THREE.MeshBasicMaterial({
      color: COL_SPARK, transparent: true, opacity: 0.40,
    });
    const dataRingMat = new THREE.MeshBasicMaterial({
      color: COL_VIOLET, transparent: true, opacity: 0.15,
    });
    const edgeMat = new THREE.LineBasicMaterial({
      color: COL_BLUE, transparent: true, opacity: 0.22,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: COL_BODY, metalness: 0.85, roughness: 0.22,
      emissive: COL_DEEP, emissiveIntensity: 0.20,
      transparent: true, opacity: 0.40,
    });

    // Stash for cleanup
    meshGroup.userData.bodyMaterial = blueNodeMat;
    meshGroup.userData.accentMaterial = cyanNodeMat;
    meshGroup.userData.neuralMats = [
      purpleNodeMat, ringMat, coreMat, coreGlowMat,
      orbitNodeMat, orbitGlowMat, dataRingMat, edgeMat, accentMat,
    ];

    const logoGroup = new THREE.Group();

    // ── Orbit ring (3/4 arc) with caps + orbiting node ──
    const ringR = 2.1;
    const tube = 0.06;
    const ARC = Math.PI * 1.75;
    const ringGeom = new THREE.TorusGeometry(ringR, tube, 16, 128, ARC);
    ownedGeometries.push(ringGeom);
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    logoGroup.add(ringMesh);

    const capGeom = new THREE.SphereGeometry(tube, 12, 12);
    ownedGeometries.push(capGeom);
    const capStart = new THREE.Mesh(capGeom, ringMat);
    capStart.position.set(ringR, 0, 0);
    logoGroup.add(capStart);
    const capEnd = new THREE.Mesh(capGeom, ringMat);
    capEnd.position.set(Math.cos(ARC) * ringR, Math.sin(ARC) * ringR, 0);
    logoGroup.add(capEnd);

    const orbitNodeGroup = new THREE.Group();
    const orbitNodeGeom = new THREE.IcosahedronGeometry(0.12, 2);
    ownedGeometries.push(orbitNodeGeom);
    const orbitNode = new THREE.Mesh(orbitNodeGeom, orbitNodeMat);
    orbitNodeGroup.add(orbitNode);
    const orbitGlowGeom = new THREE.SphereGeometry(0.20, 16, 16);
    ownedGeometries.push(orbitGlowGeom);
    const orbitGlow = new THREE.Mesh(orbitGlowGeom, orbitGlowMat);
    orbitNodeGroup.add(orbitGlow);
    logoGroup.add(orbitNodeGroup);

    // ── Three shells of Fibonacci nodes ──
    const neuralGroup = new THREE.Group();
    const SHELLS = [
      { count: 6,  r: 0.5175 }, // 1.15 * 0.45
      { count: 12, r: 0.8625 }, // 1.15 * 0.75
      { count: 16, r: 1.15   },
    ];
    const SIZES = [0.07, 0.055, 0.045];
    const SHELL_MATS = [cyanNodeMat, blueNodeMat, purpleNodeMat];

    type NeuralNode = { mesh: THREE.Mesh; base: THREE.Vector3 };
    const neuralNodes: NeuralNode[] = [];
    const positions: THREE.Vector3[] = [];

    for (let s = 0; s < SHELLS.length; s++) {
      const { count, r } = SHELLS[s];
      const nodeGeom = new THREE.IcosahedronGeometry(SIZES[s], 2);
      ownedGeometries.push(nodeGeom);
      for (let i = 0; i < count; i++) {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const pos = new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi),
        );
        positions.push(pos);
        const m = new THREE.Mesh(nodeGeom, SHELL_MATS[s]);
        m.position.copy(pos);
        neuralGroup.add(m);
        neuralNodes.push({ mesh: m, base: pos.clone() });
      }
    }

    // ── Synaptic edges between nearby nodes ──
    const EDGE_THRESHOLD = 0.65 * 1.15;
    const edges: THREE.Line[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        if (positions[i].distanceTo(positions[j]) < EDGE_THRESHOLD) {
          const lineGeom = new THREE.BufferGeometry().setFromPoints([
            positions[i], positions[j],
          ]);
          ownedGeometries.push(lineGeom);
          const line = new THREE.Line(lineGeom, edgeMat);
          neuralGroup.add(line);
          edges.push(line);
        }
      }
    }

    // ── Central core ──
    const coreGeom = new THREE.IcosahedronGeometry(0.22, 2);
    ownedGeometries.push(coreGeom);
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    neuralGroup.add(coreMesh);
    const coreGlowGeom = new THREE.SphereGeometry(0.35, 24, 24);
    ownedGeometries.push(coreGlowGeom);
    const coreGlowMesh = new THREE.Mesh(coreGlowGeom, coreGlowMat);
    neuralGroup.add(coreGlowMesh);

    // ── Small key accent below the cluster ──
    const shaftGeom = new THREE.CylinderGeometry(0.025, 0.025, 0.9, 8);
    ownedGeometries.push(shaftGeom);
    const shaft = new THREE.Mesh(shaftGeom, accentMat);
    shaft.position.set(0, -0.8, 0);
    neuralGroup.add(shaft);
    const toothGeom = new THREE.BoxGeometry(0.08, 0.04, 0.025);
    ownedGeometries.push(toothGeom);
    for (let i = 0; i < 2; i++) {
      const tooth = new THREE.Mesh(toothGeom, accentMat);
      tooth.position.set(0.055, -1.05 - i * 0.12, 0);
      neuralGroup.add(tooth);
    }
    const tipGeom = new THREE.ConeGeometry(0.03, 0.08, 4);
    ownedGeometries.push(tipGeom);
    const tip = new THREE.Mesh(tipGeom, accentMat);
    tip.position.set(0, -1.3, 0);
    tip.rotation.z = Math.PI;
    neuralGroup.add(tip);

    logoGroup.add(neuralGroup);

    // ── Data flow ring (XZ plane) ──
    const dataRingGeom = new THREE.TorusGeometry(1.5, 0.015, 8, 80);
    ownedGeometries.push(dataRingGeom);
    const dataRing = new THREE.Mesh(dataRingGeom, dataRingMat);
    dataRing.rotation.x = Math.PI / 2;
    logoGroup.add(dataRing);

    meshGroup.add(logoGroup);

    // ── Particle field (300 dots, additive blending) ──
    const PARTICLE_COUNT = 220;
    const pPositions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 2.5 + Math.random() * 4;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPositions[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pPositions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pPositions[i * 3 + 2] = r * Math.cos(ph);
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    ownedGeometries.push(pGeom);
    const pMat = new THREE.PointsMaterial({
      color: COL_BLUE,
      size: 0.022,
      transparent: true,
      opacity: 0.22,
      sizeAttenuation: true,
    });
    meshGroup.userData.particleMat = pMat;
    const particlesObj = new THREE.Points(pGeom, pMat);
    meshGroup.add(particlesObj);

    // Userdata for tick
    meshObj = coreMesh;
    meshGroup.userData.logoGroup   = logoGroup;
    meshGroup.userData.neuralGroup = neuralGroup;
    meshGroup.userData.orbitNode   = orbitNodeGroup;
    meshGroup.userData.orbitGlow   = orbitGlow;
    meshGroup.userData.orbitGlowMat = orbitGlowMat;
    meshGroup.userData.coreMesh    = coreMesh;
    meshGroup.userData.coreMat     = coreMat;
    meshGroup.userData.coreGlowMesh = coreGlowMesh;
    meshGroup.userData.coreGlowMat = coreGlowMat;
    meshGroup.userData.dataRing    = dataRing;
    meshGroup.userData.dataRingMat = dataRingMat;
    meshGroup.userData.neuralNodes = neuralNodes;
    meshGroup.userData.neuralEdges = edges;
    meshGroup.userData.accentMat   = accentMat;
    meshGroup.userData.particles   = particlesObj;
    meshGroup.userData.ringR       = ringR;
    meshGroup.userData.sideAccents = [];
    meshGroup.userData.portalRings = [];
  } else if (isChain) {
    // ─── Blockchain variant — a literal chain of blocks spiraling
    // through 3D space, with confirmation flashes, hash-arrow flow,
    // pending-tx cubes orbiting the latest block, and an orbit ring.

    // Cool key palette — matches the hero master-key, aboutus, and
    // resources variants. Constant names kept for diff-friendliness;
    // they no longer literally mean green/cyan/magenta/purple/amber.
    const C_GREEN   = 0x5FB4E6; // cyan — dominant (was neon green)
    const C_CYAN    = 0x52B8FF; // cerulean (was bright cyan)
    const C_MAGENTA = 0x9D86D4; // cool violet (was warm magenta)
    const C_PURPLE  = 0x6F8FD8; // muted blue (was bright purple)
    const C_AMBER   = 0xB4BFDC; // silver-blue (was warm amber)

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0x050510, 0.30));
    const kL = new THREE.DirectionalLight(C_CYAN, 0.95);
    kL.position.set(5, 6, 7);
    scene.add(kL);
    const rL = new THREE.DirectionalLight(C_MAGENTA, 0.60);
    rL.position.set(-5, 3, -5);
    scene.add(rL);
    const bL = new THREE.PointLight(C_GREEN, 0.55, 22);
    bL.position.set(0, -5, 4);
    scene.add(bL);

    const root = new THREE.Group();
    meshGroup.add(root);

    // ── Orbit ring (3/4 arc with sphere caps) ──
    const ringR = 3.0;
    const ringTube = 0.03;
    const ARC = Math.PI * 1.72;
    const ringMat = new THREE.MeshStandardMaterial({
      color: C_GREEN, metalness: 0.9, roughness: 0.10,
      emissive: C_GREEN, emissiveIntensity: 0.50,
    });
    const ringGeom = new THREE.TorusGeometry(ringR, ringTube, 20, 160, ARC);
    ownedGeometries.push(ringGeom);
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    root.add(ringMesh);
    const capGeom = new THREE.SphereGeometry(ringTube * 1.3, 12, 12);
    ownedGeometries.push(capGeom);
    const capA = new THREE.Mesh(capGeom, ringMat);
    capA.position.set(ringR, 0, 0);
    root.add(capA);
    const capB = new THREE.Mesh(capGeom, ringMat);
    capB.position.set(ringR * Math.cos(ARC), ringR * Math.sin(ARC), 0);
    root.add(capB);
    const haloMat = new THREE.MeshBasicMaterial({
      color: C_GREEN, transparent: true, opacity: 0.03,
    });
    const haloGeom = new THREE.TorusGeometry(ringR, 0.18, 8, 80, ARC);
    ownedGeometries.push(haloGeom);
    root.add(new THREE.Mesh(haloGeom, haloMat));

    // ── Orbiting node (octahedron with halo) ──
    const oNGroup = new THREE.Group();
    const oNGeom = new THREE.OctahedronGeometry(0.10, 0);
    ownedGeometries.push(oNGeom);
    const oNMat = new THREE.MeshStandardMaterial({
      color: C_GREEN, metalness: 0.95, roughness: 0.05,
      emissive: C_GREEN, emissiveIntensity: 0.85,
    });
    const oN = new THREE.Mesh(oNGeom, oNMat);
    oNGroup.add(oN);
    const oNGGeom = new THREE.SphereGeometry(0.25, 16, 16);
    ownedGeometries.push(oNGGeom);
    const oNGMat = new THREE.MeshBasicMaterial({
      color: C_GREEN, transparent: true, opacity: 0.30,
    });
    const oNG = new THREE.Mesh(oNGGeom, oNGMat);
    oNGroup.add(oNG);
    root.add(oNGroup);

    // ── The chain — 9 blocks on a vertical spiral ──
    const chainGroup = new THREE.Group();
    root.add(chainGroup);

    const BLOCK_COUNT = 9;
    const BLOCK_SIZE = 0.42;
    const CHAIN_RADIUS = 1.6;
    const CHAIN_PITCH = 0.35;
    const blockBoxGeom = new THREE.BoxGeometry(BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    ownedGeometries.push(blockBoxGeom);
    const blockEdgeGeom = new THREE.EdgesGeometry(blockBoxGeom);
    ownedGeometries.push(blockEdgeGeom);
    const blockGlowGeom = new THREE.SphereGeometry(BLOCK_SIZE * 1.2, 10, 10);
    ownedGeometries.push(blockGlowGeom);
    const labelRingGeom = new THREE.TorusGeometry(BLOCK_SIZE * 0.35, 0.008, 8, 20);
    ownedGeometries.push(labelRingGeom);
    const lockGeom = new THREE.OctahedronGeometry(0.04, 0);
    ownedGeometries.push(lockGeom);

    const NON_GENESIS_COLORS = [C_CYAN, C_GREEN, C_MAGENTA, C_CYAN, C_GREEN, C_PURPLE, C_CYAN, C_GREEN];

    type ChainBlock = {
      mesh: THREE.Mesh;
      mat: THREE.MeshStandardMaterial;
      wire: THREE.LineSegments;
      wireMat: THREE.LineBasicMaterial;
      glow: THREE.Mesh;
      glowMat: THREE.MeshBasicMaterial;
      labelMat: THREE.MeshBasicMaterial;
      lockMat: THREE.MeshStandardMaterial;
      labelRing: THREE.Mesh;
      lock: THREE.Mesh;
      basePos: THREE.Vector3;
      index: number;
    };
    const blocks: ChainBlock[] = [];
    const blockPositions: THREE.Vector3[] = [];
    const blockMats: THREE.MeshStandardMaterial[] = [];
    const blockExtraMats: THREE.Material[] = [];

    for (let i = 0; i < BLOCK_COUNT; i++) {
      const angle = (i / BLOCK_COUNT) * Math.PI * 2 * 1.3;
      const y = (i - BLOCK_COUNT / 2 + 0.5) * CHAIN_PITCH;
      const x = CHAIN_RADIUS * Math.cos(angle);
      const z = CHAIN_RADIUS * Math.sin(angle);
      const pos = new THREE.Vector3(x, y, z);
      blockPositions.push(pos);

      const isGenesis = i === 0;
      const accentColor = isGenesis
        ? C_GREEN
        : NON_GENESIS_COLORS[(i - 1) % NON_GENESIS_COLORS.length];

      const blockMat = new THREE.MeshStandardMaterial({
        color: isGenesis ? C_GREEN : 0x0C0C1A,
        metalness: isGenesis ? 0.95 : 0.85,
        roughness: isGenesis ? 0.05 : 0.15,
        emissive: isGenesis ? C_GREEN : accentColor,
        emissiveIntensity: isGenesis ? 0.45 : 0.15,
      });
      blockMats.push(blockMat);
      const blockMesh = new THREE.Mesh(blockBoxGeom, blockMat);
      blockMesh.position.copy(pos);
      const nextAngle = i < BLOCK_COUNT - 1
        ? ((i + 1) / BLOCK_COUNT) * Math.PI * 2 * 1.3
        : angle;
      blockMesh.rotation.y = -nextAngle + Math.PI / 4;
      chainGroup.add(blockMesh);

      const wireMat = new THREE.LineBasicMaterial({
        color: accentColor,
        transparent: true,
        opacity: isGenesis ? 0.9 : 0.5,
      });
      blockExtraMats.push(wireMat);
      const wire = new THREE.LineSegments(blockEdgeGeom, wireMat);
      wire.position.copy(pos);
      wire.rotation.copy(blockMesh.rotation);
      chainGroup.add(wire);

      const glowMat = new THREE.MeshBasicMaterial({
        color: accentColor, transparent: true,
        opacity: isGenesis ? 0.08 : 0.04,
      });
      blockExtraMats.push(glowMat);
      const glow = new THREE.Mesh(blockGlowGeom, glowMat);
      glow.position.copy(pos);
      chainGroup.add(glow);

      const labelMat = new THREE.MeshBasicMaterial({
        color: accentColor, transparent: true, opacity: 0.40,
      });
      blockExtraMats.push(labelMat);
      const labelRing = new THREE.Mesh(labelRingGeom, labelMat);
      labelRing.position.set(pos.x, pos.y + BLOCK_SIZE * 0.55, pos.z);
      labelRing.rotation.x = Math.PI / 2;
      chainGroup.add(labelRing);

      const lockMat = new THREE.MeshStandardMaterial({
        color: accentColor, metalness: 1, roughness: 0,
        emissive: accentColor, emissiveIntensity: 0.60,
      });
      blockExtraMats.push(lockMat);
      const lock = new THREE.Mesh(lockGeom, lockMat);
      lock.position.set(pos.x, pos.y + BLOCK_SIZE * 0.55, pos.z);
      chainGroup.add(lock);

      blocks.push({
        mesh: blockMesh, mat: blockMat,
        wire, wireMat, glow, glowMat,
        labelMat, lockMat,
        labelRing, lock,
        basePos: pos.clone(), index: i,
      });
    }

    // ── Chain links (cylinders between consecutive blocks) ──
    type ChainLink = {
      mat: THREE.MeshStandardMaterial;
      glowMat: THREE.MeshBasicMaterial;
    };
    const links: ChainLink[] = [];
    for (let i = 0; i < BLOCK_COUNT - 1; i++) {
      const from = blockPositions[i];
      const to = blockPositions[i + 1];
      const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
      const dir = new THREE.Vector3().subVectors(to, from);
      const len = dir.length();
      const q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        dir.clone().normalize(),
      );

      const linkMat = new THREE.MeshStandardMaterial({
        color: C_CYAN, metalness: 0.9, roughness: 0.1,
        emissive: C_CYAN, emissiveIntensity: 0.30,
        transparent: true, opacity: 0.60,
      });
      const linkGeom = new THREE.CylinderGeometry(0.018, 0.018, len - BLOCK_SIZE * 0.7, 8);
      ownedGeometries.push(linkGeom);
      const link = new THREE.Mesh(linkGeom, linkMat);
      link.position.copy(mid);
      link.quaternion.copy(q);
      chainGroup.add(link);

      const linkGlowMat = new THREE.MeshBasicMaterial({
        color: C_CYAN, transparent: true, opacity: 0.06,
      });
      const linkGlowGeom = new THREE.CylinderGeometry(0.06, 0.06, len - BLOCK_SIZE * 0.7, 8);
      ownedGeometries.push(linkGlowGeom);
      const linkGlow = new THREE.Mesh(linkGlowGeom, linkGlowMat);
      linkGlow.position.copy(mid);
      linkGlow.quaternion.copy(q);
      chainGroup.add(linkGlow);

      links.push({ mat: linkMat, glowMat: linkGlowMat });
    }

    // ── Hash arrows (small cones flowing along each link) ──
    type HashArrow = { mat: THREE.MeshBasicMaterial; mesh: THREE.Mesh; baseT: number; linkIdx: number };
    const arrows: HashArrow[] = [];
    const arrowGeom = new THREE.ConeGeometry(0.03, 0.06, 4);
    ownedGeometries.push(arrowGeom);
    for (let i = 0; i < BLOCK_COUNT - 1; i++) {
      const from = blockPositions[i];
      const to = blockPositions[i + 1];
      const dir = new THREE.Vector3().subVectors(to, from).normalize();
      const q = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 1, 0), dir,
      );
      for (let a = 0; a < 2; a++) {
        const tt = 0.30 + a * 0.40;
        const arrowMat = new THREE.MeshBasicMaterial({
          color: C_GREEN, transparent: true, opacity: 0.50,
        });
        const arrow = new THREE.Mesh(arrowGeom, arrowMat);
        arrow.position.copy(new THREE.Vector3().lerpVectors(from, to, tt));
        arrow.quaternion.copy(q);
        chainGroup.add(arrow);
        arrows.push({ mat: arrowMat, mesh: arrow, baseT: tt, linkIdx: i });
      }
    }

    // ── Pending transaction cubes orbiting the latest block ──
    type PendingTx = {
      mesh: THREE.Mesh; wire: THREE.LineSegments;
      mat: THREE.MeshBasicMaterial; wMat: THREE.LineBasicMaterial;
      angle: number; r: number; yOff: number; speed: number;
    };
    const pendingTxs: PendingTx[] = [];
    const pendingGeom = new THREE.BoxGeometry(0.06, 0.06, 0.06);
    ownedGeometries.push(pendingGeom);
    const pendingEdgeGeom = new THREE.EdgesGeometry(pendingGeom);
    ownedGeometries.push(pendingEdgeGeom);
    const PENDING_COLORS = [C_GREEN, C_CYAN, C_MAGENTA, C_AMBER];
    for (let i = 0; i < 8; i++) {
      const col = PENDING_COLORS[i % PENDING_COLORS.length];
      const mat = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.45 });
      const mesh = new THREE.Mesh(pendingGeom, mat);
      chainGroup.add(mesh);
      const wMat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.30 });
      const wire = new THREE.LineSegments(pendingEdgeGeom, wMat);
      chainGroup.add(wire);
      pendingTxs.push({
        mesh, wire, mat, wMat,
        angle: (i / 8) * Math.PI * 2,
        r: 0.5 + Math.random() * 0.3,
        yOff: (Math.random() - 0.5) * 0.6,
        speed: 0.30 + Math.random() * 0.5,
      });
    }

    // ── Small key accent ──
    const keyAccentMat = new THREE.MeshStandardMaterial({
      color: C_GREEN, metalness: 0.9, roughness: 0.1,
      emissive: C_GREEN, emissiveIntensity: 0.25,
      transparent: true, opacity: 0.18,
    });
    const kShaftGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8);
    ownedGeometries.push(kShaftGeom);
    const kShaft = new THREE.Mesh(kShaftGeom, keyAccentMat);
    kShaft.position.set(0, -2.0, 0);
    chainGroup.add(kShaft);
    const kToothGeom = new THREE.BoxGeometry(0.045, 0.018, 0.012);
    ownedGeometries.push(kToothGeom);
    for (let i = 0; i < 2; i++) {
      const kTooth = new THREE.Mesh(kToothGeom, keyAccentMat);
      kTooth.position.set(0.035, -2.10 - i * 0.07, 0);
      chainGroup.add(kTooth);
    }
    const kTipGeom = new THREE.ConeGeometry(0.016, 0.04, 4);
    ownedGeometries.push(kTipGeom);
    const kTip = new THREE.Mesh(kTipGeom, keyAccentMat);
    kTip.position.set(0, -2.28, 0);
    kTip.rotation.z = Math.PI;
    chainGroup.add(kTip);

    // ── Particles (400, vertex-coloured) ──
    const PCOUNT = 400;
    const pPositions = new Float32Array(PCOUNT * 3);
    const pColors    = new Float32Array(PCOUNT * 3);
    const palette = [new THREE.Color(C_GREEN), new THREE.Color(C_CYAN), new THREE.Color(C_MAGENTA)];
    for (let i = 0; i < PCOUNT; i++) {
      const r  = 3.5 + Math.random() * 5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPositions[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pPositions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pPositions[i * 3 + 2] = r * Math.cos(ph);
      const pick = Math.random();
      const c = pick < 0.45 ? palette[0] : pick < 0.75 ? palette[1] : palette[2];
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeom.setAttribute("color",    new THREE.BufferAttribute(pColors, 3));
    ownedGeometries.push(pGeom);
    const pMat = new THREE.PointsMaterial({
      size: 0.020,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const particlesObj = new THREE.Points(pGeom, pMat);
    meshGroup.add(particlesObj);

    // Userdata for tick
    meshObj = blocks[0].mesh;
    meshGroup.userData.bodyMaterial = ringMat;
    meshGroup.userData.accentMaterial = keyAccentMat;
    meshGroup.userData.root          = root;
    meshGroup.userData.chainGroup    = chainGroup;
    meshGroup.userData.chainOrbitGroup = oNGroup;
    meshGroup.userData.chainOrbitNode  = oN;
    meshGroup.userData.chainOrbitGlow  = oNG;
    meshGroup.userData.chainOrbitGlowMat = oNGMat;
    meshGroup.userData.chainRingMat   = ringMat;
    meshGroup.userData.chainRingR     = ringR;
    meshGroup.userData.chainBlocks    = blocks;
    meshGroup.userData.chainLinks     = links;
    meshGroup.userData.chainArrows    = arrows;
    meshGroup.userData.chainPending   = pendingTxs;
    meshGroup.userData.chainHaloMat   = haloMat;
    meshGroup.userData.chainKeyAccentMat = keyAccentMat;
    meshGroup.userData.particles      = particlesObj;
    meshGroup.userData.particleMat    = pMat;
    meshGroup.userData.chainBlockSize = BLOCK_SIZE;
    meshGroup.userData.chainBlockMats = blockMats;
    meshGroup.userData.chainExtraMats = blockExtraMats;
    meshGroup.userData.sideAccents = [];
    meshGroup.userData.portalRings = [];
  } else if (isAppDev) {
    // ─── App Development variant — wireframe phone surrounded by
    // floating app tiles, stacked UI layers, code brackets, interlocking
    // gears, deploy rockets, terminal lines, plus an orbit ring + pulses.

    const C_BLUE  = 0x00B0FF;
    const C_VIOL  = 0x7C4DFF;
    const C_CORAL = 0xFF6E40;
    const C_MINT  = 0x64FFDA;

    // Lighting
    scene.add(new THREE.AmbientLight(0x080412, 0.30));
    const kL = new THREE.DirectionalLight(C_BLUE, 0.90);
    kL.position.set(5, 6, 7); scene.add(kL);
    const rL = new THREE.DirectionalLight(C_VIOL, 0.70);
    rL.position.set(-5, 3, -5); scene.add(rL);
    const bL = new THREE.PointLight(C_CORAL, 0.50, 22);
    bL.position.set(0, -5, 4); scene.add(bL);
    const tL = new THREE.PointLight(C_MINT, 0.30, 16);
    tL.position.set(0, 7, 0); scene.add(tL);

    const root = new THREE.Group();
    meshGroup.add(root);

    // ── Orbit ring (3/4 arc with caps) ──
    const ringR = 3.0;
    const ringTube = 0.03;
    const ARC = Math.PI * 1.72;
    const ringMat = new THREE.MeshStandardMaterial({
      color: C_VIOL, metalness: 0.9, roughness: 0.10,
      emissive: C_VIOL, emissiveIntensity: 0.50,
    });
    const ringGeom = new THREE.TorusGeometry(ringR, ringTube, 20, 160, ARC);
    ownedGeometries.push(ringGeom);
    root.add(new THREE.Mesh(ringGeom, ringMat));
    const capGeom = new THREE.SphereGeometry(ringTube * 1.3, 12, 12);
    ownedGeometries.push(capGeom);
    const capA = new THREE.Mesh(capGeom, ringMat);
    capA.position.set(ringR, 0, 0); root.add(capA);
    const capB = new THREE.Mesh(capGeom, ringMat);
    capB.position.set(ringR * Math.cos(ARC), ringR * Math.sin(ARC), 0);
    root.add(capB);
    const haloMat = new THREE.MeshBasicMaterial({
      color: C_VIOL, transparent: true, opacity: 0.03,
    });
    const haloGeom = new THREE.TorusGeometry(ringR, 0.18, 8, 80, ARC);
    ownedGeometries.push(haloGeom);
    root.add(new THREE.Mesh(haloGeom, haloMat));

    // ── Orbiting node ──
    const oNGroup = new THREE.Group();
    const oNGeom = new THREE.OctahedronGeometry(0.10, 2);
    ownedGeometries.push(oNGeom);
    const oNMat = new THREE.MeshStandardMaterial({
      color: C_VIOL, metalness: 0.95, roughness: 0.05,
      emissive: C_VIOL, emissiveIntensity: 0.85,
    });
    const oN = new THREE.Mesh(oNGeom, oNMat);
    oNGroup.add(oN);
    const oNGGeom = new THREE.SphereGeometry(0.25, 16, 16);
    ownedGeometries.push(oNGGeom);
    const oNGMat = new THREE.MeshBasicMaterial({
      color: C_VIOL, transparent: true, opacity: 0.30,
    });
    const oNG = new THREE.Mesh(oNGGeom, oNGMat);
    oNGroup.add(oNG);
    root.add(oNGroup);

    // ── Device group: phone + tiles + layers + brackets + gears + rockets ──
    const devGroup = new THREE.Group();
    root.add(devGroup);

    // Wireframe phone — translucent glass body + neon edges + screen glow
    const PHONE_W = 0.9, PHONE_H = 1.7, PHONE_D = 0.06;
    const phoneGeom = new THREE.BoxGeometry(PHONE_W, PHONE_H, PHONE_D);
    ownedGeometries.push(phoneGeom);
    const phoneEdgeGeom = new THREE.EdgesGeometry(phoneGeom);
    ownedGeometries.push(phoneEdgeGeom);
    const phoneMat = new THREE.MeshPhysicalMaterial({
      color: 0x0A0A20, metalness: 0.3, roughness: 0.10,
      transmission: 0.85, thickness: 0.5, ior: 1.5,
      transparent: true, opacity: 0.15,
    });
    devGroup.add(new THREE.Mesh(phoneGeom, phoneMat));
    const phoneWireMat = new THREE.LineBasicMaterial({
      color: C_BLUE, transparent: true, opacity: 0.70,
    });
    devGroup.add(new THREE.LineSegments(phoneEdgeGeom, phoneWireMat));
    const screenMat = new THREE.MeshBasicMaterial({
      color: C_BLUE, transparent: true, opacity: 0.04, side: THREE.DoubleSide,
    });
    const screenGeom = new THREE.PlaneGeometry(PHONE_W * 0.88, PHONE_H * 0.9);
    ownedGeometries.push(screenGeom);
    const screen = new THREE.Mesh(screenGeom, screenMat);
    screen.position.z = PHONE_D / 2 + 0.002;
    devGroup.add(screen);
    const notchGeom = new THREE.BoxGeometry(0.25, 0.03, 0.005);
    ownedGeometries.push(notchGeom);
    const notchMat = new THREE.MeshBasicMaterial({
      color: C_BLUE, transparent: true, opacity: 0.50,
    });
    const notch = new THREE.Mesh(notchGeom, notchMat);
    notch.position.set(0, PHONE_H * 0.42, PHONE_D / 2 + 0.005);
    devGroup.add(notch);

    // 9 floating app tiles (3×3 grid inside screen) with per-tile glow
    const TILE_SIZE = 0.14;
    const TILE_GAP = 0.22;
    const tileGeom = new THREE.BoxGeometry(TILE_SIZE, TILE_SIZE, 0.02);
    ownedGeometries.push(tileGeom);
    const tileEdgeGeom = new THREE.EdgesGeometry(tileGeom);
    ownedGeometries.push(tileEdgeGeom);
    const tileGlowGeom = new THREE.SphereGeometry(TILE_SIZE * 0.8, 10, 10);
    ownedGeometries.push(tileGlowGeom);
    const TILE_COLORS = [C_CORAL, C_MINT, C_VIOL, C_BLUE, C_CORAL, C_MINT, C_VIOL, C_BLUE, C_CORAL];

    type AppTile = {
      mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial;
      wire: THREE.LineSegments; wireMat: THREE.LineBasicMaterial;
      glow: THREE.Mesh; glowMat: THREE.MeshBasicMaterial;
      baseX: number; baseY: number; baseZ: number;
    };
    const appTiles: AppTile[] = [];
    const tileMats: THREE.Material[] = [];

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const idx = row * 3 + col;
        const color = TILE_COLORS[idx];
        const x = (col - 1) * TILE_GAP;
        const y = (1 - row) * TILE_GAP + 0.05;
        const z = PHONE_D / 2 + 0.04;

        const mat = new THREE.MeshStandardMaterial({
          color: 0x0C0C1A, metalness: 0.85, roughness: 0.15,
          emissive: color, emissiveIntensity: 0.25,
        });
        tileMats.push(mat);
        const mesh = new THREE.Mesh(tileGeom, mat);
        mesh.position.set(x, y, z);
        devGroup.add(mesh);

        const wireMat = new THREE.LineBasicMaterial({
          color, transparent: true, opacity: 0.60,
        });
        tileMats.push(wireMat);
        const wire = new THREE.LineSegments(tileEdgeGeom, wireMat);
        wire.position.copy(mesh.position);
        devGroup.add(wire);

        const glowMat = new THREE.MeshBasicMaterial({
          color, transparent: true, opacity: 0.05,
        });
        tileMats.push(glowMat);
        const glow = new THREE.Mesh(tileGlowGeom, glowMat);
        glow.position.copy(mesh.position);
        devGroup.add(glow);

        appTiles.push({
          mesh, mat, wire, wireMat, glow, glowMat,
          baseX: x, baseY: y, baseZ: z,
        });
      }
    }

    // 3 stacked UI layers behind phone (parallax planes with edge outlines)
    type UILayer = {
      mesh: THREE.Mesh; edge: THREE.LineSegments;
      mat: THREE.MeshBasicMaterial; edgeMat: THREE.LineBasicMaterial;
      baseZ: number;
    };
    const layers: UILayer[] = [];
    const layerMats: THREE.Material[] = [];
    const LAYER_COLORS = [C_BLUE, C_VIOL, C_CORAL];
    for (let i = 0; i < 3; i++) {
      const lw = PHONE_W * (0.75 - i * 0.08);
      const lh = PHONE_H * (0.55 - i * 0.08);
      const planeGeom = new THREE.PlaneGeometry(lw, lh);
      ownedGeometries.push(planeGeom);
      const planeEdgeGeom = new THREE.EdgesGeometry(planeGeom);
      ownedGeometries.push(planeEdgeGeom);
      const lMat = new THREE.MeshBasicMaterial({
        color: LAYER_COLORS[i], transparent: true, opacity: 0.04, side: THREE.DoubleSide,
      });
      layerMats.push(lMat);
      const mesh = new THREE.Mesh(planeGeom, lMat);
      const eMat = new THREE.LineBasicMaterial({
        color: LAYER_COLORS[i], transparent: true, opacity: 0.25,
      });
      layerMats.push(eMat);
      const edge = new THREE.LineSegments(planeEdgeGeom, eMat);
      const baseZ = -PHONE_D / 2 - 0.15 - i * 0.25;
      mesh.position.set((i - 1) * 0.1, 0, baseZ);
      edge.position.copy(mesh.position);
      devGroup.add(mesh);
      devGroup.add(edge);
      layers.push({ mesh, edge, mat: lMat, edgeMat: eMat, baseZ });
    }

    // Code brackets `</>` — two angled bracket marks + a slash
    const bracketMat = new THREE.MeshStandardMaterial({
      color: C_MINT, metalness: 0.9, roughness: 0.10,
      emissive: C_MINT, emissiveIntensity: 0.50,
    });
    const armGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 8);
    ownedGeometries.push(armGeom);
    const makeBracket = (x: number, mirror: boolean) => {
      const grp = new THREE.Group();
      const top = new THREE.Mesh(armGeom, bracketMat);
      top.rotation.z = mirror ? -0.5 : 0.5;
      top.position.set(mirror ? 0.08 : -0.08, 0.10, 0);
      grp.add(top);
      const bot = new THREE.Mesh(armGeom, bracketMat);
      bot.rotation.z = mirror ? 0.5 : -0.5;
      bot.position.set(mirror ? 0.08 : -0.08, -0.10, 0);
      grp.add(bot);
      grp.position.set(x, 0, 0);
      return grp;
    };
    const leftBracket = makeBracket(-1.15, false);
    const rightBracket = makeBracket(1.15, true);
    devGroup.add(leftBracket);
    devGroup.add(rightBracket);
    const slashMat = new THREE.MeshStandardMaterial({
      color: C_CORAL, metalness: 0.9, roughness: 0.10,
      emissive: C_CORAL, emissiveIntensity: 0.40,
    });
    const slashGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.5, 8);
    ownedGeometries.push(slashGeom);
    const slash = new THREE.Mesh(slashGeom, slashMat);
    slash.rotation.z = 0.4;
    slash.position.set(1.15, 0, 0);
    devGroup.add(slash);

    // 2 interlocking gears (counter-rotating, opposite sides)
    const gearMat = new THREE.MeshStandardMaterial({
      color: C_BLUE, metalness: 0.9, roughness: 0.10,
      emissive: C_BLUE, emissiveIntensity: 0.35,
    });
    const gear2Mat = new THREE.MeshStandardMaterial({
      color: C_VIOL, metalness: 0.9, roughness: 0.10,
      emissive: C_VIOL, emissiveIntensity: 0.35,
    });
    const gearRingGeom = new THREE.TorusGeometry(0.15, 0.025, 8, 24);
    ownedGeometries.push(gearRingGeom);
    const gearToothGeom = new THREE.BoxGeometry(0.04, 0.06, 0.04);
    ownedGeometries.push(gearToothGeom);
    const gearHubGeom = new THREE.SphereGeometry(0.04, 12, 12);
    ownedGeometries.push(gearHubGeom);
    const gear2RingGeom = new THREE.TorusGeometry(0.10, 0.020, 8, 20);
    ownedGeometries.push(gear2RingGeom);
    const gear2ToothGeom = new THREE.BoxGeometry(0.03, 0.045, 0.03);
    ownedGeometries.push(gear2ToothGeom);
    const gear2HubGeom = new THREE.SphereGeometry(0.03, 12, 12);
    ownedGeometries.push(gear2HubGeom);

    const gearGroup = new THREE.Group();
    gearGroup.position.set(-1.5, -0.8, 0.3);
    gearGroup.add(new THREE.Mesh(gearRingGeom, gearMat));
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const tooth = new THREE.Mesh(gearToothGeom, gearMat);
      tooth.position.set(Math.cos(a) * 0.18, Math.sin(a) * 0.18, 0);
      tooth.rotation.z = a;
      gearGroup.add(tooth);
    }
    gearGroup.add(new THREE.Mesh(gearHubGeom, gearMat));
    devGroup.add(gearGroup);

    const gear2Group = new THREE.Group();
    gear2Group.position.set(-1.2, -1.15, 0.3);
    gear2Group.add(new THREE.Mesh(gear2RingGeom, gear2Mat));
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const tooth = new THREE.Mesh(gear2ToothGeom, gear2Mat);
      tooth.position.set(Math.cos(a) * 0.12, Math.sin(a) * 0.12, 0);
      tooth.rotation.z = a;
      gear2Group.add(tooth);
    }
    gear2Group.add(new THREE.Mesh(gear2HubGeom, gear2Mat));
    devGroup.add(gear2Group);

    // 5 deploy rockets (cones with trail tubes, lift cyclically)
    type Rocket = {
      mesh: THREE.Mesh; trail: THREE.Mesh;
      mat: THREE.MeshStandardMaterial; trailMat: THREE.MeshBasicMaterial;
      baseX: number; baseZ: number; phase: number;
    };
    const rockets: Rocket[] = [];
    const rocketGeom = new THREE.ConeGeometry(0.03, 0.10, 6);
    ownedGeometries.push(rocketGeom);
    const trailGeom = new THREE.CylinderGeometry(0.010, 0.025, 0.20, 6);
    ownedGeometries.push(trailGeom);
    const ROCKET_COLORS = [C_CORAL, C_MINT, C_VIOL, C_BLUE, C_CORAL];
    const rocketMats: THREE.Material[] = [];
    for (let i = 0; i < 5; i++) {
      const color = ROCKET_COLORS[i];
      const mat = new THREE.MeshStandardMaterial({
        color, metalness: 0.95, roughness: 0.05,
        emissive: color, emissiveIntensity: 0.6,
      });
      rocketMats.push(mat);
      const trailMat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.25,
      });
      rocketMats.push(trailMat);
      const mesh = new THREE.Mesh(rocketGeom, mat);
      const trail = new THREE.Mesh(trailGeom, trailMat);
      const angle = (i / 5) * Math.PI * 2;
      const baseX = Math.cos(angle) * 0.55;
      const baseZ = Math.sin(angle) * 0.55;
      mesh.position.set(baseX, PHONE_H * 0.5 + 0.3, baseZ);
      trail.position.set(baseX, PHONE_H * 0.5 + 0.15, baseZ);
      devGroup.add(mesh);
      devGroup.add(trail);
      rockets.push({ mesh, trail, mat, trailMat, baseX, baseZ, phase: i * 1.2 });
    }

    // 4 terminal lines (right side, blink in sequence)
    type TermLine = { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; baseY: number };
    const termLines: TermLine[] = [];
    const termMats: THREE.Material[] = [];
    for (let i = 0; i < 4; i++) {
      const w = 0.20 + Math.random() * 0.30;
      const tlGeom = new THREE.BoxGeometry(w, 0.012, 0.005);
      ownedGeometries.push(tlGeom);
      const mat = new THREE.MeshBasicMaterial({
        color: C_MINT, transparent: true, opacity: 0.30,
      });
      termMats.push(mat);
      const mesh = new THREE.Mesh(tlGeom, mat);
      mesh.position.set(1.5, 0.5 - i * 0.10, 0.2);
      devGroup.add(mesh);
      termLines.push({ mesh, mat, baseY: 0.5 - i * 0.10 });
    }

    // Key accent — small faded callback
    const keyAccentMat = new THREE.MeshStandardMaterial({
      color: C_VIOL, metalness: 0.9, roughness: 0.10,
      emissive: C_VIOL, emissiveIntensity: 0.25,
      transparent: true, opacity: 0.18,
    });
    const kShaftGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8);
    ownedGeometries.push(kShaftGeom);
    const kShaft = new THREE.Mesh(kShaftGeom, keyAccentMat);
    kShaft.position.set(0, -2.0, 0);
    devGroup.add(kShaft);
    const kToothGeom = new THREE.BoxGeometry(0.045, 0.018, 0.012);
    ownedGeometries.push(kToothGeom);
    for (let i = 0; i < 2; i++) {
      const kTooth = new THREE.Mesh(kToothGeom, keyAccentMat);
      kTooth.position.set(0.035, -2.10 - i * 0.07, 0);
      devGroup.add(kTooth);
    }
    const kTipGeom = new THREE.ConeGeometry(0.016, 0.04, 4);
    ownedGeometries.push(kTipGeom);
    const kTip = new THREE.Mesh(kTipGeom, keyAccentMat);
    kTip.position.set(0, -2.28, 0);
    kTip.rotation.z = Math.PI;
    devGroup.add(kTip);

    // 6 data pulses traveling around orbit ring
    type DataPulse = {
      mesh: THREE.Mesh; glow: THREE.Mesh;
      mat: THREE.MeshBasicMaterial; gMat: THREE.MeshBasicMaterial;
      phase: number; speed: number;
    };
    const dataPulses: DataPulse[] = [];
    const dpMats: THREE.Material[] = [];
    const dpGeom = new THREE.SphereGeometry(0.025, 12, 12);
    ownedGeometries.push(dpGeom);
    const dpGlowGeom = new THREE.SphereGeometry(0.06, 10, 10);
    ownedGeometries.push(dpGlowGeom);
    const DP_COLORS = [C_BLUE, C_VIOL, C_MINT, C_CORAL, C_BLUE, C_VIOL];
    for (let i = 0; i < 6; i++) {
      const color = DP_COLORS[i];
      const mat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.70,
      });
      dpMats.push(mat);
      const gMat = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.20,
      });
      dpMats.push(gMat);
      const mesh = new THREE.Mesh(dpGeom, mat);
      const glow = new THREE.Mesh(dpGlowGeom, gMat);
      root.add(mesh);
      root.add(glow);
      dataPulses.push({
        mesh, glow, mat, gMat,
        phase: (i * ARC) / 6,
        speed: 0.40 + Math.random() * 0.30,
      });
    }

    // 350 particles, vertex-coloured palette
    const PCOUNT = 350;
    const pPositions = new Float32Array(PCOUNT * 3);
    const pColors    = new Float32Array(PCOUNT * 3);
    const palette = [
      new THREE.Color(C_BLUE),
      new THREE.Color(C_VIOL),
      new THREE.Color(C_MINT),
      new THREE.Color(C_CORAL),
    ];
    for (let i = 0; i < PCOUNT; i++) {
      const r  = 3.5 + Math.random() * 5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPositions[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pPositions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pPositions[i * 3 + 2] = r * Math.cos(ph);
      const pick = Math.random();
      const c = pick < 0.30 ? palette[0]
              : pick < 0.55 ? palette[1]
              : pick < 0.80 ? palette[2]
              : palette[3];
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeom.setAttribute("color",    new THREE.BufferAttribute(pColors, 3));
    ownedGeometries.push(pGeom);
    const pMat = new THREE.PointsMaterial({
      size: 0.020,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const particlesObj = new THREE.Points(pGeom, pMat);
    meshGroup.add(particlesObj);

    // Userdata
    meshObj = appTiles[0].mesh;
    meshGroup.userData.bodyMaterial = ringMat;
    meshGroup.userData.accentMaterial = keyAccentMat;
    meshGroup.userData.appdevRoot       = root;
    meshGroup.userData.appdevDevGroup   = devGroup;
    meshGroup.userData.appdevOrbitNode  = oNGroup;
    meshGroup.userData.appdevOrbitNodeGlow = oNG;
    meshGroup.userData.appdevOrbitNodeGlowMat = oNGMat;
    meshGroup.userData.appdevRingMat    = ringMat;
    meshGroup.userData.appdevHaloMat    = haloMat;
    meshGroup.userData.appdevRingR      = ringR;
    meshGroup.userData.appdevArc        = ARC;
    meshGroup.userData.appdevTiles      = appTiles;
    meshGroup.userData.appdevLayers     = layers;
    meshGroup.userData.appdevScreenMat  = screenMat;
    meshGroup.userData.appdevLeftBracket = leftBracket;
    meshGroup.userData.appdevRightBracket = rightBracket;
    meshGroup.userData.appdevSlash      = slash;
    meshGroup.userData.appdevBracketMat = bracketMat;
    meshGroup.userData.appdevSlashMat   = slashMat;
    meshGroup.userData.appdevGearGroup  = gearGroup;
    meshGroup.userData.appdevGear2Group = gear2Group;
    meshGroup.userData.appdevGearMat    = gearMat;
    meshGroup.userData.appdevGear2Mat   = gear2Mat;
    meshGroup.userData.appdevRockets    = rockets;
    meshGroup.userData.appdevPhoneH     = PHONE_H;
    meshGroup.userData.appdevTermLines  = termLines;
    meshGroup.userData.appdevPulses     = dataPulses;
    meshGroup.userData.appdevKeyMat     = keyAccentMat;
    meshGroup.userData.particles        = particlesObj;
    meshGroup.userData.particleMat      = pMat;
    meshGroup.userData.appdevMats       = [
      phoneMat, phoneWireMat, notchMat, oNMat,
      ...tileMats, ...layerMats, ...rocketMats, ...termMats, ...dpMats,
    ];
    meshGroup.userData.sideAccents = [];
    meshGroup.userData.portalRings = [];
  } else if (isAboutUs) {
    // ─── About Us variant — wireframe globe + Fibonacci-distributed
    // team nodes + connection web + DNA value helix + shield emblem +
    // tilted mission rings + 6 orbiting value icons + key accent + dust.

    // Cool key-palette — matches the hero master-key (deep-navy emissive
    // + cyan accent + cool silver-blue body). Constant names kept for
    // diff-friendliness; they no longer literally mean gold/white/teal/rose.
    const C_GOLD   = 0x5FB4E6; // cyan — dominant accent (was warm gold)
    const C_WHITE  = 0xB4BFDC; // silver-blue (was pure white)
    const C_TEAL   = 0x6F8FD8; // muted cool blue (was bright teal)
    const C_ROSE   = 0x9D86D4; // cool violet (was warm rose)

    // Lighting — warm gold key + cool teal rim + rose fill
    scene.add(new THREE.AmbientLight(0x0A0812, 0.35));
    const kL = new THREE.DirectionalLight(C_GOLD, 1.0);
    kL.position.set(5, 6, 7); scene.add(kL);
    const rL = new THREE.DirectionalLight(C_TEAL, 0.60);
    rL.position.set(-5, 3, -5); scene.add(rL);
    const bL = new THREE.PointLight(C_ROSE, 0.40, 22);
    bL.position.set(0, -5, 4); scene.add(bL);
    const tL = new THREE.PointLight(C_WHITE, 0.30, 16);
    tL.position.set(0, 7, 0); scene.add(tL);

    const root = new THREE.Group();
    meshGroup.add(root);

    // ── Orbit ring (ORBITA signature) ──
    const ringR = 3.0;
    const ringTube = 0.03;
    const ARC = Math.PI * 1.72;
    const ringMat = new THREE.MeshStandardMaterial({
      color: C_GOLD, metalness: 0.9, roughness: 0.10,
      emissive: C_GOLD, emissiveIntensity: 0.50,
    });
    const ringGeom = new THREE.TorusGeometry(ringR, ringTube, 20, 160, ARC);
    ownedGeometries.push(ringGeom);
    root.add(new THREE.Mesh(ringGeom, ringMat));
    const capGeom = new THREE.SphereGeometry(ringTube * 1.3, 12, 12);
    ownedGeometries.push(capGeom);
    const capA = new THREE.Mesh(capGeom, ringMat);
    capA.position.set(ringR, 0, 0); root.add(capA);
    const capB = new THREE.Mesh(capGeom, ringMat);
    capB.position.set(ringR * Math.cos(ARC), ringR * Math.sin(ARC), 0);
    root.add(capB);
    const haloMat = new THREE.MeshBasicMaterial({
      color: C_GOLD, transparent: true, opacity: 0.03,
    });
    const haloGeom = new THREE.TorusGeometry(ringR, 0.18, 8, 80, ARC);
    ownedGeometries.push(haloGeom);
    root.add(new THREE.Mesh(haloGeom, haloMat));

    // ── Orbiting node ──
    const oNGroup = new THREE.Group();
    const oNGeom = new THREE.OctahedronGeometry(0.10, 2);
    ownedGeometries.push(oNGeom);
    const oNMat = new THREE.MeshStandardMaterial({
      color: C_GOLD, metalness: 0.95, roughness: 0.05,
      emissive: C_GOLD, emissiveIntensity: 0.85,
    });
    const oN = new THREE.Mesh(oNGeom, oNMat);
    oNGroup.add(oN);
    const oNGGeom = new THREE.SphereGeometry(0.25, 16, 16);
    ownedGeometries.push(oNGGeom);
    const oNGMat = new THREE.MeshBasicMaterial({
      color: C_GOLD, transparent: true, opacity: 0.30,
    });
    const oNG = new THREE.Mesh(oNGGeom, oNGMat);
    oNGroup.add(oNG);
    root.add(oNGroup);

    // ── Centre motif group ──
    const aboutGroup = new THREE.Group();
    root.add(aboutGroup);

    // Wireframe glass globe
    const GLOBE_R = 1.05;
    const globeGeom = new THREE.IcosahedronGeometry(GLOBE_R, 2);
    ownedGeometries.push(globeGeom);
    const globeEdgeGeom = new THREE.EdgesGeometry(globeGeom);
    ownedGeometries.push(globeEdgeGeom);
    const globeMat = new THREE.MeshPhysicalMaterial({
      color: 0x0A0A1E, metalness: 0.2, roughness: 0.05,
      transmission: 0.9, thickness: 0.8, ior: 1.45,
      transparent: true, opacity: 0.08,
    });
    const globeMesh = new THREE.Mesh(globeGeom, globeMat);
    aboutGroup.add(globeMesh);
    const globeWireMat = new THREE.LineBasicMaterial({
      color: C_GOLD, transparent: true, opacity: 0.25,
    });
    const globeWire = new THREE.LineSegments(globeEdgeGeom, globeWireMat);
    aboutGroup.add(globeWire);
    const globeGlowGeom = new THREE.SphereGeometry(GLOBE_R * 1.15, 20, 20);
    ownedGeometries.push(globeGlowGeom);
    const globeGlowMat = new THREE.MeshBasicMaterial({
      color: C_GOLD, transparent: true, opacity: 0.03,
    });
    aboutGroup.add(new THREE.Mesh(globeGlowGeom, globeGlowMat));

    // 3 latitude rings + 1 longitude ring
    type LatRing = { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial };
    const latRings: LatRing[] = [];
    const LAT_COLORS = [C_GOLD, C_TEAL, C_WHITE];
    const latRingMats: THREE.Material[] = [];
    for (let i = 0; i < 3; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: LAT_COLORS[i], metalness: 0.9, roughness: 0.10,
        emissive: LAT_COLORS[i], emissiveIntensity: 0.30,
        transparent: true, opacity: 0.50,
      });
      latRingMats.push(mat);
      const geom = new THREE.TorusGeometry(GLOBE_R * 0.85, 0.008, 8, 60);
      ownedGeometries.push(geom);
      const mesh = new THREE.Mesh(geom, mat);
      mesh.rotation.x = Math.PI / 2 + (i - 1) * 0.5;
      mesh.rotation.y = i * 0.4;
      aboutGroup.add(mesh);
      latRings.push({ mesh, mat });
    }
    const lonMat = new THREE.MeshStandardMaterial({
      color: C_TEAL, metalness: 0.9, roughness: 0.10,
      emissive: C_TEAL, emissiveIntensity: 0.30,
      transparent: true, opacity: 0.40,
    });
    const lonGeom = new THREE.TorusGeometry(GLOBE_R * 0.90, 0.008, 8, 60);
    ownedGeometries.push(lonGeom);
    const lonRing = new THREE.Mesh(lonGeom, lonMat);
    aboutGroup.add(lonRing);

    // 12 team nodes in Fibonacci sphere distribution
    type TeamNode = {
      mesh: THREE.Mesh; nMat: THREE.MeshStandardMaterial;
      glow: THREE.Mesh; glowMat: THREE.MeshBasicMaterial;
      pos: THREE.Vector3; idx: number;
    };
    const teamNodes: TeamNode[] = [];
    const teamMats: THREE.Material[] = [];
    const nodeGeom = new THREE.OctahedronGeometry(0.055, 0);
    ownedGeometries.push(nodeGeom);
    const nodeGlowGeom = new THREE.SphereGeometry(0.12, 8, 8);
    ownedGeometries.push(nodeGlowGeom);
    const TEAM_COLORS = [C_GOLD, C_TEAL, C_ROSE, C_WHITE];
    const NODE_COUNT = 12;
    for (let i = 0; i < NODE_COUNT; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const pos = new THREE.Vector3(
        GLOBE_R * Math.sin(phi) * Math.cos(theta),
        GLOBE_R * Math.sin(phi) * Math.sin(theta),
        GLOBE_R * Math.cos(phi),
      );
      const col = TEAM_COLORS[i % TEAM_COLORS.length];
      const nMat = new THREE.MeshStandardMaterial({
        color: col, metalness: 0.95, roughness: 0.05,
        emissive: col, emissiveIntensity: 0.60,
      });
      teamMats.push(nMat);
      const mesh = new THREE.Mesh(nodeGeom, nMat);
      mesh.position.copy(pos);
      aboutGroup.add(mesh);
      const glowMat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: 0.15,
      });
      teamMats.push(glowMat);
      const glow = new THREE.Mesh(nodeGlowGeom, glowMat);
      glow.position.copy(pos);
      aboutGroup.add(glow);
      teamNodes.push({ mesh, nMat, glow, glowMat, pos, idx: i });
    }

    // Connection lines between nearby team nodes
    type ConnLine = { mat: THREE.LineBasicMaterial };
    const connLines: ConnLine[] = [];
    const connLineMats: THREE.Material[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (teamNodes[i].pos.distanceTo(teamNodes[j].pos) < GLOBE_R * 1.4) {
          const mat = new THREE.LineBasicMaterial({
            color: C_GOLD, transparent: true, opacity: 0.10,
          });
          connLineMats.push(mat);
          const geom = new THREE.BufferGeometry().setFromPoints([
            teamNodes[i].pos, teamNodes[j].pos,
          ]);
          ownedGeometries.push(geom);
          aboutGroup.add(new THREE.Line(geom, mat));
          connLines.push({ mat });
        }
      }
    }

    // DNA value helix — 2 strands, 30 segments each, with cross-rungs
    type HelixNode = {
      mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial;
      strand: number; idx: number; baseAngle: number; baseY: number;
    };
    const helixNodes: HelixNode[] = [];
    const helixMats: THREE.Material[] = [];
    const HELIX_SEGMENTS = 30;
    const HELIX_R = 1.6;
    const HELIX_PITCH = 0.12;
    const helixSphereGeom = new THREE.SphereGeometry(0.025, 6, 6);
    ownedGeometries.push(helixSphereGeom);
    for (let s = 0; s < 2; s++) {
      const off = s * Math.PI;
      for (let i = 0; i < HELIX_SEGMENTS; i++) {
        const angle = (i / HELIX_SEGMENTS) * Math.PI * 4 + off;
        const baseY = (i - HELIX_SEGMENTS / 2) * HELIX_PITCH;
        const x = HELIX_R * Math.cos(angle);
        const z = HELIX_R * Math.sin(angle);
        const col = s === 0 ? C_TEAL : C_ROSE;
        const mat = new THREE.MeshBasicMaterial({
          color: col, transparent: true, opacity: 0.40,
        });
        helixMats.push(mat);
        const mesh = new THREE.Mesh(helixSphereGeom, mat);
        mesh.position.set(x, baseY, z);
        aboutGroup.add(mesh);
        helixNodes.push({ mesh, mat, strand: s, idx: i, baseAngle: angle, baseY });
      }
    }
    // Rungs connecting the two strands
    type HelixRung = {
      line: THREE.Line; mat: THREE.LineBasicMaterial; aIdx: number; bIdx: number;
    };
    const helixRungs: HelixRung[] = [];
    for (let i = 0; i < HELIX_SEGMENTS; i += 3) {
      const a = helixNodes[i];
      const b = helixNodes[HELIX_SEGMENTS + i];
      if (a && b) {
        const mat = new THREE.LineBasicMaterial({
          color: C_GOLD, transparent: true, opacity: 0.08,
        });
        helixMats.push(mat);
        const geom = new THREE.BufferGeometry().setFromPoints([
          a.mesh.position, b.mesh.position,
        ]);
        ownedGeometries.push(geom);
        const line = new THREE.Line(geom, mat);
        aboutGroup.add(line);
        helixRungs.push({ line, mat, aIdx: i, bIdx: HELIX_SEGMENTS + i });
      }
    }

    // Shield emblem in front of globe
    const shieldGroup = new THREE.Group();
    shieldGroup.position.set(0, 0, GLOBE_R + 0.15);
    aboutGroup.add(shieldGroup);
    const shieldMat = new THREE.MeshStandardMaterial({
      color: C_GOLD, metalness: 0.95, roughness: 0.05,
      emissive: C_GOLD, emissiveIntensity: 0.40,
      transparent: true, opacity: 0.60,
    });
    const shieldGeom = new THREE.OctahedronGeometry(0.20, 2);
    ownedGeometries.push(shieldGeom);
    const shield = new THREE.Mesh(shieldGeom, shieldMat);
    shield.scale.set(1, 1.3, 0.3);
    shieldGroup.add(shield);
    const shieldGlowGeom = new THREE.SphereGeometry(0.35, 16, 16);
    ownedGeometries.push(shieldGlowGeom);
    const shieldGlowMat = new THREE.MeshBasicMaterial({
      color: C_GOLD, transparent: true, opacity: 0.10,
    });
    const shieldGlow = new THREE.Mesh(shieldGlowGeom, shieldGlowMat);
    shieldGroup.add(shieldGlow);
    const starGeom = new THREE.OctahedronGeometry(0.06, 0);
    ownedGeometries.push(starGeom);
    const starMat = new THREE.MeshStandardMaterial({
      color: C_WHITE, metalness: 0.9, roughness: 0.10,
      emissive: C_WHITE, emissiveIntensity: 0.50,
    });
    const star = new THREE.Mesh(starGeom, starMat);
    star.position.z = 0.08;
    shieldGroup.add(star);

    // 3 tilted mission rings around globe
    type MissionRing = { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; idx: number };
    const missionRings: MissionRing[] = [];
    const missionMats: THREE.Material[] = [];
    const MISSION_COLORS = [C_GOLD, C_TEAL, C_ROSE];
    for (let i = 0; i < 3; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: MISSION_COLORS[i], metalness: 0.9, roughness: 0.10,
        emissive: MISSION_COLORS[i], emissiveIntensity: 0.20,
        transparent: true, opacity: 0.25,
      });
      missionMats.push(mat);
      const geom = new THREE.TorusGeometry(1.9 + i * 0.2, 0.006, 8, 80);
      ownedGeometries.push(geom);
      const mesh = new THREE.Mesh(geom, mat);
      mesh.rotation.x = Math.PI / 2 + (i - 1) * 0.6;
      mesh.rotation.z = i * 0.3;
      aboutGroup.add(mesh);
      missionRings.push({ mesh, mat, idx: i });
    }

    // 6 floating value icons (different polyhedra), orbiting outside the globe
    type ValueIcon = {
      mesh: THREE.Mesh; iMat: THREE.MeshStandardMaterial;
      glow: THREE.Mesh; glowMat: THREE.MeshBasicMaterial;
      angle: number; baseR: number; idx: number;
    };
    const valueIcons: ValueIcon[] = [];
    const iconMats: THREE.Material[] = [];
    const valueGeoms = [
      new THREE.TetrahedronGeometry(0.06, 0),
      new THREE.BoxGeometry(0.08, 0.08, 0.08),
      new THREE.OctahedronGeometry(0.06, 0),
      new THREE.IcosahedronGeometry(0.06, 0),
      new THREE.TetrahedronGeometry(0.06, 0),
      new THREE.DodecahedronGeometry(0.06, 0),
    ];
    for (const g of valueGeoms) ownedGeometries.push(g);
    const iconGlowGeom = new THREE.SphereGeometry(0.12, 6, 6);
    ownedGeometries.push(iconGlowGeom);
    const VALUE_COLORS = [C_GOLD, C_TEAL, C_ROSE, C_WHITE, C_GOLD, C_TEAL];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const col = VALUE_COLORS[i];
      const iMat = new THREE.MeshStandardMaterial({
        color: col, metalness: 0.95, roughness: 0.05,
        emissive: col, emissiveIntensity: 0.50,
      });
      iconMats.push(iMat);
      const mesh = new THREE.Mesh(valueGeoms[i], iMat);
      const r = 2.2;
      mesh.position.set(r * Math.cos(angle), Math.sin(angle * 2) * 0.5, r * Math.sin(angle));
      aboutGroup.add(mesh);
      const glowMat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: 0.10,
      });
      iconMats.push(glowMat);
      const glow = new THREE.Mesh(iconGlowGeom, glowMat);
      glow.position.copy(mesh.position);
      aboutGroup.add(glow);
      valueIcons.push({ mesh, iMat, glow, glowMat, angle, baseR: r, idx: i });
    }

    // Key accent at the bottom (ORBITA brand callback)
    const keyAccentMat = new THREE.MeshStandardMaterial({
      color: C_GOLD, metalness: 0.9, roughness: 0.10,
      emissive: C_GOLD, emissiveIntensity: 0.25,
      transparent: true, opacity: 0.18,
    });
    const kShaftGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8);
    ownedGeometries.push(kShaftGeom);
    const kShaft = new THREE.Mesh(kShaftGeom, keyAccentMat);
    kShaft.position.set(0, -2.0, 0);
    aboutGroup.add(kShaft);
    const kToothGeom = new THREE.BoxGeometry(0.045, 0.018, 0.012);
    ownedGeometries.push(kToothGeom);
    for (let i = 0; i < 2; i++) {
      const kTooth = new THREE.Mesh(kToothGeom, keyAccentMat);
      kTooth.position.set(0.035, -2.10 - i * 0.07, 0);
      aboutGroup.add(kTooth);
    }
    const kTipGeom = new THREE.ConeGeometry(0.016, 0.04, 4);
    ownedGeometries.push(kTipGeom);
    const kTip = new THREE.Mesh(kTipGeom, keyAccentMat);
    kTip.position.set(0, -2.28, 0);
    kTip.rotation.z = Math.PI;
    aboutGroup.add(kTip);

    // 400 vertex-coloured particles
    const PCOUNT = 400;
    const pPositions = new Float32Array(PCOUNT * 3);
    const pColors    = new Float32Array(PCOUNT * 3);
    const palette = [
      new THREE.Color(C_GOLD),
      new THREE.Color(C_TEAL),
      new THREE.Color(C_ROSE),
      new THREE.Color(C_WHITE),
    ];
    for (let i = 0; i < PCOUNT; i++) {
      const r  = 3.5 + Math.random() * 5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPositions[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pPositions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pPositions[i * 3 + 2] = r * Math.cos(ph);
      const pick = Math.random();
      const c = pick < 0.35 ? palette[0]
              : pick < 0.55 ? palette[1]
              : pick < 0.75 ? palette[2]
              : palette[3];
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeom.setAttribute("color",    new THREE.BufferAttribute(pColors, 3));
    ownedGeometries.push(pGeom);
    const pMat = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const particlesObj = new THREE.Points(pGeom, pMat);
    meshGroup.add(particlesObj);

    // Userdata for tick
    meshObj = globeMesh;
    meshGroup.userData.bodyMaterial = ringMat;
    meshGroup.userData.accentMaterial = keyAccentMat;
    meshGroup.userData.aboutRoot         = root;
    meshGroup.userData.aboutGroup        = aboutGroup;
    meshGroup.userData.aboutOrbitNode    = oNGroup;
    meshGroup.userData.aboutOrbitGlow    = oNG;
    meshGroup.userData.aboutOrbitGlowMat = oNGMat;
    meshGroup.userData.aboutRingMat      = ringMat;
    meshGroup.userData.aboutHaloMat      = haloMat;
    meshGroup.userData.aboutRingR        = ringR;
    meshGroup.userData.aboutGlobeWire    = globeWire;
    meshGroup.userData.aboutGlobeMesh    = globeMesh;
    meshGroup.userData.aboutGlobeWireMat = globeWireMat;
    meshGroup.userData.aboutGlobeGlowMat = globeGlowMat;
    meshGroup.userData.aboutLatRings     = latRings;
    meshGroup.userData.aboutLonRing      = lonRing;
    meshGroup.userData.aboutLonMat       = lonMat;
    meshGroup.userData.aboutTeamNodes    = teamNodes;
    meshGroup.userData.aboutConnLines    = connLines;
    meshGroup.userData.aboutHelixNodes   = helixNodes;
    meshGroup.userData.aboutHelixR       = HELIX_R;
    meshGroup.userData.aboutHelixRungs   = helixRungs;
    meshGroup.userData.aboutShield       = shield;
    meshGroup.userData.aboutShieldMat    = shieldMat;
    meshGroup.userData.aboutShieldGlowMat = shieldGlowMat;
    meshGroup.userData.aboutStar         = star;
    meshGroup.userData.aboutStarMat      = starMat;
    meshGroup.userData.aboutMissionRings = missionRings;
    meshGroup.userData.aboutValueIcons   = valueIcons;
    meshGroup.userData.aboutKeyMat       = keyAccentMat;
    meshGroup.userData.particles         = particlesObj;
    meshGroup.userData.particleMat       = pMat;
    meshGroup.userData.aboutMats         = [
      oNMat, globeMat,
      ...latRingMats, ...teamMats, ...connLineMats,
      ...helixMats, ...missionMats, ...iconMats,
    ];
    meshGroup.userData.sideAccents = [];
    meshGroup.userData.portalRings = [];
  } else if (isResources) {
    // ─── Resources variant — open book + floating documents +
    // knowledge-graph constellation + magnifying lens + download
    // arrows + bookmark ribbons + key accent + particles.

    // Cool key palette — matches the hero master-key, the aboutus
    // variant, and the rest of the site. Constant names kept for
    // diff-friendliness; they no longer literally mean emerald/amber/etc.
    const C_EMERALD = 0x5FB4E6; // cyan — dominant accent (was bright green)
    const C_AMBER   = 0xB4BFDC; // silver-blue (was warm amber)
    const C_SKY     = 0x6F8FD8; // muted cool blue (was bright sky)
    const C_WARM    = 0x9D86D4; // cool violet (was warm cream)

    // Lighting — emerald key + amber rim + sky fill (knowledge feel)
    scene.add(new THREE.AmbientLight(0x040A06, 0.30));
    const kL = new THREE.DirectionalLight(C_EMERALD, 0.90);
    kL.position.set(5, 6, 7); scene.add(kL);
    const rL = new THREE.DirectionalLight(C_AMBER, 0.60);
    rL.position.set(-5, 3, -5); scene.add(rL);
    const bL = new THREE.PointLight(C_SKY, 0.50, 22);
    bL.position.set(0, -5, 4); scene.add(bL);
    const tL = new THREE.PointLight(C_WARM, 0.30, 16);
    tL.position.set(0, 7, 0); scene.add(tL);

    const root = new THREE.Group();
    meshGroup.add(root);

    // ── Orbit ring (3/4 arc + caps + soft halo) ──
    const ringR = 3.0;
    const ringTube = 0.03;
    const ARC = Math.PI * 1.72;
    const ringMat = new THREE.MeshStandardMaterial({
      color: C_EMERALD, metalness: 0.9, roughness: 0.10,
      emissive: C_EMERALD, emissiveIntensity: 0.50,
    });
    const ringGeom = new THREE.TorusGeometry(ringR, ringTube, 20, 160, ARC);
    ownedGeometries.push(ringGeom);
    root.add(new THREE.Mesh(ringGeom, ringMat));
    const capGeom = new THREE.SphereGeometry(ringTube * 1.3, 12, 12);
    ownedGeometries.push(capGeom);
    const capA = new THREE.Mesh(capGeom, ringMat);
    capA.position.set(ringR, 0, 0); root.add(capA);
    const capB = new THREE.Mesh(capGeom, ringMat);
    capB.position.set(ringR * Math.cos(ARC), ringR * Math.sin(ARC), 0);
    root.add(capB);
    const haloMat = new THREE.MeshBasicMaterial({
      color: C_EMERALD, transparent: true, opacity: 0.03,
    });
    const haloGeom = new THREE.TorusGeometry(ringR, 0.18, 8, 80, ARC);
    ownedGeometries.push(haloGeom);
    root.add(new THREE.Mesh(haloGeom, haloMat));

    // ── Orbiting node ──
    const oNGroup = new THREE.Group();
    const oNGeom = new THREE.OctahedronGeometry(0.10, 2);
    ownedGeometries.push(oNGeom);
    const oNMat = new THREE.MeshStandardMaterial({
      color: C_EMERALD, metalness: 0.95, roughness: 0.05,
      emissive: C_EMERALD, emissiveIntensity: 0.85,
    });
    const oN = new THREE.Mesh(oNGeom, oNMat);
    oNGroup.add(oN);
    const oNGGeom = new THREE.SphereGeometry(0.25, 16, 16);
    ownedGeometries.push(oNGGeom);
    const oNGMat = new THREE.MeshBasicMaterial({
      color: C_EMERALD, transparent: true, opacity: 0.30,
    });
    const oNG = new THREE.Mesh(oNGGeom, oNGMat);
    oNGroup.add(oNG);
    root.add(oNGroup);

    // ── Resources centre motif ──
    const resGroup = new THREE.Group();
    root.add(resGroup);

    // Open-book — two angled translucent pages + spine + wireframe edges
    const PAGE_W = 0.7;
    const PAGE_H = 0.9;
    const PAGE_D = 0.012;
    const pageGeom = new THREE.BoxGeometry(PAGE_W, PAGE_H, PAGE_D);
    ownedGeometries.push(pageGeom);
    const pageEdgeGeom = new THREE.EdgesGeometry(pageGeom);
    ownedGeometries.push(pageEdgeGeom);
    const bookMat = new THREE.MeshPhysicalMaterial({
      color: 0x0A0A1E, metalness: 0.2, roughness: 0.10,
      transmission: 0.7, thickness: 0.3, ior: 1.4,
      transparent: true, opacity: 0.20,
    });
    const leftPage = new THREE.Mesh(pageGeom, bookMat);
    leftPage.position.set(-PAGE_W / 2 - 0.02, 0, 0);
    leftPage.rotation.y = 0.25;
    resGroup.add(leftPage);
    const rightPage = new THREE.Mesh(pageGeom, bookMat);
    rightPage.position.set(PAGE_W / 2 + 0.02, 0, 0);
    rightPage.rotation.y = -0.25;
    resGroup.add(rightPage);
    const bookWireMat = new THREE.LineBasicMaterial({
      color: C_EMERALD, transparent: true, opacity: 0.60,
    });
    const lWire = new THREE.LineSegments(pageEdgeGeom, bookWireMat);
    lWire.position.copy(leftPage.position); lWire.rotation.copy(leftPage.rotation);
    resGroup.add(lWire);
    const rWire = new THREE.LineSegments(pageEdgeGeom, bookWireMat);
    rWire.position.copy(rightPage.position); rWire.rotation.copy(rightPage.rotation);
    resGroup.add(rWire);

    // Spine
    const spineMat = new THREE.MeshStandardMaterial({
      color: C_AMBER, metalness: 0.9, roughness: 0.10,
      emissive: C_AMBER, emissiveIntensity: 0.40,
    });
    const spineGeom = new THREE.CylinderGeometry(0.015, 0.015, PAGE_H, 8);
    ownedGeometries.push(spineGeom);
    resGroup.add(new THREE.Mesh(spineGeom, spineMat));

    // Book ambient glow
    const bookGlowGeom = new THREE.SphereGeometry(1.0, 16, 16);
    ownedGeometries.push(bookGlowGeom);
    const bookGlowMat = new THREE.MeshBasicMaterial({
      color: C_EMERALD, transparent: true, opacity: 0.03,
    });
    resGroup.add(new THREE.Mesh(bookGlowGeom, bookGlowMat));

    // Text lines on both pages (12 total, shimmer asynchronously)
    type TextLine = { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial };
    const textLines: TextLine[] = [];
    const textLineMats: THREE.Material[] = [];
    for (let side = 0; side < 2; side++) {
      const yRot = side === 0 ? 0.25 : -0.25;
      for (let i = 0; i < 6; i++) {
        const w = 0.25 + Math.random() * 0.25;
        const g = new THREE.BoxGeometry(w, 0.008, 0.002);
        ownedGeometries.push(g);
        const m = new THREE.MeshBasicMaterial({
          color: C_EMERALD, transparent: true, opacity: 0.25,
        });
        textLineMats.push(m);
        const tl = new THREE.Mesh(g, m);
        const sign = side === 0 ? -1 : 1;
        tl.position.set(sign * (PAGE_W / 2 + 0.02) - sign * (w / 2 - 0.2), 0.28 - i * 0.1, PAGE_D / 2 + 0.008);
        tl.rotation.y = yRot;
        resGroup.add(tl);
        textLines.push({ mesh: tl, mat: m });
      }
    }

    // 7 floating doc pages orbiting the book
    type DocPage = {
      mesh: THREE.Mesh; edge: THREE.LineSegments; glow: THREE.Mesh;
      mat: THREE.MeshBasicMaterial; edgeMat: THREE.LineBasicMaterial; glowMat: THREE.MeshBasicMaterial;
      angle: number; r: number;
    };
    const docPages: DocPage[] = [];
    const docMats: THREE.Material[] = [];
    const docGeom = new THREE.PlaneGeometry(0.35, 0.45);
    ownedGeometries.push(docGeom);
    const docEdgeGeom = new THREE.EdgesGeometry(docGeom);
    ownedGeometries.push(docEdgeGeom);
    const docGlowGeom = new THREE.SphereGeometry(0.25, 8, 8);
    ownedGeometries.push(docGlowGeom);
    const DOC_COLORS = [C_EMERALD, C_AMBER, C_SKY, C_WARM, C_EMERALD, C_AMBER, C_SKY];
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const r = 1.7 + (i % 2) * 0.3;
      const col = DOC_COLORS[i];
      const mat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: 0.04, side: THREE.DoubleSide,
      });
      docMats.push(mat);
      const mesh = new THREE.Mesh(docGeom, mat);
      mesh.position.set(r * Math.cos(angle), (Math.random() - 0.5) * 0.8, r * Math.sin(angle));
      mesh.lookAt(0, 0, 0);
      resGroup.add(mesh);
      const edgeMat = new THREE.LineBasicMaterial({
        color: col, transparent: true, opacity: 0.35,
      });
      docMats.push(edgeMat);
      const edge = new THREE.LineSegments(docEdgeGeom, edgeMat);
      edge.position.copy(mesh.position);
      edge.rotation.copy(mesh.rotation);
      resGroup.add(edge);
      const glowMat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: 0.04,
      });
      docMats.push(glowMat);
      const glow = new THREE.Mesh(docGlowGeom, glowMat);
      glow.position.copy(mesh.position);
      resGroup.add(glow);
      docPages.push({ mesh, edge, glow, mat, edgeMat, glowMat, angle, r });
    }

    // 8-node knowledge graph above the book + 14 connection lines
    type KgNode = {
      mesh: THREE.Mesh; glow: THREE.Mesh;
      nMat: THREE.MeshStandardMaterial; glowMat: THREE.MeshBasicMaterial;
      basePos: THREE.Vector3; idx: number;
    };
    const KG_POSITIONS: [number, number, number][] = [
      [0, 1.2, 0.3], [-0.6, 1.0, -0.2], [0.5, 1.1, -0.3],
      [-0.3, 1.5, 0.1], [0.4, 1.5, 0.2], [0, 1.8, -0.1],
      [-0.5, 1.6, 0.4], [0.6, 1.3, 0.4],
    ];
    const KG_COLORS = [C_EMERALD, C_AMBER, C_SKY, C_EMERALD, C_AMBER, C_SKY, C_WARM, C_EMERALD];
    const kgNodes: KgNode[] = [];
    const kgMats: THREE.Material[] = [];
    const kgNodeGeom = new THREE.OctahedronGeometry(0.045, 0);
    ownedGeometries.push(kgNodeGeom);
    const kgGlowGeom = new THREE.SphereGeometry(0.09, 8, 8);
    ownedGeometries.push(kgGlowGeom);
    for (let i = 0; i < KG_POSITIONS.length; i++) {
      const [x, y, z] = KG_POSITIONS[i];
      const col = KG_COLORS[i];
      const nMat = new THREE.MeshStandardMaterial({
        color: col, metalness: 0.95, roughness: 0.05,
        emissive: col, emissiveIntensity: 0.60,
      });
      kgMats.push(nMat);
      const mesh = new THREE.Mesh(kgNodeGeom, nMat);
      mesh.position.set(x, y, z);
      resGroup.add(mesh);
      const glowMat = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: 0.12,
      });
      kgMats.push(glowMat);
      const glow = new THREE.Mesh(kgGlowGeom, glowMat);
      glow.position.copy(mesh.position);
      resGroup.add(glow);
      kgNodes.push({ mesh, glow, nMat, glowMat, basePos: new THREE.Vector3(x, y, z), idx: i });
    }
    const KG_LINKS: [number, number][] = [
      [0, 1], [0, 2], [0, 3], [0, 4], [1, 3], [2, 4], [3, 5],
      [4, 5], [1, 6], [2, 7], [5, 6], [5, 7], [6, 3], [7, 4],
    ];
    type KgConn = { line: THREE.Line; mat: THREE.LineBasicMaterial };
    const kgConns: KgConn[] = [];
    for (const [a, b] of KG_LINKS) {
      const mat = new THREE.LineBasicMaterial({
        color: C_EMERALD, transparent: true, opacity: 0.12,
      });
      kgMats.push(mat);
      const geom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(...KG_POSITIONS[a]),
        new THREE.Vector3(...KG_POSITIONS[b]),
      ]);
      ownedGeometries.push(geom);
      const line = new THREE.Line(geom, mat);
      resGroup.add(line);
      kgConns.push({ line, mat });
    }

    // Search-lens (magnifying glass) at right
    const lensMat = new THREE.MeshStandardMaterial({
      color: C_SKY, metalness: 0.9, roughness: 0.10,
      emissive: C_SKY, emissiveIntensity: 0.35,
      transparent: true, opacity: 0.60,
    });
    const lensRingGeom = new THREE.TorusGeometry(0.20, 0.02, 8, 30);
    ownedGeometries.push(lensRingGeom);
    const lensRing = new THREE.Mesh(lensRingGeom, lensMat);
    lensRing.position.set(1.6, -0.3, 0.5);
    lensRing.rotation.y = -0.3;
    resGroup.add(lensRing);
    const lensGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0A1520, transmission: 0.9, thickness: 0.2, ior: 1.5,
      transparent: true, opacity: 0.08,
    });
    const lensGlassGeom = new THREE.CircleGeometry(0.19, 24);
    ownedGeometries.push(lensGlassGeom);
    const lensGlass = new THREE.Mesh(lensGlassGeom, lensGlassMat);
    lensGlass.position.copy(lensRing.position);
    lensGlass.rotation.copy(lensRing.rotation);
    resGroup.add(lensGlass);
    const handleGeom = new THREE.CylinderGeometry(0.015, 0.015, 0.25, 6);
    ownedGeometries.push(handleGeom);
    const handleMat = new THREE.MeshStandardMaterial({
      color: C_SKY, metalness: 0.9, roughness: 0.10,
      emissive: C_SKY, emissiveIntensity: 0.30,
    });
    const handle = new THREE.Mesh(handleGeom, handleMat);
    handle.position.set(1.75, -0.55, 0.55);
    handle.rotation.z = 0.7;
    handle.rotation.y = -0.3;
    resGroup.add(handle);
    const lensGlowMat = new THREE.MeshBasicMaterial({
      color: C_SKY, transparent: true, opacity: 0.06,
    });
    const lensGlowGeom = new THREE.SphereGeometry(0.35, 10, 10);
    ownedGeometries.push(lensGlowGeom);
    const lensGlow = new THREE.Mesh(lensGlowGeom, lensGlowMat);
    lensGlow.position.set(1.6, -0.3, 0.5);
    resGroup.add(lensGlow);

    // 3 download arrows (cylinder shaft + cone head + glow)
    type Arrow = {
      shaft: THREE.Mesh; head: THREE.Mesh; glow: THREE.Mesh;
      glowMat: THREE.MeshBasicMaterial; baseX: number; phase: number;
    };
    const arrows: Arrow[] = [];
    const arrowShaftGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.20, 6);
    ownedGeometries.push(arrowShaftGeom);
    const arrowHeadGeom = new THREE.ConeGeometry(0.04, 0.08, 6);
    ownedGeometries.push(arrowHeadGeom);
    const arrowConeMat = new THREE.MeshStandardMaterial({
      color: C_AMBER, metalness: 0.9, roughness: 0.10,
      emissive: C_AMBER, emissiveIntensity: 0.50,
    });
    const arrowGlowGeom = new THREE.SphereGeometry(0.10, 8, 8);
    ownedGeometries.push(arrowGlowGeom);
    for (let i = 0; i < 3; i++) {
      const x = (i - 1) * 0.5;
      const shaft = new THREE.Mesh(arrowShaftGeom, arrowConeMat);
      shaft.position.set(x, -1.0, 0.3);
      resGroup.add(shaft);
      const head = new THREE.Mesh(arrowHeadGeom, arrowConeMat);
      head.position.set(x, -1.15, 0.3);
      head.rotation.z = Math.PI;
      resGroup.add(head);
      const glowMat = new THREE.MeshBasicMaterial({
        color: C_AMBER, transparent: true, opacity: 0.08,
      });
      const glow = new THREE.Mesh(arrowGlowGeom, glowMat);
      glow.position.set(x, -1.05, 0.3);
      resGroup.add(glow);
      arrows.push({ shaft, head, glow, glowMat, baseX: x, phase: i * 0.8 });
    }

    // 3 bookmark ribbons hanging from top
    type Ribbon = { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial };
    const ribbons: Ribbon[] = [];
    const ribbonGeom = new THREE.BoxGeometry(0.04, 0.5, 0.005);
    ownedGeometries.push(ribbonGeom);
    const RIBBON_COLORS = [C_AMBER, C_EMERALD, C_SKY];
    for (let i = 0; i < 3; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: RIBBON_COLORS[i], metalness: 0.8, roughness: 0.20,
        emissive: RIBBON_COLORS[i], emissiveIntensity: 0.30,
        transparent: true, opacity: 0.50,
      });
      const mesh = new THREE.Mesh(ribbonGeom, mat);
      mesh.position.set(-0.15 + i * 0.15, PAGE_H / 2 + 0.1, 0.03);
      resGroup.add(mesh);
      ribbons.push({ mesh, mat });
    }

    // Key accent
    const keyAccentMat = new THREE.MeshStandardMaterial({
      color: C_EMERALD, metalness: 0.9, roughness: 0.10,
      emissive: C_EMERALD, emissiveIntensity: 0.25,
      transparent: true, opacity: 0.18,
    });
    const kShaftGeom = new THREE.CylinderGeometry(0.012, 0.012, 0.45, 8);
    ownedGeometries.push(kShaftGeom);
    const kShaft = new THREE.Mesh(kShaftGeom, keyAccentMat);
    kShaft.position.set(0, -2.0, 0);
    resGroup.add(kShaft);
    const kToothGeom = new THREE.BoxGeometry(0.045, 0.018, 0.012);
    ownedGeometries.push(kToothGeom);
    for (let i = 0; i < 2; i++) {
      const kTooth = new THREE.Mesh(kToothGeom, keyAccentMat);
      kTooth.position.set(0.035, -2.10 - i * 0.07, 0);
      resGroup.add(kTooth);
    }
    const kTipGeom = new THREE.ConeGeometry(0.016, 0.04, 4);
    ownedGeometries.push(kTipGeom);
    const kTip = new THREE.Mesh(kTipGeom, keyAccentMat);
    kTip.position.set(0, -2.28, 0);
    kTip.rotation.z = Math.PI;
    resGroup.add(kTip);

    // 350 vertex-coloured particles
    const PCOUNT = 350;
    const pPositions = new Float32Array(PCOUNT * 3);
    const pColors    = new Float32Array(PCOUNT * 3);
    const palette = [
      new THREE.Color(C_EMERALD),
      new THREE.Color(C_AMBER),
      new THREE.Color(C_SKY),
      new THREE.Color(C_WARM),
    ];
    for (let i = 0; i < PCOUNT; i++) {
      const r  = 3.5 + Math.random() * 5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPositions[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pPositions[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      pPositions[i * 3 + 2] = r * Math.cos(ph);
      const pick = Math.random();
      const c = pick < 0.35 ? palette[0]
              : pick < 0.55 ? palette[1]
              : pick < 0.80 ? palette[2]
              : palette[3];
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeom.setAttribute("color",    new THREE.BufferAttribute(pColors, 3));
    ownedGeometries.push(pGeom);
    const pMat = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });
    const particlesObj = new THREE.Points(pGeom, pMat);
    meshGroup.add(particlesObj);

    // Userdata for tick
    meshObj = leftPage;
    meshGroup.userData.bodyMaterial = ringMat;
    meshGroup.userData.accentMaterial = keyAccentMat;
    meshGroup.userData.resRoot          = root;
    meshGroup.userData.resGroup         = resGroup;
    meshGroup.userData.resOrbitNode     = oNGroup;
    meshGroup.userData.resOrbitGlow     = oNG;
    meshGroup.userData.resOrbitGlowMat  = oNGMat;
    meshGroup.userData.resRingMat       = ringMat;
    meshGroup.userData.resHaloMat       = haloMat;
    meshGroup.userData.resRingR         = ringR;
    meshGroup.userData.resLeftPage      = leftPage;
    meshGroup.userData.resRightPage     = rightPage;
    meshGroup.userData.resLWire         = lWire;
    meshGroup.userData.resRWire         = rWire;
    meshGroup.userData.resBookGlowMat   = bookGlowMat;
    meshGroup.userData.resSpineMat      = spineMat;
    meshGroup.userData.resTextLines     = textLines;
    meshGroup.userData.resDocPages      = docPages;
    meshGroup.userData.resKgNodes       = kgNodes;
    meshGroup.userData.resKgConns       = kgConns;
    meshGroup.userData.resLensMat       = lensMat;
    meshGroup.userData.resHandleMat     = handleMat;
    meshGroup.userData.resLensGlowMat   = lensGlowMat;
    meshGroup.userData.resArrows        = arrows;
    meshGroup.userData.resArrowConeMat  = arrowConeMat;
    meshGroup.userData.resRibbons       = ribbons;
    meshGroup.userData.resKeyMat        = keyAccentMat;
    meshGroup.userData.particles        = particlesObj;
    meshGroup.userData.particleMat      = pMat;
    meshGroup.userData.resMats          = [
      bookMat, bookWireMat, lensGlassMat,
      ...textLineMats, ...docMats, ...kgMats,
    ];
    meshGroup.userData.sideAccents = [];
    meshGroup.userData.portalRings = [];
  } else {
    const initialGeometry = isGlobe
      ? new THREE.SphereGeometry(TUNING.GLOBE_RADIUS, TUNING.GLOBE_SEGMENTS, TUNING.GLOBE_SEGMENTS)
      : buildRibbonGeometry();
    ownedGeometries.push(initialGeometry);
    meshObj = new THREE.Mesh(initialGeometry, meshMaterial);
    if (!isGlobe || !STARS_ONLY) {
      meshGroup.add(meshObj);
    }
  }

  // Wireframe overlay (globe variant only) — TWO intersecting lattices for a
  // "AI / blockchain data" read:
  //   • Primary cyan grid at the sphere surface
  //   • Secondary violet grid at +5% radius, rotated, sparser
  const wireGroup = new THREE.Group();
  let wireGeometry: THREE.SphereGeometry | null = null;
  let wireMaterial: THREE.LineBasicMaterial | null = null;
  let wireGeometry2: THREE.SphereGeometry | null = null;
  let wireMaterial2: THREE.LineBasicMaterial | null = null;
  if (isGlobe && !STARS_ONLY) {
    // Primary cyan wireframe
    wireGeometry = new THREE.SphereGeometry(
      TUNING.GLOBE_RADIUS + TUNING.WIRE_RADIUS_OFFSET,
      TUNING.WIRE_WIDTH_SEGMENTS,
      TUNING.WIRE_HEIGHT_SEGMENTS
    );
    wireMaterial = new THREE.LineBasicMaterial({
      color: 0x24E5FF,
      transparent: true,
      opacity: TUNING.WIRE_OPACITY,
      depthWrite: false,
    });
    const wireMesh = new THREE.LineSegments(
      new THREE.WireframeGeometry(wireGeometry),
      wireMaterial
    );
    wireGroup.add(wireMesh);

    // Secondary violet wireframe — slightly larger, sparser, rotated
    wireGeometry2 = new THREE.SphereGeometry(
      TUNING.GLOBE_RADIUS * 1.045,
      16,
      10
    );
    wireMaterial2 = new THREE.LineBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.30,
      depthWrite: false,
    });
    const wireMesh2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(wireGeometry2),
      wireMaterial2
    );
    wireMesh2.rotation.y = Math.PI / 4;
    wireMesh2.rotation.z = Math.PI / 6;
    wireGroup.add(wireMesh2);

    meshGroup.add(wireGroup);
  }

  // Surface network nodes (globe variant only) — glowing cyan dots on the
  // sphere surface, pulsing in unison with offset phases. Reads as a
  // network / data globe.
  const nodeGroup = new THREE.Group();
  let nodeGeometry: THREE.BufferGeometry | null = null;
  let nodeMaterial: THREE.ShaderMaterial | null = null;
  // Node positions captured for arc endpoint reuse (globe variant).
  const nodeVectors: THREE.Vector3[] = [];
  if (isGlobe && !STARS_ONLY) {
    const count = TUNING.NODE_COUNT;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    // Blockchain / AI palette — cyan, electric blue, cerulean, violet.
    const PALETTE: [number, number, number][] = [
      [0.14, 0.90, 1.00],  // cyan        #24E5FF
      [0.23, 0.51, 0.96],  // electric    #3B82F6
      [0.32, 0.72, 1.00],  // cerulean    #52B8FF
      [0.55, 0.36, 0.96],  // violet      #8B5CF6
    ];
    const phi = Math.PI * (3 - Math.sqrt(5));
    const surfaceRadius = TUNING.GLOBE_RADIUS + TUNING.NODE_RADIUS_OFFSET;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const px = Math.cos(theta) * r * surfaceRadius;
      const py = y * surfaceRadius;
      const pz = Math.sin(theta) * r * surfaceRadius;
      positions[i * 3 + 0] = px;
      positions[i * 3 + 1] = py;
      positions[i * 3 + 2] = pz;
      nodeVectors.push(new THREE.Vector3(px, py, pz));
      seeds[i] = Math.random();
      const pick = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      colors[i * 3 + 0] = pick[0];
      colors[i * 3 + 1] = pick[1];
      colors[i * 3 + 2] = pick[2];
    }
    nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    nodeGeometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    nodeGeometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

    nodeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: TUNING.NODE_SIZE },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, TUNING.MAX_PIXEL_RATIO) },
        uOpacity: { value: TUNING.NODE_OPACITY },
        uPulseSpeed: { value: TUNING.NODE_PULSE_SPEED },
      },
      vertexShader: `
        attribute float aSeed;
        attribute vec3 aColor;
        varying float vSeed;
        varying vec3 vColor;
        uniform float uSize;
        uniform float uPixelRatio;
        void main() {
          vSeed = aSeed;
          vColor = aColor;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * uPixelRatio * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uPulseSpeed;
        uniform float uOpacity;
        varying float vSeed;
        varying vec3 vColor;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float r = length(c);
          if (r > 0.5) discard;
          float core = smoothstep(0.18, 0.0, r);
          float halo = smoothstep(0.5, 0.15, r) * 0.45;
          float pulse = 0.55 + 0.45 * sin(uTime * uPulseSpeed + vSeed * 6.2831);
          float alpha = (core + halo) * pulse * uOpacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    nodeGroup.add(nodes);
    meshGroup.add(nodeGroup);
  }

  // Connection arcs (globe variant only) — slerped curves with a traveling
  // bright pulse moving along each arc. Reads as live blockchain transactions
  // / AI data flows. Each arc has its own offset so they're staggered.
  let arcGeometry: THREE.BufferGeometry | null = null;
  let arcMaterial: THREE.ShaderMaterial | null = null;
  if (isGlobe && !STARS_ONLY && nodeVectors.length >= 2) {
    const verts: number[] = [];
    const progresses: number[] = [];
    const seeds: number[] = [];
    for (let i = 0; i < TUNING.ARC_COUNT; i++) {
      const a = nodeVectors[Math.floor(Math.random() * nodeVectors.length)];
      let b = nodeVectors[Math.floor(Math.random() * nodeVectors.length)];
      let tries = 0;
      while (b === a && tries < 6) {
        b = nodeVectors[Math.floor(Math.random() * nodeVectors.length)];
        tries++;
      }
      const angle = a.angleTo(b);
      if (angle < 0.4 || angle > Math.PI - 0.1) continue;
      const sa = Math.sin(angle);
      const arcSeed = Math.random();
      let prev: THREE.Vector3 | null = null;
      let prevT = 0;
      for (let j = 0; j <= TUNING.ARC_POINTS; j++) {
        const t = j / TUNING.ARC_POINTS;
        const w1 = Math.sin((1 - t) * angle) / sa;
        const w2 = Math.sin(t * angle) / sa;
        const p = a.clone().multiplyScalar(w1).add(b.clone().multiplyScalar(w2));
        const bulge = 1 + TUNING.ARC_BULGE * Math.sin(Math.PI * t);
        p.multiplyScalar(bulge);
        if (prev) {
          verts.push(prev.x, prev.y, prev.z, p.x, p.y, p.z);
          progresses.push(prevT, t);
          seeds.push(arcSeed, arcSeed);
        }
        prev = p;
        prevT = t;
      }
    }
    arcGeometry = new THREE.BufferGeometry();
    arcGeometry.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    arcGeometry.setAttribute("aProgress", new THREE.Float32BufferAttribute(progresses, 1));
    arcGeometry.setAttribute("aSeed", new THREE.Float32BufferAttribute(seeds, 1));

    arcMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: TUNING.ARC_OPACITY },
        uColor: { value: new THREE.Color(0x24E5FF) },
        uHeadColor: { value: new THREE.Color(0xFFFFFF) },
      },
      vertexShader: `
        attribute float aProgress;
        attribute float aSeed;
        varying float vProgress;
        varying float vSeed;
        void main() {
          vProgress = aProgress;
          vSeed = aSeed;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uOpacity;
        uniform vec3 uColor;
        uniform vec3 uHeadColor;
        varying float vProgress;
        varying float vSeed;
        void main() {
          // Head position travels 0 -> 1 over time, looping. Offset per-arc.
          float head = fract(uTime * 0.32 + vSeed);
          float dist = abs(vProgress - head);
          // Narrow Gaussian pulse around the head position.
          float pulse = exp(-pow(dist * 9.0, 2.0));
          float trail = exp(-pow(max(0.0, head - vProgress) * 4.0, 2.0)) * 0.45;
          float brightness = 0.18 + 0.95 * pulse + trail;
          vec3 col = mix(uColor, uHeadColor, pulse * 0.7);
          gl_FragColor = vec4(col, brightness * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const arcLines = new THREE.LineSegments(arcGeometry, arcMaterial);
    meshGroup.add(arcLines);
  }

  // Equatorial orbital ring (globe variant only) — thin violet torus, tilted.
  const ringGroup = new THREE.Group();
  let ringGeometry: THREE.TorusGeometry | null = null;
  let ringMaterial: THREE.MeshBasicMaterial | null = null;
  if (isGlobe && !STARS_ONLY) {
    ringGeometry = new THREE.TorusGeometry(
      TUNING.GLOBE_RADIUS * TUNING.RING_RADIUS_FACTOR,
      TUNING.RING_TUBE,
      12,
      160
    );
    ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: TUNING.RING_OPACITY,
      depthWrite: false,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringGroup.rotation.x = TUNING.RING_TILT_X;
    ringGroup.add(ringMesh);
    meshGroup.add(ringGroup);
  }

  // Pulsing inner core (globe variant only) — additive cyan sphere inside,
  // pulses opacity for a "data heartbeat".
  let coreGeometry: THREE.SphereGeometry | null = null;
  let coreMaterial: THREE.MeshBasicMaterial | null = null;
  let coreMesh: THREE.Mesh | null = null;
  if (isGlobe && !STARS_ONLY) {
    coreGeometry = new THREE.SphereGeometry(
      TUNING.GLOBE_RADIUS * TUNING.CORE_RADIUS_FACTOR,
      32,
      32
    );
    coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x24E5FF,
      transparent: true,
      opacity: TUNING.CORE_OPACITY,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    meshGroup.add(coreMesh);
  }

  // Star halo (globe variant only — key is presented alone) —
  // Fibonacci-distributed points in a spherical shell. Each point carries
  // a random twinkle seed so it pulses out of phase with its neighbours.
  const starGroup = new THREE.Group();
  let starGeometry: THREE.BufferGeometry | null = null;
  let starMaterial: THREE.ShaderMaterial | null = null;
  if (isGlobe) {
    const count = TUNING.STAR_COUNT;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const rad =
        TUNING.STAR_INNER_RADIUS +
        Math.random() * (TUNING.STAR_OUTER_RADIUS - TUNING.STAR_INNER_RADIUS);
      positions[i * 3 + 0] = x * rad;
      positions[i * 3 + 1] = y * rad;
      positions[i * 3 + 2] = z * rad;
      seeds[i] = Math.random();
    }
    starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: TUNING.STAR_POINT_SIZE },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, TUNING.MAX_PIXEL_RATIO) },
        uOpacity: { value: TUNING.STAR_OPACITY },
        uColor: { value: new THREE.Color(0xFFFFFF) },
        uTwinkleSpeed: { value: TUNING.STAR_TWINKLE_SPEED },
      },
      vertexShader: `
        attribute float aSeed;
        varying float vSeed;
        uniform float uSize;
        uniform float uPixelRatio;
        void main() {
          vSeed = aSeed;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = uSize * uPixelRatio * (1.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uTwinkleSpeed;
        uniform float uOpacity;
        uniform vec3 uColor;
        varying float vSeed;
        void main() {
          vec2 c = gl_PointCoord - 0.5;
          float r = length(c);
          if (r > 0.5) discard;
          float disk = smoothstep(0.5, 0.0, r);
          float twinkle = 0.45 + 0.55 * sin(uTime * uTwinkleSpeed + vSeed * 6.2831);
          gl_FragColor = vec4(uColor, disk * twinkle * uOpacity);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    starGroup.add(stars);
    // Stars sit OUTSIDE meshGroup so they don't drift with the globe.
    scene.add(starGroup);
  }

  // ─────────── Lights ───────────
  // Ribbon variant keeps the original 3 brand point lights (cyan + lavender
  // + cerulean) that drift around and light the curve. Globe variant has
  // NO colored point lights — only the directional key + ambient + env-map
  // reflections. The chrome iridescence + room env still gives it a real
  // reflective surface without any rotating colored blobs in the scene.
  const t = TINTS[tint];
  let lightCyan: THREE.PointLight | null = null;
  let lightLavender: THREE.PointLight | null = null;
  let lightCerulean: THREE.PointLight | null = null;
  if (!isGlobe) {
    lightCyan = new THREE.PointLight(0x18DEFF, TUNING.LIGHT_CYAN_INTENSITY * t.cyan, 18, 1.6);
    lightLavender = new THREE.PointLight(0xB07CFF, TUNING.LIGHT_LAVENDER_INTENSITY * t.lavender, 18, 1.6);
    lightCerulean = new THREE.PointLight(0x52B8FF, TUNING.LIGHT_CERULEAN_INTENSITY * t.cerulean, 18, 1.6);
    scene.add(lightCyan, lightLavender, lightCerulean);
  }

  // Ribbon keeps the directional key light. Globe has ZERO directional and
  // ZERO ambient — the unlit MeshBasicMaterial doesn't respond to lights at
  // all, so adding any is pointless and only risks future "lights coming out
  // of the globe" complaints.
  if (!isGlobe) {
    const keyLight = new THREE.DirectionalLight(0xFFFFFF, TUNING.KEY_LIGHT_INTENSITY);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);
    scene.add(new THREE.AmbientLight(0xFFFFFF, 0.04));
  }

  // ─────────── Composer ───────────
  const bloomStrength = (isGlobe ? TUNING.GLOBE_BLOOM_STRENGTH : TUNING.RIBBON_BLOOM_STRENGTH) * t.bloom;
  const bloomRadius = isGlobe ? TUNING.GLOBE_BLOOM_RADIUS : TUNING.RIBBON_BLOOM_RADIUS;
  const bloomThreshold = isGlobe ? TUNING.GLOBE_BLOOM_THRESHOLD : TUNING.RIBBON_BLOOM_THRESHOLD;
  const vignetteAmount = isGlobe ? TUNING.GLOBE_VIGNETTE_AMOUNT : TUNING.RIBBON_VIGNETTE_AMOUNT;

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(
    new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      bloomStrength,
      bloomRadius,
      bloomThreshold
    )
  );
  const finishShader = {
    uniforms: {
      tDiffuse: { value: null },
      uTime: { value: 0 },
      uVignetteAmount: { value: vignetteAmount },
      uGrainAmount: { value: TUNING.GRAIN_AMOUNT },
    },
    vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);}`,
    fragmentShader: `uniform sampler2D tDiffuse; uniform float uTime; uniform float uVignetteAmount; uniform float uGrainAmount; varying vec2 vUv;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
      void main(){
        vec3 col = texture2D(tDiffuse, vUv).rgb;
        float d = length(vUv - 0.5);
        float v = smoothstep(0.95, 0.20, d);
        col *= mix(1.0, v, uVignetteAmount);
        col += (hash(vUv * vec2(2048.0,2048.0) + uTime*17.0) - 0.5) * uGrainAmount;
        gl_FragColor = vec4(col, 1.0);
      }`,
  };
  const finishPass = new ShaderPass(finishShader);
  composer.addPass(finishPass);
  composer.addPass(new OutputPass());

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener("resize", resize);

  let mouseTargetX = 0;
  let mouseTargetY = 0;
  let mouseX = 0;
  let mouseY = 0;
  function onMouseMove(e: MouseEvent) {
    mouseTargetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseTargetY = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  window.addEventListener("mousemove", onMouseMove, { passive: true });

  let scrollTarget = 0;
  let scrollEased = 0;
  function readScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollTarget = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  }
  readScroll();
  window.addEventListener("scroll", readScroll, { passive: true });

  let rafId = 0;
  let running = true;
  const start = performance.now();
  const lookTargetX = isGlobe
    ? TUNING.GLOBE_POSITION_X * 0.55
    : TUNING.RIBBON_POSITION_X * 0.55;
  const lookTarget = new THREE.Vector3(lookTargetX, 0, 0);
  let lastFpsT = start;
  let frames = 0;

  function tick(now: number) {
    if (!running) return;
    const t = (now - start) * 0.001;

    mouseX += (mouseTargetX - mouseX) * TUNING.MOUSE_LERP;
    mouseY += (mouseTargetY - mouseY) * TUNING.MOUSE_LERP;
    scrollEased += (scrollTarget - scrollEased) * TUNING.SCROLL_LERP;

    if (isGlobe) {
      // Hide the whole globe group entirely once past Hero — no peeking,
      // no leftover wireframes. Stars stay visible (they're in a separate
      // group). Threshold ~6% scroll = roughly the bottom of the Hero.
      meshGroup.visible = scrollEased < 0.06;

      const rotSpeed = TUNING.GLOBE_ROTATION_Y_SPEED * (1 + scrollEased * TUNING.SCROLL_GLOBE_SPEED_BOOST);
      meshGroup.rotation.y = t * rotSpeed;
      meshGroup.rotation.x =
        Math.sin(t * TUNING.GLOBE_WOBBLE_FREQ) * TUNING.GLOBE_WOBBLE_AMP +
        scrollEased * TUNING.SCROLL_GLOBE_TILT;
      const scrollScale = 1 + scrollEased * TUNING.SCROLL_GLOBE_SCALE;
      meshGroup.scale.setScalar(scrollScale);
      const heroExit = Math.min(scrollEased * 9, 1);
      meshGroup.position.y = TUNING.GLOBE_POSITION_Y - heroExit * TUNING.SCROLL_GLOBE_DRIFT_Y;
      // Wireframe counter-rotates so it shimmers against the chrome.
      wireGroup.rotation.y = t * TUNING.WIRE_COUNTER_ROTATE;
      // Equatorial ring orbits independently — slow precession.
      ringGroup.rotation.y = t * TUNING.RING_ORBIT_SPEED;
      ringGroup.rotation.z = Math.sin(t * 0.07) * 0.10;
      // Inner core pulses opacity for a "heartbeat" feel.
      if (coreMaterial) {
        const pulse = 0.40 + 0.45 * (0.5 + 0.5 * Math.sin(t * TUNING.CORE_PULSE_SPEED));
        coreMaterial.opacity = pulse * TUNING.CORE_OPACITY;
      }
      // Surface nodes rotate WITH the globe (they're attached to its surface).
      // Drive their pulse uniform.
      if (nodeMaterial) nodeMaterial.uniforms.uTime.value = t;
      // Arcs: traveling-light shader needs uTime to animate the pulse.
      if (arcMaterial) arcMaterial.uniforms.uTime.value = t;
      // Star halo: slow counter-rotation + drive twinkle uniform.
      // Plus a scroll-tied vertical drift (stars appear to scroll past as
      // the user scrolls) and a slow autonomous side-to-side sway so the
      // area below Hero always has visible motion behind every section.
      starGroup.rotation.y = -t * TUNING.STAR_ROTATE_SPEED;
      starGroup.rotation.x = Math.sin(t * 0.05) * 0.18;
      starGroup.position.y = -scrollEased * 2.5 + Math.sin(t * 0.04) * 0.20;
      starGroup.position.x = Math.cos(t * 0.03) * 0.15;
      if (starMaterial) starMaterial.uniforms.uTime.value = t;
    } else if (isKey) {
      // Persistent ambient backdrop — horizontal master key with orbital
      // ring + satellite + sparse particle field, plus SECTION
      // CHOREOGRAPHY: scroll progress drives the key through five
      // keyframe poses across the page (hero → solutions → services →
      // why → contact). Auto-rotation is preserved as a slow base
      // spin on top of the choreographed pose.

      // Five poses spread across scrollEased 0 → 1. Z monotonically
      // increases (key dollies CLOSER as the user scrolls DOWN, farther
      // as they scroll back up). Scale tracks z for natural perspective.
      // Rotation poses still vary per section for visual storytelling.
      const POSES = [
        { yRot:  0.50, xRot: -0.30, scale: 0.70, bobZ: -0.60 }, // hero — farthest
        { yRot:  1.10, xRot: -0.10, scale: 0.76, bobZ: -0.30 }, // solutions
        { yRot:  2.20, xRot:  0.20, scale: 0.82, bobZ:  0.00 }, // services
        { yRot:  3.30, xRot:  0.10, scale: 0.88, bobZ:  0.25 }, // why
        { yRot:  4.40, xRot:  0.00, scale: 0.95, bobZ:  0.55 }, // contact — closest
      ];
      const sp = scrollEased; // 0..1 — already eased upstream
      const seg = sp * (POSES.length - 1);
      const idx = Math.min(Math.floor(seg), POSES.length - 2);
      const tt = seg - idx;
      const easeT = tt * tt * (3 - 2 * tt); // smoothstep
      const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
      const a = POSES[idx];
      const b = POSES[idx + 1];
      const poseY = lerp(a.yRot,  b.yRot,  easeT);
      const poseX = lerp(a.xRot,  b.xRot,  easeT);
      const poseS = lerp(a.scale, b.scale, easeT);
      const poseZ = lerp(a.bobZ,  b.bobZ,  easeT);

      meshGroup.scale.setScalar(poseS);
      meshGroup.position.set(0.1, Math.sin(t * 0.7) * 0.05, poseZ);

      // Apply the choreographed pose, with a slow auto-spin laid on top
      // so the key never reads frozen.
      const keyGroup = meshGroup.userData.keyGroup as THREE.Group | undefined;
      if (keyGroup) {
        keyGroup.rotation.y = poseY + t * 0.06;
        keyGroup.rotation.x = poseX + Math.sin(t * 0.5) * 0.025;
      }

      // Always fully opaque — no fade.
      (meshMaterial as THREE.MeshPhysicalMaterial).transparent = false;
      (meshMaterial as THREE.MeshPhysicalMaterial).opacity = 1;
      const accentMat = meshGroup.userData.accentMaterial as THREE.MeshPhysicalMaterial | undefined;
      if (accentMat) accentMat.opacity = 1;
      meshGroup.visible = true;

      // Inner thin torus spinning on two axes — quantum-core feel.
      const innerRing = meshGroup.userData.innerRing as THREE.Mesh | undefined;
      if (innerRing) {
        innerRing.rotation.x = t * 0.6;
        innerRing.rotation.z = t * 0.4;
      }

      // Glowing node sphere — orbits the bow centre on a tilted plane.
      const node = meshGroup.userData.node as THREE.Mesh | undefined;
      const nodeR = (meshGroup.userData.nodeOrbitR as number) ?? 1.12;
      const nodeX = (meshGroup.userData.nodeOriginX as number) ?? -2.0;
      if (node) {
        node.position.set(
          nodeX + Math.cos(t * 0.9) * nodeR,
          Math.sin(t * 0.9) * nodeR,
          Math.sin(t * 0.5) * 0.18,
        );
      }

      // Orbital ring slow Z spin + satellite traces its rim.
      const orbitGroup = meshGroup.userData.orbitGroup as THREE.Group | undefined;
      if (orbitGroup) orbitGroup.rotation.z = t * 0.18;
      const satellite = meshGroup.userData.satellite as THREE.Mesh | undefined;
      if (satellite) {
        satellite.position.set(
          Math.cos(-t * 0.6) * 3.4,
          Math.sin(-t * 0.6) * 3.4,
          0,
        );
      }

      // Sparse particle field — very slow Y drift around the scene.
      const particles = meshGroup.userData.particles as THREE.Points | undefined;
      if (particles) particles.rotation.y = t * 0.025;
    } else if (isCrypto) {
      // Persistent ambient backdrop — Cryptocurrency mark:
      // orbit-arc + node + notched coin + embossed key + particles.

      meshGroup.scale.setScalar(0.55);
      meshGroup.position.set(0, Math.sin(t * 0.8) * 0.08, -0.2);

      const logoGroup = meshGroup.userData.logoGroup as THREE.Group | undefined;
      if (logoGroup) {
        logoGroup.rotation.y = 0.35 + t * 0.15;
        logoGroup.rotation.x = -0.18 + Math.sin(t * 0.6) * 0.02;
      }

      (meshMaterial as THREE.MeshPhysicalMaterial).transparent = false;
      (meshMaterial as THREE.MeshPhysicalMaterial).opacity = 1;
      meshGroup.visible = true;

      // Node travels along the orbit-arc path (rotated by ORBIT_TILT_Z).
      const node = meshGroup.userData.node as THREE.Mesh | undefined;
      const nodeR = (meshGroup.userData.nodeOrbitR as number) ?? 2.05;
      const nodeTilt = (meshGroup.userData.nodeTiltZ as number) ?? 0;
      if (node) {
        const angle = t * 0.9;
        const bx = Math.cos(angle) * nodeR;
        const by = Math.sin(angle) * nodeR;
        const c = Math.cos(nodeTilt);
        const s = Math.sin(nodeTilt);
        node.position.set(bx * c - by * s, bx * s + by * c, 0);
        node.scale.setScalar(0.85 + Math.sin(t * 3) * 0.15);
      }

      // Coin disc + embossed key both spin slowly on Z.
      const coinGroup = meshGroup.userData.coinGroup as THREE.Group | undefined;
      if (coinGroup) coinGroup.rotation.z = t * 0.5;
      const embossGroup = meshGroup.userData.embossGroup as THREE.Group | undefined;
      if (embossGroup) embossGroup.rotation.z = t * 0.5;

      // Particles drift slowly.
      const particles = meshGroup.userData.particles as THREE.Points | undefined;
      if (particles) particles.rotation.y = t * 0.03;
    } else if (isNeural) {
      // Persistent ambient backdrop — neural-network mark for AI pages.
      meshGroup.scale.setScalar(0.62);
      meshGroup.position.set(0, Math.sin(t * 0.7) * 0.06, -0.1);

      const logoGroup = meshGroup.userData.logoGroup as THREE.Group | undefined;
      if (logoGroup) {
        logoGroup.rotation.y = t * 0.10;
        logoGroup.rotation.x = Math.sin(t * 0.4) * 0.06;
      }

      (meshMaterial as THREE.MeshPhysicalMaterial).transparent = false;
      (meshMaterial as THREE.MeshPhysicalMaterial).opacity = 1;
      meshGroup.visible = true;

      // Neural nodes breathe (radial pulse + scale wobble).
      const neuralNodes = meshGroup.userData.neuralNodes as
        | { mesh: THREE.Mesh; base: THREE.Vector3 }[]
        | undefined;
      if (neuralNodes) {
        for (let i = 0; i < neuralNodes.length; i++) {
          const n = neuralNodes[i];
          const off = i * 0.37;
          const breathe = 1 + Math.sin(t * 1.2 + off) * 0.06;
          n.mesh.position.copy(n.base).multiplyScalar(breathe);
          n.mesh.scale.setScalar(1 + Math.sin(t * 2 + off) * 0.15);
        }
      }

      // Edge opacity flickers asynchronously. Range trimmed for the
      // darker palette so edges read as a faint web, not bright wire.
      const edges = meshGroup.userData.neuralEdges as THREE.Line[] | undefined;
      if (edges) {
        for (let i = 0; i < edges.length; i++) {
          const m = edges[i].material as THREE.LineBasicMaterial;
          m.opacity = 0.10 + Math.sin(t * 1.5 + i * 0.2) * 0.08;
        }
      }

      // Central core pulse — the one bright moment, kept modest.
      const coreMesh = meshGroup.userData.coreMesh as THREE.Mesh | undefined;
      const coreMat = meshGroup.userData.coreMat as THREE.MeshStandardMaterial | undefined;
      const coreGlowMesh = meshGroup.userData.coreGlowMesh as THREE.Mesh | undefined;
      const coreGlowMat = meshGroup.userData.coreGlowMat as THREE.MeshBasicMaterial | undefined;
      if (coreMesh && coreMat && coreGlowMesh && coreGlowMat) {
        const pulse = 1 + Math.sin(t * 1.8) * 0.08;
        coreMesh.scale.setScalar(pulse);
        coreMat.emissiveIntensity = 0.40 + Math.sin(t * 1.8) * 0.15;
        coreGlowMesh.scale.setScalar(pulse * 1.3);
        coreGlowMat.opacity = 0.07 + Math.sin(t * 1.8) * 0.04;
      }

      // Orbit node travels the arc + glow halo pulses.
      const orbitNodeGroup = meshGroup.userData.orbitNode as THREE.Group | undefined;
      const ringR = (meshGroup.userData.ringR as number) ?? 2.1;
      if (orbitNodeGroup) {
        const ang = t * 0.5;
        orbitNodeGroup.position.set(
          ringR * Math.cos(ang),
          ringR * Math.sin(ang) * 0.1,
          ringR * Math.sin(ang),
        );
      }
      const orbitGlow = meshGroup.userData.orbitGlow as THREE.Mesh | undefined;
      const orbitGlowMat = meshGroup.userData.orbitGlowMat as THREE.MeshBasicMaterial | undefined;
      if (orbitGlow && orbitGlowMat) {
        orbitGlow.scale.setScalar(1 + Math.sin(t * 3) * 0.2);
        orbitGlowMat.opacity = 0.20 + Math.sin(t * 3) * 0.10;
      }

      // Inner neural-cluster slow Y spin.
      const neuralGroup = meshGroup.userData.neuralGroup as THREE.Group | undefined;
      if (neuralGroup) neuralGroup.rotation.y = t * 0.08;

      // Data ring rotation + opacity drift — kept very subtle.
      const dataRing = meshGroup.userData.dataRing as THREE.Mesh | undefined;
      const dataRingMat = meshGroup.userData.dataRingMat as THREE.MeshBasicMaterial | undefined;
      if (dataRing) dataRing.rotation.z = t * 0.3;
      if (dataRingMat) dataRingMat.opacity = 0.08 + Math.sin(t) * 0.04;

      // Accent key shaft fades in/out, deeper baseline.
      const accentMat = meshGroup.userData.accentMat as THREE.MeshStandardMaterial | undefined;
      if (accentMat) accentMat.opacity = 0.25 + Math.sin(t * 0.8) * 0.10;

      const particles = meshGroup.userData.particles as THREE.Points | undefined;
      if (particles) particles.rotation.y = t * 0.02;
    } else if (isChain) {
      // Persistent ambient backdrop — spiral chain of blocks with
      // confirmation flashes, hash-arrow flow, pending-tx orbit, and
      // an orbit ring + particle field.
      meshGroup.scale.setScalar(0.55);
      meshGroup.position.set(0, Math.sin(t * 0.7) * 0.06, -0.2);

      const root = meshGroup.userData.root as THREE.Group | undefined;
      if (root) {
        root.rotation.y = t * 0.10;
        root.rotation.x = Math.sin(t * 0.4) * 0.05;
      }

      (meshMaterial as THREE.MeshPhysicalMaterial).transparent = false;
      (meshMaterial as THREE.MeshPhysicalMaterial).opacity = 1;
      meshGroup.visible = true;

      // Orbit ring breathes (emissive pulse + halo opacity sway).
      const ringMat = meshGroup.userData.chainRingMat as THREE.MeshStandardMaterial | undefined;
      if (ringMat) ringMat.emissiveIntensity = 0.40 + Math.sin(t * 2) * 0.20;
      const haloMat = meshGroup.userData.chainHaloMat as THREE.MeshBasicMaterial | undefined;
      if (haloMat) haloMat.opacity = 0.02 + Math.sin(t * 2) * 0.015;

      // Orbiting node — travels arc, halo pulses.
      const oNGroup = meshGroup.userData.chainOrbitGroup as THREE.Group | undefined;
      const oN = meshGroup.userData.chainOrbitNode as THREE.Mesh | undefined;
      const oNG = meshGroup.userData.chainOrbitGlow as THREE.Mesh | undefined;
      const oNGMat = meshGroup.userData.chainOrbitGlowMat as THREE.MeshBasicMaterial | undefined;
      const cRingR = (meshGroup.userData.chainRingR as number) ?? 3.0;
      if (oNGroup && oN) {
        const ang = t * 0.38;
        oNGroup.position.set(
          cRingR * Math.cos(ang),
          cRingR * Math.sin(ang) * 0.1,
          cRingR * Math.sin(ang),
        );
        oN.rotation.y = t * 2;
      }
      if (oNG && oNGMat) {
        oNG.scale.setScalar(1 + Math.sin(t * 3.5) * 0.30);
        oNGMat.opacity = 0.20 + Math.sin(t * 3.5) * 0.15;
      }

      // Chain group slow tumble — independent of root spin.
      const chainGroup = meshGroup.userData.chainGroup as THREE.Group | undefined;
      if (chainGroup) chainGroup.rotation.y = t * 0.03;

      // Per-block float + confirmation flash cycle.
      const blocks = meshGroup.userData.chainBlocks as Array<{
        mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial;
        wire: THREE.LineSegments; wireMat: THREE.LineBasicMaterial;
        glow: THREE.Mesh; glowMat: THREE.MeshBasicMaterial;
        labelMat: THREE.MeshBasicMaterial; lockMat: THREE.MeshStandardMaterial;
        labelRing: THREE.Mesh; lock: THREE.Mesh;
        basePos: THREE.Vector3; index: number;
      }> | undefined;
      const BS = (meshGroup.userData.chainBlockSize as number) ?? 0.42;
      if (blocks) {
        for (let i = 0; i < blocks.length; i++) {
          const b = blocks[i];
          const off = i * 0.7;
          // Float — bob each block on its own phase.
          b.mesh.position.copy(b.basePos);
          b.mesh.position.y += Math.sin(t * 0.6 + off) * 0.04;
          b.wire.position.copy(b.mesh.position);
          b.wire.rotation.copy(b.mesh.rotation);
          b.glow.position.copy(b.mesh.position);
          b.labelRing.position.set(
            b.mesh.position.x,
            b.mesh.position.y + BS * 0.55,
            b.mesh.position.z,
          );
          b.lock.position.set(
            b.mesh.position.x,
            b.mesh.position.y + BS * 0.55,
            b.mesh.position.z,
          );
          b.lock.rotation.y = t * 2;

          // Confirmation flash — each block lights up periodically.
          const confirmCycle = (t * 0.5 + i * 1.1) % 6;
          if (confirmCycle < 0.2) {
            b.mat.emissiveIntensity = 0.90;
            b.glowMat.opacity = i === 0 ? 0.20 : 0.15;
            b.wireMat.opacity = 1.0;
            b.lockMat.emissiveIntensity = 1.5;
            b.labelMat.opacity = 0.80;
          } else {
            const baseE = i === 0 ? 0.45 : 0.15;
            b.mat.emissiveIntensity = baseE + Math.sin(t * 1.0 + off) * 0.06;
            b.glowMat.opacity =
              (i === 0 ? 0.06 : 0.03) + Math.sin(t * 1.0 + off) * 0.02;
            b.wireMat.opacity =
              (i === 0 ? 0.70 : 0.35) + Math.sin(t * 1.5 + off) * 0.10;
            b.lockMat.emissiveIntensity = 0.40 + Math.sin(t * 1.5 + off) * 0.20;
            b.labelMat.opacity = 0.30 + Math.sin(t * 1.0 + off) * 0.10;
          }
        }
      }

      // Chain link pulse.
      const links = meshGroup.userData.chainLinks as Array<{
        mat: THREE.MeshStandardMaterial;
        glowMat: THREE.MeshBasicMaterial;
      }> | undefined;
      if (links) {
        for (let i = 0; i < links.length; i++) {
          const lk = links[i];
          const off = i * 0.5;
          lk.mat.emissiveIntensity = 0.20 + Math.sin(t * 1.5 + off) * 0.15;
          lk.mat.opacity = 0.40 + Math.sin(t * 1.5 + off) * 0.20;
          lk.glowMat.opacity = 0.04 + Math.sin(t * 1.5 + off) * 0.03;
        }
      }

      // Hash arrows — flow pulse along each link.
      const arrows = meshGroup.userData.chainArrows as Array<{
        mat: THREE.MeshBasicMaterial; mesh: THREE.Mesh; baseT: number; linkIdx: number;
      }> | undefined;
      if (arrows) {
        for (const a of arrows) {
          const flow = (t * 2 + a.linkIdx * 0.5 + a.baseT * 2) % 3;
          const wave = Math.max(0, Math.sin(flow * Math.PI));
          a.mat.opacity = 0.20 + wave * 0.50;
          a.mesh.scale.setScalar(0.70 + wave * 0.50);
        }
      }

      // Pending transaction cubes — orbit the LAST block.
      const pendingTxs = meshGroup.userData.chainPending as Array<{
        mesh: THREE.Mesh; wire: THREE.LineSegments;
        mat: THREE.MeshBasicMaterial; wMat: THREE.LineBasicMaterial;
        angle: number; r: number; yOff: number; speed: number;
      }> | undefined;
      if (pendingTxs && blocks && blocks.length > 0) {
        const last = blocks[blocks.length - 1].mesh.position;
        for (let i = 0; i < pendingTxs.length; i++) {
          const p = pendingTxs[i];
          const a = p.angle + t * p.speed;
          p.mesh.position.set(
            last.x + Math.cos(a) * p.r,
            last.y + p.yOff + Math.sin(t * 0.8 + i) * 0.05,
            last.z + Math.sin(a) * p.r,
          );
          p.mesh.rotation.x = t * 1.5 + i;
          p.mesh.rotation.y = t * 2 + i;
          p.wire.position.copy(p.mesh.position);
          p.wire.rotation.copy(p.mesh.rotation);
          p.mat.opacity = 0.30 + Math.sin(t * 2 + i * 0.5) * 0.20;
          p.wMat.opacity = 0.20 + Math.sin(t * 2 + i * 0.5) * 0.15;
        }
      }

      // Key accent fade.
      const keyAccent = meshGroup.userData.chainKeyAccentMat as THREE.MeshStandardMaterial | undefined;
      if (keyAccent) {
        keyAccent.opacity = 0.12 + Math.sin(t * 0.6) * 0.06;
        keyAccent.emissiveIntensity = 0.20 + Math.sin(t * 0.6) * 0.12;
      }

      const particles = meshGroup.userData.particles as THREE.Points | undefined;
      if (particles) particles.rotation.y = t * 0.01;
    } else if (isAppDev) {
      // Persistent ambient backdrop — wireframe phone + app tiles +
      // UI layers + code brackets + gears + deploy rockets + terminal
      // lines + orbit ring with data pulses + particle field.
      meshGroup.scale.setScalar(0.55);
      meshGroup.position.set(0, Math.sin(t * 0.7) * 0.06, -0.2);

      const root = meshGroup.userData.appdevRoot as THREE.Group | undefined;
      if (root) {
        root.rotation.y = t * 0.10;
        root.rotation.x = Math.sin(t * 0.4) * 0.05;
      }

      (meshMaterial as THREE.MeshPhysicalMaterial).transparent = false;
      (meshMaterial as THREE.MeshPhysicalMaterial).opacity = 1;
      meshGroup.visible = true;

      // Orbit ring breath
      const ringMat = meshGroup.userData.appdevRingMat as THREE.MeshStandardMaterial | undefined;
      if (ringMat) ringMat.emissiveIntensity = 0.40 + Math.sin(t * 2) * 0.20;
      const haloMat = meshGroup.userData.appdevHaloMat as THREE.MeshBasicMaterial | undefined;
      if (haloMat) haloMat.opacity = 0.02 + Math.sin(t * 2) * 0.015;

      // Orbiting node travels arc
      const oNGroup = meshGroup.userData.appdevOrbitNode as THREE.Group | undefined;
      const oNG = meshGroup.userData.appdevOrbitNodeGlow as THREE.Mesh | undefined;
      const oNGMat = meshGroup.userData.appdevOrbitNodeGlowMat as THREE.MeshBasicMaterial | undefined;
      const ringR = (meshGroup.userData.appdevRingR as number) ?? 3.0;
      if (oNGroup) {
        const ang = t * 0.38;
        oNGroup.position.set(
          ringR * Math.cos(ang),
          ringR * Math.sin(ang) * 0.1,
          ringR * Math.sin(ang),
        );
        const inner = oNGroup.children[0] as THREE.Mesh | undefined;
        if (inner) inner.rotation.y = t * 2;
      }
      if (oNG && oNGMat) {
        oNG.scale.setScalar(1 + Math.sin(t * 3.5) * 0.30);
        oNGMat.opacity = 0.20 + Math.sin(t * 3.5) * 0.15;
      }

      // Dev group slow tumble
      const devGroup = meshGroup.userData.appdevDevGroup as THREE.Group | undefined;
      if (devGroup) devGroup.rotation.y = t * 0.02;

      // App tiles — staggered float + sequential "load" flash
      const tiles = meshGroup.userData.appdevTiles as Array<{
        mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial;
        wire: THREE.LineSegments; wireMat: THREE.LineBasicMaterial;
        glow: THREE.Mesh; glowMat: THREE.MeshBasicMaterial;
        baseX: number; baseY: number; baseZ: number;
      }> | undefined;
      if (tiles) {
        for (let i = 0; i < tiles.length; i++) {
          const tile = tiles[i];
          const off = i * 0.4;
          tile.mesh.position.y = tile.baseY + Math.sin(t * 0.8 + off) * 0.025;
          tile.mesh.position.z = tile.baseZ + Math.sin(t * 0.6 + off) * 0.015;
          tile.mesh.position.x = tile.baseX;
          tile.wire.position.copy(tile.mesh.position);
          tile.glow.position.copy(tile.mesh.position);

          // Load cycle — each tile lights bright periodically.
          const loadCycle = (t * 0.6 + i * 0.5) % 5;
          if (loadCycle < 0.3) {
            tile.mat.emissiveIntensity = 0.80;
            tile.glowMat.opacity = 0.15;
            tile.wireMat.opacity = 1.0;
          } else {
            tile.mat.emissiveIntensity = 0.20 + Math.sin(t * 1.2 + off) * 0.10;
            tile.glowMat.opacity = 0.04 + Math.sin(t + off) * 0.02;
            tile.wireMat.opacity = 0.50 + Math.sin(t * 1.5 + off) * 0.15;
          }
        }
      }

      // UI layers breathe (parallax planes)
      const layers = meshGroup.userData.appdevLayers as Array<{
        mesh: THREE.Mesh; edge: THREE.LineSegments;
        mat: THREE.MeshBasicMaterial; edgeMat: THREE.LineBasicMaterial;
        baseZ: number;
      }> | undefined;
      if (layers) {
        for (let i = 0; i < layers.length; i++) {
          const l = layers[i];
          const off = i * 0.8;
          l.mesh.position.z = l.baseZ + Math.sin(t * 0.4 + off) * 0.05;
          l.edge.position.z = l.mesh.position.z;
          l.mat.opacity = 0.03 + Math.sin(t * 0.5 + off) * 0.02;
          l.edgeMat.opacity = 0.20 + Math.sin(t * 0.8 + off) * 0.10;
        }
      }

      // Screen subtle pulse
      const screenMat = meshGroup.userData.appdevScreenMat as THREE.MeshBasicMaterial | undefined;
      if (screenMat) screenMat.opacity = 0.03 + Math.sin(t * 0.5) * 0.02;

      // Code brackets + slash float in sync, emissive pulse
      const lb = meshGroup.userData.appdevLeftBracket as THREE.Group | undefined;
      const rb = meshGroup.userData.appdevRightBracket as THREE.Group | undefined;
      const sl = meshGroup.userData.appdevSlash as THREE.Mesh | undefined;
      const bracketMat = meshGroup.userData.appdevBracketMat as THREE.MeshStandardMaterial | undefined;
      const slashMat = meshGroup.userData.appdevSlashMat as THREE.MeshStandardMaterial | undefined;
      if (lb) lb.position.y = Math.sin(t * 0.6) * 0.08;
      if (rb) rb.position.y = Math.sin(t * 0.6 + 1) * 0.08;
      if (sl) sl.position.y = Math.sin(t * 0.6 + 0.5) * 0.08;
      if (bracketMat) bracketMat.emissiveIntensity = 0.40 + Math.sin(t * 1.5) * 0.20;
      if (slashMat)   slashMat.emissiveIntensity   = 0.30 + Math.sin(t * 1.5 + 0.5) * 0.20;

      // Gears interlocking — opposite directions, smaller gear faster
      const gearGroup = meshGroup.userData.appdevGearGroup as THREE.Group | undefined;
      const gear2Group = meshGroup.userData.appdevGear2Group as THREE.Group | undefined;
      const gearMat = meshGroup.userData.appdevGearMat as THREE.MeshStandardMaterial | undefined;
      const gear2Mat = meshGroup.userData.appdevGear2Mat as THREE.MeshStandardMaterial | undefined;
      if (gearGroup) gearGroup.rotation.z = t * 0.40;
      if (gear2Group) gear2Group.rotation.z = -t * 0.55;
      if (gearMat) gearMat.emissiveIntensity = 0.30 + Math.sin(t * 1.2) * 0.15;
      if (gear2Mat) gear2Mat.emissiveIntensity = 0.30 + Math.sin(t * 1.2 + 1) * 0.15;

      // Deploy rockets — lift cyclically out of phone
      const rockets = meshGroup.userData.appdevRockets as Array<{
        mesh: THREE.Mesh; trail: THREE.Mesh;
        mat: THREE.MeshStandardMaterial; trailMat: THREE.MeshBasicMaterial;
        baseX: number; baseZ: number; phase: number;
      }> | undefined;
      const PH_H = (meshGroup.userData.appdevPhoneH as number) ?? 1.7;
      if (rockets) {
        for (let i = 0; i < rockets.length; i++) {
          const r = rockets[i];
          const cycle = (t * 0.5 + r.phase) % 4;
          const lift = cycle < 1.5 ? Math.sin((cycle / 1.5) * Math.PI) * 0.5 : 0;
          r.mesh.position.y = PH_H * 0.5 + 0.3 + lift;
          r.trail.position.y = r.mesh.position.y - 0.15;
          r.trailMat.opacity = lift > 0.05 ? 0.30 : 0.08;
          r.mat.emissiveIntensity = 0.40 + lift * 0.80;
          r.mesh.rotation.y = t * 2 + i;
        }
      }

      // Terminal lines — blink sequentially
      const term = meshGroup.userData.appdevTermLines as Array<{
        mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; baseY: number;
      }> | undefined;
      if (term) {
        for (let i = 0; i < term.length; i++) {
          const tl = term[i];
          const blink = (t * 1.5 + i * 0.6) % 3;
          tl.mat.opacity = blink < 0.15 ? 0.70 : 0.20 + Math.sin(t * 0.8 + i) * 0.10;
          tl.mesh.position.y = tl.baseY + Math.sin(t * 0.5 + i * 0.3) * 0.02;
        }
      }

      // Data pulses travel around orbit arc
      const pulses = meshGroup.userData.appdevPulses as Array<{
        mesh: THREE.Mesh; glow: THREE.Mesh;
        mat: THREE.MeshBasicMaterial; gMat: THREE.MeshBasicMaterial;
        phase: number; speed: number;
      }> | undefined;
      const ARC_T = (meshGroup.userData.appdevArc as number) ?? Math.PI * 1.72;
      if (pulses) {
        for (let i = 0; i < pulses.length; i++) {
          const dp = pulses[i];
          const a = (dp.phase + t * dp.speed) % ARC_T;
          dp.mesh.position.set(
            ringR * Math.cos(a),
            ringR * Math.sin(a) * 0.1,
            ringR * Math.sin(a),
          );
          dp.glow.position.copy(dp.mesh.position);
          dp.mat.opacity = 0.50 + Math.sin(t * 3 + i) * 0.30;
          dp.gMat.opacity = 0.15 + Math.sin(t * 3 + i) * 0.10;
        }
      }

      // Key accent fade
      const keyMat = meshGroup.userData.appdevKeyMat as THREE.MeshStandardMaterial | undefined;
      if (keyMat) {
        keyMat.opacity = 0.12 + Math.sin(t * 0.6) * 0.06;
        keyMat.emissiveIntensity = 0.20 + Math.sin(t * 0.6) * 0.12;
      }

      const particles = meshGroup.userData.particles as THREE.Points | undefined;
      if (particles) particles.rotation.y = t * 0.01;
    } else if (isAboutUs) {
      // Persistent ambient backdrop — About Us: globe + team nodes +
      // value helix + shield + mission rings + value icons + particles.
      meshGroup.scale.setScalar(0.58);
      meshGroup.position.set(0, Math.sin(t * 0.7) * 0.06, -0.15);

      const root = meshGroup.userData.aboutRoot as THREE.Group | undefined;
      if (root) {
        root.rotation.y = t * 0.10;
        root.rotation.x = Math.sin(t * 0.4) * 0.05;
      }

      (meshMaterial as THREE.MeshPhysicalMaterial).transparent = false;
      (meshMaterial as THREE.MeshPhysicalMaterial).opacity = 1;
      meshGroup.visible = true;

      // Orbit ring + halo breathe
      const ringMat = meshGroup.userData.aboutRingMat as THREE.MeshStandardMaterial | undefined;
      if (ringMat) ringMat.emissiveIntensity = 0.40 + Math.sin(t * 2) * 0.20;
      const haloMat = meshGroup.userData.aboutHaloMat as THREE.MeshBasicMaterial | undefined;
      if (haloMat) haloMat.opacity = 0.02 + Math.sin(t * 2) * 0.015;

      // Orbiting node travels the arc
      const oNGroup = meshGroup.userData.aboutOrbitNode as THREE.Group | undefined;
      const oNG = meshGroup.userData.aboutOrbitGlow as THREE.Mesh | undefined;
      const oNGMat = meshGroup.userData.aboutOrbitGlowMat as THREE.MeshBasicMaterial | undefined;
      const ringR = (meshGroup.userData.aboutRingR as number) ?? 3.0;
      if (oNGroup) {
        const ang = t * 0.38;
        oNGroup.position.set(
          ringR * Math.cos(ang),
          ringR * Math.sin(ang) * 0.1,
          ringR * Math.sin(ang),
        );
        const inner = oNGroup.children[0] as THREE.Mesh | undefined;
        if (inner) inner.rotation.y = t * 2;
      }
      if (oNG && oNGMat) {
        oNG.scale.setScalar(1 + Math.sin(t * 3.5) * 0.30);
        oNGMat.opacity = 0.20 + Math.sin(t * 3.5) * 0.15;
      }

      // About-group very slow Y spin
      const aboutGroup = meshGroup.userData.aboutGroup as THREE.Group | undefined;
      if (aboutGroup) aboutGroup.rotation.y = t * 0.015;

      // Globe wireframe breathes + slow Y spin
      const globeWireMat = meshGroup.userData.aboutGlobeWireMat as THREE.LineBasicMaterial | undefined;
      const globeGlowMat = meshGroup.userData.aboutGlobeGlowMat as THREE.MeshBasicMaterial | undefined;
      const globeWire = meshGroup.userData.aboutGlobeWire as THREE.LineSegments | undefined;
      const globeMesh = meshGroup.userData.aboutGlobeMesh as THREE.Mesh | undefined;
      if (globeWireMat) globeWireMat.opacity = 0.20 + Math.sin(t * 0.5) * 0.08;
      if (globeGlowMat) globeGlowMat.opacity = 0.02 + Math.sin(t * 0.8) * 0.015;
      if (globeWire) globeWire.rotation.y = t * 0.05;
      if (globeMesh) globeMesh.rotation.y = t * 0.05;

      // Latitude rings — gentle wobble, opacity pulse
      const latRings = meshGroup.userData.aboutLatRings as Array<{
        mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial;
      }> | undefined;
      if (latRings) {
        for (let i = 0; i < latRings.length; i++) {
          const lr = latRings[i];
          lr.mesh.rotation.z = i * 0.4 + Math.sin(t * 0.3 + i) * 0.05;
          lr.mat.emissiveIntensity = 0.25 + Math.sin(t * 1.0 + i * 0.8) * 0.15;
          lr.mat.opacity = 0.40 + Math.sin(t * 0.7 + i) * 0.15;
        }
      }
      const lonMat = meshGroup.userData.aboutLonMat as THREE.MeshStandardMaterial | undefined;
      const lonRing = meshGroup.userData.aboutLonRing as THREE.Mesh | undefined;
      if (lonMat) lonMat.emissiveIntensity = 0.25 + Math.sin(t * 0.8) * 0.15;
      if (lonRing) lonRing.rotation.y = t * 0.06;

      // Team nodes pulse + periodic highlight flash
      const teamNodes = meshGroup.userData.aboutTeamNodes as Array<{
        mesh: THREE.Mesh; nMat: THREE.MeshStandardMaterial;
        glow: THREE.Mesh; glowMat: THREE.MeshBasicMaterial;
        idx: number;
      }> | undefined;
      if (teamNodes) {
        for (let i = 0; i < teamNodes.length; i++) {
          const tn = teamNodes[i];
          const off = i * 0.5;
          tn.mesh.rotation.y = t * 1.5 + i;
          const flashCycle = (t * 0.4 + i * 0.8) % 7;
          if (flashCycle < 0.2) {
            tn.nMat.emissiveIntensity = 1.20;
            tn.glowMat.opacity = 0.35;
          } else {
            tn.nMat.emissiveIntensity = 0.40 + Math.sin(t * 1.2 + off) * 0.30;
            tn.glowMat.opacity = 0.10 + Math.sin(t * 1.5 + off) * 0.08;
          }
          tn.glow.scale.setScalar(1 + Math.sin(t * 1.5 + off) * 0.20);
        }
      }

      // Connection lines pulse opacity
      const connLines = meshGroup.userData.aboutConnLines as Array<{
        mat: THREE.LineBasicMaterial;
      }> | undefined;
      if (connLines) {
        for (let i = 0; i < connLines.length; i++) {
          connLines[i].mat.opacity = 0.06 + Math.sin(t * 0.8 + i * 0.3) * 0.06;
        }
      }

      // DNA value helix — rotate strand positions
      const helixNodes = meshGroup.userData.aboutHelixNodes as Array<{
        mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial;
        strand: number; idx: number; baseAngle: number; baseY: number;
      }> | undefined;
      const HELIX_R = (meshGroup.userData.aboutHelixR as number) ?? 1.6;
      if (helixNodes) {
        for (const hn of helixNodes) {
          const newAngle = hn.baseAngle + t * 0.15;
          hn.mesh.position.x = HELIX_R * Math.cos(newAngle);
          hn.mesh.position.z = HELIX_R * Math.sin(newAngle);
          hn.mat.opacity = 0.30 + Math.sin(t * 1.0 + hn.idx * 0.2) * 0.15;
        }
      }

      // Rungs follow the rotating strand positions
      const rungs = meshGroup.userData.aboutHelixRungs as Array<{
        line: THREE.Line; mat: THREE.LineBasicMaterial; aIdx: number; bIdx: number;
      }> | undefined;
      if (rungs && helixNodes) {
        for (const r of rungs) {
          const a = helixNodes[r.aIdx];
          const b = helixNodes[r.bIdx];
          if (a && b) {
            r.line.geometry.setFromPoints([a.mesh.position, b.mesh.position]);
            r.mat.opacity = 0.05 + Math.sin(t * 0.6) * 0.04;
          }
        }
      }

      // Shield emblem pulse + inner star counter-rotation
      const shield = meshGroup.userData.aboutShield as THREE.Mesh | undefined;
      const shieldMat = meshGroup.userData.aboutShieldMat as THREE.MeshStandardMaterial | undefined;
      const shieldGlowMat = meshGroup.userData.aboutShieldGlowMat as THREE.MeshBasicMaterial | undefined;
      const star = meshGroup.userData.aboutStar as THREE.Mesh | undefined;
      const starMat = meshGroup.userData.aboutStarMat as THREE.MeshStandardMaterial | undefined;
      if (shield && shieldMat && shieldGlowMat) {
        shieldMat.emissiveIntensity = 0.30 + Math.sin(t * 1.5) * 0.20;
        shieldMat.opacity = 0.50 + Math.sin(t * 1.0) * 0.15;
        shieldGlowMat.opacity = 0.08 + Math.sin(t * 1.5) * 0.05;
        shield.rotation.y = t * 0.30;
      }
      if (star && starMat) {
        star.rotation.y = -t * 0.80;
        star.rotation.z = t * 0.50;
        starMat.emissiveIntensity = 0.40 + Math.sin(t * 2) * 0.30;
      }

      // Mission rings rotate at different speeds
      const missionRings = meshGroup.userData.aboutMissionRings as Array<{
        mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; idx: number;
      }> | undefined;
      if (missionRings) {
        for (let i = 0; i < missionRings.length; i++) {
          const mr = missionRings[i];
          mr.mesh.rotation.z = i * 0.3 + t * 0.05 * (i + 1);
          mr.mat.emissiveIntensity = 0.15 + Math.sin(t * 0.6 + i) * 0.10;
          mr.mat.opacity = 0.20 + Math.sin(t * 0.5 + i * 0.5) * 0.08;
        }
      }

      // Value icons orbit + spin + bob in Y
      const valueIcons = meshGroup.userData.aboutValueIcons as Array<{
        mesh: THREE.Mesh; iMat: THREE.MeshStandardMaterial;
        glow: THREE.Mesh; glowMat: THREE.MeshBasicMaterial;
        angle: number; baseR: number; idx: number;
      }> | undefined;
      if (valueIcons) {
        for (let i = 0; i < valueIcons.length; i++) {
          const v = valueIcons[i];
          const a = v.angle + t * 0.12;
          v.mesh.position.x = v.baseR * Math.cos(a);
          v.mesh.position.z = v.baseR * Math.sin(a);
          v.mesh.position.y = Math.sin(a * 2) * 0.5;
          v.glow.position.copy(v.mesh.position);
          v.mesh.rotation.x = t * 1.0 + i;
          v.mesh.rotation.y = t * 1.5 + i;
          v.iMat.emissiveIntensity = 0.40 + Math.sin(t * 1.2 + i * 0.6) * 0.25;
          v.glowMat.opacity = 0.08 + Math.sin(t * 1.0 + i) * 0.05;
        }
      }

      // Key accent slow fade
      const keyMat = meshGroup.userData.aboutKeyMat as THREE.MeshStandardMaterial | undefined;
      if (keyMat) {
        keyMat.opacity = 0.12 + Math.sin(t * 0.6) * 0.06;
        keyMat.emissiveIntensity = 0.20 + Math.sin(t * 0.6) * 0.12;
      }

      const particles = meshGroup.userData.particles as THREE.Points | undefined;
      if (particles) particles.rotation.y = t * 0.008;
    } else if (isResources) {
      // Persistent ambient backdrop — Resources: open book + floating
      // docs + knowledge graph + search lens + download arrows +
      // bookmark ribbons + particles.
      meshGroup.scale.setScalar(0.58);
      meshGroup.position.set(0, Math.sin(t * 0.7) * 0.06, -0.15);

      const root = meshGroup.userData.resRoot as THREE.Group | undefined;
      if (root) {
        root.rotation.y = t * 0.10;
        root.rotation.x = Math.sin(t * 0.4) * 0.05;
      }

      (meshMaterial as THREE.MeshPhysicalMaterial).transparent = false;
      (meshMaterial as THREE.MeshPhysicalMaterial).opacity = 1;
      meshGroup.visible = true;

      // Orbit ring + halo
      const ringMat = meshGroup.userData.resRingMat as THREE.MeshStandardMaterial | undefined;
      if (ringMat) ringMat.emissiveIntensity = 0.40 + Math.sin(t * 2) * 0.20;
      const haloMat = meshGroup.userData.resHaloMat as THREE.MeshBasicMaterial | undefined;
      if (haloMat) haloMat.opacity = 0.02 + Math.sin(t * 2) * 0.015;

      // Orbiting node
      const oNGroup = meshGroup.userData.resOrbitNode as THREE.Group | undefined;
      const oNG = meshGroup.userData.resOrbitGlow as THREE.Mesh | undefined;
      const oNGMat = meshGroup.userData.resOrbitGlowMat as THREE.MeshBasicMaterial | undefined;
      const ringR = (meshGroup.userData.resRingR as number) ?? 3.0;
      if (oNGroup) {
        const ang = t * 0.38;
        oNGroup.position.set(
          ringR * Math.cos(ang),
          ringR * Math.sin(ang) * 0.1,
          ringR * Math.sin(ang),
        );
        const inner = oNGroup.children[0] as THREE.Mesh | undefined;
        if (inner) inner.rotation.y = t * 2;
      }
      if (oNG && oNGMat) {
        oNG.scale.setScalar(1 + Math.sin(t * 3.5) * 0.30);
        oNGMat.opacity = 0.20 + Math.sin(t * 3.5) * 0.15;
      }

      // Resources group very slow Y rotation
      const resGroup = meshGroup.userData.resGroup as THREE.Group | undefined;
      if (resGroup) resGroup.rotation.y = t * 0.015;

      // Book breathing — pages open + close subtly
      const bookBreath = Math.sin(t * 0.4) * 0.03;
      const leftPage = meshGroup.userData.resLeftPage as THREE.Mesh | undefined;
      const rightPage = meshGroup.userData.resRightPage as THREE.Mesh | undefined;
      const lWire = meshGroup.userData.resLWire as THREE.LineSegments | undefined;
      const rWire = meshGroup.userData.resRWire as THREE.LineSegments | undefined;
      const spineMat = meshGroup.userData.resSpineMat as THREE.MeshStandardMaterial | undefined;
      const bookGlowMat = meshGroup.userData.resBookGlowMat as THREE.MeshBasicMaterial | undefined;
      if (leftPage) leftPage.rotation.y = 0.25 + bookBreath;
      if (rightPage) rightPage.rotation.y = -0.25 - bookBreath;
      if (lWire && leftPage) lWire.rotation.y = leftPage.rotation.y;
      if (rWire && rightPage) rWire.rotation.y = rightPage.rotation.y;
      if (bookGlowMat) bookGlowMat.opacity = 0.02 + Math.sin(t * 0.6) * 0.015;
      if (spineMat) spineMat.emissiveIntensity = 0.30 + Math.sin(t * 1.0) * 0.20;

      // Text lines shimmer asynchronously
      const textLines = meshGroup.userData.resTextLines as Array<{
        mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial;
      }> | undefined;
      if (textLines) {
        for (let i = 0; i < textLines.length; i++) {
          const shimmer = (t * 1.2 + i * 0.3) % 4;
          textLines[i].mat.opacity = shimmer < 0.2
            ? 0.60
            : 0.20 + Math.sin(t * 0.5 + i * 0.2) * 0.08;
        }
      }

      // Floating doc pages orbit + load-flash cycle
      const docPages = meshGroup.userData.resDocPages as Array<{
        mesh: THREE.Mesh; edge: THREE.LineSegments; glow: THREE.Mesh;
        mat: THREE.MeshBasicMaterial; edgeMat: THREE.LineBasicMaterial; glowMat: THREE.MeshBasicMaterial;
        angle: number; r: number;
      }> | undefined;
      if (docPages) {
        for (let i = 0; i < docPages.length; i++) {
          const dp = docPages[i];
          const a = dp.angle + t * 0.08;
          dp.mesh.position.x = dp.r * Math.cos(a);
          dp.mesh.position.z = dp.r * Math.sin(a);
          dp.mesh.position.y += Math.sin(t * 0.5 + i) * 0.001;
          dp.mesh.lookAt(0, 0, 0);
          dp.edge.position.copy(dp.mesh.position);
          dp.edge.rotation.copy(dp.mesh.rotation);
          dp.glow.position.copy(dp.mesh.position);

          const loadCycle = (t * 0.5 + i * 0.7) % 6;
          if (loadCycle < 0.25) {
            dp.edgeMat.opacity = 0.80;
            dp.mat.opacity = 0.10;
            dp.glowMat.opacity = 0.12;
          } else {
            dp.edgeMat.opacity = 0.30 + Math.sin(t * 0.8 + i) * 0.10;
            dp.mat.opacity = 0.03 + Math.sin(t * 0.5 + i) * 0.02;
            dp.glowMat.opacity = 0.03 + Math.sin(t * 0.5 + i) * 0.02;
          }
        }
      }

      // Knowledge-graph nodes — bob, spin, flash
      const kgNodes = meshGroup.userData.resKgNodes as Array<{
        mesh: THREE.Mesh; glow: THREE.Mesh;
        nMat: THREE.MeshStandardMaterial; glowMat: THREE.MeshBasicMaterial;
        basePos: THREE.Vector3; idx: number;
      }> | undefined;
      if (kgNodes) {
        for (let i = 0; i < kgNodes.length; i++) {
          const n = kgNodes[i];
          const off = i * 0.5;
          n.mesh.position.y = n.basePos.y + Math.sin(t * 0.5 + off) * 0.04;
          n.glow.position.copy(n.mesh.position);
          n.mesh.rotation.y = t * 1.5 + i;
          const flash = (t * 0.4 + i * 0.9) % 7;
          if (flash < 0.2) {
            n.nMat.emissiveIntensity = 1.20;
            n.glowMat.opacity = 0.30;
          } else {
            n.nMat.emissiveIntensity = 0.40 + Math.sin(t * 1.2 + off) * 0.30;
            n.glowMat.opacity = 0.08 + Math.sin(t * 1.2 + off) * 0.06;
          }
        }
      }

      // KG connection opacity pulse
      const kgConns = meshGroup.userData.resKgConns as Array<{
        mat: THREE.LineBasicMaterial;
      }> | undefined;
      if (kgConns) {
        for (let i = 0; i < kgConns.length; i++) {
          kgConns[i].mat.opacity = 0.08 + Math.sin(t * 0.8 + i * 0.3) * 0.06;
        }
      }

      // Search lens pulse
      const lensMat = meshGroup.userData.resLensMat as THREE.MeshStandardMaterial | undefined;
      const handleMat = meshGroup.userData.resHandleMat as THREE.MeshStandardMaterial | undefined;
      const lensGlowMat = meshGroup.userData.resLensGlowMat as THREE.MeshBasicMaterial | undefined;
      if (lensMat) lensMat.emissiveIntensity = 0.30 + Math.sin(t * 1.5) * 0.15;
      if (handleMat) handleMat.emissiveIntensity = 0.25 + Math.sin(t * 1.0) * 0.15;
      if (lensGlowMat) lensGlowMat.opacity = 0.04 + Math.sin(t * 1.5) * 0.03;

      // Download arrows bounce
      const arrows = meshGroup.userData.resArrows as Array<{
        shaft: THREE.Mesh; head: THREE.Mesh; glow: THREE.Mesh;
        glowMat: THREE.MeshBasicMaterial; baseX: number; phase: number;
      }> | undefined;
      const arrowConeMat = meshGroup.userData.resArrowConeMat as THREE.MeshStandardMaterial | undefined;
      if (arrows) {
        for (let i = 0; i < arrows.length; i++) {
          const da = arrows[i];
          const bounce = (t * 1.0 + da.phase) % 2.5;
          const drop = bounce < 1.0 ? Math.sin(bounce * Math.PI) * 0.08 : 0;
          da.shaft.position.y = -1.0 - drop;
          da.head.position.y = -1.15 - drop;
          da.glow.position.y = -1.05 - drop;
          da.glowMat.opacity = drop > 0.01 ? 0.15 : 0.05;
        }
      }
      if (arrowConeMat) arrowConeMat.emissiveIntensity = 0.40 + Math.sin(t * 1.5) * 0.20;

      // Bookmark ribbons sway
      const ribbons = meshGroup.userData.resRibbons as Array<{
        mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial;
      }> | undefined;
      if (ribbons) {
        for (let i = 0; i < ribbons.length; i++) {
          const rb = ribbons[i];
          rb.mesh.rotation.z = Math.sin(t * 0.3 + i * 0.5) * 0.05;
          rb.mat.emissiveIntensity = 0.25 + Math.sin(t * 0.8 + i) * 0.12;
          rb.mat.opacity = 0.40 + Math.sin(t * 0.5 + i * 0.4) * 0.15;
        }
      }

      // Key accent slow fade
      const keyMat = meshGroup.userData.resKeyMat as THREE.MeshStandardMaterial | undefined;
      if (keyMat) {
        keyMat.opacity = 0.12 + Math.sin(t * 0.6) * 0.06;
        keyMat.emissiveIntensity = 0.20 + Math.sin(t * 0.6) * 0.12;
      }

      const particles = meshGroup.userData.particles as THREE.Points | undefined;
      if (particles) particles.rotation.y = t * 0.008;
    } else {
      for (let i = 0; i < ANCHORS.length; i++) {
        const a = ANCHORS[i];
        const ph = PHASES[i];
        livePoints[i].set(
          a.x + Math.sin(t * TUNING.FLOW_FREQ + ph) * TUNING.FLOW_AMP_X,
          a.y + Math.cos(t * TUNING.FLOW_FREQ * 0.83 + ph) * TUNING.FLOW_AMP_Y * 0.6,
          a.z + Math.sin(t * TUNING.FLOW_FREQ * 1.17 + ph) * TUNING.FLOW_AMP_Z
        );
      }
      const oldGeom = meshObj.geometry;
      meshObj.geometry = buildRibbonGeometry();
      oldGeom.dispose();
      meshGroup.rotation.y = t * TUNING.RIBBON_ROTATION_Y_SPEED;
      meshGroup.rotation.x = Math.sin(t * 0.09) * 0.05;
    }

    // Light drift — only runs on ribbon variant (globe has no colored lights).
    if (lightCyan && lightLavender && lightCerulean) {
      const lw = (Math.PI * 2) / TUNING.LIGHT_DRIFT_PERIOD;
      lightCyan.position.set(
        2.2 + Math.cos(t * lw) * 1.4,
        1.8 + Math.sin(t * lw * 0.9) * 0.8,
        3.2 + Math.sin(t * lw * 0.6) * 0.6
      );
      lightLavender.position.set(
        3.6 + Math.cos(t * lw * 0.7 + 2.0) * 1.6,
        -0.6 + Math.sin(t * lw * 1.1 + 1.0) * 1.2,
        2.4 + Math.cos(t * lw * 0.5) * 0.8
      );
      lightCerulean.position.set(
        1.2 + Math.sin(t * lw * 1.3 + 1.5) * 1.6,
        2.4 + Math.cos(t * lw * 0.6 + 0.8) * 1.0,
        -1.2 + Math.sin(t * lw * 0.7) * 1.0
      );
    }

    const wDrift = (Math.PI * 2) / TUNING.IDLE_CAMERA_DRIFT_PERIOD;
    const idleX = Math.sin(t * wDrift) * TUNING.IDLE_CAMERA_DRIFT_RANGE;
    const idleY = Math.cos(t * wDrift * 0.78) * TUNING.IDLE_CAMERA_DRIFT_RANGE * 0.6;

    camera.position.x = idleX + mouseX * TUNING.MOUSE_PARALLAX_X;
    camera.position.y = idleY - mouseY * TUNING.MOUSE_PARALLAX_Y + TUNING.SCROLL_CAMERA_Y * scrollEased;
    camera.position.z = cameraBase.z - TUNING.SCROLL_CAMERA_Z * scrollEased;
    camera.lookAt(lookTarget);

    finishPass.uniforms.uTime.value = t;
    composer.render();

    frames++;
    if (now - lastFpsT > 500) {
      const fps = Math.round((frames * 1000) / (now - lastFpsT));
      if (onFps) onFps(fps);
      frames = 0;
      lastFpsT = now;
    }
    rafId = requestAnimationFrame(tick);
  }
  rafId = requestAnimationFrame(tick);

  function onVis() {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(rafId);
    } else if (!running) {
      running = true;
      lastFpsT = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  }
  document.addEventListener("visibilitychange", onVis);

  return function cleanup() {
    running = false;
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("scroll", readScroll);
    window.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("visibilitychange", onVis);
    renderer.dispose();
    composer.dispose();
    for (const g of ownedGeometries) g.dispose();
    meshMaterial.dispose();
    const accentMat = meshGroup.userData.accentMaterial as THREE.Material | undefined;
    if (accentMat) accentMat.dispose();
    const accentWireMat = meshGroup.userData.accentWireMat as THREE.Material | undefined;
    if (accentWireMat) accentWireMat.dispose();
    const bodyMat = meshGroup.userData.bodyMaterial as THREE.Material | undefined;
    if (bodyMat) bodyMat.dispose();
    const orbitMat = meshGroup.userData.orbitMat as THREE.Material | undefined;
    if (orbitMat) orbitMat.dispose();
    const satMaterial = meshGroup.userData.satMaterial as THREE.Material | undefined;
    if (satMaterial) satMaterial.dispose();
    const particleMat = meshGroup.userData.particleMat as THREE.Material | undefined;
    if (particleMat) particleMat.dispose();
    const coinMaterial = meshGroup.userData.coinMaterial as THREE.Material | undefined;
    if (coinMaterial) coinMaterial.dispose();
    const keyMaterial = meshGroup.userData.keyMaterial as THREE.Material | undefined;
    if (keyMaterial) keyMaterial.dispose();
    const neuralMats = meshGroup.userData.neuralMats as THREE.Material[] | undefined;
    if (neuralMats) for (const m of neuralMats) m.dispose();
    const chainBlockMats = meshGroup.userData.chainBlockMats as THREE.Material[] | undefined;
    if (chainBlockMats) for (const m of chainBlockMats) m.dispose();
    const chainExtraMats = meshGroup.userData.chainExtraMats as THREE.Material[] | undefined;
    if (chainExtraMats) for (const m of chainExtraMats) m.dispose();
    const chainLinks = meshGroup.userData.chainLinks as
      | Array<{ mat: THREE.Material; glowMat: THREE.Material }>
      | undefined;
    if (chainLinks) for (const l of chainLinks) { l.mat.dispose(); l.glowMat.dispose(); }
    const chainArrows = meshGroup.userData.chainArrows as
      | Array<{ mat: THREE.Material }>
      | undefined;
    if (chainArrows) for (const a of chainArrows) a.mat.dispose();
    const chainPending = meshGroup.userData.chainPending as
      | Array<{ mat: THREE.Material; wMat: THREE.Material }>
      | undefined;
    if (chainPending) for (const p of chainPending) { p.mat.dispose(); p.wMat.dispose(); }
    const chainOrbitGlowMat = meshGroup.userData.chainOrbitGlowMat as THREE.Material | undefined;
    if (chainOrbitGlowMat) chainOrbitGlowMat.dispose();
    const chainHaloMat = meshGroup.userData.chainHaloMat as THREE.Material | undefined;
    if (chainHaloMat) chainHaloMat.dispose();
    const chainKeyAccentMat = meshGroup.userData.chainKeyAccentMat as THREE.Material | undefined;
    if (chainKeyAccentMat) chainKeyAccentMat.dispose();
    const appdevMats = meshGroup.userData.appdevMats as THREE.Material[] | undefined;
    if (appdevMats) for (const m of appdevMats) m.dispose();
    const appdevRingMat = meshGroup.userData.appdevRingMat as THREE.Material | undefined;
    if (appdevRingMat) appdevRingMat.dispose();
    const appdevHaloMat = meshGroup.userData.appdevHaloMat as THREE.Material | undefined;
    if (appdevHaloMat) appdevHaloMat.dispose();
    const appdevScreenMat = meshGroup.userData.appdevScreenMat as THREE.Material | undefined;
    if (appdevScreenMat) appdevScreenMat.dispose();
    const appdevBracketMat = meshGroup.userData.appdevBracketMat as THREE.Material | undefined;
    if (appdevBracketMat) appdevBracketMat.dispose();
    const appdevSlashMat = meshGroup.userData.appdevSlashMat as THREE.Material | undefined;
    if (appdevSlashMat) appdevSlashMat.dispose();
    const appdevGearMat = meshGroup.userData.appdevGearMat as THREE.Material | undefined;
    if (appdevGearMat) appdevGearMat.dispose();
    const appdevGear2Mat = meshGroup.userData.appdevGear2Mat as THREE.Material | undefined;
    if (appdevGear2Mat) appdevGear2Mat.dispose();
    const appdevKeyMat = meshGroup.userData.appdevKeyMat as THREE.Material | undefined;
    if (appdevKeyMat) appdevKeyMat.dispose();
    const appdevOrbitNodeGlowMat = meshGroup.userData.appdevOrbitNodeGlowMat as THREE.Material | undefined;
    if (appdevOrbitNodeGlowMat) appdevOrbitNodeGlowMat.dispose();
    const aboutMats = meshGroup.userData.aboutMats as THREE.Material[] | undefined;
    if (aboutMats) for (const m of aboutMats) m.dispose();
    const aboutGlobeWireMat = meshGroup.userData.aboutGlobeWireMat as THREE.Material | undefined;
    if (aboutGlobeWireMat) aboutGlobeWireMat.dispose();
    const aboutGlobeGlowMat = meshGroup.userData.aboutGlobeGlowMat as THREE.Material | undefined;
    if (aboutGlobeGlowMat) aboutGlobeGlowMat.dispose();
    const aboutLonMat = meshGroup.userData.aboutLonMat as THREE.Material | undefined;
    if (aboutLonMat) aboutLonMat.dispose();
    const aboutShieldMat = meshGroup.userData.aboutShieldMat as THREE.Material | undefined;
    if (aboutShieldMat) aboutShieldMat.dispose();
    const aboutShieldGlowMat = meshGroup.userData.aboutShieldGlowMat as THREE.Material | undefined;
    if (aboutShieldGlowMat) aboutShieldGlowMat.dispose();
    const aboutStarMat = meshGroup.userData.aboutStarMat as THREE.Material | undefined;
    if (aboutStarMat) aboutStarMat.dispose();
    const aboutHaloMat = meshGroup.userData.aboutHaloMat as THREE.Material | undefined;
    if (aboutHaloMat) aboutHaloMat.dispose();
    const aboutKeyMat = meshGroup.userData.aboutKeyMat as THREE.Material | undefined;
    if (aboutKeyMat) aboutKeyMat.dispose();
    const aboutOrbitGlowMat = meshGroup.userData.aboutOrbitGlowMat as THREE.Material | undefined;
    if (aboutOrbitGlowMat) aboutOrbitGlowMat.dispose();
    const aboutRingMat = meshGroup.userData.aboutRingMat as THREE.Material | undefined;
    if (aboutRingMat) aboutRingMat.dispose();
    const resMats = meshGroup.userData.resMats as THREE.Material[] | undefined;
    if (resMats) for (const m of resMats) m.dispose();
    const resRingMat = meshGroup.userData.resRingMat as THREE.Material | undefined;
    if (resRingMat) resRingMat.dispose();
    const resHaloMat = meshGroup.userData.resHaloMat as THREE.Material | undefined;
    if (resHaloMat) resHaloMat.dispose();
    const resOrbitGlowMat = meshGroup.userData.resOrbitGlowMat as THREE.Material | undefined;
    if (resOrbitGlowMat) resOrbitGlowMat.dispose();
    const resBookGlowMat = meshGroup.userData.resBookGlowMat as THREE.Material | undefined;
    if (resBookGlowMat) resBookGlowMat.dispose();
    const resSpineMat = meshGroup.userData.resSpineMat as THREE.Material | undefined;
    if (resSpineMat) resSpineMat.dispose();
    const resLensMat = meshGroup.userData.resLensMat as THREE.Material | undefined;
    if (resLensMat) resLensMat.dispose();
    const resHandleMat = meshGroup.userData.resHandleMat as THREE.Material | undefined;
    if (resHandleMat) resHandleMat.dispose();
    const resLensGlowMat = meshGroup.userData.resLensGlowMat as THREE.Material | undefined;
    if (resLensGlowMat) resLensGlowMat.dispose();
    const resArrowConeMat = meshGroup.userData.resArrowConeMat as THREE.Material | undefined;
    if (resArrowConeMat) resArrowConeMat.dispose();
    const resKeyMat = meshGroup.userData.resKeyMat as THREE.Material | undefined;
    if (resKeyMat) resKeyMat.dispose();
    const portalRings = meshGroup.userData.portalRings as
      | { mesh: THREE.Mesh; mat: THREE.Material }[]
      | undefined;
    if (portalRings) for (const r of portalRings) r.mat.dispose();
    if (wireGeometry) wireGeometry.dispose();
    if (wireMaterial) wireMaterial.dispose();
    if (wireGeometry2) wireGeometry2.dispose();
    if (wireMaterial2) wireMaterial2.dispose();
    if (arcGeometry) arcGeometry.dispose();
    if (arcMaterial) arcMaterial.dispose();
    if (ringGeometry) ringGeometry.dispose();
    if (ringMaterial) ringMaterial.dispose();
    if (coreGeometry) coreGeometry.dispose();
    if (coreMaterial) coreMaterial.dispose();
    if (nodeGeometry) nodeGeometry.dispose();
    if (nodeMaterial) nodeMaterial.dispose();
    if (starGeometry) starGeometry.dispose();
    if (starMaterial) starMaterial.dispose();
    envRT.dispose();
    pmrem.dispose();
  };
}

export function BackgroundScene({
  tint = "default",
  variant = "ribbon",
}: { tint?: SceneTint; variant?: SceneVariant } = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);
  const [showFps, setShowFps] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShowFps(new URLSearchParams(window.location.search).has("debug"));
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const el = canvas;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = TINTS[tint];

    function applyStaticFallback() {
      el.style.opacity = "1";
      el.style.background =
        `radial-gradient(60% 50% at 30% 30%, rgba(24,222,255,${0.18 * t.cyan}), transparent 60%),` +
        `radial-gradient(60% 50% at 80% 70%, rgba(176,124,255,${0.14 * t.lavender}), transparent 60%), #000`;
    }
    if (prefersReduced) {
      applyStaticFallback();
      return;
    }

    // Low-power / mobile short-circuit. Three.js is ~700kB uncompressed and
    // burns battery on weak GPUs; static gradient is the better UX.
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (
      window.innerWidth < 768 ||
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) ||
      (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4)
    ) {
      applyStaticFallback();
      return;
    }

    applyStaticFallback();

    let cleanup: (() => void) | null = null;
    let idleHandle: number | undefined;
    let loadFired = document.readyState === "complete";

    function boot() {
      const liveCanvas = canvasRef.current;
      if (!liveCanvas) return;
      el.style.background = "";
      const c = mountScene(liveCanvas, tint, variant, (fps) => {
        if (fpsRef.current) fpsRef.current.textContent = String(fps);
      });
      if (!c) {
        applyStaticFallback();
        return;
      }
      cleanup = c;
    }

    function schedule() {
      const idleApi = (window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      }).requestIdleCallback;
      if (idleApi) {
        idleHandle = idleApi(boot, { timeout: 800 });
      } else {
        idleHandle = window.setTimeout(boot, 200) as unknown as number;
      }
    }

    if (loadFired) {
      schedule();
    } else {
      const onLoad = () => {
        loadFired = true;
        schedule();
      };
      window.addEventListener("load", onLoad, { once: true });
      idleHandle = window.setTimeout(() => {
        window.removeEventListener("load", onLoad);
        if (!loadFired) schedule();
      }, 2500) as unknown as number;
    }

    return () => {
      if (idleHandle !== undefined) {
        const cancelIdle = (window as Window & {
          cancelIdleCallback?: (h: number) => void;
        }).cancelIdleCallback;
        if (cancelIdle) cancelIdle(idleHandle);
        else clearTimeout(idleHandle);
      }
      if (cleanup) cleanup();
    };
  }, [tint, variant]);

  const opacity = variant === "globe" ? TUNING.GLOBE_CANVAS_OPACITY : TUNING.RIBBON_CANVAS_OPACITY;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0, opacity }}
      />
      {showFps && (
        <div className="fixed bottom-4 right-4 z-[70] inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full
                        bg-black/60 border border-white/[0.12] backdrop-blur-sm
                        font-[var(--font-mono)] text-[11px] text-white/70">

          <span ref={fpsRef}>—</span> fps
        </div>
      )}
    </>
  );
}
