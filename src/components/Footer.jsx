import React from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  Youtube,
  ExternalLink,
  Target,
  Sparkles
} from 'lucide-react'

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/goalsetter', color: 'hover:text-blue-500' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/goalsetter', color: 'hover:text-sky-400' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/goalsetter', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/goalsetter', color: 'hover:text-blue-600' },
    { name: 'GitHub', icon: Github, url: 'https://github.com/goalsetter', color: 'hover:text-gray-800 dark:hover:text-gray-200' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/goalsetter', color: 'hover:text-red-500' }
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'My Garden', href: '#garden' },
    { name: 'Leaderboard', href: '#leaderboard' },
    { name: 'Profile', href: '#profile' },
    { name: 'About Us', href: '#about' }
  ]

  const supportLinks = [
    { name: 'Help Center', href: '#help' },
    { name: 'Contact Support', href: '#support' },
    { name: 'Documentation', href: '#docs' },
    { name: 'API Reference', href: '#api' },
    { name: 'Community Forum', href: '#forum' },
    { name: 'Feedback', href: '#feedback' }
  ]

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'GDPR Compliance', href: '#gdpr' },
    { name: 'License', href: '#license' }
  ]

  return (
    <footer className={`relative border-t transition-all duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 border-gray-700/50' 
        : 'bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/30 border-purple-200/50'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${darkMode ? 'rgba(168, 85, 247, 0.3)' : 'rgba(147, 51, 234, 0.2)'} 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${
                  darkMode ? 'text-white' : 'bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent'
                }`}>
                  GoalSetter
                </h3>
              </div>
              <p className={`text-sm mb-3 leading-relaxed text-left ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Gamified goal tracking experience.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-1 text-left">
                <div className="flex items-center space-x-2">
                  <Mail className={`w-3 h-3 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                  <a href="mailto:hello@goalsetter.app" className={`text-xs transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-purple-400' : 'text-gray-500 hover:text-purple-600'
                  }`}>
                    hello@goalsetter.app
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className={`text-sm font-semibold mb-2 text-left ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Links
              </h4>
              <ul className="space-y-0.5 text-left">
                {quickLinks.slice(0, 4).map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={`text-xs transition-colors duration-200 block py-0.5 ${
                        darkMode 
                          ? 'text-gray-400 hover:text-purple-400' 
                          : 'text-gray-500 hover:text-purple-600'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className={`text-sm font-semibold mb-2 text-left ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Support
              </h4>
              <ul className="space-y-0.5 text-left">
                {supportLinks.slice(0, 3).map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={`text-xs transition-colors duration-200 block py-0.5 ${
                        darkMode 
                          ? 'text-gray-400 hover:text-purple-400' 
                          : 'text-gray-500 hover:text-purple-600'
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div>
                <h4 className={`text-sm font-semibold mb-2 text-left ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Connect
                </h4>
                <div className="flex space-x-2 mb-3 justify-start">
                  {socialLinks.slice(0, 4).map((social, index) => {
                    const Icon = social.icon
                    return (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-1.5 rounded transition-all duration-200 ${
                          darkMode 
                            ? 'bg-gray-800 hover:bg-gray-700 text-gray-400' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        } ${social.color}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-3 h-3" />
                      </motion.a>
                    )
                  })}
                </div>
                
                {/* Newsletter */}
                <div className="flex justify-start">
                  <input
                    type="email"
                    placeholder="Email"
                    className={`flex-1 px-2 py-1 text-xs rounded-l border transition-colors ${
                      darkMode 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-500' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:outline-none`}
                  />
                  <button className="px-2 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-xs rounded-r hover:from-purple-600 hover:to-indigo-700 transition-all duration-200">
                    <Mail className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className={`mt-4 pt-3 border-t ${darkMode ? 'border-gray-700/50' : 'border-purple-200/50'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
              <p className={`text-xs flex items-center ${
                darkMode ? 'text-gray-500' : 'text-gray-500'
              }`}>
                © {currentYear} GoalSetter
                <Heart className="w-3 h-3 text-red-500 mx-1" />
              </p>
              <div className="flex items-center space-x-3">
                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  v1.2.0
                </span>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer