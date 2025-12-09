import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ModernPreloaderProps {
  onComplete?: () => void;
  minDuration?: number;
}

const ModernPreloader: React.FC<ModernPreloaderProps> = ({
  onComplete,
  minDuration = 2000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showEnterButton, setShowEnterButton] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    // Animate progress from 0 to 100
    progressInterval = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 3 + 1;
        const newProgress = Math.min(prev + increment, 100);

        // Show enter button when progress reaches 100
        if (newProgress >= 100 && !showEnterButton) {
          setShowEnterButton(true);
        }

        return newProgress;
      });
    }, 80);

    return () => {
      clearInterval(progressInterval);
    };
  }, [showEnterButton]);

  const handleEnter = () => {
    setIsEntering(true);
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, 800);
  };

  const logoVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: {
      width: `${Math.min(progress, 100)}%`,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  const circleVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0, 0, 1, 1] as const,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="modern-preloader"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Background with subtle gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, #f7f7f2 0%, #ffffff 25%, #f7f7f2 50%, #f8f7f3 75%, #f7f7f2 100%)",
              backgroundSize: "400% 400%",
              animation: "gradientShift 8s ease-in-out infinite",
            }}
          />

          {/* Animated particles */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [-20, -100, -20],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                style={{
                  position: "absolute",
                  left: `${20 + i * 12}%`,
                  width: "4px",
                  height: "4px",
                  background: "linear-gradient(135deg, #47614d, #d9b57d)",
                  borderRadius: "50%",
                  boxShadow: "0 0 10px rgba(71, 97, 77, 0.4)",
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
              maxWidth: "400px",
              padding: "2rem",
            }}
          >
            {/* Logo/Brand area */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              style={{ marginBottom: "3rem" }}
            >
              {/* Animated circles */}
              <div
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                  margin: "0 auto 2rem",
                }}
              >
                <motion.div
                  variants={circleVariants}
                  animate="animate"
                  style={{
                    position: "absolute",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    border: "2px solid",
                    borderImage:
                      "linear-gradient(135deg, #47614d, #d9b57d, #47614d) 1",
                    borderStyle: "solid",
                  }}
                />
                <motion.div
                  animate={{
                    rotate: -360,
                    transition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  style={{
                    position: "absolute",
                    width: "70px",
                    height: "70px",
                    top: "15px",
                    left: "15px",
                    borderRadius: "50%",
                    border: "2px solid",
                    borderImage:
                      "linear-gradient(135deg, #d9b57d, #cbc0ad, #d9b57d) 1",
                    borderStyle: "solid",
                    opacity: 0.7,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "50px",
                    height: "50px",
                    background: "linear-gradient(135deg, #47614d, #d9b57d)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 15px rgba(71, 97, 77, 0.3)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Cinzel", serif',
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "white",
                      letterSpacing: "1px",
                    }}
                  >
                    S
                  </span>
                </div>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.8, duration: 0.6 },
                }}
                style={{
                  fontFamily: '"Cinzel", serif',
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: 400,
                  color: "#333333",
                  letterSpacing: "0.05em",
                  margin: "0 0 0.5rem 0",
                  lineHeight: 1.2,
                  textShadow: "0 2px 4px rgba(51, 51, 51, 0.1)",
                }}
              >
                FORMA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1.2, duration: 0.6 },
                }}
                style={{
                  fontFamily: '"Nunito", sans-serif',
                  fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                  fontWeight: 300,
                  color: "#867f78",
                  letterSpacing: "0.1em",
                  margin: 0,
                  textTransform: "uppercase",
                }}
              >
                Crafting Dream Spaces
              </motion.p>
            </motion.div>

            {/* Progress section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 1.5, duration: 0.6 },
              }}
              style={{ marginTop: "3rem" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "3px",
                    background: "rgba(71, 97, 77, 0.1)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <motion.div
                    variants={progressVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                      height: "100%",
                      background: "linear-gradient(90deg, #47614d, #d9b57d)",
                      borderRadius: "2px",
                      position: "relative",
                      boxShadow: "0 0 10px rgba(71, 97, 77, 0.4)",
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: "#47614d",
                    minWidth: "40px",
                    textAlign: "right",
                  }}
                >
                  {Math.round(Math.min(progress, 100))}%
                </div>
              </div>

              <AnimatePresence>
                {!showEnterButton && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    exit={{ opacity: 0 }}
                    style={{
                      fontFamily: '"Nunito", sans-serif',
                      fontSize: "0.85rem",
                      color: "#867f78",
                      letterSpacing: "0.05em",
                      marginTop: "0.5rem",
                    }}
                  >
                    Loading your experience...
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enter Button */}
              <AnimatePresence>
                {showEnterButton && !isEntering && (
                  <motion.button
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 0.5, ease: "easeOut" },
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleEnter}
                    style={{
                      marginTop: "2rem",
                      padding: "0.875rem 2.5rem",
                      fontFamily: '"Cinzel", serif',
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "#ffffff",
                      background: "linear-gradient(135deg, #47614d, #d9b57d)",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      boxShadow: "0 4px 15px rgba(71, 97, 77, 0.3)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Enter
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              left: "10%",
              top: 0,
              width: "80%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: {
                    delay: 2 + i * 0.2,
                    duration: 1,
                    ease: "easeOut",
                  },
                }}
                style={{
                  position: "absolute",
                  top: `${30 + i * 20}%`,
                  left: 0,
                  width: "100%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(71, 97, 77, 0.2), transparent)",
                  transformOrigin: "center",
                }}
              />
            ))}
          </div>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Nunito:wght@300;400;500;600&display=swap');
            
            @keyframes gradientShift {
              0%, 100% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModernPreloader;
