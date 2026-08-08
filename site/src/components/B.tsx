import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Единственный интерактивный примитив системы (правило 6).
 * Два размера, два состояния. Всё остальное на сайте — поверхности,
 * которые реагируют на наведение, но не притворяются кнопками.
 *
 * Наследует нативные атрибуты button, поэтому onClick, type, aria-*
 * работают без обёрток — иначе каждый новый обработчик требовал бы
 * править сам примитив, а это первый шаг к пяти его версиям.
 */
type Common = { children: ReactNode; sm?: boolean; on?: boolean; className?: string }
type Props = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: string }

export function B({ children, href, sm, on, className = '', ...rest }: Props) {
  const cls = ['b', sm && 'b--sm', on && 'b--on', className].filter(Boolean).join(' ')
  if (href && !rest.disabled) {
    return (
      <Link href={href} className={cls} aria-pressed={rest['aria-pressed']}>
        <span>{children}</span>
      </Link>
    )
  }
  return <button className={cls} {...rest}><span>{children}</span></button>
}
