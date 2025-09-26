import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Edit3, Save, X, Trophy, Star, Flame, Award, Crown, Camera, Palette, Settings, Check, Mail, Trash2, AlertTriangle } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const UserProfile = ({ darkMode }) => {
  const [currentUser, setCurrentUser] = useLocalStorage('goalsetter-user', {
    name: 'Guest User',
    email: 'guest@example.com',
    avatar: '👤',
    joinDate: new Date().toISOString(),
    bio: 'Passionate goal achiever 🌟',
    theme: 'purple'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editForm, setEditForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    avatar: currentUser.avatar,
    bio: currentUser.bio,
    theme: currentUser.theme
  })

  // Available avatar emojis
  const avatarOptions = [
    '👤', '🧑‍💼', '👨‍💻', '👩‍💻', '🧑‍🎨', '👨‍🏫', '👩‍🔬', '🧑‍🚀', '👨‍🌾', '👩‍🍳',
    '🌟', '🌸', '🌱', '🌺', '🌻', '🌷', '🌿', '🍀', '🌾', '🎋',
    '🦄', '🐨', '🐼', '🦊', '🐱', '🐶', '🐸', '🦋', '🐝', '🐢',
    '⭐', '✨', '🎯', '🏆', '👑', '💎', '🔥', '⚡', '🌈', '🎨'
  ]

  // Theme color options
  const themeOptions = [
    { id: 'purple', name: 'Purple Magic', colors: 'from-purple-500 to-indigo-600' },
    { id: 'blue', name: 'Ocean Blue', colors: 'from-blue-500 to-cyan-600' },
    { id: 'green', name: 'Nature Green', colors: 'from-green-500 to-emerald-600' },
    { id: 'pink', name: 'Sunset Pink', colors: 'from-pink-500 to-rose-600' },
    { id: 'orange', name: 'Fire Orange', colors: 'from-orange-500 to-red-600' },
    { id: 'teal', name: 'Mystic Teal', colors: 'from-teal-500 to-blue-600' }
  ]

  const handleSave = () => {
    setCurrentUser({
      ...currentUser,
      ...editForm,
      lastUpdated: new Date().toISOString()
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditForm({
      name: currentUser.name,
      email: currentUser.email,
      avatar: currentUser.avatar,
      bio: currentUser.bio,
      theme: currentUser.theme
    })
    setIsEditing(false)
  }

  const handleDeleteAccount = () => {
    // Clear user data from localStorage
    localStorage.removeItem('goalsetter-user')
    localStorage.removeItem('goalsetter-goals')
    localStorage.removeItem('goalsetter-sunlight-points')
    localStorage.removeItem('goalsetter-streak')
    
    // Reset to default state
    setCurrentUser({
      name: 'Guest User',
      email: 'guest@example.com',
      avatar: '👤',
      joinDate: new Date().toISOString(),
      bio: 'Passionate goal achiever 🌟',
      theme: 'purple'
    })
    
    setShowDeleteConfirm(false)
    alert('Account deleted successfully!')
  }

  const formatJoinDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-800 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute text-2xl opacity-10 ${
              darkMode ? 'text-purple-300' : 'text-purple-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['⚙️', '🎯', '✨', '🌟', '👤', '🏆'][i]}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 p-6 pt-24">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${
            darkMode 
              ? 'from-purple-800/80 to-indigo-800/80 border-purple-700/50' 
              : 'from-white/80 to-purple-50/80 border-purple-200/50'
          } backdrop-blur-md rounded-2xl p-8 mb-8 border max-w-4xl mx-auto`}
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-indigo-600 rounded-xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'}`}>
                  User Profile
                </h1>
                <p className={`text-sm ${darkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                  Customize your garden identity
                </p>
              </div>
            </div>
            
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isEditing 
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              <span className="text-sm font-medium">{isEditing ? 'Cancel' : 'Edit Profile'}</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Profile Content */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-2 bg-gradient-to-br ${
              darkMode 
                ? 'from-purple-800/60 to-indigo-800/60 border-purple-600/50' 
                : 'from-white/70 to-purple-50/70 border-purple-200/50'
            } backdrop-blur-md rounded-2xl border p-8`}
          >
            <div className="flex flex-col items-center text-center mb-8">
              {/* Avatar Section */}
              <div className="relative mb-6">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${
                  themeOptions.find(t => t.id === (isEditing ? editForm.theme : currentUser.theme))?.colors || 'from-purple-500 to-indigo-600'
                } flex items-center justify-center text-6xl shadow-2xl`}>
                  {isEditing ? editForm.avatar : currentUser.avatar}
                </div>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-purple-600 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                  </motion.div>
                )}
              </div>

              {/* Name Section */}
              {isEditing ? (
                <motion.input
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className={`text-3xl font-bold text-center bg-transparent border-b-2 ${
                    darkMode ? 'border-purple-400 text-white' : 'border-purple-500 text-purple-800'
                  } focus:outline-none focus:border-purple-600 mb-4 max-w-xs`}
                  placeholder="Your Name"
                />
              ) : (
                <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-purple-800'}`}>
                  {currentUser.name}
                </h2>
              )}

              {/* Email Section */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                  Email Address
                </label>
                {isEditing ? (
                  <motion.input
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 ${
                      darkMode ? 'border-purple-400 text-white' : 'border-purple-300 text-purple-800'
                    } focus:outline-none focus:border-purple-600`}
                    placeholder="your.email@example.com"
                  />
                ) : (
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 ${
                    darkMode ? 'border-purple-600/30 text-purple-200' : 'border-purple-200 text-purple-600'
                  }`}>
                    <Mail className="w-4 h-4" />
                    <span>{currentUser.email}</span>
                  </div>
                )}
              </div>

              {/* Bio Section */}
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>
                  Bio
                </label>
                {isEditing ? (
                  <motion.textarea
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    className={`w-full px-4 py-3 rounded-lg bg-transparent border-2 ${
                      darkMode ? 'border-purple-400 text-purple-200' : 'border-purple-300 text-purple-600'
                    } focus:outline-none focus:border-purple-600 resize-none`}
                    placeholder="Tell us about yourself..."
                    rows={3}
                  />
                ) : (
                  <p className={`px-4 py-3 rounded-lg border-2 ${
                    darkMode ? 'border-purple-600/30 text-purple-200' : 'border-purple-200 text-purple-600'
                  }`}>
                    {currentUser.bio}
                  </p>
                )}
              </div>

              <div className={`mt-4 text-sm ${darkMode ? 'text-purple-300' : 'text-purple-500'}`}>
                Joined {formatJoinDate(currentUser.joinDate)}
              </div>
            </div>

            {/* Avatar Selection */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8"
                >
                  <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-purple-800'} flex items-center gap-2`}>
                    <Palette className="w-5 h-5" />
                    Choose Your Avatar
                  </h3>
                  <div className="grid grid-cols-8 md:grid-cols-10 gap-3">
                    {avatarOptions.map((emoji, index) => (
                      <motion.button
                        key={index}
                        onClick={() => setEditForm({...editForm, avatar: emoji})}
                        className={`w-12 h-12 rounded-lg text-2xl flex items-center justify-center transition-all duration-200 ${
                          editForm.avatar === emoji
                            ? 'bg-purple-500 scale-110 shadow-lg'
                            : darkMode 
                              ? 'bg-purple-800/50 hover:bg-purple-700/50 hover:scale-105'
                              : 'bg-purple-100 hover:bg-purple-200 hover:scale-105'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Theme Selection */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8"
                >
                  <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-purple-800'} flex items-center gap-2`}>
                    <Settings className="w-5 h-5" />
                    Profile Theme
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {themeOptions.map((theme) => (
                      <motion.button
                        key={theme.id}
                        onClick={() => setEditForm({...editForm, theme: theme.id})}
                        className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
                          editForm.theme === theme.id
                            ? darkMode ? 'bg-purple-700/50 border-2 border-purple-400' : 'bg-purple-100 border-2 border-purple-500'
                            : darkMode ? 'bg-purple-800/30 hover:bg-purple-700/40' : 'bg-white/50 hover:bg-purple-50'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.colors}`}></div>
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-purple-800'}`}>
                          {theme.name}
                        </span>
                        {editForm.theme === theme.id && (
                          <Check className="w-5 h-5 text-purple-500 ml-auto" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Save/Cancel Buttons */}
            <AnimatePresence>
              {isEditing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex justify-center space-x-4 mb-8"
                >
                  <motion.button
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Save className="w-5 h-5" />
                    <span className="font-medium">Save Changes</span>
                  </motion.button>
                  <motion.button
                    onClick={handleCancel}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                    <span className="font-medium">Cancel</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Danger Zone */}
            <div className={`border-t-2 pt-8 ${
              darkMode ? 'border-red-800/30' : 'border-red-200'
            }`}>
              <h3 className={`text-lg font-bold mb-4 text-red-500 flex items-center gap-2`}>
                <AlertTriangle className="w-5 h-5" />
                Danger Zone
              </h3>
              <p className={`text-sm mb-4 ${
                darkMode ? 'text-red-300' : 'text-red-600'
              }`}>
                Deleting your account will permanently remove all your data including goals, progress, and achievements. This action cannot be undone.
              </p>
              <motion.button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trash2 className="w-4 h-4" />
                <span className="font-medium">Delete Account</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Stats Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className={`bg-gradient-to-br ${
              darkMode 
                ? 'from-purple-800/60 to-indigo-800/60 border-purple-600/50' 
                : 'from-white/70 to-purple-50/70 border-purple-200/50'
            } backdrop-blur-md rounded-2xl border p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-purple-800'} flex items-center gap-2`}>
                <Trophy className="w-5 h-5 text-yellow-500" />
                Garden Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                    Sunlight Points
                  </span>
                  <span className="font-bold text-yellow-500">125</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                    Current Streak
                  </span>
                  <span className="font-bold text-orange-500">7 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                    Goals Completed
                  </span>
                  <span className="font-bold text-green-500">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-sm ${darkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                    Garden Level
                  </span>
                  <span className="font-bold text-blue-500">3</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className={`bg-gradient-to-br ${
              darkMode 
                ? 'from-purple-800/60 to-indigo-800/60 border-purple-600/50' 
                : 'from-white/70 to-purple-50/70 border-purple-200/50'
            } backdrop-blur-md rounded-2xl border p-6`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-purple-800'} flex items-center gap-2`}>
                <Award className="w-5 h-5 text-purple-500" />
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-purple-800'}`}>
                      First Goal
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-purple-300' : 'text-purple-500'}`}>
                      Completed your first goal
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Flame className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-purple-800'}`}>
                      Streak Master
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-purple-300' : 'text-purple-500'}`}>
                      7 day streak achieved
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-purple-800'}`}>
                      Garden Enthusiast
                    </p>
                    <p className={`text-xs ${darkMode ? 'text-purple-300' : 'text-purple-500'}`}>
                      Planted 10 goals
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`bg-gradient-to-br ${
                darkMode 
                  ? 'from-red-900/90 to-red-800/90 border-red-700/50' 
                  : 'from-white/95 to-red-50/95 border-red-200/50'
              } backdrop-blur-md rounded-2xl border p-8 max-w-md w-full mx-4`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-red-800'
                }`}>
                  Delete Account?
                </h3>
                <p className={`mb-6 ${
                  darkMode ? 'text-red-200' : 'text-red-600'
                }`}>
                  Are you absolutely sure? This will permanently delete your account, all your goals, progress, and achievements. This action cannot be undone.
                </p>
                <div className="flex space-x-4">
                  <motion.button
                    onClick={handleDeleteAccount}
                    className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="font-medium">Yes, Delete</span>
                  </motion.button>
                  <motion.button
                    onClick={() => setShowDeleteConfirm(false)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                    <span className="font-medium">Cancel</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserProfile