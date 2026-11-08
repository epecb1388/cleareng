import { useState, useEffect } from 'react'
import Header from './components/Header'
import LessonMap from './components/LessonMap'
import LessonRunner from './components/LessonRunner'
import CompletionScreen from './components/CompletionScreen'
import ProfileView from './components/ProfileView'
import ProSubscriptionView from './components/ProSubscriptionView'
import BottomNavBar from './components/BottomNavBar'
import { useGameState } from './hooks/useGameState'
import lessonsData from './data/lessons.json'
import { RefreshCw } from 'lucide-react'

const VIEW = {
  MAIN: 'main',
  LESSON: 'lesson',
  COMPLETE: 'complete',
}

export default function App() {
  const {
    state,
    theme,
    isDark,
    toggleTheme,
    loseLife,
    refillLives,
    activatePro,
    completeLesson,
    resetProgress,
    overallAccuracy,
    todayCompleted,
  } = useGameState()

  const [view, setView] = useState(VIEW.MAIN)
  const [activeTab, setActiveTab] = useState('learn') // 'learn' | 'profile' | 'pro'
  const [activeLesson, setActiveLesson] = useState(null)
  const [lastCompletionStats, setLastCompletionStats] = useState({
    earnedXP: 0,
    mistakeCount: 0,
    accuracy: 100,
  })
  const [showNoLivesModal, setShowNoLivesModal] = useState(false)

  // Official Telegram WebApp initialization and full screen expansion
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      try {
        tg.ready?.()
        tg.expand?.()
      } catch (e) {
        console.warn('Telegram WebApp expansion notice:', e)
      }
    }
  }, [])

  // Sync Telegram WebApp top bar color with current theme
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg?.setHeaderColor) {
      try {
        tg.setHeaderColor(isDark ? '#0f172a' : '#ffffff')
        tg.setBackgroundColor?.(isDark ? '#020617' : '#f8fafc')
      } catch {}
    }
  }, [isDark])

  // Start lesson with 0 lives check (unless PRO)
  const handleSelectLesson = (dayId) => {
    if (state.lives <= 0 && !state.isPro) {
      setShowNoLivesModal(true)
      return
    }

    const lesson = lessonsData.find(l => l.id === dayId)
    if (!lesson) return
    setActiveLesson(lesson)
    setView(VIEW.LESSON)
  }

  // Complete lesson with clean mistake tracking & accurate stats
  const handleLessonComplete = ({ mistakeCount, totalAttempts, accuracy }) => {
    const gained = completeLesson(
      activeLesson.id,
      activeLesson.xpReward,
      mistakeCount,
      totalAttempts
    )
    setLastCompletionStats({
      earnedXP: gained,
      mistakeCount,
      accuracy,
    })
    setView(VIEW.COMPLETE)
  }

  const handleBackToMap = () => {
    setActiveLesson(null)
    setView(VIEW.MAIN)
    setActiveTab('learn')
  }

  const handleRefillLivesAndDismiss = () => {
    refillLives()
    setShowNoLivesModal(false)
  }

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen ${isDark ? 'bg-slate-950' : 'bg-slate-100'} flex justify-center items-stretch sm:py-6 sm:px-4 transition-colors duration-200`}>
      {/* Mobile container with responsive borders and dark-mode styling */}
      <main className={`w-full max-w-md ${isDark ? 'bg-slate-900 text-slate-100 border-slate-800' : 'bg-white text-slate-900 border-slate-200'} sm:rounded-3xl shadow-2xl relative min-h-screen sm:min-h-[92vh] flex flex-col overflow-x-hidden border transition-colors duration-200`}>

        {/* 1. Main Hub: Navigation with Tabs */}
        {view === VIEW.MAIN && (
          <div className={`flex flex-col h-full ${isDark ? 'bg-slate-900' : 'bg-slate-50'} transition-colors flex-1 relative`}>
            {/* Top Stats Header */}
            <Header
              streak={state.streak}
              lives={state.lives}
              xp={state.xp}
              isTodayCompleted={todayCompleted}
              isPro={state.isPro}
              theme={theme}
              isDark={isDark}
              onToggleTheme={toggleTheme}
              onRefillLives={() => setShowNoLivesModal(true)}
            />

            {/* Tab 1: Learn Track */}
            {activeTab === 'learn' && (
              <div className="flex-1 overflow-y-auto">
                <LessonMap
                  unlockedDays={state.unlockedDays}
                  completedDays={state.completedDays}
                  onSelectLesson={handleSelectLesson}
                  isDark={isDark}
                />
              </div>
            )}

            {/* Tab 2: Profile Screen */}
            {activeTab === 'profile' && (
              <div className="flex-1 overflow-y-auto">
                <ProfileView
                  state={state}
                  theme={theme}
                  isDark={isDark}
                  overallAccuracy={overallAccuracy}
                  onToggleTheme={toggleTheme}
                  onResetProgress={resetProgress}
                  onOpenProTab={() => setActiveTab('pro')}
                />
              </div>
            )}

            {/* Tab 3: PRO Subscription */}
            {activeTab === 'pro' && (
              <div className="flex-1 overflow-y-auto">
                <ProSubscriptionView
                  isPro={state.isPro}
                  isDark={isDark}
                  onActivatePro={activatePro}
                />
              </div>
            )}

            {/* Fixed Bottom Navigation Bar (Hidden during lesson) */}
            <BottomNavBar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              isPro={state.isPro}
              isDark={isDark}
            />
          </div>
        )}

        {/* 2. Interactive Lesson Screen */}
        {view === VIEW.LESSON && activeLesson && (
          <div className="h-full flex flex-col flex-1">
            <LessonRunner
              lesson={activeLesson}
              lives={state.lives}
              isPro={state.isPro}
              onLoseLife={loseLife}
              onRefillLives={refillLives}
              onComplete={handleLessonComplete}
              onExit={handleBackToMap}
            />
          </div>
        )}

        {/* 3. Completion Victory Screen */}
        {view === VIEW.COMPLETE && activeLesson && (
          <div className="h-full flex flex-col flex-1">
            <CompletionScreen
              lesson={activeLesson}
              earnedXP={lastCompletionStats.earnedXP}
              totalXP={state.xp}
              mistakeCount={lastCompletionStats.mistakeCount}
              accuracy={lastCompletionStats.accuracy}
              onBack={handleBackToMap}
            />
          </div>
        )}

        {/* No Lives Modal on Map view */}
        {showNoLivesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
            <div className={`w-full max-w-xs rounded-3xl p-6 text-center shadow-2xl border animate-pop ${
              isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-900'
            }`}>
              <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl border-2 flex items-center justify-center text-3xl ${
                isDark ? 'bg-rose-950/50 border-rose-800' : 'bg-rose-50 border-rose-200'
              }`}>
                💔
              </div>
              <h3 className="text-xl font-black mb-1">
                {state.lives <= 0 ? 'Закончились жизни!' : 'Восстановление жизней'}
              </h3>
              <p className={`text-xs font-semibold mb-5 leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {state.lives <= 0
                  ? 'У тебя 0 жизней. Чтобы начать новый урок, восстанови запас сердечек!'
                  : `У тебя сейчас ${state.lives} из 5 жизней. Хочешь пополнить до максимума?`}
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={handleRefillLivesAndDismiss}
                  className="btn-primary flex items-center justify-center gap-2 cursor-pointer !py-3"
                >
                  <RefreshCw size={18} />
                  <span>Пополнить до 5 ❤️</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowNoLivesModal(false)}
                  className={`text-xs font-bold py-1 cursor-pointer ${
                    isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
