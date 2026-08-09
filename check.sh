#!/bin/bash
# Проверка боевого сайта. Запуск:
#   bash /Users/diidentikit/otherworldly/check.sh
#
# Проверяет не «открывается ли сайт», а четыре вещи, которые ломаются
# по-разному и незаметно: маршруты, двуязычность, источник данных и 404.

B="${1:-https://otherworldly.stpetersburg.workers.dev}"
echo "Проверяю $B"
echo

fail=0

# ── 1. Маршруты ─────────────────────────────────────────────────────────
echo "1. СТРАНИЦЫ"
# Только маршруты, которые есть В КОДЕ. Раздела «О фестивале» здесь нет
# намеренно: он существует, лишь если его завели в CMS, и требовать его —
# значит проверять содержимое базы под видом проверки сборки.
for p in /ru /en /ru/timetable /ru/programme /ru/materials /ru/archive \
         /en/timetable /en/programme /en/archive /robots.txt /sitemap.xml; do
  code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 20 "$B$p")
  if [ "$code" = "200" ]; then
    printf "   ✓ %-20s %s\n" "$p" "$code"
  else
    printf "   ✗ %-20s %s\n" "$p" "$code"
    fail=1
  fi
done

# Корень должен ПЕРЕНАПРАВЛЯТЬ на /ru, а не отдавать страницу
echo
redir=$(curl -s -o /dev/null -w "%{redirect_url}" --max-time 20 "$B/")
if echo "$redir" | grep -q "/ru"; then
  echo "   ✓ / перенаправляет на $redir"
else
  echo "   ✗ / не перенаправляет на /ru (получено: '${redir:-ничего}')"
  fail=1
fi

# ── 2. Несуществующая страница ──────────────────────────────────────────
echo
echo "2. ЧЕСТНЫЙ 404"
code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 20 "$B/ru/takoy-stranicy-net")
if [ "$code" = "404" ]; then
  echo "   ✓ выдуманный адрес отвечает 404"
else
  echo "   ✗ выдуманный адрес отвечает $code — гибкий маршрут ловит лишнее"
  fail=1
fi

# ── 3. Двуязычность ─────────────────────────────────────────────────────
# Здесь ломается тише всего: страницы открываются, а поисковик не знает,
# что это один сайт на двух языках.
echo
echo "3. HREFLANG"
html=$(curl -s -L --max-time 20 "$B/ru")

# Без этой проверки все дальнейшие grep'ы проходят на пустом ответе:
# «строки otherworldly.example нет» верно и тогда, когда нет вообще ничего.
# Тест, который успешно проходит на пустом входе, хуже отсутствующего.
if [ -z "$html" ]; then
  echo "   ⚠ страница вернула ПУСТОТУ — проверять нечего"
  echo "     Дальнейшие пункты пропущены: на пустом ответе они бессмысленны."
  echo
  echo "ИТОГ: сайт недоступен по адресу $B."
  echo "Код 000 выше означает, что соединение не установилось вовсе —"
  echo "это не ошибка приложения, а неверный адрес или невыложенный воркер."
  exit 1
fi

# Next.js выводит атрибут как hrefLang, а не hreflang. HTML регистр
# не различает, так что для браузера это одно и то же — но grep различает,
# и первая версия этой проверки врала, что тегов нет.
for t in ru en x-default; do
  if echo "$html" | grep -qi "hreflang=\"$t\""; then
    echo "   ✓ hreflang=$t"
  else
    echo "   ✗ hreflang=$t не найден"
    fail=1
  fi
done

# Проверять надо не одну заглушку, а ЛЮБОЙ адрес, кроме проверяемого.
# Первая версия искала только otherworldly.example и спокойно пропустила
# http://localhost:3000 — то есть худший случай из возможных.
host=$(echo "$B" | sed -E 's|https?://||; s|/.*||')
bad=$(echo "$html" | grep -o 'rel="alternate"[^>]*href="[^"]*"' \
      | grep -o 'href="[^"]*"' | grep -v "$host" | head -3)
