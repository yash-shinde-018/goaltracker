import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Trophy,
  Star,
  Play,
  ChevronDown,
  User,
  Dumbbell,
  GraduationCap
} from 'lucide-react'

const LandingPage = ({ onGetStarted, darkMode }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState({})

  const features = [
    {
      icon: Target,
      title: "Set Clear Goals",
      description: "Define your objectives with precision and track your progress with beautiful circular indicators.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Visualize your journey with real-time progress tracking and motivational celebrations.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Zap,
      title: "Stay Motivated",
      description: "Get inspired with daily quotes and celebrate every milestone with confetti animations.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Trophy,
      title: "Achieve Success",
      description: "Turn your dreams into reality with our intuitive goal management system.",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: <User className="w-12 h-12 text-blue-500" />,
      quote: "GoalSetter transformed how I approach my personal and professional goals. The visual progress tracking keeps me motivated every day!"
    },
    {
      name: "Mike Chen",
      role: "Fitness Enthusiast",
      avatar: <Dumbbell className="w-12 h-12 text-green-500" />,
      quote: "I've tried many goal-tracking apps, but none made it as engaging and fun as GoalSetter. The celebrations are addictive!"
    },
    {
      name: "Emily Rodriguez",
      role: "Student",
      avatar: <GraduationCap className="w-12 h-12 text-purple-500" />,
      quote: "Perfect for tracking my study goals and reading challenges. The categories and progress circles make everything so clear."
    }
  ]

  const stats = [
    { number: "10K+", label: "Goals Achieved" },
    { number: "5K+", label: "Happy Users" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9★", label: "User Rating" }
  ]

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-animate]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="animated-gradient opacity-20" />
        {/* Floating Shapes */}
        <motion.div
          className={`absolute w-20 h-20 rounded-full ${
            darkMode ? 'bg-blue-500/10' : 'bg-blue-200/30'
          }`}
          style={{ left: '10%', top: '20%' }}
          animate={{
            x: [0, 50, 0],
            y: [0, -45, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute w-16 h-16 rounded-full ${
            darkMode ? 'bg-purple-500/10' : 'bg-purple-200/30'
          }`}
          style={{ left: '80%', top: '15%' }}
          animate={{
            x: [0, -40, 0],
            y: [0, 35, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className={`absolute w-24 h-24 rounded-full ${
            darkMode ? 'bg-green-500/10' : 'bg-green-200/30'
          }`}
          style={{ left: '70%', top: '60%' }}
          animate={{
            x: [0, 35, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className={`absolute w-18 h-18 rounded-full ${
            darkMode ? 'bg-pink-500/10' : 'bg-pink-200/30'
          }`}
          style={{ left: '15%', top: '70%' }}
          animate={{
            x: [0, 55, 0],
            y: [0, -25, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        <motion.div
          className={`absolute w-14 h-14 rounded-full ${
            darkMode ? 'bg-yellow-500/10' : 'bg-yellow-200/30'
          }`}
          style={{ left: '50%', top: '80%' }}
          animate={{
            x: [0, -35, 0],
            y: [0, -40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
        <motion.div
          className={`absolute w-22 h-22 rounded-full ${
            darkMode ? 'bg-indigo-500/10' : 'bg-indigo-200/30'
          }`}
          style={{ left: '85%', top: '75%' }}
          animate={{
            x: [0, 25, 0],
            y: [0, -45, 0],
            scale: [1, 1.18, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>



      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          className="max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Badge */}
          <motion.div
            variants={itemVariants}
            className={`inline-flex items-center px-4 py-2 rounded-full mb-8 ${
              darkMode 
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                : 'bg-blue-100 text-blue-700 border border-blue-200'
            }`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">New: Enhanced Celebration Effects!</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Turn Your{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dreams
            </span>
            <br />
            Into{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Reality
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            The most beautiful and engaging way to track your goals. 
            Set objectives, monitor progress, and celebrate every victory with style.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              className={`group px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 flex items-center ${
                darkMode 
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Hero Animation */}
          <motion.div
            variants={itemVariants}
            className="relative max-w-4xl mx-auto"
            animate={floatingAnimation}
          >
            <div className={`relative p-8 rounded-3xl ${
              darkMode ? 'bg-gray-800/50' : 'bg-white/70'
            } backdrop-blur-sm border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            } shadow-2xl`}>
              {/* Mock Goal Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Read 12 Books", progress: 75, category: "education", icon: "📚" },
                  { title: "Run 100 Miles", progress: 45, category: "fitness", icon: "🏃" },
                  { title: "Save $5000", progress: 90, category: "finance", icon: "💰" }
                ].map((goal, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-xl ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-50/50'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">{goal.icon}</span>
                      <span className="text-sm font-medium">{goal.title}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
                      />
                    </div>
                    <div className="text-xs text-right mt-1 opacity-75">
                      {goal.progress}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className={`w-6 h-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section 
        id="stats"
        data-animate
        className="py-20 px-4"
      >
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible.stats ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isVisible.stats ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className={`text-sm md:text-base ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        data-animate
        className="py-20 px-4"
      >
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible.features ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </motion.h2>
            <motion.p
              className={`text-xl max-w-2xl mx-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Powerful features designed to keep you motivated and on track
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                } backdrop-blur-sm border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } hover:shadow-xl transition-all duration-300 group`}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible.features ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials"
        data-animate
        className="py-20 px-4"
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isVisible.testimonials ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.testimonials ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Loved by{' '}
            <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Achievers
            </span>
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              className={`p-8 rounded-2xl ${
                darkMode ? 'bg-gray-800/50' : 'bg-white/70'
              } backdrop-blur-sm border ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } shadow-xl`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">
                {testimonials[currentTestimonial].avatar}
              </div>
              <blockquote className="text-xl md:text-2xl mb-6 italic">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div className="font-semibold text-lg">
                {testimonials[currentTestimonial].name}
              </div>
              <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {testimonials[currentTestimonial].role}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial
                    ? 'bg-blue-500 scale-125'
                    : darkMode 
                      ? 'bg-gray-600 hover:bg-gray-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section 
        id="cta"
        data-animate
        className="py-20 px-4"
      >
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className={`p-12 rounded-3xl ${
            darkMode ? 'bg-gray-800/50' : 'bg-white/70'
          } backdrop-blur-sm border ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          } shadow-2xl relative overflow-hidden`}>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Achieve Your{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Goals?
                </span>
              </h2>
              <p className={`text-xl mb-8 max-w-2xl mx-auto ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Join thousands of achievers who are already using GoalSetter to turn their dreams into reality.
              </p>
              
              <motion.button
                onClick={onGetStarted}
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center mx-auto"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Journey
                <Sparkles className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
              </motion.button>
              
              <p className={`text-sm mt-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                No credit card required • Free forever • Get started in 30 seconds
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

export default LandingPage