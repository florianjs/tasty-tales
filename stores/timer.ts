import { defineStore } from 'pinia'

interface Timer {
  duration: number
  remainingTime: number
  isRunning: boolean
  interval?: number
}

interface TimerState {
  activeTimers: (Timer | null)[]
  minimizedTimers: boolean[]
  completedSteps: boolean[]
}

export const useTimerStore = defineStore('timer', {
  state: (): TimerState => ({
    activeTimers: [],
    minimizedTimers: [],
    completedSteps: []
  }),

  actions: {
    initializeTimers(count: number) {
      // Only initialize if timers don't exist or length is different
      if (this.activeTimers.length !== count) {
        this.activeTimers = Array(count).fill(null)
        this.minimizedTimers = Array(count).fill(false)
        this.completedSteps = Array(count).fill(false)
      }
    },

    startStepTimer(index: number, minutes: number) {
      if (this.activeTimers[index]) return

      // Request notification permission if not granted
      if (Notification.permission === 'default') {
        Notification.requestPermission()
      }

      const timer: Timer = {
        duration: minutes,
        remainingTime: minutes * 60,
        isRunning: true
      }

      this.activeTimers[index] = timer
      this.startTimer(index)
    },

    startTimer(index: number) {
      const timer = this.activeTimers[index]
      if (!timer) return

      // Clear existing interval if any
      if (timer.interval) {
        clearInterval(timer.interval)
      }

      const interval = window.setInterval(() => {
        const currentTimer = this.activeTimers[index]
        if (!currentTimer || currentTimer.remainingTime <= 0) {
          if (interval) clearInterval(interval)
          
          if (currentTimer && currentTimer.remainingTime <= 0) {
            this.activeTimers[index] = { ...currentTimer, isRunning: false, interval: undefined }
            
            // Play sound
            const audio = new Audio('/bip.wav')
            audio.play()

            // Timer icon as data URL
            const timerIconUrl = 'data:image/svg+xml;base64,' + btoa(`
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            `)

            // Show notification
            if (Notification.permission === 'granted') {
              new Notification('Timer Complete!', {
                body: `Step ${index + 1} timer is complete!`,
                icon: timerIconUrl
              })
            }
          }
          return
        }

        this.activeTimers[index] = { 
          ...currentTimer, 
          remainingTime: currentTimer.remainingTime - 1,
          interval,
          isRunning: true
        }
      }, 1000)

      this.activeTimers[index] = { ...timer, interval, isRunning: true }
    },

    toggleTimer(index: number) {
      const timer = this.activeTimers[index]
      if (!timer) return

      if (timer.isRunning) {
        this.pauseTimer(index)
      } else {
        this.startTimer(index)
      }
    },

    pauseTimer(index: number) {
      const timer = this.activeTimers[index]
      if (!timer) return

      if (timer.interval) {
        clearInterval(timer.interval)
      }

      this.activeTimers[index] = { ...timer, isRunning: false, interval: undefined }
    },

    resetTimer(index: number) {
      const timer = this.activeTimers[index]
      if (!timer) return

      this.pauseTimer(index)
      this.activeTimers[index] = { ...timer, remainingTime: timer.duration * 60 }
    },

    toggleStep(index: number) {
      this.completedSteps[index] = !this.completedSteps[index]
    },

    toggleMinimized(index: number) {
      this.minimizedTimers[index] = !this.minimizedTimers[index]
    },

    minimizeAllTimers() {
      this.minimizedTimers = this.minimizedTimers.map(() => true)
    },

    cleanup() {
      this.activeTimers.forEach((timer, index) => {
        if (timer?.interval) {
          clearInterval(timer.interval)
          this.activeTimers[index] = { ...timer, interval: undefined }
        }
      })
    }
  }
})
