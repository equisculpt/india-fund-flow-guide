import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple 2D Animation with CSS and Framer Motion
export const SimpleASIAnimation = () => {
  const [currentScene, setCurrentScene] = useState(1);

  useEffect(() => {
    const sceneTimings = [3000, 4000, 5000, 5000, 4000]; // Scene durations
    let totalTime = 0;
    
    sceneTimings.forEach((duration, index) => {
      setTimeout(() => {
        setCurrentScene(index + 1);
      }, totalTime);
      totalTime += duration;
    });

    // Loop the animation
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

  const overlayTexts = {
    1: "Meet ASI Brew Bot – Your AI-Powered SIP Assistant",
    2: "Dynamic SIP adapts. Static SIP doesn't.",
    3: "+9.4% higher growth with Dynamic SIP",
    4: "AI analyzes 1M+ data points, so you don't have to.",
    5: "Brew smarter wealth with ASI Brew Bot"
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-background via-primary/20 to-secondary/20 overflow-hidden">
      
      {/* Scene 1: Robot Introduction */}
      {currentScene === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            {/* Robot Body */}
            <div className="w-32 h-40 bg-gradient-to-b from-primary to-primary-glow rounded-2xl mx-auto animate-float shadow-glow">
              {/* Robot Head */}
              <div className="w-20 h-20 bg-gradient-to-b from-accent to-accent/80 rounded-full mx-auto -mt-10 relative">
                {/* Eyes */}
                <div className="absolute top-6 left-4 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
                <div className="absolute top-6 right-4 w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
              </div>
              
              {/* Arms */}
              <div className="absolute top-20 -left-8 w-6 h-16 bg-primary rounded-lg transform rotate-12"></div>
              <div className="absolute top-20 -right-8 w-6 h-16 bg-primary rounded-lg transform -rotate-12"></div>
            </div>
            
            {/* Brewing Cup */}
            <div className="w-16 h-12 bg-gradient-to-b from-secondary to-secondary/80 rounded-b-xl mx-auto mt-4 relative">
              <div className="w-12 h-8 bg-accent/60 rounded-b-lg mx-auto animate-shimmer"></div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scene 2: Static vs Dynamic Comparison */}
      {currentScene === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex space-x-16">
            {/* Static SIP */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-muted-foreground mb-4">Static SIP</h3>
              <div className="flex space-x-1 items-end">
                {[1, 1, 1, 1, 1].map((height, i) => (
                  <div 
                    key={i} 
                    className="w-8 bg-muted-foreground rounded-t"
                    style={{ height: `${height * 40}px` }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* VS */}
            <div className="flex items-center">
              <span className="text-4xl font-bold text-secondary animate-pulse">VS</span>
            </div>
            
            {/* Dynamic SIP */}
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary mb-4">Dynamic SIP</h3>
              <div className="flex space-x-1 items-end">
                {[1, 1.2, 1.5, 1.8, 2.2].map((height, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ height: 0 }}
                    animate={{ height: `${height * 40}px` }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className="w-8 bg-gradient-to-t from-primary to-primary-glow rounded-t"
                  ></motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scene 3: Data Visualization */}
      {currentScene === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex space-x-20">
            {/* Static Result */}
            <div className="text-center">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: '300px' }}
                transition={{ duration: 2 }}
                className="w-24 bg-muted-foreground rounded-t mx-auto mb-4"
              ></motion.div>
              <p className="text-xl font-bold text-muted-foreground">₹8.5L Corpus</p>
            </div>
            
            {/* Dynamic Result */}
            <div className="text-center">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: '340px' }}
                transition={{ duration: 2, delay: 0.5 }}
                className="w-24 bg-gradient-to-t from-primary to-primary-glow rounded-t mx-auto mb-4 shadow-glow"
              ></motion.div>
              <p className="text-xl font-bold text-primary">₹9.3L Corpus</p>
            </div>
          </div>
          
          {/* Growth indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
            className="absolute top-32 left-1/2 transform -translate-x-1/2"
          >
            <span className="text-3xl font-bold text-accent animate-pulse">+9.4% Higher Growth</span>
          </motion.div>
        </motion.div>
      )}

      {/* Scene 4: AI Brain Working */}
      {currentScene === 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            {/* Central Brain */}
            <div className="w-40 h-40 border-4 border-primary rounded-full relative animate-glow-pulse">
              <div className="w-32 h-32 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full m-auto mt-4 animate-spin" style={{ animationDuration: '3s' }}></div>
              
              {/* Data particles */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-secondary rounded-full"
                  style={{
                    left: `${50 + 60 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                    top: `${50 + 60 * Math.sin((i * 30 * Math.PI) / 180)}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>
            
            {/* Data streams */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-20 bg-gradient-to-t from-transparent via-accent to-transparent"
                  style={{
                    left: `${50 + 100 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                    top: `${50 + 100 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                    transform: `rotate(${i * 45}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Scene 5: Wealth Cup Finale */}
      {currentScene === 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative">
            {/* Wealth Cup */}
            <div className="w-32 h-40 bg-gradient-to-b from-secondary to-secondary/80 rounded-b-full mx-auto relative animate-float">
              {/* Growing golden liquid */}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: '80%' }}
                transition={{ duration: 3, ease: "easeOut" }}
                className="absolute bottom-0 left-2 right-2 bg-gradient-to-t from-secondary-glow to-secondary rounded-b-full animate-shimmer"
              ></motion.div>
            </div>
            
            {/* Success sparkles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-secondary rounded-full"
                style={{
                  left: `${Math.random() * 200 - 50}px`,
                  top: `${Math.random() * 200 - 50}px`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  y: [0, -50],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Text Overlays */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScene}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center max-w-4xl px-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-heading">
            {overlayTexts[currentScene as keyof typeof overlayTexts]}
          </h2>
          
          {currentScene === 5 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="bg-gradient-to-r from-primary via-secondary to-accent text-white px-10 py-5 rounded-full text-xl font-bold hover:scale-105 transition-transform duration-300 shadow-glow animate-glow-pulse"
            >
              Start Your Dynamic SIP →
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent/40 rounded-full animate-floating-particles"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};