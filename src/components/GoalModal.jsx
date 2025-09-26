import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Save, Sparkles, Dumbbell, Briefcase, GraduationCap, DollarSign } from 'lucide-react'

const categories = [
  { value: 'fitness', label: 'Fitness', icon: <Dumbbell className="w-4 h-4" />, color: 'green' },
  { value: 'work', label: 'Work', icon: <Briefcase className="w-4 h-4" />, color: 'blue' },
  { value: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" />, color: 'purple' },
  { value: 'finance', label: 'Finance', icon: <DollarSign className="w-4 h-4" />, color: 'yellow' },
  { value: 'personal', label: 'Personal Growth', icon: <Sparkles className="w-4 h-4" />, color: 'pink' },
]

const GoalModal = ({ isOpen, onClose, onSave, editingGoal, darkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'personal',
    targetValue: 1,
    currentProgress: 0,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title,
        category: editingGoal.category,
        targetValue: editingGoal.targetValue,
        currentProgress: editingGoal.currentProgress,
      })
    } else {
      setFormData({
        title: '',
        category: 'personal',
        targetValue: 1,
        currentProgress: 0,
      })
    }
    setErrors({})
  }, [editingGoal, isOpen])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Goal title is required'
    }

    if (formData.targetValue <= 0) {
      newErrors.targetValue = 'Target value must be greater than 0'
    }

    if (formData.currentProgress < 0) {
      newErrors.currentProgress = 'Current progress cannot be negative'
    }

    if (formData.currentProgress > formData.targetValue) {
      newErrors.currentProgress = 'Current progress cannot exceed target value'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave({
        ...formData,
        targetValue: parseInt(formData.targetValue),
        currentProgress: parseInt(formData.currentProgress),
      })
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className={`relative w-full max-w-md rounded-2xl shadow-2xl border ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        } overflow-hidden`}
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.3 }}
      >
        {/* Header */}
        <div className={`px-6 py-4 border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold">
                {editingGoal ? 'Edit Goal' : 'Create New Goal'}
              </h2>
            </div>
            <motion.button
              className={`p-2 rounded-lg ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } transition-colors`}
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Goal Title */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Goal Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                errors.title ? 'border-red-500' : ''
              }`}
              placeholder="e.g., Read 12 books this year"
            />
            {errors.title && (
              <motion.p
                className="text-red-500 text-sm mt-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {errors.title}
              </motion.p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className={`block text-sm font-medium mb-3 ${
              darkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Category
            </label>
            <div className="grid grid-cols-1 gap-2">
              {categories.map((category) => (
                <motion.label
                  key={category.value}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                    formData.category === category.value
                      ? darkMode
                        ? 'bg-blue-900/50 border-blue-600'
                        : 'bg-blue-50 border-blue-500'
                      : darkMode
                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="radio"
                    name="category"
                    value={category.value}
                    checked={formData.category === category.value}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="sr-only"
                  />
                  <span className="flex items-center text-lg mr-3">{category.icon}</span>
                  <span className="font-medium">{category.label}</span>
                  {formData.category === category.value && (
                    <motion.div
                      className="ml-auto w-2 h-2 bg-blue-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                  )}
                </motion.label>
              ))}
            </div>
          </div>

          {/* Target Value and Current Progress */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Target Value *
              </label>
              <input
                type="number"
                min="1"
                value={formData.targetValue}
                onChange={(e) => handleInputChange('targetValue', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.targetValue ? 'border-red-500' : ''
                }`}
              />
              {errors.targetValue && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.targetValue}
                </motion.p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                Current Progress
              </label>
              <input
                type="number"
                min="0"
                max={formData.targetValue}
                value={formData.currentProgress}
                onChange={(e) => handleInputChange('currentProgress', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                  errors.currentProgress ? 'border-red-500' : ''
                }`}
              />
              {errors.currentProgress && (
                <motion.p
                  className="text-red-500 text-sm mt-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {errors.currentProgress}
                </motion.p>
              )}
            </div>
          </div>

          {/* Progress Preview */}
          {formData.targetValue > 0 && (
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress Preview</span>
                <span>
                  {Math.round((formData.currentProgress / formData.targetValue) * 100)}%
                </span>
              </div>
              <div className={`w-full h-2 rounded-full ${
                darkMode ? 'bg-gray-600' : 'bg-gray-200'
              }`}>
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min((formData.currentProgress / formData.targetValue) * 100, 100)}%` 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <motion.button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                darkMode 
                  ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg font-medium bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Save className="w-4 h-4" />
              <span>{editingGoal ? 'Update Goal' : 'Create Goal'}</span>
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default GoalModal