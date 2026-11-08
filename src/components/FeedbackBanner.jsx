import { CheckCircle2, XCircle } from 'lucide-react'

export default function FeedbackBanner({ isCorrect, explanation, onContinue }) {
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 animate-slide-up ${
      isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
    }`}>
      <div className="max-w-md mx-auto px-5 pt-5 pb-8">

        {/* Status row */}
        <div className="flex items-start gap-3 mb-4">
          <div className={`mt-0.5 shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
            isCorrect ? 'bg-white/20' : 'bg-white/20'
          }`}>
            {isCorrect
              ? <CheckCircle2 size={22} className="text-white" />
              : <XCircle size={22} className="text-white" />
            }
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white font-black text-xl leading-tight mb-1">
              {isCorrect ? 'Правильно! 🎉' : 'Не верно...'}
            </p>
            {explanation && (
              <p className="text-white/90 text-sm leading-relaxed font-medium">
                {explanation}
              </p>
            )}
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={onContinue}
          className={`
            w-full py-3.5 rounded-2xl font-black text-base tracking-wide
            border-2 border-b-4 active:border-b-2 active:translate-y-0.5 transition-all duration-100
            ${isCorrect
              ? 'bg-white text-emerald-600 border-white/50 hover:bg-emerald-50'
              : 'bg-white text-rose-600 border-white/50 hover:bg-rose-50'
            }
          `}
        >
          Продолжить →
        </button>
      </div>
    </div>
  )
}
