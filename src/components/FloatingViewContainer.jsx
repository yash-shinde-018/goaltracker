import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shuffle, Grid, Lock, Unlock, ZoomIn, ZoomOut, Maximize, Target } from 'lucide-react'
import DraggableCard from './DraggableCard'

// Debounce utility for performance optimization
const useDebounce = (callback, delay) => {
  const timeoutRef = useRef(null)
  
  return useCallback((...args) => {
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }, [callback, delay])
}

const FloatingViewContainer = ({
  goals,
  onEditGoal,
  onDeleteGoal,
  onUpdateProgress,
  darkMode
}) => {
  const containerRef = useRef(null)
  const viewportRef = useRef(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const [cardPositions, setCardPositions] = useState({})
  const [isLocked, setIsLocked] = useState(false)
  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 })
  const [zoom, setZoom] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isDraggingViewport, setIsDraggingViewport] = useState(false)

  // Memoize container calculations
  const containerDimensions = useMemo(() => {
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth < 1024
    const baseCardWidth = isMobile ? 240 : isTablet ? 260 : 288
    const baseCardHeight = isMobile ? 280 : isTablet ? 300 : 320
    const padding = 100
    const margin = 60
    
    // Calculate optimal grid layout
    const cardCount = goals.length || 1
    const cols = Math.max(2, Math.ceil(Math.sqrt(cardCount * 1.2)))
    const rows = Math.ceil(cardCount / cols)
    
    const containerWidth = Math.max(1200, cols * (baseCardWidth + margin) + padding * 2)
    const containerHeight = Math.max(800, rows * (baseCardHeight + margin) + padding * 2)
    
    return {
      width: containerWidth,
      height: containerHeight,
      baseCardWidth,
      baseCardHeight,
      cols,
      rows,
      margin,
      padding
    }
  }, [goals.length])

  // Load positions from localStorage
  useEffect(() => {
    const savedPositions = localStorage.getItem('goalsetter-floating-positions')
    if (savedPositions) {
      try {
        setCardPositions(JSON.parse(savedPositions))
      } catch (error) {
        console.error('Error loading card positions:', error)
      }
    }
  }, [])

  // Save positions to localStorage with improved debouncing
  useEffect(() => {
    if (Object.keys(cardPositions).length === 0) return
    
    const timeoutId = setTimeout(() => {
      localStorage.setItem('goalsetter-floating-positions', JSON.stringify(cardPositions))
    }, 500) // Longer debounce for localStorage saves
    
    return () => clearTimeout(timeoutId)
  }, [cardPositions])

  // Update container size and constraints
  useEffect(() => {
    const updateSize = () => {
      if (viewportRef.current) {
        const rect = viewportRef.current.getBoundingClientRect()
        
        const newSize = {
          ...containerDimensions,
          viewportWidth: rect.width,
          viewportHeight: rect.height
        }
        
        const newConstraints = {
          left: containerDimensions.padding,
          right: containerDimensions.width - containerDimensions.baseCardWidth - containerDimensions.padding,
          top: containerDimensions.padding,
          bottom: containerDimensions.height - containerDimensions.baseCardHeight - containerDimensions.padding
        }
        
        setContainerSize(newSize)
        setConstraints(newConstraints)
      }
    }

    updateSize()
    const resizeObserver = new ResizeObserver(updateSize)
    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current)
    }
    
    return () => resizeObserver.disconnect()
  }, [containerDimensions])

  // Initialize positions for new goals
  useEffect(() => {
    const newPositions = { ...cardPositions }
    let hasNewPositions = false

    goals.forEach((goal, index) => {
      if (!newPositions[goal.id]) {
        const row = Math.floor(index / containerDimensions.cols)
        const col = index % containerDimensions.cols
        
        newPositions[goal.id] = {
          x: containerDimensions.padding + col * (containerDimensions.baseCardWidth + containerDimensions.margin),
          y: containerDimensions.padding + row * (containerDimensions.baseCardHeight + containerDimensions.margin)
        }
        hasNewPositions = true
      }
    })

    if (hasNewPositions) {
      setCardPositions(newPositions)
    }
  }, [goals, containerDimensions])

  // Optimized position change handler with debouncing
  const debouncedPositionSave = useDebounce((positions) => {
    localStorage.setItem('goalsetter-floating-positions', JSON.stringify(positions))
  }, 200)

  const handlePositionChange = useCallback((goalId, newPosition) => {
    if (isLocked) return
    
    // Clamp position within container bounds
    const clampedPosition = {
      x: Math.max(constraints.left, Math.min(constraints.right, newPosition.x)),
      y: Math.max(constraints.top, Math.min(constraints.bottom, newPosition.y))
    }
    
    setCardPositions(prev => {
      const newPositions = {
        ...prev,
        [goalId]: clampedPosition
      }
      
      // Debounce localStorage saves for better performance
      debouncedPositionSave(newPositions)
      
      return newPositions
    })
  }, [constraints, isLocked, debouncedPositionSave])

  const shuffleCards = useCallback(() => {
    if (isLocked) return
    
    const newPositions = {}
    goals.forEach((goal) => {
      newPositions[goal.id] = {
        x: Math.random() * (constraints.right - constraints.left) + constraints.left,
        y: Math.random() * (constraints.bottom - constraints.top) + constraints.top
      }
    })
    setCardPositions(newPositions)
  }, [isLocked, goals, constraints])

  const resetToGrid = useCallback(() => {
    if (isLocked) return
    
    const newPositions = {}
    goals.forEach((goal, index) => {
      const row = Math.floor(index / containerDimensions.cols)
      const col = index % containerDimensions.cols
      
      newPositions[goal.id] = {
        x: containerDimensions.padding + col * (containerDimensions.baseCardWidth + containerDimensions.margin),
        y: containerDimensions.padding + row * (containerDimensions.baseCardHeight + containerDimensions.margin)
      }
    })
    setCardPositions(newPositions)
  }, [isLocked, goals, containerDimensions])

  // Optimized zoom functions with better calculations
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.2, 2))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.2, 0.3))
  }, [])

  const handleResetZoom = useCallback(() => {
    setZoom(1)
    setPanOffset({ x: 0, y: 0 })
  }, [])

  // Optimized viewport drag handling
  const handleViewportDragEnd = useCallback(() => {
    setIsDraggingViewport(false)
  }, [])

  const handleViewportDragStart = useCallback(() => {
    setIsDraggingViewport(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  }

  // Memoize drag constraints for better performance
  const dragConstraints = useMemo(() => {
    if (!containerSize.viewportWidth || !containerSize.viewportHeight) return { left: 0, right: 0, top: 0, bottom: 0 }
    
    const scaledWidth = containerSize.width * zoom
    const scaledHeight = containerSize.height * zoom
    
    return {
      left: Math.min(0, -(scaledWidth - containerSize.viewportWidth) / 2),
      right: Math.max(0, (scaledWidth - containerSize.viewportWidth) / 2),
      top: Math.min(0, -(scaledHeight - containerSize.viewportHeight) / 2),
      bottom: Math.max(0, (scaledHeight - containerSize.viewportHeight) / 2)
    }
  }, [containerSize.width, containerSize.height, containerSize.viewportWidth, containerSize.viewportHeight, zoom])

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full h-full min-h-screen relative"
    >
      {/* Floating Controls */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-20 right-4 z-40 flex flex-col space-y-2 p-3 rounded-xl backdrop-blur-md ${
          darkMode 
            ? 'bg-gray-800/80 border-gray-700/50' 
            : 'bg-white/80 border-gray-200/50'
        } border shadow-lg`}
      >
        {/* Zoom Controls */}
        <div className="flex space-x-1 border-b border-gray-300/30 pb-2">
          <motion.button
            onClick={handleZoomOut}
            className={`p-1.5 rounded-md transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Zoom Out"
          >
            <ZoomOut className="w-3 h-3" />
          </motion.button>
          
          <div className={`px-2 py-1.5 text-xs font-medium rounded-md ${
            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
          }`}>
            {Math.round(zoom * 100)}%
          </div>
          
          <motion.button
            onClick={handleZoomIn}
            className={`p-1.5 rounded-md transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Zoom In"
          >
            <ZoomIn className="w-3 h-3" />
          </motion.button>
          
          <motion.button
            onClick={handleResetZoom}
            className={`p-1.5 rounded-md transition-colors ${
              darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Reset View"
          >
            <Maximize className="w-3 h-3" />
          </motion.button>
        </div>
        
        <motion.button
          onClick={() => setIsLocked(!isLocked)}
          className={`p-2 sm:p-3 rounded-lg transition-colors ${
            isLocked
              ? 'bg-red-500 text-white'
              : darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={isLocked ? "Unlock cards" : "Lock cards"}
        >
          {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </motion.button>
        
        <motion.button
          onClick={shuffleCards}
          disabled={isLocked}
          className={`p-2 sm:p-3 rounded-lg transition-colors ${
            isLocked
              ? 'opacity-50 cursor-not-allowed'
              : darkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
          whileHover={!isLocked ? { scale: 1.05 } : {}}
          whileTap={!isLocked ? { scale: 0.95 } : {}}
          title="Shuffle cards"
        >
          <Shuffle className="w-4 h-4" />
        </motion.button>
        
        <motion.button
          onClick={resetToGrid}
          disabled={isLocked}
          className={`p-2 sm:p-3 rounded-lg transition-colors ${
            isLocked
              ? 'opacity-50 cursor-not-allowed'
              : darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          whileHover={!isLocked ? { scale: 1.05 } : {}}
          whileTap={!isLocked ? { scale: 0.95 } : {}}
          title="Reset to grid"
        >
          <Grid className="w-4 h-4" />
        </motion.button>
      </motion.div>

      {/* Floating Container with Viewport */}
      <div
        ref={viewportRef}
        className={`relative w-full min-h-screen overflow-hidden ${
          darkMode 
            ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800' 
            : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100'
        }`}
        onWheel={(e) => {
          if (e.ctrlKey) {
            e.preventDefault()
            const delta = e.deltaY > 0 ? -0.1 : 0.1
            setZoom(prev => Math.max(0.3, Math.min(2, prev + delta)))
          }
        }}
      >
        {/* Zoomable and Pannable Container */}
        <motion.div
          ref={containerRef}
          drag
          dragConstraints={dragConstraints}
          dragElastic={0.02}
          dragMomentum={false}
          onDragStart={handleViewportDragStart}
          onDragEnd={handleViewportDragEnd}
          animate={{
            scale: zoom,
            x: panOffset.x,
            y: panOffset.y
          }}
          transition={{ 
            type: "tween", 
            duration: isDraggingViewport ? 0 : 0.3,
            ease: "easeOut"
          }}
          className="relative cursor-grab active:cursor-grabbing origin-center"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            backgroundImage: darkMode
              ? `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`
              : `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.1) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
            willChange: 'transform'
          }}
        >
        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 opacity-30 ${
            darkMode
              ? 'bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20'
              : 'bg-gradient-to-br from-purple-100/40 via-blue-100/40 to-indigo-100/40'
          }`} />
        </div>

        {/* Lock Overlay */}
        <AnimatePresence>
          {isLocked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm z-30 flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className={`p-6 rounded-xl ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-xl border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Lock className="w-6 h-6 text-red-500" />
                  <div>
                    <h3 className="font-semibold">Cards Locked</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Cards are locked in position
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Draggable Cards */}
        <AnimatePresence>
          {goals.map((goal) => {
            const position = cardPositions[goal.id] || { x: 0, y: 0 }
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <DraggableCard
                  goal={goal}
                  onEdit={onEditGoal}
                  onDelete={onDeleteGoal}
                  onUpdateProgress={onUpdateProgress}
                  darkMode={darkMode}
                  position={position}
                  onPositionChange={handlePositionChange}
                  constraints={isLocked ? { left: 0, right: 0, top: 0, bottom: 0 } : constraints}
                  zoom={zoom}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Empty State */}
        {goals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className={`text-center p-8 rounded-2xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/50'
            } backdrop-blur-sm border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Target className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No Goals in Floating View</h3>
              <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Add some goals to see them floating here!
              </p>
            </div>
          </motion.div>
        )}

        {/* Usage Hint */}
        {goals.length > 0 && !isLocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className={`absolute bottom-4 left-4 p-3 rounded-lg ${
              darkMode ? 'bg-gray-800/80' : 'bg-white/80'
            } backdrop-blur-sm border ${
              darkMode ? 'border-gray-700/50' : 'border-gray-200/50'
            } shadow-lg max-w-xs z-20`}
          >
            <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              💡 Drag cards to reposition. Ctrl+Scroll to zoom. Drag background to pan.
            </p>
          </motion.div>
        )}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default FloatingViewContainer