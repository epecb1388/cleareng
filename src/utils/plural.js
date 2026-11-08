/**
 * Склонение числительных для дней (ударный режим / стрик)
 * Пример: 0 дней, 1 день, 3 дня, 5 дней, 11 дней, 21 день
 */
export function getDaysPlural(n) {
  const count = Number(n) || 0
  const abs = Math.abs(count)
  const lastTwo = abs % 100
  const lastOne = abs % 10

  if (lastTwo >= 11 && lastTwo <= 19) {
    return `${count} дней`
  }
  if (lastOne === 1) {
    return `${count} день`
  }
  if (lastOne >= 2 && lastOne <= 4) {
    return `${count} дня`
  }
  return `${count} дней`
}
