import { playSuccessSound } from './sounds'

// Enhanced celebration effects utility
export const createCelebration = (type = 'default') => {
  // Play success sound
  playSuccessSound()
  
  // Create different celebration effects based on type
  if (type === 'garden') {
    createGardenCelebration()
  } else if (type === 'achievement') {
    createAchievementCelebration()
  } else {
    // Default celebration
    createConfetti()
    createFireworks()
    createFloatingEmojis()
    createSuccessRipple()
  }
}

// Enhanced confetti with physics
const createConfetti = () => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8']
  const shapes = ['circle', 'square', 'triangle']
  const confettiCount = 80
  const container = document.body

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div')
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    const size = Math.random() * 8 + 6
    
    confetti.style.position = 'fixed'
    confetti.style.width = size + 'px'
    confetti.style.height = size + 'px'
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.pointerEvents = 'none'
    confetti.style.zIndex = '9999'
    confetti.style.borderRadius = shape === 'circle' ? '50%' : '0'
    confetti.style.transform = shape === 'triangle' ? 'rotate(45deg)' : 'none'
    
    // Random starting position from top
    confetti.style.left = Math.random() * window.innerWidth + 'px'
    confetti.style.top = '-10px'
    
    // Add physics-based animation
    const animationDuration = Math.random() * 2000 + 3000
    const horizontalDrift = (Math.random() - 0.5) * 200
    const rotations = Math.random() * 4 + 2
    
    confetti.animate([
      {
        transform: `translateY(0px) translateX(0px) rotate(0deg) scale(1)`,
        opacity: 1
      },
      {
        transform: `translateY(${window.innerHeight + 100}px) translateX(${horizontalDrift}px) rotate(${rotations * 360}deg) scale(0.5)`,
        opacity: 0
      }
    ], {
      duration: animationDuration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay: Math.random() * 1000
    }).addEventListener('finish', () => {
      if (container.contains(confetti)) {
        container.removeChild(confetti)
      }
    })
    
    container.appendChild(confetti)
  }
}

