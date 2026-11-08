import { useState } from 'react'
import { X, Volume2, Lightbulb, RotateCcw, Check, Sparkles, BookOpen, Heart, RefreshCw } from 'lucide-react'
import FeedbackBanner from './FeedbackBanner'

// ─── Text-to-Speech Helper ────────────────────────────────────────────────────
function speakEnglish(text, onStart, onEnd) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
  const cleanText = text.replace(/\[.*?\]/g, '').trim()
  const utterance = new SpeechSynthesisUtterance(cleanText)
  utterance.lang = 'en-US'
  utterance.rate = 0.88
  utterance.pitch = 1
  if (onStart) utterance.onstart = onStart
  if (onEnd) utterance.onend = onEnd
  utterance.onerror = () => onEnd && onEnd()
  window.speechSynthesis.speak(utterance)
}

// ─── 1. Theory Step ──────────────────────────────────────────────────────────
function TheoryStep({ step, onNext }) {
  const [playingEx, setPlayingEx] = useState(null)

  const handleSpeakExample = (text, idx) => {
    setPlayingEx(idx)
    speakEnglish(text, () => setPlayingEx(idx), () => setPlayingEx(null))
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in pb-4">
      <div className="card p-5 border-l-4 border-indigo-500 bg-gradient-to-br from-indigo-50/50 via-white to-white dark:from-slate-800 dark:via-slate-800 dark:to-slate-850">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 text-xs font-black uppercase tracking-wider mb-2">
          <BookOpen size={14} />
          Теория и правило
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white leading-tight">{step.title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mt-1">{step.subtitle}</p>
      </div>

      {step.text && (
        <div className="card p-5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
          {step.text}
        </div>
      )}

      {step.formula && (
        <div className="rounded-2xl p-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
            <Sparkles size={96} />
          </div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-black uppercase tracking-widest text-indigo-200">
              ⚡ Формула-шпаргалка
            </span>
          </div>
          <p className="font-black text-lg text-white tracking-wide">
            {step.formula}
          </p>
          {step.usage && (
            <p className="text-xs text-indigo-200 mt-1 font-semibold">{step.usage}</p>
          )}
        </div>
      )}

      {step.examples && step.examples.length > 0 && (
        <div className="card p-4 flex flex-col gap-3">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Живые примеры с произношением
          </div>
          <div className="flex flex-col gap-2.5">
            {step.examples.map((ex, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-750 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-extrabold text-slate-800 dark:text-slate-100 text-base leading-snug">
                    {ex.en}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{ex.ru}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleSpeakExample(ex.en, i)}
                  className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    playingEx === i
                      ? 'bg-indigo-600 text-white scale-95 shadow-sm'
                      : 'bg-indigo-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-200 active:scale-95'
                  }`}
                  title="Озвучить пример"
                >
                  <Volume2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {step.tip && (
        <div className="rounded-2xl p-4 bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-200/80 dark:border-amber-800/60 flex items-start gap-3">
          <span className="text-2xl leading-none">💡</span>
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-0.5">Лайфхак</p>
            <p className="text-xs font-bold text-amber-900 dark:text-amber-200 leading-relaxed">{step.tip}</p>
          </div>
        </div>
      )}

      <button className="btn-primary mt-2 flex items-center justify-center gap-2" onClick={onNext}>
        <span>Понятно, дальше!</span>
        <span className="text-lg">→</span>
      </button>
    </div>
  )
}

// ─── 2. Vocabulary Step ───────────────────────────────────────────────────────
function VocabStep({ step, onNext }) {
  const [activeWordIdx, setActiveWordIdx] = useState(null)

  const handleSpeak = (word, i) => {
    setActiveWordIdx(i)
    speakEnglish(word, () => setActiveWordIdx(i), () => setActiveWordIdx(null))
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in pb-4">
      <div className="card p-5 border-l-4 border-violet-500 bg-gradient-to-br from-violet-50/50 via-white to-white dark:from-slate-800 dark:via-slate-800 dark:to-slate-850">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400 text-xs font-black uppercase tracking-wider mb-2">
          <Sparkles size={14} />
          Словарный запас дня
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">{step.title}</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
          Нажимай на динамик, чтобы послушать живое американское произношение!
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {step.words.map((w, i) => (
          <div
            key={i}
            className={`card p-4 flex items-start gap-3.5 transition-all duration-150 border-2 ${
              activeWordIdx === i ? 'border-violet-400 bg-violet-50/40 dark:bg-violet-950/30 shadow-md' : 'border-slate-100 dark:border-slate-700/80'
            }`}
          >
            <button
              type="button"
              onClick={() => handleSpeak(w.word, i)}
              className={`mt-0.5 shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center border-2 border-b-4 transition-all duration-100 active:border-b-2 active:translate-y-0.5 ${
                activeWordIdx === i
                  ? 'bg-violet-600 text-white border-violet-700'
                  : 'bg-violet-100 dark:bg-slate-700 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-slate-600 hover:bg-violet-200'
              }`}
              title="Послушать произношение"
            >
              <Volume2 size={20} className={activeWordIdx === i ? 'animate-pulse' : ''} />
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="font-black text-slate-900 dark:text-white text-lg tracking-tight">{w.word}</span>
                {w.transcription && (
                  <span className="text-xs text-violet-600 dark:text-violet-400 font-bold bg-violet-50 dark:bg-violet-950/60 px-2 py-0.5 rounded-md border border-violet-100 dark:border-violet-800">
                    {w.transcription}
                  </span>
                )}
              </div>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-1">{w.translation}</p>
              {w.example && (
                <div className="mt-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 p-2 rounded-xl border border-slate-100 dark:border-slate-700 italic">
                  "{w.example}"
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="btn-primary mt-2 flex items-center justify-center gap-2" onClick={onNext}>
        <span>Запомнил, к практике!</span>
        <span className="text-lg">→</span>
      </button>
    </div>
  )
}

// ─── 3. Quiz Step ─────────────────────────────────────────────────────────────
function QuizStep({ step, isRetry, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [shake, setShake] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const handleSelect = (idx) => {
    // Strict single execution guard: cannot click multiple times
    if (selected !== null) return
    setSelected(idx)
    const isCorrect = idx === step.correctIndex
    if (!isCorrect) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
    // Only invoke onAnswer once
    setTimeout(() => onAnswer(isCorrect, step.explanation), 350)
  }

  const getOptionStyle = (idx) => {
    if (selected === null) return 'opt-idle'
    if (idx === step.correctIndex) return 'opt-correct animate-pop'
    if (idx === selected && idx !== step.correctIndex) return 'opt-wrong'
    return 'opt-dim'
  }

  return (
    <div className={`flex flex-col gap-4 animate-fade-in pb-4 ${shake ? 'animate-shake' : ''}`}>
      <div className="card p-5 border-2 border-slate-100 dark:border-slate-700/80 relative">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
            isRetry
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
              : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
          }`}>
            {isRetry ? 'Повтор ошибки • Попробуй снова' : 'Тест • 1 правильный ответ'}
          </span>

          {step.hint && (
            <button
              type="button"
              onClick={() => setShowHint(prev => !prev)}
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border transition-all ${
                showHint
                  ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              <Lightbulb size={14} className={showHint ? 'fill-amber-500 text-amber-600' : ''} />
              <span>Подсказка</span>
            </button>
          )}
        </div>

        <p className="text-base font-extrabold text-slate-800 dark:text-white leading-snug">
          {step.question}
        </p>

        {step.sentence && step.sentence !== 'Выбери готовый вариант' && (
          <div className="mt-3 p-3.5 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="text-lg font-black text-slate-800 dark:text-white tracking-wide text-center">
              {step.sentence}
            </p>
          </div>
        )}

        {showHint && step.hint && (
          <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-800 dark:text-amber-300 animate-slide-up flex items-start gap-2">
            <span className="text-base leading-none">💡</span>
            <span>{step.hint}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {step.options.map((opt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelect(idx)}
            disabled={selected !== null}
            className={`${getOptionStyle(idx)} min-h-[58px] flex items-center justify-center`}
          >
            <span>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── 4. Sentence Builder Step ─────────────────────────────────────────────────
function SentenceBuilderStep({ step, isRetry, onAnswer }) {
  const shuffleWords = (arr) => [...arr].sort(() => Math.random() - 0.5)

  const [available, setAvailable] = useState(() => shuffleWords(step.words))
  const [chosen, setChosen] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const addWord = (word, fromIdx) => {
    if (submitted) return
    setAvailable(prev => {
      const next = [...prev]
      next.splice(fromIdx, 1)
      return next
    })
    setChosen(prev => [...prev, word])
  }

  const removeWord = (word, fromIdx) => {
    if (submitted) return
    setChosen(prev => {
      const next = [...prev]
      next.splice(fromIdx, 1)
      return next
    })
    setAvailable(prev => [...prev, word])
  }

  const handleReset = () => {
    if (submitted) return
    setAvailable(shuffleWords(step.words))
    setChosen([])
  }

  const handleCheck = () => {
    // Strict single execution guard: cannot submit twice
    if (chosen.length === 0 || submitted) return
    setSubmitted(true)
    const answer = chosen.join(' ').trim().toLowerCase()
    const target = step.correct.trim().toLowerCase()
    const cleanAnswer = answer.replace(/[.,!?]$/, '')
    const cleanTarget = target.replace(/[.,!?]$/, '')
    const isCorrect = cleanAnswer === cleanTarget
    // Only invoke onAnswer once
    setTimeout(() => onAnswer(isCorrect, step.explanation), 300)
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in pb-4">
      <div className="card p-5 border-2 border-slate-100 dark:border-slate-700/80">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg ${
            isRetry
              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
              : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
          }`}>
            {isRetry ? 'Повтор ошибки • Собери правильно' : 'Конструктор предложений'}
          </span>

          {step.hint && (
            <button
              type="button"
              onClick={() => setShowHint(prev => !prev)}
              className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg border transition-all ${
                showHint
                  ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300'
                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-amber-50 hover:text-amber-700'
              }`}
            >
              <Lightbulb size={14} className={showHint ? 'fill-amber-500 text-amber-600' : ''} />
              <span>Подсказка</span>
            </button>
          )}
        </div>

        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{step.question}</p>
        <p className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>🇷🇺</span>
          <span>{step.translation}</span>
        </p>

        {showHint && step.hint && (
          <div className="mt-3 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-xs font-bold text-amber-800 dark:text-amber-300 animate-slide-up flex items-start gap-2">
            <span className="text-base leading-none">💡</span>
            <span>{step.hint}</span>
          </div>
        )}
      </div>

      <div className="card p-4 min-h-[96px] bg-slate-50/70 dark:bg-slate-900/50 border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-wrap gap-2 items-center content-center justify-center">
        {chosen.length === 0 ? (
          <p className="text-slate-400 dark:text-slate-500 text-sm font-bold text-center select-none">
            Нажимай на слова внизу, чтобы собрать фразу
          </p>
        ) : (
          chosen.map((word, i) => (
            <button
              key={i}
              type="button"
              onClick={() => removeWord(word, i)}
              disabled={submitted}
              className="chip-chosen animate-pop text-sm font-extrabold cursor-pointer"
            >
              {word}
            </button>
          ))
        )}
      </div>

      <div className="card p-4 flex flex-wrap gap-2.5 justify-center min-h-[80px] items-center bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700">
        {available.map((word, i) => (
          <button
            key={i}
            type="button"
            onClick={() => addWord(word, i)}
            disabled={submitted}
            className="chip-available text-sm font-extrabold cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
          >
            {word}
          </button>
        ))}
        {available.length === 0 && (
          <span className="text-xs text-slate-300 dark:text-slate-600 font-bold">Все слова расставлены</span>
        )}
      </div>

      <div className="flex gap-2.5 mt-1">
        <button
          type="button"
          onClick={handleReset}
          disabled={submitted || chosen.length === 0}
          className="btn-secondary !w-auto px-4 flex items-center justify-center gap-1.5"
          title="Сбросить выбранные слова"
        >
          <RotateCcw size={18} />
          <span className="text-xs">Сброс</span>
        </button>

        <button
          type="button"
          onClick={handleCheck}
          disabled={chosen.length === 0 || submitted}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          <Check size={20} strokeWidth={3} />
          <span>Проверить</span>
        </button>
      </div>
    </div>
  )
}

// ─── Main Lesson Runner ───────────────────────────────────────────────────────
export default function LessonRunner({
  lesson,
  lives,
  isPro,
  onLoseLife,
  onRefillLives,
  onComplete,
  onExit,
}) {
  // Queue of steps with unique run identifiers
  const [stepsQueue, setStepsQueue] = useState(() =>
    lesson.steps.map((st, idx) => ({ ...st, queueId: `${idx}_orig` }))
  )
  const [queueIndex, setQueueIndex] = useState(0)

  // Track unique original step indices that were solved correctly
  const [solvedStepIndices, setSolvedStepIndices] = useState(new Set())

  // Bug #1 fix: Dedicated mistake and attempt counters, initialized strictly to 0 at lesson start
  const [mistakeCount, setMistakeCount] = useState(0)
  const [totalAttempts, setTotalAttempts] = useState(0)

  const [feedback, setFeedback] = useState(null)
  const [isGameOver, setIsGameOver] = useState(false)

  const originalTotal = lesson.steps.length
  const progressCount = solvedStepIndices.size
  const progressPercent = (progressCount / originalTotal) * 100

  const currentStep = stepsQueue[queueIndex]
  const isRetry = currentStep && currentStep.queueId && currentStep.queueId.includes('retry')

  // Handler for advancing after feedback drawer
  const handleContinue = () => {
    setFeedback(null)

    // Check if lives reached 0 and user is not PRO
    if (lives <= 0 && !isPro) {
      setIsGameOver(true)
      return
    }

    const nextIndex = queueIndex + 1
    if (nextIndex >= stepsQueue.length) {
      // Check if all original steps were truly solved
      if (solvedStepIndices.size >= originalTotal) {
        const accuracy = totalAttempts > 0
          ? Math.max(0, Math.round(((totalAttempts - mistakeCount) / totalAttempts) * 100))
          : 100

        onComplete({
          mistakeCount,
          totalAttempts: Math.max(originalTotal, totalAttempts),
          accuracy,
        })
      } else {
        setIsGameOver(true)
      }
    } else {
      setQueueIndex(nextIndex)
    }
  }

  // Answer callback: strictly increments mistakeCount on wrong answer exactly once
  const handleAnswer = (isCorrect, explanation) => {
    setTotalAttempts(prev => prev + 1)

    if (isCorrect) {
      const origIndex = lesson.steps.findIndex(
        s => s.question === currentStep.question || s.title === currentStep.title
      )
      if (origIndex !== -1) {
        setSolvedStepIndices(prev => new Set(prev).add(origIndex))
      }
      setFeedback({ isCorrect: true, explanation })
    } else {
      // Bug #1 fix: Increment mistakeCount strictly by +1 only here
      setMistakeCount(prev => prev + 1)

      const remainingLives = onLoseLife()

      // Add this failed question to the end of the queue for re-attempt
      setStepsQueue(prev => [
        ...prev,
        { ...currentStep, queueId: `${currentStep.type}_${Date.now()}_retry` }
      ])

      setFeedback({ isCorrect: false, explanation })
    }
  }

  // Handle Refill Lives when Game Over
  const handleRefillAndRetry = () => {
    onRefillLives()
    setIsGameOver(false)
  }

  // If Game Over (0 lives and not PRO)
  if (isGameOver || (lives <= 0 && !isPro && !feedback)) {
    return (
      <div className="flex flex-col items-center justify-between min-h-screen px-6 py-10 bg-slate-900 text-white animate-fade-in text-center select-none">
        <div className="w-full flex-1 flex flex-col items-center justify-center max-w-sm mx-auto">
          <div className="w-24 h-24 rounded-3xl bg-rose-500/20 border-2 border-rose-500/40 flex items-center justify-center mb-6 text-5xl animate-bounce">
            💔
          </div>
          <h2 className="text-2xl font-black mb-2">Закончились жизни!</h2>
          <p className="text-slate-400 text-sm font-semibold mb-6 leading-relaxed">
            Ты допустил {mistakeCount} {mistakeCount === 1 ? 'ошибку' : mistakeCount < 5 ? 'ошибки' : 'ошибок'}. Чтобы продолжить и закрепить правила, восстанови жизни!
          </p>

          <div className="w-full p-4 rounded-2xl bg-slate-800/80 border border-slate-700 mb-6 text-left flex items-center gap-3">
            <Heart size={24} className="text-rose-500 fill-rose-500 shrink-0" />
            <div className="text-xs">
              <p className="font-black text-slate-200">Бесплатное восстановление</p>
              <p className="text-slate-400">Нажми ниже, чтобы мгновенно получить 5 ❤️</p>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm flex flex-col gap-3">
          <button
            type="button"
            onClick={handleRefillAndRetry}
            className="btn-primary flex items-center justify-center gap-2 cursor-pointer !bg-emerald-500 hover:!bg-emerald-600"
          >
            <RefreshCw size={20} />
            <span>Восстановить жизни (+5 ❤️)</span>
          </button>

          <button
            type="button"
            onClick={onExit}
            className="btn-secondary !bg-slate-800 !text-slate-300 !border-slate-700 hover:!bg-slate-700 cursor-pointer"
          >
            Выйти на карту
          </button>
        </div>
      </div>
    )
  }

  if (!currentStep) return null

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 relative select-none transition-colors">
      {/* Top Bar with glossy progress bar & lives */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 py-3 sticky top-0 z-30 shadow-sm transition-colors">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            type="button"
            onClick={onExit}
            className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all active:scale-90"
            title="Выйти из урока"
          >
            <X size={20} />
          </button>

          {/* Duolingo glossy progress bar */}
          <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-750 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-300 relative shadow-inner"
              style={{ width: `${Math.max(progressPercent, 5)}%` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/30 rounded-t-full" />
            </div>
          </div>

          {/* Lives or PRO badge */}
          <div className="flex items-center gap-1 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-xl border border-rose-100 dark:border-rose-900/60">
            <Heart size={16} className="text-rose-500 fill-rose-500" />
            <span className="text-xs font-black text-rose-600 dark:text-rose-400 tabular-nums">
              {isPro ? '∞' : lives}
            </span>
          </div>

          {/* Step indicator */}
          <span className="text-xs font-extrabold text-slate-400 dark:text-slate-500 tabular-nums shrink-0">
            {progressCount}/{originalTotal}
          </span>
        </div>
      </div>

      {/* Main step container */}
      <div className="flex-1 overflow-y-auto px-4 py-5 pb-32">
        <div className="max-w-md mx-auto">
          {currentStep.type === 'theory' && (
            <TheoryStep
              step={currentStep}
              onNext={() => {
                setSolvedStepIndices(prev => new Set(prev).add(0))
                handleContinue()
              }}
            />
          )}
          {currentStep.type === 'vocabulary' && (
            <VocabStep
              step={currentStep}
              onNext={() => {
                setSolvedStepIndices(prev => new Set(prev).add(1))
                handleContinue()
              }}
            />
          )}
          {currentStep.type === 'quiz' && (
            <QuizStep
              key={currentStep.queueId || queueIndex}
              step={currentStep}
              isRetry={isRetry}
              onAnswer={handleAnswer}
            />
          )}
          {currentStep.type === 'sentence_builder' && (
            <SentenceBuilderStep
              key={currentStep.queueId || queueIndex}
              step={currentStep}
              isRetry={isRetry}
              onAnswer={handleAnswer}
            />
          )}
        </div>
      </div>

      {/* Bottom sliding Feedback Drawer */}
      {feedback && (
        <FeedbackBanner
          isCorrect={feedback.isCorrect}
          explanation={feedback.explanation}
          onContinue={handleContinue}
        />
      )}
    </div>
  )
}
