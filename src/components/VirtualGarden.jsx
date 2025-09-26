import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Sparkles, Award, TrendingUp } from 'lucide-react'
import Plant from './Plant'
import { useLocalStorage } from '../hooks/useLocalStorage'

const VirtualGarden = ({ goals, darkMode }) => {
  const [sunlightPoints, setSunlightPoints] = useLocalStorage('garden-sunlight-points', 0)
  const [plantStages, setPlantStages] = useLocalStorage('garden-plant-stages', {})
  const [streak, setStreak] = useLocalStorage('garden-streak', 0)
  const [lastUpdate, setLastUpdate] = useLocalStorage('garden-last-update', null)
  const [hoveredPlant, setHoveredPlant] = useState(null)
  const [celebratingGoal, setCelebratingGoal] = useState(null)

  // Calculate plant stages based on goal progress
  useEffect(() => {
    const newPlantStages = {}
    let newSunlightPoints = sunlightPoints

    goals.forEach(goal => {
      const progress = (goal.currentProgress / goal.targetValue) * 100
      let stage = 0
      
      if (progress >= 100) {
        stage = 4 // Fully grown/bloomed
        // Award sunlight points for completed goals
        if (!plantStages[goal.id] || plantStages[goal.id] < 4) {
          newSunlightPoints += 10
          setCelebratingGoal(goal.id)
          setTimeout(() => setCelebratingGoal(null), 3000)
        }
      } else if (progress >= 75) {
        stage = 3 // Flowering
      } else if (progress >= 50) {
        stage = 2 // Growing
      } else if (progress >= 25) {
        stage = 1 // Sprouting
      } else {
        stage = 0 // Seed
      }

      newPlantStages[goal.id] = stage
    })

    setPlantStages(newPlantStages)
    if (newSunlightPoints !== sunlightPoints) {
      setSunlightPoints(newSunlightPoints)
    }
  }, [goals])

  // Update streak logic
  useEffect(() => {
    const today = new Date().toDateString()
    const lastUpdateDate = lastUpdate ? new Date(lastUpdate).toDateString() : null
    
    if (lastUpdateDate !== today && goals.some(goal => goal.currentProgress > 0)) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      
      if (lastUpdateDate === yesterday.toDateString()) {
        setStreak(streak + 1)
      } else if (lastUpdateDate !== today) {
        setStreak(1)
      }
      setLastUpdate(new Date().toISOString())
    }
  }, [goals])

  const getRewardLevel = () => {
    if (sunlightPoints >= 100) return 3
    if (sunlightPoints >= 50) return 2
    if (sunlightPoints >= 20) return 1
    return 0
  }

  const rewardLevels = [
    { name: 'Seedling Gardener', color: 'text-green-500' },
    { name: 'Blooming Enthusiast', color: 'text-blue-500' },
    { name: 'Garden Master', color: 'text-purple-500' },
    { name: 'Nature Guardian', color: 'text-yellow-500' }
  ]

  const currentReward = rewardLevels[getRewardLevel()]

  return (
    <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-800 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Garden Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              darkMode ? 'bg-green-300' : 'bg-green-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Subtle cloud shapes */}
        <motion.div
          className={`absolute top-10 left-10 w-16 h-8 rounded-full opacity-20 ${
            darkMode ? 'bg-teal-300' : 'bg-white'
          }`}
          animate={{ x: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <motion.div
          className={`absolute top-20 right-20 w-12 h-6 rounded-full opacity-15 ${
            darkMode ? 'bg-cyan-300' : 'bg-white'
          }`}
          animate={{ x: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 p-6 pt-24">
        {/* Garden Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${
            darkMode 
              ? 'from-purple-800/80 to-indigo-800/80 border-purple-700/50' 
              : 'from-white/80 to-purple-50/80 border-purple-200/50'
          } backdrop-blur-md rounded-2xl p-6 mb-8 border shadow-xl`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${
                  darkMode ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'
                }`}>
                  My Virtual Garden
                </h1>
                <p className={`text-sm ${
                  darkMode ? 'text-purple-200' : 'text-purple-600'
                }`}>
                  Watch your goals bloom into beautiful plants!
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-6">
              {/* Sunlight Points */}
              <div className={`text-center p-3 rounded-xl ${
                darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100/80'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <span className={`text-2xl font-bold ${
                    darkMode ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>{sunlightPoints}</span>
                </div>
                <p className={`text-xs font-medium ${
                  darkMode ? 'text-yellow-300' : 'text-yellow-700'
                }`}>
                  Sunlight Points
                </p>
              </div>
              
              {/* Streak */}
              <div className={`text-center p-3 rounded-xl ${
                darkMode ? 'bg-orange-900/30' : 'bg-orange-100/80'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <span className={`text-2xl font-bold ${
                    darkMode ? 'text-orange-400' : 'text-orange-600'
                  }`}>{streak}</span>
                </div>
                <p className={`text-xs font-medium ${
                  darkMode ? 'text-orange-300' : 'text-orange-700'
                }`}>
                  Day Streak
                </p>
              </div>
              
              {/* Reward Level */}
              <div className={`text-center p-3 rounded-xl ${
                darkMode ? 'bg-purple-900/30' : 'bg-purple-100/80'
              }`}>
                <div className="flex items-center space-x-2 mb-1">
                  <Award className="w-5 h-5 text-purple-500" />
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <p className={`text-xs font-medium ${currentReward.color}`}>
                  {currentReward.name}
                </p>
              </div>
            </div>
          </div>
          
          {/* Progress Bar for Next Reward */}
          <div className="w-full">
            <div className="flex justify-between text-xs mb-2">
              <span className={`font-medium ${
                darkMode ? 'text-purple-200' : 'text-purple-600'
              }`}>
                Progress to next level
              </span>
              <span className={`font-medium ${
                darkMode ? 'text-purple-200' : 'text-purple-600'
              }`}>
                {sunlightPoints}/100
              </span>
            </div>
            <div className={`w-full h-3 rounded-full shadow-inner ${
              darkMode ? 'bg-purple-900/50' : 'bg-purple-200'
            }`}>
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-400 via-green-500 to-emerald-500 rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((sunlightPoints / 100) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Garden Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6"
        >
          {goals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredPlant(goal.id)}
              onMouseLeave={() => setHoveredPlant(null)}
            >
              <Plant
                goal={goal}
                stage={plantStages[goal.id] || 0}
                darkMode={darkMode}
                isCelebrating={celebratingGoal === goal.id}
                isHovered={hoveredPlant === goal.id}
              />
              
              {/* Hover Tooltip */}
              <AnimatePresence>
                {hoveredPlant === goal.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 rounded-lg shadow-xl z-20 w-48 border ${
                      darkMode 
                        ? 'bg-gray-800/95 border-gray-600 text-white' 
                        : 'bg-white/95 border-gray-300 text-gray-800'
                    } backdrop-blur-sm`}
                  >
                    <h4 className={`font-semibold text-sm mb-1 ${
                      darkMode ? 'text-white' : 'text-gray-800'
                    }`}>{goal.title}</h4>
                    <p className={`text-xs mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {goal.currentProgress}/{goal.targetValue} completed
                    </p>
                    <div className={`w-full h-2 rounded-full ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div 
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm"
                        style={{ width: `${Math.min((goal.currentProgress / goal.targetValue) * 100, 100)}%` }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          
          {/* Empty slots for future goals */}
          {goals.length < 8 && [...Array(8 - goals.length)].map((_, index) => (
            <motion.div
              key={`empty-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: goals.length * 0.1 + index * 0.1 }}
              className={`h-24 rounded-lg border-2 border-dashed flex items-center justify-center transition-colors ${
                darkMode 
                  ? 'border-emerald-600/60 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-900/20' 
                  : 'border-green-300 text-green-500 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              <span className="text-2xl">🌱</span>
            </motion.div>
          ))}
        </motion.div>

        {/* No Goals State */}
        {goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-2xl font-bold mb-2 text-green-600">
              Your Garden Awaits!
            </h3>
            <p className={`text-lg ${darkMode ? 'text-green-200' : 'text-green-500'}`}>
              Create your first goal to plant your first seed
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default VirtualGarden