// Fireworks effect
const createFireworks = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D', '#6BCF7F']
  const fireworksCount = 3
  const container = document.body

  for (let i = 0; i < fireworksCount; i++) {
    setTimeout(() => {
      const centerX = Math.random() * (window.innerWidth - 200) + 100
      const centerY = Math.random() * (window.innerHeight - 200) + 100
      
      // Create explosion particles
      for (let j = 0; j < 12; j++) {
        const particle = document.createElement('div')
        const angle = (j / 12) * Math.PI * 2
        const distance = Math.random() * 100 + 50
        const size = Math.random() * 4 + 3
        
        particle.style.position = 'fixed'
        particle.style.width = size + 'px'
        particle.style.height = size + 'px'
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        particle.style.borderRadius = '50%'
        particle.style.left = centerX + 'px'
        particle.style.top = centerY + 'px'
        particle.style.pointerEvents = 'none'
        particle.style.zIndex = '9999'
        particle.style.boxShadow = `0 0 6px ${particle.style.backgroundColor}`
        
        const endX = centerX + Math.cos(angle) * distance
        const endY = centerY + Math.sin(angle) * distance
        
        particle.animate([
          {
            transform: 'translate(0, 0) scale(0)',
            opacity: 1
          },
          {
            transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(1)`,
            opacity: 1,
            offset: 0.7
          },
          {
            transform: `translate(${endX - centerX}px, ${endY - centerY + 50}px) scale(0)`,
            opacity: 0
          }
        ], {
          duration: 1500,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).addEventListener('finish', () => {
          if (container.contains(particle)) {
            container.removeChild(particle)
          }
        })
        
        container.appendChild(particle)
      }
    }, i * 500)
  }
}

// Floating celebration emojis
const createFloatingEmojis = () => {
  const emojis = ['🎉', '✨', '🌟', '💫', '🎊', '🏆', '👏', '🥳']
  const emojiCount = 6
  const container = document.body

  for (let i = 0; i < emojiCount; i++) {
    const emoji = document.createElement('div')
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
    emoji.style.position = 'fixed'
    emoji.style.fontSize = (Math.random() * 20 + 30) + 'px'
    emoji.style.left = Math.random() * (window.innerWidth - 100) + 'px'
    emoji.style.top = window.innerHeight + 'px'
    emoji.style.pointerEvents = 'none'
    emoji.style.zIndex = '9999'
    emoji.style.userSelect = 'none'
    
    const drift = (Math.random() - 0.5) * 100
    
    emoji.animate([
      {
        transform: `translateY(0px) translateX(0px) rotate(0deg) scale(0)`,
        opacity: 0
      },
      {
        transform: `translateY(-${window.innerHeight + 200}px) translateX(${drift}px) rotate(360deg) scale(1)`,
        opacity: 1,
        offset: 0.1
      },
      {
        transform: `translateY(-${window.innerHeight + 400}px) translateX(${drift * 2}px) rotate(720deg) scale(0.5)`,
        opacity: 0
      }
    ], {
      duration: 4000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay: Math.random() * 2000
    }).addEventListener('finish', () => {
      if (container.contains(emoji)) {
        container.removeChild(emoji)
      }
    })
    
    container.appendChild(emoji)
  }
}

// Success ripple effect
const createSuccessRipple = () => {
  const ripple = document.createElement('div')
  ripple.style.position = 'fixed'
  ripple.style.top = '50%'
  ripple.style.left = '50%'
  ripple.style.width = '0px'
  ripple.style.height = '0px'
  ripple.style.borderRadius = '50%'
  ripple.style.border = '3px solid #10B981'
  ripple.style.transform = 'translate(-50%, -50%)'
  ripple.style.pointerEvents = 'none'
  ripple.style.zIndex = '9998'
  ripple.style.opacity = '0.8'
  
  document.body.appendChild(ripple)
  
  ripple.animate([
    {
      width: '0px',
      height: '0px',
      opacity: 0.8
    },
    {
      width: '300px',
      height: '300px',
      opacity: 0.4,
      offset: 0.7
    },
    {
      width: '600px',
      height: '600px',
      opacity: 0
    }
  ], {
    duration: 2000,
    easing: 'ease-out'
  }).addEventListener('finish', () => {
    if (document.body.contains(ripple)) {
      document.body.removeChild(ripple)
    }
  })
}

// Legacy export for backward compatibility
export { createCelebration as createConfetti }

// Garden-specific celebration
const createGardenCelebration = () => {
  const gardenColors = ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#22c55e', '#16a34a']
  const gardenEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🦋', '✨', '🌱', '🍀']
  
  // Garden confetti with nature colors
  createGardenConfetti(gardenColors)
  
  // Floating garden emojis
  createGardenEmojis(gardenEmojis)
  
  // Green ripple effect
  createGardenRipple()
}

// Achievement celebration
const createAchievementCelebration = () => {
  const achievementColors = ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#eab308']
  const achievementEmojis = ['🏆', '⭐', '🎖️', '👑', '💫', '✨', '🎯', '🥇']
  
  // Achievement burst
  createAchievementBurst(achievementColors)
  
  // Achievement emojis
  createGardenEmojis(achievementEmojis)
  
  // Golden ripple
  createAchievementRipple()
}

const createGardenConfetti = (colors) => {
  const shapes = ['circle', 'leaf', 'petal']
  const confettiCount = 60
  const container = document.body

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div')
    const shape = shapes[Math.floor(Math.random() * shapes.length)]
    const size = Math.random() * 6 + 4
    
    confetti.style.position = 'fixed'
    confetti.style.width = size + 'px'
    confetti.style.height = size + 'px'
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.pointerEvents = 'none'
    confetti.style.zIndex = '9999'
    
    if (shape === 'circle') {
      confetti.style.borderRadius = '50%'
    } else if (shape === 'leaf') {
      confetti.style.borderRadius = '0 100% 0 100%'
    } else if (shape === 'petal') {
      confetti.style.borderRadius = '50% 0 50% 0'
    }
    
    confetti.style.left = Math.random() * window.innerWidth + 'px'
    confetti.style.top = '-10px'
    
    const animationDuration = Math.random() * 3000 + 4000
    const horizontalDrift = (Math.random() - 0.5) * 150
    const rotations = Math.random() * 3 + 1
    
    confetti.animate([
      {
        transform: `translateY(0px) translateX(0px) rotate(0deg) scale(1)`,
        opacity: 1
      },
      {
        transform: `translateY(${window.innerHeight + 100}px) translateX(${horizontalDrift}px) rotate(${rotations * 360}deg) scale(0.3)`,
        opacity: 0
      }
    ], {
      duration: animationDuration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay: Math.random() * 1000
    }).addEventListener('finish', () => {
      if (container.contains(confetti)) {
        container.removeChild(confetti)
      }
    })
    
    container.appendChild(confetti)
  }
}

const createGardenEmojis = (emojis) => {
  const emojiCount = 8
  const container = document.body

  for (let i = 0; i < emojiCount; i++) {
    const emoji = document.createElement('div')
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)]
    emoji.style.position = 'fixed'
    emoji.style.fontSize = (Math.random() * 16 + 20) + 'px'
    emoji.style.left = Math.random() * (window.innerWidth - 100) + 'px'
    emoji.style.top = window.innerHeight + 'px'
    emoji.style.pointerEvents = 'none'
    emoji.style.zIndex = '9999'
    emoji.style.userSelect = 'none'
    emoji.style.filter = 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
    
    const drift = (Math.random() - 0.5) * 120
    
    emoji.animate([
      {
        transform: `translateY(0px) translateX(0px) rotate(0deg) scale(0.5)`,
        opacity: 0
      },
      {
        transform: `translateY(-${window.innerHeight + 150}px) translateX(${drift}px) rotate(180deg) scale(1)`,
        opacity: 1,
        offset: 0.2
      },
      {
        transform: `translateY(-${window.innerHeight + 300}px) translateX(${drift * 1.5}px) rotate(360deg) scale(0.7)`,
        opacity: 0
      }
    ], {
      duration: 5000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay: Math.random() * 2000
    }).addEventListener('finish', () => {
      if (container.contains(emoji)) {
        container.removeChild(emoji)
      }
    })
    
    container.appendChild(emoji)
  }
}

const createGardenRipple = () => {
  const ripple = document.createElement('div')
  ripple.style.position = 'fixed'
  ripple.style.top = '50%'
  ripple.style.left = '50%'
  ripple.style.width = '0px'
  ripple.style.height = '0px'
  ripple.style.borderRadius = '50%'
  ripple.style.border = '3px solid #10b981'
  ripple.style.transform = 'translate(-50%, -50%)'
  ripple.style.pointerEvents = 'none'
  ripple.style.zIndex = '9998'
  ripple.style.opacity = '0.8'
  
  document.body.appendChild(ripple)
  
  ripple.animate([
    {
      width: '0px',
      height: '0px',
      opacity: 0.8
    },
    {
      width: '400px',
      height: '400px',
      opacity: 0.3,
      offset: 0.7
    },
    {
      width: '800px',
      height: '800px',
      opacity: 0
    }
  ], {
    duration: 2500,
    easing: 'ease-out'
  }).addEventListener('finish', () => {
    if (document.body.contains(ripple)) {
      document.body.removeChild(ripple)
    }
  })
}

const createAchievementBurst = (colors) => {
  const center = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  }
  
  for (let i = 0; i < 20; i++) {
    const star = document.createElement('div')
    star.textContent = '⭐'
    star.style.position = 'fixed'
    star.style.left = center.x + 'px'
    star.style.top = center.y + 'px'
    star.style.fontSize = (Math.random() * 16 + 20) + 'px'
    star.style.pointerEvents = 'none'
    star.style.zIndex = '9999'
    star.style.color = colors[Math.floor(Math.random() * colors.length)]
    
    const angle = (i / 20) * Math.PI * 2
    const distance = Math.random() * 200 + 100
    const endX = center.x + Math.cos(angle) * distance
    const endY = center.y + Math.sin(angle) * distance
    
    document.body.appendChild(star)
    
    star.animate([
      {
        transform: `translate(-50%, -50%) scale(0) rotate(0deg)`,
        opacity: 0
      },
      {
        transform: `translate(-50%, -50%) scale(1.5) rotate(180deg)`,
        opacity: 1,
        offset: 0.3
      },
      {
        transform: `translate(${endX - center.x}px, ${endY - center.y}px) scale(0.5) rotate(360deg)`,
        opacity: 0
      }
    ], {
      duration: 2500,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay: Math.random() * 500
    }).addEventListener('finish', () => {
      if (document.body.contains(star)) {
        document.body.removeChild(star)
      }
    })
  }
}

const createAchievementRipple = () => {
  const ripple = document.createElement('div')
  ripple.style.position = 'fixed'
  ripple.style.top = '50%'
  ripple.style.left = '50%'
  ripple.style.width = '0px'
  ripple.style.height = '0px'
  ripple.style.borderRadius = '50%'
  ripple.style.border = '3px solid #f59e0b'
  ripple.style.transform = 'translate(-50%, -50%)'
  ripple.style.pointerEvents = 'none'
  ripple.style.zIndex = '9998'
  ripple.style.opacity = '0.9'
  ripple.style.boxShadow = '0 0 20px #f59e0b'
  
  document.body.appendChild(ripple)
  
  ripple.animate([
    {
      width: '0px',
      height: '0px',
      opacity: 0.9
    },
    {
      width: '300px',
      height: '300px',
      opacity: 0.5,
      offset: 0.6
    },
    {
      width: '600px',
      height: '600px',
      opacity: 0
    }
  ], {
    duration: 2000,
    easing: 'ease-out'
  }).addEventListener('finish', () => {
    if (document.body.contains(ripple)) {
      document.body.removeChild(ripple)
    }
  })
}