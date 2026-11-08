import { Lock, Check, Star, Sparkles, Award } from 'lucide-react'
import lessonsData from '../data/lessons.json'

const TOTAL_DAYS = 14

export default function LessonMap({ unlockedDays, completedDays, onSelectLesson, isDark }) {
  // Construct list of 14 days
  const allDays = Array.from({ length: TOTAL_DAYS }, (_, i) => {
    const dayId = i + 1
    const lesson = lessonsData.find(l => l.id === dayId) || null
    const isCompleted = completedDays.includes(dayId)
    const isUnlocked = unlockedDays.includes(dayId)
    const isCurrent = isUnlocked && !isCompleted

    return {
      id: dayId,
      title: lesson?.title || `День ${dayId}`,
      emoji: lesson?.emoji || '📘',
      xp: lesson?.xpReward || 20,
      isUnlocked,
      isCompleted,
      isCurrent,
      hasLesson: !!lesson,
    }
  })

  // Snake horizontal offsets for a natural path: center, left, center, right
  const getOffsetClass = (idx) => {
    const pattern = ['justify-center', 'justify-start pl-8', 'justify-center', 'justify-end pr-8']
    return pattern[idx % pattern.length]
  }

  return (
    <div className="px-4 py-4 pb-28 select-none animate-fade-in">
      {/* Banner / Roadmap Header */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-md flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-indigo-200 text-xs font-black uppercase tracking-wider mb-0.5">
            <Sparkles size={14} />
            <span>Интерактивный трек</span>
          </div>
          <h2 className="text-xl font-black">14 дней к уверенной базе</h2>
          <p className="text-xs text-indigo-100 mt-0.5 font-medium">
            Пройдено: {completedDays.length} из {TOTAL_DAYS} уроков
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-2xl shrink-0">
          🇬🇧
        </div>
      </div>

      {/* Snake Roadmap */}
      <div className="relative flex flex-col gap-6">
        {allDays.map((day, idx) => {
          const isWeek2Start = idx === 7

          return (
            <div key={day.id} className="relative flex flex-col items-center">
              {/* Milestone divider between Week 1 and Week 2 */}
              {isWeek2Start && (
                <div className={`w-full my-4 p-3.5 rounded-2xl border-2 flex items-center justify-between shadow-sm ${
                  isDark
                    ? 'bg-amber-950/40 border-amber-800/80 text-amber-200'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-400 text-white flex items-center justify-center font-black text-sm">
                      W2
                    </div>
                    <div>
                      <p className={`text-xs font-black uppercase tracking-wider ${
                        isDark ? 'text-amber-400' : 'text-amber-700'
                      }`}>
                        Вторая неделя
                      </p>
                      <p className="text-sm font-extrabold">
                        Present Simple & Активные действия
                      </p>
                    </div>
                  </div>
                  <Award className="text-amber-500" size={24} />
                </div>
              )}

              {/* Connecting line to the next lesson node */}
              {idx < TOTAL_DAYS - 1 && (
                <div
                  className={`absolute top-16 w-1.5 h-12 rounded-full z-0 transition-colors ${
                    day.isCompleted
                      ? 'bg-emerald-400'
                      : isDark
                        ? 'bg-slate-700'
                        : 'bg-slate-200'
                  }`}
                  style={{ left: 'calc(50% - 3px)' }}
                />
              )}

              {/* Node wrapper with zigzag offset */}
              <div className={`w-full flex ${getOffsetClass(idx)} relative z-10`}>
                <div className="flex flex-col items-center max-w-[170px]">
                  {/* Floating "Start here" badge for active current lesson */}
                  {day.isCurrent && (
                    <div className="mb-2 px-3 py-1 bg-indigo-600 text-white text-[11px] font-black rounded-full shadow-md animate-bounce flex items-center gap-1 uppercase tracking-wider">
                      <span>Начать</span>
                      <span>👇</span>
                    </div>
                  )}

                  {/* 3D Tactile Lesson Button */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => day.isUnlocked && day.hasLesson && onSelectLesson(day.id)}
                      disabled={!day.isUnlocked || !day.hasLesson}
                      className={`
                        w-[76px] h-[76px] rounded-3xl flex flex-col items-center justify-center
                        border-2 border-b-4 transition-all duration-150 relative cursor-pointer
                        ${day.isCompleted
                          ? 'bg-emerald-500 border-emerald-600 border-b-emerald-700 active:border-b-2 active:translate-y-0.5 text-white shadow-md'
                          : day.isCurrent
                            ? 'bg-indigo-600 border-indigo-700 border-b-indigo-900 active:border-b-2 active:translate-y-0.5 text-white shadow-lg animate-pulse-ring'
                            : day.isUnlocked
                              ? isDark
                                ? 'bg-slate-800 border-slate-700 border-b-slate-900 text-white shadow-sm'
                                : 'bg-white border-slate-300 border-b-slate-400 text-slate-800 shadow-sm'
                              : isDark
                                ? 'bg-slate-800/50 border-slate-800 text-slate-600 cursor-not-allowed opacity-75'
                                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                        }
                      `}
                    >
                      {/* Icon or emoji inside */}
                      {day.isCompleted ? (
                        <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center">
                          <Check size={22} strokeWidth={3.5} className="text-white" />
                        </div>
                      ) : day.isUnlocked ? (
                        <span className="text-2xl leading-none">{day.emoji}</span>
                      ) : (
                        <Lock size={20} className={isDark ? 'text-slate-600' : 'text-slate-400'} />
                      )}

                      {/* Day number badge inside button */}
                      <span className={`text-[10px] font-black tracking-tight mt-0.5 ${
                        day.isCompleted || day.isCurrent
                          ? 'text-white/90'
                          : isDark
                            ? 'text-slate-500'
                            : 'text-slate-400'
                      }`}>
                        ДЕНЬ {day.id}
                      </span>
                    </button>

                    {/* Star crown for completed lessons */}
                    {day.isCompleted && (
                      <div className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-400 border-2 flex items-center justify-center shadow-md animate-pop ${
                        isDark ? 'border-slate-900' : 'border-white'
                      }`}>
                        <Star size={12} className="fill-white text-white" />
                      </div>
                    )}
                  </div>

                  {/* Lesson Title & XP Badge */}
                  <div className="mt-2 text-center">
                    <p className={`text-xs font-black leading-snug line-clamp-2 ${
                      day.isCompleted
                        ? isDark ? 'text-emerald-400' : 'text-emerald-700'
                        : day.isCurrent
                          ? isDark ? 'text-indigo-400' : 'text-indigo-700'
                          : day.isUnlocked
                            ? isDark ? 'text-slate-200' : 'text-slate-700'
                            : isDark ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                      {day.title}
                    </p>
                    <span className={`inline-block mt-1 text-[10px] font-black px-2 py-0.5 rounded-md ${
                      day.isCompleted
                        ? isDark
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800'
                          : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : day.isCurrent
                          ? isDark
                            ? 'bg-indigo-950/60 text-indigo-400 border border-indigo-800'
                            : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                          : isDark
                            ? 'bg-slate-800 text-slate-500'
                            : 'bg-slate-100 text-slate-400'
                    }`}>
                      +{day.xp} XP
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Course Finale Box */}
        <div className="mt-4 p-5 rounded-3xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-white text-center shadow-lg relative overflow-hidden">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center text-3xl mb-2">
            🏆
          </div>
          <h3 className="text-lg font-black tracking-wide">Финал 14-дневного марафона</h3>
          <p className="text-xs text-amber-100 mt-1 font-semibold max-w-xs mx-auto">
            Пройди все дни, чтобы заложить несокрушимый фундамент английской речи!
          </p>
        </div>
      </div>
    </div>
  )
}
