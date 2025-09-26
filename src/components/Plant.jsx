import React from 'react'
import { motion } from 'framer-motion'

const Plant = ({ goal, stage, darkMode, isCelebrating, isHovered }) => {
  const categoryColors = {
    fitness: { primary: '#10b981', secondary: '#34d399' },
    work: { primary: '#3b82f6', secondary: '#60a5fa' },
    education: { primary: '#8b5cf6', secondary: '#a78bfa' },
    finance: { primary: '#f59e0b', secondary: '#fbbf24' },
    personal: { primary: '#ec4899', secondary: '#f472b6' },
  }

  const color = categoryColors[goal.category] || categoryColors.personal

  const getPlantEmoji = () => {
    switch (stage) {
      case 0: return '🌱' // Seed
      case 1: return '🌿' // Sprout
      case 2: return '🌳' // Growing
      case 3: return '🌸' // Flowering
      case 4: return '🌺' // Fully bloomed
      default: return '🌱'
    }
  }

  const getPlantSize = () => {
    switch (stage) {
      case 0: return 'text-2xl'
      case 1: return 'text-3xl'
      case 2: return 'text-4xl'
      case 3: return 'text-5xl'
      case 4: return 'text-6xl'
      default: return 'text-2xl'
    }
  }

  const containerVariants = {
    idle: {
      y: [0, -2, 0],
      rotate: [0, 1, -1, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        duration: 0.3
      }
    },
    celebrating: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: 3,
        ease: "easeInOut"
      }
    }
  }

  const plantVariants = {
    seed: { scale: 0.8, opacity: 0.8 },
    sprout: { scale: 0.9, opacity: 0.9 },
    growing: { scale: 1, opacity: 1 },
    flowering: { scale: 1.1, opacity: 1 },
    bloomed: { scale: 1.2, opacity: 1 }
  }

  const stageNames = ['seed', 'sprout', 'growing', 'flowering', 'bloomed']

  return (
    <motion.div
      className={`relative h-24 rounded-lg flex items-center justify-center cursor-pointer ${
        darkMode 
          ? 'bg-gradient-to-br from-emerald-900/50 to-teal-900/50 border border-emerald-600/40 hover:border-emerald-500/60' 
          : 'bg-gradient-to-br from-green-50/90 to-emerald-50/90 border border-green-300/60 hover:border-green-400/80'
      } backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
      style={{
        boxShadow: isCelebrating 
          ? `0 0 20px ${color.primary}40` 
          : isHovered 
            ? `0 4px 20px ${color.primary}20`
            : 'none'
      }}
      variants={containerVariants}
      initial="idle"
      animate={isCelebrating ? "celebrating" : isHovered ? "hover" : "idle"}
    >
      {/* Soil/Ground */}
      <div className={`absolute bottom-0 left-0 right-0 h-3 rounded-b-lg ${
        darkMode ? 'bg-amber-800/60' : 'bg-amber-200/80'
      }`} />
      
      {/* Plant */}
      <motion.div
        className={`${getPlantSize()} transition-all duration-500 filter drop-shadow-sm`}
        variants={plantVariants}
        animate={stageNames[stage]}
        style={{
          filter: isCelebrating ? 'brightness(1.3) saturate(1.4)' : 'none'
        }}
      >
        {getPlantEmoji()}
      </motion.div>

      {/* Growth particles */}
      {(stage > 0 || isCelebrating) && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: color.secondary,
                left: `${30 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                y: [0, -10, -20],
                opacity: [0.8, 0.4, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}

      {/* Celebration sparkles */}
      {isCelebrating && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-yellow-400"
              style={{
                left: `${Math.random() * 80 + 10}%`,
                top: `${Math.random() * 80 + 10}%`,
              }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                y: [0, -20, -40],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}

      {/* Stage indicator */}
      <div className="absolute bottom-1 right-1">
        <div className={`flex space-x-1`}>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                i <= stage 
                  ? darkMode ? 'bg-emerald-400 shadow-emerald-400/50 shadow-sm' : 'bg-green-500 shadow-green-500/30 shadow-sm'
                  : darkMode ? 'bg-gray-700' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Category indicator */}
      <div className="absolute top-1 left-1">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color.primary }}
        />
      </div>
    </motion.div>
  )
}

export default Plant