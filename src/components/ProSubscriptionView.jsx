import { useState } from 'react'
import { Crown, Star, Check, X } from 'lucide-react'

export default function ProSubscriptionView({ isPro, isDark, onActivatePro }) {
  // Plan selection: '1month' | '3months' | '6months'
  const [selectedPlan, setSelectedPlan] = useState('3months')
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [justActivated, setJustActivated] = useState(false)

  // Clean features list: strictly NO mention of ads / реклама
  const features = [
    {
      icon: '♾️',
      title: 'Бесконечные жизни без ожидания',
      desc: 'Ошибайся сколько угодно, не жди восстановления сердечек и учись в своём темпе.',
    },
    {
      icon: '🤖',
      title: 'Личный ИИ-репетитор',
      desc: 'Мгновенный и подробный разбор любого грамматического правила и тонкостей живого языка 24/7.',
    },
    {
      icon: '🧠',
      title: 'Режим отработки ошибок',
      desc: 'Индивидуальные тренировки по всем сложным темам, где возникали трудности, до полного усвоения.',
    },
  ]

  // 3 Plans with Telegram Stars
  const plans = [
    {
      id: '1month',
      title: '1 месяц',
      stars: 49,
      subtitle: 'Базовый тариф',
      badge: null,
    },
    {
      id: '3months',
      title: '3 месяца',
      stars: 129,
      subtitle: '43 ⭐ в месяц',
      badge: 'Популярный • Выгода 15%',
      isPopular: true,
    },
    {
      id: '6months',
      title: 'Полгода',
      stars: 229,
      subtitle: '38 ⭐ в месяц',
      badge: 'Максимальная выгода',
      isBest: true,
    },
  ]

  const activePlanObj = plans.find(p => p.id === selectedPlan) || plans[1]

  const handleActivate = () => {
    onActivatePro()
    setJustActivated(true)
    setTimeout(() => {
      setShowDemoModal(false)
      setJustActivated(false)
    }, 1800)
  }

  return (
    <div className="px-4 py-5 pb-28 flex flex-col gap-5 select-none animate-fade-in">
      {/* Hero Premium Banner */}
      <div className="relative rounded-3xl p-6 bg-gradient-to-br from-amber-500 via-amber-600 to-yellow-600 text-white shadow-xl overflow-hidden border-2 border-amber-300">
        <div className="absolute -right-6 -bottom-6 opacity-15 pointer-events-none">
          <Crown size={150} />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30 text-white text-xs font-black uppercase tracking-wider mb-3">
            <Crown size={14} className="fill-white" />
            <span>Telegram Stars • PRO</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black leading-tight">
            ClearEng PRO
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 font-semibold mt-1 max-w-[260px]">
            Ускорь изучение английского в 3 раза без пауз и ограничений!
          </p>

          {isPro && (
            <div className="mt-4 inline-flex items-center gap-2 bg-emerald-500 text-white px-3 py-1.5 rounded-xl font-black text-xs shadow-md">
              <Check size={16} strokeWidth={3} />
              <span>PRO-статус уже активен!</span>
            </div>
          )}
        </div>
      </div>

      {/* Feature List (No ads mentioned) */}
      <div className="flex flex-col gap-3">
        <h3 className={`text-xs font-black uppercase tracking-wider px-1 ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Преимущества подписки PRO
        </h3>

        <div className="flex flex-col gap-2.5">
          {features.map((feat, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 shadow-sm transition-colors ${
                isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200/80 text-slate-900'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center text-xl shrink-0 ${
                isDark ? 'bg-amber-950/60 border-amber-850' : 'bg-amber-50 border-amber-200'
              }`}>
                {feat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black leading-snug">
                  {feat.title}
                </h4>
                <p className={`text-xs font-medium mt-0.5 leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Telegram Stars Tariffs: 3 Plans */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className={`text-xs font-black uppercase tracking-wider ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Оплата в Telegram Stars
          </h3>
          <span className="text-[11px] font-black text-amber-500 flex items-center gap-1">
            <Star size={13} className="fill-amber-400" />
            Официальные звёзды
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id

            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between shadow-sm ${
                  isSelected
                    ? isDark
                      ? 'border-amber-500 bg-amber-950/40 ring-2 ring-amber-400/50 text-white'
                      : 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400/50 text-slate-900'
                    : isDark
                      ? 'border-slate-700 bg-slate-800 text-white hover:border-slate-600'
                      : 'border-slate-200/80 bg-white text-slate-900 hover:border-slate-300'
                }`}
              >
                {/* Plan Badge */}
                {plan.badge && (
                  <div
                    className={`absolute top-0 right-0 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-bl-xl shadow-xs ${
                      plan.isBest
                        ? 'bg-gradient-to-l from-emerald-500 to-teal-500'
                        : 'bg-gradient-to-l from-amber-500 to-yellow-500'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-black ${
                      isDark ? 'text-slate-200' : 'text-slate-700'
                    }`}>
                      {plan.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 my-1.5">
                    <Star size={18} className="fill-amber-400 text-amber-500 shrink-0" />
                    <span className="text-xl sm:text-2xl font-black tabular-nums">
                      {plan.stars}
                    </span>
                    <span className="text-xs font-extrabold text-amber-500">⭐</span>
                  </div>
                </div>

                <p className={`text-[11px] font-bold ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  {plan.subtitle}
                </p>
              </button>
            )
          })}
        </div>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={() => setShowDemoModal(true)}
        className="w-full py-4 px-6 rounded-2xl font-black text-base text-white bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 border-2 border-b-4 border-amber-700 active:border-b-2 active:translate-y-0.5 shadow-lg transition-all duration-100 flex items-center justify-center gap-2 cursor-pointer mt-1"
      >
        <Star size={20} className="fill-white" />
        <span>Оформить за {activePlanObj.stars} ⭐</span>
      </button>

      {/* Demo Modal for Activation */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
          <div className={`w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl border animate-pop relative ${
            isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100 text-slate-900'
          }`}>
            <button
              type="button"
              onClick={() => setShowDemoModal(false)}
              className={`absolute top-4 right-4 ${
                isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <X size={20} />
            </button>

            <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl border-2 flex items-center justify-center text-3xl ${
              isDark ? 'bg-amber-950/60 border-amber-700/80' : 'bg-amber-50 border-amber-200'
            }`}>
              👑
            </div>

            <h3 className="text-xl font-black mb-1">
              {justActivated ? 'Поздравляем! 🎉' : 'Оплата в Telegram Stars'}
            </h3>

            <p className={`text-xs font-semibold mb-5 leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`}>
              {justActivated
                ? 'PRO-статус успешно активирован! Бесконечные жизни и функции включены.'
                : `Выбран тариф: ${activePlanObj.title} (${activePlanObj.stars} ⭐). Для проверки функционала в MVP нажмите кнопку демо-активации ниже:`}
            </p>

            <div className="flex flex-col gap-2.5">
              {!justActivated ? (
                <button
                  type="button"
                  onClick={handleActivate}
                  className="w-full py-3.5 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white border-b-4 border-amber-700 active:translate-y-0.5 active:border-b-2 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Check size={18} strokeWidth={3} />
                  <span>Активировать демо ({activePlanObj.stars} ⭐)</span>
                </button>
              ) : (
                <div className={`py-2.5 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 ${
                  isDark ? 'bg-emerald-950/50 text-emerald-300' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  <Check size={16} strokeWidth={3} />
                  <span>PRO доступ предоставлен!</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className={`w-full py-2 text-xs font-bold cursor-pointer ${
                  isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
