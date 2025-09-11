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
const cosmicBackground = "/assets/cosmic/cosmic-background.svg";
const centralHUD = "/assets/cosmic/central-hud.png";
const urbanFabricIcon = "/assets/cosmic/chapter1-icon.svg";
const futureCitiesIcon = "/assets/cosmic/chapter2-icon.svg";
const buildingLifecycleIcon = "/assets/cosmic/chapter3-icon.svg";
const infrastructureIcon = "/assets/cosmic/chapter4-icon.svg";
const twinLabLogo = "/assets/cosmic/twinlab-logo.svg";

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
const DOMAIN_RADIUS_BASE = 280;
const DOMAIN_Y_RADIUS_MULTIPLIER = 0.7;
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
        angle: 225,
        backgroundColor:
          "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #9333EA 100%)",
        episodes: [
          {
            id: "ep1-1",
            title: "What is an Organizational Transformation?",
            description:
              "Defines transformation as a fundamental re-engineering of an organization's core logic to meet a new strategic ambition that exceeds its current capacity.",
          },
          {
            id: "ep1-2",
            title: "What is a Sector Transformation?",
            description:
              "Elevates the transformation challenge from a single entity to an entire ecosystem. It redesigns how value flows across multiple, interdependent organizations.",
          },
          {
            id: "ep1-3",
            title: "What is the People Transformation?",
            description:
              "Addresses the human and political resistance inherent in public sector reform. Acknowledging that a perfect plan can be derailed by cultural inertia.",
          },
          {
            id: "ep1-4",
            title: "The Entangled Transformation Battleground",
            description:
              'Introduces "entangled" transformations where multiple entities must change simultaneously. Presents the Complexity Index (CI) as a risk assessment tool.',
          },
        ],
      },
      {
        id: "chapter-2",
        title: "CHAPTER 2",
        subtitle: "The Architectural Blueprint in Practice",
        image: futureCitiesIcon,
        angle: 315,
        backgroundColor:
          "linear-gradient(135deg, #7C3AED 0%, #8B5CF6 50%, #7C2D12 100%)",
        episodes: [
          {
            id: "ep2-1",
            title: "Strategic Performance (KPIs)",
            description:
              'Explains how to create a "golden thread" from a high-level national objective (L0) down to a frontline process metric (L3).',
          },
          {
            id: "ep2-2",
            title: "Portfolios & Initiatives",
            description:
              "Defines the portfolio as the control system that translates strategy into funded work with direct links to strategic KPIs.",
          },
          {
            id: "ep2-3",
            title: "Process Architecture",
            description:
              "Establishes that strategy is executed through processes. Defining L3 executable processes and linking them to owners and metrics.",
          },
          {
            id: "ep2-4",
            title: "Organizational Design",
            description:
              "Frames organizational structure as the backbone of accountability. A dynamic structure where every role maps to specific L3 processes and KPIs.",
          },
        ],
      },
      {
        id: "chapter-3",
        title: "CHAPTER 3",
        subtitle: "The Management Operating System",
        image: buildingLifecycleIcon,
        angle: 45,
        backgroundColor:
          "linear-gradient(135deg, #6D28D9 0%, #7C3AED 50%, #5B21B6 100%)",
        episodes: [
          {
            id: "ep3-1",
            title: "The Integrated Governance",
            description:
              'Defines governance as the decision-making "operating system" that integrates strategy, execution (PMO), and operations through structured reviews.',
          },
          {
            id: "ep3-2",
            title: "The Delivery Engine",
            description:
              "Outlines the dual disciplines of Value Assurance (Program Management) and Delivery Assurance (Project Management) that execute governance decisions.",
          },
          {
            id: "ep3-3",
            title: "Change Architecture",
            description:
              "Presents Change Architecture as the discipline for mitigating adoption risk by integrating human readiness activities with technical deliverables.",
          },
          {
            id: "ep3-4",
            title: "The Enablers",
            description:
              "Describes foundational capabilities required for sustainable transformation: Digital Support, Corporate Knowledge Management, and talent culture.",
          },
        ],
      },
      {
        id: "chapter-4",
        title: "CHAPTER 4",
        subtitle:
          "An Open-Source Toolkit for Your First 90 Days",
        image: infrastructureIcon,
        angle: 135,
        backgroundColor:
          "linear-gradient(135deg, #5B21B6 0%, #6D28D9 50%, #4C1D95 100%)",
        episodes: [
          {
            id: "ep4-1",
            title: "Day 1-15: Diagnose Your Starting Point",
            description:
              "Using the Public Sector Complexity Index (CI) to assess your transformation readiness and identify key risk factors.",
          },
          {
            id: "ep4-2",
            title:
              "Day 16-60: Architect Your First Golden Thread",
            description:
              "Using the open source DTO Entity-Relationship Diagram (ERD) to create your strategic alignment framework.",
          },
          {
            id: "ep4-3",
            title:
              "Day 61-90: Launch Your First GenAI-powered Use Case",
            description:
              "Implementing your first AI-powered transformation use case to demonstrate value and build momentum for broader adoption.",
          },
          {
            id: "ep4-4",
            title: "Beyond 90 Days: Scale and Sustain",
            description:
              "Strategies for scaling successful transformation initiatives and building sustainable change management capabilities across the organization.",
          },
        ],
      },
    ];

    setKnowledgeDomains(knowledgeDomainsData);
  }, []);

  const handleCubeMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    e.preventDefault();
    const startX = e.clientX;
    const startRotation = rotationRef.current;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newRotation =
        startRotation + deltaX * MOUSE_ROTATION_SENSITIVITY;
      rotationRef.current = newRotation;
      setCubeRotation(newRotation); // Update immediately during drag
    };

    const handleMouseUp = () => {
      document.removeEventListener(
        "mousemove",
        handleMouseMove,
      );
      document.removeEventListener("mouseup", handleMouseUp);
      // No need to cancel animationFrame since we're not using continuous animation
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const domainElements = useMemo(
    () =>
      knowledgeDomains.map((domain, index) => {
        const spacing =
          DOMAIN_CIRCLE_WIDTH * DOMAIN_SPACING_MULTIPLIER;
        const radius = DOMAIN_RADIUS_BASE + spacing;
        const angleRad = (domain.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * radius;
        const y =
          Math.sin(angleRad) *
          radius *
          DOMAIN_Y_RADIUS_MULTIPLIER;

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
                <h3 className="text-lg font-inter font-bold text-white mb-1 leading-tight">
                  {domain.title}
                </h3>
                <p className="text-sm font-inter text-white/90 leading-tight whitespace-pre-line">
                  {domain.subtitle}
                </p>
              </div>
            </motion.div>

            {domain.episodes?.map(
              (episode: Episode, episodeIndex: number) => {
                const cubeAngle =
                  EPISODE_CUBE_ANGLES[episodeIndex];
                const cubeAngleRad =
                  (cubeAngle * Math.PI) / 180;
                const cubeX =
                  Math.cos(cubeAngleRad) * EPISODE_CUBE_RADIUS;
                const cubeY =
                  Math.sin(cubeAngleRad) * EPISODE_CUBE_RADIUS;

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
              },
            )}
          </motion.div>
        );
      }),
    [knowledgeDomains],
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
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

      <div className="relative z-20 min-h-screen flex flex-col">
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

        <div className="flex-1 flex items-center justify-center py-16">
          <div className="relative w-full max-w-4xl mx-auto px-8">
            {/* Rotating HUD - Isolated */}
            <div
              className="flex items-center justify-center"
              style={{
                position: "fixed",
                zIndex: 20,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
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

            {/* Stationary Domain Elements - Separate Container */}
            <div
              className="flex items-center justify-center"
              style={{
                position: "fixed",
                zIndex: 19,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {domainElements}
            </div>
          </div>
        </div>

        {isMounted &&
          createPortal(
            <SphereCanvas color={sphereColor} size={35} />,
            document.body,
          )}

        <div className="pb-16">
          <div className="max-w-7xl mx-auto px-8"></div>
        </div>

        <div className="pb-16">
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

        <div className="pb-16"></div>
      </div>

      {selectedCube && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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