if [ -n "$bad" ]; then
  echo "   ✗ hreflang ведёт НЕ на $host:"
  echo "$bad" | sed 's|^|       |'
  echo "     → NEXT_PUBLIC_SITE_URL при сборке был другим"
  fail=1
else
  echo "   ✓ hreflang ведёт на $host"
fi

if echo "$html" | grep -q 'lang="ru"'; then
  echo "   ✓ <html lang=\"ru\">"
else
  echo "   ✗ атрибут lang не выставлен"
  fail=1
fi

# ── 3b. Канонический адрес ВНУТРЕННЕЙ страницы ──────────────────────────
# Проверять только главную бесполезно: у неё канонический адрес совпадает
# с корнем при любой ошибке. Ошибка вылезает именно внутри — когда страница
# наследует метаданные макета и объявляет себя главной.
echo
echo "3b. КАНОНИЧЕСКИЙ АДРЕС ВНУТРЕННЕЙ СТРАНИЦЫ"
inner=$(curl -s -L --max-time 20 "$B/ru/timetable")
canon=$(echo "$inner" | grep -o 'rel="canonical"[^>]*href="[^"]*"' | grep -o 'href="[^"]*"')
echo "   /ru/timetable объявляет: ${canon:-ничего}"
if echo "$canon" | grep -q "/ru/timetable"; then
  echo "   ✓ ссылается на себя"
else
  echo "   ✗ ссылается не на себя — страница выдаёт себя за другую"
  fail=1
fi
alt_inner=$(echo "$inner" | grep -o 'hrefLang="en" href="[^"]*"' | grep -o 'href="[^"]*"')
if echo "$alt_inner" | grep -q "/en/timetable"; then
  echo "   ✓ hreflang=en ведёт на английское расписание"
else
  echo "   ✗ hreflang=en ведёт не на аналог: ${alt_inner:-ничего}"
  fail=1
fi

# ── 4. Откуда данные ────────────────────────────────────────────────────
# Сайт намеренно работает и без Sanity, поэтому «страница открылась»
# ещё не значит, что база подключена.
echo
echo "4. ИСТОЧНИК ДАННЫХ"
if echo "$html" | grep -q "Фестиваль-лаборатория, где кино становится инструментом"; then
  echo "   ✗ на главной ДЕМО-данные из src/lib/seed.ts"
  echo "     Демо подставляются ровно в одном случае: ключи Sanity"
  echo "     не дошли до сборки. Проверьте NEXT_PUBLIC_SANITY_PROJECT_ID"
  echo "     в .env.local (локальная сборка) или секрет SANITY_PROJECT_ID"
  echo "     в репозитории (сборка на GitHub)."
  fail=1
else
  echo "   ✓ данные идут из Sanity"
fi

# ── 5. Карта сайта ──────────────────────────────────────────────────────
echo
echo "5. КАРТА САЙТА"
sm=$(curl -s -L --max-time 20 "$B/sitemap.xml")
n=$(echo "$sm" | grep -c "<loc>")
echo "   адресов в карте: $n"
# Та же ошибка, что была в пункте 3: сверяем с проверяемым хостом,
# а не со списком заранее известных плохих значений.
wrong=$(echo "$sm" | grep -o '<loc>[^<]*</loc>' | grep -v "$host" | head -3)
if [ -n "$wrong" ] || [ "$n" = "0" ]; then
  echo "   ✗ карта указывает не на $host:"
  echo "$wrong" | sed 's|^|       |'
  fail=1
else
  echo "   ✓ все адреса ведут на $host"
fi

echo
if [ "$fail" = "0" ]; then
  echo "ИТОГ: всё отвечает как задумано."
else
  echo "ИТОГ: есть расхождения — строки со знаком ✗ выше."
fi
