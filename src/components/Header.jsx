import { Flame, Heart, Star, Sun, Moon } from 'lucide-react'
import { getDaysPlural } from '../utils/plural'

export default function Header({
  streak,
  lives,
  xp,
  isTodayCompleted,
  isPro,
  isDark,
  onToggleTheme,
  onRefillLives,
}) {
  return (
    <header className={`sticky top-0 z-20 backdrop-blur border-b px-3.5 py-2.5 transition-colors duration-150 ${
      isDark ? 'bg-slate-900/95 border-slate-800 text-white' : 'bg-white/95 border-slate-200/80 text-slate-900'
    }`}>
      <div className="max-w-md mx-auto flex items-center justify-between gap-1.5 sm:gap-2">

        {/* Real-Day Streak */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border transition-colors ${
            streak > 0
              ? isDark
                ? 'bg-orange-950/40 border-orange-800/60 text-orange-400'
                : 'bg-orange-50 border-orange-200 text-orange-600'
              : isDark
                ? 'bg-slate-800/60 border-slate-700 text-slate-500'
                : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}
          title={isTodayCompleted ? 'Ударный режим активен сегодня!' : 'Пройди урок сегодня, чтобы продолжить стрик!'}
        >
          <Flame
            size={18}
            className={`shrink-0 ${
              streak > 0 ? 'text-orange-500 fill-orange-500 animate-pulse' : 'text-slate-300 dark:text-slate-600'
            }`}
          />
          <span className="font-black text-xs sm:text-sm tabular-nums whitespace-nowrap">
            {getDaysPlural(streak)}
          </span>
        </div>

        {/* Lives (or Infinite for PRO) */}
        {isPro ? (
          <div
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border shadow-sm ${
              isDark
                ? 'bg-amber-950/40 border-amber-800/60 text-amber-400'
                : 'bg-amber-50 border-amber-300 text-amber-700'
            }`}
            title="PRO подписка активна • Бесконечные жизни!"
          >
            <Heart size={18} className="text-rose-500 fill-rose-500" />
            <span className="text-xs font-black">∞ PRO</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => lives < 5 && onRefillLives && onRefillLives()}
            className={`flex items-center gap-0.5 p-1 rounded-xl transition-colors active:scale-95 ${
              isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
            }`}
            title={lives < 5 ? 'Нажми, чтобы восстановить жизни!' : 'Все 5 жизней полны'}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                size={18}
                className={
                  i < lives
                    ? 'text-rose-500 fill-rose-500 drop-shadow-sm transition-all'
                    : isDark
                      ? 'text-slate-700 fill-slate-700'
                      : 'text-slate-200 fill-slate-200'
                }
              />
            ))}
          </button>
        )}

        {/* XP counter */}
        <div className={`flex items-center gap-1.5 border px-2.5 py-1.5 rounded-xl ${
          isDark
            ? 'bg-amber-950/40 border-amber-800/60 text-amber-400'
            : 'bg-amber-50 border-amber-200 text-amber-700'
        }`}>
          <Star size={16} className="text-amber-500 fill-amber-400 shrink-0" />
          <span className="font-black text-xs sm:text-sm tabular-nums">
            {xp} XP
          </span>
        </div>

        {/* Theme Toggle Button (Sun / Moon) */}
        <button
          type="button"
          onClick={onToggleTheme}
          className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all active:scale-90 cursor-pointer ${
            isDark
              ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
              : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
          }`}
          title={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
          aria-label="Переключить тему"
        >
          {isDark ? (
            <Sun size={18} className="animate-pop" />
          ) : (
            <Moon size={18} className="animate-pop text-slate-700" />
          )}
        </button>

      </div>
    </header>
  )
}
