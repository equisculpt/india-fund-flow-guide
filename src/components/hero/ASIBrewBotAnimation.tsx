import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Text,
  Sphere, 
  Box, 
  Cylinder, 
  Float, 
  Environment,
  Html,
  useMatcapTexture,
  Torus,
  Icosahedron
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Scene 1: ASI Brew Bot Robot Bartender
const BrewBot = ({ scene, progress }: { scene: number; progress: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [matcap] = useMatcapTexture('3B3C3F_DAD9D5_929290_ABACA8');
  
  useFrame((state) => {
    if (groupRef.current && scene === 1) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  if (scene !== 1) return null;

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={progress}>
      {/* Robot Body */}
      <Box args={[1, 1.5, 0.8]} position={[0, 0, 0]}>
        <meshMatcapMaterial matcap={matcap} color="#4F46E5" />
      </Box>
      
      {/* Robot Head */}
      <Sphere args={[0.4]} position={[0, 1, 0]}>
        <meshMatcapMaterial matcap={matcap} color="#06B6D4" />
      </Sphere>
      
      {/* Eyes - Glowing */}
      <Sphere args={[0.1]} position={[-0.15, 1.1, 0.3]}>
        <meshBasicMaterial color="#FFD700" />
      </Sphere>
      <Sphere args={[0.1]} position={[0.15, 1.1, 0.3]}>
        <meshBasicMaterial color="#FFD700" />
      </Sphere>
      
      {/* Arms */}
      <Cylinder args={[0.1, 0.1, 0.8]} position={[-0.8, 0.2, 0]} rotation={[0, 0, Math.PI / 4]}>
        <meshMatcapMaterial matcap={matcap} color="#4F46E5" />
      </Cylinder>
      <Cylinder args={[0.1, 0.1, 0.8]} position={[0.8, 0.2, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <meshMatcapMaterial matcap={matcap} color="#4F46E5" />
      </Cylinder>
      
      {/* Brewing Cup */}
      <Cylinder args={[0.2, 0.15, 0.3]} position={[0, -1.2, 0]}>
        <meshMatcapMaterial matcap={matcap} color="#FFD700" />
      </Cylinder>
      
      {/* Glowing liquid effect */}
      <Cylinder args={[0.18, 0.13, 0.25]} position={[0, -1.15, 0]}>
        <meshBasicMaterial color="#00F5D4" transparent opacity={0.8} />
      </Cylinder>
    </group>
  );
};

// Scene 2: Static vs Dynamic SIP Comparison
const SIPComparison = ({ scene, progress }: { scene: number; progress: number }) => {
  const staticBarsRef = useRef<THREE.Group>(null);
  const dynamicBarsRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (scene === 2 && dynamicBarsRef.current) {
      // Animate dynamic bars growing
      dynamicBarsRef.current.children.forEach((child, index) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime + index) * 0.3;
        child.scale.setY(scale);
      });
    }
  });

  if (scene !== 2) return null;

  return (
    <group scale={progress}>
      {/* Static SIP Side */}
      <group ref={staticBarsRef} position={[-2, 0, 0]}>
        {[...Array(5)].map((_, i) => (
          <Box key={i} args={[0.3, 1, 0.3]} position={[i * 0.5, 0, 0]}>
            <meshStandardMaterial color="#6B7280" />
          </Box>
        ))}
        <Text
          position={[1, -1.5, 0]}
          fontSize={0.3}
          color="#6B7280"
          anchorX="center"
          anchorY="middle"
        >
          Static SIP
        </Text>
      </group>
      
      {/* Dynamic SIP Side */}
      <group ref={dynamicBarsRef} position={[2, 0, 0]}>
        {[...Array(5)].map((_, i) => (
          <Box key={i} args={[0.3, 1 + i * 0.3, 0.3]} position={[i * 0.5, (i * 0.15), 0]}>
            <meshStandardMaterial color="#4F46E5" />
          </Box>
        ))}
        <Text
          position={[1, -1.5, 0]}
          fontSize={0.3}
          color="#4F46E5"
          anchorX="center"
          anchorY="middle"
        >
          Dynamic SIP
        </Text>
      </group>
      
      {/* VS divider */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.5}
        color="#FFD700"
        anchorX="center"
        anchorY="middle"
      >
        VS
      </Text>
    </group>
  );
};

