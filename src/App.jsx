import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import TopNavbar from './components/TopNavbar'
import Dashboard from './components/Dashboard'
import GoalModal from './components/GoalModal'
import LandingPage from './components/LandingPage'
import AuthPage from './components/AuthPage'
import AboutPage from './components/AboutPage'
import VirtualGarden from './components/VirtualGarden'
import GardenLeaderboard from './components/GardenLeaderboard'
import UserProfile from './components/UserProfile'
import Footer from './components/Footer'
import { useLocalStorage } from './hooks/useLocalStorage'
import { createCelebration } from './utils/confetti'

const motivationalQuotes = [
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn't just find you. You have to go out and get it.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Dream bigger. Do bigger.",
  "Don't stop when you're tired. Stop when you're done."
]

const initialGoals = [
  {
    id: 1,
    title: "Read 12 Books This Year",
    category: "education",
    currentProgress: 4,
    targetValue: 12,
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Run 100 Miles",
    category: "fitness",
    currentProgress: 25,
    targetValue: 100,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    title: "Save $5000",
    category: "finance",
    currentProgress: 1500,
    targetValue: 5000,
    createdAt: new Date().toISOString()
  }
]

function App() {
  const [goals, setGoals] = useLocalStorage('goalsetter-goals', initialGoals)
  const [darkMode, setDarkMode] = useLocalStorage('goalsetter-darkmode', false)
  const [viewMode, setViewMode] = useLocalStorage('goalsetter-viewmode', 'grid')
  const [user, setUser] = useLocalStorage('goalsetter-user', null)
  const [sunlightPoints] = useLocalStorage('garden-sunlight-points', 0)
  const [streak] = useLocalStorage('garden-streak', 0)
  const [currentPage, setCurrentPage] = useState('home')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [quote, setQuote] = useState('')
  const [dashboardPage, setDashboardPage] = useState(1)
  const [goalsPerPage] = useState(12)

  // Set random quote on mount and refresh
  useEffect(() => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    setQuote(randomQuote)
  }, [])

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const addGoal = (goalData) => {
    const newGoal = {
      id: Date.now(),
      ...goalData,
      createdAt: new Date().toISOString()
    }
    setGoals([...goals, newGoal])
  }

  const updateGoal = (goalId, goalData) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, ...goalData }
        : goal
    ))
    
    // Check if goal was completed and trigger celebration
    const updatedGoal = { ...goals.find(g => g.id === goalId), ...goalData }
    if (updatedGoal.currentProgress >= updatedGoal.targetValue) {
      // Add a small delay to let the progress update show
      setTimeout(() => {
        createCelebration('garden')
      }, 100)
    }
  }

  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId))
  }

  const openEditModal = (goal) => {
    setEditingGoal(goal)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingGoal(null)
  }

  const handleNavigate = (page) => {
    if (page === 'dashboard' && user) {
      setCurrentPage('dashboard')
    } else if (page === 'garden' && user) {
      setCurrentPage('garden')
    } else if (page === 'leaderboard' && user) {
      setCurrentPage('leaderboard')
    } else if (page === 'profile' && user) {
      setCurrentPage('profile')
    } else if (page === 'login' && !user) {
      setCurrentPage('login')
    } else if (page === 'signup' && !user) {
      setCurrentPage('signup')
    } else {
      setCurrentPage(page)
    }
  }

  const handleLogin = (userData) => {
    setUser(userData)
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    setUser(null)
    setCurrentPage('home')
  }

  const handleGetStarted = () => {
    if (user) {
      setCurrentPage('dashboard')
    } else {
      setCurrentPage('login')
    }
  }

  const handleSaveGoal = (goalData) => {
    if (editingGoal) {
      updateGoal(editingGoal.id, goalData)
    } else {
      addGoal(goalData)
    }
    closeModal()
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            darkMode={darkMode}
          />
        )
      case 'about':
        return <AboutPage darkMode={darkMode} />
      case 'login':
        return (
          <AuthPage 
            onLogin={handleLogin}
            darkMode={darkMode}
            isSignup={false}
          />
        )
      case 'signup':
        return (
          <AuthPage 
            onLogin={handleLogin}
            darkMode={darkMode}
            isSignup={true}
          />
        )
      case 'garden':
        return (
          <VirtualGarden 
            goals={goals}
            darkMode={darkMode}
          />
        )
      case 'leaderboard':
        return (
          <GardenLeaderboard 
            userSunlightPoints={sunlightPoints}
            userStreak={streak}
            darkMode={darkMode}
          />
        )
      case 'profile':
        return (
          <UserProfile 
            darkMode={darkMode}
          />
        )
      case 'dashboard':
        return (
          <div className={`min-h-screen transition-colors duration-300 relative overflow-hidden ${
            darkMode 
              ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white' 
              : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 text-gray-900'
          }`}>
            {/* Animated Gradient Background */}
            <div className="animated-gradient fixed inset-0 opacity-5 pointer-events-none" style={{
              background: darkMode 
                ? 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)'
                : 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)'
            }} />
            
            {/* 3D Floating Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {/* Large Floating Orbs */}
              <div className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-40 animate-pulse ${
                darkMode ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-indigo-500'
              }`} style={{
                animation: 'float 8s ease-in-out infinite'
              }} />
              <div className={`absolute top-40 right-20 w-24 h-24 rounded-full blur-2xl opacity-50 ${
                darkMode ? 'bg-gradient-to-br from-purple-500 to-pink-600' : 'bg-gradient-to-br from-purple-400 to-pink-500'
              }`} style={{
                animation: 'float 6s ease-in-out infinite reverse'
              }} />
              <div className={`absolute bottom-32 left-1/4 w-20 h-20 rounded-full blur-xl opacity-45 ${
                darkMode ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : 'bg-gradient-to-br from-cyan-400 to-blue-500'
              }`} style={{
                animation: 'float 10s ease-in-out infinite'
              }} />
              <div className={`absolute top-60 left-1/3 w-28 h-28 rounded-full blur-2xl opacity-35 ${
                darkMode ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-emerald-400 to-teal-500'
              }`} style={{
                animation: 'float 12s ease-in-out infinite reverse'
              }} />
              <div className={`absolute bottom-20 right-1/3 w-18 h-18 rounded-full blur-xl opacity-40 ${
                darkMode ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-gradient-to-br from-orange-400 to-red-500'
              }`} style={{
                animation: 'float 9s ease-in-out infinite'
              }} />
              
              {/* Geometric Shapes */}
              <div className={`absolute top-1/3 right-1/4 w-16 h-16 opacity-25 ${
                darkMode ? 'bg-gradient-to-br from-emerald-500 to-teal-600' : 'bg-gradient-to-br from-emerald-400 to-teal-500'
              }`} style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                animation: 'rotate 15s linear infinite'
              }} />
              <div className={`absolute bottom-1/4 right-10 w-12 h-12 opacity-30 ${
                darkMode ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-gradient-to-br from-orange-400 to-red-500'
              }`} style={{
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                animation: 'rotate 12s linear infinite reverse'
              }} />
              <div className={`absolute top-1/4 left-20 w-14 h-14 opacity-25 ${
                darkMode ? 'bg-gradient-to-br from-violet-500 to-purple-600' : 'bg-gradient-to-br from-violet-400 to-purple-500'
              }`} style={{
                clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                animation: 'rotate 18s linear infinite'
              }} />
              <div className={`absolute bottom-1/3 left-1/2 w-10 h-10 opacity-35 ${
                darkMode ? 'bg-gradient-to-br from-pink-500 to-rose-600' : 'bg-gradient-to-br from-pink-400 to-rose-500'
              }`} style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                animation: 'rotate 14s linear infinite reverse'
              }} />
              
              {/* Floating Lines/Paths */}
              <div className={`absolute top-1/2 left-10 w-40 h-1 opacity-20 ${
                darkMode ? 'bg-gradient-to-r from-blue-500 to-transparent' : 'bg-gradient-to-r from-blue-400 to-transparent'
              }`} style={{
                animation: 'drift 25s linear infinite'
              }} />
              <div className={`absolute bottom-1/2 right-10 w-32 h-1 opacity-25 ${
                darkMode ? 'bg-gradient-to-l from-purple-500 to-transparent' : 'bg-gradient-to-l from-purple-400 to-transparent'
              }`} style={{
                animation: 'drift 20s linear infinite reverse'
              }} />
              
              {/* Small Decorative Dots */}
              <div className={`absolute top-32 right-1/3 w-3 h-3 rounded-full opacity-50 ${
                darkMode ? 'bg-cyan-400' : 'bg-cyan-500'
              }`} style={{
                animation: 'float 7s ease-in-out infinite'
              }} />
              <div className={`absolute bottom-40 left-1/5 w-2 h-2 rounded-full opacity-60 ${
                darkMode ? 'bg-yellow-400' : 'bg-yellow-500'
              }`} style={{
                animation: 'float 11s ease-in-out infinite reverse'
              }} />
              <div className={`absolute top-2/3 right-1/5 w-4 h-4 rounded-full opacity-45 ${
                darkMode ? 'bg-green-400' : 'bg-green-500'
              }`} style={{
                animation: 'float 13s ease-in-out infinite'
              }} />
              
              {/* Grid Pattern Overlay */}
              <div className="absolute inset-0 opacity-15" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, ${darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)'} 1px, transparent 0)`,
                backgroundSize: '40px 40px',
                animation: 'drift 20s linear infinite'
              }} />
              
              {/* Mesh Gradient Overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                background: darkMode
                  ? `conic-gradient(from 45deg, transparent, rgba(59, 130, 246, 0.3), transparent), 
                     conic-gradient(from 225deg, transparent, rgba(168, 85, 247, 0.3), transparent)`
                  : `conic-gradient(from 45deg, transparent, rgba(59, 130, 246, 0.15), transparent), 
                     conic-gradient(from 225deg, transparent, rgba(168, 85, 247, 0.15), transparent)`,
                backgroundSize: '200px 200px',
                animation: 'mesh 30s ease-in-out infinite'
              }} />
            </div>
            
            <div className="relative z-10">
              <main className="container mx-auto px-4 py-8 pt-32">
                <Dashboard 
                  goals={goals}
                  viewMode={viewMode}
                  onEditGoal={openEditModal}
                  onDeleteGoal={deleteGoal}
                  onUpdateProgress={updateGoal}
                  onViewModeChange={setViewMode}
                  darkMode={darkMode}
                />
              </main>

              {/* Floating Add Button */}
              <motion.button
                className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg ${
                  darkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                } text-white flex items-center justify-center text-2xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-xl z-50`}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
              >
                +
              </motion.button>

              <AnimatePresence>
                {isModalOpen && (
                  <GoalModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSave={handleSaveGoal}
                    editingGoal={editingGoal}
                    darkMode={darkMode}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        )
      default:
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            darkMode={darkMode}
          />
        )
    }
  }

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      {/* Top Navigation */}
      <TopNavbar
        isDarkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        currentPage={currentPage}
        onPageChange={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />
      
      {/* Page Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>
      
      {/* Footer - shown on all pages */}
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App