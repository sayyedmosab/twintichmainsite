import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SphereCanvas } from "./SphereCanvas";
// Removed unused Select imports
import * as THREE from "three";

// Import assets
const cosmicBackground = "/assets/cosmic/cosmic-background.png";
const centralHUD = "/assets/cosmic/central-hud.png";
const urbanFabricIcon = "/assets/cosmic/chapter1-icon.svg";
const futureCitiesIcon = "/assets/cosmic/chapter2-icon.svg";
const buildingLifecycleIcon = "/assets/cosmic/chapter3-icon.svg";
const infrastructureIcon = "/assets/cosmic/chapter4-icon.svg";
const twinLabLogo = "/assets/cosmic/twinlab-logo.png";

const sphereColorPalette = [
  { name: "Dark Gray", value: "#404040" },
  { name: "Deep Blue", value: "#0066CC" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Pink", value: "#EC4899" },
  { name: "Red", value: "#EF4444" },
  { name: "Emerald", value: "#10B981" },
  { name: "Amber", value: "#F59E0B" },
];

interface CosmicLandingPageProps {
  onLoginClick: () => void;
}

const contentTypes = [
  { name: "Audio Podcast", icon: "🎧", color: "#FF6B6B" },
  { name: "Video Presentation", icon: "🎥", color: "#4ECDC4" },
  { name: "TWiki Read", icon: "📚", color: "#45B7D1" },
  { name: "Study Guide", icon: "📝", color: "#96CEB4" },
];

const CUBE_FACE_Z_TRANSLATE = 192;
const DOMAIN_CIRCLE_WIDTH = 192;
const DOMAIN_SPACING_MULTIPLIER = 0.4;
const DOMAIN_RADIUS_BASE = 320; // Fixed radius for all circles - just outside HUD edge
const EPISODE_CUBE_RADIUS = 120;
const EPISODE_CUBE_ANGLES = [225, 315, 45, 135]; // Start top-left, go clockwise
const MOUSE_ROTATION_SENSITIVITY = 0.5;
const ROTATION_DAMPING_FACTOR = 0.95;
const ROTATION_VELOCITY_MULTIPLIER = 0.01;
const ROTATION_VELOCITY_THRESHOLD = 0.0001;

interface Episode {
  id: string;
  title: string;
  description: string;
}

interface Domain {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  angle: number;
  backgroundColor: string;
  episodes: Episode[];
}

export function CosmicLandingPage({
  onLoginClick,
}: CosmicLandingPageProps) {
  const [showDebugPanel, setShowDebugPanel] = useState(false);
  const [selectedCube, setSelectedCube] = useState<{
    chapterId: string;
    episodeId: string;
  } | null>(null);
  const [cubeRotation, setCubeRotation] = useState(0);
  const [sphereColor, setSphereColor] = useState("#8B5CF6");
  const [knowledgeDomains, setKnowledgeDomains] = useState<
    Domain[]
  >([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const rotationRef = useRef(0);

  useEffect(() => {
    // Inline knowledge domains data - no external fetch needed
    const knowledgeDomainsData = [
      {
        id: "chapter-1",
        title: "CHAPTER 1",
        subtitle: "The Mechanics of Transformation",
        image: urbanFabricIcon,
        angle: 225, // Bottom-left corner
        backgroundColor:
          "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #9333EA 100%)",
        episodes: [
          {
            id: "episode-1-1",
            title: "Understanding Digital Twin Foundations",
            description: "Core concepts and principles of digital twin technology",
          },
          {
            id: "episode-1-2",
            title: "Data Integration Strategies",
            description: "How to effectively collect and organize data for digital twins",
          },
          {
            id: "episode-1-3",
            title: "Real-time Synchronization",
            description: "Keeping your digital twin updated with physical reality",
          },
          {
            id: "episode-1-4",
            title: "Performance Optimization",
            description: "Making your digital twin efficient and responsive",
          },
        ],
      },
      {
        id: "chapter-2",
        title: "CHAPTER 2",
        subtitle: "The Architectural Blueprint in Practice",
        image: futureCitiesIcon,
        angle: 315, // Bottom-right corner
        backgroundColor:
          "linear-gradient(135deg, #06B6D4 0%, #0891B2 50%, #0E7490 100%)",
        episodes: [
          {
            id: "episode-2-1",
            title: "System Architecture Design",
            description: "Building scalable digital twin architectures",
          },
          {
            id: "episode-2-2",
            title: "Integration Patterns",
            description: "Common patterns for connecting systems and data sources",
          },
          {
            id: "episode-2-3",
            title: "Security and Compliance",
            description: "Protecting your digital twin infrastructure",
          },
          {
            id: "episode-2-4",
            title: "Deployment Strategies",
            description: "Moving from development to production environments",
          },
        ],
      },
      {
        id: "chapter-3",
        title: "CHAPTER 3",
        subtitle: "The Management Operating System",
        image: buildingLifecycleIcon,
        angle: 45, // Top-right corner
        backgroundColor:
          "linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)",
        episodes: [
          {
            id: "episode-3-1",
            title: "Governance Frameworks",
            description: "Establishing proper governance for digital twin projects",
          },
          {
            id: "episode-3-2",
            title: "Team Collaboration",
            description: "Managing cross-functional teams in digital twin development",
          },
          {
            id: "episode-3-3",
            title: "Process Optimization",
            description: "Streamlining workflows and improving efficiency",
          },
          {
            id: "episode-3-4",
            title: "Change Management",
            description: "Handling updates and evolution in digital twin systems",
          },
        ],
      },
      {
        id: "chapter-4",
        title: "CHAPTER 4",
        subtitle: "An Open-Source Toolkit for Your First 90 Days",
        image: infrastructureIcon,
        angle: 135, // Top-left corner
        backgroundColor:
          "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)",
        episodes: [
          {
            id: "episode-4-1",
            title: "Quick Start Guide",
            description: "Get your first digital twin up and running",
          },
          {
            id: "episode-4-2",
            title: "Essential Tools and Libraries",
            description: "Open-source tools to accelerate development",
          },
          {
            id: "episode-4-3",
            title: "Best Practices Checklist",
            description: "Proven practices for successful implementation",
          },
          {
            id: "episode-4-4",
            title: "Community Resources",
            description: "Connecting with the digital twin community",
          },
        ],
      },
    ];

    setKnowledgeDomains(knowledgeDomainsData);
  }, []);

  const handleCubeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    let currentRotation = cubeRotation;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const rotationDelta = deltaX * MOUSE_ROTATION_SENSITIVITY;
      setCubeRotation(currentRotation + rotationDelta);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const domainElements = useMemo(
    () =>
      knowledgeDomains.map((domain, index) => {
        const angle = (domain.angle * Math.PI) / 180;
        const radius = DOMAIN_RADIUS_BASE; // Same distance for all circles
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius; // No Y multiplier - perfect circle positioning

        return (
          <motion.div
            key={domain.id}
            className="absolute group z-20"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <motion.div
              className="w-48 h-48 relative shadow-2xl rounded-full border-8 border-white"
              style={{
                borderColor: "rgba(255, 255, 255, 0.9)",
                borderWidth: "8px",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
                background: domain.backgroundColor,
              }}
              whileHover={{ scale: 1.05 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
                delay: index * 0.7,
              }}
            >
              <ImageWithFallback
                src={domain.image}
                alt={domain.title}
                className="w-full h-full object-contain rounded-full opacity-80"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/20 rounded-full">
                <h3 className="text-xl font-bold text-white/90 tracking-wide mb-2">
                  {domain.title}
                </h3>
                <p className="text-sm text-white/80 px-4 leading-tight">
                  {domain.subtitle}
                </p>
              </div>
            </motion.div>

            {domain.episodes.map((episode, episodeIndex) => {
              const episodeAngle = (EPISODE_CUBE_ANGLES[episodeIndex] * Math.PI) / 180;
              const cubeX = Math.cos(episodeAngle) * EPISODE_CUBE_RADIUS;
              const cubeY = Math.sin(episodeAngle) * EPISODE_CUBE_RADIUS;

              return (
                <motion.div
                  key={episode.id}
                  className="absolute cursor-pointer z-30"
                  style={{
                    left: `calc(50% + ${cubeX - 16}px)`,
                    top: `calc(50% + ${cubeY + (episodeIndex === 2 || episodeIndex === 3 ? -16 : 0)}px)`,
                    transform: "translate(-50%, -50%)",
                    perspective: "200px",
                    width: "32px",
                    height: "32px",
                  }}
                  whileHover={{ scale: 1.2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setSelectedCube({
                      chapterId: domain.id,
                      episodeId: episode.id,
                    });
                  }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: episodeIndex * 0.5,
                    },
                  }}
                >
                  <div
                    className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white border border-white/20"
                    style={{
                      background:
                        "linear-gradient(45deg, #7C3AED 0%, #8B5CF6 50%, #A855F7 100%)",
                      boxShadow:
                        "0 2px 8px rgba(124, 58, 237, 0.4)",
                      transform: "rotateX(15deg) rotateY(-15deg)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {episodeIndex + 1}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        );
      }),
    [knowledgeDomains],
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={cosmicBackground}
          alt="Cosmic Background"
          className="w-full h-full object-cover object-center"
          style={{
            imageRendering: "crisp-edges",
            transform: "scale(1.1)",
            transformOrigin: "center center",
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* TOP ROW - Fixed header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        <header className="pt-8 pb-8">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={twinLabLogo}
                    alt="TwinLab Logo"
                    className="w-12 h-12 object-contain filter brightness-110"
                  />
                  <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg animate-pulse" />
                </div>
                <h1 className="text-4xl font-allerta text-white tracking-wider">
                  TwinLab - The Future, Ready Today
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                onClick={onLoginClick}
                className="px-8 py-3 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm font-inter"
              >
                LOGIN / REGISTER
              </button>
              <button
                onClick={onLoginClick}
                className="px-8 py-3 border-2 border-white/30 text-white hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm font-inter"
              >
                CONTRIBUTE KNOWLEDGE
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* MIDDLE ROW - Fixed constellation area contained within frame */}
      <div className="fixed left-0 right-0 z-30" style={{ top: '200px', bottom: '120px' }}>
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Rotating HUD - Centered in middle frame only */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative z-20"
              animate={{ rotate: [0, 360] }}
              transition={{
                rotate: {
                  duration: 60,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              <div className="relative">
                <ImageWithFallback
                  src={centralHUD}
                  alt="Central HUD Interface"
                  className="object-contain border-none outline-none w-auto h-auto"
                  style={{
                    imageRendering: "crisp-edges",
                    transform: "scale(0.73)",
                    transformOrigin: "center center",
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Stationary Domain Elements - Centered in middle frame only */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {domainElements}
            </div>
          </div>
        </div>
      </div>

      {/* Sphere Canvas */}
      {isMounted &&
        createPortal(
          <SphereCanvas color={sphereColor} size={35} />,
          document.body,
        )}

      {/* BOTTOM ROW - Fixed footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="pb-8 pt-8">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center">
              <h2 className="text-2xl font-inter text-white/90 mb-2">
                EXPLORE THE UNIVERSE OF DIGITAL TWIN KNOWLEDGE
              </h2>
              <p className="text-lg text-white/70 font-inter">
                Navigate. Learn. Contribute.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Cube Modal */}
      {selectedCube && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedCube(null)}
          />

          <motion.div
            className="relative w-96 h-96"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{ perspective: "1000px" }}
          >
            <div
              className="w-full h-full relative cursor-grab active:cursor-grabbing"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${cubeRotation}deg)`,
              }}
              onMouseDown={handleCubeMouseDown}
            >
              {contentTypes.map((contentType, faceIndex) => (
                <div
                  key={faceIndex}
                  className="absolute w-full h-full flex flex-col items-center justify-center cursor-pointer border-4 border-white/50 rounded-lg"
                  style={{
                    backgroundColor: contentType.color,
                    transform: `rotateY(${faceIndex * 90}deg) translateZ(${CUBE_FACE_Z_TRANSLATE}px)`,
                    backfaceVisibility: "hidden",
                  }}
                  onClick={() => {
                    if (selectedCube) {
                      const selectedEpisode = knowledgeDomains
                        .find(
                          (d) => d.id === selectedCube.chapterId,
                        )
                        ?.episodes?.find(
                          (ep) => ep.id === selectedCube.episodeId,
                        );
                      if (selectedEpisode) {
                        // TODO: Implement a proper modal/UI to display content
                        console.log(
                          `Opening ${contentType.name} for: "${selectedEpisode.title}"`,
                        );
                      }
                    }
                  }}
                >
                  <div className="text-6xl mb-4">
                    {contentType.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white text-center px-4">
                    {contentType.name}
                  </h3>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}