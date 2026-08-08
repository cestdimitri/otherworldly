'use client'
import { B } from './B'

/**
 * Timepad рендерится в src-less iframe и не поддаётся нашим стилям (D-009),
 * поэтому виджет открывается ПОПАПОМ по нашей собственной кнопке — визуальный
 * язык сайта остаётся целым, Timepad берёт на себя только сделку.
 *
 * Пустой timepadEventId — кнопка «скоро в продаже» вместо мёртвой ссылки (D-010).
 * Благодаря этому сайт можно выпустить до того, как заведут аккаунт организатора.
 */
export function TicketButton({
  eventId, label, soonLabel, sm,
}: { eventId?: string; label: string; soonLabel: string; sm?: boolean }) {
  if (!eventId) return <B sm={sm} disabled>{soonLabel}</B>

  return (
    <B
      sm={sm}
      onClick={() => {
        // Реальная интеграция подключает загрузчик Timepad и открывает попап.
        // Здесь — заглушка, чтобы прототип не тянул внешний скрипт на каждой странице.
        window.open(`https://timepad.ru/event/${eventId}/`, '_blank', 'noopener,noreferrer')
      }}
    >
      {label}
    </B>
  )
}
