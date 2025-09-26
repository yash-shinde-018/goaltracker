import { motion } from 'framer-motion'
import { 
  Target, 
  Users, 
  Heart, 
  Award, 
  Zap, 
  TrendingUp,
  Github,
  Twitter,
  Linkedin,
  Mail,
  User,
  Code,
  GraduationCap
} from 'lucide-react'

const AboutPage = ({ darkMode }) => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Product Designer",
      avatar: <User className="w-8 h-8 text-blue-500" />,
      bio: "Passionate about creating intuitive user experiences that motivate and inspire.",
      social: { twitter: "@sarahj", linkedin: "sarah-johnson", github: "sarahj" }
    },
    {
      name: "Saurabh Sawant",
      role: "Full Stack Developer", 
      avatar: <Code className="w-8 h-8 text-green-500" />,
      bio: "Loves building scalable applications that help people achieve their dreams.",
      social: { twitter: "@mikechen", linkedin: "mike-chen", github: "mikechen" }
    },
    {
      name: "Yash Shinde",
      role: "UX Researcher",
      avatar: <GraduationCap className="w-8 h-8 text-purple-500" />, 
      bio: "Data-driven design enthusiast focused on understanding user behavior and needs.",
      social: { twitter: "@emilyux", linkedin: "emily-rodriguez", github: "emilyux" }
    }
  ]

  const values = [
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "We believe in the power of clear, achievable goals to transform lives.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Every feature is designed with our users' success and happiness in mind.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We constantly push boundaries to create the most engaging experience.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every detail, from design to functionality.",
      color: "from-purple-500 to-indigo-500"
    }
  ]

  const stats = [
    { number: "10,000+", label: "Goals Achieved", icon: Target },
    { number: "5,000+", label: "Active Users", icon: Users },
    { number: "95%", label: "Success Rate", icon: TrendingUp },
    { number: "4.9★", label: "User Rating", icon: Award }
  ]

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

  return (
    <div className={`min-h-screen pt-24 px-4 ${
      darkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="animated-gradient opacity-10" />
      </div>

      <motion.div
        className="relative z-10 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              GoalSetter
            </span>
          </h1>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Empowering dreamers worldwide to turn their aspirations into achievements 
            through beautiful, engaging goal tracking.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          className={`p-8 md:p-12 rounded-3xl mb-20 ${
            darkMode ? 'bg-gray-800/50' : 'bg-white/70'
          } backdrop-blur-sm border ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          } shadow-xl`}
          variants={itemVariants}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
          </div>
          <p className={`text-lg md:text-xl text-center max-w-4xl mx-auto leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We believe that everyone has the potential to achieve extraordinary things. 
            GoalSetter was born from the idea that the right tools, combined with beautiful 
            design and motivational features, can make the difference between dreaming and achieving. 
            Our platform transforms goal setting from a chore into an exciting, rewarding journey.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className={`text-center p-6 rounded-2xl ${
                darkMode ? 'bg-gray-800/50' : 'bg-white/70'
              } backdrop-blur-sm border ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              } shadow-lg`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className={`text-sm md:text-base ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Values Section */}
        <motion.div className="mb-20" variants={itemVariants}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-2xl ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                } backdrop-blur-sm border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-4`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div className="mb-20" variants={itemVariants}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              The passionate people behind GoalSetter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-2xl ${
                  darkMode ? 'bg-gray-800/50' : 'bg-white/70'
                } backdrop-blur-sm border ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } shadow-lg hover:shadow-xl transition-all duration-300`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className={`text-sm mb-3 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  {member.role}
                </p>
                <p className={`text-sm mb-4 ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {member.bio}
                </p>
                
                <div className="flex justify-center space-x-3">
                  <motion.button
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Twitter className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className={`p-2 rounded-lg transition-colors ${
                      darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div 
          className={`text-center p-8 md:p-12 rounded-3xl ${
            darkMode ? 'bg-gray-800/50' : 'bg-white/70'
          } backdrop-blur-sm border ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          } shadow-xl mb-20`}
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <p className={`text-lg mb-6 max-w-2xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have questions, feedback, or just want to say hello? We'd love to hear from you!
          </p>
          
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Us
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutPage