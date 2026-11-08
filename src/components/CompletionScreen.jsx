import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { Star, Trophy, ArrowRight, Sparkles, CheckCircle2, RotateCcw, Target } from 'lucide-react'

export default function CompletionScreen({
  lesson,
  earnedXP,
  totalXP,
  mistakeCount = 0,
  accuracy = 100,
  onBack,
}) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    // Duolingo celebration confetti burst
    const end = Date.now() + 2500
    const colors = ['#10b981', '#6366f1', '#f59e0b', '#ec4899', '#3b82f6']

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.75 },
        colors,
      })
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.75 },
        colors,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()
  }, [])

  const nextDay = lesson.id + 1
  const isFinalLesson = lesson.id >= 14
  const isFirstTime = earnedXP > 0

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-8 text-center bg-gradient-to-b from-white via-indigo-50/30 to-white dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 animate-fade-in select-none transition-colors">
      <div className="w-full flex-1 flex flex-col items-center justify-center max-w-sm mx-auto">
        {/* Animated Trophy badge */}
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 border-4 border-amber-300 shadow-xl flex items-center justify-center animate-pop">
            <span className="text-6xl select-none leading-none">🏆</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white rounded-full p-2 border-2 border-white dark:border-slate-800 shadow-md">
            <CheckCircle2 size={20} strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles size={14} />
          <span>{isFirstTime ? 'Урок впервые пройден!' : 'Урок повторён!'}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
          Отличная работа!
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1 px-4">
          День {lesson.id}: «{lesson.title}»
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 w-full mt-6">
          {/* 1. XP Reward Card */}
          <div className={`p-4 rounded-2xl border-2 text-left shadow-sm ${
            isFirstTime
              ? 'bg-gradient-to-br from-amber-50 to-amber-100/60 dark:from-amber-950/40 dark:to-amber-900/30 border-amber-200 dark:border-amber-800'
              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
          }`}>
            <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 mb-1">
              <Star size={18} className="fill-amber-400 text-amber-500" />
              <span className="text-xs font-black uppercase tracking-wider">Опыт</span>
            </div>
            <p className={`text-2xl font-black tabular-nums ${
              isFirstTime ? 'text-amber-800 dark:text-amber-200' : 'text-slate-600 dark:text-slate-300'
            }`}>
              +{earnedXP} XP
            </p>
            <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
              {isFirstTime ? `Всего: ${totalXP} XP` : 'Урок уже пройден'}
            </p>
          </div>

          {/* 2. Accuracy Card (Real mistake tracking) */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100/60 dark:from-emerald-950/40 dark:to-emerald-900/30 border-2 border-emerald-200 dark:border-emerald-800 text-left shadow-sm">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 mb-1">
              <Target size={18} className="text-emerald-500" />
              <span className="text-xs font-black uppercase tracking-wider">Точность</span>
            </div>
            <p className="text-2xl font-black text-emerald-800 dark:text-emerald-200 tabular-nums">
              {accuracy}%
            </p>
            <p className="text-[11px] font-bold text-emerald-600/90 dark:text-emerald-400 mt-0.5">
              {mistakeCount === 0
                ? 'Без единой ошибки! 🎉'
                : `${mistakeCount} ${mistakeCount === 1 ? 'ошибка разобрана' : mistakeCount < 5 ? 'ошибки разобрано' : 'ошибок разобрано'}`}
            </p>
          </div>
        </div>

        {/* Next step notification */}
        {isFirstTime && !isFinalLesson && (
          <div className="w-full mt-4 p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800 flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xl shrink-0">
              🔓
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-indigo-500 dark:text-indigo-400">Следующий шаг</p>
              <p className="text-sm font-black text-indigo-950 dark:text-indigo-200">День {nextDay} разблокирован на карте!</p>
            </div>
          </div>
        )}

        {!isFirstTime && (
          <div className="w-full mt-4 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-2.5 text-left text-xs text-slate-600 dark:text-slate-400 font-semibold">
            <RotateCcw size={18} className="text-slate-400 shrink-0" />
            <span>Опыт начисляется за первое прохождение дня. Отличная тренировка!</span>
          </div>
        )}

        {isFinalLesson && isFirstTime && (
          <div className="w-full mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-800 flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-xl shrink-0">
              👑
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">Гранд-финал</p>
              <p className="text-sm font-black text-amber-950 dark:text-amber-200">Ты завершил все 14 дней курса!</p>
            </div>
          </div>
        )}
      </div>

      {/* Continue CTA */}
      <div className="w-full max-w-sm mt-6">
        <button
          type="button"
          onClick={onBack}
          className="btn-primary flex items-center justify-center gap-2 text-base shadow-lg cursor-pointer"
        >
          <span>На карту уроков</span>
          <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}
