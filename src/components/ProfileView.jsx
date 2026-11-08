import { useState } from 'react'
import { Flame, Star, Trophy, Target, Moon, Sun, RotateCcw, Crown, Sparkles } from 'lucide-react'
import { getDaysPlural } from '../utils/plural'

export default function ProfileView({
  state,
  theme,
  isDark,
  overallAccuracy,
  onToggleTheme,
  onResetProgress,
  onOpenProTab,
}) {
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const completedCount = state.completedDays.length
  const progressPercent = Math.round((completedCount / 14) * 100)

  return (
    <div className="px-4 py-5 pb-28 flex flex-col gap-5 select-none animate-fade-in">
      {/* User Header Profile Card */}
      <div className={`p-5 rounded-2xl relative overflow-hidden border-2 shadow-sm transition-colors duration-150 ${
        isDark
          ? 'bg-slate-800/90 border-slate-700 text-white'
          : 'bg-gradient-to-br from-indigo-50/70 via-white to-white border-indigo-100 text-slate-900'
      }`}>
        <div className="flex items-center gap-4">
          {/* Avatar with Status Ring */}
          <div className="relative">
            <div className="w-18 h-18 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-0.5 shadow-md flex items-center justify-center text-3xl select-none">
              <span role="img" aria-label="avatar">🦉</span>
            </div>
            {state.isPro && (
              <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 border-2 border-white dark:border-slate-800 flex items-center justify-center shadow-md">
                <Crown size={12} className="text-white fill-white" />
              </div>
            )}
          </div>

          {/* User Name & Status */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black truncate">
                {state.userName || 'Mark'}
              </h2>
              {state.isPro ? (
                <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-black tracking-wider uppercase shadow-xs">
                  PRO
                </span>
              ) : (
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                  isDark ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-500'
                }`}>
                  Free
                </span>
              )}
            </div>
            <p className={`text-xs font-semibold mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Изучает английский • 14-дневный курс
            </p>

            {/* Quick PRO promo pill if not pro */}
            {!state.isPro && (
              <button
                type="button"
                onClick={onOpenProTab}
                className={`mt-2 inline-flex items-center gap-1.5 text-xs font-black hover:underline cursor-pointer ${
                  isDark ? 'text-amber-400' : 'text-amber-600'
                }`}
              >
                <Sparkles size={13} />
                <span>Перейти на PRO →</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats 2x2 Grid */}
      <div>
        <h3 className={`text-xs font-black uppercase tracking-wider mb-3 px-1 ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Достижения и статистика
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {/* 1. Streak */}
          <div className={`p-4 rounded-2xl border-2 shadow-sm transition-colors ${
            isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200/80 text-slate-900'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-orange-950/60 text-orange-400' : 'bg-orange-100 text-orange-600'
              }`}>
                <Flame size={18} className="fill-orange-500 text-orange-500" />
              </div>
              <span className={`text-[11px] font-extrabold uppercase tracking-wide ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Стрик
              </span>
            </div>
            <p className="text-xl font-black tabular-nums">
              {getDaysPlural(state.streak)}
            </p>
            <p className={`text-[11px] font-semibold mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Ударный режим
            </p>
          </div>

          {/* 2. Total XP */}
          <div className={`p-4 rounded-2xl border-2 shadow-sm transition-colors ${
            isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200/80 text-slate-900'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-amber-950/60 text-amber-400' : 'bg-amber-100 text-amber-600'
              }`}>
                <Star size={18} className="fill-amber-400 text-amber-500" />
              </div>
              <span className={`text-[11px] font-extrabold uppercase tracking-wide ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Опыт
              </span>
            </div>
            <p className="text-xl font-black tabular-nums">
              {state.xp} XP
            </p>
            <p className={`text-[11px] font-semibold mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Всего заработано
            </p>
          </div>

          {/* 3. Completed Days */}
          <div className={`p-4 rounded-2xl border-2 shadow-sm transition-colors ${
            isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200/80 text-slate-900'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-emerald-950/60 text-emerald-400' : 'bg-emerald-100 text-emerald-600'
              }`}>
                <Trophy size={18} />
              </div>
              <span className={`text-[11px] font-extrabold uppercase tracking-wide ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Уроки
              </span>
            </div>
            <p className="text-xl font-black tabular-nums">
              {completedCount} / 14
            </p>
            <div className={`w-full h-1.5 rounded-full mt-2 overflow-hidden ${
              isDark ? 'bg-slate-700' : 'bg-slate-100'
            }`}>
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* 4. Accuracy: Bug 2 Fix -> Shows "—" when reset */}
          <div className={`p-4 rounded-2xl border-2 shadow-sm transition-colors ${
            isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200/80 text-slate-900'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-blue-950/60 text-blue-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <Target size={18} />
              </div>
              <span className={`text-[11px] font-extrabold uppercase tracking-wide ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Точность
              </span>
            </div>
            <p className="text-xl font-black tabular-nums">
              {overallAccuracy !== null ? `${overallAccuracy}%` : '—'}
            </p>
            <p className={`text-[11px] font-semibold mt-0.5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {overallAccuracy !== null ? 'Верных ответов' : 'Нет ответов'}
            </p>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <div>
        <h3 className={`text-xs font-black uppercase tracking-wider mb-3 px-1 ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Настройки приложения
        </h3>
        <div className={`rounded-2xl divide-y border-2 overflow-hidden transition-colors shadow-sm ${
          isDark
            ? 'bg-slate-800 border-slate-700 divide-slate-700 text-white'
            : 'bg-white border-slate-200/80 divide-slate-100 text-slate-900'
        }`}>
          {/* Dark Mode Row */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-slate-700 text-amber-400' : 'bg-slate-100 text-slate-700'
              }`}>
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
              </div>
              <div>
                <p className="text-sm font-black">
                  Тёмная тема
                </p>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {isDark ? 'Включена тёмная тема' : 'Включена светлая тема'}
                </p>
              </div>
            </div>

            {/* iOS style Toggle Switch */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`w-13 h-7 w-[52px] h-[30px] rounded-full p-1 transition-colors duration-200 ease-in-out cursor-pointer relative ${
                isDark ? 'bg-indigo-600' : 'bg-slate-300'
              }`}
              aria-label="Переключить тему"
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                  isDark ? 'translate-x-[22px]' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* PRO Subscription Status */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-amber-950/60 text-amber-400' : 'bg-amber-100 text-amber-600'
              }`}>
                <Crown size={18} />
              </div>
              <div>
                <p className="text-sm font-black">
                  Подписка PRO
                </p>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {state.isPro ? 'Активна (Бесконечные жизни)' : 'Базовый тариф'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenProTab}
              className={`text-xs font-black px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
                state.isPro
                  ? isDark
                    ? 'bg-emerald-950/50 text-emerald-400 border-emerald-800'
                    : 'bg-emerald-50 text-emerald-600 border-emerald-200'
                  : 'bg-amber-500 hover:bg-amber-600 text-white border-amber-600 shadow-sm'
              }`}
            >
              {state.isPro ? 'Управлять' : 'Оформить'}
            </button>
          </div>

          {/* Reset Progress Row: Bug 2 Fix */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                isDark ? 'bg-rose-950/50 text-rose-400' : 'bg-rose-50 text-rose-500'
              }`}>
                <RotateCcw size={18} />
              </div>
              <div>
                <p className="text-sm font-black">
                  Сбросить прогресс
                </p>
                <p className={`text-xs font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Обнулить уроки, опыт, стрик и точность (жизни сохраняются)
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              className="text-xs font-black text-rose-600 dark:text-rose-400 hover:underline px-2 py-1 cursor-pointer"
            >
              Сброс
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal for Reset Progress */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-xs rounded-3xl p-6 text-center shadow-2xl border animate-pop ${
            isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-900'
          }`}>
            <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl border-2 flex items-center justify-center text-2xl text-rose-500 ${
              isDark ? 'bg-rose-950/50 border-rose-800' : 'bg-rose-50 border-rose-200'
            }`}>
              ⚠️
            </div>
            <h3 className="text-lg font-black mb-1">
              Сбросить прогресс?
            </h3>
            <p className={`text-xs font-semibold mb-5 leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Пройденные уроки, стрик, опыт XP и статистика точности будут обнулены. Ваши текущие {state.lives} ❤️ жизни сохранятся.
            </p>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetProgress()
                  setShowConfirmReset(false)
                }}
                className="w-full py-3 rounded-2xl font-black text-sm bg-rose-500 hover:bg-rose-600 text-white border-b-4 border-rose-700 active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer"
              >
                Да, сбросить
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className={`w-full py-2.5 text-xs font-bold cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
