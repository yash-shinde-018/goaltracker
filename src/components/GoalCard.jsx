import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { Edit2, Trash2, Plus, Minus, Dumbbell, Briefcase, GraduationCap, DollarSign, Sparkles, PartyPopper, Zap } from 'lucide-react'

const categoryGradients = {
  fitness: 'from-emerald-400 via-teal-500 to-cyan-600',
  work: 'from-blue-400 via-purple-500 to-indigo-600', 
  education: 'from-violet-400 via-purple-500 to-fuchsia-600',
  finance: 'from-amber-400 via-orange-500 to-red-500',
  personal: 'from-pink-400 via-rose-500 to-red-500',
}

const categoryColors = {
  fitness: '#22c55e',    // green-500
  work: '#3b82f6',       // blue-500
  education: '#a855f7',  // purple-500
  finance: '#eab308',    // yellow-500
  personal: '#ec4899',   // pink-500
}

const categoryIcons = {
  fitness: <Dumbbell className="w-5 h-5" />,
  work: <Briefcase className="w-5 h-5" />,
  education: <GraduationCap className="w-5 h-5" />,
  finance: <DollarSign className="w-5 h-5" />,
  personal: <Sparkles className="w-5 h-5" />,
}

const GoalCard = ({ 
  goal, 
  viewMode, 
  onEdit, 
  onDelete, 
  onUpdateProgress,
  darkMode 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [justCompleted, setJustCompleted] = useState(false)
  const percentage = Math.min((goal.currentProgress / goal.targetValue) * 100, 100)
  const isCompleted = percentage >= 100
  const categoryColor = categoryColors[goal.category] || categoryColors.personal
  const categoryGradient = categoryGradients[goal.category] || categoryGradients.personal

  // Check if goal was just completed
  useEffect(() => {
    if (isCompleted && percentage === 100) {
      setJustCompleted(true)
      const timer = setTimeout(() => setJustCompleted(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isCompleted, percentage])

  const handleProgressUpdate = (increment) => {
    const newProgress = Math.max(0, Math.min(goal.targetValue, goal.currentProgress + increment))
    onUpdateProgress(goal.id, { currentProgress: newProgress })
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2 }
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className={`p-6 rounded-2xl shadow-lg border transition-all duration-300 backdrop-blur-sm relative overflow-hidden group ${
          isCompleted
            ? `bg-gradient-to-br ${categoryGradient} text-white border-white/20`
            : darkMode 
              ? 'bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 border-gray-700/50 hover:border-gray-600/50'
              : 'bg-gradient-to-br from-white/90 via-white/80 to-gray-50/90 border-gray-200/50 hover:border-gray-300/50'
        } hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 ${justCompleted ? 'animate-pulse ring-4 ring-green-400/50' : ''}`}
        style={{
          backgroundColor: isCompleted ? undefined : undefined,
          borderColor: isCompleted ? undefined : undefined
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Background Design Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Circles */}
          <div className={`absolute top-2 right-2 w-8 h-8 rounded-full opacity-10 ${
            isCompleted ? 'bg-white' : `bg-gradient-to-br ${categoryGradient}`
          }`} />
          <div className={`absolute top-8 right-8 w-4 h-4 rounded-full opacity-20 ${
            isCompleted ? 'bg-white' : `bg-gradient-to-br ${categoryGradient}`
          }`} />
          <div className={`absolute bottom-2 left-2 w-6 h-6 rounded-full opacity-15 ${
            isCompleted ? 'bg-white' : `bg-gradient-to-br ${categoryGradient}`
          }`} />
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, ${isCompleted ? 'white' : categoryColor} 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }} />
        </div>
        <div className="flex items-center space-x-6">
          {/* Progress Circle */}
          <div className="flex-shrink-0 w-16 h-16">
            <CircularProgressbar
              value={percentage}
              text={`${Math.round(percentage)}%`}
              styles={buildStyles({
                textSize: '20px',
                pathColor: isCompleted ? '#ffffff' : categoryColor,
                textColor: isCompleted ? '#000000' : (darkMode ? '#ffffff' : '#374151'),
                trailColor: darkMode ? '#374151' : '#f3f4f6',
                backgroundColor: 'transparent',
              })}
            />
          </div>

          {/* Goal Info */}
          <div className="flex-grow">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{categoryIcons[goal.category]}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                isCompleted
                  ? 'bg-white/20 text-white border border-white/30'
                  : darkMode
                    ? 'bg-gray-700/80 text-gray-300 border border-gray-600/50'
                    : 'bg-white/80 text-gray-700 border border-gray-300/50'
              }`}
              >
                {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1 relative z-10">{goal.title}</h3>
            <p className={`text-sm flex items-center gap-1 relative z-10 ${
              isCompleted
                ? 'text-white/90'
                : darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {goal.currentProgress} / {goal.targetValue} completed
              {isCompleted && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: justCompleted ? [1, 1.2, 1] : 1
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: justCompleted ? 2 : 0,
                    repeatType: "reverse"
                  }}
                  className="text-lg filter drop-shadow-lg ml-1 flex items-center"
                >
                  {justCompleted ? (
                    <PartyPopper className="w-5 h-5 text-yellow-300" />
                  ) : (
                    <Zap className="w-5 h-5 text-yellow-400" />
                  )}
                </motion.span>
              )}
            </p>
          </div>

          {/* Progress Controls */}
          <div className="flex items-center space-x-2">
            <motion.button
              className={`p-2 rounded-lg transition-colors ${
                isCompleted
                  ? 'bg-black/20 hover:bg-black/30 text-black'
                  : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleProgressUpdate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={goal.currentProgress <= 0}
            >
              <Minus className="w-4 h-4" />
            </motion.button>
            <motion.button
              className={`p-2 rounded-lg transition-colors ${
                isCompleted
                  ? 'bg-black/20 hover:bg-black/30 text-black'
                  : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => handleProgressUpdate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={goal.currentProgress >= goal.targetValue}
            >
              <Plus className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
              onClick={() => onEdit(goal)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
              } text-white transition-colors`}
              onClick={() => onDelete(goal.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    )
  }

  // Grid View
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`p-5 rounded-2xl shadow-lg border transition-all duration-300 backdrop-blur-sm relative overflow-hidden group h-96 w-full max-w-xs mx-auto flex flex-col ${
        isCompleted
          ? `bg-gradient-to-br ${categoryGradient} text-white border-white/20`
          : darkMode 
            ? `bg-gradient-to-br from-gray-800/90 via-gray-800/80 to-gray-900/90 border-gray-700/50 hover:border-gray-600/50 shadow-${goal.category} glow-${goal.category}`
            : `bg-gradient-to-br from-white/90 via-white/80 to-gray-50/90 border-gray-200/50 hover:border-gray-300/50 shadow-${goal.category} glow-${goal.category}`
      } hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1 ${justCompleted ? 'animate-pulse ring-4 ring-green-400/50' : ''}`}
      style={{
        backgroundColor: isCompleted ? undefined : undefined,
        borderColor: isCompleted ? undefined : undefined,
        boxShadow: isCompleted 
          ? undefined 
          : `0 0 30px ${categoryColor}50, 0 0 60px ${categoryColor}30, 0 0 90px ${categoryColor}20, 0 4px 15px rgba(0,0,0,0.1)`
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background Design Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Circles */}
        <div className={`absolute top-3 right-3 w-12 h-12 rounded-full opacity-10 ${
          isCompleted ? 'bg-white' : `bg-gradient-to-br ${categoryGradient}`
        }`} />
        <div className={`absolute top-8 right-8 w-6 h-6 rounded-full opacity-20 ${
          isCompleted ? 'bg-white' : `bg-gradient-to-br ${categoryGradient}`
        }`} />
        <div className={`absolute bottom-3 left-3 w-8 h-8 rounded-full opacity-15 ${
          isCompleted ? 'bg-white' : `bg-gradient-to-br ${categoryGradient}`
        }`} />
        <div className={`absolute bottom-8 right-12 w-4 h-4 rounded-full opacity-25 ${
          isCompleted ? 'bg-white' : `bg-gradient-to-br ${categoryGradient}`
        }`} />
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${isCompleted ? 'white' : categoryColor} 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>
      {/* Completion Indicator - Removed, now appears after completed text */}

      {/* Category Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <span className="text-lg">{categoryIcons[goal.category]}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm relative z-10 ${
            isCompleted
              ? 'bg-white/20 text-white border border-white/30'
              : darkMode
                ? 'bg-gray-700/80 text-gray-300 border border-gray-600/50'
                : 'bg-white/80 text-gray-700 border border-gray-300/50'
          }`}
          >
            {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
          </span>
        </div>
        
        {/* Action Buttons - Show on Hover */}
        <motion.div
          className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <motion.button
            className={`p-1 rounded-lg ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
            onClick={() => onEdit(goal)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Edit2 className="w-3 h-3" />
          </motion.button>
          <motion.button
            className={`p-1 rounded-lg ${
              darkMode ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
            } text-white transition-colors`}
            onClick={() => onDelete(goal.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Trash2 className="w-3 h-3" />
          </motion.button>
        </motion.div>
      </div>

      {/* Progress Circle */}
      <div className="flex justify-center mb-4 relative z-10 flex-grow items-center">
        <div className="w-28 h-28">
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}%`}
            styles={buildStyles({
              textSize: '13px',
              pathColor: isCompleted ? '#ffffff' : categoryColor,
              textColor: isCompleted ? '#000000' : (darkMode ? '#ffffff' : '#374151'),
              trailColor: darkMode ? '#374151' : '#f3f4f6',
              backgroundColor: 'transparent',
            })}
          />
        </div>
      </div>

      {/* Goal Title */}
      <h3 className={`text-lg font-semibold mb-2 text-center relative z-10 leading-tight px-1 ${
        isCompleted ? 'text-white' : ''
      }`}>{goal.title}</h3>

      {/* Progress Text */}
      <p className={`text-xs text-center mb-4 flex items-center justify-center gap-1 relative z-10 px-1 ${
        isCompleted
          ? 'text-white/90'
          : darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        {goal.currentProgress} / {goal.targetValue} completed
        {isCompleted && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ 
              scale: justCompleted ? [1, 1.2, 1] : 1
            }}
            transition={{
              duration: 0.6,
              repeat: justCompleted ? 2 : 0,
              repeatType: "reverse"
            }}
            className="text-lg filter drop-shadow-lg ml-1 flex items-center"
          >
            {justCompleted ? (
              <PartyPopper className="w-5 h-5 text-yellow-300" />
            ) : (
              <Zap className="w-5 h-5 text-yellow-400" />
            )}
          </motion.span>
        )}
      </p>

      {/* Progress Controls */}
      <div className="flex justify-center space-x-2 relative z-10 mt-auto">
        <motion.button
          className={`p-2 rounded-lg transition-colors ${
            isCompleted
              ? 'bg-black/20 hover:bg-black/30 text-black'
              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => handleProgressUpdate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={goal.currentProgress <= 0}
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        <motion.button
          className={`p-2 rounded-lg transition-colors ${
            isCompleted
              ? 'bg-black/20 hover:bg-black/30 text-black'
              : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
          }`}
          onClick={() => handleProgressUpdate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={goal.currentProgress >= goal.targetValue}
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default GoalCard