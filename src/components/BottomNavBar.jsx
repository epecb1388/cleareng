import { BookOpen, User, Crown } from 'lucide-react'

export default function BottomNavBar({ activeTab, onSelectTab, isPro, isDark }) {
  const tabs = [
    {
      id: 'learn',
      label: 'Обучение',
      icon: BookOpen,
    },
    {
      id: 'profile',
      label: 'Профиль',
      icon: User,
    },
    {
      id: 'pro',
      label: 'PRO',
      icon: Crown,
      highlight: true,
    },
  ]

  return (
    <nav className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 backdrop-blur-md border-t px-4 py-2 transition-colors select-none shadow-lg ${
      isDark
        ? 'bg-slate-900/95 border-slate-800 text-slate-100'
        : 'bg-white/95 border-slate-200 text-slate-800'
    }`}>
      <div className="grid grid-cols-3 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all duration-150 cursor-pointer relative ${
                isActive
                  ? isDark
                    ? 'text-indigo-400 font-black'
                    : 'text-indigo-600 font-black'
                  : isDark
                    ? 'text-slate-500 hover:text-slate-300 font-extrabold'
                    : 'text-slate-400 hover:text-slate-600 font-extrabold'
              }`}
            >
              {/* Icon Container with active pill */}
              <div
                className={`relative w-10 h-7 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? isDark
                      ? 'bg-indigo-950/70 scale-105'
                      : 'bg-indigo-50 scale-105'
                    : 'bg-transparent'
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-transform ${
                    tab.highlight && !isPro
                      ? 'text-amber-500'
                      : ''
                  } ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`}
                />

                {/* Indicator dot for PRO tab */}
                {tab.highlight && !isPro && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                )}
              </div>

              {/* Label */}
              <span className="text-[11px] tracking-tight mt-0.5">
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
