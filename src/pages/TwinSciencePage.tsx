import { TwinScienceLearningHub } from '../components/TwinScience/TwinScienceLearningHub';
import '../components/TwinScience/TwinScience.css';

export function TwinSciencePage() {
  return <TwinScienceLearningHub />;
}

interface ContentModalProps {

  isOpen: boolean;  title: string;// Import assets

  onClose: () => void;

  episode: Episode | null;  episodes: Episode[];const cosmicBackground = "/assets/cosmic/cosmic-background.png";

  contentType: string;

}}const centralHUD = "/assets/cosmic/central-hud.png";



// Content types configuration with our iconsconst urbanFabricIcon = "/assets/cosmic/chapter1-icon.svg";

const contentTypes: ContentType[] = [

  {interface ContentType {const futureCitiesIcon = "/assets/cosmic/chapter2-icon.svg";

    type: 'article',

    name: 'TWiki Read',  type: string;const buildingLifecycleIcon = "/assets/cosmic/chapter3-icon.svg";

    icon: '/icons/wiki.png',

    color: '#45B7D1',  name: string;const infrastructureIcon = "/assets/cosmic/chapter4-icon.svg";

    bgColor: 'bg-blue-50'

  },  icon: string;const twinScienceLogo = "/assets/cosmic/twinscience-logo.png";

  {

    type: 'podcast',  color: string;

    name: 'Audio Podcast', 

    icon: '/icons/mic.png',  bgColor: string;const sphereColorPalette = [

    color: '#8B5CF6',

    bgColor: 'bg-purple-50'}  { name: "Dark Gray", value: "#404040" },

  },

  {  { name: "Deep Blue", value: "#0066CC" },

    type: 'video',

    name: 'Video Lesson',interface ContentModalProps {  { name: "Purple", value: "#8B5CF6" },

    icon: '/icons/vid.png', 

    color: '#EF4444',  isOpen: boolean;  { name: "Indigo", value: "#6366F1" },

    bgColor: 'bg-red-50'

  },  onClose: () => void;  { name: "Pink", value: "#EC4899" },

  {

    type: 'study-guide',  episode: Episode | null;  { name: "Red", value: "#EF4444" },

    name: 'Study Guide',

    icon: '/icons/study.png',  contentType: string;  { name: "Emerald", value: "#10B981" },

    color: '#10B981', 

    bgColor: 'bg-green-50'}  { name: "Amber", value: "#F59E0B" },

  }

];];



// Learning data// Content types configuration with our icons

