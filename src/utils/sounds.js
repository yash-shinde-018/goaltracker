// Success sound utility using Web Audio API
export const playSuccessSound = () => {
  try {
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Create a success chord progression
    const playNote = (frequency, startTime, duration, volume = 0.1) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01)
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration)
      
      oscillator.start(startTime)
      oscillator.stop(startTime + duration)
    }
    
    const now = audioContext.currentTime
    
    // Play a pleasant success chord (C Major)
    playNote(523.25, now, 0.5, 0.08) // C5
    playNote(659.25, now + 0.1, 0.4, 0.06) // E5
    playNote(783.99, now + 0.2, 0.3, 0.04) // G5
    
  } catch (error) {
    console.log('Audio not supported or blocked by browser policy')
  }
}