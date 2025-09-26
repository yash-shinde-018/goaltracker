import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Medal, Award, Crown, TrendingUp, Users, Star, Flame } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const GardenLeaderboard = ({ userSunlightPoints, userStreak, darkMode }) => {
  const [currentUser] = useLocalStorage('goalsetter-user', null)
  const [selectedPeriod, setSelectedPeriod] = useState('all-time')
  const [hoveredUser, setHoveredUser] = useState(null)

  // Generate temporary leaderboard data for frontend demo
  const generateLeaderboardData = () => {
    const tempUsers = [
      { id: 1, name: 'Alex Johnson', avatar: '🌟', sunlightPoints: 245, streak: 12, plantsGrown: 18, level: 'Garden Master' },
      { id: 2, name: 'Sarah Chen', avatar: '🌸', sunlightPoints: 220, streak: 8, plantsGrown: 16, level: 'Garden Master' },
      { id: 3, name: 'Mike Rodriguez', avatar: '🌱', sunlightPoints: 195, streak: 15, plantsGrown: 14, level: 'Blooming Enthusiast' },
      { id: 4, name: 'Emma Williams', avatar: '🌺', sunlightPoints: 180, streak: 6, plantsGrown: 13, level: 'Blooming Enthusiast' },
      { id: 5, name: 'David Park', avatar: '🌻', sunlightPoints: 165, streak: 9, plantsGrown: 12, level: 'Blooming Enthusiast' },
      { id: 6, name: 'Lisa Thompson', avatar: '🌷', sunlightPoints: 150, streak: 4, plantsGrown: 11, level: 'Blooming Enthusiast' },
      { id: 7, name: 'Ryan Kumar', avatar: '🌿', sunlightPoints: 135, streak: 7, plantsGrown: 10, level: 'Blooming Enthusiast' },
      { id: 8, name: 'Sophia Davis', avatar: '🍀', sunlightPoints: 120, streak: 5, plantsGrown: 9, level: 'Seedling Gardener' },
      { id: 10, name: 'Olivia Brown', avatar: '🎋', sunlightPoints: 90, streak: 2, plantsGrown: 7, level: 'Seedling Gardener' },
    ]

    // Add current user to leaderboard if logged in and not already present
    if (currentUser) {
      // Check if current user already exists in temp users (by name)
      const existingUser = tempUsers.find(user => 
        user.name === (currentUser.name || 'Guest User')
      )
      
      if (!existingUser) {
        const currentUserData = {
          id: 'current',
          name: currentUser.name || 'Guest User',
          avatar: currentUser.avatar || '👤',
          sunlightPoints: userSunlightPoints || 105,
          streak: userStreak || 3,
          plantsGrown: Math.floor((userSunlightPoints || 105) / 10),
          level: getLevelName(userSunlightPoints || 105),
          isCurrentUser: true
        }
        
        tempUsers.push(currentUserData)
      } else {
        // Mark existing user as current user
        existingUser.isCurrentUser = true
      }
    }

    // Sort by sunlight points and assign ranks
    return tempUsers.sort((a, b) => b.sunlightPoints - a.sunlightPoints).map((user, index) => ({
      ...user,
      rank: index + 1
    }))
  }

  const getLevelName = (points) => {
    if (points >= 100) return 'Nature Guardian'
    if (points >= 50) return 'Garden Master'
    if (points >= 20) return 'Blooming Enthusiast'
    return 'Seedling Gardener'
  }

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />
      case 2: return <Medal className="w-6 h-6 text-gray-400" />
      case 3: return <Award className="w-6 h-6 text-amber-600" />
      default: return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold">{rank}</span>
    }
  }

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'from-yellow-400 to-orange-500'
      case 2: return 'from-gray-400 to-gray-600'
      case 3: return 'from-amber-600 to-orange-700'
      default: return 'from-blue-400 to-blue-600'
    }
  }

  const leaderboardData = generateLeaderboardData()
  const currentUserRank = leaderboardData.find(user => user.isCurrentUser)

  // Debug: Log to check if there are duplicates
  console.log('Leaderboard data:', leaderboardData.map(u => ({ name: u.name, rank: u.rank, isCurrentUser: u.isCurrentUser })))

  const periods = [
    { id: 'all-time', label: 'All Time', icon: Trophy },
    { id: 'monthly', label: 'This Month', icon: TrendingUp },
    { id: 'weekly', label: 'This Week', icon: Flame }
  ]

  return (
    <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-800 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating trophies */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute text-2xl opacity-10 ${
              darkMode ? 'text-yellow-300' : 'text-yellow-500'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            🏆
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 p-6 pt-24">
        {/* Leaderboard Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${
            darkMode 
              ? 'from-purple-800/80 to-indigo-800/80 border-purple-700/50' 
              : 'from-white/80 to-purple-50/80 border-purple-200/50'
          } backdrop-blur-md rounded-2xl p-6 mb-8 border`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'}`}>
                  Garden Leaderboard
                </h1>
                <p className={`text-sm ${darkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                  Compete with gardeners worldwide!
                </p>
              </div>
            </div>
            
            {/* User's Rank Display */}
            {currentUserRank && (
              <div className={`text-center p-4 rounded-xl ${
                darkMode ? 'bg-purple-900/50' : 'bg-purple-100/80'
              }`}>
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <span className="text-2xl font-bold text-purple-600">#{currentUserRank.rank}</span>
                </div>
                <p className={`text-xs ${darkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                  Your Rank
                </p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-purple-300' : 'text-purple-500'}`}>
                  {currentUserRank.sunlightPoints} points
                </p>
              </div>
            )}
          </div>

          {/* Period Selector */}
          <div className="flex items-center space-x-2">
            {periods.map((period) => {
              const Icon = period.icon
              return (
                <motion.button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    selectedPeriod === period.id
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                      : darkMode
                        ? 'bg-purple-900/50 text-purple-300 hover:bg-purple-800/50'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{period.label}</span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto"
        >
          {leaderboardData.slice(0, 3).map((user, index) => {
            const positions = [1, 0, 2] // Center 1st place
            const actualIndex = positions[index]
            const actualUser = leaderboardData[actualIndex]
            
            return (
              <motion.div
                key={actualUser.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative h-40 flex flex-col items-center justify-end p-4 rounded-2xl ${
                  darkMode 
                    ? 'bg-gradient-to-t from-purple-900/50 to-purple-800/30' 
                    : 'bg-gradient-to-t from-purple-100/80 to-white/80'
                } backdrop-blur-sm border ${
                  darkMode ? 'border-purple-700/50' : 'border-purple-200/50'
                }`}
              >
                {/* Podium Number */}
                <div className={`absolute top-2 left-2 w-8 h-8 rounded-full bg-gradient-to-r ${
                  getRankColor(actualUser.rank)
                } flex items-center justify-center text-white font-bold text-sm`}>
                  {actualUser.rank}
                </div>
                
                {/* Crown for 1st place */}
                {actualUser.rank === 1 && (
                  <motion.div
                    className="absolute -top-4 text-4xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    👑
                  </motion.div>
                )}
                
                {/* User Avatar */}
                <div className="text-3xl mb-2">{actualUser.avatar}</div>
                
                {/* User Info */}
                <h3 className="font-bold text-sm text-center mb-1">{actualUser.name}</h3>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-3 h-3" />
                  <span className="text-xs font-medium">{actualUser.sunlightPoints}</span>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`bg-gradient-to-br ${
            darkMode 
              ? 'from-purple-800/60 to-indigo-800/60 border-purple-600/50' 
              : 'from-white/70 to-purple-50/70 border-purple-200/50'
          } backdrop-blur-md rounded-2xl border overflow-hidden`}
        >
          <div className={`px-6 py-4 border-b ${
            darkMode ? 'border-purple-600/50' : 'border-purple-200/50'
          }`}>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-bold">All Gardeners</h2>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex items-center justify-between p-4 border-b transition-all duration-300 ${
                  darkMode ? 'border-purple-700/40 hover:bg-purple-700/30' : 'border-purple-100 hover:bg-purple-50/50'
                } ${user.isCurrentUser ? (darkMode ? 'bg-blue-800/40' : 'bg-blue-50/70') : ''}`}
                onMouseEnter={() => setHoveredUser(user.id)}
                onMouseLeave={() => setHoveredUser(null)}
              >
                <div className="flex items-center space-x-4">
                  {/* Rank */}
                  <div className="w-12 flex justify-center">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  {/* Avatar */}
                  <div className="text-2xl">{user.avatar}</div>
                  
                  {/* User Info */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{user.name}</h3>
                      {user.isCurrentUser && (
                        <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
                          You
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                      {user.level}
                    </p>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <Star className="w-4 h-4" />
                      <span className="font-bold">{user.sunlightPoints}</span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Points
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-orange-500">
                      <Flame className="w-4 h-4" />
                      <span className="font-bold">{user.streak}</span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Streak
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-green-500">
                      <span className="text-sm">🌱</span>
                      <span className="font-bold">{user.plantsGrown}</span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Plants
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8"
        >
          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-purple-900/30' : 'bg-purple-100/80'
          } backdrop-blur-sm text-center`}>
            <div className="text-2xl font-bold text-purple-500">{leaderboardData.length}</div>
            <p className={`text-sm ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
              Total Gardeners
            </p>
          </div>
          
          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100/80'
          } backdrop-blur-sm text-center`}>
            <div className="text-2xl font-bold text-yellow-500">
              {leaderboardData.reduce((sum, user) => sum + user.sunlightPoints, 0)}
            </div>
            <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>
              Total Points
            </p>
          </div>
          
          <div className={`p-4 rounded-xl ${
            darkMode ? 'bg-green-900/30' : 'bg-green-100/80'
          } backdrop-blur-sm text-center`}>
            <div className="text-2xl font-bold text-green-500">
              {leaderboardData.reduce((sum, user) => sum + user.plantsGrown, 0)}
            </div>
            <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-600'}`}>
              Plants Grown
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default GardenLeaderboard