const learningData: { chapters: Chapter[] } = {

  chapters: [const contentTypes: ContentType[] = [interface TwinSciencePageProps {}

    {

      id: "chapter-1",  {

      title: "Introduction to Digital Twins",

      episodes: [    type: 'article',const contentTypes = [

        { 

          id: "1-1",     name: 'TWiki Read',  { name: "Audio Podcast", icon: "🎧", color: "#FF6B6B" },

          title: "What is a Digital Twin?", 

          description: "Understand the core definition and foundational concepts of digital twin technology that's revolutionizing industries worldwide."     icon: '/icons/wiki.png',  { name: "Video Presentation", icon: "🎥", color: "#4ECDC4" },

        },

        {     color: '#45B7D1',  { name: "TWiki Read", icon: "📚", color: "#45B7D1" },

          id: "1-2", 

          title: "The History of Digital Twins",     bgColor: 'bg-blue-50'  { name: "Study Guide", icon: "📝", color: "#96CEB4" },

          description: "Explore the fascinating origins and evolution of digital twins, from NASA's space missions to modern manufacturing." 

        },  },];

        { 

          id: "1-3",   {

          title: "Key Components", 

          description: "Learn about the essential elements that make up a functional and effective digital twin system."     type: 'podcast',const CUBE_FACE_Z_TRANSLATE = 192;

        },

        {     name: 'Audio Podcast', const DOMAIN_CIRCLE_WIDTH = 192;

          id: "1-4", 

          title: "Benefits and Use Cases",     icon: '/icons/mic.png',const DOMAIN_SPACING_MULTIPLIER = 0.4;

          description: "Discover the real-world advantages and applications of digital twins across various sectors and industries." 

        }    color: '#8B5CF6',const DOMAIN_RADIUS_BASE = 320; // Fixed radius for all circles - just outside HUD edge

      ]

    },    bgColor: 'bg-purple-50'const EPISODE_CUBE_RADIUS = 120;

    {

      id: "chapter-2",   },const EPISODE_CUBE_ANGLES = [225, 315, 45, 135]; // Start top-left, go clockwise

      title: "Building a Digital Twin",

      episodes: [  {const MOUSE_ROTATION_SENSITIVITY = 0.5;

        { 

          id: "2-1",     type: 'video',const ROTATION_DAMPING_FACTOR = 0.95;

          title: "Data Acquisition", 

          description: "Dive into the advanced methods and IoT sensors used to gather real-time data from physical assets."     name: 'Video Lesson',const ROTATION_VELOCITY_MULTIPLIER = 0.01;

        },

        {     icon: '/icons/vid.png', const ROTATION_VELOCITY_THRESHOLD = 0.0001;

          id: "2-2", 

          title: "Modeling and Simulation",     color: '#EF4444',

          description: "Master the sophisticated techniques for creating accurate virtual models and running predictive simulations." 

        },    bgColor: 'bg-red-50'interface Episode {

        { 

          id: "2-3",   },  id: string;

          title: "Integration with IoT", 

          description: "Understand how the Internet of Things (IoT) provides the critical data pipeline for seamless connectivity."   {  title: string;

        },

        {     type: 'study-guide',  description: string;

          id: "2-4", 

          title: "Visualization Techniques",     name: 'Study Guide',}

          description: "Explore cutting-edge methods to visualize complex digital twin data for actionable business insights." 

        }    icon: '/icons/study.png',

      ]

    },    color: '#10B981', interface Domain {

    {

      id: "chapter-3",    bgColor: 'bg-green-50'  id: string;

      title: "Advanced Applications", 

      episodes: [  }  title: string;

        { 

          id: "3-1", ];  subtitle: string;

          title: "Predictive Maintenance", 

          description: "Learn how digital twins enable proactive maintenance strategies that reduce downtime and costs."   image: string;

        },

        { // Learning data  angle: number;

          id: "3-2", 

          title: "Smart Manufacturing", const learningData: { chapters: Chapter[] } = {  backgroundColor: string;

          description: "Discover how digital twins are transforming production lines and enabling Industry 4.0 initiatives." 

        },  chapters: [  episodes: Episode[];

        { 

          id: "3-3",     {}

          title: "Supply Chain Optimization", 

          description: "Explore how digital twins provide end-to-end visibility and optimization across complex supply networks."       id: "chapter-1",

        },

        {       title: "Introduction to Digital Twins",export function TwinSciencePage({}: TwinSciencePageProps) {

          id: "3-4", 

          title: "Future Trends",       episodes: [  const [showDebugPanel, setShowDebugPanel] = useState(false);

          description: "Stay ahead of the curve with emerging trends and future possibilities in digital twin technology." 

        }        {   const [selectedCube, setSelectedCube] = useState<{

      ]

    }          id: "1-1",     chapterId: string;

  ]

};          title: "What is a Digital Twin?",     episodeId: string;



// Episode Card Component          description: "Understand the core definition and foundational concepts of digital twin technology that's revolutionizing industries worldwide."   } | null>(null);

interface EpisodeCardProps {

  episode: Episode;        },  const [cubeRotation, setCubeRotation] = useState(0);

  chapterId: string;

  onContentSelect: (chapterId: string, episodeId: string, contentType: string) => void;        {   const [sphereColor, setSphereColor] = useState("#8B5CF6");

}

          id: "1-2",   const [knowledgeDomains, setKnowledgeDomains] = useState<

function EpisodeCard({ episode, chapterId, onContentSelect }: EpisodeCardProps) {

  const [isHovered, setIsHovered] = useState(false);          title: "The History of Digital Twins",     Domain[]

  const [currentIconIndex, setCurrentIconIndex] = useState(0);

          description: "Explore the fascinating origins and evolution of digital twins, from NASA's space missions to modern manufacturing."   >([]);

  const nextIcon = () => {

    setCurrentIconIndex((prev) => (prev + 1) % contentTypes.length);        },  const [isMounted, setIsMounted] = useState(false);

  };

        { 

  const prevIcon = () => {

    setCurrentIconIndex((prev) => (prev - 1 + contentTypes.length) % contentTypes.length);          id: "1-3",   useEffect(() => {

  };

          title: "Key Components",     setIsMounted(true);

  const currentContentType = contentTypes[currentIconIndex];

          description: "Learn about the essential elements that make up a functional and effective digital twin system."   }, []);

  return (

    < motion.div        },

      className="group relative bg-white border-2 border-gray-300 shadow-lg overflow-hidden h-80 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-500"

      onMouseEnter={() => setIsHovered(true)}        {   const rotationRef = useRef(0);

      onMouseLeave={() => setIsHovered(false)}

      whileHover={{ y: -5 }}          id: "1-4", 

      initial={{ opacity: 0, y: 20 }}

      animate={{ opacity: 1, y: 0 }}          title: "Benefits and Use Cases",   useEffect(() => {

      transition={{ duration: 0.3 }}

    >          description: "Discover the real-world advantages and applications of digital twins across various sectors and industries."     // Inline knowledge domains data - no external fetch needed

      {/* Episode number badge */}

      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-sm font-bold">        }    const knowledgeDomainsData = [

        {episode.id.toUpperCase()}

      </div>      ]      {



      {/* Content container */}    },        id: "chapter-1",

      <div className="relative w-full h-full flex flex-col justify-between p-6">

            {        title: "CHAPTER 1",

        {/* Episode info - always visible */}

        <div className="flex-grow flex flex-col justify-center">      id: "chapter-2",         subtitle: "The Mechanics of Transformation",

          <h3 className="text-gray-900 font-bold text-lg mb-4 leading-tight">{episode.title}</h3>

          <p className="text-gray-600 text-sm leading-relaxed">{episode.description}</p>      title: "Building a Digital Twin",        image: urbanFabricIcon,

        </div>

      episodes: [        angle: 225, // Bottom-left corner

        {/* Content type carousel - visible on hover */}

        <AnimatePresence>        {         backgroundColor:

          {isHovered && (

            <motion.div          id: "2-1",           "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #9333EA 100%)",

              initial={{ opacity: 0, y: 20 }}

              animate={{ opacity: 1, y: 0 }}          title: "Data Acquisition",         episodes: [

              exit={{ opacity: 0, y: 20 }}

              transition={{ duration: 0.2 }}          description: "Dive into the advanced methods and IoT sensors used to gather real-time data from physical assets."           {

              className="bg-gray-50 border-2 border-gray-300 p-4"

            >        },            id: "episode-1-1",

              <div className="flex items-center justify-between">

                <button        {             title: "Understanding Digital Twin Foundations",

                  onClick={(e) => {

                    e.stopPropagation();          id: "2-2",             description: "Core concepts and principles of digital twin technology",

                    prevIcon();

                  }}          title: "Modeling and Simulation",           },

                  className="text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1"

                  disabled={contentTypes.length <= 1}          description: "Master the sophisticated techniques for creating accurate virtual models and running predictive simulations."           {

                >

                  <ChevronLeft size={20} />        },            id: "episode-1-2",

                </button>

                        {             title: "Data Integration Strategies",

                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 bg-white border border-gray-300 flex items-center justify-center overflow-hidden">          id: "2-3",             description: "How to effectively collect and organize data for digital twins",

                    <img 

                      src={currentContentType.icon}          title: "Integration with IoT",           },

                      alt={currentContentType.name}

                      className="w-6 h-6 object-contain"          description: "Understand how the Internet of Things (IoT) provides the critical data pipeline for seamless connectivity."           {

                    />

                  </div>        },            id: "episode-1-3",

                  <span className="text-gray-900 text-sm font-medium">

                    {currentContentType.name}        {             title: "Real-time Synchronization",

                  </span>

                </div>          id: "2-4",             description: "Keeping your digital twin updated with physical reality",

                

                <button          title: "Visualization Techniques",           },

                  onClick={(e) => {

                    e.stopPropagation();          description: "Explore cutting-edge methods to visualize complex digital twin data for actionable business insights."           {

                    nextIcon();

                  }}        }            id: "episode-1-4",

                  className="text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1"

                  disabled={contentTypes.length <= 1}      ]            title: "Performance Optimization",

                >

                  <ChevronRight size={20} />    },            description: "Making your digital twin efficient and responsive",

                </button>

              </div>    {          },

              

              <button      id: "chapter-3",        ],

                onClick={(e) => {

                  e.stopPropagation();      title: "Advanced Applications",       },

                  onContentSelect(chapterId, episode.id, currentContentType.type);

                }}      episodes: [      {

                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 transition-colors duration-200 border border-blue-500 font-medium"

              >        {         id: "chapter-2",

                Open {currentContentType.name}

              </button>          id: "3-1",         title: "CHAPTER 2",

              

              {/* Indicator dots */}          title: "Predictive Maintenance",         subtitle: "The Architectural Blueprint in Practice",

              <div className="flex justify-center gap-1 mt-3">

                {contentTypes.map((_, index) => (          description: "Learn how digital twins enable proactive maintenance strategies that reduce downtime and costs."         image: futureCitiesIcon,

                  <div

                    key={index}        },        angle: 315, // Bottom-right corner

                    className={`w-2 h-2 transition-colors duration-200 ${

                      index === currentIconIndex ? 'bg-blue-400' : 'bg-gray-400'        {         backgroundColor:

                    }`}

                  />          id: "3-2",           "linear-gradient(135deg, #06B6D4 0%, #0891B2 50%, #0E7490 100%)",

                ))}

              </div>          title: "Smart Manufacturing",         episodes: [

            </motion.div>

          )}          description: "Discover how digital twins are transforming production lines and enabling Industry 4.0 initiatives."           {

        </AnimatePresence>

      </div>        },            id: "episode-2-1",

    </motion.div>

  );        {             title: "System Architecture Design",

}

          id: "3-3",             description: "Building scalable digital twin architectures",

// Content Modal Component

function ContentModal({ isOpen, onClose, episode, contentType }: ContentModalProps) {          title: "Supply Chain Optimization",           },

  const [activeContentType, setActiveContentType] = useState(contentType);

            description: "Explore how digital twins provide end-to-end visibility and optimization across complex supply networks."           {

  if (!isOpen || !episode) return null;

        },            id: "episode-2-2",

  const activeContent = contentTypes.find(ct => ct.type === activeContentType);

        {             title: "Integration Patterns",

  const renderContent = () => {

    const content = contentTypes.find(ct => ct.type === activeContentType);          id: "3-4",             description: "Common patterns for connecting systems and data sources",

    if (!content) return null;

          title: "Future Trends",           },

    return (

      <div className="p-8 h-full overflow-y-auto">          description: "Stay ahead of the curve with emerging trends and future possibilities in digital twin technology."           {

        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-4 mb-6">        }            id: "episode-2-3",

            <img src={content.icon} alt={content.name} className="w-12 h-12" />

            <div>      ]            title: "Security and Compliance",

              <h2 className="text-2xl font-bold text-gray-900">{episode.title}</h2>

              <p className="text-gray-600">{content.name}</p>    }            description: "Protecting your digital twin infrastructure",

            </div>

          </div>  ]          },

          

          <div className="prose max-w-none">};          {

            <p className="text-lg text-gray-700 mb-6">{episode.description}</p>

                        id: "episode-2-4",

            {/* Content type specific content */}

            {activeContentType === 'article' && (// Episode Card Component            title: "Deployment Strategies",

              <div>

                <h3 className="text-xl font-semibold mb-4">Article Content</h3>interface EpisodeCardProps {            description: "Moving from development to production environments",

                <p className="mb-4">This would be the detailed article content for {episode.title}.</p>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>  episode: Episode;          },

              </div>

            )}  chapterId: string;        ],

            

            {activeContentType === 'podcast' && (  onContentSelect: (chapterId: string, episodeId: string, contentType: string) => void;      },

              <div>

                <h3 className="text-xl font-semibold mb-4">Audio Podcast</h3>}      {

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">

                  <p className="text-purple-800">🎧 Audio player would be embedded here</p>        id: "chapter-3",

                  <p className="text-sm text-purple-600 mt-2">Duration: ~30 minutes</p>

                </div>function EpisodeCard({ episode, chapterId, onContentSelect }: EpisodeCardProps) {        title: "CHAPTER 3",

              </div>

            )}  const [isHovered, setIsHovered] = useState(false);        subtitle: "The Management Operating System",

            

            {activeContentType === 'video' && (  const [currentIconIndex, setCurrentIconIndex] = useState(0);        image: buildingLifecycleIcon,

              <div>

                <h3 className="text-xl font-semibold mb-4">Video Lesson</h3>        angle: 45, // Top-right corner

                <div className="bg-red-50 p-6 rounded-lg border border-red-200 aspect-video flex items-center justify-center">

                  <p className="text-red-800">🎥 Video player would be embedded here</p>  const nextIcon = () => {        backgroundColor:

                </div>

              </div>    setCurrentIconIndex((prev) => (prev + 1) % contentTypes.length);          "linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)",

            )}

              };        episodes: [

            {activeContentType === 'study-guide' && (

              <div>          {

                <h3 className="text-xl font-semibold mb-4">Study Guide</h3>

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">  const prevIcon = () => {            id: "episode-3-1",

                  <h4 className="font-semibold text-green-800 mb-2">Key Learning Points:</h4>

                  <ul className="list-disc list-inside text-green-700 space-y-1">    setCurrentIconIndex((prev) => (prev - 1 + contentTypes.length) % contentTypes.length);            title: "Governance Frameworks",

                    <li>Understanding core concepts</li>

                    <li>Practical applications</li>  };            description: "Establishing proper governance for digital twin projects",

                    <li>Implementation strategies</li>

                    <li>Best practices</li>          },

                  </ul>

                </div>  const currentContentType = contentTypes[currentIconIndex];          {

              </div>

            )}            id: "episode-3-2",

          </div>

        </div>  return (            title: "Team Collaboration",

      </div>

    );    <motion.div            description: "Managing cross-functional teams in digital twin development",

  };

      className="group relative bg-white border-2 border-gray-300 shadow-lg overflow-hidden h-80 cursor-pointer transition-all duration-300 hover:shadow-xl hover:border-blue-500"          },

  return (

    <AnimatePresence>      onMouseEnter={() => setIsHovered(true)}          {

      {isOpen && (

        <motion.div       onMouseLeave={() => setIsHovered(false)}            id: "episode-3-3",

          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"

          initial={{ opacity: 0 }}      whileHover={{ y: -5 }}            title: "Process Optimization",

          animate={{ opacity: 1 }}

          exit={{ opacity: 0 }}      initial={{ opacity: 0, y: 20 }}            description: "Streamlining workflows and improving efficiency",

        >

          <motion.div       animate={{ opacity: 1, y: 0 }}          },

            className="bg-white w-full h-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border-2 border-gray-300"

            initial={{ scale: 0.9, opacity: 0 }}      transition={{ duration: 0.3 }}          {

            animate={{ scale: 1, opacity: 1 }}

            exit={{ scale: 0.9, opacity: 0 }}    >            id: "episode-3-4",

            transition={{ duration: 0.3 }}

          >      {/* Episode number badge */}            title: "Change Management",

            

            {/* Modal Header */}      <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 text-sm font-bold">            description: "Handling updates and evolution in digital twin systems",

            <div className="flex justify-between items-center p-6 bg-white shadow-lg border-b-2 border-gray-300">

              <div className="flex items-center gap-4">        {episode.id.toUpperCase()}          },

                <div className="w-10 h-10 bg-blue-600 flex items-center justify-center text-white font-bold">

                  TS      </div>        ],

                </div>

                <div>      },

                  <h3 className="font-bold text-gray-900">{episode.title}</h3>

                  <p className="text-sm text-gray-600">{activeContent?.name}</p>      {/* Content container */}      {

                </div>

              </div>      <div className="relative w-full h-full flex flex-col justify-between p-6">        id: "chapter-4",

              

              {/* Content Type Navigation */}                title: "CHAPTER 4",

              <div className="flex gap-2">

                {contentTypes.map((contentType) => (        {/* Episode info - always visible */}        subtitle: "An Open-Source Toolkit for Your First 90 Days",

                  <button

                    key={contentType.type}        <div className="flex-grow flex flex-col justify-center">        image: infrastructureIcon,

                    onClick={() => setActiveContentType(contentType.type)}

                    className={`p-3 border-2 transition-all duration-200 ${          <h3 className="text-gray-900 font-bold text-lg mb-4 leading-tight">{episode.title}</h3>        angle: 135, // Top-left corner

                      activeContentType === contentType.type 

                        ? `${contentType.bgColor} border-blue-300`           <p className="text-gray-600 text-sm leading-relaxed">{episode.description}</p>        backgroundColor:

                        : 'bg-gray-100 hover:bg-gray-200 border-gray-300'

                    }`}        </div>          "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)",

                    title={contentType.name}

                  >        episodes: [

                    <img 

                      src={contentType.icon}        {/* Content type carousel - visible on hover */}          {

                      alt={contentType.name}

                      className="w-6 h-6 object-contain"        <AnimatePresence>            id: "episode-4-1",

                    />

                  </button>          {isHovered && (            title: "Quick Start Guide",

                ))}

              </div>            <motion.div            description: "Get your first digital twin up and running",

              

              <button               initial={{ opacity: 0, y: 20 }}          },

                onClick={onClose}

                className="text-gray-500 hover:text-gray-800 transition-colors duration-200 p-2 hover:bg-gray-100"              animate={{ opacity: 1, y: 0 }}          {

              >

                <X size={24} />              exit={{ opacity: 0, y: 20 }}            id: "episode-4-2",

              </button>

            </div>              transition={{ duration: 0.2 }}            title: "Essential Tools and Libraries",



            {/* Modal Body */}              className="bg-gray-50 border-2 border-gray-300 p-4"            description: "Open-source tools to accelerate development",

            <div className="flex-grow overflow-hidden bg-gray-50">

              {renderContent()}            >          },

            </div>

          </motion.div>              <div className="flex items-center justify-between">          {

        </motion.div>

      )}                <button            id: "episode-4-3",

    </AnimatePresence>

  );                  onClick={(e) => {            title: "Best Practices Checklist",

}

                    e.stopPropagation();            description: "Proven practices for successful implementation",

// Main TwinScience Component

const TwinSciencePage: React.FC = () => {                    prevIcon();          },

  const [modalState, setModalState] = useState<{

    isOpen: boolean;                  }}          {

    episode: Episode | null;

    contentType: string;                  className="text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1"            id: "episode-4-4",

  }>({

    isOpen: false,                  disabled={contentTypes.length <= 1}            title: "Community Resources",

    episode: null,

    contentType: 'article'                >            description: "Connecting with the digital twin community",

  });

                  <ChevronLeft size={20} />          },

  const handleContentSelect = (chapterId: string, episodeId: string, contentType: string) => {

    const chapter = learningData.chapters.find(c => c.id === chapterId);                </button>        ],

    const episode = chapter?.episodes.find(e => e.id === episodeId);

                          },

    if (episode) {

      setModalState({                <div className="flex items-center gap-3">    ];

        isOpen: true,

        episode,                  <div className="w-8 h-8 bg-white border border-gray-300 flex items-center justify-center overflow-hidden">

        contentType

      });                    <img     setKnowledgeDomains(knowledgeDomainsData);

    }

  };                      src={currentContentType.icon}  }, []);



  const closeModal = () => {                      alt={currentContentType.name}

    setModalState({

      isOpen: false,                      className="w-6 h-6 object-contain"  const handleCubeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {

      episode: null,

      contentType: 'article'                    />    e.preventDefault();

    });

  };                  </div>    const startX = e.clientX;



  return (                  <span className="text-gray-900 text-sm font-medium">    let currentRotation = cubeRotation;

    <div className="min-h-screen bg-gray-50">

      <header className="bg-white border-b-4 border-black">                    {currentContentType.name}

        <div className="container mx-auto px-6 py-12">

          <div className="text-center">                  </span>    const handleMouseMove = (moveEvent: MouseEvent) => {

            <h1 className="standardized-title text-gray-900 mb-4">

              TWIN SCIENCE                </div>      const deltaX = moveEvent.clientX - startX;

            </h1>

            <p className="text-xl text-gray-600">                      const rotationDelta = deltaX * MOUSE_ROTATION_SENSITIVITY;

              Digital Twin Educational Platform

            </p>                <button      setCubeRotation(currentRotation + rotationDelta);

          </div>

        </div>                  onClick={(e) => {    };

      </header>

                                e.stopPropagation();

      <main className="container mx-auto px-6 py-12">

        <div className="space-y-16">                    nextIcon();    const handleMouseUp = () => {

          {learningData.chapters.map((chapter) => (

            <section key={chapter.id} className="space-y-8">                  }}      document.removeEventListener("mousemove", handleMouseMove);

              <div className="text-center lg:text-left">

                <h2 className="text-3xl font-bold text-gray-900 mb-4 relative inline-block">                  className="text-gray-400 hover:text-gray-700 transition-colors duration-200 p-1"      document.removeEventListener("mouseup", handleMouseUp);

                  {chapter.title}

                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600"></div>                  disabled={contentTypes.length <= 1}    };

                </h2>

                <p className="text-gray-600 max-w-2xl">                >

                  Master the fundamentals and explore practical applications through our interactive learning modules.

                </p>                  <ChevronRight size={20} />    document.addEventListener("mousemove", handleMouseMove);

              </div>

                              </button>    document.addEventListener("mouseup", handleMouseUp);

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {chapter.episodes.map((episode) => (              </div>  };

                  <EpisodeCard

                    key={episode.id}              

                    episode={episode}

                    chapterId={chapter.id}              <button  const domainElements = useMemo(

                    onContentSelect={handleContentSelect}

                  />                onClick={(e) => {    () =>

                ))}

              </div>                  e.stopPropagation();      knowledgeDomains.map((domain, index) => {

            </section>

          ))}                  onContentSelect(chapterId, episode.id, currentContentType.type);        const angle = (domain.angle * Math.PI) / 180;

        </div>

                }}        const radius = DOMAIN_RADIUS_BASE; // Same distance for all circles

        {/* Learning Stats */}

        <div className="mt-20 bg-white border-2 border-gray-300 shadow-xl p-8">                className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 transition-colors duration-200 border border-blue-500 font-medium"        const x = Math.cos(angle) * radius;

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">

            <div className="space-y-2">              >        const y = Math.sin(angle) * radius; // No Y multiplier - perfect circle positioning

              <div className="text-3xl font-bold text-blue-600">12</div>

              <div className="text-gray-600">Episodes</div>                Open {currentContentType.name}

            </div>

            <div className="space-y-2">              </button>        return (

              <div className="text-3xl font-bold text-indigo-600">4</div>

              <div className="text-gray-600">Content Types</div>                        <motion.div

            </div>

            <div className="space-y-2">              {/* Indicator dots */}            key={domain.id}

              <div className="text-3xl font-bold text-purple-600">3</div>

              <div className="text-gray-600">Chapters</div>              <div className="flex justify-center gap-1 mt-3">            className="absolute group z-20"

            </div>

            <div className="space-y-2">                {contentTypes.map((_, index) => (            style={{

              <div className="text-3xl font-bold text-pink-600">∞</div>

              <div className="text-gray-600">Possibilities</div>                  <div              left: "50%",

            </div>

          </div>                    key={index}              top: "50%",

        </div>

      </main>                    className={`w-2 h-2 transition-colors duration-200 ${              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,



      <ContentModal                      index === currentIconIndex ? 'bg-blue-400' : 'bg-gray-400'            }}

        isOpen={modalState.isOpen}

        onClose={closeModal}                    }`}          >

        episode={modalState.episode}

        contentType={modalState.contentType}                  />            <motion.div

      />

    </div>                ))}              className="w-48 h-48 relative"

  );

};              </div>              style={{



export default TwinSciencePage;            </motion.div>                borderRadius: "50%",

          )}                border: "6px solid white",

        </AnimatePresence>                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.6), inset 0 -2px 0 rgba(0, 0, 0, 0.2)",

      </div>                backgroundColor: "var(--sphere-base)",

    </motion.div>              }}

  );              whileHover={{ scale: 1.05 }}

}              transition={{

                duration: 0.2,

// Content Modal Component                ease: "easeInOut",

function ContentModal({ isOpen, onClose, episode, contentType }: ContentModalProps) {                delay: index * 0.7,

  const [activeContentType, setActiveContentType] = useState(contentType);              }}

              >

  if (!isOpen || !episode) return null;              <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ borderRadius: "50%" }}>

                <h3 className="text-xl font-bold text-white/90 tracking-wide mb-2">

  const activeContent = contentTypes.find(ct => ct.type === activeContentType);                  {domain.title}

                </h3>

  const renderContent = () => {                <p className="text-sm text-white/80 px-4 leading-tight">

    const content = contentTypes.find(ct => ct.type === activeContentType);                  {domain.subtitle}

    if (!content) return null;                </p>

              </div>

    return (            </motion.div>

      <div className="p-8 h-full overflow-y-auto">

        <div className="max-w-4xl mx-auto">            {domain.episodes.map((episode, episodeIndex) => {

          <div className="flex items-center gap-4 mb-6">              const episodeAngle = (EPISODE_CUBE_ANGLES[episodeIndex] * Math.PI) / 180;

            <img src={content.icon} alt={content.name} className="w-12 h-12" />              const cubeX = Math.cos(episodeAngle) * EPISODE_CUBE_RADIUS;

            <div>              const cubeY = Math.sin(episodeAngle) * EPISODE_CUBE_RADIUS;

              <h2 className="text-2xl font-bold text-gray-900">{episode.title}</h2>

              <p className="text-gray-600">{content.name}</p>              return (

            </div>                <motion.div

          </div>                  key={episode.id}

                            className="absolute cursor-pointer z-30"

          <div className="prose max-w-none">                  style={{

            <p className="text-lg text-gray-700 mb-6">{episode.description}</p>                    left: `calc(50% + ${cubeX - 16}px)`,

                                top: `calc(50% + ${cubeY + (episodeIndex === 2 || episodeIndex === 3 ? -16 : 0)}px)`,

            {/* Content type specific content */}                    transform: "translate(-50%, -50%)",

            {activeContentType === 'article' && (                    perspective: "300px",

              <div>                    width: "32px",

                <h3 className="text-xl font-semibold mb-4">Article Content</h3>                    height: "32px",

                <p className="mb-4">This would be the detailed article content for {episode.title}.</p>                  }}

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>                  whileHover={{ scale: 1.2 }}

              </div>                  onClick={(e: React.MouseEvent) => {

            )}                    e.stopPropagation();

                                e.preventDefault();

            {activeContentType === 'podcast' && (                    setSelectedCube({

              <div>                      chapterId: domain.id,

                <h3 className="text-xl font-semibold mb-4">Audio Podcast</h3>                      episodeId: episode.id,

                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">                    });

                  <p className="text-purple-800">🎧 Audio player would be embedded here</p>                  }}

                  <p className="text-sm text-purple-600 mt-2">Duration: ~30 minutes</p>                  animate={{ y: [0, -5, 0] }}

                </div>                  transition={{

              </div>                    y: {

            )}                      duration: 3,

                                  repeat: Infinity,

            {activeContentType === 'video' && (                      ease: "easeInOut",

              <div>                      delay: episodeIndex * 0.5,

                <h3 className="text-xl font-semibold mb-4">Video Lesson</h3>                    },

                <div className="bg-red-50 p-6 rounded-lg border border-red-200 aspect-video flex items-center justify-center">                  }}

                  <p className="text-red-800">🎥 Video player would be embedded here</p>                >

                </div>                  <div

              </div>                    className="w-8 h-8 relative"

            )}                    style={{

                                  transformStyle: "preserve-3d",

            {activeContentType === 'study-guide' && (                      transform: "rotateX(-15deg) rotateY(15deg)",

              <div>                    }}

                <h3 className="text-xl font-semibold mb-4">Study Guide</h3>                  >

                <div className="bg-green-50 p-6 rounded-lg border border-green-200">                    {/* Cube faces */}

                  <h4 className="font-semibold text-green-800 mb-2">Key Learning Points:</h4>                    {[

                  <ul className="list-disc list-inside text-green-700 space-y-1">                      { name: 'front', transform: 'translateZ(16px)' },

                    <li>Understanding core concepts</li>                      { name: 'back', transform: 'translateZ(-16px) rotateY(180deg)' },

                    <li>Practical applications</li>                      { name: 'right', transform: 'rotateY(90deg) translateZ(16px)' },

                    <li>Implementation strategies</li>                      { name: 'left', transform: 'rotateY(-90deg) translateZ(16px)' },

                    <li>Best practices</li>                      { name: 'top', transform: 'rotateX(90deg) translateZ(16px)' },

                  </ul>                      { name: 'bottom', transform: 'rotateX(-90deg) translateZ(16px)' },

                </div>                    ].map((face, faceIndex) => (

              </div>                      <div

            )}                        key={face.name}

          </div>                        className="absolute w-8 h-8 flex items-center justify-center text-xs font-bold text-white border border-white/30"

        </div>                        style={{

      </div>                          backgroundColor: "var(--sphere-base)",

    );                          transform: face.transform,

  };                          boxShadow: faceIndex === 0 

                            ? "0 2px 8px rgba(0, 0, 0, 0.35)"

  return (                            : "0 1px 4px rgba(0, 0, 0, 0.2)",

    <AnimatePresence>                        }}

      {isOpen && (                      >

        <motion.div                         {faceIndex === 0 ? episodeIndex + 1 : ''}

          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"                      </div>

          initial={{ opacity: 0 }}                    ))}

          animate={{ opacity: 1 }}                  </div>

          exit={{ opacity: 0 }}                </motion.div>

        >              );

          <motion.div             })}

            className="bg-white w-full h-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border-2 border-gray-300"          </motion.div>

            initial={{ scale: 0.9, opacity: 0 }}        );

            animate={{ scale: 1, opacity: 1 }}      }),

            exit={{ scale: 0.9, opacity: 0 }}    [knowledgeDomains],

            transition={{ duration: 0.3 }}  );

          >

              return (

            {/* Modal Header */}    <div className="min-h-screen relative overflow-hidden" style={{"--sphere-base": sphereColor} as any}>

            <div className="flex justify-between items-center p-6 bg-white shadow-lg border-b-2 border-gray-300">      {/* Background */}

              <div className="flex items-center gap-4">      <div className="fixed inset-0 z-0">

                <div className="w-10 h-10 bg-blue-600 flex items-center justify-center text-white font-bold">        <img

                  TS          src={cosmicBackground}

                </div>          alt="Cosmic Background"

                <div>          className="w-full h-full object-cover object-center"

                  <h3 className="font-bold text-gray-900">{episode.title}</h3>          style={{

                  <p className="text-sm text-gray-600">{activeContent?.name}</p>            imageRendering: "crisp-edges",

                </div>            transform: "scale(1.1)",

              </div>            transformOrigin: "center center",

                        }}

              {/* Content Type Navigation */}        />

              <div className="flex gap-2">        <div className="absolute inset-0 bg-black/30" />

                {contentTypes.map((contentType) => (      </div>

                  <button

                    key={contentType.type}      {/* TOP ROW - TwinScience Title and Logo ABOVE cosmic images */}

                    onClick={() => setActiveContentType(contentType.type)}      <div className="fixed top-24 left-0 right-0 z-50">

                    className={`p-3 border-2 transition-all duration-200 ${        <div className="flex items-center justify-center gap-4">

                      activeContentType === contentType.type           <img src={twinScienceLogo} alt="TwinScience" className="h-8 w-auto" />

                        ? `${contentType.bgColor} border-blue-300`       <h1 className="text-white/90 text-center">

                        : 'bg-gray-100 hover:bg-gray-200 border-gray-300'        Shape the Future - Learn. Share. Grow.

                    }`}      </h1>

                    title={contentType.name}        </div>

                  >      </div>

                    <img 

                      src={contentType.icon}      {/* CONSTELLATION AREA - Full space between header and footer */}

                      alt={contentType.name}      <div className="fixed left-0 right-0 z-10" style={{ top: '120px', bottom: '40px', overflow: 'hidden' }}>

                      className="w-6 h-6 object-contain"        <div className="relative w-full h-full flex items-center justify-center">

                    />          {/* Rotating HUD - Centered in middle frame only */}

                  </button>          <div className="absolute inset-0 flex items-center justify-center">

                ))}            <motion.div

              </div>              className="relative z-12"

                            animate={{ rotate: [0, 360] }}

              <button               transition={{

                onClick={onClose}                rotate: {

                className="text-gray-500 hover:text-gray-800 transition-colors duration-200 p-2 hover:bg-gray-100"                  duration: 60,

              >                  repeat: Infinity,

                <X size={24} />                  ease: "linear",

              </button>                },

            </div>              }}

            >

            {/* Modal Body */}              <div className="relative">

            <div className="flex-grow overflow-hidden bg-gray-50">                <ImageWithFallback

              {renderContent()}                  src={centralHUD}

            </div>                  alt="Central HUD Interface"

          </motion.div>                  className="object-contain border-none outline-none w-auto h-auto"

        </motion.div>                  style={{

      )}                    imageRendering: "crisp-edges",

    </AnimatePresence>                    transform: "scale(0.73)",

  );                    transformOrigin: "center center",

}                  }}

                />

// Main TwinScience Component              </div>

const TwinSciencePage: React.FC = () => {            </motion.div>

  const [modalState, setModalState] = useState<{          </div>

    isOpen: boolean;

    episode: Episode | null;          {/* Stationary Domain Elements - Centered in middle frame only */}

    contentType: string;          <div className="absolute inset-0 flex items-center justify-center">

  }>({            <div className="relative">

    isOpen: false,              {domainElements}

    episode: null,            </div>

    contentType: 'article'          </div>

  });        </div>

      </div>

  const handleContentSelect = (chapterId: string, episodeId: string, contentType: string) => {

    const chapter = learningData.chapters.find(c => c.id === chapterId);      {/* Sphere Canvas */}

    const episode = chapter?.episodes.find(e => e.id === episodeId);      {isMounted &&

            createPortal(

    if (episode) {          <SphereCanvas color={sphereColor} size={35} />,

      setModalState({          document.body,

        isOpen: true,        )}

        episode,

        contentType      {/* Selected Cube Modal */}

      });      {selectedCube && (

    }        <div className="fixed inset-0 z-[9999] flex items-center justify-center">

  };          <div

            className="absolute inset-0 bg-black/80 backdrop-blur-md"

  const closeModal = () => {            onClick={() => setSelectedCube(null)}

    setModalState({          />

      isOpen: false,

      episode: null,          <motion.div

      contentType: 'article'            className="relative w-96 h-96"

    });            initial={{ scale: 0 }}

  };            animate={{ scale: 1 }}

            exit={{ scale: 0 }}

  return (            transition={{

    <div className="min-h-screen bg-gray-50">              type: "spring",

      <header className="bg-white border-b-4 border-black">              stiffness: 300,

        <div className="container mx-auto px-6 py-12">              damping: 30,

          <div className="text-center">            }}

            <h1 className="standardized-title text-gray-900 mb-4">            style={{ perspective: "1000px" }}

              TWIN SCIENCE          >

            </h1>            <div

            <p className="text-xl text-gray-600">              className="w-full h-full relative cursor-grab active:cursor-grabbing"

              Digital Twin Educational Platform              style={{

            </p>                transformStyle: "preserve-3d",

          </div>                transform: `rotateY(${cubeRotation}deg)`,

        </div>              }}

      </header>              onMouseDown={handleCubeMouseDown}

                        >

      <main className="container mx-auto px-6 py-12">              {contentTypes.map((contentType, faceIndex) => (

        <div className="space-y-16">                <div

          {learningData.chapters.map((chapter) => (                  key={faceIndex}

            <section key={chapter.id} className="space-y-8">                  className="absolute w-full h-full flex flex-col items-center justify-center cursor-pointer border-4 border-white/50 rounded-lg"

              <div className="text-center lg:text-left">                  style={{

                <h2 className="text-3xl font-bold text-gray-900 mb-4 relative inline-block">                    backgroundColor: contentType.color,

                  {chapter.title}                    transform: `rotateY(${faceIndex * 90}deg) translateZ(${CUBE_FACE_Z_TRANSLATE}px)`,

                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-blue-600"></div>                    backfaceVisibility: "hidden",

                </h2>                  }}

                <p className="text-gray-600 max-w-2xl">                  onClick={() => {

                  Master the fundamentals and explore practical applications through our interactive learning modules.                    if (selectedCube) {

                </p>                      const selectedEpisode = knowledgeDomains

              </div>                        .find(

                                        (d) => d.id === selectedCube.chapterId,

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">                        )

                {chapter.episodes.map((episode) => (                        ?.episodes?.find(

                  <EpisodeCard                          (ep) => ep.id === selectedCube.episodeId,

                    key={episode.id}                        );

                    episode={episode}                      if (selectedEpisode) {

                    chapterId={chapter.id}                        // TODO: Implement a proper modal/UI to display content

                    onContentSelect={handleContentSelect}                        console.log(

                  />                          `Opening ${contentType.name} for: "${selectedEpisode.title}"`,

                ))}                        );

              </div>                      }

            </section>                    }

          ))}                  }}

        </div>                >

                  <div className="text-6xl mb-4">

        {/* Learning Stats */}                    {contentType.icon}

        <div className="mt-20 bg-white border-2 border-gray-300 shadow-xl p-8">                  </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">                  <h3 className="text-xl font-bold text-white text-center px-4">

            <div className="space-y-2">                    {contentType.name}

              <div className="text-3xl font-bold text-blue-600">12</div>                  </h3>

              <div className="text-gray-600">Episodes</div>                </div>

            </div>              ))}

            <div className="space-y-2">            </div>

              <div className="text-3xl font-bold text-indigo-600">4</div>          </motion.div>

              <div className="text-gray-600">Content Types</div>        </div>

            </div>      )}

            <div className="space-y-2">    </div>

              <div className="text-3xl font-bold text-purple-600">3</div>  );

              <div className="text-gray-600">Chapters</div>}
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-pink-600">∞</div>
              <div className="text-gray-600">Possibilities</div>
            </div>
          </div>
        </div>
      </main>

      <ContentModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        episode={modalState.episode}
        contentType={modalState.contentType}
      />
    </div>
  );
};

export default TwinSciencePage;