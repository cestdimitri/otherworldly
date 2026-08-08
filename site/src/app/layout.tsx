import { Golos_Text, Inter } from 'next/font/google'
import './globals.css'

/**
 * Golos Text — дисплейный, 500/600. Самый нейтральный из семи проверенных.
 * Inter — весь остальной текст и все цифры (табличные обязательны: без них
 * время в расписании не выравнивается по вертикали).
 * next/font хостит файлы сам — сторонних запросов к Google нет.
 */
const golos = Golos_Text({
  subsets: ['cyrillic', 'latin'], weight: ['400', '500', '600'],
  variable: '--font-golos', display: 'swap',
})
const inter = Inter({
  subsets: ['cyrillic', 'latin'], weight: ['400', '500', '600'],
  variable: '--font-inter', display: 'swap',
})

/**
 * lang="ru" здесь — значение по умолчанию для корня и 404.
 * На языковых маршрутах его перекрывает [locale]/layout через <html lang>,
 * поэтому суффикс языка виден и экранному диктору, а не только в адресе.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${golos.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
