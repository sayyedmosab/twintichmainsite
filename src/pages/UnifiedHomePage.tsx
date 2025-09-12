import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

interface ScrollingSection {
  title: string;
  subtitle: string;
  text: string;
  triggerRange: [number, number]; // [start%, end%] as 0-1
  position: 'left' | 'right' | 'center' | 'bottom';
  animation: 'slide-left' | 'slide-right' | 'fade-up' | 'fade-in';
}

const UnifiedHomePage: React.FC = () => {
  // Canvas and THREE.js refs
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTextSection, setCurrentTextSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Text content configuration
  const scrollingSections: ScrollingSection[] = useMemo(() => [
    {
      title: "Transforming Strategy Execution",
      subtitle: "RETHINK COMPLEXITY, MAKE IT YOUR ASSET.",
      text: "Re-defining how you experience complex transformations. Labels like planning, monitoring, risks, dashboard etc remain the same, everything else changes. Not only from a look and feel, we re-defined what it means, how it is done and its role in an integrated model.",
      triggerRange: [0, 0.125],
      position: 'left',
      animation: 'slide-left'
    },
    {
      title: "Imagine a parallel universe where strategy execution finally makes sense.",
      subtitle: "BEYOND THEORY, A WORKING SOLUTION",
      text: "We heard it all: Science fiction, Consultants Jargon, Another framework. Even the \"its farfetched\", \"something for another generation\". Our answer. IT IS A DEVELOPED SOLUTION. Specifically, a Net.js Webapp with a Supabase Database and a tailored Gemini Assistant coupled with a 5 year dataset of an entity's national transformation.",
      triggerRange: [0.125, 0.25],
      position: 'right',
      animation: 'slide-right'
    },
    {
      title: "So, How does that work?",
      subtitle: "ONLY GREAT QUESTIONS UNLOCK GREAT ANSWERS",
      text: "We understand, you have questions and you will get the answers. But before you can receive the answers, you must understand what are the right questions and how they evolved. So keep scrolling and start your initiation journey.",
      triggerRange: [0.25, 0.375],
      position: 'center',
      animation: 'fade-up'
    },
    {
      title: "Your Organization",
      subtitle: "Much like a Rubik's cube",
      text: "Each of its 27 cubes represents a piece of the puzzle. Strategy, Performance, Policies, People, Process, Tools add external like globalization, events etc..all interacting. Transforming means solving the cube and to do that, you need to understand how these different cubes interact together. We had to dismantle and examine its anatomy.",
      triggerRange: [0.375, 0.5],
      position: 'left',
      animation: 'slide-left'
    },
    {
      title: "Hidden Relations Unveiled",
      subtitle: "Relations ran Deeper",
      text: "While deciphering the cubes, and focusing on what role they play, how they interact, their inputs/outputs, a model began to appear. A sketchy pattern that made sense and felt right but remained elusive. We had to go deeper on each one. Every cube had to be dismantled further.",
      triggerRange: [0.5, 0.625],
      position: 'right',
      animation: 'slide-right'
    },
    {
      title: "Where others stop",
      subtitle: "Facing Complexity Head On",
      text: "Two truths became evident. First, the scale of complexity was much more than our highest expectations with layers of dependencies involved. Second, the scarcity in helping resources. Few have gone this deep covering everything holistically. We had to research everywhere and in some cases develop missing gaps. the slow process began, covering them one by one.",
      triggerRange: [0.625, 0.75],
      position: 'bottom',
      animation: 'fade-up'
    },
    {
      title: "2 years later…",
      subtitle: "Mission Accomplished, Just in Time",
      text: "Finally, all the components where dissected, analyzed and mapped. A twin model that bridged every relation and interaction across a complex web of complex dependencies. Just when AI breakthroughs accelerated, became accessible,and at shockingly affordable costs.",
      triggerRange: [0.75, 0.875],
      position: 'left',
      animation: 'slide-left'
    },
    {
      title: "The future, today",
      subtitle: "Digital Twin Model of an Organization",
      text: "The final element, the heart of the solution was plugged in. Bringing the Digital Twin to life, and bringing hope back to transformations. From here you and us have two paths:",
      triggerRange: [0.875, 1.0],
      position: 'center',
      animation: 'fade-in'
    }
  ], []);

  // THREE.js initialization
  const initThreeJS = useCallback(async () => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000511);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.set(6, 4, 12);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true 
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(6, 10, 8);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Load faces.json patterns
    let facePatternsData = null;
    try {
      const response = await fetch('/faces.json');
      facePatternsData = await response.json();
    } catch (error) {
      console.warn('Could not load faces.json, using fallback');
      facePatternsData = {
        palette: ['#00F0FF', '#0EA5E9', '#38BDF8', '#7DD3FC', '#A5F3FC', '#CFFAFE'],
        patterns: [
          { id: 0, pattern: 'grid' },
          { id: 1, pattern: 'stripes' },
          { id: 2, pattern: 'ring' },
          { id: 3, pattern: 'chevron' },
          { id: 4, pattern: 'hex' },
          { id: 5, pattern: 'wave' }
        ]
      };
    }

    // Create Rubik's cube structure (27 cubes in 3x3x3)
    const cubeGroup = new THREE.Group();
    const cubes: THREE.Mesh[] = [];
    const STEP = 2.2;
    
    // Create materials with face patterns
    const createFaceTexture = (patternType: string, size = 256): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      
      const palette = facePatternsData.palette;
      const baseColor = palette[0];
      
      // Fill with base gradient
      const gradient = ctx.createLinearGradient(0, 0, size, size);
      gradient.addColorStop(0, baseColor);
      gradient.addColorStop(1, palette[2]);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      
      // Set stroke style
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;
      
      // Pattern-specific drawing
      switch (patternType) {
        case 'grid':
          const gridSpacing = size / 8;
          for (let i = 0; i <= 8; i++) {
            const pos = i * gridSpacing;
            ctx.beginPath();
            ctx.moveTo(pos, 0);
            ctx.lineTo(pos, size);
            ctx.moveTo(0, pos);
            ctx.lineTo(size, pos);
            ctx.stroke();
          }
          break;
        case 'stripes':
          const stripeSpacing = size / 12;
          for (let i = -size; i < size * 2; i += stripeSpacing) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + size, size);
            ctx.stroke();
          }
          break;
        case 'ring':
          const centerX = size / 2;
          const centerY = size / 2;
          for (let r = size / 16; r < size / 2; r += size / 8) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.stroke();
          }
          break;
      }
      
      return new THREE.CanvasTexture(canvas);
    };

    // Create materials for different faces
    const materials = facePatternsData.patterns.map((pattern: any) => {
      const texture = createFaceTexture(pattern.pattern);
      return new THREE.MeshLambertMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9
      });
    });

    // Create 27 cubes (3x3x3)
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geometry = new THREE.BoxGeometry(1.8, 1.8, 1.8);
          const material = materials[Math.floor(Math.random() * materials.length)];
          const cube = new THREE.Mesh(geometry, material);
          
          cube.position.set(x * STEP, y * STEP, z * STEP);
          cube.castShadow = true;
          cube.receiveShadow = true;
          
          cubes.push(cube);
          cubeGroup.add(cube);
        }
      }
    }

    scene.add(cubeGroup);

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Initial resize
    const resizeHandler = () => {
      if (!container || !renderer || !camera) return;
      
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resizeHandler();
    window.addEventListener('resize', resizeHandler);

    setIsLoaded(true);

    // Animation loop
    const animate = () => {
      if (renderer && scene && camera) {
        // Apply animations based on scroll progress
        applyScrollAnimations(scrollProgress, cubes, cubeGroup);
        renderer.render(scene, camera);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scrollProgress]);

  // Animation logic based on scroll progress
  const applyScrollAnimations = (progress: number, cubes: THREE.Mesh[], group: THREE.Group) => {
    // Phase 1 (0-12.5%): Initial state with gentle rotation
    if (progress < 0.125) {
      const t = progress / 0.125;
      group.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;
      group.rotation.x = Math.cos(Date.now() * 0.001) * 0.05;
    }
    
    // Phase 2 (12.5-25%): Dismantle into cloud
    else if (progress < 0.25) {
      const t = (progress - 0.125) / 0.125;
      cubes.forEach((cube, i) => {
        const angle = (i / cubes.length) * Math.PI * 2;
        const radius = t * 8;
        cube.position.x = Math.cos(angle) * radius;
        cube.position.y = Math.sin(angle * 0.7) * radius * 0.5;
        cube.position.z = Math.sin(angle) * radius;
        cube.rotation.x = t * Math.PI;
        cube.rotation.y = t * Math.PI * 0.7;
      });
    }
    
    // Phase 3 (25-50%): Transform into different patterns
    else if (progress < 0.5) {
      const t = (progress - 0.25) / 0.25;
      cubes.forEach((cube, i) => {
        // Grid formation
        const gridSize = 3;
        const x = (i % gridSize) - 1;
        const y = Math.floor((i / gridSize) % gridSize) - 1;
        const z = Math.floor(i / (gridSize * gridSize)) - 1;
        
        cube.position.x = x * 3 * (1 + t);
        cube.position.y = y * 3 * (1 + t);
        cube.position.z = z * 3 * (1 + t);
        cube.rotation.x = t * Math.PI * 2;
        cube.rotation.y = t * Math.PI * 1.5;
      });
    }
    
    // Phase 4 (50-75%): Morph into brain-like structure
    else if (progress < 0.75) {
      const t = (progress - 0.5) / 0.25;
      cubes.forEach((cube, i) => {
        const angle = (i / cubes.length) * Math.PI * 4;
        const radius = 4 + Math.sin(angle * 3) * 2;
        cube.position.x = Math.cos(angle) * radius * t;
        cube.position.y = Math.sin(angle * 2) * 3 * t;
        cube.position.z = Math.sin(angle) * radius * t;
        cube.scale.setScalar(0.5 + t * 0.5);
      });
    }
    
    // Phase 5 (75-100%): Final formation
    else {
      const t = (progress - 0.75) / 0.25;
      cubes.forEach((cube, i) => {
        // Return to organized formation
        const gridSize = 3;
        const x = (i % gridSize) - 1;
        const y = Math.floor((i / gridSize) % gridSize) - 1;
        const z = Math.floor(i / (gridSize * gridSize)) - 1;
        
        cube.position.x = x * 2.2;
        cube.position.y = y * 2.2;
        cube.position.z = z * 2.2;
        cube.rotation.x = 0;
        cube.rotation.y = 0;
        cube.scale.setScalar(1);
      });
      
      // Gentle rotation of the whole group
      group.rotation.y = t * Math.PI * 2;
    }
  };

  // Scroll handler
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const scrollTop = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / documentHeight, 0), 1);
    
    setScrollProgress(progress);
    
    // Determine current text section
    const activeSection = scrollingSections.findIndex(section => 
      progress >= section.triggerRange[0] && progress < section.triggerRange[1]
    );
    
    if (activeSection !== -1 && activeSection !== currentTextSection) {
      setCurrentTextSection(activeSection);
    }
  }, [scrollingSections, currentTextSection]);

  // Initialize THREE.js and scroll handler
  useEffect(() => {
    initThreeJS();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initThreeJS, handleScroll]);

  // Get animation variants for text sections
  const getAnimationVariants = (animation: string) => {
    switch (animation) {
      case 'slide-left':
        return {
          initial: { x: -100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: 100, opacity: 0 }
        };
      case 'slide-right':
        return {
          initial: { x: 100, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -100, opacity: 0 }
        };
      case 'fade-up':
        return {
          initial: { y: 50, opacity: 0 },
          animate: { y: 0, opacity: 1 },
          exit: { y: -50, opacity: 0 }
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  // Get position classes for text sections
  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'left':
        return 'left-8 top-1/4 w-96';
      case 'right':
        return 'right-8 top-1/4 w-96';
      case 'center':
        return 'left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96';
      case 'bottom':
        return 'bottom-8 left-1/2 transform -translate-x-1/2 w-96';
      default:
        return 'left-8 top-1/4 w-96';
    }
  };

  const currentSection = scrollingSections[currentTextSection];

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* THREE.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          style={{ display: isLoaded ? 'block' : 'none' }}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-xl">Loading...</div>
          </div>
        )}
      </div>

      {/* Text Overlays */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <AnimatePresence mode="wait">
          {currentSection && (
            <motion.div
              key={currentTextSection}
              className={`absolute ${getPositionClasses(currentSection.position)} 
                         bg-black/70 backdrop-blur-sm rounded-lg p-6 text-white`}
              variants={getAnimationVariants(currentSection.animation)}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-2xl font-bold mb-2 text-blue-400">
                {currentSection.title}
              </h2>
              <h3 className="text-lg font-semibold mb-4 text-blue-200">
                {currentSection.subtitle}
              </h3>
              <p className="text-sm leading-relaxed text-gray-200">
                {currentSection.text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scrollable content for scroll-driven animation */}
      <div className="absolute top-0 left-0 w-full opacity-0 pointer-events-none">
        <div style={{ height: '500vh' }} />
      </div>

      {/* Progress indicator */}
      <div className="absolute top-4 right-4 z-20 text-white text-sm">
        Progress: {(scrollProgress * 100).toFixed(1)}%
      </div>
    </div>
  );
};

export default UnifiedHomePage;
