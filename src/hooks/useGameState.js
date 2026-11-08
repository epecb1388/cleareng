import { useState, useEffect } from 'react'

const STORAGE_KEY = 'english_app_state'
const THEME_KEY = 'english_app_theme'

function getLocalDateString(d = new Date()) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getYesterdayDateString() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return getLocalDateString(d)
}

// Get Telegram user's first name if launched inside Telegram
function getTelegramUserFirstName() {
  try {
    return window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || null
  } catch {
    return null
  }
}

const DEFAULT_STATE = {
  streak: 0,
  lastCompletedDate: null,
  lives: 5,
  xp: 0,
  unlockedDays: [1],
  completedDays: [],
  isPro: false,
  userName: getTelegramUserFirstName() || 'Mark',
  totalAnswers: 0,
  totalMistakes: 0,
}

export function useGameState() {
  // Theme state: 'light' | 'dark'
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY)
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme
      }
      return 'dark'
    } catch {
      return 'dark'
    }
  })

  // Synchronize .dark and data-theme across root elements
  useEffect(() => {
    try {
      localStorage.setItem(THEME_KEY, theme)
      const isDark = theme === 'dark'

      if (isDark) {
        document.documentElement.classList.add('dark')
        document.body.classList.add('dark')
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        document.body.classList.remove('dark')
        document.documentElement.setAttribute('data-theme', 'light')
      }
    } catch {}
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  // Core game state
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const tgName = getTelegramUserFirstName()
      if (!stored) {
        return tgName ? { ...DEFAULT_STATE, userName: tgName } : DEFAULT_STATE
      }

      const parsed = JSON.parse(stored)
      const merged = { ...DEFAULT_STATE, ...parsed }
      if (tgName && (!merged.userName || merged.userName === 'Mark')) {
        merged.userName = tgName
      }

      // Check real-day streak expiration
      if (merged.lastCompletedDate) {
        const today = getLocalDateString()
        const yesterday = getYesterdayDateString()
        if (merged.lastCompletedDate !== today && merged.lastCompletedDate !== yesterday) {
          merged.streak = 0
        }
      } else {
        merged.streak = 0
      }

      return merged
    } catch {
      return DEFAULT_STATE
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {}
  }, [state])

  // Lose 1 life, bottom capped at 0 (unless PRO is active with infinite lives)
  const loseLife = () => {
    let newLives = state.lives
    setState(s => {
      if (s.isPro) return s
      newLives = Math.max(0, s.lives - 1)
      return { ...s, lives: newLives }
    })
    return newLives
  }

  // Refill lives to 5
  const refillLives = () => {
    setState(s => ({ ...s, lives: 5 }))
  }

  // Activate PRO subscription
  const activatePro = () => {
    setState(s => ({ ...s, isPro: true, lives: 5 }))
  }

  // Complete a lesson
  const completeLesson = (dayId, xpReward, lessonMistakes = 0, lessonAttempts = 1) => {
    const today = getLocalDateString()
    const yesterday = getYesterdayDateString()

    let earnedXP = 0

    setState(s => {
      const isAlreadyCompleted = s.completedDays.includes(dayId)

      earnedXP = isAlreadyCompleted ? 0 : xpReward
      const newXP = s.xp + earnedXP

      let newStreak = s.streak
      if (s.lastCompletedDate === today) {
        newStreak = Math.max(1, s.streak)
      } else if (s.lastCompletedDate === yesterday) {
        newStreak = s.streak + 1
      } else {
        newStreak = 1
      }

      const nextCompleted = isAlreadyCompleted ? s.completedDays : [...s.completedDays, dayId]
      const nextUnlocked = s.unlockedDays.includes(dayId + 1)
        ? s.unlockedDays
        : [...s.unlockedDays, dayId + 1]

      return {
        ...s,
        xp: newXP,
        streak: newStreak,
        lastCompletedDate: today,
        completedDays: nextCompleted,
        unlockedDays: nextUnlocked,
        totalAnswers: (s.totalAnswers || 0) + lessonAttempts,
        totalMistakes: (s.totalMistakes || 0) + lessonMistakes,
      }
    })

    return earnedXP
  }

  // Resets progress, XP, streak, and answer statistics,
  // but keeps current lives untouched!
  const resetProgress = () => {
    setState(s => ({
      ...s,
      streak: 0,
      lastCompletedDate: null,
      xp: 0,
      unlockedDays: [1],
      completedDays: [],
      totalAnswers: 0,
      totalMistakes: 0,
      lives: s.lives, // Keep current lives intact!
    }))
  }

  // Overall accuracy
  const total = state.totalAnswers || 0
  const mistakes = state.totalMistakes || 0
  const overallAccuracy = total > 0 ? Math.max(0, Math.round(((total - mistakes) / total) * 100)) : null

  return {
    state,
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    loseLife,
    refillLives,
    activatePro,
    completeLesson,
    resetProgress,
    overallAccuracy,
    todayCompleted: state.lastCompletedDate === getLocalDateString(),
  }
}
