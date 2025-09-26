import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid, List, Search, X, Filter, ChevronLeft, ChevronRight, Boxes, Target, CheckCircle2, Rocket, ArrowDown, SearchX, Dumbbell, Briefcase, GraduationCap, DollarSign, Sparkles } from 'lucide-react'
import GoalCard from './GoalCard'
import FloatingViewContainer from './FloatingViewContainer'

const categoryFilters = [
  { value: 'all', label: 'All Goals', icon: <Target className="w-4 h-4" /> },
  { value: 'fitness', label: 'Fitness', icon: <Dumbbell className="w-4 h-4" /> },
  { value: 'work', label: 'Work', icon: <Briefcase className="w-4 h-4" /> },
  { value: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { value: 'finance', label: 'Finance', icon: <DollarSign className="w-4 h-4" /> },
  { value: 'personal', label: 'Personal', icon: <Sparkles className="w-4 h-4" /> },
]

const Dashboard = ({ 
  goals, 
  viewMode, 
  onEditGoal, 
  onDeleteGoal, 
  onUpdateProgress,
  onViewModeChange,
  darkMode 
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const goalsPerPage = 12

  // Filter goals based on search term and category
  const filteredGoals = goals.filter(goal => {
    const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || goal.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredGoals.length / goalsPerPage)
  const indexOfLastGoal = currentPage * goalsPerPage
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage
  const currentGoals = filteredGoals.slice(indexOfFirstGoal, indexOfLastGoal)

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedCategory])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  if (goals.length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[60vh]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`text-center p-8 rounded-2xl ${
          darkMode ? 'bg-gray-800/50' : 'bg-white/50'
        } backdrop-blur-sm border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Target className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No Goals Yet</h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Start your journey by creating your first goal!
          </p>
          <motion.div
            className="inline-block"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowDown className="w-8 h-8 text-blue-500" />
          </motion.div>
        </div>
      </motion.div>
    )
  }

  if (filteredGoals.length === 0 && goals.length > 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[60vh]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={`text-center p-8 rounded-2xl ${
          darkMode ? 'bg-gray-800/50' : 'bg-white/50'
        } backdrop-blur-sm border ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <SearchX className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No Goals Found</h3>
          <p className={`mb-6 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {searchTerm 
              ? `No goals match "${searchTerm}"` 
              : selectedCategory !== 'all'
                ? `No goals in ${selectedCategory} category`
                : 'Try adjusting your filters'
            }
          </p>
          <div className="flex gap-2 justify-center">
            {searchTerm && (
              <motion.button
                onClick={() => setSearchTerm('')}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Search
              </motion.button>
            )}
            {selectedCategory !== 'all' && (
              <motion.button
                onClick={() => setSelectedCategory('all')}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Show All Categories
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Stats Overview */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        <div className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] group ${
          darkMode 
            ? 'bg-gradient-to-br from-blue-800/70 via-indigo-800/50 to-purple-900/70 border-blue-600/60 hover:border-blue-400/70 hover:shadow-blue-400/30' 
            : 'bg-gradient-to-br from-blue-100/95 via-indigo-50/90 to-purple-50/95 border-blue-300/60 hover:border-blue-500/70 hover:shadow-blue-500/30'
        } shadow-xl hover:shadow-2xl`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${darkMode ? 'text-blue-100' : 'text-blue-700'}`}>
                Total Goals
              </p>
              <p className="text-2xl font-bold">{goals.length}</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ring-2 ring-blue-300/20">
              <Target className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] group ${
          darkMode 
            ? 'bg-gradient-to-br from-green-900/60 via-emerald-800/40 to-teal-900/60 border-green-700/50 hover:border-green-500/50' 
            : 'bg-gradient-to-br from-green-50/90 via-white/80 to-emerald-50/90 border-green-200/50 hover:border-green-400/50'
        } shadow-xl hover:shadow-2xl`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-green-200' : 'text-green-600'}`}>
                Completed
              </p>
              <p className="text-2xl font-bold">
                {goals.filter(goal => goal.currentProgress >= goal.targetValue).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
        
        <div className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02] group ${
          darkMode 
            ? 'bg-gradient-to-br from-yellow-900/60 via-amber-800/40 to-orange-900/60 border-yellow-700/50 hover:border-yellow-500/50' 
            : 'bg-gradient-to-br from-yellow-50/90 via-white/80 to-amber-50/90 border-yellow-200/50 hover:border-yellow-400/50'
        } shadow-xl hover:shadow-2xl`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-600'}`}>
                In Progress
              </p>
              <p className="text-2xl font-bold">
                {goals.filter(goal => goal.currentProgress < goal.targetValue && goal.currentProgress > 0).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Rocket className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div 
        variants={itemVariants}
        className="mb-8"
      >
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className={`flex items-center rounded-xl border transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800/50 border-gray-700 focus-within:border-blue-500' 
              : 'bg-white/70 border-gray-200 focus-within:border-blue-500'
          } backdrop-blur-sm`}>
            <Search className={`w-5 h-5 ml-4 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search your goals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-1 px-4 py-3 bg-transparent outline-none ${
                darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
            {searchTerm && (
              <motion.button
                onClick={() => setSearchTerm('')}
                className={`mr-3 p-1 rounded-full transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>

        {/* Filter Toggle and Category Filters */}
        <div className="flex items-center justify-between mb-4">
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-700/50 text-gray-300' 
                : 'bg-white/70 border-gray-200 hover:bg-gray-50 text-gray-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.button>
          
          <div className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {filteredGoals.length} of {goals.length} goals
          </div>
        </div>

        {/* Category Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 p-4 rounded-lg border" style={{
                backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.7)',
                borderColor: darkMode ? 'rgba(75, 85, 99, 1)' : 'rgba(229, 231, 235, 1)'
              }}>
                {categoryFilters.map((filter) => (
                  <motion.button
                    key={filter.value}
                    onClick={() => setSelectedCategory(filter.value)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === filter.value
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : darkMode
                          ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">{filter.icon}</span>
                    <span>{filter.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* View Toggle and Goals Header */}
      <motion.div 
        variants={itemVariants}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold">Your Goals</h2>
        <div className={`flex rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-hidden`}>
          <motion.button
            onClick={() => onViewModeChange('grid')}
            className={`p-3 transition-colors ${
              viewMode === 'grid'
                ? darkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Grid View"
          >
            <Grid size={18} />
          </motion.button>
          <motion.button
            onClick={() => onViewModeChange('list')}
            className={`p-3 transition-colors ${
              viewMode === 'list'
                ? darkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="List View"
          >
            <List size={18} />
          </motion.button>
          <motion.button
            onClick={() => onViewModeChange('floating')}
            className={`p-3 transition-colors ${
              viewMode === 'floating'
                ? darkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Floating View"
          >
            <Boxes size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Goals Grid/List/Floating */}
      <AnimatePresence mode="wait">
        {viewMode === 'floating' ? (
          <FloatingViewContainer
            key="floating"
            goals={filteredGoals}
            onEditGoal={onEditGoal}
            onDeleteGoal={onDeleteGoal}
            onUpdateProgress={onUpdateProgress}
            darkMode={darkMode}
          />
        ) : (
          <motion.div
            key={viewMode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
                : 'space-y-4'
            }
          >
            {currentGoals.map((goal) => (
              <motion.div
                key={goal.id}
                variants={itemVariants}
                layout
              >
                <GoalCard
                  goal={goal}
                  viewMode={viewMode}
                  onEdit={onEditGoal}
                  onDelete={onDeleteGoal}
                  onUpdateProgress={onUpdateProgress}
                  darkMode={darkMode}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {totalPages > 1 && viewMode !== 'floating' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center mt-8 space-x-2"
        >
          {/* Previous Button */}
          <motion.button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
              currentPage === 1
                ? darkMode
                  ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : darkMode
                  ? 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/70 hover:text-white'
                  : 'bg-white/70 text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            } border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
            whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
            whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </motion.button>

          {/* Page Numbers */}
          <div className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1
              const isCurrentPage = pageNumber === currentPage
              
              // Show first page, last page, current page, and pages around current
              const showPage = pageNumber === 1 || 
                             pageNumber === totalPages || 
                             Math.abs(pageNumber - currentPage) <= 1
              
              if (!showPage) {
                // Show ellipsis for gaps
                if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                  return (
                    <span key={pageNumber} className={`px-2 py-2 text-sm ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      ...
                    </span>
                  )
                }
                return null
              }
              
              return (
                <motion.button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isCurrentPage
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : darkMode
                        ? 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/70 hover:text-white'
                        : 'bg-white/70 text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  } border ${
                    darkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}
                  whileHover={!isCurrentPage ? { scale: 1.05 } : {}}
                  whileTap={!isCurrentPage ? { scale: 0.95 } : {}}
                >
                  {pageNumber}
                </motion.button>
              )
            })}
          </div>

          {/* Next Button */}
          <motion.button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 ${
              currentPage === totalPages
                ? darkMode
                  ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : darkMode
                  ? 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/70 hover:text-white'
                  : 'bg-white/70 text-gray-600 hover:bg-gray-50 hover:text-gray-800'
            } border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
            whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
            whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </motion.button>
        </motion.div>
      )}

      {/* Pagination Info */}
      {totalPages > 1 && viewMode !== 'floating' && (
        <div className={`text-center mt-4 text-sm ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Showing {indexOfFirstGoal + 1}-{Math.min(indexOfLastGoal, filteredGoals.length)} of {filteredGoals.length} goals
        </div>
      )}
    </motion.div>
  )
}

export default Dashboard