// Scene 3: Real Data Visualization
const DataVisualization = ({ scene, progress }: { scene: number; progress: number }) => {
  const staticCorpusRef = useRef<THREE.Mesh>(null);
  const dynamicCorpusRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (scene === 3) {
      if (staticCorpusRef.current) {
        staticCorpusRef.current.scale.setY(8.5 * progress);
      }
      if (dynamicCorpusRef.current) {
        dynamicCorpusRef.current.scale.setY(9.3 * progress);
      }
    }
  });

  if (scene !== 3) return null;

  return (
    <group scale={progress}>
      {/* Static SIP Result */}
      <group position={[-2, 0, 0]}>
        <Box ref={staticCorpusRef} args={[0.8, 1, 0.8]} position={[0, 4.25, 0]}>
          <meshStandardMaterial color="#6B7280" />
        </Box>
        <Text
          position={[0, -1, 0]}
          fontSize={0.3}
          color="#6B7280"
          anchorX="center"
          anchorY="middle"
        >
          ₹8.5L{'\n'}Corpus
        </Text>
      </group>
      
      {/* Dynamic SIP Result */}
      <group position={[2, 0, 0]}>
        <Box ref={dynamicCorpusRef} args={[0.8, 1, 0.8]} position={[0, 4.65, 0]}>
          <meshStandardMaterial color="#4F46E5" />
        </Box>
        <Text
          position={[0, -1, 0]}
          fontSize={0.3}
          color="#4F46E5"
          anchorX="center"
          anchorY="middle"
        >
          ₹9.3L{'\n'}Corpus
        </Text>
      </group>
      
      {/* Percentage gain indicator */}
      <Text
        position={[0, 6, 0]}
        fontSize={0.4}
        color="#00F5D4"
        anchorX="center"
        anchorY="middle"
      >
        +9.4% Higher Growth
      </Text>
    </group>
  );
};

// Scene 4: AI Brain Visualization
const AIBrain = ({ scene, progress }: { scene: number; progress: number }) => {
  const brainRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (scene === 4 && brainRef.current) {
      brainRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      if (particlesRef.current) {
        particlesRef.current.children.forEach((child, index) => {
          const time = state.clock.elapsedTime + index;
          child.position.setY(Math.sin(time) * 2);
          child.position.setX(Math.cos(time) * 3);
        });
      }
    }
  });

  if (scene !== 4) return null;

  return (
    <group scale={progress}>
      {/* Central Brain Sphere */}
      <group ref={brainRef}>
        <Icosahedron args={[1]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#4F46E5" wireframe />
        </Icosahedron>
        
        {/* Inner glow */}
        <Sphere args={[0.8]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#00F5D4" transparent opacity={0.3} />
        </Sphere>
      </group>
      
      {/* Data particles flowing around */}
      <group ref={particlesRef}>
        {[...Array(20)].map((_, i) => (
          <Sphere key={i} args={[0.05]} position={[
            Math.cos((i * Math.PI * 2) / 20) * 3,
            Math.sin(i) * 2,
            Math.sin((i * Math.PI * 2) / 20) * 3
          ]}>
            <meshBasicMaterial color="#FFD700" />
          </Sphere>
        ))}
      </group>
      
      {/* Data streams */}
      {[...Array(8)].map((_, i) => (
        <Torus key={i} args={[2 + i * 0.5, 0.05]} rotation={[
          Math.PI / 4 * i,
          Math.PI / 3 * i,
          0
        ]}>
          <meshBasicMaterial color="#00F5D4" transparent opacity={0.6} />
        </Torus>
      ))}
    </group>
  );
};

// Scene 5: Final CTA with Wealth Cup
const WealthCup = ({ scene, progress }: { scene: number; progress: number }) => {
  const cupRef = useRef<THREE.Group>(null);
  const liquidRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (scene === 5) {
      if (cupRef.current) {
        cupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
      }
      if (liquidRef.current) {
        liquidRef.current.scale.setY(progress);
      }
    }
  });

  if (scene !== 5) return null;

  return (
    <group ref={cupRef} scale={progress}>
      {/* Wealth Cup */}
      <Cylinder args={[0.8, 0.6, 1.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </Cylinder>
      
      {/* Growing golden liquid */}
      <Cylinder ref={liquidRef} args={[0.75, 0.55, 1.4]} position={[0, -0.05, 0]}>
        <meshBasicMaterial color="#FFD700" transparent opacity={0.8} />
      </Cylinder>
      
      {/* Glow effect */}
      <pointLight color="#FFD700" intensity={2} position={[0, 0, 0]} />
      
      {/* Success sparkles */}
      {[...Array(10)].map((_, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <Sphere args={[0.05]} position={[
            (Math.random() - 0.5) * 4,
            Math.random() * 3,
            (Math.random() - 0.5) * 4
          ]}>
            <meshBasicMaterial color="#FFD700" />
          </Sphere>
        </Float>
      ))}
    </group>
  );
};

// Main Animation Component
const ASIBrewBotScene = () => {
  const [currentScene, setCurrentScene] = useState(1);
  const [sceneProgress, setSceneProgress] = useState(0);
  
  useEffect(() => {
    const sceneTimings = [
      { scene: 1, duration: 2000 },
      { scene: 2, duration: 4000 },
      { scene: 3, duration: 5000 },
      { scene: 4, duration: 5000 },
      { scene: 5, duration: 4000 }
    ];
    
    let totalTime = 0;
    sceneTimings.forEach(({ scene, duration }, index) => {
      setTimeout(() => {
        setCurrentScene(scene);
        setSceneProgress(0);
        
        // Animate progress from 0 to 1 over the duration
        const startTime = Date.now();
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setSceneProgress(progress);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      }, totalTime);
      totalTime += duration;
    });
    
    // Loop the animation
    setTimeout(() => {
      setCurrentScene(1);
      setSceneProgress(0);
    }, totalTime);
    
    const loopInterval = setInterval(() => {
      setCurrentScene(1);
      setSceneProgress(0);
      
      let sceneTime = 0;
      sceneTimings.forEach(({ scene, duration }) => {
        setTimeout(() => {
          setCurrentScene(scene);
          setSceneProgress(0);
          
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setSceneProgress(progress);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        }, sceneTime);
        sceneTime += duration;
      });
    }, totalTime);
    
    return () => clearInterval(loopInterval);
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} color="#4F46E5" intensity={0.5} />
      
      <BrewBot scene={currentScene} progress={sceneProgress} />
      <SIPComparison scene={currentScene} progress={sceneProgress} />
      <DataVisualization scene={currentScene} progress={sceneProgress} />
      <AIBrain scene={currentScene} progress={sceneProgress} />
      <WealthCup scene={currentScene} progress={sceneProgress} />
      
      <Environment preset="night" />
    </>
  );
};

// Text Overlays Component
const TextOverlays = ({ currentScene }: { currentScene: number }) => {
  const overlayTexts = {
    1: "Meet ASI Brew Bot – Your AI-Powered SIP Assistant",
    2: "Dynamic SIP adapts. Static SIP doesn't.",
    3: "+9.4% higher growth with Dynamic SIP",
    4: "AI analyzes 1M+ data points, so you don't have to.",
    5: "Brew smarter wealth with ASI Brew Bot"
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScene}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 max-w-4xl">
          {overlayTexts[currentScene as keyof typeof overlayTexts]}
        </h2>
        {currentScene === 5 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-glow"
          >
            Start Your Dynamic SIP →
          </motion.button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

// Main Export Component
export const ASIBrewBotAnimation = () => {
  const [currentScene, setCurrentScene] = useState(1);

  useEffect(() => {
    const sceneTimings = [2000, 4000, 5000, 5000, 4000];
    let totalTime = 0;
    
    sceneTimings.forEach((duration, index) => {
      setTimeout(() => {
        setCurrentScene(index + 1);
      }, totalTime);
      totalTime += duration;
    });

    const loopInterval = setInterval(() => {
      let sceneTime = 0;
      sceneTimings.forEach((duration, index) => {
        setTimeout(() => {
          setCurrentScene(index + 1);
        }, sceneTime);
        sceneTime += duration;
      });
    }, totalTime);

    return () => clearInterval(loopInterval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-background via-primary/20 to-secondary/20 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <ASIBrewBotScene />
        </Suspense>
      </Canvas>
      
      <TextOverlays currentScene={currentScene} />
      
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full animate-floating-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};